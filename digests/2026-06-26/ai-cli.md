# AI CLI 工具社区动态日报 2026-06-26

> 生成时间: 2026-06-26 03:55 UTC | 覆盖工具: 9 个

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

下面给出一份横向对比分析，基于你提供的 2026-06-26 社区动态摘要整理。

---

## 1) 生态全景

今天的 AI CLI 生态整体呈现出一个很清晰的阶段性特征：**从“能用”转向“稳定可控、跨端一致、可观测”**。  
高频问题不再只是模型能力本身，而是集中在 **会话持久化、输入法/终端交互、权限审批、Provider 兼容、CI/发布链路** 等基础工程能力上。  
从活跃度看，**OpenCode、Claude Code、DeepSeek TUI、Qwen Code** 处于更快的迭代和修复周期；**Gemini CLI、Pi** 更偏稳态修补；**Copilot CLI** 和 **Kimi Code CLI** 社区噪音较低。  
这说明 AI CLI 已经进入“生产力基础设施”竞争阶段，产品差异越来越体现在**可靠性、可扩展性和跨场景一致性**，而不只是单次生成质量。

---

## 2) 各工具活跃度对比

> 说明：以下“Issues 数 / PR 数”按你提供日报中明确列出的今日更新项统计；对 Claude Code、OpenAI Codex 这类“热点问题较多但未给出总量”的仓库，按日报中列出的热点条目数计。

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 | 备注 |
|---|---:|---:|---|---|
| Claude Code | 10 | 0 | 无新 Release | Windows / IME / 会话持久化 / 429 限流集中爆发 |
| OpenAI Codex | 10 | 0 | 无新 Release | 桌面端、远程 SSH、鉴权、配额归因等问题集中 |
| Gemini CLI | 0 | 1 | 有 nightly release | 偏发布链路与 CI 稳定性修复 |
| GitHub Copilot CLI | 2 | 0 | 无新 Release | 聚焦 Agent 上下文控制、Fleet 多 clone |
| Kimi Code CLI | 0 | 0 | 无活动 | 今日无明显社区动态 |
| OpenCode | 11 | 17 | 无新 Release | 社区最活跃之一，底层能力和多模态/会话流改动密集 |
| Pi | 2 | 1 | 无新 Release | Provider 生态扩展快速闭环 |
| Qwen Code | 3 | 3 | 无新 Release | CI 稳定性、Plan 模式、跨端 UI 统一 |
| DeepSeek TUI | 0 | 16 | 无新 Release | PR 极活跃，聚焦 TUI/审批/exec 可观测性 |

---

## 3) 共同关注的功能方向

### A. 会话持久化、线程恢复、状态一致性
**涉及工具：** Claude Code、OpenAI Codex、OpenCode、DeepSeek TUI  
**共同诉求：**
- Claude Code：transcript 持久化被 gate 静默禁用，存在数据丢失风险；VS Code session sidebar 不显示外部 transcript
- Codex：线程被意外归档/隐藏、反复重连、重建状态不稳定
- OpenCode：session event stream、active sessions、interrupted step、durable/live SSE
- DeepSeek TUI：stale agent 状态回收、审批流程与状态投影

**结论：** 会话/线程已经是 AI CLI 的“主状态”，不是附属功能；谁能把恢复和持久化做稳，谁就更接近生产可用。

---

### B. 输入法、终端交互、跨平台可用性
**涉及工具：** Claude Code、DeepSeek TUI、OpenCode、Codex  
**共同诉求：**
- Claude Code：Windows IME、滚动条、复制粘贴、SSH/xterm 兼容性问题
- DeepSeek TUI：IME 光标行冲突、空 composer hint、输入体验细节
- OpenCode：路径粘贴行为、桌面端目录锁定、renderer 初始化错误
- Codex：TUI 状态可见性、fast mode 消失、远程桌面行为回退

**结论：** 终端/桌面 AI 工具正在面对“输入链路就是产品链路”的现实，IME、光标、滚动、粘贴这些细节已直接决定可用性。

---

### C. 权限、审批、安全边界更精细化
**涉及工具：** OpenCode、Qwen Code、DeepSeek TUI、Codex  
**共同诉求：**
- OpenCode：读写权限意图要区分；server 级自动批准
- Qwen Code：Plan Approval Gate 是否应覆盖所有 plan 入口
- DeepSeek TUI：审批预览、跳过文件计数、按键徽标的安全可解释性
- Codex：浏览器自动化的边界、自动弹出 Chrome、过度拦截页面

**结论：** 社区不再满足于“允许/禁止”的粗粒度控制，而是要求 **intent-aware、场景化、可解释** 的安全策略。

---

### D. Provider 兼容性与扩展生态
**涉及工具：** OpenCode、Pi、Codex、Gemini CLI  
**共同诉求：**
- OpenCode：OpenAI-compatible / Anthropic-compatible provider、状态管理、payload 处理
- Pi：新增内置 Friendli provider、payload transform
- Codex：Azure 参数兼容问题
- Gemini CLI：发布链路稳定、避免错误 NPM 发布

**结论：** Provider 层正在成为核心竞争面，兼容性越强、扩展越灵活，越容易进入企业和多模型混合环境。

---

### E. 可观测性、配额、性能与成本透明度
**涉及工具：** Claude Code、OpenAI Codex、OpenCode、DeepSeek TUI  
**共同诉求：**
- Claude Code：429 限流报错密集，用户需要更清晰的错误与退避策略
- Codex：远程 SSH 下用量归因异常、配额快速消耗
- OpenCode：prompt cache、tokens_cache_read、stream retry、visible final answer size
- DeepSeek TUI：prompt input composition、输出长度统计

**结论：** AI CLI 正从“黑盒交互”转向“可观测系统”，用户越来越在意为什么慢、为什么贵、为什么被限流。

---

## 4) 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线/特征 |
|---|---|---|---|
| Claude Code | 桌面/CLI 编码助手、会话与 IDE 集成 | Windows/桌面端用户、重度编码用户 | 强依赖输入链路、session、API 稳定性 |
| OpenAI Codex | 桌面端、远程开发、企业/鉴权/配额 | 企业开发者、远程工作流用户 | 强调线程、远程 SSH、usage 归因、浏览器自动化 |
| Gemini CLI | 发布稳定性、CI 工程治理 | 早期采用者、nightly 用户 | 更偏工程化维护，社区噪音较低 |
| GitHub Copilot CLI | Agent 上下文控制、多任务并行编排 | 高级 Agent 用户、团队协作场景 | 更关注 skills、Fleet、并行工作流 |
| Kimi Code CLI | 当前动态少，定位尚不突出 | 尚难判断 | 社区反馈不足，处于观察期 |
| OpenCode | 底层运行时、会话流、provider/multimodal、Desktop/SDK | 进阶开发者、扩展生态用户 | 架构推进快，偏“平台型 AI 工具” |
| Pi | Provider 生态扩展、兼容层、payload transform | 需要接更多模型服务的开发者 | 以 provider 接入和中间层改写为主 |
| Qwen Code | Web Shell / VSCode / Desktop 一致性、Plan 安全 | 跨端用户、企业团队 | 强调跨端 UI 统一、CI 稳定、审批安全 |
| DeepSeek TUI | 终端交互、审批、exec 可观测性 | 终端重度用户、TUI 用户 | 以 TUI 体验、输入法兼容、状态一致性为核心 |

---

## 5) 社区热度与成熟度

### 社区热度更高、迭代更快的工具
- **OpenCode**：11 个 Issue 更新、17 个 PR 更新，且覆盖 session、provider、多模态、Desktop、SDK，属于高密度快速迭代。
- **Claude Code**：Issues 热度极高，且集中在基础可用性事故，说明用户基数大、反馈强烈。
- **DeepSeek TUI**：虽然 Issues 为 0，但 PR 达到 16 个，说明维护和功能合并非常活跃。
- **Qwen Code**：Issue、PR 都有持续推进，方向比较集中，属于稳定增长型。

### 更偏稳态、成熟度相对更高的工具
- **Gemini CLI**：今天只有 nightly release 和少量 CI 修复，问题面较窄，显示出较强的工程稳态特征。
- **Pi**：Issue 少且都快速闭环，说明需求较聚焦，生态在有序扩展。
- **GitHub Copilot CLI**：更新少但主题明确，属于相对克制、偏高阶功能探索。
- **Kimi Code CLI**：今日无活动，暂时难判断成熟度，更像“低可见度”而非明确成熟。

### 风险与成熟度判断
- **高热度但高风险：** Claude Code、OpenAI Codex  
  原因是反馈集中在“基础链路故障”，对用户体验影响直接。
- **高迭代但方向清晰：** OpenCode、DeepSeek TUI、Qwen Code  
  原因是问题和 PR 都围绕核心架构展开，说明正在快速收敛产品形态。
- **更稳更冷：** Gemini CLI、Pi  
  原因是更偏发布治理和局部能力增强，产品边界相对清晰。

---

## 6) 值得关注的趋势信号

### 1. AI CLI 正在变成“可执行工作流平台”
不再只是聊天壳，而是围绕 **session、线程、workspace、plan、approval、tool call** 构建完整工作流。  
**参考价值：** 后续竞争点会从“回答好不好”转向“流程能不能稳”。

### 2. 跨端一致性成为核心战场
Web Shell、Desktop、VSCode Webview、CLI/TUI 之间的体验统一需求明显增强。  
**参考价值：** 架构层要尽早做组件复用、状态同步和渲染统一，否则后期维护成本会指数级上升。

### 3. 输入法与国际化体验被迫成为第一优先级
Windows IME、日文/中文输入、TUI 光标、滚动条、粘贴行为这些看似边角的问题，实际上是生产可用性的门槛。  
**参考价值：** 面向全球化用户时，终端输入链路必须纳入回归测试主集。

### 4. 安全与审批从“阻断式”走向“意图感知式”
用户既要自动化，又要可控；既要放开权限，又不能误操作。  
**参考价值：** 未来的权限系统需要更细粒度的 intent 表达，而不是简单黑白名单。

### 5. Provider 兼容与中间层改写能力越来越重要
OpenCode、Pi、Codex 的问题都在说明：多模型时代的竞争不只是接入多少模型，而是**能否统一处理协议差异、payload 和状态语义**。  
**参考价值：** 提前投资 provider abstraction、transform、fallback、compatibility layer 很关键。

### 6. 可靠性、限流、配额、成本透明度正在成为“信任底座”
429、误计量、缓存失真、流式错误重试、输出长度统计，这些都说明用户越来越在意系统可解释性。  
**参考价值：** 工具要想进入工作主链路，必须提供更好的可观测性和错误分层。

---

如果你愿意，我还可以继续把这份报告整理成两个版本之一：
1. **适合管理层阅读的 1 页决策摘要版**  
2. **适合研发团队晨会的行动项版（按优先级排序）**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下为基于你提供的 GitHub 数据整理的 **Claude Code Skills 社区热点报告**（截至 2026-06-26）。

---

## 1) 热门 Skills 排行（PR）
> 说明：以下按你给出的热门 PR 顺序与议题热度综合排序；当前展示的 PR 状态均为 **Open**。

1. **[#1298 fix(skill-creator): run_eval.py 总是报告 0% recall](https://github.com/anthropics/skills/pull/1298)**  
   - **功能**：修复 Skill 优化评测链路（`run_eval.py` / `run_loop.py` / `improve_description.py`）失真问题，并处理 Windows 流读取、触发检测、并行 worker。  
   - **社区热点**：这是“Skill 生成/优化系统是否可信”的核心问题；如果评测恒为 0%，后续优化全部失去意义。  
   - **状态**：Open

2. **[#1099 skill-creator: 修复 Windows 下 subprocess pipe 读取崩溃](https://github.com/anthropics/skills/pull/1099)**  
   - **功能**：解决 Windows 上 `run_eval.py` 无法正常读取子进程输出的问题。  
   - **社区热点**：Windows 可用性是高频痛点，说明 Skills 工具链仍偏 Unix-first。  
   - **状态**：Open

3. **[#1323 fix(skill-creator): run_eval 触发检测漏判真实 skill 名称](https://github.com/anthropics/skills/pull/1323)**  
   - **功能**：修复评测脚本无法识别 skill 已触发的问题。  
   - **社区热点**：直接关联到“为什么所有查询都没触发技能”的核心故障，影响优化结果可靠性。  
   - **状态**：Open

4. **[#361 Detect unquoted YAML special characters in description fields](https://github.com/anthropics/skills/pull/361)**  
   - **功能**：在解析前检测 `description` / `compatibility` 中未加引号的 YAML 特殊字符。  
   - **社区热点**：反映社区对 **Skill 元数据健壮性** 的强烈需求，避免“静默解析错误”。  
   - **状态**：Open

5. **[#362 Fix skill-creator UTF-8 panic on multi-byte characters](https://github.com/anthropics/skills/pull/362)**  
   - **功能**：修复多字节字符导致的 Rust panic，改为 UTF-8 字节长度安全处理。  
   - **社区热点**：国际化与多语言输入场景被明确暴露为问题，说明 Skills 需要更强的字符集兼容性。  
   - **状态**：Open

6. **[#538 fix(pdf): correct case-sensitive file references in SKILL.md](https://github.com/anthropics/skills/pull/538)**  
   - **功能**：修正 PDF Skill 中 `SKILL.md` 对大小写敏感文件的错误引用。  
   - **社区热点**：典型的跨平台/文件系统兼容问题，说明社区很关注“技能能否在真实环境稳定运行”。  
   - **状态**：Open

7. **[#514 Add document-typography skill](https://github.com/anthropics/skills/pull/514)**  
   - **功能**：新增文档排版质检 Skill，覆盖孤行、寡行、编号对齐等典型排版问题。  
   - **社区热点**：文档生成质量是 Claude Skills 的高频需求，且属于“用户可感知价值”很强的方向。  
   - **状态**：Open

8. **[#723 feat: add testing-patterns skill](https://github.com/anthropics/skills/pull/723)**  
   - **功能**：新增测试方法论与实践 Skill，覆盖单测、React 组件测试、测试分层等。  
   - **社区热点**：说明社区不仅要“写代码”，也希望 Skills 能直接提升 **工程质量与测试覆盖**。  
   - **状态**：Open

---

## 2) 社区需求趋势
从 Issues 的集中主题看，社区最期待的新 Skill 方向主要有 5 类：

### A. **技能评测与生成链路的可靠性**
- 代表 Issue：  
  - [#556 run_eval.py: claude -p never triggers skills/commands (0% trigger rate)](https://github.com/anthropics/skills/issues/556)  
  - [#1169 description-optimisation loop: recall=0% on every iteration](https://github.com/anthropics/skills/issues/1169)  
  - [#1061 Windows compatibility issues in skill-creator scripts](https://github.com/anthropics/skills/issues/1061)  
- **趋势判断**：社区非常在意“Skill 是否真的被触发、评测是否可信、优化是否有效”。

### B. **文档生产与格式控制**
- 代表需求：文档排版、PDF/DOCX/ODT、模板填充、文档解析。  
- 代表 PR/Issue：  
  - [#514 document-typography](https://github.com/anthropics/skills/pull/514)  
  - [#486 Add ODT skill](https://github.com/anthropics/skills/pull/486)  
- **趋势判断**：文档类仍是最强刚需之一，尤其是“生成后质量控制”而不仅是“生成内容”。

### C. **测试、代码审查与代码库治理**
- 代表需求：测试策略、代码库盘点、审计、质量分析。  
- 代表 Issue：  
  - [#147 codebase-inventory-audit skill](https://github.com/anthropics/skills/issues/147)  
  - [#723 testing-patterns](https://github.com/anthropics/skills/pull/723)  
- **趋势判断**：社区希望 Skills 更像“工程助手”，能直接进入代码质量与维护流程。

### D. **企业协作与共享**
- 代表 Issue：  
  - [#228 Enable org-wide skill sharing in Claude.ai](https://github.com/anthropics/skills/issues/228)  
  - [#61 "Not found" error when loading Skills](https://github.com/anthropics/skills/issues/61)  
  - [#29 Usage with bedrock](https://github.com/anthropics/skills/issues/29)  
- **趋势判断**：企业用户关注可部署、可共享、可集成，而不是单机下载式使用。

### E. **安全、信任边界与治理**
- 代表 Issue：  
  - [#492 Security: Community skills distributed under anthropic/ namespace enable trust boundary abuse](https://github.com/anthropics/skills/issues/492)  
  - [#412 skill proposal: agent-governance](https://github.com/anthropics/skills/issues/412)  
  - [#1329 compact-memory](https://github.com/anthropics/skills/issues/1329)  
- **趋势判断**：社区开始把 Skills 视作“可执行能力模块”，因此安全、权限与治理成为关键议题。

---

## 3) 高潜力待合并 Skills
以下 PR 具备“问题明确、影响范围大、修复粒度小”的特征，近期落地概率较高：

1. **[#1298 run_eval.py 0% recall 修复](https://github.com/anthropics/skills/pull/1298)**  
   - 直接影响整个 skill-creator 优化闭环，属于基础设施级修复。

2. **[#1323 触发检测漏判修复](https://github.com/anthropics/skills/pull/1323)**  
   - 与 #1298 主题一致，属于评测链路的关键补丁。

3. **[#1099 Windows pipe 崩溃修复](https://github.com/anthropics/skills/pull/1099)**  
   - Windows 兼容性问题通常是高优先级“修复型”PR。

4. **[#1050 skill-creator Windows subprocess + encoding 修复](https://github.com/anthropics/skills/pull/1050)**  
   - 仍属于低风险、强收益的兼容性补丁。  
   - 链接：<https://github.com/anthropics/skills/pull/1050>

5. **[#361 YAML 特殊字符未加引号检测](https://github.com/anthropics/skills/pull/361)**  
   - 这类“预检防静默错误”通常容易被接受。

6. **[#362 UTF-8 panic 修复](https://github.com/anthropics/skills/pull/362)**  
   - 面向国际化输入的稳定性修复，落地价值明确。

7. **[#538 PDF 资源引用大小写修复](https://github.com/anthropics/skills/pull/538)**  
   - 小而关键，容易合并，且能减少跨平台故障。

---

## 4) Skills 生态洞察
**一句话总结：当前社区最集中的诉求是——让 Skills 从“可演示”走向“可可靠生产使用”，重点集中在评测可信度、跨平台稳定性、文档/测试等高频工作流，以及企业级共享与安全治理。**

如果你愿意，我还可以把这份报告进一步整理成：
- **表格版（适合汇报）**
- **PPT 提纲版**
- **按“产品 / 工程 / 安全”三视角的分析版**

---

# Claude Code 社区动态日报（2026-06-26）

## 1) 今日速览
今天社区反馈明显集中在**稳定性与可用性回归**：Windows 相关问题最密集，涉及 IME 输入、滚动条、桌面端会话列表、OAuth 授权等；同时也出现了**性能/内存泄漏**与**会话持久化数据丢失**这类高风险问题。  
此外，**Anthropic API 429 限流**出现多条重复报错，说明后端请求稳定性或限流策略可能正在影响一批用户体验。整体上，今天没有新版本发布，问题反馈以“新报 bug”为主。

## 2) 版本发布
- **过去 24 小时无新 Release**  
  https://github.com/anthropics/claude-code/releases

## 3) 社区热点 Issues

1. **[#71493 极端延迟/内存泄漏，/heapdump 显示 348,766 MB/hour 增长](https://github.com/anthropics/claude-code/issues/71493)**  
   这是今天最严重的性能类问题之一，直接指向内存泄漏，且量级非常夸张，可能导致 CLI/桌面端长期运行不可用。社区反馈虽只有 1 条评论，但属于高优先级稳定性事故。

2. **[#71496 会话 transcript 持久化被服务端 gate 静默禁用，存在数据丢失风险](https://github.com/anthropics/claude-code/issues/71496)**  
   这类问题影响 `--resume`、历史追溯与审计能力，属于“无声数据丢失”级别风险，优先级极高。该 issue 已明确复现条件，并指出 `CLAUDE_CODE_FORCE_SESSION_PERSISTENCE=1` 可恢复，说明问题边界较清晰。

3. **[#71500 VS Code 扩展回归：Sessions sidebar 不再显示外部创建/修改的 transcript](https://github.com/anthropics/claude-code/issues/71500)**  
   这是典型的 IDE 集成回归，影响会话管理与跨工具协作。标题已明确标注 regression，且范围集中在 2.1.187–2.1.191，利于快速定位版本引入点。

4. **[#71499 Windows IME 回归：按 Enter 后中文输入组合被删除](https://github.com/anthropics/claude-code/issues/71499)**  
   对中文用户是高频、阻断式问题，直接影响 Windows CLI 的可输入性。该 issue 明确指出在 v2.1.193 出现 regression，通常会被视为 P0/P1 级别输入缺陷。

5. **[#71495 Windows 11 新版 Microsoft IME 在 TUI 中无法输入日文](https://github.com/anthropics/claude-code/issues/71495)**  
   与 #71499 一样属于 Windows 输入法兼容性问题，但更偏向日文场景，说明 TUI 输入链路对 IME 支持存在系统性回归。社区反馈虽少，但影响面明确。

6. **[#71490 Claude Desktop Windows OAuth token 缺少 design scopes，/design-sync 无法授权](https://github.com/anthropics/claude-code/issues/71490)**  
   这是权限/认证链路问题，直接阻断 DesignSync 工具使用。对依赖设计同步工作流的用户影响很大，且“无内置授权路径”会显著降低可恢复性。

7. **[#71508 Tool call markup 泄漏到可见输出，而不是被执行](https://github.com/anthropics/claude-code/issues/71508)**  
   这是模型-工具编排层面的正确性问题：工具调用没有被执行，反而暴露到 UI，属于“功能失效 + 输出污染”。即便目前只有 1 条评论，也值得高度关注。

8. **[#71491 Linux 交互 CLI：滚动条不可见，复制/粘贴失效（SSH / xterm）](https://github.com/anthropics/claude-code/issues/71491)**  
   这会直接影响远程终端用户的基本交互能力，尤其是 SSH 和 xterm 场景。属于终端兼容性/可用性问题，常见于 TUI 回归。

9. **[#71504 Anthropic API 报错：Server rate limit exceeded](https://github.com/anthropics/claude-code/issues/71504)**  
   今天出现了**一组重复的 429 限流问题**（#71501/#71502/#71503/#71505/#71506/#71497），说明不是单点偶发，而更像一类广泛的服务端限流/请求策略问题。对用户感知影响大，也会放大“产品不稳定”的印象。

10. **[#71494 付费用户投诉：结果不完整/有 bug、频繁追问、造成流失](https://github.com/anthropics/claude-code/issues/71494)**  
    虽然被标记为 invalid，但它代表了**付费用户对产品可靠性的强烈不满**，且已有 2 条评论。此类反馈常常不是单一 bug，而是多个体验问题叠加后的总投诉，值得产品与支持团队重视。

## 4) 重要 PR 进展
- **过去 24 小时无 PR 更新**  
  https://github.com/anthropics/claude-code/pulls

## 5) 功能需求趋势
从今天的 Issues 看，社区关注点主要集中在以下方向：

- **IDE / 桌面端集成稳定性**  
  VS Code、Claude Desktop、session sidebar、DesignSync 等都在出问题，说明 IDE 工作流已是核心使用场景。  
  相关链接：[#71500](https://github.com/anthropics/claude-code/issues/71500)、[#71490](https://github.com/anthropics/claude-code/issues/71490)

- **Windows 兼容性与输入法支持**  
  IME、滚动条、终端输入、桌面交互问题密集出现，Windows 端体验明显是高优先级诉求。  
  相关链接：[#71499](https://github.com/anthropics/claude-code/issues/71499)、[#71495](https://github.com/anthropics/claude-code/issues/71495)、[#71498](https://github.com/anthropics/claude-code/issues/71498)

- **会话持久化与历史恢复**  
  transcript 保存、resume、sidebar 读取等能力被频繁提及，说明用户非常依赖可追溯会话。  
  相关链接：[#71496](https://github.com/anthropics/claude-code/issues/71496)、[#71500](https://github.com/anthropics/claude-code/issues/71500)

- **性能与资源占用**  
  内存泄漏、延迟飙升属于高风险稳定性问题，尤其影响长会话和持续运行场景。  
  相关链接：[#71493](https://github.com/anthropics/claude-code/issues/71493)

- **API 稳定性与限流体验**  
  多条 429 报错表明用户对“服务端限流/节流”的敏感度很高，期望更清晰的错误提示和更稳的请求策略。  
  相关链接：[#71504](https://github.com/anthropics/claude-code/issues/71504)

- **多语言输入/输出质量**  
  中文 IME、日文字符形、日文响应字形混用等问题集中出现，说明国际化体验仍有明显缺口。  
  相关链接：[#71499](https://github.com/anthropics/claude-code/issues/71499)、[#71507](https://github.com/anthropics/claude-code/issues/71507)

## 6) 开发者关注点
今天的反馈暴露出几类开发者最该盯紧的痛点：

- **回归频率高，且集中在基础交互链路**：输入法、滚动、复制粘贴、会话列表等基础功能一旦回归，影响面极广。  
- **数据可靠性是红线**：session transcript 丢失类问题比普通 bug 更敏感，因为会直接影响恢复、审计和信任。  
- **Windows 是重点战场**：多条 issue 都指向 Windows 平台，说明该平台可能需要更密集的回归测试。  
- **API 429 需要更好的可观测性与分流策略**：当前重复报错多、反馈碎片化，建议加强错误分层、限流原因提示与请求退避。  
- **工具调用必须“执行可见”**：tool markup 泄漏到输出意味着模型编排层和 UI 层之间的契约可能失效。  
- **多语言场景要当作核心场景而非边缘场景**：中文/日文输入输出问题已经影响到实际生产使用。

如果你希望，我也可以把这份日报再整理成**适合内部周报/飞书公告的简版**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-06-26）

## 今日速览
今天 **没有新 Release**，社区更新几乎全部集中在 **桌面端/CLI 稳定性、远程控制、配额与鉴权、以及浏览器自动化边界** 上。  
从 Issues 看，用户最关注的仍是 **核心工作流是否稳定可用**：包括线程可见性、断线重连、远程 SSH 计费归因、以及 Windows/macOS 的桌面端体验问题。

---

## 社区热点 Issues

1. **[#30162](https://github.com/openai/codex/issues/30162) Codex Desktop 仍持续写入高频 TRACE 日志到 `logs_2.sqlite`**
   - **重要性**：这是典型的性能/磁盘占用问题，且发生在 Windows Desktop 的日志链路上，容易引发本地性能下降和排障噪音。
   - **社区反应**：已有 **2 条评论**，是本日讨论最活跃的 Issue，说明复现与定位价值较高。

2. **[#30171](https://github.com/openai/codex/issues/30171) CLI/TUI 的 fast mode 消失**
   - **重要性**：属于核心交互能力回退，直接影响命令行用户的效率与预期行为。
   - **社区反应**：已有 **1 条评论**，表明这是一个可感知的产品回归问题。

3. **[#30166](https://github.com/openai/codex/issues/30166) VS Code Remote-SSH 下出现异常用量归因和配额快速消耗**
   - **重要性**：涉及 **计费归因、rate limits、扩展行为可解释性**，一旦误计量会显著损害信任。
   - **社区反应**：已有 **1 条评论**；问题指向“我没运行 `codex exec` 但却显示 Exec”，值得优先排查。

4. **[#30165](https://github.com/openai/codex/issues/30165) Windows Desktop 远程控制 QR 配对在清理旧远程主机后卡住**
   - **重要性**：远程接入是桌面端关键路径，此类卡死会直接阻断工作流。
   - **社区反应**：已有 **1 条评论**，且描述中明确提到升级后回归，具有版本定位价值。

5. **[#30163](https://github.com/openai/codex/issues/30163) 更新后最近本地线程被意外归档/隐藏**
   - **重要性**：属于数据可见性/状态迁移问题，会让用户误以为历史会话丢失。
   - **社区反应**：已有 **1 条评论**；问题中提到通过本地 DB 恢复，说明是更新流程中的元数据漂移。

6. **[#30161](https://github.com/openai/codex/issues/30161) Azure 场景报未知参数 `input[0].internal_chat_message_metadata_passthrough`**
   - **重要性**：这是 **Azure API 兼容性** 问题，影响企业与托管环境用户。
   - **社区反应**：已有 **1 条评论**；从报错看属于协议/参数透传不兼容。

7. **[#30160](https://github.com/openai/codex/issues/30160) 一直重连并反复重新生成代码**
   - **重要性**：连接稳定性问题，直接影响会话连续性与用户信心。
   - **社区反应**：已有 **1 条评论**；“remake codes again and again” 说明症状明显且影响体验严重。

8. **[#30170](https://github.com/openai/codex/issues/30170) 后台建议任务意外拉起自动化 Chrome 窗口**
   - **重要性**：涉及 **浏览器自动化的显式性与安全边界**，容易引起用户对“电脑被接管”的担忧。
   - **社区反应**：当前 **0 评论**，但问题本身敏感度高，建议重点关注。

9. **[#30168](https://github.com/openai/codex/issues/30168) `@codex review` 提示需要创建 Codex 账号并连接 GitHub，但 Web 已能访问仓库**
   - **重要性**：这是 **代码评审入口的鉴权/路由问题**，会阻断 PR 审查流程。
   - **社区反应**：当前 **0 评论**，但属于高优先级可用性问题。

10. **[#30167](https://github.com/openai/codex/issues/30167) 浏览器使用功能过度拦截 Taobao 页面**
    - **重要性**：这是一个很典型的 **安全策略过严** 问题，影响合规/举报类场景中的证据收集。
    - **社区反应**：该 Issue 已 **关闭**，说明团队可能已有处理动作，但也反映出安全拦截边界仍需校准。

---

## 重要 PR 进展

> 说明：过去 24 小时内仅更新了 **4 条 PR**，以下为全部可见更新。

1. **[#30173](https://github.com/openai/codex/pull/30173) 关闭线程后释放持久化写入**
   - 解决会话结束后仍持有 local writer 的问题，避免同进程 resume 时出现 `thread ... already has a live local writer`。

2. **[#30164](https://github.com/openai/codex/pull/30164) 新线程模型默认值改为 scope-aware**
   - 让 Codex 能在同一配置包里为不同产品作用域加载不同默认模型，适配 Work/Coding 等不同场景。

3. **[#30157](https://github.com/openai/codex/pull/30157) 跨可用性与恢复流程的能力测试**
   - 新增端到端测试，覆盖 World State、executor skills、selected plugin metadata、MCP、connectors、动态环境和 resume 等组合场景。

4. **[#30156](https://github.com/openai/codex/pull/30156) 远程文件系统 walk 不可用时回退**
   - 当 exec-server 还不支持 `fs/walk` RPC 时，增加 fallback，避免老服务端导致 skills discovery 失败。

---

## 功能需求趋势

1. **桌面端会话与线程管理更稳**
   - 集中体现在线程隐藏/归档、侧边聊天历史、会话恢复、远程控制配对等问题上。
   - 相关：[#30163](https://github.com/openai/codex/issues/30163)、[#30176](https://github.com/openai/codex/issues/30176)、[#30165](https://github.com/openai/codex/issues/30165)

2. **CLI/TUI 仍在追求“状态可见性”与“低摩擦操作”**
   - 用户希望 `/statusline`、fast mode、Enter 行为等交互更明确、更可预测。
   - 相关：[#30171](https://github.com/openai/codex/issues/30171)、[#30172](https://github.com/openai/codex/issues/30172)、[#30174](https://github.com/openai/codex/issues/30174)

3. **远程开发与 IDE 集成问题占比高**
   - VS Code Remote-SSH、Git 控件缺失、Exec 归因异常，说明扩展与远程场景仍是高频痛点。
   - 相关：[#30166](https://github.com/openai/codex/issues/30166)、[#30175](https://github.com/openai/codex/issues/30175)

4. **浏览器自动化与安全策略需要更精细的边界**
   - 用户既要自动化能力，也要求明确授权与不过度拦截。
   - 相关：[#30170](https://github.com/openai/codex/issues/30170)、[#30167](https://github.com/openai/codex/issues/30167)

5. **企业/平台兼容性与配额可解释性需求上升**
   - Azure 参数兼容、Enterprise 月度额度展示、误计量/快速扣额，都说明企业用户更关注“可解释、可审计”。
   - 相关：[#30161](https://github.com/openai/codex/issues/30161)、[#30172](https://github.com/openai/codex/issues/30172)、[#30166](https://github.com/openai/codex/issues/30166)

---

## 开发者关注点

1. **稳定性优先于新功能**
   - 本日高频问题都集中在：重连、线程可见性、远程配对、日志异常、状态迁移。

2. **“状态不一致”是当前最明显的痛点**
   - 包括更新后线程消失、旧环境残留、远程主机清理后卡死、API/鉴权提示不一致。

3. **企业用户对计费与权限边界更敏感**
   - 误归因、误扣额、Azure 兼容错误、`@codex review` 的账户提示，都会直接影响可用性与信任。

4. **安全能力需要更细粒度的策略表达**
   - 浏览器拦截过宽、自动化窗口意外出现，说明“安全拦截”和“用户授权”之间需要更清晰的产品设计。

---

如果你愿意，我还可以把这份日报进一步整理成：
- **适合发群的短版摘要**
- **按桌面端 / CLI / Web / 企业版分组的版本**
- **带“风险等级”和“优先级建议”的运维/产品视角版本**

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

以下为 **2026-06-26 Gemini CLI 社区动态日报**（基于 `google-gemini/gemini-cli` 过去 24 小时 GitHub 数据）。

---

## 1) 今日速览

今天社区侧 **Issue 基本沉寂**：过去 24 小时没有更新的 Issue，说明外部使用反馈与新需求讨论都较少。  
真正的变化集中在 **夜间版发布与发布链路修复**：本次 nightly release 主要围绕 CI/发布稳定性、变更日志生成和测试修复展开，体现出团队当前优先级是“稳发布、降风险”。

- 仓库：<https://github.com/google-gemini/gemini-cli>
- 今日日志对应 Nightly Release：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.51.0-nightly.20260626.gb14416447>

---

## 2) 版本发布

### `v0.51.0-nightly.20260626.gb14416447`
发布说明显示，本次 nightly 主要包含 3 项改动：

1. **修复 CI，防止错误的 NPM 发布和 promote job 崩溃**  
   - 直接提升发布链路可靠性，属于高优先级稳定性修复。  
   - 关联 PR：<https://github.com/google-gemini/gemini-cli/pull/28147>

2. **补充 `v0.50.0-preview.1` 的 Changelog**  
   - 说明发布文档/变更记录流程仍在持续维护。  
   - 关联 PR：<https://github.com/google-gemini/gemini-cli/pull/28150>

3. **修复 `no_proxy` 测试**  
   - 指向网络代理相关测试的稳定性问题，通常与 CI 偶发失败有关。  
   - 发布说明中的贡献者：@jerrylin3321  
   - 仓库发布页：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.51.0-nightly.20260626.gb14416447>

---

## 3) 社区热点 Issues

### 今日无可用热点 Issue
过去 24 小时 **没有更新的 Issue（0 条）**，因此无法从 Issue 中筛选出 10 个热点条目，也没有评论数、点赞数或社区争议点可供分析。

- Issues 列表入口：<https://github.com/google-gemini/gemini-cli/issues>

> 结论：今天社区反馈面偏冷，**没有明显的新需求爆发或高频 bug 讨论**。

---

## 4) 重要 PR 进展

### 今日可见的更新 PR 仅 1 条
#### #28158 `[OPEN] chore/release: bump version to 0.51.0-nightly.20260626.gb14416447`
- 作者：`gemini-cli-robot`
- 类型：自动化版本号提升
- 说明：这是 nightly 发布的版本 bump PR，属于发布流程的一部分，而不是功能开发本身。
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28158>

### 与今日发布直接相关的合入改动
虽然它们不在“24 小时内更新 PR 列表”中，但已经进入本次 release note，值得一起关注：

#### #28147 `fix(ci): prevent bad NPM releases and promote job crashes`
- 重点：修复 CI 发布链路中的潜在故障，避免错误 NPM 发布。
- 价值：这是典型的“发布事故防护”改动，优先级高。
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28147>

#### #28150 `Changelog for v0.50.0-preview.1`
- 重点：补齐预览版变更日志。
- 价值：说明项目对版本发布说明、可追溯性仍在持续打磨。
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28150>

> 备注：本日未检出更多更新 PR，因此无法凑齐 10 条“重要 PR”；以上为当天真实可见的全部重点项。

---

## 5) 功能需求趋势

### 由于今日没有 Issue，趋势信号主要来自 Release/PR
从今天的发布与 PR 内容看，社区/团队关注点更偏向 **工程稳定性与发布治理**，而不是新功能扩张：

1. **CI / 发布链路可靠性**
   - 防止错误 NPM 发布、避免 promote job 崩溃，是最明确的趋势信号。
   - 链接：<https://github.com/google-gemini/gemini-cli/pull/28147>

2. **测试稳定性**
   - `no_proxy` 测试修复说明网络/环境变量相关测试仍存在波动。
   - 链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.51.0-nightly.20260626.gb14416447>

3. **版本与变更日志自动化**
   - nightly bump、Changelog 维护表明发布自动化流程在持续完善。
   - 链接：<https://github.com/google-gemini/gemini-cli/pull/28158>  
   - 链接：<https://github.com/google-gemini/gemini-cli/pull/28150>

> 结论：当前没有来自 Issue 的外部需求压力，**项目重心更像是在“稳态运行”而非“功能扩张”**。

---

## 6) 开发者关注点

今天开发者侧暴露出的高频关注点主要有三类：

1. **避免错误发布到 NPM**
   - 说明发布安全性仍是首要问题。  
   - 链接：<https://github.com/google-gemini/gemini-cli/pull/28147>

2. **降低 CI / promote job 崩溃风险**
   - 这类问题通常会直接影响 nightly/preview 的交付节奏。  
   - 链接：<https://github.com/google-gemini/gemini-cli/pull/28147>

3. **修复环境相关测试不稳定**
   - `no_proxy` 测试修复反映出测试环境与代理变量兼容性仍需关注。  
   - 链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.51.0-nightly.20260626.gb14416447>

4. **版本与 Changelog 自动化**
   - 自动 bump 与补齐 Changelog 说明团队正在把发布流程做得更标准化。  
   - 链接：<https://github.com/google-gemini/gemini-cli/pull/28158>  
   - 链接：<https://github.com/google-gemini/gemini-cli/pull/28150>

---

如需，我也可以把这份日报进一步整理成：
- **适合 Slack/飞书发布的短版**
- **适合周报/邮件的正式版**
- **带“风险评级 + 影响面”的分析版**

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-06-26）

## 1. 今日速览
今天仓库**没有新 Releases**，过去 24 小时内也**没有更新的 PR**。社区讨论主要集中在两个方向：**自定义 Agent 的上下文控制**，以及 **Fleet 场景下的多目录克隆/多工作区协作**，都指向 Copilot CLI 在复杂开发流程中的可控性与并行效率。

---

## 2. 版本发布
**无新版本发布。**  
- 仓库在过去 24 小时内没有新的 Release 记录。  
- Release 入口：<https://github.com/github/copilot-cli/releases>

---

## 3. 社区热点 Issues
> 过去 24 小时内仅有 **2 条更新 Issue**，因此本日报按“全部更新 Issue”汇总。当前暂无足够数量可挑选 10 条。

### 1) #3940 Custom agent support for `skills` field to limit which skills are preloaded into context
- **状态**：OPEN｜**标签**：triage  
- **为什么重要**：这是一个很典型的“**上下文膨胀控制**”需求。用户希望自定义 agent 时能通过 `skills` 字段精确限制预加载内容，减少无关技能进入上下文，从而提升响应质量、降低噪音与 token 消耗。  
- **社区反应**：截至目前有 **2 条评论**，说明问题已经引起一定讨论，但仍处于早期方案探索阶段。  
- **链接**：<https://github.com/github/copilot-cli/issues/3940>

### 2) #3939 [area:agents] Fleet command multi clone
- **状态**：OPEN  
- **为什么重要**：这个需求聚焦于 **Fleet/并行工作流**，希望 `/fleet` 能把仓库克隆到多个目录，并用 Git 作为状态/冲突沟通机制。它反映出用户正在尝试把 Copilot CLI 用在更复杂的并行开发、批量修改和分支协调场景中。  
- **社区反应**：目前 **0 条评论**，但标题和方案都较完整，属于较明确的高级工作流诉求。  
- **链接**：<https://github.com/github/copilot-cli/issues/3939>

---

## 4. 重要 PR 进展
过去 24 小时内 **没有更新的 Pull Request**，因此本日无可列入的重要 PR 进展。  
- PR 列表入口：<https://github.com/github/copilot-cli/pulls>

---

## 5. 功能需求趋势
从本次更新的 Issues 看，社区关注点主要集中在以下两类：

1. **Agent 可配置性与上下文精控**  
   - 代表需求：`skills` 字段、按需加载技能、减少上下文冗余。  
   - 说明用户希望 Copilot CLI 在“自定义 Agent”层面更可控、更轻量。  
   - 相关 Issue：<https://github.com/github/copilot-cli/issues/3940>

2. **并行开发与多工作区编排能力**  
   - 代表需求：Fleet 多 clone、用 Git 协调多目录变更。  
   - 说明用户正在把 Copilot CLI 用于更大规模的任务分解、批量改动与冲突管理。  
   - 相关 Issue：<https://github.com/github/copilot-cli/issues/3939>

---

## 6. 开发者关注点
从今天的反馈中，可以提炼出开发者的几个高频痛点：

- **上下文过载**：希望更精细地控制预加载内容，避免 Agent “带太多技能上场”。  
- **自定义 Agent 的边界与扩展性**：用户不仅想定义 Agent，还想定义它“该看什么、不该看什么”。  
- **多任务并行协作效率**：希望 CLI 能更好支持多目录、多工作区、批量操作等高级流程。  
- **冲突处理与状态同步**：在 Fleet/多 clone 场景里，大家更依赖 Git 作为通信机制，说明冲突管理和结果汇总是关键诉求。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合团队周报的精简版**，或  
2. **适合公众号/内部分享的分析版**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-06-26  
来源：`github.com/anomalyco/opencode`

## 1) 今日速览
今天社区讨论几乎全部聚焦在 **核心运行时、Session 事件流、权限控制和多模态支持** 上，说明 OpenCode 正在从“功能可用”走向“跨场景稳定可控”。  
同时，来自核心贡献者的多项 PR 集中推进了 **OpenAI/兼容模型状态管理、会话持久化、流式错误恢复** 等底层能力，属于非常典型的架构强化日。  
整体看，今天没有新 Release，但 issues 和 PR 的密度很高，且议题偏底层，后续很可能直接影响 Desktop、SDK 和多模型接入体验。

---

## 2) 社区热点 Issues

> 今日共有 11 条更新中的 Issue，以下挑选 10 条最值得关注的主题。

1. **[#34014] 文件权限申请语义过于模糊，需区分读写权限并明确意图**  
   链接：<https://github.com/anomalyco/opencode/issues/34014>  
   重要性：权限申请是 AI 工具里最敏感的安全边界之一，这个问题直指“授权意图不清晰”，会影响用户信任与误操作风险。  
   社区反应：**1 条评论，0 👍**，属于典型的早期高价值需求，讨论刚起步。

2. **[#34004] Anthropic-compatible 自定义 Provider 的 Desktop 工作流不完整**  
   链接：<https://github.com/anomalyco/opencode/issues/34004>  
   重要性：自定义 Provider 是 OpenCode 扩展生态的关键入口，Desktop 流程不完整会直接限制企业和高级用户落地。  
   社区反应：**1 条评论，0 👍**，说明需求明确，但还在收敛方案阶段。

3. **[#34003] sdk-next 需要可持久化的终端运行失败事件**  
   链接：<https://github.com/anomalyco/opencode/issues/34003>  
   重要性：这是典型的 SDK 可观测性问题，涉及失败态是否能被宿主准确感知，直接影响集成方的状态机和错误处理。  
   社区反应：**1 条评论，0 👍**，偏底层基础能力，关注点专业且明确。

4. **[#33999] Core catalog 的 OpenAI 模型跳过了无状态 Responses 默认值**  
   链接：<https://github.com/anomalyco/opencode/issues/33999>  
   重要性：这类问题会导致 reasoning 复用、状态串扰等隐蔽错误，属于“功能看似正常、实际状态错位”的高风险 bug。  
   社区反应：**1 条评论，0 👍**，属于需要核心维护者介入确认的架构级问题。

5. **[#33995] OpenCode Desktop 工作区会话错误锁定到旧目录**  
   链接：<https://github.com/anomalyco/opencode/issues/33995>  
   重要性：这是桌面端的高频体验问题，会让用户在切换项目后继续绑定错误目录，属于影响日常使用的关键缺陷。  
   社区反应：**1 条评论，0 👍**，典型的“桌面端状态持久化”问题。

6. **[#34006] 桌面端与终端端对本地文件路径粘贴行为不一致，且无法纯文本粘贴**  
   链接：<https://github.com/anomalyco/opencode/issues/34006>  
   重要性：输入交互是 AI IDE 的高频路径；路径被自动识别为附件还是纯文本，直接影响编辑、引用和上下文构造。  
   社区反应：**0 条评论，0 👍**，但问题描述清晰，适合快速复现并修正。

7. **[#33998] opencode-go 上 GLM-5.2 的 prompt cache 随机跌落**  
   链接：<https://github.com/anomalyco/opencode/issues/33998>  
   重要性：缓存命中率异常会直接影响推理成本和响应延迟，尤其是多轮会话场景下会放大体验波动。  
   社区反应：**0 条评论，0 👍**，属于性能和成本敏感型问题。

8. **[#33987] Windows 11 下 bun turbo typecheck 报错，导致无法发布分支到 fork**  
   链接：<https://github.com/anomalyco/opencode/issues/33987>  
   重要性：这是开发者构建链路问题，影响贡献者提交和分支发布，属于“社区协作效率”核心障碍。  
   社区反应：**1 条评论，0 👍**，对 Windows 贡献者尤其关键。

9. **[#33997] OpenAI-compatible provider 的 `tokens_cache_read` 始终为 0**  
   链接：<https://github.com/anomalyco/opencode/issues/33997>  
   重要性：这是已关闭问题，说明团队可能已修复或确认根因；它关联缓存统计、计费可见性和性能分析。  
   社区反应：**1 条评论，0 👍**，虽然已关闭，但属于重要的诊断类修复信号。

10. **[#34002] “AI 一直思考很久” 的用户感知卡顿问题**  
    链接：<https://github.com/anomalyco/opencode/issues/34002>  
    重要性：描述虽然简短，但反映出用户对响应时延和推理停滞的直接感受，属于最容易触发流失的体验问题。  
    社区反应：**1 条评论，0 👍**，建议后续补充复现条件与模型/上下文长度信息。

---

## 3) 重要 PR 进展

> 今日共有 17 条更新中的 PR，以下挑选 10 条最值得关注的进展。

1. **[#34013] fix(core): stateless 方式回放 OpenAI reasoning**  
   链接：<https://github.com/anomalyco/opencode/pull/34013>  
   说明：让 Core catalog 的 `@ai-sdk/openai` 模型通过 OpenAI provider facade 运行，继承无状态 Responses 默认行为，避免 reasoning 状态串扰。

2. **[#34012] feat(core): 支持 openai-compatible 转换器中的视频/音频/PDF**  
   链接：<https://github.com/anomalyco/opencode/pull/34012>  
   说明：补齐多模态附件支持，解决现有转换器只认 `image/*` 的限制，对 Gemini、MiMo 等多模态模型非常关键。

3. **[#34011] feat(session): 将媒体附件存到 transcript 历史之外**  
   链接：<https://github.com/anomalyco/opencode/pull/34011>  
   说明：避免 base64 大对象污染会话历史，降低数据库膨胀和重复上下文传输成本，属于性能与存储优化。

4. **[#34010] fix(core): 重试临时性的 response stream 错误**  
   链接：<https://github.com/anomalyco/opencode/pull/34010>  
   说明：增强流式请求的容错能力，针对生产环境中的 transient stream failure 做有限重试，提升稳定性。

5. **[#34009] fix(opencode): 保留 run 文件的媒体 MIME 类型**  
   链接：<https://github.com/anomalyco/opencode/pull/34009>  
   说明：修复 `opencode run --file video.mp4` 被误判为 `text/plain` 的问题，直接影响多模态输入可用性。

6. **[#34008] feat(sdk): 统一 session event stream**  
   链接：<https://github.com/anomalyco/opencode/pull/34008>  
   说明：将 Session 事件流升级为 durable/live SSE 统一流，适合 SDK 客户端消费，能显著简化接入复杂度。

7. **[#34007] feat(core): 发布被中断的 session step**  
   链接：<https://github.com/anomalyco/opencode/pull/34007>  
   说明：把“中断”从“失败”中拆出来建模，改善步骤生命周期语义，利于前端和宿主正确展示状态。

8. **[#33994] feat(app): 按 server 维度自动批准权限**  
   链接：<https://github.com/anomalyco/opencode/pull/33994>  
   说明：将 Desktop 的自动授权从 session/目录级改为 server 级，更适合长期运行和多会话场景。

9. **[#33991] feat(sdk): 暴露 active sessions**  
   链接：<https://github.com/anomalyco/opencode/pull/33991>  
   说明：新增 `client.sessions.active()`，方便 TUI 启动时判断当前会话活跃态，增强宿主同步能力。

10. **[#33996] fix(tui): 保留 renderer 初始化错误**  
    链接：<https://github.com/anomalyco/opencode/pull/33996>  
    说明：避免通用 fallback 掩盖真实初始化错误，有助于定位原生库加载失败等生命周期问题。

---

## 4) 功能需求趋势

从今天的 Issue 主题看，社区最关注的方向主要有：

- **权限与安全边界更精细**  
  读/写权限区分、自动批准策略、权限意图透明化，是近期明显的高频诉求。  
  相关：[#34014](https://github.com/anomalyco/opencode/issues/34014)、[#33994](https://github.com/anomalyco/opencode/pull/33994)

- **Session / Event 流的可靠性与可观测性**  
  大量需求集中在 durable event、终端失败事件、中断态、active session 暴露，说明大家在补强“可恢复、可追踪”的执行链路。  
  相关：[#34003](https://github.com/anomalyco/opencode/issues/34003)、[#34008](https://github.com/anomalyco/opencode/pull/34008)、[#34007](https://github.com/anomalyco/opencode/pull/34007)

- **OpenAI 兼容与自定义 Provider 生态**  
  无状态 Responses、兼容模型默认值、Anthropic-compatible custom provider 的 Desktop 工作流，说明多 Provider 支持正在成为主战场。  
  相关：[#33999](https://github.com/anomalyco/opencode/issues/33999)、[#34004](https://github.com/anomalyco/opencode/issues/34004)、[#34013](https://github.com/anomalyco/opencode/pull/34013)

- **多模态输入能力增强**  
  视频、音频、PDF、媒体 MIME 类型、媒体存储位置，表明 OpenCode 正在补齐“真正 AI IDE”需要的多模态链路。  
  相关：[#34012](https://github.com/anomalyco/opencode/pull/34012)、[#34011](https://github.com/anomalyco/opencode/pull/34011)、[#34009](https://github.com/anomalyco/opencode/pull/34009)

- **桌面端交互与工作区状态问题**  
  包括目录锁定、路径粘贴、renderer 初始化等，Desktop 体验稳定性依然是社区高频关注点。  
  相关：[#33995](https://github.com/anomalyco/opencode/issues/33995)、[#34006](https://github.com/anomalyco/opencode/issues/34006)、[#33996](https://github.com/anomalyco/opencode/pull/33996)

- **性能、缓存与成本可见性**  
  prompt cache、tokens_cache_read、超长思考时间等问题，说明用户对速度、缓存命中率和计费透明度非常敏感。  
  相关：[#33998](https://github.com/anomalyco/opencode/issues/33998)、[#33997](https://github.com/anomalyco/opencode/issues/33997)、[#34002](https://github.com/anomalyco/opencode/issues/34002)

- **Windows 兼容性与贡献链路**  
  构建报错、目录切换、终端行为差异显示出 Windows 仍是需要重点兼容的平台。  
  相关：[#33987](https://github.com/anomalyco/opencode/issues/33987)、[#33995](https://github.com/anomalyco/opencode/issues/33995)、[#34006](https://github.com/anomalyco/opencode/issues/34006)

---

## 5) 开发者关注点

今天的反馈里，开发者/贡献者的高频痛点主要是：

- **权限语义不够细**：希望明确“读/写/执行”或更细粒度的 intent，减少误授权。  
- **状态与事件不够稳**：Session 生命周期、中断、失败、活跃态等需要更强的事件模型支持。  
- **多模态输入链路不完整**：附件类型、MIME、存储位置、重复传输都在影响实际使用。  
- **Provider 兼容性复杂**：OpenAI、Anthropic-compatible、自定义 catalog、Responses 模式之间的默认行为差异容易引入隐性 bug。  
- **桌面端状态管理有瑕疵**：目录锁定、renderer 错误、粘贴行为一致性，都是影响日常体验的“高频小问题”。  
- **构建与跨平台支持仍需打磨**：Windows 下的 typecheck / publish 问题会直接降低社区贡献效率。  

---

如果你希望，我也可以把这份日报进一步整理成：
1. **适合公众号/邮件发布的精简版**，或  
2. **面向项目维护者的“优先级行动清单”版本**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

以下为 **2026-06-26 的 Pi 社区动态日报**，基于过去 24 小时内更新的 GitHub 数据整理。

---

## 1. 今日速览

今天社区讨论集中在 **AI Provider 扩展能力** 上：一条主线是将 **Friendli** 纳入内置 provider，另一条主线是希望为 provider 增加 **payload transform** 机制，以支持扩展对请求体的统一改写。  
从结果看，相关 Issue 和 PR 均已在当天关闭，说明这波需求已被快速响应，且社区对“更开放的 provider 接入与改造能力”关注度较高。

---

## 2. 社区热点 Issues

> 说明：过去 24 小时内仅有 **2 条 Issue 更新**，以下按重要性列出全部可见项。

### 1) #6091 — Add Friendli as a built-in provider
- **状态**：CLOSED
- **作者**：Lee-Si-Yoon
- **链接**：[GitHub Issue #6091](https://github.com/badlogic/pi-mono/issues/6091)
- **为什么重要**：  
  这是一个直接扩展 Pi 内置生态的请求，目标是把 **Friendli** 作为官方支持的 provider 引入，降低用户接入门槛。
- **社区反应**：  
  该 Issue 当天有 **2 条评论**，说明需求明确且沟通效率高；同时对应 PR 已同步提交并关闭，表明该方向获得快速落地。

### 2) #6089 — Register a payload transform on a provider
- **状态**：CLOSED
- **作者**：gotgenes
- **链接**：[GitHub Issue #6089](https://github.com/badlogic/pi-mono/issues/6089)
- **为什么重要**：  
  这是一个偏基础设施层的能力诉求：希望扩展能够为被覆盖的 provider 注册 **payload transform**，并在 Pi 的统一调度链路中生效。
- **社区反应**：  
  同样有 **2 条评论**，说明这是一个有实际开发痛点的需求，而不是纯概念提案。它反映出开发者希望 provider 系统具备更强的可插拔和中间件化能力。

---

## 3. 重要 PR 进展

> 说明：过去 24 小时内仅有 **1 条 PR 更新**，以下列出全部可见项。

### 1) #6090 — feat(ai): add Friendli provider
- **状态**：CLOSED
- **作者**：Lee-Si-Yoon
- **链接**：[GitHub PR #6090](https://github.com/badlogic/pi-mono/pull/6090)
- **功能/修复内容**：  
  新增 **Friendli** 作为内置 OpenAI-compatible provider，包含：
  - Endpoint：`https://api.friendli.ai/serverless/v1`
  - 认证：`FRIENDLI_API_KEY`
  - API 映射：`openai-completions`
  - 默认模型：`zai-org/GLM-5.2`
- **意义**：  
  这类 PR 体现出 Pi 对“**兼容 OpenAI 接口的第三方推理服务**”接入支持正在持续增强，有助于扩大可用模型与推理平台范围。

---

## 4. 功能需求趋势

结合当前可见 Issue，可提炼出以下几类社区关注方向：

1. **Provider 生态扩展**
   - 代表需求：新增 Friendli 内置 provider。
   - 说明：社区希望 Pi 能持续接入更多第三方推理服务，尤其是 OpenAI-compatible 服务。

2. **Provider 可定制性 / 扩展钩子**
   - 代表需求：为 provider 注册 payload transform。
   - 说明：开发者不满足于“能接入”，更希望“能改造、能插入逻辑、能统一处理请求体”。

3. **兼容性优先的接入模式**
   - 代表需求：OpenAI Chat Completions compatible。
   - 说明：社区更倾向于通过兼容层快速接入新模型提供方，而不是要求重写调用链。

4. **AI 调度链路的统一治理**
   - 代表需求：transform 需要在 Pi 自己的 dispatch 路径中生效。
   - 说明：大家关心的是“全链路一致性”，而不是仅在局部入口生效。

---

## 5. 开发者关注点

从本次反馈中可以看到，开发者的高频痛点主要集中在：

- **希望更容易接入新 provider**  
  不只是临时配置，而是成为“内置支持”，减少重复集成成本。

- **需要 provider 级别的请求改写能力**  
  例如 payload transform 这类机制，说明开发者需要在请求发送前统一加字段、改参数、做兼容处理。

- **关注兼容性与可维护性**  
  大家更偏好 OpenAI-compatible 的接入方式，因为它能显著降低适配成本。

- **希望扩展能力能覆盖所有调用路径**  
  这表明社区对“某个入口能用”不满意，更希望底层 dispatch 逻辑能保证一致行为。

---

如果你希望，我还可以把这份日报进一步整理成：
1. **适合发群的精简版**，或  
2. **适合内部周报/晨报的标准模板版**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-06-26）

## 1) 今日速览
今天社区更新量不大，但信号很集中：一边是 **CI / 发布稳定性** 问题继续被优先修复，另一边则是 **Plan 模式交互** 和 **Web Shell / IDE 体验统一** 的产品化讨论升温。  
同时，`/mcp` 资源浏览能力继续向 Web Shell 迁移，说明 Qwen Code 正在围绕 **跨端一致性** 和 **工具链可用性** 做持续打磨。

---

## 2) 社区热点 Issues
> 说明：本日仅有 3 条更新 Issues，以下覆盖全部条目。

1. **[#5882](https://github.com/QwenLM/qwen-code/issues/5882) - Qwen agent CI jobs run un-isolated on the shared ECS runner → cross-PR state contamination**  
   - **为什么重要**：这是典型的 **CI 隔离性 / 安全性** 问题，且已出现跨 PR 污染，直接影响 triage 可信度和自动化流程稳定性。  
   - **社区反应**：标记为 `priority/P1`、`status/needs-triage`、`type/bug`、`category/security`，说明问题被视为高优先级；当前有 **2 条评论**，说明已有一定讨论热度。  
   - **关注点**：共享 ECS runner 的隔离策略、CI 作业上下文污染、自动评论误投递风险。  

2. **[#5881](https://github.com/QwenLM/qwen-code/issues/5881) - proposal: open Plan Approval Gate to all plan mode entries, not just model-initiated ones**  
   - **为什么重要**：涉及 **Plan 模式审批门槛** 的适用范围，关系到 AUTO/YOLO 场景下的执行安全与工作流一致性。  
   - **社区反应**：带有 `coding-plan`、`need-discussion`，且已有 **3 条评论**，表明这是一个会影响核心交互路径的设计讨论。  
   - **关注点**：是否将 Plan Approval Gate 扩展到所有进入 plan mode 的入口，而不仅限于模型主动触发的情况。  

3. **[#5883](https://github.com/QwenLM/qwen-code/issues/5883) - Proposal: Consolidate the chat panel onto web-shell across web-shell, VSCode webview, and desktop**  
   - **为什么重要**：这是明显的 **跨端 UI 架构统一** 诉求，目标是让 Web Shell、VSCode Webview 和 Desktop 的聊天面板体验一致。  
   - **社区反应**：标记 `type/feature-request`、`category/ui`、`scope/components`、`scope/rendering`，当前有 **1 条评论**，说明属于中期产品方向讨论。  
   - **关注点**：消息流、输入框、组件复用与渲染架构是否统一到 `packages/web-shell`。  

---

## 3) 重要 PR 进展
> 说明：本日仅有 3 条更新 PR，以下覆盖全部条目。

1. **[#5880](https://github.com/QwenLM/qwen-code/pull/5880) - fix(test): raise timeout for cold-import suites to stop CI flake**  
   - **内容**：把两个冷启动导入很重的 `packages/core` 测试套件超时从 5s 提高到 30s。  
   - **意义**：这是典型的 **CI 抖动治理**，优先解决“测试本身正确但在 CI 环境下误判超时”的问题。  
   - **价值**：能直接减少合并队列和持续集成中的误报，提升开发效率。  

2. **[#5879](https://github.com/QwenLM/qwen-code/pull/5879) - feat(web-shell): browse MCP server resources in the /mcp dialog**  
   - **内容**：为 Web Shell 的 `/mcp` 对话框补齐 MCP Server 资源浏览能力，与 TUI 版本对齐。  
   - **意义**：这是 **Web Shell 功能补齐** 的关键一步，增强 MCP 可见性与可操作性。  
   - **价值**：让用户在 Web 端也能浏览 server 的 resources 和 prompts，提升跨端一致体验。  

3. **[#5878](https://github.com/QwenLM/qwen-code/pull/5878) - fix(release): skip dist/node_modules when building standalone archives**  
   - **内容**：独立安装包构建时忽略 `dist/node_modules`，避免因意外资产导致打包中断。  
   - **意义**：这是 **发布链路稳定性** 修复，属于高频但容易被忽视的构建兼容问题。  
   - **状态提示**：该 PR 已 **CLOSED**，说明问题已处理完毕或方案已落地。  

---

## 4) 功能需求趋势
从今天的 Issues 可以看出，社区关注点主要集中在以下方向：

1. **交互安全与工作流控制**  
   - Plan 模式审批门槛是否应覆盖所有入口，是当前讨论焦点。  
   - 反映出用户希望在自动化代理场景下保留更强的执行把关能力。  
   - 相关链接：[#5881](https://github.com/QwenLM/qwen-code/issues/5881)

2. **CI / 发布 / 构建稳定性**  
   - 从 runner 隔离问题、测试超时调整、到发布打包忽略异常目录，都指向同一主题：**让工程链路更稳**。  
   - 相关链接：[#5882](https://github.com/QwenLM/qwen-code/issues/5882)、[#5880](https://github.com/QwenLM/qwen-code/pull/5880)、[#5878](https://github.com/QwenLM/qwen-code/pull/5878)

3. **跨端 UI 一致性**  
   - 社区正在推动 Web Shell、VSCode Webview、Desktop 三端体验统一。  
   - 这类需求通常意味着后续会继续出现组件复用、渲染层抽象、交互一致性相关提案。  
   - 相关链接：[#5883](https://github.com/QwenLM/qwen-code/issues/5883)、[#5879](https://github.com/QwenLM/qwen-code/pull/5879)

4. **MCP 可视化能力增强**  
   - `/mcp` 中浏览资源和 prompts 的需求很明确，说明用户不满足于“能用”，更希望“可发现、可管理”。  
   - 相关链接：[#5879](https://github.com/QwenLM/qwen-code/pull/5879)

---

## 5) 开发者关注点
今天的开发者反馈，主要暴露出以下几类痛点：

- **共享 CI 资源缺乏隔离**：跨 PR 状态污染会直接破坏自动化判断，属于优先级极高的问题。  
  - 相关链接：[#5882](https://github.com/QwenLM/qwen-code/issues/5882)

- **测试环境与本地环境存在时序差异**：冷启动依赖图较大的测试在 CI 中更容易超时，说明需要更合理的超时策略或测试拆分。  
  - 相关链接：[#5880](https://github.com/QwenLM/qwen-code/pull/5880)

- **发布流程对异常目录更敏感**：打包脚本对 `dist/node_modules` 的处理暴露出构建系统在“脏目录”场景下的鲁棒性不足。  
  - 相关链接：[#5878](https://github.com/QwenLM/qwen-code/pull/5878)

- **跨端产品体验仍在收敛**：Web Shell、TUI、Desktop/VSCode Webview 之间仍有功能差异，社区倾向于推动统一架构。  
  - 相关链接：[#5883](https://github.com/QwenLM/qwen-code/issues/5883)、[#5879](https://github.com/QwenLM/qwen-code/pull/5879)

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **更适合公众号/周报风格的版本**，或  
2. **更适合团队晨会的 1 分钟简报版**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# 2026-06-26 DeepSeek TUI 社区动态日报

## 1) 今日速览
- 过去 24 小时内，仓库没有 Release 和 Issues 更新，但 PR 端非常活跃，共出现 16 个更新，说明当前社区重心集中在功能合并、回归修复和体验打磨上。  
- 今日最核心的主题是 **TUI 输入体验（IME/光标/提示词行）**、**审批流程安全性**、以及 **exec 元数据与提示词优化**，整体呈现出“高频小修 + 关键可用性补强”的节奏。  

## 2) 版本发布
- 今日无新 Release。

## 3) 社区热点 Issues
- **今日无 Issues 更新（0 条）**，因此本节暂无可选热点条目。  
- 从当前数据看，社区讨论更多转移到了 PR 中的具体修复与功能补强上。  

## 4) 重要 PR 进展
1. **#3635 fix(tui): keep empty composer hint off cursor row**  
   解决空输入框提示词与终端 IME 预编辑文本的光标冲突问题，把 hint 下移，减少输入时的视觉干扰。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3635>

2. **#3634 [codex] keep empty composer hint off IME cursor row**  
   与 #3635 同类问题，聚焦“空 composer 行不占用 IME 光标行”，属于输入法兼容性修复。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3634>

3. **#3633 fix(release): gate registry publish on fresh assets**  
   强化发布校验，避免过期或不一致的构建产物误发布，对供应链和版本可信度很关键。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3633>

4. **#3632 feat(tui): save apply_patch ask rules from validated touched files**  
   改进 `apply_patch` 的规则保存逻辑，仅在文件路径经过验证后才持久化，降低误写规则和越界路径风险。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3632>

5. **#3631 test(tui): lock approval key badges**  
   用测试锁定审批弹窗中的按键徽标展示，防止交互提示在后续改动中退化。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3631>

6. **#3630 fix(tui): count skipped approval preview files**  
   修复审批预览中“被跳过文件”的计数遗漏问题，避免用户误判实际变更规模。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3630>

7. **#3629 perf(prompt): slim default static prompt**  
   压缩默认静态提示词内容，目标是减少上下文冗余并提升启动/构造效率。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3629>

8. **#3628 feat(exec): report prompt input composition**  
   为 `exec --output-format stream-json` 增加输入构成分析，提升对 token 消耗和请求结构的可观测性。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3628>

9. **#3627 feat(exec): report visible final answer size**  
   增加可见最终答案字符数统计，有助于评估输出长度与模型输出 token 的关系。  
   链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3627>

10. **#3626 test(tui): cover stale single-agent status reconciliation**  
    补充陈旧 sub-agent 状态回收的测试，避免“已过期但仍显示 running”的状态漂移。  
    链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3626>

## 5) 功能需求趋势
- **TUI 输入体验与 IME 兼容性持续被重视**：空 composer、光标行、鼠标坐标等细节在集中修复，说明终端输入场景仍是核心痛点。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3635>

- **审批流更强调安全与可解释性**：围绕 apply_patch、审批预览、按键徽标、跳过文件计数的改动密集出现，反映社区希望“看得懂、审得准、少误判”。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3632>

- **exec/stream-json 的可观测性需求上升**：输入构成、可见答案长度等元数据被补齐，说明开发者越来越关注调用成本、输出质量与调试能力。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3628>

- **提示词工程在向“更短、更稳、更可维护”演进**：默认静态 prompt 被压缩，表明项目在控制上下文体积和保持行为一致性之间做平衡。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3629>

- **子代理/状态一致性是高频治理方向**：围绕 stale agent cleanup、状态投影、模式元数据的修复较集中，说明多代理场景下的状态漂移问题仍需持续打磨。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3620>

- **扩展性诉求正在外溢到 LSP 与文档链接层**：从自定义 LSP server 到 provider docs fallback，社区开始要求“默认可用 + 可配置扩展 + 文档不走错路”。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3624>

## 6) 开发者关注点
- **输入法与光标竞争问题**：TUI 中的 IME preedit、空输入行、提示词占位需要更精细的布局控制，否则会直接影响可用性。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3634>

- **审批交互的误导成本**：预览文件数、跳过项、按键提示都在被反复校正，说明审批链路必须做到“少歧义、可预期”。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3630>

- **状态清理必须前置**：陈旧 sub-agent 若不及时回收，会污染后续 turn 的结构化状态和可见状态，属于高优先级一致性问题。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3620>

- **发布流程需要防错**：registry publish 之前校验资产新鲜度，反映出开发者对“构建正确但发布错误”的风险高度敏感。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3633>

- **配置容错与显式告警很重要**：对未知 `CODEWHALE_TOOL_SURFACE` 的提示避免了“拼错参数却悄悄生效”的隐患。  
  链接：<https://github.com/Hmbown/DeepSeek-TUI/pull/3625>

如需，我可以把这份日报进一步整理成：
- **适合公众号/飞书发布的简版**
- **适合团队周会汇报的 PPT 提纲版**
- **按“功能 / 修复 / 测试 / 发布”四类重排的分析版**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*