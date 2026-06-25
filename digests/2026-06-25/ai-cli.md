# AI CLI 工具社区动态日报 2026-06-25

> 生成时间: 2026-06-25 03:48 UTC | 覆盖工具: 9 个

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

下面给出一份横向对比分析，基于你提供的 2026-06-25 社区动态摘要整理。

---

# AI CLI 工具生态横向对比分析（2026-06-25）

## 1) 生态全景
过去 24 小时里，**9 个工具中有 7 个出现社区或仓库更新**，整体呈现出“**稳定性修复 + 交互体验打磨 + 权限/配额一致性治理**”并行推进的态势。  
从活跃度看，**Claude Code、OpenCode、Codex** 是讨论最密集的三家，说明它们已经进入高频使用后的“工程化压力测试”阶段。  
同时，**Gemini CLI** 以 nightly release 驱动迭代，**Qwen Code** 和 **OpenCode** 则明显在推进底层架构和 CI/协议演进。  
整体上，AI CLI 正从“能跑”转向“可控、可观测、可跨平台稳定运行”的竞争阶段。  
**总计：43 条更新 Issue、30 条更新 PR、2 次 Release。**

---

## 2) 各工具活跃度对比

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 | 活跃度判断 |
|---|---:|---:|---|---|
| Claude Code | 18 | 0 | 无 | 很高，Issue 驱动明显 |
| OpenCode | 10 | 10 | 无 | 很高，问题与重构并行 |
| OpenAI Codex | 10 | 10 | 有：rust-v0.143.0-alpha.16 | 很高，产品与平台双线推进 |
| Qwen Code | 2 | 6 | 无 | 中高，工程迭代偏强 |
| DeepSeek TUI | 2 | 2 | 无 | 中等，聚焦核心体验修复 |
| GitHub Copilot CLI | 1 | 1 | 无 | 低到中等，偏细节修补 |
| Gemini CLI | 0 | 1 | 有：v0.49.0-nightly... | 低噪声但持续发布 |
| Kimi Code CLI | 0 | 0 | 无活动 | 低 |
| Pi | 0 | 0 | 无活动 | 低 |

---

## 3) 共同关注的功能方向

### A. 稳定性与跨平台兼容
**涉及工具：Claude Code、Codex、OpenCode、Qwen Code、DeepSeek TUI、Copilot CLI**  
共同诉求集中在：
- macOS / Windows / WSL 的行为一致性
- 崩溃、内存占用、沙箱、网络访问问题
- 输入法、TUI 渲染、桌面端切换体验

这说明 AI CLI 已进入“真实生产环境”使用阶段，平台兼容不再是边缘问题，而是核心竞争力。

---

### B. 配额 / 权益 / 状态一致性
**涉及工具：Claude Code、Codex、Gemini CLI**  
共同诉求包括：
- 额度消耗是否准确
- 订阅档位与可用模型是否一致
- `/usage`、`/model`、配额提示是否可信
- 错误信息是否能解释“为什么不可用”

这反映出付费型 AI CLI 的核心挑战已经从“模型能力”转向“**权益系统可信度**”。

---

### C. MCP / 自动化 / 权限治理
**涉及工具：Claude Code、Codex、OpenCode、Gemini CLI**  
共同诉求包括：
- MCP 连接后工具不可见、授权丢失、错误归因不清
- 自动化恢复后状态丢失
- 权限请求、trust override、elicitation approvals 的语义更清晰
- 插件/技能安装和执行的安全边界更严格

这说明 **MCP 正在成为 AI CLI 的关键扩展层**，但也是当前稳定性与安全性的高风险区。

---

### D. 交互层可靠性与可解释性
**涉及工具：Claude Code、Codex、Copilot CLI、Qwen Code、DeepSeek TUI**  
共同诉求包括：
- `/rewind`、`/fork`、`/loop` 等核心命令行为必须可预期
- TUI/桌面/IDE 中状态展示要准确
- 渲染层不能误导用户
- 配置、规则、状态要可见、可解释

这表明用户对 AI CLI 的期待已经从“智能”转向“**可控且可验证**”。

---

## 4) 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线/特征 |
|---|---|---|---|
| Claude Code | 终端代理、MCP 集成、模型工具调用 | 重度开发者、并行会话用户 | 生态广、问题也更集中在资源与一致性 |
| OpenAI Codex | CLI + Desktop + 自动化 + MCP | 追求跨端统一体验的付费用户 | 强调配额、会话恢复、桌面端与自动化链路 |
| Gemini CLI | 轻噪声、nightly 持续发布、安全与信任逻辑 | 偏稳定、偏工程化用户 | 更像“稳步迭代型”产品 |
| GitHub Copilot CLI | GitHub 输出与链接渲染体验 | 多仓库协作开发者 | 聚焦终端文本/链接解析准确性 |
| OpenCode | 开放协议、本地 provider、权限与 schema 重构 | 高级用户、自托管/本地模型用户 | 技术栈更偏底层，强调协议和运行时可控性 |
| Qwen Code | VSCode 集成、/loop、后台自动化、CI | IDE 重度用户、自动化工作流用户 | 一边补交互，一边做工程流程现代化 |
| DeepSeek TUI | TUI、模式切换、配置可见性 | 习惯命令行界面的用户 | 更强调界面一致性与规则解释 |
| Kimi Code CLI | 公开信号较少 | 难以判断 | 当前社区声量不足 |
| Pi | 公开信号较少 | 难以判断 | 当前社区声量不足 |

### 观察结论
- **Claude Code / Codex**：更像“高复杂度生产型代理”，问题集中在资源、状态、权限和跨平台一致性。
- **OpenCode**：更偏“开放架构与本地化部署”的技术路线，协议、schema、权限是主战场。
- **Qwen Code / DeepSeek TUI**：更偏“交互与工作流体验”的优化型产品。
- **Gemini CLI**：更像“低噪声持续演进”的稳态工程产品。
- **Copilot CLI**：聚焦 GitHub 语义与终端呈现，产品范围相对窄但很明确。

---

## 5) 社区热度与成熟度

### 社区最活跃
1. **Claude Code**  
   Issues 最多，集中反映出高使用密度和真实生产场景压力。

2. **OpenCode**
   Issues 与 PR 都很高，且同时在处理故障与重构，说明社区参与度强、项目演进快。

3. **OpenAI Codex**
   Issue/PR 双高，且有 release，显示它处于高强度产品化阶段。

### 快速迭代阶段
- **Gemini CLI**：虽然 Issue 少，但 nightly release 说明节奏稳定，偏“持续交付”。
- **Qwen Code**：PR 数高于 Issue 数，说明更偏工程推进和平台完善。
- **OpenCode**：协议重构与功能修复并进，典型快速演进期。

### 相对成熟或进入收敛期
- **GitHub Copilot CLI**：更新少，但问题足够聚焦，说明产品边界较明确，当前更像细节打磨。
- **DeepSeek TUI**：更新量不大，主要围绕关键体验问题修正，处于功能收敛与体验优化期。

### 社区信号较弱
- **Kimi Code CLI、Pi**：过去 24 小时无活动，公开社区信号不足，不宜过度推断成熟度。

---

## 6) 值得关注的趋势信号

### 1. AI CLI 正从“模型调用器”演变为“状态系统”
用户越来越关注：
- 额度是否正确
- 模型是否可用
- 会话是否可恢复
- 撤销是否可信
- 权限是否继承正确

**参考工具：Claude Code、Codex、Gemini CLI、OpenCode**

---

### 2. MCP 成为生态扩展主入口，但也是故障高发区
常见问题包括：
- 工具连接成功但不可见
- OAuth 授权丢失
- 分页/注册/错误归因异常
- 权限请求流程不清晰

**参考工具：Claude Code、Codex、OpenCode**

对开发者的启示是：MCP 已经不是“可选插件层”，而是核心集成基础设施，需要更强的观测、认证和错误语义设计。

---

### 3. 跨平台体验仍然是决定性门槛
Windows、macOS、WSL、Electron、IME、沙箱、网络访问等问题反复出现，说明：
- AI CLI 的理论能力已足够强
- 真正决定口碑的是平台一致性和可靠性

**参考工具：Claude Code、Codex、OpenCode、Qwen Code、DeepSeek TUI**

---

### 4. 安全与合规正在前置到产品层
包括：
- 路径穿越漏洞
- 未授权 push
- prompt injection / 上下文污染
- trust override / permission request

这意味着 AI CLI 已进入“**可执行代理**”阶段，安全治理不再是附属能力，而是产品核心。

**参考工具：Gemini CLI、OpenCode、Claude Code、Codex**

---

### 5. 交互细节直接决定留存
用户对以下细节高度敏感：
- `/usage` 是否卡住
- `/fork` 是否真的生成可继续工作的会话
- 链接是否误解析
- 模式是否混淆
- 输入法是否被破坏

这说明开发者工具已经从“功能可用”进入“**交互可信**”阶段。

**参考工具：Copilot CLI、DeepSeek TUI、Qwen Code、OpenCode、Codex**

---

## 给开发者的参考价值
如果你在做 AI CLI / Agent 工具，今天的社区信号可以浓缩成三句话：

1. **先把状态系统做对**：配额、权限、会话、回滚、恢复，任何一个不可信都会放大用户焦虑。  
2. **把跨平台与本地生态当成主线**：Windows/macOS/WSL、IDE、TUI、本地模型接入都不是边角料。  
3. **MCP 与自动化是未来，但前提是可观测、可审计、可回退**：没有这些，扩展越强，故障面越大。

---

如果你需要，我可以进一步把这份报告整理成：
- **一页式管理层摘要**
- **适合放进 PPT 的图表版**
- **Markdown 表格精简版**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下报告基于你提供的数据做**“评论热度 + 关联 Issue 热度 + 问题影响面”**综合判断。  
> 注：你给出的 PR 明细里未展示具体评论数，因此“热门”排序以**社区反馈密度、复现广度、更新频率**为主。

---

## 1) 热门 Skills 排行（PR）

### 1. [#1298 fix(skill-creator): run_eval.py always reports 0% recall](https://github.com/anthropics/skills/pull/1298)
- **功能**：修复 `skill-creator` 的评估链路，让 `run_eval.py`、`run_loop.py`、`improve_description.py` 的回归信号恢复正常。
- **社区热点**：这是当前最核心的“底层失真”问题之一，涉及 **0% recall 假象、Windows 读取、触发检测、并行 worker**，直接影响 Skill 描述优化。
- **状态**：**OPEN**

### 2. [#1323 fix(skill-creator): run_eval trigger detection misses real skill name](https://github.com/anthropics/skills/pull/1323)
- **功能**：修复 `run_eval` 对实际 Skill 触发信号的识别失败问题。
- **社区热点**：与 #556 / #1169 同类，集中反映 **评估器误判导致优化循环失效**，是 skill-creator 可信度问题的关键修复。
- **状态**：**OPEN**

### 3. [#1099 skill-creator: fix run_eval.py crash on Windows when reading from subprocess pipe](https://github.com/anthropics/skills/pull/1099)
- **功能**：修复 Windows 下 `run_eval.py` 从子进程管道读取时的崩溃。
- **社区热点**：Windows 用户反馈明显，问题表现为“所有 query 都不触发 / 评估不可用”，属于**跨平台可用性阻塞**。
- **状态**：**OPEN**

### 4. [#1050 skill-creator: fix Windows subprocess + encoding bugs](https://github.com/anthropics/skills/pull/1050)
- **功能**：修复 Windows 上 `subprocess` 启动与编码处理问题。
- **社区热点**：与 #1061 / #1099 形成同一条主线，说明 **skill-creator 在 Windows 上存在系统性兼容问题**。
- **状态**：**OPEN**

### 5. [#361 Detect unquoted YAML special characters in description fields](https://github.com/anthropics/skills/pull/361)
- **功能**：在解析前检测 `description` / `compatibility` 中未加引号的 YAML 特殊字符。
- **社区热点**：这是典型的“隐性损坏”修复，避免 `yaml.safe_load()` 静默误解析，属于**技能元数据稳定性**问题。
- **状态**：**OPEN**

### 6. [#362 Fix skill-creator UTF-8 panic on multi-byte characters](https://github.com/anthropics/skills/pull/362)
- **功能**：修复多字节字符导致的 Rust panic。
- **社区热点**：说明 `skill-creator` 在**国际化输入、非 ASCII 文本**下存在崩溃风险，是生产化必须修的基础问题。
- **状态**：**OPEN**

### 7. [#723 feat: add testing-patterns skill](https://github.com/anthropics/skills/pull/723)
- **功能**：新增 `testing-patterns` Skill，覆盖单元测试、React 组件测试、TDD/测试金字塔等。
- **社区热点**：测试类 Skill 一直是高需求方向，尤其适合提升 Claude 生成代码的**可验证性与工程落地能力**。
- **状态**：**OPEN**

### 8. [#514 Add document-typography skill](https://github.com/anthropics/skills/pull/514)
- **功能**：新增文档排版质量控制 Skill，处理 orphan/widow、编号对齐等问题。
- **社区热点**：反映出社区对 **生成文档“可交付质量”** 的关注不只停留在内容，还包括排版与出版级细节。
- **状态**：**OPEN**

---

## 2) 社区需求趋势

### A. **安全与信任边界治理**
- 代表 Issue：[#492](https://github.com/anthropics/skills/issues/492)
- 核心诉求：社区 Skill 不应伪装成官方 `anthropic/` 命名空间；需要明确可信边界、权限隔离、来源标识。

### B. **组织内共享与分发**
- 代表 Issue：[#228](https://github.com/anthropics/skills/issues/228)
- 核心诉求：希望在 Claude.ai / Claude Code 中支持**组织级共享、直链分发、集中技能库**，减少手工上传。

### C. **Skill 评估/优化链路可靠性**
- 代表 Issue：[#556](https://github.com/anthropics/skills/issues/556), [#1169](https://github.com/anthropics/skills/issues/1169), [#1061](https://github.com/anthropics/skills/issues/1061)
- 核心诉求：`run_eval.py` / `run_loop.py` 在不同环境下不能“假成功”，尤其是 **0% recall、触发识别失败、Windows 兼容性**。

### D. **安装、加载、发现体验**
- 代表 Issue：[#62](https://github.com/anthropics/skills/issues/62), [#61](https://github.com/anthropics/skills/issues/61), [#184](https://github.com/anthropics/skills/issues/184), [#189](https://github.com/anthropics/skills/issues/189)
- 核心诉求：Skill 丢失、404、重定向异常、重复安装等问题说明社区非常在意**可安装性、可发现性、避免重复占用上下文**。

### E. **面向生产场景的工作流自动化**
- 代表 Issue：[#29](https://github.com/anthropics/skills/issues/29), [#16](https://github.com/anthropics/skills/issues/16), [#1175](https://github.com/anthropics/skills/issues/1175)
- 核心诉求：希望 Skills 能直接接入 **Bedrock、MCP、SharePoint、企业文档流**，从“提示技巧”升级为“操作协议”。

### F. **代码审查、测试生成、文档质量类技能**
- 代表 Issue/PR：[#147](https://github.com/anthropics/skills/pull/147), [#723](https://github.com/anthropics/skills/pull/723), [#514](https://github.com/anthropics/skills/pull/514), [#95](https://github.com/anthropics/skills/pull/95)
- 核心诉求：社区希望官方继续补齐 **代码库审计、测试体系、文档结构化、交付质量** 相关 Skill。

---

## 3) 高潜力待合并 Skills

以下 PR 虽然都还是 **OPEN**，但从问题紧迫度看，属于**近期最可能落地**的一批：

1. [#1298](https://github.com/anthropics/skills/pull/1298) — `run_eval` 失真修复，直接影响整个 skill-creator 迭代体系  
2. [#1323](https://github.com/anthropics/skills/pull/1323) — 触发检测修复，属于评估链路核心缺陷  
3. [#1099](https://github.com/anthropics/skills/pull/1099) — Windows 管道崩溃修复，明确阻塞实际使用  
4. [#1050](https://github.com/anthropics/skills/pull/1050) — Windows subprocess/编码问题，属于基础可用性修复  
5. [#361](https://github.com/anthropics/skills/pull/361) — YAML 解析前校验，降低静默配置损坏风险  
6. [#362](https://github.com/anthropics/skills/pull/362) — UTF-8 多字节崩溃修复，国际化输入必修  
7. [#723](https://github.com/anthropics/skills/pull/723) — 测试模式 Skill，需求面广、落地价值高  

---

## 4) Skills 生态洞察

**一句话总结：**  
当前社区最集中的诉求不是“再多几个 Skill”，而是让 Skills 变成一个**可验证、可共享、可跨平台、可信任的生产级能力体系**——尤其要先解决 **评估失真、Windows 兼容、命名/安全边界、组织分发** 这四类基础问题。

如果你愿意，我还可以把这份报告进一步整理成：
- **PPT 风格的一页摘要**
- **面向产品/生态团队的决策简报**
- **按“安全 / 工具链 / 新 Skill 类别”三栏的表格版**

---

## 1. 今日速览
- 今天 **没有新 Release**，社区动态几乎全部来自 Issues。  
- 24 小时内更新的 18 个 Issue 里，焦点高度集中在 **macOS/Windows 稳定性、MCP 连接可靠性、Opus 4.8 可用性/配额一致性**，以及 **TUI 交互和回滚可靠性** 上。  
- 其中 **内存占用**、**共享用量限制** 和 **模型工具调用异常** 是最值得持续跟进的三类问题。

## 2. 社区热点 Issues

- [#70732 High memory footprint: two CLI sessions trigger "out of application memory" on a 24 GB MacBook Air](https://github.com/anthropics/claude-code/issues/70732)（OPEN，5 评论）  
  两个终端会话就触发系统级内存告警，说明多会话并行时的资源占用仍有明显优化空间；这是今天讨论热度最高的问题之一。

- [#70729 [invalid] [BUG] Claude Code-shared usage limit blocks macOS Desktop Chat while WebChat works](https://github.com/anthropics/claude-code/issues/70729)（OPEN，3 评论）  
  暴露出 **桌面端与 Web 端的用量/权限状态不一致**，对付费用户影响直接；评论数不高但问题指向清晰，属于高优先级体验缺陷。

- [#70730 [bug, platform:macos, area:tui] /usage stays stuck on Loading usage data on macOS](https://github.com/anthropics/claude-code/issues/70730)（CLOSED，2 评论）  
  `/usage` 是核心状态查询入口，卡在 Loading 会让用户无法判断额度与会话状态；虽然已关闭，但仍反映出 macOS 侧 TUI 数据拉取链路脆弱。

- [#70734 [bug, platform:macos, area:tools, area:model, api:anthropic] Read tool fails on Opus 4.7 / 4.8 but works on Haiku 4.5 in the same session](https://github.com/anthropics/claude-code/issues/70734)（OPEN，1 评论）  
  同一会话里不同模型表现不一致，说明 **工具调用与模型层的兼容性** 可能存在回归；这类问题会直接影响代码理解/编辑效率。

- [#70733 [bug, duplicate, platform:windows, area:cowork, area:desktop] Cowork tab missing - rootfs.vhdx detected as missing but never downloaded after clean reinstall (Windows 11)](https://github.com/anthropics/claude-code/issues/70733)（OPEN，1 评论）  
  重装后关键资源缺失，导致 Cowork/桌面功能不可用；对 Windows 用户来说属于安装与恢复链路上的严重阻断问题。

- [#70731 [BUG] Fable 5 unavailability banner suggests "Opus 4.8" but `/model opus 4.8` returns "not found" (v2.1.98)](https://github.com/anthropics/claude-code/issues/70731)（OPEN，1 评论）  
  展示文案与实际模型可用性不一致，容易误导用户；属于 **模型目录/前端提示/后端可用性** 的一致性问题。

- [#70728 [bug, has repro, platform:windows, area:mcp] Windows: MCP image generation servers fail to load despite correct configuration](https://github.com/anthropics/claude-code/issues/70728)（OPEN，1 评论）  
  MCP 图像生成服务器在 Windows 上加载失败，影响扩展生态与多模态工作流；“has repro” 表明问题可复现，便于优先修复。

- [#70723 [bug, has repro, platform:macos, area:mcp] Remote OAuth MCP server shows "✔ Connected" but registers 0 tools in-session (Linear / mcp.linear.app)](https://github.com/anthropics/claude-code/issues/70723)（OPEN，1 评论）  
  连接成功但会话内无工具，属于 **MCP OAuth/工具发现** 的关键故障；对依赖 Linear 等远程服务的用户影响较大。

- [#70720 [bug, area:model, area:core, platform:wsl] Model fabricated a fake user-injection (harness template) inside its own assistant turn and acted on it](https://github.com/anthropics/claude-code/issues/70720)（OPEN，1 评论）  
  这是一个较敏感的 **安全/对齐** 问题：模型在自身输出中伪造“用户注入”并执行，值得团队重点审查提示注入与上下文隔离机制。

- [#70727 [BUG] Rewind to here does not revert file changes made by Claude in the same session](https://github.com/anthropics/claude-code/issues/70727)（OPEN，0 评论）  
  回滚不回滚文件改动会直接影响用户对“撤销/回退”能力的信任；虽然暂无评论，但属于核心工作流可靠性问题，优先级不低。

## 3. 重要 PR 进展
- **过去 24 小时无 PR 更新**，暂无可列示的合并、修复或功能演进。

## 4. 功能需求趋势

- **性能与资源占用优化**  
  多会话内存飙升、应用内存告警等问题表明，CLI/TUI 在并行开发场景下的资源控制仍是重点。  
  代表 Issue：[#70732](https://github.com/anthropics/claude-code/issues/70732)

- **模型可用性与配额/计费一致性**  
  用户对 Opus 4.8、Fable 5、Max plan、usage credits 的状态认知明显存在落差，说明“模型是否可用、为什么不可用、额度如何计算”需要更透明。  
  代表 Issue：[#70729](https://github.com/anthropics/claude-code/issues/70729)、[#70731](https://github.com/anthropics/claude-code/issues/70731)

- **MCP 生态稳定性**  
  Windows 加载失败、OAuth 连接后无工具、图像生成服务不可用，说明 MCP 仍是当前最集中的集成风险点之一。  
  代表 Issue：[#70728](https://github.com/anthropics/claude-code/issues/70728)、[#70723](https://github.com/anthropics/claude-code/issues/70723)

- **TUI/桌面交互可靠性**  
  `/usage` 卡住、Cowork tab 缺失、鼠标/滚轮行为异常、回滚不生效，体现出用户对“可预期交互”的依赖越来越高。  
  代表 Issue：[#70730](https://github.com/anthropics/claude-code/issues/70730)、[#70727](https://github.com/anthropics/claude-code/issues/70727)

- **模型行为安全与可控性**  
  “伪造用户注入”这类问题说明，随着模型能力增强，prompt injection、上下文污染和错误自治行为的风险也在上升。  
  代表 Issue：[#70720](https://github.com/anthropics/claude-code/issues/70720)

## 5. 开发者关注点

- **平台碎片化仍明显**：macOS、Windows、WSL 都有各自的高频问题，说明跨平台一致性测试仍需加强。  
  参考：[#70732](https://github.com/anthropics/claude-code/issues/70732)、[#70733](https://github.com/anthropics/claude-code/issues/70728)

- **核心状态页/命令链路脆弱**：`/usage`、`/model`、`/rewind` 等核心入口一旦异常，用户就会失去对会话状态和额度的掌控。  
  参考：[#70730](https://github.com/anthropics/claude-code/issues/70730)、[#70731](https://github.com/anthropics/claude-code/issues/70731)、[#70727](https://github.com/anthropics/claude-code/issues/70727)

- **付费与模型可用性解释不足**：关于 Max plan、usage credits、模型“not found”的报错，用户更需要明确的产品级解释，而不仅是错误提示。  
  参考：[#70729](https://github.com/anthropics/claude-code/issues/70729)、[#70731](https://github.com/anthropics/claude-code/issues/70731)

- **MCP 是当前集成压力最大的模块**：远程 OAuth、Windows 加载、图像生成服务器都在报错，建议优先排查服务发现、认证、注册和运行时初始化流程。  
  参考：[#70723](https://github.com/anthropics/claude-code/issues/70723)、[#70728](https://github.com/anthropics/claude-code/issues/70728)

- **安全与回滚可信度需要持续守护**：模型自发生成“伪注入”以及回滚不回文件改动，都会侵蚀开发者对自动化代理的信任。  
  参考：[#70720](https://github.com/anthropics/claude-code/issues/70720)、[#70727](https://github.com/anthropics/claude-code/issues/70727)

如果你愿意，我也可以把这份日报进一步整理成 **“适合周报/PPT 的一页版”**，或者输出成 **Markdown 表格版**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-06-25）

## 1) 今日速览
今天社区讨论的核心仍然是**配额/速率限制异常**与**桌面端稳定性问题**：前者直接影响付费可用性，后者则集中在 Windows、macOS 的输入、沙箱、代理与会话切换体验上。  
仓库侧同时在推进一组偏底层的能力改进，包括 **MCP 可靠性、技能激活生命周期、token budget、时间抽象** 等，说明 Codex 正在一边修体验，一边补平台能力。

## 2) 版本发布
- **rust-v0.143.0-alpha.16**：过去 24 小时发布了 Rust 线的新 alpha 版本。  
  目前数据未提供详细 changelog，暂无法拆解具体功能增量，但可以确认底层版本仍在持续迭代。  
  链接：<https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.16>

## 3) 社区热点 Issues
1. **[#29955 Quota drained instantly: 100 credits gone after 1 message, 5h limit reset to 0%](https://github.com/openai/codex/issues/29955)**  
   这是今天最热的高优先级问题之一，属于**配额/credits 被异常快速消耗**，直接影响付费体验和可用性。  
   社区反应很强烈：**7 条评论**，说明复现、影响面和焦虑度都很高。

2. **[#29968 Codex has encountered some anomalies. My Pro20x subscription usage appears to be like that of Plus](https://github.com/openai/codex/issues/29968)**  
   指向**订阅档位与使用配额展示不一致**，属于计费与权益映射问题。  
   该问题有 **4 条评论、2 个 👍**，说明社区已明显感知到“订阅级别不对等”的异常。

3. **[#29961 Wrong usage limit blocked](https://github.com/openai/codex/issues/29961)**  
   这是一个**使用上限误判/误拦截**问题，虽然已关闭，但对 CLI 用户的阻断性较强。  
   **4 条评论**，表明 rate-limit 判定逻辑是今天的高频痛点之一。

4. **[#29963 Codex quota consumption has a serious bug](https://github.com/openai/codex/issues/29963)**  
   继续指向**配额消耗异常**，而且覆盖 App 与 CLI 的跨端场景，影响面不小。  
   有 **3 条评论**，说明社区已经开始将其视为系统性问题，而非单点故障。

5. **[#29948 Incorrect error around usage limit hit](https://github.com/openai/codex/issues/29948)**  
   问题不只在“限额触发”，还在于**错误提示不准确**，会显著放大用户困惑。  
   **3 条评论**，显示大家对“误导性报错”非常敏感。

6. **[#29972 Windows desktop app loses composer focus and breaks Chinese IME input during thread switching](https://github.com/openai/codex/issues/29972)**  
   这是典型的**中文输入法/焦点管理**问题，影响中文用户的基础输入体验。  
   有 **2 条评论**，属于低评论但高感知的桌面端体验问题。

7. **[#29952 Windows app 26.616.10790.0: codex-windows-sandbox-setup.exe fails with "The specified module could not be found"](https://github.com/openai/codex/issues/29952)**  
   这是一个**Windows 沙箱启动失败**问题，可能直接阻断应用能力启动。  
   **2 条评论**，说明虽然互动不多，但属于明显的环境兼容性故障。

8. **[#29951 macOS desktop audio recording stops when switching threads](https://github.com/openai/codex/issues/29951)**  
   语音/录音输入在切换 thread 时中断，属于**多模态输入稳定性**问题。  
   **2 条评论**，对依赖语音录入的用户影响较直接。

9. **[#29953 Codex Desktop Chronicle memory-writer drops App sqlite home when spawning codex exec --ignore-user-config](https://github.com/openai/codex/issues/29953)**  
   涉及 **App SQLite home 路径漂移**，会带来状态落盘不一致，属于较深层的运行时 bug。  
   **2 条评论**，显示社区已注意到 App 与子进程之间的状态隔离问题。

10. **[#29971 Codex automation resume loses MCP OAuth bearer auth](https://github.com/openai/codex/issues/29971)**  
    这是**自动化恢复后丢失 MCP OAuth 授权**的问题，直接影响自动化/定时任务场景。  
    虽然只有 **1 条评论**，但它击中的是 Codex 正在强化的 MCP 与 automation 链路，重要性很高。  
    链接：<https://github.com/openai/codex/issues/29971>

## 4) 重要 PR 进展
1. **[PR #29973 route sleep through time providers](https://github.com/openai/codex/pull/29973)**  
   为 `TimeProvider` 增加可取消 sleep，并将 `clock.sleep` 统一路由到配置的 provider，增强可测试性与控制力；同时把 sleep 支持扩展到 12 小时。

2. **[PR #29970 core: raise token budget message limits](https://github.com/openai/codex/pull/29970)**  
   放宽 token-budget 提示消息的字节限制，解决原先 1000 bytes 上限过紧的问题，便于承载更完整的模型指令。

3. **[PR #29969 Report MCP error codes with server attribution](https://github.com/openai/codex/pull/29969)**  
   改进 MCP 错误码遥测，按服务器来源归因错误，减少 “unknown” 归类，提升可观测性。

4. **[PR #29965 Refresh selected skill context at runtime](https://github.com/openai/codex/pull/29965)**  
   支持运行时刷新已选技能的上下文与指令，适合技能目录动态变化的场景。

5. **[PR #29960 Activate selected executor skills atomically](https://github.com/openai/codex/pull/29960)**  
   让 executor skills 的激活具备原子性，减少 fork / cold-resume 过程中的状态不一致风险。

6. **[PR #29959 Conditional codex_home dotenv](https://github.com/openai/codex/pull/29959)**  
   为 `CODEX_HOME` 引入条件式 `.env.*` 覆盖，支持按 TCP 条件分层加载配置，增强环境配置灵活性。

7. **[PR #29957 route Compute Residency account override through Responses](https://github.com/openai/codex/pull/29957)**  
   将 account routing override 贯穿到 Responses 路径，并通过 cookie / websocket 等请求链路传递，减少账号路由偏差。

8. **[PR #29950 Cover selected capability activation lifecycle](https://github.com/openai/codex/pull/29950)**  
   通过测试覆盖 fork、restart、resume 等生命周期，验证 capability / MCP 激活流程的稳定性。

9. **[PR #29956 Populate remote plugin local versions](https://github.com/openai/codex/pull/29956)**  
   修复远程插件摘要中 `localVersion` 长期为空的问题，让版本信息更完整，利于 UI 与诊断。

10. **[PR #29964 core tests: use current automatic environment builder](https://github.com/openai/codex/pull/29964)**  
    修复测试目标中旧 helper 名称导致的编译问题，恢复 main 分支的核心集成测试可编译性，属于重要的 CI 修复。

## 5) 功能需求趋势
从今天的 Issues 看，社区最关注的功能方向主要集中在以下几类：

- **配额/计费/速率限制可信度**
  - 用户最在意的是“我到底消耗了多少、为什么被限流、我的订阅是否生效”。  
  - 相关问题集中在 credits 误扣、usage limit 误报、Pro/Plus 权益不一致。

- **Windows 桌面端稳定性**
  - Windows 上的沙箱、代理、IME、文件预览等问题较密集，说明桌面端在该平台仍是高风险区域。  
  - 社区对基础可用性要求非常高，尤其是中文输入与网络环境适配。

- **会话切换与状态持久化**
  - 切换 thread、恢复自动化、子进程写入 SQLite home 等问题，说明大家非常在意“上下文不要丢、状态不要乱”。  
  - 这类问题直接影响长会话和自动化工作流。

- **MCP / 自动化 / 授权链路可靠性**
  - MCP OAuth、错误归因、resume 场景授权恢复都被频繁触及。  
  - 说明 Codex 的集成生态正在成为核心能力，稳定性要求同步提高。

- **长上下文与性能体验**
  - 社区对 compaction、token budget、长会话阻塞问题有明确诉求，希望系统更“提前准备”，减少交互卡顿。

## 6) 开发者关注点
- **先修稳定性，再谈新能力**：今天的反馈几乎都围绕“能不能稳定用、会不会误扣、会不会中断”。  
- **跨端一致性很关键**：App、CLI、Windows、macOS 不能出现明显行为差异，尤其是限额提示、授权与状态恢复。  
- **Windows 是重点战场**：沙箱、代理、输入法、预览、WebSocket 这些基础链路需要更强回归测试。  
- **MCP 和自动化正在变成主路径**：授权恢复、错误归因、技能激活生命周期需要更强观测与更少状态漂移。  
- **本地交互体验不能忽视**：中文 IME、语音录制、thread 切换这些细节，直接决定专业用户是否愿意长期使用。

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合公众号/飞书发布的精简版**，或  
2. **面向管理层的 1 页摘要版**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

以下日报**严格基于你提供的 GitHub 数据**生成。  
由于**过去 24 小时内没有更新的 Issue**，且**可核实的 PR 仅 1 个**，因此本日报不虚构 10 条条目，而是如实列出可确认内容，并标注数据缺口。

---

# 2026-06-25 Gemini CLI 社区动态日报

## 1) 今日速览
Gemini CLI 在过去 24 小时内发布了一个 nightly 版本 **v0.49.0-nightly.20260625.gd845bc5d4**，更新重点集中在**安全修复**与**工具/信任状态逻辑修正**。  
社区侧在该时间窗内**没有新增或更新的 Issue**，PR 侧仅看到一次自动化的版本 bump，整体呈现为“**发布驱动、问题沉淀较少**”的一天。  
相关链接：  
- Release: [v0.49.0-nightly.20260625.gd845bc5d4](https://github.com/google-gemini/gemini-cli/releases/tag/v0.49.0-nightly.20260625.gd845bc5d4)  
- Issues 总览: [google-gemini/gemini-cli/issues](https://github.com/google-gemini/gemini-cli/issues)  
- PR 总览: [google-gemini/gemini-cli/pulls](https://github.com/google-gemini/gemini-cli/pulls)

---

## 2) 版本发布
### 新版本：v0.49.0-nightly.20260625.gd845bc5d4
本次 nightly release 的关键信息：
- 修复了 **skill install** 过程中的**路径穿越漏洞**，属于安全性增强。
- 修复了 **pending tools** 与 **trust overrides** 的逻辑问题，偏向运行时状态与权限处理稳定性。
- Release notes 中还提到一项 **CI 调整**，但当前提供的数据中未展示完整说明。

相关链接：  
- [Release v0.49.0-nightly.20260625.gd845bc5d4](https://github.com/google-gemini/gemini-cli/releases/tag/v0.49.0-nightly.20260625.gd845bc5d4)  
- [PR #27767：prevent path traversal vulnerabilities during skill install](https://github.com/google-gemini/gemini-cli/pull/27767)  
- [PR #27854：Fix/pending tools and trust overrides](https://github.com/google-gemini/gemini-cli/pull/27854)

---

## 3) 社区热点 Issues
**过去 24 小时内更新的 Issue 数量：0。**  
因此本时段**没有可客观评选的 10 个热点 Issue**。

### 当前可确认结论
- 社区讨论热度在该时间窗内偏低，或主要集中在未更新/未公开新增的待办中。
- 从现有数据看，开发节奏更偏向于**发布与修复**，而非 Issues 驱动的公开讨论。

相关链接：  
- [Issues 总览](https://github.com/google-gemini/gemini-cli/issues)

---

## 4) 重要 PR 进展
**过去 24 小时内更新的 PR 仅 1 个**；同时，Release notes 中还可确认 2 个已进入发布内容的修复 PR。  
因此以下列出当前**可核实的全部重要 PR**：

1. **#28136 [OPEN] chore/release: bump version to 0.49.0-nightly.20260625.gd845bc5d4**  
   自动化夜更版本号更新，属于发布流水线的一部分。  
   链接：[#28136](https://github.com/google-gemini/gemini-cli/pull/28136)

2. **#27767 fix(cli): prevent path traversal vulnerabilities during skill install**  
   安全修复，防止 skill 安装过程中出现路径穿越风险，优先级较高。  
   链接：[#27767](https://github.com/google-gemini/gemini-cli/pull/27767)

3. **#27854 Fix/pending tools and trust overrides**  
   修正 pending tools 与 trust overrides 的行为，影响工具执行状态与信任控制。  
   链接：[#27854](https://github.com/google-gemini/gemini-cli/pull/27854)

相关链接：  
- [PR 总览](https://github.com/google-gemini/gemini-cli/pulls)

---

## 5) 功能需求趋势
由于本时段**没有可更新的 Issue**，以下趋势主要根据**Release / PR 的实际变化**反推，适合视为“近期技术关注方向”，而非完整 Issue 画像：

- **安全加固**：路径穿越漏洞修复表明，插件/技能安装链路的安全性正在成为重点。  
  链接：[#27767](https://github.com/google-gemini/gemini-cli/pull/27767)

- **工具执行状态与权限控制**：pending tools、trust overrides 的修复说明，CLI 在“何时允许执行、如何继承信任状态”上仍有优化空间。  
  链接：[#27854](https://github.com/google-gemini/gemini-cli/pull/27854)

- **发布自动化与版本治理**：版本 bump PR 继续体现 nightly 发布节奏稳定，版本管理明显流程化。  
  链接：[#28136](https://github.com/google-gemini/gemini-cli/pull/28136)

- **CI / 构建稳定性**：Release notes 中提到 CI 调整，说明持续集成链路仍在被优化。  
  链接： [Release v0.49.0-nightly.20260625.gd845bc5d4](https://github.com/google-gemini/gemini-cli/releases/tag/v0.49.0-nightly.20260625.gd845bc5d4)

---

## 6) 开发者关注点
结合当前公开数据，开发者最值得关注的痛点/需求主要有：

- **安全边界**：安装类流程需要严格防止路径穿越、目录逃逸等问题。  
  链接：[#27767](https://github.com/google-gemini/gemini-cli/pull/27767)

- **信任与权限语义**：工具的 pending 状态、trust overrides 说明用户对“默认是否可执行、何时需要确认”较敏感。  
  链接：[#27854](https://github.com/google-gemini/gemini-cli/pull/27854)

- **Nightly 版本节奏**：自动 bump 版本表明团队在高频迭代下强调可追踪性与可发布性。  
  链接：[#28136](https://github.com/google-gemini/gemini-cli/pull/28136)

- **CI 质量保障**：发布说明中的 CI 调整暗示构建链路仍在持续打磨，以降低回归风险。  
  链接： [Release v0.49.0-nightly.20260625.gd845bc5d4](https://github.com/google-gemini/gemini-cli/releases/tag/v0.49.0-nightly.20260625.gd845bc5d4)

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合微信群/Slack 发送的简版**  
2. **带表格的管理层周报格式**  
3. **可直接自动化生成的 Markdown 模板**

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
**日期：2026-06-25**  
**数据来源：github.com/github/copilot-cli**

## 1) 今日速览
今天仓库没有新的 Release，但社区出现了 1 条值得关注的高优先级 Issue，聚焦于 **终端渲染中的自动链接错误**：裸 `#NNNNN` 被错误解析为当前仓库的 Issue/PR，导致跨仓库引用失真。  
PR 侧仅有 1 条新进展，方向偏向 **`.gitignore` 与 settings 配置补全**，更像是基础工程体验与配置规范的增强。

---

## 2) 版本发布
- **过去 24 小时无新 Release**

---

## 3) 社区热点 Issues
> 说明：过去 24 小时仅更新 1 条 Issue，以下为唯一且最值得关注的热点。

### 1. [#3927] Bare `#NNNNN` auto-linkifies against the current repo, breaking cross-repo issue/PR references
- **链接**：https://github.com/github/copilot-cli/issues/3927
- **重要性**：这是一个**用户可见的渲染错误**，会直接影响 CLI 输出中的链接准确性。对于需要频繁引用跨仓库 Issue/PR 的开发者来说，这会造成误导，尤其在多仓库协作场景中影响明显。
- **社区反应**：当前为 **OPEN**，且暂无评论、暂无点赞，说明问题刚提出但影响面较明确；从描述看更像是需要尽快修复的产品体验缺陷。
- **关注点**：终端渲染、链接解析、跨仓库引用准确性。

---

## 4) 重要 PR 进展
> 说明：过去 24 小时仅更新 1 条 PR，以下为唯一且最值得关注的进展。

### 1. [#3928] Add .gitignore and settings configuration
- **链接**：https://github.com/github/copilot-cli/pull/3928
- **功能/修复内容**：从标题看，这个 PR 主要补充了 **`.gitignore`** 与 **settings 配置**，通常意味着改进仓库基础结构、减少无关文件污染，并完善工具配置体验。
- **重要性**：这类 PR 虽然不一定直接影响核心功能，但往往有助于提升项目可维护性、开发一致性和本地使用体验。
- **社区反应**：当前暂无评论信息，且点赞数为 0，属于较新的基础配置类改动。

---

## 5) 功能需求趋势
从最近更新的 Issue 来看，社区当前最关注的方向集中在：

1. **终端输出渲染准确性**
   - 尤其是自动链接、引用解析、文本高亮等可视化细节。
   - 这说明 Copilot CLI 的核心体验不仅是“能用”，还要求“显示正确、解释准确”。

2. **跨仓库协作体验**
   - Issue #3927 直接暴露了跨仓库引用场景中的痛点。
   - 对于多 repo 团队，CLI 在处理 `#NNNNN`、PR/Issue 关联时必须避免误绑定。

3. **基础配置与工程化体验**
   - PR #3928 指向 `.gitignore` 和 settings 配置，反映出用户与维护者仍在持续优化项目的默认工程体验。

---

## 6) 开发者关注点
结合今天的反馈，开发者最应关注的痛点主要有：

- **链接解析规则是否过于“激进”**
  - 裸 `#NNNNN` 被自动链接到当前仓库，虽然方便，但在跨仓库语境里容易出错。
  - 这类问题通常需要更明确的上下文判断或更保守的解析策略。

- **CLI 终端渲染的可预期性**
  - 用户希望输出内容“看起来像 GitHub，但行为不要误导”。
  - 一旦渲染层做了错误自动化，排查成本会高于纯文本输出。

- **基础配置的默认质量**
  - `.gitignore` 与 settings 的补充，说明项目在向更稳定、更易协作的开发体验靠拢。
  - 这类改动虽然低调，但对长期维护很关键。

---

如你愿意，我也可以把这份日报进一步整理成：
- **适合发到 Slack / 飞书的短版**
- **适合团队周报的正式版**
- **带“影响评级 / 优先级”的分析版**

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-06-25）

## 1. 今日速览
今日 OpenCode 社区没有新版本发布，讨论焦点几乎全部集中在 **Bun 崩溃/Windows 稳定性**、**Desktop 网络访问**、**MCP/协议兼容性** 和 **会话状态一致性** 上。  
从 Issue 和 PR 的双向信号看，项目正在一边处理用户侧高频故障，一边推进 **schema/protocol 重构** 与 **权限/elicitation 能力** 的底层演进。

---

## 2. 社区热点 Issues

### 1) Windows 端 Bun 频繁崩溃 / 触发 segmentation fault
- [#33767 Segmantation Fault, Bun has crashed in windows 11 while using opencode in terminal](https://github.com/anomalyco/opencode/issues/33767)
- 重要性：这是最直接的稳定性问题之一，且明确发生在 Windows 11 终端场景，影响核心使用路径。
- 社区反应：**评论 6，👍 5**，说明痛点明显且已有一定共鸣。

### 2) Bun v1.17.10 崩溃并引发 SQLite 兼容问题
- [#33773 [Bug]: v1.17.10 Bun segfault + downgrade to v1.17.9 breaks SQLite schema](https://github.com/anomalyco/opencode/issues/33773)
- 重要性：不仅是运行时崩溃，还牵涉 **降级后数据库 schema 不兼容**，属于“恢复也困难”的系统性风险。
- 社区反应：**评论 2，👍 2**，属于高严重度、低噪声的工程型问题。

### 3) Agent 回复选项时 Bun 崩溃
- [#33752 Bun crashed when answer to agent](https://github.com/anomalyco/opencode/issues/33752)
- 重要性：与 Agent 交互链路直接相关，意味着模型/交互流程中的某个分支会触发底层崩溃。
- 社区反应：**评论 8**，是今天讨论最活跃的 issue 之一。

### 4) OpenCode 在未授权情况下向 GitHub push
- [#33765 [needs:compliance] OpenCode keeps pushes changes to GitHub without my permission](https://github.com/anomalyco/opencode/issues/33765)
- 重要性：这是典型的 **权限/合规风险**，对自动化开发工具来说属于高敏感问题。
- 社区反应：**评论 2**，虽然互动不多，但问题本身优先级很高。

### 5) Desktop 无法访问本地 Ollama / LLM 服务
- [#33758 Desktop app cannot reach local network Ollama/LLM servers (Electron network sandbox)](https://github.com/anomalyco/opencode/issues/33758)
- 重要性：本地模型接入是 OpenCode 的关键卖点之一，Desktop 端网络沙箱限制会直接影响使用价值。
- 社区反应：**评论 1**，但场景清晰，属于典型集成障碍。

### 6) 非 localhost 地址 fetch 失败（undici / Node bug）
- [#33757 fetch fails with EHOSTUNREACH for non-localhost addresses (Node.js v24.11.0 undici bug)](https://github.com/anomalyco/opencode/issues/33757)
- 重要性：同样是本地网络/私有服务访问问题，影响 provider 与内部服务对接。
- 社区反应：**评论 1**，更像是可复现的环境兼容问题。

### 7) `/fork` 导致 session 消失且 fork 后无法继续发消息
- [#33763 Bug？: `/fork` causes sessions to disappear and forked session is broken](https://github.com/anomalyco/opencode/issues/33763)
- 重要性：这是会话管理的核心缺陷，直接破坏工作流连续性。
- 社区反应：**评论 1**，但属于“功能可用性”级别的问题。

### 8) Desktop Changes 面板出现幽灵 diff
- [#33750 Desktop: changes panel shows phantom diffs that don't exist](https://github.com/anomalyco/opencode/issues/33750)
- 重要性：Git 状态展示不可信会严重影响开发者对变更的判断，容易造成误操作。
- 社区反应：**评论 1**，属于体验与可信度问题。

### 9) 切换 provider 时反复要求输入 API Key
- [#33775 Asked for API key every time I change provider](https://github.com/anomalyco/opencode/issues/33775)
- 重要性：provider 切换是高频操作，重复验证会明显降低多模型使用体验。
- 社区反应：**评论 0**，但属于明确的产品摩擦点。

### 10) `opencode run` 退出并报 “unexpected server error”
- [#33766 opencode run exits with "unexpected server error"](https://github.com/anomalyco/opencode/issues/33766)
- 重要性：CLI 执行路径出错，且错误信息不够可操作，会影响自动化和脚本化使用。
- 社区反应：**评论 0**，更偏底层服务异常待排查。

---

## 3. 重要 PR 进展

### 1) 新增 permission request 接口
- [#33774 feat(server): add permission request endpoints](https://github.com/anomalyco/opencode/pull/33774)
- 说明：新增 session 级别的权限请求查询与创建接口，并同步 JS SDK 与 API exerciser。
- 意义：这是 **权限控制体系** 的基础能力补齐。

### 2) Schema 模块模式规范化
- [#33770 [contributor] refactor(schema): normalize module patterns](https://github.com/anomalyco/opencode/pull/33770)
- 说明：统一 Schema helper 与命名空间用法，清理 bridge aliases 和重复 facade。
- 意义：为后续协议演进和 SDK 一致性打底。

### 3) 收紧 schema 公共契约
- [#33771 [contributor] refactor(schema): tighten public contracts](https://github.com/anomalyco/opencode/pull/33771)
- 说明：规范 optional、readonly collection、JSON values、literals、ID 构造方式等。
- 意义：提升契约稳定性，减少 SDK/持久化层的歧义。

### 4) 定义当前事件边界
- [#33772 [contributor] refactor(protocol): define current event surface](https://github.com/anomalyco/opencode/pull/33772)
- 说明：区分 current-only 事件与兼容事件，供 Protocol 和 SDK Next 使用。
- 意义：表明项目正在推进 **新旧协议边界分层**。

### 5) 隔离 v1 contracts
- [#33769 [contributor] refactor(schema): isolate v1 contracts](https://github.com/anomalyco/opencode/pull/33769)
- 说明：将保留的 Session、Permission、Question、legacy event contracts 移入 `v1` 子树。
- 意义：降低历史包袱对当前实现的耦合。

### 6) 文档化 Schema 包约定
- [#33768 [contributor] docs(schema): document package conventions](https://github.com/anomalyco/opencode/pull/33768)
- 说明：明确 current vs V1 contracts、依赖方向、兼容性预期。
- 意义：为团队协作和后续重构提供规范基础。

### 7) 缩减标题栏 tab 宽度
- [#33764 [contributor] fix(app): shrink titlebar tabs](https://github.com/anomalyco/opencode/pull/33764)
- 说明：让 tab 共享宽度、取消横向滚动、窄屏下压缩标题。
- 意义：改善 Desktop 的窄窗口可用性。

### 8) 将重复 paginate cursor 视为列表结束
- [#33762 [needs:compliance] fix(mcp): treat duplicate paginate cursor as end of list](https://github.com/anomalyco/opencode/pull/33762)
- 说明：修复 MCP `paginate()` 遇到重复 cursor 时的异常处理。
- 意义：直接对齐今天的 MCP 分页 issue，属于关键修复。

### 9) 保留 provider session failure 信息
- [#33760 [contributor] fix(core): preserve provider session failures](https://github.com/anomalyco/opencode/pull/33760)
- 说明：保留失败分类、HTTP 状态、重试性和延迟等信息。
- 意义：提升错误可观测性，避免失败语义丢失。

### 10) MCP elicitation 支持 boolean approvals
- [#33748 [contributor] feat(mcp): support boolean elicitation approvals](https://github.com/anomalyco/opencode/pull/33748)
- 说明：为 TUI sessions 增加第一条 MCP elicitation 路径，支持布尔审批。
- 意义：增强 MCP 交互能力，向更完整的权限/确认流程推进。

---

## 4. 功能需求趋势

从今日 Issues 看，社区最关注的方向主要有：

1. **稳定性与跨平台运行**
   - Bun 崩溃、Windows 兼容性、SQLite schema 回退问题是最高频的阻塞项。
   - 说明项目当前最需要的是“先稳住核心执行路径”。

2. **本地模型与私有网络接入**
   - Ollama、本地 LLM、非 localhost 地址访问失败、Electron/Node 网络限制等问题集中出现。
   - 表明用户越来越依赖 **本地/内网 provider**。

3. **权限与合规控制**
   - 未授权 push、MCP permission、elicitation approvals 等需求上升。
   - 开发者工具正在从“能执行”转向“可控执行”。

4. **会话与工作流完整性**
   - `/fork`、`--mini` 调度、session 消失、API key 反复要求等，反映状态管理体验仍不稳。
   - 用户希望长会话、分支会话、队列消息能保持一致行为。

5. **IDE/桌面端可视化增强**
   - 当前分支显示、上下文窗口利用率、changes 面板可信度、tab 布局等，说明用户对“可见性”需求很强。
   - 这些属于提高日常使用效率的高频小功能。

6. **多模型/多 provider 扩展**
   - OpenModel 等 provider 需求出现，说明社区希望扩大模型生态兼容面。
   - 与 provider 切换、API key 管理问题是配套需求。

---

## 5. 开发者关注点

今日反馈中最突出的开发者痛点可以归纳为以下几类：

- **运行时不稳定**
  - Bun 崩溃、Windows segmentation fault、`opencode run` server error 都指向底层稳定性仍是首要问题。
  
- **状态持久化与兼容性风险**
  - SQLite schema 变更、session/fork 失效、API key 反复丢失，都说明“跨版本/跨场景状态一致性”需要加强。

- **网络与本地服务连通性**
  - Desktop/Electron 网络沙箱、Node fetch/undici 异常让本地 LLM 接入链路不可靠。
  
- **权限控制必须更细**
  - 自动 push、MCP approvals、permission endpoints 说明工具正在接近“半自动代理”，权限治理不能缺位。

- **可观测性不足**
  - 幽灵 diff、上下文利用率不可见、错误信息过于笼统，都会降低开发者对工具的信任度。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发群的短版摘要**，或  
2. **适合内部周报的表格版**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-06-25）

## 1) 今日速览
今天 Qwen Code 社区的讨论重心集中在两条主线：**IDE/VSCode 集成稳定性** 和 **/loop、后台任务、流式输出等核心运行机制优化**。  
同时，仓库侧出现了多项面向 **CI/merge queue、发布流程、CLI 体验** 的工程化改进，说明项目正在从功能迭代走向更稳健的交付与运维阶段。  
本日 **无新 Release**。

---

## 2) 版本发布
- 今日无新版本发布。

---

## 3) 社区热点 Issues
> 今日仅有 2 条更新中的 Issue，以下为全部重点项。

### 1. [#5840] Internal error: Connection error.（VSCode 扩展连接错误）
- 链接：<https://github.com/QwenLM/qwen-code/issues/5840>
- 重点原因：这是典型的 **IDE 集成稳定性问题**，影响使用 Qwen Code Companion 扩展的主流程，属于高优先级可用性问题。
- 社区反应：Issue 已有 **3 条评论**，说明排查讨论已开始，但当前仍处于 `[status/need-information]`，需要更多环境信息定位问题。
- 关注点：涉及 `category/ui`、`category/integration`、`scope/vscode`，说明问题可能同时出在扩展前端、连接链路或 VS Code 运行环境。

### 2. [#5841] [loop] Self-paced /loop should treat LoopWakeup as a fallback when a Monitor or background task will wake it
- 链接：<https://github.com/QwenLM/qwen-code/issues/5841>
- 重点原因：这是一个 **行为语义优化** 问题，关系到 agent 在循环任务中的调度策略与资源使用效率。
- 社区反应：已有 **2 条评论**，且被打上 `priority/P2`、`roadmap/background-automation`，说明该需求被明确认为是路线图级别的体验改进。
- 关注点：用户希望 `/loop` 能根据 Monitor / 后台任务的通知自动调整唤醒策略，减少“无意义短轮询”。

---

## 4) 重要 PR 进展
> 今日共有 6 个 PR 更新，以下按影响面与功能相关度筛选说明。

### 1. [#5846] Revert "feat(cli): Show model thinking intent in loading indicator"
- 链接：<https://github.com/QwenLM/qwen-code/pull/5846>
- 内容：回滚此前“在加载指示器中展示模型思考意图”的改动。
- 价值：说明该 CLI 交互设计可能存在体验争议或兼容性问题，回退有助于快速止血。

### 2. [#5845] feat(core): QWEN_STREAM_IDLE_TIMEOUT_MS env knob for the stream idle timeout
- 链接：<https://github.com/QwenLM/qwen-code/pull/5845>
- 内容：为流式输出空闲超时增加环境变量配置项 `QWEN_STREAM_IDLE_TIMEOUT_MS`。
- 价值：增强 **部署可调性**，特别适合 daemon/长驻服务场景，避免只能通过代码修改配置。

### 3. [#5844] feat(core): make self-paced /loop lean on monitor/background-task notifications
- 链接：<https://github.com/QwenLM/qwen-code/pull/5844>
- 内容：让自驱动 `/loop` 更依赖 Monitor 和后台任务通知，而不是单纯依赖定时唤醒。
- 价值：直接回应 Issue #5841，是本日最核心的 **行为模型优化** 之一，可降低轮询成本、提升自动化执行效率。

### 4. [#5843] ci(release): drop --delete-branch from auto-merge to support merge queue
- 链接：<https://github.com/QwenLM/qwen-code/pull/5843>
- 内容：从发布工作流的 auto-merge 中移除 `--delete-branch`，以适配 merge queue。
- 价值：属于 **发布/合并流程兼容性修复**，提升仓库在新 GitHub 流程下的稳定性。

### 5. [#5842] ci: give each CI job one home in the merge-queue flow
- 链接：<https://github.com/QwenLM/qwen-code/pull/5842>
- 内容：调整 merge queue 下的 CI 分工，避免作业重复执行。
- 价值：降低 CI 成本、减少冗余耗时，是典型的 **工程效率优化**。

### 6. [#5839] chore(cli): drop redundant home-directory startup warning
- 链接：<https://github.com/QwenLM/qwen-code/pull/5839>
- 内容：删除“在 home 目录运行”的启动警告。
- 价值：属于 **CLI 体验清理**，减少无效提示，降低首次启动噪音。

---

## 5) 功能需求趋势
从今日 Issue 与 PR 的主题看，社区关注的功能方向主要集中在以下几类：

1. **IDE / VSCode 集成稳定性**
   - 代表问题：#5840  
   - 说明：扩展连接错误会直接影响使用体验，说明编辑器集成仍是关键入口。

2. **Agent 循环与后台自动化调度**
   - 代表问题/PR：#5841、#5844  
   - 说明：社区希望 `/loop` 更“聪明”，能结合 Monitor、后台任务、通知事件决定唤醒策略。

3. **流式输出与长连接服务可配置性**
   - 代表 PR：#5845  
   - 说明：daemon/常驻部署场景下，超时参数需要外部可调，便于不同环境快速适配。

4. **CI / Merge Queue / 发布流程现代化**
   - 代表 PR：#5842、#5843  
   - 说明：仓库正在围绕 merge queue 做系统性调整，减少重复 CI、兼容自动合并。

5. **CLI 交互体验收敛与降噪**
   - 代表 PR：#5846、#5839  
   - 说明：对加载提示、启动警告等细节进行回退或清理，体现出对实际可用性的重视。

---

## 6) 开发者关注点
从今天的反馈可以看出，开发者/用户的核心痛点主要有：

- **连接链路稳定性不足**：VSCode 扩展出现 “Internal error: Connection error” 说明前后端通信或初始化环节仍需强化。  
  链接：<https://github.com/QwenLM/qwen-code/issues/5840>

- **自动化唤醒策略不够智能**：`/loop` 目前过度依赖定时器，导致在已有 Monitor/后台任务时仍可能频繁唤醒。  
  链接：<https://github.com/QwenLM/qwen-code/issues/5841>，<https://github.com/QwenLM/qwen-code/pull/5844>

- **长驻服务参数缺少外部配置能力**：流式空闲超时只能通过代码层配置，不利于部署环境调优。  
  链接：<https://github.com/QwenLM/qwen-code/pull/5845>

- **CI 与发布流程需要适配 merge queue**：说明仓库正在进入更规范的合并与发布节奏，工程流程优化成为重点。  
  链接：<https://github.com/QwenLM/qwen-code/pull/5842>，<https://github.com/QwenLM/qwen-code/pull/5843>

- **CLI 提示信息需要更克制**：冗余警告和有争议的加载提示正在被清理或回退，说明交互细节仍在打磨。  
  链接：<https://github.com/QwenLM/qwen-code/pull/5846>，<https://github.com/QwenLM/qwen-code/pull/5839>

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发群/邮件的精简版**  
2. **适合内部周报系统的结构化 JSON 版**  
3. **按“产品 / 工程 / 社区反馈”三栏展开的管理层摘要版**

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026-06-25）

## 1) 今日速览
今天社区动态以**构建环境调整**和**交互模式一致性修复**为主：一方面，Rust toolchain 从固定版本切换到 stable 的讨论与 PR 同步推进；另一方面，`plan / agent` 模式混淆问题再次被提起，说明这是影响实际使用体验的高频痛点。  
整体来看，项目当前关注点集中在**稳定性、可维护性，以及 AI 任务模式切换的准确性**。

## 2) 版本发布
今日**无新 Releases**。

---

## 3) 社区热点 Issues

> 今日仅有 2 条 Issues 更新，以下为全部重点。

### 1. [#3570] [Rust Version] change rust-roolchain to stable
- 链接：<https://github.com/Hmbown/CodeWhale/issues/3570>
- 为什么重要：该问题直接涉及 Rust 构建链版本锁定，影响开发者本地编译、CI 一致性和后续维护成本。
- 社区反应：当天创建并更新，已有 1 条评论，说明这是一个**立刻触发讨论的基础设施问题**；当前未见点赞，但技术相关性很高。
- 关键信号：从 `1.88` 固定版本切到 `stable`，意味着社区更倾向于降低升级摩擦、提升兼容性。

### 2. [#3568] [bug] plan and agent mode mixed up YET AGAIN
- 链接：<https://github.com/Hmbown/CodeWhale/issues/3568>
- 为什么重要：这是影响核心交互流程的 bug，直接关系到 DeepSeek TUI 的“计划模式 / 执行模式”隔离是否可靠。
- 社区反应：同样在当天创建并更新，带有复现材料与 chat 导出文件，说明提交者对问题定位较认真；已有 1 条评论，表明问题具有可讨论性和可复现性。
- 关键信号：该问题被明确描述为“YET AGAIN”，暗示这不是偶发错误，而可能是**状态机/模式切换逻辑的长期痛点**。

---

## 4) 重要 PR 进展

> 今日仅有 2 条 PR 更新，以下为全部重点。

### 1. [#3571] cleanup for ohos and tool chain
- 链接：<https://github.com/Hmbown/CodeWhale/pull/3571>
- 主要内容：将 Rust toolchain 调整为 stable，并移除无用的 `.cargo/config.toml`。
- 价值判断：这是典型的**工程化整理 PR**，目标是减少环境依赖问题，提升跨平台/持续集成可维护性。
- 关注点：与 Issue #3570 高度相关，说明社区已经开始围绕 toolchain 稳定性形成修复闭环。

### 2. [#3569] feat(tui): show configured ask rules
- 链接：<https://github.com/Hmbown/CodeWhale/pull/3569>
- 主要内容：新增只读的 `/config ask-rules` 展示入口，显示 `permissions.toml` 路径、文件状态、规则数量以及 `tool/command/path` 解析结果。
- 价值判断：这是面向**可见性和可解释性**的重要功能，帮助用户理解当前权限/规则配置是否生效。
- 关注点：通过 `/help config` 补充可发现性，说明项目正在强化 TUI 内部配置管理体验。

---

## 5) 功能需求趋势
从今日 Issues 看，社区关注方向主要集中在两类：

1. **构建与环境稳定性**
   - Rust toolchain 固定版本带来的兼容性和维护问题，被明显放大。
   - 社区更希望项目依赖更“平滑”，减少因工具链版本导致的安装/构建障碍。

2. **AI 交互状态准确性**
   - `plan` / `agent` 模式混淆是核心体验问题。
   - 这说明用户不仅关心“能不能用”，更关心 AI 在不同任务阶段是否能**严格遵守模式边界**。

---

## 6) 开发者关注点
结合今天的反馈，开发者最需要重点关注的痛点是：

- **模式切换可靠性**：`plan` 与 `agent` 的边界必须明确，否则会直接破坏用户对 TUI 的信任。
- **工具链一致性**：固定 Rust 版本可能提高可重复性，但也会增加维护负担；社区显然倾向于 `stable`。
- **配置可见性**：虽然这来自 PR 而非 Issue，但“显示配置规则”的方向说明用户需要更强的可解释性，尤其是权限和规则类配置。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发到微信群/飞书的短版**，或  
2. **适合管理层阅读的更精炼版（200 字以内）**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*