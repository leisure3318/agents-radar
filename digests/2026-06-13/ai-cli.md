# AI CLI 工具社区动态日报 2026-06-13

> 生成时间: 2026-06-13 01:39 UTC | 覆盖工具: 9 个

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

下面是一份基于你提供的 2026-06-13 社区动态的**横向对比分析报告**。  
> 注：表格中的 **Issues/PR 数量**按各仓库日报中列出的**今日热点/更新项**统计；Release 为当天可见发布或发版状态。

---

## 1) 生态全景

整体来看，AI CLI 生态已经从“能完成任务”进入到“**可控、可观测、可恢复**”的阶段。  
今天各工具的高频讨论不再只是模型效果，而是围绕**会话状态、上下文管理、模型治理、跨平台稳定性、成本透明度**展开。  
另一个明显信号是：很多工具都在向**多代理/后台执行/工作流编排**演进，CLI 正在从单人交互终端转向“轻量 agent runtime”。  
同时，发版节奏普遍很快，但 nightly/alpha/release failure 也频繁出现，说明整个生态仍处在**高迭代、强修复**阶段。  

---

## 2) 各工具活跃度对比

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 | 简评 |
|---|---:|---:|---|---|
| Claude Code | 10 | 0 | 连续小版本发布，v2.1.175~177 | 问题热度高，主要集中在安全误判、权限与上下文可信度 |
| OpenAI Codex | 10 | 10 | 连续 3 个 alpha 版本 | 研发推进最密集之一，状态模型/cwd/跨平台修复明显 |
| Gemini CLI | 3 | 10 | 1 个 nightly 版本 | 以稳定性与工具链修复为主，issue 数少但 PR 活跃 |
| GitHub Copilot CLI | 9 | 0 | 1 个新版本 v1.0.62-1 | 以稳定性、会话一致性、平台兼容问题为主 |
| Kimi Code CLI | 0 | 0 | 无活动 | 今日无公开动态 |
| OpenCode | 10 | 10 | 未见当天 release | 社区反馈活跃，问题与 PR 都围绕可观测性和稳定性展开 |
| Pi | 10 | 8 | 1 个版本 v0.79.2 | 聚焦上下文/compaction、provider 接入与配置兼容 |
| Qwen Code | 10 | 10 | 1 个正式版 v0.18.0，且 nightly 有失败记录 | 长任务稳定性、CI/release 可靠性是核心主线 |
| DeepSeek TUI / CodeWhale | 10 | 10 | 1 个版本 v0.8.59 | 正在从 TUI 工具演进为多智能体控制平面 |

---

## 3) 共同关注的功能方向

### A. 会话状态、上下文与可恢复性
多个工具都在解决“**任务做到一半不能丢**”的问题。  
- **Claude Code**：auto-compaction 静默触发、上下文边界不透明  
- **OpenAI Codex**：turn state、cwd、history 持久化、会话丢失  
- **OpenCode**：session_status 卡住、apply_patch 无反馈  
- **Pi**：compaction reload 失败、上下文溢出识别  
- **Qwen Code**：长程任务遗忘、重复工具调用  
- **DeepSeek TUI**：持久化 ledger、fleet 恢复  
**共同诉求**：状态可见、失败可回放、断点可恢复。

### B. 模型治理与路由可控性
社区越来越不接受“黑盒自动决定”。  
- **Claude Code**：误判降级、`enforceAvailableModels`、默认模型回退  
- **Gemini CLI**：AUTO routing 可配置、避免指定模型  
- **Qwen Code**：`--model auto`、模型选择逻辑修正  
- **Pi / OpenCode**：provider/model 兼容与选择更细粒度  
**共同诉求**：模型选择要可解释、可约束、可覆盖。

### C. Agent 编排、多代理与后台运行
CLI 正在向“**可调度的 agent 系统**”演进。  
- **Claude Code**：子代理递归、Remote Control、background agent  
- **DeepSeek TUI**：Agent Fleet、Whaleflow、subagents、ledger、heartbeat  
- **Qwen Code**：background agents、daemon、Computer Use 迁移  
- **OpenCode**：task scheduler、provider 扩展、可靠的 retry 语义  
**共同诉求**：多代理要能控、能追踪、能回收，不能变成成本黑洞。

### D. TUI / Desktop / Remote 的一致性
随着入口增多，用户更在意“**同一命令在不同端表现一致**”。  
- **Claude Code**：Remote Control 命令拦截、TUI/desktop 行为差异  
- **Codex**：Windows/macOS 桌面端、Computer Use、路径语义  
- **Gemini CLI**：拖拽/粘贴图片、路径解析、渲染细节  
- **OpenCode / DeepSeek TUI / Copilot CLI**：Unicode、渲染、焦点、编码问题  
**共同诉求**：终端、桌面、远程三端行为一致，不能“换个入口就变样”。

### E. 成本、配额与可观测性
用户对“看得见的成本”越来越敏感。  
- **Claude Code**：token 燃烧、配额被误耗  
- **OpenCode**：429 重试、subscription-quota、价格 markup 透明度  
- **Copilot CLI**：OpenTelemetry 成本指标  
- **Pi**：自定义 agent cost 计算  
- **Qwen Code**：CI 失败和发布链路可观测性  
**共同诉求**：成本、配额、失败原因要显式可见，避免隐性消耗。

---

## 4) 差异化定位分析

### Claude Code
- **功能侧重**：安全治理、模型控制、企业合规  
- **目标用户**：企业开发者、安全/合规敏感团队  
- **技术路线**：强化 managed settings、模型白名单、权限与交互边界  
- **特点**：安全策略很强，但今天最大的风险是**误判过度**。

### OpenAI Codex
- **功能侧重**：桌面端 + Computer Use + 跨平台状态模型  
- **目标用户**：重视 native 集成、浏览器/桌面自动化的开发者  
- **技术路线**：持续修正 cwd、turn state、PathUri、WebSocket 状态语义  
- **特点**：底层工程投入很重，属于**平台型修复驱动**。

### Gemini CLI
- **功能侧重**：开发者 CLI 体验、模型路由、MCP/Skills、多模态输入  
- **目标用户**：偏工具链效率、希望“轻量但智能”的开发者  
- **技术路线**：nightly 高频迭代，强调 tool discovery、路由可控、交互补强  
- **特点**：体量不一定最大，但**迭代效率高**。

### GitHub Copilot CLI
- **功能侧重**：GitHub 工作流、会话/项目上下文、代码协作入口  
- **目标用户**：GitHub 生态用户、团队协作场景  
- **技术路线**：session-scoped extensions、canvases、telemetry、chronicle 等  
- **特点**：社区反馈集中在**稳定性和会话一致性**，更偏“工作台”而非实验型工具。

### OpenCode
- **功能侧重**：provider 兼容、TUI 可观测性、商业透明度  
- **目标用户**：希望接入多模型/多 provider 的开源用户与团队  
- **技术路线**：强调 retry 语义、状态反馈、Unicode/TUI 细节、provider 扩展  
- **特点**：定位偏“**通用型 open agent CLI**”。

### Pi
- **功能侧重**：上下文管理、compaction、provider 接入、成本控制  
- **目标用户**：重视长会话与企业模型接入的开发者  
- **技术路线**：Bedrock / Vertex / DeepSeek / vLLM 等多 provider 兼容  
- **特点**：明显在做**生产可用的上下文与配置底座**。

### Qwen Code
- **功能侧重**：长任务、Web Shell、CI/Release、Computer Use  
- **目标用户**：重视自动化、长上下文、工作流效率的开发者  
- **技术路线**：持续增强 agent rounds、token escalation、daemon、cross-platform driver  
- **特点**：既追求能力，也重视工程化，但今天暴露出**发布链路可靠性**短板。

### DeepSeek TUI / CodeWhale
- **功能侧重**：多智能体控制平面、Whaleflow、fleet runtime  
- **目标用户**：面向复杂工作流、并发 agent 调度、可持续运行场景  
- **技术路线**：从单工具向**agent fleet 架构**升级，强调 ledger、heartbeat、trace、恢复  
- **特点**：是今天最明显的“**从 CLI 走向控制平面**”路线。

### Kimi Code CLI
- **状态**：今日无公开活动  
- **解读**：当前无法判断活跃方向，生态信号较弱。

---

## 5) 社区热度与成熟度

### 社区热度高、问题密集的工具
- **Claude Code**：安全误判、上下文边界、远程控制等高痛点集中出现  
- **OpenCode**：issue 与 PR 都多，且评论活跃，问题聚焦清晰  
- **Qwen Code**：长任务与 release failure 连续出现，反馈强度高  
- **DeepSeek TUI**：大量路线图型 Issue，说明社区参与度高  
- **Pi**：虽然规模相对小，但问题和修复都较集中，活跃度不低

### 进入快速迭代阶段的工具
- **OpenAI Codex**：3 个 alpha 连发 + 10 个 PR，明显处于高频修复窗口  
- **Gemini CLI**：nightly 持续推进，PR 密集，属于快速打磨期  
- **OpenCode / Qwen Code / DeepSeek TUI**：功能扩展和稳定性修复同步推进，迭代节奏快  
- **Pi**：在企业接入和上下文能力上持续补课，属于能力快速成型期

### 更偏“问题驱动修复”的工具
- **Claude Code**、**Copilot CLI**：今天的信号更多来自用户报障而非大规模功能 PR，说明当前重点仍是**补稳定性与一致性**。

### 相对低噪音
- **Kimi Code CLI**：今日无活动，暂难判断社区成熟度。

---

## 6) 值得关注的趋势信号

### 1. CLI 正在 agent 化、控制平面化
从 DeepSeek 的 Agent Fleet、Qwen 的 daemon/background agent、Claude 的 subagent、OpenCode 的 task 管理可以看出，CLI 不再只是交互入口，而是在变成**代理系统的运行时**。  
**对开发者的启示**：后续竞争点会从“谁更会聊”转向“谁更能调度、恢复、审计”。

### 2. “可控性”正在超过“智能性”成为关键指标
Claude 的误降级、Gemini 的 AUTO routing、Qwen 的 model auto、Pi/OpenCode 的 provider 语义，都说明用户越来越需要**明确控制策略**。  
**启示**：模型选择、权限边界、降级规则要可解释、可配置。

### 3. 会话状态是新一代基础设施
turn state、cwd、history、ledger、compaction、session_status 反复出现，说明大家已经把**状态管理**当作核心底座。  
**启示**：谁能把状态做稳，谁就能支撑更长的任务、更复杂的工作流。

### 4. 跨平台一致性仍是高门槛
Windows/macOS/Linux 的崩溃、编码、路径、终端渲染、Computer Use 都在暴露问题。  
**启示**：AI CLI 不再是单纯的“命令行工具”，而是跨平台桌面/终端混合产品，需要更严格的回归测试。

### 5. 成本透明与失败可观测性会成为标配
quota、429、token burn、OTel、历史回放、错误进 history，这些需求说明用户已经不接受“黑箱故障”。  
**启示**：未来的竞争不是“能不能跑”，而是“**出了问题能不能解释、能不能止损**”。

### 6. 发布链路可靠性仍是生态短板
Gemini nightly failed、Qwen release failed、Codex alpha 高频发版、Claude 小版本密集发布，都说明发版速度快，但**CI/CD 稳定性不足**。  
**启示**：谁能把发布、回滚、回放、观测做扎实，谁就更容易赢得企业用户信任。

---

如果你愿意，我还可以把这份分析进一步压缩成：
1. **管理层摘要版（1 页）**  
2. **研发周会版（按风险/优先级排序）**  
3. **Markdown 表格增强版（便于直接贴到内部文档）**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下基于你提供的 **anthropics/skills** 数据做的社区热点报告。  
**说明**：该快照里 PR 的评论数未给出（显示为 `undefined`），因此“热门 PR 排行”采用了 **更新活跃度 + 问题影响面 + 与高热 Issue 的关联度** 做综合排序。

---

## 1) 热门 Skills 排行（PR）

> 这些 PR 目前均为 **Open**。

1. **[#1298] Skill-creator 评估链路修复：run_eval 0% recall、Windows 读流、并行 worker**
   - 功能：修复 `run_eval.py` / `run_loop.py` / `improve_description.py` 的评估失真问题，并将 eval artifact 作为真实 skill 处理。
   - 社区热点：**“技能触发评估不可信”**，这是当前最核心的基础设施问题之一，直接影响所有 description 优化结果。
   - 状态：Open  
   - 链接：<https://github.com/anthropics/skills/pull/1298>

2. **[#1140] agent-creator skill + 多工具评估修复**
   - 功能：新增 `agent-creator` meta-skill，并修复 `evaluation.py` 对多并行 tool calls 的处理。
   - 社区热点：**Agent 编排 / 多工具协作**，反映出社区已从单一 skill 使用转向“技能驱动的 agent 组合”。
   - 状态：Open  
   - 链接：<https://github.com/anthropics/skills/pull/1140>

3. **[#1046] 新增前端设计相关 skill 集合**
   - 功能：添加 `frontend-design`、`ai-experien…`、`automation-workflows-builder` 等前端/设计/自动化方向 skill 定义文件。
   - 社区热点：**前端设计与产品体验**，说明社区对“直接产出可用 UI/交互”的需求持续升温。
   - 状态：Open  
   - 链接：<https://github.com/anthropics/skills/pull/1046>

4. **[#723] testing-patterns skill**
   - 功能：覆盖测试金字塔、单测、React 组件测试、测试命名、边界条件等完整测试体系。
   - 社区热点：**测试生成与测试最佳实践**，属于高频工程场景，落地价值强。
   - 状态：Open  
   - 链接：<https://github.com/anthropics/skills/pull/723>

5. **[#486] ODT skill：OpenDocument 文档创建/填充/解析**
   - 功能：支持 `.odt/.ods` 等开放文档格式的创建、读取、模板填充与 HTML 转换。
   - 社区热点：**文档兼容性与开放格式**，面向企业与开源办公生态，需求明确。
   - 状态：Open  
   - 链接：<https://github.com/anthropics/skills/pull/486>

6. **[#514] document-typography skill**
   - 功能：修复 AI 生成文档常见排版问题，如孤行、寡行、编号对齐等。
   - 社区热点：**文档质量控制**，说明社区不只要“能生成”，还要“能交付”。
   - 状态：Open  
   - 链接：<https://github.com/anthropics/skills/pull/514>

7. **[#1302] color-expert skill**
   - 功能：覆盖颜色命名体系、色彩空间选择、渐变/配色等专业色彩知识。
   - 社区热点：**设计类知识增强**，与前端/品牌/UI 工作流强相关。
   - 状态：Open  
   - 链接：<https://github.com/anthropics/skills/pull/1302>

8. **[#190] n8n-builder / n8n-debugger 等自动化技能**
   - 功能：面向 n8n 工作流构建与调试，偏自动化集成。
   - 社区热点：**工作流自动化**，体现社区对“让 Claude 直接参与业务流编排”的强需求。
   - 状态：Open  
   - 链接：<https://github.com/anthropics/skills/pull/190>

---

## 2) 社区需求趋势（从 Issues 提炼）

1. **技能共享与组织级分发**
   - 诉求：希望 Skills 能在组织内直接共享，而不是手工下载/上传。
   - 代表 Issue：[#228](https://github.com/anthropics/skills/issues/228)

2. **评估与触发可靠性**
   - 诉求：`run_eval.py` 的触发率/召回率不可信，影响 skill 迭代和优化闭环。
   - 代表 Issue：[#556](https://github.com/anthropics/skills/issues/556), [#1169](https://github.com/anthropics/skills/issues/1169)

3. **Windows 兼容性与跨平台可用性**
   - 诉求：skill-creator / eval 脚本在 Windows 上存在 subprocess、编码、pipe 读取等问题。
   - 代表 Issue：[#1061](https://github.com/anthropics/skills/issues/1061)

4. **安全、信任边界与权限治理**
   - 诉求：社区技能冒充官方命名空间、SharePoint 访问控制、组织权限隔离等问题受到关注。
   - 代表 Issue：[#492](https://github.com/anthropics/skills/issues/492), [#1175](https://github.com/anthropics/skills/issues/1175)

5. **文档生态：文件格式、排版、加载与多文件引用**
   - 诉求：DOCX/PDF/ODT、引用文件大小写、multi-file preload、上下文窗口控制等。
   - 代表 Issue：[#189](https://github.com/anthropics/skills/issues/189), [#1220](https://github.com/anthropics/skills/issues/1220)

6. **与外部平台/协议集成**
   - 诉求：Bedrock、MCP、Claude.ai/Claude Desktop 的 Skills 暴露与调用方式仍有探索需求。
   - 代表 Issue：[#29](https://github.com/anthropics/skills/issues/29), [#16](https://github.com/anthropics/skills/issues/16)

7. **社区治理与贡献流程完善**
   - 诉求：贡献指南、质量分析器、审核机制等“生态治理工具”需求增强。
   - 代表 Issue：[#202](https://github.com/anthropics/skills/issues/202)

---

## 3) 高潜力待合并 Skills

> 这类 PR 通常“问题明确、改动聚焦、影响面大”，很可能较快落地。

1. **[#1298] run_eval 评估链路修复**
   - 价值：直接修复 skill 迭代闭环的可信度问题。
   - 链接：<https://github.com/anthropics/skills/pull/1298>

2. **[#1050] skill-creator Windows subprocess + encoding 修复**
   - 价值：解决 Windows 上的常见阻塞问题，落地性强。
   - 链接：<https://github.com/anthropics/skills/pull/1050>

3. **[#361] 检测未加引号的 YAML 特殊字符**
   - 价值：防止 frontmatter 被静默误解析，属于高收益低风险修复。
   - 链接：<https://github.com/anthropics/skills/pull/361>

4. **[#362] UTF-8 多字节字符 panic 修复**
   - 价值：提升 skill-creator 对国际化文本的稳定性。
   - 链接：<https://github.com/anthropics/skills/pull/362>

5. **[#541] DOCX tracked changes 与 bookmarks ID 冲突修复**
   - 价值：避免文档损坏，属于文档技能的关键稳定性补丁。
   - 链接：<https://github.com/anthropics/skills/pull/541>

6. **[#1140] agent-creator + 多工具评估**
   - 价值：贴近“多 agent / 多 tool”方向，契合下一阶段使用场景。
   - 链接：<https://github.com/anthropics/skills/pull/1140>

---

## 4) Skills 生态洞察

**一句话总结：**  
当前社区最集中的诉求，是把 Skills 从“可展示的样例集合”推进为 **可稳定运行、可跨平台、可共享治理、面向文档/前端/自动化/agent 编排的生产级工具体系**。

如果你需要，我可以把这份报告进一步整理成：
- **表格版**
- **PPT 汇报版**
- **面向管理层的 1 页摘要版**

---

# Claude Code 社区动态日报｜2026-06-13

## 1) 今日速览
今天 Claude Code 的变化以**小版本密集发布**和**社区集中反馈两条主线**为主：一方面，版本更新继续强化多语言、模型治理和界面配置能力；另一方面，Issues 讨论明显聚焦在**安全/合规场景下的模型误降级**、**TUI/Remote Control/Agent 交互稳定性**以及**权限与自动化体验**上。  
从反馈强度看，社区最在意的是“**别误判、别降级、别丢上下文**”，这反映出 Claude Code 正从“能用”进入“高可靠可控”阶段。  

---

## 2) 版本发布

### v2.1.177
- [Release v2.1.177](https://github.com/anthropics/claude-code/releases/tag/v2.1.177)
- 目前提供的数据里未附带详细变更说明，像是一次快速补丁/小步发布。

### v2.1.176
- [Release v2.1.176](https://github.com/anthropics/claude-code/releases/tag/v2.1.176)
- 重点变化：
  - 会话标题现在会按**对话语言**自动生成；也可通过 `language` 设置固定语言。
  - 新增 `footerLinksRegexes`，支持按正则匹配的链接徽章出现在 footer 区域，并可由用户或 managed settings 配置。
  - Bedrock 凭证处理有改进（原始说明在数据中被截断）。

### v2.1.175
- [Release v2.1.175](https://github.com/anthropics/claude-code/releases/tag/v2.1.175)
- 重点变化：
  - 新增 `enforceAvailableModels` managed setting。
  - 启用后，`availableModels` 白名单会同时约束 Default model；若默认模型落到不允许的模型，会回退到第一个允许模型。
  - 用户或项目设置将不能再“放宽”这一模型范围，明显偏向企业治理与合规控制。

---

## 3) 社区热点 Issues

### 1. 模型被误降级：合法隐私/合规扫描被判成高风险
- [#68076](https://github.com/anthropics/claude-code/issues/68076)
- 这是今天最受关注的问题之一：在合法的 privacy/compliance 扫描工具场景里，Claude Code 仍然触发安全误判并降级到 Opus，直接影响工作流和成本。
- 社区反应：**5 条评论、1 个赞**，说明这是高痛感问题；且与多个同类 Issue 互相呼应，显示并非个案。

### 2. 安全误判重复出现：自动降级从 Fable 到 Opus
- [#68090](https://github.com/anthropics/claude-code/issues/68090)
- 与 #68076 高度同类，反映“安全策略过于激进”已成为连续性问题，而不是偶发误报。
- 社区反应：**2 条评论、1 个赞**；重复报障本身就是信号，说明用户愿意继续追问直到修复。

### 3. 安全检查场景下模型降级，阻断漏洞分析
- [#68101](https://github.com/anthropics/claude-code/issues/68101)
- 这类问题更敏感：用户是在做安全检查/漏洞分析，结果反而被降级，导致“想修漏洞却被拦住”。
- 社区反应：**1 条评论**，虽然互动不多，但场景价值高，属于会影响专业用户信任的核心问题。

### 4. 正常 DevOps 会话被双重安全标记
- [#68084](https://github.com/anthropics/claude-code/issues/68084)
- 这是“自有基础设施、明确授权、正常运维”却被连续标记为 dual-use 的典型案例，说明策略边界仍需细化。
- 社区反应：**1 条评论**；但叙述非常具体，属于可复现、可审查的高质量反馈。

### 5. 自动压缩（auto-compaction）无预警触发，导致上下文边界静默
- [#68097](https://github.com/anthropics/claude-code/issues/68097)
- 这是典型的“看起来像模型在乱做事，实则是系统边界切换”的问题：没有预压缩提示，用户容易误以为任务被重复执行。
- 社区反应：**1 条评论、1 个赞**，说明它触及了“上下文管理可信度”这一基础体验。

### 6. 通用子代理递归创建子代理，导致指数级 fan-out 与 token 燃烧
- [#68110](https://github.com/anthropics/claude-code/issues/68110)
- 这是今天最值得警惕的成本类问题之一：Agent 工具可被子代理继续调用，可能无限递归扩张，造成严重 token 浪费。
- 社区反应：**1 条评论**；虽然评论少，但影响非常大，属于“架构级风险”。

### 7. Claude Code Ultra review 崩溃并消耗配额
- [#68109](https://github.com/anthropics/claude-code/issues/68109)
- 该问题同时涉及稳定性、计费和可信度：服务报 rate-limit 错误、任务失败，但额度仍被扣减。
- 社区反应：**1 条评论**；对付费用户来说，这是高敏感度故障。

### 8. Remote Control 下的 /clear、/context 等命令未被拦截
- [#68102](https://github.com/anthropics/claude-code/issues/68102)
- 这反映了远程控制链路与 TUI 命令解析的边界问题：本应由客户端拦截的 slash command，却被直接发给模型。
- 社区反应：**1 条评论**；对移动端/远程协作场景影响直接。

### 9. 多语言技能触发词不支持，非英文用户无法自动触发 Skills
- [#68086](https://github.com/anthropics/claude-code/issues/68086)
- 这是明显的国际化/本地化需求：技能机制如果只偏向英文触发，会让非英语用户的自动化收益大幅下降。
- 社区反应：**1 条评论**；但描述显示这是使用面扩展的重要障碍。

### 10. Ubuntu + AMD GPU 下终端文本渲染异常
- [#68073](https://github.com/anthropics/claude-code/issues/68073)
- 该问题已关闭，说明可能已有修复推进；但它代表了 Claude Code 在 Linux/TUI 渲染链路上的现实兼容性压力。
- 社区反应：**2 条评论**；带截图，属于视觉问题但对可用性影响很直接。

---

## 4) 重要 PR 进展
- [Pull Requests](https://github.com/anthropics/claude-code/pulls)
- 过去 24 小时内**没有 PR 更新**（数据中 PR 数为 0），因此本日报不列出 PR 进展明细。

---

## 5) 功能需求趋势

从今天所有 Issues 看，社区关注的功能方向主要集中在以下几类：

1. **模型治理与安全策略可控性**
   - 包括误判降级、白名单约束、默认模型回退、合规/安全研究场景豁免等。
   - 代表 Issue：[#68076](https://github.com/anthropics/claude-code/issues/68076)、[#68101](https://github.com/anthropics/claude-code/issues/68101)、[#68084](https://github.com/anthropics/claude-code/issues/68084)

2. **Agent 编排与多代理稳定性**
   - 递归子代理、背景代理通知路由、session 选择/聚焦等，说明多代理能力已经进入“可视化与控制”阶段。
   - 代表 Issue：[#68110](https://github.com/anthropics/claude-code/issues/68110)、[#68065](https://github.com/anthropics/claude-code/issues/68065)、[#68064](https://github.com/anthropics/claude-code/issues/68064)

3. **TUI / Desktop / VS Code / Remote Control 交互一致性**
   - 用户希望不同入口的命令、链接、渲染和状态行为保持一致。
   - 代表 Issue：[#68102](https://github.com/anthropics/claude-code/issues/68102)、[#68103](https://github.com/anthropics/claude-code/issues/68103)、[#68073](https://github.com/anthropics/claude-code/issues/68073)

4. **技能系统国际化与可发现性**
   - 多语言触发、技能发布/同步、技能索引机制都在被反复提及。
   - 代表 Issue：[#68086](https://github.com/anthropics/claude-code/issues/68086)、[#68071](https://github.com/anthropics/claude-code/issues/68071)

5. **文档与配置覆盖**
   - 新设置、版本行为、自动模式说明经常“先上线后补文档”。
   - 代表 Issue：[#68105](https://github.com/anthropics/claude-code/issues/68105)、[#68108](https://github.com/anthropics/claude-code/issues/68108)、[#68107](https://github.com/anthropics/claude-code/issues/68107)

6. **成本控制与上下文保护**
   - token 燃烧、无预警压缩、配额被消耗但任务失败，这些都说明用户对“看得见的成本”非常敏感。
   - 代表 Issue：[#68110](https://github.com/anthropics/claude-code/issues/68110)、[#68097](https://github.com/anthropics/claude-code/issues/68097)、[#68109](https://github.com/anthropics/claude-code/issues/68109)

---

## 6) 开发者关注点

今天社区反馈里，开发者最该关注的痛点有四个：

- **误判过多，尤其是安全/合规相关场景**  
  多个 Issue 指向“合法操作被当成高风险”，这会直接伤害专业用户信任。

- **多代理能力强，但控制边界不足**  
  Agent 递归、背景通知路由、远程控制命令拦截等问题，说明“可编排”与“可控”还没完全对齐。

- **TUI/桌面/远程控制的行为不一致**  
  同一功能在不同入口表现不同，最容易制造“看似随机”的故障体验。

- **文档滞后于版本演进**  
  新增设置和行为变更（如 `footerLinksRegexes`、`enforceAvailableModels`）发布后，文档同步不足，影响上手和排障效率。

如果你愿意，我可以把这份日报进一步整理成：
- **适合内部周报的简版**
- **带风险等级/优先级的运维版**
- **适合发 Slack/飞书的短讯版**

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# 2026-06-13 OpenAI Codex 社区动态日报

## 1) 今日速览
今天社区讨论主要集中在 **桌面端稳定性、Computer Use 可用性、以及跨平台路径/会话状态一致性**。Windows 与 macOS 上的启动失败、权限/注入异常、Dock 崩溃等问题较集中；与此同时，仓库里也出现了一批围绕 `cwd`、turn state、路径解析的底层 PR，说明团队正在系统性修复跨平台状态模型。

---

## 2) 版本发布
过去 24 小时内连续发布了 3 个 alpha 版本，节奏较快，偏向高频迭代与修复窗口；当前数据未附详细 changelog。

- `rust-v0.140.0-alpha.17`  
  https://github.com/openai/codex/releases/tag/rust-v0.140.0-alpha.17
- `rust-v0.140.0-alpha.16`  
  https://github.com/openai/codex/releases/tag/rust-v0.140.0-alpha.16
- `rust-v0.140.0-alpha.15`  
  https://github.com/openai/codex/releases/tag/rust-v0.140.0-alpha.15

---

## 3) 社区热点 Issues
以下 10 个 Issue 最值得关注：

1. **Windows Codex App 更新后无法打开**  
   #27979（6 条评论）  
   影响面大，属于“更新即不可用”的阻断级问题，直接打断桌面端主路径。  
   https://github.com/openai/codex/issues/27979

2. **Windows 11 上 Computer Use 失败：`CreateProcessAsUserW failed: 5`**  
   #27987（2 条评论）  
   这是核心功能链路故障，说明 Windows 的进程创建/权限模型仍有兼容问题。  
   https://github.com/openai/codex/issues/27987

3. **Codex 生成的引导图被当成真实 UI 截图展示**  
   #27974（2 条评论）  
   这是模型行为与结果可信度问题，影响用户对“验证完成”的判断，风险很高。  
   https://github.com/openai/codex/issues/27974

4. **Linux 用户无法访问或兑换 banked usage resets**  
   #27915（9 👍）  
   社区反馈最强的配额类问题之一，明显涉及平台公平性与产品策略可达性。  
   https://github.com/openai/codex/issues/27915

5. **macOS Intel x64 上 Computer Use 服务因 entitlement/provisioning 不匹配失败**  
   #27891（2 条评论）  
   直接阻止 Intel Mac 上的 Computer Use/Locked Computer Use 启用，属于平台兼容性阻断。  
   https://github.com/openai/codex/issues/27891

6. **OTP 不发、重试后变成“次数过多/手机号无效”**  
   #28000（1 条评论）  
   认证流程卡死用户，属于高摩擦的 onboarding / account recovery 问题。  
   https://github.com/openai/codex/issues/28000

7. **Codex 丢失全部聊天历史，且设置无法保存**  
   #27998（1 条评论）  
   这是数据持久化与会话可信性问题，严重影响用户对桌面端的信任。  
   https://github.com/openai/codex/issues/27998

8. **新建聊天窗口后第一条消息发送要等几分钟**  
   #27997（1 条评论）  
   属于明显的首轮延迟退化，会显著拉低交互体验，容易被用户感知。  
   https://github.com/openai/codex/issues/27997

9. **应用升级后 `@chrome` / computer-use 失效，local marketplace 不同步**  
   #27900（1 条评论）  
   插件/市场同步链路异常，说明升级后本地插件生态没有正确刷新。  
   https://github.com/openai/codex/issues/27900

10. **documents 插件 `render_docx.py` 崩溃 + 无超时导致静默卡 2 分钟**  
    #27957（2 条评论）  
    这是典型的“工具失败不透明”问题，既有崩溃也有长时间无反馈的 hang。  
    https://github.com/openai/codex/issues/27957

---

## 4) 重要 PR 进展
以下 10 个 PR 体现了本周的技术主线，重点集中在 **turn state、跨平台路径、cwd 语义和稳定性修复**。

1. **Send turn state through compact requests**  
   #28002  
   让 compact request 复用正常请求路径并携带 per-turn state，减少状态丢失。  
   https://github.com/openai/codex/pull/28002

2. **package Windows ARM64 on x64**  
   #28001  
   调整 Windows 打包关键路径，降低 ARM64 runner 等待对发布速度的影响。  
   https://github.com/openai/codex/pull/28001

3. **preserve backend errors in thread history**  
   #27999  
   把 image generation 的后端错误保留到 thread history，便于复现与回放。  
   https://github.com/openai/codex/pull/27999

4. **Send request-scoped turn state over WebSocket**  
   #27996  
   将 WebSocket turn state 改为请求作用域，避免重连导致状态污染。  
   https://github.com/openai/codex/pull/27996

5. **preserve explicit environment cwd**  
   #27995  
   防止远程优先环境中的显式 `cwd` 被 legacy fallback 覆盖。  
   https://github.com/openai/codex/pull/27995

6. **app-server: accept environment-native cwd**  
   #27993  
   让 app-server 正确接受环境原生路径语义，强化跨 OS 执行一致性。  
   https://github.com/openai/codex/pull/27993

7. **Pin bundled SQLite to fixed WAL-reset version**  
   #27992  
   锁定 SQLite 版本，避免因依赖刷新回退到 WAL-reset corruption 影响版本。  
   https://github.com/openai/codex/pull/27992

8. **protocol: keep selected environment cwd as PathUri**  
   #27991  
   将 selected executor cwd 与 host cwd 解耦，为跨平台路径保持正确语义。  
   https://github.com/openai/codex/pull/27991

9. **path-uri: parse and resolve paths by explicit convention**  
   #27989  
   对 POSIX / Windows / UNC 路径做 convention-aware 解析，是跨 OS 支撑层的关键改动。  
   https://github.com/openai/codex/pull/27989

10. **Restore remote stdio MCP cwd fallback**  
    #27981  
    修复远程 stdio MCP 在未配置 cwd 时无法启动的问题，回补之前被移除的 fallback。  
    https://github.com/openai/codex/pull/27981

---

## 5) 功能需求趋势
从 Issues 的集中主题看，社区当前最关注这几类方向：

- **桌面端稳定性与升级回归**
  - Windows 启动失败、Mac Dock 崩溃、更新后历史/设置丢失，说明“版本升级可用性”仍是第一优先级。  
  - 代表 Issue：#27979、#27998、#27969  
  https://github.com/openai/codex/issues/27979  
  https://github.com/openai/codex/issues/27998  
  https://github.com/openai/codex/issues/27969

- **Computer Use / 浏览器插件生态的可发现性与兼容性**
  - 社区反复提到 `@chrome`、browser backend、plugin marketplace、`@Sites` 等入口不可用或不同步。  
  - 代表 Issue：#27900、#27962、#27980、#27907  
  https://github.com/openai/codex/issues/27900  
  https://github.com/openai/codex/issues/27962  
  https://github.com/openai/codex/issues/27980  
  https://github.com/openai/codex/issues/27907

- **配额 / rate limit / banked resets 的可见性与可兑换性**
  - Linux 用户尤其关注“为什么只能在桌面端处理 reset”，以及额度是否能滚存。  
  - 代表 Issue：#27915、#27933、#27908、#27934  
  https://github.com/openai/codex/issues/27915  
  https://github.com/openai/codex/issues/27933  
  https://github.com/openai/codex/issues/27908  
  https://github.com/openai/codex/issues/27934

- **会话持久化、首轮响应速度、后台吞吐**
  - 聊天历史丢失、首条消息慢、长时间卡住等问题，说明“可恢复性 + 低延迟”是核心体验诉求。  
  - 代表 Issue：#27998、#27997、#27911、#27899  
  https://github.com/openai/codex/issues/27998  
  https://github.com/openai/codex/issues/27997  
  https://github.com/openai/codex/issues/27911  
  https://github.com/openai/codex/issues/27899

- **模型行为可信度与结果标注**
  - 生成图像被误当真实截图、风险提示误触发等问题，表明用户希望 Codex 更清晰地区分“生成结果”和“真实环境状态”。  
  - 代表 Issue：#27974、#27887  
  https://github.com/openai/codex/issues/27974  
  https://github.com/openai/codex/issues/27887

---

## 6) 开发者关注点
开发者反馈里最突出的痛点可以归纳为四类：

- **跨平台路径 / cwd 语义复杂且容易出错**  
  大量 PR 在修 `PathUri`、`cwd`、环境选择与 WebSocket turn state，说明这是当前最重要的底层技术债。  
  https://github.com/openai/codex/pull/27989  
  https://github.com/openai/codex/pull/27991  
  https://github.com/openai/codex/pull/27995

- **桌面端与 Computer Use 的平台兼容性不足**  
  Windows / macOS 的权限、签名、进程创建、Dock 集成都在出问题，说明 native 集成层需要更强的回归测试。  
  https://github.com/openai/codex/issues/27979  
  https://github.com/openai/codex/issues/27987  
  https://github.com/openai/codex/issues/27891

- **故障必须可观测、可追踪、可回放**  
  社区不接受“静默 hang”或“泛化错误”，希望错误信息能进历史、超时能显式暴露。  
  https://github.com/openai/codex/issues/27957  
  https://github.com/openai/codex/pull/27999

- **配额策略需要更透明、更可达**  
  banked reset、weekly quota、rollover 等需求说明用户在意的是“额度可见、可用、可迁移”。  
  https://github.com/openai/codex/issues/27915  
  https://github.com/openai/codex/issues/27908  
  https://github.com/openai/codex/issues/27933

如果你愿意，我也可以把这份日报进一步整理成 **“管理层摘要版”** 或 **“工程团队周报版”**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-06-13）

## 1) 今日速览
今天 Gemini CLI 的主线仍然是**夜间版发布与稳定性修复**：新 nightly 已发布，内容集中在 MCP 工具发现原子更新、Vertex AI 模型映射修正，以及文档/迁移命令补充。  
社区侧的讨论则明显聚焦在两点：**发布链路失败**（nightly release failed）和**模型路由/自动编辑体验是否“退步”**，说明开发者对 CLI 的稳定性与智能化能力都非常敏感。

---

## 2) 版本发布
### 新版本：`v0.48.0-nightly.20260613.g9e5599c32`
- [Release 链接](https://github.com/google-gemini/gemini-cli/releases/tag/v0.48.0-nightly.20260613.g9e5599c32)
- 主要更新：
  - 修复 MCP tool discovery 的原子更新问题，降低工具发现过程中的竞态风险。
  - 修复 Vertex AI model mapping。
  - 增加文档与迁移命令，提升升级/切换可操作性。

---

## 3) 社区热点 Issues
> 本期过去 24 小时内仅更新了 3 条 Issue，以下全部是高关注项。

1. **[#27865 Nightly Release Failed for v0.48.0-nightly.20260612.g4e10a34be](https://github.com/google-gemini/gemini-cli/issues/27865)**  
   - 重要性：这是典型的**发布阻断问题**，直接影响 nightly 交付可靠性，优先级标为 `p1`。  
   - 社区反应：目前仅 1 条评论、0 👍，但这类问题对维护节奏影响极大，值得第一时间跟进。

2. **[#27858 Antigravity CLI is a massive downgrade from Gemini CLI for developers. Bring back intelligent auto-edit and model routing.](https://github.com/google-gemini/gemini-cli/issues/27858)**  
   - 重要性：这条反馈直指产品体验与定位，核心诉求是**恢复开发者熟悉的智能自动编辑与模型路由**。  
   - 社区反应：已有 **2 👍**，说明这不是个体吐槽，而是有一定共鸣的方向性诉求。

3. **[#27861 Avoid models in "AUTO" routings](https://github.com/google-gemini/gemini-cli/issues/27861)**  
   - 重要性：反映出用户对**自动路由可控性**的需求，希望能避免 AUTO 模式选择某些模型。  
   - 社区反应：暂未见评论或点赞，但和“模型选择透明化/可配置化”的趋势高度一致。

---

## 4) 重要 PR 进展
> 从过去 24 小时更新的 PR 中挑选 10 条最值得关注的进展。

1. **[#27875 chore/release: bump version to 0.48.0-nightly.20260613.g9e5599c32](https://github.com/google-gemini/gemini-cli/pull/27875)**  
   - 夜间版自动版本号提升，对应今天的新 release。

2. **[#27870 fix(core): cap pending tool responses](https://github.com/google-gemini/gemini-cli/pull/27870)**  
   - 限制 pending `functionResponse` 的体量，避免超大 tool result 影响 token 估算和下一轮推理。

3. **[#27867 fix(a2a-server): prevent crash when tasks metadata endpoint returns 501](https://github.com/google-gemini/gemini-cli/pull/27867)**  
   - 处理 tasks metadata endpoint 返回 501 的情况，提升 a2a-server 的健壮性。

4. **[#27872 fix(core): strip line/range suffix from at-command paths to avoid CLI hang](https://github.com/google-gemini/gemini-cli/pull/27872)**  
   - 修复 `@` 命令路径带行号/范围后缀导致的 hang/crash 问题，属于高价值稳定性修复。

5. **[#27873 fix(core): improve SKILL.md frontmatter parsing robustness](https://github.com/google-gemini/gemini-cli/pull/27873)**  
   - 增强 `SKILL.md` frontmatter 解析容错，减少 BOM、空白、YAML 类型等边界问题。

6. **[#27863 fix(core): prioritize structured display titles in tool invocation](https://github.com/google-gemini/gemini-cli/pull/27863)**  
   - 改善工具调用时的展示标题优先级，有助于 UI 可读性与调试体验。

7. **[#27862 fix(cli): preserve executing subagent tool calls in UI](https://github.com/google-gemini/gemini-cli/pull/27862)**  
   - 让 UI 更好地保留子 agent 的执行过程，增强任务可追踪性。

8. **[#27860 fix(cli): reset slash-command conflict dedupe when conflicts reappear](https://github.com/google-gemini/gemini-cli/pull/27860)**  
   - 修复 slash command 冲突重新出现时不再提醒的问题，改善交互一致性。

9. **[#27859 feat(cli): add native drag-and-drop and Cmd+V clipboard image pasting](https://github.com/google-gemini/gemini-cli/pull/27859)**  
   - 增加终端内原生拖拽与剪贴板图片粘贴，补齐多模态输入体验。

10. **[#27857 fix: upgrade vitest to 4.1.0, 3.2.6 (CVE-2026-47429)](https://github.com/google-gemini/gemini-cli/pull/27857)**  
    - 安全更新，修复高危 CVE，属于供应链维护的重要动作。  
    - 相关补充：**[#27856 fix: upgrade shell-quote to 1.8.4 (CVE-2026-9277)](https://github.com/google-gemini/gemini-cli/pull/27856)**

---

## 5) 功能需求趋势
从本期 Issues 可以提炼出几条清晰的需求方向：

- **模型路由可控性增强**  
  用户希望 AUTO 模式不只是“自动”，还要能配置规则、排除特定模型，避免黑箱决策。  
  相关 Issue：[#27861](https://github.com/google-gemini/gemini-cli/issues/27861)

- **保留/恢复开发者向智能体验**  
  社区明确关注“智能自动编辑”“模型路由”“轻量 CLI 体验”是否被弱化，说明开发者型用户仍是核心受众。  
  相关 Issue：[#27858](https://github.com/google-gemini/gemini-cli/issues/27858)

- **发布与自动化链路可靠性**  
  nightly release failure 直接影响版本分发与验证流程，说明 CI/CD 和发布流程的稳定性仍是关键基础设施。  
  相关 Issue：[#27865](https://github.com/google-gemini/gemini-cli/issues/27865)

---

## 6) 开发者关注点
综合今天的反馈，开发者最在意的痛点主要有：

- **“自动”不等于“可接受”**：希望能细粒度控制模型路由，而不是完全交给系统黑盒决定。  
- **CLI 不能变重、变笨**：用户对智能自动编辑、模型路由、轻量交互的期待很高，担心产品方向偏离原有开发者体验。  
- **稳定性优先级非常高**：包括 nightly 发布失败、工具响应过大、路径解析异常、服务器 501 崩溃等，都会迅速影响可信度。  
- **多模态输入是明确加分项**：拖拽和粘贴图片的需求出现，说明终端场景也在向更自然的 multimodal 输入演进。  

如果你愿意，我可以把这份日报进一步整理成：
1. **适合发群/发邮件的精简版**，或  
2. **带“影响等级/优先级”评分的管理层版**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
**日期：2026-06-13**  
数据源：`github.com/github/copilot-cli`

---

## 1) 今日速览
今天 Copilot CLI 出现了一个新版本 **v1.0.62-1**，更新重点集中在交互体验、会话能力和状态展示上。  
同时，社区 Issues 仍以**稳定性、会话/存储一致性、终端渲染、跨平台输入输出**为主要关注点，且出现了一个新版本相关的 Linux ARM64 崩溃问题，值得重点跟进。  

---

## 2) 版本发布
### 新版本：v1.0.62-1  
- 发布链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.62-1>

**本次主要新增：**
- 在 footer 中显示 **“YOLO”**（allow all）状态，并将 allow-all 状态纳入 `custom statusLine.command`
- 在 Issues / Pull Requests 标签页按 `/` 可触发 GitHub 服务器端过滤搜索
- 新增 **session-scoped extensions** 和 **canvases**
- 允许 SDK 客户端配置 **session memory**（数据仅展示到 “thr...”）

**解读：**  
这次发布明显在强化“会话上下文 + 交互效率 + 可配置性”，说明 Copilot CLI 正在从基础聊天工具向更完整的开发工作流入口演进。

---

## 3) 社区热点 Issues
> 过去 24 小时内共有 9 个更新中的 Issue，全部为 Open 状态。  
> 由于暂无评论/点赞数据，社区反应主要体现在“问题严重性”和“创建/更新时效”上。

### 1. #3784 Linux ARM64 上发送首条消息后因 Tokio reactor panic 直接退出
- 链接：<https://github.com/github/copilot-cli/issues/3784>
- 为什么重要：这是**最新版本 v1.0.62-1** 的运行时崩溃问题，且发生在关键路径“发送消息”后，属于高优先级阻断 bug。
- 社区反应：该 Issue 刚创建即被更新，但目前**0 评论、0 👍**，属于早期暴露、等待维护者响应的典型问题。

### 2. #3782 1.0.61 中 MCP stdio server 无限制重启，形成紧密循环
- 链接：<https://github.com/github/copilot-cli/issues/3782>
- 为什么重要：涉及 **MCP 进程调度与重试机制**，会导致子进程风暴，风险包括资源耗尽和系统不稳定。
- 社区反应：描述非常具体，说明问题已经影响到真实使用场景；目前无公开互动，但属于高危稳定性缺陷。

### 3. #3781 粘贴图片到非多模态模型后，会话进入不可恢复的 400 错误
- 链接：<https://github.com/github/copilot-cli/issues/3781>
- 为什么重要：这是**会话级不可恢复错误**，且需要手工编辑 `events.jsonl` 才能恢复，影响较大。
- 社区反应：问题定位清晰，说明用户已找到临时绕过方案；当前仍是 Open，表明修复需求明确。

### 4. #3780 流式输出中出现重复字符簇
- 链接：<https://github.com/github/copilot-cli/issues/3780>
- 为什么重要：属于**终端渲染/流式输出一致性**问题，会影响模型响应可读性和 CLI 观感。
- 社区反应：问题描述较细，说明用户已观察到稳定复现模式；这类 bug 通常与渲染增量刷新逻辑相关。

### 5. #3779 希望增加会话切换的键盘快捷键
- 链接：<https://github.com/github/copilot-cli/issues/3779>
- 为什么重要：这是典型的**高频效率需求**，反映用户对多会话管理的操作成本不满意。
- 社区反应：属于功能请求，当前无进一步讨论，但从工作流角度看优先级不低。

### 6. #3778 希望通过 OpenTelemetry 暴露 cost / premium-request 指标
- 链接：<https://github.com/github/copilot-cli/issues/3778>
- 为什么重要：这是**可观测性 + 成本治理**需求，面向团队/企业用户价值很高。
- 社区反应：需求明确，并且直接对标 Claude Code，说明社区希望 Copilot CLI 在企业级指标能力上补齐短板。

### 7. #3777 `/chronicle reindex` 在本地-only 配置下仍触发远端 backfill
- 链接：<https://github.com/github/copilot-cli/issues/3777>
- 为什么重要：涉及**配置语义违背**，可能影响隐私、合规与本地优先工作流。
- 社区反应：问题描述指出已配置 `remote: off`、`remoteExport: false` 仍失效，属于“配置不生效”类高敏问题。

### 8. #3776 Windows 下复制 UTF-8 输出后出现 mojibake
- 链接：<https://github.com/github/copilot-cli/issues/3776>
- 为什么重要：属于**跨平台编码兼容性**问题，直接影响 Windows/WSL 用户体验。
- 社区反应：问题说明清楚、可复现性强；这类 bug 对国际化用户影响尤为明显。

### 9. #3775 `/chronicle standup` 在本地会话存在时返回空结果
- 链接：<https://github.com/github/copilot-cli/issues/3775>
- 为什么重要：反映了**SQLite / DuckDB 方言不兼容**，影响核心命令可用性。
- 社区反应：Issue 中已指出 SQL 语法原因，说明问题定位较快，修复可能偏向查询兼容层。

---

## 4) 重要 PR 进展
### 过去 24 小时无 PR 更新
- PR 列表页：<https://github.com/github/copilot-cli/pulls>

**说明：**  
本次数据中 **Pull Requests 数量为 0**，因此没有可供筛选的 PR 进展。若后续出现 PR 更新，建议重点关注与 **v1.0.62-1 崩溃修复、MCP 重试控制、会话/渲染稳定性** 相关的合并项。

---

## 5) 功能需求趋势
从本次 Issues 可以提炼出以下几条明显趋势：

1. **会话管理能力增强**
   - 代表需求：会话切换快捷键、session picker、会话恢复/编辑能力
   - 链接：<https://github.com/github/copilot-cli/issues/3779>、<https://github.com/github/copilot-cli/issues/3781>

2. **多模态与模型兼容性**
   - 代表需求：图片附件在非多模态模型下的降级处理、避免会话污染
   - 链接：<https://github.com/github/copilot-cli/issues/3781>

3. **稳定性与进程控制**
   - 代表问题：Tokio panic、MCP 无限制重启、流式渲染异常
   - 链接：<https://github.com/github/copilot-cli/issues/3784>、<https://github.com/github/copilot-cli/issues/3782>、<https://github.com/github/copilot-cli/issues/3780>

4. **可观测性与成本治理**
   - 代表需求：OpenTelemetry 成本指标、premium-request 统计
   - 链接：<https://github.com/github/copilot-cli/issues/3778>

5. **隐私/本地优先配置一致性**
   - 代表问题：remote/off 配置失效、reindex 仍触发 backfill
   - 链接：<https://github.com/github/copilot-cli/issues/3777>

6. **跨平台输入输出兼容**
   - 代表问题：Windows/WSL UTF-8 mojibake
   - 链接：<https://github.com/github/copilot-cli/issues/3776>

7. **数据查询与本地存储兼容**
   - 代表问题：SQLite 与 DuckDB 语法差异导致 standup 查询失败
   - 链接：<https://github.com/github/copilot-cli/issues/3775>

---

## 6) 开发者关注点
结合今天的反馈，开发者最需要关注的痛点主要是：

- **新版本回归风险高**：v1.0.62-1 已出现 Linux ARM64 panic，说明发布后需要更强的跨平台回归验证。
- **MCP 生命周期管理不足**：stdio server 重启无上限，提示缺少 backoff、max-retry 和守护策略。
- **会话容错能力偏弱**：图片附件导致整个 session 进入 400 错误，说明会话事件模型缺少隔离和降级。
- **流式渲染存在不稳定性**：重复字符问题会损害 CLI 体验，尤其是长输出场景。
- **配置语义需要更严格一致**：`remote/off`、`remoteExport=false` 等本地优先设置未完全生效，容易引发合规担忧。
- **企业级可观测性需求上升**：用户开始要求成本指标、请求计量等数据，说明 Copilot CLI 正在进入更强的团队治理场景。
- **跨平台编码问题仍需重视**：Windows/WSL 下的 mojibake 说明终端编码链路还存在兼容短板。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发 Slack/飞书的精简版**  
2. **适合周报汇总的管理层版**  
3. **带“优先级/风险等级”标注的研发跟踪版**

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-06-13  
数据源：`github.com/anomalyco/opencode`

## 1) 今日速览
今天社区讨论的重心明显偏向**稳定性与可观测性**：会话状态卡住、`apply_patch` 无进度反馈、429 重试策略、模型无响应等问题都在集中暴露。  
同时，**文档陈旧、计费透明度、Provider/模型兼容、TUI 字符与交互细节**也持续被提及，说明社区正从“能用”转向“更稳、更准、更易维护”。

---

## 2) 社区热点 Issues

1. [#32127 Stale "busy" in session_status never clears](https://github.com/anomalyco/opencode/issues/32127)  
   这是今天最典型的核心状态 bug：会话可能一直显示“working”。这类问题直接影响用户对任务完成状态的判断，且已有 2 条评论，讨论热度不低；对应修复 PR 已出现（#32128）。

2. [#32116 Add markup disclosure column to Go pricing table](https://github.com/anomalyco/opencode/issues/32116)  
   这是一个偏产品/商业透明度的高关注问题，3 条评论说明讨论较集中。核心诉求是：价格表只展示统一单价，但不同套餐的 markup 实际不一致，用户可见性不足。

3. [#32105 Docs still mention deleted scout agent](https://github.com/anomalyco/opencode/issues/32105)  
   文档仍引用已删除的 scout agent，属于典型“文档漂移”问题。虽然看似小，但会显著降低新用户和集成方的信任度；已有 2 条评论，并已被文档 PR 跟进。

4. [#32070 GitHub Action auto-commits dirty submodule state after PR branch checkout](https://github.com/anomalyco/opencode/issues/32070)  
   这是自动化链路里的高风险问题：即使 Agent 没改文件，也可能因为 submodule 状态导致错误提交。对 CI/CD 和 PR 自动化而言，属于“低概率但高破坏”的隐患，已有 2 条评论。

5. [#32062 Cannot unshare orphaned share](https://github.com/anomalyco/opencode/issues/32062)  
   这是明显的安全/隐私风险：本地会话被删除后，公开分享链接却无法取消。对用户来说是“泄露后无法收回”的问题，优先级很高，也有 2 条评论关注。

6. [#32121 apply_patch gives no progress feedback and can stall silently](https://github.com/anomalyco/opencode/issues/32121)  
   `apply_patch` 卡住时 UI 没有任何阶段性反馈，用户无法判断是否还在执行。虽然目前只有 1 条评论，但它直接影响“工具是否可信”的体验，是典型的可观测性短板。

7. [#32120 Subscription-quota 429s are retried, burning the user's quota window](https://github.com/anomalyco/opencode/issues/32120)  
   429 并非总是瞬时限流，有时是“订阅额度已耗尽”。当前重试策略会白白消耗用户窗口，属于计费/配额语义错误，1 条评论但问题很关键。

8. [#32119 context % under-reports for split-window models](https://github.com/anomalyco/opencode/issues/32119)  
   对 split-window 模型来说，当前“已用上下文百分比”计算不准确，会误导用户对剩余空间的判断。1 条评论但影响模型使用决策，属于精度问题。

9. [#32081 v1.17.4 All models not responding - stream requests hang indefinitely (macOS ARM64)](https://github.com/anomalyco/opencode/issues/32081)  
   这是高严重度可用性问题：多个模型都不响应，UI 一直转圈。虽然只有 1 条评论，但如果可复现，会直接影响主流程，属于必须优先排查的阻断级问题。

10. [#32067 Thai combining characters miscounted in stringWidth causing TUI prompt misalignment](https://github.com/anomalyco/opencode/issues/32067)  
   这类 Unicode 宽度问题通常只在多语言场景暴露，但会严重影响 TUI 排版和输入体验。它反映出 OpenCode 在国际化字符处理上仍有精细化修正空间。

---

## 3) 重要 PR 进展

1. [#32128 fix(app): reconcile session_status in bootstrap so stale busy clears](https://github.com/anomalyco/opencode/pull/32128)  
   针对“working 状态永远不清除”的修复 PR，直接对齐 #32127，属于今天最重要的状态同步修正。

2. [#32125 fix(sdk): normalize scheme-less base URLs so location query params apply](https://github.com/anomalyco/opencode/pull/32125)  
   修复 `localhost:4096` 这类无 scheme URL 的兼容问题，确保 attach 场景下的位置参数可正常生效。

3. [#32123 docs: remove references to deleted scout agent](https://github.com/anomalyco/opencode/pull/32123)  
   清理文档中已删除的 scout agent 引用，解决 #32105 的文档漂移问题。

4. [#32122 feat(tool): allow human-readable slugs as task_id](https://github.com/anomalyco/opencode/pull/32122)  
   让 Task 工具支持更可读的 slug 作为 `task_id`，提升任务编排和调试体验。

5. [#32117 fix(opencode): classify fetch timeouts as retryable](https://github.com/anomalyco/opencode/pull/32117)  
   修正 fetch timeout 的错误分类，使超时请求能按预期进入可重试路径，提升网络波动下的鲁棒性。

6. [#32115 Add TrustedRouter provider](https://github.com/anomalyco/opencode/pull/32115)  
   新增 TrustedRouter Provider 支持，继续扩展 OpenCode 的模型/供应商生态。

7. [#32113 fix(server): share listener memo map](https://github.com/anomalyco/opencode/pull/32113)  
   调整共享 memo map 的使用方式，让 TCP listener 与进程内 HTTP handler 更好地共享应用服务缓存。

8. [#32110 fix(tui): prevent duplicate renderable IDs](https://github.com/anomalyco/opencode/pull/32110)  
   修复 TUI 和交互式 run CLI 中重复 renderable ID 的问题，减少渲染异常和列表定位错误。

9. [#32104 feat(tui): support drag-and-drop for .docx and .xlsx files](https://github.com/anomalyco/opencode/pull/32104)  
   补齐 Office 文件拖拽/粘贴支持，改善 TUI 和桌面场景的文件输入体验。

10. [#32093 feat(opencode): add db doctor and repair commands](https://github.com/anomalyco/opencode/pull/32093)  
   增加数据库诊断与修复命令，回应本地 SQLite 状态不一致、历史数据损坏等维护型需求。

---

## 4) 功能需求趋势

1. [状态可见性与任务反馈](https://github.com/anomalyco/opencode/issues/32127)  
   社区非常关注“工具到底有没有在工作”：会话状态、`apply_patch` 进度、模型加载、429 重试都指向同一问题——需要更强的阶段反馈与失败可解释性。

2. [模型/Provider 兼容性继续扩张](https://github.com/anomalyco/opencode/issues/32076)  
   从 OpenAI-compatible 自动发现、schema 兼容、timeout 处理到 TrustedRouter 新 Provider，说明用户希望 OpenCode 对接更多模型源，并减少手工适配成本。

3. [TUI 交互与文本渲染的精细化修正](https://github.com/anomalyco/opencode/issues/32067)  
   键盘导航、拖拽文件、Unicode 宽度、复制乱码、HOME/END 等问题反复出现，表明社区对“终端体验”要求越来越高，尤其是多语言和复杂输入场景。

4. [文档与生态入口维护](https://github.com/anomalyco/opencode/issues/32105)  
   过时文档、生态条目更新、价格表展示都被持续关注。说明 OpenCode 的外部可发现性和信息准确性，已经成为产品体验的一部分。

5. [计费透明度与商用边界](https://github.com/anomalyco/opencode/issues/32116)  
   价格标注、订阅额度 429、广告集成、退款/误扣费等话题同时出现，反映出社区开始更关注商业模式的清晰度与可预期性。

---

## 5) 开发者关注点

1. [“卡住但没反馈”的体验是当前最大痛点](https://github.com/anomalyco/opencode/issues/32121)  
   无论是 session 状态、patch 执行、还是模型流式请求，用户都在要求“过程可见”。这类问题会直接影响工具可信度。

2. [Provider/模型层需要更强的兼容与语义校正](https://github.com/anomalyco/opencode/issues/32119)  
   429、timeout、OpenAI-compatible endpoints、split-window 上下文计算等，都说明模型接入层正在承受更复杂的现实环境。

3. [数据安全与可撤回性被持续强调](https://github.com/anomalyco/opencode/issues/32062)  
   分享链接无法撤回、自动提交误判等问题都涉及“是否会造成不可逆后果”，这类需求通常比普通 UI bug 更值得优先处理。

4. [国际化与字符渲染的细节仍需补强](https://github.com/anomalyco/opencode/issues/32067)  
   Thai combining characters、非 ASCII 复制、Spanish 界面英文回退等问题表明：OpenCode 正在进入更广泛的语言环境，底层文本处理必须更稳。

---

如果你希望，我可以把这份日报进一步整理成：  
- **适合公众号/周报的精简版**  
- **适合团队晨会的 1 页摘要版**  
- **按“产品 / 前端 / 后端 / SDK”分组的版本**

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-06-13

## 1) 今日速览
今天社区讨论仍然高度聚焦在 **稳定性修复、上下文/会话行为、以及模型接入兼容性** 上，多个高优先级问题已在 24 小时内闭环。  
同时，围绕 **DeepSeek / vLLM、Anthropic Vertex、Bedrock** 等新模型与云厂商接入的需求继续升温，说明 Pi 的用户正在从“可用”走向“可深度集成”。

---

## 2) 版本发布
### v0.79.2
- **Bedrock 校验提示增强**：Amazon Bedrock 数据保留校验失败时，会直接跳转到 AWS 数据保留文档，降低排障成本。
- 这类改进偏向 **企业用户/合规场景**，说明 Pi 正在补齐生产环境可用性细节。

链接：  
- [v0.79.2 发布说明](https://github.com/earendil-works/pi/releases/tag/v0.79.2)

---

## 3) 社区热点 Issues
下面挑选本日最值得关注的 10 个 Issue。

### 1. Bash overflow spill 在 macOS TMPDIR 下崩溃
- Issue：[#5667](https://github.com/earendil-works/pi/issues/5667)
- 重要性：这是典型的 **高输出工具链稳定性问题**。当 bash 输出超过阈值后写临时日志失败，可能直接导致 Pi 退出。
- 社区反应：`6` 条评论，明显比其他条目更活跃，说明这是一个真实影响使用的高优先级 bug。

### 2. 为 vLLM 代理下的 DeepSeek 增加 `vllm-deepseek` thinking format
- Issue：[#5673](https://github.com/earendil-works/pi/issues/5673)
- 重要性：涉及 **推理格式兼容性**，直接影响 DeepSeek 在企业代理链路中的可用性。
- 社区反应：有 `3` 条评论，且状态为 `inprogress`，说明需求明确、实现讨论已展开。

### 3. 单个 `+` 字符在 TUI 历史中被渲染成 `-`
- Issue：[#5657](https://github.com/earendil-works/pi/issues/5657)
- 重要性：虽然看起来很小，但这是 **输入/显示一致性** 问题，容易影响用户对历史记录的信任。
- 社区反应：已关闭，`3` 条评论，属于典型的 UI 细节修复。

### 4. OpenAI-compatible 的括号型上下文溢出未被识别
- Issue：[#5677](https://github.com/earendil-works/pi/issues/5677)
- 重要性：这是 **上下文超限检测兼容性** 问题，会影响大工具输出后的自动恢复逻辑。
- 社区反应：`2` 条评论，说明属于“看似边缘、实则会触发连锁故障”的问题。

### 5. compaction 在 reload 后可能失败
- Issue：[#5676](https://github.com/earendil-works/pi/issues/5676)
- 重要性：compaction 是 Pi 的核心体验之一，reload 后失败会直接破坏会话连续性。
- 社区反应：`2` 条评论，且已有对应修复 PR，问题推进很快。

### 6. `/fork` 在标签路径下会生成损坏的 parentId 链
- Issue：[#5669](https://github.com/earendil-works/pi/issues/5669)
- 重要性：这是 **会话分叉/树结构完整性** 问题，影响多分支协作和回溯。
- 社区反应：带有 `[last read]`，说明用户在排查过程中已经较深入地定位了问题。

### 7. `setActiveTools(undefined)` 抛出 `toolNames is not iterable`
- Issue：[#5663](https://github.com/earendil-works/pi/issues/5663)
- 重要性：属于 **API 契约不一致**，文档允许 `undefined`，运行时却报错，影响扩展开发者。
- 社区反应：有 `2` 条评论，且已形成修复 PR，属于高价值开发者反馈。

### 8. `models.json` 中大写 header 值被误判为环境变量
- Issue：[#5661](https://github.com/earendil-works/pi/issues/5661)
- 重要性：这是 **配置迁移误判**，会直接破坏模型认证/请求头设置。
- 社区反应：开放状态，说明还在等待修复或进一步确认影响面。

### 9. `~/.pi` 与 cwd/.pi 路径重叠
- Issue：[#5671](https://github.com/earendil-works/pi/issues/5671)
- 重要性：属于 **全局/项目配置目录边界设计** 问题，影响 trust、设置加载和路径推断。
- 社区反应：0 评论但被提出来，说明是架构层面的隐患，而非单点故障。

### 10. 自定义 agent cost 计算可配置化
- Issue：[#5668](https://github.com/earendil-works/pi/issues/5668)
- 重要性：这类需求代表 **可观测性与成本治理** 的升级方向，尤其适合企业或多 agent 场景。
- 社区反应：开放状态，虽暂无评论，但主题很有延展性，后续可能演变为平台级能力。

---

## 4) 重要 PR 进展
本日共有 8 条 PR 更新，以下为全部 8 条重点整理。

### 1. 新增 Anthropic Vertex provider
- PR：[#5679](https://github.com/earendil-works/pi/pull/5679)
- 内容：新增 `anthropic-vertex` provider，让 Claude 通过 Google Vertex AI / ADC 运行，并接入模型注册、默认值、文档和选择器。
- 价值：这是明显的 **云厂商与企业认证集成增强**。

### 2. 为自定义消息增加 `excludeFromContext`
- PR：[#5678](https://github.com/earendil-works/pi/pull/5678)
- 内容：让自定义消息支持不进入上下文，贯穿会话持久化、上下文重建和 compaction。
- 价值：对 **上下文成本控制** 很关键，也有助于减少无关消息污染模型输入。

### 3. 修复 compaction 在 reload 后稳定性问题
- PR：[#5675](https://github.com/earendil-works/pi/pull/5675)
- 内容：修正 compaction 过程中的 previous-compaction 边界与队列消息处理。
- 价值：直接对应 #5676，是 **核心会话稳定性修复**。

### 4. 修复 coding-agent 的项目 trust prompt 误触发
- PR：[#5674](https://github.com/earendil-works/pi/pull/5674)
- 内容：处理 `~/.pi` 与 `cwd/.pi` 的重叠，避免在家目录下误判为项目需要 trust。
- 价值：改善 **首次体验与信任流程**，减少误导性提示。

### 5. 保留 Anthropic refusal 细节
- PR：[#5666](https://github.com/earendil-works/pi/pull/5666)
- 内容：将 Anthropic 的 `stop_details` 透传到错误信息中。
- 价值：提升 **拒答原因可解释性**，对调试和 UX 都有帮助。

### 6. 处理 `setActiveTools(undefined)` 以恢复全部工具
- PR：[#5665](https://github.com/earendil-works/pi/pull/5665)
- 内容：为 `setActiveTools` 增加空值保护，`undefined/null` 时恢复所有工具。
- 价值：修复 API 语义与运行时行为不一致问题，提升扩展开发稳定性。

### 7. 同类修复：`setActiveTools(undefined)` 恢复全部工具
- PR：[#5664](https://github.com/earendil-works/pi/pull/5664)
- 内容：与 #5665 类似，属于同一问题的重复/平行修复记录。
- 价值：说明该问题已被快速识别并推动修复。

### 8. 防止大写 header 值被误当作 env var
- PR：[#5660](https://github.com/earendil-works/pi/pull/5660)
- 内容：修复 `models.json` 中大写 header 值在迁移时被错误改写为 `$VAR` 的问题。
- 价值：这是 **配置兼容性与数据安全** 的关键修复。

> 注：本日公开更新的 PR 共 8 条，已全部列出。

---

## 5) 功能需求趋势
从今天的 Issue 可以看出，社区关注点大致集中在以下方向：

1. **新模型/新代理链路兼容**
   - 典型需求：DeepSeek + vLLM、Anthropic Vertex、OpenAI-compatible 行为修正。
   - 说明：用户正在将 Pi 接入更多企业内部模型栈和中间代理。

2. **上下文管理与 compaction 稳定性**
   - 典型需求：compaction reload 稳定、上下文溢出检测、excludeFromContext。
   - 说明：Pi 的核心价值之一是长会话协作，因此上下文健康度是高频痛点。

3. **工具调用与终端输出可靠性**
   - 典型需求：bash 输出 spill、Tab completion 行为、工具集合切换。
   - 说明：开发者非常在意“工具层是否可靠”，因为这直接决定 agent 能否持续工作。

4. **会话/路径/状态模型的边界设计**
   - 典型需求：fork 之后 parentId 完整性、`.pi` 路径重叠、trust 逻辑。
   - 说明：随着使用规模上升，状态管理问题开始暴露。

5. **配置迁移与兼容性**
   - 典型需求：header 值迁移误判、模型配置格式兼容。
   - 说明：Pi 已进入“配置历史包袱”阶段，兼容老配置很重要。

6. **企业场景支持**
   - 典型需求：Bedrock、Vertex、成本计算可配置化、技能自动发现控制。
   - 说明：社区不只是个人开发者，也在推动企业部署能力。

---

## 6) 开发者关注点
综合今天的反馈，可以归纳出开发者最关心的几个痛点：

- **稳定性优先级很高**：bash 溢出、compaction、会话树、上下文超限等问题都说明，开发者对“不中断工作流”非常敏感。  
- **兼容性需求持续增加**：不同 provider、proxy、模型格式之间的适配压力在变大，尤其是 DeepSeek、Anthropic、OpenAI-compatible 场景。  
- **API 语义必须与文档一致**：`setActiveTools(undefined)` 这类问题会直接影响扩展开发体验，社区对“可预期行为”要求很高。  
- **配置与迁移细节容易出错**：header 值、路径布局、trust prompt 这些看似小的问题，会在真实项目中放大成使用障碍。  
- **希望更细粒度控制上下文与成本**：`excludeFromContext`、cost computation 可配置化都表明，用户已经开始关注“如何更精细地管理 agent 行为成本”。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合直接发 Slack/飞书 的短版**，或  
2. **带“风险等级/优先级”标注的运营版**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-06-13）

## 1) 今日速览
今天最值得关注的是 **v0.18.0 已发布**，但发布链路并未完全平稳，夜间还出现了新的发版失败记录，说明 release/CI 可靠性仍是当前隐患。  
社区讨论重心集中在两类问题：**长上下文任务稳定性**（遗忘、重复工具调用）和 **CI / Web Shell 交互可靠性**（PR review 误报绿灯、焦点跳转、状态栏显示）。  
相关代表： [v0.18.0 Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.18.0)、[#5018](https://github.com/QwenLM/qwen-code/issues/5018)、[#5052](https://github.com/QwenLM/qwen-code/issues/5052)

---

## 2) 版本发布
### [v0.18.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.18.0)
本次发布可见的核心变更主要有两点：
- 自动发布同步：`chore(release): v0.17.1`
- CLI 体验修复：`fix(cli): skip thought parts in copy output`

补充观察：虽然版本已发布，但近期发版流程仍出现失败，建议继续关注 release workflow 的稳定性。  
相关链接：  
- [v0.18.0 Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.18.0)  
- [#5068 Release Failed for v0.18.0-nightly](https://github.com/QwenLM/qwen-code/issues/5068)  
- [#5048 Release Failed for v0.18.0](https://github.com/QwenLM/qwen-code/issues/5048)

---

## 3) 社区热点 Issues
以下选取 10 个最值得关注的 Issue：

1. **[#5018 长程任务注意力不集中，出现大量的遗忘等](https://github.com/QwenLM/qwen-code/issues/5018)**  
   - 重要性：直指长上下文/长任务执行稳定性，是 Agent 类产品的核心能力问题。  
   - 社区反应：已有 **3 条评论**，属于当前讨论度最高的问题之一，且为 `need-information`，说明已进入排查阶段。

2. **[#5019 长程任务下，出现大量工具重复调用情况，导致会话被终止](https://github.com/QwenLM/qwen-code/issues/5019)**  
   - 重要性：工具重复调用会直接触发会话中断，属于高影响故障。  
   - 社区反应：已有 **2 条评论**，并带有 `duplicate` 标签，说明问题复现模式较明确。

3. **[#5022 Durable cron: startup fires race chat initialization](https://github.com/QwenLM/qwen-code/issues/5022)**  
   - 重要性：涉及 daemon / background automation 的启动竞态，影响长期任务与定时任务可靠性。  
   - 社区反应：当前仅 **1 条评论**，但标记为 `P1`，优先级很高。

4. **[#5052 bug(ci): PR review job reports green success when qwen exits 0 mid-review](https://github.com/QwenLM/qwen-code/issues/5052)**  
   - 重要性：CI 误报绿色会掩盖真实失败，直接破坏代码审查质量门禁。  
   - 社区反应：已有 **1 条评论**，问题描述非常具体，便于快速修复。

5. **[#5027 perf(ci): cut PR critical path from ~25min](https://github.com/QwenLM/qwen-code/issues/5027)**  
   - 重要性：PR 路径过慢会显著拖慢协作效率，属于工程体验问题。  
   - 社区反应：已有 **1 条评论**，说明这是基于实际测量提出的优化需求。

6. **[#5067 Focus-jump gates count retained terminal agents...](https://github.com/QwenLM/qwen-code/issues/5067)**  
   - 重要性：Web Shell / 交互式 UI 中的焦点导航错误会造成“幽灵选择”、隐藏面板被错误聚焦等体验问题。  
   - 社区反应：已有 **2 条评论**，并进入 `waiting-for-feedback`，说明已被较快确认。

7. **[#5064 希望statusline显示不下的时候能换行](https://github.com/QwenLM/qwen-code/issues/5064)**  
   - 重要性：典型终端 UI 可用性问题，影响状态信息展示完整性。  
   - 社区反应：已有 **2 条评论**，属于轻量但明确的 UX 改进需求。

8. **[#5055 Trojan:JS/ShaiWorm.DBA!MTB](https://github.com/QwenLM/qwen-code/issues/5055)**  
   - 重要性：VSIX 包被杀毒软件报毒，属于发布可信度与安全合规风险。  
   - 社区反应：已有 **2 条评论**，这是需要优先澄清的敏感问题。

9. **[#5029 不知道为啥，就是感觉降智了](https://github.com/QwenLM/qwen-code/issues/5029)**  
   - 重要性：虽然描述主观，但反映了用户对模型执行质量波动的真实感知。  
   - 社区反应：已有 **2 条评论**，属于“体验退化”类 badcase 信号。

10. **[#5068 Release Failed for v0.18.0-nightly.20260613.44627a24b](https://github.com/QwenLM/qwen-code/issues/5068)**  
   - 重要性：说明发布流程今天仍不稳定，和前一天的多起 release failure 形成连续性风险。  
   - 社区反应：当前 **0 条评论**，但这是自动化链路的硬失败信号，值得直接排查。  

---

## 4) 重要 PR 进展
以下选取 10 个值得关注的 PR：

1. **[#5070 fix(cli): ignore expired live agents in focus navigation](https://github.com/QwenLM/qwen-code/pull/5070)**  
   - 修复过期 live agent 仍被焦点导航命中，避免隐藏/失效项造成误选。

2. **[#5069 feat(web-shell): revamp floating todo panel interactions](https://github.com/QwenLM/qwen-code/pull/5069)**  
   - 重做 Web Shell 的悬浮待办面板交互，提升空间利用率和操作直觉。

3. **[#5066 feat(web-shell): daemon web-shell improvements](https://github.com/QwenLM/qwen-code/pull/5066)**  
   - 增强 daemon 模式 Web Shell：token usage、设置面板、重试、流式指标、隐藏命令等。

4. **[#5063 fix(ci): detect incomplete qwen review runs](https://github.com/QwenLM/qwen-code/pull/5063)**  
   - 补齐 PR review 流程的失败检测，避免“看起来成功、实际上没产出评论”的假绿灯。

5. **[#5062 fix(core): keep token escalation warm across agent rounds](https://github.com/QwenLM/qwen-code/pull/5062)**  
   - 修复 agent 多轮对话中 token 上限升级丢失的问题，改善长任务稳定性。

6. **[#5061 fix(core): preserve background agent launch flags](https://github.com/QwenLM/qwen-code/pull/5061)**  
   - 让后台 agent 重启/恢复时保留启动参数，降低恢复行为漂移。

7. **[#5060 Add TrustedRouter provider preset](https://github.com/QwenLM/qwen-code/pull/5060)**  
   - 新增 TrustedRouter 提供方预设，扩展模型/网关接入能力。

8. **[#5057 fix(core): Persist file history snapshot updates](https://github.com/QwenLM/qwen-code/pull/5057)**  
   - 让文件历史快照在 turn 内更持久，减少编辑过程中的状态丢失。

9. **[#5051 feat(core): migrate Computer Use to cua-driver (cross-platform)](https://github.com/QwenLM/qwen-code/pull/5051)**  
   - 将 Computer Use 迁移到跨平台驱动 `cua-driver-rs`，对自动化能力和可移植性影响较大。

10. **[#5042 feat(core): persist oversized tool results to disk](https://github.com/QwenLM/qwen-code/pull/5042)**  
    - 超大工具结果落盘，减少上下文污染，并保留可回读路径，利于长输出场景。

---

## 5) 功能需求趋势
从今天的 Issues 看，社区需求主要集中在以下方向：

1. **长上下文 / 长任务稳定性**  
   - 关注点：遗忘、注意力漂移、重复工具调用、会话中断。  
   - 代表 Issue：[#5018](https://github.com/QwenLM/qwen-code/issues/5018)、[#5019](https://github.com/QwenLM/qwen-code/issues/5019)

2. **CI / Release 可靠性与效率**  
   - 关注点：PR review 假绿灯、发版失败、PR 路径过慢。  
   - 代表 Issue：[#5052](https://github.com/QwenLM/qwen-code/issues/5052)、[#5027](https://github.com/QwenLM/qwen-code/issues/5027)、[#5068](https://github.com/QwenLM/qwen-code/issues/5068)

3. **Web Shell / 交互式 UI 体验**  
   - 关注点：焦点跳转、面板拥挤、状态栏显示不全。  
   - 代表 Issue：[#5067](https://github.com/QwenLM/qwen-code/issues/5067)、[#5064](https://github.com/QwenLM/qwen-code/issues/5064)

4. **Daemon / 后台自动化能力**  
   - 关注点：启动竞态、任务调度、恢复一致性。  
   - 代表 Issue：[#5022](https://github.com/QwenLM/qwen-code/issues/5022)

5. **模型质量与分发可信度**  
   - 关注点：用户感知“降智”、杀毒误报、包体可信。  
   - 代表 Issue：[#5029](https://github.com/QwenLM/qwen-code/issues/5029)、[#5055](https://github.com/QwenLM/qwen-code/issues/5055)

---

## 6) 开发者关注点
结合今天的反馈，高频痛点可以归纳为：

- **长任务执行稳定性不足**：记忆衰减、重复调用、token 管控不稳，是最核心的体验风险。  
  参考：[#5018](https://github.com/QwenLM/qwen-code/issues/5018)、[#5019](https://github.com/QwenLM/qwen-code/issues/5019)、[#5062](https://github.com/QwenLM/qwen-code/pull/5062)

- **自动化链路需要更强的失败可见性**：PR review 与 release workflow 不能“假成功”，否则会放大后续成本。  
  参考：[#5052](https://github.com/QwenLM/qwen-code/issues/5052)、[#5063](https://github.com/QwenLM/qwen-code/pull/5063)、[#5068](https://github.com/QwenLM/qwen-code/issues/5068)

- **Web Shell / 终端交互需要更一致的状态管理**：焦点、面板、状态栏、选择器等 UI 状态需要与渲染保持一致。  
  参考：[#5067](https://github.com/QwenLM/qwen-code/issues/5067)、[#5064](https://github.com/QwenLM/qwen-code/issues/5064)、[#5070](https://github.com/QwenLM/qwen-code/pull/5070)

- **后台自动化与恢复能力正在成为重点**：daemon、cron、background agent、Computer Use 都在往更复杂的生产场景演进。  
  参考：[#5022](https://github.com/QwenLM/qwen-code/issues/5022)、[#5061](https://github.com/QwenLM/qwen-code/pull/5061)、[#5051](https://github.com/QwenLM/qwen-code/pull/5051)

- **发布可信度与安全分发需要额外关注**：VSIX 报毒类问题会直接影响用户安装信心。  
  参考：[#5055](https://github.com/QwenLM/qwen-code/issues/5055)

如果你愿意，我也可以把这份日报进一步整理成 **“适合发到微信群/飞书的更短版”**，或者输出为 **Markdown 表格版**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026-06-13）

> 备注：当前仓库已在发布说明中明确品牌迁移为 **CodeWhale**，以下仍按你提供的数据口径汇总。

## 1) 今日速览

今天的核心动态是：**v0.8.59 正式发布并完成品牌切换说明**，明确旧的 `deepseek-tui` 维护终止、后续以 `CodeWhale` 为准。与此同时，社区讨论明显聚焦在 **Agent Fleet / Whaleflow / subagents** 这一代工作流能力上，相关 Issue 和 PR 成为主线。  
从节奏看，**稳定性修复 + 新架构铺垫** 两条线并行推进：一边修复 PDF、SSE、模型解析等基础问题，另一边推进可持久化队列、协议类型、TUI 可观测性等底座能力。

---

## 2) 版本发布

### v0.8.59
- **发布重点：品牌迁移与兼容策略说明**
- 官方说明确认：
  - `CodeWhale` 是新的 canonical 项目名、命令名、npm 包名与 release asset 名称
  - 旧 npm 包 `deepseek-tui` **已弃用**
  - 从旧的 `deepseek` / `deepseek-tui` 迁移需参考 `docs/REBRAND.md`
- 这次 release 的价值主要在于：**减少命名歧义，为后续版本和生态迁移定调**

链接： [Release v0.8.59](https://github.com/Hmbown/DeepSeek-TUI/releases/tag/v0.8.59)

---

## 3) 社区热点 Issues

> 过去 24 小时共 26 条更新，整体以作者驱动的路线图型 Issue 为主，评论数不高，但方向非常集中。

### 1. #3178 v0.8.60：添加 `/swarm` 动态多智能体模式
- **为什么重要**：这是最直接的用户入口级新能力，指向后续多代理协同工作流的核心形态。
- **社区反应**：2 条评论，属于当天讨论最集中的议题之一。
- 链接： [#3178](https://github.com/Hmbown/CodeWhale/issues/3178)

### 2. #3154 v0.8.60 EPIC：Agent Fleet 控制平面
- **为什么重要**：这是一个上层总纲 Issue，覆盖持续运行、可验证工作、恢复机制等，决定后续一整套架构边界。
- **社区反应**：2 条评论，说明路线级讨论已开始收敛。
- 链接： [#3154](https://github.com/Hmbown/CodeWhale/issues/3154)

### 3. #3189 v0.8.69：Provider idle-timeout 状态提示改为阈值触发
- **为什么重要**：直接改善 TUI 噪音问题，关系到用户在长等待场景下的感知质量。
- **社区反应**：1 条评论，属于“轻量但高频”的体验优化。
- 链接： [#3189](https://github.com/Hmbown/CodeWhale/issues/3189)

### 4. #3182 v0.8.60：增加 `/experiments` 功能面板
- **为什么重要**：实验功能需要显式可见性，避免“有能力但用户不知道如何启用”的问题。
- **社区反应**：1 条评论，说明实验开关的 UI 暴露正在进入设计阶段。
- 链接： [#3182](https://github.com/Hmbown/CodeWhale/issues/3182)

### 5. #3181 v0.8.60：强化自定义 subagent profile 与 bootstrap
- **为什么重要**：关系到 headless 子代理的启动一致性、权限边界和项目上下文注入。
- **社区反应**：1 条评论，明显是面向稳定性的基础设施议题。
- 链接： [#3181](https://github.com/Hmbown/CodeWhale/issues/3181)

### 6. #3180 v0.8.60：通过 Whaleflow trace handle 让 headless lane 可 निरी
- **为什么重要**：解决“子代理黑盒”问题，是多代理系统能否被运维和调试的关键。
- **社区反应**：1 条评论，属于架构可观测性方向的典型需求。
- 链接： [#3180](https://github.com/Hmbown/CodeWhale/issues/3180)

### 7. #3179 v0.8.60：Whaleflow 增加 Kimi 风格 batch scheduling 和 backpressure
- **为什么重要**：直接影响大规模 fanout 场景的稳定性，防止一次性拉爆 runtime。
- **社区反应**：1 条评论，说明团队对大规模并发的工程约束高度重视。
- 链接： [#3179](https://github.com/Hmbown/CodeWhale/issues/3179)

### 8. #3159 v0.8.60：fleet scheduler 的 lease、heartbeat、backpressure、恢复策略
- **为什么重要**：这是 Agent Fleet 能否“长期跑起来”的核心机制，决定任务是否可恢复、可接管、可回收。
- **社区反应**：1 条评论，偏底层但战略价值很高。
- 链接： [#3159](https://github.com/Hmbown/CodeWhale/issues/3159)

### 9. #3188 v0.8.61：TUI 状态栏显示真实 Git repo/workspace 身份
- **为什么重要**：直接影响用户对当前工作上下文的判断，属于典型的“低成本高收益”可用性修复。
- **社区反应**：0 条评论，但问题描述非常明确。
- 链接： [#3188](https://github.com/Hmbown/CodeWhale/issues/3188)

### 10. #3149 [bug] `read_file` 处理 PDF 时在非 Identity-H CMap 字体上崩溃
- **为什么重要**：这是稳定性红线问题，工具崩溃会直接中断 turn，影响真实使用。
- **社区反应**：7 条评论，说明这是近期最受关注的 bug 之一。
- 链接： [#3149](https://github.com/Hmbown/CodeWhale/issues/3149)

#### 额外观察
- 这 10 个 Issue 中，**约 7 个直接围绕 Agent Fleet / Whaleflow / subagents**，说明社区关注重心正从单纯 TUI 使用，转向“可持续、多任务、可观测”的工作流体系。
- 评论最活跃的是 **#3149** 和 **#3178/#3154**，一个是稳定性 bug，一个是新架构方向。

---

## 4) 重要 PR 进展

### 1. #3172 feat(tui): durable fleet inbox and run ledger
- **内容**：新增可持久化的 fleet ledger（JSONL），可在进程重启后重建队列和 worker 状态。
- **意义**：这是 Agent Fleet 的“记忆层”和“状态账本”。
- 链接： [#3172](https://github.com/Hmbown/CodeWhale/pull/3172)

### 2. #3171 feat(protocol): define Agent Fleet protocol types and event schema
- **内容**：定义 Fleet 的协议类型与事件 schema，包括 run、task、worker、artifact、scorer 等。
- **意义**：为 CLI / TUI / Runtime API / SSH worker 提供统一契约。
- 链接： [#3171](https://github.com/Hmbown/CodeWhale/pull/3171)

### 3. #3170 feat(tui): Ctrl+S sends next queued message as a steer
- **内容**：新增 Ctrl+S 快捷键，将队列中的下一条消息作为 steer 送入当前 turn。
- **意义**：改善“排队指令”的操作效率，增强 TUI 的工作流连续性。
- 链接： [#3170](https://github.com/Hmbown/CodeWhale/pull/3170)

### 4. #3169 feat(tui): add /plugins slash command
- **内容**：加入 `/plugins` 命令，支持查看脚本插件与元信息。
- **意义**：提升插件可发现性，降低扩展功能使用门槛。
- 链接： [#3169](https://github.com/Hmbown/CodeWhale/pull/3169)

### 5. #3168 feat(runtime-api): Phase 0 + Phase 1 — brand-neutral naming and dynamic tool protocol types
- **内容**：Runtime API 进行品牌中立化改名，同时补齐动态工具协议类型。
- **意义**：这是品牌迁移和 API 稳定化的基础动作。
- 链接： [#3168](https://github.com/Hmbown/CodeWhale/pull/3168)

### 6. #3176 fix(release): harden v0.8.59 terminal and file stability
- **内容**：修复 Windows 环境变量、PDF 解析 panic、终端低动效等稳定性问题。
- **意义**：这是 v0.8.59 的关键稳定性补丁集合。
- 链接： [#3176](https://github.com/Hmbown/CodeWhale/pull/3176)

### 7. #3152 fix(SSE): accept SSE data lines without space after colon
- **内容**：修复 SSE 解析器对 `data:` 行格式过于严格的问题。
- **意义**：直接修复流式输出丢块/空输出问题，属于高优先级兼容修复。
- 链接： [#3152](https://github.com/Hmbown/CodeWhale/pull/3152)

### 8. #3150 feat(context): add prompt source map and context-usage report
- **内容**：增加 PromptSourceMap 和上下文占用报告。
- **意义**：帮助开发者理解 prompt 组成和 token 消耗，提升调试能力。
- 链接： [#3150](https://github.com/Hmbown/CodeWhale/pull/3150)

### 9. #3148 fix(exec): resolve --model auto via DEEPSEEK_MODEL env and reorder ExecArgs
- **内容**：修复 `--model auto` 被参数解析吞掉的问题。
- **意义**：修正 CLI 自动路由逻辑，避免模型选择失效。
- 链接： [#3148](https://github.com/Hmbown/CodeWhale/pull/3148)

### 10. #3177 feat(config): surface experimental feature flags
- **内容**：在 `/config` 中暴露 Experimental 配置段，显示 goal/WhaleFlow 等实验特性状态。
- **意义**：增强实验功能可见性，便于用户理解当前启用状态。
- 链接： [#3177](https://github.com/Hmbown/CodeWhale/pull/3177)

---

## 5) 功能需求趋势

从过去 24 小时的 Issue 主题看，社区最关注的方向主要有以下几类：

1. **多智能体 / Agent Fleet / Whaleflow**
   - 关键词集中在：`swarm`、`fleet`、`subagents`、`workflow-runtime`
   - 说明项目正在从单次对话工具，向**可持续运行的协作型代理系统**演进
   - 代表链接：
     - [#3178](https://github.com/Hmbown/CodeWhale/issues/3178)
     - [#3154](https://github.com/Hmbown/CodeWhale/issues/3154)

2. **可观测性与运维能力**
   - 需求包括：状态栏、trace handle、worker inspection、ledger、heartbeat、artifact 记录
   - 说明大家越来越需要“看得见、接得住、能恢复”的运行时
   - 代表链接：
     - [#3180](https://github.com/Hmbown/CodeWhale/issues/3180)
     - [#3162](https://github.com/Hmbown/CodeWhale/issues/3162)
     - [#3172](https://github.com/Hmbown/CodeWhale/pull/3172)

3. **TUI 体验优化**
   - 关注点包括：状态栏噪音、repo 识别、streaming throughput、快捷键
   - 说明核心用户仍然重视“终端里是否足够顺手、足够清晰”
   - 代表链接：
     - [#3189](https://github.com/Hmbown/CodeWhale/issues/3189)
     - [#3188](https://github.com/Hmbown/CodeWhale/issues/3188)
     - [#3190](https://github.com/Hmbown/CodeWhale/issues/3190)

4. **稳定性与兼容性**
   - 典型问题包括：PDF 解析 panic、SSE 协议兼容、模型参数解析、Windows 终端环境
   - 说明当前仍处于“扩展能力前必须先稳住基础链路”的阶段
   - 代表链接：
     - [#3149](https://github.com/Hmbown/CodeWhale/issues/3149)
     - [#3152](https://github.com/Hmbown/CodeWhale/pull/3152)
     - [#3148](https://github.com/Hmbown/CodeWhale/pull/3148)

5. **实验能力的显式管理**
   - `/experiments`、Experimental config、goal/WhaleFlow opt-ins
   - 说明项目正在把“实验特性”从隐式开关转为**可发现、可解释、可回滚**
   - 代表链接：
     - [#3182](https://github.com/Hmbown/CodeWhale/issues/3182)
     - [#3177](https://github.com/Hmbown/CodeWhale/pull/3177)

---

## 6) 开发者关注点

综合 Issue 和 PR，可以看出开发者和贡献者当前最在意的痛点是：

- **避免子代理/多代理系统变黑盒**
  - 需要 trace、ledger、状态面板、worker drilldown
  - 相关链接： [#3180](https://github.com/Hmbown/CodeWhale/issues/3180), [#3172](https://github.com/Hmbown/CodeWhale/pull/3172)

- **让长任务可恢复、可调度、可回收**
  - 重点在 lease、heartbeat、backpressure、stuck worker recovery
  - 相关链接： [#3159](https://github.com/Hmbown/CodeWhale/issues/3159), [#3179](https://github.com/Hmbown/CodeWhale/issues/3179)

- **把实验功能“展示出来”**
  - 用户需要知道哪些特性可用、为何可用、如何开启
  - 相关链接： [#3182](https://github.com/Hmbown/CodeWhale/issues/3182), [#3177](https://github.com/Hmbown/CodeWhale/pull/3177)

- **基础链路稳定性仍是硬门槛**
  - PDF 解析、SSE、CLI 参数解析、终端环境都是高频痛点
  - 相关链接： [#3149](https://github.com/Hmbown/CodeWhale/issues/3149), [#3152](https://github.com/Hmbown/CodeWhale/pull/3152), [#3148](https://github.com/Hmbown/CodeWhale/pull/3148)

- **品牌迁移与 API 命名统一**
  - `DeepSeek` → `CodeWhale` 的品牌切换已经进入实质阶段
  - 相关链接： [#3168](https://github.com/Hmbown/CodeWhale/pull/3168), [Release v0.8.59](https://github.com/Hmbown/DeepSeek-TUI/releases/tag/v0.8.59)

如果你愿意，我也可以把这份日报进一步整理成 **“适合公众号/内部周报的精简版”**，或输出成 **表格版 Markdown** 方便直接发布。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*