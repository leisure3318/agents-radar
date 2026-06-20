# OpenClaw 生态日报 2026-06-20

> Issues: 5 | PRs: 30 | 覆盖项目: 13 个 | 生成时间: 2026-06-20 03:54 UTC

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

以下为 **OpenClaw（openclaw/openclaw）2026-06-20 项目动态日报**。  
整体来看，今天属于**高活跃、以稳定性修复为主**的一天：24 小时内有 **5 个新/活跃 Issue**、**30 个 PR 更新**，其中 **5 个 PR 已关闭/合并**，但**没有新版本发布**。从议题分布看，焦点集中在 **会话状态、模型路由/提供商兼容性、Claude Code 协议兼容、TUI 展示正确性** 等核心链路，说明项目仍处于快速迭代和修补边界兼容问题的阶段。总体健康度偏稳，但“可用性/兼容性”类问题占比高，值得维护者优先盯紧。

---

## 1) 今日速览
- 过去 24 小时内，OpenClaw 维持了较高的开发活跃度：**5 个 Issue 更新、30 个 PR 更新**，说明社区提交与维护响应都在持续进行。  
- **没有新 Release**，意味着今天的产出主要集中在修复、兼容和文档补齐，而不是面向外部用户的版本交付。  
- 新增问题几乎都指向**状态一致性、模型标识规范化、工具调用协议兼容**等“容易影响生产可用性”的区域，属于典型的高优先级稳定性压力。  
- 同时，今天已有 **5 个 PR 关闭/合并**，表明维护链路仍在推进，但当前更多是在“补洞”而不是“扩功能”。  
- 结论：**项目活跃度高，健康度中上，但当前风险集中在兼容性与会话状态正确性。**

---

## 2) 版本发布
- **今日无新版本发布**。

---

## 3) 项目进展
今天关闭/合并的 PR 主要体现为两类推进：**协议/运行时正确性修复**与**文档/脚手架补齐**。

### 关键已关闭 PR
1. **#95210** - fix(agents): persist modelOverride/providerOverride in subagent spawn session patch  
   链接：<https://github.com/openclaw/openclaw/pull/95210>  
   影响：修复子代理 spawn 时模型路由字段未持久化的问题，属于**会话/路由状态正确性**修复，对多模型、子代理场景很关键。

2. **#95203** - fix(scripts): guard reused testbox keys  
   链接：<https://github.com/openclaw/openclaw/pull/95203>  
   影响：增强测试盒复用时的安全性与可预测性，偏**基础设施稳定性**。

3. **#95206** - fix(#95186): docs: subagent_ended hook fields (incl. targetSessionKey identity) aren't documented  
   链接：<https://github.com/openclaw/openclaw/pull/95206>  
   影响：补全插件 hook 文档，降低扩展开发者接入成本。

4. **#95197** - docs(plugins): document subagent_ended hook payload fields  
   链接：<https://github.com/openclaw/openclaw/pull/95197>  
   影响：同样是补齐 subagent_ended 的文档说明，反映出插件生态相关需求正在被关注。

5. **#95192** - docs(hooks): document subagent_ended hook event fields (fixes #95186)  
   链接：<https://github.com/openclaw/openclaw/pull/95192>  
   影响：继续完善 hook 事件字段文档，提升可维护性与 API 可理解性。

### 进展判断
- 今天的关闭 PR 里，**最有实质性产品价值的是 #95210**，它直接修复了代理路由状态在会话层面的丢失问题。  
- 其余关闭项更多是**开发者体验和文档一致性**优化。  
- 结合 30 个 PR 更新看，项目当前的前进方向不是“大功能上新”，而是把**多代理、多提供商、多协议**交叉场景里的边界问题逐步收敛。

---

## 4) 社区热点
今天最活跃的讨论几乎都围绕**高优先级 Bug**展开，且多数 Issue 都是“**1～2 条评论、快速聚焦、强烈问题导向**”的状态，说明社区更倾向于直接报障而非长讨论。

### 热点 Issue / PR
1. **#94908** - `/v1/responses` does not retain conversation context when using the same user value  
   链接：<https://github.com/openclaw/openclaw/issues/94908>  
   评论：2，👍：1  
   诉求分析：用户期望接口在稳定 `user` 值下保留会话上下文，但实际表现不符合文档预期。这类反馈通常来自**将 OpenClaw 当 API 网关/会话层使用的集成方**，对生产场景影响较大。

2. **#95204** - TUI drops all assistant messages from view past ~175k tokens  
   链接：<https://github.com/openclaw/openclaw/issues/95204>  
   评论：1，👍：1  
   诉求分析：长上下文会话中，**终端 UI 视图丢失 assistant 消息**，但磁盘转录仍完整。说明用户痛点主要在**可视化/交互体验**，不是数据丢失本身。

3. **#95198** - OpenRouter model prefix duplicated when using short model IDs  
   链接：<https://github.com/openclaw/openclaw/issues/95198>  
   评论：1，👍：1  
   诉求分析：涉及 OpenRouter 模型命名规范化错误，直接导致 API 请求异常。此类问题对**多供应商模型接入**用户影响非常直接。

4. **#95171** - canUseTool returns deprecated {behavior:"allow"} shape; Claude Code 2.1.156 rejects with ZodError  
   链接：<https://github.com/openclaw/openclaw/issues/95171>  
   评论：1，👍：1  
   诉求分析：Claude Code 升级后权限回包 schema 收紧，旧协议导致工具调用失败。反映出用户希望 OpenClaw 能**及时跟随上游协议变化**。

5. **#95186** - docs: subagent_ended hook fields aren't documented  
   链接：<https://github.com/openclaw/openclaw/issues/95186>  
   评论：1，👍：1  
   诉求分析：插件开发者需要更完整的 hook 载荷字段说明，说明 OpenClaw 已开始被用于**二次开发/集成场景**。

### 热点结论
- 热点集中在**“能不能稳定跑起来”**而不是“想要什么新功能”。  
- 说明当前社区最关心的是：**会话是否保真、协议是否兼容、跨供应商模型是否能正确映射、TUI 是否能可靠展示**。

---

## 5) Bug 与稳定性
按严重程度排序如下：

### P1：TUI 长上下文后丢失 assistant 消息
- Issue：**#95204**  
  链接：<https://github.com/openclaw/openclaw/issues/95204>  
  现象：上下文超过约 175k tokens 并发生 compaction 后，TUI 只显示 user 消息，assistant 消息在界面上消失。  
  影响：**严重可用性问题**，虽然 transcript 仍在磁盘，但交互视图失真会直接影响调试和审阅。  
  对应 fix PR：**未在今日 PR 中看到明确修复**。  
  相关 PR：<https://github.com/openclaw/openclaw/pull/95211>（TUI markdown 渲染相关修复，可能与展示链路有关，但不是同一问题的明确闭环）

### P1：OpenRouter 短模型 ID 前缀重复
- Issue：**#95198**  
  链接：<https://github.com/openclaw/openclaw/issues/95198>  
  现象：`openrouter/deepseek-v4-flash` 被错误变成 `openrouter/openrouter/deepseek-v4-flash`。  
  影响：**直接导致请求失败**，属于提供商兼容性回归。  
  对应 fix PR：**#95214**  
  链接：<https://github.com/openclaw/openclaw/pull/95214>  
  相关 fix PR：**#95208**  
  链接：<https://github.com/openclaw/openclaw/pull/95208>  
  结论：该问题已有明确修复方向，优先级高，且可能影响 cron 任务和配置命令。

### P1：Claude Code 2.1.156 工具调用 schema 不兼容
- Issue：**#95171**  
  链接：<https://github.com/openclaw/openclaw/issues/95171>  
  现象：`canUseTool` 返回旧版 `{behavior:"allow"}`，被新版 Claude Code 拒绝并抛出 `ZodError`。  
  影响：**工具审批/权限链路断裂**，会直接阻断工具调用。  
  对应 fix PR：**#95172**  
  链接：<https://github.com/openclaw/openclaw/pull/95172>  
  相关 fix PR：**#95174**  
  链接：<https://github.com/openclaw/openclaw/pull/95174>  
  结论：这是今天最明确、最紧急的一类兼容性 bug 之一。

### P2：/v1/responses 不保留 conversation context
- Issue：**#94908**  
  链接：<https://github.com/openclaw/openclaw/issues/94908>  
  现象：在相同 `user` 值下，接口未按预期保留上下文。  
  影响：**会话状态错误**，可能影响 API 使用者对“同一用户会话”的依赖。  
  对应 fix PR：**今日未见明确修复 PR**。  

### P2：subagent 相关状态/文档缺口
- Issue：**#95186**  
  链接：<https://github.com/openclaw/openclaw/issues/95186>  
  现象：`subagent_ended` hook 字段未文档化。  
  影响：主要是扩展开发成本和误用风险，不是运行时崩溃类问题。  
  对应 fix PR：**#95192 / #95197 / #95206**  
  链接：<https://github.com/openclaw/openclaw/pull/95192>  
  链接：<https://github.com/openclaw/openclaw/pull/95197>  
  链接：<https://github.com/openclaw/openclaw/pull/95206>  

### P2：长上下文 TUI 渲染 bug（无数据丢失）
- Issue：**#95204**  
  链接：<https://github.com/openclaw/openclaw/issues/95204>  
  影响：用户仍能生成和保存，但屏幕展示错误。  
  对应 fix PR：**未见明确闭环**。  

---

## 6) 功能请求与路线图信号
今天虽然没有明显“全新功能”型 Issue，但从 PR 和问题聚类可以读出下一阶段的路线图信号：

### 可能纳入下一版本的方向
1. **CLI 体验增强**
   - **#95053** - image generate 增加 `--file` 输入  
     链接：<https://github.com/openclaw/openclaw/pull/95053>  
   - **#95215** - workboard list 默认过滤 archived cards  
     链接：<https://github.com/openclaw/openclaw/pull/95215>  
    संकेत：用户希望 CLI 行为更贴近 API 默认值，减少“看起来像功能、其实是过滤规则”的不一致。

2. **会话语义统一**
   - **#95182** - sessions 命名迁移到 canonical title  
     链接：<https://github.com/openclaw/openclaw/pull/95182>  
   संकेत：项目在向更统一的会话元数据模型演进，未来版本大概率会继续整理 label/title/session key 语义。

3. **多供应商模型映射/规范化**
   - **#95208**  
     链接：<https://github.com/openclaw/openclaw/pull/95208>  
   - **#95214**  
     链接：<https://github.com/openclaw/openclaw/pull/95214>  
   संकेत：OpenRouter 这类 provider 的 short model ID 兼容问题，说明路线图上“模型名规范化”很可能会被继续加强。

4. **跨平台/运行时元信息准确性**
   - **#95189** / **#95170** / **#95216**  
     链接：<https://github.com/openclaw/openclaw/pull/95189>  
     链接：<https://github.com/openclaw/openclaw/pull/95170>  
     链接：<https://github.com/openclaw/openclaw/pull/95216>  
   संकेत：macOS 26 的产品版本映射问题，说明项目正在补齐系统环境探测的边界场景。

### 路线图判断
- 如果这些 PR 继续推进，下一版很可能不是大版本功能扩张，而是：
  - **更稳的模型/供应商兼容**
  - **更一致的 session 语义**
  - **更可靠的工具调用协议**
  - **更少的 TUI/CLI 认知偏差**

---

## 7) 用户反馈摘要
从 Issue 描述可以提炼出几类真实痛点：

### 1. “我按文档用了，但会话状态没按预期保留”
- 代表 Issue：**#94908**  
  链接：<https://github.com/openclaw/openclaw/issues/94908>  
- 场景：用户将 OpenClaw 作为 `/v1/responses` API 的会话层使用，并依赖稳定 `user` 值维持上下文。  
- 反馈要点：用户对“**文档承诺的会话持久性**”很敏感，一旦不一致就会直接影响生产集成。

### 2. “长会话没坏，但界面看起来坏了”
- 代表 Issue：**#95204**  
  链接：<https://github.com/openclaw/openclaw/issues/95204>  
- 场景：重度使用 TUI、长上下文 compaction、长时间交互。  
- 反馈要点：用户能接受复杂场景，但不能接受**看板/终端视图丢展示**，尤其在审阅助手输出时。

### 3. “provider/model 名字必须非常精确”
- 代表 Issue：**#95198**  
  链接：<https://github.com/openclaw/openclaw/issues/95198>  
- 场景：OpenRouter 等多提供商接入，用户习惯使用短模型 ID。  
- 反馈要点：一旦规范化逻辑不稳定，就会造成**静默失败**或 API 400，用户体感很差。

### 4. “上游协议一升级，我这边就断了”
- 代表 Issue：**#95171**  
  链接：<https://github.com/openclaw/openclaw/issues/95171>  
- 场景：Claude Code 权限/工具审批链路。  
- 反馈要点：用户期待 OpenClaw 对上游版本升级有更快适配，尤其是协议 schema 的变化。

### 5. “做插件/扩展时，我需要更完整的文档”
- 代表 Issue：**#95186**  
  链接：<https://github.com/openclaw/openclaw/issues/95186>  
- 场景：插件作者、SDK 开发者、hook 事件消费方。  
- 反馈要点：生态用户已经开始把 OpenClaw 当平台用，**文档完备性**开始直接影响采用率。

---

## 8) 待处理积压
严格来说，这批数据里**没有明显“长期陈旧”的积压项**；但从优先级和是否已有修复 PR 来看，下面几项应作为维护者的短期重点：

### 高优先级未闭环 Issue
1. **#95204** - TUI assistant messages rendering bug  
   链接：<https://github.com/openclaw/openclaw/issues/95204>  
   状态判断：P1、影响大，**未见明确对应 fix PR**。

2. **#94908** - /v1/responses conversation context retention  
   链接：<https://github.com/openclaw/openclaw/issues/94908>  
   状态判断：会话状态类问题，**尚未看到闭环 PR**。

### 已有修复 PR、但仍需关注合入质量的项
3. **#95171** - Claude Code 2.1.156 兼容问题  
   链接：<https://github.com/openclaw/openclaw/issues/95171>  
   对应 PR：<https://github.com/openclaw/openclaw/pull/95172>、<https://github.com/openclaw/openclaw/pull/95174>  
   关注点：确认 `updatedInput` 方案是否完全覆盖所有权限分支。

4. **#95198** - OpenRouter short model ID 兼容问题  
   链接：<https://github.com/openclaw/openclaw/issues/95198>  
   对应 PR：<https://github.com/openclaw/openclaw/pull/95208>、<https://github.com/openclaw/openclaw/pull/95214>  
   关注点：确认短模型 ID、命名空间 slug、cron 任务与 `openclaw config set` 的边界都已覆盖。

### 还在等待作者/维护者处理的 PR
5. **#95189** - fix(runtime-prompt): use macOS product version on Darwin  
   链接：<https://github.com/openclaw/openclaw/pull/95189>  
   状态：`等待作者`  
   关注点：这类跨平台元信息修复通常影响面广，建议尽快补齐。

6. **#95196** / **#95169** / **#95188**  
   链接：<https://github.com/openclaw/openclaw/pull/95196>  
   链接：<https://github.com/openclaw/openclaw/pull/95169>  
   链接：<https://github.com/openclaw/openclaw/pull/95188>  
   状态：`ready for maintainer look`  
   关注点：属于 SDK/审批流接口契约修正，适合维护者集中 review。

---

### 总体判断
今天 OpenClaw 的动态很清晰：**不是功能爆发日，而是兼容性与正确性修复密集日**。  
对项目健康度来说，这是好信号——说明社区正在积极暴露边界问题，维护端也在快速收敛。  
但从风险角度看，**P1 级别的问题主要集中在会话视图、模型映射、上游协议兼容**，这些如果不尽快闭环，会直接影响用户对“稳定可用”的判断。

如果你愿意，我可以把这份日报进一步整理成：
1. **适合发群里的简短版**，或  
2. **带趋势统计表格的管理层版**。

---

## 横向生态对比

# 2026-06-20 个人 AI 助手 / 自主智能体开源生态横向对比报告

## 1) 生态全景
今天的生态呈现出明显的 **“高活跃、低发版、以稳定性和兼容性修复为主”** 特征：5 个项目有活跃动态，但没有任何项目发布新 Release。  
整体议题集中在 **会话状态、模型/提供商兼容、工具协议适配、安全边界、TUI/CLI 可用性**，说明生态正从“能跑”进入“可集成、可审计、可回归”的工程化阶段。  
头部项目的竞争焦点不再是单纯功能堆叠，而是围绕 **上下文保真、协议跟随、跨供应商抽象、桌面/终端一致性** 展开。  
从成熟度看，生态已经进入 **快速迭代后的质量巩固期**，但仍保留较强的边界问题暴露和修补节奏。

---

## 2) 各项目活跃度对比

> 说明：以下统计为 **过去 24 小时新增/活跃** 情况；Release 均为今日是否有新版本发布。

| 项目 | Issues 数 | PR 数 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **Hermes Agent** | 12 | 38 | 无新版本 | **高活跃，但安全/会话风险需优先消化** |
| **OpenClaw** | 5 | 30 | 无新版本 | **高活跃，中上健康度，兼容性修复密集** |
| **ZeroClaw** | 1 | 7 | 无新版本 | **活跃度高，处于质量巩固阶段** |
| **NanoBot** | 2 | 1 | 无新版本 | **中等偏高，偏性能与策略增强** |
| **TinyClaw** | 1 | 0 | 无新版本 | **低活跃，但存在高风险安全问题** |
| PicoClaw | 0 | 0 | 无新版本 | 静默观察 |
| NanoClaw | 0 | 0 | 无新版本 | 静默观察 |
| NullClaw | 0 | 0 | 无新版本 | 静默观察 |
| IronClaw | 0 | 0 | 无新版本 | 静默观察 |
| LobsterAI | 0 | 0 | 无新版本 | 静默观察 |
| Moltis | 0 | 0 | 无新版本 | 静默观察 |
| CoPaw | 0 | 0 | 无新版本 | 静默观察 |
| ZeptoClaw | 0 | 0 | 无新版本 | 静默观察 |

**活跃项目合计：5/13**  
**今日新 Release：0/13**

---

## 3) OpenClaw 在生态中的定位

### 优势
- **问题覆盖面最“核心”**：OpenClaw 的热区集中在 **会话状态、模型路由/提供商兼容、Claude Code 协议兼容、TUI 展示正确性、hook/插件文档**，这类问题直接影响可用性和平台属性。
- **平台中枢感强**：它既不是单纯的桌面助手，也不是单纯的 API 封装，而是更像 **agent runtime / 兼容层 / 生态中枢**。
- **修复链路清晰**：今天已有多条关键修复 PR 闭环，尤其是 **子代理 session patch 持久化** 这类问题，说明维护节奏和工程响应都较强。

### 与同类的技术路线差异
- **相比 Hermes Agent**：OpenClaw 更偏 **核心 runtime 和协议兼容层**，Hermes 更偏 **桌面端、Gateway、插件系统、多端体验整合**。
- **相比 NanoBot**：OpenClaw 更关注 **系统正确性和跨 provider 兼容**；NanoBot 更关注 **推理强度策略与 token 估算性能**。
- **相比 ZeroClaw**：OpenClaw 是“运行时与协议层”的问题密集区；ZeroClaw 更像 **安装/测试/稳定性工程** 驱动的项目。
- **相比 TinyClaw**：OpenClaw 显然更成熟，TinyClaw 当前更像 **单点安全事件暴露** 的轻量项目。

### 社区规模对比
- 从 **Issue/PR 活跃量** 看，OpenClaw 处于 **第一梯队**，但 **Hermes Agent 的讨论面更宽、PR 更新更多**，因此在“表层热度”上 Hermes 略强。
- OpenClaw 的特点不是绝对量最大，而是 **“高价值核心问题占比高”**：社区更多在修补底层契约，而不是讨论边缘功能。
- 结论：OpenClaw 是生态中的 **兼容性与会话语义中枢型项目**，社区规模大、技术密度高，属于“基础设施型头部仓库”。

---

## 4) 共同关注的技术方向

### 1. 会话状态与上下文保真
- **涉及项目**：OpenClaw、Hermes Agent、ZeroClaw  
- **具体诉求**：
  - OpenClaw：`/v1/responses` 会话上下文保留、subagent session patch 持久化
  - Hermes：CLI/TUI 会话索引与恢复可见
  - ZeroClaw：session ID 透传给 skill shell tools
- **共同趋势**：会话正在从“临时上下文”升级为 **一等公民状态对象**。

### 2. 模型 / Provider 路由与命名规范化
- **涉及项目**：OpenClaw、Hermes Agent、NanoBot  
- **具体诉求**：
  - OpenClaw：OpenRouter 短模型 ID 前缀重复、provider/modelOverride 持久化
  - Hermes：切换 provider 后残留旧凭证、模型/API key 污染
  - NanoBot：多模型场景下推理强度自适应
- **共同趋势**：多供应商时代，**模型名规范化和路由隔离** 已成为关键基础设施。

### 3. 工具调用协议与权限边界
- **涉及项目**：OpenClaw、Hermes Agent、TinyClaw  
- **具体诉求**：
  - OpenClaw：Claude Code `canUseTool` schema 兼容
  - Hermes：tool policy bypass、浏览器 CDP 未鉴权
  - TinyClaw：`prompt_file` 未认证更新导致本地文件读取
- **共同趋势**：Agent 项目的安全焦点正从“防注入”扩展到 **工具权限、接口鉴权和最小授权**。

### 4. 长上下文与可视化/交互正确性
- **涉及项目**：OpenClaw、Hermes Agent  
- **具体诉求**：
  - OpenClaw：长上下文后 TUI 丢失 assistant 消息
  - Hermes：桌面端 / CLI / TUI 一致性、会话展示与恢复
- **共同趋势**：长上下文已成为常态，UI/终端必须处理 **压缩、截断、回放一致性**。

### 5. 性能优化与缓存
- **涉及项目**：NanoBot、OpenClaw、ZeroClaw  
- **具体诉求**：
  - NanoBot：工具定义 JSON / token 估算重复编码
  - OpenClaw：长会话视图性能与显示稳定性
  - ZeroClaw：测试 flake 消除、runtime 行为锁定
- **共同趋势**：高频路径的 **缓存、去重、行为锁定** 是下一阶段的重要工程能力。

### 6. 开发者生态与插件文档
- **涉及项目**：OpenClaw、Hermes Agent  
- **具体诉求**：
  - OpenClaw：subagent_ended hook 字段文档补齐
  - Hermes：dashboard plugins、桌面端插件契约
- **共同趋势**：这些项目都在从“单体助手”走向 **可扩展平台**。

---

## 5) 差异化定位分析

### OpenClaw
- **功能侧重**：会话正确性、协议兼容、provider 路由、TUI 正确性、hook/plugin 生态
- **目标用户**：高级开发者、集成方、需要多 provider/多 agent 协同的用户
- **架构特征**：偏 **核心 runtime / 兼容层 / 平台中枢**

### Hermes Agent
- **功能侧重**：桌面端、CLI/TUI、一体化体验、插件、Gateway、视觉工具、权限与安全
- **目标用户**：桌面用户、全链路自动化用户、需要多通道接入的团队
- **架构特征**：偏 **多端产品化 + 适配器平台**

### NanoBot
- **功能侧重**：reasoning effort 策略、token 估算性能
- **目标用户**：重视推理效率和成本控制的 agent 使用者
- **架构特征**：偏 **策略层 + 性能优化型中间件**

### ZeroClaw
- **功能侧重**：安装体验、runtime 稳定性、测试覆盖、session 上下文透传
- **目标用户**：希望快速部署和稳定使用的工程用户
- **架构特征**：偏 **工程化质量建设**

### TinyClaw
- **功能侧重**：基础能力较少，当前被安全议题主导
- **目标用户**：轻量部署或实验性使用者
- **架构特征**：偏 **小体量、风险单点暴露**

### 无活动项目
- PicoClaw、NanoClaw、NullClaw、IronClaw、LobsterAI、Moltis、CoPaw、ZeptoClaw：今日无活动，当前更适合视为 **观察态或低频维护态**。

---

## 6) 社区热度与成熟度

### 第一梯队：快速迭代中
- **Hermes Agent**：12 issues / 38 PR，议题面最广，兼顾功能、兼容、安全和桌面体验。
- **OpenClaw**：5 issues / 30 PR，虽然 issue 数少于 Hermes，但核心问题密度高，属于 **高强度修复期**。
- **ZeroClaw**：7 PR、1 issue，典型的 **质量工程驱动型迭代**。

### 第二梯队：定向优化中
- **NanoBot**：2 issues / 1 PR，问题聚焦在性能和推理策略，更像 **局部增强阶段**。
- **TinyClaw**：1 issue / 0 PR，表面安静，但安全风险突出，属于 **低活跃高风险**。

### 静默/观察态
- PicoClaw、NanoClaw、NullClaw、IronClaw、LobsterAI、Moltis、CoPaw、ZeptoClaw：今日无动态，暂时无法判断是否处于成熟维护期或低活跃停滞期。

### 成熟度判断
- **最接近“平台化成熟”**：OpenClaw、Hermes Agent
- **最接近“工程质量巩固”**：ZeroClaw
- **最接近“功能策略打磨”**：NanoBot
- **最需警惕“单点安全风险”**：TinyClaw

---

## 7) 值得关注的趋势信号

### 1. “会话”正在变成核心基础设施
不再只是聊天记录，而是 **可恢复、可索引、可跨子代理传递** 的状态单元。  
**参考价值**：智能体框架应把 session 设计为一等对象，而不是附属日志。

### 2. 多 provider / 多模型时代，路由与命名规范化是硬需求
OpenClaw、Hermes 都暴露出 provider 切换、模型命名、旧字段污染的问题。  
**参考价值**：需要统一的 **model canonicalization、provider isolation、配置分层**。

### 3. 工具权限与协议兼容是生产可用性的门槛
Claude Code 协议变化、memory 工具绕过、浏览器 CDP 未鉴权，都说明 agent 的风险点已经从“提示词”转向 **工具执行面**。  
**参考价值**：必须内建 **最小权限、schema 校验、外部工具隔离**。

### 4. 长上下文不只是模型问题，也是 UI/状态问题
OpenClaw 的 TUI 丢消息、Hermes 的会话索引问题表明：上下文压缩后的 **展示一致性** 也是产品体验的关键。  
**参考价值**：需要把 **transcript、view state、storage state** 分离设计。

### 5. 性能优化开始集中到高频路径缓存
NanoBot 的 token 估算缓存、ZeroClaw 的测试 flake 消除都说明，生态正在从“功能实现”转向 **高频路径去重和稳定性工程**。  
**参考价值**：agent runtime 应优先优化 **序列化、token 估算、工具定义缓存、重复路由计算**。

### 6. 桌面端与 CLI/TUI 正在走向同一套能力契约
Hermes 的桌面插件、OpenClaw 的 TUI 修复、ZeroClaw 的安装和 runtime 能力，都表明用户期待跨终端一致体验。  
**参考价值**：未来的 agent 产品很可能需要 **统一核心逻辑，多端适配壳层**。

### 7. 安全事件在小项目中更“致命”
TinyClaw 说明：即使活跃度不高，只要出现未认证文件读取类问题，就会快速放大风险。  
**参考价值**：轻量项目也必须建立 **鉴权、路径白名单、审计日志** 的最低安全基线。

---

## 简要结论
- 生态整体处于 **高活跃、无发布、以稳定性和兼容性收敛为主** 的阶段。  
- **OpenClaw** 是其中最典型的 **核心 runtime / 兼容层型项目**，技术价值高，社区关注集中。  
- **Hermes Agent** 的热度最高，覆盖面最广，但安全和会话一致性压力也最大。  
- **ZeroClaw** 更像工程质量样板，**NanoBot** 更像策略和性能优化点，**TinyClaw** 则提示了安全底线的重要性。  

如果你愿意，我可以继续把这份报告压缩成一页纸的 **决策摘要版**，或者整理成 **带优先级矩阵的管理层简报版**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-06-20）

## 1) 今日速览
过去 24 小时，NanoBot 共产生 **2 条活跃 Issue、1 条活跃 PR**，且 **无新版本发布、无已合并/关闭变更**。  
今天的讨论重心非常明确：一是 **推理强度（reasoning effort）的自动升级策略**，二是 **工具定义在 token 估算中的重复编码性能问题**。  
从活跃度看，项目属于 **中等偏高、以需求驱动为主**：社区仍在持续提出可落地的功能与性能优化建议，说明项目在真实使用场景中保持较强关注度。  
从健康度看，当前没有崩溃或回归类紧急信号，但性能优化诉求较集中，后续若能快速合并相关 PR，将明显改善用户体验。  

---

## 2) 项目进展
今日 **没有已合并或关闭的 PR**，因此代码层面的“已落地进展”为 **0**。  
不过，新的 PR 已经把一个高频性能问题转化为可执行方案：

- **PR #4421**：`perf(utils): cache tool-definition JSON in estimate_prompt_tokens`  
  链接：<https://github.com/HKUDS/nanobot/pull/4421>

这条 PR 针对 `estimate_prompt_tokens` 中重复对工具定义进行 `json.dumps` + `tiktoken encode` 的开销，提出缓存序列化后的工具定义 JSON，以减少每轮 agent turn 的重复计算。  
这意味着项目在“性能瓶颈识别 → 解决方案提交”上已经迈出一步，但由于尚未合并，**实际进展仍停留在方案确认阶段**。  

---

## 3) 社区热点
今日最活跃的话题主要集中在以下三处：

### 3.1 自动推理强度升级机制
- **Issue #4419**：Feature: Automatic reasoning effort escalation (default + escalated levels)  
  链接：<https://github.com/HKUDS/nanobot/issues/4419>

该 Issue 是今天讨论度最高的条目，已有 **1 条评论**。用户希望 NanoBot 能根据任务复杂度自动提升 reasoning effort，而不是仅依赖固定配置。  
背后诉求很清晰：  
- 降低用户手动调参成本  
- 让低成本默认推理与高复杂度任务之间形成自适应切换  
- 更适配多供应商推理模型的差异化能力

### 3.2 token 估算性能优化
- **Issue #4420**：[enhancement] 性能优化：`estimate_prompt_tokens` 每轮迭代对工具定义做冗余 tiktoken 编码  
  链接：<https://github.com/HKUDS/nanobot/issues/4420>

该 Issue 反映的是实战中的 **响应慢** 问题，作者指出工具定义在会话期间不变，但每次调用都重复编码，造成不必要开销。  
这是一个典型的“高频路径性能热点”，说明社区开始从功能可用性转向 **运行效率和交互延迟** 的优化。

### 3.3 对应优化 PR 已出现
- **PR #4421**  
  链接：<https://github.com/HKUDS/nanobot/pull/4421>

PR 与 Issue #4420 强相关，说明社区已经形成“问题—方案”闭环。虽然尚未合并，但这是一个积极信号：维护者若响应及时，有望快速转化为实际收益。

---

## 4) Bug 与稳定性
今日未看到崩溃、数据丢失或回归类严重 Bug 报告；当前稳定性风险主要体现在 **性能退化** 而非功能失效。

### 按严重程度排序

#### 1. 中高优先级：`estimate_prompt_tokens` 重复编码导致响应变慢
- **Issue #4420**：<https://github.com/HKUDS/nanobot/issues/4420>  
- **对应 PR #4421**：<https://github.com/HKUDS/nanobot/pull/4421>

影响：  
- 会在每轮迭代中重复进行工具定义 JSON 序列化和 tiktoken 编码  
- 对多轮对话、工具较多的场景影响尤其明显  
- 会直接拉低 agent 响应速度与吞吐

状态判断：**已有修复 PR，属于“已定位、待合并”的稳定性优化问题**。

#### 2. 低风险：推理强度默认策略缺乏自动升级
- **Issue #4419**：<https://github.com/HKUDS/nanobot/issues/4419>

影响：  
- 更偏“体验/效果”问题，不是直接故障  
- 若任务复杂度变化大，可能导致推理质量不稳定  
- 不会造成系统崩溃，但可能导致结果质量波动

状态判断：**暂无 fix PR**，属于功能完善方向。

---

## 5) 功能请求与路线图信号
今日出现的功能请求具有明显路线图指向性，且与 NanoBot 的核心能力高度相关。

### 5.1 自动 reasoning effort escalation
- **Issue #4419**：<https://github.com/HKUDS/nanobot/issues/4419>

这是一个很强的路线图信号。它建立在 NanoBot 已支持 `reasoningEffort` 的基础上，进一步要求系统根据上下文自动选择“默认/升级”的推理档位。  
如果实现得当，这类能力很可能被纳入下一版本，因为它：
- 与现有配置兼容度高
- 直接提升 agent 在复杂任务中的表现
- 具有较强普适性，适配多模型/多供应商环境

### 5.2 token 估算缓存优化
- **Issue #4420**：<https://github.com/HKUDS/nanobot/issues/4420>  
- **PR #4421**：<https://github.com/HKUDS/nanobot/pull/4421>

这类优化非常像“近期必做”的工程性补丁：  
- 改动局部  
- 风险可控  
- 收益明确  
- 易于验证

综合判断，**#4421 是最有希望进入下一轮发布的候选项之一**。

---

## 6) 用户反馈摘要
从今日 issues 的描述可以提炼出几个非常真实的用户痛点与使用场景：

### 6.1 用户希望 AI 能“自己判断该认真到什么程度”
来自 **#4419**：<https://github.com/HKUDS/nanobot/issues/4419>  
用户不希望每次都手工配置 reasoning 强度，而是希望系统根据任务复杂度自动升级。  
这反映出 NanoBot 的使用者已经进入“生产化使用”阶段，开始追求 **自动化决策能力** 而不是纯参数可控性。

### 6.2 用户对交互速度很敏感
来自 **#4420**：<https://github.com/HKUDS/nanobot/issues/4420>  
用户在自己的数字员工场景里感知到“程序响应很慢”，并进一步定位到工具定义重复编码。  
这说明 NanoBot 已经被用于 **持续对话、多工具调用、高频迭代** 的真实业务场景，性能问题会被迅速放大。

### 6.3 用户认可现有架构，但希望更高效
从 **#4421** 看：<https://github.com/HKUDS/nanobot/pull/4421>  
社区不仅提出问题，还直接给出实现方案，说明用户对项目的整体方向是认可的，核心诉求集中在：
- 更少重复计算
- 更智能的推理策略
- 更低的使用门槛

---

## 7) 待处理积压
基于当前提供的数据，**未能识别出“长期未响应”的历史积压项**；今天展示的所有 Issue/PR 都是在 **2026-06-20 当天新建或活跃**。  
因此，严格来说，当前 snapshot 里没有可确认的长期 backlog。  
不过，以下 3 项都属于 **值得维护者优先跟进的高价值待办**：

- **Issue #4419**：<https://github.com/HKUDS/nanobot/issues/4419>  
  自动 reasoning effort 升级，偏产品能力增强，建议尽快评估设计边界。

- **Issue #4420**：<https://github.com/HKUDS/nanobot/issues/4420>  
  性能热点，影响用户体感，优先级应高于一般增强项。

- **PR #4421**：<https://github.com/HKUDS/nanobot/pull/4421>  
  与性能问题强绑定，适合尽快 review 并决定是否合并。  

---

## 总体判断
NanoBot 今天呈现出一种很典型的健康开源项目节奏：**没有发布，但讨论活跃；没有已落地合并，但需求明确且已有对应修复 PR**。  
项目当前最值得关注的两个方向分别是：  
1. **推理策略自动化**（提升智能体能力上限）  
2. **高频路径性能优化**（改善实际使用体验）  

如果维护者能够尽快推进 #4421，并同步评估 #4419 的实现路径，NanoBot 的下一阶段版本会更有“可用性 + 智能性”双重提升。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-06-20）

## 1) 今日速览
过去 24 小时，Hermes Agent 维持了**高活跃度**：新增/活跃 Issues 12 条、PR 更新 38 条，且没有新版本发布，说明团队当前主要在做功能补齐、缺陷修复与稳定性加固，而不是发版节奏。  
今日讨论主题非常集中，主要围绕 **桌面端/TUI/CLI 一致性、会话管理、插件体系、模型路由、视觉工具、权限与安全** 展开。  
从优先级看，既有 **P1 会话可见性** 和 **P2 安全/权限绕过** 这类核心风险，也有大量提升体验的功能请求，表明项目当前处于“**需求增长快、修复与架构补洞并行**”的阶段。  
整体健康度判断：**活跃且推进明确，但核心路径上的稳定性与安全议题需要优先消化。**

---

## 2) 项目进展
今日可见的关键推进主要来自已关闭 PR，虽然发版为 0，但项目在“修复收敛”上有实质进展。

- **#49380**：修复切换 provider 后残留旧凭证的问题，避免 `model.api_key` / 旧字段污染新 provider 解析，属于较关键的配置一致性修复。  
  链接：<https://github.com/NousResearch/hermes-agent/pull/49380>

- **#49375**：修复 Bedrock 子代理走错对话模式的问题，确保 delegation 场景下回到 Hermes 内部 `bedrock_converse` 路径。  
  链接：<https://github.com/NousResearch/hermes-agent/pull/49375>

从今天的 PR 面貌看，项目推进不是“单一大版本冲刺”，而是多条主线同时收敛：  
- **CLI 体验**：JSON 输出、busy 状态提示修正  
- **桌面端**：会话恢复、插件、语言国际化、Linux launcher  
- **Gateway/Adapter**：Slack 转义、QQBot/Telegram/ACP 审批与重试  
- **Agent/Provider**：Vision、Anthropic、OpenAI/Codex、模型切换与记忆策略

当前 **38 条 PR 更新里有 6 条已合并/关闭**，说明代码流入速度不低，但也意味着集成压力仍然存在。

---

## 3) 社区热点
今日最活跃的话题以 **Issue 评论数** 为主，整体讨论呈现“功能需求 + 安全审视 + 核心可用性”三类热点。

1. **#49363 Desktop app — load dashboard plugins**（2 条评论）  
   用户希望桌面端获得与 Web Dashboard 一致的插件运行时契约，说明社区对 **Web/Desktop 能力对齐** 期待很强。  
   链接：<https://github.com/NousResearch/hermes-agent/issues/49363>

2. **#49388 Xiaomi MiMo vision_analyze uses wrong path**（1 条评论）  
   视觉能力在特定 provider 上“静默降级”为文本摘要，用户对 **视觉工具的真实可用性** 很敏感。  
   链接：<https://github.com/NousResearch/hermes-agent/issues/49388>

3. **#49386 tool policy bypass exposes external memory-provider tools**（1 条评论）  
   安全/策略绕过类问题很容易引发维护者关注，尤其是涉及 `disabled_toolsets=["memory"]` 却仍可调用外部 memory 工具。  
   链接：<https://github.com/NousResearch/hermes-agent/issues/49386>

4. **#49361 Session index only tracks WhatsApp — CLI sessions invisible**（1 条评论）  
   这类问题直接影响日常可用性：CLI/TUI 会话“存在磁盘上但不可见”，说明用户很依赖统一会话索引与恢复。  
   链接：<https://github.com/NousResearch/hermes-agent/issues/49361>

总体来看，今日热点不是“高赞话题”，而是**真实使用阻塞**：能不能看见会话、能不能正确走工具、安不安全、桌面端是否像 Web 一样完整。

---

## 4) Bug 与稳定性
按严重程度排序，今天的 Bug 与回归信号如下：

### P1 / 高优先级
- **#49361**：CLI/TUI 会话未进入 session index，导致自动恢复和 `/session list` 不可见。  
  影响：核心工作流断裂，用户必须手动从文件系统找回会话。  
  状态：**暂无对应 fix PR**。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49361>

### P2 / 安全与核心能力
- **#49386**：memory 工具绕过 `disabled_toolsets=["memory"]`，属于**策略/权限绕过**。  
  影响：安全边界失效，建议优先处理。  
  状态：**暂无对应 fix PR**。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49386>

- **#49385**：`/browser connect` 暴露未鉴权本地 CDP 控制面。  
  影响：同机进程可能接管浏览器，属于明确安全风险。  
  状态：**暂无对应 fix PR**。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49385>

- **#49388**：Xiaomi MiMo 的 `vision_analyze` 走错路径，图像被降级为文本摘要。  
  影响：视觉能力失真，直接破坏工具预期。  
  状态：**已有修复 PR #49389（OPEN）**。  
  问题链接：<https://github.com/NousResearch/hermes-agent/issues/49388>  
  修复链接：<https://github.com/NousResearch/hermes-agent/pull/49389>

- **#49391**：`run_agent.py` 可能重复持久化 user message。  
  影响：会话污染、历史重复、后续总结偏差。  
  状态：**暂无对应 fix PR**。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49391>

- **#49379**：Anthropic “extra usage” 400 被误判为 `format_error`。  
  影响：错误归因不准，可能误导重试和告警策略。  
  状态：**暂无对应 fix PR**。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49379>

### P3 / 体验问题
- **#49390**：CLI busy indicator 硬编码 `msg=interrupt`，不尊重配置。  
  影响：提示与用户实际设置不一致。  
  状态：**已有修复 PR #49394（OPEN）**。  
  问题链接：<https://github.com/NousResearch/hermes-agent/issues/49390>  
  修复链接：<https://github.com/NousResearch/hermes-agent/pull/49394>

---

## 5) 功能请求与路线图信号
今天新增的功能请求非常集中，能清楚看出下一阶段路线图的方向。

- **#49363**：桌面应用加载 dashboard plugins，实现 Web 与 Desktop 的运行时契约一致。  
  这是一个强信号：社区希望 Hermes Desktop 从“壳”走向“完整平台”。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49363>

- **#49383**：Voice wake word（“Hey Hermes”）。  
  说明用户在寻找**免手动唤起**的桌面交互方式，偏向消费级助手体验。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49383>

- **#49378**：智能模型路由，按内容自动切换 API / 本地模型。  
  这是典型的“多模型编排”诉求，和 Hermes 的 agent 路线高度一致。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49378>

- **#49377**：桌面 GUI 一键备份/恢复。  
  这反映出桌面用户越来越不想依赖 CLI 命令做迁移操作。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49377>

### 路线图判断
结合今日已出现的 open PR，以下方向**很可能进入下一版本候选**：

- **会话恢复/持久化**：#49400、#49381  
  <https://github.com/NousResearch/hermes-agent/pull/49400>  
  <https://github.com/NousResearch/hermes-agent/pull/49381>

- **CLI 输出与交互完善**：#49395、#49394  
  <https://github.com/NousResearch/hermes-agent/pull/49395>  
  <https://github.com/NousResearch/hermes-agent/pull/49394>

- **插件与桌面能力扩展**：#49401、#49387、#49384  
  <https://github.com/NousResearch/hermes-agent/pull/49401>  
  <https://github.com/NousResearch/hermes-agent/pull/49387>  
  <https://github.com/NousResearch/hermes-agent/pull/49384>

结论是：**桌面体验、会话管理、模型路由、插件生态**，很可能成为后续版本的主要交付面。

---

## 6) 用户反馈摘要
从今日 Issues 可以提炼出几类非常真实的用户痛点：

- **“别让我手工找会话”**：CLI/TUI 会话不可见、恢复不自动，是典型高频痛点。  
  关联：#49361、#49400  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49361>  
  链接：<https://github.com/NousResearch/hermes-agent/pull/49400>

- **“桌面端要和 Web 一样完整”**：插件系统、备份恢复、语言本地化都在朝这个方向补齐。  
  关联：#49363、#49377、#49383  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49363>  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49377>  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49383>

- **“安全边界必须可靠”**：memory 工具绕过、浏览器 CDP 未鉴权，说明用户/审计者对 Hermes 的权限模型很敏感。  
  关联：#49386、#49385  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49386>  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49385>

- **“别静默降级”**：视觉分析如果不能真正走图像路径，就会直接损害信任。  
  关联：#49388  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49388>

- **“多 profile / 多 provider 场景要正确隔离”**：Windows profile、provider 切换、Anthropic 计费状态分类，都体现出多环境用户希望系统表现更稳。  
  关联：#49402、#49380、#49379  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49388>  
  链接：<https://github.com/NousResearch/hermes-agent/pull/49380>  
  链接：<https://github.com/NousResearch/hermes-agent/pull/49379>

---

## 7) 待处理积压
由于今天出现的 Issues/PR 基本都是**当天新建**，当前数据里**没有明显“长期沉默”的老单**可直接判断；但以下高优先级项应被视为近期积压重点：

- **P1 会话索引缺失**：#49361  
  影响工作流，且直接关系到可恢复性。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49361>

- **P2 安全绕过**：#49386、#49385  
  两个都属于应尽快确认/修补的安全类问题。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49386>  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49385>

- **P2 关键行为回归**：#49391、#49379  
  会影响会话正确性与错误分类，建议尽快排入修复队列。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49391>  
  链接：<https://github.com/NousResearch/hermes-agent/issues/49379>

- **待集成修复 PR 较多**：#49389、#49394、#49400、#49401、#49395、#49381  
  说明修复供给充足，但需要更强的合并与回归测试节奏。  
  链接：<https://github.com/NousResearch/hermes-agent/pull/49389>  
  链接：<https://github.com/NousResearch/hermes-agent/pull/49394>  
  链接：<https://github.com/NousResearch/hermes-agent/pull/49400>  
  链接：<https://github.com/NousResearch/hermes-agent/pull/49401>  
  链接：<https://github.com/NousResearch/hermes-agent/pull/49395>  
  链接：<https://github.com/NousResearch/hermes-agent/pull/49381>

---

### 结论
今天的 Hermes Agent 呈现出一个典型特征：**需求强、修复多、集成压力上升**。  
从健康度看，项目并没有放缓，反而在 **桌面端体验、安全边界、会话系统、provider 兼容性** 上同时展开修补与扩展；下一阶段最值得关注的是：  
1) 高优先级安全/权限问题是否快速收敛，  
2) 大量 open PR 能否稳定合并，  
3) 桌面端与 CLI/TUI 的能力差距是否继续缩小。

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

以下为 **TinyClaw（TinyAGI/tinyagi）2026-06-20 项目动态日报**，基于你提供的 GitHub 数据整理。

---

## 1. 今日速览

TinyClaw 今日整体活跃度偏低：过去 24 小时仅新增/活跃 1 条 Issue，且没有 PR 更新、没有新版本发布，说明代码层面基本静止。  
当前项目的主要焦点集中在一条 **安全漏洞报告** 上，问题涉及未认证的 `prompt_file` 更新可能导致任意本地文件被读取并注入到 provider-bound prompts 中。  
从健康度看，项目表面上“安静”，但安全议题的出现意味着需要尽快响应，否则可能影响用户对项目安全性的信任。  
总体判断：**社区讨论热度低，但风险事件等级较高，项目处于“低活跃、单点风险暴露”的状态。**

- 项目主页：<https://github.com/TinyAGI/tinyagi>

---

## 2. 版本发布

今日 **无新版本发布**。

- Releases：<https://github.com/TinyAGI/tinyagi/releases>

---

## 3. 项目进展

今日 **无 PR 合并或关闭**，因此没有可确认的功能推进或缺陷修复落地。  
从进展角度看，项目在过去 24 小时里 **没有通过代码合并推进功能或稳定性**，整体“向前迈进”的幅度接近于零。  
当前唯一的实质性进展来自安全问题的外部披露，而不是仓库内的修复动作。

- Pull Requests：<https://github.com/TinyAGI/tinyagi/pulls>

---

## 4. 社区热点

今日社区热点几乎完全由唯一一条安全 Issue 占据；该 Issue 目前 **0 评论、0 👍**，说明讨论尚未展开，但议题本身非常关键。  
从诉求上看，提报者明显希望维护者尽快确认是否存在未授权文件读取、prompt 注入链路以及管理 API 暴露面过宽的问题。  
由于没有其他 Issue/PR 活跃，这条安全报告是当前最值得维护者优先处理的社区关注点。

### 热点条目
1. **#285 [OPEN] [Security] Unauthenticated `prompt_file` update allows arbitrary local file read into provider-bound prompts**  
   链接：<https://github.com/TinyAGI/tinyagi/issues/285>

---

## 5. Bug 与稳定性

今日报告的唯一问题为安全相关缺陷，按严重程度建议列为 **高优先级 / 高严重性**：

| 严重程度 | Issue | 问题类型 | 影响 | 是否已有 fix PR |
|---|---|---|---|---|
| 高 | [#285](https://github.com/TinyAGI/tinyagi/issues/285) | 安全漏洞 / 信息泄露 | 未认证客户端可能修改 `prompt_file` 指向任意可读本地路径，导致本地文件内容被读取并进入 provider prompts，存在敏感信息泄露风险 | 未见 fix PR |

### 重点说明
- 该问题不是普通 bug，而是**安全边界失效**。
- 若管理 API 对外可达，风险会显著放大。
- 当前仓库内未观察到对应修复 PR，建议尽快补丁化处理并评估回滚/公告策略。

- 安全 Issue：<https://github.com/TinyAGI/tinyagi/issues/285>

---

## 6. 功能请求与路线图信号

今日未出现新的功能请求，也没有 PR 信号支持路线图推进。  
因此，从公开数据看，**当前没有明确的新功能纳入下一版本的迹象**。  
不过，这条安全 Issue 暗示路线图应优先增加：

- 管理 API 的鉴权与授权校验
- `prompt_file` 路径白名单或目录沙箱
- 敏感文件访问限制
- 安全回归测试与审计日志

这些并非用户直接提出的新功能，但已经构成下一阶段的**强需求方向**。

- 路线图信号相关讨论入口：<https://github.com/TinyAGI/tinyagi/issues/285>

---

## 7. 用户反馈摘要

从当前 Issue 内容可提炼出的真实用户痛点主要是：

1. **安全边界不足**
   - 用户担心只要能接触 HTTP 管理 API，就可能改变 agent 行为并触发本地文件读取。
2. **配置输入缺少约束**
   - `prompt_file` 可被设置为任意本地路径，说明输入校验与权限控制可能不够严格。
3. **敏感信息暴露风险**
   - 该问题的核心诉求是避免 prompt 载入链路成为本地文件泄露通道。

当前没有评论，因此还看不到更多使用场景反馈；但从漏洞描述看，用户显然关注的是 **部署环境中的安全隔离**，尤其是服务端运行时的本地文件访问风险。

- 相关反馈 Issue：<https://github.com/TinyAGI/tinyagi/issues/285>

---

## 8. 待处理积压

基于你提供的数据，**未发现长期未响应的重要 Issue 或 PR**；目前唯一公开活跃项就是今天新开的安全 Issue。  
不过，虽然不算“积压”，这条 Issue 的优先级足够高，建议维护者视为 **立即处理事项**，避免其在后续几天演变为舆情或安全事件。

### 需要重点关注
- **#285**：安全漏洞报告，尚无评论、无修复 PR
  - 链接：<https://github.com/TinyAGI/tinyagi/issues/285>

---

### 总体结论

TinyClaw 今日仓库层面“静”，但安全层面“动”得很明显：**唯一的活跃事件就是一条高风险安全漏洞报告**。  
在没有新版本、没有 PR、没有评论互动的背景下，项目当前最重要的动作不是功能推进，而是尽快完成漏洞确认、修复、回归验证与安全公告准备。

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

以下为 **ZeroClaw（zeroclaw-labs/zeroclaw）2026-06-20 项目动态日报**。  
总体基于你提供的 GitHub 快照数据整理。

---

## 1) 今日速览

ZeroClaw 今天整体呈现出**高提交、低讨论、零发布**的状态：过去 24 小时共新增/更新 **1 条 Issue** 和 **7 条 PR**，但**暂无任何合并、关闭或新版本发布**。  
从内容上看，今天的工作重心明显偏向于 **测试补强、稳定性修复、安装体验优化**，属于典型的“基础质量建设日”。  
同时，今天出现了一条带有 **S2 严重度** 的 Bug 报告，提示项目在某些工具链输出场景下存在潜在数据丢失风险。  
综合判断：项目当前**开发活跃度较高**，但仍处于**审查/等待合并阶段**，尚未形成可对外发布的新版本增量。

---

## 2) 版本发布

**今日无新版本发布**。  
- Releases：无  
- 最新发布：无

> 说明：本日报无需列出版本变更、破坏性变更或迁移注意事项。

---

## 3) 项目进展

今天没有 PR 被合并或关闭，因此项目的“正式前进”主要体现在**新 PR 的持续输入**，而不是已经落地到主干上的功能增量。  
不过，从 PR 主题看，今天的提交方向非常明确，主要推进了以下几类能力：

### 3.1 安装体验改善
- **#8038 feat(install): add zeroclaw to PATH automatically, with --no-modify-path opt-out**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8038>  
  这是今天最具用户可感知价值的改动之一：安装器从“仅提示用户手动配置 PATH”升级为“自动写入 shell 配置”，显著降低首次使用门槛。

### 3.2 运行时与 agent 行为的测试加固
- **#8041 test(runtime): pin hook panic recovery + cancellation propagation**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8041>
- **#8040 test(runtime): pin tool_search branch of should_execute_tools_in_parallel**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8040>
- **#8037 test(providers): pin responses-wire option propagation**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8037>
- **#8036 test(runtime): pin system prompt in cache-hit test to kill date flake**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8036>

这些 PR 说明维护者正在集中处理：
- panic 恢复路径
- cancellation 传播
- 工具并行执行分支
- provider 参数传递
- cache 命中测试的时间 flake

这类工作对 AI agent/runtime 项目非常关键，意味着项目正在从“能跑”向“可验证、可回归、可稳定发布”推进。

### 3.3 运行时/技能工具能力增强
- **#8035 feat(skill-tool): expose ZEROCLAW_SESSION_ID to skill shell tools**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8035>

该 PR 让 skill shell tools 能拿到会话 ID，增强了任务链路中的上下文透传能力，利于结果回写、审计和 session 级联处理。

### 3.4 前进幅度判断
如果按“今日已落地进展”来衡量，项目**没有直接进入主干的新增能力**；  
但如果按“开发推进强度”衡量，今天至少完成了 **7 个方向明确的改动输入**，覆盖安装、运行时、provider、测试与 bug 修复，属于**中高强度迭代**。  
遗憾的是，这些工作还停留在 PR 阶段，说明项目的前进主要发生在“准备合并”而非“已发布”。

---

## 4) 社区热点

> 说明：今天所有 Issue/PR 的评论数与反应数几乎都为 0，**没有形成明显的社区讨论热点**。

### 今日较值得关注的条目（按潜在影响而非互动量）
1. **#8039 [bug] fill-translations leak-repair leaves orphaned continuation lines**  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8039>  
   这是唯一的公开 Bug 报告，且涉及 **silent data-loss** 风险，优先级明显高于一般体验问题。

2. **#8038 自动配置 PATH 的安装改进**  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8038>  
   用户启动门槛是典型高频痛点，这类 PR 往往会带来较强的安装体验改善。

3. **#8035 ZEROCLAW_SESSION_ID 环境变量透传**  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8035>  
   这是面向脚本化/自动化技能工具的重要上下文能力，可能直接影响高级用户和集成场景。

### 背后诉求
今天的内容反映出社区与维护者的关注点主要集中在：
- **首次安装和可运行性**
- **运行时稳定性与可测试性**
- **技能工具与 agent 上下文传递**
- **工具链输出的安全性与数据完整性**

---

## 5) Bug 与稳定性

### 严重 Bug
#### 1. **#8039 [bug] fill-translations leak-repair leaves orphaned continuation lines**
- 链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8039>
- 作者：JordanTheJet
- 创建/更新：2026-06-20
- 严重程度：**S2 - degraded behavior**
- 风险点：`tools/fill-translations/src/main.rs` 在修复模型“prompt leak”响应时，只重写了 `msgstr ""` 行，但**没有清理后续多行 continuation**，可能导致生成的 `.po` 文件出现**孤儿续行**，进而触发**静默数据丢失**或输出结构污染。

**是否已有 fix PR：未见明确对应修复 PR。**  
当前列出的 7 个 PR 中，没有一个直接指向该工具链 bug。

### 稳定性相关 PR（侧重预防性修复）
- **#8041**：Hook panic recovery + cancellation propagation 的测试加固  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8041>
- **#8040**：工具并行执行分支的测试覆盖补强  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8040>
- **#8036**：消除 cache-hit 测试中的日期抖动  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8036>

这些 PR 虽然不是线上 bug 修复，但明显在降低未来回归风险。

---

## 6) 功能请求与路线图信号

今天的新功能信号比较清晰，主要集中在两个方向：

### 6.1 安装体验自动化
- **#8038**：自动将 zeroclaw 加入 PATH，并提供 `--no-modify-path` 退出选项  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8038>

**路线图判断：高概率进入下一版本**  
理由：
- 属于典型的安装链路优化
- 用户收益明确
- 风险可通过 opt-out 降低
- 与“让 CLI 更易用”的整体方向一致

### 6.2 Agent / Skill 上下文增强
- **#8035**：向 skill shell tools 暴露 `ZEROCLAW_SESSION_ID`  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8035>

**路线图判断：中高概率纳入下一版本**  
理由：
- 对自动化工具和技能编排很实用
- 属于基础设施类能力，适合与 runtime 一起发布
- 可能为后续“会话关联、结果回传、审计追踪”铺路

### 6.3 质量工程驱动的“隐性需求”
- **#8041 / #8040 / #8037 / #8036** 都是测试补强型 PR  
  链接分别为：  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8041>  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8040>  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8037>  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8036>

这说明项目路线图中，**“测试覆盖与行为锁定”**已成为重要优先级。对于 AI agent 类项目，这通常意味着：
- 复杂分支需要稳定回归保护
- 运行时边界行为正在被系统化定义
- 发布门槛可能会越来越依赖测试通过率

---

## 7) 用户反馈摘要

从今天的 Issue 内容来看，用户反馈主要集中在一个非常具体但很典型的痛点上：

### 真实痛点
- **输出修复逻辑不完整，导致生成文件结构损坏**
  - 来自 **#8039**
  - 关键词：`silent data-loss`、`orphaned continuation lines`、`.po output`

这说明用户不是在抱怨“功能没有”，而是在指出：
- 修复逻辑只修半截
- 生成产物可能表面正常、实际上已经损坏
- 这种问题对翻译管线、构建链路、自动生成文件尤其危险

### 使用场景
- `fill-translations` 相关工具链
- 自动修复模型输出
- `.po` 国际化/翻译文件生成流程
- 需要对 AI 输出进行结构化后处理的场景

### 满意/不满意点
- **不满意**：修复流程看似生效，但会遗留后续续行，导致隐性错误
- **隐含期待**：工具在面对模型“泄漏式响应”时，应做到**完整、可验证、无残留**地修复

---

## 8) 待处理积压

### 当前快照下的积压判断
从你提供的数据看，**今天没有出现长期未响应的 Issue 或 PR**：
- 所有 Issue/PR 都是 **2026-06-20 创建或更新**
- 评论数基本为 0
- 没有陈旧未动条目可识别

### 需要维护者持续关注的高优先项
尽管不是“积压”，但以下条目值得优先跟进：
1. **#8039 Bug：silent data-loss 风险**  
   <https://github.com/zeroclaw-labs/zeroclaw/issues/8039>
2. **#8038 安装体验改进**  
   <https://github.com/zeroclaw-labs/zeroclaw/pull/8038>
3. **#8035 Session ID 透传**  
   <https://github.com/zeroclaw-labs/zeroclaw/pull/8035>

---

## 总体结论

ZeroClaw 在 2026-06-20 表现出**较强的开发推进活跃度**，但今日成果主要体现在**PR 输入和质量修补**，尚未转化为新的 release。  
最值得警惕的是 **#8039** 这种会造成输出静默损坏的工具链问题；最值得期待的是 **安装 PATH 自动化** 与 **session 上下文透传**，它们都很可能提升用户首次体验和高级自动化能力。  
如果接下来这些 PR 被集中合并，ZeroClaw 下一版会更像一次“稳定性与可用性增强版”，而不是纯功能扩张版。

如果你愿意，我也可以把这份日报进一步整理成：
- **适合发到团队群的精简版**
- **适合放到周报/项目看板的管理版**
- **带风险评级与优先级矩阵的分析版**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*