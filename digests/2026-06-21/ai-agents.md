# OpenClaw 生态日报 2026-06-21

> Issues: 14 | PRs: 30 | 覆盖项目: 13 个 | 生成时间: 2026-06-21 02:01 UTC

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

# OpenClaw 项目动态日报（2026-06-21）

## 1) 今日速览
今天 OpenClaw 依然处于**高活跃度、强修复导向**的状态：过去 24 小时有 **14 条 Issue 更新**、**30 条 PR 更新**，并发布了 **1 个新版本**。从内容结构看，讨论重心高度集中在 **Telegram、Slack、WebChat、Codex、cron** 等关键交付链路上，说明项目当前的主要压力来自“消息正确送达、会话状态一致性、流式输出可见性”和“工具调用兼容性”。  
整体健康度判断：**活跃且推进明确，但稳定性修复需求仍然偏高**，尤其是 P1 级别问题仍在持续涌入。  
GitHub：Issue 活动汇总（本日报数据）、PR 活动汇总（本日报数据）

---

## 2) 版本发布
### 新版本：v2026.6.9
发布链接：<https://github.com/openclaw/openclaw/releases/tag/v2026.6.9>

#### 主要更新
- **Telegram 交付链路显著增强**
  - 支持更丰富的 HTML 发送
  - 保留更完整的富 Markdown 表达
  - 更好地处理 sticker 路径
  - progress drafts 与 command output 的渲染更贴近真实内容
  - 安全地规范化 HTML 表格
  - 维持 mentions 与 spooled handlers 的正确投递路径

#### 影响判断
- 这次 release 明显是围绕 **Telegram 富消息/富文本交付质量** 做强化，和今天新增的多条 Telegram 相关问题形成呼应。
- **未见明确破坏性变更说明**；但建议下游重点验证：
  - 是否有依赖“纯文本 Telegram 输出”的自动化解析逻辑
  - HTML/Markdown 兼容性
  - 对表格、mention、sticker 路径的消费端是否需要同步适配

#### 迁移注意事项
- 若你们的集成依赖 Telegram 消息的原始文本格式，建议先在预发布环境回归：
  - 富文本解析
  - 消息换行/段落保留
  - 进度 draft 与 command 输出展示
- 对需要严格消息对齐的机器人场景，建议检查是否有输出差异引起的回归。

---

## 3) 项目进展
今日公开数据里可见 **2 个 PR 关闭**，整体推进集中在“修 bug、补兼容、提稳定性”。

### 已关闭/推进的重要 PR
1. **#95428** — `test(scripts): add check-package-dist-imports to golden test plan`  
   链接：<https://github.com/openclaw/openclaw/pull/95428>  
   作用：修正脚本测试 golden 预期，避免测试计划与仓库真实导入关系不一致导致的失败。  
   价值：提升 CI/测试稳定性，属于基础工程修复。

2. **#95439** — `fix(doctor): keep narrowed open-DM allowlists from being widened to a wildcard`  
   链接：<https://github.com/openclaw/openclaw/pull/95439>  
   作用：防止 `openclaw doctor --fix` 把原本收窄的 DM allowlist 意外扩展成全开通配。  
   价值：这是一个**权限边界修复**，对安全和访问控制影响较大。

### 今日整体推进判断
- 今日的 PR 结构明显偏向：
  - **消息投递正确性**
  - **会话状态一致性**
  - **工具链参数规范化**
  - **认证/权限边界修复**
- 这意味着项目并不是“新功能爆发”，而是在主动压制高风险回归与交付异常。  
- 从维护视角看，这是健康信号：**优先解决用户可感知故障，而不是继续堆叠功能。**

---

## 4) 社区热点
今天讨论最活跃的点，基本都围绕 **“消息没有按预期呈现/状态丢失/流式体验不连续”** 展开。

### 1. iOS Node TestFlight 邀请请求
Issue：[#95426](https://github.com/openclaw/openclaw/issues/95426)  
- 状态：CLOSED
- 评论数：2
- 诉求：用户希望把 iPhone 作为 iOS Node 使用，启用 canvas、camera、location、voice wake 等能力。  
- 热点原因：说明 **移动端节点能力** 对真实用户有明确需求，且文档/接入门槛仍存在一定不透明性。

### 2. Codex app-server 流式输出不增量
Issue：[#95422](https://github.com/openclaw/openclaw/issues/95422)  
- 状态：OPEN
- 评论数：2
- 诉求：TUI/WebChat 中 Codex app-server runtime 不提供 incremental deltas，导致整段回答一次性出现。  
- 热点原因：这是**交互体验问题**，会直接影响“像助手一样工作”的感受；用户在意的是实时反馈，而不是最终答案。

### 3. Telegram 主 session 被静默重置，导致上下文丢失
Issue：[#95443](https://github.com/openclaw/openclaw/issues/95443)  
- 状态：OPEN
- 评论数：1
- 诉求：主 Telegram session 在未 idle timeout 的情况下被 `restartRecoveryRuns` 静默重置，历史上下文全部丢失。  
- 热点原因：这是**高信任链路损坏**，用户最在意的是“系统悄悄丢状态”。

### 4. Slack presentation payload 被降级成纯文本
Issue：[#95440](https://github.com/openclaw/openclaw/issues/95440)  
- 状态：OPEN
- 评论数：1
- 诉求：Block Kit 本应呈现为结构化交互内容，但实际只收到 plain text。  
- 热点原因：直接影响 Slack 场景的产品完成度。

### 5. `cron` tool 的 job 参数键名被污染
Issue：[#95407](https://github.com/openclaw/openclaw/issues/95407)  
- 状态：OPEN
- 评论数：1
- 诉求：JSON string 中的某些顶层键被加上尾随空格，导致校验失败。  
- 热点原因：说明 **LLM 工具调用链路的容错性** 仍是重点问题。

---

## 5) Bug 与稳定性
按严重程度排序，今日新增/活跃问题主要集中在 P1/P2，且多数直接影响会话、消息或认证链路。

### P1 / 高优先级

1. **[#95422](https://github.com/openclaw/openclaw/issues/95422)**  
   TUI/WebChat：Codex app-server 流式输出没有 incremental deltas，整段一次性返回。  
   - 影响：消息体验明显退化，用户以为系统“卡住”。  
   - 是否已有 fix PR：**未看到今日列表中的对应 fix PR**

2. **[#95443](https://github.com/openclaw/openclaw/issues/95443)**  
   Telegram 主 session 被 lifecycleGeneration 静默重置，造成历史上下文丢失。  
   - 影响：**session-state 严重风险，直接丢上下文**。  
   - 是否已有 fix PR：**未看到**

3. **[#95441](https://github.com/openclaw/openclaw/issues/95441)**  
   github-copilot/gpt-5.5 仍会 replay thinkingSignature / encrypted_content，导致 channel/direct LLM request failed。  
   - 影响：认证/会话/消息链路耦合出错，且会直接阻断请求。  
   - 是否已有 fix PR：**未看到**

4. **[#95440](https://github.com/openclaw/openclaw/issues/95440)**  
   Slack presentation payload 永远渲染成 plain text，而非 Block Kit。  
   - 影响：消息交互丢失。  
   - 是否已有 fix PR：**有，PR #95448**  
   - PR 链接：<https://github.com/openclaw/openclaw/pull/95448>

5. **[#95429](https://github.com/openclaw/openclaw/issues/95429)**  
   `wrapAnthropicStreamWithRecovery` 在 async streamFn 场景下被绕过，导致 thinking-signature 自动恢复失效。  
   - 影响：消息/状态恢复机制失效。  
   - 是否已有 fix PR：**未看到**

6. **[#95405](https://github.com/openclaw/openclaw/issues/95405)**  
   Control UI WebSocket 在 ingress-nginx + oauth2-proxy trusted-proxy 场景下反复 1006 断开。  
   - 影响：控制台会话不可用。  
   - 是否已有 fix PR：**未看到**

### P2 / 中优先级

7. **[#95407](https://github.com/openclaw/openclaw/issues/95407)**  
   `cron add` action 会把某些 job 参数键名搞脏（尾随空格）。  
   - 影响：schema 校验失败、工具调用失败。  
   - 是否已有 fix PR：**有，PR #95414 / #95421 / #95453**
     - <https://github.com/openclaw/openclaw/pull/95414>
     - <https://github.com/openclaw/openclaw/pull/95421>
     - <https://github.com/openclaw/openclaw/pull/95453>

8. **[#95409](https://github.com/openclaw/openclaw/issues/95409)**  
   Telegram 持久富消息会吞掉普通换行，结构化回复难读。  
   - 影响：可读性下降。  
   - 是否已有 fix PR：**未看到**

### 已关闭但值得记录的稳定性问题
- **[#95415](https://github.com/openclaw/openclaw/issues/95415)** — Telegram Web 报 “This message is not supported”  
- **[#95399](https://github.com/openclaw/openclaw/issues/95399)** — CLI 被 operator scope upgrade loop 卡死  
- **[#95325](https://github.com/openclaw/openclaw/issues/95325)** — session origin 跨 channel 切换保留旧字段，已关闭

---

## 6) 功能请求与路线图信号
今天的新诉求里，最值得关注的是：**用户希望 OpenClaw 在“调度、会话、模型选择、存储迁移、平台能力开放”上变得更可控、更细粒度**。

### 可能进入下一版本的路线图信号

1. **[#95396](https://github.com/openclaw/openclaw/pull/95396)**  
   `openclaw daemon restart --safe --wait 0` 支持无限期安全重启延期。  
   - 信号：运维/可用性需求强，适合进下一版基础 CLI 改进。  
   - 状态：waiting on author

2. **[#95391](https://github.com/openclaw/openclaw/pull/95391)**  
   active-memory recall 过滤 assistant chitchat，避免把闲聊当记忆。  
   - 信号：记忆质量和噪声控制会成为重点。  
   - 状态：waiting on author

3. **[#95390](https://github.com/openclaw/openclaw/pull/95390)**  
   修复共享 session 下 Telegram 回复上下文构建不一致。  
   - 信号：这是直接命中今日最热的 session-state 主题，**很可能优先进入下一版**。  
   - 状态：ready for maintainer look

4. **[#95454](https://github.com/openclaw/openclaw/pull/95454)**  
   gateway 增加 Postgres session store migration path。  
   - 信号：平台层存储迁移/扩展性需求开始明确，属于中长期路线图。  
   - 状态：needs-pr-context

5. **[#95294](https://github.com/openclaw/openclaw/pull/95294)**  
   cron quick-create wizard 增加模型选择器。  
   - 信号：是典型的“降低使用门槛”功能，偏产品体验改进。  
   - 状态：actively grinding

6. **[#95277](https://github.com/openclaw/openclaw/pull/95277)**  
   Amazon Nova 原生 prompt caching。  
   - 信号：供应商能力对齐，面向生态扩展。  
   - 状态：needs proof

### 其他新需求/路线图信号
- **[#95426](https://github.com/openclaw/openclaw/issues/95426)**：iOS Node TestFlight 邀请请求  
  - 说明移动端节点能力已进入真实用户需求清单。  
- **[#95408](https://github.com/openclaw/openclaw/issues/95408)**：为复杂 cron payload 提供 per-agent `requestTimeoutSeconds`  
  - 说明用户希望调度链路更稳、更可调。  
- **[#95321](https://github.com/openclaw/openclaw/pull/95321)**：WebChat history text cap 可配置  
  - 说明大文本会话场景已成为可见痛点。  

**判断**：下一版本最可能优先吸收的，不是新“炫技功能”，而是围绕 **Telegram/Slack/WebChat/cron/Codex** 的可靠性交付增强。

---

## 7) 用户反馈摘要
从 Issues 的描述中，可以提炼出今天最真实、最集中用户痛点：

### 1. 用户非常在意“上下文不能丢”
- 代表问题：[#95443](https://github.com/openclaw/openclaw/issues/95443)、[#95325](https://github.com/openclaw/openclaw/issues/95325)、[#95378](https://github.com/openclaw/openclaw/issues/95378)
- 反馈本质：  
  用户不是只想“能回复”，而是希望 **跨天、跨渠道、跨 session 的对话连续性稳定存在**。  
- 场景：Telegram 主会话、跨 Slack/Telegram/webchat 的共享 session、跨 transport 的回复绑定。

### 2. 用户对“消息呈现质量”敏感
- 代表问题：[#95440](https://github.com/openclaw/openclaw/issues/95440)、[#95409](https://github.com/openclaw/openclaw/issues/95409)、[#95183](https://github.com/openclaw/openclaw/pull/95183)、[#95345](https://github.com/openclaw/openclaw/pull/95345)
- 反馈本质：  
  富消息、换行、进度 draft、reasoning lane 这些细节，是用户判断产品成熟度的核心。  
- 不满点：内容被降级成纯文本、换行被压缩、进度条/思考过程看起来“消失了”。

### 3. 用户对“实时性”有强预期
- 代表问题：[#95422](https://github.com/openclaw/openclaw/issues/95422)
- 反馈本质：  
  交互式助手必须让人看到“正在思考/正在输出”，否则会被理解为卡死。  

### 4. 用户希望工具链更宽容、更不容易被模型小错误击穿
- 代表问题：[#95407](https://github.com/openclaw/openclaw/issues/95407)、[#95414](https://github.com/openclaw/openclaw/pull/95414)
- 反馈本质：  
  LLM 输出中常见的小瑕疵（尾随空格、路径扩展名幻觉）不应直接造成工具失败。  
- 这说明 OpenClaw 已经进入“**真实模型噪声容错**”阶段，而不只是理想输入假设阶段。

### 5. 用户希望运维与认证流程不要自相矛盾
- 代表问题：[#95399](https://github.com/openclaw/openclaw/issues/95399)、[#95405](https://github.com/openclaw/openclaw/issues/95405)、[#95426](https://github.com/openclaw/openclaw/issues/95426)
- 反馈本质：  
  用户不接受“为了升级权限而先完成权限升级”“WebSocket 因代理链路断掉”“测试飞行/预览入口不清晰”。  
- 这类问题虽然不总是高频，但一旦发生会严重损害信任。

---

## 8) 待处理积压
以下是今天最值得维护者持续盯住的未决项，优先级偏高，且多数与真实用户损失直接相关。

### 高优先级未决 Issue
1. **[#95443](https://github.com/openclaw/openclaw/issues/95443)**  
   Telegram 主 session 静默重置，导致上下文丢失。  
   - 这是典型“数据/状态丢失”问题，风险极高。

2. **[#95441](https://github.com/openclaw/openclaw/issues/95441)**  
   thinkingSignature / encrypted_content 回放导致请求失败。  
   - 直接影响可用性和 auth/provider 路径。

3. **[#95422](https://github.com/openclaw/openclaw/issues/95422)**  
   Codex app-server 流式输出不增量。  
   - 影响 TUI/WebChat 交互体验，且与用户感知强相关。

4. **[#95405](https://github.com/openclaw/openclaw/issues/95405)**  
   代理环境下 Control UI WebSocket 1006 断开。  
   - 生产环境风险高，建议尽快定位。

5. **[#95409](https://github.com/openclaw/openclaw/issues/95409)**  
   Telegram richMessages 换行折叠。  
   - 影响可读性，且与刚发布的 Telegram 富交付增强直接相关。

### 需要持续跟进的 PR
1. **[#95396](https://github.com/openclaw/openclaw/pull/95396)** — waiting on author  
   <https://github.com/openclaw/openclaw/pull/95396>

2. **[#95391](https://github.com/openclaw/openclaw/pull/95391)** — waiting on author  
   <https://github.com/openclaw/openclaw/pull/95391>

3. **[#95390](https://github.com/openclaw/openclaw/pull/95390)** — ready for maintainer look  
   <https://github.com/openclaw/openclaw/pull/95390>

4. **[#95386](https://github.com/openclaw/openclaw/pull/95386)** — needs proof  
   <https://github.com/openclaw/openclaw/pull/95386>

5. **[#95454](https://github.com/openclaw/openclaw/pull/95454)** — needs-pr-context  
   <https://github.com/openclaw/openclaw/pull/95454>

---

如果你愿意，我还可以把这份日报进一步整理成：
- **适合直接发 Slack/Telegram 的简版**
- **适合管理层看的 KPI 版**
- **按“Telegram / Slack / WebChat / CLI / Gateway”分频道的技术负责人版**

---

## 横向生态对比

以下为基于 2026-06-21 各项目动态的横向对比分析报告。

---

## 1) 生态全景

过去 24 小时，个人 AI 助手 / 自主智能体开源生态整体呈现出一个很清晰的趋势：**从“功能可用”进入“生产可用”阶段**。  
各项目的讨论重心不再是简单的聊天或接入，而是集中在 **消息交付质量、会话状态连续性、工具调用兼容性、权限边界和可观测性** 上。  
高活跃项目普遍在修复用户可感知问题，说明生态正在从“快速试验”转向“真实场景打磨”。  
同时，项目之间的分化也很明显：一部分进入高密度迭代期，一部分进入架构收敛和质量硬化期，还有一些仍处于低活跃维护状态。  
总体判断：**生态仍在快速演进，但竞争焦点已经从“谁能做”转向“谁更稳、更准、更适合真实工作流”。**

---

## 2) 各项目活跃度对比

> 注：以下为“过去 24 小时 GitHub 动态”口径，Issues/PR 为更新量或可见变动量，Release 为今日新增发布情况。

| 项目 | 今日 Issues | 今日 PR | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 14 | 30 | 1 个新版本（v2026.6.9） | **高活跃，修复导向明确**，稳定性压力仍偏高 |
| NanoBot | 2 | 6 | 无新版本 | **中高活跃**，偏能力增强与稳定性修复 |
| Hermes Agent | 50 | 50 | 无新版本 | **超高活跃**，但启动链路/跨平台桥接压力较大 |
| PicoClaw | 0 | 0 | 无活动 | **低活跃** |
| NanoClaw | 0 | 4 | 无新版本 | **低噪音维护型**，偏配置清理 |
| NullClaw | 1 | 0 | 无新版本 | **低活跃**，单点 Bug 驱动 |
| IronClaw | 0 | 8 | 无新版本 | **中等偏高**，架构重构与质量硬化期 |
| LobsterAI | 0 | 0 | 无活动 | **低活跃** |
| TinyClaw | 0 | 0 | 无活动 | **低活跃** |
| Moltis | 0 | 2 | 无新版本 | **稳定维护型**，以依赖治理为主 |
| CoPaw | 4 | 5 | 无新版本 | **活跃但 review 堆积**，交付受审查节奏影响 |
| ZeptoClaw | 0 | 0 | 无活动 | **低活跃** |
| ZeroClaw | 18 | 16 | 无新版本 | **高活跃**，但合并吞吐偏弱、积压风险高 |

### 活跃度分层
- **快速迭代层**：Hermes Agent、OpenClaw、ZeroClaw  
- **中高活跃层**：NanoBot、CoPaw、IronClaw  
- **维护/收敛层**：NanoClaw、Moltis  
- **低活动层**：PicoClaw、LobsterAI、TinyClaw、ZeptoClaw、NullClaw

---

## 3) OpenClaw 在生态中的定位

### 核心定位
OpenClaw 是当前生态中最典型的 **“多渠道个人 AI 助手交付平台”**：重点不是单一模型能力，而是 **Telegram / Slack / WebChat / Codex / cron** 等交付链路的稳定性和一致性。

### 相对优势
1. **用户可感知链路覆盖最完整**
   - Telegram 富消息、Slack Block Kit、WebChat、Codex 流式输出、cron 工具链都在同一主线内。
   - 这使 OpenClaw 更接近“真实可用的助手平台”，而不是单纯的 SDK 或实验仓库。

2. **版本节奏明确，问题响应快**
   - 今日已发布新版本 v2026.6.9，且 release 直接围绕 Telegram 富文本交付增强。
   - 说明项目具备“问题出现—修复—发布”的闭环能力。

3. **工程重心集中，技术路径清晰**
   - 当前重点是消息正确送达、状态一致性、流式体验、工具调用兼容。
   - 这种聚焦度高于许多“平台更大但目标更散”的同类项目。

### 与同类的技术路线差异
- **对比 Hermes Agent**：Hermes 更偏多端、多形态交互和桌面/TUI/消息平台融合，覆盖面更广但链路更复杂；OpenClaw 更聚焦于 **消息交付与会话一致性**。
- **对比 NanoBot**：NanoBot 更强调 provider 兼容、Telegram 富消息和 memory/性能优化；OpenClaw 在 **跨渠道交付和业务链路稳定性** 上更成熟。
- **对比 ZeroClaw / IronClaw**：后两者更偏平台化、架构化、供应链与安全治理；OpenClaw 更偏 **产品化交付层**。
- **对比低活跃项目**：OpenClaw 的社区响应和迭代密度明显更高，已形成稳定的工程维护节奏。

### 社区规模对比
- OpenClaw 的活跃度显著高于 NanoClaw、NullClaw、Moltis 等维护型项目；
- 低于 Hermes Agent、ZeroClaw 这类超高密度协作项目；
- 但其**问题集中度和修复效率**更强，属于“**中高规模、强聚焦**”型社区。

**一句话定位：**  
OpenClaw 是生态中偏“**多渠道交付层**”的代表项目，兼具较高活跃度和较强产品落地感。

---

## 4) 共同关注的技术方向

### 1. 富消息与多渠道呈现
- **涉及项目**：OpenClaw、NanoBot、Hermes Agent、ZeroClaw  
- **具体诉求**：
  - Telegram 富消息 / rich message
  - Slack Block Kit 结构化展示
  - iMessage / WhatsApp / Matrix 等渠道适配
  - 消息不要降级成纯文本

### 2. 会话连续性与状态不丢失
- **涉及项目**：OpenClaw、Hermes Agent、ZeroClaw、CoPaw  
- **具体诉求**：
  - 主 session 不应被静默重置
  - 跨通道 / 跨设备回复上下文一致
  - 长会话裁剪不能丢 tool result 或关键记忆
  - 记忆系统要减少噪声、保留 provenance

### 3. 工具调用与 provider 兼容性
- **涉及项目**：NanoBot、CoPaw、OpenClaw、Hermes Agent  
- **具体诉求**：
  - OpenAI-compatible provider 也要支持 function calling
  - custom provider 的 thinking / reasoning 参数差异要可配置
  - LLM 输出的小错误不应直接击穿工具链
  - async stream / recovery 不能绕过关键恢复逻辑

### 4. 权限边界与安全收敛
- **涉及项目**：OpenClaw、CoPaw、ZeroClaw、IronClaw、Hermes Agent  
- **具体诉求**：
  - allowlist / scope / agent 权限不要被误扩大
  - 文件工具只能访问 workspace
  - auth / transport / ingress 要 fail-close
  - 供应链安全、SBOM、SLSA、签名与审计成为发版前置要求

### 5. 可观测性与运维稳定性
- **涉及项目**：ZeroClaw、IronClaw、Hermes Agent、OpenClaw  
- **具体诉求**：
  - trace_id 贯通
  - 运行时日志分类、成本记录、审计链路
  - CI / canary / reload 行为可见
  - WebSocket、网关、sidecar 的异常能快速定位

---

## 5) 差异化定位分析

### OpenClaw
- **功能侧重**：消息交付、会话一致性、工具调用兼容性
- **目标用户**：真实多渠道使用者、需要稳定对话桥接的开发者、运营型自动化团队
- **架构特征**：以渠道/交付链路为中心，强调端到端可见性与修复闭环

### Hermes Agent
- **功能侧重**：桌面/TUI/消息平台全栈整合，兼顾 WhatsApp、Telegram、iMessage、OAuth、computer-use
- **目标用户**：重度个人助手用户、桌面自动化用户、跨平台协同需求用户
- **架构特征**：多入口、多终端、多 sidecar，复杂度最高，功能面最广

### NanoBot
- **功能侧重**：provider 兼容、Telegram 富消息、并发安全、记忆治理
- **目标用户**：希望快速接入多模型、多 provider 的开发者
- **架构特征**：较偏“可扩展 agent runtime”，强调兼容与性能平衡

### ZeroClaw
- **功能侧重**：安全治理、CI/供应链、权限模型、gateway/runtime 稳定性
- **目标用户**：更接近平台工程团队、重视生产级治理的维护者
- **架构特征**：平台化、规范化、合规化倾向明显

### IronClaw
- **功能侧重**：manifest-driven ingress/auth/transport 统一化
- **目标用户**：偏底层平台、协议与安全边界设计者
- **架构特征**：架构重构驱动，强调 typed manifest、fail-close、抽象收敛

### CoPaw
- **功能侧重**：memory、KV cache、tool execution、沙箱安全
- **目标用户**：希望构建复杂 agent workflow 的开发者
- **架构特征**：偏 agent 执行层和记忆层，强调稳定性和上下文治理

### NanoClaw / Moltis / NullClaw / PicoClaw / TinyClaw / ZeptoClaw / LobsterAI
- **功能侧重**：维护、低频修复、依赖治理、单点 Bug 排查
- **目标用户**：小型团队、实验项目、轻量集成场景
- **架构特征**：更新节奏慢，更多处于收敛或静态维护状态

---

## 6) 社区热度与成熟度

### 快速迭代阶段
- **Hermes Agent**：Issue/PR 双高，说明需求密度极高，产品边界仍在快速扩张
- **OpenClaw**：高活跃 + 版本发布，属于“高频修复、持续优化”的成熟迭代型
- **ZeroClaw**：需求与 PR 都很多，但合并弱，处于版本收口前的高压推进期

### 质量巩固阶段
- **IronClaw**：明显在做架构统一和质量硬化，属于中后期平台收敛
- **CoPaw**：功能点还在推进，但讨论集中在稳定性、安全和可用性，偏向基础能力加固
- **NanoBot**：功能继续拓展，但同时开始重视并发、provider、memory 质量治理

### 维护/低活动阶段
- **NanoClaw、Moltis、NullClaw**：更偏维护和单点问题处理
- **PicoClaw、LobsterAI、TinyClaw、ZeptoClaw**：当前几乎无可见推进

### 成熟度判断
- **最高成熟度信号**：OpenClaw、ZeroClaw、Hermes Agent
- **中等成熟度信号**：NanoBot、IronClaw、CoPaw
- **低活跃或早期维护**：NanoClaw、Moltis、NullClaw 等

---

## 7) 值得关注的趋势信号

### 趋势 1：从“聊天助手”转向“交付系统”
开发者已经不再满足于模型能回答，而是要求：
- 富消息正确渲染
- 流式输出可见
- Tool / command 输出不丢失
- 多渠道呈现一致

**参考价值**：助手产品的竞争力正在从模型本身转向“输出质量”和“交付稳定性”。

### 趋势 2：会话状态成为核心资产
多个项目都在处理：
- session 被静默重置
- context 丢失
- 记忆误写 / 噪声污染
- history pruning 误删 tool result

**参考价值**：未来 agent 系统必须把“状态一致性”设计成一等公民，而不是附属缓存逻辑。

### 趋势 3：工具调用进入“容错时代”
真实模型输出并不总是干净的 JSON 或标准参数：
- 尾随空格、字段污染、thinking signature 回放
- provider 不兼容 function calling
- async stream / recovery 逻辑绕路

**参考价值**：工具层需要面向模型噪声做防御，而不是假设输出永远完美。

### 趋势 4：安全和供应链治理前移
越来越多项目开始关注：
- 权限边界
- 依赖审计
- SLSA / SBOM / cosign
- auth verifier、fail-close、workspace 限制

**参考价值**：agent 项目正在从“实验工具”向“生产系统”演进，安全能力应尽早内建。

### 趋势 5：多端协同成为标配，而非加分项
Telegram、Slack、WhatsApp、iMessage、WebChat、桌面端、TUI 同时成为主战场。

**参考价值**：下一代个人 AI 助手不只是一个模型界面，而是一个跨端、跨渠道、跨上下文的统一执行层。

---

## 结论

如果从生态成熟度看，2026-06-21 的开源个人 AI 助手/智能体项目，整体已进入 **“产品化与生产化竞赛”** 阶段。  
OpenClaw 在其中的角色最接近 **多渠道交付层的成熟代表**：既有明确的用户面，又有持续的稳定性修复和版本交付。  
Hermes Agent 更偏全栈多端平台，ZeroClaw 和 IronClaw 更偏平台治理与架构收敛，NanoBot 和 CoPaw 则更像在补齐 provider、memory、tooling 的关键能力。  
对开发者而言，当前最重要的启示是：**不要只优化模型能力本身，要同时优化消息呈现、状态一致性、工具容错、安全边界和可观测性。**

如果你需要，我可以继续把这份报告整理成：
1. **一页式决策摘要版**，或  
2. **按“机会/风险/建议动作”三栏输出的管理层简报版**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-06-21）

## 1. 今日速览
过去 24 小时，NanoBot 维持了**中高活跃度**：共有 **2 条 Issues 更新**、**6 条 PR 变动**，其中 **2 个 PR 已关闭/完成**，且**暂无新版本发布**。  
今天的讨论与开发重心，明显集中在三条线上：**多模型/自定义 provider 兼容性**、**Telegram 富消息能力增强**、以及**SDK 并发与性能优化**。  
从议题结构看，项目正在从“基础可用”持续走向“更强适配能力 + 更稳的运行时表现”，整体健康度偏积极。  
当前没有明显的版本冻结或危机信号，但若能尽快消化高优先级修复，项目的稳定性会进一步提升。

---

## 2. 版本发布
今日**无新版本发布**，版本更新部分省略。

---

## 3. 项目进展
今日结束的 PR 主要推动了两类能力：

- **多渠道接入继续扩展**  
  - PR **[#4426](https://github.com/HKUDS/nanobot/pull/4426)**：新增 **iMessage channel**（基于 Photon Spectrum）。  
  - 这意味着 NanoBot 的渠道覆盖面进一步向 iMessage 扩展，强化了“跨平台聚合助手”的定位。  
  - 当前状态为 **CLOSED**，从摘要看实现工作已完成或已终结。

- **Web UI 交互体验修复**  
  - PR **[#4427](https://github.com/HKUDS/nanobot/pull/4427)**：修复 iOS Safari 在 textarea 聚焦时的自动放大问题。  
  - 这是典型的移动端可用性修复，对 WebUI 的实际体验提升直接且明确。  
  - 当前状态为 **CLOSED**。

整体来看，今日已结束的 PR 代表着项目在**渠道扩展**和**前端体验**两端都有推进；同时，尚在进行中的 PR 还覆盖了 **并发安全**、**token 成本优化**、**Telegram 能力增强** 和 **记忆系统治理**，说明项目仍在加速打磨核心能力。

---

## 4. 社区热点
今日最活跃的讨论点集中在以下条目：

1. **[#4429 feat: Allow custom provider to configure thinking style](https://github.com/HKUDS/nanobot/issues/4429)**  
   - 评论数：**1**，为今日讨论最明确的热点。  
   - 背后诉求：用户希望 **custom provider** 也能支持“思考/推理模式”，并且能适配**非 OpenAI 标准参数**（例如 VolcEngine / Doubao 的自定义 thinking 参数）。  
   - 这反映出用户并不满足于“OpenAI 兼容即止”，而是希望 NanoBot 真正支持**多模型原生能力差异**。

2. **[#4422 feat(telegram): Add Bot API 10.1 sendRichMessage support](https://github.com/HKUDS/nanobot/issues/4422)**  
   - 评论数：0，但话题本身热度高，且与 Telegram 能力升级直接相关。  
   - 背后诉求：用户希望在 Telegram 中直接渲染 **表格、任务列表、折叠块、数学块** 等富内容，而不是被 HTML parse mode 限制。  
   - 这代表用户对“对话内容表现力”的要求正在上升。

3. **[#4425 fix(sdk): use contextvars for per-call hooks to prevent concurrent run() race](https://github.com/HKUDS/nanobot/pull/4425)**  
   - 虽然评论未显示，但它属于高关注的稳定性话题。  
   - 说明社区对**并发调用可靠性**比较敏感，尤其是多会话同时运行时的隔离问题。

综合看，今日热点背后是两个核心需求：  
- **更强的模型/Provider 兼容性**  
- **更丰富的多渠道消息表达能力**

---

## 5. Bug 与稳定性
按严重程度排序，今日值得关注的问题如下：

### 1) 并发运行时 hook 污染 / race condition
- **Issue/PR**：[#4425](https://github.com/HKUDS/nanobot/pull/4425)  
- **影响等级**：**高**  
- **问题描述**：`Nanobot.run()` 在并发场景下会共享并修改 `_extra_hooks`，导致不同 `session_key` 的运行互相覆盖。  
- **风险**：这属于典型的并发隔离缺陷，可能导致会话串扰、行为不一致，甚至难以复现的线上问题。  
- **状态**：已有 **fix PR**（#4425）。

### 2) Telegram rich capability 误判与错误日志
- **Issue/PR**：[#4423](https://github.com/HKUDS/nanobot/pull/4423)  
- **影响等级**：**中**  
- **问题描述**：原先对 `_is_rich_capability_error` 的 `"not found"` 匹配过宽，可能把临时性聊天错误误判为永久不支持 rich send。  
- **风险**：会导致 rich capability 被错误禁用，影响 Telegram 富消息功能的稳定可用性。  
- **状态**：已有 **修复 PR**（#4423）。

### 3) 多渠道能力扩展过程中的兼容性风险
- **相关条目**：[#4426](https://github.com/HKUDS/nanobot/pull/4426)、[#4422](https://github.com/HKUDS/nanobot/issues/4422)  
- **影响等级**：**中低**  
- **说明**：这类问题更偏功能演进，但对消息渲染、通道桥接和边界场景兼容性有潜在风险。  
- **状态**：部分已有实现/关闭 PR，仍建议持续回归验证。

---

## 6. 功能请求与路线图信号
从今日新增需求与已有 PR 的组合来看，以下方向**最可能进入下一阶段**：

### 高优先级候选
- **[#4429](https://github.com/HKUDS/nanobot/issues/4429)**：custom provider 支持自定义 thinking style  
  - 这是典型的“多模型原生适配”需求，且问题描述非常明确。  
  - 如果 NanoBot 的定位继续向“统一编排多 provider”演进，这项能力很可能被纳入近期路线图。

- **[#4422](https://github.com/HKUDS/nanobot/issues/4422)**：Telegram Bot API 10.1 `sendRichMessage`  
  - 与现有 **[#4423](https://github.com/HKUDS/nanobot/pull/4423)** 形成直接关联。  
  - 说明 Telegram 富消息支持已从“需求”进入“实现/修正”阶段，落地概率高。

### 中优先级候选
- **[#4424](https://github.com/HKUDS/nanobot/pull/4424)**：memory archive 增加 provenance 上下文  
  - 这是记忆系统质量治理方向，适合提升长期对话的准确性和可追溯性。  
  - 若项目继续强化 agent memory，这类能力会很有价值。

- **[#4428](https://github.com/HKUDS/nanobot/pull/4428)**：token 估算缓存优化  
  - 虽然更偏性能，但会直接改善 agent loop 成本与响应效率，属于“基础设施优化”信号。

---

## 7. 用户反馈摘要
从今日 Issues 的描述与评论结构看，用户反馈主要集中在以下几点：

- **希望支持更多模型原生能力，而不只是“兼容 OpenAI 接口”**  
  - 来自 **[#4429](https://github.com/HKUDS/nanobot/issues/4429)**。  
  - 真实痛点是：不同 provider 的 reasoning/thinking 参数并不一致，用户希望 NanoBot 能把这些差异显式纳入配置层。

- **希望在 Telegram 上表达更复杂的内容**  
  - 来自 **[#4422](https://github.com/HKUDS/nanobot/issues/4422)**。  
  - 典型使用场景包括表格、任务清单、折叠说明和数学公式。  
  - 这说明用户不只是在“聊天”，而是在用 NanoBot 做“结构化知识输出”。

- **对稳定性和并发可靠性有明确期待**  
  - 由 **[#4425](https://github.com/HKUDS/nanobot/pull/4425)** 反映出来。  
  - 用户关注的不只是功能是否能用，还在意多会话同时运行时会不会互相污染。

总体上，今日反馈偏向“**能力边界扩展**”与“**运行质量提升**”，不满点主要不是产品方向，而是现有实现还不够贴近真实使用场景。

---

## 8. 待处理积压
严格来说，**今日没有明显的长期未响应积压**：所有关键 Issue / PR 都是在 **2026-06-20** 左右新建或更新，尚未形成陈旧堆积。

不过，维护者仍应优先关注以下**高价值待处理项**：

- **[#4425](https://github.com/HKUDS/nanobot/pull/4425)**：并发 race 修复，稳定性优先级高  
- **[#4423](https://github.com/HKUDS/nanobot/pull/4423)**：Telegram rich capability 误判修正  
- **[#4428](https://github.com/HKUDS/nanobot/pull/4428)**：token 估算性能优化  
- **[#4424](https://github.com/HKUDS/nanobot/pull/4424)**：memory provenance 治理  
- **[#4429](https://github.com/HKUDS/nanobot/issues/4429)**：custom provider thinking style 兼容  
- **[#4422](https://github.com/HKUDS/nanobot/issues/4422)**：Telegram rich message 支持

**结论：**当前没有“老问题压顶”的迹象，但有一批**新鲜且高相关**的功能/修复请求，若能持续快速处理，将显著提升 NanoBot 的口碑与稳定性。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-06-21）

## 1. 今日速览
今天 Hermes Agent 依然处于**高强度迭代与高反馈密度**状态：过去 24 小时内共有 **50 条 Issue 更新**、**50 条 PR 更新**，其中 Issues 以新开/活跃为主（47 条），说明社区仍在持续向项目输入真实场景问题。  
从内容上看，讨论热点高度集中在 **gateway、TUI/桌面端、认证/OAuth、消息平台适配（WhatsApp / Telegram / iMessage）** 等“核心链路”，这通常意味着项目正在从功能扩张转向稳定性和可用性打磨。  
同时，当前**没有新版本发布**，表明开发重心更多放在补丁与回归修复，而非对外版本节奏。  
综合判断：**活跃度很高，健康度总体可控，但短期内稳定性压力偏大，尤其是启动链路与跨平台消息桥接。**

---

## 2. 版本发布
**今日无新版本发布。**  
- 最新 Releases：无  
- 链接：<https://github.com/NousResearch/hermes-agent/releases>

---

## 3. 项目进展
> 说明：当前提供的数据中未展开“今日已合并/关闭的具体 PR 列表”，但总览显示 **8 个 PR 已合并/关闭**。以下以今天最关键、最具落地价值的修复/增强 PR 作为进展代表，它们直接对应社区高频问题，体现了项目正在快速收敛核心缺陷。

### 关键推进中的 PR
- **修复 voice beep 配置对 false-like 字符串的误判**  
  PR: [#49884](https://github.com/NousResearch/hermes-agent/pull/49884)  
  价值：修正 `voice.beep_enabled` 在 `"false" / "0" / "off"` 等字符串场景下被错误视为开启的问题，属于典型配置兼容性修复。

- **custom provider 现在正确尊重 `disable_tools`**  
  PR: [#49882](https://github.com/NousResearch/hermes-agent/pull/49882)  
  价值：补齐自定义 provider 的工具屏蔽逻辑，避免工具 schema 意外下发，直接关系到 provider 安全边界与兼容性。

- **gateway 增加数字审批快捷键**  
  PR: [#49881](https://github.com/NousResearch/hermes-agent/pull/49881)  
  价值：面向移动端/消息平台的高频交互优化，把 `/approve`、`/deny` 等命令简化为数字输入，显著改善审批体验。

- **computer-use 引入更精确的 AX 元素几何信息**  
  PR: [#49880](https://github.com/NousResearch/hermes-agent/pull/49880)  
  价值：提升坐标点击的可靠性，属于桌面自动化能力的重要底层增强。

- **修复 Kanban 看板横向滚动条缺失**  
  PR: [#49879](https://github.com/NousResearch/hermes-agent/pull/49879)  
  价值：这是典型的 UI 可用性修复，直接回应了视口较窄时列被裁切的问题。

- **修复 Photon sidecar 静默重连死循环**  
  PR: [#49876](https://github.com/NousResearch/hermes-agent/pull/49876)  
  价值：将 sidecar 异常死亡升级为明确 fatal 错误，避免 iMessage 通道“假活着、实际已死”的状态。

- **worktree 隔离默认开启**  
  PR: [#49862](https://github.com/NousResearch/hermes-agent/pull/49862)  
  价值：对并行多代理场景很关键，能减少同仓多会话文件冲突，提升工程化协作体验。

- **修复桌面工作区 cwd 在 continuation 中丢失**  
  PR: [#49860](https://github.com/NousResearch/hermes-agent/pull/49860)  
  价值：改善续会话后的上下文一致性，减少目录漂移导致的任务执行错误。

### 今日整体推进幅度
从方向上看，项目今天的推进非常清晰：  
- **把“会崩/会卡/会失联”的链路往可观测、可恢复方向收敛**；  
- **把桌面端、消息平台、审批交互等高频触点做成更顺手的产品体验**；  
- **把配置与 provider 兼容问题补齐**。  

这说明 Hermes Agent 正从“能用”进入“在复杂真实场景中稳定可用”的阶段。

---

## 4. 社区热点
今日讨论热度并非被单一话题垄断，而是多个核心模块同时升温。评论数最高的 Issue 多为 **2 条**，但主题覆盖了项目最关键的使用路径。

### 热点 1：WhatsApp 网关启动失败 / 路径计算错误
- Issue: [#49831](https://github.com/NousResearch/hermes-agent/issues/49831)  
- 关注点：editable/source install 下 WhatsApp bridge script 路径偏移，导致网关无法启动。  
- 背后诉求：用户希望“源码安装、可编辑安装、发行版安装”三种模式都能稳定工作，说明仓库安装形态兼容性很重要。

### 热点 2：Photon iMessage 流式输出的白色方块/tofu 问题
- Issue: [#49793](https://github.com/NousResearch/hermes-agent/issues/49793)  
- 关注点：流式输出过程中，光标/占位符会在消息里显示成白色方块。  
- 背后诉求：用户对“视觉完整性”和“流式体验”很敏感，尤其是面对消息平台时，任何闪烁或占位符泄漏都影响专业感。

### 热点 3：Gemini CLI Provider 失效
- Issue: [#49701](https://github.com/NousResearch/hermes-agent/issues/49701)  
- 关注点：Google Code Assist sunset 后，`google-gemini-cli` provider 直接不可用。  
- 背后诉求：用户依赖的模型入口一旦失效，会立即影响主工作流，因此 provider 兼容维护是项目核心竞争力之一。

### 热点 4：Windows Desktop App 启动过慢
- Issue: [#49867](https://github.com/NousResearch/hermes-agent/issues/49867)  
- 关注点：桌面端启动或构建卡住，启动时间过长。  
- 背后诉求：桌面产品的第一印象很大程度取决于启动速度，尤其对非技术用户更敏感。

### 热点 5：TUI session.close 资源泄漏
- Issue: [#49852](https://github.com/NousResearch/hermes-agent/issues/49852)  
- 关注点：会话反复 churn 后，进程、沙盒、浏览器、HTTP 资源会残留。  
- 背后诉求：用户期待“关掉会话就彻底释放资源”，否则会形成不可见的稳定性债务。

### 热点结论
今日热点主要集中在：  
**“消息平台桥接” + “桌面/TUI 稳定性” + “provider 兼容性”**。  
这说明社区当前最在意的不是单点新特性，而是**核心链路能否可靠工作**。

---

## 5. Bug 与稳定性
按严重程度从高到低整理如下，并标注是否已有对应 fix PR。

### P1 / 阻断级

- **gateway 启动失败：`ModuleNotFoundError cron.scheduler_provider`**  
  Issue: [#49824](https://github.com/NousResearch/hermes-agent/issues/49824)  
  影响：v0.17.0 网关直接崩溃，属于启动级阻断。  
  fix PR：**未在本次数据中看到明确对应 PR**。

- **Anthropic OAuth 登录 404，token exchange 失效**  
  Issue: [#49821](https://github.com/NousResearch/hermes-agent/issues/49821)  
  影响：Claude Pro/Max OAuth 登录流程中断，账号接入不可完成。  
  fix PR：**未见明确对应 PR**。

- **WhatsApp bridge 路径偏移导致网关无法启动**  
  Issue: [#49831](https://github.com/NousResearch/hermes-agent/issues/49831)  
  影响：editable/source install 直接 fatal error，影响 WhatsApp 平台可用性。  
  fix PR：**未见明确对应 PR**。

### P2 / 高严重度

- **Telegram 重复发送问题：`sendRichMessageDraft + fresh_final_after_seconds` 导致单条内容重复投递**  
  Issue: [#49812](https://github.com/NousResearch/hermes-agent/issues/49812)  
  影响：消息平台体验严重异常，用户端可见“刷屏”。  
  fix PR：与 Telegram 流程相关的修复 PR：[#49872](https://github.com/NousResearch/hermes-agent/pull/49872)

- **Photon iMessage 侧车死亡后静默重连死循环**  
  Issue: [#49858](https://github.com/NousResearch/hermes-agent/issues/49858)  
  影响：通道表面在线、实际无法恢复，属于“隐性宕机”。  
  fix PR：[#49876](https://github.com/NousResearch/hermes-agent/pull/49876)

- **TUI session.close 资源泄漏，可能导致会话积压**  
  Issue: [#49852](https://github.com/NousResearch/hermes-agent/issues/49852)  
  影响：长期运行后资源占用上升，需重启网关恢复。  
  fix PR：**未见对应 PR**。

- **Windows Terminal 工具创建可见 bash/cmd 窗口，抢占焦点**  
  Issue: [#49851](https://github.com/NousResearch/hermes-agent/issues/49851)  
  影响：干扰用户操作，桌面自动化体验受损。  
  fix PR：**未见对应 PR**。

- **iMessage 流式 cursor/tofu 白块显示**  
  Issue: [#49793](https://github.com/NousResearch/hermes-agent/issues/49793)  
  影响：界面瑕疵明显，影响产品观感。  
  fix PR：**未见对应 PR**。

- **memory_monitor 心跳未启动**  
  Issue: [#49773](https://github.com/NousResearch/hermes-agent/issues/49773)  
  影响：外部 watchdog 失去健康检查依据，运维可观测性下降。  
  fix PR：**未见对应 PR**。

### P3 / 中低严重度

- **voice.beep_enabled 对 quoted false-like 字符串处理错误**  
  Issue: [#49883](https://github.com/NousResearch/hermes-agent/issues/49883)  
  影响：配置语义错误，但通常不阻断主流程。  
  fix PR：[#49884](https://github.com/NousResearch/hermes-agent/pull/49884)

- **Kanban 看板无横向滚动条**  
  Issue: [#49878](https://github.com/NousResearch/hermes-agent/issues/49878)  
  影响：信息可达性差，偏 UI/UX 问题。  
  fix PR：[#49879](https://github.com/NousResearch/hermes-agent/pull/49879)

- **Kanban “→ ready” 按钮触发误诊断与 respawn guard**  
  Issue: [#49870](https://github.com/NousResearch/hermes-agent/issues/49870)  
  影响：看板状态流转异常，影响任务调度。  
  fix PR：[#49871](https://github.com/NousResearch/hermes-agent/pull/49871)

- **Auto-decompose 失败只写 DEBUG，INFO 下不可见**  
  Issue: [#49859](https://github.com/NousResearch/hermes-agent/issues/49859)  
  影响：问题“发生但看不见”，运维排查困难。  
  fix PR：[#49861](https://github.com/NousResearch/hermes-agent/pull/49861)

---

## 6. 功能请求与路线图信号
今天出现的功能需求，整体呈现出三个很明确的路线图信号：

### 信号 A：审批交互要更适合移动端/消息平台
- 功能请求: [#49865](https://github.com/NousResearch/hermes-agent/issues/49865)  
- 对应 PR: [#49881](https://github.com/NousResearch/hermes-agent/pull/49881)  
- 结论：这是**很可能进入下一版本**的功能，因为已有实现 PR，且诉求直接来自高频审批场景。

### 信号 B：桌面端与 CLI 的“多实例并行能力”仍是重点
- 功能请求/增强: [#49862](https://github.com/NousResearch/hermes-agent/pull/49862)（worktree 默认开启）  
- 关联需求：  
  - 浏览器隔离：[#49693](https://github.com/NousResearch/hermes-agent/issues/49693)  
  - 跨平台对话连续性：[#49730](https://github.com/NousResearch/hermes-agent/issues/49730)  
- 结论：项目正在往“多会话、多身份、多上下文并存”的方向演进，这对个人 AI 助手来说是很关键的路线。

### 信号 C：桌面端正在从“文本聊天”扩展到“可交互助手”
- 功能请求: [#49848](https://github.com/NousResearch/hermes-agent/issues/49848)（语音输入/输出）  
- 关联增强：[#49880](https://github.com/NousResearch/hermes-agent/pull/49880)（computer-use 更精准）  
- 结论：虽然语音能力目前还只是需求，但它与桌面端体验升级高度一致，属于中长期值得关注的方向。

### 其他路线图信号
- 会话归档：[#49818](https://github.com/NousResearch/hermes-agent/issues/49818)  
- 更强的技能体系：[#49873](https://github.com/NousResearch/hermes-agent/pull/49873)、[#49869](https://github.com/NousResearch/hermes-agent/pull/49869)  
- 结论：项目在继续强化“agent 能力层”和“工作流层”的可组合性。

---

## 7. 用户反馈摘要
从 Issue 描述可以提炼出几类非常真实的用户痛点：

### 1) 用户非常在意“能不能稳定启动”
- 典型反馈：桌面端启动慢、网关启动失败、配置路径错误、模块缺失。  
- 相关链接：  
  - [#49867](https://github.com/NousResearch/hermes-agent/issues/49867)  
  - [#49824](https://github.com/NousResearch/hermes-agent/issues/49824)  
  - [#49831](https://github.com/NousResearch/hermes-agent/issues/49831)

### 2) 用户会把 Hermes 用在真实工作流里，因此对消息平台稳定性很敏感
- 典型反馈：Telegram 重复投递、iMessage 流式视觉异常、WhatsApp 桥接失败。  
- 相关链接：  
  - [#49812](https://github.com/NousResearch/hermes-agent/issues/49812)  
  - [#49793](https://github.com/NousResearch/hermes-agent/issues/49793)  
  - [#49858](https://github.com/NousResearch/hermes-agent/issues/49858)

### 3) 用户希望“复杂能力”更像产品而不是脚本
- 典型反馈：希望有语音输入/输出、会话归档、横向滚动、审批快捷键。  
- 相关链接：  
  - [#49848](https://github.com/NousResearch/hermes-agent/issues/49848)  
  - [#49818](https://github.com/NousResearch/hermes-agent/issues/49818)  
  - [#49865](https://github.com/NousResearch/hermes-agent/issues/49865)  
  - [#49878](https://github.com/NousResearch/hermes-agent/issues/49878)

### 4) 用户对项目整体态度偏正面，但容错期待高
- 例如 [#49867](https://github.com/NousResearch/hermes-agent/issues/49867) 开头就明确表达了喜爱和认可，这说明用户黏性存在；但与此同时，他们也期待 Hermes 在桌面端和平台适配上达到“生产可用”水准。  
- 结论：**口碑基础不错，真正影响满意度的是稳定性与易用性。**

---

## 8. 待处理积压
以下是当前最值得维护者优先盯住的“高影响、低反馈”的积压项：它们大多刚出现不久，但严重性高、影响面广，建议尽快分派。

### 高优先级未解问题
- **WhatsApp bridge 路径错误，editable/source install 直接崩**  
  [#49831](https://github.com/NousResearch/hermes-agent/issues/49831)

- **Anthropic OAuth 登录 404，影响新用户接入**  
  [#49821](https://github.com/NousResearch/hermes-agent/issues/49821)

- **v0.17.0 gateway 因 cron.scheduler_provider 缺失启动失败**  
  [#49824](https://github.com/NousResearch/hermes-agent/issues/49824)

- **memory_monitor 心跳不启动，运维不可观测**  
  [#49773](https://github.com/NousResearch/hermes-agent/issues/49773)

- **TUI session.close 资源泄漏**  
  [#49852](https://github.com/NousResearch/hermes-agent/issues/49852)

### 仍需关注的功能/体验积压
- **跨平台 conversation continuity**  
  [#49730](https://github.com/NousResearch/hermes-agent/issues/49730)

- **浏览器多 profile / cookie 隔离**  
  [#49693](https://github.com/NousResearch/hermes-agent/issues/49693)

- **会话归档支持**  
  [#49818](https://github.com/NousResearch/hermes-agent/issues/49818)

- **桌面端语音输入/输出**  
  [#49848](https://github.com/NousResearch/hermes-agent/issues/49848)

### 需要尽快评审的修复 PR
- [#49876](https://github.com/NousResearch/hermes-agent/pull/49876) Photon sidecar 静默重连修复  
- [#49884](https://github.com/NousResearch/hermes-agent/pull/49884) voice beep 配置修复  
- [#49879](https://github.com/NousResearch/hermes-agent/pull/49879) Kanban 横向滚动修复  
- [#49871](https://github.com/NousResearch/hermes-agent/pull/49871) “→ ready” 误诊断修复  
- [#49861](https://github.com/NousResearch/hermes-agent/pull/49861) auto-decompose 可见性修复  
- [#49857](https://github.com/NousResearch/hermes-agent/pull/49857) Markdown 链接修复  

---

## 总体判断
2026-06-21 的 Hermes Agent 呈现出非常典型的“**高活跃、高反馈、高修复密度**”特征：社区不断暴露真实使用问题，维护端也在同步推出针对性的修复 PR。  
短期来看，项目的最大压力点仍在 **启动稳定性、消息平台适配、认证兼容、桌面端体验**；但从 PR 方向看，团队对这些痛点是有明确响应的。  
如果这些关键修复能在下一轮集中合并，Hermes Agent 的项目健康度会明显改善。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下为 **NanoClaw（qwibitai/nanoclaw）** 在 **2026-06-21** 的项目动态日报。整体来看，今日项目呈现出 **“低 Issue、轻发布、以维护性 PR 为主”** 的状态：没有新增或活跃 Issue，也没有新版本发布，但有 4 个开放 PR 持续推进，且主题集中在配置清理、容器运行时修复与文档完善。社区讨论热度不高，评论和反应都接近空白，说明今天更像是维护者主导的工程整理日，而非面向用户功能扩张日。  
项目健康度方面，**零新增 Issue** 是积极信号，但**缺少合并/发布**也意味着对外可见进展有限，当前更偏向“打地基”和消除技术债。  

---

## 1. 今日速览

- 今日 **Issue 侧完全静默**：过去 24 小时没有新增、活跃或关闭的 Issue，说明外部用户报障和需求反馈都较少。  
- **PR 侧有一定活跃度**：共 4 个 PR 更新，且都处于 Open 状态，内容集中在修复和清理旧配置，体现出项目当前以维护稳定性为优先。  
- **没有新版本发布**，因此今天没有面向用户的交付物落地。  
- 综合判断：项目当前处于 **低噪音、低冲突、维护驱动** 的健康状态，但对外可见推进速度偏慢。  
- GitHub 入口： [Repository](https://github.com/qwibitai/nanoclaw) ｜ [Issues](https://github.com/qwibitai/nanoclaw/issues) ｜ [Pull Requests](https://github.com/qwibitai/nanoclaw/pulls)

---

## 2. 项目进展

今日 **没有已合并或已关闭的重要 PR**，因此从“已完成交付”角度看，项目今天没有实质性版本推进。  
不过，4 个开放 PR 本身释放了明确的维护信号：主要在清理“过时全局记忆指令”、移除会被宿主启动时删除的 `groups/global/CLAUDE.md`、删除无效的 `/workspace/global` 挂载，以及补充 assistant-name 环境变量文档。这些工作虽然尚未合并，但共同指向一个目标：**减少运行环境漂移、提升容器启动一致性、降低配置维护成本**。  
从项目整体向前迈进的程度看，今天属于 **“基础设施整理推进了一步，但尚未形成面向用户的版本收益”**。

- 今日相关 PR：  
  - [#2824 fix: drop stale "Global Memory" instruction from main seed prompt](https://github.com/qwibitai/nanoclaw/pull/2824)  
  - [#2823 fix: remove groups/global/CLAUDE.md (host deletes it on every startup)](https://github.com/qwibitai/nanoclaw/pull/2823)  
  - [#2822 refactor(container-runner): drop dead /workspace/global mount](https://github.com/qwibitai/nanoclaw/pull/2822)  
  - [#2821 docs: document assistant-name environment variables](https://github.com/qwibitai/nanoclaw/pull/2821)

---

## 3. 社区热点

今日 **没有 Issues 评论活跃点**，且所有 PR 的评论数与反应数均为 0，因此严格来说没有“讨论最热”的话题。  
如果以“社区关注主题”替代“评论热度”，当前最值得关注的仍是这 4 个开放 PR，因为它们几乎代表了今天全部的讨论面向：

1. **全局记忆/seed prompt 清理**
   - [#2824](https://github.com/qwibitai/nanoclaw/pull/2824)
   - 诉求：去掉过时的 “Global Memory” 指令，避免模型行为受到无效提示污染。
2. **宿主会删除的配置文件移除**
   - [#2823](https://github.com/qwibitai/nanoclaw/pull/2823)
   - 诉求：消除启动时会被删掉的 `CLAUDE.md`，减少“看似存在、实际上不可依赖”的配置。
3. **容器挂载简化**
   - [#2822](https://github.com/qwibitai/nanoclaw/pull/2822)
   - 诉求：移除无效的 `/workspace/global` mount，减少容器复杂度与误导性配置。
4. **文档补齐**
   - [#2821](https://github.com/qwibitai/nanoclaw/pull/2821)
   - 诉求：把 assistant-name 环境变量说清楚，提升可配置性可发现性。

**背后诉求判断**：社区/维护侧更关心的是 **“减少配置歧义、修复运行时一致性、让文档和实际行为一致”**，而不是新增功能。

---

## 4. Bug 与稳定性

今日 **没有 Issues 级别的 Bug / 崩溃 / 回归报告**，因此没有来自用户报告的明确严重故障。  
但从开放 PR 主题看，项目正在主动处理几类潜在稳定性问题，按“可能影响范围”大致可这样排序：

1. **高优先级：过时的 Global Memory 指令可能影响模型行为**
   - PR：[#2824](https://github.com/qwibitai/nanoclaw/pull/2824)
   - 风险：seed prompt 中保留无效或过时指令，可能导致助手行为偏差、上下文污染。
   - 状态：已有 fix PR。  

2. **中优先级：`groups/global/CLAUDE.md` 在宿主启动时被删除**
   - PR：[#2823](https://github.com/qwibitai/nanoclaw/pull/2823)
   - 风险：配置文件在运行时不可持久，容易引发“文档与实际不一致”的稳定性问题。
   - 状态：已有 fix PR。  

3. **中低优先级：无效的 `/workspace/global` 挂载**
   - PR：[#2822](https://github.com/qwibitai/nanoclaw/pull/2822)
   - 风险：更多是架构债与维护噪音，通常不直接造成故障，但会增加运行时理解成本。
   - 状态：已有 fix PR。  

4. **低优先级：assistant-name 环境变量文档不完整**
   - PR：[#2821](https://github.com/qwibitai/nanoclaw/pull/2821)
   - 风险：主要影响可用性与配置正确率，不属于直接崩溃类问题。
   - 状态：已有文档补强 PR。  

**结论**：今日没有外部 bug 报告，但项目内部正在围绕“稳定性与配置一致性”做前置修复，方向是正向的。

---

## 5. 功能请求与路线图信号

今日没有新增 Issues，因此 **没有来自用户侧的直接功能请求**。  
但从 PR 内容可以看出，项目短期路线图更偏向以下方向：

- **配置与环境变量可见性增强**
  - [#2821](https://github.com/qwibitai/nanoclaw/pull/2821)
  - 这类文档增强通常会被纳入下一个小版本，因为风险低、收益明确。

- **运行时和容器结构瘦身**
  - [#2822](https://github.com/qwibitai/nanoclaw/pull/2822)
  - [#2823](https://github.com/qwibitai/nanoclaw/pull/2823)
  - 这类变更多半是为后续功能铺路，属于高概率合并项。

- **提示词/记忆机制清理**
  - [#2824](https://github.com/qwibitai/nanoclaw/pull/2824)
  - 如果该 PR 合并，说明项目会持续收敛“提示词即配置”的复杂度。

**路线图信号判断**：NanoClaw 近期更可能优先发布一轮 **“稳定性/维护型版本”**，而不是新增大功能。  
- GitHub 参考： [Issues](https://github.com/qwibitai/nanoclaw/issues) ｜ [Pull Requests](https://github.com/qwibitai/nanoclaw/pulls)

---

## 6. 用户反馈摘要

今日 **没有 Issues 评论**，因此无法从真实用户反馈中提炼痛点、场景或满意度。  
不过，从当前 PR 主题可以推断出几类“隐含用户痛点”：

- 用户/维护者希望 **不要依赖会被宿主启动删除的文件**，否则配置会反复丢失。  
- 用户希望 **提示词和运行时行为一致**，避免旧的全局记忆规则继续影响助手。  
- 用户需要 **更清晰的环境变量说明**，降低首次配置和排障成本。  

这些并非正式的用户反馈结论，而是从 PR 主题反推的工程侧信号。  
- 参考链接： [Issues](https://github.com/qwibitai/nanoclaw/issues) ｜ [#2821](https://github.com/qwibitai/nanoclaw/pull/2821) ｜ [#2823](https://github.com/qwibitai/nanoclaw/pull/2823) ｜ [#2824](https://github.com/qwibitai/nanoclaw/pull/2824)

---

## 7. 待处理积压

今日没有长期未响应的重要 Issue，因为 **Issue 总量为 0 条**，不存在历史积压问题。  
但从 PR 队列看，当前的“待处理积压”实际上集中在 **4 个开放 PR** 上，且都未合并：

- [#2824](https://github.com/qwibitai/nanoclaw/pull/2824) — 清理过时的 Global Memory 指令  
- [#2823](https://github.com/qwibitai/nanoclaw/pull/2823) — 移除会被宿主删除的 `CLAUDE.md`  
- [#2822](https://github.com/qwibitai/nanoclaw/pull/2822) — 删除无效的 `/workspace/global` mount  
- [#2821](https://github.com/qwibitai/nanoclaw/pull/2821) — 补充 assistant-name 环境变量文档  

**维护提醒**：这些 PR 都是低风险、高一致性收益的维护项，建议优先评审并尽快收敛，否则会继续堆积为“配置与文档债”。  
- GitHub 入口： [Pull Requests](https://github.com/qwibitai/nanoclaw/pulls)

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发到飞书/企业微信的简报版**，或  
2. **更像投研/项目观察报告的专业版**。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

以下为 **NullClaw（nullclaw/nullclaw）截至 2026-06-21 的项目动态日报**。  
整体看，过去 24 小时项目**活跃度偏低**：没有新的 Release，也没有 PR 更新，唯一的新增信号来自 1 条高频复现的 Bug 报告。当前仓库的“推进”主要体现在社区反馈输入，而非代码合并输出，说明项目仍处在**问题收集与稳定性排查**阶段。  
从健康度看，项目暂无明显失控迹象，但需要关注这条 Bug 是否会影响核心对话链路与用户体验。  
仓库主页：<https://github.com/nullclaw/nullclaw>

---

## 1) 今日速览
- 今日项目整体状态可概括为：**低更新、单点问题驱动**。过去 24 小时仅有 1 条 Issues 更新，且无 PR、无发布，说明开发侧没有明显的代码交付动作。  
- 当前最值得关注的是一条 **`NoResponseContent`** 错误报告，且用户描述其在特定模型与 API Key 组合下出现频率较高，具有一定复现价值与排查价值。  
- 从数据上看，社区讨论热度不高，但问题本身贴近核心功能（对话响应），因此对用户体验的影响可能大于表面数量。  
- 项目今天的健康度判断：**运行平稳，但需要尽快确认该 Bug 是否为回归或兼容性问题**。  
- Issues 页：<https://github.com/nullclaw/nullclaw/issues>

---

## 2) 版本发布
- **今日无新版本发布。**  
- Releases 页：<https://github.com/nullclaw/nullclaw/releases>

---

## 3) 项目进展
- **今日无 PR 合并或关闭。**  
- 这意味着过去 24 小时项目没有可量化的功能推进、修复落地或重构完成记录。  
- 从趋势上看，项目的“前进”主要来自问题收集而不是代码迭代；如果该 Bug 后续被修复并通过 PR 合并，才会形成真正的进展闭环。  
- Pull Requests 页：<https://github.com/nullclaw/nullclaw/pulls>

---

## 4) 社区热点
今日社区最值得关注的讨论点只有 1 条，且没有评论与反应堆积，说明**没有形成广泛讨论，但问题本身足够关键**：

1. **#967 [OPEN] [bug] error: NoResponseContent**  
   链接：<https://github.com/nullclaw/nullclaw/issues/967>  
   - 作者：svier0  
   - 创建/更新：2026-06-20  
   - 评论：0，👍：0  
   - 背后诉求：用户在 Windows 11、特定版本 `v2026.5.29`、特定模型 `Agnes-2.0-Flash` 下，多次遇到 `error: NoResponseContent`。从描述看，用户关心的是**实际对话可用性与响应稳定性**，而不是单纯功能新增。  
   - 这类问题往往意味着：响应解析、流式输出、模型供应商兼容性、网络返回空内容、或中间层消息协议转换存在异常。  
   - PR 关联：**暂无对应 fix PR**。  

---

## 5) Bug 与稳定性
按严重程度排序，今日唯一明确问题如下：

1. **#967 [OPEN] [bug] error: NoResponseContent**  
   链接：<https://github.com/nullclaw/nullclaw/issues/967>  
   - 严重性评估：**中高**  
   - 理由：该问题出现在“发起对话后无响应内容”的核心路径上，属于会直接打断使用体验的稳定性问题；且用户反馈显示其在 21 次对话中出现 12 次，属于**高频复现**。  
   - 环境信息较完整：Windows 11、`v2026.5.29`、来源于正式发布包、指定模型与 API Key 组合。  
   - 影响范围：可能涉及特定模型适配、API 响应结构变化或客户端容错不足。  
   - 是否已有 fix PR：**没有**（当前无 PR 更新）。  
   - 建议维护者优先确认：是否为模型供应商侧空响应、协议层解析失败，或版本回归。  

---

## 6) 功能请求与路线图信号
- **今日没有新增功能请求被记录。**  
- 从现有信息看，用户关注点并非新能力，而是**现有对话能力的可靠性**。这类信号通常会优先推动“修复/兼容性增强/容错优化”，而不是新增功能。  
- 由于当前没有 PR 活动，也没有可观察的功能分支，因此**短期内更可能纳入下一版本的是稳定性修复，而非新特性**。  
- Issues 页（用于跟踪后续功能请求）：<https://github.com/nullclaw/nullclaw/issues>  
- PR 页（用于观察路线图落地）：<https://github.com/nullclaw/nullclaw/pulls>

---

## 7) 用户反馈摘要
从现有 Issue 描述中可以提炼出以下真实反馈：

- **痛点：响应链路偶发失效**  
  用户实际遇到的是“已经发出请求，但客户端返回 `NoResponseContent`”，这会被感知为“模型没回答/对话中断”。  
  链接：<https://github.com/nullclaw/nullclaw/issues/967>

- **使用场景：本地/桌面端日常对话与多轮交互**  
  用户在 Windows 11 上使用官方发布包，说明这不是开发环境下的边缘问题，而是较接近真实用户场景。  
  链接：<https://github.com/nullclaw/nullclaw/issues/967>

- **不满意点：高频复现但结果不稳定**  
  用户给出“>50%”的出现频率与具体对话次数，表明问题不是偶发噪声，而是**可感知、可重复、影响明显**。  
  链接：<https://github.com/nullclaw/nullclaw/issues/967>

- **未见反馈：当前无评论、无补充日志**  
  这意味着社区尚未围绕该问题展开协作排查，维护者可能需要主动补充提问模板或日志采集建议。  
  链接：<https://github.com/nullclaw/nullclaw/issues/967>

---

## 8) 待处理积压
当前可识别的积压项较少，但有 1 条值得优先关注：

1. **#967 [OPEN] [bug] error: NoResponseContent**  
   链接：<https://github.com/nullclaw/nullclaw/issues/967>  
   - 状态：OPEN  
   - 评论：0，说明尚未进入社区协作排查阶段  
   - 风险：若确认为核心对话路径问题，将影响较大  
   - 建议：尽快补充复现条件、日志采集点、模型/供应商兼容范围，以及是否与 `v2026.5.29` 回归相关  

---

### 总体结论
NullClaw 今日呈现出**“无发布、无 PR、单个高频 Bug 报告”**的典型低活动状态。短期内项目健康度尚可，但稳定性问题已经出现在核心使用路径，若后续没有及时响应，容易从单点问题演变为用户信任问题。  
建议维护团队优先跟进 **#967**，并在下一次版本节奏中优先覆盖对话响应容错与模型兼容性排查。

如果你希望，我也可以把这份日报进一步整理成：
1. **更适合管理层阅读的简版**，或  
2. **适合直接发到 Slack/飞书/Notion 的 Markdown 版本**。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

以下为 **2026-06-21 IronClaw 项目动态日报**（基于近 24 小时 GitHub 数据）：

---

## 1. 今日速览
过去 24 小时，IronClaw 的活动主要集中在 PR 层面：**8 条 PR 更新、0 条 Issues 更新、0 个新版本发布**。从节奏看，项目当前处于**“代码推进明显、问题面平稳”**的状态，没有新增问题单，说明公开反馈面较安静。PR 内容高度集中在 **manifest 驱动的 ingress/认证/传输重构**、**安全/测试修复** 和 **CI 稳定性改进**，体现出项目正在从“功能扩展”转向“架构收敛与质量硬化”。整体活跃度可评为**中等偏高**：维护者与自动化代理仍在持续推进核心改造，但社区讨论热度不高。

- GitHub Issues 总览：<https://github.com/nearai/ironclaw/issues>
- GitHub Pull Requests 总览：<https://github.com/nearai/ironclaw/pulls>

---

## 2. 版本发布
**今日无新版本发布。**  
- Releases 页面：<https://github.com/nearai/ironclaw/releases>

---

## 3. 项目进展
今日最重要的进展来自 **5 个已关闭 PR**，方向非常集中，说明项目正处于一次较大的底层重构收敛期：

### 已合并/关闭的重要 PR
1. **[#5103](https://github.com/nearai/ironclaw/pull/5103)**  
   `feat(host-ingress): manifest-projected ingress policy + typed auth + transport discriminator`  
   这是本轮“manifest-driven channels”工作的关键入口，把 **ingress policy、auth、transport** 从 Rust 侧选择逻辑转向 **typed manifest data**。这类改造通常会显著降低后续扩展成本，并提升配置一致性。

2. **[#5104](https://github.com/nearai/ironclaw/pull/5104)**  
   `feat(host-ingress): typed auth verifier + transport discriminator (Move 2)`  
   在 ingress 链路上进一步**删除间接层**，强化认证校验的 fail-close 语义。对安全性与可维护性都很关键。

3. **[#5102](https://github.com/nearai/ironclaw/pull/5102)**  
   `feat(extensions): cross-contract credential coherence in v2 manifest projection (Move 3)`  
   引入跨 contract 的 credential 一致性约束，解决“各自校验、整体不一致”的风险，属于**配置正确性与安全边界**层面的补强。

4. **[#5106](https://github.com/nearai/ironclaw/pull/5106)**  
   `feat(serve): collapse per-channel host-ingress mount sprawl into one generic plan (Move 4)`  
   将 Slack/Telegram 等通道的重复 mount 逻辑合并为通用方案，减少分支矩阵与重复代码，属于典型的**架构简化**。

5. **[#5105](https://github.com/nearai/ironclaw/pull/5105)**  
   `test(safety,auth): fix three stale provider/OAuth guard tests broken on main`  
   修复 3 个在 main 上失效的安全/认证测试。虽然这些被判定为“旧测试与新行为不一致”，但它们直接影响安全回归信号，修复价值很高。

### 今日整体推进判断
- 项目不是在“增加一个小功能”，而是在推进一条完整的 **manifest 驱动 channel ingress / auth / transport 统一化链路**。
- 已关闭 PR 主要完成了 **政策、认证、传输、凭据一致性、服务挂载** 的收敛。
- 这意味着 IronClaw 在“可配置性、可验证性、可维护性”三个方面都向前推进了一大步。

---

## 4. 社区热点
今日 **没有明显的社区讨论热点**：  
- Issues 数量为 0，且无评论数据可见。  
- PR 的评论/反应字段也未显示有效活跃度（多数为 `undefined` 或 0）。

### 可视为“关注度较高”的 PR（但不是评论热点）
- **[#5107](https://github.com/nearai/ironclaw/pull/5107)**  
  `feat: manifest-driven channel ingress contract ...`  
  体量最大、覆盖面最广，是当前工作主线的集大成者，理论上最容易引发评审讨论。
- **[#5108](https://github.com/nearai/ironclaw/pull/5108)**  
  `fix(skills,host_runtime,gsuite): close reborn-closure tail failures`  
  涉及安全相关 over-exposure 修复，属于高关注度潜在议题。

### 背后诉求分析
虽然没有公开评论热度，但从 PR 主题可以看出，项目当前最核心的诉求是：
1. **统一入口定义**：减少 provider-specific Rust 逻辑。
2. **降低安全/配置歧义**：让 auth、transport、credentials 都能由 manifest 统一表达。
3. **提高 CI 可信度**：让失败更接近真实问题，而非旧测试或安装链路噪音。

---

## 5. Bug 与稳定性
今日未新增 Issues，但从 PR 内容中可以识别出若干**稳定性/缺陷修复信号**，按严重程度排序如下：

### 1) 安全相关 over-exposure 风险
- **[#5108](https://github.com/nearai/ironclaw/pull/5108)**  
  `fix(skills,host_runtime,gsuite): close reborn-closure tail failures`  
  摘要明确提到：`ironclaw_host_runtime` 的 **GitHub tool over-exposure** 是“真实的安全相关 over-exposure bug”。  
  - 严重程度：**高**
  - 状态：**已有修复 PR，当前为 OPEN**
  - 影响：可能导致 manifest 视图或工具暴露超出预期权限边界。

### 2) main 分支上的安全/认证测试失效
- **[#5105](https://github.com/nearai/ironclaw/pull/5105)**  
  `test(safety,auth): fix three stale provider/OAuth guard tests broken on main`  
  这些测试失败被确认是**旧测试断言过时**，并非真实回归。  
  - 严重程度：**中**
  - 状态：**已有修复 PR，已 CLOSED**
  - 影响：影响安全回归信号的可信度，但不一定代表运行时 bug。

### 3) live canary 安装链路不稳定
- **[#5101](https://github.com/nearai/ironclaw/pull/5101)**  
  `ci: reuse cargo-component installer in live canary`  
  该 PR 指出 live canary 中的 cargo-component 安装方式需要与其他工作流一致，且不应吞掉安装失败。  
  - 严重程度：**中**
  - 状态：**OPEN，仍待处理**
  - 影响：CI 可观测性和发布前验证可靠性。

### 4) 入口/配置一致性潜在缺陷已被结构化修复
- **[#5102](https://github.com/nearai/ironclaw/pull/5102)**、**[#5103](https://github.com/nearai/ironclaw/pull/5103)**、**[#5104](https://github.com/nearai/ironclaw/pull/5104)**  
  这些不是“事故型 bug”，但本质上是在修补 ingress/auth/credential 的结构性风险。  
  - 严重程度：**中**
  - 状态：**已关闭**
  - 影响：减少未来配置分叉、权限判断不一致、错误放行等稳定性问题。

---

## 6. 功能请求与路线图信号
今日没有新增 Issues，因此**没有直接来自用户的功能请求**记录。  
不过，从 PR 方向可以很清晰地读出后续路线图信号：

### 可能进入下一版本的方向
1. **Manifest 驱动的通道接入统一化**
   - 对应 PR：**[#5103](https://github.com/nearai/ironclaw/pull/5103)**、**[#5104](https://github.com/nearai/ironclaw/pull/5104)**、**[#5107](https://github.com/nearai/ironclaw/pull/5107)**
   - 价值：减少 channel/provider 的硬编码差异，让接入逻辑更一致。

2. **跨 contract 的凭据与权限一致性**
   - 对应 PR：**[#5102](https://github.com/nearai/ironclaw/pull/5102)**、**[#5108](https://github.com/nearai/ironclaw/pull/5108)**
   - 价值：这类能力通常会进入“安全增强版”发布说明，优先级较高。

3. **CI/Canary 稳定性整治**
   - 对应 PR：**[#5101](https://github.com/nearai/ironclaw/pull/5101)**、**[#5105](https://github.com/nearai/ironclaw/pull/5105)**
   - 价值：提升主干可信度，适合作为下一轮版本发布前的前置条件。

### 路线图判断
如果这些 PR 继续推进，下一版本很可能围绕：
- **统一 ingress contract**
- **安全校验前移**
- **减少 Rust 侧 provider 特化代码**
- **改善 CI 对真实问题的识别能力**

---

## 7. 用户反馈摘要
**今日没有 Issues 评论数据，因此没有可提炼的直接用户反馈。**  
- Issues 总览：<https://github.com/nearai/ironclaw/issues>

### 但从 PR 内容可推断出的“间接反馈”信号
1. **用户/维护者在意安全边界是否清晰**
   - `over-exposure bug`、`fail-close`、`OAuth guard tests` 这些关键词表明，项目对权限外溢非常敏感。

2. **用户希望配置与接入方式更统一**
   - “manifest-defined”“typed manifest data”“generic plan”等表述说明，当前架构被认为过于分散，维护成本偏高。

3. **用户/维护者希望 CI 更可靠**
   - `reborn-closure tail failures`、`stale tests`、`cargo-component installer` 的修复都指向同一个痛点：**减少假失败与隐藏失败**。

### 满意/不满意点
- **满意点**：团队在主动消除复杂性，说明项目在向成熟平台演进。
- **不满意点**：从修复主题看，当前仍存在一些“历史包袱式”的测试/配置问题，需要持续清理。

---

## 8. 待处理积压
当前**没有长期未响应的 Issues**，因为今日 Issues 为 0。  
但从维护角度看，值得优先跟进的“待处理积压”实际上是 3 个开放 PR：

1. **[#5107](https://github.com/nearai/ironclaw/pull/5107)**  
   `feat: manifest-driven channel ingress contract ...`  
   - 体量最大，可能是当前主线的最终整合版，建议优先评审。

2. **[#5108](https://github.com/nearai/ironclaw/pull/5108)**  
   `fix(skills,host_runtime,gsuite): close reborn-closure tail failures`  
   - 涉及安全相关 over-exposure，建议优先验证和合并。

3. **[#5101](https://github.com/nearai/ironclaw/pull/5101)**  
   `ci: reuse cargo-component installer in live canary`  
   - 属于 CI 可观测性和稳定性优化，适合作为短周期收尾项。

### 维护建议
- 优先处理 **#5108** 的安全边界修复。
- 尽快评审 **#5107**，避免多个分散 PR 重复演进。
- 对 **#5101** 做合并前检查，确保 live canary 与主工作流一致。

- Pull Requests 总览：<https://github.com/nearai/ironclaw/pulls>

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发 Slack/飞书的简版**  
2. **适合管理层阅读的 1 页摘要版**  
3. **带“风险等级/影响范围/建议动作”的运营表格式版本**

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

# Moltis 项目动态日报（2026-06-21）

## 1. 今日速览
Moltis 在过去 24 小时内呈现出**典型的维护型低活跃状态**：Issues 侧完全静默，未出现新问题或问题推进；PR 侧只有 2 条依赖更新相关变动。  
当前工作重心明显集中在 **Dependabot 驱动的依赖同步**，而非功能开发或故障修复。  
从健康度看，项目整体较稳定，没有暴露出新增 Bug 风险或社区争议点。  
但从协作活跃度看，今天的“推进”主要来自自动化依赖治理，说明项目仍处于持续维护而非快速迭代阶段。  
链接： [仓库主页](https://github.com/moltis-org/moltis)

## 2. 版本发布
今日**无新版本发布**，GitHub Releases 为空。  
链接： [Releases](https://github.com/moltis-org/moltis/releases)

## 3. 项目进展
今天最重要的进展来自依赖维护类 PR，而不是产品功能本身：

- [#1133](https://github.com/moltis-org/moltis/pull/1133) — `chore(deps): bump astro from 6.3.3 to 6.4.8 in /docs`
  - 状态：**CLOSED**
  - 作用范围：`/docs`
  - 影响：将 `astro` 从 6.3.3 升级到 6.4.8，属于文档站点构建链路的依赖更新。
  - 这类改动通常意味着：修补已知漏洞、跟进上游兼容性、减少未来构建失败概率。

- [#1134](https://github.com/moltis-org/moltis/pull/1134) — `chore(deps): bump the npm_and_yarn group across 2 directories with 2 updates`
  - 状态：**OPEN**
  - 作用范围：`/docs` 与 `/website`
  - 涉及依赖：`astro`、`undici`
  - 说明：这是一个更广泛的依赖升级 PR，覆盖文档与官网站点，说明维护者正在做一次统一的前端/站点依赖整理。

**整体推进判断：**  
今天项目没有新增功能合并，但依赖治理的持续推进对项目稳定性有正向作用；若 #1134 后续顺利通过检查并合并，可视为对文档与网站构建链路的一次小幅稳态增强。  
链接： [PR #1133](https://github.com/moltis-org/moltis/pull/1133) / [PR #1134](https://github.com/moltis-org/moltis/pull/1134)

## 4. 社区热点
今日**无明显社区热点**。  
- Issues：0 条更新
- PR 评论数：数据未提供明确数值（`undefined`）
- 反应数：均为 0

这表明社区讨论处于低温状态，目前没有看到围绕功能设计、使用阻塞或 bug 争议的集中反馈。  
从诉求结构看，今天的互动几乎全部来自自动化依赖更新，而不是用户主动发起的问题讨论。  
链接： [Issues 列表](https://github.com/moltis-org/moltis/issues) / [Pull Requests 列表](https://github.com/moltis-org/moltis/pulls)

## 5. Bug 与稳定性
今日**未发现新增 Bug、崩溃或回归问题**。  
按严重程度排序，当前可见问题为：

1. **无已报告问题**
   - 过去 24 小时 Issues 更新为 0，没有新开或活跃问题。
   - 暂无对应 fix PR。

从稳定性角度看，这是一种“低噪音”状态：  
- 没有用户报错信号
- 没有回归讨论
- 没有高优先级修复排队

这通常意味着当前版本/主干没有显著暴露面，但也可能说明用户反馈渠道活跃度偏低。  
链接： [Issues 列表](https://github.com/moltis-org/moltis/issues)

## 6. 功能请求与路线图信号
今日**没有新的功能请求信号**。  
可见 PR 全部为依赖升级，未出现围绕 AI 智能体能力、个人助手工作流、集成接口或产品体验增强的需求提交。

从路线图信号看，当前更像是在为后续功能开发“清理技术债”和“稳固基础设施”：
- [#1134](https://github.com/moltis-org/moltis/pull/1134) 显示 docs/website 依赖统一升级在推进
- 这类工作通常优先于下一轮功能迭代前完成，以降低发布风险

**判断：**  
若后续出现新版本，优先纳入的很可能仍是依赖更新、构建链路修复和站点稳定性提升，而不是用户侧新功能。  
链接： [PR #1134](https://github.com/moltis-org/moltis/pull/1134)

## 7. 用户反馈摘要
今日**没有可提炼的用户反馈**。  
原因是：
- Issues 更新为 0
- 未提供有效评论内容
- PR 也没有可见的讨论热度

因此，本日无法从 GitHub 评论中归纳真实用户痛点、使用场景或满意/不满意点。  
从信息空白本身可以推测：当前项目的反馈入口可能较少被使用，或者用户问题更多沉淀在外部渠道。  
链接： [Issues 列表](https://github.com/moltis-org/moltis/issues)

## 8. 待处理积压
从这份 24 小时数据看，**没有明确的长期未响应 Issue**。  
但有一个需要维护者持续关注的开放项：

- [#1134](https://github.com/moltis-org/moltis/pull/1134) — 依赖升级 PR，当前仍处于 OPEN
  - 涉及 `docs` 与 `website`
  - 这类 PR 虽然不是紧急 bug，但如果卡在 CI、兼容性或审查环节，容易成为短期积压

此外，[#1133](https://github.com/moltis-org/moltis/pull/1133) 已关闭，可能意味着该升级路径已被更广泛的 #1134 覆盖或替代。  
建议维护者优先确认 #1134 的构建结果与依赖兼容性，避免文档/站点链路出现隐性漂移。  
链接： [PR #1134](https://github.com/moltis-org/moltis/pull/1134) / [PR #1133](https://github.com/moltis-org/moltis/pull/1133)

---

**总体结论：**  
Moltis 今日表现为**稳定、低噪音、以自动化依赖维护为主**的项目状态；没有版本发布、没有新 Issue、没有社区争议，健康度偏稳，但活跃度偏低。  
如果后续 2-3 天仍维持类似状态，可以判断项目正处于“轻维护、低互动”的运行阶段。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报  
**日期：2026-06-21**  
**数据窗口：过去 24 小时**

---

## 1) 今日速览
过去 24 小时，CoPaw 生态整体保持活跃：**4 条 Issue 更新、5 条 PR 更新、0 个新版本发布**。  
当前讨论重心明显偏向**稳定性、兼容性、安全边界与性能优化**，而不是新功能扩张。  
值得注意的是，今天**没有 PR 合并/关闭**，说明项目推进更多停留在社区提交与评审阶段，代码落地尚未转化为可发布版本。  
从健康度看，项目处于**“活跃但审核堆积”**状态：输入充足、方向明确，但交付节奏仍受 review/merge 阶段制约。  

---

## 2) 版本发布
**今日无新版本发布。**  
仓库当前未见新的 release，说明本轮变化主要仍在开发和讨论中，尚未进入发布节奏。

---

## 3) 项目进展
今日没有任何 PR 被合并或关闭，因此**代码层面的直接落地为 0**。不过，新增的 5 个开放 PR 显示项目正在多个关键方向上同时推进：

- **内存框架升级**：`#5349` 将 memory runtime 迁移到 ReMe4  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/5349>
- **会话级 KV Cache 优化**：`#5348` 冻结 env_context 日期，减少 prefix 变化导致的缓存失效  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/5348>
- **Cron 稳定性修复**：`#5347` 启动时清理无效 jobs.json 条目  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/5347>
- **Docker 中工具运行**：`#5346` 目标是增强容器化环境下的工具执行能力  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/5346>
- **文件工具安全收敛**：`#5341` 限制文件工具只能访问 agent workspace  
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/5341>

**整体判断：**项目当前的推进重点不是“新增功能堆叠”，而是围绕**内存、缓存、任务调度、沙箱、安全边界**做基础能力加固。这类 PR 若能尽快合并，会显著提升项目的可靠性与可部署性。

---

## 4) 社区热点
今日讨论最活跃的是几个**评论数为 1 的 Issue**，表明用户已提出明确问题，且正在等待维护者反馈或修复路径确认。

### 热点 1：自定义 OpenAI-compatible Provider 不支持 function calling
- Issue：`#5345 [bug] Custom OpenAI-compatible providers (e.g. OMLX) don't support function calling`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5345>
- 诉求：用户希望**自定义 OpenAI 兼容提供商**也能完整支持工具调用，而不是只能返回纯文本。
- 背后信号：项目的 provider 抽象在“标准接口”层面可能还不够统一，用户已经在真实生产/验证环境中遇到兼容性断点。

### 热点 2：忙碌状态下消息被静默丢弃
- Issue：`#5344 [Bug]: /api/console/chat returns 200 but silently drops messages when agent is busy`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5344>
- 诉求：用户更在意**消息可靠投递**，而不是接口返回码；“HTTP 200 但消息丢失”属于高风险体验问题。
- 背后信号：用户正在把项目用于连续对话或并发交互场景，对**队列、忙碌态、消息一致性**要求很高。

### 热点 3：工具结果大小上限需要执行层防御
- Issue：`#5342 feat: hard cap on tool result size at execution layer`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5342>
- 诉求：希望在执行层对工具结果做硬限制，避免上下文爆炸和连锁失败。
- 背后信号：项目正在面对更复杂的 agent 工作流，**长上下文、失败恢复、上下文清理**已成为现实问题。

---

## 5) Bug 与稳定性
按影响面与严重性排序，今日新增问题主要集中在以下三类：

### 1. 高严重性：忙碌时消息静默丢失
- Issue：`#5344`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5344>
- 影响：用户请求看似成功，但实际上未进入 agent 处理链路，属于**数据/交互可靠性问题**。
- 当前状态：**暂无对应 fix PR**。

### 2. 中高严重性：自定义 provider 无法触发 function calling
- Issue：`#5345`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5345>
- 影响：限制了 OpenAI-compatible provider 的可替换性，可能直接影响工具型 agent 的能力完整性。
- 当前状态：**暂无对应 fix PR**。

### 3. 中等严重性：工具结果过大导致上下文膨胀风险
- Issue：`#5342`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5342>
- 影响：在 LLM 调用失败或跳过清理钩子时，工具结果会累积并放大后续失败概率，属于**稳定性隐患**。
- 当前状态：**暂无对应 fix PR**。

### 相关补充
- `#5343` 已关闭，标题与 `#5344` 一致：  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5343>  
  这通常意味着该问题可能已被合并到另一个跟进项、被判定为重复，或维护者已采取其他处理方式。  

---

## 6) 功能请求与路线图信号
今天新增的 PR 和 Issue 共同释放出一些较强的路线图信号，以下方向很可能进入下一轮优先级：

### 高概率进入下一版本的方向
1. **Memory Runtime 升级到 ReMe4**  
   PR：`#5349`  
   链接：<https://github.com/agentscope-ai/QwenPaw/pull/5349>  
   信号：说明内存框架在重构，属于底层能力升级，落地后影响面广。

2. **缓存命中率优化 / KV Cache 稳定性提升**  
   PR：`#5348`  
   链接：<https://github.com/agentscope-ai/QwenPaw/pull/5348>  
   信号：这是典型的性能优化诉求，且和会话体验直接相关。

3. **安全边界收紧：文件工具 workspace 限制**  
   PR：`#5341`  
   链接：<https://github.com/agentscope-ai/QwenPaw/pull/5341>  
   信号：说明项目在向更安全的 agent 执行环境演进。

4. **Docker 环境下工具可执行性增强**  
   PR：`#5346`  
   链接：<https://github.com/agentscope-ai/QwenPaw/pull/5346>  
   信号：更像部署兼容性增强，若目标用户包含本地/容器化部署，这类需求优先级通常较高。

### 可能被吸收进下一轮修复的需求
- **OpenAI-compatible provider 的 function calling 完整支持**  
  Issue：`#5345`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5345>
- **工具结果上限与执行层防御**  
  Issue：`#5342`  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5342>

**判断：**如果维护团队希望下一版本强调“可用性 + 安全 + 性能”，那么今天这些 PR/Issue 几乎就是最直接的路线图信号。

---

## 7) 用户反馈摘要
从 Issue 描述里可以提炼出几类非常真实的用户痛点：

### 1. “接口返回成功，但实际没做事”是最不能接受的体验
- 来源：`#5344`
- 用户场景：agent 正在处理对话，用户继续发消息。
- 痛点：系统没有明确拒绝，而是**静默丢消息**，这会严重破坏用户对系统可靠性的信任。  
- 链接：<https://github.com/agentscope-ai/QwenPaw/issues/5344>

### 2. 用户希望真正做到“OpenAI 兼容”
- 来源：`#5345`
- 用户场景：接入 OMLX 等自定义 provider，希望像 Ollama 一样支持工具调用。
- 痛点：当前“兼容”可能只停留在聊天接口层，而未覆盖 **tools/function calling** 全链路。  
- 链接：<https://github.com/agentscope-ai/QwenPaw/issues/5345>

### 3. 大模型工作流里，稳定性比“能跑”更重要
- 来源：`#5342`
- 用户场景：LLM 调用失败、工具输出大、上下文持续堆积。
- 痛点：需要执行层兜底，而不能只依赖后置清理 hook。  
- 链接：<https://github.com/agentscope-ai/QwenPaw/issues/5342>

### 4. 用户对部署/执行环境的要求在提高
- 来源：`#5346`、`#5341`
- 关注点：容器中工具运行、文件访问范围限制。
- 反馈倾向：用户开始把项目用于更严肃的环境，因此希望默认更安全、更可控。  
- 链接：  
  - <https://github.com/agentscope-ai/QwenPaw/pull/5346>  
  - <https://github.com/agentscope-ai/QwenPaw/pull/5341>

---

## 8) 待处理积压
在当前 24 小时窗口内，**没有明显“长期未响应”的老问题样本**可直接确认；但从待处理队列看，仍有一些值得维护者优先跟进的积压项：

### 优先级较高的开放 Issue
- `#5344` 忙碌时消息静默丢弃  
  <https://github.com/agentscope-ai/QwenPaw/issues/5344>
- `#5345` 自定义 OpenAI-compatible provider 不支持 function calling  
  <https://github.com/agentscope-ai/QwenPaw/issues/5345>
- `#5342` 工具结果大小硬限制  
  <https://github.com/agentscope-ai/QwenPaw/issues/5342>

### 需要尽快 review 的开放 PR
- `#5349` ReMe4 内存迁移  
  <https://github.com/agentscope-ai/QwenPaw/pull/5349>
- `#5348` 冻结 env_context 日期  
  <https://github.com/agentscope-ai/QwenPaw/pull/5348>
- `#5347` 启动时清理无效 jobs.json  
  <https://github.com/agentscope-ai/QwenPaw/pull/5347>
- `#5346` Docker 中工具运行  
  <https://github.com/agentscope-ai/QwenPaw/pull/5346>
- `#5341` 文件工具限制在 workspace  
  <https://github.com/agentscope-ai/QwenPaw/pull/5341>

**提醒：**当前积压的特点不是“没人提”，而是“提得很集中、但都还在等待合并/确认”。如果 review 速度继续落后于提交速度，后续会形成明显的交付瓶颈。

---

如果你愿意，我可以继续把这份日报整理成 **适合微信群/飞书推送的短版**，或者输出成 **表格版/Markdown 仪表盘版**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下为 **ZeroClaw（2026-06-21）项目动态日报**。  
总体上看，过去 24 小时项目非常活跃：**18 个 Issue 更新、16 个 PR 更新，但没有任何合并/关闭和新版本发布**。这说明社区与维护者都在高强度推进，但当前产出主要停留在讨论、拆分、补丁排队与评审阶段，主干交付尚未明显兑现。热点集中在 **CI/安全、runtime 稳定性、渠道/网关行为、可观测性与配置体验**，属于典型的版本收口前高压期。整体健康度可评为：**需求密度高、方向清晰，但合并吞吐偏弱，存在 review/backlog 积压风险**。

---

## 1) 今日速览

- 过去 24 小时内，ZeroClaw 保持了很高的协作强度，**Issue 和 PR 都在持续涌入**，但**没有合并、没有关闭、也没有新版本**，说明当前更多是“推进中的建设期”，而非“交付落地期”。
- 今日最强信号来自 **CI/安全链路拆分**：从依赖审计、SLSA、SBOM，到 PR gate、定时安全扫描，几乎覆盖了发布前后的整条供应链。
- 另一条主线是 **runtime / tool / channel 稳定性修复**，大量问题集中在工具可见性、历史裁剪、网关重载、技能读取路径等细节。
- 从版本节奏看，项目正围绕 **v0.8.3** 进行分层收口，但由于没有任何合并，短期内更像是“问题堆栈扩张、待审队列增长”的状态。  
  - 相关跟踪：[#8070](https://github.com/zeroclaw-labs/zeroclaw/issues/8070) / [#8071](https://github.com/zeroclaw-labs/zeroclaw/issues/8071) / [#8072](https://github.com/zeroclaw-labs/zeroclaw/issues/8072) / [#8073](https://github.com/zeroclaw-labs/zeroclaw/issues/8073)

---

## 2) 项目进展

**今日没有已合并/关闭的重要 PR**，因此“代码层面”的净交付为 0。  
不过，当前排队中的 PR 已经明显勾勒出下一阶段的主干方向，值得关注：

- **依赖与包体收敛**：去掉 runtime 中无用的 `rumqttc` 依赖，降低包复杂度。  
  - PR: [#8077](https://github.com/zeroclaw-labs/zeroclaw/pull/8077)
- **网关配置删除一致性修复**：把 provider/channel alias 的删除改成级联语义，避免悬挂引用。  
  - PR: [#8074](https://github.com/zeroclaw-labs/zeroclaw/pull/8074)
- **Matrix 房间管理能力恢复**：补回房间创建与邀请支持，对渠道能力是实质性补强。  
  - PR: [#8068](https://github.com/zeroclaw-labs/zeroclaw/pull/8068)
- **可观测性增强**：给 agent-loop 日志加 category/verb 标签，提升检索与分析能力。  
  - PR: [#8067](https://github.com/zeroclaw-labs/zeroclaw/pull/8067)
- **LLM 请求载荷审计（默认关闭）**：补齐“问了什么”而不只是“答了什么”的审计链路。  
  - PR: [#8066](https://github.com/zeroclaw-labs/zeroclaw/pull/8066)
- **trace_id 贯通与成本记录**：打通调用链追踪，并记录单次成本。  
  - PR: [#8065](https://github.com/zeroclaw-labs/zeroclaw/pull/8065)
- **AuthProvider / Principal 基础骨架**：为后续认证方案落地铺底。  
  - PR: [#8063](https://github.com/zeroclaw-labs/zeroclaw/pull/8063)

**结论**：  
今天“功能面推进很多，交付面没有落地”。如果上述 PR 能在短期内集中合并，ZeroClaw 在 **渠道、观测、认证、配置、供应链安全** 五条线上会同步前进一大步；但若评审继续堆积，下一版发布时间可能被拉长。

---

## 3) 社区热点

按可见讨论热度（评论数）看，今天最热的是一组 **CI / 安全 / 发布链路拆分 Issue**，均有 **2 条评论**，且 👍 都为 0，说明当前更偏“技术对齐与方案拆分”，不是情绪化争议。

1. **Policy cleanup: deny.toml ignored-advisory tracking, multiple-versions, wildcard dependencies**  
   - Issue: [#8059](https://github.com/zeroclaw-labs/zeroclaw/issues/8059)  
   - 热点原因：这是依赖策略收紧，牵涉审计规则、忽略项治理、多个版本和 wildcard 依赖控制，属于安全底座问题。

2. **CI: release-only — cosign signing, SLSA provenance, SBOM publication**  
   - Issue: [#8058](https://github.com/zeroclaw-labs/zeroclaw/issues/8058)  
   - 热点原因：发布签名、供应链可信证明、SBOM 发布，都是“能否安全发版”的关键问题。

3. **CI: scheduled/manual security jobs — CodeQL, npm audit, cargo outdated, Trivy, SBOM**  
   - Issue: [#8057](https://github.com/zeroclaw-labs/zeroclaw/issues/8057)  
   - 热点原因：把重型安全检查从 PR 主链路中拆出去，体现出对性能、噪音和覆盖面的平衡诉求。

4. **CI: required PR gate — cargo audit, lockfile check, npm dependency review**  
   - Issue: [#8056](https://github.com/zeroclaw-labs/zeroclaw/issues/8056)  
   - 热点原因：PR 门禁要足够轻量但又能拦住高风险改动，这是维护者与贡献者共同关心的“合并体验”问题。

次一级讨论点（各 1 条评论）：
- **技能读取路径错误**：[#8047](https://github.com/zeroclaw-labs/zeroclaw/issues/8047)
- **Telegram webhook 入口**：[#8046](https://github.com/zeroclaw-labs/zeroclaw/issues/8046)
- **aardvark-sys 架构退役 RFC**：[#8043](https://github.com/zeroclaw-labs/zeroclaw/issues/8043)

**背后诉求**很清晰：  
社区正在把注意力从“单点功能”转向“平台化可维护性”，尤其是 **安全、发布可信度、渠道可靠性与操作体验**。

---

## 4) Bug 与稳定性

以下按严重程度从高到低排列，并标注是否已有对应 fix PR：

1. **高危安全：`/model --agent` 范围缺少按发送者授权**  
   - Issue: [#8044](https://github.com/zeroclaw-labs/zeroclaw/issues/8044)  
   - 风险：`--agent` 会影响所有使用该 agent 的用户，若无 sender 级授权，可能造成越权修改。  
   - 状态：**已接受，但未见明确 fix PR**

2. **高危行为不一致：系统提示中的 tool 可用性与实际 entry point 不一致**  
   - Issue: [#8054](https://github.com/zeroclaw-labs/zeroclaw/issues/8054)  
   - 风险：不同入口（channels、gateway、WebSocket、multimodal、`/think`）可能向模型展示错误工具状态，导致推理偏差。  
   - 状态：**有部分 fix PR**  
   - 相关 PR：[#8053](https://github.com/zeroclaw-labs/zeroclaw/pull/8053)（已修 direct runtime 路径，但 issue 指出其他入口仍存在同类问题）

3. **高危运行时故障：RPC reload 可能在旧监听器释放端口前重启网关**  
   - Issue: [#8069](https://github.com/zeroclaw-labs/zeroclaw/issues/8069)  
   - 风险：端口占用、重载失败、服务抖动。  
   - 状态：**未见 fix PR**

4. **高危工具故障：`ReadSkillTool` 查 `data_dir`，但技能实际在 agent workspace**  
   - Issue: [#8047](https://github.com/zeroclaw-labs/zeroclaw/issues/8047)  
   - 风险：compact skills 模式下工具不可用，影响 agent 执行。  
   - 状态：**未见 fix PR**

5. **中危上下文损坏：主动裁剪 turns 时丢失 tool result 内容**  
   - Issue: [#8049](https://github.com/zeroclaw-labs/zeroclaw/issues/8049)  
   - 风险：长会话中出现 context drift，工具结果被误删。  
   - 状态：**有 fix PR**  
   - 相关 PR：[#8050](https://github.com/zeroclaw-labs/zeroclaw/pull/8050)

6. **中危配置/历史裁剪：runtime history_pruning 配置被硬编码覆盖**  
   - 相关修复 PR：[#8048](https://github.com/zeroclaw-labs/zeroclaw/pull/8048)  
   - 风险：配置项失效，行为不可预期。

7. **中高危渠道稳定性：禁用 agent 后其绑定 channel 仍可能在线**  
   - 相关修复 PR：[#8051](https://github.com/zeroclaw-labs/zeroclaw/pull/8051)  
   - 风险：禁用配置未生效，导致用户仍可收到响应。

**整体判断**：  
今天的 Bug 主要不是“单点崩溃”，而是 **权限、入口一致性、状态同步、历史裁剪** 这几类“系统性稳定风险”。这类问题一旦进入多入口、多渠道、多 agent 场景，影响面会比普通功能 bug 更大。

---

## 5) 功能请求与路线图信号

今天出现的功能请求，已经很明显地指向下一版的路线图：

1. **Telegram webhook 模式**
   - Issue: [#8046](https://github.com/zeroclaw-labs/zeroclaw/issues/8046)
   - 价值：为 Telegram 提供非 long-polling 的入口方式，适合更标准的生产部署。
   - 路线图判断：**很可能进入下一版本候选**，因为它属于明确的渠道能力扩展。

2. **本地用户名/密码 AuthProvider**
   - Issue: [#8076](https://github.com/zeroclaw-labs/zeroclaw/issues/8076)
   - 对应基础 PR：[#8063](https://github.com/zeroclaw-labs/zeroclaw/pull/8063)
   - 价值：补齐无 IdP 场景下的浏览器登录体验。
   - 路线图判断：**非常像下一波认证体系演进的直接候选**。

3. **ZeroCode 结构化 JSON 字段编辑体验**
   - PR: [#8064](https://github.com/zeroclaw-labs/zeroclaw/pull/8064)
   - 价值：提升配置编辑可用性，减少 raw text 编辑痛点。
   - 路线图判断：**大概率会随 v0.8.3 落地**，因为它是已接受/进行中的 UX 修复。

4. **v0.8.3 跟踪器已成组出现**
   - [#8070](https://github.com/zeroclaw-labs/zeroclaw/issues/8070)（gateway / web / onboarding）
   - [#8071](https://github.com/zeroclaw-labs/zeroclaw/issues/8071)（runtime / agent / tools）
   - [#8072](https://github.com/zeroclaw-labs/zeroclaw/issues/8072)（channels / providers / config）
   - [#8073](https://github.com/zeroclaw-labs/zeroclaw/issues/8073)（observability / CI / docs / dependencies）
   - 价值：说明维护者已经把下一版拆成了可评审的子域。
   - 路线图判断：**这些 tracker 下的 PR 是下一版本最可能优先纳入的内容池**。

5. **架构收敛**
   - RFC: [#8043](https://github.com/zeroclaw-labs/zeroclaw/issues/8043)
   - 价值：退役重复/独立的 crate，向 `zeroclaw-hardware` 聚合。
   - 路线图判断：更偏中期架构治理，但对长期维护成本很关键。

---

## 6) 用户反馈摘要

从 Issue 评论和提案内容看，用户真实痛点主要集中在以下几类：

- **“系统能不能稳一点”**  
  用户在意的不是单个功能，而是整个链路是否一致、可预测。  
  典型场景：  
  - `/model --agent` 是否会越权影响其他人：[#8044](https://github.com/zeroclaw-labs/zeroclaw/issues/8044)  
  - reload 时是否会端口冲突：[#8069](https://github.com/zeroclaw-labs/zeroclaw/issues/8069)

- **“工具在不同入口要表现一致”**  
  用户不希望系统提示说“有工具”，实际调用却不可见。  
  场景：多入口推理（channels / gateway / `/think`）对工具暴露不一致：[#8054](https://github.com/zeroclaw-labs/zeroclaw/issues/8054)

- **“长会话别把关键结果裁掉”**  
  这是典型的 agent/会话稳定性痛点。  
  场景：长聊天、长任务、工具结果被裁剪后，上下文漂移：[#8049](https://github.com/zeroclaw-labs/zeroclaw/issues/8049) / [#8050](https://github.com/zeroclaw-labs/zeroclaw/pull/8050)

- **“技能/工具要能找到、能执行”**  
  用户对路径、工作区、资源定位非常敏感。  
  场景：compact skills 模式下 `read_skill` 找不到真正的技能位置：[#8047](https://github.com/zeroclaw-labs/zeroclaw/issues/8047)

- **“配置编辑不要太原始”**  
  ZeroCode 用户希望结构化配置能用更友好的编辑方式，而不是纯文本硬改。  
  场景：JSON/object/object_array 字段编辑体验：[#8062](https://github.com/zeroclaw-labs/zeroclaw/issues/8062) / [#8064](https://github.com/zeroclaw-labs/zeroclaw/pull/8064)

- **“部署和发布要更像生产系统”**  
  安全扫描、签名、SBOM、release gate 这些诉求非常明显，说明用户和维护者都在向更成熟的发布模型靠拢。  
  相关：[#8056](https://github.com/zeroclaw-labs/zeroclaw/issues/8056)、[#8057](https://github.com/zeroclaw-labs/zeroclaw/issues/8057)、[#8058](https://github.com/zeroclaw-labs/zeroclaw/issues/8058)、[#8059](https://github.com/zeroclaw-labs/zeroclaw/issues/8059)

---

## 7) 待处理积压

严格来说，今天没有“长期未响应”的老化项：**所有给定条目都集中在 2026-06-20 到 2026-06-21**。  
但从项目治理角度，以下高优先级条目已经足够关键，建议维护者尽快分配 reviewer：

- **安全优先级最高**：  
  - [#8044](https://github.com/zeroclaw-labs/zeroclaw/issues/8044) `/model --agent` 授权缺口（p1）
  - [#8054](https://github.com/zeroclaw-labs/zeroclaw/issues/8054) 工具可见性不一致（blocked）
- **运行时稳定性**：  
  - [#8069](https://github.com/zeroclaw-labs/zeroclaw/issues/8069) 网关重载端口竞态
  - [#8047](https://github.com/zeroclaw-labs/zeroclaw/issues/8047) 技能读取路径错误
- **需要较深评审的重型 PR**：  
  - [#8068](https://github.com/zeroclaw-labs/zeroclaw/pull/8068) Matrix room 管理恢复
  - [#8066](https://github.com/zeroclaw-labs/zeroclaw/pull/8066) LLM 请求载荷审计
  - [#8065](https://github.com/zeroclaw-labs/zeroclaw/pull/8065) trace_id + cost 追踪
  - [#8063](https://github.com/zeroclaw-labs/zeroclaw/pull/8063) AuthProvider 基础骨架

**积压判断**：  
目前不是“历史包袱”型积压，而是**短时间内高密度堆积**。如果接下来仍维持“新增快、合并慢”的状态，v0.8.3 的关键路径会越来越依赖 reviewer 吞吐，而不是开发产出。

---

如果你希望，我还可以把这份日报进一步整理成：
1. **面向管理层的一页摘要版**，或  
2. **面向维护者的行动清单版（按优先级排序）**】【。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*