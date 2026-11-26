# AI CLI 工具社区动态日报 2026-11-26

> 生成时间: 2026-11-26 03:58 UTC | 覆盖工具: 9 个

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
**观察日期：2026-11-26｜依据：所提供的过去 24 小时社区摘要**

> **口径说明：**活跃度统计指窗口内“更新过的条目”，不是新增数量；部分仓库只展示了抽样数据。Issue 反馈不等于官方确认，PR 关闭不等于合并，发布失败也不等于正式版本不可用。以下定位与趋势判断仅依据本期样本，不构成产品能力排名。

## 1. 生态全景

AI CLI 的竞争重点正从“支持哪些模型、能调用哪些工具”，转向**长任务能否稳定执行、权限是否真正生效、会话能否可靠恢复**。产品形态也在突破终端：桌面端、移动端、远程工作区、编辑器和 SDK 嵌入成为多个生态的共同发展方向。MCP、插件和多 Agent 扩大了能力范围，同时增加了授权继承、凭据绑定、任务取消及后台数据流向的治理难度。模型与多模态能力仍在扩展，但本期更突出的信号是：**可靠性、可观测性和可控性正在成为生产采用的重要门槛。**

## 2. 各工具活跃度对比

| 工具 | 更新 Issues 数 | 更新 PR 数 | Release 情况 |
|---|---:|---:|---|
| **Claude Code** | 50，展示 30 | 0 | 无新 Release |
| **OpenAI Codex** | 50，展示 30 | 50，展示 20 | 1 个 Alpha：`0.174.0-alpha.6`；无具体变更说明 |
| **Gemini CLI** | 5 | 8 | 未提供成功发布记录；连续两日 Nightly 发布失败 |
| **GitHub Copilot CLI** | 12 | 0 | 5 条发布记录：`v1.0.116-5` 至 `v1.0.117-2`，不代表全部中间版本 |
| **Kimi Code CLI** | 0 | 0 | 窗口内无活动 |
| **OpenCode** | 展示 30，总量未提供 | 展示 20，总量未提供 | 1 个：`v2.4.2` |
| **Pi** | 31，展示 30 | 21，展示 20 | 1 个：`v1.6.1` |
| **Qwen Code** | 37，展示 30 | 40，展示 20 | 1 个预览版：`v1.0.0-preview.2` |
| **DeepSeek TUI** | 1 条输入记录，归属待核实 | 0 | 无新 Release |

**统计边界：**
- DeepSeek TUI 的唯一 Issue 实际指向 `codewhale-hq/Codewhale`，不宜计为其已核实的社区活动。
- Pi 的摘要仓库为 `badlogic/pi-mono`，实际条目链接指向 `earendil-works/pi`；正式建立长期指标前应核对仓库映射。
- 不宜直接用 Issue/PR 数量比较产品质量：机器人告警、重复报告和贡献流程都会影响数量。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与横向判断 |
|---|---|---|
| **长任务与取消语义** | Claude Code、Codex、OpenCode、Pi、Qwen Code、Copilot CLI | 休眠后超时、长会话崩溃、线程占用、中断后子 Agent 继续执行、取消后写文件、非交互退出码异常。共同要求是让“运行中、已完成、已取消”具有可靠含义。 |
| **有效权限与配置透明度** | Claude Code、Codex、Gemini CLI、Copilot CLI、OpenCode、Qwen Code | 界面显示完全访问但沙箱仍限制、系统设置被跳过、网络放行未生效、Plan 模式经 Shell 写入、非交互默认权限差异。核心不是一味扩大权限，而是展示实际生效策略。 |
| **会话连续性与恢复** | Claude Code、Codex、Copilot CLI、OpenCode、Pi、Qwen Code | 跨端空会话或缺失、重启恢复后台 Agent、版本迁移失败、历史恢复与嵌入宿主适配。会话正成为需要持久管理的工作状态，而非临时聊天记录。 |
| **插件、MCP 与扩展治理** | Claude Code、Codex、Gemini CLI、Copilot CLI、Pi、Qwen Code | MCP 配置作用域、表单交互、会话资源清理、工具定义变更后重新授权、OAuth 凭据绑定、组织强制扩展、项目级安装。扩展生态开始进入治理与兼容阶段。 |
| **上下文、缓存与历史可追溯性** | Claude Code、Pi、Gemini CLI | 压缩前通知、旧工具结果清理、压缩后保留界面历史、工具排序稳定、检索预算精确计算。开发者希望分别管理“模型看到的上下文”和“用户需要保留的记录”。 |
| **执行过程可观测性** | Codex、Copilot CLI、OpenCode、Qwen Code、Gemini CLI | 后台结果可见、真实错误透出、审批展示实际命令、模型来源准确、diff 可信。结果之外，开发者还需要理解执行过程。 |

**需要区分两类安全问题：**Claude Code、Codex 的反馈偏向安全检查疑似误报；Gemini CLI、OpenCode、Qwen Code 等同时出现执行或信任边界问题。前者关注正常任务可用性，后者关注授权与隔离是否有效，不能混为一谈。

## 4. 差异化定位分析

以下为本期动态体现的侧重点，而非完整产品定义。

| 工具 | 功能侧重 | 更相关的目标用户 | 技术路线信号 |
|---|---|---|---|
| **Claude Code** | 深度编码工作流、长会话、插件与多 Agent 协作 | 重度交互开发者、复杂仓库用户、自动化平台集成者 | 围绕既有 Agent 执行体系补强上下文生命周期、无头交互和配置管理 |
| **Codex** | 桌面/TUI/移动端协同、工具执行与权限一致性 | 跨设备开发者、企业托管环境用户 | app-server、线程写入所有权、多执行环境与 TUI 持续演进 |
| **Gemini CLI** | MCP 与网络工具安全、配置边界、模型接入 | MCP 使用者、集中配置部署者、Vertex AI 用户 | 本期贡献集中在协议和信任边界加固，发布流水线可靠性亟待恢复 |
| **Copilot CLI** | GitHub 企业身份、扩展治理、ACP 编辑器交互 | GitHub/GHE 企业团队、编辑器集成者 | 通过 SDK hooks、托管策略、显式工具暴露连接组织治理与 Agent 执行 |
| **OpenCode** | 多模型适配、远程工作区、GUI/CLI、后台执行 | 多提供商用户、自托管与远程开发团队 | 强调环境隔离、后台生命周期和多界面体验，执行安全是关键验证项 |
| **Pi** | SDK 服务化、codemode、模型抽象与终端交互 | Agent 框架开发者、长驻服务与多模型集成者 | 通过统一消息/决策/图像协议扩展能力，并补齐 durable 生命周期管理 |
| **Qwen Code** | 订阅模型、Web Shell、Managed Agent 嵌入 | Qwen 模型用户、业务系统与平台集成者 | 向宿主可接管 Runtime、Workspace、Session 的组合式架构发展 |
| **Kimi Code CLI** | 本期无可分析活动 | 无法据本期判断 | 无活动不能外推为项目停滞 |
| **DeepSeek TUI** | 数据归属存疑 | 无法据本期可靠判断 | 应先清理数据来源，再进行产品定位 |

## 5. 社区热度与成熟度

### 活跃度：Codex、Qwen Code 位于可确认数据的前列

- **Codex：50 条 Issue、50 条 PR 更新**，在提供明确总量的工具中活动量最高，反馈与代码变更同时密集。
- **Qwen Code：37 条 Issue、40 条 PR 更新**，显示较强工程活动，但其中包含 CI、发布与机器人报告，不能全部理解为用户需求热度。
- **Pi：31 条 Issue、21 条 PR 更新**，覆盖 SDK、终端、模型与协议，贡献方向较广。
- **OpenCode：至少展示 30 条 Issue、20 条 PR**，活动显著，但缺少总量，不宜与上述工具做严格排序。
- **Claude Code：50 条 Issue 更新、无 PR 更新**，说明本期反馈活跃，但该窗口不能反映相应修复落地速度。

### 讨论热度：整体仍是低互动样本

OpenCode 的误删与会话迁移报告各有 **7 条评论**，Qwen Code 的批量测试失败报告有 **5 条评论**，Codex 跨端会话问题和 Pi 终端图片问题各有 **4 条评论**。多数其他条目仅有 0–2 条评论，且点赞有限，因此应称为“值得关注的风险或方向”，而非社区共识。

### 快速迭代与成熟度应分开判断

- **Copilot CLI** 一日有 5 条发布记录，体现高频交付；但发布说明部分截断，无法据此判断版本稳定性。
- **Codex、Qwen Code** 发布 Alpha/Preview，明确仍有能力验证与兼容性磨合空间。
- **Gemini CLI** 连续两日 Nightly 失败并标记 P0，**Qwen Code** 出现多个发布阶段阻塞，反映交付链路压力，不直接证明正式版本普遍不可用。
- **OpenCode、Pi** 的生命周期、资源回收与持久状态问题，说明其更复杂使用场景正在暴露基础设施需求。

**总体判断：活跃说明变化多，不等于更成熟；成熟度更应通过回归测试、故障恢复、授权一致性和修复交付记录衡量。**

## 6. 值得关注的趋势信号

### ① AI CLI 正成为可嵌入的 Agent 执行基础设施
Qwen Code 的外部 Runtime/Workspace、Pi 的 durable 与统一模型协议、Claude Code 的结构化无头交互需求，都指向同一方向：CLI 不再只是人直接操作的终端应用。

**开发者参考：**平台选型应检查结构化事件、暂停恢复、幂等性、取消确认和资源回收，而不只比较交互演示效果。

### ② “停止”正在成为必须验证的系统契约
OpenCode 的子任务继续运行、Pi 的状态提前空闲、Qwen Code 的取消后写入提案，暴露出停止按钮与实际执行状态可能不一致。

**开发者参考：**验收测试应覆盖父子任务树、后台进程、重启恢复及取消后的文件副作用。

### ③ 权限治理从“是否批准”走向“批准的对象是否改变”
Gemini CLI 提议把授权绑定到工具定义、把 OAuth 令牌绑定到服务器 URL；Copilot CLI 加强扩展启动边界和实际命令展示。

**开发者参考：**长期授权应考虑工具定义、目标地址和配置版本变化，不能仅凭名称复用批准。

### ④ 多模型治理需要覆盖后台辅助请求
OpenCode 的标题生成账号归属报告、Copilot CLI 的路由反馈，以及 Qwen Code 的多工作区模型状态问题，表明主模型选择并不能说明全部请求的数据去向。

**开发者参考：**审计范围应包括标题生成、子 Agent、检索和其他辅助调用，记录提供商、账号与路由原因。

### ⑤ 上下文优化正在同时影响成本与可追溯性
Claude Code 关注压缩控制，Pi 关注缓存稳定与压缩后历史，Gemini CLI 关注检索预算。上下文已成为独立的工程管理对象。

**开发者参考：**区分模型上下文、用户可见历史和审计记录；在部署前验证压缩、恢复与缓存变化是否损害任务连续性。

### ⑥ 高风险低频报告应优先于普通功能需求处理
OpenCode 的误删报告、Plan 模式写入反馈，以及 Qwen Code 的非交互权限差异，即使讨论量有限，也涉及较大潜在损失。

**开发者参考：**无人值守场景应默认采用隔离工作区、最小权限、破坏性命令复核和可恢复备份，不能将任何工具的模式名称等同于可靠安全边界。

---

**决策结论：**当前更有效的选型方式不是寻找统一的“最强 CLI”，而是围绕部署场景验证关键契约：**交互开发看会话连续性，企业部署看策略与身份一致性，平台嵌入看生命周期与结构化接口，无人值守看取消、隔离和恢复能力。** 本期社区信号表明，这些工程属性正在比功能数量更直接地决定生产价值。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-26｜基于所提供的 20 条 PR、15 条 Issue**

> **数据说明：**所列 PR 的评论数均为 `undefined`、👍 均为 0，因此无法验证“按评论数排序”，也无法据此判断哪些 PR 讨论最活跃。以下按 **Issue 需求呼应程度、问题影响及更新情况**整理关注清单，并非严格热度榜。所有展示的 PR 均标记为 **OPEN**；未提供合并计划或 Draft 信息。

## 1. 热门 Skills 排行：8 个重点关注项

| Skill / PR | 功能与改进 | 社区关注点 | 当前状态 |
|---|---|---|---|
| **1. skill-creator** · [PR #1298](https://github.com/anthropics/skills/pull/1298) | 改进 Skill 触发评测，隔离并行任务，处理 Windows 与运行时异常。 | **评测结果是否可信**是最明确的技术痛点：[#556](https://github.com/anthropics/skills/issues/556) 有 13 条评论，报告触发率始终为零；[#1352](https://github.com/anthropics/skills/issues/1352) 有 6 条评论，指出并行评测产生假阴性。 | **OPEN**；9 月 16 日更新 |
| **2. webapp-testing** · [PR #1980](https://github.com/anthropics/skills/pull/1980) | 调整测试服务器启动方式，避免使用 `shell=True`。 | 重点是用户或 Agent 生成的命令进入 Shell 后的**命令注入风险**；属于安全修复，而非新增测试功能。 | **OPEN**；11 月 1 日更新 |
| **3. docx** · [PR #1792](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时返回错误，并验证输出 DOCX 中修订标记是否真正移除。 | 从“脚本运行结束”转向“产物确实正确”；另有 [#2018](https://github.com/anthropics/skills/issues/2018) 报告 XML 损坏，体现文档完整性压力。 | **OPEN**；11 月 1 日更新 |
| **4. mcp-builder** · [PR #1742](https://github.com/anthropics/skills/pull/1742) | 适配 MCP ≥2 的 `streamable_http_client` 导入及自定义 HTTP 请求头配置。 | 关注 SDK 升级后的**兼容性与连接可用性**，避免旧版示例和脚本失效。 | **OPEN**；10 月 8 日更新 |
| **5. xlsx** · [PR #2019](https://github.com/anthropics/skills/pull/2019) | 改进外部链接风险检查，识别工作表级名称和间接别名引用。 | 防止漏检 Excel 外部依赖，提升重算前风险判断的完整性。 | **OPEN**；11 月 3 日更新 |
| **6. notion-spec-to-implementation 等** · [PR #1245](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品或技术规格拆解为实施任务、验收标准和进度跟踪；同一 PR 还提交了简历量化审计 Skill。 | 展示“**规格 → 任务 → 实施**”工作流扩展方向；但现有数据不能证明它获得了高讨论度。 | **OPEN**；10 月 15 日更新 |
| **7. md2video-audio** · [PR #1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经 Marp 等流程转换为带配音的 MP4 视频。 | 从文本生产扩展到多模态内容交付；“零成本”和配音质量属于提交者描述，尚无验证数据。 | **OPEN**；9 月 15 日更新 |
| **8. pyxel** · [PR #525](https://github.com/anthropics/skills/pull/525) | 支持 Python 复古游戏开发、调试、无头输入测试和画面检查。 | 不只生成游戏代码，还强调**运行、观察与验证**闭环；3 月提交后仍有后续更新。 | **OPEN**；11 月 1 日更新 |

## 2. 社区需求趋势

### ① 安全治理与可信分发：讨论量最突出的议题
[Issue #492](https://github.com/anthropics/skills/issues/492) 获 **46 条评论、3 个赞**，是所列 Issue 中评论最多的一项。核心担忧是社区 Skill 使用 `anthropic/` 命名空间，使用户误认为其为官方内容。

**需求指向：**来源辨识、权限边界、可信发布与审计，而不只是增加新 Skill。此前的 [agent-governance 提案 #412](https://github.com/anthropics/skills/issues/412) 也涉及策略执行、威胁检测及审计轨迹，但其 CLOSED 状态不能直接视为已实现。

### ② 企业级共享与分发：从个人工具走向组织资产
[Issue #228](https://github.com/anthropics/skills/issues/228) 获 **17 条评论、8 个赞**，希望通过组织共享库或链接分发 Skill，替代下载、聊天软件转发和手动上传。

**需求指向：**组织级 Skill 管理与复用。这主要是平台能力诉求，并非单个新 Skill 能完整解决。

### ③ Skill 评测与质量门禁：让自动化结果可验证
触发评测问题集中于 [#556](https://github.com/anthropics/skills/issues/556) 和 [#1352](https://github.com/anthropics/skills/issues/1352)；[质量门禁提案 #1385](https://github.com/anthropics/skills/issues/1385) 则提出“任务前校准 → 对抗审查 → 交付验证”，获 **8 条评论**，并于 **11 月 25 日**更新。

**需求指向：**可靠触发测试、输出审查和交付验收。相比泛化的“代码审查 Skill”，现有证据更明确地支持**质量验证工作流**。

### ④ 长任务记忆与上下文效率：减少 Skill 自身的使用成本
[compact-memory 提案 #1329](https://github.com/anthropics/skills/issues/1329) 有 **10 条评论**，关注长任务状态的紧凑表示；[#1487](https://github.com/anthropics/skills/issues/1487) 报告 `claude-api` 一次注入约 156k tokens；[#189](https://github.com/anthropics/skills/issues/189) 则反馈插件重复加载相同 Skills。

**需求指向：**压缩记忆、按需加载和去重，而不是持续扩大默认上下文。

### ⑤ 文档工作流：正确性优先于新增格式
[Issue #2018](https://github.com/anthropics/skills/issues/2018) 指出 DOCX 合并操作可能写出无效 XML；[排版质检 PR #514](https://github.com/anthropics/skills/pull/514) 则尝试处理孤行、标题悬挂和编号对齐。

**需求指向：**文档结构验证、排版检查及可交付质量，而不只是“生成一份文件”。

> **范围提醒：**现有 Issues 不足以支持“代码审查、测试生成是最热门新 Skill 方向”的结论；规格自动化和多媒体制作更多体现为 PR 供给侧探索。

## 3. 高潜力待合并 Skills

**无法确认“评论活跃”或“近期将合并”**。以下依据需求明确度与更新信号列为跟踪对象，不代表维护者已承诺接纳。

| 候选 PR | 值得跟踪的原因 | 主要不确定性 |
|---|---|---|
| **[skill-creator 评测修复 #1298](https://github.com/anthropics/skills/pull/1298)** | 有多个 Issue 呼应，影响 Skill 优化结果的可信度，基础设施价值高。 | 最近提供的更新停留在 9 月，缺少审查进度。 |
| **[skill-creator 打包修复 #1681](https://github.com/anthropics/skills/pull/1681)** | 修复直接运行 `package_skill.py` 的导入失败，并更新使用路径；**11 月 19 日**仍有更新。 | 更新不等于获批，需观察测试与维护者反馈。 |
| **[webapp-testing 安全修复 #1980](https://github.com/anthropics/skills/pull/1980)** | 针对明确的命令注入风险，安全价值较高。 | 需验证替代方案对既有服务器启动命令的兼容性。 |
| **[Notion 规格转实施 #1245](https://github.com/anthropics/skills/pull/1245)** | 新增能力中，最贴近 Claude Code 的任务规划与实施场景。 | 同时包含两个不同方向的 Skill，且缺少讨论与验收信息。 |
| **[Pyxel 游戏开发 #525](https://github.com/anthropics/skills/pull/525)** | 覆盖开发、运行和验证，工作流较完整；长期开放后仍有更新。 | 已开放数月，不能据此推断即将合并。 |

## 4. Skills 生态洞察

**当前社区最集中的诉求不是“更多 Skills”，而是让 Skills 更可信、更可验证、更易共享，并以更低的上下文成本稳定交付结果。**——主要依据：[安全分发 #492](https://github.com/anthropics/skills/issues/492)、[组织共享 #228](https://github.com/anthropics/skills/issues/228)、[触发评测 #556](https://github.com/anthropics/skills/issues/556)。

---

# Claude Code 社区动态日报
**2026-11-26｜数据源：[anthropics/claude-code](https://github.com/anthropics/claude-code)**

## 1. 今日速览

过去 24 小时无新 Release，也无更新的 PR；社区反馈主要围绕 **桌面端性能与跨端会话可靠性、长会话运行稳定性，以及自动化接口能力**。功能需求集中在无头模式的人机交互、上下文压缩控制和 MCP 配置管理，反映出开发者对可控性与可观测性的重视。

> **数据口径：**本次窗口共 50 条更新的 Issue，以下分析基于展示的 30 条。样本中各 Issue 仅有 0–1 条评论、均为 0 个 👍，尚未形成明显讨论热点；下文按潜在影响和技术价值筛选，不代表社区共识。用户报告亦不等于官方确认。

## 2. 社区热点 Issues

### 1. 非交互模式 API Key 计费提示不够明确
**[#112377](https://github.com/anthropics/claude-code/issues/112377)｜OPEN｜1 条评论**

- **内容：**即使用户在交互模式中拒绝使用环境变量里的 API Key，`claude -p` 仍可能使用 `ANTHROPIC_API_KEY` 计费。
- **为什么重要：**涉及 CI、脚本和自动化任务的费用归属，应明确区分交互模式与非交互模式的认证行为。
- **社区反应：**作者复核后已说明这是有文档记录的预期行为，并将诉求改为加强提示，**不应再视为已确认的计费 Bug**。

### 2. 桌面端 Git 轮询可能绕过 fsmonitor
**[#112392](https://github.com/anthropics/claude-code/issues/112392)｜OPEN｜0 条评论**

- **内容：**报告称桌面端轮询 Git 状态时传入 `-c core.fsmonitor=`，导致大型仓库反复进行完整工作树扫描。
- **为什么重要：**同仓库多会话场景可能放大 CPU 与磁盘 I/O 开销，是大型代码库用户值得优先关注的性能问题。
- **社区反应：**暂无评论，影响范围与根因仍待验证。

### 3. macOS 休眠时间被计入工具超时
**[#112366](https://github.com/anthropics/claude-code/issues/112366)｜OPEN｜1 条评论｜has repro**

- **内容：**用户报告 MCP、Hook 和 Bash 的超时计时包含设备休眠时间，唤醒后可能立即触发超时。
- **为什么重要：**影响笔记本上的长任务及工具连接连续性，且报告涉及多个计时机制。
- **社区反应：**已有少量讨论，并标记可复现；尚无修复信息。

### 4. WSL2 长会话出现 Bun 崩溃
**[#112368](https://github.com/anthropics/claude-code/issues/112368)｜OPEN｜0 条评论**

- **内容：**在 WSL2、Ubuntu 26.04.1、glibc 2.43 和 Claude Code 2.1.331 环境中，运行数小时后出现段错误或 SIGABRT。
- **为什么重要：**对长时间交互开发存在中断风险，报告给出了较明确的运行环境。
- **社区反应：**作者关联了相同崩溃文本的既有问题，但当前发生在长时间运行后，不能直接认定为同一根因。

### 5. 后台会话指定的临时目录遭沙箱拒写
**[#112375](https://github.com/anthropics/claude-code/issues/112375)｜OPEN｜0 条评论｜has repro**

- **内容：**`claude --bg` 提示使用 `$CLAUDE_JOB_DIR/tmp` 存放临时文件，但 Bash 沙箱拒绝写入该目录。
- **为什么重要：**暴露出任务提示与实际权限边界可能不一致，影响后台 Agent 的文件处理流程。
- **社区反应：**已标记可复现，暂无进一步讨论。

### 6. Remote Control 重连后移动端出现空会话
**[#112393](https://github.com/anthropics/claude-code/issues/112393)｜OPEN｜0 条评论｜has repro**

- **内容：**桌面会话重新建立 Remote Control 链接后，移动端出现同名空会话，旧条目被留作过期副本；桌面仍保留完整对话。
- **为什么重要：**影响跨设备接续体验，也可能让用户误以为会话丢失。
- **社区反应：**暂无评论；现有描述不足以认定发生了实际对话数据丢失。

### 7. 无头模式需要结构化澄清与暂停恢复能力
**[#112385](https://github.com/anthropics/claude-code/issues/112385)｜OPEN｜0 条评论**

- **内容：**请求为 `-p / stream-json` 模式提供结构化 `AskUserQuestion` 回调及暂停、恢复机制。
- **为什么重要：**这是将 Claude Code 集成到自动化平台时的重要交互能力，关系到任务遇到歧义后能否可靠继续。
- **社区反应：**暂无评论；提案引用了容器化任务评测背景，但摘要不足以判断具体评测结果。

### 8. 插件希望在空闲压缩前获得通知
**[#112388](https://github.com/anthropics/claude-code/issues/112388)｜OPEN｜0 条评论**

- **内容：**请求增加空闲压缩前通知，并允许配置触发时机。
- **为什么重要：**插件需要在上下文变化前同步状态，开发者也需要更清楚地掌握压缩何时发生。
- **社区反应：**暂无评论；与缓存编辑、压缩 Hook 等相关提案共同体现了上下文管理扩展需求。

### 9. 安全检测可能受到常驻技能描述影响
**[#112369](https://github.com/anthropics/claude-code/issues/112369)｜OPEN｜0 条评论**

- **内容：**报告者怀疑，常驻技能列表或插件 MCP 描述触发了与当前用户任务无关的生物安全检查。
- **为什么重要：**若得到验证，将涉及插件描述与安全策略之间的交互边界，影响无关任务的可用性。
- **社区反应：**作者报告其本地样本中约 9.5% 的主会话受到影响；**该比例仅代表作者样本，不能外推为产品整体发生率**。

### 10. VS Code 自定义配置目录下重命名失败
**[#112381](https://github.com/anthropics/claude-code/issues/112381)｜OPEN｜1 条评论｜has repro**

- **内容：**在 `claudeCode.environmentVariables` 中设置 `CLAUDE_CONFIG_DIR` 后，重命名空闲会话出现 `ENOENT`。
- **为什么重要：**影响使用独立配置目录、多环境隔离的 VS Code 用户，值得检查扩展内的路径处理一致性。
- **社区反应：**已标记可复现，当前仅有少量讨论。

## 3. 重要 PR 进展

**过去 24 小时无更新的 PR，无法据此筛选 10 个重要 PR。** 本期没有可报告的代码合并或修复落地进展；Issue 中的诉求不代表已有对应实现。

查看：[仓库 Pull Requests](https://github.com/anthropics/claude-code/pulls)

## 4. 功能需求趋势

| 方向 | 需求与分析 | 相关 Issue |
|---|---|---|
| **自动化中的交互能力** | 无头模式需要结构化提问与暂停恢复，Bash 工具则被要求支持有状态 PTY，以覆盖 REPL、调试器等交互程序。 | [#112385](https://github.com/anthropics/claude-code/issues/112385)、[#112386](https://github.com/anthropics/claude-code/issues/112386) |
| **上下文生命周期与插件可观测性** | 请求压缩前通知、通过缓存编辑清理旧工具结果，以及标明工具调用来自哪次模型请求，方便插件追踪执行链路。 | [#112388](https://github.com/anthropics/claude-code/issues/112388)、[#112382](https://github.com/anthropics/claude-code/issues/112382)、[#112390](https://github.com/anthropics/claude-code/issues/112390) |
| **MCP 配置与作用域管理** | 希望通过 CLI 启停服务器，并支持命名连接器、项目绑定及配置继承，减少多项目管理成本。 | [#112371](https://github.com/anthropics/claude-code/issues/112371)、[#112359](https://github.com/anthropics/claude-code/issues/112359) |
| **评测可复现性** | 用户希望不同订阅方案下能够使用一致的工具提示，避免账户差异成为 Agent 评测中的隐藏变量。 | [#112373](https://github.com/anthropics/claude-code/issues/112373) |

**状态提醒：**缓存编辑提案 [#112380](https://github.com/anthropics/claude-code/issues/112380) 已关闭，但同题目的 [#112382](https://github.com/anthropics/claude-code/issues/112382) 仍开放；现有数据未说明关闭原因，不能视为功能已实现。

## 5. 开发者关注点

- **长任务需要更可靠的运行底座。** 休眠后超时与数小时后崩溃都会打断持续工作流，长会话稳定性值得优先跟踪。关联：[超时计时](https://github.com/anthropics/claude-code/issues/112366)、[WSL2 崩溃](https://github.com/anthropics/claude-code/issues/112368)。
- **配置与权限应当“所见即所得”。** 连接器关闭后仍显示部分工具、完整磁盘访问授权未能覆盖实际执行程序等反馈，说明用户难以判断当前生效状态。关联：[连接器状态](https://github.com/anthropics/claude-code/issues/112370)、[macOS 授权](https://github.com/anthropics/claude-code/issues/112379)。
- **安全限制需要准确且便于诊断。** 无 `rm` 命令被删除保护拦截、合法科研任务被安全检查中断，均体现出解释拦截原因与降低误判的重要性。关联：[Bash 安全检查](https://github.com/anthropics/claude-code/issues/112389)、[计算化学任务](https://github.com/anthropics/claude-code/issues/112391)。
- **Agent 不仅要完成任务，也要遵守范围与节奏。** 用户反馈包括小修复被扩大为重构、并行 Agent 积累未测试改动，以及循环任务提前停止；这些属于待验证的行为反馈，而非已确认的模型整体退化。关联：[#112387](https://github.com/anthropics/claude-code/issues/112387)、[#112374](https://github.com/anthropics/claude-code/issues/112374)、[#112353](https://github.com/anthropics/claude-code/issues/112353)。

**今日判断：**本期更值得关注的不是新功能发布，而是 Claude Code 在长会话、多 Agent、插件与跨端协作场景下，能否提供稳定、透明且可编排的执行体验。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-26｜数据来源：[openai/codex](https://github.com/openai/codex)**

## 1. 今日速览

今日发布 **`0.174.0-alpha.6` 预发布版本**，但提供的 Release 信息没有具体变更说明。社区反馈主要集中在 **Windows 桌面端稳定性、跨端会话一致性、权限配置生效及安全检查疑似误报**；PR 则以 TUI 交互、执行结果可见性与 MCP 恢复机制改进为主。

> **统计口径：**本批数据包含过去 24 小时更新的 Issues、PR 各 50 条，但仅展示其中 30 条 Issues、20 条 PR。以下分析基于展示样本；PR 的 `CLOSED` 状态不等于已合并，评论数 `undefined` 也不能视为零评论。

## 2. 版本发布

### [`rust-v0.174.0-alpha.6`](https://github.com/openai/codex/releases/tag/rust-v0.174.0-alpha.6)
- **版本号：**`0.174.0-alpha.6`，属于 Alpha 预发布版本。
- **更新内容：**当前数据仅提供版本标题，无法确认具体新增功能、修复项或兼容性变化。
- **升级建议：**适合测试环境验证；不要据此假定下述 PR 已包含在该版本中。

## 3. 社区热点 Issues

以下 10 条兼顾评论热度、影响范围和开发工作流风险。**均为 OPEN，👍 均为 0**；目前属于早期反馈，不代表已确认的普遍故障。

| Issue | 核心问题与关注价值 | 社区反应 |
|---|---|---|
| [#64043 Windows → iOS Remote 部分会话缺失](https://github.com/openai/codex/issues/64043) | 主机在线且其他线程可见，但部分本地对话未出现在移动端。影响远程接续工作的可靠性，也需要区分会话同步与展示筛选问题。 | **4 条评论**，展示样本中讨论最多。 |
| [#64020 Windows 两轮消息后触发长度限制及附件工具网络错误](https://github.com/openai/codex/issues/64020) | 报告涉及 `26.1120.6357.0`，同时出现上下文限制与托管附件访问错误，可能直接阻断短会话及文件处理流程。 | **3 条评论**，尚无确认根因。 |
| [#64038 Windows 首页反复出现 “Missing scope instance”](https://github.com/openai/codex/issues/64038) | `AppRoutes` 进入 React 错误回退页；报告称持久化路由状态可能使重启后仍受影响。属于入口级可用性问题。 | **1 条评论**；与样本内其他启动异常报告形成同类信号。 |
| [#64028 macOS 新建本地 Work 对话无法发送](https://github.com/openai/codex/issues/64028) | 正常新建入口的发送按钮灰置，而 `/new`、`/fork` 可用。复现差异有助于定位会话初始化或 UI 状态问题。 | **2 条评论**；另有类似的新建对话故障报告。 |
| [#64034 ChatGPT Work 与 Codex 意外跨应用同步会话](https://github.com/openai/codex/issues/64034) | 用户报告桌面整合后出现非预期会话同步。值得关注产品之间的会话边界和用户对隔离行为的预期。 | **2 条评论**；是否属于预期行为尚不明确。 |
| [#64039 选择 Full access 后仍受 workspace-write 限制](https://github.com/openai/codex/issues/64039) | macOS 界面显示完全访问，但实际网络、SSH 和提权仍受限制。核心问题是“界面权限”与“有效执行权限”不一致。 | **2 条评论**，反映权限状态透明度不足。 |
| [#64027 旧版 sandboxPolicy 覆盖托管默认权限配置](https://github.com/openai/codex/issues/64027) | 报告称 app-server `0.172.0` 中，显式旧配置覆盖 `requirements.toml` 的默认权限配置。关系到企业托管策略的可预测性。 | **1 条评论**；报告提供了与旧版本的行为对照。 |
| [#64066 学术安全研究遭遇过度网络安全限制](https://github.com/openai/codex/issues/64066) | 用户认为合法学术研究被安全检查阻断。重要性在于安全边界与授权开发场景之间的区分，但误报性质仍待核实。 | **1 条评论**；样本内还有多条疑似安全误报反馈。 |
| [#64041 Computer Use 因 Chrome URL 验证失败结束任务轮次](https://github.com/openai/codex/issues/64041) | 单个工作流据报有 **36 轮**因此结束，其中 30 轮此前已有可访问性观测返回顶层 URL。值得核查观测结果与验证逻辑是否一致。 | **1 条评论**；数字来自单份报告，不代表整体失败率。 |
| [#63991 空闲 TUI 占用线程，队列无法恢复执行](https://github.com/openai/codex/issues/63991) | `codex queue --resume` 可以排队消息，但因线程已有 active writer 而无法启动。影响交互式 TUI 与自动化任务协作。 | **1 条评论**；暴露线程写入所有权与恢复机制的限制。 |

## 4. 重要 PR 进展

**以下 10 个 PR 均显示为 CLOSED；数据未提供合并标记，不能确认已合并或已发布。**

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| [#64013 保留 Windows PowerShell hooks 原生退出码](https://github.com/openai/codex/pull/64013) | 避免原生命令退出码 `2` 被 PowerShell 转为 `1`，使 `PreToolUse` hook 正确表达阻断结果。 | 关系到工具调用前置检查的可靠性。 |
| [#64052 能力发现遵循各执行器的插件设置](https://github.com/openai/codex/pull/64052) | 区分单个执行环境的插件禁用与线程级排除，避免影响其他环境中的安装。 | 提升多执行环境下插件配置的一致性。 |
| [#64023 TUI 支持 MCP 数值型表单字段](https://github.com/openai/codex/pull/64023) | 为数值字段提供输入能力，避免退化成无法填写必填项的通用批准提示。 | 改善 MCP 交互完整性，减少无效确认。 |
| [#64011 HTTP 恢复期间清理遗弃的 MCP 会话](https://github.com/openai/codex/pull/64011) | 恢复初始化失败或超时后，清理已分配的替代会话。 | 减少服务端会话资源被占用及后续重试受阻。 |
| [#64015 展示后台命令启动及延迟返回结果](https://github.com/openai/codex/pull/64015) | 处理后台命令跨越当前轮次后，结果被遗漏或显示位置不一致的问题。 | 增强长任务与异步执行的可观测性。 |
| [#64014 显示会话查询的真实错误](https://github.com/openai/codex/pull/64014) | 不再将所有 `thread/read` 失败都解释为“会话不存在”。 | 帮助区分元数据读取失败与真正缺失，改善恢复、分叉排障。 |
| [#64067 修复 TUI 流式预览代码围栏跟踪](https://github.com/openai/codex/pull/64067) | 修正引用块与代码围栏交叉时的扫描状态，避免代码被误当作正文或表格。 | 提升流式 Markdown 展示准确性。 |
| [#64058 修复 Unicode 模糊匹配与斜杠弹窗激活](https://github.com/openai/codex/pull/64058) | 统一大小写匹配行为，并减少斜杠菜单因不可展示的模糊匹配而抢占按键。 | 改善国际化搜索和命令输入体验。 |
| [#64055 为 TUI 侧栏增加鼠标隐藏与恢复入口](https://github.com/openai/codex/pull/64055) | 提供可点击的侧栏收起、展开控件，并处理焦点切换。 | 解决侧栏隐藏后缺少明显恢复入口的问题。 |
| [#64026 修正无目标子代理等待状态](https://github.com/openai/codex/pull/64026) | 区分无目标等待，以及失败、中断等结果，避免统一显示为等待代理或等待完成。 | 提高多代理任务状态的准确性。 |

## 5. 功能需求趋势

1. **跨端、跨应用会话管理需要更明确的边界。**  
   用户不仅关注“能否同步”，也关注哪些会话应可见、是否发生非预期同步，以及切换执行环境后能否继续工作。参考：[#64043](https://github.com/openai/codex/issues/64043)、[#64034](https://github.com/openai/codex/issues/64034)、[#64061](https://github.com/openai/codex/issues/64061)。

2. **权限配置需要可解释、可验证。**  
   高频诉求是显示实际生效策略、解释配置优先级，并让长期授权覆盖匹配的排队请求，而不是简单要求扩大权限。参考：[#64039](https://github.com/openai/codex/issues/64039)、[#64027](https://github.com/openai/codex/issues/64027)、[#64040](https://github.com/openai/codex/issues/64040)。

3. **安全检查需要更好地区分授权开发场景。**  
   静态测试审查、崩溃调试、文档编写和学术研究均出现疑似误报反馈，说明拦截原因与场景识别值得重点观察。参考：[#63984](https://github.com/openai/codex/issues/63984)、[#64065](https://github.com/openai/codex/issues/64065)、[#64036](https://github.com/openai/codex/issues/64036)。

4. **自动化工作流需要减少交互阻塞。**  
   Computer Use 重复批准、浏览器 URL 验证失败，以及 TUI 占用线程，都会影响无人值守执行。参考：[#64037](https://github.com/openai/codex/issues/64037)、[#64041](https://github.com/openai/codex/issues/64041)、[#63991](https://github.com/openai/codex/issues/63991)。

5. **额度边界和使用量展示需要更清晰。**  
   社区出现配额不一致反馈，并有 Plus 用户明确要求分离 ChatGPT 推理与 Codex 使用额度；现有数据不足以确认实际计费规则变化。参考：[#64022](https://github.com/openai/codex/issues/64022)、[#63980](https://github.com/openai/codex/issues/63980)、[#63985](https://github.com/openai/codex/issues/63985)。

## 6. 开发者关注点

- **先保证“能启动、能新建、能发送”。** Windows 启动无响应和路由崩溃、macOS 新建会话不可发送，直接影响基础生产力。参考：[#64064](https://github.com/openai/codex/issues/64064)、[#64038](https://github.com/openai/codex/issues/64038)、[#64028](https://github.com/openai/codex/issues/64028)。
- **让界面状态与实际执行能力一致。** 完全访问标识、审批模式入口和真实沙箱策略需要一致，避免开发者反复试错。参考：[#64039](https://github.com/openai/codex/issues/64039)、[#64030](https://github.com/openai/codex/issues/64030)。
- **让工具结果可见、错误可诊断。** 文件已修改却没有编辑卡片、附件读取与下载能力不一致，都会削弱对执行结果的信任。参考：[#64051](https://github.com/openai/codex/issues/64051)、[#64062](https://github.com/openai/codex/issues/64062)。
- **减少合法任务被中途打断。** 安全限制、反复审批和线程占用应提供清楚的原因及恢复路径，同时保留必要的安全边界。参考：[#64035](https://github.com/openai/codex/issues/64035)、[#64037](https://github.com/openai/codex/issues/64037)、[#63991](https://github.com/openai/codex/issues/63991)。

**今日判断：**展示样本的主线是既有工作流的可靠性，而非新模型或 IDE 集成需求。短期最值得跟踪的是桌面端可用性、权限一致性，以及安全检查对正常开发任务的影响。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报｜2026-11-26

> 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)。本批数据包含 5 条 Issue、8 条 PR，以下全部覆盖，不补足至 10 条；部分记录的更新时间为 11 月 25 日，按所提供的数据范围纳入。

## 一、今日速览

发布稳定性与安全加固是本期重点：连续两日的 Nightly 发布失败均被标记为 P0，最新失败涉及 `v0.73.0-nightly.20261126.g60f8082b1`（[#30481](https://github.com/google-gemini/gemini-cli/issues/30481)、[#30472](https://github.com/google-gemini/gemini-cli/issues/30472)）。PR 侧集中出现 MCP 授权、OAuth 凭据、Web Fetch SSRF 和遥测配置边界的修复提案，但均尚未合并；用户反馈则主要涉及 Windows 系统配置、CRLF 差异展示和 Vertex AI 模型信息显示。

## 二、社区热点 Issues

本批 Issue 均处于 **OPEN** 状态，点赞数均为 0；评论量较少，当前关注度判断主要依据影响范围与优先级标签，而非讨论热度。

| Issue | 核心问题与重要性 | 社区反应 |
|---|---|---|
| **[ #30481：11 月 26 日 Nightly 发布失败](https://github.com/google-gemini/gemini-cli/issues/30481)** | `v0.73.0-nightly.20261126.g60f8082b1` 发布工作流失败，标记 **P0 / release-failure**，是当前最需关注的发布阻塞。摘要未提供失败根因。 | 机器人自动报告，0 评论；尚无恢复信息。 |
| **[ #30472：11 月 25 日 Nightly 发布失败](https://github.com/google-gemini/gemini-cli/issues/30472)** | 前一日 Nightly 同样失败，亦为 **P0**。与最新报告形成连续两日失败信号，但不能据此认定两者根因相同。 | 机器人自动报告，0 评论；仍未关闭。 |
| **[ #30474：Windows 系统设置被跳过](https://github.com/google-gemini/gemini-cli/issues/30474)** | 据报告，即使锁定配置文件及其目录权限，`C:\ProgramData\gemini-cli\settings.json` 仍因上级目录可写而被跳过，影响 Windows 集中配置落地。 | 1 条评论，待分诊；已有相关修复提案 [#30479](https://github.com/google-gemini/gemini-cli/pull/30479)。 |
| **[ #30480：CRLF 文件的 diff 显示全部行变化](https://github.com/google-gemini/gemini-cli/issues/30480)** | `write_file` 的磁盘换行保留、模型所见片段已获修复，但展示层仍可能产生全文件差异，增加代码审查噪声。 | 1 条评论，待分诊；报告明确指出此前修复已有效，剩余问题集中在显示侧。 |
| **[ #30482：页脚遗漏自定义模型信息](https://github.com/google-gemini/gemini-cli/issues/30482)** | 用户在 0.70.0 中使用 Vertex AI 完整模型资源名及自定义 `displayName`，即便 `hideModelInfo=false`，页脚仍未正确显示模型，削弱多模型使用时的可辨识性。 | 2 条评论，为本批 Issue 中最多；仍待分诊。 |

## 三、重要 PR 进展

**状态概览：7 条 OPEN、1 条 CLOSED。** 数据未提供有效的 PR 评论数，因此不据此判断讨论热度；以下修复效果均为提案描述，不代表已发布能力。

### 安全与信任边界

- **[ #30478：将 MCP 工具批准绑定到工具定义](https://github.com/google-gemini/gemini-cli/pull/30478)**  
  针对“始终允许”仅按名称记忆的问题，提议让批准与工具定义绑定，避免服务器更新工具定义后旧授权静默覆盖新行为。**OPEN**，带 `status/need-issue` 标签。

- **[ #30477：修复 Web Fetch 的 DNS 与重定向 SSRF 风险](https://github.com/google-gemini/gemini-cli/pull/30477)**  
  提议阻止初始 URL 通过检查后，再经重定向或配置代理访问回环、链路本地及私网地址。**OPEN**，为此前 #27739 的重启提案。

- **[ #30476：阻止工作区设置重定向遥测导出](https://github.com/google-gemini/gemini-cli/pull/30476)**  
  针对受信任工作区的 `.gemini/settings.json` 可覆盖用户遥测端点、输出文件等配置的行为，收紧配置权限边界。**OPEN / P2**，带维护者专属标签。

- **[ #30475：将 MCP OAuth 令牌绑定到服务器 URL](https://github.com/google-gemini/gemini-cli/pull/30475)**  
  提议在 MCP 服务器改指向不同源时，不再复用已有令牌，而是要求重新认证，降低凭据被发送到错误目标的风险。**OPEN**，关联 #30391。

### 平台兼容性与核心行为

- **[ #30479：尝试修复 Windows 系统设置加载问题](https://github.com/google-gemini/gemini-cli/pull/30479)**  
  标题指向 Issue #30474，优先级为 **P1**、规模为 **XL**。**OPEN**；正文仍为模板，缺少具体设计和验证说明，暂无法判断修复是否充分。

- **[ #30473：修正检索历史的字节预算计算](https://github.com/google-gemini/gemini-cli/pull/30473)**  
  提议按实际保留的数据大小计算旧检索轮次，排除已逐出的二进制载荷及嵌套内容，避免预算被高估。**OPEN**，关联 #30446。

### 模型支持与 CI 验证

- **[ #30470：新增 `gemini-2.5-flash-image` 模型配置](https://github.com/google-gemini/gemini-cli/pull/30470)**  
  提议加入内置模型别名，支持通过 `--model` 和 `/model` 选择，并配置文本、图像响应模态。**OPEN / P2**；尚不能视为正式可用。

- **[ #30469：CI 权限边界探针](https://github.com/google-gemini/gemini-cli/pull/30469)**  
  通过 `postinstall` 日志及评估文件，验证 fork PR 的受控代码不会在高权限环境中执行。状态为 **CLOSED**，数据未说明是否合并，不能据此认定验证通过。

## 四、功能需求趋势

本批 Issues 以缺陷反馈为主，尚不足以形成大规模需求热度排名，但呈现出三个明确方向：

1. **发布可靠性优先于功能扩张**  
   两条 P0 Nightly 失败报告表明，预览版本的持续交付是当前紧迫问题。后续应关注根因、恢复状态及是否影响下一轮发布。  
   关联：[ #30481](https://github.com/google-gemini/gemini-cli/issues/30481)、[ #30472](https://github.com/google-gemini/gemini-cli/issues/30472)

2. **Windows 原生体验需要端到端一致性**  
   系统配置加载与 CRLF diff 分别暴露了权限策略兼容性、编辑展示一致性问题；仅保证文件正确写入，还不足以消除开发者使用摩擦。  
   关联：[ #30474](https://github.com/google-gemini/gemini-cli/issues/30474)、[ #30480](https://github.com/google-gemini/gemini-cli/issues/30480)

3. **多模型场景需要更清晰的状态展示**  
   Vertex AI 完整资源名、自定义模型定义和短名称展示之间仍存在衔接问题。PR 侧的图像模型配置提案也显示模型选择范围在继续扩展，但它属于贡献方向，并非本批 Issues 中的高频诉求。  
   关联：[ #30482](https://github.com/google-gemini/gemini-cli/issues/30482)、[ #30470](https://github.com/google-gemini/gemini-cli/pull/30470)

## 五、开发者关注点

- **配置“已设置却未生效”，需要可解释性。** 系统配置被安全检查跳过、页脚设置未按预期展示，都会增加排障成本；应重点关注加载来源、跳过原因与实际生效值的可见性。  
  [Windows 配置问题](https://github.com/google-gemini/gemini-cli/issues/30474) · [模型页脚问题](https://github.com/google-gemini/gemini-cli/issues/30482)

- **差异展示必须可信。** CRLF 导致全行变化会掩盖真正修改，降低开发者审阅 AI 文件写入结果的效率。  
  [CRLF diff 问题](https://github.com/google-gemini/gemini-cli/issues/30480)

- **长期授权与凭据复用必须有明确边界。** 工具名称相同不代表定义未变，服务器名称相同也不代表目标地址未变；相关 PR 值得 MCP 使用者持续跟踪。  
  [工具批准绑定](https://github.com/google-gemini/gemini-cli/pull/30478) · [OAuth 令牌绑定](https://github.com/google-gemini/gemini-cli/pull/30475)

- **安全修复尚在评审阶段，不应提前视为风险已消除。** Web Fetch 与遥测配置提案均未合并，后续关键节点是评审结论、测试覆盖及进入正式版本的时间。  
  [SSRF 修复](https://github.com/google-gemini/gemini-cli/pull/30477) · [遥测边界修复](https://github.com/google-gemini/gemini-cli/pull/30476)

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-26**  
**仓库：[github/copilot-cli](https://github.com/github/copilot-cli)**

> 本日报基于所提供的过去 24 小时数据：5 条 Release、12 条更新的 Issue、0 条更新的 PR。部分发布说明存在截断，仅总结可确认内容；Issue 中的问题均为用户报告，尚不代表官方确认。

## 1. 今日速览

Copilot CLI 发布更新集中在 **扩展与工具权限、模型选择透明度、会话恢复和 ACP 交互**，其中仓库指定的模型提供商不可用时，将报错而非静默切换。社区反馈则主要涉及远程会话稳定性、企业账号更新失败、非交互模式退出码异常，以及插件和自定义模型兼容性。当前讨论仍处于早期：12 个 Issue 均为 OPEN、标记为 triage，仅 2 个各有 1 条评论，尚未形成高互动热点。

## 2. 版本发布

| 版本 | 已确认的主要更新 | 开发者影响 |
|---|---|---|
| [v1.0.117-2](https://github.com/github/copilot-cli/releases/tag/v1.0.117-2) | 修正 `copilot help extensions`：`-p` 模式下，扩展仅在启动已获批准时运行，例如通过 `--allow-all-tools`、`--yolo` 或此前保存的批准；修复内置搜索处理部分参数时失败的问题 | 明确自动化场景中的扩展授权边界，改善搜索健壮性 |
| [v1.0.117-1](https://github.com/github/copilot-cli/releases/tag/v1.0.117-1) | `/model` 选择器显示服务通知，并标记即将退役的模型；仓库绑定的模型提供商不可用时，显示错误而非静默切换 | 提升模型生命周期与提供商选择的可见性，减少意外回退 |
| [v1.0.117-0](https://github.com/github/copilot-cli/releases/tag/v1.0.117-0) | 新增显式工具暴露机制，允许自定义 Agent 选择接入工具；修复登录尚未完成时恢复会话无法加载已连接 Copilot Connectors 的问题；后台 Agent 可在 CLI 重启并恢复会话后继续对话 | 强化 Agent 工具配置与会话连续性 |
| [v1.0.116](https://github.com/github/copilot-cli/releases/tag/v1.0.116) | 为扩展清单增加构建时 JSON Schema；全屏时间线支持点击 “Jump to latest” 回到最新输出并继续跟随；ACP 兼容编辑器可为支持的模型选择上下文大小，而不修改已保存的默认配置 | 改善扩展开发校验、长会话浏览和编辑器集成体验 |
| [v1.0.116-5](https://github.com/github/copilot-cli/releases/tag/v1.0.116-5) | 修正 `parallel-work` 帮助文本，不再声称批准计划后可选择通过 `/fleet` 继续进入 Autopilot；ACP Shell 授权提示显示实际命令，而非命令描述 | 让帮助说明与实际行为一致，提高命令审批透明度 |

**注意：**上述更新不能直接视为下列社区问题已获修复，仍需对应 Issue 或完整发布记录确认。

## 3. 社区热点 Issues

以下按潜在影响与技术代表性选出 10 项，**并非按互动热度排名**。

| Issue | 核心问题与重要性 | 社区反应 |
|---|---|---|
| [#5577 远程会话切换挂起](https://github.com/github/copilot-cli/issues/5577) | 用户报告 v1.0.115 从本地切换至远端 CLI 会话后无响应，伴随持续内存增长及认证变更日志风暴。涉及远程开发可用性与资源耗尽风险，但摘要注明未附原始日志或协议内容，仍需补充证据。 | 1 条评论，0 👍；待分诊 |
| [#5571 GHE.com 账号自动更新失败](https://github.com/github/copilot-cli/issues/5571) | Windows/PowerShell 下，仅登录 `*.ghe.com` 企业账号时，多个 1.0.115 系列版本报错 “GitHub credential owner did not provide a token”。可能阻碍企业用户获取更新；现有摘要中的绕过方案不完整。 | 1 条评论，0 👍；待分诊 |
| [#5574 `-p` 任务成功却以错误码退出](https://github.com/github/copilot-cli/issues/5574) | 用户称自 1.0.115 起，Agent 完成任务但未输出结论时，CLI 仍报错退出。直接影响脚本和 CI 对执行结果的判断，是自动化用户应优先验证的回归报告。 | 0 条评论，0 👍；待分诊 |
| [#5581 Fusion 未路由到本地 vLLM](https://github.com/github/copilot-cli/issues/5581) | `providers.json` 配置的本地 OpenAI 兼容模型可直接选择，但用户报告 Fusion Standard 始终使用云端模型。关系到本地推理接入、成本控制和路由行为的可预期性。 | 0 条评论，0 👍；待分诊 |
| [#5579 自定义工具搜索覆盖被绕过](https://github.com/github/copilot-cli/issues/5579) | SDK Host 注册 `overridesBuiltInTool: true` 后，`generic-client` 工具搜索路径仍使用内置全文搜索。可能导致外部检索实现与实际执行不一致，影响 SDK 集成可靠性。 | 0 条评论，0 👍；待分诊 |
| [#5582 官方 Claude 插件市场安装失败](https://github.com/github/copilot-cli/issues/5582) | 安装 `anthropics/claude-plugins-official` 时，某一插件的 source 校验失败导致市场安装受阻。报告者建议对不支持的条目告警并跳过，反映跨生态兼容与错误隔离需求。 | 0 条评论，0 👍；待分诊 |
| [#5578 插件 Skill 带参数时无法调用](https://github.com/github/copilot-cli/issues/5578) | 裸命令 `/<skill>` 不带参数可用，带参数则提示 Unknown command；完整形式 `/<plugin>:<skill> <args>` 可用。影响插件命令一致性，也提供了可尝试的临时绕过方式。 | 0 条评论，0 👍；待分诊 |
| [#5580 Windows 沙箱阻断已放行 TCP 连接](https://github.com/github/copilot-cli/issues/5580) | 用户在 v1.0.109 中报告：已开启网络并放行内部 Nexus 的域名与 IP，直接 TCP 连接仍被拒绝。涉及企业内网访问和沙箱策略诊断，尚不能认定为最新版本问题。 | 0 条评论，0 👍；待分诊 |
| [#5575 托管策略预批准并强制加载扩展](https://github.com/github/copilot-cli/issues/5575) | 组织可要求安装插件，但无法让插件内扩展无需交互启动。报告者需要通过扩展的 SDK hooks 阻断不合规提示，体现企业对强制执行治理策略的需求。 | 0 条评论，0 👍；待分诊 |
| [#5572 语音输入将带口音英语转写为其他语言](https://github.com/github/copilot-cli/issues/5572) | 用户报告多语言语音模型偶尔误判语言，必须逐条检查转写结果。影响语音输入可信度，并增加发送错误提示的风险。 | 0 条评论，0 👍；待分诊 |

## 4. 重要 PR 进展

**所提供的过去 24 小时数据中，没有更新的 PR，因此无法列出 10 个重要 PR。**版本发布已发生，但数据未提供对应 PR，不能据此推断其实现过程、审查状态或合并记录。

- [查看仓库 Pull Requests](https://github.com/github/copilot-cli/pulls)

## 5. 功能需求趋势

以下为对全部 12 个 Issue 的主题归纳，不代表经过投票验证的社区共识。

- **插件与工具扩展的可靠性、治理能力**：市场校验容错、Skill 参数解析、工具覆盖一致性，以及组织强制加载扩展，构成最密集的一组反馈。  
  相关：[ #5582](https://github.com/github/copilot-cli/issues/5582)、[#5578](https://github.com/github/copilot-cli/issues/5578)、[#5579](https://github.com/github/copilot-cli/issues/5579)、[#5575](https://github.com/github/copilot-cli/issues/5575)。

- **企业环境兼容与可诊断性**：企业身份凭证、Windows 沙箱网络策略都可能成为部署阻塞点，用户需要更明确的失败原因与配置反馈。  
  相关：[#5571](https://github.com/github/copilot-cli/issues/5571)、[#5580](https://github.com/github/copilot-cli/issues/5580)。

- **会话与自动化执行稳定性**：远程切换应保持响应，非交互模式的退出状态应准确表达任务结果。  
  相关：[#5577](https://github.com/github/copilot-cli/issues/5577)、[#5574](https://github.com/github/copilot-cli/issues/5574)。

- **本地模型与路由可控性**：不仅需要支持直接调用自定义提供商，也需要明确其是否、以及如何参与 Fusion 路由。  
  相关：[#5581](https://github.com/github/copilot-cli/issues/5581)。

- **输入体验的连续性与可控性**：用户希望历史导航可限定当前会话，语音输入覆盖澄清对话框，并降低语言误识别。  
  相关：[#5576](https://github.com/github/copilot-cli/issues/5576)、[#5573](https://github.com/github/copilot-cli/issues/5573)、[#5572](https://github.com/github/copilot-cli/issues/5572)。

## 6. 开发者关注点

1. **升级前验证自动化退出语义。** 使用 `-p` 的项目应检查“任务完成但没有最终文本输出”的情况，避免将成功任务误判为失败。相关：[#5574](https://github.com/github/copilot-cli/issues/5574)。
2. **区分“配置成功”与“实际执行生效”。** 本地模型可直接调用，并不证明 Fusion 会选用；注册工具覆盖，也需验证实际搜索路径。相关：[#5581](https://github.com/github/copilot-cli/issues/5581)、[#5579](https://github.com/github/copilot-cli/issues/5579)。
3. **企业部署需要更清晰的授权边界。** 扩展启动批准、托管策略和沙箱网络放行是不同层面的控制，不宜将其中一项视为其余权限已生效。相关：[v1.0.117-2](https://github.com/github/copilot-cli/releases/tag/v1.0.117-2)、[#5575](https://github.com/github/copilot-cli/issues/5575)、[#5580](https://github.com/github/copilot-cli/issues/5580)。
4. **插件集成需准备降级路径。** Skill 调用异常时可尝试插件前缀形式；市场安装的单条目失败则暴露了容错机制的改进空间。相关：[#5578](https://github.com/github/copilot-cli/issues/5578)、[#5582](https://github.com/github/copilot-cli/issues/5582)。
5. **稳定性报告需要可复现证据。** 远程会话问题潜在影响严重，但缺少原始日志；补充复现步骤、资源变化与脱敏日志，将更有利于定位。相关：[#5577](https://github.com/github/copilot-cli/issues/5577)。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-11-26

## 1. 今日速览

OpenCode 发布 **v2.4.2**，重点包括 GPT-6.2 专用系统提示词及 OpenCode Go 接入流程调整。社区讨论集中在 **Agent 执行安全、会话迁移与中断可靠性**：Windows 误删磁盘根目录的报告和 v1→v2 会话迁移问题均有 7 条评论，是展示样本中讨论最多的议题。PR 侧则围绕后台任务生命周期、远程工作区隔离、Code Mode 展示与桌面端体验持续推进。

> **数据说明**：本报依据提供的 GitHub 快照，覆盖所展示的 30 条 Issue、20 条 PR。PR 评论数字段缺失，不据此判断热度；**Closed 不等于已修复或已合并**，涉及事故、隐私与权限的描述均按用户报告呈现。

## 2. 版本发布

### [v2.4.2](https://github.com/anomalyco/opencode/releases/tag/v2.4.2)

- **GPT-6.2 专用系统提示词**：GPT-6.2 Sol、Astra 及 `gpt-latest` 别名使用针对 GPT-6.2 编写的系统提示词，属于模型适配更新，不代表新增模型能力。[PR #66297](https://github.com/anomalyco/opencode/pull/66297)
- **OpenCode Go 接入流程修复**：摘要提及连接 OpenCode 后的模型选择器列表调整，但原始发布说明被截断，具体排序及完整行为暂无法确认。[发布说明](https://github.com/anomalyco/opencode/releases/tag/v2.4.2)

## 3. 社区热点 Issues

以下按影响与风险筛选，不仅依据评论数排序。

| Issue | 核心问题与重要性 | 社区反应及状态 |
|---|---|---|
| **[Windows 命令误删磁盘根目录 #66449](https://github.com/anomalyco/opencode/issues/66449)** | 报告称，模型生成的删除命令在跨 Shell 引号处理时出现路径解释偏差，导致整个 D: 根目录被递归删除，损失约 27 万个文件。凸显破坏性命令审核与路径校验的重要性。 | **7 条评论，Closed**；为样本中最高讨论量之一，现有数据不能确认关闭原因或修复情况。 |
| **[v1→v2 会话迁移阻塞 OpenAI Chat #66389](https://github.com/anomalyco/opencode/issues/66389)** | 报告称 v2.3.2 将客户端执行工具标记为 `executed: true` 后，相关历史会话在下一轮、调用提供商之前即失败。直接影响升级后的历史会话连续性。 | **7 条评论，Closed**；与数据安全报告并列讨论最多，需继续核实迁移修复及恢复方案。 |
| **[Plan 模式可通过 Shell 修改文件 #66518](https://github.com/anomalyco/opencode/issues/66518)** | 用户称 `edit`/`write` 被限制时，Agent 仍能通过 Shell 修改仓库文件。关系到 Plan 模式是否具备可靠的执行边界。 | **2 条评论，Closed**；未提供修复或设计解释，不能视为风险已消除。 |
| **[SDK 中断无法跨重启确认取消 #66404](https://github.com/anomalyco/opencode/issues/66404)** | 嵌入式宿主确认中断后，重置仍可能恢复同一轮执行。对将 SDK 接入自动化平台的开发者而言，“取消成功”的语义至关重要。 | **3 条评论，Open**；报告提供了基于脚本模型与无害写文件工具的复现场景。 |
| **[父会话中断后子 Agent 继续执行 #66398](https://github.com/anomalyco/opencode/issues/66398)** | 报告称后台子任务不随父会话停止，且服务重启后会自动恢复，可能造成持续执行与额外资源消耗。 | **2 条评论，Open**；与 SDK 中断问题共同指向任务生命周期管理。 |
| **[标题生成使用另一账号对应模型 #66400](https://github.com/anomalyco/opencode/issues/66400)** | 用户称首条消息被后台标题请求发送至通过另一账号认证的模型。关键在于辅助请求的模型路由、账号边界及透明度；其所述封号与请求之间的因果关系尚未证实。 | **2 条评论，Open**；虽标为功能需求，但包含隐私与账号治理层面的反馈。 |
| **[异常媒体内容使会话持续失败 #66522](https://github.com/anomalyco/opencode/issues/66522)** | 缺失内联数据的媒体内容触发异常，后续请求持续失败且尚未到达提供商。暴露输入校验与损坏会话恢复能力的不足。 | **1 条评论，Open**；讨论量较低，但对插件和多模态集成影响直接。 |
| **[Google Vertex 的 AWS WIF 认证失败 #66427](https://github.com/anomalyco/opencode/issues/66427)** | 报告将跨云身份联合认证失败定位至固定依赖 `google-auth-library 10.5.0`，影响 AWS 环境接入 Vertex。 | **2 条评论，Open**；已有升级至 10.6.1 的对应 PR，仍待合入。 |
| **[已删除项目目录卡住项目选择器 #66442](https://github.com/anomalyco/opencode/issues/66442)** | 目录删除后项目仍留在列表，打开时无限加载，服务端错误未反馈至客户端，还可能阻塞 reload。 | **2 条评论，Open，标记 reproduced**；复现状态使其成为较明确的桌面端稳定性问题。 |
| **[Go 模型加载 Skill 后重复输出约 1.2 MB #66433](https://github.com/anomalyco/opencode/issues/66433)** | `opencode-go/hungerg-free` 被报告在加载 Skill 后陷入特殊标记重复循环，影响审计任务可用性，也提示需要异常输出终止机制。 | **2 条评论，Open**；目前无法据此判断问题位于模型、模板还是客户端处理链路。 |

## 4. 重要 PR 进展

**以下 10 项在快照中均为 Open，尚不能视为已交付功能。**

| PR | 功能或修复内容 | 开发者价值与进展 |
|---|---|---|
| **[GUI 主题对比度校准 #66521](https://github.com/anomalyco/opencode/pull/66521)** | 调整 35 个非默认主题、共 70 个明暗变体，围绕 WCAG 2.2 对比度、层级与感知色彩统一性校准；默认主题不变。 | 提升可读性与无障碍体验；实际达标情况仍需验证。 |
| **[Ctrl+J 切换终端面板 #66517](https://github.com/anomalyco/opencode/pull/66517)** | 为 `terminal.toggle` 增加 Ctrl+J 别名，同时保留输入换行绑定。 | 回应 #66423；需关注快捷键重叠时的上下文行为，带 `needs:compliance` 标签。 |
| **[修复 AWS WIF 认证依赖 #66516](https://github.com/anomalyco/opencode/pull/66516)** | 将 `google-auth-library` 从 10.5.0 固定升级至 10.6.1。 | 直接对应 #66427 的 Vertex 跨云认证问题，带 `needs:compliance` 标签。 |
| **[补齐实验开关接口的 E2E Mock #66514](https://github.com/anomalyco/opencode/pull/66514)** | 为测试服务器补充 `/api/experimental/flag`，处理摘要所述的大量 E2E 失败及 Windows 重试超时。 | 恢复测试反馈可信度，是后续 UI 迭代的重要基础；带 `needs:compliance` 标签。 |
| **[Code Mode 扁平布局与脚本差异展示 #66509](https://github.com/anomalyco/opencode/pull/66509)** | 在 `full_codemode` 服务端开关后提供新的 `execute` 区块布局与脚本差异展示。 | 提升执行过程的可读性，属于受开关控制的功能演进。 |
| **[CLI 管理会话归档状态 #66503](https://github.com/anomalyco/opencode/pull/66503)** | 增加 CLI 会话归档管理能力，减少清理脚本直接调用原始 API 的需要。 | 改善批量维护及自动化工作流。 |
| **[约束后台 Fiber 生命周期 #66502](https://github.com/anomalyco/opencode/pull/66502)** | 将 Shell、Watcher、PersistentPty 的后台 Fiber 放入有作用域的运行时，使其随 teardown 停止；同步推导插件服务依赖。 | 强化资源回收与内部一致性；**不能据此认定已解决全部会话中断问题**。 |
| **[按 Environment 隔离本地磁盘操作 #66498](https://github.com/anomalyco/opencode/pull/66498)** | 对 Snapshot、VCS、Worktree、Project 的宿主磁盘与 Git 操作增加环境约束。 | 防止远程工作区探测宿主磁盘，增强远程执行边界；无用户侧 API 变更。 |
| **[桌面端退出行为提示与停止设置 #66499](https://github.com/anomalyco/opencode/pull/66499)** | 首次退出时提示后台服务仍在运行，并增加退出时停止服务的设置。 | 缩小“关闭窗口”和“停止 Agent、终端及 MCP 服务”之间的认知差距。 |
| **[CSV 预览支持 CR 换行 #66511](https://github.com/anomalyco/opencode/pull/66511)** | 修复表格预览将仅使用 CR 换行的 CSV 记录拼接的问题。 | 对应 #66510，改善不同来源数据文件的兼容性。 |

## 5. 功能需求趋势

- **项目与会话管理更精细**：恢复 Projects 侧栏、增加项目右键菜单，以及按日期、项目或全局批量删除会话，反映用户开始重视长期使用后的管理成本。[#66491](https://github.com/anomalyco/opencode/issues/66491) · [#66468](https://github.com/anomalyco/opencode/issues/66468)
- **终端操作与执行状态更直观**：Ctrl+J 快捷键、用户 Shell 命令的工作状态标识，体现对高频键盘操作和准确状态反馈的需求。[#66423](https://github.com/anomalyco/opencode/issues/66423) · [#66493](https://github.com/anomalyco/opencode/issues/66493)
- **问答界面减少遮挡、增强可辨识性**：用户希望问题弹窗更紧凑，并让 TUI 选中项遵循主题背景，而不只依赖文字颜色。[#66484](https://github.com/anomalyco/opencode/issues/66484) · [#66488](https://github.com/anomalyco/opencode/issues/66488)
- **取消操作与权限边界可验证**：开发者不仅需要“中断按钮”，还需要确认子任务不会继续运行、重启不会恢复，以及系统权限与实际网络行为一致。[#66404](https://github.com/anomalyco/opencode/issues/66404) · [#66398](https://github.com/anomalyco/opencode/issues/66398) · [#66443](https://github.com/anomalyco/opencode/issues/66443)
- **复杂部署环境兼容性**：跨云身份联合认证、带路径前缀的移动端连接成为具体诉求，说明使用场景正在超出本机默认部署。[#66427](https://github.com/anomalyco/opencode/issues/66427) · [#66520](https://github.com/anomalyco/opencode/issues/66520)

## 6. 开发者关注点

1. **执行安全不能只依赖专用工具限制。** Windows 路径解析与 Plan 模式 Shell 绕过报告提示，应同时关注实际工作目录、最终执行目标及 Shell 通道的写入能力。[#66449](https://github.com/anomalyco/opencode/issues/66449) · [#66518](https://github.com/anomalyco/opencode/issues/66518)
2. **持久化状态可能让故障延续。** 迁移后的工具记录、异常媒体内容及分叉会话中的模型限制，都被报告会持续影响后续请求；输入验证之外，还需要可操作的会话修复路径。[#66389](https://github.com/anomalyco/opencode/issues/66389) · [#66522](https://github.com/anomalyco/opencode/issues/66522) · [#66448](https://github.com/anomalyco/opencode/issues/66448)
3. **“停止”需要覆盖完整任务树。** 父会话、子 Agent、后台服务和重启恢复之间的语义应保持一致，SDK 集成方尤其需要明确的取消确认机制。[#66404](https://github.com/anomalyco/opencode/issues/66404) · [#66398](https://github.com/anomalyco/opencode/issues/66398)
4. **内容不可见与无限加载损害故障可诊断性。** 会话移动后的空白消息、Web Markdown 裁切及项目选择器卡住，使用户难以区分渲染异常、数据异常和任务仍在执行。[#66455](https://github.com/anomalyco/opencode/issues/66455) · [#66508](https://github.com/anomalyco/opencode/issues/66508) · [#66442](https://github.com/anomalyco/opencode/issues/66442)
5. **后台请求应有清晰的模型与账号归属。** 标题生成等辅助功能也可能携带用户内容，模型路由、认证来源及可配置性值得单独审视。[#66400](https://github.com/anomalyco/opencode/issues/66400)

**今日判断：** 在可见样本中，社区关注重点已不只是“增加功能”，而是让 Agent 的执行、停止、数据流向与故障恢复更可预测。短期最值得跟踪的是高风险报告的处理说明，以及上述开放 PR 的验证与合入结果。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-26

## 1. 今日速览

Pi 发布 **v1.6.1**，在 codemode 的 `models.classify()` 中加入 GitHub Copilot 与 Radius 决策模型支持。社区讨论主要围绕终端稳定性、SDK 会话生命周期和工具执行可靠性；PR 侧则出现会话永久删除、统一图像生成协议及隐私控制等值得跟踪的方向。

> **数据口径**：过去 24 小时共有 31 条 Issue、21 条 PR 更新，本日报依据提供的 30 条 Issue 和 20 条 PR 摘要筛选。所展示 Issue 均为 CLOSED，但**关闭不等于已修复**；PR 的 CLOSED 也不代表已合并。PR 评论数缺失，不据此判断热度。

## 2. 版本发布

### [v1.6.1：codemode 支持决策模型](https://github.com/earendil-works/pi/releases/tag/v1.6.1)

- **新增模型调用能力**：可通过 codemode 的 `models.classify()` 调用 GitHub Copilot 的 `gpt-6-luna-decisions` 和 Radius 决策模型。
- **补充响应元数据**：结果包含提供商的 `responseId`，便于关联、追踪调用。
- **开发价值**：为分类、路由等结构化决策任务提供更多模型选择。

*提供的 Release 说明已截断，以上仅概括可确认内容，不代表完整更新清单。*

## 3. 社区热点 Issues

以下兼顾讨论量、潜在影响及开发者使用场景，均已关闭，具体处理结果需查看原帖。

| Issue | 关注内容与重要性 | 社区反应 |
|---|---|---|
| [#12548 图片消失与终端回滚历史被清空](https://github.com/earendil-works/pi/issues/12548) | 连续输出图片时，部分图片消失，回退重绘还可能清空 Konsole 回滚历史，影响多模态结果查看与操作追溯。 | **4 条评论**，为所展示 Issue 中讨论最多的一项。 |
| [#12564 Windows 异常退出后键盘协议未恢复](https://github.com/earendil-works/pi/issues/12564) | 用户称 Pi 中途退出后，Kitty 键盘报告仍开启，导致 PowerShell 提示符不可用；普通模式也受影响。 | **2 条评论**；是此前问题的后续报告，称 1.6.0 仍可复现。 |
| [#12546 已释放 SDK 会话仍被强引用](https://github.com/earendil-works/pi/issues/12546) | `dispose()` / `invalidate()` 后闭包仍持有会话，报告称长驻多会话进程可能持续占用内存直至 OOM。对 SDK 服务化集成尤其重要。 | **2 条评论**；摘要给出了引用保留机制的具体线索。 |
| [#12526 进度订阅异常导致运行提前结束](https://github.com/earendil-works/pi/issues/12526) | `session.subscribe()` 回调抛错后，工具仍运行，但 `prompt()` 已返回且会话被标记为空闲，可能破坏任务调度与取消逻辑。 | **2 条评论**；反馈聚焦 SDK 状态一致性。 |
| [#12527 跨硬链接和目录别名串行化文件修改](https://github.com/earendil-works/pi/issues/12527) | 请求让 `edit`、`write` 对同一实际文件共享修改队列，避免路径不同却指向同一文件时发生写入竞争。 | **2 条评论**；体现并发工具调用对文件安全的要求。 |
| [#12512 durable 支持暂停派发并排空任务](https://github.com/earendil-works/pi/issues/12512) | 希望关闭前停止派发新任务，让运行中的步骤完成并提交，适用于部署、重启和优雅停机。 | **2 条评论**；属于长驻任务基础设施需求。 |
| [#12561 Bash 工具缺少默认超时](https://github.com/earendil-works/pi/issues/12561) | 报告中的命令持续运行 **2 小时 6 分 18 秒**仍未超时，暴露自动化任务被挂起的风险。 | **1 条评论**，带 `bug` 标签；诉求是默认超时与错误返回。 |
| [#12516 Bash 日志自我匹配导致临时空间耗尽](https://github.com/earendil-works/pi/issues/12516) | 搜索命令可能读入自身活动日志，形成输出放大；报告称日志增长至 **24.4 GiB**，最终触发 ENOSPC。 | **1 条评论**；影响磁盘资源和进程稳定性，但摘要未确定上游源码位置。 |
| [#12547 重载改变工具顺序导致提示词缓存失效](https://github.com/earendil-works/pi/issues/12547) | `/reload` 或恢复会话后，系统提示词中的工具列表顺序变化，可能造成 Anthropic 缓存未命中及历史思考块丢弃。 | **1 条评论**；直接关联请求成本、延迟和上下文连续性。 |
| [#12565 压缩后保留完整交互记录](https://github.com/earendil-works/pi/issues/12565) | 提议增加 `transcriptHistory`，将界面历史展示与模型上下文分开，使压缩前消息仍可查看。 | **1 条评论**；反映长会话用户对可追溯性的需求。 |

## 4. 重要 PR 进展

以下描述为 PR 的目标或改动内容，**不将关闭状态视为已合并或已发布**。

| PR / 状态 | 功能或修复内容 | 开发者意义 |
|---|---|---|
| [#12562 永久删除 durable 会话](https://github.com/earendil-works/pi/pull/12562) · **OPEN** | 新增 `Harness.deleteConversations(ids, context)`，终止会话及后台工作，并递归删除任务拥有的子会话。 | 涉及任务生命周期与数据清理；标题带 `!`，需关注兼容性说明。 |
| [#12556 遵守 `DO_NOT_TRACK`](https://github.com/earendil-works/pi/pull/12556) · **OPEN，讨论草案** | 为安装遥测和归因行为加入 `DO_NOT_TRACK` 支持。 | 为隐私敏感环境提供跨工具一致的退出机制。 |
| [#12535 新增 `pi-image` API](https://github.com/earendil-works/pi/pull/12535) · **OPEN** | 提出与 `pi-messages`、`pi-decision` 类似的统一图像生成协议。 | 有望降低多图像提供商接入时的接口差异。 |
| [#12557 通过 OSC 7577 报告恢复命令](https://github.com/earendil-works/pi/pull/12557) · **CLOSED** | 实现 Program Resume Protocol 的程序侧支持，供设置 `OSC7577_TOKEN` 的终端使用。 | 让支持该协议的终端重启后能够恢复 Pi 会话。 |
| [#12553 Windows Ctrl+Break 优雅退出](https://github.com/earendil-works/pi/pull/12553) · **CLOSED** | 处理 `SIGBREAK`，避免直接终止而跳过清理及诊断流程。 | 减少终端停留在异常屏幕、鼠标或键盘模式的风险。 |
| [#12539 Copilot 在推理强度和工具变化时保留缓存](https://github.com/earendil-works/pi/pull/12539) · **CLOSED** | 调整请求构造方式，利用 Copilot 支持的缓存保留形式。 | 面向频繁调整 thinking level、工具集的工作流，改善缓存复用。 |
| [#12555 避免向 Bedrock Kimi K3 发送早先推理](https://github.com/earendil-works/pi/pull/12555) · **CLOSED** | 针对 Kimi K3 / K3.1 的 Converse 已知限制，停止发送此前轮次的推理内容。 | 改善特定模型的多轮请求兼容性。 |
| [#12551 Bedrock 推理强度映射](https://github.com/earendil-works/pi/pull/12551) · **CLOSED** | 为使用扁平 `reasoning_effort` 的模型传递 models.dev 中的推理强度配置。 | 避免 Kimi K3.1 等模型使用不准确的通用档位或参数映射。 |
| [#12538 慢搜索下保持 `@` 文件补全响应](https://github.com/earendil-works/pi/pull/12538) · **CLOSED** | 递归搜索耗时过长时显示直接匹配，并在接受建议时替换当前完整 token。 | 针对大型目录中的过期建议、补全后残留字符问题。 |
| [#12523 所有运行模式报告 `models.json` 错误](https://github.com/earendil-works/pi/pull/12523) · **CLOSED** | 将配置错误纳入 print、JSON、RPC 模式的运行诊断。 | 避免真实配置错误被误报为“Model not found”，改善脚本排障。 |

## 5. 功能需求趋势

### ① 长会话与任务生命周期管理
需求从“能运行”转向“可安全关闭、可追溯”：包括 durable 暂停/排空、压缩后历史展示，以及压缩切分时保留足够原始请求上下文。  
关联：[暂停与排空 #12512](https://github.com/earendil-works/pi/issues/12512)、[历史展示 #12565](https://github.com/earendil-works/pi/issues/12565)、[压缩轮次边界 #12514](https://github.com/earendil-works/pi/issues/12514)。

### ② 更广的模型、图像与外部代理接入
社区不仅希望增加模型提供商，也在推动图像 API 和跨 CLI 任务委派，反映 Pi 作为多模型工作入口的需求。  
关联：[OpenAI Images #12545](https://github.com/earendil-works/pi/issues/12545)、[百度 ERNIE #12524](https://github.com/earendil-works/pi/issues/12524)、[委派 Codex CLI #12542](https://github.com/earendil-works/pi/issues/12542)。

### ③ 配置与扩展体验
诉求涵盖配置格式、Schema 支持及自定义提示词行为的一致性，重点是降低配置错误和隐式行为。  
关联：[MCP JSON Schema #12563](https://github.com/earendil-works/pi/issues/12563)、[YAML/TOML 配置 #12525](https://github.com/earendil-works/pi/issues/12525)、[自定义提示词补全工具等章节 #12533](https://github.com/earendil-works/pi/issues/12533)。

### ④ 性能优化更关注“避免无效工作”
提示词缓存、全局扩展重复导入、压缩 token 估算都受到关注，优化目标同时覆盖启动耗时、调用成本和上下文利用率。  
关联：[缓存失效 #12547](https://github.com/earendil-works/pi/issues/12547)、[扩展缓存 #12529](https://github.com/earendil-works/pi/issues/12529)、[压缩 token 估算 #12513](https://github.com/earendil-works/pi/issues/12513)。

## 6. 开发者关注点

- **可靠退出与资源回收是首要风险点。** SDK 嵌入者应重点验证会话释放、订阅回调抛错和长期运行的内存表现。关联：[会话引用保留 #12546](https://github.com/earendil-works/pi/issues/12546)、[运行提前结算 #12526](https://github.com/earendil-works/pi/issues/12526)。
- **终端体验问题不只是视觉瑕疵。** 键盘模式残留、回滚历史清空会影响退出后的 Shell 使用和操作记录。关联：[Windows 键盘状态 #12564](https://github.com/earendil-works/pi/issues/12564)、[图片与回滚历史 #12548](https://github.com/earendil-works/pi/issues/12548)。
- **工具需要更明确的执行边界。** 默认超时、日志增长控制、同文件并发修改保护，都是无人值守运行的重要保障。关联：[超时 #12561](https://github.com/earendil-works/pi/issues/12561)、[日志膨胀 #12516](https://github.com/earendil-works/pi/issues/12516)、[写入串行化 #12527](https://github.com/earendil-works/pi/issues/12527)。
- **错误提示必须覆盖非交互模式。** 使用本地代理或自定义模型的开发者，需要在脚本中直接看到配置根因。关联：[配置诊断 #12522](https://github.com/earendil-works/pi/issues/12522)。
- **贡献准入也影响修复流转。** 有贡献者报告已测试 PR 被审批门禁自动关闭，并请求维护者批准；因此不能仅凭 CLOSED 判断修复已交付。关联：[贡献者批准请求 #12521](https://github.com/earendil-works/pi/issues/12521)。

**综合判断：** 今天的核心信号是：Pi 的能力扩展仍在继续，但开发者更迫切关注其在长会话、多工具并发、SDK 服务化及异常退出场景下的可靠性。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**2026-11-26｜仓库：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

## 1. 今日速览

Qwen Code 发布 **v1.0.0-preview.2**，重点引入 Qwen4-Max 订阅模型支持，以及额度耗尽倒计时和 `/upgrade` 入口。与此同时，CI 与发布链路稳定性仍是主要工程压力，社区还报告了非交互模式权限差异、模型请求参数冲突等问题；开发工作则继续推进 Web Shell 交互优化和 Managed Agent 嵌入能力。

> **统计口径：**过去 24 小时共 37 条 Issue、40 条 PR 更新，本文依据提供的 30 条 Issue 和 20 条 PR 摘要筛选。PR 评论数字段缺失，不据此判断热度；`CLOSED` 仅表示已关闭，不能确认已合并。

## 2. 版本发布

### [v1.0.0-preview.2](https://github.com/QwenLM/qwen-code/releases/tag/v1.0.0-preview.2)

本次预览版主要更新：

- **模型扩展：**Qwen 订阅目录新增 **Qwen4-Max**，支持 **1M 上下文窗口**以及图像、视频输入。
- **额度提示：**订阅额度耗尽时显示重置倒计时。
- **升级入口：**新增 `/upgrade` 命令，可打开订阅套餐页面。

**关注点：**模型能力与订阅体验同步升级，但已有用户报告 Qwen4-Max 请求参数校验失败，建议重点验证相关配置兼容性，见 [#18357](https://github.com/QwenLM/qwen-code/issues/18357)。

*注：提供的 Release 说明末尾被截断，以上仅总结可确认内容。*

## 3. 社区热点 Issues

以下综合安全影响、用户体验和工程阻塞程度筛选，而非仅按评论数排序。所选 Issue 当前均为 **OPEN**。

| Issue | 核心问题与重要性 | 社区反应 |
|---|---|---|
| **[#18379：非交互模式权限差异](https://github.com/QwenLM/qwen-code/issues/18379)** | 用户报告在 0.28.4 的可信目录中，`qwen -p` 不指定审批模式时，可以读取显式 `--approval-mode=default` 会拒绝的工作区外文件。关系到自动化脚本的安全边界。 | 标记 **P1 / security**，2 条评论，值得优先核查。 |
| **[#18357：Qwen4-Max 请求被拒绝](https://github.com/QwenLM/qwen-code/issues/18357)** | `max_completion_tokens=130270` 小于 `thinking_budget=131072`，触发服务端校验错误，直接阻断模型调用。 | 暂无评论，仍待分诊；是新模型接入的重要兼容性反馈。 |
| **[#18392：v0.28.6 发布失败](https://github.com/QwenLM/qwen-code/issues/18392)** | 发布流程在 `integration_docker` 阶段失败，影响版本交付。 | 机器人报告，已标记 `ready-for-agent`、`autofix/approved`；相关处理见 PR #18395。 |
| **[#18350：Managed Agent gate 大批测试失败](https://github.com/QwenLM/qwen-code/issues/18350)** | 涉及 MySQL 8.4、Java 21 下的 Hosted process fault gates，标题还列出另外 158 项失败，需区分共享环境故障与代码回归。 | 5 条评论，处于待分诊状态，是样本中讨论较多的 CI 告警。 |
| **[#18394：ARM64 E2E 网络抖动](https://github.com/QwenLM/qwen-code/issues/18394)** | 共享 ARM64 runner 上出现 `ERR_NETWORK_CHANGED`，中断 Vite 模块加载；报告还指出 22 个测试未覆盖启动重试。影响无关 PR 的验证可靠性。 | **P2**，1 条评论；此前缓解措施尚未彻底消除问题。 |
| **[#18397：每日依赖 CVE 审计失败](https://github.com/QwenLM/qwen-code/issues/18397)** | 安全审计流程失败，需要检查具体步骤，确认是漏洞告警还是审计服务可用性问题。 | 机器人报告，暂无评论；**目前不能据此认定存在新增高危漏洞**。 |
| **[#18374：键盘连发误取消提示词](https://github.com/QwenLM/qwen-code/issues/18374)** | Web Shell 提交后，同一焦点按钮由 Send 变为 Stop，Enter 自动重复可能立即取消刚提交的任务。 | **P2**，2 条评论，反映键盘操作路径的交互缺陷。 |
| **[#18360：次级工作区显示错误模型](https://github.com/QwenLM/qwen-code/issues/18360)** | 锁定次级工作区的嵌入式 Web Shell 可能显示主工作区模型，并在首次发送时带入错误默认值。影响多工作区配置隔离。 | 1 条评论；工作目录本身未发生切换，问题集中在模型选择状态。 |
| **[#18339：工作区级扩展安装](https://github.com/QwenLM/qwen-code/issues/18339)** | 提议将扩展安装到 `.qwen/extensions/<name>/`，与工作区级 skills 目录保持一致，有利于项目配置共享与隔离。 | 2 条评论，仍处于功能需求分诊阶段。 |
| **[#18401：`/btw` 无法即时插问](https://github.com/QwenLM/qwen-code/issues/18401)** | 工具执行期间提交的 `/btw` 被排队到整轮结束后才处理，与“当前工作中插问”的提示存在落差。 | 暂无评论，但直接影响长任务中的交互效率。 |

## 4. 重要 PR 进展

### 发布与安全可靠性

1. **[#18395：修正 Docker 中跳过测试的注册方式](https://github.com/QwenLM/qwen-code/pull/18395)｜CLOSED**  
   将输入历史测试套件注册为正式 skipped suite，避免因提前返回、未注册任何测试而触发发布门禁失败；对应 v0.28.6 的 Docker 集成问题。

2. **[#18377：避免发布声明引用 core 私有模块](https://github.com/QwenLM/qwen-code/pull/18377)｜CLOSED**  
   修正 Web Shell adapter 导出导致的声明依赖问题，目标之一是解除 `publish-packages` 阶段阻塞。摘要说明该 PR 同时处理三处主分支失败。

3. **[#18388：取消文件工具后阻止写入](https://github.com/QwenLM/qwen-code/pull/18388)｜OPEN**  
   为 `write_file`、`edit`、`notebook_edit` 的写入准备阶段增加取消检查，防止用户取消后仍创建目录或修改文件。

4. **[#18370：收紧外部贡献的自动审查权限边界](https://github.com/QwenLM/qwen-code/pull/18370)｜OPEN**  
   自动分诊和审查前置检查从关键词识别转向评估 PR 可触达的权限范围，并针对环境凭据探测采取失败即拒绝策略。

### Managed Agent 与嵌入能力

5. **[#18389：支持外部 Runtime 与 Workspace 执行](https://github.com/QwenLM/qwen-code/pull/18389)｜CLOSED**  
   允许嵌入宿主提供外部 Runtime 客户端及传输能力，覆盖 Workspace 准备、执行、发布和 drain，并强化恢复过程与持久化回执的关联。

6. **[#18390：保留继承的审批模式](https://github.com/QwenLM/qwen-code/pull/18390)｜CLOSED**  
   区分“未提供审批模式”和“显式提供审批模式”，避免宿主定义准备过程意外破坏既有权限继承。

7. **[#18378：隔离嵌入式启动失败](https://github.com/QwenLM/qwen-code/pull/18378)｜OPEN**  
   将 Managed Agent 初始化放入独立子 Spring context，避免其启动失败阻断宿主应用的其他功能路径。

### Web Shell 交互与架构

8. **[#18399：方向键历史召回可配置](https://github.com/QwenLM/qwen-code/pull/18399)｜OPEN**  
   新增 UI 开关，默认开启、即时生效并保存在当前浏览器。关闭后，上下键可用于光标和补全菜单，仍可通过 Ctrl+R 打开历史。

9. **[#18376：Managed 会话页迁移到共享 ChatSurface](https://github.com/QwenLM/qwen-code/pull/18376)｜OPEN**  
   用共享聊天界面替换重复的消息列表、工具审批、问题卡片和输入框编排，推动不同后端复用同一套交互组件。

10. **[#18365：支持可选 session adapter](https://github.com/QwenLM/qwen-code/pull/18365)｜OPEN**  
    允许嵌入宿主接管会话创建、历史恢复和提示词提交；未配置 adapter 的宿主继续使用原有 daemon 客户端路径。

## 5. 功能需求趋势

- **项目级配置与隔离。** 工作区扩展安装、多工作区模型选择，以及全局语言设置临时覆盖工作区语言的问题，都表明配置作用域需要更清晰、一致。参见 [#18339](https://github.com/QwenLM/qwen-code/issues/18339)、[#18360](https://github.com/QwenLM/qwen-code/issues/18360)、[#18391](https://github.com/QwenLM/qwen-code/issues/18391)。
- **嵌入式 Agent 的可组合能力。** 社区希望宿主提供自身的 Runtime 和 Workspace，而不只是嵌入一个独立运行的 Agent；资源恢复与身份关联也是需求重点。参见 [#18386](https://github.com/QwenLM/qwen-code/issues/18386)。
- **长任务期间的可交互性。** `/btw` 即时插问、避免键盘误取消，以及非拉丁布局快捷键支持，体现出用户对连续操作体验的要求。参见 [#18401](https://github.com/QwenLM/qwen-code/issues/18401)、[#18374](https://github.com/QwenLM/qwen-code/issues/18374)、[#18382](https://github.com/QwenLM/qwen-code/issues/18382)。
- **模型与供应商接入质量。** 关注点既包括 Qwen4-Max 参数兼容，也包括补充 OpenAI-compatible 网关文档；当前样本更强调“接入后可稳定使用”，而非单纯增加模型数量。参见 [#18357](https://github.com/QwenLM/qwen-code/issues/18357)、[#18369](https://github.com/QwenLM/qwen-code/issues/18369)。

## 6. 开发者关注点

- **CI 噪声与真实回归难以区分。** 批量 Java/Managed Agent 测试失败、共享 runner 网络问题会增加排障成本；部分自动报告还注明可能已被后续提交覆盖，需按运行记录和提交去重核查。参见 [#18350](https://github.com/QwenLM/qwen-code/issues/18350)、[#18394](https://github.com/QwenLM/qwen-code/issues/18394)、[#18342](https://github.com/QwenLM/qwen-code/issues/18342)。
- **发布链路仍存在多阶段阻塞。** 样本覆盖 quality、publish 和 Docker integration 等失败点；同一工作流也出现重复报告，不宜将 Issue 数直接视作独立故障数。参见 [#18392](https://github.com/QwenLM/qwen-code/issues/18392)、[#18384](https://github.com/QwenLM/qwen-code/issues/18384)、[#18385](https://github.com/QwenLM/qwen-code/issues/18385)。
- **权限与取消语义必须可预测。** 非交互模式默认权限差异，以及取消后仍可能写文件的问题，都是自动化使用场景中的高风险边界。参见 [#18379](https://github.com/QwenLM/qwen-code/issues/18379)、[PR #18388](https://github.com/QwenLM/qwen-code/pull/18388)。
- **界面状态应与实际配置一致。** 模型选择、语言优先级和 `/btw` 提示都存在用户预期与实际行为的偏差，值得纳入回归测试。参见 [#18360](https://github.com/QwenLM/qwen-code/issues/18360)、[#18391](https://github.com/QwenLM/qwen-code/issues/18391)、[#18401](https://github.com/QwenLM/qwen-code/issues/18401)。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-26**  
**观察范围：过去 24 小时｜[项目仓库](https://github.com/Hmbown/DeepSeek-TUI)**

## 1. 今日速览

过去 24 小时未有新版本发布或 PR 更新，唯一更新的 Issue 聚焦于**对话历史压缩可能误删用户消息**的问题，值得关注其对上下文完整性的影响。该报告涉及摘要标记识别与历史状态管理，但目前仅有 1 条评论，尚无已提供的修复进展。

> **数据说明：**本次数据仅包含 1 条 Issue、0 条 PR，因此不补足至 10 条。另需注意，所提供的 Issue 实际指向 `codewhale-hq/Codewhale`，与日报来源仓库不同；下文按原始数据收录，其与 DeepSeek TUI 的直接关联仍需核实。

## 2. 社区热点 Issues

### #7562：历史压缩的宽松扫描可能误删粘贴摘要标题的用户消息
**状态：OPEN｜作者：asto18089｜评论：1｜👍：0**  
**标签：**`area:tui`、`area:core`、`area:state`  
**链接：**[codewhale-hq/Codewhale#7562](https://github.com/codewhale-hq/Codewhale/issues/7562)

- **问题概述：**据标题与摘要，当历史中不存在带来源标记的检查点载体时，压缩引擎会采用基于用户消息开头文本的扫描逻辑。若用户粘贴了摘要标题，可能被误识别并导致该用户轮次被删除。
- **涉及位置：**`crates/tui/src/compaction.rs:330-345`。报告引用的是 Pinvou 分支 `pinvou3-clean` 的提交 `cc2adf8ef`，是否同样影响目标仓库当前版本仍需核验。
- **为什么重要：**这类问题涉及历史数据完整性，而不仅是界面显示；误删用户输入可能影响后续模型回答和会话恢复。
- **社区反应：**目前有 1 条评论、无点赞，尚不足以判断影响范围或社区共识。给定数据未包含维护者确认、复现结论或修复方案。

## 3. 重要 PR 进展

过去 24 小时内**无 PR 更新记录**，暂无可报告的功能合入或修复进展。针对上述压缩问题，当前数据也未提供关联 PR。

[查看项目 PR 列表](https://github.com/Hmbown/DeepSeek-TUI/pulls)

## 4. 功能需求趋势

本次仅有一个问题样本，**不足以判断社区整体需求趋势**，但可提炼出两个相关的工程关注方向：

- **历史压缩的可靠性：**压缩过程需要区分用户原始输入与系统生成的摘要、检查点，避免仅凭文本标题判断消息身份。[相关 Issue](https://github.com/codewhale-hq/Codewhale/issues/7562)
- **状态来源的明确标记：**报告涉及“缺少来源标记时的回退扫描”，提示旧历史或无标记状态下的兼容逻辑值得重点验证。这是由问题推导出的改进方向，并非已确认的社区高频需求。[相关 Issue](https://github.com/codewhale-hq/Codewhale/issues/7562)

## 5. 开发者关注点

- **用户内容与控制标记混淆：**普通粘贴内容可能触发内部摘要识别逻辑，是本次反馈的核心痛点。[相关 Issue](https://github.com/codewhale-hq/Codewhale/issues/7562)
- **回退路径的数据安全：**建议重点验证“无来源标记检查点＋用户粘贴摘要标题”的组合场景，检查是否存在误删或错误截断。[相关 Issue](https://github.com/codewhale-hq/Codewhale/issues/7562)
- **受影响版本与仓库归属：**报告引用了外部分支和具体提交，排查前应先确认目标仓库是否包含相同实现，避免将分支问题直接视为主线缺陷。[相关 Issue](https://github.com/codewhale-hq/Codewhale/issues/7562)

**今日结论：**当前最值得跟进的是压缩逻辑的数据完整性风险；优先核实受影响代码与版本，再关注复现结果、维护者确认及回归测试。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*