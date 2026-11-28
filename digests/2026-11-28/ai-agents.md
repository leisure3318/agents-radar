# OpenClaw 生态日报 2026-11-28

> Issues: 54 | PRs: 78 | 覆盖项目: 13 个 | 生成时间: 2026-11-28 03:43 UTC

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
**日期：2026-11-28**  
项目：[openclaw/openclaw](https://github.com/openclaw/openclaw)

> **数据口径**：基于所提供的过去 24 小时统计，以及其中展示的 50 条 Issue、30 条 PR 和一段截断的 Release 说明。`CLOSED` 不等于已修复或已合并；未提供评论正文、PR 合并字段及完整发布说明，因此相关结论均作保守判断。

## 1. 今日速览

OpenClaw 今日保持**高活跃度**：过去 24 小时共更新 **54 条 Issue、78 条 PR**，并发布 **1 个 Beta 版本**。研发重点集中在更新流程、模型订阅认证、自动化通知、多智能体结果交付，以及 UI/测试可靠性。与此同时，展示样本中出现数据库损坏、Android 接入失败、Windows 更新失败等 **P0 标签问题**，消息丢失和进程生命周期问题也较集中，稳定性压力仍然显著。整体判断是：**开发与问题分诊活跃，但不能据此认定风险已得到消化**，尤其应关注高严重度问题与待审 PR 的闭环速度。

| 指标 | 过去 24 小时 | 解读 |
|---|---:|---|
| Issue 更新 | 54 | 41 条新开/活跃，13 条关闭；并非 41 条全部新建 |
| PR 更新 | 78 | 63 条待合并，15 条已合并/关闭；无法拆分实际合并数 |
| 新版本 | 1 | `v2026.12.1-beta.1` |
| 展示样本互动 | Issue 最高 8 条评论 | 展示条目点赞均为 0；PR 评论字段缺失，不能比较讨论热度 |

来源：[Issues](https://github.com/openclaw/openclaw/issues) · [Pull requests](https://github.com/openclaw/openclaw/pulls)

## 2. 版本发布

### [v2026.12.1-beta.1](https://github.com/openclaw/openclaw/releases/tag/v2026.12.1-beta.1)

**可确认的更新：**

- **Git 安装更新机制调整**：采用预准备的发布产物与常驻 launcher；包更新在准备阶段不停止正在服务的 Gateway。目标是减少更新准备对在线服务的干扰，但不代表整个升级过程完全无中断。关联：[ #203194](https://github.com/openclaw/openclaw/pull/203194)、[#203497](https://github.com/openclaw/openclaw/pull/203497)。
- **Prompt 缓存优化**：发布摘要明确提及，压缩过程可跨路由复用已预热的 prompt cache。后续说明从 “read-only” 处截断，无法确认完整适用范围。[发布说明](https://github.com/openclaw/openclaw/releases/tag/v2026.12.1-beta.1)

**破坏性变更与迁移注意事项：**

- 提供的摘要未列出破坏性变更，**不能据此认定没有破坏性变更**；正式升级前需核对完整说明。[完整 Release](https://github.com/openclaw/openclaw/releases/tag/v2026.12.1-beta.1)
- 使用 Git 安装、服务托管或自定义启动脚本的部署，建议在测试环境检查新 launcher、重启与回滚流程；更新准备锁的所有权问题仍有待审修复，不能视为该 Beta 已包含。[PR #207139](https://github.com/openclaw/openclaw/pull/207139)
- 生产部署建议先验证备份可恢复性，并重点回归 SQLite 状态、Windows 启动和更新路径；现有故障报告主要涉及旧稳定版，尚不能判断新 Beta 是否修复或受影响。[#207162](https://github.com/openclaw/openclaw/issues/207162) · [#206669](https://github.com/openclaw/openclaw/issues/206669)

## 3. 项目进展

### 今日已关闭的重要 PR：有处理动作，但落地状态待核验

| PR | 推进方向 | 状态判断 |
|---|---|---|
| [#207163](https://github.com/openclaw/openclaw/pull/207163) | 启动后显示后台插件修复警告和恢复命令，避免子进程成功退出掩盖配置冲突 | CLOSED；未提供合并信息 |
| [#207128](https://github.com/openclaw/openclaw/pull/207128) | 避免将恢复提示写入 Claude 聊天历史，改善重试场景的上下文卫生 | CLOSED；未提供合并信息 |

### 尚未合并、但值得关注的实质推进

- **在线认证管理**：[#207177](https://github.com/openclaw/openclaw/pull/207177) 尝试在 Gateway 运行时检查和激活已保存的模型登录；[#207178](https://github.com/openclaw/openclaw/pull/207178) 将原生 Claude 订阅登录接入聊天账号选择器。前者标注认证合并风险且等待作者处理，不能视为即将上线。
- **结果交付可靠性**：[#207194](https://github.com/openclaw/openclaw/pull/207194) 为“子智能体已完成，但报告无法在父聊天启动”提供用户可见通知；[#207186](https://github.com/openclaw/openclaw/pull/207186) 改善模型不可运行时的 Cron 通知。
- **长任务与可观测性**：[#207185](https://github.com/openclaw/openclaw/pull/207185) 处理 Memory Dreaming Promotion 超过六分钟后中止的问题；[#207090](https://github.com/openclaw/openclaw/pull/207090) 补充 CLI 后端运行中的模型信息。
- **测试有效性**：插件保留、SDK 命名导出、Skills 冷加载和 HiDPI 点击等测试得到补强，重点是避免“误通过”和时序性误失败。[#207181](https://github.com/openclaw/openclaw/pull/207181) · [#207170](https://github.com/openclaw/openclaw/pull/207170) · [#207196](https://github.com/openclaw/openclaw/pull/207196) · [#207184](https://github.com/openclaw/openclaw/pull/207184)

**进展评估**：当天推进以工程可靠性和故障可见性为主，而非大型新功能扩张；由于缺少实际合并清单，无法量化已进入主分支的交付量。

## 4. 社区热点

按已展示 Issue 的评论数排序：

| 热点 | 评论数 | 背后诉求 |
|---|---:|---|
| [#206669：Windows SQLite 完整性 worker 不退出](https://github.com/openclaw/openclaw/issues/206669) | 8 | 每个数据库启动可能耗尽约 300 秒检查预算，用户需要可预测的启动时间和可靠的子进程回收 |
| [#207190：会话内停止 Gateway 自死锁](https://github.com/openclaw/openclaw/issues/207190) | 5 | 智能体执行运维操作时，应快速拒绝不安全操作或提供异步交接，而非等待约 324 秒 |
| [#207082：Android 命名角色接入失败](https://github.com/openclaw/openclaw/issues/207082) | 4 | QR、bootstrap token、节点审批应形成清晰的一体化流程；安全边界不应成为隐藏步骤 |
| [#207099：决策工具错误提示过于泛化](https://github.com/openclaw/openclaw/issues/207099) | 3 | 参数校验需要能区分具体错误；Issue 已关闭，但修复情况未知 |
| [#207098：决策插件类型受限](https://github.com/openclaw/openclaw/issues/207098) | 3 | 本地模型与插件支持的能力不应被过窄 manifest 契约阻断；Issue 已关闭，原因未知 |

PR 评论数均为 `undefined`，无法可靠选出“最热 PR”；展示条目点赞均为 0，也不足以按反应数判断共识强度。

## 5. Bug 与稳定性

以下按数据中的优先级标签排序。**“未见 fix PR”仅表示提供的数据未展示，不代表仓库中不存在。**

| 优先级 | 问题与影响 | Fix PR 状态 |
|---|---|---|
| **P0** | [#207162：Linux SQLite WAL inode 被替换，报告 B-tree 损坏及 SIGKILL](https://github.com/openclaw/openclaw/issues/207162)。存在数据损失风险；尚无独立最小复现 | 未见；待维护者审查 |
| **P0** | [#207082：Android 命名操作员角色接入阻塞](https://github.com/openclaw/openclaw/issues/207082)。涉及认证与安全审查，不等于已确认安全漏洞 | 未见；待产品决策、安全审查及现场复现 |
| **P0** | [#207140：Windows 2026.11.10 更新失败](https://github.com/openclaw/openclaw/issues/207140) | 未见；需要更多信息 |
| **P0** | [#206921：订阅推理可用，但创建智能体要求 OpenAI API key](https://github.com/openclaw/openclaw/issues/206921) | 未见直接对应修复 |
| **P1** | [#206669：Windows SQLite 检查 worker 存活导致启动长等待](https://github.com/openclaw/openclaw/issues/206669) | 未见；待维护者审查 |
| **P1** | [#206944：原生子进程清理能力不可用，exec 无法返回输出](https://github.com/openclaw/openclaw/issues/206944) | 未见；需要更多信息 |
| **P1** | [#207058：回复会话轮转等待 15 秒后放弃当前轮次](https://github.com/openclaw/openclaw/issues/207058) | 未见；需要更多信息 |
| **P1** | [#207095：嵌套子智能体过早终结，最终答案未交付](https://github.com/openclaw/openclaw/issues/207095) | 标注可排队修复、已有源码复现；未见直接 fix PR |
| **P1** | [#207096：嵌套工具生命周期异常导致飞书消费者关闭、消息丢失](https://github.com/openclaw/openclaw/issues/207096) | 未见；需要更多信息 |
| **P1** | [#206989：Telegram 长任务结束后失去发送能力，无回复却记为完成](https://github.com/openclaw/openclaw/issues/206989) | 未见；需要更多信息 |
| **P1** | [#206884：Cron 的 `no_change` 提示抑制任务所需回复](https://github.com/openclaw/openclaw/issues/206884) | 未见直接 fix PR；[#207071](https://github.com/openclaw/openclaw/pull/207071) 仅处理相关提示中的工具命名 |
| **P2** | [#207161：Code Mode 显示完成，但有副作用的嵌套 exec 仍运行](https://github.com/openclaw/openclaw/issues/207161) | 未见；待维护者审查及产品决策 |
| **P2** | [#207039：ACP 会话 `/compact` 压缩 Gateway 镜像，而非实际 harness](https://github.com/openclaw/openclaw/issues/207039) | 标注可排队修复；未见直接 fix PR |

另一个值得关注的问题是：运行时系统提示更新以用户消息形式送入模型，可能被抗注入模型忽略；目前需要安全审查及现场复现，**不宜简单通过提高所有更新消息的信任级别解决**。[#207079](https://github.com/openclaw/openclaw/issues/207079)

## 6. 功能请求与路线图信号

| 方向 | 用户需求与依据 | 近期判断 |
|---|---|---|
| **细粒度多智能体权限** | 插件派发子智能体支持每次调用 `toolsDeny`、可选父会话关联。[#206781](https://github.com/openclaw/openclaw/issues/206781) | 待产品决策，未见实现 PR |
| **家庭/多人共享 Gateway** | 将 owner 权限限制到单个智能体，而非全局管理员。[#206970](https://github.com/openclaw/openclaw/issues/206970) | 方向明确，但需安全设计 |
| **受限聊天运维入口** | 从批准的 Telegram topic 发起仓库级发布/合并请求，限制重放、跨 topic 和权限扩张。[#207034](https://github.com/openclaw/openclaw/issues/207034) | 仍处产品与安全评审阶段 |
| **自动化结果可恢复** | 重试已成功执行、但通知失败的原运行公告，避免重跑外部副作用。[#207009](https://github.com/openclaw/openclaw/issues/207009) | 相关通知 PR 活跃，但未见该能力的直接实现 |
| **操作前可预览** | 模板版本差异、Workboard 下一批派发、备份保留策略删除预览。[#207014](https://github.com/openclaw/openclaw/issues/207014) · [#207011](https://github.com/openclaw/openclaw/issues/207011) · [#207010](https://github.com/openclaw/openclaw/issues/207010) | 体现可审计、低风险操作诉求；暂无明确落地承诺 |

**下一版本候选观察**：已有开放 PR 的 CLI 模型展示、Claude 原生登录和自动化通知改进，比尚处讨论阶段的新功能更接近交付；但 PR 开放、待补证或等待作者处理，均不构成版本承诺。[#207090](https://github.com/openclaw/openclaw/pull/207090) · [#207178](https://github.com/openclaw/openclaw/pull/207178) · [#207186](https://github.com/openclaw/openclaw/pull/207186)

## 7. 用户反馈摘要

**未提供评论正文，以下依据 Issue 描述归纳，不作为评论原话或满意度调查结果。**

- **“执行完成”不等于“用户收到结果”**：Telegram 长任务、多层子智能体、飞书工具链都暴露了完成状态与消息交付脱节的问题。用户真正需要的是端到端交付确认，而不只是后台任务成功。[#206989](https://github.com/openclaw/openclaw/issues/206989) · [#207095](https://github.com/openclaw/openclaw/issues/207095) · [#207096](https://github.com/openclaw/openclaw/issues/207096)
- **个人助手正在承担自身运维，但生命周期边界不清晰**：会话内停止 Gateway 会阻塞；认证检查也存在要求停机的使用障碍。[#207190](https://github.com/openclaw/openclaw/issues/207190) · [PR #207177](https://github.com/openclaw/openclaw/pull/207177)
- **用户希望订阅账号“配置一次、处处可用”**：正常推理、创建智能体和聊天账号选择之间的认证能力不一致，增加了配置成本。[#206921](https://github.com/openclaw/openclaw/issues/206921) · [PR #207178](https://github.com/openclaw/openclaw/pull/207178)
- **诊断质量直接影响可维护性**：错误指向日志文件而非不安全父目录、没有安全临时目录却建议重试等反馈，说明用户需要具体、可执行且不误导的恢复指导。[#207055](https://github.com/openclaw/openclaw/issues/207055) · [#207042](https://github.com/openclaw/openclaw/issues/207042)

没有足够数据提炼可靠的正向满意度结论；关闭数量也不能代替用户确认问题已解决。

## 8. 待处理积压与维护提醒

样本中的 Issue/PR 创建时间主要为 **11 月 27—28 日**，不足以识别“长期未响应”积压。以下属于**当前应优先追踪的待处理项**，而非已证实长期无人处理：

1. **数据库损坏报告优先闭环**：明确 WAL 文件替换的责任路径、最小复现、影响版本和安全恢复建议。[#207162](https://github.com/openclaw/openclaw/issues/207162)
2. **补齐 P0 接入与更新故障的证据链**：Android 接入需要安全与产品联合判断；Windows 更新失败需要可定位的日志与阶段信息。[#207082](https://github.com/openclaw/openclaw/issues/207082) · [#207140](https://github.com/openclaw/openclaw/issues/207140)
3. **集中审查已有源码复现的消息丢失问题**：嵌套子智能体和 Cron 回复抑制均已有明确修复方向，应避免停留在分诊标签阶段。[#207095](https://github.com/openclaw/openclaw/issues/207095) · [#206884](https://github.com/openclaw/openclaw/issues/206884)
4. **推动待补证 PR 完成验收**：CLI 模型展示及 Cron 提示修复仍标注需要证明，建议补充回归测试和可复现的前后对比。[#207090](https://github.com/openclaw/openclaw/pull/207090) · [#207071](https://github.com/openclaw/openclaw/pull/207071)
5. **控制认证与更新基础设施变更风险**：对大型认证改动及更新锁修复进行并发、重启、失败恢复专项验证。[#207177](https://github.com/openclaw/openclaw/pull/207177) · [#207139](https://github.com/openclaw/openclaw/pull/207139)

**健康度结论：研发响应和测试治理信号积极，但稳定性风险尚未充分闭环。近期最重要的衡量标准应是数据安全、消息交付成功率与升级恢复能力，而非单纯的 Issue/PR 活跃数量。**

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-28｜基于所提供的过去 24 小时社区动态**

> **口径说明**：Issue、PR 数均指窗口内更新量，不等于新建量或交付量；`CLOSED` 不等于已合并。部分明细及发布说明不完整，以下不以单日活跃度推断长期社区规模，也不将问题报告数量直接等同于质量水平。

## 1. 生态全景

本次覆盖的 **13 个项目合计有 123 条 Issue、173 条 PR 更新，发布 3 个版本**，活动主要集中于 OpenClaw、Hermes Agent，以及处于引擎迁移期的 LobsterAI。生态关注点正从“增加工具和渠道”转向“让长期运行的助手可靠完成任务”，消息交付、故障恢复、会话压缩和升级兼容成为共同课题。MCP、技能目录和插件接口继续扩张，但同时带来工具上下文开销、权限隔离与生命周期治理需求。各项目的技术底座仍在分化：一部分强化常驻 Gateway 和多渠道编排，另一部分探索按需工具发现、远程运行或替换底层引擎，尚未形成单一收敛路线。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | **54** | **78** | `v2026.12.1-beta.1` | 工程与分诊活跃；数据库、消息交付和更新风险待闭环 |
| **Hermes Agent** | **50** | **50** | `v0.23.5` 稳定补丁版 | 修复供给密集；安全隔离、长会话与无人值守任务压力突出 |
| **LobsterAI** | 0 | **15** | `2026.11.27` | 大规模引擎迁移后集中稳定化；兼容性和回退能力需验证 |
| **ZeroClaw** | 6 | **14** | 无 | MCP、配置与渠道修复活跃；全部开放，交付效果待验证 |
| **CoPaw** | 6 | **9** | 无 | 核心故障已有定向补丁；恢复语义、Cron 与上下文隔离仍有阻断 |
| **NanoBot** | 1 | 4 | 无 | 功能提案驱动；工具发现、技能兼容和订阅接入待审 |
| **NanoClaw** | 4 | 2 | 无 | 部署与命令边界问题集中；远程运行方案进入提案阶段 |
| **PicoClaw** | 2 | 1 | 无 | 小规模定向维护；Web 性能已有补丁，代理链路问题待处理 |
| NullClaw | 0* | 0* | 未报告新版本 | 无足够窗口信号评价健康度 |
| IronClaw | 0* | 0* | 未报告新版本 | 无足够窗口信号评价健康度 |
| TinyClaw | 0* | 0* | 未报告新版本 | 无足够窗口信号评价健康度 |
| Moltis | 0* | 0* | 未报告新版本 | 无足够窗口信号评价健康度 |
| ZeptoClaw | 0* | 0* | 未报告新版本 | 无足够窗口信号评价健康度 |
| **合计** | **123** | **173** | **3 个版本** | 活跃集中，但多数修复尚缺发布与验收证据 |

\* 按“过去 24 小时无活动”计入本表，不代表长期停滞。

**集中度观察：**OpenClaw 与 Hermes Agent 合计贡献约 **85% 的 Issue 更新和 74% 的 PR 更新**，是本窗口最主要的开发与用户反馈中心。

## 3. OpenClaw 在生态中的定位

### 核心定位：广覆盖、常驻运行的助手编排平台

OpenClaw 本期同时涉及 Gateway、多智能体、Cron、模型认证、插件、桌面及移动端接入，其工程范围更接近一个**持续运行的个人助手平台**，而非单一聊天客户端或工具调用库。

**相对优势**

- **可见贡献吞吐最高**：78 条 PR 更新，是 Hermes Agent 的约 **1.56 倍**；但这衡量的是工作流量，不是合并产出。
- **端到端工程覆盖广**：从后台任务、子智能体结果到渠道通知，再到更新器、launcher 和测试治理，维护对象涵盖完整运行链路。
- **具备下游集成影响力**：LobsterAI 此前以内置 OpenClaw 引擎运行，说明其曾承担下游产品底座角色；此次切换至 DSH 也说明这种依赖并非不可替代。

**技术路线差异**

| 对比对象 | 本窗口体现的差异 |
|---|---|
| **Hermes Agent** | 两者均面向复杂助手工作流；OpenClaw 更突出 Gateway、认证与多智能体交付，Hermes 更突出 Kanban、Profile、长会话及 Desktop 工作流 |
| **NanoBot** | OpenClaw 重点治理跨模块可靠性；NanoBot 更集中于 BM25 工具发现、技能目录复用等扩展效率 |
| **ZeroClaw** | OpenClaw 强调常驻服务与任务编排；ZeroClaw 本期更突出 MCP 健康语义、可选编译能力及配置一致性 |
| **LobsterAI** | OpenClaw 维护自身运行底座；LobsterAI 转向以 DSH 为唯一内置引擎，围绕桌面产品和 IM 集成重建能力 |

**主要短板与边界**

OpenClaw 的功能广度也扩大了故障面：数据库状态、跨进程生命周期、多层子任务及渠道投递均出现风险信号。当前更关键的竞争指标不是功能数量，而是**数据安全、任务结果交付率和升级可恢复性**。由于缺少贡献者、活跃用户、Stars 和长期数据，只能确认其**单日活动规模领先**，不能据此断言社区总规模最大。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求及含义 |
|---|---|---|
| **端到端任务可靠性** | OpenClaw、Hermes、CoPaw、ZeroClaw、LobsterAI | 避免后台成功但用户未收到结果、渠道显示 ready 却已断线、工具缺失却健康检查正常；需要分离执行、交付和可用状态 |
| **长会话与上下文治理** | OpenClaw、Hermes、NanoBot、PicoClaw | 压缩对象正确性、重复压缩、真正重置、工具 schema 预算，以及历史消息渲染性能 |
| **细粒度权限与隔离** | OpenClaw、ZeroClaw、Hermes、CoPaw、NanoClaw、LobsterAI | 子智能体工具限制、MCP 单工具禁用、Profile 消息隔离、执行上下文隔离、历史消息与命令分离、IM 白名单 |
| **工具与技能生态扩展** | NanoBot、Hermes、ZeroClaw、LobsterAI、OpenClaw | `.agents` 技能复用、MCP 技能发现与批准、异步任务、插件接管及动态模型目录 |
| **认证与凭据统一** | OpenClaw、NanoBot、NanoClaw | 订阅登录跨功能复用、OAuth 接入、Vault 作为单一凭据来源，减少重复配置 |
| **服务化部署与升级治理** | OpenClaw、Hermes、NanoClaw、ZeroClaw、LobsterAI | launcher 与回滚、插件环境一致性、Rootless Docker/systemd、Kubernetes 探针、旧会话及技能迁移 |

这些方向存在明显耦合：**工具越多，越需要上下文预算和权限控制；运行越久，越需要状态恢复、观测和迁移能力。**

## 5. 差异化定位分析

以下为本窗口体现的侧重与适用场景，不等同于各项目完整的官方定位。

| 项目 | 功能侧重 | 更贴近的用户场景 | 技术架构信号 |
|---|---|---|---|
| **OpenClaw** | 多渠道、多智能体、自动化常驻运行 | 需要统一助手入口和复杂后台任务的个人或共享部署 | Gateway、launcher、插件与多进程生命周期治理 |
| **Hermes Agent** | 长会话、记忆、Kanban/Cron、Desktop | 持续工作型助手、开发者及多 Profile 用户 | Profile 隔离、插件宿主、MCP Tasks 与技能接入 |
| **NanoBot** | 工具扩展效率与技能复用 | 多 MCP 工具、项目级技能及 Docker 使用者 | 本地 BM25 按需发现、schema token 预算、`.agents` 目录 |
| **PicoClaw** | 基础渠道可用性与 Web 体验 | Web/Telegram 日常使用及代理网络环境 | 前端状态隔离、完整网络请求链路配置 |
| **NanoClaw** | 受限部署、凭据接入与远程执行 | Rootless Docker、严格防火墙、远程沙箱用户 | 宿主挂载依赖向 HTTP 会话邮箱扩展的提案 |
| **ZeroClaw** | MCP 可靠性、渠道交互和可选视觉能力 | 自托管、Kubernetes、Discord 与桌面自动化场景 | 健康检查、显式配置、编译特性与运行时双重开关 |
| **CoPaw** | Console、渠道恢复、自动化与企业扩展 | QQ/微信渠道使用者及企业工作流部署 | 恢复预算、执行上下文、Platform-Worker 扩展讨论 |
| **LobsterAI** | 桌面产品、IM 协作和插件体验 | 需要桌面入口、Office 与群聊协作的用户 | 从 OpenClaw 切换至 DSH，技能精简与市场化扩展 |

其余五个项目缺少当日技术动态，不能据此补充可靠的差异化判断。

## 6. 社区热度与成熟度

### 活跃度与阶段分层

| 层级 | 项目 | 阶段判断 |
|---|---|---|
| **高密度持续迭代** | OpenClaw、Hermes Agent | 功能扩展与质量治理并行，复杂运行场景已带来明显稳定性压力 |
| **架构重构与迁移巩固** | LobsterAI | 核心引擎发生替换，重点是恢复兼容性、连续性和访问控制 |
| **中等活跃、可靠性投入集中** | ZeroClaw、CoPaw | 多项核心故障已有补丁，近期重点应是评审、回归和发布 |
| **小规模功能探索** | NanoBot、NanoClaw | 按需工具发现、订阅认证、远程邮箱等方案仍待验证 |
| **定向体验修复** | PicoClaw | 主要围绕代理可用性和 Web 输入性能 |
| **窗口内无活动** | NullClaw、IronClaw、TinyClaw、Moltis、ZeptoClaw | 无法判断长期阶段或维护状态 |

### 热度不等于成熟度

- **可见讨论并不热烈**：OpenClaw 样本最高为 8 条评论，CoPaw 为 4 条，Hermes 为 2 条；大量条目为零评论，PR 评论数据普遍缺失，不能形成可靠的社区声量榜。
- **有质量治理信号，但没有统一成熟度排名依据**：测试补强、定向修复、稳定版本发布和真实部署反馈均是积极证据；但缺少长期故障率、修复时长及发布后回归数据。
- **高问题量可能同时反映更广的使用面**：不能简单认定 OpenClaw、Hermes 比低活动项目更不稳定；同样，零故障报告也不能证明质量更高。

## 7. 值得关注的趋势信号

### ① “执行成功”正在升级为“结果可靠交付”

OpenClaw 的消息丢失、Hermes 的跨 Profile 误投、LobsterAI 的群路由问题表明，任务终态不能只看模型或工具是否返回。

**开发参考：**分离执行状态与交付状态，记录投递确认；支持只重试通知，避免为补发结果而重复执行外部副作用。

### ② 健康检查需要反映能力，而非仅反映进程

ZeroClaw 的 MCP 工具缺失和 CoPaw 的 QQ 假就绪说明，“服务存活”与“能够完成任务”是不同层次。

**开发参考：**区分 liveness、readiness 和依赖能力状态，明确降级模式，并测试依赖故障后的自动恢复。

### ③ 工具规模化正推动“按需发现＋最小权限”

NanoBot 的 BM25 发现、ZeroClaw 的单工具排除，以及 OpenClaw 的子智能体权限需求，说明全量暴露工具正在同时遇到成本和安全约束。

**开发参考：**将工具目录检索、schema 预算、调用授权分层设计；既测试检索覆盖率，也测试禁止工具无法被间接调用。

### ④ 长期记忆需要保留时效和可控性

Hermes 的陈旧状态、压缩膨胀与重置问题，以及 OpenClaw 的压缩目标偏差，表明“保存更多上下文”不等于更可信。

**开发参考：**为记忆记录来源、观察时间和复查条件；明确压缩、清空、归档的不同语义，并验证命令作用于真实执行会话。

### ⑤ 引擎可替换性成为产品架构的重要变量

LobsterAI 从 OpenClaw 转向 DSH 是本窗口最强的结构性信号，但不足以证明 DSH 在性能、成本或可靠性上更优。

**开发参考：**将会话数据、工具协议、权限和 UI 与推理引擎适度解耦，建立迁移测试与回退路径，降低未来更换底座的成本。

### ⑥ 升级与恢复能力正在成为核心产品能力

OpenClaw 的更新器、Hermes 的插件和技能升级、NanoClaw 的服务环境差异，都说明“安装成功”不等于“原有工作流仍可用”。

**开发参考：**把备份恢复、配置迁移、凭据检查、历史会话回归和回滚演练纳入发布门禁，而非只验证新安装。

---

**综合判断：**本窗口最值得关注的不是谁新增了最多功能，而是谁能将复杂助手系统中的故障转化为**可复现、可验证、可发布的修复**。技术选型宜先按目标工作流筛选，再以数据隔离、结果交付、依赖恢复和升级回滚做小规模验收；单日 PR 数量不宜成为主导依据。

*数据核验提醒：NanoClaw 的项目标注与条目链接分别指向 `qwibitai/nanoclaw`、`nanocoai/nanoclaw`；CoPaw 条目链接指向 `agentscope-ai/QwenPaw`。持续跟踪前应核验仓库归属与命名关系。*

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-28**  
**项目：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)**  
*统计口径：所提供的过去 24 小时更新数据；条目创建、更新时间均为 2026-11-27。*

## 1. 今日速览

过去 24 小时，NanoBot 有 **1 条 Issue、4 条 PR 更新**，其中 3 条 PR 待合并、1 条 PR 已关闭，未发布新版本，整体属于**小规模、功能驱动型活跃**。开发方向集中在大型工具目录的按需发现、Google AI Ultra 订阅接入，以及 `.agents` 技能目录兼容。社区新增的明确诉求是改善 Docker 部署下的文件查看与传输体验。当前样本未出现新报告的崩溃或运行时回归，但 PR 评论数据缺失，且关闭状态不等于合并，尚不足以判断讨论热度及实际交付规模。  
[项目仓库](https://github.com/HKUDS/nanobot)

## 2. 项目进展

### 已关闭：Telegram 希伯来语菜单测试适配
**[PR #6820：test(telegram): expect the Hebrew command menu](https://github.com/HKUDS/nanobot/pull/6820)**

- **改动内容**：在 Telegram 菜单测试的预期语言集合中加入 `he`，并检查本地化 `/start` 描述。
- **保留保障**：继续验证 polling 在菜单注册完成前启动的既有行为。
- **影响范围**：仅修改测试，不改变运行时行为，属于本地化功能配套的测试维护。
- **状态边界**：数据仅标记为 **CLOSED**，未提供合并信息，因此不能将其计为已落地修复。

**整体推进判断**：今日可见进展以功能方案提交和测试维护为主；未获得可确认的合并记录，不宜将待审功能视为已经交付。

## 3. 社区热点

**热度数据限制**：唯一 Issue 为 **0 评论、0 👍**；4 条 PR 均为 **0 👍**，评论数为 `undefined`，不能视作 0，也无法据此排名。以下为值得关注的议题，而非已验证的高热度讨论。

| 议题 | 可见信号 | 背后诉求 |
|---|---|---|
| [Docker 文件管理器 #6822](https://github.com/HKUDS/nanobot/issues/6822) | 新增增强请求，尚无评论 | 降低容器部署后查看、下载和上传文件的操作成本 |
| [大型工具目录按需发现 #6824](https://github.com/HKUDS/nanobot/pull/6824) | 开放 PR，标记 `performance`、`priority: p2` | 避免大量插件/MCP 工具 schema 挤占常规模型调用上下文 |
| [Google AI Ultra OAuth #6823](https://github.com/HKUDS/nanobot/pull/6823) | 开放 PR，摘要称为草案 | 允许订阅用户在不填写 Gemini API key 的情况下使用订阅配额 |

## 4. Bug 与稳定性

**今日数据中没有明确的新 Bug、崩溃或运行时回归报告**，因此无可按严重程度排序的运行时故障。

| 类型 | 问题与影响 | 是否已有 fix PR |
|---|---|---|
| 测试维护／非运行时缺陷 | Telegram 菜单测试仍使用此前的语言集合，需要补充希伯来语预期；不涉及运行时行为变化 | 有：[PR #6820](https://github.com/HKUDS/nanobot/pull/6820)，已关闭，是否合并未知 |
| 使用体验问题／非确认 Bug | Docker 部署后文件查看、下载不便，用户请求新增管理界面 | 未见关联实现 PR：[Issue #6822](https://github.com/HKUDS/nanobot/issues/6822) |

**健康度提示**：本窗口没有新增故障信号，但样本很小，不能据此推断整体缺陷率下降或稳定性已改善。

## 5. 功能请求与路线图信号

### 已有实现提案：可作为后续版本候选，尚无发布承诺

- **大型工具目录按需发现**  
  [PR #6824](https://github.com/HKUDS/nanobot/pull/6824) 提议让小型允许工具目录保持直接暴露，大型目录通过本地 **BM25** 搜索按需发现，无需 embeddings；摘要显示 `tools.schemaTokenBudget` 默认值为 **8,192 个估算 token**。这体现了对多插件、多 MCP 工具场景的上下文开销治理。当前为开放 PR，优先级 **P2**，具体性能收益仍待验证。

- **兼容项目级与用户级 `.agents` 技能目录**  
  [PR #6821](https://github.com/HKUDS/nanobot/pull/6821) 提议发现 `<project>/.agents/skills/` 和 `~/.agents/skills/`，减少技能复制、安装操作，并通过 `/skill` 列表和 `$name` 调用使用技能。这是技能复用与生态兼容方向的明确实现信号，当前仍待合并，优先级 **P2**。

- **可选 Google AI Ultra 订阅 OAuth**  
  [PR #6823](https://github.com/HKUDS/nanobot/pull/6823) 面向希望使用订阅配额、而非 Gemini API key 的用户。摘要明确称其为草案，说明接入方案尚在推进，不能据此判断下一版本一定支持。

### 仅有需求：尚未看到实现

- **文件管理器与上传／下载能力**  
  [Issue #6822](https://github.com/HKUDS/nanobot/issues/6822) 请求提供类似 Hermes Agent 的文件管理器。当前无关联实现 PR、无维护者评论，纳入下一版本的证据不足。

## 6. 用户反馈摘要

本次数据没有可供分析的 Issue 评论，以下反馈**仅来自 Issue 正文**：

- **真实场景**：用户通过 Docker 部署 NanoBot，需要访问智能体产生或使用的文件。
- **明确痛点**：现有查看、下载文件的流程被描述为繁琐、混乱。
- **期望体验**：提供支持上传与下载的文件管理器，并以 Hermes Agent 为参考。
- **反馈边界**：这是一位用户的明确需求，尚无其他用户附和或维护者回应；没有可提炼的正向满意度反馈。  
  [来源：Issue #6822](https://github.com/HKUDS/nanobot/issues/6822)

## 7. 待处理积压

**无法确认长期未响应积压**：本次提供的条目均为近期创建，且缺少历史响应时间、审查记录，不能将其认定为长期滞留事项。

建议维护者优先关注以下待处理项：

| 待处理项 | 建议关注点 |
|---|---|
| [Issue #6822：文件管理器](https://github.com/HKUDS/nanobot/issues/6822) | 首次回应用户，澄清目标入口、文件访问范围，以及上传下载的权限边界 |
| [PR #6824：BM25 工具发现](https://github.com/HKUDS/nanobot/pull/6824) | 验证工具检索覆盖率、token 预算行为和大目录场景的收益 |
| [PR #6821：`.agents` 技能发现](https://github.com/HKUDS/nanobot/pull/6821) | 核对多来源技能的优先级、同名冲突和项目隔离行为 |
| [PR #6823：订阅 OAuth](https://github.com/HKUDS/nanobot/pull/6823) | 明确草案完成条件，审查授权流程、凭据存储与失败处理 |

**结论**：NanoBot 今日呈现“**功能提案活跃、交付状态待确认**”的特征。最值得跟踪的是工具扩展规模化、技能目录兼容和部署易用性；后续健康度观察应重点看这些提案能否获得审查、验证并最终合并。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-28**  
**项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)**

> **统计口径**：过去 24 小时有 50 条 Issue 更新、50 条 PR 更新、1 个版本发布。以下分析基于所展示的 30 条 Issue 和 20 条 PR；未提供评论正文、PR 合并标记及完整历史，因此不将“关闭”等同于“合并”，也不推断长期无人响应。

## 1. 今日速览

- **开发活动密集，但稳定性压力突出**：50 条 Issue 更新中，49 条处于新开或活跃状态；50 条 PR 更新中，47 条待合并，修复与功能提案仍在集中进入队列。[项目动态](https://github.com/NousResearch/hermes-agent/activity)
- **v0.23.5 已发布**，将 v0.23.4 以来约 338 个已合并 PR 汇总为稳定版本；这一数字属于跨版本累计，不能视为今日合并量。[发布说明](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.5)
- 用户报告主要集中在**长会话压缩、Kanban/Cron 自动化、升级与插件生命周期**，另有配置密钥暴露和跨 Profile 消息误投风险值得优先核查。[安全修复提案](https://github.com/NousResearch/hermes-agent/pull/160988) · [消息误投报告](https://github.com/NousResearch/hermes-agent/issues/160970)
- **修复响应已有可见进展，但尚未充分落地**：Kanban claim 误计失败、Anthropic 用量显示错误、延迟压缩后重复压缩等报告均有对应开放 PR；MCP Tasks 与技能加载也在推进。[Kanban 修复](https://github.com/NousResearch/hermes-agent/pull/160984) · [MCP Tasks](https://github.com/NousResearch/hermes-agent/pull/160974)

## 2. 版本发布

### [v0.23.5：稳定补丁版本](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.5)

| 项目 | 已知信息 |
|---|---|
| 发布日期 | 2026-11-27，纳入本次日报统计窗口 |
| 版本定位 | Patch release，将 v0.23.4 以来约 338 个已合并 PR 汇总为稳定版本 |
| 发布覆盖 | GitHub Release 对应的 CLI 与安装器、Microsoft Store 应用、Docker、Hermes Cloud |
| 详细说明 | 完整整理后的更新说明计划随 v0.24.0 发布 |

**破坏性变更与迁移注意事项：**
- 发布摘要**未列出明确的破坏性变更或迁移步骤**，不能据此认定完全没有兼容性变化。
- 升级前建议备份 Profile 配置、会话数据库和插件环境，升级后重点验证 Dashboard/Webapp 入口、Kanban review lane、插件依赖与 Docker 多 Profile 启动。这些领域已有相关报告，但**不能确认 v0.23.5 是否已修复或仍受影响**。[入口变更反馈](https://github.com/NousResearch/hermes-agent/issues/160877) · [技能缺失](https://github.com/NousResearch/hermes-agent/issues/160934) · [插件依赖锁定](https://github.com/NousResearch/hermes-agent/issues/160938) · [Docker 启动](https://github.com/NousResearch/hermes-agent/issues/160941)

## 3. 项目进展

### 已关闭 PR：有活动，合并结果仍需确认

总览显示有 **3 条 PR 已合并或关闭**，当前明细只展示其中 2 条，且均仅标记为 `CLOSED`。

| PR | 工作内容 | 可确认的推进程度 |
|---|---|---|
| [#160960](https://github.com/NousResearch/hermes-agent/pull/160960) | 修复 CLI 会话、插件选择器处理原始方向键转义序列时直接退出的问题 | 已关闭；不能据此确认修复已进入主分支 |
| [#160971](https://github.com/NousResearch/hermes-agent/pull/160971) | 将大型插件宿主测试文件拆为聚焦测试套件，并抽离共享支持代码 | 已关闭；若被采用，将改善测试维护性，当前不能确认落地 |

### 尚待合并的重要推进

- **MCP 长任务支持**：[#160974](https://github.com/NousResearch/hermes-agent/pull/160974) 拟通过 MCP Tasks 接收后台任务句柄，减少长时间保持工具调用连接的需求。
- **MCP 技能接入**：[#160962](https://github.com/NousResearch/hermes-agent/pull/160962) 拟支持发现服务器技能、用户批准及文件校验，扩展工具之外的工作流能力。
- **Desktop 编辑保护**：[#160976](https://github.com/NousResearch/hermes-agent/pull/160976) 拟在重载、退出和更新前提示未保存文件，降低编辑内容丢失风险。
- **插件卸载一致性**：[#160961](https://github.com/NousResearch/hermes-agent/pull/160961) 拟清理网关内已卸载插件的工具注册，避免新聊天仍向模型暴露已移除工具。

**进展判断**：今天可见的推进主要是“形成修复方案与扩展提案”，而不是已验证的大规模功能交付；确定的交付节点是 v0.23.5 发布。

## 4. 社区热点

所展示 Issues 最高评论数仅为 **2**，所有展示条目点赞均为 **0**；PR 评论数为 `undefined`，无法进行讨论热度排名。因此今天更像是**问题覆盖面广，而非少数话题形成高热讨论**。

| 热点 | 评论数 | 背后的诉求 |
|---|---:|---|
| [#160945：Cron Agent 缺少 Honcho 工具](https://github.com/NousResearch/hermes-agent/issues/160945) | 2 | 用户希望定时 Agent 与交互式 Agent 拥有一致的外部记忆能力，支撑无人值守任务 |
| [#160941：Docker Profile 状态文件形状异常导致启动失败](https://github.com/NousResearch/hermes-agent/issues/160941) | 2 | 多 Profile 部署需要容错，单个状态文件异常不应阻断启动 |
| [#160877：升级改变 Dashboard/Webapp 入口](https://github.com/NousResearch/hermes-agent/issues/160877) | 2 | 用户要求升级保持入口与配置可预期，必要变化应提前告知并提供操作指引 |
| [#160948：选中日志作为上下文附件](https://github.com/NousResearch/hermes-agent/issues/160948) | 1 | 希望把历史回复或工具输出精准带回对话，减少手动复制及上下文噪声 |

## 5. Bug 与稳定性

以下按**潜在影响**排序，不替代仓库原有 P2/P3 标签。所有列出的 fix PR 当前均为开放状态；“未见”仅指所提供明细中没有对应项。

| 优先关注 | 问题与影响 | Fix PR |
|---|---|---|
| **安全：密钥暴露** | PR 描述指出配置 API 返回 Dashboard 登录秘密，环境转储对多词秘密的遮罩也存在缺口。[#160988](https://github.com/NousResearch/hermes-agent/pull/160988) | **有：#160988** |
| **安全：Profile 隔离** | 次级 Profile 适配器脱离时，最终响应可能通过默认 Profile 的 Telegram Bot 发出，存在隔离风险。[#160970](https://github.com/NousResearch/hermes-agent/issues/160970) | 未见 |
| **资源耗尽** | Shell hook 无限输出可能持续占用内存；PR 描述给出进程占用达 53.7 GB 的案例，拟以 1 MiB 输出上限终止。[#160972](https://github.com/NousResearch/hermes-agent/pull/160972) | **有：#160972** |
| **长会话失控** | Desktop Bot Chat 将 `/new`、`/reset` 转为压缩；用户报告约 417K-token 压缩底座，难以真正重置会话。[#160991](https://github.com/NousResearch/hermes-agent/issues/160991) | 未见 |
| **启动与升级阻断** | Docker 状态 JSON 类型异常导致启动崩溃；Kanban review lane 因既有安装缺少 `sdlc-review` 而硬崩溃。[#160941](https://github.com/NousResearch/hermes-agent/issues/160941) · [#160934](https://github.com/NousResearch/hermes-agent/issues/160934) | 均未见 |
| **修改丢失或覆盖** | Desktop 未保存文件可能在退出/更新时丢失；Dashboard Cron 编辑表单可能覆盖加载后由其他入口修改的字段。[#160976](https://github.com/NousResearch/hermes-agent/pull/160976) · [#160909](https://github.com/NousResearch/hermes-agent/issues/160909) | 前者有；后者未见 |
| **自动化状态误判** | 一次性 Kanban claim 到期被记为失败并触发 `gave_up`；工具授权拒绝被当作 worker 崩溃。[#160983](https://github.com/NousResearch/hermes-agent/issues/160983) · [#160963](https://github.com/NousResearch/hermes-agent/issues/160963) | 前者有 [#160984](https://github.com/NousResearch/hermes-agent/pull/160984)；后者未见 |
| **压缩质量与重复开销** | 延迟采纳摘要后 token 水位未更新，引发重复压缩；本地模型可能继续执行任务而不是生成摘要。[#160944](https://github.com/NousResearch/hermes-agent/issues/160944) · [#160985](https://github.com/NousResearch/hermes-agent/issues/160985) | 前者有 [#160973](https://github.com/NousResearch/hermes-agent/pull/160973)；后者未见 |
| **用量监控失真** | Anthropic 真实 1% 用量可能显示为 100%；429 的 `retry-after` 被忽略并伴随误导性凭据提示。[#160977](https://github.com/NousResearch/hermes-agent/issues/160977) · [#160978](https://github.com/NousResearch/hermes-agent/issues/160978) | 比例错误有 [#160979](https://github.com/NousResearch/hermes-agent/pull/160979)；429 问题未见 |
| **交互与工具可靠性** | Android Gboard 输入重复；终端 `notify=true` 偶发被拒；中途用户干预后可能没有助手输出。[#160935](https://github.com/NousResearch/hermes-agent/issues/160935) · [#160987](https://github.com/NousResearch/hermes-agent/issues/160987) · [#160952](https://github.com/NousResearch/hermes-agent/issues/160952) | 均未见 |

## 6. 功能请求与路线图信号

### 较强信号：已有实现 PR，但未承诺版本

- **MCP 成为更完整的任务与技能接口**：Tasks 和技能发现/批准各有开放 PR，是当前最明确的能力扩展方向；是否进入 v0.24.0 尚无确认。[#160974](https://github.com/NousResearch/hermes-agent/pull/160974) · [#160962](https://github.com/NousResearch/hermes-agent/pull/160962)
- **平台插件接管能力增强**：允许平台插件声明其接管的内置平台工具，有利于平台集成插件化。[#160966](https://github.com/NousResearch/hermes-agent/pull/160966)

### 需求信号：目前主要停留在 Issue

- **精细上下文操作**：将选中的会话日志作为 composer 上下文芯片，适合围绕历史工具结果继续追问。[#160948](https://github.com/NousResearch/hermes-agent/issues/160948)
- **私有搜索认证**：SearXNG 请求携带已登录 Provider 的 OAuth token，满足自托管网关部署。[#160986](https://github.com/NousResearch/hermes-agent/issues/160986)
- **Kanban 启动前策略控制**：新增 `on_kanban_before_spawn` 否决钩子，让插件在 worker 创建前拦截任务。[#160981](https://github.com/NousResearch/hermes-agent/issues/160981)
- **更可信的长期记忆**：记录改进动作的预测与实际结果，以及在压缩后保留观察时间和复查提醒，减少陈旧状态被当作事实。[#160957](https://github.com/NousResearch/hermes-agent/issues/160957) · [#160940](https://github.com/NousResearch/hermes-agent/issues/160940)

## 7. 用户反馈摘要

**资料未包含评论正文，以下来自 Issue 正文摘要，不代表完整评论共识。**

- **无人值守工作流要求更强一致性**：Cron 缺记忆工具、Kanban 授权拒绝被判崩溃，说明用户已在运行依赖记忆、权限与审核流程的真实后台任务。[#160945](https://github.com/NousResearch/hermes-agent/issues/160945) · [#160963](https://github.com/NousResearch/hermes-agent/issues/160963)
- **升级的不确定性是明显不满来源**：入口变化、插件依赖回退、内置技能未补齐，都让“升级成功”与“工作流仍可用”之间出现落差。[#160877](https://github.com/NousResearch/hermes-agent/issues/160877) · [#160938](https://github.com/NousResearch/hermes-agent/issues/160938) · [#160934](https://github.com/NousResearch/hermes-agent/issues/160934)
- **长期 Bot 用户需要真正的会话控制权**：无法重置、摘要膨胀、消息排序与重复显示，会同时损害成本可控性和记录可信度。[#160991](https://github.com/NousResearch/hermes-agent/issues/160991) · [#160989](https://github.com/NousResearch/hermes-agent/issues/160989)
- **没有足够证据评价满意度**：当前材料以缺陷和需求为主，不能据此推断整体用户满意或不满意的比例。[Issue 列表](https://github.com/NousResearch/hermes-agent/issues)

## 8. 待处理积压

**无法识别“长期未响应”条目**：展示项主要创建于 11 月 27—28 日，且没有维护者响应记录。以下应视为优先跟踪队列，而非历史积压结论。

| 建议优先级 | 待跟踪事项 | 维护建议 |
|---|---|---|
| 高 | [密钥遮罩 #160988](https://github.com/NousResearch/hermes-agent/pull/160988)、[跨 Profile 误投 #160970](https://github.com/NousResearch/hermes-agent/issues/160970) | 优先确认影响范围、复现条件及是否需要补丁回移 |
| 高 | [无限输出内存限制 #160972](https://github.com/NousResearch/hermes-agent/pull/160972) | 验证限制触发后的进程清理、错误反馈及正常输出兼容性 |
| 高 | [Bot Chat 重置 #160991](https://github.com/NousResearch/hermes-agent/issues/160991)、[升级后技能缺失 #160934](https://github.com/NousResearch/hermes-agent/issues/160934) | 先提供可执行缓解方案，再推进结构性修复 |
| 中高 | [插件依赖锁定 #160938](https://github.com/NousResearch/hermes-agent/issues/160938)、[Cron 编辑覆盖 #160909](https://github.com/NousResearch/hermes-agent/issues/160909) | 分别补充环境代际升级测试与并发编辑保护 |
| 中 | [Kanban #160984](https://github.com/NousResearch/hermes-agent/pull/160984)、[压缩水位 #160973](https://github.com/NousResearch/hermes-agent/pull/160973)、[用量单位 #160979](https://github.com/NousResearch/hermes-agent/pull/160979) | 推进已有定向修复的评审和回归验证，避免仅停留在开放 PR |

**健康度结论：开发活跃、问题响应已有产出，但发布后的稳定性闭环仍需加强。** 下一阶段最值得观察的，不只是新增功能数量，而是安全、长会话和无人值守任务相关修复能否完成合并、验证并明确进入稳定版本。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-11-28**  
**项目：[sipeed/picoclaw](https://github.com/sipeed/picoclaw)**

> 统计依据：所提供的过去 24 小时更新数据；具体 Issue、PR 的创建与更新时间均显示为 2026-11-27。以下结论仅覆盖该数据窗口，不代表全仓库历史状态。

## 1. 今日速览

过去 24 小时，PicoClaw 有 **2 条 Issue、1 条 PR 更新**，没有 Issue 关闭、PR 合并或关闭，也没有新版本发布，整体呈现**低量、以稳定性修复为主的活跃状态**。问题集中在 Telegram 附件下载未遵循代理配置，以及 Web 聊天长会话输入卡顿两个方向。Web 卡顿已有对应修复提案，但仍待合并；Telegram 代理问题暂未见关联修复。当前能观察到用户反馈向代码改进转化的迹象，但样本较小，尚不足以判断整体维护响应速度或问题解决效率。

相关条目：[Telegram 代理问题 #3477](https://github.com/sipeed/picoclaw/issues/3477) · [Web 卡顿 #3475](https://github.com/sipeed/picoclaw/issues/3475) · [Web 修复 PR #3476](https://github.com/sipeed/picoclaw/pull/3476)

## 2. 项目进展

### Web 输入性能修复已提出，尚未形成合并交付
[PR #3476：fix(web): isolate chat draft updates from message rendering](https://github.com/sipeed/picoclaw/pull/3476)

- **问题机制**：在展示推理内容、工具输出的长聊天会话中，每次编辑输入草稿都会触发聊天页面更新，导致历史消息重新渲染，并重复执行 Markdown 解析和语法高亮。
- **修复方向**：将草稿状态移入 `ChatComposer`，隔离输入更新与历史消息渲染，减少输入过程中的重复计算。
- **当前状态**：OPEN，尚未合并；提供的数据未包含测试结果或评审结论。
- **进展评估**：项目已从问题反馈推进到具体修复方案，但今日没有已合并或关闭的重要 PR，不能将其计为已交付修复。

## 3. 社区热点

本窗口内两条 Issue **各有 1 条评论、0 个 👍**，热度并列，尚未出现明显集中的讨论热点。PR 的评论数为 `undefined`，不能按零评论处理，也无法据此参与评论热度排名。

| 条目 | 已知互动 | 背后的诉求 |
|---|---|---|
| [#3477 Telegram 附件下载绕过代理](https://github.com/sipeed/picoclaw/issues/3477) | 1 条评论，0 👍 | 代理配置应覆盖完整通信链路，而不只是 Bot API 调用，保障受限网络下的附件可用性。 |
| [#3475 Web 聊天输入明显卡顿](https://github.com/sipeed/picoclaw/issues/3475) | 1 条评论，0 👍 | 长会话与复杂内容展示不应影响基础输入体验。 |
| [PR #3476 Web 草稿更新隔离](https://github.com/sipeed/picoclaw/pull/3476) | 评论数未知，0 👍 | 通过状态隔离降低渲染开销，改善聊天界面的交互稳定性。 |

## 4. Bug 与稳定性

以下为基于影响范围的初步排序，**不是维护者已确认的严重性评级**。

### ① 较高：Telegram 附件下载不遵循代理设置
[Issue #3477](https://github.com/sipeed/picoclaw/issues/3477)

- **表现**：Bot API 客户端使用 `settings.proxy`，但照片、文件等附件下载直接连接；因此可能出现 `getFile` 成功、实际下载却挂起的情况。
- **影响场景**：依赖代理访问 Telegram 的部署环境，附件处理链路可能不可用。
- **稳定性关注**：同一渠道内网络配置行为不一致，增加部署和排障难度。
- **Fix PR**：所提供数据中**未见**。
- **建议验证**：分别检查 API 请求和附件请求是否遵循相同代理设置，并补充失败、超时场景测试。

### ② 中等：Web 长会话输入卡顿
[Issue #3475](https://github.com/sipeed/picoclaw/issues/3475) · [候选修复 PR #3476](https://github.com/sipeed/picoclaw/pull/3476)

- **报告环境**：PicoClaw 0.3.1、Ubuntu 22.04 服务端、Windows Chrome、DeepSeek、Web 渠道。
- **表现**：Web 聊天界面打字明显延迟或卡顿。
- **候选原因**：PR 描述指出，草稿变化引起历史消息重复渲染，在推理与工具输出可见时尤为明显。
- **Fix PR**：**已有高度相关提案 #3476，待合并**；数据未明确提供关闭关联，不能视为问题已解决。
- **建议验证**：对比长会话修复前后的输入延迟，并回归 Markdown、代码高亮、推理内容和工具输出展示。

本窗口未提供崩溃或明确版本回归的证据。

## 5. 功能请求与路线图信号

**没有明确的新功能请求，当前信号偏向稳定性与体验完善。**

- **Web 性能优化更接近可交付状态**：已有具体代码提案，具备后续版本候选修复的基础，但是否纳入下一版本仍取决于评审、测试与合并结果。  
  链接：[PR #3476](https://github.com/sipeed/picoclaw/pull/3476)
- **Telegram 网络配置一致性值得优先补齐**：该问题反映的是现有代理能力覆盖不完整，而非新增代理功能需求；暂未见修复实现或排期。  
  链接：[Issue #3477](https://github.com/sipeed/picoclaw/issues/3477)

## 6. 用户反馈摘要

> 数据只提供了 Issue 正文摘要与评论数量，未提供评论内容；以下为报告者描述的归纳，不引用或推断评论观点。

- **受限网络用户需要端到端可用，而非仅 API 连通**：Telegram 元数据请求成功、附件下载失败的差异，会让用户误判代理配置是否生效。  
  链接：[Issue #3477](https://github.com/sipeed/picoclaw/issues/3477)
- **日常交互流畅度是 Web 使用体验的关键**：报告者在 Windows Chrome 访问 Ubuntu 服务端时遇到输入卡顿；相关 PR 进一步指向长会话、推理内容和工具输出带来的渲染负担。  
  链接：[Issue #3475](https://github.com/sipeed/picoclaw/issues/3475) · [PR #3476](https://github.com/sipeed/picoclaw/pull/3476)
- **存在用户参与修复的积极信号**：Web 问题与候选修复 PR 由同一作者提交，但尚不能据此推断维护者认可或修复已生效。  
  链接：[Issue #3475](https://github.com/sipeed/picoclaw/issues/3475) · [PR #3476](https://github.com/sipeed/picoclaw/pull/3476)

## 7. 待处理积压

**无法识别长期未响应积压**：所给条目均为近期创建、更新，且缺少评论正文与维护者响应记录，不宜标记为“长期无人处理”。

近期建议跟踪：

1. **确认 Telegram 代理问题的复现条件并明确修复责任**，避免附件链路持续不可用。  
   [Issue #3477](https://github.com/sipeed/picoclaw/issues/3477)
2. **评审 Web 草稿状态隔离方案，补充性能与交互回归验证**，推动候选修复形成实际交付。  
   [PR #3476](https://github.com/sipeed/picoclaw/pull/3476)
3. **在修复合并后邀请报告者复测**，以真实使用环境确认卡顿是否缓解，再决定关闭问题。  
   [Issue #3475](https://github.com/sipeed/picoclaw/issues/3475)

**健康度结论：**本窗口体现出清晰的问题反馈和一项针对性修复提案，但尚无问题闭环。短期最值得关注的是 Web 修复能否完成验证与合并，以及 Telegram 代理问题能否进入修复阶段。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-28｜统计范围：所提供的过去 24 小时数据**

> **数据说明：**项目地址标注为 `qwibitai/nanoclaw`，但条目链接指向 `nanocoai/nanoclaw`；下文按条目提供的仓库路径生成链接，仓库归属差异需核验。部分记录的更新时间为 11 月 27 日，本报沿用给定统计窗口，不将其全部视为 28 日新开。

## 1. 今日速览

过去 24 小时共记录 **4 条 Issue、2 条 PR 更新**，均处于开放状态，无 Issue 关闭、PR 合并或关闭，也无新版本发布。活动主要集中在凭据接入、受限部署环境兼容性和消息命令处理，属于**有新增反馈、暂无交付闭环**的一天。功能侧，[远程会话邮箱 PR #4581](https://github.com/nanocoai/nanoclaw/pull/4581)尝试解除智能体对宿主机目录挂载的依赖，是本批次最明确的架构扩展信号。整体活跃度有限但议题集中；当前数据不足以判断维护者响应速度或长期项目健康趋势。

## 2. 项目进展

**今日没有已合并或已关闭的重要 PR，尚无可确认的主线交付成果。**待合并工作包括：

| PR | 进展与价值 | 当前边界 |
|---|---|---|
| [#4581：新增 `/add-remote-mailbox`](https://github.com/nanocoai/nanoclaw/pull/4581) | 提议通过 HTTP 提供会话邮箱，替代挂载会话目录，为远程机器、无法挂载宿主目录的沙箱等运行环境提供接入路径。 | 仍开放，不能视为已支持远程部署。 |
| [#4579：更新 agent 镜像引用](https://github.com/nanocoai/nanoclaw/pull/4579) | 自动化 PR 将 `v2026.11.0` 的加固镜像映射更新至 `v2026.11.0-20261127T0412`，并替换镜像摘要。 | 未合并；摘要未提供具体修复清单，不能据此认定修复了某项漏洞。 |

**进展判断：**本日推进主要体现在候选方案与维护更新进入待审队列，而非功能落地。

## 3. 社区热点

**目前无法按讨论热度形成有效排名。**4 条 Issue 均为 **0 评论、0 👍**；2 条 PR 的评论数未提供，不能当作零评论，👍 均为 0。以下按潜在影响选取关注议题，而非声量排名：

- **凭据源重复维护：**[#4584](https://github.com/nanocoai/nanoclaw/issues/4584)反映 Vault 已保存凭据，但 OneCLI 网关仅注入在其自身注册的秘密，导致智能体任务反复中断。核心诉求是让 Vault 继续作为唯一事实来源，避免双重注册。
- **加固环境下的可部署性：**[Rootless Docker #4583](https://github.com/nanocoai/nanoclaw/issues/4583)与[随机回环端口 #4582](https://github.com/nanocoai/nanoclaw/issues/4582)共同显示：交互式运行正常，不代表 systemd 服务及严格防火墙环境能够正常运行。
- **消息与命令边界：**[#4580](https://github.com/nanocoai/nanoclaw/issues/4580)报告累积消息在后续轮次被当作命令执行，值得优先核查其触发条件与影响范围。

## 4. Bug 与稳定性

以下优先级为基于摘要的分析判断，并非项目官方定级。

| 优先级 | 问题与影响 | Fix PR 状态 |
|---|---|---|
| **高** | [#4580：历史消息被解释为命令](https://github.com/nanocoai/nanoclaw/issues/4580)。在 `ignored_message_policy='accumulate'` 场景下，存储的 `/clear` 或 `/upload-trace` 消息可能在下一轮被执行，存在非预期清理或跟踪上传风险。报告涉及 `main` 提交 `6b57f87f8`；是否构成权限绕过尚无证据。 | 所给数据中未见关联修复 PR。 |
| **中** | [#4583：Rootless Docker 服务端点配置缺失](https://github.com/nanocoai/nanoclaw/issues/4583)。CLI 可使用用户 Docker context 或 `DOCKER_HOST`，但生成的 systemd 用户单元未携带对应端点，可能导致服务无法连接 Docker；建议对系统 socket 设置 ACL 也未解决端点错配的根因。 | 所给数据中未见关联修复 PR。 |
| **中** | [#4582：Webhook 随机端口不适配严格防火墙](https://github.com/nanocoai/nanoclaw/issues/4582)。本地服务器通过 `listen(0, '127.0.0.1', …)` 分配随机端口，使固定端口放行规则难以配置，可能阻断 Discord Gateway 事件转发链路。 | 所给数据中未见关联修复 PR。 |

其中后两项均报告影响 `v2026.11.0` 及当前 `main`。现有材料未包含崩溃日志、维护者复现结论或已验证修复。

## 5. 功能请求与路线图信号

- **远程运行环境支持已有实现提案。**[PR #4581](https://github.com/nanocoai/nanoclaw/pull/4581)直接回应“运行时无法挂载宿主会话目录”的限制。在本批需求中，它距离交付相对更近，但缺少审查、测试及排期信息，不能确认进入下一版本。
- **统一凭据访问是明确的用户需求。**[Issue #4584](https://github.com/nanocoai/nanoclaw/issues/4584)希望凭据网关直接使用 Vault 中的秘密，减少重复配置和维护成本。目前未见实现 PR，仍处于需求阶段。
- **部署配置显式化值得关注。**[Rootless Docker #4583](https://github.com/nanocoai/nanoclaw/issues/4583)和[Webhook 端口 #4582](https://github.com/nanocoai/nanoclaw/issues/4582)提示，服务端点与监听端口需要更可控；这是从问题中推导的改进方向，并非已承诺路线图。

## 6. 用户反馈摘要

**本批 Issue 没有评论，因此以下仅提炼 Issue 正文，不能视为社区共识。**

- **个人助手连续执行受凭据链路阻碍：**用户报告助手 “Tanx” 因 Vault 凭据无法直接供网关使用而反复停顿，痛点是配置重复和自动化中断。[#4584](https://github.com/nanocoai/nanoclaw/issues/4584)
- **服务化部署与交互式体验不一致：**Rootless Docker 用户能在 CLI 正常运行，却在 systemd 服务配置上受阻，暴露出环境继承差异。[#4583](https://github.com/nanocoai/nanoclaw/issues/4583)
- **安全加固与默认配置存在摩擦：**限制回环流量的用户无法稳定放行每次启动随机变化的 Webhook 端口。[#4582](https://github.com/nanocoai/nanoclaw/issues/4582)
- **群聊消息处理需要更明确的执行边界：**累积消息不应在后续轮次意外变成命令，反映用户对可预测行为的要求。[#4580](https://github.com/nanocoai/nanoclaw/issues/4580)

现有数据没有明确的正面满意度反馈，不宜推断整体用户满意程度。

## 7. 待处理积压与维护建议

**无法识别长期未响应积压。**所给条目均创建于 11 月 27—28 日，缺少更早的开放队列与响应历史；短期无评论不等于维护停滞。

建议维护者优先关注：

1. **确认命令误执行的影响边界并补充回归测试**，优先处理累积消息与命令解析之间的隔离问题。[#4580](https://github.com/nanocoai/nanoclaw/issues/4580)
2. **复现受限部署环境中的配置缺陷**，分别核查 systemd Docker 端点传递和 Webhook 端口可配置性。[#4583](https://github.com/nanocoai/nanoclaw/issues/4583) · [#4582](https://github.com/nanocoai/nanoclaw/issues/4582)
3. **审查远程邮箱的认证、隔离及故障恢复设计**，这些是 HTTP 化会话通道落地前的重要检查项，而非当前已确认缺陷。[#4581](https://github.com/nanocoai/nanoclaw/pull/4581)
4. **补充镜像更新的变更依据与验证结果**，便于判断加固镜像更新的收益和风险。[#4579](https://github.com/nanocoai/nanoclaw/pull/4579)

**总体判断：**本日反馈集中暴露了部署与运行边界问题，同时出现远程运行能力的扩展提案；项目健康度的下一步关键观察点，是这些问题能否获得复现、审查和修复闭环。

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
**日期：2026-11-28｜项目：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)**

> **数据口径**：本报依据所提供的过去 24 小时更新清单编写，其中包含 11 月 27 日的记录。15 条 PR 均标记为 `CLOSED`，但未提供合并字段，因此下文不将“已关闭”等同于“已合并或已发布”。评论数为 `undefined`，不能据此判断讨论热度。

## 1. 今日速览

- 项目处于**核心引擎迁移与集中稳定化阶段**：最新版本将 Agent 引擎由 OpenClaw 切换至 DeepSeek Harness（DSH），发布说明称这次迁移涉及 106 个 PR，是项目历史上最大规模的架构迁移。[版本说明](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.11.27)
- 过去 24 小时共有 **15 条 PR 更新、全部已关闭，0 条 Issue 更新，1 个新版本**；代码侧活跃度较高，但不能据此推断用户问题较少。[PR 列表](https://github.com/netease-youdao/LobsterAI/pulls)
- 工作重心集中在 **IM 群聊路由与权限控制、旧会话延续、审批机制及插件兼容**，显示团队正在收敛迁移后的兼容性与稳定性风险。[#3241](https://github.com/netease-youdao/LobsterAI/pull/3241) · [#3232](https://github.com/netease-youdao/LobsterAI/pull/3232) · [#3230](https://github.com/netease-youdao/LobsterAI/pull/3230)
- 整体健康度表现为“**交付活跃、迁移风险仍需验证**”：修复覆盖多平台和历史数据场景，但缺少 CI、合并状态及升级反馈，暂不能确认线上稳定性已经恢复。[#3239](https://github.com/netease-youdao/LobsterAI/pull/3239)

## 2. 版本发布

### LobsterAI 2026.11.27
[查看 Release](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.11.27)

**核心更新**

- **替换底层引擎**：迁移 PR 将 OpenClaw `v2026.8.1` 替换为 `@deepseek-ai/dsh@0.2.2-rc.5`，并以 DSH 作为唯一内置 Agent 引擎。[#3239](https://github.com/netease-youdao/LobsterAI/pull/3239)
- **重建主要能力链路**：发布摘要说明，会话、专家、记忆、IM 渠道、媒体生成、Office 编辑与插件均围绕新引擎重建；迁移 PR 还覆盖桌面集成、备份迁移及 UI 更新。[#3239](https://github.com/netease-youdao/LobsterAI/pull/3239)

**兼容性与迁移注意事项**

| 关注项 | 影响与建议 |
|---|---|
| 引擎及插件兼容 | 这不是单纯的版本升级。建议验证自定义插件、模型提供商与嵌入式页面；后续关闭的 PR 仍在补充第三方插件模型目录和外部 DSH 会话同步。[#3242](https://github.com/netease-youdao/LobsterAI/pull/3242) |
| 历史会话与群任务 | 建议升级前备份数据，升级后检查旧群任务是否续接、多机器人是否共享正确会话，尤其是飞书、POPO、QQ 等场景。[#3228](https://github.com/netease-youdao/LobsterAI/pull/3228) · [#3231](https://github.com/netease-youdao/LobsterAI/pull/3231) |
| IM 访问策略 | #3241 将 Telegram、Discord 默认私聊策略从 `open` 改为 `allowlist`。若对应变更进入安装版本，应核对白名单，避免合法用户无法访问。[#3241](https://github.com/netease-youdao/LobsterAI/pull/3241) |
| 技能与本地文件 | 技能调整涉及精简为 9 个默认启用的核心技能、只读挂载及市场迁移；另有导入技能 ID 冲突和运行时链接清理修复，建议检查自定义技能及外观 Kit 引用。[#3236](https://github.com/netease-youdao/LobsterAI/pull/3236) · [#3240](https://github.com/netease-youdao/LobsterAI/pull/3240) |

**发布边界**：所提供的 Release 正文被截断，无法列全官方破坏性变更，也不能确认这 15 条 PR 全部包含在该版本中。尤其 11 月 28 日创建的 PR，不应直接视为 11 月 27 日版本已交付内容。[Release](https://github.com/netease-youdao/LobsterAI/releases/tag/2026.11.27)

## 3. 项目进展

以下为本期重要的**已关闭 PR**，按推进方向归类：

| 方向 | 关键进展 | 意义 |
|---|---|---|
| 架构迁移 | 统一切换至 DSH，覆盖桌面、IM、迁移及插件体系。[#3239](https://github.com/netease-youdao/LobsterAI/pull/3239) | 改变项目后续功能建设的底座 |
| 插件生态 | 增加第三方插件模型目录、外部 DSH 会话同步，以及设置分区嵌入和追踪隔离。[#3242](https://github.com/netease-youdao/LobsterAI/pull/3242) · [#3237](https://github.com/netease-youdao/LobsterAI/pull/3237) | 从“引擎可运行”推进到“生态可接入” |
| IM 连续性 | 同一 Agent 的多个机器人复用普通群任务；修复跨平台群路由、历史会话延续和当前负责人选择。[#3231](https://github.com/netease-youdao/LobsterAI/pull/3231) · [#3232](https://github.com/netease-youdao/LobsterAI/pull/3232) · [#3234](https://github.com/netease-youdao/LobsterAI/pull/3234) | 减少上下文割裂、串聊和错误投递 |
| 配置与技能 | 设置页引入显式保存/放弃、未保存提醒；技能转向精简内置、只读挂载与市场扩展。[#3233](https://github.com/netease-youdao/LobsterAI/pull/3233) · [#3236](https://github.com/netease-youdao/LobsterAI/pull/3236) | 提升配置可预期性，明确扩展边界 |
| 日常交互 | 完善侧边聊天重命名、删除与提升入口，修整产物标签、撤销提示、积分浮层滚动及 MCP 市场缓存。[#3229](https://github.com/netease-youdao/LobsterAI/pull/3229) · [#3235](https://github.com/netease-youdao/LobsterAI/pull/3235) · [#3238](https://github.com/netease-youdao/LobsterAI/pull/3238) | 补齐迁移后的桌面体验 |

**阶段判断**：项目正从“替换底层引擎”迈向“恢复多渠道行为一致性、补齐扩展生态”。推进幅度较大，但完成度不能仅以关闭 PR 数量衡量。[#3239](https://github.com/netease-youdao/LobsterAI/pull/3239) · [#3242](https://github.com/netease-youdao/LobsterAI/pull/3242)

## 4. 社区热点

**暂无可验证的讨论热度榜**：本期无 Issue 更新，所有 PR 的 👍 均为 0，评论数缺失。以下仅为按工程关注度选出的热点：

- **DSH 迁移后的生态兼容**：关注第三方插件能否继续提供模型和界面，以及外部会话能否回到桌面统一管理。[#3242](https://github.com/netease-youdao/LobsterAI/pull/3242)
- **IM 权限与消息边界**：白名单默认策略、群内 @ 与引用识别，反映机器人需要避免越权响应和错误接话。[#3241](https://github.com/netease-youdao/LobsterAI/pull/3241) · [#3232](https://github.com/netease-youdao/LobsterAI/pull/3232)
- **多机器人共享上下文**：同一 Agent 在同一群中的多个机器人应共享任务，而不是形成彼此不知情的会话分支。[#3231](https://github.com/netease-youdao/LobsterAI/pull/3231)

## 5. Bug 与稳定性

> 下列是 PR 描述披露的问题，不代表均在今日首次报告。严重程度按潜在影响研判；**均已有对应修复 PR 且已关闭，但合并、发布及验证状态未提供**。

| 优先级 | 问题与潜在影响 | Fix PR |
|---|---|---|
| **高：访问控制** | Telegram、Discord 增加 fail-closed 白名单控制，并调整默认私聊策略。涉及未授权访问风险，但材料未披露实际安全事件。 | [#3241](https://github.com/netease-youdao/LobsterAI/pull/3241) |
| **高：消息隔离与路由** | QQ 群标识可能造成任务拆分或串聊；Telegram、Discord 可能处理发给其他机器人的消息；Telegram 还存在话题合并及消息编号冲突漏收问题。 | [#3232](https://github.com/netease-youdao/LobsterAI/pull/3232) |
| **高：会话连续性** | 迁移后群历史可能断开、多机器人重复建任务，同群连续消息可能打断前一轮回复。 | [#3228](https://github.com/netease-youdao/LobsterAI/pull/3228) · [#3231](https://github.com/netease-youdao/LobsterAI/pull/3231) |
| **中：审批超时竞争** | 界面显示 300 秒审批期限，旧处理器却在 60 秒触发超时，并错误提示已在电脑端处理。 | [#3230](https://github.com/netease-youdao/LobsterAI/pull/3230) |
| **中：绑定与通知目标** | 编辑页未反映有效主 Agent 绑定；群内存在多个 Agent 历史时，通知目标需要优先指向当前负责人。 | [#3234](https://github.com/netease-youdao/LobsterAI/pull/3234) |
| **中：迁移清理** | 导入的 `skin-creator` 存在命名冲突；运行时链接清理需避免遍历目标，并兼顾 Windows junction 与只读 Git 对象。 | [#3240](https://github.com/netease-youdao/LobsterAI/pull/3240) |
| **低：界面体验** | 积分浮层滚动、产物标签及侧边聊天管理存在交互完善项。 | [#3238](https://github.com/netease-youdao/LobsterAI/pull/3238) · [#3235](https://github.com/netease-youdao/LobsterAI/pull/3235) · [#3229](https://github.com/netease-youdao/LobsterAI/pull/3229) |

本期材料未提供崩溃报告或崩溃率数据，不能据此评价客户端崩溃趋势。

## 6. 功能请求与路线图信号

本期没有新增 Issue 需求；以下是**从开发变更推断的方向，而非已承诺路线图**：

- **插件成为主要扩展入口**：动态模型目录、设置区嵌入、插件安装与外部会话同步同时推进，说明 DSH 插件生态接入是近期重点。[#3242](https://github.com/netease-youdao/LobsterAI/pull/3242) · [#3237](https://github.com/netease-youdao/LobsterAI/pull/3237) · [#3233](https://github.com/netease-youdao/LobsterAI/pull/3233)
- **内置精简、能力市场化**：核心技能精简与 MCP 市场缓存优化并行，呈现“轻量内置 + 按需扩展”的方向。[#3236](https://github.com/netease-youdao/LobsterAI/pull/3236) · [#3235](https://github.com/netease-youdao/LobsterAI/pull/3235)
- **近期版本候选关注点**：11 月 28 日的插件兼容、外部会话同步及 IM 权限修复值得跟踪；是否进入下一版本仍需合并状态和发布说明确认。[#3242](https://github.com/netease-youdao/LobsterAI/pull/3242) · [#3241](https://github.com/netease-youdao/LobsterAI/pull/3241)

## 7. 用户反馈摘要

**无法从 Issue 评论提炼真实用户反馈**：本期无相关评论数据，也没有可核实的满意度信息。PR 问题描述则揭示了以下使用痛点，但不能替代用户访谈或原始反馈：

- **团队群聊需要连续上下文**：换机器人后仍应接续同一讨论，多人同时提问不应互相打断。[#3231](https://github.com/netease-youdao/LobsterAI/pull/3231) · [#3228](https://github.com/netease-youdao/LobsterAI/pull/3228)
- **审批状态必须可信**：显示的超时时间与真实行为不一致，会使用户误判操作是否完成。[#3230](https://github.com/netease-youdao/LobsterAI/pull/3230)
- **配置界面需要反映真实状态**：机器人开关已启用却显示“未绑定”，容易引起重复配置和排障成本。[#3234](https://github.com/netease-youdao/LobsterAI/pull/3234)

## 8. 待处理积压

**当前数据不足以识别长期未响应的重要积压**：所给清单没有开放 Issue 或待合并 PR，也未提供全仓存量及等待时长；“本期 0 条 Issue 更新”不等于“无积压”。[Issues](https://github.com/netease-youdao/LobsterAI/issues) · [开放 PR](https://github.com/netease-youdao/LobsterAI/pulls)

建议维护者优先跟踪三项验收，而非将其视为已确认的积压：

1. **确认发布覆盖范围**：标明 11 月 28 日安全与插件修复是否合并、何时发布。[#3241](https://github.com/netease-youdao/LobsterAI/pull/3241) · [#3242](https://github.com/netease-youdao/LobsterAI/pull/3242)
2. **执行跨平台 IM 回归**：覆盖白名单、群聊隔离、多机器人共享、旧任务续接及审批超时。[#3232](https://github.com/netease-youdao/LobsterAI/pull/3232) · [#3230](https://github.com/netease-youdao/LobsterAI/pull/3230)
3. **补充迁移验证与回退说明**：重点说明历史会话、自定义技能和插件兼容边界，降低大规模引擎替换的升级不确定性。[#3239](https://github.com/netease-youdao/LobsterAI/pull/3239) · [#3240](https://github.com/netease-youdao/LobsterAI/pull/3240)

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

# CoPaw 项目动态日报
**日期：2026-11-28｜统计范围：所提供的过去 24 小时 GitHub 更新**

> **数据口径**：项目名称按 CoPaw 展示；原始条目链接指向 `agentscope-ai/QwenPaw`，下文沿用该仓库链接。3 个 PR 仅标记为 `CLOSED`，无法确认是否已合并；用户反馈分析依据 Issue 正文摘要，不代表对未提供的评论内容进行了核验。

## 1. 今日速览

过去 24 小时共更新 **6 个 Issue、9 个 PR**，其中 **6 个 PR 待合并、3 个已关闭，暂无新版本发布**，项目保持较活跃的维护节奏。开发重点明显偏向稳定性：包括恢复循环、QQ 断线重连、Cron API，以及 Console 的会话交互与历史记录。三个故障已有对应待审修复，说明社区响应较快，但主分支测试回归和功能不可用问题仍未形成已确认的修复闭环。整体来看，项目处于**活跃修复期，而非功能扩张期**，下一步健康度主要取决于修复验证、合并及发布落地。代表性条目：[恢复回归 #8956](https://github.com/agentscope-ai/QwenPaw/issues/8956)、[Cron 修复 #8965](https://github.com/agentscope-ai/QwenPaw/pull/8965)。

## 2. 项目进展

### 已关闭的重要 PR：覆盖 Console 与 Relay 稳定性

以下 PR **已关闭，但不能据此认定修复已进入主分支**。

| PR | 主要改动 | 对项目的意义 |
|---|---|---|
| [#8953：聊天历史分页与滚动稳定性](https://github.com/agentscope-ai/QwenPaw/pull/8953) | 使用持久化消息 ID 作为分页边界；请求失败后停止自动分页，提供手动重试；调整滚动空间 | 针对迁移会话的 `400 Invalid history cursor` 和分页失败体验进行修复 |
| [#8952：Relay 恢复中断与关闭处理](https://github.com/agentscope-ai/QwenPaw/pull/8952) | 按用户独立执行 Hub 恢复与关闭；为清理设置有界等待；关闭前分离 HTTP 客户端 | 减少异常清理对其他用户或后续连接的影响 |
| [#8951：聊天导航、滚动与 steer 时间戳](https://github.com/agentscope-ai/QwenPaw/pull/8951) | 去重迁移消息导航、保留完整历史、稳定流式输出结束后的视口，并涉及 steer 时间戳修复 | 改善长会话、迁移会话及流式交互体验 |

**推进幅度判断**：这批变更以局部修复为主，覆盖面涉及前端交互和后端连接生命周期；若确认合并，可视为一次有意义的可靠性增量，但尚不足以认定形成新的功能里程碑。

### 待审修复继续补齐交互与测试

- [#8964：提交前取消聊天](https://github.com/agentscope-ai/QwenPaw/pull/8964)：处理模型加载期间点击 Stop、但后端尚未创建运行任务时的本地取消，避免输入区持续等待。
- [#8961：Markdown 删除线要求双波浪号](https://github.com/agentscope-ai/QwenPaw/pull/8961)：避免 `600~1500 t/s`、`64~128G` 等范围表达被误解析为删除线。
- [#8958：分页历史 E2E 测试匹配](https://github.com/agentscope-ai/QwenPaw/pull/8958)：标题指向逐条匹配提示与回复；但所给正文仍为模板，具体覆盖范围需要审阅差异确认。

## 3. 社区热点

PR 评论数均为 `undefined`，因此无法进行可靠的 PR 讨论热度排名。Issue 中讨论最集中的主题如下：

| 热点 | 可见互动 | 背后诉求 |
|---|---:|---|
| [#8956：恢复预算导致终止步骤重复执行](https://github.com/agentscope-ai/QwenPaw/issues/8956) | **4 条评论** | 恢复机制必须准确识别“停止恢复”，避免额外模型调用和主分支测试回归 |
| [#8962：QQ 清理异常后永久停止重连](https://github.com/agentscope-ai/QwenPaw/issues/8962) | **3 条评论** | 常驻渠道需要真正恢复连接，而非保持“ready”却无法收发消息 |
| [#8959：企业版 Platform-Worker 上游整合评审](https://github.com/agentscope-ai/QwenPaw/issues/8959) | **2 条评论、1 个 👍** | 企业使用方希望明确通用扩展接口、上游贡献边界及 PR 拆分方式 |

值得注意的是，[#8962](https://github.com/agentscope-ai/QwenPaw/issues/8962) 已明确区分**当前 QQ 插件最小修复**与**尚未实现的完整自愈设计**，不应把后者解读为已落地能力。

## 4. Bug 与稳定性

以下优先级按影响范围及功能阻断程度判断，并非官方严重性评级。

### 高优先级

1. **Cron REST API 三个端点返回 500**  
   `GET /crons/jobs`、`POST /crons/jobs`、`DELETE /crons/jobs/{job_id}` 因默认管理器解析引用错误而不可用。修复拟通过 `await get_agent("default")` 获取默认工作区，并兼容异步管理器解析。  
   **状态：Issue 开放；已有待审 fix PR。**  
   [Issue #8960](https://github.com/agentscope-ai/QwenPaw/issues/8960) · [PR #8965](https://github.com/agentscope-ai/QwenPaw/pull/8965)

2. **QQ 重连监督器因清理错误永久退出**  
   清理错误列表未重置，可能使一次异常持续阻断后续重连，同时 worker 仍显示 ready，存在可用性误判风险。  
   **状态：已有 QQ 插件范围的最小修复，尚未合并。**  
   [Issue #8962](https://github.com/agentscope-ai/QwenPaw/issues/8962) · [PR #8963](https://github.com/agentscope-ai/QwenPaw/pull/8963)

3. **恢复循环回归：额外 provider 调用且主分支测试失败**  
   据报告，共享恢复预算依赖异常对象身份识别终止信号；新异常对象可能触发继续恢复，重复执行插件的最终强制步骤。  
   **状态：已有待审 fix PR，拟通过标记异常终止循环。**  
   [Issue #8956](https://github.com/agentscope-ai/QwenPaw/issues/8956) · [PR #8957](https://github.com/agentscope-ai/QwenPaw/pull/8957)

4. **Code Mode 子智能体工具上下文泄漏**  
   子会话继承父会话的 `_execution_toolkit` ContextVar，导致 `run_code` 报 `ToolNotFoundError`，阻断该场景下的子智能体执行。  
   **状态：本批数据中未见对应 fix PR。**  
   [Issue #8954](https://github.com/agentscope-ai/QwenPaw/issues/8954)

### 中优先级

- **Console 准备阶段无法正确停止**：用户取消时后端运行尚未创建，需要调用本地 abort。**已有待审修复。**  
  [PR #8964](https://github.com/agentscope-ai/QwenPaw/pull/8964)
- **数值范围被误渲染为删除线**：影响性能指标、资源规格等技术内容阅读。**已有待审修复。**  
  [PR #8961](https://github.com/agentscope-ai/QwenPaw/pull/8961)

## 5. 功能请求与路线图信号

- **治理规则的可配置性与可解释性**  
  用户反映，治理层内置规则无法配置或禁用，且与工具守卫层独立，容易产生“已调整配置却仍被拦截”的困惑。诉求重点是统一配置心智、明确拦截来源和规则边界。**本批未见实现 PR，暂无进入下一版本的直接证据。**  
  [Issue #8955](https://github.com/agentscope-ai/QwenPaw/issues/8955)

- **企业版 Platform-Worker 的扩展接口与上游整合**  
  提出者称已有实际部署的内部实现，希望维护者评审哪些适合上游、哪些保留为扩展；代码开放仍需内部流程。它是企业化使用需求的信号，但目前属于架构讨论，不能视为官方路线图承诺。  
  [Issue #8959](https://github.com/agentscope-ai/QwenPaw/issues/8959)

- **近期版本更可能继续吸收稳定性修复**  
  Cron、QQ 重连、恢复终止、Console 取消和 Markdown 渲染均已有开放 PR，比新增架构能力更接近交付；是否进入下一版本仍取决于评审、测试与合并。  
  [#8965](https://github.com/agentscope-ai/QwenPaw/pull/8965) · [#8963](https://github.com/agentscope-ai/QwenPaw/pull/8963) · [#8957](https://github.com/agentscope-ai/QwenPaw/pull/8957)

## 6. 用户反馈摘要

*以下为 Issue 正文所反映的场景与痛点，不引用未提供的评论。*

- **长期在线渠道需要可靠恢复与真实状态**：QQ 用户遭遇“显示就绪但已断线”，说明连接状态与运行状态的一致性直接影响运维判断。  
  [#8962](https://github.com/agentscope-ai/QwenPaw/issues/8962)
- **自动化与多智能体场景出现功能阻断**：Cron API 全面报错、Code Mode 子智能体无法执行代码，影响的不是外观体验，而是任务链能否完成。  
  [#8960](https://github.com/agentscope-ai/QwenPaw/issues/8960) · [#8954](https://github.com/agentscope-ai/QwenPaw/issues/8954)
- **安全规则需要透明、可理解的配置反馈**：微信渠道用户难以区分治理层与工具守卫层的拦截，反映出配置解释和诊断能力的不足。  
  [#8955](https://github.com/agentscope-ai/QwenPaw/issues/8955)
- **存在深度采用与贡献意愿**：企业用户已开展内部部署，并主动寻求上游整合。这是积极的采用信号，但不等同于明确的满意度评价。  
  [#8959](https://github.com/agentscope-ai/QwenPaw/issues/8959)

## 7. 待处理积压与维护提醒

**本批条目均为 11 月 27—28 日近期活动，无法识别长期未响应积压，也不能据此判断维护者响应时长。** 当前更值得关注的是：

1. **优先补齐未见修复的功能阻断项**：为 Code Mode 子智能体上下文泄漏补充最小复现、隔离测试及修复方案。  
   [#8954](https://github.com/agentscope-ai/QwenPaw/issues/8954)
2. **推动核心修复完成验证闭环**：确认恢复循环测试转绿、QQ 连续重连可恢复，以及 Cron 在工作区加载前后均可用。  
   [#8957](https://github.com/agentscope-ai/QwenPaw/pull/8957) · [#8963](https://github.com/agentscope-ai/QwenPaw/pull/8963) · [#8965](https://github.com/agentscope-ai/QwenPaw/pull/8965)
3. **澄清已关闭 PR 的实际结果**：确认相关改动是否合并、被替代或放弃，避免将关闭误认为交付。  
   [#8951](https://github.com/agentscope-ai/QwenPaw/pull/8951) · [#8952](https://github.com/agentscope-ai/QwenPaw/pull/8952) · [#8953](https://github.com/agentscope-ai/QwenPaw/pull/8953)
4. **补全测试 PR 的说明**：明确分页历史 E2E 测试的关联问题、覆盖场景与验证结果，降低评审成本。  
   [#8958](https://github.com/agentscope-ai/QwenPaw/pull/8958)

**综合判断：社区修复供给活跃，且出现企业深度采用信号；主要风险集中在恢复语义、运行状态一致性和上下文隔离。当前应优先把已有修复转化为可验证、可发布的稳定性成果。**

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-28｜统计范围：所提供的过去 24 小时 GitHub 更新**

## 1. 今日速览

过去 24 小时，ZeroClaw 有 **6 条 Issue、14 条 PR 更新**，均处于开放状态，未记录到 Issue 关闭、PR 合并或关闭，也没有新版本发布。贡献活动较活跃，重点集中在 **MCP 启动恢复与健康检查、Discord 交互体验、OpenRouter 工具图片传递，以及配置与安全策略一致性**。多个问题已有对应修复 PR，表明问题到补丁的响应链路正在运转，但目前仍属于“提交方案”，不能视为已修复交付。项目健康度呈现出“贡献活跃、稳定性投入明显，但审查与落地效果尚待验证”的状态；当前数据不足以判断维护者响应速度或长期积压趋势。

## 2. 项目进展

### 合并与交付情况
**本统计窗口没有已合并或关闭的重要 PR。** 因此，今天可确认的推进主要是候选实现与修复方案增加，而非主分支已交付能力增长。

### 主要在途工作

| 方向 | 进展与价值 | 状态 |
|---|---|---|
| MCP 启动恢复 | [#12769](https://github.com/zeroclaw-labs/zeroclaw/pull/12769) 为频道启动时的临时 MCP 连接失败增加重试，并在 `/health` 中体现异常；[#12768](https://github.com/zeroclaw-labs/zeroclaw/pull/12768) 让网关启动过程中即可响应健康检查 | 均待合并 |
| 工具调用与多模态 | [#12780](https://github.com/zeroclaw-labs/zeroclaw/pull/12780) 修复 OpenRouter 工具结果图片传递；[#12781](https://github.com/zeroclaw-labs/zeroclaw/pull/12781) 改善受损工具结果与剩余调用的配对，后者声明依赖其他 PR | 均待合并 |
| 配置与安全一致性 | [#12779](https://github.com/zeroclaw-labs/zeroclaw/pull/12779) 在管理端重载前校验磁盘配置；[#12778](https://github.com/zeroclaw-labs/zeroclaw/pull/12778) 统一 `allowed_commands` 条目的解析，减少不同策略检查之间的语义差异 | 均待合并 |
| 数据与模型配置正确性 | [#12775](https://github.com/zeroclaw-labs/zeroclaw/pull/12775) 防止 SQLite 嵌入修复与并发编辑冲突；[#12764](https://github.com/zeroclaw-labs/zeroclaw/pull/12764) 避免切换模型后继续套用旧模型的上下文窗口 | 均待合并 |
| Discord 体验与恢复 | 提交内置斜杠命令、提及后命令识别、连接失败重试、线程回复模式，详见下文 | 均待合并 |
| 依赖维护 | [#12777](https://github.com/zeroclaw-labs/zeroclaw/pull/12777) 将 `zip` 从 9.0.5 更新至 9.8.2，并调整相关锁文件依赖；现有摘要未说明属于安全修复 | 待合并 |

**推进程度判断：** 工作覆盖了启动、工具调用、配置重载、记忆写回等关键运行路径，稳定性改善潜力较大；但缺少合并、测试及发布结果，暂不能量化实际改善幅度。

## 3. 社区热点

**热度数据说明：** 6 条 Issue 均为 **0 评论、0 👍**；PR 评论数为 `undefined`，点赞均为 0。因此无法识别“评论最多”或“反应最多”的讨论，以下按问题关联度与潜在影响整理，而非互动排名。

- **MCP 故障恢复与健康检查语义。** 同一贡献者报告两个互补问题：启动时健康接口不响应，可能被 Kubernetes 存活探针反复重启；启动后工具缺失，健康接口却仍显示正常。背后诉求是让服务“存活”与工具“可用”得到可靠区分，并具备自动恢复能力。  
  链接：[Issue #12766](https://github.com/zeroclaw-labs/zeroclaw/issues/12766)、[Issue #12767](https://github.com/zeroclaw-labs/zeroclaw/issues/12767)、[PR #12768](https://github.com/zeroclaw-labs/zeroclaw/pull/12768)、[PR #12769](https://github.com/zeroclaw-labs/zeroclaw/pull/12769)。

- **工具图片传递与桌面操作形成关联开发。** OpenRouter 丢弃工具声明的图片附件，会阻断依赖视觉反馈的工作流；相关提交同时涉及图片传递修复和可选的 macOS `computer_use` 工具，显示视觉工具链正在成为开发关注点。  
  链接：[Issue #12774](https://github.com/zeroclaw-labs/zeroclaw/issues/12774)、[PR #12780](https://github.com/zeroclaw-labs/zeroclaw/pull/12780)、[PR #12776](https://github.com/zeroclaw-labs/zeroclaw/pull/12776)。

- **Discord 出现成组体验改进。** 同一贡献者提交四项相关 PR，覆盖命令发现、命令解析、连接恢复与线程组织，体现对日常群聊使用链路的持续完善，但不能据此推断社区讨论热度。  
  链接：[PR #12771](https://github.com/zeroclaw-labs/zeroclaw/pull/12771)、[PR #12770](https://github.com/zeroclaw-labs/zeroclaw/pull/12770)、[PR #12763](https://github.com/zeroclaw-labs/zeroclaw/pull/12763)、[PR #12762](https://github.com/zeroclaw-labs/zeroclaw/pull/12762)。

## 4. Bug 与稳定性

以下按 Issue 报告者填写的严重级别排列；这些级别不代表维护者已完成确认。

| 严重程度 | 问题与影响 | 修复状态 |
|---|---|---|
| **S0，需核实分类** | [#12772](https://github.com/zeroclaw-labs/zeroclaw/issues/12772)：希望在 `mcp_bundles` 内排除单个 MCP 工具。虽填写“S0—数据丢失/安全风险”，内容实质是细粒度权限需求，摘要未提供已发生数据丢失或安全事件的证据 | 所给数据中无对应 PR |
| **S1，工作流阻断** | [#12774](https://github.com/zeroclaw-labs/zeroclaw/issues/12774)：OpenRouter 转换工具消息时忽略声明的图片附件，影响图像结果传递 | 有修复 PR [#12780](https://github.com/zeroclaw-labs/zeroclaw/pull/12780)，未合并；另有关联实现 [#12776](https://github.com/zeroclaw-labs/zeroclaw/pull/12776) |
| **S1，工作流阻断** | [#12773](https://github.com/zeroclaw-labs/zeroclaw/issues/12773)：Quickstart 未询问飞书/Lark 的 `app_id`、`app_secret`，保存的频道配置无效，重载后被丢弃 | 所给数据中无对应 PR |
| **S1，工作流阻断** | [#12766](https://github.com/zeroclaw-labs/zeroclaw/issues/12766)：MCP 连接阶段 `/health` 不响应，MCP 故障可能触发 Kubernetes 重启循环 | 有修复 PR [#12768](https://github.com/zeroclaw-labs/zeroclaw/pull/12768)，未合并 |
| **S2，行为退化** | [#12767](https://github.com/zeroclaw-labs/zeroclaw/issues/12767)：启动时遇到 429、503 或连接拒绝后，MCP 工具持续缺失直至重启，且健康检查仍正常 | 有修复 PR [#12769](https://github.com/zeroclaw-labs/zeroclaw/pull/12769)，未合并 |

**额外稳定性信号：** 配置重载、SQLite 并发写回、模型上下文窗口和 Discord 重连也都有修复提案，说明本窗口的稳定性工作并不限于新增 Issue。相关链接：[配置重载 #12779](https://github.com/zeroclaw-labs/zeroclaw/pull/12779)、[SQLite #12775](https://github.com/zeroclaw-labs/zeroclaw/pull/12775)、[模型切换 #12764](https://github.com/zeroclaw-labs/zeroclaw/pull/12764)、[Discord 重连 #12763](https://github.com/zeroclaw-labs/zeroclaw/pull/12763)。

## 5. 功能请求与路线图信号

| 需求或能力 | 当前信号 | 近期纳入判断 |
|---|---|---|
| MCP 单工具禁用 | 用户希望保留 MCP 服务连接，同时排除其中个别工具，有助于缩小代理可调用范围 | 仅有需求，尚无实现信号。[Issue #12772](https://github.com/zeroclaw-labs/zeroclaw/issues/12772) |
| Buzz 频道 | 希望代理进入 Buzz 社区，在群组与私信中应答，扩展 Slack 类协作平台覆盖 | 仅有需求，无法判断排期。[Issue #12765](https://github.com/zeroclaw-labs/zeroclaw/issues/12765) |
| macOS `computer_use` | 已提交大型功能 PR；采用可选编译特性，Cargo 默认关闭，风险配置默认关闭 | 已进入实现阶段，但审查范围较大，不宜推定下一版本一定收录。[PR #12776](https://github.com/zeroclaw-labs/zeroclaw/pull/12776) |
| Discord 内置斜杠命令 | 在启用 `slash_commands` 时，将已有运行时命令暴露到 Discord `/` 菜单 | 已有 PR，是近期候选能力。[PR #12771](https://github.com/zeroclaw-labs/zeroclaw/pull/12771) |
| Discord 提及后线程回复 | 增加 `thread_mode`，默认 `off`，可选 `on_mention`，将提及触发的回复组织到线程 | 已有 PR，配置设计保留默认行为。[PR #12762](https://github.com/zeroclaw-labs/zeroclaw/pull/12762) |

**路线图判断：** 当前较明确的方向是工具权限与视觉能力扩展、团队聊天交互完善，以及无人值守部署可靠性。以上均为贡献与需求信号，不等同于维护者承诺。

## 6. 用户反馈摘要

本次 Issue 均无评论，**无法从评论中提炼共识或满意度**。以下仅归纳首帖中的真实场景与痛点：

- **Kubernetes 部署需要减少人工重启。** 用户报告临时 MCP 故障可能演变为持续工具缺失，或引发存活探针重启循环；主要不满是自动恢复和状态可观测性不足。  
  [#12766](https://github.com/zeroclaw-labs/zeroclaw/issues/12766)、[#12767](https://github.com/zeroclaw-labs/zeroclaw/issues/12767)

- **首次配置流程应产出可用配置。** 飞书/Lark 用户通过 Quickstart 配置频道，却未被要求提供必要凭据，说明引导流程与实际配置要求存在断层。  
  [#12773](https://github.com/zeroclaw-labs/zeroclaw/issues/12773)

- **工具输出不能仅保留文本。** OpenRouter 用户需要图片附件进入后续模型上下文，否则视觉相关工作流无法完成。  
  [#12774](https://github.com/zeroclaw-labs/zeroclaw/issues/12774)

- **工具管理需要比“整台 MCP 服务启停”更细。** 单工具排除需求反映用户希望在复用服务的同时控制能力暴露范围。  
  [#12772](https://github.com/zeroclaw-labs/zeroclaw/issues/12772)

当前样本以缺陷和需求为主，未包含可用于判断满意度的正向反馈，不宜外推整体用户情绪。

## 7. 待处理积压与维护提醒

**无法确认长期积压。** 所给条目均创建于 11 月 27—28 日，没有更早的创建时间、维护者响应记录或审查历史。零评论也不足以认定“长期未响应”。

建议优先关注以下待处理事项：

1. **补齐尚无修复方案的工作流阻断。** 飞书/Lark Quickstart 问题直接影响首次接入，应优先确认复现与修复归属。  
   [Issue #12773](https://github.com/zeroclaw-labs/zeroclaw/issues/12773)

2. **联合验证 MCP 两项修复。** 启动时健康接口可响应，与启动后工具缺失可恢复是两个不同目标，应覆盖 MCP 不可达、限流、恢复连接及 Kubernetes 探针场景。  
   [PR #12768](https://github.com/zeroclaw-labs/zeroclaw/pull/12768)、[PR #12769](https://github.com/zeroclaw-labs/zeroclaw/pull/12769)

3. **核实 S0 标记与权限需求边界。** 明确单工具排除属于增强需求、现有控制缺口，还是存在可复现安全风险，避免严重级别失真。  
   [Issue #12772](https://github.com/zeroclaw-labs/zeroclaw/issues/12772)

4. **协调 OpenRouter 修复与桌面工具大 PR。** 两个 PR 都涉及图片传递，应明确重叠范围、合并顺序与回归测试，避免基础修复被大型功能审查阻塞。  
   [PR #12780](https://github.com/zeroclaw-labs/zeroclaw/pull/12780)、[PR #12776](https://github.com/zeroclaw-labs/zeroclaw/pull/12776)

**总评：** 今日最积极的信号是关键故障已有针对性补丁；最需要跟进的是将这些开放 PR 转化为经过验证的合并与发布结果。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*