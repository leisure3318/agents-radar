# OpenClaw 生态日报 2026-06-12

> Issues: 16 | PRs: 48 | 覆盖项目: 13 个 | 生成时间: 2026-06-12 01:58 UTC

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

以下为 **OpenClaw（https://github.com/openclaw/openclaw）2026-06-12 项目动态日报**。  
整体看，今天是一个**高活跃、强修复导向**的工作日：过去 24 小时内有 **16 条 Issue 更新、48 条 PR 更新**，但**没有新 Release**，说明项目仍处在“高频修补与排障、尚未形成新版本收敛”的阶段。

---

## 1. 今日速览
今天社区和维护侧的注意力几乎全部集中在 **稳定性、回归修复、跨平台兼容与消息/cron 相关功能补齐** 上。Issue 侧出现了多条高严重级别问题，覆盖 **数据丢失、会话状态卡死、崩溃/死锁、CI 失败** 等，说明当前项目的用户痛点偏向“能不能稳定跑起来”。  
PR 侧则呈现出明显的“对症下药”特征：大量修复围绕 **cron、Codex、多账号隔离、Telegram 富消息、内存后端、任务流恢复** 展开，显示路线图正在向实用性和可靠性加速收敛。  
从数量上看，**48 个 PR 更新 vs 2 个收尾 PR**，合并吞吐明显低于提交/讨论增量，维护压力偏高，但社区参与度很强。  
总体健康度判断：**活跃度高，问题发现能力强，但发布节奏与修复落地速度仍需加强**。  
链接： [OpenClaw 仓库](https://github.com/openclaw/openclaw)

---

## 3. 项目进展
今日可确认的收尾项只有 **2 个已关闭 PR**，且都指向同一类问题：**cron 在 schedule 更新后发生错跑/回放旧槽位**。这说明团队已经在收敛 cron 可靠性问题，但相关修复链仍在推进中。

- **#92277** – *Fix stale cron catch-up after schedule updates*  
  方向：修复 cron 重启 catch-up 逻辑在 schedule 更新后错误触发旧槽位。  
  链接：<https://github.com/openclaw/openclaw/pull/92277>

- **#92250** – *Fix stale cron catch-up after schedule updates*  
  方向：同类修复，聚焦 schedule 变更后的旧槽位回放问题。  
  链接：<https://github.com/openclaw/openclaw/pull/92250>

**推进判断：**
- 今日“收尾”并未带来新版本，但把 **cron 调度一致性** 作为明确主线推进了一步。
- 结合大量仍待处理 PR，可以看出项目当前是**边修边补**，更多是在为下一次发布清障，而不是做大版本功能扩张。
- 从主题分布看，**cron、Telegram、Codex、memory、agent/task 流** 是今天最明确的工程推进方向。  
链接： [今日 PR 活动](https://github.com/openclaw/openclaw/pulls?q=is%3Apr+updated%3A2026-06-12..2026-06-13)

---

## 4. 社区热点
按已披露评论数，**Issue 讨论明显比 PR 更活跃**；PR 列表中大多未给出评论统计，因此热点主要体现在 Issue 上。

### 讨论最热的 Issues
- **#92273** – Tool Search 在 pre-compaction memory flush 场景下静默失效，可能导致 durable memories 丢失  
  评论：4，👍1  
  背后诉求：用户希望工具搜索在“模型猜工具名”时不要直接不可恢复失败，而是能给出更可操作的反馈，避免**会话记忆丢失**。  
  链接：<https://github.com/openclaw/openclaw/issues/92273>

- **#92267** – `typingMode: "instant"` 在 queued/steered turns 中失效，Telegram room_event 还会无条件抑制 typing  
  评论：3，👍1  
  背后诉求：消息工具链路里，用户希望“即时输入指示”在所有 turn 类型上都一致生效，减少机器人“看起来没反应”的体验问题。  
  链接：<https://github.com/openclaw/openclaw/issues/92267>

- **#92289** – CI check-docs 因 docs.json 引用未发布页面而失败  
  评论：3  
  背后诉求：维护者/贡献者希望文档校验不要因发布前页面而阻塞所有 PR，这是典型的**流水线可用性**诉求。  
  链接：<https://github.com/openclaw/openclaw/issues/92289>

- **#92275** – 同机双 Codex 账号启动成本差异巨大  
  评论：2，👍1  
  背后诉求：用户关心多账号并存时的**性能公平性**与**状态隔离**。  
  链接：<https://github.com/openclaw/openclaw/issues/92275>

### PR 侧热点信号
- **#92113** – auth/secretref 相关修复，状态为 ready for maintainer look，且风险高  
  链接：<https://github.com/openclaw/openclaw/pull/92113>
- **#92111** – update handoff 失败后重启 managed gateway 的高风险修复  
  链接：<https://github.com/openclaw/openclaw/pull/92111>
- **#92294** – Codex exec 诊断修复，状态“needs proof”  
  链接：<https://github.com/openclaw/openclaw/pull/92294>

**结论：**  
今天的社区热点不是“新能力炫技”，而是“**基础链路不稳**”：记忆、typing、文档 CI、启动成本、认证与执行环境，都是直接影响使用体验的关键路径。  
链接： [Issues 活动列表](https://github.com/openclaw/openclaw/issues?q=updated%3A2026-06-12..2026-06-13)

---

## 5. Bug 与稳定性
以下按严重程度/影响优先级排序，并标注是否已有对应 fix PR。

### P1 / 高严重：数据丢失、崩溃、会话状态损坏
- **#92273** – Tool Search 静默失效，pre-compaction memory flush 可能导致 durable memories 丢失  
  影响：**session-state / data-loss**，属于高危问题。  
  已有 fix PR：**有**，#92278（补充未知 tool_call 的最相近匹配提示）  
  链接：<https://github.com/openclaw/openclaw/issues/92273>  
  PR：<https://github.com/openclaw/openclaw/pull/92278>

- **#92291** – `cron edit --cron` 会静默剥离 `schedule.tz` / `staggerMs`  
  影响：**data-loss / 配置状态损坏**。  
  已有 fix PR：**有**，#92304、#92295（两条修复线都在补 schedule 合并逻辑）  
  链接：<https://github.com/openclaw/openclaw/issues/92291>  
  PR：<https://github.com/openclaw/openclaw/pull/92304> ，<https://github.com/openclaw/openclaw/pull/92295>

- **#92306** – cron job 反复报 “LLM request failed”  
  影响：**crash-loop / P1**，会直接打断定时任务。  
  已有 fix PR：**未看到明确对应 PR**  
  链接：<https://github.com/openclaw/openclaw/issues/92306>

### P2 / 中高严重：崩溃、死锁、回归、状态卡死
- **#92270** – stuck-session recovery 永不释放，`status=aborted with released=0`，需要外部重启或 reset  
  影响：**crash / wedge**，会话恢复链路卡死。  
  已有 fix PR：**有**，#92303  
  链接：<https://github.com/openclaw/openclaw/issues/92270>  
  PR：<https://github.com/openclaw/openclaw/pull/92303>

- **#92275** – 同机双 Codex 账号出现异常高启动成本  
  影响：**regression / 性能退化**。  
  已有 fix PR：**有迹象**，#92298（按 authProfileId 隔离 CODEX_HOME）  
  链接：<https://github.com/openclaw/openclaw/issues/92275>  
  PR：<https://github.com/openclaw/openclaw/pull/92298>

- **#92302** – Windows 下 `memory.qmd.command` 路径被截断，QMD memory backend 不可用  
  影响：**跨平台行为 bug**，虽然不一定 crash，但会让功能失效。  
  已有 fix PR：**有**，#92308  
  链接：<https://github.com/openclaw/openclaw/issues/92302>  
  PR：<https://github.com/openclaw/openclaw/pull/92308>

- **#92257** – `sessions_send` 在 announce delivery 下把回复上下文注入隔离 cron session，形成反馈回路  
  影响：**behavior bug / 状态污染**。  
  已有 fix PR：**未看到明确对应 PR**  
  链接：<https://github.com/openclaw/openclaw/issues/92257>

- **#92259** – Telegram inbound 在非正常退出后永久死锁，head claim 无 TTL/reclaim  
  影响：**deadlock / inbound 全阻塞**。  
  已有 fix PR：**未看到明确对应 PR**  
  链接：<https://github.com/openclaw/openclaw/issues/92259>

- **#92285** – parent subagent task / TaskFlow 在 child lost 后仍 stale_running  
  影响：**状态机不一致**，不会立刻崩，但会污染任务管理视图。  
  已有 fix PR：**有**，#92301  
  链接：<https://github.com/openclaw/openclaw/issues/92285>  
  PR：<https://github.com/openclaw/openclaw/pull/92301>

### 低到中严重：体验/兼容/诊断问题
- **#92267** – typingMode instant 在 queued/steered turns 不生效  
  已有 fix PR：未见  
  链接：<https://github.com/openclaw/openclaw/issues/92267>

- **#92289** – docs 校验因未发布页面失败，阻断 PR  
  已有 fix PR：未见  
  链接：<https://github.com/openclaw/openclaw/issues/92289>

链接： [稳定性相关 Issues](https://github.com/openclaw/openclaw/issues?q=created%3A2026-06-11..2026-06-13+bug)

---

## 6. 功能请求与路线图信号
今天的新需求并不零散，已经能看出几个明显的路线图簇。

### 1) Telegram 富消息能力正在成型
- **#92258** – Telegram Bot API 10.1 富消息支持请求  
  链接：<https://github.com/openclaw/openclaw/issues/92258>
- 对应 PR 已出现：
  - **#92309** – add Telegram rich message API helpers  
    <https://github.com/openclaw/openclaw/pull/92309>
  - **#92310** – restore sent-message ledger writes for delivery replies  
    <https://github.com/openclaw/openclaw/pull/92310>

**判断：**  
这是最像“下一版本会收进去”的功能线之一，因为已经从需求进入到**基础 helper + 发送台账修复**的实现阶段，说明不是单点想法，而是一个可落地的功能栈。

### 2) Cron 可靠性与 schedule 一致性
- **#92291**、**#92306** 都指向 cron 的稳定性问题  
  链接：<https://github.com/openclaw/openclaw/issues/92291> ，<https://github.com/openclaw/openclaw/issues/92306>
- 对应 PR 链：
  - **#92304 / #92295**：保留 tz 和 staggerMs  
    <https://github.com/openclaw/openclaw/pull/92304> ，<https://github.com/openclaw/openclaw/pull/92295>
  - **#92305**：跳过启动 catch-up 中早于 schedule 更新的槽位  
    <https://github.com/openclaw/openclaw/pull/92305>
  - **#92225**：disabled heartbeat one-shot cron retries  
    <https://github.com/openclaw/openclaw/pull/92225>

**判断：**  
cron 相关修复已经形成**集中补丁带**，很可能是下一轮版本的重点稳定项。

### 3) 认证、执行与多账号隔离
- **#92275**（同机双 Codex 账号启动成本差异）  
  <https://github.com/openclaw/openclaw/issues/92275>
- **#92294** – keep OpenClaw exec when native surface has no environment  
  <https://github.com/openclaw/openclaw/pull/92294>
- **#92298** – isolate CODEX_HOME per authProfileId  
  <https://github.com/openclaw/openclaw/pull/92298>
- **#92113 / #92111 / #92290** 等也都在补诊断与 auth-provider 相关细节  
  <https://github.com/openclaw/openclaw/pull/92113> ，<https://github.com/openclaw/openclaw/pull/92111> ，<https://github.com/openclaw/openclaw/pull/92290>

**判断：**  
这条线说明项目在向“**企业/多账号/多 runtime** 场景”靠拢，尤其是 SecretRef、provider、exec、gateway 健康诊断都在同步强化。

### 4) Agent/Memory/任务流一致性
- **#92273**、**#92267**、**#92257**、**#92285**、**#92300**、**#92299** 都属于 agent 行为与消息流一致性问题  
  链接：<https://github.com/openclaw/openclaw/issues/92273> ，<https://github.com/openclaw/openclaw/issues/92267> ，<https://github.com/openclaw/openclaw/issues/92257> ，<https://github.com/openclaw/openclaw/issues/92285>  
  PR：<https://github.com/openclaw/openclaw/pull/92300> ，<https://github.com/openclaw/openclaw/pull/92299>

**判断：**  
这意味着下一版本很可能不是“新增一个大功能”，而是**把 agent 的行为边界、消息发送语义和状态恢复机制打磨完整**。

---

## 7. 用户反馈摘要
从今天的 Issue 描述里，用户最真实的痛点可以概括为 5 类：

1. **“我做对了操作，但系统悄悄失败”**  
   典型如 **#92273**：工具搜索 guessed tool name 后不可恢复，最终导致记忆丢失。  
   链接：<https://github.com/openclaw/openclaw/issues/92273>

2. **“配置看起来改了，实际上被系统悄悄改坏了”**  
   典型如 **#92291**：cron edit 在不重传参数时丢掉 tz / staggerMs。  
   链接：<https://github.com/openclaw/openclaw/issues/92291>

3. **“系统没有死，但业务流卡住了”**  
   典型如 **#92270**、**#92259**：恢复逻辑、Telegram ingress 都可能把整个通道堵死，用户只能重启或 reset。  
   链接：<https://github.com/openclaw/openclaw/issues/92270> ，<https://github.com/openclaw/openclaw/issues/92259>

4. **“跨平台/多账号场景不一致”**  
   典型如 **#92302**（Windows 路径）、**#92275**（双账号启动成本差异）。  
   链接：<https://github.com/openclaw/openclaw/issues/92302> ，<https://github.com/openclaw/openclaw/issues/92275>

5. **“CI / 发布链路比功能本身更容易卡住贡献”**  
   典型如 **#92289**：文档校验失败阻塞 PR。另有 **#92297** 对稳定 immutable releases 的担忧，说明部分用户对发布节奏和稳定性有明显焦虑。  
   链接：<https://github.com/openclaw/openclaw/issues/92289> ，<https://github.com/openclaw/openclaw/issues/92297>

**总体情绪：**
- 用户对 OpenClaw 的能力期待高，很多问题都来自“高级用法/复杂部署场景”。
- 但不满意点集中在：**失败不透明、状态不一致、恢复机制不可靠、跨环境行为不一致**。
- 同时也能看出用户愿意提交高质量复现和修复建议，社区参与度强。  
链接： [今日 Issues 汇总](https://github.com/openclaw/openclaw/issues?q=updated%3A2026-06-12..2026-06-13)

---

## 8. 待处理积压
由于今天缺少更长时间维度的 age 数据，下面列的是**当前最需要维护者关注的高风险积压项**，它们不是“沉默很久”，而是“影响面大、审阅门槛高、处理优先级高”。

### 需要优先盯住的 Issue / PR
- **#92273**（数据丢失风险，高优先级）  
  Issue：<https://github.com/openclaw/openclaw/issues/92273>  
  PR：<https://github.com/openclaw/openclaw/pull/92278>

- **#92291**（cron 配置静默损坏，高优先级）  
  Issue：<https://github.com/openclaw/openclaw/issues/92291>  
  PR：<https://github.com/openclaw/openclaw/pull/92304> ，<https://github.com/openclaw/openclaw/pull/92295>

- **#92306**（cron 失败 / crash-loop）  
  Issue：<https://github.com/openclaw/openclaw/issues/92306>

- **#92259**（Telegram inbound 死锁）  
  Issue：<https://github.com/openclaw/openclaw/issues/92259>

- **#92113**（ready for maintainer look，auth-provider 高风险）  
  PR：<https://github.com/openclaw/openclaw/pull/92113>

- **#92111**（managed gateway update handoff 失败后的可用性恢复）  
  PR：<https://github.com/openclaw/openclaw/pull/92111>

- **#92294**（needs proof，Codex exec 诊断链路）  
  PR：<https://github.com/openclaw/openclaw/pull/92294>

- **#92307**（startup approval clamp 诊断）  
  PR：<https://github.com/openclaw/openclaw/pull/92307>

**维护建议：**
- 先处理 **P1 数据/崩溃/死锁**，再处理行为修复与体验优化。
- 对于已经出现多个相关 PR 的主题（cron、Telegram、Codex），建议尽快**统一设计口径**，避免重复实现。
- 对于 `needs proof` / `needs maintainer review` 的 PR，应优先安排审阅，减少修复链停滞。  
链接： [待审 PR 列表](https://github.com/openclaw/openclaw/pulls?q=is%3Apr+updated%3A2026-06-12..2026-06-13+is%3Aopen)

---

如果你愿意，我可以把这份日报进一步整理成：
1. **适合直接发群里的短版**，或  
2. **适合内部周报/晨会的表格版**。

---

## 横向生态对比

以下为基于 2026-06-12 各项目动态的**横向对比分析报告**，面向技术决策者与开发者阅读。

---

# 个人 AI 助手 / 自主智能体开源生态横向对比分析（2026-06-12）

## 1. 生态全景

过去一天的开源生态呈现出一个非常清晰的特征：**从“功能可用”进入“稳定性、状态一致性、可观测性”主导的工程化阶段**。  
多数项目不再单纯追求新能力堆叠，而是在修复 cron、消息投递、会话恢复、配置持久化、跨平台兼容等“基础链路”。  
与此同时，Telegram、Discord、Slack、Feishu、WhatsApp、WeChat、Signal 等多渠道接入持续活跃，说明智能体产品正从“单一聊天助手”演进为“多通道任务执行平台”。  
另一个明显趋势是：**本地部署、私有化、multi-account/multi-agent 隔离、以及成本/权限边界控制**，正在成为核心竞争点。  
整体看，生态已进入“**广泛试错后向稳定交付收敛**”的阶段。

---

## 2. 各项目活跃度对比

> 说明：下表中的 Issues / PR 为你提供摘要中的**今日活跃条目数**，更接近“今日可见活动量”，不等同于仓库总量。

| 项目 | 今日 Issues 数 | 今日 PR 数 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 16 | 48 | 无新 Release | **高活跃，高问题密度，修复导向强** |
| NanoBot | 2 | 11 | 无新 Release | **活跃但讨论少，功能推进稳定** |
| Hermes Agent | 50 | 50 | 无新 Release | **极高活跃，问题与修复同步爆发** |
| PicoClaw | 1 | 12 | 无新 Release | **中等活跃，维护偏底座** |
| NanoClaw | 0 | 13 | 无新 Release | **高 PR 活动，Issue 噪音低** |
| NullClaw | 1 | 0 | 无新 Release | **低活跃，单点 bug 驱动** |
| IronClaw | 11 | 24 | 无新 Release | **高活跃，修复闭环形成中** |
| LobsterAI | 0 | 7 | 无新 Release | **稳健推进，问题噪音低** |
| TinyClaw | 0 | 0 | 无活动 | **静默** |
| Moltis | 1 | 1 | 无新 Release | **轻量维护，聚焦集成修复** |
| CoPaw | 15 | 18 | 2 个 post Release | **高活跃，边修边发** |
| ZeptoClaw | 0 | 0 | 无活动 | **静默** |
| ZeroClaw | 9 | 25 | 1 个大版本 Release | **高活跃，发布后收敛期** |

### 活跃度分层
- **第一梯队（高强度迭代）**：Hermes Agent、OpenClaw、CoPaw、IronClaw、ZeroClaw  
- **第二梯队（稳态推进）**：NanoClaw、LobsterAI、NanoBot、PicoClaw  
- **低活跃 / 单点维护**：NullClaw、Moltis  
- **静默**：TinyClaw、ZeptoClaw

---

## 3. OpenClaw 在生态中的定位

### 3.1 位置判断
OpenClaw 是当前样本里最典型的**“平台级智能体底座”**项目之一：  
它不是只做前端聊天，也不是只做某一个渠道集成，而是围绕 **cron、memory、Telegram、Codex、auth、task flow、gateway、session recovery** 等核心基础设施持续打磨。

### 3.2 相比同类的优势
1. **修复面广，覆盖真实生产痛点**
   - 今日集中在数据丢失、死锁、状态卡死、cron 回放错误、跨平台兼容等高风险问题。
   - 这说明项目的使用场景已经进入“准生产”级别。

2. **工程深度高**
   - 涉及调度一致性、消息语义、记忆 flush、状态恢复、账号隔离、gateway 健康检查等。
   - 这比多数“UI 代理壳”更接近真正的 agent runtime。

3. **社区问题发现能力强**
   - Issue 讨论热度明显高于 PR 互动，且用户反馈多为可复现的深层问题。
   - 这说明社区不仅在“用”，而且在“压测”和“找边界”。

### 3.3 与同类的技术路线差异
- **对比 Hermes Agent**
  - Hermes 更偏“多场景代理平台 + 桌面/网关/消息生态扩张”；
  - OpenClaw 更偏“agent 操作系统底座 + 调度/状态/记忆/cron 可靠性”。
  - Hermes 的广度更强，OpenClaw 的工程收敛度更强。

- **对比 ZeroClaw**
  - ZeroClaw 刚发布多 agent 架构 v0.8.0，重点在**架构切换和 onboarding**；
  - OpenClaw 已经进入大量边界问题修复阶段，重点在**运行可靠性和行为一致性**。

- **对比 CoPaw / NanoBot / LobsterAI**
  - 这些项目更明显地向“产品化 UI + 多通道体验”靠拢；
  - OpenClaw 更像底层平台，面向复杂任务流、调度、恢复和多环境集成。

### 3.4 社区规模对比
从今日公开活动看，OpenClaw 的**Issue 与 PR 活动密度很高**，而且涉及的模块面广、问题严重级别高。  
它的社区规模和参与深度显然处于样本前列，至少可以视为**高活跃、强技术导向社区**。  
但与 Hermes 相比，OpenClaw 更像“高强度排障社区”，而 Hermes 更像“多入口、多场景扩张社区”。

---

## 4. 共同关注的技术方向

下面是跨项目最明显的共性技术方向：

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| 调度 / cron 可靠性 | OpenClaw、NanoBot、Hermes Agent、IronClaw、ZeroClaw、LobsterAI | schedule 更新一致性、catch-up 正确性、任务完成时机、暂停/恢复、重连后继续投递 |
| 状态恢复与一致性 | OpenClaw、Hermes Agent、IronClaw、CoPaw、LobsterAI | session 恢复、stale state 清理、失败后重试、活动流一致、stop/abort 语义统一 |
| 多渠道消息接入 | OpenClaw、Hermes Agent、NanoClaw、Moltis、ZeroClaw、CoPaw | Telegram / Discord / Slack / Feishu / WhatsApp / Signal / WeChat / DingTalk 等消息投递与富消息能力 |
| 多账号 / 多实例隔离 | OpenClaw、ZeroClaw、NanoBot、Hermes Agent | authProfile、workspace、provider、HOME 目录、session 边界隔离 |
| 可观测性 / 诊断 / 日志 | IronClaw、CoPaw、Hermes Agent、ZeroClaw、OpenClaw | operator logs、trace 连续性、诊断信息、proof / maintainer review、CI 可解释性 |
| 本地部署 / 私有化 / 企业配置 | NanoBot、Hermes Agent、CoPaw、ZeroClaw、Moltis、PicoClaw | 本地 provider、私有 endpoint、OAuth 回调、daemon/remote 模式、配置迁移 |
| 文件 / 图像 / 输入处理 | PicoClaw、Hermes Agent、CoPaw、LobsterAI、ZeroClaw、Moltis | vision 能力边界、文件预览、附件下载、非 UTF-8、binary handling、图片描述幻觉防护 |
| 发布与 CI 稳定性 | OpenClaw、PicoClaw、CoPaw、ZeroClaw、IronClaw | docs 校验、release gate、构建失败、跨平台打包、回滚策略 |

### 共同诉求的本质
这些项目共同在解决一个问题：  
**如何让智能体在复杂、长期运行、跨平台、多通道、多模型环境下，做到“可控、可恢复、可追踪、可迁移”**。  
这已经明显超出“聊天机器人”的范畴，更接近一套分布式 agent runtime / personal AI OS。

---

## 5. 差异化定位分析

### 5.1 功能侧重

- **OpenClaw**
  - 偏调度、记忆、cron、状态恢复、auth、gateway、任务流一致性
  - 更像“底层 agent 基础设施”

- **Hermes Agent**
  - 偏桌面端、网关、消息生态、远程模式、语音/图像/富消息
  - 更像“全渠道代理平台”

- **ZeroClaw**
  - 刚完成多 agent 结构升级
  - 更像“新一代多 agent 平台”，重点在发布后收敛

- **CoPaw**
  - 偏 UI 体验、可观测性、技能市场、DingTalk/企业场景
  - 更像“面向使用体验的 agent 桌面产品”

- **NanoBot / LobsterAI**
  - 偏协作链路、SDK、cron/session、分享、语音、文件
  - 更接近“产品化工作台”

- **PicoClaw**
  - 偏轻量集成、模型能力边界、前端/依赖维护
  - 更像“小型入口 + AI 集成层”

- **IronClaw**
  - 偏 Reborn/WebUI v2、Slack/outbound、QA 自动化、运行时恢复
  - 更像“可运维的 agent 平台”

### 5.2 目标用户

- **OpenClaw / Hermes / IronClaw**
  - 面向高级用户、维护者、平台集成者、长期运行场景
  - 用户对稳定性、恢复机制、日志与多渠道支持要求高

- **CoPaw / NanoBot / LobsterAI**
  - 面向日常使用者和半专业团队
  - 更关注 UI、协作、文件、语音、分享、企业接入

- **ZeroClaw**
  - 面向愿意尝试新架构的 early adopters
  - 尤其关注 multi-agent 和配置迁移

- **PicoClaw / NullClaw / Moltis**
  - 更偏轻量助手、本地模型、单点集成、消息桥接
  - 用户诉求以“能稳定接入并正确输出”为主

### 5.3 技术架构差异

- **平台型架构**
  - OpenClaw、Hermes、IronClaw、ZeroClaw
  - 特点：有 daemon / runtime / gateway / workflow / policy / memory / delivery 的分层

- **产品型架构**
  - CoPaw、NanoBot、LobsterAI
  - 特点：强调 UI、交互、技能市场、分享、可观测性

- **轻量集成型架构**
  - PicoClaw、NullClaw、Moltis
  - 特点：更依赖外部模型/服务，关注接入正确性和稳定性

### 5.4 一句话区分
- OpenClaw：**“把 agent 跑稳”**
- Hermes：**“把 agent 接到所有入口”**
- ZeroClaw：**“把多 agent 架构立起来”**
- CoPaw：**“把使用体验打顺”**
- NanoBot/LobsterAI：**“把工作流做完整”**
- PicoClaw/NullClaw/Moltis：**“把模型与渠道接对”**

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段
这些项目今天呈现出明显的高更新密度和持续修复压力：

- **Hermes Agent**：Issue/PR 双高，问题面广，修复链长
- **OpenClaw**：大量高严重度 bug，修复导向非常强
- **CoPaw**：高活跃且连续发 post 版本，说明正在快速收敛
- **IronClaw**：高活跃，修复和架构调整并行
- **ZeroClaw**：刚发布大版本，处于收敛窗口
- **NanoClaw**：PR 高活跃，底层能力持续收口

### 6.2 质量巩固阶段
这些项目的特征是：问题少、变更集中、偏稳定性/依赖/体验打磨

- **NanoBot**：开发在推进，但社区讨论少，整体较稳
- **LobsterAI**：PR 推进顺、问题噪音低，偏稳定收敛
- **PicoClaw**：以依赖升级和少量 bug 修复为主
- **Moltis**：轻量维护，聚焦少量核心集成问题
- **NullClaw**：低活跃，单点问题驱动

### 6.3 静默或低信号
- **TinyClaw**
- **ZeptoClaw**

### 6.4 成熟度判断
- **最成熟的“工程化姿态”**：OpenClaw、IronClaw、Hermes Agent  
- **最像“进入稳定收敛期”**：LobsterAI、NanoBot、PicoClaw  
- **最像“架构升级后快速校正”**：ZeroClaw、CoPaw  
- **最像“轻量接入/单点维护”**：Moltis、NullClaw

---

## 7. 值得关注的趋势信号

从今天的社区反馈中，可以提炼出以下行业趋势，对 agent 开发者特别有参考价值：

### 7.1 “正确性”正在超越“可用性”
大量问题不是“功能没有”，而是：
- 静默失败
- 配置被悄悄改坏
- 任务状态卡死
- 回复丢失但表面成功
- 更新成功但实际失败

**启示**：  
agent 系统的竞争，正从“能否调用模型”转向“是否能在失败时保持可解释和可恢复”。

---

### 7.2 多通道不是加法，而是治理问题
Telegram / Discord / Slack / Feishu / WhatsApp / WeChat / Signal / DingTalk 的扩展，带来的不是简单接入，而是：
- 消息格式一致性
- 投递回执
- 限流与重试
- 富消息支持
- 权限与 OAuth 回调
- 不同 channel 的状态同步

**启示**：  
未来的 agent 平台不是“多接几个 IM”，而是要有统一的 delivery/state/callback abstraction。

---

### 7.3 本地化、私有化、多账号并存成为主流诉求
OpenClaw、ZeroClaw、Hermes、NanoBot、CoPaw 都反复出现：
- 多 profile
- 多 provider
- 本地模型可见性
- 权限/secret 隔离
- workspace / home / authProfileId 隔离

**启示**：  
个人 AI 助手正在从“单用户玩具”变成“私有化生产工具”，配置隔离和身份边界是基础能力。

---

### 7.4 可观测性是 agent 成熟度分水岭
从 IronClaw 的 logs、CoPaw 的 Langfuse traces、ZeroClaw 的 CLI 状态输出、OpenClaw 的 proof/review 闭环可以看出：  
**没有可观测性，就没有可维护的 agent。**

**启示**：  
谁能把 run/thread/tool call/session 的 trace 做到可追踪、可分段、可复盘，谁就更接近生产级平台。

---

### 7.5 “自动化成本安全”正在成为新议题
Hermes 里出现了 cron 继承付费 provider 状态导致持续计费的风险，这非常值得注意。

**启示**：  
未来智能体的风险不只是“答错”，还包括**自动花钱、自动发消息、自动执行不可逆操作**。  
因此，**approval gate、cost containment、policy isolation** 会越来越重要。

---

### 7.6 模型能力边界识别会成为标配
PicoClaw 的视觉能力幻觉问题、Hermes/CoPaw/ZeroClaw 的文件和输入边界问题都说明：  
系统不能再默认“模型什么都会”。

**启示**：  
下一代 agent 框架需要原生支持：
- capability detection
- tool/model fallback
- graceful degradation
- explicit refusal / routing

---

### 7.7 桌面端和 WebUI 正在成为“生产入口”
Hermes、IronClaw、CoPaw、LobsterAI、PicoClaw 的问题大多出现在桌面/前端/构建链路。  
说明用户已经把它们当作工作台，而不是 demo。

**启示**：  
桌面端 AI 产品必须达到传统软件的质量标准：启动、更新、恢复、文件、权限、跨平台一致性都不能薄弱。

---

## 总结判断

如果用一句话概括今天的生态：  
**AI 智能体开源项目已经从“做出来”进入“跑得稳、接得多、管得住”的阶段。**

- **OpenClaw** 代表的是“平台底座与可靠性工程”
- **Hermes / ZeroClaw / IronClaw** 代表的是“多场景、多通道、多 agent 的平台化扩张”
- **CoPaw / NanoBot / LobsterAI** 代表的是“面向用户体验和工作流完整性的产品化收敛”
- **PicoClaw / Moltis / NullClaw** 则更像“轻量集成与单点能力增强”

对开发者来说，下一阶段最值得投入的不是再堆新功能，而是：
1. 状态机正确性  
2. 多通道 delivery 一致性  
3. 观测与回放  
4. 配置和身份隔离  
5. 成本与权限边界控制  

如果你需要，我可以继续把这份报告整理成：
- **管理层 1 页摘要版**
- **技术团队晨会版**
- **带排名和风险矩阵的表格版**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-06-12）

## 1. 今日速览
过去 24 小时，NanoBot 仅新增/活跃了 2 条 Issue，但 PR 更新达到 11 条，说明项目当前处于“开发推进快、社区提问相对少”的状态。  
今天没有新版本发布，整体仍是以功能打磨、稳定性修复和基础设施优化为主，而不是面向用户的版本节奏。  
从 PR 主题看，项目重心集中在 **cron / session / MCP / skills / provider / SDK** 等核心能力上，属于对产品底座的持续加固。  
公开互动数据里，Issue 和 PR 基本都没有评论与反应，说明今日社区讨论热度不高，但工程侧活跃度明显。  
总体判断：**项目健康度偏积极，技术迭代活跃，但仍存在少量高优先级稳定性问题需要及时收敛**。[仓库主页](https://github.com/HKUDS/nanobot)

---

## 2. 项目进展
今日确认关闭的 PR 只有 2 条，且都偏研究/文档性质，代码层面的“已落地增量”不算大：

- [#4298 Worktree feature+hermes research doc](https://github.com/HKUDS/nanobot/pull/4298)  
  关闭了一份关于 worktree feature + hermes 的研究文档，更多是阶段性探索收束，帮助后续方案评估归档。

- [#4297 Worktree feature+hermes research doc](https://github.com/HKUDS/nanobot/pull/4297)  
  与上面类似，也是研究文档类 PR 的关闭，说明相关调研内容已完成整理或不再继续推进。

**项目整体前进幅度判断：**  
- 今日“已合并/关闭”的成果偏轻量，更多是信息整理与探索收尾；
- 但同时有 **9 条待合并 PR** 在排队，覆盖稳定性修复、SDK 能力、cron 调度、skills 系统等方向，说明后续一旦进入合并窗口，增量会比较集中。

---

## 3. 社区热点
从当前数据看，**没有明显高评论或高反应的条目**：Issue 评论数为 0，PR 的评论/反应也未体现出明显活跃度。  
因此今日“热点”更多是按**业务重要性**而非互动量来判断：

- [#4302 nanobot gataway crashes after mcp reconnect](https://github.com/HKUDS/nanobot/issues/4302)  
  这是最典型的高关注稳定性问题，直接涉及 gateway 在 MCP 重连后的崩溃风险。

- [#4305 Multiple custom providers: ?](https://github.com/HKUDS/nanobot/issues/4305)  
  这是典型的配置扩展诉求，用户希望支持多个 custom/openai provider，属于可扩展性热点。

- [#4306 fix(session): prevent orphaned tool results from being persisted to history (#4006)](https://github.com/HKUDS/nanobot/pull/4306)  
  虽然是 PR，但它指向一个直接影响兼容性和历史记录正确性的核心问题，属于高价值修复。

- [#4299 feat(cron): bind scheduled automations to sessions](https://github.com/HKUDS/nanobot/pull/4299)  
  说明社区/开发者对自动化与会话绑定的需求正在增强，是架构层面的重点方向。

---

## 4. Bug 与稳定性
按严重程度排序，今日最值得关注的是：

1. **高严重度：gateway 重连后崩溃**
   - [#4302 nanobot gataway crashes after mcp reconnect](https://github.com/HKUDS/nanobot/issues/4302)  
   - 影响面：gateway 级别崩溃，属于运行时稳定性问题，且会打断 MCP 重连流程。  
   - 相关修复 PR：[#4303 fix(mcp): close tracked generators in _close_server to prevent GC crash (#4302)](https://github.com/HKUDS/nanobot/pull/4303)  
   - 结论：**已出现对应修复方向，但 issue 仍在开放中，建议优先跟进合并验证。**

2. **中高严重度：会话历史中出现 orphaned tool results**
   - [#4306 fix(session): prevent orphaned tool results from being persisted to history (#4006)](https://github.com/HKUDS/nanobot/pull/4306)  
   - 影响面：严格兼容 OpenAI/Anthropic 风格 API 的历史回放与轨迹渲染，属于数据一致性/协议兼容问题。  
   - 结论：**已有修复 PR，但仍需关注回归测试与历史数据兼容性。**

3. **中严重度：cron 与子 agent 生命周期不同步**
   - [#4304 fix(cron): wait for spawned subagents before marking cron job complete](https://github.com/HKUDS/nanobot/pull/4304)  
   - 影响面：任务状态可能过早标记完成，导致调度结果与真实执行状态不一致。  
   - 结论：**这是典型的并发/任务生命周期问题，建议纳入稳定性回归集。**

---

## 5. 功能请求与路线图信号
今日的新需求与现有 PR 一起看，路线图信号很清晰，主要集中在“更强的可配置性 + 更完整的自动化/SDK 能力”：

- [#4305 Multiple custom providers: ?](https://github.com/HKUDS/nanobot/issues/4305)  
  用户希望支持多个 custom/openai provider，说明 provider 抽象层还在扩展阶段。  
  **路线图判断：高概率会被纳入后续版本讨论**，因为它属于平台级能力，而不是边缘需求。

- [#4296 feat(sdk): expand Python SDK runtime controls](https://github.com/HKUDS/nanobot/pull/4296)  
  这表明 SDK 正从“简单调用入口”向“开发者可控运行时”演进。  
  **路线图信号很强**，如果合并成功，意味着 NanoBot 正在增强二次开发与嵌入式集成能力。

- [#4301 feat: cache skills loader entries and metadata](https://github.com/HKUDS/nanobot/pull/4301)  
  技术指向是性能优化，说明技能系统已进入规模化使用阶段。  

- [#4300 feat(skills): Check skill type requirements](https://github.com/HKUDS/nanobot/pull/4300)  
  反映用户开始需要“按类型/能力筛选技能”，说明 skills 体系正在从“能加载”走向“能治理”。  

- [#4299 feat(cron): bind scheduled automations to sessions](https://github.com/HKUDS/nanobot/pull/4299)  
  表明自动化系统正在和会话模型深度耦合，是很强的产品化信号。  

---

## 6. 用户反馈摘要
由于今日 Issue/PR 几乎没有评论，**没有足够的评论文本可直接做“用户反馈抽样”**。不过从问题描述中，仍能看出真实痛点：

- 用户希望 **同一套系统支持多个 provider 配置**，当前配置模型显得不够灵活。[#4305](https://github.com/HKUDS/nanobot/issues/4305)
- 用户在 **MCP 重连** 场景中遇到直接崩溃，说明对长连接和异常恢复的稳定性要求很高。[#4302](https://github.com/HKUDS/nanobot/issues/4302)
- 用户希望 **工具调用历史更干净、可被严格 API 接受**，这说明已有用户在做跨模型/跨 API 的兼容使用。[#4306](https://github.com/HKUDS/nanobot/pull/4306)
- 自动化用户非常在意 **cron、session、subagent 的生命周期一致性**，否则任务“看似完成但实际上还在跑”。[#4304](https://github.com/HKUDS/nanobot/pull/4304)

**总体感受：**
- 用户最在意的是“稳定、可配置、可复用”；
- 目前没有看到明显负面情绪集中爆发，但一些底层问题已经开始影响真实使用路径。

---

## 7. 待处理积压
严格来说，**今天没有明显“长期未响应”的老 issue**；当前待处理项大多是 2026-06-11～06-12 新近提出。  
但从维护优先级看，下面这些属于**值得尽快消化的高价值积压**：

### 待优先处理的 Issue
- [#4302 nanobot gataway crashes after mcp reconnect](https://github.com/HKUDS/nanobot/issues/4302)  
  高优先级稳定性问题，建议尽快确认修复 PR [#4303](https://github.com/HKUDS/nanobot/pull/4303) 的有效性。

- [#4305 Multiple custom providers: ?](https://github.com/HKUDS/nanobot/issues/4305)  
  平台配置能力诉求，可能影响后续 provider 架构设计。

### 待优先 review 的 PR
- [#4306](https://github.com/HKUDS/nanobot/pull/4306)
- [#4304](https://github.com/HKUDS/nanobot/pull/4304)
- [#4296](https://github.com/HKUDS/nanobot/pull/4296)
- [#4299](https://github.com/HKUDS/nanobot/pull/4299)
- [#4303](https://github.com/HKUDS/nanobot/pull/4303)
- [#4301](https://github.com/HKUDS/nanobot/pull/4301)
- [#4300](https://github.com/HKUDS/nanobot/pull/4300)
- [#4295](https://github.com/HKUDS/nanobot/pull/4295)
- [#4294](https://github.com/HKUDS/nanobot/pull/4294)

**维护建议：**
- 优先处理崩溃类与数据一致性类 PR；
- 再处理 cron/session/SDK 这类结构性改动；
- 最后再推进文档、配置文案和仓库清理类 PR。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合飞书/企业微信发布的简版**，或  
2. **适合周报汇总的更正式版本**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-06-12）

## 1) 今日速览

今天 Hermes Agent 仍处于**高活跃迭代期**：过去 24 小时内分别出现了 **50 条 Issue 更新**和 **50 条 PR 更新**，说明社区反馈与开发推进几乎同步。  
从结果看，**7 个 Issue 已关闭、9 个 PR 已合并/关闭**，但**没有新版本发布**，项目仍以修复、打磨和功能试探为主。  
讨论焦点集中在 **Desktop/TUI 交互稳定性、网关/cron 可靠性、远程模式兼容性、以及多平台消息适配**。  
整体判断：项目健康度偏正向，但当前主要矛盾已经从“有没有功能”转向“跨平台一致性、状态隔离和运行稳定性”。

---

## 2) 项目进展

### 今日已关闭的重要 PR

- [#44576 fix(images): transcode HEIC/HEIF to JPEG at cache and vision boundaries](https://github.com/NousResearch/hermes-agent/pull/44576)  
  关闭状态。这个修复直击 iPhone 照片、AirDrop、邮件附件等 HEIC/HEIF 输入无法被视觉链路正确识别的问题，补齐了图片缓存与视觉入口的兼容性缺口。对移动端图片流入 Hermes 的可用性提升明显。

- [#44571 fix(desktop): harden dictation and native alerts](https://github.com/NousResearch/hermes-agent/pull/44571)  
  作者主动关闭。虽然没有进入合并，但它表明桌面端语音输入/系统通知仍在被持续打磨；同时也说明上游对“通用性、可维护性、无用户特定耦合”的接受门槛较高。

### 今天的“前进幅度”怎么理解

- 从更新面看，项目在 **稳定性修复 + 体验修补 + 平台适配** 三条线同时推进。
- 从收口面看，**9 个 PR 进入关闭/合并阶段**，但**没有版本发布**，意味着这些成果尚未形成一次对外的稳定发行。
- 这通常对应一种典型状态：**开发密度高，交付还在收敛**。

---

## 3) 社区热点

> 今日 Issues 侧的讨论明显比 PR 侧更活跃；多数 PR 还停留在提交/待审阶段，尚未形成高评论争议。

### 评论最多的热点 Issue

- [#44532 [CLOSED] hermes setup (linux version) incompletely](https://github.com/NousResearch/hermes-agent/issues/44532)  
  评论数：3  
  诉求核心：Linux/WSL 下 `hermes setup` 没有像 macOS 一样完整初始化，尤其是工具 API 配置不一致。  
  背后反映：安装/初始化流程仍存在**跨平台差异**，用户对“一键可用”的期待很高。

- [#44456 [OPEN] Desktop /compress returns "not a quick/plugin/skill command: compress"](https://github.com/NousResearch/hermes-agent/issues/44456)  
  评论数：3  
  诉求核心：TUI/桌面输入框对内建 slash 命令没有正确转发。  
  背后反映：**命令路由层**还不够统一，用户希望“/compress”这类基础能力在所有入口都可用。

- [#44562 [OPEN] Frontend crash: tapClientLookup Index out of bounds when tool returns unexpected data](https://github.com/NousResearch/hermes-agent/issues/44562)  
  评论数：2  
  诉求核心：工具返回格式异常时，前端直接崩溃或白屏。  
  背后反映：UI 对异常数据的容错不足，用户把 Hermes 当生产工具使用时，对稳定性非常敏感。

- [#44499 [OPEN] Desktop agent ignores explicitly configured BrowserOS MCP and uses built-in browser_* tools instead](https://github.com/NousResearch/hermes-agent/issues/44499)  
  评论数：2  
  诉求核心：用户显式指定 BrowserOS MCP，但系统仍偏向内建 `browser_*` 工具。  
  背后反映：**工具优先级与意图遵循**不一致，会严重损害可控性。

- [#44449 [CLOSED] Archive path still 400s after #44138 — PATCH endpoint allowlist missing 'archived' field](https://github.com/NousResearch/hermes-agent/issues/44449)  
  评论数：2  
  诉求核心：归档会话的字段未被后端 allowlist 接受。  
  背后反映：前后端协议字段演进仍有断层，属于典型的“修一半、漏一半”。

### 反应最多的条目

- [#44428 [OPEN] Support Telegram Bot API 10.1 Rich Messages and rich draft streaming](https://github.com/NousResearch/hermes-agent/issues/44428)  
  👍：1  
  这是今日少数出现明确点赞的功能需求，说明 Telegram 富消息与流式草稿能力有真实用户兴趣。

---

## 4) Bug 与稳定性

以下按严重程度排序，并标注是否已有对应 fix PR。

| 优先级 | 问题 | 影响 | 修复状态 |
|---|---|---|---|
| P1 | [#44585 Cron can inherit temporary paid provider state and continue billing during pause/stop containment](https://github.com/NousResearch/hermes-agent/issues/44585) | **最高风险**。cron 任务继承了临时的付费 provider/model 状态，在尝试停用后仍持续产生费用调用，属于“实际资金损耗”级别问题。 | **未见对应 fix PR** |
| P2 | [#44580 hermes update reports success when desktop rebuild silently fails](https://github.com/NousResearch/hermes-agent/issues/44580) | 更新失败被误报为成功，容易让用户误判升级完成，造成版本漂移。 | **有 fix PR：#44591** |
| P2 | [#44560 model.options handler blocks on synchronous per-provider HTTP calls, causing WebSocket timeout](https://github.com/NousResearch/hermes-agent/issues/44560) | 同步探测外部 provider 导致 WebSocket 超时，影响桌面/网关交互响应。 | **有 fix PR：#44577** |
| P2 | [#44567 Bugs Encountered When Using Hermes Dashboard on Windows 11](https://github.com/NousResearch/hermes-agent/issues/44567) | `dashboard --status/--stop` 在 Windows 11 下失效，属于常用运维命令故障。 | **有 fix PR：#44578** |
| P2 | [#44456 Desktop /compress returns "not a quick/plugin/skill command: compress"](https://github.com/NousResearch/hermes-agent/issues/44456) | 内建 slash 命令失效，直接影响桌面端基础交互。 | **未见对应 fix PR** |
| P2 | [#44499 Desktop agent ignores explicitly configured BrowserOS MCP and uses built-in browser_* tools instead](https://github.com/NousResearch/hermes-agent/issues/44499) | 用户明确配置被忽略，属于“意图不生效”的控制面问题。 | **未见对应 fix PR** |
| P2 | [#44581 Desktop folder attach fails — drag-and-drop errors with 'file not found on gateway and no data_url provided'](https://github.com/NousResearch/hermes-agent/issues/44581) | 文件/文件夹附件链路故障，影响桌面端常用输入方式。 | **未见对应 fix PR** |
| P2 | [#44541 cron delivery to Discord fails with 'Session is closed' after reconnect](https://github.com/NousResearch/hermes-agent/issues/44541) | cron 在 Discord reconnect 后投递失败，聊天能用但自动化投递断裂，说明会话管理不一致。 | **未见对应 fix PR** |
| P3 | [#44562 tapClientLookup Index out of bounds when tool returns unexpected data](https://github.com/NousResearch/hermes-agent/issues/44562) | 前端崩溃/白屏风险，属于异常数据处理不足。 | **未见对应 fix PR** |
| P3 | [#44468 `hermes send` to Discord drops remaining chunks on a 429](https://github.com/NousResearch/hermes-agent/issues/44468) | 429 限流后后续分片被静默丢弃，消息完整性受损。 | **未见对应 fix PR** |
| P3 | [#44582 pre_tool_call plugin hook not invoked during agent tool execution](https://github.com/NousResearch/hermes-agent/issues/44582) | 插件钩子失效，影响扩展生态的可预测性。 | **未见对应 fix PR** |

### 结论
今天最值得警惕的是 **#44585 资金持续消耗风险**，它比一般崩溃/失败更接近“生产事故”。  
其次是 **更新误报、WebSocket 阻塞、Windows 运维命令失效** 这几类高频路径问题，已经有明确 fix PR 跟进，说明团队响应是及时的。

---

## 5) 功能请求与路线图信号

以下需求从“用户诉求”走向“路线图信号”的概率较高，尤其是已有对应 PR 时。

- [#44594 feat(feishu): CardKit v1 streaming card support](https://github.com/NousResearch/hermes-agent/pull/44594)  
  这是强烈的平台化信号：Feishu 富卡片、流式输出、交互式 UI 正在成为 Hermes 的重要发布方向。

- [#44593 fix(mcp): allow remote OAuth callback flows](https://github.com/NousResearch/hermes-agent/pull/44593)  
  面向守护进程/远程部署的 OAuth 回调能力，明显服务于企业自托管和无 TTY 场景，优先级较高。

- [#44587 feat(agent): retry malformed tool calls with forced tool_choice](https://github.com/NousResearch/hermes-agent/pull/44587)  
  这是对“模型偶发输出脏工具调用”的工程化兜底，属于提升整体可用性的关键增强。

- [#44586 feat(memory+delegation): layered memory types, proposal gate, retrieval pack...](https://github.com/NousResearch/hermes-agent/pull/44586)  
  指向更大的 agent 编排能力升级，说明项目正在从“工具调用”向“记忆/委派/治理”上层架构扩展。

- [#44584 Add Courier email skill](https://github.com/NousResearch/hermes-agent/pull/44584)  
  邮件场景继续被拓展，说明 Hermes 正在加强“全渠道代理”定位。

- [#44566 feat(desktop): add mission control view](https://github.com/NousResearch/hermes-agent/pull/44566)  
  这是桌面端可观测性和运营视图的信号，意味着产品正在补齐“管理层入口”。

- [#44572 feat(cron): support multiple cron expressions per job](https://github.com/NousResearch/hermes-agent/pull/44572)  
  自动化能力正在从单点触发向更复杂的调度表达演进。

### 还值得纳入后续版本评估的需求
- [#44548 `.hermes/.env` vars not propagated to MCP server subprocesses](https://github.com/NousResearch/hermes-agent/issues/44548)  
  对插件/子进程的环境变量传递是部署摩擦点，偏“平台基础能力”。
- [#44421 add --profile flag to hermes gateway start/restart](https://github.com/NousResearch/hermes-agent/issues/44421)  
  反映多 profile / 多实例运维诉求。
- [#44428 Support Telegram Bot API 10.1 Rich Messages](https://github.com/NousResearch/hermes-agent/issues/44428)  
  若 Telegram 生态用户增长，这条会很容易进入实现优先级。

---

## 6) 用户反馈摘要

### 1. 桌面端体验仍是高频痛点
用户不断在反馈 Windows/macOS/Linux 的差异：  
- 安装初始化不完整：[#44532](https://github.com/NousResearch/hermes-agent/issues/44532)  
- 更新流程卡死/误报成功：[#44580](https://github.com/NousResearch/hermes-agent/issues/44580)、[#44515](https://github.com/NousResearch/hermes-agent/issues/44515)、[#44557](https://github.com/NousResearch/hermes-agent/issues/44557)  
- 非默认 profile 启动失败：[#44530](https://github.com/NousResearch/hermes-agent/issues/44530)  
这表明用户已经把 Hermes 当作“日常工作台”，而不是试验性工具。

### 2. 命令路由与状态一致性是用户最在意的“可信度”问题
- `/compress`、`/undo` 等基础命令失效：[#44456](https://github.com/NousResearch/hermes-agent/issues/44456)、[#44543](https://github.com/NousResearch/hermes-agent/issues/44543)  
- dashboard 的 status/stop 不可靠：[#44567](https://github.com/NousResearch/hermes-agent/issues/44567)  
用户对“我输入什么，就发生什么”非常敏感，一旦命令被吃掉，会立刻损害信任。

### 3. 远程/网关模式正在成为真实生产场景
- 远程文件链接失效：[#44523](https://github.com/NousResearch/hermes-agent/issues/44523)  
- 远程文件夹选择器不可滚动：[#44522](https://github.com/NousResearch/hermes-agent/issues/44522)  
- 远程 OAuth/回调支持：[#44593](https://github.com/NousResearch/hermes-agent/pull/44593)  
这说明 Hermes 已进入“本地可用”之外的阶段，用户开始在远程、daemon、容器化环境中长期运行。

### 4. 多平台消息生态的使用强度上升
- Discord：[#44468](https://github.com/NousResearch/hermes-agent/issues/44468)、[#44541](https://github.com/NousResearch/hermes-agent/issues/44541)  
- Telegram：[#44428](https://github.com/NousResearch/hermes-agent/issues/44428)  
- Feishu：[#44594](https://github.com/NousResearch/hermes-agent/pull/44594)  
- WeCom：[#44497](https://github.com/NousResearch/hermes-agent/issues/44497)  
用户不只是希望“能接入”，而是希望在限流、重连、富格式、草稿流式输出等细节上足够稳。

### 5. 对成本和自动化安全边界的担忧开始出现
- cron 继承付费 provider 状态导致持续计费：[#44585](https://github.com/NousResearch/hermes-agent/issues/44585)  
这类反馈说明用户已经在把 Hermes 用到“自动花钱”的场景，稳定性问题会直接变成财务问题。

---

## 7) 待处理积压

> 由于你给出的数据窗口只有最近 24 小时，这里我不把它们称为“长期未响应”，而是标记为**高优先级、当前仍未见明确修复闭环**的积压项。

### 优先级较高、但尚未看到对应 fix PR 的问题
- [#44585 Cron can inherit temporary paid provider state and continue billing during pause/stop containment](https://github.com/NousResearch/hermes-agent/issues/44585)  
  资金安全级别，建议优先确认复现路径与状态隔离边界。

- [#44456 Desktop /compress returns "not a quick/plugin/skill command: compress"](https://github.com/NousResearch/hermes-agent/issues/44456)  
  基础命令失效，影响桌面端核心体验。

- [#44499 Desktop agent ignores explicitly configured BrowserOS MCP and uses built-in browser_* tools instead](https://github.com/NousResearch/hermes-agent/issues/44499)  
  工具选择可控性问题，容易引发用户对代理行为的不信任。

- [#44581 Desktop folder attach fails](https://github.com/NousResearch/hermes-agent/issues/44581)  
  附件链路故障，属于高频使用路径。

- [#44541 cron delivery to Discord fails after reconnect](https://github.com/NousResearch/hermes-agent/issues/44541)  
  自动化投递和交互聊天状态不一致，建议尽快统一会话生命周期。

- [#44562 Frontend crash: tapClientLookup Index out of bounds](https://github.com/NousResearch/hermes-agent/issues/44562)  
  前端容错不足，容易演变成“偶发白屏”这类高感知故障。

### 已有明确修复路径的积压
- [#44580](https://github.com/NousResearch/hermes-agent/issues/44580) → [#44591](https://github.com/NousResearch/hermes-agent/pull/44591)  
- [#44560](https://github.com/NousResearch/hermes-agent/issues/44560) → [#44577](https://github.com/NousResearch/hermes-agent/pull/44577)  
- [#44567](https://github.com/NousResearch/hermes-agent/issues/44567) → [#44578](https://github.com/NousResearch/hermes-agent/pull/44578)  

这三项说明维护团队对高频问题已有较快响应，后续关键在于尽快合并并回归验证。

---

## 总体判断

Hermes Agent 今天的状态可以概括为：**增长中的多场景代理平台，正在经历“功能扩张期”向“稳定交付期”的过渡**。  
从社区反馈看，用户已经深入使用 Desktop、Gateway、Cron、MCP、Discord/Telegram/Feishu 等能力，因此当前的核心挑战不再只是“实现功能”，而是**在复杂运行环境下保持一致性、可控性和成本安全**。  
如果后续能尽快把 **P1/P2 稳定性问题** 转化为可合并 PR，并形成版本发布，项目健康度会显著提升。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报｜2026-06-12

## 1. 今日速览
过去 24 小时内，PicoClaw 处于**中等活跃、维护偏重**的状态：共更新了 1 条 Issue 和 12 条 PR，但新增发布为 0，说明当天主要精力集中在缺陷反馈与依赖/前端维护上，而非版本交付。  
PR 侧以 Dependabot 自动升级为主，功能性变更较少，反映项目当前在做“基础健康度”维护。  
唯一新增的 Issue 指向一个**高使用场景相关的稳定性问题**：图像描述在模型不支持视觉能力时会输出幻觉内容，值得优先关注。  
整体来看，项目**活跃但讨论热度不高**，工程推进稳定，社区反馈集中且较明确。  
- 相关链接：Issue #3108 <https://github.com/sipeed/picoclaw/issues/3108>；PR 列表 <https://github.com/sipeed/picoclaw/pulls>

## 3. 项目进展
今日已关闭/合并的 4 个 PR 均为**依赖升级类维护项**，主要推进的是底层库与构建链路健康度，而不是用户可感知的新功能：

- **#3106**：升级 `github.com/aws/aws-sdk-go-v2/config`，加强 AWS 相关依赖版本一致性  
  <https://github.com/sipeed/picoclaw/pull/3106>
- **#3099**：升级 `golang.org/x/sync`，属于 Go 基础并发库维护  
  <https://github.com/sipeed/picoclaw/pull/3099>
- **#3098**：升级 `github.com/modelcontextprotocol/go-sdk`，对 MCP 相关能力的底层依赖做更新  
  <https://github.com/sipeed/picoclaw/pull/3098>
- **#3102**：升级 `github.com/aws/aws-sdk-go-v2` 主包  
  <https://github.com/sipeed/picoclaw/pull/3102>

**推进评估**：  
- 功能侧：今日几乎没有新增产品能力落地。  
- 稳定性/维护侧：完成 4 项依赖清理，对后续构建、兼容性与安全性有正向作用。  
- 项目整体前进幅度：**偏稳健、偏底座**，更像是在为后续版本做铺垫。  

## 4. 社区热点
本次数据里，**没有出现评论数或反应数明显领先的条目**；所有条目的评论数基本为 0 或未披露，说明当天的“热度”更多来自更新数量，而非讨论强度。  
在可见内容中，最值得关注的是以下两类：

1. **问题反馈焦点：图像描述幻觉问题**  
   - Issue #3108：当活跃模型不具备视觉能力时，图像描述会生成与图片无关的回答。  
   - 链接：<https://github.com/sipeed/picoclaw/issues/3108>  
   - 背后诉求：用户希望系统能**准确识别模型能力边界**，避免“看似成功、实际错误”的输出。

2. **维护型热点：Dependabot 批量升级**  
   - 代表 PR：#3107、#3105、#3104、#3103、#3101、#3100  
   - 链接示例：  
     - #3107 <https://github.com/sipeed/picoclaw/pull/3107>  
     - #3105 <https://github.com/sipeed/picoclaw/pull/3105>  
     - #3104 <https://github.com/sipeed/picoclaw/pull/3104>  
   - 背后诉求：维持前端与 AI 集成栈的最新状态，减少潜在兼容性与安全风险。

## 5. Bug 与稳定性
### 严重性较高：视觉能力误判导致幻觉输出
- **Issue #3108** `[OPEN] [BUG] Image description requests hallucinate when active model lacks vision support`  
  <https://github.com/sipeed/picoclaw/issues/3108>  
- 现象：在 OpenRouter 上使用 `deepseek/deepseek-v4-flash` 时，请求图像描述后，虽然图片可能通过 `load_image` 工具加载，但最终回复与实际图像内容无关。  
- 影响：属于**用户可直接感知的错误输出**，会损害可信度，尤其在图像理解场景中风险较高。  
- 当前状态：**尚未看到对应 fix PR**。  
- 可能根因：运行模型本身不具备 vision 能力，但系统仍进入了图像理解/描述流程，导致能力与任务不匹配。  

### 其余稳定性信号
- 本日报告中**未见崩溃、回归或已关闭的 bug 修复 PR**。  
- 今日已关闭 PR 主要是依赖更新，不属于直接 bug 修复。  
- 相关链接：Issue #3108 <https://github.com/sipeed/picoclaw/issues/3108>

## 6. 功能请求与路线图信号
今日可见的新需求主要来自 PR 和 issue 两端：

1. **图像理解能力的健壮性改进需求**
   - 来自 Issue #3108  
   - 链接：<https://github.com/sipeed/picoclaw/issues/3108>  
   - 路线图信号：非常明确。后续很可能需要加入**模型能力探测、任务降级、显式拒答或 fallback 机制**。

2. **聊天输入交互优化**
   - PR #3097：为聊天输入框增加 Shift+Enter 提示  
   - 链接：<https://github.com/sipeed/picoclaw/pull/3097>  
   - 路线图信号：属于低风险、高可用性提升，较容易进入下一版本。

3. **Copilot SDK 大版本升级**
   - PR #3107：`github.com/github/copilot-sdk/go` 从 0.2.0 升至 1.0.1  
   - 链接：<https://github.com/sipeed/picoclaw/pull/3107>  
   - 路线图信号：虽然是依赖更新，但大版本升级往往意味着 API/行为变化，可能影响后续 AI 集成能力，值得重点验证。

4. **前端构建与开发体验升级**
   - PR #3105 / #3104 / #3103 / #3101 / #3100  
   - 链接示例：  
     - #3105 <https://github.com/sipeed/picoclaw/pull/3105>  
     - #3104 <https://github.com/sipeed/picoclaw/pull/3104>  
     - #3103 <https://github.com/sipeed/picoclaw/pull/3103>  
   - 路线图信号：说明前端框架和工具链仍在持续演进，下一版本大概率会优先吸收这些“低耦合改动”。

## 7. 用户反馈摘要
从唯一的 Issue 可提炼出较清晰的用户痛点：

- **真实痛点**：当用户要求“描述图片”时，系统返回了与图片内容不符的回答。  
  - 链接：<https://github.com/sipeed/picoclaw/issues/3108>  
- **使用场景**：通过 OpenRouter 调用 `deepseek/deepseek-v4-flash`，并依赖 `load_image` 工具处理图像。  
- **核心不满**：系统似乎**没有正确识别当前模型是否具备视觉能力**，导致输出“看似正常但实际错误”的答案。  
- **潜在满意点**：用户已经把问题定位到具体模型与路径，说明产品在工具链可观测性上已有一定基础，便于排查。  
- **对产品的期待**：希望 PicoClaw 在多模型/多能力路由场景下，能更明确地处理“文本模型请求图像任务”的边界问题。  

## 8. 待处理积压
从当前快照看，**没有明显跨多日沉默的长期遗留项**；但待处理队列已存在一定规模，建议维护者尽快分流：

### 重点待处理 Issue
- **#3108**：图像描述幻觉 bug，影响用户可信度，建议优先级靠前  
  <https://github.com/sipeed/picoclaw/issues/3108>

### 重点待处理 PR
- **#3107**：Copilot SDK 1.0.1 大版本升级，需重点验证兼容性  
  <https://github.com/sipeed/picoclaw/pull/3107>
- **#3105**：ESLint 升级，前端质量链路相关  
  <https://github.com/sipeed/picoclaw/pull/3105>
- **#3104**：shadcn 升级，前端组件栈更新  
  <https://github.com/sipeed/picoclaw/pull/3104>
- **#3103**：typescript-eslint 升级，前端静态检查更新  
  <https://github.com/sipeed/picoclaw/pull/3103>
- **#3101**：Vite 升级，构建工具链更新  
  <https://github.com/sipeed/picoclaw/pull/3101>
- **#3100**：`@vitejs/plugin-react` 升级  
  <https://github.com/sipeed/picoclaw/pull/3100>
- **#3097**：Shift+Enter 提示，用户体验增强  
  <https://github.com/sipeed/picoclaw/pull/3097>
- **#3096**：README 增加 PicoPaw banner 的文档更新  
  <https://github.com/sipeed/picoclaw/pull/3096>

**维护建议**：  
- 先处理 **#3108**，避免能力不匹配带来的错误回答继续影响用户体验。  
- 对 **#3107** 这种大版本升级，建议在合并前做更严格的回归验证。  
- 前端依赖升级类 PR 可按风险分批合并，以减少一次性引入的变更面。  

如果你愿意，我也可以把这份日报进一步整理成**“适合直接发布到团队群/周报系统”的精简版**。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-06-12）

## 1) 今日速览
NanoClaw 过去 24 小时整体呈现“高 PR 活动、低 Issue 噪音”的状态：没有新增或活跃 Issues，但 Pull Request 侧更新非常密集，共 13 条，其中 9 条已合并/关闭、4 条仍在处理中。  
这说明项目当前主要精力集中在持续修复与能力扩展，而不是外部问题堆积。  
从 PR 主题看，改动集中在信令适配、CLI/会话交付、审批回调、容器生命周期和 delivery registry 等核心链路，属于对产品稳定性和可扩展性的“底座加固”。  
整体健康度偏稳健：没有公开版本发布，但修复推进积极，说明维护节奏正常，且代码层面持续演进。  

---

## 2) 版本发布
**今日无新版本发布**，因此省略。

---

## 3) 项目进展
今日最重要的进展来自 **9 个已关闭 PR**，它们主要推动了以下方向：

- **会话与交付链路的修复与完善**
  - [#2738 fix(session-manager): writeOutboundDirect opens outbound.db read-only — command-gate denials never deliver](https://github.com/qwibitai/nanoclaw/pull/2738)
  - [#2734 feat(delivery): getDeliveryAction read side for the action registry](https://github.com/qwibitai/nanoclaw/pull/2734)

- **审批与用户上下文记录增强**
  - [#2737 feat(approvals): approval-resolved callback registry — modules observe resolution additively](https://github.com/qwibitai/nanoclaw/pull/2737)
  - [#2735 fix(chat-sdk-bridge): record the acting user on resolved approval cards](https://github.com/qwibitai/nanoclaw/pull/2735)

- **容器与宿主稳定性改进**
  - [#2740 feat(container): per-group idle timeout — clean exit for ephemeral sessions](https://github.com/qwibitai/nanoclaw/pull/2740)
  - [#2736 fix(host-sweep): grace period for freshly-woken containers with stale processing claims](https://github.com/qwibitai/nanoclaw/pull/2736)

- **接入/扩展能力增强**
  - [#2739 feat(webhook-server): raw-route registry — non-Chat-SDK webhooks become an append](https://github.com/qwibitai/nanoclaw/pull/2739)
  - [#2733 feat(channels): native channel-instance dimension — multi-bot substrate](https://github.com/qwibitai/nanoclaw/pull/2733)

- **流程体验修复**
  - [#2741 fix(setup): auto-submit handoff context as Claude's first prompt](https://github.com/qwibitai/nanoclaw/pull/2741)

### 进展判断
如果把这些合并/关闭的 PR 视作“有效交付”，那么 NanoClaw 今日至少完成了对 **消息交付、审批回调、容器调度、渠道抽象、Webhook 扩展** 等多个关键子系统的收口。  
这类 PR 不只是表层功能增加，更像是在补齐“Agent 操作系统”中的基础设施能力。  
从项目成熟度看，这是一次偏底层、偏架构型的推进，说明项目正在从“能跑”走向“更稳、可扩展、可多通道化”。  

---

## 4) 社区热点
**今日没有明显的评论热度或点赞热度信号。**  
当前 GitHub 数据中，所有 PR 的评论数均为 `undefined`，👍 也全部为 0，因此无法从互动量上识别“最活跃讨论”。  

不过，从变更的重要性来看，以下开放 PR 值得重点关注，可能是当前社区与维护者最在意的议题：

- [#2744 fix(signal): deliver agent reactions and forward inbound reactions](https://github.com/qwibitai/nanoclaw/pull/2744)
  - 诉求：Signal 通道的 reaction 目前被静默丢弃，影响 agent 反馈闭环与用户可见性。

- [#2743 fix(cli): wirings create silently skips the agent_destinations side effect — agent sends to the new chat are dropped](https://github.com/qwibitai/nanoclaw/pull/2743)
  - 诉求：CLI 创建 wiring 时缺少副作用，导致新聊天中的发送链路失效，属于高优先级正确性问题。

- [#2732 Harden host + agent-runner from health audit findings](https://github.com/qwibitai/nanoclaw/pull/2732)
  - 诉求：来自健康审计的系统加固，通常代表运维和可靠性层面的核心关切。

### 热点结论
虽然没有评论驱动的“社区舆情”，但热点议题已经很清晰：**消息可靠投递、通道行为一致性、以及宿主稳定性**。这表明 NanoClaw 当前用户最关心的是“基础链路不能丢、不能卡、不能默默失败”。  

---

## 5) Bug 与稳定性
今日没有 Issues，因此没有公开 Issue 级别的新增 Bug 报告。  
但从 PR 主题可以明确识别出若干 **高价值 Bug 修复/稳定性问题**，按影响面排序如下：

### 高严重度
1. [#2743 fix(cli): wirings create silently skips the agent_destinations side effect](https://github.com/qwibitai/nanoclaw/pull/2743)  
   - 问题：创建 wiring 后缺少必要副作用，导致消息发往新 chat 时被丢弃。  
   - 影响：会话连通性直接受损，属于“创建成功但实际不可用”的典型高风险 bug。  
   - 状态：**已有 fix PR（OPEN）**

2. [#2744 fix(signal): deliver agent reactions and forward inbound reactions](https://github.com/qwibitai/nanoclaw/pull/2744)  
   - 问题：Signal adapter 静默丢弃 reaction，且不转发 inbound reactions。  
   - 影响：影响 agent 交互反馈闭环，用户感知为“功能看似可用，实际无响应”。  
   - 状态：**已有 fix PR（OPEN）**

3. [#2738 fix(session-manager): writeOutboundDirect opens outbound.db read-only](https://github.com/qwibitai/nanoclaw/pull/2738)  
   - 问题：command-gate denials 无法正确 deliver。  
   - 影响：审批/拦截后的下行消息链路可能失效，影响治理流程。  
   - 状态：**已关闭/处理**

### 中高严重度
4. [#2736 fix(host-sweep): grace period for freshly-woken containers with stale processing claims](https://github.com/qwibitai/nanoclaw/pull/2736)  
   - 问题：容器刚唤醒时可能因旧 processing claim 被误判。  
   - 影响：可能引发误杀、重复调度或状态抖动。  
   - 状态：**已关闭/处理**

5. [#2735 fix(chat-sdk-bridge): record the acting user on resolved approval cards](https://github.com/qwibitai/nanoclaw/pull/2735)  
   - 问题：审批卡片未准确记录实际操作用户。  
   - 影响：审计可追溯性下降，尤其对多人协作与安全审查不利。  
   - 状态：**已关闭/处理**

### 其他稳定性增强
- [#2732 Harden host + agent-runner from health audit findings](https://github.com/qwibitai/nanoclaw/pull/2732)
- [#2740 feat(container): per-group idle timeout — clean exit for ephemeral sessions](https://github.com/qwibitai/nanoclaw/pull/2740)

这两项更偏向“健康度提升”和“资源回收策略优化”，对长期运行的 agent 平台很重要。

---

## 6) 功能请求与路线图信号
今日没有 Issues，因此没有来自 Issue 的显式功能请求；不过从 PR 主题可提炼出几条较强的路线图信号：

### 可能进入下一版本的方向
1. **多通道/多实例化能力继续增强**
   - [#2733 feat(channels): native channel-instance dimension — multi-bot substrate](https://github.com/qwibitai/nanoclaw/pull/2733)
   - 信号：项目在向“一个平台承载多个 bot/agent 实例”的方向演进。

2. **Webhook 扩展能力开放化**
   - [#2739 feat(webhook-server): raw-route registry](https://github.com/qwibitai/nanoclaw/pull/2739)
   - 信号：支持非 Chat-SDK webhook 的接入，说明平台正在走向更通用的事件入口。

3. **审批与回调机制平台化**
   - [#2737 feat(approvals): approval-resolved callback registry](https://github.com/qwibitai/nanoclaw/pull/2737)
   - 信号：审批完成后可被多个模块订阅，说明内部事件系统更像插件化架构。

4. **交付动作抽象增强**
   - [#2734 feat(delivery): getDeliveryAction read side for the action registry](https://github.com/qwibitai/nanoclaw/pull/2734)
   - 信号：投递层正在从“写入执行”走向“可查询、可编排”的动作注册体系。

### 判断
如果后续这些功能继续收敛，下一版本很可能会强调：
- 多通道统一抽象
- 更强的可扩展接入能力
- 审批/回调的事件化
- 消息交付的可观测与可编排

---

## 7) 用户反馈摘要
由于今日 **没有 Issues 和评论数据**，无法直接从用户留言中提炼反馈。  
但从 PR 主题可以间接看出用户/维护者所暴露的真实痛点：

- **“看起来成功，实际消息没发出去”**  
  典型体现在 [#2743](https://github.com/qwibitai/nanoclaw/pull/2743) 和 [#2738](https://github.com/qwibitai/nanoclaw/pull/2738)，说明用户非常在意链路可靠性与副作用完整性。

- **“交互过程要有反馈闭环”**  
  体现在 [#2744](https://github.com/qwibitai/nanoclaw/pull/2744)，reaction 不转发会削弱 agent 与人的即时互动体验。

- **“审计与责任归属要清楚”**  
  体现在 [#2735](https://github.com/qwibitai/nanoclaw/pull/2735)，说明在审批流程里，谁做了什么必须可追踪。

- **“长期运行不能抖动、不能卡死”**  
  体现在 [#2736](https://github.com/qwibitai/nanoclaw/pull/2736)、[#2740](https://github.com/qwibitai/nanoclaw/pull/2740)、[#2732](https://github.com/qwibitai/nanoclaw/pull/2732)。

### 反馈结论
用户真正关心的不是单点功能炫技，而是：
- 消息是否可靠送达
- 审批和回调是否可追踪
- 容器和 runner 是否稳定
- 新接入方式是否不破坏已有行为

这说明 NanoClaw 的使用场景已进入“准生产/生产化”阶段。

---

## 8) 待处理积压
今日没有 Issues，因此**长期未响应的 Issue 积压为 0**。  
但仍有 4 个开放 PR 需要维护者继续跟进，建议优先级如下：

### 高优先级开放 PR
1. [#2743 fix(cli): wirings create silently skips the agent_destinations side effect](https://github.com/qwibitai/nanoclaw/pull/2743)  
   - 影响面大，属于核心送达链路正确性问题。

2. [#2744 fix(signal): deliver agent reactions and forward inbound reactions](https://github.com/qwibitai/nanoclaw/pull/2744)  
   - 影响交互体验，且会让 agent 反馈看起来“失灵”。

3. [#2732 Harden host + agent-runner from health audit findings](https://github.com/qwibitai/nanoclaw/pull/2732)  
   - 来自审计问题，通常应尽快收口，降低运行风险。

### 中优先级开放 PR
4. [#2742 [PR: Skill, follows-guidelines] feat(recipes): the PR Factory — a published recipe for PR review, triage & testing](https://github.com/qwibitai/nanoclaw/pull/2742)  
   - 偏能力扩展/工作流方案，若与主线目标一致，可进入后续版本规划。

---

## 总体判断
NanoClaw 今日表现为**高强度持续迭代、问题导向明确、底层稳定性优先**的健康项目状态。  
尽管没有新版本发布，也没有 Issue 活动，但 PR 侧的活跃度说明团队仍在稳步推进架构完善与关键 bug 修复。  
如果接下来开放 PR 能继续按当前节奏收口，项目会更接近“可稳定部署、可多通道扩展、可审计协作”的成熟阶段。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报（2026-06-12）

## 1. 今日速览
过去 24 小时，NullClaw 的公开活动整体偏低：仅新增/活跃 1 条 Issue，没有 PR 更新，也没有新版本发布。  
从节奏上看，项目今天没有明显的功能推进，主要信号来自一个与本地模型输出完整性相关的 bug 报告。  
这意味着当前维护重心更偏向稳定性排查，而不是功能迭代。  
综合判断：项目处于“低活跃、单点问题驱动”的状态，健康度总体平稳，但对核心交互体验的质量问题需要关注。  
- 仓库链接：<https://github.com/nullclaw/nullclaw>

## 2. 版本发布
今日无新版本发布。  
- Releases 页面：<https://github.com/nullclaw/nullclaw/releases>

## 3. 项目进展
今日没有合并或关闭的 PR，因此没有可确认的功能落地或修复推进。  
从“项目向前迈进”的角度看，今天的可见进展为 0，仓库状态保持静默。  
- PR 列表：<https://github.com/nullclaw/nullclaw/pulls>

## 4. 社区热点
今日最活跃的讨论点是 Issue #952，但目前仅有 0 评论、0 点赞，说明社区围绕该问题尚未展开二次讨论。  
尽管互动不高，这条 Issue 仍然反映出用户对“本地模型 + Ollama”的输出质量存在明确诉求。  
- Issue #952：<https://github.com/nullclaw/nullclaw/issues/952>

## 5. Bug 与稳定性
### 高优先级
1. **#952 [bug] Local model using ollama returns incomplete answers**  
   - 状态：OPEN  
   - 严重性判断：**中高**（影响核心对话体验，且涉及本地模型输出完整性）  
   - 影响面：使用 Ollama 加载本地模型（如 gemma）时，Agent 返回内容不完整、句子截断。  
   - 是否已有 fix PR：**暂无**  
   - 链接：<https://github.com/nullclaw/nullclaw/issues/952>

目前公开数据中没有其他崩溃、回归或更严重的稳定性问题记录。  
从风险角度看，这类“回答不完整”问题虽然不一定导致系统崩溃，但会直接削弱 AI Agent 的可用性和可信度，建议优先排查。  

## 6. 功能请求与路线图信号
今日未出现明确的新功能请求。  
但 #952 暗示了一个重要路线图信号：**项目对本地模型/OLLAMA 集成的响应完整性与输出质量仍需增强**。  
这类问题若被确认是模型接入层、停止词设置、上下文截断或提示词链路导致，后续很可能会进入稳定性修复或兼容性优化范围。  
- 路线图信号来源：<https://github.com/nullclaw/nullclaw/issues/952>

## 7. 用户反馈摘要
从 Issue #952 可以提炼出的真实用户痛点是：  
- 用户正在使用 **Ollama 本地部署模型**，说明 NullClaw 被用于本地化、隐私敏感或离线场景。  
- 用户期望 Agent 能输出**完整句子**与连贯回答，但当前结果出现明显截断。  
- 这类反馈通常意味着用户对“可用性”要求高于“能否跑起来”，更在意生成质量、输出稳定性和实际交互体验。  
- 当前没有评论，因此没有额外的社区分歧或二次补充意见。  
- 反馈来源：<https://github.com/nullclaw/nullclaw/issues/952>

## 8. 待处理积压
公开数据中没有发现长期未响应的高优先级 Issue 或 PR。  
不过，#952 已经是当前唯一可见的活跃问题，且与核心能力相关，建议维护者尽快确认复现路径并明确是否为已知兼容性问题。  
- 待跟踪 Issue：<https://github.com/nullclaw/nullclaw/issues/952>

---

### 总体判断
NullClaw 今日的公开动态不多，但问题信号较集中：**没有版本推进、没有 PR 落地，唯一活跃反馈聚焦在本地模型输出完整性**。  
这表明项目当前的主要挑战不是功能扩张，而是核心对话链路的稳定性与兼容性。  
如果接下来能快速响应 #952，将有助于改善用户对本地模型使用场景的信心。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-06-12）

## 1) 今日速览
过去 24 小时内，IronClaw 维持了**高活跃**状态：Issues 更新 11 条，PR 更新 24 条，且有 10 条 PR 完成合并/关闭，说明主干仍在持续修复与整合中。今天**没有新版本发布**，项目节奏更偏向“持续修补 + 快速收敛”。  
从内容看，团队的重心高度集中在 **Reborn / WebUI v2** 的稳定性、凭据恢复、工具执行流程、触发器与 Slack 出站、以及 QA 自动化。整体判断：项目处于**高迭代、问题密集但修复闭环正在形成**的健康状态。

---

## 2) 项目进展
今日最重要的进展，主要来自一批直接影响用户体验和运行时稳定性的 PR 关闭/合入：

- [#4768 - Apply stored LLM keys on Reborn startup](https://github.com/nearai/ironclaw/pull/4768)  
  修复了 Reborn 启动时未应用 UI 持久化 LLM key 的问题，直接对应并关闭了 [#4766](https://github.com/nearai/ironclaw/issues/4766)。这是今天最明确的用户可见修复之一。

- [#4767 - make nearai base url optional](https://github.com/nearai/ironclaw/pull/4767)  
  改善 NEAR AI 认证配置体验：当 API key 存在但 base URL 缺失时自动补默认值，减少“重启后能鉴权但无法连通”的配置摩擦。

- [#4784 - Handle capability runtime unavailability as tool failure](https://github.com/nearai/ironclaw/pull/4784)  
  将 capability runtime 不可用从“中止整个 agent loop”改为“正常工具失败处理”，提升了 agent 的恢复能力和鲁棒性。

- [#4782 - unify outbound state store so WebUI delivery defaults reach Slack delivery](https://github.com/nearai/ironclaw/pull/4782)  
  修复 WebUI 中设置的 Slack 投递默认值无法传递到触发运行的问题，减少“看似配置成功但实际未投递”的隐性失败。

- [#4757 - open, watch, and approve triggered automation runs from the Automations page](https://github.com/nearai/ironclaw/pull/4757)  
  修复触发自动化运行页跳转后空白/404 的问题，打通 Automations 页面到执行线程的主路径。

- [#4781 - docs(claude): add Reborn autonomous loop commands (build/deslop/review)](https://github.com/nearai/ironclaw/pull/4781)  
  偏文档/流程，但说明团队正在整理 Reborn 的自治工作流入口。

- [#4786 - promote main to qa branch](https://github.com/nearai/ironclaw/pull/4786)  
  分支/流程类变更，更多体现发布链路管理。

**总体推进幅度**：  
今天不是单点修 bug，而是围绕 **“凭据恢复 → 工具失败恢复 → 出站投递链路 → 触发器可观测性”** 做了一轮连续修整。对产品稳定性的推进是实质性的，尤其是 Reborn 运行时和 WebUI 交互路径。

---

## 3) 社区热点
### 评论最活跃的 Issues
- [#4766 - Chat runtime does not use UI-saved NEAR AI credentials after restart](https://github.com/nearai/ironclaw/issues/4766)  
  评论数最多（2）。用户核心诉求非常明确：**重启后不能丢 UI 里保存的凭据**，这是典型的“可用性/持久化”问题。

- [#4761 - Agent stops after repeated tool failures instead of recovering](https://github.com/nearai/ironclaw/issues/4761)  
  1 条评论，但问题重要性高：用户希望 agent 在多次工具失败后能**恢复而不是停摆**，体现对“自治能力”和“任务连续性”的期待。

### 当前最受关注的功能/工程方向
从 PR 变更面看，社区/开发关注点明显聚焦在以下几条线：
- [#4760 - Wire WebUI v2 operator logs](https://github.com/nearai/ironclaw/pull/4760)  
  日志可观测性是当前高优先级方向。
- [#4777 - Persist Slack connected state in WebUI](https://github.com/nearai/ironclaw/pull/4777)  
- [#4778 - Represent Slack as a product-adapter extension](https://github.com/nearai/ironclaw/pull/4778)  
- [#4779 - Expose outbound delivery targets to Reborn model](https://github.com/nearai/ironclaw/pull/4779)  
- [#4780 - Steer routine delivery through outbound targets](https://github.com/nearai/ironclaw/pull/4780)  

这组 PR 说明团队正在把 **Slack/出站投递** 从“特殊硬编码通道”推进为更通用的产品适配/目标路由体系，属于明显的路线图热点。

---

## 4) Bug 与稳定性
按影响面和严重程度排序，今日主要风险如下：

1. [#4761 - Agent stops after repeated tool failures instead of recovering](https://github.com/nearai/ironclaw/issues/4761)  
   **严重级别：高**。会直接中断 agent 任务流，影响自治执行可靠性。  
   **是否已有 fix PR：部分相关**，但未见完全对应的专门修复 PR。

2. [#4783 - credential-less WASM extension capabilities fail dispatch with a "network" obligation error before execution](https://github.com/nearai/ironclaw/issues/4783)  
   **严重级别：高**。纯计算型扩展在执行前就被阻断，影响扩展生态可用性。  
   **是否已有 fix PR：未见明确对应 PR**。

3. [#4764 - Denying shell approval leaves tool invocation pending and provides no user feedback](https://github.com/nearai/ironclaw/issues/4764)  
   **严重级别：高**。审批拒绝后流程悬挂且无反馈，属于典型交互死锁/卡住问题。  
   **是否已有 fix PR：未见明确对应 PR**。

4. [#4770 - Tool activity may stop updating after refresh (possible SSE reconnect issue)](https://github.com/nearai/ironclaw/issues/4770)  
   **严重级别：中高**。刷新后活动流不再更新，会让用户误判任务状态。  
   **是否已有 fix PR：未见明确对应 PR**。

5. [#4762 - Failed tool workflow causes follow-up messages and activity ordering to become inconsistent](https://github.com/nearai/ironclaw/issues/4762)  
   **严重级别：中**。属于状态机/消息顺序一致性问题，影响诊断与可理解性。  
   **是否已有 fix PR：未见明确对应 PR**。

6. [#4759 - Workspace path is duplicated when using workspace-relative paths](https://github.com/nearai/ironclaw/issues/4759)  
   **严重级别：中**。路径拼接错误会导致文件操作结果异常。  
   **是否已有 fix PR：未见明确对应 PR**。

7. [#4766 - Chat runtime does not use UI-saved NEAR AI credentials after restart](https://github.com/nearai/ironclaw/issues/4766)  
   **严重级别：中**，但已经关闭。  
   **fix PR：[#4768](https://github.com/nearai/ironclaw/pull/4768)，并伴随 [#4767](https://github.com/nearai/ironclaw/pull/4767)**。

补充：  
- [#4758 - Wire WebUI v2 Logs page to a real operator log source](https://github.com/nearai/ironclaw/issues/4758) 属于可观测性缺口，不是崩溃类 bug，但会显著影响排障效率；对应的修复 PR 是 [#4760](https://github.com/nearai/ironclaw/pull/4760)。

---

## 5) 功能请求与路线图信号
今天的新需求，明显带有“产品可用性增强”与“自治能力增强”双重特征：

- [#4776 - Add global Always Allow setting for eligible tools](https://github.com/nearai/ironclaw/issues/4776)  
  用户希望对合规工具提供全局“始终允许”，说明审批频率已成为效率瓶颈。  
  **路线图判断：大概率具备入版价值**，尤其适合本地 WebUI / Reborn 场景。

- [#4775 - Epic: Automated QA for the Reborn binary](https://github.com/nearai/ironclaw/issues/4775)  
  这是 QA 自动化方向的 Epic，强调 hermetic / fixture / e2e / live 的全覆盖。  
  **路线图信号很强**，说明项目开始从“能跑”转向“可规模化验证”。

- [#4771 - Follow-up: add run/thread-scoped operator log filtering](https://github.com/nearai/ironclaw/issues/4771)  
  日志过滤粒度从进程级走向 run/thread 级，是面向生产排障的实用需求。  
  **很可能继续推进**，与 [#4760](https://github.com/nearai/ironclaw/pull/4760) 形成配套。

- [#4785 - Reborn persistent tenant sandbox & agent-built extension promotion design](https://github.com/nearai/ironclaw/pull/4785)  
  这是更偏中长期的设计文档，指向 **持久租户沙箱** 与 **agent 生成扩展的推广**。  
  **路线图含金量高**，但距离稳定落地还需要架构与权限体系配套。

- Slack / outbound delivery 线上的一组 PR：  
  [#4777](https://github.com/nearai/ironclaw/pull/4777)、[#4778](https://github.com/nearai/ironclaw/pull/4778)、[#4779](https://github.com/nearai/ironclaw/pull/4779)、[#4780](https://github.com/nearai/ironclaw/pull/4780)  
  这表明下一阶段很可能继续围绕 **触发器、外部投递、产品适配层** 做产品化整合。

---

## 6) 用户反馈摘要
从 Issues 里能提炼出的真实痛点，主要集中在三类：

### A. “重启后不能丢配置”
- [#4766](https://github.com/nearai/ironclaw/issues/4766) 反映出用户对**UI 持久化凭据**的预期非常强：既然在界面里配置了，就应在重启后自动生效。  
- 这类反馈通常出现在本地开发/长期运行环境中，说明用户把 IronClaw 当成持续使用工具，而不是一次性 demo。

### B. “agent 要能抗失败、不断任务”
- [#4761](https://github.com/nearai/ironclaw/issues/4761)、[#4762](https://github.com/nearai/ironclaw/issues/4762) 指向相同主题：**工具失败不应让整条链路失控**。  
- 用户希望系统具备“失败后继续尝试、保持消息顺序和活动状态一致”的能力，而不是停在半路。

### C. “交互必须有反馈、状态必须可见”
- [#4764](https://github.com/nearai/ironclaw/issues/4764)、[#4770](https://github.com/nearai/ironclaw/issues/4770)、[#4758](https://github.com/nearai/ironclaw/issues/4758) 共同说明：  
  用户非常在意 **审批是否真的生效、活动流是否持续刷新、日志是否能看见**。  
- 换句话说，用户不只要“功能存在”，还要“状态可解释、失败可追踪”。

---

## 7) 待处理积压
严格来说，今天新增的高优先级工单/PR 都很“新”，还谈不上长期沉积；但从风险和影响面看，下面这些值得维护者优先盯住：

### 高优先级未解 Issues
- [#4783](https://github.com/nearai/ironclaw/issues/4783) — 纯计算 WASM 扩展被错误拦截
- [#4761](https://github.com/nearai/ironclaw/issues/4761) — agent 失败后无法恢复
- [#4764](https://github.com/nearai/ironclaw/issues/4764) — 审批拒绝后卡住无反馈
- [#4770](https://github.com/nearai/ironclaw/issues/4770) — 刷新后活动流停止更新
- [#4762](https://github.com/nearai/ironclaw/issues/4762) — 工具失败后消息顺序异常
- [#4759](https://github.com/nearai/ironclaw/issues/4759) — workspace 相对路径重复拼接

### 仍在评审/推进中的大 PR
- [#4760](https://github.com/nearai/ironclaw/pull/4760) — WebUI v2 operator logs，范围大且影响排障体验
- [#4772](https://github.com/nearai/ironclaw/pull/4772) — Reborn WebChat v2 UI bugs，UI 修复面广
- [#4777](https://github.com/nearai/ironclaw/pull/4777) ～ [#4780](https://github.com/nearai/ironclaw/pull/4780) — Slack / outbound delivery 链路重构，关联面多
- [#4785](https://github.com/nearai/ironclaw/pull/4785) — 设计文档类 PR，影响中长期架构方向

---

### 结论
IronClaw 今日的状态可以概括为：**问题不少，但修复也在快速闭环**。项目核心关注点已经从“基础功能可用”推进到“重启持久化、错误恢复、投递链路、可观测性和 QA 自动化”。如果这一节奏延续，下一阶段最值得期待的是：**Reborn 的稳定性提升会继续转化为可用性和部署可信度的提升**。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-06-12）

## 1) 今日速览
过去 24 小时，LobsterAI 以“开发推进”为主：**7 个 PR 全部关闭/合并**，但**没有新增或活跃 Issues**，也**没有新版本发布**。这说明当前项目的活跃度主要集中在功能完善与稳定性修复，而非用户侧问题爆发。  
从变更主题看，今天的重点集中在 **Cowork 协作链路、HTML 分享能力、OpenClaw 网关稳定性、以及界面体验优化**，属于较典型的“功能增强 + 可靠性加固”型进展。整体来看，项目健康度较好，问题噪音低，迭代节奏稳定。  
GitHub：<https://github.com/netease-youdao/LobsterAI>

---

## 2) 版本发布
**今日无新版本发布。**  
GitHub Releases：<https://github.com/netease-youdao/LobsterAI/releases>

---

## 3) 项目进展
今日共推进了 **7 个 PR**，覆盖主流程稳定性、协作输入、分享机制、网关资源控制和交互体验多个方向，说明项目正在从“可用”向“更稳定、更完整的生产级体验”继续演进。

### 关键已合并/关闭 PR
1. **#2152** `fix(cowork): extend pre-send model sync timeout on slow gateways`  
   解决慢网关/冷启动导致的发送前模型同步超时问题，将默认超时从 30s 提升到 90s，并在用户中途停止会话时静默中止等待。  
   影响：提升弱性能环境下的成功率，减少“明明可恢复却被超时放弃”的消息丢失。  
   链接：<https://github.com/netease-youdao/LobsterAI/pull/2152>

2. **#2147** `fix(cowork): prevent stopped startup turns from sending chat`  
   修复“用户已停止，但启动中的 turn 仍继续发出聊天”的竞态问题。  
   影响：增强 Cowork 停止控制的可靠性，降低误发送和状态错乱。  
   链接：<https://github.com/netease-youdao/LobsterAI/pull/2147>

3. **#2148** `feat(cowork): add realtime ASR voice input`  
   为 Cowork 增加**实时 ASR 语音输入**，支持 WebSocket 流式麦克风 PCM、实时回填识别文本、语音输入模式切换，并补充设计文档和单测。  
   影响：这是今天最重要的功能型增强之一，显著提升语音输入体验和交互实时性。  
   链接：<https://github.com/netease-youdao/LobsterAI/pull/2148>

4. **#2146** `feat(html-share): 支持分享访问方式选择与切换`  
   新增 HTML 分享的访问方式选择：**分享码 / 公开访问**，并支持已有分享更新访问方式。  
   影响：分享能力更灵活，适配更多分发场景，也更贴近实际协作需求。  
   链接：<https://github.com/netease-youdao/LobsterAI/pull/2146>

5. **#2149** `fix(openclaw): raise gateway heap limit`  
   为 OpenClaw 网关进程设置更明确的 V8 old-space 上限，缓解长时间多通道任务下的 OOM 崩溃。  
   影响：这是重要的稳定性修复，直接提升长会话/高负载场景的可用性。  
   链接：<https://github.com/netease-youdao/LobsterAI/pull/2149>

6. **#2150** `fix(kits): keep expert suite controls sticky`  
   优化 expert suite 页面头部和搜索/Marketplace 工具条的 sticky 行为，使其与 Skills/MCP 页面风格一致。  
   影响：属于交互体验修复，降低长列表浏览时的操作成本。  
   链接：<https://github.com/netease-youdao/LobsterAI/pull/2150>

7. **#2151** `Feat/2026.6.8 share files`  
   文件分享相关功能迭代，涉及 renderer/docs/main/artifacts。  
   影响：继续补齐分享能力链路，说明项目的“分享/协作”方向仍在持续扩展。  
   链接：<https://github.com/netease-youdao/LobsterAI/pull/2151>

### 总体推进判断
今天的 7 个 PR 呈现出三个明显方向：  
- **协作链路更可靠**：#2147、#2152  
- **分享能力更完整**：#2146、#2151  
- **稳定性和体验更扎实**：#2149、#2150  
- **语音交互能力升级**：#2148  

可以判断，LobsterAI 正在从“功能堆叠”进入“关键路径打磨”阶段，尤其重视**低性能网关、停止竞态、语音输入体验、分享传播**这些真实使用场景中的痛点。  
GitHub Pull Requests：<https://github.com/netease-youdao/LobsterAI/pulls>

---

## 4) 社区热点
**今日没有公开 Issues，也没有可见的 Issue 评论/反应热度数据。**  
因此，严格意义上的“社区讨论热点”为空；从公开数据看，今天的活跃度主要体现在 PR 合并，而不是用户问题讨论。

### 当前可观察到的“开发热点”
尽管没有 Issue 热点，但 PR 主题已经暴露出社区/团队当前最关注的需求：
- **Cowork 语音与发送链路稳定性**：#2147、#2152、#2148  
- **分享/传播能力**：#2146、#2151  
- **运行稳定性**：#2149  
- **界面体验一致性**：#2150  

### 结论
今天并无“评论最多的 Issue/PR”，说明项目的公开讨论强度较低，或者问题主要在内部开发闭环中被解决。  
Issues 页面：<https://github.com/netease-youdao/LobsterAI/issues>  
Pull Requests 页面：<https://github.com/netease-youdao/LobsterAI/pulls>

---

## 5) Bug 与稳定性
今日**没有新增 Issues**，因此没有来自 Issue 侧的显式 Bug 报告或崩溃回归记录。  
不过，PR 中已经出现了数个直接面向稳定性的修复，按潜在影响程度可排序如下：

### 高优先级稳定性问题
1. **网关 OOM 风险**
   - PR：#2149 `fix(openclaw): raise gateway heap limit`
   - 问题：长时间、多通道任务下网关进程可能因内存上限不足而崩溃
   - 状态：**已有 fix PR**
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2149>

2. **停止操作与启动流程竞态**
   - PR：#2147 `fix(cowork): prevent stopped startup turns from sending chat`
   - 问题：用户已停止，但启动中的 turn 仍可能继续发出 chat
   - 状态：**已有 fix PR**
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2147>

3. **慢网关/冷启动下预发送同步超时**
   - PR：#2152 `fix(cowork): extend pre-send model sync timeout on slow gateways`
   - 问题：默认 30s 超时不足，导致可恢复的预发送模型补丁失败
   - 状态：**已有 fix PR**
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2152>

### 中优先级体验型稳定问题
4. **expert suite 控件不够 sticky**
   - PR：#2150
   - 本质：偏交互体验，但也影响复杂页面下的操作稳定性
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2150>

### 结论
今天没有用户侧“爆炸性 Bug”，但维护团队显然在主动修补几类高风险运行问题，尤其是 **内存、竞态、超时** 三类典型生产问题。  
Issues：<https://github.com/netease-youdao/LobsterAI/issues>

---

## 6) 功能请求与路线图信号
今天虽然没有新增 Issues，但从已合并 PR 可以较清晰地反推出下一阶段路线图信号。

### 强信号方向
1. **Cowork 语音输入能力继续增强**
   - PR：#2148 `feat(cowork): add realtime ASR voice input`
   - 说明：团队已把“实时语音输入”做成正式能力，后续很可能继续完善：
     - 识别准确率/端侧兼容性
     - 中断恢复
     - 多语言或口音适配
     - 语音输入模式更多配置项
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2148>

2. **分享能力向“可传播、可控访问”演进**
   - PR：#2146、#2151
   - 说明：分享从“能分享”走向“可选择访问方式、可更新、可扩展到文件分享”
   - 可能进入下一版本的内容：
     - 更细粒度权限控制
     - 分享后访问审计
     - 多种分享对象（文件、HTML、会话内容）
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2146>  
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2151>

3. **协作流程的可靠性优先级很高**
   - PR：#2147、#2152
   - 说明：项目显然在压低协作场景中的“失败率”和“误操作率”
   - 后续可能继续优化：
     - stop/abort/timeout 的统一语义
     - 更完善的会话状态机
     - 异常恢复与重试策略
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2147>  
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2152>

### 判断
如果按当前趋势推测，**下一版本很可能继续围绕 Cowork + 分享 + 稳定性** 三条主线展开，而不是大范围开新支线。  
GitHub Roadmap 线索可从 PR 聚类观察：<https://github.com/netease-youdao/LobsterAI/pulls>

---

## 7) 用户反馈摘要
**今日没有 Issues 评论可提炼**，因此无法从公开讨论中提取真实用户原话或明确反馈倾向。  
不过，从修复与功能 PR 的方向，可以较稳妥地推断出用户场景与痛点：

### 可推断的真实使用场景
- **弱性能/慢启动环境下使用 Cowork**
  - 用户希望在网关慢、启动慢、模型同步慢时也能稳定发送
  - 相关 PR：#2152、#2147
  - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2152>  
  - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2147>

- **语音交互高频使用**
  - 用户需要更自然、更实时的语音输入体验，而不是一次性录完再识别
  - 相关 PR：#2148
  - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2148>

- **内容外发与协作分享**
  - 用户希望对外分享内容时能控制访问方式，而不是只有单一分享机制
  - 相关 PR：#2146、#2151
  - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2146>  
  - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2151>

### 用户可能感知到的改善
- “发送失败/卡住”的情况更少
- 语音输入更接近实时对话体验
- 分享方式更灵活，适合不同场景
- 长时间运行时更不容易崩溃

Issues 页面（当前无评论可摘录）：<https://github.com/netease-youdao/LobsterAI/issues>

---

## 8) 待处理积压
**从今日公开数据看，没有明显长期未响应的 Issue 或悬挂 PR。**  
原因有两点：
1. 今日 Issues 数量为 0，说明没有公开积压的新增问题；
2. 今日 7 个 PR 均已关闭/合并，未见待处理阻塞项。

### 仍建议维护者关注的“隐性积压风险”
虽然没有显性积压，但从当前 PR 主题可以看出，以下问题应持续观察：
- **超时阈值是否仍不足以覆盖极端慢网关**
  - 相关 PR：#2152
  - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2152>

- **内存上限提升是否足以覆盖高并发/长会话负载**
  - 相关 PR：#2149
  - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2149>

- **实时 ASR 是否会带来新的边界问题**
  - 相关 PR：#2148
  - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2148>

- **分享访问控制是否需要更细的权限模型**
  - 相关 PR：#2146、#2151
  - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2146>  
  - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2151>

### 结论
当前无显性积压，但建议维护者把上述四类主题列为“持续观察清单”，避免问题从功能增强演变为用户侧故障。  
Issues 页：<https://github.com/netease-youdao/LobsterAI/issues>  
PR 页：<https://github.com/netease-youdao/LobsterAI/pulls>

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合直接发群的精简版**  
2. **适合管理层阅读的 KPI 风格版**  
3. **带风险等级标注的运营周报模板**

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报｜2026-06-12

## 1) 今日速览
今天 Moltis 的更新重心明显偏向**问题修复与运行稳定性**：过去 24 小时内仅有 **1 条 Issue 更新**和 **1 条 PR 更新**，没有新版本发布，说明项目处于较轻量但持续维护的节奏。  
当前未见大规模功能迭代，更多是在处理真实使用场景中的兼容性与消息投递问题。  
从活跃度看，项目整体属于**中低强度活跃**：有明确的维护动作，但尚未形成“发布驱动”的节奏。  
对用户而言，这通常意味着产品仍在快速修补边界问题，核心链路的可用性仍是首要目标。  

---

## 2) 项目进展
### 今日未见已合并/关闭的重要 PR
- 过去 24 小时内没有已合并或已关闭的关键 PR，项目没有通过发布节奏推进版本落地。

### 仍在推进中的重要变更
- **PR #1116：fix(whatsapp): deliver replies to @lid chats via PN JID rewrite**  
  链接：https://github.com/moltis-org/moltis/pull/1116  
  这条 PR 聚焦于 **WhatsApp 回复消息在 @lid 会话中被静默丢弃** 的问题，说明团队正在修复消息投递链路中的关键兼容性缺陷。  
  如果该修复最终合并，将直接提升 WhatsApp 场景下的消息到达率与用户可见性，对实际可用性帮助较大。

### 项目整体前进幅度
- 以今日数据看，项目推进主要体现在**“修复深度”而非“功能广度”**：  
  - 没有新版本发布  
  - 没有新增大功能  
  - 但有一个面向实际用户痛点的修复 PR 正在推进  
- 这类进展通常意味着项目在打磨核心集成能力，尤其是外部平台兼容问题的处理。

---

## 3) 社区热点
### 当前最活跃讨论
1. **Issue #1115：[bug] Fastmail MCP Authorisation**  
   链接：https://github.com/moltis-org/moltis/issues/1115  
   - 状态：OPEN  
   - 评论：1  
   - 反应：0  
   - 核心诉求：用户在 **Fastmail MCP 授权流程** 中遇到问题，说明认证/接入链路可能存在阻塞。  
   - 讨论意义：这类问题通常会直接影响新用户接入体验，是“能不能用”的关键路径。

2. **PR #1116：fix(whatsapp): deliver replies to @lid chats via PN JID rewrite**  
   链接：https://github.com/moltis-org/moltis/pull/1116  
   - 状态：OPEN  
   - 评论：未提供  
   - 反应：0  
   - 核心诉求：修复 WhatsApp 私密标识（@lid）聊天中的回复消息投递失败问题。  
   - 讨论意义：这反映出用户在真实对话场景中对“消息可靠送达”的高敏感度。

### 背后诉求分析
- 社区关注点集中在**身份授权**与**消息投递成功率**两条主线。  
- 这说明 Moltis 的使用者并不只关心功能是否存在，更关心：  
  1. 接入是否顺畅  
  2. 回复是否可靠送达  
  3. 外部平台复杂标识体系下是否兼容  

---

## 4) Bug 与稳定性
### 按严重程度排序

#### 1. 高：WhatsApp 回复在 @lid 聊天中被静默丢弃
- 相关 PR：#1116  
- 链接：https://github.com/moltis-org/moltis/pull/1116  
- 问题描述：在 privacy-enabled sender 的 @lid 聊天中，代理已生成回复并调用发送流程，但消息未真正送达，且没有 Delivered 回执。  
- 影响评估：  
  - 属于**高影响稳定性/投递问题**  
  - 会造成“界面显示已回复，但用户实际未收到”的严重一致性风险  
- 是否已有 fix PR：**是**，对应修复正在 PR #1116 中推进。

#### 2. 中：Fastmail MCP Authorisation 授权失败
- 相关 Issue：#1115  
- 链接：https://github.com/moltis-org/moltis/issues/1115  
- 问题描述：用户反馈 Fastmail MCP 授权流程存在异常，具体细节尚未在当前摘要中完全展开。  
- 影响评估：  
  - 属于**接入/认证链路问题**  
  - 可能阻塞首次配置或部分用户环境下的稳定使用  
- 是否已有 fix PR：**未见明确对应修复 PR**。

---

## 5) 功能请求与路线图信号
### 今日未见明确的新功能需求
- 过去 24 小时的公开数据中，没有新增明显“功能请求型” Issue；当前新增/活跃内容主要集中在 bug 修复与兼容性处理。

### 路线图信号判断
- **PR #1116** 说明项目优先级仍在“平台兼容性修复”与“消息链路可靠性”上。  
- **Issue #1115** 则表明认证/授权体验仍是用户接入门槛，后续很可能会优先进入修复列表。  
- 从现有信号看，下一阶段更可能纳入版本的内容是：  
  1. WhatsApp 投递修复合并  
  2. Fastmail MCP 授权问题排查与修复  
- 目前没有足够证据表明有新的大功能模块将被快速推进。

---

## 6) 用户反馈摘要
### 从 Issue/PR 评论与摘要中提炼的真实痛点
1. **“看起来成功，但实际上没送达”是最危险的体验问题**  
   - 来自 PR #1116 相关场景  
   - 用户真正关心的不只是 UI 中的回复结果，而是消息是否真的抵达对方  
   - 这类问题对信任度打击很大

2. **授权流程稳定性影响上手门槛**  
   - 来自 Issue #1115  
   - Fastmail MCP 授权失败意味着用户在接入初期就可能遇到阻断  
   - 对工具型产品而言，这通常会直接影响留存与口碑

### 使用场景画像
- 用户正在将 Moltis 用于：
  - 邮件/消息平台代理接入
  - WhatsApp 会话自动回复
  - Fastmail MCP 这类外部服务授权
- 这说明项目已进入真实生产/准生产使用阶段，问题更多来自**跨平台集成边界**而不是概念验证。

---

## 7) 待处理积压
### 当前尚未关闭的核心事项
1. **Issue #1115：Fastmail MCP Authorisation**
   - 链接：https://github.com/moltis-org/moltis/issues/1115  
   - 备注：当前为最新活跃 bug，仍待进一步定位与修复。

2. **PR #1116：WhatsApp @lid 回复投递修复**
   - 链接：https://github.com/moltis-org/moltis/pull/1116  
   - 备注：虽非长期积压，但属于当前最重要的修复推进项，值得优先跟进合并进度。

### 维护提醒
- 目前**未看到长期沉默、未响应很久的高优先级 Issue/PR**；  
- 但从产品稳定性角度看，**认证失败 + 消息投递失败**这两类问题都属于高优先级，应尽快完成确认或合并，避免影响用户对项目可靠性的判断。

---

## 总体结论
Moltis 今日呈现出一个典型的“**修复驱动型**”维护日：没有版本发布，没有大规模功能推进，但有两个非常贴近真实使用的关键问题浮现，分别涉及 **Fastmail MCP 授权** 和 **WhatsApp 消息投递可靠性**。  
从健康度看，项目仍保持有效维护，但当前阶段的价值更多体现在**持续修补集成边界、提升可用性**，而非功能扩张。  
若接下来 PR #1116 能顺利合并，并进一步推进 #1115 的定位，项目稳定性和用户信任度将获得明显改善。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下基于 **agentscope-ai/QwenPaw（CoPaw）** 近 24 小时 GitHub 数据生成的 **2026-06-12 项目动态日报**。

---

## 1) 今日速览

过去 24 小时，项目处于**高活跃、强迭代、以稳定性修复为主**的状态：Issues 更新 15 条、PR 更新 18 条，并连续发布了 2 个 post 版本，说明团队正在快速收敛近期回归和打包问题。  
从讨论焦点看，社区最关注的不是纯新增功能，而是**桌面端稳定性、文件下载/预览、模型提供方可见性、配置持久化**这类直接影响使用体验的核心路径。  
PR 侧则显示项目仍在持续推进**UI 微调、模型选择修复、文件处理增强、发布流程加固**，整体工程健康度不错，但仍处于“边修边发”的压力期。  
综合判断：项目**活跃度高**，但当前健康状态更像是“**快速迭代中的稳定性修复窗口**”，需要继续压住回归类问题。  
相关仓库： [GitHub - agentscope-ai/QwenPaw](https://github.com/agentscope-ai/QwenPaw)

---

## 2) 版本发布

### v1.1.11.post2
- 发布页： [v1.1.11.post2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.11.post2)
- 主要变更：
  - `style: truncate tool card titles to single line with ellipsis`
    - 工具卡标题改为单行省略显示，主要是 UI 展示优化。
  - `chore: bump version to 1.1.11post2`
    - 版本号更新，无业务逻辑改动。

### v1.1.11.post1
- 发布页： [v1.1.11.post1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.11.post1)
- 主要变更：
  - `chore: bump version to 1.1.11post1`
  - `Revert "fix(pack): compile-check discord after conda-unpack"`
    - 回滚了一个打包/安装校验相关改动，说明发布链路中曾出现兼容性或打包稳定性顾虑。
  - `Chore: release duty checklist`
    - 更偏流程与发布治理。

### 版本解读与迁移注意事项
- 这两个都是 **post 版本**，整体看属于**低风险增量发布**，并未看到明显破坏性变更。
- 但从回滚与发布校验动作看，当前版本线的重点并不是“大功能升级”，而是**安装、启动、UI 细节与发布链路稳定性**。
- 对用户的迁移建议：
  - 升级后优先验证 **桌面端启动、模型选择、文件下载、窗口进程占用** 是否正常；
  - Windows 用户尤其建议观察是否仍存在 **SSL/进程爆炸/内存飙升** 类问题。
- 相关链接：  
  - [v1.1.11.post2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.11.post2)  
  - [v1.1.11.post1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.11.post1)

---

## 3) 项目进展

今日已合并/关闭的 PR 中，值得关注的是以下几类推进：

### 1. 模型选择与本地模型可见性修复
- **PR #5113**：`fix: show local providers (ollama/lmstudio) in PRO tab of ModelSelector`  
  解决了本地模型提供方在 PRO 页签不可见的问题，对应 Issue **#5108**。  
  链接： [PR #5113](https://github.com/agentscope-ai/QwenPaw/pull/5113) / [Issue #5108](https://github.com/agentscope-ai/QwenPaw/issues/5108)

### 2. 文件预览与文件响应处理增强
- **PR #5115**：`feat(files): improve file preview error handling and use FileResponse`  
  方向上是在补强文件预览/下载链路的异常处理，属于稳定性提升。  
  链接： [PR #5115](https://github.com/agentscope-ai/QwenPaw/pull/5115)

### 3. 工作区/菜单刷新一致性
- **PR #5114**：`[codex] refresh Datapaw agent menu on agent switch`  
  解决切换 agent 后菜单状态不刷新的问题，提升上下文一致性。  
  链接： [PR #5114](https://github.com/agentscope-ai/QwenPaw/pull/5114)

### 4. UI/交互细节优化
- **PR #5119**：工具卡标题单行省略，减轻聊天区视觉拥挤。  
  链接： [PR #5119](https://github.com/agentscope-ai/QwenPaw/pull/5119)
- **PR #5112**：关闭 provider 搜索输入的浏览器自动补全。  
  链接： [PR #5112](https://github.com/agentscope-ai/QwenPaw/pull/5112)
- **PR #5109**：工具卡样式和聊天页布局优化，同时涉及文件下载行为调整。  
  链接： [PR #5109](https://github.com/agentscope-ai/QwenPaw/pull/5109)

### 5. 发布与工程治理
- **PR #5124**：版本号 bump 到 1.1.11post2。  
  链接： [PR #5124](https://github.com/agentscope-ai/QwenPaw/pull/5124)
- **PR #5118**：新增 agentscope platform 相关新闻/说明。  
  链接： [PR #5118](https://github.com/agentscope-ai/QwenPaw/pull/5118)

### 6. 国际化与界面适配
- **PR #5136**：补全 pt-BR 工作区翻译。  
  链接： [PR #5136](https://github.com/agentscope-ai/QwenPaw/pull/5136)
- **PR #5133**：尝试引入 AionUi 风格语言到 Console。  
  链接： [PR #5133](https://github.com/agentscope-ai/QwenPaw/pull/5133)
- **PR #5134**：新增 changelog historian agent，属于开发流程能力增强。  
  链接： [PR #5134](https://github.com/agentscope-ai/QwenPaw/pull/5134)

### 总体推进判断
今天的合并/关闭 PR 不是“单点大版本跃迁”，而是**围绕稳定性、可用性、可维护性**的密集修补：  
- 用户可见层面：模型选择、文件预览、工具卡展示、菜单刷新更顺了；  
- 工程层面：发布、文案、国际化、样式体系也在持续收敛。  

从结果看，项目今天至少完成了**一批关键体验修复 + 一批发布/流程收口**，属于“**把现有版本打磨得更可用**”的一天。

---

## 4) 社区热点

### 热点 1：Windows 桌面端严重稳定性问题
- Issue **#5106**：新版 Tauri 端 SSL 证书错误、无限进程、内存占满导致黑屏；旧版 PyInstaller 也无法启动。  
- 评论数：7（本日最热问题之一）  
- 链接： [Issue #5106](https://github.com/agentscope-ai/QwenPaw/issues/5106)

**诉求分析：**  
这是典型的“**能不能正常打开并持续运行**”问题，属于最底层的可用性风险。用户描述中出现了 SSL、进程失控、黑屏死机，说明该问题不仅影响体验，还可能造成系统级资源耗尽，优先级应视为极高。

---

### 热点 2：本地模型提供方可见性/选择问题
- Issue **#5108**：`1.1.11 can NOT choose ollama model in qwenpaw console chat window`  
- 评论数：3  
- 已由 PR **#5113** 修复  
- 链接： [Issue #5108](https://github.com/agentscope-ai/QwenPaw/issues/5108) / [PR #5113](https://github.com/agentscope-ai/QwenPaw/pull/5113)

**诉求分析：**  
用户核心诉求是“**本地模型要能被看见、能被选中、能直接用**”。这类问题对桌面 AI 工具非常敏感，因为它直接决定了本地私有部署场景是否成立。

---

### 热点 3：长期记忆 / 向量模型配置保存异常
- Issue **#5137**：向量模型自动记忆搜索配置丢失  
- 评论数：3  
- 链接： [Issue #5137](https://github.com/agentscope-ai/QwenPaw/issues/5137)

**诉求分析：**  
用户反馈指出“卡片未展开时保存会丢配置”，这是典型的前端状态同步/表单持久化问题。说明用户在长期记忆场景上已经开始依赖该功能，对配置可靠性要求很高。

---

### 热点 4：`enable_thinking` 配置与实际表现不一致
- Issue **#5132**：配置了 `enable_thinking: false`，但对话中仍显示 Thinking  
- 评论数：2  
- 链接： [Issue #5132](https://github.com/agentscope-ai/QwenPaw/issues/5132)

**诉求分析：**  
这是“**配置项语义是否被正确执行**”的问题，反映出用户对模型输出控制越来越细。即便最终可能是产品展示逻辑而不是模型推理逻辑，用户仍希望界面表现与配置预期一致。

---

### 热点 5：Langfuse 可观测性断裂
- Issue **#5127**：单个 agent ReAct loop 的 Langfuse traces 被切碎  
- 评论数：2  
- 链接： [Issue #5127](https://github.com/agentscope-ai/QwenPaw/issues/5127)

**诉求分析：**  
这类反馈来自更偏开发者/高级用户群体，说明项目正在从“能用”向“**能观测、能调试、能追踪**”演进。对于多步 agent 场景，trace 连续性非常关键。

---

### 热点 6：附件下载错误 / 文件处理回归
- Issue **#5140**：v1.1.11.post2 纯文本可用，但 docx/pdf 下载 404  
- 评论数：1（但问题严重）  
- 链接： [Issue #5140](https://github.com/agentscope-ai/QwenPaw/issues/5140)

**诉求分析：**  
用户已经明确感知到“**文本能下，非文本不行**”，说明文件链路修复还不完整。属于高优先级回归类问题。

---

## 5) Bug 与稳定性

以下按严重程度排序：

### S1 - 桌面端进程失控 / 资源耗尽
- **Issue #5106**：Tauri 端 SSL 异常后无限新建进程，内存占满导致黑屏；旧版也受影响。  
- 状态：已关闭，但从描述看是**严重稳定性事件**。  
- 是否已有 fix PR：**未在本次数据中看到明确对应修复 PR**。  
- 链接： [Issue #5106](https://github.com/agentscope-ai/QwenPaw/issues/5106)

- **Issue #5138**：Windows 客户端进程持续增加，内存占用到 90%+。  
- 状态：开放中。  
- 是否已有 fix PR：**未看到明确 fix PR**。  
- 链接： [Issue #5138](https://github.com/agentscope-ai/QwenPaw/issues/5138)

### S2 - 文件下载/附件链路回归
- **Issue #5140**：post2 版本中 docx/pdf 下载 404，纯文本正常。  
- 状态：开放中。  
- 是否已有 fix PR：**疑似相关 PR 为 #5115（文件预览/错误处理增强）**，但当前数据里未见明确闭环。  
- 链接： [Issue #5140](https://github.com/agentscope-ai/QwenPaw/issues/5140) / [PR #5115](https://github.com/agentscope-ai/QwenPaw/pull/5115)

### S2 - 长期记忆配置丢失
- **Issue #5137**：未展开卡片时保存，自动搜索记忆/向量模型配置丢失。  
- 状态：开放中。  
- 是否已有 fix PR：未见。  
- 链接： [Issue #5137](https://github.com/agentscope-ai/QwenPaw/issues/5137)

### S2 - 上下文压缩统计与真实输入不符
- **Issue #5122**：compact 后统计值与实际 API 输入体量不一致，技能/MCP 可能造成额外上下文膨胀。  
- 状态：开放中。  
- 是否已有 fix PR：未见。  
- 链接： [Issue #5122](https://github.com/agentscope-ai/QwenPaw/issues/5122)

### S3 - 可观测性碎片化
- **Issue #5127**：Langfuse traces 被切碎。  
- 状态：开放中。  
- 是否已有 fix PR：有方向一致的 PR **#5128**，但尚未闭环。  
- 链接： [Issue #5127](https://github.com/agentscope-ai/QwenPaw/issues/5127) / [PR #5128](https://github.com/agentscope-ai/QwenPaw/pull/5128)

### S3 - 模型配置/交互显示不一致
- **Issue #5132**：`enable_thinking=false` 仍显示 Thinking。  
- 状态：已关闭。  
- 是否已有 fix PR：未见明确代码修复，更像是说明或行为澄清。  
- 链接： [Issue #5132](https://github.com/agentscope-ai/QwenPaw/issues/5132)

### S3 - 本地模型不可选
- **Issue #5108**：ollama 不显示在控制台聊天窗口。  
- 状态：已关闭。  
- Fix PR：**#5113**。  
- 链接： [Issue #5108](https://github.com/agentscope-ai/QwenPaw/issues/5108) / [PR #5113](https://github.com/agentscope-ai/QwenPaw/pull/5113)

---

## 6) 功能请求与路线图信号

今天出现的新功能诉求，整体指向三个方向：**更强的协作、更顺的交互、更完整的可观测/控制能力**。

### 可能进入下一版本的信号较强
1. **#5130：按轮次展示 token / context usage**
   - 这是典型的“高级可观测”功能，且 PR 已经打开。
   - 链接： [PR #5130](https://github.com/agentscope-ai/QwenPaw/pull/5130)

2. **#5128：Langfuse 按 agent loop 聚合 trace**
   - 也是可观测性增强，和 #5127 的用户痛点强相关。
   - 链接： [PR #5128](https://github.com/agentscope-ai/QwenPaw/pull/5128)

3. **#5111：DingTalk 私有部署自定义 endpoint**
   - 明确面向企业/私有化场景，需求很实用。
   - 链接： [PR #5111](https://github.com/agentscope-ai/QwenPaw/pull/5111)

4. **#5123：Skill market 升级**
   - 增强技能分发与发现能力，属于平台化方向。
   - 链接： [PR #5123](https://github.com/agentscope-ai/QwenPaw/pull/5123)

5. **#5116：配置化聊天交互模式**
   - 用 interrupt / steering / queueing 替代手动 `/stop`，明显是提升多平台聊天体验。
   - 链接： [Issue #5116](https://github.com/agentscope-ai/QwenPaw/issues/5116)

### 更偏中长期、架构要求更高的需求
- **#5139**：Agent Team / Swarm 协作能力  
  链接： [Issue #5139](https://github.com/agentscope-ai/QwenPaw/issues/5139)
- **#5131**：Coding 模式代码补全  
  链接： [Issue #5131](https://github.com/agentscope-ai/QwenPaw/issues/5131)
- **#5110**：引用/摘录响应文本用于后续上下文  
  链接： [Issue #5110](https://github.com/agentscope-ai/QwenPaw/issues/5110)
- **#5107**：Tool Guard 审批块折叠并持久化  
  链接： [Issue #5107](https://github.com/agentscope-ai/QwenPaw/issues/5107)

### 路线图判断
如果按当前 PR 活跃度和用户痛点匹配度判断，**下一版本最可能优先落地**的是：
- 可观测性增强（#5130 / #5128）
- 频道/私有部署适配（#5111）
- 技能市场与模型选择优化（#5123 / #5113）
- 文件与交互体验修复（#5115 / #5140 相关）

---

## 7) 用户反馈摘要

从 Issues 评论与描述中，可以提炼出以下真实痛点：

### 1. 用户最在意的是“稳定地打开并持续运行”
- Windows 端一旦出现 SSL 错误或进程异常，就会迅速演变成系统级资源问题。  
- 场景：Windows 11 家庭中文版、多 Python 环境、桌面端本地安装。  
- 相关链接： [Issue #5106](https://github.com/agentscope-ai/QwenPaw/issues/5106) / [Issue #5138](https://github.com/agentscope-ai/QwenPaw/issues/5138)

### 2. 本地模型/私有模型用户希望“能看见、能选中、能直接连”
- ollama/lmstudio 这类本地提供方如果在 UI 中不可见，会直接阻断使用路径。  
- 这说明 QwenPaw 的本地化/私有化用户比例不低。  
- 相关链接： [Issue #5108](https://github.com/agentscope-ai/QwenPaw/issues/5108) / [PR #5113](https://github.com/agentscope-ai/QwenPaw/pull/5113)

### 3. 文件能力不是“加分项”，而是刚需
- txt/md/py 正常但 docx/pdf 404，会让用户对附件能力失去信任。  
- 说明用户已经把 QwenPaw 当作“工作流入口”而非单纯聊天界面。  
- 相关链接： [Issue #5140](https://github.com/agentscope-ai/QwenPaw/issues/5140)

### 4. 配置必须可预期、可持久
- 长期记忆/向量模型配置在保存时丢失，属于典型“用户以为保存成功但实际没有”的高挫败感问题。  
- 相关链接： [Issue #5137](https://github.com/agentscope-ai/QwenPaw/issues/5137)

### 5. 高级用户开始关注上下文、追踪和成本可视化
- 用户不仅在意“能不能回答”，也在意“消耗了多少 token、上下文是否膨胀、trace 是否连续”。  
- 这说明项目正在被更专业的 agent 用户使用。  
- 相关链接： [Issue #5122](https://github.com/agentscope-ai/QwenPaw/issues/5122) / [Issue #5127](https://github.com/agentscope-ai/QwenPaw/issues/5127)

### 6. 交互控制方式希望更自然
- 第三方平台中通过 `/stop` 手动打断运行，用户认为摩擦过大。  
- 这类反馈反映出项目正在从“功能可用”走向“**交互流畅**”。  
- 相关链接： [Issue #5116](https://github.com/agentscope-ai/QwenPaw/issues/5116)

---

## 8) 待处理积压

以下条目虽然大多是近两天新出现，但从影响面和严重性看，已经属于**需要维护者优先跟进的积压**：

### 高优先级开放 Issue
- **#5138** Windows 客户端进程持续增加，内存飙升  
  链接： [Issue #5138](https://github.com/agentscope-ai/QwenPaw/issues/5138)
- **#5140** post2 下 docx/pdf 附件下载 404  
  链接： [Issue #5140](https://github.com/agentscope-ai/QwenPaw/issues/5140)
- **#5137** 长期记忆配置保存丢失  
  链接： [Issue #5137](https://github.com/agentscope-ai/QwenPaw/issues/5137)
- **#5122** 上下文压缩统计与真实输入不符  
  链接： [Issue #5122](https://github.com/agentscope-ai/QwenPaw/issues/5122)
- **#5127** Langfuse trace 断裂  
  链接： [Issue #5127](https://github.com/agentscope-ai/QwenPaw/issues/5127)

### 高优先级开放 PR
- **#5125** Tauri Windows CI 抗 crates.io 拉取失败增强  
  链接： [PR #5125](https://github.com/agentscope-ai/QwenPaw/pull/5125)
- **#5121** release verification gate  
  链接： [PR #5121](https://github.com/agentscope-ai/QwenPaw/pull/5121)
- **#5117** 阻止 workspace 放入自动加载代码/secret 目录  
  链接： [PR #5117](https://github.com/agentscope-ai/QwenPaw/pull/5117)
- **#5111** DingTalk 自定义 endpoint  
  链接： [PR #5111](https://github.com/agentscope-ai/QwenPaw/pull/5111)
- **#5123** skill market 更新  
  链接： [PR #5123](https://github.com/agentscope-ai/QwenPaw/pull/5123)

### 维护者提醒
这些条目里，**#5138、#5140、#5137** 应视为最优先，因为它们分别对应：
- 桌面端资源失控
- 文件下载回归
- 用户配置丢失

这三类问题会直接影响用户对产品“是否可靠”的判断。

---

如果你希望，我可以继续把这份日报**整理成适合发飞书/企业微信的简报版**，或者进一步输出成 **Markdown 表格版 / 周报版 / 管理层摘要版**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-06-12）

## 1) 今日速览
过去 24 小时，ZeroClaw 处于**高活跃度的发布后稳定期**：Issues 更新 9 条、PR 更新 25 条，并且有 **1 个新版本 v0.8.0** 发布。  
从内容上看，社区与维护者的注意力明显集中在 **quickstart/onboarding、配置兼容性、运行时稳定性、渠道能力补齐** 这四个方向。  
已完成/关闭的 PR 数量可观，说明团队正在快速把 v0.8.0 带来的架构变化收敛为可用体验。  
整体判断：项目健康度良好，但**首发体验与配置迁移细节**仍是当前最需要持续打磨的区域。  
- 发布页： [v0.8.0](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.0)

---

## 2) 版本发布
### v0.8.0：多代理架构的关键大版本
- 发布页： [v0.8.0](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.0)

根据发布说明，v0.8.0 的核心变化是：**一个 daemon 可同时运行多个命名 agent**，每个 agent 拥有独立的：
- workspace
- memory
- model provider
- security policy
- channels
- personality

同时，项目引入了**重写后的配置 schema**，并承诺会**自动迁移现有配置**。

### 对项目意味着什么
1. **从“单 agent 工具”升级为“多 agent 运行平台”**  
   这会显著提升 ZeroClaw 在个人 AI 助手、任务分工、隔离执行方面的能力。

2. **配置迁移是这次发布的关键风险点**  
   已出现多条与 quickstart、配置保存、字段命名、round-trip 相关的问题，说明“能自动迁移”并不等于“边角配置都完全无损”。

3. **迁移注意事项**
   - 旧配置应检查是否已正确迁移到新 schema。
   - 新增的命名 agent 语义，可能会影响用户对 `agent <alias>`、`-a/--agent` 等 CLI 入口的理解。
   - 若用户依赖自定义 provider、channel、memory 或安全策略，建议重点验证升级后的行为是否一致。

---

## 3) 项目进展
今天可见的已完成 PR 至少有 8 个，主要推进了三类工作：**发布稳定性修复、配置/quickstart 修正、可用性和国际化改进**。

### A. quickstart / onboarding 连续修复，优先级最高
这些 PR 直接修补新用户首用路径：
- [#7512](https://github.com/zeroclaw-labs/zeroclaw/pull/7512) — 修复 quickstart 使用 `snake_case api_key`
- [#7511](https://github.com/zeroclaw-labs/zeroclaw/pull/7511) — 修复成功提示中的命令格式
- [#7510](https://github.com/zeroclaw-labs/zeroclaw/pull/7510) — quickstart 预填 `api_key`
- [#7508](https://github.com/zeroclaw-labs/zeroclaw/pull/7508) — quickstart 提示补上 `-a` 参数

这组修复的意义很明确：**把“刚装好就能用”这件事做实**，减少新用户第一次运行就失败的概率。

### B. 配置持久化与 CI 稳定性
- [#7519](https://github.com/zeroclaw-labs/zeroclaw/pull/7519) — 修复 `[[mcp.servers]]` 分字段编辑无法正确落盘
- [#7520](https://github.com/zeroclaw-labs/zeroclaw/pull/7520) — ARM glibc release 构建补装 cross g++
- [#7496](https://github.com/zeroclaw-labs/zeroclaw/pull/7496) — 汇总 Rust cache 诊断信息

这些工作提升了两件事：
1. **配置编辑的 round-trip 正确性**
2. **发布流水线的可观测性与跨架构构建可靠性**

### C. 可用性、文档与 CLI/i18n 补强
- [#7502](https://github.com/zeroclaw-labs/zeroclaw/pull/7502) — 本地化文档界面优化
- [#7499](https://github.com/zeroclaw-labs/zeroclaw/pull/7499) — CLI 状态输出接入 Fluent
- [#7503](https://github.com/zeroclaw-labs/zeroclaw/pull/7503) — Docker 运行时镜像补 `vim-tiny`

### 今日推进总结
如果按“用户可感知价值”来算，今天的推进主要体现在：
- **新用户上手更少踩坑**
- **配置迁移和编辑更可信**
- **发布和构建更稳**
- **多语言/多环境使用门槛更低**

---

## 4) 社区热点
### 当前最活跃讨论点：quickstart 体验问题
- [#7506](https://github.com/zeroclaw-labs/zeroclaw/issues/7506) — quickstart 成功提示给出错误命令（1 条评论）
- [#7505](https://github.com/zeroclaw-labs/zeroclaw/issues/7505) — quickstart `--api-key` 预填字段名错误（已关闭，0 评论）
- 对应修复 PR： [#7510](https://github.com/zeroclaw-labs/zeroclaw/pull/7510)、[#7511](https://github.com/zeroclaw-labs/zeroclaw/pull/7511)、[#7512](https://github.com/zeroclaw-labs/zeroclaw/pull/7512)

**解读：**  
用户最在意的是“第一次跑起来是否顺畅”，而不是复杂功能本身。quickstart 的几个问题都属于“文案/字段/参数”层面的低级摩擦，但对首装体验影响极大，因此能引发集中修复。

### 另一个讨论热点：插件/分发机制的架构路线
- [#7497](https://github.com/zeroclaw-labs/zeroclaw/issues/7497) — OCI-Compliant Container Registries 作为插件存储与发现机制（1 条评论）

**解读：**  
这类议题说明社区不只关心短期修 bug，也在推动 ZeroClaw 的生态化：  
- 插件如何分发
- 如何做供应链验证
- 如何支持多架构发布

### 反应最多的议题
当前快照里，列出的 Issue/PR **👍 均为 0**，未见明显高赞爆点。  
这通常意味着：讨论是**功能导向和问题驱动**的，而不是舆情驱动。

---

## 5) Bug 与稳定性
下面按严重程度从高到低整理，并标注是否已有 fix PR。

### S1 - workflow blocked
1. [#7507](https://github.com/zeroclaw-labs/zeroclaw/issues/7507) — `quickstart` 在非 TTY stdin 下无限重绘，输出 4.3GB  
   - 影响：CI、脚本、自动化 agent harness 可能直接失控  
   - Fix PR：**有**，[#7516](https://github.com/zeroclaw-labs/zeroclaw/pull/7516) 与 [#7513](https://github.com/zeroclaw-labs/zeroclaw/pull/7513)

2. [#7498](https://github.com/zeroclaw-labs/zeroclaw/issues/7498) — `Config::save()` 的默认值裁剪破坏 round-trip  
   - 影响：配置保存后某些字段会被错误丢失，属于**配置完整性**问题  
   - Fix PR：**当前快照未见直接对应 PR**

3. [#7505](https://github.com/zeroclaw-labs/zeroclaw/issues/7505) — quickstart 预填 `api-key` 为 kebab-case，导致 apply 失败  
   - 影响：非交互式 quickstart 无法完成  
   - Fix PR：**有**，[#7510](https://github.com/zeroclaw-labs/zeroclaw/pull/7510)、[#7512](https://github.com/zeroclaw-labs/zeroclaw/pull/7512)  
   - 状态：Issue 已关闭

### S2 - degraded behavior
4. [#7506](https://github.com/zeroclaw-labs/zeroclaw/issues/7506) — quickstart 成功提示给出不可用命令 `zeroclaw agent <alias>`  
   - 影响：新用户复制命令后直接失败，属于 onboarding 体验错误  
   - Fix PR：**有**，[#7508](https://github.com/zeroclaw-labs/zeroclaw/pull/7508)、[#7511](https://github.com/zeroclaw-labs/zeroclaw/pull/7511)  
   - 状态：Issue 已关闭

### S3 - minor issue
5. [#7509](https://github.com/zeroclaw-labs/zeroclaw/issues/7509) — Windows host 上 release asset 选择测试失败  
   - 影响：CI 测试稳定性，非核心运行时 bug  
   - Fix PR：**当前快照未见直接对应 PR**

### 其他值得关注的稳定性问题
- [#7517](https://github.com/zeroclaw-labs/zeroclaw/pull/7517) — ACP session cwd 未继承到 subagent/delegate  
  - 这是高风险运行时问题，虽然以 PR 形式出现，但说明 subagent 隔离与上下文继承仍在修整中。
- [#7522](https://github.com/zeroclaw-labs/zeroclaw/pull/7522) — `file_read` 默认不应对二进制/图片文件做损坏式 lossy text 转换  
  - 说明数据读取策略正在向“更安全、更少误导”演进。

---

## 6) 功能请求与路线图信号
今天出现的需求，很明显在给下一版本“指路”。

### 高概率进入后续版本的方向

#### A. 多代理协作与风险隔离
- [#7514](https://github.com/zeroclaw-labs/zeroclaw/issues/7514) — `delegate` 允许不同 risk profile 的 subagent
- [#7500](https://github.com/zeroclaw-labs/zeroclaw/pull/7500) — 继承 `max_context_tokens` / `max_context_window`

**判断：**  
这两项都与 v0.8.0 的“多 agent 架构”强相关，属于**路线图一致性很高**的需求。  
如果团队继续强化 agent 协作能力，这类功能大概率会被纳入后续版本。

#### B. 通道能力补齐与一致性
- [#7518](https://github.com/zeroclaw-labs/zeroclaw/issues/7518) — WhatsApp Web 支持 message reactions
- [#7495](https://github.com/zeroclaw-labs/zeroclaw/pull/7495) — Lark/Feishu 的 per-channel `ack_reactions`
- [#7494](https://github.com/zeroclaw-labs/zeroclaw/pull/7494) — WeChat markdown 处理性能优化

**判断：**  
渠道一致性是 ZeroClaw 作为“跨平台 AI 助手”能否成立的关键。  
这些需求说明用户希望不同 channel 的行为对齐，而不是“某个平台有、另一个平台没有”。

#### C. 输入/文件处理能力增强
- [#7521](https://github.com/zeroclaw-labs/zeroclaw/issues/7521) — `file_read` 支持非 UTF-8 编码检测
- [#7522](https://github.com/zeroclaw-labs/zeroclaw/pull/7522) — 默认拒绝 binary/image 文件的 lossy 文本化

**判断：**  
这是典型的“工具可靠性”需求，目标是避免 agent 被错误文本误导。  
如果 ZeroClaw 要作为严肃工作流助手，这条线会持续重要。

#### D. 插件生态与分发
- [#7497](https://github.com/zeroclaw-labs/zeroclaw/issues/7497) — OCI registry 作为插件发现机制

**判断：**  
这是偏中长期的平台化路线，优先级可能不如 quickstart/稳定性修复，但对生态增长非常关键。

---

## 7) 用户反馈摘要
从 Issues 和 PR 的内容看，用户反馈非常一致地指向几个真实痛点：

### 1. “能不能先别在第一步就失败”
- 代表：[#7507](https://github.com/zeroclaw-labs/zeroclaw/issues/7507)、[#7505](https://github.com/zeroclaw-labs/zeroclaw/issues/7505)、[#7506](https://github.com/zeroclaw-labs/zeroclaw/issues/7506)
- 场景：CI、脚本、非交互式环境、首次安装
- 痛点：quickstart 对 TTY、参数名、输出提示的处理不够稳

### 2. “配置保存后别悄悄变掉”
- 代表：[#7498](https://github.com/zeroclaw-labs/zeroclaw/issues/7498)、[#7519](https://github.com/zeroclaw-labs/zeroclaw/pull/7519)
- 场景：用户通过 TUI/局部编辑修改配置
- 痛点：round-trip 语义、默认值裁剪、自然键字段持久化

### 3. “工具要诚实，不要把二进制当文本乱读”
- 代表：[#7521](https://github.com/zeroclaw-labs/zeroclaw/issues/7521)、[#7522](https://github.com/zeroclaw-labs/zeroclaw/pull/7522)
- 场景：读取文件、分析内容、自动化处理
- 痛点：lossy conversion 会给 agent 造成错误上下文，属于隐性质量问题

### 4. “多渠道、多代理行为要一致”
- 代表：[#7518](https://github.com/zeroclaw-labs/zeroclaw/issues/7518)、[#7514](https://github.com/zeroclaw-labs/zeroclaw/issues/7514)
- 场景：Telegram/Discord/Matrix/WhatsApp、delegate/subagent
- 痛点：同一能力在不同 channel 或不同 agent 之间不一致，会让用户感到系统复杂且不可预测

---

## 8) 待处理积压
严格来说，当前快照里的大多数公开问题都是 **2026-06-11 新建**，还不能算“长期未响应”。  
但从维护优先级看，以下项目应视为**当前积压中最值得优先处理**的高影响项：

### 高优先级待处理项
- [#7517](https://github.com/zeroclaw-labs/zeroclaw/pull/7517) — subagent / delegate 的 cwd 继承问题（高风险，影响运行时语义）
- [#7515](https://github.com/zeroclaw-labs/zeroclaw/pull/7515) — session controls 与 provider diagnostics（范围大、风险高）
- [#7507](https://github.com/zeroclaw-labs/zeroclaw/issues/7507) — 非 TTY quickstart 死循环（S1）
- [#7498](https://github.com/zeroclaw-labs/zeroclaw/issues/7498) — 配置保存 round-trip 破坏（S1）
- [#7509](https://github.com/zeroclaw-labs/zeroclaw/issues/7509) — Windows CI asset 识别问题
- [#7497](https://github.com/zeroclaw-labs/zeroclaw/issues/7497) — 插件 OCI 分发机制提案（中长期路线图）
- [#7504](https://github.com/zeroclaw-labs/zeroclaw/pull/7504) — OpenAI timeout 配置未生效
- [#7500](https://github.com/zeroclaw-labs/zeroclaw/pull/7500) — context window 继承能力

### 维护建议
- **短期：** 优先清理 quickstart / 配置 / CI 相关问题，保证 v0.8.0 后续用户不会被第一步劝退。  
- **中期：** 统一多 agent / delegate / channel 的行为模型，减少“某处可用、某处不可用”的碎片化体验。  
- **长期：** 推进插件 OCI 发现机制与上下文管理能力，夯实平台化基础。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合内部晨会的精简版**，或  
2. **适合发到 GitHub Discussions / Slack 的运营版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*