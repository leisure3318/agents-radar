# OpenClaw 生态日报 2026-11-19

> Issues: 36 | PRs: 65 | 覆盖项目: 13 个 | 生成时间: 2026-11-18 17:15 UTC

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
**日期：2026-11-19｜仓库：[openclaw/openclaw](https://github.com/openclaw/openclaw)**

> **统计口径**：依据提供的过去 24 小时快照，记录更新时间主要为 11 月 18 日。PR 明细仅覆盖部分更新，且评论数为 `undefined`；未提供评论正文及合并标记，因此下文严格区分“已关闭”“已合并”和“拟修复”，不将关闭等同于修复上线。

## 1. 今日速览

过去 24 小时共有 **36 条 Issue 更新、65 条 PR 更新**，其中 Issue 新开/活跃 30 条、关闭 6 条，PR 待合并 41 条、合并或关闭 24 条，项目开发与反馈活动较为密集。今日**没有新版本发布**，工作重心主要落在升级链路、Doctor 迁移、会话状态与多运行时工具权限的稳定性治理。风险端出现 **1 条 P0、7 条仍开放的 P1 Issue**，升级失败与子智能体委派受阻值得优先关注。整体呈现“修复投入活跃、稳定性压力仍高”的状态，尚不能据此认定近期回归已经消除。

## 2. 项目进展

### 已关闭的重要 PR：有推进信号，但不能确认已合并

| 方向 | 重要变更 | 状态与价值 |
|---|---|---|
| 工作区生命周期 | [#201333](https://github.com/openclaw/openclaw/pull/201333)：避免近期使用过的会话 worktree 被闲置清理 | **CLOSED**；针对活动时间未刷新导致误清理，以及已移除目录被重新创建为空目录的问题 |
| Gateway 启动 | [#201312](https://github.com/openclaw/openclaw/pull/201312)：模型准备被新发布替代时继续启动 | **CLOSED**；旨在避免旧模型运行时发布的取消信号中断启动 |
| 发布验证边界 | [#201343](https://github.com/openclaw/openclaw/pull/201343)：只接受精确匹配的低风险 beta 测试豁免 | **CLOSED**；收紧整批测试豁免可能掩盖其他产品故障的风险 |
| 发布可观测性 | [#201196](https://github.com/openclaw/openclaw/pull/201196)、[#201201](https://github.com/openclaw/openclaw/pull/201201)：显示验证当前步骤、保留 npm registry 失败诊断 | 均为 **CLOSED**；改善发布排障信息，不代表新增终端用户能力 |
| 测试覆盖与发布审计 | [#201200](https://github.com/openclaw/openclaw/pull/201200)、[#201197](https://github.com/openclaw/openclaw/pull/201197)：保留直接消费者测试、支持浅克隆发布审计 | 均为 **CLOSED**；侧重工程可靠性与发布流程可用性 |

**进展判断**：本日可见成果以基础设施、生命周期与发布质量治理为主，而非大规模功能扩张。快照显示 24 条 PR 已合并或关闭，但无法拆分实际合并数量，也无法确认上述变更是否进入默认分支或发行版。

### 值得跟踪的开放修复

- **运行中会话保护**：[PR #201271](https://github.com/openclaw/openclaw/pull/201271) 拟避免用户在生成过程中发送 `/think` 等命令时，当前回答因 transcript 重写冲突而丢失；标记 **P1、待维护者审阅**。
- **只读配置下的更新**：[PR #201331](https://github.com/openclaw/openclaw/pull/201331) 拟允许插件未改变配置时完成更新，减少受管、只读 `openclaw.json` 环境的错误失败。
- **后台进程清理**：[PR #201315](https://github.com/openclaw/openclaw/pull/201315) 拟补齐 cron 等会话结束后遗留进程及后续子进程的清理边界；规模 XL，存在兼容性风险，仍待作者处理。

## 3. 社区热点

**讨论热度整体有限**：已列 Issue 最高仅 3 条评论，所有提供的 👍 均为 0；PR 缺少有效评论计数，不能据此给出可信的 PR 热度排名。

1. **升级失败是最高讨论项**  
   [Issue #201057](https://github.com/openclaw/openclaw/issues/201057) 有 **3 条评论**，标记 **P0、用户体验发布阻断**。报告涉及 macOS ARM64 上的 2026.11.2 更新失败，目前仍需维护者审阅和现场复现。其核心诉求是恢复可依赖的升级路径，而非增加功能。

2. **升级成本显著超出预期**  
   [Issue #201251](https://github.com/openclaw/openclaw/issues/201251) 有 **2 条评论**：报告一次升级窗口耗时 **5,409 秒，约 90 分钟**，涉及保护目录全量扫描与数据库集合重复复制。该案例说明更新安全机制本身可能成为可用性瓶颈，但不能外推为所有环境的平均表现。

3. **长期运行后的恢复行为不符合预期**  
   [Issue #201183](https://github.com/openclaw/openclaw/issues/201183) 有 **2 条评论**：`deliver:false` 后交付状态停留在 `prepared`，重启恢复可能持续重放数周前的会话。诉求集中在恢复的时效边界、幂等性和状态收敛。

4. **安装器问题快速吸引重复修复贡献**  
   [Issue #201335](https://github.com/openclaw/openclaw/issues/201335) 已出现两个开放方案：[PR #201350](https://github.com/openclaw/openclaw/pull/201350) 聚焦 `--beta`，而 [PR #201349](https://github.com/openclaw/openclaw/pull/201349) 同时处理无法解析 release tag 时静默回落 `main` 的提示问题。响应积极，但需要维护者协调范围，避免重复评审。

## 4. Bug 与稳定性

以下按现有优先级与潜在影响排序；**标签反映分诊状态，不等于根因已经确认**。

### P0：升级阻断

| 问题 | 影响 | Fix PR 状态 |
|---|---|---|
| [#201057 更新失败](https://github.com/openclaw/openclaw/issues/201057) | macOS ARM64 更新失败，标记发布阻断 | 未见关联修复 PR；需现场复现、维护者审阅 |

### P1：工具能力、迁移和交互可靠性

| 问题 | 主要影响 | Fix PR 状态 |
|---|---|---|
| [#201337 Codex 旧状态迁移失败](https://github.com/openclaw/openclaw/issues/201337) | 历史 `turn_completed` 记录可能使插件持续处于 `pending-state-migration` 不可用状态 | **标记有关联开放 PR**，快照未给编号 |
| [#201180 Windows Doctor `EPERM fsync`](https://github.com/openclaw/openclaw/issues/201180) | 修复前恢复副本创建失败，阻断认证资料迁移 | 未见关联 PR |
| [#201234 多智能体委派回归](https://github.com/openclaw/openclaw/issues/201234) | 从 agent 的 exec 调用 CLI 被归因检查阻止；报告子智能体在 `claude-cli` 下无工具 | 未见关联 PR |
| [#201233 Tool Search 包装后的 spawn 失败](https://github.com/openclaw/openclaw/issues/201233) | `dispatch_action → sessions_spawn` 无法通过 Gateway 调用者权限检查 | 未见关联 PR |
| [#201348 Slack 拒绝交互覆盖原消息](https://github.com/openclaw/openclaw/issues/201348) | 未授权用户按按钮后，问题消息被拒绝提示覆盖；标记消息丢失 | 未见关联 PR |
| [#201206 Teams 会议无法完成 talk-back 加入](https://github.com/openclaw/openclaw/issues/201206) | 当前工作会议链接与加入流程兼容性受阻 | 未见关联 PR |

### P2：状态一致性、性能与权限衔接

- **恢复与交付状态不一致**：[Issue #201339](https://github.com/openclaw/openclaw/issues/201339) 报告子智能体先被判为 `permanent_failure`，随后结果却经 `subagent_settle` 送达；与旧会话重复恢复问题共同提示，需要重点验证完成判定与持久交付证据的时序。两者均未见明确关联修复 PR。
- **PostgreSQL 迁移正确性与性能**：[Issue #201250](https://github.com/openclaw/openclaw/issues/201250) 涉及 schema 元数据不一致导致迁移失败；[#201249](https://github.com/openclaw/openclaw/issues/201249) 涉及逐行 INSERT 使 WAN 迁移耗时数小时。均已有源码复现、可排队修复标签，但未见关联 PR。
- **CLI/MCP 上下文缺失**：[Issue #201195](https://github.com/openclaw/openclaw/issues/201195) 报告 CLI 运行时经 MCP bridge 调用 `github_read` 持续失败；未见关联 PR。
- **权限上下文衔接失败**：[Issue #201262](https://github.com/openclaw/openclaw/issues/201262)、[#201344](https://github.com/openclaw/openclaw/issues/201344) 分别涉及 Codex 人工触发轮次的 spawn、owner 认证定时续执行的节点工具被拒绝。**目前是授权拒绝报告，不应解读为已证实的权限绕过漏洞**。
- **Mac 打包回归**：[Issue #201255](https://github.com/openclaw/openclaw/issues/201255) 涉及 Codex 0.169 语音 helper 的 rpath 检查，已标记关联开放 PR，但编号未提供。

**关闭不等于已修复**：例如 [#201326](https://github.com/openclaw/openclaw/issues/201326) 的插件迁移冲突、[#201172](https://github.com/openclaw/openclaw/issues/201172) 的隔离心跳复用 Codex 线程问题均已关闭，但当前材料不足以确认关闭原因或修复版本。

## 5. 功能请求与路线图信号

| 需求或方向 | 用户价值 | 下一版本信号 |
|---|---|---|
| [decisionModel 支持主模型与回退模型 #201194](https://github.com/openclaw/openclaw/issues/201194) | 在 402、429 或超时后自动切换，减少自动化停摆 | 尚需产品决策，未见实现 PR |
| [iOS 保存/分享助手媒体 #201171](https://github.com/openclaw/openclaw/issues/201171) | 将收到的图片、视频以原始附件形式保存或分享 | 尚需产品决策，未见实现 PR |
| [macOS 欢迎页与一屏模型选择 #201267](https://github.com/openclaw/openclaw/issues/201267) | 在自动连接前，让用户理解并选择 AI | 邻近方向已有 [PR #201004](https://github.com/openclaw/openclaw/pull/201004) 延后本地网络权限请求，但不等于完整欢迎流程已实现 |
| [CLI 引导区分可用推理连接与运行就绪 #201182](https://github.com/openclaw/openclaw/issues/201182) | 避免“配置完成”被误认为“系统已可运行” | [PR #200859](https://github.com/openclaw/openclaw/pull/200859)、[#200858](https://github.com/openclaw/openclaw/pull/200858) 改善诊断输出和完成提示，但未覆盖全部诉求 |
| [WhatsApp 文本与媒体突发合批 PR #200755](https://github.com/openclaw/openclaw/pull/200755) | 将连续文字、图片、语音作为一个语义完整轮次处理 | 已有实现，待维护者处理；有兼容性风险 |
| [定时提醒统一使用 task prompts PR #201275](https://github.com/openclaw/openclaw/pull/201275) | 统一编辑器、CLI、工具的调度语义 | 已有 XL 级重构，待作者处理，短期落地不确定 |

**判断**：范围较小、已有证据并待审阅的安装器和引导修复，比尚待产品决策的新增能力更具近期落地条件；没有发布计划证据，不能承诺进入下一版本。

## 6. 用户反馈摘要

> 未提供评论正文，以下仅提炼 Issue 描述中的用户报告，不代拟评论或推断满意度。

- **“升级需要可预测、可恢复”**：升级耗时约 90 分钟，以及 Windows Doctor 在恢复副本阶段失败，说明维护操作本身可能阻断日常使用。见 [#201251](https://github.com/openclaw/openclaw/issues/201251)、[#201180](https://github.com/openclaw/openclaw/issues/201180)。
- **“多智能体能力必须跨运行时一致”**：用户已在 Telegram、CLI 与第三方后端中使用委派和工具调用；普通对话能运行，不代表压缩、spawn 或 MCP 工具可用。见 [#201262](https://github.com/openclaw/openclaw/issues/201262)、[#201190](https://github.com/openclaw/openclaw/issues/201190)、[#201195](https://github.com/openclaw/openclaw/issues/201195)。
- **“完成状态应与真实交付一致”**：旧任务反复恢复、已交付结果被判失败，削弱无人值守自动化的可信度。见 [#201183](https://github.com/openclaw/openclaw/issues/201183)、[#201339](https://github.com/openclaw/openclaw/issues/201339)。
- **“基础体验仍有明显断点”**：字号不覆盖工具卡片、归档会话搜不到、macOS 粘贴仅出现文件名，均直接影响高频操作。见 [#201328](https://github.com/openclaw/openclaw/issues/201328)、[#201210](https://github.com/openclaw/openclaw/issues/201210)、[#201170](https://github.com/openclaw/openclaw/issues/201170)。

当前样本以问题反馈为主，**没有足够材料衡量整体满意度或正向口碑**。

## 7. 待处理积压与维护者关注项

**本快照不能识别“长期未响应”积压**：可见记录主要创建于 11 月 17—18 日，也缺少维护者最后响应时间。以下是当前重要待办，而非已证实的长期搁置项：

1. **优先完成 P0 现场复现与责任归属**：[Issue #201057](https://github.com/openclaw/openclaw/issues/201057) 尚无明确修复 PR，应先形成可验证的更新失败诊断。
2. **集中排查工具调用权限传递链**：[#201233](https://github.com/openclaw/openclaw/issues/201233)、[#201234](https://github.com/openclaw/openclaw/issues/201234)、[#201262](https://github.com/openclaw/openclaw/issues/201262)。这些报告存在相邻症状，建议统一测试矩阵，但不能直接认定为同一根因。
3. **优先审阅可能造成回答丢失的修复**：[PR #201271](https://github.com/openclaw/openclaw/pull/201271) 为 P1、待维护者审阅，应重点验证命令并发与 transcript 一致性。
4. **处理重复安装器方案**：[PR #201349](https://github.com/openclaw/openclaw/pull/201349)、[#201350](https://github.com/openclaw/openclaw/pull/201350)，明确合并范围与无 npm 环境验证要求。
5. **推动可评审 PR 收敛**：[PR #201347](https://github.com/openclaw/openclaw/pull/201347) 的工作区扫描优化、[#201004](https://github.com/openclaw/openclaw/pull/201004) 的权限弹窗时机调整均已有充分证据标签，可作为审阅队列中的明确候选。

**项目健康度结论**：贡献和修复活动保持活跃，但升级、状态迁移与跨运行时委派是当前主要风险面。下一阶段最有价值的成果不是增加修复条目数量，而是把关键问题推进到“可复现—修复合入—回归验证—明确发布版本”的闭环。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-19｜基于所提供的过去 24 小时快照**

> **口径说明**：以下数量均为更新条目数，不等于新增数量或独立贡献者数量；记录时间主要为 11 月 18 日。多数项目缺少 PR 合并标记，因此“关闭”不计为已交付；“无活动”也仅代表本观察窗口，不能据此判断项目停滞。

## 1. 生态全景

本次覆盖的 **13 个项目**共记录 **98 条 Issue 更新、163 条 PR 更新和 2 个版本发布**，活动主要集中在 OpenClaw、Hermes Agent、ZeroClaw 和 NanoBot。多个项目的工作重心指向同一方向：相比继续增加工具，当前更迫切的是解决升级、会话恢复、跨渠道路由、权限传递和真实交付的可靠性问题。架构上同时出现“核心轻量化、能力插件化”和“多入口统一上下文”的需求，但由此带来的插件兼容与迁移成本已经显现。整体可概括为：**能力扩展仍在继续，但生产可用性的竞争正在上升；修复提案充足，合并、验证与发布闭环仍需观察。**

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release 情况 | 当日健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 36 | 65 | 无 | 高活跃；升级 P0、迁移及委派问题突出，稳定性压力较高 |
| **Hermes Agent** | 50 | 50 | 1 个 Canary | 高活跃；插件和 Windows 修复响应可见，会话与 Gateway 可靠性待巩固 |
| **ZeroClaw** | 2 | 23 | 无 | 安全与运行时修复密集；全部 PR 待合并，交付效果未验证 |
| **NanoBot** | 2 | 14 | 无 | WebUI、启动与会话恢复迭代集中；本批 PR 来自同一贡献者 |
| **CoPaw** | 7 | 4 | `v2.3.0.post1` | 有实际发布；插件化推进，同时出现渠道升级和执行安全反馈 |
| **NanoClaw** | 1 | 5 | 无 | 小规模定点维护；指令截断与回复路由已有修复提案 |
| **LobsterAI** | 0 | 2 | 无 | 修复导向，有定向测试投入；合并状态与模型端到端验收仍缺 |
| PicoClaw | 0 | 0 | 未见 | 窗口内无活动，健康度证据不足 |
| NullClaw | 0 | 0 | 未见 | 同上 |
| IronClaw | 0 | 0 | 未见 | 同上 |
| TinyClaw | 0 | 0 | 未见 | 同上 |
| Moltis | 0 | 0 | 未见 | 同上 |
| ZeptoClaw | 0 | 0 | 未见 | 同上 |

**数据边界**：Hermes 的详细条目仅覆盖汇总的一部分；ZeroClaw 提供了 23 条 PR 中的 20 条详情。NanoClaw 条目链接指向 `nanocoai/nanoclaw`，CoPaw 链接指向 `agentscope-ai/QwenPaw`，不能仅凭这些材料推断仓库迁移关系。

## 3. OpenClaw 在生态中的定位

### 优势：覆盖面广，具备生态基础组件属性

- **本窗口 PR 活动最多**：65 条，高于 Hermes 的 50 条和 ZeroClaw 的 23 条；Issue 与 PR 合计 101 条，与 Hermes 的 100 条处于同一量级。
- **集成面较广**：反馈覆盖 macOS、Windows、iOS、CLI、Gateway，以及 Slack、Teams、WhatsApp、Telegram 等入口，同时涉及多运行时、子智能体、MCP 和数据库迁移。
- **存在下游集成证据**：LobsterAI 明确围绕其使用的 OpenClaw v2026.8.1 优化技能目录与交付流程，说明 OpenClaw 不只是终端产品，也被用于其他产品的能力集成。

### 技术路线：多入口、多运行时的统一编排

相较 NanoBot 当日偏向 WebUI 与启动体验、NanoClaw 偏向常驻智能体运行器、ZeroClaw 偏向安全与运行时边界治理，OpenClaw 展现出更广的**渠道接入—会话管理—工具授权—子智能体委派—交付恢复**覆盖面。Hermes 与其最接近，同样涉及 Gateway、桌面、多渠道和长期记忆，但当日更突出插件兼容、桌面交互及会话可访问性。

### 代价：集成广度带来更大的回归验证面

OpenClaw 当前的核心风险不是缺少能力，而是**已有能力能否跨运行时、跨渠道保持一致**：升级阻断、Doctor 迁移失败、工具调用者归因拒绝和交付状态不收敛，均发生在子系统交界处。

**定位结论**：OpenClaw 是本窗口中覆盖面最广、开发活动最密集的核心参照之一；但其广度不能直接等同于更高可靠性。现有数据也不足以比较各项目的长期社区规模、用户量或贡献者多样性。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **会话生命周期与状态一致性** | OpenClaw、NanoBot、Hermes、NanoClaw、ZeroClaw | 避免旧任务重复恢复、漏收结束帧后持续“运行中”、压缩后会话不可达、排队输入路由滞后及取消覆盖完成结果 |
| **跨渠道上下文与回复归属** | OpenClaw、NanoBot、Hermes、NanoClaw | 同一任务跨 WebUI、消息渠道和 CLI 延续；正确区分操作入口、回复目的地和历史写入位置 |
| **最小权限与执行安全** | OpenClaw、CoPaw、ZeroClaw、Hermes、LobsterAI | 权限上下文正确传递、Shell 外发审批、审批文本安全展示、凭据脱敏及沙箱策略一致性 |
| **升级、迁移与部署可靠性** | OpenClaw、Hermes、NanoBot、NanoClaw、CoPaw | 可恢复升级、只读配置支持、Windows 兼容、渠道组件迁移、更新前检查 |
| **上下文预算与信息保真** | NanoBot、Hermes、CoPaw、NanoClaw、LobsterAI | 确认稿原样保留、压缩摘要验证、工具结果限量、避免指令截断、统一技能目录 |
| **插件化与按需加载** | CoPaw、Hermes、NanoBot | 核心解耦、SDK 延迟加载、插件兼容与 MCP 接入便利性 |
| **可验证的任务完成** | OpenClaw、Hermes、LobsterAI | 完成状态匹配真实交付、独立检查 DONE、校验文件名、位置及最终链接 |

这些方向具有相关性，但**不能据相似症状认定不同项目存在同一根因**。

## 5. 差异化定位分析

以下定位依据当日可见工作推断，不替代完整产品评测。

| 项目 | 功能与架构侧重 | 更相关的用户或场景 | 主要验证成本 |
|---|---|---|---|
| **OpenClaw** | Gateway、多运行时、多渠道与子智能体编排 | 需要复杂自动化和广泛入口集成的用户 | 权限、迁移、恢复和跨运行时一致性 |
| **Hermes** | Gateway＋Desktop＋外部记忆插件 | 长期工作会话、桌面多任务与记忆扩展 | 插件兼容、会话可达性、异步回复路由 |
| **NanoBot** | WebUI、渠道续聊、启动路径优化 | 重视浏览器交互与日常办公助手体验的用户 | 内容保真、重连状态和性能回归 |
| **NanoClaw** | 常驻智能体、容器运行及 CLI 提供商适配 | 希望拥有和维护自身常驻助手的开发者 | 指令预算、输入队列与回复归属 |
| **CoPaw** | 核心轻量化、插件扩展、Console 与工作渠道 | 通过钉钉、飞书及 MCP 执行工作流的用户 | 插件迁移、外发审批、工具上下文预算 |
| **ZeroClaw** | 安全边界、运行时隔离、声明式调度 | 关注凭据保护、部署与执行治理的开发者 | 安全修复合入及高风险运行时变更 |
| **LobsterAI** | Cowork、执行策略、OpenClaw 集成与文件交付 | 文档生成和交付物导向的办公场景 | 沙箱策略恢复、真实模型端到端验收 |

其余六个项目缺少当日活动证据，不宜据此补充架构或目标用户判断。

## 6. 社区热度与成熟度

### 活跃度分层

- **高活动量：OpenClaw、Hermes**  
  两者合计占本次 Issue 与 PR 更新的约 **77%**。覆盖问题广、贡献和反馈密集，但活动量并不代表已交付修复更多。
- **集中迭代：ZeroClaw、NanoBot、CoPaw**  
  ZeroClaw 偏安全修补，NanoBot 偏交互与恢复，CoPaw 同时推进发布、插件化和升级治理。
- **定点质量巩固：NanoClaw、LobsterAI**  
  改动范围较聚焦，围绕可复现的指令、路由、配置及交付问题推进。
- **窗口静默：其余六个项目**  
  不能由单日零活动推导出维护中断。

### 热度不等于成熟度

可见 Issue 的最高评论数仅为 **3 条**，PR 评论数据普遍缺失，因此本日报更适合比较**工程活动与风险面**，不适合给出社区影响力排名。OpenClaw、Hermes 表现出较广的使用场景，但也暴露更多系统边界问题；NanoClaw、LobsterAI 的问题更集中，却不能据此认定质量更高。

**成熟度更应看闭环证据**：可复现问题、修复合入、回归测试、明确发布版本及用户验证，而非关闭数量或 PR 总量。

## 7. 值得关注的趋势信号

### ① 智能体的难点正转向“状态与交付”
多项目出现“结果已经送达却判失败”“消息发出但未进入会话”“界面仍显示运行中”等问题。  
**开发参考**：将执行完成、结果持久化、消息投递和用户可见状态分别建模，并验证恢复幂等性。

### ② 多入口体验需要明确上下文和路由规则
WebUI 续聊、ACP 后台完成通知、WhatsApp 定时消息都要求区分“谁触发、在哪继续、发往哪里”。  
**开发参考**：将会话标识、入口、回复目标和授权主体作为显式元数据贯穿异步事件，避免仅靠当前连接推断。

### ③ 安全治理必须同时解决“越权”与“合法操作被拒”
CoPaw、ZeroClaw 关注审批和敏感信息边界；OpenClaw 则出现合法工具调用被拒。  
**开发参考**：安全测试应同时覆盖未授权操作的阻断，以及授权上下文跨子智能体、CLI、MCP 的正确传递。

### ④ 上下文管理正在从节省 token 转向保障正确性
NanoBot 的确认稿变化、NanoClaw 的指令截断、CoPaw 的工具结果超限和 Hermes 的摘要验证诉求，说明上下文丢失会直接改变任务行为。  
**开发参考**：将确认稿、关键指令和交付证据作为可检索、可校验的独立数据保存，而非完全依赖压缩后的对话历史。

### ⑤ 插件化降低核心复杂度，也引入升级兼容成本
CoPaw 的渠道升级反馈与 Hermes 的记忆插件导入失败构成直接提醒。  
**开发参考**：插件化应配套版本兼容声明、启动健康检查、显式降级提示及迁移测试，避免静默失效。

### ⑥ “完成”应由产物证据定义
LobsterAI 校验文件位置和链接，Hermes 提议独立 critic，OpenClaw 暴露完成状态与交付不一致。  
**开发参考**：重要任务应使用文件存在性、内容检查、远端回执或独立验收定义成功，而非仅接受模型声明 DONE。

---

**决策结论**：本窗口中，OpenClaw 与 Hermes 是广覆盖平台路线的主要观察对象；其他活跃项目体现了 WebUI、常驻运行、插件化、安全治理及办公交付等侧重点。对选型和工程投入而言，下一步最值得验证的不是“支持多少功能”，而是**升级可恢复、权限可解释、会话可延续、结果可验收**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-19** · [项目仓库](https://github.com/HKUDS/nanobot)

> 统计范围为所提供的过去 24 小时数据，条目时间均显示为 2026-11-18。PR 数据仅区分 OPEN/CLOSED，无法确认 CLOSED 是否代表已合并；下文不将关闭状态等同于功能已落地。今日无新版本发布。

## 1. 今日速览

过去 24 小时，NanoBot 共更新 **2 条 Issue、14 条 PR**，其中 **5 条 PR 待处理、9 条已关闭**，呈现较高的代码迭代活跃度。工作重心集中在 **WebUI 体验、启动性能与会话恢复可靠性**，同时涉及会话上下文保真和 URL 校验安全加固。启动优化出现 Windows 首次新建会话变慢的问题，随后通过恢复原启动流程、拆分优化方案继续推进，体现出对回归风险的关注。社区讨论规模仍小：已知 Issue 合计仅 1 条评论，且本批 14 条 PR 均来自同一贡献者，说明开发推进集中，但尚不能据此判断整个项目的维护者结构。  
相关：[启动优化拆分 #6712](https://github.com/HKUDS/nanobot/pull/6712) · [会话回放修复 #6717](https://github.com/HKUDS/nanobot/pull/6717)

## 2. 项目进展

### 启动性能：由整体优化转向分拆验证
**状态：相关 PR 已关闭，后续方案仍开放**

- [#6708](https://github.com/HKUDS/nanobot/pull/6708) 尝试批量恢复启动状态、提前认证，但摘要明确指出端到端目标尚未达成，Windows 桌面端新建会话命令响应变慢。
- [#6712](https://github.com/HKUDS/nanobot/pull/6712) 随后提出恢复此前的浏览器及启动器流程，同时保留恢复批处理优化。
- 拆出的 [#6713](https://github.com/HKUDS/nanobot/pull/6713) 仍开放，继续单独验证提前认证与延迟导入。

**进展判断：** 优化方向更加可验证、风险边界更清晰，但目前不能认定整体启动性能已经改善。

### WebUI 使用体验：多项细节进入关闭状态
**状态：以下 PR 均已关闭，是否合并待确认**

| 方向 | 主要变化 | PR |
|---|---|---|
| 操作反馈 | 为瞬时操作引入统一、本地化 Toast，改善错误提示及归档、删除后的撤销体验 | [#6702](https://github.com/HKUDS/nanobot/pull/6702) |
| 长文本输入 | 改善长草稿展开及聊天输入框、模型选择器滚动条 | [#6709](https://github.com/HKUDS/nanobot/pull/6709) |
| 侧栏体验 | 搜索与归档入口随列表滚动；修复会话改名后的异常焦点框 | [#6706](https://github.com/HKUDS/nanobot/pull/6706)、[#6710](https://github.com/HKUDS/nanobot/pull/6710) |
| 模型控制 | 修复推理级别加载时控件闪变，调整速度按钮对齐并保留触控目标 | [#6707](https://github.com/HKUDS/nanobot/pull/6707)、[#6703](https://github.com/HKUDS/nanobot/pull/6703) |
| 前端资源 | 避免打开差异视图时冗余加载 Markdown 解析器及重复打包 Shiki 资源 | [#6711](https://github.com/HKUDS/nanobot/pull/6711) |

**整体判断：** 本日主要是面向日常使用的增量打磨，而非大型能力发布。若相关关闭 PR 已合并，收益将集中体现为更清晰的操作反馈、更一致的交互和更少的冗余资源加载。

## 3. 社区热点

### ① 通知草稿无法原样保留：唯一有评论的 Issue
[#6704](https://github.com/HKUDS/nanobot/issues/6704) · **1 条评论、0 个赞**

用户使用 NanoBot 起草欢迎新员工的 Python `message()` 通知，后续要求重复草稿时，文本及文具清单细节发生变化。诉求不是重新生成“意思相近”的内容，而是保留已经确认的准确文本。已有对应修复提案 [#6717](https://github.com/HKUDS/nanobot/pull/6717)，但尚未关闭。

### ② 官方托管 MCP 服务接入预设
[#6705](https://github.com/HKUDS/nanobot/issues/6705) · **0 条评论、0 个赞**

AI/ML API 方面希望将其官方托管 MCP 服务加入预设列表，减少用户手动填写 URL 的步骤。这反映了服务提供方对 NanoBot 集成入口的兴趣，但目前没有评论或反应数据支持将其视为广泛用户需求。

**热度限制：** 所有 PR 的评论数均缺失，不能进行可靠的讨论热度排名；已有数据更能反映开发活动，而非社区共识。

## 4. Bug 与稳定性

以下按**潜在影响优先级**排列，并非官方严重性评级。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| 高：安全边界 | URL 校验未提前拒绝主机名中的空白或原始控制字符，连接检查可能对无效目标执行 DNS 解析。现有摘要未显示可利用攻击或已发生安全事件。 | 已有开放修复 [#6716](https://github.com/HKUDS/nanobot/pull/6716) |
| 高：内容保真 | 通知草稿在后续上下文中丢失，重复请求产生不同内容；影响用户对助手记忆和确认稿件的信任。 | Issue [#6704](https://github.com/HKUDS/nanobot/issues/6704)；开放修复 [#6717](https://github.com/HKUDS/nanobot/pull/6717)，拟保留字面工具草稿及时间标题 |
| 中：运行状态一致性 | 浏览器漏收回合结束帧后，重连仍显示 Agent 正在运行；历史读取失败时无法纠正。 | 已有开放修复 [#6715](https://github.com/HKUDS/nanobot/pull/6715)，拟利用 Gateway 的运行状态进行校正 |
| 中：性能回归 | 启动优化导致 Windows 首次新建会话命令变慢。 | 恢复流程提案 [#6712](https://github.com/HKUDS/nanobot/pull/6712) 已关闭；独立优化 [#6713](https://github.com/HKUDS/nanobot/pull/6713) 待验证 |
| 低：交互异常 | 推理滑块加载期间短暂变成下拉框；侧栏改名后出现异常焦点框。 | [#6707](https://github.com/HKUDS/nanobot/pull/6707)、[#6710](https://github.com/HKUDS/nanobot/pull/6710) 已关闭，合并状态未知 |

本批数据未出现明确的崩溃报告。稳定性风险主要集中在**会话回放、断线恢复及启动优化回归**。

## 5. 功能请求与路线图信号

- **跨渠道会话在 WebUI 中继续：近期候选功能。**  
  开放 PR [#6714](https://github.com/HKUDS/nanobot/pull/6714) 希望让 Telegram 等渠道中开始的会话可从 WebUI 侧栏继续，避免新建 WebUI 话题丢失上下文。它同时涉及回复路由边界：不能让用户在 WebUI 的操作意外向原渠道发送消息。已有实现提案，是较强的近期路线图信号，但尚无发布承诺。

- **MCP 预设扩展：仍处需求阶段。**  
  [#6705](https://github.com/HKUDS/nanobot/issues/6705) 提议修改 `nanobot/webui/mcp_presets.json` 并补充文档表格；本批数据未提供对应 PR，是否进入下一版本仍待维护者评估。

- **可靠性修复可能优先于新能力。**  
  会话回放 [#6717](https://github.com/HKUDS/nanobot/pull/6717)、重连校正 [#6715](https://github.com/HKUDS/nanobot/pull/6715) 和安全校验 [#6716](https://github.com/HKUDS/nanobot/pull/6716) 均已有开放 PR，具备近期推进基础，但不能据此确认版本归属。

## 6. 用户反馈摘要

> 未提供 Issue 评论正文，因此以下仅提炼自 Issue 描述，不推测评论观点或用户满意度。

- **实际场景：办公通知起草与复用。** 用户需要助手保存已经拟好的消息，而不是每次请求时重新创作。核心痛点是“确认过的内容不可稳定复现”，而非语言表达质量。[#6704](https://github.com/HKUDS/nanobot/issues/6704)
- **集成场景：降低 MCP 配置门槛。** 服务提供方希望通过内置预设减少手工填写地址的步骤；这是接入便利性诉求，不能直接等同于终端用户的采用意愿。[#6705](https://github.com/HKUDS/nanobot/issues/6705)
- **满意度证据不足。** 当前数据没有明确的正向评价，也没有足够评论支撑整体不满意的结论。

## 7. 待处理积压与维护提醒

**本批条目均为近期创建，无法识别长期未响应积压。** 建议关注以下开放事项，而非将其标记为“长期滞留”：

1. **优先审查会话内容保真与安全校验**：[#6717](https://github.com/HKUDS/nanobot/pull/6717)、[#6716](https://github.com/HKUDS/nanobot/pull/6716)。
2. **补足重连与跨平台验证**：关注漏收结束帧、历史读取失败及 Windows 首次新建会话场景，避免局部优化带来新的状态或性能回归。[#6715](https://github.com/HKUDS/nanobot/pull/6715)、[#6713](https://github.com/HKUDS/nanobot/pull/6713)
3. **明确跨渠道续聊的消息发送边界**：在功能进入发布前验证上下文延续与原渠道投递行为。[#6714](https://github.com/HKUDS/nanobot/pull/6714)
4. **回应外部 MCP 接入申请**：明确预设收录条件及后续责任，避免需求停留在无人反馈状态。[#6705](https://github.com/HKUDS/nanobot/issues/6705)

**健康度结论：** NanoBot 当前呈现“开发活跃、可靠性修补密集、社区反馈样本偏少”的状态。积极信号是用户报告已有对应修复提案，且性能回归被显式识别并拆分处理；主要观察点是这些开放修复能否完成验证，以及关闭 PR 的实际合并与发布情况。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-19｜观察窗口：过去 24 小时**  
项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

> **数据口径**：本日报依据提供的 50 条 Issue 更新、50 条 PR 更新及 1 个 Release 汇总生成；可见明细为 30 条 Issue、20 条 PR，时间均为 11 月 18 日。Release 正文被截断，PR 评论数为 `undefined`，且未提供评论正文。因此，下文区分用户报告、待合并修复与已确认发布，不将提案视为落地结果。

## 1. 今日速览

过去 24 小时，项目记录 **50 条 Issue 更新和 50 条 PR 更新**，开发与反馈活动密集，但这不等同于新增 100 项工作。PR 汇总中 **47 条待合并、3 条已合并或关闭**，不过后三条没有可见明细，暂时无法量化实际交付成果。今日主要工作集中在 **Gateway 与会话可靠性、Windows 启动、插件兼容性以及桌面端体验**，部分高影响问题已出现对应修复 PR。另有一个 Canary 版本发布，但缺少完整变更日志；整体表现为“贡献活跃、修复响应可见，稳定性与合并验证仍需重点关注”。  
参考：[项目 Issues](https://github.com/NousResearch/hermes-agent/issues) · [项目 PRs](https://github.com/NousResearch/hermes-agent/pulls)

## 2. 版本发布

### Canary：`v0.23.2+canary.20261118T064620Z`

- **发布日期**：2026-11-18。
- **发布类型**：Canary 构建，不应等同于正式稳定版。
- **已知内容**：发布说明包含 Hermes Desktop 下载表，可见 macOS Apple Silicon 的 DMG 下载项。
- **更新内容与破坏性变更**：提供的正文在下载表处截断，**无法确认具体修复、功能变化、破坏性变更或官方迁移步骤**。
- **升级建议**：先在测试环境验证插件加载、会话恢复及 Gateway 启停；当前主分支已有内部模块移动导致插件导入失败的报告，但**不能据此认定该 Canary 一定包含同一回归或其修复**。

链接：[Release 详情](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.2%2Bcanary.20261118T064620Z) · [插件兼容问题 #157438](https://github.com/NousResearch/hermes-agent/issues/157438)

## 3. 项目进展

### 已合并/关闭成果：目前无法核验具体内容

汇总显示 3 条 PR 已合并或关闭，但可见的 20 条 PR **全部为 OPEN**。因此，不能确认这 3 条分别属于合并还是未合并关闭，也不能把下面的待审修复计入已交付成果。  
参考：[PR 列表](https://github.com/NousResearch/hermes-agent/pulls)

### 重要待合并进展

| 方向 | 当前进展与价值 | 状态 |
|---|---|---|
| 记忆插件兼容 | 恢复因内部模块移动而无法加载的 OpenViking、Honcho 记忆插件，避免静默退回内置记忆 | [#157478](https://github.com/NousResearch/hermes-agent/pull/157478)，OPEN，带 `ci-reviewed` 标签 |
| Windows 启动 | 从 System32 定位 `whoami.exe`，避免误调用内置 Git 的同名工具导致身份校验失败 | [#157479](https://github.com/NousResearch/hermes-agent/pull/157479)，OPEN |
| Windows Gateway 可用性 | 处理一次 AcceptEx 异常后监听套接字关闭、进程仍存活却无法连接的问题 | [#157483](https://github.com/NousResearch/hermes-agent/pull/157483)，OPEN |
| 容器部署 | 对只读 `config.yaml` 明确跳过启动配置迁移，改善只读挂载场景的失败处理与提示 | [#157476](https://github.com/NousResearch/hermes-agent/pull/157476)，OPEN |
| 远程 Webapp 认证 | 为浏览器托管的 Desktop 使用 Gateway 公共 OAuth 回调，支持 MCP 登录 | [#157470](https://github.com/NousResearch/hermes-agent/pull/157470)，OPEN |
| 压缩后的会话操作 | 修复压缩轮转后聊天执行“Move to project”时的会话标识处理 | [#157467](https://github.com/NousResearch/hermes-agent/pull/157467)，OPEN |

**进展判断**：今日可确认的是多个高价值修复已进入评审队列，而不是已经完成交付；实际向前推进的幅度，仍取决于合并、回归测试与后续发布。

## 4. 社区热点

可见 Issue 的最高评论数只有 **3 条**，且所有展示条目的 👍 均为 0，说明讨论量较分散，尚无明显高共识热点。PR 评论数缺失，无法按讨论热度排序。

| 热点 | 可见互动 | 背后的诉求 |
|---|---:|---|
| [OpenViking 插件导入失败 #157438](https://github.com/NousResearch/hermes-agent/issues/157438) | 3 评论 | 用户依赖外部长期记忆；插件失效却回退内置记忆，需要明确诊断和兼容性保障。已有 [修复 PR #157478](https://github.com/NousResearch/hermes-agent/pull/157478)。 |
| [Windows 集成终端光标横跳 #157373](https://github.com/NousResearch/hermes-agent/issues/157373) | 3 评论 | 问题同时出现在普通 Shell 与经典 CLI，用户关注的是桌面终端基础可用性，而不只是模型输出。 |
| [远程图片打开错误 #157431](https://github.com/NousResearch/hermes-agent/issues/157431) | 2 评论 | 网页图片 URL 被按 Gateway 文件处理，反映远程桌面使用中资源来源和文件访问路径的区分不足。 |
| [WhatsApp 定时消息缺少会话上下文 #157454](https://github.com/NousResearch/hermes-agent/issues/157454) | 1 评论 | 用户期望主动推送不仅送达，还能进入同一会话记忆，使后续回复连续。 |

## 5. Bug 与稳定性

以下按**潜在用户影响**排序；原始标签主要为 P2/P3，不额外推定为已确认的更高等级事故。“未见修复”仅表示所给明细中未展示。

### 优先关注：无法启动、会话不可达、回合收尾失败

| 问题 | 影响与风险 | Fix PR |
|---|---|---|
| [本地规范会话永久返回 503 #157440](https://github.com/NousResearch/hermes-agent/issues/157440) | 特定 `local-*` 会话无法恢复、删除或修改；属于会话可访问性问题，尚不能据此判断数据丢失 | 未见 |
| [运行时页脚导致 `deepcopy` 失败 #157439](https://github.com/NousResearch/hermes-agent/issues/157439) | 报告称启用相关配置后，每个完成回合的结算/发布都会触发 `TypeError` | 未见 |
| [Windows 身份校验失败 #157356](https://github.com/NousResearch/hermes-agent/issues/157356) | 异常断电后无法启动；PATH 中同名 `whoami.exe` 干扰身份校验 | [#157479](https://github.com/NousResearch/hermes-agent/pull/157479)，待合并 |
| [Gateway 停机卡死 #157413](https://github.com/NousResearch/hermes-agent/issues/157413) | drain 完成后仍挂起，后续 SIGTERM 无效，需强制终止；影响重启与运维恢复 | 未见 |
| [压缩后会话消失报告 #157437](https://github.com/NousResearch/hermes-agent/issues/157437) | 用户称重要聊天在压缩附近消失，但复现条件与数据状态尚未明确 | 未见直接修复 |

### 次优先：能力失效、消息路由与上下文不一致

| 问题 | 影响与风险 | Fix PR |
|---|---|---|
| [外部记忆插件加载失败 #157438](https://github.com/NousResearch/hermes-agent/issues/157438) | 服务健康但插件未激活，实际退回内置记忆；错误原因不够显著 | [#157478](https://github.com/NousResearch/hermes-agent/pull/157478)，待合并 |
| [ACP 后台任务完成回复误投 #157364](https://github.com/NousResearch/hermes-agent/issues/157364) | 完成通知触发的回复进入 Gateway 本地会话，ACP 客户端收不到；带 `needs-decision` 标签 | 未见 |
| [WhatsApp LID 会话未镜像定时消息 #157454](https://github.com/NousResearch/hermes-agent/issues/157454) | 消息送达但上下文未写入对应 DM，会影响接续回复 | 未见 |
| [真实浏览器配置选错二进制 #157428](https://github.com/NousResearch/hermes-agent/issues/157428) | 可能使用低版本 Chrome 打开较新版本配置文件，值得优先验证兼容性 | 未见 |
| [Linux 图形浏览器启动失败 #157429](https://github.com/NousResearch/hermes-agent/issues/157429) | 子进程缺少 `DISPLAY`/`XAUTHORITY`，真实配置、有界面模式无法启动 | 未见 |

### 安全边界与体验问题

- **审批规则持久化错误**：用户报告“Always allow”写入的是命令描述，而不是命令本身；需要核查审批配置的正确性，尚不能推定存在权限绕过。未见对应修复。  
  [#157348](https://github.com/NousResearch/hermes-agent/issues/157348)
- **后台 review 写入权限缺少配置收窄手段**：关注 `skill_manage` 默认可用带来的最小权限边界，属于设计与安全配置诉求。未见对应修复。  
  [#157349](https://github.com/NousResearch/hermes-agent/issues/157349)
- **桌面 Bot Chat 显示回复却缺少问题**：保存记录中消息齐全，但 UI 需强制重载才恢复，容易被误认为上下文丢失。未见对应修复。  
  [#157466](https://github.com/NousResearch/hermes-agent/issues/157466)
- **Telegram 流式编辑节流异常**：阈值使用累计文本长度而非未刷新增量，可能导致编辑间隔控制失效。未见对应修复。  
  [#157481](https://github.com/NousResearch/hermes-agent/issues/157481)

## 6. 功能请求与路线图信号

### 相对接近落地：已有实现 PR，但仍待评审

- **多会话注意力管理**：让“等待用户输入”和“未读”在侧栏、Dock 更显著，适合多任务智能体使用。  
  [PR #157477](https://github.com/NousResearch/hermes-agent/pull/157477)
- **Google Workspace 集成**：拟加入 gws-oauth v0.8.0，覆盖多账户、Gmail/Drive/Calendar 工具及定向变更通知。  
  [PR #157482](https://github.com/NousResearch/hermes-agent/pull/157482)
- **工具结果压缩插件**：ctxprune 拟以社区插件形式进入目录，声明通过重复行计数等方式压缩工具输出；实际收益仍待验证。  
  [PR #157465](https://github.com/NousResearch/hermes-agent/pull/157465)
- **serve/dashboard 向 Gateway 迁移提示**：迁移系列继续推进，补充更新后旧后端识别及 Docker、Nix、Windows 手动迁移说明；当前 PR 依赖前序工作。  
  [PR #157484](https://github.com/NousResearch/hermes-agent/pull/157484)

### 中期信号：可靠性验证优先于单纯扩展能力

- **压缩摘要验证**：建议可选检查预生成摘要是否保留智能体随后实际使用的信息，指向长任务的信息完整性保障。  
  [Issue #157486](https://github.com/NousResearch/hermes-agent/issues/157486)
- **`/goal` 独立完成审查**：建议使用新上下文、可调用工具的独立 critic，再接受 DONE，指向结果验证与减少过早完成。  
  [Issue #157485](https://github.com/NousResearch/hermes-agent/issues/157485)
- **GUI 自动化增加 move/hover**：面向 macOS Java/Swing 菜单，具体场景为 IBKR TWS。  
  [Issue #157434](https://github.com/NousResearch/hermes-agent/issues/157434)
- **新模型目录、定价与上下文选择器登记**：用户请求补充 GPT-6.2 系列支持；这是 Issue 中的请求，提供数据不足以独立核实模型发布情况。  
  [Issue #157463](https://github.com/NousResearch/hermes-agent/issues/157463)

**下一版本判断**：已有 PR 的桌面提示、OAuth 和插件目录项目，比仅停留在 Issue 阶段的验证机制更接近交付，但没有发布承诺或排期证据。

## 7. 用户反馈摘要

> 未提供评论正文，以下根据 Issue 描述提炼，不作为评论原话或整体满意度调查。

- **“会话必须持续可用”是最强信号。** 用户将 Hermes 用于重要工作，担心压缩后找不到聊天、历史会话无法打开，以及长期 Bot Chat 无法轮转。  
  [#157437](https://github.com/NousResearch/hermes-agent/issues/157437) · [#157440](https://github.com/NousResearch/hermes-agent/issues/157440) · [#157416](https://github.com/NousResearch/hermes-agent/issues/157416)
- **用户期望跨入口保持同一上下文。** WhatsApp 定时推送与 ACP 后台任务说明，消息“发出”不代表用户能在正确入口看到它并继续讨论。  
  [#157454](https://github.com/NousResearch/hermes-agent/issues/157454) · [#157364](https://github.com/NousResearch/hermes-agent/issues/157364)
- **静默降级不利于建立信任。** OpenViking 未激活却保留内置记忆，可能让用户误判实际使用的记忆后端；可诊断性与功能本身同样重要。  
  [#157438](https://github.com/NousResearch/hermes-agent/issues/157438)
- **桌面与移动端的基础交互仍有摩擦。** 集成终端光标跳动，以及 Android 群聊阅读长回复时滚动回弹，都直接妨碍日常使用。  
  [#157373](https://github.com/NousResearch/hermes-agent/issues/157373) · [#157446](https://github.com/NousResearch/hermes-agent/issues/157446)

当前样本以故障反馈为主，**没有足够证据归纳用户满意点或计算满意度**。

## 8. 待处理积压

**无法确认长期未响应项**：展示的 Issue 和 PR 均于 11 月 18 日创建，没有更早历史、维护者回复身份或等待时长，不能将零评论解释为“长期无人处理”。以下更适合作为下一轮分诊队列：

| 建议优先级 | 待关注项 | 维护建议 |
|---|---|---|
| 高 | [本地会话持续 503 #157440](https://github.com/NousResearch/hermes-agent/issues/157440) | 先确认影响范围，提供安全的诊断与恢复流程，避免用户误删状态库 |
| 高 | [回合结算异常 #157439](https://github.com/NousResearch/hermes-agent/issues/157439) | 验证页脚配置触发条件，并覆盖结算/发布回归测试 |
| 高 | [Gateway 停机挂起 #157413](https://github.com/NousResearch/hermes-agent/issues/157413) | 核查 watchdog 启动时机及停机各阶段超时边界 |
| 高 | [ACP 回复路由 #157364](https://github.com/NousResearch/hermes-agent/issues/157364) | 明确异步完成事件的路由归属与等待策略，推进 `needs-decision` 决策 |
| 中高 | [记忆插件修复 PR #157478](https://github.com/NousResearch/hermes-agent/pull/157478) | 验证 OpenViking、Honcho 的加载与错误提示，再决定合并和发布 |
| 中高 | [Windows 身份修复 PR #157479](https://github.com/NousResearch/hermes-agent/pull/157479) | 覆盖 PATH 顺序差异、异常关机场景及不同安装渠道 |

### 项目健康度结论

**贡献供给活跃，但交付闭环与运行可靠性仍是当前重点。** 最积极的信号是插件兼容和 Windows 启动故障已迅速出现对应修复；主要风险则集中在会话生命周期、消息路由和 Gateway 运维边界。下一观察窗口应重点追踪：上述修复是否合并并进入可验证版本，以及会话不可达、结算失败、停机卡死等问题是否获得明确诊断和回归测试。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报｜2026-11-19

> 统计范围：所提供的过去 24 小时 GitHub 更新，条目更新时间均为 2026-11-18。项目入口标注为 `qwibitai/nanoclaw`，但条目链接均指向 `nanocoai/nanoclaw`；下文按条目提供的仓库生成链接，不推断仓库迁移关系。

## 1. 今日速览

过去 24 小时，NanoClaw 有 **1 条 Issue、5 条 PR 更新**，其中 4 条 PR 待合并、1 条已关闭，无新版本发布，整体呈现**小规模、以稳定性维护为主的活跃状态**。最明确的用户问题是默认 Slack + Codex 安装生成的指令文档超过 32 KiB 上限，导致 `ncl` 和 canvas 指令丢失，已有配套修复 PR。[Issue #4464](https://github.com/nanocoai/nanoclaw/issues/4464) · [PR #4465](https://github.com/nanocoai/nanoclaw/pull/4465)  
维护工作还覆盖 Claude CLI 多轮输入的回复路由、无 Bun 主机上的更新校验，以及代理镜像刷新。[PR #4462](https://github.com/nanocoai/nanoclaw/pull/4462) · [PR #4461](https://github.com/nanocoai/nanoclaw/pull/4461) · [PR #4463](https://github.com/nanocoai/nanoclaw/pull/4463)  
从健康度看，维护者对具体缺陷有及时响应，但目前数据**不能确认任何 PR 已合并**，因此不宜将待审修复视为已交付能力。

## 2. 项目进展

### 已关闭：补齐无 Bun 主机的更新类型检查

[PR #4461 — fix(update): typecheck agent-runner with the pinned Bun when the host has none](https://github.com/nanocoai/nanoclaw/pull/4461)

- **问题背景**：此前 `/update-nanoclaw` 仅在宿主机存在 `bun` 时检查 agent-runner 类型；否则提示延后到镜像构建，但摘要指出镜像构建实际未执行该检查。
- **拟推进内容**：在宿主机没有 Bun 时，使用固定版本的 Bun 对发生变更的 agent-runner 源码进行类型检查，补齐更新流程的验证盲区。
- **状态边界**：数据仅标记为 **CLOSED**，未提供合并标记或关闭原因，不能确认修复已进入主分支。

**整体推进评估**：当天工作集中在指令完整性、对话调度和更新验证，属于可靠性补强，而非功能扩张。明确可见的是修复方案在推进，实际落地幅度仍需通过 PR 合并状态确认。

## 3. 社区热点

当前样本讨论量较低，尚无高热度议题。唯一 Issue 有 **1 条评论、0 个 👍**；PR 评论数为 `undefined`，应视为缺失数据，而非零评论。

| 议题 | 可见热度与状态 | 背后的诉求 |
|---|---|---|
| [#4464：Slack + Codex 指令丢失](https://github.com/nanocoai/nanoclaw/issues/4464) | 1 条评论、0 个 👍，开放中；已有 [#4465](https://github.com/nanocoai/nanoclaw/pull/4465) | 默认安装组合应保留完整工具与能力说明，避免代理启动后缺少关键操作指令。 |
| [#4462：排队输入的回复路由滞后](https://github.com/nanocoai/nanoclaw/pull/4462) | PR 开放中，评论数未知 | 用户连续追加消息时，系统需要正确识别哪些输入已被模型回答，维持后续回复路由的一致性。 |
| [#4460：README 定位调整](https://github.com/nanocoai/nanoclaw/pull/4460) | PR 开放中，评论数未知 | 文档拟突出“你拥有的常驻智能体”，同时修正提供商中立性及描述准确性；这是维护方向信号，不等于已形成社区共识。 |

## 4. Bug 与稳定性

以下严重程度为依据摘要作出的分析判断，并非官方分级。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **较高：核心指令完整性** | [Issue #4464](https://github.com/nanocoai/nanoclaw/issues/4464)：Linux、`v2026.11.0-rc.1 (280cae014)` 的默认 Slack + Codex 安装生成 **39,393 字节**的 `AGENTS.md`，超过 32 KiB 上限，导致 `ncl`、canvas 指令丢失。报告称每次容器启动均记录错误，已出现 9 次。 | 已有开放中的 [PR #4465](https://github.com/nanocoai/nanoclaw/pull/4465)，拟将 Codex 的文档上限提高至 **64 KiB**。尚未确认合并。 |
| **中高：对话回复路由一致性** | [PR #4462](https://github.com/nanocoai/nanoclaw/pull/4462)：Claude CLI 可能在一个 turn 中回答多个排队输入，但运行器仍按每个 `result` 推进一个 turn，造成回复路由落后。摘要未说明影响范围或是否属于回归。 | 修复 PR 开放中，拟移除已在其他 turn 中得到回答的排队 turn。 |
| **中：更新验证缺口** | [PR #4461](https://github.com/nanocoai/nanoclaw/pull/4461)：无 Bun 的宿主机可能跳过 agent-runner 类型检查，降低更新前发现类型错误的能力；并非已确认的运行时崩溃。 | PR 已关闭，是否合并未知。 |

此外，[PR #4463](https://github.com/nanocoai/nanoclaw/pull/4463) 拟将 `v2026.10.0` 对应的 hardened image 更新为 `v2026.10.0-20261118T0147`，并替换镜像摘要。该项属于维护性刷新，**不能仅凭摘要推断其修复了具体漏洞**。

## 5. 功能请求与路线图信号

本批数据没有独立的新功能请求，主要信号来自现有修复与文档 PR：

- **Codex 默认安装兼容性优先**：[#4465](https://github.com/nanocoai/nanoclaw/pull/4465) 直接对应已报告问题，修复目标明确，是近期版本值得关注的候选项；但不能据此承诺纳入下一版本。
- **多轮对话调度继续完善**：[#4462](https://github.com/nanocoai/nanoclaw/pull/4462) 表明项目正在处理提供商实际输出行为与内部 turn 队列之间的不一致，重点是连续交互可靠性。
- **强化“常驻、用户拥有、提供商中立”的产品表达**：[#4460](https://github.com/nanocoai/nanoclaw/pull/4460) 拟调整 README 定位并修正事实表述。这是文档与产品叙事调整，不应解读为新增托管服务或新增提供商支持。
- **镜像维护持续推进**：[#4463](https://github.com/nanocoai/nanoclaw/pull/4463) 显示已有版本的镜像仍在刷新，但它不是新的 Release。

## 6. 用户反馈摘要

**数据限制：未提供 Issue 评论正文，无法从那 1 条评论中提炼观点。**以下仅依据 [Issue #4464 的报告摘要](https://github.com/nanocoai/nanoclaw/issues/4464)：

- **真实场景**：用户在 Linux 上使用默认 Slack 安装与 Codex provider，而非复杂定制配置。
- **明确痛点**：每次容器启动都会出现错误，且代理缺失 `ncl`、canvas 相关指令，影响预期能力的完整性。
- **维护价值**：报告提供了版本、提交、文档字节数及重复出现次数，有利于复现和验证修复。
- **满意度边界**：没有可用的正面反馈、修复验证结果或评论正文，不能判断用户是否接受方案，也不能推断整体满意度。

## 7. 待处理积压

当前条目均创建于 2026-11-18，**没有足够证据识别长期未响应积压**。以下是近期应跟进的待办，而非长期积压：

| 待办 | 建议关注点 |
|---|---|
| [Issue #4464](https://github.com/nanocoai/nanoclaw/issues/4464) / [PR #4465](https://github.com/nanocoai/nanoclaw/pull/4465) | 验证提升至 64 KiB 后，默认 Slack + Codex 配置能完整加载指令，并确认重复启动报错消失。 |
| [PR #4462](https://github.com/nanocoai/nanoclaw/pull/4462) | 重点验证连续追加输入、单次回答覆盖多个输入时，队列不会残留或误删 turn。 |
| [PR #4461](https://github.com/nanocoai/nanoclaw/pull/4461) | 核实关闭原因与合并状态，避免更新校验缺口被误认为已解决。 |
| [PR #4463](https://github.com/nanocoai/nanoclaw/pull/4463) | 确认新镜像摘要及兼容性验证结果。 |
| [PR #4460](https://github.com/nanocoai/nanoclaw/pull/4460) | 审核定位与准确性调整，确保文档承诺与代码能力一致。 |

**总体判断**：今日项目体现出针对真实安装与对话场景的维护响应能力；主要风险不是缺乏修复方案，而是关键方案仍待合并或交付确认。后续应优先跟踪 Codex 指令完整性与回复路由修复的验证结果。

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
**日期：2026-11-19**  
**项目：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)**

> 统计口径：依据所提供的过去 24 小时数据；两条 PR 的创建、更新时间均标注为 2026-11-18。数据仅标记为 `CLOSED`，**无法据此确认是否已合并**。

## 1. 今日速览

过去 24 小时，LobsterAI 有 **2 条 PR 更新、0 条 Issue 更新、0 个新版本发布**，整体呈现低频、集中于修复的维护节奏。两条已关闭 PR 均由同一贡献者提交，围绕 Cowork 执行模式与沙箱策略，以及 OpenClaw 技能目录和文件交付行为展开。改动重点是提高配置一致性、执行策略可预期性和交付物可靠性，而非扩展新功能。其中一条 PR 报告 **191 项定向测试通过**，但实际模型参与的 Word 验收用例被跳过，端到端效果仍需进一步验证。当前样本未显示新增问题集中出现，但也不足以判断整体缺陷趋势或社区满意度。

## 2. 项目进展

### Cowork：修复执行模式读取，尊重显式沙箱策略
**[PR #3114](https://github.com/netease-youdao/LobsterAI/pull/3114)** · 作者：fisherdaddy · 状态：已关闭，合并情况未确认

- **已知问题**：Cowork 将 `executionMode` 保存到 SQLite 后，读取时却始终返回 `local`，使保存配置与实际读取结果不一致。
- **修复方向**：恢复读取已保存的执行模式，并处理旧有 `auto`、`sandbox` 值重新生效后的策略兼容问题；标题同时表明显式沙箱策略应得到遵守。
- **关联工作**：摘要说明该 PR 保留原作者信息，并挑选了 [PR #3090](https://github.com/netease-youdao/LobsterAI/pull/3090) 的存储修复，关联 [Issue #735](https://github.com/netease-youdao/LobsterAI/issues/735)。
- **推进价值**：提高配置持久化可靠性，也让企业部署中的执行环境选择更可预期。由于摘要截断，具体策略优先级和兼容边界仍需查看完整实现。

### OpenClaw 与 Cowork：精简技能目录，规范交付文件路径
**[PR #3113](https://github.com/netease-youdao/LobsterAI/pull/3113)** · 作者：fisherdaddy · 状态：已关闭，合并情况未确认

- 在 LobsterAI 使用的 **OpenClaw v2026.8.1** 中合并技能目录的公共路径，同时保留精确定位、技能顺序及现有预算限制。
- 上下文报告与 Code Mode 使用同一份目录；持久化继续使用原生快照。
- 更新 Cowork 托管工作区提示，要求按用户指定的文件名和位置保存交付物，并验证最终链接指向本次创建或更新的文件。
- 加入 Word 文件名、保存位置、文档标题的验收样例与校验测试。
- **验证结果**：报告 191 项定向 Vitest 通过；依赖实际模型输出目录的 Word 验收用例本次跳过。

**整体进展判断**：本次是执行配置、上下文组织与文件交付链路的定点加固，价值主要体现在可靠性和一致性。尚不能确认相关修复已进入主分支或正式版本。

## 3. 社区热点

今日没有 Issue 更新，且两条 PR 的评论数均为 `undefined`、👍 均为 0，**无法识别“讨论最活跃”或“评论最多”的议题**。以下仅为改动关注点，不代表社区热度排名：

| 关注点 | 背后的诉求 |
|---|---|
| [#3114：执行模式与沙箱策略](https://github.com/netease-youdao/LobsterAI/pull/3114) | 已保存配置应被正确恢复，明确指定的执行策略不应被默认行为覆盖。 |
| [#3113：技能目录与交付路径](https://github.com/netease-youdao/LobsterAI/pull/3113) | Agent 不仅要生成内容，还应按指定位置交付，并提供准确、可用的文件链接。 |

## 4. Bug 与稳定性

今日**没有新报告的 Bug Issue**。以下按潜在影响排序，为 PR 暴露的问题与修复方向；严重程度并非维护者正式评级。

| 优先级 | 问题与影响 | Fix PR 状态 |
|---|---|---|
| 较高关注 | 执行模式读取固定为 `local`，与持久化配置不一致；涉及执行环境及沙箱策略，应重点检查升级兼容性。现有信息不足以认定存在安全漏洞。 | [#3114](https://github.com/netease-youdao/LobsterAI/pull/3114)，已关闭，合并未确认 |
| 中等关注 | 交付物文件名、位置或最终链接可能不符合用户要求，影响文档任务的可用性。 | [#3113](https://github.com/netease-youdao/LobsterAI/pull/3113)，已关闭，合并未确认 |

**验证缺口**：[#3113](https://github.com/netease-youdao/LobsterAI/pull/3113) 的单元测试结果积极，但不能替代实际模型参与的 Word 端到端验收；不宜据此认定文件交付问题已全面解决。

## 5. 功能请求与路线图信号

今日无新增功能请求，以下仅为现有 PR 体现的方向，**不代表下一版本承诺**：

- **执行策略治理**：持续完善本地、自动、沙箱模式之间的配置恢复和策略一致性，偏向企业使用可靠性。[PR #3114](https://github.com/netease-youdao/LobsterAI/pull/3114)
- **面向交付的 Agent 工作流**：将文件名、保存位置、文档标题和最终链接纳入可验证要求，强化文档生成任务的完成标准。[PR #3113](https://github.com/netease-youdao/LobsterAI/pull/3113)
- **上下文组织优化**：通过技能目录公共路径合并及共享目录来源，改善上下文组织一致性；暂无可量化的性能或 token 节省数据。[PR #3113](https://github.com/netease-youdao/LobsterAI/pull/3113)

若这些修复已合并，具备进入后续版本的可能，但当前数据无法确认发布计划。

## 6. 用户反馈摘要

**本次没有可供分析的 Issue 评论，无法提炼真实用户原话、满意度或反馈频率。**

从 PR 修复目标中，可识别两类使用需求，但不能将其表述为已验证的社区共识：

- **配置可预期**：用户设置执行模式后，后续读取和运行应保持一致，尤其是受沙箱策略约束的部署。[PR #3114](https://github.com/netease-youdao/LobsterAI/pull/3114)
- **交付可定位**：Word 等文档任务需要按指定名称、目录和标题完成，最终链接应指向正确文件。[PR #3113](https://github.com/netease-youdao/LobsterAI/pull/3113)

## 7. 待处理积压

当前数据不包含全量开放事项、等待时长或维护者响应记录，**无法确认长期未响应的重要积压**。建议优先核查：

1. **关联问题是否闭环**：检查 [Issue #735](https://github.com/netease-youdao/LobsterAI/issues/735) 与 [PR #3090](https://github.com/netease-youdao/LobsterAI/pull/3090)、[#3114](https://github.com/netease-youdao/LobsterAI/pull/3114) 的关系，确认修复是否实际落地。
2. **关闭原因与替代实现**：核实 [#3113](https://github.com/netease-youdao/LobsterAI/pull/3113)、[#3114](https://github.com/netease-youdao/LobsterAI/pull/3114) 是合并关闭、被替代，还是未采纳关闭，避免将关闭数量误计为交付量。
3. **补齐端到端验证**：跟进 [#3113](https://github.com/netease-youdao/LobsterAI/pull/3113) 跳过的 Word 验收，覆盖真实模型输出后的文件位置与链接正确性。

**健康度结论**：今日呈现“小规模、修复导向”的维护特征，且有明确测试投入；主要信息缺口是合并状态、实际模型验收和用户侧验证，暂不宜对整体质量趋势作更强判断。

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
**日期：2026-11-19｜统计范围：所提供的过去 24 小时 GitHub 更新**

> **数据说明：**项目名称按 CoPaw 展示；本批条目及发布链接均指向 `agentscope-ai/QwenPaw`，下文沿用原始链接。数据中的更新时间均为 2026-11-18；Release 说明存在截断，且未提供评论正文、PR 合并标记与历史响应记录，因此不将“已关闭”视为“已修复/已合并”，也不推断长期积压。

## 1. 今日速览

过去 24 小时共记录 **7 条 Issue 更新、4 条 PR 更新及 1 个版本发布**，项目保持持续活跃，但讨论规模较小，尚不足以判断长期活跃度趋势。新版本 [v2.3.0.post1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0.post1) 延续插件化与 Console 交互改进方向，同时出现渠道可用性、启动日志噪声和窄屏显示方面的升级反馈。当前最值得优先关注的是 [Shell 外发操作审批缺口](https://github.com/agentscope-ai/QwenPaw/pull/8810)、[Agent 异常继续执行](https://github.com/agentscope-ai/QwenPaw/issues/8806)及[连续 MCP 调用导致上下文超限](https://github.com/agentscope-ai/QwenPaw/issues/8802)。整体健康度表现为：**交付节奏持续、架构方向清晰，但升级体验与执行安全仍需重点验证。**

## 2. 版本发布

### [v2.3.0.post1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0.post1)

可见发布说明包含：

| 更新 | 内容与价值 |
|---|---|
| 第三方 Agent 插件化 | 将第三方 Agent 从核心中抽离为插件，推进核心轻量化和扩展解耦。关联 [PR #8426](https://github.com/agentscope-ai/QwenPaw/pull/8426)。 |
| Console 选中文本引用 | 支持将回复中的选中内容引用到后续提问草稿，改善针对局部内容追问的体验。关联 [PR #8609](https://github.com/agentscope-ai/QwenPaw/pull/8609)。 |
| Safari 相关修复 | 发布说明仅显示“fix(console): restore Safari”，具体修复范围无法确认。见[发布页](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.3.0.post1)。 |

**破坏性变更与迁移注意事项：**

- **未见明确的 breaking change 声明，但不能据此认定升级完全无影响。**用户报告升级后钉钉、飞书 Channel 默认不可用，需手动更新后恢复，同时出现大量 `startup_diagnostic` WARNING 日志。生产环境升级前应验证渠道组件及其更新流程。见 [Issue #8812](https://github.com/agentscope-ai/QwenPaw/issues/8812)。
- Console 用户应检查窄屏消息、宽表格和代码块的展示与横向滚动；已有用户报告从 2.3.0 升级后发生裁切。见 [Issue #8811](https://github.com/agentscope-ai/QwenPaw/issues/8811)。
- 发布安装验证工单仍为 OPEN，现有数据不能确认平台验证是否全部通过。见 [Issue #8807](https://github.com/agentscope-ai/QwenPaw/issues/8807)。

## 3. 项目进展

### 已关闭条目：版本号推进，但合并状态不明

[PR #8809：版本号调整为 2.3.1b1](https://github.com/agentscope-ai/QwenPaw/pull/8809) 已关闭。这是进入下一开发版本的信号，但**数据未说明是否合并**，不能据此认定版本变更已进入主分支，更不能视为 2.3.1 已发布。

### 在途的重要改进

| PR | 状态 | 推进方向 |
|---|---|---|
| [#8810：Shell 外发操作审批](https://github.com/agentscope-ai/QwenPaw/pull/8810) | OPEN | 为邮件发送、HTTP 写请求及本地文件上传补充检测规则，收紧 AUTO/SMART 模式下的执行边界。 |
| [#8804：延迟加载 Anthropic/Gemini SDK](https://github.com/agentscope-ai/QwenPaw/pull/8804) | OPEN | 避免仅使用 OpenAI 兼容接口时仍提前加载其他 SDK，旨在减少启动阶段开销；尚无量化收益数据。 |
| [#8803：技能池卡片与内置技能状态](https://github.com/agentscope-ai/QwenPaw/pull/8803) | OPEN | 修正旧内置技能被误判为“过时”、通知红点持续存在的问题，并调整卡片信息与操作布局。 |

**进展判断：**本轮有实际版本交付，但这 4 条 PR 中没有可确认已合并的功能修复；安全、启动性能和技能管理改进仍处于待合入阶段。

## 4. 社区热点

按已提供的评论数与反应数排序：

1. **[Issue #8806：出现未发送的 user 消息，驱动 Agent 继续执行](https://github.com/agentscope-ai/QwenPaw/issues/8806)**  
   **3 条评论，已关闭**，为本批讨论最多的条目。用户描述 Agent 回答后仍持续开启新一轮工具调用，核心诉求是执行过程可控、会话来源可追踪；关闭原因及是否解决未知。

2. **[Issue #8808：更轻量、更易扩展的架构方向](https://github.com/agentscope-ai/QwenPaw/issues/8808)**  
   **1 条评论、1 个 👍**，是本批唯一获得点赞的 Issue。它更接近项目方向公告，传递出将非核心模块逐步插件化的信号；当前互动量尚不足以代表广泛社区共识。

3. **[Issue #8812：升级后的日志噪声与渠道不可用](https://github.com/agentscope-ai/QwenPaw/issues/8812)**  
   **1 条评论**。背后诉求是升级应保持可用、诊断信息应区分真正故障与常规提示，避免用户将 WARNING 误判为系统异常。

> PR 评论数均为 `undefined`，无法据此参与热度排名。

## 5. Bug 与稳定性

以下按潜在影响排序，属于日报分析优先级，并非官方严重性评级。

| 优先级 | 问题与影响 | 状态及 fix PR |
|---|---|---|
| **高：安全审批边界** | Shell 命令发送邮件、执行 HTTP 写请求或上传文件，可能在 AUTO/SMART 模式下绕过审批。 | 已有 **OPEN 修复 [PR #8810](https://github.com/agentscope-ai/QwenPaw/pull/8810)**；尚不能视为已修复。 |
| **高：异常自主继续执行** | Agent 回复后继续调用工具，且上下文出现用户声称未发送的消息；可能影响任务终止与操作可控性。 | [Issue #8806](https://github.com/agentscope-ai/QwenPaw/issues/8806) 已关闭；未提供 fix PR 或关闭原因。 |
| **高：MCP 上下文超限** | 同一轮连续返回大量工具结果后触发 `MODEL_CONTEXT_LENGTH_EXCEEDED`，任务中断。 | [Issue #8802](https://github.com/agentscope-ai/QwenPaw/issues/8802) OPEN；未见对应 fix PR。报错环境确切版本未确认，且未在原版上游发行包验证。 |
| **高：升级后渠道不可用** | 用户报告钉钉、飞书默认不可用，手动更新后才恢复。 | [Issue #8812](https://github.com/agentscope-ai/QwenPaw/issues/8812) OPEN；未见对应 fix PR，影响范围待确认。 |
| **中高：容器内存占用** | 基础镜像缺少 `MALLOC_ARENA_MAX` 限制；报告环境主应用 RSS 达 2.67 GB，其中约 1.78 GB 关联 glibc arenas。 | [Issue #8805](https://github.com/agentscope-ai/QwenPaw/issues/8805) OPEN；既有 [PR #8654](https://github.com/agentscope-ai/QwenPaw/pull/8654) 被报告仅覆盖 Creator 入口，未覆盖基础镜像。 |
| **中：Console 显示回归** | 窄屏整条消息、宽表格及代码块被裁切，且不能横向滚动。 | [Issue #8811](https://github.com/agentscope-ai/QwenPaw/issues/8811) OPEN；未见对应 fix PR。 |
| **低：启动日志与技能状态噪声** | WARNING 刷屏、技能误报过时及持续红点，降低诊断与状态提示可信度。 | 日志问题见 [#8812](https://github.com/agentscope-ai/QwenPaw/issues/8812)，暂无可见修复；技能问题已有 OPEN [PR #8803](https://github.com/agentscope-ai/QwenPaw/pull/8803)。 |

## 6. 功能请求与路线图信号

- **核心轻量化、非核心功能插件化：方向最明确。**[Issue #8808](https://github.com/agentscope-ai/QwenPaw/issues/8808) 明确表达持续推进意图，发布说明中的 [PR #8426](https://github.com/agentscope-ai/QwenPaw/pull/8426) 已体现第一步落地；这属于中长期架构方向，而非单一版本功能。
- **启动路径按需加载：已有具体实现候选。**[PR #8804](https://github.com/agentscope-ai/QwenPaw/pull/8804) 与轻量化方向一致，可能成为后续版本优化内容，但尚无合入或排期承诺。
- **技能管理可理解性：已有修复与界面优化。**[PR #8803](https://github.com/agentscope-ai/QwenPaw/pull/8803) 聚焦更新状态准确性和操作布局，适合后续维护版本纳入。
- **更细粒度的执行治理：有明确安全需求。**[PR #8810](https://github.com/agentscope-ai/QwenPaw/pull/8810) 将检测覆盖到 Shell 包装的外发行为；相比纯功能扩展，更值得优先评审与回归验证。

## 7. 用户反馈摘要

**未提供评论正文，以下仅从 Issue 描述提炼，不代表完整讨论结论。**

- **自动化任务需要明确停止。**用户希望 Agent 完成回答后结束当前任务，而非继续启动不明来源的操作；其自行排查仍未定位原因，说明执行链路可观测性也是痛点。见 [#8806](https://github.com/agentscope-ai/QwenPaw/issues/8806)。
- **升级不应增加恢复成本。**钉钉、飞书使用者反馈升级后需额外手动更新才能恢复渠道，体现对渠道连续可用性的依赖。见 [#8812](https://github.com/agentscope-ai/QwenPaw/issues/8812)。
- **工具调用成功不等于任务成功。**MCP 场景中多次调用显示成功，最终却因上下文超限中断，暴露出长链工具任务对上下文预算管理的需求。见 [#8802](https://github.com/agentscope-ai/QwenPaw/issues/8802)。
- **真实使用覆盖移动端与高并发部署。**375px 手机视口的阅读问题，以及 56 核主机上的内存问题，表明稳定性验证需要同时覆盖小屏交互与高线程环境。见 [#8811](https://github.com/agentscope-ai/QwenPaw/issues/8811)、[#8805](https://github.com/agentscope-ai/QwenPaw/issues/8805)。

本批反馈主要集中于故障与改进，**没有足够直接证据总结用户满意点**。

## 8. 待处理积压

**无法识别“长期未响应”条目：**所有给出的条目均创建于 2026-11-18，缺少历史等待时间和维护者响应记录。建议维护者优先跟踪以下待办：

| 待办 | 建议下一步 |
|---|---|
| [安全修复 PR #8810](https://github.com/agentscope-ai/QwenPaw/pull/8810) | 优先评审，并验证 AUTO/SMART 模式下外发审批覆盖与误报情况。 |
| [渠道升级问题 #8812](https://github.com/agentscope-ai/QwenPaw/issues/8812)、[安装验证 #8807](https://github.com/agentscope-ai/QwenPaw/issues/8807) | 明确受影响渠道与平台，补充升级步骤及验证结论。 |
| [基础镜像内存问题 #8805](https://github.com/agentscope-ai/QwenPaw/issues/8805) | 核对 Creator 与基础镜像入口配置差异，并验证修复效果。 |
| [上下文超限 #8802](https://github.com/agentscope-ai/QwenPaw/issues/8802) | 先确认报错版本及上游复现，再定位工具结果累计与上下文管理行为。 |
| [已关闭的异常执行 #8806](https://github.com/agentscope-ai/QwenPaw/issues/8806) | 补充关闭原因、解决方式或关联修复，避免高影响问题缺少可追溯结论。 |

**维护建议：下一轮应优先验证安全审批、升级后渠道可用性及 Agent 执行终止行为，再推进启动性能与技能界面优化。**

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-19**  
**项目：[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)**

> 统计口径：基于提供的过去 24 小时数据；所列条目的创建、更新时间均为 2026-11-18。23 条更新 PR 中仅提供了 20 条详情，以下分析不覆盖其余 3 条。PR 评论数字段为 `undefined`，不能据此判断讨论热度。

## 1. 今日速览

过去 24 小时，项目有 **2 条 Issue、23 条 PR 更新**，提交侧活跃度较高，工作主要集中在安全加固、运行时一致性和认证可靠性。统计窗口内 **没有 PR 合并或关闭，也没有新版本发布**，因此今天体现的是修复方案储备，而不是已交付能力的增长。最值得关注的是 npm 审计报告的 **5 项高危/严重发现**、SMTP 依赖安全更新，以及凭据脱敏和 Matrix 审批提示的安全边界修复。整体呈现“**修复投入积极、交付效果待验证**”的状态，尚不能仅凭一天数据判断审核是否形成瓶颈。  
相关：[npm 审计 #12548](https://github.com/zeroclaw-labs/zeroclaw/issues/12548) · [SMTP 修复 #12552](https://github.com/zeroclaw-labs/zeroclaw/pull/12552)

## 2. 项目进展

### 已落地进展：本窗口无合并或关闭 PR

没有可确认已经进入主分支的新增功能或修复。以下均为 **OPEN、待审核合并**，不应视为当前稳定版本已具备的能力。

| 方向 | 待合并进展 | 对项目的潜在价值 |
|---|---|---|
| 安全边界 | [Matrix 审批参数惰性文本显示 #12554](https://github.com/zeroclaw-labs/zeroclaw/pull/12554)、[凭据脱敏补强 #12553](https://github.com/zeroclaw-labs/zeroclaw/pull/12553) | 降低模型生成内容被再次解释、敏感信息进入模型或日志的风险 |
| 运行时与隔离 | [Docker 嵌套编码 CLI 保留工作区根目录 #12547](https://github.com/zeroclaw-labs/zeroclaw/pull/12547)、[Agent 路由通过 provider source 解析 #12545](https://github.com/zeroclaw-labs/zeroclaw/pull/12545) | 修正目录映射及模型路由语义；两项均带有 `risk:high` 标签，需重点回归 |
| 调度与工作流 | [禁止修改声明拥有的 cron 字段 #12544](https://github.com/zeroclaw-labs/zeroclaw/pull/12544)、[SOP 取消竞争时保留完成结果 #12543](https://github.com/zeroclaw-labs/zeroclaw/pull/12543) | 提升配置一致性及并发执行状态的可靠性 |
| 提供商可靠性 | [非流式聊天遵守 Retry-After #12542](https://github.com/zeroclaw-labs/zeroclaw/pull/12542) | 在 429/503 场景下优先采用服务端重试时间，改善限流恢复行为 |
| 认证与界面 | [跨标签页登录通知 #12535](https://github.com/zeroclaw-labs/zeroclaw/pull/12535)、[丢弃跨越登出的会话检查结果 #12533](https://github.com/zeroclaw-labs/zeroclaw/pull/12533) | 减少多标签页认证状态不同步和异步响应覆盖登出状态的问题 |

**进展判断：**修复覆盖面较广，但实际推进幅度仍取决于后续审核、测试和合并结果。

## 3. 社区热点

**目前无法生成可信的“讨论最热”榜单。** 两条 Issue 均为 0 评论、0 👍；PR 评论数缺失，已展示条目的 👍 均为 0。以下是按风险与关联工作选出的关注主题，而非互动量排名。

- **安全更新与依赖约束如何兼容。** [Issue #12551](https://github.com/zeroclaw-labs/zeroclaw/issues/12551) 与 [PR #12552](https://github.com/zeroclaw-labs/zeroclaw/pull/12552) 配套：SMTP 安全升级引入 `base64 0.23.1`，但 HTTP/IMAP 等消费者仍使用 `0.22.1`。诉求是优先完成安全修补，同时对重复依赖设置明确、有限的例外。
- **前端供应链风险需要闭环。** 自动化 [Issue #12548](https://github.com/zeroclaw-labs/zeroclaw/issues/12548) 报告 npm audit 失败及 5 项高危/严重发现。它体现的是 CI 安全信号，当前摘要不足以判断各漏洞是否可在部署环境中利用。
- **Agent 输入输出边界持续收紧。** [PR #12554](https://github.com/zeroclaw-labs/zeroclaw/pull/12554) 与 [PR #12553](https://github.com/zeroclaw-labs/zeroclaw/pull/12553) 分别关注审批展示和凭据过滤，反映维护工作正在补齐不可信内容经过模型后仍需隔离的边界。

## 4. Bug 与稳定性

以下为**建议处理优先级**，并非统一的官方漏洞评级；所有列出的 fix PR 均尚未合并。

| 优先级 | 问题及影响 | 修复状态 |
|---|---|---|
| 高：审计明确告警 | npm audit 报告 5 项高危/严重发现，具体可利用性未知 | [Issue #12548](https://github.com/zeroclaw-labs/zeroclaw/issues/12548)；已提供条目中未见明确对应 fix PR |
| 高：安全依赖 | SMTP 依赖需升级以处理 RUSTSEC-2026-0558 至 0565 | 已有 [fix #12552](https://github.com/zeroclaw-labs/zeroclaw/pull/12552)，升级 `lettre` 至 0.11.24、`email-encoding` 至 0.4.3 |
| 高：凭据泄露风险 | 原脱敏规则未完整覆盖 Bearer/Basic 头、URL 密码及凭据查询参数，可能使敏感信息进入模型和日志 | 已有 [fix #12553](https://github.com/zeroclaw-labs/zeroclaw/pull/12553) |
| 高：审批内容解释边界 | Matrix 审批参数进入会扫描附件标记、渲染 Markdown 的发送路径 | 已有 [fix #12554](https://github.com/zeroclaw-labs/zeroclaw/pull/12554)，拟改为惰性文本 |
| 中：执行状态一致性 | SOP 步骤已完成，但取消操作抢先写入时可能无法保留结果 | 已有 [fix #12543](https://github.com/zeroclaw-labs/zeroclaw/pull/12543)，另有 [并发回归测试 #12539](https://github.com/zeroclaw-labs/zeroclaw/pull/12539) |
| 中：配置一致性 | 声明式 cron 字段可被数据库更新，但启动后又以声明为准，造成更新成功的误导 | 已有 [fix #12544](https://github.com/zeroclaw-labs/zeroclaw/pull/12544) |
| 中：认证状态竞争 | 登出前发出的会话检查可能在登出后应用结果 | 已有 [fix #12533](https://github.com/zeroclaw-labs/zeroclaw/pull/12533) |

数据中未提供明确的崩溃报告，也未提供上述问题在真实部署中的发生频率。

## 5. 功能请求与路线图信号

今天两条 Issue 均偏向安全与依赖维护，**没有明确的新功能请求**。待合并 PR 传递出的方向更接近稳定性完善：

- **更可靠的模型服务调用：**[Retry-After 支持 #12542](https://github.com/zeroclaw-labs/zeroclaw/pull/12542) 已有具体实现，是近期候选改进；但尚无版本承诺。
- **更清晰的运维恢复体验：**[Codex refresh token 复用恢复提示 #12538](https://github.com/zeroclaw-labs/zeroclaw/pull/12538) 将明确的 reused-token 401 转化为 CLI 恢复指引。
- **运行时边界治理：**[fail-closed 提示词底线门控例外文档 #12550](https://github.com/zeroclaw-labs/zeroclaw/pull/12550) 与 [cron 运行历史读取例外文档 #12549](https://github.com/zeroclaw-labs/zeroclaw/pull/12549) 为既有提案补充架构记录，不能据此认定相关功能已经实现或即将发布。
- **交互性能细节优化：**[ZeroCode 文件卡片解析复用 #12536](https://github.com/zeroclaw-labs/zeroclaw/pull/12536) 减少重复解析，并让显式折叠卡片跳过解码。

## 6. 用户反馈摘要

**没有可直接提炼的用户评论反馈。** 两条 Issue 均无评论，PR 未提供评论正文，因此无法判断真实用户的满意度、投诉频率或受影响规模。

从提交说明只能识别出开发者正在处理的使用场景：

- 多标签页登录、登出后的状态同步：[登录通知 #12535](https://github.com/zeroclaw-labs/zeroclaw/pull/12535)、[登出竞争修复 #12533](https://github.com/zeroclaw-labs/zeroclaw/pull/12533)。
- OAuth 刷新失败后缺少清晰恢复路径：[恢复提示 #12538](https://github.com/zeroclaw-labs/zeroclaw/pull/12538)。
- 缓存 token 缺少可用定价时，成本告警可能不充分：[成本标记修复 #12541](https://github.com/zeroclaw-labs/zeroclaw/pull/12541)。

这些是**修复说明反映的潜在痛点**，不是用户评论证实的反馈。

## 7. 待处理积压

当前列表均为近期条目，且没有完整历史、审核状态和维护者响应记录，**无法认定任何项目长期未响应**。建议优先跟踪以下待办：

1. **为 npm 审计告警建立明确修复关联。** 核实受影响依赖、部署可达性、负责人及对应 PR，推动 [Issue #12548](https://github.com/zeroclaw-labs/zeroclaw/issues/12548) 闭环。
2. **完成 SMTP 安全更新，并持续跟踪依赖例外。** 审核 [PR #12552](https://github.com/zeroclaw-labs/zeroclaw/pull/12552)，通过 [Issue #12551](https://github.com/zeroclaw-labs/zeroclaw/issues/12551) 跟踪 `base64 0.22.1` 有界重复的后续收敛。
3. **优先审查高影响安全及运行时修复。** 重点覆盖 [凭据脱敏 #12553](https://github.com/zeroclaw-labs/zeroclaw/pull/12553)、[Matrix 审批 #12554](https://github.com/zeroclaw-labs/zeroclaw/pull/12554)、[Docker 工作区 #12547](https://github.com/zeroclaw-labs/zeroclaw/pull/12547) 和 [Agent 路由 #12545](https://github.com/zeroclaw-labs/zeroclaw/pull/12545)。

**健康度结论：**安全扫描和修复提交显示出积极的维护投入，但本窗口缺少合并与发布成果。下一步最重要的信号，是高优先级修复能否通过验证并形成可交付版本，而不是 PR 数量继续增长。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*