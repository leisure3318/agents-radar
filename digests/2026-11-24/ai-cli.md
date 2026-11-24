# AI CLI 工具社区动态日报 2026-11-24

> 生成时间: 2026-11-24 07:04 UTC | 覆盖工具: 9 个

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
**日期：2026-11-24｜范围：所提供的过去 24 小时社区记录**

> **口径说明：**Issue、PR 数量均指统计窗口内新增或更新的条目，不代表仓库总量；已关闭不等于已合并或已修复。Pi 与 DeepSeek TUI 的来源仓库标注和条目链接不一致，其数据保留展示，但不宜直接用于严格的仓库活跃度排名。

## 1. 生态全景

当前 AI CLI 生态的共同重心，是让既有能力**稳定、可控地完成真实工作流**，而不只是增加模型入口。工具调用、授权持久化、MCP 状态、暂停恢复和资源清理，构成今日跨项目最集中的工程议题。产品边界也在从终端向 Desktop、Web、跨设备会话和托管 Agent 延伸，随之带来更复杂的状态管理问题。与此同时，OpenCode 的插件接口和多项目的 Provider 集成表明，可扩展性仍是重要竞争方向；但单日互动量普遍较低，不能据此判断长期市场格局。

## 2. 各工具活跃度对比

| 工具 | Issues 数 | PR 数 | Release 情况 | 今日主要信号 |
|---|---:|---:|---|---|
| Claude Code | 5，均 Open | 0 | 无 | GitHub 集成、终端阻塞状态、项目总览 |
| OpenAI Codex | 14，均 Open | 2，均 Closed，合并未知 | **`0.173.0-alpha.5`**，无具体变更说明 | 跨设备会话、工具调用、授权及平台兼容 |
| Gemini CLI | 0 | 0 | 无活动记录 | 本窗口无活动 |
| GitHub Copilot CLI | 0 | 0 | 无活动记录 | 本窗口无活动 |
| Kimi Code CLI | 0 | 0 | 无活动记录 | 本窗口无活动 |
| OpenCode | 3，均 Open | **15** | 无 | 插件 API、权限边界、MCP 与交互体验 |
| Pi† | 1，Closed | 0 | 无 | 扩展 Provider 初始化与认证识别 |
| Qwen Code | 0 | 4，均 Open | 无 | 托管 Agent 暂停恢复、测试与 worktree |
| DeepSeek TUI† | 0 | 2，均 Open | 无 | ACP 进程清理、状态报告、网关配置 |
| **所给记录合计** | **23** | **23** | **1 个 Alpha 预发布** | 非完整生态活动统计 |

† Pi 条目链接指向 `earendil-works/pi`；DeepSeek TUI 的两条 PR 指向 `codewhale-hq/Codewhale`，不能直接确认属于所标注来源仓库。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与横向判断 |
|---|---|---|
| **工具调用与 MCP 实际可用性** | Codex、OpenCode、Qwen Code | Codex 出现工具输出关联错误、Desktop MCP 授权差异；OpenCode 涉及工具目录预算与开关状态保留；Qwen 防止等待 Action 时误回收 MCP owner。关注点已不只是“连接成功”，而是工具能否被发现、调用并持续使用。 |
| **授权与执行边界** | Claude Code、Codex、OpenCode、Qwen Code | 分别涉及信任弹窗状态通知、“Always allow”持久化、Web Fetch 按站点授权、Shell 审批前暂停。权限系统需要同时满足安全性与操作连续性。 |
| **会话与项目状态管理** | Claude Code、Codex、OpenCode、Qwen Code | 包括项目状态总览、跨设备同步与归档、历史调用定位、暂停恢复及 worktree 归属。长任务和多会话正在增加状态管理负担。 |
| **Provider 与扩展接入质量** | Codex、OpenCode、Pi、Codewhale 条目 | 涉及线程级 Provider 模型列表、缓存 TTL、Provider 初始化，以及新增兼容网关。协议兼容只是起点，配置与运行时行为同样关键。 |
| **后台成本与资源生命周期** | Codex、OpenCode、Qwen Code、Codewhale 条目 | 分别关注空闲高频唤醒、过密保活、暂停期资源保护及后代进程清理。Agent 的成本不仅来自推理，也来自常驻运行与资源调度。 |

这些是 **Issue 反馈与 PR 开发方向的交集**，不应全部视为已经形成共识的用户高频需求。

## 4. 差异化定位分析

以下侧重描述**今日记录体现出的产品取向**，而非对各工具完整能力的定论。

| 工具 | 功能侧重与技术路线信号 | 对目标用户的启示 |
|---|---|---|
| **Claude Code** | 信任交互、GitHub 入口和项目级信息组织，体现终端与 Web 工作流的衔接需求 | 对依赖仓库接入、跨线程项目管理的用户，这些入口的可靠性值得重点验证 |
| **Codex** | CLI、Desktop、app-server、多 Provider 与跨设备状态共同出现，呈现多端工作环境取向 | 适合关注跨端连续工作的用户评估，但需测试同步边界、权限一致性和平台兼容 |
| **OpenCode** | 插件接口提案最集中，开放设置、工具装饰、原生会话组件和 Skill 附件 | 对插件作者、定制化团队和多 Provider 用户更具观察价值；接口尚需等待审查与发布 |
| **Qwen Code** | 围绕托管 Agent 的暂停、恢复、审批及资源所有权，强调生命周期控制和测试保障 | 更贴近长任务、自动化编排与托管 Agent 场景的工程需求 |
| **Pi** | 唯一样本涉及扩展注册 Provider 的启动时序和认证诊断 | 对通过扩展接入模型的开发者，初始化可观测性值得关注；不足以判断整体定位 |
| **DeepSeek TUI 来源条目** | 实际指向 Codewhale 的 ACP 运行时与兼容网关扩展 | 可作为代理协议集成的技术信号，但不能直接归为 DeepSeek TUI 的产品进展 |
| **Gemini CLI / Copilot CLI / Kimi Code CLI** | 本窗口没有活动记录 | 无法据此判断功能定位、迭代速度或竞争力 |

## 5. 社区热度与成熟度

### 活跃度：Codex 偏反馈密集，OpenCode 偏开发密集

- **Codex 的 Issue 更新最多：14 条，占所给 Issue 的约 61%。**问题覆盖 Desktop、CLI、跨设备和多 Provider，说明本日反馈面较广，但不等于用户规模最大或缺陷率最高。
- **OpenCode 的 PR 更新最多：15 条，占所给 PR 的约 65%。**插件、界面和核心可靠性同时推进，是本日最明显的密集开发信号；不过摘要只详细列出其中 10 条，不能完整判断全部 PR 的性质。
- **Qwen Code 的迭代最集中：**4 条 PR 中 3 条由同一贡献者提交，围绕托管 Agent 展开，更像专项推进，而非广泛社区参与。
- **Claude Code 今日以早期反馈为主：**5 条 Issue、无 PR 或 Release，尚无充分后续验证信息。

### 成熟度：状态边界与测试保障比条目数量更有解释力

目前各项目的讨论深度都有限，已提供的 👍 数均为 0，Issue 评论通常仅 0–2 条，**不足以形成可靠的社区热度排行榜**。

更值得观察的是工程成熟度信号：Qwen Code 在强化生命周期测试，OpenCode 在收敛授权范围，Codex 的反馈暴露多端状态一致性挑战。这些体现的是复杂工作流下的工程议题，而不是足以判定谁“最成熟”的证据。无活动记录也不能解释为项目停滞。

## 6. 值得关注的趋势信号

### ① 竞争焦点向“执行链路可靠性”延伸
模型能回答问题，不代表 Agent 能完成任务。工具输出匹配失败、授权丢失或资源误回收，都可能直接中断工作流。

**开发者参考：**选型测试应覆盖多步工具调用、失败重试、暂停恢复和客户端重启，而不只比较单轮代码生成。

### ② 权限设计需要兼顾范围、持久性和可观测性
OpenCode 的站点级授权、Codex 的重复授权，以及 Claude Code 的 blocked 状态通知，分别对应“允许什么”“允许多久”“何时需要用户介入”。

**开发者参考：**验证权限是否最小化、是否跨重启保持，以及自动化系统能否准确识别等待审批状态。

### ③ 多端与长任务让状态管理成为核心产品能力
同步、删除、归档、worktree 和项目线程不再是附属功能，而会影响用户能否理解并恢复工作。

**开发者参考：**团队部署前明确本地与云端状态边界，测试删除影响范围、历史可发现性及任务恢复路径；不要把“支持同步”等同于“同步语义清晰”。

### ④ 扩展生态的价值取决于运行时契约
OpenCode 正在扩展插件能力，而 Pi、Codex 等反馈说明：Provider 注册时序、模型列表来源、缓存参数和认证状态同样决定接入质量。

**开发者参考：**自建扩展应要求明确的初始化顺序、状态接口和诊断日志，避免仅凭“兼容某 API”判断可用性。

### ⑤ 常驻 Agent 的隐性成本开始显现
Codex 的空闲唤醒和 OpenCode 的保活频率反馈提示，后台监听、重复上下文传输和残留进程都可能放大部署成本；报告中的具体量化结果仍待验证。

**开发者参考：**将空闲 CPU、请求频率、内存驻留和停止后的资源释放纳入基准测试。

---

**综合判断：**本日最明确的信号不是新模型或大版本跃迁，而是各工具正在补强真实工作流中的可靠性、状态一致性和扩展能力。技术选型宜按实际场景进行端到端验证，并持续跟踪维护者复现、PR 合并和版本发布证据，而非仅依据单日条目数量或关闭状态做判断。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-24**

> **数据说明：**提供的 PR 评论数均为 `undefined`、👍均为 0，因此无法核实其热度排名或讨论活跃度。以下按 **Issue 关注信号、相关 PR 的问题价值与更新情况**筛选重点，不作为严格评论榜。展示的 20 个 PR 均为 **OPEN**，暂无已合并或 Draft 的可验证信息。

## 1. 热门 Skills 排行：8 个重点关注对象

| Skill / PR | 功能与此次变化 | 社区关注焦点 | 当前状态 |
|---|---|---|---|
| **skill-creator** — [#1298](https://github.com/anthropics/skills/pull/1298) | Skill 创建与评估工具；修复并行触发评估干扰、Windows 子进程兼容及运行失败处理 | **评估结果是否可信**。相关 [#556](https://github.com/anthropics/skills/issues/556) 有 13 条评论，[#1352](https://github.com/anthropics/skills/issues/1352) 有 6 条评论，均涉及异常低触发率 | **OPEN**；更新于 09-16 |
| **mcp-builder** — [#1742](https://github.com/anthropics/skills/pull/1742) | MCP 服务构建与连接；适配 MCP ≥2 的客户端导入名称及自定义 HTTP 请求头 | SDK 升级后的兼容性，尤其是带认证的远程 MCP 连接；PR 标注修复 #1668 | **OPEN**；更新于 10-08 |
| **docx** — [#1792](https://github.com/anthropics/skills/pull/1792) | Word 文档修订处理；将 LibreOffice 超时报错，并验证修订标记是否真正清除 | **避免“报告成功、文件实际未处理好”**。同类风险还包括 [#2018](https://github.com/anthropics/skills/issues/2018) 报告的无效 XML 与原文件覆盖问题 | **OPEN**；更新于 11-01 |
| **webapp-testing** — [#1980](https://github.com/anthropics/skills/pull/1980) | Web 应用测试辅助；调整服务启动脚本，避免使用 `shell=True` | Agent 生成的命令进入系统 Shell 时的命令注入风险；属于安全加固，而非新增测试能力 | **OPEN**；更新于 11-01 |
| **Notion Spec to Implementation** — [#1245](https://github.com/anthropics/skills/pull/1245) | 将产品或技术规格转成 Notion 实施任务，包含验收标准与进度跟踪 | 打通“需求文档 → 可执行任务 → Claude Code 实施”；同一 PR 还包含简历量化审计 Skill | **OPEN**；更新于 10-15 |
| **md2video-audio** — [#1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经幻灯片流程转成带配音的 MP4 视频 | 从文本交付扩展到多媒体制作；“零成本、拟真人声”等为提交者描述，尚无独立验证 | **OPEN**；更新于 09-15 |
| **Pyxel** — [#525](https://github.com/anthropics/skills/pull/525) | 支持 Python 复古游戏创建、调试与验证，包括无头运行、帧检查及状态检查 | 不只生成代码，还提供可观察、可验证的游戏开发闭环 | **OPEN**；更新于 11-01 |
| **xlsx** — [#2019](https://github.com/anthropics/skills/pull/2019) | 修复外部链接风险检测，覆盖工作表作用域名称及间接别名 | 表格重算前的风险识别完整性，减少外部引用漏检；PR 标注修复 #2013 | **OPEN**；更新于 11-03 |

**判断：**所展示的重点 PR 中，既有新场景扩展，也有大量兼容性、安全性与结果验证修复；不能简单将“新增 Skill 数量”等同于社区最强需求。

## 2. 社区需求趋势

### ① 安全治理与可信分发：讨论最集中的议题
[#492](https://github.com/anthropics/skills/issues/492) 以 **46 条评论、3 个赞**居所展示 Issues 首位，反映社区对第三方 Skill 使用 `anthropic/` 命名空间、混淆官方身份的担忧。结合治理提案 [#412](https://github.com/anthropics/skills/issues/412)，潜在方向是 **Skill 来源验证、权限审查、策略执行与审计**；其中命名空间和分发信任问题也需要平台机制解决，不能仅靠新增 Skill。

### ② 团队共享与生命周期管理：从个人工具走向组织资产
组织级共享请求 [#228](https://github.com/anthropics/skills/issues/228) 有 **17 条评论、8 个赞**，期待共享库或直接分享链接，减少手工下载、转发和上传。重复安装问题 [#189](https://github.com/anthropics/skills/issues/189) 则有 **6 条评论、9 个赞**，说明去重、版本管理和分发体验同样重要。前者主要针对 **Claude.ai**，属于跨产品生态需求。

### ③ 自动评估与质量门禁：先证明 Skill 有效，再优化
触发评估问题 [#556](https://github.com/anthropics/skills/issues/556)、并行评估误判 [#1352](https://github.com/anthropics/skills/issues/1352)，以及三阶段质量门禁提案 [#1385](https://github.com/anthropics/skills/issues/1385)，共同指向 **触发测试、对抗审查、交付验证**。这是当前数据中比“泛化代码审查”或“测试生成”更明确的需求信号。

### ④ 长任务记忆与上下文效率：减少 Skill 自身的负担
compact-memory 提案 [#1329](https://github.com/anthropics/skills/issues/1329) 有 **10 条评论**，探索用紧凑符号记录 Agent 状态；[#1487](https://github.com/anthropics/skills/issues/1487) 则报告 `claude-api` 一次注入约 156k tokens。方向是 **紧凑记忆、按需加载、渐进式披露**，而不是持续增加提示文本。

### ⑤ 文档生产质量：从“能生成”走向“可交付”
DOCX 无效 XML 问题 [#2018](https://github.com/anthropics/skills/issues/2018) 与排版质检提案 [#514](https://github.com/anthropics/skills/pull/514)，体现出 **文件结构校验、排版检查、输出完整性验证**的需求。文档自动化的价值正从内容生成延伸到交付质量保证。

## 3. 高潜力待合并 Skills / 改进

**无法确认哪些 PR“评论活跃”或“近期必然落地”**：缺少有效评论数、维护者审查和合并计划。以下是按问题明确度与生态价值筛出的优先跟踪对象：

| 待合并 PR | 值得跟踪的原因 | 落地不确定性 |
|---|---|---|
| **[skill-creator 评估隔离与跨平台修复 #1298](https://github.com/anthropics/skills/pull/1298)** | 对应多个高关注评估问题，影响 Skill 优化结果的可信度 | 09-16 后未见所提供数据中的更新，不能据此判断即将合并 |
| **[skill-creator 打包执行修复 #1681](https://github.com/anthropics/skills/pull/1681)** | 修复独立执行时的导入失败及过时路径说明；11-19 更新，是所展示 PR 中最近更新者 | 近期更新是跟踪信号，不代表已获维护者批准 |
| **[webapp-testing 安全加固 #1980](https://github.com/anthropics/skills/pull/1980)** | 针对明确的命令注入风险，安全收益直接 | 仍需验证对原有命令链、工作目录等使用方式的兼容性 |
| **[docx 输出验证 #1792](https://github.com/anthropics/skills/pull/1792)** | 将超时和未完成处理显式化，降低错误成功报告的风险 | 暂无测试通过及维护者审查信息 |
| **[Pyxel 游戏开发 #525](https://github.com/anthropics/skills/pull/525)** | 新增 Skill 中较完整地覆盖创建、调试和验证，且长期开放后仍有更新 | 开放时间较长，尚不能推断收录时间 |

## 4. Skills 生态洞察

**当前社区最集中的诉求，是让 Skills 从“可安装的能力包”变成“来源可信、触发可靠、上下文可控、结果可验证”的生产工具，而不只是增加更多 Skill。** 代表信号：[分发信任 #492](https://github.com/anthropics/skills/issues/492)、[触发评估 #556](https://github.com/anthropics/skills/issues/556)、[上下文消耗 #1487](https://github.com/anthropics/skills/issues/1487)。

---

# Claude Code 社区动态日报｜2026-11-24

> 数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)，范围为所提供的过去 24 小时更新记录。

## 1. 今日速览

今日提供的数据包含 **5 条 Issue 更新，均为当天新建且仍处于 Open 状态**；无新版本发布，也无 PR 更新。值得关注的方向是 **GitHub 集成连接失败**、**终端信任交互的状态通知**，以及 **Projects 项目状态总览**需求；但整体互动较少，尚不足以判断为广泛问题。

## 2. 社区热点 Issues

*本次仅有 5 条 Issue，以下全部列出，不补足至 10 条。所有问题均为用户报告，尚不能视为已确认缺陷。*

### ① `--add-dir` 信任弹窗未发出 OSC 7501 blocked 状态
**[#111941](https://github.com/anthropics/claude-code/issues/111941)** · `bug` · `platform:macos` · `area:tui`

- **问题概述**：报告称，`--add-dir` 触发信任对话框时，没有发出 OSC 7501 的 blocked 状态。
- **为什么重要**：若终端或外围工具依赖该信号识别“等待用户操作”，缺失通知可能造成实际交互状态与外部状态显示不一致。
- **社区反应**：0 条评论、0 个 👍，暂无后续验证信息。

### ② GitHub 集成无法完成连接以创建仓库
**[#111943](https://github.com/anthropics/claude-code/issues/111943)** · `bug` · `platform:web` · `github-integration`

- **问题概述**：用户尝试连接 GitHub 以创建仓库，但未成功；报告来自 claude.ai 的 GitHub 集成设置页面。
- **为什么重要**：连接流程是仓库相关工作流的入口，失败会直接阻断后续操作。现有摘要未提供明确错误信息，仍需补充复现步骤与诊断。
- **社区反应**：0 条评论、0 个 👍，尚无共同复现或解决方案。

### ③ 另一条 GitHub 集成无响应反馈
**[#111942](https://github.com/anthropics/claude-code/issues/111942)** · `github-integration`

- **问题概述**：同样来自 GitHub 集成设置页面，用户描述操作后“没有发生任何事”，但任务背景和失败步骤不清晰。
- **为什么重要**：与 #111943 构成同一入口的两条反馈，值得联动排查；不过不能据此认定二者具有相同根因。
- **社区反应**：2 条评论、0 个 👍，是本批数据中评论最多的 Issue；未提供评论内容，无法判断讨论结论。

### ④ Projects 可折叠状态总览横幅
**[#111944](https://github.com/anthropics/claude-code/issues/111944)** · `enhancement`

- **需求概述**：希望在 Projects 中增加可折叠的总览横幅，集中呈现待解问题、受阻工作和对话线程状态。
- **为什么重要**：体现了用户对跨线程项目管理的需求，有助于降低在多段对话间寻找上下文与未完成事项的成本。
- **社区反应**：1 条评论、0 个 👍；目前属于早期需求信号，尚无广泛支持证据。

### ⑤ 门户导出遗漏一个班级的数据报告
**[#111945](https://github.com/anthropics/claude-code/issues/111945)** · `bug` · `platform:linux` · `needs-info`

- **问题概述**：报告称，Pune 门户导出与修正后的 Excel 相比，缺少 PUNAPJ01 班级的 38 名学生记录。
- **为什么重要**：涉及数据完整性，但摘要主要描述业务系统的数据差异，**尚无法确认与 Claude Code 本身的关联**。需补充执行流程、代码或工具调用记录后再判断归属。
- **社区反应**：0 条评论、0 个 👍，带有 `needs-info` 标签。

## 3. 重要 PR 进展

过去 24 小时内，所提供数据中**没有 PR 更新**，因此无可列出的功能实现、修复或合并进展。

仓库入口：[Pull Requests](https://github.com/anthropics/claude-code/pulls)

## 4. 功能需求趋势

今日样本较小，以下为方向性信号，而非成熟趋势：

| 方向 | 观察 | 关联 Issue |
|---|---|---|
| **项目状态可视化** | 唯一明确的新功能请求，希望集中展示待解问题、阻塞事项和线程状态 | [#111944](https://github.com/anthropics/claude-code/issues/111944) |
| **GitHub 集成可靠性** | 两条反馈涉及连接或操作未生效，是今日重复出现的问题领域 | [#111943](https://github.com/anthropics/claude-code/issues/111943)、[#111942](https://github.com/anthropics/claude-code/issues/111942) |
| **终端交互状态可观测性** | 用户关注信任确认期间是否正确发出阻塞状态信号 | [#111941](https://github.com/anthropics/claude-code/issues/111941) |

本批数据未出现明确的 IDE 集成、性能优化或新模型支持需求。

## 5. 开发者关注点

- **连接失败需要更明确的诊断信息**：两条 GitHub 集成反馈均缺少可定位的错误描述。排查重点应是具体操作步骤、授权过程和失败时的诊断信息，而非直接假定为服务故障。关联：[#111942](https://github.com/anthropics/claude-code/issues/111942)、[#111943](https://github.com/anthropics/claude-code/issues/111943)。
- **交互状态需与外部工具保持一致**：信任弹窗不仅是界面问题，状态信号是否完整也影响终端集成与自动化监控。关联：[#111941](https://github.com/anthropics/claude-code/issues/111941)。
- **多线程项目需要统一的工作视图**：用户希望直接识别“尚未解决、已被阻塞、需要继续”的事项，而不是逐个回看对话。关联：[#111944](https://github.com/anthropics/claude-code/issues/111944)。
- **业务结果异常与工具缺陷需区分**：数据导出差异应先建立 Claude Code 操作与异常结果之间的证据链，避免过早归因。关联：[#111945](https://github.com/anthropics/claude-code/issues/111945)。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-24｜来源：[openai/codex](https://github.com/openai/codex)｜统计窗口：过去 24 小时**

## 1. 今日速览

今日发布 **`0.173.0-alpha.5` 预发布版本**，但提供的数据未包含具体变更说明。社区新增/更新的 14 条 Issue 主要集中在 **Desktop 跨设备会话管理、授权与工具调用可靠性，以及平台兼容性**，其中 DeepSeek Responses 路径会话中断和 Linux app-server 空闲唤醒问题值得优先排查。

PR 方面有两项已关闭的改动，分别涉及图片缓存内存释放与 TUI 多提供商模型选择；**现有数据无法确认是否已合并或进入发布版本**。

## 2. 版本发布

### [`0.173.0-alpha.5`](https://github.com/openai/codex/releases/tag/rust-v0.173.0-alpha.5)
- **类型**：Alpha 预发布。
- **更新内容**：现有 Release 信息仅包含版本号，没有功能、修复或兼容性说明。
- **升级建议**：适合测试环境验证；不能据此认定下述 Issue 已修复，或相关 PR 已随版本发布。

## 3. 社区热点 Issues

> 以下按潜在影响与开发者相关性筛选，而非热度排名。全部 14 条 Issue 均处于 OPEN 状态、👍 均为 0；当前讨论仍较早期，报告中的复现结论不等同于维护者确认。

| Issue | 核心问题与关注价值 | 社区反应 |
|---|---|---|
| **[#63549：DeepSeek 工具调用导致会话终止](https://github.com/openai/codex/issues/63549)** | 报告称，DeepSeek Responses API 路径反复出现 `No tool output found for tool call`，直接终止 CLI 会话。涉及自定义模型与工具调用链路，是阻断型可靠性问题。 | **2 条评论**，为本批最高；标题称有 **29 个已确认案例**，但这是报告者提供的结论。 |
| **[#63556：app-server 空闲时高频唤醒](https://github.com/openai/codex/issues/63556)** | 当 `/etc/codex` 不存在时，文件监听器据报会对 `/etc` 下其他进程的文件打开事件作出响应。报告称单实例约每秒唤醒 650 次，可能放大多实例部署的后台资源开销。 | 0 条评论；有量化观测，尚无后续验证记录。 |
| **[#63555：Windows 无法加载组织设置](https://github.com/openai/codex/issues/63555)** | 应用启动后显示 `Organization settings could not be loaded` 并停留在暂停状态。报告列出可用旧版与失败新版，有助于缩小回归范围。 | 0 条评论；报告者称回退旧版可用，不代表官方推荐回退。 |
| **[#63552：Desktop OAuth MCP 授权状态异常](https://github.com/openai/codex/issues/63552)** | macOS Desktop Work 显示 `Auth required`，而独立 CLI 可以发现工具。客户端间行为差异使 OAuth 状态传递与 MCP 集成成为排查重点。 | 1 条评论；目前不足以确定根因。 |
| **[#63558：“Always allow” 权限不持久](https://github.com/openai/codex/issues/63558)** | 用户允许 `node_repl` 后仍反复收到授权弹窗，打断工具执行流程，也削弱权限选项的可预期性。 | 1 条评论；报告称正常使用期间频繁发生。 |
| **[#63557：Windows MSIX 下原生工具启动失败](https://github.com/openai/codex/issues/63557)** | 报告将 Dot 的 `codex_app` 启动失败与 `cmd.exe` 无法访问虚拟化插件目录联系起来，涉及打包环境、路径解析和工具发现。 | 0 条评论；提供了系统、应用和内置 CLI 版本及复现步骤。 |
| **[#63550：跨设备删除项目影响原设备分组](https://github.com/openai/codex/issues/63550)** | 删除另一设备显示的空项目后，原设备的项目分组也被移除。影响用户对“本地操作”与“同步操作”边界的理解；**现有摘要不能据此认定文件丢失**。 | 0 条评论；覆盖 macOS 与 Windows 同账号场景。 |
| **[#63561：归档后侧边会话难以发现](https://github.com/openai/codex/issues/63561)** | 父会话归档后，保存的侧边会话仍关联原 worktree，却未出现在常规列表中。暴露会话可发现性与 worktree 生命周期管理问题。 | 0 条评论；尚无修复或规避方案信息。 |
| **[#63560：希望控制跨设备同步与本地文件打开](https://github.com/openai/codex/issues/63560)** | 用户希望保留设备间对话隔离的选择权，并控制本地文件打开行为。反映新 Work 体验下对默认行为和用户控制权的需求。 | 1 条评论；目前是明确的产品反馈，尚未形成广泛讨论。 |
| **[#63548：无 Git 仓库也能跨 Mac 接续聊天](https://github.com/openai/codex/issues/63548)** | 希望在连接的 Mac 之间转移完整聊天历史，不强制要求 Git 仓库，并可选择携带哪些工作区文件。对非代码任务及临时目录工作流有价值。 | 1 条评论；需求重点是将会话迁移与仓库约束解耦。 |

## 4. 重要 PR 进展

**本次数据仅提供 2 条 PR，以下全部列出，不补足至 10 条。两者状态均为 CLOSED，不能直接解读为已合并。**

### [#63563：释放调用方不再持有的提示图片缓冲区](https://github.com/openai/codex/pull/63563)
- **问题**：最后一个调用方释放图片后，提示图片缓存仍保留原始图片字节。
- **改动意图**：释放不再需要的原始缓冲区，同时保留图片已成功解码、可复用的记录。
- **价值**：降低图片缓存的内存驻留，值得关注长会话与图片密集型使用场景。
- **状态**：已关闭；是否合并、何时发布未知。

### [#63553：TUI 模型选择器使用当前线程的提供商](https://github.com/openai/codex/pull/63553)
- **问题**：恢复的线程可能使用不同于 app-server 默认配置的模型提供商，导致 `/model` 显示错误来源的模型列表。
- **改动意图**：按提供商获取和缓存模型列表，使模型选择与活动线程保持一致。
- **价值**：改善多提供商配置及历史线程恢复场景，减少误选与配置困惑。
- **状态**：已关闭；是否合并、何时发布未知。

## 5. 功能需求趋势

### ① 跨设备工作流需要更细的控制与清晰的边界
需求不仅是“自动同步”，还包括选择是否同步、无仓库迁移、选择性传输文件，以及明确删除操作的影响范围。同步便利性与设备隔离需求正在同时出现。  
关联：[同步控制 #63560](https://github.com/openai/codex/issues/63560)、[聊天接续 #63548](https://github.com/openai/codex/issues/63548)、[项目分组 #63550](https://github.com/openai/codex/issues/63550)

### ② 个性化与配置入口需要稳定、可发现
用户希望 CLI 提示历史导航范围可配置，同时保留现有默认行为；Skills 列表需要字母排序和更规范的名称展示。另有用户报告 Custom Rules 入口消失，但其原因尚未明确。  
关联：[历史导航 #63547](https://github.com/openai/codex/issues/63547)、[Skills 展示 #63554](https://github.com/openai/codex/issues/63554)、[Custom Rules #63551](https://github.com/openai/codex/issues/63551)

### ③ 工具与第三方模型的可靠性比扩充入口更紧迫
本批反馈更关注现有能力能否持续工作：工具输出是否正确关联、授权是否保持、Desktop 与 CLI 的 MCP 行为是否一致，而非单纯要求增加新模型。  
关联：[DeepSeek 调用 #63549](https://github.com/openai/codex/issues/63549)、[MCP OAuth #63552](https://github.com/openai/codex/issues/63552)、[权限持久化 #63558](https://github.com/openai/codex/issues/63558)

### ④ Desktop 状态管理与基础性能成为体验重点
项目创建模式、归档会话可见性和后台监听开销，都会影响开发者对应用行为的可预期性。  
关联：[项目创建 #63562](https://github.com/openai/codex/issues/63562)、[侧边会话 #63561](https://github.com/openai/codex/issues/63561)、[后台唤醒 #63556](https://github.com/openai/codex/issues/63556)

## 6. 开发者关注点

- **先解决阻断型故障**：会话被工具调用错误终止、Windows 启动停滞及原生工具启动失败，直接影响可用性。  
  [#63549](https://github.com/openai/codex/issues/63549) · [#63555](https://github.com/openai/codex/issues/63555) · [#63557](https://github.com/openai/codex/issues/63557)
- **减少重复授权与跨端差异**：用户需要“已授权即可稳定使用”，而不是在 Desktop、CLI 和不同工具之间重复排查权限。  
  [#63552](https://github.com/openai/codex/issues/63552) · [#63558](https://github.com/openai/codex/issues/63558)
- **让会话和项目状态可解释**：同步、删除、归档与 worktree 关联应有明确边界，避免用户无法判断内容去了哪里、操作会影响哪台设备。  
  [#63550](https://github.com/openai/codex/issues/63550) · [#63561](https://github.com/openai/codex/issues/63561)
- **兼顾空闲成本与默认行为稳定性**：后台服务应避免无效唤醒；新增配置应保留熟悉的默认工作流。  
  [#63556](https://github.com/openai/codex/issues/63556) · [#63547](https://github.com/openai/codex/issues/63547)

**总体判断：** 今日反馈的主线是现有工作流的可靠性与可控性。后续最值得跟踪的是阻断型问题的维护者复现、跨设备操作语义的澄清，以及两项已关闭 PR 的实际合并和发布状态。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-11-24

> 数据来源：[anomalyco/opencode](https://github.com/anomalyco/opencode)，统计范围为过去 24 小时内更新的条目。今日无新 Release；收录 3 条 Issue、15 条 PR。

## 1. 今日速览

今日开发重点集中在 **插件扩展能力、交互体验和核心运行可靠性**：TUI 与 Skill 插件接口持续扩展，桌面端及应用界面有多项体验改进提案。核心侧值得关注的变更包括 Web Fetch 授权范围收敛、MCP 开关状态保留，以及 Windows 环境下的沙箱路径处理修复；社区新反馈则涉及缓存保活频率、MCP 工具可见性和 Agent 颜色展示。

## 2. 社区热点 Issues

本次数据仅包含 **3 条 Issue**，以下全部列出，不补足至 10 条。三者均为 OPEN，各有 1 条评论、0 个 👍；目前互动量有限，排序依据技术影响，而非讨论热度。

### ① MCP 工具目录预算可能让部分工具对模型不可见
[Issue #65997](https://github.com/anomalyco/opencode/issues/65997) · `area/mcp` · `version/v2` · `platform/windows`

- **问题**：Code Mode 使用硬编码的 2,000 字符内联预算展示工具签名。报告以 Slack MCP 为例：约 30 个工具、平均描述约 1,400 字符，预算可能在展示 2–5 个工具后耗尽。
- **为什么重要**：工具即使已连接，也可能无法被模型充分发现，影响 MCP 集成的实际可用性。
- **社区反应**：1 条评论、0 个 👍；尚不能据此判断影响范围。

### ② Claude 订阅接入缺少缓存 TTL，导致保活过于频繁
[Issue #66001](https://github.com/anomalyco/opencode/issues/66001) · `area/providers` · `version/v2` · `platform/windows`

- **问题**：报告称，Claude 订阅方式接入的 `claude-agent` 缓存有效期为一小时，但模型未设置 `settings.cache.ttl`，使自动保活回退到每 4 分钟一次，并重复发送完整上下文。
- **为什么重要**：暴露了 Provider 缓存元数据与保活调度之间的不匹配，可能产生不必要的请求和上下文传输。
- **社区反应**：1 条评论、0 个 👍；当前仍是待验证、待处理的反馈。

### ③ Desktop 希望展示 Agent 专属颜色
[Issue #66009](https://github.com/anomalyco/opencode/issues/66009) · `area/desktop` · `version/v2`

- **需求**：让桌面端使用 Agent 配置文件中指定的独立颜色。
- **为什么重要**：有助于区分不同 Agent，提高多 Agent 工作流中的身份辨识度，也让配置能力与界面表现保持一致。
- **社区反应**：1 条评论、0 个 👍；属于早期交互增强需求。

## 3. 重要 PR 进展

以下选取 10 项。**CLOSED 仅代表已关闭，现有数据不能确认是否已合并；OPEN 也不代表功能已发布。**

| PR | 状态 | 功能或修复内容及意义 |
|---|---|---|
| [#66000](https://github.com/anomalyco/opencode/pull/66000) Web Fetch 按站点保存永久授权 | CLOSED | 针对“Allow always”保存为 `webfetch: * → allow`、进而放行所有站点的问题，改为保存目标站点。属于值得重点核查的权限范围收敛。 |
| [#66013](https://github.com/anomalyco/opencode/pull/66013) 按沙箱自身规则解析路径 | OPEN | 修复 Windows 核心测试中沙箱 Location 路径处理问题，避免宿主与沙箱路径规则混用。同日还有相近提案 [#65996](https://github.com/anomalyco/opencode/pull/65996)；两者均带有 `needs:compliance` 标签。 |
| [#65999](https://github.com/anomalyco/opencode/pull/65999) 保留 MCP 运行时开关状态 | OPEN | 修复 `/mcps` 连接、断开状态只存在于 Location 内存中、重建后无法保留的问题，提升工具连接行为的一致性。 |
| [#66008](https://github.com/anomalyco/opencode/pull/66008) 允许插件为 Skill 附加文件 | OPEN | 让插件提供的 Skill 能携带额外文件，与内置及 Console Skill 的能力对齐，并让内置 Skill 插件回归使用 `ctx.skill`。 |
| [#66005](https://github.com/anomalyco/opencode/pull/66005) 开放通用 TUI 设置与工具装饰接口 | OPEN | 新增 `ui.settings` 和 `ui.tools.decorate` 扩展点，使插件能够展示实时设置、定制内置工具卡片标题。 |
| [#66003](https://github.com/anomalyco/opencode/pull/66003) 向插件开放原生会话记录组件 | OPEN | 提供 `ui.session.transcript(input)`，允许插件嵌入原生、可滚动的会话记录，减少自行实现会话展示的需要。 |
| [#66010](https://github.com/anomalyco/opencode/pull/66010) 从 Shell 通知定位旧消息中的调用 | OPEN | 针对 Shell 调用已落在未加载历史页时，点击完成通知无法定位的问题，增加向旧历史分页查找的处理。 |
| [#66002](https://github.com/anomalyco/opencode/pull/66002) 下载更新时显示状态提示 | OPEN | 桌面端更新提示此前仅在更新就绪后出现；该提案让下载期间也显示标题栏提示，缓解“更新是否在进行”的不确定感。 |
| [#66006](https://github.com/anomalyco/opencode/pull/66006) 支持展开排队消息 | OPEN | 为每条排队消息增加独立展开能力，提升发送前查看队列内容的便利性。 |
| [#66012](https://github.com/anomalyco/opencode/pull/66012) 通过右键菜单将文件树移至右侧 | OPEN | 在 Open file、Review 面板的文件树相关区域增加上下文菜单入口，提供更灵活的布局调整方式。 |

## 4. 功能需求趋势

仅依据本次 3 条 Issue，可归纳出三个方向；样本较小，不宜推断为整个社区的长期优先级。

- **MCP 从“连接成功”走向“工具真正可用”**：工具描述长度与目录预算发生冲突，说明工具发现机制需要考虑较大规模、长描述的服务。[#65997](https://github.com/anomalyco/opencode/issues/65997)
- **Provider 集成需要更准确的运行参数**：缓存 TTL 等元数据会直接影响自动保活策略，接入质量不仅取决于模型能否调用。[#66001](https://github.com/anomalyco/opencode/issues/66001)
- **多 Agent 工作流需要更清晰的视觉区分**：专属颜色需求体现了用户对 Agent 身份可视化及配置一致性的关注。[#66009](https://github.com/anomalyco/opencode/issues/66009)

## 5. 开发者关注点

结合 Issue 与 PR，今日反馈主要落在以下痛点：

1. **隐式默认值可能影响行为正确性**：工具目录字符预算、缓存保活回退间隔都可能在用户未察觉时改变实际运行效果。[#65997](https://github.com/anomalyco/opencode/issues/65997) · [#66001](https://github.com/anomalyco/opencode/issues/66001)
2. **权限边界与跨平台路径处理需要精确**：永久授权不应意外扩大为全站点放行，沙箱路径也不应套用宿主规则。[#66000](https://github.com/anomalyco/opencode/pull/66000) · [#66013](https://github.com/anomalyco/opencode/pull/66013)
3. **长会话和状态重建不能破坏操作连续性**：旧 Shell 调用应可定位，MCP 开关不应因 Location 重建而丢失。[#66010](https://github.com/anomalyco/opencode/pull/66010) · [#65999](https://github.com/anomalyco/opencode/pull/65999)
4. **插件开发需要可复用的原生能力**：Skill 附件、设置入口、工具卡片装饰及会话组件形成了今日较集中的扩展接口提案。[#66008](https://github.com/anomalyco/opencode/pull/66008) · [#66005](https://github.com/anomalyco/opencode/pull/66005) · [#66003](https://github.com/anomalyco/opencode/pull/66003)

> **观察结论**：今日更值得关注的是工具链可靠性与可扩展性的细化，而非版本级功能跃迁。建议优先跟踪授权范围修复、MCP 工具可见性问题，以及插件 API 提案的后续审查结果。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-24

> 统计范围：所提供的过去 24 小时 GitHub 数据。今日共 1 条更新 Issue，无新 Release、无 PR 更新。数据源标注为 `badlogic/pi-mono`，但 Issue 链接标注指向 `earendil-works/pi`；下文沿用条目提供的仓库归属。

## 1. 今日速览

今日动态集中在 **扩展注册的模型提供商初始化与认证状态识别**：有开发者反馈，新会话偶发停留在占位模型，并提示“No models available”，重启一两次后恢复。相关 Issue 已关闭，但提供的摘要没有说明关闭原因或修复方案，**暂不能认定问题已修复**。  
[查看 Issue #12467](https://github.com/earendil-works/pi/issues/12467)

## 2. 社区热点 Issues

今日仅有 1 条更新 Issue，以下按实际数据列出，不补足 10 条。

### #12467：扩展注册的 resolver-auth 提供商在首次模型选择时仍未配置

- **状态**：已关闭；带有 `untriaged` 标签。
- **作者**：`amanverma-765`；当日创建并更新。
- **问题表现**：新会话偶发使用 `provider: "unknown"` 的占位模型，提示无可用模型，并引导用户通过 `/login` 登录；退出后重启一两次可恢复。
- **为什么重要**：直接影响首次启动与模型选择体验，也可能让用户将初始化异常误判为缺少凭据。值得排查扩展注册、认证解析与初始模型选择之间的执行顺序及状态同步。
- **社区反应**：已有 2 条评论、0 个 👍。评论内容未提供，无法判断是否已有维护者确认、临时方案或后续修复安排。

[GitHub：Issue #12467](https://github.com/earendil-works/pi/issues/12467)

## 3. 重要 PR 进展

过去 24 小时内，所提供数据中**没有更新的 PR**，因此暂无可汇总的功能或修复进展。这不代表仓库没有进行中的 PR。  
[查看数据源仓库 PR 列表](https://github.com/badlogic/pi-mono/pulls)

## 4. 功能需求趋势

当前仅有 1 条 Issue，**不足以判断社区整体趋势**。从该反馈可以提炼出两个值得跟踪的技术方向：

- **扩展提供商的启动可靠性**：需关注扩展注册的 provider 能否在首次模型选择前完成配置，避免出现“重启后才可用”的偶发状态。  
  [相关反馈：#12467](https://github.com/earendil-works/pi/issues/12467)
- **认证与模型可用性的诊断能力**：应区分“未登录”“提供商尚未初始化”和“没有可用模型”，让错误提示更准确，而非统一引导用户登录。  
  [相关反馈：#12467](https://github.com/earendil-works/pi/issues/12467)

## 5. 开发者关注点

- **偶发启动异常难以复现**：重启可恢复的现象提示需要关注初始化时序，但现有信息不足以确认根因。建议排查时记录 provider 注册、认证解析和模型列表加载的时间顺序。  
  [相关 Issue](https://github.com/earendil-works/pi/issues/12467)
- **错误提示与实际原因可能不一致**：当界面提示登录，而重启即可恢复时，用户容易反复检查凭据配置，增加排障成本。  
  [相关 Issue](https://github.com/earendil-works/pi/issues/12467)
- **关闭状态不等于修复确认**：后续应核实该 Issue 的关闭原因，以及是否关联修复提交、PR 或版本，避免将“已关闭”直接视为“已解决”。  
  [跟踪 Issue](https://github.com/earendil-works/pi/issues/12467)

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报｜2026-11-24

> 数据来源：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)，统计范围为过去 24 小时更新记录。

## 1. 今日速览

今日未有新版本发布或 Issue 更新，共有 **4 个 PR 更新，均处于 OPEN 状态**。开发重点集中在托管 Agent 的暂停与恢复可靠性、MCP 资源回收保护，以及 `qwen serve` 对嵌套工作树的分支支持；其中 3 个 PR 由同一贡献者提交，围绕托管 Agent 的实现与测试保障展开。

## 2. 社区热点 Issues

**过去 24 小时内没有更新的 Issue**，因此本期不列出热点榜单，也无法据此判断社区讨论热度或用户反馈。

PR 摘要多次关联 [#18149](https://github.com/QwenLM/qwen-code/issues/18149)，涉及托管 Agent 的分阶段工作，但当前数据未提供该条目的正文、状态与讨论内容，不作进一步解读。

## 3. 重要 PR 进展

本期仅有 4 个 PR，以下全部列出，不补足至 10 个。**这些变更尚未合并，不代表已进入正式版本。**

### ① 防止 Action 等待期间误回收 MCP owner

**[PR #18234](https://github.com/QwenLM/qwen-code/pull/18234)** · `fix(managed-agent)` · 作者：doudouOUC

- **变更内容**：调整暂停状态下的 MCP 回收任务，避免回收因等待 Action 而暂停的 Session 所持有的 MCP owner。
- **重要性**：保护等待期间仍需保留的资源所有权，为后续 Action 恢复执行提供保障。
- **进展定位**：属于 #18149 Stage 4 的 S6a，是 MCP Action parking 后续 Harness 实现所需的控制面保护。

### ② 修正恢复测试中 Session 关闭过早的问题

**[PR #18233](https://github.com/QwenLM/qwen-code/pull/18233)** · `test(managed-agent)` · 作者：doudouOUC

- **变更内容**：在两个 monitor-wake 恢复测试中，等待恢复后的 wake Turn 释放 Session，再执行关闭。
- **重要性**：让测试清理顺序与实际生命周期一致，减少提前关闭 Session 带来的时序干扰。
- **覆盖场景**：Harness 在等待期间退出后的恢复，以及 Store 故障导致 continuation 读取失败后的重试。

### ③ 支持从嵌套工作区 worktree 创建分支

**[PR #18232](https://github.com/QwenLM/qwen-code/pull/18232)** · `fix(serve)` · 作者：callmeYe

- **变更内容**：允许 `qwen serve` 从已注册 workspace 下的托管任务 worktree 创建分支。
- **边界约束**：源 checkout 必须属于对应 workspace，并通过现有 Git 仓库、Session 快照、sidecar 和所有权标记检查。
- **重要性**：改善已有任务工作树上的分支操作体验，同时保留工作区归属与状态校验。

### ④ 固化 Shell 暂停行为测试与启动前检查

**[PR #18231](https://github.com/QwenLM/qwen-code/pull/18231)** · `test(managed-agent)` · 作者：doudouOUC

- **变更内容**：确认 #18149 Stage 5 的启动前检查，覆盖 `run_shell_command` 在审批等待阶段、Shell 派发前暂停的路径；同时固化已有的 public-children Shell parking 行为测试，并记录到覆盖设计中。
- **重要性**：明确审批等待与命令派发的边界，为后续实现提供测试基线。
- **变更性质**：以测试与设计记录为主，不应解读为新增生产功能已上线。

**社区反应说明**：上述 PR 均为 0 个 👍，评论数字段未提供有效值，暂无法判断讨论活跃度。

## 4. 功能需求趋势

由于本期没有 Issue 更新，**无法从用户需求侧提炼可靠趋势**。仅从 PR 活动观察，可见以下开发方向：

| 方向 | 当前信号 | 相关链接 |
|---|---|---|
| 托管 Agent 暂停与恢复可靠性 | 保护 Action 等待期间的 MCP owner，完善恢复后的 Session 生命周期处理 | [#18234](https://github.com/QwenLM/qwen-code/pull/18234)、[#18233](https://github.com/QwenLM/qwen-code/pull/18233) |
| 审批等待与执行边界 | 固化 Shell 派发前暂停行为及启动前检查 | [#18231](https://github.com/QwenLM/qwen-code/pull/18231) |
| 多工作树任务工作流 | 支持从 workspace 下的托管任务 worktree 创建分支 | [#18232](https://github.com/QwenLM/qwen-code/pull/18232) |

当前数据不足以支持 IDE 集成、性能优化或新模型支持等方向的热度判断。

## 5. 开发者关注点

以下为 PR 反映出的工程关注点，并非已统计的用户高频反馈：

- **等待状态下的资源保留**：暂停不等于资源可回收，MCP owner 的生命周期需要识别 Action 等待状态。[#18234](https://github.com/QwenLM/qwen-code/pull/18234)
- **恢复流程中的异步时序**：观察到恢复后的 Turn，并不意味着 Session 已可立即关闭；测试需要等待明确的释放条件。[#18233](https://github.com/QwenLM/qwen-code/pull/18233)
- **审批前后的执行边界**：重点验证 Shell 尚未派发时的暂停行为，避免审批等待与实际执行之间出现语义偏差。[#18231](https://github.com/QwenLM/qwen-code/pull/18231)
- **工作树便利性与归属校验兼顾**：扩大分支操作支持范围的同时，继续执行 workspace、快照及所有权检查。[#18232](https://github.com/QwenLM/qwen-code/pull/18232)

**总体判断**：今日是以可靠性与测试保障为主的开发日，后续值得关注这些 PR 的合并情况，以及托管 Agent 暂停／恢复链路的进一步进展。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-24｜统计范围：过去 24 小时**

> **数据说明：**来源标注为 [Hmbown/DeepSeek-TUI](https://github.com/Hmbown/DeepSeek-TUI)，但所提供的 PR 均指向 [codewhale-hq/Codewhale](https://github.com/codewhale-hq/Codewhale)。以下按所给记录整理，不推断两仓库的关联。今日无新版本、无更新 Issue，仅有 2 条更新 PR，因此不补足至 10 条。

## 1. 今日速览

今日动态集中在**模型网关接入**与 **ACP 运行时可靠性**：两条新建 PR 分别新增 onomeo 提供商配置，以及修复代理进程清理、登录状态报告和外部拒绝结果分类。两条 PR 均处于 **OPEN** 状态，尚不能视为已合并或已发布；现有数据也不足以判断社区讨论热度。

## 2. 社区热点 Issues

过去 24 小时内**没有更新的 Issue**，无法筛选热点，也无法据此评估社区反应。这仅代表本次统计窗口没有相关记录，不代表项目没有待处理问题。

[查看来源仓库 Issues](https://github.com/Hmbown/DeepSeek-TUI/issues)

## 3. 重要 PR 进展

### #7524：修复 ACP 代理进程清理与状态报告
- **状态 / 作者：**OPEN · Hmbown
- **主要内容：**补齐此前 #7504 留下的三项 ACP 工作：清理脱离原会话的代理后代进程、报告登录状态，以及为外部拒绝结果提供类型化表达。
- **为何重要：**现有停止或中断逻辑只向 worker 自身会话中的进程发送信号，可能遗漏逃逸到其他会话的后代进程。此修复面向停止操作后的进程残留问题；另外两项改动则有助于调用方更准确地识别认证状态与拒绝结果。
- **当前反馈：**👍 0；评论数未提供，无法判断讨论情况。

[查看 PR #7524](https://github.com/codewhale-hq/Codewhale/pull/7524)

### #7525：新增 onomeo 内置提供商描述配置
- **状态 / 作者：**OPEN · Owaid0723666（外部贡献者）
- **主要内容：**新增 onomeo 的内置兼容主机描述配置，沿用 WorldRouter、LLMTR 和 Opper 等接入方式；`/provider` 使用 `ONOMEO_API_KEY`。
- **为何重要：**根据 PR 摘要，onomeo 是 OpenAI 兼容网关，可通过一个密钥访问 Claude、GPT、Gemini 和 DeepSeek 模型。该改动主要扩展现有提供商配置目录，而非引入新的协议。
- **当前反馈：**👍 0；评论数未提供，暂无足够数据衡量社区接受度。

[查看 PR #7525](https://github.com/codewhale-hq/Codewhale/pull/7525)

## 4. 功能需求趋势

**本日没有 Issue 样本，无法提炼可靠的社区需求趋势。**仅从两条 PR 可以观察到以下开发方向，但不能将其视为社区高频诉求：

| 方向 | 今日信号 | 参考 |
|---|---|---|
| 多提供商与多模型接入 | 通过内置描述配置扩展 OpenAI 兼容网关，降低手动配置成本 | [#7525](https://github.com/codewhale-hq/Codewhale/pull/7525) |
| 代理运行时可靠性 | 完善停止、中断后的后代进程清理 | [#7524](https://github.com/codewhale-hq/Codewhale/pull/7524) |
| 状态与错误语义清晰化 | 显式报告登录状态，并类型化外部拒绝结果 | [#7524](https://github.com/codewhale-hq/Codewhale/pull/7524) |

## 5. 开发者关注点

以下关注点来自 PR 描述，**并非已验证的高频用户反馈**：

- **停止代理后能否彻底释放进程资源：**建议关注脱离原会话的后代进程是否被覆盖，以及停止、中断路径的回归验证。[#7524](https://github.com/codewhale-hq/Codewhale/pull/7524)
- **调用方能否准确识别运行状态：**登录状态与外部拒绝结果的结构化表达，有助于减少上层集成中的模糊判断。[#7524](https://github.com/codewhale-hq/Codewhale/pull/7524)
- **新增网关是否保持配置体验一致：**onomeo 沿用既有描述配置模式，后续可关注密钥读取、提供商选择和模型访问是否按预期工作。[#7525](https://github.com/codewhale-hq/Codewhale/pull/7525)

**结论：**今日更新体现出“扩展接入能力 + 补强运行时可靠性”的开发方向；实际可用性仍需等待 PR 合并及后续发布确认。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*