# AI CLI 工具社区动态日报 2026-11-24

> 生成时间: 2026-11-24 05:45 UTC | 覆盖工具: 9 个

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
**日期：2026-11-24｜基于所提供的过去 24 小时社区快照**

> **口径说明：**Issue、PR 数表示统计窗口内有更新的条目，不等于当日新建数量；部分仓库仅展示样本。用户反馈不等于官方确认，PR 关闭不等于合并或发布。以下定位与趋势属于对当前样本的分析，不代表完整产品能力排名。

## 1. 生态全景

AI CLI 正从终端中的代码助手，扩展为覆盖桌面、IDE、浏览器、远程服务与多代理自动化的开发环境。功能扩张仍在继续，但本日跨社区最一致的关注点已转向**执行边界、长任务恢复、会话状态一致性与成本透明度**。MCP、Hooks、ACP 和插件正在成为关键集成层，其认证、取消、校验及生命周期管理也成为故障高发环节。竞争重点因此不再只是“支持多少模型、能调用多少工具”，而是能否让 Agent 在复杂环境下持续、可控、可审计地完成任务。

## 2. 各工具活跃度对比

| 工具 | 更新 Issues 数 | 更新 PR 数 | Release 情况 | 当日主要方向 |
|---|---:|---:|---|---|
| **Claude Code** | 50（展示 30） | 0 | **1 个**：v2.1.331 | 多云 Code Mode、企业身份配置；执行与会话可靠性 |
| **OpenAI Codex** | 50（展示 30） | 50（展示 20） | **4 个**：0.172.0 正式版及 3 个 Alpha | 终端导航、审批、恢复、MCP 认证、插件签名 |
| **Gemini CLI** | 5 | 23（展示 20） | **4 个**：2 个稳定版、1 个 Preview、1 个 Nightly | A2A 安全补丁、扩展授权、MCP OAuth |
| **GitHub Copilot CLI** | 6 | 0 | **1 个**：v1.0.115-8 | 子代理用量统计、权限审核容错 |
| **Kimi Code CLI** | 0 | 0 | 无 | 过去 24 小时无活动 |
| **OpenCode** | 50（展示 30） | 50（展示 20） | **2 个**：v2.4.0、v2.4.1 | 内置浏览器、桌面工作台、插件自动化 |
| **Pi** | 未提供总数 | 未提供总数 | 无新版本 | 多模型协议适配、长会话、大输出稳定性 |
| **Qwen Code** | 15 | 50（展示 20） | 无新版本 | 日志安全、执行内核、资源快照、分层沙箱 |
| **DeepSeek TUI／Codewhale¹** | 2（均为机器人巡检） | 未提供总数，展示 20 条 | **1 个**：v0.10.4 | Windows 粘贴热修复、更新机制、引擎治理 |

¹ 来源名称为 DeepSeek TUI，但具体条目与发布指向 Codewhale；Pi 的来源仓库与条目链接也不一致。两者均应在进一步尽调时核验仓库身份。

**解读：**
- 在已披露统计中，**Codex、OpenCode**同时处于 Issue 与 PR 高更新量组；**Qwen Code**则呈现 PR 活跃度较高、用户反馈量相对较少的结构。
- Claude Code、Copilot CLI 虽无更新 PR 记录，但均有版本发布，说明**该仓库的可见 PR 数不能直接代表产品研发投入**。
- 多版本发布包含稳定、预览和补丁渠道，不能简单按 Release 数量判断创新速度。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与信号 |
|---|---|---|
| **执行安全与权限治理** | Claude Code、Codex、Gemini、Qwen、Copilot、Codewhale | Hook 阻断是否可靠、审批是否可恢复、A2A 认证、扩展内容授权、日志凭据保护、沙箱执行与 Ask 模式约束 |
| **长任务与恢复可靠性** | Claude Code、Codex、Gemini、Pi、Qwen、OpenCode | 压缩后工具丢失、任务提前结束、取消与远端执行不一致、恢复历史缺失、压缩死锁、无头初始化不确定 |
| **MCP 与插件工程化** | Claude Code、Codex、Gemini、Copilot、OpenCode、Pi、Qwen | 凭据刷新、OAuth 超时、Schema 故障隔离、工具注册时序、请求 ID 兼容、插件初始化与资源生命周期 |
| **多会话、跨端状态管理** | Claude Code、Codex、OpenCode、Pi、Qwen | 跨主机恢复互斥、IDE 历史、会话状态可见性、分支记录一致性、文件路径绑定正确工作区 |
| **成本与执行可观测性** | Claude Code、Codex、Copilot、OpenCode、Pi | 额度分类与对账、子代理用量、长命令减少轮询、价格档位准确性、缓存续接和实际模型信息 |
| **模型能力的准确适配** | Pi、Qwen、OpenCode、Codex | 推理等级、认证权限、上下文窗口、模型目录、服务档位及上游元数据变化 |

其中两组问题尤其值得区分：

- **“取消成功”不等于“远端没有执行”。** Gemini 的 MCP 取消反馈、OpenCode 的取消信号修复及 Pi 的中断记录问题，共同说明取消需要明确语义和副作用核验。
- **“支持某模型”不等于“所有接入路径行为一致”。** Pi 的 OAuth/API Key 差异、Qwen 的推理能力映射及 OpenCode 的档位配置问题，说明适配必须细化到认证方式、参数与模型版本。

## 4. 差异化定位分析

以下为本日动态呈现的侧重点，而非互斥的产品分类。

| 工具 | 功能与技术路线侧重 | 更匹配的用户或场景 | 当前重点验证项 |
|---|---|---|---|
| **Claude Code** | 多云分发、企业身份、Hooks 与协作会话 | 企业云环境、已有 Claude 工作流的团队 | 执行隔离、Hook 生效时机、跨主机会话一致性 |
| **Codex** | 终端与多端会话衔接，审批、恢复、插件安全 | 持续开发任务、IDE/桌面/远程协同 | 长任务完成判定、审批恢复、用量归因 |
| **Gemini CLI** | A2A/MCP 服务集成、扩展授权与安全补丁 | 服务化 Agent、协议集成和扩展开发 | A2A 升级兼容、OAuth 阻塞、取消语义 |
| **Copilot CLI** | 子代理统计、辅助权限审核、MCP/ACP 接口 | 依赖 GitHub 工具链及外部客户端的开发者 | Linux 原生稳定性、Schema 隔离、事件流兼容 |
| **OpenCode** | 内置浏览器与 IDE 式桌面工作台，插件及嵌入式 SDK | 希望整合浏览器、项目管理与自动化的用户 | 后台执行、插件启动、MCP 注册、跨平台升级 |
| **Pi** | 多提供商协议适配、跨模型历史转换、流式处理 | 多模型切换、需要底层适配灵活性的开发者 | 缓存续接、推理参数、压缩有效性、大输入性能 |
| **Qwen Code** | 共享执行内核、服务端资源一致性、沙箱与 microVM | 自托管服务、定制 Agent、自动化 PR 审查 | 日志脱敏、工具参数、Hook 语义、架构迁移回归 |
| **Codewhale** | 终端体验、配置统一、安装更新与引擎治理 | 重视 TUI、Windows 使用及协作桥接的用户 | 更新归属、模型默认值语义、CI 与安全巡检 |
| **Kimi Code CLI** | 当日无新增信号 | 本快照不足以判断 | 需结合更长时间窗口评估 |

## 5. 社区热度与成熟度

### 活跃度：区分反馈、开发与讨论

- **反馈与开发更新量均较高：Codex、OpenCode。** 两者均为 50 条 Issue、50 条 PR 更新，但这只是更新量，未反映独立贡献者数或合并效率。
- **实现推进密集：Qwen Code。** 50 条 PR 更新涉及执行内核、服务端一致性与隔离验证，显示较强的基础架构投入；多数重点方案仍开放，交付效果有待验证。
- **安全补丁落地明确：Gemini CLI。** A2A 认证与输入校验修复已进入 v0.71.1，是本日证据较完整的稳定版安全交付。
- **用户反馈突出、公开修复链条较少：Claude Code、Copilot CLI。** 当前快照不足以判断修复速度。
- **Pi、Codewhale 更偏底层工程治理。** 总量或人工讨论数据不足，不宜与高更新量仓库直接排名。

### 讨论热度整体有限

可见样本中，OpenCode 的浏览器工作流 Issue 达 **8 条评论**，MCP 注册问题为 **5 条**；Codex 模型行为反馈为 **4 条**；其余多数仅 **0—3 条**。因此，本日报更能反映**问题类型与工程投入方向**，而不是广泛用户共识。

### 成熟度不能由发布频率代替

- OpenCode 的浏览器扩展、Qwen 的内核与沙箱工作，体现出**能力边界快速扩张**，也意味着更大的回归测试面。
- Codex、Gemini 的多渠道发布体现迭代与验证机制，但不能仅凭渠道数量判定质量。
- Claude Code、Pi、Qwen 的压缩、恢复和状态一致性反馈表明，**长时间自主运行仍是跨产品的共同工程挑战**。
- Kimi 单日无活动，不足以推断维护停滞。

## 6. 值得关注的趋势信号

### ① Agent 竞争正在转向“任务是否真正完成”

Codex 的提前结束、Claude 的工具可见性、Pi 与 Qwen 的压缩恢复问题，都指向同一要求：不能只依赖模型宣布完成。

**开发者参考：**用可验证产物、测试结果、剩余任务清单和持久化检查点评估 Agent，而非只比较单轮代码生成质量。

### ② 执行状态需要成为明确的接口契约

“停止等待”“取消请求”“远端终止”“结果已持久化”是不同状态；跨端恢复还需要处理重复写入与并发执行。

**开发者参考：**对有副作用的工具引入幂等键、执行回执和状态查询；恢复时先核验结果，再决定重试。

### ③ 安全正在覆盖完整生命周期

安全议题已从审批提示扩展到插件签名、扩展内容授权、日志凭据、项目作用域和 microVM 隔离。

**开发者参考：**不要把 Hook 当作唯一安全边界。将最小权限、隔离执行、密钥脱敏及供应链验证组合使用；Qwen 的日志权限 PR 即使落地，也不能替代内容脱敏。

### ④ 集成协议正在成为产品可靠性的关键层

MCP、ACP、A2A 的认证、Schema、事件与取消语义，已直接决定整个会话能否继续，而非仅影响某个附加功能。

**开发者参考：**建立协议契约测试矩阵，覆盖异常工具、凭据过期、事件缺失和服务无响应；单个插件失败应可隔离降级。

### ⑤ 多模型选择的价值取决于适配准确性

模型目录、认证权限、推理参数、历史元数据和缓存行为需要共同匹配。可选模型数量增加，也会扩大兼容性测试成本。

**开发者参考：**以“提供商 × 认证方式 × 模型 × 工具调用 × 长会话恢复”验证实际工作流，不要只检查模型是否出现在菜单中。

### ⑥ CLI、IDE 与浏览器的边界继续融合

OpenCode 内置浏览器、Claude 多云终端能力，以及多工具的桌面与 IDE 历史需求，说明用户需要连续的任务环境，而非孤立入口。

**开发者参考：**选型时除模型效果外，还应评估项目身份、会话历史、浏览器凭据与后台任务能否在不同界面间可靠衔接。

---

**总体判断：**本日没有足够依据给出单一“最佳工具”。技术决策应优先比较三项：**执行边界是否可验证、长任务失败后是否可恢复、成本与实际执行状态是否可观测**。新增浏览器、多模型和多代理能力有吸引力，但它们只有在这三项基础能力可靠时，才能稳定转化为开发效率。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-24｜基于所提供的 20 条 PR、15 条 Issue**

> **数据说明：**所有展示的 PR 评论数均为 `undefined`、👍 均为 0，因此无法验证其真实热度排名。以下按**关联 Issue 的讨论强度、需求覆盖面与技术影响**筛选重点，而非声称它们是评论数前八。所有展示 PR 均为 **OPEN**，没有已合并或 Draft 的明确记录。

## 1. 热门 Skills 排行：八项重点关注 PR

| Skill / PR | 功能与变更 | 社区关注点 | 当前状态 |
|---|---|---|---|
| **skill-creator：评测可靠性** [#1298](https://github.com/anthropics/skills/pull/1298) | 隔离触发评测，处理 Windows 子进程兼容性及运行时失败 | 社区报告“应触发却不触发”、并发评测产生假阴性；核心是**评测分数是否可信**，关联 [#556](https://github.com/anthropics/skills/issues/556)（13 评论）与 [#1352](https://github.com/anthropics/skills/issues/1352)（6 评论） | **OPEN**；最后更新 9 月 16 日 |
| **mcp-builder：MCP 2.x 兼容** [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 `streamable_http_client` 重命名及自定义 HTTP headers 配置方式 | 解决上游依赖升级造成的连接兼容问题，影响 MCP 服务构建与接入 | **OPEN**；最后更新 10 月 8 日 |
| **webapp-testing：命令执行安全** [#1980](https://github.com/anthropics/skills/pull/1980) | 避免 `with_server.py` 使用 `shell=True` | 用户或 Agent 生成的命令进入 Shell 后可能产生注入风险；关注**自动化便利性与执行安全的边界** | **OPEN**；最后更新 11 月 1 日 |
| **docx：修订处理结果验证** [#1792](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时返回错误，并检查输出是否仍含修订标记 | 避免“脚本报告成功、文档实际上未处理完成”，提升交付可信度 | **OPEN**；最后更新 11 月 1 日 |
| **xlsx：外部链接风险识别** [#2019](https://github.com/anthropics/skills/pull/2019) | 解析工作表作用域的名称定义及间接别名引用 | 降低 Excel 外部链接风险检测的漏报，补齐复杂工作簿边界场景 | **OPEN**；最后更新 11 月 3 日 |
| **Notion 规格转实施任务** [#1245](https://github.com/anthropics/skills/pull/1245) | 将产品、技术规格拆解为 Notion 任务、验收标准与进度跟踪；同一 PR 还包含简历审计 Skill | 将“读需求”延伸为“可执行计划”，具备工作流自动化价值；但没有可验证的讨论热度数据 | **OPEN**；最后更新 10 月 15 日 |
| **md2video-audio：Markdown 转视频** [#1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经演示文稿流程转换为带配音的 MP4 | 扩展文档到多媒体内容生产的链路；“零成本”和成片质量属于提交者描述，尚不能视为已验证效果 | **OPEN**；最后更新 9 月 15 日 |
| **skill-creator：打包可用性** [#1681](https://github.com/anthropics/skills/pull/1681) | 修复 `package_skill.py` 独立执行时的模块导入失败，更新使用路径 | 降低 Skill 作者的打包与分发门槛，是近期仍有更新的基础工具修复 | **OPEN**；最后更新 **11 月 19 日** |

**判断：**样本中最强的信号不是“新增 Skill 数量”，而是**已有 Skills 的可靠性、安全性与可维护性**。

## 2. 社区需求趋势

### ① 安全治理与可信分发：讨论最集中的议题
- [#492](https://github.com/anthropics/skills/issues/492)：**46 评论、3 👍**，是所展示 Issue 中评论最多的一项。报告称社区 Skill 使用 `anthropic/` 命名空间，可能让用户误认为官方内容。
- [#412](https://github.com/anthropics/skills/issues/412)：提出 `agent-governance` Skill，覆盖策略执行、威胁检测、信任评分和审计轨迹；目前 **CLOSED**，但关闭不等于已实现。

**需求方向：**来源验证、权限边界、安全审查与 Agent 治理，而不只是增加任务能力。

### ② Skill 创建、触发与评测：需要可验证的开发闭环
- [#556](https://github.com/anthropics/skills/issues/556)：**13 评论、7 👍**，反馈批量评测中触发率为零。
- [#1352](https://github.com/anthropics/skills/issues/1352)：**6 评论、3 👍**，指出并发 worker 可能交叉匹配 UUID，导致假阴性。
- [#2064](https://github.com/anthropics/skills/issues/2064)：要求描述明确说明“何时使用”，而不仅是“能做什么”。

**需求方向：**触发条件设计、自动化验证与评测工具修复。现有数据对这一方向的支持，强于对“新增代码审查或测试生成 Skill”的支持。

### ③ 企业共享与安装管理：从个人工具走向团队资产
- [#228](https://github.com/anthropics/skills/issues/228)：**17 评论、8 👍**，希望在 Claude.ai 内直接组织级共享 Skills，替代手工下载、转发与上传。
- [#189](https://github.com/anthropics/skills/issues/189)：**6 评论、9 👍**，反馈插件内容重复，造成重复 Skills 和上下文占用。

**需求方向：**团队 Skill 库、统一分发与安装去重。注意：组织共享诉求属于 Claude.ai 产品层，不应直接视为 Claude Code 已规划功能。

### ④ 长任务记忆与上下文效率
- [#1329](https://github.com/anthropics/skills/issues/1329)：**10 评论**，提议 `compact-memory`，用紧凑符号表达长期 Agent 状态。
- [#1487](https://github.com/anthropics/skills/issues/1487)：**5 评论**，报告 `claude-api` 一次加载约 156k tokens，可能耗尽上下文。

**需求方向：**状态压缩、按需加载与减少无关资料注入。

### ⑤ 输出质量门禁与文档完整性
- [#1385](https://github.com/anthropics/skills/issues/1385)：**7 评论**，提议“任务前校准—对抗审查—交付验证”三阶段质量门禁。
- [#2018](https://github.com/anthropics/skills/issues/2018)：**4 评论**，反馈 DOCX 合并脚本可能写出无效 XML。

**需求方向：**把“完成任务”升级为“产物经过验证”，尤其关注文件有效性与交付检查。

## 3. 高潜力待合并 Skills

**无法确认哪些 PR“评论活跃”，也无法据此预测近期合并。**以下是更值得跟踪的候选，依据是需求明确、修复价值或近期更新：

| 候选 PR | 值得跟踪的理由 | 主要观察点 |
|---|---|---|
| [#1298：skill-creator 评测修复](https://github.com/anthropics/skills/pull/1298) | 与多条高讨论度评测问题高度相关，影响整个 Skill 优化链路 | 并发、Windows 与运行失败分类的回归验证 |
| [#1681：打包脚本独立执行](https://github.com/anthropics/skills/pull/1681) | 11 月 19 日仍有更新，问题具体，直接改善贡献者体验 | 独立执行与包内执行两种方式是否均通过验证 |
| [#1980：Web 测试命令安全](https://github.com/anthropics/skills/pull/1980) | 涉及自动执行命令的安全边界，修复价值高 | 移除 Shell 后是否兼容原有服务器启动工作流 |
| [#2019：Excel 外链检测](https://github.com/anthropics/skills/pull/2019) | 面向可复现的漏报场景，11 月初仍有更新 | 作用域名称、间接别名和复杂引用的测试覆盖 |
| [#1792：DOCX 输出验证](https://github.com/anthropics/skills/pull/1792) | 将超时与残留修订显式判错，能减少错误交付 | LibreOffice 异常处理和修订标记检查的完整性 |

新增能力方面，[Notion 规格转实施 #1245](https://github.com/anthropics/skills/pull/1245) 值得作为工作流自动化候选持续关注，但现有数据不足以判断合并时间。

## 4. Skills 生态洞察

**当前社区最集中的诉求，是让 Skills 从“能执行的提示与脚本”变成“来源可信、触发准确、团队可共享且交付可验证的工程化能力”——以[可信分发 #492](https://github.com/anthropics/skills/issues/492)、[组织共享 #228](https://github.com/anthropics/skills/issues/228)和[评测可靠性 #556](https://github.com/anthropics/skills/issues/556)最具代表性。**

---

# Claude Code 社区动态日报
**日期：2026-11-24**  
**数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)**

> 统计口径：过去 24 小时有 1 个新版本、50 条更新的 Issue、0 条更新的 PR；以下分析基于提供的 30 条 Issue。问题描述均为用户反馈，不代表官方已确认；Release 摘要存在截断。

## 1. 今日速览

Claude Code 发布 **v2.1.331**，将终端会话中的 Code Mode 支持扩展至多个云平台，并补充网关 OIDC 群组配置能力。社区反馈主要集中在**自动化执行安全、工具与 Hook 可靠性、多会话一致性，以及云端与代理接入问题**。当前讨论量较低，所展示 Issue 最多仅有 2 条评论，宜按风险和复现信息判断优先级，而非视为大范围故障。

## 2. 版本发布

### [v2.1.331](https://github.com/anthropics/claude-code/releases/tag/v2.1.331)

- **多云 Code Mode 支持**：在 Amazon Bedrock、Google Cloud Agent Platform、Microsoft Foundry、Claude Platform on AWS 的终端会话中增加 Code Mode 支持。
- **网关身份配置增强**：Claude apps gateway 新增 `oidc.groups_jsonpath`，用于从对象列表中的匹配项读取群组信息。原始说明在此处截断，具体语法及限制需查阅完整发布说明。

**开发者意义：** 多云部署能力继续扩展；使用企业身份网关的团队也有新的群组映射选项。但不能据此推断下述社区问题已在该版本修复。

## 3. 社区热点 Issues

以下按潜在影响与技术排查价值筛选。**10 项均为 0 个 👍**，评论数为数据快照中的数量。

| Issue | 核心反馈及重要性 | 社区反应与状态 |
|---|---|---|
| [#111921 自动任务被报告删除仓库外文件](https://github.com/anthropics/claude-code/issues/111921) | 用户称自主任务未经审查运行仓库测试，导致仓库外文件被删除。涉及数据丢失和执行边界，应优先核查测试脚本、文件权限与隔离措施。 | **OPEN · 2 评论**；带 `data-loss` 标签，尚不能据此确认根因。 |
| [#111902 Cowork 的 `mcp_tool` Hooks 未执行](https://github.com/anthropics/claude-code/issues/111902) | 报告称插件 Hook 已加载却未调用，且 `onFailure: "block"` 未阻止工具执行。若依赖 Hook 实施执行前检查，影响较大。 | **OPEN · 1 评论**；带 `has repro` 标签，同插件的 command hooks 据称正常。 |
| [#111915 上下文压缩后 ToolSearch 工具再次被延迟加载](https://github.com/anthropics/claude-code/issues/111915) | 报告称压缩移除了让工具 schema 可见的 `tool_reference`，后续请求仍将工具标记为延迟加载。可能影响长会话与 Agent SDK 的工具可用性。 | **OPEN · 1 评论**；标记为回归，提供请求体复现，涉及 2.1.321、2.1.331。 |
| [#111932 项目级 Chrome 禁用配置生效过晚](https://github.com/anthropics/claude-code/issues/111932) | 全局默认启用 Claude in Chrome 时，项目中的 `CLAUDE_CODE_ENABLE_CFC=0` 被接受，但据称在 Chrome 集成接入后才应用。关系到项目级配置的隔离预期。 | **OPEN · 2 评论**；带 `has repro` 标签。 |
| [#111939 跨主机恢复会话产生双实例写入](https://github.com/anthropics/claude-code/issues/111939) | 用户报告第二台主机恢复会话后，原实例仍运行，两者无警告地写入同一 transcript。可能造成记录交错及重复操作。 | **OPEN · 0 评论**；需进一步验证并发恢复行为。 |
| [#111897 网关 Auto mode 错误提示与静默回退](https://github.com/anthropics/claude-code/issues/111897) | 在 LiteLLM 代理配置下，用户报告 beta 参数组合引发误导性的余额不足错误，同时分类器模型静默回退。增加代理接入与权限判断的排障难度。 | **OPEN · 2 评论**；涉及 Claude Code 2.1.330，部署条件较具体。 |
| [#111925 Bedrock SSO 过期后模型标识错误持续](https://github.com/anthropics/claude-code/issues/111925) | 报告称会话启动时 SSO 过期会锁定区域前缀回退结果，重新登录后仍出现 400 错误。值得关注认证恢复与模型路由状态的关系。 | **OPEN · 0 评论**；带 `has repro` 标签，但报告者未确认使用最新版。 |
| [#111922 云会话无法组建 Agent teams](https://github.com/anthropics/claude-code/issues/111922) | 用户称托管云会话实际无法启用 Agent teams，与文档描述不一致。影响团队对云端多代理工作流的采用预期。 | **OPEN · 0 评论**；带 `has repro` 标签，涉及 2.1.330、2.1.331 和 Team 计划。 |
| [#111903 跨会话消息“可见但未送达”](https://github.com/anthropics/claude-code/issues/111903) | Windows Desktop 中，`send_message` 返回 `undelivered`，目标会话记录却显示消息，CLI 进程未收到。暴露界面记录与实际投递状态的一致性问题。 | **CLOSED · 2 评论**；给定数据未提供关闭原因，不能等同于已修复。 |
| [#111919 远程 PC 控制额度显示不一致](https://github.com/anthropics/claude-code/issues/111919) | 用户报告总体用量 62%，Claude Code 产品用量却达 100%，远程控制因此被限流。需要更清楚地区分总体额度与产品级额度。 | **OPEN · 0 评论**；同作者的 [#111918](https://github.com/anthropics/claude-code/issues/111918) 内容相同，不应计为两个独立案例。 |

## 4. 重要 PR 进展

**过去 24 小时没有更新的 PR，无法列出 10 个重要 PR。** 现有数据也未提供上述 Issue 对应的修复提交或合并记录，因此暂不能判断修复落地情况。

入口：[仓库 Pull Requests](https://github.com/anthropics/claude-code/pulls)

## 5. 功能需求趋势

以下是所展示样本中的方向性信号，不代表全部 50 条 Issue 的完整排名。

- **会话与项目管理更精细**：希望 `/resume` 按当前工作目录筛选，并在项目中提供可视化规划视图，减少多项目、长任务中的导航成本。  
  相关：[工作目录筛选 #111938](https://github.com/anthropics/claude-code/issues/111938)、[项目规划视图 #111916](https://github.com/anthropics/claude-code/issues/111916)。

- **IDE 与 Hook 的交互闭环**：VS Code 用户希望 `/clear` 后，SessionStart Hook 恢复的上下文能够通过 `systemMessage` 显示，或允许 Hook 触发新一轮交互。  
  相关：[VS Code SessionStart 增强 #111911](https://github.com/anthropics/claude-code/issues/111911)。

- **桌面端多账户、多环境体验**：需求集中于团队与个人账户快速切换、最近环境显示机器信息，以及非活动窗口保留未读提示颜色。  
  相关：[#111930](https://github.com/anthropics/claude-code/issues/111930)、[#111928](https://github.com/anthropics/claude-code/issues/111928)、[#111927](https://github.com/anthropics/claude-code/issues/111927)。

- **Artifact 从生成扩展到协作管理**：用户希望工具支持按邮箱邀请、角色及访问范围设置，以及通过文件夹参数组织产物。  
  相关：[共享能力 #111926](https://github.com/anthropics/claude-code/issues/111926)、[文件夹参数 #111920](https://github.com/anthropics/claude-code/issues/111920)。

- **安全边界更加透明**：除了执行权限问题，社区也要求 Channels 与 Telegram/Discord 插件文档明确说明消息并非端到端加密。  
  相关：[安全文档需求 #111923](https://github.com/anthropics/claude-code/issues/111923)。

## 6. 开发者关注点

1. **自动化必须具有可验证的边界。** 仓库外文件删除报告与 Hook 阻断失效报告，提示团队不要仅依赖提示词或单一 Hook 保护重要数据；应结合受限权限、隔离环境与备份。  
   参考：[#111921](https://github.com/anthropics/claude-code/issues/111921)、[#111902](https://github.com/anthropics/claude-code/issues/111902)。

2. **长会话与多会话需要状态一致性。** 压缩后工具可见性、跨主机恢复以及跨会话消息投递，都是持续运行 Agent 的可靠性基础。  
   参考：[#111915](https://github.com/anthropics/claude-code/issues/111915)、[#111939](https://github.com/anthropics/claude-code/issues/111939)、[#111903](https://github.com/anthropics/claude-code/issues/111903)。

3. **错误信息需要反映真实失败层级。** 代理参数、认证过期、模型路由和额度限制不应只表现为笼统错误；明确实际模型、回退原因及额度类别，可显著降低排障成本。  
   参考：[#111897](https://github.com/anthropics/claude-code/issues/111897)、[#111925](https://github.com/anthropics/claude-code/issues/111925)、[#111919](https://github.com/anthropics/claude-code/issues/111919)。

4. **基础交互质量仍不可忽视。** 文件 `@` 引用多次使用后失效、代码块缺少语法色彩、桌面后台动画卡顿等问题，直接影响日常开发效率。  
   参考：[#111931](https://github.com/anthropics/claude-code/issues/111931)、[#111936](https://github.com/anthropics/claude-code/issues/111936)、[#111935](https://github.com/anthropics/claude-code/issues/111935)。

**今日判断：** 功能覆盖继续向多云和协作场景扩展，而当前样本最值得优先验证的是执行边界、工具状态和会话一致性；这些问题的潜在影响高于其现阶段的讨论热度。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**2026-11-24 · 数据来源：[openai/codex](https://github.com/openai/codex)**

## 1. 今日速览

Codex 过去 24 小时发布了 **0.172.0 正式版**及多个 Alpha 版本，已披露的更新重点是终端会话导航和斜杠命令参数补全。社区反馈集中在**长任务执行可靠性、桌面端审批失效、安全拦截后的恢复能力和额度透明度**；PR 则主要围绕审批逻辑、会话恢复、MCP 认证与插件签名验证展开。

> **数据口径：**输入统计为 50 条更新 Issue、50 条更新 PR，但仅提供其中 30 条 Issue 和 20 条 PR 的详情，以下分析基于这些可见记录。PR 均标记为 `CLOSED`，**不代表已确认合并或随版本发布**；评论数缺失，不据此判断热度。Issue 内容为用户报告，尚不能视作已确认的产品缺陷。

## 2. 版本发布

| 版本 | 已披露更新 |
|---|---|
| [0.172.0 正式版](https://github.com/openai/codex/releases/tag/rust-v0.172.0) | 支持从搜索结果和转录记录中的线程链接，在终端打开已保存会话及嵌套 Agent；支持用 `Tab` 补全部分斜杠命令参数，例如将 `/mcp lo` 补全为 `/mcp login`。任务组跳转相关说明被截断，无法确认完整行为。 |
| [0.174.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.174.0-alpha.1) | 已发布预览版，提供的数据未包含具体变更。 |
| [0.172.0-alpha.2.1](https://github.com/openai/codex/releases/tag/rust-v0.172.0-alpha.2.1) | 已发布预览版，未提供具体变更。 |
| [0.171.0-alpha.13.2](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.13.2) | 已发布预览版，未提供具体变更。 |

**升级提示：**不要将下文 PR 直接视为 0.172.0 的更新内容，当前数据未提供两者的发布关联。

## 3. 社区热点 Issues：10 项重点关注

以下条目均为 **OPEN**。可见讨论量整体较低，选取依据是影响范围与开发工作流风险，而非单纯按评论数排序。

| Issue | 核心问题与重要性 | 社区反应 |
|---|---|---|
| [#63466：模型行为回归](https://github.com/openai/codex/issues/63466) | 用户报告 GPT-6.2 Astra、Sol 在原本可完成的任务中执行不可靠，需要更多人工监督。直接关系到 Agent 能否承担持续性开发工作，但尚缺少独立验证。 | **4 评论、0 👍**，为所列 Issue 中评论最多的一项。 |
| [#63546：长任务提前结束，恢复时关闭无关应用](https://github.com/openai/codex/issues/63546) | Windows、CLI 0.172.0 用户报告：处理 752 项的任务未达到明确完成条件便结束，恢复过程中还关闭了无关应用实例。涉及任务完成判定及操作边界。 | **1 评论、0 👍**；个案影响较高，值得优先复现。 |
| [#63539：审批请求反复失效](https://github.com/openai/codex/issues/63539) | macOS 桌面端出现 “That approval request is no longer active”，阻断 Work/Codex 流程。审批链路失效会直接阻止工具执行。 | **1 评论、1 👍**；另有 Windows 类似报告，形成跨平台排查线索。 |
| [#63543：Windows GUI 与安装操作审批立即失效](https://github.com/openai/codex/issues/63543) | 在受管理权限、`workspace-write` 和受限终端网络环境下，启动 GUI、安装软件包的审批无法继续。对企业受控环境尤其重要。 | **1 评论、1 👍**；与 #63539 症状相近，但不能据此认定根因一致。 |
| [#63470：安全拦截后会话无法继续](https://github.com/openai/codex/issues/63470) | 用户称已授权的自有 WordPress 检查被拦截，随后连 “Ping” 也无法继续任务。重点不仅是分类准确性，还包括拦截后的恢复路径。 | **2 评论、0 👍**；与其他安全拦截报告共同呈现可恢复性问题。 |
| [#63522：可用额度突然减少](https://github.com/openai/codex/issues/63522) | Windows Pro 用户报告约半周额度突然消失。数据不足以判断是计量、展示还是其他原因，但会影响预算与任务安排。 | **2 评论、0 👍**；需要用量明细与后台计量核对。 |
| [#63511：CLI 模型用量与网页统计无法对账](https://github.com/openai/codex/issues/63511) | CLI 记录选择了 `gpt-6.2-astra`，网页 Usage Analytics 却未列出对应模型。暴露跨端模型标识与用量归因的可观测性缺口。 | **1 评论、0 👍**；与额度异常不是同一问题，但都涉及用量透明度。 |
| [#63535：长命令改用事件驱动等待](https://github.com/openai/codex/issues/63535) | 希望等待 MATLAB、构建和回归测试时减少反复检查，以降低工具调用和额度开销。对科学计算及长耗时工程任务有直接价值。 | **1 评论、0 👍**；是明确面向执行效率的功能建议。 |
| [#63518：VS Code 扩展支持会话历史](https://github.com/openai/codex/issues/63518) | 用户希望像 Web 端一样浏览、重开和续接历史会话，减少 IDE 与网页间切换。体现跨端会话能力一致性的需求。 | **1 评论、0 👍**；当前讨论量有限。 |
| [#63508：VS Code 任务期间 Git CPU 占用升高](https://github.com/openai/codex/issues/63508) | macOS 用户报告 Codex 任务期间 Git 进程资源占用明显增加。若能稳定复现，将影响 IDE 响应和并行开发体验。 | **1 评论、0 👍**；缺少具体扩展及系统版本，仍需补全诊断信息。 |

## 4. 重要 PR 进展：10 项值得跟踪

**以下均为 `CLOSED`，合并状态与发布版本未获确认。**

| PR | 功能或修复内容 | 技术意义 |
|---|---|---|
| [#63515：`codex exec` 尊重审批设置](https://github.com/openai/codex/pull/63515) | 避免强制将审批策略覆盖为 `never`，新线程使用配置的策略，续接线程尊重已保存的审批设置。 | 改善非交互执行与会话续接时的权限一致性。 |
| [#63513：Guardian 首次裁决前读取用户指令](https://github.com/openai/codex/pull/63513) | 调整默认审核指引，要求审核器在首次判定前读取用户指令。 | 为审批提供更完整的任务上下文；不能据此认定已解决安全分类拦截问题。 |
| [#63523：中断初始化时保留已接收提示](https://github.com/openai/codex/pull/63523) | 处理扩展初始化、Git 根目录发现期间中断导致恢复历史缺少提示，以及启动 Hook 被跳过的问题。 | 提升中断与恢复流程的数据完整性。 |
| [#63532：MCP 支持扩展提供逐请求认证](https://github.com/openai/codex/pull/63532) | 允许扩展管理凭证刷新，无需重启 MCP 会话，同时保持会话身份绑定。 | 有利于需要动态凭证的企业 MCP 集成。 |
| [#63497：Desktop MCP 使用 Unix socket 连接](https://github.com/openai/codex/pull/63497) | 针对 SSH 转发替换 socket 监听器后仍复用旧连接、导致请求等待的问题调整连接路由。 | 改善远程桌面 MCP 连接的可靠性。 |
| [#63533：从 WebSocket 握手刷新模型目录](https://github.com/openai/codex/pull/63533) | 保存握手中的 `x-models-etag`，并通过模型目录更新事件传递。 | 减少服务端已更新、客户端模型目录仍过期的情况。 |
| [#63487：Plugin Service 归档签名验证](https://github.com/openai/codex/pull/63487) | 在摘要校验之外加入基于发布签名密钥的验证。 | 防止攻击者同时替换插件归档与摘要后仍通过校验。 |
| [#63489：远程插件解压前验证签名](https://github.com/openai/codex/pull/63489) | 在远程安装、已安装插件更新等流程中，先验证归档摘要和签名再使用内容。 | 将供应链验证前置到插件内容处理之前。 |
| [#63544：无头 Linux 避免密钥环解锁弹窗](https://github.com/openai/codex/pull/63544) | 当 `DISPLAY`、`WAYLAND_DISPLAY` 均未设置或为空时，调整 Secret Service 凭证读取行为。 | 减少服务器、SSH 等无图形环境中的交互阻塞。 |
| [#63537：回收空闲 Code Mode 宿主](https://github.com/openai/codex/pull/63537) | 最后一个会话关闭后保留短暂复用窗口，持续空闲五秒后回收本地宿主进程。 | 平衡启动开销与后台进程资源占用。 |

## 5. 功能需求趋势

从可见 Issue 中，可以归纳出五个方向；这些是定性信号，不代表全量社区需求排名。

- **跨端会话管理与生命周期控制。**需求从“能看历史”扩展到远程任务可见性、归档删除和自动保留期限。相关：[VS Code 历史 #63518](https://github.com/openai/codex/issues/63518)、[iOS 远程历史 #63517](https://github.com/openai/codex/issues/63517)、[归档保留期限 #63478](https://github.com/openai/codex/issues/63478)。
- **长任务执行与额度效率。**用户希望等待外部命令时降低轮询成本，并明确知道额度如何消耗、模型如何计量。相关：[事件驱动等待 #63535](https://github.com/openai/codex/issues/63535)、[用量对账 #63511](https://github.com/openai/codex/issues/63511)。
- **Agent 执行可观测性。**除结果外，开发者也需要看到子 Agent 的模型、推理强度及上下文占用，以便诊断质量和成本。相关：[子 Agent 信息 #63538](https://github.com/openai/codex/issues/63538)、[上下文显示 #63542](https://github.com/openai/codex/issues/63542)。
- **IDE 性能与桌面工作区可定制性。**关注点包括加载速度、Git 开销，以及减少重复标签系统的终端布局。相关：[加载与焦点问题 #63507](https://github.com/openai/codex/issues/63507)、[终端底部停靠栏 #63510](https://github.com/openai/codex/issues/63510)。
- **审批与安全拦截后的恢复机制。**用户需要明确的失败原因、重新审批或复核入口，而不是整个任务停留在不可继续状态。相关：[审批失效 #63539](https://github.com/openai/codex/issues/63539)、[缺少复核或恢复操作 #63488](https://github.com/openai/codex/issues/63488)。

## 6. 开发者关注点

1. **完成条件应可验证，而非依赖模型自行宣布结束。**长任务需要明确进度、剩余项和中断续跑机制，恢复操作也应避免影响无关进程。参考：[任务提前结束 #63546](https://github.com/openai/codex/issues/63546)。
2. **权限流程需要稳定且可恢复。**审批立即失效和安全拦截后无法继续，都会让已有上下文与执行投入失去价值。参考：[Windows 审批 #63543](https://github.com/openai/codex/issues/63543)、[会话拦截 #63470](https://github.com/openai/codex/issues/63470)。
3. **配置变更应可靠生效。**用户报告删除 MCP 配置并重启后，旧命令仍启动本地应用；另有自动更新后恢复数日前浏览器任务的报告，值得排查配置与待执行状态的生命周期。参考：[#63483](https://github.com/openai/codex/issues/63483)、[#63493](https://github.com/openai/codex/issues/63493)。
4. **性能问题需要可复现的诊断材料。**IDE 加载慢、Git CPU 占用升高及跨平台听写超时，提示排障应同时记录客户端版本、内嵌引擎版本、系统与日志。参考：[#63508](https://github.com/openai/codex/issues/63508)、[#63531](https://github.com/openai/codex/issues/63531)、[#63496](https://github.com/openai/codex/issues/63496)。
5. **文档需要跟上多端产品变化。**用户指出帮助中心、Learn、开发文档与发布说明存在分散或过时内容；一致的版本适用范围与排障入口有助于降低支持成本。参考：[文档审计请求 #63480](https://github.com/openai/codex/issues/63480)。

**今日判断：**可见反馈的重点不是增加更多 Agent 能力，而是让现有能力在长任务、权限边界、跨端状态和成本核算上更可靠、更透明。后续应重点跟踪相关 PR 是否合并、进入哪个版本，以及用户报告是否有复现和修复确认。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-11-24**  
**数据来源：** [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

## 1. 今日速览

今日重点是 **A2A 服务安全加固与稳定版补丁发布**：Bearer Token 认证及请求输入校验修复已出现在 nightly 发布记录中，并通过补丁流程进入 **v0.71.1**。与此同时，MCP OAuth 发现超时、工具中断后的状态一致性，以及扩展安装与更新的授权范围，成为值得关注的可靠性与安全议题。

本次数据包含 **4 个 Release、5 个 Issue 和 23 个更新的 PR（展示其中 20 个）**；Issue 互动量较低，暂不足以据此判断广泛的社区共识。

## 2. 版本发布

| 版本 | 更新重点 | 开发者影响 |
|---|---|---|
| [v0.71.1](https://github.com/google-gemini/gemini-cli/releases/tag/v0.71.1) | 将提交 `aafdfdf` 回移至 v0.71.0 稳定分支；结合对应 PR，可确认关联 A2A 认证与输入校验修复 | **使用 A2A 服务的开发者应优先评估升级**，并检查认证配置兼容性 |
| [v0.71.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.71.0) | 稳定版发布；所给摘要主要为版本与变更日志维护记录 | 摘要不足以归纳完整功能变化，升级前应查阅完整发布说明 |
| [v0.72.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.72.0-preview.0) | 包含对 `dir/**` 模式下嵌套 `.gitignore` 否定规则的处理修复；另有 Windows 相关修复，但摘要被截断 | 依赖复杂忽略规则的项目可重点测试文件扫描结果 |
| [v0.71.0-nightly.20261124.gaafdfdfb5](https://github.com/google-gemini/gemini-cli/releases/tag/v0.71.0-nightly.20261124.gaafdfdfb5) | A2A 服务强制 Bearer Token 认证，并加强请求输入校验 | 适合提前验证认证与校验行为，不宜将 nightly 等同于稳定版 |

## 3. 社区热点 Issues

> 数据仅提供 5 个 Issue，因此全部列出，不补造至 10 个。以下“社区反应”仅依据所给评论与点赞数，不推断评论立场。

### 1. MCP 工具中断后，模型收到的取消状态可能与服务端实际执行不一致
**[#30427](https://github.com/google-gemini/gemini-cli/issues/30427) · OPEN · 2 条评论，0 👍**

- **问题：** 在 `-p` 模式调用 streamable HTTP MCP 工具时按 Ctrl-C，随后恢复会话，模型被告知操作已取消，但服务端可能并未收到取消请求且已完成执行。
- **重要性：** 涉及“客户端停止等待”与“远端执行取消”的语义区分。对于写文件等有副作用的工具，恢复后重试可能造成重复操作。
- **社区反应：** 本批 Issue 中评论数最高，仍待分诊，尚无已解决信号。

### 2. Git 扩展更新受配置路径权限限制而失败
**[#30416](https://github.com/google-gemini/gemini-cli/issues/30416) · OPEN · 1 条评论，0 👍**

- **问题：** 用户报告 v0.70.0 执行 `gemini extensions update <extension>` 时，因 `GIT_CONFIG_SYSTEM` 与 `allowUnsafeConfigPaths` 限制而失败。
- **重要性：** 直接影响扩展维护流程，体现安全限制与既有 Git 环境之间的兼容性问题。
- **社区反应：** 仍待分诊；提供的数据未显示修复或官方绕过方案。

### 3. 希望通过 Hooks 与插件 API 主动触发上下文压缩
**[#30413](https://github.com/google-gemini/gemini-cli/issues/30413) · OPEN · 1 条评论，0 👍**

- **需求：** 在 Lifecycle Hooks、插件或 Sidecar API 中提供可编程的上下文压缩入口。
- **重要性：** 有助于长任务按策略控制上下文预算，并提升自动化工作流的可控性。
- **社区反应：** 处于需求收集阶段；摘要中对其他 SDK 的能力描述属于提议者陈述，并非 CLI 已支持能力。

### 4. 希望标明 Codebase Investigator 实际读取过的文件
**[#30414](https://github.com/google-gemini/gemini-cli/issues/30414) · CLOSED · 1 条评论，0 👍**

- **需求：** 在调查报告中区分“确认读取”的文件与仅被列出或引用的文件。
- **重要性：** 提高代码分析结果的可追溯性，帮助主代理和开发者判断结论的证据覆盖范围。
- **社区反应：** Issue 已关闭，但数据未给出关闭原因，**不能据此认定功能已实现**。

### 5. AIPages 外部执行引擎与微支付集成提案
**[#30439](https://github.com/google-gemini/gemini-cli/issues/30439) · OPEN · 1 条评论，0 👍**

- **内容：** 提议接入 AIPages，并引入 Base 网络上的 AUS 微支付。
- **重要性：** 可作为外部生态接入意向观察，但目前更接近推广型集成提案。
- **社区反应：** 暂无维护者采纳信号，不宜视为官方路线图或社区普遍需求。

## 4. 重要 PR 进展

> PR 评论数字段均为 `undefined`，无法比较讨论热度；以下按技术影响筛选。**CLOSED 不等于已合并**，发布落地情况仅在有 Release 佐证时说明。

| PR | 状态 | 内容与意义 |
|---|---|---|
| [#30420：A2A 认证与输入校验](https://github.com/google-gemini/gemini-cli/pull/30420) | CLOSED | 从环境配置认证，替换占位认证检查，并在 HTTP 层、任务创建和 `restore` 命令中统一校验输入。对应修复已见于 nightly 发布记录。 |
| [#30429：v0.71.1 补丁回移](https://github.com/google-gemini/gemini-cli/pull/30429) | CLOSED | 将上述安全加固提交回移至稳定分支；v0.71.1 已发布，是今日最明确的稳定版落地进展。 |
| [#30443：MCP OAuth 发现请求超时](https://github.com/google-gemini/gemini-cli/pull/30443) | OPEN | 为受保护资源元数据、授权服务器元数据和 HEAD 探测请求增加单次请求超时，避免无响应端点长期阻塞发现流程。 |
| [#30441：扩展安装与更新授权覆盖完整内容](https://github.com/google-gemini/gemini-cli/pull/30441) | OPEN | 将授权说明从 manifest 字段扩展至实际扩展内容，并比较更新前后的内容描述；Hooks、上下文文件等变化可触发再次确认。 |
| [#30419：未扫描目录标记为截断](https://github.com/google-gemini/gemini-cli/pull/30419) | OPEN | 修复目录扫描耗尽 `maxItems` 预算后，未扫描内容没有正确显示截断标记的问题，降低模型误把不完整目录树当作完整结果的风险。 |
| [#30423：69 项 npm 依赖更新](https://github.com/google-gemini/gemini-cli/pull/30423) | OPEN | P1、XL 级批量更新，包含 `simple-git`、`@octokit/rest` 等；维护价值高，也需要较充分的兼容性与回归测试。 |
| [#30430：示例 MCP Server SDK 升级](https://github.com/google-gemini/gemini-cli/pull/30430) | CLOSED | 将扩展示例中的 `@modelcontextprotocol/sdk` 从 1.23.0 升至 1.32.0，标记 P1。作用范围是示例目录，不能推断整个项目均已升级。 |
| [#30433：主项目 Zod 跨大版本升级](https://github.com/google-gemini/gemini-cli/pull/30433) | CLOSED | 提议从 3.25.76 升至 4.6.6，标记 P2；跨大版本变动应重点核验校验 API、类型与错误处理兼容性。 |
| [#30435：body-parser 升级](https://github.com/google-gemini/gemini-cli/pull/30435) | CLOSED | 提议从 2.2.2 升至 2.4.0，上游摘要包含安全相关说明；当前数据不足以确认具体漏洞影响及是否合并。 |
| [#30437：markdown-it 升级](https://github.com/google-gemini/gemini-cli/pull/30437) | CLOSED | 提议从 14.1.1 升至 14.3.3，属于 Markdown 解析相关维护；需结合实际使用路径验证渲染与解析行为。 |

## 5. 功能需求趋势

从全部 5 个 Issue 看，需求主要集中在以下方向；样本规模较小，不能视为长期热度排名。

- **代理执行状态的一致性。** 用户开始关注取消、恢复与远端副作用之间是否一致，而不仅是工具能否调用成功。参考：[#30427](https://github.com/google-gemini/gemini-cli/issues/30427)。
- **上下文管理的可编程化。** 希望通过 Hooks 和插件接口主动控制压缩时机，为长任务提供更明确的资源管理能力。参考：[#30413](https://github.com/google-gemini/gemini-cli/issues/30413)。
- **代码调查结果的可验证性。** 需要知道代理“实际看过什么”，而非只获得一份相关文件列表。参考：[#30414](https://github.com/google-gemini/gemini-cli/issues/30414)。
- **扩展生态的可维护性。** Git 环境与安全配置不兼容会阻塞扩展更新，基础维护体验仍需改善。参考：[#30416](https://github.com/google-gemini/gemini-cli/issues/30416)。
- **外部服务接入探索。** 出现执行引擎与支付集成提案，但尚无足够支持信号。参考：[#30439](https://github.com/google-gemini/gemini-cli/issues/30439)。

**本批数据未呈现 IDE 集成或新模型支持的集中诉求。**

## 6. 开发者关注点

1. **不要把“已取消”直接当作“未执行”。** 对有副作用的 MCP 工具，恢复任务前应核验远端结果，并考虑幂等设计，避免重复写入。关联：[#30427](https://github.com/google-gemini/gemini-cli/issues/30427)。
2. **部署 A2A 服务时优先核验认证变化。** 评估 v0.71.1，并测试环境认证配置、调用方令牌传递及输入校验兼容性。关联：[#30420](https://github.com/google-gemini/gemini-cli/pull/30420)、[#30429](https://github.com/google-gemini/gemini-cli/pull/30429)。
3. **扩展信任不应只看 manifest。** Hooks 和上下文内容同样可能改变代理行为；完整内容授权 PR 值得持续跟踪，但目前仍开放。关联：[#30441](https://github.com/google-gemini/gemini-cli/pull/30441)。
4. **诊断 MCP 卡顿时关注 OAuth 发现阶段。** 当前有针对单次请求超时的修复提案，尚不能视为已发布能力。关联：[#30443](https://github.com/google-gemini/gemini-cli/pull/30443)。
5. **区分“未展示”“未扫描”和“已读取”。** 目录截断标记与文件读取状态都直接影响模型结论的可信度。关联：[#30419](https://github.com/google-gemini/gemini-cli/pull/30419)、[#30414](https://github.com/google-gemini/gemini-cli/issues/30414)。

---

*数据说明：部分 Release 摘要被截断；部分 Issue 的显示更新时间为 11 月 23 日，但被纳入所给“过去 24 小时”集合，本文保留来源口径。未将关闭的 PR 自动视为合并，也未根据缺失的评论数据推断热度。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-24** · 数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)

## 1. 今日速览

过去 24 小时发布了 **v1.0.115-8**，重点改进子代理用量统计与 Assisted Permissions 审核容错。社区更新的 6 条 Issue 主要涉及 Linux 稳定性、MCP 兼容性、搜索结果准确性及 ACP 事件回归，目前均为开放状态，暂无评论或点赞。同期未提供更新的 PR，以下按实际数据列出，不补足至 10 条。

## 2. 版本发布

### [v1.0.115-8](https://github.com/github/copilot-cli/releases/tag/v1.0.115-8)

- **子代理用量统计更易读**：`--usage-output-file` 按配置名称而非调用 ID 汇总子代理用量，并报告各子代理启动次数，便于分析调用与资源使用情况。
- **权限审核增加容错**：Assisted Permissions 在首个审核模型卡住或失败时，可尝试其他审核模型，以减少不必要的人工批准提示。

**说明**：提供的发布说明末尾被截断，以上仅总结可确认内容；无法据此判断下述 Issue 是否已获修复。

## 3. 社区热点 Issues

以下按潜在影响与排查价值排序，**不代表社区热度排名**。6 条 Issue 均为 **OPEN、0 评论、0 👍**，尚无可见的社区讨论或维护者反馈。

| Issue | 核心问题与重要性 |
|---|---|
| [#5561 Linux x86_64 原生模块崩溃](https://github.com/github/copilot-cli/issues/5561) | 用户报告 **1.0.114** 在 Arch Linux 长时间交互会话中触发 `SIGABRT`，堆栈指向随包分发的 `cli-native.node`。直接影响会话连续性，值得优先排查原生模块稳定性；现有数据不足以判断影响范围。 |
| [#5557 无效 MCP Schema 阻断交互模式](https://github.com/github/copilot-cli/issues/5557) | MCP 工具声明 `outputSchema.anyOf: null` 时，交互模式在回答前失败，即使当前问题不需要该工具；非交互模式则可成功。问题暴露出模式间校验差异，以及单个异常工具阻断整个会话的风险。错误仅给出工具索引，也增加了定位成本。 |
| [#5560 内置 rg 结果压缩破坏文件名](https://github.com/github/copilot-cli/issues/5560) | 多重数字后缀文件名可能被截断，部分文件名被显示为行号，不同文件的匹配还可能被错误归组。该问题影响搜索结果可信度，可能干扰代码定位；报告称独立运行 ripgrep 不受影响。 |
| [#5559 Jenkins MCP 连接回归](https://github.com/github/copilot-cli/issues/5559) | 用户报告自 **1.0.93** 起，通过 Streamable HTTP 连接官方 Jenkins MCP Server 插件端点出现故障。涉及 CI 工具链集成，需进一步确认传输协议或服务端兼容性问题。 |
| [#5556 ACP 不再发送推理摘要事件](https://github.com/github/copilot-cli/issues/5556) | 用户报告自 **1.0.110** 起，`copilot --acp` 不再发送 `agent_thought_chunk`，而 **1.0.109** 及此前可正常发送。依赖该事件展示“思考中”状态的客户端失去实时反馈，长任务更容易被误认为卡住。 |
| [#5558 请求移除或可选启用 100 词回答限制](https://github.com/github/copilot-cli/issues/5558) | 用户认为默认提示中的 100 词目标导致回答省略关键细节，建议移除或改为可选配置。反映出技术解释完整性与默认简洁输出之间的冲突；该限制的具体实现尚无维护者确认。 |

## 4. 重要 PR 进展

过去 24 小时内更新的 PR 数据为 **0 条**，暂无可汇报的功能或修复进展。这不代表仓库不存在其他进行中的 PR。

[查看仓库 Pull Requests](https://github.com/github/copilot-cli/pulls)

## 5. 功能需求趋势

基于本次 6 条 Issue，可归纳出以下方向；样本较小，不宜外推为整个社区的长期偏好。

- **MCP 兼容性与故障隔离**：2 条反馈涉及 MCP，分别指向 Jenkins 端点连接与异常 Schema 处理。关注点不仅是“能接入”，还包括异常工具不应拖垮整个会话、错误应能定位到具体服务和工具。  
  相关：[ #5559](https://github.com/github/copilot-cli/issues/5559) · [#5557](https://github.com/github/copilot-cli/issues/5557)
- **版本升级后的行为兼容性**：Jenkins MCP 与 ACP 报告均指出了行为变化的版本边界，凸显协议与事件流回归测试的重要性。  
  相关：[#5559](https://github.com/github/copilot-cli/issues/5559) · [#5556](https://github.com/github/copilot-cli/issues/5556)
- **输出质量与可配置性**：开发者既要求搜索输出忠实保留文件信息，也希望自然语言回答不因长度目标丢失关键内容。  
  相关：[#5560](https://github.com/github/copilot-cli/issues/5560) · [#5558](https://github.com/github/copilot-cli/issues/5558)
- **长会话稳定性与状态可见性**：原生模块崩溃和 ACP 摘要缺失分别影响“能否持续运行”与“能否判断正在运行”。  
  相关：[#5561](https://github.com/github/copilot-cli/issues/5561) · [#5556](https://github.com/github/copilot-cli/issues/5556)

## 6. 开发者关注点

1. **避免全局阻断**：单个异常 MCP 工具不应让无关请求也无法执行，应优先关注故障隔离与降级路径。  
   [#5557](https://github.com/github/copilot-cli/issues/5557)
2. **提升诊断可操作性**：崩溃缺少明确致命信息、MCP 错误只显示工具索引，都会延长排障时间。  
   [#5561](https://github.com/github/copilot-cli/issues/5561) · [#5557](https://github.com/github/copilot-cli/issues/5557)
3. **保持工具输出与接口契约可靠**：文件名、行号及 ACP 状态事件均被下游工作流依赖，展示或协议层的小变化也可能产生明显影响。  
   [#5560](https://github.com/github/copilot-cli/issues/5560) · [#5556](https://github.com/github/copilot-cli/issues/5556)
4. **让回答长度服从任务需求**：技术开发者更需要关键信息完整，并希望能自行控制简洁程度。  
   [#5558](https://github.com/github/copilot-cli/issues/5558)

**今日判断**：本次反馈重心偏向**可靠性、集成兼容性与可观测性**，而非新增功能。受影响的开发者可记录准确版本、最小复现与模式差异，为回归定位提供更直接的证据。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**2026-11-24｜[anomalyco/opencode](https://github.com/anomalyco/opencode)**

## 1. 今日速览

过去 24 小时发布了 **v2.4.0 与 v2.4.1**：桌面端内置浏览器成为主要功能亮点，随后补充 macOS 12 会话保存兼容性修复。社区讨论集中在桌面端向 IDE 式工作台演进，同时暴露出 MCP 注册、后台浏览器连接及终端交互等稳定性问题；PR 侧则集中补强插件自动化生命周期、项目隔离和模型配置兼容性。

> **统计口径：**来源列出 50 条更新 Issues、50 条更新 PR，本日报依据展示的 30 条 Issues、20 条 PR 筛选分析。Release 摘要存在截断；PR 评论数为 `undefined`，不据此判断讨论热度；**Closed 不等于已修复或已合并**。

## 2. 版本发布

### [v2.4.0：桌面端内置浏览器](https://github.com/anomalyco/opencode/releases/tag/v2.4.0)
- 支持从 Chrome、Edge、Firefox、Safari 导入登录状态与浏览历史。
- 支持导入 Chromium 浏览器扩展，以及安装 Chrome、Edge 商店中的扩展。
- 使用持久化桌面浏览器配置，使聊天链接能够复用登录状态。

**技术意义：**浏览器开始成为 Agent 工作环境的一部分，而不只是外部链接入口。社区已经提出将消息链接、页面操作与 Agent 会话进一步串联的需求。

### [v2.4.1：兼容性与模型展示修复](https://github.com/anomalyco/opencode/releases/tag/v2.4.1)
- **macOS 12 会话修复：**适配系统附带的旧版 SQLite，恢复助手消息保存能力，对应 [PR #65771](https://github.com/anomalyco/opencode/pull/65771)。
- **仅通过配置定义的 Provider 模型展示：**发布摘要指出此类 Provider 的模型现在可以显示；具体支持范围因原文截断无法完整确认。

## 3. 社区热点 Issues

以下评论数为提供数据中的快照；所选条目均为 **Open、👍 0**，评论数量不能直接代表广泛共识。

| Issue | 关键问题与重要性 | 社区反应 |
|---|---|---|
| [#65946：消息链接在内置浏览器打开，并交给 Agent 操作](https://github.com/anomalyco/opencode/issues/65946) | 希望通过右键菜单，把聊天中的链接直接送入应用浏览器。补齐“讨论页面—打开页面—Agent 操作”的工作流。 | **8 条评论**，展示样本中讨论最多。 |
| [#65932：Standalone 会话偶发缺失 MCP 工具](https://github.com/anomalyco/opencode/issues/65932) | 报告称约 **10% 的新会话**未注册本地 stdio MCP 服务，导致整场会话工具调用失败。对无头运行和自动化任务影响较大；该比例为报告者观察，非官方统计。 | **5 条评论**，值得优先追踪复现与初始化时序。 |
| [#65977：IDE 级项目树、Worktree 管理与 Git 历史](https://github.com/anomalyco/opencode/issues/65977) | 以 IntelliJ Community 为参照，要求将项目导航、工作区和版本历史作为整体体验建设。 | **4 条评论**，体现桌面端向完整开发工作台演进的诉求。 |
| [#65966：长提示词下首 Token 延迟上升](https://github.com/anomalyco/opencode/issues/65966) | 报告 18k 提示词约需 6 秒、90k 冷请求约需 19 秒，并指出请求路由至远端 IAD。涉及长上下文延迟与上游路由排查。 | **3 条评论**，带 `triaging`、`pending close` 标签，结论仍需跟进。 |
| [#65959：项目名称与路径显示不一致](https://github.com/anomalyco/opencode/issues/65959) | 切换项目后，界面仍显示旧名称，但路径已更新；同时请求“移除项目”入口。对多项目操作的上下文判断造成干扰。 | **3 条评论**，兼具状态一致性缺陷与管理功能诉求。 |
| [#65978：Ubuntu 26.04 升级至 v2.4.1 失败](https://github.com/anomalyco/opencode/issues/65978) | 从 v2.3.2 经 curl 方式升级时出现安装器失败。直接影响新版本交付与采用。 | **2 条评论**，尚无已解决信息。 |
| [#65913：WSL2 复制提示成功但无法粘贴](https://github.com/anomalyco/opencode/issues/65913) | v2.4.1 在 Windows Terminal 中出现剪贴板问题，关闭鼠标捕获又影响滚动回看。报告者称此前版本可用。 | **2 条评论**，处于 `triaging`，需关注终端兼容性回归。 |
| [#65887：stdin 为未关闭管道时 CLI 挂起](https://github.com/anomalyco/opencode/issues/65887) | 即使已通过参数提供提示词，`opencode run` 仍可能等待输入。影响脚本与 CI 集成；报告环境为 **v2.1.3**，不能直接归因于本次发布。 | **2 条评论**，仍待定位。 |
| [#65993：队列消息删除后仍显示](https://github.com/anomalyco/opencode/issues/65993) | 报告客户端残留待处理消息，以及 `session_inbox` 条目未排空。涉及队列生命周期、前后端状态同步与会话可信度。 | **1 条评论**，讨论尚少，但值得提前关注。 |
| [#65964：TUI 缺少自动化任务管理视图](https://github.com/anomalyco/opencode/issues/65964) | 创建定时自动化后，只能通过 `automation.list` 工具确认，缺乏可视化查看和管理入口。 | **1 条评论**，反映自动化能力与操作界面之间的缺口。 |

## 4. 重要 PR 进展

**以下 10 个 PR 均为 Open：代表待审查的实现或修复方案，不代表已进入正式版本。**

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| [#65969：后台标签页会话连接浏览器](https://github.com/anomalyco/opencode/pull/65969) | 修复应用启动后，未被打开的标签页会话无法附着浏览器的问题。 | 避免自动化、服务恢复等后台任务因用户未切换标签页而失去浏览器能力。 |
| [#65991：插件 setup 可创建子 Agent 自动化](https://github.com/anomalyco/opencode/pull/65991) | 处理插件初始化期间创建子 Agent 目标的 prompt 自动化导致挂起的问题。 | 防止单个插件阻塞同一轮后续插件加载。 |
| [#65988：SDK 实例插件可创建 Shell 自动化](https://github.com/anomalyco/opencode/pull/65988) | 修复嵌入式 SDK 配置 `instances` 时，实例插件在 setup 创建 Shell 自动化造成的等待问题。 | 提升 SDK 嵌入场景的启动可靠性。 |
| [#65987：插件 setup 可创建 Code Mode 自动化](https://github.com/anomalyco/opencode/pull/65987) | 修复 Effect、Promise 插件初始化期间创建代码自动化调用不返回的问题。 | 补齐自动化 API 在插件生命周期早期的可用性。 |
| [#65981：校验 Effect 插件创建的自动化](https://github.com/anomalyco/opencode/pull/65981) | 防止 JavaScript 插件写入格式错误的目标，进而导致自动化列表接口返回 500。 | 将错误拦截在写入阶段，避免影响整个列表读取。 |
| [#65986：跨项目自动化按不存在处理](https://github.com/anomalyco/opencode/pull/65986) | 修正 `automation.pause/resume/delete` 对其他项目自动化的处理。 | 强化项目作用域边界及错误行为一致性。 |
| [#65984：使用服务档位自己的长上下文价格](https://github.com/anomalyco/opencode/pull/65984) | 修复独立服务档位的长上下文价格仍沿用标准档位数据的问题。 | 改善成本估算准确性；不应将其直接理解为 Provider 实际账单修复。 |
| [#65982：保留模型速度档位的变体设置](https://github.com/anomalyco/opencode/pull/65982) | 处理速度档位共享基础模型配置键后，旧版独立保存的 reasoning variant 设置兼容问题。 | 减少升级后推理配置丢失或变化。 |
| [#65980：Promise 插件 API 遵守取消信号](https://github.com/anomalyco/opencode/pull/65980) | 修复 `ctx` API 包装层忽略调用方传入 `signal` 的问题。 | 使取消、超时控制更符合 SDK 接口约定。 |
| [#65965：按新标记识别 Copilot Free Auto](https://github.com/anomalyco/opencode/pull/65965) | 适配上游从 `billing.auto_discount` 转向顶层 `auto: true` 的标记变化。 | 恢复对 Copilot Free Auto 的正确识别，对应 Issue #65464。 |

## 5. 功能需求趋势

### ① 桌面端向 IDE 式工作台靠拢
需求已超出聊天体验，延伸至项目树、Worktree、Git 历史、外部 Diff 和 GitHub 面板集成。相关提案包括 [#65977](https://github.com/anomalyco/opencode/issues/65977)、[#65974](https://github.com/anomalyco/opencode/issues/65974)、[#65970](https://github.com/anomalyco/opencode/issues/65970)。

**判断：**这是展示样本中最密集的方向，但其中多条由同一作者提出，应视为系统性使用反馈，而非独立用户数量的证明。

### ② 浏览器与 Agent 工作流深度融合
用户希望将消息链接直接交给浏览器及 Agent，并补足文件上传等操作能力，见 [#65946](https://github.com/anomalyco/opencode/issues/65946)、[#65956](https://github.com/anomalyco/opencode/issues/65956)。后者已关闭，但关闭原因与实现状态未提供。

### ③ 会话管理强调“上下文可见”
用户要求区分运行中与等待人工介入的会话、显示工作目录、补充消息时间与模型信息，以及按组批量管理会话，见 [#65953](https://github.com/anomalyco/opencode/issues/65953)、[#65950](https://github.com/anomalyco/opencode/issues/65950)、[#65958](https://github.com/anomalyco/opencode/issues/65958)、[#65972](https://github.com/anomalyco/opencode/issues/65972)。

### ④ 模型选择需要更稳定、更显式
关注点包括保留 Provider 分组、避免“最近使用”破坏导航，以及禁止图像生成时未经确认切换模型或 Provider，见 [#65992](https://github.com/anomalyco/opencode/issues/65992)、[#65975](https://github.com/anomalyco/opencode/issues/65975)。

### ⑤ 自动化与技能需要可发现、可管理
TUI 自动化列表和 ACP 客户端技能发现能力成为新诉求，见 [#65964](https://github.com/anomalyco/opencode/issues/65964)、[#65971](https://github.com/anomalyco/opencode/issues/65971)。后者已关闭，不能据此认定功能已交付。

## 6. 开发者关注点

- **无头运行的确定性。** MCP 偶发缺席与 stdin 挂起会让相同脚本出现不同结果。自动化使用者应重点跟踪初始化和输入处理问题：[MCP #65932](https://github.com/anomalyco/opencode/issues/65932)、[CLI #65887](https://github.com/anomalyco/opencode/issues/65887)。
- **后台任务不应依赖前台 UI。** 浏览器是否连接，不应取决于用户是否打开对应标签页；插件初始化也不应因创建自动化而阻塞：[PR #65969](https://github.com/anomalyco/opencode/pull/65969)、[PR #65991](https://github.com/anomalyco/opencode/pull/65991)。
- **界面状态必须可信且持久。** 项目名称与路径不一致、删除后消息残留、面板宽度重启丢失，都会降低多会话操作效率：[ #65959](https://github.com/anomalyco/opencode/issues/65959)、[#65993](https://github.com/anomalyco/opencode/issues/65993)、[#65924](https://github.com/anomalyco/opencode/issues/65924)。
- **升级后的基础交互需要回归验证。** Linux 安装、WSL2 剪贴板与旧 Windows 终端鼠标行为均有反馈，建议按目标环境做小范围验证：[ #65978](https://github.com/anomalyco/opencode/issues/65978)、[#65913](https://github.com/anomalyco/opencode/issues/65913)、[#65894](https://github.com/anomalyco/opencode/issues/65894)。
- **长上下文性能与成本透明度同样重要。** 用户既关心首 Token 延迟，也需要准确的服务档位成本展示；两者是不同问题，应分别排查：[Issue #65966](https://github.com/anomalyco/opencode/issues/65966)、[PR #65984](https://github.com/anomalyco/opencode/pull/65984)。

**今日结论：**OpenCode 正扩展为融合浏览器、项目管理与自动化的开发环境。当前最值得跟踪的，是这些新能力在后台执行、插件初始化及跨平台升级中的可靠性，而不仅是功能入口是否已经出现。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-24

## 今日速览

过去 24 小时无新版本发布，社区动态主要集中在 **多模型协议兼容、推理参数映射，以及长会话与大输出的稳定性**。最值得关注的是仍处于开放状态的 P0 问题：Codex WebSocket 续接失效可能导致全量历史重传、提示缓存丢失及 `prefix_mismatch`；PR 侧则集中推进临时文件故障容错、流式读取性能和模型目录清理。

> **数据说明**：输入标注来源为 `badlogic/pi-mono`，但具体条目指向 `earendil-works/pi`，下文链接按条目所示仓库生成。`CLOSED` 仅表示已关闭，不能据此判断 Issue 已修复或 PR 已合并、发布；PR 评论数缺失，不用于判断热度。

## 社区热点 Issues

本批 Issue 的讨论量整体较低，以下主要按影响范围、严重性和技术代表性筛选，而非单纯按评论数排序。

| Issue | 核心问题与重要性 | 社区反应与状态 |
|---|---|---|
| **[#12444：Codex WebSocket 续接与参数序列化异常](https://github.com/earendil-works/pi/issues/12444)** | `max_output_tokens` 截断被报告会破坏 `previous_response_id` 续接，随后每轮重传完整输入、丢失提示缓存；函数参数重新序列化还可能触发 `prefix_mismatch`。直接影响长会话成本、延迟与可靠性。 | **OPEN、P0，3 条评论**，是当前最需跟踪的问题。 |
| **[#12443：Gemini `xhigh` 推理等级不可用](https://github.com/earendil-works/pi/issues/12443)** | Gemini 4 Neon/Hydrogen 选择 `xhigh` 后，在请求发送前即因映射失败报错，暴露模型能力与适配层不同步的问题。 | **CLOSED，3 条评论**；有对应 PR #12441，同样已关闭，是否发布待确认。 |
| **[#12466：ChatGPT 登录展示不支持的模型及错误上下文窗口](https://github.com/earendil-works/pi/issues/12466)** | 报告称，OAuth 登录复用 API 模型目录，列出的 47 个模型中有 36 个首次请求失败。模型列表需要反映认证方式与账号实际权限。 | **CLOSED，1 条评论**；所给数据未说明关闭原因。 |
| **[#12464：直接 OpenAI Responses 路径仍存在推理参数问题](https://github.com/earendil-works/pi/issues/12464)** | API Key 路径被报告仍发送 `medium` 与 `configuration_update`，且 `additional_tools` 可能抑制工具轮次推理。说明 Codex 路径的调整不能直接视为其他认证路径已同步解决。 | **CLOSED，1 条评论**；属于对既有修复的后续反馈。 |
| **[#12417：切换到小上下文模型后无法压缩](https://github.com/earendil-works/pi/issues/12417)** | 累积约 100K tokens 后切到 64K 上下文模型，压缩仍使用新模型，导致压缩请求本身溢出。影响跨模型长会话的恢复能力。 | **CLOSED，2 条评论**；暂无可确认的修复信息。 |
| **[#12422：压缩接受空摘要、纯思考或中止响应](https://github.com/earendil-works/pi/issues/12422)** | 无效摘要可能被静默持久化，影响后续上下文完整性。相比显式失败，这类问题更难察觉和恢复。 | **CLOSED，2 条评论**；显示社区关注摘要有效性校验。 |
| **[#12463：恢复当前会话丢失被中断工具的结果](https://github.com/earendil-works/pi/issues/12463)** | 工具运行时选择 `/resume`，取消结果虽存在于 JSONL，却未出现在当前分支记录中。涉及持久化记录、会话分支与 UI 的一致性。 | **CLOSED，2 条评论**，为当日新建反馈。 |
| **[#12416：超大单段消息导致打开会话 OOM](https://github.com/earendil-works/pi/issues/12416)** | 粘贴 3.3 MB HAR、包含超长 base64 行后发生堆内存耗尽，说明大型日志与极端 Markdown 输入仍是稳定性边界。 | **CLOSED，1 条评论**；没有证据表明已随版本交付修复。 |
| **[#12428：MCP OAuth 刷新失败后每次工具调用重复重试](https://github.com/earendil-works/pi/issues/12428)** | 失效令牌保留、刷新失败反复触发，可能放大调用延迟与认证噪声；需要更明确的失效状态与重新登录引导。 | **CLOSED，1 条评论**；报告称 1.5.0 与 1.6.0 均存在。 |
| **[#12424：Z.AI Coding Plan 缺少 GLM-5.4](https://github.com/earendil-works/pi/issues/12424)** | 当前目录生成器已能识别新模型，但发布目录仍显示旧版本，反映模型元数据更新到用户可见之间的时差。 | **CLOSED，1 条评论、3 个 👍**，是本批点赞最多的 Issue。 |

## 重要 PR 进展

以下按技术影响筛选 10 项。**已关闭 PR 不等于已合并，更不等于已进入发布版本。**

| PR | 功能或修复内容 | 状态 |
|---|---|---|
| **[#12451：大型流式行与事件的线性时间读取](https://github.com/earendil-works/pi/pull/12451)** | 针对字符串持续拼接、重复扫描及 V8 字符串展开造成的重复复制，优化 MCP、AI、Agent 和 TUI 等多层流式读取路径，重点改善超长行与 SSE 事件处理。 | **OPEN** |
| **[#12452：临时文件写入失败不再导致 Pi 崩溃](https://github.com/earendil-works/pi/pull/12452)** | 为大 Bash 输出写入临时文件时的失败提供容错，避免未捕获异常终止当前轮次、子代理及后台任务。 | **CLOSED** |
| **[#12461：修正 Bash 输出未落盘时的回退逻辑](https://github.com/earendil-works/pi/pull/12461)** | 跟进临时文件容错，修正输出仍完整保留在内存时却被错误标记为截断等问题，保证工具读取到的内容与状态一致。 | **CLOSED** |
| **[#12437：Codex 初始请求使用实际选定的推理强度](https://github.com/earendil-works/pi/pull/12437)** | 不再先发送默认 `medium` 再更新为用户选择值；从历史响应重建基线，仅在等级变化时追加更新，以兼顾参数正确性与缓存复用。 | **CLOSED** |
| **[#12441：支持 Gemini `xhigh` 推理等级](https://github.com/earendil-works/pi/pull/12441)** | 修正 Gemini 相关模型的思考等级映射，处理请求发出前即失败的问题，对应 Issue #12443。 | **CLOSED** |
| **[#12455：在重试分类器中处理 `finish_reason: error`](https://github.com/earendil-works/pi/pull/12455)** | 将流以 `error` 结束的情况作为临时提供商故障识别，改善 Copilot、OpenRouter、Mistral 等路径的自动重试行为。 | **CLOSED** |
| **[#12459：改善已存储密钥的失败展示与命令重执行](https://github.com/earendil-works/pi/pull/12459)** | 区分“没有配置”与“已存储但无法解析”，并处理命令式密钥失败后的再次执行，减少用户误以为凭据丢失的情况。 | **CLOSED** |
| **[#12453：清理停用的 Groq 与未文档化的 Mistral 模型](https://github.com/earendil-works/pi/pull/12453)** | 减少 `/model` 中可选择却不可用的条目，降低模型目录与服务端实际能力不一致带来的首次请求失败。 | **CLOSED** |
| **[#12430：兼容将数字请求 ID 回传为字符串的 MCP 服务](https://github.com/earendil-works/pi/pull/12430)** | 处理请求 ID `1` 被回传为 `"1"` 时无法匹配的问题，避免初始化响应被丢弃、最终表现为 60 秒超时。 | **CLOSED** |
| **[#12438：避免在长标识符中误判上下文溢出](https://github.com/earendil-works/pi/pull/12438)** | 收紧 `request_too_large` 的错误匹配，防止普通 HTTP 400 被误导入“压缩并重试”流程。 | **OPEN** |

## 功能需求趋势

### 1. 模型支持正在从“能列出”转向“按能力准确适配”
用户不仅要求新增模型，还要求目录、认证权限、上下文窗口和推理等级准确对应。代表反馈包括 [ChatGPT OAuth 模型目录 #12466](https://github.com/earendil-works/pi/issues/12466)、[Bedrock Kimi `max` 推理等级 #12462](https://github.com/earendil-works/pi/issues/12462) 和 [GLM-5.4 目录更新 #12424](https://github.com/earendil-works/pi/issues/12424)。

### 2. 跨模型切换需要更可靠的历史转换
会话历史中的工具 ID、签名和推理元数据并非天然通用。社区反馈覆盖 [Anthropic 工具 ID 冲突 #12448](https://github.com/earendil-works/pi/issues/12448)、[Vertex 缺少 `thought_signature` #12420](https://github.com/earendil-works/pi/issues/12420) 及 [Copilot `reasoning_opaque` 保留 #12418](https://github.com/earendil-works/pi/issues/12418)。

### 3. 长期记忆与历史生命周期管理需求浮现
需求从单次上下文压缩延伸到长期记忆、存储清理与取消结果追踪，例如 [Auto-memory #12431](https://github.com/earendil-works/pi/issues/12431)、[Durable 历史裁剪 #12460](https://github.com/earendil-works/pi/issues/12460) 和 [中止操作返回被撤回输入 ID #12445](https://github.com/earendil-works/pi/issues/12445)。

### 4. 工具执行需要更清晰、稳定的可观测性
用户希望减少转录噪声，同时保留工具与搜索过程的结构化信息。代表提案包括 [按轮次汇总工具调用 #12423](https://github.com/earendil-works/pi/issues/12423)、[托管网页搜索的一等内容块与事件 #12419](https://github.com/earendil-works/pi/issues/12419)，以及 [重建会话后保留输出展开状态 #12426](https://github.com/earendil-works/pi/issues/12426)。其中 #12419 标注为 `no-action`，不应解读为已纳入路线图。

## 开发者关注点

- **适配必须细化到提供商、认证方式和模型。** “OpenAI-compatible”不意味着完全支持同一套角色和参数；默认发送 `developer` 角色就可能导致代理每轮报错。参见 [#12433](https://github.com/earendil-works/pi/issues/12433)。
- **恢复流程不能引入隐性上下文损坏。** 压缩摘要有效性、工具中止记录和分支恢复都需要可验证的一致性，而不只是 UI 显示成功。参见 [#12422](https://github.com/earendil-works/pi/issues/12422)、[#12463](https://github.com/earendil-works/pi/issues/12463)。
- **重试应区分瞬态故障、认证失败与普通请求错误。** 否则容易出现该重试时不重试、不该重试时反复恢复的情况。参见 [#12455](https://github.com/earendil-works/pi/pull/12455)、[#12428](https://github.com/earendil-works/pi/issues/12428)、[#12438](https://github.com/earendil-works/pi/pull/12438)。
- **大型输入与输出应成为常规压力测试场景。** 超长日志、HAR、base64、SSE 大事件，以及临时目录写入失败，都会放大内存和 I/O 边界问题。参见 [#12416](https://github.com/earendil-works/pi/issues/12416)、[#12451](https://github.com/earendil-works/pi/pull/12451)、[#12452](https://github.com/earendil-works/pi/pull/12452)。

**后续优先跟踪：** P0 的 [Codex 续接问题 #12444](https://github.com/earendil-works/pi/issues/12444)，以及仍开放的 [流式读取优化 #12451](https://github.com/earendil-works/pi/pull/12451)；两者分别关系到长会话成本与大数据流处理性能。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-11-24｜仓库：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

## 1. 今日速览

过去 24 小时无新版本发布，提供的数据包含 **15 条更新的 Issue、50 条更新的 PR**（展示其中 20 条）。今日重点是**会话日志敏感信息保护、工具调用与长会话稳定性**，同时推进 `qwen serve` 资源一致性、事件总线内核和分层沙箱等基础能力。

以下重点 PR 均处于 **OPEN** 状态，尚不能视为已合入或已发布；PR 评论数缺失，因此不据此判断讨论热度。

## 2. 社区热点 Issues

### 1）API key 被会话日志明文持久化
[#18165](https://github.com/QwenLM/qwen-code/issues/18165) · **OPEN｜3 条评论**

用户报告，读取配置时产生的工具输出包含完整 API key，并被会话日志多个字段重复保存，同时指出日志文件权限偏宽。该问题涉及凭据暴露与长期留存，是今日应优先跟踪的安全反馈；它也是本批 Issues 中评论最多的一条，目前仍待分诊。

### 2）工具调用参数丢失，可能引发会话级重试循环
[#18197](https://github.com/QwenLM/qwen-code/issues/18197) · **OPEN｜1 条评论**

报告称，即使模型已输出必需参数，工具调用仍可能因缺少 `file_path`、`command` 等字段而被拒绝，严重时进入无法恢复的重试循环。若复现属实，将直接影响 Agent 的核心执行链路；具体故障边界仍需维护者确认。

### 3）外部编辑器退出后终端界面损坏
[#18202](https://github.com/QwenLM/qwen-code/issues/18202) · **OPEN｜1 条评论**

通过 `Ctrl+X` 调用 micro、nano、vim 等全屏编辑器后，TUI 出现乱码且输入区失效。该问题会打断常见的长提示词编辑流程，值得关注终端状态恢复及编辑器兼容性。

### 4）Web Shell 跨工作区打开文件时使用错误会话上下文
[#18198](https://github.com/QwenLM/qwen-code/issues/18198) · **OPEN｜1 条评论**

聊天中的文件、Markdown 链接及本地图片，可能按当前活跃会话而非被查看会话解析工作区，导致 `ENOENT`。这反映出多会话场景下的上下文隔离问题，而不只是链接展示异常。

### 5）Windows 终端文本刷新抖动
[#18225](https://github.com/QwenLM/qwen-code/issues/18225) · **OPEN｜0 条评论**

用户在 Qwen Code 0.28.4、Windows 环境下报告，文本填满窗口后出现整屏异常刷新与上下抖动。问题影响持续阅读和长任务监控，当前尚无进一步讨论。

### 6）Windows Desktop 登录流程阻塞新用户
[#18192](https://github.com/QwenLM/qwen-code/issues/18192) · **OPEN｜0 条评论**

用户称花费一天仍未完成登录，日志反复提示需要认证。该反馈指向首次使用链路的可用性：即使核心功能完善，认证状态识别和错误引导不清晰，也可能直接阻止用户使用。

### 7）请求补齐 GPT 系列模型的推理能力映射
[#18200](https://github.com/QwenLM/qwen-code/issues/18200) · **OPEN｜1 条评论**

提交者称 `getGptReasoningCapabilities()` 缺少若干 GPT-6、6.1、6.2 模型 ID。其重要性在于模型能力识别能否及时跟随提供商变化；所列模型及接口返回情况来自 Issue 报告，本日报未独立验证。

### 8）为 `qwen serve` 每轮提示提供不可变资源视图
[#18178](https://github.com/QwenLM/qwen-code/issues/18178) · **OPEN｜2 条评论**

提议在每轮请求接纳时固定 Skills、扩展、工具、Hooks 及实际 MCP 客户端或进程。目标是避免执行途中资源变化，提升服务端任务的可复现性；已有相关 PR 推进，但不能据此认定完整提案已实现。

### 9）Hooks：先修正字段语义，再扩展事件与执行器
[#18217](https://github.com/QwenLM/qwen-code/issues/18217) · **OPEN｜0 条评论**

提案首先关注“字段被接受，但行为与预期不一致”的问题，再考虑扩展处理器字段、事件和执行器。对依赖 Hooks 实现审批、自动化或流程控制的开发者而言，语义可靠性比单纯增加接口更重要。

### 10）引入模型行为评估框架
[#18188](https://github.com/QwenLM/qwen-code/issues/18188) · **OPEN｜0 条评论**

提议补足现有单元测试和端到端测试之外的缺口：验证模型是否选择正确行为，而不仅是系统能否运行。该方向有助于评估提示词及模型引导变更带来的行为回归，目前仍处于提案阶段。

## 3. 重要 PR 进展

> 以下 10 项均为 **OPEN**，描述的是拟引入的能力或修复。

| PR | 功能或修复内容 | 关注价值 |
|---|---|---|
| [#18219](https://github.com/QwenLM/qwen-code/pull/18219) 会话日志仅所有者可访问 | 为会话转录文件创建设置明确的受限权限，避免常见 `umask` 下生成 `0644` 文件。 | 对应日志访问权限风险；**不等同于解决日志内容中的密钥脱敏问题**。 |
| [#18209](https://github.com/QwenLM/qwen-code/pull/18209) 修复上下文压缩死锁 | 调整历史推理块处理和预算相关逻辑，处理接近上下文上限时手动、自动压缩反复失败的问题。 | 提升长会话的可持续性与恢复能力。 |
| [#18228](https://github.com/QwenLM/qwen-code/pull/18228) 保留 ACP 错误原因并支持受限重放 | 保留传输错误原因；在无可见输出、工具尚未执行等条件下，可选择重放被截断的流。 | 改善错误定位与瞬时传输故障恢复；并非通用工具调用丢参修复。 |
| [#18229](https://github.com/QwenLM/qwen-code/pull/18229) 修正 Stop Hook 终止行为 | 让 `Stop`、`SubagentStop` 返回 `continue: false` 时结束当前轮次或子代理，并支持展示停止原因。 | 修复自动化控制语义，避免要求停止后仍继续执行。 |
| [#18210](https://github.com/QwenLM/qwen-code/pull/18210) 保持单轮 Skills 与扩展稳定 | 让受管提示在工具调用和审批期间保留所用资源，后续轮次再采用新修订。 | 与不可变资源视图诉求方向一致，减少执行中资源漂移。 |
| [#18213](https://github.com/QwenLM/qwen-code/pull/18213) Ink TUI 默认使用事件总线内核 | 拟将共享 Agent 循环的事件总线内核设为默认，并提供回退配置。 | 属于核心执行架构调整，需重点观察取消行为与兼容性回归。 |
| [#18226](https://github.com/QwenLM/qwen-code/pull/18226) PR 审查分层沙箱 | 将基于信任等级的分层沙箱执行模型扩展到 PR 审查中的代码执行阶段，同时保持旧模式兼容。 | 强化处理不可信 PR 代码时的执行边界。 |
| [#18221](https://github.com/QwenLM/qwen-code/pull/18221) microVM 验证轮次编排 | 为 `/verify-pr` 补充宿主侧编排，连接每轮令牌签发与撤销、模型代理约束及受限产物处理。 | 推进硬件隔离验证从基础组件走向可执行流程。 |
| [#18224](https://github.com/QwenLM/qwen-code/pull/18224) 子会话审批等待可挂起 | 子会话等待工具审批或提问时可挂起，并通过冷恢复继续执行。 | 减少等待期间常驻资源占用，改善多代理任务承载能力。 |
| [#18230](https://github.com/QwenLM/qwen-code/pull/18230) 跨任务 worktree 保留工作区记忆 | 将项目自动记忆绑定到会话起始目录或注册工作区，任务 worktree 继承其记忆归属。 | 在隔离任务代码的同时保持项目记忆连续性。 |

## 4. 功能需求趋势

当前评论量整体偏低，以下是从全部 15 条 Issues 提炼的**需求聚类**，并非高票排名。

- **服务端资源一致性与可复现执行**：每轮固定 Skills、扩展和工具等资源，表明用户开始关注长任务运行期间的配置稳定性。  
  参考：[#18178](https://github.com/QwenLM/qwen-code/issues/18178)

- **更可靠、可扩展的 Hooks 自动化**：需求从“提供回调入口”转向字段语义一致、事件覆盖完整、执行器可扩展。  
  参考：[#18217](https://github.com/QwenLM/qwen-code/issues/18217)

- **Web Shell 多会话与移动端体验**：跨工作区链接、活动列表排序、移动端工作区入口，以及自定义前端目录需求共同出现。  
  参考：[#18198](https://github.com/QwenLM/qwen-code/issues/18198)、[#18214](https://github.com/QwenLM/qwen-code/issues/18214)、[#18191](https://github.com/QwenLM/qwen-code/issues/18191)

- **模型兼容与行为质量验证**：一方面需要及时更新模型能力映射，另一方面希望通过行为评估验证模型引导变更的实际效果。  
  参考：[#18200](https://github.com/QwenLM/qwen-code/issues/18200)、[#18188](https://github.com/QwenLM/qwen-code/issues/18188)

- **显示语言与配置一致性**：内置翻译的后续反馈涉及设置展示与工作区限制规则；对应 Issue 已关闭，但仅凭关闭状态不能判断具体交付结果。  
  参考：[#18222](https://github.com/QwenLM/qwen-code/issues/18222)

## 5. 开发者关注点

1. **安全需要覆盖“内容”和“权限”两层。** 限制日志读取权限只能缩小暴露面，无法消除 API key 被原样、重复持久化的风险。  
   参考：[#18165](https://github.com/QwenLM/qwen-code/issues/18165)、[#18219](https://github.com/QwenLM/qwen-code/pull/18219)

2. **执行失败后能否恢复，比错误提示本身更关键。** 工具调用参数丢失、无限重试和压缩失败都可能让会话失去可用性，应重点观察重试边界与恢复路径。  
   参考：[#18197](https://github.com/QwenLM/qwen-code/issues/18197)、[#18209](https://github.com/QwenLM/qwen-code/pull/18209)

3. **Windows 的问题横跨产品与测试链路。** 登录阻塞、终端抖动，以及 MCP 测试清理阶段的 `EBUSY/EPERM`，分别暴露认证、渲染和资源释放问题，不能简单归为同一故障。  
   参考：[#18192](https://github.com/QwenLM/qwen-code/issues/18192)、[#18225](https://github.com/QwenLM/qwen-code/issues/18225)、[#18204](https://github.com/QwenLM/qwen-code/issues/18204)

4. **多会话场景需要更明确的状态归属。** 文件路径应绑定被查看会话，资源应绑定执行轮次，记忆应绑定正确工作区；这是当前多项反馈与改进的共同主题。  
   参考：[#18198](https://github.com/QwenLM/qwen-code/issues/18198)、[#18178](https://github.com/QwenLM/qwen-code/issues/18178)、[#18230](https://github.com/QwenLM/qwen-code/pull/18230)

5. **测试质量正在向资源生命周期与真实行为深化。** 社区不仅关注功能测试通过，也关注清理是否完成、数据库计划断言是否有区分力，以及模型是否作出正确选择。  
   参考：[#18204](https://github.com/QwenLM/qwen-code/issues/18204)、[#18206](https://github.com/QwenLM/qwen-code/issues/18206)、[#18188](https://github.com/QwenLM/qwen-code/issues/18188)

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-24**

> **数据口径**：本报基于所提供的过去 24 小时快照。数据源标注为 `Hmbown/DeepSeek-TUI`，但条目指向 `codewhale-hq/Codewhale`，发布名称也为 Codewhale；以下沿用条目中的仓库链接。仅提供 2 条 Issue、20 条 PR 明细；PR 评论数为 `undefined`，不据此判断讨论热度。`CLOSED` 不等同于已合并。

## 1. 今日速览

今天的核心动态是 **v0.10.4 热修复发布**，重点解决 Windows Terminal 中 Ctrl+V 重复粘贴、导致 API Key 被重复输入的问题。与此同时，面向 **0.10.5** 的工作集中在粘贴链路统一、更新机制、模型配置语义及引擎治理，而 CI 审批积压和安全告警读取权限仍是维护侧的突出阻塞。

## 2. 版本发布

### [v0.10.4：Windows 粘贴问题热修复](https://github.com/codewhale-hq/Codewhale/releases/tag/v0.10.4)

- **修复 Ctrl+V 重复粘贴**：覆盖 Windows Terminal，包括在 `/provider` 中粘贴 API Key 被重复输入的情况；发布说明明确提到已在真实 Windows Terminal 上验证。
- **涉及自更新检查修复**：说明提到 `codewhale update` 不再因无关的 `cargo…` 条件拒绝更新发行版二进制，但原始文本被截断，无法确认完整触发条件。

**影响判断**：Windows 用户，尤其是通过 `/provider` 配置凭据的用户，应优先关注本次更新。

## 3. 社区热点 Issues

**本次数据仅包含 2 条 Issue，无法据此列出 10 条真实热点。** 两条均由机器人创建，评论和点赞均为 0，属于维护巡检信号，而非已形成广泛讨论的用户诉求。

### 1. [#7505：健康巡检——贡献者 CI 审批与失败分类](https://github.com/codewhale-hq/Codewhale/issues/7505)
- **内容**：提醒处理 7 项贡献者 CI 审批，其中 #7340 已开放 9 天；同时要求区分反复出现的真实 CI 失败与偶发失败，并参考同一提交上的通过记录。
- **为什么重要**：审批积压会拖慢外部贡献进入验证流程；CI 噪声则会降低回归判断效率。
- **社区反应**：当前 **0 评论、0 点赞**，未见人工讨论。

### 2. [#7497：安全巡检无法读取告警](https://github.com/codewhale-hq/Codewhale/issues/7497)
- **内容**：`GITHUB_CODEWHALE_SECURITY_PAT` 尚未配置，默认集成令牌缺少 Code Scanning 和 Dependabot 的读取权限。
- **为什么重要**：当前无法可靠判断安全告警状态，形成安全可观测性盲区；**“无法读取”不代表“没有漏洞”**。
- **社区反应**：当前 **0 评论、0 点赞**，尚无可见处置反馈。

## 4. 重要 PR 进展

以下按潜在影响选择 10 项，**并非按评论热度排序**。

| PR | 状态 | 功能或修复内容及意义 |
|---|---|---|
| [#7516：统一粘贴入口](https://github.com/codewhale-hq/Codewhale/pull/7516) | CLOSED | 将多个粘贴入口收敛到统一路径，并把剪贴板读取移出 UI 线程；针对重复读取、去重和 SSH 处理分散的问题进行结构性治理。 |
| [#7519：统一安装归属与更新判断](https://github.com/codewhale-hq/Codewhale/pull/7519) | OPEN | 统一安装归属检查，以单行结果回答当前副本能否自更新，并调整回滚行为、让安装器服从二进制判断。**不包含发布签名密钥工作。** |
| [#7517：区分模型“立即使用”与“设为默认”](https://github.com/codewhale-hq/Codewhale/pull/7517) | OPEN | 修正 `/model` 中 Enter 与 Shift+D 的语义边界，并处理模型解析未体现项目级配置的问题，减少当前会话与持久默认值混淆。 |
| [#7520：0.10.5 配置与代码简化](https://github.com/codewhale-hq/Codewhale/pull/7520) | OPEN | 统一凭据解析器、整合已审查事实表、清理死代码调用并移除 skills 的 `listing_*` 配置项；其中 `api_key_env` 成为类型化配置字段。 |
| [#7503：引擎审计修复包](https://github.com/codewhale-hq/Codewhale/pull/7503) | OPEN | 汇总多组 0.10.5 引擎审计修复，涉及运行时线程、会话管理及后续审计项，是本轮核心稳定性工作的重点。 |
| [#7522：索引时仅读取记录归属字段](https://github.com/codewhale-hq/Codewhale/pull/7522) | OPEN | 避免为取得 owner 字段而完整反序列化包含大量 `detail`、`metadata` 的条目；有望降低大型工具结果参与索引时的解析和内存开销，尚无量化结果。 |
| [#7512：负载敏感测试与偶发失败治理](https://github.com/codewhale-hq/Codewhale/pull/7512) | OPEN | 调整两项测试的时间上限，以容纳 CI runner 抖动，并开展高频偶发失败分类；目标是提升测试结果的可信度。 |
| [#7504：ACP Ask 模式约束与发现机制加固](https://github.com/codewhale-hq/Codewhale/pull/7504) | CLOSED | 在提示发送前通过外部代理提供的模式控制落实 Ask 语义，同时强化发现机制并保留错误详情；影响权限边界与故障诊断。 |
| [#7510：飞书、企业微信共用轮次观察逻辑](https://github.com/codewhale-hq/Codewhale/pull/7510) | OPEN | 将两套桥接中的轮次事件循环迁至 `bridge-core` 的 `observeTurn`，统一流读取、终态识别、结果文本与游标保存，降低行为分叉风险。 |
| [#7523：刷新 Models.dev 离线模型种子](https://github.com/codewhale-hq/Codewhale/pull/7523) | OPEN | 定时同步供应商白名单内的新模型；合并后会发布到公共 `/models` 页面，但新增行仍标记为 `unreviewed`，不应视为已经完成官方文档核验。 |

## 5. 功能需求趋势

**仅凭两条巡检 Issue，无法可靠推出广泛的用户功能偏好。** 结合可见 PR，可识别以下开发投入方向，但不宜将其等同于社区需求排名：

- **可靠性优先于功能扩张**：粘贴、模型选择、更新归属和回滚都在减少日常使用中的不确定行为。参见 [#7516](https://github.com/codewhale-hq/Codewhale/pull/7516)、[#7519](https://github.com/codewhale-hq/Codewhale/pull/7519)、[#7517](https://github.com/codewhale-hq/Codewhale/pull/7517)。
- **大记录处理与引擎治理**：减少索引反序列化成本，并持续处理运行时、会话管理审计项。参见 [#7522](https://github.com/codewhale-hq/Codewhale/pull/7522)、[#7503](https://github.com/codewhale-hq/Codewhale/pull/7503)。
- **模型与供应商覆盖继续扩展**：模型目录定时刷新，同时出现 AtmoRouter 内置供应商描述符提案；目录更新与事实核验仍有明确区分。参见 [#7523](https://github.com/codewhale-hq/Codewhale/pull/7523)、[#7506](https://github.com/codewhale-hq/Codewhale/pull/7506)。
- **中文可用性与协作集成同步推进**：简体中文自动审查文档补齐，飞书和企业微信桥接逻辑收敛。参见 [#7521](https://github.com/codewhale-hq/Codewhale/pull/7521)、[#7510](https://github.com/codewhale-hq/Codewhale/pull/7510)。

## 6. 开发者关注点

1. **贡献验证链路存在等待成本**：7 项 CI 审批待处理，说明维护者审核能力可能成为外部贡献吞吐的瓶颈。参见 [#7505](https://github.com/codewhale-hq/Codewhale/issues/7505)。
2. **测试失败需要更准确地归因**：既要处理真实回归，也要避免 runner 负载抖动反复占用排障时间。参见 [#7512](https://github.com/codewhale-hq/Codewhale/pull/7512)。
3. **安全巡检首先需要恢复可见性**：补齐令牌和读取权限后，才能判断告警数量、严重程度及处置优先级。参见 [#7497](https://github.com/codewhale-hq/Codewhale/issues/7497)。
4. **配置和状态应有单一事实来源**：凭据解析、任务管理器访问及桥接事件循环均在向共享实现收敛，体现出降低重复逻辑维护成本的方向。参见 [#7520](https://github.com/codewhale-hq/Codewhale/pull/7520)、[#7507](https://github.com/codewhale-hq/Codewhale/pull/7507)、[#7510](https://github.com/codewhale-hq/Codewhale/pull/7510)。

**后续观察重点**：0.10.5 相关开放 PR 的合并与发布情况，以及安全巡检权限是否恢复；现阶段不应把这些提案视为已发布能力。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*