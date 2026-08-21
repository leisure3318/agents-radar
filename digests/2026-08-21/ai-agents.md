# OpenClaw 生态日报 2026-08-21

> Issues: 22 | PRs: 40 | 覆盖项目: 13 个 | 生成时间: 2026-08-21 01:22 UTC

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

以下是 **OpenClaw** 在 **2026-08-21** 的项目动态日报（基于你提供的 GitHub 数据整理）。

---

## 1. 今日速览

过去 24 小时内，OpenClaw 维持了很高的开发与修复节奏：**22 条 Issue 更新、40 条 PR 更新**，说明项目当前处于明显的高压迭代期。今天没有新版本发布，侧面反映当前工作重心仍集中在 **稳定性修复、回归回补和集成边界问题**，而不是功能型发版。  
从问题分布看，今日新增/活跃议题里 **P0/P1 占比很高**，且大量问题都指向 **session-state、message-delivery、crash-loop、data-loss** 等高风险领域，健康度表现为“**开发活跃，但稳定性债务仍偏重**”。  
同时，PR 侧已有一批关键修复完成关闭，但不少高影响 PR 仍处于 **needs proof / waiting on author / ready for maintainer look**，说明 **验证与审核** 已成为当前节奏中的主要瓶颈。

---

## 2. 版本发布

**今日无新 Releases。**

---

## 3. 项目进展

今日项目推进的主线很清晰：**围绕消息交付、会话恢复、认证/启动、CLI 契约与测试稳定性进行集中修补**。数据中显示 **11 条 PR 已合并/关闭**，已完成的修复覆盖了多个核心面向：

- **消息交付正确性**
  - [PR #126922](https://github.com/openclaw/openclaw/pull/126922) 修复最终频道回复在 preview cleanup 失败后被误报为失败的问题，直接提升 Discord / Slack / Mattermost 的交付可靠性。
  - [PR #126860](https://github.com/openclaw/openclaw/pull/126860) 让 cron 任务的当前会话完成结果真正回写到源聊天，减少“任务跑完但用户看不到结果”的丢失感。

- **认证与 onboarding**
  - [PR #126877](https://github.com/openclaw/openclaw/pull/126877) 修复 `openclaw onboard --secret-input-mode ref` 仍写明文 token 的问题，属于明显的安全边界修正。
  - [PR #126918](https://github.com/openclaw/openclaw/pull/126918) 修复 CLI 汇报 auth profiles 所在数据库错误的问题，减少运维定位偏差。

- **命令行与工具契约**
  - [PR #126915](https://github.com/openclaw/openclaw/pull/126915) 修复 sandbox JSON 失败场景输出为空的问题，使自动化工具链更可预测。
  - [PR #126917](https://github.com/openclaw/openclaw/pull/126917) 和 [PR #126896](https://github.com/openclaw/openclaw/pull/126896) 分别清理插件/原生测试冗余，降低未来维护成本。

- **稳定性/恢复路径**
  - [PR #126846](https://github.com/openclaw/openclaw/pull/126846) 修补 worker workspace scratch cleanup 对已提交结果的覆盖问题。
  - （同类修复的 issue 对应 PR 也在推进中，见下文 bug 部分）

总体看，今天的进展不是“加功能”，而是更像一次 **核心运行链路的质量加固**：把失败误报、状态丢失、启动挂死、认证泄露、测试抖动等问题逐个收口。  
按公开数据估算，今日已完成的 PR 覆盖了 **约四分之一左右的 PR 更新量**，对稳定性面是明确向前推进的一天。

---

## 4. 社区热点

> 注：你提供的 PR 数据里未包含评论数，因此“讨论热度”主要按 **Issue 评论数、问题严重级别、PR 状态（needs proof / waiting on author / ready for maintainer look）** 来综合判断。

### 最活跃的 Issue 讨论

1. **[#126900](https://github.com/openclaw/openclaw/issues/126900)**  
   `maxActiveTranscriptBytes` 在压缩后仍超阈值时会无限触发 compaction，导致 session lane 卡死。  
   - 评论数：4  
   - 热点原因：这是一个 **典型的“卡死型”会话状态 bug**，而且日志里并不明显，属于运维很难自证的高危问题。

2. **[#126821](https://github.com/openclaw/openclaw/issues/126821)**  
   SQLite 在重建后的 pristine DB 上仍会在 15–24 小时内再次出现腐坏。  
   - 评论数：4  
   - 热点原因：这是 **P0 数据完整性问题**，而且带有长期复现特征，说明社区对“数据库底层可靠性”非常敏感。

3. **[#126923](https://github.com/openclaw/openclaw/issues/126923)**  
   Codex conversation binding 在 Gateway 中途重启后丢失，`/new` 无法恢复，手动 `/codex bind` 才能找回。  
   - 评论数：2  
   - 热点原因：直接打击 **恢复能力与会话连续性**，属于 AI 助手类产品最核心的用户体验问题。

4. **[#126920](https://github.com/openclaw/openclaw/issues/126920)**  
   `gateway.mode` 缺失时，validate/doctor 通过，但 gateway 实际启动失败。  
   - 评论数：2  
   - 热点原因：属于典型的 **“校验通过但运行失败”**，用户对配置体验的信任会被削弱。

### PR 侧的“讨论热点”信号

虽然没有评论数，但以下 PR 处在较受关注的审核状态，说明它们可能是近阶段的 review 焦点：

- [PR #126640](https://github.com/openclaw/openclaw/pull/126640) — 给 scheduler-owned agent runs 提供 Gateway request context
- [PR #126865](https://github.com/openclaw/openclaw/pull/126865) — 防止 ACP chat transcript 重复写入
- [PR #126909](https://github.com/openclaw/openclaw/pull/126909) — reconnect reconcile 中恢复终局回复并上报错误
- [PR #126907](https://github.com/openclaw/openclaw/pull/126907) — 为 failed-start cleanup 增加超时边界
- [PR #126910](https://github.com/openclaw/openclaw/pull/126910) — 修复 cua-computer provider 被永久 brick 的问题

**背后诉求很一致：**社区最关心的不是“功能更丰富”，而是 **AI 运行结果不能丢、重启后不能断、失败必须可见、调试必须可定位**。

---

## 5. Bug 与稳定性

按严重程度排序，今日问题集中在以下几类：

### P0 / Release blocker 级别

1. **[#126821](https://github.com/openclaw/openclaw/issues/126821)**  
   SQLite 腐坏在重建后的干净数据库上仍会复发，且 15–24 小时后出现 freelist miscount、甚至“paralyzed gateway”模式。  
   - 风险：**数据损坏 / crash-loop / 长期可靠性**
   - 是否已有 fix PR：**未见明确对应 fix PR**

2. **[#126899](https://github.com/openclaw/openclaw/issues/126899)**  
   `device_bootstrap_tokens` 缺失 `setup_id` 仍会导致 `doctor --fix` 死锁，并阻塞 config migration。  
   - 风险：**启动/修复流程阻塞**
   - 是否已有 fix PR：**未见明确对应 fix PR**
   - 备注：该 issue 今天已关闭，但问题描述显示它对发布链路仍极具警示性。

### P1 级别

3. **[#126900](https://github.com/openclaw/openclaw/issues/126900)**  
   `maxActiveTranscriptBytes` 在压缩后仍高于阈值时无限 compaction，session lane 被 wedge。  
   - 风险：**会话卡死 / 消息排队阻塞**
   - 是否已有 fix PR：**未见**

4. **[#126906](https://github.com/openclaw/openclaw/issues/126906)**  
   `tools.deny` 会静默禁用 memory persistence，agent 还会继续报成功。  
   - 风险：**隐性数据丢失 / 误报成功**
   - 是否已有 fix PR：**未见**

5. **[#126903](https://github.com/openclaw/openclaw/issues/126903)**  
   ACP reconnect reconcile 会吞掉完成回复，并把运行错误伪装成 `end_turn`。  
   - 风险：**消息丢失 / 恢复语义错误**
   - 是否已有 fix PR：**有，对应 [PR #126909](https://github.com/openclaw/openclaw/pull/126909)**

6. **[#126901](https://github.com/openclaw/openclaw/issues/126901)**  
   plugin `start()` 失败后，如果 `stop()` 永不结束，会把 `startPluginServices` 永久挂死。  
   - 风险：**启动/热重载 wedges**
   - 是否已有 fix PR：**有，对应 [PR #126907](https://github.com/openclaw/openclaw/pull/126907)**

7. **[#126916](https://github.com/openclaw/openclaw/issues/126916)**  
   quickstart/onboard 未持久化 provider auth profile store，docker onboard 失败。  
   - 风险：**认证初始化失败**
   - 是否已有 fix PR：**未见**

8. **[#126923](https://github.com/openclaw/openclaw/issues/126923)**  
   Codex turn 中途 Gateway 重启后，conversation binding 丢失，`/new` 无法恢复。  
   - 风险：**session-state 恢复失败**
   - 是否已有 fix PR：**未见**

### P2 级别

9. **[#126920](https://github.com/openclaw/openclaw/issues/126920)**  
   `gateway.mode` 缺失时校验通过但启动失败。  
   - 风险：**配置验证与运行行为不一致**
   - 是否已有 fix PR：**未见**

10. **[#126879](https://github.com/openclaw/openclaw/issues/126879)**  
    重命名后的 trajectory archive 混入 session memory corpus。  
    - 风险：**会话记忆污染**
    - 是否已有 fix PR：**有，对应 [PR #126912](https://github.com/openclaw/openclaw/pull/126912)**

11. **[#126904](https://github.com/openclaw/openclaw/issues/126904)**  
    cua-computer watch teardown 影响进程生命周期 provider。  
    - 风险：**provider 永久不可用**
    - 是否已有 fix PR：**有，对应 [PR #126910](https://github.com/openclaw/openclaw/pull/126910)**

12. **[#126902](https://github.com/openclaw/openclaw/issues/126902)**  
    Nextcloud Talk webhook monitor 每次 stop/start 都泄漏 timer 和 limiter map。  
    - 风险：**资源泄漏 / 长运行退化**
    - 是否已有 fix PR：**有，对应 [PR #126908](https://github.com/openclaw/openclaw/pull/126908)**

13. **[#126847](https://github.com/openclaw/openclaw/issues/126847)**  
    failed tool call 直接终止 visible turn，错误无法回传给模型。  
    - 风险：**工具调用失败不可恢复**
    - 是否已有 fix PR：**未见**

---

## 6. 功能请求与路线图信号

今日的新功能需求里，既有 **用户体验优化**，也有 **架构层面的会话/存储演进**。如果从“更可能进入下一版本”的角度看，信号如下：

### 更可能进入近期版本的需求

1. **[#126532](https://github.com/openclaw/openclaw/issues/126532)**  
   Web 界面增加历史日志查看功能。  
   - 价值：提升排障效率，属于低风险高收益的运维增强。
   - 路线图判断：**很适合近期补进**

2. **[#126888](https://github.com/openclaw/openclaw/issues/126888)**  
   明确 Control UI 里的 permission mode 变更是“next-run only”。  
   - 价值：减少操作误解，改善策略可预期性。
   - 路线图判断：**偏 UX 语义澄清，落地成本低**

3. **[#126892](https://github.com/openclaw/openclaw/issues/126892)**  
   split-pane 新开的面板默认放到底部 dock。  
   - 价值：改善多面板布局可用性。
   - 路线图判断：**中短期 UX 改良项**

4. **[#126919](https://github.com/openclaw/openclaw/issues/126919)**  
   Obsidian 插件一键 auto-setup & connection。  
   - 价值：显著降低上手门槛。
   - 路线图判断：**属于强需求，但会涉及较多自动化链路整合**

### 更偏中长期的产品信号

5. **[#126914](https://github.com/openclaw/openclaw/issues/126914)**  
   durable display-row projection for bounded chat history。  
   - 价值：这是一个更偏底层的数据投影/分页架构演进，目标是让历史展示更稳定、边界更可控。
   - 路线图判断：**更像下一阶段的架构型改造，而非小修小补**

### 生态与文档型信号

6. **[#126889](https://github.com/openclaw/openclaw/issues/126889)**  
   为 Perplexity 增加 Agent API/MCP/CLI 文档，并下线 Sonar 路径。  
   - 路线图判断：**更多是生态适配与文档迁移**，不一定是功能优先级最高，但体现了供应商/接口策略调整。

### 从 PR 反推的下一版候选

更可能进入下一版本的，仍然是这些 **已成形的高优先级修复**：
- [PR #126909](https://github.com/openclaw/openclaw/pull/126909)（ACP reconnect 恢复）
- [PR #126907](https://github.com/openclaw/openclaw/pull/126907)（插件启动失败清理超时）
- [PR #126912](https://github.com/openclaw/openclaw/pull/126912)（trajectory archive 排除）
- [PR #126910](https://github.com/openclaw/openclaw/pull/126910)（cua-computer 可用性修复）
- [PR #126922](https://github.com/openclaw/openclaw/pull/126922)（交付后清理不再误报失败）

这些都直接对应“**稳定性优先**”的路线。

---

## 7. 用户反馈摘要

尽管当前数据未提供完整评论原文，但从 Issue 描述与评论活跃度可以提炼出比较明确的用户痛点：

### 1) 用户最不能接受“成功但其实没成功”
典型包括：
- [#126906](https://github.com/openclaw/openclaw/issues/126906)：禁用工具后，memory persistence 静默失效，agent 仍报告成功。
- [#126903](https://github.com/openclaw/openclaw/issues/126903)：断线重连后回复丢了，但系统却把它当成正常结束。
- [#126913](https://github.com/openclaw/openclaw/issues/126913)（已由 [PR #126922](https://github.com/openclaw/openclaw/pull/126922) 修复）：真实交付成功，却被 preview cleanup 误报失败。

**反馈指向：**用户需要的是“可解释的失败”，而不是“沉默的数据缺失”。

### 2) 重启恢复与会话连续性是核心信任点
典型包括：
- [#126923](https://github.com/openclaw/openclaw/issues/126923)
- [#126879](https://github.com/openclaw/openclaw/issues/126879)
- [#126900](https://github.com/openclaw/openclaw/issues/126900)

**反馈指向：**OpenClaw 的用户场景里，Gateway 重启、通道重连、session 归档都很常见；一旦恢复路径不稳定，用户会直接感知为“助手不可靠”。

### 3) 运营/排障需求很强
典型包括：
- [#126532](https://github.com/openclaw/openclaw/issues/126532)（历史日志）
- [#126920](https://github.com/openclaw/openclaw/issues/126920)（validate/doctor 与实际启动不一致）
- [#126821](https://github.com/openclaw/openclaw/issues/126821)（SQLite 腐坏难排查）

**反馈指向：**社区对“可观测性、可诊断性、工具输出可信度”的诉求非常高。

### 4) 使用场景很广，边界问题暴露很快
今日问题覆盖：
- Slack / Discord / Mattermost
- Nextcloud Talk
- Feishu / Google Chat
- Obsidian 插件
- Codex / ACP / HTTP chat / Web UI
- Docker / WSL2 / Linux / Windows

**反馈指向：**OpenClaw 已经进入多集成、多宿主环境阶段，边界案例会持续放大，所以用户更在意 **跨平台一致性** 和 **故障语义统一**。

---

## 8. 待处理积压

今天最需要维护者关注的，不是“有没有新功能”，而是 **高风险问题是否尽快收敛**，以及 **PR 审核/验证是否堆积**。

### 优先级最高的积压 Issue

- [#126821](https://github.com/openclaw/openclaw/issues/126821) — SQLite 腐坏复发，P0 数据完整性风险
- [#126900](https://github.com/openclaw/openclaw/issues/126900) — compaction 无限循环，session lane 卡死
- [#126906](https://github.com/openclaw/openclaw/issues/126906) — memory persistence 静默失效
- [#126916](https://github.com/openclaw/openclaw/issues/126916) — onboarding/auth profile 持久化失败
- [#126923](https://github.com/openclaw/openclaw/issues/126923) — Codex 绑定丢失，重启恢复失败
- [#126920](https://github.com/openclaw/openclaw/issues/126920) — 校验通过但启动失败
- [#126847](https://github.com/openclaw/openclaw/issues/126847) — tool call 失败无法回传给模型

### 需要继续推进审核/验证的 PR

这些 PR 不是“没做”，而是明显处于 **proof / maintainer review / waiting on author** 的推进阶段，容易成为交付瓶颈：

- [PR #126714](https://github.com/openclaw/openclaw/pull/126714)
- [PR #126818](https://github.com/openclaw/openclaw/pull/126818)
- [PR #126865](https://github.com/openclaw/openclaw/pull/126865)
- [PR #126881](https://github.com/openclaw/openclaw/pull/126881)
- [PR #126887](https://github.com/openclaw/openclaw/pull/126887)
- [PR #126891](https://github.com/openclaw/openclaw/pull/126891)
- [PR #126889](https://github.com/openclaw/openclaw/pull/126889)
- [PR #126775](https://github.com/openclaw/openclaw/pull/126775)

### 维护建议

- **先锁 P0/P1 稳定性问题**，避免再出现数据损坏、会话挂死和 silent failure。
- **集中清理 proof/waiting 状态 PR**，否则会成为下一轮发版的审核堆积点。
- **增强故障可见性**：很多问题不是“发生了”，而是“发生后没人知道发生了”。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合公众号/周报风格的简版摘要**，或  
2. **适合内部项目管理的表格版（Issue / PR / 风险等级 / 是否有修复）**。

---

## 横向生态对比

下面给出一份基于你提供的 **2026-08-21 过去 24 小时 GitHub 动态** 的横向对比分析。  
**口径说明：**表格中的 Issues / PR 采用日报里给出的“更新量/活跃量”口径，不等同于仓库总量。

---

# 1) 生态全景

过去 24 小时，个人 AI 助手 / 自主智能体开源生态整体呈现出 **“高活跃、强修复、偏稳定性收敛”** 的特征：头部项目合计约有 **121 条 Issue 更新、215 条 PR 更新**，但多数项目 **没有新 Release**，说明当前行业重心仍在 **修复运行时问题、补强状态恢复、提升消息交付可靠性**，而不是大规模上新功能。  
从议题看，生态已从“能跑”进入“**必须可信、可恢复、可审计**”阶段：会话连续性、配置语义一致性、失败可见性、权限与安全边界，成为几乎所有活跃项目的共同关注点。  
同时，项目分层也很明显：少数头部仓库进入高压迭代与质量治理并行阶段，长尾项目则基本处于低活跃或休眠状态。  
这意味着当前生态的竞争点，已不只是模型接入能力，而是 **工程成熟度、可观测性、恢复能力和治理能力**。

---

# 2) 各项目活跃度对比

| 项目 | Issues 今日更新 | PR 今日更新 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 22 | 40 | 无新 Release | 高活跃，但稳定性债务较重，处于高压修复期 |
| NanoBot | 2 | 10 | 无新 Release | 健康度较好，工程修复和体验优化并行 |
| Hermes Agent | 50 | 50 | 无新 Release | 极高活跃，问题密度高，平台化演进明显 |
| PicoClaw | 0 | 0 | 无活动 | 低活跃/休眠 |
| NanoClaw | 1 | 50 | 无新 Release | 高活跃，但 PR 审查压力较大 |
| NullClaw | 0 | 0 | 无活动 | 低活跃/休眠 |
| IronClaw | 14 | 15 | 无新 Release | 高活跃，整体健康，偏架构补强 |
| LobsterAI | 0 | 0 | 无活动 | 低活跃/休眠 |
| TinyClaw | 0 | 0 | 无活动 | 低活跃/休眠 |
| Moltis | 0 | 3 | **1 个新 Release** | 低噪音、持续推进，偏稳态优化 |
| CoPaw | 12 | 19 | **1 个新 Release** | 活跃且健康，功能与工程质量同步推进 |
| ZeptoClaw | 0 | 0 | 无活动 | 低活跃/休眠 |
| ZeroClaw | 20 | 28 | 无新 Release | 高活跃，安全与正确性治理压力较大 |

---

# 3) OpenClaw 在生态中的定位

**定位结论：OpenClaw 是“核心运行链路型”头部项目。**  
它不是单纯做某个入口或某个 UI，而是围绕 **Gateway、session-state、消息交付、认证、CLI、sandbox、跨通道集成** 做系统性打磨，属于 AI 智能体基础设施层。

### 相比同类的优势
- **问题覆盖面最广**：Slack / Discord / Mattermost / Codex / ACP / CLI / sandbox / WebUI 等边界都在触达。
- **修复导向非常明确**：今天已合并/关闭的 PR 重点集中在 **消息交付正确性、会话恢复、安全边界、启动/清理稳定性**。
- **更贴近生产级痛点**：大量 Issue 指向 **silent failure、crash-loop、data-loss、session wedge**，说明它承接的是高价值生产场景。

### 与其他项目的技术路线差异
- **相对 NanoBot / CoPaw**：OpenClaw 更偏底层运行链路与故障语义，少一些“单一交互形态”的产品化包装。
- **相对 Hermes Agent**：Hermes 更像“智能体平台 + 桌面/工作流 + A2A/kanban”，OpenClaw 更像“核心网关与交付引擎”。
- **相对 NanoClaw**：NanoClaw 明显 Slack-first，而 OpenClaw 是多通道、多宿主、更通用的基础平台。
- **相对 ZeroClaw**：ZeroClaw 更强调安全策略、默认值与审批治理，OpenClaw 更强调运行链路正确性与恢复能力。
- **相对 IronClaw**：IronClaw 偏架构演进和平台能力补课，OpenClaw 更偏大规模真实场景下的故障收敛。

### 社区规模对比
从 **22 条 Issue 更新 + 40 条 PR 更新** 看，OpenClaw 已明显高于 NanoBot、Moltis 等中小项目，和 Hermes、NanoClaw、ZeroClaw 处于同一活跃梯队。  
但它的社区特征更偏 **“基础设施型、运维驱动型”**：贡献者/用户讨论集中在可靠性、恢复语义和交付一致性，而不是纯功能炫技。  
因此，OpenClaw 可视为生态中的 **“核心底座型项目”**，社区影响力更多体现在生产可用性和跨集成稳定性。

---

# 4) 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| 会话连续性 / 恢复能力 | OpenClaw、Hermes Agent、NanoBot、CoPaw、ZeroClaw | 重启后能恢复、session 绑定不丢、cwd/工作区优先级一致、压缩后目标不丢 |
| 流式输出与消息交付可靠性 | OpenClaw、NanoBot、CoPaw、Hermes Agent、ZeroClaw | 断流可重试、完成结果不误报、delivery seam 不绕过、失败语义要准确 |
| 配置语义一致性 | OpenClaw、Hermes Agent、ZeroClaw、NanoBot | validate/doctor 与真实启动一致、provider/profile 不被 UI 覆盖、超时参数可调 |
| 安全与权限治理 | OpenClaw、NanoClaw、Hermes Agent、ZeroClaw、Moltis | secret 不明文、trusted operator 分层、高风险命令限制、权限 scope 完整 |
| 多 provider / 多通道扩展 | NanoBot、Hermes Agent、CoPaw、OpenClaw、ZeroClaw | 原生 provider 扩展、企业模型接入、通道兼容、profile/endpoint 保真 |
| CI / Release / 测试稳定性 | NanoClaw、IronClaw、CoPaw、ZeroClaw、Moltis | 降低 flaky test、修复 release gate、锁定依赖版本、提升发布可信度 |
| UI / TUI / Desktop 可用性 | NanoBot、Hermes Agent、CoPaw、NanoClaw、OpenClaw | 更好的恢复入口、上下文呈现、导航体验、搜索/预览/多面板布局 |

**共同结论：**生态的主要需求已经从“接入一个模型”转向“**把智能体做成可靠系统**”。

---

# 5) 差异化定位分析

## 1. OpenClaw
- **功能侧重**：核心运行链路、消息交付、session-state、CLI / gateway / sandbox
- **目标用户**：需要多通道、多宿主、生产级稳定性的高级用户和维护者
- **架构特征**：偏基础设施层，强调恢复语义、故障可见性和兼容边界

## 2. NanoBot
- **功能侧重**：TUI 体验、provider 扩展、流式容错、启动效率
- **目标用户**：更偏终端用户和本地高频使用者
- **架构特征**：轻量、体验导向，多 provider 接入是主轴

## 3. Hermes Agent
- **功能侧重**：Desktop、kanban、A2A、安全分层、工作流治理
- **目标用户**：专业自动化用户、桌面工作流用户、平台型用户
- **架构特征**：更像“智能体操作系统”，强调状态、治理与跨端一致性

## 4. NanoClaw
- **功能侧重**：Slack-first、托管默认、权限与 group 级配置
- **目标用户**：企业 Slack 场景、群聊协作场景
- **架构特征**：产品化更强，围绕 Slack 的默认体验和行为边界做深耕

## 5. IronClaw
- **功能侧重**：agent lifecycle hooks、sandbox 安全、WebUI 设计系统
- **目标用户**：平台开发者、架构演进参与者
- **架构特征**：偏“架构补课”和平台能力建设，强调可扩展性

## 6. CoPaw
- **功能侧重**：Console、workspace-scoped skills、跨会话记忆、频道集成
- **目标用户**：需要多工作区、多频道协作的生产用户
- **架构特征**：产品化和工程治理并行，偏中大型工作流

## 7. ZeroClaw
- **功能侧重**：安全策略、风险审批、provider/profile 语义、恢复能力
- **目标用户**：对合规、稳定性、策略一致性要求高的团队
- **架构特征**：强治理、强默认安全，是典型“安全先行”路线

## 8. Moltis
- **功能侧重**：安全加固、消息格式、发布质量
- **目标用户**：轻量使用者或特定渠道场景
- **架构特征**：当前更像稳态优化中的小而专项目

---

# 6) 社区热度与成熟度

## 第一梯队：快速迭代 + 高问题密度
- **OpenClaw、Hermes Agent、NanoClaw、ZeroClaw、IronClaw、CoPaw**
- 特征：
  - Issue/PR 更新量高
  - 多数没有新 Release
  - 讨论集中在稳定性、治理、恢复语义
  - PR backlog 明显，review / proof 成为瓶颈
- 结论：这些项目仍处于 **快速演进阶段**，但已经进入 **质量收敛期**。

## 第二梯队：较成熟、工程节奏平稳
- **NanoBot、Moltis**
- 特征：
  - 活跃但噪音不大
  - 更强调单点修复、体验改进、发布稳定
  - Moltis 还有新 Release，说明已进入较明确的版本化推进
- 结论：处于 **质量巩固阶段**，产品节奏更稳。

## 第三梯队：低活跃 / 休眠
- **PicoClaw、NullClaw、LobsterAI、TinyClaw、ZeptoClaw**
- 特征：
  - 过去 24 小时无活动
  - 没有明显社区讨论或发布动作
- 结论：要么处于沉默期，要么尚未形成持续社区规模。

---

# 7) 值得关注的趋势信号

## 趋势 1：智能体系统正在“操作系统化”
多个项目都在强化：
- session 恢复
- 工作区 / group / space 隔离
- cwd / provider / profile 的优先级
- 长会话压缩后的可见性

**含义：**AI 智能体不再只是对话框，而是一个持续运行、可恢复、可组织的系统。  
**对开发者的启发：**需要把“状态管理”当作一等公民设计，而不是附属逻辑。

## 趋势 2：失败必须可见，不能“假成功”
OpenClaw、Hermes、NanoBot、CoPaw、ZeroClaw 都出现了类似问题：
- 交付成功但被误报失败
- 失败被静默吞掉
- 重连后回复丢失
- 配置通过但运行失败

**含义：**社区对“false success / silent failure”容忍度极低。  
**对开发者的启发：**错误语义、重试边界、最终一致性，比单纯吞异常更重要。

## 趋势 3：安全与治理正在进入默认路径
典型信号包括：
- secret 敏感化
- trusted operator / approval workflow
- 高风险命令限制
- permissions scope 完整性
- per-group / per-workspace 配置隔离

**含义：**智能体开始真正进入生产环境后，安全策略不再是“可选项”。  
**对开发者的启发：**必须设计可审计、可回滚、可授权的执行链路。

## 趋势 4：多 provider / 多通道抽象成为标配
无论是云厂商模型、Slack/Discord/Mattermost、还是桌面/终端/网页入口，项目都在朝统一抽象层演进。

**含义：**生态的竞争点正在从“接一个模型”转向“统一接入和统一治理”。  
**对开发者的启发：**provider 和 channel 层应保持强隔离、强契约、强兼容测试。

## 趋势 5：CI / Release / 测试稳定性已经是产品能力的一部分
NanoClaw、IronClaw、CoPaw、ZeroClaw、Moltis 都在强化：
- 依赖锁定
- flaky test 修复
- release gate
- runner 兼容性

**含义：**智能体项目的“工程质量”本身已成为用户可感知体验的一部分。  
**对开发者的启发：**发布链路、测试链路、安装链路，必须和产品功能同等重视。

---

如果你愿意，我可以继续把这份横向分析进一步整理成两种版本之一：  
1. **管理层简报版（1 页以内）**  
2. **研发评审版（带优先级和建议动作清单）**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
**日期：2026-08-21**  
数据范围：过去 24 小时 GitHub 活动

---

## 1. 今日速览

NanoBot 过去 24 小时整体保持**中高活跃**，以工程修复、稳定性增强和 TUI/Provider 体验优化为主。  
今日共有 **2 条 Issue 更新**，**10 条 PR 更新**，其中 **5 条已结束（关闭/合并）**，说明维护节奏较快，且代码贡献主要集中在可落地的修复与小步迭代。  
从内容看，项目当前重点仍在 **多 Provider 兼容、流式传输鲁棒性、TUI 体验、终端/通道稳定性** 这几条主线上。  
整体健康度较好：新增需求明确、Bug 响应及时，并且已有对应修复 PR 跟进，说明维护链路比较顺畅。

---

## 2. 版本发布

**今日无新版本发布。**  
最新 Releases 为空，未观察到新的 tag 或正式版本说明。

---

## 3. 项目进展

今日已结束的 5 个 PR 主要推动了 **TUI 交互、启动流程、上下文展示与运行稳定性** 的改进：

1. [#5452 feat(tui): print resume command on exit](https://github.com/HKUDS/nanobot/pull/5452)  
   为 TUI 退出后打印可直接续会的命令，降低用户“退出后如何恢复会话”的操作成本。

2. [#5451 fix(tui): keep context view concise](https://github.com/HKUDS/nanobot/pull/5451)  
   精简 `/context` 面板内容，减少冗余信息，提升上下文查看效率。

3. [#5450 fix(tui): prevent local gateway startup stalls](https://github.com/HKUDS/nanobot/pull/5450)  
   修复本地 gateway 启动被 WebUI 安装/构建阻塞的问题，改善启动性能和可用性。

4. [#5449 fix(tui): keep navigation commands in Herdr panes](https://github.com/HKUDS/nanobot/pull/5449)  
   保持 Herdr 托管面板中的导航命令可用，避免嵌入式终端场景下功能退化。

5. [#5448 feat(tui): start fresh chats in launch workspace](https://github.com/HKUDS/nanobot/pull/5448)  
   调整默认启动工作区逻辑，让新会话更符合“从启动目录开始”的预期，减少历史会话污染。

**项目推进评估：**  
这 5 个完成项显示 NanoBot 正在持续夯实 **“可用性 + 易恢复 + 启动效率 + 命令一致性”** 的基础体验。对于一个 AI 智能体/个人助手项目而言，这类改进直接影响日常使用留存，属于高价值的工程优化。

---

## 4. 社区热点

> 说明：当前数据中 Issues / PR 均未提供评论数或反应数，且大多为 0 或未统计，因此“热点”更多体现为**需求集中度和问题优先级**，而非社交互动热度。

### 重点关注 1：原生 Vertex AI Provider 需求
- [#5459 Feature request: Add native Google Vertex AI provider for Claude models](https://github.com/HKUDS/nanobot/issues/5459)

该需求明确指出：当前已有 Anthropic、OpenAI、Azure OpenAI、Bedrock、GitHub Copilot、xAI 以及兼容网关，但**缺少 Google Vertex AI 上的 Claude 原生支持**。  
这反映出用户对 **企业/云托管模型接入** 的需求在上升，尤其是希望在统一框架内接入不同云厂商的 Claude 运行路径。

### 重点关注 2：流式传输中途异常的重试问题
- [#5454 [bug] Streaming providers: mid-stream server_error skips retry once content has streamed](https://github.com/HKUDS/nanobot/issues/5454)
- 对应修复 PR：[#5455 fix(provider): retry Codex server_error](https://github.com/HKUDS/nanobot/pull/5455)

这个问题涉及流式输出已开始后，服务端错误无法触发重试，属于**用户可感知的会话中断问题**。  
从 PR 跟进速度看，社区/维护者对该类可靠性问题响应很快，说明项目对“生成不中断”非常重视。

---

## 5. Bug 与稳定性

按严重程度排列，今日最值得关注的稳定性问题如下：

### 1) 高严重度：流式输出中途 server_error 后无法重试
- [Issue #5454](https://github.com/HKUDS/nanobot/issues/5454)
- [Fix PR #5455](https://github.com/HKUDS/nanobot/pull/5455)

**影响：**  
在内容已经开始流式输出后，若出现 `server_error`，当前重试逻辑不会再补救，可能导致一次对话直接失败。  
这类问题对 AI 助手体验影响很大，因为用户最敏感的就是“已经看到输出却突然中断”。

**状态：** 已有对应修复 PR，问题修复路径明确。

### 2) 中严重度：Matrix 日志上下文缺失
- [PR #5458 fix(matrix): interpolate error log context](https://github.com/HKUDS/nanobot/pull/5458)

**影响：**  
错误日志中缺少文件名、room ID、chat ID 等关键诊断信息，会降低排障效率。  
虽然不是直接崩溃类问题，但会放大运维和调试成本。

**状态：** 已有修复 PR。

### 3) 中严重度：Channel 发送任务可能因单条消息异常而停摆
- [PR #5457 fix(channels): scope dispatcher exception boundary to message processing](https://github.com/HKUDS/nanobot/pull/5457)

**影响：**  
单条 outbound message 的异常可能让 `ChannelManager._dispatch_outbound` 停止，进而造成后续消息无法继续发送。  
这是典型的“局部错误导致全局停摆”问题，属于稳定性风险较高的工程缺陷。

**状态：** 已有修复 PR。

### 4) 低到中严重度：依赖与测试环境声明不一致
- [PR #5456 chore(deps): drop websocket-client, add certifi](https://github.com/HKUDS/nanobot/pull/5456)

**影响：**  
属于依赖清理和环境显式化问题，更多影响可维护性与测试稳定性。  
不是线上核心故障，但对长期健康度有帮助。

---

## 6. 功能请求与路线图信号

今日新增功能请求主要指向 **更广泛的模型接入能力**：

### 1) 原生 Google Vertex AI provider for Claude models
- [#5459](https://github.com/HKUDS/nanobot/issues/5459)

**路线图信号：**
- 这类需求很可能被纳入下一阶段的 provider 扩展方向。
- 原因是项目已经具备多家云/网关 provider 的基础，新增 Vertex AI 属于“架构一致、价值明确”的扩展。
- 若后续社区继续提出类似云厂商/企业托管 Claude 支持，这个方向优先级会进一步上升。

### 2) SenseNova（商汤日日新）原生 provider
- [#5453 feat(providers): add SenseNova (商汤日日新) provider](https://github.com/HKUDS/nanobot/pull/5453)

**路线图信号：**
- 这是一个已经进入 PR 阶段的新增 provider，说明项目正在持续扩大模型生态覆盖。
- 和 #5459 形成呼应：NanoBot 的路线似乎是继续做 **“统一入口 + 多 provider 支持”**，而不是绑定单一模型生态。

### 3) 流式容错增强
- [#5454](https://github.com/HKUDS/nanobot/issues/5454) / [#5455](https://github.com/HKUDS/nanobot/pull/5455)

**路线图信号：**
- 表明项目后续可能继续加强对 OpenAI-compatible、Codex、streaming error semantics 的兼容处理。
- 这属于“基础能力补强”，虽不一定是新功能，但对下一版本的稳定性很关键。

---

## 7. 用户反馈摘要

从 Issues/PR 反映出的真实用户诉求，可以提炼为以下几类：

### 1) “我想少折腾，能直接恢复会话”
- 相关：[#5452](https://github.com/HKUDS/nanobot/pull/5452)
- 反馈含义：用户希望退出 TUI 后能马上拿到恢复命令，而不是自己翻历史、找 session id。
- 场景：频繁切换终端、断点续聊、临时离开后快速回到上下文。

### 2) “信息要精简，但关键状态不能丢”
- 相关：[#5451](https://github.com/HKUDS/nanobot/pull/5451)
- 反馈含义：上下文视图太冗长会影响效率，用户更希望看到“token、replay、archive”等关键指标。
- 场景：长对话、压缩上下文、判断当前会话状态。

### 3) “启动要快，不要被 WebUI 构建拖慢”
- 相关：[#5450](https://github.com/HKUDS/nanobot/pull/5450)
- 反馈含义：用户在本地/源代码场景下更在意“先能用”，而不是每次启动都等待额外构建。
- 场景：本地开发、测试、多次重启 gateway。

### 4) “流式生成不能半路断”
- 相关：[#5454](https://github.com/HKUDS/nanobot/issues/5454)
- 反馈含义：用户对生成中断非常敏感，尤其是已经开始输出后再失败，会显著破坏体验。
- 场景：长文本生成、代码生成、需要连续输出的任务。

### 5) “我希望接入更多模型供应商”
- 相关：[#5459](https://github.com/HKUDS/nanobot/issues/5459)、[#5453](https://github.com/HKUDS/nanobot/pull/5453)
- 反馈含义：用户希望 NanoBot 成为统一的模型接入层，而不是局限于少数厂商。
- 场景：企业部署、多云策略、模型成本/可用性切换。

---

## 8. 待处理积压

基于当前数据快照，**未见明显长期积压的老 Issue/PR**；所有列出的 Issue 和 PR 创建时间均为 **2026-08-20**，仍属于“当日/近 24 小时新鲜项”，暂无明显超期未响应迹象。

不过，以下条目建议持续关注：

### 仍待处理的开放 Issue
- [#5459 Feature request: Add native Google Vertex AI provider for Claude models](https://github.com/HKUDS/nanobot/issues/5459)
- [#5454 Streaming providers: mid-stream server_error skips retry once content has streamed](https://github.com/HKUDS/nanobot/issues/5454)

### 仍待处理的开放 PR
- [#5458 fix(matrix): interpolate error log context](https://github.com/HKUDS/nanobot/pull/5458)
- [#5456 chore(deps): drop websocket-client, add certifi](https://github.com/HKUDS/nanobot/pull/5456)
- [#5457 fix(channels): scope dispatcher exception boundary to message processing](https://github.com/HKUDS/nanobot/pull/5457)
- [#5455 fix(provider): retry Codex server_error](https://github.com/HKUDS/nanobot/pull/5455)
- [#5453 feat(providers): add SenseNova (商汤日日新) provider](https://github.com/HKUDS/nanobot/pull/5453)

**维护建议：**
- 优先合入/验证 **#5455**，因为它直接对应高影响 Bug #5454。
- 其次关注 **#5457**，这类“单点异常导致任务停摆”的问题属于稳定性底座。
- 对 **#5459** 建议尽早打标签、评估可行性，避免重复需求在后续继续堆积。

---

## 总体判断

NanoBot 今日呈现出典型的**健康型开源项目节奏**：  
- 有明确的功能演进方向（provider 生态扩展）  
- 有快速闭环的稳定性修复（流式重试、channel 停摆）  
- 有面向真实使用体验的 TUI 优化（恢复命令、简洁上下文、启动速度）

如果这种节奏持续，项目短期内会继续在 **“可用性、容错性、模型接入广度”** 三个维度稳步增强。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
**日期：2026-08-21**  
基于 GitHub 近 24 小时数据整理（Issues 更新 50 条：45 新开/活跃、5 关闭；PR 更新 50 条：45 待合并、5 已合并/关闭；**无新版本发布**）。

---

## 1. 今日速览

今天 Hermes Agent 仍处于**高强度迭代与修复并行**状态：Issues 和 PR 都各有 50 条更新，说明社区活跃度很高，且讨论重心集中在**稳定性、状态一致性、配置正确性和跨平台兼容**上。  
从问题类型看，今日新增/活跃内容以 **bug 修复、会话状态、kanban 调度、desktop 体验、provider/auth 边界问题** 为主，产品正从“可用”向“更可预测、更安全”推进。  
值得注意的是，**P0 级别 bug 已出现**，同时也有对应修复 PR 迅速跟进，说明项目维护节奏快，但系统复杂度和边界条件压力也在上升。  
整体判断：项目健康度仍然较好，属于**高活跃、强问题驱动、偏稳定性收敛**的一天。

---

## 2. 版本发布

**今日无新版本发布。**  
最新 Releases 为空，因此本日报不包含版本变更说明。

---

## 3. 项目进展

今日可见的 PR 进展主要集中在“修 bug + 补安全边界 + 提升状态一致性”。

### 已关闭/收口的 PR
- **#91195** — [fix(cli): keep resumed session cwd precedence consistent](https://github.com/NousResearch/hermes-agent/pull/91195)  
  这是今天可见的已关闭 PR 之一，聚焦于**恢复会话时 cwd 优先级一致性**：明确 `--in`、`TERMINAL_CWD`、保存目录、任务工作区之间的优先级关系。  
  这类修复对 CLI/desktop 的“会话恢复是否符合预期”非常关键，属于典型的高价值稳定性补丁。

### 今日新开的高价值修复/增强 PR（显示项目在向前收敛）
- **#91209** — [fix(agent): ignore null errors in structured tool results](https://github.com/NousResearch/hermes-agent/pull/91209)  
  针对工具结果中 `error: null` 被误判为失败的问题，修复工具结果分类逻辑。
- **#91206** — [fix(kanban): requeue workers after transient provider failures](https://github.com/NousResearch/hermes-agent/pull/91206)  
  改善 kanban worker 在 provider 限流、超时、服务错误时的退出/重试语义，减少误判和自动阻塞。
- **#91201** — [fix(update): surface config-module reload failure instead of reporting config current](https://github.com/NousResearch/hermes-agent/pull/91201)  
  修复更新流程中“配置已最新”但实际迁移未完成的静默失败。
- **#91200** — [feat(goals): show standing goals carried through compression](https://github.com/NousResearch/hermes-agent/pull/91200)  
  为压缩后的会话显式展示持续目标迁移，增强用户可见性。
- **#91198** — [fix(discord): apply YAML allow_bots to ingress policy](https://github.com/NousResearch/hermes-agent/pull/91198)  
  改善 Discord 机器人入站策略的配置继承与优先级。
- **#91197** — [fix(cli): keep resumed session cwd precedence consistent](https://github.com/NousResearch/hermes-agent/pull/91197)  
  与上面的 #91195 同主题，说明该问题已被认真收敛。

### 项目整体推进评价
今天的变化不是“发大版本”，而是**把大量隐性风险点逐个补洞**：  
- 会话恢复和压缩行为更可解释  
- worker 调度更不容易误判  
- tool result / config reload / provider failure 的边界更清晰  
- 桌面端和插件端的状态一致性在加强  

这说明项目正在向**可运维、可回滚、可追踪**的方向继续推进。

---

## 4. 社区热点

以下是今天最热的 Issue（按评论数与讨论密度）：

1. **#91090** — [ACP session/set_model always fails with "No LLM provider configured"](https://github.com/NousResearch/hermes-agent/issues/91090)  
   评论：4  
   **热点原因**：这是典型的“看起来有 provider，实际切模型失败”的会话状态问题，直接影响 ACP 使用体验。  
   **用户诉求**：希望模型切换、session 内状态读取能够稳定可靠，避免误导性的首轮初始化错误。

2. **#91153** — [Model can narrate stale list items over a fresh, correct tool result](https://github.com/NousResearch/hermes-agent/issues/91153)  
   评论：3  
   **热点原因**：模型在解释新工具结果时混入旧上下文，属于“**幻觉式陈述过期状态**”问题。  
   **用户诉求**：希望模型对工具返回的最新状态“忠实复述”，不要被历史上下文污染。

3. **#91149** — [Preview pane: route localhost dev servers through the harness when connected to a remote/SSH backend](https://github.com/NousResearch/hermes-agent/issues/91149)  
   评论：3  
   **热点原因**：远程 SSH 后端场景下，`localhost` 语义错位导致预览页不可用。  
   **用户诉求**：开发体验要对远程/本地混合场景友好，尤其是预览、转发、代理链路要自动处理。

4. **#91178** — [kanban task created with --initial-status blocked is promoted and spawned](https://github.com/NousResearch/hermes-agent/issues/91178)  
   评论：2  
   **热点原因**：blocked 任务居然会被自动推进，破坏了“人工门禁”预期。  
   **用户诉求**：任务状态机必须严格遵守人工审批和阻塞语义。

5. **#91176** — [zai provider resolves glm-5.3 context to 202752](https://github.com/NousResearch/hermes-agent/issues/91176)  
   评论：2  
   **热点原因**：provider/catalog 映射错误影响模型上下文上限，属于基础配置与模型路由问题。  
   **用户诉求**：模型元数据必须准确，否则会直接影响成本、上下文和调用稳定性。

> 观察：今天的高讨论问题，几乎都围绕“**状态是否可信**”展开——模型是否记住了旧内容、session 是否切对 provider、kanban 是否严格阻断、远程开发路径是否正确。  
> 这反映出 Hermes 的用户群偏专业，且对“可解释、可预期”的要求非常高。

---

## 5. Bug 与稳定性

按严重程度排序，今日最值得关注的 Bug 如下：

### P0 / 立即关注
- **#91164** — [gpt-5.6 family: prompt_cache_retention causes 400 invalid_parameter](https://github.com/NousResearch/hermes-agent/issues/91164)  
  **影响**：OpenAI ChatGPT/Codex 线路在 gpt-5.6 系列模型上可能直接失败，属于高优先级生产可用性问题。  
  **修复状态**：当前未见对应 fix PR。  
  **风险点评**：这是“会话直接死掉”的级别，应优先处理。

### P2 / 高优先级稳定性问题
- **#91203** — [Feishu (Lark) WebSocket disconnect crashes the entire gateway](https://github.com/NousResearch/hermes-agent/issues/91203)  
  **影响**：网关因未处理的 `ConnectionClosed` 崩溃，属于消息通道稳定性问题。  
  **修复状态**：未见 fix PR。  

- **#91090** — [ACP session/set_model always fails with "No LLM provider configured"](https://github.com/NousResearch/hermes-agent/issues/91090)  
  **影响**：模型切换失败，严重影响 session 操作。  
  **修复状态**：未见 fix PR。  

- **#91166** — [_detect_tool_failure tags successful tool results as [error] when a null error field lands inside the 500-char window](https://github.com/NousResearch/hermes-agent/issues/91166)  
  **影响**：成功结果被误判成失败，可能造成错误重试、错误提示和误导性日志。  
  **修复状态**：**已有修复 PR #91209**  
  - [PR #91209](https://github.com/NousResearch/hermes-agent/pull/91209)

- **#91147** — [Home Assistant tools use a stale environment snapshot](https://github.com/NousResearch/hermes-agent/issues/91147)  
  **影响**：`.env` 修改和 gateway 重启后仍不生效，Windows 场景下尤为明显。  
  **修复状态**：未见 fix PR。  

- **#91119** — [key_cmd providers never re-mint on 401](https://github.com/NousResearch/hermes-agent/issues/91119)  
  **影响**：凭证失效后无法自动恢复，所有请求持续失败直到重启。  
  **修复状态**：未见 fix PR。  

- **#91108** — [key_cmd credential failure classified as transient](https://github.com/NousResearch/hermes-agent/issues/91108)  
  **影响**：认证失败被当作网络问题重试 30 秒，掩盖真实的“请登录”提示。  
  **修复状态**：未见 fix PR。  

### P2 / P3 的高频体验回归
- **#91121** — [Desktop settings list fields strip commas on every keystroke](https://github.com/NousResearch/hermes-agent/issues/91121)  
  **影响**：配置列表项无法输入多值，属于明显的 UI 可用性问题。  
  **修复状态**：未见 fix PR。  

- **#91130** — [`drive_preview` clicks land off-target on fractional-DPR displays](https://github.com/NousResearch/hermes-agent/issues/91130)  
  **影响**：预览点击落点不准，影响远程/桌面操作链路。  
  **修复状态**：未见 fix PR。  

- **#91177** — [Kanban worker exits rc=0 after provider rate-limit/timeout](https://github.com/NousResearch/hermes-agent/issues/91177)  
  **影响**：worker 看似正常退出，但调度器误判为协议违规并自动阻塞。  
  **修复状态**：**已有修复 PR #91206**  
  - [PR #91206](https://github.com/NousResearch/hermes-agent/pull/91206)

- **#91169** — [project bind-board leaves board project_id unset](https://github.com/NousResearch/hermes-agent/issues/91169)  
  **影响**：board 绑定后项目继承失效，后续任务可能落到错误工作区。  
  **修复状态**：未见 fix PR。  

### 已关闭的重复/测试项
- **#91176** — [zai provider resolves glm-5.3 context to 202752](https://github.com/NousResearch/hermes-agent/issues/91176) — 已关闭（duplicate）  
- **#91178** — [blocked task is promoted and spawned](https://github.com/NousResearch/hermes-agent/issues/91178) — 已关闭  
- **#91060** — [Windows desktop chat window cannot be snapped](https://github.com/NousResearch/hermes-agent/issues/91060) — 已关闭（duplicate）  
- **#91143** — [TEST issue creation permission check](https://github.com/NousResearch/hermes-agent/issues/91143) — 已关闭（测试单）  

---

## 6. 功能请求与路线图信号

今天出现的功能诉求，很多都带有明显的“路线图信号”，说明用户已经开始把 Hermes 当作**生产级自动化平台**使用，而不只是聊天工具。

### 最可能进入下一版本的方向

- **#91168** — [A2A security: add trusted-operator peer tier](https://github.com/NousResearch/hermes-agent/issues/91168)  
  用户希望区分“可信操作员”和普通外部 peer。  
  这表明 A2A 正在从“能连通”走向“能授权、能分级、能最小权限”。

- **#91192** — [feat(a2a): authorize named peers for local operator tasks](https://github.com/NousResearch/hermes-agent/pull/91192)  
  与上面需求高度一致，说明**A2A 安全分层**很可能是短期内的主线之一。  
  - [PR #91192](https://github.com/NousResearch/hermes-agent/pull/91192)

- **#91202** — [Feature Request: Approval Workflow for Memory and Skill Modifications](https://github.com/NousResearch/hermes-agent/issues/91202)  
  用户希望 memory / skill 写入也纳入审批流。  
  这代表大家对“agent 自主写入知识”的风险意识正在增强。

- **#91182** — [Desktop: session spaces independent of cwd](https://github.com/NousResearch/hermes-agent/issues/91182)  
  想要“空间/标签”而不是依赖 cwd 分组，说明桌面端已经进入多工作流管理阶段。  
  这是很典型的“组织能力”需求。

- **#91213** — [feat(desktop): separate Bot Mode direct messages and groups](https://github.com/NousResearch/hermes-agent/pull/91213)  
  说明桌面端 Bot Mode 信息密度上升，用户需要更清晰的消息架构。  
  - [PR #91213](https://github.com/NousResearch/hermes-agent/pull/91213)

- **#91204** — [feat(desktop): account resources and gateway metrics control surface](https://github.com/NousResearch/hermes-agent/pull/91204)  
  用户开始要求“资源/配额/网关指标”可视化，明显是走向平台化、运维化。  
  - [PR #91204](https://github.com/NousResearch/hermes-agent/pull/91204)

### 与当前 bug 修复强相关、很可能被纳入近期版本的诉求
- **#91165** — [standing goals carried through compression](https://github.com/NousResearch/hermes-agent/issues/91165)  
  与 **PR #91200** 强相关，属于“可见性修复”。
- **#91149** — [localhost dev servers through harness on remote/SSH backend](https://github.com/NousResearch/hermes-agent/issues/91149)  
  对远程开发体验非常关键，属于中短期高价值增强。
- **#91195 / #91197** — [resumed session cwd precedence](https://github.com/NousResearch/hermes-agent/issues/91197) / [PR #91195](https://github.com/NousResearch/hermes-agent/pull/91195) / [PR #91197](https://github.com/NousResearch/hermes-agent/pull/91197)  
  说明会话恢复语义正在被认真打磨。

---

## 7. 用户反馈摘要

从今日 issues 的语气和内容看，用户的真实痛点非常集中：

### 1）“状态不能乱”
用户反复强调：
- session 切模型要稳定
- tool result 不能误判
- 历史上下文不能污染当前输出
- compressed session 里的 standing goal 需要显式告知

这说明 Hermes 的用户已经把它当作**状态机系统**，而不是单次问答工具。

### 2）“配置必须可预期”
典型反馈包括：
- provider 配置被 UI/入口覆盖
- `hermes doctor` 假阳性告警
- `.env` 改了但工具不生效
- update 过程静默失败
- 列表型配置字段无法输入逗号

用户不接受“看起来成功、实际没生效”的行为。

### 3）“桌面端要真能用”
桌面端相关问题非常多：
- 侧边栏搜索把消息内容当 session 名
- 新建会话忽略 provider
- Windows Snapping、DPR 点击偏移、macOS keychain 重提示
- Bot Mode / preview / session spaces / 搜索体验都在被打磨

这说明 Desktop 已经进入**高频实用场景**，容错空间越来越小。

### 4）“自动化可以更强，但必须可控”
A2A、kanban、memory、skill、goals 等议题都指向同一个诉求：  
**用户愿意让 Hermes 自动做事，但前提是可授权、可暂停、可审计、可恢复。**

---

## 8. 待处理积压

基于当前提供的数据，**没有看到真正长期未响应的陈旧项**：大多数 Issue/PR 都是在 2026-08-20 或 2026-08-21 创建/更新，响应节奏总体很快。  
但有几类**高优先级、仍需尽快跟进**的积压值得维护者优先关注：

- **#91164** — [gpt-5.6 prompt_cache_retention 400 invalid_parameter](https://github.com/NousResearch/hermes-agent/issues/91164)  
  P0，且当前未见修复 PR。

- **#91203** — [Feishu WebSocket disconnect crashes gateway](https://github.com/NousResearch/hermes-agent/issues/91203)  
  网关崩溃类问题，影响面大。

- **#91168** — [A2A trusted-operator peer tier](https://github.com/NousResearch/hermes-agent/issues/91168)  
  安全边界问题，建议尽快定方向。

- **#91149** — [SSH backend preview localhost proxy](https://github.com/NousResearch/hermes-agent/issues/91149)  
  远程开发体验问题，属于高频场景。

- **#91202** — [Approval workflow for memory/skill modifications](https://github.com/NousResearch/hermes-agent/issues/91202)  
  治理能力需求明显，适合纳入路线图评审。

> 结论：虽然“长期沉默”不明显，但**高优先级问题密度很高**，说明当前最需要的是继续压缩状态一致性、认证恢复和调度误判这三类风险。

---

## 总体判断

Hermes Agent 今天的项目状态可以概括为：  
**高活跃、强修复驱动、路线图逐渐平台化。**  
项目正从“功能可用”进一步走向“行为可信、状态可控、跨端一致”，这对一个 AI 智能体/个人助手开源项目来说，是非常健康的演进方向。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
**日期：2026-08-21**

## 1. 今日速览
过去 24 小时，NanoClaw 处于**高强度开发与集中修复**状态：共出现 1 条 Issue 更新和 50 条 PR 更新，说明仓库的工程活动非常活跃。  
其中 20 个 PR 已合并/关闭，30 个仍在待审，整体呈现出“**快速推进、但审查压力较大**”的特征。  
今天没有新版本发布，说明项目当前更偏向通过持续 PR 迭代修补 trunk、完善 Slack 体验和扩展工具链，而不是打标签发版。  
从内容看，当前健康度总体偏正向，但**Slack 相关行为修正**与**基础设施/兼容性修复**仍是主要风险集中区。

---

## 2. 项目进展
今天最有代表性的已合并/关闭 PR，主要推动了两条主线：**Slack 体验落地**与**核心 trunk 稳定性修复**。

- [#3421 docs+setup: announce one-click Slack agents](https://github.com/qwibitai/nanoclaw/pull/3421)  
  关闭。将“添加 Agent 到 Slack”的一键体验前置到 README/Setup 流程，降低新用户上手门槛。

- [#3404 setup: the managed Slack experience becomes the default](https://github.com/qwibitai/nanoclaw/pull/3404)  
  关闭。把托管式 Slack 体验设为默认，意味着项目在 Slack 场景下更接近“开箱即用”。

- [#3407 fix(permissions): assert the scope warning via its constant, not a copy of it](https://github.com/qwibitai/nanoclaw/pull/3407)  
  关闭。修正权限测试与警告断言，属于基础质量修复，减少回归噪音。

- [#3406 fix(slack-agent-flow): await the async DB helpers in orchestrate.test](https://github.com/qwibitai/nanoclaw/pull/3406)  
  关闭。修复异步 DB helper 在测试中的调用问题，提高 Slack agent flow 的测试可靠性。

- [#3405 Revert "feat(slack-agent-flow): carry the template ref through Slack creation"](https://github.com/qwibitai/nanoclaw/pull/3405)  
  关闭。回滚模板引用传播改动，说明该能力在当前阶段存在兼容性或行为风险。

**总体推进判断：**  
今天至少有 **5 个关键 PR** 直接落地或回滚，覆盖 Slack 创建流程、权限、测试与默认体验。  
这说明项目正在从“能工作”走向“**可交付、可维护、可规模化**”，但也表明 trunk 上的行为边界仍在快速校准中。

---

## 3. 社区热点
> 说明：当前数据中多数 PR 的评论数为 `undefined`，Issue/PR 的互动数据较少，因此**无法从评论/反应统计中确认真正的高讨论条目**。以下以“最具代表性的热点主题”代替传统热度排名。

### 热点 1：Slack 线程行为与权限配置
- [Issue #3369: mention-sticky engages without a mention](https://github.com/qwibitai/nanoclaw/issues/3369)
- [PR #3422: fix(router): mention-sticky subscribes on a mention, not on a session…](https://github.com/qwibitai/nanoclaw/pull/3422)
- [PR #3423: fix(add-slack): add missing app_mentions:read bot scope](https://github.com/qwibitai/nanoclaw/pull/3423)

**诉求解读：**  
用户/维护者明显在关注 Slack 场景下的“**只在被 mention 时才介入**”这一边界，以及事件订阅权限是否完整。  
这类问题直接影响机器人在群组中的“打扰度”和部署成功率，属于高优先级体验问题。

### 热点 2：一键 Slack Agent 上线体验
- [PR #3421: announce one-click Slack agents](https://github.com/qwibitai/nanoclaw/pull/3421)
- [PR #3404: the managed Slack experience becomes the default](https://github.com/qwibitai/nanoclaw/pull/3404)

**诉求解读：**  
仓库正在把 Slack 接入从“专家手工配置”推进到“**默认托管、一步创建**”。  
这通常意味着项目希望扩大可用人群，并降低安装与权限配置摩擦。

### 热点 3：大规模 trunk 修复与技能堆栈
- [PR #3408: fix: cross-cutting trunk repairs from the core-skills audit](https://github.com/qwibitai/nanoclaw/pull/3408)

**诉求解读：**  
#3408 作为基线修复分支，承载了大量后续堆叠 PR。  
这说明项目内部在做系统性审计，热点更多集中在“**修 trunk、修兼容、修测试**”，而不是单纯新增功能。

---

## 4. Bug 与稳定性
以下按影响严重程度排列，优先看“是否已有 fix PR”。

### 1) Slack 线程越权响应：未被 mention 也会进入对话
- [Issue #3369: mention-sticky engages without a mention](https://github.com/qwibitai/nanoclaw/issues/3369)  
**严重性：高**  
在 threaded Slack 场景下，`engage_mode: 'mention-sticky'` + `ignored_message_policy: 'accumulate'` 可能导致代理在**从未被 mention 的线程里回复**。这会破坏最核心的对话边界。  
**是否已有 fix PR：有** — [PR #3422](https://github.com/qwibitai/nanoclaw/pull/3422)

### 2) Slack 事件权限缺失，可能导致 app mention 订阅不可用
- [PR #3423: add missing app_mentions:read bot scope](https://github.com/qwibitai/nanoclaw/pull/3423)  
**严重性：高**  
这是部署/运行级问题：缺少 `app_mentions:read` 会让 `app_mention` 事件订阅不完整，进而影响 Slack Agent 的触发逻辑。  
**是否已有 fix PR：有** — 当前即为修复 PR（未合并）

### 3) clidash 刷新风暴导致超时/错误页
- [PR #3414: cap the refresh fan-out and repair the payload](https://github.com/qwibitai/nanoclaw/pull/3414)  
**严重性：中高**  
审计指出刷新并发过高，在低核机器上会引发大量 timeout，造成前端错误展示。  
**是否已有 fix PR：有** — [PR #3414](https://github.com/qwibitai/nanoclaw/pull/3414)

### 4) Vercel 安装流程中存在破坏性 rsync 风险
- [PR #3413: drop the destructive rsync, fix secret assignment, align guards](https://github.com/qwibitai/nanoclaw/pull/3413)  
**严重性：中高**  
这是偏运维/交付面的高风险问题，涉及覆盖技能发现 symlink、以及 secret 赋值逻辑。  
**是否已有 fix PR：有** — [PR #3413](https://github.com/qwibitai/nanoclaw/pull/3413)

### 5) macOS 状态栏服务标签与当前安装不一致
- [PR #3420: make Swift code and plist labels slug-aware](https://github.com/qwibitai/nanoclaw/pull/3420)  
**严重性：中**  
旧 label 逻辑会让状态栏盯错服务，表现为“界面存在但控制的不是当前实例”。  
**是否已有 fix PR：有** — [PR #3420](https://github.com/qwibitai/nanoclaw/pull/3420)

---

## 5. 功能请求与路线图信号
虽然今天没有看到明显的新版本，但从 Issue/PR 方向可以读出下一阶段路线图非常清晰。

### 1) Slack 能力继续是第一优先级
- [PR #3423: add missing app_mentions:read bot scope](https://github.com/qwibitai/nanoclaw/pull/3423)
- [PR #3422: mention-sticky subscribes on a mention, not on a session…](https://github.com/qwibitai/nanoclaw/pull/3422)
- [PR #3421: one-click Slack agents](https://github.com/qwibitai/nanoclaw/pull/3421)
- [PR #3404: managed Slack experience becomes the default](https://github.com/qwibitai/nanoclaw/pull/3404)

**信号：**  
Slack 不只是“支持一个集成”，而是项目正在把它塑造成**默认主要入口**。  
预计下一版本仍会优先围绕 Slack 触发条件、权限、创建流程与默认体验继续打磨。

### 2) 配置从全局硬编码转向“按组/按安装隔离”
- [PR #3415: move config onto the per-group MCP seam](https://github.com/qwibitai/nanoclaw/pull/3415)
- [PR #3416: per-group MCP seam, live config path](https://github.com/qwibitai/nanoclaw/pull/3416)
- [PR #3409: per-group base_url](https://github.com/qwibitai/nanoclaw/pull/3409)

**信号：**  
用户明显需要多实例、可迁移、可审计的配置模型。  
这类改动通常会进入下一轮稳定版本，因为它们影响的是项目的“运行范式”。

### 3) 工具链与生态扩展继续扩张
- [PR #3418: add-tavily-tool](https://github.com/qwibitai/nanoclaw/pull/3418)
- [PR #3417: add-dashboard](https://github.com/qwibitai/nanoclaw/pull/3417)
- [PR #3410: non-npm binary entries in cli-tools.json](https://github.com/qwibitai/nanoclaw/pull/3410)
- [PR #3412: add-karpathy-llm-wiki](https://github.com/qwibitai/nanoclaw/pull/3412)
- [PR #3411: add-mnemon](https://github.com/qwibitai/nanoclaw/pull/3411)

**信号：**  
NanoClaw 正在向“**可插拔工具平台**”演进，而不是只做一个单一 agent runtime。  
下一版本很可能会吸收一批工具型 PR，但前提是 trunk 基线先稳定。

---

## 6. 用户反馈摘要
> 说明：当前没有明显的评论串数据，因此以下摘要主要基于 Issue/PR 描述推断，属于“**问题陈述层面的用户反馈**”。

### 反馈 1：用户希望 agent 行为更可控，不能无提示介入
- [Issue #3369](https://github.com/qwibitai/nanoclaw/issues/3369)

**痛点：**  
在 Slack 线程中，用户期待“**没被点名就别说话**”，尤其在 `mention-sticky` 模式下更是如此。  
这说明用户关注的不是单纯响应能力，而是响应边界与对话礼仪。

### 反馈 2：Slack 接入门槛仍偏高
- [PR #3421](https://github.com/qwibitai/nanoclaw/pull/3421)
- [PR #3423](https://github.com/qwibitai/nanoclaw/pull/3423)

**痛点：**  
一键创建、权限 scope 补齐，说明用户希望“**少手工步骤、少踩权限坑**”。  
这通常来自首次安装或跨 workspace 部署的真实摩擦。

### 反馈 3：多安装/多 group 运维场景更常见
- [PR #3415](https://github.com/qwibitai/nanoclaw/pull/3415)
- [PR #3416](https://github.com/qwibitai/nanoclaw/pull/3416)
- [PR #3420](https://github.com/qwibitai/nanoclaw/pull/3420)

**痛点：**  
用户并不只是在单机上跑一个实例，而是在多安装、按组、容器化的场景中使用。  
因此他们对“路径正确、标签正确、配置隔离正确”非常敏感。

---

## 7. 待处理积压
当前没有明显“长期未响应”的老 Issue（本次数据里最新 Issue/PR 都是 **2026-08-20** 创建，距离日报只有 1 天），但有几类**高优先级待处理积压**值得维护者立即关注：

### 1) Slack 相关修复链需要联动处理
- [Issue #3369](https://github.com/qwibitai/nanoclaw/issues/3369)
- [PR #3422](https://github.com/qwibitai/nanoclaw/pull/3422)
- [PR #3423](https://github.com/qwibitai/nanoclaw/pull/3423)

**原因：**  
它们分别覆盖行为正确性和权限完整性，建议作为一个小批次一起审。

### 2) 大型 trunk 基线分支是当前最主要的隐性积压中心
- [PR #3408](https://github.com/qwibitai/nanoclaw/pull/3408)

**原因：**  
#3408 上堆叠了大量后续 PR。只要基线不稳定，后面的能力就会持续排队。  
从项目治理角度看，这类“大底座 PR”是最需要维护者集中处理的部分。

### 3) 当前仍有 30 个 PR 待合并/关闭，审查压力较大
- [PR 列表总览](https://github.com/qwibitai/nanoclaw/pulls)

**原因：**  
今天的 PR 更新量很高，但关闭/合并比例仍不足以完全消化新增流量。  
如果接下来几天继续保持这个节奏，review 带宽可能成为实际瓶颈。

---

## 总体判断
NanoClaw 今天展现出明显的**高活跃、快迭代**特征：Slack 相关体验正在变成产品主轴，trunk 级修复也在系统性推进。  
项目目前的最大优势是开发热度高、问题修复速度快；最大挑战则是**并行 PR 过多、底座分支过重、行为边界仍在快速收敛**。  
如果接下来能尽快收敛 #3408 这类基线分支，并优先合并 Slack 行为/权限修复，项目健康度会进一步提升。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-08-21）

## 1) 今日速览
过去 24 小时，IronClaw 处于**高活跃、工程推进明显**的状态：共有 **14 条 Issues 更新**、**15 条 PR 更新**，其中 **8 个 PR 已合并/关闭**，且**没有新版本发布**。从内容看，今天的工作重心集中在 **Agent 生命周期扩展、LLM 稳定性、WebUI 体验治理、sandbox/CI 基础设施整治** 四条主线。  
整体判断：项目健康度不错，且正在从“修问题”走向“补基础能力与架构边界”的阶段，但核心系统仍有若干高优先级可靠性议题待处理。  
- Issues：<https://github.com/nearai/ironclaw/issues>  
- PRs：<https://github.com/nearai/ironclaw/pulls>

---

## 2) 项目进展
今天最重要的前向推进，主要体现在以下已关闭/合并 PR：

1. **修复 OpenAI 结构化输出建议生成问题**
   - PR：[#7786](https://github.com/nearai/ironclaw/pull/7786)
   - 影响：修复 suggestion generation 在 OpenAI 模型上的失效问题，顺手清理 dead allowlist ids，并让 gate cards 仅在已连接扩展上出现。
   - 意义：属于面向用户可见的功能修复，能直接减少配置/推荐链路上的失败。

2. **Rust 1.98 / Clippy 迁移，恢复 CI 健康**
   - PR：[#7778](https://github.com/nearai/ironclaw/pull/7778)、[#7777](https://github.com/nearai/ironclaw/pull/7777)
   - 影响：清理新 lint 触发的全仓告警，解决浮动 stable 升级导致的 CI 红灯。
   - 意义：对持续交付非常关键，属于“基础设施稳定性回补”。

3. **运行时诊断堆栈控制**
   - PR：[#7761](https://github.com/nearai/ironclaw/pull/7761)
   - 影响：为 provider-auth 错误路径限制诊断堆栈体积，降低异常传播成本，同时保留关键可观测信息。
   - 意义：减少错误对象膨胀，提升运行时健壮性。

4. **sandbox 方向的结构性重构**
   - PR：[#7764](https://github.com/nearai/ironclaw/pull/7764)
   - 影响：引入 per-user 持久容器 + Docker Exec 方案，替代每次命令都重建容器。
   - 意义：这是 sandbox 体验和性能的重要台阶，说明项目在“可用性/成本”上持续优化。

5. **Subagent 设计文档收敛**
   - PR：[#7763](https://github.com/nearai/ironclaw/pull/7763)
   - 影响：将分散、互相冲突的多份设计文档收敛为单一 canonical README。
   - 意义：降低设计认知成本，利于后续多人协作和规范化演进。

6. **Turn / subagent 词汇体系去重**
   - PR：[#7758](https://github.com/nearai/ironclaw/pull/7758)
   - 影响：删除重复的结构性类型，保持行为不变。
   - 意义：为后续生命周期/turn 体系扩展打基础。

7. **代码库知识图谱刷新**
   - PR：[#7759](https://github.com/nearai/ironclaw/pull/7759)
   - 影响：更新代码库内置记忆快照。
   - 意义：偏 CI/知识基础设施维护，对智能体辅助开发链路有支撑作用。

**总体推进量化：**
- 今天已有 **8 个 PR 处于已合并/关闭状态**，说明维护节奏较快；
- 变更覆盖了 **功能修复、CI 稳定性、运行时安全、sandbox 架构、文档治理**；
- 从项目健康度看，当前不是“单点救火”，而是“多线并行补基础”的阶段。

---

## 3) 社区热点
### 热点 1：Agent 生命周期 Hook 扩展
- Issue：[#7770](https://github.com/nearai/ironclaw/issues/7770)
- 讨论热度：**3 条评论**，是今天最活跃的 Issue。
- 诉求分析：希望把 `after-turn`、`before-turn`、`compaction`、`tool-result` 等时刻纳入 hook seam，让“当 X 发生时执行 Y”从核心引擎改动，变成 hook 注册。
- 背后需求：这是典型的**平台可扩展性诉求**，目标是减少对核心引擎的侵入式修改。

### 热点 2：LLM 超时与重试预算问题
- Issue：[#7783](https://github.com/nearai/ironclaw/issues/7783)
- 讨论热度：1 条评论。
- 诉求分析：finalization 阶段使用非流式 HTTP 客户端，导致 TTFT 无法测量，且重试预算无法覆盖 deadline，最终可能因单次传输卡顿让整个运行失败。
- 背后需求：关注的是**推理链路的 deadline 可靠性**，这类问题通常直接影响线上成功率。

### 热点 3：WebUI 设计系统与治理
- Issue：[#7781](https://github.com/nearai/ironclaw/issues/7781)
- 讨论热度：1 条评论。
- 诉求分析：Design System phases 2–3，涉及 DESIGN.md 治理与主题/UI 重绘。
- 背后需求：表明团队正在推进**产品外观一致性与设计系统规范化**。

### 其他观察
- 今天未看到明显高 reaction 的单条讨论，说明社区反馈主要还是**工程驱动型讨论**，而非广泛外部互动型传播。
- PR 层面虽然有 15 条更新，但未提供评论数，无法据此判定“最热 PR”。

---

## 4) Bug 与稳定性
按影响面和风险从高到低整理如下：

### 1. LLM 超时策略缺陷：finalization 无法测 TTFT，重试预算也撑不住截止时间
- Issue：[#7783](https://github.com/nearai/ironclaw/issues/7783)
- 严重度：**中等偏高**
- 风险点：一次 transport stall 可能把整个 finalization 流程拖死，属于直接影响成功率的稳定性问题。
- 状态：**暂无明确 fix PR 在今日列表中**。

### 2. `memory.write` 全文重写可能静默覆盖并发写
- Issue：[#7776](https://github.com/nearai/ironclaw/issues/7776)
- 严重度：**高**
- 风险点：虽然 CAS 能防 torn write，但不能防止“语义层面的并发覆盖”，这会造成数据一致性风险。
- 状态：**暂无明确 fix PR 在今日列表中**。

### 3. Extension setup 阶段/阻塞信息在 Configure 中暴露不全
- Issue：[#7769](https://github.com/nearai/ironclaw/issues/7769)
- 严重度：**中等**
- 风险点：可能让 UI 错误地显示“无需配置”，影响扩展接入流程。
- 对应修复 PR：[#7772](https://github.com/nearai/ironclaw/pull/7772)

### 4. Automation presenter 日期断言受时区影响
- Issue：[#7767](https://github.com/nearai/ironclaw/issues/7767)
- 严重度：**低到中等**
- 风险点：测试在 Asia/Shanghai 等时区可能失败，属于典型的环境相关回归。
- 对应修复 PR：[#7774](https://github.com/nearai/ironclaw/pull/7774)

### 5. OpenAI 结构化建议生成失效
- PR：[#7786](https://github.com/nearai/ironclaw/pull/7786)
- 严重度：**高（已修）**
- 风险点：`uniqueItems` 导致 OpenAI strict structured output 校验失败。
- 状态：**今天已有修复 PR 关闭**，属于已被处理的稳定性事件。

---

## 5) 功能请求与路线图信号
从今天新增/活跃的 Issues 和 PR 组合看，下一版本很可能会围绕以下方向收敛：

### 1. Agent 生命周期 Hook 平台化
- 代表 Issue：[#7770](https://github.com/nearai/ironclaw/issues/7770)
- 相关跟进：[#7780](https://github.com/nearai/ironclaw/issues/7780)、[#7775](https://github.com/nearai/ironclaw/issues/7775)、[#7760](https://github.com/nearai/ironclaw/issues/7760)
- 预测：这是**最像下一阶段主线功能**的方向，且已经拆成可逐步落地的 phase。

### 2. WebUI 设计系统与界面治理
- 代表 Issues：[#7781](https://github.com/nearai/ironclaw/issues/7781)、[#7782](https://github.com/nearai/ironclaw/issues/7782)、[#7768](https://github.com/nearai/ironclaw/issues/7768)
- 相关 PR：[#7772](https://github.com/nearai/ironclaw/pull/7772)、[#7773](https://github.com/nearai/ironclaw/pull/7773)、[#7774](https://github.com/nearai/ironclaw/pull/7774)
- 预测：很可能进入**下一次产品性迭代**，优先解决配置可理解性和信息架构冗余。

### 3. Sandbox / 网络隔离与托管代理
- 代表 PR：[#7779](https://github.com/nearai/ironclaw/pull/7779)
- 预测：这是 XL 级别变更，若继续推进，可能成为**更大版本中的安全与隔离重点**。

### 4. MCP / capability policy 细化
- 代表 PR：[#7762](https://github.com/nearai/ironclaw/pull/7762)
- 预测：围绕 hosted MCP、allowlist、network policy 的精细化控制，属于**平台能力完善**方向。

### 5. 更强的运行时鲁棒性
- 代表 Issues：[#7783](https://github.com/nearai/ironclaw/issues/7783)、[#7776](https://github.com/nearai/ironclaw/issues/7776)
- 预测：这些问题虽不一定都属于“新功能”，但会显著影响下一版本的稳定性与可用性门槛。

---

## 6) 用户反馈摘要
从 Issues 的表述可以提炼出几类非常明确的“真实痛点”：

1. **希望扩展系统更可编排，而不是改核心**
   - 代表：[#7770](https://github.com/nearai/ironclaw/issues/7770)
   - 反馈本质：用户/开发者希望把行为插桩、后处理、补偿逻辑抽成 hook，而不是直接侵入 agent engine。

2. **希望失败路径更可控、更可恢复**
   - 代表：[#7783](https://github.com/nearai/ironclaw/issues/7783)、[#7775](https://github.com/nearai/ironclaw/issues/7775)
   - 反馈本质：终端失败不应因为某个阶段性超时或 gate 而过早 abort，尤其是后台或无绑定运行场景。

3. **希望并发写入有更明确的安全语义**
   - 代表：[#7776](https://github.com/nearai/ironclaw/issues/7776)
   - 反馈本质：CAS 不等于业务安全，用户关心的是“最终写入是否会悄悄覆盖别人”。

4. **希望 UI 能准确表达配置状态**
   - 代表：[#7769](https://github.com/nearai/ironclaw/issues/7769)、[#7768](https://github.com/nearai/ironclaw/issues/7768)
   - 反馈本质：配置流程如果漏展示 blockers，用户会误判“无需配置”，降低成功接入率。

5. **希望测试和表现对环境变化更稳健**
   - 代表：[#7767](https://github.com/nearai/ironclaw/issues/7767)
   - 反馈本质：跨时区、跨环境一致性是工程成熟度的重要指标。

---

## 7) 待处理积压
今天的数据里没有明显“沉默多日、长期未响应”的老单，但有几类**高复杂度、值得维护者优先盯住的 open 项**：

### 1. 仍在推进中的主线 Epic：Agent 生命周期 Hook 扩展
- Issue：[#7770](https://github.com/nearai/ironclaw/issues/7770)
- 原因：牵涉核心引擎可扩展性，且有多条 phase follow-up，建议持续跟踪。

### 2. 高风险稳定性问题：LLM timeout policy
- Issue：[#7783](https://github.com/nearai/ironclaw/issues/7783)
- 原因：直接影响推理链路成功率和用户感知稳定性。

### 3. 并发一致性风险：memory.write 覆盖问题
- Issue：[#7776](https://github.com/nearai/ironclaw/issues/7776)
- 原因：这是数据一致性层面的核心风险，建议尽快明确修复策略。

### 4. 大体量 sandbox 安全变更
- PR：[#7779](https://github.com/nearai/ironclaw/pull/7779)
- 原因：XL、跨域、涉及安全与基础设施，适合安排专人持续 review。

### 5. WebUI 产品化治理链路
- Issues/PR：[#7781](https://github.com/nearai/ironclaw/issues/7781)、[#7782](https://github.com/nearai/ironclaw/issues/7782)、[#7772](https://github.com/nearai/ironclaw/pull/7772)、[#7773](https://github.com/nearai/ironclaw/pull/7773)
- 原因：产品体验类任务通常容易碎片化，建议维持统一设计口径与验收标准。

---

## 总体结论
IronClaw 今天呈现出**“高强度工程推进 + 中长期架构补课”**的典型特征：一边通过 CI/lint、runtime diagnostics、sandbox 方案把底座打稳，一边在 agent lifecycle、WebUI 设计系统、MCP policy 上补齐平台能力。  
从健康度看，项目是**活跃且前进明确**的；从风险看，仍需重点关注 **LLM 超时、memory 并发写、sandbox 安全边界** 这三类高影响问题。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-08-21）

## 1) 今日速览
过去 24 小时内，Moltis **没有新增或关闭 Issues**，说明用户侧显性故障与反馈压力较低，整体社区噪音不高。与此同时，**有 3 个 PR 处于开放状态**，并且**发布了 1 个新版本**，表明项目开发仍在持续推进。当前变更主题集中在**安全加固**与**消息输出体验修复**，属于对稳定性和可用性都较关键的方向。  
从活跃度看，项目呈现出“**低问题暴露、持续工程推进**”的健康状态；但由于今日没有合并落地的 PR，主干代码层面的净进展暂时还未兑现。  
- 仓库主页：<https://github.com/moltis-org/moltis>

---

## 2) 版本发布
### 新版本：`20260820.01`
- Release：<https://github.com/moltis-org/moltis/releases/tag/20260820.01>

**基于当前数据可确认的信息：**
- 今日存在 1 个新版本发布，版本号为 `20260820.01`。
- 但当前数据**未提供发布说明、changelog、commit diff 或 breaking change 标记**，因此无法可靠判断本次版本具体包含哪些功能/修复。

**迁移与风险提示：**
- 由于缺少 release notes，暂时**无法确认是否存在破坏性变更**。
- 建议维护者补充：变更摘要、影响面、升级步骤、回滚建议。
- 若该版本与当日开放 PR 有关联，可能主要围绕安全与消息渲染改动，但**这一点在现有数据中不能确认**。

---

## 3) 项目进展
今日**没有已合并或已关闭的重要 PR**，因此主干分支没有直接落地的新能力或修复。  
不过，3 个开放 PR 显示项目仍在多个关键方向上推进，尤其集中在：

1. **Web 端 sandbox/image 输入校验**  
   - PR：#1222  
   - 链接：<https://github.com/moltis-org/moltis/pull/1222>  
   - 作用：对容器镜像引用、package 名称做校验，并限制部分操作仅管理员可用，偏向安全与滥用防护。

2. **Gateway 侧 Snyk Agent Scan 固定版本**  
   - PR：#1221  
   - 链接：<https://github.com/moltis-org/moltis/pull/1221>  
   - 作用：锁定安全扫描工具版本，降低供应链风险，属于基础设施层面的稳健性增强。

3. **WhatsApp 消息 Markdown 渲染**  
   - PR：#1220  
   - 链接：<https://github.com/moltis-org/moltis/pull/1220>  
   - 作用：提升模型输出到 WhatsApp 的展示一致性，属于面向用户的交互体验修复。

**整体推进判断：**
- 今日没有“已落地”的进展，但有 **3 条并行推进中的变更线**。
- 从主题看，项目正在同时强化：**安全性、供应链防护、跨渠道消息兼容性**。
- 若这些 PR 顺利合并，下一阶段对项目健康度的实际提升会比较明显。

---

## 4) 社区热点
今天**没有 Issues 活跃**，且现有 PR 的评论数/反应数在数据中均显示为 **0 或未提供**，因此严格来说**没有形成明显的社区讨论热点**。  
但从主题优先级看，以下三项最值得关注：

- **#1222 fix(web): validate sandbox image requests**  
  链接：<https://github.com/moltis-org/moltis/pull/1222>  
  背后诉求：防止不受信任的镜像/包输入进入容器构建流程，降低误用和潜在安全风险。

- **#1221 fix(gateway): pin Snyk Agent Scan**  
  链接：<https://github.com/moltis-org/moltis/pull/1221>  
  背后诉求：锁定扫描工具版本，减少依赖链变化带来的不可控风险，偏安全治理。

- **#1220 fix(whatsapp): render Markdown in outbound messages**  
  链接：<https://github.com/moltis-org/moltis/pull/1220>  
  背后诉求：让模型生成内容在 WhatsApp 端更符合预期格式，减少用户侧“看起来不对”的问题。

**结论：**
- 当前“热点”不是讨论热，而是**工程优先级热**：安全与发送体验是最集中关注点。
- 社区活跃度偏低，但研发动作连续，说明项目更多处于执行推进期，而不是问题爆发期。

---

## 5) Bug 与稳定性
今日**没有新增 Bug Issues**，也没有可见的崩溃、回归或 P0/P1 级故障报告。  
但从开放 PR 中可以看出，维护者正在主动处理几类稳定性风险：

### 高优先级风险
- **#1222 fix(web): validate sandbox image requests**  
  链接：<https://github.com/moltis-org/moltis/pull/1222>  
  风险类型：输入校验不足、潜在安全边界问题、容器/构建流程滥用。  
  状态：已有 fix PR，但仍为 OPEN，尚未合并。

### 中优先级风险
- **#1221 fix(gateway): pin Snyk Agent Scan**  
  链接：<https://github.com/moltis-org/moltis/pull/1221>  
  风险类型：供应链不确定性、工具版本漂移、扫描链路稳定性。  
  状态：已有 fix PR，但仍为 OPEN，尚未合并。

### 中低优先级体验问题
- **#1220 fix(whatsapp): render Markdown in outbound messages**  
  链接：<https://github.com/moltis-org/moltis/pull/1220>  
  风险类型：展示不一致、消息格式损坏、用户理解偏差。  
  状态：已有 fix PR，但仍为 OPEN，尚未合并。

**当前判断：**
- 没有“已确认”的生产事故迹象；
- 但 PR 方向显示项目在主动压制潜在稳定性与安全风险，这对长期健康度是正向信号。

---

## 6) 功能请求与路线图信号
今日没有新增 Issues，因此**没有直接可见的新功能请求**。  
不过，已有 PR 反映出清晰的路线图信号：

1. **更强的输入校验与权限收敛**
   - PR：#1222  
   - 链接：<https://github.com/moltis-org/moltis/pull/1222>  
   - 信号：未来版本可能会更强调“默认安全”，尤其是高风险操作的权限边界。

2. **持续强化安全供应链**
   - PR：#1221  
   - 链接：<https://github.com/moltis-org/moltis/pull/1221>  
   - 信号：维护者可能会继续推动工具链锁定、扫描流程规范化。

3. **多渠道消息渲染一致性**
   - PR：#1220  
   - 链接：<https://github.com/moltis-org/moltis/pull/1220>  
   - 信号：WhatsApp 等渠道的输出格式兼容性，可能是下一版本的用户体验重点。

**哪些更可能进入下一版本：**
- 如果按风险收益比排序，**#1220** 更像面向用户的可感知改进；
- **#1222 / #1221** 更像高优先级基础治理项，通常也更容易被纳入近期版本。

---

## 7) 用户反馈摘要
由于今日 **Issues 为 0，且没有可见评论讨论**，因此无法从真实评论中抽取出明确的用户满意/不满意结论。  
但从现有 PR 主题，可以间接看出用户或维护者正在解决的痛点：

- **消息展示不符合预期**
  - 关联 PR：#1220  
  - 链接：<https://github.com/moltis-org/moltis/pull/1220>  
  - 典型场景：模型生成 Markdown 后，在 WhatsApp 渠道中需要转成原生可读格式，否则用户会看到混乱排版。

- **输入不够安全/可控**
  - 关联 PR：#1222  
  - 链接：<https://github.com/moltis-org/moltis/pull/1222>  
  - 典型场景：sandbox 或容器构建流程对镜像、包名等输入需要更严格约束。

- **安全扫描依赖不稳定**
  - 关联 PR：#1221  
  - 链接：<https://github.com/moltis-org/moltis/pull/1221>  
  - 典型场景：安全扫描工具链如果不锁定版本，可能带来结果不稳定或供应链风险。

**结论：**
- 当前缺少直接用户评论样本，所以反馈分析更偏“问题信号归纳”；
- 但这些信号说明项目正在修复**体验一致性**与**安全边界**两类关键痛点。

---

## 8) 待处理积压
从现有数据看，**没有长期未响应的重要 Issues**，因为今日 Issues 为空。  
不过，当前仍有 **3 个开放 PR** 需要维护者跟进，建议尽快进入 review/merge 决策：

- **#1222 fix(web): validate sandbox image requests**  
  <https://github.com/moltis-org/moltis/pull/1222>

- **#1221 fix(gateway): pin Snyk Agent Scan**  
  <https://github.com/moltis-org/moltis/pull/1221>

- **#1220 fix(whatsapp): render Markdown in outbound messages**  
  <https://github.com/moltis-org/moltis/pull/1220>

**维护建议：**
- 若资源有限，建议优先审查 **安全相关 PR（#1222、#1221）**；
- 其次处理 **用户可感知的体验修复（#1220）**；
- 目前没有明显的 Issue 积压压力，但 PR 积压已进入需要关注的范围。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合邮件推送的简版**  
2. **适合飞书/企微的卡片版**  
3. **适合管理层阅读的“风险-进展-结论”三段式版本**

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下是基于 **过去 24 小时 CoPaw / agentscope-ai/QwenPaw** GitHub 活动整理的 **2026-08-21 项目动态日报**。

---

## 1. 今日速览

过去 24 小时内，项目保持了**较高活跃度**：Issues 更新 12 条、PR 更新 19 条，并且还有 **1 个新版本发布**。从内容看，今天的工作重心明显分成两条线：一是**发布与工程质量**，包括依赖修复、E2E/CI 稳定性、桌面端打包与 release 管线调整；二是**产品体验与能力扩展**，集中在 Console、技能系统、MCP/OAuth、频道消息与会话上下文等方向。  
社区侧新增需求明显偏向“**更强的可配置性**”和“**更细的会话/上下文隔离**”，说明项目正在从基础可用走向更复杂的生产场景。  
整体判断：**项目健康度良好，迭代节奏快，且问题反馈与修复响应较同步**。  
GitHub：<https://github.com/agentscope-ai/QwenPaw>

---

## 2. 版本发布

### 新版本：v2.1.1-beta.1
Release：<https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.1-beta.1>

从当前可见 release notes 片段看，本次 beta 版本至少包含以下更新：

- `feat(console): improve editor tab overflow navigation`
  - 改善 Console 编辑器标签页溢出场景下的导航体验。
- `fix(providers): lower rate limiter init log level`
  - 调低 provider 侧 rate limiter 初始化日志级别，减少噪音。
- `chore: update release notes ...`
  - 发布说明同步更新。

### 影响判断
- **未看到明确破坏性变更**，更像是一次以体验优化和发布稳定性为主的 beta 版本。
- 由于是 **beta**，建议在升级后重点验证：
  - Console 标签页/编辑器交互；
  - provider 初始化日志与监控规则；
  - 与 release-duty / 安装验证相关的环境兼容性。

### 迁移注意事项
- 如果你们依赖初始化日志做告警或审计，注意 rate limiter 日志级别变更后，原先规则可能需要微调。
- beta 版本建议先在测试或灰度环境验证，尤其是桌面端、MCP、频道接入和 Console 场景。

---

## 3. 项目进展

今天已合并/关闭的 PR 中，比较关键的推进主要集中在以下几类：

### 3.1 发布与依赖安全
- **#7172** [chore(deps): patch vulnerable website and creator dependencies]  
  <https://github.com/agentscope-ai/QwenPaw/pull/7172>  
  更新网站与 Creator 端依赖，覆盖 `vite`、`rollup`、`react-router-dom`、`js-yaml` 等，属于明显的安全与维护性升级。
- **#7160** [fix(release): exclude datapaw from the main plugin pack step]  
  <https://github.com/agentscope-ai/QwenPaw/pull/7160>  
  修复主发布流水线被 datapaw 误阻塞的问题，属于典型的 release 阻断修复。

### 3.2 桌面端 / MCP / 打包链路
- **#7170** [fix(desktop): launch bundled qwenpawmail MCP]  
  <https://github.com/agentscope-ai/QwenPaw/pull/7170>  
  修复桌面端打包后的 `qwenpawmail` MCP 启动问题。
- **#7166** [fix(release): bundle qwenpawmail MCP as a standalone sidecar]  
  <https://github.com/agentscope-ai/QwenPaw/pull/7166>  
  继续强化邮件 MCP 的独立 sidecar 打包方式。
- **#7164** [ci: extend macOS setuptools<82 pin ...]  
  <https://github.com/agentscope-ai/QwenPaw/pull/7164>  
  将 macOS 构建约束扩展到更多测试工作流，减少平台差异导致的失败。

### 3.3 Console 体验与性能
- **#7165** [fix(console): hide grep badge for no matches]  
  <https://github.com/agentscope-ai/QwenPaw/pull/7165>  
  修正 grep 无结果时仍显示误导性 badge 的问题。
- **#7176** [perf(console): keep long chat sessions responsive]  
  <https://github.com/agentscope-ai/QwenPaw/pull/7176>  
  针对长会话、流式输出、Markdown 历史渲染做性能优化，直接改善前端响应性。
- **#7175** [fix(console): restore complete free model listings]  
  <https://github.com/agentscope-ai/QwenPaw/pull/7175>  
  修复免费模型列表展示不完整的问题。

### 3.4 测试与 CI 稳定性
- **#7174** [perf(drivers): initialize persistent drivers concurrently]  
  <https://github.com/agentscope-ai/QwenPaw/pull/7174>  
  并发初始化 persistent drivers，缩短冷启动时间。
- **#7173** [fix(e2e): re-anchor agents action cells ...]  
  <https://github.com/agentscope-ai/QwenPaw/pull/7173>  
  纯测试侧修复，解决列顺序变化导致的 e2e 脆弱性。
- **#7171** [test(console): fix web search config modal save race]  
  <https://github.com/agentscope-ai/QwenPaw/pull/7171>  
  修复测试中的保存竞态。
- **#7157** [fix(e2e): dismiss Try Desktop Mode onboarding overlay before tests]  
  <https://github.com/agentscope-ai/QwenPaw/pull/7157>  
  解决桌面模式引导层遮挡测试的问题。
- **#7155** [test(unit): widen timing tolerance for flaky sandbox offload test]  
  <https://github.com/agentscope-ai/QwenPaw/pull/7155>  
  提升单测对时序抖动的容忍度。

### 今日整体推进量
今天的合并/关闭 PR 明显偏“**工程治理**”导向：  
- 解决了 **发布阻塞**；
- 修复了 **桌面端/MCP 打包链路**；
- 优化了 **Console 性能与交互**；
- 加固了 **CI/E2E/单测稳定性**。  

这类更新不会像大功能那样在界面上立刻显眼，但对项目的长期健康度非常关键——可以判断今天的推进属于**“稳住底盘并清理技术债”**，对后续版本发布质量有直接贡献。  
PR 列表总入口：<https://github.com/agentscope-ai/QwenPaw/pulls>

---

## 4. 社区热点

### 热点 1：流式输出中途断连导致 UNKNOWN_AGENT_ERROR
- Issue：**#7162** [bug] 流式输出中途 `httpx.ReadError` 导致偶发 `UNKNOWN_AGENT_ERROR`  
  <https://github.com/agentscope-ai/QwenPaw/issues/7162>
- 评论数：2
- 诉求分析：
  - 用户遇到的是**高感知度的对话中断问题**，影响实际使用连续性；
  - 根因指向 SSE 流式读取阶段的连接断开，说明不是简单的请求失败，而是**输出过程中断流**；
  - 用户已经给出较完整的根因判断，表明这类反馈偏“技术型用户深挖”的真实痛点。
- 热点意义：这是典型的“**线上偶发、难复现、但体验杀伤力大**”问题，值得优先排查重试策略与错误映射逻辑。

### 热点 2：Embedding health check 超时且配置不可调
- Issue：**#7156** [bug] embedding health check 在后端已预热时仍超时  
  <https://github.com/agentscope-ai/QwenPaw/issues/7156>
- 评论数：2
- 诉求分析：
  - 用户明确指出：后端已 warm，但健康检查仍超时，导致检索降级为 BM25-only；
  - 这类问题直接影响**召回质量**，属于“功能能跑，但效果明显退化”的问题；
  - 还暴露出超时硬编码、缺少配置入口的问题，属于产品化能力不足。
- 热点意义：用户关注的不只是“能不能用”，而是“**可不可以按我的环境调优**”。

### 其他值得关注的活跃需求
- **#7185** 文档补充 OAuth setup：<https://github.com/agentscope-ai/QwenPaw/issues/7185>
- **#7182** workspace-scoped always-on Skills：<https://github.com/agentscope-ai/QwenPaw/issues/7182>
- **#7181** 支持 Qwen_Code third-party agent harness：<https://github.com/agentscope-ai/QwenPaw/issues/7181>
- **#7179** 优化智能体切换：<https://github.com/agentscope-ai/QwenPaw/issues/7179>

这些需求反映的共同方向是：**用户正在把 CoPaw 用到更复杂、更专业化的工作流里**，因此对配置灵活度、上下文隔离和外部系统接入能力要求更高。

---

## 5. Bug 与稳定性

按严重程度大致排序如下：

### 1）高：流式输出中途断连引发 UNKNOWN_AGENT_ERROR
- Issue：<https://github.com/agentscope-ai/QwenPaw/issues/7162>
- 现象：SSE 流式输出中途抛出 `httpx.ReadError` / `httpcore.ReadError`
- 影响：
  - 对话中途失败；
  - 用户可见为错误卡片；
  - 直接影响核心聊天体验。
- 是否已有 fix PR：**当前数据中未看到对应修复 PR**。  
  建议关注重试策略是否遗漏 `ReadError` 类别。

### 2）高：Embedding health check 超时导致召回降级
- Issue：<https://github.com/agentscope-ai/QwenPaw/issues/7156>
- 现象：后端已 warm，健康检查仍因硬编码 5s timeout 失败
- 影响：
  - 检索从 embedding+recall 降级为 BM25-only；
  - 影响回答质量与语义召回。
- 是否已有 fix PR：**未见对应修复 PR**。  
  建议尽快把 timeout 参数化，并检查健康检查调用链的阻塞点。

### 3）中高：历史库膨胀到 7.6G，重复落库
- Issue：<https://github.com/agentscope-ai/QwenPaw/issues/7168>
- 现象：`history.db` 因 `recall_history` / `expand` 与完整工具输出落库而迅速膨胀
- 影响：
  - 长期运行成本高；
  - 存储膨胀、IO 压力、备份困难；
  - 可能逐步演化成稳定性问题。
- 是否已有 fix PR：**未见对应修复 PR**。

### 4）中：release 验证/安装流程本身仍在跑通中
- Issue：<https://github.com/agentscope-ai/QwenPaw/issues/7180>
- 这是 release-duty 自动化验证，不是产品 bug，但说明新版本发布后仍需做平台安装检验。

### 稳定性侧的积极信号
- 已合并的 **#7174、#7173、#7171、#7157、#7155、#7164** 等，说明团队在持续补强：
  - 启动性能；
  - 测试脆弱性；
  - 平台兼容性；
  - 发布管线稳定性。  

这类 PR 虽不直接修复用户可见 bug，但能显著降低后续回归概率。

---

## 6. 功能请求与路线图信号

今天新增的功能需求整体非常“路线图友好”，且有几项已经出现了对应实现 PR，说明社区诉求与开发方向正在对齐。

### 1）workspace-scoped always-on Skills
- Issue：**#7182** <https://github.com/agentscope-ai/QwenPaw/issues/7182>
- 对应 PR：**#7183** <https://github.com/agentscope-ai/QwenPaw/pull/7183>
- 路线图判断：**极大概率进入下一版本**
- 原因：
  - 需求明确；
  - 有配套 PR；
  - 这类能力对“专用智能体”非常关键。

### 2）Session thinking 分级与模型管理细化
- PR：**#7163** <https://github.com/agentscope-ai/QwenPaw/pull/7163>
- 路线图判断：**很可能继续推进**
- 关联信号：
  - 用户开始需要更细粒度控制模型/推理行为；
  - 与会话级上下文控制、跨设备同步的诉求一致。

### 3）Agent-level cross-session recall toggle
- Issue：**#7184** <https://github.com/agentscope-ai/QwenPaw/issues/7184>
- 路线图判断：**值得进入设计评审**
- 价值：
  - 让新会话可选择是否跨 session recall；
  - 在“可记忆”与“可隔离”之间提供更精细控制。
- 这和 #7182 一起说明：用户越来越关注**工作区级行为配置**。

### 4）支持 Qwen_Code 作为 third-party agent harness
- Issue：**#7181** <https://github.com/agentscope-ai/QwenPaw/issues/7181>
- 路线图判断：**中期可能性较高**
- 原因：
  - 属于外部 harness 扩展；
  - 面向特定网络/部署约束场景，实际价值明确。

### 5）频道/群聊能力增强
- QQ 主动发消息+定时任务：**#7159** <https://github.com/agentscope-ai/QwenPaw/issues/7159>
- DingTalk 群聊上下文模式：**#7158** <https://github.com/agentscope-ai/QwenPaw/issues/7158>
- 路线图判断：**如果频道产品线继续扩张，这两项都很值得排期**
- 含义：
  - 用户希望在群聊场景里支持更灵活的会话隔离、共享模式与主动推送能力；
  - 说明项目正在进入“企业协作机器人”更深层使用场景。

### 6）Agent 切换 UX 优化
- Issue：**#7179** <https://github.com/agentscope-ai/QwenPaw/issues/7179>
- 路线图判断：**短期 UX 优化候选**
- 原因：属于高频操作效率问题，尤其在 agent 数量增长后更明显。

---

## 7. 用户反馈摘要

从 Issues 里的描述可以提炼出几类非常真实的用户痛点：

### 1）“能跑，但不够稳”
- 代表反馈：
  - 流式输出中途断连导致错误卡片：<https://github.com/agentscope-ai/QwenPaw/issues/7162>
  - Embedding warm 后仍超时：<https://github.com/agentscope-ai/QwenPaw/issues/7156>
- 用户诉求：
  - 希望核心链路更抗抖；
  - 希望异常能自动重试、降级可控，而不是直接中断体验。

### 2）“能用，但不够可调”
- 代表反馈：
  - embedding timeout 硬编码：<https://github.com/agentscope-ai/QwenPaw/issues/7156>
  - cross-session recall toggle：<https://github.com/agentscope-ai/QwenPaw/issues/7184>
- 用户诉求：
  - 需要把底层行为暴露为配置项；
  - 不同 workspace / agent / channel 希望有不同策略。

### 3）“数据越跑越大，长期运营成本高”
- 代表反馈：
  - `history.db` 膨胀到 7.6G：<https://github.com/agentscope-ai/QwenPaw/issues/7168>
- 用户诉求：
  - 希望历史存储更节制；
  - 期待对 recall、工具输出、落库策略做更合理的分层。

### 4）“复杂场景下的操作效率不够”
- 代表反馈：
  - agent 切换不便：<https://github.com/agentscope-ai/QwenPaw/issues/7179>
  - deploy 首页手机端操作不顺：<https://github.com/agentscope-ai/QwenPaw/issues/7177>
- 用户诉求：
  - 多 agent、多设备、多终端下，交互层需要更高密度的信息组织与更少的误触风险。

### 5）“文档是功能可发现性的关键”
- 代表反馈：
  - OAuth setup 文档缺失：<https://github.com/agentscope-ai/QwenPaw/issues/7185>
- 用户诉求：
  - 不是没有能力，而是用户找不到入口；
  - 文档补齐能明显降低接入成本。

---

## 8. 待处理积压

严格来说，今天提供的数据里大多数 open 项都是**近 24 小时新鲜 issue/PR**，还谈不上“长期沉默”。不过从维护优先级角度，以下几项属于**应尽快 triage 的高价值积压**：

### 优先级较高的 open issue
- **#7168** history.db 体积膨胀问题  
  <https://github.com/agentscope-ai/QwenPaw/issues/7168>
- **#7162** 流式输出 ReadError 断流问题  
  <https://github.com/agentscope-ai/QwenPaw/issues/7162>
- **#7156** embedding health check timeout 配置缺失  
  <https://github.com/agentscope-ai/QwenPaw/issues/7156>
- **#7184** cross-session recall toggle  
  <https://github.com/agentscope-ai/QwenPaw/issues/7184>
- **#7182** workspace-scoped always-on Skills  
  <https://github.com/agentscope-ai/QwenPaw/issues/7182>
- **#7181** Qwen_Code harness 支持  
  <https://github.com/agentscope-ai/QwenPaw/issues/7181>

### 需要关注的 open PR
- **#7183** workspace-scoped always-on loading  
  <https://github.com/agentscope-ai/QwenPaw/pull/7183>
- **#7169** QQ 会话隔离与 reply route 保持  
  <https://github.com/agentscope-ai/QwenPaw/pull/7169>
- **#7163** session thinking / model management  
  <https://github.com/agentscope-ai/QwenPaw/pull/7163>
- **#7176** Console 长会话性能优化  
  <https://github.com/agentscope-ai/QwenPaw/pull/7176>

### 维护建议
- 尽快把 **#7162 / #7156 / #7168** 归类为稳定性与数据增长类高优先级；
- 对 **#7182 / #7184 / #7181** 做产品方案收敛，避免需求分散；
- 对 **#7183 / #7169 / #7163** 这些已有实现方向的 PR，尽快完成评审和风险确认。

---

如果你希望，我还可以把这份日报进一步整理成：
1. **适合发群里的简版摘要**，或  
2. **适合管理层阅读的周报口径**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-08-21）

## 1. 今日速览
过去 24 小时，ZeroClaw 的更新非常活跃：**Issues 20 条、PR 28 条**，但**没有新版本发布**。从内容结构看，今天的关注点高度集中在**安全策略、运行时稳定性、CI/发布门禁、以及 provider/配置语义一致性**上，说明项目仍处于高强度迭代和加固阶段。  
已闭环的事项不多，但都是偏“质量面”的改动：包括一个已关闭的 bug Issue、一个已关闭的文档 Issue，以及至少一个已关闭的依赖升级 PR，整体呈现出**“持续推进、以修复和治理为主”**的健康状态。  
**项目活跃度：高；风险面：中高；健康度：总体良好，但安全与稳定性负载较重。**  
参考：仓库主页 [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## 3. 项目进展
今日可见的**重要闭环 PR**主要是：

- **[#10182](https://github.com/zeroclaw-labs/zeroclaw/pull/10182)** `[CLOSED] chore(deps): bump the rust-all group across 1 directory with 46 updates`  
  这是一次较大的依赖更新闭环，覆盖 Rust 生态多个核心包，有助于保持工具链与基础库的安全性和兼容性。虽然属于维护性改动，但对长期健康度很关键。

结合当天总量来看，24 小时内共有 **5 个闭环事件**（**2 个 Issue 关闭 + 3 个 PR 合并/关闭**），说明项目不是“只开不收”，仍在持续消化积压。  
与此同时，今天最值得关注的推进方向是这些仍在进行中的高价值 PR：

- **[#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)**：持久化被中断的 turn 进度，减少 daemon/process 退出导致的用户可见内容丢失  
- **[#10191](https://github.com/zeroclaw-labs/zeroclaw/pull/10191)**：Google TTS API key 头部敏感化，直接对应安全问题  
- **[#10188](https://github.com/zeroclaw-labs/zeroclaw/pull/10188)**：修复独立 delegate 的审批策略  
- **[#10179](https://github.com/zeroclaw-labs/zeroclaw/pull/10179)**：防止节点请求重放  
- **[#10172](https://github.com/zeroclaw-labs/zeroclaw/pull/10172)**：保留配置好的 provider profile 语义

整体上，项目今天的“向前迈进”主要体现在：**安全加固、运行时一致性修复、CI 可靠性增强、以及对配置语义的纠偏**。

---

## 4. 社区热点
今天的讨论热点明显集中在**高风险问题、默认行为调整、以及运行时/CI 边界条件**上。

### Issues 侧最活跃
1. **[#10194](https://github.com/zeroclaw-labs/zeroclaw/issues/10194)**  
   `[CLOSED] PR reviewer publishes in-flight results after the PR merges`  
   - **评论数：2**
   - 诉求：AI reviewer 不应在 PR 已合并后继续发布“进行中”的审查结果，这是一个典型的**异步竞态/状态失配**问题。
   - 背后关注点：自动化审查系统的时序一致性与可信度。

2. 多个 **1 评论** 的问题集中在“默认体验”和“策略一致性”：
   - **[#10168](https://github.com/zeroclaw-labs/zeroclaw/issues/10168)**：stall watchdog 默认开启
   - **[#10166](https://github.com/zeroclaw-labs/zeroclaw/issues/10166)**：默认 stream_mode 改为 partial
   - **[#10165](https://github.com/zeroclaw-labs/zeroclaw/issues/10165)**：independent delegate 绕过高风险命令限制
   - **[#10164](https://github.com/zeroclaw-labs/zeroclaw/issues/10164)**：allowlist 仍被父路径硬拦截
   - **[#10162](https://github.com/zeroclaw-labs/zeroclaw/issues/10162)**：plugin install 与 config seeding 的原子性问题

### PR 侧热点
PR 列表里没有明显的评论峰值数据（多数条目未给出评论数），但从主题上看，热度集中在：
- **安全头部/权限控制**：[#10191](https://github.com/zeroclaw-labs/zeroclaw/pull/10191), [#10188](https://github.com/zeroclaw-labs/zeroclaw/pull/10179)
- **运行时恢复/持久化**：[#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197), [#10179](https://github.com/zeroclaw-labs/zeroclaw/pull/10179)
- **CI / release gate**：[#10181](https://github.com/zeroclaw-labs/zeroclaw/pull/10181), [#10174](https://github.com/zeroclaw-labs/zeroclaw/pull/10174)
- **provider/profile 语义**：[#10172](https://github.com/zeroclaw-labs/zeroclaw/pull/10172)

结论：社区关心的不是“新增功能数量”，而是**默认值是否合理、策略是否一致、异常恢复是否可靠**。

---

## 5. Bug 与稳定性
按严重程度排序，今日主要问题如下：

### S0 / 安全风险
1. **[#10165](https://github.com/zeroclaw-labs/zeroclaw/issues/10165)**  
   `independent delegate bypasses block_high_risk_commands on its own risk profile`  
   - 风险：高风险命令可绕过 delegate 自身的风险配置，属于明确的安全策略失效。
   - **相关 fix PR：[#10188](https://github.com/zeroclaw-labs/zeroclaw/pull/10188)**

### S2 / 降级行为、策略异常、可观测性问题
2. **[#10164](https://github.com/zeroclaw-labs/zeroclaw/issues/10164)**  
   `block_high_risk_commands = false` 不被正确尊重，allowlist 命令仍被拦截  
   - 典型的“配置写了但不生效”问题。
   - 当前未看到直接对应的 fix PR。

3. **[#10194](https://github.com/zeroclaw-labs/zeroclaw/issues/10194)**  
   PR reviewer 在 PR merge 后仍发布 in-flight 结果  
   - 这是自动化系统的时序一致性 bug，会影响审查结果可信度。
   - 当前未看到直接对应的 fix PR。

4. **[#10190](https://github.com/zeroclaw-labs/zeroclaw/issues/10190)**  
   reasoning fallback classifier 误匹配无关错误分句  
   - 会导致错误归因，影响 provider 兼容性判断。
   - 当前未看到直接对应的 fix PR。

5. **[#10186](https://github.com/zeroclaw-labs/zeroclaw/issues/10186)**  
   terminal fallback text 绕过 live delivery seams  
   - 影响实时交付契约与终端体验。
   - 当前未看到直接对应的 fix PR。

6. **[#10178](https://github.com/zeroclaw-labs/zeroclaw/issues/10178)**  
   daemon socket 归属错误信息不可操作  
   - 功能上已 fail closed，但缺少“谁占用/如何恢复”的信息。
   - 当前未看到直接对应的 fix PR。

7. **[#10175](https://github.com/zeroclaw-labs/zeroclaw/issues/10175)**  
   Google TTS API key header 未标记为 sensitive  
   - 属于安全泄露面问题。
   - **相关 fix PR：[#10191](https://github.com/zeroclaw-labs/zeroclaw/pull/10191)**

### S3 / 轻度问题
8. **[#10193](https://github.com/zeroclaw-labs/zeroclaw/issues/10193)**  
   Matrix full reasoning 与 generated thinking status 冲突  
   - 主要影响状态合并与展示一致性。
   - 当前未看到直接对应的 fix PR。

### 稳定性/测试门禁项
- **[#10161](https://github.com/zeroclaw-labs/zeroclaw/issues/10161)**：rapid-resample 测试在并行 gate 下易抖动  
  - 对应修复/加固方向可参考 **[#10163](https://github.com/zeroclaw-labs/zeroclaw/pull/10163)**  
- **[#10159](https://github.com/zeroclaw-labs/zeroclaw/issues/10159)**：release tools 在原生 Linux/Windows runner 上验证  
  - 对应验证 PR：**[#10174](https://github.com/zeroclaw-labs/zeroclaw/pull/10174)**

整体判断：今日 bug 主要集中在**安全策略、异步时序、配置语义和测试稳定性**，没有出现“单点崩溃”式灾难，但存在多处会影响可信度和可维护性的系统性问题。

---

## 6. 功能请求与路线图信号
今天新增/活跃的功能诉求，已经透露出下一版本可能的方向：

1. **更安全、更稳妥的默认值**
   - **[#10168](https://github.com/zeroclaw-labs/zeroclaw/issues/10168)**：默认开启 stall watchdog  
   - **[#10166](https://github.com/zeroclaw-labs/zeroclaw/issues/10166)**：默认启用 partial streaming  
   这些需求都指向同一个方向：**减少“开箱即不安全/不流畅”的默认体验**。  
   这类需求很可能进入下个版本，因为它们影响面广，且已有明确的 accepted/status 标记。

2. **安全与审批框架升级**
   - **[#10185](https://github.com/zeroclaw-labs/zeroclaw/issues/10185)**：PR risk 和 security approval calibration
   - 配套 PR：**[#10192](https://github.com/zeroclaw-labs/zeroclaw/pull/10192)**  
   这是一条明显的路线图信号：ZeroClaw 正在把“自动化风险标签/审批”从临时策略推向可审计的正式机制。

3. **provider/profile 语义保真**
   - **[#10171](https://github.com/zeroclaw-labs/zeroclaw/issues/10171)** / **[#10172](https://github.com/zeroclaw-labs/zeroclaw/pull/10172)**  
   这是偏平台级的能力：一旦被采纳，会影响 gateway、dashboard、CLI、quickstart 等多端行为，优先级应较高。

4. **运行时可恢复性与持久化**
   - **[#10162](https://github.com/zeroclaw-labs/zeroclaw/issues/10162)**、**[#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)**  
   插件安装、config seeding、turn 进度持久化都说明项目正向“中断可恢复、失败可重试”的方向演进。  
   这类改动很可能成为下一版本的重要组成部分。

综合判断：**安全策略、默认体验、provider 语义和恢复能力**，是最有可能进入下一版本的四条主线。

---

## 7. 用户反馈摘要
从今日 issue/PR 的问题描述与讨论方向，可以提炼出几类真实痛点：

- **“配置写了却不生效”**  
  例如 **[#10164](https://github.com/zeroclaw-labs/zeroclaw/issues/10164)**、**[#10165](https://github.com/zeroclaw-labs/zeroclaw/issues/10165)**。  
  用户关心的是安全开关与 allowlist 是否真的按预期执行，而不是文档上是否“声明支持”。

- **“默认行为太保守/太僵硬”**  
  如 **[#10168](https://github.com/zeroclaw-labs/zeroclaw/issues/10168)**、**[#10166](https://github.com/zeroclaw-labs/zeroclaw/issues/10166)**。  
  用户希望系统能默认更抗卡死、更即时响应，而不是把风险和延迟都留给手动配置。

- **“出错了但不知道怎么恢复”**  
  如 **[#10178](https://github.com/zeroclaw-labs/zeroclaw/issues/10178)**、**[#10162](https://github.com/zeroclaw-labs/zeroclaw/issues/10162)**。  
  用户并不只要 fail fast，更需要**可操作的错误信息**和**可重试/可恢复的流程**。

- **“多 provider / 多 profile 场景下语义被简化了”**  
  如 **[#10171](https://github.com/zeroclaw-labs/zeroclaw/issues/10171)**。  
  用户在意的是端点、凭据、额外头、缓存身份都要保持一致，而不是仅仅“能连上”。

- **“终端交互要更像一个成熟产品”**  
  如 **[#10186](https://github.com/zeroclaw-labs/zeroclaw/issues/10186)**、**[#10180](https://github.com/zeroclaw-labs/zeroclaw/issues/10180)**。  
  这说明 ZeroClaw 的用户已经不仅仅把它当作工具，而是期待更完善的交互闭环与状态管理。

一句话总结：用户最在意的是 **可靠性、可解释性、可恢复性**，而不是单纯的功能数量。

---

## 8. 待处理积压
以下是今日列表中仍处于 **open / in-progress / blocked** 状态、且优先级较高的项目，建议维护者优先盯紧：

### 高优先级安全/正确性积压
- **[#10165](https://github.com/zeroclaw-labs/zeroclaw/issues/10165)** — S0 安全漏洞，强烈建议优先闭环  
- **[#10164](https://github.com/zeroclaw-labs/zeroclaw/issues/10164)** — allowlist/策略失效问题  
- **[#10175](https://github.com/zeroclaw-labs/zeroclaw/issues/10175)** — 敏感头部泄露面  
- **[#10190](https://github.com/zeroclaw-labs/zeroclaw/issues/10190)** — provider 兼容性误判  
- **[#10186](https://github.com/zeroclaw-labs/zeroclaw/issues/10186)** — live delivery seam 被绕过  
- **[#10178](https://github.com/zeroclaw-labs/zeroclaw/issues/10178)** — daemon 冲突错误不可操作

### 路线图/架构积压
- **[#10168](https://github.com/zeroclaw-labs/zeroclaw/issues/10168)** — stall watchdog 默认开启  
- **[#10166](https://github.com/zeroclaw-labs/zeroclaw/issues/10166)** — 默认 partial streaming  
- **[#10167](https://github.com/zeroclaw-labs/zeroclaw/issues/10167)** — vendor-neutral lifecycle export  
- **[#10171](https://github.com/zeroclaw-labs/zeroclaw/issues/10171)** — provider profile 语义保真

### 仍在推进但未收口的 PR
- **[#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)** — 高风险、XL 体量，影响面大  
- **[#10188](https://github.com/zeroclaw-labs/zeroclaw/pull/10188)** — 安全策略修复，值得尽快完成  
- **[#10191](https://github.com/zeroclaw-labs/zeroclaw/pull/10191)** — 安全修复，直接对应 issue  
- **[#10183](https://github.com/zeroclaw-labs/zeroclaw/pull/10183)** — blocked / stacked，需等待父 PR  
- **[#10177](https://github.com/zeroclaw-labs/zeroclaw/pull/10177)** — stacked on #9948，当前无法独立落地  
- **[#10172](https://github.com/zeroclaw-labs/zeroclaw/pull/10172)** — 语义级改动，跨面广，需持续 review

> 备注：这些条目大多是“今日活跃积压”，严格意义上是否“长期未响应”还需结合更长时间窗口判断；但从当前数据看，它们是**短期内最值得跟进的未闭环工作**。

---

### 总体结论
ZeroClaw 今天的状态可以概括为：**高活跃、高密度、偏治理型推进**。项目没有发布新版本，但在安全、配置语义、运行时恢复和 CI 可靠性上持续加固，说明团队在为下一轮发布做基础清理。  
如果从项目健康度看：**开发活跃度高、技术方向清晰、但安全与正确性债务仍较集中**；好消息是，已经出现多条对应的修复 PR，说明问题识别后有明确收敛路径。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*