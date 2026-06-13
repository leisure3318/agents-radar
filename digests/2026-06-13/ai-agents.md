# OpenClaw 生态日报 2026-06-13

> Issues: 23 | PRs: 45 | 覆盖项目: 13 个 | 生成时间: 2026-06-13 01:39 UTC

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

以下为 **OpenClaw（github.com/openclaw/openclaw）在 2026-06-13 的项目动态日报**。

---

## 1. 今日速览

过去 24 小时，OpenClaw 维持了 **高活跃度**：**23 条 Issues 更新、45 条 PR 更新、1 个新版本发布**。从内容看，项目推进的重点非常明确：一边在做 **安全边界收紧** 和 **稳定性修复**，一边继续扩展 **模型/插件生态** 与 **多渠道交付能力**。  
今天的问题密度也不低，且不少集中在 **消息丢失、会话状态、认证边界、插件兼容** 等核心链路，说明项目当前处于“功能继续前进，但可靠性与安全性必须同步补课”的阶段。整体来看，仓库健康度偏强，但维护压力同样较高。

相关链接：  
- 仓库主页：https://github.com/openclaw/openclaw  
- 最新 Release：[#v2026.6.6](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6)

---

## 2. 版本发布

### 新版本：v2026.6.6
发布页：[#v2026.6.6](https://github.com/openclaw/openclaw/releases/tag/v2026.6.6)

#### 主要更新方向
Release notes 的摘要显示，本次版本核心是 **安全边界大幅收紧**，覆盖面包括：

- transcripts
- sandbox binds
- host environment inheritance
- MCP stdio
- Codex HTTP access
- native search policy
- elevated sender checks
- deleted-agent ACP bypasses
- loopback tools
- Discord moderation
- Teams group actions

#### 影响判断
这类更新通常意味着：
1. **默认行为更保守**，过去“可用但不严格”的路径可能被拦截；
2. **插件与集成方需要重新验证权限假设**，尤其是依赖隐式继承、loopback、stdio、群组操作的场景；
3. **安全与可用性之间的平衡向安全侧倾斜**，短期内可能带来部分兼容性回归。

#### 迁移注意事项
建议维护者和用户重点回归以下链路：
- 自定义 sandbox / bind 逻辑
- MCP stdio 服务端环境变量
- 依赖 host env 继承的 provider / 插件
- Codex / HTTP 访问路径
- 消息发送者身份、群组操作权限
- 任何依赖 loopback 或 deleted-agent 旁路逻辑的自动化

---

## 3. 项目进展

今天公开可见的关键 PR 关闭/合并，体现出 OpenClaw 在三个方向上继续推进：**模型兼容、存储一致性、安全硬化**。

### 重要已关闭 PR
1. **Moonshot / Kimi 模型支持增强**  
   - [#92554](https://github.com/openclaw/openclaw/pull/92554)  
   为 `moonshot/kimi-k2.7-code` 增加支持，并补齐 reasoning / tool replay / multimodal / 长上下文能力。  
   这说明项目仍在持续扩展主流模型生态，增强可用性。

2. **修复 Moonshot 思考链回放缺失 reasoning_content**
   - [#92396](https://github.com/openclaw/openclaw/pull/92396)  
   解决长会话、压缩、fallback 场景下的 400 错误，提升了含 thinking 模型在复杂会话中的稳定性。

3. **修复 memory 元数据在 atomic reindex 后的持久化问题**
   - [#92507](https://github.com/openclaw/openclaw/pull/92507)  
   对记忆索引的事务/崩溃恢复做了强化，降低数据丢失风险。

4. **修复 sandbox CLI skill prompt 路径渲染**
   - [#92508](https://github.com/openclaw/openclaw/pull/92508)  
   这类修复直接关系到安全边界与路径暴露问题，和本次 Release 的“安全边界收紧”方向一致。

5. **修复 esbuild 生产审计失败**
   - [#92540](https://github.com/openclaw/openclaw/pull/92540)  
   属于依赖与供应链层面的健康维护。

### 总体推进判断
从今天可见的关闭项看，项目不是单纯“修功能”，而是在同步推进：
- **模型兼容性**
- **数据/元数据一致性**
- **安全边界收敛**
- **构建与依赖治理**

这意味着项目在“功能扩张”和“基础治理”两条线上都在前进。  
仓库公开数据中显示过去 24 小时有 **45 条 PR 更新、其中 10 条处于合并/关闭状态**，说明主线仍在快速迭代。

---

## 4. 社区热点

> 说明：PR 列表中未提供统一的评论数，因此“今日最活跃”主要依据 Issues 的评论量、关注度和问题严重性判断。

### 热点 Issue 1：子代理完成事件被静默丢失
- [#92433](https://github.com/openclaw/openclaw/issues/92433)  
- 评论：5，👍1

**诉求背后：**  
这是典型的 **消息丢失 / 事件交付不可靠** 问题。用户在意的不是“是否报错”，而是“完成事件有没有被系统正确落盘和递送”。这类问题直接影响 agent 协作可信度。

### 热点 Issue 2：Ollama Cloud DNS 解析失败
- [#92391](https://github.com/openclaw/openclaw/issues/92391)  
- 评论：4，👍1

**诉求背后：**  
用户希望 **first-class provider 路径** 真正可用，而不是依赖旧的混合路由。说明模型接入体验和网络可达性仍是高频痛点。

### 热点 Issue 3：TaskFlow 卡死导致 heartbeat 阻塞
- [#92523](https://github.com/openclaw/openclaw/issues/92523)  
- 评论：3，👍1

**诉求背后：**  
这反映出用户对 **请求队列与运行时活性** 很敏感。一个 callback 卡住，可能把整个 agent 心跳链路拖死，属于高优先级稳定性问题。

### 热点 Issue 4：Gateway auth tokens / dispatch lane 安全方案
- [#92367](https://github.com/openclaw/openclaw/issues/92367)  
- 评论：2，👍1

**诉求背后：**  
这是较强的架构型安全诉求，说明社区开始从“能跑”转向“最小权限、按 agent 隔离”。这与今天 Release 的安全收紧方向高度一致。

### PR 热点判断
今日 PR 侧虽然更新很多，但公开数据里评论数大多未展示，尚看不出明显“讨论爆点”。从内容上看，较受关注的方向主要是：
- 安全边界与权限控制
- memory / sessions 一致性
- 模型 catalog 与 provider 兼容
- iOS / Telegram / WebChat 等多渠道交付稳定性

---

## 5. Bug 与稳定性

下面按严重程度排序，标注是否已出现对应 fix PR。

### P1 / 安全边界类

1. **Workspace 边界外的文件注入风险**
   - [#92561](https://github.com/openclaw/openclaw/issues/92561)  
   `loadProjectContextFiles()` 会一路向上扫到文件系统根目录，可能把工作区外的 `AGENTS.md` / `CLAUDE.md` 带入上下文。  
   **风险等级：高，属于边界安全问题。**  
   **Fix PR：未见。**

2. **Secrets audit 漏检 LaunchAgent 明文环境变量**
   - [#92522](https://github.com/openclaw/openclaw/issues/92522)  
   审计结果“看起来干净”，但服务环境文件中仍残留明文 secret。  
   **风险等级：高，属于安全审计失真。**  
   **Fix PR：未见。**

3. **子代理完成消息静默丢失**
   - [#92433](https://github.com/openclaw/openclaw/issues/92433)  
   事件在 requester run 中被 steered 后，在 commit 前可能被吞掉。  
   **风险等级：高，直接消息丢失。**  
   **Fix PR：未见。**

### P1 / 数据丢失与关键状态破坏

4. **WhatsApp 插件更新会清空 Baileys session**
   - [#92546](https://github.com/openclaw/openclaw/issues/92546)  
   插件升级后每次都要重新扫码，属于明确的数据/会话损失。  
   **Fix PR：未见。**

5. **孤立 TaskFlow 卡在 waiting，永久阻塞 heartbeats**
   - [#92523](https://github.com/openclaw/openclaw/issues/92523)  
   请求在 flight 计数上无法释放，可能拖垮 gateway 活性。  
   **Fix PR：未见。**

### P2 / 回归与行为错误

6. **iOS node 连接 Tailscale Serve 时不呈现 device identity**
   - [#92567](https://github.com/openclaw/openclaw/issues/92567)  
   反复进入 `DEVICE_IDENTITY_REQUIRED` 循环。  
   **Fix PR：相关修复方向可参考** [#92552](https://github.com/openclaw/openclaw/pull/92552)，但当前未见直接闭环说明。

7. **session-memory hook 在 thinking 被剥离时重复写 assistant 消息**
   - [#92563](https://github.com/openclaw/openclaw/issues/92563)  
   这会污染会话历史，影响后续 memory、检索和调试。  
   **Fix PR：未见。**

8. **自动 daily/idle session rollover 丢失用户设置的 behavior override**
   - [#92562](https://github.com/openclaw/openclaw/issues/92562)  
   用户显式设置的 `/think medium` 在自动 rollover 后回退。  
   **Fix PR：未见。**

9. **subagent model override 被静默丢弃**
   - [#92486](https://github.com/openclaw/openclaw/issues/92486)  
   spawn 时能解析，child run 开始前却被丢回默认模型。  
   **Fix PR：未见。**

10. **模型目录插件单点坏配置导致整个 custom-models 加载失败**
    - [#92553](https://github.com/openclaw/openclaw/issues/92553)  
    一处 catalog 失效，可能让整个 registry 变成 0 models。  
    **Fix PR：已出现** [#92564](https://github.com/openclaw/openclaw/pull/92564)。

11. **cron 自我调试不可用工具结果被错误投递到 Telegram**
    - [#92535](https://github.com/openclaw/openclaw/issues/92535)  
    **Fix PR：已出现** [#92545](https://github.com/openclaw/openclaw/pull/92545)。

### 已关闭但仍值得关注的稳定性问题
- [#92534](https://github.com/openclaw/openclaw/issues/92534) Delivery retry 错把 `delivery.mode=none` 的 cron session 当传输载体  
- [#92407](https://github.com/openclaw/openclaw/issues/92407) message tool 的 `image` 参数被静默丢弃  
- [#92539](https://github.com/openclaw/openclaw/issues/92539) 与 [#92548](https://github.com/openclaw/openclaw/issues/92548) 重复的 Docker stale binary 问题

---

## 6. 功能请求与路线图信号

今天的功能请求信号很清晰：社区开始从“单点能力”转向“**可治理、可隔离、可配置的多会话/多渠道系统**”。

### 高优先级路线图信号

1. **scope-bound gateway auth tokens + per-agent dispatch lane**
   - [#92367](https://github.com/openclaw/openclaw/issues/92367)  
   这是最强的路线图信号之一。它和今天 Release 的安全收紧方向高度一致，**很可能进入下一阶段优先级**。

2. **session-aware template variables in `extra_body`**
   - [#92559](https://github.com/openclaw/openclaw/issues/92559)  
   诉求很明确：同一 agent 需要针对不同 session/channel 注入不同参数。  
   这类需求对多租户、多渠道集成很有价值，**中期纳入概率较高**。

3. **`clear_goal` tool with bounded archive**
   - [#92525](https://github.com/openclaw/openclaw/issues/92525)  
   偏向产品/交互设计，价值在于更完整的目标生命周期管理。  
   但从问题表述看更偏“流程设计”，**短期是否纳入取决于产品判断**。

### 与现有 PR 的路线图联动
以下 PR 说明团队/社区正在围绕这些方向做工程化补强：
- [#92547](https://github.com/openclaw/openclaw/pull/92547) 节点审批诊断增强  
- [#92557](https://github.com/openclaw/openclaw/pull/92557) ClawHub 插件元数据校验  
- [#92556](https://github.com/openclaw/openclaw/pull/92556) 将 Inworld 引入为内建 LLM provider  
- [#92555](https://github.com/openclaw/openclaw/pull/92555) 稳定版发布增加 Windows companion assets 门禁  
- [#92484](https://github.com/openclaw/openclaw/pull/92484) MCP stdio env 安全过滤写入时拒绝

这些都说明：**路线图正在从“功能扩展”转向“平台治理 + 安全 + 生态标准化”**。

---

## 7. 用户反馈摘要

从 Issues 的内容里，可以提炼出几类非常真实、且重复出现的用户痛点：

### 1) “不要静默失败”
用户对“看似成功、实际丢失”的容忍度很低。典型例子：
- [#92433](https://github.com/openclaw/openclaw/issues/92433) 子代理完成被静默丢弃
- [#92407](https://github.com/openclaw/openclaw/issues/92407) 图片参数丢失但返回 `ok:true`
- [#92546](https://github.com/openclaw/openclaw/issues/92546) 更新插件后 session 被清空

**反馈含义：**  
用户最需要的是“**可验证的成功**”，而不是接口返回成功。

### 2) “状态要稳定，别自动回退”
- [#92562](https://github.com/openclaw/openclaw/issues/92562) 自动 rollover 丢失用户设置
- [#92486](https://github.com/openclaw/openclaw/issues/92486) 子代理模型 override 被丢弃
- [#92563](https://github.com/openclaw/openclaw/issues/92563) 会话消息重复写入

**反馈含义：**  
用户在意 session state 的连续性，尤其是模型设置、thinking 开关、历史记录的一致保留。

### 3) “安全边界不要靠默认侥幸”
- [#92561](https://github.com/openclaw/openclaw/issues/92561) 工作区外文件注入
- [#92522](https://github.com/openclaw/openclaw/issues/92522) secret 审计不准
- [#92367](https://github.com/openclaw/openclaw/issues/92367) 更细粒度的 token / lane 隔离诉求

**反馈含义：**  
社区正在把 OpenClaw 当作“可上生产”的 agent 平台看待，默认权限和隐式继承已经不够用了。

### 4) “调试与诊断要更清楚”
- [#92523](https://github.com/openclaw/openclaw/issues/92523) heartbeat deadlock
- [#92567](https://github.com/openclaw/openclaw/issues/92567) iOS/Tailscale 身份循环
- [#92553](https://github.com/openclaw/openclaw/issues/92553) 一个 catalog 坏掉导致全局模型丢失

**反馈含义：**  
用户希望系统在出错时能 **局部失败、可观测、可恢复**，而不是一处失误拖垮全局。

---

## 8. 待处理积压

以下条目当前最值得维护者尽快跟进，优先级按“影响面 + 风险”综合排序：

1. **工作区边界外文件注入**
   - [#92561](https://github.com/openclaw/openclaw/issues/92561)

2. **Secrets audit 漏检明文环境变量**
   - [#92522](https://github.com/openclaw/openclaw/issues/92522)

3. **子代理完成事件静默丢失**
   - [#92433](https://github.com/openclaw/openclaw/issues/92433)

4. **TaskFlow waiting 导致 heartbeat 阻塞**
   - [#92523](https://github.com/openclaw/openclaw/issues/92523)

5. **WhatsApp 更新清空会话**
   - [#92546](https://github.com/openclaw/openclaw/issues/92546)

6. **iOS device identity 连接循环**
   - [#92567](https://github.com/openclaw/openclaw/issues/92567)

7. **子代理模型 override 被丢弃**
   - [#92486](https://github.com/openclaw/openclaw/issues/92486)

8. **daily rollover 丢失用户设置**
   - [#92562](https://github.com/openclaw/openclaw/issues/92562)

### 需要跟踪的修复 PR
- [#92564](https://github.com/openclaw/openclaw/pull/92564) 修复无效 plugin catalog 导致全量模型加载失败  
- [#92545](https://github.com/openclaw/openclaw/pull/92545) 修复 cron 中 unavailable-tool 自我调试误投递  
- [#92552](https://github.com/openclaw/openclaw/pull/92552) iOS foreground stale gateway reconnect 相关修复

---

## 总体结论

今天的 OpenClaw 给人的信号很明确：**项目非常活跃，而且正在进入“平台化成熟期”**。  
一方面，版本发布和 PR 关闭显示出团队持续在补强模型支持、memory 一致性和安全边界；另一方面，Issue 侧集中暴露了 **消息可靠性、状态一致性、权限边界、插件生态兼容** 等生产级问题。  

如果用一句话概括今日状态：**进展很快，但系统性稳定性和安全治理已经成为比新增功能更紧迫的主线。**

如果你愿意，我也可以把这份日报进一步整理成：
1. **面向维护者的“行动清单版”**，或  
2. **面向管理层的“一页纸摘要版”**。

---

## 横向生态对比

以下为基于 2026-06-13 各项目日报整理的**横向对比分析报告**，面向技术决策者与开发者。

---

# 1) 生态全景

过去 24 小时，个人 AI 助手/自主智能体开源生态整体呈现出三个明显特征：**高活跃、强修复、偏生产化**。一方面，OpenClaw、Hermes Agent、IronClaw、ZeroClaw、CoPaw 等项目都在持续处理大量 Issues/PR，说明赛道仍处在快速迭代期；另一方面，社区关注点已明显从“能不能跑”转向“安全边界、状态一致性、长会话稳定性、多渠道交付”这些生产级问题。  
同时，多个项目开始把 **审计、权限、插件治理、会话保活、跨平台一致性** 作为核心路线，而不是附属能力，这说明整个生态正在从原型工具向**可部署平台**演进。  
从成熟度看，生态已经进入“**功能扩张与平台治理并行**”阶段：既有大量新能力，也有越来越重的稳定性债务需要偿还。  
对开发者而言，这意味着下一阶段的竞争重点不再是单点模型调用，而是**系统工程能力**。

---

# 2) 各项目活跃度对比

| 项目 | 今日 Issues | 今日 PR | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **Hermes Agent** | 50 | 50 | 无 | **高活跃，高维护压力**，兼容性/安全问题集中 |
| **OpenClaw** | 23 | 45 | **有新版本 v2026.6.6** | **高活跃，健康度偏强**，已进入安全硬化阶段 |
| **IronClaw** | 26 | 23 | 无 | **高活跃，强迭代**，审批/CI/安全并行推进 |
| **ZeroClaw** | 8 | 15 | 无 | **高活跃，但稳定性压力较大**，S1 问题较多 |
| **CoPaw** | 12 | 9 | 无 | **活跃，用户反馈强**，桌面端与渠道体验在补课 |
| **NanoBot** | 2 | 12 | 无 | **中高活跃，偏质量打磨**，API/记忆/校验为主 |
| **PicoClaw** | 1 | 6 | 无 | **活跃但偏修复驱动**，协议和多模态链路在完善 |
| **NanoClaw** | 1 | 8 | 无 | **高提交、低合并**，审查堆积较明显 |
| **LobsterAI** | 0 | 5 | 无公开 Release，但有发布合并动作 | **低社区噪音，高工程交付**，偏稳定化 |
| **NullClaw** | 0 | 1 | 无 | **低噪音、稳定**，以连接恢复修复为主 |
| **Moltis** | 1 | 0 | 无 | **稳定但不活跃**，偏需求讨论期 |
| **TinyClaw** | 0 | 0 | 无 | **无活动** |
| **ZeptoClaw** | 0 | 0 | 无 | **无活动** |

---

# 3) OpenClaw 在生态中的定位

## 3.1 优势
OpenClaw 当前在生态中的定位非常清晰：**“平台化成熟期的代表项目”**。它的优势不只是活跃度高，而是**覆盖面广且治理动作明确**：

- **模型生态扩展快**：Moonshot/Kimi、reasoning、multimodal、长上下文都在持续补齐。
- **安全硬化最积极**：本次 Release 直接收紧 transcripts、sandbox binds、host env 继承、MCP stdio、loopback tools 等多个边界。
- **基础治理在同步推进**：memory 持久化、atomic reindex、esbuild 审计、路径渲染修复都在做。
- **多渠道交付能力强**：从 Discord、Teams 到本地/网络集成，说明其平台化程度较高。

## 3.2 技术路线差异
与同类相比，OpenClaw 的路线明显偏向 **“安全优先的平台治理”**，而不是单纯功能堆叠：

- **相比 Hermes Agent**：OpenClaw 更像“平台收敛”，Hermes 更像“高频兼容修补 + 多平台适配”。
- **相比 ZeroClaw**：OpenClaw 更强调**权限边界与安全收紧**，ZeroClaw 更强调**多通道、Web 会话、MCP/插件路径整合**。
- **相比 IronClaw**：OpenClaw 偏**模型/插件/安全平台**，IronClaw 偏**工作流审批、可观测性、CI 和 Reborn 运行态**。
- **相比 NanoBot**：OpenClaw 的系统复杂度和生态宽度更高，NanoBot 更偏**接口正确性、UI parity、长会话鲁棒性**。

## 3.3 社区规模对比
从今日公开数据看，OpenClaw 属于**第一梯队活跃项目**，但社区热度并不是最高的那个：
- **Hermes Agent** 在 Issues/PR 量上更“热”，但也更像高压修补场；
- **OpenClaw** 在活跃度接近第一梯队的同时，已经出现**版本发布 + 大规模安全收缩**，说明项目更接近“可上生产的平台”；
- 其社区讨论的主题也更偏**生产化、治理化、权限边界**，这通常意味着用户规模与使用深度都不低。

一句话：**OpenClaw 的优势不是“最吵”，而是“最像一个正在成熟的平台”。**

---

# 4) 共同关注的技术方向

下面这些方向在多个项目中反复出现，属于当前生态的共同主线：

## A. 安全边界与最小权限
涉及项目：
- **OpenClaw**：workspace 边界、sandbox、MCP stdio、loopback、sender checks
- **Hermes Agent**：`shell=True` RCE 风险、fallback 配置安全
- **PicoClaw**：Telegram 群组/频道权限分级
- **NanoClaw**：沙箱逃逸风险
- **Moltis**：Kubernetes-native sandbox backend
- **ZeroClaw**：插件路径、Web session 安全、MCP tools 可见性
- **IronClaw**：approval 流程与跨线程持久化

具体诉求：
- 细粒度授权
- 沙箱隔离
- 运行时环境收紧
- 群组/频道/工作区级权限控制
- 默认安全而非默认可用

## B. 会话状态一致性与长运行稳定性
涉及项目：
- **OpenClaw**：子代理消息丢失、session override 丢弃、thinking 重写
- **NanoBot**：consolidation 丢 delivery message、usage 透传、history 容错
- **Hermes Agent**：reasoning_content 残留、gateway replay、session mismatch
- **NullClaw**：gateway socket 重连与 session 保留
- **CoPaw**：长对话无响应、自动重启
- **ZeroClaw**：ask_user 失败、web session blocked
- **LobsterAI**：停止流后元数据保留、ASR 竞态
- **IronClaw**：DeferredBusy、approval scope 持久化

具体诉求：
- 不要静默丢消息
- 不要让状态自动回退
- 不要让长会话卡死
- 不要让重连/恢复破坏上下文

## C. 多渠道/多平台交付
涉及项目：
- **OpenClaw**：Discord、Teams、Codex HTTP、MCP 等
- **Hermes Agent**：Telegram、BlueBubbles、CLI、Copilot
- **PicoClaw**：Telegram、远程 WebSocket
- **CoPaw**：Slack、Feishu、桌面端
- **NanoBot**：WhatsApp、WebUI、TTS
- **ZeroClaw**：QQ、DingTalk、WeChat、Feishu、Web Chat
- **LobsterAI**：Computer Use、artifact 分享、cowork
- **NullClaw**：Discord gateway

具体诉求：
- 一个 agent 要能在多个渠道一致工作
- 结构化消息保真
- 不同渠道要有独立权限/策略
- 桌面端和消息渠道要统一体验

## D. 可观测性、审计与诊断
涉及项目：
- **NanoBot**：tools.audit
- **Hermes Agent**：harness dashboard、审批解释化
- **IronClaw**：operator diagnostics、log tail/follow
- **OpenClaw**：secrets audit、memory metadata、build 审计
- **LobsterAI**：Computer Use runtime 诊断增强
- **ZeroClaw**：dashboard URL、MCP tool 路径诊断

具体诉求：
- 失败要可解释
- 审计不能失真
- 运行时要能定位问题
- 用户要知道“为什么失败”

---

# 5) 差异化定位分析

## OpenClaw
- **功能侧重**：模型生态 + 插件生态 + 安全治理 + 多渠道交付
- **目标用户**：中大型团队、平台维护者、希望上生产的 agent 用户
- **架构特征**：平台型、治理型、边界收紧明显

## Hermes Agent
- **功能侧重**：网关兼容、CLI 体验、Telegram/BlueBubbles、provider 适配
- **目标用户**：重度个人用户、跨平台聊天/自动化用户
- **架构特征**：适配面广，修补频繁，偏“多入口统一层”

## IronClaw
- **功能侧重**：审批、工作流、Reborn 运行态、CI/可观测性
- **目标用户**：有审批和可控执行需求的团队用户
- **架构特征**：偏工作流引擎化，强调可解释与可恢复

## ZeroClaw
- **功能侧重**：Web Chat、多会话、MCP/插件整合、多渠道消息
- **目标用户**：想把 agent 作为“工作台”的重度用户
- **架构特征**：多端统一与会话编排是核心

## NanoBot
- **功能侧重**：API 正确性、记忆稳定性、工具校验、WebUI parity
- **目标用户**：追求对外接口兼容和可嵌入性的人
- **架构特征**：更像“兼容层 + 运行时修复层”

## CoPaw
- **功能侧重**：桌面端、频道接入、持续对话、安装与常驻体验
- **目标用户**：本地长期使用、企业协作场景用户
- **架构特征**：偏客户端体验与渠道落地

## PicoClaw
- **功能侧重**：Telegram 权限、生命周期信号、多模态路由、远程接入
- **目标用户**：Telegram 生态用户、轻量 agent 集成者
- **架构特征**：小而清晰，聚焦协议和渠道边界

## LobsterAI
- **功能侧重**：Computer Use、cowork、artifact 分享、语音输入
- **目标用户**：多模态协作、生成物分享导向用户
- **架构特征**：交互型产品感更强，工程迭代密集但社区讨论较少

## NullClaw
- **功能侧重**：Discord 长连接、gateway 重连、会话恢复
- **目标用户**：Discord 机器人/长连接服务维护者
- **架构特征**：窄而深，专注连接稳定性

## Moltis
- **功能侧重**：Kubernetes-native sandbox
- **目标用户**：云原生、安全隔离优先的部署方
- **架构特征**：偏基础设施与部署架构

---

# 6) 社区热度与成熟度

## 快速迭代阶段
这些项目今天表现出明显的高频修复和高密度讨论：
- **Hermes Agent**
- **OpenClaw**
- **IronClaw**
- **ZeroClaw**
- **CoPaw**

特征：
- Issues/PR 多
- 反馈集中在生产级问题
- 功能和修复同时推进
- 维护压力较高

## 平台巩固阶段
这些项目更像是在“把已具备的能力做稳定”：
- **OpenClaw**
- **NanoBot**
- **LobsterAI**
- **PicoClaw**
- **NullClaw**

特征：
- 不是追求数量增长，而是打磨链路正确性
- 更关注状态、权限、兼容性、恢复能力
- 用户对“稳定可用”的要求高于新功能

## 低活跃/需求积累阶段
- **Moltis**
- **TinyClaw**
- **ZeptoClaw**

特征：
- 动态少
- 更偏需求讨论或无活动
- 需要后续验证路线图是否推进

---

# 7) 值得关注的趋势信号

## 1. 安全默认值正在取代“默认开放”
从 OpenClaw、Hermes、NanoClaw、Moltis、PicoClaw、ZeroClaw 的反馈看，生态共识正在变成：  
**agent 不应默认拥有太多能力，安全边界必须显式定义。**

对开发者的启示：
- 未来的默认权限模型会更严格
- sandbox、allowlist、scope token 会成为标配
- “能跑”不再是优势，“可控”才是

## 2. “静默失败”是当前最不能接受的体验问题
OpenClaw、NanoBot、CoPaw、ZeroClaw、LobsterAI 都在强调消息丢失、状态回退、返回 200 但实际失败等问题。  
用户越来越不能容忍“表面成功、实际丢失”。

启示：
- 必须做端到端可验证成功
- 失败要显式、可追踪、可回放
- 消息/事件/状态机必须有审计点

## 3. 多渠道不再是附加功能，而是核心产品能力
Telegram、Discord、Slack、Feishu、WhatsApp、BlueBubbles、Web、Desktop 都在被不断接入。  
这说明 agent 产品的竞争，正在从单一聊天界面转向**多入口统一工作流**。

启示：
- 渠道适配层要独立抽象
- 结构化消息保真比“能发出去”更重要
- 每个渠道都要有自己的权限和回调治理

## 4. 可观测性正在成为生产门槛
NanoBot 的 audit、IronClaw 的 diagnostics、Hermes 的 dashboard、OpenClaw 的审计硬化，说明社区已经把“可观测”看作生产前提。

启示：
- 未来 agent 平台必须内置 tracing/audit/log tail
- 运行时上下文要显式暴露给模型和运维
- 不可观测的系统难以进入真正生产环境

## 5. 长会话、记忆与恢复能力正在成为核心竞争力
从 session memory、history consolidation、gateway reconnect、memory provider、approval persistence 等问题可以看出：  
**AI 智能体已经从一次性问答，进入持续工作流阶段。**

启示：
- 长会话稳定性会直接决定用户留存
- 记忆系统必须具备一致性与可恢复性
- 任何“自动清理/压缩/重连”都不能破坏用户意图

---

# 简要结论

今天的生态不是单纯“热闹”，而是进入了**平台化成熟前夜**：  
- **OpenClaw** 代表了安全治理与平台收敛；
- **Hermes / ZeroClaw / CoPaw** 代表多端适配与体验压力；
- **IronClaw** 代表可控工作流与企业化；
- **NanoBot / PicoClaw / NullClaw / LobsterAI** 则分别在正确性、协议、连接与交互上持续补课。

对开发者来说，下一阶段最值得投入的不是再造一个“会说话的 agent”，而是打造一个**安全、可观测、可恢复、可跨渠道运行**的智能体平台。  

如果你愿意，我可以把这份报告进一步整理成：
1. **一页式高层摘要**，或  
2. **带优先级建议的投资/技术路线图版**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-06-13）

## 1) 今日速览
过去 24 小时内，NanoBot 维持了**较高活跃度**：新增/活跃 Issues 2 条，PR 更新 12 条，其中 2 条已关闭，10 条仍在推进中。  
从内容看，讨论焦点集中在**API 兼容性、上下文/记忆稳定性、输入校验、WebUI 配置一致性**等“底层质量”问题，说明项目正处于**快速迭代 + 集中打磨稳定性**阶段。  
今日没有新版本发布，但开放 PR 涵盖了多个关键能力方向，后续版本的功能面仍在持续扩张。  
整体健康度判断：**活跃且方向明确，但契约一致性与运行时健壮性仍是当前主要风险点**。  
相关仓库：<https://github.com/HKUDS/nanobot>

---

## 2) 版本发布
今日**无新版本发布**。  
版本页：<https://github.com/HKUDS/nanobot/releases>

---

## 3) 项目进展
今日共有 **2 条 PR 已收束（CLOSED）**，其余 **10 条仍为 OPEN**，表明项目主要推进仍在功能合并与缺陷修补阶段。

### 今日已收束的重要方向
- **Audit 可观测性方向已出现收束迹象**  
  - PR #4318 / #4319：`feat(audit): Add tools.audit for agent action observability`  
  - 这类 PR 聚焦于工具调用审计、事件记录与传输方式，说明项目正在补齐**Agent 行为可观测性**能力。  
  - 链接：  
    - <https://github.com/HKUDS/nanobot/pull/4318>  
    - <https://github.com/HKUDS/nanobot/pull/4319>

### 今日仍在推进的主要功能/修复
- **WebUI 与 config.json 配置打通**：PR #4313  
  - 目标是缩小 WebUI 面板与配置文件之间的能力差距，提升可配置性和一致性。  
  - <https://github.com/HKUDS/nanobot/pull/4313>

- **TTS 多提供商支持**：PR #4316  
  - 引入 OpenAI / Groq / ElevenLabs 等多提供商文本转语音配置，增强多模态输出能力。  
  - <https://github.com/HKUDS/nanobot/pull/4316>

- **API 使用量真实透传**：PR #4310  
  - 直接对接当前 Issue #4309 的痛点，修复 `/v1/chat/completions` 返回 usage 全 0 的问题。  
  - <https://github.com/HKUDS/nanobot/pull/4310>

- **Dream/Memory/工具参数健壮性修复**：PR #4321、#4315、#4312、#4311  
  - 分别覆盖 Dream 游标推进、历史记录容错、媒体附件校验、文件分页参数校验等。  
  - 这些 PR 明显在提升**运行时稳定性与异常输入防御能力**。  
  - 链接：  
    - <https://github.com/HKUDS/nanobot/pull/4321>  
    - <https://github.com/HKUDS/nanobot/pull/4315>  
    - <https://github.com/HKUDS/nanobot/pull/4312>  
    - <https://github.com/HKUDS/nanobot/pull/4311>

### 今日整体推进量判断
- **已完成收束：2 条 PR**
- **继续推进：10 条 PR**
- 说明项目今日并非“单点修 bug”，而是在同步推进**产品能力扩展 + 质量补强**，研发节奏偏快，且涉及面广。

---

## 4) 社区热点
今日最活跃的讨论基本集中在**高优先级 Bug**与**基础能力补强 PR**上。

### 热点 Issues
1. **#4307 — Post-turn consolidation wipes the agent's own delivery message**  
   - 评论数：1  
   - 反应：0  
   - 链接：<https://github.com/HKUDS/nanobot/issues/4307>  
   - 关注点：长对话、低上下文窗口时，turn 结束后的 consolidation 会把 agent 自己刚发出的 delivery message 归档掉，导致用户后续引用丢失。  
   - 诉求本质：**保留对话可追溯性与消息链完整性**，避免“看得见但接不住”的上下文损失。

2. **#4309 — `/v1/chat/completions` always returns zero usage tokens**  
   - 评论数：0  
   - 反应：0  
   - 链接：<https://github.com/HKUDS/nanobot/issues/4309>  
   - 关注点：OpenAI 兼容接口返回 usage 但始终为 0，直接影响计费和监控。  
   - 诉求本质：**API 兼容性与商业化/观测链路的正确性**。

### 热点 PR（从方向上看）
- **#4310**：修复 usage 透传，和 #4309 强关联  
  - <https://github.com/HKUDS/nanobot/pull/4310>
- **#4313**：WebUI / config parity，属于用户最容易感知的配置一致性问题  
  - <https://github.com/HKUDS/nanobot/pull/4313>
- **#4316**：TTS 多供应商支持，属于功能扩张型热点  
  - <https://github.com/HKUDS/nanobot/pull/4316>

### 热点背后的共性诉求
社区当前更关心的不是“增加一个炫功能”，而是：
- **输出结果是否可追踪**
- **接口是否符合 OpenAI 生态预期**
- **配置是否前后一致**
- **异常输入下是否稳定**

---

## 5) Bug 与稳定性
按严重程度排序：

### 高优先级
1. **#4307 — Consolidation 归档后丢失 agent 自己的 delivery message**  
   - 链接：<https://github.com/HKUDS/nanobot/issues/4307>  
   - 影响：会破坏长对话中的消息引用链，影响用户 follow-up 与上下文连续性。  
   - 风险判断：**较高**，因为这是对话系统的核心稳定性问题。  
   - 是否已有 fix PR：**未见直接对应的修复 PR**。

2. **#4309 — `/v1/chat/completions` usage 全为 0**  
   - 链接：<https://github.com/HKUDS/nanobot/issues/4309>  
   - 影响：下游计费、日志分析、监控面板都可能失真。  
   - 风险判断：**高**，属于对外 API 契约错误。  
   - 是否已有 fix PR：**有**，PR #4310  
   - <https://github.com/HKUDS/nanobot/pull/4310>

### 中优先级稳定性修复
- **#4315 — 忽略 malformed history entries**  
  - <https://github.com/HKUDS/nanobot/pull/4315>  
  - 目标是防止历史数据污染 prompt / Dream 读取链路。

- **#4312 — reject malformed media attachments**  
  - <https://github.com/HKUDS/nanobot/pull/4312>  
  - 避免媒体参数异常导致工具运行出错。

- **#4311 — reject non-positive file pagination limits**  
  - <https://github.com/HKUDS/nanobot/pull/4311>  
  - 加强工具边界校验，减少越界/空集问题。

- **#4321 — Dream disabled 时 advance cursor**  
  - <https://github.com/HKUDS/nanobot/pull/4321>  
  - 防止禁用 Dream 后 prompt 逐步膨胀，属于长期稳定性问题。

### 稳定性结论
今天的 bug 报告和修复 PR 都指向同一类问题：  
**系统在“长运行 + 异常输入 + 兼容接口”场景下的鲁棒性仍需持续加强。**

---

## 6) 功能请求与路线图信号
今日的 PR 方向已经透露出较明确的路线图信号：

### 可能进入下一版本的功能方向
1. **WebUI 与配置体系统一**
   - PR #4313  
   - <https://github.com/HKUDS/nanobot/pull/4313>  
   - 这是典型的“提升可用性与可维护性”的版本级需求，优先级较高。

2. **Agent 行为审计 / 可观测性**
   - PR #4320、#4318、#4319  
   - <https://github.com/HKUDS/nanobot/pull/4320>  
   - <https://github.com/HKUDS/nanobot/pull/4318>  
   - <https://github.com/HKUDS/nanobot/pull/4319>  
   - 说明项目正在向“可审计、可追踪、适合生产”的方向演进。

3. **TTS 多供应商接入**
   - PR #4316  
   - <https://github.com/HKUDS/nanobot/pull/4316>  
   - 属于明显的新能力扩展，若合并，容易成为下一版亮点功能。

4. **WhatsApp 交互增强**
   - PR #4317  
   - <https://github.com/HKUDS/nanobot/pull/4317>  
   - 面向真实通信场景，体现渠道能力扩展。

### 也很可能被优先纳入的“质量型路线图”
- #4310 usage 透传修复  
  - <https://github.com/HKUDS/nanobot/pull/4310>
- #4321 / #4315 / #4312 / #4311 一组稳定性修复  
  - <https://github.com/HKUDS/nanobot/pull/4321>  
  - <https://github.com/HKUDS/nanobot/pull/4315>  
  - <https://github.com/HKUDS/nanobot/pull/4312>  
  - <https://github.com/HKUDS/nanobot/pull/4311>

---

## 7) 用户反馈摘要
从今日 Issues/PR 的描述里，可以提炼出几个很真实的用户痛点与使用场景：

### 真实痛点
- **长对话中上下文会断**
  - 来自 #4307  
  - 用户希望 agent 的回复和后续引用保持完整可追溯，而不是在 consolidation 后“消失”。

- **OpenAI 兼容接口必须返回真实 usage**
  - 来自 #4309 / #4310  
  - 这类用户通常已经把 NanoBot 接入了下游计费、监控或网关系统，零 usage 会直接让外部系统失效。

- **WebUI 和配置文件不要“两套逻辑”**
  - 来自 #4313  
  - 用户希望通过 UI 改配置后，行为与 `config.json` 完全一致，避免认知负担和同步错误。

- **系统要能容忍脏数据与错误参数**
  - 来自 #4315 / #4312 / #4311  
  - 说明真实部署中会遇到历史记录损坏、附件格式异常、分页参数非法等“非理想输入”。

### 使用场景画像
- 长时对话式 agent
- 带审计需求的生产环境
- 兼容 OpenAI 生态的 API 服务
- 多渠道通讯（含 WhatsApp）
- 需要语音输出或多模态交互的场景

### 用户满意点
- 项目功能扩展速度快
- 已开始补齐可观测性、配置一致性和多渠道能力
- 对问题响应覆盖面广，说明维护方向清晰

### 用户不满意点
- 一些核心接口还未完全对齐生态预期
- 长上下文与异常数据场景下仍有稳定性缺口
- 部分能力已经进入需求期，但在 UI/API/运行时之间尚未完全统一

---

## 8) 待处理积压
从本日数据看，**尚未出现明显“长期未响应”的历史积压项**；不过，当前有 **10 条开放 PR**，如果 review 节奏放缓，容易形成新的堆积。

### 建议优先关注的开放项
- **#4310** — 直接修复 API usage 透传，关联用户痛点最强  
  <https://github.com/HKUDS/nanobot/pull/4310>

- **#4313** — WebUI / config parity，影响面广  
  <https://github.com/HKUDS/nanobot/pull/4313>

- **#4316** — TTS 多提供商，功能扩展明显  
  <https://github.com/HKUDS/nanobot/pull/4316>

- **#4321** — Dream 关闭时游标推进，属于隐性积累型问题  
  <https://github.com/HKUDS/nanobot/pull/4321>

- **#4315 / #4312 / #4311** — 一组输入校验和容错修复  
  <https://github.com/HKUDS/nanobot/pull/4315>  
  <https://github.com/HKUDS/nanobot/pull/4312>  
  <https://github.com/HKUDS/nanobot/pull/4311>

### 维护提示
虽然目前数据中没有“跨周未响应”的明显陈旧项，但这些开放 PR 多数属于**基础能力/稳定性/契约正确性**，建议尽快完成 review，避免在下一轮迭代中叠加出更大的集成风险。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发给团队群的精简版**，或  
2. **适合放进周报/晨会纪要的表格版**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-06-13）

## 1. 今日速览
过去 24 小时，Hermes Agent 保持了**高强度活跃**：Issues 更新 50 条、PR 更新 50 条，但**尚无新版本发布**。从内容看，社区关注点高度集中在**网关适配、CLI 体验、Telegram/BlueBubbles 等平台兼容性、配置回归与安全硬化**，说明项目仍处于“快速修补 + 持续打磨”的阶段。  
今日新增/活跃问题以 **P2/P3 级 bug** 为主，同时也出现了若干新功能诉求，表明项目的使用面继续扩张。整体判断：**活跃度高，维护压力中等偏高，健康度取决于后续能否把高频兼容问题快速收敛到下一版**。

---

## 3. 项目进展
> 说明：今日可见 PR 中，多数仍处于 Open；在展示列表里，**明确已关闭的关键 PR 是 1 个**，其余合并/关闭项未在片段中展开。

- **[#45318](https://github.com/nousresearch/hermes-agent/pull/45318) 已关闭**：修复 BlueBubbles Webhook 将 `127.0.0.1` 归一化为 `localhost` 的问题，避免 macOS 等 IPv6 优先环境下 IPv4 webhook 投递失败。  
  这类修复直接提升了 iMessage/BlueBubbles 链路可靠性，是典型的“高影响稳定性修补”。

- **当天的开放 PR 主题非常集中**，说明维护者与贡献者正在围绕核心痛点并行推进：  
  - 代理/提供商兼容：[#45330](https://github.com/nousresearch/hermes-agent/pull/45330)、[#45316](https://github.com/nousresearch/hermes-agent/pull/45316)
  - Telegram 体验：[#45327](https://github.com/nousresearch/hermes-agent/pull/45327)、[#45312](https://github.com/nousresearch/hermes-agent/pull/45312)
  - CLI/安装兼容：[#45324](https://github.com/nousresearch/hermes-agent/pull/45324)
  - 安全与观测：[#45315](https://github.com/nousresearch/hermes-agent/pull/45315)、[#45326](https://github.com/nousresearch/hermes-agent/pull/45326)

**推进判断**：今天的开发重心明显偏向“修复可用性与兼容性”，不是大功能扩张。若这些 PR 继续合流，下一版很可能是一个**以稳定性修复为主的整合版本**。

---

## 4. 社区热点
今日讨论最活跃的 Issues 主要有两类：**高频 bug** 与 **跨平台使用痛点**。

1. **[#45242](https://github.com/nousresearch/hermes-agent/issues/45242)** / **[#45241](https://github.com/nousresearch/hermes-agent/issues/45241)**  
   `auxiliary_client.py` 对 `oauth_minimax` auth_type 未处理，导致 minimax-oauth 用户的辅助任务全线失效。  
   - 评论数：2 / 1  
   - 背后诉求：用户已经在真实工作流中依赖辅助任务（压缩、视觉、标题生成、搜索等），一处认证兼容问题会放大成“全链路不可用”。

2. **[#45230](https://github.com/nousresearch/hermes-agent/issues/45230)**  
   gateway 在长工具调用中断后重复 replay 尾部，可能引发**无限重执行循环**。  
   - 评论数：2  
   - 背后诉求：用户关心的是“会不会稳定、会不会重复执行、会不会烧资源”，属于典型的生产可用性问题。

3. **[#45290](https://github.com/nousresearch/hermes-agent/issues/45290)**  
   “危险命令审批”提示缺少人类可读解释，获得了 **1 个点赞**。  
   - 这反映出社区对“安全但不劝退”的审批 UX 有明确需求。

4. **[#45323](https://github.com/nousresearch/hermes-agent/issues/45323)**、**[#45308](https://github.com/nousresearch/hermes-agent/issues/45308)**  
   Telegram rich tables 被重写成 bullets、BlueBubbles 本地回环地址被误改写。  
   - 背后诉求：多平台输出要尽量保真，别把结构化消息“翻译坏了”。

---

## 5. Bug 与稳定性
按严重程度排序：

### 最高优先级：安全风险
- **[#45160](https://github.com/nousresearch/hermes-agent/issues/45160)**  
  TUI gateway 存在 2 处 `shell=True` 子进程调用，存在 **RCE 风险**。  
  - 影响：高  
  - 当前状态：未见对应修复 PR（在展示列表中）  
  - 建议：应优先处理，属于安全类阻断问题。

### P2：网关/平台兼容性回归
- **[#45308](https://github.com/nousresearch/hermes-agent/issues/45308)**  
  BlueBubbles `_webhook_url` 把 `127.0.0.1` 归一化成 `localhost`，在 IPv6 优先环境下导致 webhook 失效。  
  - 对应修复 PR：**[#45318](https://github.com/nousresearch/hermes-agent/pull/45318)**（已关闭），另有硬化 PR **[#45317](https://github.com/nousresearch/hermes-agent/pull/45317)**

- **[#45146](https://github.com/nousresearch/hermes-agent/issues/45146)**  
  Copilot Business/Enterprise 用户在 token exchange 阶段返回 404。  
  - 影响：中高  
  - 当前状态：未见修复 PR  
  - 风险：影响企业用户接入，容易被误判为“Copilot 整体不可用”。

- **[#45309](https://github.com/nousresearch/hermes-agent/issues/45309)**  
  `fallback_providers` 放在 `model:` 下会被静默忽略。  
  - 对应修复 PR：**[#45316](https://github.com/nousresearch/hermes-agent/pull/45316)**

### P3：体验、兼容与稳定性细节
- **[#45272](https://github.com/nousresearch/hermes-agent/issues/45272)**  
  CLI 流式输出在终端软换行下会断词，影响阅读体验。  
  - 当前状态：未见修复 PR

- **[#45321](https://github.com/nousresearch/hermes-agent/issues/45321)**  
  Termux 安装 wrapper 的 shebang 在 Android 环境下失效。  
  - 对应修复 PR：**[#45324](https://github.com/nousresearch/hermes-agent/pull/45324)**

- **[#45303](https://github.com/nousresearch/hermes-agent/issues/45303)**  
  `monitor` 与 `session_search` 辅助模型未出现在 picker 中。  
  - 对应修复 PR：**[#45306](https://github.com/nousresearch/hermes-agent/pull/45306)**

- **[#45241](https://github.com/nousresearch/hermes-agent/issues/45241)**  
  `oauth_minimax` 未处理导致辅助任务失败。  
  - 当前状态：已出现重复问题（duplicate），但展示列表中未见直接修复 PR

- **[#45332](https://github.com/nousresearch/hermes-agent/issues/45332)**  
  跨 provider fallback 时残留 `reasoning_content`，导致非思考型 provider 返回 400/422。  
  - 当前状态：未见修复 PR

---

## 6. 功能请求与路线图信号
今天出现的功能诉求，明显指向三个路线方向：

### A. 跨平台会话与上下文统一
- **[#45275](https://github.com/nousresearch/hermes-agent/issues/45275)**：Desktop 与 Telegram 的 session history 统一  
- **[#45331](https://github.com/nousresearch/hermes-agent/issues/45331)**：YAML + git backed 的持久 memory provider

**判断**：这是“长期价值型需求”，若后续要扩展生态，统一会话/记忆层很可能会进入路线图。

### B. 更安全、更可解释的执行控制
- **[#45291](https://github.com/nousresearch/hermes-agent/issues/45291)**：文件工具白名单  
- **[#45290](https://github.com/nousresearch/hermes-agent/issues/45290)**：危险命令审批提示的人类可读化

**判断**：这两项与安全和可控性强相关，尤其适合在企业/重度用户场景中落地，优先级值得提高。

### C. 工作流增强与自动化能力
- **[#45305](https://github.com/nousresearch/hermes-agent/issues/45305)**：HQ harness evidence dashboard 集成  
- **[#45322](https://github.com/nousresearch/hermes-agent/pull/45322)**：cron per-job `max_turns` override  
- **[#45314](https://github.com/nousresearch/hermes-agent/pull/45314)**：辅助链 fallback 提示增强

**判断**：这些更像“下一版可装配的增量增强”，其中 **[#45322](https://github.com/nousresearch/hermes-agent/pull/45322)** 与 **[#45314](https://github.com/nousresearch/hermes-agent/pull/45314)** 这类 PR 跟现有产品能力贴得很近，最有机会进入近期版本。

---

## 7. 用户反馈摘要
从 Issues 描述里，用户的真实痛点非常清晰：

- **“我需要它在不同平台上表现一致”**  
  Telegram 富消息、BlueBubbles webhook、Desktop 侧栏文件树、CLI 流式输出，都是在追求一致且可预期的体验。  
  相关链接：[#45323](https://github.com/nousresearch/hermes-agent/issues/45323)、[#45308](https://github.com/nousresearch/hermes-agent/issues/45308)、[#45286](https://github.com/nousresearch/hermes-agent/issues/45286)、[#45272](https://github.com/nousresearch/hermes-agent/issues/45272)

- **“我不希望一个小配置错误就让整条链路失效”**  
  例如 `oauth_minimax`、fallback 配置层级、reasoning_content 兼容、Copilot 企业版 404。  
  相关链接：[#45241](https://github.com/nousresearch/hermes-agent/issues/45241)、[#45309](https://github.com/nousresearch/hermes-agent/issues/45309)、[#45332](https://github.com/nousresearch/hermes-agent/issues/45332)、[#45146](https://github.com/nousresearch/hermes-agent/issues/45146)

- **“我希望它更安全，但不要变得难用”**  
  文件工具白名单、命令审批解释化，说明用户既关注安全，也希望系统能给出足够上下文帮助决策。  
  相关链接：[#45291](https://github.com/nousresearch/hermes-agent/issues/45291)、[#45290](https://github.com/nousresearch/hermes-agent/issues/45290)

- **“我需要更强的跨设备连续性”**  
  Desktop/Telegram 会话统一与持久 memory provider 都是在解决这一类诉求。  
  相关链接：[#45275](https://github.com/nousresearch/hermes-agent/issues/45275)、[#45331](https://github.com/nousresearch/hermes-agent/issues/45331)

---

## 8. 待处理积压
以下条目建议维护者优先关注，尤其是 P1/P2 与安全类：

- **[#45160](https://github.com/nousresearch/hermes-agent/issues/45160)**：TUI `shell=True` RCE 风险，安全优先级最高
- **[#45146](https://github.com/nousresearch/hermes-agent/issues/45146)**：Copilot 企业版/商务版 404
- **[#45291](https://github.com/nousresearch/hermes-agent/issues/45291)**：文件工具白名单
- **[#45290](https://github.com/nousresearch/hermes-agent/issues/45290)**：危险命令审批解释化
- **[#45275](https://github.com/nousresearch/hermes-agent/issues/45275)**：跨端 session 统一
- **[#45272](https://github.com/nousresearch/hermes-agent/issues/45272)**：CLI 流式输出断词
- **[#45332](https://github.com/nousresearch/hermes-agent/issues/45332)**：fallback 时 `reasoning_content` 残留
- **[#45305](https://github.com/nousresearch/hermes-agent/issues/45305)**：HQ harness dashboard 集成（功能型积压）

**PR 侧值得继续盯住的待审项**：
- **[#45322](https://github.com/nousresearch/hermes-agent/pull/45322)**、**[#45327](https://github.com/nousresearch/hermes-agent/pull/45327)**、**[#45324](https://github.com/nousresearch/hermes-agent/pull/45324)**、**[#45316](https://github.com/nousresearch/hermes-agent/pull/45316)**、**[#45315](https://github.com/nousresearch/hermes-agent/pull/45315)**

---

### 总体结论
Hermes Agent 今天呈现出非常典型的“**高活跃、强修复、低发布**”状态：社区提出了大量真实场景中的兼容性/稳定性问题，维护方向则集中在网关、Telegram、CLI、安全与 provider 兼容。若当前这些 PR 能顺利收敛，下一版更可能是一个**稳定性增强型版本**，而不是功能大跃迁版本。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报｜2026-06-13

## 1) 今日速览
过去 24 小时内，PicoClaw 维持了**较高的工程活跃度**：共有 **1 条 Issue 更新** 和 **6 条 PR 变动**，但**没有新版本发布**。  
从内容看，今日工作重心明显偏向 **稳定性修复、协议/生命周期完善**，以及 **能力扩展** 三条线并行推进。  
已关闭的两条 PR 都属于“修复型”提交，说明项目在持续做底层质量加固；同时还有 4 条开放 PR，表明开发节奏仍在前进。  
综合判断，项目当前处于**健康、活跃、以修复驱动为主的迭代阶段**。  
相关链接：[#3112](https://github.com/sipeed/picoclaw/pull/3112)、[#3113](https://github.com/sipeed/picoclaw/pull/3113)、[#3114](https://github.com/sipeed/picoclaw/issues/3114)

---

## 3) 项目进展
今日最有代表性的进展来自两条已关闭 PR：

- **[#3112](https://github.com/sipeed/picoclaw/pull/3112)** `fix(tools): handle json.Marshal error in toolloop tool call arguments`  
  修复了 toolloop 中工具调用参数序列化错误被静默吞掉的问题。  
  影响点在于：一旦参数不可序列化，历史记录里会丢失真实工具调用内容，属于**数据完整性修复**。

- **[#3113](https://github.com/sipeed/picoclaw/pull/3113)** `fix(channels): check json marshal/unmarshal errors in toChannelHashes`  
  修复了 channel 配置哈希计算中多处 JSON 错误未检查的问题。  
  这类问题通常会影响 **配置一致性、调试可见性和后续状态判断**，属于**基础设施级修复**。

与此同时，4 条开放 PR 继续把项目往更强的能力边界推进：

- **[#3115](https://github.com/sipeed/picoclaw/pull/3115)**：修复通用工具输出中的 `data:image/...;base64,...` 被误识别为真实附件的问题
- **[#3116](https://github.com/sipeed/picoclaw/pull/3116)**：补全 Pico `turn.done` 生命周期信号
- **[#3117](https://github.com/sipeed/picoclaw/pull/3117)**：将媒体 turn 路由到图像模型
- **[#3118](https://github.com/sipeed/picoclaw/pull/3118)**：为 `picoclaw agent` 增加远程 WebSocket 模式

**整体推进判断：**今天的改动并不是单点修补，而是同时覆盖了“工具调用可靠性”“通道配置正确性”“多模态路由”“Pico 协议生命周期”“远程接入能力”等关键面，说明项目正从“能用”向“更稳、更广、更易集成”继续推进。  
相关链接：[#3112](https://github.com/sipeed/picoclaw/pull/3112)、[#3113](https://github.com/sipeed/picoclaw/pull/3113)、[#3115](https://github.com/sipeed/picoclaw/pull/3115)、[#3116](https://github.com/sipeed/picoclaw/pull/3116)、[#3117](https://github.com/sipeed/picoclaw/pull/3117)、[#3118](https://github.com/sipeed/picoclaw/pull/3118)

---

## 4) 社区热点
今日最值得关注的社区议题来自：

- **[#3114](https://github.com/sipeed/picoclaw/issues/3114)** `[Future Request] Telegram 渠道按对话类型（私聊/群组/频道）的权限分级控制`

这是今天唯一新增/活跃的 Issue，虽然当前**评论数为 0**、互动不多，但它触及的是一个非常明确的真实诉求：  
**现有 `allow_from` 只能控制“谁能用”，但不能控制“在什么对话类型里能用”。**

从诉求内容看，用户关心的是：
- **私聊**：希望开放全部能力
- **群组/频道**：希望限制高风险操作，例如 `exec`、`write_file`、`delete_file` 等

这说明用户正在把 PicoClaw 从个人助手拓展到更复杂的 Telegram 场景，但同时也希望项目具备更强的**安全边界**和**权限分层**。  
这类需求往往会推动后续增加更细粒度的 channel policy 设计。  
相关链接：[#3114](https://github.com/sipeed/picoclaw/issues/3114)

---

## 5) Bug 与稳定性
今日没有新增崩溃类 Issue，但有多条**直接针对稳定性/正确性**的修复工作在推进，按影响优先级整理如下：

1. **工具调用参数丢失风险**  
   - PR：[#3112](https://github.com/sipeed/picoclaw/pull/3112)  
   - 问题：`json.Marshal(tc.Arguments)` 错误被忽略，可能导致工具调用参数在历史中变成空字符串  
   - 影响：**数据丢失、回放不完整、排障困难**  
   - 状态：**已有修复 PR，已关闭**

2. **通道哈希计算中的序列化错误被静默吞掉**  
   - PR：[#3113](https://github.com/sipeed/picoclaw/pull/3113)  
   - 问题：`toChannelHashes` 中多个 JSON 错误未处理  
   - 影响：**配置一致性、状态判断可靠性下降**  
   - 状态：**已有修复 PR，已关闭**

3. **工具输出中的 base64 data URL 被误识别为真实媒体附件**  
   - PR：[#3115](https://github.com/sipeed/picoclaw/pull/3115)  
   - 问题：`read_file`、`exec` 等工具输出里的文本内容可能被错误解析为媒体  
   - 影响：**会话历史污染、附件误提取、上下文异常**  
   - 状态：**已有 fix PR，待合并**

4. **Pico `turn.done` 生命周期信号不完整**  
   - PR：[#3116](https://github.com/sipeed/picoclaw/pull/3116)  
   - 问题：请求 ID 保留、队列消息等生命周期环节存在缺口  
   - 影响：**协议状态不完整、后续处理链路不稳定**  
   - 状态：**已有 fix PR，待合并**

5. **媒体 turn 误路由到文本模型**  
   - PR：[#3117](https://github.com/sipeed/picoclaw/pull/3117)  
   - 问题：媒体 turns / `load_image` follow-ups 没有稳定进入图像模型  
   - 影响：**多模态能力退化、请求失败重试增加**  
   - 状态：**已有 fix PR，待合并**

总体来看，今天的稳定性工作信号是积极的：**问题不是集中爆发，而是围绕几个高价值薄弱点做系统性修补**。  
相关链接：[#3112](https://github.com/sipeed/picoclaw/pull/3112)、[#3113](https://github.com/sipeed/picoclaw/pull/3113)、[#3115](https://github.com/sipeed/picoclaw/pull/3115)、[#3116](https://github.com/sipeed/picoclaw/pull/3116)、[#3117](https://github.com/sipeed/picoclaw/pull/3117)

---

## 6) 功能请求与路线图信号
今天最明确的功能请求来自：

- **[#3114](https://github.com/sipeed/picoclaw/issues/3114)** Telegram 按对话类型进行权限分级

结合现有 PR，可以看出当前路线图信号大致分成两类：

### 更可能进入近期版本的方向
- **远程 Agent 模式**：[#3118](https://github.com/sipeed/picoclaw/pull/3118)  
  这是相对独立、边界清晰的能力扩展，若评审顺利，很可能进入下一轮版本。

- **生命周期/协议补完**：[#3116](https://github.com/sipeed/picoclaw/pull/3116)  
  属于基础能力完善，通常优先级较高。

- **媒体路由修复**：[#3117](https://github.com/sipeed/picoclaw/pull/3117)  
  直接影响多模态可用性，也更容易被纳入下一次修复发布。

### 需要更长设计周期的方向
- **Telegram 对话类型权限分级**：[#3114](https://github.com/sipeed/picoclaw/issues/3114)  
  这不是简单开关，而是涉及“会话类型 + 操作风险等级 + 通道策略”的权限模型设计，可能需要先完成需求抽象，再进入实现。

**判断：**如果项目计划发下一个补丁/小版本，优先级更高的 likely candidates 是 **#3112/#3113 类修复** 与 **#3115/#3116/#3117** 这类稳定性增强；而 **#3114** 更像中短期的安全能力路线图。  
相关链接：[#3114](https://github.com/sipeed/picoclaw/issues/3114)、[#3116](https://github.com/sipeed/picoclaw/pull/3116)、[#3117](https://github.com/sipeed/picoclaw/pull/3117)、[#3118](https://github.com/sipeed/picoclaw/pull/3118)

---

## 7) 用户反馈摘要
从今天的 Issue 内容看，用户的核心反馈可以概括为：

- **现有权限控制不够细**：`allow_from` 只能区分“允许谁”，不能区分“允许在什么场景下使用”
- **群组/频道场景有明显安全顾虑**：用户担心机器人在多人环境中执行危险操作
- **希望默认安全边界更强**：特别是对 `exec`、文件读写、删除等高风险能力，希望在群组和频道中默认收紧

这反映出一个很真实的使用场景：  
用户已经不满足于“私人助手”，而是在尝试把 PicoClaw 放进 **Telegram 的公共协作环境**，因此对**权限分层**和**风险隔离**的需求显著上升。  
当前反馈中没有看到明显负面评论，但可以明确感受到：**用户期待更强的安全默认值和更细粒度的策略控制**。  
相关链接：[#3114](https://github.com/sipeed/picoclaw/issues/3114)

---

## 8) 待处理积压
基于今天的公开数据，**没有足够证据表明存在“长期未响应”的老积压**；不过，当前仍有几项值得维护者尽快关注的未完成工作：

- **新功能/安全策略需求**：[#3114](https://github.com/sipeed/picoclaw/issues/3114)
- **待合并的稳定性修复**：[#3115](https://github.com/sipeed/picoclaw/pull/3115)、[#3116](https://github.com/sipeed/picoclaw/pull/3116)、[#3117](https://github.com/sipeed/picoclaw/pull/3117)、[#3118](https://github.com/sipeed/picoclaw/pull/3118)

从维护角度看，当前最需要及时 triage 的不是历史欠账，而是这些**高相关、低评论、仍在排队的关键改动**。  
如果这些 PR 能尽快完成评审，项目有望在稳定性和能力边界上同步前进一步。  
相关链接：[#3114](https://github.com/sipeed/picoclaw/issues/3114)、[#3115](https://github.com/sipeed/picoclaw/pull/3115)、[#3116](https://github.com/sipeed/picoclaw/pull/3116)、[#3117](https://github.com/sipeed/picoclaw/pull/3117)、[#3118](https://github.com/sipeed/picoclaw/pull/3118)

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合微信群/飞书的短版摘要**，或  
2. **更适合周报归档的表格版**。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-06-13）

## 1) 今日速览
过去 24 小时，NanoClaw 处于**“高提交、低合并”**状态：新增/更新了 8 条 PR，但尚无 PR 合并或关闭，说明核心开发活跃度较高，代码变更主要停留在审查与讨论阶段。  
Issue 侧仅有 1 条更新且已关闭，显示维护团队在问题分流上仍保持响应，但整体社区讨论热度不高。  
当前没有新版本发布，意味着今日没有面向用户的正式交付。  
综合来看，项目健康度偏中上：**开发推进积极，但交付节奏略慢，积压审查工作较多**。  
- 相关链接： [Issues 列表](https://github.com/qwibitai/nanoclaw/issues)｜[PR 列表](https://github.com/qwibitai/nanoclaw/pulls)

---

## 2) 版本发布
**今日无新版本发布。**  
- Releases： [GitHub Releases](https://github.com/qwibitai/nanoclaw/releases)

---

## 3) 项目进展
今日**没有 PR 合并或关闭**，因此从“已落地成果”看，项目本日没有产生新的可用功能版本。  
不过，8 条当日 PR 集中覆盖了**稳定性、安全性、连接器能力、记忆能力、依赖升级**等关键方向，说明项目仍在向“可上线、可扩展、可治理”的阶段推进。

### 今日最值得关注的推进方向
- **运行稳定性修复**
  - [#2750 fix: recover stale outbound.db journals after container kills; classify hot-journal poll races](https://github.com/qwibitai/nanoclaw/pull/2750)
  - 价值：针对容器被杀死后数据库 journal 残留、热 journal 轮询竞争等问题做恢复性修复，属于高优先级稳定性工作。

- **安全加固**
  - [#2748 security: harden agent containers (cap-drop, no-new-privileges, pids-limit)](https://github.com/qwibitai/nanoclaw/pull/2748)
  - [#2749 security: gate agent-requested npm installs by package release age](https://github.com/qwibitai/nanoclaw/pull/2749)
  - 价值：分别从容器权限与 npm 包发布年龄两个层面收紧安全边界，说明项目正在提升面向代理执行环境的抗滥用能力。

- **平台/能力扩展**
  - [#2746 feat(providers): agent-surfaces capability seam](https://github.com/qwibitai/nanoclaw/pull/2746)
  - [#2745 feat(memory): opt-in persistent memory scaffold for providers](https://github.com/qwibitai/nanoclaw/pull/2745)
  - [#2747 feat(onecli): SDK 2.2.1 — credential-stub mounts + machine-checkable pins](https://github.com/qwibitai/nanoclaw/pull/2747)
  - 价值：在 provider 能力抽象、持久记忆、SDK 适配上继续搭建基础设施，为后续生态扩展打底。

### 今日整体推进量判断
- **合并产出：0**
- **审查中变更：8 条 PR**
- **实质推进：偏“中期基础工程建设”而非“面向用户的功能上线”**
  
这意味着 NanoClaw 当前的主要进展不是功能展示，而是围绕**可靠性、安全性、可扩展性**的底层打磨。

---

## 4) 社区热点
今日可见的讨论热度整体偏低：**没有明显的高评论或高反应条目**，所有列出的 Issue/PR 评论数与 👍 基本为 0 或未提供。  
从内容上看，最值得关注的“热点”仍然是**问题驱动型需求**，而不是社区争论型议题。

### 重点 Issue
- [#2751 [CLOSED] Budget-exhausted LLM turns are silently dropped — user gets no reply](https://github.com/qwibitai/nanoclaw/issues/2751)

### 重点 PR
- [#2750 fix: recover stale outbound.db journals after container kills; classify hot-journal poll races](https://github.com/qwibitai/nanoclaw/pull/2750)
- [#2748 security: harden agent containers (cap-drop, no-new-privileges, pids-limit)](https://github.com/qwibitai/nanoclaw/pull/2748)
- [#2749 security: gate agent-requested npm installs by package release age](https://github.com/qwibitai/nanoclaw/pull/2749)

### 热点背后的诉求
- **可靠性诉求**：用户更在意“任务是否能稳定完成”，例如预算耗尽时不应静默失败。
- **安全诉求**：代理执行环境的最小权限、包安装治理正在成为社区重点。
- **可观测性诉求**：问题一旦发生，用户希望系统明确反馈，而不是“看似成功但实际上丢失”。

---

## 5) Bug 与稳定性
今日最重要的 Bug 来自已关闭 Issue，属于**高影响、用户可感知**问题。

### 高优先级
- [#2751 [CLOSED] Budget-exhausted LLM turns are silently dropped — user gets no reply](https://github.com/qwibitai/nanoclaw/issues/2751)  
  **问题摘要**：当 OneCLI 云组织达到共享密钥预算上限时，网关返回一个“伪造的 HTTP 200 assistant message”，但 agent SDK 将其视为正常 LLM 响应，最终导致用户**没有收到回复**。  
  **影响判断**：这是一个典型的“静默失败”问题，风险高于普通报错，因为它会让用户误以为系统正常工作。  
  **是否已有 fix PR**：当前提供的数据中**未看到明确对应的修复 PR**，建议继续跟踪是否已有后续补丁进入队列。

### 其他稳定性相关 PR
- [#2750 fix: recover stale outbound.db journals after container kills; classify hot-journal poll races](https://github.com/qwibitai/nanoclaw/pull/2750)  
  **意义**：修复容器异常退出后的数据库状态恢复问题，降低数据层不一致与任务卡死风险。  
  **严重程度**：高（偏基础设施稳定性）。

---

## 6) 功能请求与路线图信号
今天的 PR 队列已经给出较清晰的路线图信号：项目正在往**更强的 provider 抽象、更安全的执行环境、更可靠的记忆/上下文能力**推进。

### 明显的功能/能力信号
- [#2746 feat(providers): agent-surfaces capability seam](https://github.com/qwibitai/nanoclaw/pull/2746)  
  **信号**：provider 能力抽象化，说明项目在为多 provider/多能力接入做统一接口。

- [#2745 feat(memory): opt-in persistent memory scaffold for providers](https://github.com/qwibitai/nanoclaw/pull/2745)  
  **信号**：持久记忆能力是个人 AI 助手的重要方向，未来很可能进入下一版本的核心路线。

- [#2747 feat(onecli): SDK 2.2.1 — credential-stub mounts + machine-checkable pins](https://github.com/qwibitai/nanoclaw/pull/2747)  
  **信号**：依赖与凭证挂载能力的升级，通常意味着在为更复杂的运行模式或更严格的供应链安全做准备。

### 更可能进入下一版本的方向
结合当前 PR 内容，以下方向最有可能在下一版本中被优先纳入：
1. **稳定性修复先行**：#2750 这类基础设施修复优先级很高。
2. **安全默认值升级**：#2748、#2749 反映出运行安全正在成为默认目标。
3. **记忆与 provider 抽象**：#2745、#2746 更像中长期能力底座，适合在下一阶段逐步开放。

---

## 7) 用户反馈摘要
从当前 Issue 文本可以提炼出较明确的用户痛点：

### 真实痛点
- **“系统没有回复”比“系统报错”更糟**  
  [#2751](https://github.com/qwibitai/nanoclaw/issues/2751) 反映用户在预算耗尽时没有得到明确失败反馈，导致任务中断却无感知。
  
- **希望失败可解释、状态可追踪**  
  该 Issue 指向的是“预算耗尽”场景下的产品体验缺口：用户需要知道是额度问题，而不是以为模型失灵或网络异常。

### 使用场景
- **OneCLI 云组织共享密钥场景**
- **LLM turn 调用链路中的预算控制**
- **代理/网关在异常条件下的消息回传可靠性**

### 满意/不满意点
- **不满意**：静默丢弃响应，用户体验差且容易误判系统状态。
- **隐含满意点**：问题能被快速定位到“fabricated HTTP 200”与 SDK 处理逻辑，说明系统链路已具备一定可诊断性。

---

## 8) 待处理积压
当前最明显的积压不是长期沉默的老 Issue，而是**一天内集中涌入但尚未处理完的 8 条 PR**。由于这些条目全部仍处于 OPEN 状态，维护者需要关注审查吞吐。

### 重点待处理 PR
- [#2753 fix(hooks): pre-commit fell open when pnpm was missing from PATH](https://github.com/qwibitai/nanoclaw/pull/2753)
- [#2752 fix: stage inbound attachments that expose only a url (Discord)](https://github.com/qwibitai/nanoclaw/pull/2752)
- [#2750 fix: recover stale outbound.db journals after container kills; classify hot-journal poll races](https://github.com/qwibitai/nanoclaw/pull/2750)
- [#2749 security: gate agent-requested npm installs by package release age](https://github.com/qwibitai/nanoclaw/pull/2749)
- [#2748 security: harden agent containers (cap-drop, no-new-privileges, pids-limit)](https://github.com/qwibitai/nanoclaw/pull/2748)
- [#2747 feat(onecli): SDK 2.2.1 — credential-stub mounts + machine-checkable pins](https://github.com/qwibitai/nanoclaw/pull/2747)
- [#2746 feat(providers): agent-surfaces capability seam](https://github.com/qwibitai/nanoclaw/pull/2746)
- [#2745 feat(memory): opt-in persistent memory scaffold for providers](https://github.com/qwibitai/nanoclaw/pull/2745)

### 维护提醒
- **优先级建议**：安全相关 > 稳定性修复 > 运行体验修复 > 功能扩展
- **风险点**：如果这些 PR 长时间停留在待审状态，项目会出现“代码活跃但交付迟滞”的印象。
- **当前数据下未见长期无响应老 PR/Issue**，但“今日新增积压”已经足够提醒维护者提高审查效率。

---

### 总结判断
NanoClaw 今日表现出明显的**工程深化期特征**：安全、稳定性、架构抽象和能力底座同时推进，但缺少合并产出与版本发布，说明项目正处在“忙于打基础、尚未集中交付”的阶段。  
如果后续能优先落地 #2750、#2748、#2749 这类高价值变更，并补齐 #2751 所暴露的静默失败问题，项目健康度会进一步提升。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报（2026-06-13）
仓库：<https://github.com/nullclaw/nullclaw>

---

## 1. 今日速览

今天 NullClaw 的公开活动整体偏低，**没有新增 Issue、没有新版本发布**，但有 **1 条正在推进的修复型 PR**，说明项目维护重心仍集中在稳定性与连接恢复路径的打磨上。  
从活跃度看，项目处于**低噪音、低波动**状态：社区讨论几乎为空，说明当前没有大规模功能争议或集中报障。  
值得注意的是，唯一的 PR 聚焦于 Discord gateway 断线恢复逻辑，属于典型的“基础体验修复”，这通常对机器人/智能体类项目的实际可用性影响较大。  
综合判断，NullClaw 今日健康度稳定，但外显活跃度偏低，当前进展主要体现在底层稳定性改进而非功能扩张。  
相关仓库与变更入口：<https://github.com/nullclaw/nullclaw>

---

## 2. 版本发布

**今日无新版本发布。**  
Releases 为空，暂无可追踪的版本更新、破坏性变更或迁移事项。  
Release 页面：<https://github.com/nullclaw/nullclaw/releases>

---

## 3. 项目进展

### 重要 PR：#953 `fix(discord): recover closed gateway sockets`
- 状态：**OPEN**
- 作者：vernonstinebaker
- 创建/更新：2026-06-12
- 链接：<https://github.com/nullclaw/nullclaw/pull/953>

#### 推进内容
该 PR 主要围绕 Discord gateway 重连链路做稳定性修复，摘要显示其关键动作包括：
- 在重连清理阶段，**先关闭当前活跃的 Discord gateway socket**
- 在加入 heartbeat 线程前，避免旧连接残留导致状态错乱
- 将 **stalled pre-HELLO reconnects** 在有限宽限期后判定为不健康
- 增加了针对 **重连健康状态** 与 **session 保留** 的回归测试

#### 对项目的意义
这类修复通常不会带来新功能数量上的增长，但会显著提升：
- 断线后的恢复成功率
- 机器人在线稳定性
- 异常网络条件下的自愈能力
- 生产环境中长连接会话的可靠性

#### 进展评估
如果该 PR 合并，项目会在“连接恢复可靠性”这一核心基础能力上向前推进一大步，属于**高价值稳定性增量**，虽然不是面向用户界面的显性功能，但对真实使用体验的提升通常更明显。  
PR 链接：<https://github.com/nullclaw/nullclaw/pull/953>

---

## 4. 社区热点

### 今日没有形成明显社区热点
- 过去 24 小时 **Issues 更新为 0**
- 过去 24 小时 **PR 仅 1 条**
- 评论数与反应数均未显示出活跃聚集

因此，今日没有可识别的高讨论度 Issue/PR，也没有明显的“社区焦点议题”。  
**推断背后原因**：项目当前更多处于维护修复阶段，而非功能争论或需求爆发阶段。  
当前可观察入口：
- Issues：<https://github.com/nullclaw/nullclaw/issues>
- PR #953：<https://github.com/nullclaw/nullclaw/pull/953>

---

## 5. Bug 与稳定性

### 1) Discord gateway 重连/会话恢复稳定性问题
- 相关 PR：#953
- 链接：<https://github.com/nullclaw/nullclaw/pull/953>
- 严重程度：**中-高**
- 判断依据：
  - “closed gateway sockets”
  - “stalled pre-HELLO gateway reconnects”
  - “reconnect health”
  - “session preservation”

#### 说明
虽然今日没有新增 Bug Issue，但 PR 标题和摘要明确指向一个实际稳定性问题：在 Discord gateway 重连场景下，可能出现旧 socket 未正确关闭、心跳线程与重连状态交错、以及 pre-HELLO 阶段卡死等情况。  
这类问题会表现为：
- 机器人断线后无法顺利恢复
- 偶发在线状态异常
- 会话无法保留或恢复延迟过长

#### 是否已有 fix PR
**有，PR #953 即为对应修复。**  
链接：<https://github.com/nullclaw/nullclaw/pull/953>

### 2) 今日新增 Bug 报告
- **无新增 Issue 报告**
- Issues 页面：<https://github.com/nullclaw/nullclaw/issues>

---

## 6. 功能请求与路线图信号

### 今日无新增功能请求
当前 24 小时内没有 Issues，因此没有新的用户功能诉求可直接提炼。  
Issues 页面：<https://github.com/nullclaw/nullclaw/issues>

### 路线图信号
尽管没有新功能需求，但 PR #953 释放出一个很明确的路线图信号：  
**项目当前优先级更偏向“连接稳定性、重连鲁棒性、会话恢复”而非新增能力。**

这通常意味着下一版本若有发布，可能会包含：
- Discord 长连接与重连流程优化
- 心跳/会话恢复相关的内部可靠性改进
- 伴随稳定性修复的回归测试增强

PR 链接：<https://github.com/nullclaw/nullclaw/pull/953>

---

## 7. 用户反馈摘要

### 今日无 Issues 评论可提炼
- 没有新增 Issues
- 没有评论活跃数据
- 没有可见的用户反馈样本

因此，今天无法从评论中抽取真实用户痛点、使用场景或满意/不满意点。  
Issues 总览：<https://github.com/nullclaw/nullclaw/issues>

### 可间接推断的用户关注点
从 PR #953 的修复方向来看，现有用户可能最在意的是：
- Discord 连接是否稳定
- 断线后是否能自动恢复
- 长时间运行时是否存在会话丢失
- 网络抖动下是否会出现卡死或僵尸连接

PR 链接：<https://github.com/nullclaw/nullclaw/pull/953>

---

## 8. 待处理积压

### 当前可见积压较轻
基于今日数据：
- Issues：0
- Open PR：1
- Release：0

从公开信号看，**积压压力较低**，没有明显的大量未响应问题堆积。  
但需要关注的是：

#### 待处理 PR #953
- 状态：OPEN
- 链接：<https://github.com/nullclaw/nullclaw/pull/953>
- 关注点：
  - 是否会引入重连路径上的副作用
  - 回归测试是否覆盖充分
  - 是否需要补充对其他 gateway 异常场景的兼容性验证

### 维护建议
维护者可以优先评估这条 PR，因为它直接关系到项目的核心在线稳定性。  
仓库主页：<https://github.com/nullclaw/nullclaw>

---

## 总体结论

NullClaw 今天没有明显的社区热度或版本发布动作，但**单条高相关度修复 PR** 显示出项目仍在持续打磨底层稳定性。  
对 AI 智能体/个人助手类项目而言，这类“连接恢复”和“会话保活”修复往往比表面功能更影响长期可用性。  
整体来看，项目当前状态是：**活跃度偏低、健康度稳定、维护方向清晰，且以修复驱动为主。**

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-06-13）

## 1) 今日速览
过去 24 小时，IronClaw 处于**高活跃、强迭代**状态：Issues 更新 26 条、PR 更新 23 条，说明项目当前正处在集中修复与能力收敛期，而不是静默维护期。  
虽然**没有新版本发布**，但今天的变更明显偏向于把 Reborn 的核心体验补齐：包括 approval 流程、Slack 路由、DeferredBusy 处理、运行时上下文和 CI 稳定性。  
从结果看，项目已经完成了一批关键闭环 PR，同时又引入了更多面向架构和可观测性的后续工作，整体呈现出**“边修边补、持续扩展”**的健康节奏。  
不过，安全告警、CI 阻塞、以及少数体验回归仍在拉高维护压力，短期内稳定性工作仍会是主线。  
相关链接： [Issues](https://github.com/nearai/ironclaw/issues) ｜ [Pull Requests](https://github.com/nearai/ironclaw/pulls)

---

## 2) 版本发布
今日**无新版本发布**。  
链接： [Releases](https://github.com/nearai/ironclaw/releases)

---

## 3) 项目进展
今天最重要的推进，集中在 **Reborn 交互链路** 与 **安全/CI 基础设施** 两条线上。

### 已关闭/完成的关键 PR
- **DeferredBusy 消息自动清理链路完成**：`#4812` 关闭，解决了阻塞运行结束后，挂起消息不会永久吞掉的问题；同时其后续设计争议也被拆成了独立问题继续推进。  
  链接： [PR #4812](https://github.com/nearai/ironclaw/pull/4812) ｜ [Issue #4817](https://github.com/nearai/ironclaw/issues/4817)

- **Slack 阻塞反馈补齐**：`#4811` 关闭，改善了消息被 gate 延迟时“无声失败”的体验，让用户能及时知道消息只是被 deferred，而不是丢失。  
  链接： [PR #4811](https://github.com/nearai/ironclaw/pull/4811)

- **Slack gate 路由修复**：`#4799` 关闭，修复了 delivered-route 解析问题，改善了 Slack DM 场景下 approval prompt 的可达性。  
  链接： [PR #4799](https://github.com/nearai/ironclaw/pull/4799)

- **运行时上下文的第一阶段落地**：`#4795` 关闭，Reborn prompt bundle 开始携带 loop-start 时间信息，为模型提供更准确的时间上下文。  
  链接： [PR #4795](https://github.com/nearai/ironclaw/pull/4795)

- **依赖安全修复**：`#4826` 关闭，更新 postgres 相关 crate 以消除 RUSTSEC 风险，并直接对应当前 CI 报警。  
  链接： [PR #4826](https://github.com/nearai/ironclaw/pull/4826) ｜ [Issue #4824](https://github.com/nearai/ironclaw/issues/4824)

### 进展解读
今天的变化不是单点 bugfix，而是把一个“阻塞消息 / gate / 路由 / 反馈 / 上下文”的整条链路向前推进了一大步。  
如果按主题统计，项目已经在 **Reborn 运行态可用性** 上建立了更完整的闭环：  
- 前端有反馈；
- 阻塞消息能恢复；
- 路由能命中；
- prompt 里开始包含更多 runtime 信息。  

同时，CI 与依赖安全也在被系统性处理，这说明项目不仅在做功能演进，也在补基础设施债务。  
链接： [PR 列表](https://github.com/nearai/ironclaw/pulls) ｜ [Issues 列表](https://github.com/nearai/ironclaw/issues)

---

## 4) 社区热点
> 说明：当前数据里 PR 的评论数未展开，因此“热度”主要依据 **Issue 评论数**、问题重要性以及与之对应的 PR 活跃度综合判断。

### 热点 1：approval 作用域持久化
- `#4825` 有 3 条评论，是今天讨论最集中的问题之一。核心诉求是：用户在一个线程里选择 **“always allow”** 后，应该在后续线程中继续生效，而不是每个新线程都重新审批。  
  链接： [Issue #4825](https://github.com/nearai/ironclaw/issues/4825) ｜ [PR #4835](https://github.com/nearai/ironclaw/pull/4835)

**背后诉求**：用户希望审批行为具备“会话外延续性”，减少重复打扰，这是典型的 agent 工作流体验优化。

### 热点 2：DeferredBusy drain 的设计边界
- `#4817` 有 3 条评论，虽然 PR `#4812` 已经把功能做出来了，但社区仍在继续讨论“如何 resubmit”“stale intent 如何处理”“启动时是否 sweep”等架构边界。  
  链接： [Issue #4817](https://github.com/nearai/ironclaw/issues/4817) ｜ [PR #4812](https://github.com/nearai/ironclaw/pull/4812)

**背后诉求**：大家不只想要“能跑”，还想要“可解释、可扩展、不会积累隐性队列债务”。

### 热点 3：DeferredBusy 相关的一组跟进问题
- `#4831` 有 2 条评论，说明自动恢复链路引发了对工作流回放入口的进一步思考。  
  链接： [Issue #4831](https://github.com/nearai/ironclaw/issues/4831) ｜ [PR #4812](https://github.com/nearai/ironclaw/pull/4812)

**背后诉求**：希望“阻塞消息恢复”不仅正确，还要符合产品工作流边界。

### 次级热点：CI / 测试分片 / 安全告警
- `#4813`、`#4824`、`#4828`、`#4836` 等都没有评论数优势，但它们代表的是高优先级工程议题：CI 反馈太慢、安全告警阻塞、运行时上下文不足。  
  链接： [Issue #4813](https://github.com/nearai/ironclaw/issues/4813) ｜ [Issue #4824](https://github.com/nearai/ironclaw/issues/4824) ｜ [Issue #4828](https://github.com/nearai/ironclaw/issues/4828) ｜ [PR #4836](https://github.com/nearai/ironclaw/pull/4836)

---

## 5) Bug 与稳定性
以下按影响面和风险大致从高到低排列：

### 1. 安全级问题：`write_file` 沙箱可逃逸
- `#4797` 指出 `write_file` 工具可通过 dangling final symlink 写出 base_dir 沙箱，属于**高严重度安全问题**。  
- 当前数据里**未看到对应 fix PR**。  
  链接： [Issue #4797](https://github.com/nearai/ironclaw/issues/4797)

### 2. Repo 级 CI 阻塞：postgres RUSTSEC 告警
- `#4824` 说明 `cargo deny` 在 main 和所有 open PR 上失败，已经影响合并与验证流程。  
- **已有修复 PR**：`#4826`，且该 PR 已关闭。  
  链接： [Issue #4824](https://github.com/nearai/ironclaw/issues/4824) ｜ [PR #4826](https://github.com/nearai/ironclaw/pull/4826)

### 3. 执行稳定性回归：Capability 执行后出现 `driver_unavailable`
- `#4789` 描述的是一个已经关闭的运行时失败：第一次 capability 调用成功后，后续可能报 `driver_unavailable`。  
- 当前数据里**未显示明确的修复 PR 链接**，建议继续跟踪是否由其他闭环 PR 间接修复。  
  链接： [Issue #4789](https://github.com/nearai/ironclaw/issues/4789)

### 4. 工具状态异常：GitHub 工具在拒绝/取消后仍保持 RUN
- `#4800` 影响审批拒绝与认证取消后的状态收敛，属于典型的工作流状态机问题。  
- 当前数据里**未看到 fix PR**。  
  链接： [Issue #4800](https://github.com/nearai/ironclaw/issues/4800)

### 5. UI 回归与可用性问题
- `#4823`：删除 Running 会话失败时缺少 UI 反馈。  
- `#4794`：非换行 code block 导致整个聊天视图横向滚动。  
- `#4819`：Light theme 下附件警告 banner 可读性差。  
- 这些问题暂未看到对应修复 PR。  
  链接： [Issue #4823](https://github.com/nearai/ironclaw/issues/4823) ｜ [Issue #4794](https://github.com/nearai/ironclaw/issues/4794) ｜ [Issue #4819](https://github.com/nearai/ironclaw/issues/4819)

### 6. 时间感知缺失
- `#4796` 指出模型在没有显式用 time tool 的情况下，可能对当前日期/时间判断错误，影响日程、提醒等场景。  
- 当前未见修复 PR。  
  链接： [Issue #4796](https://github.com/nearai/ironclaw/issues/4796)

---

## 6) 功能请求与路线图信号
从今天新增/活跃的需求看，IronClaw 下一阶段很可能继续围绕 **Reborn 的“模型感知能力”** 和 **工作流可解释性** 展开。

### 可能进入下一版本的强信号
- **运行时上下文切片**：`#4828` 希望把 connected channels、outbound delivery state、run origin 暴露给模型；对应 PR `#4836` 已经打开。  
  这类能力通常很容易进入近期版本，因为它直接提升模型在多通道、多目标场景下的决策质量。  
  链接： [Issue #4828](https://github.com/nearai/ironclaw/issues/4828) ｜ [PR #4836](https://github.com/nearai/ironclaw/pull/4836)

- **approval 的跨线程持久化**：`#4825` 已有 PR `#4835`，且属于显著的用户体验痛点。  
  这类“减少重复审批”的改动通常会优先进入下一轮发布。  
  链接： [Issue #4825](https://github.com/nearai/ironclaw/issues/4825) ｜ [PR #4835](https://github.com/nearai/ironclaw/pull/4835)

- **CI 分片与测试加速**：`#4813` 及其下游 PR `#4820`、`#4821`、`#4816`、`#4815`、`#4814` 组成了明显的工程路线图。  
  这不是“新功能”但会显著影响发布节奏与反馈速度，因此很可能在近期持续合并。  
  链接： [Issue #4813](https://github.com/nearai/ironclaw/issues/4813) ｜ [PR #4820](https://github.com/nearai/ironclaw/pull/4820) ｜ [PR #4821](https://github.com/nearai/ironclaw/pull/4821)

### 其他较明确的产品信号
- `#4801` Reborn operator diagnostics：说明项目开始补“可诊断性”能力。  
  链接： [PR #4801](https://github.com/nearai/ironclaw/pull/4801)
- `#4804` operator log tail/follow：偏运维体验增强。  
  链接： [PR #4804](https://github.com/nearai/ironclaw/pull/4804)
- `#4803` / `#4802` WebUI 视觉与可读性改进：说明前端可用性仍在持续打磨。  
  链接： [PR #4803](https://github.com/nearai/ironclaw/pull/4803) ｜ [PR #4802](https://github.com/nearai/ironclaw/pull/4802)

---

## 7) 用户反馈摘要
从 Issues 的描述内容看，用户反馈已经非常聚焦在“**agent 交互是否足够顺滑**”这个层面，而不是单纯功能有没有：

- **重复审批太打扰**：`#4825` 反映“always allow”不应只在单线程有效，用户希望权限记忆更持久。  
  链接： [Issue #4825](https://github.com/nearai/ironclaw/issues/4825)

- **阻塞消息需要显式反馈**：`#4811`、`#4831` 说明用户不接受“消息被延后但看不到结果”的沉默状态。  
  链接： [Issue #4811](https://github.com/nearai/ironclaw/issues/4811) ｜ [Issue #4831](https://github.com/nearai/ironclaw/issues/4831)

- **时间相关回答不能猜**：`#4796` 表明用户会在日程、提醒、today/tomorrow 这类任务中直接依赖模型的时间感知。  
  链接： [Issue #4796](https://github.com/nearai/ironclaw/issues/4796)

- **认证与引导文案不一致**：`#4806` 反映 GitHub 扩展 onboarding 引导 Fine-grained PAT，但实际认证只对 Classic PAT 工作，这会明显损害信任感。  
  链接： [Issue #4806](https://github.com/nearai/ironclaw/issues/4806)

- **UI 反馈和可读性仍需加强**：`#4823`、`#4819`、`#4794` 表明用户在删除反馈、主题对比度、代码块排版上都遇到了真实阻碍。  
  链接： [Issue #4823](https://github.com/nearai/ironclaw/issues/4823) ｜ [Issue #4819](https://github.com/nearai/ironclaw/issues/4819) ｜ [Issue #4794](https://github.com/nearai/ironclaw/issues/4794)

总体来看，用户对 IronClaw 的要求已经从“功能可用”升级到“**状态可解释、上下文可延续、交互不打断**”。  
链接： [Issues](https://github.com/nearai/ironclaw/issues)

---

## 8) 待处理积压
严格说，今天列出的多数条目都还是 **2026-06-12 新近提出**，不算“长期积压”。但从影响面和优先级看，以下未结项值得维护者优先盯紧：

- **安全优先**：`#4797` `write_file` 沙箱逃逸。  
  链接： [Issue #4797](https://github.com/nearai/ironclaw/issues/4797)

- **发布阻塞优先**：`#4824` cargo-deny repo-wide fail（虽已有修复 PR `#4826`，但应确认修复真正进入基线）。  
  链接： [Issue #4824](https://github.com/nearai/ironclaw/issues/4824) ｜ [PR #4826](https://github.com/nearai/ironclaw/pull/4826)

- **用户体验优先**：`#4825` 跨线程 approval 持久化、`#4800` GitHub 工具 RUN 状态异常、`#4823` 删除失败无反馈。  
  链接： [Issue #4825](https://github.com/nearai/ironclaw/issues/4825) ｜ [Issue #4800](https://github.com/nearai/ironclaw/issues/4800) ｜ [Issue #4823](https://github.com/nearai/ironclaw/issues/4823)

- **工程效率优先**：`#4813` 长 CI job 拆分，以及对应的分片 PR `#4820/#4821`。  
  链接： [Issue #4813](https://github.com/nearai/ironclaw/issues/4813) ｜ [PR #4820](https://github.com/nearai/ironclaw/pull/4820) ｜ [PR #4821](https://github.com/nearai/ironclaw/pull/4821)

- **产品边界待定**：`#4793` 关于首次引导是否阻止 Extensions / Automations 的问题，属于需要产品决策的开放项。  
  链接： [Issue #4793](https://github.com/nearai/ironclaw/issues/4793)

---

### 总体判断
IronClaw 今天的状态可以概括为：**功能演进继续、质量修复加速、架构边界开始收敛**。  
短期内项目健康度不错，但也暴露出三个持续压力点：**安全告警、CI 反馈时长、Reborn 交互一致性**。  
如果接下来 `#4835`、`#4836`、`#4820/#4821` 继续推进，项目会在“模型上下文能力”和“开发效率”两侧同时获得明显收益。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

以下为 **2026-06-13 LobsterAI（netease-youdao/LobsterAI）项目动态日报**。整体看，今天是一个**“开发交付为主、社区互动偏弱”**的日子：24 小时内没有 Issues 变动、没有新 Release，但有 **5 个 PR 关闭**，主要集中在 **发布合并、媒体保存修复、Computer Use 运行时升级、语音输入并发修复、cowork 流式消息元数据修复** 等核心链路，说明项目仍处于持续迭代与修补阶段，且维护者对主流程稳定性保持较高关注。

---

## 1) 今日速览

- 今天仓库整体表现为**低问题、高交付**：没有新增/活跃 Issues，说明外部反馈压力较小；但 PR 侧保持活跃，且 5 个更新全部关闭，表明开发节奏仍在推进。
- 从合并内容看，项目今天的重点不是新功能大爆发，而是围绕 **Computer Use、语音输入、cowork 流式体验、媒体资产保存** 做稳定性和体验修复。
- 虽然未见新的 GitHub Releases，但 `chore(release)` 类型 PR 已进入主干，说明**版本交付动作已发生**，只是公开 release tag/页面尚未同步可见。
- 综合判断：LobsterAI 今日处于**中低社区活跃度、较高工程推进度**状态，健康度偏稳，问题暴露少，维护重心偏向产品打磨与发布收敛。

参考：
- 仓库主页：https://github.com/netease-youdao/LobsterAI
- Issues：https://github.com/netease-youdao/LobsterAI/issues
- Pull Requests：https://github.com/netease-youdao/LobsterAI/pulls

---

## 2) 版本发布

**今日未检测到新的公开 Release。**

- 最新 Releases：无  
  链接：https://github.com/netease-youdao/LobsterAI/releases

补充观察：
- 虽然没有新 Release 页面，但 PR **#2158** 显示已将 `release/2026.6.11` 合并回 `main`，摘要写明这是为 **2026.6.12 release** 做的合并动作。
- 这意味着项目内部可能已经完成版本收敛，但**公开发布物未在 GitHub Releases 中体现**，维护者可能仍在等待 tag/发布页面同步。

---

## 3) 项目进展

今天关闭的 5 个 PR，几乎都围绕“核心体验稳定化”推进：

### 1. #2158 `chore(release): merge release/2026.6.11 into main`
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2158
- 作用：将发布分支合并回主干，标志着一个发布周期完成收口。
- 亮点：
  - 引入 **Computer Use MVP** 和内置 kit
  - 增加 cowork 场景的 **实时 ASR 语音输入**
  - 增加 **HTML artifact 公共分享模式选择**
  - 增加 **image / SVG artifact 分享支持**
- 影响：这是今天最重要的集成动作，说明项目功能栈已向“多模态协作 + artifact 分享 + 计算机代理”方向继续扩展。

### 2. #2157 `fix(media): 修正文生图保存图片的扩展名`
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2157
- 作用：修复生成图片保存时扩展名错误的问题，避免 PNG 内容被错误保存为 `.jpg/.jpeg/.webp`。
- 价值：
  - 提升导出文件可用性
  - 减少用户在本地打开文件时的格式误判
  - 增强下载/保存链路的一致性
- 影响：属于典型的高体验价值修复，说明项目对“产出物正确性”很重视。

### 3. #2156 `fix(computer-use): bump runtime to 1.0.7`
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2156
- 作用：升级托管的 Computer Use runtime 到 1.0.7。
- 价值：
  - 更新 runtime 安装包、SHA-256、size 元数据
  - 新 runtime 增加了 **UIA breadcrumbs**，便于定位 helper 异常退出问题
- 影响：这表明 Computer Use 相关能力已经进入较快迭代阶段，且维护者正在完善诊断与可观测性。

### 4. #2155 `fix(voice-input): prevent duplicate realtime ASR starts`
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2155
- 作用：防止 cowork 语音输入流程中重复触发 realtime ASR start 请求。
- 价值：
  - 修复并发/竞态问题
  - 降低语音输入启动异常概率
  - 为“设计说明”补充 race 行为文档
- 影响：说明语音输入功能正在从“能用”走向“可稳定使用”。

### 5. #2154 `fix(cowork): show model metadata after stopped streams`
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2154
- 作用：在手动停止流式回复后，仍保留并展示模型元数据。
- 价值：
  - 改善 stopped stream 场景的信息完整性
  - 避免中断后丢失模型来源/元信息
  - 增加回归覆盖
- 影响：属于 cowork 交互体验层面的精细化修复，能减少用户对“停止后信息消失”的困惑。

### 今日整体推进幅度评估
- 今天没有新增面向外部的“重大发布”，但从工程质量角度看，项目推进非常实在：
  - **1 个发布收口 PR**
  - **4 个用户体验/稳定性修复 PR**
- 这类组合通常意味着项目正在进行**版本稳定化与细节补强**，而不是快速扩张功能面。
- 对用户来说，今天的进展主要体现在：**更稳的语音输入、更可靠的图片保存、更可诊断的 Computer Use、更完整的 cowork 流式体验**。

---

## 4) 社区热点

**今日未观察到明显社区热点。**

- Issues 数量：0
- PR 评论：`undefined`，未见有效评论记录
- 反应数：全部为 0

这意味着今天仓库的互动主要是**代码层推进**，而不是围绕某个问题展开公开讨论。

相关入口：
- Issues：https://github.com/netease-youdao/LobsterAI/issues
- Pull Requests：https://github.com/netease-youdao/LobsterAI/pulls

### 背后诉求解读
- 没有评论与 reaction，通常代表：
  1. 维护者对修复方向已有明确共识；
  2. 用户侧反馈尚未集中到仓库；
  3. 当前讨论热点可能沉淀在内部协作渠道，而非 GitHub。
- 从 PR 类型看，社区最关心的隐性诉求是：
  - **功能可用性**（Computer Use、语音输入）
  - **导出正确性**（媒体文件格式）
  - **协作过程可理解性**（stream 停止后的元数据展示）

---

## 5) Bug 与稳定性

### 今日新增/活跃 Bug
**未见新的 Issues 报告。**

- Issues 总览：https://github.com/netease-youdao/LobsterAI/issues

### 今日已识别的稳定性相关修复（按重要性排序）

#### 高优先级
1. **#2155 重复触发 realtime ASR start**
   - 链接：https://github.com/netease-youdao/LobsterAI/pull/2155
   - 风险：语音输入流程可能因并发启动导致异常、重复请求或状态错乱
   - 状态：**已有 fix PR**

2. **#2156 Computer Use runtime 升级，增强 helper 诊断能力**
   - 链接：https://github.com/netease-youdao/LobsterAI/pull/2156
   - 风险：helper 意外退出、运行时兼容性问题
   - 状态：**已有 fix PR**

#### 中优先级
3. **#2157 文生图保存扩展名错误**
   - 链接：https://github.com/netease-youdao/LobsterAI/pull/2157
   - 风险：导出文件格式与真实内容不一致，影响用户本地打开、分享和自动化处理
   - 状态：**已有 fix PR**

4. **#2154 停止流式回复后模型元数据丢失**
   - 链接：https://github.com/netease-youdao/LobsterAI/pull/2154
   - 风险：信息展示不完整，影响用户判断回复来源与模型状态
   - 状态：**已有 fix PR**

### 稳定性结论
今天没有公开的线上 Bug 报告，且已有 4 个稳定性/一致性问题被直接修复，说明项目对核心链路的“已知问题清理”做得比较扎实。当前看不到明显的高危未修复缺陷。

---

## 6) 功能请求与路线图信号

虽然今天没有 Issues，但从合并 PR 的内容可以推断出一些明显的路线图信号：

### 1. Computer Use 正在成为重点能力
- 证据：#2158、#2156
- 链接：
  - https://github.com/netease-youdao/LobsterAI/pull/2158
  - https://github.com/netease-youdao/LobsterAI/pull/2156
- 判断：
  - `Computer Use MVP` 已进入主干
  - runtime 仍在快速迭代
  - 未来很可能继续围绕 **稳定性、可观测性、兼容性** 继续增强
- 路线图信号：**高概率纳入下一版本重点**

### 2. cowork 语音输入和流式交互在持续打磨
- 证据：#2155、#2154、#2158
- 链接：
  - https://github.com/netease-youdao/LobsterAI/pull/2155
  - https://github.com/netease-youdao/LobsterAI/pull/2154
  - https://github.com/netease-youdao/LobsterAI/pull/2158
- 判断：
  - 重复 ASR 启动、停止流后元数据丢失，都是典型的真实使用场景问题
  - 说明团队重心已经从“把功能做出来”转向“把协作体验做顺”
- 路线图信号：**大概率继续收敛在 cowork 交互体验**

### 3. artifact 分享能力在扩展
- 证据：#2158 提到 HTML / image / SVG artifact sharing
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2158
- 判断：
  - 说明项目开始强化“可分享输出”能力
  - 对 AI 协作助手而言，这通常意味着从单点对话走向**可传播、可复用的产物**
- 路线图信号：**值得关注后续是否继续补齐更多 artifact 类型和权限控制**

### 4. 媒体资产处理正在补齐边角问题
- 证据：#2157
- 链接：https://github.com/netease-youdao/LobsterAI/pull/2157
- 判断：
  - 看似小修复，但对产品成熟度影响很大
  - 可能预示着后续会继续处理下载、预览、格式识别等周边链路
- 路线图信号：**中等概率继续扩展到更多文件/媒体处理场景**

---

## 7) 用户反馈摘要

**今日无 Issues 评论可供提炼。**

- Issues 页面：https://github.com/netease-youdao/LobsterAI/issues

不过结合今天 PR 的修复方向，可以反推出用户的真实痛点和使用场景：

### 可能的真实痛点
1. **用户保存生成图片时，文件名后缀不可信**
   - 反映出用户会把生成图下载到本地，并依赖扩展名判断格式
   - 这一问题对普通用户和自动化处理都很敏感
   - 相关 PR：#2157  
     https://github.com/netease-youdao/LobsterAI/pull/2157

2. **语音输入在协作场景中可能被重复启动**
   - 说明用户在 cowork 场景中可能频繁触发语音输入
   - 并发启动会影响输入连续性与可用性
   - 相关 PR：#2155  
     https://github.com/netease-youdao/LobsterAI/pull/2155

3. **用户希望在停止生成后仍保留模型信息**
   - 这类需求通常来自“我想知道刚才到底是哪个模型生成的”这种可追溯诉求
   - 相关 PR：#2154  
     https://github.com/netease-youdao/LobsterAI/pull/2154

### 满意/不满意信号
- 满意点：项目对边缘体验问题响应很快，说明维护积极。
- 不满意点：今天没有可见的用户公开反馈，可能意味着社区反馈通道使用率较低，或者用户问题尚未汇聚到 GitHub。

---

## 8) 待处理积压

**基于当前可见数据，未发现明显的长期未响应开放 Issue 或 PR 积压。**

- Issues：0 条
- PR：今日 5 条均已关闭
- Issues 页面：https://github.com/netease-youdao/LobsterAI/issues
- PR 页面：https://github.com/netease-youdao/LobsterAI/pulls

### 需要维护者额外关注的点
1. **Release 页面同步**
   - 现象：PR 已显示 release 合并，但 Releases 页面仍无新版本
   - 链接：https://github.com/netease-youdao/LobsterAI/releases
   - 建议：确认是否存在 tag/发布页同步延迟，避免外部用户误判为“未发布”

2. **持续跟踪 Computer Use runtime 稳定性**
   - 链接：https://github.com/netease-youdao/LobsterAI/pull/2156
   - 原因：该模块处于快速演进阶段，容易在不同环境引发兼容问题

3. **继续观察语音输入竞态**
   - 链接：https://github.com/netease-youdao/LobsterAI/pull/2155
   - 原因：竞态类问题常在真实高频使用后再次暴露，建议加强回归测试

---

## 总体结论

今天的 LobsterAI 是一个**稳定推进、弱社区反馈、强工程迭代**的状态。  
没有 Issues 与 Release 的公开波动，说明外部扰动小；而 5 个关闭 PR 则表明团队正在围绕 **Computer Use、cowork、语音输入、媒体导出** 做持续打磨。对于一个 AI 智能体与个人 AI 助手项目来说，这种“少而精”的更新结构通常是健康的：**功能在收敛，体验在修补，发布在推进**。

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合微信群/飞书的简版摘要**，或  
2. **适合管理层汇报的周报风格版本**。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-06-13）

## 1. 今日速览
今日 Moltis 的社区活跃度整体偏低：过去 24 小时仅有 **1 条 Issue 更新**，且没有新增 PR、没有合并/关闭 PR、也没有新版本发布。  
当前项目的公开动态主要集中在一个 **功能请求** 上，而非缺陷修复或代码交付，说明仓库此阶段更偏向需求收集与架构讨论。  
从节奏看，项目今天属于 **低代码活动、低讨论量** 的状态，但问题本身聚焦在运行时隔离与 Kubernetes 集成，属于较有方向性的中长期能力建设信号。  
整体健康度判断：**稳定但不活跃**，短期没有明显风险，但也缺少可见的交付推进。  
- 仓库链接：https://github.com/moltis-org/moltis

## 2. 项目进展
今日 **没有合并或关闭的重要 PR**，因此没有可量化的功能落地或缺陷修复进展。  
这意味着项目在代码层面的前进幅度为 **0**，当前主要进展体现在需求侧而非实现侧。  
- PR 列表：https://github.com/moltis-org/moltis/pulls

## 3. 社区热点
今日最活跃的讨论来自 **Issue #1118**，是当前唯一处于活跃状态的话题。  
该议题提出为 Moltis 增加 **Kubernetes-native sandbox backend**，并支持 `runtimeClassName`，以便接入 Kata Containers、gVisor 等运行时，实现更强隔离。  
这反映出社区对 **执行不可信 LLM 生成命令时的安全边界、隔离级别与部署灵活性** 有明确诉求。  
- Issue 链接：https://github.com/moltis-org/moltis/issues/1118

## 4. Bug 与稳定性
今日未见新的 Bug、崩溃或回归类 Issue。  
从公开数据看，当前没有高严重度稳定性风险被提交到社区讨论中。  
不过，Issue #1118 本身从“安全隔离”角度切入，说明用户对执行环境的可靠性与防逃逸能力较为敏感，属于预防性稳定性诉求，而非已发生故障。  
- 相关 Issue：https://github.com/moltis-org/moltis/issues/1118

## 5. 功能请求与路线图信号
当前最明确的新功能需求是 **Kubernetes-native sandbox backend**，并支持 `runtimeClassName`。  
这类需求通常意味着用户希望 Moltis 能从“本地/单机执行”进一步走向 **可编排、可隔离、可按运行时定制** 的生产化部署模式。  
如果后续维护者计划增强安全沙箱能力，这个方向很可能进入下一阶段路线图，尤其适合与 **Kata Containers / gVisor / OCI runtime** 兼容能力一起推进。  
目前未见对应 PR，因此仍处于 **需求明确、实现未启动** 的状态。  
- 需求链接：https://github.com/moltis-org/moltis/issues/1118

## 6. 用户反馈摘要
从 Issue #1118 可以看出，用户的核心痛点是：**AI Agent 执行外部命令时存在不可信代码风险**，需要更强的隔离方案。  
用户希望 Moltis 在不依赖单一沙箱实现的前提下，支持 Kubernetes 原生方式部署，这说明其使用场景可能已经从实验性环境延伸到更重视安全与运维治理的环境。  
反馈中体现出的偏好是：  
- 更强的隔离性  
- 更高的部署可控性  
- 对云原生基础设施的兼容  
- Issue 链接：https://github.com/moltis-org/moltis/issues/1118

## 7. 待处理积压
目前公开数据中没有看到长期未响应的重要 Issue 或 PR。  
但 **Issue #1118** 已创建并有 1 条评论，属于当前唯一值得持续跟踪的待办事项；若后续缺少维护者响应，可能会成为路线图上的积压信号。  
建议维护者优先确认该需求是否进入规划、是否已有替代方案、以及实现复杂度是否可接受。  
- 待跟踪 Issue：https://github.com/moltis-org/moltis/issues/1118

## 8. 总体判断
Moltis 今日的公开动向显示：**项目运行平稳，但代码交付节奏较静**。  
唯一亮点是一个具有明确工程价值的安全/隔离型功能请求，这类需求若被采纳，可能显著提升项目在生产环境中的适用性。  
短期内项目健康度可评为 **“稳定、低噪音、需求驱动”**，但需要后续 PR 与版本发布来验证路线图推进力度。  
- 仓库主页：https://github.com/moltis-org/moltis

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-06-13）

## 1) 今日速览
过去 24 小时，项目保持**高活跃度**：Issues 更新 12 条、PR 更新 9 条，但**尚未有新版本发布**。讨论重心仍集中在**稳定性问题、渠道能力扩展、桌面端体验优化**三大方向，说明项目正处于持续迭代和用户反馈快速回流阶段。  
从结果看，今日有 **4 个 PR 进入关闭/合并状态**，对版本流程、会话路由、记忆搜索展示等关键路径做了推进；同时也新增了多条与**崩溃、卡死、安装失败、回归**相关的反馈，健康度总体可控，但稳定性压力仍然存在。  
整体判断：项目当前处于**“功能持续扩张 + 稳定性补课”**的活跃期，维护节奏快，用户参与度高。

---

## 2) 版本发布
**今日无新版本发布。**

不过可以看到版本线已经在推进中：
- [#5159](https://github.com/agentscope-ai/QwenPaw/pull/5159) `fix(release): switch version to 1.1.12b1`（已关闭）
- [#5157](https://github.com/agentscope-ai/QwenPaw/pull/5157) `chore(release): bump version to 1.1.12.beta1`（已关闭）

这说明项目可能正在为**下一轮 beta/预发布**做准备，但当前尚未形成可对外宣布的新 release。  
**迁移注意事项**：现阶段无需版本升级迁移，但若后续发布 1.1.12 系列，建议关注：
- 版本号格式已经出现修正，自动化发布链路可能有调整；
- 若涉及桌面端/渠道端修复，升级前应重点回归会话路由、插件安装、工具调用等核心路径。

---

## 3) 项目进展
今日共有 **4 个 PR 关闭/合并**，主要推进了以下方向：

1. **版本管理与发布链路整理**
   - [#5159](https://github.com/agentscope-ai/QwenPaw/pull/5159) 修正版本号格式为 `1.1.12b1`
   - [#5157](https://github.com/agentscope-ai/QwenPaw/pull/5157) 将版本 bump 到 `1.1.12.beta1`
   - 价值：为下一次发布清理版本命名与流程问题，属于“发布基础设施”完善。

2. **控制台会话路由修复**
   - [#5147](https://github.com/agentscope-ai/QwenPaw/pull/5147) `fix(console): fixed session redirection when switching code mode`
   - 价值：修复 code mode 切换时的会话跳转问题，直接影响前端使用连续性与会话体验。

3. **记忆搜索工具展示优化**
   - [#5154](https://github.com/agentscope-ai/QwenPaw/pull/5154) `refactor(console): Refactor the result style of the memory search tool`
   - 价值：优化 UI 呈现，提升控制台内工具结果的可读性和交互质量。

4. **项目整体推进幅度**
   - 从“数量”上看，今日有 **4/9 PR** 进入关闭状态，推进比例接近一半；
   - 从“质量”上看，推进点覆盖了**发布、前端路由、工具 UI**，属于对主链路和用户感知较强的改进。  
   - 说明项目不只是修小问题，而是在同步推进**产品体验与工程稳定性**。

---

## 4) 社区热点
今日讨论热度主要集中在以下 Issues/PR，按评论活跃度排序：

1. **[#5156](https://github.com/agentscope-ai/QwenPaw/issues/5156)**  
   `建议支持 kimi-for-coding / 加入 uv 白名单`  
   - 评论数：3
   - 诉求：希望放开对 `kimi-for-coding` 的接入限制，并将 `uv` 加入白名单。
   - 背后原因：用户已经订阅了 Kimi coding 套餐，希望直接在 QwenPaw 中使用，而不是被限制在官方 API 路径。
   - 这类需求反映出用户对“**已付费能力复用**”非常敏感。

2. **[#5164](https://github.com/agentscope-ai/QwenPaw/issues/5164)**  
   `建议完善桌面版系统托盘、开机自启、后台常驻和服务管理能力`  
   - 评论数：2
   - 诉求：桌面客户端更像一个“真正可驻留的助手”，而不只是一个前台应用。
   - 背后原因：用户希望桌面版具备更强的**常驻、托盘、自动启动、后台服务化**能力，说明有明确的本地长期使用场景。

3. **[#5161](https://github.com/agentscope-ai/QwenPaw/issues/5161)**  
   `长对话后 QwenPaw 无响应 / QwenPaw stops responding after long conversation`  
   - 评论数：2
   - 诉求：长上下文、长轮次会话下不应卡死。
   - 背后原因：用户在真实使用中已经把它当作持续对话助手，说明对**长会话稳定性**的要求正在上升。

4. **[#5155](https://github.com/agentscope-ai/QwenPaw/issues/5155)**  
   `升级到qwenpaw1.1.11会出现自动宕机重启`  
   - 评论数：2
   - 诉求：升级后出现 Docker 环境自动重启，属于明显稳定性问题。
   - 背后原因：表明新版本存在潜在回归，用户对生产环境可靠性有较高担忧。

5. **[#5167](https://github.com/agentscope-ai/QwenPaw/issues/5167)**  
   `Feishu CardKit 流式卡片长回复刷新较慢`  
   - 评论数：1
   - 诉求：飞书流式卡片在长回复下刷新过慢，影响可用性。
   - 背后原因：这是典型的“**实时展示性能**”问题，说明多渠道交互体验已进入细粒度优化阶段。

补充观察：
- 今日所有高热讨论的 👍 都为 0，说明热度主要来自**真实问题驱动**，而非广泛点赞扩散。
- 热点集中在**渠道能力、桌面端体验、稳定性**，而不是纯功能想象，表明社区需求偏实用。

---

## 5) Bug 与稳定性
按严重程度和影响面排序，今日新增/活跃的稳定性问题如下：

### 高优先级：崩溃、卡死、回归
1. **[#5155](https://github.com/agentscope-ai/QwenPaw/issues/5155)**  
   `升级到qwenpaw1.1.11会出现自动宕机重启`  
   - 影响：Docker 环境下自动重启，属于部署级稳定性问题。
   - 现状：暂无对应 fix PR 提示。
   - 判断：应优先排查，可能是服务进程、资源限制或异常恢复逻辑问题。

2. **[#5162](https://github.com/agentscope-ai/QwenPaw/issues/5162)**  
   `对话思考逻辑进入死循环`  
   - 影响：核心对话流程可能卡在推理循环中。
   - 现状：暂无对应 fix PR。
   - 判断：这是典型的高风险逻辑 bug，可能直接导致不可用。

3. **[#5161](https://github.com/agentscope-ai/QwenPaw/issues/5161)**  
   `长对话后 QwenPaw 无响应`  
   - 影响：长会话后停摆，影响重度用户。
   - 现状：暂无明确 fix PR。
   - 判断：可能与上下文管理、请求超时、队列阻塞有关。

### 中优先级：安装失败、回归、兼容性
4. **[#5166](https://github.com/agentscope-ai/QwenPaw/issues/5166)**  
   `python3.13环境安装TeamChat插件失败：No module named 'imghdr'`  
   - 影响：Python 3.13 兼容性问题，安装链路受阻。
   - 现状：暂无 fix PR。
   - 判断：与标准库变动有关，影响特定环境用户。

5. **[#5163](https://github.com/agentscope-ai/QwenPaw/issues/5163)**  
   `Gemini tool calling 回归：v1.1.10 正常，v1.1.11.post2 异常`  
   - 影响：明确版本回归，影响工具调用能力。
   - 现状：暂无 fix PR。
   - 判断：这类“版本间行为差异”应尽快定位，避免扩散到更多用户。

6. **[#5165](https://github.com/agentscope-ai/QwenPaw/issues/5165)**  
   `打包安装后白屏`  
   - 影响：打包发布后的启动体验受损。
   - 现状：暂无 fix PR。
   - 判断：更偏构建/打包问题，但会直接影响新用户首体验。

### 低优先级：显示/体验问题
7. **[#5148](https://github.com/agentscope-ai/QwenPaw/issues/5148)**  
   `网页UI显示数学生成根号错误`（已关闭）
   - 影响：展示层错误，影响结果可信度。
   - 现状：已关闭，问题已处理。
   - 关联修复：未提供具体 fix PR，但问题已结束。

总体来看，今天的 bug 信号偏向**“真实可用性风险”**，尤其是**自动重启、死循环、长对话卡死、工具调用回归**，这类问题对核心用户影响最大。

---

## 6) 功能请求与路线图信号
今日新增功能需求比较集中，且和现有 PR 方向存在较强关联，以下几项值得关注：

1. **[#5156](https://github.com/agentscope-ai/QwenPaw/issues/5156)** `支持 kimi-for-coding / 加入 uv 白名单`
   - 路线图信号：中高概率被纳入后续版本。
   - 原因：用户诉求明确、与模型/接入策略直接相关，属于“高频平台兼容”类需求。
   - 若后续要支持，可能需要同时考虑**白名单机制、接入安全策略、套餐能力映射**。

2. **[#5164](https://github.com/agentscope-ai/QwenPaw/issues/5164)** `桌面版托盘/自启/后台常驻/服务管理`
   - 路线图信号：很像桌面端长期演进方向。
   - 关联现状：和 [#5153](https://github.com/agentscope-ai/QwenPaw/pull/5153) `pywebview client instant-window startup` 有明显协同关系。
   - 判断：如果桌面端被定位为长期入口，这类能力大概率会进入下一阶段优化。

3. **[#5152](https://github.com/agentscope-ai/QwenPaw/issues/5152)** `Slack频道支持`
   - 路线图信号：渠道扩展需求仍在增长。
   - 价值：补齐 Slack 生态后，项目的企业协作触达面会更广。
   - 风险：新频道意味着更多消息格式、鉴权和消息回调复杂度。

4. **[#5167](https://github.com/agentscope-ai/QwenPaw/issues/5167)** `Feishu CardKit 流式卡片长回复刷新优化`
   - 路线图信号：更像“体验优化型迭代”，适合在已有飞书链路基础上持续打磨。
   - 可能性：高，因为它是现有功能的性能改良，而非全新能力。

5. **[#5153](https://github.com/agentscope-ai/QwenPaw/pull/5153)** `pywebview client instant-window startup`
   - 虽然是 PR，但它表明路线图上正在补齐**桌面端启动速度**与**用户可感知性能**。
   - 这与 [#5164](https://github.com/agentscope-ai/QwenPaw/issues/5164) 形成较强的产品信号闭环。

综合判断：下一版本最可能优先落地的方向，应该是**桌面端体验、渠道适配、以及部分接入策略开放**。

---

## 7) 用户反馈摘要
从今日 Issues 的评论与摘要里，可以提炼出以下真实用户痛点：

1. **“我已经付费了，希望能直接用在 QwenPaw 里”**
   - 来自 [#5156](https://github.com/agentscope-ai/QwenPaw/issues/5156)
   - 用户不是单纯要新功能，而是希望**复用既有订阅权益**，减少重复接入成本。

2. **“桌面版最好像真正的助手一样常驻”**
   - 来自 [#5164](https://github.com/agentscope-ai/QwenPaw/issues/5164)
   - 说明用户在本地化使用上，希望工具具备**托盘、常驻、自启**等“长期在线”属性。

3. **“长对话不能卡住，必须可持续工作”**
   - 来自 [#5161](https://github.com/agentscope-ai/QwenPaw/issues/5161)
   - 用户已经把它用于长上下文任务，说明项目不只是聊天工具，而是**任务型 AI 助手**。

4. **“升级不应该带来宕机、回归或工具失效”**
   - 来自 [#5155](https://github.com/agentscope-ai/QwenPaw/issues/5155)、[#5163](https://github.com/agentscope-ai/QwenPaw/issues/5163)
   - 用户对版本稳定性和向后兼容非常敏感，尤其是生产/半生产环境。

5. **“可视化和流式体验要跟得上真实对话节奏”**
   - 来自 [#5167](https://github.com/agentscope-ai/QwenPaw/issues/5167)
   - 说明用户并不满足于“能用”，而是在追求**更自然、更快、更连续**的交互反馈。

总体上，用户满意点集中在**已有渠道和能力已经在逐步覆盖需求**；不满意点则集中于**稳定性、兼容性、桌面端常驻体验和长会话性能**。

---

## 8) 待处理积压
基于当前提供的 24 小时数据，**没有明显“长期未响应”的历史积压项**；但以下开放项已经呈现出较强的优先级，建议维护者尽快跟进：

### 高优先级开放 Issue
- [#5155](https://github.com/agentscope-ai/QwenPaw/issues/5155) 自动宕机重启
- [#5162](https://github.com/agentscope-ai/QwenPaw/issues/5162) 思考逻辑死循环
- [#5161](https://github.com/agentscope-ai/QwenPaw/issues/5161) 长对话无响应
- [#5163](https://github.com/agentscope-ai/QwenPaw/issues/5163) Gemini 工具调用回归
- [#5166](https://github.com/agentscope-ai/QwenPaw/issues/5166) Python 3.13 插件安装失败
- [#5165](https://github.com/agentscope-ai/QwenPaw/issues/5165) 打包后白屏

### 需要继续推进的开放 PR
- [#5160](https://github.com/agentscope-ai/QwenPaw/pull/5160) Yuanbao quoted messages / media pipeline
- [#5158](https://github.com/agentscope-ai/QwenPaw/pull/5158) console 用户输入队列
- [#5153](https://github.com/agentscope-ai/QwenPaw/pull/5153) 桌面端 instant-window 启动优化
- [#5151](https://github.com/agentscope-ai/QwenPaw/pull/5151) GitPanel Tabs 样式修复
- [#5150](https://github.com/agentscope-ai/QwenPaw/pull/5150) Yuanbao bot messages / from_env 支持

### 维护建议
- 优先锁定**崩溃/死循环/回归**类问题；
- 对**桌面端常驻能力**和**渠道体验优化**建立连续跟进；
- 对版本升级前的稳定性回归做一次系统性检查，避免 1.1.11 类问题再次出现。

---

如果你希望，我还可以把这份日报进一步整理成：
1. **适合直接发群的短版摘要**，或  
2. **适合内部周报/邮件的正式版模板**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下为 **ZeroClaw（github.com/zeroclaw-labs/zeroclaw）在 2026-06-13 的项目动态日报**。

---

## 1. 今日速览
过去 24 小时内，项目保持了**高强度工程活跃**：新增/活跃 Issues 8 条、PR 15 条，但**没有新版本发布**，说明当前仍处于功能演进与修复收敛阶段，而非发布节奏。  
从主题看，今天的讨论集中在 **Web/网关会话能力、MCP/插件路径一致性、跨渠道消息能力、以及 Windows/macOS/Docker 可用性**。  
整体健康度判断：**活跃度高，但稳定性与可用性问题仍在积累**，且有多条 S1 阻塞级问题未见直接修复完成。  
仓库主页：<https://github.com/zeroclaw-labs/zeroclaw>

---

## 2. 版本发布
今日**无新版本发布**。  
仓库链接：<https://github.com/zeroclaw-labs/zeroclaw>

---

## 3. 项目进展
今天确认完成的变更有 **2 个 PR 关闭/合并**，其余 **13 个 PR 仍待合并**，项目推进主要体现在“基础设施清理 + 核心能力修复”两条线。

- **#7548 [CLOSED] Chore/01.5 cargo cleanup**  
  这类大范围清理通常意味着构建、依赖与仓库卫生在收敛，虽然不直接面向用户，但能降低后续合并成本和 CI 噪音。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7548>

- **#7545 [CLOSED] fix(runtime): auto-include discovered MCP tools in risk_profile allowed_tools**  
  这是一个对 MCP 工具可见性的重要修复方向；当前已关闭，但同主题还有 **#7547** 仍在推进，说明该问题已被确认且正在继续打磨。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7545>

- **#7547 [OPEN] fix(runtime): auto-include discovered MCP tools in risk_profile allowed_tools**  
  继续补足 MCP 工具发现/可见性链路，属于直接影响 agent 可用能力的高价值修复。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7547>

- **#7540 [OPEN] refactor(runtime): consolidate the three agent turn engines onto run_tool_call_loop**  
  这是架构层的重要整合，若落地，将减少 gateway、CLI、embedded 等路径之间的行为差异，对后续稳定性和一致性收益较大。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7540>

- **#7549 [OPEN] fix(plugins): align install/discovery paths and add legacy migration**  
  直接修复插件安装与发现路径不一致的问题，属于“装了却找不到”的典型可用性缺陷，优先级很高。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7549>

综合来看，今天项目不是在“扩张新版本功能”，而是在**把核心链路打通：插件、MCP、会话引擎、网关交互**。这对下一个版本的稳定性会有明显加分。  
仓库主页：<https://github.com/zeroclaw-labs/zeroclaw>

---

## 4. 社区热点
> 注：当前数据中，Issue/PR 的评论数大多为 **0/未披露**，因此**没有明显“高评论热帖”**。以下按“主题关注度”而非评论热度来判断。

- **多会话 Web Chat 需求升温**：用户希望网关 Web 聊天 UI 支持会话列表、新建/切换/重命名/删除，反映出多 agent 场景下单会话模型已不够用。  
  Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7543>

- **网关 Web Session 的 ask_user 交互失败**：这是直接阻塞工作流的 S1 问题，说明 WebSocket 会话下的人机协作链路仍不稳定。  
  Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7542>

- **插件/路径一致性问题被广泛重视**：PR #7549 说明社区已经开始关注“CLI 安装成功但运行时找不到”的一致性问题，这类问题往往对新用户打击很大。  
  PR：<https://github.com/zeroclaw-labs/zeroclaw/pull/7549>

- **架构统一是隐性热点**：#7540 的三套 turn engine 收敛，属于维护者在主动消除技术债，通常会显著影响后续 bug 面和 feature 落地速度。  
  PR：<https://github.com/zeroclaw-labs/zeroclaw/pull/7540>

整体判断：今天的“热点”并非评论争论，而是**高频出现的功能诉求 + 阻塞性缺陷**。  
仓库主页：<https://github.com/zeroclaw-labs/zeroclaw>

---

## 5. Bug 与稳定性
按严重程度排序，今日新增/暴露的问题如下：

### S1 - workflow blocked
- **#7542 [Bug] `ask_user` fails instantly with "Channel closed before receiving a response"`**  
  网关 Web Dashboard 会话中，ask_user 直接失败，属于人机交互链路断裂。  
  现状：**未见直接 fix PR**。  
  Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7542>

- **#7537 [Bug] quickstart cannot install the agent / no map-keyed/list section at peer-groups**  
  Windows 10 新用户安装/创建 agent 失败，属于入门级阻塞。  
  现状：**未见直接 fix PR**。  
  Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7537>

- **#7533 [Bug] Docker Build Failure during cargo web build due to missing ++**  
  Docker 构建失败，影响 CI/本地构建可复现性。  
  现状：已有对应修复 PR **#7534**。  
  Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7533>  
  Fix PR：<https://github.com/zeroclaw-labs/zeroclaw/pull/7534>

- **#7527 [Bug] macos app not work**  
  macOS 安装后权限识别、页面空白、窗口消失，影响桌面端可用性。  
  现状：**未见直接 fix PR**。  
  Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7527>

### S2 - degraded behavior
- **#7541 [Bug] V3 legacy paths still use shared data_dir as agent workspace_dir**  
  路径语义混用，可能导致工作区串扰或旧路径迁移异常。  
  现状：**未见直接 fix PR**。  
  Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7541>

### 低风险 / 可用性问题
- **#7529 [Bug] only print dashboard URL when web_dist_dir is available**  
  启动时误导性输出 Web Dashboard 地址，虽不是阻塞，但会增加排障成本。  
  现状：已有修复 PR **#7529**。  
  Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7529>  
  Fix PR：<https://github.com/zeroclaw-labs/zeroclaw/pull/7529>

总体看，今天的稳定性信号偏弱：**S1 问题多、且涉及新用户安装、Web 会话、桌面端和构建链路**，说明项目面临的是“可用性面”的系统性修补，而不仅是单点 bug。  
仓库主页：<https://github.com/zeroclaw-labs/zeroclaw>

---

## 6. 功能请求与路线图信号
以下需求与现有 PR 组合起来看，较像下一版本的候选方向：

- **#7543 多会话 Web Chat 支持**  
  这是非常明确的产品级增强，且与当前 gateway web chat 单会话限制直接相关，若实现将显著提升多 agent 工作流体验。  
  Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7543>

- **#7531 QQ / DingTalk / WeChat / Feishu 的流式卡片消息**  
  属于跨渠道体验优化，需求核心是“降低等待焦虑”，说明用户已在真实业务消息场景中使用 ZeroClaw。  
  Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7531>

- **#7539 llama.cpp model router**  
  反映出本地小模型场景下对“快速切换模型”的需求，说明产品已进入多模型/多后端使用阶段。  
  Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7539>

- **#7549 插件安装/发现路径迁移**  
  虽然是修 bug，但实际上是插件生态稳定化的前置工作，利于后续插件功能增长。  
  PR：<https://github.com/zeroclaw-labs/zeroclaw/pull/7549>

- **#7540 统一三套 agent turn engine**  
  是下一阶段路线图的重要基础设施信号：先统一执行模型，再扩展更多渠道和工作流能力。  
  PR：<https://github.com/zeroclaw-labs/zeroclaw/pull/7540>

判断哪些更可能进入下一版本：
1. **插件路径统一 / legacy migration**（#7549）  
2. **MCP 工具可见性修复**（#7547）  
3. **Web 会话与人机交互稳定性**（#7542 相关）  
4. **多会话 Web Chat**（#7543）  
5. **Docker / 安装链路修复**（#7534、#7537）  
仓库主页：<https://github.com/zeroclaw-labs/zeroclaw>

---

## 7. 用户反馈摘要
从 Issues 内容看，用户反馈呈现出很明确的真实痛点：

- **“能用，但单会话不够”**：Web Chat 需要多会话管理，说明用户已经在把 ZeroClaw 当作长期工作台，而不是一次性工具。  
  反馈源：<https://github.com/zeroclaw-labs/zeroclaw/issues/7543>

- **“工作流不能中断”**：`ask_user` 在 Web Session 中直接失败，说明用户依赖人机确认步骤，且对阻塞非常敏感。  
  反馈源：<https://github.com/zeroclaw-labs/zeroclaw/issues/7542>

- **“安装要足够傻瓜化”**：quickstart 在 Windows 上创建 agent 失败，代表新用户首次体验存在明显门槛。  
  反馈源：<https://github.com/zeroclaw-labs/zeroclaw/issues/7537>

- **“跨平台必须一致”**：macOS 桌面端权限识别和窗口显示异常，暴露出平台适配仍是关键短板。  
  反馈源：<https://github.com/zeroclaw-labs/zeroclaw/issues/7527>

- **“本地模型要快切换、少等待”**：llama.cpp router 与流式卡片消息两个需求都指向降低用户等待成本。  
  反馈源：<https://github.com/zeroclaw-labs/zeroclaw/issues/7539>、<https://github.com/zeroclaw-labs/zeroclaw/issues/7531>

- **正向反馈信号**：用户明确表示应用“对小任务和本地小模型很有用”，这说明产品价值已被确认，当前主要矛盾是体验与稳定性。  
  反馈源：<https://github.com/zeroclaw-labs/zeroclaw/issues/7539>

仓库主页：<https://github.com/zeroclaw-labs/zeroclaw>

---

## 8. 待处理积压
严格说，当前数据里**没有“长期未响应”证据**，因为这些条目大多都是 24 小时内新增/更新。但从优先级和风险看，以下是最该被维护者盯住的待处理项：

- **#7542**：网关 Web Dashboard 中 `ask_user` 直接失败，影响工作流闭环。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7542>

- **#7537**：Windows quickstart 无法创建 agent，对新用户转化极不友好。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7537>

- **#7527**：macOS 桌面端不可用，属于平台级阻塞。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7527>

- **#7541**：旧路径语义混用，属于潜在数据/工作区污染风险。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7541>

- **#7543**：多会话 Web Chat 是明显的产品能力缺口，若不处理会持续限制重度用户。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7543>

- **#7547 / #7549 / #7540**：这三项虽是 PR，但都属于“打通核心链路”的关键基础工作，建议优先审查合并。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7547>  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7549>  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7540>

仓库主页：<https://github.com/zeroclaw-labs/zeroclaw>

---

如你需要，我可以把这份日报进一步整理成：
1. **适合内部晨会的一页版**，或  
2. **带“风险等级/优先级/建议动作”的运维视角版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*