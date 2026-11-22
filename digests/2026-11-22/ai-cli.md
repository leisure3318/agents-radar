# AI CLI 工具社区动态日报 2026-11-22

> 生成时间: 2026-11-22 01:55 UTC | 覆盖工具: 9 个

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
**2026-11-22｜基于所提供的社区动态摘要**

> **统计说明：**各仓库的数据覆盖范围不同，部分仅提供抽样详情；Issue、PR 数表示窗口内更新记录，不等于当日新建数量。`CLOSED` 不代表已合并或已修复，低互动问题也不代表普遍故障。以下定位与趋势判断基于本期样本，不作产品能力排名。

## 1. 生态全景

AI CLI 工具的本期竞争重点，正在从“增加模型和工具入口”转向**长任务能否稳定执行、会话能否可靠恢复、运行状态能否被准确理解**。多代理、后台任务、桌面自动化和远程控制扩展了应用范围，也带来了消息归属、权限一致性和资源治理等更复杂的问题。MCP、ACP 与多模型接入仍在推进，但社区越来越关注“连接成功后是否真正可用”，而非单纯支持多少协议。版本发布与能力交付需要分开判断：本期可见 Release 主要来自 Copilot CLI、Gemini CLI 和 Qwen Code，其中 nightly 发布不必然意味着用户侧能力升级。

## 2. 各工具活跃度对比

| 工具 | Issue 更新数 | PR 更新数 | Release 情况 | 本期主要议题 |
|---|---:|---:|---|---|
| **Claude Code** | 50，提供30条详情 | 0 | 无 | Windows 稳定性、桌面内存、多会话与子代理、额度透明 |
| **OpenAI Codex** | 50，提供30条详情 | 20，均为 CLOSED | 无 | 桌面权限、OAuth MCP、长会话语义、TUI 与连接恢复 |
| **Gemini CLI** | 3 | 3，均 OPEN | 1 个 nightly | ACP＋沙箱初始化、文档修正 |
| **GitHub Copilot CLI** | 6 | 1，OPEN | 2 个版本：v1.0.115-5、-6 | 长会话性能、复杂网络、嵌套 Agent、安装渠道 |
| **Kimi Code CLI** | 0 | 0 | 无 | 本期无活动 |
| **OpenCode** | 提供30条，完整总量未给出 | 提供20条，完整总量未给出 | 无 | v2 稳定性、多模态、Provider、权限与持久化 |
| **Pi** | 12 | 3，均 CLOSED | 无 | 上下文压缩、会话完整性、工具契约 |
| **Qwen Code** | 16 | 49，提供20条详情 | 1 个 nightly | 恢复句柄、Daemon、负载准入、Web Shell |
| **DeepSeek TUI** | 2 | 8：5 OPEN、3 CLOSED | 无 | 流式显示、会话切换、索引缓存、诊断存储 |

**阅读要点：**
- **Qwen Code 的可见 PR 更新量最高，为49条**，但不能据此直接比较代码产出或交付速度。
- Claude Code 与 Codex 的 Issue 更新均为50条，反馈覆盖面较大；两者详情均仅覆盖30条。
- Gemini nightly 相邻标签提交后缀相同，未显示明确新增代码；Qwen nightly 可见说明主要涉及评审与 CI。
- Pi、DeepSeek TUI 存在来源仓库名称与条目链接不一致的情况，进一步核验时应以具体条目为准。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与共性 |
|---|---|---|
| **长会话与数据完整性** | Claude Code、Codex、Copilot CLI、OpenCode、Pi、Qwen Code、DeepSeek TUI | 限额恢复不丢消息、恢复会话不失败、迁移历史可读、磁盘写满后记录可恢复、压缩后保留内容访问句柄 |
| **多代理与后台任务生命周期** | Claude Code、Codex、Copilot CLI、OpenCode、Pi、Qwen Code | 明确代理身份与结果归属，支持嵌套代理多轮通信、精确取消、后台状态追踪，避免跨会话状态串扰 |
| **权限安全与执行一致性** | Claude Code、Codex、OpenCode、Qwen Code | “始终允许”必须准确匹配且不过度授权；审批后应真正继续执行；高风险命令应有明确边界 |
| **协议与工具端到端可用性** | Codex、Gemini CLI、Copilot CLI、OpenCode、Pi | OAuth 后工具能否进入会话、ACP 握手是否阻塞、MCP 是否兼容合法响应、恢复前后工具能力是否一致 |
| **运行状态与成本可观测性** | Claude Code、Codex、Copilot CLI、OpenCode、Pi、DeepSeek TUI | 看清计费来源、模型实际路由、上下文占用、后台任务完成状态及请求失败原因 |
| **资源治理与恢复性能** | Claude Code、Copilot CLI、OpenCode、Qwen Code、DeepSeek TUI | 控制内存和磁盘增长、提高会话恢复速度、减少重复索引，在过载时限制新任务创建 |

其中，**“界面或配置显示的状态，与实际执行行为不一致”是最突出的横向问题**：模型选项未必对应实际路由、Thinking 开关未必影响后端、工具已声明未必能够调用、任务已完成却仍显示运行中。

## 4. 差异化定位分析

以下是本期信号所体现的侧重，而非完整产品定位。

| 工具 | 功能侧重与技术路线信号 | 更相关的目标用户 |
|---|---|---|
| **Claude Code** | CLI、桌面端、Remote Control 与子代理协同；重点挑战是跨端会话和系统级自动化可靠性 | 同时使用本地、桌面和移动入口的开发者，以及复杂代理工作流用户 |
| **Codex** | 本地/云端执行、桌面与编辑器集成并行；PR 涉及 TUI、代理通信和连接恢复 | 需要在本地与云端切换，并接入外部 MCP 服务的开发者 |
| **Gemini CLI** | 本期突出 ACP 与沙箱组合的集成边界，维护活动偏协议兼容与文档准确性 | 外部客户端集成者、依赖沙箱执行的 CLI 用户 |
| **Copilot CLI** | GitHub 工具链、组织插件策略与会话体验；正式发布已包含长会话优化 | GitHub 工作流用户、企业受管环境和组织策略使用者 |
| **OpenCode** | 多 Provider、多模态与可扩展工作台方向并行，v2 稳定性仍需打磨 | 多模型使用者、希望定制工具链及自托管的团队 |
| **Pi** | 深入上下文管理、扩展工具契约和运行控制，偏底层可组合能力 | 扩展开发者、重视上下文精细控制和异步编排的高级用户 |
| **Qwen Code** | Daemon、Web Shell、托管 Agent 与负载准入并行推进，服务化特征明显 | 多会话服务部署者、托管 Agent 平台及混合开发环境用户 |
| **DeepSeek TUI** | 优先修正终端流式事件呈现、历史访问与诊断持久化 | 终端优先、重视推理和工具执行过程可读性的用户 |
| **Kimi Code CLI** | 本期无活动，无法据此判断技术路线变化 | 信息不足，不作推断 |

**核心区别：**Claude Code、Codex 更突出跨入口执行体验；OpenCode 更突出模型与扩展开放性；Qwen Code 显示出更强的服务运行治理信号；Pi 更聚焦上下文与工具运行机制；Copilot CLI 则体现 GitHub 与组织策略场景的整合需求。

## 5. 社区热度与成熟度

### 活跃度：需要分三个维度看

- **反馈规模：Claude Code、Codex 较突出。** 两者均有50条 Issue 更新，但样本评论量不高，不能等同于高强度社区讨论。
- **开发更新：Qwen Code 最显著，OpenCode、Codex 也较活跃。** Qwen Code 有49条 PR 更新；OpenCode 可见20条 PR，覆盖新能力与稳定性；Codex 的20条 PR 均已关闭，但交付状态待核实。
- **版本交付：Copilot CLI 最明确。** 本期两个版本包含可识别的用户侧修复和性能改善；Gemini、Qwen 的 nightly 信息不足以证明显著功能交付。

### 成熟度：问题复杂度上升，不等于质量已经成熟

- **Claude Code、Codex、Copilot CLI** 的反馈已涉及跨端、组织权限、复杂网络和长周期使用，说明应用场景更深入，也暴露了更多边界条件。
- **OpenCode、Qwen Code** 呈现功能扩展与基础可靠性建设并行的快速迭代特征，应重点关注迁移、权限和服务稳定性。
- **Pi、DeepSeek TUI** 更集中于运行机制正确性，问题定位相对细，但本期样本不足以推导整体产品成熟度。
- **Gemini CLI、Kimi Code CLI** 本期活动较少，不能由单日窗口推断长期发展速度或社区健康度。

总体上，**PR 多、Issue 多或发布频繁，都不能单独作为成熟度指标**；更有价值的是修复闭环、回归测试、升级安全性和正式版本验证结果。

## 6. 值得关注的趋势信号

### ① 竞争单位正从“单次回答”转向“完整任务生命周期”
任务暂停、恢复、迁移、取消和后台运行，正在多个社区同时成为重点。

**开发者参考：**评测时加入断网、限额、磁盘写满、进程被杀和版本升级场景，而不只比较一次性代码生成效果。

### ② 协议支持正在转向端到端兼容性验证
Gemini 的 ACP＋沙箱、Codex 的 OAuth MCP、OpenCode 的 MCP HTTP 202 问题表明，“支持协议”不足以保证真实集成可用。

**开发者参考：**按认证、发现、会话注入、调用、恢复五个阶段建立测试，避免仅以握手成功作为验收标准。

### ③ 权限设计同时面临“太严”和“太宽”的压力
Codex、Qwen 出现授权不生效或重复审批反馈，OpenCode 则有授权通配符过宽的修复提案。

**开发者参考：**不要通过全面放权规避摩擦；优先核查路径规范化、命令包装器和权限规则的实际作用范围。

### ④ 模型能力需要精确到“模型＋路由＋后端”
OpenCode 的 PDF 路由限制、Qwen 的 Thinking 参数、Pi 的思考等级映射，反映了同一问题：模型名称不能代表完整运行能力。

**开发者参考：**维护运行时能力矩阵，分别记录输入类型、推理参数、认证方式与 API 路径，并用实际请求验证。

### ⑤ 可观测性正在成为信任基础
计费来源、实际模型、上下文构成、代理归属、任务状态和错误传输信息，都直接影响用户是否敢于交付长任务。

**开发者参考：**选型时将状态可解释性与可审计性纳入核心指标，而不是仅看功能清单。

### ⑥ Agent 工具开始需要服务级资源治理
Qwen 的负载准入提案、Claude 的内存反馈、Copilot 的磁盘优化和 DeepSeek TUI 的索引缓存，显示多会话运行已带来持续资源压力。

**开发者参考：**团队部署应设置并发上限、资源监控和恢复策略；相关提案尚未发布时，不应假定客户端已具备保护能力。

---

**决策结论：**本期最值得优先评估的不是“哪个工具新增功能最多”，而是**哪个工具能在你的真实环境中保持权限、模型、工具和任务状态一致，并在异常后安全恢复**。对生产工作流，建议以端到端回归测试和已发布修复为依据，谨慎采用仅存在于开放或已关闭 PR 中的能力。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-22｜基于展示的 20 条 PR 与 15 条 Issues**

> **数据说明：**所有 PR 的评论数均为 `undefined`、👍 均为 0，因此无法核验“按评论数排序”的热度，也不能确认哪些 PR 评论活跃。下文以 **Issue 讨论强度、问题关联性与 PR 更新情况**筛选重点关注项，**不是严格热度榜**。展示的 PR 均为 **OPEN**，没有已合并或 Draft 的状态证据。

## 1. 热门 Skills 排行：8 个重点关注项

| Skill / PR | 功能与本次变化 | 社区关注点 | 当前状态 |
|---|---|---|---|
| **1. skill-creator** · [#1298](https://github.com/anthropics/skills/pull/1298) | 用于创建、评估和优化 Skill；本次修复并行触发评估、Windows 子进程及运行时错误处理 | **评估结果是否可信**。相关 [#556](https://github.com/anthropics/skills/issues/556) 有 13 条评论，[#1352](https://github.com/anthropics/skills/issues/1352) 有 6 条评论，均反馈触发率异常 | **OPEN**；9 月 16 日更新 |
| **2. webapp-testing** · [#1980](https://github.com/anthropics/skills/pull/1980) | 支持 Web 应用测试；本次避免服务器启动脚本使用 `shell=True` | PR 聚焦未清洗命令带来的 **命令注入风险**，体现测试自动化的安全边界问题 | **OPEN**；11 月 1 日更新 |
| **3. docx** · [#1792](https://github.com/anthropics/skills/pull/1792) | 处理 Word 文档；本次将 LibreOffice 超时正确报告为错误，并检查修订标记是否真正移除 | **不能“报告成功、产物却错误”**。另有 [#2018](https://github.com/anthropics/skills/issues/2018) 反馈 XML 命名空间损坏，显示文档完整性是持续痛点 | **OPEN**；11 月 1 日更新 |
| **4. mcp-builder** · [#1742](https://github.com/anthropics/skills/pull/1742) | 辅助构建 MCP 服务；适配 `mcp>=2` 的导入名称及自定义 HTTP headers 配置 | PR 聚焦 **依赖升级兼容性与认证请求配置**，避免示例或连接脚本随 SDK 演进失效 | **OPEN**；10 月 8 日更新 |
| **5. xlsx** · [#2019](https://github.com/anthropics/skills/pull/2019) | 处理电子表格；修复外链风险检测对工作表级名称及别名的漏检 | PR 聚焦 **间接外部引用的识别准确性**，提升复杂工作簿处理的可靠性 | **OPEN**；11 月 3 日更新 |
| **6. notion-spec-to-implementation 等** · [#1245](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品／技术规格转为实施任务、验收标准和进度跟踪；同一 PR 还提交了简历审计 Skill | 新增方向是 **从需求文档到可执行开发计划**；但一个 PR 包含多个 Skill，不能将其关注度归于单一功能 | **OPEN**；10 月 15 日更新 |
| **7. md2video-audio** · [#1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经幻灯片流程转换为带配音的 MP4 视频 | 拓展至 **文档→演示→音视频**内容流水线；“零成本、专业级效果”为提交者描述，尚非已验证结论 | **OPEN**；9 月 15 日更新 |
| **8. Pyxel** · [#525](https://github.com/anthropics/skills/pull/525) | 使用 Python 开发复古游戏，包含调试、无头输入驱动运行、画面检查和状态验证 | 不只生成代码，还强调 **运行与验证闭环**；3 月提交、11 月仍有更新，但不能据此判断即将合并 | **OPEN**；11 月 1 日更新 |

**整体观察：**本次展示样本中，既有 Skill 的可靠性、安全性和兼容性改进，比新增领域能力更突出。

## 2. 社区需求趋势

### ① 安全治理与可信分发：讨论最强，但不是单纯“新增 Skill”
[#492](https://github.com/anthropics/skills/issues/492) 以 **46 条评论**明显领先，反馈社区 Skill 使用 `anthropic/` 命名空间可能造成官方身份混淆。另有已关闭的治理 Skill 提案 [#412](https://github.com/anthropics/skills/issues/412)，涉及策略执行、威胁检测、信任评分和审计。

**需求判断：**社区需要区分官方与第三方来源，并让 Agent 工作流具备可审计的安全边界；仅新增安全 Skill 不能替代分发机制治理。

### ② 组织级复用与分发：期待团队共享，而非手工传文件
[#228](https://github.com/anthropics/skills/issues/228) 有 **17 条评论、8 个赞**，要求在 Claude.ai 内实现组织级 Skill 共享，减少下载、转发、逐人上传操作。

**需求判断：**共享库、统一分发和团队复用是明确诉求；这是跨产品生态需求，不能直接视为 Claude Code 已有路线图。

### ③ Skill 自动评估与质量门禁：从“能生成”走向“能验证”
触发失效问题 [#556](https://github.com/anthropics/skills/issues/556)、并行评估误判 [#1352](https://github.com/anthropics/skills/issues/1352)，以及覆盖任务前校准、对抗审查、交付验证的提案 [#1385](https://github.com/anthropics/skills/issues/1385)，共同指向质量保障。

**需求判断：**可靠的触发测试、结果验证和多阶段审查，比单纯增加更多提示词模板更迫切。当前样本不足以单独认定“代码审查”或“测试生成”是最高热新 Skill。

### ④ 长任务记忆与上下文效率：减少 Skill 自身的使用成本
[compact-memory 提案 #1329](https://github.com/anthropics/skills/issues/1329) 有 **10 条评论**，探索紧凑状态表示；[#1487](https://github.com/anthropics/skills/issues/1487) 反馈 `claude-api` 一次加载约 156k tokens；[#189](https://github.com/anthropics/skills/issues/189) 反馈插件重复安装内容。

**需求判断：**长期任务记忆压缩、按需加载和去重，是值得关注的新能力与基础设施方向。

### ⑤ 文档工作流可靠性：重点是保真，而不只是生成
[#2018](https://github.com/anthropics/skills/issues/2018) 反馈 DOCX 合并操作生成无效 XML；对应 PR 样本还包括修订验证、外链识别及排版质量控制。

**需求判断：**社区需要可检查、可交付的文档产物；相关新增方向可关注 [document-typography #514](https://github.com/anthropics/skills/pull/514)，但其近期活跃度证据不足。

> **信号过滤：**账号邮箱修改 [#1143](https://github.com/anthropics/skills/issues/1143) 虽有 18 个赞，但属于平台账户功能，不宜计入新 Skill 需求趋势。

## 3. 高潜力待合并 Skills：优先跟踪清单

**无法从本数据确认“评论活跃”或“近期落地”。**以下按问题明确度、社区需求关联和近期更新时间筛选，代表跟踪价值，而非合并概率。

| 优先跟踪 PR | 跟踪理由 | 主要不确定性 |
|---|---|---|
| **[skill-creator #1298](https://github.com/anthropics/skills/pull/1298)** | 与多条触发评估故障反馈高度相关，修复价值覆盖整个 Skill 开发链路 | 最近展示更新在 9 月；未提供评审与测试结论 |
| **[skill-creator #1681](https://github.com/anthropics/skills/pull/1681)** | 修复打包脚本直接执行时的导入失败，范围明确，**11 月 19 日**仍更新 | 更新时间不代表维护者已认可或准备合并 |
| **[webapp-testing #1980](https://github.com/anthropics/skills/pull/1980)** | 涉及命令注入风险，安全收益明确，11 月仍更新 | 需确认替代方案对原有命令链工作流的兼容性 |
| **[docx #1792](https://github.com/anthropics/skills/pull/1792)** | 针对超时误报成功和输出验真，直接改善交付可信度 | 未提供回归测试、审查或维护者排期 |
| **[xlsx #2019](https://github.com/anthropics/skills/pull/2019)** | 对应具体问题 #2013，修复边界清晰，11 月仍更新 | 尚无合并意向证据 |
| **[新增 Pyxel Skill #525](https://github.com/anthropics/skills/pull/525)** | 新领域中体现完整“开发—运行—验证”闭环，长期仍有更新 | 长期 OPEN 也可能反映准入或评审阻力，并非临近落地信号 |

## 4. Skills 生态洞察

**社区最集中的诉求不是“再多几个 Skill”，而是让 Skills 更可信、更可验证、更便于团队复用——尤其要解决来源混淆、触发评估失真和产物错误却报告成功的问题。**（代表讨论：[安全分发 #492](https://github.com/anthropics/skills/issues/492)、[触发评估 #556](https://github.com/anthropics/skills/issues/556)、[组织共享 #228](https://github.com/anthropics/skills/issues/228)）

---

# Claude Code 社区动态日报
**2026-11-22｜数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)**

## 1. 今日速览

过去 24 小时无新 Release、无 PR 更新，社区反馈主要集中在 **Windows 稳定性、桌面端资源消耗，以及多会话与子代理协作可靠性**。费用与额度透明度也是突出方向，包括额度变化解释、API Key 计费提示和余额查询需求。

**数据口径：**本期窗口内共有 50 条 Issue 更新，以下分析基于提供的 30 条；这些条目全部为 OPEN、👍 均为 0，评论最多仅 3 条，因此“值得关注”主要按潜在影响与技术价值判断，不代表已形成广泛共识。相关问题均为用户报告，不能视为官方确认。

## 2. 社区热点 Issues

### 1. Windows：2.1.330 被报告导致系统级进程创建阻塞
[#111584](https://github.com/anthropics/claude-code/issues/111584) · `bug` `regression` · **0 评论**

- **反馈内容：**用户报告升级至 2.1.330 后，系统无法创建新进程并出现严重 UI 冻结；回退至 2.1.329 后恢复。
- **为什么重要：**若复现，影响将超出 Claude Code 本身，波及整个开发环境，是本期优先级最高的稳定性信号之一。
- **社区反应：**暂无评论；回退有效目前仅是报告者的观察，尚不能认定为通用解决方案。

### 2. macOS：桌面端子 Node 进程内存增长至每个 40 GB 以上
[#111591](https://github.com/anthropics/claude-code/issues/111591) · `perf:memory` `area:desktop` · **1 评论**

- **反馈内容：**用户在同时打开多个本地会话时，观察到两个后代 Node 进程持续增长，最终耗尽 macOS 内存。
- **为什么重要：**直接影响长时间运行和多会话工作流，需要进一步区分桌面端、会话管理及运行环境因素。
- **社区反应：**已有 1 条评论，但提供的数据未包含评论内容，不能据此判断是否有人复现。

### 3. Windows：Computer Use 结束后，其他应用窗口仍被禁用
[#111603](https://github.com/anthropics/claude-code/issues/111603) · `area:desktop` · **0 评论**

- **反馈内容：**用户报告非允许列表应用的窗口遗留在 `EnableWindow(FALSE)` 状态，无法左键点击，甚至包括 Claude 自身窗口。
- **为什么重要：**问题涉及自动化执行后的系统状态恢复；清理不完整可能阻断用户继续操作。
- **社区反应：**暂无评论；报告提供了具体 Windows API 状态，便于针对性排查。

### 4. 子代理消息可能改变结果回传归属
[#111605](https://github.com/anthropics/claude-code/issues/111605) · `area:agents` `has repro` · **0 评论**

- **反馈内容：**在 Linux CLI 2.1.330 中，向空闲同级子代理发送 `SendMessage` 后，接收方被恢复到发送方之下，后续完成消息不再返回原创建者。
- **为什么重要：**可能破坏多代理编排中的任务归属、完成通知和汇总逻辑。
- **社区反应：**暂无评论；带有复现标签，值得使用后台子代理的开发者跟进验证。

### 5. Windows 桌面端：额度恢复后，等待发送的消息丢失
[#111607](https://github.com/anthropics/claude-code/issues/111607) · `area:desktop` `has repro` · **0 评论**

- **反馈内容：**会话触及 5 小时用量限制后，处于“hold”状态的消息在自动恢复时丢失。
- **为什么重要：**这不仅是限额体验问题，也涉及待处理输入的持久化与恢复一致性。
- **社区反应：**暂无评论；已标注可复现，适合检查限额边界下的消息队列行为。

### 6. Auto mode：建议的解封方式可能放行输出机密的命令
[#111589](https://github.com/anthropics/claude-code/issues/111589) · `area:security` `area:permissions` · **0 评论**

- **反馈内容：**报告者认为，自动权限分类器给出的修复建议，可能在没有警告的情况下放行会输出机密信息的命令。
- **为什么重要：**权限放行不应被理解为命令输出安全；涉及部署变量、凭证等操作时尤其需要审慎。
- **社区反应：**暂无评论，当前归类为增强需求，不能据此认定存在已确认漏洞。

### 7. 周额度增长与本地 Token 记录不匹配
[#111593](https://github.com/anthropics/claude-code/issues/111593) · `area:cost` · **0 评论**

- **反馈内容：**用户称约 13.5 小时内，周额度占用从 30% 升至 88%，但本地记录的 Token 用量没有对应增长。
- **为什么重要：**反映开发者对额度可解释性、消耗归因和成本核对的需求。
- **社区反应：**暂无评论；现有材料不足以证明计费错误，也无法确定本地记录是否覆盖全部计量项。

### 8. Remote Control：移动端会话入口可能对应错误的本地会话
[#111587](https://github.com/anthropics/claude-code/issues/111587) · `platform:windows` `area:core` · **1 评论**

- **反馈内容：**Windows 多会话并行场景下，移动端选择某个会话后，由另一个本地会话响应。
- **为什么重要：**远程操作依赖准确的会话身份映射，错配可能导致指令进入错误工作上下文。
- **社区反应：**已有 1 条评论；报告者使用 2.1.329，尚未验证 2.1.330，不能归因于最新版。

### 9. 桌面端自动注入工具和指令，缺少清单与关闭方式
[#111585](https://github.com/anthropics/claude-code/issues/111585) · `enhancement` `area:desktop` · **0 评论**

- **反馈内容：**报告者称 Code 标签页向会话加入约 68 个工具、较长指令及账户技能，部分指令与用户的 `CLAUDE.md` 冲突。
- **为什么重要：**关系到提示上下文可审计性、工具暴露范围和项目行为的可预测性。
- **社区反应：**暂无评论；核心诉求是让隐式注入变得可见、可控。

### 10. 订阅存在时，持续提示当前是否通过 API Key 计费
[#111608](https://github.com/anthropics/claude-code/issues/111608) · `enhancement` `area:cost` `area:auth` · **0 评论**

- **需求内容：**在会话内持续显示 API Key 计费状态，避免用户误以为正在使用订阅额度。
- **为什么重要：**认证身份与实际费用来源需要明确区分，尤其适合同时使用订阅和 API 的开发者。
- **社区反应：**暂无评论，是本期费用透明度方向中较明确、可操作的产品需求。

## 3. 重要 PR 进展

**过去 24 小时没有 PR 更新，无法列出 10 个重要 PR。** 当前数据也未显示上述问题对应的修复提交或合并进展。

[查看仓库 Pull Requests](https://github.com/anthropics/claude-code/pulls)

## 4. 功能需求趋势

| 方向 | 本期信号 | 代表 Issue |
|---|---|---|
| **费用与额度可观测性** | 希望明确计费来源、查询含自动充值的预付余额，并解释额度消耗 | [API Key 计费提示 #111608](https://github.com/anthropics/claude-code/issues/111608)、[余额 API #111609](https://github.com/anthropics/claude-code/issues/111609) |
| **跨端会话连续性** | 移动端启动直达固定会话；Remote Control 线程在桌面侧栏可见，并支持技能 | [固定会话入口 #111599](https://github.com/anthropics/claude-code/issues/111599)、[线程与技能可见性 #111606](https://github.com/anthropics/claude-code/issues/111606) |
| **桌面端可控性与操作效率** | 查看并关闭注入工具；简化归档阅读、截图引用操作 | [工具注入控制 #111585](https://github.com/anthropics/claude-code/issues/111585)、[归档访问 #111597](https://github.com/anthropics/claude-code/issues/111597)、[截图引用 #111598](https://github.com/anthropics/claude-code/issues/111598) |
| **Code Mode / MCP 工具契约完整性** | 希望生成的 TypeScript 工具签名保留 JSON Schema 的 `default` 信息 | [#111592](https://github.com/anthropics/claude-code/issues/111592) |
| **权限体验兼顾安全与低摩擦** | 一方面要求风险提示更明确，另一方面希望避免对已信任工作区重复确认 | [Auto mode 安全提示 #111589](https://github.com/anthropics/claude-code/issues/111589)、[重复信任提示 #111580](https://github.com/anthropics/claude-code/issues/111580) |

## 5. 开发者关注点

- **稳定性优先于新增能力：**本期高影响报告涉及系统冻结、内存耗尽和窗口不可操作，建议相关平台用户先在受控环境验证版本表现。[#111584](https://github.com/anthropics/claude-code/issues/111584) · [#111591](https://github.com/anthropics/claude-code/issues/111591) · [#111603](https://github.com/anthropics/claude-code/issues/111603)
- **并发工作流需要可靠的身份与归属：**远程会话错配和子代理回传异常，表明应重点验证“指令发给谁、结果返回谁”。[#111587](https://github.com/anthropics/claude-code/issues/111587) · [#111605](https://github.com/anthropics/claude-code/issues/111605)
- **限额边界必须保证数据不丢：**自动暂停与恢复不能只恢复模型执行，还应保留用户待处理消息。[#111607](https://github.com/anthropics/claude-code/issues/111607)
- **开发者需要看清隐式状态：**当前费用来源、额度变化、桌面端注入指令与工具，都需要更直观的可见性。[#111608](https://github.com/anthropics/claude-code/issues/111608) · [#111593](https://github.com/anthropics/claude-code/issues/111593) · [#111585](https://github.com/anthropics/claude-code/issues/111585)

**今日判断：**在本期可见样本中，社区关注点更偏向让现有自动化能力运行得稳定、可追踪、可控，而非扩展新的模型或 IDE 支持。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**2026-11-22｜数据来源：[openai/codex](https://github.com/openai/codex)**

## 今日速览

Windows 桌面端的本地工作流与权限问题成为主要关注点，涉及 Local/Cloud 入口消失、审批后无法继续、Computer Use 初始化超时等。macOS 用户则反馈 OAuth MCP 工具无法进入会话，CLI 侧出现上下文压缩后旧指令被重新解释、安全检查疑似误拦截等问题。过去 24 小时无新 Release；PR 更新主要围绕 TUI 交互、多代理通信及连接恢复。

> **统计口径：**数据包含 50 条更新的 Issue，但仅提供评论数最多的 30 条详情；下文趋势基于这 30 条分析。20 条 PR 均标为 `CLOSED`，未提供合并状态，因此不将其视为已合并或已发布；PR 评论数缺失，不据此判断热度。

## 社区热点 Issues

以下 10 条均处于 **OPEN** 状态。目前讨论量整体有限，反馈应视为待确认的问题线索，而非已证实的普遍故障。

| Issue | 主要反馈与关注价值 | 社区反应 |
|---|---|---|
| **[ #63052：Windows Computer Use 初始化超时](https://github.com/openai/codex/issues/63052)** | 用户报告在较早的窗口状态续接错误后，原生 Computer Use 初始化超时，并提供更新前后包版本。直接影响桌面自动化能力，是当前样本讨论最多的问题。 | **4 评论，0 👍** |
| **[ #63042：联网后 Local/Cloud 选择器消失](https://github.com/openai/codex/issues/63042)** | Windows 端出现“联网消失、离线恢复”的环境选择器异常。问题不仅影响界面，也可能阻断用户选择本地执行环境。 | **3 评论，1 👍** |
| **[ #63025：Full Access 消失，审批后无法继续](https://github.com/openai/codex/issues/63025)** | Windows Work 用户反馈完整访问权限入口消失，批准请求也无法恢复执行。值得关注权限配置、旧会话状态与执行能力之间的一致性。 | **3 评论，1 👍** |
| **[ #63017：压缩后旧用户消息被当成新指令](https://github.com/openai/codex/issues/63017)** | 报告称上下文压缩保留的用户消息缺乏时间和来源标记，后续请求中可能被模型重新解释。对长会话的指令时效性与任务连续性有直接影响。 | **2 评论，0 👍** |
| **[ #63070：OAuth MCP 初始化后工具仍不可用](https://github.com/openai/codex/issues/63070)** | macOS 用户称需要 OAuth 的自定义 MCP 工具无法进入会话，无认证版本则可用，并报告在另一供应商服务上复现。影响外部工具集成的可靠性。 | **1 评论，0 👍** |
| **[ #63061：Windows 会话恢复遇到权限路径错误](https://github.com/openai/codex/issues/63061)** | 在启用 Windows 沙箱、将磁盘根目录设为可写根的条件下，`thread/resume` 报路径无法无损表示。复现边界较清晰，关乎已有会话能否恢复。 | **1 评论，0 👍** |
| **[ #63063：游戏引擎代码分析被判为网络安全请求](https://github.com/openai/codex/issues/63063)** | 用户报告正常代码缺陷分析触发安全限制。此类反馈值得检查分类边界，但仅凭摘要无法判定是否确属误拦截。 | **1 评论，0 👍** |
| **[ #63068：VS Code 所选模型与实际路由不一致](https://github.com/openai/codex/issues/63068)** | 用户称已选择 Terra Light，扩展仍使用 Sol。若确认，将影响模型选择的可预测性及额度使用预期；模型名称来自用户报告。 | **1 评论，0 👍** |
| **[ #63066：Ultrafast 请求报未知参数](https://github.com/openai/codex/issues/63066)** | 用户报告桌面和网页端启用 Ultrafast 后均出现 `stream_options.exclude_fields` 参数错误。跨客户端复现线索值得跟踪，但根因尚未确认。 | **0 评论，0 👍** |
| **[ #63065：后台定时任务无法打开内置浏览器标签](https://github.com/openai/codex/issues/63065)** | macOS 用户切换到其他聊天后，原会话的定时任务无法创建浏览器标签。暴露后台自动化与前台会话状态之间的潜在耦合。 | **1 评论，0 👍** |

## 重要 PR 进展

**以下均为已关闭 PR，是否合并、何时进入可用版本仍需另行核实。**

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| **[ #63069：子代理异步消息独立开关](https://github.com/openai/codex/pull/63069)** | 为异步用户消息增加独立的 `root_agent` 与 `subagents` 设置。 | 让子代理通信不再依赖根代理开关，细化多代理交互控制。 |
| **[ #63058：Cloud 回复流恢复保持可重试](https://github.com/openai/codex/pull/63058)** | 调整瞬时故障后的恢复逻辑，避免反复断连耗尽恢复尝试，以及排队、重连等待挤占恢复时间。 | 提升网络抖动下的会话连续性。 |
| **[ #63047：选择与复制 Markdown 块](https://github.com/openai/codex/pull/63047)** | 在 transcript 选择模式中，通过 `m` 标记块，使用方向键式快捷键移动、扩选，并用 `Tab` 扩大范围。 | 更方便提取结构化回答与代码片段。 |
| **[ #63054：Shell 模式抑制补全弹窗](https://github.com/openai/codex/pull/63054)** | 在 `!` Shell 模式关闭补全弹窗，并取消活动文件搜索。 | 避免 PowerShell 的 `$env:HTTP_PROXY` 等语法误触发补全。 |
| **[ #63036：斜杠命令补全具名设置](https://github.com/openai/codex/pull/63036)** | 为 `/model`、`/permissions`、`/title`、`/statusline`、`/mcp login` 提供参数及可选值补全。 | 降低配置命令的记忆成本。 |
| **[ #63022：修复剪贴板回退与粘贴时序](https://github.com/openai/codex/pull/63022)** | 处理 X11 图像读取返回文本的情况，并防止剪贴板读取未完成时提交或排队草稿。 | 减少粘贴内容缺失、输入不完整的问题。 |
| **[ #62986：Agent Command Center 侧边停靠](https://github.com/openai/codex/pull/62986)** | 在终端空间足够时，将任务中心停靠在会话旁，而非使用模态界面；涉及 `tui_workspace` 功能开关。 | 浏览代理任务时仍能保留对话和草稿视野。 |
| **[ #62906：改善 HTTP MCP 启动错误提示](https://github.com/openai/codex/pull/62906)** | 改善 Streamable HTTP MCP 启动问题的诊断与告警，针对底层错误噪声及端点凭据暴露风险。 | 提高工具不可用时的可诊断性，并减少敏感信息泄露风险。 |
| **[ #62905：`/config` 新增推理摘要选择器](https://github.com/openai/codex/pull/62905)** | 提供 Auto、Concise、Detailed、None 选项，为新聊天保存 `model_reasoning_summary`，并显示有效配置。 | 让摘要设置更直观，便于理解配置覆盖关系。 |
| **[ #62903：默认启用并发推理摘要](https://github.com/openai/codex/pull/62903)** | 将 `concurrent_reasoning_summaries` 标为稳定并默认启用，默认设置 `stream_options.reasoning_summary_delivery=sequential_cutoff`。 | 调整推理摘要交付行为，值得集成方关注请求参数变化。 |

## 功能需求趋势

### 1. 本地执行能力与权限行为一致性
用户不仅需要更多权限选项，更需要“选择的权限确实生效”：Windows 的自动审批与 Git 写入阻断、macOS 的 Full Access 下重复授权，呈现相近的体验痛点，但尚不能认定同源。  
相关：[Windows 审批配置 #63059](https://github.com/openai/codex/issues/63059) · [macOS Full Access #63033](https://github.com/openai/codex/issues/63033)

### 2. MCP 从“连接成功”走向“工具实际可用”
反馈覆盖 OAuth 后工具缺失、工具发现耗时，以及内置工具调用失败。社区关注点已不只是认证成功，而是完整调用链路是否可用、可诊断。  
相关：[OAuth 工具不可用 #63043](https://github.com/openai/codex/issues/63043) · [工具列表加载最长 23 秒 #63019](https://github.com/openai/codex/issues/63019) · [会话工具报错 #63026](https://github.com/openai/codex/issues/63026)

### 3. 后台自动化与长任务可观测性
用户希望在同一聊天内定时检查独立运行的本地任务，并让定时操作不依赖当前选中的聊天。需求方向是持续、低打扰、可追踪的任务执行。  
相关：[原生每小时状态检查 #63071](https://github.com/openai/codex/issues/63071) · [后台浏览器操作 #63065](https://github.com/openai/codex/issues/63065)

### 4. 模型与额度策略的透明度
模型选择与实际路由是否一致、账户支持哪些模型、周额度用尽后剩余短周期额度能否使用，都影响开发者的资源规划。  
相关：[模型路由 #63068](https://github.com/openai/codex/issues/63068) · [账户模型支持 #63055](https://github.com/openai/codex/issues/63055) · [额度规则建议 #63067](https://github.com/openai/codex/issues/63067)

### 5. 安全检查的准确性与可解释性
多条报告涉及开发、代码审查及本地环境排障被安全检查阻断。需求重点是更准确地区分任务性质，并提供可理解的限制说明，而非简单放宽检查。  
相关：[应用开发受阻 #63053](https://github.com/openai/codex/issues/63053) · [代码审查受阻 #63049](https://github.com/openai/codex/issues/63049) · [VS Code 环境排障 #63072](https://github.com/openai/codex/issues/63072)

## 开发者关注点

- **优先确认“实际执行状态”。** UI 显示的权限、模型和工具状态，需要与运行时行为一致；否则开发者难以判断问题来自配置、账户策略还是客户端故障。相关：[权限 #63059](https://github.com/openai/codex/issues/63059)、[模型 #63068](https://github.com/openai/codex/issues/63068)。
- **长会话必须同时保证可恢复与语义连续。** 会话恢复失败会打断工作，旧指令在压缩后重新生效则可能造成任务偏移。相关：[恢复失败 #63061](https://github.com/openai/codex/issues/63061)、[上下文压缩 #63017](https://github.com/openai/codex/issues/63017)。
- **工具链需要端到端诊断。** OAuth 或初始化成功并不意味着工具已可供模型调用，应能区分认证、发现、注入会话和执行各阶段的问题。相关：[MCP #63070](https://github.com/openai/codex/issues/63070)。
- **桌面交互细节仍影响日常效率。** 项目固定状态重置、显示缩放裁切、预览时中断听写等反馈，说明工作流稳定性仍是重要需求。相关：[项目状态 #63064](https://github.com/openai/codex/issues/63064)、[缩放 #63051](https://github.com/openai/codex/issues/63051)、[听写 #63062](https://github.com/openai/codex/issues/63062)。

**总体判断：**本日样本更突出的是既有能力的可靠性与行为可预测性，而非单纯增加功能。后续应重点观察桌面端权限链路、OAuth MCP 工具可用性，以及相关改动是否进入正式发布。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报｜2026-11-22

> 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)。本次数据包含 1 个 Release、3 个 Issue 和 3 个 PR；以下按实际数量整理，不补足至 10 条。部分条目的更新时间为 11 月 21 日，按所提供的统计窗口纳入。

## 1. 今日速览

今日发布了新的 nightly 版本，但相邻版本标签的提交后缀相同，现有数据未显示新增功能或修复。社区讨论主要集中在 **ACP 与沙箱组合使用时的初始化阻塞**，以及两处文档失准问题；对应的文档修复 PR 均已提交，但仍处于开放状态。

## 2. 版本发布

### [v0.71.0-nightly.20261122.geecccfcd5](https://github.com/google-gemini/gemini-cli/releases/tag/v0.71.0-nightly.20261122.geecccfcd5)

- **发布类型**：nightly 预览版本。
- **已知变化**：发布说明仅提供版本对比链接，未列出具体更新内容。
- **分析**：前后两日标签均以 `geecccfcd5` 结尾，不能据此认定有新的代码变更，不宜将此次发布解读为功能升级。

链接：[完整版本对比](https://github.com/google-gemini/gemini-cli/compare/v0.71.0-nightly.20261121.geecccfcd5...v0.71.0-nightly.20261122.geecccfcd5)

## 3. 社区热点 Issues

当前仅有 3 条 Issue，均为 **OPEN / 待分诊**。互动量较低，以下按潜在影响排序，而非按热度排名。

### ① [#30398：启用沙箱后，`--acp` 不响应初始化请求](https://github.com/google-gemini/gemini-cli/issues/30398)

- **问题**：通过 `GEMINI_SANDBOX`、`--sandbox` 或 `tools.sandbox` 启用沙箱时，如果 ACP 客户端在进程启动后立即发送 `initialize`，CLI 不作响应；未启用沙箱时正常。
- **重要性**：可能阻断依赖 ACP 的客户端集成，使沙箱隔离与协议接入无法正常协同。
- **报告中的原因判断**：沙箱切换前，标准输入被当作管道提示词读取。该判断尚待维护者确认。
- **社区反应**：1 条评论、0 个 👍；所提供数据中暂无对应修复 PR。

### ② [#30396：文档仍推荐已移除的 `/shells`、`/bashes` 命令](https://github.com/google-gemini/gemini-cli/issues/30396)

- **问题**：教程与提示仍引用已经在 #22740 中移除的命令。
- **重要性**：用户按文档操作会遇到命令不可用，增加后台任务管理的学习与排障成本。
- **社区反应**：2 条评论、0 个 👍；已有对应修复 [PR #30397](https://github.com/google-gemini/gemini-cli/pull/30397)，尚未合并。

### ③ [#30394：System Prompt Override 指南存在失效锚点](https://github.com/google-gemini/gemini-cli/issues/30394)

- **问题**：“Persisting Environment Variables”链接指向 `authentication.mdx` 中不存在的锚点。
- **重要性**：影响系统提示词覆盖配置流程中的文档导航，尤其是环境变量持久化设置的查找。
- **社区反应**：2 条评论、0 个 👍；已有对应修复 [PR #30395](https://github.com/google-gemini/gemini-cli/pull/30395)，尚未合并。

## 4. 重要 PR 进展

本次提供的 3 个 PR 均为 **OPEN**，暂无合并记录；评论数量字段缺失，无法判断评审活跃度。

| PR | 内容与价值 | 当前进展 |
|---|---|---|
| [#30397：清理 `/shells` 过时文档](https://github.com/google-gemini/gemini-cli/pull/30397) | 删除已移除命令的残留引用。PR 说明指出，原功能已由基于快捷键的后台 shell 控制替代，有助于让教程与实际 CLI 行为保持一致。 | `size/s`；对应 Issue #30396，待评审合并。 |
| [#30395：修复环境变量持久化章节链接](https://github.com/google-gemini/gemini-cli/pull/30395) | 修复 System Prompt Override 指南中的失效锚点，恢复配置文档之间的导航。 | `size/xs`；对应 Issue #30394，待评审合并。 |
| [#30399：更新 nightly 版本号](https://github.com/google-gemini/gemini-cli/pull/30399) | 机器人提交的自动版本更新，将版本号调整为 `0.71.0-nightly.20261122.geecccfcd5`；不应视为独立功能变更。 | `size/s`、`status/need-issue`；仍开放。 |

## 5. 功能需求趋势

受样本量限制，今天更适合观察**质量改进方向**，不足以判断长期功能需求热度。

- **协议集成与沙箱兼容性**：ACP 初始化问题凸显启动流程、标准输入处理与沙箱切换之间的兼容性风险。对外部客户端集成而言，握手可靠性值得优先关注。  
  关联：[Issue #30398](https://github.com/google-gemini/gemini-cli/issues/30398)

- **文档与产品行为同步**：3 条 Issue 中有 2 条涉及文档准确性，说明本次反馈更集中于“现有能力能否被正确使用”，而非新增功能。  
  关联：[Issue #30396](https://github.com/google-gemini/gemini-cli/issues/30396)、[Issue #30394](https://github.com/google-gemini/gemini-cli/issues/30394)

- **后台任务操作入口的可发现性**：命令移除后，教程和提示仍未完全同步，反映出交互入口变更需要配套更新使用指引。  
  关联：[PR #30397](https://github.com/google-gemini/gemini-cli/pull/30397)

本次数据未提供足够证据支持新模型、性能或特定 IDE 集成需求正在升温。

## 6. 开发者关注点

1. **优先排查 ACP＋沙箱启动链路**  
   这是本次唯一直接阻断工作流的运行时问题。建议重点验证客户端立即发送 `initialize` 时的行为，以及不同沙箱启用方式是否一致。  
   链接：[Issue #30398](https://github.com/google-gemini/gemini-cli/issues/30398)

2. **减少“照文档操作却失败”的体验**  
   过时命令和失效锚点都会增加排障成本。命令移除时同步检查教程、提示与引用链接，是本次反馈体现出的明确维护需求。  
   链接：[Issue #30396](https://github.com/google-gemini/gemini-cli/issues/30396)、[Issue #30394](https://github.com/google-gemini/gemini-cli/issues/30394)

3. **关注修复是否落地，而非仅是否提交**  
   两项文档问题已有小规模修复 PR，但仍处于开放状态。用户需等待合并与文档更新，不能将其视为已经解决。  
   链接：[PR #30397](https://github.com/google-gemini/gemini-cli/pull/30397)、[PR #30395](https://github.com/google-gemini/gemini-cli/pull/30395)

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-22**  
**仓库：[github/copilot-cli](https://github.com/github/copilot-cli)**

> 本报基于提供的过去 24 小时数据：2 个版本、6 条 Issue、1 条 PR。Issue 与 PR 的可见更新时间均为 2026-11-21；因数据量不足，以下列出全部相关条目，不补足至 10 条。部分发布说明被截断，按可确认内容汇总。

## 1. 今日速览

Copilot CLI 发布 **v1.0.115-5 和 v1.0.115-6**，重点改善长时间本地会话的磁盘占用与恢复速度，并修复插件安装重试、未登录时 `/delegate` 无反馈等问题。社区反馈主要集中在**复杂网络兼容性、Agent 工具可用性及会话生命周期管理**；安装脚本误选旧预发布版本的问题已有修复 PR，但尚未合并。

## 2. 版本发布

### [v1.0.115-6](https://github.com/github/copilot-cli/releases/tag/v1.0.115-6)
- **组织插件安装恢复**：临时策略变化导致组织强制插件安装中断后，可在下一次尝试时重新安装，无需等待常规重试延迟。
- **登录状态提示**：未登录时执行 `/delegate`，现在会明确提示需要登录，而不是无响应。
- **信息不完整**：另有一项 Unix 下取消 shell 命令相关修复，但原始说明被截断，无法确认具体行为。

**影响**：提升组织策略环境下的安装恢复能力，减少命令无反馈造成的排障成本。

### [v1.0.115-5](https://github.com/github/copilot-cli/releases/tag/v1.0.115-5)
- **会话性能**：长时间运行的本地会话占用更少磁盘空间，恢复更快。
- **路由状态反馈**：排队从指定模型切换至 Copilot Fusion 时，CLI 会确认所请求的路由配置，而不再显示此前配置。

**影响**：改善长会话体验，并降低模型切换时的状态歧义。

## 3. 社区热点 Issues

本批数据总体互动较少，以下按潜在影响和排障价值排序，**不代表已形成广泛社区共识**。所有条目均为 **OPEN / triage**。

| Issue | 核心问题与重要性 | 社区反应 |
|---|---|---|
| [#5544：Surge Fake-IP 环境下 `web_fetch` 仍拒绝公共 URL](https://github.com/github/copilot-cli/issues/5544) | 用户报告 macOS Surge Enhanced Mode / Fake-IP DNS 环境下，稳定版 1.0.114 仍会拒绝公共 HTTPS URL；此前相关问题 #5180 已关闭。值得关注既有修复的覆盖范围及此类 DNS 环境兼容性。 | **2 条评论、0 👍**，是本批讨论最多的条目；尚未确认解决。 |
| [#5550：`gh` 在 PATH 中时，自定义 Agent 无法使用内置 GitHub MCP 读取工具](https://github.com/github/copilot-cli/issues/5550) | 报告称，即使 Agent 显式声明相关工具，也无法通过内置 MCP 读取 GitHub Issues。可能影响依赖 GitHub 数据的自动化工作流。 | **0 条评论、0 👍**，仍待分诊与验证。 |
| [#5543：嵌套子 Agent 无法进行多轮交互](https://github.com/github/copilot-cli/issues/5543) | 用户报告子 Agent 创建的子 Agent 会忽略 `background` 模式，且无法通过 `write_agent` 接收后续消息。若属实，将限制多层 Agent 协作与任务编排。 | **0 条评论、0 👍**，尚无可见维护者结论。 |
| [#5546：受管网络下访问 Copilot API 出现 TLS 握手失败](https://github.com/github/copilot-cli/issues/5546) | 企业过滤网络中，启动及模型发现请求遭遇 `handshake_failure`，Windows Schannel 返回相关错误。该问题可能直接阻断 CLI 使用，但现有信息不足以确定根因。 | **0 条评论、0 👍**，需进一步定位网络与 TLS 环境。 |
| [#5547：`VERSION=prerelease` 安装到比稳定版更旧的构建](https://github.com/github/copilot-cli/issues/5547) | 安装脚本按 Git 标签版本排序取末项，可能在稳定版发布后选中同版本的旧预发布包，影响安装结果的可预期性。 | **0 条评论、0 👍**；已有配套修复 PR [#5548](https://github.com/github/copilot-cli/pull/5548)。 |
| [#5549：增加会话恢复与挂起工具](https://github.com/github/copilot-cli/issues/5549) | 提议加入 `resume_session`、`suspend_session`，并在 Sessions 侧栏增加挂起操作，以便释放活跃会话资源并稍后恢复。 | **0 条评论、1 👍**，是本批唯一获得点赞的 Issue，但支持样本仍小。 |

## 4. 重要 PR 进展

### [#5548：修正安装脚本对稳定版与预发布版的排序](https://github.com/github/copilot-cli/pull/5548)
- **状态**：OPEN，尚未合并。
- **作者**：mohitmishra786。
- **关联问题**：[#5547](https://github.com/github/copilot-cli/issues/5547)。
- **修复内容**：调整安装时的标签排序，使稳定版本排在其预发布版本之后，避免 `VERSION=prerelease` 在特定发布窗口选中旧构建。
- **价值**：提高安装版本选择的准确性，减少“选择预发布渠道却安装到更旧版本”的混淆。
- **信息限制**：提供的数据未包含可用评论数，也未提供评审、测试或合并结果。

本批仅有此 1 条 PR，暂无其他 PR 进展可报告。

## 5. 功能需求趋势

从这 6 条 Issue 看，关注方向更偏向**可靠性与工作流完整性**，而非新模型或 IDE 集成。

- **会话生命周期管理**：希望 Agent 和用户都能主动挂起、恢复会话，兼顾资源释放与上下文延续。相关：[#5549](https://github.com/github/copilot-cli/issues/5549)。
- **更完整的多 Agent 协作**：嵌套子 Agent 需要具备与顶层子 Agent 一致的后台运行和多轮通信能力。相关：[#5543](https://github.com/github/copilot-cli/issues/5543)。
- **自定义 Agent 的工具可用性**：工具声明与运行时实际能力需要保持一致，避免环境中存在 `gh` 时出现能力差异。相关：[#5550](https://github.com/github/copilot-cli/issues/5550)。
- **复杂网络适配**：Fake-IP DNS 与企业过滤网络均出现访问故障，显示非标准网络环境仍是兼容性关注点。相关：[#5544](https://github.com/github/copilot-cli/issues/5544)、[#5546](https://github.com/github/copilot-cli/issues/5546)。
- **安装渠道可预测性**：版本排序与渠道选择应可靠，避免升级、复现和排障时使用非预期构建。相关：[#5547](https://github.com/github/copilot-cli/issues/5547)。

## 6. 开发者关注点

1. **优先排查阻断性网络问题**：启动失败与网页抓取失败影响不同链路，应分别核查 TLS、网络过滤及 DNS 解析环境；当前不宜归为同一根因。[#5546](https://github.com/github/copilot-cli/issues/5546) · [#5544](https://github.com/github/copilot-cli/issues/5544)
2. **验证 Agent 能力边界**：依赖自定义 Agent 或嵌套子 Agent 的项目，应验证 GitHub 工具访问、后台模式与后续消息是否符合预期。[#5550](https://github.com/github/copilot-cli/issues/5550) · [#5543](https://github.com/github/copilot-cli/issues/5543)
3. **关注长会话的资源与恢复体验**：新版本已改善磁盘占用和恢复速度，但主动挂起、程序化恢复仍属于社区提出的需求，不能视为已支持。[版本说明](https://github.com/github/copilot-cli/releases/tag/v1.0.115-5) · [#5549](https://github.com/github/copilot-cli/issues/5549)
4. **预发布安装后核对实际版本**：安装排序修复尚未合并，使用 `VERSION=prerelease` 时应确认最终安装版本，避免影响问题复现与版本比较。[#5547](https://github.com/github/copilot-cli/issues/5547) · [#5548](https://github.com/github/copilot-cli/pull/5548)

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**2026-11-22｜[anomalyco/opencode](https://github.com/anomalyco/opencode)**

## 今日速览

过去 24 小时无新 Release，开发动态主要集中在**多模态输入、模型接入与 v2 稳定性**：音视频文件读取、Google Antigravity Provider 等 PR 正在推进。社区反馈则暴露出 Windows 交互与可观测性、MCP 协议兼容、会话迁移及权限边界等问题，其中远程清理命令和“始终允许”权限规则值得优先审查。

> **数据说明：**本日报基于提供的 30 条 Issue、20 条 PR 摘要筛选，不代表全部更新记录。`CLOSED` 仅表示已关闭，不能据此确认已修复或合并；PR 评论数缺失，不据此判断讨论热度。

## 社区热点 Issues

当前样本讨论量较低，最高为 4 条评论；以下综合影响范围、风险与讨论量选取。

| Issue | 重要性与社区反应 |
|---|---|
| **[远程清理命令的路径安全风险 #65495](https://github.com/anomalyco/opencode/issues/65495)** | **OPEN · 1 评论。** Windows 间通过 SSH 执行 PowerShell 清理时，带空格路径的引号处理可能引入盘符根目录操作数。虽标为功能需求，但涉及递归删除的安全边界，应优先核查；摘要未说明是否实际造成数据损失。 |
| **[MCP 初始化遇到 HTTP 202 时连接失败 #65473](https://github.com/anomalyco/opencode/issues/65473)** | **OPEN · 2 评论 · reproduced。** 远端服务器对 `notifications/initialized` 返回无正文、无 `Content-Type` 的 `202 Accepted` 后，客户端报错。这直接影响 Streamable HTTP MCP 服务兼容性，且已有复现标签。 |
| **[v1→v2 迁移后会话存在但消息为空 #65497](https://github.com/anomalyco/opencode/issues/65497)** | **CLOSED · 1 评论。** 用户报告从 1.18.34 升级到 2.3.2 后，会话列表可见但打开无消息，迁移完成标记又阻止修复。关系到升级可靠性与历史记录可访问性；关闭原因及恢复结果未提供。 |
| **[Windows Desktop 静默退出且无关闭日志 #65501](https://github.com/anomalyco/opencode/issues/65501)** | **OPEN · 2 评论。** 窗口消失后托管服务仍运行，日志无法区分正常退出、崩溃或外部终止。核心诉求是补足生命周期记录，降低故障排查成本。 |
| **[后台 shell 已完成但状态仍为 running #65438](https://github.com/anomalyco/opencode/issues/65438)** | **OPEN · 4 评论。** 完成通知作为独立消息保存，原工具调用状态却未更新，导致持久化历史与实际执行结果不一致。是展示样本中讨论最多的议题之一，影响任务追踪可信度。 |
| **[Windows TUI 的 Escape 无法关闭界面 #65456](https://github.com/anomalyco/opencode/issues/65456)** | **OPEN · 3 评论。** v2.3.2 中命令面板、子代理输入面板无法通过 Escape 关闭，但其他导航键仍有效。影响高频键盘操作，已有跨终端场景反馈。 |
| **[禁用标签页后仍恢复旧会话 #65457](https://github.com/anomalyco/opencode/issues/65457)** | **CLOSED · 4 评论。** macOS TUI 在 `/exit` 后重启仍恢复旧标签，与用户设置不符。讨论量并列最高，反映会话持久化行为与配置预期之间的偏差；不能仅凭关闭状态判断已修复。 |
| **[Copilot 路由错误宣告 PDF 支持 #65490](https://github.com/anomalyco/opencode/issues/65490)** | **OPEN · 1 评论 · repro-simulated。** 经 `/chat/completions` 路由的模型接收 PDF 时返回 HTTP 400，说明模型能力标记与实际接口能力不匹配。已有对应修复 PR，具备明确跟进路径。 |
| **[macOS CLI 内存占用过高 #65496](https://github.com/anomalyco/opencode/issues/65496)** | **OPEN · 1 评论 · 👍1。** 用户反馈 v2.2.5 在多实例使用时内存消耗过高。是展示样本中唯一获得点赞的 Issue，但暂无量化数据，尚不足以判断影响范围或根因。 |
| **[子代理连接被拒后仍重试约 80 秒 #65447](https://github.com/anomalyco/opencode/issues/65447)** | **CLOSED · 3 评论。** 用户报告端点返回 `ECONNREFUSED` 后仍进行 10 次退避重试，错误很晚才显示。重点在重试策略与等待期间的反馈，而非简单认定所有连接拒绝都不应重试。 |

## 重要 PR 进展

以下按功能价值与风险排序，**不将关闭状态视为已合并或已发布**。

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| **[支持读取音频与视频文件 #65503](https://github.com/anomalyco/opencode/pull/65503)** | OPEN | 为多模态模型增加音视频文件附件支持，覆盖既有音视频输入需求，有望拓展代码之外的素材分析工作流。 |
| **[模型回答前中断可取回提示词 #65505](https://github.com/anomalyco/opencode/pull/65505)** | OPEN | 针对“刚发送就想修改”的场景，允许在模型回答前中断并取回提示词，减少无效会话记录与重复输入。 |
| **[新增 Google Antigravity Provider #65489](https://github.com/anomalyco/opencode/pull/65489)** | OPEN | 提交通过 ACP 路径接入 Antigravity 的实现；本次将 Provider 接入从此前混合改动中拆分，便于独立评审。 |
| **[限制 Copilot `/chat/completions` 的 PDF 输入 #65492](https://github.com/anomalyco/opencode/pull/65492)** | OPEN | 对应 #65490，禁用不受该路由支持的 PDF 输入，避免能力误报导致 HTTP 400。属于兼容性收敛，而非新增 PDF 支持。 |
| **[防止“始终允许”保存过宽提权通配符 #65467](https://github.com/anomalyco/opencode/pull/65467)** | OPEN | 修复提权包装命令的授权范围问题，避免一次确认扩大为允许该包装器下的所有命令，是本期最值得关注的安全修复之一。 |
| **[修复 Windows 文件变更事件的路径匹配 #65469](https://github.com/anomalyco/opencode/pull/65469)** | OPEN | 处理文件监听事件中的反斜杠路径，修复应用未正确重新加载文件的问题，改善 Windows 编辑反馈链路。 |
| **[修复 Bedrock 推理配置 ARN 的 Claude 识别 #65472](https://github.com/anomalyco/opencode/pull/65472)** | OPEN | 改善 application inference profile ARN 场景下的模型识别，避免仅靠 ID 是否包含 `anthropic` 判断 Claude/Nova 所带来的错误。 |
| **[修复 transition 内标签状态未持久化 #65488](https://github.com/anomalyco/opencode/pull/65488)** | OPEN | 解决 `startTransition` 内修改持久化状态时，保存定时器提前运行、状态可能长期未落盘的问题。 |
| **[从 models.dev 动态列出语音模型 #65491](https://github.com/anomalyco/opencode/pull/65491)** | CLOSED | 将服务端语音模型来源从固定表转向模型目录，降低新模型必须等待服务端发版的耦合；是否合并需进一步确认。 |
| **[统一 OpenCode Go 连接入口 #65466](https://github.com/anomalyco/opencode/pull/65466)** | CLOSED | 提议让新用户通过统一 OpenCode 连接入口使用 Go，无需在 Console 与 Go 之间选择，简化首次配置流程；发布状态未提供。 |

## 功能需求趋势

### 1. 桌面端向完整开发工作台扩展
需求涉及跨项目保留终端工具和笔记、移动模拟器工作区、远程浏览器查看，以及将代码审阅衔接到提交和 PR 检查。**需要注意，这组需求主要来自同一位贡献者，尚不能视为广泛社区共识。**  
代表：[持久化工具工作区 #65486](https://github.com/anomalyco/opencode/issues/65486)、[原生移动开发工作区 #65480](https://github.com/anomalyco/opencode/issues/65480)、[审阅到提交/PR 的衔接 #65484](https://github.com/anomalyco/opencode/issues/65484)。

### 2. 会话与工作区需要更强的组织、检索和清理能力
用户开始关注长期积累后的管理成本：会话分类与可见性、外部 Agent 历史搜索、可预览的 worktree 清理，说明需求不再局限于单次对话。  
代表：[会话自定义分类 #65504](https://github.com/anomalyco/opencode/issues/65504)、[搜索外部 Agent 记录 #65482](https://github.com/anomalyco/opencode/issues/65482)、[worktree 清理策略 #65483](https://github.com/anomalyco/opencode/issues/65483)。

### 3. 扩展生态强调可管理性与本地化
社区既在分享离线语音输入方案，也提出技能安装凭据、版本固定和回滚需求，体现出对隐私、可复现配置及升级可控性的关注。  
代表：[本地 GPU 语音输入 #65499](https://github.com/anomalyco/opencode/issues/65499)、[技能安装记录与回滚 #65485](https://github.com/anomalyco/opencode/issues/65485)。

### 4. 自托管与多 Agent 协作需求继续出现
Kubernetes 用户希望服务认证可适配已有认证代理；多工具用户则希望以稳定身份启动、恢复 Codex CLI worker。前者涉及部署信任边界，后者涉及跨 Agent 任务生命周期管理。  
代表：[认证代理后的服务运行方式 #65500](https://github.com/anomalyco/opencode/issues/65500)、[Codex CLI worker 身份管理 #65481](https://github.com/anomalyco/opencode/issues/65481)。

## 开发者关注点

- **先保证安全边界，再减少确认操作。** 提权授权规则不能过度泛化，远程递归删除也需要更严格的路径保护。建议重点跟进 [PR #65467](https://github.com/anomalyco/opencode/pull/65467) 与 [Issue #65495](https://github.com/anomalyco/opencode/issues/65495)。
- **状态与日志必须反映真实执行结果。** 后台任务完成却显示运行中、桌面退出却无记录，都会显著增加排障成本。参见 [#65438](https://github.com/anomalyco/opencode/issues/65438)、[#65501](https://github.com/anomalyco/opencode/issues/65501)。
- **模型支持需要精确到路由和协议。** “模型支持某种输入”不等于当前 API 路径支持；MCP 的空响应也需要正确处理。参见 [#65490](https://github.com/anomalyco/opencode/issues/65490)、[#65473](https://github.com/anomalyco/opencode/issues/65473)。
- **升级与持久化应优先验证。** 升级前备份会话数据，升级后检查历史消息、标签恢复及状态落盘；当前摘要不足以确认相关问题已有可用修复。参见 [#65497](https://github.com/anomalyco/opencode/issues/65497)、[PR #65488](https://github.com/anomalyco/opencode/pull/65488)。
- **性能问题需要可量化复现。** 内存反馈应补充实例数、会话规模与资源曲线；重试等待则需区分瞬态故障和持续配置错误，并改善用户提示。参见 [#65496](https://github.com/anomalyco/opencode/issues/65496)、[#65447](https://github.com/anomalyco/opencode/issues/65447)。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-22

## 1. 今日速览

今日未见新版本发布，讨论主要集中在 **Agent 会话可靠性、上下文压缩与估算、工具调用一致性**，同时出现 Gemini 思考等级适配和终端多图渲染问题。PR 侧值得关注的是压缩摘要预算与上下文 Token 估算两项修正，但提供的数据仅显示 PR 已关闭，**不能据此确认已合并或发布**。

> **数据口径**：本报依据所提供的 12 条 Issue、3 条 PR 编写；部分条目的更新时间为 11 月 21 日。来源标题标注为 `badlogic/pi-mono`，条目链接则指向 `earendil-works/pi`，以下按条目所示仓库生成链接。

## 2. 社区热点 Issues

以下 10 条均显示为 **CLOSED、带 `untriaged` 标签、1 条评论、0 个 👍**。由于没有评论正文，无法判断关闭原因或维护者态度；下列排序依据技术影响，而非互动热度，**关闭也不等于问题已修复**。

| Issue | 核心问题与重要性 |
|---|---|
| **[#12391 Gemini `xhigh` 思考等级报错](https://github.com/earendil-works/pi/issues/12391)** | 用户报告 `gemini-4-neon` 在 `xhigh` 配置下立即失败，涉及模型元数据与 Google 思考等级映射不一致。直接影响新模型可用性，也提示模型目录与适配层需要同步校验。 |
| **[#12386 磁盘写入中断导致会话追加内容丢失](https://github.com/earendil-works/pi/issues/12386)** | 用户报告磁盘空间或配额耗尽后，下一次追加写入会与残缺记录粘连，重新加载时丢失。属于会话持久化与数据完整性风险，尤其值得容器和受限存储环境关注。 |
| **[#12382 错误分类与工具取消状态不准确](https://github.com/earendil-works/pi/issues/12382)** | 反馈部分 429、5xx、配额错误会被误判为上下文溢出，同时 codemode 可能将仍在执行的调用标记为取消。错误分类失真可能触发不恰当的恢复流程；提交者称已有本地补丁。 |
| **[#12383 Kimi 恢复会话无法选择部分工具](https://github.com/earendil-works/pi/issues/12383)** | 用户报告恢复后的会话无法调用部分已出现在工具配置、系统提示和请求载荷中的工具，而新会话正常。关键在于会话恢复后的工具可用性一致性，具体根因尚不能从摘要确认。 |
| **[#12381 压缩摘要预算未随上下文窗口扩展](https://github.com/earendil-works/pi/issues/12381)** | 指出 `reserveTokens` 同时承担压缩触发阈值与摘要预算两种职责，使默认摘要预算约为 13k Tokens。大上下文模型未必能获得相应的摘要容量，已有配套 PR 提议调整。 |
| **[#12377 增加只读 `/context` 检查器](https://github.com/earendil-works/pi/issues/12377)** | 希望查看系统提示、工具定义、历史记录的 Token 占用，以及缓存未命中成本和压缩距离。直接回应长会话“变慢、变贵但难以定位原因”的可观测性缺口。 |
| **[#12385 按指定 run 条件中止执行](https://github.com/earendil-works/pi/issues/12385)** | 希望只在目标 run 仍在运行时执行中止，并返回撤回内容。对异步编排尤其重要，可降低旧取消请求误伤新一轮执行的竞态风险。 |
| **[#12387 为重名扩展工具提供来源限定名称](https://github.com/earendil-works/pi/issues/12387)** | 提议工具重名时使用 `<plugin>__<tool>` 注册，而不是让扩展加载失败。反映多扩展组合使用中的命名空间需求，但目前仅能确认这是功能提议。 |
| **[#12388 允许 `prepareArguments` 返回完整工具结果](https://github.com/earendil-works/pi/issues/12388)** | 希望参数预处理拒绝执行时，能保留完整工具结果，而非统一转换为缺少详情的错误。价值在于保留结构化反馈，改善模型后续纠错和工具交互。 |
| **[#12384 Kitty 全屏模式下多张图片重叠](https://github.com/earendil-works/pi/issues/12384)** | 用户报告单个工具结果包含多张图片时，图片锚点和行高分配异常，导致重叠并遮挡对话。影响终端多模态工作流的可读性。 |

## 3. 重要 PR 进展

**本次数据仅包含 3 条 PR，因此全部列出，不补足为 10 条。** 三者均标记为 CLOSED，未提供合并状态；评论字段为 `undefined`，不能视为零评论。

### ① [#12380 按模型上下文窗口设置压缩摘要预算](https://github.com/earendil-works/pi/pull/12380)

- **拟议修改**：将摘要输出预算从 `0.8 × reserveTokens`，改为：
  `max(1, min(10% × contextWindow, model.maxTokens))`。
- **意义**：让摘要容量随模型上下文窗口扩展，同时受模型输出上限约束，减少摘要预算与压缩触发预留量的耦合。
- **关联**：对应 [Issue #12381](https://github.com/earendil-works/pi/issues/12381)。

### ② [#12378 上下文编辑后保留基于实际 usage 的估算](https://github.com/earendil-works/pi/pull/12378)

- **拟议修复**：避免仅因存在更新的 `context_edit` 或压缩记录，就丢弃提供商实际 usage 支持的上下文估算，尤其针对仅移除失败溢出恢复尝试的情况。
- **意义**：提高上下文占用估算稳定性，为压缩和溢出判断提供更可靠的依据。

### ③ [#12390 Fork/tooling](https://github.com/earendil-works/pi/pull/12390)

- **已知信息**：当日创建并关闭。
- **信息限制**：没有摘要或变更内容，无法判断具体功能、修复范围及技术影响。

## 4. 功能需求趋势

### 上下文管理：从“自动压缩”走向“可解释、可配置”
社区不仅关注何时压缩，也开始要求摘要容量合理、Token 估算可信、占用结构可见。这是本批反馈中最集中的方向。  
关联：[摘要预算 #12381](https://github.com/earendil-works/pi/issues/12381)、[上下文检查器 #12377](https://github.com/earendil-works/pi/issues/12377)。

### Agent 生命周期与会话可靠性
持久化失败恢复、恢复会话的工具行为、精确取消正在成为重要诉求，体现出对长时间运行和异步编排场景的关注。  
关联：[写入完整性 #12386](https://github.com/earendil-works/pi/issues/12386)、[恢复会话 #12383](https://github.com/earendil-works/pi/issues/12383)、[条件中止 #12385](https://github.com/earendil-works/pi/issues/12385)。

### 扩展生态需要更清晰的工具契约
工具命名冲突和参数预处理结果传递问题，指向扩展组合能力与结构化错误反馈两类需求。  
关联：[工具命名空间 #12387](https://github.com/earendil-works/pi/issues/12387)、[工具结果透传 #12388](https://github.com/earendil-works/pi/issues/12388)。

### 模型适配需要同时覆盖配置与展示
除了思考等级映射，用户还反馈 Anthropic 4.5 别名仍标注“latest”，可能误导模型选择。模型目录准确性与调用兼容性同样重要。  
关联：[Gemini 配置 #12391](https://github.com/earendil-works/pi/issues/12391)、[模型标签 #12379](https://github.com/earendil-works/pi/issues/12379)。

### 终端渲染仍有边界场景待打磨
多图布局之外，未闭合的货币符号 `$` 被当作公式起点、导致后续粗体显示为原始文本的问题，也说明 Markdown、LaTeX 与普通文本混排仍需加强鲁棒性。  
关联：[多图渲染 #12384](https://github.com/earendil-works/pi/issues/12384)、[货币符号解析 #12389](https://github.com/earendil-works/pi/issues/12389)。

## 5. 开发者关注点

- **优先保护会话数据**：应重点验证存储写满、配额耗尽后的追加写入与重新加载行为。[#12386](https://github.com/earendil-works/pi/issues/12386)
- **区分真实失败原因**：限流、服务异常、配额不足与上下文溢出需要分别处理，避免恢复策略偏离问题本身。[#12382](https://github.com/earendil-works/pi/issues/12382)
- **让长会话成本可诊断**：仅显示总 Token 不足以解释延迟与费用，需要更细的上下文分解和压缩状态。[#12377](https://github.com/earendil-works/pi/issues/12377)
- **验证恢复前后的行为一致性**：工具出现在请求载荷中，并不代表恢复会话中的实际调用能力已得到验证。[#12383](https://github.com/earendil-works/pi/issues/12383)
- **不要将关闭状态当作交付信号**：涉及关键修复时，仍需核对合并记录、实际代码和后续版本说明，例如摘要预算调整。[#12380](https://github.com/earendil-works/pi/pull/12380)

**总体判断：**本批反馈的重心不是新增交互入口，而是让 Pi 在长会话、多扩展和异常条件下更可靠、更可观测；这一判断基于议题分布，不代表已形成高互动量的社区共识。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-11-22｜仓库：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

## 1. 今日速览

今日重点集中在**上下文恢复可靠性、Daemon 稳定性与 Web Shell 会话管理**：工具输出恢复句柄丢失被列为 P1 问题，已有修复 PR；持续高负载下暂停创建新会话的后端与界面方案也已提交。用户侧反馈则集中于 Windows UNC/WSL 权限规则、Linux 非 ASCII 渲染及推理开关兼容性，同时发布了一个 nightly 版本。

> 数据口径：过去 24 小时有 16 条 Issue、49 条 PR 更新，PR 仅提供其中 20 条；PR 评论数均缺失，因此不据此判断热度。下文严格区分 OPEN 与 CLOSED，**CLOSED 不等同于已合并**。

## 2. 版本发布

### [v0.28.3-nightly.20261121.56ef346859](https://github.com/QwenLM/qwen-code/releases/tag/v0.28.3-nightly.20261121.56ef346859)

- 已知变更包括：手动重新评审时使用实时运行的 review bot，相关 [PR #17848](https://github.com/QwenLM/qwen-code/pull/17848)。
- 发布说明还出现 managed-agent CI 稳定性调整，但原始文本被截断，无法确认完整内容。
- **判断：**从可见信息看，本次主要涉及评审与 CI 流程维护，尚无充分信息证明包含显著的用户侧功能更新。

## 3. 社区热点 Issues

以下按影响范围、优先级及反馈代表性选取。所选条目均为 OPEN，点赞均为 0；“社区反应”主要依据评论数和关联 PR，不代表广泛共识。

| Issue | 为什么值得关注 | 社区反应与进展 |
|---|---|---|
| **[#18042：恢复句柄丢失与 web_fetch 回归](https://github.com/QwenLM/qwen-code/issues/18042)** · P1 | 媒体剥离会丢失恢复句柄，成功的网页抓取也存在句柄回归，影响工具输出在后续上下文中的可恢复性。 | 3 条评论；已提出修复 [#18045](https://github.com/QwenLM/qwen-code/pull/18045)，是今日最高优先级问题。 |
| **[#18043：保护 web_fetch 二进制溢出内容](https://github.com/QwenLM/qwen-code/issues/18043)** · P2 | 跟踪仅含二进制内容的外置结果被微压缩清理的问题，关系到 token 管理与内容保留边界。 | 3 条评论，标记 `ready-for-agent`；属于此前评审延后处理项。 |
| **[#18055：Daemon 被 SIGKILL 后的会话恢复测试不稳定](https://github.com/QwenLM/qwen-code/issues/18055)** · P2 | 覆盖异常终止后列出并继续会话的关键路径，需要区分测试时序问题与真实恢复缺陷。 | 3 条评论，自动修复进行中；已有 [#18057](https://github.com/QwenLM/qwen-code/pull/18057)。 |
| **[#18053：空闲计时器重置测试不稳定](https://github.com/QwenLM/qwen-code/issues/18053)** · P2 | 验证已获准的变更操作能否重置空闲计时器，关系到会话是否被过早挂起。 | 3 条评论，自动修复进行中；已有 [#18056](https://github.com/QwenLM/qwen-code/pull/18056)。 |
| **[#18030：工作区与 Git worktree 共享自动记忆](https://github.com/QwenLM/qwen-code/issues/18030)** · P2 | 当前各 worktree 的项目记忆隔离，可能让修复分支中积累的经验无法回流到主工作区。 | 3 条评论，标记 `need-discussion`；共享范围与隔离策略仍待讨论。 |
| **[#18068：Linux TUI 非 ASCII 字符显示异常](https://github.com/QwenLM/qwen-code/issues/18068)** · P2 | 西里尔字符等 UTF-8 文本被显示为逐字节十六进制转义，直接影响非英语用户可读性。报告称传给模型的文本仍完整。 | 2 条评论；当前数据未显示对应修复 PR。 |
| **[#18059：UNC/WSL 路径的 Always Allow 规则无法匹配](https://github.com/QwenLM/qwen-code/issues/18059)** · P2 | 保存权限规则时丢失 UNC 根路径语义，导致“始终允许”实际上不生效。 | 2 条评论；已有修复 [#18060](https://github.com/QwenLM/qwen-code/pull/18060)。 |
| **[#18015：部分推理后端的 Thinking 开关无效](https://github.com/QwenLM/qwen-code/issues/18015)** · P2 | 报告指出，相关 SGLang/vLLM 场景只认 `chat_template_kwargs.enable_thinking`，界面切换可能未改变实际推理行为。 | 2 条评论，标记 `ready-for-human`；涉及客户端参数与后端协议对齐。 |
| **[#18061：支持 `/theme <name>`](https://github.com/QwenLM/qwen-code/issues/18061)** · P3 | 希望直接指定主题、补全名称，并对未知名称报错，避免参数被静默忽略。 | 2 条评论；作者已提交实现 [#18062](https://github.com/QwenLM/qwen-code/pull/18062)。 |
| **[#18033：Web Shell 直达会话时缺少置顶提示条](https://github.com/QwenLM/qwen-code/issues/18033)** · P3 | 新标签页、刷新或书签打开会话时不显示提示条，仅站内导航后出现，暴露初始化路径差异。 | 2 条评论；当前数据未显示对应修复 PR。 |

## 4. 重要 PR 进展

以下 10 项均为 **OPEN**，属于待评审或推进中的变更，不能视为已发布能力。

| PR | 功能或修复内容 | 关注价值 |
|---|---|---|
| **[#18045：保留响应处理中的恢复句柄](https://github.com/QwenLM/qwen-code/pull/18045)** | 微压缩剥离嵌套媒体时保留恢复元数据，并纠正成功网页抓取对原始页面产物与生成摘要的处理。 | 对应 P1 回归，优先关注验证结果。 |
| **[#18052：持续高负载下拒绝创建新会话](https://github.com/QwenLM/qwen-code/pull/18052)** | 采样每核负载和事件循环延迟，连续超过阈值后限制新子进程创建。 | 引入负载准入机制，旨在避免主机过载进一步恶化。 |
| **[#18054：Web Shell 显示过载提示并暂停任务创建](https://github.com/QwenLM/qwen-code/pull/18054)** | 在侧栏展示警告及原因，并禁用任务创建入口。 | 与后端准入控制配套，让用户理解为何暂时无法创建任务。 |
| **[#18066：将 ChatSurface 锁限定到所属会话](https://github.com/QwenLM/qwen-code/pull/18066)** | 为提交锁及准入状态未明时的载荷锁引入会话归属，并绑定 `loadOlder`。 | 降低切换会话时状态串扰风险，推进共享聊天界面的切换准备。 |
| **[#18060：保留 Always Allow 规则中的 UNC 根路径](https://github.com/QwenLM/qwen-code/pull/18060)** | 修复网络共享目录与 WSL 路径保存后无法匹配文件的问题。 | 改善 Windows 混合开发环境中的权限体验。 |
| **[#18057：稳定 SIGKILL 重启恢复测试](https://github.com/QwenLM/qwen-code/pull/18057)** | 杀死 Daemon 前等待提示词确实持久化，替换不能保证断言前提的间接信号。 | 使测试更准确地检验持久化恢复能力。 |
| **[#18056：稳定空闲计时器测试](https://github.com/QwenLM/qwen-code/pull/18056)** | 同比例扩大空闲窗口与等待时间，保持原验证关系。 | 减少调度波动导致的误报；仍需确认未掩盖真实缺陷。 |
| **[#18062：允许 `/theme` 接受主题名称](https://github.com/QwenLM/qwen-code/pull/18062)** | 支持内置、自定义主题及 `auto`，忽略大小写、保存并即时应用，未知名称报错。 | 提升命令一致性与主题切换效率。 |
| **[#18064：为 `/verify-pr` 增加执行审批预检](https://github.com/QwenLM/qwen-code/pull/18064)** | 在创建产物或运行不可信 PR 代码前，验证显式选择的主机或 VM 执行方式。 | 强化本地评审工作流的执行边界。 |
| **[#18058：重构 managed-agent 身份标识存储](https://github.com/QwenLM/qwen-code/pull/18058)** | 以有长度预算的文本身份列和可逆规范引用替代身份哈希键层。 | 涉及托管服务的数据模型、身份可追踪性与存储约束，值得重点审查。 |

## 5. 功能需求趋势

本批 Issue 样本主要体现以下方向，**尚未出现足以支持“IDE 集成成为热点”的证据**。

- **跨 worktree 的项目知识连续性。** 用户希望自动记忆跟随同一项目复用，而不是随工作目录拆散；关键设计问题是共享收益与上下文隔离之间的平衡。  
  相关：[ #18030](https://github.com/QwenLM/qwen-code/issues/18030)

- **长会话导航与界面状态一致性。** Web Shell 用户既希望置顶提示条在直达、刷新时可靠显示，也希望点击后跳转至原消息，需求从“展示上下文”延伸到“快速定位”。  
  相关：[ #18033](https://github.com/QwenLM/qwen-code/issues/18033)、[#18017](https://github.com/QwenLM/qwen-code/issues/18017)

- **CLI 快捷操作与参数反馈。** `/theme <name>` 反映出用户期待命令具备一致的直接调用方式，并避免无效参数被静默忽略。  
  相关：[ #18061](https://github.com/QwenLM/qwen-code/issues/18061)

- **模型推理控制的真实可用性。** 关注点不只是支持某个模型，而是 Thinking 等控制是否真正映射到推理服务认可的参数。  
  相关：[ #18015](https://github.com/QwenLM/qwen-code/issues/18015)

- **跨平台、跨语言体验完善。** Windows 网络路径权限与 Linux UTF-8 显示问题表明，开发环境适配仍是基础体验中的重要短板。  
  相关：[ #18059](https://github.com/QwenLM/qwen-code/issues/18059)、[#18068](https://github.com/QwenLM/qwen-code/issues/18068)

## 6. 开发者关注点

1. **压缩上下文不能牺牲恢复能力。** 恢复句柄、外置内容和摘要产物的语义必须一致；当前已有 P1 合并后回归需要跟进。  
   参考：[ #18042](https://github.com/QwenLM/qwen-code/issues/18042)、[#18043](https://github.com/QwenLM/qwen-code/issues/18043)

2. **CI 需要准确区分“不稳定测试”和“真实缺陷”。** 重启恢复相关问题多次出现，其中 [#18051](https://github.com/QwenLM/qwen-code/issues/18051) 已按重复关闭；巡检明确要求，若同一提交重复稳定失败，不应简单按 deflake 处理。  
   参考：[ #18055](https://github.com/QwenLM/qwen-code/issues/18055)、[#18053](https://github.com/QwenLM/qwen-code/issues/18053)

3. **路径语义需要贯穿实现与测试。** UNC 根路径丢失是用户可见故障，Windows 测试硬编码 POSIX 字符串则是测试层问题，两者需要分别处理。  
   参考：[ #18059](https://github.com/QwenLM/qwen-code/issues/18059)、[#18037](https://github.com/QwenLM/qwen-code/issues/18037)

4. **界面状态应与实际行为一致。** Thinking 开关无效、主题参数被忽略、深链接缺少提示条，都容易让用户误判系统是否接受了操作。  
   参考：[ #18015](https://github.com/QwenLM/qwen-code/issues/18015)、[#18061](https://github.com/QwenLM/qwen-code/issues/18061)、[#18033](https://github.com/QwenLM/qwen-code/issues/18033)

**后续优先观察：**P1 恢复句柄修复是否完成验证、负载准入前后端是否协同落地，以及 UNC 权限修复和 Linux 非 ASCII 渲染问题的推进情况。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-22｜统计范围：所提供的过去 24 小时 GitHub 数据**

> **数据说明**：数据来源标注为 `Hmbown/DeepSeek-TUI`，但条目指向 `codewhale-hq/Codewhale`，下文链接按条目指向生成。本期仅有 2 条 Issue、8 条 PR，按实际数量整理，不补足至 10 条；PR 的 `CLOSED` 状态不代表已合并。

## 1. 今日速览

今日动态集中于 **TUI 流式内容显示与会话切换可靠性**：推理卡片在工具调用后继续向上增长的问题已有对应修复 PR，另有流式增量归属和已有历史会话加载的修复待审。核心层同时推进跨进程索引缓存、诊断账本容量治理及错误可观测性；过去 24 小时无新版本发布，相关改动是否已交付仍需确认。

## 2. 社区热点 Issues

### [#7454：工具调用后的推理内容仍追加到上方旧卡片](https://github.com/codewhale-hq/Codewhale/issues/7454)
- **状态**：OPEN；标签：`area:tui`、`area:core`。
- **问题**：在“流式推理 → 工具调用 → 继续推理”的过程中，后续推理可能继续写入工具卡片上方的旧推理卡片，造成视觉顺序与执行顺序不一致。
- **重要性**：影响用户判断代理当前正在思考还是执行工具，也削弱长任务过程的可读性。
- **社区反应**：0 评论、0 👍，暂未形成广泛讨论；同一贡献者已提交对应修复 [PR #7455](https://github.com/codewhale-hq/Codewhale/pull/7455)。

### [#7453：内容不明确，等待分诊](https://github.com/codewhale-hq/Codewhale/issues/7453)
- **状态**：OPEN；标签：`needs-triage`。
- **内容**：标题与正文未提供可识别的问题描述、复现步骤或版本信息。
- **重要性**：目前不足以归纳为有效缺陷或功能需求，应先请求作者补充信息。
- **社区反应**：1 条评论、0 👍；未提供评论正文，无法判断讨论结论。

## 3. 重要 PR 进展

本期共 **5 条 OPEN、3 条 CLOSED**；PR 评论数缺失，全部为 0 👍，不据此推断评审热度。

| PR | 状态 | 功能或修复内容及意义 |
|---|---|---|
| [#7455 修复推理卡片与工具卡片的顺序](https://github.com/codewhale-hq/Codewhale/pull/7455) | OPEN | 针对 #7454，避免继续复用已不处于活动尾部的推理卡片，让后续推理在工具卡片下方开启新卡片，保持时间线可读性。 |
| [#7452 修正流式增量的单元归属](https://github.com/codewhale-hq/Codewhale/pull/7452) | OPEN | 处理网关在推理流中开启文本块、随后继续发送推理增量的情况，避免内容因起始事件类型而进入错误的显示单元。 |
| [#7451 允许切换到已有历史的 Runtime 存储](https://github.com/codewhale-hq/Codewhale/pull/7451) | OPEN | 修正会话加载时对目标 `threads/` 非空的拒绝逻辑，使已有历史记录的目标会话可以正常切换进入。 |
| [#7446 跨进程缓存条目索引](https://github.com/codewhale-hq/Codewhale/pull/7446) | OPEN | 针对每个进程首次打开线程时需要扫描并读取条目记录的开销，尝试复用持久化索引；实际收益尚无基准数据。 |
| [#7447 刷新 Models.dev 离线模型种子](https://github.com/codewhale-hq/Codewhale/pull/7447) | OPEN | 自动更新允许供应商范围内的模型目录。摘要明确新增条目保留 `unreviewed` 来源标记，仍需人工核验。 |
| [#7450 添加 LLMTR 兼容提供商](https://github.com/codewhale-hq/Codewhale/pull/7450) | CLOSED | 拟通过现有兼容主机描述机制接入 OpenAI-compatible 网关 `https://llmtr.com/v1`，支持 `vendor/model` 格式模型 ID；未确认是否合并。 |
| [#7449 压缩容量上限附近的诊断回执](https://github.com/codewhale-hq/Codewhale/pull/7449) | CLOSED | 针对 `.late-usage/<id>.json` 的 1 MiB 上限，处理不涉及费用的诊断回执占满容量、导致后续写入被拒的问题；未确认是否合并。 |
| [#7448 在提供商错误中展示请求传输信息](https://github.com/codewhale-hq/Codewhale/pull/7448) | CLOSED | 将 `RequestTransmission` 传递至提供商错误封装及持久化 TUI 错误历史，并以可选字段兼容旧数据。摘要报告两项定向测试通过；未确认是否合并。 |

## 4. 功能需求趋势

**仅从本期 Issues 看，明确的需求信号是 TUI 时间线一致性**；另一条 Issue 信息不足，不能据此推导更广泛的社区偏好。结合 PR，可观察到以下开发方向，但不宜视为用户需求排名：

- **流式交互正确性**：推理、文本与工具卡片需要正确分流，并按执行顺序呈现。参见 [#7454](https://github.com/codewhale-hq/Codewhale/issues/7454)、[#7452](https://github.com/codewhale-hq/Codewhale/pull/7452)。
- **会话与历史数据可靠性**：减少切换到已有会话时的加载限制。参见 [#7451](https://github.com/codewhale-hq/Codewhale/pull/7451)。
- **冷启动与历史访问性能**：通过跨进程索引缓存减少重复扫描。参见 [#7446](https://github.com/codewhale-hq/Codewhale/pull/7446)。
- **模型生态与目录维护**：兼容网关接入与离线模型清单更新并行推进。参见 [#7450](https://github.com/codewhale-hq/Codewhale/pull/7450)、[#7447](https://github.com/codewhale-hq/Codewhale/pull/7447)。
- **诊断可观测性与存储治理**：补充错误上下文，同时控制诊断记录的容量占用。参见 [#7448](https://github.com/codewhale-hq/Codewhale/pull/7448)、[#7449](https://github.com/codewhale-hq/Codewhale/pull/7449)。

## 5. 开发者关注点

1. **优先覆盖交错流式事件的回归测试**  
   推理、文本和工具事件交错时，显示类型与卡片顺序都可能出错，不能只验证单一连续输出路径。关联：[#7455](https://github.com/codewhale-hq/Codewhale/pull/7455)、[#7452](https://github.com/codewhale-hq/Codewhale/pull/7452)。

2. **会话校验需要区分源与目标存储语义**  
   目标已有历史不应被直接视为不可加载状态。关联：[#7451](https://github.com/codewhale-hq/Codewhale/pull/7451)。

3. **持久化性能与容量边界值得持续跟踪**  
   首次索引扫描和诊断账本写满分别暴露了历史数据访问与存储上限方面的维护压力。关联：[#7446](https://github.com/codewhale-hq/Codewhale/pull/7446)、[#7449](https://github.com/codewhale-hq/Codewhale/pull/7449)。

4. **错误历史需要保留更充分的排障上下文**  
   请求传输信息进入持久化错误记录，有助于分析提供商故障；同时需保持旧序列化数据兼容。关联：[#7448](https://github.com/codewhale-hq/Codewhale/pull/7448)。

**后续重点**：跟踪两项流式显示修复和会话切换修复的评审结果，并核实已关闭 PR 的合并状态；当前数据尚不能将这些提案视为正式上线能力。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*