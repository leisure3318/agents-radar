# AI CLI 工具社区动态日报 2026-07-11

> 生成时间: 2026-07-11 01:03 UTC | 覆盖工具: 9 个

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

下面是一份基于你提供的 2026-07-11 各 AI CLI 工具社区动态的**横向对比分析报告**。  
说明：表格中的 Issue/PR 数，指**过去 24 小时内“有更新/可见”的数量**，用于反映当日社区活跃度，而非仓库总量。

---

## 1) 生态全景

当前 AI CLI 生态整体处于**快速工程化与稳定性收敛并行**的阶段：一方面，各工具都在补齐 OAuth/MCP、远程协作、子代理、模型兼容等“可用性基础设施”；另一方面，安全误报、上下文压缩、状态恢复、输出可信度等问题频繁出现，说明产品已从“能跑”进入“能稳定地跑、且结果可预期”的阶段。  
从社区反馈看，**多 provider 兼容、会话连续性、权限/安全边界、TUI/桌面交互体验**已成为行业共性议题。  
同时，多个项目都在通过更密集的 PR 迭代修补底层协议、状态机和 UI 细节，表明该赛道正进入**体验打磨和系统性可靠性建设期**。  
整体上看，这不是“新功能竞赛”单独主导的阶段，而是**基础能力、稳定性和可观测性共同拉升**的阶段。

---

## 2) 各工具活跃度对比

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 | 活跃度简评 |
|---|---:|---:|---|---|
| Claude Code | 10 | 5 | 1 个发布（v2.1.207） | 社区问题密集，安全/代理/远程控制是核心焦点 |
| OpenAI Codex | 10 | 10 | 2 个 alpha 发布 | 迭代非常快，桌面端、额度、subagent、远程协作都在高频修补 |
| Gemini CLI | 2 | 4 | 无新 release | 体量较小，但集中在基础稳定性与安全修复 |
| GitHub Copilot CLI | 10 | 0 | 1 个发布（v1.0.71-0） | 用户反馈多，但当日 PR 跟进为空，说明问题压力较大 |
| Kimi Code CLI | 0 | 2 | 无新 release | 当前更偏内部修复与新手体验优化，外部社区热度较低 |
| OpenCode | 10 | 10 | 无新 release | 典型高迭代项目，UI、provider、性能和会话模型同时推进 |
| Pi | 10 | 9 | 无新 release | 关注面很广，尤其是模型兼容、compaction 和扩展能力 |
| Qwen Code | 10 | 10 | 2 个发布（v0.19.9、nightly） | 迭代强度高，重点在 Web Shell、会话恢复、协议健壮性 |
| DeepSeek TUI | 3 | 10 | 无新 release | 虽 issue 不多，但 PR 很活跃，偏状态修复和语义校准 |

---

## 3) 共同关注的功能方向

### 1. 认证、OAuth、MCP / 远程集成稳定性
**涉及工具：** Claude Code、Codex、Copilot CLI、Gemini CLI、Qwen Code、DeepSeek TUI、Pi  
**共同诉求：**
- OAuth 刷新/重连稳定
- MCP 连接后工具暴露正确
- 断线恢复、会话复活
- 远程 host、SSH bridge、Web/Desktop 同步一致

**典型表现：**
- Claude Code：MCP OAuth 刷新失败、SSH revive 挂死
- Codex：MCP OAuth credential refresh 串行化
- Copilot CLI：MCP OAuth 连接成功但工具不可用
- Gemini CLI：Windows 认证死循环
- Qwen Code：MCP HTTP transport 401 后离线无法恢复
- DeepSeek TUI：provider 状态与配置判断一致性问题
- Pi：OpenRouter / Bedrock / session affinity 相关适配

---

### 2. 子代理 / agent 工作流可靠性
**涉及工具：** Claude Code、Codex、OpenCode、Pi、Qwen Code、Kimi Code CLI  
**共同诉求：**
- 避免重复执行
- 避免状态污染
- 工具调用链路完整
- subagent 模型配置和行为可控
- 恢复后不丢上下文、不重跑

**典型表现：**
- Claude Code：子代理返回时会 cancel/restart in-flight 子代理
- Codex：subagent steering 失效
- OpenCode：subagent model config 被忽略
- Pi：subagent 需要更完整的输出、attachments、usage 可观测性
- Qwen Code：重复 subagent tool-call 循环、历史链断裂
- Kimi Code CLI：`/init` 触发 plan-mode tool binding 异常

---

### 3. 安全、权限与误报控制
**涉及工具：** Claude Code、Gemini CLI、Copilot CLI、DeepSeek TUI、Qwen Code  
**共同诉求：**
- 降低 false positive
- 提升 allow/deny 规则表达能力
- 防 prompt injection / path traversal
- 安全分类器不要误伤合法开发场景

**典型表现：**
- Claude Code：安全误报、权限规则静默失效
- Gemini CLI：路径穿越、提示注入修复
- Copilot CLI：`web_search` 虚构结果，影响可信度
- DeepSeek TUI：provider 状态判断不准确，影响配置可信度
- Qwen Code：`<think>`、nested subagent 输出隔离、DingTalk 输出抑制

---

### 4. 模型兼容性、上下文压缩与协议语义一致性
**涉及工具：** Codex、Gemini CLI、OpenCode、Pi、Qwen Code、DeepSeek TUI  
**共同诉求：**
- 不同模型/Provider 行为一致
- compaction / session 压缩不丢链
- reasoning 参数、context length、tool_result 配对正确
- 新模型上线后不引入回归

**典型表现：**
- Codex：reasoning 参数、模型支持摘要的兼容性
- Gemini CLI：模型返回 STOP 且空文本时静默卡死
- Pi：compaction 缺 session ID、gpt-5.6-luna 失败
- OpenCode：Copilot 模型在 `/chat/completions` 全拒绝
- Qwen Code：tool_use 缺少 tool_result
- DeepSeek TUI：离线计费必须感知 provider

---

### 5. TUI / Desktop / Web 交互体验
**涉及工具：** Claude Code、Codex、Copilot CLI、OpenCode、Qwen Code、DeepSeek TUI、Pi  
**共同诉求：**
- 更好的 TUI 弹窗/滚动/导航
- Desktop 可见性与操作透明
- Web Shell 更接近 IDE
- 状态展示真实、可恢复、可解释

**典型表现：**
- Claude Code：长输出流式渲染卡键修复
- Codex：桌面端启动、安装、窗口渲染问题
- Copilot CLI：voice mode、快捷键、工作流提示
- OpenCode：TUI modal 统一、review 导航、worktree 视图
- Qwen Code：Web Shell 工作区选择器、工具栏重设计
- DeepSeek TUI：状态与路由“truthful” 修复
- Pi：扩展事件流、附件、usage 统计更可观测

---

## 4) 差异化定位分析

### Claude Code
- **功能侧重：** 安全规则、子代理执行、远程控制、桌面/终端交互
- **目标用户：** 重度工程用户、希望在本地 TUI 中完成复杂代理工作流的开发者
- **技术路线：** 强调 agent 执行链路、权限边界与多环境部署一致性
- **特点：** 产品成熟度较高，但当前社区在“安全误报”和“执行可靠性”上压力大

### OpenAI Codex
- **功能侧重：** Desktop/CLI 协同、subagent 可控性、额度/模型策略、远程协作
- **目标用户：** 依赖桌面端与远程协作的开发团队、重视可控性的用户
- **技术路线：** alpha 快速迭代，协议层和客户端体验并进
- **特点：** 工程推进很快，但当日反馈显示“可用性压力”也很高

### Gemini CLI
- **功能侧重：** 基础 CLI 可靠性、配置健壮性、安全修复
- **目标用户：** 偏基础命令行工作流的 Gemini 用户
- **技术路线：** 小步修补、先稳后扩
- **特点：** 当日热度不高，但问题聚焦明确，偏“基础设施修复型”

### GitHub Copilot CLI
- **功能侧重：** MCP / OAuth 集成、voice mode、web_search、语义可信度
- **目标用户：** 已深度使用 GitHub/Copilot 生态的开发者
- **技术路线：** 产品化与生态集成优先
- **特点：** 发布活跃，但社区反馈集中在“连接后不可用”“行为不透明”

### Kimi Code CLI
- **功能侧重：** 初始化体验、plan-mode、错误提示可操作性
- **目标用户：** 新装用户、希望快速上手的开发者
- **技术路线：** 从基础稳定性向可用性提升过渡
- **特点：** 社区热度较低，但修复方向很务实，属于收口期特征

### OpenCode
- **功能侧重：** TUI/Worktree/Provider 兼容、性能、会话状态、模型适配
- **目标用户：** 追求多 Provider、多工作区、高度交互化 CLI 的用户
- **技术路线：** 强调 V2 架构整合与生态适配
- **特点：** 高活跃度、高迭代密度，明显处在架构收敛与体验统一阶段

### Pi
- **功能侧重：** 多 provider 适配、长会话压缩、扩展/RPC、推理档位
- **目标用户：** 需要可扩展、可插拔、跨 provider 的高级用户和扩展作者
- **技术路线：** 平台化路线更强，强调 provider 抽象和扩展能力
- **特点：** 功能覆盖面广，说明其定位更像“AI CLI 平台底座”

### Qwen Code
- **功能侧重：** Web Shell、会话恢复、子代理治理、发布链路稳定性
- **目标用户：** 偏复杂工作流、重视 Web/终端协同的开发者
- **技术路线：** 强化会话模型、工作区、daemon/worker 恢复能力
- **特点：** 当前明显在做“生产可用性”建设，后端稳定性和前端交互并重

### DeepSeek TUI
- **功能侧重：** provider 语义、计费归因、TUI 状态真实性
- **目标用户：** 偏 TUI 形态、关注 provider 自定义和计费准确性的用户
- **技术路线：** 精修状态机、配置语义与发布质量
- **特点：** 社区体量较小，但问题非常聚焦，呈现“轻量但高精度修补”风格

---

## 5) 社区热度与成熟度

### 社区热度较高、且仍处于高强度迭代的工具
- **OpenAI Codex**
- **OpenCode**
- **Qwen Code**
- **Pi**
- **Claude Code**

这些工具共同特征是：**Issue/PR 密度都高**，说明真实用户反馈活跃、产品面临较多工程挑战。  
其中 Codex、OpenCode、Qwen Code 更像是**快速迭代阶段**；Claude Code 和 Pi 则更像**在成熟使用期继续补强边界问题**。

### 社区反馈压力大，但产出节奏相对滞后的工具
- **GitHub Copilot CLI**

当日 Issues 多、PR 为 0，说明**社区需求和修复供给之间存在明显落差**。这通常意味着：产品进入更大规模使用期，或者某些关键集成问题尚未被及时消化。

### 体量较小、但问题聚焦清晰的工具
- **Gemini CLI**
- **Kimi Code CLI**
- **DeepSeek TUI**

这三者当日总量相对低，但问题都很集中：  
- Gemini CLI：核心稳定性与安全修复  
- Kimi Code CLI：初始化与 plan-mode 稳定性  
- DeepSeek TUI：provider / 状态一致性

可以理解为：**社区规模未必最大，但工程问题已经进入“必须修”的阶段**。

---

## 6) 值得关注的趋势信号

### 趋势 1：AI CLI 正从“单模型助手”走向“多 provider 编排平台”
多个项目都在处理 Copilot、OpenAI、Bedrock、Vertex、OpenRouter、Kimi、DeepSeek 等 provider 差异，说明市场不再接受“只支持一种模型”的单点工具。  
**价值：** 开发者需要把 provider 抽象、身份头、context length、reasoning 参数、OAuth 生命周期作为基础能力设计，而不是后补兼容层。

### 趋势 2：会话恢复与长任务连续性，正在成为核心竞争力
Qwen Code、Claude Code、Pi、Codex 都在围绕 session、compaction、continuation、background task、remote revive 做修复。  
**价值：** 未来 CLI 的竞争不只是“单次回答质量”，而是“长任务能否稳定推进、断线后能否无损恢复”。

### 趋势 3：安全策略正在从“保守拦截”转向“精准拦截”
Claude Code、Gemini CLI、DeepSeek TUI、Qwen Code 都出现了安全误报、提示注入、路径穿越、输出隔离等问题。  
**价值：** 开发者需要构建更精细的安全规则、可解释的拦截理由和更低误伤率，否则会直接损害正常开发体验。

### 趋势 4：TUI/桌面/Web 正在向“IDE 化”靠拢
OpenCode、Qwen Code、Copilot CLI、Claude Code 都在强化工作区、review、任务列表、语音、滚动、固定面板等交互。  
**价值：** 未来 AI CLI 不再只是“命令行输入输出工具”，而是更接近**终端里的 AI 工作台**。

### 趋势 5：可观测性与可解释性变成刚需
事件时间戳、usage 归因、tool_result 配对、错误语义保留、模型可用性解释，都是近期高频需求。  
**价值：** 对开发者而言，能否快速判断“发生了什么、为什么发生、能否恢复”，已经和模型能力本身同等重要。

### 趋势 6：发布链路和 CI 稳定性开始反向影响产品口碑
Qwen Code、Gemini CLI、DeepSeek TUI、Pi 都有依赖升级、包体积、Docker 沙箱、安装/卸载等发布链问题。  
**价值：** CLI 产品的“发版质量”直接决定社区信任，尤其在跨平台和容器场景中更明显。

---

如果你愿意，我可以进一步把这份报告压缩成：
1. **1 页纸的管理层摘要版**，或  
2. **带优先级排序的研发行动建议版**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下为基于 **anthropics/skills**（Claude Code Skills 官方仓库）截至 **2026-07-11** 的社区热点报告。

---

## 1) 热门 Skills 排行（PR 方向，5~8 个）

> 说明：你提供的 PR 列表中评论数字段未直接展开，因此以下按“社区关注度 + 反复出现的讨论/阻塞性”综合排序。

### 1. `skill-creator` 评估链路修复：`run_eval` 召回率恒为 0%
- **链接**：[#1298](https://github.com/anthropics/skills/pull/1298)
- **功能**：修复 `run_eval.py` 的评估信号，使 `run_loop.py` / `improve_description.py` 能正常优化 Skill 描述。
- **社区热点**：  
  - 评估结果长期失真（recall=0%）  
  - Windows 下流读取、触发检测、并行 worker 等稳定性问题  
  - 直接影响 Skill 描述优化的可信度
- **当前状态**：**open**

### 2. `skill-creator` Windows 兼容性修复：subprocess / encoding / pipe 问题
- **链接**：[#1050](https://github.com/anthropics/skills/pull/1050)
- **功能**：修复 Windows 上 `claude.cmd`、编码和子进程行为差异。
- **社区热点**：  
  - Claude Code 工具链“Unix-first”问题明显  
  - Windows 用户无法正常运行优化/评估脚本
- **当前状态**：**open**

### 3. `skill-creator` 触发检测修复：真实 Skill 名称识别失败
- **链接**：[#1323](https://github.com/anthropics/skills/pull/1323)
- **功能**：修复 `run_eval.py` 误判“未触发 Skill”的问题。
- **社区热点**：  
  - 训练/优化循环因 recall=0% 而失效  
  - 触发判定逻辑不稳定，影响整个 Skill 生成质量
- **当前状态**：**open**

### 4. `skill-creator` 隔离评测命令文件，避免污染真实项目注册表
- **链接**：[#1261](https://github.com/anthropics/skills/pull/1261)
- **功能**：避免 eval 过程把临时命令写入用户真实 `.claude/commands/`。
- **社区热点**：  
  - 并行评测会污染 live project  
  - 影响用户工作区安全性与可复现性
- **当前状态**：**open**

### 5. `skill-creator` UTF-8 / 多字节字符崩溃修复
- **链接**：[#362](https://github.com/anthropics/skills/pull/362)
- **功能**：修复包含多字节字符时的长度校验与截断问题。
- **社区热点**：  
  - 非英文 Skill / 多语言内容容易触发 panic  
  - 国际化与稳健性问题
- **当前状态**：**open**

### 6. `skill-creator` YAML 特殊字符未加引号检测
- **链接**：[#361](https://github.com/anthropics/skills/pull/361)
- **功能**：提前检测 `description` / `compatibility` 中未加引号的 YAML 特殊字符。
- **社区热点**：  
  - YAML frontmatter 静默解析错误  
  - Skill 元数据配置易出错，且难以排查
- **当前状态**：**open**

### 7. `pdf` Skill：大小写引用修复
- **链接**：[#538](https://github.com/anthropics/skills/pull/538)
- **功能**：修复 `SKILL.md` 中对 `reference.md` / `forms.md` 的大小写引用错误。
- **社区热点**：  
  - 跨平台文件系统兼容性  
  - 文档类 Skill 对路径细节非常敏感
- **当前状态**：**open**

### 8. `docx` Skill：tracked changes 与 bookmark 冲突修复
- **链接**：[#541](https://github.com/anthropics/skills/pull/541)
- **功能**：避免 DOCX 修改时因 `w:id` 冲突导致文档损坏。
- **社区热点**：  
  - Office 文档技能的“可用性”与“安全修改”  
  - 文档结构兼容性是用户最关心的问题之一
- **当前状态**：**open**

---

## 2) 社区需求趋势

从 Issues 可以看出，社区最期待的新 Skill 方向主要集中在以下几类：

### A. 协作与分发：组织级共享、统一安装、权限边界
- **组织内共享 Skill**：[#228](https://github.com/anthropics/skills/issues/228)
- **社区/官方 Skill 命名空间信任边界**：[#492](https://github.com/anthropics/skills/issues/492)
- **趋势解读**：  
  社区不只想“写 Skill”，更想“安全地共享 Skill、管理 Skill、区分官方与社区来源”。

### B. 评测与质量控制：让 Skill 可验证、可优化
- **`run_eval.py` 触发率为 0%**：[#556](https://github.com/anthropics/skills/issues/556)
- **描述优化循环 recall=0%**：[#1169](https://github.com/anthropics/skills/issues/1169)
- **趋势解读**：  
  社区强烈需要一套可靠的 **Skill 评估、触发检测、描述优化** 体系，否则 Skill 生态无法规模化。

### C. 文档生产类 Skill：Office/格式转换/排版质量
- 相关 PR/Issue 涵盖 **DOCX / PDF / ODT / 文档排版**。
- **趋势解读**：  
  文档类 Skill 仍是最实用、最能被立即感知价值的方向之一，尤其是 **格式保真、模板填充、排版质量、跨格式转换**。

### D. 工程化能力：测试、代码质量、审查辅助
- **testing-patterns**：[#723](https://github.com/anthropics/skills/pull/723)
- **质量/安全分析器**：[#83](https://github.com/anthropics/skills/pull/83)
- **趋势解读**：  
  社区希望 Skill 不只是“写内容”，还要能直接服务软件工程流程：**测试生成、测试策略、质量分析、审查辅助**。

### E. 更强的任务型智能：记忆、治理、工作流编排
- **compact-memory**：[#1329](https://github.com/anthropics/skills/issues/1329)
- **agent-governance**：[#412](https://github.com/anthropics/skills/issues/412)
- **趋势解读**：  
  社区开始把 Skills 视为“Agent 工作流层”，期待它们能帮助 Claude 处理 **长期上下文、治理策略、风险控制、流程编排**。

---

## 3) 高潜力待合并 Skills

以下 PR 看起来最像“近期可落地”的候选：问题明确、修复范围较清楚、对主链路影响大。

### 1. `run_eval` 召回率/触发检测修复
- **链接**：[#1298](https://github.com/anthropics/skills/pull/1298)
- **原因**：直接修复官方 Skill 优化链路的核心失真问题，优先级极高。

### 2. `run_eval` 触发检测遗漏真实 Skill 名称
- **链接**：[#1323](https://github.com/anthropics/skills/pull/1323)
- **原因**：与上面同属评估链路关键修复，问题清晰、影响面大。

### 3. 隔离 eval 命令文件，避免污染用户项目
- **链接**：[#1261](https://github.com/anthropics/skills/pull/1261)
- **原因**：属于明显的工程安全修复，且对并行评测场景很关键。

### 4. Windows 兼容性修复（子进程 / 编码）
- **链接**：[#1050](https://github.com/anthropics/skills/pull/1050)
- **原因**：用户面广、复现明确、修复成本较低，适合较快合并。

### 5. UTF-8 多字节字符修复
- **链接**：[#362](https://github.com/anthropics/skills/pull/362)
- **原因**：国际化基础问题，属于必须修的稳定性增强。

### 6. YAML 特殊字符未加引号检测
- **链接**：[#361](https://github.com/anthropics/skills/pull/361)
- **原因**：低成本高收益，能减少大量隐性配置错误。

### 7. DOCX tracked changes 冲突修复
- **链接**：[#541](https://github.com/anthropics/skills/pull/541)
- **原因**：对文档技能可靠性非常关键，容易形成合并动机。

---

## 4) Skills 生态洞察

**一句话总结：**  
当前社区在 Skills 层面的最集中诉求是——**让 Skills 从“能用”走向“可验证、可共享、可跨平台稳定运行”的工程化基础设施。**

如果你需要，我也可以把这份报告进一步整理成：
- **PPT 风格摘要版**
- **Markdown 周报版**
- **适合发到社区/内部 Slack 的 1 分钟简报版**

---

# Claude Code 社区动态日报（2026-07-11）

## 1) 今日速览
Claude Code 今日最重要的动向是 **v2.1.207 发布**：Auto mode 已默认开放到 Bedrock、Vertex AI 和 Foundry，同时修复了长输出流式渲染时终端冻结/卡键问题。  
社区反馈则主要集中在三类高频痛点：**认证/会话稳定性、子代理与远程控制的执行可靠性、以及安全误报与模型行为一致性**。

---

## 2) 版本发布
### v2.1.207
- **Auto mode 默认可用**：无需再通过 `CLAUDE_CODE_ENABLE_AUTO_MODE` 显式开启，适用于 Bedrock、Vertex AI、Foundry；如需关闭，可在 settings 中设置 `disableAutoMode`。  
  链接：<https://github.com/anthropics/claude-code/releases/tag/v2.1.207>
- **终端交互修复**：修复了流式输出包含超长列表、表格、段落时的终端冻结与按键延迟问题。  
  链接：<https://github.com/anthropics/claude-code/releases/tag/v2.1.207>

---

## 3) 社区热点 Issues
> 说明：过去 24 小时内多数 Issue 仍处于刚提交阶段，评论量整体不高；以下优先挑选“影响面大 / 风险高 / 反馈集中”的 10 个。

1. **[#76503](https://github.com/anthropics/claude-code/issues/76503)**  
   `[bug, windows, agent-view]` 返回 agent view 会取消并重启 in-flight 子代理，导致重复执行、双重 token 计费、甚至误报“already done”。  
   **重要性**：这是典型的“正确性 + 成本”双重问题。  
   **社区反应**：已有 **2 条评论**，是当前热度最高的 Issue 之一。

2. **[#76544](https://github.com/anthropics/claude-code/issues/76544)**  
   Claude Desktop 第三方 MCP 场景下，`managedMcpServers` 的 OAuth 无法按需刷新，失败后会持续 403，必须手动重连。  
   **重要性**：直接影响第三方集成可用性，属于认证链路核心故障。  
   **社区反应**：目前 **1 条评论**，但问题面很明确。

3. **[#76530](https://github.com/anthropics/claude-code/issues/76530)**  
   Remote Control 在 worker 异常退出后会留下“伪运行中”会话，服务端状态卡死且无恢复路径。  
   **重要性**：远程控制/后台任务是协作场景关键能力，这类“僵尸会话”会严重影响可用性。  
   **社区反应**：已获得 **1 个 👍**，说明有人明确认同其严重性。

4. **[#76545](https://github.com/anthropics/claude-code/issues/76545)**  
   SSH bridge 场景下，远端 claude 未认证时，session revive 会无限挂起，没有错误提示。  
   **重要性**：影响跨机器接力和恢复流程，属于高摩擦故障。  
   **社区反应**：当前暂无评论，但从描述看复现路径清晰。

5. **[#76502](https://github.com/anthropics/claude-code/issues/76502)**  
   子代理输出被一段“Attribution requirement”伪造 payload 完全劫持，且没有任何 tool call。  
   **重要性**：这是输出完整性/供应链式污染风险，值得安全和运行时团队重点关注。  
   **社区反应**：目前暂无评论，但问题性质较敏感。

6. **[#76509](https://github.com/anthropics/claude-code/issues/76509)**  
   macOS 下 bash permission 规则与 docker image tag 中的冒号冲突，出现“静默失效”的 dead rule，且 settings.json 与 `--allowedTools` 行为不一致。  
   **重要性**：权限系统是安全边界，配置不一致会造成“以为拦住了，实际没拦住”。  
   **社区反应**：暂无评论，但属于高风险配置缺陷。

7. **[#76522](https://github.com/anthropics/claude-code/issues/76522)**  
   Fable 5 误报约 15M 的上下文窗口，实际却只有 1M，并且在已加载会话上拒绝 compaction。  
   **重要性**：直接影响模型能力预期、上下文管理和工作流稳定性。  
   **社区反应**：暂无评论，但影响面很大，且“模型声明不一致”会引发大量连锁问题。

8. **[#76521](https://github.com/anthropics/claude-code/issues/76521)**  
   在有 Cyber Verification Program 的情况下，仍被错误触发 cybersecurity safety block。  
   **重要性**：安全误报会显著打断合法开发流程，是近期高频主题。  
   **社区反应**：暂无评论，但与多个相似问题构成明显聚类。

9. **[#76533](https://github.com/anthropics/claude-code/issues/76533)**  
   Windows 上在 debug 商业系统时被错误标记为安全行为。  
   **重要性**：再次说明安全分类器/策略存在误伤，且覆盖到 Windows 场景。  
   **社区反应**：暂无评论，属于“刚出现但重复性高”的类型。

10. **[#76541](https://github.com/anthropics/claude-code/issues/76541)**  
    Desktop 里的 `/code-review` 静默走了本地 review，而不是启动云端 ultrareview；没有确认框，也没有免费调用消耗提示。  
    **重要性**：这是“行为与预期不一致”的典型问题，会损害透明度与用户信任。  
    **社区反应**：暂无评论，但涉及产品路径切换与计费可见性。

---

## 4) 重要 PR 进展
> 说明：过去 24 小时内仅有 **5 个 PR** 更新，以下全部列出。

1. **[#76475](https://github.com/anthropics/claude-code/pull/76475)**  
   `Flag innerHTML/outerHTML += append sink in security-guidance`  
   **内容**：补强 security-guidance 里的 XSS 规则，覆盖 `innerHTML +=` / `outerHTML +=` 这类追加型 sink。  
   **价值**：提升安全规则召回率，减少漏报。

2. **[#76394](https://github.com/anthropics/claude-code/pull/76394)**  
   `Add Claude Code Launcher - Windows CLI Application`  
   **内容**：新增 Windows CLI Launcher。  
   **价值**：明显面向 Windows 生态扩展，可能改善安装、启动和交互入口。

3. **[#76298](https://github.com/anthropics/claude-code/pull/76298)**  
   `docs: document Remote Control background-task panel`  
   **内容**：补充 Remote Control 背景任务面板文档，说明 web/mobile 的任务状态同步行为。  
   **价值**：帮助用户理解远程任务与状态流转，降低使用成本。

4. **[#76289](https://github.com/anthropics/claude-code/pull/76289)**  
   `examples/hooks: demonstrate compound-command pre-flight with deny-and-steer in the bash validator example`  
   **内容**：增强 bash validator 示例，展示复合命令预检、deny-and-steer 等策略。  
   **价值**：对 hooks/安全管控用户很实用，能直接作为参考实现。

5. **[#76274](https://github.com/anthropics/claude-code/pull/76274)**  
   `security-guidance: resolve review paths against the repo root and harden the findings-array contract`  
   **内容**：修正 review path 的 repo root 解析，并加固 findings 数组契约。  
   **价值**：提升安全审查链路健壮性，避免路径歧义和数据格式漂移。

---

## 5) 功能需求趋势
从过去 24 小时的 Issues 看，社区关注点非常集中，主要有五条：

1. **安全与权限精细化**
   - 典型诉求：减少 false positive、提升 allow/deny 规则表达能力、避免安全分类误伤。
   - 相关问题：[#76509](https://github.com/anthropics/claude-code/issues/76509)、[#76521](https://github.com/anthropics/claude-code/issues/76521)、[#76533](https://github.com/anthropics/claude-code/issues/76533)、[#76531](https://github.com/anthropics/claude-code/issues/76531)

2. **模型行为一致性与幻觉控制**
   - 典型诉求：减少错误域名、错误术语、错误安全标记、错误能力声明。
   - 相关问题：[#76525](https://github.com/anthropics/claude-code/issues/76525)、[#76522](https://github.com/anthropics/claude-code/issues/76522)、[#76540](https://github.com/anthropics/claude-code/issues/76540)

3. **子代理/agent 工作流可靠性**
   - 典型诉求：避免重复执行、状态丢失、输出被污染、后台任务卡死。
   - 相关问题：[#76503](https://github.com/anthropics/claude-code/issues/76503)、[#76502](https://github.com/anthropics/claude-code/issues/76502)、[#76534](https://github.com/anthropics/claude-code/issues/76534)、[#76530](https://github.com/anthropics/claude-code/issues/76530)

4. **IDE / Desktop / Web / TUI 交互体验**
   - 典型诉求：更好的滚动、固定提示、鼠标交互、任务列表信息密度、review 行为透明度。
   - 相关问题：[#76528](https://github.com/anthropics/claude-code/issues/76528)、[#76537](https://github.com/anthropics/claude-code/issues/76537)、[#76536](https://github.com/anthropics/claude-code/issues/76536)、[#76543](https://github.com/anthropics/claude-code/issues/76543)、[#76541](https://github.com/anthropics/claude-code/issues/76541)

5. **认证、远程控制与集成稳定性**
   - 典型诉求：OAuth 刷新、SSH 恢复、Desktop/3P 集成、远程会话恢复。
   - 相关问题：[#76544](https://github.com/anthropics/claude-code/issues/76544)、[#76545](https://github.com/anthropics/claude-code/issues/76545)、[#76530](https://github.com/anthropics/claude-code/issues/76530)

---

## 6) 开发者关注点
开发者反馈里最明显的痛点可以归纳为以下几类：

- **不要“悄悄做错事”**：例如子代理重跑、local review 代替 cloud review、权限规则静默失效。  
- **减少安全误报**：安全策略现在明显偏“保守”，但误伤已经影响到正常调试与商业系统开发。  
- **提升会话恢复能力**：Remote Control、SSH bridge、OAuth 刷新这类链路一旦断掉，用户几乎没有自助恢复手段。  
- **改善模型与上下文管理**：包括错误能力声明、上下文窗口夸大、compaction 行为异常、输出幻觉。  
- **优化交互效率**：长输出、滚动阅读、固定待办、鼠标点击、Web 列表信息展示等细节，直接影响日常使用体验。  

如果你愿意，我也可以把这份日报进一步整理成 **“管理层摘要版”** 或 **“适合直接发群的短版”**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-07-11）

## 1) 今日速览
今天仓库的动态以 **alpha 版本持续迭代** 和 **高密度问题修复/反馈** 为主，说明 Codex 仍处在快速打磨阶段。社区讨论集中在 **桌面端稳定性、额度/速率限制、subagent 控制、远程协作** 以及 **CLI/多模态兼容性**，其中不少是会直接影响可用性的阻塞级问题。

## 2) 版本发布
- [rust-v0.145.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.4)  
  过去 24 小时内新增的 Rust 预发布版本之一，仓库未附带详细 changelog，可视为持续的小步快迭代。
- [rust-v0.145.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.3)  
  同期发布的另一版 alpha，和 alpha.4 一起表明底层组件仍在快速推进中。

## 3) 社区热点 Issues
1. [#32294 Desktop exposes automation_update without a handler](https://github.com/openai/codex/issues/32294)  
   影响桌面端自动化管理，导致 automations 无法正常维护，属于直接影响功能可用性的 bug；**3 条评论**，是今天最集中的讨论点之一。

2. [#32279 Limits erroneously drawn to 0% in less than a few minutes](https://github.com/openai/codex/issues/32279)  
   涉及额度/速率限制显示异常，用户会误以为资源已耗尽，严重影响使用信任；**2 条评论**，属于高优先级体验问题。

3. [#32291 Tool-backed Codex Desktop ignores prompt model steering](https://github.com/openai/codex/issues/32291)  
   subagent 选择和模型 steering 失效，直接打击“可控性”；**2 条评论、1 个赞**，说明开发者对细粒度代理控制需求很强。

4. [#32250 GPT-5.6 Sol Medium depletes Pro usage allowance extremely quickly](https://github.com/openai/codex/issues/32250)  
   资源消耗过快，属于会立即影响付费用户体验的核心问题；**2 条评论、1 个赞**，和额度/计费预期强相关。

5. [#32296 5.6 sol is no longer available](https://github.com/openai/codex/issues/32296)  
   模型可用性变化会直接影响会话续跑和工作流连续性；**1 条评论**，但问题本身影响面大。

6. [#32293 Computer Use 1.0.1000366 crashes on accessibility capture](https://github.com/openai/codex/issues/32293)  
   Computer Use 直接崩溃，属于自动化/远程操作链路上的阻塞级缺陷；**1 条评论**，但技术风险高。

7. [#32268 New “ChatGPT” app: agents are very slow](https://github.com/openai/codex/issues/32268)  
   性能退化会放大所有工作流的等待成本，尤其是 subagent 场景；**1 条评论**，但属于高感知问题。

8. [#32258 macOS app beachballs on launch, never creates a window](https://github.com/openai/codex/issues/32258)  
   启动即卡死是典型的“无法使用”级问题，影响 macOS 用户基本入口；**1 条评论**。

9. [#32259 Remote browser tabs should resolve localhost to the remote host](https://github.com/openai/codex/issues/32259)  
   远程开发场景下的 localhost 解析错误会直接阻断本地服务调试；**1 条评论**，对远程协作非常关键。

10. [#32281 ChatGPT/Codex Windows package cannot install from MS Store](https://github.com/openai/codex/issues/32281)  
    安装链路失败会阻断新用户接入；**1 条评论**，但属于明显的发布/分发入口问题。

## 4) 重要 PR 进展
1. [#32206 Always send reasoning parameters in Responses requests](https://github.com/openai/codex/pull/32206)  
   统一在 Responses 请求中携带 reasoning 参数，减少模型侧行为分叉，属于基础协议层修复。

2. [#32290 Respect model support for reasoning summaries](https://github.com/openai/codex/pull/32290)  
   按模型能力决定是否发送 reasoning summary 相关参数，提升兼容性，避免不支持模型被误配置。

3. [#32289 Persist paginated items in the local thread store](https://github.com/openai/codex/pull/32289)  
   让本地线程存储正确保留分页内容，增强长会话与历史回放的稳定性。

4. [#32288 Make GPT-5.6 Sol the default Bedrock model](https://github.com/openai/codex/pull/32288)  
   更新 Bedrock 模型默认选择逻辑，推动 GPT-5.6 Sol 成为默认项。

5. [#32280 Include terminal errors in turn completion events](https://github.com/openai/codex/pull/32280)  
   将终端错误带入 turn 完成事件，提升错误观测与排障能力。

6. [#32263 Include start times in terminal turn events](https://github.com/openai/codex/pull/32263)  
   为终端 turn 事件补充开始时间戳，有助于性能分析与链路追踪。

7. [#32277 Honor `personality = "none"` in model instructions](https://github.com/openai/codex/pull/32277)  
   让 `personality = "none"` 真正生效，避免把人格化提示词强制塞进基础指令。

8. [#32272 Expose scheduled tasks in plugin details](https://github.com/openai/codex/pull/32272)  
   在插件详情中暴露 scheduled tasks 元数据，增强远程插件的可发现性。

9. [#32261 Preserve local path conventions in automatic approvals](https://github.com/openai/codex/pull/32261)  
   修复自动审批流程中本地路径约定被误判的问题，减少跨平台路径歧义。

10. [#32229 Serialize MCP OAuth credential refreshes](https://github.com/openai/codex/pull/32229)  
    对 MCP OAuth 刷新做串行化，避免并发刷新导致凭据状态不一致。

## 5) 功能需求趋势
- [额度/速率限制与模型可用性](https://github.com/openai/codex/issues/32279) / [#32250](https://github.com/openai/codex/issues/32250) / [#32262](https://github.com/openai/codex/issues/32262) / [#32296](https://github.com/openai/codex/issues/32296)  
  社区最关心“为什么很快耗尽额度、为何模型突然不可用、如何解释限制策略”。

- [桌面端稳定性与启动/安装体验](https://github.com/openai/codex/issues/32258) / [#32281](https://github.com/openai/codex/issues/32281) / [#32248](https://github.com/openai/codex/issues/32248)  
  macOS/Windows 的启动、安装、登录和窗口渲染问题占比高，属于产品入口层痛点。

- [subagent 控制与可观测性](https://github.com/openai/codex/issues/32291) / [#32283](https://github.com/openai/codex/issues/32283) / [#32270](https://github.com/openai/codex/issues/32270)  
  用户希望更精确地指定模型、reasoning effort、delegation 以及查看子代理执行细节。

- [远程协作与 remote/browser 行为一致性](https://github.com/openai/codex/issues/32259) / [#32242](https://github.com/openai/codex/issues/32242) / [#32273](https://github.com/openai/codex/issues/32273)  
  远程 host、iOS/desktop 同步、断线恢复与 localhost 解析是协作场景的关键需求。

- [CLI / TUI / 多模态兼容性](https://github.com/openai/codex/issues/32287) / [#32269](https://github.com/openai/codex/issues/32269) / [#32265](https://github.com/openai/codex/issues/32265)  
  社区希望 CLI 更好地处理图片、上下文压缩、输出渲染与历史回溯。

- [自动化与 Computer Use / MCP 能力](https://github.com/openai/codex/issues/32294) / [#32293](https://github.com/openai/codex/issues/32293) / [#32244](https://github.com/openai/codex/issues/32244)  
  自动化工具链的完整性、权限边界和运行时稳定性，是当前高关注方向。

## 6) 开发者关注点
- [模型策略透明度](https://github.com/openai/codex/issues/32279) / [#32250](https://github.com/openai/codex/issues/32296)  
  开发者最在意的是：**额度如何计算、模型是否可用、默认模型是否变更**，以及这些变化是否足够可预期。

- [工作流可靠性](https://github.com/openai/codex/issues/32258) / [#32281](https://github.com/openai/codex/issues/32248)  
  启动失败、安装失败、卡死、断连等问题会直接破坏工作流，属于“先能用，再谈优化”的典型诉求。

- [代理可控性与调试能力](https://github.com/openai/codex/issues/32291) / [#32283](https://github.com/openai/codex/issues/32270)  
  社区希望看到更清晰的 subagent 配置、模型 steering、生效状态和任务归属信息。

- [远程/多端一致性](https://github.com/openai/codex/issues/32259) / [#32273](https://github.com/openai/codex/issues/32242)  
  跨设备、跨 host 的任务状态和网络语义需要更统一，否则远程开发体验会迅速失真。

- [可观测性与诊断信息](https://github.com/openai/codex/pull/32280) / [#32263](https://github.com/openai/codex/pull/32263)  
  社区对事件时间戳、错误回传、任务流日志的需求很明确，说明“能看懂发生了什么”正在成为刚需。

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合团队晨会的 1 分钟摘要版**，或  
2. **带优先级标签（P0/P1/P2）的运维/产品分析版**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-07-11）

## 1) 今日速览
今天 Gemini CLI 社区没有新版本发布，讨论重心集中在**核心稳定性与安全修复**上。  
过去 24 小时内更新的内容不多，但两类问题非常典型：一类是 **CLI 在模型返回异常边界条件下静默中止**，另一类是 **跨平台与配置/认证流程中的可靠性问题**。  
同时，PR 侧出现了多项偏底层的修复，说明当前社区关注点明显偏向“先把基础体验和安全性补稳”。

---

## 2) 版本发布
- **无新 Releases**

---

## 3) 社区热点 Issues
> 说明：过去 24 小时内仅更新了 **2 条 Issue**，因此以下为全部可观察到的重点问题，而非 10 条。

### 1. CLI 在 API 返回 `finishReason: "STOP"` 且文本为空时静默卡死
- **Issue**：[#28351](https://github.com/google-gemini/gemini-cli/issues/28351)
- **要点**：高优先级 P1，核心模块 bug，且带有 `possible-duplicate` 标记，说明这类失败模式可能不是孤立事件。
- **为什么重要**：这是典型的“**无报错、无输出、直接停住**”问题，最影响用户对 CLI 可靠性的感知，尤其出现在工具调用后的模型回包阶段。
- **社区反应**：已有 2 条评论，且被 bot triage，表明维护者已注意到该问题的严重性，但仍需进一步确认根因与重复问题归并。
- **链接**：https://github.com/google-gemini/gemini-cli/issues/28351

### 2. 通用“cli is not working”故障反馈
- **Issue**：[#28350](https://github.com/google-gemini/gemini-cli/issues/28350)
- **要点**：P2、core/bug，但描述非常简略，缺乏复现信息。
- **为什么重要**：这类低信息量报障通常代表用户在实际环境里遇到**基础不可用**问题，虽然暂时无法定位，但对支持成本和用户体验都有直接影响。
- **社区反应**：已有 1 条评论并被 bot triage，说明社区已开始做基础分流，但还需要补充日志、复现步骤和环境细节。
- **链接**：https://github.com/google-gemini/gemini-cli/issues/28350

---

## 4) 重要 PR 进展
> 说明：过去 24 小时内更新的 PR 共有 **4 条**，以下为全部重要变更。

### 1. 修复 a2a-server restore 命令的路径穿越风险
- **PR**：[#28353](https://github.com/google-gemini/gemini-cli/pull/28353)
- **内容**：对 `restore` 命令输入做路径约束，防止 `../../../etc/passwd` 之类的越界读取/覆盖。
- **为什么重要**：这是明显的**安全加固**，属于防御性修复，影响面虽集中在 a2a-server，但价值很高。
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28353

### 2. 修复 caretaker 中未受信任 issue title 的提示注入风险
- **PR**：[#28352](https://github.com/google-gemini/gemini-cli/pull/28352)
- **内容**：清理并包裹 issue title，避免 `</untrusted_context>` 之类的注入绕过。
- **为什么重要**：这是典型的 **AI 工具链安全问题**，特别是涉及把外部文本送入 agent/上下文时，必须做最小信任处理。
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28352

### 3. 修复 `customDeepMerge` 处理循环引用导致的栈溢出
- **PR**：[#28349](https://github.com/google-gemini/gemini-cli/pull/28349)
- **内容**：为递归合并增加循环引用追踪，避免 settings 中出现自引用对象时崩溃。
- **为什么重要**：这是核心配置路径的稳定性修复，直接关系到设置管理器是否会因异常配置而挂掉。
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28349

### 4. 修复 MaxListenersExceededWarning 与 Windows 认证死循环
- **PR**：[#28348](https://github.com/google-gemini/gemini-cli/pull/28348)
- **内容**：同时解决 API 重试过程中的监听器增长问题，以及 Windows 上 OAuth 成功后的无限认证循环。
- **为什么重要**：这是当前最“用户可感知”的稳定性修复之一，涉及**重试机制、事件监听、跨平台登录流程**三个关键面。
- **链接**：https://github.com/google-gemini/gemini-cli/pull/28348

---

## 5) 功能需求趋势
从当前更新的 Issue 来看，社区需求并不是在追新功能，而是明显聚焦在以下几类方向：

1. **CLI 基础可靠性**
   - 重点关注：工具调用后不中断、异常返回不静默失败、状态机稳定。
   - 对应 Issue：[#28351](https://github.com/google-gemini/gemini-cli/issues/28351)

2. **错误处理与可观测性**
   - 重点关注：当 CLI “不工作”时，能否输出足够诊断信息，避免用户只能报“坏了”。
   - 对应 Issue：[#28350](https://github.com/google-gemini/gemini-cli/issues/28350)

3. **跨平台认证稳定性**
   - PR 已明确暴露 Windows OAuth 循环问题，说明 Windows 兼容性仍是重点需求。
   - 对应 PR：[#28348](https://github.com/google-gemini/gemini-cli/pull/28348)

4. **配置/合并逻辑健壮性**
   - 循环引用、递归合并、设置管理等基础能力需要更强防御。
   - 对应 PR：[#28349](https://github.com/google-gemini/gemini-cli/pull/28349)

5. **安全防护优先级上升**
   - 路径穿越、提示注入等问题说明社区开始更重视 agent/CLI 场景下的输入隔离。
   - 对应 PR：[#28353](https://github.com/google-gemini/gemini-cli/pull/28353)、[#28352](https://github.com/google-gemini/gemini-cli/pull/28352)

---

## 6) 开发者关注点
综合今天的反馈，开发者最需要关注的痛点主要有：

- **“静默失败”比显式报错更危险**：一旦 CLI 在模型返回边界条件下停住，用户很难判断是网络、模型、还是本地状态问题。  
  - 关联：[#28351](https://github.com/google-gemini/gemini-cli/issues/28351)

- **诊断信息不足会放大支持成本**：像“cli is not working”这类反馈，说明需要更好的错误提示、日志和复现引导。  
  - 关联：[#28350](https://github.com/google-gemini/gemini-cli/issues/28350)

- **认证和重试逻辑仍是高风险区**：监听器泄漏、无限循环、Windows 特殊路径问题都说明状态管理需要更严格的边界控制。  
  - 关联：[#28348](https://github.com/google-gemini/gemini-cli/pull/28348)

- **AI 工具链安全必须默认内建**：外部文本进入上下文时，prompt injection 和路径穿越必须作为基础防线处理，而不是事后补丁。  
  - 关联：[#28352](https://github.com/google-gemini/gemini-cli/pull/28352)、[#28353](https://github.com/google-gemini/gemini-cli/pull/28353)

- **配置系统需要容错能力**：循环引用这类“看似少见、实际常见”的问题，说明 settings/merge 逻辑要更健壮。  
  - 关联：[#28349](https://github.com/google-gemini/gemini-cli/pull/28349)

---

如果你愿意，我也可以把这份日报进一步整理成**“可直接发到团队群里的短版”**，或者输出成 **Markdown 表格版**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
**日期：2026-07-11**  
数据源：github.com/github/copilot-cli

## 1) 今日速览
今天的动态主要集中在两个方向：一是 **v1.0.71-0 发布**，重点增强了 `/settings` 的提示词固定、仓库作用域切换，以及默认校验/安装指引和快捷键体验；二是 **社区问题高度集中在 MCP OAuth 与工具暴露链路**，同时 voice mode、`web_search` 可信度也成为明显痛点。整体看，Copilot CLI 正在补齐可用性细节，但核心集成稳定性仍是社区最关注的话题。

---

## 2) 版本发布

### v1.0.71-0
- 发布链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.71-0>
- 主要更新：
  - 新增 `/settings` 中的 **pinned prompts** 设置，用于控制提示词固定
  - 新增 **Repo** 与 **Repo (local)** 作用域标签页，强化设置管理
  - 默认采用 **更有针对性的校验命令**，并提供更轻量的安装指引
  - 新增快捷键体验：`Ctrl+X` → `X` 关闭会话，`Ctrl+X` → `H` 隐藏界面（release 文案截断处应为隐藏相关功能）

---

## 3) 社区热点 Issues（挑选 10 个）

### 1. Atlassian MCP：OAuth 成功但会话里没有任何工具暴露
- Issue：<https://github.com/github/copilot-cli/issues/4089>
- 重要性：这是典型的“**连接成功但能力缺失**”问题，直接影响 MCP 的可用性。
- 社区反应：已有 **2 条评论**，说明问题已被多位用户验证；当前仍在 triage，且没有点赞，偏向实用性 bug 而非讨论型议题。

### 2. Atlassian MCP：未完成 OAuth 流程却被标记为已连接
- Issue：<https://github.com/github/copilot-cli/issues/4086>
- 重要性：会导致状态机误判，用户界面显示“已连接”但实际工具不可用，影响信任度。
- 社区反应：暂无评论/点赞，但问题描述明确、可复现性强，属于高优先级集成缺陷。

### 3. MCP OAuth 流程异常：发现阶段标记为 needs-auth，连接后约 90 秒掉线
- Issue：<https://github.com/github/copilot-cli/issues/4085>
- 重要性：涉及 **OAuth 连接生命周期**，不仅影响登录，还影响会话持续性。
- 社区反应：暂无互动，但同时涉及 Azure AD、Work IQ 等多种 OAuth 服务，说明影响面较广。

### 4. MCP OAuth 客户端发现：短暂连接后断开，工具始终无法进入会话
- Issue：<https://github.com/github/copilot-cli/issues/4084>
- 重要性：这是 MCP 连接链路的核心稳定性问题，会直接阻断工具调用。
- 社区反应：暂无评论，但描述中包含多服务、多工具场景，属于系统性问题信号。

### 5. `web_search` 返回“看似合理但实际虚构”的答案
- Issue：<https://github.com/github/copilot-cli/issues/4093>
- 重要性：这是 **结果可信度/grounding** 问题，影响 Copilot CLI 的专业输出可靠性。
- 社区反应：暂无评论和点赞，但问题指向模型幻觉风险，属于高敏感度质量问题。

### 6. Voice mode：希望在按住空格说话后，松开即自动提交
- Issue：<https://github.com/github/copilot-cli/issues/4090>
- 重要性：提升 voice mode 的交互效率，属于明显的 UX 改进需求。
- 社区反应：暂无互动，但需求很具体，易于评估和实现，属于低争议高价值功能。

### 7. Skills：希望支持动态上下文注入（`!command` 占位符）
- Issue：<https://github.com/github/copilot-cli/issues/4088>
- 重要性：这是面向 Agent Skills 的能力增强，能显著提升技能复用和上下文自动化。
- 社区反应：暂无评论，但属于平台能力扩展，偏中长期价值。

### 8. Voice mode：录音时自动静音系统播放
- Issue：<https://github.com/github/copilot-cli/issues/4092>
- 重要性：解决麦克风串音问题，直接影响语音输入识别质量。
- 社区反应：暂无互动，但需求场景非常真实，属于 voice mode 落地体验优化。

### 9. Voice mode：企业代理环境下下载失败（ENOTFOUND）
- Issue：<https://github.com/github/copilot-cli/issues/4083>
- 重要性：说明 voice 功能在企业网络/代理场景下存在可用性阻断。
- 社区反应：暂无评论，但错误定位具体，适合快速排查网络与依赖下载链路。

### 10. Linux musl x64：v1.0.X release tarball 中独立二进制被移除
- Issue：<https://github.com/github/copilot-cli/issues/4091>
- 重要性：这是 **发行包回归/破坏性变更**，会影响 Alpine Linux 等 musl 环境部署。
- 社区反应：该问题 **已关闭**，说明维护者已介入处理；有 1 条评论，属于少量但高影响的发布问题。

---

## 4) 重要 PR 进展
- 过去 24 小时 **没有 PR 更新**（共 0 条），因此暂无可列出的重要 PR 进展。  
- PR 链接：<https://github.com/github/copilot-cli/pulls>

---

## 5) 功能需求趋势
从本期 Issues 看，社区关注点主要集中在以下方向：

1. **MCP / OAuth 稳定性**
   - 连接成功但工具不可用、自动掉线、认证流程异常，是最密集的问题簇。
   - 说明 Copilot CLI 正在从“能连上”走向“能稳定用”的阶段。

2. **Voice mode 体验完善**
   - 包括自动提交、静音播放、企业代理兼容等，说明语音输入正在成为真实工作流的一部分。

3. **结果可信度与 grounding**
   - `web_search` 虚构答案的问题非常关键，反映出用户对“可引用、可验证”输出的要求提升。

4. **技能与上下文自动化**
   - Skills 的动态上下文注入需求表明，用户希望 Copilot CLI 更像可编排的 Agent 平台，而不只是交互式助手。

5. **跨环境与跨端可用性**
   - Linux/musl 打包回归、桌面端与 CLI 会话同步需求，说明多平台一致性仍是关注点。

---

## 6) 开发者关注点
社区反馈里最突出的痛点可以概括为三类：

- **认证与连接链路不稳定**：MCP OAuth、自动连接、会话掉线是当前最需要优先修复的基础问题。
- **AI 输出可靠性不足**：`web_search` 的“无依据但自信”输出会直接损害信任，属于高风险体验问题。
- **新能力在真实环境下的落地成本较高**：voice mode 在音频、代理、系统播放等环境因素下暴露出大量边缘问题。

如果你希望，我可以把这份日报进一步整理成：
- **适合微信群/Slack 发布的简版**
- **适合内部周报的正式版**
- **按“高优先级 / 中优先级 / 低优先级”重新排序的版本**

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报  
**日期：2026-07-11**  
**数据源：github.com/MoonshotAI/kimi-cli**

## 1) 今日速览
过去 24 小时内，仓库没有新的 Release，也没有新增或更新的 Issues，社区讨论热度较低。  
当前活跃内容集中在 2 个 Open PR，主题都很明确：**修复 `/init` 引发的 plan-mode 工具绑定异常**，以及**让新安装用户的 `LLM not set` 报错更可操作**。  
整体看，维护重点正从“功能扩张”转向“**稳定性、初始化体验、错误提示可用性**”。

---

## 2) 版本发布
**无新版本发布。**

---

## 3) 社区热点 Issues
**过去 24 小时无更新 Issues（共 0 条）**，因此无法筛选出 10 个热点 Issue。  
当前可见的社区焦点主要来自 PR 所反映的问题，而不是 Issue 讨论本身。

### 当前可确认的 Issue 热度结论
- **无新增/无更新 Issue**：说明近期社区反馈量较低，或问题更多在开发分支内被提前修复。
- **热点集中在可用性问题**：从 PR 描述可见，社区更关注 CLI 的“首次使用体验”和“执行稳定性”。

> 由于没有实际更新的 Issue 列表，本节不做虚构排序。若你希望，我可以在你补充 Issue 数据后，按“影响面 / 讨论量 / 修复紧迫度”输出 Top 10。

---

## 4) 重要 PR 进展
过去 24 小时内共有 **2 个重要 PR** 更新，均为 `OPEN` 状态：

### 1. [#2489] fix(soul): restore plan-mode tool bindings after /init creates throwaway soul
- **作者**：nankingjing  
- **创建/更新**：2026-07-10  
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/2489  
- **关注点**：修复 `/init` 过程中创建的临时 `KimiSoul` 与主实例共享 agent，导致 **tool instances 被重新绑定**，进而破坏 plan-mode 工具绑定。
- **重要性**：  
  - 这是典型的**状态污染 / 对象共享副作用**问题。  
  - 影响的是工具调用链路，属于“看起来偶发、实际影响深”的稳定性 bug。  
  - 修复后有助于避免 plan-mode 下工具行为异常，提升 agent 工作流可靠性。

### 2. [#2488] fix(soul): make LLMNotSet error message actionable for fresh installs
- **作者**：nankingjing  
- **创建/更新**：2026-07-10  
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/2488  
- **关注点**：将 `LLM not set` 的默认错误提示改为更明确、可执行的引导，面向 **Homebrew 新安装用户** 在未 `kimi login` 时的报错场景。
- **重要性**：  
  - 直接改善**新手启动体验**，减少“装了却不能用”的挫败感。  
  - 属于高 ROI 的可用性修复：修改不大，但能显著降低支持成本。  
  - 对 CLI 工具尤其关键，因为错误提示是否“下一步明确”会直接影响留存。

---

## 5) 功能需求趋势
由于过去 24 小时 **没有更新的 Issues**，本日报只能从 PR 主题中提炼需求趋势。当前最明显的方向是：

### 1. 初始化/登录链路的可用性优化
- 用户在首次安装、首次启动时，需要更明确的引导。
- 需求重点是：**少报“你错了”，多告诉“下一步怎么做”**。

### 2. Agent / Plan-mode 稳定性
- 工具绑定、实例共享、副作用控制是当前维护重点。
- 说明社区和维护者都在关注：**agent 状态一致性**、**工具调用可靠性**。

### 3. CLI 低摩擦上手体验
- 新安装报错可操作化，说明产品正在强化“开箱即用”。
- 这类需求通常对应：
  - 更友好的错误信息
  - 更清晰的登录/配置提示
  - 更少的隐性前置条件

---

## 6) 开发者关注点
从最近更新来看，开发者反馈的痛点主要集中在以下几类：

- **状态共享带来的隐式 bug**  
  `/init` 触发的 throwaway 对象影响到主 soul 的 tool binding，说明内部对象生命周期与共享机制需要更严格隔离。

- **错误提示缺乏行动指引**  
  `LLM not set` 这类报错对新用户不友好，开发者希望把“错误”变成“操作提示”。

- **新装即用的体验欠佳**  
  Homebrew 安装后若未登录就直接报错，会让用户误以为产品不可用；因此“首次使用引导”是高优先级问题。

- **维护重心偏向修复与体验打磨**  
  当前没有新的 Release，也没有 Issue 活跃，说明仓库近期更像在做稳定性收口，而不是大功能迭代。

---

## 附：本日报链接汇总
- PR #2489：https://github.com/MoonshotAI/kimi-cli/pull/2489  
- PR #2488：https://github.com/MoonshotAI/kimi-cli/pull/2488  

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合公众号/周报的简版**，或  
2. **带“影响评估 / 风险等级 / 优先级建议”的管理版**。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-07-11

## 1) 今日速览
过去 24 小时内 **没有新 Release**，社区讨论重心集中在 **V2 TUI 交互一致性、模型/Provider 兼容性、以及性能与稳定性问题**。从 Issue 热度看，大家不仅在修功能，还在集中补齐“可用性、可发现性、跨模型行为一致性”这些基础体验。

---

## 2) 社区热点 Issues（10 条）

1. **[#36302 feat(tui): unify modal interaction and visual behavior](https://github.com/anomalyco/opencode/issues/36302)**  
   评论 5，今天最热的议题。核心是统一 V2 TUI 的弹窗交互与视觉行为，说明社区正在推动界面交互模型收敛，属于后续一批 UI 修复的“总入口”。

2. **[#36305 provider/github-copilot: every model rejected on /chat/completions](https://github.com/anomalyco/opencode/issues/36305)**  
   评论 3，影响所有 Copilot 模型请求，属于直接阻断使用的兼容性问题。讨论集中在接口路径与模型可用性不匹配，优先级非常高。

3. **[#36285 2.0: managed-service restart causes reconnect herd and resource spikes](https://github.com/anomalyco/opencode/issues/36285)**  
   评论 3，自动更新/重启后引发连接风暴和资源尖峰，说明 V2 的共享服务模型还存在明显的恢复抖动问题。对多实例、自动重连场景尤其关键。

4. **[#36280 opencode Worker subprocess crashes with SIGILL ...](https://github.com/anomalyco/opencode/issues/36280)**  
   评论 3，Intel 老 CPU 上出现 SIGILL 并触发系统级崩溃链，属于高风险兼容性事故。虽然硬件覆盖面不大，但一旦触发影响极重。

5. **[#36316 Kimi ... stops agent loop after first tool call](https://github.com/anomalyco/opencode/issues/36316)**  
   评论 1，暴露 OpenAI-compatible Provider 在多步工具调用上的协议兼容问题。对使用 moonshot/Kimi 系列模型的用户影响直接。

6. **[#36318 [FEATURE]: Support GPT-5.6 prompt caching defaults](https://github.com/anomalyco/opencode/issues/36318)**  
   评论 1，说明社区已经开始跟进 GPT-5.6 之后的新缓存行为。它不是“新功能炫技”，而是确保新模型默认行为可用、可控。

7. **[#36300 LSP diagnostics stored inline ... cause multi-GB session bloat](https://github.com/anomalyco/opencode/issues/36300)**  
   评论 1，但问题很重：会话体积膨胀、GUI 卡顿、内存压力上升，属于典型“数据存储策略过重”问题。性能修复价值很高。

8. **[#36301 Git Changes panel is stuck on the main worktree ...](https://github.com/anomalyco/opencode/issues/36301)**  
   评论 1，worktree 切换后右侧 Git Changes 不跟随上下文，影响多工作区开发流。属于高频开发场景中的状态同步问题。

9. **[#36308 feat: support interactive shell mode to load shell rc files](https://github.com/anomalyco/opencode/issues/36308)**  
   评论 2，用户希望执行 shell tool 时能加载 `.zshrc/.bashrc` 里的 alias 和插件。说明大家对“像交互式 shell 一样工作”的需求很强。

10. **[#36289 Subagent model config ignored — all subagents use primary model](https://github.com/anomalyco/opencode/issues/36289)**  
    评论 1，且有 1 个 👍，说明需求真实存在。子代理模型配置失效会直接影响任务分工与成本控制，是子 agent 体系的重要正确性问题。

---

## 3) 重要 PR 进展（10 条）

1. **[#36336 [contributor] feat(core): port GitHub Copilot OAuth](https://github.com/anomalyco/opencode/pull/36336)**  
   状态：OPEN。把 GitHub/Copilot 的 OAuth 迁移到 V2 集成注册表，并补齐请求头与模型同步逻辑，直接对应今天的 Copilot 兼容问题。

2. **[#36333 [contributor] fix(core): cap session output tokens](https://github.com/anomalyco/opencode/pull/36333)**  
   状态：OPEN。给 V2 provider 回合输出设上限，避免会话和编排逻辑在大输出下失控，偏底层稳定性修复。

3. **[#36332 [contributor, 2.0] test(core): add CodeMode search fixture catalog](https://github.com/anomalyco/opencode/pull/36332)**  
   状态：OPEN。补充 CodeMode 搜索/工具发现的测试夹具，强化对大规模工具目录的覆盖。

4. **[#36330 [contributor] fix(app): space review navigation groups](https://github.com/anomalyco/opencode/pull/36330)**  
   状态：OPEN。修正 review 导航区间距与折叠行为，属于 UI 细节打磨，但能明显改善审阅体验。

5. **[#36329 [contributor] feat(nix): Enable nix ci in v2 branch](https://github.com/anomalyco/opencode/pull/36329)**  
   状态：OPEN。把 v2 接入 nix CI，提升对 nix 用户的构建与验证覆盖。

6. **[#36324 docs: add toll402 plugin](https://github.com/anomalyco/opencode/pull/36324)**  
   状态：OPEN。向生态页面新增 `toll402-opencode` 插件，扩展社区工具目录。

7. **[#36321 [contributor] refactor(core): combine git discovery queries](https://github.com/anomalyco/opencode/pull/36321)**  
   状态：CLOSED。合并 Git 仓库发现查询，减少 subprocess 调用，并保留无 worktree 场景的兼容性，属于典型性能/健壮性优化。

8. **[#36320 feat(llm): support GPT-5.6 prompt cache new options](https://github.com/anomalyco/opencode/pull/36320)**  
   状态：OPEN。补上 GPT-5.6 prompt cache 新选项，和上面的 Issue 36318 形成闭环。

9. **[#36314 fix(opencode): send Codex-compatible OAuth request identity headers](https://github.com/anomalyco/opencode/pull/36314)**  
   状态：OPEN。修正 OAuth 请求身份头，提升与 Codex 体系的互操作性。

10. **[#36312 [contributor] chore: merge dev into v2](https://github.com/anomalyco/opencode/pull/36312)**  
    状态：CLOSED。把 dev 的历史合入 v2，同时保留兼容与历史修复，是分支同步的重要节点。

---

## 4) 功能需求趋势

1. **V2 TUI 交互统一与可发现性提升**  
   弹窗、子代理视图、fork modal、review 导航等问题集中出现，说明 UI/交互正处在“统一标准”的收敛期。  
   相关链接：[#36302](https://github.com/anomalyco/opencode/issues/36302)、[#36323](https://github.com/anomalyco/opencode/issues/36323)、[#36322](https://github.com/anomalyco/opencode/issues/36322)

2. **Provider / 模型兼容持续升温**  
   Copilot、Kimi、GPT-5.6 都在被集中适配，说明 OpenCode 正从“单一模型可用”转向“多 Provider 一致可用”。  
   相关链接：[#36305](https://github.com/anomalyco/opencode/issues/36305)、[#36316](https://github.com/anomalyco/opencode/issues/36316)、[#36318](https://github.com/anomalyco/opencode/issues/36318)

3. **性能与资源控制是高优先级诉求**  
   重连风暴、CPU wedge、LSP 诊断膨胀、session bloat，都指向“长期运行下的稳定性”。  
   相关链接：[#36285](https://github.com/anomalyco/opencode/issues/36285)、[#36311](https://github.com/anomalyco/opencode/issues/36311)、[#36300](https://github.com/anomalyco/opencode/issues/36300)

4. **Shell/终端集成更贴近真实开发环境**  
   用户希望加载 rc 文件、关闭鼠标追踪、避免 Ctrl-C 冲突，说明 OpenCode 正在被当成“终端里的主工作台”使用。  
   相关链接：[#36308](https://github.com/anomalyco/opencode/issues/36308)、[#36266](https://github.com/anomalyco/opencode/issues/36266)、[#36271](https://github.com/anomalyco/opencode/issues/36271)

5. **多 worktree / 子代理 / 会话恢复等高级工作流需求增强**  
   这类问题反映用户已经把 OpenCode 用到更复杂的工程组织方式里，状态一致性变得越来越关键。  
   相关链接：[#36301](https://github.com/anomalyco/opencode/issues/36301)、[#36289](https://github.com/anomalyco/opencode/issues/36289)、[#36326](https://github.com/anomalyco/opencode/issues/36326)

---

## 5) 开发者关注点

- **V2 迁移期回归较多**：UI 行为、服务重启、工作流状态都在暴露边界问题。  
  参考：[#36302](https://github.com/anomalyco/opencode/issues/36302)、[#36285](https://github.com/anomalyco/opencode/issues/36285)

- **Provider 适配的“长尾差异”正在成为主战场**：不仅要能连上，还要在多步工具调用、缓存策略、身份头、模型列表上保持一致。  
  参考：[#36305](https://github.com/anomalyco/opencode/issues/36305)、[#36316](https://github.com/anomalyco/opencode/issues/36316)、[#36318](https://github.com/anomalyco/opencode/issues/36318)

- **稳定性与资源占用问题被放大**：崩溃、CPU 占满、会话膨胀、LSP 负载过重，都是可感知的“线上痛点”。  
  参考：[#36280](https://github.com/anomalyco/opencode/issues/36280)、[#36311](https://github.com/anomalyco/opencode/issues/36311)、[#36300](https://github.com/anomalyco/opencode/issues/36300)

- **开发者希望工具更像“真实 shell”**：rc 文件、鼠标、复制粘贴、Ctrl-C 行为，都说明终端交互需要更贴合熟悉的本地开发习惯。  
  参考：[#36308](https://github.com/anomalyco/opencode/issues/36308)、[#36266](https://github.com/anomalyco/opencode/issues/36266)、[#36271](https://github.com/anomalyco/opencode/issues/36271)

- **状态与可恢复性预期需要校准**：会话持久化、worktree 跟踪、子代理返回路径这些“状态问题”，会直接影响用户信任。  
  参考：[#36326](https://github.com/anomalyco/opencode/issues/36326)、[#36301](https://github.com/anomalyco/opencode/issues/36301)、[#36322](https://github.com/anomalyco/opencode/issues/36322)

如果你希望，我也可以把这份日报进一步整理成 **“管理层摘要版”** 或 **“研发周会版（更偏行动项）”**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-07-11）
数据源：**badlogic/pi-mono**

## 1. 今日速览
过去 24 小时，Pi 社区的讨论重心主要集中在**模型兼容性、会话压缩稳定性、以及扩展/RPC 能力补齐**三条主线。当天不少高频问题被快速关闭，说明维护响应较积极；同时，围绕新模型、OpenAI/Codex、Bedrock、OpenRouter 的适配需求仍在持续升温。  
另外，社区对**扩展生态的可观测性与控制能力**（usage、attachments、事件流、subagent）提出了更系统的诉求。

## 2. 版本发布
- **无新 Releases**（过去 24 小时内无版本发布）

## 3. 社区热点 Issues
以下挑选 10 个最值得关注的 Issue：

1. **[#6477] Compaction summary requests omit the session ID, breaking compaction on some OpenAI-Codex models**  
   链接：<https://github.com/badlogic/pi-mono/issues/6477>  
   重要性：这是典型的**会话压缩链路断裂**问题，直接影响长对话可持续性。  
   社区反应：2 条评论、2 👍，说明它不是孤例，且影响面较明确。  

2. **[#6484] Compaction fails with gpt-5.6-luna models**  
   链接：<https://github.com/badlogic/pi-mono/issues/6484>  
   重要性：新模型上线后压缩失败，属于**高优先级兼容性回归**。  
   社区反应：1 条评论、3 👍，点赞数相对突出，说明用户痛感较强。  

3. **[#6486] npm uninstall fails with ERESOLVE: peer dependency conflicts**  
   链接：<https://github.com/badlogic/pi-mono/issues/6486>  
   重要性：这是基础 CLI 生命周期问题，影响**安装后卸载/清理**，属于实用性阻塞。  
   社区反应：1 条评论，当前反馈不多，但属于“工具链必须修”的问题。  

4. **[#6485] Preserve unhandled Bedrock ConverseStream stop reasons in error messages**  
   链接：<https://github.com/badlogic/pi-mono/issues/6485>  
   重要性：关系到**错误可解释性**，对排查 Bedrock 流式调用很关键。  
   社区反应：3 条评论，说明开发者对错误语义保留较敏感。  

5. **[#6493] feat(rpc): opaque attachments field, delivered to the input extension event**  
   链接：<https://github.com/badlogic/pi-mono/issues/6493>  
   重要性：这是扩展能力的关键补强，涉及**多模态/附件输入**的传递。  
   社区反应：2 条评论、2 👍，说明社区对 RPC 可扩展输入有真实需求。  

6. **[#6508] Subagent processes don't load provider-registration extensions → "Unknown provider" for dynamic/extension providers**  
   链接：<https://github.com/badlogic/pi-mono/issues/6508>  
   重要性：直接影响**子代理与动态 provider 机制**，会阻断扩展型工作流。  
   社区反应：1 条评论，属于架构层问题，虽反馈不多但影响深。  

7. **[#6511] Windows exe 版运行后会在项目目录下生成无法删除的 nul 文件**  
   链接：<https://github.com/badlogic/pi-mono/issues/6511>  
   重要性：典型 Windows 平台兼容性问题，影响**桌面端可用性和用户体验**。  
   社区反应：1 条评论，问题具体且易复现，适合快速修复。  

8. **[#6509] Extension-reported usage in the footer cost display (ctx.ui.setUsage)**  
   链接：<https://github.com/badlogic/pi-mono/issues/6509>  
   重要性：这是**成本可观测性**需求，尤其适用于子进程/扩展调用 LLM 的场景。  
   社区反应：2 条评论，说明扩展作者对计费归因有明确诉求。  

9. **[#6488] Add first-class Ultra reasoning mode for Codex models**  
   链接：<https://github.com/badlogic/pi-mono/issues/6488>  
   重要性：反映出社区对**新推理档位（ultra）**的适配需求，属于模型能力跟进。  
   社区反应：1 条评论，更多是功能前瞻而非故障修复。  

10. **[#6507] feat: configurable auto-update on new session**  
    链接：<https://github.com/badlogic/pi-mono/issues/6507>  
    重要性：体现出社区对**自动更新、降低维护成本**的需求。  
    社区反应：0 评论，属于“有需求但尚未充分讨论”的功能提案。  

## 4. 重要 PR 进展
> 注：过去 24 小时内共更新 **9 条 PR**，以下全部列出。

1. **[#6514] fix: erase entire turn on abort/error, not just the assistant message**  
   链接：<https://github.com/badlogic/pi-mono/pull/6514>  
   作用：修复中止/错误时只删助手消息、导致对话转写异常的问题，保障消息序列一致性。  

2. **[#6506] feat: add configurable auto-update on new session**  
   链接：<https://github.com/badlogic/pi-mono/pull/6506>  
   作用：新增 `autoUpdateOnNewSession`，支持在新会话启动时自动执行更新。  

3. **[#6505] feat(coding-agent): add goal extension example for multi-turn autonomous task execution**  
   链接：<https://github.com/badlogic/pi-mono/pull/6505>  
   作用：补充 `/goal` 扩展示例，推动多轮自主任务执行的参考实现。  

4. **[#6503] bump bun to 1.3.14**  
   链接：<https://github.com/badlogic/pi-mono/pull/6503>  
   作用：升级 Bun 版本，支持更灵活的 HTTP idle timeout 配置，关联网络长连接问题。  

5. **[#6501] fix(extensions,theme): support embedded library hosts**  
   链接：<https://github.com/badlogic/pi-mono/pull/6501>  
   作用：修复嵌入式 library host 下的 theme 初始化与扩展运行时复用问题。  

6. **[#6496] fix(ai): support OpenRouter session affinity**  
   链接：<https://github.com/badlogic/pi-mono/pull/6496>  
   作用：为 OpenRouter 补齐 session affinity/粘性会话支持，提升缓存与路由稳定性。  

7. **[#6490] add xhigh and max to all fable-5 providers**  
   链接：<https://github.com/badlogic/pi-mono/pull/6490>  
   作用：扩展 fable-5 系列 provider 的思考档位支持，补足模型能力覆盖。  

8. **[#6489] feat(ai): add ultra thinking level**  
   链接：<https://github.com/badlogic/pi-mono/pull/6489>  
   作用：新增 `ultra` 推理等级，覆盖类型、CLI、SDK/RPC、主题与会话状态。  

9. **[#6481] fix openrouter models: use context length from top provider**  
   链接：<https://github.com/badlogic/pi-mono/pull/6481>  
   作用：修正 OpenRouter 模型上下文长度取值逻辑，避免能力判断偏差。  

## 5. 功能需求趋势
从本日 Issues 里可以看出，社区最关注的功能方向主要有：

- **模型与 provider 兼容性**：OpenAI Codex、OpenRouter、Bedrock、Cloudflare、GLM 等适配问题频繁出现。  
- **会话压缩/长对话连续性**：compaction、checkpoint、session ID、previous_response_id 相关问题密集。  
- **扩展与 RPC 能力完善**：attachments、usage 统计、input 事件、remove subtree、多代理切换等需求明显。  
- **推理档位与模型能力同步**：`ultra`、`xhigh`、`max` 等能力暴露，说明用户希望快速跟进新模型特性。  
- **平台兼容与稳定性**：Windows、TUI、subagent、动态 provider 加载等问题说明跨平台和运行时健壮性仍是重点。  
- **自动化与工作流效率**：自动更新、goal 扩展、btw slash command 等更偏向“提升日常使用效率”的需求在增长。  

## 6. 开发者关注点
综合今天的反馈，开发者最需要关注的痛点有：

- **API 语义不一致**：同一功能在不同 provider 上走不同 endpoint，容易导致模型不可用或错误信息失真。  
- **压缩链路脆弱**：会话压缩在新模型上频繁暴露边界问题，说明该链路还需要更强的兼容测试。  
- **扩展体系的可观测性不足**：usage、输入事件、附件传递、子代理事件流等都在补能力。  
- **运行时加载一致性问题**：主进程与 subagent、嵌入式 host 与普通 host 之间存在行为差异。  
- **Windows/TUI 细节问题**：如 `nul` 文件、滚动回顶等，影响桌面端体验和口碑。  
- **长会话性能与响应**：虽然本日报数据里性能类问题不算最多，但历史反馈显示它是持续存在的关注点。  

如需，我也可以把这份日报进一步整理成：  
1) **适合发群的精简版**，或 2) **带“风险/优先级”标注的管理层版**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报｜2026-07-11

## 1. 今日速览
今天的社区动态明显聚焦在三条主线：**Web Shell 交互体验**、**会话/子代理稳定性**、以及 **模型与协议层异常修复**。  
同时，发布侧围绕 **v0.19.9** 与夜间版继续推进，重点在于修复重复子代理循环、会话历史断链、以及发布/容器环境中的阻塞问题。  
整体来看，项目正在从“功能扩展”转向“可用性和稳定性打磨”。

---

## 2. 版本发布

### v0.19.9
- 发布页：<https://github.com/QwenLM/qwen-code/releases/tag/v0.19.9>
- 重点更新：
  - 修复**重复的 subagent tool-call 循环**，减少代理反复调用导致的卡死或噪音。
  - 修复 **session 历史链断裂检测**，避免历史被静默截断后继续运行，引入更明确的错误识别。

### v0.19.8-nightly.20260711.0ef3a76bd
- 发布页：<https://github.com/QwenLM/qwen-code/releases/tag/v0.19.8-nightly.20260711.0ef3a76bd>
- 重点更新：
  - `core`：当模型调用 `enter_plan_mode` 时，**保持 YOLO 模式**不被误切换。
  - `cli`：**forward ask_user**，让交互式询问链路向下游透传。

---

## 3. 社区热点 Issues

### 1) API 报错：tool_use 缺少对应 tool_result
- Issue：<https://github.com/QwenLM/qwen-code/issues/6654>
- 关注点：这是典型的**协议/消息栈一致性问题**，直接影响工具调用链路的可用性。
- 社区反应：当前有 **4 条评论**，是过去 24 小时里最受关注的 bug 之一，说明该问题影响面较广。

### 2) MCP HTTP transport 在 401 后离线，OAuth 恢复未触发
- Issue：<https://github.com/QwenLM/qwen-code/issues/6639>
- 关注点：涉及 **MCP + OAuth 自动恢复**，会直接影响外部服务接入。
- 社区反应：**3 条评论**，问题清晰且贴近真实集成场景，优先级较高。

### 3) Web Shell 需要工作区选择器按钮
- Issue：<https://github.com/QwenLM/qwen-code/issues/6700>
- 关注点：这是典型的 **IDE/工作区入口增强**，提升多工作区切换效率。
- 社区反应：**2 条评论**，说明 Web Shell 的工作区管理能力正在成为核心诉求。

### 4) Web Shell Composer 工具栏需要重设计
- Issue：<https://github.com/QwenLM/qwen-code/issues/6699>
- 关注点：用户希望在输入区附近直接看到 **workspace / execution context / git branch**，明显是在向“桌面 IDE 化”靠拢。
- 社区反应：**2 条评论**，与上面的工作区选择器需求形成一致趋势。

### 5) 断点会话加载后自动续跑
- Issue：<https://github.com/QwenLM/qwen-code/issues/6695>
- 关注点：核心是 **session 恢复后的自动续接**，尤其适用于容器/机器重启后的场景。
- 社区反应：**2 条评论**，表明“恢复能力”是会话产品化的关键指标。

### 6) DingTalk 回复中抑制嵌套 subagent 输出
- Issue：<https://github.com/QwenLM/qwen-code/issues/6694>
- 关注点：涉及 **敏感信息暴露** 与 **渠道输出隔离**，属于安全与体验双重问题。
- 社区反应：已 **CLOSED**，有 **2 条评论**，说明维护方响应较快。

### 7) 允许 /goal 条件超过 4000 字符
- Issue：<https://github.com/QwenLM/qwen-code/issues/6663>
- 关注点：用户希望提交更长的任务规格和验收条件，体现出 **长文本任务编排** 需求。
- 社区反应：已 **CLOSED**，有 **2 条评论**，说明该类“提示词/目标描述上限”是实际痛点。

### 8) 修复 DingTalk Stream 陈旧连接恢复
- Issue：<https://github.com/QwenLM/qwen-code/issues/6660>
- 关注点：属于 **渠道稳定性** 问题，影响长连接可靠性。
- 社区反应：已 **CLOSED**，有 **2 条评论**，表明此类连接问题比较常见。

### 9) 非主工作区的会话组织写入能力
- Issue：<https://github.com/QwenLM/qwen-code/issues/6646>
- 关注点：当前读侧已支持，写侧仍受主工作区约束，是 **多工作区会话管理** 的关键补齐项。
- 社区反应：**2 条评论**，说明会话组织已从“可查看”走向“可编辑”。

### 10) subagent 启动时遇到 `${0}` 直接崩溃
- Issue：<https://github.com/QwenLM/qwen-code/issues/6671>
- 关注点：属于 **模板解析健壮性** 问题，影响自定义 agent 配置的稳定启动。
- 社区反应：虽然仅 **1 条评论**，但属于核心崩溃类 bug，优先级不低。

---

## 4. 重要 PR 进展

### 1) 修复发布包体积阈值，解除 v0.19.9 阻塞
- PR：<https://github.com/QwenLM/qwen-code/pull/6691>
- 内容：将预打包 npm 包大小上限提升到 **96 MB**，解决 Docker sandbox 下的 release 构建失败。

### 2) 解决 v0.19.9 的 Docker 沙箱构建失败
- PR：<https://github.com/QwenLM/qwen-code/pull/6686>
- 内容：修复 Integration Tests (Docker) 发布任务中的构建失败，属于 **CI/CD 稳定性修复**。

### 3) 进一步抬高发布包预算到 85 MiB
- PR：<https://github.com/QwenLM/qwen-code/pull/6688>
- 内容：调整 npm 包解包大小安全预算，并补了边界回归测试，属于发布链路保险修复。

### 4) 为 protocol tag 重试测试配置 Docker 网络
- PR：<https://github.com/QwenLM/qwen-code/pull/6692>
- 内容：解决 Docker 沙箱中 `127.0.0.1` 绑定失效问题，避免交互测试在容器内误连本机环回地址。

### 5) suppress nested subagent output
- PR：<https://github.com/QwenLM/qwen-code/pull/6696>
- 内容：阻止 channel 层采集嵌套 subagent 的中间输出，避免把内部推理过程直接暴露给外部回复。

### 6) WebShell 支持恢复已停止会话
- PR：<https://github.com/QwenLM/qwen-code/pull/6697>
- 内容：WebShell 读取恢复态后，若发现有待续接 turn，则尝试通过 continuation endpoint 自动恢复。

### 7) 为 agents 工作流加入“自检”步骤
- PR：<https://github.com/QwenLM/qwen-code/pull/6685>
- 内容：在完成前加入 bounded self-audit，强调在交付前阅读 diff 并逐项核对变更。

### 8) 让 `/goal` 评估生命周期安全
- PR：<https://github.com/QwenLM/qwen-code/pull/6681>
- 内容：评估会等待后台 agent / shell / workflow 结束，避免在活动仍在进行时误判结果。

### 9) 恢复 daemon sessions 跨重启能力
- PR：<https://github.com/QwenLM/qwen-code/pull/6680>
- 内容：让 channel conversation 在 daemon/worker 重启后保持可恢复，增强长会话韧性。

### 10) 记录并查询 sub-session 的 parentSessionId
- PR：<https://github.com/QwenLM/qwen-code/pull/6676>
- 内容：为子会话补充父会话关系，同时移除 scheduled-task 的 isolated 模式，简化会话模型。

---

## 5. 功能需求趋势

从过去 24 小时的 Issues 看，社区关注点主要集中在以下方向：

1. **Web Shell / 类 IDE 交互增强**  
   - 工作区选择、执行上下文、Git 分支展示、工具栏重构、输入草稿保存等需求集中爆发。  
   - 代表 Issue：<https://github.com/QwenLM/qwen-code/issues/6700>、<https://github.com/QwenLM/qwen-code/issues/6699>、<https://github.com/QwenLM/qwen-code/issues/6669>、<https://github.com/QwenLM/qwen-code/issues/6702>

2. **会话恢复与多工作区会话管理**  
   - 用户希望在重启、断线、切换工作区后能自动恢复任务上下文。  
   - 代表 Issue：<https://github.com/QwenLM/qwen-code/issues/6695>、<https://github.com/QwenLM/qwen-code/issues/6646>

3. **MCP / OAuth / 渠道连接稳定性**  
   - 包括 HTTP transport 401 恢复、DingTalk 长连接、以及通道输出隔离。  
   - 代表 Issue：<https://github.com/QwenLM/qwen-code/issues/6639>、<https://github.com/QwenLM/qwen-code/issues/6660>、<https://github.com/QwenLM/qwen-code/issues/6694>

4. **模型输出一致性与协议健壮性**  
   - tool_result 配对、空响应、`<think>` 标签泄漏、子代理循环等，都是模型接入层的高频痛点。  
   - 代表 Issue：<https://github.com/QwenLM/qwen-code/issues/6654>、<https://github.com/QwenLM/qwen-code/issues/6670>、<https://github.com/QwenLM/qwen-code/issues/6666>

5. **长任务编排与工具交互**  
   - `/goal` 长文本、ask_user 交互、subagent 行为控制，说明用户在使用更复杂的代理工作流。  
   - 代表 Issue：<https://github.com/QwenLM/qwen-code/issues/6663>、<https://github.com/QwenLM/qwen-code/issues/6647>

---

## 6. 开发者关注点

今天开发者反馈里最突出的痛点有四类：

- **协议层完整性**：tool_use / tool_result 配对、空流、断链等问题，说明消息协议和流式解析仍是高风险区。  
  链接：<https://github.com/QwenLM/qwen-code/issues/6654>、<https://github.com/QwenLM/qwen-code/issues/6670>

- **会话连续性**：重启后恢复、历史链断裂、子会话父子关系，这些都在指向“长期运行会话”的可靠性。  
  链接：<https://github.com/QwenLM/qwen-code/issues/6695>、<https://github.com/QwenLM/qwen-code/issues/6646>、<https://github.com/QwenLM/qwen-code/issues/6671>

- **Web Shell 产品化**：用户明显希望 Web Shell 更像成熟 IDE，具备 workspace、branch、context 的快速入口。  
  链接：<https://github.com/QwenLM/qwen-code/issues/6700>、<https://github.com/QwenLM/qwen-code/issues/6699>、<https://github.com/QwenLM/qwen-code/issues/6702>

- **发布与测试链路稳态**：v0.19.9 的发布失败、Docker sandbox 问题、包体积阈值调整，说明交付链路仍需持续加固。  
  链接：<https://github.com/QwenLM/qwen-code/issues/6690>、<https://github.com/QwenLM/qwen-code/pull/6691>、<https://github.com/QwenLM/qwen-code/pull/6686>

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合公众号/周报风格的版本**，或  
2. **适合内部 Slack/飞书群同步的短版**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

以下是基于 `github.com/Hmbown/DeepSeek-TUI` 的 **2026-07-11 DeepSeek TUI 社区动态日报**。

---

## 1) 今日速览

今天社区动态高度集中在 **TUI 可靠性与 Provider 语义修正**：包括离线计费需要按 provider 识别、会话恢复时保留自定义 provider 身份、以及空 header 被误判为已配置等问题。  
与此同时，PR 区域以 **依赖升级、TUI/工作流修复、发布文档对齐** 为主，整体呈现“稳态修补 + 基础能力加固”的节奏。  
**今日没有新 Release。**

---

## 2) 版本发布

**无新版本发布。**

---

## 3) 社区热点 Issues

> 今日仅更新 3 条 Issue，全部为高优先级 bug/可靠性问题，且都带有明显的 TUI / provider / release-blocker 语义。

### 1. [#4335] 离线 scorecard 计费需要感知 provider
- **标签**：`bug, tui, subagents, reliability, v0.8.69`
- **重要性**：离线统计当前只看 model ID 和 usage，不看有效 provider，容易把“不该按 API 定价”的 turn 误算成 API 价格，直接影响成本归因与报表可信度。
- **社区反应**：当前 **0 评论、0 👍**，说明问题刚被提出，尚未引发讨论，但从影响面看属于计费口径级别的关键修复。
- **链接**：[`#4335`](https://github.com/Hmbown/CodeWhale/issues/4335)

### 2. [#4334] 会话恢复需保留自定义 provider 的精确身份
- **标签**：`bug, tui, subagents, reliability, v0.8.69`
- **重要性**：自定义 provider（如 `lm-studio`、`my-openai-proxy`）在保存/恢复后可能退化为泛化的 `custom`，会导致恢复后无法正确解析原 provider key，影响会话可恢复性与路由一致性。
- **社区反应**：当前 **0 评论、0 👍**，但问题本质属于“恢复后状态丢失”，通常会直接影响用户对 TUI 会话稳定性的信任。
- **链接**：[`#4334`](https://github.com/Hmbown/CodeWhale/issues/4334)

### 3. [#4333] 空 provider headers 不应被视为已配置
- **标签**：`bug, release-blocker, tui, reliability, v0.8.68`
- **重要性**：`[providers.anthropic.http_headers]` 这类空表配置会让 TUI 误判 provider 已配置，属于配置状态判断错误，可能导致用户在“已配置/未配置”视图中看到错误信息。
- **社区反应**：当前 **0 评论、0 👍**，但由于带有 `release-blocker` 标签，说明它对发版阻塞性极强。
- **链接**：[`#4333`](https://github.com/Hmbown/CodeWhale/issues/4333)

---

## 4) 重要 PR 进展

### 1. [#4343] chore(deps): bump `colored` 3.0.0 → 3.1.1
- **类型**：依赖升级
- **价值**：更新终端颜色输出库，通常用于兼容性和细节修复。
- **链接**：[`#4343`](https://github.com/Hmbown/CodeWhale/pull/4343)

### 2. [#4342] chore(deps): bump `rmcp` 1.8.0 → 2.2.0
- **类型**：依赖升级
- **价值**：`rmcp` 是 MCP 相关 Rust SDK，升级幅度较大，通常意味着协议能力、兼容性或修复收益。
- **链接**：[`#4342`](https://github.com/Hmbown/CodeWhale/pull/4342)

### 3. [#4341] chore(deps): bump `lru` 0.18.0 → 0.18.1
- **类型**：依赖升级
- **价值**：缓存组件小版本修复，偏向稳定性维护。
- **链接**：[`#4341`](https://github.com/Hmbown/CodeWhale/pull/4341)

### 4. [#4340] chore(deps): bump `ignore` 0.4.25 → 0.4.28
- **类型**：依赖升级
- **价值**：文件忽略/扫描规则相关库更新，可能影响工作区遍历、文件过滤与性能。
- **链接**：[`#4340`](https://github.com/Hmbown/CodeWhale/pull/4340)

### 5. [#4339] chore(deps): bump `jsonschema` 0.46.4 → 0.47.0
- **类型**：依赖升级
- **价值**：配置与 schema 校验链路相关，通常会影响配置兼容性和校验准确性。
- **链接**：[`#4339`](https://github.com/Hmbown/CodeWhale/pull/4339)

### 6. [#4338] chore(deps): bump `actions/stale` 10.3.0 → 10.4.0
- **类型**：GitHub Actions 依赖升级
- **价值**：维护自动化 stale 管理流程，偏向仓库治理与自动化健康度。
- **链接**：[`#4338`](https://github.com/Hmbown/CodeWhale/pull/4338)

### 7. [#4337] fix(release): integrate v0.8.68 TUI and Android QA
- **类型**：发布修复 / QA 集成
- **价值**：补齐 v0.8.68 的 TUI 终端状态与 Android/Termux 相关验证，说明发版质量控制在收口。
- **链接**：[`#4337`](https://github.com/Hmbown/CodeWhale/pull/4337)

### 8. [#4336] feat(workflow): dispatch durable lanes without root model
- **类型**：功能增强
- **价值**：让 workflow 直接通过 host-owned 工具执行，不依赖 operator-model turn，并保持 profile/provider/model、approval、sandbox、network、MCP 等优先级一致性。
- **链接**：[`#4336`](https://github.com/Hmbown/CodeWhale/pull/4336)

### 9. [#4332] fix: make v0.8.68 TUI state and routing truthful
- **类型**：高优先级修复
- **价值**：修正 provider 配置判断、状态与路由真实度问题，是典型的 TUI 可信度修复批次。
- **链接**：[`#4332`](https://github.com/Hmbown/CodeWhale/pull/4332)

### 10. [#4331] docs(release): align v0.8.68 mode FAQ and workflow commands
- **类型**：文档修订
- **价值**：对齐 FAQ 与真实的 workflow 命令，减少用户按旧文档操作造成的困惑。
- **链接**：[`#4331`](https://github.com/Hmbown/CodeWhale/pull/4331)

---

## 5) 功能需求趋势

结合今日 Issues，可提炼出社区最关注的方向主要有：

1. **Provider 语义与状态一致性**
   - 重点在于自定义 provider 身份保留、配置判定准确、路由信息不丢失。
   - 说明用户越来越依赖多 provider / 自定义代理场景。

2. **计费与成本归因准确性**
   - 离线 scorecard 需要 provider-aware，避免模型同名带来的价格误算。
   - 表明社区开始关注“可审计的成本统计”。

3. **TUI 状态真实性与可恢复性**
   - 会话恢复、配置视图、路由信息都需要“所见即所得”。
   - 这类问题直接影响 TUI 作为主交互入口的可信度。

4. **可靠性优先于新功能**
   - 今日全部 Issue 都偏向修 bug / 修语义 / 修状态，而不是新增交互。
   - 当前阶段明显以稳定性和发布阻断修复为主线。

---

## 6) 开发者关注点

从今天的反馈里，开发者最需要关注的痛点是：

- **自定义 Provider 不可丢身份**
  - `custom` 过于泛化，恢复后无法精确定位 provider key，会破坏后续路由与配置读取。

- **空配置不应被误判为已配置**
  - 任何“空表即配置”的误判都会污染 TUI 的状态展示，尤其在 release-blocker 场景下风险较高。

- **离线计费必须和实际 provider 绑定**
  - 否则会让成本分析失真，影响 subagents / 运营面板的可信度。

- **文档与真实命令必须同步**
  - 从 PR #4331 可以看出，workflow 与 FAQ 的不一致仍是用户常见摩擦点。

---

如你希望，我也可以把这份日报进一步整理成 **“适合直接发到群里的精简版”** 或 **“带趋势图表口径的周报模板”**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*