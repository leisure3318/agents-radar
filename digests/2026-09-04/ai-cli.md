# AI CLI 工具社区动态日报 2026-09-04

> 生成时间: 2026-09-04 03:26 UTC | 覆盖工具: 9 个

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

下面是一份基于你提供的 8 个 AI CLI 工具社区日报整理的**横向对比分析报告**，面向技术决策者与开发者，尽量保持简洁、专业、可落地。

---

# AI CLI 工具生态横向对比分析报告（2026-09-04）

## 1) 生态全景

当前 AI CLI 工具生态已经从“能对话、能跑任务”进入到“**可控、可恢复、可审计、可跨端协作**”的阶段。  
从社区反馈看，行业关注点明显从模型能力本身，转向了权限流转、会话恢复、工具执行可靠性、成本可观测性和跨平台一致性。  
这说明 AI CLI 正在从实验性工具，演进为开发者生产环境中的基础设施。  
同时，各项目都在加速补齐协议层、沙箱层和 UI 层能力，竞争焦点开始落在“工程可信度”而不是“单点能力”。  

---

## 2) 各工具活跃度对比

> 说明：下表中的 Issues / PR 数量均按你提供的**当日重点更新条目**统计，不代表仓库全量 issue/PR 总量。

| 工具 | 今日重点 Issues 数 | 今日重点 PR 数 | Release 情况 | 活跃度简评 |
|---|---:|---:|---|---|
| Claude Code | 10 | 1 | 1 个正式 Release（v2.1.260） | 问题密集，偏稳定性与权限治理 |
| OpenAI Codex | 10 | 10 | 2 个正式 Release + 多个 alpha 标签 | 迭代最活跃之一，修复与架构并行 |
| Gemini CLI | 10 | 10 | 1 个 nightly Release | 安全/恢复链路推进快，工程修补密集 |
| GitHub Copilot CLI | 10 | 0 | 2 个 Release | 讨论活跃，PR 窗口内无更新 |
| Kimi Code CLI | 1 | 0 | 无新 Release | 体量最小，焦点非常集中 |
| OpenCode | 10 | 10 | 无新 Release | 生态/模型/插件/桌面端全面推进 |
| Pi | 10 | 10 | 无新 Release | 多 provider、长会话、性能修复密集 |
| Qwen Code | 10 | 10 | 1 个正式 Release（v0.23.0） | CI、安全、OpenTUI、Token Plan 并进 |
| DeepSeek TUI | 3 | 4 | 无新 Release | 议题少但方向明确，偏协议集成 |

---

## 3) 共同关注的功能方向

多个工具社区都在反复关注以下几类需求：

### A. 权限与安全边界更严格
- **涉及工具**：Claude Code、Gemini CLI、OpenCode、Qwen Code、Copilot CLI
- **具体诉求**：
  - 命令参数级权限校验，而不是只看命令名
  - 自动模式/自动接受权限不能误放行或误拦截
  - sandbox、MCP、OAuth、credentials 不能出现绕过
- **信号**：AI CLI 已从“默认宽松”转向“默认安全”。

### B. 会话恢复与长上下文稳定性
- **涉及工具**：Gemini CLI、Copilot CLI、Codex、Pi、Claude Code、OpenCode、Qwen Code
- **具体诉求**：
  - `/resume`、checkpoint、session history、task restore 的可靠性
  - 长会话不膨胀、不丢状态、不崩溃
  - 任务重开后历史投影完整
- **信号**：长会话正成为 CLI 的核心使用方式，而不是附加能力。

### C. 模型一致性与路由可预测性
- **涉及工具**：Claude Code、Codex、OpenCode、Pi、Qwen Code
- **具体诉求**：
  - 子代理/sub-agent 不能静默切模型
  - `service_tier` / model picker / fallback 行为一致
  - 新模型接入后要能正确发现、选择、回退
- **信号**：用户开始要求“同样输入得到可重复行为”。

### D. 工具执行可靠性与并发正确性
- **涉及工具**：Claude Code、Gemini CLI、OpenCode、Pi、Qwen Code、Copilot CLI
- **具体诉求**：
  - Bash / LSP / MCP / remote control / stream / event stream 不能串槽、卡死、静默失败
  - 并发调用和异步结果路由必须准确
- **信号**：AI CLI 正在变成“编排引擎”，而不是单次问答工具。

### E. TUI / Desktop / Web / 跨平台体验
- **涉及工具**：Codex、Copilot CLI、OpenCode、Qwen Code、Claude Code、Pi
- **具体诉求**：
  - 输入/渲染不同步、按钮/快捷键不一致、UI 元素丢失、Windows/macOS 兼容问题
  - 会话状态在桌面端、浏览器、终端之间保持一致
- **信号**：CLI 不再只是纯命令行，而是在向“多端交互工作台”演化。

### F. 成本、配额与可观测性
- **涉及工具**：Claude Code、Codex、Pi、Qwen Code、Copilot CLI
- **具体诉求**：
  - prompt cache / quota / billing / token 消耗可视化
  - 异常花费能及时熔断
- **信号**：成本治理已经是生产可用性的组成部分。

---

## 4) 差异化定位分析

### Claude Code
- **功能侧重**：权限流转、MCP、桌面/浏览器集成、模型一致性、成本诊断
- **目标用户**：重度 agentic workflow 用户、企业开发团队、需要跨端协作的人群
- **技术路线**：强调“可控执行链路”和“跨端一致性”，正在补齐可解释性与稳定性
- **定位判断**：偏“高自治 agent 平台”，对工程可控性要求最高

### OpenAI Codex
- **功能侧重**：桌面端性能、会话恢复、worktree、多代理、配额/模型提示
- **目标用户**：IDE/桌面端高频开发者、多会话工作流用户
- **技术路线**：围绕桌面体验、TUI 稳定性和多代理执行做持续打磨
- **定位判断**：更像“面向生产开发者的多会话编排器”

### Gemini CLI
- **功能侧重**：安全边界、checkpoint/resume、路径处理、策略一致性
- **目标用户**：企业环境、受限网络/受限权限环境、重视安全治理的团队
- **技术路线**：偏“安全优先 + 恢复优先”，对协议和文件边界很敏感
- **定位判断**：是最明显的“安全与恢复工程化”路线之一

### GitHub Copilot CLI
- **功能侧重**：长会话、恢复速度、插件/skills 治理、沙箱隔离、跨平台交互
- **目标用户**：GitHub 生态用户、长流程任务用户、企业治理场景
- **技术路线**：强调会话继续性与组织级可控性
- **定位判断**：更偏“企业级开发工作流终端”

### Kimi Code CLI
- **功能侧重**：认证边界与 custom provider 兼容性
- **目标用户**：使用第三方/local provider 的开发者、需要灵活接入的人群
- **技术路线**：当前问题更像“兼容性回归修复”
- **定位判断**：生态体量较小，但对 provider 开放性的要求很明确

### OpenCode
- **功能侧重**：模型接入、权限控制、TUI/桌面体验、插件生态、LSP/多项目支持
- **目标用户**：重度 CLI 用户、monorepo 开发者、插件扩展需求强的用户
- **技术路线**：平台化最明显，强调生态扩展与工作流可塑性
- **定位判断**：是“平台型 CLI”代表，覆盖面广、变化快

### Pi
- **功能侧重**：多 provider 兼容、会话上下文稳定、TUI 体验、性能修复
- **目标用户**：多模型混用用户、长会话用户、重视工具层数据正确性的人群
- **技术路线**：聚焦底层数据与协议兼容，强调“不要默默损坏数据”
- **定位判断**：偏“协议/数据稳健性优先”的多 provider 工具

### Qwen Code
- **功能侧重**：CI 稳定性、OpenTUI、daemon/cache、一体化安全、Token Plan 与语音
- **目标用户**：依赖 Web Shell / VS Code / 终端混合工作流的开发者
- **技术路线**：强工程化，重视测试、缓存、权限和新模型接入
- **定位判断**：属于“持续打磨型平台”，兼顾新能力和基础稳定性

### DeepSeek TUI
- **功能侧重**：ACP 协议补齐、shell/job 归因、provider 兼容、reasoning 配置
- **目标用户**：外部客户端集成方、协议驱动型用户
- **技术路线**：更偏协议接口与 TUI 命令形状完善
- **定位判断**：规模较小，但在“可被外部集成”方向上很明确

---

## 5) 社区热度与成熟度

### 社区热度最高、迭代最快
- **OpenAI Codex**
- **Gemini CLI**
- **OpenCode**
- **Qwen Code**
- **Pi**

这些项目共同特征是：**Issue 与 PR 同时活跃，且修复颗粒度细**。  
其中 Codex、Gemini、Qwen 更像高频工程迭代；OpenCode、Pi 则体现出较强的生态扩展和协议兼容诉求。

### 社区热度高，但更偏“问题驱动”
- **Claude Code**
- **GitHub Copilot CLI**

这两者的社区反馈都很集中在“核心链路可用性”上：权限、恢复、跨端一致性、会话连续性。  
说明它们已经进入更成熟阶段，用户对稳定性的要求高于新功能期待。

### 体量较小但方向清晰
- **Kimi Code CLI**
- **DeepSeek TUI**

这两个项目的公共反馈量较少，但问题很明确：  
Kimi 聚焦认证兼容性，DeepSeek 聚焦 ACP 集成与会话配置。  
这类项目当前更像是“定向补课”，而不是广谱扩张。

### 成熟度判断
- **更成熟**：Claude Code、GitHub Copilot CLI、Gemini CLI  
  - 原因：问题集中在稳定性、权限、恢复和安全边界，说明产品已进入“生产化检验”阶段。
- **快速迭代中**：OpenAI Codex、OpenCode、Qwen Code、Pi  
  - 原因：PR 更新密集，功能覆盖广，边修边扩展。
- **早期/聚焦型**：Kimi Code CLI、DeepSeek TUI  
  - 原因：反馈量少但问题集中，说明还在打基础能力和兼容边界。

---

## 6) 值得关注的趋势信号

### 1. AI CLI 正在“安全化”
权限模型、MCP/OAuth、sandbox、路径边界、credentials 泄露等问题被反复讨论。  
这说明开发者已经不接受“默认全放开”的 agent 行为，安全控制正从附加项变成底层要求。

### 2. 长会话和恢复能力成为主战场
resume、checkpoint、历史投影、session list/load、task restore 的反馈非常密集。  
未来谁能把“断线后继续、长跑不中断、历史不丢失”做扎实，谁就更容易进入生产环境。

### 3. 模型切换不再是“可选项”，而是“可预测性问题”
社区越来越关心 sub-agent 是否擅自切模型、fallback 是否一致、不同入口的 model 选择是否统一。  
这意味着模型路由已经从产品能力，升级成工程可测试项。

### 4. CLI 正在桌面化、平台化
很多问题不再是纯 CLI 问题，而是桌面端、Web、浏览器扩展、VS Code、WSL、macOS/Windows 的一致性问题。  
这对开发者的启示是：AI CLI 的竞争点已经进入“跨端工作流完整性”。

### 5. 观测性与成本治理变得刚需
prompt cache、quota、billing、usage、failed feedback、retry 风险都在被讨论。  
对团队来说，AI CLI 不只是“会不会做事”，还要回答“花了多少、为什么花、是否可中断”。

### 6. 插件/skills/协议生态会继续升温
Copilot CLI、OpenCode、DeepSeek TUI、Claude Code 都在补生态接口和协议兼容。  
这表明下一阶段竞争不是单一模型能力，而是**谁能更好地承载第三方扩展和外部集成**。

---

如果你愿意，我可以进一步把这份报告压缩成两种版本之一：  
1. **适合高层汇报的一页纸摘要版**  
2. **适合开发团队讨论的“结论 + 建议”版**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下是一份基于你提供的数据整理的 **Claude Code Skills 社区热点报告**（数据截止 2026-09-04）。

---

## 1) 热门 Skills 排行
> 说明：你给的 PR 列表未显示真实评论数，因此这里按 **议题热度、问题影响面、更新活跃度、与高热 Issue 的关联度** 做综合排序。

### 1. `skill-creator`：评测与生成流程修复
- **PR**：[#1298](https://github.com/anthropics/skills/pull/1298)
- **功能**：修复 `run_eval.py` 的召回率恒为 0% 问题，顺带影响 `run_loop.py`、`improve_description.py`，并处理 Windows 流读取、触发检测、并行 worker 等稳定性问题。
- **社区讨论热点**：  
  - 评测结果失真，导致 Skill 优化流程“拿噪声当信号”
  - Windows 兼容性长期存在
  - 直接影响 skill-creator 的可用性与可信度
- **状态**：Open

### 2. `claude-api`：模型生命周期更新与上下文膨胀问题
- **PR**：[#1607](https://github.com/anthropics/skills/pull/1607)
- **功能**：更新 `claude-api` skill，标记 4 个已退役模型 ID。
- **社区讨论热点**：  
  - 模型列表过期会导致错误调用
  - 该 Skill 还引发了明显的上下文占用问题（见 Issue #1487）
- **状态**：Open

### 3. `pdf` / `docx` 文档技能修复：跨平台与文档完整性
- **PR**：[#538](https://github.com/anthropics/skills/pull/538)  
  **PR**：[#541](https://github.com/anthropics/skills/pull/541)
- **功能**：  
  - `pdf`：修复 SKILL.md 中大小写敏感的文件引用  
  - `docx`：修复跟踪修订与书签 ID 冲突导致的文档损坏
- **社区讨论热点**：  
  - 文档生成“能用”不够，必须“可移植、可打开、不可损坏”
  - 典型的跨平台/OOXML 细节 bug
- **状态**：Open

### 4. `skill-creator`：YAML/frontmatter 解析可靠性
- **PR**：[#539](https://github.com/anthropics/skills/pull/539)
- **功能**：在解析前检测未加引号的 `description` 字段，避免 YAML 特殊字符导致静默失败。
- **社区讨论热点**：  
  - Skill 元数据是入口层，任何解析失败都会让 Skill “看不见”
  - 强调前置校验、静默失败治理
- **状态**：Open

### 5. `mcp-builder` / 评测链路稳定性修复
- **PR**：[#1602](https://github.com/anthropics/skills/pull/1602)
- **功能**：修复评测序列化、benchmark 指标、编码和脚本稳定性问题，覆盖多个工具链环节。
- **社区讨论热点**：  
  - 技能评测链路不稳定，直接影响 Skill 质量判断
  - 与 `skill-creator` 的“优化闭环”高度相关
- **状态**：Open

### 6. `testing-patterns`：测试方法论 Skill
- **PR**：[#723](https://github.com/anthropics/skills/pull/723)
- **功能**：覆盖单测、React 组件测试、测试金字塔/Testing Trophy、边界条件等。
- **社区讨论热点**：  
  - 社区希望 Claude 不只是“写代码”，还要“写可维护测试”
  - 说明测试生成已成为刚需方向
- **状态**：Open

### 7. `self-audit`：输出自检与四维质量门
- **PR**：[#1367](https://github.com/anthropics/skills/pull/1367)
- **功能**：在交付前进行机械性文件校验 + 四维推理审计。
- **社区讨论热点**：  
  - “AI 输出可信度”成为高频需求
  - 与代码审查、交付前验证、幻觉抑制强相关
- **状态**：Open

### 8. `servicenow`：企业平台垂直 Skill
- **PR**：[#568](https://github.com/anthropics/skills/pull/568)
- **功能**：覆盖 ServiceNow 的脚本、架构、安全、ITAM/SAM、FSM、SPM、CSDM、IntegrationHub 等。
- **社区讨论热点**：  
  - 企业用户希望 Claude 深度理解行业平台，而不是泛化回答
  - 代表“垂直场景化 Skills”需求增强
- **状态**：Open

---

## 2) 社区需求趋势

### A. 可靠性/评测闭环：Skills 需要“可验证”
- **代表 Issue**：[#556](https://github.com/anthropics/skills/issues/556)  
- **趋势**：社区最在意的不是“能不能写出 Skill”，而是 **Skill 是否真的被触发、是否能被评测、是否能稳定工作**。
- **关键词**：评测、触发率、回归测试、脚本稳定性、Windows 兼容性

### B. 文档自动化：生成质量从“内容正确”走向“排版正确”
- **代表 PR/Issue**：[#514](https://github.com/anthropics/skills/pull/514), [#538](https://github.com/anthropics/skills/pull/538), [#541](https://github.com/anthropics/skills/pull/541)
- **趋势**：社区希望 Claude 不只会产出文档，还要处理 **Typography、DOCX/PDF/ODT、模板填充、格式兼容**。
- **关键词**：文档生成、排版、模板、OpenDocument、Word/OOXML、PDF

### C. 测试与审查：代码质量技能需求上升
- **代表 PR/Issue**：[#723](https://github.com/anthropics/skills/pull/723), [#1367](https://github.com/anthropics/skills/pull/1367), [#1385](https://github.com/anthropics/skills/issues/1385)
- **趋势**：用户想要的是“写代码 + 自动审查 + 自动测试 + 交付前验收”的完整链路。
- **关键词**：测试生成、质量门、代码审查、自检、交付验证

### D. 企业与垂直平台 Skills：从通用助手走向行业助手
- **代表 PR/Issue**：[#568](https://github.com/anthropics/skills/pull/568), [#1329](https://github.com/anthropics/skills/issues/1329), [#228](https://github.com/anthropics/skills/issues/228)
- **趋势**：社区对 **ServiceNow、HPC、组织共享、长上下文状态管理** 等企业场景的需求明显增强。
- **关键词**：企业平台、权限、共享、长期记忆、HPC、ITSM

### E. 安全与信任边界：Skills 不是“纯内容”，而是“执行入口”
- **代表 Issue**：[#492](https://github.com/anthropics/skills/issues/492), [#1175](https://github.com/anthropics/skills/issues/1175)
- **趋势**：用户开始担心 Skill 的命名、分发、权限、上下文注入会带来信任边界问题。
- **关键词**：命名空间、信任边界、权限、数据隔离、敏感文档

---

## 3) 高潜力待合并 Skills
> 这里优先挑选 **问题清晰、改动集中、影响明确** 的 PR，通常更接近落地。

### 1. `claude-api` 模型退役更新
- **PR**：[#1607](https://github.com/anthropics/skills/pull/1607)
- **为什么可能近期合并**：只涉及模型状态同步，改动小但必要性强，属于“维护型高优先级修复”。

### 2. `skill-creator` 评测链路修复
- **PR**：[#1298](https://github.com/anthropics/skills/pull/1298)
- **为什么可能近期合并**：直接修复核心评测失真问题，若属实会显著提升整个 Skill 优化闭环可信度。

### 3. `skill-creator` Windows 兼容性修复
- **PR**：[#1099](https://github.com/anthropics/skills/pull/1099)
- **PR**：[#1050](https://github.com/anthropics/skills/pull/1050)
- **为什么可能近期合并**：问题明确、变更通常较小、对 Windows 用户收益直接。

### 4. `pdf` / `docx` 文档修复
- **PR**：[#538](https://github.com/anthropics/skills/pull/538), [#541](https://github.com/anthropics/skills/pull/541)
- **为什么可能近期合并**：属于典型“低风险高收益”的文档兼容性修复。

### 5. `mcp-builder` / evaluation 稳定性修复
- **PR**：[#1602](https://github.com/anthropics/skills/pull/1602), [#1390](https://github.com/anthropics/skills/issues/1390)
- **为什么可能近期合并**：影响评测与真实 server 交互，是基础设施层修复，优先级高。

### 6. `testing-patterns` 与 `self-audit`
- **PR**：[#723](https://github.com/anthropics/skills/pull/723), [#1367](https://github.com/anthropics/skills/pull/1367)
- **为什么可能近期合并**：这类“质量增强型 Skill”与社区需求高度一致，且更容易形成产品叙事。

---

## 4) Skills 生态洞察

**一句话总结：当前社区最集中的诉求是——让 Skills 从“会做事”升级为“可验证、可维护、可分发、可审计”的可靠生产能力。**

---

如果你愿意，我还可以把这份报告再整理成：
1. **PPT 风格摘要版**  
2. **适合发给团队的 Slack/飞书短报版**  
3. **按“产品机会 / 技术债 / 风险”三栏的决策版**

---

# Claude Code 社区动态日报（2026-09-04）

## 1) 今日速览
今天社区讨论的核心，依然是 **稳定性、权限流转、模型一致性和成本可观测性**。多个高优先级 Issue 指向自动模式、MCP、桌面/浏览器集成和工具执行链路上的可靠性问题，说明 Claude Code 在“可用”之外，正被更严格地要求“可控、可解释、可复现”。  
同时，最新版本 **v2.1.260** 也在往这个方向修补：新增 `/diff` 侧边 diff 面板，并开始在 `/cost` 里提示 prompt cache miss 的可能原因，显示官方正在强化编辑反馈和成本诊断能力。

---

## 2) 版本发布
### v2.1.260
- 发布链接：<https://github.com/anthropics/claude-code/releases/tag/v2.1.260>
- 主要变化：
  - 新增全屏模式下的 **diff panel**，可通过 `/diff` 打开，展示 Claude 编辑时的未提交改动。
  - `/cost` 中增加 **prompt cache miss 的可能原因** 提示，例如 tool definitions 或 system prompt 变更、空闲超过 TTL 等。
- 备注：当前来源中的 release notes 片段在末尾被截断，以上为可确认内容。

---

## 3) 社区热点 Issues

### 1. [#91930](https://github.com/anthropics/claude-code/issues/91930) — Windows / model / MCP / permissions：任务中断、范围漂移、交互态度问题
- **为什么重要**：这是一个跨多个关键模块的综合型 bug，涉及任务完整性、权限流、M365/auto-mode 以及用户体验，影响面很广。
- **社区反应**：截至目前 **3 条评论**，是今天讨论最活跃的 Issue 之一，说明该类“流程被打断/任务未完成”的问题很容易触发强反馈。

### 2. [#91971](https://github.com/anthropics/claude-code/issues/91971) — prompt cache 在 chained `-p --resume` 场景下始终不命中
- **为什么重要**：直接关系到 **延迟、成本和会话连续性**，属于对生产使用体验影响很大的性能问题。
- **社区反应**：已有 **2 条评论**，并且带有 repro，说明问题可验证、可复现，修复优先级通常会更高。

### 3. [#91947](https://github.com/anthropics/claude-code/issues/91947) — Bash 工具错误地输出整文件而不是指定范围
- **为什么重要**：Bash 是核心工具链之一，读取范围失效会导致信息噪音、效率下降，甚至引发不必要的成本。
- **社区反应**：目前 **1 条评论**，问题描述非常具体，属于典型的工具行为偏差。

### 4. [#91939](https://github.com/anthropics/claude-code/issues/91939) — Windows / TUI：最终回答被当成 thinking block，用户看不到
- **为什么重要**：这是典型的 **UI 可见性 bug**，会直接影响 AskUserQuestion 流程的完整性。
- **社区反应**：**1 条评论、1 个赞**，说明虽然讨论不多，但用户感知很强，且具有明确痛点。

### 5. [#91937](https://github.com/anthropics/claude-code/issues/91937) — Windows / permissions：Grep 需要手动审批，破坏 agentic loop
- **为什么重要**：权限模型一旦从“自动通过”退化成“频繁打断”，会直接让 agent 循环失效。
- **社区反应**：**1 条评论、1 个赞**，属于“看起来小，实际很致命”的工作流问题。

### 6. [#91923](https://github.com/anthropics/claude-code/issues/91923) — 子请求/子代理在首个工具结果后静默切到 `claude-opus-4-8`
- **为什么重要**：这会破坏 **子代理一致性**，让模型选择变得不可预测，影响调试和评估。
- **社区反应**：**1 条评论**，并且描述了 main session 不受影响，说明问题边界相对清晰。

### 7. [#91969](https://github.com/anthropics/claude-code/issues/91969) — Claude in Chrome：权限/凭证弹窗出现在看不见的窗口
- **为什么重要**：这是 **桌面+浏览器协同** 场景的高风险问题，最终会表现为“用户未授权”或 transport_error。
- **社区反应**：暂无评论，但属于高频集成链路，影响 Cowork / Chrome 扩展用户。

### 8. [#91964](https://github.com/anthropics/claude-code/issues/91964) — Remote Control 会话在 worker 异常退出后永久卡死
- **为什么重要**：影响远程协作与长会话稳定性，且“phantom worker_status:running”这类状态错误很难从表面恢复。
- **社区反应**：暂无评论，但这是 **re-file** 且仍可复现，说明历史遗留问题仍在持续影响用户。

### 9. [#91958](https://github.com/anthropics/claude-code/issues/91958) — MCP streamable-http 并发调用结果串槽
- **为什么重要**：这是 **并发一致性/结果路由** 问题，会导致工具结果落到错误请求上，属于严重的协议层 bug。
- **社区反应**：暂无评论，但有 repro，且涉及批量并发调用，工程风险较高。

### 10. [#91953](https://github.com/anthropics/claude-code/issues/91953) — auto-mode 分类器阻断用户授权的 deploy，并在会话内累计拒绝
- **为什么重要**：这说明自动安全/权限策略正在“过度拦截”，直接影响生产发布和运维操作。
- **社区反应**：暂无评论，但场景明确，且会对真实工作流造成连续性损伤。

---

## 4) 重要 PR 进展
> 过去 24 小时内仅更新到 **1 个 PR**，因此以下列出全部可见 PR；暂无更多可纳入的 PR 进展。

### [PR #91894](https://github.com/anthropics/claude-code/pull/91894) — Update `/frontend-design` SKILL.md
- **状态**：CLOSED
- **内容**：更新前端设计相关的 Skill 文档，偏维护性调整。
- **意义**：虽然不是核心引擎修复，但说明仓库仍在持续清理和维护技能体系，为后续工作流能力打基础。

---

## 5) 功能需求趋势
从今天的 Issues 看，社区关注点主要集中在以下几条主线：

1. **权限与自动模式更可控**
   - 用户反复提到审批过多、误拦截、自动模式阻断正常操作。
   - 关键词：`permissions`、`auto-mode`、`approval`、`deploy`。

2. **模型一致性与路由稳定性**
   - 子代理、fork、fallback、safeguard 触发后切模型等问题很突出。
   - 说明用户越来越在意“同样输入是否得到同样行为”。

3. **IDE / Desktop / Web / Chrome 集成体验**
   - Windows、macOS、Claude Desktop、Chrome 扩展、Cowork、VS Code 都有反馈。
   - 社区希望跨客户端会话和权限状态更顺滑、提示更清晰。

4. **工具执行可靠性与并发正确性**
   - Bash、MCP、Browser tools、Remote Control 等工具链问题集中出现。
   - 这类问题通常不是“功能缺失”，而是“执行不可信”。

5. **成本控制与缓存可观测性**
   - prompt cache、/cost、batch 脚本误花费等问题，说明用户对“花了多少、为什么花、能否刹车”非常敏感。

6. **上下文管理与会话交接**
   - compaction、resume、session handover、跨客户端打开会话等需求开始上升。
   - 用户希望长会话更稳、迁移更清楚。

---

## 6) 开发者关注点
今天的反馈里，开发者最需要关注的痛点可以概括为：

- **误判太多**：安全分类器和权限策略对合法任务的拦截过于激进。
- **工具不够确定**：同一工具在不同平台/不同会话下行为不一致。
- **状态提示不够透明**：缓存命中、模型切换、权限失败、会话失联等缺乏足够清晰的解释。
- **自动化链路易断**：一旦 Grep、Bash、MCP、Remote Control 出现异常，agentic loop 很容易中断。
- **成本风险需要硬保护**：不仅要能展示成本，还要能在异常支出时及时熔断。
- **跨端 UX 仍有裂缝**：Desktop / Chrome / VS Code / CLI 之间的会话和弹窗交互，仍存在明显割裂。

如果你希望，我可以把这份日报进一步整理成 **更适合内部周报的精简版**，或者输出成 **Markdown 表格版** 便于直接粘贴到 Notion / 飞书。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

下面是 **2026-09-04 OpenAI Codex 社区动态日报**（基于 `github.com/openai/codex` 过去 24 小时数据）。

---

## 1) 今日速览

今天 Codex 的主线是 **0.153.x 版本的快速修复与 GPT-6-Astra 配置扩展**：`0.153.2` 主要修正了 Fast tier 文案，`0.153.1` 则补上了 GPT-6-Astra 的 API 配置支持。  
社区侧则明显聚焦在 **桌面端性能/稳定性、Windows/macOS 兼容性、CLI 子代理与配额显示** 上，且不少问题已开始出现重复反馈和复现线索，说明影响面不小。

---

## 2) 版本发布

### `rust-v0.153.2` — 0.153.2
- 仅修复了 GPT-6-Astra Fast tier 的显示文案：从“1.5x”改为“2x speed, increased usage”。
- 这属于 **展示层修正**，不改变实际请求执行逻辑。  
链接：<https://github.com/openai/codex/releases/tag/rust-v0.153.2>

### `rust-v0.153.1` — 0.153.1
- 新增 **GPT-6-Astra 的 API 配置支持**，允许通过 API 配置该模型，而不影响默认模型，也不会显示在 model picker 中。
- 这是一个面向开发者/集成场景的重要补丁。  
链接：<https://github.com/openai/codex/releases/tag/rust-v0.153.1>

### `rust-v0.154.0-alpha.1 / alpha.2 / alpha.3`
- 过去 24 小时内出现多个 alpha 版本标签，但当前数据未给出详细变更说明。  
链接：
- <https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.1>
- <https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.2>
- <https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.3>

---

## 3) 社区热点 Issues

> 说明：以下挑选的是过去 24 小时最值得关注的 10 个 Issue，优先考虑 **影响范围、技术风险、评论活跃度**。

### 1. 桌面端在高 CPU 下冻结：Markdown 解析无上限
- Issue：[#42630](https://github.com/openai/codex/issues/42630)
- 重点：24.8M 字符级别的 task preview 被用于侧边栏标题，导致 CPU 接近 100% 并冻结桌面端。
- 为什么重要：这是典型的 **性能与资源耗尽问题**，直接影响可用性。
- 社区反应：已有 **3 条评论**，说明复现和确认速度较快，问题比较“实”。

### 2. macOS Accessibility 权限导致 NVIDIA Nsight Systems 崩溃
- Issue：[#42666](https://github.com/openai/codex/issues/42666)
- 重点：开启 Codex Computer Use 的辅助功能权限后，Nsight Systems 的 Timeline 交互会崩溃。
- 为什么重要：这是 **macOS 生态兼容性/权限冲突** 问题，影响开发者调试工具链。
- 社区反应：**2 条评论**，说明已有一定反馈交互，问题有明确触发条件。

### 3. 周配额重置/对账异常：无本地活动却显示已耗尽
- Issue：[#42660](https://github.com/openai/codex/issues/42660)
- 重点：用户反馈周配额重置、扣费或对账逻辑可能异常。
- 为什么重要：这是 **计费/限额可信度问题**，会直接影响付费用户体验。
- 社区反应：**2 条评论**，而且描述非常具体，通常意味着需要尽快排查后端状态一致性。

### 4. 发送反馈失败
- Issue：[#42642](https://github.com/openai/codex/issues/42642)
- 重点：反馈提交链路本身失效，导致用户难以上报问题。
- 为什么重要：这是 **“故障上报通道故障”**，会阻碍后续问题定位和用户支持。
- 社区反应：**2 条评论**，属于低频但高优先级的可观测性问题。

### 5. 浏览器侧边栏 owner sync 导致页面/渲染器爆炸式增长
- Issue：[#42595](https://github.com/openai/codex/issues/42595)
- 重点：8 个 durable pages 被扩展成 84 条 persisted routes 和 76 个 renderer。
- 为什么重要：这类问题通常意味着 **状态同步设计或生命周期管理有缺陷**，非常容易引发内存和性能灾难。
- 社区反应：**2 条评论**，且问题描述非常具体，利于工程定位。

### 6. Windows 上使用 sub-agents 后出现会话级 exec 失败
- Issue：[#42653](https://github.com/openai/codex/issues/42653)
- 重点：从 `gpt-5.6-sol` 调用 `gpt-5.6-luna` sub-agents 后，偶发整个 session 的 exec 失败。
- 为什么重要：这是 **多代理执行链路稳定性** 问题，直接打击 CLI/自动化场景。
- 社区反应：已有具体模型与平台信息，便于复现；当前仍处于早期反馈阶段。

### 7. 重装后桌面端底部工具栏和内置终端消失
- Issue：[#42664](https://github.com/openai/codex/issues/42664)
- 重点：macOS 重装后 UI 元素不可见，影响核心交互。
- 为什么重要：这是 **安装/升级后 UI 初始化异常**，属于阻断级问题。
- 社区反应：1 条评论，问题刚出现，值得尽快跟踪。

### 8. 重新打开任务时只显示第一轮，历史投影卡在 `task_complete` 前
- Issue：[#42662](https://github.com/openai/codex/issues/42662)
- 重点：任务重开后历史线程投影不完整，用户只能看到首轮对话。
- 为什么重要：这是 **会话状态持久化/恢复** 的核心问题，影响“任务续接”能力。
- 社区反应：1 条评论，但属于高价值状态 bug，技术排查优先级应靠前。

### 9. Windows 上配额显示不更新，直到耗尽才变化
- Issue：[#42658](https://github.com/openai/codex/issues/42658)
- 重点：剩余额度 UI 不实时刷新，直到真正耗尽才显示变化。
- 为什么重要：这是 **额度可见性/透明度** 问题，容易造成误判和焦虑。
- 社区反应：1 条评论，属于高频体验问题，适合尽快修。

### 10. Enter 键应可立即 steer 已排队消息
- Issue：[#42610](https://github.com/openai/codex/issues/42610)
- 重点：用户希望在有 queued message 时，空输入回车可直接 steer，而不是依赖按钮。
- 为什么重要：这是 **交互效率优化**，能明显提升工作流顺滑度。
- 社区反应：已有 **1 个 👍**，说明有明确用户共鸣，属于小改动高收益需求。

---

## 4) 重要 PR 进展

> 说明：以下挑选的是过去 24 小时内最值得关注的 10 个 PR，优先看 **产品能力、稳定性、底层架构**。

### 1. 为 `codex exec` 增加 managed worktrees
- PR：[#42652](https://github.com/openai/codex/pull/42652)
- 内容：为新的和 forked 的 `codex exec` session 提供 `--worktree` 与受管 worktree 机制。
- 价值：对 **多会话隔离、Git 工作流、安全执行** 很关键。

### 2. 将 assistant 文件引用渲染为本地链接
- PR：[#42650](https://github.com/openai/codex/pull/42650)
- 内容：把 `codex-file-citation` 渲染成本地文件链接，并兼容 Unicode、Windows 路径和特殊字符。
- 价值：显著提升 **可点击性与 IDE/终端可跳转体验**。

### 3. 恢复全屏 overlay 后的 inline TUI
- PR：[#42641](https://github.com/openai/codex/pull/42641)
- 内容：修复退出 alternate screen 后残留 overlay cells、历史内容滚动丢失的问题。
- 价值：直接提升 **TUI 稳定性与可见性**。

### 4. 加固 TUI 对 assistant markup 的解析
- PR：[#42640](https://github.com/openai/codex/pull/42640)
- 内容：统一解析 assistant directives，处理引号、嵌套、转义和 malformed 输入。
- 价值：减少 **渲染/解析类边界 bug**，对可靠性很重要。

### 5. 当保存的模型默认值被覆盖时给出警告
- PR：[#42639](https://github.com/openai/codex/pull/42639)
- 内容：当更高优先级配置覆盖已保存的 model / reasoning / service tier 时，显示 warning。
- 价值：提升 **配置可解释性**，避免“写成功但实际没生效”的误导。

### 6. 修正 GPT-6-Astra Fast tier 的速度说明
- PR：[#42638](https://github.com/openai/codex/pull/42638)
- 内容：把 Fast tier 文案统一为 “2x speed, increased usage”。
- 价值：与 0.153.2 热修一致，属于 **产品文案修正**，避免用户误解。

### 7. 为 ThreadManager 增加可注入 attachment store
- PR：[#42634](https://github.com/openai/codex/pull/42634)
- 内容：引入 `codex-attachment-store`，把附件元数据、引用和持久化接口抽离出来。
- 价值：是 **会话/附件架构解耦** 的重要一步，便于扩展与测试。

### 8. 在 voice host 中初始化打包的 GStreamer runtime
- PR：[#42631](https://github.com/openai/codex/pull/42631)
- 内容：新增 runtime 初始化协议，验证打包的原生运行时可安全加载。
- 价值：面向 **语音能力稳定性**，减少原生依赖引发的启动/运行风险。

### 9. 用初始化超时约束 Noise handshake
- PR：[#42623](https://github.com/openai/codex/pull/42623)
- 内容：将 Noise handshake 与 JSON-RPC initialize 共享同一初始化超时。
- 价值：改善 **exec server 启动可靠性**，避免握手阶段挂死。

### 10. 将 GPT-6-Astra 纳入 Bedrock catalogs
- PR：[#42619](https://github.com/openai/codex/pull/42619)
- 内容：把 `openai.gpt-6-astra` 加入 Amazon Bedrock 模型目录与跨区域目录。
- 价值：这是 **企业/云分发集成** 的关键补齐，面向更广泛的部署场景。

---

## 5) 功能需求趋势

从今天的 Issues 来看，社区最关注的功能方向主要集中在：

1. **桌面端性能与稳定性**
   - 典型表现：Markdown 解析过载、侧边栏状态膨胀、UI 组件消失、会话恢复异常。
   - 说明：用户对“不卡顿、不丢状态、可恢复”要求非常高。

2. **Windows / macOS 平台兼容性**
   - 典型表现：权限冲突、重装后 UI 缺失、DPI/多显示器偏移、启动失败。
   - 说明：跨平台桌面端正在承受大量系统级边界场景测试。

3. **CLI 子代理与会话模型控制**
   - 典型表现：service_tier 继承/覆盖、sub-agent 执行失败、compact 后重复 turn。
   - 说明：开发者对多代理编排和细粒度配置控制的需求在明显上升。

4. **配额/计费/使用量透明度**
   - 典型表现：quota reset 异常、剩余额度显示不刷新。
   - 说明：限额类体验已从“后台规则”变成前台可见性问题。

5. **更顺手的交互效率**
   - 典型表现：Enter 直接 steer、文件引用可点击、任务/聊天切换更连贯。
   - 说明：社区不仅要“能用”，还在强烈追求“少点几步”。

6. **新模型与云平台支持**
   - 典型表现：GPT-6-Astra 的 API/目录/Bedrock 支持持续补齐。
   - 说明：新模型上线已不只是模型本身，还包括 **catalog、API、云渠道、UI 展示** 的联动。

---

## 6) 开发者关注点

今天开发者反馈里的高频痛点可以归纳为：

- **性能退化比功能缺失更敏感**  
  一旦触发大文本解析、页面同步、renderers 暴涨，桌面端就会直接卡死或资源飙升。

- **状态一致性是核心信任问题**  
  无论是 session 恢复、quota 显示，还是任务历史投影，只要“看见的状态”与“真实状态”不一致，用户就会失去信心。

- **Windows 兼容性仍是高风险区**  
  权限、启动、DPI、多屏、WSL/本机服务等场景持续暴露问题，说明 Windows 端需要更系统的回归覆盖。

- **CLI 子代理/配置继承需求上升**  
  用户越来越依赖标准/快速代理分工，希望 `service_tier`、执行上下文、worktree 等配置更可控。

- **反馈链路本身也要可靠**  
  反馈提交失败会让其他问题更难闭环，因此“可上报”本身就是基础能力。

- **用户希望更少“黑盒感”**  
  包括配置覆盖 warning、文件引用可点击、配额实时变化提示，都说明开发者更需要可解释、可追踪的工具体验。

---

如果你希望，我可以把这份日报进一步整理成：
1. **适合内部周报的更短版本**，或  
2. **适合发布到公众号/博客的分析版**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-09-04）

## 1) 今日速览
今天社区动态的核心关键词是 **安全修复、会话/Checkpoint 稳定性、以及权限/策略一致性**。  
同时，Gemini CLI 发布了新的 nightly 版本，重点修补了 **MCP OAuth issuer 校验**，说明项目正在持续收紧供应链与认证链路的安全边界。  
Issue 与 PR 的密集度也表明：社区当前最关注的是 **路径处理、命令权限、恢复流程可靠性** 这些“底层稳定性问题”。

---

## 2) 版本发布

### 最新 Release：`v0.60.0-nightly.20260904.g87a9c71d5`
- GitHub 链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-nightly.20260904.g87a9c71d5>
- 主要更新：
  - 修复 `core` 中 MCP OAuth 流程的 **RFC 9207 issuer identification** 校验问题，增强认证安全性。
  - 同步进行 nightly 版本号 bump，体现持续集成发布节奏。

---

## 3) 社区热点 Issues

### 1. `#29191` 路径穿越：checkpoint 删除/加载可越界访问
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29191>
- 重要性：这是明确的 **安全问题**，`../` tag 可导致 checkpoints 目录外文件被读取/删除。
- 社区反应：标记为 `priority/p1`、`area/security`，说明优先级极高，且已进入人工 triage。

### 2. `#29189` `git diff --output` 绕过权限提示，可能静默覆盖文件
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29189>
- 重要性：涉及 **命令白名单绕过**，会在默认模式下无提示写文件，影响面广。
- 社区反应：目前为 `need-triage`，但问题描述非常具体，且带有可复现攻击面。

### 3. `#29194` 非数组 history 导致 resume 崩溃
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29194>
- 重要性：属于 **会话恢复可靠性** 问题，checkpoint 文件轻微损坏就会直接崩。
- 社区反应：已有 2 条评论，且状态为 `need-information`，说明正在补充边界条件。

### 4. `#29197` `.toml` 命令插值在多权限请求下陷入死循环
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29197>
- 重要性：影响 **命令模板执行与授权交互**，会卡住实际工作流。
- 社区反应：虽然只有 1 条评论，但属于高影响交互缺陷，且已被复现描述得较清楚。

### 5. `#29199` MCP runtime policy 与 CLI 路径行为不一致
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29199>
- 重要性：涉及 **企业/策略一致性**，允许列表与排除列表在不同路径下表现不一致。
- 社区反应：`need-triage`，但这是典型的“配置看似生效、实际未生效”问题，容易影响企业接入。

### 6. `#29198` resume 后立刻退出会删除整个 session
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29198>
- 重要性：直接破坏 **会话历史持久化**，属于数据丢失风险。
- 社区反应：`need-triage`，无评论但问题本身对用户感知强，容易形成“resume 不可信”印象。

### 7. `#29175` `tildeifyPath` 错把同名前缀兄弟目录当成家目录
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29175>
- 重要性：属于 **路径规范化 bug**，可能误导 UI/日志中的路径展示。
- 社区反应：已有 4 条评论，说明这是一个被认真讨论的边界问题。

### 8. `#29182` play.googleapis.com 不可达时 0.58.0 卡死
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29182>
- 重要性：反映 **外部依赖健壮性** 问题，且在非交互模式下会造成“无输出卡死”。
- 社区反应：`need-triage`，但场景很贴近真实 CI/受限网络环境。

### 9. `#29176` 启动时卡在 GitHub credentials 输入，终端冻结
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29176>
- 重要性：直接影响 **首次启动与认证体验**，用户会感觉 CLI “死掉了”。
- 社区反应：已关闭，且带 `manual-triage`，说明团队已注意到并处理流程。

### 10. `#29183` AI 编程互操作规范提案
- 链接：<https://github.com/google-gemini/gemini-cli/issues/29183>
- 重要性：这是少见的 **生态与标准化** 方向讨论，关注点超出了单点 bug。
- 社区反应：`priority/p3`、`enhancement`、`bot-triaged`，说明属于中长期方向性议题。

---

## 4) 重要 PR 进展

### 1. `#29195` 修复 checkpoint 非数组 history 导致 resume 崩溃
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29195>
- 内容：`loadCheckpoint` 对 `history` 做结构校验，无法解析时降级为空 checkpoint。
- 意义：提升 **恢复流程容错能力**，避免 raw TypeError。

### 2. `#29192` 限制 legacy raw tag path 不能逃逸 checkpoints 目录
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29192>
- 内容：修复 `/chat delete <tag>` 的旧路径回退逻辑，防止 `../` 路径穿越。
- 意义：直接对应高危安全漏洞，是本轮最关键 PR 之一。

### 3. `#29184` Windows sandbox 下校验 git 参数，阻止静默 `git diff --output`
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29184>
- 内容：补上 Windows 场景中对 `git` 子命令参数的检查。
- 意义：堵住“只看子命令、不看参数”的权限绕过。

### 4. `#29186` 修正 shell sandbox denial heuristic 的 exitCode 判定
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29186>
- 内容：把 `exitCode` 的 `null` 情况纳入正确判断。
- 意义：减少 sandbox 拒绝检测的误判/漏判，提升工具执行准确性。

### 5. `#29188` `read-many-files` 精确匹配 include pattern 与文件名/扩展名
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29188>
- 内容：将粗糙的 `includes()` 逻辑改为更精确的匹配。
- 意义：降低误选二进制资源的概率，改善文件读取行为。

### 6. `#29187` prompt template 使用 safeLiteralReplace
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29187>
- 内容：修复模板替换时 `$` 序列被 JS 特殊解释的问题。
- 意义：防止 prompt 注入式的字符串替换异常，提升模板安全性。

### 7. `#29190` 修复 vscode-ide-companion 的 Disposable 注册遗漏
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29190>
- 内容：把 `activate()` 中所有注册项都纳入 `subscriptions`。
- 意义：改善 VS Code 扩展生命周期管理，减少内存/命令残留问题。

### 8. `#29180` 防止 tildeifyPath 误判同前缀兄弟目录
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29180>
- 内容：用 `path.relative` 做目录边界判断，避免把兄弟目录“家目录化”。
- 意义：修复路径展示与逻辑判断的边界 bug。

### 9. `#29185` 修复慢速 E2E 测试抖动
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29185>
- 内容：对 `run_shell_command` 和 `file-system-interactive` 做稳定性优化。
- 意义：对 CI 可靠性和回归测试效率很重要。

### 10. `#29196` nightly release 自动版本 bump
- 链接：<https://github.com/google-gemini/gemini-cli/pull/29196>
- 内容：自动将版本更新到 `0.60.0-nightly.20260904.g87a9c71d5`。
- 意义：配合当天 release，保证发布链路连续。

---

## 5) 功能需求趋势

从今日 Issues 来看，社区关注点主要集中在以下几类：

1. **安全与权限边界**
   - checkpoint 路径穿越、`git diff --output` 绕过提示、shell sandbox 误判等，都是“默认安全模式”下的高风险问题。
   - 说明用户希望 CLI 在命令执行前做到更严格的参数级检查，而不只是按子命令粗粒度放行。

2. **会话恢复与数据可靠性**
   - `resume`、`delete/load checkpoint`、会话退出后历史丢失等问题集中出现。
   - 说明社区很在意“可恢复、可追溯、不丢会话”的使用体验。

3. **MCP / OAuth / 策略一致性**
   - 认证 issuer 校验、MCP runtime policy、allowlist/excluded 规则不一致，表明企业与工具链集成场景越来越多。
   - 需求重点是：**不同执行路径必须共享同一套策略语义**。

4. **命令模板与交互流程稳定性**
   - `.toml` interpolation、权限请求循环，说明复杂 prompt/command 模板已经进入实际使用。
   - 用户希望交互过程可预测，不会因为多次授权而卡死或重复。

5. **路径与文件处理的边界正确性**
   - `tildeifyPath`、checkpoint 路径、read-many-files 选择逻辑等，说明基础文件系统处理仍是高频关注点。
   - 这类问题虽小，但非常影响 CLI 的“可信度”。

---

## 6) 开发者关注点

今天开发者反馈中最突出的痛点，可以概括为：

- **“默认安全”仍不够细**：白名单/只读命令不能只看命令名，必须看参数和输出目标。
- **恢复机制需要更强韧性**：checkpoint 只要轻微损坏，就不能让整个 resume 崩掉。
- **路径处理要严格按目录边界判断**：前缀相似不等于同目录，尤其在跨平台场景下更容易出问题。
- **策略逻辑要统一**：CLI 路径、runtime 路径、Windows 路径不能出现不同判定口径。
- **非交互/弱网络场景要优雅降级**：不能让外部依赖不可达时直接卡死无输出。
- **测试稳定性仍是高优先级工作**：E2E 抖动修复说明 CI 和回归质量正在被持续打磨。

如果你愿意，我也可以把这份日报进一步整理成 **适合发群/发邮件的精简版**，或者输出成 **表格版（Issue/PR/影响/状态）**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-09-04）
数据源：github.com/github/copilot-cli

## 1) 今日速览
今天仓库的动向很集中：一边是 **v1.0.83-4 / v1.0.83-5** 连续发布，重点落在会话恢复体验、MCP OAuth、Windows 11 状态展示，以及沙箱隔离强化；另一边，Issues 主要集中在 **长会话性能、会话恢复、工具调用稳定性、插件/skills 生态兼容** 等核心路径上。  
整体看，社区最关心的仍然是：**能否稳定、快速地继续一个长会话**，以及 **沙箱和插件体系是否足够可控**。

## 2) 版本发布

- [v1.0.83-5](https://github.com/github/copilot-cli/releases/tag/v1.0.83-5)  
  **新增**：Windows 11 任务栏显示正在运行的 Copilot 会话，并支持悬停状态卡片。  
  **改进**：macOS / Linux 上沙箱命令对本机服务的访问进一步收紧；macOS 下连命令自己启动的 `127.0.0.1` 服务也会受限，依赖本地回环服务的测试/开发流程需留意。

- [v1.0.83-4](https://github.com/github/copilot-cli/releases/tag/v1.0.83-4)  
  **新增**：支持 MCP OAuth 登录的 Client ID Metadata Document（CIMD）。  
  **改进**：默认不再弹出“中断会话恢复”提示；大会话恢复时，输入框更快恢复可输入状态。  
  **修复**：沙箱文件工具相关一致性问题（原始 release note 在数据中被截断）。

## 3) 社区热点 Issues

1. [#4717 Extension startup fails on large session histories](https://github.com/github/copilot-cli/issues/4717)  
   长会话历史触发 V8 字符串上限，导致扩展 `joinSession()` 失败，属于“会话越长越不可用”的高风险问题；目前刚提交，尚无评论，值得优先排查。

2. [#4714 Resuming a session is extremely slow, does not display UI that would indicate loading](https://github.com/github/copilot-cli/issues/4714)  
   这是直接影响 `/resume` 和侧边栏会话恢复的核心体验问题，而且“慢 + 没有加载反馈”会放大用户不确定感；当前未见讨论，但属于高频痛点。

3. [#4710 Runaway copilot-file-search thread consumes CPU and unbounded disk while session is idle](https://github.com/github/copilot-cli/issues/4710)  
   空闲时仍持续占用 CPU 并写入无界日志，属于典型资源泄漏/后台失控问题；这类问题对笔记本和持续运行环境影响尤其大。

4. [#4706 Tool/function calls intermittently emit malformed invocation markup (court / <invoke>) and silently no-op](https://github.com/github/copilot-cli/issues/4706)  
   工具调用标记偶发畸形并静默失效，直接破坏 Agent 执行链路；该问题由 Copilot CLI 自己生成的 issue 提出，说明复现链路已经比较明确。

5. [#4704 /resume and /session should support filtering by current working directory](https://github.com/github/copilot-cli/issues/4704)  
   这是非常典型的高频效率诉求：会话越来越多后，按当前目录筛选能显著降低检索成本；该 issue 已获得 **1 个赞**，说明需求比较明确。

6. [#4708 Subagents cannot access installed skills that are available to the main agent](https://github.com/github/copilot-cli/issues/4708)  
   这会直接影响多 Agent / 子代理工作流，属于能力继承不一致问题；虽然还没有评论，但对高级自动化场景影响较大。

7. [#4716 /voice dictation intermittently captures nothing on WSL2/WSLg](https://github.com/github/copilot-cli/issues/4716)  
   语音输入在 WSL2/WSLg 场景下偶发完全无转写，属于跨平台输入链路稳定性问题；目前尚无社区跟进，但对语音用户是明显阻断。

8. [#4709 Multi-repo collection workspace never associates a worktree when member repos have different default branches](https://github.com/github/copilot-cli/issues/4709)  
   多仓库 collection 场景下默认分支不一致会导致 worktree 关联失败，这是多仓库工作流的兼容性问题；问题较场景化，但一旦命中会导致 session 不可用。

9. [#4715 Allow built-in Agent Plugin Marketplaces to be blocked](https://github.com/github/copilot-cli/issues/4715)  
   企业/内网场景希望屏蔽内置 marketplace，反映出对插件生态“可控性”的需求；这是典型的治理诉求，尤其适合组织级部署。

10. [#4705 Queued prompts occasionally remain stuck after the session becomes idle](https://github.com/github/copilot-cli/issues/4705)  
    队列提示偶发卡住会让用户误判系统状态，属于交互状态机问题；目前无评论，但影响“忙/闲切换”的可信度。

## 4) 重要 PR 进展
- 过去 24 小时 **未检测到 PR 更新**。  
  仓库 PR 列表：[GitHub Pull Requests](https://github.com/github/copilot-cli/pulls)

## 5) 功能需求趋势

1. [会话管理更精细：恢复、筛选、可见性优化](https://github.com/github/copilot-cli/issues/4704)  
   社区明显希望 `/resume`、`/session` 具备按当前目录过滤、快速定位和更清晰的恢复反馈。

2. [长会话性能与历史膨胀控制](https://github.com/github/copilot-cli/issues/4717)  
   大会话历史导致扩展加载失败、恢复变慢，说明“会话可持续运行能力”正在成为核心要求。

3. [工具调用与插件/skills 生态稳定性](https://github.com/github/copilot-cli/issues/4706)  
   malformed invoke、subagent 继承 skills、marketplace 可屏蔽，说明大家不只要“能用”，还要“可控、可治理”。

4. [跨平台交互能力：语音、终端、UI 状态展示](https://github.com/github/copilot-cli/issues/4716)  
   WSL2 语音捕获、滚动条复制、任务栏状态卡片等反馈说明，CLI 正在向更强的桌面交互体验延伸。

5. [多仓库/多工作区兼容性](https://github.com/github/copilot-cli/issues/4709)  
   collection workspace 和默认分支差异问题表明，多 repo 场景的工程化支持还有提升空间。

## 6) 开发者关注点

- [长会话“越跑越慢、越长越难恢复”](https://github.com/github/copilot-cli/issues/4714)  
  恢复慢、扩展起不来、输入框迟迟不响应，这类问题会直接削弱 CLI 的可用性。

- [后台资源失控与空闲态泄漏](https://github.com/github/copilot-cli/issues/4710)  
  即使显示 idle 仍持续占 CPU、写磁盘，说明后台任务治理和生命周期管理需要继续强化。

- [沙箱隔离在“更安全”与“更可开发”之间的平衡](https://github.com/github/copilot-cli/releases/tag/v1.0.83-5)  
  本机服务访问被进一步封死后，安全性提升了，但本地开发、测试套件、回环服务兼容性也更需要明确边界。

- [插件生态的组织级可控性](https://github.com/github/copilot-cli/issues/4715)  
  企业用户希望能屏蔽内置 marketplace、控制 skills 可见性，说明治理能力已经成为部署门槛之一。

- [跨平台输入链路稳定性](https://github.com/github/copilot-cli/issues/4716)  
  语音 dictation、WSL/WSLg、PowerShell 等路径如果不稳定，会显著影响高频交互效率。

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发群的精简版**，或  
2. **带“风险等级 / 优先级”排序的管理层版本**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报  
**日期：2026-09-04**  
数据源：`github.com/MoonshotAI/kimi-cli`

---

## 1) 今日速览
今天社区动态非常集中：**没有新 Release，也没有 PR 更新**，唯一值得关注的是一个高影响问题：**1.17+ 版本的 ACP auth gate 让不依赖 Kimi 账号的自定义 provider 也被强制要求 OAuth 鉴权**。  
这类问题通常意味着**兼容性回归**，会直接影响已有工作流，尤其是使用第三方/本地 provider 的开发者。

---

## 2) 版本发布
**今日无新 Release。**

---

## 3) 社区热点 Issues
> 说明：过去 24 小时内仅有 **1 条 Issue 更新**，因此以下为本日报可识别的唯一重点问题。

### 重点 Issue 1：#2633 — ACP auth gate (1.17+) blocks custom providers that don't need a Kimi account
- **状态**：OPEN  
- **作者**：billc8128  
- **更新时间**：2026-09-03  
- **为什么重要**：  
  这是一个典型的**功能回归/兼容性问题**。Issue 指出从 **1.17.0** 起，ACP server 对 `session/new`、`session/load`、`session/resume`、`session/prompt` 统一要求持久化的 Kimi OAuth token，这会导致**不需要 Kimi 账号的 custom providers 也无法使用**。这不仅影响可用性，还会阻碍 Kimi Code CLI 作为通用开发工具的扩展性。
- **社区反应如何**：  
  当前该 Issue **0 评论、0 点赞**，说明讨论尚未发酵；但从问题性质看，属于高优先级的兼容性修复候选。
- **链接**：  
  [GitHub Issue #2633](https://github.com/MoonshotAI/kimi-cli/issues/2633)

---

## 4) 重要 PR 进展
**过去 24 小时内没有 PR 更新。**

---

## 5) 功能需求趋势
从当前 Issue 可提炼出社区关注的功能方向：

1. **认证机制更灵活**
   - 需求不是“统一强制登录”，而是希望 **按 provider/场景区分鉴权策略**。
   - 尤其是对 **custom providers**，需要支持“无需 Kimi 账号也能运行”。

2. **ACP 接口的可配置性**
   - `session/*` 相关接口当前被统一 auth gate 保护，社区更倾向于：
     - 可按 endpoint 配置
     - 可按 provider 配置
     - 可按运行模式配置（例如本地/离线/第三方）

3. **向后兼容性**
   - 1.17+ 行为变化可能影响已有集成，说明用户非常在意 **升级不破坏现有工作流**。

---

## 6) 开发者关注点
结合当前反馈，开发者最可能关注以下痛点：

- **“为什么我用了自定义 provider，还必须登录 Kimi 账号？”**
  - 这类强制鉴权会被视为不必要的阻断，尤其在企业内网、本地模型、代理模型场景中。

- **升级后可用性下降**
  - 从用户视角看，这是一个典型的 **版本升级引入兼容问题**，会降低对新版本的信任。

- **需要更明确的认证边界**
  - 开发者希望文档和实现能明确区分：
    - 哪些能力必须依赖 Kimi 账号
    - 哪些能力可用于纯自定义 provider 场景

- **对扩展生态不友好**
  - 如果 ACP server 不能对 custom provider 友好适配，Kimi Code CLI 的插件/替换式生态会受到限制。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **更像媒体简报的版本**，或  
2. **适合团队晨会/周报的精简版**。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-09-04）

## 1) 今日速览
今天 OpenCode 社区讨论仍然高度集中在 **模型可用性、权限控制、TUI/桌面体验** 和 **嵌套项目兼容性** 上，尤其是 Zen / Muse Spark 相关报错、`lsp` 在多 `tsconfig` 场景下失效、以及权限自动接管不生效等问题被频繁提及。  
同时，PR 侧出现了不少高价值修复：包括 **重连退避、模型排序统一、背景任务面板、插件管理器、LSP 修复** 等，说明项目正在围绕“稳定性 + 可用性”持续打磨。  
此外，多个 “needs:compliance” 议题与退款/服务不可用诉求出现，提示社区反馈里也混杂着较多账号与服务支持类需求。

---

## 2) 社区热点 Issues

> 选取 10 个最值得关注的问题，优先考虑评论数、影响范围和修复优先级。

1. **#47167 archived my project by accident**  
   链接：<https://github.com/anomalyco/opencode/issues/47167>  
   为什么重要：误归档项目属于高风险误操作，且作者同时反馈 agents 无法加载、无响应，疑似涉及项目恢复与运行链路异常。  
   社区反应：**4 条评论**，说明这是一个较强的可用性/数据安全焦点。

2. **#47120 Zen lists muse-spark-1.3-contributor-free, but OpenCode 1.18.27 omits it and invocation returns UnknownError**  
   链接：<https://github.com/anomalyco/opencode/issues/47120>  
   为什么重要：直接影响新模型发现与调用，是模型接入链路的核心问题。  
   社区反应：**3 条评论**，表明 Zen 模型目录与 CLI 实际行为不一致已引发关注。

3. **#47127 TUI: add non-interrupting cancel/edit for queued message**  
   链接：<https://github.com/anomalyco/opencode/issues/47127>  
   为什么重要：队列消息无法单独取消/编辑会显著影响交互效率，属于 TUI 体验优化的典型需求。  
   社区反应：**3 条评论**，说明这是高频使用场景下的痛点。

4. **#47177 [2.0] code mode: execute dispatcher bypasses ask permission for nested plugin tools**  
   链接：<https://github.com/anomalyco/opencode/issues/47177>  
   为什么重要：这是权限模型漏洞级别的问题，涉及插件嵌套调用绕过 ask 规则，影响安全边界。  
   社区反应：**2 条评论**，问题虽未爆发式讨论，但风险优先级很高。

5. **#47174 `lsp` tool returns empty results for TypeScript files in nested sub-projects**  
   链接：<https://github.com/anomalyco/opencode/issues/47174>  
   为什么重要：多 `tsconfig` 嵌套项目是前端/monorepo 常见场景，LSP 失效会直接影响代码理解与编辑能力。  
   社区反应：**2 条评论**，属于典型的开发者生产力问题。

6. **#47097 Local opencode serve can ship a hosted web UI that does not match the local backend**  
   链接：<https://github.com/anomalyco/opencode/issues/47097>  
   为什么重要：前后端版本/构建不匹配会导致“看起来运行了，但 UI 与 backend 不一致”的隐蔽故障。  
   社区反应：**2 条评论**，说明本地开发/部署流程存在可靠性隐患。

7. **#47096 Desktop Auto-accept permissions toggle does not stop permission prompts**  
   链接：<https://github.com/anomalyco/opencode/issues/47096>  
   链接：<https://github.com/anomalyco/opencode/issues/47096>  
   为什么重要：桌面端“自动接受权限”开关与实际行为不一致，属于典型的控制面失真问题。  
   社区反应：**2 条评论**，对交互信任影响较大。

8. **#47087 [FEATURE]: Add Before/After Prompt Hooks for TUI Plugins**  
   链接：<https://github.com/anomalyco/opencode/issues/47087>  
   为什么重要：提示词前后 hook 是插件体系扩展能力的重要一环，有助于构建更强的工作流集成。  
   社区反应：**2 条评论**，属于生态能力增强诉求。

9. **#47192 [Zen] muse-spark-1.3-contributor-free returns HTTP 500 via API key, while 1.2-contributor-free works**  
   链接：<https://github.com/anomalyco/opencode/issues/47192>  
   为什么重要：新旧模型版本的服务差异会直接影响用户升级决策，也反映后端兼容性问题。  
   社区反应：**1 条评论**，但与 #47120 形成同一条模型故障主线。

10. **#47172 [bug] `--model` is silently ignored on the default (TUI) entry path**  
    链接：<https://github.com/anomalyco/opencode/issues/47172>  
    为什么重要：命令行参数被静默忽略属于“高误导性”问题，容易导致用户以为自己指定了模型但实际没有生效。  
    社区反应：**1 条评论**，但对排障和可预测性影响较大。

---

## 3) 重要 PR 进展

> 选取 10 个值得关注的 PR，覆盖稳定性、模型排序、插件、桌面端和编辑器集成。

1. **#47204 fix(client): back off reconnects when the stream never connects**  
   链接：<https://github.com/anomalyco/opencode/pull/47204>  
   作用：为流式连接失败场景增加退避策略，避免固定频率重连造成请求风暴。  
   价值：直接提升浏览器/桌面客户端在认证失败或连接异常时的稳定性。

2. **#47203 fix(core): scope compaction Completed section to finished work**  
   链接：<https://github.com/anomalyco/opencode/pull/47203>  
   作用：收紧 compaction 总结模板中 Completed 段的语义，避免把“verified facts”混入完成项。  
   价值：提升压缩摘要的准确性和可读性。

3. **#47202 [contributor] feat(core): suggest moving sessions into task worktrees**  
   链接：<https://github.com/anomalyco/opencode/pull/47202>  
   作用：在会话上下文中提示将 session 移入 task worktree。  
   价值：强化多任务/隔离式工作流，提升上下文管理能力。

4. **#47199 [contributor] fix(simulation): remove artificial click pacing**  
   链接：<https://github.com/anomalyco/opencode/pull/47199>  
   作用：移除模拟点击中的人工 pacing。  
   价值：提升模拟执行效率，减少测试/回放中的无谓等待。

5. **#47197 [needs:compliance] feat(app): keep model selection per agent**  
   链接：<https://github.com/anomalyco/opencode/pull/47197>  
   作用：让每个主 agent 独立保存模型选择，并兼容旧会话。  
   价值：改善多 agent 场景下的模型切换体验。

6. **#47193 [needs:compliance] feat: add durable heartbeat monitoring**  
   链接：<https://github.com/anomalyco/opencode/pull/47193>  
   作用：持久化 heartbeat 调度与策略，重启后可恢复待检查项。  
   价值：增强后台监控与任务可恢复性。

7. **#47181 fix(opencode): resolve LSP for nested TypeScript sub-projects**  
   链接：<https://github.com/anomalyco/opencode/pull/47181>  
   作用：修复嵌套 TypeScript 子项目的 LSP 解析。  
   价值：直接对应高关注 issue #47174，是前端/monorepo 用户的关键修复。

8. **#47180 feat(desktop): plugin manager — browse, install, and manage plugins from the settings dialog**  
   链接：<https://github.com/anomalyco/opencode/pull/47180>  
   作用：桌面端新增插件管理器，支持浏览、安装与管理。  
   价值：显著增强插件生态可发现性与可运维性。

9. **#47179 [contributor, 2.0] fix(ui): unify model picker ordering**  
   链接：<https://github.com/anomalyco/opencode/pull/47179>  
   作用：统一模型选择器排序规则，免费优先、再按最新发布、再按名称。  
   价值：减少不同入口的排序不一致，改善模型可发现性。

10. **#47176 [contributor] fix(util): skip unused audits during package installs**  
    链接：<https://github.com/anomalyco/opencode/pull/47176>  
    作用：跳过安装过程中未使用的 npm audit 等待。  
    价值：解决插件更新卡住“updating”的问题，提升安装链路速度与稳定性。

---

## 4) 功能需求趋势

从今天的 Issues 里，可以明显看出社区关注集中在以下方向：

1. **模型接入与模型可用性**  
   典型诉求包括 Zen / Muse Spark 新模型发现失败、调用 500、`--model` 被忽略等。  
   说明用户对“新模型能否稳定接入、能否被正确选择”非常敏感。  
   代表链接：<https://github.com/anomalyco/opencode/issues/47120>、<https://github.com/anomalyco/opencode/issues/47192>、<https://github.com/anomalyco/opencode/issues/47172>

2. **权限与安全边界控制**  
   包括 auto-accept 不生效、nested plugin tools 绕过 ask 权限、后台执行与提示词 hook 等。  
   说明社区既要自动化，也希望权限可控、行为可预期。  
   代表链接：<https://github.com/anomalyco/opencode/issues/47177>、<https://github.com/anomalyco/opencode/issues/47096>、<https://github.com/anomalyco/opencode/issues/47087>

3. **TUI / Desktop 交互体验优化**  
   队列消息编辑、复制逻辑、状态展示、布局对齐等问题都在被持续反馈。  
   说明 OpenCode 的“高频交互层”仍然是社区最在意的体验面。  
   代表链接：<https://github.com/anomalyco/opencode/issues/47127>、<https://github.com/anomalyco/opencode/issues/47165>

4. **IDE / LSP / 多项目工作区支持**  
   Nested TypeScript 子项目、LSP 空结果等问题表明 monorepo 场景是重要用户群。  
   代表链接：<https://github.com/anomalyco/opencode/issues/47174>

5. **后台任务与长流程调度**  
   用户希望有更明确的任务面板、heartbeat、background shell 支持，减少“运行中但看不到”的黑盒感。  
   代表链接：<https://github.com/anomalyco/opencode/pull/47193>、<https://github.com/anomalyco/opencode/pull/47187>、<https://github.com/anomalyco/opencode/pull/47186>

6. **插件生态与工作流扩展**  
   插件管理器、prompt hooks、session context hook 等需求都在强化平台化方向。  
   代表链接：<https://github.com/anomalyco/opencode/pull/47180>、<https://github.com/anomalyco/opencode/issues/47087>

---

## 5) 开发者关注点

从今日反馈看，开发者最常提到的痛点主要有：

- **模型输出与调用链稳定性不足**：包括 500、UnknownError、rate limit、upstream timeout、retryable case 未处理等。  
  相关链接：<https://github.com/anomalyco/opencode/issues/47162>、<https://github.com/anomalyco/opencode/issues/47153>、<https://github.com/anomalyco/opencode/issues/47129>

- **权限提示和自动化策略不一致**：用户希望“能自动”的地方真正自动，“要确认”的地方仍然严格提示。  
  相关链接：<https://github.com/anomalyco/opencode/issues/47096>、<https://github.com/anomalyco/opencode/issues/47177>

- **嵌套工作区/多 tsconfig 支持不足**：这类问题对真实工程项目影响很大，尤其是 monorepo 场景。  
  相关链接：<https://github.com/anomalyco/opencode/issues/47174>

- **TUI 交互细节仍有提升空间**：如 queued message 的编辑、copy 行为、技能列表显示等。  
  相关链接：<https://github.com/anomalyco/opencode/issues/47127>、<https://github.com/anomalyco/opencode/issues/47068>、<https://github.com/anomalyco/opencode/issues/47165>

- **桌面端与本地 serve 的一致性问题**：本地构建、界面资源、设置项与实际行为仍存在偏差。  
  相关链接：<https://github.com/anomalyco/opencode/issues/47097>、<https://github.com/anomalyco/opencode/pull/47189>

- **服务支持与合规类诉求增加**：退款、地区可用性、账户/订阅同步等非纯技术问题占据一定比重。  
  相关链接：<https://github.com/anomalyco/opencode/issues/47205>、<https://github.com/anomalyco/opencode/issues/47072>

---

如果你希望，我也可以把这份日报再整理成：  
1) **更适合发群的超短版**，或 2) **带“风险等级/优先级”标签的运营版**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-09-04）

## 1. 今日速览
今天社区的讨论几乎全部围绕 **模型/Provider 兼容性、会话与上下文稳定性、以及 TUI/工具链体验优化** 展开。虽然 **过去 24 小时没有新 Release**，但 Issues 和 PR 依然非常活跃，且多数问题已快速关闭，说明维护节奏较快、反馈闭环较紧。  
[仓库主页](https://github.com/badlogic/pi-mono)

## 2. 版本发布
- 今日 **无新 Release**。  
[Releases](https://github.com/badlogic/pi-mono/releases)

---

## 3. 社区热点 Issues

1. **#9105 `processFileArguments()` 以有损 UTF-8 解码损坏二进制附件**
   - 这是典型的数据损坏问题，影响 `@file` 和 Read 工具，优先级很高；社区已有 2 条评论，说明复现与修复诉求明确。  
   - 链接：[#9105](https://github.com/badlogic/pi-mono/issues/9105)

2. **#9097 DeepSeek/OpenRouter 的 `thinkingSignature` 冗余导致 session 膨胀**
   - 多日会话被撑到 4.5MB，触发上下文限制，属于“用着用着就坏掉”的高危问题；2 条评论，且直指长期会话可用性。  
   - 链接：[#9097](https://github.com/badlogic/pi-mono/issues/9097)

3. **#9100 `openai-completions` 重放 `reasoning_details`，导致 provider 拒绝**
   - 跨 provider 混用时会出现 “Corrupted thought signature” 类错误，属于兼容性链路上的关键故障；虽只有 1 条评论，但影响面广。  
   - 链接：[#9100](https://github.com/badlogic/pi-mono/issues/9100)

4. **#9099 OpenRouter 非 batch Anthropic 模型的 baseUrl 少了 `/v1`**
   - 配置错误会直接导致 404 HTML 页面回传给 agent，是典型的“注册表/元数据错误”高优先级问题；1 条评论但很致命。  
   - 链接：[#9099](https://github.com/badlogic/pi-mono/issues/9099)

5. **#9055 `EventStream` 在 drain buffered events 时出现 O(N²) CPU 开销**
   - 这是长跑型 agent/server 场景的性能瓶颈，已有 3 条评论且状态为 `inprogress`，表明社区对吞吐和延迟非常敏感。  
   - 链接：[#9055](https://github.com/badlogic/pi-mono/issues/9055)

6. **#9076 Google 模型目录缺少 `gemini-3.8-flash`**
   - 直接影响新模型可用性，3 条评论说明用户已在实际使用中遇到阻塞；属于“模型覆盖”类高频需求。  
   - 链接：[#9076](https://github.com/badlogic/pi-mono/issues/9076)

7. **#9073 `JsonlSessionRepo` 在 cwd 编码冲突时拒绝 session ID**
   - 多项目/多目录场景下的 session 隔离问题，属于工程化部署常见坑；当前仍为 OPEN，值得持续关注。  
   - 链接：[#9073](https://github.com/badlogic/pi-mono/issues/9073)

8. **#9071 扩展工具与内置工具同名时，不能正确覆盖**
   - 影响扩展机制的可控性和可替换性，2 条评论，属于插件/扩展生态的核心问题。  
   - 链接：[#9071](https://github.com/badlogic/pi-mono/issues/9071)

9. **#9079 仅检查 `/login` 存储，忽略插件 auth-file 的 API key**
   - 影响 provider 插件接入，2 条评论；这类问题会直接降低第三方 provider 的可集成性。  
   - 链接：[#9079](https://github.com/badlogic/pi-mono/issues/9079)

10. **#9074 Anthropic mid-output fallback 失败时，turn 没有正确记录 handoff**
    - 这是多模型 fallback 链路的稳定性问题，且已有 1 个 👍，说明有实际用户认可其重要性。  
    - 链接：[#9074](https://github.com/badlogic/pi-mono/issues/9074)

---

## 4. 重要 PR 进展

1. **#9096 新增 Meta provider，并支持 Muse 订阅 OAuth**
   - 这是新增模型/Provider 接入的代表性工作，说明项目仍在持续扩展可用模型生态。  
   - 链接：[#9096](https://github.com/badlogic/pi-mono/pull/9096)

2. **#9087 当动态模型 API 没有对应实现时，直接 fail fast**
   - 解决“请求发出去才发现不支持”的低效错误路径，能显著改善故障定位与用户体验。  
   - 链接：[#9087](https://github.com/badlogic/pi-mono/pull/9087)

3. **#9084 支持 source checkout 通过 rebase 更新**
   - 补齐源码安装场景的自更新路径，对开发者和本地贡献者非常实用。  
   - 链接：[#9084](https://github.com/badlogic/pi-mono/pull/9084)

4. **#9083 修复连续重复的大段粘贴 marker**
   - 改善 TUI 编辑体验，避免历史记录中出现冗余重复标记。  
   - 链接：[#9083](https://github.com/badlogic/pi-mono/pull/9083)

5. **#9082 折叠工具调用时，将多行 bash 总结为 `bash script (N lines)`**
   - 这是典型的可读性优化，直接提升长历史/复杂工具链的可扫描性。  
   - 链接：[#9082](https://github.com/badlogic/pi-mono/pull/9082)

6. **#9081 允许 `registerProvider` 的 `apiKey` 从插件 auth 文件动态读取**
   - 与 #9079 直接呼应，补齐插件凭据管理能力，对 provider 生态很关键。  
   - 链接：[#9081](https://github.com/badlogic/pi-mono/pull/9081)

7. **#9080 新增 “jump to latest” 控件**
   - 改善长对话/长日志下的导航效率，是高频交互改进。  
   - 链接：[#9080](https://github.com/badlogic/pi-mono/pull/9080)

8. **#9070 在 Linux 上下载静态链接的 musl 版 fd/ripgrep**
   - 解决 NixOS/Alpine 等环境下二进制兼容性问题，直接提升工具链可用性。  
   - 链接：[#9070](https://github.com/badlogic/pi-mono/pull/9070)

9. **#9069 新增 `terminal.contentWidth`，限制 TUI 渲染宽度**
   - 对扩展侧边栏/覆盖层尤其有价值，属于布局能力增强。  
   - 链接：[#9069](https://github.com/badlogic/pi-mono/pull/9069)

10. **#9053 `/new` 可继承当前 session 的 model 和 thinking level**
    - 对“按当前上下文快速开新会话”的工作流很有帮助，减少重复配置成本。  
    - 链接：[#9053](https://github.com/badlogic/pi-mono/pull/9053)

---

## 5. 功能需求趋势
从近 24 小时 Issues 看，社区关注点主要集中在以下几类：

- **新模型 / Provider 支持扩展**
  - 例如 Google 模型补全、Meta provider、OpenRouter/Anthropic 兼容等。
- **跨 Provider 兼容性与协议修复**
  - thinking signature、reasoning_details、handoff、baseUrl、tool ID 等问题非常集中。
- **会话与上下文管理**
  - session 膨胀、上下文长度、`/new` 继承策略、session repo 冲突等。
- **性能优化**
  - EventStream 队列、参数解析的 O(N²) 问题、启动时 bytecode 编译等。
- **TUI/交互体验**
  - 粘贴 marker、跳转最新消息、全屏滚动性能、渲染宽度控制。
- **插件/扩展生态可用性**
  - tool 覆盖、auth 文件读取、subagent 参数准备、widget 异常隔离。

相关链接可参考：
- [Issues 列表](https://github.com/badlogic/pi-mono/issues)
- [Pull Requests 列表](https://github.com/badlogic/pi-mono/pulls)

---

## 6. 开发者关注点
开发者反馈里反复出现的痛点主要是：

- **“看似兼容，实际在混合模型/混合 provider 时崩”**
  - 典型表现是 thought signature、handoff、reasoning payload 回放出错。
- **“长会话会慢、会爆、会卡”**
  - 既有上下文膨胀，也有事件队列和解析路径上的性能问题。
- **“工具层不要默默损坏数据”**
  - 二进制附件、reasoning markup、tool I/O 内容被改写/剥离是高风险问题。
- **“插件应该能真正替换内建能力，并独立管理凭据”**
  - tool 名称冲突、auth-file key、subagent 参数修复都是这个方向。
- **“TUI 需要更适合高密度工作流”**
  - 包括跳转最新、固定输入框、滚动性能、渲染宽度控制等。

---

如果你希望，我也可以把这份日报进一步整理成：
1. **适合发群的精简版**  
2. **适合内部周报的分析版**  
3. **带“风险等级 / 优先级”的管理版**

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

以下为 **2026-09-04** 的 **Qwen Code 社区动态日报**（基于 GitHub `QwenLM/qwen-code` 近 24 小时数据）。

---

## 1. 今日速览

今天的动态以 **版本发布、OpenTUI 交互修复、CI/测试稳定性、安全加固** 为主线：`v0.23.0` 已发布，带来分支状态提示优化；同时社区集中讨论了 **测试耗时、E2E 波动、Daemon 缓存、语音模型兼容** 等问题。  
从 Issue 和 PR 的密度看，项目当前的重点仍是 **提升交互可靠性与发布流水线稳定性**，并同步推进 **Token Plan/音频模型支持** 与 **安全修补**。

---

## 2. 版本发布

- [**v0.23.0**](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0)  
  - **新增**：Branch picker 增加 Git 状态提示，例如 `↓3 · origin/main`、`Up to date`，方便在 Update Project / Commit / Push 前快速确认仓库状态。  
  - **Breaking Changes**：无已知破坏性变更。  

---

## 3. 社区热点 Issues

1. [**#10908 CI test time is bound by module import cost, not scheduling**](https://github.com/QwenLM/qwen-code/issues/10908)  
   - **重要性**：直指 CI 主要瓶颈是“导入成本”而不是调度，说明当前测试体系存在明显的启动开销优化空间。  
   - **社区反应**：已有 **5 条评论**，讨论集中度较高，显然影响到整体测试吞吐和发布效率。

2. [**#10953 Todo plan state goes stale while work is delegated to subagents**](https://github.com/QwenLM/qwen-code/issues/10953)  
   - **重要性**：这是多智能体/子代理场景下的状态一致性问题，影响任务跟踪与主动提醒机制。  
   - **社区反应**：**4 条评论**，说明这是一个真实可复现、且对工作流体验影响较大的问题。

3. [**#10932 Voice dictation cannot use Token Plan ASR**](https://github.com/QwenLM/qwen-code/issues/10932)  
   - **重要性**：新模型族 `qwen-audio-3.0-asr-flash` 无法接入语音链路，直接影响语音输入能力的扩展。  
   - **社区反应**：**4 条评论**，表明语音/模型切换兼容性已成为近期关注点。

4. [**#10936 DingTalk channel prints clientSecret and stream ticket to stdout on every connect**](https://github.com/QwenLM/qwen-code/issues/10936)  
   - **重要性**：这是明确的 **凭据泄露** 风险，属于高优先级安全问题。  
   - **社区反应**：虽然仅 **2 条评论**，但由于涉及 `clientSecret` 明文输出，安全敏感度很高。

5. [**#10887 No early termination on repeated tool errors**](https://github.com/QwenLM/qwen-code/issues/10887)  
   - **重要性**：重复工具错误不终止会导致会话陷入死循环，消耗 5–14M tokens，直接伤害成本与稳定性。  
   - **社区反应**：**3 条评论**，属于“高损耗、强痛点”型问题。

6. [**#10905 OpenTUI: slash command output never reaches the screen**](https://github.com/QwenLM/qwen-code/issues/10905)  
   - **重要性**：OpenTUI 中 slash command 的输出不可见，属于直接影响用户操作感知的 UI 回归。  
   - **社区反应**：**2 条评论**，但问题指向明确，且影响面广。

7. [**#10904 E2E: cron-interactive nightly flakes on 30 s cron-fire timeouts**](https://github.com/QwenLM/qwen-code/issues/10904)  
   - **重要性**：夜间任务偶发超时且 `continue-on-error` 掩盖红灯，会让测试失真、问题延后暴露。  
   - **社区反应**：**2 条评论**，体现出测试告警机制与稳定性仍需加强。

8. [**#10918 fix(daemon): supported-commands can stay stale after Skill metadata changes**](https://github.com/QwenLM/qwen-code/issues/10918)  
   - **重要性**：Daemon 端命令元数据缓存失效问题，会造成技能更新后客户端仍读到旧命令列表。  
   - **社区反应**：**2 条评论**，说明这类“状态陈旧”问题在长连接场景下已被持续关注。

9. [**#10989 web-shell: the daemon prompt authority is only polled where the sidebar is mounted**](https://github.com/QwenLM/qwen-code/issues/10989)  
   - **重要性**：VS Code Companion 与侧边栏的状态拉取逻辑不一致，导致已有修复在部分界面无效。  
   - **社区反应**：**2 条评论**，属于跨容器/跨宿主 UI 一致性问题。

10. [**#10903 E2E: web-shell Browser Regression is red in every run**](https://github.com/QwenLM/qwen-code/issues/10903)  
    - **重要性**：稳定复现的 Web Shell 回归，属于必须尽快闭环的 P1 级测试问题。  
    - **社区反应**：**3 条评论**，且已被定位到确定性 Playwright 断言，说明排查路径较清晰。

---

## 4. 重要 PR 进展

1. [**#10988 refactor(cli): route every per-request runtime-root pin through runWithPinnedRuntimeBaseDir**](https://github.com/QwenLM/qwen-code/pull/10988)  
   - **内容**：把 per-request runtime root 的 pin 逻辑收敛到统一入口，减少分散拼装。  
   - **意义**：提升请求级运行目录的一致性，降低后续回归风险。

2. [**#10987 fix(cli): submit exact OpenTUI slash commands from live input**](https://github.com/QwenLM/qwen-code/pull/10987)  
   - **内容**：OpenTUI 直接基于实时输入判断是否提交精确 slash command。  
   - **意义**：修复输入态与渲染态不同步导致的提交错误，强化交互准确性。

3. [**#10986 fix(cli): resolve the OpenTUI slash submit from the live buffer on Enter**](https://github.com/QwenLM/qwen-code/pull/10986)  
   - **内容**：Enter 键的提交决策改为读取当前编辑缓冲区，而不是延迟一拍的渲染状态。  
   - **意义**：进一步修复 OpenTUI slash 命令的时序问题。

4. [**#10985 chore(deps): clear remaining CVE audit findings (diff DoS, uuid bounds check)**](https://github.com/QwenLM/qwen-code/pull/10985)  
   - **内容**：清理剩余依赖审计项，使 `npm audit --omit=dev` 归零。  
   - **意义**：持续推进供应链安全收敛，降低依赖漏洞暴露面。

5. [**#10983 fix(security): stop stripping unsafe env assignments in Bash allow matching**](https://github.com/QwenLM/qwen-code/pull/10983)  
   - **内容**：修复 Bash 规则匹配中对环境变量赋值的危险剥离逻辑。  
   - **意义**：堵住命令匹配绕过路径，属于安全修补重点。

6. [**#10982 fix(core): demote balanced content-only thinking blocks to thought parts**](https://github.com/QwenLM/qwen-code/pull/10982)  
   - **内容**：增强对 `<thinking>...</thinking>` 内容块的处理，防止泄漏。  
   - **意义**：改进模型输出解析与安全隔离，减少内容污染风险。

7. [**#10981 fix(cli): accept the qwen-audio Token Plan ASR family in voice transport resolution**](https://github.com/QwenLM/qwen-code/pull/10981)  
   - **内容**：让语音链路识别新的 `qwen-audio-*` Token Plan ASR 模型族。  
   - **意义**：直接对应语音识别兼容性问题，补齐新模型接入。

8. [**#10980 docs(auth): document Token Plan setup**](https://github.com/QwenLM/qwen-code/pull/10980)  
   - **内容**：补充 Alibaba Cloud Token Plan 的配置文档。  
   - **意义**：降低新用户接入成本，也为新模型能力推广提供文档支撑。

9. [**#10979 feat(cli): Open OSC 8 links with a plain click in VP mode**](https://github.com/QwenLM/qwen-code/pull/10979)  
   - **内容**：虚拟视口模式下支持普通点击打开 OSC 8 链接，并保留右键菜单。  
   - **意义**：提升终端/网页混合场景下的可用性与链接操作体验。

10. [**#10978 fix(daemon): mark session supported-commands no-store**](https://github.com/QwenLM/qwen-code/pull/10978)  
    - **内容**：为 session 级命令与 Skill 元数据接口增加 `Cache-Control: no-store`。  
    - **意义**：针对“命令元数据过期”问题的直接修复，减少客户端读到旧状态的概率。

---

## 5. 功能需求趋势

从今天的 Issues 可以看出，社区最关注的方向主要有：

- [**IDE / Web Shell / OpenTUI 交互一致性**](https://github.com/QwenLM/qwen-code/issues?q=is%3Aissue+label%3Ascope%2Fweb-shell+OR+label%3Ascope%2Fvscode+OR+label%3Ascope%2Finteractive)  
  典型诉求是输入提交、输出可见、链接可点、侧边栏与主视图状态一致。

- [**CI / 测试性能与稳定性**](https://github.com/QwenLM/qwen-code/issues?q=is%3Aissue+label%3Ascope%2Fci-cd+OR+label%3Ascope%2Ftesting)  
  包括 import 成本、E2E 波动、夜间任务超时、发布流水线失败等，说明测试体系仍是核心投入方向。

- [**多模型与 Token Plan 接入**](https://github.com/QwenLM/qwen-code/issues?q=is%3Aissue+Token+Plan+OR+qwen-audio)  
  语音 ASR、新模型族支持、配置文档完善，显示新能力接入正在加速。

- [**多代理 / 会话状态管理**](https://github.com/QwenLM/qwen-code/issues?q=is%3Aissue+subagent+OR+session-management+OR+todo)  
  包括 todo 状态刷新、rewind 分类、跨会话消息等，说明复杂工作流已成重要场景。

- [**安全与权限控制**](https://github.com/QwenLM/qwen-code/issues?q=is%3Aissue+label%3Acategory%2Fsecurity)  
  主要集中在凭据泄露、命令匹配绕过、依赖漏洞清理等方向。

- [**Daemon / 缓存一致性**](https://github.com/QwenLM/qwen-code/issues?q=is%3Aissue+daemon+OR+cache+OR+stale)  
  “状态陈旧”是一个高频主题，说明长连接与缓存策略是当前工程重点。

---

## 6. 开发者关注点

从今天的反馈看，开发者最在意的痛点主要是：

- **交互时序问题**：OpenTUI、Web Shell、VS Code Companion 中，输入与渲染状态不同步会直接引发提交、输出、提示显示异常。  
- **测试与 CI 成本过高**：导入耗时、E2E 抖动、夜间任务不稳定，已经影响到发布节奏和反馈速度。  
- **状态缓存过期**：Daemon、Skill、supported-commands、todo plan 等状态一旦陈旧，就会让客户端行为偏离真实情况。  
- **模型兼容性扩展**：Token Plan、qwen-audio 等新模型家族需要尽快打通链路并补齐文档。  
- **安全基线收紧**：凭据输出、命令匹配绕过、CVE 清理等，说明安全已经从“专项修补”转向“持续治理”。

---

如果你希望，我可以把这份日报进一步整理成：
1. **适合发 Slack/飞书的精简版**，或  
2. **适合内部周报的长版分析稿**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报  
**日期：2026-09-04**  
数据源：`github.com/Hmbown/DeepSeek-TUI`（以下条目按你提供的 GitHub 数据整理）

---

## 1) 今日速览

今天社区没有新 Release，但 **PR 活动明显更活跃**，4 个更新中的 PR 主要集中在 **TUI/协议集成/配置能力** 上。  
Issue 侧最受关注的是 **ACP（Agent Client Protocol）相关能力补齐**，核心诉求围绕 **session 配置暴露、session 列表与恢复**，说明生态工具接入正在成为重点。  
另外，Issues 中出现了 1 条明显与项目无关的内容，提示仓库可能需要进一步加强 **Issue 过滤与维护**。

---

## 2) 版本发布

**无新 Releases。**

---

## 3) 社区热点 Issues

> 本次数据中仅有 **3 条更新 Issue**，以下为全部条目。

### 1. [#5863 ACP Function Enhancement](https://github.com/Hmbown/Codewhale/issues/5863)
- **状态**：OPEN  
- **作者**：Lujc0523  
- **评论**：2  
- **重要性**：这是最直接的 **ACP 功能增强诉求**。用户明确指出 `serve --acp` 没有暴露 session config 选项（modes / models / configOptions），导致编辑器客户端无法展示或切换工作模式。  
- **社区反应**：有一定讨论量（2 条评论），说明问题已被多个接入方关注。  
- **看点**：如果补齐这部分能力，能显著提升与 IDE/客户端的集成体验。  
- **链接**：<https://github.com/Hmbown/Codewhale/issues/5863>

### 2. [#5864 serve --acp does not implement ACP session/list (and session/load)](https://github.com/Hmbown/Codewhale/issues/5864)
- **状态**：OPEN  
- **作者**：senka9h  
- **评论**：1  
- **重要性**：这是 ACP 场景下的另一项关键缺口：**无法枚举/恢复已有 session**。对需要连续上下文的编辑器客户端来说，这会直接影响工作流连续性。  
- **社区反应**：已有明确反馈，虽然评论不多，但问题指向非常具体，属于“协议兼容性”类高优先级需求。  
- **看点**：session/list 与 session/load 一旦补上，工具的会话管理能力会更完整。  
- **链接**：<https://github.com/Hmbown/Codewhale/issues/5864>

### 3. [#5866 Key Ophthalmology CPT & ICD-10 Updates for 2026](https://github.com/Hmbown/Codewhale/issues/5866)
- **状态**：OPEN  
- **作者**：medicalbilling-usa  
- **评论**：1  
- **重要性**：与项目主题明显不符，更像是 **垃圾/误投 Issue**。  
- **社区反应**：仅 1 条评论，影响较低，但会干扰问题追踪和维护效率。  
- **看点**：建议后续通过模板、自动标记或权限策略减少此类噪音。  
- **链接**：<https://github.com/Hmbown/Codewhale/issues/5866>

---

## 4) 重要 PR 进展

> 本次数据中仅有 **4 条更新 PR**，以下为全部条目。

### 1. [#5869 fix(shell): preserve task origin in job snapshots](https://github.com/Hmbown/Codewhale/pull/5869)
- **作者**：zhuowp  
- **重要性**：修复 shell 作业快照与完成事件缺少稳定 origin 标识的问题。  
- **价值**：当同一会话里同时存在多个 job 时，宿主端不再需要靠命令文本等启发式规则判断来源，能减少“错误输出挂到错误工具卡片”的问题。  
- **适用场景**：并发任务、长会话、多工具调用的 TUI 场景。  
- **链接**：<https://github.com/Hmbown/Codewhale/pull/5869>

### 2. [#5868 feat: send x-opencode-session header for OpenCode Go/Zen providers](https://github.com/Hmbown/Codewhale/pull/5868)
- **作者**：huangxianzhan  
- **重要性**：新增 `x-opencode-session` 请求头，增强与 OpenCode Go/Zen provider 的兼容性。  
- **价值**：有助于 **prompt caching** 和会话归因，也意味着项目在多 provider 支持上继续补强。  
- **看点**：这是偏“基础设施能力”的增强，对稳定性和供应商适配很关键。  
- **链接**：<https://github.com/Hmbown/Codewhale/pull/5868>

### 3. [#5867 feat(config): add [reasoning_only] section for retry count and custom…](https://github.com/Hmbown/Codewhale/pull/5867)
- **作者**：Gabriel-Degret  
- **重要性**：把 reasoning-only 的重试行为从硬编码改为可配置。  
- **价值**：用户可自定义重试次数，减少“模型只输出隐藏思考、不返回答案或工具调用”时的死板行为。  
- **看点**：这是直接提升模型交互可控性的配置改进。  
- **链接**：<https://github.com/Hmbown/Codewhale/pull/5867>

### 4. [#5865 refactor(tui): re-land FEAT-020 plugin command shapes on main](https://github.com/Hmbown/Codewhale/pull/5865)
- **作者**：aboimpinto  
- **重要性**：将 FEAT-020 插件命令形状重新落回主分支。  
- **价值**：说明 TUI 插件/命令体系仍在持续推进，属于架构与功能落地并行的工作。  
- **看点**：对后续命令拆分、插件扩展、TUI 交互一致性都有影响。  
- **链接**：<https://github.com/Hmbown/Codewhale/pull/5865>

---

## 5) 功能需求趋势

从本次 Issues 可提炼出社区最关注的方向：

1. **ACP / IDE 编辑器集成**
   - 社区明显在推动 `serve --acp` 的协议完整性。
   - 重点包括：session 配置暴露、session 列表、session 恢复。
   - 说明项目正在从“可用”走向“可被外部客户端稳定集成”。

2. **会话管理能力增强**
   - 需求集中在“能否查看、加载、延续已有 session”。
   - 这类能力对长上下文开发、断线恢复、多端接力尤其关键。

3. **多模型/工作模式可见性**
   - 需要把 modes / models / configOptions 暴露给客户端。
   - 体现出用户希望把模型切换和运行配置前置到 IDE/客户端层，而不是仅依赖 CLI。

4. **生态兼容性与 provider 适配**
   - PR 里已出现对 OpenCode Go/Zen 的 header 适配，说明生态兼容是持续投入方向。
   - 后续大概率还会有更多 provider/protocol 细节修补。

5. **仓库维护与噪音治理**
   - 出现与项目无关的 Issue，提示需要更强的模板、自动分类或审核机制。
   - 这是项目进入活跃期后常见的维护成本问题。

---

## 6) 开发者关注点

结合今天的反馈，开发者最需要关注的痛点主要有：

- **ACP 协议缺口**：`session/list`、`session/load`、session config 暴露不足，直接影响外部客户端接入体验。  
- **多任务场景的归因准确性**：shell job 的 origin 不稳定，会导致状态与输出错配。  
- **配置项可调性不足**：reasoning-only 的重试逻辑过去是硬编码，用户希望更可控。  
- **Provider 兼容要求提升**：对 OpenCode Go/Zen 之类 provider 的协议头支持，说明兼容性需求正在增长。  
- **维护噪音**：无关 Issue 会消耗社区维护精力，需要尽早治理。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合直接发群/邮件的精简版**，或  
2. **带“风险判断 + 后续跟进建议”的分析版**】【。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*