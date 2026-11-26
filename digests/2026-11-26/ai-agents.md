# OpenClaw 生态日报 2026-11-26

> Issues: 40 | PRs: 62 | 覆盖项目: 13 个 | 生成时间: 2026-11-26 03:58 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyagi)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目动态日报
**日期：2026-11-26｜项目：[openclaw/openclaw](https://github.com/openclaw/openclaw)**

> **统计口径**：过去 24 小时共 40 条 Issue 更新、62 条 PR 更新、2 个版本发布。PR 明细仅提供其中 30 条，且评论数字段为 `undefined`；Issue 仅含摘要，未提供评论正文。以下严格区分“已关闭”“已合并”和“已有修复提案”，不将关闭状态视为修复已发布。

## 1. 今日速览

OpenClaw 今日保持**较高开发活跃度**：40 条 Issue 更新中，新开/活跃 25 条、关闭 15 条；62 条 PR 更新中，待合并 43 条、已合并/关闭 19 条。今日工作重心明显偏向 **v2026.11.10 升级迁移、会话与消息可靠性、多智能体权限隔离**，而非单纯扩展功能。最值得关注的是 Knowledge 跨智能体读取对话的安全边界问题，已有修复 PR，但尚未合并；升级阻塞、启动失败和自动化执行回归也仍有多项开放报告。总体看，项目响应和修复提案产出积极，但当前版本的运维稳定性与待审队列仍有压力。  
参考：[安全隔离修复 #205665](https://github.com/openclaw/openclaw/pull/205665)｜[升级停滞 #205547](https://github.com/openclaw/openclaw/issues/205547)

## 2. 版本发布

### [v2026.11.10](https://github.com/openclaw/openclaw/releases/tag/v2026.11.10)

- 发布摘要列出 **8,309 commits、7,671 pull requests、349 contributors**；这些是发布页展示数据，**不应解读为过去一天或单个版本的新增量**。
- 提供的发布说明被截断，无法据此完整列举功能更新、正式破坏性变更或官方迁移步骤。
- **升级注意事项**：当前报告涉及旧会话存储迁移失败、多智能体配置所有者丢失、SQLite 扩展缺失及更新收尾停滞。相关问题并非证明所有安装都会失败，但生产环境宜先备份状态目录、配置和数据库，在同类环境验证升级与恢复流程。  
  参考：[旧会话迁移 #205202](https://github.com/openclaw/openclaw/issues/205202)｜[多智能体升级 #205695](https://github.com/openclaw/openclaw/issues/205695)｜[vec0 启动失败 #205694](https://github.com/openclaw/openclaw/issues/205694)

### [v2026.10.34](https://github.com/openclaw/openclaw/releases/tag/v2026.10.34)

- 定位为 **仅 Gateway 的 `extended-stable` 版本**，发布说明将其称为当前相当于 LTS 的维护通道。
- 以 2026 年 10 月末代码为基础，加入关键安全更新、可靠性与性能修复，以及新模型支持等内容。
- 摘要同样被截断，无法确认具体安全修复清单或兼容性变化；也不能据此保证它可以直接承接已由新版迁移的状态数据库。

## 3. 项目进展

### 今日关闭的重点 PR：改善日常操作的数据完整性

以下 PR 均标记为 **CLOSED，数据未提供合并标记**，因此只能确认其已关闭，不能确认代码已进入主线。

| PR | 目标改进 | 推进价值 |
|---|---|---|
| [#205707](https://github.com/openclaw/openclaw/pull/205707) | 保留粘贴的 Workboard 名称、列名和描述 | 避免输入被静默截断 |
| [#205704](https://github.com/openclaw/openclaw/pull/205704) | 保留完整会话搜索查询 | 避免少一个字符导致命中错误对话 |
| [#205700](https://github.com/openclaw/openclaw/pull/205700) | 选中卡片被归档后，允许继续批量编辑标签 | 改善多人协作时的编辑连续性 |

### 重要修复提案已形成，但尚未交付

- **权限隔离**：[PR #205665](https://github.com/openclaw/openclaw/pull/205665) 将 Knowledge 对话学习限制在所属智能体范围，是今日最重要的安全边界修复提案。
- **容器恢复**：[PR #205709](https://github.com/openclaw/openclaw/pull/205709) 处理容器崩溃后跨 PID 命名空间的锁判断问题，目标是恢复持久卷复用场景下的启动能力。
- **自动化完整性**：[PR #205730](https://github.com/openclaw/openclaw/pull/205730) 修复定时会话任务首次发送消息后提前结束；[PR #205712](https://github.com/openclaw/openclaw/pull/205712) 修正子智能体完成后台命令后的错误静默提示。
- **大型工具目录性能**：[PR #205723](https://github.com/openclaw/openclaw/pull/205723) 为 MCP 工具目录导致的会话启动卡顿补充真实模型验证，已进入维护者审阅阶段。

**进展判断**：今日在问题定位、修复方案和验证材料上有实质推进；但仅凭现有明细，无法量化已合并功能或已发布修复的规模。

## 4. 社区热点

Issue 评论数最高仅为 3 条，所有所列点赞均为 0，尚未出现高互动单点话题；热点更体现为**相似故障集中出现**。

| 话题 | 互动信号 | 背后诉求 |
|---|---|---|
| [升级时无法读取 legacy session store #205202](https://github.com/openclaw/openclaw/issues/205202) | 3 条评论，所列 Issue 最高 | 大型本地状态库升级应可验证、可恢复 |
| [多智能体手动升级被配置锁拒绝 #205695](https://github.com/openclaw/openclaw/issues/205695) | 2 条评论、P1 | 文档推荐的升级路径应保留明确的所有者语义 |
| [Knowledge 跨智能体学习 #205581](https://github.com/openclaw/openclaw/issues/205581) | 2 条评论、P1、安全审查标签 | 多智能体共享 Gateway 时仍需严格隐私隔离 |
| [Knowledge 面板未注册 #205683](https://github.com/openclaw/openclaw/issues/205683) | 2 条评论 | 插件启用、工具白名单、重启和 UI 状态应一致 |

**PR 热度限制**：评论数缺失，无法可靠排名“讨论最多的 PR”；不宜用列表顺序或自动评级标签替代社区关注度。

## 5. Bug 与稳定性

以下按安全与业务影响排序，同级内优先关注服务不可用和消息丢失；优先级沿用原始标签。

| 严重程度 | 问题及影响 | 修复状态 |
|---|---|---|
| **P1／安全隔离** | [#205581](https://github.com/openclaw/openclaw/issues/205581)：Knowledge scribe 读取其他智能体私有对话并写入自身知识库 | 已有开放 [PR #205665](https://github.com/openclaw/openclaw/pull/205665) |
| **P1／升级后不可用** | [#205694](https://github.com/openclaw/openclaw/issues/205694)：旧版本升级后因缺少 `vec0` 停在 agent-schema；[#205695](https://github.com/openclaw/openclaw/issues/205695)：多智能体配置升级被拒绝 | 所提供明细未见对应 fix PR，均需更多信息 |
| **P1／升级停滞** | [#205547](https://github.com/openclaw/openclaw/issues/205547)：更新收尾约 100% CPU 持续 81 分钟，Gateway 停机 | 有相关开放 [PR #205675](https://github.com/openclaw/openclaw/pull/205675)，但其明确未证明完整根因 |
| **P1／消息丢失** | [#205708](https://github.com/openclaw/openclaw/issues/205708)：飞书私聊被当作群聊，双会话键导致回复静默丢弃 | 明细未见对应 fix PR |
| **P1／自动化失败** | [#205715](https://github.com/openclaw/openclaw/issues/205715)：Codex harness 定时任务连续失败，报告称重启前循环发生 | 明细未见对应 fix PR |
| **P1／运行能力失效** | [#205716](https://github.com/openclaw/openclaw/issues/205716)：云 worker 缺少 QuickJS executor；[#205714](https://github.com/openclaw/openclaw/issues/205714)：插件热重载使进行中的智能体失去工具 | 均未见对应 fix PR；后者需现场复现 |
| **P2／消息完整性** | [#205722](https://github.com/openclaw/openclaw/issues/205722)：Telegram 私聊出站静默跳过 | 明细未见对应 fix PR |
| **P2／任务提前结束** | [#205660](https://github.com/openclaw/openclaw/issues/205660)：会话目标 cron 首次发消息即结束；[#205705](https://github.com/openclaw/openclaw/issues/205705)：子智能体被要求静默后触发空回复与重跑 | 分别已有开放 [PR #205730](https://github.com/openclaw/openclaw/pull/205730)、[PR #205712](https://github.com/openclaw/openclaw/pull/205712) |
| **P2／大数据内存风险** | [#205537](https://github.com/openclaw/openclaw/issues/205537)：约 250 MB 以上会话文件可触发索引 worker OOM | 明细未见对应 fix PR |
| **P2／中文检索缺陷** | [#205667](https://github.com/openclaw/openclaw/issues/205667)：FTS5 分词使句内中日文词和中英混排词无法命中 | 尚待产品决策，未见对应 fix PR |

**已关闭但不宜直接视为解决**：FTS5 损坏导致迁移死锁的 [#205506](https://github.com/openclaw/openclaw/issues/205506)、模型运行时累积导致 OOM 的 [#205724](https://github.com/openclaw/openclaw/issues/205724)、模型目录持续重建的 [#205661](https://github.com/openclaw/openclaw/issues/205661) 均已关闭；数据未给出关闭原因或修复版本。

## 6. 功能请求与路线图信号

- **Antigravity 原生运行时与安全恢复**：开放 [PR #205731](https://github.com/openclaw/openclaw/pull/205731) 提供显式启用的会话支持，并处理重启后重试可能重复副作用的问题。已有具体实现，是较明确的功能候选，但变更规模为 XL、涉及认证与安全敏感代码，不能推定下一版必然纳入。
- **Nodecode / Cyber v1 官方提供商**：[Issue #205653](https://github.com/openclaw/openclaw/issues/205653) 请求 API-key 引导和实时模型列表，带有 `linked-pr-open` 标签；对应 PR 不在明细内，且仍待产品决策。
- **语音输入向写作助手延伸**：[应用级听写配置 #205638](https://github.com/openclaw/openclaw/issues/205638) 与[保守去除口头停顿 #205635](https://github.com/openclaw/openclaw/issues/205635) 均为 P3 提案，尚无可见实现交付信号。
- **Knowledge 自动采集与信任恢复**：[PR #205614](https://github.com/openclaw/openclaw/pull/205614) 尝试修复远程 Control UI 配置的 Slack 定时学习；[PR #205726](https://github.com/openclaw/openclaw/pull/205726) 提供人工审核后恢复 `MEMORY.md` 信任的路径。两者均等待作者继续处理，兼容性或安全边界评审仍是前置条件。

## 7. 用户反馈摘要

> 未提供评论正文，以下仅从问题描述与复现场景提炼，不冒充评论原话，也不推断用户满意度。

- **长期运行用户需要“状态越大仍可维护”**：多月会话、数百 MB 转录文件和多存储迁移场景暴露出全文件读取、固定内存上限与恢复流程的不足。参考：[大文件索引 OOM #205537](https://github.com/openclaw/openclaw/issues/205537)。
- **用户更难接受静默失败，而非显式报错**：飞书和 Telegram 的消息未送达会直接削弱个人助手作为日常通信入口的可信度。参考：[飞书 #205708](https://github.com/openclaw/openclaw/issues/205708)｜[Telegram #205722](https://github.com/openclaw/openclaw/issues/205722)。
- **多智能体用户要求边界可预测**：同一个 Gateway 不意味着私有对话可被其他智能体学习；知识沉淀必须遵守所属智能体范围。参考：[#205581](https://github.com/openclaw/openclaw/issues/205581)。
- **中文用户需要真正可用的知识检索**：记录已入库但句内关键词搜不到，会造成“记住了却找不到”的体验断层。参考：[#205667](https://github.com/openclaw/openclaw/issues/205667)。

## 8. 待处理积压

现有 Issue 多创建于 11 月 25—26 日，**不足以判断长期未响应**；也缺少完整维护者评论时间线。以下区分可见旧项延续和当前重点待审项：

| 待关注事项 | 积压或处理信号 | 建议 |
|---|---|---|
| [大型 MCP 工具目录修复 #205723](https://github.com/openclaw/openclaw/pull/205723) | 摘要称原 PR 自 11 月 15 日起仅剩验证要求，当前已补充材料 | 优先核验新增证据，避免重复等待 |
| [容器崩溃恢复 #205709](https://github.com/openclaw/openclaw/pull/205709) | `proof: sufficient`、待维护者审阅；涉及会话状态风险 | 聚焦持久卷、锁与命名空间边界评审 |
| [子智能体完成提示 #205712](https://github.com/openclaw/openclaw/pull/205712) | `proof: sufficient`、等待维护者 | 尽快确认语义，减少空回复和重复执行 |
| [Knowledge 隔离修复 #205665](https://github.com/openclaw/openclaw/pull/205665) | P1、安全影响、已形成修复提案 | 优先安全审查并验证隔离回归测试 |
| [升级收尾修复 #205675](https://github.com/openclaw/openclaw/pull/205675) | 等待作者，且根因尚未闭环 | 补齐长时间停滞复现与中断恢复验证 |

**健康度结论**：OpenClaw 当前表现为“高活跃、修复提案密集、交付确认不足”。近期维护重点宜放在**安全隔离、升级可恢复性、消息可靠性**，并明确已关闭问题的关闭原因和实际修复版本，帮助用户判断是否可以安全升级。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-26｜基于所提供的过去 24 小时社区动态**

> **口径说明**：Issue、PR 数均为窗口内更新条目数，不等于新增量或仓库总量；`CLOSED` 不等于已合并，更不等于已发布。各项目数据完整度不同，以下健康度评价仅针对本次可见活动，不构成长期排名。

## 1. 生态全景

个人 AI 助手开源生态正在从“增加模型和工具入口”转向“让助手能够安全、持续、可靠地执行任务”。OpenClaw、Hermes Agent 的更新规模居前，但共同面临会话规模增长、消息投递、安装迁移与异步恢复等工程挑战。容器隔离、多智能体知识边界、审批完整性正在成为跨项目议题，说明安全边界已从模型调用层延伸至完整执行链。功能扩展仍在推进，主要体现在插件管理、外部 Agent 运行时、语音和办公文档，但本次数据中**修复提案的活跃程度明显高于可确认的交付成果**。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release 情况 | 本次窗口健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 40 | 62 | 2 个：`v2026.11.10`、Gateway `extended-stable v2026.10.34` | 高活跃；安全隔离、升级和消息可靠性压力突出，关键修复待审 |
| **Hermes Agent** | 50 | 50 | 1 个：`v0.23.4 Canary` | 高活跃；修复响应积极，长期运行成本与跨平台安装问题集中 |
| **CoPaw** | 12 | 18 | 无 | 贡献活跃；17 条开放 PR，核心执行与数据正确性补丁待落地 |
| **LobsterAI** | 0 | 20 | 无 | 整合活动密集；20 条 PR 均关闭，合并及实际交付状态未知 |
| **NanoBot** | 6 | 9 | 无 | 渐进式质量打磨；9 条 PR 均关闭，关键修复去向需核实 |
| **ZeroClaw** | 2 | 7 | 无 | 安全、认证和版本治理并进；全部 PR 开放，尚无交付确认 |
| **NanoClaw** | 0 | 4 | 无 | 聚焦容器安全与消息竞态；修复方向明确，全部待合并 |
| **Moltis** | 1 | 1 | 无 | 小规模反馈与能力扩展；沙箱 PDF 支持存在缺口 |
| PicoClaw | 0* | 0* | 未记录 | 单日无活动，不足以判断维护状况 |
| NullClaw | 0* | 0* | 未记录 | 同上 |
| IronClaw | 0* | 0* | 未记录 | 同上 |
| TinyClaw | 0* | 0* | 未记录 | 同上 |
| ZeptoClaw | 0* | 0* | 未记录 | 同上 |

\* 原始摘要为“过去 24 小时无活动”。

**规模观察**：按提供的汇总口径，共有 **111 条 Issue、171 条 PR 更新及 3 个版本记录**。OpenClaw 与 Hermes 合计贡献约 **81% 的 Issue 更新、65% 的 PR 更新**，构成本次窗口的主要活动中心；这反映更新规模，不代表用户规模或市场份额。

## 3. OpenClaw 在生态中的定位

### 优势：覆盖面广，开始呈现平台化维护特征

- **本次 PR 更新最多**：62 条，高于 Hermes 的 50 条，且议题横跨 Gateway、多智能体、Knowledge、MCP、定时任务、IM 和语音，显示其维护面与集成范围较广。
- **已有发布通道分层**：除常规版本外，提供仅 Gateway 的 `extended-stable` 通道。这比单一版本推进更接近分层运维需求，但不能据此保证升级或降级兼容。
- **复杂使用场景反馈充分**：大型本地会话库、多智能体共享 Gateway、持久卷容器恢复等报告，为工程优化提供了具体场景。

### 技术路线：以共享基础设施承载多能力助手

从本次动态看，OpenClaw 更偏向 **Gateway + 多智能体 + 多消息渠道 + 知识与工具体系**的综合平台：

- 相比 **NanoClaw** 聚焦容器—宿主信任边界，OpenClaw 更突出的安全问题是共享平台内的智能体间知识隔离。
- 相比 **LobsterAI** 围绕 DSH、桌面工作区和 Office 文档整合，OpenClaw 更突出消息入口、自动化与服务端状态管理。
- 相比 **Hermes**，两者均面向长驻、多智能体工作流；OpenClaw 当前更集中于升级迁移与权限隔离，Hermes 则更突出跨平台安装、会话读取成本及桌面/终端恢复。

### 社区规模：活动领先，不能直接推导用户领先

OpenClaw 的发布页展示 **349 位贡献者**，但这是发布页口径，不是当日新增。其他项目缺少可比的总贡献者、活跃作者和安装量数据，因此只能确认 OpenClaw 与 Hermes 处于本次**活动规模第一梯队**，不能确认社区总规模排名。

**核心短板**：能力覆盖越广，配置、迁移、权限和消息链路的组合复杂度越高。OpenClaw 的下一阶段竞争力，应看安全隔离、可恢复升级和可靠投递能否形成稳定交付，而非继续堆叠集成数量。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 共同诉求与具体表现 |
|---|---|---|
| **消息可靠性与状态真实性** | OpenClaw、Hermes、NanoClaw、LobsterAI、NanoBot | 避免静默丢消息、错误寻址、容器回收竞态；正确区分群广播与机器人提及；发送失败不能记录为成功 |
| **恢复、取消与重复副作用控制** | OpenClaw、Hermes、LobsterAI、ZeroClaw | 重启与断连后核对原任务状态；避免重发造成重复执行；取消或超时后必须真正停止后台命令 |
| **安全隔离与审批可信度** | OpenClaw、NanoClaw、ZeroClaw、LobsterAI | 隔离智能体私有知识；防止容器篡改宿主审批；治理凭证生命周期；按 IM 渠道配置执行权限 |
| **长期状态与上下文可维护性** | OpenClaw、Hermes、NanoBot、CoPaw | 降低大文件索引和历史分页成本；减少冗余上下文；提供记忆索引诊断与重建路径 |
| **插件与外部 Agent 运行时** | OpenClaw、Hermes、LobsterAI、CoPaw | 扩展运行后端和插件生命周期管理；Antigravity 在 OpenClaw、CoPaw 中均出现接入提案，但集成方式不同 |
| **多模态输入可靠性** | NanoBot、CoPaw、Moltis | 大图失败应透明呈现；历史媒体不应污染后续请求；沙箱内应能完成必要的文档读取 |
| **升级、安装与兼容性** | OpenClaw、Hermes、LobsterAI | 保留旧配置与所有权语义，识别不同安装模式，验证数据库迁移、备份恢复与打包路径 |

其中，**“系统声称完成”与“任务实际完成”之间的差距**最值得重视：丢失图片后继续回答、消息未送达却标记成功、取消任务后容器继续写文件，本质上都是执行状态不可信。

## 5. 差异化定位分析

以下目标用户为依据本次能力与问题场景作出的判断，并非官方定位。

| 项目 | 本次体现的功能侧重 | 更匹配的用户与场景 | 架构关注点 |
|---|---|---|---|
| **OpenClaw** | 多智能体、知识、IM、定时自动化的综合协同 | 需要多入口、长期运行与复杂自动化的用户和部署团队 | 共享 Gateway 下的权限、状态与迁移管理 |
| **Hermes Agent** | Desktop/Web/终端连续性、插件和多 profile 工作流 | 开发者、重度个人助手用户、多工作流运营者 | 会话数据库、安装环境、异步恢复与扩展接口 |
| **NanoBot** | 轻量交互、WebUI、命令执行与上下文精简 | 重视直接聊天与工具执行体验的用户 | 前后台执行资源分离、SQLite 状态一致性 |
| **NanoClaw** | 容器执行与宿主审批安全 | 重视隔离执行和权限边界的开发者 | 不可信容器输出、宿主控制面、容器生命周期 |
| **LobsterAI** | 桌面办公、Agent 管理、记忆和企业 IM | 办公自动化及企业消息协作用户 | DSH 运行时、桌面面板隔离、备份迁移与插件管理 |
| **CoPaw** | 代码模式、Creator 数据链路、自定义模型及外部 Agent | 构建数据应用和复杂工具流程的开发者 | 工具目录、结构化输出容错、ACP harness 集成 |
| **ZeroClaw** | Docker Shell、OIDC、配置与版本治理 | 关注可控部署、认证与执行边界的工程团队 | 守护进程凭证管理、运行时清理和 CI 验证 |
| **Moltis** | 沙箱文档能力、多渠道语音输入 | 需要隔离执行与文档/语音交互的用户 | Docker/Podman 内外能力一致性、提供商配置 |

对本次无活动的五个项目，材料不足以进行可靠的定位或架构比较，不能仅凭项目名称推断其技术路线。

## 6. 社区热度与成熟度

### 活跃度分层

- **第一梯队：OpenClaw、Hermes**  
  更新量显著领先，复杂部署和长期运行问题暴露充分，属于平台快速演进与稳定性治理并行阶段。
- **第二梯队：CoPaw、LobsterAI、NanoBot**  
  CoPaw、LobsterAI 同时推进能力扩展与集成收敛；NanoBot 更偏向执行、数据和界面的渐进式质量巩固。
- **定向推进：ZeroClaw、NanoClaw**  
  数量较少但涉及关键安全边界；ZeroClaw 还在推进 v1.0 路线图与认证能力，不能简单归为纯维护期。
- **低频活动或观察不足：Moltis及五个无活动项目**  
  单日样本不足以评价长期维护效率。

### 热度不等于成熟度

可见 Issue 的最高评论数仅为：OpenClaw **3 条**，Hermes、NanoBot、CoPaw 各 **2 条**；多数 PR 评论字段缺失。因此，本次更适合评价“开发活动集中度”，而不是“社区讨论热度”。

成熟度也不能靠关闭数量判断：NanoBot 的 9 条、LobsterAI 的 20 条关闭 PR 均缺少合并确认；Hermes、OpenClaw 虽有版本记录，也不能证明当前开放补丁已包含其中。更可靠的指标应是：

**高影响问题从复现到发布的时间、回归验证结果、迁移成功率，以及用户确认修复的比例。**

## 7. 值得关注的趋势信号

### ① 竞争焦点正在转向执行可信度
多个项目同时出现静默失败、误报成功和重复执行风险。对开发者而言，任务受理、执行、结果持久化、消息送达应分别建模，不能用一个“成功”状态覆盖整条链路。

### ② “个人助手”正在承担小型常驻服务的负载
Hermes 的报告涉及 **10 个 profile、约 9,600 个会话**；OpenClaw 出现 **约 250 MB 以上会话文件索引 OOM**。这些是特定环境报告，但表明分页、增量索引、资源预算、状态清理和恢复演练应进入基础设计，而非后期优化。

### ③ 安全边界必须同时覆盖执行与记忆
容器隔离不能替代知识隔离，宿主审批也不能信任容器提交的字段。建议分别验证 **智能体间、容器—宿主间、消息渠道间**的权限边界，并将审批卡片与记忆写入纳入安全测试。

### ④ 外部运行时增多，恢复协议比接入数量更重要
Antigravity、ACP harness 和外部执行插件接口反映后端可插拔需求。真正影响可用性的将是取消、恢复、身份映射、错误传播和副作用控制，而不仅是“能够启动外部 Agent”。

### ⑤ 多模态降级需要可见、可解释
NanoBot 的大图静默移除与 CoPaw 的媒体重试提案提示：自动降级可能改变回答依据。系统应明确告知用户哪些输入被模型实际接收，避免把文本回答伪装成视觉理解结果。

### ⑥ 发布工程正在成为产品能力
OpenClaw 的维护通道、Hermes 的 Canary、ZeroClaw 的路线图治理，都表明版本管理的重要性上升。维护者应公开“修复对应哪个版本、状态能否回退、哪些路径已验证”，降低用户自行拼接 Issue 和 PR 的决策成本。

---

**结论：**OpenClaw 在本次生态中体现出较广的平台覆盖面和领先的开发活动量，Hermes 是活动规模与复杂运行场景上最接近的参照；其他活跃项目则围绕桌面办公、数据工具链、容器隔离或轻量交互形成不同侧重。对技术选型者而言，下一步最值得跟踪的不是提交数量，而是**关键修复是否发布、任务状态是否可信，以及长期运行与升级能否被验证和恢复**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-26｜项目：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)**

> **数据口径**：基于所提供的过去 24 小时更新记录。9 条 PR 均标记为 `CLOSED`，但未提供合并字段，因此下文仅称“已关闭”，不将其等同于已合并或已发布。Issue 评论正文、PR 评论数及完整历史积压未提供，相关判断存在局限。

## 1. 今日速览

过去 24 小时，NanoBot 有 **6 条 Issue 更新、9 条 PR 更新**，其中 5 条 Issue 仍开放、1 条已关闭，当前样本显示项目维护活动较密集。工作重心集中在 **WebUI 交互与状态一致性、命令执行资源隔离，以及上下文精简**，以稳定性和体验打磨为主，而非大型功能扩展。新增反馈暴露了大图输入静默降级、飞书群广播误触发等影响助手可靠性的问题，值得优先分诊。期间没有新版本发布，且无法仅凭 PR 关闭状态确认相关改动已进入主分支；总体呈现“维护活跃、改进方向明确，但交付状态仍需核实”的健康度信号。  
相关记录：[执行资源隔离 #6798](https://github.com/HKUDS/nanobot/pull/6798) · [大图处理 #6805](https://github.com/HKUDS/nanobot/issues/6805) · [飞书误触发 #6801](https://github.com/HKUDS/nanobot/issues/6801)

## 2. 项目进展

### 重点：执行可靠性与会话数据一致性

| 已关闭 PR | 主要改动 | 对用户的意义 |
|---|---|---|
| [#6798 前台命令与后台会话容量分离](https://github.com/HKUDS/nanobot/pull/6798) | 前台执行采用 8 并发与排队机制，不再占用网关内聊天和子智能体共享的 32 个后台槽位 | 避免少量长期运行的预览进程阻塞 `git status` 等短命令，是本批次较重要的运行可靠性改进 |
| [#6800 仅归档或恢复指定会话](https://github.com/HKUDS/nanobot/pull/6800) | 在单次 SQLite 事务中修改目标会话，避免用过期侧栏快照覆盖完整归档列表 | 针对多窗口并行操作时，会话归档状态被意外恢复的问题 |
| [#6804 Markdown 裸 HTML 换行渲染](https://github.com/HKUDS/nanobot/pull/6804) | 在现有安全 HTML 处理流程中规范化无属性的 `<br>` 标签 | 修复表格单元格将换行标签显示为文字的问题；关联 [Issue #6803](https://github.com/HKUDS/nanobot/issues/6803) 已关闭 |

### 上下文与 WebUI 体验打磨

- **减少无效上下文**：[PR #6797](https://github.com/HKUDS/nanobot/pull/6797) 跳过仅含 `(nothing)` 标记的归档摘要；[PR #6796](https://github.com/HKUDS/nanobot/pull/6796) 精简运行时上下文中的重复通用说明。方向是减少每轮提示词中的冗余，但没有提供实际 token 或性能收益数据。
- **改善发送反馈与切换动画**：[PR #6794](https://github.com/HKUDS/nanobot/pull/6794) 用消息旁的加载环替代独立“Sending”行，减少确认送达时的布局移动；[PR #6793](https://github.com/HKUDS/nanobot/pull/6793) 针对会话切换时文字缩放、工作台面板拉伸进行修正。
- **仓库与社区维护**：[PR #6795](https://github.com/HKUDS/nanobot/pull/6795) 将 `.nanobot/` 加入忽略列表；[PR #6799](https://github.com/HKUDS/nanobot/pull/6799) 更新微信群二维码，标题标注有效期至 12 月 2 日。

**进展判断**：本批改动覆盖执行层、数据层、提示词层和界面层，属于多点、渐进式质量提升；尚无证据表明完成了大型新能力交付。

## 3. 社区热点

提供的 Issue 合计 **4 条评论、全部 0 个 👍**；PR 评论数缺失，因此无法进行跨 Issue/PR 的完整热度排名。

1. **飞书群广播误唤醒：2 条评论，为样本中讨论最多的 Issue。**  
   在 `group_policy: "mention"` 下，单独的 `@所有人` 被当成对机器人的有效提及，导致公告引发无关回复。背后诉求是让助手正确理解群聊寻址语义，避免成为群内噪声源。  
   链接：[Issue #6801](https://github.com/HKUDS/nanobot/issues/6801)

2. **大图输入静默失败：1 条评论。**  
   约 4032×3024、4 MB 的 iPhone 照片触发提供商 502 后，系统据报告会不带图片静默重试。核心问题不仅是尺寸限制，还包括用户无法判断模型是否真正看到了图片。  
   链接：[Issue #6805](https://github.com/HKUDS/nanobot/issues/6805)

3. **希伯来语本地化与双向聊天：1 条评论。**  
   请求覆盖翻译和双向文本布局，并披露相关实现、测试和 PR 草拟工作由 AI 智能体完成。它同时反映了国际化需求和 AI 辅助贡献工作流，但尚不能据此确认实现已被接受。  
   链接：[Issue #6807](https://github.com/HKUDS/nanobot/issues/6807)

## 4. Bug 与稳定性

以下优先级为依据用户影响作出的分析判断，非维护者正式分级；样本未提供崩溃或安全漏洞报告。

| 优先级 | 问题与影响 | 状态 / Fix PR |
|---|---|---|
| **高** | 大图触发提供商错误后静默移除图片重试，可能让用户误判回答基于图像内容 | Issue 开放；样本内无 fix PR。[#6805](https://github.com/HKUDS/nanobot/issues/6805) |
| **较高** | 后台会话容量耗尽可阻塞普通前台命令，影响智能体工具可用性 | 已有关闭的 fix PR，合并状态未知。[#6798](https://github.com/HKUDS/nanobot/pull/6798) |
| **较高** | 多窗口归档操作可能相互覆盖，造成会话状态不符合用户操作意图 | 已有关闭的 fix PR，合并状态未知。[#6800](https://github.com/HKUDS/nanobot/pull/6800) |
| **中** | 飞书 `@所有人` 广播错误唤醒机器人并产生回复 | Issue 开放；样本内无 fix PR。[#6801](https://github.com/HKUDS/nanobot/issues/6801) |
| **低** | Markdown 表格中的 `<br>` 被显示为文字 | Issue 已关闭，关联 fix PR 已关闭。[Issue #6803](https://github.com/HKUDS/nanobot/issues/6803) / [PR #6804](https://github.com/HKUDS/nanobot/pull/6804) |
| **低** | 发送确认引发布局移动、会话切换导致文字或面板缩放 | 均已有关闭的 fix PR。[#6794](https://github.com/HKUDS/nanobot/pull/6794) / [#6793](https://github.com/HKUDS/nanobot/pull/6793) |

## 5. 功能请求与路线图信号

- **可配置图片尺寸上限与更强降采样**：直接关联视觉输入可靠性，值得优先评估；当前没有对应 PR，不能判断进入下一版本的概率。[Issue #6805](https://github.com/HKUDS/nanobot/issues/6805)
- **长粘贴文本自动转换为工作区文件**：针对日志、文章、配置和命令输出，减少对话刷屏及历史上下文膨胀。与近期精简运行时上下文、过滤空摘要的方向一致，但尚无实现记录。[Issue #6806](https://github.com/HKUDS/nanobot/issues/6806) · [PR #6796](https://github.com/HKUDS/nanobot/pull/6796) · [PR #6797](https://github.com/HKUDS/nanobot/pull/6797)
- **希伯来语与双向聊天支持**：需要同时验证翻译质量和左右混排体验，不能只视作补充语言字符串；所给数据中没有对应 PR。[Issue #6807](https://github.com/HKUDS/nanobot/issues/6807)
- **Lexmount 作为可选网页阅读器**：由该服务开发者关系人员提出，希望补充现有 Jina Reader 与本地提取路径。这属于外部集成提案，尚无维护者接纳或排期证据。[Issue #6802](https://github.com/HKUDS/nanobot/issues/6802)

**下一版本判断**：已有关闭 PR 的稳定性和 WebUI 修复，比尚无 PR 的新需求更接近可交付状态；但必须先核实合并记录与发布计划。

## 6. 用户反馈摘要

**由于未提供评论正文，以下仅归纳 Issue 描述中的使用反馈，不代替对评论观点或满意度的分析。**

- **真实照片输入应当可靠且透明**：上传成功并不代表视觉推理成功；用户需要明确知道图片是否被模型接收，避免无感降级。[#6805](https://github.com/HKUDS/nanobot/issues/6805)
- **群聊助手需要克制地参与**：公告广播不应自动转化为对机器人的提问，尤其是在已配置“被提及时回复”的情况下。[#6801](https://github.com/HKUDS/nanobot/issues/6801)
- **重度工作流需要更清洁的对话记录**：长日志、配置和文章更适合作为文件引用，而不是持续占据聊天正文。[#6806](https://github.com/HKUDS/nanobot/issues/6806)
- **基础呈现质量影响日常可用性**：Markdown 表格换行和双向语言布局都说明，用户需求已深入到内容可读性与本地化细节。[#6803](https://github.com/HKUDS/nanobot/issues/6803) · [#6807](https://github.com/HKUDS/nanobot/issues/6807)

没有足够证据判断整体满意度，或确认用户已验证上述修复有效。

## 7. 待处理积压

**无法识别长期未响应项**：本批 Issue 均创建于 2026-11-25，且没有完整历史列表、维护者回复时间或待审 PR 数据，不宜将其标为长期积压。

建议维护者优先跟进：

1. **确认大图静默重试的复现范围和失败提示策略**，先解决行为透明度，再评估尺寸配置与降采样方案。[#6805](https://github.com/HKUDS/nanobot/issues/6805)
2. **明确飞书广播与直接提及的判定规则**，并补充仅 `@所有人`、直接提及、混合提及的回归用例。[#6801](https://github.com/HKUDS/nanobot/issues/6801)
3. **为新需求给出初步处置结论**，区分接受、待设计和暂不支持，避免形成无明确方向的需求队列。[长文本文件化 #6806](https://github.com/HKUDS/nanobot/issues/6806) · [希伯来语支持 #6807](https://github.com/HKUDS/nanobot/issues/6807) · [可选阅读器 #6802](https://github.com/HKUDS/nanobot/issues/6802)
4. **核实关键关闭 PR 的最终去向及验证结果**，优先检查执行容量和归档一致性两项，避免将“关闭”误读为“已交付”。[#6798](https://github.com/HKUDS/nanobot/pull/6798) · [#6800](https://github.com/HKUDS/nanobot/pull/6800)

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-26**  
**项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)**

> **数据口径**：过去24小时共更新50条 Issue、50条 PR，并记录1个新版本。以下分析基于提供的30条 Issue、20条 PR 摘要；未展示条目、评论正文及完整发布说明不可核验。**开放 PR 代表修复提案，不代表已合并或已随版本交付。**

## 1. 今日速览

- 项目保持**高活跃度**：Issue 更新中49条为新开或活跃、1条关闭；PR 更新中49条待合并、1条合并或关闭，但仅凭单日快照无法判断积压是否持续增长。[Issues](https://github.com/NousResearch/hermes-agent/issues) · [PRs](https://github.com/NousResearch/hermes-agent/pulls)
- 可见研发重点偏向**稳定性治理**，集中在安装状态检测、Windows 桌面启动、SQLite 会话读取及消息平台可靠性，多项问题已出现对应修复 PR。[Windows 启动修复](https://github.com/NousResearch/hermes-agent/pull/160294) · [会话读取优化](https://github.com/NousResearch/hermes-agent/pull/160280)
- 高负载、长历史场景的资源成本值得关注：有用户报告空闲网关占用约半个 CPU 核心、持续大量读取；另一报告显示压缩会话单页读取产生约170 MB临时写入。这些是特定环境报告，不能直接外推至全部安装。[#160281](https://github.com/NousResearch/hermes-agent/issues/160281) · [#160277](https://github.com/NousResearch/hermes-agent/issues/160277)
- 功能侧继续向插件扩展、终端会话恢复及多智能体任务分流演进。整体呈现“**贡献活跃、修复提案响应较快，但交付闭环尚待确认**”的状态。[插件扩展接口](https://github.com/NousResearch/hermes-agent/pull/160269) · [Front Desk](https://github.com/NousResearch/hermes-agent/pull/160274)

## 2. 版本发布

### v0.23.4 Canary
- **标签**：`canary.20261125T064800Z-v0.23.4`
- **版本标识**：`v0.23.4+canary.20261125T064800Z`
- **发布说明日期**：2026-11-25；被本次日报数据窗口收录。
- **已知内容**：发布摘要包含 Hermes Desktop 下载表，能确认列出了 macOS Apple Silicon 的 DMG 入口。[发布页面](https://github.com/NousResearch/hermes-agent/releases/tag/canary.20261125T064800Z-v0.23.4)

**更新内容与迁移限制**：提供的发布说明在下载表处截断，无法核实功能清单、破坏性变更或官方迁移步骤，亦不能认定今日开放 PR 已包含在该 Canary 中。

**升级关注点**：Windows 用户应重点验证旧计划任务启动兼容性、Microsoft Store 安装后的环境一致性；相关问题已有报告，但不能据此认定该 Canary 必然受影响。[旧启动任务问题 #160293](https://github.com/NousResearch/hermes-agent/issues/160293) · [Store 虚拟环境问题 #160272](https://github.com/NousResearch/hermes-agent/issues/160272)

## 3. 项目进展

### 已交付进展：数据不足，暂不作合并结论

汇总显示有1条 PR“已合并/关闭”，但展示的20条 PR 均为 OPEN，因此**无法识别今日实际合并了什么，也无法量化已交付增量**。[PR 列表](https://github.com/NousResearch/hermes-agent/pulls)

可确认关闭的 Issue [#160278](https://github.com/NousResearch/hermes-agent/issues/160278) 是因未经账户所有者授权而撤回，**不是缺陷修复完成**，不应计入稳定性改善。

### 待合并进展：主要集中在修复与可靠性

| 方向 | 关键进展 | 当前状态 |
|---|---|---|
| 消息可靠性 | Telegram 缓冲事件在被网关接受前发生异常时重新保留，避免丢失 | [PR #160298](https://github.com/NousResearch/hermes-agent/pull/160298)，开放 |
| 会话性能 | 调整 SQLite 历史读取路径，避免跨会话谱系排序产生临时 B-tree | [PR #160280](https://github.com/NousResearch/hermes-agent/pull/160280)，开放 |
| Windows 可用性 | 兼容仍使用旧式登录任务启动器的安装 | [PR #160294](https://github.com/NousResearch/hermes-agent/pull/160294)，开放 |
| 上下文完整性 | 修复微压缩后批量压缩遗漏已折叠内容的问题 | [PR #160282](https://github.com/NousResearch/hermes-agent/pull/160282)，开放 |
| 会话发现与恢复 | `hermes sessions` 优先展示真实对话，减少空白 cron 记录干扰 | [PR #160285](https://github.com/NousResearch/hermes-agent/pull/160285)，开放 |
| 启动诊断 | 清理流程不再覆盖 launch authority 初始化的原始错误 | [PR #160279](https://github.com/NousResearch/hermes-agent/pull/160279)，开放 |

**判断**：修复储备较充足，但今日可确认的是“方案进入评审”，而非“问题已解决”。

## 4. 社区热点

可见 Issue 最高仅2条评论，PR 评论数为 `undefined`，不能据此排名；整体更像多点问题上报，而非集中争论。

1. **插件运行态文件导致反复重建**  
   [Issue #160196](https://github.com/NousResearch/hermes-agent/issues/160196)：2条评论，为展示列表最高。报告称 `members_stamp()` 未读取插件 `.gitignore`，插件在包目录写入运行态文件后触发无休止重建。背后诉求是明确区分“插件源码变化”和“运行数据变化”。

2. **多配置网关空闲资源占用**  
   [Issue #160281](https://github.com/NousResearch/hermes-agent/issues/160281)：1条评论。报告环境包含10个 profile、约9,600个会话及大量看板事件，空闲时仍占用约50%–70%单核 CPU、读取约110 MB/s。反映用户已将 Hermes 用于持续运行的多智能体工作流，性能需求超出轻量聊天场景。

3. **开发安装中的测试隔离冲突**  
   [#160199](https://github.com/NousResearch/hermes-agent/issues/160199)、[#160271](https://github.com/NousResearch/hermes-agent/issues/160271)：各1条评论，描述高度相关；后者报告72项 PM 测试失败。核心诉求是让常见的 `~/.hermes/hermes-agent` 开发目录布局兼容真实 home 目录保护机制，建议核查是否重复。

4. **异步任务结果应回到原聊天**  
   [Issue #160284](https://github.com/NousResearch/hermes-agent/issues/160284)：0评论、1个👍，是可见条目中唯一获得点赞的需求。用户希望关闭网页后，Kanban worker 的被动通知仍保存在原 Desktop/Web 聊天中，体现对任务上下文连续性的需求。

## 5. Bug 与稳定性

> 以下按潜在用户影响排序，属于分析优先级，不替代仓库的 P2/P3 标签。除另有说明，问题均为报告者描述。

| 关注级别 | 问题与影响 | Fix PR 状态 |
|---|---|---|
| **高：消息丢失** | Telegram 缓冲消息被取出后，若接受前发生非取消异常，可能丢失。[#160276](https://github.com/NousResearch/hermes-agent/issues/160276) | [#160298](https://github.com/NousResearch/hermes-agent/pull/160298)，开放 |
| **高：会话操作正确性** | compute-host 恢复路径可能在检查过期 turn 前执行副作用，取消并清理后继 turn；**仅代码阅读发现，未现场复现**。[#160289](https://github.com/NousResearch/hermes-agent/issues/160289) | 展示数据未见 |
| **高：启动与安装阻碍** | Windows 旧计划任务导致 Desktop 无法启动网关；Store v0.23.4 安装报告每次命令均提示 venv 与锁文件不一致。[#160293](https://github.com/NousResearch/hermes-agent/issues/160293) · [#160272](https://github.com/NousResearch/hermes-agent/issues/160272) | 前者有 [#160294](https://github.com/NousResearch/hermes-agent/pull/160294)；后者未见 |
| **高：资源消耗** | 多 profile 网关空闲高 CPU/I/O；压缩会话每120行分页产生约170.6 MB临时写入。[#160281](https://github.com/NousResearch/hermes-agent/issues/160281) · [#160277](https://github.com/NousResearch/hermes-agent/issues/160277) | 后者有 [#160280](https://github.com/NousResearch/hermes-agent/pull/160280)；前者未见直接对应修复 |
| **中高：长期在线失联** | macOS 合盖休眠期间 QQBot 消耗重连次数，达到上限后监听退出且不自动恢复。[#160270](https://github.com/NousResearch/hermes-agent/issues/160270) | 未见 |
| **中高：审批与恢复链路** | Telegram 审批卡限流后降级发送失败，被表现为用户未响应；cron 创建的私聊线程保留 `system:cron` 身份，阻断插件注入及自动恢复。[#160254](https://github.com/NousResearch/hermes-agent/issues/160254) · [#160241](https://github.com/NousResearch/hermes-agent/issues/160241) | 未见 |
| **中：安装检测与构建** | 插件运行态文件触发反复重建；开发安装、Nix 安装出现环境不同步误报。[#160196](https://github.com/NousResearch/hermes-agent/issues/160196) · [#160255](https://github.com/NousResearch/hermes-agent/issues/160255) · [#160249](https://github.com/NousResearch/hermes-agent/issues/160249) | 未见 |
| **中：功能入口失效** | Desktop 技能/插件选择器仍指向迁移后的旧文档地址，iframe 返回404；频道绑定技能不自动加载。[#160292](https://github.com/NousResearch/hermes-agent/issues/160292) · [#160217](https://github.com/NousResearch/hermes-agent/issues/160217) | 未见 |
| **中：状态可信度** | API 开启 session authority 后 `metrics_today` 保持0；Slack/Mattermost 图片全部拒绝时仍记录成功。[#160213](https://github.com/NousResearch/hermes-agent/issues/160213) · [#160210](https://github.com/NousResearch/hermes-agent/issues/160210) | 未见 |
| **中：错误诊断与部署** | 网关初始化清理掩盖原始异常；Pages 等待逻辑误判重复产物并超出等待预算。[#160264](https://github.com/NousResearch/hermes-agent/issues/160264) · [#160244](https://github.com/NousResearch/hermes-agent/issues/160244) | 分别有 [#160279](https://github.com/NousResearch/hermes-agent/pull/160279)、[#160283](https://github.com/NousResearch/hermes-agent/pull/160283)，均开放 |

**稳定性信号**：当前风险不仅是显式失败，还包括“消息已丢失但无提示”“未发送图片却记为成功”“审批投递失败却归因用户沉默”等状态失真，建议优先补充端到端回归覆盖。

## 6. 功能请求与路线图信号

| 需求或方向 | 当前信号 | 下一版本判断 |
|---|---|---|
| Kanban 通知回存原聊天 | [Issue #160284](https://github.com/NousResearch/hermes-agent/issues/160284) | 尚无可见实现 PR，交付时间不明 |
| Agent 提议回复草稿，Tab 接受、编辑后发送 | [Issue #160266](https://github.com/NousResearch/hermes-agent/issues/160266) | 需求阶段，暂无交付依据 |
| Desktop 清除按钮增加读屏名称 | [Issue #160237](https://github.com/NousResearch/hermes-agent/issues/160237) | 范围较明确，但未见实现 |
| OSC 7577 终端程序恢复协议 | [PR #160297](https://github.com/NousResearch/hermes-agent/pull/160297) | 已有跨交互终端实现提案，具备候选基础 |
| Front Desk 多智能体升级事件分流 | [PR #160274](https://github.com/NousResearch/hermes-agent/pull/160274) | 插件目录新增提案，指向编排与人工介入流程 |
| 外部执行插件公共接口 | [PR #160269](https://github.com/NousResearch/hermes-agent/pull/160269) | 扩展性方向明确，但包含多个独立接口，评审范围较广 |
| Python 3.15 兼容 | [PR #160273](https://github.com/NousResearch/hermes-agent/pull/160273) | 属于前置兼容工作；提案明确继续捆绑3.14，并非立即切换默认解释器 |

**路线图判断**：已有 PR 的方向比纯需求更接近交付，但数据不包含评审结论、里程碑或合并承诺，不能确认下一版本收录范围。

## 7. 用户反馈摘要

**未提供评论正文，以下仅提炼 Issue 描述中的用户反馈，不作情绪统计。**

- **长期运行场景正在暴露规模化成本**：多 profile、定时任务和共享看板让会话库、事件量持续增长，用户期待“空闲时真正安静”，而不是持续高 I/O。[#160281](https://github.com/NousResearch/hermes-agent/issues/160281)
- **跨平台安装体验不够一致**：Windows Store、旧 Windows 计划任务、Nix、开发 checkout 均出现安装或环境识别问题，提示安装状态判定需要区分不同部署模式。[#160272](https://github.com/NousResearch/hermes-agent/issues/160272) · [#160249](https://github.com/NousResearch/hermes-agent/issues/160249) · [#160255](https://github.com/NousResearch/hermes-agent/issues/160255)
- **用户需要连续、可追溯的异步协作**：关闭聊天页面不应丢失 worker 的通知；重启提示也应与系统实际自动恢复行为一致。[#160284](https://github.com/NousResearch/hermes-agent/issues/160284) · [#160235](https://github.com/NousResearch/hermes-agent/issues/160235)
- **通知噪声与内部文案外露影响体验**：后台进程每次完成都产生可见状态消息；Bot Chat 显示面向 agent 的定时任务提示语。[#160238](https://github.com/NousResearch/hermes-agent/issues/160238) · [#160239](https://github.com/NousResearch/hermes-agent/issues/160239)
- **缺少可核验的正向满意度反馈**：可见数据以缺陷与需求为主，不能因此推断整体用户不满意，也不能虚构用户好评。[Issue 列表](https://github.com/NousResearch/hermes-agent/issues)

## 8. 待处理积压

**无法确认“长期未响应”条目**：展示条目均创建于11月25日至26日，且没有完整维护者回复记录。以下是建议优先跟进的开放事项，而非已证实的长期积压。

1. **为高影响、暂无可见修复的问题明确负责人**：网关空闲高负载、Store 虚拟环境、QQBot 永久断连及 Telegram 审批失败，分别影响运行成本、安装体验和消息可达性。[#160281](https://github.com/NousResearch/hermes-agent/issues/160281) · [#160272](https://github.com/NousResearch/hermes-agent/issues/160272) · [#160270](https://github.com/NousResearch/hermes-agent/issues/160270) · [#160254](https://github.com/NousResearch/hermes-agent/issues/160254)
2. **优先复现潜在会话误取消**：对尚未现场复现的 successor turn 清理问题建立并发回归用例，确认真实触发条件。[#160289](https://github.com/NousResearch/hermes-agent/issues/160289)
3. **归并相关安装与测试报告**：核查两条 home I/O guard 报告的重复关系，同时避免将不同安装方式下的“out of sync”都归为同一根因。[#160199](https://github.com/NousResearch/hermes-agent/issues/160199) · [#160271](https://github.com/NousResearch/hermes-agent/issues/160271)
4. **推动已有 fix PR 完成验证闭环**：重点关注 Telegram 消息保留、SQLite 分页和 Windows 启动兼容，并在合并后明确回补版本与用户验证结果。[#160298](https://github.com/NousResearch/hermes-agent/pull/160298) · [#160280](https://github.com/NousResearch/hermes-agent/pull/160280) · [#160294](https://github.com/NousResearch/hermes-agent/pull/160294)

---

**总体结论**：Hermes Agent 的贡献活跃度较高，且多项新报告已有修复提案；但当前数据不足以证明这些修复已经交付。近期最值得关注的健康度指标，是高影响修复的合并与发布速度，以及长期运行场景下资源占用、消息可达性和状态报告准确性的改善。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-26**

## 1. 今日速览

过去 24 小时，NanoClaw 数据窗口内共有 **4 条 PR 更新，均处于待合并状态**；没有 Issue 更新、PR 合并/关闭或新版本发布。今日工作主要集中在**安全边界加固、消息投递可靠性与代理容器镜像维护**，属于以修复和维护为主的一天。开发侧有持续活动，但尚无已合并成果，不能将这些修复视为已进入主线或正式版本。社区讨论活跃度暂无法判断：PR 评论数均缺失，已提供的 👍 数均为 0。

> **数据口径说明**：报告按提供的“过去 24 小时”统计窗口整理，其中部分 PR 的更新日期为 11 月 25 日。项目标识为 `qwibitai/nanoclaw`，但 PR 链接字段指向 `nanocoai/nanoclaw`；下文按 PR 数据构造链接，仓库归属或重定向关系需另行核验。

## 2. 项目进展

**今日没有已合并或已关闭的重要 PR。** 当前进展主要体现为以下待审代码，尚未形成已落地交付：

| 待合并 PR | 推进方向 | 当前意义 |
|---|---|---|
| [#4574：校验 CLI 与镜像构建中的 apt/npm 包名](https://github.com/nanocoai/nanoclaw/pull/4574) | 将现有包名校验规则提取为共享函数，并覆盖更多输入与构建边界 | 提升输入校验的一致性，减少不同入口校验不完整的风险 |
| [#4573：强化容器出站编辑与提问的会话归属和宿主边界](https://github.com/nanocoai/nanoclaw/pull/4573) | 加固 `outbound.db` 到 `src/delivery.ts` 的不可信数据边界 | 防止受损容器干预宿主审批卡片、伪造宿主专属字段或利用提问 ID 冲突干扰审批 |
| [#4572：修复空闲容器停止时的消息丢失](https://github.com/nanocoai/nanoclaw/pull/4572) | 修复消息到达与容器停止之间的竞态 | 改善个人助手长期运行、间歇收消息场景下的可靠性 |
| [#4571：更新 agent-images 镜像映射](https://github.com/nanocoai/nanoclaw/pull/4571) | 将 `v2026.11.0` 对应的加固镜像更新为 `v2026.11.0-20261125T0659` | 推进运行镜像维护；不代表新增项目 Release |

**整体判断：** 工作方向与智能体系统的关键健康指标——隔离安全、审批可信度、消息不丢失——高度相关，但实际收益仍取决于后续审查、合并与发布。

## 3. 社区热点

由于 **4 条 PR 的评论数均为 `undefined`，👍 均为 0**，无法可靠评选“讨论最多”或“反应最强”的条目。以下仅按技术影响列出值得关注的议题，不代表社区热度排名：

- **容器与宿主之间的信任边界**：[PR #4573](https://github.com/nanocoai/nanoclaw/pull/4573)。其背后的工程诉求是确保容器输出不能越权影响宿主控制的审批流程；对具有工具调用和交互审批能力的助手尤为重要。
- **容器生命周期与消息投递一致性**：[PR #4572](https://github.com/nanocoai/nanoclaw/pull/4572)。关注点不是单纯的容器回收，而是回收过程不能导致用户消息静默丢失。
- **依赖安装入口的统一校验**：[PR #4574](https://github.com/nanocoai/nanoclaw/pull/4574)。体现了将安全规则从局部逻辑推广到共享基础设施的维护方向。

## 4. Bug 与稳定性

以下为基于 PR 摘要的**审阅优先级判断**，不是官方漏洞评级；数据未提供完整影响范围、利用条件或测试结果。

| 优先级 | 问题与潜在影响 | Fix PR 状态 |
|---|---|---|
| **高：安全边界** | 受损容器可能修改宿主生成的审批卡片、伪造宿主专属投递字段，或通过冲突的 `ask_question` ID 干扰既有审批。涉及审批完整性和跨边界信任。 | 已有 [#4573](https://github.com/nanocoai/nanoclaw/pull/4573)，**待合并** |
| **高：输入校验安全** | CLI 与镜像构建的部分入口需要补齐 apt/npm 包名校验。摘要不足以确认具体攻击路径及可利用程度。 | 已有 [#4574](https://github.com/nanocoai/nanoclaw/pull/4574)，**待合并** |
| **中高：消息可靠性** | 消息恰在空闲容器停止时到达，可能被静默丢失；摘要提及容器空闲超过 30 分钟绝对上限附近的触发场景。 | 已有 [#4572](https://github.com/nanocoai/nanoclaw/pull/4572)，**待合并** |

今日没有新增 Issue 层面的崩溃或回归报告。另有[镜像更新 PR #4571](https://github.com/nanocoai/nanoclaw/pull/4571)，但现有摘要不足以确定其具体修复了哪些漏洞，也不能据此判断其与上述修复存在依赖关系。

## 5. 功能请求与路线图信号

**没有可确认的新增用户功能请求。** 现有 PR 更支持以下短期方向判断：

- **优先加固安全边界**：包名校验和容器出站权限控制同时推进，显示当前维护重心偏向安全收敛，而非扩展新能力。相关：[#4574](https://github.com/nanocoai/nanoclaw/pull/4574)、[#4573](https://github.com/nanocoai/nanoclaw/pull/4573)。
- **改善长驻助手的运行可靠性**：消息丢失修复面向容器空闲回收与新消息到达交错的场景。相关：[#4572](https://github.com/nanocoai/nanoclaw/pull/4572)。
- **持续维护代理运行镜像**：机器人提交了加固镜像映射更新。相关：[#4571](https://github.com/nanocoai/nanoclaw/pull/4571)。

上述内容可视为**下一轮更新的候选项**，但没有合并记录、版本里程碑或发布时间承诺，不能确认会进入下一版本。

## 6. 用户反馈摘要

今日提供的数据中**没有 Issue 或 Issue 评论**，因此无法提炼可验证的用户评价、满意度或不满意点。

从修复描述只能识别出工程侧关注的使用风险，不能将其当作真实用户反馈：

- 间歇收消息的助手，需要避免容器回收导致消息无响应。相关：[#4572](https://github.com/nanocoai/nanoclaw/pull/4572)。
- 使用审批交互的助手，需要保证审批内容与会话归属不会被容器输出篡改。相关：[#4573](https://github.com/nanocoai/nanoclaw/pull/4573)。

## 7. 待处理积压

**没有足够证据识别长期未响应的积压。** 当前 4 条 PR 均于 11 月 25 日创建，不能视为长期搁置；评论数据缺失也不能解释为维护者未回应。

建议按以下顺序关注待审队列：

1. **先审安全边界修复**：重点核验跨会话访问、宿主字段保护、审批 ID 冲突，以及各包名输入入口的校验覆盖。相关：[#4573](https://github.com/nanocoai/nanoclaw/pull/4573)、[#4574](https://github.com/nanocoai/nanoclaw/pull/4574)。
2. **验证消息丢失修复的竞态测试**：重点覆盖消息到达与容器停止交错的情况。相关：[#4572](https://github.com/nanocoai/nanoclaw/pull/4572)。
3. **核验镜像更新兼容性与来源**：确认摘要固定的镜像与预期版本对应，并完成必要的运行验证。相关：[#4571](https://github.com/nanocoai/nanoclaw/pull/4571)。

**项目健康度结论：** 当前表现为“修复活动持续、交付仍待落地”。安全与稳定性工作的方向积极，但单日无合并、缺少讨论数据，尚不足以判断整体响应效率或社区健康趋势。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报
**日期：2026-11-26**  
**项目：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)**

> **数据口径**：本报告基于提供的“过去 24 小时更新”列表。20 条 PR 均标记为 `CLOSED`，无法据此区分“已合并”与“未合并关闭”；部分记录的更新时间为 11 月 25 日，统计窗口边界需进一步核验。下文将其称为“关闭 PR”，不将相关改动直接视为已发布功能。

## 1. 今日速览

LobsterAI 本批数据包含 **20 条关闭 PR、0 条 Issue 更新、0 个新版本发布**，呈现较高的开发处理活跃度，但缺少社区讨论数据。按标题分类，PR 包括 **11 项修复、8 项功能建设和 1 项重构**，工作主要围绕 DSH 运行时、IM 接入、Agent 管理和桌面工作区展开。最值得关注的是会话断连后的重复执行风险、旧配置升级启动失败，以及企业 IM 连接和定时消息投递问题的修复方案。整体呈现出 **DSH 功能整合与兼容性收敛并行**的状态，但合并情况、发布可用性和回归测试覆盖仍需核验。  
相关入口：[PR 列表](https://github.com/netease-youdao/LobsterAI/pulls) · [Issues](https://github.com/netease-youdao/LobsterAI/issues) · [Releases](https://github.com/netease-youdao/LobsterAI/releases)

## 2. 项目进展

### DSH 运行时：从连接恢复到插件生态

- **会话恢复补齐执行状态核对**：断连后优先重新认证并接回原后台，确认原进程退出后才启动替代进程；通过事件序号补齐回复，并用原请求 ID 核对消息是否已受理。这不仅处理连接恢复，也针对“是否可以安全重发”给出更谨慎的判断机制。  
  [#3204](https://github.com/netease-youdao/LobsterAI/pull/3204)

- **插件管理能力扩展**：新增插件列表、检查、安装、取消、移除、启停和注册源查询等生命周期接口，并区分原生、混合及纯 Web 插件，为扩展生态提供管理基础。  
  [#3202](https://github.com/netease-youdao/LobsterAI/pull/3202)

- **模型配置与接口兼容性加固**：调整模型思考级别元数据的解析与默认值，收紧未经验证的 reasoning 元数据暴露，并涉及 Codex Responses 兼容性。  
  [#3203](https://github.com/netease-youdao/LobsterAI/pull/3203)

### Agent 与记忆：降低创建、管理和发现成本

- **AI 辅助生成 Agent 草稿**：支持流式生成、取消及缺失描述的后台补全，并包含规则工具和设置改造。  
  [#3200](https://github.com/netease-youdao/LobsterAI/pull/3200)

- **记忆管理更加细粒度**：支持按 Agent 切换、按全局/项目范围筛选、分组展示和批量删除，同时清理旧 Dreaming 相关代码。  
  [#3201](https://github.com/netease-youdao/LobsterAI/pull/3201)

- **补齐 Agent 可见性与工作区登记**：让共享工作目录、没有会话的 Agent 也出现在列表中，并将既有 Agent 工作目录注册进工作区树。  
  [#3189](https://github.com/netease-youdao/LobsterAI/pull/3189) · [#3191](https://github.com/netease-youdao/LobsterAI/pull/3191)

### IM 与桌面工作流：权限、投递和文档体验同步推进

- **IM 权限配置趋向渠道化**：新增按渠道设置的权限预设、审批与提问转发，以及会话预设，有助于让远程聊天入口承接更完整的 Agent 执行流程。  
  [#3199](https://github.com/netease-youdao/LobsterAI/pull/3199)

- **办公文档与隐私设置调整**：引入隔离的 Word 面板，将 Word WASM 所需的执行权限限定在该面板，而非主渲染窗口；同时推进 Office 编辑器升级、工作区浏览器及独立“数据与隐私”设置页。  
  [#3186](https://github.com/netease-youdao/LobsterAI/pull/3186) · [#3185](https://github.com/netease-youdao/LobsterAI/pull/3185)

- **部署与迁移向 DSH 收敛**：备份迁移改为 DSH 专用 Manifest v3 流程，并注明兼容 DSH v2；运行时打包至 `app.asar`，浏览器设置移除旧引擎冗余选项。整体方向是减少多套历史路径并存的维护成本，但不能据此认定旧引擎支持已全面移除。  
  [#3190](https://github.com/netease-youdao/LobsterAI/pull/3190) · [#3196](https://github.com/netease-youdao/LobsterAI/pull/3196) · [#3193](https://github.com/netease-youdao/LobsterAI/pull/3193)

**进展判断**：本批改动横跨运行时、交互层、IM 和打包迁移，属于较大范围的整合与稳定性收敛；仅凭关闭数量，尚不能量化其实际交付完成度。

## 3. 社区热点

**当前无法建立可信的讨论热度排名**：所有 PR 的评论数均为 `undefined`，不能解释为零评论；所列 👍 均为 0，且没有 Issue 更新。因此，以下是技术关注点，而非已验证的社区热门话题。

| 关注点 | 背后诉求 | 相关 PR |
|---|---|---|
| 断连后的消息是否已执行 | 用户需要明确的送达和执行状态，避免重复触发任务 | [#3204](https://github.com/netease-youdao/LobsterAI/pull/3204) |
| 插件安装与管理 | 扩展能力需要统一管理入口和生命周期控制 | [#3202](https://github.com/netease-youdao/LobsterAI/pull/3202) |
| 企业 IM 中的权限与审批 | 聊天入口需要兼顾任务便利性与执行边界 | [#3199](https://github.com/netease-youdao/LobsterAI/pull/3199) |

## 4. Bug 与稳定性

以下为 **PR 描述披露的问题**，不等同于当日新增 Bug 报告。严重程度按潜在影响评估；均有对应修复 PR，但合并及发布状态未确认。

| 优先级 | 问题与影响 | Fix PR |
|---|---|---|
| **高** | **旧配置升级后可能启动退出**：部分 Windows 配置包含旧版 owned Agents，迁移写入触发 SQLite 所有权限制，可能在首个窗口出现前退出。 | [#3194，CLOSED](https://github.com/netease-youdao/LobsterAI/pull/3194) |
| **高** | **会话写入冲突与重复执行风险**：旧进程仍持有写入权时启动替代后台会中断回复；发送回执丢失则导致执行状态不明。 | [#3204，CLOSED](https://github.com/netease-youdao/LobsterAI/pull/3204) |
| **中高** | **企业微信订阅互斥与掉线不恢复**：相同 Bot ID 的客户端可能互相挤下线，初始连接失败后可能一直离线至重启。 | [#3188，CLOSED](https://github.com/netease-youdao/LobsterAI/pull/3188) |
| **中** | **定时提醒目标解析异常**：涉及 POPO 私聊、飞书接收者类型及钉钉私聊身份记录，影响自动提醒可靠性。 | [#3195，CLOSED](https://github.com/netease-youdao/LobsterAI/pull/3195) |
| **中** | **飞书话题会话连续性及定时投递问题**：需保留线程与根消息 ID，并将投递目标限定到所选机器人。 | [#3192，CLOSED](https://github.com/netease-youdao/LobsterAI/pull/3192) |
| **中** | **文件重命名后侧栏路径失同步**：已打开笔记继续引用旧路径，刷新出现保存错误，后续磁盘修改无法同步预览。 | [#3197，CLOSED](https://github.com/netease-youdao/LobsterAI/pull/3197) |
| **中** | **降级后的 Agent 协作配置兼容性**：涉及允许列表持久化、模式恢复与重启后选择稳定性。 | [#3187，CLOSED](https://github.com/netease-youdao/LobsterAI/pull/3187) |

**建议优先验证**：旧配置升级启动、断连后重发去重、多客户端 IM 抢占，以及定时消息目标解析。这些路径直接影响“能否启动、任务是否重复执行、通知是否可靠”。

## 5. 功能请求与路线图信号

本批没有用户功能请求 Issue，以下仅是从 PR 推断的方向，**不是官方路线图或下一版本承诺**。

- **插件生态管理**：生命周期接口与嵌入式插件界面同步推进，是较明确的平台扩展信号。  
  [#3202](https://github.com/netease-youdao/LobsterAI/pull/3202)
- **更低门槛的个性化 Agent**：草稿生成、描述补全、记忆分层管理共同指向更易配置的个人助手体验。  
  [#3200](https://github.com/netease-youdao/LobsterAI/pull/3200) · [#3201](https://github.com/netease-youdao/LobsterAI/pull/3201)
- **面向企业 IM 的可控执行**：渠道权限、审批转发和会话预设表明 IM 正从消息入口扩展为任务操作入口。  
  [#3199](https://github.com/netease-youdao/LobsterAI/pull/3199)
- **DSH 数据与部署体系统一**：迁移、设置和打包改动方向一致，后续版本值得重点关注备份恢复、旧配置兼容性和安装验证说明。  
  [#3190](https://github.com/netease-youdao/LobsterAI/pull/3190) · [#3196](https://github.com/netease-youdao/LobsterAI/pull/3196)

## 6. 用户反馈摘要

**没有可引用的 Issue 评论或真实用户评价**，无法判断满意度。PR 描述仅能间接反映以下使用痛点：

- **长任务需要连续性与确定性**：短暂断连不应中断回复，也不应让用户冒险重复发送任务。  
  [#3204](https://github.com/netease-youdao/LobsterAI/pull/3204)
- **升级不应阻断既有工作流**：旧配置启动失败、协作模式变化说明跨版本兼容值得重点验证。  
  [#3194](https://github.com/netease-youdao/LobsterAI/pull/3194) · [#3187](https://github.com/netease-youdao/LobsterAI/pull/3187)
- **IM 设置提示应符合实际运行行为**：移除已过时的“网关重启”提示，减少保存配置后的操作误导；这属于体验修正，不能视为用户满意度证据。  
  [#3198](https://github.com/netease-youdao/LobsterAI/pull/3198)

## 7. 待处理积压

**当前数据无法识别长期未响应的重要 Issue 或 PR。** 没有 Issue 更新、且所列 PR 均已关闭，并不代表仓库没有历史积压。  
核查入口：[开放 Issues](https://github.com/netease-youdao/LobsterAI/issues?q=is%3Aissue+is%3Aopen) · [开放 PR](https://github.com/netease-youdao/LobsterAI/pulls?q=is%3Apr+is%3Aopen)

维护者近期应优先跟踪：

1. **确认关键修复是否实际合并、进入哪个发布版本**，尤其是启动失败与会话重复执行风险。  
   [#3194](https://github.com/netease-youdao/LobsterAI/pull/3194) · [#3204](https://github.com/netease-youdao/LobsterAI/pull/3204)
2. **验证迁移修复链条**：#3194 描述明确关联 #3187 引入的迁移写入，建议覆盖旧配置、owned Agents、升级及降级组合。  
   [#3187](https://github.com/netease-youdao/LobsterAI/pull/3187) · [#3194](https://github.com/netease-youdao/LobsterAI/pull/3194)
3. **验证打包与备份流程的跨平台一致性**，避免运行时布局和归档规则调整后产生安装、资源定位或恢复异常。  
   [#3196](https://github.com/netease-youdao/LobsterAI/pull/3196) · [#3190](https://github.com/netease-youdao/LobsterAI/pull/3190)

**健康度结论**：开发处理活跃、修复覆盖面较广，且多项工作直接面向可靠性；但社区反馈、实际合并状态与版本交付证据不足。当前更适合评价为“积极整合与稳定性收敛中”，而不是“已完成稳定交付”。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报
**日期：2026-11-26**  
**项目：[moltis-org/moltis](https://github.com/moltis-org/moltis)**

## 1. 今日速览

根据提供的数据，Moltis 本次统计收录 **1 条新开 Issue、1 条待合并 PR**，未记录 PR 合并或关闭，也没有新版本发布，整体属于**低活跃度、小规模反馈与功能提案阶段**。新增问题聚焦于沙箱会话无法读取 PDF，反映了隔离执行与文档处理能力之间的缺口。待合并的语音转文字 PR 则尝试新增 Gemini 接入方式，但尚不能视为已交付功能。目前没有足够的评论、处理时延或历史趋势数据判断维护响应效率，也不能仅凭单日活动量认定项目健康度下降。相关条目：[Issue #1328](https://github.com/moltis-org/moltis/issues/1328)、[PR #1327](https://github.com/moltis-org/moltis/pull/1327)。

> **统计口径提醒：**概览将 PR #1327 计入过去 24 小时更新，但其创建与更新时间均标为 **2026-11-25**。本报将其作为本次数据收录的待合并进展，不认定为 11 月 26 日当天新增或更新。

## 2. 项目进展

### 尚无已合并成果，语音输入能力出现扩展提案
本次数据中，**没有已合并或已关闭的重要 PR**，因此无法确认今日已有功能或修复进入主分支。

待合并的 [PR #1327：新增 Gemini speech-to-text provider](https://github.com/moltis-org/moltis/pull/1327) 提出：
- 新增 `gemini` 语音转文字提供商。
- 按 PR 描述，使用 `gemini-3.5-transcribe` 模型转录语音消息，并通过 **Google AI Studio key** 接入。
- 与现有面向 **Google Cloud Speech-to-Text**、使用 Cloud key 的 `google` 提供商区分。

**进展判断：**该变更代表语音接入方向已有代码提案，而非仅有需求讨论；但仍处于 OPEN 状态，是否合并、何时发布及最终兼容性尚未确认。

## 3. 社区热点

本次样本没有形成可量化的“讨论热点”：Issue 评论数为 **0**，PR 评论数未提供，两个条目的 👍 均为 **0**。以下是值得关注的议题，而非按讨论热度验证的排名。

| 条目 | 互动情况 | 背后诉求 |
|---|---|---|
| [#1328：沙箱会话无法读取 PDF](https://github.com/moltis-org/moltis/issues/1328) | 0 评论、0 👍 | 用户希望智能体在隔离环境中仍能处理常见文档，避免会话执行环境限制实际任务能力。 |
| [#1327：Gemini 语音转文字支持](https://github.com/moltis-org/moltis/pull/1327) | 评论数缺失、0 👍 | 区分 Google AI Studio 与 Google Cloud 的接入路径，为语音消息转录增加可选提供商。 |

两个条目均由 **clement-songis** 提交，本次可见参与者较集中，不能据此推断整个社区的参与规模。

## 4. Bug 与稳定性

### 中等影响：沙箱会话无法提取 PDF 文本
**条目：**[Issue #1328](https://github.com/moltis-org/moltis/issues/1328)  
**状态：**OPEN；**关联 fix PR：**本次数据中未见。

- **触发条件：**会话运行在 Docker 或 Podman 沙箱中，使用 `Read` 工具读取 PDF。
- **表现：**工具返回 `unsupported_in_sandbox`，提示沙箱会话不支持 PDF 和图像处理；提交者称文本提取目前仅在宿主机执行。
- **影响：**阻断沙箱内的 PDF 阅读及后续文档问答任务。摘要还提及 Discord、Telegram、WhatsApp 等渠道会话，但未提供完整影响范围。
- **定性：**更接近明确的能力限制或执行环境兼容性缺口；现有数据不足以认定为近期回归、崩溃或数据丢失问题。

**维护建议：**优先明确这是设计限制还是待补齐能力，并补充受影响会话类型及可行处理路径。现有返回信息同时提及图像处理，但本条直接报告的是 PDF 文本读取问题，不宜扩大为已验证的图像故障。

## 5. 功能请求与路线图信号

### 较明确的候选方向：增加 Gemini 转录提供商
[PR #1327](https://github.com/moltis-org/moltis/pull/1327) 已提供实现提案，是当前最具体的功能推进信号。若通过评审并合并，可能扩展语音消息转录的接入选择；但没有发布计划或里程碑信息，**不能确认会进入下一版本**。

### 尚处需求阶段：补齐沙箱文档处理能力
[Issue #1328](https://github.com/moltis-org/moltis/issues/1328) 指向“隔离运行与文档理解兼得”的需求。目前未见关联实现或修复 PR，其优先级、技术方案和交付时间均未明确。

## 6. 用户反馈摘要

**当前没有可供提炼的 Issue 评论。**以下仅来自 [Issue #1328 的提交正文摘要](https://github.com/moltis-org/moltis/issues/1328)，不代表社区共识：

- **真实痛点：**智能体虽能在沙箱中运行，却无法读取 PDF 文本，文档任务因此中断。
- **使用场景：**Docker/Podman 隔离会话，以及摘要中提及的消息渠道会话。
- **不满意之处：**PDF 文本提取只在宿主机可用，导致不同运行环境的能力不一致。
- **满意度信息：**未提供正向评价、使用成效或修复后反馈，无法评估整体满意度。

## 7. 待处理积压

本次数据**不足以识别长期未响应的重要积压**：Issue 刚于当日创建，PR 创建于前一日，均不应被标为长期搁置。

| 待处理项 | 当前状态 | 建议关注点 |
|---|---|---|
| [Issue #1328](https://github.com/moltis-org/moltis/issues/1328) | OPEN，0 评论 | 首次分诊，确认能力边界、影响范围及是否计划修复。 |
| [PR #1327](https://github.com/moltis-org/moltis/pull/1327) | OPEN，评论数据缺失 | 评审新提供商的配置区分、模型调用及测试覆盖；不能将评论字段缺失视为无人响应。 |

**综合判断：**本次可见动态体现出“沙箱能力补齐”和“语音提供商扩展”两条方向，但尚无合并或发布成果。后续最值得观察的是 PDF 问题能否获得明确分诊，以及 Gemini 转录 PR 能否完成评审并落地。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报
**日期：2026-11-26｜统计范围：所提供的过去 24 小时 GitHub 数据**

> **口径说明**：项目名称沿用 CoPaw，但数据中的仓库路径为 `agentscope-ai/QwenPaw`，下文链接据此生成。部分记录更新时间为 11 月 25 日，按所给统计窗口纳入，不统一视为今日新建。PR 评论数缺失，且未提供评论正文，因此不推断 PR 讨论热度或引用用户评论。

## 1. 今日速览

过去 24 小时共更新 **12 条 Issue、18 条 PR**，其中 10 条 Issue 与 17 条 PR 仍处于开放状态，贡献侧活跃度较高。工作重点集中在 **代码模式工具调用、结构化输出容错、Creator 数据处理，以及模型与第三方 Agent 接入**，说明能力扩展与稳定性补强正在并行推进。当前仅有 1 条 PR 标记为关闭，无法确认是否合并；另有 2 条 Bug Issue 以“关闭后稍后复审”状态结束，不能据此视为已修复。今日无新版本发布，整体呈现 **提交活跃、待审变更多、交付成果尚待确认** 的状态。

## 2. 项目进展

### 已关闭事项：尚不能确认新增交付

| 事项 | 当前状态与意义 |
|---|---|
| [PR #8900：离线预检释放环境锁](https://github.com/agentscope-ai/QwenPaw/pull/8900) | 标记为 **CLOSED**，标题指向插件离线预检中的环境锁处理；摘要缺少有效实现说明，且没有合并信息，不能确认已进入主干。 |
| [Issue #8919：视频记忆图合并遇到空值或非字符串时崩溃](https://github.com/agentscope-ai/QwenPaw/issues/8919) | 已关闭，但带有 `Close-and-review-later` 标记；应视为暂缓复审，而非修复完成。 |
| [Issue #8918：视频分段可能超过最大时长](https://github.com/agentscope-ai/QwenPaw/issues/8918) | 同样以 `Close-and-review-later` 关闭，数据中未见对应修复 PR。 |

### 待合并进展：核心故障已有补丁，扩展能力仍在评审

- **代码模式工具链修复**：[PR #8923](https://github.com/agentscope-ai/QwenPaw/pull/8923) 针对 `run_tool_batch` 无法访问工具目录、内部调用报 `ToolNotFoundError` 的问题提交修复，对应 [Issue #8903](https://github.com/agentscope-ai/QwenPaw/issues/8903)。这是本期最直接影响 Agent 执行能力的进展之一。
- **自定义决策模型接入**：[PR #8928](https://github.com/agentscope-ai/QwenPaw/pull/8928) 拟打通自定义模型被选为默认决策模型的解析链路，扩展现有模型配置能力。
- **数据应用与外部 Agent 集成**：[PR #8924](https://github.com/agentscope-ai/QwenPaw/pull/8924) 拟迁移至 QwenPaw-Data 0.4.1 并采用官方 Console 嵌入；[PR #8922](https://github.com/agentscope-ai/QwenPaw/pull/8922) 拟新增 Antigravity CLI 的 ACP harness 插件。两者均为 `size/XXXL`，需要重点验证集成与回归风险。

**推进判断**：当前可确认的是修复方案与新能力提案持续形成，而非已发布能力显著增加；实际推进幅度仍取决于评审、合并和后续发布。

## 3. 社区热点

本期 Issue 的可见讨论量整体较低：**最高 2 条评论，其余均为 1 条，👍 均为 0**。因此，更适合观察问题聚集方向，而不是认定存在广泛社区共识。

| 热点 | 可见信号 | 背后诉求 |
|---|---|---|
| [#8903：代码模式批量工具调用失败](https://github.com/agentscope-ai/QwenPaw/issues/8903) | 2 条评论，为本期 Issue 最高；已有 [修复 PR #8923](https://github.com/agentscope-ai/QwenPaw/pull/8923) | 用户需要代码模式保留完整工具访问能力，避免批量执行链路中断。 |
| [#8929：MCP 配置页增加 Header 表单](https://github.com/agentscope-ai/QwenPaw/issues/8929) | 1 条评论；暂未见对应 PR | 带认证的 MCP 接入仍需切换到原生 JSON，图形界面的配置覆盖度不足。 |
| [#8925：pytest-xdist 收集失败](https://github.com/agentscope-ai/QwenPaw/issues/8925) | 1 条评论；已有 [修复 PR #8926](https://github.com/agentscope-ai/QwenPaw/pull/8926) | 开发者需要可重复、可并行运行的契约测试，减少测试基础设施阻塞。 |
| [#8914：结构化 JSON 提取失败](https://github.com/agentscope-ai/QwenPaw/issues/8914)、[#8916：视频记忆 JSON 误解析](https://github.com/agentscope-ai/QwenPaw/issues/8916) | 同一贡献者集中报告多项边界问题 | 反映对 LLM 输出中说明文字、括号干扰和不规范数据的容错需求；不等同于多用户集中投诉。 |

## 4. Bug 与稳定性

以下按**潜在影响**排序，非维护者官方严重性评级；所有开放修复 PR 均尚不能视为已上线。

| 优先级 | 问题与潜在影响 | 修复状态 |
|---|---|---|
| **高：数据正确性** | [#8904](https://github.com/agentscope-ai/QwenPaw/issues/8904)：JSON Pointer 接受负数中间索引，可能静默写入错误的数组元素。 | 已有开放 [PR #8905](https://github.com/agentscope-ai/QwenPaw/pull/8905)，拟严格校验数组索引。 |
| **高：核心执行受阻** | [#8903](https://github.com/agentscope-ai/QwenPaw/issues/8903)：代码模式 `run_tool_batch` 内部工具调用失败。 | 已有开放 [PR #8923](https://github.com/agentscope-ai/QwenPaw/pull/8923)。 |
| **高：特定链路崩溃** | [#8912](https://github.com/agentscope-ai/QwenPaw/issues/8912)：飞书消息内容为合法但非对象 JSON 时触发 `AttributeError`。 | 已有开放 [PR #8913](https://github.com/agentscope-ai/QwenPaw/pull/8913)。 |
| **高：特定链路崩溃** | [#8919](https://github.com/agentscope-ai/QwenPaw/issues/8919)：视频记忆图合并对空值或非字符串主题处理不健壮。 | Issue 已关闭、待复审；未见 fix PR。 |
| **中高：会话持续失败** | [PR #8920](https://github.com/agentscope-ai/QwenPaw/pull/8920) 报告历史视频工具结果可能重新引入媒体，导致后续模型请求持续收到通用 400 错误。 | 开放 PR 拟在满足条件时去除媒体重试一次。 |
| **中高：回答丢失** | [#8906](https://github.com/agentscope-ai/QwenPaw/issues/8906)：首个空文本块导致后续真实回答被忽略。 | 已有开放 [PR #8907](https://github.com/agentscope-ai/QwenPaw/pull/8907)。 |
| **中：结构化输出解析** | [#8914](https://github.com/agentscope-ai/QwenPaw/issues/8914)、[#8916](https://github.com/agentscope-ai/QwenPaw/issues/8916)：正文中的额外括号可能造成 JSON 提取失败或取错内容。 | 分别对应开放 [PR #8915](https://github.com/agentscope-ai/QwenPaw/pull/8915)、[PR #8917](https://github.com/agentscope-ai/QwenPaw/pull/8917)。 |
| **中：工具参数兼容性** | [#8910](https://github.com/agentscope-ai/QwenPaw/issues/8910)：字符串类型判断遗漏 `allOf`，导致受约束字段未执行字符串转换。 | 已有开放 [PR #8911](https://github.com/agentscope-ai/QwenPaw/pull/8911)。 |
| **中：测试阻塞** | [#8925](https://github.com/agentscope-ai/QwenPaw/issues/8925)：不同 xdist worker 的参数顺序不一致，测试尚未运行即中止。 | 已有开放 [PR #8926](https://github.com/agentscope-ai/QwenPaw/pull/8926)。 |
| **中：部署可用性** | [PR #8902](https://github.com/agentscope-ai/QwenPaw/pull/8902)：Docker 忽略规则剔除 MCP 前端资源，可能出现后端可用但界面无法加载。 | 修复 PR 开放中。 |
| **中低：输出约束与数据清洗** | [#8918](https://github.com/agentscope-ai/QwenPaw/issues/8918)：视频分段可能超过时长上限；[#8908](https://github.com/agentscope-ai/QwenPaw/issues/8908)：空关键词被转为字面量 `"None"`。 | 前者关闭待复审、未见 fix PR；后者已有开放 [PR #8909](https://github.com/agentscope-ai/QwenPaw/pull/8909)。 |

另外，[PR #8927](https://github.com/agentscope-ai/QwenPaw/pull/8927) 拟减少成功关闭测试中的时序偶发失败，可作为测试稳定性治理的补充信号。

## 5. 功能请求与路线图信号

| 方向 | 当前证据 | 后续判断 |
|---|---|---|
| **MCP 认证配置表单化** | [Issue #8929](https://github.com/agentscope-ai/QwenPaw/issues/8929) 请求增加 Header 表单。 | 用户需求明确，但尚无对应 PR，不能判断是否进入下一版本。 |
| **自定义决策模型端点** | [PR #8928](https://github.com/agentscope-ai/QwenPaw/pull/8928) 已提交实现。 | 已进入代码评审候选阶段，比纯需求更接近交付，但未有发布承诺。 |
| **可诊断、可恢复的记忆索引** | [PR #8921](https://github.com/agentscope-ai/QwenPaw/pull/8921) 拟解释索引不健康原因并提供重建入口。 | 指向个人助手长期运行中的可维护性，减少“加载失败—重试”的无效循环。 |
| **外部 Agent 运行后端扩展** | [PR #8922](https://github.com/agentscope-ai/QwenPaw/pull/8922) 新增可选 ACP harness。 | 是后端生态扩展信号，不应解读为完整前端产品集成。 |
| **数据应用升级** | [PR #8924](https://github.com/agentscope-ai/QwenPaw/pull/8924) 固定 QwenPaw-Data 依赖为 0.4.1。 | 属于待合并的组件升级，不是 CoPaw 今日新版本发布。 |

## 6. 用户反馈摘要

**以下依据 Issue 描述与 PR 问题说明提炼，不代表对评论正文的分析。**

- **“有界面，但关键配置仍要手写”**：MCP Header 认证需求说明，用户希望在 Console 内完成真实服务接入，而非返回 JSON 编辑器。[Issue #8929](https://github.com/agentscope-ai/QwenPaw/issues/8929)
- **“高级执行模式不能削弱基础能力”**：代码模式中的批量工具调用失败，会直接影响多工具任务执行。[Issue #8903](https://github.com/agentscope-ai/QwenPaw/issues/8903)
- **“失败后需要恢复路径”**：记忆索引不可用时，笼统的 503 与“重试”提示无法帮助用户自助排障。[PR #8921](https://github.com/agentscope-ai/QwenPaw/pull/8921)
- **“长对话阅读应保持位置稳定”**：新增轮次、重载历史及折叠推理卡片时的视口锚定，以及“回到最新”行为，正在由 [PR #8901](https://github.com/agentscope-ai/QwenPaw/pull/8901) 改进。
- **正向满意度证据不足**：当前样本以故障和改进诉求为主，不能据此推导整体用户满意度；集中出现的 JSON 容错问题更适合作为质量治理线索。[Issue #8914](https://github.com/agentscope-ai/QwenPaw/issues/8914)、[Issue #8916](https://github.com/agentscope-ai/QwenPaw/issues/8916)

## 7. 待处理积压与维护提醒

本批记录主要来自 11 月 25—26 日，且缺少维护者响应时间，**无法识别真正“长期未响应”的积压**。建议优先关注以下待审事项：

1. **优先评审可能造成静默错误或执行中断的补丁**：JSON Pointer 错写修复 [#8905](https://github.com/agentscope-ai/QwenPaw/pull/8905)、代码模式工具调用修复 [#8923](https://github.com/agentscope-ai/QwenPaw/pull/8923)、空文本吞掉回答修复 [#8907](https://github.com/agentscope-ai/QwenPaw/pull/8907)。
2. **为关闭待复审问题保留明确跟踪入口**：[#8918](https://github.com/agentscope-ai/QwenPaw/issues/8918)、[#8919](https://github.com/agentscope-ai/QwenPaw/issues/8919) 的关闭状态不应掩盖尚未确认修复的风险。
3. **为超大 PR 明确验收边界**：数据应用迁移 [#8924](https://github.com/agentscope-ai/QwenPaw/pull/8924) 与 ACP harness [#8922](https://github.com/agentscope-ai/QwenPaw/pull/8922) 均需独立的集成验证，避免评审压力集中。
4. **及时承接首次贡献者**：[#8928](https://github.com/agentscope-ai/QwenPaw/pull/8928)、[#8923](https://github.com/agentscope-ai/QwenPaw/pull/8923) 均带首次贡献者标签，清晰的评审反馈有助于留住新增贡献力量。

**健康度结论**：本期贡献输入活跃，且多项 Bug 已形成对应补丁，这是积极信号；但 17 条开放 PR 与未确认的合并结果意味着，下一步应重点观察高影响修复的落地速度，而非仅看提交数量。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-26｜统计范围：所提供的过去 24 小时 GitHub 数据**

## 1. 今日速览

今日共有 **2 条 Issue、7 条 PR 更新**，全部处于开放状态，**没有 PR 合并或关闭，也没有新版本发布**。开发活动集中在 OIDC 凭证生命周期、Docker Shell 运行时清理、配置界面帮助信息，以及 v1.0 路线图治理，按提交数量看较活跃，但尚未形成已合并交付。安全与稳定性是主要关注点，其中 Docker 命令超时后仍可能继续运行的问题值得优先审查。社区讨论信号较弱：已提供的 Issue 中仅路线图有 **1 条评论、1 个 👍**，PR 评论数据缺失，不能据此判断讨论热度。

## 2. 项目进展

### 已交付进展
**今日无已合并或关闭的重要 PR。** 因此，下述变化均属于待审查、待合并的工作，不能视为主分支已具备的能力。

### 在途开发

| 方向 | 主要进展 | 状态与意义 |
|---|---|---|
| OIDC 凭证生命周期 | [#12716](https://github.com/zeroclaw-labs/zeroclaw/pull/12716) 增加刷新与撤销请求；[#12717](https://github.com/zeroclaw-labs/zeroclaw/pull/12717) 推进刷新授权的守护进程持有、封装与证书账本存储 | 两项均待合并，且 #12717 依赖 #12716。前者明确尚未接入调用或存储，不能视为完整功能落地 |
| Docker Shell 清理 | [#12714](https://github.com/zeroclaw-labs/zeroclaw/pull/12714) 为调用分配唯一容器名，在超时或取消后删除对应容器 | 旨在解决仅终止本地 Docker CLI、后台命令却继续执行的问题 |
| 配置界面可用性 | [#12718](https://github.com/zeroclaw-labs/zeroclaw/pull/12718) 在 Schema 路径查询失败时保留字段帮助信息 | 改善包含自然键的列表配置项的说明展示 |
| 路线图与版本治理 | [#12713](https://github.com/zeroclaw-labs/zeroclaw/pull/12713) 将路线图指向固定 tracker，并明确 pre-1.0 版本规则 | 缓解原先按版本号规划的阶段与实际交付不一致的问题 |
| 开发与依赖维护 | [#12715](https://github.com/zeroclaw-labs/zeroclaw/pull/12715) 统一 PR review skill；[#12711](https://github.com/zeroclaw-labs/zeroclaw/pull/12711) 为四个特定重复依赖版本添加检查例外 | 分别减少审查入口重复、处理依赖升级触发的检查失败；后者并非漏洞修复 |

**整体判断：** 今日推进主要体现在方案拆分与实现提交，而非交付完成。OIDC 两项 PR 标记为 L/XL，Docker 修复也为 XL，审查与验证负担值得关注。

## 3. 社区热点

### v1.0 路线图是当前唯一可量化的讨论焦点
[#12712：Roadmap to v1.0.0](https://github.com/zeroclaw-labs/zeroclaw/issues/12712) 获得 **1 条评论、1 个 👍**，是所给 Issue 中互动最多的一项。其目标是集中说明发布顺序、目标日期与各版本用途，并替代旧架构文档中的版本计划。

背后的诉求是**提高发布预期的可信度**：配套 [PR #12713](https://github.com/zeroclaw-labs/zeroclaw/pull/12713) 指出，既有阶段划分已与实际版本交付不完全吻合。不过，目前未提供路线图完整正文，无法列出具体发布日期或承诺范围。

### 工程关注度不等于社区热度
[Docker 清理修复 #12714](https://github.com/zeroclaw-labs/zeroclaw/pull/12714) 与 [OIDC 存储实现 #12717](https://github.com/zeroclaw-labs/zeroclaw/pull/12717) 影响较大，但 PR 评论字段为 `undefined`、点赞均为 0，**没有足够数据将其认定为社区热议事项**。

## 4. Bug 与稳定性

以下按潜在影响排序；除明确标注的 S2 外，其余顺序为本日报依据摘要作出的风险判断，并非项目官方定级。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **优先关注：运行时隔离与清理** | Docker Shell 超时或取消后，只杀死本地 CLI 可能留下仍在运行、且具备工作区写权限的容器命令。任务停止与实际执行状态不一致，存在持续修改文件的风险 | 已有 [fix PR #12714](https://github.com/zeroclaw-labs/zeroclaw/pull/12714)，待合并 |
| **S2：构建验证可靠性** | Containerfile 的 `check` 阶段在 StageX 镜像中测试失败，且没有工作流构建该阶段，使其“通过标准单一事实来源”的定位缺乏 CI 验证 | [Issue #12710](https://github.com/zeroclaw-labs/zeroclaw/issues/12710) 开放，0 评论；所给数据未见对应 fix PR |
| **配置界面体验问题** | Schema 查询遇到自然键路径时丢失字段说明，影响复杂配置项的理解与填写 | 已有 [fix PR #12718](https://github.com/zeroclaw-labs/zeroclaw/pull/12718)，待合并 |

上述事项中，相关记录部分创建于 11 月 25 日，应理解为**本次日报窗口内跟踪的问题**，而非全部于 26 日首次报告。数据中未见明确的崩溃或新增回归报告。

## 5. 功能请求与路线图信号

- **OIDC 刷新授权管理是最清晰的新能力方向。** [#12716](https://github.com/zeroclaw-labs/zeroclaw/pull/12716) 和 [#12717](https://github.com/zeroclaw-labs/zeroclaw/pull/12717) 已形成分层实现，说明工作从架构意图进入代码审查阶段。但存在堆叠依赖，且尚未证明完整调用链已接通，不能认定下一版本必然包含该能力。
- **v1.0 规划正在集中化。** [Tracker #12712](https://github.com/zeroclaw-labs/zeroclaw/issues/12712) 与 [文档 PR #12713](https://github.com/zeroclaw-labs/zeroclaw/pull/12713) 表明项目希望用持续维护的跟踪项管理路线图，而不是继续依赖已经偏离实际交付的旧版本阶段表。
- **修复类改动已有实现候选。** [配置帮助修复 #12718](https://github.com/zeroclaw-labs/zeroclaw/pull/12718) 体量为 XS，较便于独立审查；[Docker 清理 #12714](https://github.com/zeroclaw-labs/zeroclaw/pull/12714) 风险收益更高，但改动为 XL。两者均无已提供的目标版本或合并承诺。

本批数据未提供独立的终端用户新功能请求，以上主要是维护者与贡献者的开发信号。

## 6. 用户反馈摘要

**未提供 Issue 评论正文，无法提炼真实用户评价、满意度或评论中的使用场景。** 路线图虽有 1 条评论，也不能推断其支持或反对的具体内容。

从问题描述与 PR 摘要只能识别出以下使用痛点，不能将其当作用户评论原话：

- **工具执行停止不彻底：** 运行 Docker Shell 的智能体任务在超时或取消后，需要确保工作区不再被后台命令修改。见 [#12714](https://github.com/zeroclaw-labs/zeroclaw/pull/12714)。
- **配置解释缺失：** 使用复杂模型路由等配置时，字段帮助丢失会降低配置可理解性。见 [#12718](https://github.com/zeroclaw-labs/zeroclaw/pull/12718)。
- **本地与 CI 验证可信度不足：** 开发者需要真正可执行、且持续受 CI 检验的确定性检查入口。见 [#12710](https://github.com/zeroclaw-labs/zeroclaw/issues/12710)。

## 7. 待处理积压

**本次样本均为 11 月 25—26 日创建，无法识别长期未响应的历史积压。** 当前更适合列为短期跟进清单：

1. **先审查 Docker 超时清理边界。** 建议重点验证取消、超时及异常路径下容器是否确实退出，避免仅停止客户端进程。关联：[PR #12714](https://github.com/zeroclaw-labs/zeroclaw/pull/12714)。
2. **为 StageX 检查问题明确负责人及修复路径。** 当前 Issue 无评论，所给数据未见配套修复；应同时关注测试失败和 CI 未覆盖两个问题。关联：[Issue #12710](https://github.com/zeroclaw-labs/zeroclaw/issues/12710)。
3. **按依赖顺序审查 OIDC 堆叠 PR。** 先确认底层刷新与撤销请求，再审查持有及存储实现，避免重复审查基底提交。关联：[#12716](https://github.com/zeroclaw-labs/zeroclaw/pull/12716)、[#12717](https://github.com/zeroclaw-labs/zeroclaw/pull/12717)。
4. **保持路线图与文档同步。** tracker 与文档修改尚未全部完成，应避免新旧版本规划并存造成歧义。关联：[#12712](https://github.com/zeroclaw-labs/zeroclaw/issues/12712)、[#12713](https://github.com/zeroclaw-labs/zeroclaw/pull/12713)。

**健康度结论：** 项目呈现积极的开发投入和安全治理意识，但今日交付转化尚未发生。短期最重要的是将运行时清理修复、构建验证缺口与 OIDC 大型变更转化为经过验证的合并成果；现有数据不足以判断长期响应效率或整体积压趋势。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*