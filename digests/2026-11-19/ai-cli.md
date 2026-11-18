# AI CLI 工具社区动态日报 2026-11-19

> 生成时间: 2026-11-18 17:15 UTC | 覆盖工具: 9 个

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
**日期：2026-11-19｜基于所提供的过去 24 小时社区动态**

> **口径说明：**Issues、PR 数均指窗口内更新的记录，并非新增数量；部分工具只提供展示样本，不能直接据此比较完整活跃度。用户报告不等于官方确认，PR 关闭不等于合并，代码变更也不等于已经发布。

## 1. 生态全景

当前 AI CLI 的竞争重点，正从“接入更多模型、完成单次编码”转向**长任务可靠执行、多 Agent 编排和跨入口一致性**。权限控制成为多个社区的共同焦点，诉求既包括避免越权，也包括减少误拦截、解释授权依据和提供恢复路径。ACP、MCP 及共享 Agent Loop 的相关工作，显示 CLI 正逐渐成为编辑器、桌面端、Web 和消息渠道背后的代理执行基础设施。与此同时，会话恢复、资源增长、用量计量和静默失败等问题，说明高级能力扩展仍需同步补齐工程可靠性。

## 2. 各工具活跃度对比

| 工具 | 更新 Issues 数 | 更新 PR 数 | Release 情况 | 当日主要信号 |
|---|---:|---:|---|---|
| **Claude Code** | 50，展示 30 | 0 | 无新版本 | 权限边界、跨平台可靠性、Agent 编排需求 |
| **OpenAI Codex** | 50，展示 30 | 25，展示 20 | `0.171.0-alpha.13`，预发布 | Guardian 审批、沙箱重构、实时语音交接 |
| **Gemini CLI** | 1 | 4 | 无新版本 | 超长会话内存、ACP 控制与用量统计 |
| **GitHub Copilot CLI** | 7 | 0 | `v1.0.114` | ACP 会话恢复、沙箱网络、后台代理通知 |
| **Kimi Code CLI** | 0 | 0 | 无活动记录 | 本窗口无可分析动态 |
| **OpenCode** | 50，展示 30 | 展示 20，总量未提供 | 无新版本 | v2 稳定性、多模型接入、服务与权限隔离 |
| **Pi** | 11 | 6 | 无新版本 | 模型兼容、扩展控制、终端交互 |
| **Qwen Code** | 23 | 39，展示 20 | 未提供发布信息 | 共享 Agent Loop、Managed Agent、CI 与持久化 |
| **DeepSeek TUI** | 0 | 1，归属待核实 | 无新版本 | 唯一 PR 为本地化改进，链接指向其他仓库 |

**解读：**在已明确给出总数的工具中，Qwen Code 的 PR 更新量最高；Claude Code、Codex 和 OpenCode 的 Issue 更新量均为 50。由于仓库开放范围、样本截取和工作流不同，这些数字不能直接代表研发投入或产品质量。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与横向判断 |
|---|---|---|
| **权限一致性与可解释审批** | Claude Code、Codex、OpenCode、Qwen Code、Copilot CLI | Claude Code 关注 mod 是否绕过拒绝规则；OpenCode 关注跨工具读取限制及宽泛授权；Codex 关注审批证据、配置一致性和恢复；Qwen 强调授权内容可审阅；Copilot 反映沙箱阻断本地测试。核心是让权限既安全又可预测。 |
| **长任务与会话可靠性** | Claude Code、Gemini CLI、Copilot CLI、OpenCode、Qwen Code | 涵盖崩溃、堆内存耗尽、后台服务重启、会话加载失败和 JSONL 损坏。竞争正在延伸到“运行多久、失败后能否接续”。 |
| **Agent 执行控制与可观测性** | Claude Code、Codex、Gemini CLI、Copilot CLI、Pi、Qwen Code | 需求包括中途引导、消息写入与执行解耦、子代理状态、分支授权证据、后台完成通知和统一执行循环。 |
| **跨入口协议与生命周期管理** | Gemini CLI、Copilot CLI、OpenCode、Qwen Code、Claude Code | ACP 侧关注控制、恢复、资源兼容和统计；MCP 侧关注按需连接、认证恢复及连接生命周期归属。协议接入正进入边界行为治理阶段。 |
| **模型能力、费用与用量透明度** | Codex、Gemini CLI、Copilot CLI、OpenCode、Pi | 缓存计数、取消后的 token 消耗、BYOK 推理强度、Provider 身份保持、图像能力识别等，都要求“声明、界面、执行、计量”保持一致。 |

其中，**静默失败是横跨这些方向的隐性风险**：搜索预算耗尽不报错、审批无声等待、通知延迟和错误归因，可能使任务看似继续，实际却已偏离预期。

## 4. 差异化定位分析

以下是依据本期工程动向推导的侧重，而非完整产品能力排名。

| 工具 | 功能侧重与技术路线 | 更相关的目标用户／场景 |
|---|---|---|
| **Claude Code** | 围绕现有 Agent 工作流深化权限、上下文复用、MCP 配置和子代理观测 | 高频编码用户、使用 SDK／MCP／多 Agent 的团队 |
| **Codex** | Guardian 审批证据、跨平台沙箱和实时交接并行推进，突出执行治理 | 重视授权审计、受控自动化及桌面集成的团队 |
| **Gemini CLI** | 本期集中在 ACP 宿主控制、统计完整性及运行性能 | 编辑器集成者、Agent 编排器开发者、长任务用户 |
| **Copilot CLI** | 聚焦 IDE—终端协作、会话语义、后台代理和模型配置一致性 | 编辑器与终端并行工作的开发者、ACP 客户端用户 |
| **OpenCode** | 多 Provider、插件、Code Mode、后台服务及跨平台接入并行演进 | 需要灵活模型选择、自定义工具和多环境部署的用户 |
| **Pi** | 强调可编程扩展、消息与执行控制、模型兼容层和终端细节 | 希望定制 Agent 行为、构建宿主应用的开发者 |
| **Qwen Code** | 通过共享 Agent Loop 和 Runtime 设计，统一 ACP、TUI、Web 与消息渠道 | 多入口部署、Managed Agent 和工作流平台集成团队 |
| **Kimi Code CLI** | 本窗口无活动 | 无法据此判断定位变化 |
| **DeepSeek TUI** | 唯一记录归属不一致 | 不宜据该记录推断技术路线 |

**关键区别：**Codex 本期更偏向“执行授权如何治理”，Qwen Code 更偏向“多入口如何统一运行”，OpenCode 更偏向“开放接入如何兼容”，Pi 则更突出“宿主如何精细控制 Agent”。

## 5. 社区热度与成熟度

### 活跃度：区分反馈量、代码量与讨论量

- **反馈更新量较高：**Claude Code、Codex、OpenCode 均有 50 条更新 Issue，但这不等于存在同等数量的新问题。
- **代码迭代较密集：**Qwen Code 更新 39 条 PR，Codex 更新 25 条；OpenCode 展示 20 条 PR，也呈现多方向并行开发。
- **较小样本下的定向改进：**Pi 为 11 条 Issue、6 条 PR；Copilot CLI 为 7 条 Issue；Gemini CLI 为 1 条 Issue、4 条 PR。
- **讨论深度总体有限：**所展示单条 Issue 的最高评论数，OpenCode 为 6、Qwen Code 为 5、Codex 和 Pi 为 3、Gemini CLI 和 Copilot CLI 为 2、Claude Code 为 1。尚不足以认定广泛社区共识。

### 成熟度：不能用关闭率或发布频率代替

- **Qwen Code、OpenCode、Codex 呈现较明显的快速演进信号**，分别涉及执行架构统一、v2 服务与兼容性修整、审批和沙箱重构；其中 Codex 当日发布的是 Alpha。
- **Claude Code、Copilot CLI 本期更突出已有工作流的可靠性诉求**，但公开 PR 为零不能说明内部没有开发活动。
- **Pi 的 11 条更新 Issue 中有 9 条已关闭**，只能说明处置状态变化，不能据此计算修复率。
- Gemini CLI 的样本较少，Kimi 无活动，DeepSeek TUI 数据归属待核实，均不适合据此做成熟度排名。

**更有效的成熟度指标应是：关键工作流通过率、故障恢复能力、权限一致性，以及修复是否进入可验证的发布版本。**

## 6. 值得关注的趋势信号

### ① CLI 正成为多入口代理运行时
Qwen 的共享 Agent Loop、Gemini 的 ACP 中途引导，以及多个工具的协议修复，都表明终端只是入口之一。

**开发参考：**集成时应检查不同入口的取消、审批、用量和恢复语义，不能仅验证“能连接”。

### ② 权限从“允许／拒绝”升级为有来源、范围和时效的执行契约
Codex 的分支授权证据、Qwen 的可审阅授权，以及 Claude Code、OpenCode 的跨工具权限报告，共同凸显授权语义的重要性。

**开发参考：**评估权限是否覆盖间接调用、子代理和持久化规则；不要仅因排障困难而扩大默认权限。

### ③ 长任务能力取决于状态工程，而不仅是上下文窗口
Gemini 的超长会话 OOM、Qwen 的 JSONL 损坏和 Copilot 的空会话恢复失败，分别涉及资源、持久化与生命周期边界。

**开发参考：**优先验证检查点、重启恢复、日志完整性和资源增长。累计处理 token 数不能替代持续运行能力指标。

### ④ 成本可观测性正在成为执行正确性的一部分
缓存统计争议、取消后的用量缺失、会话导入后的 Provider 改写，都可能影响成本判断，即使尚无证据表明产生错误扣费。

**开发参考：**分别记录模型／Provider 身份、实际用量、缓存指标与账单；将取消、重试和恢复纳入成本验收。

### ⑤ 生态扩张使兼容性与验证基础设施成为瓶颈
Pi 的模型 schema 差异、OpenCode 的协议边界问题，以及 Qwen 的 CI 门禁与并发问题，说明功能数量增加也在放大验证复杂度。

**开发参考：**选型应使用自己的操作系统、模型、插件和测试链路做端到端回归，而非仅依据功能清单或社区活跃度。

---

**总体建议：**当前选型最值得优先验证的，不是“谁新增功能最多”，而是**权限是否一致、失败是否可见、状态是否可恢复、成本是否可追踪**。本期动态可用于制定验证清单，但尚不足以支持单一工具“整体最成熟”或“普遍更可靠”的结论。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-19｜基于提供的 PR 与 Issue 样本**

> **数据口径：**PR 评论数均为 `undefined`、👍 均为 0，因此无法核实真实热度排名或评论活跃程度。下文按所给榜单顺序、合并同类 Skill 后整理关注清单；“讨论热点”指提交所涉及的议题，不代表已核实的评论内容。展示的 20 个 PR 全部为 **OPEN**，尚不能视为官方已接纳或即将发布。

## 1. 热门 Skills 排行

| 顺位 | Skill / PR | 功能与关注焦点 | 当前状态 |
|---|---|---|---|
| 1 | **mcp-builder** · [#1742](https://github.com/anthropics/skills/pull/1742) | 修复 MCP 连接脚本对 `mcp>=2` 的兼容性，适配 `streamable_http_client` 与自定义 HTTP 请求头。焦点是**上游 SDK 升级后能否继续运行**。 | OPEN，10-08 更新 |
| 2 | **skill-creator** · [#1298](https://github.com/anthropics/skills/pull/1298) | 隔离触发评估任务，处理 Windows 子进程及运行时故障，避免把执行失败算成“未触发”。焦点是**评估分数是否可信**。 | OPEN，09-16 更新 |
| 3 | **notion-spec-to-implementation 等** · [#1245](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品或技术规格转成实施任务、验收标准与进度跟踪；同一 PR 还包含简历审计 Skill。焦点是**规格到执行的工作流闭环**。 | OPEN，10-15 更新 |
| 4 | **webapp-testing** · [#1980](https://github.com/anthropics/skills/pull/1980) | 调整测试服务器启动方式，避免 `shell=True` 带来的命令注入风险。焦点是**Agent 执行命令的安全边界**。 | OPEN，11-01 更新 |
| 5 | **docx** · [#1792](https://github.com/anthropics/skills/pull/1792)、[#1734](https://github.com/anthropics/skills/pull/1734) | 前者修复 LibreOffice 超时仍报成功的问题，并验证修订标记是否清除；后者增加孤立批注检测。焦点是**文件处理结果可验证，而非仅脚本执行成功**。 | 均 OPEN；分别于 11-01、09-25 更新 |
| 6 | **proofcore-contract-auditor** · [#1771](https://github.com/anthropics/skills/pull/1771) | 提议分析 Solidity/Rust 智能合约，并将审计证明锚定到 TON。焦点是**垂直领域审计与可追溯证明**；不能据此认定审计能力已获官方验证。 | OPEN，09-16 更新 |
| 7 | **md2video-audio** · [#1703](https://github.com/anthropics/skills/pull/1703) | 提议把 Markdown 经幻灯片流程转换为带配音的 MP4。焦点是**文档到多媒体内容的自动化生产**；“零成本”等为提交者描述。 | OPEN，09-15 更新 |
| 8 | **pyxel** · [#525](https://github.com/anthropics/skills/pull/525) | 面向 Python 复古游戏开发，涵盖实现、调试、无头输入测试、画面检查与状态验证。焦点是**生成代码后如何验证游戏实际行为**。 | OPEN，11-01 更新 |

## 2. 社区需求趋势

### ① 安全与可信分发：讨论量最明确的首要议题
[#492](https://github.com/anthropics/skills/issues/492) 有 **46 条评论**，显著高于其他展示的 Issue，关注社区 Skill 使用 `anthropic/` 命名空间造成的官方身份混淆与权限误授。结合治理模式提案 [#412](https://github.com/anthropics/skills/issues/412，已关闭)，需求指向**来源标识、权限约束、策略执行与审计**，不只是增加功能。

### ② 团队级工作流：从个人安装走向组织复用
[#228](https://github.com/anthropics/skills/issues/228) 有 **17 条评论、8 个赞**，希望在 Claude.ai 中直接共享组织 Skill，减少下载、转发和手动上传。它属于跨产品生态需求，而非单纯 Claude Code 功能，体现了**共享库与统一分发**的期待。

### ③ 评估与质量门禁：先证明 Skill 能正确触发
[#556](https://github.com/anthropics/skills/issues/556) 的零触发率报告有 **13 条评论**；[#1352](https://github.com/anthropics/skills/issues/1352) 又指出并行评估可能产生假阴性。新方向包括 [#1385](https://github.com/anthropics/skills/issues/1385) 的“任务前校准—对抗审查—交付验证”管线，说明社区希望把**自动评估与交付验收**内建到工作流。

### ④ 长任务记忆与上下文效率
[#1329](https://github.com/anthropics/skills/issues/1329) 提出 `compact-memory`，获 **10 条评论**，希望压缩长期 Agent 状态。与此同时，[#1487](https://github.com/anthropics/skills/issues/1487) 报告 `claude-api` 一次加载约 156k tokens，[#189](https://github.com/anthropics/skills/issues/189) 反馈插件内容重复。共同诉求是**按需加载、避免重复、降低上下文成本**。

### ⑤ 文档与触发描述：从“能生成”转向“稳定交付”
[#2018](https://github.com/anthropics/skills/issues/2018) 指出 DOCX 合并可能写出无效 XML；[#2064](https://github.com/anthropics/skills/issues/2064) 则要求描述清楚“何时使用”主题 Skill。需求分别落在**产物完整性**与**触发条件明确化**。

**趋势判断：**可见样本对治理、评估、记忆和团队复用的需求，比“通用代码审查、测试生成”等新方向更有直接证据。另如账号邮箱变更 [#1143](https://github.com/anthropics/skills/issues/1143) 虽获 18 个赞，但不是 Skill 需求，不宜纳入方向排名。

## 3. 高潜力待合并 Skills

**以下是值得优先跟踪的待合并项，不是合并时间预测。**由于 PR 评论数缺失，不能认定它们“评论活跃”；优先级依据是需求对应度、修复价值与近期更新。

| 候选 | 潜力依据 | 跟踪提醒 |
|---|---|---|
| **skill-creator 评估可靠性** · [#1298](https://github.com/anthropics/skills/pull/1298) | 与零触发率、并行假阴性反馈高度相关，影响所有依赖评估优化的 Skill 作者。 | OPEN；不能据摘要断言已覆盖所有相关 Issue。 |
| **webapp-testing 安全修复** · [#1980](https://github.com/anthropics/skills/pull/1980) | 涉及执行命令的安全边界，11-01 有更新，适合优先审查。 | OPEN；仍需验证对现有启动命令的兼容性。 |
| **docx 输出验证** · [#1792](https://github.com/anthropics/skills/pull/1792) | 直接消除“失败却报成功”的交付风险，11-01 有更新。 | OPEN；属于可靠性增强，而非新增 Skill。 |
| **xlsx 外部链接风险检测** · [#2019](https://github.com/anthropics/skills/pull/2019) | 补齐工作表级名称及别名导致的漏检，11-03 有更新。 | OPEN；价值在于提高检测覆盖率。 |
| **pyxel 游戏开发** · [#525](https://github.com/anthropics/skills/pull/525) | 新增方向中工作流较完整，覆盖开发到行为验证，11-01 仍有更新。 | OPEN；自 3 月持续待合并，近期更新不等于即将接纳。 |

## 4. Skills 生态洞察

**当前最集中的诉求不是“更多 Skill”，而是让 Skill 的来源可信、触发与评估准确、执行及产物可验证，并能在团队中低成本复用——安全分发 [#492](https://github.com/anthropics/skills/issues/492)、评估可靠性 [#556](https://github.com/anthropics/skills/issues/556) 和组织共享 [#228](https://github.com/anthropics/skills/issues/228) 是最鲜明的信号。**

---

# Claude Code 社区动态日报
**日期：2026-11-19**  
**数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)**

> 统计口径：过去 24 小时内更新的 Issues 共 50 条，本日报基于提供的 30 条展示记录分析；记录中的创建、更新日期均为 11 月 18 日。问题描述属于用户报告，不代表官方已确认。

## 1. 今日速览

过去 24 小时无新 Release，也无更新的 PR；值得优先关注的是 **权限拒绝规则疑似失效、Linux 崩溃和 Windows Grep 超时**等安全与可靠性报告。功能需求则指向更精细的 Agent 编排，包括按需连接 MCP、持久化上下文缓存，以及更清晰的子代理状态展示。

当前讨论仍处早期：所展示 Issues 单条最多仅 1 条评论，不能将风险优先级等同于社区热度。

## 2. 社区热点 Issues

以下按潜在影响及开发者相关性筛选，而非单纯按评论数排名。**这 10 条目前均为 OPEN**。

| Issue | 核心动态与重要性 | 社区反应 |
|---|---|---|
| **[权限拒绝规则疑似无法阻止 mod 写文件 #110979](https://github.com/anthropics/claude-code/issues/110979)** | 报告称，mod 通过 `$.tool.call` 发起的写入可绕过 `permissions.deny`，而 Agent 直接写入仍受限制。涉及权限边界；报告者称问题在 2.1.322 之后出现，2.1.327 仍存在。 | 0 评论、0 👍；带 `has repro`、`regression` 标签，宜优先验证。 |
| **[Linux 2.1.327 多次崩溃 #110986](https://github.com/anthropics/claude-code/issues/110986)** | 用户报告约 24 小时内多次 SIGSEGV，并提及 2.1.289 的 SIGABRT。直接影响交互式开发会话的连续性，但尚不能据此判断普遍性。 | 0 评论、0 👍；标记为可靠性问题。 |
| **[Windows Grep 输出完成后不退出 #110976](https://github.com/anthropics/claude-code/issues/110976)** | 原生 Windows 11 下，内嵌 ripgrep 据报已输出匹配项却不退出，最终触发 20 秒超时；涉及 2.1.326、2.1.327。可能拖慢代码检索及后续 Agent 工作流。 | 0 评论、0 👍；带 `has repro` 标签。 |
| **[重新登录后会话恢复范围异常 #110990](https://github.com/anthropics/claude-code/issues/110990)** | 报告称 `session_stale_relogin` 后使用了错误的恢复截止日期，导致约三个月会话未恢复。关乎历史工作可访问性，**现有数据不足以确认是否为永久丢失**。 | 0 评论、0 👍；暂无后续验证信息。 |
| **[MCP 唤醒后陷入重新登录状态 #110972](https://github.com/anthropics/claude-code/issues/110972)** | macOS Desktop 用户报告，令牌刷新时的 DNS 故障触发授权服务器回退，随后 issuer 校验失败并被视为终止性错误。对自建 OAuth MCP 网关的团队尤其相关。 | 0 评论、0 👍；提供了较详细的部署与故障路径。 |
| **[多工作流共享 WebSearch 预算且拒绝不报错 #110982](https://github.com/anthropics/claude-code/issues/110982)** | 报告称同一轮启动的多个 Workflow 共享 200 次搜索预算，耗尽后的拒绝未作为错误暴露。风险不仅是任务中断，还包括研究结果不完整却难以察觉。 | 0 评论、0 👍；带 `has repro` 标签。 |
| **[Remote Control 消息来源元数据回归 #110970](https://github.com/anthropics/claude-code/issues/110970)** | 用户称 `claude -p --cloud` 发送的消息自 11 月 18 日起缺少 `client_platform`，因而被挂起或降为 peer 消息。可能影响远程自动化的消息处理。 | 0 评论、0 👍；带 `has repro`、`regression` 标签。 |
| **[条件指令被当成无条件指令 #110980](https://github.com/anthropics/claude-code/issues/110980)** | Desktop Code 页用户报告，模型未检查“如果 X”条件便执行后续指令。涉及跨平台修改、例外条件等场景下的指令遵循可靠性。 | **1 评论**、0 👍；是展示记录中少数已有评论的报告之一。 |
| **[MCP 服务器按需连接 #110991](https://github.com/anthropics/claude-code/issues/110991)** | 建议允许服务器预先配置但不立即连接，由模型或 Skill 在需要时加载。目标是让会话仅保持必要连接，并按任务启用专业工具组。 | 0 评论、0 👍；属于功能提案，尚非已公布计划。 |
| **[持久化、命名的上下文缓存 #110993](https://github.com/anthropics/claude-code/issues/110993)** | 提议复用命名上下文缓存，启动已预加载领域知识的 Agent。对反复执行同类任务的多 Agent 系统具有潜在成本和启动效率价值。 | 0 评论、0 👍；尚未形成可见讨论。 |

## 3. 重要 PR 进展

**过去 24 小时无更新的 PR（0 条）**，因此本期没有可列出的重要 PR，也无法据此判断上述问题是否已有修复实现。

跟踪入口：[仓库 Pull Requests](https://github.com/anthropics/claude-code/pulls)

## 4. 功能需求趋势

以下为展示样本中的需求方向，不代表全部 50 条 Issues 的热度排序。

- **Agent 编排走向可复用、可中断。** 命名上下文缓存强调知识复用；SDK 用户则希望在当前轮次中注入新消息，而不是通过中断产生“工具调用被拒绝、停止”的结果。  
  相关：[上下文缓存 #110993](https://github.com/anthropics/claude-code/issues/110993)、[SDK 中断语义 #110977](https://github.com/anthropics/claude-code/issues/110977)。

- **工具连接与配置作用域需要更精细。** MCP 按需连接与 `/model` 默认仅影响当前会话的提案，都体现出用户希望减少全局副作用、按任务控制运行环境。  
  相关：[按需 MCP #110991](https://github.com/anthropics/claude-code/issues/110991)、[会话级模型选择 #110992](https://github.com/anthropics/claude-code/issues/110992)。

- **多 Agent 可观测性成为明确需求。** 用户希望查看子代理时，状态栏同步展示该子代理的模型、effort 和上下文占用，而非主会话数据。  
  相关：[子代理状态栏 #110988](https://github.com/anthropics/claude-code/issues/110988)。

- **桌面工作流需要持久化控制。** 有用户要求提供长期关闭自动创建 worktree 的设置；该条获 **1 个 👍**，但反馈量仍有限。  
  相关：[禁用自动 worktree #110975](https://github.com/anthropics/claude-code/issues/110975)。

- **集成与无障碍需求继续延伸。** 样本涉及 Office 加载项作为客户端，以及将纯文本会话日志、登录 URL 捕获等辅助方案内置化；后者已关闭，但没有提供关闭原因。  
  相关：[Office 客户端 #110983](https://github.com/anthropics/claude-code/issues/110983)、[无障碍支持 #110978](https://github.com/anthropics/claude-code/issues/110978)。

## 5. 开发者关注点

1. **安全边界必须一致且可验证。** 同一拒绝规则是否对 Agent 与 mod 调用同样生效，是本期最值得优先排查的问题；安全警告误报也会增加使用摩擦。  
   相关：[权限规则 #110979](https://github.com/anthropics/claude-code/issues/110979)、[安全警告误报 #110987](https://github.com/anthropics/claude-code/issues/110987)。

2. **“静默降级”比显式失败更难排查。** 搜索预算耗尽不报错、远程消息被降级处理，都可能让工作流表面继续运行，实际结果却发生偏差。  
   相关：[搜索预算 #110982](https://github.com/anthropics/claude-code/issues/110982)、[远程消息回归 #110970](https://github.com/anthropics/claude-code/issues/110970)。

3. **长会话和跨设备状态需要可靠延续。** 重新登录后的历史恢复，以及 iOS 归档未同步至 macOS，反映出会话生命周期管理仍有摩擦。  
   相关：[会话恢复 #110990](https://github.com/anthropics/claude-code/issues/110990)、[跨端归档 #110994](https://github.com/anthropics/claude-code/issues/110994)。

4. **模型输出仍需条件核验与事实校验。** 条件指令误解、RAG 修复中据报编造规则，提醒开发者不要把自然语言约束当作确定性的执行保障。  
   相关：[条件指令 #110980](https://github.com/anthropics/claude-code/issues/110980)、[规则编造报告 #110981](https://github.com/anthropics/claude-code/issues/110981)。

**今日建议：** 使用 mod 权限规则、Windows 原生检索或多 Agent 研究工作流的团队，可优先针对上述报告做小范围复现，并保留版本号、日志与最小用例；当前数据尚不足以支持普遍性故障或已修复的结论。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-19｜数据来源：[openai/codex](https://github.com/openai/codex)**

> 统计范围为所提供的过去 24 小时数据：50 条更新 Issue 中展示的 30 条，以及 25 条更新 PR 中展示的 20 条；具体更新时间均标注为 11 月 18 日。以下问题描述属于用户报告，未经独立验证；PR 的 `CLOSED` 状态不等于已合并，也不代表已随版本发布。

## 1. 今日速览

Codex 发布 **0.171.0-alpha.13** 预发布版本，但所附发布说明未披露具体变更。社区反馈主要集中在**审批与授权链路、桌面端可用性、额度与缓存透明度**，其中 Windows 沙箱可能导致系统账户锁定的报告值得优先排查。

代码侧的主要动向是 Guardian 审批证据管理、实时语音交接持久化，以及跨平台沙箱重构；这些方向与部分社区痛点相关，但目前不能确认对应问题已经修复。

## 2. 版本发布

### [rust-v0.171.0-alpha.13](https://github.com/openai/codex/releases/tag/rust-v0.171.0-alpha.13)
- **版本类型**：Alpha 预发布。
- **更新内容**：提供的 Release 正文仅包含版本号，没有功能、修复或兼容性说明。
- **开发建议**：不要直接将下文 PR 视为该版本的更新清单；生产环境升级前，应核对完整发布说明并验证关键工作流。

## 3. 社区热点 Issues

以下结合影响范围、故障严重性和讨论量筛选。**这 10 条均为 OPEN、👍 均为 0**；评论量仅为 0–3 条，尚不足以推断问题普遍性。

| Issue | 核心反馈与重要性 | 社区反应 |
|---|---|---|
| [#62301 Windows 沙箱启动 Chrome 可能锁定系统账户](https://github.com/openai/codex/issues/62301) | 用户称 Playwright 经 `require_escalated` 启动系统 Chrome 时，每次产生一次失败的 Windows 登录，最终触发账户锁定。影响可能超出 Codex 本身，应优先验证。 | 1 条评论；高潜在影响，但仍属单条报告。 |
| [#62295 Full access 下仍等待命令审批](https://github.com/openai/codex/issues/62295) | app-server 0.170.0 据报在禁用细粒度命令审批后，仍对强制删除命令发出审批请求；一次任务等待约 75 分钟。暴露客户端配置与执行端审批行为的一致性问题。 | 0 条评论；暂无讨论形成的结论。 |
| [#62294 Chat → Work 审批弹窗瞬间消失](https://github.com/openai/codex/issues/62294) | Windows 用户称弹窗出现不足一秒即消失，随后交接工具却报告“用户拒绝”。这会直接阻断任务，也容易误导故障定位。 | 0 条评论；需补充复现与状态追踪。 |
| [#62277 Windows 桌面端任务中反复卡死](https://github.com/openai/codex/issues/62277) | 26.1111.2228.0 据报出现 MoAppHang 和启动画面冻结；结束 app-server 进程仅能暂时恢复界面。影响长任务稳定性。 | 1 条评论；暂未显示持久解决方案。 |
| [#62300 ChatGPT 桌面工具持续返回 `-32000`](https://github.com/openai/codex/issues/62300) | 同一 macOS 客户端中，Work 对话的项目与会话读取失败，而 Codex 对话可正常读取。该对照有助于缩小工具路由或会话集成问题的排查范围。 | 2 条评论；报告提供了版本与最小复验信息。 |
| [#62312 `instructions` 缓存计数异常](https://github.com/openai/codex/issues/62312) | 报告称顶层 `instructions` 的 `cached_tokens` 持续为 0，但缓存诊断显示 `cache_hit`。涉及缓存行为、计量解释和成本预期，尚不能确定是缓存失效还是统计口径问题。 | 1 条评论；标题称 API Key 与 ChatGPT 登录均受影响，待验证。 |
| [#62280 Plus 用户质疑五小时额度](https://github.com/openai/codex/issues/62280) | 用户称标示为五小时的额度约一小时即耗尽。重点在于额度窗口、消耗速度与产品说明能否清晰区分，而非据此认定限额机制存在缺陷。 | 3 条评论，并列已展示 Issue 中最高。 |
| [#62272 阿根廷手机号验证被拒](https://github.com/openai/codex/issues/62272) | 用户称有效手机号在验证码发送前就被判无效。该问题阻断账户验证，体现地区号码格式兼容性的重要性。 | 3 条评论，并列样本最高；尚无修复信息。 |
| [#62268 上下文压缩后错误推断审计状态](https://github.com/openai/codex/issues/62268) | 用户通过受控重放报告：模型将摘要中缺失的审计证据推断为发布受阻，并建议升级处理。对长会话、审计与发布流程尤其敏感。 | 1 条评论；需要关注复现实验及证据边界。 |
| [#62258 自行缩小任务范围并忽略 AGENTS.md](https://github.com/openai/codex/issues/62258) | 用户称代理仅部署部分工作，且未遵守“先询问”规则。问题涉及任务完成度、仓库指令遵循与部署前确认。 | 1 条评论；目前不足以判断跨模型或跨版本普遍性。 |

## 4. 重要 PR 进展

**以下 10 条在数据中均为 `CLOSED`，均由 `copyberry[bot]` 提交；未提供合并标记，评论数为 `undefined`，因此不据此判断合并结果或讨论热度。**

| PR | 功能或修复内容 | 技术意义 |
|---|---|---|
| [#62317 将沙箱准备工作移入平台后端](https://github.com/openai/codex/pull/62317) | 由 `SandboxManager` 负责后端选择和共享准备，再交由 Linux、macOS Seatbelt、Windows token/MXC 后端执行平台相关处理。 | 明确跨平台职责边界，有助于维护沙箱与代理路由逻辑。 |
| [#62314 将授权证据限定在各代理分支内](https://github.com/openai/codex/pull/62314) | 区分子代理继承的祖先会话上下文与其自身授权证据。 | 避免将父代理的消息或批准错误归属给子代理。 |
| [#62310 同步审批使用 Guardian V3 消息板证据](https://github.com/openai/codex/pull/62310) | 处理最新用户消息尚未路由到审核者时，待执行动作已进入审批的问题。 | 降低遗漏撤销授权或重新授权信息的风险。 |
| [#62309 同步审批使用已附接的 Guardian 审核者](https://github.com/openai/codex/pull/62309) | 审核者补齐证据后，仍检查裁决是否符合准备前捕获的授权状态。 | 加强审批准备期间上下文变化的竞态处理。 |
| [#62276 独立于 MCP 刷新托管 Guardian 策略](https://github.com/openai/codex/pull/62276) | 允许后续轮次使用新审批策略，同时保留进行中 MCP 动作所属轮次的强制审核要求。 | 兼顾策略动态更新与在途操作的一致性。 |
| [#62302 通过响应项注入投递本地 MCP 消息板通知](https://github.com/openai/codex/pull/62302) | 在启用本地 MCP、Multi-Agent V2 和原生工具的特定配置下，使用 `inject_response_items` 投递通知。 | 调整多代理通信路径；不应理解为对所有 MCP 模式全面切换。 |
| [#62288 接受轮次输入前持久化实时交接](https://github.com/openai/codex/pull/62288) | 记录哪些语音转录帧已交给编码代理，以及由哪一轮接收。 | 为交接失败或重连后的恢复提供依据，区分已使用与未使用的语音。 |
| [#62299 通话结束后保留待处理语音](https://github.com/openai/codex/pull/62299) | 在启用实时帧历史的 V3 通话场景下，保留尚未进入 Codex 轮次的已完成语音。 | 减少通话断开时上下文丢失的可能性。 |
| [#62222 设置和登录时支持选择 Bedrock Runtime](https://github.com/openai/codex/pull/62222) | 为 Bedrock 设置流程增加可选 `providerId`，避免始终选择 Mantle。 | 改善 AWS 接入配置，减少额外手工设置。 |
| [#62209 异步问题的长选项支持分页](https://github.com/openai/codex/pull/62209) | 支持用 `PageUp`、`PageDown` 浏览超出 TUI 答案区域的换行选项。 | 解决小终端中选项无法完整阅读、影响提交的问题。 |

## 5. 功能需求趋势

基于已展示的 30 条 Issue，可归纳出以下方向；其中多数是缺陷反馈衍生的需求，而非显式功能提案。

- **审批行为需要可预测、可解释、可恢复**  
  用户不仅关心是否获得权限，还关心“为何拒绝、依据哪次授权、下一步如何处理”。代表反馈：[审批配置不生效 #62295](https://github.com/openai/codex/issues/62295)、[迁移授权被视为不可信历史 #62281](https://github.com/openai/codex/issues/62281)、[URL 策略拒绝缺少恢复路径 #62305](https://github.com/openai/codex/issues/62305)。

- **桌面端稳定性与跨模式一致性优先级高**  
  任务发送、未读消息、工具调用与模式切换均出现阻断性报告，说明基础工作流仍是重要关注点。代表反馈：[Work 无法发送任务 #62315](https://github.com/openai/codex/issues/62315)、[macOS 未读聊天导致 UI 冻结 #62306](https://github.com/openai/codex/issues/62306)。

- **更贴近源码的浏览器开发体验**  
  有明确提案希望浏览器元素标注携带组件名与源码位置，从视觉反馈直接定位实现。与此同时，浏览器内复制功能仍有权限相关故障。参见：[源码定位标注 #62298](https://github.com/openai/codex/issues/62298)、[复制按钮失败 #62311](https://github.com/openai/codex/issues/62311)。

- **模型、会话与额度信息需要透明且稳定**  
  登录后模型消失、第三方模型会话标题生成失败，以及缓存计数争议，均影响开发者配置和成本判断。参见：[模型选择器异常 #62313](https://github.com/openai/codex/issues/62313)、[自定义模型标题生成失败 #62307](https://github.com/openai/codex/issues/62307)、[缓存计数 #62312](https://github.com/openai/codex/issues/62312)。

- **会话导航和长文本可读性仍有改进空间**  
  用户希望 Priority 视图保留置顶会话，并改善侧栏对比度、移动端长文本显示。参见：[置顶会话可见性 #62297](https://github.com/openai/codex/issues/62297)、[侧栏文字过浅 #62290](https://github.com/openai/codex/issues/62290)、[iOS 文本重叠 #62264](https://github.com/openai/codex/issues/62264)。

## 6. 开发者关注点

1. **避免任务“无声等待”，并明确失败责任。**  
   审批等待、CLI 静默停滞和弹窗自动消失，都需要更明确的状态、超时与诊断信息。相关：[静默停滞 #62293](https://github.com/openai/codex/issues/62293)、[审批长时间等待 #62295](https://github.com/openai/codex/issues/62295)。

2. **安全控制应提供清晰解释与支持的恢复流程。**  
   多条报告认为正常工作被安全机制拦截，但这些反馈本身不能证明判定错误。开发者需要知道限制类别、可补充的信息以及可行替代路径。相关：[WordPress 请求被拦截 #62304](https://github.com/openai/codex/issues/62304)、[CLI 内容不可显示 #62255](https://github.com/openai/codex/issues/62255)。

3. **长任务需要保留证据边界，而非补全未知事实。**  
   上下文压缩后应明确区分“缺少证据”与“已确认受阻”；执行和部署则应持续遵循仓库规则及用户确认要求。相关：[压缩后错误推断 #62268](https://github.com/openai/codex/issues/62268)、[任务范围与指令遵循 #62258](https://github.com/openai/codex/issues/62258)。

4. **系统级副作用比一般界面缺陷更需优先处理。**  
   涉及账户锁定、沙箱网络和权限升级的工作流，建议先在隔离环境验证，并保留系统日志；不宜仅为绕过故障而扩大权限。相关：[Windows 登录失败与锁定 #62301](https://github.com/openai/codex/issues/62301)、[macOS Git DNS 与审批受阻 #62291](https://github.com/openai/codex/issues/62291)。

**总体判断：** 本期样本最突出的诉求是让代理执行链路更可靠、授权依据更清晰、失败状态更容易诊断。Guardian 与沙箱相关 PR 值得继续跟踪，但其是否合并、何时发布，以及能否解决上述用户报告，仍需后续验证。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-11-19**  
**仓库：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)**

## 1. 今日速览

今日动态主要围绕 **长会话稳定性与 ACP 集成体验**：一条崩溃报告指出，约 20 小时、累计处理 1.824 亿 tokens 的交互会话最终触发 V8 堆内存不足。PR 方面，贡献者正在推进 ACP token 用量统计、脱敏处理性能及 DevTools 可访问性改进；另有一项 ACP 回合中途引导 PR 已关闭，但现有数据无法确认是否合并。

> 数据范围：所提供的过去 24 小时更新记录包含 **1 条 Issue、4 条 PR**，无新 Release。以下全部列出，不足 10 条的部分不作补充；记录中的更新时间均为 2026-11-18。

## 2. 社区热点 Issues

### [#30352：超长交互会话触发 JavaScript 堆内存不足](https://github.com/google-gemini/gemini-cli/issues/30352)
**状态：OPEN · `status/need-triage`**

- **问题概况**：报告者运行交互会话约 **20.03 小时**，累计处理 **182.4 million tokens** 后，进程出现 `Ineffective mark-compacts near heap limit` 致命错误并崩溃。
- **为何重要**：暴露了长时间运行场景下的内存稳定性风险，对持续编程、长任务执行等工作流尤其值得关注。不过，现有摘要不足以确定是内存泄漏、会话数据累积，还是其他原因；累计 token 数也不等于单次上下文长度。
- **社区反应**：目前 **2 条评论、0 个 👍**，仍待分诊。尚不能据此判断影响范围，也没有足够信息确认修复方案。

## 3. 重要 PR 进展

### [#30354：支持 ACP 回合中途引导 `_session/steering`](https://github.com/google-gemini/gemini-cli/pull/30354)
**状态：CLOSED · `size/l`**

- **改动方向**：为 ACP 模式增加回合执行中的引导能力。此前，外部编辑器或 Agent 编排器只能等待整个多工具回合结束，或中止当前回合。
- **开发价值**：旨在让宿主应用更灵活地调整正在执行的任务，减少“等待或取消”二选一的限制。
- **进展提醒**：关联 #30048；**关闭不等于合并**，所给数据未说明最终处理结果。

### [#30353：统一 ACP token 用量追踪与配额元数据](https://github.com/google-gemini/gemini-cli/pull/30353)
**状态：OPEN · `area/non-interactive` · `size/l`**

- **改动方向**：处理 ACP 模式下的 token 统计差异，并规范配额相关元数据。
- **已知修复重点**：取消或提前中止回合时，保留 `PromptResponse.usage` 及相关 `_meta`，避免客户端只收到 `{ stopReason: 'cancelled' }` 而丢失用量信息。
- **开发价值**：有助于编辑器与编排系统准确追踪已消耗的 tokens。关联 #24280、#27985；目前仍待合并。

### [#30349：优化工具参数与错误消息脱敏热路径](https://github.com/google-gemini/gemini-cli/pull/30349)
**状态：OPEN · `size/m`**

- **改动方向**：在 `agent-sanitization-utils.ts` 模块级预编译正则表达式，并预计算归一化的敏感键匹配模式。
- **开发价值**：减少高频脱敏路径中的重复计算，面向工具调用及错误处理流程降低开销。
- **进展提醒**：摘要未提供基准测试结果，实际性能收益仍待验证。

### [#30348：完善 DevTools 复制反馈与图标按钮可访问性](https://github.com/google-gemini/gemini-cli/pull/30348)
**状态：OPEN · `size/m`**

- **改动方向**：复制 payload／response JSON 后，增加勾选图标、绿色状态及“Copied to clipboard”提示；为纯图标按钮补充明确的 `aria-label`。
- **开发价值**：让复制操作结果更清晰，同时改善辅助技术对按钮用途的识别。

**社区反馈说明**：以上 PR 均为 0 个 👍，评论数数据缺失，因此无法据此评估讨论热度或审查进展。

## 4. 功能需求趋势

当前仅有一条 Issue，不足以判断社区整体“最关注”的方向。结合本次 PR，可以观察到以下信号：

| 方向 | 观察与判断 | 关联条目 |
|---|---|---|
| **长会话稳定性** | 唯一新增问题集中在超长运行后的内存耗尽，提示需要进一步排查内存增长与会话生命周期管理。 | [#30352](https://github.com/google-gemini/gemini-cli/issues/30352) |
| **ACP 宿主集成** | 中途引导与取消后的用量保留，均面向编辑器、Agent 编排器对执行过程的控制与观测需求。 | [#30354](https://github.com/google-gemini/gemini-cli/pull/30354)、[#30353](https://github.com/google-gemini/gemini-cli/pull/30353) |
| **性能与调试体验** | 改进覆盖脱敏热路径、复制反馈和可访问性，体现对基础质量的持续打磨，而非新增模型能力。 | [#30349](https://github.com/google-gemini/gemini-cli/pull/30349)、[#30348](https://github.com/google-gemini/gemini-cli/pull/30348) |

## 5. 开发者关注点

- **长任务能否可靠持续运行**：超长会话崩溃是本次最直接的用户痛点，后续重点应关注复现条件、内存增长轨迹及维护者分诊结论。[#30352](https://github.com/google-gemini/gemini-cli/issues/30352)
- **取消任务后，用量统计是否完整**：ACP 客户端需要保留已发生的消耗记录，避免把“任务取消”误当成“没有消耗”。[#30353](https://github.com/google-gemini/gemini-cli/pull/30353)
- **执行中的 Agent 是否可调整**：中途引导体现了更细粒度交互控制的需求，但相关 PR 已关闭，能力是否落地仍需核实。[#30354](https://github.com/google-gemini/gemini-cli/pull/30354)
- **高频路径与调试细节是否足够顺畅**：脱敏开销、复制成功提示及按钮标签，分别影响运行效率、操作确定性与可访问性。[#30349](https://github.com/google-gemini/gemini-cli/pull/30349)、[#30348](https://github.com/google-gemini/gemini-cli/pull/30348)

**总体判断**：本次样本更偏向稳定性、可观测性与交互细节改进，尚不足以认定为社区高频需求或整体路线变化。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-19**  
数据来源：[github/copilot-cli](https://github.com/github/copilot-cli)｜范围：所提供的过去 24 小时数据

## 1. 今日速览

GitHub Copilot CLI 发布 **v1.0.114**，但发布说明仅写明“Fixes and changes”，无法据此确认具体修复项。社区新增关注集中在会话持久化、macOS 沙箱网络限制、后台子代理通知延迟，以及 Windows 下与 VS Code 同时运行时的响应问题。

本期共有 **7 条更新的 Issue，均处于 OPEN / triage 状态**；没有 PR 更新记录。以下列出全部 7 条 Issue，不补足不存在的条目。

## 2. 版本发布

### [v1.0.114](https://github.com/github/copilot-cli/releases/tag/v1.0.114)
- **发布日期**：2026-11-18
- **发布说明**：仅提供“Fixes and changes”，未列出具体修复或功能变化。
- **升级关注**：当前资料无法确认下述 Issue 是否已被该版本修复，建议针对受影响场景单独验证。

## 3. 社区热点 Issues

> 当前互动量较低：仅两条 Issue 有评论，所有条目均为 0 个 👍。以下按潜在影响与开发工作流相关性排序，不将单个反馈视为普遍问题。

### 1. ACP 零轮次会话无法在客户端重启后恢复
**[Issue #5501](https://github.com/github/copilot-cli/issues/5501)**｜2 条评论，0 👍

- **问题**：据报告，在 Zed 中将 CLI 作为 ACP 外部代理使用时，空会话或仅执行斜杠命令的会话不会写入 `events.jsonl`；重启客户端后，`session/load` 返回 `-32002`。
- **为什么重要**：影响 IDE 集成中的会话恢复可靠性，暴露出“已建立会话但尚无普通交互”的生命周期边界问题。
- **社区反应**：本期评论数最多，但现有摘要未提供讨论结论或维护者确认。

### 2. macOS 沙箱阻断测试连接自身启动的本地服务
**[Issue #5507](https://github.com/github/copilot-cli/issues/5507)**｜1 条评论，0 👍

- **问题**：报告称沙箱的主机过滤限制，使后端集成测试无法连接由测试自身启动的本地服务器。
- **为什么重要**：影响“启动服务—发起请求—验证响应”的常见测试闭环，反映安全隔离与开发可用性之间的取舍。
- **社区反应**：已有 1 条评论，尚无已确认解决方案。

### 3. Windows 下与 VS Code 同时运行时，CLI 可能长时间无响应
**[Issue #5506](https://github.com/github/copilot-cli/issues/5506)**｜0 条评论，0 👍

- **问题**：用户在 Windows Terminal / PowerShell、CLI 1.0.113 环境中报告，VS Code 打开时 CLI 可无响应数分钟，关闭 VS Code 后恢复。
- **为什么重要**：若可稳定复现，将直接影响编辑器与终端并行工作的体验。
- **社区反应**：暂无评论；VS Code 版本及扩展信息未知，现阶段不能确定根因或影响范围。

### 4. 后台子代理完成通知被延迟约 60 秒
**[Issue #5508](https://github.com/github/copilot-cli/issues/5508)**｜0 条评论，0 👍

- **问题**：据报告，多个后台任务并行运行时，已完成子代理的 `agent_idle` 通知可能被延迟 60 秒，即使主代理已空闲。
- **为什么重要**：主代理依赖通知后调用 `read_agent` 获取结果，这类延迟会拉长多代理工作流的实际完成时间。
- **社区反应**：暂无评论，仍待分诊与复现。

### 5. BYOK 模型无法在 `/model` 中调整推理强度
**[Issue #5504](https://github.com/github/copilot-cli/issues/5504)**｜0 条评论，0 👍

- **问题**：通过 `providers.json` 配置的模型，即使声明 `capabilities.supports.reasoningEffort: true`，`/model` 的 Reasoning 列仍显示 `—`，无法调整推理强度。
- **为什么重要**：影响自定义模型能力与 CLI 配置界面的一致性，也限制开发者控制推理成本、延迟和深度。
- **社区反应**：暂无评论，尚无修复信息。

### 6. 希望无需打开 Sessions 侧栏即可关闭当前会话
**[Issue #5509](https://github.com/github/copilot-cli/issues/5509)**｜0 条评论，0 👍

- **需求**：用户指出，在受影响版本 1.0.112 中，`/exit` 通常退出整个 CLI，希望提供直接关闭当前会话的独立操作。
- **为什么重要**：需要清晰区分“结束会话”和“退出应用”，减少多会话操作中的中断与误操作。
- **社区反应**：暂无评论；该条目引用了此前相关讨论，但本期未提供其具体内容。

### 7. 允许扩展渲染对话中的围栏代码块
**[Issue #5499](https://github.com/github/copilot-cli/issues/5499)**｜0 条评论，0 👍

- **需求**：扩展作者希望接管部分 fenced code blocks 的渲染，例如将图表类内容转换为彩色终端图形。
- **为什么重要**：有助于扩展生态提供更丰富的终端展示能力，改善图表和结构化输出的可读性。
- **社区反应**：暂无评论，目前属于扩展能力提案。

## 4. 重要 PR 进展

过去 24 小时的所提供数据中，**没有更新的 PR**，因此本期无可列出的功能或修复进展，也无法建立上述 Issue 与具体代码变更的关联。

[查看仓库 Pull Requests](https://github.com/github/copilot-cli/pulls)

## 5. 功能需求趋势

基于这 7 条 Issue，可归纳出以下方向；样本较小，不代表长期热度排名。

| 方向 | 本期信号 | 相关链接 |
|---|---|---|
| **IDE 集成与运行稳定性** | ACP 会话恢复失败，以及与 VS Code 并行运行时的响应问题 | [#5501](https://github.com/github/copilot-cli/issues/5501)、[#5506](https://github.com/github/copilot-cli/issues/5506) |
| **代理工作流效率** | 后台任务完成通知的及时性与多代理协作延迟 | [#5508](https://github.com/github/copilot-cli/issues/5508) |
| **安全沙箱的开发适配** | 在隔离环境中支持常见本地服务集成测试 | [#5507](https://github.com/github/copilot-cli/issues/5507) |
| **模型配置能力一致性** | BYOK 模型的推理能力声明应映射到交互界面 | [#5504](https://github.com/github/copilot-cli/issues/5504) |
| **交互与扩展能力** | 独立关闭会话、扩展自定义代码块渲染 | [#5509](https://github.com/github/copilot-cli/issues/5509)、[#5499](https://github.com/github/copilot-cli/issues/5499) |

## 6. 开发者关注点

- **工作流可恢复**：会话即使没有普通对话，也应具备一致的保存与加载行为。([#5501](https://github.com/github/copilot-cli/issues/5501))
- **响应延迟可解释**：CLI 长时间无响应、代理完成后通知滞后，都会增加等待与排障成本；两者是否存在共同原因尚无证据。([#5506](https://github.com/github/copilot-cli/issues/5506)、[#5508](https://github.com/github/copilot-cli/issues/5508))
- **自动化测试不被环境阻断**：沙箱策略需要兼顾安全约束与本地后端测试需求。([#5507](https://github.com/github/copilot-cli/issues/5507))
- **配置与操作语义一致**：模型声明的能力应能被操作，关闭会话与退出应用应明确区分。([#5504](https://github.com/github/copilot-cli/issues/5504)、[#5509](https://github.com/github/copilot-cli/issues/5509))
- **终端输出可扩展**：扩展开发者希望获得更丰富的渲染接口，而非仅展示原始文本。([#5499](https://github.com/github/copilot-cli/issues/5499))

**总体判断**：本期反馈更多围绕现有工作流的可靠性和可控性，而非全新功能。后续值得重点跟踪相关问题的复现结论、维护者分诊，以及是否进入明确的修复版本。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-11-19

## 今日速览

过去 24 小时无新版本发布，社区讨论主要围绕 **v2 稳定性、模型接入与权限边界**：Gemini 4 Argon 请求失败、后台服务反复重启，以及 Windows Desktop 工具调用异常是值得关注的问题。修复侧已出现服务配置隔离、HTTP 超时覆盖、ACP 兼容性等 PR，同时推进消息收藏、MCP 服务标识配置等体验改进。

> **数据口径**：本期依据提供的 30 条 Issue、20 条 PR 摘要筛选，更新记录均标注为 11 月 18 日。评论数仅用于衡量当前讨论量；PR 评论字段缺失，不作热度比较。`CLOSED` 不等于已合并、已修复或已发布。

## 社区热点 Issues

### 1. Gemini 4 Argon 在 OpenCode Go 中返回 400
[Issue #64628](https://github.com/anomalyco/opencode/issues/64628) · **OPEN｜6 条评论**

用户报告在 2.3.2 中调用 Gemini 4 Argon 时，收到“不支持以 model turn 结束的请求”错误，直接阻断模型使用。这是展示样本中评论最多的问题，值得跟进请求格式与模型接口兼容性；当前摘要未提供确认结论。

### 2. Android/Termux 长会话后台服务反复重启
[Issue #64655](https://github.com/anomalyco/opencode/issues/64655) · **OPEN／分诊中｜5 条评论**

Debian PRoot 环境下，`serve --service` 长时间运行后出现 inotify／文件监听相关错误并重复重启。问题影响移动端无头部署与长任务连续性，讨论量较高，但尚不能据此推广到所有 Linux 环境。

### 3. 启动阶段 503 被误报为“数据迁移失败”
[Issue #64621](https://github.com/anomalyco/opencode/issues/64621) · **OPEN／模拟复现｜5 条评论**

报告称，TUI 将迁移状态轮询中的非 2xx 响应直接视作迁移失败，即使数据库已完成迁移也会弹出红色提示。它会把短暂服务不可用包装成数据问题，增加用户误判和排障成本。

### 4. 项目加载重复订阅根目录与祖先目录监听
[Issue #64674](https://github.com/anomalyco/opencode/issues/64674) · **OPEN｜3 条评论**

每次加载项目或 worktree，都可能再次订阅 `/`、主目录祖先及配置目录的监听。该报告提示监听范围和订阅去重需要审视；它与服务资源压力方向相关，但现有数据不足以认定其是重启问题的根因。

### 5. Desktop 复用不同配置环境的服务，导致插件丢失
[Issue #64661](https://github.com/anomalyco/opencode/issues/64661) · **OPEN／已复现｜3 条评论**

不同 `XDG_CONFIG_HOME` 的安装环境可能复用同一后台服务，进而读取另一套插件配置。对多安装、多环境用户影响直接；已有对应修复 [PR #64677](https://github.com/anomalyco/opencode/pull/64677)，目前仍开放。

### 6. `grep` 可能展示受 `read` 规则限制的文件内容
[Issue #64623](https://github.com/anomalyco/opencode/issues/64623) · **OPEN／待关闭｜3 条评论**

报告指出，`grep` 按搜索模式检查权限，却未逐文件应用 `read` 规则，可能输出 `.env` 等文件中的匹配行。重要性在于工具间权限边界是否一致；虽然标签为功能请求，实际涉及敏感信息访问控制，尚不宜视为已确认漏洞。

### 7. “Always allow”可能留下过宽的 `sudo *` 授权
[Issue #64627](https://github.com/anomalyco/opencode/issues/64627) · **OPEN｜2 条评论**

报告描述复合命令授权、宽泛前缀与跨会话持续生效的组合风险，并明确称其是多个既有问题的叠加。讨论量不高，但权限影响较大，值得优先审视授权范围及有效期。

### 8. Windows Desktop 2.3.2 工具调用不执行
[Issue #64676](https://github.com/anomalyco/opencode/issues/64676) · **OPEN｜2 条评论**

用户报告代理输出重复标记、触发输出截断，同时渲染器抛出 `Maximum call stack size exceeded`。该问题直接阻断代理执行工作流，需要进一步确认模型输出、渲染异常与工具执行之间的因果关系。

### 9. 会话导入后模型 Provider 被改写
[Issue #64689](https://github.com/anomalyco/opencode/issues/64689) · **OPEN｜1 条评论**

导出记录中的 `opencode-go` 被重新绑定为按量付费的 `opencode`，随后请求报余额不足。问题跨越会话迁移、模型身份与计费路径；当前证据是请求失败，不能据此认定发生了额外扣费。

### 10. 启用模型时缺少认证与费用提示
[Issue #64702](https://github.com/anomalyco/opencode/issues/64702) · **OPEN／分诊中｜3 条评论**

用户反馈，启用模型未明确说明所需 API Key 和付费条件，部分模型启用后也未进入可用列表。这反映模型发现、认证配置和实际可调用状态之间缺乏清晰衔接，容易增加新用户接入成本。

## 重要 PR 进展

以下 10 项均为 **OPEN**，代表拟议改动，不代表已经进入发布版本。

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| [#64677](https://github.com/anomalyco/opencode/pull/64677) 服务目录隔离 | 记录服务启动时的配置与数据目录，拒绝跨目录环境复用服务 | 对应 #64661，避免插件及配置串用 |
| [#64692](https://github.com/anomalyco/opencode/pull/64692) 全面覆盖 HTTP 超时 | 将超时机制扩展至媒体、嵌入等请求，并传递 Provider／配置中的超时设置 | 减少非聊天请求无限等待的风险 |
| [#64706](https://github.com/anomalyco/opencode/pull/64706) 保留 WebSocket 连续调用 | 修复自定义工具调用后丢弃 `previous_response_id`、重发完整输入的问题 | 改善 Code Mode 等工具链的传输连续性 |
| [#64710](https://github.com/anomalyco/opencode/pull/64710) Code Mode 二进制内存语义 | 为 TypedArray 与 ArrayBuffer 提供共享内存行为，修复 `.buffer` 等问题 | 提升二进制数据处理兼容性 |
| [#64696](https://github.com/anomalyco/opencode/pull/64696) 非阻塞拒绝 FIFO 附件 | 在 POSIX 上以非阻塞方式打开附件，使无写入者的 FIFO 能进入特殊文件拒绝逻辑 | 对应 #64693，避免 CLI 挂起；另有同题 [#64709](https://github.com/anomalyco/opencode/pull/64709) |
| [#64701](https://github.com/anomalyco/opencode/pull/64701) 修正前端测试加载条件 | 使用 browser 条件，避免测试误加载 Solid 服务端构建 | 对应 #64647，让响应式测试真正覆盖客户端行为 |
| [#64690](https://github.com/anomalyco/opencode/pull/64690) 保留无 MIME 类型的 ACP Blob | 缺少可选 `mimeType` 时采用 `application/octet-stream`，而非丢弃资源 | 对应 #64687，改善协议兼容性 |
| [#64688](https://github.com/anomalyco/opencode/pull/64688) Windows ACP 传输修复 | SDK 调用改用 `node:http`，绕开长连接 SSE 下 Bun `fetch` 挂起的问题 | 对应已关闭的 #64686，但该 PR 仍开放 |
| [#64708](https://github.com/anomalyco/opencode/pull/64708) MCP 服务可配置标题与 ID | 不再只能用配置键作为服务展示名称 | 改善多 MCP 服务场景下的辨识与管理 |
| [#64680](https://github.com/anomalyco/opencode/pull/64680) 消息收藏 | 为用户消息和助手回复提供收藏入口 | 方便重新查找关键提示词、答案与工作上下文 |

## 功能需求趋势

以下为已展示 Issue 样本中的主要方向，并非全部 50 条 Issue 的完整统计。

- **权限审批更智能，也更可控。** 社区既希望引入 Copilot 的辅助审批，也希望通过 Face ID 批准远程特权操作；与此同时，宽泛授权和工具间权限不一致说明安全边界仍是基础要求。参见 [#64656](https://github.com/anomalyco/opencode/issues/64656)、[#64675](https://github.com/anomalyco/opencode/issues/64675)、[#64627](https://github.com/anomalyco/opencode/issues/64627)。

- **模型接入需要端到端透明。** 关注点不仅是新增模型，还包括认证要求、费用说明、Provider 身份保持，以及调用格式兼容。参见 [#64702](https://github.com/anomalyco/opencode/issues/64702)、[#64689](https://github.com/anomalyco/opencode/issues/64689)、[#64628](https://github.com/anomalyco/opencode/issues/64628)。

- **远程与移动工作流走向精细化。** 自定义服务请求头、移动端审批和 Android 后台运行需求，表明社区希望覆盖“远程主机执行、不同终端控制”的使用方式。参见 [#64673](https://github.com/anomalyco/opencode/issues/64673)、[#64675](https://github.com/anomalyco/opencode/issues/64675)、[#64655](https://github.com/anomalyco/opencode/issues/64655)。

- **代理工作流需要更强的质量闭环。** 双模型自动审查—修复是明确的新需求；模型不遵循指令、任务完成后 Todo 未同步，则反映用户对执行可靠性和状态准确性的期待。参见 [#64678](https://github.com/anomalyco/opencode/issues/64678)、[#64695](https://github.com/anomalyco/opencode/issues/64695)、[#64699](https://github.com/anomalyco/opencode/issues/64699)。

- **TUI 可用性与扩展能力持续受到关注。** 当前需求覆盖会话定位、终端超链接，以及推理块图片渲染和插件挂钩。参见 [#64704](https://github.com/anomalyco/opencode/issues/64704)、[#64683](https://github.com/anomalyco/opencode/issues/64683)、[#64682](https://github.com/anomalyco/opencode/issues/64682)。

## 开发者关注点

1. **先解决“能否稳定执行”，再谈体验增强。** 服务重启、工具不执行及附件阻塞均会中断工作流，是本期最直接的生产力痛点。参见 [#64655](https://github.com/anomalyco/opencode/issues/64655)、[#64676](https://github.com/anomalyco/opencode/issues/64676)、[#64693](https://github.com/anomalyco/opencode/issues/64693)。

2. **错误提示应准确反映故障层级。** 临时 503 被描述为迁移失败、模型已启用却不可用，都会把排障引向错误方向。参见 [#64621](https://github.com/anomalyco/opencode/issues/64621)、[#64702](https://github.com/anomalyco/opencode/issues/64702)。

3. **多环境配置必须隔离，迁移必须保留身份。** 后台服务复用与会话导入不应悄然改变插件来源或 Provider。参见 [#64661](https://github.com/anomalyco/opencode/issues/64661)、[#64689](https://github.com/anomalyco/opencode/issues/64689)。

4. **协议兼容与测试可信度需要同步加强。** ACP 可选字段被丢弃、旧 MCP SDK 拒绝新能力字段，以及前端测试误用服务端构建，说明边界场景和兼容性验证值得补强。参见 [#64687](https://github.com/anomalyco/opencode/issues/64687)、[#64698](https://github.com/anomalyco/opencode/issues/64698)、[#64647](https://github.com/anomalyco/opencode/issues/64647)。

**后续重点：** 跟踪权限边界问题的维护者结论，以及服务隔离、超时和 ACP 修复 PR 的合并与发布状态；现阶段不应把“已有修复提案”视作“用户版本已解决”。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-19

> 基于所提供的过去 24 小时数据整理；记录中的创建、更新时间均为 11 月 18 日。数据来源标注为 `badlogic/pi-mono`，具体条目指向 `earendil-works/pi`，以下链接按条目指向生成。**Closed 不代表已修复或已合并。**

## 一、今日速览

今日动态集中在**模型接口兼容性、终端交互稳定性，以及扩展对 Agent 执行流程的控制**。11 条更新 Issue 中，9 条已关闭、2 条仍开放；会话树历史重复和模型列表热重载问题均已有对应的开放 PR。过去 24 小时没有新版本发布，6 条更新 PR 中有 3 条仍在推进。

## 二、社区热点 Issues

以下从 11 条 Issue 中选取 10 条。当前讨论规模较小：所选条目均无 👍，评论为 0–3 条，因此关注度主要依据技术影响，而非热度排名。

| Issue | 核心问题与重要性 | 社区反应与状态 |
|---|---|---|
| [#12282 本地模型图像输入能力未被识别](https://github.com/earendil-works/pi/issues/12282) | llama.cpp 已在 `architecture.input_modalities` 中声明支持图像，但 Pi 仍将模型注册为纯文本，导致 `models.classify()` 无法接收 PNG。影响本地多模态模型的可用性。 | **已关闭，3 条评论**，是本批 Issue 中讨论最多的一条；摘要未说明关闭原因。 |
| [#12289 xAI 容量错误未触发重试](https://github.com/earendil-works/pi/issues/12289) | 现有错误匹配覆盖 `model is at capacity`，却漏掉包含 `currently` 的变体，导致开启重试后仍直接结束当前轮次。暴露了依赖错误文案匹配的脆弱性。 | **已关闭，2 条评论**；是否已有修复需进一步核实。 |
| [#12285 SQLite 任务更新写入过多列](https://github.com/earendil-works/pi/issues/12285) | 任务状态转换时，upsert 会更新全部六列；提议只更新实际变化的列，以减少冗余写入。对频繁状态转换的任务存储值得关注。 | **已关闭，2 条评论**；未提供性能测试或采纳结论。 |
| [#12291 为提示词增加来源标识](https://github.com/earendil-works/pi/issues/12291) | 建议为 `AgentSession.prompt()` 和 `pi.sendUserMessage()` 增加不透明的 `origin`，并传入 `input` 事件、保存在用户消息中，便于宿主追踪消息来源。 | **已关闭，1 条评论**；属于扩展与宿主集成能力诉求。 |
| [#12290 解耦消息写入与 Agent 执行](https://github.com/earendil-works/pi/issues/12290) | 希望既能将消息加入上下文而不启动循环，也能在不添加消息的情况下启动循环。可支持上下文预装载、批量输入和自定义执行调度。 | **已关闭，1 条评论**；尚不能据此判断接口是否会调整。 |
| [#12288 bash 工具结束事件缺少退出码](https://github.com/earendil-works/pi/issues/12288) | `tool_execution_end` 只提供 `isError`，没有具体退出码，限制了外部程序对命令结果的精细判断和自动化处理。 | **已关闭，1 条评论**；报告涉及 v1.5.2，并在 Ubuntu、macOS 检查。 |
| [#12287 内置支持 0G Private Computer](https://github.com/earendil-works/pi/issues/12287) | 请求内置支持其 OpenAI 兼容接口，通过一个 API Key 访问多种模型，其中部分模型在 TEE 中运行。体现统一模型入口及隐私计算方向的需求。 | **已关闭，1 条评论**；数据未表明已接入。 |
| [#12286 Copilot 工具可选参数被自动填充](https://github.com/earendil-works/pi/issues/12286) | 报告称，`openai-responses` 未发送 `strict` 时，Copilot 端会以类似严格模式解释 schema，填充本应缺省的参数。可能改变工具调用语义。 | **已关闭，1 条评论**；报告版本为 `pi-ai` 1.3.0，不能直接推断当前版本仍受影响。 |
| [#12279 会话树导航导致输入历史重复](https://github.com/earendil-works/pi/issues/12279) | 每次切换到某个分支，其提示词都会再次加入上箭头历史，频繁回溯后产生大量重复记录，影响日常输入效率。 | **开放，0 条评论**；已有对应 [PR #12280](https://github.com/earendil-works/pi/pull/12280)。 |
| [#12277 `/reload` 未刷新 scoped models](https://github.com/earendil-works/pi/issues/12277) | 修改 `enabledModels` 后执行 `/reload`，作用域模型列表仍旧不变，削弱热重载的可靠性。 | **开放，0 条评论**，带 `bug` 标签；已有对应 [PR #12278](https://github.com/earendil-works/pi/pull/12278)。 |

## 三、重要 PR 进展

**本次数据仅包含 6 条 PR，以下全部列出，不补足至 10 条。** PR 评论数未提供，无法据此评估评审活跃度。

### 正在推进：3 条开放 PR

1. **[PR #12283：外部 SIGTSTP 与 Ctrl+Z 统一处理](https://github.com/earendil-works/pi/pull/12283)**  
   作者：haoqixu。修复通过 `kill -TSTP <pi-pid>` 挂起 Pi 时未恢复终端的问题，让外部信号走与 Ctrl+Z 相同的处理路径。关联 #12272，重点是终端状态恢复与作业控制的一致性。

2. **[PR #12280：会话树导航不再重复写入输入历史](https://github.com/earendil-works/pi/pull/12280)**  
   作者：acmerfight。针对 `/tree` 和扩展 `navigateTree` 两条路径重新渲染时重复填充历史的问题，避免导航行为污染上箭头历史。对应 Issue #12279。

3. **[PR #12278：交互式重载刷新作用域模型列表](https://github.com/earendil-works/pi/pull/12278)**  
   作者：haoqixu。让 `/reload` 重新加载 scoped models，使 `enabledModels` 的变化无需重启即可生效；启动时传入的 `--models` 仍保持优先。对应 Issue #12277。

### 已关闭：3 条 PR，合并情况未提供

4. **[PR #12275：减少可变工具输出引起的滚动区重绘](https://github.com/earendil-works/pi/pull/12275)**  
   作者：Kindness-Kismet。针对长回复或工具结果持续更新、顶部内容已滚出视口时触发整段 scrollback 重绘的问题，尝试减少不必要的全量刷新。**不能据关闭状态认定已落地。**

5. **[PR #12274：减少流式输出时输入光标闪烁](https://github.com/earendil-works/pi/pull/12274)**  
   作者：Kindness-Kismet。聚焦流式回复及页脚更新期间的高频光标闪烁，涉及重复发送光标可见性控制序列等渲染行为。**是否合并需另行确认。**

6. **[PR #12276：用于源码学习的注释](https://github.com/earendil-works/pi/pull/12276)**  
   作者：mingo-liu。作者说明该 PR 为误提交，修改原计划用于个人学习 fork，因此已关闭；不应视为官方文档建设进展。

## 四、功能需求趋势

以下是本批 Issue 呈现的方向，并非长期趋势统计。

- **模型兼容性从“能接入”转向“行为正确”。** 图像能力识别、工具 schema 解释和容量错误重试，说明兼容层需要准确处理能力声明、参数语义与异常响应。参考：[#12282](https://github.com/earendil-works/pi/issues/12282)、[#12286](https://github.com/earendil-works/pi/issues/12286)、[#12289](https://github.com/earendil-works/pi/issues/12289)。
- **扩展需要更细的执行控制与可观测性。** 消息来源、上下文写入与执行解耦、bash 退出码，分别对应来源追踪、流程编排和结构化结果获取。参考：[#12291](https://github.com/earendil-works/pi/issues/12291)、[#12290](https://github.com/earendil-works/pi/issues/12290)、[#12288](https://github.com/earendil-works/pi/issues/12288)。
- **交互状态与配置同步仍是基础体验重点。** 会话导航不应改变输入历史，热重载也应同步用户修改后的模型列表。参考：[#12279](https://github.com/earendil-works/pi/issues/12279)、[#12277](https://github.com/earendil-works/pi/issues/12277)。
- **性能优化与多模型入口持续受到关注。** 减少 SQLite 写入和增加聚合式 Provider，分别指向运行效率与模型选择便利性。参考：[#12285](https://github.com/earendil-works/pi/issues/12285)、[#12287](https://github.com/earendil-works/pi/issues/12287)。
- **文档需要及时跟随能力变化。** 有用户要求移除 schema、文档中关于 `xhigh`、`max` thinking level 不受支持的过时说明。参考：[#12281](https://github.com/earendil-works/pi/issues/12281)，已关闭、1 条评论，但最终处理结果未提供。

## 五、开发者关注点

1. **减少“看似兼容、实际有偏差”的接口行为。** 模型能力误判、可选参数被填充、重试漏匹配，都可能让上层开发者被迫增加供应商专用逻辑。参考：[#12282](https://github.com/earendil-works/pi/issues/12282)、[#12286](https://github.com/earendil-works/pi/issues/12286)、[#12289](https://github.com/earendil-works/pi/issues/12289)。
2. **提供机器可消费的结构化信息。** 相比单一 `isError` 或无来源的用户消息，退出码与 `origin` 更适合自动化系统做分支判断、审计和路由。参考：[#12288](https://github.com/earendil-works/pi/issues/12288)、[#12291](https://github.com/earendil-works/pi/issues/12291)。
3. **保证长时间终端会话稳定。** 历史重复、滚动区重绘、光标闪烁和挂起恢复问题，共同指向高频使用中的终端体验。参考：[#12280](https://github.com/earendil-works/pi/pull/12280)、[#12275](https://github.com/earendil-works/pi/pull/12275)、[#12274](https://github.com/earendil-works/pi/pull/12274)、[#12283](https://github.com/earendil-works/pi/pull/12283)。

**后续优先跟踪：** 三条开放修复 PR 的合并进度，以及已关闭兼容性 Issue 的处理结论；当前数据不足以确认这些改动何时进入正式版本。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**2026-11-19｜[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

> 基于所提供的过去 24 小时数据，记录更新时间均为 2026-11-18：23 条 Issue 更新、39 条 PR 更新；PR 分析范围为展示的 20 条。PR 评论数缺失，不据此判断讨论热度；`CLOSED` 不等同于已合并。

## 一、今日速览

今日开发主线集中在 **Managed Agent 能力补齐与运行架构统一**：共享 Agent Loop、钉钉可编辑卡片、工作区产物库等均有开放 PR 推进。稳定性方面，会话记录损坏、Java JSON Schema 依赖兼容和主分支 CI 门禁成为重点；社区同时开始更明确地讨论“用户是否真正看清授权内容”的权限协议问题。

## 二、社区热点 Issues

以下综合影响范围、优先级和讨论情况选取；所列 Issue 的 👍 均为 0，评论量仅代表当前讨论规模。

| Issue | 核心问题与重要性 | 社区反应与状态 |
|---|---|---|
| [#17747 会话 JSONL 写入损坏](https://github.com/QwenLM/qwen-code/issues/17747) | 截断记录与下一条记录粘连，导致解析失败、父链断裂和 `degraded_history`。涉及历史记录完整性，是高风险可靠性问题。 | **P1 · OPEN · 3 条评论**；所展示 PR 中尚无明确对应修复。 |
| [#17741 主分支导出体积门禁失败](https://github.com/QwenLM/qwen-code/issues/17741) | 仅超出 **429 字节**，却阻塞单元测试构建，并连带产生三个失败检查，影响所有 PR 的验证信号。 | **P1 · CLOSED · 4 条评论**；对应调预算 PR #17746 也已关闭，但数据未说明是否合并。 |
| [#17750 JSON Schema Validator 2.x 不兼容](https://github.com/QwenLM/qwen-code/issues/17750) | `ToolPublicationContract` 使用 1.x API，宿主采用 2.x 时可能触发 `NoClassDefFoundError`，影响嵌入式 Java 集成。 | **P2 · OPEN · 4 条评论**；已有 #17751、#17752 两个开放修复 PR。 |
| [#17734 Managed Agent 循环验证失败](https://github.com/QwenLM/qwen-code/issues/17734) | 主 CI 的 Managed Agent loop 验证失败，且未识别到具体测试，增加故障定位难度。 | **OPEN · 5 条评论**，为本批 Issue 评论数最高；仍待分诊。 |
| [#17727 首条消息 409 后无法原样重试](https://github.com/QwenLM/qwen-code/issues/17727) | 运行时尚未稳定时提交失败，随后相同请求又被防重放机制拒绝，用户缺少恢复路径。 | **P2 · OPEN · 3 条评论**；标记为需要更多信息，尚不能视为已确认修复。 |
| [#17740 合并后 CI 并发组取消待运行任务](https://github.com/QwenLM/qwen-code/issues/17740) | 并发键使用 `github.ref`，可能取消同一主分支上的排队 push 验证，丢失回归证据。 | **P2 · OPEN · 2 条评论**；关注点是验证机制本身的可信度。 |
| [#17717 Managed Web UI 与 daemon 功能对齐](https://github.com/QwenLM/qwen-code/issues/17717) | 要求明确缺失界面的处理方案、更新能力对齐记录，并处理尚未接通的本地终端，关系到 Managed 模式能否替代既有工作流。 | **P2 · OPEN · 2 条评论**；仍属功能需求，不能视为差异已消除。 |
| [#17716 渠道卡片式分段回复](https://github.com/QwenLM/qwen-code/issues/17716) | 希望将多段文本回复升级为可持续编辑的卡片，改善长回复在消息渠道中的可读性。 | **P2 · OPEN · 2 条评论**；已有钉钉实现 PR #17748，需求仍待讨论。 |
| [#17739 将重要授权绑定到用户实际看到的内容](https://github.com/QwenLM/qwen-code/issues/17739) | 讨论 Mods 授权中的知情同意与来源追溯，避免“点击了允许”与“实际审阅了操作内容”脱节。 | **P2 · OPEN · 2 条评论**；处于产品契约讨论阶段，明确不是 #17718 的阻塞项。 |
| [#17724 自定义主题可读性与配置缺口](https://github.com/QwenLM/qwen-code/issues/17724) | diff 块难读、空颜色值被静默丢弃，且选区与光标不能主题化，直接影响第三方主题维护。 | **P2 · OPEN · 3 条评论**；来自实际主题维护者，反馈具有明确使用场景。 |

## 三、重要 PR 进展

**以下 10 个 PR 均为 OPEN，代表正在推进的方案，而非已发布能力。**

| PR | 功能或修复内容 | 技术意义 |
|---|---|---|
| [#17744 ACP 默认使用共享 Agent Loop](https://github.com/QwenLM/qwen-code/pull/17744) | 将 ACP 会话的提示、Goal、cron 和后台通知回合接入共享循环，覆盖 Zed、VS Code、Web Shell 等入口。 | 推动跨入口执行路径统一，是本日影响面较大的架构变更。 |
| [#17745 OpenTUI 默认使用共享 Agent Loop](https://github.com/QwenLM/qwen-code/pull/17745) | 将 OpenTUI 的模型轮次和工具批次接入共享循环，并提供配置与环境变量回退方式。 | 与 ACP 改造形成配套，降低不同界面执行行为分叉。 |
| [#17749 Runtime 接管 MCP/Hook 连接生命周期设计](https://github.com/QwenLM/qwen-code/pull/17749) | 提交双语设计，计划把连接生命周期归属从 Session 移至 Runtime，避免会话暂停、重开时重复断连与发现。 | **仅为实施前设计**；值得关注其对连接稳定性和恢复成本的影响。 |
| [#17748 钉钉 Managed 回复支持可编辑卡片](https://github.com/QwenLM/qwen-code/pull/17748) | 将一次回复呈现为单张原生卡片，后续分段到达时更新卡片，而非继续发送纯文本消息。 | 是 #17716 的首个渠道实现，改善长回复交互。 |
| [#17728 Managed Web UI 工作区产物库](https://github.com/QwenLM/qwen-code/pull/17728) | 跨会话列出工作区产物，提供游标分页，并固定首次分页的查询窗口。 | 将产物查找从单会话提升到工作区层级，补齐 Web UI 工作流。 |
| [#17752 适配 JSON Schema Validator 2.x](https://github.com/QwenLM/qwen-code/pull/17752) | 改用 2.x `SchemaRegistry` API，并将依赖从 1.5.9 升至 2.0.0。 | 对应 #17750 的嵌入兼容问题；另有同方向开放 PR #17751，需关注最终整合结果。 |
| [#17753 恢复类大小与 facade 数量门禁](https://github.com/QwenLM/qwen-code/pull/17753) | 调整创建能力预读取逻辑的归属，修复 #17703 在主分支留下的两个确定性门禁失败。 | 优先恢复主分支验证基线，减少后续 PR 继承无关失败。 |
| [#17738 会话目录先分页，再加载附属文件](https://github.com/QwenLM/qwen-code/pull/17738) | 先选出目录页，再读取 worktree、PR 绑定和产物摘要；缓存快照内共享同一行的读取。 | 减少列表请求中不必要的文件 I/O，面向大量历史会话场景。 |
| [#17736 限制异步 Hook 上下文总量](https://github.com/QwenLM/qwen-code/pull/17736) | 为异步 Hook 输出拼接后的模型上下文块设置总量边界。 | 防止单个冗长 Hook 或大量完成事件无限累积，改善上下文资源可控性。 |
| [#17722 未绑定 Session 的附件能力声明修复](https://github.com/QwenLM/qwen-code/pull/17722) | 对 Harness 支持附件的未绑定 ACTIVE Session，正确公布附件能力，使输入框显示附件入口。 | 对齐前端能力声明与实际准入规则，修复“后端支持、界面不可用”的体验断层。 |

## 四、功能需求趋势

### 1. Managed Agent 从运行能力走向完整工作流
需求同时覆盖浏览器功能对齐、内容型扩展中的 MCP/Hook 支持，以及渠道卡片呈现。社区关注的不只是“能运行”，而是不同入口是否具备一致、可恢复的操作体验。  
参考：[Web UI 对齐 #17717](https://github.com/QwenLM/qwen-code/issues/17717) · [扩展降级支持 #17714](https://github.com/QwenLM/qwen-code/issues/17714) · [卡片回复 #17716](https://github.com/QwenLM/qwen-code/issues/17716)

### 2. 权限交互开始强调“可审阅性”
相关提案要求协议明确记录授权对象是否可被用户检查，并让重要授权与用户实际看到的内容关联。这是从界面展示问题向授权语义设计的延伸。  
参考：[权限对象可检查状态 #17715](https://github.com/QwenLM/qwen-code/issues/17715) · [Mods 授权绑定 #17739](https://github.com/QwenLM/qwen-code/issues/17739)

### 3. 本地化与主题进入细节完善阶段
俄语需求从“提供翻译”进一步细化到设置页覆盖、菜单换行和数量词形；主题反馈则集中在 diff 可读性及颜色配置完整性。  
参考：[俄语界面 #17710](https://github.com/QwenLM/qwen-code/issues/17710) · [俄语数量词形 #17730](https://github.com/QwenLM/qwen-code/issues/17730) · [主题能力 #17724](https://github.com/QwenLM/qwen-code/issues/17724)

### 4. 测试覆盖更重视边界与真实故障区分
SSE 准入、非 REST 连接清理和 Managed Agent 分支覆盖持续被补充；不稳定测试报告也强调先判断随机失败还是确定性缺陷，避免仅通过放宽测试掩盖问题。  
参考：[SSE 覆盖 #17712](https://github.com/QwenLM/qwen-code/issues/17712) · [Managed 测试缺口 #17695](https://github.com/QwenLM/qwen-code/issues/17695) · [钉钉测试排查 #17699](https://github.com/QwenLM/qwen-code/issues/17699)

## 五、开发者关注点

- **失败后必须有恢复路径。** JSONL 损坏影响历史链，409 与防重放机制叠加则阻断重试；会话可靠性需要同时覆盖持久化与请求恢复。  
  [#17747](https://github.com/QwenLM/qwen-code/issues/17747) · [#17727](https://github.com/QwenLM/qwen-code/issues/17727)

- **CI 信号噪声正在消耗排障效率。** 体积门禁、并发取消、临时目录清理和 PID fixture 冲突来自不同层面，不能统一归因为产品回归。  
  [#17741](https://github.com/QwenLM/qwen-code/issues/17741) · [#17740](https://github.com/QwenLM/qwen-code/issues/17740) · [#17723](https://github.com/QwenLM/qwen-code/issues/17723) · [#17694](https://github.com/QwenLM/qwen-code/issues/17694)

- **接口契约与实际行为需要一致。** Java 依赖升级暴露 API 兼容问题，`notebook_edit` 的 `cell-N` 文档则遗漏仅适用于无 ID 单元格的限制，两者都会增加集成试错成本。  
  [#17750](https://github.com/QwenLM/qwen-code/issues/17750) · [#17725](https://github.com/QwenLM/qwen-code/issues/17725)

- **输入边界和版本定位需要更清晰。** `/goal set`、`/goal edit` 的长度限制缺口可能影响目录投影；另有用户询问 1.0.0-preview 与持续更新的 0.x 分支差异，反映出边界说明与发布路线沟通仍需完善。  
  [#17731](https://github.com/QwenLM/qwen-code/issues/17731) · [#17696](https://github.com/QwenLM/qwen-code/issues/17696)

**后续观察重点：**共享 Agent Loop 两个默认切换 PR 的验证结果、会话 JSONL 损坏的修复进展，以及主分支门禁能否恢复稳定。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-19｜统计窗口：过去 24 小时**

> **数据说明**：所提供的数据标注来源为 `Hmbown/DeepSeek-TUI`，但唯一 PR 指向 `codewhale-hq/Codewhale`，存在仓库归属不一致。以下按原始数据整理，该 PR 是否属于 DeepSeek TUI 的相关动态仍需核实。

## 1. 今日速览

今日数据未记录新版本发布或 Issue 更新，仅收录 1 条已关闭的 PR，内容涉及 TUI 工具标签、帮助文本等界面的国际化修复。该变更覆盖 15 个语言包，重点是消除硬编码英文并保持英文输出兼容；但 **已关闭不代表已合并**，目前无法确认是否进入主分支。

## 2. 社区热点 Issues

**过去 24 小时内无更新的 Issue**，因此无法筛选热点条目或评估社区反应，也不补足 10 条。

需注意，这只代表本次数据窗口内没有记录，不代表项目不存在未解决问题。  
[查看 DeepSeek TUI Issues](https://github.com/Hmbown/DeepSeek-TUI/issues)

## 3. 重要 PR 进展

本次仅提供 1 条 PR，按实际数量列出。

### #7367：修复 TUI 多处硬编码英文
[查看 PR](https://github.com/codewhale-hq/Codewhale/pull/7367)

- **状态**：已关闭，是否合并未知。
- **作者**：`luochen211`，标记为外部贡献者。
- **标签**：`bug`、`area:localization`、`area:tui`、`area:web`。
- **修复内容**：将此前遗留的 6 处硬编码英文接入语言包，涉及工具标签、`/help`、`/diff`、输入编辑区（composer）及 `/status` 目录文本。
- **覆盖范围**：为全部 15 个语言包添加新键；摘要声明英文输出保持逐字节不变，简体中文采用全角标点。
- **技术意义**：完善非英语界面的一致性，同时尽量避免对现有英文输出造成回归。
- **社区反馈**：👍 为 0；评论数缺失，无法判断讨论热度。

**时间说明**：该 PR 被数据源列入过去 24 小时更新列表，但仅提供了 `2026-11-18` 的日期，没有具体时间和时区，无法独立核验其是否落在统计窗口内。

## 4. 功能需求趋势

**当前可见方向是本地化完整性，但不足以推断整体社区趋势。** 唯一 PR 体现了将遗漏文案接入统一语言包、同步维护多语言键值，以及规范中文标点的工作方向。  
[相关 PR #7367](https://github.com/codewhale-hq/Codewhale/pull/7367)

本次没有 Issue 样本，无法判断 IDE 集成、性能优化、新模型支持等方向的需求强度，也无法认定本地化是社区最关注的功能。

## 5. 开发者关注点

从唯一 PR 可观察到以下工程关注点，**不宜视为高频用户反馈**：

- **清理硬编码文案**：减少工具标签、命令帮助与输入区出现中英文混杂的情况。
- **维持输出兼容性**：修复国际化问题时保持英文输出不变，降低回归风险。
- **多语言维护一致性**：新增键同步覆盖 15 个语言包，避免部分语言遗漏。
- **中文排版质量**：简体中文采用全角标点，提升界面一致性。

以上均来自 [PR #7367](https://github.com/codewhale-hq/Codewhale/pull/7367)。后续应优先核实其仓库归属、合并状态及所属发布版本。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*