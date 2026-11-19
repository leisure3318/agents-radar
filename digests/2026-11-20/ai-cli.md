# AI CLI 工具社区动态日报 2026-11-20

> 生成时间: 2026-11-19 17:22 UTC | 覆盖工具: 9 个

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
**日期：2026-11-20｜基于所提供的过去 24 小时社区动态**

> **口径说明：**下文 Issues、PR 数均指统计窗口内有更新的条目，不等于新增数量；部分仓库仅展示了样本，主题分析不代表完整分布。Issue 关闭、PR 关闭、代码合并和正式发布是不同状态，不能相互替代。

## 1. 生态全景

AI CLI 工具的竞争重点，正在从“支持更多模型和工具”转向**长任务可靠性、权限边界与企业集成能力**。MCP 已成为多个工具共同面对的集成层，但 OAuth、动态凭据、工具发现及服务器级信任语义仍存在较多边界问题。产品形态也在超出传统终端：桌面端、Web Shell、远程会话和多代理编排不断扩展，同时带来进程回收、状态同步和异常恢复压力。本期已知发布仅有 **3 个版本，其中 Codex 为 Alpha 预发布**；大量工程活动仍处于提案、修复与验证阶段，不能直接等同于用户已获得改进。

## 2. 各工具活跃度对比

| 工具 | 更新 Issues | 更新 PR | Release 情况 | 本期主要方向 |
|---|---:|---:|---|---|
| Claude Code | 50（展示 30） | 0 | 无 | 删除防护、Desktop 稳定性、MCP 与插件可靠性 |
| OpenAI Codex | 50（展示 30） | 23（展示 20） | 1：`0.172.0-alpha.2`，变更说明不足 | Code Mode 通信、远程生命周期、Guardian 策略 |
| Gemini CLI | 1 | 2 | 无 | MCP 信任边界、忽略规则、ACP 会话关闭 |
| GitHub Copilot CLI | 9 | 0 | 2：`v1.0.115-0`、`v1.0.115-1` | MCP 登录兼容、企业身份、多代理成本 |
| Kimi Code CLI | 0 | 0 | 无 | 本窗口无活动 |
| OpenCode | 50（展示 30） | 50（展示 20） | 无 | V2 稳定性、跨平台资源管理、自动化 |
| Pi | 19 | 5 | 无 | Provider 适配、缓存计费、终端与运行时容错 |
| Qwen Code | 20 | 50（展示 20） | 无 | Managed Agent、Web Shell、权限与数据库优化 |
| DeepSeek TUI／Codewhale | 11 | 35 | 无；推进 0.10.3 发布准备 | 执行策略加固、输入完整性、插件兼容 |
| **合计** | **210** | **165** | **3** | — |

**解读边界：**
- Claude Code、Copilot CLI 的本期 PR 为零，不代表其全部产品研发停滞。
- Pi 和 DeepSeek TUI 的来源名称与条目目标仓库存在差异，以上沿用输入映射。
- Kimi 的单日无活动，以及 Gemini 的小样本，均不足以判断长期活跃度。

## 3. 共同关注的功能方向

### 3.1 MCP：从“能连接”转向“可治理、可持续运行”

| 子方向 | 涉及工具 | 具体诉求 |
|---|---|---|
| **授权粒度** | Gemini CLI、Qwen Code | 信任服务器后，新增工具是否应自动获得免确认权限 |
| **企业 OAuth 兼容** | Copilot CLI、OpenCode | Entra 访客租户、issuer 校验、应用验证及授权回调 |
| **凭据与错误恢复** | Claude Code、Copilot CLI | 401 应明确报错并引导恢复；支持短期凭据动态刷新 |
| **连接与发现一致性** | Claude Code、Codex、Qwen Code | 重启重连、连接共享、慢启动工具能否正确进入模型可用集合 |

其中，Gemini [#30369](https://github.com/google-gemini/gemini-cli/issues/30369) 与 Qwen [#17854](https://github.com/QwenLM/qwen-code/issues/17854) 呈现了相似的**“服务器信任是否覆盖未来工具”**争议，但尚不能认定为同一根因或已确认漏洞。

### 3.2 长驻 Agent 与后台任务的生命周期

- **Claude Code、Copilot CLI、OpenCode**：关注遗留进程、端口占用、监听资源和内存耗尽。
- **Codex、Gemini CLI**：推进远程服务关闭、调度准入及显式会话释放。
- **Qwen Code、OpenCode、Pi**：需要完整的后台完成事件、会话恢复与任务调度语义。

共同诉求是：**任务可以长期运行，也必须能够正确停止、恢复，并准确报告状态。**

### 3.3 安全控制既要防漏，也要减少误拦

- **Claude Code、DeepSeek TUI／Codewhale**：删除命令、动态参数、启动器和嵌入式脚本暴露命令检查边界。
- **Qwen Code、Copilot CLI**：Windows 盘符、Perforce depot 路径要求更准确的路径解析。
- **Codex、DeepSeek TUI／Codewhale**：合法 CUDA 调试、只读工具不应因分类失准而阻断。

这表明安全机制需要从简单名称匹配，走向**命令语义、实际能力与执行环境相结合的判断**。

### 3.4 成本、缓存与模型能力透明度

- **Copilot CLI**：同步子代理等待期间的缓存失效；模型推理强度声明与运行记录不一致。
- **Pi**：系统提示词缓存、服务等级计价、会话标识与缓存复用。
- **Codex、OpenCode**：缓存指标细分、额度状态解释。
- **Claude Code、Codex、OpenCode、Pi**：动态模型发现、标准模型标识及能力元数据。

开发者关注点已从“支持哪个模型”扩展为：**实际用了什么配置、缓存是否生效、最终成本是否可信。**Copilot 报告中的“94% 未命中、约 20 倍成本”仍只是单个用户报告，不能作为通用成本结论。

## 4. 差异化定位分析

以下是本期动态体现的侧重，并非完整产品能力排名。

| 工具 | 功能与技术路线侧重 | 更相关的目标用户／场景 |
|---|---|---|
| **Claude Code** | CLI、Desktop、IDE 与云端插件协同；强调 Skills、MCP、Agent SDK 的工作流连接 | 需要跨入口一致体验、插件治理与持续编码任务的团队 |
| **Codex** | Code Mode host、gRPC、app-server、Guardian；工程活动深入通信与调度层 | 需要远程执行、多代理编排及安全策略控制的开发团队 |
| **Gemini CLI** | 本期聚焦核心文件处理、MCP 授权和 ACP 生命周期 | 构建 CLI 客户端集成、重视协议与仓库语义正确性的开发者 |
| **Copilot CLI** | 企业身份、项目扩展工作流、技能 Hook、多模型配置 | 使用 GitHub／Entra 身份体系、需要集中治理的组织 |
| **OpenCode** | V2 长驻服务、跨平台桌面／TUI、广泛模型接入与无人值守扩展 | 重视服务商选择、自定义集成和长期自动化的用户 |
| **Pi** | 多 Provider 适配、扩展分发、可嵌入 SDK、终端体验 | 希望精细控制模型、缓存、成本和扩展机制的开发者 |
| **Qwen Code** | Managed Agent、Web Shell、后台记忆、跨会话产物及数据库工程 | 需要托管 Agent、浏览器工作台和多渠道协作的平台团队 |
| **DeepSeek TUI／Codewhale** | 命令策略分析、Auto-Review、DSH 插件及终端交互加固 | 关注执行审批、安全边界和插件工作流的用户 |
| **Kimi Code CLI** | 本期无足够信号 | 不据此推断定位变化 |

## 5. 社区热度与成熟度

### 工程活动：OpenCode、Qwen Code 最突出

- **OpenCode：50 条 Issue、50 条 PR 更新**，兼具较多问题反馈与代码活动；主题覆盖 V2 回归、资源管理和功能扩展。
- **Qwen Code：20 条 Issue、50 条 PR 更新**，明显处于 Managed Agent 与 Web Shell 密集工程化阶段。
- **DeepSeek TUI／Codewhale：35 条 PR 更新**，但活动主要围绕发布前审计与加固，不能简单解释为需求增长。
- **Codex：23 条 PR 更新并发布 Alpha**，体现底层架构与产品能力持续调整。

### 讨论热度：总体仍是小规模技术反馈

OpenCode 的 `edit` 卡住问题有 **9 条评论**，是所展示样本中较突出的讨论；Qwen 的 diff 换行问题有 **5 条评论**。多数其他条目只有 **0–3 条评论、0 个赞**，因此不能把问题数量当作广泛用户共识，也不能据此推算产品使用规模。

### 成熟度：更应观察工程闭环，而非关闭率

本期多个工具都在补齐成熟系统所需的能力：原子替换、失败回滚、有界超时、资源清理、诊断日志和稳定事件接口。但也暴露出不同阶段的压力：

- **OpenCode**：V2 重写后的跨平台回归与长驻服务稳定性压力。
- **Qwen Code**：托管平台扩展过程中的 CI、状态同步及查询规模化压力。
- **DeepSeek TUI／Codewhale**：发布前安全策略覆盖与回归验证压力。
- **Pi**：Provider 差异、运行时隔离和错误分类的一致性压力。

**高 PR 数说明变化密集，不必然说明更成熟；高关闭率也不等于修复已交付。**

## 6. 值得关注的趋势信号

### ① CLI 正在成为 Agent 系统的入口，而不只是终端应用
桌面端、远程服务、Web Shell、后台会话与多代理调度同时发展，故障也越来越集中在组件交界处。

**参考价值：**选型测试应覆盖“启动—执行—中断—恢复—升级—退出”的完整链路，而不是只比较首次任务效果。

### ② MCP 的差异化将更多体现在治理，而非接入数量
服务器信任、动态工具、租户身份、令牌刷新和工具发现同步，正在决定企业部署可用性。

**参考价值：**企业 PoC 应验证访客账号、令牌过期、服务重启和新增工具等异常路径，而不只是首次登录成功。

### ③ 无人值守自动化的前提是状态接口可靠
Qwen 的缺失 `Stop`、OpenCode 的 JSON 完成事件不足，以及多个工具的恢复问题，说明界面“空闲”并不必然代表后台工作结束。

**参考价值：**外部编排应依赖明确的任务标识、终态事件和可查询状态，避免仅凭 UI 或单一忙闲标志决策。

### ④ 成本优化正在进入系统设计层
缓存收益受到子代理等待、系统提示词布局、会话标识和服务等级影响，而不只是模型单价。

**参考价值：**用真实多轮、多代理工作负载评估成本，同时核对服务端用量；不要仅依赖客户端估算值。

### ⑤ 数据完整性应成为自动化上线门槛
Claude 的删除防护报告、Codex 的源文件截断与记忆替换风险，以及终端粘贴截断，涉及不同形式的数据丢失或不完整输入。

**参考价值：**无人值守任务应默认配备版本控制、备份、原子写入和破坏性操作复核，并验证失败回滚。

---

**综合判断：**本期最明确的共同方向是从“功能可用”走向“持续运行可信”。对技术决策者而言，优先比较的应是**异常能否恢复、权限是否准确、状态是否可观测、数据是否受保护，以及成本能否解释**，而不是单日 Issue、PR 或模型数量。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-20｜基于所提供的 PR 与 Issue 样本**

> **数据口径：**展示的 PR 评论数均为 `undefined`、👍 均为 0，因此无法核验其真实热度排名。以下按“关联 Issue 的讨论强度、问题影响范围和提交内容”整理关注清单，**并非评论数排行榜**。所列 PR 均为 **OPEN**，未提供已合并或 Draft 标记；讨论热点依据 Issue 与 PR 摘要提炼。

## 1. 热门 Skills 排行：七个重点关注方向

| Skill / 代表 PR | 功能与社区关注点 | 当前状态 |
|---|---|---|
| **1. skill-creator** — [#1298](https://github.com/anthropics/skills/pull/1298) | 创建、评估和优化 Skills。核心问题是**触发评测是否可信**：并行进程互相干扰、Windows 管道兼容性、运行失败被误判为“不触发”。关联 [#556](https://github.com/anthropics/skills/issues/556) 有 **13 条评论、7 👍**，[#1352](https://github.com/anthropics/skills/issues/1352) 有 **6 条评论、3 👍**，是样本中证据最充分的技术热点。 | **OPEN** |
| **2. webapp-testing** — [#1980](https://github.com/anthropics/skills/pull/1980) | 启动服务并辅助 Web 应用测试。此 PR 针对 `shell=True` 执行用户或 Agent 命令的注入风险，关注点是**自动化测试的执行安全边界**；摘要不足以确认修复完整性。 | **OPEN**；11 月 1 日更新 |
| **3. docx** — [#1792](https://github.com/anthropics/skills/pull/1792) | Word 文档处理与修订接受。拟将 LibreOffice 超时正确报告为错误，并验证输出不再含修订标记，解决“报告成功但产物不合格”。另有 [#2018](https://github.com/anthropics/skills/issues/2018) 报告 XML 命名空间丢失，说明**文件完整性与结果验证**是重要痛点。 | **OPEN**；11 月 1 日更新 |
| **4. mcp-builder** — [#1742](https://github.com/anthropics/skills/pull/1742) | 辅助构建 MCP 服务与连接。适配 `mcp>=2` 的导入名称和自定义 HTTP Header 配置变化，反映**上游 SDK 升级带来的兼容性维护需求**。 | **OPEN**；10 月 8 日更新 |
| **5. xlsx** — [#2019](https://github.com/anthropics/skills/pull/2019) | Excel 表格处理与重计算。修复通过工作表级定义名称、别名间接引用外部链接时的漏检，重点是**复杂工作簿依赖识别的可靠性**。 | **OPEN**；11 月 3 日更新 |
| **6. notion-spec-to-implementation** — [#1245](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品或技术规格拆成 Claude Code 可执行的任务、验收标准与进度计划，体现**从需求文档到实施的工作流自动化**。同一 PR 还包含简历审计 Skill，需分别评估价值。 | **OPEN**；10 月 15 日更新 |
| **7. md2video-audio** — [#1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经 Marp 幻灯片等流程转成带配音的 MP4，代表**文档内容多模态再利用**方向。“零成本”“专业级”等为提交者描述，样本未提供验证结果。 | **OPEN**；9 月 15 日更新 |

**判断：**样本中，既有 Skills 的可靠性修复比新增 Skill 更集中；其中 **skill-creator 的评测正确性**有最明确的社区讨论支撑。

## 2. 社区需求趋势

### ① 可信分发与组织级复用：最强的生态需求
- **官方与社区 Skill 的身份边界**：[安全议题 #492](https://github.com/anthropics/skills/issues/492) 以 **46 条评论、3 👍** 位居所展示 Issues 首位，报告社区 Skills 使用 `anthropic/` 命名空间可能造成信任混淆。
- **组织内共享技能库**：[#228](https://github.com/anthropics/skills/issues/228) 有 **17 条评论、8 👍**，希望摆脱“下载文件—聊天工具传递—手动上传”的流程。

这更接近**分发、权限与治理基础设施**需求，而不是单个新 Skill。

### ② 可验证的 Skill 开发与质量门禁
- [#556](https://github.com/anthropics/skills/issues/556)、[#1352](https://github.com/anthropics/skills/issues/1352)：要求触发评测可复现、并发结果可信，避免错误指标指导优化。
- [Reasoning Quality Gate #1385](https://github.com/anthropics/skills/issues/1385)：提出“任务前校准—对抗审查—交付验证”，有 **7 条评论**，代表端到端质量审查的新 Skill 方向。

这里的诉求不只是生成内容，而是**证明任务被正确执行**。

### ③ 长任务记忆与上下文效率
- [compact-memory #1329](https://github.com/anthropics/skills/issues/1329)：以符号化方式压缩 Agent 状态，获得 **10 条评论**。
- [claude-api 上下文问题 #1487](https://github.com/anthropics/skills/issues/1487)：报告一次加载约 **156k tokens**。
- [重复安装 #189](https://github.com/anthropics/skills/issues/189)：**6 条评论、9 👍**，关注重复 Skills 占用上下文。

潜在方向是**紧凑记忆、按需加载和技能去重**，而非无限扩充提示词。

### ④ 文档产物质量与治理型审查
- [docx XML 损坏 #2018](https://github.com/anthropics/skills/issues/2018) 指向文档结构校验、失败保护及交付验证。
- [agent-governance #412](https://github.com/anthropics/skills/issues/412) 提出策略执行、威胁检测、信任评分和审计轨迹；该 Issue 已关闭，但**不能据此认定 Skill 已实现**。

**边界说明：**样本不足以把“代码审查”或“测试生成”认定为最高热度新需求；更强的证据集中在安全治理、评测可信度、组织共享和上下文管理。

## 3. 高潜力待合并 Skills / 改进

由于 PR 评论缺失，无法严格筛选“评论活跃”的候选。以下按**需求证据和可交付价值**列为优先观察项，不代表近期一定合并。

| 候选 | 看好理由 | 落地信号与限制 |
|---|---|---|
| **skill-creator 评测修复** — [#1298](https://github.com/anthropics/skills/pull/1298) | 对应多条活跃 Issue，影响所有依赖评测优化的 Skill 作者，基础设施价值最高。 | OPEN；需关注并发、Windows 与异常分类测试是否充分。 |
| **skill-creator 打包修复** — [#1681](https://github.com/anthropics/skills/pull/1681) | 修复直接运行 `package_skill.py` 的导入错误，并更新使用路径，降低贡献者入门阻力。 | OPEN；**11 月 19 日更新**，是展示 PR 中最近有更新的一项，但更新不等于获批。 |
| **Notion 规格到实施** — [#1245](https://github.com/anthropics/skills/pull/1245) | 任务拆解、验收标准、进度跟踪形成清晰闭环，适合团队研发流程。 | OPEN；一个 PR 包含两个不同方向的 Skill，审查范围较广。 |
| **Pyxel 游戏开发** — [#525](https://github.com/anthropics/skills/pull/525) | 覆盖创建、调试、无头输入驱动运行和帧检查，强调“实现后验证”，不仅是代码生成。 | OPEN；3 月创建、11 月 1 日仍更新，说明有后续维护，但等待时间较长。 |

## 4. Skills 生态洞察

**当前社区最集中的诉求，是让 Skills 从“能调用的提示词与脚本”升级为“来源可信、组织可复用、触发可评测、交付可验证”的工程化能力。**

---

# Claude Code 社区动态日报
**日期：2026-11-20｜数据源：[anthropics/claude-code](https://github.com/anthropics/claude-code)**

> 统计口径：过去 24 小时有 50 条 Issue 更新，本文基于提供的 30 条记录分析；这些记录的创建、更新日期均为 11 月 19 日。问题描述来自用户报告，未视为官方确认；Issue 关闭也不等于修复已发布。

## 1. 今日速览

过去 24 小时**无新 Release，也无 PR 更新**，社区反馈主要集中在安全防护、Desktop 稳定性，以及 MCP／插件集成可靠性。最值得优先排查的是一项带有 `data-loss` 标签的 Windows 删除命令防护报告；此外，MCP 鉴权错误不可见、桌面端进程累积，以及 VS Code 组织插件加载失败，均可能影响日常开发工作流。

当前展示的 Issue 均为 **0 👍、0–2 条评论**，尚未形成高互动讨论；下文按潜在影响与可复现性排序，而非按热度认定问题普遍性。

## 2. 社区热点 Issues

### 1. 删除命令的通配符可能绕过关键路径检查
**[#111167](https://github.com/anthropics/claude-code/issues/111167)｜OPEN｜1 条评论｜`has repro`、`data-loss`**

- **问题**：报告称，`rm -rf "<parent>/<prefix>"*` 未触发直接指定关键路径时应有的提示或拒绝，并造成实际数据丢失。
- **重要性**：涉及破坏性操作的权限边界，建议优先核查通配符展开与路径检查的一致性。
- **社区反应**：已有 1 条评论，但提供的数据未包含回复内容，不能据此判断是否获维护者确认。

### 2. Desktop 无响应 CLI 进程持续累积
**[#111155](https://github.com/anthropics/claude-code/issues/111155)｜OPEN｜1 条评论｜macOS**

- **问题**：用户称 Desktop 在会话无响应时创建替代 CLI 进程，却不终止旧进程，长期运行可能耗尽内存。
- **重要性**：直接影响长时间、多会话开发场景，值得检查进程回收和会话恢复机制。
- **社区反应**：已有少量讨论，尚无提供的修复结论。

### 3. MCP 的 401 鉴权失败变成静默超时
**[#111192](https://github.com/anthropics/claude-code/issues/111192)｜OPEN｜0 条评论**

- **问题**：Streamable HTTP MCP 服务返回带 `invalid_token` challenge 的 401 后，客户端未展示错误，而是等待约 120 秒空闲超时。
- **重要性**：令牌失效被表现为工具卡住，增加 OAuth 集成和故障定位成本。
- **社区反应**：暂无评论，仍需验证错误传播和重新认证行为。

### 4. MCP 服务重启期间，工具调用立即失败
**[#111196](https://github.com/anthropics/claude-code/issues/111196)｜OPEN｜0 条评论｜`has repro`**

- **问题**：HTTP MCP 服务在调用中重启后，客户端在重连完成前的调用直接报 `is not connected`。
- **重要性**：暴露服务重启窗口内的连接恢复体验问题，对远程工具的连续可用性有影响。
- **社区反应**：暂无讨论，但已标记可复现，值得关注后续重连策略说明。

### 5. VS Code 关闭遥测时，组织插件静默不加载
**[#111186](https://github.com/anthropics/claude-code/issues/111186)｜OPEN｜0 条评论｜Windows、`regression`、`has repro`**

- **问题**：报告称，关闭 VS Code 遥测后，来自 claude.ai 的组织插件无法加载，且缺少明确提示。
- **重要性**：可能影响采用严格隐私配置的企业开发环境，应核查插件加载与遥测设置之间的依赖。
- **社区反应**：同题报告 [#111185](https://github.com/anthropics/claude-code/issues/111185) 已关闭，但未提供关闭原因，不能据此认为问题已修复。

### 6. 目录插件与云端 connector 出现重复 MCP 实例
**[#111187](https://github.com/anthropics/claude-code/issues/111187)｜OPEN｜1 条评论｜macOS、`has repro`**

- **问题**：claude.ai 目录插件自带的 MCP server，在 Claude Code 中作为第二个本地服务运行，而非复用对应 connector。
- **重要性**：涉及插件与连接器的身份识别、配置复用和运行边界，可能增加集成管理成本。
- **社区反应**：已有 1 条评论，尚无提供的处理结论。

### 7. SDK／CLI 模型发现能力不足
**[#111177](https://github.com/anthropics/claude-code/issues/111177)｜OPEN｜1 条评论｜Windows、Agent SDK**

- **问题**：报告称，SDK／CLI 仅暴露 3 个硬编码模型别名，第三方集成无法发现可用模型。
- **重要性**：影响外部工具的模型选择器、能力适配及模型更新兼容性。
- **社区反应**：已有少量讨论；核心诉求是动态发现能力，而不只是增加固定别名。

### 8. Windows Agent View 会话无法正常中断
**[#111182](https://github.com/anthropics/claude-code/issues/111182)｜OPEN｜0 条评论｜`has repro`**

- **问题**：从 Agent View 打开的会话中，Esc 和 Ctrl+C 无效；同一会话通过 `claude --resume` 打开则正常。
- **重要性**：任务中断是基本控制能力；报告中的入口对比，也为排查 attach 路径提供了线索。
- **社区反应**：暂无评论。受影响用户可参考报告，尝试通过 `--resume` 打开会话。

### 9. Desktop 自动更新后 Remote Control 状态丢失
**[#111193](https://github.com/anthropics/claude-code/issues/111193)｜OPEN｜0 条评论｜macOS**

- **问题**：自动更新重启后，所有既有会话的 Remote Control 均被关闭；报告还称，空闲会话无法重新启用。
- **重要性**：影响远程开发连续性，也说明“固定会话”与“保持远程连接”存在预期差异。
- **社区反应**：暂无评论，需继续观察这是预期设计还是状态恢复缺陷。

### 10. 禁用 Skills 后，上下文总量未下降
**[#111175](https://github.com/anthropics/claude-code/issues/111175)｜OPEN｜0 条评论｜Linux**

- **问题**：通过 `skillOverrides` 禁用部分 Skills 后，`/context` 中 Skills 占用下降，但 System tools 等量上升，总量不变。
- **重要性**：影响开发者对上下文预算和配置效果的判断；目前不足以确定是统计归类问题，还是内容未实际移除。
- **社区反应**：暂无评论，需要进一步比对实际发送内容与界面统计。

## 3. 重要 PR 进展

过去 24 小时提供的数据中 **PR 更新为 0 条**，因此没有可列出的重要 PR，也无法从本批数据确认上述问题是否已有对应修复。

跟踪入口：[仓库 Pull Requests](https://github.com/anthropics/claude-code/pulls)。

## 4. 功能需求趋势

以下是所展示样本中的需求方向，不代表全部 50 条 Issue 的完整分布。

| 方向 | 社区诉求与分析 | 相关 Issue |
|---|---|---|
| **Code Mode 更灵活地用于自动化** | 希望支持后台 `--bg` 会话，并按子代理、Skill 或单次调用选择，反映需求正从交互使用延伸至自动化编排。 | [#111183](https://github.com/anthropics/claude-code/issues/111183)、[#111178](https://github.com/anthropics/claude-code/issues/111178) |
| **云环境配置仓库化** | 希望将 setup script、网络白名单和变量配置纳入仓库，便于团队共享、审查与复现。 | [#111190](https://github.com/anthropics/claude-code/issues/111190) |
| **第三方集成可发现性** | 动态模型发现、插件与 connector 复用，体现集成方对稳定接口和一致配置模型的需求。 | [#111177](https://github.com/anthropics/claude-code/issues/111177)、[#111187](https://github.com/anthropics/claude-code/issues/111187) |
| **桌面工作流一致性** | 包括代码审查后更清晰的提交推送入口，以及插件主题覆盖独立项目窗口。前者已关闭，但没有交付信息。 | [#111161](https://github.com/anthropics/claude-code/issues/111161)、[#111188](https://github.com/anthropics/claude-code/issues/111188) |
| **安全提示可验证** | 用户希望“新增 passkey”邮件与 Trusted Devices 界面、文档对应，能够核实告警来源。 | [#111180](https://github.com/anthropics/claude-code/issues/111180) |

## 5. 开发者关注点

- **安全控制需要覆盖真实命令形式。** 对删除等高风险操作，精确路径与通配符路径应具备一致的防护语义。建议在问题澄清前，对破坏性命令保持人工复核并确认备份。[#111167](https://github.com/anthropics/claude-code/issues/111167)
- **“静默失败”显著拉高排障成本。** MCP 的 401 超时和组织插件不加载，都指向更明确的错误提示、日志与恢复入口需求。[#111192](https://github.com/anthropics/claude-code/issues/111192)、[#111186](https://github.com/anthropics/claude-code/issues/111186)
- **长任务需要可靠的生命周期管理。** 进程回收、更新后的远程控制恢复、会话中断能力，共同决定工具能否用于持续开发任务。[#111155](https://github.com/anthropics/claude-code/issues/111155)、[#111193](https://github.com/anthropics/claude-code/issues/111193)、[#111182](https://github.com/anthropics/claude-code/issues/111182)
- **配置效果需要可观测、可解释。** 无论是上下文预算，还是模型和插件能力，开发者都需要确认“配置改动后到底发生了什么”。[#111175](https://github.com/anthropics/claude-code/issues/111175)、[#111177](https://github.com/anthropics/claude-code/issues/111177)

**今日判断：** 本批样本更值得关注的不是新功能数量，而是已有能力在异常、重启和跨端集成场景下的可靠性。优先跟踪删除防护、MCP 错误处理与桌面会话生命周期问题的后续确认。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-20｜仓库：[openai/codex](https://github.com/openai/codex)**

> **数据口径**：基于提供的过去 24 小时数据，包含 1 个 Release、50 条更新 Issues 中展示的 30 条，以及 23 条更新 PR 中展示的 20 条；展示条目的更新时间均为 11 月 19 日。PR 仅标注 CLOSED，**不代表已确认合并或随版本发布**；PR 评论数缺失，不用于热度判断。

## 1. 今日速览

Codex 发布 **0.172.0-alpha.2**，但发布说明未提供具体变更，暂无法确认其与本期 PR 的对应关系。社区反馈集中在 **Windows 桌面端工具调用、认证与浏览器控制可靠性**，同时出现文件截断、记忆导入失败等值得优先核查的数据完整性报告。工程侧则围绕 MCP 连接、Code Mode 通信、远程服务生命周期及 Guardian 策略展开改进。

## 2. 版本发布

### [rust-v0.172.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.172.0-alpha.2)
- **版本性质**：Alpha 预发布版本。
- **已知内容**：发布说明仅包含版本号，没有列出新增功能、修复项或兼容性变化。
- **开发者建议**：不宜仅凭版本号判断本期问题是否已修复；升级验证应重点覆盖工具调用、MCP 与远程连接链路。

## 3. 社区热点 Issues

以下按潜在影响、可诊断性和代表性筛选，**并非单纯按评论数排序**。这些 Issue 均为 OPEN，且均为 0 👍，当前讨论规模较小。

| Issue | 核心问题与重要性 | 社区反应 |
|---|---|---|
| [#62487 跨环境复制可能截断源文件](https://github.com/openai/codex/issues/62487) | 报告称，当不同环境 ID 指向同一底层路径时，`multi_env_copy_file` 可能截断源文件。涉及直接数据损失风险，报告还给出了源码定位与文件系统探测信息，值得优先核查。 | 1 条评论；尚无修复确认。 |
| [#62527 记忆刷新失败后留下不完整替换](https://github.com/openai/codex/issues/62527) | 外部 Agent 项目刷新先删除旧目录，再写入新文件；若写入失败，旧完整快照可能已丢失。暴露导入流程在原子替换、失败回滚方面的风险。 | 1 条评论；反馈集中于失败恢复能力。 |
| [#62539 Windows 工具调用回合挂起](https://github.com/openai/codex/issues/62539) | 桌面端使用工具的回合无法完成，报告怀疑 Code Mode host 缺失。若复现，会直接阻断 Agent 执行任务，而非仅影响 UI。 | 2 条评论；原因仍待验证。 |
| [#62498 Windows 认证与工作区路由错误](https://github.com/openai/codex/issues/62498) | 桌面端无法获取账户信息，并出现路由错误 432；报告称浏览器端与 CLI 正常，为定位客户端或工作区链路差异提供了线索。 | 2 条评论；影响会话加载和消息发送。 |
| [#62546 长会话丢失内置浏览器控制](https://github.com/openai/codex/issues/62546) | Windows 用户报告浏览器标签仍在、终端仍可用，但 Agent 无法点击、输入或导航。问题指向工具能力在长会话中的持续可用性。 | 2 条评论；尚未确认触发条件。 |
| [#62541 新会话产生双线程并停留空白页](https://github.com/openai/codex/issues/62541) | macOS 桌面端新建聊天与首次发送分别创建线程，界面仍加载空的零轮次线程。影响会话状态一致性，也容易被误认为消息未发送。 | 2 条评论；提供了客户端及引擎版本信息。 |
| [#62530 `process/read` 输出到达后仍等待超时](https://github.com/openai/codex/issues/62530) | 报告描述了空缓冲区检查与 Tokio 通知等待器创建之间的丢失唤醒窗口。可能造成“进程已有输出，调用却迟迟不返回”的延迟。 | 2 条评论；技术定位较具体。 |
| [#62531 周额度重置失败且按钮消失](https://github.com/openai/codex/issues/62531) | Pro 200 用户报告仍有 363 credits，但周额度已耗尽，原先可用的重置未生效。反映额度、积分与重置机制之间的可理解性问题。 | 2 条评论；尚不能据此判断为普遍计费故障。 |
| [#62502 CUDA 调试被安全系统误拦截](https://github.com/openai/codex/issues/62502) | 用户报告 FlashAttention-4 CUDA 内核调试被识别为网络安全风险。对底层性能优化、固件及系统开发工作流具有代表性。 | 1 条评论；目前属于用户报告的误报，未见确认结论。 |
| [#62544 浏览器授权后仍无法读取淘宝商家页](https://github.com/openai/codex/issues/62544) | macOS 可发现已登录 Chrome 标签，但选择 Always allow 并重启后仍无法读取内容。说明“发现标签”与“获得内容访问权限”之间可能存在断层。 | 2 条评论；涉及依赖登录态的浏览器自动化场景。 |

## 4. 重要 PR 进展

**以下 10 个 PR 在数据中均为 CLOSED；是否合并、进入哪个版本，仍需另行核实。**

| PR | 功能或修复内容 | 开发者意义 |
|---|---|---|
| [#62552 默认启用 MCP 连接共享](https://github.com/openai/codex/pull/62552) | 将 MCP 连接共享设为默认，并围绕本地 stdio 服务发现的兼容性展开调整。 | 关注空发现响应、初始化较慢、要求首个请求为 `initialize` 的旧服务兼容问题。 |
| [#62476 Code Mode host 全面使用 gRPC](https://github.com/openai/codex/pull/62476) | 移除旧 framed stdio 协议，统一使用 gRPC；本地 host 默认采用 `grpc+stdio://`。 | 是底层通信路径的重要变化，自定义集成需关注协议兼容性。 |
| [#62547 防止远程 app-server 关闭挂起](https://github.com/openai/codex/pull/62547) | 处理 WebSocket 写入停滞、命令队列满时，关闭流程可能无限等待的问题。 | 改善远程会话退出与异常清理的可靠性。 |
| [#62537 邮箱唤醒遵守回合准入状态](https://github.com/openai/codex/pull/62537) | 避免自动 mailbox wake 在 app-server 排空或暂停接收回合时启动新回合，同时保留子 Agent 结果回传需求。 | 强化多 Agent 调度与服务重启期间的状态一致性。 |
| [#62496 跨线程刷新托管 Guardian 策略](https://github.com/openai/codex/pull/62496) | 协调线程启动与策略刷新，避免新线程注册已被替代的旧策略。 | 降低不同线程使用不一致安全策略的风险。 |
| [#62489 Guardian 审查遵循弹性预算](https://github.com/openai/codex/pull/62489) | 附加审查使用配置的预算，而非固定证据限制。 | 针对“参数本可容纳，却因固定限制被拒绝”的情况改善预算适配。 |
| [#62499 模型发现暴露 Daybreak 可用性](https://github.com/openai/codex/pull/62499) | 返回服务端解析的调用者状态，区分需要加入 Daybreak 与模型不支持该机制。 | 帮助客户端提供更准确的访问条件提示；不等于取消相关限制。 |
| [#62474 WebSocket 发送已授权连接器结果](https://github.com/openai/codex/pull/62474) | 为 Responses WebSocket 请求补齐私有连接器结果正文传递，并执行目标及账户检查。 | 缩小 HTTP 与 WebSocket 路径的能力差异，同时保留授权边界。 |
| [#62439 Windows MXC 沙箱启动诊断](https://github.com/openai/codex/pull/62439) | 按进程 ID 记录启动阶段与耗时，增强错误和超时诊断。 | 对 Windows 沙箱、连接失败及启动停滞问题有排障价值，但不代表已修复这些问题。 |
| [#62435 扩展可为 MCP 请求附加元数据](https://github.com/openai/codex/pull/62435) | 新增 `mcp_tool_request_meta`，允许扩展结合线程、回合和工具注册信息写入请求 `_meta`，并拒绝重复键。 | 为扩展提供更丰富的请求上下文传递能力。 |

## 5. 功能需求趋势

以下趋势从**已展示的 30 条 Issues**提炼，不代表全部 50 条的完整分布。

- **桌面端需要更清晰、持久的上下文标识**  
  用户希望持续看到项目与会话身份；本地和云端执行边界不清，也会导致无效排障和预期落差。  
  参考：[会话身份标识 #62523](https://github.com/openai/codex/issues/62523)、[本地/云端执行混淆 #62506](https://github.com/openai/codex/issues/62506)。

- **跨设备、远程 IDE 工作流需要稳定衔接**  
  VS Code 远程工作区登录失败、手机 SSH 连接异常，表明认证、连接和任务可见性仍是跨端体验的关键环节。  
  参考：[远程 IDE 登录 #62549](https://github.com/openai/codex/issues/62549)、[手机 SSH #62548](https://github.com/openai/codex/issues/62548)。

- **浏览器自动化需要可解释的权限与可靠文件传递**  
  “已允许但不能读”“文件 URL 权限已开但无法交接”等报告，显示用户需要更明确的权限状态及失败原因。  
  参考：[页面访问权限 #62544](https://github.com/openai/codex/issues/62544)、[文件交接 #62543](https://github.com/openai/codex/issues/62543)。

- **成本与性能可观测性需求更细化**  
  新需求希望按缓存 TTL 拆分 `cache_write_token_count`；额度重置报告则凸显使用量解释与状态一致性的重要性。  
  参考：[OTel 缓存指标 #62538](https://github.com/openai/codex/issues/62538)、[额度重置 #62531](https://github.com/openai/codex/issues/62531)。

- **安全检查应更准确地区分开发任务与风险操作**  
  CUDA 调试、本地 UI 任务及普通文本处理均有拦截相关反馈，需求重点是减少误报、解释限制，而非简单弱化安全机制。  
  参考：[CUDA 调试 #62502](https://github.com/openai/codex/issues/62502)、[本地 UI 任务 #62553](https://github.com/openai/codex/issues/62553)、[文本标记识别 #62528](https://github.com/openai/codex/issues/62528)。

## 6. 开发者关注点

1. **先保护数据，再提高自动化程度。** 跨环境复制和记忆刷新应优先验证同路径检测、原子替换及失败回滚；相关报告尚未确认修复。  
   链接：[#62487](https://github.com/openai/codex/issues/62487)、[#62527](https://github.com/openai/codex/issues/62527)。

2. **“挂起”需要可诊断，而非只显示等待。** 工具调用卡住、长轮询漏唤醒和登录后冻结，需要更明确的阶段日志、超时及恢复入口。  
   链接：[#62539](https://github.com/openai/codex/issues/62539)、[#62530](https://github.com/openai/codex/issues/62530)、[#62516](https://github.com/openai/codex/issues/62516)。

3. **能力与授权边界应在任务开始前说明。** 本地访问能力、浏览器授权状态和安全准入条件不清，会放大用户排障成本。  
   链接：[#62506](https://github.com/openai/codex/issues/62506)、[#62544](https://github.com/openai/codex/issues/62544)、[#62524](https://github.com/openai/codex/issues/62524)。

4. **升级验证应覆盖完整链路，而非只验证单一组件。** 桌面端、CLI、WSL、Code Mode host 与远程工作区之间的组合问题值得重点回归；不能将某个 PR 的关闭直接视为端到端问题已解决。  
   链接：[#62493](https://github.com/openai/codex/issues/62493)、[#62549](https://github.com/openai/codex/issues/62549)、[通信协议调整 PR #62476](https://github.com/openai/codex/pull/62476)。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报｜2026-11-20

> 数据范围：所提供的过去 24 小时 GitHub 更新，共 1 条 Issue、2 条 PR。以下仅分析现有条目，不补足至 10 条；所有 PR 均尚未合并。

## 今日速览

今天的重点是 **MCP 工具信任边界**：一条待分诊 Issue 指出，服务器级信任可能使该服务器后续新增的工具自动跳过确认。两项开放 PR 分别修复嵌套 `.gitignore` 否定规则处理，以及补充 ACP 会话关闭能力；过去 24 小时无新版本发布。

## 社区热点 Issues

### [#30369：MCP 服务器级信任自动覆盖后续新增工具](https://github.com/google-gemini/gemini-cli/issues/30369)

- **状态**：Open，`status/need-triage`；作者 DSHCorrectover。
- **问题**：报告称，一旦用户信任某个 MCP 服务器，该服务器提供的所有工具都会跳过确认，包括用户授权后才新增的工具，不存在“首次出现工具”的再次确认。
- **为什么重要**：这涉及授权粒度与信任边界。用户对服务器的既有信任，可能被延伸为对未来未知工具的授权；对接入第三方或持续更新 MCP 服务的开发者尤其值得关注。
- **社区反应**：目前有 1 条评论、0 个 👍，仍待分诊。报告者称已对照当前 `main` 源码验证，但现有数据未体现维护者结论，不宜视为已确认的安全漏洞。

## 重要 PR 进展

### [#30370：修复 `dir/**` 模式下嵌套 `.gitignore` 的否定规则处理](https://github.com/google-gemini/gemini-cli/pull/30370)

- **状态**：Open；`area/core`、`size/m`；作者 urielefrenvirtusa。
- **修复内容**：修正 `GitIgnoreParser` 对嵌套忽略规则的处理。例如根目录使用 `logs/**`，而 `logs/.gitignore` 使用 `!keep.txt` 时，解析器可能仍错误忽略应被重新纳入的文件。
- **开发者价值**：有助于减少文件发现遗漏，使 CLI 对仓库文件的处理更符合项目配置预期。
- **进展说明**：尚未合并；提供的数据未包含有效评论数，无法判断评审活跃度。

### [#30368：为 ACP 增加会话关闭支持](https://github.com/google-gemini/gemini-cli/pull/30368)

- **状态**：Open；`area/non-interactive`、`size/s`；作者 Navanee45。
- **功能内容**：实现 ACP `session/close` 支持，让客户端能够在 Gemini CLI 进程退出前释放会话；包括初始化时声明关闭能力、处理 `unstable_closeSession` 请求，以及从活跃会话映射中移除会话并释放资源。
- **开发者价值**：完善非交互式客户端的会话生命周期管理，有助于长驻集成及时清理不再使用的会话。
- **进展说明**：尚未合并；提供的数据未包含有效评论数，暂无法判断评审反馈。

## 功能需求趋势

当前仅有 1 条 Issue，**不足以判断广泛社区趋势**。结合两条 PR，可以观察到以下方向：

| 方向 | 本次动态体现的诉求 | 相关条目 |
|---|---|---|
| **MCP 授权粒度** | 区分“信任服务器”与“批准未来新增工具”，提升工具权限变化的可见性 | [#30369](https://github.com/google-gemini/gemini-cli/issues/30369) |
| **仓库文件处理正确性** | 正确处理通配目录与嵌套否定规则，减少文件遗漏 | [#30370](https://github.com/google-gemini/gemini-cli/pull/30370) |
| **客户端集成生命周期** | 支持显式关闭会话，而非等待整个 CLI 进程退出 | [#30368](https://github.com/google-gemini/gemini-cli/pull/30368) |

## 开发者关注点

- **授权是否超出用户预期**：MCP 服务新增工具后是否需要再次确认，是当前最值得跟踪的信任边界问题。后续重点看维护者如何界定服务器级信任的语义。[Issue #30369](https://github.com/google-gemini/gemini-cli/issues/30369)
- **项目文件是否被正确识别**：复杂 `.gitignore` 配置可能导致目标文件被遗漏，影响 CLI 可访问的项目上下文。[PR #30370](https://github.com/google-gemini/gemini-cli/pull/30370)
- **长驻客户端能否及时释放资源**：显式关闭 ACP 会话可使客户端更精细地管理会话与资源，无需结束 CLI 进程。[PR #30368](https://github.com/google-gemini/gemini-cli/pull/30368)

*以上为本次小样本呈现的关注点，不代表已经形成高频社区共识。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-20**  
**仓库：[github/copilot-cli](https://github.com/github/copilot-cli)**

> 统计口径：基于提供的过去 24 小时数据，包含 2 个 Release、9 条更新的 Issue、0 条更新的 PR。Issue 时间字段均为 2026-11-19；以下按本期数据窗口整理，不足 10 条的栏目不补造。

## 1. 今日速览

GitHub Copilot CLI 发布 **v1.0.115-0** 和 **v1.0.115-1**，后者修复了 MCP 登录的 scope 兼容问题，以及直接执行工作流时的扩展注册时序问题。社区反馈集中于 **MCP／Entra 身份认证、多代理任务的缓存成本、模型配置一致性及跨平台稳定性**；9 条 Issue 中 8 条开放、1 条关闭，当前互动较少，尚未形成明显的高热度讨论。

## 2. 版本发布

### [v1.0.115-1](https://github.com/github/copilot-cli/releases/tag/v1.0.115-1)
- **MCP 登录兼容性修复**：当服务器已授予必需权限、但未授予自动请求的刷新令牌 scope 时，登录仍可继续。
- **工作流执行时序修复**：直接执行工作流前，等待项目扩展工作流完成注册，避免注册尚未完成就启动执行。

**开发者价值**：改善远程 MCP 接入兼容性，并降低扩展工作流的启动时序风险。发布说明未明确关联下方 Issue，不宜视为已解决所有 MCP 认证反馈。

### [v1.0.115-0](https://github.com/github/copilot-cli/releases/tag/v1.0.115-0)
- 发布说明仅列出“Fixes and changes”，未提供可进一步分析的具体变更。

## 3. 社区热点 Issues

本期仅有 9 条 Issue，以下按潜在影响与技术关注度排序。**除 #5519 有 1 条评论外，其余均为 0 评论；所有条目均为 0 👍。** 因此，下列“关注度”体现分析优先级，而非已获得社区广泛确认。

| Issue | 关键内容与重要性 | 状态与社区反应 |
|---|---|---|
| [#5526：同步子代理执行期间提示缓存过期](https://github.com/github/copilot-cli/issues/5526) | 报告称，`gemini-4-carbon` 主代理等待同步 `task` 子代理时，提示缓存容易过期，恢复后出现 **94% 缓存未命中率、约 20 倍输入成本惩罚**。若可复现，将直接影响多代理长任务的成本可预测性。上述数字为报告者描述。 | **开放／待分诊**；0 评论、0 👍，尚无后续讨论佐证。 |
| [#5519：BYOK 与版本兼容性问题](https://github.com/github/copilot-cli/issues/5519) | 标题称最新版本或高于 `1.0.107` 的版本破坏 BYOK；摘要涉及本地模型目录归属验证及组织默认模型不可用。影响自托管模型接入与升级决策。 | **已关闭**；1 评论、0 👍。所给数据未说明关闭原因，不能据此认定已修复。 |
| [#5525：Windows 下访客租户 MCP 认证失败](https://github.com/github/copilot-cli/issues/5525) | 报告称已发现正确的资源租户，但 Windows broker 后续仍使用 `/common`，导致 Entra 跨租户资源认证失败。影响企业 B2B／访客账号接入。 | **开放／待分诊**；0 评论、0 👍。 |
| [#5524：为远程 MCP 增加动态请求头 helper](https://github.com/github/copilot-cli/issues/5524) | 当前静态 `headers` 与配置加载时的一次性变量展开难以支持短期凭据；请求提供类似 Claude Code `headersHelper` 的机制。关系到远程 MCP 的持续认证能力。 | **开放／待分诊**；0 评论、0 👍。 |
| [#5523：验证 Copilot CLI Entra 应用](https://github.com/github/copilot-cli/issues/5523) | 用户反馈 Entra 登录涉及的应用显示为“未验证”，影响管理员对应用可信度的判断。属于企业授权体验与采用门槛问题，不等同于已发现安全漏洞。 | **开放／待分诊**；0 评论、0 👍。 |
| [#5518：Gemini 推理强度声明与用量记录不一致](https://github.com/github/copilot-cli/issues/5518) | `gemini-4-neon`、`gemini-4-hydrogen` 在 `task` schema 中声明支持 `xhigh`，但报告称交互选择器或用量记录未体现一致行为。影响模型能力判断与调用审计。 | **开放／待分诊**；0 评论、0 👍。 |
| [#5522：为用户主动调用的技能增加 Hook](https://github.com/github/copilot-cli/issues/5522) | 请求为斜杠命令触发的技能提供 Hook，或为 `userPromptTransformed` 增加 matcher，以统一执行依赖检查和插件规则。对集中管理插件的团队尤为重要。 | **开放／待分诊**；0 评论、0 👍。 |
| [#5521：Linux 将 Perforce depot 通配路径误判为 UNC](https://github.com/github/copilot-cli/issues/5521) | 报告称 `//depot/project/dir/*` 被误判并触发内容排除，在调用 `p4` 前阻断只读命令。影响 Perforce 工作流，也暴露路径解析与策略判断的兼容边界。 | **开放／待分诊**；0 评论、0 👍。 |
| [#5520：macOS 扩展宿主退出挂起并占用端口](https://github.com/github/copilot-cli/issues/5520) | 报告称应用退出后扩展宿主未结束，`process.exit(0)` 挂起，遗留进程继续持有监听端口。可能影响重启、资源释放和本地调试。 | **开放／待分诊**；0 评论、0 👍。 |

## 4. 重要 PR 进展

**本期提供的数据中，没有过去 24 小时内更新的 PR**，因此无可列出的功能或修复进展，也无法据此判断上述 Issue 是否已有对应实现。

入口：[仓库 Pull Requests](https://github.com/github/copilot-cli/pulls)

## 5. 功能需求趋势

### 企业身份认证与远程 MCP 接入是最集中的方向
相关反馈覆盖访客租户认证、动态凭据刷新和 Entra 应用验证，说明需求正从“能够连接”延伸到“适配企业身份体系并长期稳定运行”。

关联：[#5525](https://github.com/github/copilot-cli/issues/5525)、[#5524](https://github.com/github/copilot-cli/issues/5524)、[#5523](https://github.com/github/copilot-cli/issues/5523)。

### 多代理任务需要更好的成本与行为可观测性
同步子代理等待期间的缓存失效，以及推理强度声明与用量记录不一致，都指向开发者对**实际执行参数、缓存状态和成本结果**的透明度需求。

关联：[#5526](https://github.com/github/copilot-cli/issues/5526)、[#5518](https://github.com/github/copilot-cli/issues/5518)。

### 可扩展性需求转向统一治理与生命周期可靠性
插件维护者希望不同技能入口都能执行一致的前置检查；扩展宿主退出异常则反映了对资源清理和进程管理的要求。

关联：[#5522](https://github.com/github/copilot-cli/issues/5522)、[#5520](https://github.com/github/copilot-cli/issues/5520)。

### 异构开发环境仍需兼容性保障
本地模型 BYOK 与 Linux Perforce 的反馈表明，模型接入、路径解释及组织策略需要覆盖非默认工作流。

关联：[#5519](https://github.com/github/copilot-cli/issues/5519)、[#5521](https://github.com/github/copilot-cli/issues/5521)。

## 6. 开发者关注点

- **升级后的模型接入是否可靠**：依赖 BYOK／本地模型的团队，升级前宜验证模型发现、默认模型选择和实际调用链路。参考 [#5519](https://github.com/github/copilot-cli/issues/5519)。
- **长任务的缓存收益能否持续**：运行同步子代理时，应关注恢复后的缓存命中与输入用量，避免仅按初始缓存状态估算成本。参考 [#5526](https://github.com/github/copilot-cli/issues/5526)。
- **企业认证能否覆盖真实租户关系与凭据生命周期**：访客账号、短期令牌、应用验证提示是不同层面的问题，不能仅凭本次 MCP scope 修复认定均已解决。参考 [#5525](https://github.com/github/copilot-cli/issues/5525)、[#5524](https://github.com/github/copilot-cli/issues/5524)、[#5523](https://github.com/github/copilot-cli/issues/5523)。
- **配置声明是否与运行结果一致**：使用高推理强度前，宜核对模型选择器、工具 schema 和用量记录，避免把声明支持等同于实际生效。参考 [#5518](https://github.com/github/copilot-cli/issues/5518)。
- **治理与安全控制需要准确而完整**：既要覆盖用户主动触发的技能入口，也要避免误阻断合法的 Perforce 路径。参考 [#5522](https://github.com/github/copilot-cli/issues/5522)、[#5521](https://github.com/github/copilot-cli/issues/5521)。

**总体判断：** 本期更值得关注的是现有能力在企业身份、多代理执行和复杂开发环境中的可靠性，而非新功能数量。多数反馈仍处于待分诊阶段，影响范围与修复计划需继续跟踪。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-11-20

## 今日速览

过去 24 小时没有新 Release，社区讨论重点集中在 **V2 长驻服务稳定性、跨平台资源管理和模型接入兼容性**；其中，macOS 下 `edit` 工具卡死的报告以 9 条评论成为所展示 Issue 中讨论最多的话题。PR 侧持续推进日志敏感信息保护、inotify 耗尽时的容错、Windows 子进程管理与 TUI 性能优化，同时出现 Code Mode、无人值守会话等能力扩展。

> **统计口径**：本期数据包含过去 24 小时更新的 50 条 Issues、50 条 PR，以下分析基于展示的 30 条 Issues 和 20 条 PR。PR 评论字段缺失，不据此判断讨论热度；**CLOSED 不等于已合并，Issue 关闭也不代表修复已发布**。

## 社区热点 Issues

| Issue | 重要性与影响 | 社区反应及状态 |
|---|---|---|
| **[① #64869：长驻服务中 `edit` 对特定文件永久卡住](https://github.com/anomalyco/opencode/issues/64869)** | 同一路径上 `write` 成功，独立服务中的 `edit` 也正常，说明问题可能与长驻服务状态有关。直接影响 Agent 修改代码的核心流程。 | **OPEN，9 条评论**，为展示列表中讨论最多的 Issue；尚无修复结论。 |
| **[② #64914：Linux/KDE 桌面进程泄漏 inotify 实例](https://github.com/anomalyco/opencode/issues/64914)** | 持续运行后耗尽每用户实例配额，影响文件监听，并可能波及同一用户下的其他应用。 | **OPEN，1 条评论**；另有针对 inotify 耗尽后服务挂起的容错 PR，但不能视为泄漏根因已解决。 |
| **[③ #64896：Windows 内存耗尽后会话 drain 失败](https://github.com/anomalyco/opencode/issues/64896)** | 报告中 Agent 启动的进程使用约 40 GB 虚拟内存，桌面被系统终止，后续启动又遇到 SQLite 内存不足错误。暴露资源耗尽后的恢复风险。 | **OPEN，2 条评论**；尚无恢复方案或修复信息。 |
| **[④ #64835：macOS 上受信任证书链仍触发 TLS 错误](https://github.com/anomalyco/opencode/issues/64835)** | 独立 CLI 访问特定 WoTrus/Sectigo 证书链端点时出现 `UNABLE_TO_GET_ISSUER_CERT`，阻断模型连接。 | **OPEN，3 条评论**；报告提供了运行环境与证书链细节，便于排查信任链兼容性。 |
| **[⑤ #64854：Microsoft Entra MCP OAuth issuer 不匹配](https://github.com/anomalyco/opencode/issues/64854)** | Entra 元数据中的 `{tenantid}` 占位符与客户端校验预期不一致，导致组织租户登录失败，影响企业 MCP 接入。 | **OPEN，1 条评论，带 `reproduced` 标签**，已有复现信号。 |
| **[⑥ #64846：MCP OAuth 错误回放拒绝有效登录](https://github.com/anomalyco/opencode/issues/64846)** | Ory Network 授权在 macOS Safari 场景下间歇失败，涉及授权回调与错误处理的可靠性。 | **OPEN，1 条评论，带 `status/repro-simulated` 标签**；仍需验证真实场景覆盖。 |
| **[⑦ #64866：Windows 桌面不加载已激活的 GUI 插件](https://github.com/anomalyco/opencode/issues/64866)** | 服务已报告 `features.gui: true`，手动请求也能获取 bundle，但桌面未发起加载请求，影响插件功能交付。 | **OPEN，2 条评论**；报告已将排查范围缩小到桌面端加载链路。 |
| **[⑧ #64863：Windows 换行符导致 diff 显示整文件变化](https://github.com/anomalyco/opencode/issues/64863)** | `core.autocrlf=true` 时，OpenCode diff 与原生 Git 结果不一致。报告称旧版修复在 V2 重写后回归，影响代码审查准确性。 | **CLOSED，1 条评论，带 `reproduced` 标签**；数据未提供关闭原因或交付版本。 |
| **[⑨ #64898：Go 套餐促销额度与用量百分比不一致](https://github.com/anomalyco/opencode/issues/64898)** | 用户质疑 GLM-5.3 促销额度与配额仪表盘无法对应，影响成本预期与额度透明度。 | **CLOSED，3 条评论**；不能据此确认计量逻辑有误或问题已修复。 |
| **[⑩ #64851：CLI JSON 输出遗漏后台完成及压缩完成通知](https://github.com/anomalyco/opencode/issues/64851)** | `opencode run --format json` 的事件覆盖不足，会让外部编排器难以完整跟踪后台任务和会话状态。 | **OPEN，1 条评论，功能需求**；对自动化集成的价值高于一般界面改进。 |

## 重要 PR 进展

以下为提案或代码变更方向，**不代表已进入正式发行版**。

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| **[① #64911：避免 CLI 日志记录服务密码](https://github.com/anomalyco/opencode/pull/64911)** | OPEN | 防止启动及失败日志中的完整参数列表暴露 `service set password` 的密码，属于值得优先审查的敏感信息保护修复。 |
| **[② #64913：inotify 耗尽时跳过目录监听，避免服务挂起](https://github.com/anomalyco/opencode/pull/64913)** | OPEN | 在无法创建监听实例时进行降级处理，提高资源不足场景下的可用性；不等同于解决实例泄漏。 |
| **[③ #64915：跳过没有行变化的 TUI transcript 重建](https://github.com/anomalyco/opencode/pull/64915)** | OPEN | 减少会话刷新时不必要的历史行重建，针对多任务运行时的性能开销。关联 #63358。 |
| **[④ #64901：Windows 管道进程先挂起创建，再加入 Job](https://github.com/anomalyco/opencode/pull/64901)** | CLOSED | 调整进程创建时序，处理 Microsoft Store PowerShell 7 并行执行 shell 命令失败的问题。关联 #64803、#63892。 |
| **[⑤ #64902：将 Store 应用子进程保留在 Windows 管道 Job 中](https://github.com/anomalyco/opencode/pull/64902)** | OPEN | 基于 #64901 的堆叠 PR，继续完善 Store PowerShell 子进程的 Job 管理；应结合前置 PR 审查。 |
| **[⑥ #64917：避免每轮回复被折叠进活动分组](https://github.com/anomalyco/opencode/pull/64917)** | OPEN | 修正 watch 事件多次唤醒会话时的回复分组，提升多轮自动执行结果的可读性。 |
| **[⑦ #64908：Code Mode 支持 getter/setter](https://github.com/anomalyco/opencode/pull/64908)** | CLOSED | 为 Code Mode 字节码 VM 的普通对象增加程序定义的 getter/setter，扩展语言表达能力。 |
| **[⑧ #64895：watch 持续唤醒无人值守会话](https://github.com/anomalyco/opencode/pull/64895)** | CLOSED | 为 `console_watch.watch` 增加可选 `unattended` 标志，使 watch 更新可持续唤醒会话，拓展长期自动化场景。 |
| **[⑨ #64887：跨已打开会话标签自动接受权限](https://github.com/anomalyco/opencode/pull/64887)** | CLOSED | 将权限回复处理移至 App 生命周期，覆盖自动接受模式下的后台标签及其子会话。关联 #44007、#63527。 |
| **[⑩ #64892：将 OpenAI `cyber_policy` 拒绝识别为内容策略错误](https://github.com/anomalyco/opencode/pull/64892)** | CLOSED | 区分策略拒绝与未知服务商错误，帮助客户端采取更准确的错误提示和重试策略；带 `needs:compliance` 标签。 |

## 功能需求趋势

以下是展示样本中的方向性信号，不构成完整社区需求排名。

- **自动化与外部编排需要更完整的接口契约。** CLI JSON 事件缺失，以及希望在 `model.list` 中提供 `canonical_model_id` 的需求，都反映开发者希望获得可机器消费、语义稳定的状态与模型元数据。  
  相关：[CLI 事件完整性 #64851](https://github.com/anomalyco/opencode/issues/64851)、[模型标准标识 #64845](https://github.com/anomalyco/opencode/issues/64845)。

- **模型接入关注点从“数量”扩展到“可用性与透明度”。** 除新增 OpenAI-compatible 服务商外，启动等待时间、额度展示、地域设置和免费模型认证也在影响实际使用。  
  相关：[mammouth.ai 接入 #64855](https://github.com/anomalyco/opencode/issues/64855)、[Claude 启动超时 #64849](https://github.com/anomalyco/opencode/issues/64849)、[地域设置缺失 #64904](https://github.com/anomalyco/opencode/issues/64904)。

- **企业 MCP 接入更需要兼容复杂身份系统。** Entra issuer 校验和 OAuth 回调异常表明，真实授权服务的兼容性是当前接入难点；另有 OAuth 客户端名称统一需求。  
  相关：[#64854](https://github.com/anomalyco/opencode/issues/64854)、[#64846](https://github.com/anomalyco/opencode/issues/64846)、[客户端名称 #64900](https://github.com/anomalyco/opencode/issues/64900)。

- **会话管理与插件体验仍有明显改进空间。** 用户要求更方便的会话删除、Skills 安装，并反馈移动端空会话反复出现、桌面 GUI 插件不加载。  
  相关：[会话与 Skills 管理 #64883](https://github.com/anomalyco/opencode/issues/64883)、[Android 空会话 #64811](https://github.com/anomalyco/opencode/issues/64811)、[GUI 插件 #64866](https://github.com/anomalyco/opencode/issues/64866)。

## 开发者关注点

1. **长时间运行后的可靠性。** 文件编辑卡死、inotify 耗尽和内存不足后的启动异常，说明验证不应只覆盖首次启动，还应覆盖长会话、资源压力与异常恢复。  
   参考：[#64869](https://github.com/anomalyco/opencode/issues/64869)、[#64914](https://github.com/anomalyco/opencode/issues/64914)、[#64896](https://github.com/anomalyco/opencode/issues/64896)。

2. **V2 的跨平台回归风险。** Windows 换行符、加密虚拟盘路径，以及音频端点切换后的通知失效，都是通用测试环境不易覆盖的边界条件。  
   参考：[#64863](https://github.com/anomalyco/opencode/issues/64863)、[#64905](https://github.com/anomalyco/opencode/issues/64905)、[#64893](https://github.com/anomalyco/opencode/issues/64893)。

3. **集成生命周期缺少足够弹性。** ACP 冷启动插件等待、Claude SDK 初始化超时和 GUI 插件加载问题，提示启动时序、超时策略及错误诊断需要更清晰。  
   参考：[#64853](https://github.com/anomalyco/opencode/issues/64853)、[#64849](https://github.com/anomalyco/opencode/issues/64849)、[#64866](https://github.com/anomalyco/opencode/issues/64866)。

4. **错误应当可解释，日志必须安全。** 策略拒绝不应被混同为未知故障，服务密码也不应进入诊断日志；这两类改进直接影响自动重试逻辑与排障安全。  
   参考：[PR #64892](https://github.com/anomalyco/opencode/pull/64892)、[PR #64910](https://github.com/anomalyco/opencode/pull/64910)、[PR #64911](https://github.com/anomalyco/opencode/pull/64911)。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-20

> 基于所提供的过去 24 小时 GitHub 数据。来源标注为 `badlogic/pi-mono`，条目指向 `earendil-works/pi`，下文链接按条目仓库生成。**Closed 仅表示已关闭，不代表已修复或已合并。**

## 今日速览

今日无新版本发布，社区反馈主要集中在 **Provider 适配、缓存与成本准确性，以及终端和运行时稳定性**。最值得跟进的开放 PR 包括 Codex 系统提示词缓存、GitHub Copilot 模型列表刷新，以及绝对路径补全时误发送提示词的修复。

本批数据包含 **19 个 Issue、5 个 PR**；其中 18 个 Issue 已关闭，但缺少关闭原因及评论正文，尚不能据此判断问题是否解决。

## 社区热点 Issues

以下按潜在影响与开发者相关性筛选 10 项。所有 Issue 均为 0 赞，单条评论数为 0–3，当前热度更多体现为问题覆盖面，而非大量社区讨论。

| Issue | 核心问题与重要性 | 社区反应与状态 |
|---|---|---|
| [#12318 Anthropic 登录遭遇 Unknown scope](https://github.com/earendil-works/pi/issues/12318) | Claude Team 席位用户通过 Anthropic `/login` 登录时，授权请求在同意页面出现前就被拒绝。影响团队账户接入；标题同时涉及 Enterprise，摘要明确描述的是 Team 场景。 | **Closed · 3 评论**，为本批评论最多的 Issue；未提供解决结论。 |
| [#12323 npm 扩展工具无法随会话恢复](https://github.com/earendil-works/pi/issues/12323) | 同一工具以本地文件扩展安装时能恢复，以 npm 包安装时却不能；`/reload` 也无效。直接影响扩展分发和跨进程会话连续性。 | **Closed · 2 评论**；报告认为此前 #11062 的修复仍不完整。 |
| [#12311 模型目录重复合并导致性能问题](https://github.com/earendil-works/pi/issues/12311) | 带 `fetchModels` 的 Provider 在每次 `getModels()` 时重新合并目录，并逐项执行 `findIndex`。大模型目录可能放大重复计算成本。 | **Closed · 2 评论**；报告提供了代码位置，便于定位。 |
| [#12310 Codex 错误重试不可重试的 HTTP 请求](https://github.com/earendil-works/pi/issues/12310) | 设置 `maxRetries > 0` 后，HTTP 400 等本不应重试的错误仍会被重复发送。可能增加失败等待时间和无效请求量。 | **Closed · 2 评论**；报告明确描述了重试次数与错误分类路径。 |
| [#12308 OpenAI 服务等级成本计算偏低](https://github.com/earendil-works/pi/issues/12308) | `ultrafast`、Codex 的 `fast` 及通过 `onPayload` 设置的服务等级存在计价遗漏，导致 `usage.cost` 低估费用。对预算监控和成本归因尤为重要。 | **Closed · 2 评论**；覆盖多个计价路径，尚无修复确认。 |
| [#12327 自动压缩误判输出长度限制](https://github.com/earendil-works/pi/issues/12327) | 上游或代理单轮输出上限低于模型配置时，`stopReason === 'length'` 可能触发不必要的上下文压缩。影响自定义网关下的会话行为。 | **Closed · 1 评论**；提供了具体网关环境与模型配置。 |
| [#12317 Windows 瞬时终端错误导致进程退出](https://github.com/earendil-works/pi/issues/12317) | stdin/stdout/stderr 出现一次 `EIO`、`EPIPE` 等错误即可触发退出。报告指出切换标签、休眠唤醒等普通操作也可能中断正在进行的任务。 | **Closed · 1 评论**；诉求是提高终端 I/O 容错能力。 |
| [#12305 托管安装仍可能依赖发行版 Node.js](https://github.com/earendil-works/pi/issues/12305) | CachyOS 更新后，系统 Node.js 因缺少 `libsimdjson.so.36` 无法启动，连带导致 Pi 不可用。问题指向托管安装的运行时隔离边界。 | **Closed · 1 评论**；同批有相关报告 #12315 和 PR #12304。 |
| [#12303 Read 工具取消时存在进程崩溃窗口](https://github.com/earendil-works/pi/issues/12303) | `read.execute` 在 MIME 检测和读取流启动之间收到 abort 信号，可能导致整个进程崩溃。对 SDK 集成和可取消任务的可靠性影响较大。 | **Closed · 1 评论**；报告称无需扩展即可复现。 |
| [#12309 绝对路径补全时 Enter 误发送提示词](https://github.com/earendil-works/pi/issues/12309) | 用户按 Enter 选择补全项时，路径被补全后整段未完成提示词也被提交。属于可能触发非预期 Agent 执行的交互缺陷。 | **Open · 0 评论**；已有对应开放 PR [#12312](https://github.com/earendil-works/pi/pull/12312)。 |

## 重要 PR 进展

本批仅提供 **5 个 PR**，以下全部列出，不补造至 10 个。PR 评论字段均缺失，无法评估评审活跃度。

### 1. [#12325 刷新 GitHub Copilot 可用模型列表](https://github.com/earendil-works/pi/pull/12325) — Open
修复 `availableModelIds` 仅在令牌刷新时更新的问题，避免账号新获得的模型——包括新上线或管理员启用的模型——仍被过滤隐藏。还涉及令牌过期场景下的回归问题，关联 #11006。

### 2. [#12319 让 Codex 系统提示词可被缓存](https://github.com/earendil-works/pi/pull/12319) — Open
针对当前将系统提示词放入顶层 `instructions` 的方式提出调整。按 PR 说明，该字段不进入相关模型的可缓存输入前缀；修复意在提高重复请求的提示词缓存利用率。

### 3. [#12312 修复绝对路径补全误提交](https://github.com/earendil-works/pi/pull/12312) — Open
区分绝对路径补全与斜杠命令补全，避免仅因补全前缀以 `/` 开头，就在 Enter 确认后提交提示词。对应 Issue #12309，直接改善终端输入安全性和可预期性。

### 4. [#12313 为 Qwen 个人套餐补充模型](https://github.com/earendil-works/pi/pull/12313) — Closed
拟将 `qwen4-max-preview` 纳入 `qwen-token-plan-individual` 及其中国区目录的允许列表，使个人套餐目录与上游模型数据保持一致。**是否合并未提供。**

### 5. [#12304 使用启动器 Node.js 测试托管更新](https://github.com/earendil-works/pi/pull/12304) — Closed
拟让托管更新的冒烟测试使用启动器对应的 Node.js，减少测试运行时与实际启动运行时不一致的问题。与 CachyOS 系统更新后 Node.js 动态库失配事件相关。**是否合并未提供。**

## 功能需求趋势

- **Provider 能力识别需要摆脱静态假设。** 社区希望非 `gemini-` 前缀的模型也能获得 Gemini 能力，并补齐 Copilot 模型的缓存及工具兼容标记。模型名称、目录与能力声明之间的一致性成为焦点。  
  相关：[Gemini 识别 #12321](https://github.com/earendil-works/pi/issues/12321)、[Copilot 能力标记 #12316](https://github.com/earendil-works/pi/issues/12316)。

- **缓存、计费与会话身份需要更精细的控制。** 除计价准确性外，开发者希望将 Provider 路由用 session ID 与本地存储 ID 分离，以便 fork 会话延续缓存收益。  
  相关：[会话 ID 解耦 #12307](https://github.com/earendil-works/pi/issues/12307)、[服务等级计价 #12308](https://github.com/earendil-works/pi/issues/12308)。

- **持久化 Agent 需要更强的恢复与调度语义。** 需求不止是“恢复会话”，还包括恢复扩展工具、暂缓旧任务、接纳新任务，以及按 ID 单独释放任务。  
  相关：[恢复任务调度 #12306](https://github.com/earendil-works/pi/issues/12306)、[扩展工具恢复 #12323](https://github.com/earendil-works/pi/issues/12323)。

- **终端体验关注可解释性和输入一致性。** 用户希望 Mermaid 超宽降级能说明原因、已发送消息能增加显示侧栏，同时修复 Windows 图片粘贴变成 base64 文本的问题。  
  相关：[Mermaid 降级提示 #12324](https://github.com/earendil-works/pi/issues/12324)、[消息侧栏 #12326](https://github.com/earendil-works/pi/issues/12326)、[Windows 粘贴 #12322](https://github.com/earendil-works/pi/issues/12322)。

## 开发者关注点

1. **错误处理需要准确区分“应重试”与“不应重试”。** 一边是 HTTP 400 被重复发送，另一边是 `stream interrupted` 因措辞差异未被重试规则覆盖。  
   相关：[#12310](https://github.com/earendil-works/pi/issues/12310)、[#12328](https://github.com/earendil-works/pi/issues/12328)。

2. **宿主进程不应因局部异常轻易退出。** 终端瞬时错误和工具取消竞态都可能升级为整个 Agent 崩溃，影响长任务与嵌入式 SDK 使用。  
   相关：[#12317](https://github.com/earendil-works/pi/issues/12317)、[#12303](https://github.com/earendil-works/pi/issues/12303)。

3. **代理与自定义 Provider 场景正在暴露兼容边界。** 输出上限、模型命名和能力推断不一定符合默认 Provider 假设，需要更显式的配置与判断。  
   相关：[#12327](https://github.com/earendil-works/pi/issues/12327)、[#12321](https://github.com/earendil-works/pi/issues/12321)。

4. **“已关闭”与“用户可获得修复”需要分开追踪。** 今日应优先关注三个开放 PR 的后续评审与发布归属，而不是仅凭 Issue 关闭状态判断问题消失。  
   跟进：[Copilot 模型刷新 #12325](https://github.com/earendil-works/pi/pull/12325)、[Codex 缓存 #12319](https://github.com/earendil-works/pi/pull/12319)、[路径补全 #12312](https://github.com/earendil-works/pi/pull/12312)。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-11-20｜仓库：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

> 统计口径：基于提供的过去 24 小时数据，条目所示更新时间均为 11 月 19 日。共涉及 20 条 Issue、50 条更新 PR；PR 分析仅覆盖已展示的 20 条，评论数缺失，不据此判断讨论热度。过去 24 小时无新版本发布。

## 1. 今日速览

今天的重点是 **MCP 权限边界、Managed Agent 稳定性与 Web Shell 体验优化**：社区报告了 AUTO 模式下可信 MCP 服务器新增工具免审的问题，以及 Managed Agent 主分支 CI 持续失败的问题。PR 侧则集中推进数据库查询优化、子会话工作区审批，以及首条消息提交、历史加载输入和终端按需加载等交互改进；这些重点 PR 目前均处于开放状态，尚不能视为已交付。

## 2. 社区热点 Issues

以下按风险与开发者影响筛选，评论数仅反映当前讨论规模；所列 Issue 均为 0 👍。

| Issue | 重要性与影响 | 社区反应 / 当前状态 |
|---|---|---|
| **[⑴ #17854：MCP 服务器级信任绕过 AUTO 分类器](https://github.com/QwenLM/qwen-code/issues/17854)** | 报告指出，已信任服务器后续新增的工具也可绕过 LLM 分类审查。核心问题是**信任授权是否应自动覆盖未来工具**，涉及执行安全边界。 | **P1，开放，3 条评论**。报告依据为源码结构分析，未提供动态复现；需继续关注维护者确认及授权语义调整。 |
| **[⑵ #17851：Managed Agent full tier 长期失败](https://github.com/QwenLM/qwen-code/issues/17851)** | 据报告，主分支自至少 11 月 11 日起持续出现 Hosted failover E2E 超时，涉及第二轮执行的 `runtime_preparation_timeout`。长期红灯会削弱 CI 对新回归的识别能力。 | **P1，开放，2 条评论**。报告强调失败独立于当前开放 PR，值得作为基础设施问题优先排查。 |
| **[⑶ #17802：Windows 盘符路径权限规则不匹配](https://github.com/QwenLM/qwen-code/issues/17802)** | 带盘符的绝对路径规则无法匹配，影响 `allow`、`ask`、`deny`，也影响 “Always Allow” 写入的规则，兼具安全与可用性风险。 | **P1，已关闭，2 条评论**。现有数据未给出关闭原因、修复提交或发布版本，不能直接认定用户侧已修复。 |
| **[⑷ #17832：连接中的 MCP 服务器被误判失败](https://github.com/QwenLM/qwen-code/issues/17832)** | VS Code companion 中，启动较慢的服务器被报告为失败；稍后到达的工具进入会话注册表，却未传递给模型。问题指向工具发现与会话初始化的时序衔接。 | **P2，开放，3 条评论**，标记 `ready-for-human`，等待人工处理。 |
| **[⑸ #17835：Auto-memory 后台轮次缺少 Stop hook](https://github.com/QwenLM/qwen-code/issues/17835)** | 主轮次结束后，记忆后台任务仍发出工具事件，却不发出对应 `Stop`，导致 Orca 等依赖 hooks 的状态追踪器一直显示“工作中”。 | **P2，开放，2 条评论**。反映后台轮次事件生命周期需要更清晰的完成语义。 |
| **[⑹ #17819：后台命令仍运行，会话却显示空闲](https://github.com/QwenLM/qwen-code/issues/17819)** | Web Shell 的后台工作标记会在命令尚未完成时消失，可能误导用户判断任务是否结束。 | **P2，开放，2 条评论**。与 hooks 状态问题共同暴露出前端状态和后台执行生命周期不一致的痛点。 |
| **[⑺ #17816：冷会话 artifact 面板恢复失败](https://github.com/QwenLM/qwen-code/issues/17816)** | 恢复的 artifact 标签引用未加载会话时，面板直接显示 `No session with id`。影响跨会话产物查看与持久化布局恢复。 | **P2，开放，3 条评论**。问题涉及 Web Shell、daemon 与会话加载边界。 |
| **[⑻ #17813：Managed Agent 交互卡片后续能力](https://github.com/QwenLM/qwen-code/issues/17813)** | 跟踪钉钉私聊交互卡片之外的后续工作，包括真实租户冒烟验证、其他 provider、读模型元数据、流式输出和群卡片。 | **P2，开放，3 条评论**。属于已落地卡片能力的延伸需求，而非这些扩展功能已完成。 |
| **[⑼ #17798：Changes 面板长 diff 行不换行](https://github.com/QwenLM/qwen-code/issues/17798)** | Web Shell 的 diff 对话框为长行提供逐行横向滚动，增加代码审查时的阅读成本，影响 Desktop 与 `qwen serve` Web 模式。 | **P3，开放，5 条评论**，是本批 Issue 中评论最多的一条，说明基础审查体验仍受关注。 |
| **[⑽ #17791：Web Shell activity E2E 间歇失败](https://github.com/QwenLM/qwen-code/issues/17791)** | 优先级排序与未读清除用例整文件执行时偶发失败、单独执行却通过，提示需要排查共享状态或时间相关依赖。 | **P2，开放，3 条评论**。对测试可信度有直接影响，不能只凭单测独立通过判断问题消失。 |

## 3. 重要 PR 进展

**以下 10 项均为 OPEN：内容代表拟议变更，不代表已经合并或发布。**

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| **[⑴ #17863：细化子会话工作区审批](https://github.com/QwenLM/qwen-code/pull/17863)** | 在权限评估前解析显式选择的工作区；若解析后仍是调用方当前运行时，则走普通权限流程。 | 让 `create_sub_session` 的工作区识别与审批行为更一致。 |
| **[⑵ #17856：限制 Managed Agent 热路径 SQL 扫描](https://github.com/QwenLM/qwen-code/pull/17856)** | 重写高频读取路径，通过查询投影、复合索引等减少扫描量与数据库往返。 | 避免请求成本随无关历史数据增长，是服务规模化的重要优化。 |
| **[⑶ #17846：跨会话批量查询 artifact 可用性](https://github.com/QwenLM/qwen-code/pull/17846)** | 对非空 artifact 页面，通过一次数据库查询获取相关来源会话的发布回执，并保留作用域匹配。 | 减少跨会话产物列表的查询开销，同时保持租户、工作区和会话边界。 |
| **[⑷ #17864：收敛预生产版本兼容机制](https://github.com/QwenLM/qwen-code/pull/17864)** | 移除 Managed Agent 服务端与 hosted worker 的滚动升级兼容机制，将相关格式收敛为单一形态。 | 降低预生产系统的兼容分支和维护复杂度；属于架构简化，而非功能扩展。 |
| **[⑸ #17865：稳定 Managed Agent 必需检查名称](https://github.com/QwenLM/qwen-code/pull/17865)** | 将影响合并的检查上下文统一为 `Managed Agent gate`，覆盖多种 PR、主分支及 merge group 场景。 | 减少检查名称变化与分支保护规则之间的不一致；不等同于修复运行时超时。 |
| **[⑹ #17862：合并后台轮次实时文本片段](https://github.com/QwenLM/qwen-code/pull/17862)** | 将已验证的后台轮次 ID 纳入 live-journal 分段标识，合并兼容的消息与思考片段。 | 改善后台输出流的分段与回放一致性；不应视为已解决缺失 `Stop` hook 的问题。 |
| **[⑺ #17843：首条提示不再等待自动标题写入](https://github.com/QwenLM/qwen-code/pull/17843)** | 会话就绪后立即提交首条消息，自动标题在后台保存，并处理已有标题及并发写入情况。 | 缩短首轮交互等待，避免标题生成成为消息提交的阻塞环节。 |
| **[⑻ #17842：加载历史时允许编辑草稿](https://github.com/QwenLM/qwen-code/pull/17842)** | 主视图与分屏在历史加载期间允许输入，但继续禁用发送，待会话就绪后恢复。 | 将“可编辑”和“可发送”状态分离，减少切换会话时的输入阻塞。 |
| **[⑼ #17840：按需加载 xterm](https://github.com/QwenLM/qwen-code/pull/17840)** | 在工作区终端启用或 managed terminal 打开时，再加载 xterm、FitAddon 和样式，并展示加载状态。 | 减少不使用终端时的前端加载负担。 |
| **[⑽ #17866：Markdown 图片失败时降级为文本](https://github.com/QwenLM/qwen-code/pull/17866)** | 将本地路径图片及加载失败图片转换为可读、可选中的文本 chip，替代破损图片占位符。 | 提升聊天记录中本地资源与失效资源的可读性，便于复制路径和排查问题。 |

## 4. 功能需求趋势

### ① 权限控制从“能配置”走向“边界准确”
MCP 服务器信任是否覆盖未来工具、Windows 路径规则是否真正生效，说明社区关注点已深入授权粒度和跨平台一致性。  
相关：[MCP 信任边界 #17854](https://github.com/QwenLM/qwen-code/issues/17854) · [Windows 权限规则 #17802](https://github.com/QwenLM/qwen-code/issues/17802)

### ② 后台任务需要完整、可观测的生命周期
缺失结束事件、后台运行却显示空闲，表明用户需要明确区分“主轮次结束”和“所有后台工作结束”，而非仅依赖一个会话忙闲状态。  
相关：[Auto-memory hooks #17835](https://github.com/QwenLM/qwen-code/issues/17835) · [后台工作状态 #17819](https://github.com/QwenLM/qwen-code/issues/17819)

### ③ 会话与产物管理向跨会话、持久化场景深化
冷会话 artifact 恢复、会话列表产物摘要、JSONL 写入诊断等议题，反映会话管理正从基础保存转向恢复可靠性、可观测性与跨平台验证。  
相关：[冷会话恢复 #17816](https://github.com/QwenLM/qwen-code/issues/17816) · [JSONL 后续验证 #17852](https://github.com/QwenLM/qwen-code/issues/17852)

### ④ Managed Agent 从单点能力向多渠道运营扩展
交互卡片后续需求覆盖其他 provider、群聊、流式输出和真实租户验证；GitHub PR-watch 也在继续补齐集成与审查后续项。  
相关：[交互卡片扩展 #17813](https://github.com/QwenLM/qwen-code/issues/17813) · [PR-watch 后续 #17792](https://github.com/QwenLM/qwen-code/issues/17792)

### ⑤ Web Shell 更重视日常操作与移动端可用性
需求集中于 diff 阅读、工作区选择和移动端输入，而不是单纯增加入口。iOS Safari 键盘遮挡发送按钮的问题尤其说明跨端交互仍需打磨。  
相关：[diff 换行 #17798](https://github.com/QwenLM/qwen-code/issues/17798) · [工作区选择 #17797](https://github.com/QwenLM/qwen-code/issues/17797) · [iOS 发送按钮 #17859](https://github.com/QwenLM/qwen-code/issues/17859)

## 5. 开发者关注点

- **CI 信号需要重新变得可信。** 长期失败、偶发失败和暂定失败报告并存，应区分真实回归、环境问题与测试非确定性，避免简单重跑掩盖原因。相关：[主分支持续失败 #17851](https://github.com/QwenLM/qwen-code/issues/17851)、[钉钉测试排查 #17834](https://github.com/QwenLM/qwen-code/issues/17834)、[暂定 CI 报告 #17849](https://github.com/QwenLM/qwen-code/issues/17849)。
- **异步系统的“最终连上”不等于“能力可用”。** MCP 延迟连接后工具未进入模型，暴露了连接状态、注册表与模型工具集合之间的同步缺口。相关：[MCP 启动时序 #17832](https://github.com/QwenLM/qwen-code/issues/17832)。
- **文档与验证需要跟上实现。** CI 路由设计文档缺少当前关键概念，JSONL 修复仍有诊断和平台覆盖后续工作；开发者需要清楚了解已验证边界。相关：[路由文档 #17861](https://github.com/QwenLM/qwen-code/issues/17861)、[JSONL 验证 #17852](https://github.com/QwenLM/qwen-code/issues/17852)。
- **交互优化正在减少不必要的等待。** 首条消息、历史加载输入、终端运行时加载的 PR 共同指向“先允许用户行动，再后台完成非必要工作”。相关：[首条消息 #17843](https://github.com/QwenLM/qwen-code/pull/17843)、[草稿输入 #17842](https://github.com/QwenLM/qwen-code/pull/17842)、[终端懒加载 #17840](https://github.com/QwenLM/qwen-code/pull/17840)。

**总体判断：** 本期更新更偏向已有能力的可靠性与工程化收敛。短期最值得跟踪的是 MCP 信任语义确认、Managed Agent 主分支 CI 恢复，以及后台任务状态与事件生命周期的一致性。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-20｜统计窗口：过去 24 小时**

> **数据说明**：输入标注来源为 `Hmbown/DeepSeek-TUI`，但条目链接均指向 `codewhale-hq/Codewhale`，本文沿用条目提供的目标仓库。活动时间均标注为 11 月 19 日；PR 评论数缺失，无法据此判断讨论热度。

## 一、今日速览

今日主线是 **0.10.3 发布准备与安全审计收尾**：命令执行策略集中暴露出多类拒绝规则绕过及性能问题，同时推进大段粘贴、Auto-Review 工具分类和启动卡死等修复。统计窗口内有 **11 个 Issue、35 个 PR 更新，无新 Release**；发布准备 PR 明确不创建标签或 Release，不能视为版本已正式发布。

## 二、社区热点 Issues

以下按技术影响筛选，而非按互动量排序。**所选 10 个 Issue 均为 OPEN，且均为 0 评论、0 👍**，目前尚无可量化的社区讨论热度。

| Issue | 问题与重要性 | 反馈与关联进展 |
|---|---|---|
| [#7413：awk/sed 静态脚本未扫描](https://github.com/codewhale-hq/Codewhale/issues/7413) | 扫描器只检查参数词，可能遗漏脚本文本内执行的被禁止命令，暴露嵌入式程序的策略覆盖缺口。 | 维护者审计发现；所给数据未列出对应修复 PR。 |
| [#7412：`find -delete` 未识别为破坏性操作](https://github.com/codewhale-hq/Codewhale/issues/7412) | 禁止 `rm` 并不能覆盖等效的文件删除行为，说明按命令名称设防不足以表达操作风险。 | 维护者提交；仍待补充行为级识别。 |
| [#7411：多种执行启动器未建模](https://github.com/codewhale-hq/Codewhale/issues/7411) | `oc`、`vagrant`、`op`、`opam`、`helm` 等入口可能隐藏下游命令，削弱拒绝规则的覆盖范围。 | 来自加固分支的对抗审查，反映启动器支持仍有盲区。 |
| [#7408：动态参数名或子命令绕过扫描](https://github.com/codewhale-hq/Codewhale/issues/7408) | 整个标志或动词在运行时生成时，多个专用扫描器无法正确识别命令结构。 | 属于 #7397 加固审查的后续发现，提示修复仍需覆盖变体。 |
| [#7401：参数词中的命令替换隐藏载荷](https://github.com/codewhale-hq/Codewhale/issues/7401) | `-c$(…)`、`--command=$(…)` 等形式可能丢失动态属性，在 `AskForApproval::Never` 下逃过拒绝规则。 | 与 #7397 同属参数解析问题，但不能据此认定已被其修复。 |
| [#7400：重复 `--` 导致指数级计算](https://github.com/codewhale-hq/Codewhale/issues/7400) | 单行命令可触发重复展开，耗尽策略分析预算，形成拒绝服务风险。 | 已有对应修复提案 [#7393](https://github.com/codewhale-hq/Codewhale/pull/7393)，仍为 OPEN。 |
| [#7403：超过 64 KiB 的原始粘贴被静默截断](https://github.com/codewhale-hq/Codewhale/issues/7403) | 非 bracketed-paste 输入存在字节上限；中文等多字节文本更早触及限制，可能造成用户未察觉的数据丢失。 | 是大段粘贴性能修复 #7398 之后仍需处理的完整性问题。 |
| [#7402：工具调用兜底 ID 与真实 ID 冲突](https://github.com/codewhale-hq/Codewhale/issues/7402) | 自动生成的 `call_N` 可能与提供商返回的字面 ID 重复，影响工具调用校验与配对。 | 表明 #7399 的“按索引生成 ID”方案仍有边界条件。 |
| [#7407：约 16 个只读工具仍分类为 Unknown](https://github.com/codewhale-hq/Codewhale/issues/7407) | 已注册为只读的工具仍可能触发 Auto-Review 人工确认，导致自动化流程不必要地停顿。 | 是 #7372/#7406 的后续排查，说明分类缺口不止一个工具。 |
| [#7372：Web 会话无法自动加载 skill](https://github.com/codewhale-hq/Codewhale/issues/7372) | v0.10.2 中技能可以被发现，但只读 `load_skill` 调用被 Auto-Review 拦截，直接影响技能可用性。 | 由外部用户 vgavriil 提交；修复 PR #7406 仍为 OPEN。 |

## 三、重要 PR 进展

**状态提示：以下除 #7386 为 CLOSED 外，其余均为 OPEN；CLOSED 本身不等于已合并。**

1. **[#7386：0.10.3 发布准备栈进入主线](https://github.com/codewhale-hq/Codewhale/pull/7386)** — **CLOSED**  
   摘要说明发布准备内容进入 `main`，保留原有历史，且不创建标签或 Release。后续 PR 也将其作为主线基点，但这不是正式版本发布。

2. **[#7397：补齐 nix 附着式命令参数检查](https://github.com/codewhale-hq/Codewhale/pull/7397)** — **OPEN**  
   修复 `--command=CMD`、附着式短参数等形式隐藏执行载荷的问题。后续 Issues 显示动态替换等变体仍需继续加固。

3. **[#7393：消除重复 `--` 引发的策略停顿](https://github.com/codewhale-hq/Codewhale/pull/7393)** — **OPEN**  
   针对命令后缀被递归重复展开的问题修复。摘要报告，特定输入含 24 个 `--` 时分析约需 14 秒，具有明确的可用性影响。

4. **[#7398：大段粘贴不再冻结编辑器](https://github.com/codewhale-hq/Codewhale/pull/7398)** — **OPEN**  
   将非 ASCII 字符输入纳入 `PasteBurst` 缓冲，避免中文粘贴逐字符触发近似 O(n²) 的处理路径。64 KiB 截断问题仍由 #7403 单独跟踪。

5. **[#7406：Auto-Review 将延迟加载的只读工具识别为 Safe](https://github.com/codewhale-hq/Codewhale/pull/7406)** — **OPEN**  
   为 `load_skill` 等工具补齐分类及回归测试，减少不必要的确认阻塞；#7407 提醒仍需核查其他只读工具。

6. **[#7399：非流式并行工具调用使用不同兜底 ID](https://github.com/codewhale-hq/Codewhale/pull/7399)** — **OPEN**  
   修复多个无 ID 工具调用统一使用 `"tool_call"`、导致整轮校验失败的问题。与真实 ID 的潜在碰撞仍待进一步处理。

7. **[#7396：拒绝本地 DSH 技能目录中的符号链接](https://github.com/codewhale-hq/Codewhale/pull/7396)** — **OPEN**  
   防止打包技能时沿符号链接复制包外文件，收紧本地插件导入的文件边界。

8. **[#7394：限制遥测启动锁等待时间](https://github.com/codewhale-hq/Codewhale/pull/7394)** — **OPEN**  
   避免持锁进程暂停后阻塞所有新启动；方案是在尝试约 3 秒后跳过遥测 arming，优先保证 CLI 可启动。

9. **[#7392：推进 0.10.3 DSH 插件能力对齐](https://github.com/codewhale-hq/Codewhale/pull/7392)** — **OPEN**  
   整合 DSH 插件导入相关工作，并补充资产处理和验收驱动所需的 host 放行调整，是插件兼容性的重要推进项。

10. **[#7410：新增可选 SearchApi 搜索后端](https://github.com/codewhale-hq/Codewhale/pull/7410)** — **OPEN**  
    为 Web 工具增加可选搜索提供商，扩展搜索后端选择。作者主动披露其 SearchApi 开发者布道师身份，存在供应商利益关联。

## 四、功能需求趋势

本批 Issues 以缺陷和审计发现为主，**不宜直接等同于广泛用户投票形成的功能诉求**。可归纳出以下方向：

- **执行策略从“命令名匹配”走向“行为与语义识别”**：静态脚本、启动器、动态参数与等效删除行为都要求更完整的分析模型。代表：[ #7413](https://github.com/codewhale-hq/Codewhale/issues/7413)、[#7412](https://github.com/codewhale-hq/Codewhale/issues/7412)、[#7411](https://github.com/codewhale-hq/Codewhale/issues/7411)。
- **自动化权限需要兼顾安全与低打扰**：只读工具不应因分类缺失阻塞流程，重点是工具能力声明与审批分类的一致性。代表：[#7372](https://github.com/codewhale-hq/Codewhale/issues/7372)、[#7407](https://github.com/codewhale-hq/Codewhale/issues/7407)。
- **终端输入更重视性能和数据完整性**：中文、大文本粘贴不仅要避免卡顿，还要避免静默丢失。代表：[#7403](https://github.com/codewhale-hq/Codewhale/issues/7403)。
- **工具调用协议需要更强的容错能力**：缺失 ID、真实 ID 与合成 ID 混用等情况，要求客户端建立稳定且无冲突的配对机制。代表：[#7402](https://github.com/codewhale-hq/Codewhale/issues/7402)。
- **发布可靠性依赖确定性测试和有界计算**：主线测试失败与命令分析耗时失控都会削弱交付信心。代表：[#7405](https://github.com/codewhale-hq/Codewhale/issues/7405)、[#7400](https://github.com/codewhale-hq/Codewhale/issues/7400)。

## 五、开发者关注点

- **修复一个样例后，仍需覆盖同类变体。** nix 参数修复之后继续出现动态标志和命令替换问题，回归测试应覆盖语法组合，而不只是单个复现命令。[#7408](https://github.com/codewhale-hq/Codewhale/issues/7408)
- **“不会卡住”与“不会丢数据”必须同时满足。** 大段粘贴的性能优化不能替代输入完整性保障，尤其需要验证中文多字节场景。[#7403](https://github.com/codewhale-hq/Codewhale/issues/7403)
- **权限元数据应避免多处维护失配。** 只读能力已注册，但审批层仍判为 Unknown，说明分类机制需要系统性核查。[#7407](https://github.com/codewhale-hq/Codewhale/issues/7407)
- **基础设施故障不应拖垮核心交互。** 遥测锁阻塞启动、策略分析无限放大，都指向超时、降级和计算预算控制的必要性。[#7394](https://github.com/codewhale-hq/Codewhale/pull/7394)、[#7400](https://github.com/codewhale-hq/Codewhale/issues/7400)
- **主线测试信号需要保持可信。** `save_and_resume_keep_ownership_honest` 稳定出现预期 409、实际 400 的差异，应明确是实现回归还是测试预期失效。[#7405](https://github.com/codewhale-hq/Codewhale/issues/7405)

**总体判断：当前处于发布前加固阶段，而非功能扩张主导阶段。优先观察安全边界问题是否形成闭环，以及已提交修复能否通过回归验证并进入正式 Release。**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*