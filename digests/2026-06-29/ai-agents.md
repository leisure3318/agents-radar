# OpenClaw 生态日报 2026-06-29

> Issues: 17 | PRs: 14 | 覆盖项目: 13 个 | 生成时间: 2026-06-29 01:38 UTC

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

# OpenClaw 项目动态日报（2026-06-29）

## 1) 今日速览

OpenClaw 过去 24 小时保持了**高活跃度**：Issues 更新 17 条、PR 更新 14 条，并且新增了 **1 个 beta 版本**。从内容看，项目今天的重心一方面是继续推进**渠道/控制台能力增强**，另一方面则在集中处理**消息投递、历史上下文、鉴权与稳定性**等高风险问题。  
今日闭环动作不少：**6 个 Issue 关闭、5 个 PR 关闭/合并**，说明维护节奏仍然稳定。  
但未关闭的高优先级问题也很突出，尤其是 **P1 级别的 lane starvation、子代理完成投递无限重试**，表明项目当前的健康度属于“**功能推进积极，但稳定性压力仍然偏高**”。

---

## 2) 版本发布

### 新版本：v2026.6.11-beta.2
- 发布链接：<https://github.com/openclaw/openclaw/releases/tag/v2026.6.11-beta.2>

### 版本亮点
根据 release 摘要，本次 beta 主要强化了**渠道控制与自动化能力**：
- **Slack relay mode**：Slack 转发/中继模式更便于自动化接入。
- **Mattermost 原生 `/oc_queue`**：直接在 Mattermost 内使用队列入口，降低操作成本。
- **按 DM 覆盖模型配置**：可针对单个私聊场景覆盖模型，利于精细化调度。  
  涉及 PR：[#94707](https://github.com/openclaw/openclaw/pull/94707)、[#95546](https://github.com/openclaw/openclaw/pull/95546)、[#95120](https://github.com/openclaw/openclaw/pull/95120)

### 迁移/升级注意事项
- 这是 **beta 版本**，建议先在预发环境验证关键通道（Slack、Mattermost、DM）配置是否符合预期。
- 由于引入了**更细粒度的 channel 操作与模型覆盖机制**，升级后应重点检查：
  - DM 场景是否仍按预期命中模型覆盖；
  - Slack relay / Mattermost 队列路径是否影响既有消息流；
  - 与历史限制、队列调度、身份解析相关的边界行为。

### 破坏性变更
- 从当前给出的摘要中**未看到明确的 breaking change 声明**。  
- 但“通道控制更强、按 DM 覆盖模型”的能力增强，通常意味着配置优先级和路由规则可能更复杂，升级前应回顾相关配置。

---

## 3) 项目进展

今天已关闭/合并的 PR 共 5 个，覆盖了**文档修复、系统提示词、秘密引用解析、QA 覆盖迁移**等多个方向：

1. **修复 Discord 文档格式**
   - PR：[#97584](https://github.com/openclaw/openclaw/pull/97584)
   - 关联 Issue：[#97582](https://github.com/openclaw/openclaw/issues/97582)
   - 价值：修复 bot permissions 的标题/列表排版，降低新用户配置门槛。

2. **修复 Anthropic custom tool 定义兼容性**
   - PR：[#97607](https://github.com/openclaw/openclaw/pull/97607)
   - 价值：移除 Anthropic Messages API 不接受的 `type: "custom"`，避免工具调用被拒。

3. **迁移 Tool Search gateway E2E 到 QA Lab**
   - PR：[#97478](https://github.com/openclaw/openclaw/pull/97478)
   - 价值：把原本脚本化的覆盖转成原生 QA flow，提升可维护性与证据链完整度。

4. **修复 Runtime 系统提示词中的 volatile `:run:` 后缀**
   - PR：[#97449](https://github.com/openclaw/openclaw/pull/97449)
   - 关联 Issue：[#96677](https://github.com/openclaw/openclaw/issues/96677)（PR 描述中提到）
   - 价值：减少每次运行都变化的内容，改善 prefix caching 命中。

5. **跳过非 gateway exec SecretRefs 的 gateway RPC**
   - PR：[#97445](https://github.com/openclaw/openclaw/pull/97445)
   - 关联 Issue：[#96653](https://github.com/openclaw/openclaw/issues/96653)（PR 描述中提到）
   - 价值：减少不必要的 gateway 依赖，修复特定 SecretRefs 的解析路径。

### 整体推进评估
- 今日“闭环”的 PR 虽然以**修复和基础设施优化**为主，但覆盖了**文档、认证、工具调用、测试体系**多个面向，说明项目在向“可用、可测、可维护”继续推进。
- 另外还有多条高质量修复 PR 处于**ready / actively grinding / needs proof** 状态，意味着接下来几天可能继续集中释放稳定性补丁。

---

## 4) 社区热点

今日讨论最活跃的主题，集中在**可用性、稳定性、上下文保持**三类问题。

### 1. iOS 动态字体兼容问题
- Issue：[#97534](https://github.com/openclaw/openclaw/issues/97534)
- 状态：已关闭
- 评论：3，👍：1
- 诉求：iOS Chat 文本未跟随 Dynamic Type / Larger Text 设置，直接影响移动端可访问性。
- 背后含义：用户对**无障碍支持**有明确期待，且希望 UI 能尊重系统级字体设置。

### 2. 文档格式问题
- Issue：[#97569](https://github.com/openclaw/openclaw/issues/97569)
- 状态：已关闭
- 评论：2，👍：1
- 诉求：安装/权限文档排版不规范，容易误导配置。
- 背后含义：OpenClaw 的用户使用链路较长，**文档准确性**直接影响采用率。

### 3. 高优先级稳定性/路由问题
这类 issue 虽然评论不多，但从标签和点赞看，是今天的“技术热点”：
- [#97593](https://github.com/openclaw/openclaw/issues/97593)：Codex native subagent 完成投递无限重试（P1）
- [#97588](https://github.com/openclaw/openclaw/issues/97588)：lane starvation，单个卡死 lane 牵连所有 sibling lane（P1）
- [#97603](https://github.com/openclaw/openclaw/issues/97603)：动态工作目录在 sandbox backend 下的支持（P2）
- [#97602](https://github.com/openclaw/openclaw/issues/97602)：Control UI 头像 401 问题（P2）

### 热点判断
今天的社区关注并不是“单纯要新功能”，而是明显偏向：
- **更少的静默失败**
- **更清晰的状态呈现**
- **更强的会话/路由隔离**
- **更好的移动端和多渠道体验**

---

## 5) Bug 与稳定性

以下按严重程度排序：

### P1：子代理完成投递无限重试，可能导致消息丢失/无截止重试
- Issue：[#97593](https://github.com/openclaw/openclaw/issues/97593)
- 状态：OPEN
- 风险：高
- 影响面：session-state、message-loss
- 是否已有 fix PR：**未看到对应 fix PR**
- 备注：这是典型的“永不终止”的可靠性问题，若投递路径永久不可达，将持续占用资源并放大故障。

### P1：单个 wedged lane 造成所有 sibling lanes 饥饿
- Issue：[#97588](https://github.com/openclaw/openclaw/issues/97588)
- 状态：OPEN
- 风险：高
- 影响面：session-state、message-loss、crash-loop
- 是否已有 fix PR：**未看到对应 fix PR**
- 备注：属于 gateway 级别的调度/隔离问题，可能拖垮同机其他会话。

### P2：模型退役时 failover 被错误视为终止
- Issue：[#97564](https://github.com/openclaw/openclaw/issues/97564)
- 状态：OPEN
- 风险：中高
- 影响面：message-loss、auth-provider
- 是否已有 fix PR：**未看到对应 fix PR**
- 备注：会造成配置好的 fallback 不生效，属于“静默降级失败”。

### P2：历史限制下 compaction summary 被悄然丢失
- Issue：[#97590](https://github.com/openclaw/openclaw/issues/97590)
- 状态：OPEN
- 风险：中高
- 影响面：session-state
- 是否已有 fix PR：**有**
- 对应 PR：[#97591](https://github.com/openclaw/openclaw/pull/97591)
- 备注：这是上下文连续性问题，影响长会话质量。

### P2：Control UI 头像 401
- Issue：[#97602](https://github.com/openclaw/openclaw/issues/97602)
- 状态：OPEN
- 风险：中
- 影响面：web-ui、可视化体验
- 是否已有 fix PR：**有**
- 对应 PR：[#97606](https://github.com/openclaw/openclaw/pull/97606)
- 备注：典型前端资源访问鉴权问题，修复路径明确。

### P2：iOS 动态字体不生效
- Issue：[#97534](https://github.com/openclaw/openclaw/issues/97534)
- 状态：CLOSED
- 风险：中
- 是否已有 fix PR：**未在本次 PR 列表中看到**
- 备注：已闭环，但从用户视角属于可访问性缺陷。

### 其他稳定性/兼容性问题
- [#97578](https://github.com/openclaw/openclaw/issues/97578)：CLI 遇到无 exec approvals capability 的节点时崩溃
- [#97568](https://github.com/openclaw/openclaw/issues/97568)：Telegram rich messages 列表/标题间距回归
- [#97601](https://github.com/openclaw/openclaw/issues/97601)：fast auto-mode 状态消息噪音过大
- [#97586](https://github.com/openclaw/openclaw/issues/97586)：WhatsApp lane 完成后 active_reply_work 未释放
  - 状态：CLOSED
  - 风险：高
  - 这是典型的“跑完了但锁没释放”问题，若无后续验证，值得复查。

---

## 6) 功能请求与路线图信号

今天的新功能请求，明显集中在**会话控制、个性化路由、可观测性和多模态交互**四个方向。

### 1. 动态工作目录（按 invocation / session）
- Issue：[#97603](https://github.com/openclaw/openclaw/issues/97603)
- 诉求：在 sandbox backend 下允许按调用或会话动态分配工作目录。
- 路线图信号：**很强**
- 原因：这类能力有明显的多 agent / 多任务编排价值，且与 session-state 设计高度相关。

### 2. 对话中隐藏 fast auto-mode 状态更新
- Issue：[#97601](https://github.com/openclaw/openclaw/issues/97601)
- 诉求：把内部调试型状态从用户聊天流中移除或可配置抑制。
- 路线图信号：**较强**
- 原因：属于产品体验优化，容易被纳入下个迭代作为低风险增强。

### 3. 多 agent 会话的 per-message sender identity
- Issue：[#97589](https://github.com/openclaw/openclaw/issues/97589)
- 状态：CLOSED
- 诉求：会话内消息应能区分不同发送者。
- 路线图信号：**中强**
- 原因：对 agent bridge / 多智能体协作可读性非常关键。

### 4. 历史摘要保留在 historyLimit / dmHistoryLimit 中
- Issue：[#97590](https://github.com/openclaw/openclaw/issues/97590)
- 对应 PR：[#97591](https://github.com/openclaw/openclaw/pull/97591)
- 路线图信号：**很强，且接近落地**
- 原因：这是对长会话的基础修复，几乎可以视作下一版稳定性补丁。

### 5. skill allowlist 支持 additive/merge 组合
- Issue：[#97567](https://github.com/openclaw/openclaw/issues/97567)
- 诉求：现有 replace 语义太强，无法做增量叠加。
- 路线图信号：**中等**
- 原因：更偏配置表达力增强，适合进入中期 roadmap。

### 6. 实时语音对话模式（macOS）
- Issue：[#97592](https://github.com/openclaw/openclaw/issues/97592)
- 状态：CLOSED
- 路线图信号：**战略性需求**
- 原因：若后续重提，说明项目有从“文本代理”向“多模态助手”扩展的用户需求。

### 结合现有 PR 的判断：可能进入下一版本的候选
更可能被纳入下一轮修复/发布的，是这些已经有对应 PR 的项：
- [#97590 / #97591](https://github.com/openclaw/openclaw/pull/97591)
- [#97602 / #97606](https://github.com/openclaw/openclaw/pull/97606)
- [#96681 / #97513](https://github.com/openclaw/openclaw/pull/97513)
- [#87407 / #97608](https://github.com/openclaw/openclaw/pull/97608)
- [#97542](https://github.com/openclaw/openclaw/pull/97542)（Claude CLI `apiKeyHelper`）
- [#97539](https://github.com/openclaw/openclaw/pull/97539)（Signal REST 读取限流）

---

## 7) 用户反馈摘要

从 Issues 的评论与摘要里，可以提炼出几条非常真实的用户痛点：

### 1. “不要静默失败，要有可解释性”
典型例子：
- [#97593](https://github.com/openclaw/openclaw/issues/97593)
- [#97588](https://github.com/openclaw/openclaw/issues/97588)
- [#97564](https://github.com/openclaw/openclaw/issues/97564)

用户最不能接受的是：系统看起来“还在跑”，但实际上已卡死、已退化或永远重试。  
这说明 OpenClaw 的用户对**可靠性和故障边界**非常敏感。

### 2. “上下文不能丢，摘要不能没”
- [#97590](https://github.com/openclaw/openclaw/issues/97590)
- [#97589](https://github.com/openclaw/openclaw/issues/97589)

用户在长会话、多 agent 会话里最在意的是：  
**谁说了什么、前面总结了什么、当前状态是什么**。  
一旦 compaction summary 或 sender identity 丢失，整个会话可读性就崩了。

### 3. “多渠道、多平台要真正尊重平台规范”
- [#97534](https://github.com/openclaw/openclaw/issues/97534)
- [#97568](https://github.com/openclaw/openclaw/issues/97568)
- [#97582](https://github.com/openclaw/openclaw/issues/97582)

iOS 动态字体、Telegram rich HTML 间距、Discord 文档排版，都反映出用户非常依赖**跨平台一致性**，同时也希望具体渠道体验“像原生应用”。

### 4. “状态信息要克制，不要污染用户聊天”
- [#97601](https://github.com/openclaw/openclaw/issues/97601)

用户接受内部调试/状态信息存在，但不希望这些信息直接进入聊天可见区。  
这反映出产品正在从“工程可用”走向“用户可用”。

### 5. “身份与认证路径要一致”
- [#97602](https://github.com/openclaw/openclaw/issues/97602)
- [#97542](https://github.com/openclaw/openclaw/pull/97542)

头像、API key、exec secret 的处理都说明用户在真实环境中会遇到很多“看似边缘、实则高频”的认证/身份映射问题。

---

## 8) 待处理积压

以下是今天最值得维护者盯住的未解决重点，按优先级与影响面综合排序：

1. **[#97593](https://github.com/openclaw/openclaw/issues/97593)**  
   P1，子代理完成投递无限重试，存在消息丢失和资源耗尽风险。

2. **[#97588](https://github.com/openclaw/openclaw/issues/97588)**  
   P1，单 lane 卡死拖垮整机/整 gateway 的调度隔离问题。

3. **[#97603](https://github.com/openclaw/openclaw/issues/97603)**  
   动态工作目录，影响多 agent / sandbox 编排能力，且属于明确的产品演进诉求。

4. **[#97564](https://github.com/openclaw/openclaw/issues/97564)**  
   failover 失效会导致“有配置但实际不切换”，很适合尽快修。

5. **[#97578](https://github.com/openclaw/openclaw/issues/97578)**  
   CLI 在缺少 exec approvals capability 时直接崩溃，属于容易触发的健壮性问题。

6. **[#97567](https://github.com/openclaw/openclaw/issues/97567)**  
   skill allowlist 的 replace-only 语义限制较大，属于中期产品表达能力债务。

7. **[#97539](https://github.com/openclaw/openclaw/pull/97539)**、**[#97608](https://github.com/openclaw/openclaw/pull/97608)**、**[#97542](https://github.com/openclaw/openclaw/pull/97542)**  
   这些是当前“最像下一批可落地修复”的候选 PR，建议优先补 proof / 复审。

---

## 结论：项目健康度判断

综合看，OpenClaw 今天呈现出一种很典型的“**高节奏演进期**”状态：  
- **交付节奏快**：1 个 beta 发布、5 个 PR 关闭、6 个 Issue 关闭；
- **需求仍强**：新 feature request 明显，且覆盖多 agent、session-state、channel 体验；
- **稳定性压力不小**：P1 级别的消息投递与 lane 调度问题仍未消化；
- **用户体验治理在推进**：文档、UI、可访问性、聊天噪音控制都在被逐步修补。

如果按一句话总结：**OpenClaw 正在持续变强，但当前最需要优先处理的，仍然是“可靠性与上下文完整性”而不是单纯新增功能。**

---

## 横向生态对比

下面是一份基于你给出的 2026-06-29 快照整理的**横向对比分析报告**。  
> 注：表格中的“Issues / PR”均指 **过去 24 小时公开活跃量**（新增或更新）。

---

## 1) 生态全景

整体来看，个人 AI 助手 / 自主智能体开源生态正处于**“高频迭代、低频发版、重心转向可靠性”**的阶段。  
多数项目不再只追求“能跑”，而是开始集中处理**会话连续性、消息路由、安全边界、跨平台适配、上下文成本**等生产可用性问题。  
从活跃度看，**Hermes Agent、ZeroClaw、OpenClaw** 处于第一梯队，体现出较强的社区驱动与问题密度；而 **NanoBot、NanoClaw、IronClaw** 更偏向稳定性收敛和工程补强。  
另一个明显特征是：**只有 OpenClaw 出现了明确 beta release**，说明大多数项目仍处在“持续集成/持续修补”窗口，而非稳定发版节奏。  
总体而言，这个生态已从“概念验证”进入“真实使用驱动优化”的阶段。

---

## 2) 各项目活跃度对比

| 项目 | Issues（24h） | PR（24h） | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 17 | 14 | **有**：v2026.6.11-beta.2 | 高活跃；交付推进快，但 P1 稳定性压力仍高 |
| **NanoBot** | 2 | 7 | 无新版本 | 活跃但偏收敛，核心流程在优化 |
| **Hermes Agent** | 50 | 50 | 无新版本 | 超高活跃；修复驱动明显，桌面/多平台压力大 |
| **PicoClaw** | 0 | 0 | 无活动 | 静默 |
| **NanoClaw** | 0 | 5 | 无新版本 | 低噪音、持续修补，健康度中上 |
| **NullClaw** | 0 | 0 | 无活动 | 静默 |
| **IronClaw** | 0 | 8 | 无新版本 | 工程推进积极，偏稳定性加固 |
| **LobsterAI** | 1 | 0 | 无新版本 | 低活跃；问题集中在核心功能可用性 |
| **TinyClaw** | 0 | 0 | 无活动 | 静默 |
| **Moltis** | 0 | 2 | 无新版本 | 低活跃但持续推进，偏维护型 |
| **CoPaw** | 4 | 1 | 无新版本 | 需求活跃、交付偏慢，待验证项较多 |
| **ZeptoClaw** | 0 | 0 | 无活动 | 静默 |
| **ZeroClaw** | 8 | 41 | 无新版本 | 高活跃；评审压力大，处于高频迭代期 |

---

## 3) OpenClaw 在生态中的定位

### 优势
1. **功能面最完整、产品化程度较高**  
   OpenClaw 同时覆盖 **Slack、Mattermost、Discord、DM、gateway/session-state、QA、prefix caching、secret refs** 等多个面，明显不是单点工具，而是偏“平台级智能体控制面”。

2. **工程闭环能力强**  
   今天既有 beta release，又有多条 PR/Issue 闭环，说明项目在“能发布、能修、能测”三方面都具备较强节奏。

3. **社区问题密度高，说明真实使用面广**  
   与一些低活跃项目相比，OpenClaw 的问题类型更丰富，意味着它更接近“实际部署在复杂场景中”的状态。

### 技术路线差异
- 相比 **Hermes Agent** 的“桌面端 + Gateway + 多平台适配”路线，OpenClaw 更偏**通道控制 / 会话路由 / 运行时稳定性**。
- 相比 **ZeroClaw** 的“多通道消息编排 + SOP 事件源 + 工作区安全”路线，OpenClaw 更强调**消息投递、上下文完整性、控制台能力**。
- 相比 **NanoBot** 的“CLI / provider / exec / cost optimization”路线，OpenClaw 更偏**平台化编排**而不是单用户工具链。
- 相比 **IronClaw** 的“Reborn / error recovery / policy”路线，OpenClaw 更偏**业务可用性与渠道接入**，不是纯框架化研究。

### 社区规模对比
- 从 24h 活跃量看，OpenClaw 处于**第一梯队前列**，但仍略低于 **Hermes Agent** 和 **ZeroClaw** 这类“超高互动社区”。
- 它比 **NanoBot、NanoClaw、Moltis、CoPaw、LobsterAI** 更像一个**成熟度更高、外部使用更广**的项目。
- 结论：OpenClaw 可视为生态中的**“高活跃平台型中枢”**，不是最大声量者，但属于最接近生产化中枢的一类。

---

## 4) 共同关注的技术方向

### 1. 可靠性与故障恢复
**涉及项目：** OpenClaw、Hermes Agent、NanoClaw、IronClaw、ZeroClaw、LobsterAI  
**具体诉求：**
- OpenClaw：子代理完成投递无限重试、lane starvation
- Hermes：context compression wedge、session routing misdirect
- NanoClaw：Codex reconnect、symlink escape 安全修复
- IronClaw：recoverable-error、FailureLane 分类
- ZeroClaw：群聊未授权发送静默处理
- LobsterAI：Memory Search provider 失效、索引重建 EBUSY  
**判断：** 生态共识已经从“容错最好做”转向“**不能静默失败、必须可恢复**”。

### 2. 上下文、记忆与会话连续性
**涉及项目：** OpenClaw、NanoBot、Hermes Agent、CoPaw、LobsterAI  
**具体诉求：**
- OpenClaw：history summary 保留、sender identity
- NanoBot：减少 context usage、会话导出与时间戳
- Hermes：恢复会话时压缩卡死
- CoPaw：memory_search reranker
- LobsterAI：embedding provider 切换、索引重建  
**判断：** “**长会话可读性 + 记忆可控性 + 成本可控**”已经成为通用需求。

### 3. 多渠道 / 多平台兼容
**涉及项目：** OpenClaw、Hermes Agent、NanoClaw、ZeroClaw、CoPaw、Moltis  
**具体诉求：**
- OpenClaw：Slack relay、Mattermost /oc_queue、Discord 文档、DM 模型覆盖
- Hermes：QQBot、Telegram、Matrix、Feishu、Slack、Desktop
- NanoClaw：Discord custom_id、Telegram rich rendering、Codex
- ZeroClaw：Telegram / Matrix 多消息、富消息、文件系统 SOP
- CoPaw：DingTalk mentions
- Moltis：gateway 模块化、图像输入稳定性  
**判断：** 生态的主战场是“**单模型能力**”之外的“**渠道接入和消息形态适配**”。

### 4. 安全边界与权限治理
**涉及项目：** OpenClaw、Hermes Agent、NanoClaw、ZeroClaw、IronClaw  
**具体诉求：**
- OpenClaw：SecretRefs、gateway RPC、auth-related 修复
- Hermes：Matrix room isolation、host cwd 安全
- NanoClaw：symlink escape、附件写入隔离
- ZeroClaw：workspace file protection、`.ignore` 机制
- IronClaw：capability policy e2e  
**判断：** 智能体开始真正进入工作区和协作场景后，**“能不能访问”**比“能不能生成”更重要。

### 5. 交互体验与可观测性
**涉及项目：** OpenClaw、NanoBot、Hermes Agent、ZeroClaw、CoPaw  
**具体诉求：**
- OpenClaw：iOS 字体、状态噪音、文档格式
- NanoBot：WebUI session timestamps / markdown export
- Hermes：Windows 黑框、闪窗、设置入口可达性
- ZeroClaw：Telegram / Matrix 消息呈现
- CoPaw：日志刷屏、技能选择交互  
**判断：** 生态正在从“工程可用”转向“**用户可用**”。

---

## 5) 差异化定位分析

### A. 平台型中枢
- **代表项目：OpenClaw、ZeroClaw、Hermes Agent**
- **目标用户：** 需要多渠道部署、会话调度、协同接入的团队
- **架构特点：**
  - OpenClaw：通道控制、session-state、gateway、QA 体系
  - ZeroClaw：多渠道消息编排 + SOP 事件源 + 工作区治理
  - Hermes：Desktop + Gateway + 多平台适配
- **差异：** OpenClaw 更偏“中枢控制面”，ZeroClaw 更偏“自动化编排层”，Hermes 更偏“桌面化入口与跨平台适配”。

### B. 开发者工具 / Provider Orchestration
- **代表项目：NanoBot、IronClaw、LobsterAI**
- **目标用户：** 开发者、研究者、需要可配置模型/执行环境的用户
- **架构特点：**
  - NanoBot：CLI / WebUI / provider / exec / 成本优化
  - IronClaw：Reborn、恢复机制、策略验证
  - LobsterAI：Memory Search backend 与 provider 可切换
- **差异：** 这类项目更强调“**可配置、可实验、可复现**”，而不是通道覆盖。

### C. 通道插件 / 集成增强型
- **代表项目：NanoClaw、CoPaw、Moltis**
- **目标用户：** 依赖特定渠道或特定工作流的集成用户
- **架构特点：**
  - NanoClaw：安全加固 + 多渠道协议兼容
  - CoPaw：channels send + memory_search + 交互优化
  - Moltis：依赖解耦 + 多模态输入预处理
- **差异：** 更像“把 AI 能力接入现有工作流”的工程层，强调局部可用性。

### D. 低活动/未成型项目
- **代表项目：PicoClaw、NullClaw、TinyClaw、ZeptoClaw**
- **特征：** 近 24h 无活动，缺少可观察的社区输入与工程推进
- **判断：** 目前更像“静默维护”或“等待下一轮激活”。

---

## 6) 社区热度与成熟度

### 快速迭代阶段
- **Hermes Agent**：50/50，问题与 PR 都极高，典型“边修边跑”
- **ZeroClaw**：PR 41、Issues 8，高强度迭代，评审压力大
- **OpenClaw**：17/14 + beta release，活跃且产品化推进明显
- **NanoClaw**：虽然 Issues 少，但 PR 持续推进，属于“低噪音修补”

### 质量巩固阶段
- **IronClaw**：更像在补测试、修恢复、稳策略
- **NanoBot**：provider、exec、context 优化为主
- **Moltis**：依赖解耦 + 多模态稳定性增强
- **CoPaw**：需求明显，但交付节奏偏慢，处在“等落地”阶段
- **LobsterAI**：单点问题突出，更多是功能可用性修补

### 低热度 / 静默阶段
- **PicoClaw、NullClaw、TinyClaw、ZeptoClaw**
- **判断：** 目前缺少足够的公开活动信号，暂难判断真实成熟度。

---

## 7) 值得关注的趋势信号

### 1. “静默失败”正在被系统性拒绝
多个项目都在处理**无限重试、卡死、路由错发、恢复失败**问题。  
这意味着未来智能体开发的核心标准会从“有结果”升级为“**可解释、可恢复、可终止**”。

### 2. 会话连续性与记忆质量成为主战场
OpenClaw、NanoBot、CoPaw、LobsterAI、Hermes 都在围绕上下文和记忆做优化。  
对开发者的启发是：**长会话能力不是附加项，而是产品核心能力**。

### 3. 多渠道/多平台是默认前提，不再是锦上添花
Telegram、Matrix、Slack、Discord、Mattermost、DingTalk、Feishu、QQBot 等都在被反复适配。  
这说明智能体产品要想进入真实场景，必须具备**渠道原生体验**，而不是只输出文本。

### 4. 安全与工作区边界正在前置
从 symlink escape、workspace protection、room isolation 到 capability policy，行业正在把“权限治理”放到非常前的位置。  
对开发者来说，未来 Agent 方案必须默认考虑：**谁能看、谁能写、谁能触发、谁能恢复**。

### 5. 成本优化开始和功能同等重要
NanoBot 的 context usage reduction、LobsterAI 的 provider fallback、OpenClaw 的 prefix caching，都表明 token 成本和上下文预算已成为产品工程指标。  
这意味着下一阶段竞争点不只是模型能力，而是**单位任务成本、会话持续成本和失败成本**。

---

如果你愿意，我可以继续把这份报告压缩成：
1. **管理层 1 页版摘要**，或  
2. **适合晨会/周报的表格版结论**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-06-29）

## 1. 今日速览
过去 24 小时内，NanoBot 维持了**较高的开发活跃度**：新增/活跃 Issues 2 条、PR 更新 7 条，但没有新版本发布，说明当前仍处于**功能迭代与修复并行**阶段，而非集中发版阶段。  
从议题分布看，讨论重点集中在 **OAuth/Provider 流程、执行环境兼容性、WebUI 可用性、上下文压缩与成本优化**，这些都属于会直接影响日常使用体验的核心路径。  
今日关闭了 2 个 PR，表明维护节奏正常，部分需求已进入收束或合入阶段。  
整体来看，项目健康度较好：**贡献活跃、需求明确、稳定性改进持续推进**，但当前仍缺少发布节奏上的“版本锚点”。

---

## 2. 版本发布
**今日无新版本发布**（Latest Releases 为空）。  
当前更像是一个“**持续集成/功能收敛窗口**”：PR 数量较多，但尚未形成新 release。

---

## 3. 项目进展
今日结束的 2 个 PR，对项目推进主要体现在以下两条线：

- [#4572 fix(cli): allow oauth login to be main provider](https://github.com/HKUDS/nanobot/pull/4572)  
  这条 PR 直接补齐了 **OAuth 登录后可设为主 provider** 的流程，降低了用户在初始化和切换 provider 时的操作成本。  
  对 NanoBot 这种依赖 provider 配置的工具来说，这属于**高频核心路径优化**，会明显改善新用户上手体验。

- [#4575 add repository guidelines](https://github.com/HKUDS/nanobot/pull/4575)  
  虽然偏治理型，但对开源协作很重要：仓库规范的补齐会提升后续 PR/Issue 的一致性，减少维护成本。  
  这类改动对项目长期健康有帮助，属于**基础设施型进展**。

**整体推进判断：**  
今天的已关闭 PR 数量不多，但覆盖了“**用户配置入口**”和“**协作规范**”两类关键点。前者直接影响产品可用性，后者影响项目维护效率，属于**小步但有效的前进**。

---

## 4. 社区热点
今日没有明显“高评论/高反应”的爆款讨论，互动数据整体偏低；但从新增内容看，社区关注点非常集中：

- [#4579 WebUI: Show session timestamps in sidebar + export session as markdown](https://github.com/HKUDS/nanobot/issues/4579)  
  这是典型的**高使用频率场景优化**：多会话用户希望在侧边栏直接看到时间戳，并能导出 Markdown。  
  背后诉求是：**更容易管理会话、回溯历史、沉淀内容**，尤其适合重度使用者。

- [#4580 Use conda environment for subprocesses](https://github.com/HKUDS/nanobot/issues/4580)  
  这是一个偏底层但很实用的诉求：当前 exec 子进程默认路径不适配虚拟环境，用户希望能兼容 conda/venv。  
  说明 NanoBot 已进入“**真实生产/研究环境落地**”阶段，用户开始关注环境隔离与可复现性。

- [#4573 fix(cli): allow oauth login to be/set main provider](https://github.com/HKUDS/nanobot/pull/4573)  
- [#4578 fix(providers): handle Codex OAuth proxy explicitly](https://github.com/HKUDS/nanobot/pull/4578)  
  这两条 PR 共同指向一个热点：**OAuth provider 体验与网络环境兼容性**。  
  这通常意味着 NanoBot 的用户正在从“能用”过渡到“在复杂网络/多 provider 场景下稳定可用”。

**热点结论：**  
今天的社区诉求不是“要不要做新功能”，而是“**如何让现有核心流程更顺手、更稳、更适合真实使用环境**”。

---

## 5. Bug 与稳定性
今日未看到明确的高严重度 Bug 报告（如崩溃、数据丢失、严重回归）。  
但从 PR 内容可以看出，维护者正在主动做稳定性加固：

- [#4577 test(exec): cover bwrap sandbox mounts](https://github.com/HKUDS/nanobot/pull/4577)  
  这是典型的**回归测试补强**，重点覆盖 sandbox mount 行为，说明 exec/bwrap 路径被视为稳定性敏感区。

- [#4578 fix(providers): handle Codex OAuth proxy explicitly](https://github.com/HKUDS/nanobot/pull/4578)  
  这个修复表明 **OAuth 登录与代理链路** 可能存在兼容性风险，当前已通过显式 proxy 处理来降低故障概率。

- [#4580 Use conda environment for subprocesses](https://github.com/HKUDS/nanobot/issues/4580)  
  严格来说这是增强请求，不是 bug；但它揭示了一个**环境隔离不一致**的问题，若不处理，容易演变为“执行结果不可复现/命令找不到依赖”的隐性故障。

**稳定性判断：**  
当前没有明显严重事故，但项目正在围绕 **exec、sandbox、OAuth、proxy** 四个敏感面做加固，说明维护者对线上可用性是有预警意识的。

---

## 6. 功能请求与路线图信号
今日新增的功能请求，和已有 PR 一起看，已经能看到下一阶段路线图的轮廓：

- [#4579 WebUI: Show session timestamps in sidebar + export session as markdown](https://github.com/HKUDS/nanobot/issues/4579)  
  **路线图信号：WebUI 体验增强**  
  这类需求偏“轻改动、高频收益”，很适合进入下一个小版本。

- [#4580 Use conda environment for subprocesses](https://github.com/HKUDS/nanobot/issues/4580)  
  **路线图信号：执行环境兼容性**  
  如果 NanoBot 面向开发者/研究用户，这个需求的优先级不低；尤其当 exec 已是核心能力时，虚拟环境兼容会直接影响可用性。

- [#4573 fix(cli): allow oauth login to be/set main provider](https://github.com/HKUDS/nanobot/pull/4573)  
- [#4578 fix(providers): handle Codex OAuth proxy explicitly](https://github.com/HKUDS/nanobot/pull/4578)  
  **路线图信号：OAuth/Provider 成为近期主线**  
  这两条 PR 和用户诉求高度一致，说明下一版本大概率会继续围绕“**登录、provider 选择、代理兼容**”做收敛。

- [#4581 optimization: reducing context usage and thus reducing costs](https://github.com/HKUDS/nanobot/pull/4581)  
  **路线图信号：成本优化与长会话能力**  
  这是更偏中长期的方向：降低 token/context 传入量，意味着 NanoBot 需要在“**保留能力**”和“**控制成本**”之间找到平衡。  
  对多轮对话、长上下文用户尤其关键。

**哪些更可能进入下一版本？**  
优先级更高的，应该是：  
1. **OAuth/provider 流程优化**（已有 PR 支撑，用户也在持续提）  
2. **WebUI 会话管理增强**（直接提升日常使用效率）  
3. **执行环境/虚拟环境兼容**（影响真实部署与复现）  
4. **上下文压缩与成本优化**（中长期价值高）

---

## 7. 用户反馈摘要
从今日 Issues/PR 的内容，可以提炼出几个非常真实的用户痛点：

- **“exec 能跑，但不一定在我想要的环境里跑。”**  
  来自 [#4580](https://github.com/HKUDS/nanobot/issues/4580)  
  用户希望 subprocess 能自动进入 conda/虚拟环境，这说明他们已经在把 NanoBot 用到真实开发环境，而不是只做演示。

- **“我有多个 session，但不好管理、回看和导出。”**  
  来自 [#4579](https://github.com/HKUDS/nanobot/issues/4579)  
  时间戳和 Markdown 导出属于典型“重度用户刚需”，说明会话管理能力开始成为产品体验的一部分，而不只是附属功能。

- **“OAuth 登录流程不够顺手，默认主 provider 不明确。”**  
  来自 [#4573](https://github.com/HKUDS/nanobot/pull/4573) 与 [#4572](https://github.com/HKUDS/nanobot/pull/4572)  
  这类反馈表明，用户在配置阶段容易产生困惑，甚至浪费时间；他们希望工具更“自动理解”自己的偏好。

- **“代理/网络环境复杂，登录和调用必须显式适配。”**  
  来自 [#4578](https://github.com/HKUDS/nanobot/pull/4578)  
  这说明 NanoBot 正在面对更真实的企业/校园/复杂网络场景，稳定连通性是体验关键。

- **“成本控制开始变得重要。”**  
  来自 [#4581](https://github.com/HKUDS/nanobot/pull/4581)  
  用户已经从“能不能用”转向“能不能长时间、低成本地用”。

---

## 8. 待处理积压
从当前快照看，**没有明显“长期未响应”的陈旧条目**：新增 Issue 和 PR 都集中在 2026-06-28 至 2026-06-29，属于非常新的积压，尚不能归类为长期滞留。

不过，以下开放项值得维护者优先关注，因为它们对产品主路径影响较大：

- [#4581 optimization: reducing context usage and thus reducing costs](https://github.com/HKUDS/nanobot/pull/4581)  
  高价值优化，直接影响成本与长会话体验。

- [#4578 fix(providers): handle Codex OAuth proxy explicitly](https://github.com/HKUDS/nanobot/pull/4578)  
  涉及登录与网络链路，属于易出隐性问题的关键路径。

- [#4573 fix(cli): allow oauth login to be/set main provider](https://github.com/HKUDS/nanobot/pull/4573)  
  直接影响初始化与 provider 配置体验。

- [#4579 WebUI: Show session timestamps in sidebar + export session as markdown](https://github.com/HKUDS/nanobot/issues/4579)  
  重度用户高频需求，建议尽早评估。

- [#4580 Use conda environment for subprocesses](https://github.com/HKUDS/nanobot/issues/4580)  
  若 exec 是核心能力，这个需求应尽快判断实现成本和优先级。

---

## 总体判断
NanoBot 今天呈现的是一种**“高活跃、低噪声、需求聚焦”**的健康状态：  
- PR 数量明显高于 Issue 数量，说明维护重心在**实现与修复**，而不是被大量故障淹没；  
- 讨论集中在 **provider、exec、WebUI、上下文成本** 等核心体验链路，属于产品成熟化的正常信号；  
- 当前缺少 release，提示项目仍在快速迭代中，后续如果能尽快形成版本发布节奏，用户感知会更清晰。

如果你愿意，我也可以把这份日报进一步整理成：**适合发送到飞书/企业微信的精简版**，或者输出为 **Markdown 表格版**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

以下为 **Hermes Agent（nousresearch/hermes-agent）2026-06-29 项目动态日报**。  
总体判断：**项目处于高活跃、快速迭代但仍偏“问题驱动”阶段**，今天几乎没有版本发布，讨论重心集中在桌面端稳定性、网关适配、跨平台兼容与安全/权限边界修复上。

---

## 1. 今日速览

过去 24 小时内，项目共发生 **50 条 Issue 更新** 与 **50 条 PR 更新**，其中 Issue **关闭 6 条**，PR **已合并/关闭 7 条**，其余仍处于持续活跃状态。  
从内容看，Hermes Agent 今天的活动密度很高，但主要是围绕 **Desktop 启动/闪窗、Windows 兼容性、Gateway/平台适配、会话路由、工具链健壮性** 的补丁和回归修复，而不是新版本发布。  
**未见新 Release**，说明项目当前更像是在“修稳定性、补平台兼容、清积压”的阶段。  
整体健康度评价：**活跃度高、反馈输入充足，但稳定性问题仍集中且多平台并发暴露**。

---

## 2. 版本发布

**今日无新版本发布。**

---

## 3. 项目进展

### 今日可见的推进方向
虽然公开列表未显示“已合并 PR 标题”，但从今日新增/活跃 PR 的内容看，项目正在围绕以下几条主线推进：

- **多平台适配修复**：  
  - QQBot `connect()` 参数兼容修复  
  - Telegram typing 指示器卡死修复  
  - Matrix 多 profile 房间隔离修复  
  - Windows updater / console handoff 隐藏修复  
- **桌面端体验与稳定性**：  
  - Windows 黑框/命令窗口闪烁问题  
  - PTY/TERM 规范化  
  - 启动链路懒加载、减少冷启动开销  
- **Agent / Provider 兼容性增强**：  
  - Gemini `safety_settings` 支持  
  - OpenAI client 异常链保留  
  - 自定义 provider 的错误告警优化  
- **Dashboard / 配置体验**：  
  - Keys 页面支持更多环境变量  
  - 日文本地化补全  
  - 自定义 `.env` 键可见性提升

### 进展量化
- 今日 **Issue 活跃更新 50**，**关闭 6**
- 今日 **PR 活跃更新 50**，**合并/关闭 7**
- 说明项目仍在快速修补和收敛，**前进速度不慢，但“新增问题”与“修复”仍同时高位运行**

### 关联 PR 示例
- [#54547 fix(qqbot): add missing is_reconnect parameter to connect() method](https://github.com/nousresearch/hermes-agent/pull/54547)
- [#54543 fix(desktop): hide Windows updater console handoffs](https://github.com/nousresearch/hermes-agent/pull/54543)
- [#54544 fix(telegram): override stop_typing to clear stuck typing indicator](https://github.com/nousresearch/hermes-agent/pull/54544)
- [#54554 fix(matrix): add MATRIX_ALLOWED_ROOMS_APPLY_TO_DMS for multi-profile room isolation](https://github.com/nousresearch/hermes-agent/pull/54554)
- [#54540 fix(cli): pass target_model to resolve_runtime_provider in _ensure_runtime_credentials](https://github.com/nousresearch/hermes-agent/pull/54540)

> 注：公开数据未列出今日已合并 PR 的具体标题，因此这里以“已进入修复推进中的关键 PR”替代。

---

## 4. 社区热点

今日没有出现“单条高评论/高反应”的爆款线程；**所有展示项评论数都很低（0–2）**，说明社区讨论呈现“广而分散、问题驱动”的特征。  
热点集中在以下几个主题：

### A. 桌面端启动与 Windows 弹窗/闪烁问题
- [#54375 Desktop startup should not eagerly run agent-browser --version on Windows](https://github.com/nousresearch/hermes-agent/issues/54375)
- [#54364 Desktop startup eagerly runs agent-browser --version on Windows](https://github.com/nousresearch/hermes-agent/issues/54364)
- [#54528 Windows 启动超时 + 黑框闪烁](https://github.com/nousresearch/hermes-agent/issues/54528)
- [#54506 Command prompt keep blinking at screen when desktop app is open](https://github.com/nousresearch/hermes-agent/issues/54506)

**背后诉求**：用户希望 Hermes Desktop 在 Windows 上做到“像原生桌面应用一样安静”，不要出现 cmd 窗口闪烁、启动超时弹窗或后台探测带来的视觉干扰。

### B. 会话/消息路由与隔离
- [#54527 Gateway message routing misdirects user input between TUI sessions](https://github.com/nousresearch/hermes-agent/issues/54527)
- [#54461 Matrix multi-profile rooms bypass allowed-room isolation when using one account](https://github.com/nousresearch/hermes-agent/issues/54461)
- [#54554 fix(matrix): add MATRIX_ALLOWED_ROOMS_APPLY_TO_DMS for multi-profile room isolation](https://github.com/nousresearch/hermes-agent/pull/54554)

**背后诉求**：多 profile、多会话并发时，用户需要强隔离和确定性路由，不能出现“消息发错会话/越权房间”的风险。

### C. 功能边界与桌面体验补齐
- [#54473 Desktop shipped as a new platform without closing the gap to the existing CLI/TUI reference experience](https://github.com/nousresearch/hermes-agent/issues/54473)
- [#54545 Settings unreachable during startup error](https://github.com/nousresearch/hermes-agent/issues/54545)
- [#54496 terminal expand Hermes Desktop](https://github.com/nousresearch/hermes-agent/issues/54496)

**背后诉求**：桌面端不仅要“能跑”，还要接近 CLI/TUI 的可解释性和可控性，例如能看见执行命令、能进入设置、能恢复故障状态。

---

## 5. Bug 与稳定性

按严重程度与影响面排序，今日主要问题如下：

### P1 / 高优先级
1. **预压缩导致已恢复会话卡死**
   - [#54465 Preflight context compression can wedge resumed sessions when auxiliary compression times out](https://github.com/nousresearch/hermes-agent/issues/54465)
   - 影响：会话恢复后可能因辅助压缩超时而永久不可用，属于明显的可用性阻断。
   - **是否已有 fix PR：未在本次列表中看到直接对应 PR**

### P2 / 中高优先级
2. **远程桌面/网络链路下 async 路由阻塞**
   - [#54523 Remote desktop over Tailscale: async routes block the asyncio loop 10-25s](https://github.com/nousresearch/hermes-agent/issues/54523)
   - 影响：远程连接不稳定，WS 可能被饿死，桌面体验严重下降。
   - **是否已有 fix PR：未看到明确对应 PR**

3. **会话消息错路由、输入丢失**
   - [#54527 Gateway message routing misdirects user input between TUI sessions](https://github.com/nousresearch/hermes-agent/issues/54527)
   - 影响：消息可能落到错误会话，属于数据正确性问题。
   - **是否已有 fix PR：相关修复思路可参考 [#54532](https://github.com/nousresearch/hermes-agent/pull/54532)（修复 resume 列表排除当前会话），但非完全同类问题**

4. **Windows 启动超时 / 黑框闪烁**
   - [#54528 Windows 启动超时 + 黑框闪烁](https://github.com/nousresearch/hermes-agent/issues/54528)
   - 影响：冷启动成功率与系统观感均受损。
   - **是否已有 fix PR：可关联 [#54543](https://github.com/nousresearch/hermes-agent/pull/54543)（隐藏 updater console handoffs）以及 [#54538](https://github.com/nousresearch/hermes-agent/pull/54538)（TERM 规范化），但未必完全覆盖**

5. **Matrix 多 profile 房间隔离失效**
   - [#54461 Matrix multi-profile rooms bypass allowed-room isolation when using one account](https://github.com/nousresearch/hermes-agent/issues/54461)
   - 影响：安全边界和消息隔离风险，优先级高。
   - **是否已有 fix PR：有，见 [#54554](https://github.com/nousresearch/hermes-agent/pull/54554)**

6. **QQBot connect() 参数不兼容**
   - [#54410 QQAdapter.connect() got an unexpected keyword argument 'is_reconnect'](https://github.com/nousresearch/hermes-agent/issues/54410)
   - 影响：网关平台无法正常连接。
   - **是否已有 fix PR：有，见 [#54547](https://github.com/nousresearch/hermes-agent/pull/54547)**

### P3 / 中低优先级
7. **Settings 无法在启动失败时进入**
   - [#54545 Settings unreachable during startup error](https://github.com/nousresearch/hermes-agent/issues/54545)
   - 影响：故障恢复路径被堵死，用户无法按提示操作。
   - **是否已有 fix PR：暂未看到**

8. **Ollama vision 模型图片被静默剥离**
   - [#54511 Ollama vision models silently strip image attachments](https://github.com/nousresearch/hermes-agent/issues/54511)
   - 影响：多模态能力实际失效，但错误不明显。
   - **是否已有 fix PR：暂未看到**

9. **search_files 忽略空目录**
   - [#54347 search_files tool skips empty directories](https://github.com/nousresearch/hermes-agent/issues/54347)
   - 影响：文件工具在空目录工作流下不可用。
   - **是否已有 fix PR：暂未看到**

10. **feishu topic group 消息校验失败**
   - [#54498 Feishu topic group messages fail with 99992402 field validation failed](https://github.com/nousresearch/hermes-agent/issues/54498)
   - 影响：特定平台消息发送失败。
   - **是否已有 fix PR：暂未看到**

---

## 6. 功能请求与路线图信号

今日新增的功能诉求明显偏向 **桌面端体验增强、配置开放性、工具链扩展、企业/协作平台接入**。  
从现有 PR 看，以下方向最有可能进入下一版本：

### 更可能纳入下一版本
- **配置页/Keys 页面增强**
  - [#54552 list & add arbitrary custom .env keys on the Keys page](https://github.com/nousresearch/hermes-agent/pull/54552)
  - [#54546 catalogue all memory-provider API keys in OPTIONAL_ENV_VARS](https://github.com/nousresearch/hermes-agent/pull/54546)
  - 说明：dashboard 配置可见性是强需求，且与 `hermes setup` 联动明显。

- **桌面端国际化与交互**
  - [#54542 improve Japanese (ja) locale coverage](https://github.com/nousresearch/hermes-agent/pull/54542)
  - [#54538 Normalize interactive TERM for TUI and dashboard PTY](https://github.com/nousresearch/hermes-agent/pull/54538)
  - 说明：这是“可用性”和“全球化”双线推进。

- **插件/启动性能**
  - [#54533 perf(startup): make plugin discovery lazy](https://github.com/nousresearch/hermes-agent/pull/54533)
  - 说明：与启动慢、命令行窗口闪烁、冷启动体验直接相关，落地价值高。

- **平台/工具接入扩展**
  - [#54535 feat(slack): add read-only Slack channel history tool](https://github.com/nousresearch/hermes-agent/pull/54535)
  - [#54534 feat: add Honcho compartment routing](https://github.com/nousresearch/hermes-agent/pull/54534)
  - [#54549 feat: support Gemini safety_settings in native adapter](https://github.com/nousresearch/hermes-agent/pull/54549)

### 需求信号较强但仍需验证
- [#54463 Add edge-based vertical packs for PM and analyst workflows](https://github.com/nousresearch/hermes-agent/issues/54463)
- [#54393 How to set fonts in the dashboard](https://github.com/nousresearch/hermes-agent/issues/54393)
- [#54352 Web dashboard: use browser-side microphone capture](https://github.com/nousresearch/hermes-agent/issues/54352)
- [#54464 kanban list should support --board and --all](https://github.com/nousresearch/hermes-agent/issues/54464)
- [#54487 Make DEAD manual credential pruning configurable and visible](https://github.com/nousresearch/hermes-agent/issues/54487)
- [#54548 configurable attribution string in config.yaml for agent identity](https://github.com/nousresearch/hermes-agent/issues/54548)

**判断**：如果这些需求继续积累评论并出现对应 PR，下一版本很可能继续向 **Dashboard/CLI 可配置性、企业接入、桌面体验补齐** 倾斜。

---

## 7. 用户反馈摘要

从今日 Issues 中能提炼出几类非常真实的用户痛点：

### 1) “我只想安静地用，不要弹窗/黑框/闪窗”
- [#54375](https://github.com/nousresearch/hermes-agent/issues/54375)
- [#54364](https://github.com/nousresearch/hermes-agent/issues/54364)
- [#54506](https://github.com/nousresearch/hermes-agent/issues/54506)
- [#54528](https://github.com/nousresearch/hermes-agent/issues/54528)

**反馈含义**：桌面端在 Windows 上的系统集成体验还不够“原生”，用户对启动过程中的命令窗口、闪烁、后台探测非常敏感。

### 2) “我需要可靠的会话隔离和路由，不要串台”
- [#54527](https://github.com/nousresearch/hermes-agent/issues/54527)
- [#54461](https://github.com/nousresearch/hermes-agent/issues/54461)

**反馈含义**：Hermes 已经进入多 profile / 多会话 / 多平台并发使用阶段，消息正确送达与权限隔离成为核心信任基础。

### 3) “桌面端要有足够的可解释性和恢复能力”
- [#54545](https://github.com/nousresearch/hermes-agent/issues/54545)
- [#54496](https://github.com/nousresearch/hermes-agent/issues/54496)
- [#54473](https://github.com/nousresearch/hermes-agent/issues/54473)

**反馈含义**：用户不仅关心结果，也关心“模型到底在做什么”“出错后如何恢复”。当前桌面端的故障恢复路径和可视化仍需加强。

### 4) “配置项与权限边界希望更透明”
- [#54489](https://github.com/nousresearch/hermes-agent/issues/54489)
- [#54487](https://github.com/nousresearch/hermes-agent/issues/54487)
- [#54548](https://github.com/nousresearch/hermes-agent/issues/54548)

**反馈含义**：高级用户越来越多，他们希望 Hermes 具备可审计、可配置、可精细控制的特性，而不是固定默认策略。

### 5) “多模态和工具链要真正可用”
- [#54511](https://github.com/nousresearch/hermes-agent/issues/54511)
- [#54447](https://github.com/nousresearch/hermes-agent/issues/54447)
- [#54347](https://github.com/nousresearch/hermes-agent/issues/54347)

**反馈含义**：用户已经在实际工作流中使用文件、视觉、终端工具，任何“静默失效”都会被迅速放大为体验问题。

---

## 8. 待处理积压

以下是今日快照中**尚未得到充分响应、且值得维护者优先关注**的开放项：

### 高优先级积压
- [#54465 P1: context compression wedge](https://github.com/nousresearch/hermes-agent/issues/54465)
- [#54523 Tailscale remote desktop async loop stall](https://github.com/nousresearch/hermes-agent/issues/54523)
- [#54527 session routing misdirects input](https://github.com/nousresearch/hermes-agent/issues/54527)
- [#54545 settings unreachable during startup error](https://github.com/nousresearch/hermes-agent/issues/54545)

### 中优先级积压
- [#54528 Windows startup timeout + black flash](https://github.com/nousresearch/hermes-agent/issues/54528)
- [#54511 Ollama vision images stripped](https://github.com/nousresearch/hermes-agent/issues/54511)
- [#54498 Feishu topic group validation failure](https://github.com/nousresearch/hermes-agent/issues/54498)
- [#54447 file tools use unsanitized host cwd](https://github.com/nousresearch/hermes-agent/issues/54447)
- [#54434 custom app icon for Desktop](https://github.com/nousresearch/hermes-agent/issues/54434)
- [#54393 dashboard font settings](https://github.com/nousresearch/hermes-agent/issues/54393)

### 仍待确认的修复闭环
- [#54461 Matrix room isolation](https://github.com/nousresearch/hermes-agent/issues/54461) → 对应修复 PR [#54554](https://github.com/nousresearch/hermes-agent/pull/54554)
- [#54410 QQBot connect signature bug](https://github.com/nousresearch/hermes-agent/issues/54410) → 对应修复 PR [#54547](https://github.com/nousresearch/hermes-agent/pull/54547)
- [#54326 resume list/session selection bug](https://github.com/nousresearch/hermes-agent/issues/54326) → 对应修复 PR [#54532](https://github.com/nousresearch/hermes-agent/pull/54532)

---

### 结论
Hermes Agent 今日的核心特征是：**活跃度极高、需求输入强、修复推进快，但桌面端稳定性与会话正确性仍是当前最需要压住的风险面**。  
如果接下来 1–2 天内这些高优先级修复 PR 继续合并，项目会明显向“可稳定日常使用”迈进一步；反之，Windows/多会话/远程桌面相关问题会继续成为用户感知最强的负面信号。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-06-29）

## 1. 今日速览
今天 NanoClaw 的外部反馈面较冷静：**Issues 24 小时内无新增或活跃**，说明用户侧没有出现明显集中报障或争议。与此同时，**PR 侧保持中等活跃度，共 5 条更新，4 条待合并、1 条已关闭**，开发工作主要集中在修复、兼容性增强和安全加固。整体来看，项目处于**“低问题噪音、持续修补和功能打磨”**的健康状态，更像是一次稳定推进的维护日。  
**项目健康度评估：中上**——没有版本发布压力，也没有公开 Issues 爆发，但待审 PR 偏多，维护者的代码评审负担仍然存在。  
GitHub：https://github.com/qwibitai/nanoclaw

---

## 2. 项目进展
今日最重要的推进来自 1 个已关闭 PR 和 4 个开放 PR，覆盖了安全、消息交互、认证恢复与多渠道渲染能力：

- **#2879 [CLOSED] fix(agent-to-agent): containment-check target inbox in forwardAttachedFiles (#2828)**  
  这是针对 **#2828** 的修复闭环之一，核心是防止 A2A 附件转发时通过符号链接逃逸到会话目录之外，避免越权写文件。虽然该 PR 已关闭，但它表明项目已经在对这类高风险文件路径问题进行系统性加固。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2879

- **#2880 [OPEN] fix(security): contain inbox symlink escapes in attachment writes (#2828)**  
  这是更完整的安全修复方案，覆盖**入站文件写入**和**附件转发**两个方向，目标是阻止恶意 agent 通过预置 symlink 触发主机任意文件写入。若合并，将显著提升 NanoClaw 在多租户/容器化场景下的安全边界。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2880

- **#2881 [OPEN] fix(discord): decode custom_id delimiter before parsing button actions**  
  修复 Discord 按钮 `custom_id` 解析问题，属于典型的**协议编码/解码一致性**修复。该问题会影响按钮动作路由，属于会直接破坏交互链路的功能性 bug。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2881

- **#2878 [OPEN] fix(codex): allow reconnect when OneCLI already has a stale OpenAI secret**  
  针对会话级认证失效的稳定性问题做修复，目标是让 Codex 在已有旧秘钥但 token 已失效时仍能正常重连，而不是在会话中途失败。这个修复对长对话和持续任务非常关键。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2878

- **#2877 [OPEN] [follows-guidelines] feat(telegram): native rich rendering via Bot API 10.1 sendRichMessage**  
  这是一个明确的功能增强方向：Telegram 原生富文本渲染。若合并，将改善多媒体/格式化消息在 Telegram 侧的呈现质量。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2877

**整体推进幅度判断：**  
今天没有新版本发布，但从 PR 结构看，项目在**安全边界、消息交互兼容性、认证恢复与渠道能力扩展**四个方向同步推进。  
如果把“已关闭 1 条 + 待审 4 条”视为一天的开发产出，那么今天属于**明显的修复/打磨型推进**，而不是发布型推进。  
仓库 PR 列表：https://github.com/qwibitai/nanoclaw/pulls

---

## 3. 社区热点
从当前数据看，**没有 Issues 活跃，也没有可见的评论数/点赞数热度**，因此今天没有形成明显的“社区讨论热点”。不过，按更新内容来看，关注度最可能集中在以下几个 PR：

1. **安全修复：#2880**  
   这是最敏感、最值得优先处理的主题，涉及 symlink escape 和任意写文件风险。此类问题往往会引发维护者、部署方和安全关注者的集中审阅。  
   链接：https://github.com/qwibitai/nanoclaw/pull/2880

2. **交互链路修复：#2881**  
   Discord 按钮动作解析失败会直接影响用户可见行为，属于“功能一旦出错就很明显”的问题，通常会受到集成使用者关注。  
   链接：https://github.com/qwibitai/nanoclaw/pull/2881

3. **认证恢复：#2878**  
   这类问题面向的是长任务/持续会话用户，直接影响“是否能不中断工作”，通常会得到重度用户的关注。  
   链接：https://github.com/qwibitai/nanoclaw/pull/2878

4. **Telegram 富渲染能力：#2877**  
   这是功能型需求，体现的是渠道体验升级，通常更容易获得使用 Telegram 入口的用户支持。  
   链接：https://github.com/qwibitai/nanoclaw/pull/2877

**背后诉求分析：**  
今天的“热点”不是争议，而是**生产可用性**：  
- 安全边界要足够硬，防止文件写入逃逸；  
- 交互解析要稳定，不能破坏按钮/动作路由；  
- 认证要能在会话中断后恢复；  
- 渠道消息要更贴近原生能力。  

Issues 页面今日无活动：  
https://github.com/qwibitai/nanoclaw/issues

---

## 4. Bug 与稳定性
按严重程度排序，今天可归纳为以下几类问题：

### 1) 高严重度：文件写入路径逃逸 / 安全漏洞
- **相关 PR：#2880（OPEN）、#2879（CLOSED）**
- 问题描述：附件写入或 A2A 转发时，可能跟随 symlink 跳出 session root，导致主机任意文件写入风险。
- 影响范围：涉及容器内 agent 对挂载目录的访问，属于**安全边界问题**，应优先处理。
- 是否已有 fix PR：**有**，#2880 正在修复，#2879 已关闭但属于同类修补闭环的一部分。  
链接：https://github.com/qwibitai/nanoclaw/pull/2880  
链接：https://github.com/qwibitai/nanoclaw/pull/2879

### 2) 中高严重度：Discord 按钮动作解析失败
- **相关 PR：#2881（OPEN）**
- 问题描述：`custom_id` 的 delimiter 解码时机不正确，导致解析结果带入编码后的字符串，按钮动作无法正确匹配。
- 影响范围：直接影响 Discord 侧交互可用性，属于用户可见回归。
- 是否已有 fix PR：**有**，#2881。  
链接：https://github.com/qwibitai/nanoclaw/pull/2881

### 3) 中等严重度：Codex 会话重连失败
- **相关 PR：#2878（OPEN）**
- 问题描述：当 OneCLI 中存在旧但无效的 OpenAI secret 时，当前逻辑误判为成功，导致后续会话中途失败。
- 影响范围：影响长会话和持续任务，属于稳定性/可恢复性问题。
- 是否已有 fix PR：**有**，#2878。  
链接：https://github.com/qwibitai/nanoclaw/pull/2878

### 4) 低到中等严重度：Telegram 富文本能力缺失
- **相关 PR：#2877（OPEN）**
- 问题描述：不是故障，而是能力补齐；如果不支持原生富渲染，会限制消息表现力。
- 影响范围：主要影响 Telegram 渠道体验，不属于紧急 bug。
- 是否已有 fix PR：**是功能 PR**。  
链接：https://github.com/qwibitai/nanoclaw/pull/2877

---

## 5. 功能请求与路线图信号
今天最明确的功能需求信号是：

- **#2877：Telegram 原生富渲染（Bot API 10.1 sendRichMessage）**  
  这是一个较清晰的路线图信号，说明项目正在补齐多渠道消息表达能力。若实现顺利，较可能进入下一版本或下一轮渠道能力迭代。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2877

此外，虽然以下两项更偏修复，但它们也反映出路线图优先级：
- **#2880：安全加固**——属于必须级优先事项，通常不会拖延到很后面的版本。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2880
- **#2878：认证恢复增强**——改善长会话体验，若维护者重视稳定性，较可能尽快合入。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2878

总体判断：**下一版本更可能优先包含“修复与稳定性改进”，而非大规模新功能**。  
GitHub PR 列表：https://github.com/qwibitai/nanoclaw/pulls

---

## 6. 用户反馈摘要
由于今日 **Issues 为 0、且未提供评论内容**，无法从 Issues 评论中直接提炼“真实用户留言”。但从 PR 主题可以较可靠地反推当前用户痛点与使用场景：

- **安全敏感型用户** 关注附件写入与目录隔离，说明 NanoClaw 可能运行在可承载不可信 agent 的环境中。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2880

- **Discord 集成用户** 依赖按钮与交互动作，任何 `custom_id` 解析异常都会被视为明显退化。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2881

- **长任务/连续会话用户** 需要凭证失效后可恢复，而不是“跑到一半突然断掉”。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2878

- **Telegram 使用者** 希望原生富文本表现而非仅基础文本输出，说明他们对消息展示质量有较高要求。  
  链接：https://github.com/qwibitai/nanoclaw/pull/2877

**总体满意/不满意点：**
- 满意点：项目仍在持续维护，且能快速暴露并修复高风险问题。  
- 不满意点：部分关键链路仍存在解析、认证与安全边界上的瑕疵，说明稳定性和兼容性仍是当前主要负担。  
Issues 页：https://github.com/qwibitai/nanoclaw/issues

---

## 7. 待处理积压
本次数据里**没有长期未响应的 Issues**，但存在一个现实的待办积压：**4 个仍处于 OPEN 的 PR**，它们都具备较高合并价值，建议维护者尽快排审：

1. **#2880** 安全修复，优先级最高  
   链接：https://github.com/qwibitai/nanoclaw/pull/2880

2. **#2881** Discord 交互解析修复  
   链接：https://github.com/qwibitai/nanoclaw/pull/2881

3. **#2878** Codex 认证恢复修复  
   链接：https://github.com/qwibitai/nanoclaw/pull/2878

4. **#2877** Telegram 富渲染功能  
   链接：https://github.com/qwibitai/nanoclaw/pull/2877

**维护建议：**
- 先审 **#2880**，因为它涉及安全边界；
- 再处理 **#2881 / #2878**，它们影响用户可见稳定性；
- 最后评估 **#2877**，作为功能增强按版本节奏合入。  
PR 总览：https://github.com/qwibitai/nanoclaw/pulls

---

如果你愿意，我也可以把这份日报进一步整理成**适合内部晨报的简版**，或者输出成**JSON/Markdown 模板**方便自动化发布。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-06-29）
仓库：**[nearai/ironclaw](https://github.com/nearai/ironclaw)**

## 1) 今日速览
今天 IronClaw 的节奏明显偏向**工程推进与稳定性加固**：过去 24 小时共有 **8 条 PR 更新**，但 **Issues 零新增、零活跃**，说明社区侧没有出现明显的公开故障噪音，维护重心仍在代码层面。  
当前没有新版本发布，项目处于“持续集成、持续修复、持续补测试”的状态，而不是面向用户的大版本交付。  
从 PR 规模看，今天的工作以 **XL/L 级别的 Reborn 相关改动** 为主，整体活跃度可评为**中高**，但讨论热度偏低。  
整体健康度判断：**开发推进积极，稳定性诉求强，外部反馈稀少。**

---

## 2) 版本发布
**今日无新版本发布。**

---

## 3) 项目进展
今天项目推进的重点，主要集中在以下几条线：

### A. Reborn 稳定性与错误恢复能力继续强化
- **[PR #5389](https://github.com/nearai/ironclaw/pull/5389)**：`feat(reborn): recoverable-error fixes — batch 1`
  - 目标是把“模型可修复”的能力错误暴露给模型侧，让代理能自我纠正，而不是直接失败退出。
- **[PR #5390](https://github.com/nearai/ironclaw/pull/5390)**：`feat(reborn): FailureLane classifier + two-bucket enforcement test`
  - 强化故障分类器与“两桶不变量”测试，偏向运行时可靠性治理。
- **[PR #5392](https://github.com/nearai/ironclaw/pull/5392)**：`feat(reborn): integration-test framework slices 3–9`
  - 扩大 Reborn 集成测试覆盖面，涉及 LibSql matrix、egress/HTTP matcher、MCP/OAuth/refresh 等关键路径。

### B. Web 与认证链路的可用性修复
- **[PR #5395](https://github.com/nearai/ironclaw/pull/5395)**：`Fix Web Access Exa content fetch`
  - 改进 Web Access 的内容获取逻辑，兼顾缓存 `response_id` 查询与直接 URL 抓取。
- **[PR #5388](https://github.com/nearai/ironclaw/pull/5388)**：`fix reborn google oauth decode and preview host login`
  - 这是今天关闭的关键修复之一，针对 Google SSO token 解码和预览域名登录流程问题。

### C. 能力策略与依赖维护
- **[PR #5394](https://github.com/nearai/ironclaw/pull/5394)**：`capability policy e2e`
  - 面向能力策略的端到端验证，直接对应公开问题 **[#5385](https://github.com/nearai/ironclaw/issues/5385)**。
- **[PR #5391](https://github.com/nearai/ironclaw/pull/5391)**：`build(deps): bump the everything-else group with 8 updates`
  - 依赖集中升级，属于典型的“降低技术债、保持生态兼容”的维护动作。
- **[PR #5393](https://github.com/nearai/ironclaw/pull/5393)**：`test: validate /benchmark build against current ironclaw main`
  - 已关闭的验证性 PR，说明 benchmark 构建链路也在被持续校验。

### 今日整体推进评价
从内容看，IronClaw 今天不是在“新增炫目功能”，而是在**把 Reborn、OAuth、Web Access、能力策略、测试基础设施**这些关键底座逐一补强。  
这类工作对项目长期健康非常重要，说明仓库当前仍处于**架构加固期**。  
从结果上看，今天至少有 **2 个 PR 结束处理**，同时还有 **6 个待合并/待审查 PR** 在排队，项目推进是实质性的。

---

## 4) 社区热点
今天公开讨论热度不高：  
- **Issues：0 条更新**
- **所有 PR 的评论数均未显示为有效增长，👍 也均为 0**

因此，严格意义上**没有形成“评论最多/反应最多”的社区热点**。  
但如果按“今日最值得关注的活跃点”来判断，焦点应是：

- **[PR #5392](https://github.com/nearai/ironclaw/pull/5392)**  
  这是今天唯一明确在 **2026-06-29** 有更新的 PR，且覆盖范围很大，涉及测试框架、外部边界模拟、认证刷新等多个核心链路。  
  背后的诉求很明确：**先把 Reborn 的关键运行路径测稳，再继续扩展能力。**

补充观察：
- **[PR #5394](https://github.com/nearai/ironclaw/pull/5394)** 直指 issue **[#5385](https://github.com/nearai/ironclaw/issues/5385)**，说明能力策略验证是当前真实需求点。
- **[PR #5395](https://github.com/nearai/ironclaw/pull/5395)** 和 **[PR #5388](https://github.com/nearai/ironclaw/pull/5388)** 则分别反映出用户对内容抓取和登录链路的稳定性要求。

---

## 5) Bug 与稳定性
今天**没有新增公开 Issues**，因此没有可直接归档的“新 Bug 报告 / 崩溃 / 回归 Issue”。  
但从 PR 目标可以看出，维护者正在集中处理以下稳定性问题：

### 高优先级：认证与登录链路
- **[PR #5388](https://github.com/nearai/ironclaw/pull/5388)**  
  - 问题：Google OAuth `id_token` 解码、preview host 登录跳转异常  
  - 严重度：**中-高**（影响登录可用性）  
  - 状态：**已有修复 PR，且该 PR 已关闭**

### 中优先级：内容抓取与 Web Access 行为
- **[PR #5395](https://github.com/nearai/ironclaw/pull/5395)**  
  - 问题：Web Access 的内容获取，直接 URL 抓取与缓存 `response_id` 逻辑需要更清晰  
  - 严重度：**中**（影响内容可达性与工具行为一致性）  
  - 状态：**已有修复 PR，当前 OPEN**

### 中优先级：代理运行时可恢复性
- **[PR #5389](https://github.com/nearai/ironclaw/pull/5389)**、**[PR #5390](https://github.com/nearai/ironclaw/pull/5390)**  
  - 问题：recoverable error、FailureLane 分类、两桶不变量  
  - 严重度：**中**（影响任务是否中途死亡、代理能否自愈）  
  - 状态：**已有修复 PR，当前 OPEN**

### 稳定性加固而非直接修 bug
- **[PR #5392](https://github.com/nearai/ironclaw/pull/5392)**  
  - 主要作用是扩大集成测试覆盖面，降低未来回归风险  
  - 严重度：**低（但战略价值高）**

结论：**今天没有公开故障爆发，但多个 PR 明确指向“登录、抓取、错误恢复、测试覆盖”四类核心稳定性问题。**

---

## 6) 功能请求与路线图信号
从今天的 PR 主题看，后续路线图信号非常清晰：

### 最可能进入下一阶段/下一版本的方向
1. **能力策略端到端验证**
   - **[PR #5394](https://github.com/nearai/ironclaw/pull/5394)**
   - 已经明确对齐 **[#5385](https://github.com/nearai/ironclaw/issues/5385)**，说明这是被社区或内部确认过的需求。

2. **Reborn 集成测试框架扩展**
   - **[PR #5392](https://github.com/nearai/ironclaw/pull/5392)**
   - 涉及 LibSql、HTTP matcher、MCP/OAuth/refresh，明显属于下一阶段基础设施补齐。

3. **错误恢复与分类机制**
   - **[PR #5389](https://github.com/nearai/ironclaw/pull/5389)**、**[PR #5390](https://github.com/nearai/ironclaw/pull/5390)**
   - 这类工作通常会被视作“代理产品成熟度”的关键里程碑。

4. **Web 内容抓取体验修正**
   - **[PR #5395](https://github.com/nearai/ironclaw/pull/5395)**
   - 如果该 PR 落地，直接改善工具在真实网页上的可用性。

### 路线图判断
IronClaw 当前更像是在把 **“能跑”** 提升到 **“可稳定跑、可恢复跑、可测试跑”**。  
因此下一版本如果发布，优先级大概率仍是：
- Reborn 稳定性
- OAuth / 登录链路
- Web Access / 内容获取
- 能力策略与测试框架

---

## 7) 用户反馈摘要
今天**没有 Issues 评论数据**，因此无法从公开讨论中提炼出明确的“真实用户评论原文”。  
不过，从 PR 目标可以反推出几类强烈的用户痛点：

- **登录不稳定**
  - 来自 **[PR #5388](https://github.com/nearai/ironclaw/pull/5388)**  
  - 用户在预览域名 / 自定义域名下可能遇到 OAuth 登录失败。

- **内容抓取行为不一致**
  - 来自 **[PR #5395](https://github.com/nearai/ironclaw/pull/5395)**  
  - 用户需要“直接 URL 可抓、缓存响应也可查”的明确行为。

- **任务运行中断过于敏感**
  - 来自 **[PR #5389](https://github.com/nearai/ironclaw/pull/5389)** 和 **[PR #5390](https://github.com/nearai/ironclaw/pull/5390)**  
  - 用户显然不希望模型可修复的小错误直接导致整次运行失败。

- **能力策略需要可验证、可回归**
  - 来自 **[PR #5394](https://github.com/nearai/ironclaw/pull/5394)**  
  - 说明用户/维护者对策略系统的正确性有明确要求。

整体来看，今天的“反馈”主要来自**工程改动所反映出的真实使用痛点**，而不是来自社区评论。

---

## 8) 待处理积压
今天没有明显的“长期未响应 Issue”，因为 **Issues 为空**，而且大多数 PR 都是近两天创建。  
不过，从维护优先级角度，以下条目值得重点关注：

### 优先级 1：大范围基础设施改动
- **[PR #5392](https://github.com/nearai/ironclaw/pull/5392)**  
  - 范围广、依赖多、风险中等，适合作为最高优先级审查项。

### 优先级 2：已明确对齐公开问题的功能项
- **[PR #5394](https://github.com/nearai/ironclaw/pull/5394)**  
  - 直接对应 **[#5385](https://github.com/nearai/ironclaw/issues/5385)**，建议尽快推进。

### 优先级 3：直接影响用户体验的修复
- **[PR #5395](https://github.com/nearai/ironclaw/pull/5395)**
- **[PR #5388](https://github.com/nearai/ironclaw/pull/5388)**  
  - 分别覆盖内容抓取和登录链路，属于用户可感知修复。

### 优先级 4：依赖与兼容性维护
- **[PR #5391](https://github.com/nearai/ironclaw/pull/5391)**
- **[PR #5393](https://github.com/nearai/ironclaw/pull/5393)**  
  - 偏维护性，但对 CI 和后续合入质量很关键。

### 总体提醒
当前没有“历史积压很久的沉默项”迹象，但 **6 个 OPEN PR 且评论为 0**，说明 review 队列可能在累积。  
建议维护者优先清理：
1. **#5392**
2. **#5394**
3. **#5395**
4. **#5390 / #5389**
5. **#5391**

---

## 结论
IronClaw 今天的状态可以概括为：**无公开事故、无新版本，但工程推进明显且集中在底座稳定性上**。  
如果接下来这些 PR 顺利合入，项目会在 **Reborn 稳定性、认证可用性、内容抓取、能力策略验证** 四个关键维度继续前进。  
从健康度看，仓库目前表现为：**活跃、克制、偏重可靠性建设**。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-06-29）

## 1. 今日速览
过去 24 小时内，LobsterAI 仅新增/活跃了 **1 条 Issue**，没有 PR 更新，也没有新版本发布，整体活跃度偏低。  
从仓库动态看，今天的变化主要集中在 **Memory Search 配置与索引重建** 的可用性问题上，而非功能迭代。  
这意味着项目在该时间窗口内 **没有代码层面的推进**，但用户侧的产品稳定性诉求比较明确。  
当前健康度判断：**社区反馈存在，但开发推进节奏较静态**。  
链接：[LobsterAI Issues](https://github.com/netease-youdao/LobsterAI/issues) | [LobsterAI PRs](https://github.com/netease-youdao/LobsterAI/pulls)

---

## 2. 版本发布
**今日无新版本发布。**  
最新 Releases 为空，说明过去 24 小时没有可见的版本交付、破坏性变更公告或迁移说明。  
链接：[LobsterAI Releases](https://github.com/netease-youdao/LobsterAI/releases)

---

## 3. 项目进展
**今日无 PR 合并或关闭。**  
因此在这个统计周期内，项目没有通过代码合并推进新功能、修复或重构，也没有可量化的版本前进。  
从交付角度看，今天的“项目进展”基本为 **0**：没有新增能力、没有 bug fix 落地、也没有发布节奏。  
链接：[LobsterAI Pull Requests](https://github.com/netease-youdao/LobsterAI/pulls)

---

## 4. 社区热点
### 目前最活跃的讨论：#2216
- **Issue #2216**：[Memory Search 无法切换为 local embedding provider，索引重建被 DB 锁阻塞 (EBUSY)](https://github.com/netease-youdao/LobsterAI/issues/2216)
- 状态：OPEN
- 评论数：1
- 👍：0

**讨论焦点：**
1. **Memory Search 的 embedding provider 在 UI 中被锁死为 OpenAI**，用户无法切换到本地或其他 provider。  
2. **当 OpenAI API 配额耗尽（429）时，记忆搜索会完全不可用**，这使得该功能存在明显的单点依赖。  
3. **索引重建被数据库锁阻塞，出现 EBUSY**，进一步放大了恢复过程中的可用性问题。

**背后诉求：**
- 用户希望 Memory Search 具备 **可切换 provider 的配置自由度**；
- 希望在 OpenAI 不可用时，系统能 **自动降级到本地 embedding** 或其他可用方案；
- 希望索引重建流程对数据库锁更鲁棒，避免 EBUSY 导致恢复失败。

链接：[Issue #2216](https://github.com/netease-youdao/LobsterAI/issues/2216)

---

## 5. Bug 与稳定性
### 高严重度
**#2216 - Memory Search provider 被锁定为 OpenAI，且索引重建受 DB 锁阻塞**
- 链接：[Issue #2216](https://github.com/netease-youdao/LobsterAI/issues/2216)
- 严重性判断：**高**
- 影响范围：Memory Search 核心能力
- 现象：
  - 设置界面无法切换 embedding provider；
  - OpenAI 配额耗尽后，Memory Search 直接不可用；
  - 重建索引时遭遇数据库锁，报错 EBUSY。
- 是否已有 fix PR：**未看到**

**稳定性结论：**
- 这是一个兼具 **功能可用性 + 容灾能力 + 数据库操作鲁棒性** 的问题；
- 如果确认为默认配置限制而非单纯 UI Bug，它会直接影响生产可用性；
- 当前无 PR 对应，说明问题仍处于待排查/待修复阶段。

链接：[Issue #2216](https://github.com/netease-youdao/LobsterAI/issues/2216)

---

## 6. 功能请求与路线图信号
### 从 #2216 观察到的功能需求
1. **支持切换 Memory Search 的 embedding provider**
   - 用户明确希望从 OpenAI 切换为 **local embedding provider** 或其他 provider。
   - 这说明项目在“AI 能力供应商可替换性”上仍有增强空间。

2. **增强 OpenAI 失效时的降级能力**
   - 用户场景非常明确：OpenAI 429 后，核心功能不能直接失效。
   - 这类需求通常会推动后续版本加入 **fallback 机制** 或 **多 provider 容灾策略**。

3. **改善索引重建过程中的锁冲突处理**
   - DB 锁阻塞导致 EBUSY，说明重建流程可能需要更好的并发控制或重试策略。
   - 如果后续有相关 PR，优先级大概率会高于纯 UI 优化。

**路线图信号判断：**
- 如果维护者近期要排期，**“provider 可配置 + 本地 embedding 支持”** 可能是最有可能被纳入下一步修复/增强的方向；
- 前提是该问题被确认不只是本地环境配置，而是通用设计缺陷。  
链接：[Issue #2216](https://github.com/netease-youdao/LobsterAI/issues/2216)

---

## 7. 用户反馈摘要
从 #2216 的描述可以提炼出以下真实用户痛点：

- **不满意点 1：配置受限**
  - 用户无法在设置中切换 embedding provider，感觉产品“被 OpenAI 绑定”。
- **不满意点 2：可靠性不足**
  - 一旦 OpenAI 额度耗尽，Memory Search 直接失效，影响核心使用链路。
- **不满意点 3：恢复流程脆弱**
  - 索引重建被数据库锁卡住，用户会感到“修复都修不回来”。
- **隐含需求：本地化与自托管**
  - 用户提到 local embedding provider，说明他们希望系统更适合离线、成本可控或企业内网环境。

**使用场景判断：**
- 该用户很可能在较重度使用 Memory Search；
- 同时对成本、可用性和供应商依赖敏感；
- 这类反馈通常来自接近生产使用的真实场景，而不是简单试用。

链接：[Issue #2216](https://github.com/netease-youdao/LobsterAI/issues/2216)

---

## 8. 待处理积压
### 当前可见的待处理重要项
- **#2216 - Memory Search provider 切换受限，索引重建 EBUSY**
  - 状态：OPEN
  - 风险：中高
  - 原因：直接影响 Memory Search 可用性，并暴露出 provider 绑定与重建流程鲁棒性问题。
  - 是否长期未响应：**否**，该 Issue 为 2026-06-28 创建，尚属新近问题，但已经值得尽快跟进。

**积压观察：**
- 在当前数据中，**没有看到更长期未响应的高优先级 Issue 或 PR**；
- 但由于今天没有 PR 流入，说明问题更多停留在用户侧反馈，尚未进入修复闭环。

链接：[Issue #2216](https://github.com/netease-youdao/LobsterAI/issues/2216)

---

## 总体判断
LobsterAI 在 2026-06-29 的项目状态可以概括为：**开发端静默、反馈端活跃、稳定性问题集中在核心 AI 能力配置与恢复流程**。  
如果后续没有配套修复，Memory Search 的 provider 锁定问题可能会演变为用户持续性痛点，尤其是在 OpenAI 额度波动或外部服务不稳定时。  

链接：[LobsterAI 仓库主页](https://github.com/netease-youdao/LobsterAI)

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-06-29）

## 1) 今日速览
过去 24 小时，Moltis 的仓库整体处于**低变动、轻度活跃**状态：没有新的 Issues 进入，也没有 Issues 关闭，说明社区侧的故障反馈与需求输入较少。  
PR 侧有 **2 条新增/持续活跃的开放 PR**，但尚未合并，意味着代码层面仍在推进中、处于审查与等待合并阶段。  
本日没有新版本发布，因此当前没有面向用户的正式交付更新。  
综合来看，项目健康度偏稳，但**外部互动不高、发布节奏偏静**，今日更多体现为“维护性推进”而非“功能性爆发”。

---

## 2) 版本发布
**今日无新版本发布。**

- 发布页：<https://github.com/moltis-org/moltis/releases>

---

## 3) 项目进展
今日没有已合并或关闭的重要 PR，但有 2 个开放 PR 显示出当前开发重点，分别集中在**构建依赖收敛**与**多模态输入稳定性**：

### PR #1139：fix(gateway): don't force-enable matrix-sdk via the metrics feature
- 链接：<https://github.com/moltis-org/moltis/pull/1139>
- 影响方向：修正 `gateway` 的 `metrics` feature 误触发 `moltis-matrix` 的可选依赖，避免在不启用 Matrix 通道时仍将 `matrix-sdk` 拉入构建。
- 项目意义：这类修复通常有助于**降低编译体积、减少依赖污染、改善构建速度与模块解耦**。如果合并，能提升部署灵活性，尤其适合只使用部分能力的集成场景。

### PR #1138：fix(agents): downscale oversized images before they enter model context
- 链接：<https://github.com/moltis-org/moltis/pull/1138>
- 影响方向：在图片进入模型上下文前进行缩放，避免超大图片（如高分辨率手机照片）直接占满上下文预算。
- 项目意义：这是一个典型的**稳定性与可用性增强**修复，能显著降低因图片过大导致的上下文溢出、请求拒绝或推理失败风险，对 Agent 交互体验提升直接且明显。

**整体推进判断：**  
虽然今天没有合并落地，但这两条 PR 分别对应**基础设施依赖优化**和**核心多模态链路稳定性**，说明项目仍在向“更轻量、更稳健、更易用”的方向演进。  
当前推进更多停留在 **review / merge pending** 阶段，尚未形成新的对外发布。

---

## 4) 社区热点
今天没有 Issues 活跃，也没有评论数据，因此**社区讨论热度较低**。  
从可见活动来看，最活跃的对象就是两条开放 PR：

- PR #1139：<https://github.com/moltis-org/moltis/pull/1139>
- PR #1138：<https://github.com/moltis-org/moltis/pull/1138>

### 热点分析
- **PR #1139** 背后的诉求更偏向于“**依赖最小化**”：用户或维护者希望启用 metrics 不应连带拉起整个 Matrix 相关链路，这通常意味着项目在多模块组合方面有进一步解耦需求。
- **PR #1138** 背后的诉求更偏向于“**大输入容错与上下文管理**”：说明在真实使用中，图片作为模型输入时的体积控制已成为体验瓶颈之一。

由于没有 Issue 评论，当前热点更多体现在**代码层的修复方向**，而不是用户公开讨论。

---

## 5) Bug 与稳定性
今日没有新 Issues，因此**没有新增公开 Bug 报告、崩溃报告或回归问题**记录。  
不过，现有两条 PR 本身都指向稳定性问题，可按潜在影响排序如下：

### 高优先级：图片超大导致上下文溢出
- PR #1138：<https://github.com/moltis-org/moltis/pull/1138>
- 问题性质：多模态输入稳定性 / 运行时失败风险
- 影响：高分辨率图片可能直接挤爆上下文预算，导致请求失败或体验中断
- 是否已有 fix PR：**已有**

### 中优先级：metrics feature 误引入 matrix-sdk
- PR #1139：<https://github.com/moltis-org/moltis/pull/1139>
- 问题性质：构建依赖污染 / 模块边界错误
- 影响：可能增加构建成本、扩大依赖树、影响非 Matrix 场景部署
- 是否已有 fix PR：**已有**

**稳定性判断：**  
目前仓库没有公开 Bug 激增迹象，问题主要集中在**边界条件优化**而非系统性故障，整体稳定性看起来仍然可控。

---

## 6) 功能请求与路线图信号
今天没有新增 Issues，因此**没有公开的新功能请求**可直接归纳。  
但从开放 PR 可以提炼出两个较清晰的路线图信号：

### 信号 1：更细粒度的模块化与依赖隔离
- 来源：PR #1139  
- 链接：<https://github.com/moltis-org/moltis/pull/1139>
- 含义：项目正在朝着“可按需启用能力”的方向优化。  
- 可能纳入下一版本的概率：**较高**，因为这是构建与部署层面的基础性改进。

### 信号 2：更强的多模态输入预处理能力
- 来源：PR #1138  
- 链接：<https://github.com/moltis-org/moltis/pull/1138>
- 含义：项目开始关注真实用户输入下的极端情况，尤其是图片大小控制和上下文预算管理。  
- 可能纳入下一版本的概率：**较高**，因为它直接影响 Agent 可用性与失败率。

**路线图判断：**  
如果这两条 PR 顺利合并，下一阶段版本大概率会强调：  
1) 更轻量的构建与部署；  
2) 更稳健的图像/多模态输入处理。

---

## 7) 用户反馈摘要
由于今天**没有 Issues 评论记录**，暂时无法从公开讨论中提炼具体用户痛点、满意点或不满点。  
不过从 PR 所解决的问题可间接推测出真实使用场景：

- **用户可能在使用高分辨率图片作为 Agent 输入**，并遇到模型上下文溢出或请求失败；
- **用户可能在非 Matrix 场景下启用 metrics 功能**，却不希望引入完整 Matrix SDK 依赖；
- 这说明 Moltis 的使用者可能同时重视：
  - 多模态交互能力
  - 部署灵活性
  - 依赖控制与性能

当前没有公开评论，因此这些判断应视为**基于代码变更方向的推断**，而非直接用户反馈。

---

## 8) 待处理积压
从当前数据看，没有长期未响应的 Issues，因为**Issues 总数为 0（活跃/关闭都为 0）**。  
但有 2 个开放 PR 需要维护者关注，它们可视为当前的“轻量积压”：

### 待处理 PR #1139
- 链接：<https://github.com/moltis-org/moltis/pull/1139>
- 关注点：依赖修正是否会影响现有 metrics 行为，需确认兼容性与 feature gating 是否符合预期。

### 待处理 PR #1138
- 链接：<https://github.com/moltis-org/moltis/pull/1138>
- 关注点：图片缩放策略是否会影响模型效果、视觉理解精度以及不同后端的输入格式兼容性。

**积压风险评估：低到中等**  
因为两条 PR 都是“修复型”而非大规模重构型，风险主要在于合并前的验证与回归测试；若 review 周期过长，可能会拖延用户侧体验修复上线。

---

## 总体结论
Moltis 今天没有体现出高频社区讨论或发布活跃度，但开发侧仍在推进两个很有价值的修复方向：**依赖解耦**与**多模态稳定性增强**。  
从项目健康度看，当前属于**低噪音、稳推进**状态；从产品演进看，下一步如果能完成这两条 PR 的合并并尽快发布，将对项目的可维护性和真实场景可用性产生正向影响。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-06-29）

## 1. 今日速览
今日项目处于“**需求集中浮现、代码推进偏慢**”的状态：过去 24 小时有 **4 条 Issues** 持续活跃、**1 条 PR** 处于待合并，但 **没有新版本发布**，也没有已合并/关闭的关键 PR。  
从议题类型看，社区关注点分布在 **稳定性/可用性（日志刷屏、安装错误）** 与 **产品能力增强（技能选择体验、记忆检索精排、钉钉 @mention）** 两条线上。  
整体活跃度不低，但当前更多是“**用户在提需求和报问题**”，而不是“**代码已快速落地**”，因此项目健康度表现为：**需求活跃、交付节奏一般、待验证能力较多**。  
参考：Issues 主页（https://github.com/agentscope-ai/QwenPaw/issues）、PR 主页（https://github.com/agentscope-ai/QwenPaw/pulls）

---

## 2. 版本发布
**今日无新版本发布。**  
Releases 页面：<https://github.com/agentscope-ai/QwenPaw/releases>

---

## 3. 项目进展
今日没有已合并/关闭的 PR，因此**代码层面的净推进为 0**；项目进展主要来自一条新开放的功能 PR：

- **PR #5590：feat(channels): support dingtalk mentions in proactive sends**  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/5590>  
  该 PR 为主动消息发送链路补充了 **钉钉 @mention** 能力，覆盖 `/messages/send`、`qwenpaw channels send` 和定时文本投递场景。  
  这意味着项目在“**渠道消息分发**”方向继续增强，属于比较明确的生产可用性升级。

**整体判断：**  
今天项目的“前进”主要体现在**功能边界扩展**，而非稳定性修复或版本交付；如果该 PR 尽快合并，将对消息渠道能力形成实质补强。  

---

## 4. 社区热点
今天没有出现高评论、高点赞的“爆款”讨论，**4 条 Issues 均为 1 条评论、0 个 👍**，说明热点分散，但诉求都比较明确。

- **#5591 [question] 日志刷屏问题：重复打印 GET /api/console/inbox/events**
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5591>  
  该 issue 反映用户在 UOS 终端中遭遇大量重复日志输出，数量高达数万条，明显影响可用性与排障体验。  
  背后诉求不是单纯“安静日志”，而是**运行时噪音控制、终端友好性和运维可观测性**。

- **#5589 [enhancement] 输入框连续添加多个 skills 的交互优化**
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5589>  
  用户希望在输入 `/` 调起技能列表后，可以**连续选择多个技能**而无需反复重新输入 `/`。  
  这类诉求说明用户已进入较高频的实际使用阶段，开始关注**输入效率与交互流畅度**。

- **#5588 [Feature Request] 记忆搜索支持专用 Reranker**
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5588>  
  该需求指向**两阶段检索**：先向量召回，再用 reranker 精排，以提升 memory_search 在记忆增长后的准确率。  
  这反映出用户对“**检索质量**”的要求正在提升，说明项目已被用于更长期、更复杂的记忆场景。

- **#5587 [bug] Qwen-Image Tool install error**
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5587>  
  安装错误通常意味着**功能入口受阻**，属于比交互问题更高优先级的落地障碍。

---

## 5. Bug 与稳定性
按影响程度排序，今日主要稳定性问题如下：

1. **#5587 Qwen-Image Tool install error**  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/5587>  
   - 严重度：**高**  
   - 影响：工具安装失败会直接阻断功能使用，属于典型的“落地阻塞”问题。  
   - 是否已有 fix PR：**未见关联修复 PR**

2. **#5591 重复打印 API 请求日志，终端刷屏**
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/5591>  
   - 严重度：**中高**  
   - 影响：不一定导致业务失败，但会严重干扰终端使用、日志检索和日常运维。  
   - 是否已有 fix PR：**未见关联修复 PR**

**补充判断：**  
今日未见崩溃、数据丢失或安全回归类报告；当前稳定性问题更多集中在**安装链路**和**日志噪音**两类工程体验问题上。

---

## 6. 功能请求与路线图信号
今日功能诉求比较明确，且与现有 PR 方向高度相关：

- **#5590 钉钉 proactive send 支持 @mention**
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/5590>  
  这是最接近“下一版本可交付”的能力增强，建议优先推进合并。  
  由于它已经进入 PR 阶段，**纳入下一版本的概率最高**。

- **#5589 输入框支持连续添加多个 skills**
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5589>  
  属于高频交互优化，改动范围可能集中在前端输入组件，**实现成本相对可控**，有机会成为下一轮体验型改进。

- **#5588 记忆检索支持 reranker 两阶段检索**
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5588>  
  这是更偏架构与效果导向的需求，若项目后续重点放在“长期记忆质量”，它是非常明确的路线图信号。  
  但由于涉及检索链路重构，**更可能进入中期规划**，而非立即落地。

**路线图判断：**  
短期看，#5590 和 #5589 属于“**快速增强体验与渠道能力**”的候选；#5588 则更像“**提升智能体效果上限**”的中期方向。

---

## 7. 用户反馈摘要
从今日 Issues 的描述可以提炼出几类真实用户痛点：

- **运维/使用噪音痛点**：  
  用户对重复日志非常敏感，说明他们已经在真实环境中使用，并且日志量足以影响终端体验。  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5591>

- **交互效率痛点**：  
  `/` 调出技能菜单后还要重复输入，降低了多技能组合效率，用户期待更顺滑的输入流程。  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5589>

- **效果质量痛点**：  
  用户对 memory_search 的召回准确率提出了更高要求，说明项目已从“能用”走向“要更准”。  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5588>

- **安装/部署痛点**：  
  Qwen-Image Tool 安装错误表明用户在扩展工具链时遇到阻塞，这类问题对首次体验和功能推广影响很大。  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5587>

**总体上，用户反馈呈现出“真实场景化使用”的特征**：他们不仅在提需求，也在暴露部署、交互、检索效果、渠道发送等多个层面的实际摩擦。

---

## 8. 待处理积压
根据当前数据，**没有明显的长期未响应积压项**：所有 Issues 和 PR 都是 2026-06-28 至 2026-06-29 新近产生，尚不属于“沉默过久”的 backlog。

不过，按优先级建议维护者尽快关注以下两项，避免演变为更大的积压：

- **#5587 安装错误**：属于功能阻塞型问题，优先级应高于一般体验优化  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5587>

- **#5590 钉钉 @mention PR**：已进入合并流程，若拖延会影响渠道能力发布节奏  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/5590>

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发群的简版摘要**，或  
2. **适合管理层看的表格版日报**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下为 **ZeroClaw（zeroclaw-labs/zeroclaw）2026-06-29 项目动态日报**。  
说明：本日报基于你提供的近 24 小时快照；PR 列表仅展示评论数较高的前 20 条，因此已合并/关闭的全部 PR 未完全展开。

## 1. 今日速览
过去 24 小时内，ZeroClaw 维持了**高活跃度**：Issues 更新 8 条、PR 更新 41 条，且没有新版本发布，说明当前处于**高频开发、低发布节奏**阶段。  
今日的信号很清晰：一方面，社区持续围绕 **Telegram / Matrix 消息体验、文件保护、SOP 触发源** 提需求；另一方面，维护侧则在补 **稳定性、性能、兼容性和测试覆盖**。  
从项目健康度看，当前不是“版本交付日”，而更像是一个**集中打基础、收敛边界、打磨集成体验**的日子。  
总体判断：**项目健康度良好，开发推进积极，但积压 PR 体量较大，需要关注评审吞吐。**

---

## 2. 项目进展
### 今日确认关闭/完成的关键项
- **[PR #8446: fix(telegram): stay silent for unauthorized senders in group chats](https://github.com/zeroclaw-labs/zeroclaw/pull/8446)**  
  这是今天最明确的用户可见修复之一：未授权发送者在 Telegram 群组/超级群中不再触发绑定提示，避免了**群聊打扰、命令泄露**和社交场景污染，属于明显的体验与安全修复。

### 今日仍在推进、但影响面较大的 PR
- **[PR #8461: feat(sop): add filesystem SOP event source](https://github.com/zeroclaw-labs/zeroclaw/pull/8461)**  
  把文件系统变更接入 SOP 事件源，意味着 ZeroClaw 正在从“消息/网络驱动”扩展到“文件事件驱动”，对自动化场景很关键。
- **[PR #8460: perf(channels): bound orchestrator notify channel + cap path/url body](https://github.com/zeroclaw-labs/zeroclaw/pull/8460)**  
  针对潜在 OOM 向量做边界控制，属于典型的稳定性加固。
- **[PR #8439: perf(log): move JSONL fsync off the async hot path](https://github.com/zeroclaw-labs/zeroclaw/pull/8439)**  
  日志持久化从 async 热路径拆出，优化性能和尾延迟。
- **[PR #8443: feat(matrix): add single-message streaming drafts](https://github.com/zeroclaw-labs/zeroclaw/pull/8443)**  
  面向 Matrix 的流式体验升级，减少碎片化输出。
- **[PR #8441: fix(compatible): add tool name to native tool-result messages](https://github.com/zeroclaw-labs/zeroclaw/pull/8441)** / **[PR #8455: fix(providers): include native tool result names](https://github.com/zeroclaw-labs/zeroclaw/pull/8455)**  
  继续补齐兼容 provider 的工具消息字段，提升与外部模型/网关的兼容性。

### 今日整体向前迈进多少
可以概括为：**1 个高影响用户修复落地 + 多条稳定性/兼容性/体验改进进入推进阶段**。  
项目当前的主线已经从“单点功能扩张”转向“**跨通道体验一致性、可靠性边界、协议兼容性**”三条并行推进。

---

## 3. 社区热点
今日讨论最活跃的 Issues 基本都只到 **1 条评论**，没有高反应量议题，说明社区讨论仍偏“需求提交/方案确认”而非激烈争论。

### 热点 1：Telegram 多消息与富消息能力
- **[Issue #8445: Telegram channel multi-message mode](https://github.com/zeroclaw-labs/zeroclaw/issues/8445)**  
- **[Issue #8415: Implement Telegram Bot API 10.1 Rich Messages](https://github.com/zeroclaw-labs/zeroclaw/issues/8415)**  
用户明显在追求：  
1) 更自然的逐轮消息输出；  
2) 更强的格式呈现能力（表格、富文本、原生消息兼容）。  
这反映出 Telegram 是高频入口，用户对“像人类对话一样”的输出体验非常敏感。

### 热点 2：工作区文件保护与安全边界
- **[Issue #8424: RFC: .ignore File Mechanism for Workspace File Protection](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)**  
这类需求说明用户已经开始把 ZeroClaw 放进真实工作区与敏感项目目录里使用，因此“AI 能看什么、不能看什么”成为刚需。

### 热点 3：Matrix / 文件系统 / SOP 事件源
- **[Issue #8442: Matrix single-message streaming drafts](https://github.com/zeroclaw-labs/zeroclaw/issues/8442)**  
- **[Issue #8413: channel-filesystem SOP event source](https://github.com/zeroclaw-labs/zeroclaw/issues/8413)**  
对应的诉求是：  
- Matrix 需要更可编辑、更整洁的流式稿；  
- 文件系统事件希望直接触发 SOP。  
这说明 ZeroClaw 正在向“**多通道统一自动化平台**”演进。

---

## 4. Bug 与稳定性
### 高严重度
- **[PR #8446: fix(telegram): stay silent for unauthorized senders in group chats](https://github.com/zeroclaw-labs/zeroclaw/pull/8446)**  
  这是已关闭的修复项，但其覆盖的是**群聊隐私泄露/误触发绑定提示**问题，严重性较高。  
  - 状态：**已有修复，且已关闭**
  - 风险点：共享群组中暴露绑定命令、打扰非目标用户

### 中高严重度
- **[Issue #8432: bug(ci): package publish tokens fail late when push access is missing](https://github.com/zeroclaw-labs/zeroclaw/issues/8432)**  
  这是一个 CI/发布链路问题：token 能读但不能 push 时，发布流程会**过晚失败**，浪费构建时间并增加发布不确定性。  
  - 状态：**已关闭**
  - 是否已有 fix PR：**本次数据未展示对应修复 PR**

### 预防性稳定性加固
- **[PR #8460: perf(channels): bound orchestrator notify channel + cap path/url body](https://github.com/zeroclaw-labs/zeroclaw/pull/8460)**  
  这是针对潜在 OOM 的边界修复，属于“防事故”而非事故后修复。
- **[PR #8439: perf(log): move JSONL fsync off the async hot path](https://github.com/zeroclaw-labs/zeroclaw/pull/8439)**  
  主要改善性能与抖动，间接增强稳定性。

---

## 5. 功能请求与路线图信号
结合今日 Issues 与 PR，下一阶段最可能被纳入路线图的方向有：

### 高概率方向 1：Telegram 体验增强
- **[Issue #8445](https://github.com/zeroclaw-labs/zeroclaw/issues/8445)**
- **[Issue #8415](https://github.com/zeroclaw-labs/zeroclaw/issues/8415)**
- **[PR #8440: feat(telegram): add per-channel inbound debounce](https://github.com/zeroclaw-labs/zeroclaw/pull/8440)**  
这组需求与 PR 表明 Telegram 仍是重点通道，下一版本大概率会继续围绕：
- 多消息模式
- 富消息/格式兼容
- 通道级 debounce
- 群聊行为更精细的控制

### 高概率方向 2：Matrix 交互形态升级
- **[Issue #8442](https://github.com/zeroclaw-labs/zeroclaw/issues/8442)**
- **[PR #8443](https://github.com/zeroclaw-labs/zeroclaw/pull/8443)**  
说明 Matrix 正在从“能发消息”走向“适合长链路流式协作”。

### 中高概率方向 3：工作区与 SOP 自动化扩展
- **[Issue #8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)**
- **[Issue #8413](https://github.com/zeroclaw-labs/zeroclaw/issues/8413)**
- **[PR #8461](https://github.com/zeroclaw-labs/zeroclaw/pull/8461)**  
一个偏安全治理，一个偏自动化触发。两者都属于中长期架构能力，值得进入路线图讨论。

### 兼容性方向
- **[PR #8441](https://github.com/zeroclaw-labs/zeroclaw/pull/8441)**
- **[PR #8455](https://github.com/zeroclaw-labs/zeroclaw/pull/8455)**  
说明兼容 provider 的 native tool calling 仍在补洞，短期内很可能继续扩展。

---

## 6. 用户反馈摘要
从今日 Issues 的评论内容与标题看，用户真实痛点主要集中在以下几个场景：

1. **聊天输出太“挤”**  
   - **[Issue #8445](https://github.com/zeroclaw-labs/zeroclaw/issues/8445)**  
   用户不想把所有 agent turn 拼成一坨，希望“一轮一条消息”，更符合 Telegram 的交互习惯。

2. **复杂内容在 Telegram 里显示不友好**  
   - **[Issue #8415](https://github.com/zeroclaw-labs/zeroclaw/issues/8415)**  
   用户在处理表格、Markdown、结构化信息时，希望更原生、更稳定的富消息支持。

3. **工作区安全边界不够细**  
   - **[Issue #8424](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)**  
   用户已经把 AI 助手带入真实项目目录，开始担心配置、凭据、项目设置被误读或外泄。

4. **希望自动化能从文件变化直接触发**  
   - **[Issue #8413](https://github.com/zeroclaw-labs/zeroclaw/issues/8413)**  
   反映出用户把 ZeroClaw 当作本地自动化引擎，而不只是聊天机器人。

整体来看，用户并不是在抱怨“功能不够多”，而是在要求：**更贴近真实工作流、更安全、更少噪音、更好读**。

---

## 7. 待处理积压
> 说明：当前快照里没有明显“长期沉默很多天”的老问题，但有几类**高优先级开放项**值得维护者尽快定调。

### 优先级较高的待处理项
- **[Issue #8424: .ignore File Mechanism for Workspace File Protection](https://github.com/zeroclaw-labs/zeroclaw/issues/8424)**  
  RFC 类议题，涉及架构和安全边界，且标有 `needs-author-action`，需要尽快推动方案收敛。
- **[Issue #8413: channel-filesystem SOP event source](https://github.com/zeroclaw-labs/zeroclaw/issues/8413)**  
  已标记 `accepted`，说明方向基本认可，建议尽快落地细化实现。
- **[Issue #8415: Telegram Bot API 10.1 Rich Messages](https://github.com/zeroclaw-labs/zeroclaw/issues/8415)**  
  用户需求明确，且与现有 Telegram 改进 PR 形成联动，适合尽快评审。
- **[Issue #8445: Telegram channel multi-message mode](https://github.com/zeroclaw-labs/zeroclaw/issues/8445)**  
  与现实使用体验强相关，容易形成高感知收益。
- **[Issue #8442: Matrix single-message streaming drafts](https://github.com/zeroclaw-labs/zeroclaw/issues/8442)**  
  与对应 PR 已形成闭环雏形，建议优先跟进。
- **[PR #8460: bound orchestrator notify channel + cap path/url body](https://github.com/zeroclaw-labs/zeroclaw/pull/8460)**  
  属于稳定性关键 PR，建议优先审查，避免资源风险在后续放大。
- **[PR #8439: move JSONL fsync off the async hot path](https://github.com/zeroclaw-labs/zeroclaw/pull/8439)**  
  属于性能/稳定性基础设施优化，适合与 #8460 一并推进。

---

### 总体结论
ZeroClaw 今日呈现出非常典型的“**需求活跃、实现加速、基础设施加固并行**”状态。  
社区最关心的是 **Telegram/Matrix 交互体验、文件保护、安全边界和自动化触发**；维护侧则在补齐 **兼容性、性能、OOM 风险、日志路径**。  
如果这种节奏持续下去，下一阶段很可能会形成一个以**多通道体验统一化 + 工作区安全治理 + SOP 自动化扩展**为核心的小版本窗口。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*