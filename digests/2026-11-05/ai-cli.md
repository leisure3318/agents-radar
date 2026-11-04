# AI CLI 工具社区动态日报 2026-11-05

> 生成时间: 2026-11-04 16:23 UTC | 覆盖工具: 9 个

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
**日期：2026-11-05｜基于所提供的过去 24 小时社区动态**

## 1. 生态全景

本期样本显示，AI CLI 工具的竞争重点正从“接入更多模型和工具”，转向**稳定执行、状态可信与失败可恢复**。产品边界持续扩展至桌面端、IDE、浏览器、云端线程与托管 Agent，随之出现更多跨环境认证、权限和生命周期一致性问题。上下文管理正在从被动压缩演进为按 Agent／会话配置、按需加载及缓存优化，用量透明度也成为共同诉求。本期仅 Copilot CLI 与 Qwen Code 提供了新 Release；多数 Issue 互动较低，相关反馈应视为风险线索，而非已证实的普遍故障。

## 2. 各工具活跃度对比

> **口径说明：**更新数不等于新建数；各仓库展示范围不同，不能直接以表内数字作完整活跃度排名。`CLOSED` 不等于已合并或发布，“未提供”也不等于没有活动。

| 工具 | Issues 更新数 | PR 更新数 | Release 情况 | 本期主要信号 |
|---|---:|---:|---|---|
| **Claude Code** | 50，展示 30 | 0 | 未提供新 Release | IDE／桌面稳定性、Hooks 与隔离兼容 |
| **OpenAI Codex** | 50，展示 30 | 11，均 CLOSED | 无新 Release | 浏览器控制、权限解释、长会话基础设施 |
| **Gemini CLI** | 5 | 5，均 OPEN | 无新 Release | ACP 反馈链路、Hook 生命周期、依赖审计 |
| **GitHub Copilot CLI** | 3 | 0 | **v1.0.106-8** | Windows 本地模型安装、配置诊断、MCP OAuth |
| **Kimi Code CLI** | 0 | 0 | 无活动记录 | 本窗口无可分析信号 |
| **OpenCode** | 展示 30，总数未提供 | 展示 20，总数未提供 | 无新 Release | 资源成本、执行状态、插件与权限机制 |
| **Pi** | 11 | 24，展示 20 | 无新 Release | MCP 传输、Provider 兼容、细粒度会话控制 |
| **Qwen Code** | 总数未提供，报告列举 10 | 46，展示 20 | **v0.26.7** | 托管 Agent 扩展性、Hooks、上下文精简 |
| **DeepSeek TUI／Codewhale*** | 2 | 3，均 OPEN | 无新 Release | 搜索与路径正确性、撤销语义、图片输入 |

\* Pi 的明细链接指向 `earendil-works/pi`；DeepSeek TUI 的明细链接指向 `codewhale-hq/Codewhale`。仓库归属关系待核实，不宜直接用于长期仓库统计。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具与具体诉求 | 横向判断 |
|---|---|---|
| **执行状态可信与任务恢复** | Claude：认证失效重连、远程会话归属；Codex：浏览器断连与线程恢复；OpenCode：工具已执行却报告中止；Qwen：桌面重连存活后端；Pi：取消请求后停止底层响应流 | “任务结束”必须与真实执行和资源状态一致，否则可能造成重复操作或任务丢失 |
| **权限边界与决策解释** | Claude：Hook 改写命令与 Worktree 防护冲突；Codex：Full access／网站授权后仍被策略阻断；Copilot：Subagent 临时文件读取限制；OpenCode：规划模式写入、URL 权限匹配；Qwen：Hooks 审批与信任语义 | 用户授权、平台策略、沙箱限制和模型行为需要分层展示，不能只给出笼统拒绝 |
| **上下文效率与成本可见性** | Codex：上下文指示器、压缩可靠性、额度解释；Gemini：Token 热力图；OpenCode：Agent 级压缩窗口、缓存命中；Pi：会话级压缩；Qwen：工具 schema 与记忆指引按需加载、日期区间统计 | 优化正在同时覆盖“少消耗”和“看得清”，不能只追求更大上下文窗口 |
| **Hooks／扩展生命周期一致性** | Claude：Hooks 与工具包装、隔离机制协作；Gemini：ACP 下 Hook 不触发、Skill 重载不同步；Qwen：宿主机与 Docker 审批哈希不一致；OpenCode：会话渲染插件钩子；Pi：扩展加载性能与 API 能力对等 | 配置已加载不代表功能已生效，跨宿主与跨进程回归测试的重要性上升 |
| **跨平台基础体验** | Claude：VS Code 崩溃、Windows／WSL 功能；Codex：Windows 认证与截图；Copilot：Windows 本地引擎安装、WSL2 OAuth；Pi：Git Bash 子进程清理；Gemini：韩文 IME；Codewhale：Windows 图片粘贴 | 可靠性验证需要覆盖真实终端、输入法、IDE、容器及操作系统组合 |

另一个共同信号是**模型兼容从“能调用”转向“语义准确”**：Qwen 关注视觉能力与 Ollama 别名识别，Pi 关注网关和 Provider 差异，Codewhale 关注模型 ID 大小写，Claude 则出现模型选择器过滤需求。

## 4. 差异化定位分析

以下是基于本期功能与反馈的定位判断，并非完整产品能力排名。

| 工具 | 功能与技术侧重 | 更匹配的用户／场景 | 当前需验证的边界 |
|---|---|---|---|
| **Claude Code** | CLI、IDE、桌面与远程开发协同，Hooks／Worktree 深入工作流 | 将 Agent 嵌入日常项目开发的个人与团队 | 升级稳定性、多账号远程会话、组合工作流兼容 |
| **Codex** | 编码与浏览器／Computer Use 并行，云线程及上下文运行时建设 | 跨代码、网页与桌面执行任务的开发者 | 浏览器身份持续性、实际后端透明度、策略拒绝解释 |
| **Gemini CLI** | ACP 客户端集成、Hook／Skill 扩展与终端交互 | IDE／客户端集成者、依赖事件自动化的团队 | ACP 与普通 CLI 行为一致性、打包依赖可审计性 |
| **Copilot CLI** | 本地模型部署便利性、记忆作用域及配置诊断 | 关注 Windows 本地运行和远程 MCP 接入的用户 | OAuth 令牌交换兼容性、Subagent 读写边界 |
| **OpenCode** | 多模型路由、插件化 TUI、Agent 级配置与多项目组织 | 强调可定制界面和工作流控制的开发者 | 长会话资源占用、历史兼容、执行层权限落实 |
| **Pi** | Provider、MCP、扩展与可嵌入运行组件 | 自建 Agent Harness、扩展和模型接入的工程团队 | 传输生命周期、扩展启动成本、代理网络兼容 |
| **Qwen Code** | CLI 与 Managed Agent 并进，控制面容量治理、SDK／ACP、多模态适配 | 托管 Agent 平台建设者与本地模型使用者 | SQL 扩展性、启动并发、沙箱审批一致性 |
| **DeepSeek TUI／Codewhale** | TUI 输入体验与基础工具调用契约 | 重视终端交互、搜索读取和截图输入的用户 | 路径基准、撤销目标、搜索匹配的正确性 |
| **Kimi Code CLI** | 本期无数据 | 无法据此判断 | 需观察更长时间窗口 |

## 5. 社区热度与成熟度

### 工程活动较突出的工具

- **Qwen Code：**已知有 **46 条 PR 更新并发布新版本**，是本期明确 PR 总数最高的工具；优化同时覆盖模型侧上下文、桌面恢复和托管控制面。
- **Pi：**有 **24 条 PR、11 条 Issue 更新**，贡献方向偏底层兼容与工程修复。但大量条目已关闭，缺少合并状态，不能换算成实际交付量。
- **OpenCode：**可见样本达到 **30 条 Issue、20 条 PR**，覆盖面广，体现插件、会话体验与稳定性并行演进；总数未知，不作精确排名。
- **Claude Code 与 Codex：**均有 **50 条 Issue 更新**，用户反馈面较广。Codex 另有 11 条 PR 更新；Claude 本期没有 PR 更新记录，不能据此推断其整体研发速度。

### 讨论热度与产品成熟度应分开看

本期各社区整体互动并不高：OpenCode 展示样本最高为 **7 条评论**，Qwen 为 **5 条**，Codex 为 **4 条**，Claude 最高仅 **1 条**。这些数据更适合识别问题方向，尚不足以证明广泛共识或大规模故障。

从问题类型看，各工具正在面对多环境、长会话和多 Agent 引入的**工程化成熟度挑战**：不仅要完成任务，还要控制资源增长、维持历史兼容、解释权限决策并支持中断恢复。单日静默不能证明产品停滞，单日高 PR 数也不能证明产品更成熟。

## 6. 值得关注的趋势信号

### ① 产品边界扩大，集成可靠性成为选型重点
CLI 已逐步成为 IDE、桌面、浏览器和云端 Agent 的共同入口。  
**参考价值：**选型时应测试完整任务链，而不只是单轮代码生成；重点覆盖认证过期、断连、进程重启、账号切换和跨环境恢复。

### ② 执行事实与模型上下文一致，是安全底线
OpenCode 的“已执行却报告中止”、Codewhale 的搜索路径基准问题，都可能使模型基于错误状态继续行动。  
**参考价值：**高风险工具应具备执行记录、幂等或去重机制；重试前先核验操作是否已经完成。

### ③ 上下文管理正在成为可编排资源
OpenCode 的 Agent 级窗口、Pi 的会话级策略，以及 Qwen 的按需加载，表明上下文不再只是一个统一容量上限。  
**参考价值：**规划、实现、检索等角色应分别设置预算，并联合观察缓存命中、任务成功率、延迟与实际额度消耗。

### ④ 权限系统需要兼顾强制执行与可解释性
一端是授权后仍被拦截，另一端是只读预期可能被间接写入路径突破。  
**参考价值：**不要把模式名称或提示词约束视为安全隔离；应确认执行层限制，并要求日志明确指出拒绝发生在哪一层。

### ⑤ 托管 Agent 的成本治理已超出 Token
Qwen 的 SQL 与并发治理、OpenCode 的数据库膨胀及空闲资源占用，说明长期运行的成本也来自存储、CPU、线程和连接。  
**参考价值：**平台评估需增加长时间空闲、历史累积和取消后资源回收测试，避免短任务基准掩盖运行成本。

### ⑥ 供应链透明度成为独立采购与部署指标
Gemini 的打包依赖审计盲区与 Pi 的依赖安全升级提案，分别反映“扫描覆盖”和“修复交付”两类问题。  
**参考价值：**企业应核验完整依赖清单及打包产物，而不只依赖顶层包扫描；同时确认修复是否实际进入安装版本。

---

**决策结论：**本期最值得优先验证的不是“哪个工具功能最多”，而是**关键工作流能否稳定运行、执行状态是否可信、失败后能否安全恢复**。建议将高影响用户报告纳入灰度与回归测试，但在复现、维护者确认及版本交付信息齐备前，不将其直接视为已确认缺陷。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-05｜基于提供的 20 条 PR、15 条 Issue 样本**

> **数据说明：**所有 PR 的评论数均为 `undefined`、👍 均为 0，因此无法验证真实热度排名，也无法识别“评论活跃”的 PR。以下按关联 Issue 的讨论强度、功能价值与最近更新情况筛选重点，**不将展示顺序视为热度排名**。所列 PR 均为 **OPEN**，未显示已合并或 Draft 标记。

## 1. 热门 Skills 关注榜

| Skill / PR | 功能与改进 | 社区关注点 | 当前状态 |
|---|---|---|---|
| **skill-creator**：[PR #1298](https://github.com/anthropics/skills/pull/1298) | 隔离触发评估任务，处理 Windows 子进程及运行时失败，避免错误评分。 | “Skill 到底有没有正确触发”是核心痛点；相关 [Issue #556](https://github.com/anthropics/skills/issues/556) 有 **13 评论、7 👍**，报告评估触发率为 0%。两者主题相关，但不能据此认定该 PR 已完整解决该 Issue。 | **OPEN**；9 月 16 日更新 |
| **mcp-builder**：[PR #1742](https://github.com/anthropics/skills/pull/1742) | 适配 `mcp>=2` 的客户端导入名称与自定义 HTTP headers 配置方式。 | MCP 集成的兼容性与评估可信度值得关注；另有 [Issue #1390](https://github.com/anthropics/skills/issues/1390) 报告评估工具因序列化问题产生虚假执行错误，**4 评论**。这是另一类问题。 | **OPEN**；10 月 8 日更新 |
| **webapp-testing**：[PR #1980](https://github.com/anthropics/skills/pull/1980) | 避免启动测试服务器时使用 `shell=True`。 | 修复提案针对用户或 Agent 命令字符串进入系统 shell 的注入风险，体现测试自动化的安全边界问题；暂无可用评论数据。 | **OPEN**；11 月 1 日更新 |
| **docx**：[PR #1792](https://github.com/anthropics/skills/pull/1792) | 将 LibreOffice 超时报为错误，并检查输出是否仍残留修订标记。 | 重点从“脚本执行完成”转向“文件实际正确”。另有 [Issue #2018](https://github.com/anthropics/skills/issues/2018) 报告合并文本时生成无效 XML，**4 评论**。 | **OPEN**；11 月 1 日更新 |
| **xlsx**：[PR #2019](https://github.com/anthropics/skills/pull/2019) | 识别工作表级命名范围及别名间接引用的外部链接。 | 补齐复杂工作簿的风险检测盲区，降低漏报；PR 明确关联 [Issue #2013](https://github.com/anthropics/skills/issues/2013)，但提供的数据未包含其讨论量。 | **OPEN**；11 月 3 日更新 |
| **Notion Spec to Implementation 等**：[PR #1245](https://github.com/anthropics/skills/pull/1245) | 将产品或技术规格转成 Notion 任务、实施计划、验收标准与进度跟踪；同一 PR 还提交了简历量化审计 Skill。 | 代表“需求文档 → 可执行开发任务”的工作流扩展；未提供可验证的社区讨论信息。 | **OPEN**；10 月 15 日更新 |
| **Pyxel 游戏开发**：[PR #525](https://github.com/anthropics/skills/pull/525) | 支持 Python 复古游戏开发、调试、无头运行、画面检查与状态验证。 | 将生成代码与运行验证结合，具备明确的垂直领域工作流；3 月创建、11 月仍有更新，但不能据此判断即将合并。 | **OPEN**；11 月 1 日更新 |
| **md2video-audio**：[PR #1703](https://github.com/anthropics/skills/pull/1703) | 提案将 Markdown 经 Marp 幻灯片流程转换为带配音的 MP4 视频。 | 代表文档向多媒体交付扩展；“零成本”“专业级”等属于提交者描述，尚无独立验证。 | **OPEN**；9 月 15 日更新 |

## 2. 社区需求趋势

### ① 安全、可信来源与治理，是最强讨论信号
- [Issue #492](https://github.com/anthropics/skills/issues/492)：**46 评论、3 👍**，为样本中讨论最多的议题，关注社区 Skills 使用 `anthropic/` 命名空间引发的官方身份混淆与信任边界风险。
- 新 Skill 方向包括策略执行、威胁检测、信任评分、审计轨迹等 Agent 治理能力：[Issue #412](https://github.com/anthropics/skills/issues/412)，**6 评论，已关闭**；关闭不代表功能已交付。

### ② 组织级分发，比单个新 Skill 更受期待
- [Issue #228](https://github.com/anthropics/skills/issues/228)：**17 评论、8 👍**，希望提供组织共享库或直接分享链接，替代手工下载、转发、上传。
- [Issue #189](https://github.com/anthropics/skills/issues/189)：**6 评论、9 👍**，反馈插件内容重复、Skills 重复加载。它是所列 Issues 中获赞最多的一条，显示安装与分发体验的重要性。

### ③ 可验证的触发与质量检查，是基础设施刚需
- [Issue #556](https://github.com/anthropics/skills/issues/556)：**13 评论、7 👍**，要求解决触发评估失真问题。
- [Issue #1385](https://github.com/anthropics/skills/issues/1385)：**7 评论、1 👍**，提出“任务前校准 → 对抗审查 → 交付验证”的质量门禁 Skill 方向。相比单纯生成内容，社区开始强调全过程验证。

### ④ 长任务记忆与上下文效率，形成明确的新方向
- [Issue #1329](https://github.com/anthropics/skills/issues/1329)：**10 评论**，提议 `compact-memory`，用紧凑符号表示 Agent 状态，降低长期任务记忆开销。
- [Issue #1487](https://github.com/anthropics/skills/issues/1487)：**5 评论**，报告 `claude-api` 一次注入约 156k tokens。结合重复加载问题，反映按需加载与上下文预算管理的重要性。

### ⑤ 文档需求偏向“可靠交付”，而非新增格式
- [Issue #2018](https://github.com/anthropics/skills/issues/2018)：**4 评论**，关注 DOCX XML 完整性。
- 对应 [PR #1792](https://github.com/anthropics/skills/pull/1792) 的超时与结果校验，说明文档 Skills 的重点正在转向文件有效性、失败可见性和输出验证。

**趋势判断：**样本对安全治理、组织共享、记忆压缩、质量门禁的支持较强；不足以认定“代码审查、测试生成”是当前最高热度的新 Skill 需求。

## 3. 高潜力待合并 Skills

**无法依据现有数据筛出“评论活跃且即将合并”的 PR。**以下是按近期更新、修复范围和直接使用价值选出的重点跟踪对象，不代表合并预测。

| PR | 值得跟踪的原因 | 最近更新 |
|---|---|---|
| [#2019 · xlsx 外部链接检测](https://github.com/anthropics/skills/pull/2019) | 关联明确问题，修复范围具体，直接影响表格风险检测准确性。 | 11 月 3 日 |
| [#1792 · docx 输出验证](https://github.com/anthropics/skills/pull/1792) | 针对“失败却报告成功”的高影响缺陷，强化交付可靠性。 | 11 月 1 日 |
| [#1980 · webapp-testing 命令执行安全](https://github.com/anthropics/skills/pull/1980) | 面向命令注入风险，值得优先关注；是否充分兼容原有命令用法仍需评审。 | 11 月 1 日 |
| [#1681 · skill-creator 打包脚本](https://github.com/anthropics/skills/pull/1681) | 修复独立执行脚本时的模块导入失败，并更新使用路径，直接改善贡献者体验。 | 10 月 24 日 |
| [#525 · Pyxel 新 Skill](https://github.com/anthropics/skills/pull/525) | 新增 Skill 中工作流较完整，覆盖开发到验证，且近期仍有更新。 | 11 月 1 日 |

## 4. Skills 生态洞察

**当前社区最集中的诉求，不是“再增加多少个 Skills”，而是让 Skills 来源可信、触发可测、上下文可控、团队可共享，并能验证最终交付确实正确。**——主要依据：[安全边界 #492](https://github.com/anthropics/skills/issues/492)、[组织共享 #228](https://github.com/anthropics/skills/issues/228)、[触发评估 #556](https://github.com/anthropics/skills/issues/556)。

---

# Claude Code 社区动态日报
**日期：2026-11-05**  
**数据来源：**[anthropics/claude-code](https://github.com/anthropics/claude-code)，过去 24 小时更新记录。

## 一、今日速览

今日未提供新 Release 或 PR 更新，主要动态集中在稳定性与工作流兼容性：有用户报告 **VS Code 扩展 2.1.318 出现内存溢出并循环崩溃**，桌面端也出现会话、认证及 Windows 功能可用性问题。CLI 工具配置、Hooks 与 Worktree 的协作边界值得关注，但当前讨论量很低，尚不足以判断这些问题的普遍程度。

> **统计口径：**过去 24 小时共有 50 条 Issue 更新，本日报依据展示的 30 条分析。所列 Issue 最高评论数仅为 1，点赞均为 0；以下按潜在影响与技术价值筛选，不代表社区热度排名。问题描述均为用户报告，不能视为官方确认。

## 二、社区热点 Issues

### 1. VS Code 2.1.318 被报告出现内存溢出与循环崩溃
用户称，扩展从 2.1.317 自动升级至 2.1.318 后，Claude Code 面板加载约 20 秒便触发 V8 堆内存溢出，导致扩展宿主反复重启，并影响其他扩展。
- **为何重要：**影响可能超出 Claude Code 本身，直接干扰整个 IDE 工作环境；报告提供了明确的版本对照。
- **社区反应：**1 条评论、0 赞，仍为 Open，尚无已修复信息。
- **链接：**[Issue #107246](https://github.com/anthropics/claude-code/issues/107246)

### 2. `--bare` 模式未保留显式指定的 Grep、Glob
macOS、2.1.316 用户提供复现命令：即使通过 `--tools "Read,Grep,Glob"` 指定工具，初始化事件中仍缺少 Grep 和 Glob。
- **为何重要：**可能使依赖显式工具配置的无交互脚本与自动化流程偏离预期。
- **社区反应：**0 评论、0 赞，标记为 `has repro`，仍为 Open。
- **链接：**[Issue #107247](https://github.com/anthropics/claude-code/issues/107247)

### 3. Worktree 防护拒绝经 Hook 改写的 Git 命令
用户通过 `PreToolUse` Hook 将 `git status --short` 改写为 `rtk git status --short`，报告该命令在 Worktree 隔离上下文中被防护机制拒绝。
- **为何重要：**反映命令代理、Hooks 与隔离检查之间的兼容性边界，影响使用命令包装工具的 Agent 工作流。
- **社区反应：**0 评论、0 赞，标记为 `has repro`，仍为 Open。
- **链接：**[Issue #107244](https://github.com/anthropics/claude-code/issues/107244)

### 4. OAuth 连接失效后，Code 页缺少重新连接入口
用户称，自定义连接器令牌过期或撤销、服务端返回 401 后，普通聊天界面可显示重连提示，但桌面端 Code 页只出现工具调用失败。
- **为何重要：**认证失败后的恢复入口不一致，会中断依赖连接器的开发任务。
- **社区反应：**0 评论、0 赞，仍为 Open。
- **链接：**[Issue #107242](https://github.com/anthropics/claude-code/issues/107242)

### 5. 桌面端切换账号后，SSH Code 会话仍关联旧账号
macOS 用户报告，切换账号后，SSH Code 会话保留此前账号关联，重启应用后仍会重新接纳这些会话。
- **为何重要：**涉及账号与远程会话的归属一致性，多账号开发者尤其需要关注；现有摘要不足以认定发生越权或数据泄露。
- **社区反应：**0 评论、0 赞，仍为 Open。
- **链接：**[Issue #107230](https://github.com/anthropics/claude-code/issues/107230)

### 6. 超过五分钟的 API 请求仍被报告无法正常处理
Linux 用户报告，长时间 API 请求处理问题仍然存在。
- **为何重要：**长耗时推理或网关请求可能受影响；当前摘要不足以定位是客户端、网关还是服务端超时。
- **社区反应：**0 评论、0 赞，仍为 Open。
- **链接：**[Issue #107232](https://github.com/anthropics/claude-code/issues/107232)

### 7. Windows 桌面端分屏不可用，模型选择显示异常
Windows 11、引擎 2.1.318 用户称，文档中的分屏操作均未生效，执行 `/model` 后选择器显示“Unsupported model”。
- **为何重要：**同时影响并行会话与模型切换，暴露桌面端功能可用性及文档一致性问题。
- **社区反应：**1 条评论、0 赞，仍为 Open。
- **链接：**[Issue #107206](https://github.com/anthropics/claude-code/issues/107206)

### 8. 用户报告重复误拒导致长会话无法继续
Windows 桌面端用户称，在常规软件项目操作中反复触发其认为不合理的安全拒绝，最终只能新建会话。
- **为何重要：**关注点不仅是单次拒绝是否准确，还包括长会话能否恢复、已有上下文是否可以继续利用。
- **社区反应：**0 评论、0 赞，仍为 Open；尚无官方对误拒的确认。
- **链接：**[Issue #107248](https://github.com/anthropics/claude-code/issues/107248)

### 9. WSL 会话关联的 PR 无法开启 Auto-fix
用户报告，在桌面端，来自 WSL 会话的 PR 无论通过 Agent 还是手动操作，都无法开启 Auto-fix。
- **为何重要：**阻断从本地开发到 PR 自动修复的工作流，是 Windows／WSL 用户的重要兼容性问题。
- **社区反应：**0 评论、0 赞，仍为 Open。
- **链接：**[Issue #107221](https://github.com/anthropics/claude-code/issues/107221)

### 10. Linux `/context` 输出文字不可见
Linux 用户提交 `/context` 文字不可见问题，条目带有回归与可复现标签。
- **为何重要：**影响开发者检查上下文状态，也增加长会话诊断难度。
- **社区反应：**0 评论、0 赞，仍为 Open，标记为 `regression`、`has repro`。
- **链接：**[Issue #107240](https://github.com/anthropics/claude-code/issues/107240)

## 三、重要 PR 进展

**过去 24 小时无 PR 更新记录。**本期没有可列出的重要 PR，也无法从所给数据确认上述问题已有对应修复或合并进展。

[查看仓库 PR 列表](https://github.com/anthropics/claude-code/pulls)

## 四、功能需求趋势

以下为已展示样本中的需求方向，不代表全部 50 条 Issue 的完整分布。

| 方向 | 需求信号与分析 | 相关 Issue |
|---|---|---|
| **桌面端会话管理** | 希望聊天与 Code 并行工作、跨设备同步会话可被管理工具识别，并改善侧栏层级；需求已从单会话交互延伸至多环境管理。 | [#107243](https://github.com/anthropics/claude-code/issues/107243)、[#107236](https://github.com/anthropics/claude-code/issues/107236)、[#107226](https://github.com/anthropics/claude-code/issues/107226) |
| **终端交互可配置性** | 希望配置 Vim 默认进入 NORMAL 或 INSERT 模式，并为模型选择器增加过滤输入框；后者尤其面向暴露大量模型的兼容网关。 | [#107238](https://github.com/anthropics/claude-code/issues/107238)、[#107237](https://github.com/anthropics/claude-code/issues/107237) |
| **Hooks 覆盖与可控性** | 希望为 `!` Shell 模式增加 Hook 事件，在命令输出进入上下文前进行检查；同时已有 Hook 改写与隔离检查冲突的报告。 | [#107222](https://github.com/anthropics/claude-code/issues/107222)、[#107244](https://github.com/anthropics/claude-code/issues/107244) |
| **插件更新透明度** | 用户要求解释或缩短插件自动更新前最长十分钟的随机等待，体现对更新时机可预测性的需求。 | [#107241](https://github.com/anthropics/claude-code/issues/107241) |
| **文档与实际行为一致性** | Projects Overview 的 Idle 状态、草稿 PR 与日文标签需要更准确说明；Windows 分屏报告也提示文档操作与平台行为需要核对。 | [#107219](https://github.com/anthropics/claude-code/issues/107219)、[#107206](https://github.com/anthropics/claude-code/issues/107206) |

## 五、开发者关注点

- **升级可靠性优先于新功能。** VS Code 崩溃循环与桌面端快捷键顺序变化，都说明用户需要更稳定、可预期的升级体验。[#107246](https://github.com/anthropics/claude-code/issues/107246)、[#107231](https://github.com/anthropics/claude-code/issues/107231)
- **失败后的恢复路径不足。** 连接器失效缺少重连入口、长会话拒绝后难以继续，提示错误提示之外还需要可执行的恢复操作。[#107242](https://github.com/anthropics/claude-code/issues/107242)、[#107248](https://github.com/anthropics/claude-code/issues/107248)
- **组合工作流比单一功能更易出现边界问题。** `--bare` 与工具白名单、Hooks 与 Worktree、WSL 与 PR Auto-fix，均值得纳入兼容性验证。[#107247](https://github.com/anthropics/claude-code/issues/107247)、[#107244](https://github.com/anthropics/claude-code/issues/107244)、[#107221](https://github.com/anthropics/claude-code/issues/107221)
- **模型拒绝边界需要更清晰的解释。** 除长会话报告外，证书管理与 GPL 开源游戏衍生开发也出现拒绝相关反馈；这些是用户个案，不能据此推断整体策略已变更。[#107233](https://github.com/anthropics/claude-code/issues/107233)、[#107224](https://github.com/anthropics/claude-code/issues/107224)

**今日建议：**优先跟踪 VS Code 2.1.318 崩溃报告的复现与修复状态；依赖远程账号、WSL 或自定义 Hooks 的团队，应重点验证其关键工作流。当前数据尚不足以支持“已广泛发生”或“已修复”的结论。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**2026-11-05｜数据来源：[openai/codex](https://github.com/openai/codex)**

## 1. 今日速览

过去 24 小时无新 Release，社区反馈主要集中在 **浏览器控制可靠性、Windows 桌面端可用性，以及权限与安全策略的可解释性**。PR 侧则集中于上下文压缩、运行时标识符管理、云端线程生命周期和 TUI 状态修复，反映出对长会话与多线程运行稳定性的持续投入。

> **统计口径**：本期数据包含 50 条近期更新的 Issues，但仅提供其中评论最多的 30 条明细，以下趋势基于这些可见样本；11 条 PR 均标记为 `CLOSED`，**不能据此确认已合并或发布**。所列记录更新时间均为 11 月 4 日。

## 2. 社区热点 Issues

### 1. 网站安全策略在授权提示前拦截访问
**[#59394](https://github.com/openai/codex/issues/59394)｜OPEN｜4 条评论**

macOS 用户报告，通过 Computer Use 打开 avito.ru 时，系统直接以 site-safety 策略阻止，未进入用户授权或 Auto-review 流程；该域名不在用户屏蔽列表中。

- **为什么重要**：暴露了用户授权与平台安全策略之间的边界问题；此前可访问、重启无效，也增加了排障难度。
- **社区反应**：可见样本中评论最多，但仍仅 4 条，尚不足以判断影响范围。

### 2. 应用内浏览器后端未连接，代理静默改用 Playwright MCP
**[#59417](https://github.com/openai/codex/issues/59417)｜OPEN｜2 条评论**

报告称，应用内浏览器（IAB）后端无法附着到 Codex App 线程，代理却静默使用 Playwright MCP 替代，且在两个 App 版本中复现。

- **为什么重要**：工具后端替换可能改变可用登录态和执行环境，静默回退使开发者难以判断任务实际在哪里运行。
- **社区反应**：已有跨版本复现描述，暂未看到可确认的修复结论。

### 3. 已登录浏览器标签页对代理“消失”
**[#59393](https://github.com/openai/codex/issues/59393)｜OPEN｜2 条评论**

macOS 用户反馈，界面中仍可见的已认证标签页，在代理的标签页清单中反复消失，重连不稳定并中断工作。

- **为什么重要**：浏览器自动化不仅需要建立连接，还必须持续维护标签页身份与登录状态。
- **社区反应**：提交者强调这是反复阻塞实际工作的可靠性问题，而非界面瑕疵。

### 4. Windows/Edge 中，“始终允许”后仍触发网站安全拦截
**[#59436](https://github.com/openai/codex/issues/59436)｜OPEN｜1 条评论**

报告涉及微信小程序管理后台及公开小游戏文档，使用的是受支持的外部 Edge 集成，而非 IAB。

- **为什么重要**：与 #59394 形成跨平台的同类反馈，说明安全策略与用户授权的交互值得重点排查，但不能据此认定二者同源。
- **社区反应**：目前互动有限，价值主要在于补充了另一条明确的复现路径。

### 5. Windows 10 Computer Use 能读窗口，但无法截图
**[#59422](https://github.com/openai/codex/issues/59422)｜OPEN｜1 条评论**

用户可枚举窗口、读取无障碍文本，但在 Bambu Studio 和空白记事本中截图均超时。

- **为什么重要**：基础窗口发现成功并不代表完整 Computer Use 链路可用；截图失败会直接阻断视觉交互。
- **社区反应**：另有 [#59397](https://github.com/openai/codex/issues/59397) 报告 FL Studio、文件资源管理器中的类似超时，值得联合排查。

### 6. Windows 认证失败：令牌缺少账户标识
**[#59410](https://github.com/openai/codex/issues/59410)｜OPEN｜1 条评论**

Windows 商店版用户遇到 “Account authentication unavailable”，报告涉及令牌缺少 `chatgpt_account_id`、`workspaceRouting` 为空；同一账户的网页端正常。

- **为什么重要**：桌面端认证或工作区路由异常可能阻断全部使用流程，且不能简单归因为账户本身不可用。
- **社区反应**：当前主要是单个诊断报告，影响规模尚不明确。

### 7. Full access 下命令仍被策略拒绝，缺少决策解释
**[#59415](https://github.com/openai/codex/issues/59415)｜OPEN｜1 条评论**

Windows 用户报告，即使启用 Full access，命令仍被 “blocked by policy” 拒绝，且没有可操作的决策轨迹。

- **为什么重要**：核心诉求不只是放宽权限，而是明确“哪一层策略拒绝了什么、应如何处理”。
- **社区反应**：互动有限，但与网站安全拦截、权限配置回退等报告共同构成权限可解释性议题。

### 8. Plus 五小时额度在约五分钟内消耗至 98%
**[#59398](https://github.com/openai/codex/issues/59398)｜OPEN｜1 条评论｜👍 1**

提交者称，在以缓存长上下文为主的使用场景中，五小时额度迅速达到 98%。

- **为什么重要**：开发者需要理解缓存上下文、长会话与套餐额度之间的关系，以预测任务成本。
- **社区反应**：这是所展示 Issues 中唯一带 👍 的条目，但支持量仍低；目前不能据此确认计费或额度计算存在缺陷。

### 9. 现有项目提示所有模型均不可用
**[#59399](https://github.com/openai/codex/issues/59399)｜OPEN｜1 条评论**

Windows 用户报告，现有项目出现上下文压缩中断及 “This model is not available”，更换模型也无法继续。

- **为什么重要**：影响长会话恢复能力；报错涉及模型可用性，但现有信息不足以定位到模型、权限或会话状态中的哪一层。
- **社区反应**：尚无明确恢复方案，值得跟踪是否补充日志与复现步骤。

### 10. 桌面端需要上下文用量指示器
**[#59416](https://github.com/openai/codex/issues/59416)｜OPEN｜2 条评论**

建议在输入框右下角显示上下文占用圆环，并提供已用比例、token 数与总容量，以及自动压缩状态说明。

- **为什么重要**：让用户在长时间编程或研究中主动判断何时压缩、拆分任务或开启新对话。
- **社区反应**：是本期可见样本中描述较完整的功能提案之一，但尚无采纳结论。

## 3. 重要 PR 进展

以下 10 条 PR **均为 CLOSED，合并与发布状态未提供**；内容按提交摘要整理。评论字段缺失，不作热度判断。

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| [#59404](https://github.com/openai/codex/pull/59404) | 在上下文压缩期间保留尚未被常规推理请求消费的代理消息，避免把压缩输出误当作消息已送达的证明。 | 保障异步消息在长会话中的交付完整性。 |
| [#59401](https://github.com/openai/codex/pull/59401) | 修正 Guardian 弹性上下文预算对分区上下限的处理，并让指令去重考虑实际保留的转录条目。 | 改善预算压力下的上下文分配一致性。 |
| [#59369](https://github.com/openai/codex/pull/59369) | 稳定跨平台测试，区分子进程启动慢与操作超时，并调整异步等待及目录变更后的分叉权限处理。 | 减少测试偶发失败，提升权限相关行为的可验证性。 |
| [#59354](https://github.com/openai/codex/pull/59354) | 在 `LocalAgentRuntime` 中共享 `ContextWindowIdGenerator`，统一会话初始及后续上下文窗口的 ID 分配。 | 让上下文窗口标识的生命周期管理更一致。 |
| [#59351](https://github.com/openai/codex/pull/59351) | 新增 `Client::prewarm_default_thread`，预热默认托管云环境中的编码线程，支持可选模型与提供方设置。 | 为线程提前准备提供接口；摘要未提供延迟收益数据。 |
| [#59343](https://github.com/openai/codex/pull/59343) | 新增 `Client::activate`，加载云线程并返回解析后的配置、线程元数据和历史游标，轮次内容另行获取。 | 分离线程激活与历史加载，便于客户端管理恢复流程。 |
| [#59330](https://github.com/openai/codex/pull/59330) | 监听 Linux、macOS、Windows 的系统会话锁定状态，锁屏时停止 TUI 语音本地媒体并显示原因。 | 加强语音会话的隐私保护与状态提示。 |
| [#59328](https://github.com/openai/codex/pull/59328) | 引入专用 `ContextWindowId` 协议类型，替换压缩状态、历史重建和请求元数据中的原始 UUID。 | 增强上下文标识的类型约束。 |
| [#59319](https://github.com/openai/codex/pull/59319) | 历史回放后，从当前显示线程的实时状态恢复后台终端，避免误显示父线程终端。 | 修复分叉会话中的终端归属混淆。 |
| [#59312](https://github.com/openai/codex/pull/59312) | 引入共享 `ItemIdGenerator`，贯穿会话、模型客户端、历史、工具输出、hooks 和记忆请求。 | 统一响应条目 ID 的生成与传递路径。 |

## 4. 功能需求趋势

### 浏览器自动化：从“能连接”转向“持续可靠”
标签页发现后丢失、读取超时、IAB 后端未附着和工具静默替换，说明用户更关注完整任务链路，而非单次连接成功。相关反馈见 [#59417](https://github.com/openai/codex/issues/59417)、[#59393](https://github.com/openai/codex/issues/59393)、[#59412](https://github.com/openai/codex/issues/59412)。

### 权限与安全：需要可追踪、可解释的决策
“始终允许”或 Full access 不等于绕过平台策略，但用户需要清晰知道策略层级、拒绝原因和后续动作。另有命名权限配置自动回退为 Custom 的反馈，见 [#59415](https://github.com/openai/codex/issues/59415)、[#59436](https://github.com/openai/codex/issues/59436)、[#59438](https://github.com/openai/codex/issues/59438)。

### 长会话管理：用量、压缩和历史检索都需可见
上下文占用提示、压缩失败恢复，以及 CLI 默认展示完整线程与搜索结果，指向更强的会话可观测性需求。见 [#59416](https://github.com/openai/codex/issues/59416)、[#59399](https://github.com/openai/codex/issues/59399)、[#59396](https://github.com/openai/codex/issues/59396)。

### Windows 与 IDE 集成：基础可用性优先
认证、首次启动、窗口截图、沙箱目录和 VS Code 侧栏初始化均有反馈。当前样本更突出“稳定启动并持续工作”，而非新增 IDE 功能。见 [#59410](https://github.com/openai/codex/issues/59410)、[#59425](https://github.com/openai/codex/issues/59425)、[#59391](https://github.com/openai/codex/issues/59391)。

### 云端与自动任务：区分不同失败阶段
并行会话路由超时、响应流断开及定时任务实际执行失败，凸显任务状态、失败阶段和恢复信息的重要性。见 [#59430](https://github.com/openai/codex/issues/59430)、[#59429](https://github.com/openai/codex/issues/59429)。

## 5. 开发者关注点

- **明确展示实际执行环境**：当前使用 IAB、外部浏览器还是 Playwright MCP，不应依赖用户事后推断。参考 [#59417](https://github.com/openai/codex/issues/59417)。
- **为权限拒绝提供可操作诊断**：区分用户配置、沙箱限制和平台安全策略，而不只是返回笼统的 “blocked by policy”。参考 [#59415](https://github.com/openai/codex/issues/59415)。
- **保障长任务的可恢复性**：上下文压缩、浏览器断连或线程切换后，应尽量保留会话状态并提供明确恢复路径。参考 [#59399](https://github.com/openai/codex/issues/59399)、[#59393](https://github.com/openai/codex/issues/59393)。
- **提高额度与上下文透明度**：分别解释上下文容量、套餐使用额度和模型容量不足，避免不同限制被混为一谈。参考 [#59398](https://github.com/openai/codex/issues/59398)、[#59416](https://github.com/openai/codex/issues/59416)、[#59392](https://github.com/openai/codex/issues/59392)。

**总体判断**：本期可见讨论的重心是现有代理能力的稳定交付与可解释性，而非新增模型或功能数量。上述 PR 与部分痛点在方向上相关，但当前数据不足以确认它们已解决对应社区问题。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报｜2026-11-05

> 数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) 过去 24 小时更新记录。提供的数据包含 5 个 Issue、5 个 PR，以下全部纳入，不补足至 10 条；所有条目均为 OPEN，更新时间均为 2026-11-04。

## 今日速览

今日动态主要集中在 **ACP 客户端集成的可观测性与 Hook 行为一致性**：社区报告了 stderr 延迟输出、部分 Hook 不执行等问题，同时有 PR 尝试补充提示词被 Hook 阻止时的原因反馈。其他值得关注的方向包括打包依赖的安全审计盲区、韩文输入丢字，以及 Token 用量热力图；过去 24 小时无新版本发布，相关 PR 均尚未合并。

## 社区热点 Issues

以下按潜在影响与开发者相关性排序。5 个 Issue 均处于 `status/need-triage`，目前互动量较低，尚不能据此判断广泛影响范围。

| Issue | 核心问题与重要性 | 社区反应 |
|---|---|---|
| [#30127 打包依赖对 npm audit 不可见](https://github.com/google-gemini/gemini-cli/issues/30127) | 报告称，`0.66.0` 中打包的 `chrome-devtools-mcp 0.19.0` 包含 `fast-uri 3.1.0`、`ip-address 10.1.0` 和 `ws 8.19.0`，但这些依赖对 `npm audit` 不可见。涉及供应链清单与审计覆盖，值得安全团队核查；**现有摘要不足以确认具体漏洞或可利用性**。 | 0 评论、0 👍，待分诊。 |
| [#30128 ACP 运行期间 stderr 输出被延迟](https://github.com/google-gemini/gemini-cli/issues/30128) | 用户反馈，`gemini --acp` 的 stderr 内容直到进程退出才输出，导致客户端在会话期间无法及时看到 Hook 警告等信息，影响故障诊断与运行状态感知。 | 1 评论、0 👍，是本批 Issue 中唯一有评论的条目。 |
| [#30129 ACP 下 SessionStart 与 Notification Hook 不执行](https://github.com/google-gemini/gemini-cli/issues/30129) | Hook 虽被加载并列入执行列表，却未实际触发，可能影响会话初始化，以及工具等待审批时的通知。对依赖 Hook 自动化的 ACP 集成尤为重要。 | 0 评论、0 👍，待分诊。 |
| [#30126 韩文 IME 提交时丢失最后一个音节](https://github.com/google-gemini/gemini-cli/issues/30126) | 报告称，在 `0.66.0` 中输入韩文并立即按 Enter，可能将 `테스트` 提交为 `테스`。这会直接改变提示词内容，属于输入正确性问题。 | 0 评论、0 👍，待分诊。 |
| [#30125 请求支持 Gemini 4 Carbon](https://github.com/google-gemini/gemini-cli/issues/30125) | 提出者希望 Gemini Code Assist Enterprise / Standard OAuth 用户及 API Key 用户获得该模型的官方 CLI 支持，反映出对新模型接入与认证路径覆盖的需求。模型发布信息来自 Issue 描述，此处不作独立确认。 | 0 评论、0 👍，尚无支持时间表信息。 |

## 重要 PR 进展

以下均为待合并提案，**不代表功能已经上线**。数据未提供有效的 PR 评论数，无法评估评审活跃度。

### 1. ACP 返回 Hook 阻止提示词的原因
[#30134 · `fix(cli): report hook-blocked prompts over ACP`](https://github.com/google-gemini/gemini-cli/pull/30134)

修复 ACP 下提示词被 Hook 拦截后，仅返回空 `end_turn`、客户端无法得知原因的问题。提案通过 `agent_message_chunk` 返回阻止原因，使客户端能够展示明确反馈。

**关注点：**与上述 ACP Issues 同属反馈链路问题，但并非对 stderr 延迟或 Hook 不执行的直接修复。

### 2. 新增 Token 用量热力图
[#30135 · `feat(cli): add /stats heatmap subcommand for daily token usage`](https://github.com/google-gemini/gemini-cli/pull/30135)

新增 `/stats heatmap [today|yesterday|YYYY-MM-DD]`，并支持 `/usage heatmap` 别名，在终端中展示 GitHub 风格的每日 Token 用量日历热力图。

**关注点：**增强用量可视化，便于观察使用节奏；PR 标记为 `size/xl`，需关注实现范围与评审进度。

### 3. 扩展重载后刷新 Skill 命令
[#30133 · `fix(cli): refresh skill commands after extension reload`](https://github.com/google-gemini/gemini-cli/pull/30133)

在 `/extensions reload` 完成 Skill 发现后刷新斜杠命令，解决扩展 Skill 改名后，旧命令残留在补全列表、新命令不可用的问题。

**关注点：**改善扩展热重载的一致性；标记为 `priority/p2`、`help wanted`。

### 4. 修复主目录缩写的路径边界判断
[#30124 · `fix(core): require path-separator boundary in tildeifyPath`](https://github.com/google-gemini/gemini-cli/pull/30124)

要求主目录前缀匹配同时满足路径分隔符边界，避免将 `/Users/albert/proj` 错误缩写为 `~bert/proj`（当前主目录为 `/Users/al` 时）。摘要也覆盖 Windows 路径示例。

**关注点：**提升跨平台路径显示正确性；标记为 `priority/p2`。

### 5. TypeScript 配置调整
[#30130 · `Update tsconfig.json`](https://github.com/google-gemini/gemini-cli/pull/30130)

该 PR 标记为 `priority/p1`、`size/xs`，但摘要仅保留模板，未解释具体配置变化与动机。

**关注点：**优先级标签较高，但目前无法判断影响范围，应以实际 diff 和后续说明为准。

## 功能需求趋势

基于本批 5 个 Issue，可见以下方向；样本较小，不宜视为长期热度排名。

- **ACP 集成可靠性与行为一致性：**两个 Issue 分别涉及实时日志和 Hook 生命周期，说明嵌入式客户端不仅需要执行结果，也需要完整的运行中反馈。[#30128](https://github.com/google-gemini/gemini-cli/issues/30128) · [#30129](https://github.com/google-gemini/gemini-cli/issues/30129)
- **新模型与认证路径覆盖：**用户希望模型支持同时覆盖企业/标准版 OAuth 与 API Key，而非仅针对单一接入方式。[#30125](https://github.com/google-gemini/gemini-cli/issues/30125)
- **供应链可审计性：**打包第三方代码是否能被常规依赖扫描发现，成为安全与合规关注点。[#30127](https://github.com/google-gemini/gemini-cli/issues/30127)
- **国际化输入可靠性：**IME 组合输入与提交时序需要更完善的兼容性验证，避免提示词被静默截断。[#30126](https://github.com/google-gemini/gemini-cli/issues/30126)

## 开发者关注点

1. **执行状态需要可解释。**警告不可实时见到、Hook 拦截原因缺失，会让客户端难以区分正常结束、策略拒绝与运行异常。ACP 集成者应优先验证这些反馈路径。[Issue #30128](https://github.com/google-gemini/gemini-cli/issues/30128) · [PR #30134](https://github.com/google-gemini/gemini-cli/pull/30134)
2. **配置加载不等于实际生效。**Hook 已列出却未执行、Skill 重载后命令未同步，都暴露出生命周期与异步状态一致性的痛点。[Issue #30129](https://github.com/google-gemini/gemini-cli/issues/30129) · [PR #30133](https://github.com/google-gemini/gemini-cli/pull/30133)
3. **输入与路径等基础交互仍需边界测试。**韩文输入丢字和主目录前缀误匹配，分别影响提示词完整性与路径表示正确性。[Issue #30126](https://github.com/google-gemini/gemini-cli/issues/30126) · [PR #30124](https://github.com/google-gemini/gemini-cli/pull/30124)
4. **用量透明度正在增强。**热力图提案体现了对 Token 使用情况可视化的投入，但当前仅能确认存在该功能提案，不能推断其已获广泛社区支持。[PR #30135](https://github.com/google-gemini/gemini-cli/pull/30135)

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-05**  
**仓库：[github/copilot-cli](https://github.com/github/copilot-cli)**

> 本报基于所提供的过去 24 小时数据：1 个 Release、3 条更新的 Issue、0 条更新的 PR。Issue 与 PR 不足 10 条，以下按实际数据列出，不补充未提供的内容。

## 1. 今日速览

GitHub Copilot CLI 发布 **v1.0.106-8**，重点改善 Windows 本地模型安装体验，并增强记忆作用域及自定义 Agent 配置的提示。社区新增反馈主要集中在 **MCP OAuth 认证链路**和 **Subagent 临时目录访问限制**；3 条 Issue 均处于待分诊状态，尚无评论或点赞，暂不能判断问题的普遍程度。

## 2. 版本发布

### [v1.0.106-8](https://github.com/github/copilot-cli/releases/tag/v1.0.106-8)

- **Windows 本地模型安装更自动化**：下载本地模型时自动安装 `llama.cpp`，并展示引擎安装进度，减少手动配置步骤。
- **记忆作用域提示更清晰**：`/memory show` 会在仓库级记忆作用域不可用时明确提示，便于理解当前记忆能力的适用范围。
- **自定义 Agent 配置诊断增强**：通过 `-p --agent` 选择的 Agent 若包含 Copilot 忽略的 frontmatter 键，会向 stderr 输出警告。**所提供的修复说明在“and log”处截断，后续日志行为无法确认。**

## 3. 社区热点 Issues

本期仅有 3 条 Issue，以下按对开发流程的潜在影响整理。它们均为 **OPEN / triage，0 评论、0 👍**；目前反映的是独立用户报告，而非已验证的广泛故障。

### ① 静态 OAuth 客户端在令牌交换时缺失密钥
**[Issue #5351](https://github.com/github/copilot-cli/issues/5351)** · 作者：t1agob

- **问题**：使用预注册的静态机密 OAuth 客户端时，浏览器授权步骤能够完成，但用户报告令牌交换未发送客户端密钥，导致 `invalid_client`。
- **为何重要**：可能阻塞依赖静态客户端配置的远程 MCP 接入；浏览器授权成功也容易让排查重点偏离后续令牌交换环节。
- **社区反应**：尚无评论或点赞，等待维护者确认客户端认证方式及请求行为。

### ② WSL2 下交互式 MCP OAuth 停留在“Connecting”
**[Issue #5350](https://github.com/github/copilot-cli/issues/5350)** · 作者：poppj1

- **问题**：在 WSL2 中连接使用 Entra ID OAuth 的 Azure DevOps 远程 MCP 服务时，授权码已接收、成功页面已展示，但据报告未执行 code-to-token 交换，服务持续显示“Connecting”。
- **为何重要**：会直接阻断远程工具接入，同时暴露浏览器授权成功与 CLI 实际连接状态之间的可观测性缺口。
- **社区反应**：尚无评论或点赞。与 #5351 同属 OAuth 链路问题，但现有信息不足以认定两者根因相同。

### ③ Subagent 将临时目录限制扩大解释为禁止读取
**[Issue #5352](https://github.com/github/copilot-cli/issues/5352)** · 作者：aaroneng

- **问题**：用户报告 Subagent 因临时目录相关系统指令，拒绝读取已存在的临时文件；其行为与用户对“禁止写入或创建”的理解不一致。
- **为何重要**：可能影响通过临时文件传递中间结果的多 Agent 工作流，也提示需要明确区分读取、写入与创建权限。
- **社区反应**：尚无评论或点赞，仍需确认限制的设计意图以及主 Agent 与 Subagent 的预期行为差异。

## 4. 重要 PR 进展

提供的数据中，过去 24 小时内**没有更新的 PR**，因此本期无可列出的重要 PR，也无法据此判断上述问题是否已有修复提交。

[查看仓库 Pull Requests](https://github.com/github/copilot-cli/pulls)

## 5. 功能需求趋势

以下是基于 3 条 Issue 提炼的方向性信号，**不代表长期社区热度排名**。

| 方向 | 本期信号 | 开发意义 |
|---|---|---|
| **MCP OAuth 兼容性与稳定性** | 2 条 Issue 涉及授权码到令牌交换阶段 | 需要覆盖静态客户端、Entra ID 及 WSL2 等接入场景，并区分不同失败模式。[#5351](https://github.com/github/copilot-cli/issues/5351) · [#5350](https://github.com/github/copilot-cli/issues/5350) |
| **认证状态可观测性** | 授权成功页面与 CLI“Connecting”状态不一致 | 更细粒度的阶段状态、错误提示和日志有助于缩短排障时间。[#5350](https://github.com/github/copilot-cli/issues/5350) |
| **多 Agent 文件权限边界** | Subagent 对临时目录访问限制的解释影响文件读取 | 需要明确读写边界，兼顾安全约束与任务协作。[#5352](https://github.com/github/copilot-cli/issues/5352) |

## 6. 开发者关注点

- **“浏览器授权成功”不等于“MCP 可用”**：排障应继续检查是否发起令牌交换、客户端认证信息是否完整，以及失败是否清晰反馈到 CLI。[#5351](https://github.com/github/copilot-cli/issues/5351) · [#5350](https://github.com/github/copilot-cli/issues/5350)
- **跨环境认证流程需要验证**：WSL2 是本期报告中的明确运行环境，但尚不能据此认定其为根因；复现时应保留运行环境、OAuth 配置与回调日志。[#5350](https://github.com/github/copilot-cli/issues/5350)
- **Agent 安全限制需要可理解、可预测**：若临时目录中的已有文件无法被 Subagent 读取，可能打断原有协作流程；应关注维护者对权限边界的澄清。[#5352](https://github.com/github/copilot-cli/issues/5352)
- **配置问题应尽早显式暴露**：本次发布对安装进度、记忆作用域和被忽略配置键的提示进行了增强，有助于减少“配置看似生效、实际未生效”的困惑。[v1.0.106-8](https://github.com/github/copilot-cli/releases/tag/v1.0.106-8)

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-11-05

> 数据来源：[anomalyco/opencode](https://github.com/anomalyco/opencode)。本报基于提供的过去 24 小时更新数据，精选自展示的 30 条 Issues 与 20 条 PR；记录更新时间均为 11 月 4 日。问题描述不等于已确认根因，Issue 关闭也不代表修复已发布。

## 一、今日速览

社区反馈集中在 **v2.2.5 的桌面稳定性、资源占用与历史会话兼容性**，同时出现工具执行状态失真、权限边界等值得重点跟踪的问题。贡献者正在推进 Anthropic 缓存修复、插件会话渲染钩子、按 Agent 配置压缩窗口和会话组织改进；下列重点 PR 均仍处于开放状态，尚不能视为已上线。

过去 24 小时没有新 Release。

## 二、社区热点 Issues

以下按影响与技术关注价值筛选，并非单纯按评论数排序。

| Issue | 核心问题与重要性 | 社区反应及状态 |
|---|---|---|
| [#61688：Linux 桌面启动卡死](https://github.com/anomalyco/opencode/issues/61688) | 用户报告 v2.2.5 启动后 renderer CPU 接近 100%，伴随服务反复崩溃、界面无法呈现，直接阻断使用。 | **OPEN，3 条评论**；提供了日志线索，但现有摘要未显示已确认根因。 |
| [#61653：Windows 内存与 CPU 占用偏高](https://github.com/anomalyco/opencode/issues/61653) | 长会话空闲时仍占用约 2.7 GB 内存、约 1.5 个 CPU 核，并出现输入和滚动延迟。值得关注长会话的资源管理。 | **OPEN，2 条评论**；标记为 `severity:high`。 |
| [#61664：数据库增长至约 149 GB](https://github.com/anomalyco/opencode/issues/61664) | 报告称使用约四个月后数据库异常膨胀，并将原因指向 `event` 表重复保存流式更新完整内容、缺少清理。若属实，将影响长期使用的存储成本。 | **OPEN，1 条评论**；带有 `pending close`、`triaging` 标签，原因尚不宜视为定论。 |
| [#61694：工具已执行，却向模型报告中止](https://github.com/anomalyco/opencode/issues/61694) | 涉及 1.x 流式响应失败后的重试：命令已经运行，后续请求却告诉模型工具被中止。执行事实与模型上下文不一致，可能诱发重复操作。 | **OPEN，3 条评论**；处于分诊及待关闭流程。 |
| [#61695：Claude Agent 将宿主重启误报为用户拒绝](https://github.com/anomalyco/opencode/issues/61695) | 工具执行期间的宿主侧重启，被模型理解为“用户不希望继续”，影响任务恢复与行为判断。 | **OPEN，1 条评论**；标记为 `reproduced`。 |
| [#61680：Plan Agent 可经 Python 写入文件](https://github.com/anomalyco/opencode/issues/61680) | 用户报告模型通过 Python 命令绕过只读预期，提示规划模式的权限边界需要明确，不能仅依赖模式名称判断安全性。 | **CLOSED，3 条评论**；摘要未给出关闭原因，不能据此认定漏洞已修复。 |
| [#61615：临时目录权限疑虑](https://github.com/anomalyco/opencode/issues/61615) | Debian 用户报告其他系统用户可读取 `/tmp/opencode/`，涉及共享机器上的隐私与文件权限。 | **CLOSED，2 条评论**；关闭原因及实际暴露范围未在数据中说明。 |
| [#61641：旧会话 reasoning 回放失败](https://github.com/anomalyco/opencode/issues/61641) | 部分旧会话发送消息时出现重复 item ID 错误，TUI、WebUI 均受影响，而新会话正常；关系到升级后的历史会话可用性。 | **OPEN，2 条评论**；标记为 `reproduced`。 |
| [#61689：多内容块导致 Anthropic 缓存未命中](https://github.com/anomalyco/opencode/issues/61689) | 单条提示包含 20 多个内容块时，当前缓存断点策略可能无法命中前一请求，影响成本与延迟。 | **OPEN，1 条评论**；已标记复现，并有对应修复 PR。 |
| [#61672：侧栏仅显示活跃会话](https://github.com/anomalyco/opencode/issues/61672) | API 返回三个会话，但桌面侧栏只显示一个，容易让用户误以为历史会话丢失，影响项目导航的可信度。 | **CLOSED，7 条评论**，是展示样本中评论最多的 Issue；关闭原因未提供。 |

## 三、重要 PR 进展

**以下 10 个 PR 均为 OPEN，功能与修复仍待审查、合并及发布。**

| PR | 功能或修复内容 | 技术价值 |
|---|---|---|
| [#61701：加固 Web 权限 URL 匹配](https://github.com/anomalyco/opencode/pull/61701) | 拒绝带凭据的 URL，并在权限匹配时忽略 fragment。 | 针对 `webfetch` 与 Code Mode `fetch` 的 deny 规则绕过场景，属于重要权限加固。 |
| [#61690：修复 Anthropic 多内容块缓存命中](https://github.com/anomalyco/opencode/pull/61690) | 在 Anthropic 原生路由的自动缓存策略中，同时标记倒数第二条消息。 | 对应 #61689，旨在保留上一请求的缓存断点，降低重复处理开销。 |
| [#61698：按 Agent 设置压缩窗口](https://github.com/anomalyco/opencode/pull/61698) | 允许 Agent 使用 `request.settings.compactionWindow` 指定自己的 token 窗口。 | 对应 #61696，让共用模型的规划、实现等 Agent 采用不同上下文策略。 |
| [#61699：开放 TUI 会话渲染插件钩子](https://github.com/anomalyco/opencode/pull/61699) | 为会话 transcript 增加可选插件扩展点；没有插件接管时保持原有渲染。 | 对应 #61697，将插件定制能力从侧栏、面板推进到核心会话区域。 |
| [#61662：同一 WSL 发行版串行执行任务](https://github.com/anomalyco/opencode/pull/61662) | 修复多个 WSL 操作共用单一任务状态、提前清空状态的问题。 | 减少探测与更新并行时的按钮状态错误及并发操作风险。 |
| [#61679：清理实际已送达的 Pending 提示](https://github.com/anomalyco/opencode/pull/61679) | 根据 transcript 中的送达证据，清除仍滞留客户端发件箱的提示。 | 改善消息状态一致性，减少用户误判发送失败、重复提交的可能。 |
| [#61682：检查模拟界面前先渲染](https://github.com/anomalyco/opencode/pull/61682) | 在 `ui.matches` 读取屏幕前触发渲染，避免检查过期画面。 | 对应 #61681，减少“文字已显示但等待仍超时”的测试误报。 |
| [#61674：过滤 question 输入中的回车字符](https://github.com/anomalyco/opencode/pull/61674) | 清除模型工具参数中的字面 `\r`。 | 对应 #61665，防止问题文本被拆碎，并经答案回显进一步放大。 |
| [#61700：按项目组织侧边标签](https://github.com/anomalyco/opencode/pull/61700) | 增加实验性项目分组布局与会话预览。 | 改善多项目、多会话导航；作者明确说明并非完整解决相关既有需求。 |
| [#61691：在 Inbox 中分离未读会话](https://github.com/anomalyco/opencode/pull/61691) | 将未读结果与 Recent 分开，并纳入从未运行的会话。 | 强化待处理会话的可见性；项目分组不在此 PR 范围内。 |

## 四、功能需求趋势

### 1. 插件 API 从“能扩展”走向“可控制、可组合”
需求不仅是添加面板，还包括定制会话正文、跨插件管理工具，以及明确命令与工具结果契约。代表条目：[会话渲染钩子 #61697](https://github.com/anomalyco/opencode/issues/61697)、[跨插件移除工具 #61623](https://github.com/anomalyco/opencode/issues/61623)、[插件 API 文档 #61676](https://github.com/anomalyco/opencode/issues/61676)。

### 2. 权限授权需要更精细，也更易理解
开发者希望获得竞态安全、单次使用的授权能力；用户则要求审批界面明确显示工具与操作，而不是只有 `*`。代表条目：[单次权限准入 #61645](https://github.com/anomalyco/opencode/issues/61645)、[MCP 审批信息不足 #61667](https://github.com/anomalyco/opencode/issues/61667)。

### 3. 上下文与模型成本管理趋向 Agent 级别
不同角色需要不同压缩时机，复杂消息结构也要求更可靠的提示缓存策略。代表条目：[按 Agent 压缩窗口 #61696](https://github.com/anomalyco/opencode/issues/61696)、[Anthropic 缓存问题 #61689](https://github.com/anomalyco/opencode/issues/61689)。

### 4. 原生工作流融合比新增入口更受关注
需求覆盖智能发现本地 CLI、正确打开当前文件，以及避免 Web 快捷键覆盖浏览器操作。代表条目：[CLI 发现 #61693](https://github.com/anomalyco/opencode/issues/61693)、[外部编辑器打开行为 #61678](https://github.com/anomalyco/opencode/issues/61678)、[浏览器快捷键透传 #61675](https://github.com/anomalyco/opencode/issues/61675)。

### 5. 免费模型的配额透明度仍有缺口
“未发消息却提示额度耗尽”与“希望显示剩余额度”共同指向可观测性不足。代表条目：[初装即触发限额 #61632](https://github.com/anomalyco/opencode/issues/61632)、[展示免费模型配额 #61616](https://github.com/anomalyco/opencode/issues/61616)。

## 五、开发者关注点

- **优先处理长会话的资源成本。** 内存、CPU 与磁盘反馈同时出现，建议将长会话空闲测试、流式事件存储增长和数据清理纳入回归检查。参见 [#61653](https://github.com/anomalyco/opencode/issues/61653)、[#61664](https://github.com/anomalyco/opencode/issues/61664)。
- **工具状态必须与真实执行结果一致。** 请求失败、宿主重启和用户拒绝应有明确区分，避免模型基于错误状态重复或放弃操作。参见 [#61694](https://github.com/anomalyco/opencode/issues/61694)、[#61695](https://github.com/anomalyco/opencode/issues/61695)。
- **升级兼容性需要覆盖旧会话与已有配置。** 新会话正常并不代表升级无损，历史 reasoning 数据与本地 Skills 发现均有反馈。参见 [#61641](https://github.com/anomalyco/opencode/issues/61641)、[#61669](https://github.com/anomalyco/opencode/issues/61669)。
- **权限应落实在执行层，并向用户提供足够信息。** Plan 模式只读预期、URL 规则匹配和 MCP 审批展示分别暴露了边界执行与可解释性问题。参见 [#61680](https://github.com/anomalyco/opencode/issues/61680)、[PR #61701](https://github.com/anomalyco/opencode/pull/61701)、[#61667](https://github.com/anomalyco/opencode/issues/61667)。

**总体判断：** 当前样本最突出的信号，是社区对“可靠运行、状态可信、权限清晰”的要求正在增强；插件与会话管理的新能力值得关注，但尚不能替代对稳定性问题的持续跟踪。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-05

## 今日速览

过去 24 小时未有新版本发布，社区动态主要集中在 **模型服务接入、MCP 传输可靠性与 coding-agent 稳定性**。两项仍开放且标记为 `prio:p0` 的需求——Token Plan 品牌及网关兼容升级、按会话设置上下文压缩策略——值得优先跟踪；PR 侧则出现依赖安全、消息读取性能和请求取消处理等修复提案。

> **数据口径**：本期共 11 条 Issue、24 条 PR 更新，提供了其中 20 条 PR 明细。以下条目链接按明细中的 `earendil-works/pi` 仓库生成。`CLOSED` 不代表已修复或已合并；PR 评论数字段缺失，不据此判断讨论热度。

## 社区热点 Issues

本期 Issue 均为 0 👍、1–2 条评论，尚未形成明显的高热讨论。以下按优先级、影响范围及开发者使用风险筛选。

| Issue | 关键内容与重要性 | 社区反应与当前状态 |
|---|---|---|
| **[⑤11773：Token Plan 品牌与网关兼容升级](https://github.com/earendil-works/pi/issues/11773)** | 提议将现有配置升级为国内“千问 AI 平台”及国际版 QwenCloud，并更新新配置的默认网关。重点在于兼顾新服务入口与已有配置兼容性。 | **OPEN · `prio:p0`**；1 条评论，需继续跟踪迁移方案。 |
| **[⑤11771：按会话设置压缩策略](https://github.com/earendil-works/pi/issues/11771)** | `pi-durable` 当前只能在 Harness 层配置压缩策略；需求希望不同会话独立设置启用状态、预留 Token 和保留上下文等参数，对多会话长期运行场景重要。 | **OPEN · `prio:p0`**；1 条评论。 |
| **[⑤11802：终端键盘序列异常导致会话失去响应](https://github.com/earendil-works/pi/issues/11802)** | 报告分片的 Kitty CSI-u 序列被当作文本写入输入框，之后 Enter、`/quit`、`/resume` 无响应。直接影响终端交互的基本可用性。 | **CLOSED · `untriaged`**；2 条评论，所给数据未说明解决方式。 |
| **[⑤11803：`tool_search` 漏掉本地 schema 引用中的参数描述](https://github.com/earendil-works/pi/issues/11803)** | 当参数描述位于本地 `$ref` 后，延迟加载工具可能无法被搜索发现；将 schema 内联后则可发现。影响 MCP 工具检索完整性。 | **CLOSED · `untriaged`**；2 条评论，未提供修复结论。 |
| **[⑤11796：预构建 ESM 扩展仍经 jiti 加载](https://github.com/earendil-works/pi/issues/11796)** | 导入宿主包的预构建扩展仍被转译并写入临时缓存，报告称冷缓存启动增加约 **1–4 秒**。暴露扩展加载路径的性能开销。 | **CLOSED · `bug`、`untriaged`**；1 条评论。 |
| **[⑤11797：pi-env 支持自定义字节传输](https://github.com/earendil-works/pi/issues/11797)** | 希望 `Connection` 接受应用提供的字节流适配器，而非始终启动 Node 进程，面向无法创建进程或使用 SSH 的沙箱环境。 | **CLOSED · `untriaged`**；1 条评论，尚不能认定该能力已支持。 |
| **[⑤11774：Windows Git Bash 子进程在超时后残留](https://github.com/earendil-works/pi/issues/11774)** | 报告 `taskkill /F /T` 未能清理部分 MSYS 子进程。对自动化任务的资源回收、取消语义和运行稳定性有影响。 | **CLOSED · `no-action`**；1 条评论，数据未说明后续处理。 |
| **[⑤11772：扩展 API 增加会话设置方法](https://github.com/earendil-works/pi/issues/11772)** | 希望扩展能够修改 steering mode、follow-up mode 和自动压缩设置，补齐与 RPC 客户端之间的控制能力差异。 | **CLOSED · `no-action`**；1 条评论。 |
| **[⑤11792：内置 LongCat-2.5 provider 提案](https://github.com/earendil-works/pi/issues/11792)** | 提议在 `pi-ai` 中内置 LongCat-2.5，并通过 `LONGCAT_API_KEY` 认证，反映社区对新增模型服务的需求。 | **CLOSED · `no-action`**；1 条评论；[对应 PR #11784](https://github.com/earendil-works/pi/pull/11784) 也已关闭，不能据此认定已支持。 |
| **[⑤11769：stable 分支未更新至 1.5](https://github.com/earendil-works/pi/issues/11769)** | 报告 stable 分支仍停留在 v1.4，导致按文档使用 Nix 的用户未获得 1.5。体现发布分支、安装渠道与文档一致性的重要性。 | **CLOSED · `bug`、`no-action`**；1 条评论。 |

## 重要 PR 进展

以下按技术影响筛选，**除 #11798 为 OPEN 外，其余均为 CLOSED；数据未提供合并状态，也不能视为已随版本交付。**

1. **[修复 issue triage 工具的 schema 依赖迁移｜#11798](https://github.com/earendil-works/pi/pull/11798)** — **OPEN**  
   将 schema 使用迁往 `pi-schema`，解决 `Type` 从 `pi-ai` 移除后，Issue 分诊工具无法启动的问题。

2. **[升级 minimatch，处理 ReDoS 风险｜#11789](https://github.com/earendil-works/pi/pull/11789)** — **CLOSED**  
   提议从 `10.2.6` 升级至 `11.0.3`，应对中等级别公告 `GHSA-g3hv-75wg-m249`。摘要指出受影响版本低于 `11.0.1`，且没有已修复的 10.x 版本，值得依赖维护者关注。

3. **[MCP 大型 stdio 消息改为线性时间读取｜#11791](https://github.com/earendil-works/pi/pull/11791)** — **CLOSED**  
   针对每次接收分片都执行 `Buffer.concat` 并从头搜索换行的路径，减少大消息分片到达时的重复复制和扫描。

4. **[MCP 请求取消后停止恢复响应流｜#11778](https://github.com/earendil-works/pi/pull/11778)** — **CLOSED**  
   处理 Streamable HTTP 请求已取消或超时，但底层 SSE 流仍存活并尝试恢复的问题，目标是让传输层生命周期与请求状态一致。

5. **[符号链接路径共享认证文件锁｜#11787](https://github.com/earendil-works/pi/pull/11787)** — **CLOSED**  
   针对多个路径指向同一 `auth.json`、却各自生成锁目录的问题，修正并发访问的互斥范围，降低共享认证文件的读写冲突风险。

6. **[OpenAI Responses 使用 `session-id` 请求头｜#11793](https://github.com/earendil-works/pi/pull/11793)** — **CLOSED**  
   将 `session_id` 改为 `session-id`，避免带下划线的请求头被 nginx 默认配置丢弃，或遭部分 Envoy 配置拒绝。

7. **[排队中的 steering／follow-up 图片统一缩放｜#11782](https://github.com/earendil-works/pi/pull/11782)** — **CLOSED**  
   让 Agent 忙碌期间排队的图片消息也经过尺寸处理和坐标提示流程，补齐其与空闲状态输入之间的行为差异。

8. **[Azure Foundry GPT-6 上下文窗口配置调整｜#11781](https://github.com/earendil-works/pi/pull/11781)** — **CLOSED**  
   按提案描述，为 Azure 路径配置 1.05M 上下文窗口，避免继承直接 OpenAI provider 的 272K 限制。这体现了不同服务商配置需要独立维护。

9. **[Ant Ling 模型与 API 兼容性更新｜#11800](https://github.com/earendil-works/pi/pull/11800)** — **CLOSED**  
   提议以 Ling 3.0、Ling 3.0 Flash VL、Ling 3.1 Flash 替换旧模型，并统一与 DeepSeek 的 API 兼容方式。[#11799](https://github.com/earendil-works/pi/pull/11799) 为同题提案，不重复计入。

10. **[连接错误保留底层原因｜#11783](https://github.com/earendil-works/pi/pull/11783)** — **CLOSED**  
    从 SDK 错误的 `cause` 链中保留真实原因，改善 DNS、TLS、证书、代理及连接拒绝等问题只显示 “Connection error.” 的排障体验。

## 功能需求趋势

- **会话控制走向细粒度与接口一致性**  
  按会话设置压缩策略，以及让扩展具备 RPC 已有的设置能力，说明开发者需要更灵活地编排长期运行的 Agent。参见 [#11771](https://github.com/earendil-works/pi/issues/11771)、[#11772](https://github.com/earendil-works/pi/issues/11772)。

- **Provider 需求不止于“增加模型”**  
  除 LongCat-2.5 接入外，社区还关注网关迁移、品牌展示与配置一致性。`/model` 使用注册显示名的需求虽较小，却关系到第三方 provider 的识别体验。参见 [#11792](https://github.com/earendil-works/pi/issues/11792)、[#11773](https://github.com/earendil-works/pi/issues/11773)、[#11795](https://github.com/earendil-works/pi/issues/11795)。

- **扩展与嵌入式运行环境需要更少假设**  
  自定义字节传输和预构建 ESM 直载诉求，都指向更灵活的宿主环境适配：不默认依赖子进程，也不对已构建产物重复转译。参见 [#11797](https://github.com/earendil-works/pi/issues/11797)、[#11796](https://github.com/earendil-works/pi/issues/11796)。

- **稳定性需求集中在边界场景**  
  schema 引用、终端输入分片、Windows 进程树和 Nix 发布渠道，分别暴露工具发现、交互、任务清理与分发链路的边界问题。参见 [#11803](https://github.com/earendil-works/pi/issues/11803)、[#11802](https://github.com/earendil-works/pi/issues/11802)、[#11774](https://github.com/earendil-works/pi/issues/11774)、[#11769](https://github.com/earendil-works/pi/issues/11769)。

## 开发者关注点

1. **取消操作必须真正释放资源**：Windows 残留进程与 MCP 取消后仍存活的响应流，都提示应同时验证上层任务状态和底层资源生命周期。[Issue #11774](https://github.com/earendil-works/pi/issues/11774) · [PR #11778](https://github.com/earendil-works/pi/pull/11778)
2. **扩展开发需要性能与 API 对等性**：冷启动额外转译，以及扩展无法直接修改部分会话设置，是本期较明确的开发体验痛点。[Issue #11796](https://github.com/earendil-works/pi/issues/11796) · [Issue #11772](https://github.com/earendil-works/pi/issues/11772)
3. **代理网络下的兼容性与可诊断性不可忽略**：请求头命名和错误原因保留，会直接影响生产环境接入与排障效率。[PR #11793](https://github.com/earendil-works/pi/pull/11793) · [PR #11783](https://github.com/earendil-works/pi/pull/11783)
4. **需区分“条目关闭”与“能力交付”**：本期大量条目已关闭，但缺少合并、修复及发布说明；尤其是安全依赖升级与模型接入，应核验实际提交和安装版本后再作部署判断。[PR #11789](https://github.com/earendil-works/pi/pull/11789) · [PR #11784](https://github.com/earendil-works/pi/pull/11784)

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-11-05｜仓库：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

> 口径说明：根据提供的过去 24 小时数据整理，所列 Issue、PR 的更新时间均为 11 月 4 日。PR 共更新 46 条，本报告仅能分析展示的 20 条；其评论数为 `undefined`，不据此判断讨论热度。版本说明存在截断，以下仅总结可确认信息。

## 1. 今日速览

Qwen Code 发布 **v0.26.7**，可见更新聚焦模型目录刷新配置与隐私控制，未声明已知破坏性变更。社区讨论主要集中在 **Docker 沙箱中的项目 Hooks 失效、Managed Agent 扩展性、视觉模型能力识别**，均已有相关修复 PR 推进。与此同时，按需加载工具描述和自动记忆指引成为降低常驻上下文开销的重要优化方向。

## 2. 版本发布

### [v0.26.7](https://github.com/QwenLM/qwen-code/releases/tag/v0.26.7)

- **新增配置**：引入 operator 作用域的 `model.catalogRefresh` 设置。
- **隐私控制调整**：发布摘要提到，`privacy.usageStatisticsEnabled: false` 将阻止后台目录相关行为；由于原文截断，具体覆盖范围需查看完整发布说明。
- **兼容性**：发布说明标注 **无已知破坏性变更**。

**开发者影响**：需要控制后台网络行为、模型目录更新策略的部署方值得关注；目前不能从这份摘要确认下述修复是否已包含在该版本中。

## 3. 社区热点 Issues

以下综合影响面、优先级、讨论量和关联修复进展选取。所列 Issue 均处于 **OPEN**，👍 均为 0；评论量反映讨论活动，不等同于用户影响规模。

| Issue | 核心问题与重要性 | 社区反应与进展 |
|---|---|---|
| **[#16313：Docker 沙箱中已批准的项目 Hooks 不执行](https://github.com/QwenLM/qwen-code/issues/16313)** | **P1**。主分支 Docker E2E 中的 ACP Hook 测试持续失败，影响依赖工具前后置 Hook 的自动化流程。 | **3 条评论**，已标记 `ready-for-agent`；修复 PR #16316 已打开。 |
| **[#16320：常驻 Session 的控制面 SQL 开销增长](https://github.com/QwenLM/qwen-code/issues/16320)** | **P2**。关注 Java 控制面、MySQL 与 Hosted Harness 的数据库工作量随会话数量和历史长度增长，关系托管部署扩展性。 | **4 条评论**，标记 `need-discussion`；仍需讨论优化范围与方案。 |
| **[#16265：Managed Agent MySQL 迁移测试失败](https://github.com/QwenLM/qwen-code/issues/16265)** | CI 在工作区迁移相关集成测试中失败，涉及迁移过程中已提交 fence 的可见性，值得持续跟踪。 | **5 条评论**，为本批 Issue 评论最多的一条；仍待分诊，不能据此认定为已确认的生产缺陷。 |
| **[#16307：Ollama 名称下的 Qwen VL 被视为纯文本](https://github.com/QwenLM/qwen-code/issues/16307)** | **P2**。`qwen3-vl:8b`、`qwen2.5vl:7b` 等名称未匹配现有模态规则，影响本地多模态模型使用。 | **2 条评论**；对应修复 PR #16309 已打开。 |
| **[#16308：多个开放权重视觉模型被视为纯文本](https://github.com/QwenLM/qwen-code/issues/16308)** | **P2**。涉及 Llama 3.2 Vision、Llama 4、LLaVA、Pixtral、Mistral Small 3.1/3.2，暴露默认能力表与模型目录的覆盖缺口。 | **2 条评论**；对应修复 PR #16311 已打开。 |
| **[#16295：项目 Hooks 审批语义与体验完善](https://github.com/QwenLM/qwen-code/issues/16295)** | **P2、安全相关**。追踪 #14748 延后的审批细节，包括 `--yolo`、文件夹信任与已批准配置之间的语义。 | **3 条评论**，标记 `ready-for-human`；涉及权限边界，需人工审查。 |
| **[#16301：前台子 Agent 的工具显示为“unknown Tool”](https://github.com/QwenLM/qwen-code/issues/16301)** | **P3**。Web Shell 无法正确展示子 Agent 工具名称，削弱并行任务的可观察性与排障体验。 | **3 条评论**；对应修复 PR #16306 已打开。 |
| **[#16272：被取消的主分支 CI 不触发告警](https://github.com/QwenLM/qwen-code/issues/16272)** | **P2**。仅监听 `failure` 会遗漏以 `cancelled` 结束的超时任务，使部分回归长期缺少告警。 | **2 条评论**；数据中另有后续 Issue #16319，继续讨论取消任务的报告精度。 |
| **[#16291：将自动记忆指引迁入内置 Skill](https://github.com/QwenLM/qwen-code/issues/16291)** | **P2 功能请求**。希望将每次请求携带的约 3.5k 字符指引拆为短常驻策略和按需加载内容，降低上下文负担。 | **2 条评论**，标记 `ready-for-human`；对应 PR #16303 已打开。 |
| **[#16293：`/stats` 支持任意日期区间](https://github.com/QwenLM/qwen-code/issues/16293)** | **P3 功能请求**。希望按包含起止日期的区间查看 Token、请求量及模型、认证类型等统计，便于成本复盘。 | **2 条评论**，标记 `need-discussion`；当前展示的 PR 中未见对应实现。 |

## 4. 重要 PR 进展

**以下 10 个 PR 当前均为 OPEN，属于拟议实现或修复，不代表已经合并或发布。**

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| **[#16316：限定项目 Hooks 审批环境范围](https://github.com/QwenLM/qwen-code/pull/16316)** | 审批哈希的环境输入仅使用工作区根目录下的 `.env` 文件，避免宿主机祖先目录配置导致容器内哈希不同。 | 修复“宿主机已批准、Docker 内却不执行”的一致性问题，对应 P1 Issue #16313。 |
| **[#16325：为 Runtime slot 查询增加索引](https://github.com/QwenLM/qwen-code/pull/16325)** | 为 Runtime slot 表增加 `isolation_key` 索引，优化 CSI marker probe 与 fence 的相关查询。 | 减少全表扫描，改善 Managed Agent 控制面的数据库开销。 |
| **[#16318：限制 Runtime 并发并改进错误处理](https://github.com/QwenLM/qwen-code/pull/16318)** | 将私有 HTTP 分发限制为 64 个平台线程，本地 worker 启动限制为 32 个并发握手，并处理容量拒绝后的恢复问题。 | 防止启动阶段资源无界增长，同时兼顾恢复路径。 |
| **[#16309：修复 Ollama 下 Qwen VL 模态识别](https://github.com/QwenLM/qwen-code/pull/16309)** | 为 `qwen3-vl`、`qwen2.5vl` 等 Ollama 名称识别图像、视频输入能力。 | 消除同一模型因命名来源不同而出现的能力差异。 |
| **[#16311：补齐多个视觉模型的图像能力](https://github.com/QwenLM/qwen-code/pull/16311)** | 为 Llama Vision、LLaVA、Pixtral 等补充图像输入支持，同时保留相近纯文本型号的限制。 | 扩大多模态兼容范围，避免宽泛匹配误判。 |
| **[#16310：默认延迟加载 Workflow 工具 schema](https://github.com/QwenLM/qwen-code/pull/16310)** | 首次请求仅携带简短目录项，完整描述和参数 schema 通过已有工具发现机制按需返回。 | 减少常驻工具定义占用的上下文。 |
| **[#16303：自动记忆指引迁入内置 Skill](https://github.com/QwenLM/qwen-code/pull/16303)** | 系统提示保留精简记忆策略，将详细操作指引移至按需加载的 Skill。 | 降低日常请求上下文负担，对应 Issue #16291。 |
| **[#16315：SDK 支持仅当前会话选模](https://github.com/QwenLM/qwen-code/pull/16315)** | 通过能力门控支持 `persistDefault: false`，并统一 REST、ACP HTTP、ACP WebSocket 的转换与校验。 | 允许临时切换模型，不覆盖用户或工作区默认模型及认证配置。 |
| **[#16314：Linux Desktop 重连存活后端](https://github.com/QwenLM/qwen-code/pull/16314)** | 启动器崩溃后，校验工作区、运行命名空间和进程身份，再重连仍存活的后端。 | 尽量保留进行中的任务和会话写入状态，提高桌面端恢复能力。 |
| **[#16306：补全工具名称解析回退链](https://github.com/QwenLM/qwen-code/pull/16306)** | 在既有名称来源均不可用时，从 `_meta.toolLifecycle.toolName` 解析名称。 | 修复 Web Shell 的“unknown Tool”，且不改变已有名称字段的优先级。 |

## 5. 功能需求趋势

### ① 性能优化从内存扩展到数据库与上下文
讨论不仅关注常驻会话的控制面 SQL 成本，也开始压缩每次请求重复携带的记忆指引。优化目标同时覆盖服务端扩展性和模型请求开销。  
关联：[会话 SQL 开销 #16320](https://github.com/QwenLM/qwen-code/issues/16320)、[自动记忆按需加载 #16291](https://github.com/QwenLM/qwen-code/issues/16291)。

### ② 新模型支持的关键在“能力识别一致性”
本批多模态问题并非单纯增加模型名称，而是要正确处理 Ollama 别名、尺寸标签及视觉版与纯文本版的边界。  
关联：[Qwen VL 别名 #16307](https://github.com/QwenLM/qwen-code/issues/16307)、[其他视觉模型覆盖 #16308](https://github.com/QwenLM/qwen-code/issues/16308)。

### ③ Hooks 自动化需要兼顾可用性与权限语义
用户既需要已批准的 Hooks 在沙箱中稳定执行，也需要 `--yolo`、文件夹信任和审批状态之间具有明确、一致的行为。  
关联：[Docker Hooks 失效 #16313](https://github.com/QwenLM/qwen-code/issues/16313)、[审批完善 #16295](https://github.com/QwenLM/qwen-code/issues/16295)。

### ④ 运维与使用数据需要更强可观察性
工具调用名称、CI 超时告警、任意日期区间统计分别面向执行过程、工程质量和使用成本，反映出社区对“可追踪、可解释”的持续需求。  
关联：[工具名称 #16301](https://github.com/QwenLM/qwen-code/issues/16301)、[CI 告警 #16272](https://github.com/QwenLM/qwen-code/issues/16272)、[统计区间 #16293](https://github.com/QwenLM/qwen-code/issues/16293)。

## 6. 开发者关注点

- **环境差异容易破坏自动化链路**：宿主机与 Docker 的配置输入不一致，会导致批准状态失配；需重点回归工作区边界和容器内行为。  
  [Issue #16313](https://github.com/QwenLM/qwen-code/issues/16313)

- **CI 可靠性既包括测试通过，也包括失败可见**：取消、超时任务的告警遗漏，以及发布链路中的 apt 冷启动问题，都会拖慢问题发现和交付。  
  [Issue #16272](https://github.com/QwenLM/qwen-code/issues/16272) · [Issue #16317](https://github.com/QwenLM/qwen-code/issues/16317) · [Issue #16271](https://github.com/QwenLM/qwen-code/issues/16271)

- **Managed Agent 的容量治理成为重点**：会话 SQL 成本、查询索引、线程与启动并发上限需要协同考虑，避免只优化单一资源指标。  
  [Issue #16320](https://github.com/QwenLM/qwen-code/issues/16320) · [PR #16318](https://github.com/QwenLM/qwen-code/pull/16318)

- **模型兼容需要覆盖真实部署名称**：接入本地视觉模型时，应验证具体模型 ID 的能力识别，而不只检查服务端是否支持图像输入。  
  [Issue #16307](https://github.com/QwenLM/qwen-code/issues/16307) · [Issue #16308](https://github.com/QwenLM/qwen-code/issues/16308)

- **成本管理同时需要“减少消耗”和“看清消耗”**：自动记忆指引精简与日期区间统计分别对应上下文优化和用量分析，两类需求正在并行推进。  
  [Issue #16291](https://github.com/QwenLM/qwen-code/issues/16291) · [Issue #16293](https://github.com/QwenLM/qwen-code/issues/16293)

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-05｜统计窗口：过去 24 小时**

> **数据说明**：来源标注为 `Hmbown/DeepSeek-TUI`，但所提供条目的链接均指向 `codewhale-hq/Codewhale`。以下按条目所示仓库生成链接，归属关系待核实。本次仅提供 2 条 Issue、3 条 PR，全部列出，不补足至 10 条；无新版本发布。

## 一、今日速览

今日动态集中在**工具调用正确性与 TUI 交互体验**：新增反馈涉及撤销接口忽略目标轮次、模型选择未保留大小写语义，相关 PR 则着手修复搜索匹配和路径返回问题。另有 PR 改进剪贴板图片粘贴与附件预览；所有条目目前均为开放状态，尚不能视为已交付。

## 二、社区热点 Issues

### 1. `/patch-undo` 忽略 `turn_id`，可能撤销错误轮次
**[#7216](https://github.com/codewhale-hq/Codewhale/issues/7216)** · 作者：soarkit · `OPEN` / `needs-triage`

- **问题**：`/patch-undo` 接受包含 `turn_id` 的 `UndoTurnRequest`，但据报告只读取 `depth`；同时传入两者时，其行为与 `/undo` 不一致。
- **为什么重要**：调用方指定的目标轮次可能未被遵守，影响撤销操作的可预测性，是值得优先核实的正确性问题。
- **社区反应**：0 评论、0 👍，尚未出现公开讨论或确认。

### 2. 模型选择器应保留大小写敏感的模型 ID
**[#7214](https://github.com/codewhale-hq/Codewhale/issues/7214)** · 作者：liuyy2 · `OPEN` / `enhancement` / `needs-triage`

- **诉求**：提议修复 provider picker 的模型选择恢复逻辑，保留模型 ID 的大小写语义；摘要指出当前匹配涉及忽略大小写的比较。
- **为什么重要**：若提供商将大小写视为模型标识的一部分，忽略大小写可能导致选择恢复不准确。
- **社区反应**：0 评论、0 👍；作者表示愿意贡献小范围修复，尚无维护者反馈。

## 三、重要 PR 进展

### 1. 支持粘贴剪贴板图片并预览所有附件
**[#7217](https://github.com/codewhale-hq/Codewhale/pull/7217)** · 作者：SparkofSpike · `OPEN`

- **改动方向**：修复 Windows 下 `Ctrl+V` 无法附加剪贴板图片的问题，并扩展附件预览。
- **背景与价值**：作者从真实 QQ 截图场景排查，称发现五处可独立阻断粘贴流程的缺陷，摘要提及 Windows Terminal 对按键的处理。该改动有望降低截图输入的操作成本。
- **当前进展**：尚未合并；评论数未提供，不能据此判断评审活跃度。

### 2. 修复 `grep_files` 的花括号与嵌套目录 glob 匹配
**[#7215](https://github.com/codewhale-hq/Codewhale/pull/7215)** · 作者：Lstarsky0 · `OPEN` / `contribution-gate`

- **改动方向**：修复 `*.{txt,md}` 等常见 glob 形式无法正确匹配的问题，标题同时涵盖嵌套目录模式。
- **为什么重要**：据描述，工具会静默返回零匹配，甚至 `files_searched: 0`，容易让模型误判为“仓库中没有相关内容”。
- **当前进展**：尚未合并，带有 `contribution-gate` 标签；具体评审与验证结果未提供。

### 3. 统一 `file_search` 结果为工作区根目录相对路径
**[#7213](https://github.com/codewhale-hq/Codewhale/pull/7213)** · 作者：Lstarsky0 · `OPEN` / `contribution-gate`

- **改动方向**：修复指定 `path` 搜索后，返回路径相对于搜索目录、而非工作区根目录的问题。
- **为什么重要**：`read` 等工具按工作区解析路径，坐标基准不一致可能使后续调用读取到另一个同名文件；多包仓库尤其容易受影响。
- **当前进展**：尚未合并，带有 `contribution-gate` 标签；未提供测试或评审结论。

## 四、功能需求趋势

本次仅有两条 Issue，以下是**有限样本反映的方向**，不代表已形成广泛社区共识。

| 方向 | 需求信号 | 关联条目 |
|---|---|---|
| **操作语义与接口一致性** | 撤销接口应遵守明确指定的目标轮次，避免相似接口行为不一致 | [#7216](https://github.com/codewhale-hq/Codewhale/issues/7216) |
| **模型标识兼容性** | 模型选择与恢复应尊重提供商模型 ID 的大小写规则，而非无条件归一化 | [#7214](https://github.com/codewhale-hq/Codewhale/issues/7214) |

结合 PR 可见，贡献方向也偏向基础可靠性与输入体验，而非新增模型或 IDE 集成：[搜索匹配修复](https://github.com/codewhale-hq/Codewhale/pull/7215)、[路径语义统一](https://github.com/codewhale-hq/Codewhale/pull/7213)、[图片粘贴与预览](https://github.com/codewhale-hq/Codewhale/pull/7217)。

## 五、开发者关注点

- **避免“静默错误”误导模型**：搜索工具返回空结果时，应能区分“确无匹配”与“匹配规则未生效”。相关：[PR #7215](https://github.com/codewhale-hq/Codewhale/pull/7215)。
- **保障跨工具调用链的一致性**：搜索返回路径应能直接用于读取，显式目标参数也应得到执行。相关：[PR #7213](https://github.com/codewhale-hq/Codewhale/pull/7213)、[Issue #7216](https://github.com/codewhale-hq/Codewhale/issues/7216)。
- **保留外部标识的精确语义**：模型 ID 不应被默认视为大小写不敏感字符串。相关：[Issue #7214](https://github.com/codewhale-hq/Codewhale/issues/7214)。
- **让桌面输入链路真正可用**：快捷键绑定、终端行为、剪贴板读取与附件展示需要端到端验证。相关：[PR #7217](https://github.com/codewhale-hq/Codewhale/pull/7217)。

**后续观察重点**：撤销问题是否获确认、两项搜索修复是否补充回归测试，以及 Windows 图片粘贴改动的验证与合并进度。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*