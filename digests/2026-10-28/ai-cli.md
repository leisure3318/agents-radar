# AI CLI 工具社区动态日报 2026-10-28

> 生成时间: 2026-10-28 02:34 UTC | 覆盖工具: 9 个

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

# AI CLI 工具生态横向分析报告
**2026-10-28｜基于所提供的过去 24 小时社区快照**

> **统计口径：**“活跃度”指窗口内更新的记录，不等于新增数量；Issue 是用户反馈，不代表已确认缺陷；PR 的 `CLOSED` 不等于已合并。各项目样本完整度不同，以下不以局部条目数进行严格排名。

## 1. 生态全景

AI CLI 正从终端内的代码助手，向覆盖桌面、IDE、浏览器、远程运行时和多 Agent 协作的开发平台演进。新增能力主要集中在多 Provider 接入、插件扩展、托管执行与多会话管理，但社区关注点更集中于**稳定执行、会话恢复、成本透明和权限可解释性**。随着入口和协议增加，“配置已声明、实际能力却不可用”成为多个工具共同面临的问题。当前竞争不仅是模型能力之争，更是**长任务可靠性、集成一致性与可治理性之争**。

## 2. 各工具活跃度对比

| 工具 | Issues 更新数 | PR 更新数 | Release 情况 | 本期主要信号 |
|---|---:|---:|---|---|
| **Claude Code** | **50**，展示 30 | **0** | **1 个**：v2.1.312 | 企业 OIDC、交互优化；Windows 执行、认证与缓存成本反馈 |
| **OpenAI Codex** | **50**，仅展示部分 | 总数未提供；重点列出 10 项 | **5 个**：0.165.0 + 4 个 Alpha | Vertex AI、多会话导航；执行器独立化与诊断建设 |
| **Gemini CLI** | **4** | 总数未提供；重点列出 10 项，另提及其他 PR | **3 个**：正式版、Preview、Nightly | 取消语义、文本保真、扩展校验与路径安全 |
| **GitHub Copilot CLI** | **10** | **0** | **3 个**：v1.0.105 及两个后缀版本 | 长上下文模型切换修复；ACP、输入保护与会话稳定性 |
| **Kimi Code CLI** | **0** | **0** | 无 | 窗口内无活动 |
| **OpenCode** | **50**，展示部分 | **50**，展示部分 | **1 个**：v2.2.0 | 实验性 Desktop 插件；升级连续性与跨环境可靠性 |
| **Pi** | **24** | **18** | 无 | 会话持久化、摘要缓存、工具描述预算与扩展语义 |
| **Qwen Code** | 总数未提供；重点列出 10 项，另提及其他 Issue | 总数未提供；重点列出 10 项 | **4 个**：正式版、2 个预览版、TypeScript SDK | Managed Agent、worktree、Java 嵌入；发布链路与多 Agent 通信 |
| **DeepSeek TUI／Codewhale** | **9** | **15** | 无 | 本地 Ollama、多入口配置一致性与会话保存 |

**数据解读：**

- 在总量明确的项目中，**OpenCode 的双向活动最突出：50 条 Issue、50 条 PR 更新**；Claude Code、Codex 同样各有 50 条 Issue 更新。
- **Codex 发布条目最多，但其中 4 个是 Alpha**；发布条目数不能等同于独立功能增量。
- Pi 与 DeepSeek TUI／Codewhale 虽无新版本，但分别有 **18、15 条 PR 更新**，说明无 Release 不等于研发停滞。
- Pi、DeepSeek TUI 的来源仓库名称与条目链接存在差异，后续自动化追踪应先核验仓库映射。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与横向判断 |
|---|---|---|
| **长会话连续性与数据保护** | Claude Code、Codex、Copilot CLI、OpenCode、Pi、Qwen Code、DeepSeek TUI | 压缩后保留任务、恢复后工具可用、历史会话可见、持久化失败不破坏状态、提交失败不丢输入。可靠恢复正在成为基础能力。 |
| **上下文与成本控制** | Claude Code、Codex、Pi、OpenCode、Gemini CLI、DeepSeek TUI | 缓存重复写入、反复压缩消耗额度、摘要无法复用前缀、工具 schema 膨胀、计价遗漏及上下文预算不准确。优化对象已从模型单价扩展到整个执行过程。 |
| **多 Agent 控制与可观测性** | Claude Code、Codex、Qwen Code、Pi、DeepSeek TUI | 子代理配置作用域、委派后继续执行、完成通知送达、取消传播、worker 启动与任务状态同步。重点从“能启动多个 Agent”转向“协作状态可信”。 |
| **跨入口与协议一致性** | Copilot CLI、OpenCode、Qwen Code、Claude Code、DeepSeek TUI | ACP 命令可发现但不可执行、切换失败后状态漂移、插件未加载、无头模式不继承交互配置。协议连接成功不等于功能完整。 |
| **权限、安全与错误解释** | Claude Code、Codex、Gemini CLI、OpenCode、Qwen Code | 策略拒绝缺少可操作原因、凭据与计费归属不透明、路径边界检查、MCP 错误误报、CI 密钥隔离审查。需要提升可诊断性，而不是简单放宽权限。 |
| **插件与扩展生态** | OpenCode、Claude Code、Gemini CLI、Copilot CLI、Pi | 桌面扩展点、项目级插件加载、扩展校验与分发、Skills 发现、工具描述预算及完整 API 文档。生态竞争正在深入生命周期管理。 |

其中，两组较明确的跨项目需求值得关注：

- **Gemini CLI 与 Copilot CLI 均提出工具调用 ID 需求**，说明 Hooks 正被用于审计、日志关联和自动化集成。
- **Gemini CLI 与 Pi 均涉及取消传播问题**，反映 Agent 的“停止”需要覆盖异步子任务及文件写入等副作用，而不仅是停止输出。

## 4. 差异化定位分析

*以下为本期动态反映的侧重点，不代表产品全部能力或官方定位。*

| 工具 | 功能侧重与技术路线 | 更匹配的用户及验证重点 |
|---|---|---|
| **Claude Code** | 企业身份、云平台认证、插件及终端／桌面协同 | 企业开发团队与既有 Claude 工作流用户；重点核验凭据优先级、计费路径和环境就绪状态 |
| **Codex** | 多 Provider、多会话、多 Agent；执行器独立化与诊断基础设施 | 多仓库团队及平台集成者；关注长任务恢复、执行链路完整性和 Windows 沙箱 |
| **Gemini CLI** | Hooks、扩展工具链及底层文本、路径、取消语义正确性 | 扩展作者和自动化开发者；关注配置生效、内容保真及扩展分发 |
| **Copilot CLI** | 模型切换、Plan→Implementation 工作流和 ACP 客户端集成 | GitHub 工作流用户及 ACP 集成者；重点验证模型、命令和事件语义的端到端兼容 |
| **Kimi Code CLI** | 本窗口无新信号 | 无法据此判断定位变化或迭代阶段 |
| **OpenCode** | 实验性 Desktop 插件、GUI 扩展、多 Provider 与自托管适配 | 桌面插件作者、界面定制和自托管用户；需评估实验 API 与 v2 升级风险 |
| **Pi** | 工具描述预算、摘要请求构造、扩展 API 与会话存储语义 | 深度定制、成本敏感的开发者；关注上下文效率及异常恢复边界 |
| **Qwen Code** | Managed Agent、独立 worktree、daemon、Java／Spring 宿主嵌入 | 企业平台、托管 Agent 与 JVM 集成团队；关注运行时隔离、消息投递和发布完整性 |
| **DeepSeek TUI／Codewhale** | 本地 Ollama、TUI／桌面／无头执行和 Fleet | 本地模型、离线环境及终端用户；应验证模型类型识别、上下文预算和入口一致性 |

## 5. 社区热度与成熟度

### 活跃度：OpenCode 最明确，其他项目需结合披露范围判断

- **OpenCode** 同时具有较高 Issue 与 PR 活动，并在 v2.2.0 推出实验性插件能力，是本期最清晰的快速扩张信号。
- **Claude Code、Codex** 的反馈覆盖面较广，涉及操作系统、认证、成本、执行和多会话；但不能仅凭问题数量推断用户规模或质量高低。
- **Qwen Code** 在正式版、预览版和 SDK 多线推进，且涉及托管运行时、Java 嵌入和 CI，体现较高工程并行度。
- **Pi、Gemini CLI、DeepSeek TUI／Codewhale** 的可见工作更偏底层正确性、兼容性和可靠性维护。

### 热度：多数仍是早期信号，而非社区共识

本期多数 Issue 为 **0 👍、0–4 条评论**；例如 Copilot CLI 最多评论的有效反馈为 3 条，Pi 重点问题最多为 4 条。因此，更适合按**影响严重度、复现状态与跨项目重复出现的主题**判断价值，而不是称其为大范围热点。

### 成熟度：应看异常路径，而不是只看发布频率

Codex 的执行器拆分与诊断建设、Gemini CLI 的取消与路径检查、Pi 的持久化一致性修复，都体现工程深化。与此同时，实验性插件、多 Agent、托管运行时仍在扩张阶段；已发布版本也持续收到恢复、状态同步和输入保护反馈。**单日快照不足以给工具做整体成熟度排名，更合理的是按具体工作流评估。**

## 6. 值得关注的趋势信号

### ① 评估单位正在从“单次回答”转向“完整任务”
首轮成功不代表第二轮可用，模型可选不代表计划能实施，子代理返回不代表协调者会继续执行。

**开发者参考：**选型测试应覆盖启动、执行、压缩、中断、恢复、结果保存的完整生命周期，而不只测试代码生成质量。

### ② 上下文管理正在成为独立的成本工程
缓存前缀、摘要请求、工具 schema、历史图片和后台记忆整合，都可能影响成本与延迟。

**开发者参考：**建议跟踪“成功任务总成本”、重复压缩次数、缓存读写、无进展轮次，而不是只比较 Token 单价。现有快照不足以直接比较各工具的实际成本高低。

### ③ ACP、Hooks、MCP 的竞争进入语义一致性阶段
当前问题往往不是连接失败，而是能力发现不准确、重试内容混杂、状态切换不同步或事件缺少关联 ID。

**开发者参考：**平台集成应建立协议契约测试，覆盖失败、重试、取消和重连；不要默认 CLI、桌面、IDE 与 ACP 模式完全等价。

### ④ Agent 正从个人工具变成可嵌入的执行基础设施
Codex 独立执行器、Qwen Code 的 worktree 与 JVM 嵌入，以及多项目的 daemon、远程控制能力，均指向可编程运行时。

**技术决策参考：**除模型能力外，应评估隔离、身份、资源回收、审计、版本兼容与宿主系统集成成本。

### ⑤ 可信执行将成为比功能数量更重要的采购指标
会话写入失败、取消后仍可能发生副作用、拒绝后重放旧答案，以及项目外文件删除的未验证报告，都提示必须关注失效时的行为边界。

**技术决策参考：**生产部署应默认采用最小权限、版本控制或快照、执行预算与可回滚升级。对高风险报告优先核查，但不能把单条反馈当作已确认的普遍缺陷。

---

**综合结论：**本期最鲜明的变化，是 AI CLI 从“能力扩张”进入“能力扩张与可靠性补强并行”的阶段。团队选型宜围绕三项指标建立验收：**完整任务成功率、失败后的可恢复性、可解释的实际成本**；插件数量、模型目录和发布频率则作为辅助指标。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-10-28｜基于所提供的 20 条 PR 与 15 条 Issue**

> **口径说明：**PR 评论数均为 `undefined`、👍 均为 0，因此无法验证其真实热度排名，也无法确认哪些 PR“评论活跃”。以下以**相关 Issue 的讨论量、问题影响范围及近期更新情况**作为关注度参考，不将列表顺序视为热度证据。所展示 PR 均标记为 **OPEN**，没有已合并或 Draft 的明确信息。

## 1. 热门 Skills 排行：7 个重点关注 PR

以下是**关注优先级排序，而非可验证的评论榜**；“讨论热点”来自 PR 摘要及相关 Issue，不代表已读取 PR 评论。

| 优先级 | Skill / PR | 功能与社区关注点 | 当前状态 |
|---|---|---|---|
| 1 | **skill-creator：触发评测可靠性** — [PR #1298](https://github.com/anthropics/skills/pull/1298) | 修复评测隔离、Windows 子进程处理和运行时失败计分，避免错误结果误导描述优化。相关 [Issue #556](https://github.com/anthropics/skills/issues/556) 有 **13 评论、7 👍**，反映“Skill 是否真正被触发”是突出痛点；但不能据此认定该 PR 已覆盖其全部根因。 | **OPEN**；9 月 16 日更新 |
| 2 | **mcp-builder：MCP 2.x 兼容** — [PR #1742](https://github.com/anthropics/skills/pull/1742) | 适配 `streamable_http_client` 更名及自定义请求头配置方式。重点是生成的 MCP 工作流能否跟上 SDK 升级；该 Skill 另有[评测始终为 0/N 的反馈 #1390](https://github.com/anthropics/skills/issues/1390)，说明兼容性与评测可信度均需关注，两者并非同一问题。 | **OPEN**；10 月 8 日更新 |
| 3 | **webapp-testing：命令执行安全** — [PR #1980](https://github.com/anthropics/skills/pull/1980) | 调整测试服务器启动方式，避免通过 `shell=True` 执行未经净化的用户或 Agent 命令。核心热点是**测试自动化的命令注入风险与权限边界**。 | **OPEN**；10 月 25 日更新 |
| 4 | **docx：修订接受与结果验证** — [PR #1792](https://github.com/anthropics/skills/pull/1792) | 将 LibreOffice 超时明确报告为失败，并检查输出是否仍含修订标记。结合 [Issue #2018](https://github.com/anthropics/skills/issues/2018) 的无效 XML 反馈，文档工具的关注点已深入到**输出完整性和成功判定**。 | **OPEN**；9 月 25 日更新 |
| 5 | **Notion 规格转实施任务** — [PR #1245](https://github.com/anthropics/skills/pull/1245) | 将产品或技术规格拆解为 Notion 任务、验收标准和进度跟踪，连接需求文档与 Claude Code 实施。值得关注的是**规格→计划→执行的工作流闭环**；同一 PR 还包含简历审计 Skill，不能将全部关注归给 Notion 功能。 | **OPEN**；10 月 15 日更新 |
| 6 | **md2video-audio：文档转视频** — [PR #1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经 Marp 转成幻灯片，再生成带配音的 MP4，拓展内容生产自动化。关注点是多工具编排；“零成本”“专业级”等为提交者描述，尚无数据验证。 | **OPEN**；9 月 15 日更新 |
| 7 | **Pyxel：复古游戏开发** — [PR #525](https://github.com/anthropics/skills/pull/525) | 覆盖 Python 游戏创建、调试、无头输入运行、画面检查和状态验证。亮点是将**生成代码与运行验证**结合；3 月提交、10 月仍有更新，但长期开放不意味着即将合并。 | **OPEN**；10 月 23 日更新 |

## 2. 社区需求趋势

### ① 安全可信与治理：讨论最集中的议题
[Issue #492](https://github.com/anthropics/skills/issues/492) 以 **46 评论、3 👍**居所给 Issue 首位，关注社区 Skill 使用 `anthropic/` 命名空间造成的官方身份混淆与信任边界问题。另有 [agent-governance 提案 #412](https://github.com/anthropics/skills/issues/412)，涉及策略执行、威胁检测和审计。

**需求判断：**社区需要的不只是安全类新 Skill，更是来源标识、权限边界与治理机制。#412 已关闭，不能据此判断相关能力已交付。

### ② 企业级共享与分发：最明确的协作需求
[Issue #228](https://github.com/anthropics/skills/issues/228) 获 **17 评论、8 👍**，要求组织内共享 Skill 库或直接分享链接，替代下载、聊天工具转发、逐人上传。

**需求判断：**Skills 正从个人工具转向团队资产；这是 Claude.ai 侧的分发诉求，不宜直接视为 Claude Code 已有功能。

### ③ 可验证的 Agent 工作流：从“能执行”转向“能证明执行正确”
[Issue #556](https://github.com/anthropics/skills/issues/556) 指向触发评测失效；[质量门禁提案 #1385](https://github.com/anthropics/skills/issues/1385) 则提出任务前校准、对抗审查、交付验证三阶段流程。

**需求判断：**可靠评测、自审和交付检查比单纯增加生成能力更受关注；现有样本不足以认定“测试生成”或“代码审查”本身已成为独立热门方向。

### ④ 长任务记忆与上下文效率
[compact-memory 提案 #1329](https://github.com/anthropics/skills/issues/1329) 有 **10 评论**，探索用紧凑符号保存 Agent 状态；[Issue #1487](https://github.com/anthropics/skills/issues/1487) 报告 `claude-api` 一次注入约 156k tokens；[Issue #189](https://github.com/anthropics/skills/issues/189) 反映重复安装导致重复 Skill，并获 **9 👍**。

**需求判断：**紧凑记忆、按需加载和去重，是长流程可持续运行的重要方向。

### ⑤ 文档质量与准确触发：先把现有能力做可靠
[DOCX XML 问题 #2018](https://github.com/anthropics/skills/issues/2018) 强调输出有效性；[theme-factory 描述问题 #2064](https://github.com/anthropics/skills/issues/2064) 指出 Skill 描述应说明“何时使用”，而不只是“能做什么”。

**需求判断：**社区正在同时要求**更可靠的产物**与**更准确的能力发现和触发**。

## 3. 高潜力待合并 Skills / 改进

**无法确认“评论活跃”或预测近期合并。**以下是按近期更新、问题边界清晰度及基础设施价值筛出的观察名单，不是合并概率榜。

| PR | 值得跟踪的原因 | 待确认事项 |
|---|---|---|
| [#1980 · webapp-testing 安全修复](https://github.com/anthropics/skills/pull/1980) | 10 月 25 日更新，处理 Agent 执行链中的命令注入风险，影响面较广。 | 移除 shell 后，原有命令链与启动方式能否兼容。 |
| [#1681 · skill-creator 打包脚本修复](https://github.com/anthropics/skills/pull/1681) | 10 月 24 日更新，修复直接运行 `package_skill.py` 的导入失败，直接改善贡献者交付流程。 | 直接执行与包内调用路径是否均有回归验证。 |
| [#1997 · skill-creator YAML 解析修复](https://github.com/anthropics/skills/pull/1997) | 10 月 19 日更新，减少元数据解析偏差对评测与描述优化的干扰。 | 引号、转义和多行标量等边界场景是否覆盖完整。 |
| [#1975 · pptx 参数校验](https://github.com/anthropics/skills/pull/1975) | 10 月 27 日更新，将非法 `--cols` 参数提前拦截，避免渲染后才出现无关错误；范围较明确。 | 仍需维护者审查，不能因改动较小就推断即将合并。 |
| [#1245 · Notion 规格转实施](https://github.com/anthropics/skills/pull/1245) | 若聚焦新增 Skill，这是值得关注的需求到实施工作流扩展，且 10 月仍有更新。 | 一个 PR 包含两个不同领域 Skill，需观察是否拆分及如何验收。 |

## 4. Skills 生态洞察

**当前社区最集中的诉求，是让 Skills 从“可用的能力集合”升级为“来源可信、触发准确、执行可验证、能够团队复用的生产级工作流”。**——主要信号来自[信任边界 #492](https://github.com/anthropics/skills/issues/492)、[组织共享 #228](https://github.com/anthropics/skills/issues/228)与[触发评测 #556](https://github.com/anthropics/skills/issues/556)。

---

# Claude Code 社区动态日报｜2026-10-28

> 数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)。过去 24 小时有 1 个版本发布、50 条 Issue 更新（提供其中 30 条）、0 条 PR 更新。以下分析基于所提供的数据；Issue 中的问题为用户反馈，不代表官方已确认。

## 1. 今日速览

Claude Code 发布 **v2.1.312**，新增企业网关 OIDC 用户标识配置，并优化全屏模式下排队消息的即时发送交互。社区值得优先关注的是 **Windows 更新与 Bash 执行异常、认证及计费归属、提示缓存重复写入**；安全过滤误拦截也出现多条报告。当前讨论量较低，尚不能将这些反馈视为已被广泛验证的问题。

## 2. 版本发布

### [v2.1.312](https://github.com/anthropics/claude-code/releases/tag/v2.1.312)

- **OIDC 用户标识可配置**：Claude apps gateway 新增 `oidc.user_id_claim`，支持使用 ID Token 中 `sub` 以外的声明识别用户，例如 Microsoft Entra ID 的 `oid`。这为企业身份系统对接提供了更灵活的标识映射。
- **排队消息支持点击立即发送**：全屏模式下，点击排队消息下方的 “to send now” 提示即可立即发送，与对应快捷键效果一致。

**注意**：所提供的发布说明未列出下述社区问题的修复，不能据此判断升级后已解决。

## 3. 社区热点 Issues：10 项重点关注

> 所列 Issue 最高仅有 1 条评论。这里按潜在影响与开发相关性筛选，而非按热度排名。

| Issue | 主要反馈与重要性 | 社区反应与状态 |
|---|---|---|
| [#105554 Windows 自动更新中断后可执行文件丢失](https://github.com/anthropics/claude-code/issues/105554) | 用户报告原生更新在文件替换阶段中断后，`claude.exe` 丢失且未回滚。若复现，将直接影响工具可用性和更新恢复能力。 | **OPEN**；0 评论、0 👍，尚缺进一步验证。 |
| [#105551 Windows Bash 调用等待 10–17 分钟以上](https://github.com/anthropics/claude-code/issues/105551) | 用户称升级至 Claude Code 2.1.309 后，Desktop Code 会话在 Shell 进程启动前长时间停滞。对依赖命令执行的工作流影响显著。 | **OPEN**；标记 `has repro`、`regression`；0 评论、0 👍。 |
| [#105540 环境变量 API Key 导致计费归属变化](https://github.com/anthropics/claude-code/issues/105540) | 用户称已登录订阅账号，但为另一应用设置的 `ANTHROPIC_API_KEY` 被 Claude Code 使用并产生 API 计费。涉及凭据优先级透明度和费用可预期性。 | **OPEN**；标记 `has repro`；0 评论、0 👍。 |
| [#105564 新会话第二轮重复写入约 17k Token 缓存](https://github.com/anthropics/claude-code/issues/105564) | 用户报告第二轮会重复写入未变化的会话起始上下文，第三轮起恢复增量写入。若属实，频繁启动会话的使用方式可能承担额外缓存写入成本。 | **OPEN**；0 评论、0 👍，尚无官方确认。 |
| [#105561 安全过滤拦截只读盘点及常规回复](https://github.com/anthropics/claude-code/issues/105561) | 用户报告其负责系统的只读盘点及后续常规回复被阻止。此类反馈关系到安全边界与合法运维任务之间的平衡。 | **OPEN**；1 评论、0 👍。另有类似报告，见下文趋势分析。 |
| [#105563 Remote Control 断连后未恢复](https://github.com/anthropics/claude-code/issues/105563) | macOS Desktop 用户报告传输在 `4090 conflict` 后失效，自动更新重启后仍不可用，但会话继续显示“on”。无人值守远程开发尤其依赖连接恢复和状态准确性。 | **CLOSED**；1 评论、0 👍。摘要未给出关闭原因，不能等同于已修复。 |
| [#105542 Bedrock 请求使用已过期凭据](https://github.com/anthropics/claude-code/issues/105542) | 用户报告 `awsCredentialExport` 正在后台刷新时，请求仍携带过期凭据发出。涉及短期凭据轮换时的请求可靠性。 | **OPEN**；0 评论、0 👍。 |
| [#105549 项目声明的插件未加载或安装](https://github.com/anthropics/claude-code/issues/105549) | 用户称，仅在项目 `.claude/settings.json` 的 `enabledPlugins` 中启用插件，无法触发加载或安装，包括无头模式。影响项目环境复现和自动化部署。 | **OPEN**；标记 `has repro`；0 评论、0 👍。 |
| [#105547 Chrome 工具未注册](https://github.com/anthropics/claude-code/issues/105547) | macOS + Dia 环境中，用户报告 2.1.311/2.1.312 无法发现 `claude-in-chrome` 工具，且 `/chrome` 未被识别。依赖浏览器操作的工作流需关注兼容性。 | **OPEN**；0 评论、0 👍；报告环境较具体，不宜推广为普遍故障。 |
| [#105520 SSH 图片粘贴支持](https://github.com/anthropics/claude-code/issues/105520) | 请求通过 kitty 剪贴板协议 OSC 5522 支持 SSH 场景下粘贴图片，并提及 Ghostty 1.4 与 kitty。体现远程终端对多模态输入的需求。 | **OPEN**；1 评论、0 👍，仍处于需求讨论阶段。 |

## 4. 重要 PR 进展

**过去 24 小时内没有更新的 PR，无法列出 10 项重要进展。** 现有数据也不足以判断上述 Issue 是否已有对应修复提交。

跟踪入口：[Pull Requests](https://github.com/anthropics/claude-code/pulls)

## 5. 功能需求趋势

以下为所展示 30 条 Issue 中的方向性信号，不代表全部 50 条更新的完整统计。

### ① 插件扩展向流式交互与无障碍体验深入

同一作者围绕朗读 Mod 提出三项配套能力：流式读取 HTTP 响应、让移动高亮保持可见、在保留 Markdown 的同时逐词高亮。它们共同指向更实时、可访问的插件 UI，但不宜视为三个独立用户群体的需求。

链接：[流式 HTTP #105560](https://github.com/anthropics/claude-code/issues/105560) · [滚动跟随 #105559](https://github.com/anthropics/claude-code/issues/105559) · [逐词高亮 #105558](https://github.com/anthropics/claude-code/issues/105558)；各获 1 👍。

### ② 多会话与子代理需要更细粒度的控制

需求涉及按子代理配置 advisor、以程序方式重命名会话，以及在 Ctrl+C 停止子代理前确认。随着并行任务增加，用户更需要清晰的任务标识、配置作用域和防误操作机制。

链接：[advisor 作用域 #105557](https://github.com/anthropics/claude-code/issues/105557) · [会话重命名 #105550](https://github.com/anthropics/claude-code/issues/105550) · [停止确认 #105517](https://github.com/anthropics/claude-code/issues/105517)。前两项标记为 `duplicate`；后一项已关闭，原因未提供。

### ③ 连接器需要支持多账号和远程授权

Google Drive、Calendar、Gmail 连接器被请求同时支持多个 Google 账号，并向远程用户返回授权 URL，反映个人与工作账号并用、远程会话授权的实际需求。

链接：[#105526](https://github.com/anthropics/claude-code/issues/105526)

### ④ 终端与 IDE 的交互一致性仍待改善

SSH 图片粘贴、VS Code 中 `/effort` 选择器行为、后台会话宿主中的 Apple Terminal 配置问题，均指向同一诉求：核心操作应在不同入口保持可预期。

链接：[#105520](https://github.com/anthropics/claude-code/issues/105520) · [#105555](https://github.com/anthropics/claude-code/issues/105555) · [#105541](https://github.com/anthropics/claude-code/issues/105541)

## 6. 开发者关注点

- **先保证执行与更新可靠性**：Windows 更新中断和 Bash 启动长时间停滞可能直接阻塞工作。排查时应记录 Desktop、Claude Code 版本及进程启动时间，区分工具调度等待与 Shell 内部执行耗时。  
  链接：[#105554](https://github.com/anthropics/claude-code/issues/105554) · [#105551](https://github.com/anthropics/claude-code/issues/105551)

- **明确当前凭据来源与计费路径**：订阅登录、环境变量 API Key、Bedrock 临时凭据并存时，用户需要更明确的生效状态提示。开发者可优先检查运行环境中的凭据配置，并避免在诊断日志中泄露密钥。  
  链接：[#105540](https://github.com/anthropics/claude-code/issues/105540) · [#105542](https://github.com/anthropics/claude-code/issues/105542)

- **关注会话启动成本，而不只关注单轮 Token 用量**：缓存重复写入报告提示，频繁创建新会话的工作流值得单独观察第二轮缓存指标；具体额外费用仍需结合实际用量验证。  
  链接：[#105564](https://github.com/anthropics/claude-code/issues/105564)

- **安全过滤需要可诊断的反馈机制**：只读盘点、普通请求、授权安全测试均有误拦截报告，说明拒绝原因与复核路径值得关注；现有摘要不足以判断每次拦截是否确属误判。  
  链接：[#105561](https://github.com/anthropics/claude-code/issues/105561) · [#105565](https://github.com/anthropics/claude-code/issues/105565) · [#105544](https://github.com/anthropics/claude-code/issues/105544)

- **自动化环境需要可验证的就绪状态**：插件已声明却未加载、浏览器工具缺失、远程控制显示开启但不可达，都可能导致“配置看似完成、能力实际不可用”。无头与远程工作流应重视启动后的能力检查。  
  链接：[#105549](https://github.com/anthropics/claude-code/issues/105549) · [#105547](https://github.com/anthropics/claude-code/issues/105547) · [#105563](https://github.com/anthropics/claude-code/issues/105563)

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**2026-10-28 · [openai/codex](https://github.com/openai/codex)**

> 基于提供的过去 24 小时数据整理。Issue 内容属于用户报告，尚不能视为已确认根因；PR 均标记为 **CLOSED**，但数据未提供合并状态，不能据此认定已合并或随版本发布。PR 评论数缺失，不作热度排名。

## 1. 今日速览

Codex 发布 **0.165.0**，新增内置 Google Cloud Vertex AI Provider、GPT-6.1 Terra 模型目录条目，并改善多会话导航；同时推出多个 Alpha 版本。社区反馈集中于 **Windows 桌面稳定性与沙箱权限、长任务上下文连续性、额度消耗**；PR 则围绕执行器独立化、网络诊断、子代理追踪和资源管理推进。

## 2. 版本发布

### [0.165.0](https://github.com/openai/codex/releases/tag/rust-v0.165.0)

- **新增 Vertex AI Provider**：通过 `model_provider = "gcp"` 配置内置 Google Cloud Vertex AI 接入。
- **模型目录更新**：加入 GPT-6.1 Terra。仅能确认目录收录，不能据此推断所有账户均已开放。
- **会话管理改进**：会话选择器新增仓库筛选，代理指挥中心新增目录分组，方便多仓库、多任务导航。提供的发行说明在该条末尾截断，其他细节未展示。

### 预发布版本

另发布 [0.166.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.166.0-alpha.4)、[0.166.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.166.0-alpha.3)、[0.166.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.166.0-alpha.2) 和 [0.165.0-alpha.1.2](https://github.com/openai/codex/releases/tag/rust-v0.165.0-alpha.1.2)。提供的数据仅包含版本标题，暂无具体变更可总结。

## 3. 社区热点 Issues

以下按开发影响与代表性选取，并非单纯按评论数排序。**入选条目均为 OPEN、👍 均为 0，讨论量为 0–2 条，目前更适合视为早期问题信号，而非大范围故障证据。**

| Issue | 核心反馈与重要性 | 社区反应 |
|---|---|---|
| [#57610 Windows 沙箱：根目录可写，子目录拒绝访问](https://github.com/openai/codex/issues/57610) | VS Code 扩展在 elevated sandbox 下出现目录权限不一致，可能直接阻断实际代码修改；对嵌套项目结构尤其值得关注。 | 2 条评论 |
| [#57562 Windows 白屏与反复重载](https://github.com/openai/codex/issues/57562) | 报告称 4 天内记录了 150 次 renderer 崩溃，正常工作受到严重影响。应优先区分 UI 崩溃与模型响应缓慢。 | 2 条评论 |
| [#57625 Windows 桌面主进程退出](https://github.com/openai/codex/issues/57625) | `26.1021.3705.0` 被报告出现 `0xC0000374` 堆损坏错误。具体错误码与包版本有助于缩小诊断范围，但不能确认与其他白屏报告同源。 | 1 条评论 |
| [#57617 沙箱初始化失败](https://github.com/openai/codex/issues/57617) | 受保护的 `.sandbox-bin` ACL 被报告触发 `helper_sandbox_lock_failed`，影响 Windows 桌面执行环境启动。 | 1 条评论 |
| [#57623 “blocked by policy” 缺少可操作原因](https://github.com/openai/codex/issues/57623) | 本地测试、诊断及清理请求均遭策略拒绝，用户无法判断应调整配置、请求授权还是报告误拦截。体现权限决策可解释性的缺口。 | 1 条评论 |
| [#57608 自动压缩后丢失当前任务](https://github.com/openai/codex/issues/57608) | 用户称历史与检查点仍保存在本地，但续接时代理要求重新提供任务。影响长会话的可靠恢复。 | 1 条评论 |
| [#57559 反复压缩、无进展并耗尽额度](https://github.com/openai/codex/issues/57559) | 报告包含 40 次上下文压缩及重复准备步骤，并请求审计额度与付费信用使用情况。将任务停滞与成本问题联系起来，值得重点追踪。 | 2 条评论 |
| [#57549 协调代理收到委派结果后不继续执行](https://github.com/openai/codex/issues/57549) | 代理把部分结果视为任务结束，只向用户报告剩余步骤，而非继续已授权工作，削弱多代理自动化价值。 | 2 条评论 |
| [#57622 macOS 内存压力与重启报告](https://github.com/openai/codex/issues/57622) | 用户报告多次包含 codex 的压缩内存空间不足事件，之后发生 watchdog panic 与重启。潜在影响严重，但尚不能据此确认 Codex 是根因。 | 1 条评论 |
| [#57619 自动 GitHub 审查失败，手动触发可用](https://github.com/openai/codex/issues/57619) | 自动代码与安全审查在数秒内失败或持续运行，而 `@codex review` 可用，提示自动触发链路值得单独排查；手动触发是报告中的可用路径。 | 暂无评论 |

## 4. 重要 PR 进展

**以下 10 项均为 CLOSED；是否已合并、进入哪个版本，需进一步核验。**

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| [#57618 流建立后释放采样提示载荷](https://github.com/openai/codex/pull/57618) | 为旧通知提取必要文本，避免完整采样输入中的图像、音频载荷在响应流期间持续驻留。 | 减少不必要的内存保留；尚无证据表明直接修复上述 macOS 报告。 |
| [#57615 保留子代理重载后的 rollout 追踪](https://github.com/openai/codex/pull/57615) | 重载被驱逐的子代理后恢复根追踪关联，并处理替换 Code Mode 会话可能复用 cell ID 的问题。 | 改善长任务、多代理执行的可观测性。 |
| [#57607 Provider 与模型目录共享运行时认证](https://github.com/openai/codex/pull/57607) | 引入 `ProviderAuthContext`，让目录刷新与模型请求使用一致的运行时身份及凭证归属。 | 降低模型调用与目录刷新认证行为不一致的风险。 |
| [#57606 新增 `codex doctor --network-only`](https://github.com/openai/codex/pull/57606) | 聚焦有效配置、网络环境、Provider HTTP 可达性与 Responses WebSocket 检查，跳过数据库和 MCP 等无关扫描。 | 提供更聚焦的网络故障诊断入口。 |
| [#57598 缓存远程技能发现的空结果](https://github.com/openai/codex/pull/57598) | 缓存不存在 `.agents/skills` 目录的已验证结果，并通过文件系统监听使缓存失效。 | 减少重复远程元数据请求。 |
| [#57597 保留 WebSocket 探测证据并脱敏](https://github.com/openai/codex/pull/57597) | 后续读取失败时仍保留握手升级证据，对诊断中的敏感 URL、错误文本与关闭原因进行脱敏。 | 同时提升排障准确性与诊断分享安全性。 |
| [#57589 新增独立 `codex-exec-server`](https://github.com/openai/codex/pull/57589) | 提取执行器启动逻辑，由现有子命令与独立二进制复用，保留认证、配置覆盖及沙箱助手分派。 | 为执行服务独立集成提供基础。 |
| [#57590 将独立执行器纳入发行包](https://github.com/openai/codex/pull/57590) | 在 CLI 与 app-server 包中加入执行器，并通过 `codex-package.json` 的 `execServer` 字段公布路径。 | 与上一项配套，完善分发与程序化发现机制。 |
| [#57569 背压下保留进程输出及控制响应](https://github.com/openai/codex/pull/57569) | 处理慢消费者下输出丢失、控制响应受阻，以及子进程退出后后代仍持有输出流的情况。 | 改善执行结果完整性和进程状态判断。 |
| [#57568 独立配置记忆整合服务等级](https://github.com/openai/codex/pull/57568) | 新增 `memories.consolidation_service_tier`，默认值为 `"default"`，使后台记忆整合不再直接继承会话等级。 | 为后台工作提供独立的服务等级控制。 |

## 5. 功能需求趋势

以下从提供的 Issue 样本归纳，不代表完整 50 条记录的统计排名。

- **Windows 可靠性与 IDE 启动体验**：白屏、崩溃、扩展 UI 无法启动及 WSL 启动耗时共同表明，基础可用性仍是突出诉求。参考 [#57562](https://github.com/openai/codex/issues/57562)、[#57565](https://github.com/openai/codex/issues/57565)、[#57600](https://github.com/openai/codex/issues/57600)。
- **权限策略透明化**：用户需要明确的拒绝原因、一致的目录权限和可见的授权控制，而非只有策略拦截提示。参考 [#57623](https://github.com/openai/codex/issues/57623)、[#57610](https://github.com/openai/codex/issues/57610)、[#57555](https://github.com/openai/codex/issues/57555)。
- **长任务连续性与成本可解释性**：上下文压缩不应丢任务，多代理应持续推进，额度异常消耗应能追踪。参考 [#57608](https://github.com/openai/codex/issues/57608)、[#57549](https://github.com/openai/codex/issues/57549)、[#57595](https://github.com/openai/codex/issues/57595)。
- **Computer Use 与浏览器控制可靠性**：截图、点击、浏览器初始化和云电脑连接均有失败报告；“界面可打开”不等于“代理可控制”。参考 [#57613](https://github.com/openai/codex/issues/57613)、[#57583](https://github.com/openai/codex/issues/57583)、[#57601](https://github.com/openai/codex/issues/57601)。
- **跨端项目与上下文一致性**：项目、置顶聊天、项目来源及引用会话需要稳定可见、可读取。参考 [#57578](https://github.com/openai/codex/issues/57578)、[#57621](https://github.com/openai/codex/issues/57621)、[#57624](https://github.com/openai/codex/issues/57624)。

## 6. 开发者关注点

1. **排障需区分组件版本。** App 包、内置 CLI、扩展和插件版本并不相同，报告问题时应分别记录，避免混用版本导致误判。参考 [#57617](https://github.com/openai/codex/issues/57617)、[#57550](https://github.com/openai/codex/issues/57550)。
2. **“失败原因可操作”与“功能可用”同样重要。** 权限错误应能指出决策原因和下一步，而不是促使用户盲目放宽安全设置。参考 [#57623](https://github.com/openai/codex/issues/57623)、[#57566](https://github.com/openai/codex/issues/57566)。
3. **长任务需要恢复能力和防空转机制。** 当前反馈期待任务检查点、压缩后的目标保留、重复行为识别，以及更清晰的额度消耗记录。参考 [#57608](https://github.com/openai/codex/issues/57608)、[#57559](https://github.com/openai/codex/issues/57559)。
4. **应按链路定位自动化故障。** 聊天、连接器、浏览器控制、桌面控制和 GitHub 自动审查可能分别失效，某一路径正常不能证明整体正常。参考 [#57601](https://github.com/openai/codex/issues/57601)、[#57613](https://github.com/openai/codex/issues/57613)、[#57619](https://github.com/openai/codex/issues/57619)。

**今日判断：** 新 Provider 与模型目录继续扩展能力边界，但当前样本中更紧迫的需求是：让代理**稳定执行、持续推进，并在失败或消耗异常时提供可追踪的解释**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-10-28**  
**项目：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)**

> 数据说明：本日报基于所提供的 GitHub 快照。Issue 仅有 4 条，因此全部列出，不补足为 10 条；Release 说明存在截断，以下仅总结可确认内容。PR 的 `CLOSED` 状态不等同于已合并。

## 1. 今日速览

Gemini CLI 发布 **v0.66.0 正式版、v0.67.0-preview.0 和新 nightly**，其中 nightly 可确认涉及 Android Termux 路径兼容与 CRLF 差异处理修复。社区开发重点集中在**取消操作的可靠性、文本与路径处理正确性，以及扩展开发体验**，相关改动多数仍处于开放 PR 阶段。

另有一条 PR 提出 CI 密钥暴露测试，应优先进行安全审查，但现有数据不足以确认漏洞成立或发生泄露。

## 2. 版本发布

| 版本 | 可确认更新 | 开发者影响 |
|---|---|---|
| [v0.67.0-nightly.20261028.gfa5c17365](https://github.com/google-gemini/gemini-cli/releases/tag/v0.67.0-nightly.20261028.gfa5c17365) | 允许在 Android Termux 环境中使用受信任的系统路径解析 ripgrep；在 `getDiffContextSnippet` 执行差异比较前规范化 CRLF 换行 | 改善移动终端兼容性，以及不同换行格式下的 diff 处理 |
| [v0.67.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.67.0-preview.0) | 已发布预览版；所给说明主要展示历史 changelog 与版本推进记录 | 无法据此完整归纳本版功能变化，测试前宜查看完整发布说明 |
| [v0.66.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.66.0) | 已发布正式版；可见条目包括移除 ROADMAP 中过时的 2025 年路线图引用 | 发布说明截断，不能将可见文档改动视为本版全部更新 |

## 3. 社区热点 Issues

当前仅提供 **4 条 Issue，均为 OPEN**。互动量较低，尚不足以据此判断广泛的社区共识。

### 1. 上下文管理配置可能未实际生效
**[#29985](https://github.com/google-gemini/gemini-cli/issues/29985)** · `area/agent` · 待分诊

- **问题**：报告称 `loadCliConfig` 未将 `contextManagement` 设置传入 `Config`，涉及历史窗口、消息限制及工具蒸馏等配置。
- **为什么重要**：若属实，会造成“文档有配置、运行时不生效”的行为落差，影响开发者对上下文管理的控制。
- **社区反应**：0 评论、0 👍，尚待维护者验证。

### 2. Hooks 希望提供工具调用 ID
**[#29975](https://github.com/google-gemini/gemini-cli/issues/29975)** · `priority/p3` · 已由机器人分诊

- **需求**：在 `BeforeTool`、`AfterTool` 输入中增加类似 `tool_call_id` 的字段。
- **为什么重要**：便于关联同一次工具调用的前后事件，支持日志追踪、审计与自动化集成。
- **社区反应**：0 评论、0 👍；当前是具体的增强提案，尚未体现更广泛反馈。

### 3. 符合要求的扩展未被 Gallery 收录
**[#29979](https://github.com/google-gemini/gemini-cli/issues/29979)** · `area/extensions` · 已由机器人分诊

- **问题**：作者称 `resido-fhm/gemini-extension` 已满足文档要求，但仍未出现在扩展目录中。
- **为什么重要**：扩展的索引及时性与收录规则透明度，直接影响开发者分发和用户发现。
- **社区反应**：1 条评论、0 👍，是本批 Issue 中唯一已有评论的条目；未提供评论内容，无法判断处理结论。

### 4. 仅含截图的问题报告，信息不足
**[#29981](https://github.com/google-gemini/gemini-cli/issues/29981)** · `area/unknown` · 待分诊

- **问题**：标题和正文未提供明确的问题描述，仅附截图。
- **为什么重要**：缺少复现步骤、环境和预期行为，难以形成可执行的排查任务。
- **社区反应**：0 评论、0 👍，需先补充信息，不宜据此推断具体故障。

## 4. 重要 PR 进展

以下 **10 条均为 OPEN**，代表待审查或待合并方向，不表示已随版本交付。

| PR | 功能或修复内容 | 关注价值 |
|---|---|---|
| **[#29984](https://github.com/google-gemini/gemini-cli/pull/29984)** CI 安全测试 | 提交者试图验证 fork 代码能否访问 `GEMINI_API_KEY`，测试内容涉及向运行日志输出部分密钥信息 | **优先安全审查**；应核查工作流权限与密钥隔离，不能仅凭标题认定已泄露 |
| **[#29989](https://github.com/google-gemini/gemini-cli/pull/29989)** 修复 `\n` 转义处理 | 修正 core、CLI 中可能破坏字符串、正则和代码片段内合法转义序列的逻辑 | 关系到文件编辑与文本规范化的内容保真 |
| **[#29973](https://github.com/google-gemini/gemini-cli/pull/29973)** 取消后跳过文件写入 | 在内容准备后及实际写入前重新检查取消状态，避免已取消的 `replace`、`write_file` 继续落盘 | 降低用户取消操作后文件仍被修改的风险；不负责撤销已完成的写入 |
| **[#29977](https://github.com/google-gemini/gemini-cli/pull/29977)** 后台输出读取响应取消 | 修复 `read_background_output` 忽略取消信号、继续等待或读取日志的问题 | 改善后台任务控制；标记 `help wanted` |
| **[#29978](https://github.com/google-gemini/gemini-cli/pull/29978)** 保留超长日志与边界行 | 修复读取日志末尾 64KB 时丢弃完整首行，或超长单行导致输出为空的问题 | 提高 Agent 获取后台诊断信息的完整性；标记 `help wanted` |
| **[#29980](https://github.com/google-gemini/gemini-cli/pull/29980)** 新增扩展校验命令 | 提议提供 `gemini extensions validate <path>`，检查扩展清单及上下文文件路径安全等 | 将配置错误与部分安全检查前移至安装、发布之前 |
| **[#29982](https://github.com/google-gemini/gemini-cli/pull/29982)** 识别带点号的 Gemini 3 模型名 | 修复未启用动态模型配置时，多模态函数响应能力判断依赖 `gemini-3-` 前缀的问题 | 避免模型命名形式导致能力识别遗漏 |
| **[#29976](https://github.com/google-gemini/gemini-cli/pull/29976)** 加固主题文件路径检查 | 使用 `isWithinRoot` 替代简单字符串前缀判断 | 避免将与 home 目录同前缀的相邻目录误判为目录内部 |
| **[#29988](https://github.com/google-gemini/gemini-cli/pull/29988)** 修复 VS Code 资源注册 | 将命令与监听器的 Disposable 正确纳入 `context.subscriptions` | 改善扩展资源生命周期管理；另有同类提案 [#29994](https://github.com/google-gemini/gemini-cli/pull/29994)，审查时宜协调去重 |
| **[#29987](https://github.com/google-gemini/gemini-cli/pull/29987)** 改善 `@` 文件路径补全 | 规范化 `/`、`./`、反斜杠等查询前缀，支持 `@/src` 等输入 | 减少文件引用时的路径输入摩擦 |

## 5. 功能需求趋势

**从现有 4 条 Issue 看，主要方向是配置可控性、工具可观测性和扩展分发，而非可量化的“高热度需求”。**

- **上下文管理应可验证、可依赖**：用户不仅需要配置项，也需要配置真正传递到运行时并产生可预期效果。见 [#29985](https://github.com/google-gemini/gemini-cli/issues/29985)。
- **Hooks 需要更完整的关联信息**：工具调用 ID 诉求表明，用户希望将 CLI 接入更精细的日志、审计和自动化流程。见 [#29975](https://github.com/google-gemini/gemini-cli/issues/29975)。
- **扩展生态需要更透明的分发链路**：满足发布规则后能否被收录，是扩展作者体验的重要组成部分。见 [#29979](https://github.com/google-gemini/gemini-cli/issues/29979)。

作为补充，PR 活动还显示出 **IDE 生命周期管理、模型能力识别与扩展本地校验**等开发方向，但不能将其等同于 Issue 中已形成的高频需求。见 [#29988](https://github.com/google-gemini/gemini-cli/pull/29988)、[#29982](https://github.com/google-gemini/gemini-cli/pull/29982)、[#29980](https://github.com/google-gemini/gemini-cli/pull/29980)。

## 6. 开发者关注点

1. **取消操作必须真正停止副作用**  
   文件写入和后台日志读取都出现取消语义相关修复，说明异步操作边界值得重点测试。见 [#29973](https://github.com/google-gemini/gemini-cli/pull/29973)、[#29977](https://github.com/google-gemini/gemini-cli/pull/29977)。

2. **文本处理不能破坏原始内容**  
   转义序列、日志截断边界，以及 emoji 等代理对字符都存在修复提案。开发者应关注代码编辑和终端展示的保真性。见 [#29989](https://github.com/google-gemini/gemini-cli/pull/29989)、[#29978](https://github.com/google-gemini/gemini-cli/pull/29978)、[#29993](https://github.com/google-gemini/gemini-cli/pull/29993)。

3. **文档、配置与实际行为需要一致**  
   上下文设置不生效的报告，以及扩展符合要求却未被收录的反馈，均指向“按文档操作后缺少可预期结果”的痛点。见 [#29985](https://github.com/google-gemini/gemini-cli/issues/29985)、[#29979](https://github.com/google-gemini/gemini-cli/issues/29979)。

4. **安全边界应优先于便利性验证**  
   CI 密钥访问测试与主题路径检查分别涉及凭据隔离和文件路径信任边界，值得维护者优先审查。见 [#29984](https://github.com/google-gemini/gemini-cli/pull/29984)、[#29976](https://github.com/google-gemini/gemini-cli/pull/29976)。

**总体判断：**本期可见工作以可靠性与边界条件修复为主。对使用者而言，最值得跟踪的是取消操作、文件编辑保真与上下文配置；对扩展作者而言，则是本地校验和 Gallery 收录体验。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-28**  
**仓库：[github/copilot-cli](https://github.com/github/copilot-cli)**

> 本报基于所提供的过去 24 小时数据整理，记录时间均为 2026-10-27。Issue 描述属于用户报告，不代表官方已确认根因或修复计划。

## 1. 今日速览

本期发布记录的明确修复重点是：**长上下文会话现在可以通过 `/model` 切换到 Copilot Fusion High 或 Max**。社区反馈则集中在 ACP 集成完整性、模型兼容性以及会话可靠性，其中涉及计划执行卡住、输入丢失和长时间运行后内存耗尽等风险。

本期共有 **10 条更新的 Issue：9 条开放待分诊、1 条以 `invalid` 关闭**；未提供过去 24 小时内更新的 PR。

## 2. 版本发布

| 版本 | 更新摘要 |
|---|---|
| [v1.0.105](https://github.com/github/copilot-cli/releases/tag/v1.0.105) | 修复长上下文会话中，通过 `/model` 选择 Copilot Fusion High 或 Max 不生效的问题。 |
| [v1.0.105-1](https://github.com/github/copilot-cli/releases/tag/v1.0.105-1) | 发布说明仅提供“Fixes and changes”，没有可进一步确认的具体变更。 |
| [v1.0.105-0](https://github.com/github/copilot-cli/releases/tag/v1.0.105-0) | 同样列出了长上下文会话切换 Fusion High/Max 的修复。 |

**影响解读：** 对依赖长上下文、并需要在会话中切换模型的开发者，这项修复有直接价值。现有说明不足以判断三个版本之间是否还有其他差异。

## 3. 社区热点 Issues

本期共提供 10 条 Issue，以下全部列出；其中 #5262 缺乏有效信息，仅作为分诊记录保留。**所有条目均为 0 个 👍，目前不能据此判断存在广泛社区共识。**

| Issue | 核心问题与关注价值 | 社区反应 / 状态 |
|---|---|---|
| [#5270：GPT-6.1 Sol 阻塞计划实施](https://github.com/github/copilot-cli/issues/5270) | 用户报告，显式选择该模型或由 Auto 选中后，Plan 无法进入 Implementation，持续等待。**直接阻断任务执行**，也是模型选择与工作流衔接的兼容性信号。 | 开放，`triage`；**3 条评论**，为本期评论最多的有效反馈。 |
| [#5269：ACP 会话无法使用插件 Skills](https://github.com/github/copilot-cli/issues/5269) | 在 `copilot --acp --stdio` 下，插件 Agents 可用，但 Skills 未出现在 `available_commands_update` 等位置。影响 ACP 客户端发现和调用插件能力。 | 开放，`triage`；0 条评论。 |
| [#5268：ACP 的会话清理命令不可用](https://github.com/github/copilot-cli/issues/5268) | `/session` 虽被公布为可用命令，但 `delete`、`cleanup`、`prune` 返回 sessionsApi 不可用。暴露出**命令发现与实际执行能力不一致**的问题。 | 开放，`triage`；0 条评论。 |
| [#5267：组织自定义模型请求返回 HTTP 400](https://github.com/github/copilot-cli/issues/5267) | 用户报告 `/chat/completions` 请求携带供应商不接受的 `frequency_penalty`、`presence_penalty`，而同会话的 `/responses` 模型可用。影响组织接入 Google AI Studio 等兼容服务。 | 开放，`triage`；0 条评论。 |
| [#5266：ACP 重试导致回答内容混杂](https://github.com/github/copilot-cli/issues/5266) | 模型调用中途失败后，客户端先收到部分回答，再收到作为正文输出的重试提示，最后收到完整回答。可能造成内容重复，并干扰下游展示或解析。 | 开放，`triage`；0 条评论。 |
| [#5265：并发进程覆盖输入历史](https://github.com/github/copilot-cli/issues/5265) | 多个交互进程共享 `command-history-state.json`，用户报告整表写回导致“最后写入者覆盖”，其他会话输入可能从历史中消失。影响多终端工作流。 | 开放，`triage`；0 条评论。 |
| [#5264：提交失败后提示词被丢弃](https://github.com/github/copilot-cli/issues/5264) | host-ack 超时后，输入框被清空且未保存历史；提示词可能延迟送达，也可能未送达。**输入保全与提交状态不确定**是主要风险。 | 开放，`triage`；0 条评论。 |
| [#5263：会话释放后持续轮询，疑似导致 OOM](https://github.com/github/copilot-cli/issues/5263) | 用户报告长时间运行的会话变慢并最终出现 JavaScript 堆内存耗尽，怀疑与会话释放后仍重试的轮询有关。值得关注资源回收与长期稳定性。 | 开放，`triage`；0 条评论，根因尚待确认。 |
| [#5261：为工具 Hooks 增加调用 ID](https://github.com/github/copilot-cli/issues/5261) | 请求在 `preToolUse`、`postToolUse`、`postToolUseFailure` 等输入中加入工具调用 ID，使前后事件能够可靠关联。利于日志追踪、审计和自动化集成。 | 开放，`triage`；0 条评论。 |
| [#5262：无有效内容的反馈](https://github.com/github/copilot-cli/issues/5262) | 标题为“100”，问题描述、版本和复现步骤均为空，无法形成技术判断，不应作为功能趋势依据。 | 已关闭，`invalid`；1 条评论。 |

## 4. 重要 PR 进展

**本期提供的数据中，过去 24 小时更新的 PR 为 0 条**，因此无法列出 10 个重要 PR，也无法将上述 Issue 对应到具体实现或修复进度。

后续可关注：[Pull Requests 列表](https://github.com/github/copilot-cli/pulls)。现有发布说明也未提供关联 PR。

## 5. 功能需求趋势

以下是本期样本中的集中方向，不代表整个社区的长期需求排名。

- **ACP 集成从“可连接”走向“能力一致”。** 3 条反馈分别涉及插件 Skills、会话管理命令和重试流式输出，说明客户端需要可靠的能力发现、执行与事件语义。  
  相关：[ #5269](https://github.com/github/copilot-cli/issues/5269) · [#5268](https://github.com/github/copilot-cli/issues/5268) · [#5266](https://github.com/github/copilot-cli/issues/5266)

- **会话可靠性与用户输入保护。** 并发历史覆盖、提交失败丢失输入、长会话疑似内存泄漏，共同指向状态持久化、异常恢复和资源生命周期管理。  
  相关：[#5265](https://github.com/github/copilot-cli/issues/5265) · [#5264](https://github.com/github/copilot-cli/issues/5264) · [#5263](https://github.com/github/copilot-cli/issues/5263)

- **多模型支持需要端到端兼容。** 用户关注的不只是模型能否被选择，还包括工作流转换是否正常，以及不同 API、供应商是否接受实际发送的参数。  
  相关：[#5270](https://github.com/github/copilot-cli/issues/5270) · [#5267](https://github.com/github/copilot-cli/issues/5267) · [v1.0.105](https://github.com/github/copilot-cli/releases/tag/v1.0.105)

- **工具调用可观测性。** Hooks 调用 ID 的需求体现出对事件关联、故障定位和自动化治理的关注。  
  相关：[#5261](https://github.com/github/copilot-cli/issues/5261)

## 6. 开发者关注点

1. **优先验证阻断型路径。** 使用 GPT-6.1 Sol 执行计划、或组织自定义 `/chat/completions` 模型时，应重点验证完整调用链，而不只是模型列表是否可见。  
   参考：[#5270](https://github.com/github/copilot-cli/issues/5270)、[#5267](https://github.com/github/copilot-cli/issues/5267)。

2. **提交失败后保留输入，并核实执行状态。** 对重要提示词保留副本；出现提交超时后，先确认是否已被延迟处理，再决定是否重发，避免丢失或重复执行。  
   参考：[#5264](https://github.com/github/copilot-cli/issues/5264)。

3. **多终端与长会话用户关注状态和内存。** 当前报告涉及历史记录覆盖及长期运行后的 OOM；这些问题尚待分诊，不宜视为已确认影响所有用户。  
   参考：[#5265](https://github.com/github/copilot-cli/issues/5265)、[#5263](https://github.com/github/copilot-cli/issues/5263)。

4. **ACP 客户端不要假定与交互模式能力完全一致。** 插件命令发现、会话管理与失败重试输出应分别进行集成测试。  
   参考：[#5269](https://github.com/github/copilot-cli/issues/5269)、[#5268](https://github.com/github/copilot-cli/issues/5268)、[#5266](https://github.com/github/copilot-cli/issues/5266)。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**2026-10-28｜[anomalyco/opencode](https://github.com/anomalyco/opencode)**

## 1. 今日速览

OpenCode 发布 **v2.2.0**，核心亮点是实验性的 Desktop 插件创建、安装与分享能力，社区随即提出首页面板、文件展示和链接接管等扩展诉求。与此同时，数据安全、升级后会话可见性，以及 Windows、Web、ACP 场景的稳定性值得优先关注；其中一条 v2.1.4 文件删除报告风险较高，但**现有数据尚不足以确认原因和影响范围**。开发侧正在推进 ACP 修复、模型计价准确性和 v1 发布流水线维护。

> **口径说明：**本报依据提供的 50 条 Issue、50 条 PR 更新记录中的展示样本整理，不代表全量热度排名。Release 内容被截断；PR 评论数缺失，且 `CLOSED` 不等于已合并或已修复。

## 2. 版本发布

### [v2.2.0：实验性 Desktop 插件上线](https://github.com/anomalyco/opencode/releases/tag/v2.2.0)

- 支持**创建、安装和分享 Desktop 插件**，为桌面端界面扩展提供新入口。
- 该能力仍标注为 **experimental**；插件开发者应关注 API 变动与兼容性。
- 已展示的发布说明关联 [#55246](https://github.com/anomalyco/opencode/pull/55246)、[#59469](https://github.com/anomalyco/opencode/pull/59469)。完整变更未提供，不据此推断其他更新内容。
- 开发文档：[Desktop 插件指南](https://opencode.ai/v2/docs/build/plugins/gui)。

## 3. 社区热点 Issues

以下按潜在影响和技术相关性筛选；评论数仅反映当前样本中的讨论量。

| Issue | 核心问题与重要性 | 社区反应 / 当前状态 |
|---|---|---|
| **[#59788：疑似删除项目外文件](https://github.com/anomalyco/opencode/issues/59788)** | 报告者称 v2.1.4 删除了 F: 盘中活动项目目录之外的文件，且没有提示。涉及潜在数据丢失，应列为最高优先级核查项。 | **OPEN · triaging，3 条评论**。尚无复现确认，不能视为已证实的普遍缺陷。 |
| **[#59769：升级 v2 后部分会话不可见](https://github.com/anomalyco/opencode/issues/59769)** | 从 v1.19.4 升至 v2.2.0 后，部分历史会话不再显示。影响升级信心和工作连续性，但“不可见”不等于底层数据已删除。 | **OPEN · pending close / triaging，2 条评论**。报告者提供了可能的排查线索。 |
| **[#59751：快照仓库初始化死锁](https://github.com/anomalyco/opencode/issues/59751)** | 快照目录是缺少 `HEAD` 的非空残留仓库时，临时仓库重命名触发 `ENOTEMPTY` 并导致死锁，暴露异常状态恢复问题。 | **OPEN · reproduced，2 条评论**，已标记复现。 |
| **[#59791：HTTP 部署下“Open file”无响应](https://github.com/anomalyco/opencode/issues/59791)** | v2.2.0 Web UI 在非 localhost 的明文 HTTP 来源下调用 `crypto.randomUUID` 失败，影响局域网、自托管访问。 | **OPEN · reproduced，1 条评论**，报告称为 v2.2.0 回归。 |
| **[#59794：历史图片反复发送导致会话失效](https://github.com/anomalyco/opencode/issues/59794)** | 每次请求重发全部历史图片；遇到单请求图片数量受限的后端时，会话可能持续无法使用。对 vLLM 等自托管后端尤其重要。 | **OPEN，1 条评论**。报告给出了图片限额场景，尚未标记复现。 |
| **[#59789：ACP 切换失败后状态仍改变](https://github.com/anomalyco/opencode/issues/59789)** | 模型或 agent 切换失败后，本地选择仍更新，导致 ACP 与服务端状态不一致，可能影响后续配置操作。 | **OPEN · reproduced，1 条评论**；已有对应修复 PR #59790。 |
| **[#59786：Windows 流式调用间歇性断连](https://github.com/anomalyco/opencode/issues/59786)** | TogetherAI 调用出现 `EPROTO`、`ECONNRESET`，报告者怀疑与空闲后复用 keep-alive 连接有关。直接影响长会话可靠性。 | **OPEN · pending close / triaging，2 条评论**。连接复用目前只是待验证假设。 |
| **[#59806：MCP 403 后静默重连](https://github.com/anomalyco/opencode/issues/59806)** | `opencode_console` 被拒绝访问工作区后约每 6 秒重连一次，却没有可操作的错误提示，增加权限排障成本。 | **OPEN，1 条评论**，尚无已确认修复信息。 |
| **[#59807：资金问题被显示为缺少 API Key](https://github.com/anomalyco/opencode/issues/59807)** | 桌面端把上游资金／认证问题呈现为 `Missing API key`；报告称另一入口能正确显示余额不足，可能误导用户反复调整凭据。 | **OPEN，1 条评论**。关注点是错误信息准确性，而非模型是否可选。 |
| **[#59802：GUI 插件需要首页面板](https://github.com/anomalyco/opencode/issues/59802)** | 现有插件面板局限于会话侧栏，用户希望通过 `Panel.home`、`layout.home` 在首页展示内容，体现插件扩展范围需求。 | **CLOSED，1 条评论**。未提供关闭原因，不能据此认定已实现。 |

## 4. 重要 PR 进展

以下均为本次样本中的重要提案或修复；**开放 PR 尚不能视为已随版本交付**。

| PR | 功能或修复内容 | 当前状态 |
|---|---|---|
| **[#59790：ACP 切换失败保留原选择](https://github.com/anomalyco/opencode/pull/59790)** | 修正模型／agent 切换过程中的本地状态更新逻辑，避免调用失败后与服务端选择不一致，对应 #59789。 | **OPEN** |
| **[#59793：解码 ACP 附件文件名](https://github.com/anomalyco/opencode/pull/59793)** | 修复 URI 文件名仍保留 `%20` 等编码的问题，改善空格、重音字符及特殊字符文件名展示，对应 #59792。 | **OPEN** |
| **[#59805：RPC 支持仅声明单侧 schema](https://github.com/anomalyco/opencode/pull/59805)** | 修复 RPC 方法省略未使用侧 schema 时的调用问题，使实际行为与文档允许的定义方式一致。 | **OPEN** |
| **[#59803：补齐 Copilot 长上下文与缓存计价](https://github.com/anomalyco/opencode/pull/59803)** | 读取长上下文价格档位、缓存写入价格和 token 用量，修正成本统计遗漏。 | **OPEN · needs:compliance** |
| **[#59808：v1 CI 改用 GITHUB_TOKEN](https://github.com/anomalyco/opencode/pull/59808)** | 替换已移除的 OpenCode App 凭据机制，处理生成任务与 Nix hashes 工作流的 `appId option is required` 错误。 | **OPEN** |
| **[#59782：修复 v1 签名与发布配置](https://github.com/anomalyco/opencode/pull/59782)** | 调整无密码 macOS 证书导入和 release 环境凭据使用，并限制从 v1 发布，针对旧版发布链路失败。 | **CLOSED**，未提供合并信息 |
| **[#59765：统一 Provider 配置类型](https://github.com/anomalyco/opencode/pull/59765)** | 让 Provider 的 `model()` 设置参数可选，并统一暴露 `Config` 类型，减少调用样板代码和接口差异。 | **OPEN** |
| **[#59771：移除部分内置 AI SDK 依赖](https://github.com/anomalyco/opencode/pull/59771)** | 拟移除 Cohere、Vercel、Perplexity 的内置 SDK 包及对应加载插件。应关注 Provider 兼容性影响；不能仅凭此断言相关服务全面停止支持。 | **OPEN** |
| **[#59784：按标题过滤 CLI 会话列表](https://github.com/anomalyco/opencode/pull/59784)** | 为会话检索增加标题过滤，改善多会话管理体验。描述注明设计审批仍在等待。 | **OPEN** |
| **[#59764：插件自定义输入区 pill 弹层](https://github.com/anomalyco/opencode/pull/59764)** | 允许 composer pill 自行渲染 popover 内容，宿主负责外壳与浮层，插件负责内部界面。 | **CLOSED**，未提供合并信息 |

## 5. 功能需求趋势

### ① 桌面插件需要更完整的扩展能力
需求从“能安装插件”转向“插件能接管哪些界面与交互”：包括[首页面板 #59802](https://github.com/anomalyco/opencode/issues/59802)、[草稿访问状态 #59801](https://github.com/anomalyco/opencode/issues/59801)、[外部链接处理 #59798](https://github.com/anomalyco/opencode/issues/59798)和[文本文件自定义展示 #59797](https://github.com/anomalyco/opencode/issues/59797)。这些同日诉求集中来自同一位贡献者，更适合视为一组深入的 API 反馈，而非广泛投票共识。

### ② 会话生命周期与成果保护
[关闭确认／草稿保存 #59775](https://github.com/anomalyco/opencode/issues/59775)、[升级后历史会话可见性 #59769](https://github.com/anomalyco/opencode/issues/59769)以及[历史图片裁剪问题 #59794](https://github.com/anomalyco/opencode/issues/59794)，共同指向避免工作成果丢失、保持长会话可继续使用的需求。

### ③ 企业网络与自托管适配
[Windows 企业代理下浏览器失败 #59722](https://github.com/anomalyco/opencode/issues/59722)、[HTTP 来源兼容性 #59791](https://github.com/anomalyco/opencode/issues/59791)和[TLS 断连 #59786](https://github.com/anomalyco/opencode/issues/59786)，说明非默认网络环境是当前需要关注的可靠性方向。

### ④ 更透明的额度、认证与支付体验
用户不仅需要请求成功，也需要明确知道失败原因：包括[额度过早触顶 #59690](https://github.com/anomalyco/opencode/issues/59690)、[免费层 IP 限流误伤 #59781](https://github.com/anomalyco/opencode/issues/59781)、[支付方式无法更新 #59780](https://github.com/anomalyco/opencode/issues/59780)及[余额错误被误报为 API Key 问题 #59807](https://github.com/anomalyco/opencode/issues/59807)。

### ⑤ Agent 工具与终端交互的精细控制
[浏览器关闭标签页 API #59787](https://github.com/anomalyco/opencode/issues/59787)强调 agent 应能清理自己创建的资源；[禁用 TUI 斜体 #59777](https://github.com/anomalyco/opencode/issues/59777)、[复制后清除选区高亮 #59774](https://github.com/anomalyco/opencode/issues/59774)则体现终端用户对可配置性的持续需求。

## 6. 开发者关注点

- **先保障数据与升级安全。** 对关键项目，建议升级前备份项目和会话数据；对[#59788](https://github.com/anomalyco/opencode/issues/59788)保持高优先级跟踪，但不要将单条未验证报告扩大为确定结论。
- **异常路径需要状态恢复能力。** [快照残留仓库死锁](https://github.com/anomalyco/opencode/issues/59751)和[ACP 切换失败状态不同步](https://github.com/anomalyco/opencode/issues/59789)都表明，失败后的恢复逻辑与正常路径同样重要。
- **错误提示必须可诊断、可操作。** [MCP 静默重连](https://github.com/anomalyco/opencode/issues/59806)和[资金错误误报](https://github.com/anomalyco/opencode/issues/59807)会把服务端问题转化为开发者的排障成本。
- **跨环境回归测试应覆盖实际部署方式。** 优先验证 Windows、企业代理、远程 HTTP Web UI，以及有限额的自托管多模态后端，参考[#59722](https://github.com/anomalyco/opencode/issues/59722)、[#59791](https://github.com/anomalyco/opencode/issues/59791)、[#59794](https://github.com/anomalyco/opencode/issues/59794)。

**今日判断：**v2.2.0 打开了桌面插件扩展的新空间，但从当前反馈看，数据保护、升级连续性和异常状态可观测性，应与新能力建设并行推进。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-10-28

## 今日速览

过去 24 小时的数据包含 **24 条 Issue、18 条 PR 更新，无新版本发布**；讨论重点集中在会话恢复可靠性、上下文与缓存成本，以及工具调用和扩展体验。最值得关注的是会话写入失败后恢复丢失内置工具的 **P0 问题**，同时，多项反馈指向摘要请求无法复用缓存、Codemode 工具描述膨胀等成本与可用性问题。

> **数据说明：**来源标注为 `badlogic/pi-mono`，但条目均指向 `earendil-works/pi`，下文按条目提供链接。所有 Issue 均标记为 CLOSED；PR 中 17 条 CLOSED、1 条 OPEN。**CLOSED 不代表已修复或已合并**，`fix-available` 也不代表修复已随版本发布。多数条目的更新时间为 10 月 27 日。

## 社区热点 Issues

以下选取 10 项，按影响与技术价值排序。全部条目 👍 均为 0，评论数为 1–4 条，因此“热点”主要体现问题重要性，而非大规模讨论热度。

| Issue | 核心问题与重要性 | 社区反馈与状态 |
|---|---|---|
| [#11460：恢复会话后丢失全部内置工具](https://github.com/earendil-works/pi/issues/11460) | 报告称磁盘空间不足等写入失败可能留下孤立 `parentId`，恢复截断分支后工具集丢失。涉及持久化一致性和核心工作流，是本批次唯一 **P0**。 | 4 条评论，为本批次最多；CLOSED，标记 `fix-available`，有对应修复 PR #11486。 |
| [#11500：压缩／摘要请求无法共享对话前缀](https://github.com/earendil-works/pi/issues/11500) | 摘要请求重新组织提示词，无法复用实时对话的 token 前缀，可能导致每次压缩都承担完整 prefill 成本。对长会话的延迟和费用影响明显。 | 2 条评论；CLOSED、`untriaged`；有对应方案 PR #11499，但不能据此判断已采用。 |
| [#11493：Codex 空闲后出现完整缓存未命中](https://github.com/earendil-works/pi/issues/11493) | 用户报告恢复旧会话后未命中缓存，与其引用的持久缓存承诺不符。提示缓存命中行为仍需结合客户端请求与服务端机制排查。 | 2 条评论；CLOSED、`untriaged`。现有摘要不足以确定根因或责任归属。 |
| [#11501：Codemode 联合输出类型撑大请求](https://github.com/earendil-works/pi/issues/11501) | `describeOutput` 对联合类型输出完整类型定义；报告称单个工具就可能给每次请求增加约 **8,000 字符**。工具 schema 已成为上下文开销来源。 | 1 条评论；CLOSED、`untriaged`，数据中未见对应修复信息。 |
| [#11473：Codemode 超出预算的工具不可见](https://github.com/earendil-works/pi/issues/11473) | 完整 TypeScript 声明消耗 `inlineBudget`，预算外工具则被省略。提议优先展示名称和描述，超预算时降级为仅名称，兼顾成本与工具发现。 | 1 条评论；CLOSED、`untriaged`。与 #11501 共同反映工具描述策略的不足。 |
| [#11497：同一 SQLite 文件的多个打开实例生成冲突 ID](https://github.com/earendil-works/pi/issues/11497) | 报告指出 `next_id` 只在打开时读取，后续在内存中递增，多个实例可能分配重复 ID。关系到共享存储和并发访问的可靠性。 | 1 条评论；CLOSED、`untriaged`。摘要未提供修复结论。 |
| [#11484：嵌套工具调用可能逃逸父级取消](https://github.com/earendil-works/pi/issues/11484) | 显式传入的 `AbortSignal` 替代父级信号，可能让父任务取消后子工具继续运行。需要明确扩展 API 的取消传播契约。 | 2 条评论；CLOSED、`untriaged`。诉求同时包含行为澄清与可能的语义调整。 |
| [#11492：LiteLLM 上下文溢出未被正确识别](https://github.com/earendil-works/pi/issues/11492) | LiteLLM 返回 HTTP 400 与 `ContextWindowExceededError`，现有检测可能无法归类为上下文溢出，影响相关处理流程。 | 1 条评论；CLOSED、`fix-available`；对应 PR #11494。 |
| [#11489：`pi update` 误判 vite+ 安装方式](https://github.com/earendil-works/pi/issues/11489) | 将 vite+ 安装识别成 npm，可能创建第二份全局安装，而非更新原有实例，带来 PATH 与版本分叉风险。 | 2 条评论；CLOSED、`untriaged`；有对应修复 PR #11491。 |
| [#11490：压缩后应保留留存区间内的系统更新](https://github.com/earendil-works/pi/issues/11490) | 请求保留压缩后仍留存的上下文区间中的系统消息及其原始位置，关注压缩前后的指令语义一致性。 | 1 条评论；CLOSED、`untriaged`。体现社区对“压缩不仅缩短文本，还需保留语义”的要求。 |

## 重要 PR 进展

以下 10 项中，**9 项 CLOSED、1 项 OPEN**；数据未提供合并状态，不能视为均已进入主干或发布版本。

| PR | 功能或修复内容 | 状态 |
|---|---|---|
| [#11486：会话写入失败时保持内存与文件一致](https://github.com/earendil-works/pi/pull/11486) | 针对写盘失败前已更新内存会话叶节点的问题，修正后续条目可能引用不存在父节点的情况；直接对应 P0 Issue #11460。 | CLOSED |
| [#11499：保留前缀的摘要请求](https://github.com/earendil-works/pi/pull/11499) | 提出改变摘要请求构造方式，以共享正常对话的 token 前缀，减少重复 prefill。与 #11500 对应，潜在收益集中在长会话成本与延迟。 | CLOSED |
| [#11494：识别 LiteLLM 上下文溢出错误](https://github.com/earendil-works/pi/pull/11494) | 扩展错误识别，覆盖 LiteLLM 预调用检查返回的 `ContextWindowExceededError`。 | CLOSED |
| [#11496：限制 OpenRouter 推理 token](https://github.com/earendil-works/pi/pull/11496) | 使用 `reasoning.max_tokens`；存在预算时不同时发送 `reasoning.effort`，并至少为最终答案保留 1,024 tokens。兼顾请求兼容性与输出预算。 | CLOSED |
| [#11491：支持 vite+ 全局安装的自更新](https://github.com/earendil-works/pi/pull/11491) | 增加 vite+ 安装路径识别，并使用 `vp update -g`，避免误走 npm 全局安装流程。 | CLOSED |
| [#11482：分支摘要传递 thinking level](https://github.com/earendil-works/pi/pull/11482) | 修复 `/tree` 的 “Summarize” 路径未实际使用会话 thinking level 的问题，使摘要请求与会话推理设置保持一致。 | CLOSED |
| [#11498：恢复完整扩展开发指南](https://github.com/earendil-works/pi/pull/11498) | 针对文档精简后丢失的 API 参考和工具指导，恢复完整指南并按当前源码校正，对扩展开发者价值较高。 | CLOSED |
| [#11477：降低滚动条绘制开销](https://github.com/earendil-works/pi/pull/11477) | 优化滚动条绘制路径，避免不必要的字素分割与字符串切片；对应长对话滚动性能反馈。现有摘要不足以确认优化后的具体收益。 | CLOSED |
| [#11467：调整 OpenAI 默认模型](https://github.com/earendil-works/pi/pull/11467) | 提议将 `openai` provider 默认模型从 `gpt-5.5` 改为 `gpt-6.1-sol`，回应 ChatGPT 订阅登录下原默认模型不可用的报告。 | CLOSED |
| [#11480：Radius MCP 将网页搜索作为直接工具](https://github.com/earendil-works/pi/pull/11480) | 提升网页搜索工具的可见性和可发现性，是本批次唯一仍开放的 PR。 | **OPEN** |

## 功能需求趋势

### 1. 上下文效率：减少 token，而不牺牲信息完整性
摘要缓存复用、Codex 缓存未命中、Codemode schema 膨胀形成共同主题：社区不仅关心上下文容量，更关心每轮请求的实际成本。同时，压缩后保留系统更新的需求说明，节省 token 不能以丢失指令语义为代价。  
参考：[摘要前缀 #11500](https://github.com/earendil-works/pi/issues/11500) · [工具描述开销 #11501](https://github.com/earendil-works/pi/issues/11501) · [系统更新保留 #11490](https://github.com/earendil-works/pi/issues/11490)

### 2. 会话可靠性：异常与并发场景成为重点
写入失败后的恢复、SQLite ID 分配、父子任务取消传播，均指向运行边界条件。需求正从“单次任务可运行”延伸到“长期会话、失败恢复和组合工具调用可预测”。  
参考：[恢复丢失工具 #11460](https://github.com/earendil-works/pi/issues/11460) · [SQLite 并发 #11497](https://github.com/earendil-works/pi/issues/11497) · [取消传播 #11484](https://github.com/earendil-works/pi/issues/11484)

### 3. 模型与代理兼容性：目录、路由和错误识别需持续维护
除 LiteLLM 错误识别外，社区还反馈 OpenCode 目录包含退役模型，并提出使用对话谱系 ID 进行缓存路由。维护范围已不只是“支持某家 API”，还包括模型生命周期与服务端会话语义。  
参考：[LiteLLM #11492](https://github.com/earendil-works/pi/issues/11492) · [OpenCode 目录 #11481](https://github.com/earendil-works/pi/issues/11481) · [缓存路由 #11479](https://github.com/earendil-works/pi/issues/11479)

### 4. 终端与扩展体验：输入焦点和交互一致性仍有摩擦
Linux 全屏右键粘贴、Kitty 菜单立即确认、扩展输入监听缺少焦点信息，以及滚动条性能，反映跨终端体验与扩展 UI 协作仍是改进方向。  
参考：[Linux 粘贴 #11464](https://github.com/earendil-works/pi/issues/11464) · [Kitty 菜单 #11458](https://github.com/earendil-works/pi/issues/11458) · [键盘焦点 API #11475](https://github.com/earendil-works/pi/issues/11475) · [滚动性能 #11461](https://github.com/earendil-works/pi/issues/11461)

## 开发者关注点

- **优先验证恢复与存储边界。** 使用长会话、共享 SQLite 文件或不稳定存储环境时，应重点测试写入失败、重新打开和恢复分支的行为。[#11460](https://github.com/earendil-works/pi/issues/11460) · [#11497](https://github.com/earendil-works/pi/issues/11497)
- **扩展工具要同时检查“描述大小”和“是否可见”。** 大型 schema 不仅增加请求体积，还可能挤占 Codemode 的工具展示预算。[#11501](https://github.com/earendil-works/pi/issues/11501) · [#11473](https://github.com/earendil-works/pi/issues/11473)
- **避免依赖未明确的扩展 API 语义。** 显式取消信号、工具列表重排、输入焦点归属都可能产生意外行为，需要单独验证。[#11484](https://github.com/earendil-works/pi/issues/11484) · [#11495](https://github.com/earendil-works/pi/issues/11495) · [#11475](https://github.com/earendil-works/pi/issues/11475)
- **安装与 CLI 兼容性值得纳入脚本测试。** vite+ 自更新误判和 `--opt=value` 不被接受，都会影响自动化部署及日常使用。[#11489](https://github.com/earendil-works/pi/issues/11489) · [#11474](https://github.com/earendil-works/pi/issues/11474)

**总体判断：**本日动态更偏向可靠性、成本控制和生态兼容性维护，而非大型新功能发布。对使用者而言，应优先跟踪 P0 会话恢复问题的实际发布进度；对扩展作者而言，工具描述预算、取消传播和 UI 焦点是最值得主动回归测试的边界。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报｜2026-10-28

> 数据来源：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)，范围为所提供的过去 24 小时更新记录。Release 摘要存在截断；PR 的 `CLOSED` 状态不等于已合并，以下不将其视为已上线功能。

## 1. 今日速览

Qwen Code 发布 **v0.26.2 正式版**及 **v0.26.3-preview.0 预览版**，其中 v0.26.2 包含 Web Shell 控制与工作目录提交方式的破坏性变更，升级前需要检查兼容性。[版本列表](https://github.com/QwenLM/qwen-code/releases)

开发重点继续向托管 Agent 平台能力扩展，包括独立 Git worktree、工作区回收复用和 Java 同上下文嵌入；与此同时，多 Agent 消息投递、模型会话恢复以及发布流水线稳定性成为主要风险点。[独立 worktree PR](https://github.com/QwenLM/qwen-code/pull/15745) · [多 Agent 问题](https://github.com/QwenLM/qwen-code/issues/15738)

## 2. 版本发布

| 版本 | 已知更新与注意事项 |
|---|---|
| [v0.26.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.26.2) | **破坏性变更**：简化 Managed Agent 的 Web Shell 控制，停止支持 `cwd submissions`（工作目录提交），对应 [#15616](https://github.com/QwenLM/qwen-code/pull/15616)。提供的完整变更列表被截断，无法进一步确认全部更新。 |
| [v0.26.3-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.26.3-preview.0) | 新增 memory 在 no-op 运行后可选择启用的提取节奏，见 [#13571](https://github.com/QwenLM/qwen-code/pull/13571)；另有外层 XML 调用恢复相关修复，但摘要不完整，不展开推断。 |
| [v0.26.2-preview.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.26.2-preview.1) | 新增会话级权限规则与 Auto approval，见 [#15448](https://github.com/QwenLM/qwen-code/pull/15448)；另有 serve token 解析加固，具体边界需查完整说明。 |
| [TypeScript SDK v0.1.24](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.24) | 发布说明首段标注捆绑 CLI **0.26.2**，但后文又出现 **0.26.1** 等重复段落。建议通过安装产物核验实际 CLI 版本，不宜只依赖摘要。 |

**发布状态提醒：**Release 条目存在不代表所有发布步骤均成功。v0.26.2 的 `publish`、`quality` 失败报告仍为 OPEN，nightly 也存在 `integration_docker` 失败记录；尚不能据此确认各分发渠道已全部就绪。[#15727](https://github.com/QwenLM/qwen-code/issues/15727) · [#15721](https://github.com/QwenLM/qwen-code/issues/15721) · [#15740](https://github.com/QwenLM/qwen-code/issues/15740)

## 3. 社区热点 Issues

以下 10 项综合考虑严重程度、影响范围和讨论情况，**并非按热度单一排序**。它们当前均为 OPEN，点赞均为 0；评论数量较少，暂不能认定形成广泛共识。

| Issue | 为什么值得关注 | 社区反应与状态 |
|---|---|---|
| [#15742：Anthropic 会话因 thinking 签名缺失持续返回 400](https://github.com/QwenLM/qwen-code/issues/15742) | 持久化历史中的 `thinking` 缺少 `thoughtSignature` 后，原生 Anthropic 接口会持续拒绝请求，直接影响会话恢复能力。 | **P1，2 条评论**，标记 `need-discussion`，是本批次优先级最高的用户侧故障。 |
| [#15748：子 Agent 收不到后台任务完成通知](https://github.com/QwenLM/qwen-code/issues/15748) | 通知仅送达顶层 Agent，可能触发多余对话、协作混乱；报告者还提到 OOM 风险。 | **P2，2 条评论**，已标记 `ready-for-human`，需要人工进一步处理。 |
| [#15738：Web Shell 的 Team mode 消息无法送达 leader](https://github.com/QwenLM/qwen-code/issues/15738) | ACP 模式下队友消息无法交付，团队还会随短生命周期 ACP 子进程结束，影响实验性多 Agent 工作流的可用性。 | **P2，2 条评论**，标记 `ready-for-human`，涉及 core、Web Shell 和多 Agent 路线。 |
| [#15741：MCP 重名工具导致整个服务被丢弃](https://github.com/QwenLM/qwen-code/issues/15741) | 单个工具命名冲突被放大为服务器整体不可用，同时输出误导性的“无工具”错误，增加集成排障成本。 | **P2，2 条评论**；报告提供了 v0.26.2 与 Unity MCP 环境信息。 |
| [#15704：stream-json 在拒绝请求后重放上一条答案](https://github.com/QwenLM/qwen-code/issues/15704) | 会话 token 上限或提示词被拦截时仍可能返回旧答案，容易让 SDK、自动化程序把历史结果误判为当前结果。 | **P2，2 条评论**；报告将问题扩展到既有缺陷的其他预发送拒绝路径。 |
| [#15747：code-server 中 Companion 无法连接 daemon](https://github.com/QwenLM/qwen-code/issues/15747) | 暴露浏览器版远程 VS Code 与 daemon 通信的适配缺口，影响远程开发用户。 | **P3，2 条评论**，归类为增强需求，并纳入 IDE 集成方向。 |
| [#15702：daemon SDK 需要会话级模型选择](https://github.com/QwenLM/qwen-code/issues/15702) | 希望后台或定时会话使用独立模型，而不修改工作区默认设置，并通过能力检测控制兼容性。 | **P2，2 条评论**，属于明确的 SDK 功能请求。 |
| [#15697：Web Shell 200 条历史记录测试超时](https://github.com/QwenLM/qwen-code/issues/15697) | 相同断言在两个无关 PR 上失败，提示测试稳定性或等待机制问题，可能拖慢正常变更交付。 | **P2，4 条评论**，是所列 Issues 中评论最多的一项，并标记 `welcome-pr`。 |
| [#15706：Java 托管 worker 故障门禁测试不稳定](https://github.com/QwenLM/qwen-code/issues/15706) | 测试涉及缺失证明的 worker 是否仍能进入 READY，关系到托管运行时恢复与准入约束。当前证据是间歇性测试失败，不能直接等同于生产漏洞。 | **P2，2 条评论**，标记 `ready-for-human`。 |
| [#15727：v0.26.2 发布流程的 publish 阶段失败](https://github.com/QwenLM/qwen-code/issues/15727) | 正式版本已出现 Release 条目，但发布作业失败，升级和分发完整性仍需核验。 | **1 条评论**，标记 `autofix/in-progress`；状态仍为 OPEN，尚无完成结论。 |

## 4. 重要 PR 进展

> 提供的 PR 评论数均为 `undefined`，无法据此比较讨论热度；以下按技术影响挑选。

| PR | 当前状态 | 功能或修复内容 |
|---|---|---|
| [#15745：主会话独立 Git worktree](https://github.com/QwenLM/qwen-code/pull/15745) | **OPEN** | 允许 Managed 主会话选择独立 worktree，保留当前目录模式作为默认；在 Runtime 启动前固定本地提交和最终工作目录，强化任务隔离。 |
| [#15729：常驻工作区回收与复用](https://github.com/QwenLM/qwen-code/pull/15729) | **OPEN** | 推进 resident workspace 的回收和复用，指向长驻运行时的资源管理优化；具体行为边界仍需完整 PR 验证。 |
| [#15718：Java 同上下文嵌入](https://github.com/QwenLM/qwen-code/pull/15718) | **OPEN** | 支持选择性地将 Managed Agent 嵌入宿主现有 JVM 与 Spring 上下文，并支持独立连接池或显式 DataSource。 |
| [#15720：Generated UI 按客户端能力开放](https://github.com/QwenLM/qwen-code/pull/15720) | **OPEN** | 仅向能够渲染 MCP Apps 的客户端提供 Generated UI，并通过 daemon 的 ACP bridge 声明宿主能力，避免客户端拿到无法展示的界面。 |
| [#15746：验证报告绑定对应轮次快照](https://github.com/QwenLM/qwen-code/pull/15746) | **OPEN** | 将 `/verify-pr` 的每轮报告固定到实际检查的 head，避免后续验证轮次改变早期报告的判定依据。 |
| [#15743：向 CLI 沙箱传递 workflow 开关](https://github.com/QwenLM/qwen-code/pull/15743) | **OPEN** | 将工作流启停环境变量加入容器转发白名单，使沙箱内 CLI 遵循操作者配置；关联 nightly 失败报告 #15740。 |
| [#15730：发布 checkout 使用 job token](https://github.com/QwenLM/qwen-code/pull/15730) | **OPEN** | checkout 改用自动 GitHub token，bot PAT 仅保留在确需写权限的步骤，调整发布认证路径并缩小长期凭据使用范围。 |
| [#15734：CI 重试固定触发时的 head SHA](https://github.com/QwenLM/qwen-code/pull/15734) | **CLOSED** | 四条 PR CI 流水线固定到触发事件记录的提交，避免 checkout 时解析移动中的 PR head，提升结果可复现性；未提供合并信息。 |
| [#15723：OpenTUI 正常键盘退出返回 0](https://github.com/QwenLM/qwen-code/pull/15723) | **OPEN** | 确认后的键盘退出返回成功状态，与 Ink 对齐；保留两次确认保护、清理顺序和真实信号退出码。 |
| [#15716：保留 OpenTUI 扩展更新状态](https://github.com/QwenLM/qwen-code/pull/15716) | **CLOSED** | 修复扩展更新操作与提示状态丢失，包括显示 Update Now、完成后移除过期操作及呈现实际检查消息；未提供合并信息。 |

## 5. 功能需求趋势

从本批全部 Issue 看，当前关注点更多是**现有能力的可靠性与集成完整性**，而非大量新增功能请求。

- **多 Agent 通信与生命周期管理**：子 Agent 通知、leader 消息接收和 ACP 子进程生命周期同时暴露问题，说明复杂协作场景需要更完整的端到端保障。[#15748](https://github.com/QwenLM/qwen-code/issues/15748) · [#15738](https://github.com/QwenLM/qwen-code/issues/15738)
- **远程 IDE 与 daemon SDK 集成**：需求从本地交互延伸到浏览器 IDE、后台任务和定时会话；远程可达性与会话级配置成为关键能力。[#15747](https://github.com/QwenLM/qwen-code/issues/15747) · [#15702](https://github.com/QwenLM/qwen-code/issues/15702)
- **模型协议兼容与可恢复会话**：关注点不是“新增模型”，而是已有提供方的历史数据兼容，以及错误路径下输出语义是否可靠。[#15742](https://github.com/QwenLM/qwen-code/issues/15742) · [#15704](https://github.com/QwenLM/qwen-code/issues/15704)
- **MCP 容错与可诊断性**：工具冲突应被局部处理，错误信息也需要准确指向原因，避免把集成问题升级为整个服务不可用。[#15741](https://github.com/QwenLM/qwen-code/issues/15741)
- **CI、发布与托管运行时可信度**：Web Shell 超时、Java 故障门禁和多次发布失败共同表明，交付稳定性仍占据显著工程注意力。[#15697](https://github.com/QwenLM/qwen-code/issues/15697) · [#15706](https://github.com/QwenLM/qwen-code/issues/15706) · [#15727](https://github.com/QwenLM/qwen-code/issues/15727)

## 6. 开发者关注点

1. **错误应可恢复，而非让会话持续失效。** Anthropic 历史签名缺失会导致持续 400；开发者需要明确的检测、修复或恢复路径。[#15742](https://github.com/QwenLM/qwen-code/issues/15742)
2. **自动化输出必须可信。** 拒绝请求后重放旧答案会污染下游判断，应重点回归 token 上限、提示词拦截等异常分支。[#15704](https://github.com/QwenLM/qwen-code/issues/15704)
3. **多 Agent 不仅要能启动，还要保证消息送达。** 后台完成通知、团队通信和进程退出行为，是投入真实任务前的重要验证项。[#15748](https://github.com/QwenLM/qwen-code/issues/15748) · [#15738](https://github.com/QwenLM/qwen-code/issues/15738)
4. **减少 CI 偶发失败与发布告警噪声。** 除测试超时外，“重跑成功但失败 Issue 未关闭”也增加维护成本；对应问题已 CLOSED，但不能仅凭关闭状态断言代码修复已发布。[#15697](https://github.com/QwenLM/qwen-code/issues/15697) · [#15705](https://github.com/QwenLM/qwen-code/issues/15705)
5. **升级前核对接口变化与实际分发版本。** 使用 Web Shell、Managed Agent 或 TypeScript SDK 的团队，应优先检查 v0.26.2 破坏性变更、发布作业状态和 SDK 实际捆绑版本。[破坏性变更](https://github.com/QwenLM/qwen-code/pull/15616) · [发布失败记录](https://github.com/QwenLM/qwen-code/issues/15727) · [SDK 发布说明](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.24)

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-10-28**

> **数据口径**：本期依据提供的 9 条 Issue、15 条 PR 及其摘要整理。数据来源标注为 `Hmbown/DeepSeek-TUI`，但条目均指向 `codewhale-hq/Codewhale`，以下链接按条目所示仓库生成。部分记录的更新日期为 10 月 27 日，仍纳入本期数据窗口；PR 的 `CLOSED` 状态不等于已合并。

## 一、今日速览

本期重点是 **v0.10.3／main 的本地 Ollama 使用链路与多入口一致性**：问题覆盖第二轮对话失败、桌面端误选 embedding 模型，以及 `exec`、`doctor` 未沿用 TUI 的无密钥配置。另有 Fleet 子进程启动、会话持久化及远程控制错误展示问题，直接影响自动化与使用可靠性。

过去 24 小时无新 Release；PR 活动主要集中于稳定性、模型目录元数据、安装效率和多语言体验。

## 二、社区热点 Issues

本期仅提供 **9 条 Issue**，因此全部列出，不补足不存在的第 10 条。整体互动量较低：仅 3 条有评论，所有条目均为 0 👍；以下优先级依据影响面，而非讨论热度。

| Issue | 状态 | 核心问题与关注价值 | 社区反应 |
|---|---|---|---|
| [#7113：Ollama 32K 模型第二轮失败](https://github.com/codewhale-hq/Codewhale/issues/7113) | OPEN | 本地模型虽标称 32K，上报的输入预算却约为 5K；上下文恢复摘要因长度截断而失败。标题标注为 #5820 的回归，直接阻断连续对话。 | **3 条评论，本期讨论最多**；尚无已解决信息。 |
| [#7119：Fleet worker 依赖 PATH 中的 `codewhale`](https://github.com/codewhale-hq/Codewhale/issues/7119) | OPEN | worker 未使用当前运行二进制，而是从 PATH 查找命令；桌面 Engine 或绝对路径启动场景下，可能所有 worker 都无法启动。影响并行任务执行。 | 1 条评论；摘要提供了受限 PATH 下的复现场景。 |
| [#7116：桌面 Ollama 默认选到 embedding 模型](https://github.com/codewhale-hq/Codewhale/issues/7116) | OPEN | “Default”解析为 `nomic-embed-text`，已安装聊天模型却未列出。模型类型识别和候选列表异常，会破坏首次使用体验。 | 0 条评论；提供了隔离配置环境及模型组合。 |
| [#7115：`exec`、`doctor` 仍要求 DeepSeek 密钥](https://github.com/codewhale-hq/Codewhale/issues/7115) | OPEN | TUI 可自动采用本地 Ollama，但无头执行与诊断入口仍要求云端密钥。交互模式可用不代表脚本与诊断可用。 | 0 条评论；报告给出了命令行错误。 |
| [#7098：Windows junction 导致会话保存失败](https://github.com/codewhale-hq/Codewhale/issues/7098) | CLOSED | 状态目录经 junction 迁移到其他卷后无法保存会话，涉及对话持久化与跨卷路径兼容性。 | 0 条评论；已关闭，但摘要未说明关闭原因或修复版本。 |
| [#7118：任务未与 CLI tracker 同步](https://github.com/codewhale-hq/Codewhale/issues/7118) | OPEN | 多轮对话后，任务列表与模型侧任务跟踪状态不一致，降低长任务进度的可信度。 | 0 条评论；描述提及 0.10.3，复现环境写为 0.10.2，版本仍需核实。 |
| [#7120：`/rc` 失败原因在提示消失后丢失](https://github.com/codewhale-hq/Codewhale/issues/7120) | OPEN | 启动失败原因仅展示约 12 秒；之后 main 的状态显示为 `off`，0.10.2 的页脚仅显示失败。关键诊断信息缺乏持久可见性。 | 0 条评论；报告对比了 main 与 0.10.2 行为。 |
| [#7114：Provider 浏览切换及遗留项异常](https://github.com/codewhale-hq/Codewhale/issues/7114) | OPEN | `/provider` 的“browse all”无法切换，新配置环境还出现失效的 Antigravity legacy 条目。影响供应商发现与配置清晰度。 | 0 条评论；包含无密钥、本地 Ollama 运行场景。 |
| [#7102：安装器重复下载并安装相同二进制](https://github.com/codewhale-hq/Codewhale/issues/7102) | CLOSED | 别名对应同一二进制时仍重复下载、重复安装，增加带宽和磁盘成本。 | 1 条评论；存在对应 PR #7107，但不能仅凭关闭状态确认修复已发布。 |

## 三、重要 PR 进展

以下精选 10 项。**“已关闭”仅表示提供的数据状态，不代表已合并或已随版本发布。**

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| [#7117：保留 setup checkpoint](https://github.com/codewhale-hq/Codewhale/pull/7117) | **OPEN** | 针对第二实例运行时的初始化状态保存问题，并涉及 Windows 路径、写入失败与 `doctor` 状态不一致；摘要称覆盖同类报告中的四项缺陷。 |
| [#7100：避免已结束回合阻塞会话保存](https://github.com/codewhale-hq/Codewhale/pull/7100) | CLOSED | 处理流式响应中断、重试后推理片段未正常结束，进而阻塞会话保存的问题，重点防止保存状态静默停滞。 |
| [#7105：读取实时模型目录中的 token 上限](https://github.com/codewhale-hq/Codewhale/pull/7105) | CLOSED | 让通用 `/v1/models` 解析分支读取供应商声明的上下文与输出上限，减少模型预算信息缺失。不能据此认定 #7113 已获修复。 |
| [#7099：供应商迁移域名后继承模型信息](https://github.com/codewhale-hq/Codewhale/pull/7099) | CLOSED | 修正 OpenCode Go 实时目录地址与 models.dev 地址不一致时，模型元数据无法继承的问题。 |
| [#7107：避免重复下载相同安装资产](https://github.com/codewhale-hq/Codewhale/pull/7107) | CLOSED | 当 `codewhale` 与 `codew` 资产具有相同 SHA-256 时，复用已验证下载，针对 #7102 中的重复传输成本。 |
| [#7121：本地化 `/undo` 反馈](https://github.com/codewhale-hq/Codewhale/pull/7121) | **OPEN** | 将硬编码英文反馈接入展示层，覆盖 15 个完整语言包，延续 `/diff` 的本地化路径。 |
| [#7101：本地化 `/diff` 反馈](https://github.com/codewhale-hq/Codewhale/pull/7101) | CLOSED | 将 9 条用户可见消息及分页器标题接入现有本地化与类型化诊断映射，覆盖 15 个完整语言包。 |
| [#7110：修正 `/cache` 未上报数据的合计展示](https://github.com/codewhale-hq/Codewhale/pull/7110) | CLOSED | 避免将没有缓存遥测的数据合计显示为 0，区分“未上报”和“确实为零”，提升指标可解释性。 |
| [#7103：缩短路径时保留工作区目录名](https://github.com/codewhale-hq/Codewhale/pull/7103) | CLOSED | 调整 `/context` 窄窗口中的路径截断，避免保留根路径却丢失最有辨识度的当前工作区名称。 |
| [#7109：保持 Windows 下 DSH 文件校验字节一致](https://github.com/codewhale-hq/Codewhale/pull/7109) | CLOSED | 防止 Git checkout 将目标 JavaScript 文件转换为 CRLF，导致 Windows extension-host CI 的固定 SHA-256 校验失败。 |

## 四、功能需求趋势

本期 Issue 以缺陷报告为主，趋势更偏向**现有能力可靠性**，而非新增功能投票。

1. **本地模型从“能连接”走向“全链路可用”**  
   社区关注点已延伸至正确筛选聊天模型、准确计算上下文预算，以及多轮对话稳定性。  
   关联：[第二轮失败 #7113](https://github.com/codewhale-hq/Codewhale/issues/7113)、[模型误选 #7116](https://github.com/codewhale-hq/Codewhale/issues/7116)。

2. **TUI、CLI、桌面与子进程共享一致配置**  
   无密钥供应商选择、可执行文件定位不应因入口而改变，否则会阻碍脚本化和 Fleet 工作流。  
   关联：[`exec`／`doctor` #7115](https://github.com/codewhale-hq/Codewhale/issues/7115)、[Fleet #7119](https://github.com/codewhale-hq/Codewhale/issues/7119)。

3. **状态可信与数据持久化**  
   任务状态同步、Windows 跨卷会话保存，反映开发者对长时间工作过程可追踪、可恢复的需求。  
   关联：[任务同步 #7118](https://github.com/codewhale-hq/Codewhale/issues/7118)、[Windows 保存 #7098](https://github.com/codewhale-hq/Codewhale/issues/7098)。

4. **可诊断性与首次配置体验**  
   错误原因需要可回查，供应商列表需要清晰有效，安装流程应避免冗余成本。  
   关联：[`/rc` #7120](https://github.com/codewhale-hq/Codewhale/issues/7120)、[Provider 列表 #7114](https://github.com/codewhale-hq/Codewhale/issues/7114)、[安装器 #7102](https://github.com/codewhale-hq/Codewhale/issues/7102)。

## 五、开发者关注点

- **优先验证完整工作流，而非单次成功。** Ollama 首轮可用但第二轮失败，说明回归测试需要覆盖上下文压缩与连续对话。[#7113](https://github.com/codewhale-hq/Codewhale/issues/7113)
- **减少对隐式环境的依赖。** 桌面和绝对路径安装不一定具备 shell 中的 PATH；子进程启动应重点验证这些环境。[#7119](https://github.com/codewhale-hq/Codewhale/issues/7119)
- **错误与状态应可持续查询。** 短时 toast、`off` 状态或不同步的任务列表，都不足以支持故障排查。[#7120](https://github.com/codewhale-hq/Codewhale/issues/7120)、[#7118](https://github.com/codewhale-hq/Codewhale/issues/7118)
- **将持久化失败视为高风险问题。** 会话保存、初始化 checkpoint 和中断恢复都涉及工作成果保留，应优先核验修复与回归结果。[#7098](https://github.com/codewhale-hq/Codewhale/issues/7098)、[PR #7117](https://github.com/codewhale-hq/Codewhale/pull/7117)、[PR #7100](https://github.com/codewhale-hq/Codewhale/pull/7100)

**综合判断：本期最值得跟踪的是本地 Ollama 多轮稳定性、多入口配置一致性与会话保存可靠性；目前数据不足以确认这些问题已在可安装版本中解决。**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*