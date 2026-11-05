# AI CLI 工具社区动态日报 2026-11-05

> 生成时间: 2026-11-05 03:42 UTC | 覆盖工具: 9 个

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
**日期：2026-11-05｜基于所提供的社区动态样本**

> **口径说明**：各仓库的数据覆盖范围不同，部分仅提供抽样记录，不能将展示条目数直接作为完整活跃度排名。Issue 多为用户报告；PR 的 `CLOSED` 不代表已合并，Issue 关闭也不代表问题已修复。以下判断区分已发布能力、开发动向与待验证反馈。

## 一、生态全景

当前 AI CLI 的竞争焦点正从“能生成代码、调用工具”，转向**长任务能否可靠执行、失败能否恢复、结果能否核验**。权限状态不一致、会话连续性和成本透明度成为多个社区的共同痛点，说明代理工作流对基础运行机制提出了更高要求。CLI 也在向 IDE、桌面应用和第三方客户端的底层代理能力层演进，ACP、MCP、认证接口及运行状态接口的重要性持续上升。与此同时，多模型接入的难点已从配置端点，延伸到参数映射、能力声明、缓存机制和历史上下文兼容。

## 二、各工具活跃度对比

下表统计的是**窗口内更新数量**，不等同于当日新增数量。

| 工具 | Issues：报告总数 / 展示数 | PR：报告总数 / 展示数 | Release 情况 | 当日主要信号 |
|---|---:|---:|---|---|
| **Claude Code** | 50 / 30 | 0 | 无新发布 | 权限执行、长会话资源、Windows/IDE 稳定性 |
| **OpenAI Codex** | 50 / 30 | 40 / 20 | **4 个 Alpha**，覆盖 0.167、0.168 两条版本线 | 高频预发布；权限、云会话、提供方与 TUI 并行调整 |
| **Gemini CLI** | 1 / 1 | 13 / 13 | **2 个**：v0.67.0 稳定版、v0.68.0 预览版 | ACP 修复密集；另有 P0 nightly 发布失败 |
| **GitHub Copilot CLI** | 6 / 6 | 0 | **1 个**：v1.0.106-9 | 补丁统计和配置诊断改善；集成与执行可靠性反馈 |
| **Kimi Code CLI** | 0 | 0 | 无新发布 | 提供窗口内无活动 |
| **OpenCode** | 50 / 30 | 50 / 20 | 无新发布 | 状态机重构、MCP 兼容与供应商可用性 |
| **Pi** | 未提供总数；选出 10 个独立议题 | 4 / 4 | 无新发布 | 文件编码、扩展容错、跨平台运行与退出竞态 |
| **Qwen Code** | 9 / 9 | 24 / 20 | **1 个 nightly** | Web Shell、Managed Agent、多模型兼容 |
| **DeepSeek TUI / Codewhale 条目** | 1 / 1 | 3 / 3 | 无新发布 | HTTP 429 恢复、Windows 图片输入与状态目录 |

**数据归属提醒**：Pi 条目实际链接到 `earendil-works/pi`；DeepSeek TUI 条目链接到 `codewhale-hq/Codewhale`。在核实仓库归属前，不宜将这些活动直接累积到原仓库的长期指标中。

## 三、共同关注的功能方向

| 共同方向 | 涉及工具及具体诉求 | 对技术决策的意义 |
|---|---|---|
| **权限与认证可预测性** | Claude Code：Read deny、Edit allow 执行一致性；Codex：Full access、浏览器授权状态；Copilot：可组合认证接口；Pi：OAuth 刷新落盘竞态；OpenCode：外部认证衔接 | 不能只验证配置是否存在，还需验证**实际生效权限**和凭证生命周期 |
| **长任务连续性与故障恢复** | Claude Code：休眠、额度恢复；Codex：断线重连、跨设备会话；OpenCode：错误输入后的会话恢复、网络重试；Pi：无头任务崩溃；Qwen：历史回退、限流消息保留；Codewhale：429 有界重试 | 无人值守能力取决于恢复机制，而非仅取决于单轮任务表现 |
| **协议与外部客户端能力一致性** | Gemini：ACP 钩子、实时日志和工具输出；Copilot：ACP 模型与档位暴露；OpenCode：MCP SSE 回退、通知解析和元数据保留；Qwen：ACP 测试隔离 | “连接成功”不足以证明集成完整，需要协议级兼容测试 |
| **状态可观测与结果可核验** | Codex：完成声明与执行记录对应；Claude Code：额度接口、子代理记录；Qwen：计划步骤与子会话关联；OpenCode：工具可发现性、插件运行状态 | 应提供命令、测试、产物和代理状态，而不只是自然语言总结 |
| **成本与资源效率** | Claude Code：内存异常、压缩与缓存重写；Codex：后台任务额度；OpenCode：预热成本、额度重置；Qwen：空闲轮询、正文缓存、查询索引 | 应评估**每个成功完成任务的总成本**，而非仅比较 Token 单价 |
| **跨平台与输入输出完整性** | Windows 问题横跨 Claude、Codex、Copilot、OpenCode、Pi、Codewhale；另有 Gemini macOS 沙箱、Pi Android 阻塞、Qwen 东南亚语言过滤 | 平台、语言和文件格式应进入选型测试矩阵 |

这些方向来自不同项目的独立信号，**不意味着故障具有共同根因**。

## 四、差异化定位分析

以下为本期动态所反映的侧重，并非完整产品能力排名。

| 工具 | 功能与技术侧重 | 更相关的目标用户或场景 |
|---|---|---|
| **Claude Code** | 权限规则、子代理和 IDE/桌面工作流；当前样本以既有能力可靠性为主 | 使用复杂代码库、长会话和受控权限的开发团队 |
| **Codex** | 云端与本地会话协同、沙箱权限、多提供方、TUI 和子代理状态 | 需要跨设备、多会话及可审计代理交付的团队 |
| **Gemini CLI** | ACP 生命周期完整性、沙箱兼容、配置与模板语义确定性 | 将 CLI 接入外部客户端或自动化系统的集成开发者 |
| **Copilot CLI** | 终端交互、组织策略环境下的认证，以及 ACP 能力暴露 | GitHub 生态用户、企业受管环境及第三方客户端开发者 |
| **OpenCode** | 多供应商、多协议与桌面/TUI 扩展；以显式状态机治理复杂生命周期 | 重视模型选择、插件能力及运行环境可定制性的用户 |
| **Pi** | 可嵌入运行、扩展渲染、底层工具语义和轻量交互可靠性 | 扩展作者、嵌入式代理宿主及自定义工作流开发者 |
| **Qwen Code** | Web Shell、Managed Agent、渠道自动化和多模型兼容并行推进 | 嵌入式 Web 界面、托管代理和企业渠道集成场景 |
| **DeepSeek TUI / Codewhale 条目** | 有界网络恢复、Windows 剪贴板及本地状态存储兼容 | 关注本地终端、截图输入与 Windows 工作流的用户 |
| **Kimi Code CLI** | 当日无活动数据 | 无法据此判断定位变化、成熟度或维护状态 |

## 五、社区热度与成熟度

### 1. 活动规模：OpenCode、Codex 的开发侧信号最强

在已报告的窗口数量中：

- **OpenCode：50 条 Issue、50 条 PR 更新**；
- **Codex：50 条 Issue、40 条 PR 更新**；
- **Claude Code：50 条 Issue 更新，但无 PR 更新**；
- **Qwen Code：24 条 PR 更新**，开发活动覆盖前端、服务端与渠道集成；
- **Gemini CLI：13 条 PR 更新**，主要集中于可靠性修复。

这反映的是仓库可见活动量，不能直接等同于用户规模、产品质量或修复吞吐量。Claude Code 和 Copilot CLI 的零 PR 也不能证明没有内部开发。

### 2. 讨论热度：整体仍低，尚不足以形成广泛共识

Claude Code 样本最高仅 **2 条评论**，Codex 最高 **3 条**，OpenCode 所选热点最高 **4 条**；Qwen 的两个议题达到 **6 条评论**。多数条目点赞很少，因此应优先关注复现材料、独立重复报告和影响程度，而非简单按评论数排序。

### 3. 迭代阶段：发布频率与成熟度需分开看

- **Codex**：4 个 Alpha 表明预发布节奏快，但发布说明不足，不能据此确认具体改善。
- **Gemini CLI**：稳定版、预览版与 nightly 并行；P0 nightly 故障暴露持续交付风险，但没有证据表明稳定版受影响。
- **Qwen Code、OpenCode**：分别呈现多层性能治理与架构性状态机重构，说明仍在积极调整运行机制。
- **Copilot CLI**：本次发布聚焦统计准确性与配置诊断，属于范围明确的体验修正。
- **Pi、Codewhale**：样本较小，但涉及文件损坏风险、凭证保存和重试边界等高价值底层问题。

**结论：本期数据支持判断迭代活跃度，不支持给出可靠的产品成熟度总排名。**

## 六、值得关注的趋势信号

### 1. 代理竞争正在转向“可靠完成任务”

Codex 的完成声明核验、Claude 的权限一致性、Pi 的编码完整性，分别指向结果可信度、安全边界和数据正确性。

**开发者参考**：评估指标应包含任务成功率、测试证据、错误修改率和人工接管次数，而不只看回答速度或演示效果。

### 2. CLI 正成为可集成的代理运行层

Gemini 与 Copilot 的 ACP 需求、OpenCode 的 MCP 和插件接口、Qwen 的 Web Shell，显示交互式终端之外的使用方式正在增加。

**开发者参考**：选型时重点检查协议能力发现、事件完整性、认证接口和版本兼容策略，避免交互端可用而程序化调用受限。

### 3. 生命周期治理正在成为架构重点

OpenCode 多个 PR 转向显式状态机；Pi 处理退出与令牌落盘竞态；Qwen 修正历史回退的异步时序。这些工作共同表明，代理系统的复杂性越来越集中于状态转换和异常时序。

**开发者参考**：将取消、休眠、断线、重启、超时及后台进程残留纳入回归测试。

### 4. 多模型兼容需要超越统一 API

Qwen 的参数映射、OpenCode 的图片能力声明与缓存预热、Pi 的历史消息转换，说明统一接口并未消除供应商差异。

**开发者参考**：维护模型兼容矩阵，至少覆盖输出预算、上下文溢出、多模态、缓存和错误恢复；不要仅以“请求成功”作为验收标准。

### 5. 成本管理将与恢复策略共同设计

重试可以提高成功率，也可能拉长等待并增加消耗；预热、压缩和后台任务也未必天然节省成本。

**开发者参考**：为无人值守任务设置时间、重试、额度和无进展上限，并记录失败任务的实际消耗。

---

**综合判断**：本日没有足够证据支持某个工具“全面领先”，但生态的共同方向已经清晰——**从能力扩张走向可预测执行、可恢复运行和可核验交付**。对技术决策者而言，下一阶段最有价值的比较单位不是功能清单，而是在真实权限、网络、平台和成本约束下，一个任务能否安全、完整地完成。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-11-05｜范围：所提供的 20 条 PR、15 条 Issue**

> **数据说明：**PR 评论数均为 `undefined`、👍 均为 0，因此无法核实真实的 PR 热度排名。下文以提供列表的顺序、相关 Issue 的讨论量及近期更新时间筛选重点，**不将排列顺序视为量化热度排名**。所有展示的 PR 均为 **OPEN**，没有已合并或 Draft 的明确记录。Issue 中还包含 Claude.ai 需求，不能全部归为 Claude Code 功能需求。

## 1. 热门 Skills 排行：8 个重点关注候选

这里既包含新增 Skill，也包含现有 Skill 的修复；“讨论热点”指相关议题，不代表已读取 PR 评论。

| Skill / PR | 功能与提交内容 | 社区关注议题 | 当前状态 |
|---|---|---|---|
| **mcp-builder** · [#1742](https://github.com/anthropics/skills/pull/1742) | 修复 MCP ≥2 的客户端导入及自定义 HTTP 请求头配置 | **MCP 工具链兼容性与可用性**。另有 [#1390](https://github.com/anthropics/skills/issues/1390) 报告真实 MCP 服务评测全部失败，说明评测可靠性也是痛点；两者并非同一缺陷 | **OPEN**；10-08 更新 |
| **skill-creator** · [#1298](https://github.com/anthropics/skills/pull/1298) | 隔离触发评测，修复 Windows 子进程处理及运行时失败计分 | **Skill 到底有没有被正确触发、评测结果能否相信**。[#556](https://github.com/anthropics/skills/issues/556) 有 **13 条评论、7 个赞**，报告触发率始终为零；不能据此认定本 PR 已覆盖该问题 | **OPEN**；09-16 更新 |
| **Notion Spec to Implementation / Resume Auditor** · [#1245](https://github.com/anthropics/skills/pull/1245) | 同一 PR 提交两个 Skill：把 Notion 规格转成任务、验收标准与进度跟踪，以及量化简历审查 | **从需求文档走向可执行任务**；给定摘要对 Notion 工作流说明更充分，简历审查部分细节有限 | **OPEN**；10-15 更新 |
| **webapp-testing** · [#1980](https://github.com/anthropics/skills/pull/1980) | 调整测试服务器启动方式，避免使用 `shell=True` | **代理执行命令的安全边界**：降低未经净化的命令字符串进入 shell 所带来的注入风险 | **OPEN**；11-01 更新 |
| **docx** · [#1792](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时应报告错误，并检查修订标记是否真正移除 | **避免“报告成功、文件仍有问题”**。相关 [#2018](https://github.com/anthropics/skills/issues/2018) 还报告 XML 合并可能损坏文档，凸显输出验证的重要性 | **OPEN**；11-01 更新 |
| **md2video-audio** · [#1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经由幻灯片流程转换为带配音的 MP4 | **内容生产自动化**：把文档复用为演示视频。摘要宣称“零成本”，但现有数据不足以验证实际成本与成品质量 | **OPEN**；09-15 更新 |
| **Pyxel 游戏开发** · [#525](https://github.com/anthropics/skills/pull/525) | 指导 Python 复古游戏开发、调试、无头运行、帧检查与状态验证 | **生成后可验证的开发闭环**，不只生成代码，还覆盖运行与检查 | **OPEN**；11-01 更新 |
| **xlsx** · [#2019](https://github.com/anthropics/skills/pull/2019) | 修复工作表作用域名称及别名导致的外部链接风险漏检 | **复杂电子表格的隐性依赖识别**，降低重算前风险检查的假阴性 | **OPEN**；11-03 更新 |

## 2. 社区需求趋势

### ① 安全、来源可信与代理治理：讨论最集中的方向
[#492](https://github.com/anthropics/skills/issues/492) 以 **46 条评论**明显领先，关注社区 Skill 使用 `anthropic/` 命名空间可能造成的官方身份误认和权限信任问题。另有治理 Skill 提案 [#412](https://github.com/anthropics/skills/issues/412)，涉及策略执行、威胁检测与审计轨迹，但该 Issue 已关闭，**不能视为功能已经实现**。

**需求指向：**可信来源标识、权限边界，以及可审计的代理工作流。

### ② 企业共享与分发管理：明确需求，但并非新增 Skill
[#228](https://github.com/anthropics/skills/issues/228) 有 **17 条评论、8 个赞**，希望在 Claude.ai 内直接进行组织级 Skill 共享，摆脱下载、转发、逐人上传。重复安装问题 [#189](https://github.com/anthropics/skills/issues/189) 获 **9 个赞**，也是展示 Issue 中点赞最多的一条。

**需求指向：**团队 Skill 库、统一分发与安装去重，而非单纯增加 Skill 数量。

### ③ 触发与评测可信度：开发工具链的核心痛点
除了触发率为零的 [#556](https://github.com/anthropics/skills/issues/556)，MCP 评测问题 [#1390](https://github.com/anthropics/skills/issues/1390) 还涉及错误被吞掉、形成失真的工具执行结果。

**需求指向：**区分“未触发”“执行失败”“评测器故障”，建立可诊断、可复现的评测流程。

### ④ 长任务记忆与上下文效率：新 Skill 的清晰机会
**compact-memory** 提案 [#1329](https://github.com/anthropics/skills/issues/1329) 有 **10 条评论**，希望用紧凑符号表达长期代理状态；[#1487](https://github.com/anthropics/skills/issues/1487) 则报告 `claude-api` 一次加载约 **156k tokens**，耗尽上下文窗口。

**需求指向：**紧凑记忆、按需加载，以及避免重复或过量注入上下文。

### ⑤ 输出质量门禁：从“生成”转向“验证”
[#1385](https://github.com/anthropics/skills/issues/1385) 提出“任务前校准 → 对抗审查 → 交付验证”三阶段流程，有 **7 条评论**。文档损坏问题 [#2018](https://github.com/anthropics/skills/issues/2018) 进一步说明，用户需要的不只是生成结果，而是可验证的正确交付。

**需求指向：**审查、验收和回归检查。当前样本对这一方向的支持，强于对独立“测试生成 Skill”的支持。

## 3. 高潜力待合并 Skills

**无法确认哪些 PR“评论活跃”或即将合并。**以下按近期更新、问题明确程度及工作流价值列为观察名单；更新时间不等于维护者认可或合并承诺。

| 候选 | 值得关注的原因 | 主要不确定性 |
|---|---|---|
| **xlsx 外部链接检查修复** · [#2019](https://github.com/anthropics/skills/pull/2019) | 11-03 更新；针对明确的漏检路径，属于范围相对聚焦的可靠性改进 | 未提供评审、测试和 CI 信息 |
| **docx 修订接受验证** · [#1792](https://github.com/anthropics/skills/pull/1792) | 11-01 更新；直接减少超时误报和错误交付 | LibreOffice 与复杂文档兼容性仍需验证 |
| **webapp-testing 安全修复** · [#1980](https://github.com/anthropics/skills/pull/1980) | 11-01 更新；命令执行安全具有较高工程价值 | 需兼顾原有 shell 命令链用法的兼容性 |
| **Pyxel 新 Skill** · [#525](https://github.com/anthropics/skills/pull/525) | 11-01 仍有更新；覆盖开发、运行和验证，工作流较完整 | 自 3 月起仍未合并，不能据近期更新推断即将落地 |
| **Notion 规格转实现** · [#1245](https://github.com/anthropics/skills/pull/1245) | 10-15 更新；面向产品规格到开发任务的高复用场景 | 一个 PR 包含两个不同 Skill，尚无审查进展数据 |

## 4. Skills 生态洞察

**当前社区最集中的诉求，正在从“更多 Skill”转向“可信来源、正确触发、可验证交付和可管理分发”，即让 Skills 从可演示能力变成可靠的工作流组件。**参见 [来源信任 #492](https://github.com/anthropics/skills/issues/492)、[触发评测 #556](https://github.com/anthropics/skills/issues/556) 与 [组织共享 #228](https://github.com/anthropics/skills/issues/228)。

---

# Claude Code 社区动态日报｜2026-11-05

> 数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)。过去 24 小时有 50 条 Issue 更新，本文基于提供的 30 条样本分析；相关问题均为用户报告，不代表官方确认。

## 一、今日速览

今日未有新 Release 或 PR 更新，社区反馈主要集中在**权限规则可靠性、长会话资源消耗，以及 Windows Desktop / VS Code 的可用性**。GitHub 集成也出现多条连接或授权状态异常报告，但尚无证据表明属于同一故障；当前讨论量较低，最热 Issue 仅有 2 条评论，应优先关注影响范围与复现质量，而非评论热度。

## 二、社区热点 Issues

以下按潜在影响和排查价值选取，非单纯按评论数排序。10 条均处于 **OPEN** 状态。

| Issue | 核心反馈与重要性 | 社区反应 |
|---|---|---|
| **[① #107374：Read 的 deny 规则疑似被忽略](https://github.com/anthropics/claude-code/issues/107374)** | macOS 用户报告：文件位于已允许目录或当前工作目录时，显式 `deny` 仍未阻止读取。涉及敏感文件访问边界，是今日最值得优先验证的安全相关反馈。 | **1 条评论**；标记 `has repro`、`area:security`，尚无所提供的官方确认。 |
| **[② #107354：macOS 唤醒后 CLI 高 CPU、内存失控](https://github.com/anthropics/claude-code/issues/107354)** | 报告称休眠 / DarkWake 后，空闲会话卡死、堆内存增长至约 **8.7 GB**，且不响应 SIGTERM；涉及版本为 **2.1.316–2.1.318**。对长时间保留会话的开发者影响较大。 | **0 条评论**；报告者认为可能与旧问题 #24282 重复，但关联尚未确认。 |
| **[③ #107359：Windows 更新后设备密钥不可读](https://github.com/anthropics/claude-code/issues/107359)** | 用户报告 MSIX 静默更新后出现 `enclave key unavailable`，同一电脑被重新注册为新设备，设备绑定的定时任务与聊天随之失效。风险在于更新可能破坏持久化自动化工作流。 | **0 条评论**；目前是单条报告，所称“约每周复发”仍需更多验证。 |
| **[④ #107366：打开子代理记录导致 VS Code 无响应](https://github.com/anthropics/claude-code/issues/107366)** | Windows 用户报告中等规模的子代理会话记录即可使 VS Code 无响应。直接影响多代理任务的调试、审阅与结果追踪。 | **0 条评论**；标记 `has repro`、`performance`。 |
| **[⑤ #107367：额度限制期间跳过空闲压缩](https://github.com/anthropics/claude-code/issues/107367)** | 报告称被使用额度锁定的会话不会执行空闲压缩，额度恢复后触发完整冷缓存重写。值得关注其对恢复延迟与使用成本的潜在影响。 | **1 条评论**；带有 `area:cost`、`area:core` 标签。 |
| **[⑥ #107349：dontAsk 模式下 Edit 的 allow 规则不生效](https://github.com/anthropics/claude-code/issues/107349)** | macOS 用户报告：`--permission-mode dontAsk` 下，Edit 即使匹配允许规则仍被拒绝，而相同规则下 Read 可用。若复现成立，将影响无人值守编辑任务。 | **0 条评论**；标记 `has repro`，与 #107374 共同凸显权限执行一致性问题。 |
| **[⑦ #107360：GitHub 显示已授权，会话仍无法访问仓库](https://github.com/anthropics/claude-code/issues/107360)** | 用户选择仓库并看到绿色状态后，云端会话通过 `gh` 访问仍提示“本会话未启用”。暴露出配置界面状态与实际会话权限可能不一致的问题。 | **0 条评论**；同日另有多条 GitHub 连接报告，但不能据此认定同源。 |
| **[⑧ #107377：复用 IDE 语言服务器](https://github.com/anthropics/claude-code/issues/107377)** | 希望 LSP 工具直接使用 IDE 已有的语言服务器，而非另启实例。方向价值在于减少重复进程、降低内存开销，并提升 IDE 集成一致性。 | **0 条评论、0 个 👍**；属于功能提案，尚无实现进展信息。 |
| **[⑨ #107376：VS Code 支持 statusLine 与 rate_limits](https://github.com/anthropics/claude-code/issues/107376)** | 请求扩展遵循 `statusLine` 配置，或暴露额度数据，使外围工具不必读取 OAuth 凭据。兼顾状态可观测性和凭据安全边界。 | **0 条评论、0 个 👍**；报告称是对旧请求 #20207 的重新提交。 |
| **[⑩ #107373：VMProtect 分析被拒及模型自动降级报告](https://github.com/anthropics/claude-code/issues/107373)** | 商业软件开发者报告，其 VMProtect 分析请求被拒，并出现从“Opus 5.5”自动降至“Opus 4.8”的情况。关注点是合法开发场景中的拒绝边界与模型切换透明度。 | **2 条评论，为样本最高**；模型名称及降级行为均来自用户陈述，不构成官方型号或机制确认。 |

## 三、重要 PR 进展

过去 24 小时提供的数据中，**更新的 PR 为 0 条**，因此没有可列出的重要 PR，也无法据此判断上述问题是否已有修复进入开发流程。

可继续跟踪：[仓库 Pull Requests](https://github.com/anthropics/claude-code/pulls)。

## 四、功能需求趋势

### 1. 权限配置：从“能配置”转向“可预测、可验证”
社区既要求规则稳定执行，也希望支持更细粒度的例外机制。例如为 `ask Bash(rm *)` 配置特定临时目录例外，在保留确认机制的同时减少重复交互。  
相关：[规则例外 #107363](https://github.com/anthropics/claude-code/issues/107363)（**1 个 👍**）、[Edit 权限 #107349](https://github.com/anthropics/claude-code/issues/107349)。

### 2. IDE 集成：降低重复开销，补齐运行状态接口
需求不只在于“接入编辑器”，还包括复用现有 LSP、显示额度状态，以及稳定呈现子代理记录。核心方向是让 Claude Code 更自然地融入既有开发环境。  
相关：[LSP 复用 #107377](https://github.com/anthropics/claude-code/issues/107377)、[状态栏与额度 #107376](https://github.com/anthropics/claude-code/issues/107376)。

### 3. 长时代理工作流：保持登录、设备身份和会话连续性
内置浏览器反复要求登录与 2FA，以及更新后设备身份失效，都指向长期任务的状态保持问题。  
相关：[浏览器登录持久化 #107346](https://github.com/anthropics/claude-code/issues/107346)、[设备密钥异常 #107359](https://github.com/anthropics/claude-code/issues/107359)。

### 4. 语音与跨端体验：更精细的语言和会话管理
用户希望支持希伯来语、限定听写语言集合，并允许在移动端最近聊天中隐藏 Code 会话；另有发送消息后录音模式未退出的反馈。  
相关：[多语言听写 #107350](https://github.com/anthropics/claude-code/issues/107350)、[隐藏 Code 会话 #107364](https://github.com/anthropics/claude-code/issues/107364)、[录音状态 #107355](https://github.com/anthropics/claude-code/issues/107355)。

## 五、开发者关注点

- **安全边界必须可信。** 显式拒绝规则是否生效、工具是否需要接触 OAuth 凭据，都是权限体系的基础信任问题。建议优先用非敏感测试文件验证关键规则。参考：[Read deny #107374](https://github.com/anthropics/claude-code/issues/107374)、[额度接口 #107376](https://github.com/anthropics/claude-code/issues/107376)。
- **长会话稳定性直接影响效率与成本。** 休眠恢复、额度恢复和记录加载均出现问题报告，说明会话生命周期的边界场景值得重点测试。参考：[资源异常 #107354](https://github.com/anthropics/claude-code/issues/107354)、[缓存重写 #107367](https://github.com/anthropics/claude-code/issues/107367)。
- **“界面显示成功”应与实际可用状态一致。** 插件安装卡片返回已渲染却不可见、GitHub 显示已授权却不可访问，都会增加排障成本。参考：[插件卡片 #107341](https://github.com/anthropics/claude-code/issues/107341)、[GitHub 会话权限 #107360](https://github.com/anthropics/claude-code/issues/107360)。
- **模型反馈需要区分主观体验与可复现故障。** 样本中多条模型相关投诉来自同一作者，不宜视为多个独立用户的广泛共识；还需具体提示词、工具轨迹及实际模型信息才能判断。参考：[模型认知反馈 #107356](https://github.com/anthropics/claude-code/issues/107356)、[拒绝请求反馈 #107353](https://github.com/anthropics/claude-code/issues/107353)。

**今日判断：** 相比新增功能，当前样本更突出的是基础可靠性诉求。后续最值得追踪的信号，是权限问题的官方复现结论、长会话异常的修复进展，以及 GitHub 授权状态不一致是否存在共同原因。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-11-05｜仓库：[openai/codex](https://github.com/openai/codex)**

> **统计口径**：基于所提供的过去 24 小时更新数据，包括 4 个 Release，以及 50 条 Issues、40 条 PR 中展示的 30 条和 20 条。部分记录日期为 11 月 4 日；以下分析不代表完整社区统计。Issue 描述属于用户报告，PR 的 `CLOSED` 状态不等于已合并或已发布。

## 1. 今日速览

Codex 在本次窗口内发布了 **4 个 Alpha 版本**，涉及 `0.167.0` 和 `0.168.0` 两条版本线，但发布说明未提供具体变更。社区反馈集中在 **浏览器与权限控制、会话连续性、任务交付可信度**；PR 则主要围绕沙箱权限解析、模型提供方管理、云消息生命周期和 TUI 交互展开，尚不能据此认定相关问题已修复。

## 2. 版本发布

| 版本 | 已知信息 |
|---|---|
| [rust-v0.168.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.168.0-alpha.3) | 本次提供列表中版本号最高的预发布版本 |
| [rust-v0.168.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.168.0-alpha.2) | 同属 `0.168.0` Alpha 系列 |
| [rust-v0.167.0-alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.167.0-alpha.5) | `0.167.0` Alpha 系列更新 |
| [rust-v0.167.0-alpha.3.1](https://github.com/openai/codex/releases/tag/rust-v0.167.0-alpha.3.1) | 同属 `0.167.0` Alpha 系列 |

**解读**：当前发布节奏较密集，但说明均仅包含版本名称，无法确认新增功能、修复范围，或下述 PR 是否已包含其中。生产环境不宜仅凭版本号判断问题已解决。

## 3. 社区热点 Issues

以下按开发影响和代表性筛选，**不是单纯按评论量排序**。所展示 Issues 均为 0 个 👍，最高仅 3 条评论，讨论规模仍小，不宜外推为普遍故障。

| Issue | 核心问题与重要性 | 社区反应及状态 |
|---|---|---|
| [#59549 浏览器权限切换后仍被拒绝](https://github.com/openai/codex/issues/59549) | 用户报告：切换为“Always allow”并移除可见站点例外后，既有拒绝状态仍可能保留。涉及权限状态一致性与用户对授权结果的理解。 | **3 评论，已关闭**；未提供关闭原因或修复证据。 |
| [#59519 正常开发触发网络安全拒绝](https://github.com/openai/codex/issues/59519) | 修复 WinUAE 时区同步时，被报告触发 Astra/Daybreak 限制。若可复现，会直接中断正常开发任务。 | **3 评论，开放中**；属于样本中讨论较多的问题。 |
| [#59492 完成声明缺乏执行记录支持](https://github.com/openai/codex/issues/59492) | 报告质疑部分“工作已完成”声明与记录不一致。重点不是表达质量，而是代码交付和验证结果能否被审计。 | **3 评论，开放中**；需进一步核查具体案例。 |
| [#59488 Windows Computer Use 无法捕获窗口](https://github.com/openai/codex/issues/59488) | Windows 10 用户报告窗口捕获失败。可能阻断依赖桌面视觉反馈的自动化流程。 | **2 评论，开放中**；目前是特定环境报告。 |
| [#59522 Office 附件导致发送持续转圈](https://github.com/openai/codex/issues/59522) | macOS 用户报告小至 37 KB 的 Excel 文件也会阻塞发送，且在两个应用版本观察到。影响文档驱动工作流。 | **1 评论，开放中**；样本中另有相似反馈，但不能据此确认共同根因。 |
| [#59553 跨设备会话提示被其他应用占用](https://github.com/openai/codex/issues/59553) | 间歇出现“This is open in another app”，且恢复方式不明确。多设备协作需要清晰的会话所有权和恢复机制。 | **1 评论，开放中**。 |
| [#59528 Full access 与实际权限不一致](https://github.com/openai/codex/issues/59528) | 用户选择完整访问后，会话仍受到限制，且权限控件消失，导致授权 SSH 开发受阻。关键在于权限可见、可解释、可调整。 | **1 评论，开放中**。 |
| [#59529 使用额度显示异常、任务仍未完成](https://github.com/openai/codex/issues/59529) | 用户报告后台运行两个会话后额度耗尽，并出现用量显示差异。涉及无人值守任务的成本控制与计量可信度。 | **1 评论，开放中**；现有摘要不足以判断计费或展示根因。 |
| [#59499 VS Code 重连与远程上下文压缩失败](https://github.com/openai/codex/issues/59499) | Windows 扩展反复出现 `Reconnecting 5/5`，并无法验证模型访问权限，阻断长会话继续执行。 | **1 评论，开放中**。 |
| [#59559 WebSocket 重置后 TUI 永久等待启动](https://github.com/openai/codex/issues/59559) | 报告环境为 Raspberry Pi OS/aarch64，连接异常后界面不显示错误。暴露断线恢复和故障可观测性不足。 | **0 评论，开放中**；虽带 Windows 标签，环境描述实际为 Linux。 |

## 4. 重要 PR 进展

**以下 10 项在数据中均为 `CLOSED`，未提供合并状态；评论数均为 `undefined`，无法评价讨论热度。**

| PR | 功能或修复内容 | 技术价值 |
|---|---|---|
| [#59530 在沙箱启动边界解析工作区权限](https://github.com/openai/codex/pull/59530) | 合并额外权限后解析符号化工作区规则，保留显式拒绝；空根目录列表不授予工作区访问。 | 提高权限解析的一致性，但不能直接视为 #59528 的修复。 |
| [#59507 将记忆整合权限绑定到记忆根目录](https://github.com/openai/codex/pull/59507) | 为记忆整合代理显式配置权限与工作区根目录，并保持网络禁用。 | 收紧后台代理的访问边界。 |
| [#59541 TUI 增加模型提供方浏览](https://github.com/openai/codex/pull/59541) | 展示服务端提供方目录、当前会话提供方、新会话默认值，以及端点和认证配置详情。 | 改善多提供方配置的可见性与排障体验。 |
| [#59503 默认提供方变化时保留会话原提供方](https://github.com/openai/codex/pull/59503) | 恢复会话时使用已保存的提供方，避免默认配置变更破坏已有会话。 | 增强长生命周期会话的配置稳定性。 |
| [#59510 新建 TUI 会话使用服务端模型默认值](https://github.com/openai/codex/pull/59510) | 将服务端主导的初始化扩展到嵌入式连接，同时保留显式配置覆盖。 | 减少客户端与服务端默认模型不一致。 |
| [#59524 转发云消息条目生命周期通知](https://github.com/openai/codex/pull/59524) | 转发此前被云后端丢弃的条目开始和完成事件。 | 为客户端接收用户消息回执、完整助手消息提供支持。 |
| [#59514 云客户端支持分页发现会话](https://github.com/openai/codex/pull/59514) | 新增带游标分页、排序及发起者过滤的 `Client::list_threads`。 | 为云会话列表和历史发现提供基础能力。 |
| [#59527 侧边会话面板支持缩放与交互](https://github.com/openai/codex/pull/59527) | 支持拖动分隔线、保存面板宽度，并增强滚动和加载交互。 | 提升 TUI 多会话操作体验。 |
| [#59531 在环境上下文中呈现 V2 子代理列表](https://github.com/openai/codex/pull/59531) | 提供主机管理代理成员关系的只读访问，并读取直接子代理。 | 提高多代理协作中的成员信息可见性。 |
| [#59540 新增面向模型的节省 Token ID 生成器](https://github.com/openai/codex/pull/59540) | 使用确定性、基于种子的生成方式，优先分配更短标识符。 | 减少标识符占用的模型上下文 Token。 |

## 5. 功能需求趋势

从已展示 Issues 看，今天更突出的是**既有能力的可靠性需求，而非新功能提案**：

- **权限状态可解释、可恢复**：用户需要界面授权与实际执行权限一致，也需要明确的重新授权路径。代表：[浏览器允许状态不生效 #59506](https://github.com/openai/codex/issues/59506)、[SSH 权限受限 #59528](https://github.com/openai/codex/issues/59528)。
- **浏览器与桌面自动化更稳定**：反馈覆盖窗口捕获、浏览器控制超时，以及连接成功后仍调用失败。代表：[窗口捕获 #59488](https://github.com/openai/codex/issues/59488)、[`timeoutMs` 异常 #59494](https://github.com/openai/codex/issues/59494)。
- **跨设备与历史会话连续性**：需求不止于同步列表，还包括按 ID 读取、恢复历史和明确设备占用状态。代表：[两台 Mac 无法读取会话 #59552](https://github.com/openai/codex/issues/59552)、[历史会话加载失败 #59554](https://github.com/openai/codex/issues/59554)。
- **交付结果可验证**：社区希望“已完成”建立在实际执行、测试和产物检查之上。代表：[完成声明核验 #59492](https://github.com/openai/codex/issues/59492)、[编码与审计代理反馈 #59490](https://github.com/openai/codex/issues/59490)。
- **跨平台连接与输入体验**：涉及 Linux 流式连接、中文输入法，以及 Windows IDE 长会话恢复。代表：[NixOS 断流 #59561](https://github.com/openai/codex/issues/59561)、[fcitx5 拼音丢字 #59558](https://github.com/openai/codex/issues/59558)。
- **办公文件工作流与用量透明度**：用户既需要可靠地上传、生成和复核文件，也需要理解后台任务的额度消耗。代表：[生成表格缺少图片 #59533](https://github.com/openai/codex/issues/59533)、[用量异常 #59529](https://github.com/openai/codex/issues/59529)。

## 6. 开发者关注点

1. **完成声明必须有证据**  
   建议将交付结果明确区分为“已修改、已执行、已测试、未验证”，并附命令、日志或产物路径，减少误把叙述当作完成依据。相关反馈：[ #59492](https://github.com/openai/codex/issues/59492)、[#59515](https://github.com/openai/codex/issues/59515)。

2. **失败应显式暴露，而不是无限等待**  
   重连、启动和发送失败需要可见错误、超时退出及恢复入口；否则开发者难以区分网络、权限和客户端状态问题。相关反馈：[#59559](https://github.com/openai/codex/issues/59559)、[#59522](https://github.com/openai/codex/issues/59522)。

3. **无人值守任务需要更强的运行与成本约束**  
   长任务不仅要能持续执行，还应显示进展、阻塞原因和用量变化，避免任务未完成却持续消耗额度。相关反馈：[#59529](https://github.com/openai/codex/issues/59529)、[#59515](https://github.com/openai/codex/issues/59515)。

4. **排障信息需要贯通界面与底层状态**  
   “已授权但仍受限”“桌面不可用但网页正常”等反馈说明，开发者需要查看有效权限、会话状态及连接诊断，而不仅是表面开关。相关反馈：[#59528](https://github.com/openai/codex/issues/59528)、[#59557](https://github.com/openai/codex/issues/59557)。

**今日判断**：样本中的核心诉求是让代理工作流更**可预测、可恢复、可核验**。PR 方向与部分痛点相呼应，但仍需后续合并记录、发布说明及用户复测来确认实际改善。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-11-05｜仓库：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)**

> **数据说明**：本期依据提供的 2 个 Release、1 条 Issue 和 13 条 PR 整理。PR 时间字段均为 11 月 4 日，按所提供的统计窗口纳入；`CLOSED` 不等于已合并，评论数 `undefined` 也不代表零评论。

## 1. 今日速览

Gemini CLI 发布了稳定版 **v0.67.0** 和预览版 **v0.68.0-preview.0**，但当天的 **v0.69.0 nightly 发布失败**，被标记为 P0，发布链路可靠性是首要关注点。[版本列表](https://github.com/google-gemini/gemini-cli/releases)｜[故障 Issue #30149](https://github.com/google-gemini/gemini-cli/issues/30149)

开发侧以可靠性修复为主，重点覆盖 ACP 会话钩子与输出、macOS 沙箱启动、工具确认流程，以及模型选择和模板字符串处理；多数相关 PR 仍处于待合并状态。[ACP 修复 #30148](https://github.com/google-gemini/gemini-cli/pull/30148)｜[macOS 修复 #30143](https://github.com/google-gemini/gemini-cli/pull/30143)

## 2. 版本发布

| 版本 | 已知更新 | 开发者解读 |
|---|---|---|
| [v0.67.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.67.0) | 可见摘要主要包含历史 changelog 与版本号维护记录。 | 新稳定版已发布，但当前摘要不足以核实具体功能增量，升级前应查阅完整发布说明。 |
| [v0.68.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.68.0-preview.0) | 包含历史 changelog；可见一项 README 文档更新，涉及明确 CLI 的范围与限制，后续内容被截断。 | 适合预览验证；不能据此认定本期列出的 PR 已包含在该版本中。 |

## 3. 社区热点 Issues

**本次数据仅提供 1 条 Issue，因此不补造其余 9 条。**

### [#30149：v0.69.0 nightly 发布失败](https://github.com/google-gemini/gemini-cli/issues/30149)
- **状态与优先级**：OPEN，`priority/p0`、`release-failure`。
- **问题**：`v0.69.0-nightly.20261105.g1fe22af5f` 的 nightly-release 工作流失败。
- **为什么重要**：直接影响当日 nightly 产物交付和下游验证；但现有信息不能证明已发布的稳定版或预览版受到影响。
- **社区反应**：由 `github-actions[bot]` 自动创建，目前 **0 评论、0 👍**，尚无人工诊断或修复反馈。
- **下一步观察**：失败原因、是否重跑成功，以及是否需要补发版本。可查看[失败工作流](https://github.com/google-gemini/gemini-cli/actions/runs/41940469529)。

## 4. 重要 PR 进展

以下选取 10 项，优先关注用户体验、集成可靠性和维护风险。

| PR | 状态 | 功能或修复内容及意义 |
|---|---|---|
| [#30148：ACP 会话钩子补齐](https://github.com/google-gemini/gemini-cli/pull/30148) | OPEN | 在 ACP 会话创建、恢复时触发 `SessionStart`，工具请求确认时触发 `Notification`，改善 ACP 接入中的自动化钩子一致性。 |
| [#30144：ACP 输出监听与 stderr 刷新](https://github.com/google-gemini/gemini-cli/pull/30144) | OPEN | 在进入 ACP 客户端循环前初始化输出监听并排空缓冲，避免钩子日志、警告和提示直到进程退出才显示。 |
| [#30141：ACP 工具输出序列化](https://github.com/google-gemini/gemini-cli/pull/30141) | CLOSED | 将 `AnsiOutput` 转成文本内容，修复工具调用更新中 `content` 为空的问题，尤其涉及 shell 命令输出。**是否合并未提供。** |
| [#30143：macOS 文件监听与沙箱兼容](https://github.com/google-gemini/gemini-cli/pull/30143) | OPEN · P1 | 为文件监听器添加错误处理，并允许 macOS permissive sandbox 使用 FSEvents，降低受限环境下启动失败的风险。 |
| [#30147：保留待确认的文件编辑操作](https://github.com/google-gemini/gemini-cli/pull/30147) | OPEN | 修复未配置首选编辑器时，从外部编辑器选择流程退出导致待确认工具操作丢失的问题，改善交互恢复能力。 |
| [#30137：模型名称校验与直接参数支持](https://github.com/google-gemini/gemini-cli/pull/30137) | OPEN | 为 `/model` 增加模型名称校验及直接参数支持，避免不存在的名称或裸标志被错误接受；**不是新增模型的公告**。 |
| [#30138：环境变量展开冲突修复](https://github.com/google-gemini/gemini-cli/pull/30138) | CLOSED · P2 | 防止环境中定义的 `__GCLI_EXPAND_TARGET__` 与内部占位键冲突，造成输入字符串被静默覆盖。**是否合并未提供。** |
| [#30136：模板替换保留字面量 `$`](https://github.com/google-gemini/gemini-cli/pull/30136) | CLOSED · P2 | 确保自定义命令参数和系统提示模板中的 `$$`、`$&`、`$1` 等序列保留原文，避免被替换语义意外解释。**是否合并未提供。** |
| [#30139：约束自动分诊写入内容](https://github.com/google-gemini/gemini-cli/pull/30139) | OPEN | 在自动分诊写入 GitHub 前校验标签和去重结果中的 Issue 编号，减少模型输出不符合预期而导致的错误操作。 |
| [#30142：glob 依赖升级](https://github.com/google-gemini/gemini-cli/pull/30142) | CLOSED | 提议将 `glob` 从 12.0.0 升至 14.0.2，属于跨主版本依赖变更，需关注文件匹配兼容性；未提供合并结果，也不能据此认定涉及安全漏洞。 |

**互动情况**：上述 PR 的 👍 均为 0，评论数均未提供，无法可靠判断讨论热度或社区共识。

## 5. 功能需求趋势

**仅从本期 Issue 看，能够确认的关注方向只有“发布可靠性”**；以下其他方向来自 PR，属于开发动向，不代表已验证的高频用户需求。

- **发布链路稳定性**：P0 nightly 故障说明当前需要优先恢复持续交付与验证能力。[#30149](https://github.com/google-gemini/gemini-cli/issues/30149)
- **ACP 集成完整性**：会话钩子、实时诊断和工具输出三个环节同时出现修复，体现对外部客户端可观测性和行为一致性的持续补齐。[#30148](https://github.com/google-gemini/gemini-cli/pull/30148)｜[#30144](https://github.com/google-gemini/gemini-cli/pull/30144)｜[#30141](https://github.com/google-gemini/gemini-cli/pull/30141)
- **受限环境兼容性**：macOS 沙箱内的文件监听与启动错误处理成为明确修复方向。[#30143](https://github.com/google-gemini/gemini-cli/pull/30143)
- **交互与配置确定性**：模型选择校验、工具确认状态保留，以及字符串原文保护，均在减少“输入合法但结果意外”的边界问题。[#30137](https://github.com/google-gemini/gemini-cli/pull/30137)｜[#30147](https://github.com/google-gemini/gemini-cli/pull/30147)｜[#30136](https://github.com/google-gemini/gemini-cli/pull/30136)

本期没有足够证据将性能优化、新模型支持或某个具体 IDE 的集成列为热点。

## 6. 开发者关注点

以下是从修复描述归纳出的痛点，而非按反馈量统计的排行榜：

- **“执行了，但看不到输出”**：ACP 日志延迟和工具结果为空会干扰排障，应重点测试日志实时性及 shell 输出完整性。[#30144](https://github.com/google-gemini/gemini-cli/pull/30144)｜[#30141](https://github.com/google-gemini/gemini-cli/pull/30141)
- **取消或返回不应破坏操作状态**：外部编辑器选择流程退出后，应保留原有工具确认上下文。[#30147](https://github.com/google-gemini/gemini-cli/pull/30147)
- **配置与模板必须忠实保留用户输入**：环境变量键冲突及 `$` 的替换语义都可能造成静默内容变化，值得加入回归测试。[#30138](https://github.com/google-gemini/gemini-cli/pull/30138)｜[#30136](https://github.com/google-gemini/gemini-cli/pull/30136)
- **平台限制应可诊断，而非直接导致启动失败**：macOS 沙箱用户应关注文件监听异常处理的后续进展。[#30143](https://github.com/google-gemini/gemini-cli/pull/30143)
- **模型驱动的自动化需要写入边界校验**：自动分诊不能直接信任生成结果，应在调用 GitHub API 前验证标签和 Issue 编号。[#30139](https://github.com/google-gemini/gemini-cli/pull/30139)

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-11-05** · **仓库：[github/copilot-cli](https://github.com/github/copilot-cli)**

> 数据口径：基于提供的发布记录及 Issue/PR 列表。本次仅有 6 条 Issue、无 PR，因此不补足至 10 条；部分 Issue 标注的更新时间为 11 月 4 日，本文按所提供的统计窗口纳入。

## 1. 今日速览

Copilot CLI 发布 **v1.0.106-9**，修正 `apply_patch` 增删文件时的行数统计，并改善配置类型错误的提示。社区反馈主要集中在 Windows 长时间卡顿、非交互调用 I/O 失败，以及 ACP 模型配置和远程会话集成问题；所列 6 条 Issue 均处于 **OPEN / triage** 状态，暂无 PR 进展可供追踪。

## 2. 版本发布

### [v1.0.106-9](https://github.com/github/copilot-cli/releases/tag/v1.0.106-9)

- **修正补丁行数统计**：`apply_patch` 新增或删除文件时，不再为每个文件额外计算一行。时间线摘要、权限提示、`/usage` 和退出摘要将显示真实行数，有助于准确审核变更范围。
- **增强配置错误提示**：当配置值类型错误导致 `settings.json` 被忽略时，`copilot config` 现在会发出警告，降低配置未生效时的排查成本。

**说明：**提供的第二条发布说明末尾被截断，以上仅总结可确认内容。

## 3. 社区热点 Issues

本次共 6 条，按潜在影响与集成价值排序。互动量整体较低，尚不足以判断广泛共识。

| Issue | 核心问题与重要性 | 社区反应 |
|---|---|---|
| **[#5356 Windows/npm 会话间歇性长时间卡顿](https://github.com/github/copilot-cli/issues/5356)** | 用户通过 `npx copilot --yolo` 交互使用 1.0.105 时，部分轮次持续忙碌数分钟而无最终回复；取消后发送 `continue` 也不总能恢复。直接影响会话可靠性，值得 Windows 用户优先关注。 | 1 条评论、0 👍；待分诊。 |
| **[#5357 `copilot -p` 执行出现 I/O 失败](https://github.com/github/copilot-cli/issues/5357)** | 非交互提示调用报 `session.send` / Shared writer storage I/O 错误，可能阻断脚本和自动化任务。日志同时出现管理员策略替换模型的提示，但现有信息不足以证明两者存在因果关系。 | 0 条评论、0 👍；暂无解决进展信息。 |
| **[#5354 ACP 未暴露 Fusion 及其档位配置](https://github.com/github/copilot-cli/issues/5354)** | 交互式 CLI 可使用 Copilot Fusion，但 ACP 仅将路由模型标为 **Auto**，未提供相应档位配置，导致 T3 Code 等客户端无法展示完整选项。关键在于交互端与协议端的能力一致性。 | **2 👍、1 条评论**，为本批数据中点赞最多的 Issue。 |
| **[#5355 `--add-dir` 导致远程会话自动发布失败](https://github.com/github/copilot-cli/issues/5355)** | 配置自动发布远程会话后，使用 `--add-dir <path>` 启动会触发 `host.publishSession` 失败。影响需要额外目录上下文的远程会话工作流。 | 0 条评论、0 👍；待分诊。 |
| **[#5358 无副作用设备登录与免暴露令牌的认证接口](https://github.com/github/copilot-cli/issues/5358)** | 请求设备码登录不自动打开浏览器、不修改剪贴板，同时保留组织策略及安全持久化检查；另希望提供无需暴露令牌的认证状态与重载接口。对第三方工具封装及受控环境集成具有价值。 | 0 条评论、0 👍；当前为需求提案。 |
| **[#5353 在时间线中渲染用户消息 Markdown](https://github.com/github/copilot-cli/issues/5353)** | 用户提交的提示词主要以原始文本展示，与助手回复的渲染效果不一致。支持标题、列表、代码和强调样式，可改善复杂提示词与历史会话的可读性。 | 1 条评论、0 👍；当前为体验改进提案。 |

## 4. 重要 PR 进展

**提供的数据中无过去 24 小时更新的 PR**，因此本期不列出 PR，也无法据此判断上述问题是否已有对应修复代码。

追踪入口：[Pull Requests](https://github.com/github/copilot-cli/pulls)

## 5. 功能需求趋势

以下为本批 Issue 呈现的方向，不代表长期社区热度排名：

- **第三方集成与协议能力对齐**：ACP 需要完整暴露 Fusion 与档位信息；认证流程也需要可控、可组合的接口。CLI 不仅是交互工具，也被用作其他开发工具的底层能力。  
  相关：[ACP 模型配置 #5354](https://github.com/github/copilot-cli/issues/5354)、[认证接口 #5358](https://github.com/github/copilot-cli/issues/5358)

- **执行稳定性与自动化可靠性**：交互卡顿和 `-p` 调用失败分别影响人工使用与脚本调用，反映出执行链路可恢复性和错误可诊断性的重要性。  
  相关：[Windows 卡顿 #5356](https://github.com/github/copilot-cli/issues/5356)、[I/O 失败 #5357](https://github.com/github/copilot-cli/issues/5357)

- **复杂会话工作流兼容性**：额外目录参数与远程自动发布的组合出现故障，需要关注不同功能组合下的行为一致性。  
  相关：[远程会话发布 #5355](https://github.com/github/copilot-cli/issues/5355)

- **终端信息展示质量**：用户希望复杂提示词更易读；本次版本也提高了变更行数及配置错误提示的准确性。  
  相关：[Markdown 渲染 #5353](https://github.com/github/copilot-cli/issues/5353)、[版本说明](https://github.com/github/copilot-cli/releases/tag/v1.0.106-9)

## 6. 开发者关注点

1. **任务卡住后缺少可靠恢复路径。** 取消并发送 `continue` 只能间歇奏效，建议重点跟踪后续是否补充复现条件、诊断信息或修复版本。  
   [#5356](https://github.com/github/copilot-cli/issues/5356)

2. **自动化入口需要更明确的错误定位。** `copilot -p` 的底层 I/O 报错尚未解释根因，不能仅凭相邻的模型替换提示归因于组织策略。  
   [#5357](https://github.com/github/copilot-cli/issues/5357)

3. **集成方需要完整且无意外副作用的接口。** 模型能力发现、档位选择及认证状态管理，应尽量减少交互端与外部客户端之间的差异。  
   [#5354](https://github.com/github/copilot-cli/issues/5354) · [#5358](https://github.com/github/copilot-cli/issues/5358)

4. **现有发布修复与新报障应分开看待。** v1.0.106-9 的已知修复聚焦统计与配置提示，提供的发布说明中未提及解决卡顿、I/O 或远程发布问题。  
   [v1.0.106-9](https://github.com/github/copilot-cli/releases/tag/v1.0.106-9)

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-11-05

## 今日速览

今日讨论主要集中在**模型服务可用性、免费额度异常与 V2 的 MCP 兼容性**：Gemini 403、DeepSeek 图片输入导致会话无法继续，以及免费额度未按预期重置等问题影响实际使用。开发侧出现一批以**显式状态机**治理桌面端和交互生命周期的 PR，同时推进 Web 搜索协议修复、网络故障重试和 Shell 进程守护化；过去 24 小时无新 Release。

> **数据口径**：来源标注过去 24 小时更新的 Issues、PR 各 50 条，本报基于展示的 30 条 Issues、20 条 PR 筛选。部分条目的更新时间为 11 月 4 日；PR 评论数缺失，不作热度排名。**CLOSED 仅代表已关闭，不等于已修复或已合并**。

## 社区热点 Issues

### 1. Gemini 模型持续返回 403
**[#61845](https://github.com/anomalyco/opencode/issues/61845)｜OPEN｜4 条评论**

用户反馈 `opencode-go/gemini-4-argon` 在 Go、Go Plus 计划下均返回 `Endpoint is unavailable`，而其他 Go 模型可用。另有同类反馈 [#61873](https://github.com/anomalyco/opencode/issues/61873)（1 条评论），形成重复故障信号；值得关注模型路由或上游端点可用性，但根因尚未确认。

### 2. DeepSeek 拒绝图片后，整个会话无法继续
**[#61827](https://github.com/anomalyco/opencode/issues/61827)｜OPEN｜4 条评论、1 个 👍**

用户报告，代理读取六张 PNG 后，后续纯文本请求也持续失败。问题不只是多模态能力缺失，更涉及**错误输入进入历史上下文后的恢复能力**；相关的能力声明不一致问题见 [#61842](https://github.com/anomalyco/opencode/issues/61842)（3 条评论）。

### 3. 免费额度到期后未重置
**[#61902](https://github.com/anomalyco/opencode/issues/61902)｜OPEN｜2 条评论**

Windows 11 / VS Code 用户反馈，预期重置时间已过仍无法使用免费服务。展示样本中还有多条额度、跨端显示不一致反馈，说明这是反复出现的使用障碍；目前不能据此确定是后端计费、客户端状态还是额度规则理解问题。

### 4. 桌面集成终端 Ctrl+C 无法中止进程
**[#61899](https://github.com/anomalyco/opencode/issues/61899)｜OPEN｜3 条评论**

Windows 用户运行 Python 开发服务器后，无法通过 Ctrl+C 停止，只能使用 `taskkill /F /PID`。这直接影响开发循环和进程清理，是集成终端基础可靠性的关键问题。

### 5. macOS 桌面端拒绝有效的 Claude Code 登录
**[#61829](https://github.com/anomalyco/opencode/issues/61829)｜OPEN｜2 条评论**

用户已安装并成功认证 Claude Code，但 OpenCode Desktop 2.2.5 中的 Claude Agent 仍无法响应，重新登录也无效。该问题阻断已有账号接入，值得关注桌面应用与认证环境之间的衔接。

### 6. 会话预热可能未命中目标缓存，反而增加成本
**[#61775](https://github.com/anomalyco/opencode/issues/61775)｜OPEN · reproduced｜2 条评论**

报告者基于实际 V2 会话的用量、时序数据，认为预热在 Anthropic 上大致收支平衡，在 OpenAI、Gemini 上增加成本。该问题已标记为可复现，重点是**预热请求是否与真实请求共享缓存条件**，以及是否应按供应商选择性启用。

### 7. MCP 通知先于响应时，Web 搜索失败
**[#61887](https://github.com/anomalyco/opencode/issues/61887)｜OPEN · reproduced｜1 条评论**

解析器将每个 SSE `data:` 都当成结果响应，遇到合法的前置 JSON-RPC 通知便失败。这属于协议兼容性问题，而非单一搜索服务异常；已有对应修复 PR [#61890](https://github.com/anomalyco/opencode/pull/61890)。

### 8. V2 缺少旧式 SSE MCP 的回退连接
**[#61867](https://github.com/anomalyco/opencode/issues/61867)｜OPEN｜1 条评论**

用户报告 V1 能通过 SSE 回退连接的远程 MCP 服务，在 V2.2.5 中因 Streamable HTTP POST 返回 405 而失败。对仍使用旧式 SSE 端点的团队，这是升级兼容性风险。

### 9. MCP 响应元数据在工具钩子前丢失
**[#61894](https://github.com/anomalyco/opencode/issues/61894)｜OPEN｜1 条评论**

报告称 V2 丢弃原始响应封装，导致宿主无法取得 `_meta` 和内容注解，直接工具调用与 Code Mode 均受影响。虽然调用本身可能成功，但 MCP App 渲染及插件扩展所需的信息不完整。

### 10. Code Mode 工具可调用，却无法被模型发现
**[#61891](https://github.com/anomalyco/opencode/issues/61891)｜CLOSED｜3 条评论**

连接 Xcode MCP 后识别到 54 个工具，但工具目录仅显示 53 个，遗漏 `DocumentationSearch`。这暴露了**工具连接成功不等于模型可发现、可使用**的问题；Issue 已关闭，现有数据未说明关闭原因或修复落地情况。

## 重要 PR 进展

| PR | 状态 | 功能或修复内容与意义 |
|---|---|---|
| **[#61908：桌面渲染器恢复状态机](https://github.com/anomalyco/opencode/pull/61908)** | OPEN | 用统一状态机替换恢复流程中的标志位、等待循环和计时器，旨在降低窗口无响应、恢复与重启之间的状态错乱。 |
| **[#61907：统一 rewind / undo / redo](https://github.com/anomalyco/opencode/pull/61907)** | OPEN | 将会话回退及撤销操作纳入同一状态机，处理连续 `/undo` 等异步操作重入问题。 |
| **[#61901：桌面更新器状态机](https://github.com/anomalyco/opencode/pull/61901)** | CLOSED | 将下载、安装、目标版本等分散状态收敛为联合状态与纯转换函数，减少更新生命周期的不一致；是否合并未提供。 |
| **[#61892：统一 Office viewer worker 生命周期](https://github.com/anomalyco/opencode/pull/61892)** | CLOSED | 为表格、Word、PowerPoint 查看器共享 worker 状态机与驱动层，替代多套独立的启动、取消和失败保护逻辑。 |
| **[#61890：Web 搜索跳过 MCP 前置通知](https://github.com/anomalyco/opencode/pull/61890)** | OPEN | 对应 Issue #61887，避免把结果前的通知误当成响应，是当天较明确的“问题—修复”链路。 |
| **[#61880：供应商主机不可达时持续重试](https://github.com/anomalyco/opencode/pull/61880)** | CLOSED | 针对断网、DNS 失败、VPN 重连等情况，调整快速耗尽通用重试额度的行为，目标是让进行中的任务熬过短时网络故障。 |
| **[#61876：Shell 命令迁入进程守护程序](https://github.com/anomalyco/opencode/pull/61876)** | OPEN | 将本地 Shell 命令交由 `opencode-pty` daemon 执行，使用 protocol v8，是进程执行架构的重要变化；尚不能认定其解决了 Ctrl+C 问题。 |
| **[#61878：移除新消息分隔线](https://github.com/anomalyco/opencode/pull/61878)** | CLOSED | 撤回 “New” 消息分隔线，针对新消息或窗口重新获焦时的滚动跳动，优先保障阅读位置稳定。 |
| **[#61883：空白 `/btw` 回复支持重试](https://github.com/anomalyco/opencode/pull/61883)** | CLOSED | 处理模型只输出工具调用或推理、侧栏永久空白且无 Retry 的情况，将请求生命周期改为显式状态机。 |
| **[#61900：补全越南语翻译](https://github.com/anomalyco/opencode/pull/61900)** | OPEN · needs:compliance | 补齐应用、共享 UI 和内置 GUI 插件中 776 个仍回退为英语的字符串，扩大非英语用户的完整使用覆盖。 |

## 功能需求趋势

1. **插件需要更多运行状态与控制接口**  
   社区希望服务器插件能够感知持久执行的连续性，以支持计费与安全续跑控制；TUI 插件则需要读取侧栏可见状态。需求正从“添加界面内容”延伸到“理解宿主运行状态”。  
   关联：[执行连续性 #61884](https://github.com/anomalyco/opencode/issues/61884)、[侧栏可见性 API #61877](https://github.com/anomalyco/opencode/issues/61877)。

2. **搜索服务希望具备更多内置选择**  
   有用户请求新增 You.com，与现有搜索供应商并列。与此同时，MCP 搜索解析故障说明：供应商扩展与协议可靠性需要同步推进。  
   关联：[You.com #61906](https://github.com/anomalyco/opencode/issues/61906)、[搜索解析 #61887](https://github.com/anomalyco/opencode/issues/61887)。

3. **会话协作和跨会话操作需要更低摩擦**  
   桌面用户希望直接复制当前会话 ID，方便其他会话总结或接续工作；TUI 中未发送草稿的入口消失，也反映会话导航与草稿保留仍需改善。  
   关联：[复制会话 ID #61897](https://github.com/anomalyco/opencode/issues/61897)、[草稿标签消失 #61799](https://github.com/anomalyco/opencode/issues/61799)。

4. **桌面体验诉求既有可靠性，也有可定制性**  
   集成终端的进程控制是基础需求，主题透明度则体现用户对终端与整体 UI 一致性的期待。  
   关联：[Ctrl+C #61899](https://github.com/anomalyco/opencode/issues/61899)、[终端透明度 #61858](https://github.com/anomalyco/opencode/issues/61858)。

## 开发者关注点

- **失败后能否恢复，比单次报错更关键。** 图片输入错误污染后续会话、空白回复无法重试、网络故障耗尽重试额度，都涉及任务连续性。  
  参考：[图片导致会话阻塞 #61827](https://github.com/anomalyco/opencode/issues/61827)、[网络重试 PR #61880](https://github.com/anomalyco/opencode/pull/61880)。

- **额度、能力声明和真实行为需要一致。** 免费额度何时重置、模型是否支持图片，都直接决定开发者能否规划工作；目前有多个重复反馈，但不应据此断言统一根因。  
  参考：[额度重置 #61902](https://github.com/anomalyco/opencode/issues/61902)、[图片能力声明 #61842](https://github.com/anomalyco/opencode/issues/61842)。

- **V2 升级应重点验证 MCP 兼容矩阵。** 建议覆盖旧式 SSE、通知先于响应、工具目录完整性，以及响应元数据透传，而不只测试“连接成功”。  
  参考：[SSE 回退 #61867](https://github.com/anomalyco/opencode/issues/61867)、[元数据丢失 #61894](https://github.com/anomalyco/opencode/issues/61894)。

- **性能优化需要用实际成本验证。** 会话预热的价值取决于供应商缓存机制和请求一致性，不能仅以“提前发请求”推断收益。  
  参考：[预热成本 #61775](https://github.com/anomalyco/opencode/issues/61775)。

**总体判断：** 本日展示样本的主线是可靠性治理，而非单纯扩充功能。显式状态机重构值得持续跟踪，但最终成效仍需结合合并记录、后续 Release 与用户复测确认。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-11-05

> 数据来源：`badlogic/pi-mono`；所提供条目指向 `earendil-works/pi`，下文采用条目对应的 GitHub 链接。部分条目的更新时间标注为 11 月 4 日，本日报按提供的数据集汇总。**Issue/PR 的 CLOSED 状态不代表已修复或已合并。**

## 1. 今日速览

今日动态集中在 **Agent 运行可靠性、扩展/TUI 容错与跨平台兼容**：社区报告了长时间无头任务崩溃、扩展渲染异常，以及 Windows、Android 环境中的执行问题。PR 方面，最值得关注的是仍开放的[文件编码兼容修复 #11811](https://github.com/earendil-works/pi/pull/11811)，旨在避免 `read`、`edit` 处理非 UTF-8 文件时乱码或损坏数据；另有 3 个涉及退出处理、认证与模型选择体验的 PR 已关闭，但合并情况未提供。

过去 24 小时无新 Release。

## 2. 社区热点 Issues

以下选取 10 个独立议题；重复报告合并说明。**所选 Issue 均已关闭**，评论数仅 1–2 条、👍 均为 0，尚不足以据此判断广泛社区共识。

| Issue | 核心问题与重要性 | 社区反馈 |
|---|---|---|
| [#11808：无头任务触发 SIGILL](https://github.com/earendil-works/pi/issues/11808) | 用户报告 Linux x64、1.4.0 的两次长时间无头运行在 Worker 线程崩溃，故障指令位置相同。直接影响无人值守任务可靠性，值得优先复现。 | 2 条评论；附故障地址与调试信息，但数据未提供根因或处理结论。 |
| [#11818：自定义工具渲染器导致 TUI 崩溃](https://github.com/earendil-works/pi/issues/11818) | `renderCall` / `renderResult` 返回 `undefined` 时，TUI 访问 `render` 或 `invalidate` 触发异常。暴露扩展返回值校验与故障隔离不足。 | 1 条评论；报告将问题定位到 `ToolExecutionComponent`。 |
| [#11817：扩展错误日志覆盖状态栏](https://github.com/earendil-works/pi/issues/11817) | 扩展定时调用 `console.error`，会将原始多行堆栈反复输出至编辑器下方，挤占模型和路径状态行。影响持续使用时的可读性与排障体验。 | 2 条评论；报告强调日志重复出现，而非单次显示异常。 |
| [#11805：相邻 `output_config` 导致 OpenRouter 400](https://github.com/earendil-works/pi/issues/11805) | 历史重整及 thinking level 配置可能生成相邻指令，导致请求被拒绝。说明推理参数与消息历史转换的兼容性需要重点验证。 | 1 条评论；该报告是 [#11804](https://github.com/earendil-works/pi/issues/11804) 按模板重新提交的版本，不宜视为两起独立故障。 |
| [#11809：Termux/Android 同步进程调用可能冻结宿主](https://github.com/earendil-works/pi/issues/11809) | `findExecutableOnPath()`、`commandExists()` 使用 `spawnSync` 检测命令，可能阻塞调用线程。对进程内嵌入和移动端使用尤其重要。 | 2 条评论；提出减少本可避免的进程启动。 |
| [#11814：Windows 自更新调用 `/bin/sh` 崩溃](https://github.com/earendil-works/pi/issues/11814) | Windows 11 上，自更新路径尝试启动不存在的 `/bin/sh`，导致未捕获异常。涉及基础启动与更新流程的平台适配。 | 1 条评论；提供了 `spawn /bin/sh ENOENT` 错误信息。 |
| [#11815：非法字符技能命令未展开](https://github.com/earendil-works/pi/issues/11815) | `/skill:name` 含非法字符时可能原样透传，导致设置了 `disable-model-invocation` 的技能无法执行。影响显式技能调用的确定性。 | 1 条评论；带 `bug` 标签，并提供命令解析代码位置。 |
| [#11807：grep 的 glob 与 path 基准不一致](https://github.com/earendil-works/pi/issues/11807) | 含目录的 `glob` 实际以进程 cwd 为基准，而非指定 `path`，可能静默返回“No matches found”。容易让 Agent 误判文件不存在。 | 1 条评论；带 `bug` 标签，提供目录与匹配示例。 |
| [#11806：单模型 scope 无法通过 Ctrl+P 切换](https://github.com/earendil-works/pi/issues/11806) | scope 仅含一个模型时，逻辑提前返回；即使当前模型不在该 scope 中，也不会切换。影响模型范围约束与快捷键预期。 | 1 条评论；报告指出单项列表的提前返回逻辑。 |
| [#11816：自定义 overlay 请求支持 blocked 状态](https://github.com/earendil-works/pi/issues/11816) | 希望 `ctx.ui.custom()` overlay 支持 inline 组件已有的 `blocked` 选项，补齐不同 UI 扩展形式之间的能力差异。 | 1 条评论；来自首次提交 Issue、尝试在 Herdr 中使用 Pi 的用户。 |

## 3. 重要 PR 进展

数据仅提供 **4 个 PR**，因此全部列出，不补造至 10 个。它们均由 **petrroll** 提交；评论数缺失，无法评价讨论热度。

### ① [#11811：read/edit 支持 UTF-16 与非 UTF-8 文件](https://github.com/earendil-works/pi/pull/11811)
**状态：OPEN**

引入共享的 `file-encoding.ts` 辅助模块，处理 `read` 将 UTF-16 文件显示为乱码、`edit` 将非 UTF-8 文件错误解码并损坏内容的问题。**这是本批 PR 中最值得优先跟进的数据完整性改进**，尤其适用于包含历史编码文件的代码库。

### ② [#11812：退出前等待 OAuth 刷新结果保存](https://github.com/earendil-works/pi/pull/11812)
**状态：CLOSED，未提供合并信息**

针对 RPC 模式下的退出竞态：后台刷新可能已经消耗一次性 refresh token，但进程在新凭证写入前退出，导致本地保留失效凭证。PR 旨在等待已启动的刷新完成保存，降低后续认证失败风险。

### ③ [#11813：bash 超时后仍报告已退出 shell 的退出码](https://github.com/earendil-works/pi/pull/11813)
**状态：CLOSED，未提供合并信息**

shell 已退出，但后台子进程继承 stdout/stderr 并保持管道打开时，bash 工具仍可能等到超时。该 PR 旨在保留 shell 的退出码，避免仅返回超时信息，帮助区分命令执行结果与管道生命周期问题。

### ④ [#11810：目录刷新后保留模型选择位置](https://github.com/earendil-works/pi/pull/11810)
**状态：CLOSED，未提供合并信息**

模型选择器启动后台目录刷新后，刷新结果可能重置用户正在浏览的选中项。PR 通过传递所选模型信息维持选择状态，减少异步刷新打断交互的问题。

## 4. 功能需求趋势

- **可靠性优先于功能扩张。** 长任务崩溃、同步阻塞及平台启动异常，表明社区当前反馈更偏向“稳定运行”，而非新增模型或 IDE 功能。参考：[无头运行崩溃](https://github.com/earendil-works/pi/issues/11808)、[Android 阻塞](https://github.com/earendil-works/pi/issues/11809)、[Windows 自更新](https://github.com/earendil-works/pi/issues/11814)。
- **扩展 API 需要更强容错与一致性。** 日志输出、渲染器返回值、overlay 状态能力共同指向扩展边界治理。参考：[日志隔离](https://github.com/earendil-works/pi/issues/11817)、[渲染容错](https://github.com/earendil-works/pi/issues/11818)、[blocked 支持](https://github.com/earendil-works/pi/issues/11816)。
- **Agent 工具语义需要更明确。** grep 路径基准、技能命令解析和文件编码都会影响自动化操作的正确性，尤其要避免“静默失败”。参考：[glob 基准](https://github.com/earendil-works/pi/issues/11807)、[技能展开](https://github.com/earendil-works/pi/issues/11815)、[文件编码 PR](https://github.com/earendil-works/pi/pull/11811)。
- **模型调用与选择流程仍需打磨。** 当前需求更偏向现有调用链兼容性和操作确定性，而非新增模型支持。参考：[OpenRouter 指令冲突](https://github.com/earendil-works/pi/issues/11805)、[单模型切换](https://github.com/earendil-works/pi/issues/11806)。

## 5. 开发者关注点

1. **优先防范静默错误与数据损坏。** 编码错误和搜索漏匹配可能不立即报错，却会影响 Agent 的判断与修改结果。建议重点跟进 [#11811](https://github.com/earendil-works/pi/pull/11811) 与 [#11807](https://github.com/earendil-works/pi/issues/11807)。
2. **把生命周期边界纳入测试。** 进程退出、后台任务、管道关闭和令牌落盘存在竞态，需要覆盖非理想时序。参考 [#11812](https://github.com/earendil-works/pi/pull/11812)、[#11813](https://github.com/earendil-works/pi/pull/11813)。
3. **扩展异常不应拖垮主界面。** 自定义渲染器和日志输出需要校验、降级与隔离机制。参考 [#11818](https://github.com/earendil-works/pi/issues/11818)、[#11817](https://github.com/earendil-works/pi/issues/11817)。
4. **跟踪关闭后的实际去向。** 本批 Issue 全部关闭，但数据不足以证明修复完成；其中 [#11805](https://github.com/earendil-works/pi/issues/11805) 明确说明前一报告因模板问题自动关闭。评估问题是否解决，应继续核对关联提交、合并记录与后续 Release。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报
**日期：2026-11-05** ｜ **仓库：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)**

## 1. 今日速览

今天的重点是 **Web Shell 性能与会话状态稳定性**：隐藏侧栏后仍轮询所有可信工作区的问题被标为 P1，已有两份修复 PR；历史回退相关的 CI 失败也有修复方案在推进。模型兼容性同样活跃，涉及 GPT-5 / o-series 请求参数、Ollama 上下文溢出识别，以及 OCI Generative AI 接入；另有一个 nightly 版本发布。

> 数据口径：所提供窗口内共 9 条 Issue、24 条更新的 PR，其中展示了 20 条 PR。下文完整覆盖 9 条 Issue，精选 10 条 PR；PR 的 `CLOSED` 状态不等同于已合并，未提供的合并信息不作推断。

## 2. 版本发布

### [v0.26.7-nightly.20261104.b9e20830f7](https://github.com/QwenLM/qwen-code/releases/tag/v0.26.7-nightly.20261104.b9e20830f7)

- **可确认更新**：调整 ACP parity 集成测试，使运行时状态不再写入工作区，减少测试对工作区的污染。对应 [PR #16254](https://github.com/QwenLM/qwen-code/pull/16254)。
- **信息限制**：提供的发布说明在 `fix` 处截断，无法确认其他修复内容；不应将下文仍开放的 PR 视为已随此版本交付。

## 3. 社区热点 Issues

本次仅提供 **9 条 Issue**，以下全部列出，不补造第 10 条。所有 Issue 的 👍 均为 0，社区反应主要参考评论数及关联 PR。

| Issue | 为什么重要 | 社区反应与状态 |
|---|---|---|
| **[ #16355：无侧栏 Web Shell 空闲时仍全量轮询](https://github.com/QwenLM/qwen-code/issues/16355)** | `sidebar={false}` 时仍每 5 秒查询所有可信工作区的 `sessions/live-state`，即使没有运行中的会话。影响嵌入场景的空闲资源消耗。 | **P1，开放，3 条评论**；已有 [#16356](https://github.com/QwenLM/qwen-code/pull/16356)、[#16357](https://github.com/QwenLM/qwen-code/pull/16357) 两份修复 PR。 |
| **[#16343：GPT-5 / o-series 输出预算参数不兼容](https://github.com/QwenLM/qwen-code/issues/16343)** | Chat Completions 使用 `max_tokens`，而受影响模型要求 `max_completion_tokens`，导致请求在生成首个 token 前失败。 | **P2，开放，2 条评论**；修复 PR [#16344](https://github.com/QwenLM/qwen-code/pull/16344) 已提交。 |
| **[#16346：Managed Agent 类体积门禁失败](https://github.com/QwenLM/qwen-code/issues/16346)** | Java 21 CI 的 `ClassSizeRatchetTest.productionClassesStayWithinTheirSizeRatchet` 失败，暴露代码规模约束与持续集成维护问题。 | **待分诊，开放，6 条评论**，为本批评论最多的 Issue 之一；摘要未提供最终处理结果。 |
| **[#16353：QQ Bot 消息转发 PR 请求评审](https://github.com/QwenLM/qwen-code/issues/16353)** | 推进可选的 `forwardBotMessages`，支持转发机器人发送的消息；当前主要阻塞点是评审，而非作者报告的必需检查。 | **P3，评审中，6 条评论**；作者称 [PR #15904](https://github.com/QwenLM/qwen-code/pull/15904) 可合并、必需检查通过，但仍需两名评审者批准。 |
| **[#16348：在计划面板展示子会话](https://github.com/QwenLM/qwen-code/issues/16348)** | 希望将 `create_sub_session` 创建的子会话关联到计划步骤，并计入 “Active agents”，提升多代理委派过程的可观测性。 | **P2，开放，2 条评论**；处于讨论阶段，尚不能视为已确定交付的功能。 |
| **[#16332：新增 OCI Generative AI provider preset](https://github.com/QwenLM/qwen-code/issues/16332)** | 希望提供内置配置预设，降低 OCI 模型接入成本，扩展云服务商覆盖。 | **P3，开放，4 条评论**；提案按贡献流程征询维护者接受意愿，另有文档 PR [#16345](https://github.com/QwenLM/qwen-code/pull/16345)。 |
| **[#16339：东南亚语言后续建议被错误过滤](https://github.com/QwenLM/qwen-code/issues/16339)** | 按空格计词会把泰语、老挝语、高棉语和缅甸语建议误判为 `too_few_words`，影响多语言体验。 | **P2，开放，2 条评论**；已有修复 PR [#16341](https://github.com/QwenLM/qwen-code/pull/16341)。 |
| **[#16340：自定义模型名导致 Qwen3.x 配置识别缺失](https://github.com/QwenLM/qwen-code/issues/16340)** | 使用 vLLM/SGLang 的自定义 `--served-model-name` 时，可能失去思考控制和上下文窗口相关配置，需要明确文档指引。 | **P3，已关闭，2 条评论**；关联文档 PR [#16342](https://github.com/QwenLM/qwen-code/pull/16342) 也已关闭，但数据未说明是否合并。 |
| **[#16347：会话历史回退相关 CI 失败](https://github.com/QwenLM/qwen-code/issues/16347)** | macOS 单元测试涉及权威回退后重新打开被拒绝的历史页，关系到历史分页与会话状态一致性。 | **已关闭，1 条评论**；关联修复 PR [#16358](https://github.com/QwenLM/qwen-code/pull/16358) 仍开放，不能据此认定修复已落地。 |

## 4. 重要 PR 进展

以下 10 个 PR **均处于 OPEN 状态**。所给评论数字段为 `undefined`，不据此判断评审热度。

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| **[#16357：缩小无侧栏模式轮询范围](https://github.com/QwenLM/qwen-code/pull/16357)** | 仅对活跃或已连接会话对应的工作区进行 live-state 轮询，不再扫描所有可信工作区。 | 直接响应 P1 性能问题；与 #16356 方案并行，需关注最终采用版本。 |
| **[#16358：延后回退容量锁状态发布](https://github.com/QwenLM/qwen-code/pull/16358)** | 将 rewind 场景下容量锁重新打开的 React 状态发布延后一个微任务，使其发生在历史重建提交之后。 | 修正状态更新时序，针对 #16347 的历史页重开测试失败。 |
| **[#16344：修正 GPT-5 / o-series 参数](https://github.com/QwenLM/qwen-code/pull/16344)** | 为相应模型使用 `max_completion_tokens`，其他模型继续使用 `max_tokens`。 | 修复阻断型请求错误，同时尽量保持其他模型行为不变。 |
| **[#16331：识别 Ollama 上下文溢出错误](https://github.com/QwenLM/qwen-code/pull/16331)** | 将 Ollama 的相关错误归入上下文溢出，接入现有响应式压缩流程。 | 改善本地模型长会话恢复能力；该 PR 仅调整错误识别，并非全面解决上下文容量限制。 |
| **[#16341：保留东南亚语言后续建议](https://github.com/QwenLM/qwen-code/pull/16341)** | 使用 `Intl.Segmenter` 对相关文字进行分段，避免单纯按空格计词导致误过滤。 | 修复多语言过滤偏差，覆盖四种无空格分词语言。 |
| **[#16337：缓存 Managed 消息正文](https://github.com/QwenLM/qwen-code/pull/16337)** | 引入进程共享、按字节限制容量的缓存，避免多次重建历史时重复读取消息正文。 | 降低 Hosted Turn 中重复历史重建的读取开销。 |
| **[#16336：为 activation lease 查询建立索引](https://github.com/QwenLM/qwen-code/pull/16336)** | 为 Session journal 增加激活记录标志及相关索引。 | 优化 Managed Agent 激活租约查询路径；实际收益仍需性能验证。 |
| **[#16334：保留遭遇 GitHub 二级限流的回复](https://github.com/QwenLM/qwen-code/pull/16334)** | 将二级限流视为明确未写入，先在进程内重试，持续限流时保留已完成回复。 | 减少“内容已生成但未成功发送”的消息丢失风险。 |
| **[#16333：临时错误时保留 GitHub 通知未读](https://github.com/QwenLM/qwen-code/pull/16333)** | 读取通知线程遇到 5xx、网络错误或限流时，不将通知标为已读。 | 降低暂时性 API 故障造成漏处理的风险。 |
| **[#16338：由 macOS 桌面宿主发送通知](https://github.com/QwenLM/qwen-code/pull/16338)** | 在打包的 macOS 桌面环境中，通过 Tauri 宿主发送原生回合通知。 | 改善 Web Notifications 未获授权时的桌面提醒体验。 |

## 5. 功能需求趋势

1. **多模型、多云接入从“能配置”走向“行为兼容”**  
   OCI 预设、自定义 Qwen3.x 模型名、GPT-5 / o-series 参数问题共同表明，接入能力不仅依赖 endpoint，还依赖模型识别、参数映射和配置文档。  
   参考：[#16332](https://github.com/QwenLM/qwen-code/issues/16332)、[#16343](https://github.com/QwenLM/qwen-code/issues/16343)、[#16340](https://github.com/QwenLM/qwen-code/issues/16340)。

2. **多代理工作流需要更清晰的可视化**  
   用户希望计划步骤、子会话与活跃代理计数相互关联，便于理解委派关系，而不仅是启动多个代理。  
   参考：[#16348](https://github.com/QwenLM/qwen-code/issues/16348)。

3. **嵌入式 Web Shell 更重视按需运行**  
   无侧栏场景的 P1 问题体现出对空闲资源占用、轮询范围和嵌入模式独立行为的关注。  
   参考：[#16355](https://github.com/QwenLM/qwen-code/issues/16355)。

4. **渠道自动化与多语言体验持续扩展**  
   QQ Bot 消息转发需求强调渠道集成的灵活性；东南亚语言过滤问题则提醒开发者，文本规则不能默认依赖空格分词。  
   参考：[#16353](https://github.com/QwenLM/qwen-code/issues/16353)、[#16339](https://github.com/QwenLM/qwen-code/issues/16339)。

## 6. 开发者关注点

- **优先排查“请求尚未生成就失败”的兼容性问题**：使用 GPT-5 / o-series 的 Chat Completions 用户，应关注输出预算参数修复状态。见 [#16344](https://github.com/QwenLM/qwen-code/pull/16344)。
- **性能优化需同时覆盖前端与服务端**：前端应避免空闲全量轮询，后端则在推进消息缓存和租约查询索引；当前数据尚无可引用的量化收益。见 [#16357](https://github.com/QwenLM/qwen-code/pull/16357)、[#16337](https://github.com/QwenLM/qwen-code/pull/16337)、[#16336](https://github.com/QwenLM/qwen-code/pull/16336)。
- **异步状态与外部 API 故障都需要可恢复设计**：历史回退状态时序、GitHub 限流和临时读取失败，是本轮可靠性修复的典型场景。见 [#16358](https://github.com/QwenLM/qwen-code/pull/16358)、[#16334](https://github.com/QwenLM/qwen-code/pull/16334)、[#16333](https://github.com/QwenLM/qwen-code/pull/16333)。
- **评审资源仍可能成为交付瓶颈**：QQ Bot 功能的升级求审说明，即使作者报告必需检查已通过，批准数量仍可能阻塞推进；不能把“可合并”视为“即将发布”。见 [#16353](https://github.com/QwenLM/qwen-code/issues/16353)。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-11-05｜统计窗口：过去 24 小时**

> **数据说明**：数据来源标注为 `Hmbown/DeepSeek-TUI`，但所列 Issue、PR 均指向 `codewhale-hq/Codewhale`。以下按条目实际归属生成链接；本次仅有 **1 条 Issue、3 条 PR**，不补足至 10 条，也不据此推断整体社区热度。

## 1. 今日速览

今日动态主要围绕 **HTTP 限流恢复、Windows 剪贴板图片兼容性和本地状态目录访问**展开。其中，限流恢复 PR 提议引入独立、有上限的重试机制，Windows 图片粘贴 PR 则尝试解决 QQ 截图无法直接粘贴的问题。

社区新增了剪贴板图片按会话管理及清理命令的需求。过去 24 小时无新版本发布，上述能力尚不能视为已正式交付。

## 2. 社区热点 Issues

### [#7221：剪贴板图片分组与清理](https://github.com/codewhale-hq/Codewhale/issues/7221)
**状态：OPEN｜标签：enhancement、needs-triage｜作者：Asteria1028**

- **需求内容**：建议按会话组织剪贴板图片，并增加清理命令。
- **为什么重要**：图片输入不仅涉及能否粘贴，也涉及图片在不同会话中的归属和后续清理；该需求指向更完整的图片生命周期管理。
- **社区反应**：当前有 **1 条评论、0 个赞**，尚处于待分诊阶段。数据未提供评论内容，无法判断维护者态度或方案共识。

## 3. 重要 PR 进展

### [#7220：增加有界 HTTP 限流恢复机制](https://github.com/codewhale-hq/Codewhale/pull/7220)
**状态：OPEN｜标签：contribution-gate｜作者：zhuowp**

- **拟解决问题**：HTTP 429 当前会消耗普通网络传输的短重试额度，可能在服务商限流解除前就终止调用。
- **方案要点**：引入独立的 HTTP 恢复策略，最多 **20 次总尝试（含首次）**，恢复时间预算为 **600 秒**。
- **开发价值**：有望提高临时限流场景下的调用成功率，同时通过次数与时间双重上限约束等待成本。
- **进展判断**：仍处于开放状态，不能视为已合入或可用。

### [#7219：将用户主目录下的状态目录排除在链接访问限制之外](https://github.com/codewhale-hq/Codewhale/pull/7219)
**状态：CLOSED｜作者：SparkofSpike**

- **拟解决问题**：当 `~/.codewhale` 通过 Windows junction 重定向至其他位置，例如 `D:\CodeWhaleData`，现有链接访问限制可能阻断状态目录访问。
- **影响范围**：摘要显示涉及子代理存储准入、凭据目录访问等故障，属于本地状态与权限边界的兼容性问题。
- **开发价值**：对迁移状态目录、使用非默认磁盘存储的 Windows 用户具有实际意义。
- **进展判断**：PR 已关闭，但数据未提供合并标记，**不能据此认定修复已合入**。

### [#7218：通过 .NET 回退读取 Windows 剪贴板图片](https://github.com/codewhale-hq/Codewhale/pull/7218)
**状态：OPEN｜作者：SparkofSpike**

- **拟解决问题**：QQ 截图后直接按 `Ctrl+V` 无响应，但图片经其他应用转存、再复制后可以粘贴。
- **方案要点**：增加通过 .NET 读取 Windows 剪贴板图片的回退路径，应对不同截图工具提供的剪贴板格式差异。
- **开发价值**：减少用户为粘贴图片而进行的跨应用中转操作，改善截图输入体验。
- **进展判断**：仍处于开放状态，兼容效果尚不能视为已交付。

> 三条 PR 的评论数均未提供，点赞数均为 0，因此不以互动量判断其受关注程度。

## 4. 功能需求趋势

**仅依据本次唯一一条 Issue，可确认的需求方向是剪贴板图片管理；样本不足以形成社区级热度排名。** 结合 PR，可观察到以下工作方向：

| 方向 | 当前信号 | 关联条目 |
|---|---|---|
| 图片生命周期管理 | 从图片输入延伸到会话归属与清理操作 | [Issue #7221](https://github.com/codewhale-hq/Codewhale/issues/7221) |
| Windows 图片输入兼容性 | 适配截图工具之间的剪贴板格式差异 | [PR #7218](https://github.com/codewhale-hq/Codewhale/pull/7218) |
| 服务商限流下的稳定性 | 将 429 恢复与普通网络重试分离，并设置恢复上限 | [PR #7220](https://github.com/codewhale-hq/Codewhale/pull/7220) |
| 非默认存储路径兼容性 | 处理状态目录经 junction 重定向后的访问问题 | [PR #7219](https://github.com/codewhale-hq/Codewhale/pull/7219) |

本次数据中没有足够证据支持 IDE 集成、新模型支持等方向正在升温。

## 5. 开发者关注点

- **图片工作流需要端到端完善**：既要解决截图“粘不进来”，也要解决粘贴后的会话归属与清理问题。关联：[PR #7218](https://github.com/codewhale-hq/Codewhale/pull/7218)、[Issue #7221](https://github.com/codewhale-hq/Codewhale/issues/7221)。
- **临时限流不应过早终止调用**：恢复策略需要区别于普通传输重试，同时明确最大等待成本。关联：[PR #7220](https://github.com/codewhale-hq/Codewhale/pull/7220)。
- **安全限制与自定义存储布局需要兼容**：状态目录重定向可能触发看似无关的多处故障，值得重点回归验证。关联：[PR #7219](https://github.com/codewhale-hq/Codewhale/pull/7219)。

**后续重点**：跟踪两条开放 PR 的评审与合并结果，确认 #7219 的关闭原因，并观察图片清理需求是否获得维护者响应。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*