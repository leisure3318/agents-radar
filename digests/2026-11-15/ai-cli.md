# AI CLI 工具社区动态日报 2026-11-15

> 生成时间: 2026-11-15 03:02 UTC | 覆盖工具: 9 个

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
**2026-11-15｜基于所提供的社区动态摘要**

## 1. 生态全景

AI CLI 的竞争焦点正在从“能否生成代码”转向**长任务能否可靠执行、执行状态能否验证、成本与权限能否受控**。多工具共同出现长会话资源累积、上下文压缩后信息丢失、跨端状态不同步等反馈，说明代理工作流的工程可靠性正在成为重要竞争维度。开发方向呈现分化：Codex 强化预算与请求生命周期治理，Gemini CLI 补齐 ACP 集成，Qwen Code 推进上下文管理与托管多智能体，OpenCode 深化多模型与客户端可配置性。与此同时，CLI 正逐渐成为桌面、编辑器、移动端和远程服务共同使用的执行基础，而非独立的终端入口。

## 2. 各工具活跃度对比

**统计口径：**下表为“过去 24 小时有更新的条目”，不等于当日新建数量；括号表示实际提供摘要的数量。

| 工具 | Issues 更新数 | PR 更新数 | Release 情况 | 当前主要信号 |
|---|---:|---:|---|---|
| **Claude Code** | 50（展示 30） | 0 | 无新 Release | 桌面与远程可靠性、长会话及子代理状态一致性 |
| **OpenAI Codex** | 50（展示 30） | 12 | 无新 Release | 预算控制、Hooks、历史记录和 Windows/WSL |
| **Gemini CLI** | 3 | 5 | 无新 Release；Nightly 流水线失败 | ACP 并行化、输出截断、认证与审批边界 |
| **GitHub Copilot CLI** | 5 | 0 | 未显示新 Release | 后台轮询效率、运行策略透明度、平台兼容 |
| **Kimi Code CLI** | 0 | 0 | 未报告发布活动 | 数据源报告过去 24 小时无活动 |
| **OpenCode** | 50（展示 30） | 34（展示 20） | 无新 Release | v2/2.3.0 稳定性、多模型路由、PTY 与客户端体验 |
| **Pi** | 16 | 1 | 未提供新 Release | codemode 容错、错误重试、安装识别、扩展 API |
| **Qwen Code** | 37（展示 30） | 44（展示 20） | 列出 1 个 Nightly；另有发布验证失败记录 | 上下文治理、Web Shell、托管智能体与 CI |
| **DeepSeek TUI*** | 3 | 2 | 未提供新 Release | Linux 终端兼容性、工具参数解析 |

**解读边界：**
- Codex 的 12 条 PR 均标记为 **CLOSED，合并状态未知**；其他工具的重点修复也多仍为 OPEN，不能视为已交付。
- Qwen Code 所列 Nightly 标签日期为 **11 月 13 日**，摘要未提供发布时间，不能仅凭标签确认其是否在统计窗口内发布。
- Pi 条目指向 `earendil-works/pi`；DeepSeek TUI 条目实际指向 `codewhale-hq/Codewhale`。**仓库归属需核验，尤其不宜直接将后者动态归因于 DeepSeek TUI。**
- 各项目样本完整度不同，数量适合描述本期更新强度，不适合直接衡量产品质量或用户规模。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求与技术含义 |
|---|---|---|
| **长任务可靠性与资源边界** | Claude Code、Codex、OpenCode、Pi、Qwen Code | 处理 VM 恢复后高 CPU、历史加载高内存、PTY 僵尸进程、并行取消异常、子任务恢复循环；需要完整的进程与任务生命周期管理 |
| **上下文效率与压缩正确性** | Claude Code、Gemini CLI、Pi、Qwen Code、Codex | 避免压缩后的指令冲突和失败信息丢失，减少工具描述及大输出占用，并使压缩过程具备预算与监控能力 |
| **跨端、远程与会话连续性** | Claude Code、Codex、OpenCode、Qwen Code | 保留重启后的远程状态、正确同步移动端历史、发送任务通知、展示待唤醒任务，并支持升级或迁移后的继续执行 |
| **成本及实际配置可解释性** | Codex、OpenCode、Copilot CLI、Claude Code | 控制执行预算，确保模型允许列表生效，解释档位回退与用量状态；用户需要知道“实际用了什么、为何停止” |
| **权限与人工交互边界** | Claude Code、Codex、Gemini CLI、OpenCode、Qwen Code | 明确定时任务权限、子代理授权、失败路径审批、并发权限提示及 MCP 结构化询问，避免自动化绕开确认机制 |
| **工具调用语义完整性** | Gemini CLI、Qwen Code、OpenCode、Pi、所列 Codewhale 条目 | 保留 Shell 引号、替换字符串、多字节字符、多行参数和流式错误信息，减少“模型生成正确、执行层处理错误” |

其中，**上下文压缩不再只是节省 Token，而是在承担任务状态持久化职责**。是否保留失败原因、权限约束与子代理结果，直接决定长任务能否正确继续。

## 4. 差异化定位分析

以下是根据本期动态推断的功能侧重，并非对产品能力的完整排名。

| 工具 | 功能与技术路线侧重 | 更相关的目标场景 |
|---|---|---|
| **Claude Code** | 桌面、Web、浏览器扩展、IDE 与子代理协作；本期暴露跨组件状态和执行可信度问题 | 长项目、多组织、多会话及远程协作开发 |
| **Codex** | 执行预算、请求 Hooks、追踪标识及历史一致性，体现较强的运行时治理方向 | 需要成本约束、审计与复杂多 Agent 编排的团队 |
| **Gemini CLI** | 围绕 ACP 补齐调度、输出管理和参数文档，重视标准集成接口 | 编辑器集成、协议驱动的工具链开发 |
| **Copilot CLI** | 聚焦日常交互、后台任务调度、MCP 就绪事件和实际策略展示 | 希望降低终端操作成本、简化 Agent 交互的开发者 |
| **OpenCode** | 多 Provider、多模型路由、可配置编辑工具、TUI/桌面及插件接口演进 | 重视模型选择权、客户端定制与插件扩展的用户 |
| **Pi** | codemode、SDK/RPC、扩展 UI 和适配层错误语义，偏可编程组件化 | 构建定制 Agent、扩展或嵌入式工作流的开发者 |
| **Qwen Code** | 上下文主动管理、托管会话、Web Shell、多工作区 Goals 与共享 Agent Loop | 长时自动化、托管多智能体和多工作区任务 |
| **DeepSeek TUI*** | 所列条目侧重 TUI 渲染及 fallback 工具解析，但归属未确认 | 只能评价所列 Codewhale 条目的终端与解析方向 |
| **Kimi Code CLI** | 本期无活动数据 | 无法据此判断定位变化或技术路线 |

## 5. 社区热度与成熟度

### 更新强度：Qwen Code、OpenCode 最突出

- **Qwen Code：44 条 PR 更新、37 条 Issue 更新**，是本期 PR 活动最多的项目，覆盖功能、CI、安全和文档，呈现多线并行迭代。
- **OpenCode：34 条 PR 更新、50 条 Issue 更新**，既有新版本稳定性治理，也有插件接口与状态基础设施改动。
- **Codex：12 条 PR 更新**，预算与 Hooks 相关改动集中，显示专题式工程推进；但 CLOSED 状态不能证明这些改动已合并。

### 讨论热度：整体不高，不能把条目数量等同于社区共识

展示样本中，OpenCode 单条 Issue 最高 **5 条评论**，Pi 为 **4 条**，Codex 为 **3 条**；Claude Code、Copilot CLI 等多数条目尚无评论。因而本期所谓“热点”更准确地说是**高影响候选问题**，而非已形成广泛讨论的议题。

### 成熟度：应看治理能力，而非只看缺陷数量

- Codex 对预算竞态、请求重试关联和中断归因的细化，体现运行时治理向纵深发展。
- Claude Code、Codex、OpenCode 的反馈涉及多端、多组织和升级迁移，反映其使用场景复杂，但也提高了兼容与回归成本。
- OpenCode 的 v2 稳定性及插件接口变化、Qwen Code 的共享 Agent Loop 迁移，表明两者正处于较明显的架构演进阶段。
- Gemini CLI 的 P0 事件针对 **Nightly 发布链路**，不能外推为稳定版整体不可用；Pi 的 Issue 全部关闭，也不能据此判断缺陷已经解决。

**结论：本期可以比较更新强度，尚不足以给出可靠的产品成熟度总排名。**

## 6. 值得关注的趋势信号

### ① AI CLI 正演变为持续运行的任务执行系统
后台进程、定时唤醒、子代理、跨端通知和故障恢复正在成为共同需求。

**开发者参考：**选型应增加长任务测试：断网、休眠、重启、取消和升级后，任务是否仍能恢复，进程是否正确回收。

### ② “状态可信”正在成为核心产品能力
发布完成声明、模型档位、凭据可用性和移动端历史都出现了展示状态与实际状态不一致的反馈。

**开发者参考：**将完成判定绑定到构建结果、部署记录、进程状态和产物，而不是仅依赖 Agent 的自然语言总结。

### ③ 成本控制正从用量面板进入调度层
Codex 在工具启动前重检预算，OpenCode 用户要求回退遵守模型允许列表，Copilot CLI 用户质疑无效轮询开销。

**开发者参考：**评估总成本时，应覆盖重试、轮询、Hooks、子代理及上下文重复读取。**执行预算与订阅周额度不是同一机制。**

### ④ 标准协议正在向生命周期和交互语义延伸
ACP 的并行调度与输出控制、MCP 的 elicitation 和启动完成事件，说明“能连接”已不足以满足生产使用。

**开发者参考：**集成验收应包含就绪状态、取消、错误恢复、人工确认和大输出处理，而非只测试首次调用成功。

### ⑤ 安全治理开始覆盖失败路径与外部输入
Gemini CLI 关注解析失败时不应放宽审批，Qwen Code 关注不可信工具输出和文件读取 TOCTOU，Codex 关注子代理授权边界。

**开发者参考：**重点审查错误、回退、重连和委派路径；正常执行时权限正确，不代表异常路径同样安全。

---

**总体建议：**短期选型宜优先验证**执行可证实、失败可恢复、成本可约束、升级可延续**这四项能力。现阶段，新增功能数量不如这些能力在真实工作流中的稳定表现更有决策价值。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-15｜基于所提供的 PR 与 Issue 样本**

> **数据说明：**PR 评论数全部为 `undefined`、👍 均为 0，无法验证其真实热度排名。以下采用“关联 Issue 的讨论强度、问题影响面、更新情况”作为关注度参考，**不是严格的 PR 评论榜**。展示的 20 个 PR 均为 **Open**，没有已合并或明确标记为 Draft 的条目。

## 1. 热门 Skills 排行

以下为值得优先关注的 8 项 Skill 动态；“讨论热点”依据 PR 描述及相关 Issue 提炼，不代表已读取 PR 评论。

| 优先级 | Skill / PR | 功能与本次变化 | 社区关注点 | 当前状态 |
|---|---|---|---|---|
| 1 | **skill-creator** · [#1298](https://github.com/anthropics/skills/pull/1298) | 改进 Skill 触发评估：隔离并行任务，处理 Windows 与运行时异常 | **评测结果是否可信**。相关 [#556](https://github.com/anthropics/skills/issues/556) 有 13 条评论，[#1352](https://github.com/anthropics/skills/issues/1352) 有 6 条评论，均涉及异常低触发率；本 PR 与该类问题高度相关，但不能据此认定全部解决 | **Open**；9 月 16 日更新 |
| 2 | **webapp-testing** · [#1980](https://github.com/anthropics/skills/pull/1980) | 调整测试服务器启动方式，避免使用 `shell=True` | Agent 提供的命令字符串进入系统 Shell，可能引入命令注入风险；关注安全性与原有命令链用法的兼容 | **Open**；11 月 1 日更新 |
| 3 | **docx** · [#1792](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时应报错，并验证输出文档是否仍含修订标记 | **不能把执行失败报告为成功**；文档自动化需要检查最终产物，而不只是脚本是否结束 | **Open**；11 月 1 日更新 |
| 4 | **mcp-builder** · [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 MCP ≥ 2 的 `streamable_http_client` 导入及自定义 HTTP Header 配置 | SDK 升级导致的连接兼容问题，以及带自定义认证头的服务接入；明确关联 [#1668](https://github.com/anthropics/skills/issues/1668) | **Open**；10 月 8 日更新 |
| 5 | **xlsx** · [#2019](https://github.com/anthropics/skills/pull/2019) | 补充工作表作用域名称及别名的外部链接风险检测 | 避免间接引用造成漏检，提高复杂 Excel 工作簿的处理可靠性；明确关联 [#2013](https://github.com/anthropics/skills/issues/2013) | **Open**；11 月 3 日更新 |
| 6 | **claude-api** · [#1950](https://github.com/anthropics/skills/pull/1950) | 按 Python SDK 新行为更新 `pause_turn` 恢复执行指导 | Skill 内置示例必须跟上 SDK，否则可能引导出不正确的循环控制逻辑 | **Open**；11 月 10 日更新 |
| 7 | **notion-spec-to-implementation 等** · [#1245](https://github.com/anthropics/skills/pull/1245) | 将 Notion 产品／技术规格转换为任务、验收标准和实施计划；同时提交简历审计 Skill | 从“理解需求”推进到“拆解并实施”的工作流自动化；一个 PR 包含两项 Skill，需分别评估适用范围 | **Open**；10 月 15 日更新 |
| 8 | **md2video-audio** · [#1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 转换为幻灯片、配音和 MP4 视频 | 内容生产从文本扩展到多媒体；“零成本”“专业级”等属于作者描述，尚不能视为验证结论 | **Open**；9 月 15 日更新 |

**整体判断：**这一批可见提交中，既有 Skill 的兼容性、评测与产物正确性修复，比新领域 Skill 扩张更突出。

## 2. 社区需求趋势

### ① 可信分发与安全治理：讨论最集中的议题
[#492](https://github.com/anthropics/skills/issues/492) 以 **46 条评论、3 个赞**居展示 Issue 首位，指出社区 Skill 使用 `anthropic/` 命名空间可能使用户误认为其获得官方背书。

- **核心需求：**明确来源、官方身份、权限边界与审计机制。
- **新 Skill 方向：**Agent 治理、安全检查和审计辅助；已有 [agent-governance 提案 #412](https://github.com/anthropics/skills/issues/412)，但该 Issue 已关闭，不能据此推断已交付。

### ② 企业级共享：从个人文件转向组织资产
[#228](https://github.com/anthropics/skills/issues/228) 获得 **17 条评论、8 个赞**，要求直接在组织内共享 Skill，替代下载、聊天工具转发和手动上传。

- **核心需求：**组织 Skill 库、共享链接与集中分发。
- **判断：**这是平台能力诉求，不只是增加一个新 Skill；讨论发生在 Claude.ai 场景，但体现了跨产品的协作需求。

### ③ Skill 开发与评测：先证明“能被正确触发”
[#556](https://github.com/anthropics/skills/issues/556) 与 [#1352](https://github.com/anthropics/skills/issues/1352) 分别有 **13、6 条评论**；[#2064](https://github.com/anthropics/skills/issues/2064) 则指出描述只讲“做什么”，没有讲“何时使用”。

- **核心需求：**可信的触发评测、明确的使用条件、跨平台稳定性。
- **新 Skill／工具方向：**触发条件审查、回归测试、元数据验证与质量门禁。

### ④ 长任务记忆与上下文效率
[compact-memory #1329](https://github.com/anthropics/skills/issues/1329) 有 **10 条评论**；[#1487](https://github.com/anthropics/skills/issues/1487) 报告 `claude-api` 一次注入约 156k tokens；[#189](https://github.com/anthropics/skills/issues/189) 反映重复安装带来的上下文冗余，获 **9 个赞**。

- **核心需求：**减少无效上下文，让长任务持续运行。
- **新 Skill 方向：**紧凑状态记忆、按需加载、重复内容检查，而非单纯扩大知识包。

### ⑤ 输出质量验证：从“生成了”转向“交付可用”
[推理质量门禁 #1385](https://github.com/anthropics/skills/issues/1385) 有 **7 条评论**，提出任务前校准、对抗审查和交付验证；[DOCX XML 损坏 #2018](https://github.com/anthropics/skills/issues/2018) 则揭示了“报告成功但产物无效”的风险。

- **核心需求：**审查、验证与失败可见性。
- **新 Skill 方向：**交付前检查、文档结构验证、推理审查与可执行验收。

**边界判断：**现有 Issue 样本不足以认定“代码审查”或“测试生成”是最热门的新 Skill 需求；更强的信号是 **Skills 自身的安全、评测、共享与可靠性**。

## 3. 高潜力待合并 Skills

**无法确认哪些 PR“评论活跃”，也无法据此预测近期合并。**下面是按问题价值、修复范围和更新情况筛出的待跟踪候选，不是合并时间预测。

| 候选 PR | 优先跟踪理由 | 仍需观察 |
|---|---|---|
| [skill-creator #1298](https://github.com/anthropics/skills/pull/1298) | 对应多条评测可靠性反馈，影响 Skill 开发与优化的基础流程 | 并发隔离、Windows 兼容及异常分类是否有充分回归测试 |
| [webapp-testing #1980](https://github.com/anthropics/skills/pull/1980) | 安全收益明确，11 月仍有更新 | 去除 Shell 后，现有命令链与启动流程如何兼容 |
| [docx #1792](https://github.com/anthropics/skills/pull/1792) | 修复“超时却成功”的错误语义，并增加产物检查 | 对不同 DOCX 修订结构的验证覆盖度 |
| [xlsx #2019](https://github.com/anthropics/skills/pull/2019) | 有明确关联 Issue，修复外部链接检测漏报 | 名称作用域、别名及间接引用的测试覆盖 |
| [claude-api #1950](https://github.com/anthropics/skills/pull/1950) | 11 月 10 日更新，是展示 PR 中最近更新的一项；针对明确的 SDK 行为变化 | 指导是否清楚区分 SDK 版本及终止条件 |

若专门关注**新增 Skill**，可跟踪 [Notion 规格转实施 #1245](https://github.com/anthropics/skills/pull/1245) 与 [Pyxel 游戏开发 #525](https://github.com/anthropics/skills/pull/525)：前者具备明确的业务工作流价值，后者覆盖实现、无界面运行与画面验证；但样本没有提供足够的讨论或审批信息来判断合并进度。

## 4. Skills 生态洞察

**社区最集中的诉求，正从“增加更多 Skills”转向“让 Skills 来源可信、触发可测、上下文可控、交付可验证，并能在团队中可靠复用”。**

---

# Claude Code 社区动态日报
**2026-11-15｜数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)**

## 1. 今日速览

过去 24 小时未提供新 Release 或 PR 更新，社区反馈主要集中在**桌面端工作流可靠性、长会话与子代理状态一致性，以及模型执行结果的可信度**。值得优先排查的报告包括 Linux 虚拟机恢复后 CPU 持续满载、云端线程审批卡片无响应，以及 `/compact` 后子代理结果读取指令冲突。

> **统计口径：**数据源共列出 50 条近期更新 Issue，本日报仅能分析展示的 30 条；部分记录日期为 11 月 14 日，按数据源提供的窗口纳入。以下内容均为用户报告，不代表官方确认；展示样本互动量较低，不宜将其视为已形成广泛共识的“热点”。

## 2. 社区热点 Issues

以下按潜在影响和报告可操作性筛选，而非按讨论热度排序。

| Issue | 核心内容与关注价值 | 社区反应与状态 |
|---|---|---|
| [#110115 Linux：VM 恢复后空闲会话 CPU 满载](https://github.com/anthropics/claude-code/issues/110115) | 用户报告虚拟机恢复后，空闲会话连续数小时占用 100% CPU，且不响应 SIGTERM；标题将线索指向内嵌 Bun 的定时器循环。**可能影响长期运行环境的资源与进程管理，应优先复现。** | OPEN；0 评论、0 👍。尚无样本内交叉验证。 |
| [#110130 `/compact` 后子代理结果读取指令冲突](https://github.com/anthropics/claude-code/issues/110130) | 任务提醒要求读取输出文件，而启动消息禁止通过 shell 读取或 tail 同一份大型子代理记录。**涉及上下文压缩后的指令一致性，可能干扰结果回收并增加无效读取。** | OPEN；0 评论、0 👍。标记涉及 core、agents。 |
| [#110118 云端线程的环境更新审批卡片无响应](https://github.com/anthropics/claude-code/issues/110118) | 用户报告“Update environment”卡片的两个按钮均无法点击，线程因此冻结。**属于直接阻断工作流的交互故障。** | OPEN；0 评论、0 👍。涉及 macOS、桌面端与 Web 工作流。 |
| [#110124 同账号第二个组织无法配对 Chrome 扩展](https://github.com/anthropics/claude-code/issues/110124) | 同一账号在组织 A 可正常配对，切换至组织 B 则提示未安装或未登录。**提示多组织身份切换与扩展连接状态值得排查。** | OPEN；标记 `has repro`；0 评论、0 👍。 |
| [#110131 Windows 重启桌面应用后 Remote Control 全部关闭](https://github.com/anthropics/claude-code/issues/110131) | 用户称退出并重启应用后，各会话远程控制均关闭，且无法批量恢复。**多会话远程开发场景的恢复成本较高。** | OPEN；0 评论、0 👍。 |
| [#110132 Xcode“在编辑器中打开”未定位文件与行号](https://github.com/anthropics/claude-code/issues/110132) | 选择 Xcode 时仅打开工作区；报告称同一会话中 VS Code、Cursor、Zed、Windsurf 可正确定位。**有对照行为，便于缩小 IDE 集成问题范围。** | OPEN；标记 `has repro`；0 评论、0 👍。 |
| [#110112 桌面端与内嵌 Claude Code 的主题协议兼容问题](https://github.com/anthropics/claude-code/issues/110112) | 报告称 Desktop 5.22750.0 内嵌 Claude Code 2.1.321，早于前端所需主题协议，导致 mod 背景不绘制。**反映桌面端与内嵌组件版本匹配的风险；版本关系仍需核实。** | OPEN；标记 `has repro`；0 评论、1 👍，是展示样本中唯一获赞条目。 |
| [#110113 模型未执行发布却报告已交付或正在运行](https://github.com/anthropics/claude-code/issues/110113) | 用户称明确要求发布后，模型结束了工作，并错误声称任务在后台运行。**涉及代理执行状态的可信度，发布结果应以实际构建、部署和进程证据为准。** | OPEN；0 评论、0 👍。目前为单一用户报告。 |
| [#110126 规划模型与实现模型独立配置](https://github.com/anthropics/claude-code/issues/110126) | 请求为计划阶段和实现阶段分别设置模型，并引用多个相关历史请求。**体现按阶段平衡推理能力、速度与成本的需求。** | OPEN，enhancement；0 评论、0 👍。历史关联不等于本条已获得广泛支持。 |
| [#110128 定时任务权限继承与权限控件标注](https://github.com/anthropics/claude-code/issues/110128) | 用户希望由 Bypass permissions 会话创建的定时任务保留该模式，并指出编辑弹窗权限控件无标签。**核心是自动化权限的可预期性与可见性；默认继承仍需权衡安全边界。** | OPEN，enhancement；0 评论、0 👍。 |

## 3. 重要 PR 进展

**过去 24 小时提供的 PR 更新为 0 条，因此没有可列出的重要 PR，也无法判断上述问题是否已有修复提交。**

跟踪入口：[仓库 Pull Requests](https://github.com/anthropics/claude-code/pulls)。Issue 当前为 OPEN，不代表不存在尚未关联或未展示的修复工作。

## 4. 功能需求趋势

### ① 会话管理与远程工作流更需要“可恢复”
用户希望跨设备刷新聊天、清理主会话历史但保留线程与文件，并从 Remote Control 创建侧会话。方向是降低长期项目与多会话切换的管理成本。  
相关：[聊天刷新 #110117](https://github.com/anthropics/claude-code/issues/110117) · [历史归档 #110120](https://github.com/anthropics/claude-code/issues/110120) · [远程侧会话 #110114](https://github.com/anthropics/claude-code/issues/110114)

### ② 模型编排与执行效率需要更多控制
分阶段模型配置、测试编写与监控效率、用量消耗均有反馈，体现用户对“任务质量—耗时—成本”平衡的关注。用量报告本身不足以证明计费异常。  
相关：[分阶段选模 #110126](https://github.com/anthropics/claude-code/issues/110126) · [测试效率 #110111](https://github.com/anthropics/claude-code/issues/110111) · [用量限制 #110109](https://github.com/anthropics/claude-code/issues/110109)

### ③ 权限与 Hook 交互需要更清楚、更少干扰
需求覆盖定时任务权限标识，以及阻断式 Hook 仅显示自定义消息、避免重复通用横幅。重点是**可理解、可配置**，而非简单放宽权限。  
相关：[任务权限 #110128](https://github.com/anthropics/claude-code/issues/110128) · [Hook 消息展示 #110127](https://github.com/anthropics/claude-code/issues/110127)

### ④ 桌面扩展与主题能力仍需完善
主题背景不绘制、动画冻结，以及纯黑主题下边界和悬停状态消失，说明自定义需求已延伸至渲染兼容性和视觉可用性。  
相关：[协议兼容 #110112](https://github.com/anthropics/claude-code/issues/110112) · [动画冻结 #110095](https://github.com/anthropics/claude-code/issues/110095) · [纯黑主题 #110108](https://github.com/anthropics/claude-code/issues/110108)

## 5. 开发者关注点

- **优先关注阻断性与资源问题。** VM 恢复后的高 CPU、云端线程冻结，比外观问题更直接影响持续开发；目前暂无数据支持的通用修复方案。关联：[#110115](https://github.com/anthropics/claude-code/issues/110115)、[#110118](https://github.com/anthropics/claude-code/issues/110118)。
- **将代理“完成声明”与实际执行证据分开。** 发布、后台任务及子代理结果，应结合工具返回、日志和产物验证，尤其在上下文压缩之后。关联：[#110113](https://github.com/anthropics/claude-code/issues/110113)、[#110130](https://github.com/anthropics/claude-code/issues/110130)。
- **补齐跨组织、跨版本、重启后的边界测试。** 多组织扩展配对、远程控制状态保留和内嵌组件协议匹配，是本次样本中值得补充的回归测试维度。关联：[#110124](https://github.com/anthropics/claude-code/issues/110124)、[#110131](https://github.com/anthropics/claude-code/issues/110131)、[#110112](https://github.com/anthropics/claude-code/issues/110112)。
- **解读反馈时去重并过滤低信息量报告。** 展示样本中，同一作者提交了 4 条同系列“忽略指令”报告，不能当作 4 个独立用户信号；另有 GitHub 集成报告缺少有效复现信息，不足以推断集成服务出现系统性故障。示例：[#110106](https://github.com/anthropics/claude-code/issues/110106)、[#110129](https://github.com/anthropics/claude-code/issues/110129)。

**今日判断：**在已展示样本中，最有价值的信号不是新功能发布，而是代理工作流在长会话、远程操作和多组件协作中的可靠性边界；仍需更多独立复现与维护者反馈来确认影响范围。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**2026-11-15｜数据来源：[openai/codex](https://github.com/openai/codex)**

## 1. 今日速览

过去 24 小时无新 Release；开发动态主要集中在 **rollout 执行预算控制、模型请求 Hooks 和历史记录一致性**。社区反馈则聚焦于 **长会话资源占用、Windows/WSL 工作流及移动端远程会话同步**，其中有用户报告单条追踪持续超过 12 小时、TUI 启动占用数 GB 内存。

**数据口径：**本期有 50 条更新的 Issues，以下分析基于展示的 30 条；12 条 PR 均标记为 `CLOSED`，但数据未提供合并结果，**不能据此认定已合并或发布**。Issues 讨论量整体较低，最高为 3 条评论，展示条目的 👍 均为 0，以下优先级主要依据潜在影响而非热度。

## 2. 社区热点 Issues

| Issue | 问题与重要性 | 社区反应 / 状态 |
|---|---|---|
| **[ #61541：子 Agent 消息导致追踪无限增长](https://github.com/openai/codex/issues/61541)** | 报告称 CLI 0.167.2 中，跨 Agent 消息延续发送方 trace，单个会话的 trace 持续超过 12 小时、达到 66 MB。涉及长期运行任务的可观测性成本及追踪后端处理压力。 | **3 条评论，OPEN**；本期展示数据中讨论最多。 |
| **[ #61568：TUI 启动加载其他线程完整历史](https://github.com/openai/codex/issues/61568)** | 用户报告 0.167.0、0.169.0 启动时加载其他线程完整 rollout，每次占用数 GB 内存，而 0.166.0 正常。具有明确的版本回归线索，值得关注历史分页与加载策略。 | **1 条评论，OPEN**；尚无修复确认。 |
| **[ #61591：Windows Git staging 工作进程残留](https://github.com/openai/codex/issues/61591)** | 临时索引相关 Git 工作进程在启动器退出后仍存活，并累积数 GiB 内存。报告涉及两个桌面包版本，对长期运行及多项目环境有较大影响。 | **1 条评论，OPEN**；提供了安装包版本信息。 |
| **[ #61598：旧 WSL 项目的会话无法迁移](https://github.com/openai/codex/issues/61598)** | 桌面端自动更新后切换到按项目连接 WSL 的流程，但已有聊天仍绑定废弃环境，无法继续或迁移。核心风险是升级破坏工作连续性。 | **1 条评论，OPEN**；暂未提供迁移方案。 |
| **[ #61546：启用 WSL 集成后桌面端启动失败](https://github.com/openai/codex/issues/61546)** | 启动时报组织设置加载失败、策略读取协议错误，报告跨两个版本复现。相比局部功能故障，这是直接阻断应用启动的问题。 | **1 条评论，OPEN**；报告指出禁用 WSL 集成可避开问题。 |
| **[ #61547：Responses 顶层错误被忽略并重试五次](https://github.com/openai/codex/issues/61547)** | 自定义模型提供商返回顶层 `error` 事件后，CLI 未正确处理并重复尝试。可能造成错误诊断困难、额外延迟及请求开销，影响兼容 Responses API 的接入方。 | **2 条评论，OPEN**；报告附有本地脚本复现背景。 |
| **[ #61565：移动端历史消息缺失后乱序补入](https://github.com/openai/codex/issues/61565)** | 中间消息暂时缺失，新消息先显示，旧消息随后追加到末尾。直接影响开发者对执行顺序、任务状态和上下文的判断。 | **2 条评论，OPEN**；尚无修复确认。 |
| **[ #61597：Android Remote 持续显示过期会话](https://github.com/openai/codex/issues/61597)** | Windows 桌面端已继续执行，但 Android 端反复显示旧片段。与上述历史乱序共同指向跨端状态一致性问题，但不能据此断定根因相同。 | **1 条评论，OPEN**。 |
| **[ #61590：多个账号周额度突然耗尽](https://github.com/openai/codex/issues/61590)** | 报告称多个账号出现疑似异常额度消耗，影响开发任务可用性和使用成本预期。当前缺少用量明细，尚不能确认计费或额度系统异常。 | **1 条评论，OPEN**；属于用户报告，待核实。 |
| **[ #61576：子 Agent 与进程输入的 fail-closed 授权](https://github.com/openai/codex/issues/61576)** | 涉及子 Agent、Hooks、沙箱及进程输入的授权边界。对自动化与多 Agent 工作流而言，权限检查是否覆盖所有执行路径是重要安全议题。 | **1 条评论，OPEN**；现有摘要不足以判断具体缺陷或影响范围。 |

## 3. 重要 PR 进展

以下 10 条 PR **均为 CLOSED，合并及发布状态未确认**。最明显的开发主线是：让预算检查覆盖模型响应、工具执行、Hooks 和并发线程，而不是只在请求发出前检查一次。

| PR | 功能或修复内容 | 开发者意义 |
|---|---|---|
| **[ #61577：响应完成及用量结算后再处理](https://github.com/openai/codex/pull/61577)** | 允许等待响应完成及同步 post-hooks 执行后，再处理响应中的工具工作。 | 避免流式响应尚未完成计费时，工具已提前启动。 |
| **[ #61578：工具开始执行前重新检查预算](https://github.com/openai/codex/pull/61578)** | 工具经过执行槽位等待、审批或生命周期回调后，再检查预算。 | 缩小“调度时有预算、执行时已耗尽”的竞态窗口。 |
| **[ #61579：小数预算与可配置上下文提醒](https://github.com/openai/codex/pull/61579)** | 引入正数、有限值的 `limit_budget`，保留 `limit_tokens` 兼容性，但禁止同时配置；保留小数余额。 | 支持更细粒度预算表达，增强配置约束。 |
| **[ #61580：计入同步 MCP post-hook 成本](https://github.com/openai/codex/pull/61580)** | 同步 `PostModelRequest` MCP hook 可通过 `structuredContent` 返回额外预算单位，同时独立保留提供商用量。 | 将扩展工作流成本纳入执行预算，而不混淆模型提供商计量。 |
| **[ #61581：预算停止使用中性中断标记](https://github.com/openai/codex/pull/61581)** | 预算耗尽时，在终止事件前记录并刷新 `<turn_aborted>` 标记。 | 避免把预算导致的中断错误归因于用户。 |
| **[ #61582：共享预算耗尽后阻止新工作](https://github.com/openai/codex/pull/61582)** | 新请求、工具和自动轮次共享预算停止状态，同时保留导致预算耗尽的已消费响应。 | 加强多线程场景下的预算一致性。 |
| **[ #61583：重构预算检查与轮次完成状态](https://github.com/openai/codex/pull/61583)** | 集中处理生成准入检查，并为待处理输入、内联压缩设置专用预算检查。 | 减少 HTTP、WebSocket 等路径之间的行为差异。 |
| **[ #61562：统一采样与压缩的请求 Hook 生命周期](https://github.com/openai/codex/pull/61562)** | 按尝试配对 `PreModelRequest` / `PostModelRequest`，加入独立生命周期 ID、取消报告及 `thread_id`、`kind`。 | 提升常规生成和上下文压缩的监控一致性。 |
| **[ #61587：为请求 Hooks 添加请求 ID 与尝试编号](https://github.com/openai/codex/pull/61587)** | 增加 `request_id` 和从 1 开始的 `attempt_number`，用于关联重试与模型回退。 | 便于分析一次生成背后的多次请求，改进审计与排障。 |
| **[ #61595：TUI 历史条目按所属轮次查找](https://github.com/openai/codex/pull/61595)** | 历史条目携带 turn ID，避免跨轮次复用 item ID 时边界错位或隐藏无关条目。 | 针对 TUI 历史加载正确性；不能直接视为移动端历史问题已修复。 |

> **注意：**上述 rollout 执行预算机制与用户订阅的周额度并非同一概念，不能据此认为额度投诉已获得修复。

## 4. 功能需求趋势

从已展示的 Issues 看，社区需求正在从单一编码能力扩展到完整工作流管理：

- **远程控制与会话连续性**：用户希望从 iPhone 直接接入远程服务器上 tmux 中的 CLI 会话；移动端还需要可靠的历史同步与产物刷新。相关：[远程 CLI 需求 #61563](https://github.com/openai/codex/issues/61563)、[Remote PDF 刷新 #61586](https://github.com/openai/codex/issues/61586)。其中 #61563 已关闭，但关闭原因未提供。
- **进程生命周期管理**：希望退出 Codex 时同步关闭其启动的开发服务器等程序，减少后台残留。相关：[退出时清理程序 #61559](https://github.com/openai/codex/issues/61559)。
- **细粒度设备与权限管理**：需求包括集中查看设备、会话，并按设备控制产品、数据及连接器访问权限。相关：[权限与设备中心 #61553](https://github.com/openai/codex/issues/61553)。
- **Hooks 的交互可定制性**：希望阻断型 Hook 仅显示自定义说明，避免通用拒绝横幅重复干扰。相关：[Hook 消息显示模式 #61593](https://github.com/openai/codex/issues/61593)。
- **跨项目语音工作流**：希望在一次语音对话中切换项目、按需授权，而不丢失上下文。相关：[语音跨项目 #61573](https://github.com/openai/codex/issues/61573)。
- **从代码生成延伸到专业资产生成**：有用户希望直接生成高质量游戏 3D 资产，而不只是编写 Blender 脚本；目前属于单条探索性需求，尚不能视为广泛共识。相关：[3D 游戏资产 #61558](https://github.com/openai/codex/issues/61558)。

## 5. 开发者关注点

1. **升级后的工作流连续性优先于新功能。** WSL 会话迁移失败、启动受阻、任务落入错误执行环境，会直接中断现有项目。相关：[会话迁移 #61598](https://github.com/openai/codex/issues/61598)、[WSL 设置下仍运行 PowerShell #61574](https://github.com/openai/codex/issues/61574)。

2. **长时间运行需要可控的资源边界。** 内存、后台进程及遥测数据都出现累积型问题，说明长会话体验不仅取决于模型输出，也依赖历史加载和生命周期管理。相关：[TUI 内存 #61568](https://github.com/openai/codex/issues/61568)、[追踪增长 #61541](https://github.com/openai/codex/issues/61541)。

3. **额度状态需要可解释且跨端一致。** 除突然耗尽的报告外，还有用户反馈重置后页面显示 100% 剩余，但桌面端仍拒绝请求。相关：[额度重置后仍被阻断 #61594](https://github.com/openai/codex/issues/61594)。

4. **授权与安全拦截需要明确的恢复路径。** 用户报告正常提示被误拦截，以及撤销后重新授权仍无法恢复操作。相关：[安全过滤误报 #61592](https://github.com/openai/codex/issues/61592，)、[重新授权后仍被拒绝 #61551](https://github.com/openai/codex/issues/61551)。#61592 已关闭，但不能等同于问题已修复。

**后续重点：**关注预算控制相关 PR 是否进入正式版本，以及 Windows/WSL、长会话资源占用和跨端历史一致性问题是否出现明确修复说明。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-11-15**  
**仓库：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)**

> 统计范围为所提供的过去 24 小时更新数据：3 条 Issue、5 条 PR。以下全部列出，不补足至 10 条；所有条目当前均为 OPEN，PR 尚未合并。

## 1. 今日速览

今日最紧急的动态是 **Nightly 发布流水线失败**，已被标记为 `priority/p0`；过去 24 小时没有新 Release。开发工作集中在 **ACP 模式体验完善**，包括独立工具调用并行化、大输出截断和 CLI 参数文档同步，同时推进 OAuth 失败恢复与 YOLO 模式审批边界修复。

## 2. 社区热点 Issues

### 🔴 #30302：Nightly 发布失败，标记 P0
- **问题**：`v0.70.0-nightly.20261115.g4ed06ed0d` 的 nightly-release 工作流失败。
- **为什么重要**：直接影响该 Nightly 版本的交付；当前摘要未提供失败根因，不能据此判断是否影响稳定版。
- **社区反应**：由 GitHub Actions 机器人自动创建，标记为 `priority/p0`、`release-failure`；暂无评论或点赞。
- **链接**：[Issue #30302](https://github.com/google-gemini/gemini-cli/issues/30302) · [失败工作流](https://github.com/google-gemini/gemini-cli/actions/runs/43657756750)

### #30299：Windows PowerShell 5.1 环境下，Shell 参数双引号丢失
- **问题**：据报告，在未安装 PowerShell 7 的 Windows 11 环境中，`run_shell_command` 向原生可执行程序传参时仍会丢失内嵌双引号，导致模型生成的常见命令执行失败。
- **为什么重要**：影响 Windows 默认环境中的工具调用可靠性。报告者指出这是此前问题的回归，并反馈工具描述没有向模型说明该限制。
- **社区反应**：待分诊，1 条评论、0 个点赞；现有数据未显示修复方案或维护者结论。
- **链接**：[Issue #30299](https://github.com/google-gemini/gemini-cli/issues/30299)

### #30300：CLI 文档仍列出已移除的 Zed 参数，遗漏 `--acp`
- **问题**：CLI 参数表仍包含 `--experimental-zed-integration`，未同步当前的 `--acp` 参数。
- **为什么重要**：文档与实际行为不一致，容易让编辑器集成用户使用失效参数，也妨碍用户发现 ACP 入口。
- **社区反应**：待分诊，1 条评论、0 个点赞；已有对应文档修复 PR，但尚未合并。
- **链接**：[Issue #30300](https://github.com/google-gemini/gemini-cli/issues/30300) · [修复 PR #30301](https://github.com/google-gemini/gemini-cli/pull/30301)

## 3. 重要 PR 进展

以下 5 条 PR 均处于 **OPEN** 状态，所述内容为拟议改动，尚不能视为已发布能力。

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| [#30298：ACP 独立工具调用并行执行](https://github.com/google-gemini/gemini-cli/pull/30298) | 将 ACP 模式下原本串行执行的独立工具调用引入并行执行机制，关联 #30235。 | 有望减少多个独立、只读工具调用的累计等待时间，缩小与标准 CLI 调度能力的差距。 |
| [#30297：截断 ACP 大型工具输出](https://github.com/google-gemini/gemini-cli/pull/30297) | 对 ACP 模式中的 Shell 与 MCP 工具大输出进行截断，关联 #30233。 | 避免巨量日志、目录树等内容未经截断直接进入模型上下文，缓解上下文占用压力。 |
| [#30296：清除失败的 OAuth 初始化缓存](https://github.com/google-gemini/gemini-cli/pull/30296) | 从缓存中移除被拒绝的 `initOauthClient()` Promise。 | 防止一次初始化失败持续污染整个进程生命周期内的后续认证尝试，改善失败恢复能力。 |
| [#30295：YOLO 模式保留 `ASK_USER` 决策](https://github.com/google-gemini/gemini-cli/pull/30295) | Shell 命令解析失败时保留原有策略决策，而非无条件返回 `ALLOW`。 | 维护策略要求的人工确认边界，避免解析失败路径直接放行命令。 |
| [#30301：同步 ACP 参数文档](https://github.com/google-gemini/gemini-cli/pull/30301) | 更新 CLI 参考文档，使 ACP 相关参数条目与实际注册参数一致。 | 减少编辑器集成配置误导，对应修复 Issue #30300。 |

**互动说明**：提供的数据未包含有效的 PR 评论数（字段为 `undefined`），不能据此判定无人讨论；5 条 PR 的点赞数均为 0。

## 4. 功能需求趋势

当前 Issue 样本仅 3 条，不足以形成长期热度排名。结合本批 PR，可观察到以下方向：

- **ACP 集成从“可用”走向能力补齐**：Issue 直接暴露了参数文档迁移问题，相关 PR 则进一步补齐并行调度和输出管理。这是本批开发活动中最集中的方向。  
  参考：[Issue #30300](https://github.com/google-gemini/gemini-cli/issues/30300)、[PR #30298](https://github.com/google-gemini/gemini-cli/pull/30298)、[PR #30297](https://github.com/google-gemini/gemini-cli/pull/30297)。

- **跨平台命令执行可靠性仍需加强**：Windows 默认 Shell 环境中的引号处理问题，说明工具调用不仅需要生成正确命令，也依赖执行层保留参数语义。  
  参考：[Issue #30299](https://github.com/google-gemini/gemini-cli/issues/30299)。

- **发布与故障恢复成为重要维护方向**：Nightly 失败需要排查，OAuth 缓存修复则着眼于避免一次失败演变为进程内持续故障。  
  参考：[Issue #30302](https://github.com/google-gemini/gemini-cli/issues/30302)、[PR #30296](https://github.com/google-gemini/gemini-cli/pull/30296)。

- **自动执行模式下的策略边界更受重视**：YOLO 模式修复强调，即使命令解析失败，也应保留策略层要求的人工确认。  
  参考：[PR #30295](https://github.com/google-gemini/gemini-cli/pull/30295)。

本批数据**未出现新模型支持需求**，不宜据此推断该方向的社区热度。

## 5. 开发者关注点

1. **文档、工具描述与实际行为必须一致**：失效参数会误导用户，未披露的 Shell 限制则可能让模型反复生成无法成功执行的命令。  
   [Issue #30300](https://github.com/google-gemini/gemini-cli/issues/30300) · [Issue #30299](https://github.com/google-gemini/gemini-cli/issues/30299)

2. **ACP 模式需要兼顾响应速度与上下文效率**：独立调用串行执行、大输出直接传入模型，是此次两项 ACP PR 分别针对的痛点。  
   [PR #30298](https://github.com/google-gemini/gemini-cli/pull/30298) · [PR #30297](https://github.com/google-gemini/gemini-cli/pull/30297)

3. **失败路径不应留下持久错误或放宽权限**：OAuth 初始化失败应允许恢复；命令解析失败不应覆盖已有审批决策。  
   [PR #30296](https://github.com/google-gemini/gemini-cli/pull/30296) · [PR #30295](https://github.com/google-gemini/gemini-cli/pull/30295)

**后续观察重点**：Nightly 失败根因及恢复情况、Windows 引号回归问题的分诊结果，以及两项 ACP 能力改进 PR 的合并进展。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-15**  
**项目：[github/copilot-cli](https://github.com/github/copilot-cli)**

## 1. 今日速览

本次数据未显示新版本发布或 PR 更新，主要动态集中在 5 条待分诊 Issue，涉及 macOS 兼容性、交互信息展示、后台任务效率、MCP 启动通知和 Fusion 档位解析。所有 Issue 均为 Open、标记 `triage`，且评论数与 👍 数均为 0，目前只能视为早期用户反馈，尚不足以判断社区共识。

> **统计口径说明：**来源将这些 Issue 归入“过去 24 小时内更新”，但其中 4 条标注的更新日期为 11 月 14 日；由于缺少具体时间和时区，本文按所提供清单整理。

## 2. 社区热点 Issues

本次仅提供 **5 条 Issue**，以下全部纳入，不补足至 10 条。各条目均暂无评论或点赞，也未见所提供数据中的维护者回应。

### ① macOS 12 用户请求兼容版本
**[#5461 — Request for a GitHub Copilot CLI Version Compatible with macOS 12.7.6](https://github.com/github/copilot-cli/issues/5461)**

- **反馈内容：**用户报告 `1.0.122` 要求 macOS 13.5 或更高版本，而其设备停留在 macOS 12.7.6；此前 `1.0.9x` 系列版本可以运行。
- **重要性：**系统最低要求直接影响工具可用性，对无法升级操作系统的开发者构成使用门槛。值得关注官方是否明确兼容矩阵及旧版本获取、支持策略。
- **社区反应：**待分诊，0 评论、0 👍；尚无兼容方案得到确认。

### ② `ask_user` 调用导致同一响应中的解释文字不可见
**[#5460 — ask_user: text written in the same response as an ask_user call is not shown](https://github.com/github/copilot-cli/issues/5460)**

- **反馈内容：**当 Agent 在同一响应中先输出解释文字、再调用 `ask_user` 时，用户只能看到表单及其字段，前面的解释文字未显示。
- **重要性：**可能使用户在缺少背景、约束或理由的情况下作答，影响交互完整性与 Agent 工作流的可理解性。
- **社区反应：**待分诊，0 评论、0 👍；尚无修复或临时方案信息。

### ③ 后台任务轮询消耗额外模型轮次
**[#5459 — Agent spends model turns on `sleep N; check` polling while a background job runs](https://github.com/github/copilot-cli/issues/5459)**

- **反馈内容：**用户报告，长时间后台任务运行期间，Agent 反复执行 `sleep N;` 后检查日志或进程；每次检查都占用独立模型轮次并重新读取完整对话上下文。
- **重要性：**这类无有效进展的轮询可能增加等待时间与上下文处理开销，暴露出长任务调度和完成通知机制的优化空间。
- **社区反应：**待分诊，0 评论、0 👍；开销规模及适用场景仍待验证。

### ④ 请求 MCP 服务启动完成通知
**[#5458 — Feature request: hook/notification event when MCP server startup completes](https://github.com/github/copilot-cli/issues/5458)**

- **反馈内容：**希望在所有已配置 MCP 服务均进入 `connected` 或 `failed` 状态后，触发 hook 或通知事件。
- **重要性：**多 MCP 服务初始化需要时间，统一的“初始化已结束”信号有助于自动化脚本判断工具是否就绪，并区分仍在连接与已连接失败的状态。
- **社区反应：**待分诊，0 评论、0 👍；当前属于明确的功能提案，未见实现承诺。

### ⑤ Fusion High 档位被静默解析为 Standard
**[#5457 — Fusion tier "high" silently resolves to policy "standard" (max works)](https://github.com/github/copilot-cli/issues/5457)**

- **反馈内容：**用户报告请求 Fusion **High** 后，会话实际采用 **Standard** 策略，且没有错误或警告；其观察到 `session.fusion_resolved` 事件记录 `policy: "standard"`、`syntheticModel: "hydrafusion"`。标题同时称 Max 档位可正常工作。
- **重要性：**请求配置与实际执行策略不一致，会影响结果评估和故障排查；若发生回退，明确提示原因尤为重要。
- **社区反应：**待分诊，0 评论、0 👍；尚无法确认是配置、权限、策略映射还是其他问题。

## 3. 重要 PR 进展

本次数据中**没有过去 24 小时内更新的 PR**，因此无可列出的功能实现或修复进展，也无法将上述 Issue 对应到具体补丁。

项目入口：[Pull Requests](https://github.com/github/copilot-cli/pulls)

## 4. 功能需求趋势

基于这 5 条反馈，可观察到以下方向；**样本较小，不宜据此认定为全社区的高频需求或热度排名。**

| 方向 | 需求信号 | 关联 Issue |
|---|---|---|
| **Agent 执行效率** | 减少后台任务等待过程中的无效轮询与模型调用 | [#5459](https://github.com/github/copilot-cli/issues/5459) |
| **生命周期事件与自动化** | 为多 MCP 服务初始化提供可订阅的完成信号 | [#5458](https://github.com/github/copilot-cli/issues/5458) |
| **交互与运行状态透明度** | 保留提问前的解释信息，并明确显示实际生效的策略 | [#5460](https://github.com/github/copilot-cli/issues/5460)、[#5457](https://github.com/github/copilot-cli/issues/5457) |
| **平台兼容与升级路径** | 明确旧 macOS 的可用版本及支持边界 | [#5461](https://github.com/github/copilot-cli/issues/5461) |

## 5. 开发者关注点

- **减少“看不见”的状态差异：**解释文字缺失、请求档位与实际策略不一致，都会增加理解和排障成本。关注 [#5460](https://github.com/github/copilot-cli/issues/5460)、[#5457](https://github.com/github/copilot-cli/issues/5457)。
- **让等待更高效、就绪状态更明确：**后台任务完成与 MCP 初始化结束都需要更清晰的状态信号，以减少主动检查。关注 [#5459](https://github.com/github/copilot-cli/issues/5459)、[#5458](https://github.com/github/copilot-cli/issues/5458)。
- **升级前核对系统要求：**仍使用 macOS 12 的开发者应留意最低系统版本变化；当前数据未提供官方兼容方案。关注 [#5461](https://github.com/github/copilot-cli/issues/5461)。

**总体判断：**本期反馈更偏向执行效率、可观测性和兼容性，而非新增模型或 IDE 集成。后续最值得跟进的是维护者的复现确认、策略回退说明，以及是否出现对应修复 PR。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-11-15

> 数据来源：[anomalyco/opencode](https://github.com/anomalyco/opencode)。过去 24 小时有 **50 条 Issue、34 条 PR 更新**；下文基于提供的 30 条 Issue、20 条 PR 摘要筛选分析。PR 评论数缺失，不据此判断热度；**Closed 不等于已修复或已合并**。

## 1. 今日速览

过去 24 小时无新 Release，社区关注点集中在 **v2/2.3.0 相关稳定性反馈**，尤其是模型目录同步、模型回退策略、PTY 进程回收及桌面渲染问题。贡献者提交的修复覆盖文本编码边界、权限提示和交互焦点，同时推进可配置编辑工具、实验性客户端 KV 存储及 OpenTUI 升级；这些重点 PR 当前均处于 Open 状态。[仓库动态](https://github.com/anomalyco/opencode)

## 2. 社区热点 Issues

以下综合讨论量、影响范围和技术风险筛选，并非单纯按评论数排序。

| Issue | 核心问题与重要性 | 社区反应 / 当前状态 |
|---|---|---|
| [#63956：Copilot Gemini 在启动/唤醒后调用失败](https://github.com/anomalyco/opencode/issues/63956) | 据报告，异步 `/models` 同步完成前，请求使用了模型不支持的 Responses API，返回 HTTP 400。暴露模型能力信息与请求路由之间的时序问题。 | **5 条评论**，所展示 Issue 中讨论最多；Open，标记 `status/repro-simulated`。 |
| [#63958：模型回退绕过允许列表](https://github.com/anomalyco/opencode/issues/63958) | 用户报告，回退可能使用已从允许列表移除的付费模型，Plan/Build 切换也会改变模型。直接关系到模型选择可预测性及费用控制。 | **3 条评论**；Open，涉及 Go / 免费层及 macOS CLI。 |
| [#63976：PTY 守护进程累积僵尸子进程](https://github.com/anomalyco/opencode/issues/63976) | 据报告，升级 2.3.0 后，已完成的 shell 命令未被回收，`<defunct>` 子进程持续增长。对长期运行的开发会话尤其重要。 | **2 条评论**；Open，带有 **`reproduced`** 标签。 |
| [#63944：Windows 桌面生成期间渲染崩溃](https://github.com/anomalyco/opencode/issues/63944) | `renderRow` 中出现 `Match/exhaustive: absurd`，影响生成过程中的桌面端可用性。 | **2 条评论、2 个 👍**，是展示样本中唯一获得点赞的 Issue；Open。 |
| [#63999：网络恢复后模型列表长期过期](https://github.com/anomalyco/opencode/issues/63999) | 用户报告仅能看到 93 个工作区启用模型中的 38 个，服务重启也未强制重新同步。说明模型缓存恢复机制值得排查。 | **1 条评论**；Open，涉及托管 Provider、Zen / 免费层。 |
| [#64006：文本截断仍可能切断 UTF-16 代理对](https://github.com/anomalyco/opencode/issues/64006) | 部分 `.slice()` 截断点可能损坏 emoji 等字符，是此前字符边界修复的遗漏。影响模型输入和文本数据完整性。 | **1 条评论**；Open，标记 **`reproduced`**，已有对应 PR #64007。 |
| [#63951：归档会话占据默认列表](https://github.com/anomalyco/opencode/issues/63951) | 归档会重写 `time_updated`，默认列表又缺少归档过滤。报告者的首页 50 条记录中有 47 条已归档，明显干扰活跃会话查找。 | **2 条评论**；Open，归类为功能需求。 |
| [#63996：隐藏的子代理页签仍遍历会话](https://github.com/anomalyco/opencode/issues/63996) | 子代理页签未展示时，仍计算会话关系及状态。会话规模扩大后，可能增加导航开销。 | **1 条评论**；Open，与隐藏自动补全仍挂载选项的反馈形成同类性能信号。 |
| [#63992：桌面/CLI 发起的会话无法通知 iPhone](https://github.com/anomalyco/opencode/issues/63992) | 请求在 iOS 应用增加 “Always Notify” 开关，让桌面或 CLI 发起的任务也能推送完成通知。面向跨设备长任务工作流。 | **2 条评论**；Open。 |
| [#64008：反复出现“Failed to download file”](https://github.com/anomalyco/opencode/issues/64008) | 用户认为当时不应触发下载，但反复收到下载失败提示。涉及 Provider 使用体验，不过摘要信息不足，尚不能判断根因与影响范围。 | **3 条评论**；Open，标记 macOS / Provider。 |

## 3. 重要 PR 进展

**以下 10 项均为 Open：代表拟议改动，尚不能视为已进入正式版本。**

| PR | 功能或修复内容 | 开发者意义 |
|---|---|---|
| [#64007：补齐代理对安全截断](https://github.com/anomalyco/opencode/pull/64007) | 将 Core 中剩余四处 `.slice()` 截断替换为 `TextBoundary` 边界处理。 | 对应 #64006，减少 emoji 等字符被截坏的问题。 |
| [#63984：保持 shell 输出分页的 UTF-8 完整性](https://github.com/anomalyco/opencode/pull/63984) | 调整分页边界，避免将多字节字符拆开后单独解码。 | 与 UTF-16 截断修复互补，覆盖工具输出的字节级边界。 |
| [#64010：保持当前权限提示不被新请求替换](https://github.com/anomalyco/opencode/pull/64010) | 新权限请求到达时，保留正在展示的请求，而非按主会话/子代理排序重新选择。 | 提升并行代理场景下审批交互的稳定性。 |
| [#64011：Diff 重绘时保持行评论焦点](https://github.com/anomalyco/opencode/pull/64011) | 修复 Agent 修改文件触发 Diff 重绘后，用户输入行评论时失去焦点的问题。 | 改善边生成、边审阅的协作体验。 |
| [#63979：避免 `--session --prompt` 重复提交](https://github.com/anomalyco/opencode/pull/63979) | 修复提示词提交到指定会话后，新建会话仍可能再次提交的状态问题。 | 降低重复执行风险；其直接关联 Issue 为 #63839，并非本日报中的 #63997。 |
| [#63989：升级 OpenTUI 0.9.0](https://github.com/anomalyco/opencode/pull/63989) | 依赖升级涉及插件 Markdown 代码块渲染接口及 peer dependency 变化。 | **插件兼容性重点**：渲染器参数转向 `MarkdownCodeBlock`，依赖旧 token 结构的插件需检查适配。 |
| [#63988：放宽 SSH / WSL 服务版本检查](https://github.com/anomalyco/opencode/pull/63988) | 将 Rune Desktop 的相关改动移植到 Electron 桌面端，改善连接不同 OpenCode 版本服务的能力。 | 减少远程开发中客户端与服务端版本不一致造成的连接阻碍。 |
| [#63982：支持配置编辑工具选择](https://github.com/anomalyco/opencode/pull/63982) | 为 `patch` 与 `edit`/`write` 的选择提供配置能力，减少对硬编码模型 ID 启发式规则的依赖。 | 让开发者更精细地控制不同模型的编辑策略。 |
| [#63998：实验性客户端 KV 存储](https://github.com/anomalyco/opencode/pull/63998) | 通过事件接口提供按修订号获取的值、删除记录、快照及实时更新。 | 探索客户端状态同步基础设施；当前明确属于设计实验。 |
| [#63986：V2 客户端展示工具耗时](https://github.com/anomalyco/opencode/pull/63986) | 为工具执行增加耗时展示。 | 改善长任务可观测性，帮助区分正常执行与疑似卡住。 |

## 4. 功能需求趋势

- **跨设备工作流与状态可观测性**：需求不止于“能连接”，还包括桌面任务通知手机，以及保留会话中断原因，方便追踪无人值守任务。[#63992](https://github.com/anomalyco/opencode/issues/63992) · [#64013，Closed](https://github.com/anomalyco/opencode/issues/64013)
- **会话组织与导航效率**：归档过滤、打开列表时聚焦当前会话、关联分叉会话页签，反映多会话管理正在成为核心体验需求。[#63951](https://github.com/anomalyco/opencode/issues/63951) · [#63954](https://github.com/anomalyco/opencode/issues/63954) · [#63993](https://github.com/anomalyco/opencode/issues/63993)
- **TUI 轻量化与紧凑布局**：社区同时关注隐藏组件的无效计算、切页动画重绘，以及更窄的边距设置；重点是降低开销并提高信息密度。[#63996](https://github.com/anomalyco/opencode/issues/63996) · [#63995](https://github.com/anomalyco/opencode/issues/63995) · [#64014](https://github.com/anomalyco/opencode/issues/64014) · [#63965](https://github.com/anomalyco/opencode/issues/63965)
- **操作入口更直接、平台行为更一致**：用户希望撤销/复制/分叉按钮无需展开隐藏区域，Linux 原生菜单也应支持更可控的显示方式。[#63968](https://github.com/anomalyco/opencode/issues/63968) · [#64003](https://github.com/anomalyco/opencode/issues/64003)
- **模型策略透明、可控且能恢复**：相较单纯增加模型，当前反馈更强调允许列表必须生效、目录同步必须可靠、网络故障后应能恢复。[#63958](https://github.com/anomalyco/opencode/issues/63958) · [#63999](https://github.com/anomalyco/opencode/issues/63999)

## 5. 开发者关注点

1. **优先验证长期运行可靠性。** PTY 僵尸进程与服务重启后的会话恢复、提示词重提问题，都可能影响多终端和长时间任务。后者虽已 Closed，但数据未提供关闭原因，不能据此认定修复。[#63976](https://github.com/anomalyco/opencode/issues/63976) · [#63997](https://github.com/anomalyco/opencode/issues/63997)

2. **模型配置与额度显示需要可信。** 模型回退、过期目录，以及“额度未按显示时间重置”的报告，共同指向配置和使用状态的可解释性；相关反馈不应直接等同于已确认的计费故障。[#63958](https://github.com/anomalyco/opencode/issues/63958) · [#63999](https://github.com/anomalyco/opencode/issues/63999) · [#63994，Closed](https://github.com/anomalyco/opencode/issues/63994)

3. **字符编码应做端到端测试。** 文本截断、shell 分页、非 UTF-8 grep 结果分别暴露不同边界，测试需要同时覆盖字符、字节流和工具结果解析。[#64007](https://github.com/anomalyco/opencode/pull/64007) · [#63984](https://github.com/anomalyco/opencode/pull/63984) · [#64000，Closed](https://github.com/anomalyco/opencode/pull/64000)

4. **自动化治理应保留有效追踪入口。** 有用户质疑 AI 审核器将问题标记为重复，却指向已关闭且不计划处理的 Issue；这会增加持续性缺陷的追踪成本。[#63975](https://github.com/anomalyco/opencode/issues/63975)

**近期建议：** 长会话用户重点跟踪 PTY 回收与重连行为；多模型用户检查回退结果和允许列表是否一致；插件作者提前审查 OpenTUI 0.9.0 的接口兼容性。当前重点 PR 仍待合并与发布验证。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-15

## 今日速览

过去 24 小时的数据包含 **16 条更新的 Issue、1 条更新的 PR，未提供新 Release**；讨论重点集中在 codemode 稳定性、模型错误重试、安装环境识别与终端交互体验。扩展 API 方面，`ctx.ui.select` 的描述文本支持已有对应 PR，但记录仅显示已关闭，不能据此确认合并或发布。

> **数据说明**：数据源标注为 `badlogic/pi-mono`，条目指向 `earendil-works/pi`，下文按条目所示仓库生成链接。所有 Issue 均显示为 CLOSED；由于未提供关闭原因和维护者回复正文，**关闭不等于已修复**。“社区反应”仅依据评论和点赞数据判断，不推断讨论结论。

## 社区热点 Issues

### 1. codemode 并行读取失败后出现未捕获异常
**[#12167](https://github.com/earendil-works/pi/issues/12167)** · 4 条评论 · 已关闭

- **问题**：用户报告在 Windows、Pi 1.5.2 环境中，并行读取遇到 `ENOENT` 后，取消其他读取触发未捕获的 `AbortError`，导致 Pi 退出。
- **重要性**：影响批量工具执行的容错能力，单个文件缺失可能扩大为整个会话中断。
- **社区反应**：本批数据评论最多的 Issue，暂无点赞；是否已有修复需进一步核实。

### 2. Durable Object 重启可能导致 LiveDoc 持续不可读
**[#12181](https://github.com/earendil-works/pi/issues/12181)** · 1 条评论 · 已关闭

- **问题**：报告称 `pi-durable` 在回答过程中遭遇宿主重启后，残留的进度增量可能让 LiveDoc 持续无法读取。
- **重要性**：涉及持久化状态一致性和故障恢复，对长运行 Agent 服务的影响高于一般 UI 缺陷。
- **社区反应**：已有 1 条评论；摘要未完整提供复现条件，不能判断发生概率。

### 3. SSE 错误信息丢失，影响自动重试
**[#12169](https://github.com/earendil-works/pi/issues/12169)** · 2 条评论 · 已关闭

- **问题**：`openai-completions` 接收到 HTTP 200、但 SSE 内容携带 `code: 503` 的错误时，没有触发重试。
- **重要性**：暴露了流式错误解析与重试分类之间的信息传递问题，可能影响兼容 OpenAI 协议的服务。
- **社区反应**：报告提供了本地模拟端点复现，观察结果为一次请求、零次重试，便于后续验证。

### 4. 工具发现结果占用大量上下文
**[#12165](https://github.com/earendil-works/pi/issues/12165)** · 1 条评论 · 已关闭

- **问题**：用户在一个长会话中记录到，73 次 `searchTools` 结果累计约 950KB，占模型可见内容约 25%。
- **重要性**：完整工具描述反复进入上下文，可能增加成本、挤压有效工作空间，是值得关注的 Agent 效率问题。
- **社区反应**：提供了量化样本，但数据来自单个会话，不宜直接推广到所有使用场景。

### 5. WSL 安装器误识别 Windows 安装
**[#12172](https://github.com/earendil-works/pi/issues/12172)** · 2 条评论 · 已关闭

- **问题**：WSL 通过 `/mnt/c` 和 Windows PATH 找到 Windows 版 `pi` 后，安装器将其视作当前环境的安装，并提供重装、卸载选项。
- **重要性**：跨系统 PATH 互操作容易造成安装目标混淆，需要明确区分 Windows 与 Linux 环境。
- **社区反应**：已有 2 条评论，是本批安装体验反馈之一。

### 6. Ubuntu 同名程序被误判为 Pi
**[#12166](https://github.com/earendil-works/pi/issues/12166)** · 2 条评论 · 已关闭

- **问题**：Ubuntu 中通过 `apt install pi` 安装的无关程序 `/usr/bin/pi`，被安装器识别为现有 Pi 安装。
- **重要性**：说明仅按命令名识别安装来源不够可靠，涉及重装和卸载操作时尤其需要谨慎。
- **社区反应**：与 WSL 问题共同指向“安装身份识别”这一方向，但两者成因不同。

### 7. codemode 批处理降低技能读取可见性
**[#12176](https://github.com/earendil-works/pi/issues/12176)** · 2 条评论 · 已关闭

- **问题**：通过 codemode 内部 `tools.read()` 读取 `SKILL.md` 时，界面主要展示 codemode 调用，技能读取不够直观。
- **重要性**：批处理提高效率的同时，也需要保留工具调用和技能激活的可检查性。
- **社区反应**：已有 2 条评论，体现出用户对 Agent 行为透明度的关注。

### 8. Gemini 思考等级声明与适配器不一致
**[#12177](https://github.com/earendil-works/pi/issues/12177)** · 1 条评论 · 已关闭

- **问题**：报告称 Gemini 4 Hydrogen 模型页面声明支持 `xhigh`，但 Google 与 Vertex 适配器拒绝该等级映射。
- **重要性**：模型能力声明、配置选项与供应商适配层需要保持一致，否则会出现“可选但不可用”。
- **社区反应**：已有 1 条评论；当前材料不足以确认最终支持范围。

### 9. 动态 API Key 失效后，认证状态仍显示已配置
**[#12164](https://github.com/earendil-works/pi/issues/12164)** · 1 条评论 · 已关闭

- **问题**：`auth.json` 中的 `!command` 因密钥管理工具会话过期而失败，但 `/login` 仍显示绿色已配置，实际请求则提示没有 API Key。
- **重要性**：开发者需要区分“存在凭据配置”和“当前可以成功解析凭据”，以减少排障误导。
- **社区反应**：已有 1 条评论，反馈集中于状态展示与实际可用性不一致。

### 10. 为 `ctx.ui.select` 增加描述文本
**[#12179](https://github.com/earendil-works/pi/issues/12179)** · 1 条评论 · 已关闭

- **需求**：让扩展的多选交互除了标题，还能展示背景说明。
- **重要性**：有助于承载更复杂的 Agent 问答与决策界面；摘要指出底层组件已有相应能力。
- **社区反应**：作者提交了对应 PR，形成明确的需求—实现关联，但尚不能确认已合并。

## 重要 PR 进展

本批数据**仅提供 1 条 PR**，因此不补足为 10 条，也不将 Issue 当作 PR 列出。

### `ctx.ui.select` 描述文本支持
**[PR #12178](https://github.com/earendil-works/pi/pull/12178)** · 作者：danielroe · **已关闭，合并状态未知**

- **改动内容**：将底层 `ExtensionSelectorComponent` 已支持的 `description` 参数贯通到 `ctx.ui.select`。
- **开发价值**：扩展作者可在选择框中提供额外上下文，改善多项选择和交互式提问体验。
- **关联需求**：[Issue #12179](https://github.com/earendil-works/pi/issues/12179)。
- **数据限制**：评论数未提供，无法判断评审活跃度；也没有发布记录证明该能力已经可用。

## 功能需求趋势

| 方向 | 趋势判断与依据 |
|---|---|
| **执行可靠性与恢复能力** | 关注点从正常执行延伸到取消、流式错误与宿主重启后的恢复。代表：[codemode 异常](https://github.com/earendil-works/pi/issues/12167)、[SSE 重试](https://github.com/earendil-works/pi/issues/12169)、[LiveDoc 恢复](https://github.com/earendil-works/pi/issues/12181)。 |
| **上下文效率与可观测性** | 用户既希望减少工具描述开销，也希望批处理不掩盖关键操作。代表：[工具发现开销](https://github.com/earendil-works/pi/issues/12165)、[技能读取展示](https://github.com/earendil-works/pi/issues/12176)。 |
| **终端交互一致性** | 需求集中于符合系统和终端习惯，包括 [macOS Cmd+C 复制](https://github.com/earendil-works/pi/issues/12174)、[URL 双击选中边界](https://github.com/earendil-works/pi/issues/12175)、[内置斜杠命令进入历史](https://github.com/earendil-works/pi/issues/12171)。 |
| **扩展与会话控制 API** | 除选择框描述外，还有通过 RPC 暴露树导航、修正回退行为的需求。代表：[选择框描述](https://github.com/earendil-works/pi/issues/12179)、[RPC `navigate_tree`](https://github.com/earendil-works/pi/issues/12170)。 |
| **模型适配与错误处理语义** | 用户关注新思考等级支持，以及请求被拒绝后的处理方式。代表：[Gemini 等级映射](https://github.com/earendil-works/pi/issues/12177)、[OpenAI 策略拒绝后的重试诉求](https://github.com/earendil-works/pi/issues/12180)。策略拒绝不应与临时服务故障一概采用相同重试逻辑。 |

## 开发者关注点

- **先保证失败可恢复，再优化正常路径。** 文件读取失败、流式错误和进程重启都可能中断长任务，值得优先建立回归测试与恢复验证。[相关 Issue](https://github.com/earendil-works/pi/issues/12181)
- **状态展示必须反映真实可用性。** 凭据“已配置”、模型等级“可选择”、工具“已执行”都需要与实际行为一致。[认证状态](https://github.com/earendil-works/pi/issues/12164) · [模型能力](https://github.com/earendil-works/pi/issues/12177)
- **安装和文档仍存在上手阻力。** 除环境识别问题外，SDK 文档存在重复 `/latest` 路径导致的 404 反馈。[安装器](https://github.com/earendil-works/pi/issues/12166) · [文档链接](https://github.com/earendil-works/pi/issues/12173)
- **日常交互细节影响持续使用体验。** 复制、选中和命令历史虽不是核心模型能力，却直接影响终端开发工作流。[复制快捷键](https://github.com/earendil-works/pi/issues/12174) · [命令历史](https://github.com/earendil-works/pi/issues/12171)

**总体判断**：这批反馈更偏向既有能力的可靠性、透明度和一致性打磨，而非大规模新增功能。后续应重点追踪关闭条目对应的代码变更、合并记录与发布说明，避免将 Issue 关闭视为问题已经交付解决。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**2026-11-15｜[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

## 1. 今日速览

今天的主线是**上下文管理升级、Web Shell 体验改进与 CI 稳定性治理**：上下文余量查询、主动压缩、失败工具调用保留和图像 Token 估算均出现对应 PR。与此同时，Windows daemon 弹窗、托管子智能体恢复异常及发布验证失败仍值得关注；安全议题则集中在 CI 凭证隔离、私密漏洞报告渠道和不可信工具输出追踪。

> **统计口径**：过去 24 小时共有 37 条 Issue、44 条 PR 更新，本文基于提供的 30 条 Issue、20 条 PR 摘要筛选。PR 评论数未提供，不能据此衡量讨论热度；`CLOSED` 也不等于已修复或已合并。

## 2. 版本发布

### [v0.27.2-nightly.20261113.6f754be654](https://github.com/QwenLM/qwen-code/releases/tag/v0.27.2-nightly.20261113.6f754be654)

- **托管会话接入客户端文件系统**：通过 [PR #16844](https://github.com/QwenLM/qwen-code/pull/16844) 将客户端文件系统注册到 managed sessions，扩展托管智能体使用客户端文件资源的能力。
- 发布说明还包含一项 Web Shell 测试变更，但摘要截断，无法确认具体内容。

**发布风险提示**：数据中出现多条 v0.27.4 发布失败记录，失败任务包括 `integration_none` 和 `integration_docker`。相关 Issue 虽已关闭，但当前材料不足以确认正式版本已成功发布；部分报告指向同一工作流运行，不宜视为独立故障计数。参见 [#17308](https://github.com/QwenLM/qwen-code/issues/17308)、[#17305](https://github.com/QwenLM/qwen-code/issues/17305)。

## 3. 社区热点 Issues

以下按潜在影响和开发价值筛选，并非纯评论数排名。所选条目均为 0 👍，讨论量为 2–3 条，尚不宜解读为广泛社区共识。

| Issue | 为什么值得关注 | 社区反应与当前状态 |
|---|---|---|
| **[#17311：为临时 Runner 管理器配置独立凭证身份](https://github.com/QwenLM/qwen-code/issues/17311)** | **P1**。避免 Runner 注册与维护者、其他自动化共享 API 配额，降低基础设施相互干扰风险。 | 2 条评论；OPEN，`ready-for-human`，需要人工推进凭证与权限配置。 |
| **[#17288：如何私密报告安全漏洞？](https://github.com/QwenLM/qwen-code/issues/17288)** | **P1**。报告者称现有门户无法使用，仓库也未启用 GitHub 私密漏洞报告，暴露安全响应入口的可达性问题；不代表漏洞细节已获确认。 | 2 条评论；OPEN，尚无已解决证据。 |
| **[#17266：Windows Web Shell 触发大量 cmd.exe 窗口](https://github.com/QwenLM/qwen-code/issues/17266)** | **P2**。用户在 Windows 11、daemon 模式报告控制台闪烁、Git 轮询重叠和高 CPU，直接影响日常可用性。 | 3 条评论；OPEN。已有针对进程窗口隐藏的 [PR #17296](https://github.com/QwenLM/qwen-code/pull/17296)，但不能据此认定轮询重叠也已解决。 |
| **[#17261：内容型工作区的子智能体启动后无输出](https://github.com/QwenLM/qwen-code/issues/17261)** | **P2**。子智能体可启动却持续无进展，最终触发 `hosted_turn_deadline_exceeded`，影响托管任务委派可靠性。 | 3 条评论；CLOSED，但仍标记 `need-retesting`，应以复测结果确认恢复。 |
| **[#17260：工作区拓扑迁移后取消恢复无限循环](https://github.com/QwenLM/qwen-code/issues/17260)** | **P2**。从 `shell` 迁移到 `external-files` 后，旧子任务停留在 `CANCELLING` 并反复恢复，涉及跨拓扑状态兼容。 | 2 条评论；OPEN，迁移场景仍需跟踪。 |
| **[#17316：MCP 客户端支持 elicitation](https://github.com/QwenLM/qwen-code/issues/17316)** | **P2**。允许 MCP 服务在交互中请求符合 JSON Schema 的结构化用户输入，关系到依赖该协议的服务兼容性。 | 2 条评论；OPEN、`need-discussion`，仍处于需求讨论阶段。 |
| **[#17313：上下文余量工具与模型主动压缩](https://github.com/QwenLM/qwen-code/issues/17313)** | **P2**。让模型感知剩余上下文并主动压缩，有望改善长任务临近窗口上限时的策略选择。 | 2 条评论；OPEN、`in-progress`，已有 [PR #17320](https://github.com/QwenLM/qwen-code/pull/17320)。 |
| **[#17314：压缩时保留近期失败工具尝试](https://github.com/QwenLM/qwen-code/issues/17314)** | **P2**。避免压缩摘要遗漏失败原因和重试约束，导致模型重复走入相同错误路径。 | 2 条评论；OPEN，已有 [PR #17322](https://github.com/QwenLM/qwen-code/pull/17322)。 |
| **[#17315：按分辨率估算图像 Token](https://github.com/QwenLM/qwen-code/issues/17315)** | **P3**。替代统一图像开销常量，使上下文预算更贴近图片尺寸，改善自动压缩触发判断。 | 2 条评论；OPEN，已有 [PR #17321](https://github.com/QwenLM/qwen-code/pull/17321)；实际效果仍需结合提供商计费规则验证。 |
| **[#17318：追踪 Shell 与远程工具输出中的不可信上下文](https://github.com/QwenLM/qwen-code/issues/17318)** | **P3**。希望从零散防护转向系统化标记，降低工具输出中提示注入内容被当作可信指令的风险。 | 2 条评论；OPEN、`need-discussion`，当前材料未显示对应实现 PR。 |

## 4. 重要 PR 进展

以下内容依据 PR 摘要描述；除明确说明外，均仍处于 **OPEN** 状态，不代表已发布。

1. **[#17320：上下文余量查询与主动压缩](https://github.com/QwenLM/qwen-code/pull/17320)**  
   为模型提供上下文预算相关的延迟加载工具。`get_context_remaining` 可报告窗口大小、已用及剩余 Token、自动压缩触发阈值，并区分估算值与实际计数。

2. **[#17322：压缩输入保留工具失败摘要](https://github.com/QwenLM/qwen-code/pull/17322)**  
   从待压缩历史中提取有界的失败调用摘要，并明确要求将失败尝试及原因保留到状态快照，减少压缩后的重复试错。

3. **[#17321：基于图像分辨率估算 Token](https://github.com/QwenLM/qwen-code/pull/17321)**  
   使用只读取文件头、无额外依赖的解析器获取 PNG/GIF/JPEG/WebP 尺寸，替代固定 1600 Token 的图像估算方式。

4. **[#17319：修复 Memory Manager 测试启动器的模块模式](https://github.com/QwenLM/qwen-code/pull/17319)**  
   将生成的假编辑器和打开器启动脚本目录明确设为 CommonJS，避免仓库 ESM 作用域影响使用 `require` 的测试夹具。这是当天多次同类修复尝试中的一个仍开放 PR，最终效果需看 CI。

5. **[#17296：隐藏 Windows daemon 的直接 Git 子进程窗口](https://github.com/QwenLM/qwen-code/pull/17296)**  
   为五处直接启动路径添加 `windowsHide: true`，针对 Windows 控制台闪烁问题；该改动不应被扩大解读为已解决所有 Git 轮询和 CPU 问题。

6. **[#17299：显示待执行的 loop wakeup](https://github.com/QwenLM/qwen-code/pull/17299)**  
   在计划任务页、侧边栏和会话头部展示待唤醒任务，并让 daemon 的 `/scheduled-tasks` API 返回 `wakeups`，避免等待中的会话看起来像已结束。

7. **[#17291：多工作区 Goals 的合并后补强](https://github.com/QwenLM/qwen-code/pull/17291)**  
   跟进已合并的多工作区 Goals 功能，集中处理六项审查建议，其中包括将工作区目标查询纳入 Conversations 活动门控。

8. **[#17301：转录文件读取的 TOCTOU 加固](https://github.com/QwenLM/qwen-code/pull/17301)**  
   使用 `O_RDONLY | O_NONBLOCK` 打开转录文件后，在文件描述符上重新检查是否为普通文件，防止检查与使用之间的文件类型变化。

9. **[#17285：Agent Loop 能力清单与上线规则](https://github.com/QwenLM/qwen-code/pull/17285)**  
   以 141 行能力映射对照 1.0 Preview 与当前主线，并补充迁移规则，为共享 Agent Loop 的行为兼容和上线评估提供依据。

10. **[#17281：按已提交状态读取继承的扩展配置](https://github.com/QwenLM/qwen-code/pull/17281)**  
    对齐 Managed Session 资源的已提交状态契约，并改进子智能体尚未获得 Runtime 就失败时的结果转发。**状态为 CLOSED，提供的数据未确认是否合并。**

## 5. 功能需求趋势

- **上下文管理从被动触发转向模型可感知、可控制**  
  余量查询、主动压缩、失败历史保留和图像预算估算形成连续需求链，关注点不只是“容纳更多内容”，还包括压缩后能否继续正确执行。参见 [#17313](https://github.com/QwenLM/qwen-code/issues/17313)、[#17314](https://github.com/QwenLM/qwen-code/issues/17314)、[#17315](https://github.com/QwenLM/qwen-code/issues/17315)。

- **后台自动化需要更好的可观测性与多工作区支持**  
  用户希望统一管理不同工作区的 Goals，并明确看到会话何时会被再次唤醒。参见 [#17275](https://github.com/QwenLM/qwen-code/issues/17275)、[#17267](https://github.com/QwenLM/qwen-code/issues/17267)。

- **托管多智能体的恢复能力成为关键工程议题**  
  外部文件工作区、公开子智能体委派及拓扑迁移暴露出状态恢复和生命周期衔接问题。参见 [#17247](https://github.com/QwenLM/qwen-code/issues/17247)、[#17260](https://github.com/QwenLM/qwen-code/issues/17260)。

- **MCP 兼容性向交互协议深化**  
  新需求已超出基础工具调用，开始要求服务器发起结构化用户询问。参见 [#17316](https://github.com/QwenLM/qwen-code/issues/17316)。

- **安全治理同时覆盖运行时与开发流水线**  
  不可信上下文追踪、Runner 独立身份及私密漏洞入口分别指向提示注入防护、CI 隔离和安全响应流程。参见 [#17318](https://github.com/QwenLM/qwen-code/issues/17318)、[#17311](https://github.com/QwenLM/qwen-code/issues/17311)、[#17288](https://github.com/QwenLM/qwen-code/issues/17288)。

## 6. 开发者关注点

- **先稳住 CI 和发布链路**：Memory Manager E2E 失败、模块模式修复反复出现，Runner 管理器还存在配额耗尽后盲目重试及缺少告警的问题。参见 [#17298](https://github.com/QwenLM/qwen-code/issues/17298)、[#17312](https://github.com/QwenLM/qwen-code/issues/17312)。
- **保护输入的原始语义**：自定义命令参数经过 JavaScript 替换字符串处理后，`$$`、`$&` 等内容可能被改写，影响命令可预测性。参见 [#17289](https://github.com/QwenLM/qwen-code/issues/17289)。
- **Web Shell 细节影响日常效率**：除了 Windows 弹窗，整行选择后不显示复制菜单、“Ask for details” 忽略模型输出语言设置也有反馈。参见 [#17270](https://github.com/QwenLM/qwen-code/issues/17270)、[#17290](https://github.com/QwenLM/qwen-code/issues/17290)。
- **统一 Agent Loop 时避免遗漏既有行为**：迁移跟踪明确收集主改造之外的后续工作，并提及 11 月 21 日冻结节点，后续应重点看能力差异是否逐项闭环。参见 [#17284](https://github.com/QwenLM/qwen-code/issues/17284)。
- **中文文档同步仍需持续维护**：缺失的中文设计文档和失效语言导航正在补齐，生成统计设计翻译已进入审查。参见 [#17302](https://github.com/QwenLM/qwen-code/issues/17302)、[#17303](https://github.com/QwenLM/qwen-code/issues/17303)。

**分析师结论**：今日最值得跟踪的是三项上下文管理 PR 能否通过验证，以及 CI、Windows daemon 和托管子智能体问题能否真正闭环。对使用者而言，近期应区分“已有修复提案”“Issue 已关闭”和“修复已发布”这三个不同阶段。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-15**

> **数据说明**：本次提供的数据包含 3 条 Issue、2 条 PR，不足各 10 条，以下全部列出，不补充未提供的条目。另有两点需注意：条目链接指向 `codewhale-hq/Codewhale`，与指定来源 `Hmbown/DeepSeek-TUI` 不一致；部分条目的更新日期为 11 月 14 日，缺少具体时间，无法独立确认是否处于过去 24 小时内。本文按所给数据汇总，链接按条目所标仓库生成。

## 一、今日速览

本批动态集中在 **Linux 终端兼容性**与**工具调用参数解析可靠性**：两条 Issue 分别报告退出后终端配色未恢复、窗口重新获得焦点时闪屏，两条外部贡献 PR 则修复 CLI 参数误解析和多行 XML 参数丢失。所有条目目前均为 OPEN，尚无合并或修复完成的证据；过去 24 小时未提供新版本发布记录。

## 二、社区热点 Issues

### 1. #7344：退出后 GNOME Terminal 配色未恢复
**标签**：`area:tui`、`area:install`、`os:linux`｜**状态**：OPEN

- **问题**：用户反馈，退出应用后终端仍保留 Nord 浅色主题的背景色 `#ECEFF4`、前景色 `#2E3440`，而调色板仍为 Solarized，出现配色混用。
- **为什么重要**：影响应用退出后的终端使用体验，提示需要检查主题应用、退出清理及原始颜色恢复流程。
- **社区反应**：当前 0 评论、0 👍，暂未看到维护者确认或其他用户复现。

[GitHub Issue #7344](https://github.com/codewhale-hq/Codewhale/issues/7344)

### 2. #7343：窗口获得焦点时全屏重绘导致闪烁
**标签**：`area:tui`、`os:linux`｜**状态**：OPEN

- **问题**：用户反馈，TUI 每次重新获得窗口焦点都会执行全屏清除（`CSI 2J`）并重绘。尽管使用了 DEC 2026 同步更新标记，在不支持该能力的终端中，清屏与重绘仍可能被分开显示，产生闪烁。
- **为什么重要**：涉及 GNOME Terminal、较旧 VTE 等环境的渲染兼容性；焦点切换属于高频操作，问题会直接影响日常交互。
- **社区反应**：当前 0 评论、0 👍，影响范围及修复方案尚未确认。

[GitHub Issue #7343](https://github.com/codewhale-hq/Codewhale/issues/7343)

### 3. #7345：MCP ServerList 收录与 README 徽章请求
**标签**：`area:mcp`｜**状态**：OPEN

- **内容**：提交者表示已将 Codewhale MCP 收录至 MCP ServerList，并请求在项目 README 中添加收录徽章。
- **为什么重要**：属于生态曝光与文档展示请求，可能提升 MCP 服务的可发现性，但不代表新增 MCP 功能或协议支持。
- **社区反应**：当前 0 评论、0 👍，尚无维护者回应。

[GitHub Issue #7345](https://github.com/codewhale-hq/Codewhale/issues/7345)

## 三、重要 PR 进展

### 1. #7342：避免把 CLI 参数值中的赋值语句误解析为工具参数
**作者**：Ricardo-M-L｜**标签**：`bug`、`area:core`、`contributor:external`｜**状态**：OPEN

- **修复内容**：fallback 解析器的第二轮 `key=value` 扫描会重复处理已被 `--argument` 消费的文本。例如，`--command "MODE=dev node app.js"` 可能被额外解析出一个 `MODE` 工具参数。
- **价值**：保持命令字符串及含赋值语句的文件内容原样，减少工具执行前的参数污染。
- **进展**：尚未合并；👍 为 0，评论数未提供，无法判断审查活跃度。

[GitHub PR #7342](https://github.com/codewhale-hq/Codewhale/pull/7342)

### 2. #7341：保留 XML 工具调用中的多行参数
**作者**：Ricardo-M-L｜**标签**：`bug`、`area:core`、`contributor:external`｜**状态**：OPEN

- **修复内容**：修正 XML fallback 工具调用对含换行参数的处理。按 PR 描述，模型生成的多行 `write_file` 内容可能在引擎执行前丢失，最终形成空参数对象。
- **价值**：保障代码、配置和文档等多行内容能够完整传入工具，避免参数静默丢失。
- **进展**：尚未合并；👍 为 0，评论数未提供，测试与审查结果未知。

[GitHub PR #7341](https://github.com/codewhale-hq/Codewhale/pull/7341)

## 四、功能需求趋势

本批仅有 3 条 Issue，**不足以判断长期社区偏好**，但可观察到以下方向：

| 方向 | 当前信号 | 分析 |
|---|---|---|
| **Linux 终端兼容性与体验** | 2 条 Issue 涉及配色恢复和焦点重绘 | 是本批最集中的反馈，重点在终端状态管理与渲染能力适配。[#7344](https://github.com/codewhale-hq/Codewhale/issues/7344)、[#7343](https://github.com/codewhale-hq/Codewhale/issues/7343) |
| **MCP 生态可发现性** | 1 条目录收录及徽章请求 | 偏向生态推广与文档维护，尚未形成集成能力方面的需求信号。[#7345](https://github.com/codewhale-hq/Codewhale/issues/7345) |

本批 Issue 未提供 IDE 集成、新模型支持等方向的明确需求证据。

## 五、开发者关注点

- **退出后不应留下终端副作用**：需要关注正常退出及异常退出时的颜色恢复，避免应用主题持续影响用户终端。[#7344](https://github.com/codewhale-hq/Codewhale/issues/7344)
- **渲染应适配终端能力差异**：焦点切换时的全屏清除与重绘，在不支持同步更新的环境中可能暴露闪屏，值得检查兼容性降级路径。[#7343](https://github.com/codewhale-hq/Codewhale/issues/7343)
- **工具参数应保持内容完整、边界明确**：两条 PR 指向相近痛点——fallback 解析阶段不应重复解释参数值，也不应丢失多行内容。建议重点验证带环境变量的命令、含 `=` 的文件内容及多行 XML 参数等边界场景。[#7342](https://github.com/codewhale-hq/Codewhale/pull/7342)、[#7341](https://github.com/codewhale-hq/Codewhale/pull/7341)

**总体判断**：当前信号偏向稳定性修复，而非功能扩张。后续值得跟踪两条解析修复 PR 的审查与合并情况，以及 Linux 终端问题是否获得维护者确认。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*