# AI CLI 工具社区动态日报 2026-09-05

> 生成时间: 2026-09-05 03:28 UTC | 覆盖工具: 9 个

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

以下为基于 2026-09-05 各 AI CLI 工具社区动态的**横向对比分析报告**。  
> 说明：表中“Issues 数 / PR 数”均以**本日报中明确列出的热点项或更新项**为准，不代表仓库总量。

---

## 1) 生态全景

过去 24 小时，AI CLI 生态整体呈现出一个非常清晰的方向：**从“能用”走向“可控、稳定、可解释、可恢复”**。  
多数工具的社区反馈都不再停留在新功能想象，而是集中在**模型路由一致性、MCP/工具链稳定性、会话连续性、安全边界、上下文与成本控制**等基础能力上。  
同时，Windows/Desktop、TUI 交互和多平台兼容仍是高频战场，说明 CLI 产品已经进入真实生产使用阶段。  
从发布节奏看，多个项目都在持续修复回归并增强可观测性，反映出整个赛道正进入**快速工程化和平台化**阶段。

---

## 2) 各工具活跃度对比

| 工具 | 今日热点 Issues 数 | 今日 PR 数 | Release 情况 |
|---|---:|---:|---|
| Claude Code | 10 | 0 | 1 个 release（v2.1.261） |
| OpenAI Codex | 10 | 10 | 2 个 release（0.153.3 / 0.153.4） |
| Gemini CLI | 4 | 10 | 1 个 nightly release |
| GitHub Copilot CLI | 10 | 0 | 3 个 release（v1.0.83 / 1.0.84-0 / 1.0.84-1） |
| Kimi Code CLI | 1 | 0 | 无 release |
| OpenCode | 10 | 10 | 2 个 release（v1.18.28 / 1.18.29） |
| Pi | 10 | 10 | 1 个 release（v0.85.0） |
| Qwen Code | 10 | 10 | 无 release |
| DeepSeek TUI | 2 | 12 | 无 release |

### 直观结论
- **最活跃梯队**：OpenAI Codex、OpenCode、Pi、Qwen Code、Claude Code、Copilot CLI  
- **PR 驱动最强**：DeepSeek TUI、Gemini CLI、OpenAI Codex、OpenCode、Pi、Qwen Code  
- **Issues 声量最高**：Claude Code、OpenAI Codex、OpenCode、Pi、Qwen Code、Copilot CLI  
- **社区最冷静**：Kimi Code CLI

---

## 3) 共同关注的功能方向

### 1. 模型路由 / 可见性 / 选择一致性
**共同诉求**：用户显式选择的模型，必须原样生效，不能被静默改写或隐藏。  
- **Claude Code**：模型切换与会话稳定性频繁打断交互  
- **OpenAI Codex**：Astra 在模型选择器中不可见、默认路由修复  
- **Gemini CLI**：`gemini-2.5-flash` 被错误映射到 `gemini-3.5-flash`  
- **GitHub Copilot CLI**：GPT-6 Astra 在桌面端可见性不足  
- **OpenCode**：OpenAI OAuth 下 GPT-6 Astra 过滤问题  
- **Pi**：模型选择器刷新后保持当前选中项  
- **Qwen Code**：provider 兼容与模型能力对齐

### 2. MCP / 工具链稳定性与语义保真
**共同诉求**：工具调用不能“看起来成功、实际已坏”，文本与元数据要准确传递。  
- **Claude Code**：MCP schema 占用上下文、工具链消耗预算  
- **Gemini CLI**：MCP prompt 被 JSON 编码污染  
- **GitHub Copilot CLI**：`tools/list` 刷新、Canvas 参数序列化、工具契约不一致  
- **OpenCode**：Remote MCP 回归、Shell/Glob/Read 工具正确性  
- **Pi**：custom tool schema 的 `anyOf` 丢失  
- **Qwen Code**：daemon / turn-index / replay 链路一致性  
- **DeepSeek TUI**：工具侧输出预算与 transcript 管控

### 3. 会话连续性、恢复与历史状态管理
**共同诉求**：长会话中不能丢草稿、丢上下文、丢状态。  
- **Claude Code**：跨会话消息、scheduled task、hooks 反复触发  
- **OpenAI Codex**：TUI 状态恢复、root turn identity、队列/历史导航  
- **Qwen Code**：promptId 缺失影响 live replay / reconnect  
- **Pi**：resume、pinning、compaction、tree navigation 并发治理  
- **DeepSeek TUI**：todo 历史快照污染 transcript  
- **GitHub Copilot CLI**：reconnect / changes tab / detached 语义问题

### 4. 安全边界、授权与可解释性
**共同诉求**：自动执行必须有清晰边界，不能越权、不能静默绕过。  
- **Claude Code**：禁止 commit 却仍自动提交、组织策略加载与诊断  
- **Gemini CLI**：sandbox 边界、shell wrapper 绕过、配置目录隔离  
- **GitHub Copilot CLI**：sandboxed gh、bypass prompt、MCP OAuth 约束  
- **Qwen Code**：AUTO 模式审批流、classifier 回退  
- **OpenCode**：provider OAuth / 路径规范化 / 可信输入输出  
- **Pi**：模型与工具 schema 的边界一致性

### 5. Windows/Desktop/TUI 体验
**共同诉求**：CLI 已经不只是纯命令行，而是跨平台交互产品。  
- **Claude Code**：Windows/Desktop 回归集中爆发  
- **OpenAI Codex**：Windows / macOS / Linux 多平台体验问题并发  
- **GitHub Copilot CLI**：Windows 任务栏、PowerShell、桌面应用集成  
- **Kimi Code CLI**：Windows Terminal / PowerShell 改键与粘贴  
- **OpenCode**：桌面端崩溃、大粘贴崩溃  
- **Pi**：TUI 光标、快捷键、图片粘贴、滚轮效率  
- **DeepSeek TUI**：TUI 历史、输出预算、交互整理

### 6. 成本、配额与上下文效率
**共同诉求**：用户越来越在意 token、缓存、额度、后台耗用是否透明。  
- **Claude Code**：MCP schema 占上下文、输出截断上限  
- **OpenAI Codex**：空闲也掉配额、task_complete 后持续请求  
- **GitHub Copilot CLI**：prompt caching 失效、OOM  
- **OpenCode**：Limit Exceeded、套餐口径不一致  
- **Qwen Code**：managed-memory / prompt-cache 修复  
- **DeepSeek TUI**：输出预算计算修正

---

## 4) 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|---|---|---|---|
| Claude Code | Desktop/Windows 稳定性、权限边界、会话协作 | 重度终端开发者、长任务用户 | 强会话/多会话、hooks、policy、桌面协同 |
| OpenAI Codex | 新模型接入、异步交互、TUI/桌面一致性 | 追求对话式开发体验的用户 | Astra 路由、异步问答、exec-server、状态恢复 |
| Gemini CLI | 安全加固、sandbox、配置隔离 | 安全敏感、企业/容器化用户 | fail-closed、路径边界、shell wrapper 审核 |
| GitHub Copilot CLI | GitHub 生态整合、桌面集成、工具链稳定 | GitHub/Windows 用户、团队协作场景 | desktop bundling、MCP/OAuth、Windows 集成 |
| Kimi Code CLI | 基础输入体验、终端兼容性 | Windows Terminal / PowerShell 用户 | 轻量 CLI、键位映射、输入交互 |
| OpenCode | 多模型/多 Provider 统一入口 | 多模型切换、企业化开发者 | provider OAuth、导出、可观测性、工具正确性 |
| Pi | TUI 交互与扩展能力、长会话管理 | 重度 TUI 用户、扩展作者 | session tree、compaction、extension API、multi-model |
| Qwen Code | Web Shell + daemon/session 平台 | Web Shell 用户、SDK/协作用户 | daemon、turn-index、replay、OpenAI-compatible 适配 |
| DeepSeek TUI | 轻量 TUI、Rust 构建与依赖治理 | Rust/TUI 开发者、贡献者 | 预算推导、CI、依赖升级、跨平台构建 |

### 核心差异总结
- **Claude Code / Codex / Copilot** 更像“面向大规模真实工作流的产品化 CLI”。
- **Gemini CLI** 明显更偏“安全与边界收敛”。
- **OpenCode / Qwen Code** 偏“多 Provider 统一层 + 会话/daemon 基础设施”。
- **Pi** 偏“可扩展的 TUI agent 平台”。
- **DeepSeek TUI** 更像“轻量、工程导向的 TUI 运行时”。
- **Kimi Code CLI** 当前更聚焦在“基础交互可用性”。

---

## 5) 社区热度与成熟度

### 社区热度更高的工具
- **Claude Code、OpenAI Codex、OpenCode、Pi、Qwen Code、GitHub Copilot CLI**
- 特征：Issues 数高、PR 数高、反馈集中在核心工作流，说明已有较多真实用户在生产场景使用。

### 处于快速迭代阶段的工具
- **Gemini CLI、DeepSeek TUI**
- 特征：PR 更新密集，且多为安全修复、构建修复、基础能力补强；Issue 面更窄，但工程动作明显更快。

### 社区规模较小或更垂直的工具
- **Kimi Code CLI**
- 特征：Issue 量少、PR 少，当前更像在打磨基础交互与平台兼容。

### 从“成熟度”看
- **更成熟、更产品化**：Claude Code、Copilot CLI、Codex  
- **更平台化、更基础设施化**：OpenCode、Qwen Code、Pi  
- **更偏安全/规范收敛**：Gemini CLI  
- **更偏轻量与体验打磨**：DeepSeek TUI、Kimi Code CLI

---

## 6) 值得关注的趋势信号

### 趋势 1：AI CLI 正从“模型入口”变成“工作流操作系统”
用户不再满足于“能问答”，而是要求：
- 会话可恢复
- 工具可追踪
- 自动化可控
- 权限边界清晰
- 输出和状态可解释

这说明 CLI 已经从“单次推理工具”进入“长期任务执行平台”。

### 趋势 2：模型路由和可见性成为产品信任核心
多个工具都在修复：
- 用户选了什么模型
- 实际用了什么模型
- 为什么某模型不可见
- 默认路由为何变化

对开发者来说，这意味着**模型策略不能再是隐式逻辑**，必须显式、可诊断、可审计。

### 趋势 3：MCP / 工具链已进入“正确性红线”阶段
社区对工具链的要求，已经从“接入成功”升级为：
- 文本不能被编码污染
- schema 不能丢字段
- 工具发现不能失联
- 状态变更不能静默失败

这对协议层、适配层、序列化层都是强约束。

### 趋势 4：安全与可用性正在重新平衡
安全修复不再只是“加拦截”，而是要求：
- 拦截要可解释
- 绕过路径要收紧
- 容器边界要隔离
- 自动执行要有明确授权边界

开发者需要把安全视为**用户体验的一部分**，而不是外置开关。

### 趋势 5：上下文成本和配额透明度越来越重要
用户对：
- prompt cache
- idle 耗费
- 任务结束后继续请求
- 截断上限
- 输出预算

的敏感度明显上升。  
这意味着未来 CLI 竞争，不只是“谁更聪明”，而是“谁更省、更稳、更可预期”。

---

如果你愿意，我还可以进一步把这份报告整理成：
1. **一页式管理层摘要**
2. **面向研发团队的风险优先级清单**
3. **按“模型/安全/工具链/会话/桌面端”五类重新分组的决策版**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下为基于你提供的数据整理的 **Claude Code Skills 社区热点报告**（截至 2026-09-05）。  
说明：你给出的 PR 列表里多数条目的 `评论数` 字段缺失，因此以下“热门”排序主要依据 **问题影响面、讨论聚焦度、更新活跃度和可合并性** 进行综合判断。

---

## 1) 热门 Skills 排行（PR）

### 1. `skill-creator` 评测链路修复：`run_eval.py` 0% recall 问题
- **PR**：[#1298](https://github.com/anthropics/skills/pull/1298)  
- **状态**：Open  
- **功能**：修复 skill 评测与优化循环，解决 `run_eval.py` 永远报 0% recall、Windows 流读取、触发检测、并行 worker 等问题。  
- **社区热点**：这是典型的“**基础设施准确性**”问题，直接影响 `run_loop.py` / `improve_description.py` 的优化效果，属于整个 Skills 生态的核心可信度问题。

### 2. 评测与基准脚本稳定性修复
- **PR**：[#1602](https://github.com/anthropics/skills/pull/1602)  
- **状态**：Open  
- **功能**：修复 evaluation 序列化、benchmark 指标、编码和脚本稳定性问题。  
- **社区热点**：集中在 **评测结果是否可信**、**跨平台执行是否稳定**、**脚本是否可复现**。这类问题通常优先级高，且容易形成合并共识。

### 3. `skill-creator` Windows 子进程管道崩溃修复
- **PR**：[#1099](https://github.com/anthropics/skills/pull/1099)  
- **状态**：Open  
- **功能**：修复 Windows 下读取 subprocess pipe 时 `run_eval.py` 崩溃/误判为“未触发”。  
- **社区热点**：Windows 兼容性是明显的高频痛点，尤其对本地开发、CI 和企业环境影响较大。

### 4. `skill-creator` Windows 子进程 + 编码问题修复
- **PR**：[#1050](https://github.com/anthropics/skills/pull/1050)  
- **状态**：Open  
- **功能**：修复 `subprocess.Popen(["claude", ...])`、编码处理等 Windows 兼容问题。  
- **社区热点**：与 #1099 同属 **Windows 生态修复**，社区对“脚本在非 Linux 环境不可用”非常敏感。

### 5. `pdf` 技能文件引用修复
- **PR**：[#538](https://github.com/anthropics/skills/pull/538)  
- **状态**：Open  
- **功能**：修正 `SKILL.md` 中大小写敏感的文件引用（`REFERENCE.md` / `FORMS.md`）。  
- **社区热点**：看似小修，但直接影响 **case-sensitive 文件系统上的可用性**，属于“低成本高收益”的修复类 PR。

### 6. `docx` 技能：tracked changes 与 bookmark ID 冲突修复
- **PR**：[#541](https://github.com/anthropics/skills/pull/541)  
- **状态**：Open  
- **功能**：解决 DOCX 处理中文档损坏风险，避免 `w:id` 冲突。  
- **社区热点**：文档类 Skills 对 **“输出不损坏原文件”** 极度敏感，这类修复通常会被高度关注。

### 7. `skill-creator` YAML description 解析健壮性修复
- **PR**：[#539](https://github.com/anthropics/skills/pull/539)  
- **状态**：Open  
- **功能**：对未加引号、包含特殊字符的 `description` 做预解析校验。  
- **社区热点**：这是典型的 **配置文件易错点治理**，直接减少“看起来没问题但实际解析失败”的隐性故障。

### 8. `testing-patterns` 新技能
- **PR**：[#723](https://github.com/anthropics/skills/pull/723)  
- **状态**：Open  
- **功能**：覆盖测试金字塔、单测、React 组件测试、命名、边界条件等完整测试实践。  
- **社区热点**：说明社区对 **测试生成 / 测试策略指导** 需求强烈，属于通用型高价值 Skills 方向。

---

## 2) 社区需求趋势

### A. Skills 分发、共享与信任边界
- **代表 Issue**：[#228](https://github.com/anthropics/skills/issues/228)（组织内共享 Skills）、[#492](https://github.com/anthropics/skills/issues/492)（命名空间信任边界）、[#189](https://github.com/anthropics/skills/issues/189)（重复安装导致重复 Skills）
- **趋势判断**：社区已经从“能不能用”转向“**怎么安全地规模化分发和复用**”。

### B. 评测、触发与优化闭环可靠性
- **代表 Issue**：[#556](https://github.com/anthropics/skills/issues/556)、[#1390](https://github.com/anthropics/skills/issues/1390)、[#1487](https://github.com/anthropics/skills/issues/1487)
- **趋势判断**：大家最关心的不只是新增技能，而是 **技能是否真的触发、评测是否真实、指标是否可信**。

### C. 文档类 Skills 继续扩张
- **代表方向**：PDF / DOCX / ODT / 文档排版 / SharePoint 文档处理
- **代表 PR/Issue**：[#538](https://github.com/anthropics/skills/pull/538)、[#541](https://github.com/anthropics/skills/pull/541)、[#486](https://github.com/anthropics/skills/pull/486)、[#514](https://github.com/anthropics/skills/pull/514)
- **趋势判断**：文档生成不再只是“写内容”，而是 **格式、排版、兼容性、可编辑性** 的全链路控制。

### D. 测试、审查、质量门禁类 Skills 需求上升
- **代表 PR/Issue**：[#723](https://github.com/anthropics/skills/pull/723)、[#1367](https://github.com/anthropics/skills/pull/1367)、[#1385](https://github.com/anthropics/skills/issues/1385)
- **趋势判断**：社区明显希望 Claude 不只是“产出”，还要具备 **自检、审查、验证、质量门禁** 能力。

### E. 垂直领域操作型 Skills 增长
- **代表 PR**：[#568](https://github.com/anthropics/skills/pull/568)（ServiceNow）、[#525](https://github.com/anthropics/skills/pull/525)（Pyxel）、[#1615](https://github.com/anthropics/skills/pull/1615)（HPC）、[#1628](https://github.com/anthropics/skills/pull/1628)（多代理编排）
- **趋势判断**：社区开始把 Skills 当成 **行业工作流封装层**，而不是仅限通用助手。

---

## 3) 高潜力待合并 Skills

以下 PR 都属于 **问题明确、修复颗粒度小、落地价值高** 的类型，近期合并概率相对更高：

1. **评测 recall 失真修复**
   - [#1298](https://github.com/anthropics/skills/pull/1298)
   - 价值：直接修复核心评测链路，属于高优先级基础设施问题。

2. **评测序列化/编码/稳定性修复**
   - [#1602](https://github.com/anthropics/skills/pull/1602)
   - 价值：覆盖多个稳定性 bug，通常容易得到“先修后测”的共识。

3. **Windows pipe 崩溃修复**
   - [#1099](https://github.com/anthropics/skills/pull/1099)
   - 价值：兼容性问题明确，属于典型“点修复”。

4. **Windows subprocess + 编码修复**
   - [#1050](https://github.com/anthropics/skills/pull/1050)
   - 价值：同样是高确定性修复，适合快速落地。

5. **PDF 文件引用大小写修复**
   - [#538](https://github.com/anthropics/skills/pull/538)
   - 价值：低风险、高可验证，通常容易合并。

6. **DOCX tracked changes 冲突修复**
   - [#541](https://github.com/anthropics/skills/pull/541)
   - 价值：直接避免文档损坏，属于用户体验与数据安全双重问题。

---

## 4) Skills 生态洞察

**一句话总结：**  
当前社区最集中的诉求是：**让 Skills 从“能生成内容”升级为“可验证、可分发、跨平台稳定、且不会破坏原始文件的可靠工作流组件”。**

如果你愿意，我可以继续把这份报告整理成：
1. **适合汇报的 PPT 风格摘要版**，或  
2. **按“产品/技术/生态”三视角的深度分析版**。

---

以下为 **2026-09-05 Claude Code 社区动态日报**，基于过去 24 小时 GitHub 数据整理。

---

## 1. 今日速览

今天社区讨论几乎被 **Windows/Desktop 相关回归问题** 占据，尤其是跨会话消息、自动更新重启、桌面会话稳定性等问题，且多条带有 `regression`、`has repro` 标签，说明影响面明确、可复现性较高。  
同时，**模型行为与权限/策略一致性** 也是高频焦点，包括模型自动切换、错误拦截、MCP 工具占用上下文、hooks 反复触发等，反映出用户对“可控、稳定、可解释”的期望持续升高。  
此外，今天发布了一个新版本 **v2.1.261**，主要是可观测性与配置容量方面的增强。

---

## 2. 版本发布

### v2.1.261
- 新增 `/status` 和 `claude doctor` 中的 **Organization policy** 行，用于说明组织策略为何无法加载，例如代理未正确透传 endpoint。
- 新增 `bashOutputMaxChars`、`taskOutputMaxChars` 配置，允许提高命令输出和任务输出的截断上限。

链接：  
- [Release v2.1.261](https://github.com/anthropics/claude-code/releases/tag/v2.1.261)

---

## 3. 社区热点 Issues

> 下面挑选的是今天最值得关注的 10 个 Issue，优先考虑：影响范围、是否回归、是否可复现、是否涉及核心工作流。

### 1) Windows/Desktop 远程与跨会话消息失效
- Issue：[#92249](https://github.com/anthropics/claude-code/issues/92249)
- 看点：`ListAgents` / `SendMessage` 在 Desktop scheduled-task 和 Remote Control 会话中缺失，直接影响多会话协作能力。
- 重要性：这是桌面端协同链路的核心能力，回归会显著影响高级用户工作流。
- 社区反应：`has repro` + `regression`，且已有 3 条评论，说明问题清晰且关注度较高。

### 2) Windows Desktop 自更新导致正在运行的会话被强制中断
- Issue：[#92246](https://github.com/anthropics/claude-code/issues/92246)
- 看点：桌面应用自动更新时会停服务并重启，导致正在运行的 session 被打断。
- 重要性：直接影响长任务、自动化和无人值守场景。
- 社区反应：用户明确表达“不允许回避/延期”，说明这是强烈痛点。

### 3) CCD 更新后跨会话 peer messaging 断裂
- Issue：[#92258](https://github.com/anthropics/claude-code/issues/92258)
- 看点：从 2.1.258 升到 2.1.260 后，`SendMessage` / `ListAgents` 失效。
- 重要性：属于版本升级引入的回归，通常需要优先修复。
- 社区反应：虽然暂无评论，但描述清楚且版本边界明确，便于定位。

### 4) 关键规则在多轮对话中“衰减”
- Issue：[#92257](https://github.com/anthropics/claude-code/issues/92257)
- 看点：用户标记的 critical rules 需要在每轮前重新注入，否则会逐步失效。
- 重要性：这是模型行为一致性问题，影响复杂任务的可靠执行。
- 社区反应：属于架构/提示词层面的深层问题，容易引发大量后续衍生反馈。

### 5) 明确禁止提交时仍会自动 commit
- Issue：[#92256](https://github.com/anthropics/claude-code/issues/92256)
- 看点：用户明确要求“不提交”，但 Claude Code 仍执行了 commit。
- 重要性：涉及权限边界与用户控制权，是开发工具可信度的核心。
- 社区反应：与此前旧问题相似，说明用户对这类行为非常敏感。

### 6) MCP 工具 schema 在禁用连接器后仍占用上下文
- Issue：[#92255](https://github.com/anthropics/claude-code/issues/92255)
- 看点：即使关闭所有 connector，MCP tool schemas 仍消耗 context tokens。
- 重要性：直接影响上下文预算、成本和长上下文体验。
- 社区反应：对效率型用户影响明显，且问题定位较具体。

### 7) `--setting-sources` 文档不清晰
- Issue：[#92254](https://github.com/anthropics/claude-code/issues/92254)
- 看点：缺少各来源值对应控制范围的说明，涉及 CLAUDE.md、plugins、hooks、skills、agents 等。
- 重要性：设置系统越来越复杂，文档不清会显著增加排障成本。
- 社区反应：属于典型“功能已存在、解释不足”的需求。

### 8) 频繁要求手动重置模型，打断交互流程
- Issue：[#92253](https://github.com/anthropics/claude-code/issues/92253)
- 看点：用户在交互过程中频繁被切换/提示重设模型。
- 重要性：说明模型选择与会话稳定性仍是体验短板。
- 社区反应：虽然语气激烈，但反映出高频工作流被反复打断。

### 9) macOS Keychain 认证项与 `CLAUDE_CONFIG_DIR` 行为不一致
- Issue：[#92252](https://github.com/anthropics/claude-code/issues/92252)
- 看点：显式设置默认路径后，选择了不同的 Keychain 条目，但没有诊断信息。
- 重要性：认证/密钥管理问题会直接阻塞登录与环境迁移。
- 社区反应：`has repro`，利于快速复现和修复。

### 10) 自动化定时任务重复触发
- Issue：[#92251](https://github.com/anthropics/claude-code/issues/92251)
- 看点：scheduled task 在预定时间前多次自动触发。
- 重要性：影响自动化可靠性，可能导致重复执行、成本浪费和状态污染。
- 社区反应：带有明显“连续多天复现”的特征，属于高优先级稳定性问题。

---

## 4. 重要 PR 进展

### 今日无 PR 更新
- 过去 24 小时内 **Pull Requests 更新为 0 条**，因此本日报暂无可分析的 PR 合并/评审进展。

链接：  
- [Claude Code Pull Requests](https://github.com/anthropics/claude-code/pulls)

---

## 5. 功能需求趋势

从今天的 Issues 看，社区关注点主要集中在以下方向：

1. **Desktop / Windows 稳定性与会话恢复**
   - 包括自动更新不中断、跨会话消息、scheduled-task、remote control 等。
   - 说明桌面端已成为高强度使用场景，稳定性要求显著提高。

2. **模型控制与行为一致性**
   - 例如模型切换、规则保持、自动模式、错误拦截。
   - 用户希望模型行为更可预测、更少“自行改动”。

3. **权限、提交与安全边界**
   - 包括 commit 误执行、权限弹窗、策略加载、浏览器访问限制。
   - 核心诉求是“明确授权、明确反馈、明确拒绝原因”。

4. **MCP / Tools / Context 成本治理**
   - 工具 schema 占用上下文、浏览器工具失败、权限检查不可用。
   - 社区对工具链的效率和 token 成本非常敏感。

5. **Hooks / Plugins / Automation 的可靠性**
   - 触发重复、安装后残留、规则/钩子生命周期管理。
   - 这类问题直接影响自动化工作流的可用性。

6. **文档与可观测性**
   - 例如 `/status`、`claude doctor`、`--setting-sources` 的说明不足。
   - 当系统复杂度提高时，用户更需要可诊断、可解释。

---

## 6. 开发者关注点

从今天的反馈里，可以提炼出开发者最应关注的几个痛点：

- **回归问题多，且集中在桌面端与 Windows**
  - 多个 issue 都是最近版本升级后出现，说明需要加强回归测试与发布门禁。

- **会话连续性是高优先级**
  - 用户对“任务不能被打断”非常敏感，尤其是长任务、后台任务、远程控制场景。

- **权限与自动执行边界需要更强约束**
  - commit、模型切换、hook 重触发等行为如果超出用户预期，会迅速损害信任。

- **工具链上下文成本需要治理**
  - MCP schemas、工具注册、browser pane、多个连接器场景，都会影响 token 和稳定性。

- **诊断信息不足会放大支持成本**
  - 新增的 organization policy / doctor 信息方向是对的，但用户仍需要更明确的失败原因与修复建议。

- **文档是复杂能力落地的关键**
  - `--setting-sources` 这类问题说明：功能复杂后，文档不清本身就会变成产品问题。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发到团队群里的超简版**，或  
2. **适合周报/邮件的正式版**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报  
**日期：2026-09-05**  
数据范围：过去 24 小时内的 Releases、Issues、PRs

---

## 1) 今日速览
今天 Codex 的核心变化集中在 **Astra 模型可见性与默认路由修复**、**异步提问能力补齐**，以及 **TUI/桌面端交互稳定性** 的持续打磨。  
社区反馈则明显聚焦在 **Windows/macOS/Linux 多平台稳定性**、**模型选择器异常**、**MCP/工具调用失效** 和 **配额/限流体验** 等实际使用问题上。  
整体看，产品正同时推进“新模型上线”和“可用性修复”，且后者仍是社区最敏感的议题。

---

## 2) 版本发布

### `rust-v0.153.4` / `0.153.4`
- [Release 链接](https://github.com/openai/codex/releases/tag/rust-v0.153.4)
- **更新重点**
  - 修复 Astra 在内置模型选择器中的可见性问题，并在未显式配置模型时将其设为 bundled default。
  - 调整 Astra 的异步提问指引：仅在会话中工具可用时才使用异步问题。

### `rust-v0.153.3` / `0.153.3`
- [Release 链接](https://github.com/openai/codex/releases/tag/rust-v0.153.3)
- **更新重点**
  - 将 GPT-6-Astra 加入 Amazon Bedrock 模型选择器，覆盖 Mantle 和 Runtime 的 global/US 路由。
  - 修正 Astra 关于异步澄清问题的指引，明确其仅接受文本输入并使用受支持工具。

---

## 3) 社区热点 Issues

> 选取标准：**评论数较高 + 影响范围广 + 能反映当前产品痛点**

1. **[#42868](https://github.com/openai/codex/issues/42868) - Astra 在 Codex Linux 上无法稳定显示**  
   - 重要性：直接影响新模型在 Linux CLI/应用中的可发现性，且与最新发布内容强相关。  
   - 社区反应：**7 条评论**，是当前最活跃的问题之一，说明 Astra 上线后的兼容性还未完全稳定。

2. **[#42853](https://github.com/openai/codex/issues/42853) - Windows Desktop 模型选择器里缺少 GPT-6 Astra**  
   - 重要性：影响 Pro 用户对新模型的入口可见性，属于“功能已发布但用户看不到”的典型问题。  
   - 社区反应：**6 条评论**，反馈集中，表明桌面端模型分发/展示链路存在一致性问题。

3. **[#42907](https://github.com/openai/codex/issues/42907) - Windows 自定义远程 MCP：先显示已发现，首次调用提示禁用，随后命名空间消失**  
   - 重要性：直接打击 MCP 工作流稳定性，会让可用工具在运行中“消失”。  
   - 社区反应：**5 条评论**，问题描述较具体，属于高优先级的工具发现/状态同步 bug。

4. **[#42912](https://github.com/openai/codex/issues/42912) - 5 小时配额在重置后仍然异常消耗，且空闲时继续下降**  
   - 重要性：影响计费与使用预期，是典型的“信任问题”。  
   - 社区反应：**2 条评论**，虽然讨论量不高，但属于高敏感度的成本/额度异常。

5. **[#42915](https://github.com/openai/codex/issues/42915) - task_complete 后仍持续发起 Terra 请求 5 分钟**  
   - 重要性：会导致无谓 token 消耗，属于成本和状态机同步问题。  
   - 社区反应：**1 条评论**，但问题本身指向“任务结束后仍在后台运行”的关键缺陷。

6. **[#42914](https://github.com/openai/codex/issues/42914) - VPN 断开后 Responses WebSocket 进入黑洞，CLI 一直 Thinking 5 分钟**  
   - 重要性：暴露连接恢复与超时处理不足，影响 CLI 可靠性。  
   - 社区反应：**1 条评论**，场景虽小众，但对网络波动敏感的用户影响大。

7. **[#42911](https://github.com/openai/codex/issues/42911) - Computer Use 服务空闲时每 10 分钟唤醒睡眠显示器**  
   - 重要性：属于“后台常驻服务副作用”，直接影响电源管理和设备体验。  
   - 社区反应：**1 条评论**，问题清晰，偏系统级资源误触发。

8. **[#42906](https://github.com/openai/codex/issues/42906) - Astra 在普通多智能体 bug triage 中反复触发 `cyber_policy`**  
   - 重要性：说明安全策略可能对正常开发/排障任务过度拦截。  
   - 社区反应：**1 条评论**，但对安全审核与可用性平衡具有代表性。

9. **[#42905](https://github.com/openai/codex/issues/42905) - Windows Desktop 本地命令执行器报 helper_unknown_error**  
   - 重要性：命令执行是 Codex 核心能力，执行器失败会让整个本地代理链路受阻。  
   - 社区反应：**1 条评论**，偏底层但极其关键。

10. **[#42893](https://github.com/openai/codex/issues/42893) - macOS 电池模式下滚动明显卡顿**  
    - 重要性：影响桌面应用日常可用性，尤其是长时间交互场景。  
    - 社区反应：**1 条评论**，属于典型性能体验问题。

---

## 4) 重要 PR 进展

1. **[#42904](https://github.com/openai/codex/pull/42904) - 为 Default collaboration mode 使用静态指令**  
   - 将 Default/Plan 指令直接写入默认模式说明，移除模板渲染和相关依赖，降低复杂度。

2. **[#42903](https://github.com/openai/codex/pull/42903) - 保留 TUI 问题状态，并接入历史与队列导航**  
   - 修复问答草稿、选择状态、展开状态在恢复和重连后的丢失问题，提升长会话稳定性。

3. **[#42900](https://github.com/openai/codex/pull/42900) - 为独立任务和 memory 请求建立 root turn identity**  
   - 补齐 turn 身份链路，避免背景任务、空输入 turn、memory 请求缺失根标识。

4. **[#42897](https://github.com/openai/codex/pull/42897) - 给异步问题增加 inline Other 选项**  
   - 支持用户直接输入非预设答案，增强异步提问的灵活性。

5. **[#42894](https://github.com/openai/codex/pull/42894) - 支持异步 TUI 问题的可选答案展示**  
   - 将 suggested answers 在 TUI 中完整展示并强制可见，提高提问交互质量。

6. **[#42891](https://github.com/openai/codex/pull/42891) - 将异步问题整合进 TUI**  
   - 支持查看、回答、排队、跳过问题，并保持主输入框草稿不被打断。

7. **[#42883](https://github.com/openai/codex/pull/42883) - 增加 exec-server RPC 客户端尝试指标**  
   - 为请求失败、超时、取消、传输异常等场景补充可观测性，便于排查执行链路问题。

8. **[#42879](https://github.com/openai/codex/pull/42879) - 在模型选择器中列出 GPT-6-Astra**  
   - 将 Astra 的 bundled visibility 设为 `list`，让其优先出现在交互式模型选择器中。

9. **[#42878](https://github.com/openai/codex/pull/42878) - Astra 异步提问指引按工具可用性加条件**  
   - 避免在工具不可用时误导用户，修正模型指导文本。

10. **[#42874](https://github.com/openai/codex/pull/42874) - 在 bundled model picker 中显示 Astra**  
    - 解决 catalog 中隐藏 Astra 的问题，并使其成为默认 bundled model 的关键修复。

---

## 5) 功能需求趋势

1. **新模型 Astra 的全平台接入与一致性**
   - 需求集中在“能看到、能选中、能默认生效”，而不是单纯“模型上线”。  
   - 代表性问题：[#42868](https://github.com/openai/codex/issues/42868)、[#42853](https://github.com/openai/codex/issues/42853)

2. **异步提问/多轮交互能力增强**
   - 社区明显希望在 TUI/桌面端中更自然地处理“等待用户确认”的场景。  
   - 代表性 PR/问题：[#42891](https://github.com/openai/codex/pull/42891)、[#42894](https://github.com/openai/codex/pull/42894)、[#42897](https://github.com/openai/codex/pull/42897)

3. **多平台桌面端稳定性**
   - Windows、macOS、Linux 同时出现模型展示、滚动性能、控件行为、任务切换等问题。  
   - 代表性问题：[#42905](https://github.com/openai/codex/issues/42905)、[#42893](https://github.com/openai/codex/issues/42893)、[#42856](https://github.com/openai/codex/issues/42856)

4. **工具调用与 MCP/远程执行可靠性**
   - 用户希望 remote MCP、local runner、exec-server 不要“发现了又失效”。  
   - 代表性问题：[#42907](https://github.com/openai/codex/issues/42907)、[#42864](https://github.com/openai/codex/issues/42864)

5. **会话状态、任务状态与恢复能力**
   - 长会话里草稿、队列、root turn、history 需要稳定保留，否则用户会感觉“上下文丢失”。  
   - 代表性 PR：[#42903](https://github.com/openai/codex/pull/42903)、[#42900](https://github.com/openai/codex/pull/42900)

6. **配额、计费与后台耗用透明化**
   - 用户对“空闲也耗额度”“任务结束后继续请求”非常敏感。  
   - 代表性问题：[#42912](https://github.com/openai/codex/issues/42912)、[#42915](https://github.com/openai/codex/issues/42915)

7. **安全策略误判与可解释性**
   - 开发者希望安全检查更准确，避免对授权的防御性工作或普通 triage 误伤。  
   - 代表性问题：[#42906](https://github.com/openai/codex/issues/42906)、[#42885](https://github.com/openai/codex/issues/42885)、[#42866](https://github.com/openai/codex/issues/42866)

---

## 6) 开发者关注点

- **“模型已发布，但用户入口不稳定”**：Astra 的发布节奏很快，但模型选择器、默认路由、平台可见性仍在补漏洞。  
  - 参考：[#42868](https://github.com/openai/codex/issues/42868)、[#42853](https://github.com/openai/codex/issues/42853)、[#42874](https://github.com/openai/codex/pull/42874)

- **“交互式工作流要更像产品，而不是协议”**：异步问题、队列、历史恢复、草稿保留，说明用户期待更完整的对话式开发体验。  
  - 参考：[#42891](https://github.com/openai/codex/pull/42891)、[#42903](https://github.com/openai/codex/pull/42903)

- **“工具链失败不能静默”**：MCP、exec-server、local runner、WebSocket 中断一旦失效，用户会直接卡住。  
  - 参考：[#42907](https://github.com/openai/codex/issues/42907)、[#42914](https://github.com/openai/codex/issues/42914)、[#42905](https://github.com/openai/codex/issues/42905)

- **“成本与额度必须可预期”**：后台继续请求、空闲耗配额、banked reset 异常，都是信任风险。  
  - 参考：[#42912](https://github.com/openai/codex/issues/42912)、[#42915](https://github.com/openai/codex/issues/42915)、[#42888](https://github.com/openai/codex/issues/42888)

- **“安全边界要精准，不要过度拦截”**：Astra 的 `cyber_policy` 误触发表明安全检查仍需更细粒度。  
  - 参考：[#42906](https://github.com/openai/codex/issues/42906)、[#42885](https://github.com/openai/codex/issues/42885)

- **“桌面端体验不能拖后腿”**：滚动卡顿、控件异常、项目切换错乱等问题，正在持续影响主力用户。  
  - 参考：[#42893](https://github.com/openai/codex/issues/42893)、[#42856](https://github.com/openai/codex/issues/42856)、[#42862](https://github.com/openai/codex/issues/42862)

---

如果你希望，我还可以把这份日报进一步整理成：
1. **适合 Slack/飞书群的短版**  
2. **适合周报汇总的长版**  
3. **按“产品 / 工程 / 安全 / 体验”四类重排的管理层摘要**

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-09-05）

## 1) 今日速览
今天 Gemini CLI 的更新重心非常明确：**安全加固、配置隔离、以及模型/工具链行为修正**。从 nightly release 到多个高优先级 PR，可以看出团队在持续收紧命令执行边界、修复模型路由异常，并提升对异常配置与 MCP 输出的容错能力。  
社区侧虽然更新的 Issue 数量不多，但几乎全部集中在 **模型选择错误、MCP 文本编码、配置文件损坏、Shell 包装绕过策略** 等“正确性 + 安全性”问题上。

---

## 2) 版本发布

### `v0.60.0-nightly.20260905.g85aca163f`
链接：[Release](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-nightly.20260905.g85aca163f)

已披露的更新重点包括：
- **修复扩展环境变更的 consent 提示**，并对会改变运行时行为的环境变量做清洗
- **增强 workspace 路径边界检查与 symlink 解析**，进一步加强命令安全与文件系统边界

整体来看，这个 nightly 版本明显偏向 **安全修复与执行边界收敛**，符合近期社区反馈方向。

---

## 3) 社区热点 Issues
> 过去 24 小时仅有 4 条更新 Issue，以下全部列出。

### 1. [#29213] Unexpected model resolution: gemini-2.5-flash is mapped to gemini-3.5-flash
链接：[Issue #29213](https://github.com/google-gemini/gemini-cli/issues/29213)  
- **重要性**：这是一个典型的“用户显式指定模型却被静默改写”的问题，直接影响结果可复现性和用户信任，且优先级为 **p1**。
- **社区反应**：已被 bot triage，评论数为 3，说明问题很快引发了确认/排查，但当前仍未解决。
- **影响面**：尤其涉及 Vertex AI 场景，可能导致调用失败或模型能力偏差。

### 2. [#29204] MCP prompt responses are submitted as JSON-encoded text
链接：[Issue #29204](https://github.com/google-gemini/gemini-cli/issues/29204)  
- **重要性**：这会破坏 MCP server 返回的原始文本语义，把合法文本变成 JSON 编码后的字符串，属于工具链数据污染问题。
- **社区反应**：评论数 2，且标注 `need-information`，说明复现路径已经比较明确，但仍需要更多上下文确认。
- **影响面**：会影响提示词、代码片段、引号/换行等内容的精确传递，属于“看似小但会广泛影响体验”的 bug。

### 3. [#29207] Corrupt agents.json (valid JSON, wrong shape) crashes acknowledgment
链接：[Issue #29207](https://github.com/google-gemini/gemini-cli/issues/29207)  
- **重要性**：这是配置文件鲁棒性问题。`agents.json` 虽然是合法 JSON，但 shape 错误会导致 acknowledgment 崩溃或静默丢失，风险很高。
- **社区反应**：已有 1 条评论，且被 bot triaged；从描述看，问题已经有较强的复现证据。
- **影响面**：涉及升级中断、磁盘异常、同步冲突等常见真实场景，属于“生产环境高概率异常输入”。

### 4. [#29202] Policy bypass: shell-wrapper flags skip inner command re-check
链接：[Issue #29202](https://github.com/google-gemini/gemini-cli/issues/29202)  
- **重要性**：这是安全绕过类问题。`bash -x -c`、`powershell -ExecutionPolicy Bypass` 等包装参数可能绕过内层命令复检。
- **社区反应**：虽只有 1 条评论，但问题本身明显偏安全，且标注了 `manual-triage`。
- **影响面**：可能让策略引擎对高风险命令失去拦截能力，属于优先级极高的修复方向。

---

## 4) 重要 PR 进展
> 下面选取 10 个对稳定性、安全性和用户体验影响最大的 PR。

### 1. [#29217] fix(config): don't rewrite explicit gemini-2.5-flash model selection
链接：[PR #29217](https://github.com/google-gemini/gemini-cli/pull/29217)  
- 修复“显式指定 `gemini-2.5-flash` 却被自动升级为 `gemini-3.5-flash`”的问题。
- 这是对 Issue #29213 的直接响应，核心价值是**保留用户明确意图**。

### 2. [#29216] fix(cli): isolate settings directory in sandbox containers
链接：[PR #29216](https://github.com/google-gemini/gemini-cli/pull/29216)  
- 在容器 sandbox 中隔离用户配置目录，避免直接挂载宿主机 `~/.gemini`。
- 重点是减少 OAuth token、账号凭据、认证信息等敏感数据暴露。

### 3. [#29215] fix(core): enforce envelope metadata provenance for untrusted tool outputs
链接：[PR #29215](https://github.com/google-gemini/gemini-cli/pull/29215)  
- 强化对外部工具和 MCP 输出的元数据来源校验。
- 目标是防止模型把未验证字段当作权威事实，提升安全与可解释性。

### 4. [#29214] fix(sandbox): harden filesystem boundaries and isolate runtime state
链接：[PR #29214](https://github.com/google-gemini/gemini-cli/pull/29214)  
- 进一步收紧 sandbox 文件系统边界，隔离运行时状态。
- 这类改动对“容器内执行但不泄露宿主环境”非常关键。

### 5. [#29212] fix(cli): validate system configuration path ownership and access con…
链接：[PR #29212](https://github.com/google-gemini/gemini-cli/pull/29212)  
- 校验系统配置文件路径的所有权与访问控制。
- 属于防止配置劫持、权限误配的重要安全修复；该 PR 已关闭，说明修复已落地。

### 6. [#29211] fix(cli): stop scheduling state updates from inside a state updater
链接：[PR #29211](https://github.com/google-gemini/gemini-cli/pull/29211)  
- 修复 React state updater 内嵌调度导致的状态更新问题。
- 主要价值在于降低输入历史/会话状态相关的 UI 不稳定风险。

### 7. [#29209] fix(core): skip non-numeric background PID lines
链接：[PR #29209](https://github.com/google-gemini/gemini-cli/pull/29209)  
- 跳过非数字的后台 PID 行，避免 `NaN` 进入 `llmContent`。
- 这类修复偏“脏输出清洗”，对工具结果稳定性很重要。

### 8. [#29208] fix(core): fall back to empty on malformed agents.json shape
链接：[PR #29208](https://github.com/google-gemini/gemini-cli/pull/29208)  
- 对 `agents.json` 的错误 shape 做容错回退，避免崩溃。
- 直接对应 Issue #29207，是典型的“配置损坏不致命化”修复。

### 9. [#29205] fix(cli): submit MCP prompt text without JSON encoding
链接：[PR #29205](https://github.com/google-gemini/gemini-cli/pull/29205)  
- 不再把 MCP prompt 文本 JSON 编码后提交。
- 这是对 Issue #29204 的正面修复，确保引号、换行和原始文本语义被完整保留。

### 10. [#29203] fix(security): strip shell wrappers carrying extra flags
链接：[PR #29203](https://github.com/google-gemini/gemini-cli/pull/29203)  
- 扩展 shell wrapper 识别能力，处理带额外 flags 的包装命令。
- 直接服务于安全策略复检，修补绕过路径。

---

## 5) 功能需求趋势
从今天的 Issues 看，社区关注点主要集中在以下几个方向：

1. **模型选择与路由一致性**
   - 代表问题：[#29213](https://github.com/google-gemini/gemini-cli/issues/29213)
   - 用户希望“我指定什么模型，就必须是什么模型”，不能被后台自动改写。

2. **MCP / 工具链文本保真**
   - 代表问题：[#29204](https://github.com/google-gemini/gemini-cli/issues/29204)
   - 需求是原样传递文本，不要在 prompt、quote、newline 上做破坏性编码。

3. **配置文件与状态文件鲁棒性**
   - 代表问题：[#29207](https://github.com/google-gemini/gemini-cli/issues/29207)
   - 社区希望 CLI 对损坏配置“优雅降级”，而不是崩溃。

4. **命令执行安全与绕过防护**
   - 代表问题：[#29202](https://github.com/google-gemini/gemini-cli/issues/29202)
   - 对 shell wrapper、内外层命令复检、sandbox 边界的需求显著增强。

整体上看，今天没有明显的新“功能扩展”诉求，更多是对 **可靠性、安全性、可预期行为** 的持续强化。

---

## 6) 开发者关注点
结合今天的 Issue/PR 反馈，开发者最需要关注的痛点主要有：

- **不要静默改写用户输入**
  - 尤其是模型名、命令内容、prompt 文本这类显式输入。

- **默认要 fail-closed，而不是 fail-open**
  - 对安全策略、MCP allowlist、shell wrapper 识别都应如此。

- **对脏数据和坏配置要有容错**
  - `agents.json`、系统配置、后台输出等都不应轻易把 CLI 搞崩。

- **隔离宿主机状态与 sandbox 运行态**
  - 容器化/沙箱场景下尤其要避免凭据泄露和路径污染。

- **工具输出的“元数据”和“正文”要严格区分**
  - 外部工具返回的信息必须经过可信来源校验，不能让模型误用未验证字段。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合公众号/周报的精简版**，或  
2. **面向工程团队的“风险优先级表”版本**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# 2026-09-05 GitHub Copilot CLI 社区动态日报

## 1) 今日速览
过去 24 小时，Copilot CLI 主要集中在 **模型能力扩展、沙箱/Windows 兼容性修复、以及 MCP/工具链稳定性** 三条线。最新版本已开始支持 **GPT-6 Astra**，同时社区侧则高度关注 **内存崩溃、prompt caching 失效、工具调用链路异常** 等影响体验和成本的问题。  
整体来看，这是一个“**功能持续推进，但稳定性与集成可靠性仍是焦点**”的时间窗口。

---

## 2) 版本发布

### v1.0.84-1
- **新增**：支持 **GPT-6 Astra**  
- 链接：https://github.com/github/copilot-cli/releases/tag/v1.0.84-1

### v1.0.84-0
- **新增**：托管沙箱会话可在被批准的 bypass prompt 后，关闭本次会话剩余时间的沙箱模式
- **修复**：
  - PowerShell 写入沙箱时的 offer/run 行为异常
  - 多 GitHub 账号凭据场景下，沙箱化 gh 命令的账号选择异常
- 链接：https://github.com/github/copilot-cli/releases/tag/v1.0.84-0

### v1.0.83
- **Windows 11 任务栏**展示运行中的 Copilot 会话与悬停状态卡片
- **MCP OAuth sign-in** 增加 CIMD 支持
- 自定义 agent 可在 `model` 中配置多个模型按顺序尝试，并支持 `model-policy: required`
- 链接：https://github.com/github/copilot-cli/releases/tag/v1.0.83

---

## 3) 社区热点 Issues

> 说明：本周期大多数 Issue 仍处于 triage，社区互动整体偏低，普遍为 **0 评论 / 0 👍**；只有少数问题已经出现确认性反馈。

1. **#4731** [tools/list 刷新打到刚取消的 MCP 服务，导致超时并永久丢失该服务工具](https://github.com/github/copilot-cli/issues/4731)  
   - **为什么重要**：这是典型的“会话级工具链失联”问题，一旦触发，整个进程生命周期内该服务都可能不可用，影响面很大。  
   - **社区反应**：新报问题，当前 **0 评论 / 0 👍**，但描述非常具体，属于高优先级稳定性缺陷。

2. **#4728** [自动更新重写了启动它的 `copilot.exe`，破坏 GitHub Copilot 桌面应用内置 CLI](https://github.com/github/copilot-cli/issues/4728)  
   - **为什么重要**：直接影响桌面端应用捆绑的 CLI，属于高风险升级/自更新问题，可能导致会话恢复失败。  
   - **社区反应**：**0 评论 / 0 👍**，但影响范围大，值得尽快确认修复策略。

3. **#4725** [频繁出现 JavaScript heap out of memory](https://github.com/github/copilot-cli/issues/4725)  
   - **为什么重要**：这是最典型的稳定性/性能问题之一，涉及进程级崩溃，且可能与长期运行、上下文增长或内存泄漏相关。  
   - **社区反应**：已有 **1 条评论**，说明问题已被注意到，属于较明确的痛点。

4. **#4720** [BYOK 模式下静默禁用 prompt caching，成本显著上升](https://github.com/github/copilot-cli/issues/4720)  
   - **为什么重要**：这不是单纯的性能问题，而是直接影响 **推理成本** 和响应延迟，且容易被用户“无感”放大。  
   - **社区反应**：**0 评论 / 0 👍**，但对 BYOK 用户非常关键。

5. **#4724** [希望在空闲后自动 compact，并与模型的 prompt cache TTL 对齐](https://github.com/github/copilot-cli/issues/4724)  
   - **为什么重要**：这是明显的体验/成本优化诉求，目标是减少 idle 后的全量上下文重读。  
   - **社区反应**：**0 评论 / 0 👍**，属于典型功能需求型提案，方向感很清晰。

6. **#4719** [Windows 下 detached 的 PowerShell 命令被误报完成，但子进程仍在运行](https://github.com/github/copilot-cli/issues/4719)  
   - **为什么重要**：工具执行状态不一致会直接影响自动化流程，容易造成上层 agent 误判执行结果。  
   - **社区反应**：**0 评论 / 0 👍**，但对 Windows 场景影响明显。

7. **#4721** [Canvas 的 `open_canvas` 参数在 CLI 中被破坏，属于 JSON-RPC 序列化 bug](https://github.com/github/copilot-cli/issues/4721)  
   - **为什么重要**：工具参数被篡改会导致扩展能力失效，是 agent/扩展生态最敏感的一类问题。  
   - **社区反应**：**0 评论 / 0 👍**，但定位非常明确，便于排查。

8. **#4723** [本地插件 custom agent 场景下，`--interactive` 启动 prompt 被静默丢失](https://github.com/github/copilot-cli/issues/4723)  
   - **为什么重要**：这是明显的交互流问题，影响命令行启动即提问的核心 UX。  
   - **社区反应**：**0 评论 / 0 👍**，属于“能用但不对”的高频体验缺陷。

9. **#4722** [以下划线开头的文本在聊天气泡和输出中消失，疑似 Markdown 未闭合强调解析问题](https://github.com/github/copilot-cli/issues/4722)  
   - **为什么重要**：会破坏用户输入的文本完整性，属于 UI/渲染层面的数据可见性问题。  
   - **社区反应**：**0 评论 / 0 👍**，但影响面广，容易在日常对话中触发。

10. **#4729** [内置 research agent 让 subagent 调用并不存在的 `github/get_me` 工具](https://github.com/github/copilot-cli/issues/4729)  
   - **为什么重要**：这是 agent prompt 与实际 MCP 工具暴露不一致的问题，会造成链路自相矛盾。  
   - **社区反应**：**0 评论 / 0 👍**，但它反映的是“提示词契约”与“工具能力”之间的结构性偏差。

---

## 4) 重要 PR 进展
- **本周期无 PR 更新**（过去 24 小时内 PR 共 0 条）。  
- 因此暂无可单独总结的 PR 合并/修复进展。  
- 链接：https://github.com/github/copilot-cli/pulls

---

## 5) 功能需求趋势

1. **MCP / 工具调用可靠性成为核心关注点**  
   - 典型表现：`tools/list` 刷新、Canvas 参数序列化、research agent 工具契约不一致。  
   - 代表 Issue：[#4731](https://github.com/github/copilot-cli/issues/4731), [#4721](https://github.com/github/copilot-cli/issues/4721), [#4729](https://github.com/github/copilot-cli/issues/4729)

2. **性能与成本优化需求升温**  
   - 典型表现：heap out of memory、prompt caching 失效、自动 compact。  
   - 代表 Issue：[#4725](https://github.com/github/copilot-cli/issues/4725), [#4720](https://github.com/github/copilot-cli/issues/4720), [#4724](https://github.com/github/copilot-cli/issues/4724)

3. **Windows / PowerShell / 桌面端集成问题仍然突出**  
   - 典型表现：PowerShell detached 状态、桌面应用内置 CLI 被自更新破坏、任务栏状态同步。  
   - 代表 Issue：[#4719](https://github.com/github/copilot-cli/issues/4719), [#4728](https://github.com/github/copilot-cli/issues/4728)

4. **自定义 agent 与交互式启动流程的可用性需求增强**  
   - 典型表现：本地插件 agent 下启动 prompt 丢失、模型策略多选、交互一致性。  
   - 代表 Issue：[#4723](https://github.com/github/copilot-cli/issues/4723), [#4720](https://github.com/github/copilot-cli/issues/4720)

5. **文本渲染与会话状态同步属于“低层但高频”的体验痛点**  
   - 典型表现：下划线丢失、Changes tab 不刷新、reconnect 后状态不一致。  
   - 代表 Issue：[#4722](https://github.com/github/copilot-cli/issues/4722), [#4727](https://github.com/github/copilot-cli/issues/4727)

---

## 6) 开发者关注点

1. **工具链状态必须更强的一致性保障**  
   - 问题集中在“已取消/已超时/已重载”后的状态恢复与刷新逻辑。  
   - 相关：[#4731](https://github.com/github/copilot-cli/issues/4731), [#4726](https://github.com/github/copilot-cli/issues/4726)

2. **自动更新与捆绑分发需要更谨慎的边界控制**  
   - 直接重写运行中的 `copilot.exe`，对桌面端集成风险很高。  
   - 相关：[#4728](https://github.com/github/copilot-cli/issues/4728)

3. **需要持续监控内存占用与长会话退化**  
   - `heap out of memory` 和 prompt cache 失效会叠加放大成本。  
   - 相关：[#4725](https://github.com/github/copilot-cli/issues/4725), [#4720](https://github.com/github/copilot-cli/issues/4720)

4. **Windows/PowerShell 路径上的异步与 detached 语义要严格校准**  
   - 这类问题会直接影响 agent 对“命令是否完成”的判断。  
   - 相关：[#4719](https://github.com/github/copilot-cli/issues/4719)

5. **Agent prompt、模型能力、实际工具暴露必须保持契约一致**  
   - 否则会出现看似“模型幻觉”，实则是产品定义不一致的问题。  
   - 相关：[#4729](https://github.com/github/copilot-cli/issues/4729), [#4723](https://github.com/github/copilot-cli/issues/4723)

---

如果你希望，我也可以把这份日报进一步整理成：
- **面向管理层的一页摘要版**
- **适合发到 Slack/飞书的精简版**
- **按“稳定性 / 功能 / 成本 / Windows”四象限分类版**

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报  
**日期：2026-09-05**  
**数据来源：** `github.com/MoonshotAI/kimi-cli`  
**统计窗口：** 过去 24 小时

---

## 1. 今日速览
今天社区动态较少：**没有新 Releases，也没有新增/更新的 PR**。  
Issues 方面仅有 **1 条有效更新**，集中在 **Windows Terminal / PowerShell 下的按键映射与粘贴快捷键失效**，说明当前社区关注点主要仍在**终端兼容性与输入交互体验**上。

---

## 2. 版本发布
**无新 Releases。**

---

## 3. 社区热点 Issues
> 说明：过去 24 小时内仅更新了 **1 条 Issue**，因此以下为本期全部热点。

### 1) `#2634` [OPEN] [bug] kimi终端改键位不成功，比如粘贴  
- **链接：** https://github.com/MoonshotAI/kimi-cli/issues/2634  
- **为什么重要：**  
  这是一个直接影响日常使用效率的基础交互问题：在 **0.40.1 + Windows Terminal + PowerShell** 环境下，用户无法正常使用 `Ctrl+V` 粘贴，且终端内按键重映射似乎不生效。对 CLI 工具而言，输入/粘贴是高频核心操作，这类问题会明显降低可用性。
- **社区反应：**  
  当前**暂无评论、暂无点赞**，说明该问题可能刚被提交，尚未形成更多讨论。但从问题描述看，属于典型的“高优先级体验 bug”，值得开发者尽快复现和确认。

---

## 4. 重要 PR 进展
> 本期 **无 PR 更新**。

- **PR 列表：** 暂无  
- **链接：** https://github.com/MoonshotAI/kimi-cli/pulls

---

## 5. 功能需求趋势
> 由于本期仅有 1 条 Issue，以下趋势为**基于当前样本的单点观察**，适合作为短期关注方向。

### 当前最明显的需求方向
1. **Windows 终端兼容性**
   - 终端环境：Windows Terminal、PowerShell
   - 问题集中在按键行为、快捷键映射、粘贴可用性

2. **快捷键/键位自定义能力**
   - 用户希望能“改键位”
   - 说明 CLI 工具的可配置输入层仍有优化空间

3. **基础输入体验稳定性**
   - 粘贴、复制、快捷键等基础操作一旦异常，会直接影响 CLI 的可用性和 adoption

- **相关链接：**  
  - Issue #2634: https://github.com/MoonshotAI/kimi-cli/issues/2634

---

## 6. 开发者关注点
结合本期反馈，开发者可以重点关注以下痛点：

1. **终端输入链路的跨平台一致性**
   - 尤其是 Windows Terminal / PowerShell 组合下的按键行为差异

2. **快捷键重映射是否真正生效**
   - 用户已明确提出“改键位不成功”，建议检查配置解析、事件拦截与终端原生快捷键冲突

3. **粘贴与剪贴板交互**
   - `Ctrl+V` 在不同终端环境中的行为可能受系统/终端设置影响，需要提供清晰的兼容说明或替代方案

4. **问题复现信息的补齐**
   - 当前 Issue 中平台字段部分未完整填写，建议在 issue template 中加强环境信息采集，减少排查成本

- **相关链接：**  
  - Issue #2634: https://github.com/MoonshotAI/kimi-cli/issues/2634

---

## 补充说明
- **本期没有可汇总的新版本发布**
- **本期没有 PR 动态**
- **本期 Issue 样本仅 1 条，因此趋势判断偏保守，后续需结合更多数据验证**

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发群的短版日报**，或  
2. **适合内部周报的分析版**。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

以下为 **2026-09-05 OpenCode 社区动态日报**（基于过去 24 小时 GitHub 更新）。

## 1) 今日速览

过去 24 小时，OpenCode 的主线仍然非常明确：**模型兼容性修复 + 核心工具稳定性修补**。  
最新两个 Release 已把 **Codex/OpenAI OAuth 的 GPT-6 系列过滤问题** 作为重点修复对象，说明社区对“新模型可见性”反馈非常集中。与此同时，Issues 里高频出现 **MCP 回归、Shell/Read/Glob 工具正确性、桌面端崩溃、计费与额度认知偏差** 等问题，整体呈现出“外部模型接入压力”和“核心执行链路可靠性”双重焦点。

---

## 2) 版本发布

### v1.18.29
- 重点修复了 **Codex OAuth 模型过滤**：支持识别整数 GPT 版本（如 `gpt-6`），并修正 `gpt-6-astra` 在 OpenAI 订阅用户中不可见的问题。  
- 这类修复与今天社区高热问题高度一致，属于直接回应用户痛点的补丁。  
- GitHub: [anomalyco/opencode/releases/tag/v1.18.29](https://github.com/anomalyco/opencode/releases/tag/v1.18.29)

### v1.18.28
- Core：为 GitHub Copilot 的请求追踪增加 session ID header，提升跨会话追踪能力。  
- Desktop：修正 OpenCode 账号设备认证时的 client ID 使用，并调大 “open-in” 图标尺寸。  
- GitHub: [anomalyco/opencode/releases/tag/v1.18.28](https://github.com/anomalyco/opencode/releases/tag/v1.18.28)

---

## 3) 社区热点 Issues

1. **[#47363 GPT-6 Astra is missing from the OpenAI Codex OAuth model picker](https://github.com/anomalyco/opencode/issues/47363)**  
   这是今天最热的模型可见性问题，**3 条评论 + 20 👍**，热度显著高于其他条目。问题直接影响 OpenAI OAuth 用户能否使用 `gpt-6-astra`，并且已和后续 release 修复形成呼应。

2. **[#47312 [FEATURE]: Add Support for Augure AI Models](https://github.com/anomalyco/opencode/issues/47312)**  
   **5 条评论**，说明社区对新模型/新供应商接入需求很明确。该类需求通常代表 OpenCode 的“provider 扩展能力”仍是核心竞争点。

3. **[#47405 [2.0] v2: OpenAI OAuth filters out gpt-6-astra](https://github.com/anomalyco/opencode/issues/47405)**  
   **2 条评论**，与 #47363 属于同类问题，但落在 v2 线，说明这是**跨版本一致性**缺陷，而不是单点配置问题。

4. **[#47318 Limit Exceeded error](https://github.com/anomalyco/opencode/issues/47318)**  
   **4 条评论**，围绕 OpenCode Zen 免费模型的“额度已超限”提示与用户预期不一致展开，直接触及**计费/配额信任**问题。

5. **[#47368 Remote MCP regression in OpenCode 1.18.28 – KitWright tools unavailable](https://github.com/anomalyco/opencode/issues/47368)**  
   **3 条评论**，升级到 1.18.28 后出现回归，影响远程 MCP 工具链可用性。对依赖外部工具集成的用户来说，这是明显的生产力阻塞。

6. **[#47367 Jinja Exception](https://github.com/anomalyco/opencode/issues/47367)**  
   **4 条评论**，在长时间代码审查/执行后触发 500 错误，暴露出模板/运行时稳定性问题。这类错误通常意味着后端执行链路存在边界条件缺陷。

7. **[#47350 Shell tool never returns when a command leaves a background process holding its stdio](https://github.com/anomalyco/opencode/issues/47350)**  
   **3 条评论**，这是典型的核心工具死锁/挂起问题，直接影响 shell 工具在真实工作流中的可靠性。

8. **[#47393 bug(sdk): native Headers entries are lost when configuring client scope](https://github.com/anomalyco/opencode/issues/47393)**  
   **2 条评论**，虽然评论不多，但属于 SDK 集成级 bug，影响嵌入式/二次开发场景，技术影响面较大。

9. **[#47351 [FEATURE]: Support enforced OTLP settings in managed configuration](https://github.com/anomalyco/opencode/issues/47351)**  
   **3 条评论**，说明企业/托管环境对可观测性配置有明确需求。OTLP 强制策略属于管理面能力，通常面向中大型部署。

10. **[#47317 实际使用和套餐额度不一致](https://github.com/anomalyco/opencode/issues/47317)**  
    **3 条评论**，反映用户对套餐剩余额度与实际消耗口径存在困惑。此类问题虽然看似“产品解释”，但会直接影响付费转化与续费信心。

---

## 4) 重要 PR 进展

1. **[#47404 fix(core): compare Codex GPT versions by major and minor](https://github.com/anomalyco/opencode/pull/47404)**  
   已合并/关闭，修正 Codex OAuth 模型版本比较逻辑，避免整数版本和未来小版本排序出错，是今天模型可见性问题的关键修复之一。

2. **[#47427 fix(desktop): prevent large paste crashes](https://github.com/anomalyco/opencode/pull/47427)**  
   针对 Windows 等场景下“大段粘贴导致桌面端卡死/崩溃”的修复，直接对应高影响 UX bug #47425。

3. **[#47430 fix(core): bound npm installs with a configurable timeout](https://github.com/anomalyco/opencode/pull/47430)**  
   给 npm 安装加上可配置超时，避免启动或 bootstrap 阶段无界等待，明显提升实例初始化可控性。

4. **[#47428 fix(app): defer background workspace discovery](https://github.com/anomalyco/opencode/pull/47428)**  
   推迟历史项目的工作区/ MCP 发现过程，减少后台扫描开销，对启动速度和整体资源占用都有帮助。

5. **[#47423 feat(core): support provider OAuth client credentials](https://github.com/anomalyco/opencode/pull/47423)**  
   新增 provider OAuth 的 `client_credentials` 支持，扩展 OpenCode 的身份认证接入方式，利于企业/provider 集成。

6. **[#47422 fix(core): exclude hidden glob matches before limiting results](https://github.com/anomalyco/opencode/pull/47422)**  
   修复 glob 在 `hidden=false` 时仍返回隐藏文件的问题，保证工具行为与说明一致。

7. **[#47420 fix(core): preserve trailing blank lines in read pages](https://github.com/anomalyco/opencode/pull/47420)**  
   修复分页读取时丢失尾部空行的问题，属于典型的“内容保真”修补，避免模型上下文偏差。

8. **[#47417 fix(app): Path key normalization](https://github.com/anomalyco/opencode/pull/47417)**  
   统一路径 key 归一化，确保同一路径能被正确识别为同一项目，避免跨盘符/大小写路径混淆。

9. **[#47414 fix(core): preserve legacy markdown agent variants](https://github.com/anomalyco/opencode/pull/47414)**  
   处理 legacy Markdown agent 配置中 `model` / `variant` 丢失的问题，减少旧配置迁移风险。

10. **[#47412 fix(core): preserve literal command arguments](https://github.com/anomalyco/opencode/pull/47412)**  
    修复模板命令参数中 `$&` 等字面量被错误替换的问题，增强命令模板的可预测性。

---

## 5) 功能需求趋势

从今天的 Issues 看，社区需求主要集中在以下几个方向：

- **新模型/新 Provider 接入**
  - 典型关键词：OpenAI GPT-6 / GPT-6 Astra、Augure AI、Qwen、Muse Spark、Grok、Ollama、Bedrock。  
  - 说明 OpenCode 的价值正在快速向“统一多模型入口”收敛。

- **模型可见性与 OAuth 兼容**
  - 例如 `gpt-6-astra` 在 OpenAI OAuth 下不可见、v1/v2 过滤策略不一致。  
  - 这类问题直接影响“账号已订阅但模型不可用”的体验。

- **核心工具正确性**
  - Shell 挂起、Read 分页丢行、Glob 误包含隐藏文件、Unicode 截断、Markdown 边界字符丢失等。  
  - 说明用户对“AI 工具链输出必须可重复、可预测”非常敏感。

- **桌面端稳定性与性能**
  - 启动卡死、粘贴大文本崩溃、sidecar/fetch 失败、右侧栏显示异常等。  
  - 桌面端仍是社区重点体验入口，稳定性是第一优先级。

- **可观测性、托管配置与企业化能力**
  - OTLP 强制设置、分项目存储、SDK headers、路径归一化等，体现出更强的企业/多项目使用诉求。

- **额度、计费与计划解释**
  - free-tier 的 “Limit Exceeded” 和套餐额度不一致问题，说明用户对使用量与计费口径非常在意。

---

## 6) 开发者关注点

从开发者反馈中，当前最突出的痛点可以归纳为：

- **兼容性回归频繁**：一次小版本升级就可能触发 MCP、模型筛选或桌面端行为变化。  
- **模型接入复杂度上升**：不同 provider、OAuth 方式、版本命名和可见性规则越来越碎片化。  
- **工具链可靠性需要加强**：Shell / Read / Glob / Markdown 等基础工具的边界错误，会迅速放大为用户体验问题。  
- **性能和启动路径成为瓶颈**：npm 安装、工作区发现、后台 fetch、数据库增长，都在影响启动速度和交互流畅度。  
- **企业/托管配置需求增强**：OTLP、SDK、分项目存储等议题说明 OpenCode 正在向更重的部署场景扩展。  
- **计费与额度透明度不足**：额度消耗和套餐预期不一致，会直接影响用户信任。

如果你愿意，我也可以把这份日报进一步整理成：
- **适合公众号/社区周报的精简版**
- **适合内部技术晨报的要点版**
- **带趋势标签和风险评级的分析版**

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-09-05）

## 1) 今日速览
过去 24 小时，Pi 的关注点主要集中在 **0.85.0 发布后的打包回归**、**Anthropic/Claude 相关能力增强**，以及 **TUI/扩展 API 的可用性与稳定性修复**。  
社区反馈显示，`@earendil-works/pi-server` 未声明依赖引发了多条重复报障，说明这次版本发布对新安装用户影响较大；与此同时，围绕会话恢复、compaction、模型选择器和快捷键的体验优化也持续升温。  
总体看，Pi 正在从“功能扩展”转向“稳定性修复 + 开放扩展能力 + 交互体验打磨”的阶段。

---

## 2) 版本发布

- **[v0.85.0](https://github.com/earendil-works/pi/releases/tag/v0.85.0)**  
  核心更新是 **Persistent Claude thinking effort**：支持 Anthropic transport 记录并恢复每轮的 thinking effort，同时能安全处理 signed-thinking 不匹配。  
  这意味着 Claude 相关会话在长对话、恢复与跨轮推理一致性方面更稳，属于面向生产可用性的增强。

---

## 3) 社区热点 Issues

### 1. [#9132](https://github.com/earendil-works/pi/issues/9132) — 0.85.0 发布包静态导入 `@earendil-works/pi-server`，但未声明依赖
- **为什么重要**：这是本轮最关键的发布回归之一，直接影响 fresh install 与包入口可用性。
- **社区反应**：**4 条评论，5 个 👍**，且随后出现多条重复问题（#9158、#9173、#9171、#9140），说明影响面广、复现稳定、优先级极高。

### 2. [#9128](https://github.com/earendil-works/pi/issues/9128) — `pi-ai` 走向“依赖更少”的浏览器化
- **为什么重要**：反映出社区希望 Pi 的 AI 层更轻量、更适合浏览器或受限运行环境。
- **社区反应**：**3 条评论**，讨论点集中在 provider SDK 复杂度和体积控制，属于长期架构诉求。

### 3. [#9165](https://github.com/earendil-works/pi/issues/9165) — OpenRouter 下 Claude Opus 5 拒绝 per-message output_config
- **为什么重要**：涉及模型兼容性，直接影响 OpenRouter 场景下 Claude Opus 5 的可用性。
- **社区反应**：**2 条评论**，问题明确、影响具体，属于高价值兼容修复。

### 4. [#9161](https://github.com/earendil-works/pi/issues/9161) — 扩展 API：隐藏 thinking label 只作用于当前 streaming block
- **为什么重要**：是扩展 API 的粒度控制问题，关系到多 block 场景下的 UI 正确性。
- **社区反应**：**2 条评论**，属于开发者在做复杂扩展时遇到的真实痛点。

### 5. [#9158](https://github.com/earendil-works/pi/issues/9158) — `pi-coding-agent@0.85.0` 未声明 `pi-server` 依赖
- **为什么重要**：与 #9132 同类，但从包级别再次确认回归范围，说明问题并非单一入口。
- **社区反应**：**2 条评论**，用户在安装层面就遇到失败，说明发布链路需要补强。

### 6. [#9156](https://github.com/earendil-works/pi/issues/9156) — 0.84.4 也出现 `pi-server` 缺失导致的 CI 失败
- **为什么重要**：说明问题并非只影响 0.85.0，而是已经向前回溯到历史版本链路。
- **社区反应**：**2 条评论**，并且与 CI 失败直接绑定，属于工程侧紧急修复项。

### 7. [#9142](https://github.com/earendil-works/pi/issues/9142) — `ModelRuntime.create({ authPath })` 默认 modelsPath 解析不跟随 authPath 目录
- **为什么重要**：影响 runtime 配置的预期一致性，尤其是多目录/自定义路径部署。
- **社区反应**：**2 条评论**，属于细节型但会造成配置困惑的 bug。

### 8. [#9139](https://github.com/earendil-works/pi/issues/9139) — `/resume` 与 `pi -r` 支持会话置顶（pinning）
- **为什么重要**：直击会话管理效率，特别适合长期重度使用者。
- **社区反应**：**2 条评论**，说明用户对 session 管理体验有明确诉求。

### 9. [#9134](https://github.com/earendil-works/pi/issues/9134) — Anthropic adapter 会静默丢失 custom tool schema 的根层 `anyOf`
- **为什么重要**：这是工具 schema 传递正确性问题，会影响复杂工具参数建模。
- **社区反应**：**2 条评论**，属于开发者级别的高风险兼容缺陷。

### 10. [#9112](https://github.com/earendil-works/pi/issues/9112) — 长会话 resume 后 400：最新 assistant message 的 thinking blocks 不能被修改
- **为什么重要**：直接影响长会话恢复可靠性，是“能不能继续聊下去”的基础问题。
- **社区反应**：**2 条评论**，属于会话一致性/恢复链路的核心 bug。

---

## 4) 重要 PR 进展

### 1. [#9179](https://github.com/earendil-works/pi/pull/9179) — 阻止 compaction 期间进行 tree navigation
- **作用**：避免 compaction 与树导航并发导致的分支错乱，提升会话状态一致性。
- **看点**：属于高优先级竞态修复，和用户实际交互路径强相关。

### 2. [#9172](https://github.com/earendil-works/pi/pull/9172) — 防止 broken package root 再次发布
- **作用**：在修复当前依赖问题后，进一步补上发布守门逻辑，避免同类事故复发。
- **看点**：这是典型的“修 bug + 加防线”组合。

### 3. [#9170](https://github.com/earendil-works/pi/pull/9170) — 声明 `pi-server` 运行时依赖
- **作用**：直接修复 `@earendil-works/pi-coding-agent` 的入口包缺失依赖问题。
- **看点**：是本轮最核心的发布回归修复 PR。

### 4. [#9164](https://github.com/earendil-works/pi/pull/9164) — 模型选择器刷新后保留当前选中项
- **作用**：避免后台刷新 catalog 时用户当前选择被重置。
- **看点**：提高 `/model` 交互稳定性，属于高频 UI 体验优化。

### 5. [#9166](https://github.com/earendil-works/pi/pull/9166) — Alt 修饰滚轮滚动加速
- **作用**：让大幅滚动更高效，增强 TUI 浏览体验。
- **看点**：简单但实用，偏重效率提升。

### 6. [#9163](https://github.com/earendil-works/pi/pull/9163) — 简化 clipboard 处理
- **作用**：降低剪贴板链路复杂度，并为 NixOS 等环境兼容性铺路。
- **看点**：属于基础设施改造，影响面广。

### 7. [#9157](https://github.com/earendil-works/pi/pull/9157) — Session Tree 搜索框显示光标
- **作用**：补齐树搜索输入的光标反馈，提升可见性。
- **看点**：小而明确的 UX 修复。

### 8. [#9155](https://github.com/earendil-works/pi/pull/9155) — tree navigation 期间拒绝 prompt
- **作用**：防止树导航与直接 prompt 并发，减少状态竞争。
- **看点**：与 #9179 同属竞态治理，说明这块正在系统性收敛。

### 9. [#9149](https://github.com/earendil-works/pi/pull/9149) — selector 保存快捷键改造
- **作用**：把硬编码快捷键替换为统一 action 配置，提升一致性与可维护性。
- **看点**：减少平台/组件间快捷键冲突风险。

### 10. [#9138](https://github.com/earendil-works/pi/pull/9138) — macOS 上支持 `Cmd+V` 粘贴图片
- **作用**：补齐 macOS 平台惯例，保留 `Ctrl+V` 兼容兜底。
- **看点**：典型的平台一致性修复，用户感知明显。

---

## 5) 功能需求趋势

从近 24 小时的 Issues 看，社区需求主要集中在以下几类：

1. **发布与依赖可靠性**
   - 以 `pi-server` 缺失依赖为代表，用户非常关注“安装即用”和包入口稳定性。
   - 说明发布链路、依赖声明、打包产物一致性是当前第一优先级。

2. **扩展 API 的粒度与控制力**
   - 包括 hidden-thinking label、final hook、session relocation、queue snapshot/mutation 等。
   - 社区希望扩展不只是“能接入”，而是“能精确控制 Pi 的内部流程”。

3. **模型与 provider 兼容性**
   - Claude Opus 5、GPT-6 Astra、Anthropic adapter、OpenRouter、OrcaRouter 等需求并存。
   - 体现出 Pi 正在被当作多模型代理层使用，兼容面越来越重要。

4. **会话管理与恢复能力**
   - resume、pinning、tree navigation、compaction、session relocation、context 估算等问题密集出现。
   - 长会话的稳定性正在成为核心产品能力。

5. **TUI 交互与效率优化**
   - 搜索光标、滚轮加速、图片渲染、快捷键、布局密度、全屏模式下的展示问题频繁出现。
   - 说明重度用户非常在意终端交互的细节体验。

---

## 6) 开发者关注点

- **包发布链路要更严格**：重复出现的 `@earendil-works/pi-server` 缺失依赖，表明发布前验证和依赖审计还不够。
- **并发/状态一致性问题突出**：compaction、tree navigation、prompt、tool result disposal 等都在处理“状态切换时不能乱”的问题。
- **工具与模型 schema 的正确传递很关键**：`anyOf` 丢失、output_config 拒绝、thinking block 不能改，说明协议层兼容性容易成为故障点。
- **长会话恢复仍是高风险区**：resume、thinking block、token 估算、auto-compaction 这些链路需要更强的端到端保障。
- **平台适配需求在上升**：macOS 快捷键、Windows TUI 图片、NixOS、riscv64/loong64/s390x 等兼容问题持续被提及。
- **用户希望更多“可配置”和“可扩展”**：从隐藏标签到工具队列、从快捷键到垂直间距，社区明显倾向于让 Pi 更适配不同工作流。

如果你愿意，我也可以把这份日报进一步整理成 **“管理层摘要版”** 或 **“研发周报格式版”**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# 2026-09-05 Qwen Code 社区动态日报

## 1) 今日速览
今天仓库没有新的 Release，但 Issues 和 PR 依然非常活跃，讨论重点集中在 **会话/Daemon 体系、Web Shell 体验、导出性能、OpenAI-compatible 兼容性** 以及 **CI 稳定性** 上。  
从高优先级问题和对应修复 PR 的同步推进来看，团队正在一边修复核心回归，一边补齐 Web Shell 与 session 管线的关键能力。

---

## 2) 社区热点 Issues

1. **[#11045 Cerebras 多轮对话失败：`400 status code (no body)`](https://github.com/QwenLM/qwen-code/issues/11045)**  
   - **重要性**：P1 核心 bug，直接影响 OpenAI-compatible provider 的多轮可用性。  
   - **社区反应**：已有 **3 条评论**，说明这是高优先级的兼容性阻塞问题，且复现链路清晰。

2. **[#11031 导出 HTML 体积过大：每个文件都嵌入 Web Shell runtime](https://github.com/QwenLM/qwen-code/issues/11031)**  
   - **重要性**：P1，涉及导出架构和性能，空会话也能膨胀到约 19.5MB。  
   - **社区反应**：**3 条评论**，说明导出体验和产物体积已成为明显痛点。

3. **[#11017 为 Web Shell 增加独立的 Quick Chat 浮层](https://github.com/QwenLM/qwen-code/issues/11017)**  
   - **重要性**：P2 功能请求，直接关系到 Web Shell 的交互效率和产品形态。  
   - **社区反应**：**3 条评论**，表明社区对“轻量、不中断主任务”的聊天入口有较强需求。

4. **[#11060 Daemon 活动轮转录缺少 promptId，影响 live replay/reconnect 对齐](https://github.com/QwenLM/qwen-code/issues/11060)**  
   - **重要性**：P2，影响 session 恢复、轮次重放和集成方的状态一致性。  
   - **社区反应**：**2 条评论**，属于底层一致性问题，通常会牵动 SDK/daemon 双端。

5. **[#11055 Windows cmd 下 docs-site 本地预览流程失败](https://github.com/QwenLM/qwen-code/issues/11055)**  
   - **重要性**：P2，影响贡献者在标准 Windows 环境中的文档预览与联调。  
   - **社区反应**：**2 条评论**，属于“开发者上手门槛”型问题，影响面广。

6. **[#11024 worktree session 生命周期清理与 Part 4A 残留问题](https://github.com/QwenLM/qwen-code/issues/11024)**  
   - **重要性**：P2，聚焦 worktree / session 管理，属于会话生命周期治理。  
   - **社区反应**：**2 条评论**，说明该方向仍有未闭合的设计与实现细节。

7. **[#11022 发布新的 `@qwen-code/sdk` 版本，带上 managed-memory 和 prompt-cache 修复](https://github.com/QwenLM/qwen-code/issues/11022)**  
   - **重要性**：P2，关系到 SDK 下游可直接消费的稳定版本。  
   - **社区反应**：**2 条评论，且有 1 个 👍**，反映出对“尽快出包”的诉求明确。

8. **[#11019 AUTO 模式下用户审批无法到达 classifier，且会在重建后回退到 AUTO](https://github.com/QwenLM/qwen-code/issues/11019)**  
   - **重要性**：P2 安全/审批流问题，直接影响自动化执行是否可控。  
   - **社区反应**：**2 条评论**，属于“能否人工兜底”的关键问题，优先级高。

9. **[#11013 Dynamic Workflows 与 Claude Code 2.1.260 的能力差距补齐](https://github.com/QwenLM/qwen-code/issues/11013)**  
   - **重要性**：P2 战略型 feature request，覆盖 contract、budget、resilience、distribution 等面。  
   - **社区反应**：**2 条评论**，反映出社区对平台能力对标与增强的持续关注。

10. **[#10995 `customHeaders` 支持 `${session_id}` 模板变量](https://github.com/QwenLM/qwen-code/issues/10995)**  
   - **重要性**：P3 配置能力增强，便于按会话传递标识和做请求侧追踪。  
   - **社区反应**：**2 条评论，且有 1 个 👍**，说明这是一个低成本但高实用度的需求。

---

## 3) 重要 PR 进展

1. **[#11054 feat(web-shell): add headless global turn navigation](https://github.com/QwenLM/qwen-code/pull/11054)**  
   - 增加会话级全局 turn 导航的 headless 数据层，为后续 UI 导航打基础。

2. **[#11053 feat(web-shell): add the global turn navigation Phase 2 client data layer](https://github.com/QwenLM/qwen-code/pull/11053)**  
   - 实现客户端侧的 turn-index / transcript window 数据层，支持更精细的历史片段定位。

3. **[#11049 fix(core): strip reasoning_content from Cerebras requests](https://github.com/QwenLM/qwen-code/pull/11049)**  
   - 针对 Cerebras OpenAI-compatible 接口，移除非标准 `reasoning_content`，直接对应多轮 400 错误问题。

4. **[#11047 fix(cli): route the transcript turn-index handler through the pin choke point](https://github.com/QwenLM/qwen-code/pull/11047)**  
   - 将 turn-index 读取统一走 runtime-root pin 的单一入口，减少路径分叉和状态不一致。

5. **[#11046 fix(cli): wait for the startup chat before an OpenTUI turn sends](https://github.com/QwenLM/qwen-code/pull/11046)**  
   - 修复 OpenTUI 启动早期输入被静默丢弃的问题，提升首次交互可靠性。

6. **[#11044 fix(test): stop timing tsx startup in the export separator bound](https://github.com/QwenLM/qwen-code/pull/11044)**  
   - 调整导出分隔符边界测试，避免把 tsx 启动耗时误算进性能判定。

7. **[#11041 fix(test): raise the ACP initialize budget for inline E2E daemon spawns](https://github.com/QwenLM/qwen-code/pull/11041)**  
   - 为内联 E2E daemon 启动提高 ACP 初始化预算，缓解测试超时问题。

8. **[#11038 fix(export): stop inlining the interactive Web Shell runtime in exported HTML](https://github.com/QwenLM/qwen-code/pull/11038)**  
   - 导出 HTML 不再内联完整交互 runtime，降低单文件体积，方向与 #11031 强相关。

9. **[#11037 fix(core): coalesce concurrent Config.initialize() calls](https://github.com/QwenLM/qwen-code/pull/11037)**  
   - 合并并发初始化调用，解决“第二个调用误报已初始化”的竞争问题。

10. **[#11035 fix(export): host transcript renderer on project OSS](https://github.com/QwenLM/qwen-code/pull/11035)**  
    - 将 transcript renderer 拆出到 OSS 托管，导出文件只保留数据、样式和轻量 bootstrap。

---

## 4) 功能需求趋势

- **Web Shell / 会话导航能力持续升温**  
  典型诉求包括全局 turn navigation、Quick Chat 浮层、named sessions、会话恢复与转录对齐。

- **导出与文档链路优化成为高频问题**  
  HTML 导出体积、runtime 内联、docs-site 本地预览、Windows 兼容性都在集中出现。

- **模型/Provider 兼容性仍是核心战场**  
  OpenAI-compatible 接入、Cerebras 适配、request header 模板、managed-memory / prompt-cache 修复等都在推进。

- **Daemon / session 生命周期治理需求上升**  
  promptId、turn-index、初始化预算、工作树清理、重连一致性等问题表明底层状态机仍在打磨。

- **自动化与审批流的可控性需求明显**  
  AUTO 模式、classifier、手工复核路径、审批准入规则是社区关注的安全与可用性焦点。

- **CI 稳定性与测试可靠性压力较大**  
  多个 main CI / E2E 失败在同一天集中出现，说明回归防线和测试时序仍需继续加固。

---

## 5) 开发者关注点

- **“先能跑稳，再谈扩展”**：多轮对话失败、OpenTUI 首次输入丢失、Config 初始化并发等问题，都是典型的稳定性痛点。  
- **“导出产物要轻”**：社区对 HTML 导出体积和 runtime 复用非常敏感，说明交付物大小已影响实际使用。  
- **“会话状态必须可追踪、可恢复”**：promptId、turn-index、live replay/reconnect 这些细节是集成方最在意的地方。  
- **“审批与自动化要能兜底”**：AUTO 模式下的不可逆阻塞、重建后模式回退，都是高风险交互问题。  
- **“跨平台开发体验不能掉链子”**：Windows cmd、docs-site、本地预览等问题会直接影响外部贡献者效率。  

如需，我可以把这份日报再整理成 **“适合直接发群/邮件的精简版”** 或 **“带趋势图表的周报模板”**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# 2026-09-05 DeepSeek TUI 社区动态日报

## 1) 今日速览
今天社区讨论主要集中在 **TUI 体验修复** 和 **构建/依赖维护** 两条主线：一个是 to-do 历史快照导致 transcript 过度堆叠的老问题已形成闭环，另一个是社区开始关注更轻量、跨平台友好的内存分配方案。  
PR 侧则以 **CI 恢复、输出预算计算修正、以及一批依赖升级** 为主，说明项目当前重点在提升稳定性、可维护性和跨环境兼容性。

---

## 2) 社区热点 Issues
> 今日仅有 2 条 Issues 在过去 24 小时内更新，以下全部列出。

1. **[#5871 To-do list history clutters the transcript with no way to clear it without losing context](https://github.com/Hmbown/DeepSeek-TUI/issues/5871)**  
   - 状态：**CLOSED / bug**
   - 重要性：这是一个直接影响 TUI 可读性和上下文管理的 bug。`todo_write` 的历史快照会永久堆叠在 transcript 中，用户即使清空当前列表，也无法清掉历史卡片，容易造成“对话脏化”。
   - 社区反应：有 **1 条评论**，说明问题虽不算高互动，但描述明确、痛点强，且已被修复 PR 对应闭环。

2. **[#5872 Add rusty_alloc as an opt-in feature next to mimalloc](https://github.com/Hmbown/DeepSeek-TUI/issues/5872)**  
   - 状态：**OPEN / enhancement**
   - 重要性：这是一个偏工程化但很实用的增强建议，目标是让 `rusty_alloc` 成为与 `mimalloc` 并列的可选特性，减少对 C 编译器和 build script 的依赖，并改善跨编译体验。
   - 社区反应：当前 **1 条评论、0 赞**，热度不高，但方向很明确，反映出贡献者和用户对“更轻量构建链路”的持续需求。

---

## 3) 重要 PR 进展
> 今日共 12 条 PR 更新，以下挑选 10 条最值得关注的项目。

1. **[#5883 fix(tui): derive local output budget from route window](https://github.com/Hmbown/DeepSeek-TUI/pull/5883)**  
   - 关键点：根据 route 的 declared context window 自动推导本地输出预算，在模型没有静态目录项时仍能保持合理的输出限制。  
   - 意义：这是 TUI/路由层的**正确性修复**，直接影响模型输出分配与窗口控制。

2. **[#5882 test: restore contributor CI baseline and process lifecycle checks](https://github.com/Hmbown/DeepSeek-TUI/pull/5882)**  
   - 关键点：恢复 contributor CI 基线，并修复生命周期检查相关的测试环境问题。  
   - 意义：属于**工程稳定性修复**，能让后续 PR 的评估更可靠，减少“环境坏了导致无法判断”的噪音。

3. **[#5873 fix(tui): replace stale todo transcript snapshots](https://github.com/Hmbown/DeepSeek-TUI/pull/5873)**  
   - 关键点：只保留最新一次成功的 `todo_write` 快照，避免旧快照继续占据 transcript。  
   - 意义：这是对 **#5871** 的直接修复，解决 TUI 里最影响阅读体验的问题之一。

4. **[#5870 Fix: Tools: atomic commit splitting — order unrelated changes by dependency](https://github.com/Hmbown/DeepSeek-TUI/pull/5870)**  
   - 关键点：让原子提交拆分按依赖关系排序，拒绝循环依赖。  
   - 意义：增强工具链在代码变更拆分上的**一致性与可解释性**，对自动化工作流很重要。

5. **[#5881 chore(deps): bump tower-http from 0.7.0 to 0.7.1](https://github.com/Hmbown/DeepSeek-TUI/pull/5881)**  
   - 关键点：升级 `tower-http` 小版本。  
   - 意义：典型的 Rust 生态维护动作，通常意味着 bug 修复、兼容性提升或安全性跟进。

6. **[#5880 chore(deps): bump jsonschema from 0.46.10 to 0.52.1](https://github.com/Hmbown/DeepSeek-TUI/pull/5880)**  
   - 关键点：`jsonschema` 跨多个版本升级。  
   - 意义：这类升级往往涉及 API/行为变化，值得关注回归风险，尤其是配置校验链路。

7. **[#5879 chore(deps): bump softprops/action-gh-release from 3.0.2 to 3.0.3](https://github.com/Hmbown/DeepSeek-TUI/pull/5879)**  
   - 关键点：GitHub Release 发布动作升级。  
   - 意义：对发布流程稳定性有帮助，属于 CI/CD 维护的重要组成部分。

8. **[#5878 chore(deps): bump actions/create-github-app-token from 2 to 3](https://github.com/Hmbown/DeepSeek-TUI/pull/5878)**  
   - 关键点：GitHub App Token 获取动作升级到 major 版本。  
   - 意义：涉及权限和认证链路，属于**高关注度基础设施更新**。

9. **[#5877 chore(deps): bump rmcp from 2.2.0 to 3.2.0](https://github.com/Hmbown/DeepSeek-TUI/pull/5877)**  
   - 关键点：MCP Rust SDK 大版本升级。  
   - 意义：对模型上下文协议相关能力影响较大，可能涉及接口变化、适配成本和兼容性测试。

10. **[#5876 chore(deps): bump lru from 0.18.2 to 0.18.3](https://github.com/Hmbown/DeepSeek-TUI/pull/5876)**  
    - 关键点：LRU 缓存库小版本更新。  
    - 意义：通常是稳定性/性能细节优化，虽小但对缓存敏感路径值得持续跟进。

---

## 4) 功能需求趋势
从今天的 Issues 看，社区关注点主要聚焦在以下几个方向：

- **更轻量的构建链路与跨平台编译**
  - 代表需求：`rusty_alloc` 作为可选分配器，减少对 C 编译器和 build script 的依赖。
  - 说明：贡献者希望项目更容易在不同环境下构建、调试和交叉编译。

- **TUI 中上下文/历史的可控性**
  - 代表需求：to-do 历史不要污染 transcript，同时又不能丢失上下文。
  - 说明：用户非常在意“界面整洁”和“上下文保留”之间的平衡。

- **输出预算与窗口自适应**
  - 代表需求：输出长度应根据 route/window 动态推导，而不是依赖静态表。
  - 说明：这反映出社区对**更智能的上下文管理**有明确期待。

- **工程稳定性与依赖治理**
  - 代表需求：CI 基线恢复、依赖批量升级、发布动作维护。
  - 说明：项目正在进入“功能迭代 + 基础设施补强”并行阶段。

---

## 5) 开发者关注点
今天开发者反馈中最值得注意的痛点与高频诉求有：

- **Transcript/历史记录容易膨胀**  
  用户希望能清理过时快照，但又不损失当前上下文，这是 TUI 交互设计的核心矛盾。

- **构建环境依赖偏重**  
  对 `mimalloc`、C 编译器、build script 的依赖被明确提及，说明部分贡献者希望更“开箱即用”的 Rust-only 方案。

- **输出与上下文窗口控制需要更精细**  
  PR #5883 侧面说明，模型输出预算不能简单硬编码，必须跟 route 的窗口信息联动。

- **CI / 测试基线需要持续维护**  
  #5882 反映出 contributor CI 的可靠性仍然是社区协作效率的关键前提。

- **依赖升级频繁，兼容性风险不可忽视**  
  今天出现了多条依赖 bump PR，说明项目在积极跟进生态，但也需要持续验证回归。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合 Slack/飞书发布的短版**，或  
2. **带“风险提示/行动建议”的分析版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*