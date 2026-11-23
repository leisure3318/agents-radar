# AI CLI 工具社区动态日报 2026-11-23

> 生成时间: 2026-11-23 02:17 UTC | 覆盖工具: 9 个

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
**日期：2026-11-23｜基于所提供的社区动态摘要**

> **统计口径：**Issue、PR 数指过去 24 小时有更新的条目，不等于新增数；部分工具仅提供筛选样本，不能直接比较总量。用户报告不等于官方确认，PR 关闭不等于合并，发布次数也不直接代表产品成熟度。

## 1. 生态全景

AI CLI 的竞争重点正从“能否生成和修改代码”，转向**能否安全、持续、可验证地完成开发任务**。多个社区同时出现任务无法中断、会话恢复异常、工具状态不一致和静默失败反馈，说明执行控制与状态管理是当前共同的工程瓶颈。CLI 的产品边界也在扩展，桌面端、Web、移动端、远程连接及 SDK 正逐步组成跨端开发工作台。与此同时，MCP、ACP、插件与多 Agent 带来更强的扩展能力，也增加了权限隔离、协议兼容和可观测性的要求。

## 2. 各工具活跃度对比

| 工具 | Issues 更新数 | PR 更新数 | Release 情况 | 当日主要信号 |
|---|---:|---:|---|---|
| **Claude Code** | **50**，提供30条明细 | **0** | 无 | 命令安全、中断失效、长会话恢复 |
| **OpenAI Codex** | **50**，提供30条明细 | **29**，提供20条明细 | 无 | TUI可靠性、云会话恢复、自动化执行正确性 |
| **Gemini CLI** | **4** | **6** | 1个 Nightly：`v0.71.0-nightly.20261123.geecccfcd5` | checkpoint、目录信任、A2A/MCP稳定性 |
| **GitHub Copilot CLI** | **3** | **1** | `v1.0.115-7` | 会话连接、进程清理、ACP能力一致性 |
| **Kimi Code CLI** | **0** | **0** | 无 | 所给窗口内无活动 |
| **OpenCode** | 提供**30条样本**，总量未给出 | 提供**20条样本**，总量未给出 | 无 | Windows基础体验、MCP、多模态与子Agent |
| **Pi** | **18** | **2** | 无 | 工具与扩展一致性、多模型适配、会话隔离 |
| **Qwen Code** | 总量未给出，重点列出**10条** | 总量未给出，重点列出**10条** | `v0.28.4`、`Desktop v0.28.4` | Web Shell、国际化输入、Managed Agent |
| **DeepSeek TUI／Codewhale** | **22** | **5** | `v0.10.3` | 集中审计、插件兼容、Auto-Review |

**数据补充：**
- Pi 的来源标注与条目仓库不同，具体链接指向 `earendil-works/pi`；DeepSeek TUI 的条目指向 `codewhale-hq/Codewhale`。
- Qwen、Codewhale 的发布说明不完整；Gemini Nightly 未提供可确认的功能变更，不能据此认定相关 PR 已交付。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与横向判断 |
|---|---|---|
| **任务可停止、可恢复** | Claude Code、Codex、Copilot CLI、OpenCode、Pi、Qwen Code、Gemini CLI | 包括 Ctrl+C 失效、取消卡住、断连重试失败、旧会话继续执行及 checkpoint 恢复错误。需求已从“保存聊天”升级为管理完整任务生命周期。 |
| **执行安全与权限边界** | Claude Code、Codex、Gemini CLI、Codewhale | Claude 出现误删和 Shell 意外执行报告；Codex 反馈安全误拦截；Gemini 涉及目录信任与外部输入边界；Codewhale 强化工作区和子代理审查。核心是同时减少危险放行与正常任务误阻断。 |
| **工具与配置状态一致性** | Pi、OpenCode、Gemini CLI、Claude Code、Qwen Code | 工具定义和执行对象不一致、MCP工具截断、刷新后超时丢失、模型配置疑被覆盖、文件或图片输入被过滤，均指向“配置值、实际状态、模型所见”需要一致。 |
| **长任务与上下文连续性** | Claude Code、Codex、OpenCode、Pi、Codewhale | 关注大记录恢复、上下文切换遗漏请求、压缩质量及恢复后的工具可用性。上下文容量之外，意图和约束能否持续保留更重要。 |
| **跨端开发工作台** | Codex、Copilot CLI、OpenCode、Qwen Code | 桌面、移动、Web与远程会话逐步融合；当前难点集中在历史同步、连接恢复、输入体验和跨端能力差异。 |
| **多模型与协议兼容** | Pi、Qwen Code、OpenCode、Gemini CLI、Copilot CLI | 适配已深入流式结束语义、推理字段、视觉能力识别、Schema引用、MCP刷新及ACP工具暴露，不再只是API连通。 |

**共同特征：静默失败比显式报错更值得警惕。** 文件没有进入上下文、工具被隐藏、历史仅显示旧内容、未完成却返回成功，都可能被误判为模型能力不足，实际却是集成或状态管理问题。

## 4. 差异化定位分析

以下是基于当日功能与问题分布的定位判断，**不是对官方产品战略的认定**。

| 工具 | 功能侧重与技术路线信号 | 更相关的用户与场景 |
|---|---|---|
| **Claude Code** | 深度命令执行、Hook与子代理、长会话，并延伸到IDE和桌面集成 | 重度终端开发、复杂仓库操作、定制开发流程；应重点验证破坏性操作和恢复能力 |
| **OpenAI Codex** | TUI、app-server与云会话协同，兼顾远程接入和`exec`自动化 | 跨端开发、脚本及CI集成；需关注完成状态、退出码与副作用幂等性 |
| **Gemini CLI** | 目录信任、checkpoint、MCP与A2A服务侧可靠性 | 无头运行、MCP集成及Agent服务开发；重点在安全默认值和故障隔离 |
| **GitHub Copilot CLI** | UI服务器、ACP、SDK及容器连接，强调客户端接入和进程管理 | GitHub生态用户、第三方客户端和本地SDK集成者 |
| **OpenCode** | 自定义Provider、插件、MCP与ACP并行扩展，同时探索视频和实时语音 | 需要配置自由度、多模型和多模态能力的开发者；需关注V1→V2迁移 |
| **Pi** | 以SDK、扩展钩子、动态工具注册和多模型适配为突出信号 | 自建Agent、扩展作者及模型适配开发者；强调组合后的行为确定性 |
| **Qwen Code** | Web Shell、本地daemon、多工作区与Managed Agent，兼顾桌面和移动端 | 多设备、本地工作区管理、中文/CJK及自托管模型用户 |
| **Codewhale** | 统一插件入口、DeepSeek Harness兼容、Auto-Review与消息桥接 | 插件扩展、代理治理和外部消息渠道驱动的自动化场景 |
| **Kimi Code CLI** | 当日无活动，无法提炼新的路线信号 | 需要结合更长时间窗口评估 |

## 5. 社区热度与成熟度

### 活跃度：Codex、Claude反馈密集，OpenCode样本互动更突出

- **Codex与Claude Code**均有50条Issue更新；Codex另有29条PR更新，是已给出完整计数的工具中代码侧活动最强者。Claude当日无PR更新，只能说明本窗口未观察到代码侧进展，不能据此推断维护能力。
- **OpenCode**展示样本中，MCP工具截断问题有**9条评论**，子Agent状态问题有**5条评论**；相比Claude所选条目最高2条、Codex展示样本最高3条，其个别议题讨论更集中。
- **Codewhale的22条Issue全部来自同一作者**，更接近集中审计，而非22个独立用户需求。Copilot两条云连接报告也来自同一作者，不能放大为普遍趋势。

### 迭代阶段：新功能扩展与可靠性补课并行

- **OpenCode、Qwen Code、Codewhale**呈现较明显的平台扩展信号：分别涉及V2迁移和多模态、跨端工作台、插件及审查治理。
- **Codex**当日PR更集中于输入、流式渲染、回放与云会话恢复，体现可靠性打磨。
- **Copilot CLI**有明确发布的连接时机和后台进程清理修复，交付证据较清晰，但社区样本很小。
- **Gemini CLI、Pi**在当日样本中更偏向集成正确性和局部工程修复；不能仅凭Issue少就判断更稳定。
- **Kimi Code CLI**单日无活动，不足以支持“生态停滞”的结论。

**成熟度应看闭环，而非数量：**问题能否复现、维护者是否确认、修复是否合并、是否进入版本，以及是否有回归测试，比Issue关闭率或发布频率更有判断价值。

## 6. 值得关注的趋势信号

### ① AI CLI 正演变为任务运行平台

队列、后台会话、定时任务、子Agent与远程连接不断增加，可靠性问题也开始类似分布式系统：重复执行、状态不一致、取消竞态和恢复失败。

**开发者参考：**涉及提交、发布或外部写入时，应加入幂等键、重复检测和任务审计；不能把“重新运行”默认视为无害操作。

### ② “完成”的判断正在从文本声明转向机器证据

Codex的错误成功退出报告，与Claude的未充分验证即宣布完成反馈，共同说明自然语言结论和退出码都可能不足以证明任务成功。

**开发者参考：**关键流程应同时校验完成事件、产物、测试结果及对应提交版本，明确区分成功、失败、取消和状态未知。

### ③ 权限管理需要理解实际执行语义

Shell展开、真实路径、动态工具注册、外部Issue输入和子Agent返回内容，都可能改变原先授权的实际含义。

**开发者参考：**对删除等高风险操作校验解析后的目标路径；对外部内容坚持数据与指令隔离；工具动态刷新后重新核对可用范围。

### ④ 开放协议扩大生态，也引入兼容性成本

MCP工具数量、Schema引用、ACP能力差异和跨模型推理字段表明，“支持某协议”并不意味着所有客户端、工具和模型行为一致。

**开发者参考：**采购与集成验收应采用真实工具链，覆盖工具发现、执行、回放、刷新、断连和恢复，而不是仅测试首次响应。

### ⑤ 跨端体验的核心是状态一致，而非界面数量

Qwen的共享历史、Codex的远程历史显示问题和Copilot的移动断连反馈表明，跨端能力的价值取决于任务状态能否连续。

**开发者参考：**优先评估历史来源、重连补偿、取消传播和能力声明，避免仅按是否提供移动端或Web入口选型。

---

**决策结论：**当前最有价值的选型标准，不是单纯比较模型数量或功能清单，而是验证工具能否在目标环境中做到：**输入确实生效、执行可控、副作用可追踪、断连可恢复、结果可验证**。本日数据能够揭示风险与路线信号，但不足以形成整体产品质量排名；技术决策应结合完整开发闭环的实测与后续修复交付。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-23｜基于所提供的 20 条 PR、15 条 Issue**

> **统计口径：**PR 评论数均为 `undefined`、👍 均为 0，因此无法验证真实热度排名。以下按 **关联 Issue 的讨论量、同类提交密度和影响范围**排序，不将其视为严格的 PR 评论榜。展示的 PR 全部为 **OPEN**，没有已合并或 Draft 的明确记录。

## 1. 热门 Skills 排行

| 排名 | Skill / 代表 PR | 功能与社区关注点 | 当前状态 |
|---|---|---|---|
| **1** | **skill-creator**：[评估隔离与跨平台修复 #1298](https://github.com/anthropics/skills/pull/1298) | 创建、评估和优化 Skills。最突出的问题是**触发率评估不可信**：并发串扰、Windows 子进程处理、运行失败被误判为“不触发”。关联 [#556](https://github.com/anthropics/skills/issues/556) 有 **13 条评论、7👍**，[#1352](https://github.com/anthropics/skills/issues/1352) 有 **6 条评论、3👍**，是样本中讨论最集中的具体 Skill。另有打包路径和 YAML 解析修复。 | **OPEN** |
| **2** | **docx**：[修订接受结果校验 #1792](https://github.com/anthropics/skills/pull/1792) | 处理 Word 文档和修订。关注点从“生成文件”转向**输出是否真正正确**：LibreOffice 超时不能报成功、修订标记必须清除、XML 必须有效。[无效 XML 问题 #2018](https://github.com/anthropics/skills/issues/2018) 有 **4 条评论**。 | **OPEN** |
| **3** | **claude-api**：[更新 `pause_turn` 指引 #1950](https://github.com/anthropics/skills/pull/1950) | 指导 Claude API、工具调用及 SDK 使用。热点是**文档与 SDK 行为同步，以及上下文成本**；[#1487](https://github.com/anthropics/skills/issues/1487) 报告一次加载约 156k tokens，有 **5 条评论**。 | **OPEN** |
| **4** | **webapp-testing**：[移除 `shell=True` #1980](https://github.com/anthropics/skills/pull/1980) | 启动测试服务、辅助 Web 应用测试。提交集中在**命令执行安全与页面元素识别准确性**；另有 [textarea/select 识别修复 #1976](https://github.com/anthropics/skills/pull/1976)。没有可核验的 PR 讨论量。 | **OPEN** |
| **5** | **mcp-builder**：[适配 MCP 2.x #1742](https://github.com/anthropics/skills/pull/1742) | 辅助构建 MCP 服务及连接工具。重点解决 `streamable_http_client` 导入变更和自定义请求头配置，反映**上游依赖升级带来的兼容性压力**。关联 [#1668](https://github.com/anthropics/skills/issues/1668)。 | **OPEN** |
| **6** | **xlsx**：[外部链接风险检测修复 #2019](https://github.com/anthropics/skills/pull/2019) | 处理和重算 Excel 工作簿。修复工作表级名称及别名间接引用外部链接时的漏检，重点是**避免静默误判和数据完整性风险**。关联 [#2013](https://github.com/anthropics/skills/issues/2013)。 | **OPEN** |
| **7** | **Notion Spec to Implementation**：[新增提案 #1245](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品/技术规格拆解为任务、验收标准和进度跟踪，体现**规格文档→实施计划→代码执行**的工作流需求。同一 PR 还包含简历审计 Skill，但摘要不足以分析其细节。 | **OPEN** |

**核心判断：**在可见样本中，既有 Skills 的可靠性修复比新增能力更突出；“能运行”正在让位于“可验证、不会误报、不会损坏结果”。

## 2. 社区需求趋势

### ① 可信分发与安全治理——讨论最强的生态议题
[#492](https://github.com/anthropics/skills/issues/492) 以 **46 条评论、3👍**居所展示 Issues 首位，关注社区 Skills 使用 `anthropic/` 命名空间造成的官方身份混淆。需求核心是**来源可辨识、权限边界和信任管理**。另有已关闭的 [agent-governance 提案 #412](https://github.com/anthropics/skills/issues/412)，涉及策略执行、威胁检测和审计；关闭本身不代表已交付。

### ② 团队共享与统一管理——比“再加一个 Skill”更迫切
[组织级共享 #228](https://github.com/anthropics/skills/issues/228) 有 **17 条评论、8👍**，希望替代手动下载、聊天传文件、逐人上传的流程；[插件内容重复 #189](https://github.com/anthropics/skills/issues/189) 有 **6 条评论、9👍**。明确需求是**共享库、便捷分发、安装去重**，主要属于平台能力，而非单个新 Skill。

### ③ 质量门禁与可靠评估——新 Skill 和基础工具双线推进
[Reasoning Quality Gate #1385](https://github.com/anthropics/skills/issues/1385) 有 **7 条评论**，提出任务前校准、对抗审查、交付验证三阶段流程；结合 [skill-creator 评估问题 #556](https://github.com/anthropics/skills/issues/556)，社区希望形成**可验证的质量闭环**。现有数据不足以认定“代码审查”或“测试生成”是独立的高热需求。

### ④ 长任务记忆与上下文效率——值得跟踪的新方向
[compact-memory #1329](https://github.com/anthropics/skills/issues/1329) 有 **10 条评论**，提议用紧凑符号表达长期 Agent 状态；[claude-api 上下文膨胀 #1487](https://github.com/anthropics/skills/issues/1487) 则反映加载成本问题。两者共同指向**更小的上下文占用、更稳定的长任务执行**。

### ⑤ 文档交付质量——从排版扩展到文件完整性
[docx XML 损坏 #2018](https://github.com/anthropics/skills/issues/2018) 与 [document-typography 提案 #514](https://github.com/anthropics/skills/pull/514) 分别覆盖结构正确性和孤行、标题跨页、编号对齐等问题，表明文档需求正在转向**可直接交付的成品质量**。

> 范围提醒：[更改账号邮箱 #1143](https://github.com/anthropics/skills/issues/1143) 虽有 **18👍**，但属于账号与工作区管理，不宜计入新 Skill 需求热度。

## 3. 高潜力待合并 Skills

**无法确认哪些 PR“评论活跃”或“近期将合并”**：当前缺少评论数、维护者审批、CI 和合并计划。以下是按需求明确度与实现价值筛选的待合并观察名单：

| PR | 值得关注的原因 | 进展与限制 |
|---|---|---|
| **[skill-creator #1298](https://github.com/anthropics/skills/pull/1298)** | 直接针对高讨论度的评估失真问题，影响其他 Skills 的开发与优化，具有基础设施价值。 | OPEN；最后更新 **09-16**，不能据此判断近期落地。 |
| **[skill-creator 打包修复 #1681](https://github.com/anthropics/skills/pull/1681)** | 修复独立执行脚本的导入错误及过时路径，问题边界较清晰。 | OPEN；最后更新 **11-19**，是展示 PR 中更新最近的一项。 |
| **[webapp-testing 安全修复 #1980](https://github.com/anthropics/skills/pull/1980)** | 面向用户或 Agent 命令进入系统 Shell 的风险，安全收益明确。 | OPEN；最后更新 **11-01**，仍需确认兼容性与安全验证。 |
| **[Notion 工作流 #1245](https://github.com/anthropics/skills/pull/1245)** | 新增 Skill 中工作流闭环较完整，连接需求规格、任务拆解与实施。 | OPEN；最后更新 **10-15**，无可验证的讨论热度。 |
| **[md2video-audio #1703](https://github.com/anthropics/skills/pull/1703)** | 将 Markdown 转成带配音的 MP4，展示 Skills 从文档处理向多媒体生产扩展的潜力。 | OPEN；最后更新 **09-15**；“零成本、专业级”等为作者主张，尚无验证数据。 |

## 4. Skills 生态洞察

**社区最集中的诉求不是单纯增加 Skills 数量，而是让 Skills 在可信分发、准确触发、上下文成本和输出验证上达到可用于团队生产环境的可靠程度。**——代表议题：[信任边界 #492](https://github.com/anthropics/skills/issues/492)、[组织共享 #228](https://github.com/anthropics/skills/issues/228)、[评估失真 #556](https://github.com/anthropics/skills/issues/556)。

---

# Claude Code 社区动态日报｜2026-11-23

> 数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)。过去 24 小时有 50 条 Issue 更新，本报基于所提供的 30 条明细分析；问题描述均为提交者反馈，不代表官方已确认。

## 1. 今日速览

今日最值得优先关注的是两类命令执行风险：Windows PowerShell 清理操作被报告误删用户目录，以及 Linux 下未引用的 heredoc 中反引号触发意外命令执行。交互稳定性同样突出，涉及终端无法中断、Remote-SSH 会话切换缓慢，以及桌面端初始化卡死；过去 24 小时无新 Release、无 PR 更新，暂未看到对应修复进展。

## 2. 社区热点 Issues

以下按潜在影响和开发工作流相关性筛选，**不是按热度排序**。当前讨论量较低，所选条目仅有 0–2 条评论、均为 0 个 👍，尚不足以判断问题的普遍程度。

| Issue | 主要反馈与重要性 | 社区反应 |
|---|---|---|
| **[① PowerShell 清理操作误删用户目录 #111755](https://github.com/anthropics/claude-code/issues/111755)** | 据报告，清理临时目录时未校验路径变量，而 `$home` 与 PowerShell 的只读自动变量 `$HOME` 冲突，最终对用户目录执行递归强制删除。涉及数据丢失，应优先核查破坏性命令的目标路径验证。 | OPEN；0 评论；带 `data-loss`、权限相关标签。 |
| **[② heredoc 反引号触发意外执行 #111729](https://github.com/anthropics/claude-code/issues/111729)** | 提交者称，未引用的 heredoc 中 Markdown 反引号触发命令替换，执行了原本禁止的命令。提示生成 Shell 文本时必须考虑解析语义，不能仅按“写入文本”判断风险。 | OPEN；2 评论，并列所给样本最高；尚无已确认修复信息。 |
| **[③ Windows 终端无法中断 #111754](https://github.com/anthropics/claude-code/issues/111754)** | Windows Terminal 中 ESC、Ctrl+C 均无响应，只能强制关闭终端。影响运行中任务的可控性，报告版本为 2.1.330。 | OPEN；1 评论。 |
| **[④ Linux 恢复后台会话后键盘失效 #111739](https://github.com/anthropics/claude-code/issues/111739)** | `/resume` 连接忙碌的后台会话后，所有键盘输入失效，包括 Ctrl+C、Ctrl+D。与 Windows 报告共同指向中断与输入处理的可靠性问题，但不能据此认定根因相同。 | OPEN；1 评论；报告版本为 2.1.330。 |
| **[⑤ Remote-SSH 切换会话串行重绘 #111752](https://github.com/anthropics/claude-code/issues/111752)** | 据报告，每条工具记录通过 `engine_ui_render` 逐次往返渲染，高延迟连接下切换会话需等待数十秒。直接影响远程开发效率。 | OPEN；1 评论；标记为回归及可靠性问题，提交者称始于 11 月 12 日。 |
| **[⑥ 默认模型疑被功能开关覆盖 #111725](https://github.com/anthropics/claude-code/issues/111725)** | 用户称配置的默认模型被 rollout flags 覆盖，且没有通知。核心问题是模型选择的透明度、结果可复现性及潜在成本变化；具体模型名称仅为报告中的表述。 | OPEN；1 评论；涉及模型与成本标签。 |
| **[⑦ 子代理记录超过 50 MiB 无法恢复 #111709](https://github.com/anthropics/claude-code/issues/111709)** | 提交者称，大于 52,428,800 字节的记录无法恢复，却提示“No transcript found”。同时涉及长任务连续性和错误信息准确性。 | OPEN；1 评论。 |
| **[⑧ Windows 桌面端初始化卡死 #111758](https://github.com/anthropics/claude-code/issues/111758)** | 系统崩溃后，桌面端所有 Code 会话停在初始化阶段，而独立 CLI 正常。值得排查桌面端状态恢复与故障隔离。 | OPEN；0 评论；标记为回归问题。 |
| **[⑨ Hook 缺少当前模型状态 #111757](https://github.com/anthropics/claude-code/issues/111757)** | `UserPromptSubmit` hook 无法通过环境获取当前模型状态，限制按模型执行自定义检查、记录或工作流分流的能力。 | OPEN；1 评论。 |
| **[⑩ 长会话上下文利用失效 #111751](https://github.com/anthropics/claude-code/issues/111751)** | 提交者称，使用其所称的“Opus 5.5”达到约 200k tokens 后，模型忽略先前测试记录。涉及长上下文工作的可信度，但目前仅是单一提交者的反馈。 | OPEN；0 评论；需要独立复现与更多样本。 |

## 3. 重要 PR 进展

过去 24 小时内**无更新的 Pull Request**，因此没有可列出的 10 项 PR，也无法从本批数据确认上述问题已有修复方案或合并计划。

跟踪入口：[仓库 Pull Requests](https://github.com/anthropics/claude-code/pulls)。

## 4. 功能需求趋势

以下是从可见样本归纳的需求方向，不等同于全部 50 条 Issue 的热度排名。

- **命令执行安全与权限边界**  
  用户需要的不只是命令授权，还包括执行前确认真实目标路径、处理 Shell 展开语义，以及对破坏性操作增加保护。参考：[PowerShell 数据丢失 #111755](https://github.com/anthropics/claude-code/issues/111755)、[heredoc 命令执行 #111729](https://github.com/anthropics/claude-code/issues/111729)。

- **清晰、可靠的终端中断机制**  
  一端是按键完全失效，另一端是 Ctrl+C、Escape 复用过多，误将清空输入或关闭视图变成中断任务。社区诉求指向更明确的状态提示与操作分离。参考：[按键职责拆分建议 #111750](https://github.com/anthropics/claude-code/issues/111750)。

- **IDE 与桌面端的恢复能力、远程性能**  
  Remote-SSH 下逐条串行渲染，以及桌面端崩溃后无法初始化，显示集成体验仍需强化延迟适应和异常恢复。参考：[#111752](https://github.com/anthropics/claude-code/issues/111752)、[#111758](https://github.com/anthropics/claude-code/issues/111758)。

- **模型与配置状态可观测性**  
  默认模型是否生效、Hook 能否读取当前模型、环境变量是否在当前配置层级有效，都需要更明确的反馈，避免“配置存在但未生效”。参考：[#111725](https://github.com/anthropics/claude-code/issues/111725)、[#111757](https://github.com/anthropics/claude-code/issues/111757)、[配置忽略警告建议 #111742](https://github.com/anthropics/claude-code/issues/111742)。

- **长任务连续性与可验证交付**  
  反馈集中在大体积记录恢复、上下文压缩后质量、以及未充分验证便宣布完成。模型行为相关报告多来自同一作者，应视为待验证的问题线索，而非广泛共识。参考：[#111709](https://github.com/anthropics/claude-code/issues/111709)、[二次压缩后质量反馈 #111749](https://github.com/anthropics/claude-code/issues/111749)、[审查步骤未完成即给结论 #111735](https://github.com/anthropics/claude-code/issues/111735)。

## 5. 开发者关注点

1. **先保障破坏性操作可控。** 对递归删除等操作，应核验解析后的绝对路径，并对用户主目录等敏感位置设置额外确认；Shell 文本生成也需防范意外展开。相关：[#111755](https://github.com/anthropics/claude-code/issues/111755)、[#111729](https://github.com/anthropics/claude-code/issues/111729)。

2. **长任务既要能恢复，也要能可靠停止。** 输入失效、恢复失败与中断键歧义，都会放大无人值守或后台任务的风险。相关：[#111739](https://github.com/anthropics/claude-code/issues/111739)、[#111709](https://github.com/anthropics/claude-code/issues/111709)、[#111750](https://github.com/anthropics/claude-code/issues/111750)。

3. **“完成”需要附带验证证据。** 建议将实际运行的测试、对应提交版本、未验证项纳入交付记录，避免把推测或旧审查结论当作当前结果。相关：[验证声明反馈 #111738](https://github.com/anthropics/claude-code/issues/111738)、[PR 更新后未重新审查 #111736](https://github.com/anthropics/claude-code/issues/111736)。

4. **排障信息应反映真实生效状态。** 当前模型、配置来源、被忽略的设置及恢复失败原因，都是开发者定位问题的关键，而不应只提供笼统错误。相关：[#111725](https://github.com/anthropics/claude-code/issues/111725)、[#111742](https://github.com/anthropics/claude-code/issues/111742)、[#111709](https://github.com/anthropics/claude-code/issues/111709)。

**今日判断：** 本批反馈的重点不是新增能力，而是执行安全、交互可控性和结果可信度。现阶段应优先跟踪高影响问题的复现与维护者回应，不宜根据低评论量的单条报告推断整体产品质量变化。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**2026-11-23｜数据来源：[openai/codex](https://github.com/openai/codex)**

## 1. 今日速览

过去 24 小时有 **50 条 Issue、29 条 PR 更新，无新 Release**。用户反馈集中在桌面端卡死、会话显示与连接异常、安全检查误拦截；另有多项涉及数据覆盖、队列重复执行和 CLI 错误成功退出的高风险报告，值得优先核查。

PR 侧重点是 **TUI 输入与流式渲染可靠性、云会话恢复及连接复用**。下文所选 PR 均标记为 `CLOSED`，但数据未提供合并信息，**不能据此认定已合并或已发布**。

> **阅读口径：**本日报基于提供的 30 条 Issue 和 20 条 PR 摘要筛选；其余条目未展示。Issue 评论数最高仅 3 条，以下优先级综合考虑潜在影响，而非仅按讨论热度排序；问题描述均属报告者反馈，尚不能视为官方确认。

## 2. 社区热点 Issues

| Issue | 核心问题与关注价值 | 社区反应 |
|---|---|---|
| **[ #63186：审批提示后卡死，疑似持续消耗额度](https://github.com/openai/codex/issues/63186)** | Windows 用户报告审批提示闪现后应用无响应，无法停止任务或发送消息。问题同时涉及交互可用性、任务取消能力和额度透明度。 | **3 评论、0 👍**，为展示样本中评论最多的 Issue；仍开放。 |
| **[ #63212：iOS Remote 切换会话后近期消息不可见](https://github.com/openai/codex/issues/63212)** | iPhone 连接 Mac 主机时，切换会话后显示较旧记录，约 20–30 分钟的讨论从视图中消失，但主机仍保留对应内容。应区分同步或渲染异常与真实数据丢失。 | **2 评论、1 👍**；在本批低互动样本中相对突出。 |
| **[ #63232：编译器移植工作反复触发 “Apply for Daybreak”](https://github.com/openai/codex/issues/63232)** | 报告者称正常开发被网络安全限制中断。其重要性在于安全判断是否能准确理解开发上下文，以及受阻后是否有清晰处理路径。 | **1 评论、0 👍**；与游戏模拟、只读防御审查等报告形成相似反馈。 |
| **[ #63234：macOS 启动后系统内存明显上升](https://github.com/openai/codex/issues/63234)** | 16 GB Apple Silicon Mac 的系统已用内存在启动约一分钟后增加约 2.8 GB。该数据是系统总量变化，不能直接等同于 Codex 进程占用或内存泄漏，但值得复测。 | **1 评论、0 👍**；目前为单例观测。 |
| **[ #63207：Windows/WSL 自动迁移后连接与消息发送受阻](https://github.com/openai/codex/issues/63207)** | 旧版 WSL Agent 项目自动迁入 Connections → WSL 模式后，出现连接失败、无法发送及 “No chats”。涉及升级兼容性与既有工作流连续性。 | **1 评论、0 👍**；标题中的 P1 为报告者标注。 |
| **[ #63231：WSL 图片剪贴板回退可能冻结整个 TUI](https://github.com/openai/codex/issues/63231)** | 报告指出，Linux 剪贴板读取失败后的 PowerShell 回退调用同步执行且无超时。若外部命令挂起，可能阻塞整个交互界面。 | **0 评论、0 👍**；报告者标为 P1，尚待验证。 |
| **[ #63230：队列记录删除失败可能导致消息执行两次](https://github.com/openai/codex/issues/63230)** | 报告称任务先获准执行，再删除持久化队列记录；若删除失败，原消息可能再次被调度。对文件修改、提交或其他有副作用操作存在重复执行风险。 | **0 评论、0 👍**；报告者标为 P1。 |
| **[ #63229：归档与取消归档可能覆盖同名会话文件](https://github.com/openai/codex/issues/63229)** | 报告指出移动 rollout 文件时未检查目标是否存在，在 Unix 类文件系统上可能覆盖已有记录。潜在影响是真实数据丢失，而非单纯显示异常。 | **0 评论、0 👍**；报告者标为 P1、Data loss。 |
| **[ #63227：`codex exec` 未完成也可能返回退出码 0](https://github.com/openai/codex/issues/63227)** | 内嵌 app-server 事件流意外关闭时，若未收到明确失败通知，CLI 据报可能正常退出。会让 CI 和脚本将未完成任务误判为成功。 | **0 评论、0 👍**；报告者标为 P1。 |
| **[ #63198：上下文切换丢失当前请求，并调用不存在的工具](https://github.com/openai/codex/issues/63198)** | `token_budget` 在缺少 history/notes 扩展时仍提示使用 `notes`，且 `new_context` 据报丢弃活动请求。影响长任务连续性和工具配置一致性。 | **1 评论、0 👍**；仍开放。 |

**风险解读：**低评论数不代表低风险。尤其是队列重复执行、归档覆盖和退出码错误，潜在影响高于一般界面问题；但目前缺少维护者确认与复现结论。

## 3. 重要 PR 进展

**以下 10 项均为 `CLOSED`；是否合并、何时进入发行版，仍需另行确认。PR 评论字段为 `undefined`，不据此评价讨论热度。**

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| **[ #63237：保留云会话记录中的 mentions](https://github.com/openai/codex/pull/63237)** | 在云端历史和实时事件中解码 mention 名称与路径，避免相关用户消息无法作为结构化记录返回。 | 提升会话记录的完整性与可消费性。 |
| **[ #63233：TUI 缓冲输入在同一帧渲染](https://github.com/openai/codex/pull/63233)** | 修正粘贴文本、待处理 Vim 替换按键需要后续重绘才出现的问题。 | 减少输入“未生效”的错觉。 |
| **[ #63218：将 turn diff 更新移出 TUI 回放缓冲区](https://github.com/openai/codex/pull/63218)** | 避免重复的大体积 diff 状态更新挤出恢复线程所需事件。 | 保护会话回放与恢复完整性。 |
| **[ #63211：TUI 自动恢复断开的云会话](https://github.com/openai/codex/pull/63211)** | 在没有用户轮次进行时，后台重新连接当前显示的云会话。 | 补齐断连期间已保存但未显示的回复。 |
| **[ #63196：历史重绘前保留流式输出](https://github.com/openai/codex/pull/63196)** | 处理流式 Markdown 转入终端历史时短暂消失，以及窗口缩放造成的旧宽度换行问题。 | 改善长回复、表格和终端缩放体验。 |
| **[ #63194：通知打断时保持流式回答完整](https://github.com/openai/codex/pull/63194)** | 修正警告或粘贴错误插入后，部分回答可能在记录或缩放后重复的问题。 | 提高输出呈现的一致性。 |
| **[ #63193：回退编辑与分叉后清除预输入](https://github.com/openai/codex/pull/63193)** | 防止缓冲中的 Enter 在用户修改恢复的旧提示词前将其直接提交。 | 降低误提交和意外执行风险。 |
| **[ #63192：活跃输入期间延后编号问题交互](https://github.com/openai/codex/pull/63192)** | 避免编号选项抢走输入焦点，将草稿中的数字误当作答案。 | 保护草稿编辑与交互意图。 |
| **[ #63184：在终端侧栏打开工作区文件](https://github.com/openai/codex/pull/63184)** | 为终端工作区增加 `open_in_codex` MCP 工具，使 Codex 可在对话旁展示相关文件。 | 减少查看文档、图片或源码时的窗口切换。 |
| **[ #63175：复用运行时认证的 Responses WebSocket](https://github.com/openai/codex/pull/63175)** | 允许符合条件的请求复用已打开连接，减少重复握手和完整输入重传。 | 有望降低连接开销；摘要未提供性能量化结果。 |

**整体判断：**本批 PR 更偏向可靠性打磨，而非大规模新功能扩张。它们与用户反馈的会话完整性、输入控制和断连恢复问题方向一致，但不能据此认定具体 Issue 已被修复。

## 4. 功能需求趋势

1. **安全检查需要更准确，也需要可理解的恢复路径。**  
   编译器移植、游戏经济模拟、科研计算及防御审查均出现被拦截反馈；另有用户找不到 `/approve`。需求不仅是减少误报，还包括明确拒绝原因、审批入口和任务当前状态。  
   参考：[编译器移植 #63232](https://github.com/openai/codex/issues/63232)、[游戏模拟 #63236](https://github.com/openai/codex/issues/63236)、[审批入口 #63182](https://github.com/openai/codex/issues/63182)。

2. **跨端会话必须做到“历史一致、状态可见”。**  
   iOS Remote 显示旧记录、Windows 收到移动通知却看不到回复、WSL 迁移后显示无聊天，均反映用户对会话连续性的依赖。  
   参考：[#63212](https://github.com/openai/codex/issues/63212)、[#63215](https://github.com/openai/codex/issues/63215)、[#63207](https://github.com/openai/codex/issues/63207)。

3. **本地开发闭环比单纯编辑能力更重要。**  
   用户希望稳定完成“修改 → 测试 → 本地验证 → Git 提交”，而不只是让代理能改文件。沙箱、回环连接及仓库权限问题正阻断这个闭环。  
   参考：[Windows 本地验证 #63179](https://github.com/openai/codex/issues/63179)、[macOS Git 提交 #63187](https://github.com/openai/codex/issues/63187)。

4. **性能与资源使用需要可控、可解释。**  
   卡死时无法停止、额度持续消耗、内存增长，以及图片临时文件缺少清理，都指向资源生命周期与可观测性需求。  
   参考：[#63186](https://github.com/openai/codex/issues/63186)、[#63234](https://github.com/openai/codex/issues/63234)、[#63228](https://github.com/openai/codex/issues/63228)。

5. **长期任务需要稳定保留意图与约束。**  
   定时任务逐渐偏离持久要求、上下文切换遗漏当前请求，说明社区关注的不只是上下文容量，更是要求能否可靠延续。  
   参考：[定时任务 #63181](https://github.com/openai/codex/issues/63181)、[上下文切换 #63198](https://github.com/openai/codex/issues/63198)。

## 5. 开发者关注点

- **自动化不能只相信退出码。** 对接 CI 的开发者应关注 `codex exec` 提前结束却返回成功的报告；在问题确认前，关键流程宜同时校验产物、测试结果与完成状态。  
  [相关 Issue #63227](https://github.com/openai/codex/issues/63227)

- **有副作用的任务需要幂等保护。** 队列重复执行报告提示，提交、发布等操作应尽量加入重复检测，避免重试造成二次执行。  
  [相关 Issue #63230](https://github.com/openai/codex/issues/63230)

- **区分“看不见”与“已丢失”，但两者都影响信任。** 远程显示异常与归档文件覆盖属于不同风险层级；重要记录应保留备份，排查时应核对主机历史和实际存储。  
  [显示异常 #63212](https://github.com/openai/codex/issues/63212) · [覆盖风险 #63229](https://github.com/openai/codex/issues/63229)

- **升级验证应覆盖完整工作流。** 多条报告提及 `26.1117.41037`，另有 WSL 迁移问题涉及其他构建；目前不足以归因为同一回归，但升级后值得检查连接、发消息、Git 操作和本地服务访问。  
  [WSL 迁移 #63207](https://github.com/openai/codex/issues/63207) · [本地工作流 #63179](https://github.com/openai/codex/issues/63179)

**今日结论：社区最迫切的诉求是让已有能力更可靠——任务能停止、历史不丢失、执行不重复、失败不伪装成成功，以及安全限制有清晰边界。**

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报｜2026-11-23

> 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)。本期提供 1 个 Release、4 条 Issue 和 6 条 PR；以下覆盖全部条目，不补足至 10 条。部分记录的更新时间为 11 月 22 日，按所提供的近 24 小时数据集统计。

## 1. 今日速览

今日发布 `v0.71.0-nightly.20261123.geecccfcd5`，但现有信息不足以确认具体功能变更。社区讨论主要集中于 **checkpoint 恢复、目录信任默认行为，以及 Agent/MCP 运行稳定性**，多项修复已提交但尚未合并。另有两条安全研究类 Issue，涉及自动化 Agent 的信任边界测试，不应将其视为已确认漏洞。

## 2. 版本发布

### [v0.71.0-nightly.20261123.geecccfcd5](https://github.com/google-gemini/gemini-cli/releases/tag/v0.71.0-nightly.20261123.geecccfcd5)

- **类型**：Nightly 发布。
- **变更信息**：所给发布说明仅包含版本标题与对比链接，没有列出具体更新。
- **观察**：与前一天版本的提交哈希后缀相同，均为 `geecccfcd5`；不能据此认定下述 PR 已包含在本次发布中。

[完整版本对比](https://github.com/google-gemini/gemini-cli/compare/v0.71.0-nightly.20261122.geecccfcd5...v0.71.0-nightly.20261123.geecccfcd5)

## 3. 社区热点 Issues

本期仅有 4 条 Issue，均带有 `status/need-triage` 标签，且均为 0 👍。讨论量有限，以下按影响与关联进展排序，而非按热度排名。

| Issue | 核心问题与重要性 | 社区反应及状态 |
|---|---|---|
| [#30403：文件名包含 `.json` 时 checkpoint 名称损坏](https://github.com/google-gemini/gemini-cli/issues/30403) | 编辑 `package.json`、`tsconfig.json` 等文件时，checkpoint 名称处理可能出错，影响恢复流程。对常见项目配置文件的编辑尤其值得关注。 | **Open，2 条评论**；已有对应修复 PR [#30404](https://github.com/google-gemini/gemini-cli/pull/30404)。 |
| [#30402：目录信任检查的文档默认值与实际行为不一致](https://github.com/google-gemini/gemini-cli/issues/30402) | 报告指出文档称默认禁用，但代码默认启用；不受信任目录中的无头会话可能在发出请求前以退出码 `55` 结束，影响 CI 与脚本接入。 | **Open，1 条评论**；已有文档修正 PR [#30406](https://github.com/google-gemini/gemini-cli/pull/30406)。 |
| [#30407：CI Agent 信任边界探测](https://github.com/google-gemini/gemini-cli/issues/30407) | 作者自述为授权安全研究，关注具有命令执行、文件写入权限的自动化 Agent 如何处理外部输入。其意义在于验证权限与输入之间的信任边界，而非报告已证实的产品缺陷。 | **Open，1 条评论**；摘要声明无需维护者采取行动，未提供可确认的测试结论。 |
| [#30410：非行动型安全金丝雀报告](https://github.com/google-gemini/gemini-cli/issues/30410) | 作者自述为授权测试，明确不包含产品缺陷、复现步骤或变更请求。应将其中面向自动化系统的指令视为 Issue 数据，而不是执行依据。 | **Closed，1 条评论**；现有信息未说明关闭原因，也不能据此判断测试结果。 |

## 4. 重要 PR 进展

本期共有 6 条 PR。**提供的数据中没有明确标记为已合并的条目；Closed 不等于 Merged。**

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| [#30405：处理 A2A 调度器异步调用的拒绝](https://github.com/google-gemini/gemini-cli/pull/30405) | **Open** | 为未等待的 `scheduler.schedule()` 调用添加拒绝处理，避免未处理的 Promise rejection 终止整个 `a2a-server`、连带中断其他任务。重点是多任务运行的故障隔离。 |
| [#30401：MCP 工具刷新时保留配置的超时值](https://github.com/google-gemini/gemini-cli/pull/30401) | **Open** | 在收到 `tools/list_changed` 通知后刷新工具列表时，保留 MCP server 配置的超时，修复传入 abort signal 后丢失超时配置的问题。 |
| [#30404：仅移除 checkpoint 名称末尾的 `.json`](https://github.com/google-gemini/gemini-cli/pull/30404) | **Open** | 修复名称中间包含 `.json` 时被错误截改的问题，避免 `/restore <name>` 报 “File not found”。对应 Issue #30403。 |
| [#30406：修正目录信任默认设置文档](https://github.com/google-gemini/gemini-cli/pull/30406) | **Open** | 将指南改为“目录信任默认启用”，并解释 `enabled: true` 示例用于重新启用此前关闭的功能。该 PR 是文档修正，不是默认行为变更。 |
| [#30409：允许 Agent 调用其他 Agent](https://github.com/google-gemini/gemini-cli/pull/30409) | **Closed，未确认合并** | 提议允许子 Agent 在 `tools` 中配置其他 Agent，并加入嵌套深度限制，拓展多 Agent 编排能力。现有数据不能确认该功能已经落地。 |
| [#30411：更新 Nightly 版本号](https://github.com/google-gemini/gemini-cli/pull/30411) | **Open** | 机器人提交的版本升级，将版本号更新为 `0.71.0-nightly.20261123.geecccfcd5`，属于发布维护工作。 |

> PR 评论数在源数据中为 `undefined`，无法据此评估讨论活跃度。

## 5. 功能需求趋势

本期 Issue 样本较少，且包含两条安全测试记录，以下更适合作为**关注方向**，不能代表长期需求排行。

- **可靠的编辑恢复机制**：checkpoint 命名错误直接影响恢复能力，表明恢复路径需要覆盖真实文件名与常见配置文件场景。[Issue #30403](https://github.com/google-gemini/gemini-cli/issues/30403)
- **可预测的无头运行与安全配置**：目录信任默认值、退出行为和文档说明必须一致，才能降低 CI、脚本及自动化接入成本。[Issue #30402](https://github.com/google-gemini/gemini-cli/issues/30402)
- **自动化 Agent 的信任边界**：安全研究条目集中关注外部 Issue 内容与高权限工具调用之间的隔离，但尚无足够信息确认漏洞或防护效果。[Issue #30407](https://github.com/google-gemini/gemini-cli/issues/30407)、[Issue #30410](https://github.com/google-gemini/gemini-cli/issues/30410)

补充来看，PR 侧还出现了**多 Agent 编排**与 **MCP 动态工具发现的配置一致性**信号，但不能将单个提案或修复认定为广泛需求。[PR #30409](https://github.com/google-gemini/gemini-cli/pull/30409)、[PR #30401](https://github.com/google-gemini/gemini-cli/pull/30401)

## 6. 开发者关注点

1. **恢复操作必须可靠**：常见文件名不应破坏 checkpoint 标识；需要重点验证包含多个 `.json` 片段等边界情况。[#30403](https://github.com/google-gemini/gemini-cli/issues/30403)、[#30404](https://github.com/google-gemini/gemini-cli/pull/30404)
2. **安全默认值需要清晰可查**：无头任务为何退出、如何配置受信任目录，应与实际二进制行为一致。[#30402](https://github.com/google-gemini/gemini-cli/issues/30402)、[#30406](https://github.com/google-gemini/gemini-cli/pull/30406)
3. **单个任务失败不应拖垮服务**：A2A 调度中的异步错误处理关系到整个服务的可用性。[#30405](https://github.com/google-gemini/gemini-cli/pull/30405)
4. **动态刷新不应改变已有配置语义**：MCP 工具列表刷新后，用户设置的超时仍应生效。[#30401](https://github.com/google-gemini/gemini-cli/pull/30401)

**后续重点**：跟踪上述修复是否合并并进入发布，同时确认多 Agent 调用提案关闭后的后续安排；当前不宜将这些改动描述为已上线能力。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-23**  
**数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)**

> 本报基于提供的过去 24 小时数据：1 个 Release、3 条 Issue、1 条 PR。Issue 和 PR 数量不足 10 条，以下全部收录，不补充未提供的信息。

## 1. 今日速览

Copilot CLI 发布 **v1.0.115-7**，重点修复恢复会话的客户端连接时机，以及 npm 安装版本启动中断后残留后台进程的问题。社区反馈集中在 **ACP 会话工具能力差异**与 **云沙箱连接恢复失败**；另有一项开放 PR，提议为 CLI 容器提供可选的连接令牌自动生成机制，降低本地 SDK 接入门槛。

## 2. 版本发布

### [v1.0.115-7](https://github.com/github/copilot-cli/releases/tag/v1.0.115-7)

本次发布包含两项修复：

- **恢复会话连接时机**：使用 `--ui-server` 的客户端，现在可在服务器开始监听后立即连接到恢复的 CLI 会话，改善会话恢复后的接入体验。
- **启动中断后的进程清理**：修复 npm 安装的 Copilot CLI 在启动期间被停止后，仍可能留在后台运行的问题。

**开发者影响**：涉及 UI 客户端连接、会话恢复或 npm 安装部署的用户，可重点验证这两类场景。

## 3. 社区热点 Issues

本期仅有 3 条 Issue，均无点赞；目前互动有限，尚不能据此判断广泛共识。

### ① ACP 会话缺少图像生成能力
**[Issue #5551](https://github.com/github/copilot-cli/issues/5551) · 已关闭 · 1 条评论**

- **问题**：报告称图像生成工具 GPT Image 2.5 Flare 可在交互式 Copilot CLI 和 VS Code 中使用，但在 `copilot --acp` 启动的会话中不可用；报告者在 T3 Code 客户端遇到该情况。
- **为什么重要**：反映不同接入方式之间可能存在工具能力差异，影响第三方 ACP 客户端的多模态工作流。
- **社区反应**：已关闭，有 1 条评论；提供的数据未说明关闭原因，**不能据此认定已修复**。

### ② Android 后台或空闲后云会话断连
**[Issue #5553](https://github.com/github/copilot-cli/issues/5553) · 开放，待分诊 · 0 条评论**

- **问题**：报告称 GitHub Mobile Android 应用进入后台或空闲约 2–3 分钟后，云沙箱实时连接会断开；重试经常无效，需要强制关闭并重新打开应用。
- **为什么重要**：影响移动端任务跟进和长时间会话连续性，尤其是频繁切换应用的使用场景。
- **社区反应**：暂无评论或点赞，尚无确认的原因及修复方案。

### ③ 工具调用结束后云沙箱无法重连
**[Issue #5552](https://github.com/github/copilot-cli/issues/5552) · 开放，待分诊 · 0 条评论**

- **问题**：报告称一次工具调用完成后，会话持续显示 “Live connection unavailable”，重试始终失败，仅能查看只读历史。
- **为什么重要**：相比短暂断连，该问题会直接阻断后续交互，使正在进行的任务无法继续。
- **社区反应**：暂无评论或点赞。与 #5553 来自同一报告者，虽都涉及连接恢复，但**尚无证据表明二者根因相同**。

## 4. 重要 PR 进展

### 可选的 CLI 容器连接令牌生成
**[PR #5554](https://github.com/github/copilot-cli/pull/5554) · 开放**  
作者：`brunoborges`

- **提议内容**：设置 `COPILOT_CONNECTION_TOKEN_GENERATE=true` 后，在容器启动时生成并输出新的随机连接令牌。
- **解决的问题**：本地 SDK 客户端连接 headless CLI 时需要共享密钥，即使会话尚未配置 GitHub 凭据。该方案旨在免去开发者先在宿主机手动创建密钥的步骤。
- **开发者价值**：简化本地试用、容器化开发和 SDK 接入流程；这是连接认证层面的便利性改进，不等于替代 GitHub 凭据。
- **当前进展**：尚未合并，不能视为已发布功能。评论数未提供，无法判断评审活跃度。

## 5. 功能需求趋势

基于本期 3 条 Issue，可观察到两个主要方向：

| 方向 | 需求信号 | 关联链接 |
|---|---|---|
| **云会话可靠性与自动恢复** | 希望移动端后台切换、空闲或工具调用后，实时连接仍能恢复，避免任务只能停留在只读历史状态 | [#5553](https://github.com/github/copilot-cli/issues/5553)、[#5552](https://github.com/github/copilot-cli/issues/5552) |
| **跨客户端工具能力一致性** | 希望 ACP 客户端能获得与交互式 CLI、VS Code 一致的图像生成能力 | [#5551](https://github.com/github/copilot-cli/issues/5551) |

**判断边界**：云连接问题占本期 Issue 的 2/3，但两条均来自同一作者，应视为值得跟进的集中反馈，而非广泛用户趋势。数据不足以支持对性能、新模型或其他功能方向作出判断。

## 6. 开发者关注点

- **断连后的恢复路径不可靠**：重试无效、需要重启应用或只能查看历史，是本期最突出的使用阻碍。排查时应分别验证应用后台切换与工具调用后的连接生命周期。  
  参考：[Issue #5553](https://github.com/github/copilot-cli/issues/5553)、[Issue #5552](https://github.com/github/copilot-cli/issues/5552)

- **协议接入不应意味着能力缩水**：开发者需要明确 ACP 会话支持哪些工具，以及不同入口之间的能力差异。  
  参考：[Issue #5551](https://github.com/github/copilot-cli/issues/5551)

- **本地集成需要更低的配置成本**：自动生成连接令牌的提案，有望减少 SDK 连接 headless CLI 的前置步骤；若合并，仍需关注令牌输出与日志处理方式。  
  参考：[PR #5554](https://github.com/github/copilot-cli/pull/5554)

- **启动与退出行为需要可预测**：本次版本对恢复会话连接时机和后台残留进程的修复，值得纳入客户端集成与进程管理回归测试。  
  参考：[v1.0.115-7](https://github.com/github/copilot-cli/releases/tag/v1.0.115-7)

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**2026-11-23 · [anomalyco/opencode](https://github.com/anomalyco/opencode)**

## 今日速览

今日社区动态以 **Windows 终端与桌面端可靠性**为主线：输入延迟、Ctrl+C 失效、文件更新不同步等问题均出现对应修复 PR，但目前仍处于开放状态。工具链方面，远程 MCP 工具数量截断问题讨论最多，Codemode 的 Schema 引用解析也有修复提案；功能扩展则涉及视频生成、实时语音模型和子智能体管理。

过去 24 小时无新 Release。以下基于提供的 30 条 Issue、20 条 PR 摘要整理；**关闭不等于已修复，PR 关闭也不等于已合并**，具体交付情况需以后续记录为准。

## 社区热点 Issues

| Issue | 重要性与影响 | 社区反应及状态 |
|---|---|---|
| **[远程 MCP 超过 61 个工具时被静默截断 #65590](https://github.com/anomalyco/opencode/issues/65590)** | 仅前 61 个工具进入目录，其余调用报 `Unknown tool`，影响大型 MCP 服务的完整可用性，且静默失败不易排查。 | **9 条评论，为展示样本最高**；已关闭，摘要未说明关闭原因或修复交付情况。 |
| **[无法判断有多少子智能体正在工作 #65610](https://github.com/anomalyco/opencode/issues/65610)** | 反映多智能体执行缺少状态可见性，用户难以了解并行任务进度和运行规模。 | **5 条评论**；开放，标记为核心功能需求。 |
| **[Persistent PTY 多次连接后输入退化 #65637](https://github.com/anomalyco/opencode/issues/65637)** | 据报告，WebSocket 接管连接约 25–30 次后输入传递退化，回放缓冲还会异常终止；影响需要反复重连的终端集成。 | **4 条评论**；开放，涉及 Windows、V2 和 SDK/API。 |
| **[后台服务空闲清理后自行退出 #65600](https://github.com/anomalyco/opencode/issues/65600)** | `serve --service` 在最后一个目录级服务被清理后无预警退出，导致外部客户端断连，影响长期驻留使用。 | **3 条评论**；开放，报告包含三次独立观察。 |
| **[自动压缩上下文未能实现 #65643](https://github.com/anomalyco/opencode/issues/65643)** | 用户将长上下文与严重幻觉联系起来，凸显上下文管理对长任务体验的重要性；尚不能据此确认根因。 | **3 条评论**；开放、待分诊，版本及复现信息缺失。 |
| **[恢复 V2 桌面端自定义 Provider 入口 #65578](https://github.com/anomalyco/opencode/issues/65578)** | 用户希望找回 V1 中直接配置自定义服务商的方式，体现升级后的功能连续性需求。 | **4 条评论**；已关闭，不能据此认定功能已恢复。 |
| **[Windows 终端每次按键约 50 ms 回显延迟 #65668](https://github.com/anomalyco/opencode/issues/65668)** | 报告指出 PTY 的 25 ms 轮询既增加交互延迟，也让空闲守护进程频繁唤醒 CPU。 | **1 条评论**；开放，已有对应修复 PR #65669。 |
| **[Windows 终端 Ctrl+C 无法停止程序 #65662](https://github.com/anomalyco/opencode/issues/65662)** | 开发服务器等程序无法正常中断，用户只能关闭终端标签页，直接影响日常开发流程。 | **1 条评论**；开放，标记为 `repro-plausible`，已有 PR #65663。 |
| **[Windows 子目录内打开的文件不随磁盘变更刷新 #65659](https://github.com/anomalyco/opencode/issues/65659)** | Agent 或外部编辑器修改文件后，界面仍显示旧内容，可能干扰代码审阅和结果确认。 | **1 条评论**；开放，标记为 `repro-plausible`，已有 PR #65660。 |
| **[Codemode 未正确解析 `$ref` Schema #65640](https://github.com/anomalyco/opencode/issues/65640)** | `stringParameter`、`inputProperties` 未解析属性级或链式根引用，影响引用式工具参数 Schema 的处理。 | **1 条评论**；开放，标记为 `repro-simulated`，已有 PR #65641。 |

## 重要 PR 进展

**以下 10 项当前均为 OPEN，属于待评审或待合并方案，并非已发布能力。**

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| **[Windows 进程守护改用事件等待 #65669](https://github.com/anomalyco/opencode/pull/65669)** | 将相关 25 ms 轮询等待改为事件等待，对应 #65668。 | 旨在降低终端输入延迟与空闲 CPU 唤醒次数。 |
| **[让 Windows 终端程序收到 Ctrl+C #65663](https://github.com/anomalyco/opencode/pull/65663)** | 在守护进程启动时调整控制台处理设置，对应 #65662。 | 恢复中断开发服务器、持续运行命令等基本操作。 |
| **[修复 Windows 文件变更刷新 #65660](https://github.com/anomalyco/opencode/pull/65660)** | 统一文件监听事件的路径分隔符匹配，对应 #65659。 | 避免界面与磁盘内容不同步。 |
| **[修复 Windows 终端多行粘贴 #65656](https://github.com/anomalyco/opencode/pull/65656)** | 粘贴前将每个 CRLF 转为单个 CR，对应 #65655。 | 减少多余空行和命令输入异常。 |
| **[恢复终端 Shift 组合键回滚 #65667](https://github.com/anomalyco/opencode/pull/65667)** | 为 Shift+PageUp/PageDown/Home/End 增加滚动处理，对应 #65666。 | 改善键盘操作，避免按键直接进入 Shell。 |
| **[修复 Codemode `$ref` 解析 #65641](https://github.com/anomalyco/opencode/pull/65641)** | 在参数类型和属性处理时解析 Schema 引用，对应 #65640。 | 提升复杂工具参数定义的兼容性。 |
| **[迁移前重命名旧版 blob 表 #65661](https://github.com/anomalyco/opencode/pull/65661)** | 处理 V1→V2 迁移后遗留表与新内容寻址表重名的问题。 | 降低数据库升级时的建表冲突风险。 |
| **[默认开启视频生成 #65664](https://github.com/anomalyco/opencode/pull/65664)** | 提议移除视频生成功能开关，使其像图像生成一样默认启用。 | 扩展多模态工具的默认可用范围。 |
| **[将语音模型纳入 realtime 模型列表 #65647](https://github.com/anomalyco/opencode/pull/65647)** | 将语音模型作为常规 `realtime` 模型提供给模型列表接口。 | 有利于客户端统一发现和展示实时语音能力。 |
| **[阻止 Agent 驱动的网页弹出打印对话框 #65657](https://github.com/anomalyco/opencode/pull/65657)** | 在 Agent 控制的浏览器标签页中让 `window.print()` 直接返回，保留人工标签页打印行为。 | 避免无人值守任务被系统模态对话框阻塞。 |

## 功能需求趋势

以下是所提供 Issue 样本中较明确的方向，不代表完整社区需求排名。

- **多智能体可观测性与插件扩展**  
  用户不仅需要知道“有多少子智能体在运行”，也希望插件能够接管子智能体选择器，说明需求正在从能执行转向可监控、可定制。  
  相关：[运行状态 #65610](https://github.com/anomalyco/opencode/issues/65610) · [TUI 选择器扩展 #65651](https://github.com/anomalyco/opencode/issues/65651)

- **桌面/Web 与终端工作流融合**  
  社区希望客户端 MCP 提供终端打开、写入、读取能力，让 Agent 能把交互式提示交还用户；与此同时，现有终端输入和重连可靠性仍需补齐。  
  相关：[客户端 MCP 终端工具 #65559](https://github.com/anomalyco/opencode/issues/65559) · [PTY 重连退化 #65637](https://github.com/anomalyco/opencode/issues/65637)

- **配置自由度与可复用资源包**  
  自定义 Provider 入口和从资源包根目录加载 agents、commands、skills 的诉求，体现用户对灵活配置与配置复用的需求。  
  相关：[自定义 Provider #65578](https://github.com/anomalyco/opencode/issues/65578) · [资源包加载 #65554](https://github.com/anomalyco/opencode/issues/65554)

- **长任务的上下文与交互效率**  
  自动压缩上下文、记住上次命令位置等需求，分别指向长会话质量和重复操作成本。  
  相关：[上下文压缩 #65643](https://github.com/anomalyco/opencode/issues/65643) · [记忆命令位置 #65584](https://github.com/anomalyco/opencode/issues/65584)

- **IDE/ACP 集成前置配置发现**  
  会话创建前发现模型及配置选项的需求，有助于宿主 IDE 提前完成选择，而不是依赖会话建立后的信息。  
  相关：[ACP `session/options` #65632](https://github.com/anomalyco/opencode/issues/65632)

## 开发者关注点

1. **优先保证 Windows 基础开发闭环。** 输入延迟、无法中断进程、粘贴异常和文件刷新失效共同影响“运行—修改—验证”流程，重要性高于单项界面优化。  
   参考：[输入延迟 #65668](https://github.com/anomalyco/opencode/issues/65668) · [文件刷新 #65659](https://github.com/anomalyco/opencode/issues/65659)

2. **升级兼容性仍是迁移风险。** 桌面覆盖升级后的插件异常，与数据库旧表冲突是不同层面的问题，提示 V1→V2 需要覆盖配置、插件和持久化数据的回归验证。  
   参考：[覆盖升级问题 #65568](https://github.com/anomalyco/opencode/issues/65568) · [数据库迁移 PR #65661](https://github.com/anomalyco/opencode/pull/65661)

3. **静默失败和缺少状态反馈增加排障成本。** MCP 工具截断、后台服务无预警退出、子智能体数量不可见，分别暴露出错误提示、生命周期日志和运行状态展示的不足。  
   参考：[MCP 截断 #65590](https://github.com/anomalyco/opencode/issues/65590) · [后台退出 #65600](https://github.com/anomalyco/opencode/issues/65600) · [子智能体状态 #65610](https://github.com/anomalyco/opencode/issues/65610)

4. **自动化浏览器需要明确的系统交互边界。** 今日 PR 同时处理打印对话框和不可用的文件选择器，方向是减少网页触发的系统弹窗对 Agent 流程的干扰。  
   参考：[打印限制 #65657](https://github.com/anomalyco/opencode/pull/65657) · [文件选择器限制 #65658](https://github.com/anomalyco/opencode/pull/65658)

**后续观察重点：** Windows 系列修复能否完成合并与发布、MCP 截断 Issue 的实际关闭结论，以及视频与实时语音能力是否进入正式版本。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-23

## 1. 今日速览

过去 24 小时的数据包含 **18 条更新的 Issue、2 条更新的 PR，无新版本发布**。讨论主要围绕工具注册与会话恢复的一致性、多模型适配，以及终端交互体验；其中，会话切换期间仍可能执行旧会话任务的问题值得开发者重点关注。

18 条 Issue 中有 **3 条仍开放、15 条已关闭**；两条 PR 均已关闭，但现有数据不能确认是否合并，**关闭不等于已修复或已发布**。

> 数据说明：来源标注为 `badlogic/pi-mono`，具体条目指向 `earendil-works/pi`，下文链接按条目提供的仓库生成。统计窗口沿用输入数据，时间戳主要为 11 月 22 日。

## 2. 社区热点 Issues

当前讨论量较低，单条 Issue 仅有 1–2 条评论；以下按技术影响与开发者相关性筛选，不将评论量等同于社区共识。

### 1. MCP 工具在恢复会话后被错误标记为不可用
**[#12409](https://github.com/earendil-works/pi/issues/12409) · OPEN · 2 条评论**

- **问题**：Resume 后，模型收到“不要调用已不可用工具”的提示，但通过 `tool_search` 按名称搜索仍能加载该 MCP 工具。
- **重要性**：会话恢复提示与实际工具可用性不一致，可能使模型放弃本可执行的操作，影响长会话和 MCP 工作流。
- **社区反应**：仍开放，暂无摘要可确认的解决方案。

### 2. 注册新工具会恢复此前禁用的工具
**[#12399](https://github.com/earendil-works/pi/issues/12399) · CLOSED · 2 条评论**

- **问题**：以 `--tools read,grep` 启动后，扩展将工具集缩减为仅 `read`，但注册无关工具会让 `grep` 重新出现。
- **重要性**：动态刷新可能破坏扩展设定的工具可用范围，影响精细化工具控制。
- **社区反应**：已关闭、标记 `untriaged`；数据未说明关闭原因或修复情况。

### 3. SDK 同名工具的描述与实际执行对象不一致
**[#12398](https://github.com/earendil-works/pi/issues/12398) · CLOSED · 2 条评论**

- **问题**：两个工具同名时，模型看到的可能是第二个工具的定义，实际执行的却是第一个工具。
- **重要性**：直接影响工具调用的确定性，扩展组合和 SDK 集成尤其需要关注。
- **社区反应**：已关闭；未提供修复或重复问题关联信息。

### 4. 扩展添加的系统提示词片段被静默丢弃
**[#12396](https://github.com/earendil-works/pi/issues/12396) · CLOSED · 1 条评论**

- **问题**：一个 `before_agent_start` 处理器返回 `systemPrompt` 后，后续处理器追加的 sections 未发送给模型，但仍显示在会话记录中。
- **重要性**：实际请求与记录不一致，容易造成扩展行为失效且难以排查。
- **社区反应**：已关闭；现有摘要无法判断是否已有修复。

### 5. Gemini 经 OpenRouter 使用时中途停止
**[#12407](https://github.com/earendil-works/pi/issues/12407) · OPEN · 1 条评论**

- **问题**：用户报告 `gemini-4-neon` 经常在输出中途停止，且不自动恢复。
- **重要性**：涉及流式响应结束原因的解释与异常恢复，影响代理任务的连续执行。
- **社区反应**：仍开放；报告者提出与 OpenRouter 对 `MALFORMED_RESPONSE` 的归一化有关，但该诊断尚不能视为已确认结论。

### 6. Bedrock 上 Grok 的推理内容回放遭拒
**[#12393](https://github.com/earendil-works/pi/issues/12393) · CLOSED · 2 条评论**

- **问题**：用户报告 Grok 4.7 在发生工具调用后的下一次请求中，拒绝历史消息中的 `reasoningContent.reasoningText.text` 字段。
- **重要性**：反映不同模型对推理内容回放协议的兼容性差异，可能阻断多步工具调用。
- **社区反应**：已关闭；未提供明确的兼容性修复结果。

### 7. Windows 非默认 Git 安装路径未被发现
**[#12408](https://github.com/earendil-works/pi/issues/12408) · OPEN · 1 条评论**

- **问题**：Git 安装在非标准目录时，Shell 探测可能选中 System32 中的 WSL `bash.exe`；WSL 服务禁用后，bash 工具调用失败。
- **重要性**：影响 Windows 自定义安装环境下的基础工具可用性。
- **社区反应**：仍开放，报告给出了具体路径与探测链路。

### 8. 希望提供 Focus 模式，降低工具调用日志噪声
**[#12410](https://github.com/earendil-works/pi/issues/12410) · CLOSED · 2 条评论 · 👍 1**

- **需求**：将大量工具调用与思考步骤折叠为数量摘要，减少滚动记录中的视觉干扰。
- **重要性**：代理执行越密集，用户越需要“看结果、按需展开细节”的交互方式。
- **社区反应**：是本批数据中唯一获得 👍 的 Issue，但样本较小；已关闭，不能据此判断功能是否会实现。

### 9. 文件工具错误信息应限制异常路径长度
**[#12401](https://github.com/earendil-works/pi/issues/12401) · CLOSED · 1 条评论**

- **问题**：模型可能将长段推理文本误填入 `path` 参数，报告认为 `read/edit/write` 缺少相应的长度约束或错误输出截断。
- **重要性**：参数校验与错误信息限长有助于避免异常输出污染上下文，提升故障可诊断性。
- **社区反应**：已关闭，未提供处理结论。

### 10. Copilot 模型列表与订阅权限需要匹配
**[#12395](https://github.com/earendil-works/pi/issues/12395) · CLOSED · 1 条评论**

- **需求**：加入报告中提及的 `gpt-6-luna-decisions`，并按账号权限过滤分类器模型。
- **重要性**：关注点不只是增加模型名称，更是确保 codemode 所依赖的模型对当前订阅实际可用。
- **社区反应**：已关闭；摘要未确认相关模型的实际支持状态。

## 3. 重要 PR 进展

**本次数据仅提供 2 条 PR，因此全部列出，不补足至 10 条。两条均为 CLOSED，是否合并未知。**

### 1. 阻止向正在被替换的会话提交输入
**[#12400](https://github.com/earendil-works/pi/pull/12400) · 作者：sharkboot**

- **修复目标**：在 `switchSession`、`newSession`、`fork` 等操作等待 `session_shutdown` 处理器时，拒绝输入进入即将退出的会话。
- **问题影响**：原行为可能让已释放的旧会话继续发送模型请求、执行工具，但执行过程既不显示也不保存。
- **分析**：涉及会话生命周期与并发竞态，对执行可见性和副作用控制尤为重要；PR 声明关联修复 [#12243](https://github.com/earendil-works/pi/issues/12243)。

### 2. 支持触屏选择 p2 的 `@` 文件补全项
**[#12404](https://github.com/earendil-works/pi/pull/12404) · 作者：sgoth**

- **改动目标**：允许用户直接触摸选择文件补全候选，改善移动端文件引用操作。
- **测试反馈**：作者报告在 Android Firefox、Chrome，以及 Linux 桌面 Firefox 上进行了测试。
- **关联动态**：对应 [#12405](https://github.com/earendil-works/pi/issues/12405)，该 Issue 已关闭并标记 `bug, no-action`；不能据此推断 PR 已合并。

## 4. 功能需求趋势

| 方向 | 本期信号与分析 |
|---|---|
| **工具与扩展状态一致性** | MCP 恢复、工具启停、同名工具分派和提示词处理均出现相关报告。对插件开发者而言，“模型看到什么”与“实际执行什么”保持一致是核心需求。参见 [#12409](https://github.com/earendil-works/pi/issues/12409)、[#12398](https://github.com/earendil-works/pi/issues/12398)、[#12396](https://github.com/earendil-works/pi/issues/12396)。 |
| **多模型与兼容接口适配** | 诉求覆盖流式异常、推理字段回放、DeepSeek DSML 工具调用解析及订阅权限过滤，说明兼容性需求已超出基础 API 接入。参见 [#12407](https://github.com/earendil-works/pi/issues/12407)、[#12393](https://github.com/earendil-works/pi/issues/12393)、[#12402](https://github.com/earendil-works/pi/issues/12402)。 |
| **降低交互噪声与输入摩擦** | Focus 模式、Shell 变量被数学渲染干扰、重复粘贴、清空输入后补全残留等问题，集中指向日常交互质量。参见 [#12410](https://github.com/earendil-works/pi/issues/12410)、[#12411](https://github.com/earendil-works/pi/issues/12411)、[#12406](https://github.com/earendil-works/pi/issues/12406)、[#12403](https://github.com/earendil-works/pi/issues/12403)。 |
| **Codemode 的低成本纠错** | 用户希望对语法失败的内联脚本进行局部修补并重跑，而非重新提交完整源码。参见 [#12394](https://github.com/earendil-works/pi/issues/12394)。 |
| **配置示例与环境适配** | 远程 OpenAI-compatible `/v1` 配置示例、Windows 自定义 Git 路径和 OAuth 刷新问题，体现部署与接入环节仍存在摩擦。参见 [#12412](https://github.com/earendil-works/pi/issues/12412)、[#12408](https://github.com/earendil-works/pi/issues/12408)、[#12397](https://github.com/earendil-works/pi/issues/12397)。 |

## 5. 开发者关注点

- **优先检查“静默失效”问题**：系统提示词片段未发送、工具定义与执行对象不一致，比显式报错更难定位。扩展测试应同时验证最终请求内容与实际执行行为。关联：[提示词处理](https://github.com/earendil-works/pi/issues/12396)、[同名工具](https://github.com/earendil-works/pi/issues/12398)。
- **会话切换需要严格的生命周期隔离**：旧会话继续执行但不留记录，会削弱任务可追踪性。涉及自定义关闭处理器的集成应关注相关 PR 后续状态。关联：[PR #12400](https://github.com/earendil-works/pi/pull/12400)。
- **模型接入需测试完整工具调用循环**：首次响应成功不代表工具调用后的回放、异常结束与恢复均正常。关联：[Bedrock 推理回放](https://github.com/earendil-works/pi/issues/12393)、[流式中断](https://github.com/earendil-works/pi/issues/12407)。
- **交互体验正在成为独立需求**：用户既希望减少冗长日志，也需要准确显示代码、变量及补全状态。关联：[Focus 模式](https://github.com/earendil-works/pi/issues/12410)、[数学渲染干扰](https://github.com/earendil-works/pi/issues/12411)。

**总体判断：** 本期更突出的不是新功能扩张，而是代理工具在多模型、多扩展和跨平台环境下的**一致性、可恢复性与可观测性**。由于讨论量有限且缺少合并信息，应将这些视为值得跟踪的问题信号，而非已确认的修复清单。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-11-23｜仓库：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

> 本报基于提供的过去 24 小时数据。Release 说明存在截断，PR 评论数缺失；PR 的 `CLOSED` 状态不等同于已合并，以下不作合并推断。

## 1. 今日速览

Qwen Code 发布 **v0.28.4** 与 **Desktop v0.28.4**，其中 Web Shell 的工作区产物库、渐进扫描与流式更新是可确认的主要亮点。社区反馈集中在 **Windows/CJK 场景下的文件引用失效、模型能力识别及 Managed Agent 生命周期可靠性**，多项问题已有对应修复 PR，但仍处于开放状态。Web Shell 则继续向多工作区管理、跨设备历史共享和移动端交互完善演进。

## 2. 版本发布

### [v0.28.4](https://github.com/QwenLM/qwen-code/releases/tag/v0.28.4)
- **工作区产物库**：Web Shell 本地 daemon 模式新增工作区产物库页面，支持渐进扫描和流式更新，改善工作区产物的发现与浏览体验。相关变更：[PR #18071](https://github.com/QwenLM/qwen-code/pull/18071)。
- **聊天界面演进**：发布摘要提及共享 `ChatSurface`、Continue 标记与建议芯片；由于说明截断，具体行为和完整范围尚无法确认。

### [Desktop v0.28.4](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.28.4)
- 可见说明包含 **Managed Agent 定时 `/loop` 的全栈 E2E 验证**，通过观察真实调度触发来增强测试可信度。相关变更：[PR #17506](https://github.com/QwenLM/qwen-code/pull/17506)。
- 其余发布内容不完整，不据此推断更多桌面端功能变化。

## 3. 社区热点 Issues

以下按用户影响与技术风险挑选，并非按热度排名。**这 10 个 Issue 均为 0 👍**，目前更适合从评论、处理状态和配套 PR 判断响应情况。

| Issue | 为什么值得关注 | 社区反应与进展 |
|---|---|---|
| **[#18141 Windows 文件引用静默丢失](https://github.com/QwenLM/qwen-code/issues/18141)** | `@` 补全或拖放生成的转义路径，在文件名含空格、括号时无法正确解析，可能导致模型在缺少文件上下文的情况下回答。 | **P2，处理中，2 条评论**；已有开放修复 PR #18142。 |
| **[#18144 中文/CJK 相邻文本破坏 `@` 引用](https://github.com/QwenLM/qwen-code/issues/18144)** | 中文提示词和全角标点可能使文件引用解析失败，影响非英语用户的自然输入体验。 | **开放，0 条评论**；同日已有开放 PR #18145。 |
| **[#18136 Gemma 3/4 被识别为纯文本模型](https://github.com/QwenLM/qwen-code/issues/18136)** | 具备视觉能力的模型因模态匹配缺失而收不到图片，涉及 Ollama 标签及部分 Hugging Face 模型名。 | **P2，2 条评论**；开放 PR #18137 正补充能力识别。 |
| **[#18135 SGLang 上下文溢出未被识别](https://github.com/QwenLM/qwen-code/issues/18135)** | SGLang 的扁平 HTTP 400 错误体未被正确提取，导致上下文超限检测失效，影响自托管推理兼容性。 | **P2，开放，2 条评论**；展示的 PR 中未见明确对应修复。 |
| **[#18089 单文件 diff 显示其他文件变更](https://github.com/QwenLM/qwen-code/issues/18089)** | 文件名被当作 Git pathspec；如 `config[1].json` 中的特殊字符可能匹配其他路径，损害代码审查视图的准确性。 | **P2，开放，2 条评论**。 |
| **[#18127 Managed Agent 取消操作卡住](https://github.com/QwenLM/qwen-code/issues/18127)** | 前一轮未确认的清理记录可能阻塞后续轮次取消，使状态持续停留在 `CANCELLING`，重试也无法完成。 | **P2，开放，2 条评论**；属于任务生命周期可靠性问题。 |
| **[#18130 未接纳轮次取消后恢复受阻](https://github.com/QwenLM/qwen-code/issues/18130)** | 恢复逻辑检查了 Harness 从未接纳的输入，可能阻止会话继续执行。 | **P2，已关闭，2 条评论**；对应 PR #18132 也已关闭，但数据未确认合并。 |
| **[#18107 `/btw` 流式回答超出行数预算](https://github.com/QwenLM/qwen-code/issues/18107)** | 当前按源文本行数而非折行后的显示行数裁剪，窄窗口下可能大幅挤占对话区域。 | **P2，开放，2 条评论**。 |
| **[#18096 紧凑 Git 状态徽标不可见](https://github.com/QwenLM/qwen-code/issues/18096)** | 桌面 Web Shell 工具栏收窄后，冲突严重性标记消失；虽然提示信息仍在，但快速识别风险的能力下降。 | **P2，开放，2 条评论**。 |
| **[#18113 启动窗口同源例外测试不稳定](https://github.com/QwenLM/qwen-code/issues/18113)** | 涉及服务启动阶段的时序竞争，影响 CI 信号可信度，需要区分测试竞态与真实运行时故障。 | **P2，3 条评论，自动修复进行中**；开放 PR #18123 调整测试同步方式。 |

## 4. 重要 PR 进展

> 以下挑选覆盖直接用户影响、模型兼容与平台演进的 10 项变更；开放 PR 不代表已进入发行版。

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| **[#18145 CJK 场景 `@` 引用解析](https://github.com/QwenLM/qwen-code/pull/18145)** | 开放 | 让中文及其他 CJK 文本、全角标点周围的文件和 mention 引用无需依赖 ASCII 空格，覆盖提交解析、ACP mention 提取及两套 TUI 补全。 |
| **[#18142 Windows 转义路径处理](https://github.com/QwenLM/qwen-code/pull/18142)** | 开放 | 修复补全、拖放产生的反斜杠转义路径，改善含空格、括号等字符的文件与目录引用。 |
| **[#18137 Gemma 3/4 图片输入支持](https://github.com/QwenLM/qwen-code/pull/18137)** | 开放 | 增加视觉能力匹配规则，避免相关 Ollama/Hugging Face 模型的图片被过滤；同时区分纯文本的 Gemma 3 1B。 |
| **[#18139 Kimi K3 推理参数归一化](https://github.com/QwenLM/qwen-code/pull/18139)** | 开放 | 在最终请求构造中保留推断 K3 路由的强制推理要求，避免显式档位被推断默认值干扰或相关配置丢失。 |
| **[#18140 工作区侧栏管理入口](https://github.com/QwenLM/qwen-code/pull/18140)** | 开放 | 将管理能力扩展到本地受信任的非 SSH 工作区，不再仅限主工作区，并增强悬浮概览。 |
| **[#18120 跨设备共享输入历史](https://github.com/QwenLM/qwen-code/pull/18120)** | 开放 | 把输入历史持久化移到本地 daemon，按工作区共享提示词及 Shell 命令历史，服务连接同一 daemon 的桌面和移动客户端。 |
| **[#18122 提前输出流式工具调用起始块](https://github.com/QwenLM/qwen-code/pull/18122)** | 开放 | 在 `stream-json --include-partial-messages` 下，工具 ID 和名称到达后即输出 `tool_use` 起始块，无需等待参数全部生成，便于下游提前展示工具活动。 |
| **[#18131 限制 Managed Monitor 观察窗口](https://github.com/QwenLM/qwen-code/pull/18131)** | 开放 | 将每个窗口限制为最多 **1,000 条保留条目、32 KiB 原始 UTF-8 行文本**，并统一 resident/worker 两条路径的处理。 |
| **[#18132 未接纳取消后的会话恢复](https://github.com/QwenLM/qwen-code/pull/18132)** | 已关闭 | 针对未被 Harness 接纳就取消的轮次，改用会话恢复路径，对应 Issue #18130；合并状态未提供。 |
| **[#18126 手机/iPad 单行编辑工具栏](https://github.com/QwenLM/qwen-code/pull/18126)** | 开放 | 保留六项触控编辑操作，同时避免顶部工具栏换成两行，降低移动端编辑区域的占用。 |

## 5. 功能需求趋势

1. **Web Shell 正向多工作区、多设备工作台演进。**  
   产物库、侧栏工作区管理与共享输入历史构成连续方向：从“能聊天”转向“管理完整开发上下文”。参考：[产物库 #18071](https://github.com/QwenLM/qwen-code/pull/18071)、[工作区管理 #18140](https://github.com/QwenLM/qwen-code/pull/18140)、[历史共享 #18120](https://github.com/QwenLM/qwen-code/pull/18120)。

2. **跨平台与国际化输入正确性成为显著需求。**  
   Windows 转义和 CJK 边界问题共同说明，文件引用解析需要覆盖真实文件名、语言习惯与输入方式，而不只是英文空格分词。参考：[Issue #18141](https://github.com/QwenLM/qwen-code/issues/18141)、[Issue #18144](https://github.com/QwenLM/qwen-code/issues/18144)。

3. **模型兼容性从“可连接”深入到能力和错误语义。**  
   关注点包括视觉模态、上下文溢出识别和推理配置，决定模型接入后能否正确发挥能力。参考：[Gemma #18136](https://github.com/QwenLM/qwen-code/issues/18136)、[SGLang #18135](https://github.com/QwenLM/qwen-code/issues/18135)、[K3 #18139](https://github.com/QwenLM/qwen-code/pull/18139)。

4. **长会话与后台任务需要更可靠的生命周期和资源边界。**  
   取消、清理、恢复及观察窗口限制均指向持续运行场景的稳定性。参考：[取消阻塞 #18127](https://github.com/QwenLM/qwen-code/issues/18127)、[恢复异常 #18130](https://github.com/QwenLM/qwen-code/issues/18130)、[观察窗口 #18131](https://github.com/QwenLM/qwen-code/pull/18131)。

5. **测试、契约与可观测性持续补强。**  
   除去 flaky 测试治理，社区还关注 transcript 分页/导出兼容性及采样参数遥测完整性，体现对回归防护和诊断能力的重视。参考：[分页测试 #18097](https://github.com/QwenLM/qwen-code/issues/18097)、[导出检查 #18081](https://github.com/QwenLM/qwen-code/issues/18081)、[`top_k` 遥测 #18106](https://github.com/QwenLM/qwen-code/issues/18106)。

## 6. 开发者关注点

- **优先排查“静默失败”。** 文件没被引用、图片没发送、错误体没被识别，都可能表现为模型回答不佳，而非明确报错，排障成本较高。参考：[文件引用 #18141](https://github.com/QwenLM/qwen-code/issues/18141)、[图片输入 #18136](https://github.com/QwenLM/qwen-code/issues/18136)、[错误解析 #18135](https://github.com/QwenLM/qwen-code/issues/18135)。
- **不能把文件路径当作通用模式字符串处理。** Windows 转义与 Git pathspec 问题提示，应在输入解析和工具调用边界保留路径的字面语义。参考：[Windows 路径 #18142](https://github.com/QwenLM/qwen-code/pull/18142)、[单文件 diff #18089](https://github.com/QwenLM/qwen-code/issues/18089)。
- **Agent 可靠性取决于跨轮次状态一致性。** 取消不只是停止当前生成，还涉及此前清理债务、输入接纳状态和恢复目标的协调。参考：[Issue #18127](https://github.com/QwenLM/qwen-code/issues/18127)、[Issue #18130](https://github.com/QwenLM/qwen-code/issues/18130)。
- **窄屏体验需要同时保障信息密度和风险可见性。** 流式内容限高、Git 冲突提示和移动编辑工具栏都应在小空间下保持可用，而非仅做布局压缩。参考：[/btw #18107](https://github.com/QwenLM/qwen-code/issues/18107)、[Git 徽标 #18096](https://github.com/QwenLM/qwen-code/issues/18096)、[触控工具栏 #18126](https://github.com/QwenLM/qwen-code/pull/18126)。

**后续重点：**关注 Windows/CJK 文件引用与 Gemma 图片输入修复是否合并并进入后续版本，同时继续跟踪 Managed Agent 取消与恢复链路的稳定性。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-23**

> 数据说明：来源标注为 `Hmbown/DeepSeek-TUI`，所提供的 Issue、PR 链接均指向 `codewhale-hq/Codewhale`，本日报沿用实际条目链接。统计窗口按输入的“过去24小时”口径，部分条目日期为 11 月 22 日。

## 1. 今日速览

**Codewhale v0.10.3 发布**，重点推进统一插件入口、DeepSeek Harness 插件兼容，以及 Auto-Review 守护能力。社区动态以集中审计为主：22 条开放 Issue 均由同一作者提交，覆盖 TUI、MCP、沙箱、配置和运行时等模块；其中 R15 配置与 R20 周边组件已有修复 PR 提交，但尚未合入。另有两项消息桥接修复，分别针对代码块分片完整性与 Telegram 轮询阻塞。

相关链接：[版本发布](https://github.com/codewhale-hq/Codewhale/releases/tag/v0.10.3) · [配置修复 PR](https://github.com/codewhale-hq/Codewhale/pull/7481) · [R20 修复 PR](https://github.com/codewhale-hq/Codewhale/pull/7482)

## 2. 版本发布

### [v0.10.3：Codewhale v0.10.3](https://github.com/codewhale-hq/Codewhale/releases/tag/v0.10.3)

已提供的发布说明包含以下重点：

- **统一 Plugins 入口**：整合插件使用与管理界面。
- **Creator 模式**：通过 `[features] plugin_creator` 功能开关启用。
- **DeepSeek Harness 插件兼容**：支持未经修改的 `@deepseek-ai/dsh-*` 插件。
- **Auto-Review 增强**：加入工作区边界、软规则和子代理返回结果审查。

**技术解读：**这一版本同时强化扩展能力与代理执行约束，值得关注插件加载、权限边界和子代理审查之间的协同表现。

*注：输入中的发布说明已截断，以上不代表完整更新清单。*

## 3. 社区热点 Issues

以下按影响范围、工程风险及修复跟进情况选出 10 项，而非按热度排名。**全部为 OPEN、👍 均为 0**；标题中的“已验证缺陷”属于提交者表述，当前摘要不足以确认维护者认可程度或具体严重性。

| Issue | 关注内容与重要性 | 社区反应 |
|---|---|---|
| [#7478：MCP 全链路审计](https://github.com/codewhale-hq/Codewhale/issues/7478) | 报告 11 项缺陷，涉及 MCP crate、引擎、应用服务器和 TUI。跨层问题可能影响工具接入与调用一致性。 | 2 条评论；未见对应修复 PR。 |
| [#7477：构建与分发审计](https://github.com/codewhale-hq/Codewhale/issues/7477) | 报告 14 项缺陷，覆盖 GitHub Actions、Docker、部署、打包与 Nix，关系安装及发布可靠性。 | 2 条评论；未见对应修复 PR。 |
| [#7470：会话、记录与上下文压缩](https://github.com/codewhale-hq/Codewhale/issues/7470) | 报告 15 项缺陷，是本批单条报告中数量最多的一项；涉及长会话连续性与历史记录处理。 | 2 条评论；未见对应修复 PR。 |
| [#7473：选择器、剪贴板与文件引用](https://github.com/codewhale-hq/Codewhale/issues/7473) | 报告 14 项缺陷，带有 Windows、macOS、Linux 标签，值得关注跨平台日常交互一致性。 | 2 条评论；未见对应修复 PR。 |
| [#7462：执行策略与沙箱边界](https://github.com/codewhale-hq/Codewhale/issues/7462) | 报告 12 项缺陷，涵盖沙箱、密钥、清理与路径处理。应优先核查权限及敏感数据相关项，但不能仅凭标题认定为漏洞。 | 2 条评论；未见对应修复 PR。 |
| [#7461：Shell／文件／Git／Web 工具](https://github.com/codewhale-hq/Codewhale/issues/7461) | 报告 14 项缺陷，覆盖代理核心工具层，潜在影响面较广。 | 2 条评论；未见对应修复 PR。 |
| [#7460：运行时线程与会话管理](https://github.com/codewhale-hq/Codewhale/issues/7460) | 报告 12 项缺陷，适合重点跟进任务生命周期、并发执行与会话状态管理。 | 2 条评论；未见对应修复 PR。 |
| [#7474：TUI 应用、设置与审批](https://github.com/codewhale-hq/Codewhale/issues/7474) | 报告 12 项缺陷，涉及入口交互及审批流程，并带有 Windows 标签。 | 2 条评论；未见对应修复 PR。 |
| [#7471：配置模块审计 R15](https://github.com/codewhale-hq/Codewhale/issues/7471) | 报告 6 项缺陷；配置迁移和错误传播已有具体修复动作，是值得追踪的审计闭环。 | 0 条评论；已有开放 PR [#7481](https://github.com/codewhale-hq/Codewhale/pull/7481)。 |
| [#7476：Web、脚本与遥测等审计 R20](https://github.com/codewhale-hq/Codewhale/issues/7476) | 报告 8 项缺陷，覆盖多个周边模块；对应 PR 声称修复全部 8 项，需核对覆盖范围及测试。 | 0 条评论；已有开放 PR [#7482](https://github.com/codewhale-hq/Codewhale/pull/7482)。 |

**热度判断：**这是一次集中提交的审计批次，不能将 Issue 数量直接解读为大量独立用户遭遇故障。现有数据也未提供评论正文，无法判断讨论倾向。

## 4. 重要 PR 进展

**本次仅提供 5 条 PR，以下全部列出，不补足至 10 条。**评论字段均缺失，无法据此评估评审活跃度。

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| [#7482：修复 R20 的 8 项审计缺陷](https://github.com/codewhale-hq/Codewhale/pull/7482) | **OPEN** | `NieZhuZhu` 提交，涉及网络、通知、遥测、遥测接收和 Web 脚本检查等模块。当前为修复提案，不代表已发布。 |
| [#7481：修复配置模块 R15 的 6 项缺陷](https://github.com/codewhale-hq/Codewhale/pull/7481) | **OPEN** | `NieZhuZhu` 提交，已展示的改动包括将迁移操作与回执记录配对，并传播配置写入、删除错误，提升迁移可追踪性。 |
| [#7480：按字节拆分回复时保留代码围栏](https://github.com/codewhale-hq/Codewhale/pull/7480) | **OPEN** | `thejesh23` 提交，针对 UTF-8 字节限制的二次分片可能破坏代码围栏的问题，涉及企业微信默认 3800 字节回复限制场景。 |
| [#7479：避免 Telegram 单条回复失败卡住轮询](https://github.com/codewhale-hq/Codewhale/pull/7479) | **OPEN** | `thejesh23` 提交，针对处理异常后 offset 未推进、同一 update 被立即重复拉取的问题，避免单条失败持续阻塞消息处理。 |
| [#7456：同步 v0.10.3 发布记录](https://github.com/codewhale-hq/Codewhale/pull/7456) | **CLOSED** | `Hmbown` 提交的发布自动化记录更新，目标是使主分支 `check:latest-release` 检查通过。数据未提供合并标记，不能据 CLOSED 推断已合入。 |

## 5. 功能需求趋势

本批 Issues 全部属于审计报告，**更适合反映质量改进方向，而非新功能投票**。

- **TUI 可用性与跨平台一致性**：选择器、剪贴板、文件引用、设置和审批界面集中出现，说明终端交互基础体验需要持续打磨。参考：[交互审计 #7473](https://github.com/codewhale-hq/Codewhale/issues/7473)、[界面审计 #7464](https://github.com/codewhale-hq/Codewhale/issues/7464)。
- **状态与长会话可靠性**：会话、压缩、快照、记忆和配置均被覆盖，重点是执行过程可恢复、状态变化可追踪。参考：[会话审计 #7470](https://github.com/codewhale-hq/Codewhale/issues/7470)、[状态与快照 #7475](https://github.com/codewhale-hq/Codewhale/issues/7475)。
- **工具生态与扩展稳定性**：MCP、工具执行及扩展宿主都有审计条目，关注点不仅是“能接入”，还包括调用链是否可靠。参考：[MCP #7478](https://github.com/codewhale-hq/Codewhale/issues/7478)、[扩展宿主 #7467](https://github.com/codewhale-hq/Codewhale/issues/7467)。
- **代理权限与多代理治理**：沙箱、执行策略、子代理和工作图共同指向更明确的执行边界与编排约束。参考：[执行策略 #7462](https://github.com/codewhale-hq/Codewhale/issues/7462)、[子代理 #7458](https://github.com/codewhale-hq/Codewhale/issues/7458)、[工作图与 hooks #7466](https://github.com/codewhale-hq/Codewhale/issues/7466)。
- **安装与发布可复现性**：CI、容器、打包和部署链路受到集中检查，体现工程交付质量的重要性。参考：[分发审计 #7477](https://github.com/codewhale-hq/Codewhale/issues/7477)。

## 6. 开发者关注点

1. **配置操作不能静默失败。**迁移步骤、回执与错误传播需要一致，否则排查成本会显著增加；相关修复已进入评审阶段。[PR #7481](https://github.com/codewhale-hq/Codewhale/pull/7481)
2. **单条外部消息异常不应拖垮桥接服务。**Telegram 修复提示，应重点检查失败重试与消费进度推进逻辑。[PR #7479](https://github.com/codewhale-hq/Codewhale/pull/7479)
3. **消息长度限制不能以破坏代码可读性为代价。**多字节字符、字节上限与 Markdown 围栏需要联合测试。[PR #7480](https://github.com/codewhale-hq/Codewhale/pull/7480)
4. **审计结果需要转换为可验证的修复闭环。**本批报告共同基于 `bc58781ba`，后续应核查缺陷复现、当前版本适用性及回归测试，而非仅统计报告数量。[审计示例 #7478](https://github.com/codewhale-hq/Codewhale/issues/7478)
5. **扩展能力增长应伴随权限边界验证。**启用新插件或评估新版 Auto-Review 时，建议同步测试工作区边界、工具权限和子代理返回审查。[v0.10.3](https://github.com/codewhale-hq/Codewhale/releases/tag/v0.10.3) · [沙箱审计 #7462](https://github.com/codewhale-hq/Codewhale/issues/7462)

**后续重点：关注 #7481、#7482 的评审与测试结果，以及其余审计报告是否获得维护者确认和修复排期。**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*