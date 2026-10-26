# AI CLI 工具社区动态日报 2026-10-26

> 生成时间: 2026-10-26 01:39 UTC | 覆盖工具: 9 个

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
**日期：2026-10-26｜基于所提供的过去 24 小时社区快照**

> **口径说明：**Issue、PR 数量均指窗口内更新记录，不等于新增数量；部分项目只展示了筛选样本。用户故障报告不等于官方确认，PR 关闭不等于合并或发布；各仓库的数据开放方式与统计覆盖不同，不能仅凭数量判断产品质量。

## 1. 生态全景

AI CLI 的竞争焦点正在从“能否生成代码”转向“能否可靠地完成长任务”：上下文压缩、任务收敛、会话恢复和资源治理成为跨工具共同议题。使用场景也在从单机终端延伸至 Desktop、Web、移动端、SSH 和托管 Agent，随之暴露出会话隔离、权限继承及跨端状态一致性问题。MCP 的关注点已超越首次接入，转向动态发现、认证恢复、取消传播和故障诊断。工程侧，OpenCode、Qwen Code 和 Gemini CLI 展示出较多 PR 更新，但补丁提案与经过验证的正式交付之间仍有明显距离。

## 2. 各工具活跃度对比

| 工具 | 更新 Issues | 更新 PR | Release 情况 | 今日主要信号 |
|---|---:|---:|---|---|
| **Claude Code** | 50，展示 30 | 0 | 无新 Release | 长会话压缩、权限继承、Remote Control 一致性 |
| **OpenAI Codex** | 50，展示 30 | 0 | 无新 Release | 提前结束任务、MCP 工具发现、桌面运行链路 |
| **Gemini CLI** | 13 | 14 | 无新 Release；Nightly 发布失败，标记 P0 | Agent 会话隔离、输入输出保真、Windows 兼容 |
| **GitHub Copilot CLI** | 5，含 2 条同名需求 | 0 | 无新 Release | 长会话锁超时、内存压力、Entra MCP 认证 |
| **Kimi Code CLI** | 0 | 0 | 无活动记录 | 本窗口无可分析的新信号 |
| **OpenCode** | 50，展示 30 | 50，展示 20 | 无新 Release | 免费额度异常、长会话与图片性能、模型兼容 |
| **Pi** | 16 | 7 | 无新 Release | 自定义模型、扩展控制、跨平台兼容 |
| **Qwen Code** | 34，展示 30 | 50，展示 20 | 提供 1 个 nightly 发布记录 | Managed Agent、长期任务、SDK/Runtime 发布阻塞 |
| **DeepSeek TUI／条目指向 Codewhale** | 7，含 1 条无关内容 | 15 | 无新 Release | 指令预算、状态透明度、0.10.3 质量验收 |

**数据注意事项：**
- Pi 来源标记为 `badlogic/pi-mono`，实际条目指向 `earendil-works/pi`；DeepSeek TUI 条目指向 `codewhale-hq/Codewhale`，不据此推断迁移关系。
- Pi 的 7 个 PR 均为 CLOSED；DeepSeek TUI 对应条目的 15 个 PR 中有 14 个 CLOSED，不能将其直接计为交付成果。
- Qwen Code 的 CLI nightly 发布不代表 SDK、Managed Runtime 已同步可用。

## 3. 共同关注的功能方向

| 共同方向 | 涉及工具 | 具体诉求及差异 |
|---|---|---|
| **长任务连续性与上下文治理** | Claude Code、Codex、Copilot CLI、OpenCode、Qwen Code、Pi | Claude 关注压缩循环与会话恢复；Codex 关注未完成即结束；Copilot 关注锁和内存；OpenCode 关注摘要预算与历史处理成本；Qwen 关注交接续跑、循环保护；Pi 关注上下文配置和压缩扩展接口 |
| **会话隔离与状态一致性** | Claude Code、Codex、Gemini CLI、OpenCode、Qwen Code | 包括远程历史不完整、回读旧回合、远程 Agent 状态复用、消息进入其他会话，以及长期记忆按聊天隔离 |
| **MCP 可恢复性与可观测性** | Codex、Copilot CLI、Gemini CLI、OpenCode、Qwen Code | 从连接成功扩展到会话内重连、完整工具名搜索、企业认证恢复、OAuth 独立取消、调用进度和启动 stderr |
| **权限与配置的可验证执行** | Claude Code、OpenCode、Qwen Code、Pi | 拒绝规则跨会话继承、Provider 禁用策略、配置迁移不丢字段、会话权限规则、资源发现作用域与优先级 |
| **成本与资源透明度** | Claude Code、Copilot CLI、OpenCode、Qwen Code、Codewhale | 按需加载工具、减少上下文重复注入、图片负载优化、可信额度倒计时，以及未知价格不显示为零 |
| **跨平台与信息保真** | Gemini CLI、Pi、Claude Code、Codex、Codewhale | Windows 路径和工具链、Unicode、终端图片、文件缩进、换行符及长日志均需要更完整的边界测试 |

**共同特征：**社区正在要求工具提供更明确的执行契约——任务何时算完成、取消是否真正生效、配置是否实际执行、结果是否完整返回，而不仅是增加功能入口。

## 4. 差异化定位分析

以下是从本期动态推断的产品侧重，不等于完整产品能力评价。

| 工具 | 功能侧重与技术路线信号 | 更值得哪些用户评估 |
|---|---|---|
| **Claude Code** | 终端、Desktop 与 Remote Control 围绕持续会话协作；重点是上下文、工具权限和跨端交接 | 需要长周期代码任务及远程接续工作的开发者 |
| **OpenAI Codex** | CLI、IDE、Desktop、插件及 Computer Use 的组合式工具链；运行后端和工具发现是重要依赖 | 希望整合多种开发入口及应用操作能力的团队 |
| **Gemini CLI** | 本期修复集中在 ACP、远程 Agent、Shell 输出和文件输入，协议与执行正确性特征突出 | 需要外部客户端集成、多 Agent 编排或参与开源贡献的团队 |
| **GitHub Copilot CLI** | 本期反馈突出并行 Agent 长任务和 Entra 保护的企业 MCP 接入 | 已使用 GitHub、Azure DevOps 等企业开发环境的团队 |
| **OpenCode** | 多 Provider、多客户端与插件扩展；性能优化覆盖媒体传输、历史处理和 Hook 生命周期 | 重视模型选择灵活性、插件定制及截图密集型工作流的用户 |
| **Pi** | 自定义模型、本地端点和细粒度扩展钩子；强调资源作用域与宿主可控性 | 扩展作者、本地模型用户及定制 Agent 宿主开发者 |
| **Qwen Code** | Managed Agent、后台 autofix、持久化 journal 和 WebShell，服务化与托管运行信号较强 | 构建无人值守、多会话、多 worker 开发平台的团队 |
| **DeepSeek TUI／Codewhale 条目** | TUI、多 Provider、指令预算与状态展示，并关注安装卸载、本地化等产品完整度 | 重视终端交互、运行反馈和可配置性的开发者 |
| **Kimi Code CLI** | 本窗口无活动，无法据此推断近期路线 | 需结合更长时间窗口评估 |

## 5. 社区热度与成熟度

### 开发活动：OpenCode、Qwen Code 最突出

两者均有 **50 条 PR 更新**，是本期最强的可见开发活动信号，但方向不同：

- **OpenCode**：更集中于长会话性能、媒体数据处理、Provider 和插件兼容。
- **Qwen Code**：更集中于托管运行、持久化、无人值守任务和发布基础设施。

Gemini CLI 的 **13 条 Issue、14 条 PR** 展示出多项问题已有对应补丁的处理链路，但相关 PR 仍开放，不能据此判断修复速度或发布效率。

### 讨论热度：存在焦点，但整体互动仍有限

- 本期列出的单项讨论中，**Qwen SDK 发布阻塞为 11 条评论**。
- OpenCode 免费额度问题最高 **5 条评论**，Codex 提前结束任务为 **4 条评论**。
- Claude Code、Gemini CLI、Copilot CLI、Pi 的所列热点，单项评论最多均为 **2 条**。

因此，高 Issue 更新量不等于高社区共识；额度、锁超时或内存增长等报告值得验证，但尚不能直接外推影响比例。Copilot 的两项长会话故障还来自同一报告者，不能视为独立的大规模证据。

### 成熟度：应看可靠性闭环，而不是功能或 PR 数量

当前样本不足以形成可信的整体成熟度排名。更有决策价值的评价维度是：

1. **状态是否可信**：完成、取消、额度恢复和诊断信息是否与实际一致。
2. **边界是否可靠**：权限、会话、记忆和配置是否正确隔离。
3. **故障能否恢复**：压缩失败、认证失效、后端中断后是否有恢复路径。
4. **补丁是否交付**：复现、测试、合并、发布和回归验证是否形成闭环。

Claude Code、Codex 和 Copilot CLI 在本窗口没有 PR 更新记录，也不能据此认定其整体研发停滞；公开仓库快照未必覆盖全部开发流程。

## 6. 值得关注的趋势信号

### ① 长任务可靠性正在成为核心竞争指标
压缩循环、提前结束、重复调用和数小时后的内存压力，说明短时演示无法充分代表实际生产能力。

**开发者参考：**选型测试应加入数小时运行、恢复会话、并行子任务和上下文临界场景，记录人工续跑次数、资源峰值和结果完整性。

### ② 会话状态正成为 Agent 平台的基础设施
Gemini 的远程状态隔离、Qwen 的记忆作用域、OpenCode 的会话路由及 Claude 的远程交接，共同表明：会话不再只是聊天记录，而是包含权限、工具、记忆与执行进度的状态单元。

**开发者参考：**评估多用户或托管部署时，应验证这些状态分别如何隔离、持久化和恢复，不能只检查会话 ID 是否不同。

### ③ MCP 的下一阶段是运行治理，而非连接数量
工具发现、OAuth 并发、Entra 令牌恢复、取消和 stderr，正在决定 MCP 能否进入稳定生产环境。

**开发者参考：**验收应覆盖“初始化—发现—调用—取消—重连—凭据失效恢复”的完整链路，而不止首次连接成功。

### ④ 成本优化正从 Token 扩展到整个数据处理过程
Copilot 的上下文加载诉求、Claude 的额外 MCP 描述开销，以及 OpenCode 对图片、Hook 对象和历史重复处理的优化，说明资源成本同时存在于模型侧和客户端侧。

**开发者参考：**总成本应同时考虑 Token、内存、传输延迟及人工恢复成本，尤其是浏览器自动化和多图片任务。

### ⑤ 安全控制正在从“有配置”转向“可验证生效”
权限继承、Provider 禁用和配置迁移问题说明，配置界面显示成功并不代表运行时行为正确。

**开发者参考：**对拒绝规则、工具开关和升级迁移建立自动化负向测试；Auto approval 等便利能力应与可验证的权限边界配套使用。

### ⑥ 自动生成补丁不能替代交付验证
Codewhale 多个生成式修复 PR 明确未完成测试；Gemini、Qwen 的发布阻塞也说明，代码改动之外的构建和分发链路同样关键。

**开发者参考：**采用新能力时，以“已测试、已合并、已进入指定版本”为准，不把 OPEN/CLOSED 状态当作可用性承诺。

---

**综合判断：**本期最明确的行业信号不是谁增加了更多 Agent 功能，而是谁能让长任务具备**可信状态、可控成本、清晰隔离和可恢复执行**。技术选型宜以自身工作流的可靠性验证为主，以 Issue、PR 活跃度为辅助；对托管与无人值守场景，还应单独验收权限、持久化和配套组件发布链路。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-10-26｜范围：所提供的 20 条 PR、15 条 Issue**

> **数据说明：**所列 PR 的评论数均为 `undefined`、👍 均为 0，因此无法核实其热度排名。下列榜单是结合展示顺序、关联 Issue 热度和功能价值整理的**重点关注清单**，不代表真实评论排行。所有展示的 PR 均为 **OPEN**，没有已合并或明确标注 Draft 的条目。Issue 内容亦为用户报告或提案，不等于已确认缺陷或官方路线图。

## 1. 热门 Skills 排行：8 个重点关注 PR

| Skill / PR | 功能与改进 | 社区关注焦点 | 当前状态 |
|---|---|---|---|
| **1. mcp-builder** · [#1742](https://github.com/anthropics/skills/pull/1742) | 适配 MCP 2.x 的 `streamable_http_client` 导入及自定义 HTTP 请求头配置。 | **工具链兼容性**：SDK 升级后连接流程是否仍可用。另有 [Issue #1390](https://github.com/anthropics/skills/issues/1390) 报告评估器序列化失败，反映该 Skill 的评测可靠性也受关注；两者不是同一问题。 | **OPEN**；最近更新 10-08 |
| **2. skill-creator** · [#1298](https://github.com/anthropics/skills/pull/1298) | 隔离触发评估任务，处理 Windows 子进程及运行时失败。 | **评估结果是否可信**：避免把执行失败误算成“不触发”，污染优化结果。相关 [Issue #556](https://github.com/anthropics/skills/issues/556) 有 **13 评论、7 👍**，报告触发率持续为 0。 | **OPEN**；最近更新 09-16 |
| **3. Notion 规格落地 / 简历审计** · [#1245](https://github.com/anthropics/skills/pull/1245) | 同一 PR 提交 `notion-spec-to-implementation` 和 `quantitative-resume-auditor`；前者将 Notion 规格拆成实施任务、验收标准和进度跟踪。 | **从文档到执行的闭环**。现有摘要主要介绍 Notion Skill，简历审计的实现细节及讨论内容不足。 | **OPEN**；最近更新 10-15 |
| **4. proofcore-contract-auditor** · [#1771](https://github.com/anthropics/skills/pull/1771) | 对 Solidity、Rust 智能合约做静态分析，并将审计证明锚定 TON 区块链。 | **垂直领域审计与结果可验证性**；不能仅凭“证明上链”推断审计结论可靠。 | **OPEN**；最近更新 09-16 |
| **5. md2video-audio** · [#1703](https://github.com/anthropics/skills/pull/1703) | 将 Markdown 经演示文稿流程转换为带配音的 MP4。 | **内容生产自动化**：从文本直接生成可交付视频。摘要中的“零成本”“专业级”属于提交者描述，尚无验证数据。 | **OPEN**；最近更新 09-15 |
| **6. webapp-testing** · [#1980](https://github.com/anthropics/skills/pull/1980) | 调整服务器启动脚本，避免使用 `shell=True`。 | **Agent 执行安全**：降低未经净化的用户或 Agent 命令进入系统 Shell 所带来的命令注入风险。 | **OPEN**；最近更新 **10-25** |
| **7. docx** · [#1792](https://github.com/anthropics/skills/pull/1792) | LibreOffice 超时返回错误，并验证输出文档是否仍含修订标记。 | **避免“假成功”**：文档处理不仅要执行完成，还要验证产物。另有 [Issue #2018](https://github.com/anthropics/skills/issues/2018) 报告合并文本片段后生成无效 XML。 | **OPEN**；最近更新 09-25 |
| **8. Pyxel 复古游戏开发** · [#525](https://github.com/anthropics/skills/pull/525) | 支持 Python 复古游戏创建、调试、无界面运行、帧检查与状态验证。 | **生成与验证一体化**：不只写游戏代码，还提供可观察的验证流程。 | **OPEN**；最近更新 **10-23** |

## 2. 社区需求趋势

**最强信号并不是“新增更多 Skill”，而是让现有 Skills 更可信、更易共享、更能稳定执行。**

- **可信来源与安全治理——讨论最集中。**  
  [#492](https://github.com/anthropics/skills/issues/492) 以 **46 评论、3 👍** 位居展示 Issue 首位，报告社区 Skill 使用 `anthropic/` 命名空间造成官方身份混淆。结合治理提案 [#412](https://github.com/anthropics/skills/issues/412)（已关闭），可见来源标识、权限边界、审计与策略执行是重要方向。

- **组织级共享与分发——明确的企业工作流诉求。**  
  [#228](https://github.com/anthropics/skills/issues/228) 有 **17 评论、8 👍**，要求组织共享库或直接分享链接，替代下载、聊天工具转发、手动上传。它主要是**平台能力需求**，并非单靠新增 Skill 就能解决。

- **Skill 自动评测与质量门禁——从“会生成”走向“能验证”。**  
  [#556](https://github.com/anthropics/skills/issues/556) 的触发评估问题，与 [#1385](https://github.com/anthropics/skills/issues/1385) 的“任务前校准→对抗审查→交付验证”提案相呼应。潜在方向包括触发测试、失败分类、输出审查和交付验收。

- **长任务记忆与上下文效率——Agent 持续工作的基础。**  
  [#1329](https://github.com/anthropics/skills/issues/1329) 的 `compact-memory` 提案有 **10 评论**；[#1487](https://github.com/anthropics/skills/issues/1487) 则报告单次注入约 156k tokens。社区需要紧凑记忆、按需加载和上下文预算管理。

- **文档完整性与可交付质量——重心是正确性，而不只是格式生成。**  
  [#2018](https://github.com/anthropics/skills/issues/2018) 报告 DOCX XML 损坏风险，支持文档结构校验、修订验证、失败保护等方向。当前样本不足以认定“新文档格式 Skill”是 Issue 中最热门的需求。

- **安装去重与可发现性——减少使用摩擦。**  
  [#189](https://github.com/anthropics/skills/issues/189) 有 **9 👍**，为展示 Issue 中点赞最高，关注插件重复安装相同 Skills；[#2064](https://github.com/anthropics/skills/issues/2064) 则要求描述明确“何时使用”，说明社区同样重视安装体验与触发准确度。

## 3. 高潜力待合并 Skills

**以下是值得优先跟踪的候选，不是“即将合并”预测：**现有数据缺少 PR 评论数、评审意见、CI 和维护者反馈，无法证明讨论活跃或判断合并概率。

| 候选 PR | 跟踪理由 | 判断边界 |
|---|---|---|
| **webapp-testing 安全修复** · [#1980](https://github.com/anthropics/skills/pull/1980) | 10-25 仍有更新，针对命令执行安全，问题范围明确。 | 近期更新不代表已获维护者认可。 |
| **skill-creator 独立打包修复** · [#1681](https://github.com/anthropics/skills/pull/1681) | 10-24 更新，修复直接执行打包脚本时的导入错误及过期路径，直接改善发布流程。 | 尚不清楚跨环境验证结果。 |
| **skill-creator YAML 解析修复** · [#1997](https://github.com/anthropics/skills/pull/1997) | 10-19 更新，避免元数据解析偏差影响评估和描述优化，属于基础质量改进。 | 不能据此认定触发评估的其他问题也会解决。 |
| **Pyxel 游戏开发** · [#525](https://github.com/anthropics/skills/pull/525) | 3 月创建、10-23 仍更新，是持续维护的新增 Skill 候选，且包含验证工作流。 | 长期开放也意味着落地时间仍不确定。 |
| **Notion 规格落地** · [#1245](https://github.com/anthropics/skills/pull/1245) | 10-15 更新，连接规格、任务与实施，具有清晰的工作流价值。 | 同一 PR 包含两个 Skill，仍需分别评估成熟度。 |

## 4. Skills 生态洞察

**当前社区最集中的诉求，是把 Skills 从“可安装的提示与脚本集合”升级为“来源可信、触发准确、执行可验证、组织可复用”的工作流能力。** 代表性信号见 [安全边界 #492](https://github.com/anthropics/skills/issues/492)、[触发评估 #556](https://github.com/anthropics/skills/issues/556) 与 [组织共享 #228](https://github.com/anthropics/skills/issues/228)。

---

# Claude Code 社区动态日报｜2026-10-26

> 数据来源：[anthropics/claude-code](https://github.com/anthropics/claude-code)。过去 24 小时有 50 条 Issue 更新，本文基于所展示的 30 条分析；无新 Release、无 PR 更新。以下故障描述均来自用户报告，不代表官方已确认。

## 一、今日速览

今日关注点集中在**长会话稳定性、桌面端权限一致性和 Remote Control 工作流**：用户报告了压缩循环、超大输入导致会话不可用，以及远程交互回答无法传回本地等问题。另有社区提议提供面向非原生支持平台的 JS 构建产物，但当前讨论量整体较低，尚不能据此判断为广泛共识。

## 二、社区热点 Issues

以下按潜在影响与开发者相关性筛选，而非仅按评论数排序。

| Issue | 核心问题与关注价值 | 社区反应及状态 |
|---|---|---|
| **[远程交接及 `/clear` 后权限配置失效 #105102](https://github.com/anthropics/claude-code/issues/105102)** | Windows Desktop 用户报告，新会话忽略 `permissions.deny` 和已禁用的浏览器工具；交接会话还会加载完整远程 MCP 工具，增加约 20k tokens。涉及**权限边界与上下文成本**，值得优先验证。 | OPEN；标注 `has repro`；0 评论、0 👍。尚无确认修复信息。 |
| **[云端会话反复触发压缩 #105086](https://github.com/anthropics/claude-code/issues/105086)** | 用户报告，压缩后仅执行 3–4 次工具调用便再次提示上下文已满，两个会话均受影响。若可复现，会直接阻断代码检索与持续开发。 | OPEN；0 评论、0 👍。目前为单一报告者提供的多会话案例。 |
| **[超大粘贴导致会话无法恢复 #105096](https://github.com/anthropics/claude-code/issues/105096)** | macOS 用户误粘贴约 480 万字符后，自动压缩和 `/compact` 均失败。暴露出**输入大小校验、异常隔离及会话恢复能力**的潜在不足。 | OPEN；0 评论、0 👍。报告称输入被直接接受，未出现大小预警。 |
| **[Desktop 自动归档打断活跃会话 #105084](https://github.com/anthropics/claude-code/issues/105084)** | Windows 用户报告，一个会话累计关联多个 PR 后，自动归档机制会在仍工作时触发，且取消归档无法保持。影响跨 PR 的长周期任务。 | OPEN；标注 `has repro`；0 评论、0 👍。报告附有日志线索。 |
| **[Remote Control 交互答案无法送达本地 #105055](https://github.com/anthropics/claude-code/issues/105055)** | 从 Android 或 claude.ai/code 提交的 `AskUserQuestion` 回答未到达本地会话，可能使需要用户决策的任务停滞。 | OPEN；**1 评论、0 👍**；已标记 `duplicate`，应关注其关联主 Issue 的后续处理。 |
| **[自托管 GitLab 的 Diff 基线错误 #105064](https://github.com/anthropics/claude-code/issues/105064)** | 用户报告，Remote Control 的 Diff 面板回退到不存在的 `main` 分支，持续显示无变更。涉及非 GitHub 仓库的默认分支识别与审查体验。 | OPEN；**1 评论、0 👍**。标题关联既有问题 #68185，但当前材料未提供解决结论。 |
| **[为非原生支持平台发布 JS bundle #105074](https://github.com/anthropics/claude-code/issues/105074)** | 提议提供“不受官方支持、社区维护”的 JS 产物，覆盖 BSD、illumos、Termux/Android 等环境。报告者称原生二进制分发使部分平台只能停留在旧版本或使用兼容方案。 | OPEN；功能请求；**1 评论、0 👍**。这是分发兼容性提案，并非已公布的支持计划。 |
| **[执行 “push” 前持续扩展任务范围 #105103](https://github.com/anthropics/claude-code/issues/105103)** | 用户报告，模型没有直接推送已完成内容，而是追加分析和验证，反复触发子代理检查并消耗额度。体现了**任务收敛、停止条件与成本可控性**问题。 | OPEN；0 评论、0 👍。目前尚不能推断影响范围。 |
| **[全屏渲染仍发生视口重排 #105058](https://github.com/anthropics/claude-code/issues/105058)** | Linux TUI 用户报告，工具状态行缩短时视口仍会重排。对终端阅读稳定性和长任务监控有直接影响。 | OPEN；**2 评论、0 👍**，为展示样本中评论数最多的 Issue，但讨论规模仍小。 |
| **[Remote Control 仅携带近期历史 #105087](https://github.com/anthropics/claude-code/issues/105087)** | macOS 用户报告，长时间运行的终端会话接入 Desktop 后只显示近期对话，早期记录缺失。影响跨端回溯与对会话完整性的判断；不能据此认定本地历史已丢失。 | OPEN；标注 `has repro`；0 评论、0 👍。 |

## 三、重要 PR 进展

过去 24 小时提供的数据中，**没有更新的 PR**，因此本期无可列出的重要 PR，也无法确认上述问题是否已有对应修复提交。

跟踪入口：[Pull Requests](https://github.com/anthropics/claude-code/pulls)。

## 四、功能需求趋势

以下为展示样本中的需求方向，不代表全部 50 条 Issue 的统计排名。

- **自动化需要可配置的信任边界。** 用户希望受信任的嵌套子会话可免确认启动，并支持自动化轮次调用；同时，权限失效报告说明便利性不能以破坏拒绝规则为代价。  
  相关：[信任会话设置 #105099](https://github.com/anthropics/claude-code/issues/105099)、[权限一致性 #105102](https://github.com/anthropics/claude-code/issues/105102)。

- **上下文管理要更稳定、更省成本。** 需求既包括降低 `/compact` 的 token 成本，也包括避免压缩循环及超大输入导致的不可恢复状态。  
  相关：[逐轮协议块提案 #105092](https://github.com/anthropics/claude-code/issues/105092)、[压缩循环 #105086](https://github.com/anthropics/claude-code/issues/105086)、[超大输入 #105096](https://github.com/anthropics/claude-code/issues/105096)。

- **Remote Control 需要更明确的数据与隐私语义。** 除历史显示完整性外，用户还提出仅中继、不在服务端保留会话记录的模式，并要求启用时给出提示。  
  相关：[仅中继模式 #105082](https://github.com/anthropics/claude-code/issues/105082)、[历史显示问题 #105087](https://github.com/anthropics/claude-code/issues/105087)。

- **配置与工作区状态应更可见。** 用户希望 `--agents` 对忽略或拼错的字段发出警告，并要求 IDE 始终展示当前文件夹，减少静默配置错误和目录混淆。  
  相关：[字段诊断 #105097](https://github.com/anthropics/claude-code/issues/105097)、[当前目录展示 #105100](https://github.com/anthropics/claude-code/issues/105100)。

- **企业环境及长尾平台兼容性仍有缺口。** 需求覆盖非主流操作系统的分发方式，以及内置浏览器对 Microsoft Entra 设备条件访问的兼容。  
  相关：[JS bundle #105074](https://github.com/anthropics/claude-code/issues/105074)、[Entra 设备认证 #105090](https://github.com/anthropics/claude-code/issues/105090)。

## 五、开发者关注点

1. **长任务能否连续运行并恢复。** 压缩失败、循环压缩和自动归档均可能中断工作流；建议持续关注是否出现可验证的复现与恢复路径。  
   参考：[压缩循环 #105086](https://github.com/anthropics/claude-code/issues/105086)、[自动归档 #105084](https://github.com/anthropics/claude-code/issues/105084)。

2. **权限能否跨会话保持一致。** 对 Desktop、交接会话和后台会话，应重点验证拒绝规则及工具开关是否按预期继承，而非仅确认设置界面已保存。  
   参考：[权限失效报告 #105102](https://github.com/anthropics/claude-code/issues/105102)。

3. **代理行为与 token 消耗是否可预测。** 反复追加验证、额外加载工具描述和压缩成本，反映出用户对明确任务终点、工具加载范围及成本透明度的需求。  
   参考：[任务范围扩张 #105103](https://github.com/anthropics/claude-code/issues/105103)、[压缩成本提案 #105092](https://github.com/anthropics/claude-code/issues/105092)。

4. **多端协作不能只做到“连上”。** 交互回答传递、历史展示和 Diff 基线都需要保持一致，才能支撑可靠的远程开发体验。  
   参考：[回答传递 #105055](https://github.com/anthropics/claude-code/issues/105055)、[GitLab Diff #105064](https://github.com/anthropics/claude-code/issues/105064)。

**分析结论：** 今日样本更突出的是既有工作流的可靠性与可控性，而非新功能扩张。由于所有展示 Issue 均为 0 👍、最高仅 2 条评论，应将这些信号视为值得验证的早期反馈，而不是已形成规模的社区共识。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报
**日期：2026-10-26｜数据来源：[openai/codex](https://github.com/openai/codex)**

## 1. 今日速览

过去 24 小时未记录到新 Release，也无 PR 更新；社区讨论主要集中在 **桌面端工具链可靠性、MCP 工具发现，以及 Windows 下的任务与会话一致性**。评论最多的报告是 Codex 在明确承认工作未完成时仍提前结束回合，但仅有 4 条评论，当前反馈仍以分散的问题报告为主，尚不足以判断影响范围。

> **统计口径：**共 50 条 Issue 在窗口内更新，输入仅展示其中评论数最多的 30 条；以下热点与趋势基于这 30 条，不代表完整社区统计。问题描述均为用户报告，未视作官方确认。

## 2. 社区热点 Issues

### 1）任务尚未完成，Codex 却在检查节点结束回合
**[#56951](https://github.com/openai/codex/issues/56951)｜OPEN｜4 条评论**

Windows、CLI `0.164.0` 用户报告：Codex 在 review/checkpoint 等阶段结束回合，同时明确承认仍有未完成工作。  
**为什么重要：**直接影响长任务的执行连续性，开发者可能需要反复催促继续，不能将回合结束等同于任务完成。  
**社区反应：**展示样本中评论最多，但暂无已修复信息。

### 2）Linux VS Code 扩展界面无法启动
**[#56992](https://github.com/openai/codex/issues/56992)｜OPEN｜2 条评论**

报告涉及 `openai.codex-audio v26.1021.22027`，扩展无法启动用户界面。  
**为什么重要：**属于 IDE 工作流的入口阻断问题，优先级高于一般交互缺陷。  
**社区反应：**已有少量讨论；现有摘要不足以确认原因与适用范围。

### 3）macOS 插件入口可见，详情却返回 404
**[#56987](https://github.com/openai/codex/issues/56987)｜OPEN｜2 条评论**

桌面端展示 Finances／Health 安装入口，但详情请求返回 `Plugin not found`；强制刷新目录后仍失败，用户反馈网页版正常。  
**为什么重要：**暴露插件目录展示与实际可用能力之间的不一致，容易造成安装与支持范围误判。  
**社区反应：**诉求集中于隐藏不支持的入口、改善错误提示，以及明确 Health 的桌面支持情况。

### 4）希望在既有聊天中刷新 MCP 连接与工具列表
**[#56970](https://github.com/openai/codex/issues/56970)｜OPEN｜2 条评论**

请求提供可由 agent 调用的操作，在现有 Desktop 聊天中重连 MCP 服务并重新发现工具。  
**为什么重要：**有助于在服务重启、工具配置变化后恢复工作流，降低对新建会话的依赖。  
**社区反应：**已有少量讨论，与其他 MCP 工具缺失报告形成相近需求方向。

### 5）本地 MCP 初始化后取消，既有会话看不到工具
**[#56985](https://github.com/openai/codex/issues/56985)｜OPEN｜1 条评论**

桌面端报告本地 MCP 初始化后被取消，工具未出现在既有会话中。  
**为什么重要：**说明“服务能够初始化”与“会话能够调用工具”可能是不同故障环节，需要更清晰的状态诊断。  
**社区反应：**讨论有限，尚无明确修复结论。

### 6）使用完整 MCP 工具名搜索无结果
**[#56973](https://github.com/openai/codex/issues/56973)｜OPEN｜1 条评论**

`tool_search` 对完整名称 `mcp__<server>__<tool>` 返回空结果。报告称问题观察于 CLI `0.160.0`，相关代码路径在 `rust-v0.164.0` 未变。  
**为什么重要：**即便工具已注册，搜索失败仍可能使 agent 无法发现它；值得关注搜索索引对规范名称的支持。  
**社区反应：**报告提供了客户端索引方向的线索，但仍需验证。

### 7）插件运行时更新可能停止主后端
**[#56950](https://github.com/openai/codex/issues/56950)｜OPEN｜1 条评论**

Windows 用户的 `CODEX_CLI_PATH` 指向 `.plugin-appserver` 时，插件运行时更新器被报告会停止主后端。  
**为什么重要：**涉及自定义配置、插件更新与后端生命周期之间的耦合，可能中断桌面工作流。  
**社区反应：**目前属于特定配置下的个案，不能推断所有 Windows 安装均受影响。

### 8）Windows Computer Use 无法启动 app-server
**[#56978](https://github.com/openai/codex/issues/56978)｜OPEN｜1 条评论**

`@oai/sky` 已初始化，但原生应用枚举调用因 `program not found` 失败，尚未进入应用清单或 UI 控制阶段。  
**为什么重要：**故障发生在 Computer Use 的前置启动链路，排查重点应包括程序发现与启动环境，而非仅检查应用权限。  
**社区反应：**已有初步讨论，暂无确认的解决方案。

### 9）Windows 既有会话回读失败或返回旧回合
**[#56990](https://github.com/openai/codex/issues/56990)｜OPEN｜0 条评论**

用户报告会话回读返回 `systemError` 或旧回合，宿主 `thread/read` 报 `-32600`。  
**为什么重要：**会话状态不准确可能影响后续任务衔接、上下文判断与结果核验。  
**社区反应：**新报告暂无评论；摘要特别区分了安装包版本与实际运行时版本，复现时应保留这一区分。

### 10）历史分页后，`codex doctor` 报告疑似错误的不一致
**[#56963](https://github.com/openai/codex/issues/56963)｜OPEN｜1 条评论**

Windows CLI `0.164.0` 报告 6 条缺失的 active rollout 记录及 6 条陈旧引用，但相关会话与历史仍存在。报告怀疑迁移后仍保留旧的未压缩路径。  
**为什么重要：**诊断工具若误报，可能增加恢复操作与排障成本；应区分索引不一致和实际数据丢失。  
**社区反应：**暂无证据表明这批会话已经丢失，也无明确修复结论。

## 3. 重要 PR 进展

**过去 24 小时内更新的 PR 为 0，无法列出 10 个重要 PR。** 本期没有可据此确认的代码修复、合并或交付进展。

另有两条 Issue 已关闭，可继续关注关闭说明，但**关闭不等于修复已发布**：

- [#56969](https://github.com/openai/codex/issues/56969)：Windows ChatGPT Work 可发现 `codex_app` 工具，但调用因 `callerSource=chatgpt` 被拒绝。
- [#56982](https://github.com/openai/codex/issues/56982)：Windows CLI 中排队粘贴文本并按 Enter 后，文本可能未提交。

## 4. 功能需求趋势

| 方向 | 社区诉求与分析 | 相关 Issue |
|---|---|---|
| **MCP 动态恢复与可观测性** | 不只是接入 MCP，还希望在当前会话内完成重连、工具重新发现，并明确失败发生在哪一层。 | [#56970](https://github.com/openai/codex/issues/56970)、[#56985](https://github.com/openai/codex/issues/56985) |
| **跨产品、跨客户端会话连续性** | 用户希望 ChatGPT 与 Codex 原生双向交接，也需要可靠的项目迁移与会话访问。 | [#56956](https://github.com/openai/codex/issues/56956)、[#56979](https://github.com/openai/codex/issues/56979) |
| **远程项目组织能力** | SSH 项目需要保留项目层级，而非丢失聊天、任务与项目之间的归属关系。 | [#56993](https://github.com/openai/codex/issues/56993) |
| **子任务执行透明度** | 希望查看子任务实际解析出的模型与推理强度，便于调试和结果归因。 | [#56977](https://github.com/openai/codex/issues/56977) |
| **能力展示与运行时一致性** | 插件、浏览器等功能应准确反映当前平台实际支持的能力，避免“入口可见但不可用”。 | [#56987](https://github.com/openai/codex/issues/56987)、[#56958](https://github.com/openai/codex/issues/56958) |

## 5. 开发者关注点

- **任务结束信号需要更可信。** 长任务应明确区分阶段性检查点与最终完成，减少人工续跑与重复核验。参见 [#56951](https://github.com/openai/codex/issues/56951)。
- **排障需要贯通完整调用链。** 当前反馈覆盖扩展 UI、工具发现、app-server 启动和插件更新，单一“连接成功”状态不足以说明功能可用。参见 [#56992](https://github.com/openai/codex/issues/56992)、[#56978](https://github.com/openai/codex/issues/56978)。
- **配置上下文不应被操作提示丢弃。** CLI/TUI 提示硬编码 `codex`，可能让使用 wrapper 的开发者绕过原有 profile。参见 [#56994](https://github.com/openai/codex/issues/56994)。
- **安全拦截需要可操作的说明。** 应用开发被网络安全检查阻断、图片输出仅显示模糊审核类别，都增加了定位与申诉难度；现有报告尚不能证明属于误拦截。参见 [#56988](https://github.com/openai/codex/issues/56988)、[#56986](https://github.com/openai/codex/issues/56986)。
- **状态错误不应轻易等同于数据丢失。** 会话回读、历史索引与账号迁移后的项目展示，需要更准确的诊断信息与恢复指引。参见 [#56990](https://github.com/openai/codex/issues/56990)、[#56963](https://github.com/openai/codex/issues/56963)、[#56968](https://github.com/openai/codex/issues/56968)。

**今日判断：**在本期展示样本中，核心关注点更偏向既有能力的稳定交付，而非新增模型或功能数量；尤其值得持续跟踪 MCP 恢复机制、桌面后端启动链路和会话状态一致性。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报
**日期：2026-10-26｜仓库：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)**

> 统计口径：依据所提供的过去 24 小时数据，共 13 条 Issue、14 条 PR；其中多数条目的更新时间标注为 10 月 25 日。以下状态均以数据快照为准。

## 1. 今日速览

今日首要事件是 **Nightly 发布工作流失败，被标记为 P0**；过去 24 小时没有新 Release。社区开发集中在 Agent 会话隔离、后台任务输出可靠性，以及 Windows 兼容性等修复，多项问题已有对应 PR，但尚未合并。详见 [发布故障 #29949](https://github.com/google-gemini/gemini-cli/issues/29949)、[会话隔离 PR #29946](https://github.com/google-gemini/gemini-cli/pull/29946)。

## 2. 社区热点 Issues

以下 10 项均为 **OPEN**。当前互动量较低：所有 Issue 均为 0 个 👍，因此主要依据影响范围和问题性质排序，而非讨论热度；评论数也不代表维护者已确认问题。

| Issue | 核心问题与重要性 | 社区反应 |
|---|---|---|
| **[ #29949：Nightly 发布失败](https://github.com/google-gemini/gemini-cli/issues/29949)** | 标记为 `priority/p0`、`release-failure`，直接影响夜间构建交付。摘要未提供失败根因，需要跟踪工作流日志与后续处理。 | 2 条评论，为本批次最多。 |
| **[#29943：远程 Agent 会话状态跨会话、端点复用](https://github.com/google-gemini/gemini-cli/issues/29943)** | 据报告，同名 Agent 的 `contextId/taskId` 可能跨独立父会话及不同端点复用，存在上下文串扰风险，影响多 Agent 编排可靠性。 | 0 条评论，待分诊；已有对应 PR。 |
| **[#29930：ACP 丢失 Shell 命令输出](https://github.com/google-gemini/gemini-cli/issues/29930)** | 当命令返回 `AnsiOutput` 时，`tool_call_update.content` 为空，导致 ACP 客户端看不到输出，影响外部客户端集成与执行结果可观测性。 | 1 条评论，机器人已分诊，标记工作量小。 |
| **[#29934：`@file` 移除有意义的空白](https://github.com/google-gemini/gemini-cli/issues/29934)** | 文件首部缩进、空行和尾部空白可能被裁剪，改变 Python 等内容的语义，影响模型接收到的上下文准确性。 | 1 条评论，机器人已分诊；已有对应 PR。 |
| **[#29945：后台输出读取忽略取消信号](https://github.com/google-gemini/gemini-cli/issues/29945)** | 延迟读取不响应 `AbortSignal`，取消后仍继续等待和读取日志，削弱任务中断的及时性。 | 0 条评论，待分诊；已有对应 PR。 |
| **[#29944：超长单行后台日志无输出](https://github.com/google-gemini/gemini-cli/issues/29944)** | 约 70 KB 的单行日志可能被整体丢弃，令长 JSON、压缩日志等输出难以排查。 | 0 条评论，待分诊；已有对应 PR。 |
| **[#29941：计划文件被误判为空](https://github.com/google-gemini/gemini-cli/issues/29941)** | 空文件检查只读取前 1,024 字节；若此前缀全为空白，即使后续存在正文，也可能阻断计划审批。 | 0 条评论，待分诊；已有对应 PR。 |
| **[#29928：模型列表统一显示 8,192 输出 Token](https://github.com/google-gemini/gemini-cli/issues/29928)** | 模型能力展示可能不准确，影响开发者对输出预算和模型选择的判断；这不等同于实际推理上限被限制。 | 1 条评论，机器人已分诊；已有对应 PR。 |
| **[#29938：Windows YAML 预检依赖 Unix 工具](https://github.com/google-gemini/gemini-cli/issues/29938)** | 原生 Windows Shell 缺少 `grep` 等工具，且存在传统编码问题，阻碍本地贡献与预检。 | 0 条评论，待分诊；已有对应 PR。 |
| **[#29939：交互输入框支持 Vim/Vi 模式](https://github.com/google-gemini/gemini-cli/issues/29939)** | 希望支持 Vim 移动与编辑命令，降低重度 Vim/Neovim 用户编辑长提示词的成本。 | 1 条评论，机器人已分诊，标记中等工作量。 |

## 3. 重要 PR 进展

**以下 10 项均处于 OPEN 状态，代表修复提案，不代表已合并或已发布。** 数据未提供有效 PR 评论数，无法据此判断评审活跃度。

| PR | 功能或修复内容 |
|---|---|
| **[#29946：隔离远程 Agent 对话状态](https://github.com/google-gemini/gemini-cli/pull/29946)** | 按父会话、端点等维度隔离会话标识，避免独立会话和同名远程 Agent 复用上下文。对应 #29943。 |
| **[#29948：后台输出读取响应取消](https://github.com/google-gemini/gemini-cli/pull/29948)** | 复用支持取消的延迟辅助函数，避免取消后仍等待完整延迟并继续读取日志。对应 #29945。 |
| **[#29947：保留超长日志尾部](https://github.com/google-gemini/gemini-cli/pull/29947)** | 当单行超过 64 KB 尾部窗口时，保留可用的部分行内容，避免结果完全为空。对应 #29944。 |
| **[#29942：完整检查计划文件内容](https://github.com/google-gemini/gemini-cli/pull/29942)** | 修复仅采样前 1 KB 导致的空文件误判，并将读取失败与内容为空区分报告。对应 #29941。 |
| **[#29935：保留引用文件中的空白](https://github.com/google-gemini/gemini-cli/pull/29935)** | 移除额外的 `.trim()`，保留 `@file` 内容中的缩进、首尾空行及末尾换行。对应 #29934。 |
| **[#29929：准确展示模型输出上限](https://github.com/google-gemini/gemini-cli/pull/29929)** | 为 Gemini 2.5 Pro、Flash 展示文档所述的 65,536 输出 Token 上限；未知上限不再使用误导性的 8,192 默认值。 |
| **[#29940：移除 YAML 检查的 Unix 管道依赖](https://github.com/google-gemini/gemini-cli/pull/29940)** | 调整 YAML 文件枚举和检查流程，处理原生 Windows 下的工具依赖与编码兼容问题。对应 #29938。 |
| **[#29931：扩展 Windows 主目录相对路径](https://github.com/google-gemini/gemini-cli/pull/29931)** | 支持 `~\policies\custom.toml` 等路径，覆盖自定义策略和本地扩展注册表路径。与 [#29923](https://github.com/google-gemini/gemini-cli/pull/29923) 存在修复范围重叠。 |
| **[#29924：会话预览保留 Unicode](https://github.com/google-gemini/gemini-cli/pull/29924)** | 在清理不安全终端序列的同时保留非 ASCII 文本，避免中文、阿拉伯文等提示词预览丢失。 |
| **[#29922：识别 TortoiseGitPlink](https://github.com/google-gemini/gemini-cli/pull/29922)** | 将其识别为 PuTTY 系列客户端，使用 `-batch`，避免错误追加 OpenSSH 参数。与 [#29921](https://github.com/google-gemini/gemini-cli/pull/29921) 主题重叠。 |

## 4. 功能需求趋势

- **Agent 可靠性与状态边界成为主要修复方向。** 会话隔离、取消传播、日志保留和计划校验共同指向复杂任务执行中的正确性，而非新增 Agent 能力。参考 [#29943](https://github.com/google-gemini/gemini-cli/issues/29943)、[#29945](https://github.com/google-gemini/gemini-cli/issues/29945)。
- **上下文输入与工具输出需要无损传递。** `@file` 空白裁剪和 ACP 输出缺失，分别暴露输入端与输出端的信息损失问题。参考 [#29934](https://github.com/google-gemini/gemini-cli/issues/29934)、[#29930](https://github.com/google-gemini/gemini-cli/issues/29930)。
- **终端编辑体验仍有明确功能诉求。** Vim/Vi 模式是本批次较直接的新增功能需求，主要服务高频终端用户。参考 [#29939](https://github.com/google-gemini/gemini-cli/issues/29939)。
- **能力展示与文档语义需要更准确。** 模型输出上限、MCP 调用示例，以及 checkpointing 与会话管理的区别，都影响用户对 CLI 能力的理解。参考 [#29928](https://github.com/google-gemini/gemini-cli/issues/29928)、[#29937](https://github.com/google-gemini/gemini-cli/issues/29937)。
- **跨平台贡献流程仍有阻碍。** Windows 原生环境的预检失败说明，开发工具链尚需减少对 Unix 环境的隐式假设。参考 [#29938](https://github.com/google-gemini/gemini-cli/issues/29938)。

## 5. 开发者关注点

1. **优先防止静默丢失信息。** 文件缩进被裁剪、ACP 命令输出为空、超长日志被丢弃，比显式报错更难发现，应重点覆盖边界回归测试。参考 [#29934](https://github.com/google-gemini/gemini-cli/issues/29934)、[#29944](https://github.com/google-gemini/gemini-cli/issues/29944)。
2. **取消和会话隔离应成为执行契约。** 取消后继续读取、独立任务复用上下文，会降低 Agent 工作流的可控性。参考 [#29945](https://github.com/google-gemini/gemini-cli/issues/29945)、[#29943](https://github.com/google-gemini/gemini-cli/issues/29943)。
3. **Windows 与多语言体验需要持续验证。** 路径展开、SSH 客户端识别和 Unicode 预览都有修复提案，体现跨平台与国际化边界仍需完善。参考 [#29931](https://github.com/google-gemini/gemini-cli/pull/29931)、[#29922](https://github.com/google-gemini/gemini-cli/pull/29922)、[#29924](https://github.com/google-gemini/gemini-cli/pull/29924)。
4. **近期跟踪重点是发布恢复与补丁落地。** 优先确认 Nightly 故障根因；相关修复仍开放，使用者不宜据此假定当前版本已解决问题。参考 [#29949](https://github.com/google-gemini/gemini-cli/issues/29949)、[#29946](https://github.com/google-gemini/gemini-cli/pull/29946)。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报
**日期：2026-10-26**  
**仓库：[github/copilot-cli](https://github.com/github/copilot-cli)**

## 1. 今日速览

本期反馈主要集中在 **CLI 1.0.103 长会话稳定性**：有用户报告会话锁超时、任务界面无响应，以及长时间并行 Agent 会话内存增长至约 37 GiB。另有用户关注固定上下文开销，以及 macOS 下 Entra 认证的远程 MCP 服务启动失败；过去 24 小时无新版本、无 PR 更新。

> 数据口径：按所提供的过去 24 小时数据汇总，Issue 更新时间均标注为 2026-10-25。共 5 条 Issue 记录，其中两条需求标题与摘要相同；以下全部列出，不补足至 10 条。

## 2. 社区热点 Issues

### ① 长会话出现锁超时，任务刷新失败
**[#5253](https://github.com/github/copilot-cli/issues/5253) · OPEN · triage · 2 条评论 / 0 👍**

- **问题**：CLI 1.0.103 长时间运行后，任务打开或刷新报错 `session lock unavailable`；进程仍存活，部分嵌套工具活动继续执行，但交互大幅失去响应。标题同时提及宿主事件确认失败。
- **为什么重要**：影响长任务的可观察性和可操作性，可能出现“后台仍在执行、前台无法有效控制”的状态。
- **社区反应**：是本批数据中唯一有评论的 Issue，但摘要未提供评论内容，尚无法判断是否已复现或定位。

### ② 并行 Agent 长会话主进程内存升至约 37 GiB
**[#5254](https://github.com/github/copilot-cli/issues/5254) · OPEN · triage · 0 条评论 / 0 👍**

- **问题**：在 32 GiB Apple Silicon Mac 上，恢复后的 CLI 1.0.103 会话运行约 6 小时 19 分钟，主进程物理内存占用达到 **37.3 GiB**，峰值 **37.6 GiB**，并间歇性无响应。报告标题还列出约 1.33 亿次 malloc 分配及 10.7 GiB 内存碎片。
- **为什么重要**：提示长时间并行 Agent 工作流存在显著内存压力，值得优先排查内存保留、分配行为与碎片化问题；目前不能据此直接判定为内存泄漏。
- **社区反应**：暂无评论。与 #5253 来自同一报告者、涉及同一版本，但现有信息不足以确认两者存在共同根因。

### ③ 降低会话固定上下文，按需加载工具与提示词
**[#5251](https://github.com/github/copilot-cli/issues/5251) · OPEN · triage · 0 条评论 / 0 👍**

- **需求**：采用自适应、去重的工具定义与提示词加载方式，减少首条用户消息前注入的固定上下文。
- **为什么重要**：关系到上下文预算利用率，以及潜在的处理开销。报告引用的约 **40k tokens** 来自可比的 Copilot App 会话，不能直接视为 CLI 的实测值。
- **社区反应**：暂无评论或点赞，目前属于单个用户提出的效率优化需求。

### ④ 同名上下文优化需求已关闭
**[#5252](https://github.com/github/copilot-cli/issues/5252) · CLOSED · 0 条评论 / 0 👍**

- **内容**：标题与摘要均与 #5251 相同。
- **为什么重要**：跟踪此需求时，应优先关注仍开放的 #5251，避免将相同诉求重复计算为独立热点。
- **社区反应**：已关闭，但所给数据未说明关闭原因，不能据此认定需求已实现或被拒绝。

### ⑤ macOS 下 Entra 认证的 MCP 服务启动失败
**[#5250](https://github.com/github/copilot-cli/issues/5250) · OPEN · authentication / mcp · 0 条评论 / 0 👍**

- **问题**：Azure DevOps remote MCP 与 WorkIQ 在会话启动时连接失败，涉及原生 Entra account broker 路径；报告指出并发登录被拒绝，提示“sign-in is already in progress”，以及缓存令牌被拒后未能恢复。
- **为什么重要**：影响企业开发者同时接入多个受 Entra 保护的远程 MCP 服务，暴露出认证并发协调与令牌失效恢复方面的问题。
- **社区反应**：暂无评论或点赞，尚无所提供数据可确认修复进展。

## 3. 重要 PR 进展

过去 24 小时内**无 PR 更新记录**，因此本期没有可列出的重要 PR，也无法从这些数据确认上述问题是否已有对应修复。  
[查看仓库 PR 列表](https://github.com/github/copilot-cli/pulls)

## 4. 功能需求趋势

本期样本较小，以下为反馈方向，不代表全社区热度排名：

| 方向 | 需求与信号 | 关联 Issue |
|---|---|---|
| **长会话稳定性与资源治理** | 降低内存增长、避免会话锁长时间不可用，保障并行 Agent 工作流持续运行 | [#5253](https://github.com/github/copilot-cli/issues/5253)、[#5254](https://github.com/github/copilot-cli/issues/5254) |
| **上下文加载精细化** | 从固定注入转向按需、去重加载工具定义和静态提示词 | [#5251](https://github.com/github/copilot-cli/issues/5251)、[#5252](https://github.com/github/copilot-cli/issues/5252) |
| **企业 MCP 认证可靠性** | 协调多服务并发登录，并在缓存令牌失效后提供恢复路径 | [#5250](https://github.com/github/copilot-cli/issues/5250) |

## 5. 开发者关注点

- **持续运行是否可靠**：相比短时交互，数小时运行、恢复会话与并行 Agent 场景更需要关注资源占用和交互可用性。[#5253](https://github.com/github/copilot-cli/issues/5253) · [#5254](https://github.com/github/copilot-cli/issues/5254)
- **上下文预算是否被有效利用**：用户希望减少静态工具定义和提示词对会话上下文的固定占用。[#5251](https://github.com/github/copilot-cli/issues/5251)
- **企业集成能否自动恢复**：多 MCP 服务接入不仅需要首次认证成功，也需要正确处理并发登录和缓存凭据失效。[#5250](https://github.com/github/copilot-cli/issues/5250)

**分析结论**：本期最值得优先跟踪的是长会话稳定性，其次是企业 MCP 认证可靠性。当前仅 #5253 有 2 条评论，其余均无评论、所有条目均无点赞；这些反馈是值得验证的风险信号，尚不足以判断影响范围或形成社区共识。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报
**日期：2026-10-26｜仓库：[anomalyco/opencode](https://github.com/anomalyco/opencode)**

## 一、今日速览

免费额度异常是本期最集中的用户反馈：多位用户报告首次请求即触限、倒计时结束后重新计时，另有桌面端受限但 CLI 可用的个案。[相关 Issue](https://github.com/anomalyco/opencode/issues/59026)

开发侧重点集中在长会话与图片负载优化，包括媒体按需加载、减少请求体复制，以及降低每步历史处理开销；模型参数兼容和 MCP OAuth 并发取消也已有对应修复 PR，但仍处于开放状态。[性能 PR](https://github.com/anomalyco/opencode/pull/59091) · [模型兼容 PR](https://github.com/anomalyco/opencode/pull/59122)

> **数据口径：**过去 24 小时共有 50 条 Issue、50 条 PR 更新，本日报依据提供的 30 条 Issue、20 条 PR 摘要筛选。期间无新 Release，故省略版本发布章节；PR 评论数未提供，`CLOSED` 不等同于已合并或已发布。

## 二、社区热点 Issues

| Issue | 核心问题与关注价值 | 社区反应与状态 |
|---|---|---|
| **[ #59026 免费额度过早耗尽](https://github.com/anomalyco/opencode/issues/59026)** | 用户称当天首次或仅发送一两条消息后即触限，直接影响免费模型的基本可用性。 | **5 条评论**，为展示样本中最高；仍开放，标记 `triaging`、`pending close`。 |
| **[ #59038 额度倒计时归零后重启](https://github.com/anomalyco/opencode/issues/59038)** | 等待倒计时结束仍无法恢复使用，暴露出重试提示与实际恢复时间不一致的问题。 | **4 条评论**；另有 [#59118](https://github.com/anomalyco/opencode/issues/59118)、[#59116](https://github.com/anomalyco/opencode/issues/59116) 报告相似现象，但尚不能确定根因相同。 |
| **[ #59112 桌面端触限、CLI 可用](https://github.com/anomalyco/opencode/issues/59112)** | 同一用户报告不同客户端表现不一致，为排查额度问题提供了重要线索。 | **1 条评论**；报告者也对模板化回复表达不满，仍待分诊。不能据此认定 CLI 对所有用户都可绕过问题。 |
| **[ #59051 子代理成功但父代理收到空结果](https://github.com/anomalyco/opencode/issues/59051)** | v2.1.4 中，子会话记录成功且产生真实 Token 消耗，父代理却收到空响应，影响多代理任务的可靠交付。 | **3 条评论**，标记 `triaging`；尚无提供的数据表明已修复。 |
| **[ #59034 TUI 消息被提交到其他会话](https://github.com/anomalyco/opencode/issues/59034)** | 用户称输入内容延迟发送到另一会话，且缺乏提交日志。若属实，将影响会话隔离、操作可追溯性与用户信任。 | **2 条评论**，仍开放；值得优先复现和补充诊断日志。 |
| **[ #59080 Provider 禁用策略未生效](https://github.com/anomalyco/opencode/issues/59080)** | 报告称 `provider.use` 的 `deny` 策略无法阻止供应商被选择和调用，而 `tool.use` 禁用正常，涉及治理与合规边界。 | **1 条评论**；仍开放，当前是用户报告，尚未标记已复现。 |
| **[ #59115 旧版 MCP 配置丢失 `codemode: false`](https://github.com/anomalyco/opencode/issues/59115)** | 配置迁移静默丢弃开关，使服务器继续被 Code Mode 包装，影响升级兼容性及配置行为的可预测性。 | **2 条评论**，已标记 **`reproduced`**。 |
| **[ #59119 版本化 GPT Chat 模型收到推理参数](https://github.com/anomalyco/opencode/issues/59119)** | `gpt-5.2-chat` 等非推理模型 ID 未被排除在推理默认值之外，请求被附加 `reasoning_effort: "medium"`。 | **1 条评论**，已复现；已有开放修复 [PR #59122](https://github.com/anomalyco/opencode/pull/59122)。 |
| **[ #59110 推理 Token 挤占摘要预算](https://github.com/anomalyco/opencode/issues/59110)** | `/compact` 的摘要输出预算同时被推理 Token 消耗，导致即使对话未超上下文窗口，也可能触发输出上限错误。 | **1 条评论**，已标记 **`reproduced`**；对长会话和推理模型用户尤其重要。 |
| **[ #59106 链接预览提前消耗设备配对码](https://github.com/anomalyco/opencode/issues/59106)** | 一次性配对链接被聊天软件预览请求提前兑换，接收者实际打开时失效，影响跨设备连接体验。 | **1 条评论**，已标记 **`reproduced`**；需要区分预览访问与真实确认操作。 |

## 三、重要 PR 进展

以下 10 项兼顾修复价值、性能影响与协议能力；**开放 PR 均不代表功能已经可用**。

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| **[ #59122 版本化 Chat 模型参数修复](https://github.com/anomalyco/opencode/pull/59122)** | OPEN | 避免向版本化非推理 Chat 模型注入 GPT-5 推理默认参数，对应 Issue #59119。 |
| **[ #59114 MCP OAuth 独立取消](https://github.com/anomalyco/opencode/pull/59114)** | OPEN | 保留同一 Token 刷新的请求合并机制，同时让各调用方保有独立取消语义，修复共享刷新中的取消传播问题。 |
| **[ #59103 服务端媒体按需读取](https://github.com/anomalyco/opencode/pull/59103)** | OPEN | 新增实验性媒体读取接口和 `experimental-media-uri` 能力，使客户端可请求媒体引用而非内联 Base64；需双方显式启用。 |
| **[ #59104 桌面/Web 接入媒体引用](https://github.com/anomalyco/opencode/pull/59104)** | OPEN | 配合服务端能力使用 `media:<hash>` 引用和按需缓存，减少长会话加载时重复传输图片，并保持草稿媒体字节在本地。 |
| **[ #59102 发布 MCP 工具进度通知](https://github.com/anomalyco/opencode/pull/59102)** | OPEN | 补齐核心层工具进度通知发布，提升长时间工具调用的可观测性；**不包含 TUI 工具卡片的进度渲染**。 |
| **[ #59091 每步只加载一次历史](https://github.com/anomalyco/opencode/pull/59091)** | OPEN | 减少重复 Prompt 计量、图片 Base64 扫描和整段历史解码，针对随会话长度增长的处理开销。 |
| **[ #59101 客户端可丢弃工具图片载荷](https://github.com/anomalyco/opencode/pull/59101)** | CLOSED | 回移相关改动，允许客户端不在 Store 中保留工具结果图片，缓解截图密集型会话的内存占用。 |
| **[ #59098 缩短请求 Hook 事件存活时间](https://github.com/anomalyco/opencode/pull/59098)** | CLOSED | 避免仍在执行的工具持续持有包含完整消息、截图的 Hook 事件，减少大对象滞留。 |
| **[ #59097 未改动请求避免复制请求体](https://github.com/anomalyco/opencode/pull/59097)** | CLOSED | 针对注册 `http.request` Hook 的场景，避免对未修改请求重新读取并复制完整请求体，降低内存压力。 |
| **[ #59105 Windows 服务文件写入修复](https://github.com/anomalyco/opencode/pull/59105)** | CLOSED | 回移服务文件修复，处理并发写入共用临时文件的问题，并为 Windows 文件重命名增加重试。 |

## 四、功能需求趋势

以下为展示样本中的方向性信号，不代表全部 50 条 Issue 的完整排名。

- **移动端成为独立使用场景。** 社区希望 Web/PWA 提供真正适配手机的交互结构，而非压缩桌面标签页布局。[#59069](https://github.com/anomalyco/opencode/issues/59069)
- **插件扩展需要更明确的生命周期控制。** 用户提出在会话回退提交前增加可等待的插件 Hook，反映插件对关键操作时序的控制需求。[#59079](https://github.com/anomalyco/opencode/issues/59079)
- **搜索工具需要更强的表达能力。** `grep` 被要求提供可选 PCRE2，以支持前后向断言与反向引用，覆盖复杂代码搜索场景。[#59078](https://github.com/anomalyco/opencode/issues/59078)
- **长会话需要更稳健的压缩与错误恢复。** 推理 Token 预算分配、HTTP 413 的错误分类及自动压缩触发，都是维持长任务连续性的关键。[#59110](https://github.com/anomalyco/opencode/issues/59110) · [#59067](https://github.com/anomalyco/opencode/issues/59067)
- **额度与多客户端状态需要更透明。** 用户不仅需要知道何时恢复，还希望多个 TUI 实例显示一致的套餐用量；当前反馈指向信息一致性和解释能力不足。[#59021](https://github.com/anomalyco/opencode/issues/59021) · [#59062](https://github.com/anomalyco/opencode/issues/59062)

## 五、开发者关注点

1. **优先建立可信的额度提示。** 当前痛点是“提示恢复时间到了却仍不可用”，而不仅是额度不足。建议排查时同时记录客户端类型、模型、账号状态和重试时间，避免将不同原因混为同一问题。[#59038](https://github.com/anomalyco/opencode/issues/59038) · [#59112](https://github.com/anomalyco/opencode/issues/59112)

2. **任务结果与会话路由需要可追溯。** 子代理空结果、消息进入错误会话都直接影响开发者对执行结果的信任；请求提交、会话目标和子任务输出应具备清晰的关联记录。[#59051](https://github.com/anomalyco/opencode/issues/59051) · [#59034](https://github.com/anomalyco/opencode/issues/59034)

3. **配置“静默失效”风险高于显式报错。** MCP 迁移丢弃字段、Provider 禁用策略不生效，都要求更明确的配置诊断和行为验证，尤其是在升级与组织治理场景中。[#59115](https://github.com/anomalyco/opencode/issues/59115) · [#59080](https://github.com/anomalyco/opencode/issues/59080)

4. **性能优化正在覆盖图片数据的完整处理流程。** 本期 PR 不只优化界面加载，还涉及媒体传输、客户端存储、Hook 对象生命周期与历史重复处理；截图密集、浏览器自动化和长会话场景值得重点回归测试。[#59103](https://github.com/anomalyco/opencode/pull/59103) · [#59098](https://github.com/anomalyco/opencode/pull/59098) · [#59091](https://github.com/anomalyco/opencode/pull/59091)

**总体判断：**本期最迫切的是恢复用户对额度与会话执行的可预测性；工程侧则正在集中降低长会话、尤其是多图片会话的资源成本。相关改动是否已合并、何时进入正式版本，仍需后续发布信息确认。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-10-26

> 数据口径：基于提供的过去 24 小时更新记录。来源标注为 `badlogic/pi-mono`，但条目指向 `earendil-works/pi`，以下链接按条目所示仓库生成。所有条目均标记为 **CLOSED**；关闭不等于已修复或合并，数据未提供最终处理说明。

## 1. 今日速览

今日未有新版本发布，社区更新涉及 **16 个 Issue、7 个 PR**，重点集中在自定义模型接入、扩展控制能力和跨平台兼容性。包含 `/` 的 provider ID 导致模型解析失败的问题出现两份相关 PR，另有全屏图片显示、Windows 路径和 npm 符号链接处理等修复提案；扩展开发者则持续要求更细粒度地控制检索偏好、技能发现和上下文压缩。

## 2. 社区热点 Issues

以下精选 10 项。所有 Issue 均为已关闭、👍 为 0；评论数仅能反映有限互动，不能据此判断社区共识或关闭原因。

| Issue | 核心问题与重要性 | 社区反应 / 状态 |
|---|---|---|
| [#11394 provider ID 含 `/` 时模型找不到](https://github.com/earendil-works/pi/issues/11394) | `--model "<provider>/<model-id>"` 无法正确处理 URL 派生的 provider ID，影响 `pi-llama-cpp` 等本地模型接入方式。 | 2 条评论；标记 `fix-available`、`no-action`，另有两份相关 PR，值得优先跟踪实际修复落点。 |
| [#11398 独立 CR 导致 grep 上下文错位](https://github.com/earendil-works/pi/issues/11398) | 文件含独立回车符时，开启上下文可能让正确行号对应错误文本，并丢失后续上下文，直接影响 Agent 检索依据的可靠性。 | 2 条评论；标记 `bug`、`untriaged`，未提供修复结论。 |
| [#11389 工具参数字符串化导致校验失败](https://github.com/earendil-works/pi/issues/11389) | 报告称 `mimo-v2.6-flash` 将工具参数全部返回为字符串，而验证器不转换字符串化数组、对象或 `"null"`，造成 `read` 等工具反复失败。 | 2 条评论；标记 `no-action`。反映模型端输出与工具 schema 之间的兼容边界。 |
| [#11388 HTTP idle timeout 疑似变成总请求期限](https://github.com/earendil-works/pi/issues/11388) | 用户反馈 `httpIdleTimeoutMs` 的实际行为与文档中的“空闲超时”不一致；若属实，长时间持续输出也可能被中断。 | 2 条评论；标记 `no-action`，仅凭摘要无法确认具体成因。 |
| [#11387 声明上下文窗口过大导致反复溢出](https://github.com/earendil-works/pi/issues/11387) | 自定义 vLLM 配置声明 100 万 token，但服务实际限制为 57,344，导致恢复压缩后仍再次溢出。凸显模型元数据与服务端限制一致性的重要性。 | 2 条评论；标记 `no-action`。使用本地推理服务的开发者应重点自查。 |
| [#11409 扩展更新触发无法清理的 npm 审计提示](https://github.com/earendil-works/pi/issues/11409) | 扩展安装未传入 `--no-audit`；报告称按照提示执行 `npm audit fix`，还可能在扩展目录安装第二份 Pi，增加环境混乱风险。 | 1 条评论；标记 `bug`、`untriaged`。这不等于已确认存在可利用漏洞。 |
| [#11410 持久化索引检索偏好的推荐扩展模式](https://github.com/earendil-works/pi/issues/11410) | 开发者希望明确如何在整个会话中优先使用索引式代码检索，以及是否应通过 `before_agent_start.systemPromptOptions` 注入规则。关系到检索扩展的稳定集成方式。 | 2 条评论；标记 `untriaged`，数据中没有最终推荐方案。 |
| [#11407 技能发现顺序与自动扫描开关](https://github.com/earendil-works/pi/issues/11407) | 请求为 `resources_discover` 提供排序能力，或禁用 `~/.agents/skills`、祖先目录技能发现，以落实“项目 → 空间 → 基础”的确定性优先级。 | 1 条评论；标记 `untriaged`。需求明确指向宿主应用无需修改 SDK 的配置能力。 |
| [#11406 压缩前钩子支持自定义摘要指令](https://github.com/earendil-works/pi/issues/11406) | 希望 `session_before_compact` 接受 `{ customInstructions }`，让扩展引导默认摘要器，而不必接管完整摘要生成。 | 1 条评论；标记 `untriaged`。体现扩展作者对轻量干预接口的需求。 |
| [#11400 登录后仍看不到 Kimi k3.1](https://github.com/earendil-works/pi/issues/11400) | 用户反馈模型选择器列出其他 Kimi 型号，但缺少目标型号，涉及模型目录、登录状态与实际可用模型之间的一致性。 | 1 条评论；标记 `bug`、`untriaged`，原因及处理结果未知。 |

## 3. 重要 PR 进展

**本期仅提供 7 个 PR，因此全部列出，不补足至 10 个。** 所有 PR 均显示已关闭，但未提供合并状态；评论字段缺失，不能视为零评论。

| PR | 功能或修复内容 | 开发者价值 |
|---|---|---|
| [#11411 全屏模式保留 iTerm2 内联图片](https://github.com/earendil-works/pi/pull/11411) | 提议在 alternate screen 激活时仍保留检测到的 iTerm2 图片协议能力，避免工具图片结果退化为 `[Image: ...]` 文本。 | 改善全屏终端中的多模态结果展示。 |
| [#11397 修复含斜杠的 provider/id 解析](https://github.com/earendil-works/pi/pull/11397) | 针对 `splitProviderPrefix()` 按首个 `/` 拆分造成 URL 型 provider ID 被截断的问题调整解析。 | 直接对应 [#11394](https://github.com/earendil-works/pi/issues/11394)，改善本地及自定义端点接入。 |
| [#11393 含 `/` 的 provider ID 模型引用修复](https://github.com/earendil-works/pi/pull/11393) | 同样处理 `--model "<provider>/<model-id>"` 在 provider ID 含 `/` 时失效的问题。 | 与 #11397 目标重叠，应核实最终采用方案，不能计为两项独立修复成果。 |
| [#11396 npm prefix 使用符号链接的真实路径](https://github.com/earendil-works/pi/pull/11396) | agent 目录经符号链接访问时，为 npm 安装、卸载传入真实路径，避免生成异常的 lock 路径。 | 改善 dotfiles 仓库等符号链接配置下的包管理可靠性。 |
| [#11399 Windows 入口依赖图检查路径规范化](https://github.com/earendil-works/pi/pull/11399) | 将 `path.relative()` 生成的 Windows 反斜杠路径规范化，使其与使用 `/` 的允许、禁止规则匹配。 | 提升 Windows 开发环境与检查脚本的一致性。 |
| [#11395 `--no-env` 清除全部支持的 provider 环境变量](https://github.com/earendil-works/pi/pull/11395) | 补齐 `pi-test.sh --no-env` 的清理范围，涵盖遗漏的 API key 和认证变量。 | 避免测试意外使用真实凭据或连接非预期 provider，提高环境隔离与可复现性。 |
| [#11408 添加源码学习路线与规范](https://github.com/earendil-works/pi/pull/11408) | 标题显示为源码学习与规范文档贡献；未提供正文摘要。 | 有助于贡献者入门，但无法据现有数据评估具体覆盖范围。 |

## 4. 功能需求趋势

### 扩展 API：从“可扩展”走向“可精细控制”
检索工具偏好、压缩摘要指令和 thinking 可见性控制，都要求在保留默认行为的前提下提供更小粒度的钩子，而非迫使扩展接管整套流程。  
相关：[#11410](https://github.com/earendil-works/pi/issues/11410)、[#11406](https://github.com/earendil-works/pi/issues/11406)、[#11401](https://github.com/earendil-works/pi/issues/11401)。

### 资源作用域与优先级需要更明确
技能发现希望具备排序和扫描开关，MCP 则出现“仅当前会话启用”的需求。共同方向是减少全局配置副作用，让资源加载更可预测。  
相关：[#11407](https://github.com/earendil-works/pi/issues/11407)、[#11390](https://github.com/earendil-works/pi/issues/11390)。

### 自定义模型接入的兼容性仍是重点
模型标识解析、工具参数类型、上下文窗口和型号可见性分别暴露不同接入边界，说明仅提供 OpenAI-compatible 接口并不足以保证完整兼容。  
相关：[#11394](https://github.com/earendil-works/pi/issues/11394)、[#11389](https://github.com/earendil-works/pi/issues/11389)、[#11387](https://github.com/earendil-works/pi/issues/11387)、[#11400](https://github.com/earendil-works/pi/issues/11400)。

### 终端体验聚焦信息密度与展示一致性
全屏编辑器附近的空行、隐藏 thinking 后仍保留的间距，以及内联图片回退，均指向终端空间利用和展示状态的一致性。  
相关：[#11403](https://github.com/earendil-works/pi/issues/11403)、[#11402](https://github.com/earendil-works/pi/issues/11402)、[PR #11411](https://github.com/earendil-works/pi/pull/11411)。

## 5. 开发者关注点

- **配置必须与真实服务能力一致。** 接入本地或自定义模型时，优先核对 `contextWindow`、工具参数格式及模型引用方式，避免将配置问题误判为 Agent 推理问题。参考：[#11387](https://github.com/earendil-works/pi/issues/11387)、[#11389](https://github.com/earendil-works/pi/issues/11389)。
- **文档语义与运行行为需要可验证。** 超时究竟按空闲还是总时长计算、扩展如何持续影响检索策略，都会影响长任务稳定性。参考：[#11388](https://github.com/earendil-works/pi/issues/11388)、[#11410](https://github.com/earendil-works/pi/issues/11410)。
- **包管理提示不应诱导高风险操作。** 对扩展目录执行 `npm audit fix` 前，应先确认安装树和影响范围；本期报告提示其可能产生额外 Pi 副本。参考：[#11409](https://github.com/earendil-works/pi/issues/11409)。
- **升级判断应以合并及发布记录为准。** 本期没有新 Release，关闭的修复 PR 不能直接视为已进入可安装版本。建议重点跟踪 provider ID 解析和全屏图片显示的后续发布记录。参考：[PR #11397](https://github.com/earendil-works/pi/pull/11397)、[PR #11411](https://github.com/earendil-works/pi/pull/11411)。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报｜2026-10-26

> 数据来源：[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) 过去 24 小时更新快照，共 34 条 Issues、50 条 PR；本文依据所展示的 30 条 Issues、20 条 PR 及 Release 摘要整理。PR 的 `CLOSED` 状态不等同于已合并，以下不将其视为已发布功能。

## 1. 今日速览

今天的主线是 **v0.26.1 发布链路稳定性与长任务可靠性**：SDK 发布被集成测试超时阻塞，Managed Runtime 发布也遇到预检失败；模型兼容、循环提醒和 Hook 去重问题均已有对应修复 PR，但仍处于开放状态。[SDK 发布问题](https://github.com/QwenLM/qwen-code/issues/15498) · [Runtime 发布问题](https://github.com/QwenLM/qwen-code/issues/15499)

功能侧，nightly 加入会话权限规则与 Auto approval；Managed Agent、后台自动修复及会话持久化继续推进，显示项目正强化无人值守与托管运行能力。[权限更新](https://github.com/QwenLM/qwen-code/pull/15448) · [后台自动修复](https://github.com/QwenLM/qwen-code/pull/15578)

## 2. 版本发布

### [v0.26.1-nightly.20261025.8e28d5380c](https://github.com/QwenLM/qwen-code/releases/tag/v0.26.1-nightly.20261025.8e28d5380c)

- **Managed 会话权限增强**：加入 session permission rules 与 Auto approval，为托管会话提供更多权限配置能力。对应 [PR #15448](https://github.com/QwenLM/qwen-code/pull/15448)。
- **CLI serve token 加固**：发布摘要列出 `fix(cli): harden serve token`，但未提供具体修复细节，不宜据此推断漏洞范围或安全影响。

**升级提示：**该版本为 nightly；CLI、SDK 与 Managed Runtime 的发布状态应分别核验，不能因 CLI 已发布就假定配套包同步可用。[SDK #15498](https://github.com/QwenLM/qwen-code/issues/15498) · [Runtime #15499](https://github.com/QwenLM/qwen-code/issues/15499)

## 3. 社区热点 Issues

以下综合优先级、影响范围、讨论量及是否已有修复路径，选取 10 项。所展示 Issues 的 👍 均为 0，社区反应主要参考评论数，不代表支持票数。

| Issue | 核心问题与重要性 | 社区反应 / 当前进展 |
|---|---|---|
| **[#15498：SDK 0.1.23 发布阻塞](https://github.com/QwenLM/qwen-code/issues/15498)** | **P1**。CLI v0.26.1 触发的 SDK 发布流程在集成测试阶段运行约六小时后被取消，目标包未执行发布，影响 SDK 用户获取配套版本。 | **11 条评论，为展示列表最高**；仍开放。另有发布门禁改造提案。 |
| **[#15542：Anthropic JSON 辅助查询返回 400](https://github.com/QwenLM/qwen-code/issues/15542)** | **P1**。报告称 Sonnet 5.5 / Opus 5.5 不支持请求中的强制 `tool_choice`，导致 JSON 辅助查询失败。 | **3 条评论**；修复 PR #15558 已提交，尚未合并。 |
| **[#15499：Managed Runtime 发布预检失败](https://github.com/QwenLM/qwen-code/issues/15499)** | **P2**。v0.26.1 对应运行时发布停在 immutable-publication preflight，说明配套运行时发布仍有独立阻塞。 | **4 条评论**；标记 `ready-for-human`，仍待处理。 |
| **[#15552：内存快照破坏 Hook 上下文去重](https://github.com/QwenLM/qwen-code/issues/15552)** | **P2**。追加 memory catalog snapshot 后，原本依赖消息尾部 receipt 的去重识别可能失效，存在重复注入上下文的风险。 | **5 条评论**；PR #15556 针对该场景修复，仍开放。 |
| **[#15576：一次性 loop_wakeup 静默失效](https://github.com/QwenLM/qwen-code/issues/15576)** | **P2**。Desktop daemon / Web Shell 场景中，定时唤醒未触发、没有报错，会话持续等待，直接影响无人值守任务。 | **3 条评论**；标记 `need-information`，复现范围与原因仍需确认。 |
| **[#15526：循环警告只发送一次](https://github.com/QwenLM/qwen-code/issues/15526)** | **P2**。用户报告同一文件被相同参数读取 70 次，其中 59 次发生在首次提醒之后，暴露长任务循环保护不足。 | **3 条评论**；仍需讨论。另一个提醒投递缺陷被拆分为 #15537，不能混为同一问题。 |
| **[#15494：长期记忆需要按聊天/会话隔离](https://github.com/QwenLM/qwen-code/issues/15494)** | **P2**。长期记忆仅按项目 cwd 区分，多聊天共享进程时可能共用记忆目录，影响上下文准确性与隔离边界。 | **5 条评论**；标记 `need-discussion`，是频道部署的重要架构诉求。 |
| **[#15545：按阈值生成交接报告并切换新上下文](https://github.com/QwenLM/qwen-code/issues/15545)** | **P3**。希望补充现有原地压缩机制，在上下文达到配置阈值时生成 handover report，再进入新上下文继续执行。 | **5 条评论**；仍为功能提案，关注长期自治任务中的信息保真。 |
| **[#15567：MCP 启动失败不显示子进程 stderr](https://github.com/QwenLM/qwen-code/issues/15567)** | **P2**。stdio MCP 服务启动失败时，普通诊断仅显示断连，遗漏解释器缺失等可操作错误信息，增加排障成本。 | **4 条评论**；PR #15568 已提供有界 stderr 摘要方案。 |
| **[#15514：SDK 发布门禁改造](https://github.com/QwenLM/qwen-code/issues/15514)** | **P1 功能请求**。提出端点预检与 hermetic 测试门禁，降低实时模型端点可用性对发布流程的影响。 | **2 条评论**；标记 `ready-for-human`，是 SDK 发布阻塞的结构性改进方向。 |

## 4. 重要 PR 进展

| PR / 状态 | 功能或修复内容 | 开发者价值 |
|---|---|---|
| **[#15558：避免不受支持的 Anthropic 强制工具选择](https://github.com/QwenLM/qwen-code/pull/15558)** · OPEN | 针对列出的不兼容模型改用 `auto` 并明确预期工具；仅 schema-response 请求允许 JSON 文本替代。 | 修复新模型接入中的请求兼容性问题，对应 P1 Issue #15542。 |
| **[#15556：保留 catalog snapshot 后的 Hook 去重](https://github.com/QwenLM/qwen-code/pull/15556)** · OPEN | 不再仅依赖尾部 part，识别追加快照等内容后的已投递 Hook 上下文，同时保留精确文本及私有 receipt 校验。 | 降低记忆快照与 Hook 机制交互造成的重复注入。 |
| **[#15575：跨上下文压缩保留 Hook 去重](https://github.com/QwenLM/qwen-code/pull/15575)** · OPEN | 防止压缩后恢复的 `UserPromptSubmit` 上下文在下一轮重复出现，并避免后续修改污染已捕获的压缩检查点。 | 补齐压缩与持久化交互中的一致性问题，与 #15556 处理不同场景。 |
| **[#15559：在模型接收边界确认循环提醒](https://github.com/QwenLM/qwen-code/pull/15559)** · OPEN | 调整提醒状态清理与遥测确认时机，避免请求尚未发送就被记为“已提醒”。 | 修复 #15537 的提醒丢失问题，**不等同于解决 #15526 的重复提醒策略**。 |
| **[#15568：展示 MCP 启动失败 stderr](https://github.com/QwenLM/qwen-code/pull/15568)** · OPEN | 初始化失败及普通重连诊断中展示有界 stderr 摘要，无需开启 debug。 | 让 MCP 环境问题更容易定位。 |
| **[#15578：后台运行无人值守 autofix agent](https://github.com/QwenLM/qwen-code/pull/15578)** · OPEN | 无需逐次确认的 watch 将修复 agent 放到后台执行，前台会话保持可用。 | 提升自动修复工作流的并行性与交互体验。 |
| **[#15569：原生 journal snapshot 存储](https://github.com/QwenLM/qwen-code/pull/15569)** · OPEN | 为 Managed Sessions 提供精确 committed head 的命名快照、不可变存储、幂等重试及 writer 接管后的校验分页读取。 | 强化托管会话的持久化与恢复基础。 |
| **[#15564：扩展 Managed Agent 启动预检](https://github.com/QwenLM/qwen-code/pull/15564)** · OPEN | `--check` 增加 Harness 兼容性、遗留 worker 和存活服务检查。 | 将首次安装及升级问题尽量前移到启动前发现。 |
| **[#15570：调整 CI 双测试通道分工](https://github.com/QwenLM/qwen-code/pull/15570)** · OPEN | 主通道仅运行 CLI/core，其余测试放入侧通道；主通道使用完整 Vitest worker 上限。 | 尝试优化必需 Linux 测试任务的并行调度。 |
| **[#15586：Workspace 文件上传](https://github.com/QwenLM/qwen-code/pull/15586)** · CLOSED，合并未确认 | 为 Managed WebShell 提供向持久化 LOCAL / SSH_LOCAL Workspace 上传文件并插入会话路径的能力；支持二进制、空文件及最大 8 MiB 文件。 | 补齐浏览器到工作区的文件输入流程；仅凭 CLOSED 不能判断是否已落地。 |

## 5. 功能需求趋势

### ① 长任务上下文治理：从“自动压缩”走向可控交接
社区同时关注阈值交接、图片历史淘汰开关，以及记忆提取请求前缀稳定性。共同诉求是：**长会话的质量、成本与历史改写行为应可预测、可配置**。  
参考：[交接续跑 #15545](https://github.com/QwenLM/qwen-code/issues/15545) · [图片淘汰 #15495](https://github.com/QwenLM/qwen-code/issues/15495) · [记忆提取缓存 #15493](https://github.com/QwenLM/qwen-code/issues/15493)

### ② 无人值守自动化：可靠唤醒、循环保护与安全审查
唤醒遗漏、重复工具调用、review 期间工作树可能被修改，表明“任务能运行”之外，社区更需要可靠推进、资源约束和结果保护。  
参考：[唤醒 #15576](https://github.com/QwenLM/qwen-code/issues/15576) · [循环保护 #15526](https://github.com/QwenLM/qwen-code/issues/15526) · [审查工作树保护 #15507](https://github.com/QwenLM/qwen-code/issues/15507)

### ③ 多会话托管：隔离边界与外部工作区能力
长期记忆按聊天隔离、外部 Hosted Workspace 支持，反映 Qwen Code 的使用场景正在从单个本地会话扩展到多聊天、多 worker 的服务化部署。  
参考：[记忆隔离 #15494](https://github.com/QwenLM/qwen-code/issues/15494) · [外部 Hosted Workspace #15512](https://github.com/QwenLM/qwen-code/issues/15512)

### ④ 可观测性：错误需要提供“下一步怎么查”
Headless 重试缺少原因和次数、MCP 断连遗漏 stderr，是同一类诉求：默认输出需要给出足够的诊断上下文，而不只是状态通知。  
参考：[重试分类 #15513](https://github.com/QwenLM/qwen-code/issues/15513) · [MCP 诊断 #15567](https://github.com/QwenLM/qwen-code/issues/15567)

### ⑤ 发布与 CI：降低外部依赖、缩短反馈回路
SDK 发布门禁、Maven 预装和缓存锁改进集中出现，说明实时端点与公共下载服务正在成为工程链路的明显依赖点。  
参考：[发布门禁 #15514](https://github.com/QwenLM/qwen-code/issues/15514) · [Maven 预装 #15546](https://github.com/QwenLM/qwen-code/issues/15546) · [缓存锁后续 #15553](https://github.com/QwenLM/qwen-code/issues/15553)

## 6. 开发者关注点

- **发布成功与配套组件可用需要分开验证。** CLI v0.26.1 已触发发布流程，但 SDK 与 Managed Runtime 均有独立阻塞。集成和部署时应核验具体包版本。[#15498](https://github.com/QwenLM/qwen-code/issues/15498) · [#15499](https://github.com/QwenLM/qwen-code/issues/15499)
- **静默失败比显式报错更难处理。** 定时唤醒遗漏、提醒尚未送达却被遥测记为已投递，都可能令无人值守任务失去可信的进度信号。[#15576](https://github.com/QwenLM/qwen-code/issues/15576) · [#15537](https://github.com/QwenLM/qwen-code/issues/15537)
- **记忆与压缩机制的交互是可靠性重点。** 快照追加、Hook 去重、压缩检查点和聊天隔离需要一起考虑，而非分别优化。[#15552](https://github.com/QwenLM/qwen-code/issues/15552) · [#15494](https://github.com/QwenLM/qwen-code/issues/15494)
- **新模型兼容不能只验证主对话。** JSON 辅助查询等旁路请求也可能受到工具选择能力差异影响，应纳入兼容测试。[#15542](https://github.com/QwenLM/qwen-code/issues/15542)
- **CI 告警需区分临时失败与当前主线问题。** 部分机器人报告明确标注 provisional，且更新提交的结果尚未完成，不宜据此直接判断当前主线持续不可用。[#15579](https://github.com/QwenLM/qwen-code/issues/15579) · [#15581](https://github.com/QwenLM/qwen-code/issues/15581)

**总体判断：**本期社区焦点已不只是增加 Agent 功能，而是让长任务、托管会话和发布流程具备更可靠的状态边界。短期最值得跟踪的是 SDK 发布恢复、Anthropic 兼容修复，以及 Hook 与循环提醒相关 PR 的合并和验证结果。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报
**日期：2026-10-26**

> **数据说明**：本次数据来源标记为 `Hmbown/DeepSeek-TUI`，但所列 Issue、PR 均指向 `codewhale-hq/Codewhale`，下文按条目提供的仓库生成链接，不据此推断仓库迁移关系。统计沿用所给“过去 24 小时”窗口，部分条目的更新日期为 10 月 25 日。

## 1. 今日速览

今日动态主要围绕 **0.10.3 的质量与可观测性改进**：指令截断提示、换行符保留说明、多语言界面和完整卸载成为重点。PR 侧出现按作用域分配指令预算、运行中用量展示及多项 TUI 修复方案，但 **15 个 PR 中有 14 个标记为 CLOSED，不能据此认定已经合并**；过去 24 小时没有新 Release。

## 2. 社区热点 Issues

本次仅提供 **7 个 Issue，其中 1 个为明显无关的医疗营销内容且已关闭**，因此精选以下 6 个有效议题，不补造至 10 个。有效议题均为 0 点赞、0—1 条评论，目前不足以判断形成广泛社区共识。

### 1. 技能描述被静默截断，配置能力仍待补齐
**[#7073](https://github.com/codewhale-hq/Codewhale/issues/7073) · OPEN · 1 条评论**

- **问题**：技能 ambient index 将描述限制为 400 字符，缺少长度配置，也未充分向提示词或模型说明内容损失。
- **进展**：摘要明确表示，截断损失提示已进入主分支；长度控制及剩余文档、本地化工作仍在计划中。
- **重要性**：静默截断可能影响技能发现与选择，是上下文可靠性的关键问题。

### 2. 明确要求 LF，写入仍保留 CRLF
**[#7070](https://github.com/codewhale-hq/Codewhale/issues/7070) · OPEN · 1 条评论**

- **问题**：用户要求保存为 LF，工具却仍保留原有 CRLF。
- **进展**：当前源码修复会在写入结果中说明保留了 CRLF，但**尚未提供显式 LF/CRLF 选择能力**。
- **重要性**：提示透明度改善不等于行为控制完成；跨平台协作、格式检查与 diff 稳定性仍可能受影响。

### 3. 卸载必须完整且可验证
**[#7091](https://github.com/codewhale-hq/Codewhale/issues/7091) · OPEN · 0 条评论**

- **需求**：覆盖所有受支持安装方式，确保用户能够可靠移除程序。
- **进展**：现有源码已有卸载说明及 Windows NSIS 卸载器，该事项重点是补齐并验证完整流程。
- **重要性**：被明确列为创始人要求的 **0.10.3 必须验收项**，直接关系分发质量与用户信任。

### 4. 非英语界面仍存在硬编码英文
**[#7071](https://github.com/codewhale-hq/Codewhale/issues/7071) · OPEN · 0 条评论**

- **问题**：简体中文等非英语环境下，`/undo` 提示、`/diff` 标题、审批与计划交接界面、`/color` 提示仍出现英文。
- **重要性**：主流程已本地化，但辅助交互存在缺口，影响界面一致性。
- **进展**：目标版本为 0.10.3；所给数据未展示修复完成情况。

### 5. Review 将泄漏的 DSML 标记当作有效结果
**[#7072](https://github.com/codewhale-hq/Codewhale/issues/7072) · CLOSED · 1 条评论**

- **问题**：在所报告的 DeepSeek 配置下，review 接受泄漏的 DSML 工具调用标记，并以退出码 0 结束，却没有输出审查统计。
- **重要性**：可能让自动化流程误判审查成功，涉及结果校验与退出码可靠性。
- **状态边界**：Issue 已关闭，但摘要未说明最终修复或验证结果。

### 6. 请求内置 Runcrate 提供商
**[#7085](https://github.com/codewhale-hq/Codewhale/issues/7085) · OPEN · 1 条评论**

- **需求**：将提供 OpenAI 兼容 API 的 Runcrate 纳入内置提供商。
- **重要性**：反映用户希望降低开放模型服务接入的配置成本，扩展提供商选择。
- **状态边界**：目前是功能请求，未见已实现或排期信息。

## 3. 重要 PR 进展

> **阅读提示**：以下 CLOSED 仅表示关闭，不代表合并或已发布。PR 评论数均缺失，无法据此评价讨论热度。

| PR | 状态 | 功能或修复内容 |
|---|---|---|
| [#7086](https://github.com/codewhale-hq/Codewhale/pull/7086) | **OPEN** | **按作用域分配指令预算**：对 `AGENTS.md`、`CLAUDE.md`、全局配置及规则等常驻指令，按估算 token 设置预算，并显式展示裁剪或跳过情况。 |
| [#7090](https://github.com/codewhale-hq/Codewhale/pull/7090) | CLOSED | **避免未知价格显示为零费用**：修正 `/status` 在缺乏权威定价时仍显示 `$0.0000` 的误导性行为。 |
| [#7089](https://github.com/codewhale-hq/Codewhale/pull/7089) | CLOSED | **减少无效状态提示**：仅在确有目标被清除时显示 “Goal cleared.”，避免 `/clear`、`/new` 产生多余反馈。 |
| [#7087](https://github.com/codewhale-hq/Codewhale/pull/7087) | CLOSED | **改善 diff 阅读连续性**：针对终端尺寸变化导致换行重排的问题，尝试保留 `/diff` 分页器的阅读位置。 |
| [#7074](https://github.com/codewhale-hq/Codewhale/pull/7074) | CLOSED | **运行中展示费用与上下文**：利用模型调用的用量回执提供持续反馈，减少长任务执行时“看似卡住”的体验。 |
| [#7083](https://github.com/codewhale-hq/Codewhale/pull/7083) | CLOSED | **自动压缩期间提供上下文提示**：向模型给出轻量通知，避免引入与自动压缩竞争的保存、压缩流程。 |
| [#7080](https://github.com/codewhale-hq/Codewhale/pull/7080) | CLOSED | **处理 CPU 使用回归**：针对报告中从 v0.9.12 到 v0.10.0 逐步加重的 CPU 占用问题提交修复尝试。 |
| [#7077](https://github.com/codewhale-hq/Codewhale/pull/7077) | CLOSED | **修复 DeepSeek 余额查询**：针对 `/balance` 无法用于 `providers.deepseek` 的问题提交方案。 |
| [#7076](https://github.com/codewhale-hq/Codewhale/pull/7076) | CLOSED | **处理 LF/CRLF 写入问题**：对应 #7070；仍应以该 Issue 的最新说明为准，不能视为已实现显式换行符选择。 |
| [#7075](https://github.com/codewhale-hq/Codewhale/pull/7075) | CLOSED | **处理技能描述截断问题**：对应 #7073；最新 Issue 表明提示已有进展，但长度配置等工作仍未完成。 |

**验证风险**：#7083、#7080、#7077、#7076、#7075 均注明由 CodeWhale 在 Boat VM 中生成，且因运行时限未完成测试。应将其视为修复尝试，而非已验证交付。

## 4. 功能需求趋势

基于全部有效 Issues，可归纳出以下方向；这是议题分布，而非按票数得出的热度排名。

- **上下文处理从“隐式行为”走向“显式反馈”**：用户希望知道技能内容何时被截断，并能控制长度限制。见 [#7073](https://github.com/codewhale-hq/Codewhale/issues/7073)。
- **工具执行需要可控、可核验**：换行符写入应符合明确指令，review 成功状态也应有有效结果支撑。见 [#7070](https://github.com/codewhale-hq/Codewhale/issues/7070)、[#7072](https://github.com/codewhale-hq/Codewhale/issues/7072)。
- **多提供商支持继续扩展**：内置 OpenAI 兼容服务的需求仍在出现，核心诉求是降低接入摩擦。见 [#7085](https://github.com/codewhale-hq/Codewhale/issues/7085)。
- **产品完整度成为版本验收重点**：完整卸载与非英语界面覆盖，说明关注点不只在模型能力，也在安装生命周期和日常使用质量。见 [#7091](https://github.com/codewhale-hq/Codewhale/issues/7091)、[#7071](https://github.com/codewhale-hq/Codewhale/issues/7071)。

## 5. 开发者关注点

1. **不要把未知或失败包装成成功。** 未定价费用显示为零、review 缺乏有效结果却返回成功，都会削弱自动化可信度。见 [PR #7090](https://github.com/codewhale-hq/Codewhale/pull/7090)、[Issue #7072](https://github.com/codewhale-hq/Codewhale/issues/7072)。
2. **“告知限制”与“允许控制”是两层需求。** 截断提示、CRLF 保留说明是进展，但不能替代长度配置或换行符选择。见 [#7073](https://github.com/codewhale-hq/Codewhale/issues/7073)、[#7070](https://github.com/codewhale-hq/Codewhale/issues/7070)。
3. **长任务需要持续、准确的状态反馈。** 运行中用量与上下文展示有助于判断任务是否仍在推进。见 [PR #7074](https://github.com/codewhale-hq/Codewhale/pull/7074)。
4. **生成补丁之后，仍需测试与验收闭环。** 多个自动生成 PR 明确未完成测试；后续应重点关注 CI 结果、实际合并记录及版本说明，而非仅看关闭状态。见 [PR #7080](https://github.com/codewhale-hq/Codewhale/pull/7080)、[PR #7076](https://github.com/codewhale-hq/Codewhale/pull/7076)。

**总体判断**：当前最值得跟踪的是 0.10.3 如何把“状态可见”推进到“行为可控、结果可验证”，以及这些源码进展何时形成经过测试的正式交付。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*