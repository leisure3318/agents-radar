# OpenClaw 生态日报 2026-11-27

> Issues: 11 | PRs: 61 | 覆盖项目: 13 个 | 生成时间: 2026-11-27 05:19 UTC

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
**日期：2026-11-27｜统计范围：过去 24 小时**  
项目：[openclaw/openclaw](https://github.com/openclaw/openclaw)

> **数据口径**：本日报依据提供的 11 条 Issue 和 30 条 PR 明细分析，PR 更新总量为 61 条。PR 的 `CLOSED` 不等同于已合并；由于缺少合并字段，下文统一标注“已关闭”，不将其视为已落地。PR 评论数均为 `undefined`，且未提供评论正文，因此无法可靠评选 PR 讨论热度或还原评论观点。

## 一、今日速览

过去 24 小时，OpenClaw 有 **11 条 Issue 更新、61 条 PR 更新**，其中 41 条 PR 待合并、20 条已合并或关闭，开发与维护活动较活跃。今日未发布新版本，工作重点集中在 **子智能体生命周期、消息投递可靠性、资源计量和 Web UI 体验**。Issue 中 5 条已关闭、6 条仍开放，但 CPU 异常占用、消息丢失和工具超时等问题仍需核实修复与发布状态。整体呈现“**修复活动密集，但验证及评审压力仍在**”的状态；单日数据不足以判断积压是否持续扩大。  
参考：[Issues](https://github.com/openclaw/openclaw/issues) · [PRs](https://github.com/openclaw/openclaw/pulls)

## 二、项目进展

### 今日已关闭的重要 PR

以下条目代表相关工作有状态推进，**不代表已确认合并或进入发行版**。

| 方向 | 进展与价值 | 状态及链接 |
|---|---|---|
| 子智能体完成结果交付 | 将直接回复分类、公告流程和生命周期清理中的完成交付决策集中处理，旨在降低多处逻辑不一致的维护风险；属于行为保持型重构，而非新增功能。关联 Issue #206373 也已关闭。 | 已关闭：[PR #206383](https://github.com/openclaw/openclaw/pull/206383) · [Issue #206373](https://github.com/openclaw/openclaw/issues/206373) |
| Workboard 并发编辑 | 针对重命名 Sessions 看板时提交整列数据、可能覆盖其他用户列修改的问题提出修复，改善多人协作时的状态一致性。 | 已关闭：[PR #206292](https://github.com/openclaw/openclaw/pull/206292) |
| 插件更新状态反馈 | 避免将插件成功重载后的提示性警告误判为激活失败，减少不必要的重复操作。 | 已关闭：[PR #206372](https://github.com/openclaw/openclaw/pull/206372) |
| 测试可靠性 | 隔离 PostgreSQL 升级测试中的 schema 归属检查，并强化设备凭证拒绝测试，分别针对并发测试干扰和“未真正覆盖目标拒绝条件”的问题。 | 已关闭：[PR #206391](https://github.com/openclaw/openclaw/pull/206391) · [PR #206392](https://github.com/openclaw/openclaw/pull/206392) |

**进展判断：**今天更像一次可靠性与维护性整理，而不是功能发布日。关键价值在于收敛子智能体交付逻辑、保护并发编辑状态，以及提高测试有效性；实际交付程度仍须以合并记录和后续版本说明确认。

### 尚待合并、值得跟踪的工程进展

- **子智能体停止语义**：在停止请求的持久化终止声明提交后，即使子会话重置或轮换，也继续停止已选中的原始运行，避免返回“会话已变化”后任务仍存活。[PR #206405](https://github.com/openclaw/openclaw/pull/206405)
- **会话隔离**：修复删除另一会话期间，Codex 等原生 harness 的当前运行可能受影响的问题；PR 明确说明只覆盖相关故障的一种原因，并非解决所有未知结果恢复问题。[PR #205978](https://github.com/openclaw/openclaw/pull/205978)
- **性能优化**：减少恢复热提示词缓存时读取和传回的不必要会话数据；另有流式回复优化尝试避免对已稳定内容重复扫描，但后者带有消息投递风险及待补证明标签。[PR #206384](https://github.com/openclaw/openclaw/pull/206384) · [PR #205953](https://github.com/openclaw/openclaw/pull/205953)

## 三、社区热点

Issue 评论量整体不高，最高为 4 条，且所有展示条目的 👍 均为 0。因此，以下是**相对讨论热点，不代表已形成广泛社区共识**。

1. **空闲 Gateway 持续占用 CPU：4 条评论**  
   用户报告升级至 `2026.11.10` 后，Gateway 即使空闲，主机风扇仍持续高速运行；问题描述指向 `models.list` 与 `chat.metadata.changed` 的循环触发，约每秒 4.5 次。其核心诉求是个人助手在后台常驻时应保持低资源消耗。Issue 已关闭，但带有“关联 PR 仍开放”标签，不能据此认定修复已交付。  
   [Issue #206097](https://github.com/openclaw/openclaw/issues/206097)

2. **备份显示成功，但验证与恢复失败：4 条评论**  
   manifest 声明的表文件若被 `.gitignore` 排除，备份创建仍报告成功，随后验证和恢复却失败。用户关注的不只是报错提示，而是备份成功状态是否可信、能否真正恢复数据。  
   [Issue #206081](https://github.com/openclaw/openclaw/issues/206081)

3. **WebChat 一次回答显示两份：2 条评论**  
   普通文本最终回复同时以助手气泡和 Message 卡片出现，且描述中没有工具调用。问题仍待维护者审查和补充信息，反映出聊天呈现一致性和消息类型解释的体验问题。  
   [Issue #206375](https://github.com/openclaw/openclaw/issues/206375)

## 四、Bug 与稳定性

以下优先级综合官方标签与实际影响排列；同级内部优先关注资源异常、消息丢失和恢复能力。**“未见 fix PR”仅表示本次提供的数据中未展示。**

| 优先级 / 问题 | 用户影响 | 当前状态与 fix PR |
|---|---|---|
| **P1：模型目录事件循环** | 空闲时持续触发目录工作线程，造成 CPU 异常占用。 | Issue 已关闭；标签显示有关联开放 PR，但未提供其编号。[#206097](https://github.com/openclaw/openclaw/issues/206097)。[PR #206390](https://github.com/openclaw/openclaw/pull/206390) 仅关联该报告中的 provider 配置加载问题，不能视为循环问题的完整修复。 |
| **P2：QQ Bot 恢复重放丢消息** | 网关崩溃恢复后复用已消费的一次性 `msg_id`，错误被当作可重试处理，最终进入永久死信。 | 开放；未见 fix PR。[#206368](https://github.com/openclaw/openclaw/issues/206368) |
| **P2：子智能体最终结果被模型切换通知替代** | 子任务在备用模型上成功后，父任务仍可能收不到真正结果。 | 已关闭；未见明确对应 fix PR，尚不能确认修复落地。[#206378](https://github.com/openclaw/openclaw/issues/206378) |
| **未标级：Git 备份成功状态不可靠** | 被忽略的声明表文件使整个 agent scope 验证、恢复失败，具有较高恢复风险。 | 已关闭；未见 fix PR。[#206081](https://github.com/openclaw/openclaw/issues/206081) |
| **P2：共享内存重复计费** | Linux exec 内存守卫累加进程树 RSS，多次计算共享页，可能误杀 headless Chrome。 | 开放；已有待合并修复，拟对共享页去重计费。[#206082](https://github.com/openclaw/openclaw/issues/206082) · [PR #206396](https://github.com/openclaw/openclaw/pull/206396) |
| **P2：Codex 工具超时与严格 schema 冲突** | `before_tool_call` 执行耗时工作时触发 90 秒 watchdog；增加 `timeoutMs` 又被工具 schema 拒绝。 | 开放；已有待合并修复处理超时参数传递边界。[#206056](https://github.com/openclaw/openclaw/issues/206056) · [PR #206400](https://github.com/openclaw/openclaw/pull/206400) |
| **P2：Gemini 转录忽略语言设置** | 配置的音频语言未被 provider 用于构造请求。 | 已关闭；未见直接对应修复。[#206094](https://github.com/openclaw/openclaw/issues/206094)。[PR #205949](https://github.com/openclaw/openclaw/pull/205949) 涉及同一 provider 的参数传递，但目标是 thinking level，不宜等同。 |
| **P2：WebChat 重复显示最终回复** | 同一回答出现气泡和 Message 卡片两份展示。 | 开放，待补充信息和维护者审查；未见 fix PR。[#206375](https://github.com/openclaw/openclaw/issues/206375) |
| **P2：Environment → Changes 反复消失** | 同一聊天中的环境变更面板时隐时现，影响对工作区变化的判断。 | 开放，标记为可排队修复；未见 fix PR。[#206367](https://github.com/openclaw/openclaw/issues/206367) |
| **未标级：图片预览仅为目标宽度的 1/4** | 聊天和放大查看均模糊，但下载原图清晰。 | 开放；未见 fix PR。[#206404](https://github.com/openclaw/openclaw/issues/206404) |

## 五、功能请求与路线图信号

本次 Issue 以缺陷为主，新增能力信号主要来自开放 PR。以下判断表示“存在实现候选”，**不等于官方承诺纳入下一版本**。

| 方向 | 需求及可能价值 | 进入后续版本的信号 |
|---|---|---|
| **听写结果先审阅、后插入** | 支持结束采集后检查完整转录，再决定何时写入草稿；同时避免延迟转录或取消后的改写覆盖新结果。 | 已有 XL 规模功能 PR，改动较大，仍需验证。[PR #205973](https://github.com/openclaw/openclaw/pull/205973) |
| **Discord Goal 原生子命令** | 按开始、编辑、查看、清除等操作提供适配输入，减少无关参数。 | 已有 PR，但仍需补充证明。[PR #205976](https://github.com/openclaw/openclaw/pull/205976) |
| **更准确的模型与账号选择** | 保留 Qwen4-Max thinking effort；允许 CLI 使用显式 `@profile`，无需放宽模型白名单。 | 两项均已有开放修复 PR，表明配置意图准确传递是近期关注点。[PR #206385](https://github.com/openclaw/openclaw/pull/206385) · [PR #206399](https://github.com/openclaw/openclaw/pull/206399) |
| **凭证生命周期更可靠** | Code Mode 等待用户提供 secret 时不应随回合结束被取消；A2A 入站 token 轮换不应破坏出站连接配置。 | 均有开放修复 PR，值得关注人机协作和智能体互联场景的回归测试。[PR #206403](https://github.com/openclaw/openclaw/pull/206403) · [PR #206398](https://github.com/openclaw/openclaw/pull/206398) |

## 六、用户反馈摘要

**未提供评论正文，以下仅从用户提交的 Issue 描述提炼，不作为评论引述或满意度调查。**

- **后台常驻必须足够安静、节省资源。** 空闲时风扇持续运行、浏览器因内存误计被终止，说明资源管理直接影响个人助手的日常可用性。  
  [#206097](https://github.com/openclaw/openclaw/issues/206097) · [#206082](https://github.com/openclaw/openclaw/issues/206082)

- **“执行成功”必须对应结果可达、数据可恢复。** 备份成功却无法恢复、子任务成功却未向父任务交付结果、QQ 恢复重放进入死信，均体现出用户对端到端可靠性的要求。  
  [#206081](https://github.com/openclaw/openclaw/issues/206081) · [#206378](https://github.com/openclaw/openclaw/issues/206378) · [#206368](https://github.com/openclaw/openclaw/issues/206368)

- **控制台显示需要稳定且可信。** 重复回复、环境变更面板消失和模糊图片会使用户难以判断问题出在模型、内容本身还是 UI。图片下载后清晰这一现象，尤其指向预览链路而非原始图像质量。  
  [#206375](https://github.com/openclaw/openclaw/issues/206375) · [#206367](https://github.com/openclaw/openclaw/issues/206367) · [#206404](https://github.com/openclaw/openclaw/issues/206404)

本批数据没有明确的正面评价材料，不宜推断用户整体满意度。

## 七、待处理积压与维护提醒

**本次明细创建时间主要为 11 月 26—27 日，缺少最后维护者回复时间，因此无法认定存在“长期未响应”条目。** 以下是更应优先关注的待办队列：

1. **优先补齐消息丢失问题的修复闭环。** QQ Bot 永久死信问题仍开放且未见修复 PR；子智能体最终结果丢失问题虽已关闭，也应明确关闭原因、修复提交及验证版本。  
   [Issue #206368](https://github.com/openclaw/openclaw/issues/206368) · [Issue #206378](https://github.com/openclaw/openclaw/issues/206378)

2. **推动已有复现和修复方案的问题完成评审。** 内存计量和 Codex 超时问题均已出现对应 PR，建议重点验证多进程共享页、长时间 hook，以及严格 schema 下的参数处理。  
   [PR #206396](https://github.com/openclaw/openclaw/pull/206396) · [PR #206400](https://github.com/openclaw/openclaw/pull/206400)

3. **处理明确等待维护者的候选项。** Codex 会话隔离修复和 Gemini 低 thinking level 转录 PR 均带有证明充分、等待维护者标签，可作为评审队列的具体入口。  
   [PR #205978](https://github.com/openclaw/openclaw/pull/205978) · [PR #205949](https://github.com/openclaw/openclaw/pull/205949)

4. **不要让性能优化绕过消息正确性验证。** 流式回复去重复扫描 PR 带有消息投递风险及待补证明标签，应先验证元数据剥离、增量输出和最终文本的一致性，再评估性能收益。  
   [PR #205953](https://github.com/openclaw/openclaw/pull/205953)

### 总结

OpenClaw 今日的积极信号是：多个问题已具备源码复现、明确修复形态或对应 PR，工程活动持续覆盖核心运行链路。主要风险则是**消息交付、恢复可靠性与资源控制问题尚未形成可核实的发布闭环**。下一阶段最值得关注的不是 PR 数量本身，而是高影响修复能否完成评审、回归验证，并明确进入哪个版本。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-27｜观察窗口：过去 24 小时**

> **口径说明：**本报告仅依据提供的摘要。Issue、PR 数指窗口内的更新条目数，不等于新增数；PR“已关闭”不代表已合并。OpenClaw 的 PR 总量采用汇总值 61 条，但技术主题分析仅基于提供的 30 条明细；“无活动”仅表示本次窗口内未观察到活动，不代表项目停滞。

## 一、生态全景

本次覆盖的 **13 个项目中，3 个有可见活动**，共记录 **15 条 Issue 更新、71 条 PR 更新**，活动主要集中于 OpenClaw 和 Hermes Agent。两者今日工作都偏向会话、恢复、配置与工具集成的可靠性治理，而不是新增核心推理能力，反映出复杂使用场景正在暴露工程边界问题。NanoBot 则聚焦跨入口本地化一致性，属于范围明确的体验补齐。三个活跃项目均未发布新版本，且缺少明确合并记录，因此当前更应关注“修复是否验证并进入发行版”，而不是单纯比较 PR 数量。

## 二、各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release 情况 | 当日健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | **11** | **61** | 无新版本 | 工程活动最密集；消息交付、恢复与资源控制问题需要验证交付闭环 |
| **Hermes Agent** | **4** | **9** | 无新版本 | 持续迭代；多 Profile、会话和工具发现存在集成边界风险 |
| **NanoBot** | **0** | **1** | 无新版本 | 单点本地化维护；样本不足以判断整体健康度 |
| PicoClaw | 0 | 0 | 未提供发布信息 | 当日无可见活动，无法判断长期状态 |
| NanoClaw | 0 | 0 | 未提供发布信息 | 同上 |
| NullClaw | 0 | 0 | 未提供发布信息 | 同上 |
| IronClaw | 0 | 0 | 未提供发布信息 | 同上 |
| LobsterAI | 0 | 0 | 未提供发布信息 | 同上 |
| TinyClaw | 0 | 0 | 未提供发布信息 | 同上 |
| Moltis | 0 | 0 | 未提供发布信息 | 同上 |
| CoPaw | 0 | 0 | 未提供发布信息 | 同上 |
| ZeptoClaw | 0 | 0 | 未提供发布信息 | 同上 |
| ZeroClaw | 0 | 0 | 未提供发布信息 | 同上 |
| **合计** | **15** | **71** | 三个活跃项目均无新版本 | 活动高度集中，实际交付仍待确认 |

**结构性观察：**
- OpenClaw 占本次 PR 更新量的 **85.9%**、Issue 更新量的 **73.3%**。
- OpenClaw 有 **41 条开放 PR、20 条已合并或关闭条目**，但缺少字段区分后两者；Hermes 有 **8 条开放、1 条关闭**；NanoBot 唯一 PR 已关闭。
- 上述数据反映的是**当日活动规模**，不能直接推出贡献者规模、评审效率或代码质量排名。

## 三、OpenClaw 在生态中的定位

### 1. 优势：当日工程覆盖面最广

OpenClaw 的工作同时覆盖子智能体生命周期、多渠道消息、原生 harness、资源计量、备份恢复、凭证和 Web UI。相较 Hermes 今日更集中的会话、Profile 与插件议题，OpenClaw 展现出更广的**运行时与交付链路维护范围**。

具体优势信号包括：
- **端到端交付意识较强：**不仅处理任务执行，还关注停止语义、最终结果传递、崩溃后的消息重放。
- **资源治理进入细节层：**包括空闲 CPU 循环、共享页重复计费、提示词缓存恢复和流式扫描优化。
- **部分问题已有明确修复载体：**如内存计量 [#206396](https://github.com/openclaw/openclaw/pull/206396)、Codex 超时边界 [#206400](https://github.com/openclaw/openclaw/pull/206400)。

但**覆盖广意味着回归面也更大，不等于稳定性已经领先**。

### 2. 技术路线差异：运行编排与交付链路更突出

从今日议题看，OpenClaw 更突出“**多渠道、子智能体与运行环境之间的可靠编排**”；Hermes 更突出“**多终端、多 Profile 与外部工具生态的工作流接入**”；NanoBot 今日仅能确认其关注跨入口语言体验。

这属于基于当前活动的路线信号，不能据此完成对三个项目整体架构的定性，更不能推断未活跃项目的技术能力。

### 3. 社区规模：只能确认可见活动领先

OpenClaw 的 Issue 与 PR 更新量显著领先，但缺少独立贡献者、活跃用户、下载量和历史数据，**无法认定其社区规模是 Hermes 的若干倍**。其 Issue 最高评论数也仅为 4 条，所展示条目的 👍 均为 0；高工程活动并未在本批数据中表现为高讨论热度。

## 四、共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与共同点 |
|---|---|---|
| **会话生命周期与并发隔离** | OpenClaw、Hermes | OpenClaw 处理子任务停止、会话删除影响其他运行；Hermes 处理多终端续聊占用、外部集成会话语义。共同要求是会话身份、状态和控制权明确 |
| **异常恢复与状态可信性** | OpenClaw、Hermes | OpenClaw 关注备份可恢复、QQ 重放不丢消息；Hermes 关注 Desktop 恢复不误入首次设置。恢复成功不能只看局部步骤 |
| **配置意图端到端传递** | OpenClaw、Hermes | OpenClaw 涉及模型参数、账号 Profile、超时和凭证；Hermes 涉及 Profile 预设、辅助模型路由和 Cron 通知参数。共同问题是“配置存在但未真正生效” |
| **性能优化不能改变行为正确性** | OpenClaw、Hermes | OpenClaw 优化缓存与流式扫描，同时承担消息投递风险；Hermes 的工具延迟暴露导致技能依赖误判，另有重复 AST 解析优化 |
| **跨入口体验一致性** | OpenClaw、Hermes、NanoBot | OpenClaw 关注回复、环境面板和图片呈现；Hermes 关注 Desktop、网关和 CLI 一致性；NanoBot 补齐 WebUI 与命令回复的希伯来语覆盖 |
| **插件与工具生态治理** | OpenClaw、Hermes | OpenClaw 处理插件激活反馈及凭证生命周期；Hermes 推进插件目录、工具发现与技能依赖判断。扩展能力的重点正从“可接入”走向“稳定可用” |

## 五、差异化定位分析

以下用户定位为**当前议题反映出的适配倾向**，不是完整产品定位。

| 项目 | 当前功能侧重 | 更相关的用户场景 | 可观察的架构边界 |
|---|---|---|---|
| **OpenClaw** | 子智能体编排、消息交付、资源与恢复治理 | 常驻个人助手、多渠道使用、复杂工具执行与子任务协作 | Gateway、子会话、原生 harness、渠道适配、Web UI 之间的状态协调 |
| **Hermes Agent** | 会话管理、多 Profile、Desktop 恢复、插件工具 | 多终端用户、多个配置环境、任务板集成与脚本自动化 | CLI、Desktop、网关、Profile 文件路径及延迟工具发现之间的一致性 |
| **NanoBot** | 命令与界面本地化补齐 | 使用非英语界面和命令交互的用户 | 已观察到共享命令文案目录；不足以判断核心运行架构 |
| **其余 10 个项目** | 本窗口无可分析变更 | 无法从本次数据判断 | 不宜依据项目名称推断语言、部署方式、安全模型或轻量化程度 |

**选型含义：**关注多渠道任务交付的团队，可优先核查 OpenClaw 的端到端可靠性；关注多终端、Profile 和外部工作流的团队，可重点验证 Hermes 的上下文与权限边界。两者都不应仅凭今日 PR 活跃度直接进入生产选型结论。

## 六、社区热度与成熟度

### 活跃度分层

- **高可见活动：OpenClaw**  
  61 条 PR 更新体现密集迭代，但今日内容以可靠性、维护性和测试有效性为主，呈现“**高频迭代中的质量巩固**”。

- **持续迭代：Hermes Agent**  
  9 条 PR 更新覆盖修复和扩展，呈现“**集成能力推进与质量补齐并行**”，复杂场景正在推动边界治理。

- **低可见活动：NanoBot**  
  单项本地化维护，不能据此判断处于快速迭代或全面质量巩固阶段。

- **静默观察组：其余 10 个项目**  
  仅能认定当日无活动，不能判定维护衰退或成熟稳定。

### 成熟度判断的关键限制

本批材料不足以形成可靠的成熟度排名：缺少长期响应时间、合并率、版本回归率、测试覆盖和生产使用数据。**更高活跃度可能同时意味着更强维护投入和更多暴露中的复杂性；更低缺陷报告量也可能只是观察样本较少。**

## 七、值得关注的趋势信号

### 1. 成功标准从“任务执行完毕”转向“结果可靠可达”
OpenClaw 的子任务结果丢失、QQ 恢复死信和备份不可恢复，说明局部成功不足以满足用户需求。

**开发参考：**分别记录执行完成、结果持久化、投递确认与恢复验证，避免用单一 `success` 状态覆盖整条链路。

### 2. 会话正在成为可并发、可接管的工作流对象
OpenClaw 的子会话停止与隔离，Hermes 的多终端续聊和任务板集成，都在提高会话控制语义的重要性。

**开发参考：**明确会话 ID、运行 ID、控制权、占用状态与终止语义，优先测试跨终端及外部接管场景。

### 3. 配置一致性成为产品复杂度的重要来源
Profile、模型路由、工具 schema、通知策略和多语言入口都出现“配置与实际行为不一致”的信号。

**开发参考：**建立配置契约测试，并提供“当前生效配置”的可观测入口，而不只验证配置文件可解析。

### 4. 工具懒加载需要区分“未加载”与“不存在”
Hermes 的技能依赖误判表明，延迟发现机制可能影响能力判断；OpenClaw 的性能 PR 也显示优化与消息正确性之间存在耦合。

**开发参考：**为工具能力维护独立于加载状态的元数据，并以行为一致性作为优化验收条件。

### 5. 常驻助手的资源预算正在成为核心体验
OpenClaw 的空闲 CPU 和共享内存误计问题提示：个人助手不仅需要任务执行效率，也需要可接受的后台成本。

**开发参考：**将空闲 CPU、常驻内存、子进程计量、取消后资源释放纳入回归指标。

---

## 综合判断

**今日最明确的生态信号不是“谁新增能力最多”，而是活跃项目正在补齐复杂工作流的可靠性。**OpenClaw 的可见工程投入和覆盖面领先，Hermes 在多终端、Profile 与插件集成上持续推进，NanoBot 提供了跨入口体验维护的具体样本。

对技术决策者，下一阶段应优先追踪三件事：**高影响修复是否合并、是否通过跨场景回归、是否明确进入可用版本。**这比单日 PR 数量更能衡量实际采用风险。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-27**  
**项目：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)**

## 1. 今日速览

过去 24 小时，NanoBot 未记录到 Issue 更新，仅有 **1 条 PR 更新，状态为已关闭**，整体可见活跃度较低。今日变更聚焦希伯来语本地化，旨在补齐 WebUI 已支持希伯来语、但命令菜单和回复仍显示英文的体验缺口。数据未提供该 PR 的合并标记，因此**不能将“已关闭”等同于“已合并”**。今日无新版本发布，现有数据也不足以判断项目整体稳定性或维护响应速度是否发生变化。  
来源：[项目仓库](https://github.com/HKUDS/nanobot) · [PR #6819](https://github.com/HKUDS/nanobot/pull/6819)

## 2. 项目进展

### 希伯来语命令本地化补全：PR #6819 已关闭，合并状态未确认
- **标题**：fix(i18n): add Hebrew translations for command menus and replies
- **作者**：chengyongru
- **创建及更新日期**：2026-11-27
- **变更范围**：为五个共享命令文案目录中的全部 **157 个条目**添加 `he` 翻译，覆盖命令菜单、回复和配对相关文案等。
- **解决的问题**：WebUI 已能显示希伯来语，但 `/help`、`/status` 等命令仍返回英文，导致不同交互入口的语言体验不一致。
- **进展判断**：这是一次范围明确的国际化补齐，而非核心智能体能力扩展。若已合并，将改善希伯来语用户的命令交互体验；当前只能确认 PR 已关闭，不能确认代码已进入主分支或后续版本。

该 PR 是 [#6814](https://github.com/HKUDS/nanobot/pull/6814) 的后续工作，但所给数据未包含前序 PR 的具体状态与完整内容。  
链接：[PR #6819](https://github.com/HKUDS/nanobot/pull/6819)

## 3. 社区热点

今日唯一可见的社区活动是希伯来语本地化修复，**暂无足够数据认定其为高热度讨论**。

| 条目 | 可见互动数据 | 反映的诉求 |
|---|---|---|
| [PR #6819：补充希伯来语命令菜单与回复](https://github.com/HKUDS/nanobot/pull/6819) | 👍 0；评论数未提供，原始值为 `undefined` | 多语言支持需要贯穿 WebUI、命令菜单和运行时回复，而不只是界面翻译 |

评论数据缺失，不能据此认定该 PR 无人讨论，也无法进行评论热度排名。

## 4. Bug 与稳定性

| 严重程度 | 问题 | 修复状态 |
|---|---|---|
| 低：本地化与体验一致性 | 希伯来语界面下，`/help`、`/status` 等命令仍返回英文；共享命令目录缺少希伯来语翻译 | 已有 [fix PR #6819](https://github.com/HKUDS/nanobot/pull/6819)，状态为已关闭，是否合并待确认 |

今日数据中**未见新增崩溃、数据丢失、安全或核心功能回归报告**。但由于 Issue 更新为 0，这仅代表本次数据未观察到相关报告，不代表项目不存在此类问题。  
来源：[项目 Issues](https://github.com/HKUDS/nanobot/issues)

## 5. 功能请求与路线图信号

- **未观察到新的用户功能请求。** 今日没有 Issue 更新，无法识别新增需求或需求优先级。来源：[项目 Issues](https://github.com/HKUDS/nanobot/issues)
- **可见信号是继续完善多语言覆盖。** [PR #6819](https://github.com/HKUDS/nanobot/pull/6819) 延续前序工作，将希伯来语支持从 WebUI 推进至共享命令文案，体现出对跨入口语言一致性的关注。
- **下一版本收录情况无法确认。** 该 PR 尚无明确合并信息，也未提供版本里程碑或发布计划，不宜将其列为下一版本的确定更新。来源：[PR #6819](https://github.com/HKUDS/nanobot/pull/6819)

## 6. 用户反馈摘要

今日未提供 Issue 评论或 PR 评论正文，**无法提炼可归因于真实用户的满意度、抱怨或使用反馈**。

从 PR 描述可识别的使用痛点是：用户即使在希伯来语 WebUI 中使用 `/help`、`/status` 等命令，仍会遇到英文回复。这说明现有本地化覆盖存在交互链路上的缺口，但该信息来自贡献者的变更说明，不应当作用户评论引用。  
来源：[PR #6819](https://github.com/HKUDS/nanobot/pull/6819)

## 7. 待处理积压

现有数据仅覆盖过去 24 小时的更新，未包含历史开放条目、最后响应时间或等待时长，因此**无法识别长期未响应的重要 Issue 或 PR**。

建议维护者核实 [PR #6819](https://github.com/HKUDS/nanobot/pull/6819) 的关闭原因：若已合并，可继续确认译文验证与发布归属；若未合并，则需确认这项本地化缺口是否由其他变更接续处理。该项属于状态核查建议，并非已确认的长期积压。

---

**健康度结论：** 今日呈现“低可见活动、单点体验改进”的状态。希伯来语补全体现了对国际化细节的维护，但缺少合并信息、讨论内容和历史积压数据，暂不足以进一步评价交付效率、社区参与度或长期维护健康度。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-27**  
**项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)**

## 1. 今日速览

过去 24 小时，项目有 **4 条 Issue 更新、9 条 PR 更新**，其中 8 条 PR 仍开放、1 条关闭，未发布新版本；从提交活动看，项目保持活跃。今日工作主要集中在会话管理、多 Profile、Desktop 连接恢复和插件生态，偏向既有能力的可靠性与使用体验改进。现有数据**没有明确的 PR 合并记录**，唯一关闭项是 AgentEarth 插件目录提交，因此不能将今日提案视为已经交付。社区反馈显示，Hermes 正被用于多终端、多 Profile、第三方任务板和延迟工具发现等更复杂场景，集成边界与配置一致性成为新的稳定性考验。  
来源：[Issues](https://github.com/NousResearch/hermes-agent/issues) · [Pull Requests](https://github.com/NousResearch/hermes-agent/pulls)

## 2. 项目进展

### 已关闭事项：AgentEarth 插件目录提交

- **[PR #160660：添加 AgentEarth](https://github.com/NousResearch/hermes-agent/pull/160660)** 已关闭。同一作者随后存在同名开放提交 **[PR #160662](https://github.com/NousResearch/hermes-agent/pull/160662)**，内容均涉及提供 31 个英文技能，并通过 Streamable HTTP 发现工具。
- 两项提交很可能属于重提或替代关系，但摘要未说明关闭原因，也未证明旧提交已合并。**今日可确认的是插件接入工作仍在推进，不能认定 AgentEarth 已正式进入主线。**

### 尚未合并的主要推进方向

| 方向 | 今日进展与预期价值 | 状态 |
|---|---|---|
| 会话导出安全性 | 修正 `sessions export <id>` 被解释为全量导出的问题，避免误导出及大 Profile 下的内存风险 | [#160661](https://github.com/NousResearch/hermes-agent/pull/160661)，开放 |
| Desktop 恢复流程 | 避免已有可用本地连接在网关恢复过程中误入首次安装/连接引导 | [#160654](https://github.com/NousResearch/hermes-agent/pull/160654)，开放 |
| 多终端续聊 | `hermes -c`、`--resume latest` 跳过被其他终端占用的会话，减少手动查找会话 ID | [#160656](https://github.com/NousResearch/hermes-agent/pull/160656)，开放 |
| 辅助模型配置 | 为辅助任务提供共享默认路由，减少逐项配置模型的负担 | [#160663](https://github.com/NousResearch/hermes-agent/pull/160663)，开放 |
| 插件目录维护 | 将目录中的 `hermes-shortcuts` 更新至 0.2.0；不是 Hermes 核心版本发布 | [#160653](https://github.com/NousResearch/hermes-agent/pull/160653)，开放 |

**整体判断：** 今日积累了多项针对实际使用障碍的修复候选，但实际交付进度仍取决于评审、测试和合并，尚不宜按 PR 数量等同计算功能完成量。

## 3. 社区热点

**热度数据限制：** 4 条 Issue 均为 **0 评论、0 👍**；PR 评论数未提供，👍 均为 0。因此无法客观评选“讨论最多”的条目，以下按问题影响与主题聚集度列出值得关注的议题，而非互动量排名。

- **会话从单人聊天走向多终端与外部编排。** 第三方任务板希望获得可交互的集成会话，同时避免冒用 owner-chat 语义；另有 PR 改善多终端续聊与导出命令。这组变化反映了会话生命周期、并发占用及控制权限的重要性上升。  
  链接：[Issue #160658](https://github.com/NousResearch/hermes-agent/issues/160658) · [PR #160656](https://github.com/NousResearch/hermes-agent/pull/160656) · [PR #160661](https://github.com/NousResearch/hermes-agent/pull/160661)

- **多 Profile 的端到端一致性。** Desktop 次级 Profile 缺失 MoA 预设，以及符号链接 Profile 的网关发现修复，说明问题已不局限于配置文件本身，还涉及 UI、网关和文件系统路径之间的协同。  
  链接：[Issue #160657](https://github.com/NousResearch/hermes-agent/issues/160657) · [PR #160664](https://github.com/NousResearch/hermes-agent/pull/160664)

- **插件扩展与工具可发现性同步承压。** AgentEarth 扩展技能供给，但 Tool Search 下的技能依赖误判表明，工具延迟加载与技能可用性判断还需要保持一致。  
  链接：[PR #160662](https://github.com/NousResearch/hermes-agent/pull/160662) · [Issue #160655](https://github.com/NousResearch/hermes-agent/issues/160655)

## 4. Bug 与稳定性

以下按潜在用户影响排序；**不是官方新增严重性评级**。所列修复 PR 均尚未合并。

| 优先关注 | 问题与影响 | 标注优先级 | Fix PR |
|---|---|---|---|
| 高 | **会话导出参数歧义**：用户意图导出单个会话，却可能导出全部会话到以 ID 命名的文件；PR 摘要关联大 Profile 下的 OOM 风险 | P2 | 已有：[PR #160661](https://github.com/NousResearch/hermes-agent/pull/160661) |
| 高 | **Desktop 恢复误入首次设置**：Windows 11、v0.23.4 场景中，网关恢复超时后可能错误判断没有可用安装，打断原本可工作的连接流程 | P2 | 已有：[PR #160654](https://github.com/NousResearch/hermes-agent/pull/160654) |
| 中 | **技能依赖误判**：Tool Search 将 MCP/插件工具延迟暴露后，`requires_tools` / `requires_toolsets` 可能把它们判为不存在，导致相关技能不可见 | P2 | 数据中未见对应修复：[Issue #160655](https://github.com/NousResearch/hermes-agent/issues/160655) |
| 中 | **次级 Profile 的 MoA 预设缺失**：Desktop v0.23.4 新聊天未展示已启用的预设，但显式指定 Profile 的网关请求能够返回这些预设 | P2 | 数据中未见对应修复：[Issue #160657](https://github.com/NousResearch/hermes-agent/issues/160657) |
| 中 | **内存提供方检测重复解析**：配置 Schema 请求在 Dashboard 事件循环上触发插件模块重复 AST 解析，存在响应延迟风险 | P2 | 已有缓存优化：[PR #160659](https://github.com/NousResearch/hermes-agent/pull/160659) |
| 较低 | **符号链接 Profile 的网关发现失败**：迁移到 multiplex 时，可能无法识别实际运行在默认目录之外的 Profile 网关 | P3 | 已有：[PR #160664](https://github.com/NousResearch/hermes-agent/pull/160664) |

**稳定性结论：** 今日风险更集中于参数解释、恢复状态机、Profile 上下文和工具发现边界，而非新增核心推理能力。数据中未见安全漏洞报告；但会话全量误导出与 OOM 风险值得优先验证。  
来源：[PR #160661](https://github.com/NousResearch/hermes-agent/pull/160661)

## 5. 功能请求与路线图信号

| 需求 | 用户诉求 | 下一版本信号 |
|---|---|---|
| 第三方集成的交互式会话源 | 自托管任务板通过 Desktop 同类会话协议驱动 Hermes，希望支持排队的 Steer/Edit，又不继承 owner-chat 语义 | 仅有需求，未见对应 PR；需先厘清权限与会话语义。[#160658](https://github.com/NousResearch/hermes-agent/issues/160658) |
| Cron 通知 CLI 参数 | 在 `cron create/edit` 中设置 `toast_notifications`、`badge_notifications`，避免必须使用 WebUI | 需求边界明确，但尚无实现记录。[#160652](https://github.com/NousResearch/hermes-agent/issues/160652) |
| 辅助任务共享默认模型路由 | 主交互可使用高成本模型，辅助任务统一采用其他默认路由，降低配置遗漏与成本管理负担 | 已有开放实现，比纯需求更接近交付。[#160663](https://github.com/NousResearch/hermes-agent/pull/160663) |
| 多终端智能续聊 | 自动跳过其他终端正在使用的聊天 | 已有开放实现，具备近期纳入候选的基础。[#160656](https://github.com/NousResearch/hermes-agent/pull/160656) |
| 扩充插件能力 | 接入 AgentEarth，并更新快捷操作插件目录版本 | 已有开放 PR，仍需评审；不代表已安排发布。[#160662](https://github.com/NousResearch/hermes-agent/pull/160662) · [#160653](https://github.com/NousResearch/hermes-agent/pull/160653) |

**判断：** 辅助任务路由、多终端续聊和插件目录更新已有实现载体，更值得关注近期合并情况；当前数据没有下一版本里程碑或维护者承诺，不能确定发布归属。

## 6. 用户反馈摘要

今日没有可供提炼的 Issue 评论，以下均来自 **Issue 正文与 PR 描述**，不能视为评论共识或满意度调查。

- **“后端配置存在，但前端不可见。”** 次级 Profile 的 MoA 预设可由网关返回，却没有出现在 Desktop 新聊天中，增加了配置排障成本。  
  [Issue #160657](https://github.com/NousResearch/hermes-agent/issues/160657)

- **“工具只是延迟加载，不应被视为不存在。”** 使用 MCP、插件和 Tool Search 的用户遇到技能可用性误判，说明性能优化需要避免改变能力发现结果。  
  [Issue #160655](https://github.com/NousResearch/hermes-agent/issues/160655)

- **“自动化配置不应依赖 WebUI 补步骤。”** Cron 用户希望通过 CLI 或脚本完成通知策略配置，体现出对可重复部署和无人值守管理的需求。  
  [Issue #160652](https://github.com/NousResearch/hermes-agent/issues/160652)

- **“Hermes 是工作流中的一个智能体，而不只是聊天窗口。”** 自托管任务板需要在外部系统内驱动、干预会话，同时保持明确的身份与控制边界。  
  [Issue #160658](https://github.com/NousResearch/hermes-agent/issues/160658)

现有材料以问题报告和改进诉求为主，**不足以判断总体满意或不满意程度**。

## 7. 待处理积压

**无法确认长期积压。** 本批条目均创建于 2026-11-27，缺少历史等待时长、维护者响应和评审记录，不应把“今日尚未回复”描述为“长期无人处理”。

建议维护者优先跟进：

1. **完成导出修复的回归验证**：覆盖单会话 ID、输出路径、筛选与显式全量导出，避免参数修正引入新的兼容性问题。  
   [PR #160661](https://github.com/NousResearch/hermes-agent/pull/160661)

2. **分诊两项尚无对应修复的 P2 Issue**：分别复现 Tool Search 下的技能依赖判断，以及次级 Profile 的 MoA 预设展示问题。  
   [Issue #160655](https://github.com/NousResearch/hermes-agent/issues/160655) · [Issue #160657](https://github.com/NousResearch/hermes-agent/issues/160657)

3. **验证 Desktop 恢复修复不会影响真正的首次安装流程**，重点覆盖 Windows 网关启动缓慢和连接恢复场景。  
   [PR #160654](https://github.com/NousResearch/hermes-agent/pull/160654)

4. **明确 AgentEarth 新旧提交的关系与有效评审入口**，避免重复审阅或误读关闭状态。  
   [已关闭 #160660](https://github.com/NousResearch/hermes-agent/pull/160660) · [开放 #160662](https://github.com/NousResearch/hermes-agent/pull/160662)

---

**项目健康度总结：** 今日贡献活动持续，修复候选覆盖多项具体使用痛点；但没有可确认的合并交付，评审吞吐与实际修复效果仍待后续观察。近期最值得追踪的是 **P2 修复能否合并、多 Profile 行为能否保持一致，以及插件工具延迟发现是否影响技能可用性**。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

过去24小时无活动。

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

过去24小时无活动。

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

过去24小时无活动。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*