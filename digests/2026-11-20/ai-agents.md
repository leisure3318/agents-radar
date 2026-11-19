# OpenClaw 生态日报 2026-11-20

> Issues: 22 | PRs: 60 | 覆盖项目: 13 个 | 生成时间: 2026-11-19 17:22 UTC

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
**日期：2026-11-20｜统计口径：所提供的过去 24 小时 GitHub 更新数据**

> **数据边界**：明细更新时间主要为 11 月 19 日；60 条 PR 中仅提供了 30 条，且评论数字段均为 `undefined`。PR 的 `CLOSED` 不等于已合并，Issue 关闭也不必然表示修复已发布。以下据此区分“报告、提案、关闭与交付”，不推断缺失状态。

## 1. 今日速览

过去 24 小时，OpenClaw 有 **22 条 Issue 更新、60 条 PR 更新和 1 个版本发布记录**，项目开发与问题处理活跃度较高。工作重心集中在 **2026.11.5 升级链路、Gateway 生命周期、认证可靠性和智能体会话管理**，同时继续推进 Web UI、模型接入和性能优化。稳定性压力仍然突出：当前明细包含 **1 个开放 P0、6 个开放 P1**，涉及升级阻断、凭据失效、消息阻塞及记忆搜索不可用。整体呈现“高活跃、修复提案密集，但关键风险尚未完成交付验证”的状态。  
[项目仓库](https://github.com/openclaw/openclaw)

| 指标 | 过去 24 小时 |
|---|---:|
| Issue 更新 | 22：新开/活跃 18，已关闭 4 |
| PR 更新 | 60：待合并 30，已合并/关闭 30 |
| 新版本记录 | 1 |
| 已提供明细中的开放高优先级 Issue | P0：1；P1：6 |

## 2. 版本发布

### v2026.11.10-beta.1：智能体模板分发进一步产品化

已提供的发布说明明确披露：

- **Agent templates**：支持直接从 ClawHub 包添加智能体，通过单一 `CLAW.md` 清单及随包技能目录组织内容，并接入原生信任检查流程。这有助于降低智能体配置与技能组合的安装成本，同时为第三方模板提供统一的信任入口。  
  [发布页](https://github.com/openclaw/openclaw/releases/tag/v2026.11.10-beta.1) · [#195707](https://github.com/openclaw/openclaw/pull/195707) · [#196322](https://github.com/openclaw/openclaw/pull/196322) · [#196348](https://github.com/openclaw/openclaw/pull/196348)
- **OpenClaw ID**：发布说明出现相关亮点，但正文截断于“connect nodes thr”，无法确认其完整能力、适用范围或配置要求。  
  [发布页](https://github.com/openclaw/openclaw/releases/tag/v2026.11.10-beta.1)

**破坏性变更与迁移注意事项：**
当前摘要不足以确认是否存在破坏性变更，不能据此判定“无破坏性变更”。生产用户升级前应核对完整说明，尤其关注现有升级链路中的遗留 Gateway 锁、SQLite 迁移兼容性和服务重启问题；这些是当前报告的风险，**并非已确认由该 Beta 引入**。  
[锁恢复 #201472](https://github.com/openclaw/openclaw/issues/201472) · [SQLite 迁移 #201530](https://github.com/openclaw/openclaw/issues/201530) · [重启修复提案 #201906](https://github.com/openclaw/openclaw/pull/201906)

## 3. 项目进展

以下重要 PR 今日状态为 **CLOSED**；由于缺少 `merged_at` 等字段，只能确认流程已关闭，不能确认已合并或进入发行版。

| 方向 | 重要关闭 PR | 推进内容与交付边界 |
|---|---|---|
| 安装与更新 | [#201917](https://github.com/openclaw/openclaw/pull/201917) | 提议将 Git 发行构建与运行位置移出 `node_modules`，解决 DeepSeek 原始 TypeScript 合约导致的 MCP 启动失败；关联 Issue 仍开放，需核实最终修复去向。 |
| 多渠道交互 | [#201764](https://github.com/openclaw/openclaw/pull/201764) | 统一智能体生成按钮的回调归属，目标是让各消息渠道中的点击可靠返回对应智能体。 |
| 成本准确性 | [#201924](https://github.com/openclaw/openclaw/pull/201924) | 避免以占位 `$0` 覆盖已解析模型价格，改善费用统计可信度。 |
| 存储与性能 | [#201930](https://github.com/openclaw/openclaw/pull/201930)、[#201929](https://github.com/openclaw/openclaw/pull/201929) | 分别针对 worktree 清理反复重写 Git 历史、自动化历史读取的额外 CPU/内存开销。 |
| 更新后清理 | [#201711](https://github.com/openclaw/openclaw/pull/201711) | 针对更新备份残留；提案描述了真实 Git 安装中约 **82 GiB** 备份未被清理的情况。 |
| Web UI | [#201882](https://github.com/openclaw/openclaw/pull/201882)、[#201939](https://github.com/openclaw/openclaw/pull/201939) | 分别改善命令面板结果的新标签页打开，以及手机端输入框的插件按钮布局。 |

**进展判断**：维护范围覆盖安装、运行、交互和资源消耗，工程投入较全面；但仅凭“30 条已合并/关闭”的汇总，无法计算真实合并率或确认修复交付量。

## 4. 社区热点

Issue 评论数可比较，PR 评论数不可用；所有已展示条目均为 **0 个 👍**，因此本期没有可据此确认的高反应热帖。

1. **副作用工具重复执行：8 条评论，为已知讨论最活跃话题。**  
   [#201796](https://github.com/openclaw/openclaw/issues/201796) 报告 cron 智能体反复执行已经成功的长耗时工作流。该 Issue 已关闭；后续 [#201931](https://github.com/openclaw/openclaw/issues/201931) 说明其被归因为模型侧重复发起，并要求降低副作用工具的重复调用阈值。核心诉求不是仅解释归因，而是提供能限制重复通知、推送或流水线执行的安全兜底。

2. **iOS 首次连接体验：4 条评论。**  
   [#201833](https://github.com/openclaw/openclaw/issues/201833) 指出浅色模式下 Setup Code 占位文字近乎不可见，报告对比度约 **1.14:1**。问题已关闭，但现有数据未给出修复版本，反映首次使用流程与可访问性仍需重视。

3. **升级阻断与插件热重载：各 2 条评论，高优先级更值得关注。**  
   [#201472](https://github.com/openclaw/openclaw/issues/201472) 为 P0，遗留锁阻止维护并触发升级回滚；[#201903](https://github.com/openclaw/openclaw/issues/201903) 为 P1，插件替换完成后仍调用已销毁实例的 hook。两者体现用户对“维护操作完成后，系统状态应当一致且可用”的要求。

## 5. Bug 与稳定性

### P0：升级与维护阻断

| 问题 | 影响 | Fix PR 状态 |
|---|---|---|
| [#201472：遗留 Gateway 锁无法判定已失效](https://github.com/openclaw/openclaw/issues/201472) | Doctor 无法进入维护，2026.11.5 更新回滚 | **有，开放中**：[#201893](https://github.com/openclaw/openclaw/pull/201893)。仅覆盖包含 `recover-lock` 的构建；已回滚到缺少该命令的 2026.11.4 安装仍需恢复路径。 |

### P1：凭据、消息与核心执行可靠性

| 问题 | 影响 | Fix PR 状态 |
|---|---|---|
| [#201933：OAuth 刷新错误分类](https://github.com/openclaw/openclaw/issues/201933) | 本地短暂故障发生在请求发出前，却可能导致有效刷新令牌被终止使用 | 未见关联修复 PR |
| [#201908：Matrix 无法解密事件堵塞房间队列](https://github.com/openclaw/openclaw/issues/201908) | 后续消息被阻塞超过 24 小时，且缺少明显信号 | 未见关联修复 PR |
| [#201903：插件热重载仍调用已销毁实例](https://github.com/openclaw/openclaw/issues/201903) | `before_tool_call` 失败关闭，影响 Code Mode 触发器求值 | 未见关联修复 PR |
| [#201808：记忆索引排序依赖 locale](https://github.com/openclaw/openclaw/issues/201808) | CJK locale 下重建索引后，`memory_search` 持续报作用域变化 | 标签显示已有开放关联 PR，编号未提供 |
| [#201874：Git 安装加载原始 TypeScript 合约](https://github.com/openclaw/openclaw/issues/201874) | Gateway MCP 请求启动失败 | 相关 [#201917](https://github.com/openclaw/openclaw/pull/201917) 已关闭，合并与生效情况不明 |
| [#201796：副作用工具重复执行，已关闭](https://github.com/openclaw/openclaw/issues/201796) | 成功工作流可能重复运行 | 风险控制需求转由开放 P2 [#201931](https://github.com/openclaw/openclaw/issues/201931) 跟进，不能视为风险已消除 |

### P2：升级兼容性、认证与回复异常

- **升级失败**：[#201530](https://github.com/openclaw/openclaw/issues/201530) 涉及官方 Node 26.13.0 下旧 `sqlite_stat4` 无法重建；[#201948](https://github.com/openclaw/openclaw/issues/201948) 为 Linux/Node 24.22.2 的 package-doctor 失败，仍需信息。两者均未提供明确关联修复 PR。
- **浏览器 HTTP Basic Auth 失效**：[#201945](https://github.com/openclaw/openclaw/issues/201945)，已有开放修复 [#201946](https://github.com/openclaw/openclaw/pull/201946)，当前标记为需要验证证据。
- **`NO_REPLY` 控制行泄露**：[#201943](https://github.com/openclaw/openclaw/issues/201943)，Windows 风格换行触发；已有开放修复 [#201944](https://github.com/openclaw/openclaw/pull/201944)，同样待验证。
- **凭据发布竞态导致错误 OAuth 回退**：[#201932](https://github.com/openclaw/openclaw/issues/201932)，未见关联修复 PR。
- **空配置 Gateway 自动启动 Codex app-server**：[#201909](https://github.com/openclaw/openclaw/issues/201909)，涉及非预期后台进程，未见关联修复 PR。

## 6. 功能请求与路线图信号

| 方向 | 用户需求与已有工作 | 近期落地信号 |
|---|---|---|
| 会话批量管理 | [#201925](https://github.com/openclaw/openclaw/pull/201925)：侧边栏分组内一键归档全部会话 | 已有实现及充分证明标签，等待维护者审阅，信号较强 |
| 跨智能体会话导航 | [#201934](https://github.com/openclaw/openclaw/pull/201934)：在 roster 下展示跨智能体 Sessions | 已有实现与截图，但带合并风险标签 |
| macOS 账号体验 | [#201642](https://github.com/openclaw/openclaw/pull/201642)：在应用内完成 OpenClaw ID 登录 | 已进入待维护者审阅阶段 |
| 本地模型接入 | [#201941](https://github.com/openclaw/openclaw/pull/201941)：从 Models 页面添加 llmman | 已有功能 PR，但仍需证明材料 |
| 插件可观测性与压缩控制 | [#201937](https://github.com/openclaw/openclaw/issues/201937)、[#201936](https://github.com/openclaw/openclaw/issues/201936)、[#201935](https://github.com/openclaw/openclaw/issues/201935) | 要求模型身份、压缩上下文与 CLI 后端接管能力；均仍需产品决策，尚无明确落地信号 |
| 最小权限模型调用 | [#201938](https://github.com/openclaw/openclaw/issues/201938)：插件跟随当前会话模型，不必获得宽泛模型覆盖授权 | 体现插件权限粒度需求，仍处设计讨论阶段 |

以上是成熟度判断，**不是下一版本发布承诺**。

## 7. 用户反馈摘要

> 未提供评论正文，以下仅提炼 Issue 描述与 PR 问题陈述，不将其表述为评论原话或满意度调查结果。

- **自动化用户重视“只执行一次”胜过错误归因。** 长耗时任务已经成功后再执行，可能造成真实外部副作用；当前重复保护阈值被认为不适合发送消息等操作。  
  [#201796](https://github.com/openclaw/openclaw/issues/201796) · [#201931](https://github.com/openclaw/openclaw/issues/201931)
- **自托管用户需要升级失败后的完整恢复闭环。** 锁文件、数据库迁移、服务重启和备份清理共同影响维护成本，而不仅是 CLI 能否安装成功。  
  [#201472](https://github.com/openclaw/openclaw/issues/201472) · [#201906](https://github.com/openclaw/openclaw/pull/201906) · [#201711](https://github.com/openclaw/openclaw/pull/201711)
- **插件作者需要不同运行后端之间更一致的能力。** CLI 后端缺少模型元数据、压缩接管和缓存可观测性，影响审计、成本分析与上下文治理。  
  [#201937](https://github.com/openclaw/openclaw/issues/201937) · [#201935](https://github.com/openclaw/openclaw/issues/201935) · [#201940](https://github.com/openclaw/openclaw/issues/201940)
- **国际化环境暴露了核心状态计算的隐含假设。** CJK locale 改变路径排序并影响索引身份，说明环境差异可能直接破坏记忆功能。  
  [#201808](https://github.com/openclaw/openclaw/issues/201808)

当前材料以问题报告为主，没有足够依据评价整体用户满意度，也未见可核实的修复后正向反馈。

## 8. 待处理积压

现有条目大多刚创建或更新，且缺少完整响应时间，**无法识别“长期无人响应”积压**。建议维护者优先跟进以下未闭环事项：

1. **补齐 P0 的旧版本恢复路径**：审阅 [#201893](https://github.com/openclaw/openclaw/pull/201893)，同时明确已回滚用户如何恢复，避免仅修复新构建。  
   [Issue #201472](https://github.com/openclaw/openclaw/issues/201472)
2. **为高影响 P1 指定修复负责人和验证条件**：优先处理凭据失效、Matrix 队列阻塞及插件热重载状态残留。  
   [#201933](https://github.com/openclaw/openclaw/issues/201933) · [#201908](https://github.com/openclaw/openclaw/issues/201908) · [#201903](https://github.com/openclaw/openclaw/issues/201903)
3. **解释“关联 PR 已关闭、Issue 仍开放”的状态**：确认 Git 安装故障的修复是否合并、被替代或需要重新提交。  
   [Issue #201874](https://github.com/openclaw/openclaw/issues/201874) · [PR #201917](https://github.com/openclaw/openclaw/pull/201917)
4. **完成小范围修复的证据补充**：HTTP Basic Auth 与 `NO_REPLY` 修复均已有明确实现候选，适合尽快完成回归验证。  
   [#201946](https://github.com/openclaw/openclaw/pull/201946) · [#201944](https://github.com/openclaw/openclaw/pull/201944)
5. **统一评审插件 API 需求组**：模型身份、压缩上下文、CLI 后端能力和最小权限调用彼此相关，宜整体设计，避免接口碎片化。  
   [#201935](https://github.com/openclaw/openclaw/issues/201935) · [#201936](https://github.com/openclaw/openclaw/issues/201936) · [#201937](https://github.com/openclaw/openclaw/issues/201937) · [#201938](https://github.com/openclaw/openclaw/issues/201938)

**健康度结论**：OpenClaw 的贡献活跃度与修复响应面较好，但稳定性仍处承压阶段。下一阶段最值得观察的不是关闭数量本身，而是 **P0/P1 是否形成“修复合并—回归验证—版本发布—用户确认”的完整闭环**。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-20｜观察范围：所提供的过去 24 小时 GitHub 更新**

> **口径说明**：本报告比较的是“窗口内更新条目数”，不是新增数量、仓库总积压或社区总规模；明细主要发生于 11 月 19 日。`CLOSED` 不等于已合并，开放 PR 不等于已交付；部分项目明细、评论和发布说明不完整。下文健康度是对本窗口维护信号的评估，不是长期评级。

## 1. 生态全景

本次覆盖 **13 个项目，合计 88 条 Issue 更新、154 条 PR 更新和 2 个版本记录**，其中 OpenClaw 与 Hermes Agent 占 Issue 更新的约 **82%**、PR 更新的约 **71%**，是本窗口的主要活跃中心。生态关注点正在从功能接入扩展到常驻运行的可靠性：升级恢复、任务取消、消息去重、记忆持久化和插件兼容性成为反复出现的问题。与此同时，语音、图片和视频正在进入正式会话链路，模板、预设专家与插件也开始需要持续更新和信任管理。整体呈现“**能力扩张与质量巩固并行，但可验证交付证据不足**”的态势，不能仅凭 PR 数或关闭数判断成熟度。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release 情况 | 本窗口健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 22 | 60：30 待合并，30 合并/关闭 | 1：`v2026.11.10-beta.1` | **高活跃、稳定性承压**；存在开放 P0，升级、认证与消息链路仍需闭环 |
| **Hermes Agent** | 50 | 50：47 待合并，3 合并/关闭 | 1：`v0.23.2` Canary 构建 | **高活跃、评审负担较重**；任务生命周期、Profile 与插件兼容性问题集中 |
| **ZeroClaw** | 2 | 21，均开放 | 无 | **提案活跃、交付待验证**；存在报告者标注的 S1 启动阻断 |
| **NanoBot** | 0 | 9，均关闭 | 无 | **质量巩固信号明确**；消息与图片链路修补集中，合并结果不明 |
| **CoPaw** | 3 | 7，均开放 | 无 | **小规模并行迭代**；模型回退、数据治理与 UI 体验均待落地 |
| **NanoClaw** | 10 | 4：3 开放、1 关闭 | 无 | **运维与安全加固集中**；贡献来源集中，关键修复待审 |
| **LobsterAI** | 1 | 3，均关闭 | 无 | **渐进式桌面维护**；凭据处理与安装链路反馈需优先核查 |
| PicoClaw | 0 | 0 | 无 | 本窗口无活动，无法判断长期健康度 |
| NullClaw | 0 | 0 | 无 | 同上 |
| IronClaw | 0 | 0 | 无 | 同上 |
| TinyClaw / TinyAGI | 0 | 0 | 无 | 同上 |
| Moltis | 0 | 0 | 无 | 同上 |
| ZeptoClaw | 0 | 0 | 无 | 同上 |
| **合计** | **88** | **154** | **2 个记录** | 活动集中，但交付状态普遍缺少完整证据 |

**比较边界：** NanoClaw 的条目链接指向 `nanocoai/nanoclaw`，CoPaw 的条目链接指向 `agentscope-ai/QwenPaw`，与项目标题仓库不同；采用前应先核验仓库身份。

## 3. OpenClaw 在生态中的定位

### 核心定位：覆盖面较广的个人助手平台

从本窗口可见能力看，OpenClaw 同时覆盖 **Gateway、多消息渠道、Web UI、macOS/iOS、模型接入、插件、记忆及智能体模板分发**，其平台化特征较明显。

| 对比维度 | OpenClaw 的相对位置 | 限制与代价 |
|---|---|---|
| **开发活动** | 60 条 PR 更新，为样本最多；Issue 更新仅次于 Hermes | 活动规模不等于实际交付量 |
| **分发与复用** | Beta 已明确披露 ClawHub 智能体模板、`CLAW.md` 清单和原生信任检查 | 模板产品化不代表第三方内容已得到全面安全验证 |
| **交互覆盖** | 多渠道、桌面、移动端和跨智能体会话管理同步推进 | 接口与状态边界增多，增加一致性维护成本 |
| **插件治理** | 出现最小权限调用、模型身份、压缩控制和后端能力一致性需求 | 说明插件 API 仍需进一步系统化 |
| **运行可靠性** | 对升级、重启、备份、成本统计和性能均有维护投入 | 开放 P0 及多项高优先级故障，生产升级需谨慎 |

### 技术路线差异

- **相对 Hermes Agent**：两者均表现为 Gateway 驱动的综合助手。OpenClaw 本期更突出**模板分发、多渠道一致性和维护恢复**；Hermes 更突出 **GPT-Live 语音持久化、Desktop、Kanban 与子代理执行可见性**。
- **相对 NanoBot、LobsterAI**：OpenClaw 的可见维护面更广；后两者本期分别聚焦聊天链路与桌面产品体验，不宜据此推断其全部产品能力。
- **相对 ZeroClaw**：OpenClaw 更偏平台集成和模板产品化；ZeroClaw 本期更突出 Rust 依赖治理、模型请求适配和视频输入链路。

### 社区规模判断

**OpenClaw 与 Hermes 是本窗口的双活跃中心，但无法据此确认谁拥有更大的社区。** 当前缺少总贡献者、活跃用户、Stars、Forks 和长期响应时间。NanoBot 的 9 条 PR 来自同一贡献者，NanoClaw 的 14 个展示条目中有 12 个由同一人发起，说明活动量也可能来自集中维护，而非广泛参与。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **常驻服务与升级恢复** | OpenClaw、Hermes、NanoClaw、ZeroClaw | 清理遗留锁/PID；恢复中断任务；停服前检查磁盘；避免日志残留阻断启动 |
| **任务执行可控性** | OpenClaw、Hermes | 防止成功工作流重复执行；客户端退出后能够取消服务端任务；重试投递避免重复 |
| **会话与状态真实性** | OpenClaw、NanoBot、Hermes、CoPaw | 正确呈现排队与处理中状态；保留历史图片；显示继续运行的子代理；统一聊天数据生命周期 |
| **多模态上下文连续性** | NanoBot、Hermes、ZeroClaw | 图片跨进程回放；语音记录归属原聊天；MP4 文件及 MCP 视频资源进入模型 |
| **插件与内容生命周期** | OpenClaw、Hermes、NanoClaw、LobsterAI、ZeroClaw | 模板信任、核心/插件版本兼容、敏感目录保护、专家主动更新、验证规则与运行时一致 |
| **模型适配与成本治理** | OpenClaw、Hermes、CoPaw、ZeroClaw | 正确费用统计；缓存启用与请求格式适配；供应商失效后的回退；插件获取模型元数据 |
| **安全默认值与凭据管理** | OpenClaw、NanoClaw、LobsterAI、Hermes | 最小权限、默认密码状态真实、避免无认证网络暴露、减少明文凭据经手、完善审批路径 |
| **移动端与异步交互** | OpenClaw、NanoBot、CoPaw、Hermes | 安全区与窄屏布局；长任务通知；输入不中断；任务状态和结果归属清晰 |

其中，最值得共同投入的是**任务与会话状态模型**：重复执行、取消失效、队列误报、后台任务不可见，虽然表现不同，底层都涉及执行状态、消息归属与持久化边界。

## 5. 差异化定位分析

以下为**依据本期可见能力推断的使用重心**，不是各项目的完整产品定义。

| 项目 | 功能侧重 | 更匹配的用户/场景 | 可见架构特征与关键取舍 |
|---|---|---|---|
| **OpenClaw** | 多渠道助手、模板与插件生态、跨智能体管理 | 需要多入口协同的自托管用户、插件与模板开发者 | Gateway 与多客户端/后端并存；集成面广，一致性成本高 |
| **Hermes Agent** | 语音、Desktop、任务委派、Kanban、多 Profile | 复杂长任务、语音指令和自动化工作流用户 | 服务端执行与客户端生命周期分离；须明确取消、恢复和隔离语义 |
| **NanoBot** | 连续聊天、图片历史、WebUI 与队列体验 | 以网页对话和图片追问为核心的用户 | WebSocket、响应输入标识和附件持久化；重点是输入与响应准确对应 |
| **NanoClaw** | 可预测升级、安装兼容和工作区安全 | 自托管运维用户、关注宿主机边界的开发者 | 技能驱动升级、快照及挂载控制；需厘清共享工作区的隔离模型 |
| **ZeroClaw** | 模型/provider 适配、视频输入、工具插件 | 多模态集成与模型适配开发者 | Rust 依赖栈、Wasmtime/WASI、MCP 资源接入；兼容性与资源治理是重点 |
| **LobsterAI** | 桌面任务入口、预设专家维护、办公示例 | 偏桌面交互和预设工作流的用户 | Electron 桌面交互与 skill 集成；易用性须与凭据安全同步 |
| **CoPaw** | 多渠道、多 Agent、控制台和模型配置 | 长期运行、多 Agent 管理用户 | Agent 级模型配置与多个聊天数据路径；统一回退和数据治理需求突出 |

PicoClaw、NullClaw、IronClaw、TinyClaw、Moltis、ZeptoClaw 没有本窗口活动，**不宜仅凭名称推断其架构或市场定位**。

## 6. 社区热度与成熟度

### 活跃度分层

1. **高活跃、扩张与修复并行：OpenClaw、Hermes Agent**  
   两者合计 110 条 PR 更新。OpenClaw 的模板产品化和 Hermes 的语音链路扩展均有明确推进，但核心运行问题尚未完全闭环。

2. **中等活跃、工程与能力扩展并行：ZeroClaw**  
   21 条 PR 涵盖视频、依赖安全、CI 和发布流程；当前全部开放，仍属于方案与评审阶段。

3. **定向质量巩固：NanoBot、NanoClaw、LobsterAI**  
   分别聚焦聊天与图片可靠性、运维安全、桌面体验。NanoBot 的集中修补最明显，但不能把 PR 关闭量视为修复交付量。

4. **局部功能与体验迭代：CoPaw**  
   7 条开放 PR 兼顾模型回退、日志、布局和后续问题建议；核心修复与新功能尚待评审。

5. **观察不足：其余 6 个项目**  
   单日无活动既不能证明停滞，也不能证明维护稳定。

### 热度不等于成熟度

本期可见讨论普遍不高。OpenClaw 的副作用工具重复执行以 **8 条评论**成为已知最活跃话题；Hermes、CoPaw 的最高可见 Issue 评论数均为 **2 条**。PR 评论大量缺失，不能进行可靠的跨项目热度排名。

成熟度更应关注以下闭环，而不是单日数量：

**问题复现 → 修复评审与合并 → 回归测试 → 版本发布 → 用户验证**

当前材料尚不足以确认哪个项目在这一闭环上整体领先；同样，各项目的 P0、P1、P2、S1、S2 标签也不能直接横向等同。

## 7. 值得关注的趋势信号

### ① 智能体可靠性正从“回答正确”转向“执行可控”

OpenClaw 的重复副作用、Hermes 的取消失效与 cron 恢复问题，说明用户越来越关心助手是否**在正确时间执行、执行多少次、能否停止**。

**开发参考：** 为有副作用的工具设计幂等键、重复检测、可查询执行记录和明确取消协议，不应仅依赖模型自律。

### ② 多模态的竞争焦点转向上下文持久化

图片能否在重启后追问、语音是否留在原聊天、MCP 视频是否被正确路由，比“支持上传”更能决定真实可用性。

**开发参考：** 将附件、转录、消息归属与模型能力校验纳入统一会话模型，重点测试跨进程恢复和后续追问。

### ③ 插件和模板开始具备“软件供应链”属性

OpenClaw 的模板信任入口、Hermes 的记忆插件版本失配、LobsterAI 的安装校验反馈共同表明，扩展生态需要的不只是安装入口。

**开发参考：** 建立版本固定、兼容性矩阵、完整性校验、权限声明和回滚机制；避免核心升级后扩展静默失效。

### ④ 常驻助手正在成为需要运维的个人基础设施

锁文件、磁盘、日志、数据库迁移和备份残留，已直接影响用户能否持续使用助手。

**开发参考：** 把升级预检查、诊断、恢复、资源上限和故障可观测性视为核心产品能力，而不是附属脚本。

### ⑤ 用户信任取决于界面是否如实反映执行状态

队列已取出不等于模型已处理，客户端退出不等于服务端停止，安装验证通过也不等于插件可用。

**开发参考：** 前端、CLI 与运行时应共享明确的状态定义；“成功”“已停止”“可用”等提示必须对应可验证事实。

---

**决策结论：** 若评估综合平台与生态扩展，优先观察 OpenClaw；若关注语音和复杂委派工作流，重点观察 Hermes；若关注视频与模型适配，可跟进 ZeroClaw；NanoBot、NanoClaw、LobsterAI 和 CoPaw 则体现了不同使用环节的质量收敛方向。**生产选型仍应以关键场景回归、恢复路径和已发布修复为准，而非以本日活跃度排序替代适用性评估。**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-20**  
项目：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)

> **统计口径**：依据所提供的过去 24 小时数据。9 条 PR 均标记为 `CLOSED`，但未提供合并状态，因此下文统一称为“已关闭”，不将其直接视为已合入主分支。所列 PR 的创建、更新时间均为 2026-11-19。

## 1. 今日速览

过去 24 小时，NanoBot 有 **9 条 PR 更新并关闭、0 条 Issue 更新、0 个新版本发布**，活动主要集中在 WebUI、消息队列与图片上下文可靠性。9 条 PR 均由同一位贡献者 chengyongru 提交，显示出集中式维护与收尾特征，但不足以判断整个社区的参与广度。最值得关注的是活跃会话中追加消息触发 `NameError`、历史图片无法正确回放，以及不支持图片输入时的发送拦截问题。整体呈现**稳定性与交互质量打磨较活跃、发布与公开讨论信号不足**的状态；由于缺少合并记录和测试结果，尚不能确认这些修复已对用户生效。  
相关：[PR 列表](https://github.com/HKUDS/nanobot/pulls) · [#6726](https://github.com/HKUDS/nanobot/pull/6726) · [#6720](https://github.com/HKUDS/nanobot/pull/6720)

## 2. 项目进展

### 消息处理：修补回归，明确响应与输入的对应关系
- **[#6726：排队消息使用实时 turn 信息](https://github.com/HKUDS/nanobot/pull/6726)**  
  修复此前两项变更组合后遗留的调用：WebUI 路由仍引用已移除导入的 `websocket_turn_id`，导致正在回复时发送普通追加消息触发 `NameError`。这是本批次对核心聊天可用性影响最直接的修复。
- **[#6721：模型请求启动时标识响应输入](https://github.com/HKUDS/nanobot/pull/6721)**  
  在请求准备完成后，为 `model_request.started` 附加有序的 `response_input_ids`，避免将“已从队列取出”过早视为“正在被模型处理”，为更准确的排队状态展示提供基础。

### 多模态：增强图片输入与历史上下文连续性
- **[#6720：从存储附件回放用户图片](https://github.com/HKUDS/nanobot/pull/6720)**  
  针对图片追问时模型历史只包含本地路径标记的问题，调整图片保存与回放方式，重点改善新进程恢复会话后的图片上下文可用性。
- **[#6724：图片输入受限时引导打开预设](https://github.com/HKUDS/nanobot/pull/6724)**  
  当前预设不支持图片且没有可用回退时，保留编辑器中的图片和文字并提示用户，而不是直接发起对话；同时覆盖回复中按 Enter、发送排队消息等路径。

### WebUI：降低操作摩擦，整理内部职责
- **[#6727：拆分网关变更处理与 UI 状态](https://github.com/HKUDS/nanobot/pull/6727)**  
  将允许的结构化 WebSocket 写操作直接分发，减少在 WebSocket 与合成 HTTP 请求之间转换，并梳理磁盘操作、历史投影和 UI 状态职责。
- **[#6723：可撤销话题删除跳过确认](https://github.com/HKUDS/nanobot/pull/6723)**  
  删除后先隐藏话题并提供 **8 秒 Undo**，移动端同时关闭侧栏以便触达撤销入口，减少可逆操作的确认成本。
- **[#6728：窄屏隐藏运行计时](https://github.com/HKUDS/nanobot/pull/6728)**  
  在小于 640px 的屏幕上优先展示最新工具活动，减少计时信息占用空间。
- **[#6722：浮层动画锚定触发位置](https://github.com/HKUDS/nanobot/pull/6722)**  
  调整工具提示、文件菜单及模型预设选择器的动画方向，减少浮层看起来偏离触发点的问题。

### 文档：改善用户理解与配置路径
- **[#6725：重整 20 个用户文档页面](https://github.com/HKUDS/nanobot/pull/6725)**  
  涉及 README、SECURITY 及 18 篇指南，重组阅读流程、补充示意图、纠正配置示例，并移除面向用户不必要的内部实现细节。

**进展判断**：本批次更像一次横跨消息链路、多模态与交互体验的质量收敛，而非大型新功能扩张。实际完成度仍需以合并结果和回归验证为准。

## 3. 社区热点

**无法可靠评选“讨论最活跃”条目**：本批次没有 Issue 更新，PR 评论数均为 `undefined`，不能视为零评论；所有 PR 的 👍 均为 0，也没有反应热度差异。

从变更主题看，可关注两组集中诉求，但它们代表的是**维护关注方向，而非已验证的社区热度**：

- **异步聊天状态准确性**：追加消息不能中断、队列状态应与实际模型处理一致。相关：[消息回归修复 #6726](https://github.com/HKUDS/nanobot/pull/6726)、[输入标识 #6721](https://github.com/HKUDS/nanobot/pull/6721)。
- **图片对话连续性与可解释性**：既要在后续追问中保留图片，也要在模型不支持图片时明确提示并保留草稿。相关：[图片回放 #6720](https://github.com/HKUDS/nanobot/pull/6720)、[图片输入拦截 #6724](https://github.com/HKUDS/nanobot/pull/6724)。

## 4. Bug 与稳定性

以下按**潜在用户影响**排序，不代表维护者正式严重性评级。除 #6726 未提供优先级标签外，表内其余项均带 `priority: p2`。

| 影响排序 | 问题与使用场景 | 修复状态 |
|---|---|---|
| 高 | 回复进行中发送追加消息触发 `NameError`，网关接受消息前即失败；属于摘要明确指出的回归 | 已有 fix PR，[#6726](https://github.com/HKUDS/nanobot/pull/6726)，已关闭，合并未确认 |
| 较高 | 图片追问或进程重启后，模型历史可能只有路径标记，缺少实际图片 | 已有 fix PR，[#6720](https://github.com/HKUDS/nanobot/pull/6720)，已关闭，合并未确认 |
| 中 | 当前预设不支持图片且无回退时，发送流程缺少一致拦截与配置引导 | 已有 fix PR，[#6724](https://github.com/HKUDS/nanobot/pull/6724)，已关闭，合并未确认 |
| 低 | 窄屏计时信息挤占最新工具活动的展示空间 | 已有 fix PR，[#6728](https://github.com/HKUDS/nanobot/pull/6728)，已关闭，合并未确认 |
| 低 | 工具提示、菜单和预设选择器动画方向与触发位置不协调 | 已有 fix PR，[#6722](https://github.com/HKUDS/nanobot/pull/6722)，已关闭，合并未确认 |

今日没有新增 Issue 报告可供核验，不能将上述问题全部认定为“今日首次发现”。建议优先验证**运行中追加消息、重启后图片追问、排队图片消息发送**三个端到端场景。

## 5. 功能请求与路线图信号

本批数据没有可直接归因于用户的新功能请求。已有 PR 提供了以下近期方向信号，**不构成下一版本承诺**：

- **更准确的队列与响应归属展示**：`response_input_ids` 为输入级状态追踪提供基础。见 [#6721](https://github.com/HKUDS/nanobot/pull/6721)。
- **“先操作、可撤销”的交互模式**：话题删除改用 Undo，表明部分可逆操作正减少前置确认。见 [#6723](https://github.com/HKUDS/nanobot/pull/6723)。
- **WebUI 可维护性与多模态可靠性继续优先**：网关职责拆分、图片回放和能力校验形成配套改进。见 [#6727](https://github.com/HKUDS/nanobot/pull/6727)、[#6720](https://github.com/HKUDS/nanobot/pull/6720)、[#6724](https://github.com/HKUDS/nanobot/pull/6724)。

## 6. 用户反馈摘要

**未提供 Issue 评论或 PR 评论正文，无法提炼真实用户评价，也无法判断满意度。** 从 PR 问题描述中，只能识别维护者正在处理的使用痛点：

- **连续对话**：助手仍在回复时，用户需要能够继续追加消息。见 [#6726](https://github.com/HKUDS/nanobot/pull/6726)。
- **图片追问与会话恢复**：用户需要历史图片在后续请求中仍可被模型读取。见 [#6720](https://github.com/HKUDS/nanobot/pull/6720)。
- **移动端空间与可达性**：有限屏幕应优先展示工具进展，撤销操作也应容易触达。见 [#6728](https://github.com/HKUDS/nanobot/pull/6728)、[#6723](https://github.com/HKUDS/nanobot/pull/6723)。
- **上手理解成本**：文档需要按用户流程组织，配置示例应准确。见 [#6725](https://github.com/HKUDS/nanobot/pull/6725)。

## 7. 待处理积压

**当前数据无法识别长期未响应的重要 Issue 或 PR。** “过去 24 小时待合并 PR 为 0”不等于仓库没有待处理 PR；没有 Issue 更新也不等于不存在 Issue 积压。

建议维护者优先补充两类核查：

1. **关闭结果核查**：确认核心稳定性 PR 是否已合并、是否被其他变更替代，尤其是 [#6726](https://github.com/HKUDS/nanobot/pull/6726) 和 [#6720](https://github.com/HKUDS/nanobot/pull/6720)。
2. **全量积压巡检**：检查长期未更新的 [开放 Issues](https://github.com/HKUDS/nanobot/issues?q=is%3Aissue%20is%3Aopen%20sort%3Aupdated-asc) 与 [开放 PR](https://github.com/HKUDS/nanobot/pulls?q=is%3Apr%20is%3Aopen%20sort%3Aupdated-asc)，再评估响应时效和维护负担。

**健康度结论**：维护工作聚焦、稳定性问题覆盖具体，但贡献来源集中，且缺少合并、测试与用户讨论数据。当前最重要的是确认修复落地并完成关键聊天链路回归，而不是仅以关闭数量衡量交付质量。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-20｜观察窗口：过去 24 小时**  
项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

> **数据口径**：本期统计包含 50 条 Issue 更新、50 条 PR 更新及 1 个版本发布；明细仅提供 30 条 Issue、20 条 PR，且主要发生于 11 月 19 日。PR 评论数缺失，Release 正文被截断，因此无法完整核实合并成果、版本变更和评论内容。

## 1. 今日速览

Hermes Agent 在本观察窗口内保持较高开发活跃度：50 条 Issue 更新均处于新开或活跃状态，50 条 PR 更新中有 47 条待合并、3 条合并或关闭。可见开发工作主要围绕 **Gateway 生命周期与连接可靠性、Desktop 会话体验、GPT-Live 语音记录，以及插件目录扩展**展开。稳定性反馈集中在 v0.23.x 的任务取消、定时任务恢复、多 Profile 隔离和状态同步等边界场景，反映项目正在承受更复杂的个人助手与无人值守工作流需求。整体呈现“贡献活跃、修复供给持续，但待审压力较大”的状态；仅凭本日样本，尚不能判断积压是否持续恶化。[项目动态](https://github.com/NousResearch/hermes-agent/activity)

## 2. 版本发布

### Canary：`v0.23.2+canary.20261119T064637Z`
- **发布日期**：2026-11-19。
- **已确认内容**：发布了新的 Canary 构建；可见发布页包含 Hermes Desktop 下载区域，以及 macOS Apple Silicon 的 DMG 下载项。
- **更新内容与破坏性变更**：提供的正文未包含 changelog，**无法确认新增功能、修复清单或是否存在破坏性变更**，不能将当日开放 PR 视为已随此版本交付。
- **升级注意事项**：使用外部记忆插件的用户应重点检查兼容性。Issue #157818 报告，目录固定的 Holographic `0.29.2` 在 Hermes `0.23` 上因 `hermes_state_wal` 被移除而失效；报告称插件 `0.30.0` 已修复，但该 Issue 仍开放，且未提供对应目录更新 PR。

**建议**：生产环境升级前备份状态与记忆数据库，并验证插件版本、Profile 文件访问和任务恢复行为。

链接：[Release](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.2%2Bcanary.20261119T064637Z) · [插件兼容性报告 #157818](https://github.com/NousResearch/hermes-agent/issues/157818)

## 3. 项目进展

### 已合并／关闭：可确认成果有限

统计中有 **3 条 PR 合并或关闭**，但展示明细仅能识别以下一条：

| PR | 状态与实际进展 |
|---|---|
| [#157867：插件 spanish-top-tech-companies 更新至 1.0.1](https://github.com/NousResearch/hermes-agent/pull/157867) | 标记为 **CLOSED**，不能据此认定已经合并。同一插件另有更新至 `1.0.2` 的开放 PR [#157870](https://github.com/NousResearch/hermes-agent/pull/157870)，可见后续更新仍在推进。 |

**因此，本期不能量化“已经落地主干”的功能增量**；其余两条合并／关闭记录未提供明细。

### 待合并工作：明确的推进方向

- **语音进入长期会话上下文**：[#157882](https://github.com/NousResearch/hermes-agent/pull/157882) 将 GPT-Live 双方发言保存为聊天消息；[#157883](https://github.com/NousResearch/hermes-agent/pull/157883) 将通话保留在发起聊天中；[#157884](https://github.com/NousResearch/hermes-agent/pull/157884) 改善实时文字与转录展示。三者为堆叠 PR，若落地，将增强语音内容被后续对话、检索和记忆使用的能力。
- **Gateway 运行可靠性**：[#157886](https://github.com/NousResearch/hermes-agent/pull/157886) 处理长任务期间本地 WebSocket 心跳导致的断连；[#157876](https://github.com/NousResearch/hermes-agent/pull/157876) 识别重启前遗留的 PID、锁及状态记录。
- **开发与运维可观测性**：[#157879](https://github.com/NousResearch/hermes-agent/pull/157879) 修复 `hermes verify` 的 Python 包管理器及环境隔离问题；[#157877](https://github.com/NousResearch/hermes-agent/pull/157877) 为 Kanban 拒绝执行日志补充任务归属信息；[#157864](https://github.com/NousResearch/hermes-agent/pull/157864) 改善 `kanban watch` 可读性。

以上均仍为 **OPEN**，不是已交付成果。

## 4. 社区热点

可见 Issue 的最高评论数仅为 **2 条**，全部展示条目的 👍 均为 0，暂无明显形成广泛共识的高热议题。PR 评论数为 `undefined`，无法进行讨论热度排名。

| 议题 | 可见热度 | 背后诉求 |
|---|---:|---|
| [#157818：Holographic 插件兼容性](https://github.com/NousResearch/hermes-agent/issues/157818) | 2 评论 | 升级核心后，已有长期记忆仍应可访问；插件目录固定版本需要与核心兼容性同步。 |
| [#157812：非默认 Profile 的附件下载 404](https://github.com/NousResearch/hermes-agent/issues/157812) | 2 评论 | 多 Profile 应是完整可用的工作隔离单元，而不只是独立聊天入口。 |
| [#157851：运行中配置命令延后执行](https://github.com/NousResearch/hermes-agent/issues/157851) | 1 评论 | 用户希望修改模型、推理强度或语音设置时无需等待空闲窗口。与 [#157853](https://github.com/NousResearch/hermes-agent/issues/157853) 高度重叠，建议合并跟踪。 |
| [#157850：语音录制直到手动停止](https://github.com/NousResearch/hermes-agent/issues/157850) | 1 评论 | 长语音用于组织复杂任务，而非仅替代短文本输入。 |
| [#157805：继续执行的子代理不可见](https://github.com/NousResearch/hermes-agent/issues/157805) | 1 评论 | 用户需要准确区分任务已结束、重新运行和继续执行。 |

## 5. Bug 与稳定性

以下按**潜在运行影响**排序，并非重新定义维护者优先级；所列报告主要标为 P2。未见明确 P0/P1 事故或已证实的数据丢失。

| 优先关注问题 | 影响 | Fix PR 状态 |
|---|---|---|
| [#157855：Gateway 停止后，运行中的 cron 未暂停且未重跑](https://github.com/NousResearch/hermes-agent/issues/157855) | 无人值守任务可能遗漏，行为与恢复文档不符。 | 提供明细中未见直接修复 PR。 |
| [#157849：终止 `hermes -z` 客户端无法取消服务端任务](https://github.com/NousResearch/hermes-agent/issues/157849) | 包装脚本的超时控制不再等于停止执行，可能继续产生调用成本或副作用。 | 未见直接修复 PR。 |
| [#157832：单个 Profile 迁移阻塞其他 Gateway 启动](https://github.com/NousResearch/hermes-agent/issues/157832) | 主机级锁扩大故障影响范围，其他 Gateway 持续退出 75。 | 未见直接修复 PR；[#157876](https://github.com/NousResearch/hermes-agent/pull/157876) 修复的是重启残留状态，不是此问题。 |
| [#157818：记忆插件固定版本不兼容](https://github.com/NousResearch/hermes-agent/issues/157818) | 已有记忆库完整，但插件使用受阻。 | 报告称插件 `0.30.0` 已修复；核心目录更新未确认。 |
| [#157829：Windows 插件快照重命名失败](https://github.com/NousResearch/hermes-agent/issues/157829) | Kanban worker 在首次模型调用前启动失败。 | 未见直接修复 PR；[#157877](https://github.com/NousResearch/hermes-agent/pull/157877) 仅改善相关错误诊断。 |
| [#157875：OpenRouter preset 未启用 Anthropic 缓存](https://github.com/NousResearch/hermes-agent/issues/157875) | 重复全量计费，影响长上下文使用成本。 | 未见直接修复 PR。 |
| [#157848：截图 MIME 与实际字节不一致](https://github.com/NousResearch/hermes-agent/issues/157848) | 计算机操作截图可能触发 Anthropic 400，阻断工具链。 | 未见直接修复 PR。 |
| [#157812：非默认 Profile 下载失败](https://github.com/NousResearch/hermes-agent/issues/157812)；[#157805：继续执行子代理不显示](https://github.com/NousResearch/hermes-agent/issues/157805) | 文件访问和委派任务状态展示不可靠。 | 均未见直接修复 PR。 |
| [#157833：切换模型后旧回复重复显示](https://github.com/NousResearch/hermes-agent/issues/157833)；[#157821：记忆上下文写入用户消息](https://github.com/NousResearch/hermes-agent/issues/157821)；[#157838：压缩摘要进入聊天展示](https://github.com/NousResearch/hermes-agent/issues/157838) | 会话持久化与展示边界不清，削弱历史记录可信度。 | 均未见直接修复 PR。 |

**安全边界补充**：[#157858](https://github.com/NousResearch/hermes-agent/issues/157858) 报告 HTTP 会话中的代码执行审批被一律拒绝。虽然带有安全标签，但当前描述是**过度拦截导致审批路径不可用**，不是已证实的权限绕过漏洞。

## 6. 功能请求与路线图信号

| 方向 | 需求及已有实现信号 | 判断 |
|---|---|---|
| 语音成为正式会话输入 | GPT-Live 持久化、原聊天归属与转录展示已有 [#157882](https://github.com/NousResearch/hermes-agent/pull/157882)、[#157883](https://github.com/NousResearch/hermes-agent/pull/157883)、[#157884](https://github.com/NousResearch/hermes-agent/pull/157884)；长录音诉求见 [#157850](https://github.com/NousResearch/hermes-agent/issues/157850)。 | **近期实现信号较强**，但长录音限制并未由这些 PR 明确解决。 |
| 更可靠的客户端协议 | [#157880](https://github.com/NousResearch/hermes-agent/issues/157880) 请求 `prompt.submit` 支持客户端消息 ID，避免重试重复投递。 | 适合第三方客户端与弱网场景，尚未见实现 PR。 |
| 委派工作透明化 | [#157823](https://github.com/NousResearch/hermes-agent/issues/157823) 请求投递生命周期、Kanban 进度和子代理归属事件。 | 与现有可观测性 PR 方向一致，但尚不能确认纳入下一版。 |
| 本地模型管理 API 完整化 | [#157878](https://github.com/NousResearch/hermes-agent/issues/157878) 请求公开选择、删除 llama.cpp 构建的路由。 | 插件正从安装入口走向完整运行时管理，尚未见实现 PR。 |
| 凭据管理从读取走向写入 | [#157840](https://github.com/NousResearch/hermes-agent/issues/157840) 请求 Bitwarden、1Password 创建／编辑能力。 | 扩大助手行动能力，也需要更细的授权和确认机制；暂无交付依据。 |

## 7. 用户反馈摘要

> 未提供实际评论正文，以下仅依据 Issue 描述提炼，不能代表评论区共识或总体满意度。

- **“我需要把复杂想法一次讲完。”** 用户以数分钟语音组织复杂指令，固定录音时限打断思路，说明语音已成为主要输入方式之一。[#157850](https://github.com/NousResearch/hermes-agent/issues/157850)
- **“我停止了客户端，任务就应该可控。”** 自动化用户依赖超时终止机制；Gateway 接管执行后，原有脚本的停止语义发生变化。[#157849](https://github.com/NousResearch/hermes-agent/issues/157849)
- **“后台任务不能丢掉我引用的内容。”** Telegram `/bg` 缺少回复上下文，可能不报错却给出错误方向的答案。[#157834](https://github.com/NousResearch/hermes-agent/issues/157834)
- **“结果应该回到我工作的地方。”** Slack 线程创建的定时任务输出落到频道根部，破坏任务上下文连续性。[#157794](https://github.com/NousResearch/hermes-agent/issues/157794)
- **“界面必须如实反映代理状态。”** 子代理继续运行却不可见、切换模型后重复旧文本，均会降低用户对执行结果的信任。[#157805](https://github.com/NousResearch/hermes-agent/issues/157805) · [#157833](https://github.com/NousResearch/hermes-agent/issues/157833)

当前样本以缺陷和需求报告为主，**不足以推断整体用户满意度**。

## 8. 待处理积压

**无法识别真正的长期未响应条目**：展示的 Issue 和 PR 均创建于 11 月 19 日，且缺少维护者响应、审查和历史等待时长。47 条待合并 PR 仅代表本窗口更新集合，不等于仓库全部积压。

建议维护者优先处理：

1. **任务恢复与取消语义**：先明确 cron 中断和 oneshot 断开后的预期行为，防止无人值守流程出现静默遗漏或继续执行。[#157855](https://github.com/NousResearch/hermes-agent/issues/157855) · [#157849](https://github.com/NousResearch/hermes-agent/issues/157849)
2. **兼容性修复闭环**：确认 Holographic 目录固定版本是否更新，并给出受影响版本与升级路径。[#157818](https://github.com/NousResearch/hermes-agent/issues/157818)
3. **重复需求归并**：将运行中 `/reasoning` 丢失与通用配置命令排队合并跟踪，减少讨论分散。[#157851](https://github.com/NousResearch/hermes-agent/issues/157851) · [#157853](https://github.com/NousResearch/hermes-agent/issues/157853)
4. **依赖链审查**：按 Gateway 持久化 → Desktop 会话归属 → 展示层的顺序审查 GPT-Live 堆叠 PR，避免局部合并造成行为不一致。[#157882](https://github.com/NousResearch/hermes-agent/pull/157882) · [#157883](https://github.com/NousResearch/hermes-agent/pull/157883) · [#157884](https://github.com/NousResearch/hermes-agent/pull/157884)

**健康度结论**：项目贡献活跃，功能扩张与可靠性修复同时推进；近期最值得观察的不是新增功能数量，而是任务生命周期、会话状态和插件兼容性问题能否形成可验证的修复闭环。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-20｜统计窗口：过去 24 小时**

> **数据口径**：本日报仅依据所提供的数据；条目时间均标为 11 月 19 日。项目标题指向 `qwibitai/nanoclaw`，但条目链接指向 `nanocoai/nanoclaw`，下文沿用条目仓库生成链接，仓库归属需另行核验。PR 的 `CLOSED` 状态不等于已合并，本文不将其视为已交付。

## 1. 今日速览

过去 24 小时共有 **10 条 Issue 更新、4 条 PR 更新，无新版本发布**，其中 8 条 Issue、3 条 PR 仍处于开放状态。工作重点集中在升级流程可靠性、安装兼容性，以及 OneCLI 和 Agent 工作区的安全加固，而非新增产品功能。活跃度呈现“**修复提交较集中、社区互动较低**”的特点：所列 14 个条目中有 12 个由 glifocat 发起，Issue 合计仅 1 条评论，所有条目均无点赞，PR 评论数未提供。已有针对升级停机风险和 OneCLI 配置问题的开放修复，但尚不能确认这些改动已经进入主分支或发布版本。  
相关：[升级修复 PR #4484](https://github.com/nanocoai/nanoclaw/pull/4484) · [OneCLI 加固 PR #4471](https://github.com/nanocoai/nanoclaw/pull/4471)

## 2. 项目进展

### Codex 登录目录清理：修复 PR 已关闭，合并状态待确认
[PR #4477](https://github.com/nanocoai/nanoclaw/pull/4477) 针对 Linux 下读取进程信息受限时，旧登录目录可能仍被进程使用却遭删除的问题，提出更保守的保留策略。关联 [Issue #4476](https://github.com/nanocoai/nanoclaw/issues/4476) 也已关闭。

这是本窗口唯一关闭的 PR，体现了对认证流程边界条件的修补；但数据未提供合并记录，不能据此认定修复已交付。

### WhatsApp 群聊表情反馈问题关闭
[Issue #4482](https://github.com/nanocoai/nanoclaw/issues/4482) 报告 Agent 在群聊中执行 `add_reaction` 后表情不显示，标题指出 reaction key 缺少 participant。该 Issue 已关闭，但没有提供关闭原因或关联修复，仍需核实是否真正解决。

**整体判断**：今日推进主要属于可靠性和安全边界的增量完善，尚无可确认的新功能或版本交付。

## 3. 社区热点

严格按互动数据看，今日**没有形成广泛讨论的热点**：仅 [Issue #4478](https://github.com/nanocoai/nanoclaw/issues/4478) 有 1 条评论，其余 Issue 均为 0 条评论、0 个点赞；PR 评论数未知。

| 关注主题 | 数据与进展 | 背后诉求 |
|---|---|---|
| 升级前磁盘检查 | [#4478](https://github.com/nanocoai/nanoclaw/issues/4478)，1 条评论；已有开放 [PR #4484](https://github.com/nanocoai/nanoclaw/pull/4484) | 升级应先验证前置条件，避免停服后才发现无法继续 |
| 升级快照体积 | [#4479](https://github.com/nanocoai/nanoclaw/issues/4479)，尚无对应修复 PR | Agent 工作区内的依赖和缓存不应无差别放大备份成本 |
| Agent 会话共享状态 | [#4475](https://github.com/nanocoai/nanoclaw/issues/4475)，安全加固反馈 | 同组会话共享可写记录、笔记和记忆，需要更明确的隔离边界 |

这些主题体现的是**运维可预测性与状态隔离需求**，而非通过评论或反应数验证的广泛社区共识。

## 4. Bug 与稳定性

以下为依据潜在影响给出的分析优先级，**不是项目官方严重性评级**；安全加固条目也不应直接视为已确认漏洞。

| 优先级 | 问题与影响 | 状态及 fix PR |
|---|---|---|
| **高** | **先停服、后检查快照空间**：磁盘不足时，升级可能已经停止服务并终止 Agent，造成可避免的中断。[#4478](https://github.com/nanocoai/nanoclaw/issues/4478) | 开放；[PR #4484](https://github.com/nanocoai/nanoclaw/pull/4484) 将空间检查前移，并在 validate 阶段展示数值，待合并 |
| **高，取决于网络暴露范围** | **Ollama 代理示例监听所有网卡且无认证**：照搬示例可能扩大服务暴露面。[#4474](https://github.com/nanocoai/nanoclaw/issues/4474) | 开放；未见 fix PR |
| **中高** | **OneCLI 默认密码未更换却报告成功**：部署结果与用户对安全状态的理解不一致。[#4472](https://github.com/nanocoai/nanoclaw/issues/4472) | 开放；[PR #4471](https://github.com/nanocoai/nanoclaw/pull/4471) 拟明确显示密码变更被拒绝的情况，并非保证自动完成轮换 |
| **中高** | **挂载拦截规则未覆盖 `~/.onecli`**：需要补齐敏感宿主目录保护。[#4473](https://github.com/nanocoai/nanoclaw/issues/4473) | 开放；由 [PR #4471](https://github.com/nanocoai/nanoclaw/pull/4471) 覆盖 |
| **中** | **同组 Agent 会话共享可写状态**：记录、笔记及记忆可能相互影响。[#4475](https://github.com/nanocoai/nanoclaw/issues/4475) | 开放；未见 fix PR，需先明确预期隔离模型 |
| **中** | **升级快照包含依赖树和包缓存**：增加磁盘占用及快照成本，并可能放大空间不足问题。[#4479](https://github.com/nanocoai/nanoclaw/issues/4479) | 开放；未见 fix PR |
| **中** | **升级技能要求展示 prepare 未返回的信息**：上游提交与文件分组信息缺失，影响升级说明的完整性。[#4480](https://github.com/nanocoai/nanoclaw/issues/4480) | 开放；未见 fix PR |
| **低** | **pre-commit 无暂存 TypeScript 文件时仍格式化整个 `src/`**：增加提交耗时和意外工作区改动风险。[#4481](https://github.com/nanocoai/nanoclaw/issues/4481) | 开放；未见 fix PR |

另有两项状态变化：Codex 登录目录误删风险已有关闭的 [PR #4477](https://github.com/nanocoai/nanoclaw/pull/4477)；WhatsApp 群聊 reaction 问题 [#4482](https://github.com/nanocoai/nanoclaw/issues/4482) 已关闭。两者均缺少足以确认发布可用性的证据。

## 5. 功能请求与路线图信号

今日未出现明确的新产品功能请求，路线图信号主要指向“更容易安装、更安全运行、更可靠升级”。

- **openSUSE 安装支持**：[PR #4483](https://github.com/nanocoai/nanoclaw/pull/4483) 拟支持在 openSUSE 安装 Node，并让其他非 Debian 发行版获得清晰失败提示。已有实现提交，是较具体的近期候选改进，但不意味着支持所有 Linux 发行版。
- **升级预检查完善**：[PR #4484](https://github.com/nanocoai/nanoclaw/pull/4484) 已覆盖磁盘检查顺序，纳入后续版本的实现基础较明确；快照裁剪和技能输出契约问题仍分别停留在 [#4479](https://github.com/nanocoai/nanoclaw/issues/4479)、[#4480](https://github.com/nanocoai/nanoclaw/issues/4480)。
- **OneCLI 默认安全性**：[PR #4471](https://github.com/nanocoai/nanoclaw/pull/4471) 同时覆盖状态提示与敏感目录挂载限制，是另一项较成熟的候选修复。
- **会话级隔离设计**：[#4475](https://github.com/nanocoai/nanoclaw/issues/4475) 暗示更细粒度的工作区与记忆访问控制需求，但暂无实现，不能判断会进入下一版本。

以上均非正式发布承诺。

## 6. 用户反馈摘要

**数据只提供 Issue 摘要，没有评论正文**，因此以下是报告者表达的痛点，而非评论区共识或满意度结论：

- **自托管升级需要“失败前不打断服务”**：停服顺序与快照体积两项报告共同表明，磁盘资源受限时的升级体验需要改善。[#4478](https://github.com/nanocoai/nanoclaw/issues/4478) · [#4479](https://github.com/nanocoai/nanoclaw/issues/4479)
- **成功提示必须反映真实配置状态**：OneCLI 密码轮换未完成却显示成功，会降低用户对安装流程的信任。[#4472](https://github.com/nanocoai/nanoclaw/issues/4472)
- **文档示例需要安全默认值**：用户可能直接使用 Ollama 代理示例，因此监听地址和认证说明具有实际部署影响。[#4474](https://github.com/nanocoai/nanoclaw/issues/4474)
- **日常操作应减少隐性副作用**：无关文件格式化、共享可写记忆分别影响开发工作流和多会话使用的可预测性。[#4481](https://github.com/nanocoai/nanoclaw/issues/4481) · [#4475](https://github.com/nanocoai/nanoclaw/issues/4475)

数据中没有明确的正向满意度反馈，不宜用低评论数推断用户满意或问题不重要。

## 7. 待处理积压

**无法确认长期积压**：所列条目均于 11 月 19 日创建，缺少历史等待时长和维护者响应记录。当前更适合列为短期跟进队列：

1. **优先评审升级与安全修复**：[PR #4484](https://github.com/nanocoai/nanoclaw/pull/4484)、[PR #4471](https://github.com/nanocoai/nanoclaw/pull/4471)，重点验证低磁盘空间、密码轮换被拒绝及挂载拦截场景。
2. **尽快处理暴露面文档问题**：[#4474](https://github.com/nanocoai/nanoclaw/issues/4474) 尚无 fix PR，可优先评估默认绑定回环地址及补充风险提示。
3. **明确共享状态是否属于预期设计**：[#4475](https://github.com/nanocoai/nanoclaw/issues/4475) 需要维护者给出隔离模型和使用边界，避免仅作为普通缺陷悬置。
4. **补齐升级链路一致性**：联合跟进 [#4479](https://github.com/nanocoai/nanoclaw/issues/4479)、[#4480](https://github.com/nanocoai/nanoclaw/issues/4480)，避免只修复检查顺序而保留体积和信息契约问题。
5. **核验关闭结论**：为 [PR #4477](https://github.com/nanocoai/nanoclaw/pull/4477) 和 [Issue #4482](https://github.com/nanocoai/nanoclaw/issues/4482) 补充合并、替代修复或关闭原因，形成可追溯闭环。

**健康度结论**：NanoClaw 本窗口表现出较强的主动排障与加固活动，但贡献集中、讨论有限，且多数修复仍在等待评审。下一观察点应是关键 PR 的合并与验证结果，而不只是 Issue 关闭数量。

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
**日期：2026-11-20｜统计范围：所提供的过去 24 小时数据**

## 1. 今日速览

过去 24 小时，LobsterAI 有 **1 条 Issue、3 条 PR 更新，无新版本发布**，呈现以桌面交互修复和预设专家管理优化为主的小规模维护节奏。3 条 PR 均已关闭，但数据未提供合并标记，**不能将关闭直接视为代码已合入**。功能侧值得关注的是已安装专家支持主动更新，体验侧则集中改善首页图片示例和 Windows PPT 示例弹窗。新增反馈暴露了有道云笔记 skill 的凭据传递与安装链路风险，建议优先核查；整体有持续维护活动，但单日样本不足以判断长期健康趋势。

> 数据说明：所列条目的创建、更新时间均为 2026-11-19；本报按所提供的“过去 24 小时”窗口整理。PR 评论数缺失，Issue 评论正文未提供。

## 2. 项目进展

今日共有 **3 条 PR 进入关闭状态，涉及 1 项功能增强和 2 项体验修复**。以下进展反映提交方案及处理状态，不代表已经发布。

| PR | 主要变化 | 对项目的推进 | 状态 |
|---|---|---|---|
| [#3118 已安装预设专家支持主动更新](https://github.com/netease-youdao/LobsterAI/pull/3118) | 支持从详情面板或侧栏显式更新已安装专家，无需新建任务；侧栏提供“更新”和“不再提醒”操作 | 增强预设专家的持续维护能力，并将更新选择权交给用户 | 已关闭，合并状态未提供 |
| [#3119 修复 PPT 示例弹窗点击并澄清受众输入](https://github.com/netease-youdao/LobsterAI/pull/3119) | 为弹窗应用 Electron 不可拖拽样式，避免关闭按钮与可拖拽标题栏重叠时无法接收点击；调整中文受众标签 | 修复 Windows 桌面 QA 发现的交互问题，降低输入理解成本 | 已关闭，合并状态未提供 |
| [#3121 首页图片示例默认折叠](https://github.com/netease-youdao/LobsterAI/pull/3121) | 图片示例仅在点击“Image Creation”后展开；新建任务及切换账号时恢复折叠 | 减少首页默认展开内容，使展示行为更一致 | 已关闭，合并状态未提供 |

**整体判断：** 本轮属于局部、渐进式改进，重点在预设内容管理和桌面操作可靠性，未见大规模架构调整信号。

## 3. 社区热点

### 有道云笔记 skill 的安全性成为本日主要反馈
[#3120：API Key 以明文命令行参数传递，安装脚本缺少版本与校验](https://github.com/netease-youdao/LobsterAI/issues/3120)

- **可观测热度：** 1 条评论、0 个 👍，是本次数据中唯一有明确评论计数的 Issue。
- **核心诉求：** 避免 Agent 经手明文 API Key，并避免将凭据直接放入命令行参数；同时提高安装脚本的版本可追溯性与完整性保障。
- **背后需求：** 官方 skill 不仅要能完成配置，也应提供可信、可复现的安装与凭据处理流程。

3 条 PR 的评论数均缺失、反应数均为 0，无法据此进行完整的讨论热度排名，也不宜将该问题描述为已形成广泛社区共识。

## 4. Bug 与稳定性

以下按潜在影响排序；安全项尚未见独立验证，严重程度为基于描述的初步研判。

| 优先级 | 问题及影响 | 修复进展 |
|---|---|---|
| **高：待核实的凭据暴露风险** | [#3120](https://github.com/netease-youdao/LobsterAI/issues/3120) 指出文档要求执行 `youdaonote config set apiKey <Key>`。明文参数可能进入模型/工具上下文、命令记录及进程参数；是否进入 shell 历史取决于实际执行方式 | Issue 开放；所给数据中未见对应 fix PR |
| **中：安装链路缺少版本与校验保障** | [#3120](https://github.com/netease-youdao/LobsterAI/issues/3120) 同时报告安装脚本缺少版本与校验，影响安装可复现性及完整性验证；摘要不足以确认具体实现与影响范围 | 未见对应 fix PR，需进一步审查脚本 |
| **中：Windows PPT 弹窗关闭按钮点击异常** | [#3119](https://github.com/netease-youdao/LobsterAI/pull/3119) 描述按钮与可拖拽标题栏重叠时的鼠标输入问题，影响正常关闭弹窗 | 已有修复 PR，但已关闭，是否合并待确认 |
| **低：首页图片示例默认展开** | [#3121](https://github.com/netease-youdao/LobsterAI/pull/3121) 调整默认展示及重置逻辑，属于交互行为优化 | 已有修复 PR，但是否合并待确认 |

**本次数据未报告崩溃、数据丢失或大范围服务不可用问题。** 这仅表示所给样本中未出现相关报告，并不代表已完成稳定性验证。

## 5. 功能请求与路线图信号

- **预设专家的主动更新机制是最明确的功能信号。** [#3118](https://github.com/netease-youdao/LobsterAI/pull/3118) 已给出详情面板、侧栏更新入口及提醒控制方案，显示项目正在完善已安装专家的后续维护体验。若确认合并，该功能具备进入后续版本的可能，但目前无法确认发布归属。
- **安全配置流程存在改造需求。** [#3120](https://github.com/netease-youdao/LobsterAI/issues/3120) 建议采用受保护的凭据传递方式，或由用户在自己的终端输入，避免 Agent 接触明文。当前仍是问题与建议阶段，未见实现排期。
- **短期维护方向偏向桌面体验收敛。** [#3119](https://github.com/netease-youdao/LobsterAI/pull/3119) 与 [#3121](https://github.com/netease-youdao/LobsterAI/pull/3121) 均为范围较小的 UI 修复；若已合入，适合作为后续维护版本内容，但没有发布承诺。

## 6. 用户反馈摘要

由于未提供 Issue 评论正文，以下仅归纳 **Issue 描述中的直接反馈**，不推断评论者态度：

- **痛点：不希望配置助手以牺牲凭据隐私为代价。** [#3120](https://github.com/netease-youdao/LobsterAI/issues/3120) 指向用户借助 Agent 配置有道云笔记 API Key 的场景，关注明文凭据可能留存在多个环节。
- **期待：官方 skill 提供安全默认值与可验证安装。** 同一 [Issue](https://github.com/netease-youdao/LobsterAI/issues/3120) 将凭据处理、安装版本和校验一起提出，反映出对集成可信度的要求。

本次数据没有足够的用户评价用于判断总体满意度；PR 中的改动动机也不应直接视为已验证的用户满意反馈。

## 7. 待处理积压与维护提醒

**当前无法识别长期未响应积压。** 所列条目均为近期更新，且缺少历史时间线、维护者回复及完整开放列表。

建议优先跟踪：

1. **核查并响应安全反馈。** [#3120](https://github.com/netease-youdao/LobsterAI/issues/3120) 仍开放，应确认 CLI 支持的安全输入方式、Agent 执行时的记录链路，以及安装脚本的版本固定与校验机制。已有 1 条评论，但无法判断维护者是否已回应。
2. **核对关闭 PR 的实际处置结果。** 确认 [#3118](https://github.com/netease-youdao/LobsterAI/pull/3118)、[#3119](https://github.com/netease-youdao/LobsterAI/pull/3119)、[#3121](https://github.com/netease-youdao/LobsterAI/pull/3121) 是已合并还是未采纳，避免将关闭状态误计为已交付。
3. **若修复已合入，补充定向回归验证。** 重点覆盖 [PPT 弹窗按钮点击](https://github.com/netease-youdao/LobsterAI/pull/3119)、[首页示例在新任务和账号切换后的状态](https://github.com/netease-youdao/LobsterAI/pull/3121)，以及[专家更新与关闭详情后的定义保留行为](https://github.com/netease-youdao/LobsterAI/pull/3118)。

**健康度结论：** 本日可见持续维护和具体 QA 修复活动，但交付状态尚需核实。相比新增功能数量，当前更应关注安全反馈能否得到及时确认、修复与闭环。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报｜2026-11-20

> **数据口径**：基于所提供的过去 24 小时更新记录，条目时间均为 2026-11-19。项目名称沿用 CoPaw；由于条目来源指向 `agentscope-ai/QwenPaw`，下文链接按来源仓库生成，不据此推断仓库更名状态。

## 1. 今日速览

过去 24 小时共更新 **3 条 Issue、7 条 PR**，全部处于开放状态，**无合并、关闭或新版本发布**。开发活动集中在模型配置容错、控制台显示适配、插件错误日志和聊天交互增强，整体呈现“小规模修复并行推进、体验问题集中暴露”的状态。社区讨论量较低：3 条 Issue 合计 4 条评论、均无点赞，PR 评论数未提供，暂不足以判断广泛共识。项目健康度方面，修复提案覆盖了实际使用障碍，但本窗口尚无交付闭环，后续应重点观察运行可靠性修复与前端适配 PR 的审查、合并情况。

## 2. 项目进展

### 已落地进展：本窗口无合并或关闭记录

今日没有可确认已进入主分支的功能或修复，以下均为**待合并提案**，不能视为用户已可获得的改进。

| 方向 | 待合并进展 | 意义与边界 |
|---|---|---|
| 运行可靠性 | [#8825：禁用供应商后回退全局默认模型](https://github.com/agentscope-ai/QwenPaw/pull/8825) | 针对 Agent 仍绑定已禁用供应商、导致渠道消息处理失败的问题提出兜底方案。 |
| 控制台可用性 | [#8824：全屏容器安全区适配](https://github.com/agentscope-ai/QwenPaw/pull/8824)、[#8823：宽表格与代码块横向滚动](https://github.com/agentscope-ai/QwenPaw/pull/8823) | 修复移动端系统栏遮挡与消息内容裁切，改善结果阅读和操作体验。 |
| 聊天交互 | [#8819：可配置的后续问题建议](https://github.com/agentscope-ai/QwenPaw/pull/8819) | 引入可选开关，生成最多 3 条建议；点击后追加到当前草稿。标记为 XL，审查范围相对较大。 |
| 可观测性 | [#8818：记录 RPC 请求处理器未处理异常](https://github.com/agentscope-ai/QwenPaw/pull/8818) | 补足插件异常日志，便于定位 worker 侧失败；并非直接修复所有底层异常。 |
| 文档维护 | [#8822：更新 v2.3.0 网站文档](https://github.com/agentscope-ai/QwenPaw/pull/8822)、[#8820：修复失效链接](https://github.com/agentscope-ai/QwenPaw/pull/8820) | 推进版本资料同步和文档可达性；文档更新不等于本窗口发布新版本。 |

**进展判断**：本期前进主要体现在解决方案进入评审队列，而非发布交付。7 条 PR 中，6 条标记为 S/XS、1 条为 XL，但改动尺寸不能直接等同于合并难度或风险。

## 3. 社区热点

按已知评论数排序，当前讨论主要围绕“个人助手能否更适合长期、后台运行”。

1. **任务完成后的 Windows 系统通知：2 条评论，本期最高。**  
   用户希望长任务完成后收到右下角原生通知，避免持续盯着浏览器。其核心诉求是让助手支持“后台执行、完成后提醒”的工作流。  
   链接：[Issue #8821](https://github.com/agentscope-ai/QwenPaw/issues/8821)

2. **Web UI/UX 专项优化：1 条评论。**  
   反馈同时涉及视觉风格不一致、小屏适配、模型配置分散，以及长会话切换缺少加载反馈。这不仅是界面美观问题，也涉及配置效率和交互可信度。  
   链接：[Issue #8817](https://github.com/agentscope-ai/QwenPaw/issues/8817)

3. **聊天数据生命周期：1 条评论。**  
   多 Agent、长期运行用户希望统一聊天数据管理，覆盖可恢复删除、按范围保留和可见性。其背景是多个聊天数据写入路径并存，增加管理复杂度。  
   链接：[Issue #8816](https://github.com/agentscope-ai/QwenPaw/issues/8816)

**热度边界**：以上 Issue 均为 0 赞，PR 评论数缺失，因此只能判断相对讨论热度，不能认定为大规模社区共识。

## 4. Bug 与稳定性

> 以下为依据摘要作出的相对优先级判断，并非维护者官方严重性评级；部分问题来自待合并 PR 的问题描述，尚无独立复现结果。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高** | 禁用模型供应商后，Agent 运行配置仍引用该供应商，可能导致后续飞书、钉钉、微信等渠道消息在模型构建阶段失败。 | 已有待合并修复 [PR #8825](https://github.com/agentscope-ai/QwenPaw/pull/8825)。 |
| **中高** | 聊天数据缺少统一生命周期，影响长期运行、多 Agent 场景的数据保留和删除管理。现有摘要不足以确认具体数据丢失或泄露事件。 | 本批数据未见对应 fix PR；见 [Issue #8816](https://github.com/agentscope-ai/QwenPaw/issues/8816)。 |
| **中** | 插件 RPC 未预期异常返回内部错误后未记录日志，增加故障定位难度。 | 已有日志补强 [PR #8818](https://github.com/agentscope-ai/QwenPaw/pull/8818)，不等同于底层故障已修复。 |
| **中** | 长会话或进行中会话切换迟缓，且缺少加载反馈，用户难以判断操作是否生效。 | 本批数据未见直接对应修复；见 [Issue #8817](https://github.com/agentscope-ai/QwenPaw/issues/8817)。 |
| **中** | 宽 Markdown 表格与长代码块被裁切，影响回复内容完整阅读，窄屏影响更明显。 | 已有待合并修复 [PR #8823](https://github.com/agentscope-ai/QwenPaw/pull/8823)。 |
| **中低** | PWA、桌面快捷入口及边到边 WebView 中，系统状态栏遮挡页面头部与侧栏。 | 已有待合并修复 [PR #8824](https://github.com/agentscope-ai/QwenPaw/pull/8824)。 |

本批记录未明确报告新的进程崩溃，也不足以认定上述问题为近期版本回归。

## 5. 功能请求与路线图信号

- **后续问题建议：已有实现，进入近期版本的信号最明确。**  
  [PR #8819](https://github.com/agentscope-ai/QwenPaw/pull/8819) 已提出可选开关，并复用现有提示词、Markdown 和会话处理链路。不过 PR 仍开放，且尺寸为 XL，是否进入下一版本取决于审查与验证。

- **UI/UX 改善：局部修复在推进，尚不能视为全面改版。**  
  [Issue #8817](https://github.com/agentscope-ai/QwenPaw/issues/8817) 提出了系统性诉求；[#8823](https://github.com/agentscope-ai/QwenPaw/pull/8823) 和 [#8824](https://github.com/agentscope-ai/QwenPaw/pull/8824) 与显示适配方向一致，但未覆盖设计系统统一、模型配置整合和长会话性能等全部问题。

- **Windows 完成通知：需求明确，暂未见实现。**  
  [Issue #8821](https://github.com/agentscope-ai/QwenPaw/issues/8821) 体现个人助手向异步工作流发展的需求，本批数据未见对应 PR 或版本承诺。

- **聊天数据治理：长期使用场景的重要信号。**  
  [Issue #8816](https://github.com/agentscope-ai/QwenPaw/issues/8816) 涉及多个数据路径的统一管理，可能需要跨存储设计；目前不足以判断能否纳入下一版本。

## 6. 用户反馈摘要

**材料限制**：输入提供了评论数量，但没有评论正文。以下提炼自 Issue 描述，不将其表述为评论区共识。

- **工作流痛点：不愿为等待结果持续占用注意力。** 用户会把长任务放到后台，同时手动处理其他工作，希望由系统通知承接完成提醒。  
  来源：[Issue #8821](https://github.com/agentscope-ai/QwenPaw/issues/8821)

- **配置痛点：模型管理入口分散。** 用户质疑记忆向量模型、重排模型等需按 Agent 单独配置的方式，期待更一致的模型选择体验。  
  来源：[Issue #8817](https://github.com/agentscope-ai/QwenPaw/issues/8817)

- **交互痛点：缺少反馈导致“不知道是否响应”。** 长会话切换等待期间没有加载提示，使性能问题进一步转化为不确定感。  
  来源：[Issue #8817](https://github.com/agentscope-ai/QwenPaw/issues/8817)

- **长期使用痛点：聊天数据难以统一治理。** 用户明确提供 Linux、多 Agent、长期运行环境，并称在 `2.3.0.post1` 与 `2.2.x` 均见相关问题。该版本信息来自用户报告，不代表本日报确认了对应发布记录。  
  来源：[Issue #8816](https://github.com/agentscope-ai/QwenPaw/issues/8816)

本批材料没有明确的正向满意度反馈，不宜据此评价整体用户满意度。

## 7. 待处理积压与维护建议

**无法确认“长期未响应”积压**：本批条目均为近期创建，且缺少维护者回复、历史审查和完整时间线。建议关注以下队列，而非直接标记为陈旧积压：

1. **优先审查渠道消息失败的修复。**  
   [PR #8825](https://github.com/agentscope-ai/QwenPaw/pull/8825) 涉及核心运行链路，建议验证默认模型同样不可用时的行为，以及回退是否具备清晰提示。

2. **为聊天数据生命周期问题补充范围与验收标准。**  
   [Issue #8816](https://github.com/agentscope-ai/QwenPaw/issues/8816) 提到旧版本已有类似反馈，值得追踪历史关联，但不能仅凭该描述断言长期无人处理。

3. **拆分宽泛的 UI/UX 反馈。**  
   将 [Issue #8817](https://github.com/agentscope-ai/QwenPaw/issues/8817) 拆为视觉一致性、响应式布局、模型配置和会话性能等可验证事项，便于明确优先级与完成标准。

4. **对 XL 交互功能加强回归检查。**  
   [PR #8819](https://github.com/agentscope-ai/QwenPaw/pull/8819) 建议重点验证关闭开关时的行为、建议生成失败处理，以及追加草稿是否影响用户正在编辑的内容。

**总体结论**：本期项目有持续开发投入，可靠性和日常体验均出现针对性修复，但所有改动仍待合并。下一观察点应是核心故障修复能否完成验证交付，以及长期使用场景下的数据治理与交互问题能否形成明确的处理计划。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报｜2026-11-20

> **统计范围：**所提供的过去 24 小时 GitHub 更新，记录日期均为 2026-11-19。PR 共更新 21 条，但仅提供其中 20 条详情；以下分析以已展示数据为准。  
> **项目：**[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

## 1. 今日速览

过去 24 小时，ZeroClaw 有 **2 条 Issue、21 条 PR 更新**，贡献侧较活跃，但全部仍处于开放状态，**没有可确认的合并、关闭或新版本发布**。工作重点集中在 Qwen 视频输入、模型请求格式适配、依赖安全修补，以及 CI、发布流程和代码清理。当前最需要关注的是日志临时文件泄漏导致守护进程启动挂起的 **S1 阻断问题**，其次是插件 CLI 验证结果与运行时实际可用性不一致。总体呈现“提案活跃、交付尚待确认”的状态，不能将待合并 PR 视为已落地成果。  
参考：[PR 列表](https://github.com/zeroclaw-labs/zeroclaw/pulls) · [启动挂起 #12570](https://github.com/zeroclaw-labs/zeroclaw/issues/12570) · [插件加载问题 #12569](https://github.com/zeroclaw-labs/zeroclaw/issues/12569)

## 2. 项目进展

**今日没有已合并或已关闭的重要 PR。** 可确认的进展主要是提交了修复和功能方案，尚不能据此判断主分支能力已经提升。

| 方向 | 待合并进展 | 价值与边界 |
|---|---|---|
| 多模态输入 | [#12578：Qwen MP4 文件输入](https://github.com/zeroclaw-labs/zeroclaw/pull/12578)、[#12579：MCP MP4 资源接入](https://github.com/zeroclaw-labs/zeroclaw/pull/12579) | 前者覆盖流式、非流式、历史消息和原生工具请求；后者将显式声明为 `video/mp4` 的 MCP 资源转为视频附件。两者共同指向视频输入链路扩展，但均未合并。 |
| 模型适配 | [#12591：GPT-6.2 提示词缓存修复](https://github.com/zeroclaw-labs/zeroclaw/pull/12591) | 拟将稳定系统提示词从顶层 `instructions` 改为前置 `developer` 输入项，以改善缓存可靠性；尚无量化效果数据。 |
| 依赖安全 | [#12577：heapless / Wasmtime 更新](https://github.com/zeroclaw-labs/zeroclaw/pull/12577) | 拟升级 `heapless` 至 0.9.4、Wasmtime/WASI 至 48.0.9，处理摘要列出的 RustSec 告警，并同步插件依赖要求。 |
| 构建与发布 | [#12590：Docker 构建文件修复](https://github.com/zeroclaw-labs/zeroclaw/pull/12590)、[#12575：macOS 公证与 stapling 重试](https://github.com/zeroclaw-labs/zeroclaw/pull/12575)、[#12573：公告与网站重部署重试](https://github.com/zeroclaw-labs/zeroclaw/pull/12573) | 主要降低构建输入缺失、外部服务短暂失败引发的流水线失败。 |
| CI 稳定性与效率 | [#12574：并行运行时测试停滞超时处理](https://github.com/zeroclaw-labs/zeroclaw/pull/12574)、[#12572：按需获取 Git 历史](https://github.com/zeroclaw-labs/zeroclaw/pull/12572) | 针对测试停滞拖满作业时限，以及 checkout 过慢导致质量门禁失败的问题。 |

维护性方面还提交了 Web 无用模块清理、日志 API 客户端复用、PostgreSQL 图枚举方法复用，以及重复测试移除等改动。这些体现了持续整理代码的投入，但实际维护成本和测试覆盖影响仍需审查确认。  
参考：[#12586](https://github.com/zeroclaw-labs/zeroclaw/pull/12586) · [#12581](https://github.com/zeroclaw-labs/zeroclaw/pull/12581) · [#12582](https://github.com/zeroclaw-labs/zeroclaw/pull/12582) · [#12585](https://github.com/zeroclaw-labs/zeroclaw/pull/12585)

## 3. 社区热点

**无法按讨论热度可靠排名：**两条 Issue 均为 **0 评论、0 👍**；所展示 PR 的评论数为 `undefined`，不能视为零，也不能据此认定谁讨论最多；其 👍 均为 0。以下仅按潜在影响筛选关注主题。

- **常驻服务的可用性。** [#12570](https://github.com/zeroclaw-labs/zeroclaw/issues/12570) 报告日志目录累积数百万临时文件后，守护进程启动挂起。背后的诉求是长期运行过程中，日志维护失败不应持续积累为启动阻断。
- **插件“验证成功”必须代表实际可用。** [#12569](https://github.com/zeroclaw-labs/zeroclaw/issues/12569) 中，插件安装及验证通过，但因名称与内置工具冲突，运行时拒绝注册。核心诉求是 CLI 检查与运行时注册规则一致。
- **视频资源应以视频而非文本路径进入模型。** [#12578](https://github.com/zeroclaw-labs/zeroclaw/pull/12578) 与 [#12579](https://github.com/zeroclaw-labs/zeroclaw/pull/12579) 体现了扩展多模态工具链的开发方向，但目前没有讨论数据证明其社区需求强度。

## 4. Bug 与稳定性

以下按处理优先级排列；仅前两项有明确的 Issue 严重性标注。

| 优先级 / 严重性 | 问题与影响 | 是否已有修复 PR |
|---|---|---|
| **高｜S1，报告者标注** | **守护进程启动挂起。** 滚动日志裁剪出错时泄漏 `runtime-trace.tmp.*`，累积数百万文件后触发启动问题，属于工作流阻断。[#12570](https://github.com/zeroclaw-labs/zeroclaw/issues/12570) | **提供的数据中未见明确对应 PR。** |
| **高｜安全影响待核验** | **依赖 RustSec 告警。** PR 摘要称 Wasmtime/WASI 更新覆盖 `RUSTSEC-2026-0566` 至 `RUSTSEC-2026-0573`，并修补 heapless；当前部署的实际暴露面无法由摘要确认。[#12577](https://github.com/zeroclaw-labs/zeroclaw/pull/12577) | **有，#12577，待合并。** |
| **中｜S2，报告者标注** | **插件检查误报可加载。** 名为 `weather` 的工具插件与内置工具重名，CLI 检查通过，但模型最终无法看到该工具。[#12569](https://github.com/zeroclaw-labs/zeroclaw/issues/12569) | **提供的数据中未见明确对应 PR。** |
| **中｜构建可靠性** | **Docker 构建缺少嵌入脚本。** `.dockerignore` 排除的 Windows 安装脚本被 Web 构建代码嵌入，PR 拟重新纳入构建上下文。[#12590](https://github.com/zeroclaw-labs/zeroclaw/pull/12590) | **有，#12590，待合并。** |
| **中｜CI 可靠性** | **测试停滞与发布流程瞬时失败。** 包括并行测试长时间无进展、macOS stapling 失败、Discord webhook 504 等；这些是工程流水线问题，不等同于终端用户运行时崩溃。[#12574](https://github.com/zeroclaw-labs/zeroclaw/pull/12574) · [#12575](https://github.com/zeroclaw-labs/zeroclaw/pull/12575) · [#12573](https://github.com/zeroclaw-labs/zeroclaw/pull/12573) | **均有待合并 PR。** |

## 5. 功能请求与路线图信号

今日两条 Issue 均为 Bug，**没有明确的新功能请求**。路线图信号主要来自开放 PR，而非已确认的发布承诺。

- **Qwen 视频输入是最明确的功能扩展候选。** 本地 MP4 输入与 MCP 视频资源路由形成互补，可能推动“工具返回视频→模型理解视频”的链路。但相关 PR 标记为 L/XL，涉及 provider、runtime、agent 等模块，进入下一版本仍取决于审查和测试。  
  链接：[#12578](https://github.com/zeroclaw-labs/zeroclaw/pull/12578) · [#12579](https://github.com/zeroclaw-labs/zeroclaw/pull/12579)

- **模型请求格式与缓存行为适配持续推进。** GPT-6.2 修复提案说明 provider 层正在针对特定模型调整请求组织方式；可视为兼容性与运行效率方向的信号，不能据此宣称已降低成本。  
  链接：[#12591](https://github.com/zeroclaw-labs/zeroclaw/pull/12591)

- **委派场景的会话记忆路由语义继续澄清。** 文档 PR 拟补充 bounded delegation 使用 owner plane 的路由说明，反映多智能体委派中的状态归属是持续关注点；该 PR 本身不是新增运行时实现。  
  链接：[#12576](https://github.com/zeroclaw-labs/zeroclaw/pull/12576)

## 6. 用户反馈摘要

**没有可供提炼的 Issue 评论。** 下述反馈仅来自两条问题正文，且均由 JordanTheJet 提交，不宜外推为广泛用户共识。

| 使用场景 | 已报告的真实痛点 | 体验诉求 |
|---|---|---|
| 守护进程使用滚动日志存储 | 裁剪失败产生大量残留文件，最终影响启动，妨碍正常运行。 | 日志失败应可恢复，残留文件不应无限积累或阻断启动。[#12570](https://github.com/zeroclaw-labs/zeroclaw/issues/12570) |
| 安装自定义工具插件 | 安装、验证显示成功，但运行时不注册，模型无法使用工具。 | 提前识别保留名称冲突，并给出与实际加载状态一致的诊断。[#12569](https://github.com/zeroclaw-labs/zeroclaw/issues/12569) |

现有数据中**没有明确的正向满意度反馈**，也没有修复后用户验证结果。

## 7. 待处理积压与维护提醒

**无法识别“长期未响应”的积压。** 已展示条目均于 2026-11-19 创建、更新，且缺少历史审查和响应记录；21 条开放 PR 只是本次更新窗口涉及的数量，不代表仓库总积压。

建议维护者优先关注：

1. **为 S1 启动挂起问题建立明确处置路径。** 优先确认复现、临时文件泄漏原因和受影响环境，并跟踪对应修复；当前快照尚未出现关联 fix PR。  
   链接：[#12570](https://github.com/zeroclaw-labs/zeroclaw/issues/12570)

2. **审查依赖安全补丁及其兼容性。** 确认主程序与插件消费者的依赖约束同步，并核验安全告警是否消除。  
   链接：[#12577](https://github.com/zeroclaw-labs/zeroclaw/pull/12577)

3. **统一插件安装验证与运行时注册规则。** 避免“验证通过但不可用”继续误导排障。  
   链接：[#12569](https://github.com/zeroclaw-labs/zeroclaw/issues/12569)

4. **协调视频输入相关 PR 的评审边界。** 两项提案分别覆盖 provider 输入与 MCP 资源接入，适合联合检查格式处理、文件读取边界和端到端行为。  
   链接：[#12578](https://github.com/zeroclaw-labs/zeroclaw/pull/12578) · [#12579](https://github.com/zeroclaw-labs/zeroclaw/pull/12579)

**健康度结论：**贡献活动活跃，维护工作覆盖面较广；但今日没有可确认的交付闭环。短期最重要的不是新增提案数量，而是推动阻断性 Bug、安全修补和构建稳定性改动完成审查、合并与验证。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*