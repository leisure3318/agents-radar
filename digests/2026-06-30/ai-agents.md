# OpenClaw 生态日报 2026-06-30

> Issues: 16 | PRs: 12 | 覆盖项目: 13 个 | 生成时间: 2026-06-30 03:52 UTC

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

以下为 **OpenClaw 2026-06-30 项目动态日报**（基于你提供的 GitHub 数据整理）。

---

## 1) 今日速览

过去 24 小时，OpenClaw 维持了 **高活跃度**：Issues 更新 16 条、PR 更新 12 条，但 **没有新版本发布**。从内容看，社区关注点高度集中在 **会话状态、消息交付、鉴权稳定性、跨渠道一致性** 这四类问题上，说明项目仍处于快速迭代但需要持续修复“核心体验边界”的阶段。  
今日新增/活跃问题以 **P1/P2 级别缺陷** 为主，且不少问题已出现对应修复 PR，说明维护者响应链路是通的；但整体来看，**已合并的实质性改进很少，代码推进主要停留在待审/待合并**。  
综合判断：**项目热度高、需求密集、风险也偏高**，当前更像是“问题发现和补丁排队”的一天，而不是“版本落地”的一天。

---

## 2) 版本发布

今日 **无新版本发布**，因此本节省略。

---

## 3) 项目进展

今日最重要的“关闭”事件并不是功能交付，而是 **1 个 PR 被撤回**：

- **#97997** [withdrawn]（误投到错误仓库）  
  https://github.com/openclaw/openclaw/pull/97997  
  这条 PR 没有带来实际功能推进，但说明提交流里存在跨仓库/跨目标误投的情况，属于流程层面的轻微噪音。

从“真正推进了什么”来看，今天的进展主要体现在 **多个高价值修复/增强已经进入 PR 阶段**，但尚未合并：

- **#98007** 修复 `openclaw update` 对 bundle 插件的误判  
  https://github.com/openclaw/openclaw/pull/98007  
- **#97990** 同类修复（fixes #97985），也是 bundle 插件更新兼容问题  
  https://github.com/openclaw/openclaw/pull/97990  
- **#98003** Anthropic Cloudflare 分支补齐 guarded fetch  
  https://github.com/openclaw/openclaw/pull/98003  
- **#98005** JSON-RPC 插件绑定  
  https://github.com/openclaw/openclaw/pull/98005  
- **#98006** Telegram `/login` Codex pairing flow  
  https://github.com/openclaw/openclaw/pull/98006  
- **#97989** SMS 回复中屏蔽内部 tool-trace 横幅  
  https://github.com/openclaw/openclaw/pull/97989  
- **#97991** Feishu 工具调用绑定账号修复  
  https://github.com/openclaw/openclaw/pull/97991  
- **#97995** memory-wiki 去除代码块/行内代码干扰  
  https://github.com/openclaw/openclaw/pull/97995  
- **#97999** SMS Twilio JSON 解析防护  
  https://github.com/openclaw/openclaw/pull/97999  

**结论：** 今天项目“向前迈进”的主要方式是把多个高频痛点推进到 PR 审核层，但 **实际 shipped 的净增量接近 0**。若这些 PR 后续通过，下一轮版本会在 **更新流程、跨渠道输出清洁度、鉴权/安全边界、插件生态** 上明显增强。

---

## 4) 社区热点

今天讨论最活跃的问题，几乎都围绕“用户能不能稳定地得到正确输出”展开：

1. **#97980** 频道内部元数据被渲染到用户聊天框（3 条评论）  
   https://github.com/openclaw/openclaw/issues/97980  
   诉求很直接：**内部上下文不应泄露到终端用户可见消息**，否则会破坏对话体验，也会暴露实现细节。

2. **#97688** Discord 语音 turn 无状态，每轮都开新 session（2 条评论）  
   https://github.com/openclaw/openclaw/issues/97688  
   用户希望语音模式像真正的连续代理，而不是“每说一句就失忆一次”。这是 **会话记忆** 的核心痛点。

3. **#97983** iOS/WebChat 消息能进 transcript，但不触发 assistant 回复（2 条评论）  
   https://github.com/openclaw/openclaw/issues/97983  
   典型的 **消息存在但不处理** 问题，说明用户最在意的是“送达后能否可靠触发代理动作”。

4. **#97985** `openclaw update` 在 bundle 插件上误判 `package.json missing`（2 条评论）  
   https://github.com/openclaw/openclaw/issues/97985  
   反映出用户对 **插件格式兼容性** 很敏感，尤其是 Claude/Codex/Cursor 这类 bundle 结构。

5. **#97994** OpenAI-compatible streaming tool calls 在缺少 `finish_reason` 时被丢弃（2 个 👍）  
   https://github.com/openclaw/openclaw/issues/97994  
   反应不一定多，但点赞说明问题抓得准：**工具调用不能因为流结束语义不完整就丢失**。

**背后诉求总结：**  
社区今天最关心的不是“加新花活”，而是 **输出不要脏、消息不要丢、session 不要断、跨渠道不要乱**。这说明 OpenClaw 的核心用户已经进入“规模化使用”阶段，对稳定性要求明显高于早期试用阶段。

---

## 5) Bug 与稳定性

按影响严重度排序，今日报告的稳定性问题如下：

### P1 / 高严重度

1. **#97985** `openclaw update` 更新后插件同步对 bundle 格式误判，导致退出并卸载 gateway  
   https://github.com/openclaw/openclaw/issues/97985  
   - 影响：更新流程可能中断，属于 **更新链路故障/可用性风险**  
   - 状态：**已有修复 PR**  
     - https://github.com/openclaw/openclaw/pull/98007  
     - https://github.com/openclaw/openclaw/pull/97990  
   - 备注：这是今天最明确的“已进入修复通道”的高优先级问题。

2. **#97983** iOS/WebChat 消息进入 transcript 但不触发 assistant 回复  
   https://github.com/openclaw/openclaw/issues/97983  
   - 影响：**消息丢处理/用户感知为“机器人没反应”**  
   - 状态：当前未见对应 fix PR  
   - 风险：对移动端和 WebChat 用户体验打击很大。

3. **#97688** Discord 语音 turn 无跨轮记忆，每轮都重新开 session  
   https://github.com/openclaw/openclaw/issues/97688  
   - 影响：**会话状态丢失**，代理不具备连续对话能力  
   - 状态：当前未见对应 fix PR  
   - 备注：这是昨天遗留到今天的高优先级稳定性问题。

### P2 / 中严重度

4. **#97994** OpenAI-compatible streaming tool calls 在缺少 `finish_reason` 时被丢弃  
   https://github.com/openclaw/openclaw/issues/97994  
   - 影响：**工具调用丢失**，会导致 agent 不执行原本应触发的工具  
   - 状态：未见 fix PR  
   - 风险：兼容性较强的上游 provider 更容易触发。

5. **#97996** Claude-cli provider 的 token-type profile 不被视为有效，TUI 卡在 “auth expired”  
   https://github.com/openclaw/openclaw/issues/97996  
   - 影响：**鉴权状态识别错误**  
   - 状态：未见 fix PR  
   - 备注：对长期登录/令牌型账户的支持不稳。

6. **#97984** 通道来源 run 遇到模型鉴权失败时，重认证文案不够 channel-friendly  
   https://github.com/openclaw/openclaw/issues/97984  
   - 影响：**错误恢复路径对渠道用户不友好**  
   - 状态：未见 fix PR  
   - 备注：更偏产品/交互问题，但会影响实际恢复成功率。

7. **#97992** macOS Gateway daemon PATH 不包含用户 bin 目录  
   https://github.com/openclaw/openclaw/issues/97992  
   - 影响：`nix/bun/.local/bin` 等用户工具不可用，属于 **环境可用性问题**  
   - 状态：未见 fix PR  
   - 风险：Mac 用户的外部工具执行会受影响。

8. **#98001** WebChat UI 会话合并后消息顺序错乱  
   https://github.com/openclaw/openclaw/issues/98001  
   - 影响：**消息顺序错误**，会导致用户误判对话上下文  
   - 状态：未见 fix PR  
   - 备注：这是跨渠道合并后的典型一致性问题。

### 低到中等严重度 / 体验缺陷

9. **#97980** QQ Bot 频道内部元数据被渲染到用户聊天框  
   https://github.com/openclaw/openclaw/issues/97980  
   - 影响：**输出污染、信息泄露式体验问题**  
   - 状态：未见 fix PR  
   - 备注：虽然不一定崩溃，但对产品观感伤害很大。

10. **#97988** Windows `gateway install --force` 不生成 gateway.vbs，导致重装后行为异常（已关闭）  
    https://github.com/openclaw/openclaw/issues/97988  
    - 状态：**已关闭**  
    - 备注：属于已结束的问题，但值得留档说明其已被处理。

---

## 6) 功能请求与路线图信号

今天的新功能请求释放出几个很清晰的路线图信号：

1. **#98005 / #98004** JSON-RPC 插件绑定，支持语言无关插件实现  
   - Issue: https://github.com/openclaw/openclaw/issues/98004  
   - PR: https://github.com/openclaw/openclaw/pull/98005  
   - 信号：这是 **最像“下一版本候选功能”** 的项目之一，因为已经有对应 PR，且需求明确、架构价值高。

2. **#98006** Telegram `/login` Codex pairing flow  
   https://github.com/openclaw/openclaw/pull/98006  
   - 信号：渠道侧认证体验在继续做“原生化”，说明 OpenClaw 正在把登录/配对从 TTY 迁移到多渠道一致流程中。  
   - 可能性：若审核顺利，较可能进入下一版本。

3. **#98002** Skill Workshop 的标准 AISP proposal contract  
   https://github.com/openclaw/openclaw/issues/98002  
   - 信号：偏 **规范化/治理层** 的需求，短期可能不是首发功能，但它在为生态扩展建立机器可验证边界。

4. **#97998** 通过 trusted tool policy hooks 支持外部工具授权提供方  
   https://github.com/openclaw/openclaw/issues/97998  
   - 信号：这是 **安全/策略层的架构扩展**，优先级可能高，但通常需要更严格的设计评审。

5. **#97993** 官方 iOS App 增加 CarPlay 支持  
   https://github.com/openclaw/openclaw/issues/97993  
   - 信号：用户场景真实，但更偏长线体验优化，短期进入主线版本的概率相对低。

6. **#97981** 增加 X MCP 插件（已关闭）  
   https://github.com/openclaw/openclaw/issues/97981  
   - 信号：MCP 插件生态需求存在，但该条已关闭，可能意味着暂时不推进或优先级较低。

**路线图判断：**  
如果按“近期最可能落地”排序，**JSON-RPC 插件绑定（#98005）** 与 **Telegram 登录流（#98006）** 最像下一批可合入功能；而 **AISP contract / 外部授权提供方** 更像中长期架构议题。

---

## 7) 用户反馈摘要

从 Issues 的表述可以提炼出几类非常真实的用户痛点：

- **“不要把内部信息直接给用户看”**  
  例如 **#97980** 和 **#97989**：用户明确不希望看到 JSON 元数据、tool-trace 横幅等内部调试内容。  
  https://github.com/openclaw/openclaw/issues/97980  
  https://github.com/openclaw/openclaw/pull/97989  

- **“代理要记得住上下文”**  
  例如 **#97688**：语音 turn 每次都重开 session，会让用户感觉代理“失忆”。  
  https://github.com/openclaw/openclaw/issues/97688  

- **“消息到了就要能回复、顺序也要对”**  
  例如 **#97983** 和 **#98001**：用户关心的不只是送达，而是 **回复是否触发、时间线是否一致**。  
  https://github.com/openclaw/openclaw/issues/97983  
  https://github.com/openclaw/openclaw/issues/98001  

- **“更新和插件兼容别出幺蛾子”**  
  例如 **#97985**：bundle 插件被错误当成 npm 包处理，会直接破坏更新可信度。  
  https://github.com/openclaw/openclaw/issues/97985  

- **“鉴权失败时给出适合当前渠道的恢复方式”**  
  例如 **#97984**、**#97996**：用户不只是想知道“过期了”，更想知道“怎么在当前场景里顺利续上”。  
  https://github.com/openclaw/openclaw/issues/97984  
  https://github.com/openclaw/openclaw/issues/97996  

总体看，用户对 OpenClaw 的期待已经从“能用”转向“**在多渠道、多模型、多 auth 形态下依然可靠**”。

---

## 8) 待处理积压

今天没有形成特别长的历史积压，但有几条 **高优先级且仍未解决** 的问题值得维护者重点盯住：

1. **#97688** Discord 语音跨轮记忆丢失  
   https://github.com/openclaw/openclaw/issues/97688  
   - 这是目前最早的高优先级未解决问题之一，且属于核心体验。

2. **#97985** bundle 插件更新失败  
   https://github.com/openclaw/openclaw/issues/97985  
   - 虽然已有两个修复 PR，但仍需尽快统一方案，避免重复推进。  
   - PR: https://github.com/openclaw/openclaw/pull/98007  
   - PR: https://github.com/openclaw/openclaw/pull/97990  

3. **#97983** iOS/WebChat 不触发回复  
   https://github.com/openclaw/openclaw/issues/97983  
   - 属于直接影响用户“是否可用”的问题，优先级应靠前。

4. **#97994** streaming tool calls 丢失  
   https://github.com/openclaw/openclaw/issues/97994  
   - 对 OpenAI-compatible provider 的兼容性影响很实际，建议尽快排查。

5. **#97711** MSTeams JSON 响应 OOM 防护 PR（需要 proof）  
   https://github.com/openclaw/openclaw/pull/97711  
   - 仍处于 “needs proof” 状态，说明证明链路或验证材料还不够完整。

6. **#98003 / #97991 / #97995 / #97999** 等待 maintainer review 的 PR  
   - https://github.com/openclaw/openclaw/pull/98003  
   - https://github.com/openclaw/openclaw/pull/97991  
   - https://github.com/openclaw/openclaw/pull/97995  
   - https://github.com/openclaw/openclaw/pull/97999  
   这些都属于“已经接近可合入，但还卡在评审”的状态，是近期最值得压缩的队列。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发给团队的 Slack/飞书简报版**，或  
2. **适合内部周报的表格版（含优先级、风险、是否有 PR、建议动作）**。

---

## 横向生态对比

以下为基于 2026-06-30 各项目日报整理的**横向对比分析报告**。

---

# 个人 AI 助手 / 自主智能体开源生态横向对比分析（2026-06-30）

## 1) 生态全景

过去 24 小时，这一生态整体呈现出一个非常明确的阶段特征：**从“能跑”转向“能稳定地在多渠道、多模型、多权限边界下跑”**。  
大多数项目的讨论重点不再是基础功能炫技，而是会话连续性、消息送达、鉴权恢复、协议兼容、输出清洁度与安全边界。  
这说明个人 AI 助手/自主智能体已经进入更接近生产环境的使用阶段，用户开始用“可靠性”和“可运维性”来定义价值。  
同时，不同项目的成熟路径开始分化：有的在高频修 bug，有的在补齐协议与平台兼容，有的在做安全与自动化治理。  
整体看，这是一个**高度工程化、快速分层、以稳定性驱动演进**的开源生态。

---

## 2) 各项目活跃度对比

> 说明：这里的 Issues/PR 数为日报中披露的 **24h 活跃量**；无活动项目按 0 计。  
> `Release` 指当天是否有新版本发布。

| 项目 | Issues 数 | PR 数 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 16 | 12 | 无新版本 | **高活跃，高风险，高需求密度**；问题多但修复链路通畅 |
| NanoBot | 3 | 3 | 无新版本 | **中高活跃，健康度良好**；偏集成与自动化推进 |
| Hermes Agent | 23 | 42 | 无新版本 | **极高活跃，迭代快但维护压力大**；稳定性修复密集 |
| PicoClaw | 0 | 0 | 无活动/无发布 | **低活跃，观察期** |
| NanoClaw | 0 | 0 | 无活动/无发布 | **低活跃，观察期** |
| NullClaw | 0 | 0 | 无活动/无发布 | **低活跃，观察期** |
| IronClaw | 1 | 0 | 无新版本 | **低活跃，维护导向**；测试基础设施修补为主 |
| LobsterAI | 0 | 1 | 无新版本 | **低噪音，维护型健康**；偏可观测性优化 |
| TinyClaw | 0 | 0 | 无活动/无发布 | **低活跃，观察期** |
| Moltis | 0 | 0 | 无活动/无发布 | **低活跃，观察期** |
| CoPaw | 1 | 13 | 无新版本 | **高开发活跃，功能推进积极**；以合入和打磨为主 |
| ZeptoClaw | 0 | 0 | 无活动/无发布 | **低活跃，观察期** |
| ZeroClaw | 0 | 7 | 无新版本 | **中高活跃，工程治理导向**；协议与 CI 修复明显 |

### 活跃度分层
- **第一梯队：Hermes Agent、OpenClaw**
  - 高 Issues + 高 PR，说明社区反馈与修复密度都高。
- **第二梯队：CoPaw、ZeroClaw、NanoBot**
  - PR 推进明显，问题相对少，偏“开发驱动型”。
- **第三梯队：LobsterAI、IronClaw**
  - 以维护、诊断、测试基础设施为主。
- **低活跃梯队：PicoClaw、NanoClaw、NullClaw、TinyClaw、Moltis、ZeptoClaw**
  - 当日无明显动态。

---

## 3) OpenClaw 在生态中的定位

### 优势
OpenClaw 的优势不是单点功能，而是**生态覆盖面和问题响应深度**：
- 覆盖渠道广：Discord、iOS/WebChat、Telegram、Feishu、QQ Bot、SMS、macOS Gateway 等；
- 对插件、bundle、JSON-RPC、tool calls 等生态能力投入较深；
- Issues 与 PR 并行密集，说明“发现问题—进入修复通道”的链路较成熟；
- 社区关注点非常接近真实生产：消息顺序、session 连续性、鉴权恢复、输出清洁度、更新兼容性。

### 技术路线差异
相较于其他项目，OpenClaw 更像一个**多渠道 AI 助手/网关型中枢**：
- 重点在 **消息承接、渠道一致性、插件生态、更新流程**；
- 不是单纯做聊天 UI，也不是单纯做底层 agent runtime；
- 其技术路线更偏向“**跨渠道编排 + 可插拔扩展 + 生产稳定性**”。

### 社区规模对比
从 24h 活跃数据看：
- **Hermes Agent** 的原始活跃量最高（23 Issues / 42 PR），但其中很多是高频修复与平台兼容问题；
- **OpenClaw** 的活跃度略低于 Hermes，但问题类型更集中在核心体验边界，且修复链条更像“产品级收敛”；
- 相比 **NanoBot / ZeroClaw / CoPaw**，OpenClaw 的社区讨论更广、痛点更密集、场景更复杂。

**结论：**  
OpenClaw 在生态中属于**“高复杂度、多渠道核心枢纽型项目”**，社区规模与议题广度均处于第一梯队，但也因此承担更高的稳定性压力。

---

## 4) 共同关注的技术方向

下面是多个项目共同涌现出的技术方向：

### 1. 会话连续性与状态保持
- **涉及项目**：OpenClaw、Hermes Agent、CoPaw
- **具体诉求**：
  - OpenClaw：Discord 语音 turn 无状态、iOS/WebChat 消息进入 transcript 但不触发回复、WebChat 合并后消息顺序错乱
  - Hermes：WebUI/API session continuity failure、orchestrator profile 连续性问题
  - CoPaw：subagent 后台生命周期、parent wakeup、cron 执行语义一致性
- **趋势含义**：智能体正在从“单轮问答”走向“持续工作流执行体”。

### 2. 鉴权恢复与安全边界
- **涉及项目**：OpenClaw、Hermes Agent、NanoBot、ZeroClaw
- **具体诉求**：
  - OpenClaw：channel-friendly reauth、token profile 识别、trusted tool policy hooks
  - Hermes：expired credentials 的 channel-safe reauth、ACP 自动审批的安全边界
  - NanoBot：Anthropic OAuth
  - ZeroClaw：MCP TLS certificate verification 策略
- **趋势含义**：认证不再只是“能登录”，而是要适配渠道、策略和企业环境。

### 3. 协议兼容与输出正确性
- **涉及项目**：OpenClaw、Hermes Agent、ZeroClaw、CoPaw
- **具体诉求**：
  - OpenClaw：OpenAI-compatible streaming tool calls 丢失、bundle 插件误判、JSON-RPC 插件绑定
  - Hermes：RFC 2047 header 容错、union 类型参数保真、邮件正文解析健壮性
  - ZeroClaw：OpenAI-compatible 请求格式严格化
  - CoPaw：Windows path/file://、toolCards stringify、coding_mode / project_dir 语义收紧
- **趋势含义**：兼容性问题正在成为 agent 生态的“硬门槛”。

### 4. 多渠道消息稳定性与一致性
- **涉及项目**：OpenClaw、Hermes Agent、ZeroClaw
- **具体诉求**：
  - OpenClaw：SMS JSON 解析防护、内部元数据不泄露、消息顺序正确
  - Hermes：Email / SMS / Slack / WhatsApp / Teams / Google Chat 等多通道输入容错
  - ZeroClaw：OpenAI-compatible provider 的协议一致性
- **趋势含义**：多渠道场景下，“送达”不再够，必须“正确送达、正确触发、正确展示”。

### 5. 可观测性与可维护性
- **涉及项目**：LobsterAI、Hermes Agent、ZeroClaw
- **具体诉求**：
  - LobsterAI：为 Cowork / OpenClaw / renderer 增加诊断日志
  - Hermes：保留 inner error、修复 stale file handler
  - ZeroClaw：错误链保真、CI gate
- **趋势含义**：项目已经进入“排障成本决定体验成本”的阶段。

### 6. 自动化与可编排
- **涉及项目**：NanoBot、CoPaw、OpenClaw
- **具体诉求**：
  - NanoBot：外部脚本触发 agent action
  - CoPaw：cron job 级别模型覆盖、技能自动同步、后台子代理生命周期
  - OpenClaw：JSON-RPC 插件绑定、trusted tool policy hooks
- **趋势含义**：agent 正从“聊天机器人”变成“可编排的自动化执行层”。

---

## 5) 差异化定位分析

### OpenClaw
- **功能侧重**：多渠道消息、插件生态、会话一致性、更新流程
- **目标用户**：重度个人用户、跨渠道工作流用户、早期生产团队
- **架构特征**：中枢式、插件化、渠道抽象层复杂
- **关键词**：跨渠道、稳定性、输出清洁、生态扩展

### Hermes Agent
- **功能侧重**：多平台接入、消息平台稳定性、安全默认值、桌面兼容
- **目标用户**：企业/工作流集成用户、消息系统重度用户
- **架构特征**：平台覆盖广，维护面大，兼容性修复密集
- **关键词**：消息集成、容错、安全、桌面/网关协同

### NanoBot
- **功能侧重**：轻量自动化、外部脚本接入、OAuth/授权增强
- **目标用户**：开发者、自动化爱好者、工作流集成人群
- **架构特征**：偏“易读、可嵌入、可调用”
- **关键词**：轻量、编排、脚本触发、OAuth

### CoPaw
- **功能侧重**：子代理、cron 调度、性能优化、编码模式
- **目标用户**：偏工程化的 agent 编排用户
- **架构特征**：任务编排和后台执行能力更强
- **关键词**：调度、子代理、性能、安全约束

### ZeroClaw
- **功能侧重**：MCP、OpenAI 兼容、国际化、CI/仓库治理
- **目标用户**：偏模型接入与协议适配的开发者
- **架构特征**：协议正确性和工程门禁优先
- **关键词**：兼容性、CI、i18n、MCP

### LobsterAI
- **功能侧重**：诊断日志、链路可观测性
- **目标用户**：需要排障与运维可视化的使用方
- **架构特征**：偏支撑层
- **关键词**：observability、diagnostics

### IronClaw
- **功能侧重**：测试 scaffolding、行为保持证明
- **目标用户**：维护者、核心开发者
- **架构特征**：测试优先、重构谨慎
- **关键词**：test-only、proof、harness

### 低活跃项目群（PicoClaw / NanoClaw / NullClaw / TinyClaw / Moltis / ZeptoClaw）
- **现状**：当日无可见活动
- **判断**：要么处于休眠，要么仍在非常早期阶段，暂难形成明确技术路线判断

---

## 6) 社区热度与成熟度

可以把这些项目粗分为四类：

### A. 快速迭代、问题密集型
- **OpenClaw**
- **Hermes Agent**

特征：
- Issues 与 PR 都很多
- 社区讨论集中在核心体验边界
- 说明用户已经在真实场景中使用，稳定性压力高

### B. 开发推进明显、逐步成熟型
- **CoPaw**
- **ZeroClaw**
- **NanoBot**

特征：
- PR 明显多于 Issues 或两者都不高
- 以功能落地、协议修复、工程治理为主
- 更像是在为下一阶段扩展做铺垫

### C. 质量巩固/支撑增强型
- **LobsterAI**
- **IronClaw**

特征：
- 更关注日志、测试、错误链、行为一致性
- 不追求短期功能爆发，而是强化可维护性

### D. 低活跃/观察型
- **PicoClaw、NanoClaw、NullClaw、TinyClaw、Moltis、ZeptoClaw**

特征：
- 24h 无活动
- 当前难以从社区信号判断其阶段和方向

---

## 7) 值得关注的趋势信号

### 1. “可靠性”已经取代“功能新颖性”，成为核心竞争力
对智能体项目来说，用户最在意的不再是是否会做事，而是：
- 会不会断会话
- 会不会漏消息
- 会不会泄露内部信息
- 会不会在更新/兼容时崩掉

这对开发者的启示是：**先做稳，再做强**。

### 2. 多渠道智能体正在向“生产系统”演化
OpenClaw、Hermes 这类项目的痛点都很接近真实生产：
- 通道一致性
- 认证恢复
- 异常输入容错
- 顺序与状态保持

说明 agent 已经从 demo 走向业务流中枢。

### 3. 协议正确性比“支持很多后端”更重要
ZeroClaw、OpenClaw、Hermes 的问题都证明：
- OpenAI-compatible
- MCP
- JSON-RPC
- bundle 插件
- RFC/编码格式

这些不是边角料，而是生态能否互操作的基础。

### 4. 安全边界正在成为自动化系统的默认设计点
Hermes 的 symlink 绕过、OpenClaw 的 trusted tool policy、NanoBot 的 OAuth、ZeroClaw 的 TLS 策略，都说明一个趋势：  
**越自动化，越要收紧默认权限**。

### 5. 可观测性将成为 Agent 产品化的分水岭
LobsterAI 的诊断增强、Hermes 的错误链保真、ZeroClaw 的 CI 与 error chain 修复，都指向同一件事：  
**没有可观测性，就没有可运维性；没有可运维性，就很难进入生产。**

### 6. “可编排”是下一阶段高价值能力
NanoBot 的外部脚本触发、CoPaw 的 cron/job 模型覆盖、OpenClaw 的 JSON-RPC / policy hooks，说明用户希望 agent 成为：
- 可调用的
- 可组合的
- 可纳入现有自动化系统的

这比单纯聊天更接近真实需求。

---

## 简短结论

- **OpenClaw**：生态核心型项目，问题最密集、场景最复杂、社区关注度高。  
- **Hermes Agent**：活跃度最高，进入高压稳定化阶段。  
- **CoPaw / ZeroClaw / NanoBot**：开发推进积极，属于功能与工程并进的成长型项目。  
- **LobsterAI / IronClaw**：偏质量巩固与支撑层建设。  
- **其余项目**：目前处于低活跃观察期。

如果你愿意，我还可以把这份横向分析进一步整理成：
1. **适合汇报给管理层的 1 页摘要版**，或  
2. **适合技术团队讨论的对比表格增强版**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-06-30）

## 1. 今日速览
- 过去 24 小时内，NanoBot 保持**中高活跃度**：新增/活跃 Issues 3 条、PR 3 条，其中 1 条 PR 已关闭、2 条仍待处理，说明需求输入和代码迭代都在同步推进。
- 今日讨论重心偏向两类：**外部集成/授权能力**（Anthropic OAuth、外部脚本触发 agent）与**可用性/稳定性优化**（WebUI 重构、安装器非交互场景修复、WhatsApp 通知链路增强）。
- 当前**无新版本发布**，项目更像处于连续迭代而非打包发布阶段；整体健康度良好，且用户诉求较明确。
- 需要关注的风险点是 WebUI/file-edit 相关的协议一致性问题：若处理不当，可能影响 provider 协议与前端进度关联逻辑。  
  相关链接：[#4603](https://github.com/HKUDS/nanobot/issues/4603)

## 2. 版本发布
- 今日**无新 Releases**，版本页暂无更新。  
  Releases 页面：<https://github.com/HKUDS/nanobot/releases>

## 3. 项目进展
- 已关闭的重要 PR：  
  - [#4600 feat(webui): refine prompt rail minimap](https://github.com/HKUDS/nanobot/pull/4600)  
    该改动聚焦 WebUI 的 prompt rail / minimap 视觉与交互优化，提升长对话历史的可浏览性与定位效率。  
- 正在推进的 PR：  
  - [#4601 feat(whatsapp): send read receipts (blue double-check) for incoming messages](https://github.com/HKUDS/nanobot/pull/4601)  
    为 WhatsApp 入站消息补充“已读回执”，增强消息交互闭环。  
  - [#4602 fix(install): skip wizard without an interactive terminal](https://github.com/HKUDS/nanobot/pull/4602)  
    改善非交互终端/管道安装场景，降低安装失败概率。  
- 综合来看，今天项目推进体现为：**1 个前端体验改动已收口，2 个功能/修复方向继续向前**。这对项目健康度是正向信号。  
  相关链接：[#4600](https://github.com/HKUDS/nanobot/pull/4600)、[#4601](https://github.com/HKUDS/nanobot/pull/4601)、[#4602](https://github.com/HKUDS/nanobot/pull/4602)

## 4. 社区热点
- 最活跃讨论：  
  - [#4604 [feature request] Anthropic OAuth](https://github.com/HKUDS/nanobot/issues/4604)  
    本日评论数最多（2 条）。核心诉求是**接入 Anthropic 的 OAuth 流程**，反映出用户希望更顺畅地使用第三方模型/账户授权能力。  
- 另一个明显的使用场景诉求：  
  - [#4605 One thing I’d love to have: a way to trigger an agent action from an external script](https://github.com/HKUDS/nanobot/issues/4605)  
    虽然当前评论数为 0，但内容很具体，体现用户希望把 NanoBot 当作**自动化工作流的一环**，通过外部脚本直接触发 agent 动作。  
- 今日所有条目的 👍 都为 0，说明当前热点更多来自**评论内容的深度**，而不是点赞扩散。  
  相关链接：[#4604](https://github.com/HKUDS/nanobot/issues/4604)、[#4605](https://github.com/HKUDS/nanobot/issues/4605)

## 5. Bug 与稳定性
- 高优先级：  
  - [#4603 [webui, refactor] Refactor: stop mutating tool_call.id for WebUI file-edit progress correlation](https://github.com/HKUDS/nanobot/issues/4603)  
    该问题涉及 `tool_call.id` 被用于 WebUI 进度关联时的“临时改写”，但这同时触碰 provider 协议字段，存在**协议一致性/可维护性风险**。建议优先评估是否会引入兼容性回归。  
    当前**未看到对应 fix PR**。  
- 中优先级：  
  - [#4602 fix(install): skip wizard without an interactive terminal](https://github.com/HKUDS/nanobot/pull/4602)  
    这是对安装稳定性的直接修复，解决 `curl ... | sh` 之类非交互环境下的安装向导问题。  
    已有 fix PR。  
- 当前快照里未见崩溃、数据丢失或安全事件类报告，稳定性风险主要集中在**协议/安装场景**两类。  
  相关链接：[#4603](https://github.com/HKUDS/nanobot/issues/4603)、[#4602](https://github.com/HKUDS/nanobot/pull/4602)

## 6. 功能请求与路线图信号
- [#4604 Anthropic OAuth](https://github.com/HKUDS/nanobot/issues/4604)  
  说明用户对**认证/授权一体化**有明确需求，尤其是 Anthropic 相关接入体验。若项目后续继续增强多模型支持，这类需求大概率会进入优先级池。  
- [#4605 external script trigger agent action](https://github.com/HKUDS/nanobot/issues/4605)  
  这是一个很强的路线图信号：用户希望 NanoBot 提供**可编排、可自动化、可被外部系统调用**的能力，接近“agent-as-a-service”的使用方式。  
- 结合今天的 PR 方向来看：  
  - [#4601](https://github.com/HKUDS/nanobot/pull/4601) 强化消息链路闭环  
  - [#4602](https://github.com/HKUDS/nanobot/pull/4602) 改善部署可用性  
  这些都说明项目正在向**集成友好、生产可用、可自动化**的方向演进。  
- 若进入下一版本，较可能优先纳入的方向包括：**外部触发接口 / CLI 钩子、OAuth 支持、更多渠道集成体验优化**。  
  相关链接：[#4604](https://github.com/HKUDS/nanobot/issues/4604)、[#4605](https://github.com/HKUDS/nanobot/issues/4605)、[#4601](https://github.com/HKUDS/nanobot/pull/4601)、[#4602](https://github.com/HKUDS/nanobot/pull/4602)

## 7. 用户反馈摘要
- 正向反馈：用户明确提到 NanoBot 的**代码库轻量、易读、易理解**，这对开源项目尤其重要，意味着二次开发门槛较低。  
  相关链接：[#4605](https://github.com/HKUDS/nanobot/issues/4605)
- 真实使用场景：用户已经在用 `gws CLI` 做 **Gmail 邮件重要性分类**，并希望通过外部脚本把 agent 动作接到自己的自动化系统里，说明 NanoBot 正被用于**实际生产/半生产工作流**，而非纯演示。  
  相关链接：[#4605](https://github.com/HKUDS/nanobot/issues/4605)
- 主要痛点：  
  - 外部系统缺少直接触发 agent 行为的标准方式；  
  - 第三方服务接入时，对 OAuth / 授权流程的需求正在上升。  
  相关链接：[#4605](https://github.com/HKUDS/nanobot/issues/4605)、[#4604](https://github.com/HKUDS/nanobot/issues/4604)

## 8. 待处理积压
- 以当前这份 24 小时快照来看，**还不能确认存在“长期未响应”的历史积压项**；可见条目基本都是当天新增或当天活跃。
- 但从维护优先级角度，建议持续关注以下待办信号：  
  - [#4603](https://github.com/HKUDS/nanobot/issues/4603) —— 协议一致性/重构风险，建议优先评估  
  - [#4604](https://github.com/HKUDS/nanobot/issues/4604) —— OAuth 诉求明确，适合纳入路线图评审  
  - [#4605](https://github.com/HKUDS/nanobot/issues/4605) —— 外部脚本触发能力，属于高价值自动化需求  
- 若后续这些条目持续无响应，它们很可能会演变为**集成能力与可用性方面的长期积压**。  
  相关链接：[#4603](https://github.com/HKUDS/nanobot/issues/4603)、[#4604](https://github.com/HKUDS/nanobot/issues/4604)、[#4605](https://github.com/HKUDS/nanobot/issues/4605)

如需，我也可以把这份日报进一步整理成**适合周报/邮件发送的简版**，或输出为 **Markdown 表格版**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-06-30）

## 1. 今日速览
今天 Hermes Agent 的活跃度很高：过去 24 小时内有 **23 条 Issue 更新**、**42 条 PR 更新**，但**没有新版本发布**。从内容结构看，项目当前明显处于“高频修复 + 平台扩展”的维护阶段，讨论重心集中在 **消息平台稳定性、会话一致性、权限/安全边界、桌面端兼容** 等核心体验上。  
同时，今天出现了多条高质量 bug 报告与直接对应的修复 PR，说明社区贡献较活跃，且问题定位普遍较具体。整体判断：**项目热度高、迭代快，但稳定性风险面也较广，维护压力偏高**。

---

## 3. 项目进展
> 今日数据中显示：共有 **3 个 PR 已合并/关闭**，但原始摘要未展开具体编号。以下列出的是今天公开可见、且最能代表项目推进方向的 PR（多数仍为 OPEN），它们基本覆盖了今日主线工作。

### 关键推进方向
- **消息平台修复链条被快速打通**  
  - [#55384](https://github.com/NousResearch/hermes-agent/pull/55384) `fix(platform/email)`: 容忍未知 email charset  
  - [#55382](https://github.com/NousResearch/hermes-agent/pull/55382) `fix(platform/email)`: 让邮件头解析对 malformed encoded-word 更健壮  
  - [#55378](https://github.com/NousResearch/hermes-agent/pull/55378) `fix(gateway/sms)`: 补 `re` 导入，修复 SMS standalone send 崩溃  
  这些 PR 直接把“消息送达失败/崩溃”类问题转成可落地修复，说明项目在 **消息 ingress/egress 稳定性** 上推进明显。

- **工具参数与模型兼容性继续补洞**  
  - [#55370](https://github.com/NousResearch/hermes-agent/pull/55370) `fix(agent)`: 保留前导零字符串，不再被强制转成整数  
  - [#55389](https://github.com/NousResearch/hermes-agent/pull/55389) `fix(mcp)`: 让 stdio `args` 在运行前从字符串纠正为 list  
  这类修复对 Agent/MCP 集成很关键，说明项目在处理 **schema coercion / config normalization** 的边界问题。

- **安全边界与自动审批逻辑持续加固**  
  - [#55368](https://github.com/NousResearch/hermes-agent/pull/55368) `fix(acp/security)`: 处理 symlink 的敏感路径绕过  
  - [#55373](https://github.com/NousResearch/hermes-agent/pull/55373) `fix(security)`: 拒绝“像命令的 API key 输入”  
  这说明维护方向已经从“功能可用”进一步转向“**自动化场景下的安全默认值**”。

- **桌面端和网关体验继续优化**  
  - [#55390](https://github.com/NousResearch/hermes-agent/pull/55390) `fix(desktop)`: 修复 Windows `file://` 本地预览路径  
  - [#55366](https://github.com/NousResearch/hermes-agent/pull/55366) `fix(desktop)`: 修复 Projects sidebar 折叠图标不一致  
  - [#55397](https://github.com/NousResearch/hermes-agent/pull/55397) `fix(container-boot)`: 启动时自愈 draining/degraded 网关  
  - [#55395](https://github.com/NousResearch/hermes-agent/pull/55395) `fix(slack)`: 识别错误的 user token 配置  
  这些 PR 体现出 Hermes 正在补齐 **跨平台可用性** 与 **生产环境恢复能力**。

**总体评价：**今天的 PR 流非常“工程化”，以补丁和兼容修复为主，直接推进了项目的可用性和可信度；从主题上看，项目正在从“多平台接入”阶段，走向“多平台稳定运营”阶段。

---

## 4. 社区热点
今日讨论最集中的主题，明显围绕 **崩溃、数据损坏、安全边界、会话一致性** 展开。以下 Issue 最活跃，且都附带了较明确的复现或风险说明：

1. [#55383](https://github.com/NousResearch/hermes-agent/issues/55383)  
   **Inbound email: unknown charset crashes `_extract_text_body`**  
   - 评论数：2  
   - 诉求：邮件正文解析不能因为攻击者/外部邮件的 `charset` 值异常而把整个 IMAP fetch 弄崩。  
   - 热点原因：这是典型的“外部输入导致全链路中断”的高风险问题。

2. [#55369](https://github.com/NousResearch/hermes-agent/issues/55369)  
   **Union integer|string tool args drop leading zeros**  
   - 评论数：2  
   - 诉求：像 `"007"` 这样的值不应被自动吞成 `7`。  
   - 热点原因：这类问题看似小，但会直接破坏 zip code、工单号、编号等业务语义。

3. [#55367](https://github.com/NousResearch/hermes-agent/issues/55367)  
   **ACP auto-approve sensitive-path guard ignores symlinks**  
   - 评论数：2  
   - 诉求：自动审批不能被 symlink 伪装绕过。  
   - 热点原因：涉及安全边界，且和自动编辑/自动审批功能直接相关。

4. [#55381](https://github.com/NousResearch/hermes-agent/issues/55381)  
   **Malformed RFC 2047 header crashes `_decode_header_value`**  
   - 评论数：1  
   - 诉求：邮件头解析要容错，不能因坏头部直接丢消息。  
   - 热点原因：与邮件接入稳定性强相关，属于生产级问题。

5. [#55377](https://github.com/NousResearch/hermes-agent/issues/55377)  
   **SMS standalone send crashes with NameError: re not imported**  
   - 评论数：1  
   - 诉求：SMS 发送不能因为基础导入缺失而完全失效。  
   - 热点原因：属于“低级但影响面大”的阻断型 bug。

6. [#55374](https://github.com/NousResearch/hermes-agent/issues/55374)  
   **WebUI/API session continuity failure**  
   - 状态：已关闭  
   - 诉求：会话不能串台、不能把后续回复从无关历史上下文里拿出来。  
   - 热点原因：这类问题直接伤害用户对 Agent“记忆一致性”的信任。

**背后诉求总结：**  
社区今天最关心的，不是“更炫的功能”，而是 **真实生产输入下的稳健性**：坏邮件、坏配置、坏 token、跨平台消息、自动审批、会话连续性——这些都在直接决定 Hermes 能不能进入高频实际使用。

---

## 5. Bug 与稳定性
以下按严重程度从高到低排序，并标注是否已有修复 PR：

| 严重度 | 问题 | 影响 | 修复状态 |
|---|---|---|---|
| P2 / Security | [#55367](https://github.com/NousResearch/hermes-agent/issues/55367) ACP 自动审批对 symlink 不敏感，可能绕过敏感路径保护 | 可能导致敏感文件被误放行，属于安全边界问题 | **已有修复 PR**：[#55368](https://github.com/NousResearch/hermes-agent/pull/55368) |
| P2 / Data integrity | [#55369](https://github.com/NousResearch/hermes-agent/issues/55369) `Union[int, str]` 工具参数把 `"007"` 变成 `7` | 数据语义被破坏，影响工单号/编号/邮编等 | **已有修复 PR**：[#55370](https://github.com/NousResearch/hermes-agent/pull/55370) |
| P2 / Session state | [#55374](https://github.com/NousResearch/hermes-agent/issues/55374) WebUI/API 会话串台、连续性失败 | 直接影响对话可靠性和上下文隔离 | **已关闭**，当前未见对应修复 PR |
| P3 / Message delivery crash | [#55383](https://github.com/NousResearch/hermes-agent/issues/55383) 邮件未知 charset 导致 `_extract_text_body` 崩溃 | IMAP fetch 中断，消息可能被整体丢弃 | **已有修复 PR**：[#55384](https://github.com/NousResearch/hermes-agent/pull/55384) |
| P3 / Message delivery crash | [#55381](https://github.com/NousResearch/hermes-agent/issues/55381) RFC 2047 malformed header 导致 `_decode_header_value` 崩溃 | 邮件头解析失败，消息丢失 | **已有修复 PR**：[#55382](https://github.com/NousResearch/hermes-agent/pull/55382) |
| P3 / Platform crash | [#55377](https://github.com/NousResearch/hermes-agent/issues/55377) SMS 发送因缺少 `re` 导入而 NameError | 所有 standalone SMS 发送均会失败 | **已有修复 PR**：[#55378](https://github.com/NousResearch/hermes-agent/pull/55378) |
| P3 / Data corruption | [#55376](https://github.com/NousResearch/hermes-agent/issues/55376) 长字母数字串在聊天消息中被破坏 | JWT、token 等敏感/关键串会失真 | **暂无修复 PR** |
| P3 / Resource safety | [#55359](https://github.com/NousResearch/hermes-agent/issues/55359) WhatsApp 出站失败读取超大响应体不受限 | 可能造成不必要的内存/日志压力 | **暂无修复 PR** |
| P3 / Resource safety | [#55356](https://github.com/NousResearch/hermes-agent/issues/55356) Slack `response_url` 失败路径读取超大响应体不受限 | 同类资源风险 | **暂无修复 PR** |
| P3 / Resource safety | [#55353](https://github.com/NousResearch/hermes-agent/issues/55353) Google Chat 错误体读取不受限 | 同类资源风险 | **暂无修复 PR** |
| P3 / Resource safety | [#55350](https://github.com/NousResearch/hermes-agent/issues/55350) LINE reply/push 错误体读取不受限 | 同类资源风险 | **暂无修复 PR** |
| P3 / Resource safety | [#55347](https://github.com/NousResearch/hermes-agent/issues/55347) Teams standalone send 错误体读取不受限 | 同类资源风险 | **暂无修复 PR** |
| P3 / Logging | [#55341](https://github.com/NousResearch/hermes-agent/issues/55341) `setup_logging(force=True)` 留下 stale file handler | 日志级别与预期不一致，排障干扰 | **暂无修复 PR** |

**稳定性判断：**  
今日的 bug 类型不是单点故障，而是明显的 **“输入容错 + 平台集成 + 安全边界”** 组合风险。最值得优先处理的是 **安全绕过、消息丢失、会话串台** 三类问题，因为它们的用户感知最强，也最容易损害信任。

---

## 6. 功能请求与路线图信号
今天新增的功能需求，透露出几个很清晰的路线图方向：

### 高信号功能请求
- [#55391](https://github.com/NousResearch/hermes-agent/issues/55391) **Make Nix an explicitly supported install path**  
  - 信号：仍有用户希望 Hermes 对 Nix 有官方级支持，说明安装/部署体验是持续诉求。

- [#55379](https://github.com/NousResearch/hermes-agent/issues/55379) **computer_use tool 增加 window_id / pid 参数**  
  - 信号：Linux/X11 用户需要更精确的窗口 targeting，表明桌面自动化能力在向专业化用法演进。

- [#55372](https://github.com/NousResearch/hermes-agent/issues/55372) **orchestrator profile 的 session continuity**  
  - 信号：用户在编排型、多 profile 工作流里，把“上下文连续性”视为核心能力。

- [#55360](https://github.com/NousResearch/hermes-agent/issues/55360) **expired OpenAI Codex credentials 的 channel-safe reauth**  
  - 信号：认证恢复必须适配“只能通过 dashboard / messaging gateway 交互”的场景，体现 Hermes 已进入更多真实业务流程。

- [#55371](https://github.com/NousResearch/hermes-agent/issues/55371) **.hermes 在 git worktree 场景下缺失**  
  - 信号：项目在多 worktree 开发环境下的本地状态管理仍有明显改进空间。

- [#55375](https://github.com/NousResearch/hermes-agent/issues/55375) **为 bundled skill 使用标准 AISP package 作为 source of truth**  
  - 信号：技能系统正朝着标准化、可维护化方向演化。

- [#55396](https://github.com/NousResearch/hermes-agent/issues/55396) **Profile 没有 model provider 时形成 deadlock**  
  - 信号：这是一个很典型的 UX 死锁问题，优先级可能不低。

### 从现有 PR 反推的下一版本倾向
结合今天的 PR 主题，下一版更可能优先纳入：
- **平台兼容性修复**：Windows、X11、file://、Slack、Google Chat、LINE、Teams、WhatsApp
- **交互效率优化**：[#55398](https://github.com/NousResearch/hermes-agent/pull/55398) 数字快捷审批、[#55394](https://github.com/NousResearch/hermes-agent/pull/55394) per-platform typing indicator
- **恢复与自愈能力**：[#55397](https://github.com/NousResearch/hermes-agent/pull/55397) 网关自愈
- **模型/工具配置健壮性**：[#55389](https://github.com/NousResearch/hermes-agent/pull/55389)、[#55370](https://github.com/NousResearch/hermes-agent/pull/55370)

**路线图判断：** Hermes 正在从“能接入”转向“接入后不掉线、不中断、不误判”，下一阶段很可能是 **可靠性优先于新奇功能**。

---

## 7. 用户反馈摘要
从今天的 Issues 评论与描述中，能提炼出几条很真实的用户痛点：

- **消息系统必须“坏输入可活”**  
  用户在邮件、SMS、Slack、WhatsApp、Teams、Google Chat 等通道里使用 Hermes，实际数据里经常会遇到坏 header、异常 charset、超大错误体、意外 token。  
  诉求是：**任何单条异常都不应拖垮整次收发流程**。  
  相关链接：[#55383](https://github.com/NousResearch/hermes-agent/issues/55383)、[#55381](https://github.com/NousResearch/hermes-agent/issues/55356)、[#55353](https://github.com/NousResearch/hermes-agent/issues/55353)

- **会话连续性是“主功能”，不是边角料**  
  WebUI/API session 串台、cron 注入到已有 session、orchestrator profiles 的上下文保持，说明很多用户不是把 Hermes 当单次聊天机器人，而是当持续工作流的中枢。  
  相关链接：[#55374](https://github.com/NousResearch/hermes-agent/issues/55374)、[#55372](https://github.com/NousResearch/hermes-agent/issues/55372)

- **自动化越强，安全默认值越重要**  
  ACP 自动审批、API key 输入、credential pool 等地方一旦放松边界，就可能在“省一步”的同时放大风险。  
  相关链接：[#55367](https://github.com/NousResearch/hermes-agent/issues/55367)、[#55373](https://github.com/NousResearch/hermes-agent/pull/55373)

- **桌面端和跨平台兼容性仍是高频需求**  
  Windows file URL、X11 window targeting、Projects sidebar 图标、Nix 支持，说明用户群体跨桌面平台与开发环境较广。  
  相关链接：[#55390](https://github.com/NousResearch/hermes-agent/issues/55390)、[#55379](https://github.com/NousResearch/hermes-agent/issues/55379)、[#55391](https://github.com/NousResearch/hermes-agent/issues/55391)

- **用户反馈质量较高，且带有强复现导向**  
  今天多条 issue 都提供了配置片段、复现步骤和风险说明，这对快速修复很有帮助，也反映出 Hermes 社区的使用深度较高。

---

## 8. 待处理积压
> 严格来说，今天的数据里没有“长期未响应”的典型样本，因为多数问题都是 **2026-06-30 当天新开**。但从优先级和影响面看，以下条目值得维护者尽快盯住：

### 仍需优先跟进的高价值 Issue
- [#55396](https://github.com/NousResearch/hermes-agent/issues/55396) **Profile 无 model provider 导致死锁**
- [#55391](https://github.com/NousResearch/hermes-agent/issues/55391) **Nix 官方支持路径**
- [#55379](https://github.com/NousResearch/hermes-agent/issues/55379) **X11 window_id / pid 支持**
- [#55360](https://github.com/NousResearch/hermes-agent/issues/55360) **过期凭据的 channel-safe reauth**
- [#55376](https://github.com/NousResearch/hermes-agent/issues/55376) **长字符串被破坏**
- [#55359](https://github.com/NousResearch/hermes-agent/issues/55359)、[#55356](https://github.com/NousResearch/hermes-agent/issues/55356)、[#55353](https://github.com/NousResearch/hermes-agent/issues/55353)、[#55350](https://github.com/NousResearch/hermes-agent/issues/55350)、[#55347](https://github.com/NousResearch/hermes-agent/issues/55347) **各平台错误体读取不受限**

### 已有修复 PR、但建议尽快 review/合并的条目
- [#55384](https://github.com/NousResearch/hermes-agent/pull/55384) 邮件 charset 容错
- [#55382](https://github.com/NousResearch/hermes-agent/pull/55382) 邮件头解析容错
- [#55378](https://github.com/NousResearch/hermes-agent/pull/55378) SMS `re` 导入修复
- [#55370](https://github.com/NousResearch/hermes-agent/pull/55370) leading-zero 保真
- [#55368](https://github.com/NousResearch/hermes-agent/pull/55368) symlink 安全边界修复
- [#55373](https://github.com/NousResearch/hermes-agent/pull/55373) command-shaped key 拒收

**提醒维护者：** 今天的新增内容显示，Hermes 的主要风险已不在“有没有功能”，而在“这些功能是否在真实环境里足够稳”。建议把审查资源优先投向 **安全、消息送达、会话状态、配置解析** 四条主线。

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

以下为 **IronClaw（nearai/ironclaw）2026-06-30 项目动态日报**。基于你提供的近 24 小时 GitHub 数据，项目整体处于**低活跃、以维护性工作为主**的状态：今天没有新版本、没有 PR 进展，唯一新增的是一条测试相关 Issue。当前信号更偏向**稳定性修补与测试基础设施整理**，而非功能扩张。

---

## 1. 今日速览

过去 24 小时内，IronClaw 的仓库活动较少：**仅有 1 条 Issue 更新，0 条 PR 更新，0 个新版本发布**。  
从内容看，今天的核心动向并不是新功能推进，而是围绕 **mock-MCP 测试框架的 egress 层硬化** 展开，属于典型的测试可靠性修复。  
该 Issue 明确标注为 **test-only**，说明当前维护重点在于提升测试 scaffold 的健壮性，而非影响产品行为。  
综合判断，项目今日活跃度 **偏低，但健康度尚可**：没有明显的发布压力，也没有新增合并风险。  
- 相关链接：  
  - Repo: https://github.com/nearai/ironclaw  
  - 今日唯一 Issue: https://github.com/nearai/ironclaw/issues/5428

---

## 2. 版本发布

**今日无新版本发布。**

- Releases: https://github.com/nearai/ironclaw/releases

---

## 3. 项目进展

今天 **没有合并或关闭的重要 PR**，因此从代码层面看，项目没有发生可量化的功能推进。  
不过，从 Issue #5428 的描述可以看出，团队正在持续处理 **Reborn mock-MCP 测试 scaffold** 中遗留的三个预存在缺陷，这说明项目仍在推进“先把基础设施打牢，再继续扩展”的路线。  
当前的前进更多体现在**降低测试脆弱性、保障 byte-identical proof、避免行为改变**，而不是新增功能。

- 无今日 PR 进展：  
  - PR 列表: https://github.com/nearai/ironclaw/pulls
- 相关上下文 Issue：  
  - https://github.com/nearai/ironclaw/issues/5428
- 提到的前序 PR（背景参考）：  
  - https://github.com/nearai/ironclaw/pull/5427

---

## 4. 社区热点

今天没有高热讨论项：  
- **0 条 PR**
- **Issue #5428 评论数为 0**
- **👍 为 0**

这意味着社区讨论热度较低，暂无明显争议点或用户集中反馈。  
不过，#5428 的内容显示出维护者对测试层“byte-identical proof”和“moved-code behavior”非常谨慎，这背后反映的是：**团队对回归风险控制极其重视**，尤其是在重构或行为保持型拆分 PR 场景下。

- 热点 Issue：  
  - https://github.com/nearai/ironclaw/issues/5428
- PR 热点：  
  - https://github.com/nearai/ironclaw/pulls

---

## 5. Bug 与稳定性

今日唯一明确的 Bug/稳定性信号来自：

### 1) #5428 — Harden mock-MCP test egress layer (harness_mcp.rs): F1–F3 deferred from #5427
- 链接：https://github.com/nearai/ironclaw/issues/5428
- 严重程度：**低到中等**
- 性质：**测试-only 缺陷，不是直接用户面问题**
- 当前状态：**OPEN**
- 是否已有 fix PR：**未见**
- 影响判断：  
  该 Issue 指向 mock-MCP 测试 scaffolding 的三个既有缺陷，且是从 #5427 中刻意拆分、延后的事项。因为它们属于测试层面，不会直接影响终端用户功能，但会影响：
  - 测试可靠性
  - 回归捕获能力
  - 重构安全性
  - 维护者对代码行为一致性的证明

**稳定性结论**：  
今天没有出现崩溃、线上故障或用户可见回归的证据；当前风险主要集中在**测试基础设施的脆弱性**。

---

## 6. 功能请求与路线图信号

今天**没有明显的新功能需求**，也没有来自 PR 的路线图推进信号。  
#5428 更像是一个**技术债/测试修复任务**，而不是产品功能提案。

但它透露出一个间接路线图信号：  
- 项目仍在持续强化 **mock-MCP / harness / Reborn** 相关测试基础
- 维护者对 **行为保持、代码迁移证明、测试隔离** 很敏感
- 下一阶段可能优先处理的是 **稳定性和可验证性**，而不是新增能力

- 相关 Issue：  
  - https://github.com/nearai/ironclaw/issues/5428
- 相关前序 PR：  
  - https://github.com/nearai/ironclaw/pull/5427

---

## 7. 用户反馈摘要

由于今天 **Issue 无评论、PR 无讨论**，目前没有可直接提炼的“真实用户反馈”文本。  
但从 Issue 标题和摘要可推断出一个核心痛点：  
**测试 scaffolding 在重构过程中容易引入行为偏差，而维护者必须在不破坏 byte-identical 证明的前提下逐步修复。**

这说明当前用户/维护者更关心的是：
- 测试是否可信
- 重构是否安全
- 代码迁移后行为是否保持一致

从“满意/不满意”角度看，今天没有外部抱怨，但可以看出团队对现有测试层实现仍不完全满意，至少存在需要继续加固的地方。

- 反馈来源：  
  - https://github.com/nearai/ironclaw/issues/5428

---

## 8. 待处理积压

从你提供的数据看，**没有明显的长期未响应积压项**；唯一公开活跃项就是今天新开的 #5428。  
因此，当前更准确的判断是：**仓库没有显著堆积，但存在一个需要尽快跟进的测试修复任务**。  
如果后续 #5428 长期保持 OPEN 且无关联 fix PR，则它可能演变为小规模技术债积压。

- 当前待处理项：  
  - https://github.com/nearai/ironclaw/issues/5428
- PR 队列：  
  - https://github.com/nearai/ironclaw/pulls
- Issue 队列：  
  - https://github.com/nearai/ironclaw/issues

---

### 总结判断
IronClaw 在 2026-06-30 的状态可以概括为：**低噪音、低活跃、维护导向明确**。  
没有发布、没有 PR 变更、没有社区热议，但存在一条值得关注的测试修复 Issue，表明团队仍在为后续重构与功能迭代夯实基础。  
如果你希望，我也可以把这份日报进一步整理成 **“适合内部晨报/周报格式”** 或 **“Markdown 表格版”**。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-06-30）

## 1) 今日速览
今天 LobsterAI 的仓库整体呈现“低噪音、轻维护”的状态：过去 24 小时没有新增或活跃 Issues，也没有新版本发布，说明当前没有明显的外部故障或集中反馈压力。  
当天唯一的代码活动来自 1 条已关闭 PR，重点集中在 **日志与诊断能力增强**，覆盖 Cowork、OpenClaw 以及 renderer 相关链路，属于典型的稳定性与可观测性优化。  
从活跃度看，项目今日更偏向 **维护型推进**，不是功能扩张高峰，但对生产排障与后续支持质量是实质性加分。  
**GitHub**：`https://github.com/netease-youdao/LobsterAI`

---

## 2) 项目进展
### PR #2229：`feat(logging): add diagnostics for Cowork and OpenClaw flows`
- 状态：**CLOSED**（数据统计中计入“已合并/关闭”）
- 作者：liuzhq1986
- 时间：2026-06-30
- 链接：`https://github.com/netease-youdao/LobsterAI/pull/2229`

**推进内容：**
- 为 **Cowork** 会话加载、消息分页、rail 导航、renderer service 调用增加诊断日志
- 强化 **OpenClaw** 运行时与错误处理诊断，便于生产环境定位问题
- 保持与既有 **release conversation rail pagination** 调整的兼容性

**项目意义：**
- 这类改动不直接新增用户可见功能，但会显著提升：
  - 线上问题定位效率
  - 复杂链路的可观测性
  - 版本回溯与故障分析质量
- 从“项目整体向前迈进多少”来看，今天更像是 **把底层排障能力往前推了一步**，属于高性价比维护型进展。

---

## 3) 社区热点
今天没有可识别的社区热点：
- Issues：0 条更新
- PR：仅 1 条，且 **评论数为 0、反应数为 0**

因此，今日没有形成“讨论最活跃”或“争议最集中”的条目。当前社区互动强度偏低，说明：
- 没有明显的阻塞问题引发讨论
- 该 PR 更像是维护性提交，而非需求争论点

**GitHub**：`https://github.com/netease-youdao/LobsterAI/pulls`  
**GitHub Issues**：`https://github.com/netease-youdao/LobsterAI/issues`

---

## 4) Bug 与稳定性
今日未观察到新增 Bug、崩溃或回归类 Issues，因此没有可按严重程度排序的故障清单。  
从当前数据看，**暂无已公开的稳定性事件**，也没有与之对应的 fix PR 需要跟踪。

**结论：**
- 高严重度：未发现
- 中低严重度：未发现
- 已知 fix PR：无可映射项

**GitHub**：`https://github.com/netease-youdao/LobsterAI/issues`

---

## 5) 功能请求与路线图信号
今天没有新增功能需求型 Issues，因此**没有明确的用户路线图输入**。  
不过，PR #2229 释放出一个很清晰的路线图信号：项目近期在加强 **可观测性、错误诊断、分页/导航链路稳定性**。这类改动通常意味着维护者正在优先处理：
- 线上排障
- 复杂交互链路的可靠性
- 发布后支持成本控制

如果后续有版本节奏，这类诊断增强很可能成为“先落地、后验证”的基础能力，属于值得纳入下一版本的候选项。

**GitHub**：`https://github.com/netease-youdao/LobsterAI/pull/2229`

---

## 6) 用户反馈摘要
今日没有 Issues 评论线程，也没有 PR 讨论，因此无法从用户反馈中提炼出真实痛点、使用场景或满意/不满意点。  
这本身也说明当前公开反馈面较平静，暂未出现需要维护者回应的集中诉求。

**GitHub**：`https://github.com/netease-youdao/LobsterAI/issues`

---

## 7) 待处理积压
基于今天的数据快照，**没有发现可确认的长期未响应积压项**：  
- Issues 更新为 0
- PR 仅 1 条且已关闭
- 无版本发布压力信号

不过，从维护角度仍建议定期巡视仓库中的打开项，避免“低讨论、低更新”掩盖潜在积压。

**GitHub**：`https://github.com/netease-youdao/LobsterAI/issues`  
**GitHub PRs**：`https://github.com/netease-youdao/LobsterAI/pulls`

---

### 总体判断
LobsterAI 在 2026-06-30 这一天表现为 **稳定、低波动、偏维护型推进**。没有新增问题意味着外部压力较低；唯一变更聚焦诊断日志，说明项目正在为更好的线上可观测性和后续支持能力做准备。  
如果把“健康度”分为功能推进、社区活跃和稳定性三项，今天的表现更接近：**稳定性较好，功能节奏温和，社区互动偏低。**

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

以下为 **2026-06-30 的 CoPaw（agentscope-ai/QwenPaw）项目动态日报**。整体看，项目今日处于**高开发活跃、低外部讨论、无发版**状态：24 小时内有 13 条 PR 更新、1 条 Issue 更新，且有 7 条 PR 已关闭/收口，说明团队主要精力集中在功能推进、稳定性修复与文档整理上。当前没有新 Release，意味着多数改动仍在集成与审查阶段。整体健康度偏正向，但版本节奏仍以开发冲刺为主，而非发布驱动。

---

## 1) 今日速览
- 今日仓库活跃度较高，PR 动态明显强于 Issue 动态，属于典型的“开发推进日”。  
- 7 条 PR 已合并/关闭，覆盖运行时修复、跨平台兼容、测试清理、文档更新等方向。  
- 仅有 1 条新 Issue，且为明确的功能增强请求，未见大量故障告警，说明社区压力主要集中在能力补齐而非紧急救火。  
- 当前无新版本发布，短期内更像是在为下一次发版做积累。  
- 参考：仓库条目汇总中最活跃的讨论与变更点见 [Issue #5638](https://github.com/agentscope-ai/QwenPaw/issues/5638) 与各 PR 列表。

---

## 2) 版本发布
- **今日无新版本发布**，故无新增 Release 说明可披露。

---

## 3) 项目进展
今日已关闭/收口的 PR 显示项目在多个层面继续前进：

1. **跨平台与运行时兼容修复**  
   - [#5635 fix(runtime, agents): convert Windows paths to file:// URLs and fix reverse parsing](https://github.com/agentscope-ai/QwenPaw/pull/5635)  
     解决 Windows 本地路径在上传链路中的 URL 识别问题，属于典型的跨平台稳定性补丁。  
   - [#5632 fix(toolCards): use stringifyResult before counting lines…](https://github.com/agentscope-ai/QwenPaw/pull/5632)  
     修正工具卡片结果统计/展示逻辑，减少解析偏差。

2. **运行时约束与产品行为收紧**  
   - [#5640 fix(runtime): require coding_mode enabled before using project_dir](https://github.com/agentscope-ai/QwenPaw/pull/5640)  
     强化 `project_dir` 的前置条件，避免配置误用导致运行异常。  
   - [#5641 fix: desktop screenshot in worksapce](https://github.com/agentscope-ai/QwenPaw/pull/5641)  
     修复工作区截图相关问题，属于面向桌面工作流的可用性修补。

3. **文档与测试债务清理**  
   - [#5636 docs: rename HiClaw to AgentTeams in practice guides](https://github.com/agentscope-ai/QwenPaw/pull/5636)  
     文档命名统一，减少品牌/术语混乱。  
   - [#5634 chore(e2e): drop SLASH-006 plan command case](https://github.com/agentscope-ai/QwenPaw/pull/5634)  
     清理已移除功能对应的 E2E 用例，降低测试维护成本。

4. **子代理方向继续推进**  
   - [#5633 [first-time-contributor] feat(subagent): add event-driven background lifecycle and parent wakeup](https://github.com/agentscope-ai/QwenPaw/pull/5633)  
     表明“后台子代理事件驱动生命周期”是当前被持续关注的能力方向。

**整体评估：**  
今日已收口 7 个 PR，说明项目不只是“有提交”，而是在持续把改动落地到可维护状态。推进重点从单点功能扩展，逐步转向**稳定性、兼容性、规范化和体验修复**，这是成熟项目的正向信号。

---

## 4) 社区热点
今日可见讨论热度最高的是功能请求：

- [#5638 [OPEN] [enhancement] [Feature]: Support per-cron-job model override (`request.model` honored in cron executor)](https://github.com/agentscope-ai/QwenPaw/issues/5638)  
  - 评论数：1  
  - 👍：0  
  - 诉求：希望 cron executor 真正尊重 `jobs.json` 中的 `request.model`，支持**单个定时任务覆盖模型**。  
  - 背后原因：用户显然在做**多模型/多任务并行调度**，希望配置层与执行层一致，不要出现“写了但不生效”的体验断层。

其余今日 PR 未提供可见评论/反应数据，因此从当前快照看，**社区讨论热度不高，但需求指向明确**：大家更关心功能是否按配置精确执行，而不是泛泛的产品讨论。

---

## 5) Bug 与稳定性
今日未见新的“Bug issue”集中爆发，但 PR 侧体现出明显的稳定性修复趋势。按潜在影响排序如下：

1. **安全/高风险命令拦截加强**  
   - [#5642 fix(acp): strengthen external runner hard-block policy](https://github.com/agentscope-ai/QwenPaw/pull/5642)  
   - 价值：收紧外部 runner 的硬阻断策略，降低灾难性命令漏放风险。  
   - 结论：**已有 fix PR，但仍在 OPEN 状态**。

2. **运行时配置误用防护**  
   - [#5640 fix(runtime): require coding_mode enabled before using project_dir](https://github.com/agentscope-ai/QwenPaw/pull/5640)  
   - 价值：减少错误配置进入执行链路的概率。  
   - 结论：**已有 fix PR，且已关闭**。

3. **跨平台兼容性问题**  
   - [#5635 fix(runtime, agents): convert Windows paths to file:// URLs and fix reverse parsing](https://github.com/agentscope-ai/QwenPaw/pull/5635)  
   - 价值：修复 Windows 文件路径上传/解析问题，影响实际使用面广。  
   - 结论：**已有 fix PR，且已关闭**。

4. **展示/统计逻辑偏差**  
   - [#5632 fix(toolCards): use stringifyResult before counting lines…](https://github.com/agentscope-ai/QwenPaw/pull/5632)  
   - 价值：减少结果展示误判，属于低风险但高频体验问题。  
   - 结论：**已有 fix PR，且已关闭**。

5. **工作区截图异常**  
   - [#5641 fix: desktop screenshot in worksapce](https://github.com/agentscope-ai/QwenPaw/pull/5641)  
   - 价值：改善桌面/工作区流程中的截图能力。  
   - 结论：**已有 fix PR，且已关闭**。

**总体判断：**  
今日稳定性问题更多以“预防性修复”和“边界条件修正”的形式出现，尚未看到大规模崩溃或回归风暴，这是健康信号。

---

## 6) 功能请求与路线图信号
今日最明确的新需求来自：

- [#5638 Support per-cron-job model override](https://github.com/agentscope-ai/QwenPaw/issues/5638)  
  这是一个非常典型的“配置已存在、执行未兑现”的功能诉求，若被采纳，下一版本大概率会补齐**cron 任务粒度模型选择**能力。

结合今日开放中的 PR，路线图信号还包括：

- [#5639 feat(skill): Add skill auto sync](https://github.com/agentscope-ai/QwenPaw/pull/5639)  
  指向“技能池到工作区的自动同步”，属于提升协作效率的能力。  
- [#5637 feat(subagent): add event-driven background lifecycle and parent wakeup](https://github.com/agentscope-ai/QwenPaw/pull/5637)  
  指向更强的子代理后台执行模型，偏底层能力升级。  
- [#5643 perf: virtualize SidebarSessionList, deduplicate polling, cache…](https://github.com/agentscope-ai/QwenPaw/pull/5643)  
  说明 UI 规模与会话数增长后，性能优化已成为明确需求。  
- [#5644 docs(website): add Terminal UI (TUI) documentation page](https://github.com/agentscope-ai/QwenPaw/pull/5644)  
  表明 TUI 已进入可文档化、可推广阶段。  
- [#5645 fix: add coding mode project_dir as rw](https://github.com/agentscope-ai/QwenPaw/pull/5645)  
  说明 coding mode 与 project_dir 的权限/工作模式仍在打磨。  

**路线图判断：**  
下一版本最可能优先吸收的方向是：  
**调度器能力补强、子代理机制、技能同步、性能优化、安全约束**。  
这比单纯新增 UI 更接近“可规模化使用”的演进路径。

---

## 7) 用户反馈摘要
从今日 Issue 可提炼出的真实用户痛点主要有一条：

- [#5638](https://github.com/agentscope-ai/QwenPaw/issues/5638)：用户希望 cron job 能按任务覆盖模型，而不是所有任务都走统一默认模型。  
  - **使用场景**：定时任务自动化、不同任务适配不同模型成本/效果。  
  - **核心痛点**：配置字段存在，但执行层忽略，导致“看起来支持，实际上不生效”。  
  - **用户期待**：配置与运行时行为完全一致，减少脚本/调度系统中的隐式约束。  

从反馈结构看，今天几乎没有大量抱怨或负面评论，说明项目目前**没有明显的舆情压力**，但也意味着很多需求可能仍停留在“开发者主动实现”阶段，而非来自密集社区讨论。

---

## 8) 待处理积压
本日快照中**没有明显的长期未响应旧 Issue/PR**；可见积压主要是当天新增的开放 PR。按优先级建议维护者关注：

1. [#5642 fix(acp): strengthen external runner hard-block policy](https://github.com/agentscope-ai/QwenPaw/pull/5642)  
   安全相关，优先级最高。  
2. [#5637 feat(subagent): add event-driven background lifecycle and parent wakeup](https://github.com/agentscope-ai/QwenPaw/pull/5637)  
   架构型改动，影响面大。  
3. [#5643 perf: virtualize SidebarSessionList...](https://github.com/agentscope-ai/QwenPaw/pull/5643)  
   性能优化，建议尽快确认收益与回归风险。  
4. [#5639 feat(skill): Add skill auto sync](https://github.com/agentscope-ai/QwenPaw/pull/5639)  
   功能价值高，可能进入下版本候选。  
5. [#5645 fix: add coding mode project_dir as rw](https://github.com/agentscope-ai/QwenPaw/pull/5645)  
   与编码模式工作流相关，建议尽快明确权限语义。  
6. [#5644 docs(website): add Terminal UI (TUI) documentation page](https://github.com/agentscope-ai/QwenPaw/pull/5644)  
   风险低，但有助于功能落地和用户教育。

**结论：**  
当前并无“陈年积压”暴露，但开放 PR 数量仍较多，建议维护团队按**安全 > 架构 > 性能 > 体验/文档**的顺序推进，以保证下次发版质量。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-06-30）

## 1. 今日速览
今天 ZeroClaw 的仓库状态呈现出“**PR 活跃、Issue 冷清**”的特征：过去 24 小时没有新增或活跃 Issues，但有 **7 条 PR 更新**，说明开发推进主要集中在代码合入、兼容性修复和 CI/质量门禁完善上。  
其中 **3 条 PR 已关闭/合并，4 条仍在审阅中**，项目今天的有效推进主要来自修复类与基础设施类变更，而非面向用户的新版本发布。  
从内容看，关注点集中在 **MCP 安全配置、OpenAI 兼容性、原生库错误链、国际化补全和 CI 稳定性**，整体健康度偏稳健。  
综合判断：**项目活跃度中等偏高，研发节奏正常，但社区讨论热度偏低，主要是“开发驱动型”而非“用户讨论型”活跃。**

---

## 2. 版本发布
**今日无新版本发布。**

---

## 3. 项目进展
今天共有 **3 个 PR 关闭/合并**，主要推进了以下几类能力：

### 3.1 国际化补全：聊天工具栏翻译缺口修复  
- **PR #8513** `[CLOSED] fix(i18n): add chat toolbar button translations for zh, ja, es, fr, de`  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8513>  
  这条 PR 补齐了 5 种语言的 7 个翻译键，解决了聊天工具栏在部分语言下回退英文的问题。  
  **意义**：这是典型的用户可感知修复，直接提升多语言体验，属于产品成熟度增强项。

### 3.2 OpenAI 兼容性修复：tool_calls 请求格式更严格  
- **PR #8512** `[CLOSED] fix(providers): omit empty assistant tool-call content in OpenAI-compatible requests`  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8512>  
  修复了 assistant 带 `tool_calls` 时 `content` 发送空字符串的问题，使请求格式更符合 OpenAI chat-completions 规范。  
  **意义**：这是对第三方兼容后端的重要修正，减少“能跑但不标准”的边界兼容故障，利于提升对 OpenAI-compatible backend 的稳定性。

### 3.3 稳定性与 CI 修复：测试/ lint 断言补齐  
- **PR #8511** `[CLOSED] fix(channels): add missing ChannelMessage fields in orchestrator test`  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8511>  
  这条 PR 旨在修复 orchestrator 测试中缺失字段导致的 CI 问题，属于对回归和构建失败的直接止血。  
  **意义**：虽然是小修复，但对持续集成健康度很关键，能降低“孤立 PR 通过、合并后失败”的风险。

### 今日推进量评估
- **已完成 PR：3/7**
- **待处理 PR：4/7**
- 今天的进展以 **兼容性修复 + 稳定性修补 + 国际化完善** 为主，属于“基础质量提升日”，不是功能爆发日。  
- 对项目整体而言，这是一次 **向前推进约 43% 的当日 PR 闭环**（3 个完成，4 个仍待审），对主干质量有正向贡献。

---

## 4. 社区热点
今天没有形成明显的“讨论热点”：  
- **Issues：0 条更新**
- **PR 评论数：全部为 0（或未提供评论数据）**
- **👍 反应数：全部为 0**

因此，严格来说今天**没有真正的社区互动高峰**。  
但从 PR 主题看，最值得关注的几个方向是：

### 4.1 MCP 安全配置需求
- **PR #8515** `[OPEN] feat(mcp): Skip TLS certificate verification for MCP Server`  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8515>  
  背后诉求：支持自签证书、内部 CA 等企业网络环境，降低接入门槛。  
  这类需求通常来自 **企业内网部署、测试环境、私有 MCP Server** 场景。

### 4.2 OpenAI 兼容后端的严格协议适配
- **PR #8512** `[CLOSED] ... omit empty assistant tool-call content ...`  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8512>  
  背后诉求：让 ZeroClaw 在 **OpenAI / OpenAI-compatible / Azure / Copilot / OpenRouter** 等后端上更稳。

### 4.3 CI 与仓库结构约束
- **PR #8516** `[OPEN] ci(workflows): guard declared repository submodules`  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8516>  
- **PR #8517** `[OPEN] ci(workflows): gate Windows Clippy for tools changes`  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8517>  
  背后诉求：提高仓库一致性、降低误配置、减少无关 PR 的 Windows 资源消耗。  
  这说明团队正在把精力投入到 **工程治理和 CI 成本控制** 上。

---

## 5. Bug 与稳定性
今天 **没有新增 Issues**，因此没有“用户提交的 bug 列表”可供排序。  
不过从已关闭/合并 PR 中，可以识别出几类稳定性修复信号：

### 高优先级：兼容性/协议回归
- **PR #8512**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8512>  
  问题类型：OpenAI-compatible 请求格式不规范，可能导致严格后端拒绝请求。  
  **状态**：已有修复 PR。

### 中优先级：测试/CI 回归
- **PR #8511**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8511>  
  问题类型：orchestrator 测试字段缺失引发 CI 失败，属于回归性稳定问题。  
  **状态**：已有修复 PR。

### 中优先级：国际化缺失导致的体验降级
- **PR #8513**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8513>  
  问题类型：多语言界面文本缺失，导致回退英文。  
  **状态**：已有修复 PR。

### 潜在稳定性增强项（未合并）
- **PR #8514** `[OPEN] fix(aardvark-sys): preserve inner error in LibraryNotFound error chains`  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8514>  
  这条修复对排查动态库加载失败非常重要，尤其适用于 `.so` 损坏、权限不足、缺失依赖等场景。  
- **PR #8515**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8515>  
  虽是功能项，但本质上也是企业网络可用性增强，降低 TLS 证书问题造成的连接失败。

**结论**：今天没有公开 bug 工单，但已有 PR 显示项目正在主动修补 **协议兼容、测试回归和错误可诊断性**，稳定性面是健康的。

---

## 6. 功能请求与路线图信号
今天最明确的新功能请求来自开放 PR，且方向比较清晰：

### 6.1 MCP 连接配置增强：允许跳过 TLS 证书校验
- **PR #8515**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8515>  
  路线图信号：  
  - 支持自签证书 / 内部 CA  
  - 适配企业内网与本地开发环境  
  - 说明 ZeroClaw 正向“更易部署、更灵活接入”演进  
  **判断**：非常有可能进入下一版本，且属于中高优先级功能增强。

### 6.2 CI 质量门禁增强
- **PR #8516**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8516>  
- **PR #8517**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8517>  
  路线图信号：  
  - 仓库结构治理  
  - Windows Clippy 定向执行  
  - 更精准的质量门禁  
  **判断**：这类变更通常会优先进入维护版本或下一轮基础设施升级。

### 6.3 原生错误链可观测性增强
- **PR #8514**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8514>  
  路线图信号：  
  - 改善底层库加载失败的诊断能力  
  - 对故障定位和用户支持非常有价值  
  **判断**：如果 review 顺利，较可能进入下一版本。

---

## 7. 用户反馈摘要
**今天没有新增 Issues，也没有可见的 Issue 评论数据**，因此无法从“评论对话”中抽取真实用户反馈原文。  
不过从 PR 主题可以归纳出几类高频痛点与使用场景：

### 7.1 企业/内网部署痛点
- 诉求：MCP Server 使用自签证书或内部 CA 时希望可连接。  
- 对应 PR：**#8515**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8515>  
- 含义：用户并不总是运行在公网标准 TLS 环境中，部署灵活性是刚需。

### 7.2 多后端兼容性痛点
- 诉求：在 OpenAI-compatible 后端上不要发送不规范字段。  
- 对应 PR：**#8512**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8512>  
- 含义：用户希望 ZeroClaw 能平滑适配多家模型/代理服务，而不是仅在官方接口上工作。

### 7.3 国际化体验痛点
- 诉求：界面按钮不要回退英文。  
- 对应 PR：**#8513**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8513>  
- 含义：多语言用户群体已经存在，且对基础 UI 文案完整性有明确期待。

### 7.4 可诊断性与稳定性痛点
- 诉求：原生库失败时要保留内层错误，方便定位问题。  
- 对应 PR：**#8514**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8514>  
- 含义：用户对“失败原因不透明”的容忍度低，尤其在跨平台或动态依赖场景中。

---

## 8. 待处理积压
**今日没有可识别的长期未响应 Issue**，因为 Issues 更新数为 0。  
但从“待处理 PR”角度看，以下项目值得维护者优先关注：

### 8.1 高风险 CI 变更
- **PR #8516**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8516>  
  理由：涉及仓库结构校验，可能影响已有子模块工作流。

- **PR #8517**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8517>  
  理由：Windows Clippy 定向门禁，可能影响工具链相关变更的通过路径。

### 8.2 面向用户的功能增强
- **PR #8515**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8515>  
  理由：直接影响 MCP 接入场景，价值高，适合尽快明确策略。

### 8.3 可观测性修复
- **PR #8514**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8514>  
  理由：提升底层错误可读性，有助于减少排障成本。

**总体提醒**：虽然没有“陈旧积压”，但 **4 个开放 PR 都是当日新鲜提交**，建议维护者在 CI、兼容性和部署安全三个维度尽快完成首轮审阅，以免后续叠加冲突。

---

## 总结判断
ZeroClaw 今天的状态属于：**开发推进积极、用户问题沉默、工程质量建设持续推进**。  
如果按项目健康度评价：  
- **活跃度**：中等偏高  
- **稳定性方向**：正向  
- **社区讨论热度**：偏低  
- **下一版本信号**：明显偏向 **MCP 兼容性、CI 强化、错误可诊断性**  

如果你愿意，我可以继续把这份日报整理成一个**适合直接发到团队周报/飞书/Notion 的简洁版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*