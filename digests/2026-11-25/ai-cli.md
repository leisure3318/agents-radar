# AI CLI 工具社区动态日报 2026-11-25

> 生成时间: 2026-11-25 04:47 UTC | 覆盖工具: 9 个

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
**日期：2026-11-25｜基于所提供的社区动态摘要**

## 1. 生态全景

AI CLI 工具的竞争重心正在从“接入更多模型、增加工具调用”转向**执行可靠性、安全边界和长任务治理**。MCP、Skills、ACP 与多 Agent 能力持续扩展，但认证恢复、权限一致性、子任务终态和上下文成本成为跨项目的共同难题。产品形态也在超越纯终端：桌面端、远程控制、Web Shell 和嵌入式 SDK 正在扩展使用场景，同时增加状态同步与跨平台兼容成本。当前样本反映出明确的工程化方向，但各项目数据覆盖和社区互动量差异较大，不能仅凭 Issue、PR 或发布数量判断产品质量与市场地位。

## 2. 各工具活跃度对比

**统计说明：**下表区分窗口总量与展示样本；“更新数量”不等于当日新增数量。PR 关闭不代表合并，发布数量也不代表功能增量。

| 工具 | 今日更新 Issues | 今日更新 PR | Release 情况 |
|---|---:|---:|---|
| **Claude Code** | 未明确总量；摘要提及 50 条记录，未完整展示 | **0** | **1 个：v2.1.332**，新增 MCP Skills Beta、`PreSkillShellCommand` Hook |
| **OpenAI Codex** | 展示 **30** 条，总量未提供 | 展示 **20** 条，总量未提供 | **4 个 Alpha**：0.174.0-alpha.2–5；变更正文不足 |
| **Gemini CLI** | **10** | **12** | 无新 Release；Nightly 发布失败标记为 **P0** |
| **GitHub Copilot CLI** | **8** | **0** | 列出 **4 个 v1.0.116-* 版本**；v1.0.115 为 11 月 23 日背景版本 |
| **Kimi Code CLI** | **0** | **0** | 过去 24 小时无活动 |
| **OpenCode** | 展示 **30** 条，总量未提供 | 展示 **20** 条，总量未提供 | 无新 Release |
| **Pi** | **26** | **17** | 无新 Release |
| **Qwen Code** | **34**，展示 30 条 | **46**，展示 20 条 | 无新 Release |
| **DeepSeek TUI / Codewhale** | **0** | **35**，展示 20 条 | 无新 Release；**0.10.5 发布准备 PR 开放中** |

> **来源注意：**Pi 的条目链接指向 `earendil-works/pi`，DeepSeek TUI 的 PR 指向 `codewhale-hq/Codewhale`；对比和后续跟踪时应先核对仓库归属。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与横向判断 |
|---|---|---|
| **多 Agent 协作与生命周期管理** | Claude Code、Codex、Copilot CLI、DeepSeek TUI / Codewhale | Claude 请求共享任务工具；Codex 关注停止条件与子代理详情；Copilot 报告子会话挂起、消息误路由；Codewhale 推进中断与取消语义统一。重点从“启动子 Agent”转向**可观察、可停止、结果归属正确**。 |
| **MCP 接入与认证可靠性** | Claude Code、Codex、Gemini CLI、Copilot CLI、OpenCode、Pi | 包括技能发现、会话过期恢复、令牌目标校验、重复连接提示、OAuth 刷新 scope 和无状态协议支持。MCP 正从接入能力进入**长期运行与企业部署治理**阶段。 |
| **安全策略覆盖完整执行链路** | Gemini CLI、Copilot CLI、OpenCode、Pi、Qwen Code、Codewhale；Claude 新增相关 Hook | Shell 命令替换、包装命令、读取与备份、Bash 写入、Skills 上下文注入等都在暴露边界问题。仅验证“主工具是否拒绝执行”已不足够。 |
| **上下文、成本与存储治理** | Claude Code、Codex、Gemini CLI、OpenCode、Pi | 涉及子 Agent 重复上下文、归档增长、图片挤占保留预算、重试次数、输出上限、压缩循环与日志裁剪。需求从“大窗口”转向**资源预算可预测**。 |
| **长会话与工作流连续性** | Claude Code、Gemini CLI、Codex、Copilot CLI、OpenCode、Codewhale | 会话分支、重启恢复、worktree 路径一致性、异步任务终态和持久化竞态均是重点。工具需要保留的不只是聊天记录，还包括完整执行状态。 |
| **终端与编辑器交互可靠性** | Codex、Gemini CLI、Copilot CLI、Qwen Code、Pi | Markdown 围栏、多行粘贴、长输出保留、配置三态和 Windows Shell 选择等基础体验持续修补。跨终端、跨宿主一致性仍是实际部署门槛。 |

## 4. 差异化定位分析

以下为**基于本期动态的侧重判断**，并非对各工具全部能力的完整评测。

| 工具 | 功能与技术路线侧重 | 更相关的目标用户 / 场景 |
|---|---|---|
| **Claude Code** | MCP Skills 与 Hook 扩展；同时强化桌面、远程控制、多 Agent 和 worktree 工作流 | 需要复杂项目协作、远程开发及技能定制的团队 |
| **OpenAI Codex** | TUI 与桌面体验并进，涉及自主目标、企业身份认证、自定义网关和 MCP 容错 | 重视终端生产力、企业接入和长任务自动执行的用户 |
| **Gemini CLI** | 认证来源、A2A 路由及 Shell 策略加固；推进原生会话分支 | 需要 MCP/A2A 集成、可逆探索与安全策略控制的开发者 |
| **GitHub Copilot CLI** | ACP 编辑器协作、组织管理 MCP 和跨平台沙箱；改善会话状态与认证交互 | 已采用 GitHub/Copilot，并希望连接编辑器与 CLI 的团队 |
| **Kimi Code CLI** | 本窗口无活动，无法据此判断路线变化 | 需结合更长周期数据评估 |
| **OpenCode** | 自定义 Provider、Code Mode、可嵌入 SDK、Workerd 远程执行与云端产物插件 | 需要模型选择自由、插件扩展或自建 Agent 基础设施的团队 |
| **Pi** | 多 Provider 协议适配、工具调用回放、扩展 API 与 Durable 持久化 | 构建自定义 harness、模型适配层或生产 Agent 的开发者 |
| **Qwen Code** | Managed Agent、Java/Spring 集成、Web Shell、Harness 和 microVM 执行 | 将 Agent 嵌入业务系统，尤其涉及 Java、百炼和中文代码库的团队 |
| **DeepSeek TUI / Codewhale** | 外部 ACP Agent 选择、插件宿主、运行时安全与会话恢复 | 希望在统一界面中使用多个 Agent，并定制运行时能力的用户 |

**关键分化：**一部分工具侧重完整开发入口与交互体验，另一部分更明显地向**可嵌入、可编排的 Agent 基础设施**发展；两条路线正在交汇，但部署复杂度和维护责任并不相同。

## 5. 社区热度与成熟度

### 活跃度：应分开看开发、讨论和发布

- **开发更新突出：Qwen Code。**明确窗口数据为 **46 条 PR、34 条 Issue**，是已提供明确总量的项目中最突出的；但大量内容围绕 CI、发布链路和嵌入接口，不能直接换算成用户功能交付。
- **开发侧密集、讨论侧不可判断：DeepSeek TUI / Codewhale。**有 **35 条 PR 更新、0 条 Issue 更新**，更像发布前集中收尾，而非社区需求集中爆发。
- **持续工程迭代明显：Codex、OpenCode、Pi。**三者均覆盖协议兼容、运行可靠性与平台适配；前两者只有展示样本，不宜据此与窗口总量直接排名。
- **发布节奏密集：Codex、Copilot CLI。**均列出 4 个版本，但 Codex 为 Alpha，Copilot 相邻版本摘要部分重复，**发布密度不等于已验证的稳定性提升**。
- **Kimi 的单日静默不构成长期低活跃结论。**

### 社区讨论：多数项目仍是低互动样本

Qwen 的 E2E 与 Java 检查问题分别有 **26、13 条评论**，但其中包含 CI 排障背景；OpenCode 展示样本最高为 **6 条评论**，Codex 为 **4 条**，Pi 为 **3 条**。Claude、Gemini 和 Copilot 的相关条目整体互动更低，因此应以**复现质量、潜在影响和维护者处置**排序，而非把低评论数解读为低风险。

### 成熟度：已有生产化诉求，但关键边界仍需验证

企业认证、沙箱、审计、持久化和资源治理的集中出现，说明这些工具正在承接更复杂的真实工作流；与此同时，权限绕过疑虑、静默失败、无限重试与终态失真表明，**功能覆盖不能替代生产可控性**。现有数据不足以给出可信的统一成熟度排名。

## 6. 值得关注的趋势信号

### ① Agent 的“完成”正在成为必须验证的执行契约
Codex 的越过交付点、Copilot 的重复最终回答和 Codewhale 的停止语义工作，共同说明完成信号并不天然可靠。

**开发者参考：**自动化系统应独立定义停止条件、验收标准、超时和预算，不能只依赖自然语言中的“已完成”。

### ② 安全边界正在前移，并扩展到执行后的数据留存
Qwen 的 Skills 信任反馈涉及内容进入上下文前的控制；Copilot 的报告涉及被拒绝文件的快照备份；Gemini 则关注认证令牌发送目标。

**开发者参考：**安全评估应覆盖“输入与技能加载—工具执行—网络请求—日志与备份”全链路，而非只检查命令审批。

### ③ 协议互通成为基础设施，但实现语义仍不统一
MCP、ACP、A2A 以及兼容模型接口持续扩展；Pi 的字段回放、OpenCode 的刷新 scope、Copilot 的异步终态问题说明，协议名称相同不代表边缘行为一致。

**开发者参考：**选型时增加过期恢复、流式工具调用、取消和异步完成测试，不要只验证首次连接成功。

### ④ 成本管理将从 token 统计扩展到运行预算
重复上下文、重试、压缩、工具定义和日志存储都可能形成隐性成本，而且部分问题会在长任务中放大。

**开发者参考：**同时跟踪单次成功任务的 token、重试次数、耗时、日志体积和人工恢复成本，而不只比较模型单价。

### ⑤ CLI 正在成为多宿主 Agent 系统的一种入口
桌面、Web Shell、SDK、远程执行和外部 Agent 选择同步发展，意味着底层执行服务与前端界面正在分离。

**开发者参考：**长期集成应优先评估稳定公共 API、状态持久化、权限传递和宿主隔离，避免依赖内部包或特定界面行为。

---

**决策结论：**本期最值得优先验证的不是“哪个工具功能最多”，而是**哪一个能在你的环境中保持权限正确、长任务可控、失败可恢复、成本可解释**。建议以真实仓库开展小规模灰度，把多 Agent 终态、MCP 过期恢复、敏感文件保护和长会话资源预算列为共同准入项。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-25｜基于所提供的 20 条 PR、15 条 Issue**

> **数据口径：**所有展示 PR 的评论数均为 `undefined`、👍 均为 0，因此无法验证“评论热度排行”。下文以 **关联 Issue 热度、问题影响范围及更新情况**筛选重点关注项，不代表真实评论排名。所有展示 PR 均为 **OPEN**，没有已合并或 Draft 的有效标记。

## 1. 热门 Skills 排行：8 个重点关注项

| 关注序位 | Skill / PR | 功能与关注焦点 | 当前状态 |
|---|---|---|---|
| 1 | **skill-creator** — [#1298](https://github.com/anthropics/skills/pull/1298) | 用于创建、评估和优化 Skill。此次修复评估进程隔离、Windows 兼容及运行失败处理；核心问题是**评估错误可能被误判为“不触发”**。相关 [#556](https://github.com/anthropics/skills/issues/556) 有 13 条评论，[#1352](https://github.com/anthropics/skills/issues/1352) 有 6 条，讨论信号最明确。 | **OPEN**；9 月 16 日更新 |
| 2 | **docx** — [#1792](https://github.com/anthropics/skills/pull/1792) | 处理 Word 文档；修复 LibreOffice 超时仍报告成功的问题，并验证修订标记是否真正清除。关注点是**文档操作能否可靠完成，而非仅返回成功**。另有 XML 损坏反馈 [#2018](https://github.com/anthropics/skills/issues/2018)。 | **OPEN**；11 月 1 日更新 |
| 3 | **webapp-testing** — [#1980](https://github.com/anthropics/skills/pull/1980) | 支持 Web 应用测试及服务启动；提议避免使用 `shell=True`，降低用户或 Agent 命令字符串带来的命令注入风险。属于**测试工具执行安全**议题，不能据此认定已发生攻击。 | **OPEN**；11 月 1 日更新 |
| 4 | **mcp-builder** — [#1742](https://github.com/anthropics/skills/pull/1742) | 支持 MCP 服务开发与连接；适配 MCP 2.x 的 `streamable_http_client` 导入及自定义 HTTP Header 配置。关注点是**依赖升级后的兼容性与鉴权连接**。 | **OPEN**；10 月 8 日更新 |
| 5 | **xlsx** — [#2019](https://github.com/anthropics/skills/pull/2019) | 处理电子表格与重算；补齐工作表级命名和别名引用的检查，避免遗漏间接引用的外部链接。关注点是**复杂表格的风险检测完整性**。 | **OPEN**；11 月 3 日更新 |
| 6 | **Notion Spec to Implementation** — [#1245](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品／技术规格转为任务、验收标准及进度跟踪，衔接 Claude Code 实现。体现**从需求文档到执行计划的工作流自动化**；同一 PR 还包含简历审计 Skill，不能将其关注度单独归给 Notion。 | **OPEN**；10 月 15 日更新 |
| 7 | **Pyxel** — [#525](https://github.com/anthropics/skills/pull/525) | 面向 Python 复古游戏开发，覆盖实现、调试、无头输入运行、画面检查及状态验证。特色是**开发与可验证运行结果结合**，但长期开放不等于即将合并。 | **OPEN**；3 月提交，11 月 1 日更新 |
| 8 | **md2video-audio** — [#1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经幻灯片流程转为带配音的 MP4。体现**文档到多媒体内容生产**的扩展方向；“零成本”“专业级”等属于提交者描述，尚无独立验证。 | **OPEN**；9 月 15 日更新 |

**整体判断：**入选项中，既有新场景扩展，也有基础能力修补；目前更明确的社区讨论证据集中于 **Skill 创建评估与使用可靠性**，而不是某个新 Skill 的人气爆发。

## 2. 社区需求趋势

### ① 安全、来源可信与 Agent 治理
- [#492](https://github.com/anthropics/skills/issues/492)：**46 条评论、3 👍**，为所展示 Issue 中评论最多的一项。讨论社区 Skill 使用 `anthropic/` 命名空间可能造成的官方身份误认与信任边界问题。
- [#412](https://github.com/anthropics/skills/issues/412)：提出 **agent-governance**，覆盖策略执行、威胁检测、信任评分和审计轨迹；Issue 已关闭，**不能据此认定已实现**。

**趋势：**社区不仅需要更多 Skill，也需要可辨别的来源、权限边界和治理机制。

### ② 组织级共享与分发管理
- [#228](https://github.com/anthropics/skills/issues/228)：**17 条评论、8 👍**，希望组织内直接共享 Skill，替代下载文件、聊天工具转发和逐人上传。
- [#189](https://github.com/anthropics/skills/issues/189)：**6 条评论、9 👍**，反馈插件内容重复，导致重复 Skill 进入上下文。

**趋势：**需求从个人使用走向团队资产管理，重点是共享、去重与分发体验，而非新增某项业务技能。

### ③ 可验证的 Skill 触发与输出质量
- [#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)：集中反馈触发率为零或并发评估假阴性。
- [#1385](https://github.com/anthropics/skills/issues/1385)：提出“任务前校准 → 对抗式审查 → 交付验证”三阶段质量门禁，**8 条评论**，截至 11 月 25 日仍有更新。
- [#2064](https://github.com/anthropics/skills/issues/2064)：要求描述明确说明“何时使用”，而不只是“能做什么”。

**趋势：**最明确的新方向是**审查与交付验证流程**；现有样本不足以证明“代码审查”或“测试生成”已形成独立热点。

### ④ 长任务记忆与上下文效率
- [#1329](https://github.com/anthropics/skills/issues/1329)：**10 条评论**，提出 compact-memory，以紧凑符号表示长运行 Agent 的状态。
- [#1487](https://github.com/anthropics/skills/issues/1487)：反馈 `claude-api` 一次注入约 156k tokens，耗尽上下文。

**趋势：**社区期待更轻量的记忆表示、按需加载及更低的上下文开销。

### ⑤ 文档处理的完整性
- [#2018](https://github.com/anthropics/skills/issues/2018)：反馈 DOCX 合并操作可能写出无效 XML；与 [#1792](https://github.com/anthropics/skills/pull/1792) 的结果验证修复相呼应。

**趋势：**文档能力的重点正从“生成得出来”转向“文件不损坏、结果可核验”。

> **范围提醒：**[#1143](https://github.com/anthropics/skills/issues/1143) 虽有 20 👍，但讨论的是账户邮箱变更，属于平台需求，不应计入 Skills 新方向热度。

## 3. 高潜力待合并 Skills

**无法确认哪些 PR“评论活跃”或“近期会合并”**：评论字段缺失，且没有评审、CI、维护者确认等信息。以下是按问题价值和更新情况筛选的观察名单。

| 候选 | 值得跟踪的原因 | 落地判断边界 |
|---|---|---|
| **skill-creator 打包执行修复 — [#1681](https://github.com/anthropics/skills/pull/1681)** | 11 月 19 日更新，修复直接执行 `package_skill.py` 的导入失败及过期路径说明，直接影响 Skill 交付链路。 | 更新较近，但不代表已获维护者认可。 |
| **skill-creator 评估隔离 — [#1298](https://github.com/anthropics/skills/pull/1298)** | 与多项高讨论度评估问题形成主题呼应；若落地，可改善创建、优化流程的可信度。 | 9 月后未见更新，合并时间不明。 |
| **webapp-testing 安全修复 — [#1980](https://github.com/anthropics/skills/pull/1980)** | 针对明确的命令执行风险，安全价值高于一般体验优化。 | 需要验证替代实现不破坏现有命令工作流。 |
| **docx 结果验证 — [#1792](https://github.com/anthropics/skills/pull/1792)** | 将超时与实际产物检查纳入成功判定，对自动化文档处理价值直接。 | 仍需关注不同文档结构及 LibreOffice 环境的兼容性。 |
| **Pyxel 新 Skill — [#525](https://github.com/anthropics/skills/pull/525)** | 覆盖开发、运行、画面和状态验证，工作流较完整；提交数月后仍有更新。 | 可作为新增 Skill 观察对象，不能推断即将收录。 |

## 4. Skills 生态洞察

**当前社区最集中的诉求，是让 Skills 从“能调用的能力集合”升级为“来源可信、触发准确、执行安全、结果可验证且便于团队共享的工作流基础设施”。**——代表信号：[信任边界 #492](https://github.com/anthropics/skills/issues/492)、[组织共享 #228](https://github.com/anthropics/skills/issues/228)、[评估可靠性 #556](https://github.com/anthropics/skills/issues/556)。

---

# Claude Code 社区动态日报
**日期：2026-11-25**  
**数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)**

## 1. 今日速览

Claude Code 发布 **v2.1.332**，新增 MCP 服务器提供的 Skills（Beta），以及可在技能加载时拒绝内联 Shell 命令的 `PreSkillShellCommand` Hook。社区反馈主要集中在桌面端与远程开发可靠性、插件故障可见性，以及多 Agent 工作流的任务协作与上下文成本。统计窗口内没有 PR 更新；所展示 Issues 的评论量均为 0–1 条，尚不足以判断广泛社区共识。

## 2. 版本发布

### [v2.1.332](https://github.com/anthropics/claude-code/releases/tag/v2.1.332)

- **MCP Skills 接入（Beta）**：MCP 服务器提供的技能会显示在 `/` 菜单中，命名为 `server:skill`；其他技能保持原名。开发者可关注技能发现、命名及现有工作流的兼容性。
- **新增 `PreSkillShellCommand` Hook**：可在技能或命令加载时拒绝其内联 Shell 命令，为相关执行流程提供新的控制点。

**注意：**提供的 Release 文本在涉及 **2.1.331 及更早版本的配置行为**时被截断，无法据此确认旧版兼容细节；配置新 Hook 前应核对完整发布说明。

## 3. 社区热点 Issues

> 以下按潜在影响与技术价值筛选，并非热度排名。均为用户报告或功能请求，尚不能视为官方确认的缺陷。

| Issue | 核心内容与关注价值 | 社区反应与状态 |
|---|---|---|
| **[#112096：插件市场配置为空后不恢复](https://github.com/anthropics/claude-code/issues/112096)** | 用户报告 Windows 11、2.1.331 下，零字节的 `known_marketplaces.json` 导致所有市场插件无法加载，且没有会话提示或自动修复。值得关注的是**静默失败与配置恢复能力**。 | OPEN；1 评论、0 👍；带复现标签。报告关联此前因不活跃关闭的 #94451，但不代表已确认同一根因。 |
| **[#112092：后台子 Agent 使用任务列表工具](https://github.com/anthropics/claude-code/issues/112092)** | 请求向后台子 Agent 开放 `TaskCreate`、`TaskGet`、`TaskList`、`TaskUpdate`，支持共享任务状态与并行协作。关系到多 Agent 工作流能否形成完整闭环。 | OPEN；1 评论、0 👍；功能请求，尚无实现信息。 |
| **[#112089：子 Agent 重复写入约 50K tokens 启动上下文](https://github.com/anthropics/claude-code/issues/112089)** | 作者基于 2.1.332 的本地记录，报告子 Agent 首次请求重复写入相同启动上下文，建议在共享块末尾增加缓存断点。可能影响多 Agent 场景的成本与启动效率，但具体收益需验证。 | OPEN；0 评论、0 👍；目前为作者测量与优化建议。 |
| **[#112104：切换 worktree 后文件面板仍指向初始目录](https://github.com/anthropics/claude-code/issues/112104)** | macOS 桌面端用户报告，进入 Git worktree 后，Files 面板和回复中的文件链接仍按会话起始目录解析。可能造成查看或定位错误文件，影响多分支开发。 | OPEN；0 评论、0 👍；带复现标签。 |
| **[#112088：从较早消息分叉会话失败](https://github.com/anthropics/claude-code/issues/112088)** | 用户报告，当目标消息位于较早的 transcript 文件时，桌面端提示 “Couldn’t fork this session.”。值得长会话、分支探索工作流用户关注。 | OPEN；0 评论、0 👍；带复现标签。 |
| **[#112084：SSH 连接 Windows 主机时 SFTP 路径错误](https://github.com/anthropics/claude-code/issues/112084)** | 报告称桌面端发送 `C:/…` 而非 `/C:/…`，在特定 SFTP 工作目录配置下造成路径重复，阻断远程初始化。对 Windows 远程开发环境影响较直接。 | OPEN；0 评论、0 👍；带复现标签。记录日期为 11 月 24 日，按提供的统计窗口纳入。 |
| **[#112091：Remote Control 服务标识与会话恢复](https://github.com/anthropics/claude-code/issues/112091)** | 请求为每个 `claude rc` 服务分配独立 ID，并在重启或进程退出后恢复关联会话。作者称对话仍在磁盘，但不再出现在 Remote Control 中，反映出持久化与远程入口之间的恢复缺口。 | OPEN；0 评论、0 👍；后续需求，关联 #88696、#94369。 |
| **[#112095：iOS 语音输入未完成即发送](https://github.com/anthropics/claude-code/issues/112095)** | 用户报告通过 Remote Control 操作时，语音消息有时会在未点击发送的情况下以片段形式提交。对移动端编码而言，输入完整性直接影响后续执行意图。 | OPEN；0 评论、0 👍；尚无修复信息。 |
| **[#112105：GitHub 仓库无法正常附加](https://github.com/anthropics/claude-code/issues/112105)** | 用户称选择仓库后只插入链接并报错，未成功授予访问能力。仓库连接是云端开发入口，同类报告值得持续跟踪，但不能据此认定服务级故障。 | OPEN；0 评论、0 👍；另有 #112093、#112111 等集成反馈。 |
| **[#112098：凭据输入与权限提示阻断任务](https://github.com/anthropics/claude-code/issues/112098)** | Windows 用户认为密码或账户信息输入限制过严，导致无人值守任务中断。反映的是**安全边界与自动化便利性之间的冲突**，不能直接推断应放宽凭据保护。 | OPEN；1 评论、0 👍；尚无官方处理结论。 |

## 4. 重要 PR 进展

**本统计窗口内更新的 PR 为 0 条，因此没有可筛选的 10 个重要 PR。** 不以 Issues 或版本说明替代 PR 进展，也不据此推断项目没有开发活动。

跟踪入口：[仓库 Pull Requests](https://github.com/anthropics/claude-code/pulls)。

## 5. 功能需求趋势

以下趋势基于提供的 Issue 摘录，不代表完整 50 条记录的精确频率排名。

- **多 Agent 协作与成本优化**：需求从“能启动子 Agent”延伸到共享任务状态、复用启动上下文，重点是协作效率与规模化运行成本。  
  相关：[#112092](https://github.com/anthropics/claude-code/issues/112092)、[#112089](https://github.com/anthropics/claude-code/issues/112089)。

- **远程与移动开发的连续性**：用户希望 Remote Control 在重启后可恢复，移动端文件链接可直接打开，并改善手机会话界面。  
  相关：[#112091](https://github.com/anthropics/claude-code/issues/112091)、[#112106](https://github.com/anthropics/claude-code/issues/112106)、[#112087](https://github.com/anthropics/claude-code/issues/112087)。

- **桌面端完整开发体验**：新 Projects/Threads 场景需要 diff、上下文及侧面板，另有浏览器窗口可见性和侧边栏交互需求。方向是减少在 Claude Code 与外部工具之间切换。  
  相关：[#112099](https://github.com/anthropics/claude-code/issues/112099)、[#112101](https://github.com/anthropics/claude-code/issues/112101)、[#112107](https://github.com/anthropics/claude-code/issues/112107)。

- **用量可观测性更细化**：希望 `statusLine` 的 `rate_limits` 数据包含按模型划分的每周额度，便于自定义状态栏展示剩余用量。  
  相关：[#112109](https://github.com/anthropics/claude-code/issues/112109)。

## 6. 开发者关注点

1. **减少“静默失败”和状态失真。** 插件加载失败无提示、后台命令结束后仍显示运行中，都会增加排查成本；应优先关注明确报错、状态同步和恢复路径。  
   参考：[#112096](https://github.com/anthropics/claude-code/issues/112096)、[#112108](https://github.com/anthropics/claude-code/issues/112108)。

2. **保证路径、工作区与信任状态一致。** worktree 文件解析、Windows SFTP 路径，以及已信任父目录下仍重复审批的问题，暴露出跨环境开发流程中的边界摩擦。  
   参考：[#112104](https://github.com/anthropics/claude-code/issues/112104)、[#112084](https://github.com/anthropics/claude-code/issues/112084)、[#112103](https://github.com/anthropics/claude-code/issues/112103)。

3. **让执行结果和上下文使用情况更透明。** 有用户反馈任务未完成却没有明确说明，或未处理图片、链接却未披露。此类反馈尚待验证，但提示开发者应关注完成条件、输入覆盖范围与结果核验。  
   参考：[#112110](https://github.com/anthropics/claude-code/issues/112110)、[#112094](https://github.com/anthropics/claude-code/issues/112094)。

**今日判断：**新增能力继续扩展 MCP 与技能生态，但本次样本中更突出的工程诉求是：让已有工作流在桌面、远程、多 Agent 和长会话场景下，运行得更可靠、状态更透明、故障后更易恢复。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-25｜仓库：[openai/codex](https://github.com/openai/codex)**

## 1. 今日速览

过去 24 小时，Codex 连续发布 **4 个 0.174.0 Alpha 版本**；PR 动态集中在 TUI 终端兼容性、交互可靠性，以及 MCP、身份认证和网关接入。社区反馈则以 **Windows 桌面端稳定性与性能、CLI/TUI 交互回归、自动任务执行边界及安全检查误判** 为主要关注点。

> **数据口径：**本日报依据提供的 30 条 Issue、20 条 PR 摘要整理，并非完整的各 50 条记录。展示的 Issues 均为 OPEN；PR 均标为 CLOSED，但未提供合并状态，因此下文不将其视为已合并或已发布。部分记录日期为 11 月 24 日，缺少具体时间与时区，按来源提供的窗口纳入。

## 2. 版本发布

过去 24 小时发布了以下预发布版本：

| 版本 | GitHub 链接 |
|---|---|
| `0.174.0-alpha.5` | [Release](https://github.com/openai/codex/releases/tag/rust-v0.174.0-alpha.5) |
| `0.174.0-alpha.4` | [Release](https://github.com/openai/codex/releases/tag/rust-v0.174.0-alpha.4) |
| `0.174.0-alpha.3` | [Release](https://github.com/openai/codex/releases/tag/rust-v0.174.0-alpha.3) |
| `0.174.0-alpha.2` | [Release](https://github.com/openai/codex/releases/tag/rust-v0.174.0-alpha.2) |

**解读：**发布节奏密集，但提供的 Release 正文仅包含版本号，无法确认具体新增功能、修复范围，亦不能据此判断下列 PR 是否已进入这些版本。生产环境升级前应核对完整变更记录，并验证现有工作流。

## 3. 社区热点 Issues

以下按工作流影响、诊断价值与讨论量综合筛选。**这 10 条 Issue 均为 OPEN、👍 为 0**；评论数仅代表当前讨论量，不代表问题普遍程度，也不意味着已获得维护者确认。

| Issue | 问题与重要性 | 社区反应 |
|---|---|---|
| **[ #63819：子代理详情入口失效](https://github.com/openai/codex/issues/63819)** | macOS、Codex CLI 0.172.0、Ghostty + tmux 环境下，子代理条目与活动链接无法打开详情。影响多代理任务的进度追踪与排错。 | **4 条评论**，为展示样本中讨论最多的 Issue。 |
| **[ #63822：代码围栏解析错误](https://github.com/openai/codex/issues/63822)** | `FenceTracker` 将代码块内带引用标记的围栏误判为结束，可能影响后续代码、表格渲染。报告提供了具体源码位置与复现片段，便于定位。 | **2 条评论**；复现信息较明确。 |
| **[ #63815：自主目标越过交付里程碑](https://github.com/openai/codex/issues/63815)** | 用户报告 Autonomous Goal 在交接后仍继续执行并消耗上下文。涉及代理是否遵守停止条件、交付契约与资源预算。 | **2 条评论**；报告依据三份本地 JSONL 记录，并关联历史问题。 |
| **[ #63800：音频设备切换导致 `/voice` 终止](https://github.com/openai/codex/issues/63800)** | 蓝牙耳机连接或默认音频设备变化时，语音进程退出。影响移动办公和日常语音开发流程的连续性。 | **2 条评论**；提供了 Device / 37 错误线索。 |
| **[ #63783：Windows ARM64 更新后启动失败](https://github.com/openai/codex/issues/63783)** | 用户报告升级到 `26.1120.6357.0` 后出现 “Missing scope instance”。启动级故障会直接阻断使用，值得优先核查架构兼容性。 | **2 条评论**；当前仍是用户报告，尚无确认修复信息。 |
| **[ #63779：Windows 推理停滞、重连及容量错误](https://github.com/openai/codex/issues/63779)** | 桌面端推理阶段间歇停滞，并伴随长时间重连和 “Selected model is at capacity”。需区分客户端、连接和服务容量因素。 | **2 条评论**；问题横跨性能与连接层。 |
| **[ #63778：更新后 WSL 本地开发受阻](https://github.com/openai/codex/issues/63778)** | 用户报告晚 11 月更新后，原有 WSL 项目开发与 Git 分支创建被阻断。直接影响 Windows 开发者的核心工程工作流。 | **2 条评论**；报告尚未确认精确安装版本。 |
| **[ #63798：内置浏览器触发崩溃](https://github.com/openai/codex/issues/63798)** | Windows 桌面端使用内置浏览器时出现 `Peer closed MessagePort connection`。浏览器工具链稳定性可能成为任务执行的阻塞点。 | **1 条评论**；另有图片附件场景报告相同错误文本，尚不能认定同源。 |
| **[ #63777：Windows UI 严重卡顿](https://github.com/openai/codex/issues/63777)** | 常规使用中出现显著界面延迟，报告标注可提供 Perfetto trace。相比笼统的“变慢”，性能跟踪资料更有助于定位瓶颈。 | **1 条评论**；与样本内其他性能退化反馈形成共同关注方向。 |
| **[ #63795：普通开发任务被误判为安全工作](https://github.com/openai/codex/issues/63795)** | 用户表示并未进行网络安全相关任务，却受到对应检查限制。误判会中断正常工作，也凸显限制原因与申诉反馈的可解释性需求。 | **1 条评论**；样本中另有多条类似安全检查反馈。 |

## 4. 重要 PR 进展

**状态说明：以下 10 条 PR 均显示 CLOSED；是否合并、进入哪个版本，现有数据无法确认。PR 评论数为 `undefined`，不据此判断讨论热度。**

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| **[ #63821：共享 MCP REPL 使用固定启动目录](https://github.com/openai/codex/pull/63821)** | 将 `mcp_shared_repl_cwd` 标为稳定并默认开启；启用连接共享时，符合条件的服务器使用 app-server 的固定启动目录。 | 提升共享 MCP 服务工作目录的一致性与可预测性。 |
| **[ #63810：语音使用 ChatGPT 账户偏好](https://github.com/openai/codex/pull/63810)** | 改为读取、保存账户级语音偏好，而非仅依赖本地 `realtime.voice` 覆盖。 | 让 Codex 与 ChatGPT 的语音选择保持一致；不等同于解决音频设备切换故障。 |
| **[ #63808：修复 workload identity 认证](https://github.com/openai/codex/pull/63808)** | 处理启动安装凭证时可能撤销网络策略的问题，以及 API workload identity 缺少 ChatGPT 账户身份时的兼容问题。 | 改善企业和自动化环境中的启动、凭证刷新可靠性。 |
| **[ #63807：自动发现 HTTPS 网关模型目录](https://github.com/openai/codex/pull/63807)** | 为自定义 HTTPS 网关自动探测 `/models`，减少对单独配置 `model_catalog_url` 的依赖。 | 降低自建网关和模型目录接入成本。 |
| **[ #63806：加强插件市场 SSH 主机检查](https://github.com/openai/codex/pull/63806)** | 校验 SSH authority，防范 URL 解析器与 Git/SSH 对歧义远程地址解释不一致。 | 强化插件来源主机允许列表的安全边界。 |
| **[ #63802：集中管理终端通知能力判断](https://github.com/openai/codex/pull/63802)** | 统一通知协议选择，应用 Ghostty 255 字节通知限制，并复用 tmux OSC 透传编码。 | 减少终端与复用器组合中的通知兼容性差异。 |
| **[ #63788：全屏记录默认折叠回合详情](https://github.com/openai/codex/pull/63788)** | 未配置时默认摘要工具调用、折叠已完成回合；可通过 `tui.collapse_turn_details = false` 退出该行为。 | 降低长会话的信息密度，同时保留显式配置入口。 |
| **[ #63785：保护无 bracketed paste 标记的多行粘贴](https://github.com/openai/codex/pull/63785)** | 处理终端将粘贴内容逐键发送时，换行被误识别为提交的问题。 | 减少多行指令或代码尚未粘贴完整就被提交的风险。 |
| **[ #63782：恢复已过期的 MCP HTTP 会话](https://github.com/openai/codex/pull/63782)** | 针对会话过期后回复 elicitation 收到 HTTP 404、工具调用可能持续挂起的情况增加恢复处理。 | 改善长任务中的 MCP 会话容错。 |
| **[ #63780：为核心增加可选 Statsig 初始化](https://github.com/openai/codex/pull/63780)** | 增加 `Config::start_statsig`；要求开启默认关闭的 `features.statsig_gates`，并提供构建时客户端密钥。 | 为启动器提供显式初始化入口；不意味着默认启用。 |

## 5. 功能需求趋势

以下为**已展示样本中的定性趋势**，不代表完整 Issue 集的统计排名。

- **桌面端性能与稳定性优先于新增功能。** 卡顿、推理停滞、崩溃及存储增长共同指向基础体验治理。归档存储报告提到约 17 GB 归档、35 GB 本地数据，并请求内置保留策略。  
  参考：[UI 卡顿 #63777](https://github.com/openai/codex/issues/63777)、[存储管理 #63772](https://github.com/openai/codex/issues/63772)。

- **代理协作需要明确的授权、停止与审计机制。** `/teamwork` 提案强调用户批准的执行契约、响应式协调和独立审计，与自主目标越过里程碑的反馈相呼应。  
  参考：[团队协作需求 #63763](https://github.com/openai/codex/issues/63763)、[目标执行边界 #63815](https://github.com/openai/codex/issues/63815)。

- **本地、远程与跨系统开发环境需要一致支持。** WSL、SMB、Remote-SSH 和自定义权限配置暴露出环境初始化、路径及访问权限方面的需求。  
  参考：[WSL #63778](https://github.com/openai/codex/issues/63778)、[SMB #63751](https://github.com/openai/codex/issues/63751)、[Remote-SSH #63824](https://github.com/openai/codex/issues/63824)。

- **安全限制需要更准确、更透明。** 除误判外，用户也关心关键交付物被省略时是否及时说明，以及看似正常的提示为何被拒绝。  
  参考：[安全误判 #63825](https://github.com/openai/codex/issues/63825)、[拒绝说明不充分 #63768](https://github.com/openai/codex/issues/63768)、[`invalid_prompt` #63761](https://github.com/openai/codex/issues/63761)。

- **语音交互需要兼顾设备切换与多语言准确性。** 需求不仅是统一声音偏好，还包括会话不中断、听写不改变原意。  
  参考：[设备切换 #63800](https://github.com/openai/codex/issues/63800)、[丹麦语听写 #63753](https://github.com/openai/codex/issues/63753)。

## 6. 开发者关注点

1. **升级后核心工作流是否仍可用。** 建议将启动、WSL 项目访问、Git 分支创建、浏览器调用和附件处理纳入回归检查，而非只验证聊天功能。  
   参考：[WSL 回归 #63778](https://github.com/openai/codex/issues/63778)、[附件冻结 #63776](https://github.com/openai/codex/issues/63776)。

2. **故障诊断需要区分 UI、网络、容量与配额。** “卡住”“重连”“模型满载”和 HTTP 429 不应统一归因；清晰的阶段状态与错误分类有助于减少无效重试。  
   参考：[推理停滞 #63779](https://github.com/openai/codex/issues/63779)、[重开会话 429 #63792](https://github.com/openai/codex/issues/63792)。

3. **长任务必须可观察、可停止、可验收。** 子代理详情入口失效会降低可观察性；自主目标越过交付点则削弱用户对执行边界的控制。  
   参考：[子代理导航 #63819](https://github.com/openai/codex/issues/63819)、[自主目标 #63815](https://github.com/openai/codex/issues/63815)。

4. **权限配置应贯穿所有内部操作。** 标题生成仍尝试使用已禁用的 `:read-only`，说明辅助流程也需要遵守用户选定的权限模型。  
   参考：[自定义权限配置 #63747](https://github.com/openai/codex/issues/63747)。

5. **项目路径和会话数据需要可预测、可治理。** 本地项目路径变化与归档无限增长分别影响项目可访问性和磁盘资源，适合通过路径校验、存储统计及保留策略改善。  
   参考：[项目路径异常 #63813](https://github.com/openai/codex/issues/63813)、[归档容量 #63772](https://github.com/openai/codex/issues/63772)。

**总体判断：**今日最值得跟踪的不是单一新功能，而是终端兼容性集中治理、MCP 与认证可靠性改进，以及桌面端回归问题的后续处置。上述 PR 与 Issue 主题存在关联，但当前数据不足以建立具体的修复对应关系。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-11-25** · 仓库：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

## 1. 今日速览

今天的重点是**安全边界加固与发布稳定性**：MCP 身份令牌接收方限制、OAuth 来源一致性、Shell 命令策略检查均有修复 PR 推进，Nightly 发布失败则被标记为 **P0**。功能方面，非破坏式会话分支 `/fork` 已有实现提案，Markdown 渲染与扩展安装回归也出现对应修复；过去 24 小时无新 Release。

> **数据口径**：以下依据提供的 10 条 Issue、12 条 PR 整理；其中部分记录的更新时间为 11 月 24 日。PR 标记为 `CLOSED` 不等于已合并，当前数据不足以确认相关修复已进入发布版本。

## 2. 社区热点 Issues

本次共提供 10 条 Issue，以下全部列出，并区分高价值问题与低信息量反馈。**所有 Issue 均为 0 👍，评论数为 0–2 条**，尚无足够数据证明形成广泛讨论。

| Issue | 重要性与影响 | 状态及社区反应 |
|---|---|---|
| **[ #30457：Nightly 发布失败](https://github.com/google-gemini/gemini-cli/issues/30457)** | `v0.73.0-nightly.20261125.g08e9a20f7` 发布工作流失败，直接影响测试版本交付。具体失败原因需查看工作流日志。 | **OPEN · P0**；机器人提交，0 条评论。 |
| **[ #30455：服务账号身份令牌可能发送至任意配置 URL](https://github.com/google-gemini/gemini-cli/issues/30455)** | 报告称 MCP 的 `service_account_impersonation` 缺少接收方校验，且 `GoogleAuth` 未配置 scopes，涉及令牌外传风险。 | **OPEN**；1 条评论，已有对应修复 PR #30456。 |
| **[ #30447：A2A 手动路由绕过认证](https://github.com/google-gemini/gemini-cli/issues/30447)** | 报告涉及 `/tasks`、`/executeCommand`、`/listCommands`，关系到任务创建及命令执行接口的访问控制。 | **CLOSED**；2 条评论，为本批评论最多的 Issue。关联 PR #30449 也已关闭，但不能据此认定修复已发布。 |
| **[ #30462：新增 `/fork` 与非破坏式回退分支](https://github.com/google-gemini/gemini-cli/issues/30462)** | 希望保留原会话并探索不同方案，为长任务中的试验、比较与回退提供原生支持。 | **OPEN**；1 条评论，已有功能 PR #30464。 |
| **[ #30465：Markdown 代码围栏吞掉正文或打乱表格顺序](https://github.com/google-gemini/gemini-cli/issues/30465)** | 影响终端中代码、解释文字和表格的可读性；提供了无需模型或登录即可复现的测试方式。 | **OPEN**；1 条评论，已有修复 PR #30467。 |
| **[ #30446：旧图片读取挤占上下文压缩保留预算](https://github.com/google-gemini/gemini-cli/issues/30446)** | 报告称图片 `read_file` 会耗尽 64 KB 检索历史豁免预算，使较早文本读取结果被压缩，可能损害长会话上下文质量。 | **OPEN**；1 条评论，所给 PR 中未见直接对应修复。 |
| **[ #30460：Profile 命令测试单独运行失败](https://github.com/google-gemini/gemini-cli/issues/30460)** | 整文件运行通过、按名称单独运行失败，暴露测试对共享 mock 初始化的依赖，影响定向调试效率。 | **OPEN**；1 条评论，已有测试修复 PR #30463。 |
| **[ #30445：富文本粘贴保留样式，大段粘贴后输入为空](https://github.com/google-gemini/gemini-cli/issues/30445)** | 涉及输入可靠性，但描述指向 **Gemini 网页输入框**，是否属于 CLI 仓库责任范围仍需分诊。 | **OPEN**；1 条评论。 |
| **[ #30461：GeminiCLI.com 网站反馈](https://github.com/google-gemini/gemini-cli/issues/30461)** | 含截图及“make into a video”描述，缺乏清晰的问题定义，暂不足以提炼有效开发需求。 | **CLOSED**；1 条评论，带扩展与文档标签。 |
| **[ #30444：标题为 “buf” 的反馈](https://github.com/google-gemini/gemini-cli/issues/30444)** | 无摘要、复现步骤或影响描述，当前无法判断技术价值与优先级。 | **OPEN**；1 条评论，需补充信息。 |

## 3. 重要 PR 进展

以下选取 10 条重点 PR。除特别注明外，均处于 **OPEN** 状态，代表待评审或待合并工作，**不代表功能已经可用**。

### 安全与权限边界

1. **[ #30456：限制服务账号身份令牌接收方](https://github.com/google-gemini/gemini-cli/pull/30456)**  
   为 MCP 服务账号模拟认证增加主机允许列表，并要求配置 scopes，对应 Issue #30455。重点是收紧令牌可发送的目标范围。

2. **[ #30454：强化 MCP OAuth 来源一致性](https://github.com/google-gemini/gemini-cli/pull/30454)** — **P1**  
   校验 RFC 8414 issuer 匹配及端点 origin 一致性，并在认证流程展示授权端点来源，必要时展示令牌端点来源，提高用户对认证目标的可见性。

3. **[ #30453：拆解 Shell 包装与 AST 后执行安全检查](https://github.com/google-gemini/gemini-cli/pull/30453)** — **P1 · help wanted**  
   加固包装命令、前缀工具、复合命令、重定向等场景下的命令替换检测及策略执行，减少外层语法导致的检查遗漏。

4. **[ #30451：覆盖更多 Shell 包装变体](https://github.com/google-gemini/gemini-cli/pull/30451)**  
   同样针对 `detectCommandSubstitution`、`stripShellWrapper` 与 `PolicyEngine`。与 #30453 范围明显重叠，需关注维护者如何整合实现和测试覆盖；当前带 `status/need-issue` 标签。

5. **[ #30449：为 A2A 手动挂载路由补充认证](https://github.com/google-gemini/gemini-cli/pull/30449)** — **CLOSED**  
   对应 Issue #30447，处理 SDK 路由认证未覆盖手动 Express 路由的问题。PR 摘要提到五条手动路由，范围比 Issue 标题列出的三条更广；是否合并及最终处理结果仍需核实。

### 会话能力与终端体验

6. **[ #30464：实现 `/fork` 与 `/rewind` 分支选项](https://github.com/google-gemini/gemini-cli/pull/30464)** — **XL**  
   提议新增 `/fork [name] [--stay]`，并在 `/rewind` 中加入“从此处分支”选项，共享核心层 `ChatRecordingService.forkAsync()` API。

7. **[ #30467：保留 Markdown 代码围栏边界](https://github.com/google-gemini/gemini-cli/pull/30467)**  
   修复带 `c++` 等语言标签或属性信息的围栏识别、代码块内部围栏行显示，以及前置表格与后续代码块的渲染顺序。

### 扩展生态与开发质量

8. **[ #30459：修复 Git 扩展安装与更新失败](https://github.com/google-gemini/gemini-cli/pull/30459)**  
   针对报告中自 0.70.0 起出现的 `GIT_CONFIG_SYSTEM` 限制错误，启用 `simple-git` 所需的 unsafe 配置类别。该变更兼具兼容性与配置安全审查价值。

9. **[ #30463：隔离 Profile 测试的 restore mock](https://github.com/google-gemini/gemini-cli/pull/30463)**  
   在测试套件初始化中明确让 mock 返回 `null`，消除对其他测试执行顺序的依赖，恢复单测独立运行能力。

10. **[ #30458：完善扩展图库索引排障文档](https://github.com/google-gemini/gemini-cli/pull/30458)** — **P2**  
    引导扩展作者核查仓库根目录的精确 manifest 路径，避免将子目录示例或 `gemini-extension.json.in` 等相似文件误判为已被索引。

## 4. 功能需求趋势

- **会话分支与可逆探索成为明确的新功能方向。** `/fork` 及 `/rewind` 分支请求体现了保留原路径、并行尝试不同方案的需求，而不只是简单回退。[Issue #30462](https://github.com/google-gemini/gemini-cli/issues/30462)
- **长会话需要更合理的多模态上下文预算。** 图片读取与文本检索共享保留预算时，需避免单类内容挤占资源，影响此前信息的可用性。[Issue #30446](https://github.com/google-gemini/gemini-cli/issues/30446)
- **输出准确呈现与输入可靠性仍是基础诉求。** Markdown 围栏问题直接影响 CLI 阅读体验；富文本粘贴反馈则需先确认产品归属。[Issue #30465](https://github.com/google-gemini/gemini-cli/issues/30465) · [Issue #30445](https://github.com/google-gemini/gemini-cli/issues/30445)
- **认证边界是本批反馈中突出的治理方向。** A2A 路由访问控制和 MCP 令牌目标校验均有报告，但属于安全缺陷反馈，不宜等同于一般功能投票。[Issue #30447](https://github.com/google-gemini/gemini-cli/issues/30447) · [Issue #30455](https://github.com/google-gemini/gemini-cli/issues/30455)

本批 Issue **未显示 IDE 集成或新模型支持的集中需求**，不宜外推为当日热点。

## 5. 开发者关注点

- **安全修复的实际落地状态**：需跟踪相关 PR 的合并记录、测试结果和发布归属，尤其不能将 A2A Issue/PR 的关闭直接理解为风险已解除。[#30449](https://github.com/google-gemini/gemini-cli/pull/30449)
- **发布与升级可靠性**：Nightly 失败以及 Git 扩展安装回归，分别影响新版本验证和扩展日常使用。[#30457](https://github.com/google-gemini/gemini-cli/issues/30457) · [#30459](https://github.com/google-gemini/gemini-cli/pull/30459)
- **复杂 Shell 语法下的策略一致性**：多个重叠修复表明，这是当前安全加固的集中工作面；评审应重点看覆盖矩阵，而非仅看单一示例。[#30453](https://github.com/google-gemini/gemini-cli/pull/30453) · [#30451](https://github.com/google-gemini/gemini-cli/pull/30451)
- **可独立复现、可定向运行的测试**：Markdown 的无登录复现方式与 Profile 测试隔离修复，都有助于缩短贡献者定位和验证问题的周期。[#30465](https://github.com/google-gemini/gemini-cli/issues/30465) · [#30463](https://github.com/google-gemini/gemini-cli/pull/30463)

**后续优先观察：P0 Nightly 故障恢复、安全 PR 的评审与合并结果，以及 `/fork` 的接口和交互设计是否收敛。**

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-25** · [项目仓库](https://github.com/github/copilot-cli)

> 数据说明：本报基于所提供的发布记录及过去 24 小时更新条目。部分发布说明已截断；Issue 共 8 条、PR 为 0 条，因此不补足“10 条”，也不将用户报告视为已确认缺陷。

## 1. 今日速览

发布列表出现 **v1.0.116-0 至 v1.0.116-3**，更新集中在 MCP 连接与认证提示、会话状态同步，以及 ACP 编辑器和终端交互体验。社区反馈中，最值得优先核查的是**沙箱拒绝文件仍被读取并生成明文备份**的报告，其次是子会话启动挂起、消息路由错误和 ACP 重复最终回答。当前样本讨论量较低：8 条 Issue 均无评论，仅 1 条获得 1 个 👍，尚不能据此判断广泛影响。
[发布记录](https://github.com/github/copilot-cli/releases) · [安全相关报告 #5564](https://github.com/github/copilot-cli/issues/5564)

## 2. 版本发布

| 版本 | 已知更新内容 | 开发者价值 |
|---|---|---|
| [v1.0.116-3](https://github.com/github/copilot-cli/releases/tag/v1.0.116-3) | 全屏时间线新增 **Jump to latest**，返回最新输出并恢复跟随；支持在兼容 ACP 的编辑器中，为支持的模型选择上下文大小且不改变已保存默认值；新增为 Copilot 启动的进程设置环境变量的能力，但该条说明被截断。 | 改善长输出导航，提升编辑器端上下文配置灵活性。 |
| [v1.0.116-2](https://github.com/github/copilot-cli/releases/tag/v1.0.116-2) / [v1.0.116-1](https://github.com/github/copilot-cli/releases/tag/v1.0.116-1) | 插件与独立 MCP 服务器连接同一端点时给出警告，并提示通过 `/mcp` 禁用其中一个；修复待处理提示取消后需等待活动刷新、重连后空闲会话被显示为忙碌的问题。 | 减少重复 MCP 配置及错误忙碌状态带来的排障成本。两版所提供摘要相同，无法判断其差异。 |
| [v1.0.116-0](https://github.com/github/copilot-cli/releases/tag/v1.0.116-0) | 对组织管理的 MCP 服务器（Connectors 除外）减少逐项慢连接和登录警告，将登录需求汇总至启动摘要；需要关注时汇总 MCP 状态，等待 `/mcp auth <name>` 后再打开浏览器。 | 降低启动提示噪声，让认证动作更可控。 |
| [v1.0.115](https://github.com/github/copilot-cli/releases/tag/v1.0.115) | 支持表单的 ACP 编辑器可使用结构化澄清问题；默认启用 Windows 沙箱包查询，可用 `sandbox.userPolicy.capabilities: []` 退出；支持允许特定 macOS Mach 服务查询，具体配置说明被截断。 | 扩展 ACP 交互和跨平台沙箱能力。该版本标注日期为 **11 月 23 日**，作为近期背景列出。 |

**注意：**现有发布摘要未明确说明下文新增 Issue 已被修复，不宜将“相关体验改善”视为“对应问题已解决”。

## 3. 社区热点 Issues

以下按潜在影响和排查价值排序，而非按热度排序。所有条目目前均为 **OPEN / triage**。

| Issue | 核心问题与重要性 | 社区反应 |
|---|---|---|
| **[#5564：沙箱拒绝文件仍被读取并备份](https://github.com/github/copilot-cli/issues/5564)** | 报告称，内置 `edit` 工具在拒绝修改前读取了 `deniedPaths` 中的文件，并将内容以明文保存到 `~/.copilot/session-state/<session>/rewind-file-snapshots/backups/`。涉及访问控制边界和本地敏感数据留存，建议优先复现核查；目前尚未确认。 | 0 评论，0 👍 |
| **[#5565：`create_session` 无超时挂起](https://github.com/github/copilot-cli/issues/5565)** | 子会话工作区已创建，但 session host 未注册、子代理未启动，工具调用可能持续数小时不返回。会阻塞多代理工作流；标题还报告非 ASCII 名称乱码。 | 0 评论，0 👍 |
| **[#5569：ACP 重复输出最终回答](https://github.com/github/copilot-cli/issues/5569)** | 附加异步 shell 尚在运行时先输出最终回答，shell 退出后又输出一次并返回 `end_turn`。报告提供了 `sleep 45` 的直接 ACP 复现方式，值得检查终态和工具生命周期同步。 | 0 评论，**1 👍**；样本中唯一获赞条目 |
| **[#5570：侧边聊天子会话消息发往主聊天](https://github.com/github/copilot-cli/issues/5570)** | 从 side chat 启动的子会话，将多数消息发送到 main chat。影响多会话协作中的结果归属和上下文隔离。 | 0 评论，0 👍 |
| **[#5568：MCP 注册表请求缺少 User-Agent](https://github.com/github/copilot-cli/issues/5568)** | 报告称 VS Code 中的 Copilot harness 发出验证请求时缺少该请求头，触发 AWS WAF 的 `NoUserAgent_HEADER` 规则；在 CLI 1.0.115 复现。关系到企业网络环境中的 MCP 接入兼容性。 | 0 评论，0 👍 |
| **[#5563：终端长文本被截断](https://github.com/github/copilot-cli/issues/5563)** | 用户称消息仅保留屏幕可见部分，滚动也无法找回内容。直接影响长回答和执行结果的可读性；与新版本时间线导航改善是否相关，尚无证据。 | 0 评论，0 👍 |
| **[#5567：Skill 不显示 `argument-hint`](https://github.com/github/copilot-cli/issues/5567)** | 输入 Skill 的斜杠命令时能看到描述，却看不到 YAML frontmatter 中声明的参数提示；受影响版本为 1.0.115-8。降低自定义技能的可发现性与使用效率。 | 0 评论，0 👍 |

另有 **[#5566：CO PILOT QUICK](https://github.com/github/copilot-cli/issues/5566)**，但缺少有效问题描述、受影响版本与复现步骤，暂不作为技术热点解读；0 评论、0 👍。

## 4. 重要 PR 进展

本次数据中，**过去 24 小时更新的 PR 为 0 条**，无可报告的重要进展。版本发布中的功能与修复未提供关联 PR，故不推断其实现或合并状态。  
[查看仓库 Pull Requests](https://github.com/github/copilot-cli/pulls)

## 5. 功能需求趋势

当前样本以缺陷报告为主，以下是由问题推导出的改进方向，而非新增功能投票排名：

- **多会话与多代理可靠性**：需要更明确的启动超时、失败反馈和消息路由隔离，避免子会话失联或结果进入错误聊天。  
  [#5565](https://github.com/github/copilot-cli/issues/5565) · [#5570](https://github.com/github/copilot-cli/issues/5570)
- **ACP 异步执行语义一致性**：编辑器集成不仅需要更多交互能力，也需要确保 shell 完成、最终回答和 `end_turn` 的时序一致。  
  [#5569](https://github.com/github/copilot-cli/issues/5569)
- **沙箱策略覆盖完整文件处理链路**：开发者关注的不只是“能否修改”，还包括读取、快照和备份是否遵守拒绝策略。  
  [#5564](https://github.com/github/copilot-cli/issues/5564)
- **企业 MCP 接入兼容性**：连接体验除认证提示外，还涉及请求头与 WAF 等基础设施的兼容。  
  [#5568](https://github.com/github/copilot-cli/issues/5568)
- **终端与技能交互可用性**：完整保留长输出、正确展示参数提示，是日常 CLI 工作流的基础需求。  
  [#5563](https://github.com/github/copilot-cli/issues/5563) · [#5567](https://github.com/github/copilot-cli/issues/5567)

## 6. 开发者关注点

1. **优先验证安全边界。** 使用沙箱处理敏感文件的团队，应重点核查拒绝路径是否仍产生本地副本；在问题确认前，不宜仅凭“编辑被拒绝”判断内容未被读取或留存。  
   [#5564](https://github.com/github/copilot-cli/issues/5564)

2. **自动化必须有明确终态。** 长时间挂起和重复最终回答均表明，需要验证超时、取消、失败返回及任务完成信号是否可靠。  
   [#5565](https://github.com/github/copilot-cli/issues/5565) · [#5569](https://github.com/github/copilot-cli/issues/5569)

3. **升级后仍需针对性回归。** 建议覆盖侧边聊天消息归属、企业 MCP 验证、长文本滚动及 Skill 参数提示；现有发布摘要不足以确认这些问题已修复。  
   [#5570](https://github.com/github/copilot-cli/issues/5570) · [#5568](https://github.com/github/copilot-cli/issues/5568) · [#5563](https://github.com/github/copilot-cli/issues/5563) · [#5567](https://github.com/github/copilot-cli/issues/5567)

**总体判断：**今日重点是会话执行、企业集成和沙箱边界的可靠性，而非新模型支持。现阶段应以复现质量和潜在影响排序，避免用低互动量的小样本推断社区共识。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-11-25

## 今日速览

今日未有新版本发布，社区讨论主要围绕 **v2 服务稳定性、模型调用与成本控制、权限执行一致性**展开。开发侧持续推进 Code Mode 性能优化、格式化后的编辑可靠性，以及远程执行与云端产物存储能力；多数相关 PR 仍处于开放状态，尚不能视为已交付功能。

> **数据说明**：本日报基于提供的 30 条 Issue、20 条 PR 摘要筛选，非全部更新记录。`CLOSED` 仅表示已关闭，不代表已修复或已合并；PR 评论数缺失，不据此判断讨论热度。

## 社区热点 Issues

以下综合讨论量、影响范围与开发风险选出 10 项。当前评论量整体不高，“热点”更侧重技术影响，而非大规模社区共识。

| Issue | 核心问题与重要性 | 社区反应 / 当前状态 |
|---|---|---|
| [#66166 全局配置中的自定义 Provider 未注册](https://github.com/anomalyco/opencode/issues/66166) | 后台服务启动及文件监听重载均未注册自定义 Provider，导致会话报 `ModelUnavailableError`。直接影响自定义模型接入的可用性。 | **6 条评论，已关闭**，是展示数据中讨论最多的问题；关闭原因及修复交付情况未提供。 |
| [#66146 删除 worktree 导致共享技能注册表丢失](https://github.com/anomalyco/opencode/issues/66146) | 删除含 `SKILL.md` 的 worktree 后，服务从已删除目录重建共享技能注册表，波及其他项目。暴露了跨项目状态隔离风险。 | **4 条评论，已关闭**；是讨论量第二高的条目。 |
| [#66133 嵌入式 SDK 宿主不执行自动化任务](https://github.com/anomalyco/opencode/issues/66133) | `OpenCode.create` 与 `OpenCodeWorkerd.create` 可创建自动化任务，但任务不会运行。对将 OpenCode 嵌入应用或 Worker 的开发者影响较大。 | **3 条评论，开放**，带有 `reproduced` 标签。 |
| [#66112 已连接付费模型，但 `/models` 只显示免费模型](https://github.com/anomalyco/opencode/issues/66112) | 用户称 2.4.1 包含此前修复后仍复现，且凭据已通过 `/connect` 配置，说明模型发现与选择仍存在覆盖缺口。 | **3 条评论、1 个 👍，开放**，标记为模拟复现。 |
| [#66175 MCP OAuth 刷新遗漏 scope](https://github.com/anomalyco/opencode/issues/66175) | Microsoft Entra ID 场景下，首次登录成功，但令牌过期后的刷新请求被拒绝。影响长时间运行的企业 MCP 集成。 | **2 条评论，开放**，标记为模拟复现。 |
| [#66262 格式化后精确编辑失效](https://github.com/anomalyco/opencode/issues/66262) | 格式化改变文件空白后，模型继续使用旧 `oldString`，导致后续编辑失败；模型也未获得最终格式化内容。直接影响连续编码可靠性。 | **1 条评论，开放**；已有对应 PR [#66263](https://github.com/anomalyco/opencode/pull/66263)。 |
| [#66258 缺少限流重试退避与次数配置](https://github.com/anomalyco/opencode/issues/66258) | 限流后自动重发完整会话，缺少重试延迟、`retry-after` 处理及尝试次数上限配置，带来成本与运行可控性问题。 | **1 条评论，开放**，作为功能需求提出。 |
| [#66249 Ollama 输出长度限制未有效传递](https://github.com/anomalyco/opencode/issues/66249) | Agent 请求使用的 `max_completion_tokens` 被 Ollama 兼容端点忽略，标题请求也未设置上限。可能导致生成时间和资源消耗超出预期。 | **1 条评论，开放**，标记为模拟复现。 |
| [#66239 Windows Desktop 的 ask 权限未触发审批](https://github.com/anomalyco/opencode/issues/66239) | 报告称 `effect: "ask"` 不弹出确认，工具直接执行，仅 `deny` 生效。这是需要优先核查的权限边界问题。 | **1 条评论，已关闭**；数据未说明关闭原因，不能据此认定风险已解除。 |
| [#66234 Desktop 与 CLI 上下文用量差异明显](https://github.com/anomalyco/opencode/issues/66234) | 同一简化 Agent 在 CLI 中约使用 672 tokens，Desktop 中约 7,051 tokens。值得排查客户端注入内容与上下文构建差异。 | **1 条评论，开放**，标记为模拟复现；数字来自报告者案例，不代表普遍水平。 |

## 重要 PR 进展

以下 10 项覆盖编辑可靠性、性能、可观测性和平台扩展。**已关闭的 PR 未提供合并信息，不能视为已进入发布版本。**

| PR | 状态 | 内容与意义 |
|---|---|---|
| [#66263 格式化后保持精确编辑稳定](https://github.com/anomalyco/opencode/pull/66263) | **开放** · `needs:compliance` | 对应 Issue #66262，拟解决格式化导致的文本匹配失效，并向模型提供最终格式化状态，改善连续修改文件的成功率。 |
| [#66254 增加后台压缩及等待过程追踪](https://github.com/anomalyco/opencode/pull/66254) | **开放** | 为实验性后台上下文压缩增加追踪信息，帮助定位“正在等待什么、为何等待”的问题，提升长会话诊断能力。 |
| [#66250 减少 Code Mode 重复工作](https://github.com/anomalyco/opencode/pull/66250) | **开放** | 移除 Code Mode 执行中的四处重复工作，重点是降低执行开销，而非新增用户功能。 |
| [#66246 文件变更只计算一次 diff](https://github.com/anomalyco/opencode/pull/66246) | **已关闭** | 减少 `write`、`edit`、`patch` 与 Code Mode 写入路径中的重复 diff，并跳过空侧比较，优化文件操作成本。 |
| [#66242 避免逐字节遍历 Uint8Array](https://github.com/anomalyco/opencode/pull/66242) | **已关闭** | 修正 Code Mode `Bun.write(path, bytes)` 的低效处理路径，针对可能阻塞执行、影响服务稳定性的二进制写入问题。 |
| [#66244 为 MCP 技能标记来源服务器](https://github.com/anomalyco/opencode/pull/66244) | **已关闭** | 让进入模型上下文的 MCP 技能内容明确携带来源，改善来源辨识，并对齐 MCP 技能规范要求。 |
| [#66240 补齐 Workerd 远程执行基础能力](https://github.com/anomalyco/opencode/pull/66240) | **开放** | 接入 Durable Object `alarm()`、工作区附加与空闲挂起、宿主身份类型及 `WorkerClient.fromWebSocket`，推进远程执行基础设施。 |
| [#66233 Cloudflare 产物存储插件](https://github.com/anomalyco/opencode/pull/66233) | **开放** | 基于产物 Provider 接口增加可选 Cloudflare 插件，不属于内置默认能力，体现产物存储的插件化扩展方向。 |
| [#66232 Vercel 产物存储插件](https://github.com/anomalyco/opencode/pull/66232) | **开放** | 增加 Vercel 产物 Provider；作者注明目前仅通过进程内模拟 API 验证，真实环境兼容性仍需进一步验证。 |
| [#66231 S3 产物存储插件](https://github.com/anomalyco/opencode/pull/66231) | **开放** | 增加 S3 产物 Provider，与 Cloudflare、Vercel 方案共同扩展产物存储选择，均依赖底层 Provider 接口工作。 |

## 功能需求趋势

### 1. 模型调用需要更强的成本与行为控制
用户不仅关注“能否接入模型”，还要求能控制重试、输出长度与提示词格式。本次样本中的需求包括可配置限流退避、限制输出，以及允许调整子 Agent 前置提示词。  
相关：[重试配置 #66258](https://github.com/anomalyco/opencode/issues/66258)、[Ollama 输出限制 #66249](https://github.com/anomalyco/opencode/issues/66249)、[子 Agent 提示词 #66235](https://github.com/anomalyco/opencode/issues/66235)。

### 2. SDK 与服务化集成诉求持续出现
嵌入式宿主的自动化执行缺口，以及内置 OpenAI 兼容代理网关的提议，说明部分用户希望把 OpenCode 作为可编程基础设施，而不只是交互式编码工具。  
相关：[SDK 自动化 #66133](https://github.com/anomalyco/opencode/issues/66133)、[内置 LLM 网关 #66236](https://github.com/anomalyco/opencode/issues/66236)。

### 3. Desktop/TUI 更强调工作流连续性
需求集中在减少界面切换与操作中断：问题提示中的链接可点击、插件面板与浏览器并存、快速检索已关闭标签页。  
相关：[TUI 链接 #66157](https://github.com/anomalyco/opencode/issues/66157)、[插件面板布局 #66200](https://github.com/anomalyco/opencode/issues/66200)、[标签页历史快捷键 #66196](https://github.com/anomalyco/opencode/issues/66196)。

### 4. 文件编辑需要与格式化工具可靠协作
社区提出的不是简单放宽匹配，而是让模型看到真实文件状态，避免格式化后继续基于过期文本操作。  
相关：[精确编辑与格式化 #66262](https://github.com/anomalyco/opencode/issues/66262)。

## 开发者关注点

- **共享后台服务的状态一致性**：启动、热重载和 worktree 删除都可能影响 Provider 或技能注册；排查时应区分配置解析成功与实际注册成功。参考 [#66166](https://github.com/anomalyco/opencode/issues/66166)、[#66199](https://github.com/anomalyco/opencode/issues/66199)、[#66146](https://github.com/anomalyco/opencode/issues/66146)。
- **权限配置必须可验证**：`ask` 不触发审批与 `deny execute` 配置报错分别涉及执行语义、配置解析，不能只验证规则文件能够加载。参考 [#66239](https://github.com/anomalyco/opencode/issues/66239)、[#66241](https://github.com/anomalyco/opencode/issues/66241)。
- **跨平台兼容仍是明显摩擦点**：Windows 路径分隔符、Safari 剪贴板图片格式、Wayland 后台渲染各有具体故障，平台差异需要独立测试。参考 [#66192](https://github.com/anomalyco/opencode/issues/66192)、[#66260](https://github.com/anomalyco/opencode/issues/66260)、[#66172](https://github.com/anomalyco/opencode/issues/66172)。
- **长时间运行场景需要专项回归**：令牌过期、服务热重载和 PTY 进程异常都可能在会话运行一段时间后才暴露，单次启动测试不足以覆盖。参考 [#66175](https://github.com/anomalyco/opencode/issues/66175)、[#66199](https://github.com/anomalyco/opencode/issues/66199)、[#66121](https://github.com/anomalyco/opencode/issues/66121)。

**分析结论**：本次样本的主线不是新增模型数量，而是让现有 Agent 工作流更可靠、更可控、更易诊断。对生产集成团队而言，权限行为、后台服务生命周期和模型调用成本应优先纳入回归测试。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-25

## 今日速览

过去 24 小时，Pi 的动态集中在 **模型协议兼容性、长会话稳定性与终端体验修复**；值得关注的开放 PR 包括 Copilot 推理字段回放修复，以及 MCP 无状态协议支持。本期数据包含 **26 条更新 Issue、17 条更新 PR**，无新 Release；Issue 全部显示为已关闭，但不能据此认定问题已修复。

> **数据说明：**来源标注为 `badlogic/pi-mono`，条目指向 `earendil-works/pi`，下文链接采用后者。PR 数据未提供合并状态及有效评论数，因此仅区分“开放／已关闭”，不将关闭等同于合并，也不据此推断讨论热度。

## 社区热点 Issues

以下按潜在影响与技术代表性选取 10 项。整体互动量较低，每项仅有 1–3 条评论；更适合视为值得验证的开发者反馈，而非已形成广泛共识的社区结论。

| Issue | 核心问题与重要性 | 社区反应 |
|---|---|---|
| [#12482 压缩后重新检查输出预算](https://github.com/earendil-works/pi/issues/12482) | 建议在工具批次结束、上下文压缩后，按设置 `max_tokens` 的同一估算方式重新检查预算，避免继续发送无法容纳输出的请求。直接关系长任务能否可靠续跑。 | 已关闭；3 条评论，为本期评论最多的 Issue。 |
| [#12483 自动压缩失败后无限重试](https://github.com/earendil-works/pi/issues/12483) | 报告压缩触及模型输出上限后仍恢复工作，随即再次触发压缩，形成循环。暴露出失败熔断和终止条件问题。 | 已关闭；1 条评论，带 `bug` 标签。 |
| [#12509 Kimi 流式工具调用拆分导致 400](https://github.com/earendil-works/pi/issues/12509) | 据报告，单次函数调用被拆成多个输出项，只有首项包含标识与名称，回放时出现重复工具调用 ID。影响兼容 Responses 接口的多轮工具执行。 | 已关闭；1 条评论，尚无修复信息。 |
| [#12508 Durable 丢失 `??=` 后续写入](https://github.com/earendil-works/pi/issues/12508) | `(doc.x ??= {})[k] = v` 在属性原本不存在时可能只持久化空容器，且不报错。属于值得优先验证的数据完整性风险。 | 已关闭；1 条评论。 |
| [#12499 Provider 503 后静默结束](https://github.com/earendil-works/pi/issues/12499) | 报告请求立即重试、缺少退避或模型轮换，最终会话零输出结束。对无人值守 Agent 的恢复能力和故障可见性影响较大。 | 已关闭；1 条评论。 |
| [#12498 `scope_lock` 无头模式与 Bash 绕过问题](https://github.com/earendil-works/pi/issues/12498) | 报告无头会话收到不可操作的拒绝或 JSON 解析错误，同时 Bash 文件写入可绕过该门控。提示需要核查不同执行路径的权限一致性。 | 已关闭；1 条评论；不能据摘要认定为已确认漏洞。 |
| [#12497 会话请求未进入 pi-ai 遥测](https://github.com/earendil-works/pi/issues/12497) | 报告会话层请求没有生成预期的 `pi.ai.request` span 和指标，可能使线上延迟、错误及用量分析出现盲区。 | 已关闭；1 条评论。 |
| [#12506 后台子 Agent 日志裁剪](https://github.com/earendil-works/pi/issues/12506) | 提议可选省略 JSONL 中的工具结果载荷。提交者报告部分日志达到 90 MB 以上，且超过 99.9% 字节来自工具输出，反映后台运行的存储成本。 | 已关闭；1 条评论；容量数字来自提交者测量。 |
| [#12491 工具定义延迟暴露机制](https://github.com/earendil-works/pi/issues/12491) | 提交者报告预先加载的工具描述约占 55–78 KB，询问是否支持按需暴露。对工具密集型 harness 的提示词体积和上下文利用率有代表性。 | 已关闭；1 条评论。 |
| [#12484 添加 OpenCode Go 决策模型](https://github.com/earendil-works/pi/issues/12484) | 请求添加 `jev-1.14`、`gemini-decision-1`、`gpt-6-luna-decision` 分类模型，体现模型需求正从通用生成扩展到路由与分类任务。 | 已关闭；1 条评论、1 个 👍，是本期唯一获赞 Issue。 |

## 重要 PR 进展

### 开放中的关键工作

1. **[ #12505｜修复 Copilot `reasoning_opaque` 回放](https://github.com/earendil-works/pi/pull/12505)** — **开放**  
   保留并回放 `openai-completions` 流中的不透明推理字段，解决仅保留 `reasoning_text`、遗漏配套字段的问题，重点影响后续轮次的协议兼容性。

2. **[ #12479｜支持 MCP 无状态协议 `2026-07-28`](https://github.com/earendil-works/pi/pull/12479)** — **开放**  
   为 `pi-mcp` 和 Pi MCP 扩展添加新协议支持，同时保持旧协议服务器兼容。对希望降低 HTTP 会话管理负担的工具服务部署值得关注。

### 已关闭的修复类 PR

> 以下仅确认 PR 已关闭；是否合并、何时随版本发布，需另行核实。

3. **[ #12502｜让 HTTP 错误触发响应回调](https://github.com/earendil-works/pi/pull/12502)**  
   修复 SDK 适配器遇到 4xx/5xx 时，`onResponse` 和 `after_provider_response` 不触发的问题，改善限流和服务端错误的可观测性。

4. **[ #12470｜处理 OpenRouter `native_finish_reason`](https://github.com/earendil-works/pi/pull/12470)**  
   识别上游原始结束原因，避免部分模型失败被标准化字段掩盖成正常停止，例如 `MALFORMED_RESPONSE`。

5. **[ #12489｜统一 Claude 关闭 thinking 的能力判断](https://github.com/earendil-works/pi/pull/12489)**  
   从 Anthropic 的 models.dev 条目获取相关能力信息，减少逐 Provider 手写规则遗漏导致的无效请求。

6. **[ #12495｜更新 Copilot 决策模型及账号过滤](https://github.com/earendil-works/pi/pull/12495)**  
   添加 `gpt-6-luna-decisions`，并针对账号模型目录与套餐限制调整分类模型展示，减少“可见但不可调用”的情况。

7. **[ #12492｜替换测试中已从上游目录移除的模型](https://github.com/earendil-works/pi/pull/12492)**  
   应对 models.dev 模型条目变化引发的类型和 CI 失败，反映构建过程对动态外部目录的依赖风险。

8. **[ #12494｜改进 Windows Git Bash 查找](https://github.com/earendil-works/pi/pull/12494)**  
   根据 PATH 中的 Git 定位 Git Bash，避免非默认安装路径下误选 WSL 的 `bash.exe`，导致命令失败或进入错误环境。

9. **[ #12487｜为启动对话框报告阻塞状态](https://github.com/earendil-works/pi/pull/12487)**  
   为进入交互模式前的启动对话框补充 OSC 7501 状态报告，使外部终端或编排工具更容易识别 Pi 正在等待用户操作。

10. **[ #12475｜限制超长 URL 的终端超链接输出](https://github.com/earendil-works/pi/pull/12475)**  
    对超过 8192 字符的 URL 不再输出 OSC 8 超链接，针对特定长行场景可能耗尽 V8 堆内存的问题进行防护。

## 功能需求趋势

- **长会话资源治理成为重点。** 需求涵盖压缩后的预算检查、压缩失败熔断、工具描述按需加载及日志载荷裁剪，说明用户关注的不只是上下文窗口大小，而是长任务的实际运行成本。  
  参考：[预算检查 #12482](https://github.com/earendil-works/pi/issues/12482)、[工具延迟暴露 #12491](https://github.com/earendil-works/pi/issues/12491)、[日志裁剪 #12506](https://github.com/earendil-works/pi/issues/12506)。

- **模型接入从“可配置”走向“开箱即用与元数据完整”。** EXAONE、Inferock、Sarvam 等内置 Provider 请求，与分类模型、`responseModel` 元数据需求并存。  
  参考：[EXAONE #12481](https://github.com/earendil-works/pi/issues/12481)、[Inferock #12496](https://github.com/earendil-works/pi/issues/12496)、[响应模型信息 #12488](https://github.com/earendil-works/pi/issues/12488)。

- **Durable 正被用于更完整的 Agent 基础设施。** 用户不仅关注工具调用批处理，也提出 Postgres 存储后端和持久化正确性问题，显示需求正在延伸至 Web harness 与生产存储集成。  
  参考：[Postgres #12507](https://github.com/earendil-works/pi/issues/12507)、[批量工具调用 #12471](https://github.com/earendil-works/pi/issues/12471)、[写入丢失 #12508](https://github.com/earendil-works/pi/issues/12508)。

- **扩展 API 需要更完整的生命周期支持。** 反馈涉及不中断运行的原生压缩、会话切换后的主题保持，以及宿主包重复解析告警。  
  参考：[压缩触发 #12476](https://github.com/earendil-works/pi/issues/12476)、[主题生命周期 #12468](https://github.com/earendil-works/pi/issues/12468)、[依赖告警 #12493](https://github.com/earendil-works/pi/issues/12493)。

## 开发者关注点

1. **失败必须可解释、可终止。** 自动压缩循环和 Provider 静默退出表明，清晰的终止原因、重试边界及恢复策略比单纯“继续尝试”更重要。  
   参考：[自动压缩 #12483](https://github.com/earendil-works/pi/issues/12483)、[503 处理 #12499](https://github.com/earendil-works/pi/issues/12499)。

2. **兼容接口不等于一致语义。** 流式工具调用分片、响应 ID 关联和实际模型标识，都可能影响网关与多轮会话集成。  
   参考：[Kimi 分片 #12509](https://github.com/earendil-works/pi/issues/12509)、[Responses 会话关联 #12474](https://github.com/earendil-works/pi/issues/12474)。

3. **无头运行需要独立验证。** 权限拒绝是否可处理、工具门控是否覆盖 Bash，以及遥测是否贯通，是后台 Agent 上线前的关键检查项。  
   参考：[权限路径 #12498](https://github.com/earendil-works/pi/issues/12498)、[遥测缺口 #12497](https://github.com/earendil-works/pi/issues/12497)。

4. **错误信息应帮助模型自我修复。** codemode 解析错误仅给行列号、不含源码片段，会增加模型盲目重试；补足诊断上下文有望减少无效执行。  
   参考：[codemode 诊断 #12510](https://github.com/earendil-works/pi/issues/12510)。

**总体判断：**本期更像一次围绕可靠性和兼容性的集中反馈，而非新功能发布日。对使用 Pi 构建生产级 Agent 的团队，优先验证长会话压缩、工具调用回放、持久化写入和故障可观测性，比追逐新增模型数量更有实际价值。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**2026-11-25｜[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

## 今日速览

今日主线是 **CI 稳定性与发布链路修复**：主分支 E2E、Java SDK 和 Managed Agent 检查持续出现失败报告，多项修复 PR 已提交。产品侧集中推进 **Managed Agent 嵌入、Web Shell 配置体验和百炼语音模型支持**，同时出现值得优先核查的 Bash 自动批准与项目技能信任边界反馈。过去 24 小时无新 Release。

> **数据口径：**本次窗口共 34 条 Issue、46 条 PR 更新，以下基于提供的 30 条 Issue 和 20 条 PR 摘要筛选。评论数为条目累计值，不代表今日新增；PR 评论数缺失，不据此判断热度。`CLOSED` 不等同于已合并，Issue 关闭也不单独证明修复已发布。

## 社区热点 Issues

| Issue | 为什么值得关注 | 社区反应与当前状态 |
|---|---|---|
| **[#18252：主分支 E2E 大批测试失败](https://github.com/QwenLM/qwen-code/issues/18252)** | 涉及 cron 工具默认注册等多项测试，反映主分支验证链路存在较大排查压力。 | **26 条评论，OPEN**，是所展示 Issue 中评论最多的条目。报告标注为临时结论，仍需核查更新提交的运行结果。 |
| **[#18253：Java 类体积约束检查失败](https://github.com/QwenLM/qwen-code/issues/18253)** | `ClassSizeRatchetTest` 失败，关系到 Java SDK 的结构约束与可维护性，而非单纯功能正确性。 | **13 条评论，OPEN**，讨论量居前；仍标记为待分诊。 |
| **[#18293：Bash allow 规则可能自动批准命令替换体](https://github.com/QwenLM/qwen-code/issues/18293)** | 报告指出，类似 `Bash(echo *)` 的规则可能连带批准 `echo $(...)` 中隐藏的命令，涉及权限匹配边界。 | **0 条评论，OPEN**；已有修复提案 [#18294](https://github.com/QwenLM/qwen-code/pull/18294)，尚不能视为问题已解决。 |
| **[#18291：项目 SKILL.md 在未建立目录信任时进入上下文](https://github.com/QwenLM/qwen-code/issues/18291)** | 关注“允许技能副作用”与“允许技能内容进入模型上下文”之间的边界，提出可见性提示或显式启用机制。 | **0 条评论，OPEN**；当前属于安全设计反馈，摘要未显示处置结论。 |
| **[#18298：Web Shell 将未设置布尔值显示为 OFF](https://github.com/QwenLM/qwen-code/issues/18298)** | 对没有 schema 默认值的实验设置，“未设置”不等于关闭；错误展示可能让用户误判不同界面的实际行为。 | **4 条评论，OPEN**，是人工反馈中讨论较多的条目；已有对应 PR [#18301](https://github.com/QwenLM/qwen-code/pull/18301)。 |
| **[#18305：语音输入不支持百炼 qwen-audio ASR 系列](https://github.com/QwenLM/qwen-code/issues/18305)** | 模型白名单与原生 DashScope ASR 传输路径缺失，阻碍 `qwen-audio-3.0-asr-flash` 等模型用于批量听写。 | **1 条评论，OPEN**；已提交配套实现 [#18306](https://github.com/QwenLM/qwen-code/pull/18306)。 |
| **[#18311：提供官方 Managed Agent Spring Boot Starter](https://github.com/QwenLM/qwen-code/issues/18311)** | 当前普通 Maven 依赖引入不足以启用相关配置，宿主应用仍需手动导入内部包，增加 Java 集成成本。 | **1 条评论，OPEN**；诉求是形成官方、稳定的 Spring Boot 接入入口。 |
| **[#18289：定义宿主提供执行定义的通用输入边界](https://github.com/QwenLM/qwen-code/issues/18289)** | 希望宿主仅提供最小、有效且已授权的输入，避免适配 Managed Agent 的大量内部实现细节。 | **1 条评论，OPEN**，带功能请求标签；体现嵌入接口抽象需求。 |
| **[#18313：独立会话创建时传递原生 reasoning 选择](https://github.com/QwenLM/qwen-code/issues/18313)** | 部分 Web Shell 宿主仅在创建会话时接收模型配置，若 reasoning 选择未在该阶段传递，界面选择可能无法正确生效。 | **0 条评论，OPEN**；报告场景涉及 `@qwen-code/web-shell@0.27.1`。 |
| **[#18260：短 GBK 中文文件被误识别为 ISO-8859-1](https://github.com/QwenLM/qwen-code/issues/18260)** | 少量中文、无 BOM 的文件容易编码误判，导致模型读到乱码，直接影响中文旧项目的代码理解。 | **0 条评论，OPEN**；报告提及 npm 版本 `0.28.4`，摘要未显示修复进展。 |

## 重要 PR 进展

**以下 10 项当前均为 OPEN，所述能力尚不能视为已合并或已发布。**

| PR | 功能或修复内容 | 主要价值 |
|---|---|---|
| **[#18314：引入 Harness CLI、core、resource 包](https://github.com/QwenLM/qwen-code/pull/18314)** | 将相关包放入 `packages/harness/{cli,core,resource}`，接入 pnpm/npm workspace、构建与类型检查。 | 推进 Harness 代码在同一仓库内的集成与统一验证。 |
| **[#18312：修复 capture-tui 信号处理竞态](https://github.com/QwenLM/qwen-code/pull/18312)** | 退出前跨完整事件循环处理排队信号，针对真实 tmux 测试中的间歇性失败。 | 减少与业务改动无关的 CI 阻塞，对应 [#18271](https://github.com/QwenLM/qwen-code/issues/18271) 报告的失败场景。 |
| **[#18310：按变更路径选择 Managed Agent 快速检查](https://github.com/QwenLM/qwen-code/pull/18310)** | 独立判断是否运行 Java 与 daemon 检查；无关改动不启动 SDK Java 检查。 | 降低验证成本与无关失败干扰，同时保留相关改动的质量门禁。 |
| **[#18309：为发布流程稀疏检出数据获取增加重试保障](https://github.com/QwenLM/qwen-code/pull/18309)** | 将所需 blob 的获取放入 checkout 可重试阶段，避免后续惰性获取失败，并增加元测试。 | 提高发布准备阶段的可靠性。 |
| **[#18297：修复可复现的 main 分支失败](https://github.com/QwenLM/qwen-code/pull/18297)** | 包括限制 Hosted Harness 命令标识长度、修正存储重叠检查中的字段比较等。 | 从具体可复现问题入手修复主分支，而非仅重跑测试。 |
| **[#18294：命令替换场景的 Bash allow 命中降级为询问](https://github.com/QwenLM/qwen-code/pull/18294)** | 对包含命令替换的相关自动批准场景改为请求用户确认。 | 收紧权限边界，回应 [#18293](https://github.com/QwenLM/qwen-code/issues/18293) 的风险报告。 |
| **[#18306：通过原生 DashScope ASR 支持 qwen-audio 听写](https://github.com/QwenLM/qwen-code/pull/18306)** | 新增 `dashscope-multimodal-asr` 传输，支持 `qwen-audio-<major>.<minor>-asr-flash` 及日期快照。 | 补齐百炼语音模型接入路径；带有自报告审查标签，仍需评审验证。 |
| **[#18301：Web Shell 显示布尔设置“未设置”状态](https://github.com/QwenLM/qwen-code/pull/18301)** | 将无存储值且无 schema 默认值的设置显示为 “Not set”，而非直接显示关闭。 | 明确区分未配置与显式禁用，改善配置语义。 |
| **[#18303：公共 Shell Session 支持审批等待挂起](https://github.com/QwenLM/qwen-code/pull/18303)** | 实现 S8a 阶段能力，在指定的 version-0 公共 Shell Session 两条执行通道中挂起审批等待。 | 推进 Managed Agent 的审批生命周期管理。 |
| **[#18280：为 microVM 审查执行增加 guest-exec 桥接](https://github.com/QwenLM/qwen-code/pull/18280)** | 通过 Unix domain socket / vsock 桥接在本地 microVM 内执行 PR 审查，不使用宿主目录读写挂载。 | 推进硬件隔离审查执行，并保持失败时拒绝继续的安全策略。 |

## 功能需求趋势

以下是所给 Issue 样本呈现的主要方向，不代表完整社区投票排名：

- **Managed Agent 从“可嵌入”走向“易集成”。** Spring Boot Starter 与宿主输入边界请求，都在要求减少内部包依赖、明确公共接口与授权责任。参见 [#18311](https://github.com/QwenLM/qwen-code/issues/18311)、[#18289](https://github.com/QwenLM/qwen-code/issues/18289)。
- **Web Shell 更重视配置一致性与会话管理。** 需求覆盖设置三态、reasoning 参数传递，以及归档会话的搜索、过滤、排序、分页和归档时间记录。参见 [#18298](https://github.com/QwenLM/qwen-code/issues/18298)、[#18313](https://github.com/QwenLM/qwen-code/issues/18313)、[#18302](https://github.com/QwenLM/qwen-code/issues/18302)。
- **安全边界需要更细粒度且可感知。** 命令替换是否应被自动批准、项目技能何时进入上下文，成为两个不同层面的权限与信任问题。参见 [#18293](https://github.com/QwenLM/qwen-code/issues/18293)、[#18291](https://github.com/QwenLM/qwen-code/issues/18291)。
- **模型兼容性与中文开发体验仍有缺口。** 百炼 ASR 接入和 GBK 编码识别，分别影响语音输入与旧代码库读取。参见 [#18305](https://github.com/QwenLM/qwen-code/issues/18305)、[#18260](https://github.com/QwenLM/qwen-code/issues/18260)。
- **可靠性与回归测试仍是工程重点。** 除大量 CI 报告外，还有防止测试因断言覆盖不足而“空通过”的专项跟进。参见 [#18252](https://github.com/QwenLM/qwen-code/issues/18252)、[#18292](https://github.com/QwenLM/qwen-code/issues/18292)。

## 开发者关注点

1. **先区分真实回归、测试抖动与过时告警。** 多条 CI 报告注明结果可能已被后续提交覆盖；排查应以最新提交运行结果为准，不能把所有告警直接等同于当前产品缺陷。参见 [#18252](https://github.com/QwenLM/qwen-code/issues/18252)、[#18264](https://github.com/QwenLM/qwen-code/issues/18264)。
2. **发布失败需要按阶段定位。** 现有报告分别涉及 `prepare`、`quality`、集成测试等阶段；部分条目虽已关闭，但本窗口没有新 Release，不能据此确认发布恢复。参见 [#18286](https://github.com/QwenLM/qwen-code/issues/18286)、[#18283](https://github.com/QwenLM/qwen-code/issues/18283)、[#18244](https://github.com/QwenLM/qwen-code/issues/18244)。
3. **配置必须“看得懂、传得到、行为一致”。** Web Shell 的未设置状态与会话创建参数遗漏，说明 UI 展示、配置解析和宿主接口之间仍存在语义断层。参见 [#18298](https://github.com/QwenLM/qwen-code/issues/18298)、[#18313](https://github.com/QwenLM/qwen-code/issues/18313)。
4. **涉及自动执行与上下文注入的反馈，应优先核查。** 即使评论数较少，也不应低估 Bash allow 规则和项目技能信任边界的潜在影响；当前应跟踪复现、评审和最终修复状态。参见 [#18293](https://github.com/QwenLM/qwen-code/issues/18293)、[#18291](https://github.com/QwenLM/qwen-code/issues/18291)。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-25**

> **数据说明**：本期按所给过去 24 小时统计窗口整理，共有 35 条 PR 更新，以下分析基于展示的 20 条。数据源标为 `Hmbown/DeepSeek-TUI`，但 PR 指向 `codewhale-hq/Codewhale`，本文沿用所给 PR 目标仓库链接。`CLOSED` 不等于已合并；评论数为 `undefined`，无法据此判断讨论热度。

## 1. 今日速览

开发工作集中在 **0.10.5 发布准备、安全加固和运行稳定性收尾**；版本准备 PR 仍处于开放状态，明确要求等待创始人批准后才能合并、打标签和发布，过去 24 小时暂无新 Release。功能侧值得关注的是通过 `/model` 或 `--agent` 选择外部 ACP Agent，以及插件与运行时能力扩展；本期没有更新的 Issue，无法评估社区讨论热点。  
相关：[版本准备 #7560](https://github.com/codewhale-hq/Codewhale/pull/7560) · [ACP Agent #7552](https://github.com/codewhale-hq/Codewhale/pull/7552)

## 2. 社区热点 Issues

**本期无可列出的热点 Issue。** 所给数据中，过去 24 小时更新的 Issue 为 **0 条**，因此不凑足 10 条，也不将 PR 当作 Issue。该结果仅代表本期采集窗口，不代表项目没有存量问题或功能请求。

入口：[源仓库 Issues](https://github.com/Hmbown/DeepSeek-TUI/issues)

## 3. 重要 PR 进展

以下按发布影响、功能价值和风险优先级筛选，不代表评论热度排名。

| PR | 状态 | 内容与重要性 |
|---|---|---|
| [#7560：准备 0.10.5 发布](https://github.com/codewhale-hq/Codewhale/pull/7560) | **OPEN** | 将整理后的 Unreleased 内容转为 `0.10.5` 版本记录，并更新版本号。**仍需发布批准**，不能视为版本已经上线。 |
| [#7558：Wave 2 运行时与插件能力](https://github.com/codewhale-hq/Codewhale/pull/7558) | CLOSED | 汇总 DSH 0.2.2 host services、逐插件设置、遥测真实性及 Wave 2 runtime 工作，是观察插件和运行时演进的主要入口。摘要提到变基时移除了部分已落地主干的重复代码。 |
| [#7552：支持选择外部 ACP Agent](https://github.com/codewhale-hq/Codewhale/pull/7552) | CLOSED | 支持在 `/model` 中或通过 `--agent` 选择已安装的 Antigravity、OpenCode、Copilot 等外部 Agent，并补充完成事件中的状态与错误处理。提升跨 Agent 工作流的可用性。 |
| [#7555：批量安全加固](https://github.com/codewhale-hq/Codewhale/pull/7555) | CLOSED | 涉及授权与安全状态持久化失败时默认拒绝、工具日志脱敏、运行时密钥路径、URL 脱敏、Webhook TLS 和执行策略绕过防护。直接关系到工具执行与敏感数据边界。 |
| [#7545：处理 CodeQL 扫描告警](https://github.com/codewhale-hq/Codewhale/pull/7545) | CLOSED | 调整 CI 工作流检出与 SHA 校验，并以线性确定性扫描器替换 Web 测试中的正则 HTML 清理逻辑。重点在于收紧 CI 输入边界和消除扫描风险。 |
| [#7544：修复 Skills 加载与配置契约](https://github.com/codewhale-hq/Codewhale/pull/7544) | CLOSED | 涵盖子目录伴随文件、多语言触发词、Tier 3 路径及严格 `[skills]` 配置；文件枚举设置深度、数量限制并跳过隐藏项和符号链接，兼顾完整性与边界控制。 |
| [#7543：统一子 Agent 停止语义](https://github.com/codewhale-hq/Codewhale/pull/7543) | CLOSED | 区分 `subagent.interrupted` 与 `subagent.cancelled`，并处理预算回收、邮箱状态和默认深度。避免将中断或取消误当成正常完成。 |
| [#7546：结构化记录失败原因](https://github.com/codewhale-hq/Codewhale/pull/7546) | CLOSED | 为 Provider 回执和回合结果补充结构化失败信息，包括错误码、类别、传输信息及可选 HTTP 状态、超时与阶段字段，便于定位和分类故障。 |
| [#7554：防止会话持久化竞态](https://github.com/codewhale-hq/Codewhale/pull/7554) | CLOSED | 在 `dispatch_in_flight` 期间保护后台会话持久化路径，避免保存与正在派发的状态冲突的快照，并增加 TUI 回归测试。 |
| [#7541：加固损坏会话记录重建](https://github.com/codewhale-hq/Codewhale/pull/7541) | CLOSED | 将文件读取与 JSON 反序列化分离，读取遇到符号链接、非普通文件、超大文件或权限问题时跳过，避免误重建或覆盖；同时加强较新 schema 场景处理。 |

## 4. 功能需求趋势

**由于本期没有 Issue，以下仅是从 PR 推断的开发方向，不代表已验证的社区需求排名。**

- **多 Agent 互操作**：外部 ACP Agent 进入模型选择和 CLI 入口，显示项目在扩展可承载的执行后端。参考：[#7552](https://github.com/codewhale-hq/Codewhale/pull/7552)。
- **插件与 Skills 精细化管理**：逐插件设置、host services、多语言触发与伴随文件加载同步推进。参考：[#7558](https://github.com/codewhale-hq/Codewhale/pull/7558)、[#7544](https://github.com/codewhale-hq/Codewhale/pull/7544)。
- **更清晰的模型推理配置**：TUI 复用引擎侧 effort 解析器，并补充 Ollama Cloud effort 档位，减少配置语义不一致。参考：[#7557](https://github.com/codewhale-hq/Codewhale/pull/7557)。
- **可靠、可诊断的长任务执行**：子 Agent 生命周期、结构化错误和会话恢复共同指向运行可靠性建设。参考：[#7543](https://github.com/codewhale-hq/Codewhale/pull/7543)、[#7546](https://github.com/codewhale-hq/Codewhale/pull/7546)、[#7541](https://github.com/codewhale-hq/Codewhale/pull/7541)。

## 5. 开发者关注点

以下是修复内容反映的工程痛点，而非可量化的用户反馈频次：

1. **安全策略应默认拒绝**：授权保存失败、动态命令参数或解析失败不能成为放行路径。参考：[#7555](https://github.com/codewhale-hq/Codewhale/pull/7555)、[#7542](https://github.com/codewhale-hq/Codewhale/pull/7542)。
2. **状态与错误语义需要准确**：中断、取消、正常完成以及 Provider 失败应明确区分，降低排障歧义。参考：[#7543](https://github.com/codewhale-hq/Codewhale/pull/7543)、[#7546](https://github.com/codewhale-hq/Codewhale/pull/7546)。
3. **会话数据不能被竞态或恢复逻辑损坏**：后台写入与异常记录重建均在补强保护条件。参考：[#7554](https://github.com/codewhale-hq/Codewhale/pull/7554)、[#7541](https://github.com/codewhale-hq/Codewhale/pull/7541)。
4. **减少重复入口与配置歧义**：统一信任来源、`/rlm` 入口和模型 effort 解析，体现出收敛实现路径、降低维护成本的方向。参考：[#7553](https://github.com/codewhale-hq/Codewhale/pull/7553)、[#7557](https://github.com/codewhale-hq/Codewhale/pull/7557)。

**后续重点**：跟踪 [#7560](https://github.com/codewhale-hq/Codewhale/pull/7560) 的批准与正式 Release，而不是仅凭发布准备 PR 或其他 PR 的关闭状态判断功能已经交付。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*