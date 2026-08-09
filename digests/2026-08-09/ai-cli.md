# AI CLI 工具社区动态日报 2026-08-09

> 生成时间: 2026-08-09 01:51 UTC | 覆盖工具: 9 个

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

以下为基于你提供的 9 个 AI CLI 工具日报整理的**横向对比分析报告**。

---

# AI CLI 工具生态横向对比分析（2026-08-09）

## 1) 生态全景

过去 24 小时，AI CLI 生态整体呈现出两个明显特征：**一是从“功能可用”转向“生产可托管”**，社区讨论高度集中在稳定性、长会话、后台任务、权限与跨端一致性上；**二是平台化、编排化趋势继续增强**，多代理、多会话、子 Agent、hooks、MCP、工作流引擎等能力成为共同演进方向。  
从活跃度看，**OpenAI Codex、Claude Code、Qwen Code、OpenCode、Pi、DeepSeek TUI** 的反馈最密集，说明真实用户已在高频使用并持续暴露边界问题。  
从产品阶段看，生态已经明显进入“**可靠性工程 > 新功能堆叠**”的阶段，尤其是模型兼容、上下文连续性和权限安全，正在成为所有工具的核心竞争点。  
同时，**多端协同（CLI / Desktop / IDE / Browser / Mobile）** 已不是加分项，而是用户默认预期。

---

## 2) 各工具活跃度对比

> 说明：下表中的 Issues / PR 数，均按你提供的日报中“今日重点项”统计，不代表仓库全量数量。

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 |
|---|---:|---:|---|
| Claude Code | 10 | 0 | 有，`v2.1.226` |
| OpenAI Codex | 10 | 10 | 有，`rust-v0.148.0-alpha.5` |
| Gemini CLI | 1 | 6 | 有，nightly `v0.56.0-nightly.20260809...` |
| GitHub Copilot CLI | 9 | 0 | 无 |
| Kimi Code CLI | 1 | 0 | 无 |
| OpenCode | 10 | 10 | 无 |
| Pi | 10 | 8 | 无 |
| Qwen Code | 10 | 10 | 有，`v0.21.8` |
| DeepSeek TUI / CodeWhale | 10 | 10 | 有，`v0.9.5` |

---

## 3) 共同关注的功能方向

### 1. 长会话与上下文连续性保护
多个工具都在解决“会话不能丢、历史不能断、compact 不能破坏上下文”的问题。

- **Claude Code**：scrollback 截断、切换会话后输入丢失、compaction 后 replay 风险
- **OpenAI Codex**：turn 恢复、conversation 丢失、prompt 编辑时 buffered turns
- **Pi**：reload 后上下文不一致、并发 compaction
- **Qwen Code**：Turn-based SessionRuntime、跨会话协作
- **DeepSeek TUI**：`/compact` 可用性、压缩压力一致性
- **OpenCode**：接口/界面冻结、会话与模型请求链路不稳
- **Kimi Code CLI**：失控长输出，说明缺少有效终止机制

**共同诉求**：长任务必须具备可恢复、可回溯、可中止的状态管理能力。

---

### 2. 后台任务 / Agent 生命周期可靠性
用户越来越依赖 CLI 做异步执行、后台任务、子 Agent 协作，因此“任务不能静默死亡”成为共识。

- **Claude Code**：headless 后台任务在 turn 结束时被杀死
- **OpenAI Codex**：hooks、code-mode host、child process 隔离、workload identity
- **Pi**：extension-side turn termination、RpcClient 超时/关闭控制
- **Qwen Code**：多会话协调、workflow engine 版 `/review`
- **Gemini CLI**：allow agents to call agents
- **DeepSeek TUI**：子代理身份、后台任务显示
- **OpenCode**：插件命令、subagent / MCP 生态一致性

**共同诉求**：Agent 需要从“单次请求”升级为“有生命周期的执行实体”。

---

### 3. 权限、认证与安全边界一致性
这是最广泛出现的横向主题之一。

- **Claude Code**：VS Code 扩展忽略 WebFetch/WebSearch 权限规则、伪造 `<system-reminder>` 注入
- **OpenAI Codex**：hooks 审批、guardian review、workload identity
- **Gemini CLI**：OAuth callback、sandbox crash、OpenAI-compatible auth
- **Copilot CLI**：`cli_remote_control_enabled` 不透明、`/mcp authenticate` 失败
- **Pi**：多登录、多 profile、权限测试
- **Qwen Code**：read permission tests、prompt hooks schema
- **DeepSeek TUI**：权限默认项、truthful orchestration
- **OpenCode**：permission.ask、tool definition、配置兼容

**共同诉求**：权限与认证必须“可见、可解释、跨端一致”，不能在不同入口出现行为分裂。

---

### 4. 多端协同：CLI、IDE、桌面、浏览器、移动端统一体验
多端一致性已经成为所有成熟工具的硬指标。

- **Claude Code**：Android、Chrome、VS Code、Desktop
- **OpenAI Codex**：Windows Desktop、VS Code、Chrome、macOS/iOS Remote
- **Copilot CLI**：GitHub Desktop / Codespaces / Enterprise / MCP
- **OpenCode**：Desktop / TUI / Windows Shell
- **Qwen Code**：VS Code schema、Chrome remote debugging、MCP
- **DeepSeek TUI**：TUI + Web release + route 统一
- **Gemini CLI**：站点入口反馈、对外文档入口
- **Pi**：终端 UI + 扩展生态
- **Kimi Code CLI**：主要仍聚焦 CLI 稳定性

**共同诉求**：同一能力在不同入口不能出现“看起来支持、实际失效”的情况。

---

### 5. 模型选择、Provider 兼容与路由透明度
用户不再满足于“接一个模型”，而是要求可控、可解释、可迁移。

- **Claude Code**：模型选择、fallback、子 agent 实际模型透明度
- **Copilot CLI**：Auto-mode 可配置性、模型强度控制
- **Gemini CLI**：OpenAI-compatible auth、multi-provider 接入
- **OpenCode**：DeepSeek/Moonshot/gpt-5.6 路由兼容、模型字符串污染
- **Pi**：OpenAI-compatible / DeepSeek / Cloudflare Workers AI Gateway
- **Qwen Code**：compression cache sharing，跨 provider 协同
- **DeepSeek TUI**：Mistral first-class provider route
- **OpenAI Codex**：模型/工作流的底层基础设施继续强化

**共同诉求**：模型路由、参数映射、降级逻辑必须透明，不能“表面一个模型，实际另一个行为”。

---

## 4) 差异化定位分析

### Claude Code
- **功能侧重**：稳定性修复、跨端一致性、长会话保护、权限安全
- **目标用户**：重度 agent 用户、跨端开发者、长期会话用户
- **技术路线**：CLI + Desktop + Mobile + Browser 的统一工作流
- **定位判断**：偏“通用型高频生产工具”，正在向可靠性平台演进

### OpenAI Codex
- **功能侧重**：Windows/Desktop 稳定性、Computer Use、hooks、审批、code-mode host
- **目标用户**：需要桌面自动化、浏览器联动、企业工作流的用户
- **技术路线**：基础设施驱动，强调运行时与执行模型
- **定位判断**：更像“平台型自动化编排工具”，工程化深度较强

### Gemini CLI
- **功能侧重**：认证兼容、sandbox 兼容、多代理能力、平台健壮性
- **目标用户**：偏稳健、偏实验性但需要兼容多 provider 的用户
- **技术路线**：小步快跑，持续 nightly 修复
- **定位判断**：社区热度较低，但方向偏“稳健底座 + 代理编排”

### GitHub Copilot CLI
- **功能侧重**：Auto-mode、MCP、Enterprise、Remote control 可见性、语言本地化
- **目标用户**：GitHub 生态内的专业开发者和企业团队
- **技术路线**：围绕 GitHub 工作流和企业策略深度集成
- **定位判断**：更强调企业可控性与生态整合，而非开放式平台扩展

### Kimi Code CLI
- **功能侧重**：生成稳定性、输出控制、异常熔断
- **目标用户**：CLI 轻量使用者、中文场景用户
- **技术路线**：当前更偏基础可靠性修补
- **定位判断**：社区信号少，但暴露的问题很“基础”也很关键，说明仍在打牢底盘

### OpenCode
- **功能侧重**：模型兼容、TUI/桌面体验、插件/MCP、V1/V2 迁移
- **目标用户**：重度 CLI/TUI 用户、需要多模型接入的开发者
- **技术路线**：强兼容、强扩展、强桌面体验
- **定位判断**：是当前“模型路由 + 可扩展工作台”路线最明显的项目之一

### Pi
- **功能侧重**：TUI 体验、扩展 API、多账号、多 profile、长会话、provider 兼容
- **目标用户**：高级个人用户、扩展开发者、复杂工作流用户
- **技术路线**：平台化、可编排、可扩展
- **定位判断**：非常像“面向开发者的 Agent OS 雏形”

### Qwen Code
- **功能侧重**：review 工作流、多会话协调、CI 稳定性、IDE/MCP 集成
- **目标用户**：代码审查、协作开发、自动化工作流团队
- **技术路线**：工作流引擎化、确定性增强
- **定位判断**：更强调“可预测的自动化协作”，而不是纯聊天式 CLI

### DeepSeek TUI / CodeWhale
- **功能侧重**：TUI 交互真实感、压缩稳定性、provider 路由、多代理可观测性、发布链路
- **目标用户**：重度终端用户、中文/多模型用户、需要生产级稳定性的团队
- **技术路线**：产品品牌统一 + 多 provider 扩展 + 工程可靠性修补
- **定位判断**：正在从“工具”向“可长期托管的终端工作台”过渡

---

## 5) 社区热度与成熟度

### 社区热度更高的工具
按今日 Issues/PR 密度和反馈质量看，热度较高的有：

1. **OpenAI Codex**：Issues + PR 双高，且涉及平台级问题，说明活跃度最强之一
2. **Qwen Code**：Issue 与 PR 均高，且集中在 workflow / review / multi-agent
3. **OpenCode**：问题密集，且模型兼容与桌面体验都在高频迭代
4. **Claude Code**：Issue 热度高，反映真实用户规模大、场景复杂
5. **Pi**：问题与 PR 都不少，说明社区和功能都在活跃推进
6. **DeepSeek TUI**：发布、PR、Issue 三者都活跃，迭代节奏快

### 活跃度中等但方向清晰的工具
- **Gemini CLI**：Issue 少，但 PR 持续推进，偏工程修复型
- **Copilot CLI**：Issue 有一定密度，但 PR 侧相对安静，更多是需求与体验问题
- **Kimi Code CLI**：信号最少，属于低公开互动阶段

### 成熟度判断
- **较成熟、但正经历真实生产压力**：Claude Code、OpenAI Codex、Qwen Code、OpenCode、Pi  
  特征是：问题集中在可靠性、权限、长会话、编排，而非“基础功能是否存在”
- **快速迭代中的工程型产品**：DeepSeek TUI、Gemini CLI  
  特征是：版本推进快，修复型 PR 多，正在补齐生态能力
- **社区信号较弱、仍在观察期**：Kimi Code CLI、GitHub Copilot CLI  
  特征是：讨论量较少，用户反馈更偏局部体验或基础能力

---

## 6) 值得关注的趋势信号

### 趋势 1：AI CLI 正从“聊天工具”变成“可托管执行平台”
**参考工具**：OpenAI Codex、Pi、Qwen Code、OpenCode、Claude Code  
**信号**：hooks、后台任务、subagent、workflow engine、turn lifecycle 频繁出现。  
**参考价值**：开发者需要把重点从 prompt 设计，转向执行状态、超时、恢复、编排和审计。

### 趋势 2：长会话可靠性将成为核心竞争力
**参考工具**：Claude Code、OpenAI Codex、Pi、Qwen Code、DeepSeek TUI、Kimi Code CLI  
**信号**：scrollback、compaction、turn 恢复、context 泄漏、失控长输出都在被集中修补。  
**参考价值**：未来能否稳定承载“小时级任务”会直接决定工具的生产可用性。

### 趋势 3：多端统一体验从“锦上添花”变成“准入门槛”
**参考工具**：Claude Code、OpenAI Codex、Copilot CLI、OpenCode、Qwen Code、DeepSeek TUI  
**信号**：CLI / Desktop / IDE / Browser / Mobile 的一致性问题持续暴露。  
**参考价值**：产品设计必须把跨端权限、状态同步、错误提示和操作语义统一起来。

### 趋势 4：多模型 / 多 Provider 兼容成为默认需求
**参考工具**：OpenCode、Pi、Qwen Code、DeepSeek TUI、Gemini CLI、Copilot CLI  
**信号**：DeepSeek、Mistral、OpenAI-compatible、reasoning 参数、路由透明度反复被提及。  
**参考价值**：厂商锁定正在减弱，工具层的兼容能力和路由解释能力会越来越重要。

### 趋势 5：安全与权限边界正在产品化
**参考工具**：Claude Code、OpenAI Codex、Gemini CLI、Copilot CLI、Pi、Qwen Code  
**信号**：权限规则、认证流程、提示注入、remote control、workspace isolation 都在成为高频问题。  
**参考价值**：未来竞争不只是“能不能做”，而是“是否可控、可审计、可部署”。

---

如果你愿意，我还可以继续把这份报告整理成两种版本之一：
1. **管理层一页纸摘要版**  
2. **研发团队周会用的表格版（含优先级/风险等级）**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下是基于你提供的数据整理的 **Claude Code Skills 社区热点报告**（截至 2026-08-09）。

---

## 1) 热门 Skills 排行（PR 热度最高的 5~8 个）

> 注：你给出的 PR 列表虽按评论热度排序，但评论数未显示；以下综合了列表位置、问题复杂度、跨 Issue 关联度与“是否直接影响 Skills 生产可用性”来排序。

### 1. `skill-creator` / `run_eval` 可靠性修复
- **PR**：[#1298](https://github.com/anthropics/skills/pull/1298)  
- **功能**：修复 `run_eval.py` 评估始终返回 `0% recall` 的问题，涉及 Windows 流读取、触发检测、并行 worker 等基础设施。
- **社区讨论热点**：  
  - 影响 `run_loop.py` / `improve_description.py` 的优化闭环可信度  
  - 评估信号失真，导致描述优化“在噪声上训练”
  - Windows 兼容性与并行执行稳定性
- **当前状态**：**OPEN**

### 2. 文档排版质量控制 Skill
- **PR**：[#514](https://github.com/anthropics/skills/pull/514)  
- **功能**：为 AI 生成文档提供排版质检，重点解决 orphan / widow / 编号对齐等问题。
- **社区讨论热点**：  
  - “Claude 生成的文档可读性与出版级质量”
  - 面向 Word / 报告 / 规范文档的细节一致性
- **当前状态**：**OPEN**

### 3. OpenDocument / ODT 支持 Skill
- **PR**：[#486](https://github.com/anthropics/skills/pull/486)  
- **功能**：支持 `.odt/.ods` 等 OpenDocument 格式的创建、填充、读取与转换。
- **社区讨论热点**：  
  - 开源办公生态兼容性
  - 与 LibreOffice / ODF 工作流的集成
  - 非 Microsoft Office 场景的文档生产能力
- **当前状态**：**OPEN**

### 4. `self-audit` 自检 Skill
- **PR**：[#1367](https://github.com/anthropics/skills/pull/1367)  
- **功能**：在交付前做“机械验证 + 四维推理审计”的输出质量门禁。
- **社区讨论热点**：  
  - AI 输出前的自我校验
  - 降低幻觉、漏文件、错误交付
  - 与“任务完成度验证”强相关
- **当前状态**：**OPEN**

### 5. `testing-patterns` 测试模式 Skill
- **PR**：[#723](https://github.com/anthropics/skills/pull/723)  
- **功能**：覆盖单测、组件测试、测试金字塔、命名、边界场景等完整测试实践。
- **社区讨论热点**：  
  - 如何让 Claude 更稳定地产出可执行测试
  - 前端/后端测试策略统一
  - “测试生成”是高频刚需
- **当前状态**：**OPEN**

### 6. `pyxel` 复古游戏开发 Skill
- **PR**：[#525](https://github.com/anthropics/skills/pull/525)  
- **功能**：面向 Pyxel / 像素风游戏开发，包含 write → run_and_capture → inspect → iterate 的迭代流程。
- **社区讨论热点**：  
  - 交互式开发循环
  - 视觉作品/小游戏生成工作流
  - 适合展示 Claude 在创作型任务上的能力
- **当前状态**：**OPEN**

### 7. `color-expert` 色彩专家 Skill
- **PR**：[#1302](https://github.com/anthropics/skills/pull/1302)  
- **功能**：色彩命名、色彩空间、配色、对比度与可访问性等知识集成。
- **社区讨论热点**：  
  - 设计/前端/视觉工作流里的“专业知识补齐”
  - 颜色系统选择与实际应用标准化
- **当前状态**：**OPEN**

### 8. `plan-file-hygiene` 计划文件治理 Skill
- **PR**：[#1479](https://github.com/anthropics/skills/pull/1479)  
- **功能**：治理长期任务中不断累积的 planning artifacts，强调文件生命周期。
- **社区讨论热点**：  
  - 长上下文代理的“记忆/计划文件膨胀”
  - 任务过程中临时文件的清理与归档
- **当前状态**：**OPEN**

---

## 2) 社区需求趋势

### A. 可信评估与工具链稳定性
- **Issue**：[`#556`](https://github.com/anthropics/skills/issues/556)  
- **趋势**：社区非常关注 `skill-creator` 的评估/优化闭环是否真实有效，尤其是 `run_eval.py` 的触发率与召回率准确性。
- **延伸需求**：Windows 兼容、并发 worker、子进程读取、触发检测等底层稳定性。

### B. 安全边界与信任治理
- **Issue**：[`#492`](https://github.com/anthropics/skills/issues/492)  
- **趋势**：对 `anthropic/` 命名空间下的社区技能是否会误导用户、造成信任边界滥用，社区高度敏感。
- **延伸需求**：技能来源标识、权限边界、官方/社区包的明确区分。

### C. 组织内共享与协作分发
- **Issue**：[`#228`](https://github.com/anthropics/skills/issues/228)  
- **趋势**：企业用户希望 Skills 能在组织内直接共享，不想手动导入/导出。
- **延伸需求**：共享库、直链安装、组织级权限管理。

### D. 文档类工作流仍是最大主战场
- **Issue**：[`#12`](https://github.com/anthropics/skills/issues/12)  
- **趋势**：Word / OOXML / ODT / Office 文档相关需求密集，尤其关注格式完整性、空白/排版污染、兼容性。
- **延伸需求**：更稳的文档编辑、注释、修订、格式保真。

### E. 代码审查、自检与质量门禁
- **Issue**：[`#1385`](https://github.com/anthropics/skills/issues/1385)  
- **趋势**：社区在推动“输出前审计”的多阶段质量门禁，希望 Skills 不只是会做，还要会自查、会纠错。
- **延伸需求**：推理校准、对抗式审查、交付验证。

### F. Context Window 与技能包体积控制
- **Issue**：[`#1487`](https://github.com/anthropics/skills/issues/1487)  
- **趋势**：过大的 Skill 直接吃掉上下文窗口，说明“技能轻量化、按需注入”很重要。
- **延伸需求**：资源分层、延迟加载、避免重复技能内容。

### G. 技能安装包去重与生态整洁性
- **Issue**：[`#189`](https://github.com/anthropics/skills/issues/189)  
- **趋势**：重复技能、重复内容、命名冲突会迅速降低可用性。
- **延伸需求**：统一分发规范、去重机制、插件内容边界清晰化。

---

## 3) 高潜力待合并 Skills

下面这些 PR 属于“问题明确、改动较小、对社区痛点直接”的类型，通常更容易近期落地：

### 1. `skill-creator` 的 Windows / 触发评估修复
- **PR**：[#1099](https://github.com/anthropics/skills/pull/1099)
- **原因**：直接修复 `run_eval.py` 在 Windows 下不可用的问题，属于高优先级基础设施修正。

### 2. `skill-creator` 触发检测修复
- **PR**：[#1323](https://github.com/anthropics/skills/pull/1323)
- **原因**：直指“recall=0%”的根因之一，且影响描述优化闭环，价值很明确。

### 3. 触发评估命令文件隔离
- **PR**：[#1261](https://github.com/anthropics/skills/pull/1261)
- **原因**：避免把 eval 产生的 synthetic command file 污染到真实项目注册表，属于稳定性和安全性修复。

### 4. YAML frontmatter 解析健壮性
- **PR**：[#539](https://github.com/anthropics/skills/pull/539)
- **原因**：修复 description 未加引号导致的静默解析失败，改动小但收益高。

### 5. PDF / DOCX 文档技能的文件引用与兼容性修复
- **PR**：[#538](https://github.com/anthropics/skills/pull/538)  
- **PR**：[#541](https://github.com/anthropics/skills/pull/541)
- **原因**：都是典型的文档技能“可用性修补”，对真实用户影响直接，适合快速合并。

### 6. Windows 子进程与编码问题修复
- **PR**：[#1050](https://github.com/anthropics/skills/pull/1050)
- **原因**：跨平台兼容性是社区高频痛点，且为 1 行级别修复，落地概率高。

### 7. 计划文件治理 Skill
- **PR**：[#1479](https://github.com/anthropics/skills/pull/1479)
- **原因**：贴合长任务代理的真实痛点，属于“新工作流治理”方向，容易被视作补齐生态缺口。

---

## 4) Skills 生态洞察

**一句话总结**：  
当前社区最集中的诉求是——**让 Skills 从“能用”走向“稳定、可验证、可共享、跨平台且不污染上下文”的生产级工具层**。

---

如果你愿意，我可以继续把这份报告整理成：
1. **适合发在 Slack / 飞书的短版摘要**，或  
2. **适合管理层阅读的 1 页 PPT 风格版本**。

---

# Claude Code 社区动态日报  
**日期：2026-08-09**  
数据源：`github.com/anthropics/claude-code`

---

## 1) 今日速览
今天的社区动态以**稳定性修复 + 多端/多工作流回归问题**为主：新版本 `v2.1.226` 仅写明“Bug fixes and reliability improvements”，但 Issues 侧出现了不少涉及**数据丢失、会话回放、后台任务、中断恢复、权限规则**的高影响问题。  
整体看，社区关注点正集中在 Claude Code 的**跨端一致性、长会话可靠性、权限控制与工具链集成**上。  

---

## 2) 版本发布
### `v2.1.226`
- 说明：**Bug fixes and reliability improvements**
- 链接：<https://github.com/anthropics/claude-code/releases/tag/v2.1.226>

> 这是一个偏修复型的小版本，没有披露具体功能变化，但与当天 Issues 中的大量回归/稳定性报告形成呼应。

---

## 3) 社区热点 Issues
以下为今天最值得关注的 10 个 Issue（按影响面、风险和讨论价值筛选）：

### 1. Android 端切换会话后，已输入内容被静默丢弃
- Issue：[#85131](https://github.com/anthropics/claude-code/issues/85131)
- 重要性：这是典型的**数据丢失**问题，且发生在移动端会话切换场景，影响用户连续编辑体验。
- 社区反应：**1 条评论**，说明问题已引起初步关注，但尚未形成深入讨论。

### 2. Skills 在 compaction 后被错误重放，缺少“禁用重放”的能力
- Issue：[#85138](https://github.com/anthropics/claude-code/issues/85138)
- 重要性：涉及 **post-compaction replay** 机制，且可能导致 `$ARGUMENTS` 过期后被再次执行，存在**误操作风险**。
- 社区反应：获得 **1 个赞**，说明社区对该风险点有明确共鸣。

### 3. 切回后台会话列表后，session scrollback 被截断
- Issue：[#85142](https://github.com/anthropics/claude-code/issues/85142)
- 重要性：影响长会话可追溯性，严重时只能靠 `--fork-session` 恢复，属于**上下文丢失/历史不可见**问题。
- 社区反应：刚提交，当前暂无评论，但问题描述较具体，属于高价值回归报告。

### 4. `claude-in-chrome` 的 `file_upload` 在 2.1.221 后回归
- Issue：[#85140](https://github.com/anthropics/claude-code/issues/85140)
- 重要性：直接影响 Chrome/浏览器协作链路，且是明确版本回归，可能波及**网页端文件上传自动化**。
- 社区反应：暂无评论，属于典型“功能已坏但尚未扩散讨论”的早期缺陷。

### 5. API 错误后意外跳转到 legal page
- Issue：[#85139](https://github.com/anthropics/claude-code/issues/85139)
- 重要性：错误处理路径异常，容易让用户误解为**账号/合规问题**，削弱故障可解释性。
- 社区反应：暂无评论，但问题表征清晰，具备较强复现与定位价值。

### 6. `-p` headless 模式下后台任务在 turn 结束时被静默杀死
- Issue：[#85129](https://github.com/anthropics/claude-code/issues/85129)
- 重要性：这是**自动化/批处理场景**的核心可靠性问题，直接影响 agent 和后台 Bash 任务。
- 社区反应：暂无评论，属于高优先级工作流 bug。

### 7. VS Code 扩展忽略 WebFetch/WebSearch 权限规则
- Issue：[#85119](https://github.com/anthropics/claude-code/issues/85119)
- 重要性：同一套权限策略在 CLI 与 IDE 扩展行为不一致，属于**权限模型分裂**问题。
- 社区反应：暂无评论，但对企业/受控环境用户影响很大。

### 8. daemon 托管会话中，settings.env 删除不会生效
- Issue：[#85116](https://github.com/anthropics/claude-code/issues/85116)
- 重要性：环境变量残留会导致跨会话行为不可预测，影响**后台会话、Agents View、环境隔离**。
- 社区反应：暂无评论，属于底层状态同步类问题，修复优先级通常较高。

### 9. `jj` 命令绕过 worktree isolation，误读写主 checkout
- Issue：[#85118](https://github.com/anthropics/claude-code/issues/85118)
- 重要性：这是一个**隔离失效**问题，可能导致开发者在错误仓库状态上执行操作。
- 社区反应：暂无评论，但风险明显，尤其适合多 VCS 用户关注。

### 10. 被伪造的 `<system-reminder>` 提示诱导隐藏信息
- Issue：[#85126](https://github.com/anthropics/claude-code/issues/85126)
- 重要性：这是**提示注入/安全边界**问题，影响 agent 是否会被恶意上下文误导。
- 社区反应：暂无评论，但属于安全类高敏问题，应持续跟踪。

---

## 4) 重要 PR 进展
### 过去 24 小时无 PR 更新
- PR 列表：**0 条**
- 说明：今天没有可跟进的 PR 进展，因此本栏暂无内容。
- 仓库 PR 页：<https://github.com/anthropics/claude-code/pulls>

---

## 5) 功能需求趋势
从今天的 Issues 看，社区最关注的功能方向主要有：

### 1. 会话状态与历史保护
- 代表问题：[#85131](https://github.com/anthropics/claude-code/issues/85131)、[#85142](https://github.com/anthropics/claude-code/issues/85142)、[#85123](https://github.com/anthropics/claude-code/issues/85123)
- 趋势：用户希望**草稿、scrollback、plan review、长会话上下文**更稳，不要因为切换、compact 或 UI 流程丢失状态。

### 2. 后台任务 / Agent 生命周期可靠性
- 代表问题：[#85129](https://github.com/anthropics/claude-code/issues/85129)、[#85124](https://github.com/anthropics/claude-code/issues/85124)
- 趋势：用户越来越依赖 Claude Code 做**自动化执行、后台跑任务、子 Agent 协作**，因此“任务不能被静默杀死”成为刚需。

### 3. 权限与安全策略一致性
- 代表问题：[#85119](https://github.com/anthropics/claude-code/issues/85119)、[#85126](https://github.com/anthropics/claude-code/issues/85126)、[#85127](https://github.com/anthropics/claude-code/issues/85127)
- 趋势：社区希望 CLI、VS Code、Desktop、Web 的**权限规则统一**，并提升对提示注入和合规边界的防护能力。

### 4. 浏览器 / 移动端 / 桌面端多端协同
- 代表问题：[#85140](https://github.com/anthropics/claude-code/issues/85140)、[#85136](https://github.com/anthropics/claude-code/issues/85136)、[#85131](https://github.com/anthropics/claude-code/issues/85131)
- 趋势：Claude Code 已不只是 CLI，用户明显在关注**Chrome 扩展、Android、Desktop、Web 环境**的一致性与稳定性。

### 5. 模型选择、fallback 与路由透明度
- 代表问题：[#85120](https://github.com/anthropics/claude-code/issues/85120)、[#85134](https://github.com/anthropics/claude-code/issues/85134)、[#85137](https://github.com/anthropics/claude-code/issues/85137)
- 趋势：用户开始要求更明确的**模型选择、降级逻辑、子 agent 实际模型展示**，避免“看起来是一个模型，实际跑的是另一个”。

### 6. 工作区隔离与多 VCS 兼容
- 代表问题：[#85118](https://github.com/anthropics/claude-code/issues/85118)
- 趋势：隔离能力不再只对 Git 生效，用户希望对 **jj、worktree、混合仓库结构** 也有一致保护。

---

## 6) 开发者关注点
今天的开发者反馈中，最突出的痛点有：

- **数据不能丢**：草稿、scrollback、plan 内容、compact 前后上下文都在被反复提及。  
  - 参考：[#85131](https://github.com/anthropics/claude-code/issues/85131)、[#85142](https://github.com/anthropics/claude-code/issues/85142)、[#85123](https://github.com/anthropics/claude-code/issues/85123)

- **后台/异步任务要可恢复、可观察**：headless、subagent、background job 不能在 turn 结束时被无提示中断。  
  - 参考：[#85129](https://github.com/anthropics/claude-code/issues/85129)、[#85124](https://github.com/anthropics/claude-code/issues/85124)

- **权限模型必须跨端一致**：CLI、VS Code、Desktop、Web 的权限规则不一致，会直接削弱信任。  
  - 参考：[#85119](https://github.com/anthropics/claude-code/issues/85119)、[#85127](https://github.com/anthropics/claude-code/issues/85127)

- **安全边界要更清晰**：提示注入、伪系统消息、误导性回退行为，正在成为高敏问题。  
  - 参考：[#85126](https://github.com/anthropics/claude-code/issues/85126)、[#85120](https://github.com/anthropics/claude-code/issues/85120)

- **环境与隔离状态要可预测**：env 删除不生效、worktree/jj 隔离失效，都会让开发者对运行环境失去信心。  
  - 参考：[#85116](https://github.com/anthropics/claude-code/issues/85116)、[#85118](https://github.com/anthropics/claude-code/issues/85118)

---

如果你愿意，我可以把这份日报进一步整理成：
1. **适合发微信群/飞书的短版**，或  
2. **适合管理层阅读的摘要版**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# 2026-08-09 OpenAI Codex 社区动态日报

## 1) 今日速览
今天的社区讨论明显集中在 **Windows 桌面端稳定性** 和 **长会话/工具调用可靠性** 上，尤其是连接、沙箱、会话恢复、实时语音与 Computer Use 等高频场景。  
同时，仓库在底层能力上继续推进 **hooks、审批、身份认证、子进程隔离、gRPC code-mode host** 等基础设施改造，说明团队一边修稳定性，一边补平台能力。  
- Release：`rust-v0.148.0-alpha.5`（[查看](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.5)）

---

## 2) 版本发布
### `rust-v0.148.0-alpha.5`
- 过去 24 小时内发布了一个 Rust alpha 版本。
- 数据中未提供完整 changelog，但从当天合并的 PR 看，这个版本大概率聚焦在：
  - hooks 执行模型与异步命令钩子
  - 命令审批规则与 step 上下文
  - workload identity / launch context 隔离
  - code-mode host 与 gRPC 生命周期
  - prompt 编辑与缓冲 turns 处理

> 说明：以上是根据同期 PR 变更进行的功能侧推断，非官方 release note 原文。  
- [Release 页面](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.5)

---

## 3) 社区热点 Issues

### 1. [#37626](https://github.com/openai/codex/issues/37626)  
**ChatGPT Desktop Work Mode 无法稳定连接 Chrome**
- **为什么重要**：浏览器联动是桌面 Work Mode 的核心能力，这个问题直接影响跨应用自动化。
- **社区反应**：3 条评论，属于当日评论数最高的一批；说明问题复现明确、且用户已提供环境信息，关注度较高。

### 2. [#37635](https://github.com/openai/codex/issues/37635)  
**TUI 恢复时反复重绘终端回滚内容**
- **为什么重要**：影响 CLI 的可读性和体验，尤其在长历史/分页恢复时容易卡顿或闪烁。
- **社区反应**：2 条评论，属于有一定复现价值的性能/渲染类问题，通常会被快速跟进。

### 3. [#37633](https://github.com/openai/codex/issues/37633)  
**希望支持 ChatGPT Sites 仓库作为临时 Codex 云工作区**
- **为什么重要**：这是对 Codex 云工作区模型的扩展诉求，涉及 Sites 与 GitHub 工作流打通。
- **社区反应**：2 条评论，说明该需求具有明确场景，且与产品边界有关，讨论价值较高。

### 4. [#37627](https://github.com/openai/codex/issues/37627)  
**Windows VS Code 扩展里 `view_image` 偶发拒绝本地 PNG**
- **为什么重要**：直接影响图像工具调用，且发生在“原始 detail payload 构造之后”，排查链路较深。
- **社区反应**：2 条评论，属于工具调用链路上的顽固型 bug，开发者容易关注。

### 5. [#37620](https://github.com/openai/codex/issues/37620)  
**macOS/iOS Remote 的 turn 没有进入下一次桌面端上下文**
- **为什么重要**：跨设备协同场景下会造成上下文断裂，影响连续任务执行。
- **社区反应**：2 条评论，说明这是移动端到桌面端同步链路上的真实痛点。

### 6. [#37616](https://github.com/openai/codex/issues/37616)  
**Windows 桌面应用启动冻结：config.toml 中 MCP Windows 路径导致 TOML 解析失败**
- **为什么重要**：启动即崩/冻结属于高优先级可用性问题，而且由配置解析触发，影响面广。
- **社区反应**：2 条评论，属于典型“配置即故障”的阻断型 bug。

### 7. [#37599](https://github.com/openai/codex/issues/37599)  
**Windows 上 codex-code-mode-host 会弹出可见的 Windows Terminal 窗口**
- **为什么重要**：这破坏了“隐式/后台执行”的产品预期，也可能影响企业桌面环境。
- **社区反应**：2 条评论，说明问题虽不一定致命，但体验反差明显。

### 8. [#37595](https://github.com/openai/codex/issues/37595)  
**Computer Use 的 list_windows/list_apps 因 EnumWindows 0x80070003 失败**
- **为什么重要**：Computer Use 是自动化能力的关键组件，窗口枚举失败会让能力直接不可用。
- **社区反应**：2 条评论，属于“基础系统调用失败”类问题，排查价值高。

### 9. [#37650](https://github.com/openai/codex/issues/37650)  
**ChatGPT Work 维护导致未提交代码丢失，且无恢复快照**
- **为什么重要**：这是数据安全/工作丢失问题，属于最高敏感级别之一。
- **社区反应**：1 条评论但影响极大；即使互动不多，也会被视为严重可靠性缺陷。

### 10. [#37649](https://github.com/openai/codex/issues/37649)  
**CLI 在 macOS 上频繁重连并报 “stream disconnected before completion”**
- **为什么重要**：流式连接不稳定会直接打断简单提示词执行，是基础链路问题。
- **社区反应**：1 条评论，但描述清晰，且涉及最常用的 CLI 使用路径。

---

## 4) 重要 PR 进展

### 1. [#37645](https://github.com/openai/codex/pull/37645)  
**Improve plugin install failure analytics**
- 增强插件安装失败分析，补充更稳定、低基数的错误分类，便于定位远端目录、变更和下载失败原因。

### 2. [#37644](https://github.com/openai/codex/pull/37644)  
**Generalize hook handler execution**
- 将 hook handler 处理抽象为统一执行模型，保留 command hook 行为，同时加强 TOML/trust hashing 兼容性。

### 3. [#37641](https://github.com/openai/codex/pull/37641)  
**Use the step context for command approval prefix rules**
- 命令审批前缀规则改为从当前 step 上下文读取，避免使用过期 turn 数据。

### 4. [#37622](https://github.com/openai/codex/pull/37622)  
**Include buffered turns when editing prompts**
- 编辑 prompt 时补上 replay buffer 中尚未落盘的 turns，避免“选不到刚刚输入的消息”。

### 5. [#37618](https://github.com/openai/codex/pull/37618)  
**Use step environments for Guardian approval reviews**
- Guardian 审批改用当前 step 的环境，避免取到旧的 turn 快照。

### 6. [#37610](https://github.com/openai/codex/pull/37610)  
**Add workload identity token exchange support**
- 增加 workload identity 令牌交换能力，并支持缓存、刷新与并发合并请求。

### 7. [#37607](https://github.com/openai/codex/pull/37607)  
**Prevent launch context from reaching child processes**
- 阻止 Codex 启动上下文泄漏到子进程，强化身份与运行上下文隔离。

### 8. [#37538](https://github.com/openai/codex/pull/37538)  
**Expose execution mode in hook listings**
- 在 hook 列表中暴露执行模式（sync/async），提升配置透明度。

### 9. [#37533](https://github.com/openai/codex/pull/37533)  
**Support asynchronous command hooks**
- 支持异步命令 hooks，并加入会话级并发限制，提升后台处理能力。

### 10. [#37530](https://github.com/openai/codex/pull/37530)  
**Implement the gRPC code-mode host service**
- 实现 gRPC code-mode host 服务，支持会话租约、执行/等待生命周期、嵌套 tool-call 订阅等能力。

---

## 5) 功能需求趋势
从过去 24 小时的 Issues 看，社区关注点主要集中在以下方向：

1. **Windows 桌面端稳定性**
   - 启动冻结、沙箱初始化失败、Terminal 弹窗、GPU 占用高、窗口枚举失败等问题集中出现。
   - 说明 Windows 仍是本轮反馈最密集的平台。

2. **浏览器与 IDE 集成**
   - 包括 Chrome 连接稳定性、Brave profile 导入、VS Code 图像工具链异常、browser sandbox 失败。
   - 用户希望 Codex 在“浏览器 + 编辑器”场景中更顺滑。

3. **长会话与上下文连续性**
   - 涉及 turn 丢失、会话恢复重绘、OS shutdown 后 conversation 消失、context 快速膨胀与 auto-compaction。
   - 表明长任务执行下的状态一致性仍是核心诉求。

4. **Computer Use / 远程控制可靠性**
   - Windows/macOS 上的窗口控制、RDP 控制权、应用列表枚举等问题都在被反复提及。
   - 社区期待更稳定的“可操作桌面”能力。

5. **实时语音与流式通信**
   - realtime voice、stream disconnected、reconnect loop 等问题显示实时链路稳定性仍不足。

6. **更细粒度的模型与工作流控制**
   - 有人希望自动 PR review 可选模型，也有人抱怨 goal/subagent 工作流过度扩展 scaffolding。
   - 说明用户希望“能控、可解释、可定制”的工作流编排。

---

## 6) 开发者关注点
综合社区反馈，开发者最常遇到的痛点可以归纳为：

- **Windows 兼容性问题密集**：配置解析、沙箱、窗口枚举、Terminal 行为、GPU 占用等都在报错。
- **会话/流式连接不稳定**：`stream disconnected before completion`、reconnect loop、实时语音 thread 失败较多。
- **数据与状态持久化风险**：维护或关机后丢失未提交代码、conversation 消失，属于高优先级信任问题。
- **工具调用可靠性不足**：`view_image`、Computer Use、browser sandbox、MCP 路径等链路存在偶发失败。
- **上下文膨胀与恢复成本高**：长任务容易触发 auto-compaction、重绘、上下文缺失，影响连续开发。
- **用户想要更强的可控性**：包括模型选择、浏览器支持扩展、只读连接器、工作区更灵活的接入方式。

--- 

如果你希望，我也可以把这份日报再整理成 **“管理层摘要版”** 或 **“适合发群里的精简版”**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# 2026-08-09 Gemini CLI 社区动态日报

> 数据范围：过去 24 小时更新项。  
> 今日**仅检索到 1 条 Issue、6 条 PR**，因此以下按实际更新全部列出。

## 1. 今日速览
- 今日社区动态以 **nightly 版本推进** 和 **稳定性/兼容性修复** 为主，PR 重点集中在认证、路径解析、输出保护以及多代理能力扩展上。  
- Issues 侧更新较少，说明公开讨论热度不高，但对 **文档/站点入口** 的反馈仍在持续。  
- 整体来看，Gemini CLI 当前更偏向“**增强可用性与健壮性**”，而不是大规模新增 UI 或工作流功能。

## 2. 版本发布
- [v0.56.0-nightly.20260809.gcf22ac7e8](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260808.gcf22ac7e8...v0.56.0-nightly.20260809.gcf22ac7e8)  
  这是一次自动化 nightly 发布，公开信息仅展示了与前一 nightly 的差异范围，未提供完整 changelog。结合当日 PR 主题，可判断本次版本主要承接了认证、平台兼容和运行时稳定性方面的持续修复。

## 3. 社区热点 Issues
> 今日仅有 1 条更新 Issue，以下为全部。

1. [#28733 GeminiCLI.com Feedback: ISSUE](https://github.com/google-gemini/gemini-cli/issues/28733)  
   - **为什么重要**：来自 geminicli.com 的用户反馈入口，属于面向新用户的外部触点，直接影响文档可用性与产品认知。  
   - **社区反应**：当前仅 1 条评论、0 赞，且已被机器人标记为 `need-information`，说明问题描述较弱，仍需补充复现细节。  
   - **标签信号**：`priority/p3`, `area/documentation`, `status/bot-triaged`.

## 4. 重要 PR 进展
> 今日仅有 6 条更新 PR，以下为全部。

1. [#28738 Allow agents to call agents](https://github.com/google-gemini/gemini-cli/pull/28738)  
   - **重点**：允许子代理继续调用其他子代理，甚至递归调用自身。  
   - **价值**：这是明显的多代理编排增强，适合复杂任务拆解与分层执行。  
   - **状态信号**：`priority/p2`, `area/agent`, `size/l`, `help wanted`.

2. [#28734 fix(core): handle EACCES in resolveToRealPath to prevent sandbox crash](https://github.com/google-gemini/gemini-cli/pull/28734)  
   - **重点**：处理 `resolveToRealPath` 的 `EACCES` 异常，避免 macOS Seatbelt sandbox 场景下启动崩溃。  
   - **价值**：属于高优先级平台兼容修复，直接影响 CLI 启动可靠性。  
   - **状态信号**：`priority/p1`, `area/platform`.

3. [#28736 fix(core): ensure oauth callback timeout is cleared when flow completes](https://github.com/google-gemini/gemini-cli/pull/28736)  
   - **重点**：OAuth 回调流程完成后清理超时计时器，并更稳妥地关闭服务。  
   - **价值**：提升认证流程稳定性，减少完成后仍悬挂的定时器/资源泄漏风险。  
   - **状态信号**：`area/security`, `size/s`.

4. [#28735 fix(core): ensure formatTruncatedToolOutput returns unchanged content for non-positive maxChars](https://github.com/google-gemini/gemini-cli/pull/28735)  
   - **重点**：当 `maxChars <= 0` 时直接返回原内容，避免输出被意外放大。  
   - **价值**：这是一个偏底层但很关键的边界条件修复，能防止工具输出格式化异常。  
   - **状态信号**：`priority/p1`, `area/core`, `size/xs`.

5. [#28739 chore/release: bump version to 0.56.0-nightly.20260809.gcf22ac7e8](https://github.com/google-gemini/gemini-cli/pull/28739)  
   - **重点**：自动化 nightly 版本号更新。  
   - **价值**：反映发布流水线正常推进，为后续变更追踪提供版本锚点。  
   - **状态信号**：`size/s`, 自动化维护类改动。

6. [#28737 Feat/OpenAI compatible auth](https://github.com/google-gemini/gemini-cli/pull/28737)  
   - **重点**：OpenAI 兼容认证方向。  
   - **价值**：体现社区对多供应商/多模型认证兼容的需求。  
   - **状态信号**：该 PR 已关闭，说明这一方向已进入收敛或评审阶段，后续实现路径值得继续跟踪。  
   - **状态信号**：`size/xl`.

## 5. 功能需求趋势
> 结合今日更新内容，社区关注点主要集中在以下几个方向。

1. **多代理 / 子代理编排能力**  
   - 代表 PR：[#28738](https://github.com/google-gemini/gemini-cli/pull/28738)  
   - 趋势判断：用户希望 Gemini CLI 不只是单代理执行，而是能支持更复杂的任务分发与递归协作。

2. **认证兼容与外部模型生态接入**  
   - 代表 PR：[#28736](https://github.com/google-gemini/gemini-cli/pull/28736)、[#28737](https://github.com/google-gemini/gemini-cli/pull/28737)  
   - 趋势判断：OpenAI-compatible auth 这类诉求说明社区对“多 provider 兼容”有持续需求。

3. **稳定性与容错能力**  
   - 代表 PR：[#28734](https://github.com/google-gemini/gemini-cli/pull/28734)、[#28735](https://github.com/google-gemini/gemini-cli/pull/28735)、[#28736](https://github.com/google-gemini/gemini-cli/pull/28736)  
   - 趋势判断：当前更多需求不是“新功能”，而是“别崩、别错、别卡住”。

4. **文档 / 对外入口体验**  
   - 代表 Issue：[#28733](https://github.com/google-gemini/gemini-cli/issues/28733)  
   - 趋势判断：外部站点反馈仍会影响用户第一印象，尤其是说明文档、分享和反馈入口。

## 6. 开发者关注点
1. **macOS / sandbox 兼容问题**  
   - 代表 PR：[#28734](https://github.com/google-gemini/gemini-cli/pull/28734)  
   - 痛点：路径解析在受限环境下容易触发启动崩溃，需要更稳健的异常兜底。

2. **认证流程的资源清理与可靠性**  
   - 代表 PR：[#28736](https://github.com/google-gemini/gemini-cli/pull/28736)  
   - 痛点：认证成功后仍残留超时器或回调服务，会影响体验并增加排障成本。

3. **工具输出边界条件处理**  
   - 代表 PR：[#28735](https://github.com/google-gemini/gemini-cli/pull/28735)  
   - 痛点：输出格式化在极端参数下要保持“原样返回”或“安全截断”，避免二次损坏数据。

4. **代理协作复杂度上升**  
   - 代表 PR：[#28738](https://github.com/google-gemini/gemini-cli/pull/28738)  
   - 痛点：当任务拆分进入多层代理协作后，权限、调用链和递归控制都需要更精细设计。

5. **用户反馈信息不足**  
   - 代表 Issue：[#28733](https://github.com/google-gemini/gemini-cli/issues/28733)  
   - 痛点：外部反馈常常过于简略，导致 `need-information` 增多，影响问题定位效率。

如果你希望，我可以把这份日报进一步整理成 **“适合群发/邮件的简版”**，或者输出为 **Markdown 表格版**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# 2026-08-09 GitHub Copilot CLI 社区动态日报

## 1. 今日速览
今天 **没有新的 Release**，社区讨论几乎全部集中在 Issues。最值得关注的是两类信号：一是 **Auto-mode 的可配置性** 被重复提起，说明用户希望更细粒度地控制模型选择；二是 **Agent / MCP / 权限与认证** 相关问题较集中，体现出当前产品在企业场景和可观测性上仍有不少痛点。  
整体来看，今天的社区互动强度不高，绝大多数 Issue 都是 **0 👍、0~1 条评论**，但问题指向比较明确，适合优先排查高频体验缺口。

## 2. 版本发布
过去 24 小时 **无新 Release**。

## 3. 社区热点 Issues
> 说明：本日报共收到 9 条更新 Issue，以下覆盖全部重点项。

- **[#4412 Auto-mode range and settings feature idea](https://github.com/github/copilot-cli/issues/4412)**  
  重要性：与 #4411 属于同一类诉求，用户希望给 Auto-mode 增加“最小/最大模型强度、偏置”等本地控制能力。  
  社区反应：0 评论、0 👍，但与同主题重复出现，说明需求有持续性。

- **[#4411 Auto-mode feature idea](https://github.com/github/copilot-cli/issues/4411)**  
  重要性：同样聚焦 Auto-mode 的模型选择策略，且已被标记为 `closed / invalid`，但需求本身很明确。  
  社区反应：1 条评论、0 👍；更像是“需求表达不充分/提案形式不合规”，而非需求不存在。

- **[#4410 Bug: /agent pop-up treats .github\\agents\\AGENTS.md as a custom agent](https://github.com/github/copilot-cli/issues/4410)**  
  重要性：影响 `/agent` 对仓库指导文件的识别，属于会直接干扰工作流的实用型 bug。  
  社区反应：1 条评论、0 👍；说明问题已被注意，但仍处于早期排查阶段。

- **[#4409 No indication when `cli_remote_control_enabled` is false](https://github.com/github/copilot-cli/issues/4409)**  
  重要性：这是典型的“权限/能力开关不透明”问题，功能看似可用，实际在后台被禁用，容易导致误判和支持成本上升。  
  社区反应：0 评论、0 👍；但从描述看，属于高影响的可用性问题。

- **[#4408 `github-mcp-server`: /mcp authenticate always fails on Copilot Enterprise](https://github.com/github/copilot-cli/issues/4408)**  
  重要性：直接影响 Enterprise 场景下的 MCP 接入，属于企业用户高优先级阻塞项。  
  社区反应：0 评论、0 👍；但问题具有明确复现路径，技术定位价值高。

- **[#4405 Copilot Free in GitHub Codespaces: "No model available" after update](https://github.com/github/copilot-cli/issues/4405)**  
  重要性：涉及 Codespaces、Copilot Free、模型策略与 token 隔离，牵涉面广，可能影响基础可用性。  
  社区反应：0 评论、0 👍；属于“核心功能失效”级别反馈。

- **[#4407 Add Chinese (zh-CN) UI localization for the GitHub Copilot desktop app](https://github.com/github/copilot-cli/issues/4407)**  
  重要性：反映国际化需求，尤其是中文界面支持，对全球化和本地化落地有直接意义。  
  社区反应：0 评论、0 👍；需求明确但尚未形成讨论热度。

- **[#4406 Let](https://github.com/github/copilot-cli/issues/4406)**  
  重要性：内容明显无效，已被关闭为 `invalid`。  
  社区反应：1 条评论、0 👍；更像噪声 issue，提示仓库需要持续治理。

- **[#4404 عاب](https://github.com/github/copilot-cli/issues/4404)**  
  重要性：同样属于无效/噪声内容，已关闭。  
  社区反应：1 条评论、0 👍；对产品无实质信号，但会占用维护者注意力。

## 4. 重要 PR 进展
过去 24 小时 **无更新 PR（共 0 条）**，因此本日报不列出 PR 进展。

## 5. 功能需求趋势
从今日 Issues 看，社区关注点主要集中在以下方向：

1. **Auto-mode 可配置性增强**  
   用户希望对模型强度、偏好和选择策略进行本地控制，而不是完全交给自动模式。  
   代表：[#4412](https://github.com/github/copilot-cli/issues/4412)、[#4411](https://github.com/github/copilot-cli/issues/4411)

2. **Agent / MCP 集成可靠性**  
   `/agent`、`/mcp`、认证流程、仓库指导文件识别等问题频出，说明新一代交互入口正在快速进入实用阶段，但稳定性仍需打磨。  
   代表：[#4410](https://github.com/github/copilot-cli/issues/4410)、[#4408](https://github.com/github/copilot-cli/issues/4408)

3. **权限、策略与可见性**  
   用户希望系统在能力受限时能给出明确提示，而不是静默失败或返回抽象错误。  
   代表：[#4409](https://github.com/github/copilot-cli/issues/4409)、[#4405](https://github.com/github/copilot-cli/issues/4405)

4. **企业场景兼容性**  
   Enterprise 路由、MCP 授权、Codespaces Free 等场景暴露出配置差异和兼容性边界。  
   代表：[#4408](https://github.com/github/copilot-cli/issues/4408)、[#4405](https://github.com/github/copilot-cli/issues/4405)

5. **国际化 / 本地化支持**  
   中文 UI 诉求明确，说明非英语用户的使用门槛仍然较高。  
   代表：[#4407](https://github.com/github/copilot-cli/issues/4407)

## 6. 开发者关注点
今天的开发者反馈，核心痛点可以概括为四类：

- **错误信息不够透明**：权限关闭、模型不可用、认证失败时，缺少明确可操作的提示。  
- **新入口稳定性不足**：`/agent`、`/mcp` 等新能力已开始承载真实工作流，但边界条件处理还不够稳。  
- **模型与策略控制需求增强**：用户希望对 Auto-mode、模型选择、偏好策略有更细颗粒度的控制。  
- **企业与国际化需求上升**：Enterprise 兼容、中文 UI、本地化体验开始成为可见诉求，而不只是“加分项”。

如果你愿意，我也可以把这份日报进一步整理成 **适合发到团队周报/Slack 的精简版**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

以下为基于 **2026-08-09** 过去 24 小时 GitHub 数据生成的 **Kimi Code CLI 社区动态日报**（数据源：`github.com/MoonshotAI/kimi-cli`）。

---

## 1. 今日速览

- 过去 24 小时内，**没有新的 Releases**，社区活跃度主要集中在 **1 条高严重度 Issue** 上：一次交互式会话中出现了 **LLM 失控式长输出**，单步生成持续 53 分钟并输出 8.8 万 token 的乱码内容。
- 本期 **没有 PR 更新**，因此开发侧公开进展较少；当前最值得关注的是 **生成稳定性、输出控制和异常终止机制** 是否存在缺口。

---

## 2. 版本发布

- **暂无新版本发布**  
  过去 24 小时未发现 Releases 更新。  
  项目链接：<https://github.com/MoonshotAI/kimi-cli>

---

## 3. 社区热点 Issues

> 说明：过去 24 小时内仅更新了 **1 条 Issue**，因此本节列出全部重点问题。

### Issue #2597：Bug - Runaway garbled generation（单步生成失控，88k tokens 乱码）
- **链接**：<https://github.com/MoonshotAI/kimi-cli/issues/2597>
- **重要性**：  
  这是一个典型的 **高严重度稳定性问题**。在正常交互会话中，模型单步生成持续约 **3214 秒（53 分钟）**，输出 **88,114 tokens** 的无意义、多语言混杂乱码，说明生成流程可能缺乏有效的 **长度约束、异常检测、终止策略** 或 **输出清洗**。
- **社区反应**：  
  目前该 Issue **0 评论、0 👍**，说明它更像是一个新近报障或单点严重故障记录，尚未在社区内形成讨论热度；但从影响面看，它对 **成本、可用性、用户体验** 都有直接冲击，应优先排查。
- **关注点**：  
  - 是否存在 token 上限/stop 条件失效  
  - 是否在某些上下文下触发了重复循环  
  - 是否缺少 watchdog 或超时中断  
  - 是否需要对异常输出做自动熔断  
- **相关链接**：<https://github.com/MoonshotAI/kimi-cli/issues/2597>

---

## 4. 重要 PR 进展

- **过去 24 小时无 PR 更新**  
  本期没有可分析的 PR，因此暂无重要功能或修复进展可列出。  
  项目链接：<https://github.com/MoonshotAI/kimi-cli>

---

## 5. 功能需求趋势

> 由于过去 24 小时仅有 1 条 Issue 更新，以下趋势为基于该问题提炼的“近期关注方向”。

1. **生成稳定性与异常控制**
   - 社区当前最明显的关注点是：CLI 在长上下文或异常响应下，是否能可靠地 **停止失控输出**。
   - 对应方向：超时中断、重复内容检测、自动终止、输出预算控制。  
   - 相关链接：<https://github.com/MoonshotAI/kimi-cli/issues/2597>

2. **输出质量与可读性保障**
   - 乱码、重复、跨语言碎片化输出表明社区需要更强的 **响应质量守护**，尤其是在命令行场景中，异常输出会迅速放大为可用性问题。  
   - 相关链接：<https://github.com/MoonshotAI/kimi-cli/issues/2597>

3. **成本与资源保护**
   - 8.8 万 token 的单步输出意味着潜在的 **推理成本异常** 与本地/远端资源消耗风险。  
   - 社区可能期望 CLI 提供更严格的 **token 保护阈值**、**失败回退** 和 **异常终止策略**。  
   - 相关链接：<https://github.com/MoonshotAI/kimi-cli/issues/2597>

---

## 6. 开发者关注点

- **高优先级痛点：长输出失控**
  - 这是最明确的开发者反馈信号：CLI 的生成链路需要更强的 **防跑飞机制**。
- **需要补齐的工程能力**
  - **超时控制**：避免一次 LLM 调用占用过长时间  
  - **token 预算**：限制单步输出上限  
  - **重复/乱码检测**：识别异常模式并主动终止  
  - **错误可观测性**：保留足够日志定位触发条件  
- **当前社区需求倾向**
  - 与其说在追求新功能，不如说更关注 **基础可靠性**：让 Kimi Code CLI 在真实开发流程中“不会失控”。

---

如需，我也可以把这份日报进一步整理成：
1. **适合发微信群/飞书的短版**，或  
2. **适合团队周报系统的 Markdown 模板版**。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-08-09）

## 1. 今日速览
过去 24 小时 **没有新 Release**，社区讨论重心几乎都落在 **模型接入稳定性** 和 **桌面/TUI 回归修复** 上。  
其中最突出的信号是：**OpenCode Go + deepseek-v4-flash** 相关问题被多条 Issue 交叉复现，说明是链路级兼容性问题，而非个别环境异常。  
同时，V2 迁移、插件命令、输入焦点、Windows Shell 发现等可用性问题继续冒头，项目当前明显处在“**修稳定、保兼容**”阶段。

---

## 2. 社区热点 Issues

### 1) [#41300](https://github.com/anomalyco/opencode/issues/41300) [OPEN] [Bug] Leading space in model name when using opencode-go/deepseek-v4-flash
- **为什么重要**：这是一个直接导致 **HTTP 400** 的模型路由问题，且错误信息显示模型名被前置空格污染，属于核心请求链路故障。
- **社区反应**：4 条评论、1 个赞，且后续多个 Issue 形成相互印证，说明复现明确、影响面不小。

### 2) [#41306](https://github.com/anomalyco/opencode/issues/41306) [OPEN] deepseek-v4-flash still broken on Console Go after #41211
- **为什么重要**：明确指出 #41211 关闭后问题仍存在，并给出 2026-08-09 的有效复现证据，属于“修复未真正生效”的典型案例。
- **社区反应**：3 条评论，社区已开始按“持续故障”追踪，而不是单次报错。

### 3) [#41314](https://github.com/anomalyco/opencode/issues/41314) [OPEN] OpenCode Go relay injects leading space into model string for deepseek-v4-flash
- **为什么重要**：把根因进一步指向 **relay 层模型字符串注入空格**，直接影响 OpenCode Go 的模型调用可靠性。
- **社区反应**：2 条评论，和 #41300/#41306/#41322 构成强关联证据链。

### 4) [#41322](https://github.com/anomalyco/opencode/issues/41322) [OPEN] OpenCode Go rejects documented deepseek-v4-flash ID via direct API call
- **为什么重要**：即使绕过 Hermes、直接调用 API 仍失败，说明问题不在客户端封装，而在 **服务端/网关兼容层**。
- **社区反应**：2 条评论、1 个赞，用户明显关注“文档写得能用，但实际用不了”的问题。

### 5) [#41273](https://github.com/anomalyco/opencode/issues/41273) [OPEN] Moonshot/Kimi models hang or fail in OpenCode while direct streaming via cURL works
- **为什么重要**：同一模型在 OpenCode 内异常、cURL 正常，说明是 **OpenCode 请求构造或流式处理** 出问题。
- **社区反应**：2 条评论，且问题覆盖 built-in 模型和直接流式测试，影响开发者信任。

### 6) [#41346](https://github.com/anomalyco/opencode/issues/41346) [OPEN] [2.0] server: V1 data migration fails with SQLite syntax error on every start
- **为什么重要**：V2 服务启动时迁移失败且“每次启动都失败”，属于 **数据迁移阻断型** 问题。
- **社区反应**：1 条评论，但问题严重性高，属于会直接影响升级路径的故障。

### 7) [#41345](https://github.com/anomalyco/opencode/issues/41345) [OPEN] Models Not Responding / Interface Freezes When Sending Any Prompt
- **为什么重要**：这是最典型的 **整机级不可用** 反馈：发任何 prompt 后界面卡死，没有模型响应。
- **社区反应**：虽然当前评论不多，但它属于高优先级用户阻断问题。

### 8) [#41337](https://github.com/anomalyco/opencode/issues/41337) [OPEN] bun process consumes a large amount of CPU after hibernation
- **为什么重要**：休眠恢复后 Bun 进程高 CPU，说明存在 **运行时/后台进程恢复** 问题，容易引发性能和电量投诉。
- **社区反应**：2 条评论，且明确指向 Bun 已知问题，社区倾向于把它视为平台级兼容风险。

### 9) [#41321](https://github.com/anomalyco/opencode/issues/41321) [OPEN] [Windows] Shell discovery ignores the PowerShell 7 MSIX App Execution Alias
- **为什么重要**：Windows 下找不到 MSIX 版 PowerShell 7，会影响命令执行、Shell 体验和默认环境识别。
- **社区反应**：2 条评论，属于典型的跨平台适配问题。

### 10) [#41339](https://github.com/anomalyco/opencode/issues/41339) [CLOSED] Plugin slash commands pass through as raw text in OpenCode Desktop v1.18.15
- **为什么重要**：这是一个 **Desktop 回归**，会让插件 slash command 失效，直接破坏插件工作流。
- **社区反应**：2 条评论，且已被关闭，说明修复节奏较快，但用户对 v1.18.15 回归仍然敏感。

---

## 3. 重要 PR 进展

### 1) [#41347](https://github.com/anomalyco/opencode/pull/41347) [OPEN] [contributor] fix(tui): sync Mermaid renderer fixes
- 同步 v2 TUI 的 Mermaid 渲染器修复与性能优化，重点修正分支/反馈图、HTML 实体、连线路由等问题。

### 2) [#41344](https://github.com/anomalyco/opencode/pull/41344) [OPEN] [contributor] fix(tui): undo latest pending prompt
- 让 `/undo` 优先移除最新的待发送用户输入，再回滚会话历史，改善队列/steering 场景下的撤销体验。

### 3) [#41342](https://github.com/anomalyco/opencode/pull/41342) [OPEN] [contributor] feat(tui): show session branches in vertical tabs
- 在垂直 session tabs 中显示非默认 VCS 分支，提升多分支并行工作时的可读性。

### 4) [#41335](https://github.com/anomalyco/opencode/pull/41335) [OPEN] fix(core): escape literal wildcards and anchor patch insertions
- 修复 wildcard 匹配和 patch 插入定位问题，减少误匹配、误写入的风险。

### 5) [#41326](https://github.com/anomalyco/opencode/pull/41326) [OPEN] fix(cli): preserve Bun conditions when starting service
- V2 CLI 启动托管服务时保留 `--conditions`，避免服务启动语义丢失。

### 6) [#41319](https://github.com/anomalyco/opencode/pull/41319) [OPEN] [contributor] fix(opencode): warn on unknown config fields
- 对配置文件中的未知顶层字段发出结构化告警，帮助用户发现拼写错误或版本不兼容配置。

### 7) [#41312](https://github.com/anomalyco/opencode/pull/41312) [CLOSED] [contributor] fix(opencode): ignore unknown config fields
- 让 V1 忽略它不认识的配置字段，增强 V1/V2 共用 `opencode.json` 的兼容性。

### 8) [#41316](https://github.com/anomalyco/opencode/pull/41316) [CLOSED] fix: bound workspace sync connect with a timeout
- 为 workspace sync 的连接阶段加 10 秒超时，避免启动/同步卡死。

### 9) [#41309](https://github.com/anomalyco/opencode/pull/41309) [CLOSED] [contributor] fix(core): flush plugin reload generations
- 修正 `PluginSupervisor.flush` 对热重载生成序列的等待逻辑，降低插件重载时的死锁/竞态风险。

### 10) [#41313](https://github.com/anomalyco/opencode/pull/41313) [CLOSED] feat(console): expose AI SDK package in Zen models API
- 在 Zen 的 `GET /v1/models` 响应中暴露 `npm` 字段，便于前端/客户端识别模型对应的 AI SDK 包。

---

## 4. 功能需求趋势

### 1) 模型与网关兼容性是绝对焦点
OpenCode Go、DeepSeek、Moonshot/Kimi、gpt-5.6 系列问题密集出现，核心诉求是：**模型 ID、reasoning 参数、stream 行为、网关转发要严格对齐**。  
相关热点：[#41300](https://github.com/anomalyco/opencode/issues/41300)、[#41314](https://github.com/anomalyco/opencode/issues/41314)、[#41273](https://github.com/anomalyco/opencode/issues/41273)、[#41323](https://github.com/anomalyco/opencode/issues/41323)

### 2) Desktop/TUI 体验修复需求持续上升
输入焦点、文本选择、Mermaid 渲染、tab 展示、撤销交互、插件命令等都在被持续打磨，说明用户对 **可交互性和可视化可用性** 很敏感。  
相关热点：[#41339](https://github.com/anomalyco/opencode/issues/41339)、[#41332](https://github.com/anomalyco/opencode/issues/41332)、[#41281](https://github.com/anomalyco/opencode/issues/41281)

### 3) 插件与 MCP 扩展能力是长期方向
`tool.definition`、`permission.ask`、subagent hook、slash command、MCP 工具描述等问题反复出现，说明社区很重视 **可扩展性和插件一致性**。  
相关热点：[#41297](https://github.com/anomalyco/opencode/issues/41297)、[#41325](https://github.com/anomalyco/opencode/issues/41325)、[#41304](https://github.com/anomalyco/opencode/issues/41304)

### 4) V1/V2 共存与迁移兼容是现实压力
配置字段兼容、数据迁移、服务启动超时、CLI 条件保留等问题表明，**版本切换成本** 已经成为社区关注点。  
相关热点：[#41346](https://github.com/anomalyco/opencode/issues/41346)、[#41319](https://github.com/anomalyco/opencode/pull/41319)、[#41312](https://github.com/anomalyco/opencode/pull/41312)

### 5) 平台适配与运行时稳定性不可忽视
Windows shell 发现、Bun 休眠恢复 CPU 飙高、Desktop/MCP 进程管理等问题，显示跨平台稳定性仍是关键工程课题。  
相关热点：[#41321](https://github.com/anomalyco/opencode/issues/41321)、[#41337](https://github.com/anomalyco/opencode/issues/41337)、[#41331](https://github.com/anomalyco/opencode/issues/41331)

---

## 5. 开发者关注点

### 1) 需要更强的错误可诊断性
多个 issue 都能快速定位到 **400 / 迁移失败 / 流断开 / 界面无响应**，但用户仍需要更明确的错误分层和上下文，避免“看见报错但不知道谁改坏了”。

### 2) 回归控制比新功能更重要
v1.18.15 相关回归、插件命令失效、UI 焦点抢夺等问题说明：**桌面端和 TUI 的回归测试** 需要继续加强。  
相关链接：[#41339](https://github.com/anomalyco/opencode/issues/41339)、[#41332](https://github.com/anomalyco/opencode/issues/41332)

### 3) 模型参数与请求体一致性是高频痛点
`model` 前置空格、reasoning effort 值不合法、schema 被重校验、流式输出被缓冲等，都说明客户端到网关再到上游 provider 的 **请求一致性** 是核心风险。  
相关链接：[#41300](https://github.com/anomalyco/opencode/issues/41300)、[#41323](https://github.com/anomalyco/opencode/issues/41323)、[#41296](https://github.com/anomalyco/opencode/issues/41296)

### 4) 版本兼容与配置共存需求很强
V1/V2 共用配置、未知字段容忍、迁移稳定性，都是现实场景里的刚需，开发侧需要继续把“**向后兼容**”放在优先级前列。  
相关链接：[#41346](https://github.com/anomalyco/opencode/issues/41346)、[#41312](https://github.com/anomalyco/opencode/pull/41312)、[#41319](https://github.com/anomalyco/opencode/pull/41319)

### 5) 用户希望工具链更“开箱即用”
像 PowerShell 7 发现、StyLua formatter、禁用自动更新、断点后继续 subagent 等诉求，本质上是在要求 OpenCode 更像一个 **成熟 IDE/Agent 工具链**，而不仅仅是一个 CLI。  
相关链接：[#41321](https://github.com/anomalyco/opencode/issues/41321)、[#41285](https://github.com/anomalyco/opencode/issues/41285)、[#41338](https://github.com/anomalyco/opencode/issues/41338)、[#41329](https://github.com/anomalyco/opencode/issues/41329)

如果你愿意，我也可以把这份日报进一步整理成：  
- **适合发内部群的 5 条精简版**，或  
- **适合做周报/晨报的表格版**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-08-09）

## 今日速览
过去 24 小时，Pi 的讨论重心明显集中在 **TUI 交互体验、长会话稳定性、扩展 API 能力** 和 **模型/Provider 兼容性** 上。  
同时，多个高质量 PR 继续推进对 DeepSeek、OpenAI-compatible provider 以及扩展生态的适配，说明项目正从“能用”快速走向“更稳、更可扩展”。

## 社区热点 Issues

1. **[#7821 Auto-compaction waits for agent_end during long tool loops](https://github.com/badlogic/pi-mono/issues/7821)**  
   - 重要性：自动压缩只在 `agent_end` 后检查，长工具循环可能持续越界请求，影响成本与上下文安全。  
   - 社区反应：**3 条评论**，属于典型的运行时边界问题，讨论偏向执行链路与阈值判断时机。

2. **[#7820 openai-codex: stream requests have no retryProviderRequest wrapper](https://github.com/badlogic/pi-mono/issues/7820)**  
   - 重要性：流式请求中断会直接致命，长推理任务和不稳定网络下体验风险很高。  
   - 社区反应：**2 条评论**，属于高价值稳定性问题，明显影响重度用户。

3. **[#7837 Fullscreen TUI: mouse selection silently overwrites the system clipboard](https://github.com/badlogic/pi-mono/issues/7837)**  
   - 重要性：文本选择直接写入系统剪贴板，且无开关，涉及隐私与操作预期。  
   - 社区反应：**2 条评论**，这类交互“惊扰性”问题通常会引发较强共鸣。

4. **[#7836 Edit fuzzy match misses lines with differences in whitespace length](https://github.com/badlogic/pi-mono/issues/7836)**  
   - 重要性：编辑工具对空白差异过于敏感，会放大模型生成补丁的失败率。  
   - 社区反应：**2 条评论，1 个 👍**，说明这是一个被实际工作流验证过的高频细节问题。

5. **[#7814 Allow multiple logins for one provider](https://github.com/badlogic/pi-mono/issues/7814)**  
   - 重要性：多账号并行登录是高级用户的刚需，尤其是 ChatGPT Plus 等订阅场景。  
   - 社区反应：**2 条评论**，反映出“多身份并行”正在成为产品分层需求。

6. **[#7808 First-class subagent spawn API for extensions](https://github.com/badlogic/pi-mono/issues/7808)**  
   - 重要性：扩展直接拉起子 Agent 是工作流编排、并行调研、fan-out 评审的关键能力。  
   - 社区反应：**1 条评论**，但属于平台级能力诉求，长期影响面很大。

7. **[#7809 Duplicate tool registration across extensions is fatal at startup](https://github.com/badlogic/pi-mono/issues/7809)**  
   - 重要性：扩展生态一旦工具重名就导致启动失败，说明插件隔离与冲突处理还不够健壮。  
   - 社区反应：**1 条评论**，问题虽具体，但直接关系到生态可扩展性。

8. **[#7813 feat: support multiple settings profiles](https://github.com/badlogic/pi-mono/issues/7813)**  
   - 重要性：多配置 profile 可解决多项目、多模型、多账号场景下的切换成本。  
   - 社区反应：**1 条评论**，属于高频工程需求，尤其适合团队/多环境使用。

9. **[#7824 Extension-side turn termination, and caller-controlled RpcClient timeout/shutdown](https://github.com/badlogic/pi-mono/issues/7824)**  
   - 重要性：扩展侧可终止 turn、可控超时/关闭，是把 Pi 做成“可编排平台”的关键一步。  
   - 社区反应：**1 条评论**，偏底层能力，但对扩展开发者非常关键。

10. **[#7816 Reload reports stale context from in-flight commands](https://github.com/badlogic/pi-mono/issues/7816)**  
    - 重要性：Reload 与运行中命令的上下文一致性问题，直接影响长流程与扩展命令可靠性。  
    - 社区反应：**2 条评论**，属于典型“状态机同步”问题，容易在真实使用中复现。

## 重要 PR 进展
> 今日共有 **8 个 PR 更新**，以下为全部重点。

1. **[#7840 docs: add Aliyun Model Studio CLI (bailian-cli) to Related Tools](https://github.com/badlogic/pi-mono/pull/7840)**  
   - 在 README 中补充相关工具入口，增强生态可发现性。

2. **[#7834 feat(coding-agent): annotate --version with runtime (bun/node/deno)](https://github.com/badlogic/pi-mono/pull/7834)**  
   - `pi --version` 直接输出运行时信息，便于问题定位与用户上报。

3. **[#7833 fix(examples): change notify extension from agent_end to agent_settled](https://github.com/badlogic/pi-mono/pull/7833)**  
   - 修正示例通知时机，避免在自动重试、压缩或后续续跑未完成时过早提示。

4. **[#7823 feat: A-level capabilities from oh-my-pi](https://github.com/badlogic/pi-mono/pull/7823)**  
   - 大幅增强核心能力，涉及 stream rules、subagent tools、advisor、cross-session memory 等，属于平台级升级。

5. **[#7817 fix(ai): treat incomplete reason 'length' as a length stop, not an error](https://github.com/badlogic/pi-mono/pull/7817)**  
   - 改善 OpenAI-compatible provider 的停止原因兼容性，减少误报错误。

6. **[#7811 fix(ai): send max_tokens to native DeepSeek](https://github.com/badlogic/pi-mono/pull/7811)**  
   - 适配 DeepSeek 原生接口参数，避免 `max_completion_tokens` 被忽略。  
   - 状态：**inprogress**。

7. **[#7810 fix(coding-agent): reject concurrent compaction calls](https://github.com/badlogic/pi-mono/pull/7810)**  
   - 防止重复触发压缩导致 TUI 崩溃，直接提升交互稳定性。

8. **[#7807 fix(ai): expose low reasoning effort for native DeepSeek V4 Flash](https://github.com/badlogic/pi-mono/pull/7807)**  
   - 为 DeepSeek V4 Flash 暴露 `low` 推理强度，补齐模型能力映射。

## 功能需求趋势
从今天的 Issues 看，社区关注点主要集中在以下方向：

- **TUI 交互体验优化**  
  包括鼠标选择、滚动行为、全屏模式、自动刷新与剪贴板控制等，说明终端 UI 仍是核心竞争面。

- **长会话与任务稳定性**  
  自动压缩、流式中断重试、reload 后上下文一致性、并发 compaction 等问题频繁出现，表明用户正把 Pi 用在更长、更复杂的任务链路里。

- **扩展生态与 Agent 编排能力**  
  子 Agent、RPC、turn termination、消息元数据、工具注册冲突等需求，体现出“Pi 作为可编排平台”的诉求在快速上升。

- **多账号 / 多配置 / 多项目切换**  
  多 login、多 settings profile、session isolation 等需求，说明专业用户在真实工作中需要更强的环境隔离和身份管理。

- **模型与 Provider 兼容性**  
  DeepSeek、OpenAI-compatible、Cloudflare Workers AI Gateway 等方向持续出现，兼容层和参数映射成为重要战场。

- **编辑与结构化输出质量**  
  edit tool、Mermaid、Markdown transformer、skills 识别等细节问题，说明“让模型产物更可控”依然是高频需求。

## 开发者关注点
- **状态一致性是最大痛点**：会话、压缩、重试、reload、fork/clone 等状态切换场景里，最容易暴露出竞态和脏上下文问题。  
- **扩展 API 还在补关键缺口**：开发者希望更少依赖补丁式 workaround，更倾向于官方提供子 Agent、终止控制、消息身份等原生能力。  
- **兼容性优先级很高**：不同 Provider 的参数名、停止原因、流式行为并不统一，兼容层需要更细。  
- **配置与环境隔离需求上升**：Windows 路径、多个账号、多 profile、并行会话等问题反映出 Pi 正从“单用户工具”走向“多环境生产工具”。  
- **细节体验决定口碑**：TUI 里的剪贴板、滚动、自动定位、描述截断等问题虽小，但对日常使用感知非常强。

如果你希望，我还可以把这份日报进一步整理成：
1. **适合 Slack/飞书发布的短版**，或  
2. **适合周报汇总的管理层版本**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# 2026-08-09 Qwen Code 社区动态日报

## 1. 今日速览
Qwen Code 今天发布了 **v0.21.8**，重点恢复了来自 fork PR 的实时 autofix 能力，并扩大了多模型的 compression cache 共享，版本侧继续围绕“自动修复 + 推理效率”优化。  
社区讨论重心仍集中在 **多会话协作、/review 工作流确定性、CI/发布稳定性** 三条主线，且多项问题已进入 `ready-for-agent` 或 `need-discussion` 阶段，说明项目正处在高频迭代窗口。

## 2. 版本发布
- **[v0.21.8](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.8)**  
  主要更新：
  - 恢复了从 fork 打开的 PR 的实时 autofix 支持，补齐 review event 到 credentialed workflow 的桥接能力。
  - 为 **OpenAI / Gemini / Vertex AI** 启用 compression cache sharing，提升缓存复用与调用效率。  
  对应发布 PR：**[#8757](https://github.com/QwenLM/qwen-code/pull/8757)**（已关闭）

## 3. 社区热点 Issues
1. **[#8766](https://github.com/QwenLM/qwen-code/issues/8766)** — Main CI failed: E2E Tests — `installs a local Qoder plugin`  
   P1、4 条评论、`ready-for-agent`、`autofix/in-progress`。这是今天最直接的阻塞项，主分支 CI 失败且已进入自动修复流程，优先级最高。

2. **[#8718](https://github.com/QwenLM/qwen-code/issues/8718)** — RFC: Native coordination for independent Qwen sessions  
   P2、4 条评论、`need-discussion`、`roadmap/multi-agent`。这是架构级提案，体现社区对原生多会话协作的强需求。

3. **[#8724](https://github.com/QwenLM/qwen-code/issues/8724)** — Cross-session messaging  
   4 条评论，讨论“同机会话互发消息”的能力，和 #8718 形成同一条多-agent 协作趋势线。

4. **[#8769](https://github.com/QwenLM/qwen-code/issues/8769)** — Proposal: rebuild `/review` Step 3–5 orchestration on the workflow engine  
   2 条评论、`need-discussion`。说明社区希望把 review 的关键编排从模型驱动迁移到确定性工作流。

5. **[#8775](https://github.com/QwenLM/qwen-code/issues/8775)** — Proposal: unify the session reasoning loops on a Turn-based SessionRuntime  
   2 条评论、`need-discussion`。这是核心运行时抽象的统一提案，影响 TUI、headless、ACP 等多入口。

6. **[#8737](https://github.com/QwenLM/qwen-code/issues/8737)** — Chrome remote debugging consent dialog re-appears  
   P2、4 条评论。MCP/Chrome 集成的体验问题较明显，反映出自动化场景下的权限摩擦。

7. **[#8753](https://github.com/QwenLM/qwen-code/issues/8753)** — macOS 上的 read permission tests 失败  
   P2、3 条评论。是可复现的测试/平台差异问题，影响 core 权限逻辑可信度。

8. **[#8752](https://github.com/QwenLM/qwen-code/issues/8752)** — VS Code settings schema rejects supported prompt hooks  
   P2、3 条评论。属于“schema 与 runtime 不一致”的典型问题，直接影响 IDE 伴侣配置体验。

9. **[#8750](https://github.com/QwenLM/qwen-code/issues/8750)** — bare URL hyperlink swallows CJK punctuation  
   P2、3 条评论。是中文/日文场景下的高频 UX 缺陷，影响终端输出可读性和可点击性。

10. **[#8771](https://github.com/QwenLM/qwen-code/issues/8771)** — Release Failed for v0.21.8-nightly...  
    2 条评论、`ready-for-agent`。说明发布链路仍有不稳定因素，且问题已进入夜间构建/发布排查。

## 4. 重要 PR 进展
1. **[#8777](https://github.com/QwenLM/qwen-code/pull/8777)** — `feat(review): add Maven multi-module verification`  
   在 review 的工具链抽象上新增 Maven 多模块验证，继续扩展 `/review build-test` 的生态覆盖。

2. **[#8776](https://github.com/QwenLM/qwen-code/pull/8776)** — `refactor(review): extract the toolchain adapter boundary`  
   把 npm 实现抽到工具链适配层后面，为后续接入更多构建系统打基础。

3. **[#8774](https://github.com/QwenLM/qwen-code/pull/8774)** — `perf(ci): tighten the automatic review kill switch for micro diffs`  
   针对微小 diff 收紧自动 review 超时，优化资源使用和反馈速度。

4. **[#8773](https://github.com/QwenLM/qwen-code/pull/8773)** — `perf(review): cap the reverse audit at one round below the sweep floor`  
   给 reverse audit 增加预算上限，减少 review 过程中的无效轮次。

5. **[#8772](https://github.com/QwenLM/qwen-code/pull/8772)** — `perf(review): file-scope a micro diff's own suite with vitest related`  
   让小 diff 的测试更精准地文件级收敛，降低 review build-test 成本。

6. **[#8770](https://github.com/QwenLM/qwen-code/pull/8770)** — `feat(cli): surface the posted review link from /review submit`  
   已关闭；让 `/review submit` 输出可直接拿到刚发布的 review 链接，提升可追溯性。

7. **[#8768](https://github.com/QwenLM/qwen-code/pull/8768)** — `fix(integration-tests): await rig.setup in Qoder plugin install test (#8766)`  
   修复 E2E 测试里的 setup 竞态，直接对应今日 CI 失败问题。

8. **[#8767](https://github.com/QwenLM/qwen-code/pull/8767)** — `fix(ci): make spam blocklist enforcement actually work`  
   强化 CI/治理流程，让 blocklist 真正生效，属于自动化维护能力补强。

9. **[#8765](https://github.com/QwenLM/qwen-code/pull/8765)** — `feat(ci): A/B deterministic gate rejections against the pre-round ref`  
   给拒绝判定引入 pre-round 基线对照，帮助区分“新问题”和“历史问题”。

10. **[#8764](https://github.com/QwenLM/qwen-code/pull/8764)** — `fix(external-context): read the response body with a reader, not for-await`  
    修复 external-context 的流读取兼容性问题，属于底层网络/流处理稳定性修正。

## 5. 功能需求趋势
- **多会话 / 多 Agent 协作**：社区明显在推动原生会话互联、任务分发与协调能力。  
  代表问题：[**#8718**](https://github.com/QwenLM/qwen-code/issues/8718)、[**#8724**](https://github.com/QwenLM/qwen-code/issues/8724)、[**#8775**](https://github.com/QwenLM/qwen-code/issues/8775)

- **review 自动化与工作流确定性**：从 `/review` 编排、工具链抽象到预算控制，需求集中在“可预测、可复现”。  
  代表问题：[**#8769**](https://github.com/QwenLM/qwen-code/issues/8769)、[**#8775**](https://github.com/QwenLM/qwen-code/issues/8775)、[**#8766**](https://github.com/QwenLM/qwen-code/issues/8766)

- **IDE / MCP / 桌面集成体验**：VS Code schema、Chrome MCP、桌面剪贴板等问题说明集成层仍有大量打磨空间。  
  代表问题：[**#8752**](https://github.com/QwenLM/qwen-code/issues/8752)、[**#8737**](https://github.com/QwenLM/qwen-code/issues/8737)、[**#8747**](https://github.com/QwenLM/qwen-code/issues/8747)

- **CI / 测试 / 发布稳定性**：主分支 CI、夜间发布失败、macOS 测试不一致等问题非常集中。  
  代表问题：[**#8766**](https://github.com/QwenLM/qwen-code/issues/8766)、[**#8771**](https://github.com/QwenLM/qwen-code/issues/8771)、[**#8753**](https://github.com/QwenLM/qwen-code/issues/8753)

- **CLI 输出与中文场景兼容性**：终端 markdown、URL 识别、会话标题等细节问题，显示中文/多语种体验仍在持续修补。  
  代表问题：[**#8750**](https://github.com/QwenLM/qwen-code/issues/8750)、[**#8758**](https://github.com/QwenLM/qwen-code/issues/8758)、[**#8749**](https://github.com/QwenLM/qwen-code/issues/8749)

## 6. 开发者关注点
- **测试双重标准问题**：很多反馈都指向“mock 与生产逻辑不一致”，尤其是 macOS、workspace path containment、E2E 竞态。  
  参考：[**#8753**](https://github.com/QwenLM/qwen-code/issues/8753)、[**#8768**](https://github.com/QwenLM/qwen-code/pull/8768)、[**#8759**](https://github.com/QwenLM/qwen-code/pull/8759)

- **配置/schema 与 runtime 漂移**：支持能力已经在运行时存在，但 schema、文档或 VS Code companion 没同步，导致“看起来支持、实际被拒”。  
  参考：[**#8752**](https://github.com/QwenLM/qwen-code/issues/8752)、[**#8748**](https://github.com/QwenLM/qwen-code/issues/8748)、[**#8754**](https://github.com/QwenLM/qwen-code/pull/8754)

- **自动化审查成本控制**：社区和维护者都在压缩 review 轮次、限制无效循环、提升失败判定的可解释性。  
  参考：[**#8769**](https://github.com/QwenLM/qwen-code/issues/8769)、[**#8774**](https://github.com/QwenLM/qwen-code/pull/8774)、[**#8773**](https://github.com/QwenLM/qwen-code/pull/8773)

- **面向真实工作流的集成稳定性**：Chrome MCP、桌面复制、release workflow、blocklist enforcement 等都说明项目正从“能用”走向“可长期托管”。  
  参考：[**#8737**](https://github.com/QwenLM/qwen-code/issues/8737)、[**#8747**](https://github.com/QwenLM/qwen-code/pull/8747)、[**#8767**](https://github.com/QwenLM/qwen-code/pull/8767)

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合内部周报的精简版**，或  
2. **适合公众号/技术博客的分析版**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# 2026-08-09 DeepSeek TUI 社区动态日报

## 1) 今日速览
今天社区讨论的核心，集中在 **v0.9.5 发布后的收尾与 v0.9.6 热修准备**：一方面在修复发布链路（CNB 镜像、Cargo crate 顺序、npm 发布），另一方面在补齐 TUI 交互的“真实状态呈现”（权限默认项、reasoning 提示、compaction 状态、子代理身份）。  
另外，产品对外品牌正在进一步统一到 **Codewhale**，legacy 的 `deepseek-tui` npm 包已明确进入停更阶段。  
总体来看，今天的重点不是“新功能大爆发”，而是 **稳定性、发布可靠性、以及交互一致性** 的集中修补。

---

## 2) 版本发布

### [v0.9.5](https://github.com/Hmbown/CodeWhale/releases/tag/v0.9.5)
- 对外产品品牌统一为 **Codewhale**，但 `codewhale` 命令、npm 包名和 release asset 仍保持小写技术标识。
- **legacy `deepseek-tui` npm 包已弃用**，后续不再发布。
- 面向旧版用户（v0.8.x / legacy `deepseek` 系列）提供了迁移指引，释放了后续演进空间。

---

## 3) 社区热点 Issues

1. **[#5307](https://github.com/Hmbown/CodeWhale/issues/5307)** - v0.9.6：CNB mirror 模式必须下载二进制 assets，而不是 release HTML  
   - **为什么重要**：这是明确的 **release-blocker**，会直接影响镜像环境下的更新可用性。
   - **社区反应**：虽然暂无评论，但问题描述非常具体，属于“上线即故障”的高优先级修复。

2. **[#5293](https://github.com/Hmbown/CodeWhale/issues/5293)** - TUI 权限弹窗默认选项在 v0.9.4 中变更，可能导致误拒绝  
   - **为什么重要**：这会破坏用户已经形成的肌肉记忆，属于高频交互路径上的 UX 风险。
   - **社区反应**：**3 条评论、1 个赞**，说明这是被真实感知到的交互退化。

3. **[#5305](https://github.com/Hmbown/CodeWhale/issues/5305)** - Agent start receipt 隐藏了实际 Fleet 路由，容易造成错误模型归因  
   - **为什么重要**：影响调试、审计和运维判断，属于“看得见的状态”和“真实执行路径”不一致问题。
   - **社区反应**：当前无评论，但问题定位很深，说明作者在推进更严格的可观测性。

4. **[#5287](https://github.com/Hmbown/CodeWhale/issues/5287)** - 子代理显示身份应使用 fleet/session 名称，而不是 agent # 或 whale 昵称  
   - **为什么重要**：这是多代理协作场景下的核心可读性问题，直接影响操作员理解任务归属。
   - **社区反应**：**2 条评论**，说明对“统一身份展示”的诉求较明确。

5. **[#5291](https://github.com/Hmbown/CodeWhale/issues/5291)** - 清理 stale reasoning 提示并收紧终端间距  
   - **为什么重要**：属于细节型 UX，但对“界面是否诚实”影响很大；过时提示会降低可信度。
   - **社区反应**：已有讨论，且来自 dogfood 反馈，说明问题是可复现的。

6. **[#5303](https://github.com/Hmbown/CodeWhale/issues/5303)** - v0.9.7：provider-native Ultra reasoning 与 truthful Operate orchestration  
   - **为什么重要**：反映出社区对“高级推理档位”和“真实执行编排”的诉求在增强。
   - **社区反应**：已有 1 条评论，属于前瞻性架构问题，讨论重点偏产品契约一致性。

7. **[#5302](https://github.com/Hmbown/CodeWhale/issues/5302)** - v0.9.6 hotfix：/compact 必须保持可用，自动压缩压力要和请求计量一致  
   - **为什么重要**：压缩链路是长上下文任务的关键保障，一旦卡死会直接影响主流程。
   - **社区反应**：作为 release-blocker 提出，说明优先级非常高。

8. **[#5304](https://github.com/Hmbown/CodeWhale/issues/5304)** - v0.9.6：把 Mistral 作为一等公民 provider route  
   - **为什么重要**：代表社区继续推动 **多模型/多供应商接入**，不满足于“OpenAI-compatible 兼容层”。
   - **社区反应**：已关闭，说明诉求已经进入可交付状态。

9. **[#5299](https://github.com/Hmbown/CodeWhale/issues/5299)** - npm 发布迁移到 trusted publishing  
   - **为什么重要**：这是发布安全与自动化的重要补强，减少对维护者浏览器登录和 2FA 人工介入的依赖。
   - **社区反应**：虽然暂无评论，但和发布链路稳定性高度相关。

10. **[#5286](https://github.com/Hmbown/CodeWhale/issues/5286)** - 在 composer 附近展示运行中的后台任务 / sub-agent  
    - **为什么重要**：解决“主线程在等什么”的可见性问题，属于 TUI 的高频信息架构优化。
    - **社区反应**：已关闭，说明该方向已被验证并推进落地。

---

## 4) 重要 PR 进展

1. **[PR #5308](https://github.com/Hmbown/CodeWhale/pull/5308)** - 修复 CNB mirror 的 asset 下载 URL  
   - 核心是改成真正下载 release assets，而不是拿到 release HTML 页面。
   - 对应 Issue #5307，属于直接阻断更新失败的热修。

2. **[PR #5306](https://github.com/Hmbown/CodeWhale/pull/5306)** - 校验 crate 发布顺序  
   - 在注册表操作前验证 20 个 crate 的拓扑顺序，避免依赖倒序发布。
   - 对应 Issue #5298，补强 release pipeline 的确定性。

3. **[PR #5301](https://github.com/Hmbown/CodeWhale/pull/5301)** - 让 compaction 保持 live 且压力感知  
   - 手动 `/compact` 非阻塞化，并把自动压缩与真实请求压力对齐。
   - 这是 TUI 长任务稳定性的关键修复。

4. **[PR #5300](https://github.com/Hmbown/CodeWhale/pull/5300)** - core 自主管理 primary request preparation  
   - 将主请求准备逻辑从 TUI 侧下沉到 core，减少职责分散。
   - 有利于后续 provider-neutral 统一行为。

5. **[PR #5297](https://github.com/Hmbown/CodeWhale/pull/5297)** - 发布 v0.9.5 的 web snapshot  
   - 更新站点事实源，让线上文档与已发布版本保持一致。
   - 对 release 对外展示和版本可信度很重要。

6. **[PR #5296](https://github.com/Hmbown/CodeWhale/pull/5296)** - 序列化 process fixtures  
   - 强化集成测试中对 child 进程的成功/退出码/stdout/stderr 校验。
   - 属于测试可靠性提升，减少“假绿”。

7. **[PR #5295](https://github.com/Hmbown/CodeWhale/pull/5295)** - 为 Codewhale 增加 Mistral AI 一等公民 provider route  
   - 新增 Mistral（la Plateforme）路由，支持独立 provider 配置与默认模型。
   - 这是今天最明显的模型生态扩展之一。

8. **[PR #5294](https://github.com/Hmbown/CodeWhale/pull/5294)** - telemetry 仅在 shutdown 时 flush  
   - 避免启动阶段的错误 flush，保留边界和 consent re-check。
   - 对隐私合规与事件时序准确性都更友好。

9. **[PR #5292](https://github.com/Hmbown/CodeWhale/pull/5292)** - 准备 v0.9.5 发布  
   - 整合终端应用、命令入口、更新器、安装器、release assets 和网站。
   - 是本次发布的总装 PR。

10. **[PR #5289](https://github.com/Hmbown/CodeWhale/pull/5289)** - 优化英文文案、真实 nav 图标按钮、原生 locale 重写  
    - 重点是站点交互与本地化展示质量。
    - 对多语言站点可用性有直接帮助。

---

## 5) 功能需求趋势

从今天全部 Issues 看，社区最关注的方向主要有 5 类：

1. **TUI 交互一致性与“真实状态”展示**  
   - 包括权限默认项、reasoning 提示、compaction 状态、后台任务提示等。
   - 关键词：**不误导、可见、即时、可确认**。

2. **多代理 / Fleet / 子代理协作可观测性**  
   - 子代理身份、路由归因、session 命名、运行中状态展示，都是热点。
   - 说明用户已经在把 TUI 当成“多工作流控制台”使用。

3. **长任务与上下文压缩稳定性**  
   - `/compact`、自动压缩、请求压力计量一致性，是典型的生产级可靠性诉求。
   - 反映出长上下文使用已进入高频场景。

4. **模型与 provider 扩展能力**  
   - Ultra reasoning、Mistral first-class route、OpenAI-compatible 之外的原生接入都在推进。
   - 说明社区不只要“兼容”，还要“原生特性表达”。

5. **发布链路与供应链自动化**  
   - CNB mirror、Cargo 发布顺序、npm trusted publishing 都在补强。
   - 体现出项目已进入“版本分发可靠性”阶段。

---

## 6) 开发者关注点

从今天的反馈中，开发者最需要优先关注的痛点是：

- **不要让 UI 做出“看起来对、实际上错”的动作**  
  例如权限默认项、过时 reasoning hint、隐藏路由等，都会伤害信任。

- **长任务必须保持可用和可解释**  
  `/compact` 卡死、后台任务无提示、子代理状态不透明，都会让用户误判系统是否在工作。

- **发布链路要可复现、可验证、可回滚**  
  CNB 下载、crate 顺序、npm 发布方式，都在提示：项目已经进入高要求交付阶段。

- **模型/供应商能力正在从“可接入”走向“原生支持”**  
  Mistral、Ultra reasoning、Operate orchestration 都是明确趋势。

- **本地化和 web 端交互仍有细节缺口**  
  非英文路由的可点击控件、导航按钮与文案对齐，说明前端体验还在持续打磨。

---

如果你愿意，我还可以把这份日报进一步整理成：
- **适合公众号/周报风格的精简版**
- **适合内部研发晨会的 1 页摘要版**
- **带“风险等级 / 优先级 / 影响面”三列的表格版**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*