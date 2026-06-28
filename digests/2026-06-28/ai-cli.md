# AI CLI 工具社区动态日报 2026-06-28

> 生成时间: 2026-06-28 01:36 UTC | 覆盖工具: 9 个

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

下面给出一份基于 2026-06-28 社区动态的横向对比分析，面向技术决策者与开发者。

---

## 1) 生态全景

过去 24 小时，AI CLI 工具生态的主线已经很清晰：**行业重心从“功能扩张”转向“可靠性、成本治理、权限边界和跨端一致性”**。  
多数项目都在处理高频的稳定性问题，例如崩溃、卡死、长会话退化、Windows 兼容性，以及会话恢复/线程同步问题。  
同时，插件化、MCP/ACP 集成、外部编辑器接入、跨会话记忆等能力正在成为新一轮竞争点，说明 CLI 工具正从单点助手演进为可嵌入的开发平台。  
另外，安全策略的精度和可解释性也成为共同痛点：要么过严误伤合法工作流，要么过松带来边界风险。  
总体看，生态已进入“**可用性收敛 + 平台化升级**”阶段。

---

## 2) 各工具活跃度对比

> 说明：以下统计为“过去 24 小时内社区动态摘要中提到的更新数”，不是仓库总量。

| 工具 | Issues 数 | PR 数 | Release 情况 | 活跃度简评 |
|---|---:|---:|---|---|
| Claude Code | 10 | 1 | 无新 Release | 以安全误报为核心，问题高度聚焦 |
| OpenAI Codex | 10 | 4 | 3 个 alpha Release | 高速迭代，稳定性问题密集 |
| Gemini CLI | 5 | 7 | 无新 Release | 安全修复和行为纠偏推进明显 |
| GitHub Copilot CLI | 8 | 0 | 无新 Release | 以回归和 TUI 稳定性问题为主 |
| Kimi Code CLI | 0 | 0 | 无活动 | 今日无公开动态 |
| OpenCode | 10 | 10 | 无新 Release | 讨论与开发都很活跃，平台化推进快 |
| Pi | 10 | 4 | 无新 Release | 偏嵌入式平台与扩展生态 |
| Qwen Code | 9 | 10 | 1 个 nightly Release | 迭代快，稳定性/成本优化并行 |
| DeepSeek TUI | 0 | 10 | 无新 Release | 开发侧活跃，但无直接 Issue/Release 信号 |

---

## 3) 共同关注的功能方向

### A. 稳定性与性能优化
**几乎所有活跃项目都在关注。**  
- **Codex**：桌面端 crash、长会话变慢、Windows 崩溃  
- **OpenCode**：CPU 飙高、内存泄漏、卡死、启动变慢  
- **Pi**：多 tool call 导致全屏闪烁、异常被静默吞掉  
- **Qwen Code**：后台空闲高 CPU、tool loop、历史恢复断裂  
- **Copilot CLI**：TUI 残影、复制丢空格、滚动异常  
- **Claude Code**：合法工作被 `session-halted` 直接中断

**共同诉求**：长会话不能退化，错误不能“假装没发生”，工具调用不能进入循环或失控。

### B. 会话/线程/历史管理
- **Codex**：本地线程缺失、跨端状态不一致、session retention  
- **OpenCode**：会话重命名、恢复、sidebar 管理、V2 会话能力  
- **Qwen Code**：rewind/resume 后父子关系保留  
- **Copilot CLI**：session retention/expiration 可见性  
- **DeepSeek TUI**：ACP 会话取消、增量输出  
- **Pi**：成本归集到 session footer、外部编辑器集成

**共同诉求**：AI CLI 正从“单轮问答”转向“长生命周期工作流”，会话状态成为基础设施。

### C. Windows / Desktop / 跨端兼容
- **Codex**：Windows app-server、企业安全软件、MCP 启动问题  
- **Copilot CLI**：Windows `.bat/.cmd` 回归，Mac 触控板滚动问题  
- **Claude Code**：Claude Desktop / Windows 子进程环境变量问题  
- **Qwen Code**：Windows UI 滚轮与后台驱动问题  
- **Gemini CLI**：登录后卡住，终端状态机问题  
- **Pi**：外部编辑器、Git Bash、settings 写入问题

**共同诉求**：CLI 工具正在从开发者玩具变成生产力工具，跨平台稳定性已经是核心门槛。

### D. 成本、配额、token 可解释性
- **Codex**：quota 误报、ping 也扣限额、usage limit 不一致  
- **Qwen Code**：prompt-cache miss 导致成本膨胀，token/cost 进入 release gate  
- **Pi**：`reportUsage()` 聚合子 agent 成本  
- **Copilot CLI**：custom model provider 仍消耗 quota  
- **OpenCode**：token/cache/cost scorecard 与回归检测  
- **DeepSeek TUI**：上下文缓存最大化，减少重复读文件

**共同诉求**：用户开始把“成本可见性”视为产品可信度的一部分，而不仅是后台指标。

### E. 安全边界与策略精度
- **Claude Code**：防御性/合法研究场景大量误报  
- **Gemini CLI**：路径穿越、shell 展开、bot patch、环境变量净化  
- **OpenCode**：Plan 模式绕过、目录与沙箱边界  
- **Codex**：浏览器策略过严，合法业务站点被阻断

**共同诉求**：默认安全没问题，但必须更懂上下文，避免“一刀切”损伤真实工作流。

### F. 插件化 / MCP / ACP / 扩展生态
- **Gemini CLI**：eval 覆盖率、agent 行为收敛  
- **OpenCode**：MiMo tools、V2 会话、跨端能力  
- **Pi**：插件系统、扩展执行工具、外部编辑器、音频透传  
- **DeepSeek TUI**：插件注册、发现、MCP 接入  
- **Qwen Code**：web/daemon/浏览器方向探索  
- **Copilot CLI**：MCP server 启动链路

**共同诉求**：生态竞争已经从“谁的模型更强”转向“谁的平台更可嵌入、更可扩展”。

---

## 4) 差异化定位分析

### Claude Code
- **定位**：偏“安全审慎”的专业编码/研究助手  
- **特征**：安全策略极强，但误报问题突出  
- **目标用户**：硬件分析、协议检查、防御性加固、逆向研究者  
- **技术路线**：强策略拦截 + 会话级安全控制  
- **判断**：当前最大矛盾是“安全精度不足”，而不是能力不足

### OpenAI Codex
- **定位**：偏桌面端与跨端协作的通用 coding assistant  
- **特征**：alpha 高频迭代，重稳定性、线程同步、Windows 适配  
- **目标用户**：重度桌面端用户、企业 Windows 环境用户  
- **技术路线**：桌面应用 + shared thread + telemetry 驱动收敛  
- **判断**：处于“从功能可用走向工程可用”的收敛期

### Gemini CLI
- **定位**：安全优先的 CLI agent  
- **特征**：明显强调边界控制、默认拒绝、显式批准  
- **目标用户**：重视安全治理和自动化可控性的用户  
- **技术路线**：策略修复驱动，强调 agent 行为约束  
- **判断**：产品正在建立“安全默认值”，但 UX 摩擦需要打磨

### GitHub Copilot CLI
- **定位**：更偏传统终端交互与 TUI 体验优化  
- **特征**：问题集中在渲染、复制、滚动、版本回归  
- **目标用户**：习惯终端/TUI 的开发者  
- **技术路线**：以 CLI 终端体验为中心，产品成熟度较高但回归敏感  
- **判断**：更像成熟产品进入“细节打磨”阶段

### OpenCode
- **定位**：多端统一的 Agent 平台  
- **特征**：桌面/Web/TUI 一体化，强烈关注会话管理和模型兼容  
- **目标用户**：需要多环境协同、工具链整合的高级用户  
- **技术路线**：平台化、模块化、会话中心化  
- **判断**：非常像“下一代 AI 开发平台”的雏形

### Pi
- **定位**：可嵌入、可编排的 AI 后端平台  
- **特征**：插件生态、扩展调用工具、成本聚合、外部编辑器集成  
- **目标用户**：要把 LLM 嵌入自有工作流/框架的开发者  
- **技术路线**：后端平台化 + 扩展系统优先  
- **判断**：不是单纯 CLI，而是在向“LLM 基础设施”演进

### Qwen Code
- **定位**：高频迭代、以可用性和成本控制为中心的工程化 CLI  
- **特征**：修复循环重试、历史恢复、资源占用、cache 命中等问题  
- **目标用户**：重度生产使用者、对成本敏感的用户  
- **技术路线**：nightly 快速修补 + 稳定性优先  
- **判断**：在“工程可靠性”上投入很重，产品节奏成熟

### DeepSeek TUI
- **定位**：插件化、ACP/IDE 集成导向的 TUI 平台  
- **特征**：插件、MCP、上下文缓存、会话流式更新并进  
- **目标用户**：希望把 TUI 变成可扩展开发中枢的用户  
- **技术路线**：平台底座 + 插件生态 + 增量会话  
- **判断**：开发侧推进很快，但公开社区反馈面相对较窄

### Kimi Code CLI
- **定位**：当前公开动态较少，活跃度低  
- **判断**：从这份样本看，社区信号不足，难以判断成熟度和方向

---

## 5) 社区热度与成熟度

### 社区最活跃的工具
- **OpenCode**：Issues 和 PR 都高频，说明社区讨论与开发推进同步活跃
- **Qwen Code**：issue/PR 都多，还有 nightly release，属于快速迭代型
- **Claude Code**：Issues 极集中，说明用户反馈强烈，且问题具代表性
- **Codex**：连续 alpha release + 高频问题，处于密集收敛期
- **Pi**：Issue 和 PR 都围绕平台化能力展开，生态活跃

### 处于快速迭代阶段
- **OpenAI Codex**：3 个 alpha release，明显在快速修 bug
- **Qwen Code**：nightly + 多个稳定性 PR，迭代速度高
- **OpenCode**：大体量功能 PR 密集，平台建设速度快
- **Gemini CLI**：安全修复密集，行为策略快速收敛
- **DeepSeek TUI**：PR 很活跃，但社区反馈信号还偏弱

### 相对成熟但仍有明显回归压力
- **GitHub Copilot CLI**：整体更像成熟产品，问题集中在细节回归与平台差异
- **Codex**：产品化程度在提升，但桌面稳定性仍是关键短板

### 社区信号较弱
- **Kimi Code CLI**：今日无活动，公开成熟度难判断

---

## 6) 值得关注的趋势信号

### 1. AI CLI 正在从“命令行助手”变成“工作流平台”
插件、MCP、ACP、shared threads、session sidebar、工具注册这些能力，说明用户不再满足于单次问答，而是要求**可编排、可恢复、可扩展**。

### 2. “会话”正在成为新一代基础对象
线程可见性、恢复、重命名、历史完整性、跨端同步，已经从体验问题升级为底层能力。  
对开发者而言，**session ID、状态持久化、可回溯性**会越来越重要。

### 3. 成本透明度会成为产品竞争点
token、cache、quota、usage limit 的争议在多个项目同时出现，说明用户对“AI 消耗”越来越敏感。  
未来产品要么给出更准确的计量，要么就会持续遭遇信任问题。

### 4. 安全策略需要从“规则驱动”走向“语义驱动”
Claude 和 Gemini 的案例都说明：只靠黑白名单式拦截，会误伤大量合法防御工作。  
更好的方向是结合任务语义、授权上下文、动作类型和风险分级。

### 5. Windows 和企业环境仍是主要摩擦面
这不是单一产品问题，而是整个 AI CLI 生态的共性：  
**终端、驱动、安全软件、MCP、桌面壳层、权限模型**叠加后，稳定性问题会被放大。

### 6. 长会话性能与资源治理正在上升为核心指标
高 CPU、内存泄漏、tool loop、prompt cache miss、重复检索，都说明“越用越慢”是必须系统治理的问题。  
对开发者来说，**遥测、结构化日志、回归检测**会变得越来越关键。

---

如果你需要，我可以把这份分析进一步压缩成：
1. **1 页管理层摘要版**，或  
2. **按“市场机会 / 风险 / 研发优先级”三栏重排的决策版**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下报告基于你提供的前 20 条 PR / 前 15 条 Issues 交叉判断；由于原始数据里的 PR 评论数字段缺失，我采用“社区问题关联度 + 影响面 + 通用性”做热度排序。

---

## 1) 热门 Skills 排行（PR，按社区关注度综合排序）

1. **#1298 `skill-creator` 评测链路修复：run_eval 召回率始终 0%**
   - 功能：修复 `run_eval.py`/`run_loop.py`/`improve_description.py` 的评测信号，让技能描述优化真正基于有效召回。
   - 社区热点：Windows 流读取、触发检测、并行 worker 等问题，直接影响所有 Skill 的迭代质量。
   - 状态：**OPEN**
   - 链接：https://github.com/anthropics/skills/pull/1298

2. **#1323 `skill-creator` 触发检测修复**
   - 功能：修复“识别不到真实 skill name、遇到第一个非 Skill tool 就提前退出”的问题。
   - 社区热点：这会导致优化循环对所有 should-trigger 查询都报 `recall=0%`，属于高优先级可靠性 bug。
   - 状态：**OPEN**
   - 链接：https://github.com/anthropics/skills/pull/1323

3. **#1099 `skill-creator` Windows pipe 读取崩溃修复**
   - 功能：修复 Windows 上 `run_eval.py` 读取子进程管道时的崩溃。
   - 社区热点：Windows 用户无法正常评测 Skill，直接暴露出工具链的跨平台短板。
   - 状态：**OPEN**
   - 链接：https://github.com/anthropics/skills/pull/1099

4. **#514 `document-typography` 文档排版质量控制 Skill**
   - 功能：自动发现并规避孤行、寡行、标题悬挂、编号错位等常见排版问题。
   - 社区热点：这是“Claude 生成文档质量”里最普遍、最容易被感知的痛点之一。
   - 状态：**OPEN**
   - 链接：https://github.com/anthropics/skills/pull/514

5. **#723 `testing-patterns` 测试模式 Skill**
   - 功能：覆盖测试哲学、单元测试、React 组件测试、Mock、边界情况等完整测试栈。
   - 社区热点：社区明显在追求“生成代码”之外的“验证代码”能力，尤其是测试规范化。
   - 状态：**OPEN**
   - 链接：https://github.com/anthropics/skills/pull/723

6. **#360 `appdeploy` 应用部署 Skill**
   - 功能：帮助 Claude 直接部署和管理全栈 Web App。
   - 社区热点：把 Skills 从“写代码”延伸到“交付上线”，是很强的生产力方向。
   - 状态：**OPEN**
   - 链接：https://github.com/anthropics/skills/pull/360

7. **#147 `codebase-inventory-audit` 代码库盘点/审计 Skill**
   - 功能：识别孤儿代码、未使用文件、文档缺口和基础设施冗余。
   - 社区热点：非常贴近大型代码库维护、重构前审计、技术债治理场景。
   - 状态：**OPEN**
   - 链接：https://github.com/anthropics/skills/pull/147

8. **#154 `shodh-memory` 持久化上下文 Skill**
   - 功能：为 AI Agent 提供跨会话记忆与上下文保留能力。
   - 社区热点：长期对话、任务连续性、个人/项目记忆，是 Agent 生态中的核心诉求。
   - 状态：**OPEN**
   - 链接：https://github.com/anthropics/skills/pull/154

---

## 2) 社区需求趋势（从 Issues 提炼）

1. **安全与信任边界**
   - 社区非常关注“官方命名空间被社区技能冒充”的风险，以及权限/信任误导问题。
   - 代表 Issue：#492
   - 链接：https://github.com/anthropics/skills/issues/492

2. **组织级共享与分发**
   - 用户希望 Skills 能像团队资产一样在组织内共享，而不是靠手动下载/上传。
   - 代表 Issue：#228
   - 链接：https://github.com/anthropics/skills/issues/228

3. **评测与优化链路可靠性**
   - `run_eval.py`、`run_loop.py`、`improve_description.py` 的 0% recall 问题，说明大家不仅要“有 Skill”，还要“能正确评估 Skill”。
   - 代表 Issue：#556、#1169
   - 链接：https://github.com/anthropics/skills/issues/556
   - 链接：https://github.com/anthropics/skills/issues/1169

4. **跨平台可用性，尤其是 Windows**
   - Windows 上的 subprocess、编码、管道选择器等兼容问题反复出现，说明工具链仍偏 Unix-first。
   - 代表 Issue：#1061
   - 链接：https://github.com/anthropics/skills/issues/1061

5. **技能包分发、重复安装与可发现性**
   - 社区在意安装后“技能消失”、重复安装、插件内容重复等生态问题。
   - 代表 Issue：#62、#189、#61
   - 链接：https://github.com/anthropics/skills/issues/62
   - 链接：https://github.com/anthropics/skills/issues/189
   - 链接：https://github.com/anthropics/skills/issues/61

6. **企业集成场景**
   - Bedrock、SharePoint Online、组织权限流、MCP 暴露等问题，说明 Skills 正在进入企业工作流。
   - 代表 Issue：#29、#1175、#16
   - 链接：https://github.com/anthropics/skills/issues/29
   - 链接：https://github.com/anthropics/skills/issues/1175
   - 链接：https://github.com/anthropics/skills/issues/16

7. **更“像生产系统”的技能**
   - 社区提出了元技能、质量分析、记忆压缩、Agent 治理等方向，说明需求正从单点能力转向“系统级能力”。
   - 代表 Issue：#202、#1329、#412
   - 链接：https://github.com/anthropics/skills/issues/202
   - 链接：https://github.com/anthropics/skills/issues/1329
   - 链接：https://github.com/anthropics/skills/issues/412

---

## 3) 高潜力待合并 Skills

这些 PR 虽然都还是 **OPEN**，但从问题普适性和落地价值看，最像近期会推进合并的方向：

1. **#1298 `skill-creator` 评测链路修复**
   - 直接修复整个 Skill 优化闭环的“假 0% recall”问题。
   - 链接：https://github.com/anthropics/skills/pull/1298

2. **#1323 `skill-creator` 触发检测修复**
   - 属于阻断级 bug，修掉后能显著改善优化循环可信度。
   - 链接：https://github.com/anthropics/skills/pull/1323

3. **#1099 `skill-creator` Windows 崩溃修复**
   - 明确的跨平台兼容性修复，用户面广，合并收益高。
   - 链接：https://github.com/anthropics/skills/pull/1099

4. **#514 `document-typography`**
   - 文档质量是高频需求，适合快速转化为可用 Skill。
   - 链接：https://github.com/anthropics/skills/pull/514

5. **#723 `testing-patterns`**
   - 与代码生成天然互补，能显著增强 Claude 的工程产出可信度。
   - 链接：https://github.com/anthropics/skills/pull/723

6. **#360 `appdeploy`**
   - 从“开发”延伸到“部署”，很符合 Claude Code 的端到端定位。
   - 链接：https://github.com/anthropics/skills/pull/360

7. **#147 `codebase-inventory-audit`**
   - 面向中大型代码库的刚需型能力，落地价值高。
   - 链接：https://github.com/anthropics/skills/pull/147

---

## 4) Skills 生态洞察

**一句话总结：当前社区最集中的诉求，是让 Skills 从“能用的单点能力”升级为“可靠、可共享、可验证、可跨平台落地的生产力工作流组件”。**

如果你愿意，我可以下一步把这份报告再整理成：
- **表格版（适合投研/周报）**
- **PPT 大纲版**
- **按“安全 / 工具链 / 业务技能”三类重新分组版**

---

# Claude Code 社区动态日报（2026-06-28）

## 1) 今日速览
过去 24 小时内，Claude Code 社区讨论几乎被一波**安全拦截误报**占据，且高度集中在无人机固件分析、协议检查、逆向与防御性加固等合法工作场景，多个问题都被标记为 `session-halted`，影响明显。  
同时，社区也出现了少量**高信号功能需求**，主要集中在 VS Code/Claude Desktop 体验、工作区文件控制、以及跨会话记忆机制。  
今日无新版本发布，社区焦点更多落在“安全策略精度”和“开发体验可用性”两条线上。

---

## 2) 版本发布
**过去 24 小时无新 Releases。**

---

## 3) 社区热点 Issues（挑选 10 个）
> 说明：本期热点几乎全部来自同一类“安全误报”工单，且多为 `duplicate`，说明问题不是个例，而是同一底层策略在不同任务中的重复触发。

1. **#71910** `[Bug][cyber] Safety block stops legitimate consumer drone firmware analysis via USB protocol inspection`  
   链接：<https://github.com/anthropics/claude-code/issues/71910>  
   重要性：典型的合法硬件分析被拦截，且是 `session-halted` 级别，直接中断工作流。  
   社区反应：4 条评论，属于本轮最活跃的误报工单之一。  

2. **#71901** `[Bug][cyber] Consumer drone firmware download and version diff analysis for owned device wrongly blocked`  
   链接：<https://github.com/anthropics/claude-code/issues/71901>  
   重要性：针对“自有设备”的固件下载与版本 diff 也被拦截，说明策略对上下文理解不足。  
   社区反应：4 条评论，且与 #71910 等形成问题簇。  

3. **#71920** `[Bug][cyber] Safety block interrupts legitimate open-source drone ground station development mid-session`  
   链接：<https://github.com/anthropics/claude-code/issues/71920>  
   重要性：不仅是分析行为，连开源地面站开发都被影响，说明误伤面覆盖到了正常工程开发。  
   社区反应：3 条评论，说明反馈开始向“开发中断”层面聚集。  

4. **#71919** `[Bug][cyber] Safety block on command catalog analysis during drone firmware reverse-engineering`  
   链接：<https://github.com/anthropics/claude-code/issues/71919>  
   重要性：命令目录分析属于典型的逆向前置步骤，却被判定为安全违规，显示分类器过宽。  
   社区反应：3 条评论，且标注了 `offensive-pentest` 域，进一步凸显误分类。  

5. **#71916** `[Bug][cyber] Safety block interrupts in-progress binary upload and remote service deployment coordination`  
   链接：<https://github.com/anthropics/claude-code/issues/71916>  
   重要性：不仅研究类场景，部署协调和二进制上传也受影响，已经触及通用工程协作。  
   社区反应：3 条评论，表明这类拦截会直接打断 CI/CD 或远程协作流程。  

6. **#71924** `CLAUDE_PROJECT_DIR not set in any subprocess environment on Windows/Claude Desktop`  
   链接：<https://github.com/anthropics/claude-code/issues/71924>  
   重要性：这是少数与安全误报无关、但很明确的平台兼容性 bug，影响 MCP/子进程环境。  
   社区反应：2 条评论，且已关闭，属于可落地修复的环境一致性问题。  

7. **#71913** `[FEATURE] Handle non-gitignored files in .worktreeinclude`  
   链接：<https://github.com/anthropics/claude-code/issues/71913>  
   重要性：反映用户需要更细粒度的工作区文件纳入控制，属于底层工作流能力增强。  
   社区反应：2 条评论，需求明确、实现路径相对清晰。  

8. **#71937** `No mechanism for Claude to generate its own learning signal between sessions`  
   链接：<https://github.com/anthropics/claude-code/issues/71937>  
   重要性：直指 Claude 的跨会话学习/记忆闭环，属于中长期产品能力诉求。  
   社区反应：1 条评论，但方向前瞻，属于高层级产品提案。  

9. **#71928** `[FEATURE] Collapsible Sticky Prompt Block in the VS Code Extension Panel`  
   链接：<https://github.com/anthropics/claude-code/issues/71928>  
   重要性：典型 IDE 交互优化需求，说明 VS Code 扩展的面板空间和提示区占用仍是痛点。  
   社区反应：1 条评论，属于低噪声但高实用度的 UX 诉求。  

10. **#71915** `[Bug][aup] Flight control GUI additions blocked mid-session after implementing drone command features`  
    链接：<https://github.com/anthropics/claude-code/issues/71915>  
    重要性：AUP 误报同样中断合法开发，证明问题不只在 cyber 规则，也在使用政策判定上。  
    社区反应：2 条评论，和同类误报一起构成“策略过严”的证据链。  

---

## 4) 重要 PR 进展
> 过去 24 小时仅发现 1 个 PR 更新，因此本栏无法凑足 10 个；以下列出唯一可见项。

1. **#71798** `.`  
   链接：<https://github.com/anthropics/claude-code/pull/71798>  
   进展：已关闭，但当前摘要为空，无法从公开信息判断具体修复或功能内容。  
   观察：从“标题/描述缺失 + 已关闭”来看，更像是一次占位、清理或未公开说明的变更。

---

## 5) 功能需求趋势
从全部 Issues 看，社区关注点主要集中在以下几个方向：

- **安全策略误报治理**
  - 高频场景：无人机固件分析、USB 协议检查、固件 diff、逆向研究、邮件安全加固、SSH/AD/SMTP 管理。
  - 共同诉求：减少对“合法、授权、偏防御”的工作流误杀，避免 `session-halted` 直接中断。

- **IDE / Desktop 体验优化**
  - 代表需求：VS Code 面板中的可折叠 Sticky Prompt、Claude Desktop 下子进程环境变量一致性。
  - 反映问题：界面占用、上下文传递和环境一致性仍是实际工作中的阻塞点。

- **工作区与文件选择控制**
  - 代表需求：`.worktreeinclude` 对非 gitignored 文件的支持。
  - 本质诉求：让 Claude 更好地理解“哪些文件应纳入任务范围”。

- **跨会话记忆与学习能力**
  - 代表需求：Claude 能否生成自己的学习信号，而不是完全依赖用户纠错。
  - 反映趋势：用户开始期待更强的持续性、个性化和自我优化能力。

- **硬件/固件/嵌入式场景支持**
  - 代表需求：无人机、嵌入式设备、遥测分析、协议解析。
  - 说明：Claude Code 正被用于更多“软硬结合”的开发与研究场景，安全策略需要更细分语义。

---

## 6) 开发者关注点
- **最大痛点是“合法工作被直接掐断”**：大量工单都带有 `session-halted`，对工程效率影响远高于普通报错。  
- **误报集中且可复现**：同一用户连续提交多个高度相似工单，且多被标为 `duplicate`，说明是系统性问题，不是孤立案例。  
- **安全策略与开发场景存在语义错配**：防御性硬化、协议分析、固件 diff、设备研究被过度泛化为高风险行为。  
- **平台兼容性仍有短板**：Windows/Claude Desktop、MCP 子进程环境、VS Code 扩展体验等问题开始被显性提出。  
- **社区开始关注“长期可用性”**：从文件范围控制到跨会话记忆，用户希望 Claude 不只是“能用”，而是“更懂上下文、更少打断、更可持续”。

如果你愿意，我也可以把这份日报进一步整理成：
- **适合发群的精简版**
- **适合内部周报的管理版**
- **附“风险信号 / 产品机会 / 技术债”三栏的分析版**

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-06-28）

## 1) 今日速览
过去 24 小时，Codex 仍处于高频 alpha 迭代状态，Rust/CLI 线连续发布了 3 个小版本，但社区讨论重心明显落在**桌面端稳定性、Windows 兼容性、配额/速率限制误判**上。  
从 Issue 分布看，用户反馈集中在“**崩溃、线程丢失、跨端状态不一致、长会话性能退化**”这几类可直接影响日常使用的问题，说明产品当前的优先级已经从“功能扩张”转向“可靠性与可用性收敛”。

---

## 2) 版本发布
- [rust-v0.143.0-alpha.29](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.29)  
  24 小时内连续 alpha 迭代之一；本次数据未附详细 changelog，但延续了高频修补节奏。
- [rust-v0.143.0-alpha.28](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.28)  
  与前后版本形成连续发布链，显示主线仍在快速回归修复。
- [rust-v0.143.0-alpha.27](https://github.com/openai/codex/releases/tag/rust-v0.143.0-alpha.27)  
  进一步佐证近期以稳定性和小步快跑为主的发布策略。

**简评：** 本轮发布信息没有公开详细改动点，但“连续 3 次 alpha”本身说明团队正在密集收敛问题、缩短反馈闭环。

---

## 3) 社区热点 Issues
> 下面选取过去 24 小时内最值得关注的 10 个 Issue，按影响面与讨论热度综合排序。

1. [#30359 Codex Desktop Crash - June 27, 2026](https://github.com/openai/codex/issues/30359)  
   **重要性：** 桌面端反复崩溃，属于最高优先级可用性问题，直接阻断主流程。  
   **社区反应：** 4 条评论，是当天最热的稳定性反馈之一，说明复现面较广。

2. [#30357 Excessive consumption of the limit: -13% for the "ping" message](https://github.com/openai/codex/issues/30357)  
   **重要性：** “ping” 这种轻量消息竟触发异常额度消耗，影响用户对计费与配额的信任。  
   **社区反应：** 3 条评论，说明配额异常问题已被明确感知并开始聚焦。

3. [#30354 Browser Use policy blocks 1688.com and AliExpress entirely, preventing authorized business workflows](https://github.com/openai/codex/issues/30354)  
   **重要性：** 浏览器策略过严，直接阻断中国电商/采购等真实业务流程。  
   **社区反应：** 3 条评论，属于“可用但不可办事”的典型场景阻塞。

4. [#30385 Codex Desktop: recent local project threads are missing from sidebar/search although session_index and read_thread can load them](https://github.com/openai/codex/issues/30385)  
   **重要性：** 线程“看不见但能读到”，说明索引/展示层可能存在不一致，影响检索与续聊。  
   **社区反应：** 2 条评论，偏向工程型故障，但对项目管理体验伤害很大。

5. [#30381 iOS remote hides worktree selector when a repo has an extra local codex/* branch](https://github.com/openai/codex/issues/30381)  
   **重要性：** 移动端远程工作流中，分支存在即丢失 selector，属于跨端 UI/状态同步缺陷。  
   **社区反应：** 2 条评论，说明问题较具体，但影响协作场景。

6. [#30378 Codex app-server crashes on Windows with Codex process is not available and invalid experimental feature key apps_mcp_path_override](https://github.com/openai/codex/issues/30378)  
   **重要性：** Windows 下 app-server 直接崩溃，且涉及 experimental feature key，风险面高。  
   **社区反应：** 2 条评论，提示配置兼容性与启动链路存在回归。

7. [#30375 Long Codex conversations become progressively much slower, especially after image use](https://github.com/openai/codex/issues/30375)  
   **重要性：** 长会话性能衰减明显，尤其图像参与后加剧，影响重度用户。  
   **社区反应：** 2 条评论，属于“越用越慢”的典型体验痛点。

8. [#30371 Root Cause Identified – CyberArk EPM Caused Codex Desktop App to Be Stuck on Logo Screen](https://github.com/openai/codex/issues/30371)  
   **重要性：** 企业安全软件导致卡 logo，说明 Codex 在受管 Windows 环境中的兼容性仍需加强。  
   **社区反应：** 2 条评论，而且已定位根因，具备较强的排障参考价值。

9. [#30370 Codex Desktop: Pro/Fast reasoning option disappeared from GPT-5.5 picker](https://github.com/openai/codex/issues/30370)  
   **重要性：** 推理档位消失属于模型/产品能力回退，容易引发用户对“功能被拿掉”的感知。  
   **社区反应：** 2 条评论，且已 CLOSED，说明修复或澄清速度较快。

10. [#30349 Codex CLI and desktop app report usage limit despite Plus account showing available quota](https://github.com/openai/codex/issues/30349)  
    **重要性：** 账户明明有额度却提示限额，属于计费/鉴权链路信任问题。  
    **社区反应：** 2 条评论，与 #30357 一起构成“配额显示与实际消耗不一致”的明显趋势。

---

## 4) 重要 PR 进展
> 本次数据中仅有 4 条 PR 更新，以下为全部可见 PR 中最重要的进展。

1. [#30384 increase currentTime/read timeout](https://github.com/openai/codex/pull/30384)  
   **状态：** CLOSED  
   **内容：** 将外部 `currentTime/read` 请求超时从 5 秒提高到 10 秒，缓解短超时导致的失败。

2. [#30369 Support durable external Matrix thread goals](https://github.com/openai/codex/pull/30369)  
   **状态：** OPEN  
   **内容：** 为 Matrix-backed shared threads 提供持久化外部 goal API，是共享线程能力的重要底座。

3. [#30341 Preserve late steer after turn finalization](https://github.com/openai/codex/pull/30341)  
   **状态：** OPEN  
   **内容：** 修复用户输入在 turn finalization 阶段“晚到丢失”的竞态，提升线程交互一致性。

4. [#30334 telemetry: log structured tool and inference timing events](https://github.com/openai/codex/pull/30334)  
   **状态：** OPEN  
   **内容：** 增加结构化工具与推理耗时日志，便于定位调度、排队和 handler 时延。

---

## 5) 功能需求趋势
从全部 Issue 看，社区当前最关注的方向主要有以下几类：

- **桌面端稳定性与崩溃修复**  
  关注点集中在启动崩溃、V8 OOM、SIGKILL、日志/插件异常等。  
  代表链接：[#30359](https://github.com/openai/codex/issues/30359)、[#30376](https://github.com/openai/codex/issues/30376)、[#30389](https://github.com/openai/codex/issues/30389)

- **Windows 兼容性与企业环境适配**  
  包括 Windows 下 app-server、Computer Use、NetFwPolicy2、CyberArk 等问题。  
  代表链接：[#30378](https://github.com/openai/codex/issues/30378)、[#30371](https://github.com/openai/codex/issues/30371)、[#30382](https://github.com/openai/codex/issues/30382)、[#30365](https://github.com/openai/codex/issues/30365)

- **配额、速率限制与推理消耗透明度**  
  用户反复反馈“额度明明有却提示不足”“轻量消息也大量耗额”“背景建议偷偷吃 token”。  
  代表链接：[#30357](https://github.com/openai/codex/issues/30357)、[#30349](https://github.com/openai/codex/issues/30349)、[#30390](https://github.com/openai/codex/issues/30390)、[#30364](https://github.com/openai/codex/issues/30364)

- **跨端线程/会话同步一致性**  
  远程、移动、桌面之间的线程可见性、工作区选择器、归档与工具权限同步是高频问题。  
  代表链接：[#30385](https://github.com/openai/codex/issues/30385)、[#30381](https://github.com/openai/codex/issues/30381)、[#30386](https://github.com/openai/codex/issues/30386)、[#30380](https://github.com/openai/codex/issues/30380)

- **浏览器/Computer Use 的权限边界与站点兼容性**  
  社区希望更灵活地处理企业站点、受限站点和已登录浏览器会话。  
  代表链接：[#30354](https://github.com/openai/codex/issues/30354)、[#30368](https://github.com/openai/codex/issues/30368)、[#30366](https://github.com/openai/codex/issues/30366)

- **长会话性能退化与资源占用**  
  包括越聊越慢、内存泄漏、后台 token/建议任务占用过高。  
  代表链接：[#30375](https://github.com/openai/codex/issues/30375)、[#30389](https://github.com/openai/codex/issues/30389)、[#30390](https://github.com/openai/codex/issues/30390)

---

## 6) 开发者关注点
- **“可用性优先”已经压过“新功能优先”**：大量反馈都指向崩溃、卡死、慢、同步错乱，而不是新能力。  
  代表链接：[#30359](https://github.com/openai/codex/issues/30359)、[#30375](https://github.com/openai/codex/issues/30376)

- **Windows 是当前最敏感的平台之一**：从安全软件、网络策略到 app-server 生命周期，问题覆盖面很广。  
  代表链接：[#30371](https://github.com/openai/codex/issues/30371)、[#30378](https://github.com/openai/codex/issues/30378)、[#30372](https://github.com/openai/codex/issues/30372)

- **配额/消耗的可解释性不足**：用户对“为什么扣这么多”“为什么明明有额度却报错”非常敏感。  
  代表链接：[#30357](https://github.com/openai/codex/issues/30357)、[#30349](https://github.com/openai/codex/issues/30349)、[#30390](https://github.com/openai/codex/issues/30390)

- **日志与诊断能力是开发侧刚需**：既有人反馈 TRACE 日志无法被压住，也有人在推动结构化耗时日志。  
  代表链接：[#30391](https://github.com/openai/codex/issues/30391)、[#30392](https://github.com/openai/codex/issues/30392)、[#30334](https://github.com/openai/codex/pull/30334)

- **跨端一致性和线程持久化正在成为基础能力**：这不只是“体验问题”，而是影响协作、续聊和项目管理的底层能力。  
  代表链接：[#30385](https://github.com/openai/codex/issues/30385)、[#30381](https://github.com/openai/codex/issues/30381)、[#30369](https://github.com/openai/codex/pull/30369)

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发群的精简版**，或  
2. **适合管理层看的 1 页摘要版**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-06-28）

## 1) 今日速览
今天 Gemini CLI 社区更新以 **安全修复** 和 **Agent/交互行为纠偏** 为主线：PR 侧集中在路径穿越防护、环境变量脱敏、shell 参数展开确认、以及 bot 补丁发布边界控制。Issue 侧则主要反映 **登录后卡住、搜索行为异常、以及历史问题重复出现** 等使用体验问题。  
**今日没有新 Release。**

---

## 2) 版本发布
- **无新 Releases**

---

## 3) 社区热点 Issues
> 本次 24 小时内仅有 **5 条更新 Issue**，以下全部列为重点关注。

### 1. [#28177](https://github.com/google-gemini/gemini-cli/issues/28177)  
**BUG: 登录成功后卡在认证窗口选项框**
- **重要性**：这是当前最影响可用性的阻塞型问题之一，直接影响用户完成登录后的继续操作。
- **社区反应**：已收到 **2 条评论**、**2 个赞**，说明问题具有一定复现面和用户共鸣。
- **关注点**：登录态切换后 UI/终端状态未正确退出，疑似认证流程与终端交互状态机存在缺陷。

### 2. [#28176](https://github.com/google-gemini/gemini-cli/issues/28176)  
**why my gemini cli search on google. even if dont even work**
- **重要性**：反映用户对 CLI 行为边界的困惑，尤其是“使用 API Key 却仍触发 Google 搜索”的预期不一致问题。
- **社区反应**：当前 **0 评论**，但属于产品理解和行为一致性问题，容易在新用户中扩散。
- **关注点**：模型/工具调用策略是否在不同鉴权方式下仍保留搜索能力，以及相关默认行为是否清晰。

### 3. [#28174](https://github.com/google-gemini/gemini-cli/issues/28174)  
**Elastic api 1**
- **重要性**：标题和描述都较不清晰，但已进入更新列表，说明可能是某类 API/集成问题或使用场景反馈。
- **社区反应**：**2 条评论**，但有效信息不足，适合尽快补充复现路径。
- **关注点**：需要问题模板化补充，否则难以进入工程修复队列。

### 4. [#28170](https://github.com/google-gemini/gemini-cli/issues/28170)  
**Same issue here.https://ncps.dev/**
- **重要性**：这是典型的“同类问题复现”贴，说明某个已存在缺陷仍在持续影响用户。
- **社区反应**：**1 条评论**，目前信息量有限，但有助于确认问题不是孤例。
- **关注点**：建议关联到历史主 Issue，便于集中排查与去重。

### 5. [#28173](https://github.com/google-gemini/gemini-cli/issues/28173)  
**自动 stale 提醒后的待关闭问题**
- **重要性**：不是新缺陷，但反映了社区中大量长期未活跃议题的治理状态。
- **社区反应**：**0 评论**，由 bot 自动标记。
- **关注点**：说明项目维护正在通过 stale 机制清理陈旧问题，帮助聚焦高优先级缺陷。

---

## 4) 重要 PR 进展
> 本次 24 小时内仅有 **7 条更新 PR**，以下全部列为重点关注。

### 1. [#28180](https://github.com/google-gemini/gemini-cli/pull/28180)  
**fix(security): 恢复 at-reference 文件的防御性路径解析**
- **内容**：重新引入 `resolveDefensiveToolPath` 和 `resolveToRealPath`，修复此前回退导致的符号链接/路径穿越风险。
- **重要性**：这是当前最关键的安全修复之一，直接关系到 `read_file` / `write_file` / `edit` 工具的安全边界。

### 2. [#28179](https://github.com/google-gemini/gemini-cli/pull/28179)  
**fix(security): 从 ALWAYS_ALLOWED 环境变量中移除 ISSUE_BODY / ISSUE_TITLE**
- **内容**：避免 `ISSUE_BODY`、`ISSUE_TITLE` 无条件绕过环境变量净化并进入 AI 提示词。
- **重要性**：属于提示词泄露与数据外传防护，尤其对 GitHub Actions / CI 场景重要。

### 3. [#28178](https://github.com/google-gemini/gemini-cli/pull/28178)  
**fix(security): 要求 bot patch 产物必须显式批准**
- **内容**：为 bot 发布链路引入批准标记，避免未授权的 `bot-changes.patch` 被自动消费。
- **重要性**：强化“推理结果 → 发布动作”的安全边界，降低自动化供应链风险。

### 4. [#28175](https://github.com/google-gemini/gemini-cli/pull/28175)  
**fix(policy): shell 参数展开需要确认**
- **内容**：交互模式下降级为确认；YOLO/非交互模式下直接拒绝 shell 参数展开。
- **重要性**：这是防止命令注入和误执行的关键策略修复，对终端工具安全性影响大。

### 5. [#28172](https://github.com/google-gemini/gemini-cli/pull/28172)  
**fix(agent): 防止任务失败后静默扩大作用范围**
- **内容**：修复 Agent 在任务失败后自行扩大检索/执行范围的问题。
- **重要性**：这是典型的 Agent 行为控制问题，能减少“超范围读取文件/执行脚本”。

### 6. [#28171](https://github.com/google-gemini/gemini-cli/pull/28171)  
**fix(agent): 初始方案失败时禁止静默扩展 scope**
- **内容**：进一步约束 Agent 在原方案失败后切换策略时的边界，避免未经确认的扩展行为。
- **重要性**：和 #28172 形成组合修复，核心是保证用户授权边界不被绕过。

### 7. [#28169](https://github.com/google-gemini/gemini-cli/pull/28169)  
**feat(evals): 增加 eval coverage 报告命令**
- **内容**：新增 `eval:coverage`，用于统计内置工具的 eval 覆盖率。
- **重要性**：提升评测可观测性，帮助维护者发现工具覆盖盲点。

---

## 5) 功能需求趋势
从本次更新的 Issue 来看，社区关注点主要集中在以下方向：

1. **认证与登录流程稳定性**  
   - 代表问题：[#28177](https://github.com/google-gemini/gemini-cli/issues/28177)  
   - 说明：用户完成登录后仍卡在窗口/选项框，说明认证 UX 仍有明显摩擦。

2. **工具行为可预期性**
   - 代表问题：[#28176](https://github.com/google-gemini/gemini-cli/issues/28176)  
   - 说明：用户对“是否会搜索 Google”“API Key 下默认行为是什么”存在困惑，反映出产品策略需要更明确。

3. **集成与 API 使用场景**
   - 代表问题：[#28174](https://github.com/google-gemini/gemini-cli/issues/28174)  
   - 说明：虽然信息不足，但提示社区仍在探索外部 API / 服务接入能力。

4. **问题复现与归因治理**
   - 代表问题：[#28170](https://github.com/google-gemini/gemini-cli/issues/28170)、[#28173](https://github.com/google-gemini/gemini-cli/issues/28173)  
   - 说明：社区中存在大量“同类问题复现”和“stale 清理”类议题，说明项目需要更强的问题去重与模板引导。

---

## 6) 开发者关注点
从 PR 方向看，开发者当前最在意的是：

- **安全边界收紧**：路径解析、环境变量、补丁消费、shell 参数展开，全部指向“默认拒绝、显式批准”的策略。
- **Agent 行为控制**：尤其是避免在失败或分歧时静默扩大 scope，保障可解释性和用户授权边界。
- **评测可观测性**：新增 `eval:coverage` 体现出团队在补齐工具链评测盲区。
- **CI / 自动化链路安全**：PR 明显在强化 GitHub Actions、bot 补丁和提示词净化的防护措施。

---

如果你希望，我也可以把这份日报进一步整理成 **“适合发 Slack/飞书的一页简报版”** 或 **“带风险等级的管理层摘要版”**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
**日期：2026-06-28**  
数据源：[`github.com/github/copilot-cli`](https://github.com/github/copilot-cli)

## 1) 今日速览
今天仓库没有新的 Release，也没有 PR 更新，社区动态几乎全部来自 Issue 反馈。  
焦点集中在 **1.0.65/1.0.66 版本回归**、**TUI 交互与渲染问题**、以及 **Windows/MCP 兼容性** 上，说明近期稳定性和跨平台体验仍是社区最敏感的话题。  

---

## 2) 社区热点 Issues
> 今日共 8 条更新，本节覆盖全部 8 条。

- [#3958 Windows: v1.0.66 fails to start stdio MCP servers when command is a .bat/.cmd with args (regression from 1.0.65)](https://github.com/github/copilot-cli/issues/3958)  
  **重要性**：这是典型的 **Windows 回归阻断问题**，直接影响 stdio MCP 服务器启动，属于集成层高优先级故障。  
  **社区反应**：已进入 triage，当前 1 条评论、0 👍，说明问题明确但还在收敛范围。  

- [#3964 Copying soft-wrapped output still drops space at wrap boundary on v1.0.65 (incomplete fix of #3666)](https://github.com/github/copilot-cli/issues/3964)  
  **重要性**：复制输出时丢空格会导致文本语义被破坏，影响日志、命令结果和对话内容的可靠复制。  
  **社区反应**：已有 1 条评论，且为 **CLOSED**，说明团队可能已尝试修复，但社区认为问题仍未完全解决。  

- [#3959 Visual artifacts / "ghost" characters remain rendered in TUI after deleting text](https://github.com/github/copilot-cli/issues/3959)  
  **重要性**：属于 **TUI 渲染残留**，会直接损伤 CLI 的可读性和专业感，是高频交互场景中的体验痛点。  
  **社区反应**：当前 0 评论、0 👍，但属于典型界面质量问题，容易在后续被反复提及。  

- [#3957 Unable to scroll through history using trackpad on MBP](https://github.com/github/copilot-cli/issues/3957)  
  **重要性**：影响 MacBook Pro 用户的基础浏览能力，属于 **输入与滚动交互** 的核心可用性问题。  
  **社区反应**：0 评论、0 👍，但场景明确，且对 Mac 用户影响直接。  

- [#3962 [triage] latest copilot (1.0.65) not working](https://github.com/github/copilot-cli/issues/3962)  
  **重要性**：标题显示 **1.0.65 在用户环境中无法正常工作**，这通常意味着启动、命令执行或核心交互链路出现回归。  
  **社区反应**：已有 1 条评论，处于 triage 阶段，说明需要进一步复现和定位。  

- [#3963 [Feature Request] Show session retention/expiration date](https://github.com/github/copilot-cli/issues/3963)  
  **重要性**：反映用户对 **会话生命周期透明度** 的需求，属于产品可预期性和运维可见性问题。  
  **社区反应**：暂无评论，但这类请求通常代表较明确的使用痛点。  

- [#3960 Custom model provider still consuming AI quota](https://github.com/github/copilot-cli/issues/3960)  
  **重要性**：涉及 **配额计费隔离**，是影响多模型/自定义 provider 采用的关键问题。  
  **社区反应**：已 **CLOSED**，但问题本身属于高敏感的计费/资源归属问题，值得持续关注是否彻底修复。  

- [#3961 [triage] ### Duplicate of #**``**](https://github.com/github/copilot-cli/issues/3961)  
  **重要性**：信息量较低，但说明社区在同一类问题上存在 **重复提交/归并需求**。  
  **社区反应**：当前 0 评论、0 👍，更像是待整理的重复项，而非独立需求。  

---

## 3) 重要 PR 进展
**今日无 PR 更新（0 条）**，因此没有可追踪的合并进展。  
PR 入口：[`github.com/github/copilot-cli/pulls`](https://github.com/github/copilot-cli/pulls)

---

## 4) 功能需求趋势
从本日 Issue 可以提炼出以下社区关注方向：

- **TUI/终端交互可靠性**  
  关注点包括复制时格式丢失、删除文本后残影、触控板滚动异常、最新版本不可用等。  
  相关 Issues：[#3964](https://github.com/github/copilot-cli/issues/3964)、[#3959](https://github.com/github/copilot-cli/issues/3959)、[#3957](https://github.com/github/copilot-cli/issues/3957)、[#3962](https://github.com/github/copilot-cli/issues/3962)

- **Windows 与 MCP 生态兼容性**  
  `.bat/.cmd` 启动参数在 Windows 上失效，说明 MCP 集成的跨平台稳定性仍有明显缺口。  
  相关 Issue：[#3958](https://github.com/github/copilot-cli/issues/3958)

- **会话管理可见性**  
  用户希望能直接看到 session 的保留/过期时间，减少“会话突然消失”的不确定性。  
  相关 Issue：[#3963](https://github.com/github/copilot-cli/issues/3963)

- **自定义模型与配额隔离**  
  使用外部/自定义模型提供商时，GitHub AI quota 仍被消耗，说明资源计费归属需要更清晰。  
  相关 Issue：[#3960](https://github.com/github/copilot-cli/issues/3960)

---

## 5) 开发者关注点
- **版本回归风险偏高**：1.0.65、1.0.66 被多条 Issue 同时点名，社区对稳定版的信任度高度依赖回归控制。  
  相关：[#3962](https://github.com/github/copilot-cli/issues/3962)、[#3958](https://github.com/github/copilot-cli/issues/3958)、[#3964](https://github.com/github/copilot-cli/issues/3964)

- **终端 UI 的“可用即正确”要求很强**：复制、重绘、滚动、删除残影这类问题虽然看似细碎，但会直接影响日常使用体验。  
  相关：[#3964](https://github.com/github/copilot-cli/issues/3964)、[#3959](https://github.com/github/copilot-cli/issues/3959)、[#3957](https://github.com/github/copilot-cli/issues/3957)

- **跨平台测试覆盖需要加强**：Windows 专属故障与 Mac 触控板问题同时出现，说明平台差异仍在放大 bug 暴露率。  
  相关：[#3958](https://github.com/github/copilot-cli/issues/3958)、[#3957](https://github.com/github/copilot-cli/issues/3957)

- **会话与配额机制需要更透明**：用户不仅关心“能不能用”，也关心“会话会保留多久”“谁在消耗我的 quota”。  
  相关：[#3963](https://github.com/github/copilot-cli/issues/3963)、[#3960](https://github.com/github/copilot-cli/issues/3960)

---

如果你愿意，我也可以把这份日报进一步整理成 **“管理层摘要版”** 或 **“研发排期版（按优先级排序）”**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-06-28

## 1. 今日速览
今天社区讨论的主线非常明确：**稳定性与性能问题**仍然是最高频痛点，涉及 CPU 飙高、内存泄漏、卡死、启动变慢等多个场景。  
与此同时，项目侧也在持续推进 **V2 会话能力、UI 体验、权限/模式约束、模型与供应商兼容性** 等方向的补齐，说明 OpenCode 仍处于高强度迭代期。  
**今日无新 Release。**

---

## 2. 社区热点 Issues（10）
> 选取标准：评论活跃度、影响面、与近期核心使用路径的相关性。

1. **[#34228](https://github.com/anomalyco/opencode/issues/34228) | 项目 Skills 暴露不稳定、内容不完整**
   - 重要性：直接影响模型可见能力，属于“功能正确性”问题，且会造成跨会话行为不一致。
   - 社区反应：**5 条评论**，是今日最活跃问题之一，说明可复现性和影响面都较强。

2. **[#34207](https://github.com/anomalyco/opencode/issues/34207) | 交互过程中模型选择会悄悄回退**
   - 重要性：模型切换被覆盖会让用户误判当前会话所用模型，影响调试和成本控制。
   - 社区反应：**4 条评论**，明显有复现与确认需求。

3. **[#34226](https://github.com/anomalyco/opencode/issues/34226) | 长会话后 CPU 110%、内存 2GB**
   - 重要性：典型的长期使用退化问题，直接威胁桌面端可用性。
   - 社区反应：**3 条评论**，并给出详细环境信息，属于高价值性能反馈。

4. **[#34222](https://github.com/anomalyco/opencode/issues/34222) | GitHub Copilot MAI-Code-1-Flash 无法接入**
   - 重要性：属于模型供应商兼容性问题，影响企业/组织用户的模型接入策略。
   - 社区反应：**1 个 👍**，说明有人遇到实际阻塞，且问题具有平台兼容性质。

5. **[#34236](https://github.com/anomalyco/opencode/issues/34236) | Desktop 端 CPU 占用偏高**
   - 重要性：与 #34226 同类，但更偏“开箱即用即高负载”的桌面端体验问题。
   - 社区反应：**2 条评论**，说明桌面端资源消耗已成为持续关注点。

6. **[#34214](https://github.com/anomalyco/opencode/issues/34214) | 中途冻结、无响应**
   - 重要性：属于严重可用性问题，会直接打断长会话工作流。
   - 社区反应：**2 条评论**，问题描述明确，通常需要排查事件循环/状态同步链路。

7. **[#34178](https://github.com/anomalyco/opencode/issues/34178) | 可能存在 EventTarget 内存泄漏**
   - 重要性：这类问题往往与长会话性能退化、桌面端崩溃密切相关。
   - 社区反应：**2 条评论**，偏底层，但对稳定性影响很大。

8. **[#34190](https://github.com/anomalyco/opencode/issues/34190) | Plan 模式被绕过并直接执行 gh issue comment**
   - 重要性：涉及模式隔离与权限约束，属于“代理安全边界”问题。
   - 社区反应：**2 条评论**，是今天少见的安全/约束类讨论。

9. **[#34232](https://github.com/anomalyco/opencode/issues/34232) | IDE/桌面扩展缺少会话管理 UI**
   - 重要性：影响会话回溯、恢复与多任务管理，属于高频效率功能缺口。
   - 社区反应：**2 条评论**，说明用户对桌面与 TUI 的功能对齐有明确预期。

10. **[#34223](https://github.com/anomalyco/opencode/issues/34223) | Web UI 文件树开关被桌面端门控**
    - 重要性：Web 端与 Desktop 端能力割裂，影响远程/浏览器场景使用。
    - 社区反应：**1 条评论**，但问题很具体，属于产品一致性问题。

---

## 3. 重要 PR 进展（10）
> 选取标准：功能影响面、修复链路深度、与热点问题的关联度。

1. **[#34270](https://github.com/anomalyco/opencode/pull/34270) | port MiMo tools and subsystems to opencode**
   - 内容：新增多种工具与子系统，包括 `multiedit / notebook_edit / codesearch / memory / history / change_directory` 等。
   - 意义：这是一次较大的能力扩展，直接增强 Agent 工具栈与会话上下文能力。

2. **[#34264](https://github.com/anomalyco/opencode/pull/34264) | TUI 会话重命名**
   - 内容：补齐会话重命名端到端链路，从 schema、core、protocol 到 server/UI 全链路接入。
   - 意义：会话管理体验的重要补丁，和用户长期使用场景高度相关。

3. **[#34263](https://github.com/anomalyco/opencode/pull/34263) | V2 会话支持 undo/redo/revert**
   - 内容：把 staged-revert 能力接入 TUI，替换未实现占位。
   - 意义：这是 V2 会话可编辑性的重要里程碑，提升交互可控性。

4. **[#34261](https://github.com/anomalyco/opencode/pull/34261) | 修复 compaction 无进展时的非收敛问题**
   - 内容：当压缩不再推进时，避免 overflow recovery 继续空转。
   - 意义：对应一类潜在死循环/性能异常，和当前社区对稳定性的关注高度一致。

5. **[#34258](https://github.com/anomalyco/opencode/pull/34258) | 弹窗打开时禁用 diff-viewer 快捷键**
   - 内容：避免模态窗口下快捷键误触。
   - 意义：典型的 TUI 交互修复，能减少“操作错位”和状态污染。

6. **[#34256](https://github.com/anomalyco/opencode/pull/34256) | 服务器端提前拒绝外部目录提示**
   - 内容：在实例查找前拦截 foreign directory hints。
   - 意义：修复跨目录/跨实例解析问题，降低路径歧义风险。

7. **[#34254](https://github.com/anomalyco/opencode/pull/34254) | session 页面错误隔离**
   - 内容：为 session 页面主面板增加 ErrorBoundary，避免局部错误拖垮整个 tab shell。
   - 意义：提升 Web/桌面页面的容错能力，属于体验型稳定性修复。

8. **[#34253](https://github.com/anomalyco/opencode/pull/34253) | 修复 sandbox 项目编辑解析**
   - 内容：按 project ID / worktree / sandbox membership 精准匹配项目元数据。
   - 意义：对应沙箱/工作区编辑路径的正确性，减少误判更新。

9. **[#34242](https://github.com/anomalyco/opencode/pull/34242) | 防止 piped stdin 破坏 UI 与键盘输入**
   - 内容：解决 stdin 管道输入对交互 UI 的干扰。
   - 意义：这是 CLI 场景下的关键兼容修复，能影响脚本化使用体验。

10. **[#34267](https://github.com/anomalyco/opencode/pull/34267) | 插件追加单条 system message 时正确折叠**
    - 内容：修正 LLM 请求中 system message 的 collapse 逻辑。
    - 意义：属于底层请求组装修复，能减少提示词结构异常带来的模型行为偏差。

---

## 4. 功能需求趋势
从今日 Issues 看，社区最关注的功能方向主要集中在以下几类：

1. **稳定性与性能优化**
   - 高频词：CPU 飙高、内存泄漏、卡死、启动慢、长会话退化。
   - 代表问题：[#34226](https://github.com/anomalyco/opencode/issues/34226)、[#34236](https://github.com/anomalyco/opencode/issues/34236)、[#34178](https://github.com/anomalyco/opencode/issues/34178)、[#34214](https://github.com/anomalyco/opencode/issues/34214)

2. **模型兼容与供应商接入**
   - 包括新模型可用性、接口适配、认证方式差异。
   - 代表问题：[#34222](https://github.com/anomalyco/opencode/issues/34222)、[#34250](https://github.com/anomalyco/opencode/issues/34250)、[#34177](https://github.com/anomalyco/opencode/issues/34177)

3. **IDE / Desktop / Web 端体验对齐**
   - 用户希望不同入口具备一致的会话管理、文件树、调试与恢复能力。
   - 代表问题：[#34232](https://github.com/anomalyco/opencode/issues/34232)、[#34223](https://github.com/anomalyco/opencode/issues/34223)、[#34269](https://github.com/anomalyco/opencode/issues/34269)

4. **会话管理能力增强**
   - 包括重命名、恢复、历史浏览、会话卡片等。
   - 代表问题/PR：[#34257](https://github.com/anomalyco/opencode/issues/34257)、[#34264](https://github.com/anomalyco/opencode/pull/34264)、[#34263](https://github.com/anomalyco/opencode/pull/34263)、[#34229](https://github.com/anomalyco/opencode/issues/34229)

5. **代理安全与模式边界**
   - 社区开始关注 Plan 模式、权限提示、工具执行边界是否被绕过。
   - 代表问题：[#34190](https://github.com/anomalyco/opencode/issues/34190)

6. **路径、沙箱与上下文解析正确性**
   - 目录提示、sandbox 编辑、技能加载一致性都在被持续验证。
   - 代表问题：[#34255](https://github.com/anomalyco/opencode/issues/34255)、[#34228](https://github.com/anomalyco/opencode/issues/34228)、[#34253](https://github.com/anomalyco/opencode/pull/34253)

---

## 5. 开发者关注点
从今天的反馈来看，开发者最需要优先关注的痛点是：

- **长会话稳定性**：冻结、无响应、无限重试、资源泄漏是最容易放大用户流失的问题。  
- **模型状态一致性**：模型切换、技能暴露、system message 折叠等问题会直接影响 Agent 行为可预测性。  
- **多端能力一致性**：Desktop、TUI、Web、IDE 之间的功能落差正在被频繁指出。  
- **供应商接入与认证适配**：新模型/新认证方式的兼容速度，已成为用户评估 OpenCode 可用性的核心指标。  
- **交互容错与权限边界**：模式约束、快捷键冲突、stdin 干扰等细节，正在影响专业用户的信任感。

如果你需要，我可以把这份日报进一步整理成：
1. **适合内部晨会的 1 页简报版**，或  
2. **带“风险等级 / 优先级 / 负责人建议”的运营分析版**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-06-28）

## 1) 今日速览
今天社区讨论仍然高度集中在 **扩展生态、编辑器/IDE 集成、模型兼容性和 TUI 稳定性** 上。过去 24 小时没有新 Release，但 Issues 与 PR 持续围绕“让 Pi 更像可嵌入式开发平台”推进，尤其是扩展工具执行、成本上报、外部编辑器配置等能力。  
从反馈看，社区同时在解决一些体验型痛点：如多 tool call 时界面闪烁、渲染异常被静默吞掉、以及某些语言输入会破坏 harness。

---

## 2) 版本发布
- **无新 Release**（过去 24 小时）

---

## 3) 社区热点 Issues（10 个）

> 说明：以下优先选取对产品方向、稳定性或扩展能力影响较大的问题。

### 1. 多个 tool call 同步流式输出导致全屏闪烁
- **Issue**：#6131  
- **类型**：bug / TUI 稳定性  
- **为什么重要**：当模型一次返回多个 tool calls 时，界面会反复整屏重绘，直接影响可用性与观看体验。  
- **社区反应**：问题描述清晰，且复现条件明确，属于高优先级交互问题。  
- **链接**：https://github.com/badlogic/pi-mono/issues/6131

### 2. renderCall / renderResult 静默吞掉异常
- **Issue**：#6130  
- **类型**：bug / 调试可观测性  
- **为什么重要**：渲染层异常被 fallback 掉会掩盖真正错误，导致排查时间被大幅拉长。  
- **社区反应**：提问者明确表示因此浪费了数小时，说明该问题对开发者效率影响很大。  
- **链接**：https://github.com/badlogic/pi-mono/issues/6130

### 3. `--append-system-prompt` 不能覆盖默认 coding-agent 身份
- **Issue**：#6127  
- **类型**：功能/行为设计  
- **为什么重要**：影响 Pi 作为后端嵌入其他 agent 框架时的身份注入与角色定制能力。  
- **社区反应**：来自 bot 用户场景，代表 Pi 正在被用作“可编排聊天后端”。  
- **链接**：https://github.com/badlogic/pi-mono/issues/6127

### 4. 扩展安装/更新希望支持额外包管理参数
- **Issue**：#6126  
- **类型**：功能请求 / 扩展生态  
- **为什么重要**：用户希望通过 `npmInstallArgs` / `npmUpdateArgs` 控制安装策略，尤其是企业、供应链安全、延迟发布等场景。  
- **社区反应**：与 #6125 形成一组强需求，说明该方向存在一致诉求。  
- **链接**：https://github.com/badlogic/pi-mono/issues/6126

### 5. 扩展安装/更新可配置额外参数（另一版本提案）
- **Issue**：#6125  
- **类型**：功能请求 / 扩展生态  
- **为什么重要**：与 #6126 本质同类，表明社区对“包安装链路可控性”关注很高。  
- **社区反应**：被重复提及，通常意味着需求稳定且并非个例。  
- **链接**：https://github.com/badlogic/pi-mono/issues/6125

### 6. 希望扩展可以执行已注册工具
- **Issue**：#6121  
- **类型**：平台能力 / 扩展 API  
- **为什么重要**：这是把 Pi 从“使用工具的 agent”推进到“可编程平台”的关键能力。  
- **社区反应**：提到有 `pi-eval` 这类 codemode 扩展需求，说明高级用户正在构建二次开发链路。  
- **链接**：https://github.com/badlogic/pi-mono/issues/6121

### 7. `reportUsage()`：让扩展把子 agent 成本汇总到 session footer
- **Issue**：#6120  
- **类型**：功能请求 / 成本可视化  
- **为什么重要**：多 agent 场景下，成本归集与总览是刚需，否则用户看不到完整 token/cost 账单。  
- **社区反应**：与 PR #6119 直接关联，说明需求已进入实现阶段。  
- **链接**：https://github.com/badlogic/pi-mono/issues/6120

### 8. RPC 路径希望支持音频透传
- **Issue**：#6118  
- **类型**：功能请求 / 多模态 / RPC  
- **为什么重要**：这关系到 Pi 作为后端被外部 GUI/桌面端接入时的多模态能力边界。  
- **社区反应**：来自 Qt 前端集成者，说明 Pi 正在被当作通用 LLM 后端使用。  
- **链接**：https://github.com/badlogic/pi-mono/issues/6118

### 9. `createAgentSession` 公共 SDK 导入缺少稳定 faux-provider 路径
- **Issue**：#6117  
- **类型**：bug / SDK 稳定性  
- **为什么重要**：影响下游程序化 SDK 的 deterministic 测试与发布包一致性。  
- **社区反应**：属于面向开发者的基础设施问题，影响集成质量。  
- **链接**：https://github.com/badlogic/pi-mono/issues/6117

### 10. `pi install` 在无写权限时仍显示安装成功
- **Issue**：#6112  
- **类型**：bug / 安装可靠性  
- **为什么重要**：这是典型的“假成功”问题，会直接导致用户后续命令不可用。  
- **社区反应**：与 PR #6111 配套，说明安装链路已有明确修复方向。  
- **链接**：https://github.com/badlogic/pi-mono/issues/6112

---

## 4) 重要 PR 进展（目前仅 4 条更新）

> 注：过去 24 小时仅更新了 4 个 PR，以下为全部纳入。

### 1. 为 Ctrl+G 增加可配置外部编辑器
- **PR**：#6123  
- **内容**：允许通过 `settings.json` 配置外部编辑器，不再只依赖 `$VISUAL` / `$EDITOR`。  
- **价值**：解决 Windows + Git Bash 等环境下编辑器变量不稳定的问题。  
- **链接**：https://github.com/badlogic/pi-mono/pull/6123

### 2. 为扩展增加 `reportUsage` API
- **PR**：#6119  
- **内容**：新增扩展上报 token/cost 的接口，让子 agent 开销可汇总到主会话。  
- **价值**：补齐多 agent 计费与会话统计链路。  
- **链接**：https://github.com/badlogic/pi-mono/pull/6119

### 3. 讨论：可配置 chat padding
- **PR**：#6115  
- **内容**：尝试引入 TUI 层的 padding 配置开关。  
- **价值**：属于界面可定制性改进，但作者也指出它会牵动较大 TUI 结构调整。  
- **链接**：https://github.com/badlogic/pi-mono/pull/6115

### 4. 安装/移除时正确报告 settings 写入失败
- **PR**：#6111  
- **内容**：修复 `pi install` / remove 在 settings.json 不可写时仍提示成功的问题。  
- **价值**：避免“已安装但命令不可用”的假成功状态。  
- **链接**：https://github.com/badlogic/pi-mono/pull/6111

---

## 5) 功能需求趋势

从近期 Issues 看，社区最关注的方向主要有：

1. **扩展/插件生态增强**
   - 扩展执行工具、上报 usage、安装参数可配置等需求密集出现。
   - 说明 Pi 正在从单纯聊天终端，演进为可编排的平台。

2. **IDE / 编辑器 / 外部工具集成**
   - 外部编辑器配置、RPC 音频透传、SDK 稳定导入路径等问题频发。
   - 社区明显希望 Pi 更容易接入现有开发工作流。

3. **TUI 稳定性与可观测性**
   - tool call 多流渲染闪烁、异常静默吞掉、语言输入破坏 UI 等，都是“体验层高优先级”问题。
   - 这类问题直接影响专业开发者的使用信心。

4. **模型兼容性与行为控制**
   - 针对 diffusiongemma、mimo、Azure OpenAI 等模型的兼容问题持续出现。
   - 社区期待 Pi 在不同 provider / gateway 下具有更一致的行为抽象。

5. **安装与发布链路可靠性**
   - 安装写入失败但返回成功、扩展更新参数控制等，体现出大家对供应链与安装正确性的关注上升。

---

## 6) 开发者关注点

结合今日反馈，开发者最常提到的痛点是：

- **“看似成功，实际失败”**  
  安装成功但未写入 settings、渲染异常被吞、模型能力被误判等，都会显著增加排障成本。

- **“我需要更可控的集成方式”**  
  包括自定义外部编辑器、扩展调用工具、RPC 音频透传、SDK 稳定导入路径，这些都指向更强的嵌入式能力。

- **“成本统计要可汇总”**  
  多 agent、多扩展协作时，用户希望 token/cost 能统一展示，而不是散落在单个 tool result 中。

- **“TUI 不能影响主流程”**  
  多 tool call 闪烁、输入某些文字导致界面异常，说明 UI 层稳定性仍是用户体验关键。

- **“模型与网关适配要更稳”**  
  社区在不同 provider、gateway、模型家族间切换频繁，Pi 需要更清晰的兼容边界与错误提示。

---

如果你愿意，我可以继续把这份日报整理成：
1. **更适合 Slack / 飞书的短版**，或  
2. **适合内部周报的分析版**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-06-28）
数据源：`github.com/QwenLM/qwen-code`

## 1) 今日速览
今天社区动态以 **稳定性修复 + 性能/成本优化 + 工作流健壮性** 为主。最新 nightly 版本已发布，包含 `web_fetch` 的 JSON fallback 修复；同时，过去 24 小时内多个核心 PR 聚焦于 **避免循环重试、修复会话恢复、降低空闲资源占用**，说明项目正在集中解决“可用但不够稳”的体验问题。  
相关链接：[Release v0.19.2-nightly.20260628.714513df2](https://github.com/QwenLM/qwen-code/releases/tag/v0.19.2-nightly.20260628.714513df2)

## 2) 版本发布
### v0.19.2-nightly.20260628.714513df2
- 修复 `core` 中 `web_fetch` 的 JSON fallback 行为，提升在非标准返回格式下的兼容性。  
- 该 nightly 属于小步快跑型发布，重点更偏向“修 bug + 保可用性”，而非大功能扩张。  
链接：[Release notes](https://github.com/QwenLM/qwen-code/releases/tag/v0.19.2-nightly.20260628.714513df2)

---

## 3) 社区热点 Issues
> 说明：过去 24 小时内共更新 9 条 Issues，以下列出全部 9 条高关注议题。

1. **[#5922] cua-driver.exe 后台空闲仍高 CPU，占用像“病毒”**  
   - 重要性：直接影响 Windows 用户体验和系统资源占用，属于高感知性能问题。  
   - 社区反应：`3` 条评论，典型“高优先级可复现 bug”，且已关闭，说明修复节奏较快。  
   - 链接：[Issue #5922](https://github.com/QwenLM/qwen-code/issues/5922)

2. **[#5920] `/rewind` 记录 `parentUuid: null`，恢复后对话历史断裂**  
   - 重要性：影响会话回溯与 resume 可靠性，是核心工作流问题。  
   - 社区反应：`3` 条评论，问题描述清晰，且已关闭，表明开发者已介入修复。  
   - 链接：[Issue #5920](https://github.com/QwenLM/qwen-code/issues/5920)

3. **[#5942] Anthropic provider 缓存命中失效导致 prompt-cache 成本膨胀**  
   - 重要性：这是典型的“隐性成本”问题，直接影响 API 使用费用与响应效率。  
   - 社区反应：`2` 条评论，问题细节较技术化，说明社区对成本/缓存行为很敏感。  
   - 链接：[Issue #5942](https://github.com/QwenLM/qwen-code/issues/5942)

4. **[#5941] 大模型输出时滚轮上滑会直接跳到顶部（Windows UI bug）**  
   - 重要性：交互体验明显异常，属于高频 UI 可用性问题。  
   - 社区反应：`2` 条评论，且复现环境明确，适合快速定位。  
   - 链接：[Issue #5941](https://github.com/QwenLM/qwen-code/issues/5941)

5. **[#5939] high-output 模型下 `max_tokens` 升级逻辑出现无效/多余升级**  
   - 重要性：涉及 token 管理与输出恢复策略，直接影响大模型调用稳定性和成本控制。  
   - 社区反应：`2` 条评论，属于典型的“修复后遗症/回归优化”议题。  
   - 链接：[Issue #5939](https://github.com/QwenLM/qwen-code/issues/5939)

6. **[#5936] 研究 Claude Chrome extension 架构，推进 Qwen Code Browser SDK 方向**  
   - 重要性：属于产品路线级议题，关系到浏览器/扩展/daemon 架构演进。  
   - 社区反应：`2` 条评论，说明社区在探索更深的 IDE/浏览器集成路径。  
   - 链接：[Issue #5936](https://github.com/QwenLM/qwen-code/issues/5936)

7. **[#5929] workflow stall 环境变量接受非十进制秒数**  
   - 重要性：配置解析的边界条件问题，影响 watchdog 行为的确定性。  
   - 社区反应：`2` 条评论，问题小但很“底层”，已关闭。  
   - 链接：[Issue #5929](https://github.com/QwenLM/qwen-code/issues/5929)

8. **[#5933] `/mcp` 管理对话框右边框被裁剪**  
   - 重要性：UI 视觉 bug，虽不影响核心功能，但影响产品专业度。  
   - 社区反应：`1` 条评论，已关闭，说明属于快速修复的低风险问题。  
   - 链接：[Issue #5933](https://github.com/QwenLM/qwen-code/issues/5933)

9. **[#5932] 文件编辑重试可能出现工具使用循环**  
   - 重要性：这是 agent/工具链稳定性问题，可能导致重复调用、浪费上下文和时间。  
   - 社区反应：`1` 条评论，带有具体截图证据，属于值得持续跟踪的行为类 bug。  
   - 链接：[Issue #5932](https://github.com/QwenLM/qwen-code/issues/5932)

---

## 4) 重要 PR 进展
1. **[#5934] 修复重复 truncated write_file/edit 重试导致的循环**
   - 重点：调整默认 `max_tokens` 到模型真实输出上限，避免大文件写入被截断后反复重试。  
   - 意义：这是今天最关键的稳定性修复之一，直接对应社区高频的“工具循环”问题。  
   - 链接：[PR #5934](https://github.com/QwenLM/qwen-code/pull/5934)

2. **[#5925] 空闲时停止 Computer Use `cua-driver`**
   - 重点：共享驱动在无任务时自动退出，默认 5 分钟空闲超时。  
   - 意义：精准回应 Windows 上高 CPU、后台驻留的问题。  
   - 链接：[PR #5925](https://github.com/QwenLM/qwen-code/pull/5925)

3. **[#5923] preserve rewind parents after resume**
   - 重点：恢复会话时保留 `parentUuid` 关系，修复历史树断裂。  
   - 意义：直接对应 `/rewind` / resume 场景的数据完整性问题。  
   - 链接：[PR #5923](https://github.com/QwenLM/qwen-code/pull/5923)

4. **[#5946] Anthropic SDK abort listener 泄漏隔离**
   - 重点：为每次请求创建 child controller，避免 abort listener 泄漏。  
   - 意义：提升长会话/高频请求下的资源稳定性。  
   - 链接：[PR #5946](https://github.com/QwenLM/qwen-code/pull/5946)

5. **[#5944] 停止重复 shell inspection variants**
   - 重点：为重复的只读 shell 检查命令增加循环守卫。  
   - 意义：抑制 agent 反复执行 `git status/diff/ls-files` 一类无效操作。  
   - 链接：[PR #5944](https://github.com/QwenLM/qwen-code/pull/5944)

6. **[#5938] `qwen serve` 启用 compile cache，并延后版本获取**
   - 重点：优化 daemon 启动耗时。  
   - 意义：属于启动性能改进，适合服务端/常驻场景。  
   - 链接：[PR #5938](https://github.com/QwenLM/qwen-code/pull/5938)

7. **[#5937] 拆分 serve server assembly**
   - 重点：继续拆分 `qwen serve` 的结构化装配逻辑。  
   - 意义：提升代码可维护性，为后续性能和功能迭代打基础。  
   - 链接：[PR #5937](https://github.com/QwenLM/qwen-code/pull/5937)

8. **[#5931] web-shell 增加 workspace session sidebar**
   - 重点：支持新建、切换、重命名、删除、搜索会话等功能。  
   - 意义：显著增强 Web 端多会话管理能力。  
   - 链接：[PR #5931](https://github.com/QwenLM/qwen-code/pull/5931)

9. **[#5928] 为 todos 增加项目本地持久化目录**
   - 重点：允许 todo-write 工具将任务状态存到项目内目录。  
   - 意义：更适合团队协作、Git 同步和跨机器复用。  
   - 链接：[PR #5928](https://github.com/QwenLM/qwen-code/pull/5928)

10. **[#5921] 底部显示定时任务数量**
   - 重点：在 footer 展示当前活跃 scheduled tasks 数量。  
   - 意义：增强可观察性，让用户更直观地感知后台任务状态。  
   - 链接：[PR #5921](https://github.com/QwenLM/qwen-code/pull/5921)

---

## 5) 功能需求趋势
从今日 Issues 看，社区关注点主要集中在以下方向：

1. **稳定性与防循环机制**
   - 典型表现：重复写文件重试、shell inspection 循环、tool-use loop。  
   - 代表链接：[#5932](https://github.com/QwenLM/qwen-code/issues/5932)、[#5934](https://github.com/QwenLM/qwen-code/pull/5934)、[#5944](https://github.com/QwenLM/qwen-code/pull/5944)

2. **性能与成本优化**
   - 典型表现：后台空闲进程高 CPU、Anthropic prompt cache miss、启动耗时优化。  
   - 代表链接：[#5922](https://github.com/QwenLM/qwen-code/issues/5922)、[#5942](https://github.com/QwenLM/qwen-code/issues/5942)、[#5938](https://github.com/QwenLM/qwen-code/pull/5938)

3. **会话恢复与历史完整性**
   - 典型表现：rewind/resume 后 parent 关系丢失、历史视图断裂。  
   - 代表链接：[#5920](https://github.com/QwenLM/qwen-code/issues/5920)、[#5923](https://github.com/QwenLM/qwen-code/pull/5923)

4. **Web/浏览器/扩展集成**
   - 典型表现：Chrome extension 架构研究、web-shell session sidebar、MCP 管理能力。  
   - 代表链接：[#5936](https://github.com/QwenLM/qwen-code/issues/5936)、[#5931](https://github.com/QwenLM/qwen-code/pull/5931)、[#5935](https://github.com/QwenLM/qwen-code/pull/5935)

5. **Windows 与 CLI 交互细节**
   - 典型表现：滚轮行为、边框渲染、后台驱动占用。  
   - 代表链接：[#5941](https://github.com/QwenLM/qwen-code/issues/5941)、[#5933](https://github.com/QwenLM/qwen-code/issues/5933)、[#5925](https://github.com/QwenLM/qwen-code/pull/5925)

6. **任务/自动化管理更透明**
   - 典型表现：cron 搜索意图优化、任务计数展示、todo 本地化持久化。  
   - 代表链接：[#5927](https://github.com/QwenLM/qwen-code/pull/5927)、[#5921](https://github.com/QwenLM/qwen-code/pull/5921)、[#5928](https://github.com/QwenLM/qwen-code/pull/5928)

---

## 6) 开发者关注点
- **减少“看起来像卡死”的行为**：高 CPU、循环重试、重复 shell 检查会显著降低用户信任。  
  链接：[#5922](https://github.com/QwenLM/qwen-code/issues/5922)、[#5934](https://github.com/QwenLM/qwen-code/pull/5934)

- **把成本控制前置到协议与缓存层**：Anthropic 路由的 prompt-cache miss 已被明确指出会抬高费用。  
  链接：[#5942](https://github.com/QwenLM/qwen-code/issues/5942)

- **保证 resume / rewind 的历史结构一致性**：会话恢复不能只恢复“内容”，也要恢复“关系”。  
  链接：[#5920](https://github.com/QwenLM/qwen-code/issues/5920)、[#5923](https://github.com/QwenLM/qwen-code/pull/5923)

- **强化 Windows 端交互细节**：滚轮、边框、后台驱动驻留等细节问题在 Windows 上更容易被放大。  
  链接：[#5941](https://github.com/QwenLM/qwen-code/issues/5941)、[#5933](https://github.com/QwenLM/qwen-code/issues/5933)、[#5925](https://github.com/QwenLM/qwen-code/pull/5925)

- **为未来的扩展/浏览器集成铺架构**：社区已经在讨论 Chrome extension / Browser SDK 方向，说明产品边界正在外扩。  
  链接：[#5936](https://github.com/QwenLM/qwen-code/issues/5936)、[#5931](https://github.com/QwenLM/qwen-code/pull/5931)

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合内部周报/晨会的一页版**，或  
2. **带“风险等级 / 影响范围 / 建议跟进动作”的分析版**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

以下为 **2026-06-28 DeepSeek TUI 社区动态日报**（数据源：`Hmbown/DeepSeek-TUI`，PR 链接显示为 `Hmbown/CodeWhale`）。

> 说明：过去 24 小时内 **无 Releases、无 Issues 更新**。因此“社区热点 Issues”部分改为基于今日高相关 PR/历史议题线索整理，尽量反映社区关注点。

## 1) 今日速览
今天的动向非常集中：**插件系统**成为最活跃主线，出现了从 `manifest/registry/discovery` 到 `CLI`、再到 `MCP` 接入的连续推进，说明项目正在补齐可扩展生态能力。  
与此同时，**ACP 流式会话、取消机制、上下文缓存、工具错误恢复**等底层体验继续被密集修补，整体方向是让 TUI 更适合长会话、可插拔和低成本运行。  
链接总览： [PR 列表](https://github.com/Hmbown/CodeWhale/pulls)

---

## 2) 社区热点 Issues
> 由于本次数据中 **没有直接的 Issue 更新记录**，以下按“高关注议题线索”整理，并附上最相关的 PR/Issue 入口。

1. **工作集上下文缓存最大化**
   - 价值：减少重复读文件，降低 token 消耗，直接提升长任务效率。
   - 热度判断：围绕同一问题已有持续跟进，属于典型高频痛点。
   - 链接：[#528](https://github.com/Hmbown/CodeWhale/issues/528) / [PR #3697](https://github.com/Hmbown/CodeWhale/pull/3697)

2. **Token / Cache / Cost 释放门禁与回归检测**
   - 价值：把“能跑”升级为“可控地跑”，对大规模迭代和模型调用成本治理很关键。
   - 热度判断：已进入 release gate 级别，说明优先级较高。
   - 链接：[#3388](https://github.com/Hmbown/CodeWhale/issues/3388) / [PR #3693](https://github.com/Hmbown/CodeWhale/pull/3693)

3. **配置目录覆盖基础 Prompt**
   - 价值：让 TUI 更易被改造成非软件场景工具，扩展使用边界。
   - 热度判断：属于“定制化能力”诉求，通常会引发较多讨论。
   - 链接：[#3638](https://github.com/Hmbown/CodeWhale/issues/3638) / [PR #3696](https://github.com/Hmbown/CodeWhale/pull/3696)

4. **工具调用折叠模式命名与兼容性**
   - 价值：统一 `collapsed/expanded` 语义，降低配置理解成本。
   - 热度判断：偏 UX/配置一致性，虽小但会影响大量用户。
   - 链接：[#3256](https://github.com/Hmbown/CodeWhale/issues/3256) / [PR #3695](https://github.com/Hmbown/CodeWhale/pull/3695)

5. **Hunt / Verdict 映射与目标状态对齐**
   - 价值：让 verifier、goal、trophy 等结果链路更一致，提升自动化判定可信度。
   - 热度判断：涉及核心状态语义，属于需要反复对齐的基础问题。
   - 链接：[#2093](https://github.com/Hmbown/CodeWhale/issues/2093) / [PR #3700](https://github.com/Hmbown/CodeWhale/pull/3700)

6. **工具错误后的 fallback 提示**
   - 价值：避免模型在同一失败调用上“死循环”，是提升成功率的关键修复。
   - 热度判断：同一主题被连续修复，说明问题真实且高频。
   - 链接：[#1641](https://github.com/Hmbown/CodeWhale/issues/1641) / [PR #3701](https://github.com/Hmbown/CodeWhale/pull/3701)

7. **重复搜索失败后的直接 URL 回退**
   - 价值：从“搜索失败”快速转向“可直接访问”，降低任务中断概率。
   - 热度判断：属于对搜索/浏览链路的体验补强，和上条议题同属一类高频痛点。
   - 链接：[#1641](https://github.com/Hmbown/CodeWhale/issues/1641) / [PR #3705](https://github.com/Hmbown/CodeWhale/pull/3705)

8. **ACP 会话取消与并发处理**
   - 价值：解决 `session/cancel` 无法及时生效的问题，直接影响 IDE 集成体验。
   - 热度判断：对外部编辑器场景很关键，且已拆成连续 PR 推进。
   - 链接：[#3192](https://github.com/Hmbown/CodeWhale/issues/3192) / [PR #3698](https://github.com/Hmbown/CodeWhale/pull/3698)

9. **ACP 流式 session/prompt 增量输出**
   - 价值：让编辑器侧能更早渲染 agent 输出，改善“卡住不动”的感知。
   - 热度判断：与上一条组成完整链路，说明 ACP 集成是重点方向。
   - 链接：[#3192](https://github.com/Hmbown/CodeWhale/issues/3192) / [PR #3702](https://github.com/Hmbown/CodeWhale/pull/3702)

10. **插件体系标准化**
   - 价值：插件生态是后续能力扩展的基础，决定项目是否能形成可复用能力层。
   - 热度判断：今日出现多个并行 PR，热度非常高。
   - 链接： [PR #3692](https://github.com/Hmbown/CodeWhale/pull/3692) / [PR #3699](https://github.com/Hmbown/CodeWhale/pull/3699) / [PR #3708](https://github.com/Hmbown/CodeWhale/pull/3708)

---

## 3) 重要 PR 进展
1. **[PR #3708](https://github.com/Hmbown/CodeWhale/pull/3708)**  
   `feat(plugins): add manifest parsing, discovery, and registry`  
   插件系统核心基础设施：manifest 解析、插件发现、注册表、启停管理、条件加载和内置示例插件。

2. **[PR #3699](https://github.com/Hmbown/CodeWhale/pull/3699)**  
   `feat(plugins): add lightweight plugin system with discovery, registry, and injection`  
   更完整的插件注入链路，强调外部 skills / MCP server 的自包含加载。

3. **[PR #3692](https://github.com/Hmbown/CodeWhale/pull/3692)**  
   `feat(plugins): add plugin system with built-in rust-toolkit plugin`  
   为插件系统提供内置示例，帮助验证插件机制可用性和可扩展性。

4. **[PR #3710](https://github.com/Hmbown/CodeWhale/pull/3710)**  
   `Feat/plugin p3 mcp`  
   插件路线继续向 MCP 扩展，说明生态接入已进入实操阶段。

5. **[PR #3709](https://github.com/Hmbown/CodeWhale/pull/3709)**  
   `Feat/plugin p2 cli`  
   补齐插件 CLI 管理面，便于用户在终端里直接管理插件。

6. **[PR #3702](https://github.com/Hmbown/CodeWhale/pull/3702)**  
   `feat(acp): stream session/prompt deltas as session/update chunks`  
   ACP 适配器改为流式输出增量，提升 IDE/编辑器端实时渲染体验。

7. **[PR #3698](https://github.com/Hmbown/CodeWhale/pull/3698)**  
   `feat(acp): cancel in-flight session/prompt on session/cancel`  
   修复取消请求无法及时生效的问题，增强会话控制能力。

8. **[PR #3697](https://github.com/Hmbown/CodeWhale/pull/3697)**  
   `feat(working-set): cache-maximal context mode — materialize active file contents`  
   将活跃文件内容直接材料化，减少重复工具调用，降低上下文浪费。

9. **[PR #3693](https://github.com/Hmbown/CodeWhale/pull/3693)**  
   `feat(scorecard): token/cache/cost release-gate scorecard with regression detection`  
   引入 token/cache/cost 评分卡和回归检测，标志着项目开始重视成本治理。

10. **[PR #3704](https://github.com/Hmbown/CodeWhale/pull/3704)**  
    `ci: keep required checks present for light PRs`  
    优化轻量 PR 的 CI 体验，避免文档/工作流类 PR 因跳过重步骤而丢失必要检查上下文。

---

## 4) 功能需求趋势
从今日 PR 主题看，社区关注点主要集中在这几类：

- **插件化与生态扩展**：插件系统、MCP 接入、CLI 管理是最明确的新增方向。  
  链接： [PR #3708](https://github.com/Hmbown/CodeWhale/pull/3708)

- **IDE / ACP 集成能力**：流式输出、会话取消、增量渲染，说明外部编辑器协作场景在快速升温。  
  链接： [PR #3698](https://github.com/Hmbown/CodeWhale/pull/3698)

- **上下文与成本控制**：工作集缓存、token/cache/cost scorecard，体现出“长会话效率”是核心诉求。  
  链接： [PR #3697](https://github.com/Hmbown/CodeWhale/pull/3697)

- **工具调用稳定性**：失败后 fallback 提示、直接 URL 回退，说明社区非常在意 agent 是否会陷入重复失败。  
  链接： [PR #3701](https://github.com/Hmbown/CodeWhale/pull/3701)

- **可配置性与可迁移性**：base prompt 覆盖、tool collapse 兼容命名，表明用户希望更容易定制 TUI。  
  链接： [PR #3696](https://github.com/Hmbown/CodeWhale/pull/3696)

---

## 5) 开发者关注点
- **减少重复工具调用**：避免模型反复读同一文件、重复搜索同一失败路径。  
  链接： [PR #3697](https://github.com/Hmbown/CodeWhale/pull/3697)

- **让错误“可恢复”而不是“原样暴露”**：通过 fallback hint 引导模型换工具、换来源、缩小请求范围。  
  链接： [PR #3701](https://github.com/Hmbown/CodeWhale/pull/3701)

- **提升会话控制能力**：cancel 必须及时生效，流式输出要尽早可见，否则 IDE 体验会明显变差。  
  链接： [PR #3698](https://github.com/Hmbown/CodeWhale/pull/3702)

- **把成本指标纳入发布门槛**：token / cache / cost 不再只是运行时指标，而是 release gate 的一部分。  
  链接： [PR #3693](https://github.com/Hmbown/CodeWhale/pull/3693)

- **构建可扩展生态**：插件体系如果能稳定落地，后续能力会从“内建功能”转向“生态功能”。  
  链接： [PR #3699](https://github.com/Hmbown/CodeWhale/pull/3699)

如果你愿意，我也可以把这份日报进一步整理成：
1. **更像新闻简报的短版**，或  
2. **适合发到微信群/飞书的运营版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*