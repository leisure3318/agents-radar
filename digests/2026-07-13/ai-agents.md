# OpenClaw 生态日报 2026-07-13

> Issues: 35 | PRs: 47 | 覆盖项目: 13 个 | 生成时间: 2026-07-13 01:10 UTC

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

# OpenClaw 项目动态日报（2026-07-13）

## 1) 今日速览
过去 24 小时，OpenClaw 仍处于**高强度维护与重构并行**阶段：Issues 更新 35 条（新开/活跃 19、关闭 16），PR 更新 47 条（待合并 33、已合并/关闭 14），但**没有新版本发布**。  
从议题分布看，今天的主旋律仍是**稳定性修复、性能优化、配置一致性、插件/网关边界收敛**，说明项目在快速迭代中持续清理技术债。  
整体活跃度偏高，且问题多集中在 **P1/P2** 与 **ux-friction / session-state / auth-provider / security** 等关键面，说明维护压力依然不小。  
好消息是：不少高优先级问题已经出现对应修复 PR，项目推进方向清晰，处于“发现问题 → 快速修复 → 收敛架构”的正循环中。

---

## 2) 项目进展
今日已关闭/合并的 PR 共 14 个，覆盖面较广，主要推进了以下几类能力：

### 关键修复与收敛
- **网关启动与首轮请求加速**
  - [PR #105801](https://github.com/openclaw/openclaw/pull/105801) `improve: start Gateway and first agent turn faster`
  - 直接对应并尝试解决：
    - [Issue #105745](https://github.com/openclaw/openclaw/issues/105745)（新 Gateway 启动仍加载不必要的 plugin repair runtime）
    - [Issue #105779](https://github.com/openclaw/openclaw/issues/105779)（ready 后仍延迟预热，首轮请求被冷启动拖慢）
  - 这是今天最重要的性能向前推进之一，目标是缩短“启动后可用”与“首轮响应”的双重冷启动成本。

- **技能管理能力补齐**
  - [PR #105814](https://github.com/openclaw/openclaw/pull/105814) `feat: add native Skills management parity`
  - 对应 [Issue #105741](https://github.com/openclaw/openclaw/issues/105741)
  - 推进了 iOS / macOS / Android 的 Skills 管理一致性，属于明显的产品能力补强。

- **配置默认值修复**
  - [PR #105807](https://github.com/openclaw/openclaw/pull/105807) `fix(config): apply provider-level contextWindow/maxTokens defaults to models`
  - 对应 [Issue #105803](https://github.com/openclaw/openclaw/issues/105803)
  - 这类修复很关键：它直接纠正了“文档写了默认值、运行时却没生效”的配置偏差。

- **恢复与会话稳定性**
  - [PR #105786](https://github.com/openclaw/openclaw/pull/105786) `refactor(sessions): reduce accessor boundary debt`
  - 对应 [Issue #105785](https://github.com/openclaw/openclaw/issues/105785)
  - [PR #105804](https://github.com/openclaw/openclaw/pull/105804) `chore: eliminate unchecked TypeScript test casts`
  - 对应 [Issue #105764](https://github.com/openclaw/openclaw/issues/105764)
  - 这类工作属于“为未来稳定性铺路”：减少边界混乱与测试不可信行为。

- **存储/并发/重试基础设施改进**
  - [PR #105780](https://github.com/openclaw/openclaw/pull/105780) `fix(commitments): avoid quadratic heartbeat session discovery`
  - 对应 [Issue #105787](https://github.com/openclaw/openclaw/issues/105787)
  - [PR #105789](https://github.com/openclaw/openclaw/pull/105789) `refactor(infra): consolidate retry scheduling`
  - 代表项目在清理高复杂度路径，减少 O(n²) 风险与重试策略漂移。

### 今日“项目向前迈进了多少”
- **14 个 PR 已收口**，其中多项是直接面向核心体验的修复/功能补齐。
- 同时 **16 个 Issue 已关闭**，说明修复链条正在快速闭合。
- 整体上，项目今天不是“发版本”，而是明显在做**质量收敛与架构瘦身**，这对中大型 AI 助手项目非常关键。

---

## 3) 社区热点
今天最活跃的话题几乎全部来自 Issues，PR 侧在当前快照里**没有显示出明显的评论/点赞峰值**，因此热点主要集中在高讨论度问题与其修复链路上。

### 评论最活跃的 Issues
1. [#105266](https://github.com/openclaw/openclaw/issues/105266)  
   `flaky(ui): locale-rendering tests fail nondeterministically...`  
   - 评论：3，👍：1  
   - 诉求：测试不稳定，且带有“轮换 victim / 非确定性”特征，说明 CI 可靠性仍有噪音。

2. [#105731](https://github.com/openclaw/openclaw/issues/105731)  
   `bootstrap-extra-files: opt-in support for operator-curated files...`  
   - 评论：2，👍：1  
   - 诉求：企业/多租户部署希望支持“运维/管理员预置文件”，强调可运维性和模板化工作区。

3. [#105733](https://github.com/openclaw/openclaw/issues/105733)  
   `Burn down packages and scripts dead-export baseline`  
   - 评论：2，👍：1  
   - 诉求：技术债治理，清理长期累积的 unused exports。

4. [#105748](https://github.com/openclaw/openclaw/issues/105748)  
   `Gateway startup waits for claw banner animation`  
   - 评论：2，👍：1  
   - 诉求：启动速度优先于展示动画，典型的“可用性 > 仪式感”。

5. [#105632](https://github.com/openclaw/openclaw/issues/105632)  
   `Control UI New Session silently discards edits...`  
   - 评论：2，👍：1  
   - 诉求：避免用户在等待创建会话时的输入丢失，这是典型的数据/状态一致性痛点。

### 热点背后的共同诉求
- **更快的启动与首轮响应**
- **更少的状态丢失与不可预测行为**
- **更稳定的测试与 CI**
- **更一致的配置语义**
- **更强的企业/管理型部署支持**

---

## 4) Bug 与稳定性
以下按严重程度排列，优先列出**未解决**或**仍在推进修复**的高风险问题。

### P1 / 高优先级
- [#105712](https://github.com/openclaw/openclaw/issues/105712)  
  `Stuck-session recovery skips phantom embedded_run claims...`  
  - 风险：会话 lane 可能被“幽灵运行”卡死，直到重启。  
  - 状态：**Open**  
  - fix PR：**未见**

- [#105763](https://github.com/openclaw/openclaw/issues/105763)  
  `CLAUDE_CONFIG_DIR env var not inherited... in Docker`  
  - 风险：认证/配置不可达，Docker 场景下直接影响可用性。  
  - 状态：**Open**  
  - fix PR：**未见**

- [#105729](https://github.com/openclaw/openclaw/issues/105729)  
  `OpenAI-compatible proxy transport clamps max_completion_tokens to 1...`  
  - 风险：输出预算异常缩到 1，属于严重功能回归。  
  - 状态：**Open**  
  - fix PR：**未见**

- [#105787](https://github.com/openclaw/openclaw/issues/105787)  
  `commitment heartbeat discovery rescans the store per due record`  
  - 风险：在 due record 密集时退化为二次复杂度，拖慢心跳处理。  
  - 状态：**Open**  
  - fix PR：**有**，对应 [PR #105780](https://github.com/openclaw/openclaw/pull/105780)

- [#105779](https://github.com/openclaw/openclaw/issues/105779)  
  `Gateway delays first-turn runtime plugin pre-warm beyond readiness`  
  - 风险：ready 后仍有显著冷启动惩罚。  
  - 状态：**Open**  
  - fix PR：**有**，对应 [PR #105801](https://github.com/openclaw/openclaw/pull/105801)

### P2 / 中高优先级
- [#105803](https://github.com/openclaw/openclaw/issues/105803)  
  `Provider-level contextWindow/maxTokens are ignored...`  
  - 风险：配置默认值失效，容易导致模型预算错误。  
  - 状态：**Open**  
  - fix PR：**有**，对应 [PR #105807](https://github.com/openclaw/openclaw/pull/105807)

- [#105797](https://github.com/openclaw/openclaw/issues/105797)  
  `Implicit text-to-bash parser fires Exec failed envelopes...`  
  - 风险：伪语法文本触发错误执行路径，属于 UX 和安全边界敏感问题。  
  - 状态：**Open**  
  - fix PR：**未见**

- [#105266](https://github.com/openclaw/openclaw/issues/105266)  
  `flaky(ui): locale-rendering tests fail nondeterministically...`  
  - 风险：CI 间歇失败，降低发布可信度。  
  - 状态：**Open**  
  - fix PR：**未见**

- [#105735](https://github.com/openclaw/openclaw/issues/105735)  
  `Dirty transcript search blocks the Gateway event loop`  
  - 风险：会阻塞主事件循环，接近挂死级体验问题。  
  - 状态：**Open**  
  - fix PR：**未见**

- [#105761](https://github.com/openclaw/openclaw/issues/105761)  
  `Runtime pairing state still writes legacy JSON files`  
  - 风险：状态存储双写/遗留文件可能引发同步问题。  
  - 状态：**Open**  
  - fix PR：**未见**

- [#105745](https://github.com/openclaw/openclaw/issues/105745)  
  `Fresh Gateway startup materializes plugin repair runtime without managed installs`  
  - 风险：无谓加载导致启动变慢。  
  - 状态：**Open**  
  - fix PR：**有**，对应 [PR #105801](https://github.com/openclaw/openclaw/pull/105801)

### 已关闭但值得关注的稳定性问题
- [#105188](https://github.com/openclaw/openclaw/issues/105188) — session reaper disk thrashing  
- [#105708](https://github.com/openclaw/openclaw/issues/105708) — Anthropic JSON schema invalid 400  
- [#105436](https://github.com/openclaw/openclaw/issues/105436) — UTF-8/UTF-16 length mismatch crash  
- [#105716](https://github.com/openclaw/openclaw/issues/105716) — memory_search ignores local provider config  
- [#105422](https://github.com/openclaw/openclaw/issues/105422) — abort listener leak  
- [#105748](https://github.com/openclaw/openclaw/issues/105748) — startup animation delay  
- [#105632](https://github.com/openclaw/openclaw/issues/105632) — New Session edits lost  
- [#105439](https://github.com/openclaw/openclaw/issues/105439) — cross-platform path separator bug  
- [#105798](https://github.com/openclaw/openclaw/issues/105798) — implicit text-to-bash parser false trigger（已关闭）

---

## 5) 功能请求与路线图信号
今天的功能诉求并不“发散”，反而很集中：用户想要的是**一致性、可控性、可扩展性**。

### 值得关注的功能请求
- [#105741](https://github.com/openclaw/openclaw/issues/105741)  
  `feat: add native Skills management parity`  
  - 信号：Skills 管理是跨端产品一致性的重点，很可能持续推进。  
  - 对应 PR： [#105814](https://github.com/openclaw/openclaw/pull/105814)

- [#105731](https://github.com/openclaw/openclaw/issues/105731)  
  `bootstrap-extra-files... custom names`  
  - 信号：企业部署、运维定制、模板化工作区需求上升。  
  - 说明：更像“平台能力”而非单点 bug。

- [#105750](https://github.com/openclaw/openclaw/issues/105750)  
  `llm_input hook is fire-and-forget + fail-open...`  
  - 信号：插件治理和安全边界在向“可阻断、可审计”方向演进。

- [#105752](https://github.com/openclaw/openclaw/issues/105752)  
  `Plain-text reasoning blocks leak into user-visible output...`  
  - 信号：模型输出清洗与推理内容隔离将继续成为路由层的重要议题。

- [#105797](https://github.com/openclaw/openclaw/issues/105797)  
  `Implicit text-to-bash parser... no config toggle to disable`  
  - 信号：用户希望有“可关闭的自动行为”，这通常会进入产品路线图中的安全/可控性优化。

### 可能纳入下一版本的方向
结合今天已有 PR，以下方向最像“下一版本会继续推进”的路线：
1. **启动/首轮性能优化**  
   - [#105801](https://github.com/openclaw/openclaw/pull/105801)
2. **Skills 与多端一致性**  
   - [#105814](https://github.com/openclaw/openclaw/pull/105814)
3. **配置默认值与校验一致性**  
   - [#105807](https://github.com/openclaw/openclaw/pull/105807)
4. **插件/会话边界收敛**  
   - [#105786](https://github.com/openclaw/openclaw/pull/105786)、[#105793](https://github.com/openclaw/openclaw/pull/105793)
5. **稳定性与测试可靠性**  
   - [#105804](https://github.com/openclaw/openclaw/pull/105804)、[#105816](https://github.com/openclaw/openclaw/pull/105816)

---

## 6) 用户反馈摘要
从今日 Issues 的问题表述来看，真实用户痛点非常明确：

- **“不要丢状态”**  
  例如 [#105632](https://github.com/openclaw/openclaw/issues/105632) 反映用户在等待创建会话时的编辑内容可能被静默丢弃。  
  这类反馈说明用户对“草稿、输入、恢复”的容错非常敏感。

- **“不要让我等”**  
  [#105748](https://github.com/openclaw/openclaw/issues/105748)、[#105745](https://github.com/openclaw/openclaw/issues/105779) 和 [#105801](https://github.com/openclaw/openclaw/pull/105801) 都在讲同一件事：启动后要尽快可用，首轮请求不能被不必要的预热/动画拖慢。  
  对 AI 助手产品而言，冷启动延迟会显著损伤“响应感”。

- **“配置要符合预期”**  
  [#105803](https://github.com/openclaw/openclaw/issues/105803) 说明文档、配置模型和运行时逻辑之间还存在落差。  
  用户最不满意的是“写了默认值却不生效”。

- **“自动化要可控”**  
  [#105797](https://github.com/openclaw/openclaw/issues/105797)、[#105750](https://github.com/openclaw/openclaw/issues/105750) 反映出用户对隐式行为非常敏感：  
  能自动化可以，但要能关、能审计、能阻断。

- **“稳定性优先于炫技”**  
  [#105266](https://github.com/openclaw/openclaw/issues/105266) 的 flaky test 说明团队与社区都在接受一个现实：复杂 AI 系统的健康度，最终靠 CI、边界处理和回归控制来维持。

---

## 7) 待处理积压
以下是今天最值得维护者盯紧的未解决项，虽然不一定是“老问题”，但都属于高影响、需尽快收口的积压：

- [#105712](https://github.com/openclaw/openclaw/issues/105712)  
  P1，会话 lane 可能被幽灵运行永久卡住。

- [#105763](https://github.com/openclaw/openclaw/issues/105763)  
  Docker 下认证/配置继承失败，属于高优先级可用性问题。

- [#105729](https://github.com/openclaw/openclaw/issues/105729)  
  输出预算被压到 1，影响范围大，且行为诡异。

- [#105797](https://github.com/openclaw/openclaw/issues/105797)  
  隐式 text-to-bash 解析没有关闭开关，安全与 UX 都需要评估。

- [#105735](https://github.com/openclaw/openclaw/issues/105735)  
  会阻塞 Gateway 事件循环，风险较高。

- [#105266](https://github.com/openclaw/openclaw/issues/105266)  
  flaky 测试会持续污染 CI 可信度，应该尽快稳定。

- [#105761](https://github.com/openclaw/openclaw/issues/105761)  
  旧 JSON 文件仍在被写入，状态迁移风险未完全消除。

- [#105750](https://github.com/openclaw/openclaw/issues/105750)  
  插件前置校验无法阻断 prompt，属于平台安全边界问题。

- [#105785](https://github.com/openclaw/openclaw/issues/105785) / [PR #105786](https://github.com/openclaw/openclaw/pull/105786)  
  虽已开始修复，但会话边界债务仍值得持续跟踪。

---

### 总体判断
OpenClaw 今天的健康度可以概括为：**活跃、推进快、问题集中在核心路径，但方向是正确的**。  
项目没有发布新版本，说明当前更像是在为下一次稳定发布做“集中修补与架构收口”。  
如果接下来能尽快把 **启动性能、会话稳定性、配置一致性、自动化边界** 这四类问题继续收紧，项目的整体成熟度会明显上一个台阶。

---

## 横向生态对比

以下为基于 2026-07-13 各项目日报的横向对比分析。

---

## 1) 生态全景

过去 24 小时，个人 AI 助手 / 自主智能体开源生态整体呈现出一个很明确的特征：**从“功能扩张”转向“稳定性、可恢复性、兼容性收敛”**。  
多数项目都没有发布新版本，说明当前更像是修复窗口，而非大规模交付窗口。  
高频问题集中在 **tool_call / 消息配对、session/state 持久化、provider 兼容、跨渠道接入、配置语义一致性** 等核心路径。  
这意味着生态正在进入更成熟的阶段：大家不再只追求“能跑”，而是追求“长会话可持续、跨平台可复用、出错后可恢复”。

---

## 2) 各项目活跃度对比

> 说明：Issue/PR 数为过去 24 小时更新量；Release 统一按“今日无新版本”处理。  
> 健康度为综合判断：活跃度、问题收敛能力、风险集中度。

| 项目 | Issues 数 | PR 数 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **Hermes Agent** | 50 | 50 | 无 | **高活跃，高压力，积压风险上升** |
| **OpenClaw** | 35 | 47 | 无 | **高活跃，质量收敛中，整体积极** |
| **CoPaw** | 15 | 8 | 无 | **高反馈，高修复，核心链路偏紧张** |
| **ZeroClaw** | 7 | 13 | 无 | **活跃度高，兼容性风险需优先处理** |
| **IronClaw** | 8 | 11 | 无 | **高活跃，CI/重构并行，稳定性整治中** |
| **NanoClaw** | 2 | 7 | 无 | **中高活跃，修复主导，状态良好** |
| **NanoBot** | 3 | 4 | 无 | **中等活跃，补丁窗口，稳定修复为主** |
| **PicoClaw** | 2 | 1 | 无 | **低到中等活跃，偏工程补强** |
| **NullClaw** | 0 | 0 | 无 | **无活动** |
| **LobsterAI** | 0 | 0 | 无 | **无活动** |
| **TinyClaw** | 0 | 0 | 无 | **无活动** |
| **Moltis** | 0 | 0 | 无 | **无活动** |
| **ZeptoClaw** | 0 | 0 | 无 | **无活动** |

### 活跃度分层
- **头部高活跃**：Hermes Agent、OpenClaw
- **中高活跃、问题导向**：CoPaw、ZeroClaw、IronClaw、NanoClaw
- **中等活跃、修复窗口**：NanoBot、PicoClaw
- **低活动/无活动**：NullClaw、LobsterAI、TinyClaw、Moltis、ZeptoClaw

---

## 3) OpenClaw 在生态中的定位

### 定位判断
OpenClaw 是当前生态里最典型的**“全栈型 AI 助手底座项目”**之一：既覆盖 gateway/session/auth/plugin/skills/config，又在持续处理性能、稳定性、测试、边界收敛问题。  
它不是单一集成器，也不是纯 UI 工具，而更像一个**面向生产的个人 AI 助手平台内核**。

### 与同类相比的优势
1. **问题闭环速度快**
   - 今日更新 35 个 Issue、47 个 PR，且有 16 个 Issue 关闭、14 个 PR 合并/关闭。
   - 说明它的“发现问题 → 修复 → 收口”链条效率很高。

2. **核心路径覆盖面广**
   - 今日修复覆盖启动性能、技能管理、配置默认值、会话边界、重试调度、heartbeat 复杂度等。
   - 这说明 OpenClaw 不是在修边角，而是在修产品主干。

3. **维护方向清晰**
   - 当前重点是：**启动速度、会话稳定性、配置一致性、插件边界收敛**。
   - 这是成熟平台化项目的典型特征。

### 技术路线差异
与同类项目相比，OpenClaw 的路线更偏：
- **平台底座化**
- **gateway/session/config 的统一治理**
- **插件与技能体系收口**
- **性能与边界一致性优先**

它不像 NanoBot 那样更聚焦某个聊天入口，也不像 CoPaw 那样更强调 tool-call / session 执行语义，更不像 ZeroClaw 那样突出多渠道接入和恢复工作流。  
OpenClaw 更像是**“中枢型 AI 助手基础设施”**。

### 社区规模对比
从今日更新量看：
- **Hermes Agent** 最活跃（100 次更新）
- **OpenClaw** 紧随其后（82 次更新）
- 其后是 **CoPaw**（23）、**ZeroClaw**（20）、**IronClaw**（19）

这说明 OpenClaw 已经处在**第一梯队**，社区规模和维护压力都很大；但和 Hermes 相比，OpenClaw 的 issue/PR 收敛感更强，说明其治理节奏相对更稳。

---

## 4) 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **会话/状态持久化与恢复** | OpenClaw、Hermes Agent、CoPaw、ZeroClaw、NanoBot | 避免 session 丢失、恢复失败、压缩后消息错配、重启后状态断裂 |
| **工具调用 / 消息配对正确性** | CoPaw、ZeroClaw、NanoClaw、OpenClaw | tool_call/tool_result 必须成对，避免孤儿消息、重复回复、执行错误 |
| **provider / 模型兼容性** | OpenClaw、PicoClaw、ZeroClaw、Hermes Agent、NanoBot | 模型默认值、路由、自动发现、API 协议兼容要一致可预期 |
| **多渠道接入与统一路由** | Hermes Agent、ZeroClaw、NanoClaw、NanoBot、OpenClaw | Telegram/Slack/Discord/WhatsApp/Feishu/Lark 等入口需要稳定统一 |
| **可控性与治理边界** | OpenClaw、CoPaw、NanoClaw、NanoBot | 自动行为要可关闭、可审计、可阻断，权限边界不能漂移 |
| **CI / flaky / hermetic 稳定性** | Hermes Agent、OpenClaw、IronClaw | 测试不稳定、环境污染、并发抖动是当前普遍痛点 |
| **启动/冷启动优化** | OpenClaw、ZeroClaw、Hermes Agent | 启动后尽快可用，减少预热、动画、无谓加载的冷启动惩罚 |

### 共同诉求的核心结论
生态正在集中解决三件事：
1. **消息/工具链必须绝对正确**
2. **状态必须可持久、可恢复**
3. **多模型、多渠道、多平台必须一致**

---

## 5) 差异化定位分析

### OpenClaw
- **功能侧重**：gateway、session、skills、config、plugin 边界、性能优化
- **目标用户**：需要稳定底座的个人 AI 助手用户、平台维护者、生产化部署团队
- **技术架构关键词**：平台中枢、配置治理、会话边界、插件收敛

### Hermes Agent
- **功能侧重**：多渠道编排、桌面端、TUI、dashboard、Slack/Telegram/Matrix
- **目标用户**：重度自动化用户、跨平台工作流用户
- **架构关键词**：多入口编排、运行时重构、状态恢复、CI 治理  
- **差异点**：更像“统一工作流编排层”，而不是单一助手底座

### CoPaw
- **功能侧重**：tool_call/tool_result 正确性、上下文压缩、会话兼容、session model overrides
- **目标用户**：长会话、多工具链、强调执行一致性的用户
- **架构关键词**：消息协议、上下文管理、工具执行稳定性  
- **差异点**：更聚焦“对话执行语义正确”，是最典型的 agent 执行层项目之一

### ZeroClaw
- **功能侧重**：OpenAI 兼容层、多渠道接入、ZeroCode 恢复/分叉、可观测性
- **目标用户**：需要多接入形态、强调恢复能力的团队
- **架构关键词**：兼容层、渠道适配、workflow recovery、operator UX  
- **差异点**：更强调“接入 + 恢复 + 运维体验”

### IronClaw
- **功能侧重**：extension-runtime 分阶段重构、CI hardening、Slack delivery
- **目标用户**：工程化要求高、偏平台构建的团队
- **架构关键词**：重构、确定性、测试隔离、交付协调  
- **差异点**：更像“基础设施重构型项目”

### NanoClaw
- **功能侧重**：消息通道、审批、模板、定时任务、WhatsApp 接入
- **目标用户**：实际业务工作流用户
- **架构关键词**：消息可靠性、自动化编排、容器部署  
- **差异点**：偏“可运营的消息型 agent”

### NanoBot
- **功能侧重**：Discord、Dream 会话管理、heartbeat、transcription
- **目标用户**：以单一社交入口为主的轻量用户
- **架构关键词**：集成修复、配置兼容、工作流稳定  
- **差异点**：更偏具体场景型 assistant

### PicoClaw
- **功能侧重**：provider 路由、Anthropic 观测、ARMhf 部署
- **目标用户**：边缘设备/轻量部署用户
- **架构关键词**：provider 兼容、可观测性、多架构部署  
- **差异点**：工程体量较小，但部署面很实用

### 无活动项目（NullClaw/LobsterAI/TinyClaw/Moltis/ZeptoClaw）
- 当前没有足够信号判断技术路线与用户群体，更适合列入观察名单。

---

## 6) 社区热度与成熟度

### 快速迭代阶段
这类项目的特征是：Issue/PR 更新多，且大量集中在核心路径修复。
- **Hermes Agent**：高频更新，但 Issues 未关闭，说明压力很大
- **OpenClaw**：高频更新，同时有较强闭环能力，属于“快速迭代 + 主动收敛”
- **CoPaw**：集中爆发在 v2.0.0 回归修复，典型修复窗口
- **ZeroClaw**：多方向并进，兼容性和恢复能力都在推进
- **IronClaw**：高活跃重构期，质量治理浓度高
- **NanoClaw**：修复导向明显，活跃但更偏收口

### 质量巩固阶段
这类项目的特征是：更关注修复一致性、兼容性、可恢复性、CI 稳定性。
- **OpenClaw**：已经非常明显地进入质量收敛阶段
- **IronClaw**：CI 与测试治理说明其在做基础质量巩固
- **ZeroClaw**：围绕兼容层和恢复能力的修补，属于巩固期
- **CoPaw**：围绕工具链正确性与老版本兼容，明显是巩固期
- **NanoBot**：更像修补窗口，成熟度中等

### 低活动/待观察阶段
- **NullClaw、LobsterAI、TinyClaw、Moltis、ZeptoClaw**
- 今日无活动，难以判断成熟度，只能视为低信号项目

---

## 7) 值得关注的趋势信号

### 1. “AI 助手”正在变成“状态机产品”
大量项目都在处理 session、recovery、rewind、fork、state.db、压缩后配对问题。  
这说明未来的竞争重点不再只是模型能力，而是**状态管理能力**。

### 2. “工具调用正确性”比“模型聪明”更重要
CoPaw、ZeroClaw、NanoClaw 都在修 tool/message 语义问题。  
对开发者的启发是：**agent 系统的第一性原理，是消息协议和执行边界正确，而不是 prompt 更长。**

### 3. 多渠道不是加法，而是统一编排问题
Telegram、Slack、Discord、Feishu、WhatsApp、Matrix、Lark 都在进入同一类项目。  
这意味着多渠道接入的核心不是“多写几个 adapter”，而是：
- 统一会话模型
- 统一状态恢复
- 统一权限与治理策略

### 4. 可观测性和可诊断性变成标配需求
PicoClaw 的 Anthropic token cache、IronClaw 的 doctor/CI、OpenClaw 的启动优化、ZeroClaw 的 dashboard context，都说明用户已经不满足于“能跑”，而是要求**能看见、能定位、能回放**。

### 5. 自动化必须可控
OpenClaw、CoPaw、NanoClaw、ZeroClaw 都体现出类似诉求：  
自动化可以做，但必须支持 **关闭、审计、阻断、回退**。  
这对后续 agent 开发者非常关键：**默认开放会越来越不可接受。**

### 6. 兼容性治理成为开源 agent 的主战场
OpenAI-compatible、Anthropic、llama.cpp、Ollama、ARMhf、Docker、locale/config-dir 等问题频繁出现。  
说明生态已从“单模型 demo”进入“多 provider / 多环境真实部署”阶段。

---

## 简要结论

- **OpenClaw** 是当前生态里的头部平台型项目之一，强在全栈治理、修复闭环和质量收敛。
- **Hermes Agent** 活跃度最高，但当前积压和恢复类问题也最多。
- **CoPaw / ZeroClaw / IronClaw** 代表了三种不同的成熟化方向：执行语义、恢复编排、工程化重构。
- 整个生态的共同关键词已经非常明确：**状态、兼容、可恢复、可观测、可控**。

如果你愿意，我可以把这份报告进一步整理成：
1. **一页纸决策摘要版**
2. **适合飞书/Notion 的表格版**
3. **带“投资/跟踪优先级”的分析版**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-07-13）

## 1. 今日速览
过去 24 小时，NanoBot 处于**中等活跃、以修复为主**的状态：Issues 新增/活跃 3 条，PR 更新 4 条，说明社区仍在持续反馈真实使用问题，维护节奏没有放缓。  
今天没有新版本发布，整体更像是一个**补丁与稳定性修复窗口**，而非功能集中上线期。  
从内容看，问题主要集中在 **Discord 集成、Dream 会话管理、心跳任务执行、转录配置** 等核心能力，反映出项目正在处理较多“实际落地场景”中的边界问题。  
当前健康度判断：**功能推进正常，但稳定性与可配置性相关的 Bug 仍是主要压力点**。  
相关总览：  
- Issues：<https://github.com/HKUDS/nanobot/issues>  
- PRs：<https://github.com/HKUDS/nanobot/pulls>

---

## 2. 版本发布
**今日无新版本发布。**  
- Releases：<https://github.com/HKUDS/nanobot/releases>

---

## 3. 项目进展
今日共有 **4 条 PR 更新**，其中 **2 条已合并/关闭，2 条仍待处理**，项目在以下方向上有实质推进：

### 已合并/关闭的重要 PR
1. **#4892 `fix(webui): allow remote workspace access reduction`**  
   重点是收紧 WebUI 远程会话的权限下调逻辑，避免远程访问下权限控制与工作区状态出现不一致。  
   这类改动偏安全与权限边界修正，属于高优先级稳定性增强。  
   链接：<https://github.com/HKUDS/nanobot/pull/4892>

2. **#4898 `merge`**  
   当前展示信息较少，但已处于 CLOSED 状态，说明有一项变更已完成合入。  
   虽然无法从现有数据判断具体内容，但它代表着一次常规集成推进。  
   链接：<https://github.com/HKUDS/nanobot/pull/4898>

### 待合并的重要 PR
- **#4896 `fix(heartbeat): rewrite prompt to execute tasks instead of reporting`**  
  针对 heartbeat 从“review + execute”演化到单阶段 cron 后，提示词未同步的问题进行修复。  
  这类 PR 对自动执行链路影响较大，若合并，可减少 agent “只汇报不执行” 的行为偏差。  
  链接：<https://github.com/HKUDS/nanobot/pull/4896>

- **#4895 `fix(transcription): resolve API key env placeholders`**  
  聚焦转录 provider 的 API Key 环境变量占位符解析，属于配置可用性修复。  
  这对部署灵活性较重要，尤其对使用 `${ENV_VAR}` 方式配置的用户很关键。  
  链接：<https://github.com/HKUDS/nanobot/pull/4895>

### 今日项目向前迈进的幅度
- **安全/权限边界**：已有实质修正落地（#4892）  
- **自动任务执行链路**：正在修复提示词与执行逻辑偏差（#4896）  
- **转录配置兼容性**：环境变量解析问题得到针对性修复（#4895）  
整体来看，项目今天的推进重点是**让现有功能更可靠、更可部署**，而不是增加大规模新功能。

---

## 4. 社区热点
从今天数据看，**没有高评论或高反应的“爆点”讨论**：  
- 所有新增 Issue 的评论数均为 0  
- PR 的评论字段未提供有效值，暂无法判断互动热度

因此，今日社区热点更多体现在**问题类型集中**而非“讨论热烈”：

### 主要聚焦点
1. **Discord 集成异常**
   - Issue：#4897  
   - 链接：<https://github.com/HKUDS/nanobot/issues/4897>  
   - 用户诉求：Bot 在线但无法收到/发送消息，属于典型“看起来正常、实际不可用”的集成故障。  
   - 背后含义：用户已完成基本配置，但消息链路或权限/事件订阅仍存在问题。

2. **Dream 会话管理与日志一致性**
   - Issues：#4894、#4893  
   - 链接：  
     - <https://github.com/HKUDS/nanobot/issues/4894>  
     - <https://github.com/HKUDS/nanobot/issues/4893>  
   - 用户诉求：会话清理与日志展示要与新存储格式、真实 Dream 记录保持一致。  
   - 背后含义：用户已经在生产/日常使用 Dream 工作流，开始暴露“历史兼容 + 查询过滤”的边界问题。

3. **自动执行任务与转录配置**
   - PR：#4896、#4895  
   - 链接：  
     - <https://github.com/HKUDS/nanobot/pull/4896>  
     - <https://github.com/HKUDS/nanobot/pull/4895>  
   - 背后含义：社区在推动项目向更自动化、更多 provider 适配的方向发展。

总体判断：今天没有“舆情热点”，但有一组很清晰的**功能落地痛点聚类**。

---

## 5. Bug 与稳定性
按严重程度和影响面排序，今日主要 Bug 如下：

### 1) 高优先级：心跳任务执行语义偏差
- PR 修复：#4896  
- 链接：<https://github.com/HKUDS/nanobot/pull/4896>  
- 问题描述：heartbeat 改为 cron 后，prompt 仍沿用旧的“两阶段模式”，导致 agent 倾向于“报告而非执行”。  
- 风险：会直接影响自动任务是否真正落地，属于**功能性回归**。  
- 当前状态：已有 fix PR，待合并。

### 2) 高优先级：WebUI 远程 workspace 权限收缩问题
- PR 修复：#4892  
- 链接：<https://github.com/HKUDS/nanobot/pull/4892>  
- 问题描述：远程会话在权限降级/工作区边界上存在安全风险或状态不一致。  
- 风险：涉及访问控制与安全边界，优先级高。  
- 当前状态：已关闭/已合入。

### 3) 中优先级：Discord 集成消息链路异常
- Issue：#4897  
- 链接：<https://github.com/HKUDS/nanobot/issues/4897>  
- 问题描述：Discord bot 在线，但无法正常收发消息。  
- 风险：影响主流外部集成体验，属于典型可用性问题。  
- 当前状态：尚未看到对应 fix PR。

### 4) 中优先级：Dream 会话清理与日志展示兼容性问题
- Issues：#4894、#4893  
- 链接：  
  - <https://github.com/HKUDS/nanobot/issues/4894>  
  - <https://github.com/HKUDS/nanobot/issues/4893>  
- 问题描述：base64 编码文件名未被正确清理；日志/恢复接口展示了非 Dream commits。  
- 风险：影响数据治理与用户理解，可能导致错误操作或信息噪音。  
- 当前状态：未看到明确 fix PR。

### 5) 中低优先级：转录 provider API key 占位符解析
- PR 修复：#4895  
- 链接：<https://github.com/HKUDS/nanobot/pull/4895>  
- 问题描述：`${ENV_VAR}` 的解析逻辑影响 provider 选择与 fallback 行为。  
- 风险：主要影响部署配置可用性。  
- 当前状态：已有 fix PR。

---

## 6. 功能请求与路线图信号
今天没有明显的新功能型 Issue，但从 PR 方向可以看出下一阶段路线图信号：

### 可能进入下一版本的方向
1. **自动任务执行链路继续强化**
   - PR：#4896  
   - 链接：<https://github.com/HKUDS/nanobot/pull/4896>  
   - 信号：项目正在修正 heartbeat 的执行语义，说明“自动化 agent 真正动手做事”仍是核心演进方向。

2. **多 provider / 部署兼容性提升**
   - PR：#4895  
   - 链接：<https://github.com/HKUDS/nanobot/pull/4895>  
   - 信号：对环境变量占位符、缺省配置的处理更细化，说明项目在向更复杂的部署环境扩展。

3. **权限与安全边界收紧**
   - PR：#4892  
   - 链接：<https://github.com/HKUDS/nanobot/pull/4892>  
   - 信号：WebUI/远程 workspace 权限控制正在变得更严格，安全与可控性可能成为后续重点。

### 当前未见但值得关注的需求
- Discord 集成修复（#4897）若后续出现 PR，可能会成为下一轮版本的用户侧重点。  
- Dream 日志/清理修复（#4894、#4893）若统一处理，可能形成一组“Dream 工作流稳定性”补丁包。  

---

## 7. 用户反馈摘要
从 Issues 描述中可以提炼出几类真实用户痛点：

### 1) “功能看起来在线，但实际不可用”
- 代表 Issue：#4897  
- 链接：<https://github.com/HKUDS/nanobot/issues/4897>  
- 用户场景：已完成 Discord bot 配置，状态显示在线，但消息交互失败。  
- 反馈重点：用户最在意的是“集成链路是否真的通”，而不是单纯的服务在线状态。

### 2) “历史格式变更后，维护工具跟不上”
- 代表 Issue：#4894  
- 链接：<https://github.com/HKUDS/nanobot/issues/4894>  
- 用户场景：Dream session 文件从旧命名迁移到 base64 编码后，清理逻辑失效。  
- 反馈重点：用户接受数据格式变化，但希望配套维护任务能同步更新。

### 3) “日志输出要有过滤和语义边界”
- 代表 Issue：#4893  
- 链接：<https://github.com/HKUDS/nanobot/issues/4893>  
- 用户场景：查看 Dream 记录时混入了非 Dream commits，干扰理解。  
- 反馈重点：用户希望工具展示“与当前任务严格相关”的内容，减少噪音。

### 4) “配置要直观、兼容多种环境变量写法”
- 代表 PR：#4895  
- 链接：<https://github.com/HKUDS/nanobot/pull/4895>  
- 用户场景：通过 `${ENV_VAR}` 管理 API key。  
- 反馈重点：用户需要的是“可预期的配置行为”，而不是隐式 fallback 带来的不确定性。

总体上，用户对 NanoBot 的期待很清晰：**稳定集成、配置可控、日志干净、自动任务真正执行**。

---

## 8. 待处理积压
以下为今日值得维护者优先关注的未关闭项：

### 高优先级未解决 Issue
1. **#4897 Discord bot integration 问题**
   - 链接：<https://github.com/HKUDS/nanobot/issues/4897>  
   - 原因：影响核心外部集成，且用户已完成基础配置仍失败，容易造成“产品不可用”感知。

2. **#4894 Dream session 清理失效**
   - 链接：<https://github.com/HKUDS/nanobot/issues/4894>  
   - 原因：属于迁移后遗留问题，若不处理会积累无效文件与维护负担。

3. **#4893 Dream log/restore 过滤错误**
   - 链接：<https://github.com/HKUDS/nanobot/issues/4893>  
   - 原因：影响用户对 Dream 任务历史的判断，容易带来误操作。

### 未合并但较关键的 PR
1. **#4896 heartbeat prompt 修复**
   - 链接：<https://github.com/HKUDS/nanobot/pull/4896>  
   - 原因：涉及自动执行链路，建议尽快评估合并。

2. **#4895 transcription 配置修复**
   - 链接：<https://github.com/HKUDS/nanobot/pull/4895>  
   - 原因：提升部署兼容性，适合尽快纳入稳定修复集。

---

## 总体结论
今天的 NanoBot 处于**“稳定性修复优先、功能演进持续推进”**的阶段。  
已合入的安全/权限修复表明项目在增强控制边界；未解决的 Discord、Dream、heartbeat 等问题则说明核心使用路径仍有若干关键体验点需要打磨。  
若后续能尽快处理 #4896、#4897、#4894、#4893，项目的可用性与用户信任度会有明显提升。

如需，我可以继续把这份日报整理成：
- **适合公众号/内部周报的精简版**
- **表格版（便于直接贴到 Notion/飞书）**
- **英文版日报**

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-07-13）

## 1. 今日速览
过去 24 小时，Hermes Agent 维持了**高强度、高并发**的开发与反馈节奏：Issues 更新 50 条、PR 更新 50 条，但 Issues **没有关闭**，说明社区反馈进入量高、消化速度偏慢。PR 侧已有 **7 条合并/关闭**，主要集中在编排、Telegram、文档和桌面端修复，项目仍在持续修补生产可用性。  
当前的讨论重心明显偏向**稳定性、会话持久化、跨平台兼容和网关恢复能力**，而不是纯功能扩张。整体来看，项目处于“活跃迭代期”，健康度偏积极，但**回归和积压风险同步上升**。  
GitHub：<https://github.com/nousresearch/hermes-agent>

---

## 3. 项目进展
今日可见的已合并/关闭 PR 主要在“稳定性修复 + 文档补齐 + 编排纠偏”三条线上推进：

- **#63462** [docs(plugins): document transform_* hooks in plugin hooks table](https://github.com/nousresearch/hermes-agent/pull/63462)  
  已关闭，补齐插件 Hooks 文档，降低扩展能力的认知门槛，也减少“功能已实现但文档缺失”的支持成本。

- **#63460** [fix(kanban): gate blocker_auth on run outcome, not raw error regex](https://github.com/nousresearch/hermes-agent/pull/63460)  
  已关闭，修正 Kanban respawn/阻塞判定逻辑，减少把“表面 auth 报错”误判为认证问题的风险。

- **#63475** [fix(desktop): prevent node-pty asar helper path corruption](https://github.com/nousresearch/hermes-agent/pull/63475)  
  已关闭，修复桌面端 terminal 启动路径腐化问题，直接影响桌面终端可用性。

- **#63479** [feat(telegram): add task status control primitives](https://github.com/nousresearch/hermes-agent/pull/63479)  
  已关闭，为 Telegram 场景增加任务状态控制原语，增强机器人侧状态驱动能力。

- 另外，多个**高质量待合并修复**已经进入队列，例如：  
  - [#63471](https://github.com/nousresearch/hermes-agent/pull/63471) 修复 Kanban `max_spawn` + `max_in_progress` 双重计数  
  - [#63468](https://github.com/nousresearch/hermes-agent/pull/63468) 传播 `clear_interrupt` 到子代理  
  - [#63480](https://github.com/nousresearch/hermes-agent/pull/63480) 拒绝陈旧 board websocket 订阅  
  - [#63473](https://github.com/nousresearch/hermes-agent/pull/63473) 修正 dashboard per-profile platform status 读取来源  

**阶段性判断**：今日的 PR 产出说明项目仍在向“生产级稳定”前进，但方向更偏向**修复现有系统性缺陷**，而非大规模新增能力。

---

## 4. 社区热点
今日最活跃的讨论几乎都集中在**基础稳定性 bug**，且评论数最高的 issue 只有 3 条，说明讨论很技术化、很具体，但没有出现大规模传播式热点。重点如下：

- **[#63395](https://github.com/nousresearch/hermes-agent/issues/63395)**  
  Matrix 端 E2EE 房间 cron 投递成功后，出现 `RuntimeError: database pool has been stopped` 并断连。  
  诉求：网关生命周期要能正确处理“消息已送达后的后续清理”，否则加密房间投递会引发连锁故障。

- **[#63361](https://github.com/nousresearch/hermes-agent/issues/63361)**  
  Daytona persistent sandbox 仅按名称恢复，不比较镜像；cleanup 也缺少 `force_remove`。  
  诉求：希望 sandbox 的重建/清理语义更可靠，避免“看似复用，实则环境漂移”。

- **[#63309](https://github.com/nousresearch/hermes-agent/issues/63309)**  
  Telegram gateway 在 `Connecting to Telegram (attempt 1/8)` 卡死，升级后无法恢复。  
  诉求：连接初始化与超时控制必须真正生效，不能只在表层有 retry，底层卡住时要能退出/重试。

- **[#63469](https://github.com/nousresearch/hermes-agent/issues/63469)**  
  orchestrator 信任了过期 memory，覆盖 canonical policy，导致多 profile 路由混乱。  
  诉求：多配置源下需要“权威状态优先”，不能让持久记忆污染运行时策略。

补充观察：这些热点 issue 的**reaction 全部为 0**，说明当前社区反馈更多来自“实际遇到问题的用户”，不是情绪型讨论，而是产品可用性压力在集中显现。

---

## 5. Bug 与稳定性
以下按严重程度与影响面排序，优先列出最值得关注的问题，并标注是否已有对应 fix PR。

### P1 / 高风险
- **[#63425](https://github.com/nousresearch/hermes-agent/issues/63425)**  
  Provider auto-detection 会丢弃 credential pools，导致 failover 失效。  
  影响：认证池、容灾切换、供应商回退全部受损。  
  **Fix PR：暂未看到明确对应 PR。**

### P2 / 生产可用性问题
- **[#63395](https://github.com/nousresearch/hermes-agent/issues/63395)**  
  Matrix cron delivery 到 E2EE 房间后触发数据库池停止、日志洪泛和断连。  
  影响：网关生命周期与加密消息发送存在耦合缺陷。  
  **Fix PR：暂未看到。**

- **[#63309](https://github.com/nousresearch/hermes-agent/issues/63309)**  
  Telegram gateway 启动卡死在连接阶段。  
  影响：聊天入口不可用。  
  **Fix PR：暂未看到。**

- **[#63474](https://github.com/nousresearch/hermes-agent/issues/63474)**  
  Dashboard Chat tab 会话不落盘到 `state.db`，重启即丢。  
  影响：严重的数据持久化缺陷。  
  **Fix PR：暂未看到。**

- **[#63472](https://github.com/nousresearch/hermes-agent/issues/63472)**  
  Desktop 对 llama.cpp /v1/models 自动发现误判“无模型”，CLI 却正常。  
  影响：桌面端与 CLI 行为不一致。  
  **Fix PR：暂未看到。**

- **[#63361](https://github.com/nousresearch/hermes-agent/issues/63361)**  
  Daytona persistent sandbox 重用/清理语义不安全。  
  影响：环境隔离和重建可信度下降。  
  **Fix PR：暂未看到。**

- **[#63386](https://github.com/nousresearch/hermes-agent/issues/63386)**  
  macOS 上 `state.db` FTS 索引损坏。  
  影响：会话检索、handoff 状态、gateway peer 搜索受影响。  
  **Fix PR：暂未看到。**

- **[#63434](https://github.com/nousresearch/hermes-agent/issues/63434)**  
  TUI 在 gateway 重启后恢复卡住。  
  影响：恢复路径不完整。  
  **Fix PR：暂未看到。**

- **[#63428](https://github.com/nousresearch/hermes-agent/issues/63428)**  
  Computer Use 在 reconnect 后出现 `0x0` capture 成功假象。  
  影响：远程控制/自动化工作流会“表面健康、实际失效”。  
  **Fix PR：暂未看到。**

### P3 / 体验与局部功能缺陷
- **[#63466](https://github.com/nousresearch/hermes-agent/issues/63466)**  
  Kanban dispatcher 在 `max_spawn` 与 `max_in_progress` 同时设置时双重计数。  
  **已有修复 PR：[#63471](https://github.com/nousresearch/hermes-agent/pull/63471)**

- **[#63463](https://github.com/nousresearch/hermes-agent/issues/63463)**  
  sub agent waves 期间 slash commands 异常。  
  **已有修复 PR：[#63468](https://github.com/nousresearch/hermes-agent/pull/63468)**

- **[#63370](https://github.com/nousresearch/hermes-agent/issues/63370)**  
  Windows 10 Desktop 输入框错位。  
  **Fix PR：未见。**

- **[#63411](https://github.com/nousresearch/hermes-agent/issues/63411)**  
  Desktop lint 由于 import-order 报错失败。  
  **Fix PR：未见。**

总体上，今天的稳定性问题呈现出一个明显特征：**会话/状态/恢复链路是最脆弱的区域**，比单纯 UI 或文档问题更值得优先处理。

---

## 6. 功能请求与路线图信号
从今天的 Issue 和 PR 看，下一阶段的需求信号主要集中在以下几类：

- **更清晰的任务生命周期管理**  
  - [#63405](https://github.com/nousresearch/hermes-agent/issues/63405)：新增 cancelled / superseded Kanban terminal states  
  说明用户已经开始要求“任务状态机”能表达废弃、替代、终止等语义，而不是只靠 todo/blocked/completed。

- **模型路由必须可控、可预测**  
  - [#63353](https://github.com/nousresearch/hermes-agent/issues/63353)：MoA 应严格 opt-in，且始终尊重用户显式选择的模型  
  - [#63461](https://github.com/nousresearch/hermes-agent/pull/63461)：为 `delegate_task` 增加 per-call model/provider override  
  这类需求说明用户在意的不只是“能不能跑”，还包括**是否绕过用户选择**。

- **工具调用链需要可插拔安全边界**  
  - [#63476](https://github.com/nousresearch/hermes-agent/pull/63476)：pre-dispatch hook system for tool calls  
  表明社区对“工具执行前置审查/拦截”有强需求，适合后续做安全/企业场景扩展。

- **Telegram 场景正在从“能用”走向“可运营”**  
  - [#63488](https://github.com/nousresearch/hermes-agent/pull/63488)：topic-aware routing 和 restart safety  
  说明用户希望 Telegram 不只是接入通道，而是可做多 topic、多会话、多路由的生产入口。

**判断**：如果下一版本继续沿当前节奏推进，最可能纳入的是这类“高价值、低争议、测试明确”的功能/修复：  
[#63471](https://github.com/nousresearch/hermes-agent/pull/63471)、[#63468](https://github.com/nousresearch/hermes-agent/pull/63468)、[#63480](https://github.com/nousresearch/hermes-agent/pull/63480)、[#63473](https://github.com/nousresearch/hermes-agent/pull/63473)、[#63484](https://github.com/nousresearch/hermes-agent/pull/63484)。

---

## 7. 用户反馈摘要
从今天的评论和问题描述里，可以提炼出几类非常真实的用户痛点：

1. **“别丢状态”是第一诉求**  
   用户反复提到 session、state.db、gateway recovery、board websocket、sandbox resume 等问题，说明 Hermes 正在被用于**长会话、长任务、跨重启**场景。  
   代表问题：[#63474](https://github.com/nousresearch/hermes-agent/issues/63474)、[#63434](https://github.com/nousresearch/hermes-agent/issues/63434)、[#63386](https://github.com/nousresearch/hermes-agent/issues/63386)

2. **跨平台一致性压力很大**  
   Windows、macOS、Linux、Ollama、llama.cpp、Telegram、Matrix、Desktop/TUI/dashboard 全都在报问题。  
   这说明 Hermes 已经被当成“统一入口层”使用，而不是单一 CLI 工具。  
   代表问题：[#63370](https://github.com/nousresearch/hermes-agent/issues/63370)、[#63472](https://github.com/nousresearch/hermes-agent/issues/63472)、[#63309](https://github.com/nousresearch/hermes-agent/issues/63309)

3. **模型/工具可用性必须稳定可解释**  
   用户会明显感知“工具列表丢失”“模型识别失败”“路由被记忆污染”等行为。  
   代表问题：[#63392](https://github.com/nousresearch/hermes-agent/issues/63392)、[#63425](https://github.com/nousresearch/hermes-agent/issues/63425)、[#63469](https://github.com/nousresearch/hermes-agent/issues/63469)

4. **高级自动化正在进入真实生产流程**  
   Kanban、delegate_task、Computer Use、topic-aware Telegram routing 都表明用户已不仅仅是“聊天”，而是把 Hermes 放进任务编排和代理工作流里。  
   代表问题/PR：[#63405](https://github.com/nousresearch/hermes-agent/issues/63405)、[#63461](https://github.com/nousresearch/hermes-agent/pull/63461)、[#63476](https://github.com/nousresearch/hermes-agent/pull/63476)

---

## 8. 待处理积压
由于本次数据没有“长期未更新天数”字段，严格意义上的“长期沉默项”无法直接确认。就当前样本而言，更准确地说是：**高优先级但尚未见明确维护者回应/配套 fix PR 的积压**。

建议优先关注以下事项：

- **[#63425](https://github.com/nousresearch/hermes-agent/issues/63425)** P1：provider auto-detection 破坏 credential pool/failover
- **[#63395](https://github.com/nousresearch/hermes-agent/issues/63395)** P2：Matrix E2EE cron delivery 后网关失稳
- **[#63309](https://github.com/nousresearch/hermes-agent/issues/63309)** P2：Telegram 连接阶段卡死
- **[#63474](https://github.com/nousresearch/hermes-agent/issues/63474)** P2：dashboard 会话不落盘
- **[#63472](https://github.com/nousresearch/hermes-agent/issues/63472)** P2：Desktop /v1/models 误判无模型
- **[#63386](https://github.com/nousresearch/hermes-agent/issues/63386)** P2：macOS state.db FTS 索引损坏

如果维护者要做“最小代价、最大收益”的排期，建议把资源优先放在：
1. **状态持久化/恢复链路**
2. **认证与 provider 自动发现**
3. **Telegram/Matrix 网关稳定性**
4. **桌面端模型发现与终端输出一致性**

---

如果你愿意，我还可以把这份日报进一步整理成：
- **适合发到团队周报/日报群的精简版**
- **面向维护者的优先级排序版**
- **中英双语版本**

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

以下为 **2026-07-13 PicoClaw（sipeed/picoclaw）项目动态日报**。  
总体来看，过去 24 小时项目处于 **低到中等活跃** 状态：有 **2 条 Issue 更新、1 条 PR 更新、0 个新版本**。社区讨论本身不算热，但问题与需求覆盖了 **模型路由正确性、Anthropic 计费/缓存可观测性、以及 ARMhf 部署兼容性**，说明项目当前的关注点仍集中在“可用性”和“部署面”两条主线上。  
仓库链接：<https://github.com/sipeed/picoclaw>

---

## 1. 今日速览
- 今日没有新版本发布，说明项目仍处于日常迭代和问题收敛阶段，暂未进入正式交付节奏。  
- 过去 24 小时内出现了 1 条开放 PR 和 1 条新 Bug 报告，表明开发与用户反馈仍在持续流入。  
- 关闭了 1 条功能请求 Issue，反映维护者对需求有一定响应和取舍。  
- 但所有条目评论数和点赞数均为 0，说明社区讨论热度偏低，当前更像是“问题提交驱动”的维护节奏，而不是“多人围绕某个话题持续讨论”的高互动状态。  
相关链接：  
- 仓库主页：<https://github.com/sipeed/picoclaw>  
- Issue #3252：<https://github.com/sipeed/picoclaw/issues/3252>  
- Issue #3250：<https://github.com/sipeed/picoclaw/issues/3250>  
- PR #3251：<https://github.com/sipeed/picoclaw/pull/3251>

---

## 2. 版本发布
- **今日无新版本发布。**  
- 当前没有可分析的 release 说明、破坏性变更或迁移注意事项。  
仓库发布页：<https://github.com/sipeed/picoclaw/releases>

---

## 3. 项目进展
### 今日合并/关闭的重要 PR
- **今日没有已合并或已关闭的重要 PR。**  
- 当前唯一可见 PR 为开放状态，说明项目的代码层推进仍在审阅/等待阶段。  
PR 链接：  
- PR #3251：<https://github.com/sipeed/picoclaw/pull/3251>

### 进展解读
- 从内容看，当前的“前进”主要体现在 **补齐可观测性** 和 **修复模型解析边界问题** 的准备工作上，而不是面向用户的大版本交付。  
- 若 PR #3251 后续合并，将增强 Anthropic 相关调用的 token cache 统计能力，对运营侧排查缓存命中、成本分析和性能优化都有直接价值。  
- 由于没有合并/关闭的 PR，项目在代码交付上的实质推进幅度有限，但问题与需求已比较聚焦。  

---

## 4. 社区热点
> 说明：本日报中所有 Issue/PR 的评论数与反应数均为 0，因此严格意义上的“热议话题”并不存在；以下按“今日最受关注/最能代表社区诉求”的条目列出。

### 4.1 Bug：`splitKnownProviderModel` 误剥离 provider 前缀
- Issue #3252：<https://github.com/sipeed/picoclaw/issues/3252>  
- 关键词：模型路由、provider alias、前缀解析、潜在错误分发  
- 社区诉求分析：  
  这个问题直指 **模型 ID 解析逻辑**，属于基础能力正确性问题。一旦 provider 前缀处理错误，可能导致模型被错误路由到不对应的 provider，进而出现调用失败、计费异常或配置不生效。  
  这类问题通常优先级较高，因为它影响的是“能不能正确工作”，而不是“体验好不好”。

### 4.2 功能/可观测性 PR：Anthropic prompt cache token usage
- PR #3251：<https://github.com/sipeed/picoclaw/pull/3251>  
- 关键词：Anthropic、prompt cache、token 统计、运营可观测性  
- 社区诉求分析：  
  该 PR 的目标是补足 **缓存相关 token 用量** 的记录，说明用户或维护者已经开始关注 **缓存是否生效、成本是否可见、调用统计是否完整**。  
  这类需求通常来自实际生产使用，属于项目成熟度提升的重要信号。

### 4.3 ARMhf Docker Compose 支持
- Issue #3250（已关闭）：<https://github.com/sipeed/picoclaw/issues/3250>  
- 关键词：ARMv7/armhf、Docker Compose、边缘设备、低功耗部署  
- 社区诉求分析：  
  这表明 PicoClaw 的使用者并不局限于 x86 服务器，也有人希望在 **树莓派、玩客云、OneCloud 等低功耗 ARM 设备** 上部署。  
  这类需求对开源项目很关键，因为它代表着项目在“家庭实验室/轻量自托管”场景里的扩展潜力。

---

## 5. Bug 与稳定性
### 高优先级 Bug
1. **Issue #3252：`splitKnownProviderModel` 在 model ID 含有已知 provider alias 时错误剥离前缀**  
   - 链接：<https://github.com/sipeed/picoclaw/issues/3252>  
   - 严重性判断：**中高**  
   - 原因：影响模型解析与 provider 路由，可能直接导致请求落错后端或模型名被破坏。  
   - 当前状态：**Open**  
   - 是否已有 fix PR：**未见对应修复 PR**  

### 其他稳定性信号
- **PR #3251** 不是 bug 报告，但它修复/补强了 Anthropic provider 的 token usage 统计，属于稳定性与可观测性改进。  
  链接：<https://github.com/sipeed/picoclaw/pull/3251>  

### 今日未见
- 未看到崩溃、数据丢失或安全相关紧急问题。  
- 也没有明显回归类反馈的新增记录。  

---

## 6. 功能请求与路线图信号
### 已关闭但值得关注的功能需求
- **Issue #3250：ARMhf 设备的 Docker Compose 支持**  
  链接：<https://github.com/sipeed/picoclaw/issues/3250>  
  路线图信号：  
  这说明项目对 **多架构部署** 的需求是真实存在的，尤其是 ARMv7/armhf 这类低成本边缘设备。即便该 Issue 已关闭，它仍是未来版本中可能继续优化的方向。

### 可能纳入下一版本的方向
1. **Anthropic provider 的 prompt cache token 统计补齐**  
   - PR #3251：<https://github.com/sipeed/picoclaw/pull/3251>  
   - 价值：增强运营可观测性，适合进入近期版本。  

2. **模型前缀解析修复**  
   - Issue #3252：<https://github.com/sipeed/picoclaw/issues/3252>  
   - 价值：属于基础正确性修复，通常应优先进入修复列表。  

### 路线图判断
- 从今日数据看，项目短期路线更偏向：  
  **“修正 provider 兼容性” + “补齐指标观测” + “扩展部署架构”**  
- 这些都属于较实用的工程能力增强，说明 PicoClaw 当前仍在夯实“可运行、可部署、可观测”的基础层。

---

## 7. 用户反馈摘要
### 真实痛点
- **模型路由正确性敏感**：  
  用户担心 provider alias 被误解析，说明他们已经在较复杂的模型命名与多 provider 配置场景中使用 PicoClaw。  
  链接：<https://github.com/sipeed/picoclaw/issues/3252>

- **成本与缓存可见性不足**：  
  Anthropic 相关 PR 反映出用户希望能确认 prompt cache 是否工作，以及是否真正节省了 token 消耗。  
  链接：<https://github.com/sipeed/picoclaw/pull/3251>

- **低功耗 ARM 部署需求明确**：  
  用户希望在 ARMv7 / armhf 设备上通过 Docker Compose 部署，说明 PicoClaw 不只是面向标准云主机，也被用于家庭边缘设备。  
  链接：<https://github.com/sipeed/picoclaw/issues/3250>

### 满意/不满意点
- **满意点**：  
  用户愿意提交较具体的问题与方案，说明项目具备一定实际使用基础。  
- **不满意点**：  
  反馈主要集中在“细节不正确”和“部署不够灵活”，这类问题往往会直接影响可用性和运维成本。  

---

## 8. 待处理积压
> 由于本次数据未提供更长历史窗口，无法确认“长期未响应”的老积压项；以下为当前最值得维护者尽快处理的待办。

### 重点待处理
1. **Issue #3252：provider 前缀解析 Bug**  
   - 链接：<https://github.com/sipeed/picoclaw/issues/3252>  
   - 建议：优先确认复现路径并尽快给出修复方案，因为它影响基础请求路由。  

2. **PR #3251：Anthropic token usage 统计修复/增强**  
   - 链接：<https://github.com/sipeed/picoclaw/pull/3251>  
   - 建议：尽快 review，若实现无问题可考虑合并，以提升运营可观测性。  

3. **Issue #3250：ARMhf Compose 支持**  
   - 链接：<https://github.com/sipeed/picoclaw/issues/3250>  
   - 建议：虽已关闭，但作为部署场景信号仍建议归档到多架构支持路线中，避免后续重复诉求。  

---

## 总结判断
PicoClaw 在 2026-07-13 这一天的项目状态可以概括为：  
**没有版本发布，代码交付不活跃，但问题与需求聚焦且方向明确。**  
当前最值得关注的是两类事情：  
1. **基础正确性修复**：模型前缀解析 Bug；  
2. **能力补强**：Anthropic 可观测性与 ARMhf 部署兼容。  

从健康度看，项目没有明显“失控”信号，反而表现出较清晰的工程维护节奏；但从社区活跃度看，仍需要更多合并落地和更及时的 issue/PR 互动，才能把需求热度转化为实际交付。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下为 **NanoClaw（github.com/qwibitai/nanoclaw）** 在 **2026-07-13** 的项目动态日报。

## 1. 今日速览
过去 24 小时内，NanoClaw 仍保持较高活跃度：**2 个 Issue 更新、7 个 PR 更新、无新版本发布**，说明当前社区与维护团队的关注点主要集中在“修 bug、补稳定性、增强能力”三条线上。  
从议题分布看，今天的讨论重心很明确：一类是 **输出长度/Token 上限导致的长任务中断**，另一类是 **消息回包重复、重入逻辑异常**。  
同时，PR 侧出现了多个功能增强与安全/稳定性修复并行推进，表明项目仍处于较快迭代节奏。  
整体判断：**项目健康度中上，活跃度偏高，但短期内稳定性问题仍是最核心的关注点。**  
相关入口：[项目主页](https://github.com/qwibitai/nanoclaw)

---

## 2. 版本发布
**今日无新版本发布。**  
最新 Releases：无  
入口：[Releases](https://github.com/qwibitai/nanoclaw/releases)

---

## 3. 项目进展
今日最明确的推进来自 **PR #3024**：  
- **[#3024 fix(container): raise the agent SDK's 32000 output-token cap to the model's real ceiling](https://github.com/qwibitai/nanoclaw/pull/3024)**  
  已关闭，且摘要显示其目标是修复 **Issue #3023** 中的 32k 输出 token 限制问题。  
  这意味着项目在“长输出任务可用性”上已经迈出实际一步，直接缓解了会话中途被截断的高优先级故障。

此外，今天还有多条高价值 PR 继续推进，虽然尚未合并，但方向清晰：  
- **[#3028 fix: avoid duplicate replies after send_message](https://github.com/qwibitai/nanoclaw/pull/3028)**：修复重复回复。  
- **[#3027 fix(container): relocate TMPDIR off /tmp ...](https://github.com/qwibitai/nanoclaw/pull/3027)**：容器启动与证书目录安全/稳定性修复。  
- **[#3022 support scheduled tasks in templates](https://github.com/qwibitai/nanoclaw/pull/3022)**：模板支持定时任务，属于产品能力增强。  
- **[#3029 approval-resolution verbs for ncl](https://github.com/qwibitai/nanoclaw/pull/3029)**：补全审批操作闭环。  
- **[#3021 Warn before connecting a shared WhatsApp number](https://github.com/qwibitai/nanoclaw/pull/3021)**：更偏产品安全提示与用户体验修正。

**整体进展评估：**  
今天至少完成了 **1 个关键修复闭环**，并同时推进了 **6 个未合并 PR**，覆盖稳定性、容器、审批、模板能力与 WhatsApp 接入风险提示。  
这说明项目正从“单点修复”走向“稳定性修复 + 能力扩展”并行推进，前进幅度较明显。  
入口：[#3024](https://github.com/qwibitai/nanoclaw/pull/3024)、[#3028](https://github.com/qwibitai/nanoclaw/pull/3028)、[#3027](https://github.com/qwibitai/nanoclaw/pull/3027)、[#3022](https://github.com/qwibitai/nanoclaw/pull/3022)、[#3029](https://github.com/qwibitai/nanoclaw/pull/3029)、[#3021](https://github.com/qwibitai/nanoclaw/pull/3021)

---

## 4. 社区热点
从已披露数据看，今日 **没有明显高评论、高反应的单条讨论**：  
- 最新 Issues 中评论数均为 **0**，👍 也均为 **0**。  
- PR 的评论数字段多数未披露，且 👍 也为 **0**。  

因此，社区热点不是“讨论爆发”，而是“问题聚焦明确、修复意图集中”。当前最受关注的两个主题是：

1. **长输出被 32k 上限截断**  
   - [Issue #3023](https://github.com/qwibitai/nanoclaw/issues/3023)  
   - 直接影响长任务、复杂代码生成、CAD/OpenSCAD 等场景。  
   - 诉求本质是：让 Agent 在真实模型能力范围内完成长输出，不要被默认 SDK 上限无意义地卡死。

2. **重复回复/重入问题**  
   - [Issue #3026](https://github.com/qwibitai/nanoclaw/issues/3026)  
   - [PR #3028](https://github.com/qwibitai/nanoclaw/pull/3028)  
   - 诉求是：在 agent 已经通过 `send_message` 发出回复后，不应因“re-wrap nudge”再次触发模型重跑，从而重复发送答案。  
   - 这类问题会直接影响消息通道体验，属于用户感知很强的稳定性故障。

补充热点方向还包括：  
- [PR #3022](https://github.com/qwibitai/nanoclaw/pull/3022) 的模板定时任务能力，说明用户对“自动化编排”有持续需求。  
- [PR #3029](https://github.com/qwibitai/nanoclaw/pull/3029) 的审批操作闭环，显示项目在运营/管控侧也在补齐。

---

## 5. Bug 与稳定性
按影响程度排序，今天最重要的稳定性问题如下：

### 1) 严重：所有 Claude agent 被静默限制在 32000 输出 token
- [Issue #3023](https://github.com/qwibitai/nanoclaw/issues/3023)
- 影响：长 turn 直接中断，可能导致复杂任务无法完成，属于高严重度可用性问题。
- 现状：已有修复闭环，**[PR #3024](https://github.com/qwibitai/nanoclaw/pull/3024)** 已关闭，说明问题大概率已被处理。
- 关联判断：这是今日最重要的稳定性事件。

### 2) 高：已回复的 turn 仍可能因 nudge 重跑模型并重复回复
- [Issue #3026](https://github.com/qwibitai/nanoclaw/issues/3026)
- 影响：重复消息、状态错乱、用户体验明显受损，尤其在消息通道型产品中会放大为“自动回复失控”的感觉。
- 现状：已有对应修复 PR，**[PR #3028](https://github.com/qwibitai/nanoclaw/pull/3028)**。
- 评估：如果修复合并，将显著降低消息重复与链路重入风险。

### 3) 中高：容器启动/证书路径问题导致代理静默失联
- [PR #3027](https://github.com/qwibitai/nanoclaw/pull/3027)
- 现象：`wakeContainer failed`、`EISDIR`、CA 文件路径被污染为 root-owned dir。
- 虽然当前以 PR 形式出现，但它指向的是“消息路由正常、容器却不起来”的典型高风险故障。
- 影响范围：会直接表现为通道不回复，是稳定性与可维护性的重要问题。

综合判断：  
今天的 bug 侧不是小毛刺，而是 **“长输出能力”与“消息回包正确性”** 两类核心链路问题。  
这些问题都已有明确修复方向，说明项目正在积极收敛生产风险。  
入口：[#3023](https://github.com/qwibitai/nanoclaw/issues/3023)、[#3026](https://github.com/qwibitai/nanoclaw/issues/3026)、[#3024](https://github.com/qwibitai/nanoclaw/pull/3024)、[#3028](https://github.com/qwibitai/nanoclaw/pull/3028)、[#3027](https://github.com/qwibitai/nanoclaw/pull/3027)

---

## 6. 功能请求与路线图信号
今天出现的功能/能力请求，指向几个较清晰的路线图方向：

### A. 定时任务与自动化编排
- [PR #3022](https://github.com/qwibitai/nanoclaw/pull/3022)
- 信号：模板层支持 recurring scheduled tasks，说明用户希望“创建 agent 即带自动任务”，减少手工配置。
- 路线图判断：**高概率进入下一阶段能力增强**，因为它直接提升模板和 agent group 的产品化程度。

### B. 审批闭环能力
- [PR #3029](https://github.com/qwibitai/nanoclaw/pull/3029)
- 信号：`ncl approvals` 不仅要查看，还要能 approve / reject / reject-with-reason。
- 路线图判断：这是明显的“从观察到处置”的运维/治理能力补全，属于很合理的下一步。

### C. 通道接入安全提示
- [PR #3021](https://github.com/qwibitai/nanoclaw/pull/3021)
- 信号：连接共享 WhatsApp 号码前要做风险警告，说明产品在真实用户场景中遇到连接风险、账号风控或误操作问题。
- 路线图判断：更偏向**安全提示与流程保护**，有望随稳定性修复一起推进。

### D. 长文本与复杂输出支持
- [Issue #3023](https://github.com/qwibitai/nanoclaw/issues/3023)
- [PR #3024](https://github.com/qwibitai/nanoclaw/pull/3024)
- [PR #3025](https://github.com/qwibitai/nanoclaw/pull/3025)
- 信号：用户实际工作负载已经逼近或超过默认上限，需求不是“更快”，而是“不要中断”。
- 路线图判断：这是**高优先级基础能力**，很可能继续被补强，甚至成为后续版本的默认配置调整重点。

---

## 7. 用户反馈摘要
尽管今天公开评论数很少，但从 Issues/PR 描述中，可以提炼出较真实的用户痛点：

1. **长任务经常被系统上限硬切断**
   - 来源：[Issue #3023](https://github.com/qwibitai/nanoclaw/issues/3023)
   - 用户场景：CAD / OpenSCAD / 长代码生成 / 大段结构化输出。
   - 反馈本质：用户不是要“更多 token 口号”，而是要“模型能力不要被默认配置浪费掉”。

2. **消息通道需要严格的一次性回复语义**
   - 来源：[Issue #3026](https://github.com/qwibitai/nanoclaw/issues/3026)
   - 用户场景：agent 已经通过 `send_message` 回复，系统却又因后续 nudge 重新跑一遍并重复发消息。
   - 反馈本质：用户对自动化助手的容错极低，重复回复会被直接感知为“不可靠”。

3. **通道/容器启动异常会被视为“机器人失联”**
   - 来源：[PR #3027](https://github.com/qwibitai/nanoclaw/pull/3027)
   - 用户场景：WhatsApp 等入口看似正常，实际无容器、无回复。
   - 反馈本质：用户更关心端到端可用性，而不是内部组件是否“看起来运行正常”。

4. **希望更少手工操作、更强自动化**
   - 来源：[PR #3022](https://github.com/qwibitai/nanoclaw/pull/3022)、[#3029](https://github.com/qwibitai/nanoclaw/pull/3029)
   - 用户场景：模板里自动安排任务、审批能直接处理。
   - 反馈本质：用户正在把 NanoClaw 用作真实工作流工具，而不只是演示型 agent 框架。

总体看，用户反馈更偏向 **生产可用性、自动化效率和行为确定性**，而不是单纯新增花哨功能。  
入口：[#3023](https://github.com/qwibitai/nanoclaw/issues/3023)、[#3026](https://github.com/qwibitai/nanoclaw/issues/3026)、[#3027](https://github.com/qwibitai/nanoclaw/pull/3027)、[#3022](https://github.com/qwibitai/nanoclaw/pull/3022)、[#3029](https://github.com/qwibitai/nanoclaw/pull/3029)

---

## 8. 待处理积压
基于本次数据，**没有明显“长期未响应”的老 Issue/PR**：当前条目几乎都创建并更新于 2026-07-12，说明维护节奏还算及时。  
不过，从优先级角度看，仍有几项应视为“准积压重点”，需要持续盯紧：

- **[#3026 重复回复问题](https://github.com/qwibitai/nanoclaw/issues/3026)**  
  影响用户体验，且容易在真实消息场景中放大。
- **[#3023 32k 输出 token 限制](https://github.com/qwibitai/nanoclaw/issues/3023)**  
  已有修复，但如果后续验证不足，可能重新回流为生产问题。
- **[#3027 容器 TMPDIR / CA 路径问题](https://github.com/qwibitai/nanoclaw/pull/3027)**  
  属于“看似底层、实则直接影响在线率”的问题，建议优先审核。
- **[#3022 定时任务模板支持](https://github.com/qwibitai/nanoclaw/pull/3022)**  
  这是能力型增强，若推进顺利可能成为下一版本亮点。

**维护建议：**  
当前不缺需求，缺的是把高影响稳定性问题尽快闭环，并把正在推进的能力型 PR 及时合流。  
入口：[项目 Issues](https://github.com/qwibitai/nanoclaw/issues)、[项目 PRs](https://github.com/qwibitai/nanoclaw/pulls)

---

### 总结判断
NanoClaw 今日呈现出典型的“**高活跃、强修复、轻讨论**”状态：  
- 讨论热度不高，但问题指向明确；  
- 稳定性修复与产品能力增强并行；  
- 关键链路问题已有较明确的修复路线。  

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合公众号/飞书发布的简报版**  
2. **适合 GitHub/Notion 的表格版**  
3. **带风险等级评分的管理层周报版**

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-07-13）

## 1) 今日速览
截至 2026-07-13，IronClaw 处于**高活跃、偏稳定性整治**的开发阶段：过去 24 小时内有 8 条 Issues 更新、11 条 PR 更新，但**没有新版本发布，也没有 PR 合并落地**。  
从议题分布看，维护重点非常明确，主要集中在 **CI 稳定性、测试隔离、Slack/触发链路可靠性、Reborn CLI 体验** 和 **extension-runtime 分阶段重构**。  
这意味着项目整体并非“功能停滞”，而是正处在一轮**结构性修复 + 大型重构并行推进**的窗口期。  
同时，Issue 内容显示不少问题已经从“单点 bug”上升为“系统性 flaky / hermetic 问题”，对主干健康度有直接影响。  
相关链接：  
- [Issues 活动概览](https://github.com/nearai/ironclaw/issues)  
- [Pull Requests 活动概览](https://github.com/nearai/ironclaw/pulls)

---

## 2) 项目进展
**今日没有已合并/关闭的 PR**，因此没有可确认的“代码已落地”进展；不过从 11 条开放 PR 的内容看，项目推进非常清晰，主要在以下几条主线上持续前进：

### a. extension-runtime 分阶段交付继续推进
这一条是今天最明显的主线，PR 链已经推进到多个阶段：  
- [#6008 P3：auth engine + recipes](https://github.com/nearai/ironclaw/pull/6008)  
- [#6007 P4：generic ingress router + verifier](https://github.com/nearai/ironclaw/pull/6007)  
- [#6012 P5：delivery coordinator + Slack/Telegram outbound](https://github.com/nearai/ironclaw/pull/6012)  
- [#6025 P6：config/connect UI, frontend, CLI, migrations](https://github.com/nearai/ironclaw/pull/6025)

这说明架构重构已经从“单个模块改造”进入到**端到端交付链条完善**阶段，覆盖认证、入口、投递、前端与迁移。

### b. CI / 稳定性修复持续加码
- [#6022 CI static pre-push checks](https://github.com/nearai/ironclaw/pull/6022)  
- [#6023 unify crate process-env test lock](https://github.com/nearai/ironclaw/pull/6023)  
- 对应 Issues：[#6018](https://github.com/nearai/ironclaw/issues/6018)、[#6015](https://github.com/nearai/ironclaw/issues/6015)

这代表团队不只是在“修 flaky”，而是在把**确定性失败提前拦截**，并修复测试环境共享状态导致的抖动。

### c. 体验型与工具链改进
- [#6024 builtin time 接受 Unix timestamp](https://github.com/nearai/ironclaw/pull/6024)  
- [#6019 doctor 命令增加依赖就绪检查](https://github.com/nearai/ironclaw/pull/6019)  
- [#6013 tools-capable completion nudge](https://github.com/nearai/ironclaw/pull/6013)

这些 PR 指向一个共同方向：**降低用户和集成方的手工成本**，让默认体验更可用、更可诊断。

### d. 依赖升级持续进行
- [#6021 Dependabot 依赖更新](https://github.com/nearai/ironclaw/pull/6021)

**整体判断**：  
今天没有“已完成”的里程碑式合入，但从 PR 流水线看，项目实际上在持续向前推进，且推进的重心很一致——**把平台从“能跑”推进到“可稳定交付、可观测、可维护”**。

---

## 3) 社区热点
> 说明：当前数据中 Issues 的评论数均为 0，PR 评论数未提供，**没有明显的高评论/高反应爆点**。因此这里按“更新频率 + 影响面 + 问题密度”来判断热点。

### 热点 1：CI 稳定性与 flaky 治理
- [#6014 CI fragility: flaky non-hermetic tests abort the coverage matrix](https://github.com/nearai/ironclaw/issues/6014)  
- [#6018 CI hardening: add static pre-push checks](https://github.com/nearai/ironclaw/issues/6018)  
- [#6022 static pre-push checks PR](https://github.com/nearai/ironclaw/pull/6022)  
- [#6023 test lock 修复 PR](https://github.com/nearai/ironclaw/pull/6023)

**诉求分析**：社区/维护者明显在推动“减少主干红灯”，而不是单纯修复个别测试。目标是把确定性问题前置拦截，把 flaky 分流处理。

### 热点 2：Slack 触发与交付链路可靠性
- [#6016 Slack trigger-delivery e2e tests time out / miss fired trigger](https://github.com/nearai/ironclaw/issues/6016)  
- [#6020 make Q-10 Slack journeys deterministic and observable](https://github.com/nearai/ironclaw/pull/6020)  
- [#6012 delivery coordinator + Slack/Telegram outbound](https://github.com/nearai/ironclaw/pull/6012)

**诉求分析**：大家关心的不是“功能有没有”，而是**消息是否稳定送达、e2e 是否可观测、触发是否可复现**。这通常是面向真实用户场景的核心质量指标。

### 热点 3：Runtime / CLI 易用性与测试隔离
- [#6015 build_runtime_input_production_* races on std::env](https://github.com/nearai/ironclaw/issues/6015)  
- [#6024 builtin time 接受 Unix timestamp](https://github.com/nearai/ironclaw/pull/6024)  
- [#6019 doctor 命令增加依赖就绪检查](https://github.com/nearai/ironclaw/pull/6019)

**诉求分析**：项目在向“开发者友好”靠拢，尤其是减少环境依赖、减少手工换算、减少诊断盲区。

### 热点 4：大体量架构重构的连续交付
- [#6008](https://github.com/nearai/ironclaw/pull/6008)  
- [#6007](https://github.com/nearai/ironclaw/pull/6007)  
- [#6012](https://github.com/nearai/ironclaw/pull/6012)  
- [#6025](https://github.com/nearai/ironclaw/pull/6025)

**诉求分析**：这组 PR 显示项目主线已经进入“成套组件落地”阶段，热点不是单一 bug，而是整条 extension-runtime 链路如何端到端闭环。

---

## 4) Bug 与稳定性
以下按**严重程度**大致排序：

### 高严重度：主干 CI 失败 / 影响大面积流水线
1. [#6014 CI fragility: flaky non-hermetic tests abort the coverage matrix](https://github.com/nearai/ironclaw/issues/6014)  
   - 影响范围最大：描述中提到约 70% 的 main push runs 失败。  
   - 本质是结构性问题，不是单测偶发失败。  
   - **已有修复方向**：部分由 [#6022](https://github.com/nearai/ironclaw/pull/6022) 与 [#6023](https://github.com/nearai/ironclaw/pull/6023) 对应。

2. [#6016 Slack trigger-delivery e2e tests time out / miss fired trigger](https://github.com/nearai/ironclaw/issues/6016)  
   - 影响 `Tests (Reborn)` / `Code Coverage`，属于关键链路不稳定。  
   - **相关修复信号**：[#6020](https://github.com/nearai/ironclaw/pull/6020) 明显针对 Slack journey 的确定性与可观测性。

3. [#6015 build_runtime_input_production_* races on std::env](https://github.com/nearai/ironclaw/issues/6015)  
   - 典型测试隔离缺陷，且会在 all-features coverage leg 中批量失败。  
   - **已有 fix PR**：[#6023](https://github.com/nearai/ironclaw/pull/6023)

4. [#6017 DB concurrency contract tests flake](https://github.com/nearai/ironclaw/issues/6017)  
   - 数据库并发契约测试在并行负载下抖动，影响 `Code Coverage` / `Platform & Compat`。  
   - **当前数据中未看到明确 fix PR**。

### 中严重度：确定性缺陷/可复现稳定性问题
5. [#6018 CI hardening: static pre-push checks](https://github.com/nearai/ironclaw/issues/6018)  
   - 虽然是“增强”类 issue，但它反映的是**现有 CI 机制无法在本地/提交前拦住确定性错误**。  
   - **已有修复 PR**：[#6022](https://github.com/nearai/ironclaw/pull/6022)

### 用户可感知问题：已关闭
6. [#6010 NEAR AI inference (GLM-5.2) hangs for minutes at a time during opencode usage](https://github.com/nearai/ironclaw/issues/6010)  
   - 用户体验影响明显，属于可用性问题。  
   - 当前状态为 **CLOSED**；本次数据未显示明确对应修复 PR。

7. [#6009 GLM-5.2 not available in opencode default model list](https://github.com/nearai/ironclaw/issues/6009)  
   - 属于默认体验缺失，用户需手动配置。  
   - 当前状态为 **CLOSED**；本次数据未显示明确对应修复 PR。

---

## 5) 功能请求与路线图信号
今天的新需求信号主要集中在“**让系统更易用、更可诊断、更可集成**”。

### 值得纳入下一阶段的需求
1. [#6019 `doctor` 命令增加依赖就绪检查](https://github.com/nearai/ironclaw/pull/6019)  
   - 路线图信号很强：说明项目希望把“环境是否准备好”变成可机器检查的标准流程。  
   - 若继续推进，适合成为默认运维/开发入口的一部分。

2. [#6024 builtin time 支持 Unix timestamp](https://github.com/nearai/ironclaw/pull/6024)  
   - 这是明显的可用性增强，尤其适合 Slack 时间戳、日志时间、自动化脚本。  
   - 这种改动容易被纳入下一个小版本。

3. [#6013 tools-capable completion nudge](https://github.com/nearai/ironclaw/pull/6013)  
   - 指向交互式 coding 场景的 AI 行为增强，属于产品体验型需求。  
   - 如果验证效果稳定，很可能进入面向开发者的默认行为配置。

4. [#6007 / #6008 / #6012 / #6025 extension-runtime 系列](https://github.com/nearai/ironclaw/pulls)  
   - 这不是单一功能，而是明确的**版本路线图信号**：扩展运行时正在按 P3-P6 连续交付。  
   - 下一版本极可能围绕该主线继续收束。

### 与稳定性路线相关的“准需求”
- [#6018](https://github.com/nearai/ironclaw/issues/6018) + [#6022](https://github.com/nearai/ironclaw/pull/6022)：将 CI 防线前移，说明团队愿意接受“开发流程更严格”来换取更少的主干失败。  
- [#6015](https://github.com/nearai/ironclaw/issues/6015) + [#6023](https://github.com/nearai/ironclaw/pull/6023)：表明测试隔离治理已上升为系统性工程工作。

---

## 6) 用户反馈摘要
> 说明：本批数据里 Issues 的评论数均为 0，**没有可直接引用的评论对话**。以下摘要基于 issue 标题与摘要文本，提炼真实痛点。

### 主要痛点
- **“能不能稳定跑起来”比“有没有功能”更重要**  
  来自 [#6014](https://github.com/nearai/ironclaw/issues/6014)、[#6015](https://github.com/nearai/ironclaw/issues/6015)、[#6016](https://github.com/nearai/ironclaw/issues/6016) 的共同信号是：用户和维护者都在承受 CI 抖动、超时、环境污染带来的不确定性。

- **Slack/触发链路需要可观测、可复现、可追踪**  
  [#6016](https://github.com/nearai/ironclaw/issues/6016) 反映的是实际工作流被打断，而不是单纯测试失败。  
  这通常意味着真实业务场景中，消息/触发延迟直接影响交互体验。

- **默认体验和“开箱即用”仍有改进空间**  
  [#6009](https://github.com/nearai/ironclaw/issues/6009) 显示模型默认列表不完整；  
  [#6019](https://github.com/nearai/ironclaw/pull/6019) 则说明用户需要更强的自检工具来降低配置门槛。

- **AI 开发场景对稳定性容忍度很低**  
  [#6010](https://github.com/nearai/ironclaw/issues/6010) 所述“挂几分钟”会直接破坏实时交互体验，说明用户不是只在看模型能力，也在看响应连续性。

### 综合判断
用户反馈整体偏向：  
**少踩坑、少手配、少 flaky、少黑盒。**  
这对一个 AI 智能体/个人助手项目来说，是非常典型的成熟化诉求。

---

## 7) 待处理积压
> 说明：本时间窗内没有明显“长期未响应”的陈旧项；但以下是**最值得维护者优先盯住的开放积压**，因为它们要么影响面大，要么会阻塞主线交付。

### 优先级最高的开放项
1. [#6014 CI fragility 总问题](https://github.com/nearai/ironclaw/issues/6014)  
   - 这是上游红灯的总入口，若不收敛，会持续消耗主干可信度。

2. [#6016 Slack 触发链路不稳定](https://github.com/nearai/ironclaw/issues/6016)  
   - 影响真实工作流与测试结果，建议优先跟进。

3. [#6017 DB 并发契约测试 flaky](https://github.com/nearai/ironclaw/issues/6017)  
   - 数据库并发问题常常是后续线上稳定性的前兆。

4. [#6018 CI static checks](https://github.com/nearai/ironclaw/issues/6018)  
   - 虽然是增强类需求，但它是治理“确定性失败”的关键基础设施。

5. [#6007 / #6008 / #6012 / #6025 extension-runtime 长链 PR](https://github.com/nearai/ironclaw/pulls)  
   - 这些 PR 体量大、依赖多，若 review 节奏不快，很容易形成主线瓶颈。

### 需要关注的开放 PR
- [#6022](https://github.com/nearai/ironclaw/pull/6022) CI hardening  
- [#6023](https://github.com/nearai/ironclaw/pull/6023) test lock fix  
- [#6020](https://github.com/nearai/ironclaw/pull/6020) Slack journey determinism  
- [#6019](https://github.com/nearai/ironclaw/pull/6019) doctor readiness checks  
- [#6024](https://github.com/nearai/ironclaw/pull/6024) builtin time timestamps  
- [#6025](https://github.com/nearai/ironclaw/pull/6025) extension-runtime P6

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **更适合 Slack/飞书群发的短版**，或  
2. **带风险评级与负责人建议的管理层版**。

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

# CoPaw 项目动态日报（2026-07-13）
仓库参考：<https://github.com/agentscope-ai/QwenPaw>

## 1. 今日速览
过去 24 小时，项目呈现出**高反馈、高修复、低发布**的状态：Issues 更新 15 条、PR 更新 8 条，但没有新版本发布，说明今天的主线仍然是围绕稳定性回归和兼容性修补展开。  
社区关注高度集中在 **tool_call / tool_result 配对错误、上下文压缩后的消息一致性、旧会话兼容性** 这几类问题上，且多条报告直接指向 v2.0.0。  
从 PR 侧看，已有 3 个修复类 PR 结束处理，项目在向前推进，但整体仍处于“**先止血、再优化**”阶段。  
综合判断：**活跃度高，问题压力大，健康度中等偏紧张**，核心风险仍是对话执行链路稳定性。

---

## 2. 项目进展
今日状态已结束的 3 个 PR，基本都围绕“兼容性”和“工具消息稳定性”推进，属于对当前高频故障路径的直接修复：

- **#5990 / #5988：fix(compat) 处理 legacy `file` block**
  - 链接：<https://github.com/agentscope-ai/QwenPaw/pull/5990>
  - 链接：<https://github.com/agentscope-ai/QwenPaw/pull/5988>
  - 价值：补齐 1.x → 2.0 迁移时 `file` 类型 block 的反序列化兼容，降低旧会话加载失败、工具结果解析异常的概率。

- **#5987：上下文压缩后清理未配对 tool 消息**
  - 链接：<https://github.com/agentscope-ai/QwenPaw/pull/5987>
  - 价值：针对压缩后残留 orphan `tool_result` 的问题做防护，直接对应当前大量 400 BadRequest / MODEL_EXECUTION_ERROR 报错。

总体来看，这 3 个 PR 虽然没有带来新功能，但对“**对话不中断、老数据可读、工具链可执行**”三个基础能力做了关键补强。  
如果按影响面估算，今天的修复主要覆盖了**中高频执行失败路径**，属于实质性进展，但还不足以完全消除 v2.0.0 相关回归风险。

---

## 3. 社区热点
今天讨论最活跃的内容，几乎全部集中在“会话执行失败”和“上下文/工具链一致性”上：

1. **#5996 [bug] 2.0.0 对话时产生 MODEL_EXECUTION_ERROR**  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/5996>  
   - 评论数：5
   - 热点原因：这是最典型、最具代表性的执行错误，用户已经定位到 `assistant + ToolResultBlock` 被 formatter 拆成孤儿 `tool` 消息，直接触发 OpenAI 400。
   - 背后诉求：希望系统正确维护 `tool_calls` 与 `tool_result` 的配对，不要把内部消息结构破坏为 API 不接受的格式。

2. **#5986 Bug: Context compression breaks tool_call/tool_result pairing**  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/5986>  
   - 评论数：4
   - 热点原因：说明问题并非个例，而是“长会话 + 压缩”场景下的系统性 bug。
   - 背后诉求：用户希望长任务、长会话在 token 压缩后仍能稳定执行，不要因为历史消息被回收而导致当前请求崩掉。

3. **#5998 [Bug] Agent 在用户确认方案后仍按旧方案执行**  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/5998>  
   - 评论数：2
   - 热点原因：体现出“记忆/上下文与用户最新确认不一致”的问题，直接影响生成结果可信度。
   - 背后诉求：用户希望“已确认方案”能优先覆盖旧计划，避免反复纠错。

4. **#5995 [Bug] Messages silently dropped when session is busy**  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/5995>  
   - 评论数：2
   - 热点原因：这是典型的“静默丢消息”问题，对体验伤害很大，因为用户不会收到明确失败提示。
   - 背后诉求：繁忙会话时至少要排队或报错，而不是悄悄丢弃消息。

总体判断：社区当前最强诉求不是新能力，而是**把已有能力做稳定**，尤其是工具执行、上下文压缩、会话连续性。

---

## 4. Bug 与稳定性
按严重程度排序，今日报告的主要问题如下：

### 1) 关键执行失败：tool_call / tool_result 配对错误，导致 400 / MODEL_EXECUTION_ERROR
- **#5996** 2.0.0 对话时会产生 MODEL_EXECUTION_ERROR  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5996>  
  - 严重性：极高，直接阻断对话执行
  - 现状：已有对应修复方向，关联 PR：#5989 / #5987 / #5991  
    - <https://github.com/agentscope-ai/QwenPaw/pull/5989>
    - <https://github.com/agentscope-ai/QwenPaw/pull/5987>
    - <https://github.com/agentscope-ai/QwenPaw/pull/5991>

- **#5986** Context compression breaks tool_call/tool_result pairing -> 400 BadRequestError  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5986>  
  - 严重性：极高，长会话场景下高频复现
  - 现状：已有修复 PR #5989 / #5987 在处理该类问题

- **#6002** Messages with role 'tool' must be a response to a preceding message with 'tool_calls'  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6002>  
  - 严重性：极高，报错与 #5996 同类，说明问题仍在不同路径重复出现
  - 现状：未见直接对应的独立 fix PR

- **#5985** 背景工具结果注入导致 orphan tool 消息  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5985>  
  - 严重性：极高，根因描述较完整，指向后台工具 + context 压缩组合路径
  - 现状：与 #5989/#5991 的防御性修复方向高度一致

### 2) 会话处理不可靠：忙碌时新消息被静默丢弃
- **#5995** Messages silently dropped when session is busy  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5995>  
  - 严重性：高，属于数据/交互丢失
  - 现状：暂无对应 fix PR
  - 风险：会造成“用户以为已发送、系统实际没处理”的严重体验问题

### 3) 扩展能力异常：新技能无法进入 skill pool
- **#6001** Any newly installed skill never appears in skill pool, even after restart  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6001>  
  - 严重性：高，影响插件/技能生态
  - 现状：暂无对应 fix PR
- **#6000** 同主题问题已关闭  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6000>  
  - 说明：问题范围被确认，说明不是个例，而是技能发现机制整体异常

### 4) 治理/审批噪音过高，影响操作效率
- **#5994** AUTO mode: no allow rule hit.  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5994>  
  - 严重性：中高，虽然不一定崩溃，但会大幅降低效率
  - 现状：暂无对应 fix PR
- **#5982** shell execution every single time after updating to v2.0.0  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5982>  
  - 严重性：中高，容器化/命令执行场景影响明显
  - 现状：暂无对应 fix PR
- **#5984** Tool approval prompts appear in feishu channel even when governance is disabled in UI  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5984>  
  - 严重性：中高，说明 UI 配置与实际执行策略存在脱节
  - 现状：暂无对应 fix PR

### 5) 诊断/展示类问题
- **#5983** qwenpaw doctor reports FAIL for /api/agent/health — endpoint does not exist  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5983>  
  - 严重性：中，影响排障可信度
  - 现状：暂无对应 fix PR
- **#6003** 控制台不能正确显示频道发来的消息  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6003>  
  - 严重性：中，属于 UI/消息同步问题
  - 现状：暂无对应 fix PR
- **#5981** 模型搜索框被用户名自动填充  
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5981>  
  - 严重性：低，偏 UI 缺陷

结论：今天的稳定性问题高度集中，且大多与 **2.0.0 升级后的消息格式、工具链、上下文压缩** 有关。

---

## 5. 功能请求与路线图信号
今天出现的需求，已经能看出几个较明确的产品方向：

- **#5999 请求支持跨频道绑定和切换已有会话**
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5999>  
  - 这是一个比较强的路线图信号，反映用户想把 Console、飞书、钉钉等入口当作同一会话的不同“前台”。
  - 如果后续要强化“个人 AI 助手 / 长任务陪伴”定位，这个需求很可能进入下一阶段规划。

- **#5992 Add per-session model overrides**
  链接：<https://github.com/agentscope-ai/QwenPaw/pull/5992>  
  - 这是最接近“下一版本候选功能”的开放 PR 之一。
  - 它说明用户已经不满足于“一个 Agent 只用一个默认模型”，而是需要按会话粒度切换模型，以适配不同任务成本、效果和上下文需求。

- **#5984 关闭治理/审批提示的诉求**
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/5984>  
  - 这类需求不一定是新功能，但可能推动治理策略的可配置性升级。
  - 如果后续做 UI 化开关或更细粒度策略配置，会显著改善企业/边缘设备部署体验。

- **#6001 技能自动发现/热加载**
  链接：<https://github.com/agentscope-ai/QwenPaw/issues/6001>  
  - 虽然当前表现像 bug，但本质上反映的是“插件生态要可扩展、可自动发现”的路线诉求。
  - 若后续修复完善，可能演化为更稳定的技能管理体验。

判断：**#5992 最像直接进入下一版本的功能候选，#5999 则更像中期产品路线信号。**

---

## 6. 用户反馈摘要
从今日 Issues 评论内容看，真实用户最在意的不是单点功能，而是“**连续、可靠、可控**”：

- **连续性**：希望同一任务可以跨 Console、飞书、钉钉接力，不要被平台切成多个 session。  
  - 场景：长任务、外出切换设备、多人协作跟进。  
  - 对应问题：#5999  
  - 链接：<https://github.com/agentscope-ai/QwenPaw/issues/5999>

- **可靠性**：用户对工具调用链非常敏感，只要出现 tool_result 孤儿、压缩后配对断裂，就会直接触发模型执行错误。  
  - 场景：长会话、后台工具、文档生成、旅行规划。  
  - 对应问题：#5996、#5986、#5985  
  - 链接：<https://github.com/agentscope-ai/QwenPaw/issues/5996>  
  - 链接：<https://github.com/agentscope-ai/QwenPaw/issues/5986>  
  - 链接：<https://github.com/agentscope-ai/QwenPaw/issues/5985>

- **上下文一致性**：用户明确确认的新方案，期望系统立刻覆盖旧计划，而不是继续按旧记忆执行。  
  - 场景：行程规划、文档生成、多轮纠错。  
  - 对应问题：#5998  
  - 链接：<https://github.com/agentscope-ai/QwenPaw/issues/5998>

- **可见性与可控性**：忙碌时不能静默丢消息；治理策略不能“UI 里关了，执行时还在弹”；技能安装后应能立即被识别。  
  - 场景：高频聊天、命令执行、技能扩展。  
  - 对应问题：#5995、#5984、#6001  
  - 链接：<https://github.com/agentscope-ai/QwenPaw/issues/5995>  
  - 链接：<https://github.com/agentscope-ai/QwenPaw/issues/5984>  
  - 链接：<https://github.com/agentscope-ai/QwenPaw/issues/6001>

总体来说，用户对 CoPaw 的期待已经从“能用”转向“**在长会话、跨入口、工具密集场景下也能稳定可控地用**”。

---

## 7. 待处理积压
以下是截至今日仍值得维护者优先关注、但尚未看到明确闭环的高优先事项：

### 高优先级 Issue
- **#5996** 执行时报 MODEL_EXECUTION_ERROR  
  <https://github.com/agentscope-ai/QwenPaw/issues/5996>
- **#5986** 长会话压缩破坏 tool pairing  
  <https://github.com/agentscope-ai/QwenPaw/issues/5986>
- **#5995** 忙碌时消息静默丢失  
  <https://github.com/agentscope-ai/QwenPaw/issues/5995>
- **#6001** 新技能无法进入 skill pool  
  <https://github.com/agentscope-ai/QwenPaw/issues/6001>
- **#5999** 跨频道绑定/接力会话  
  <https://github.com/agentscope-ai/QwenPaw/issues/5999>

### 值得尽快 review 的开放 PR
- **#5989** multi-layer orphan tool_result message defense  
  <https://github.com/agentscope-ai/QwenPaw/pull/5989>
- **#5991** handle legacy `file` block type  
  <https://github.com/agentscope-ai/QwenPaw/pull/5991>
- **#5992** per-session model overrides  
  <https://github.com/agentscope-ai/QwenPaw/pull/5992>
- **#5993** load v1 session media in v2  
  <https://github.com/agentscope-ai/QwenPaw/pull/5993>
- **#5997** include AgentScope Glob helper in desktop bundle  
  <https://github.com/agentscope-ai/QwenPaw/pull/5997>

建议维护者优先处理顺序：
1. **先稳执行链路**：#5996 / #5986 / #6002 / #5985  
2. **再补会话可靠性**：#5995 / #5998  
3. **再修扩展与治理体验**：#6001 / #5994 / #5984  
4. **最后优化诊断和 UI 细节**：#5983 / #6003 / #5981

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合内部周报/晨会的精简版**，或  
2. **带“风险等级 + 建议优先级”的运营版表格**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报  
**日期：2026-07-13**  
数据窗口：过去 24 小时

## 1. 今日速览
过去 24 小时，ZeroClaw 共更新了 **7 条 Issues** 和 **13 条 PR**，整体活跃度偏高，且明显以“功能推进 + 稳定性修复”并行的形态展开。  
不过，**没有任何 PR 合并/关闭，也没有新版本发布**，说明当前主要处在方案收敛、代码评审和修复验证阶段，尚未形成可对外释放的增量。  
今日最值得警惕的是出现了 **2 个 S1 级工作流阻断问题**，集中在 OpenAI 兼容层；这意味着项目虽然开发热度高，但核心兼容性仍有短板。  
与此同时，OpenAI、ACP、Lark/Line、Slack、ZeroCode 恢复能力等方向都有新提案，表明项目路线正在向“多渠道接入 + 更强可恢复性 + 更好的运维体验”继续扩展。  
**综合判断：项目处于高活跃但偏审慎的推进期，健康度中上，稳定性风险需要优先处理。**

---

## 2. 项目进展
**今日没有已合并/关闭的 PR**；以下为今天最关键的“待合并推进项”，它们代表了项目实际前进方向。

- **OpenAI Provider 兼容性与默认 wire API 调整**
  - PR [#9021](https://github.com/zeroclaw-labs/zeroclaw/pull/9021)：新建 OpenAI provider slot 默认切到 `wire_api=responses`，这是对 OpenAI 新接口路线的适配动作。  
  - PR [#9018](https://github.com/zeroclaw-labs/zeroclaw/pull/9018)：修复 `--config-dir` 在 locale 检测前未生效的问题，属于 CLI 启动链路修正。  
  - 这组改动显示项目在为 OpenAI 新模型、新 wire protocol 做基础铺垫，但同时也暴露出兼容性压力。

- **ZeroCode / Runtime 稳定性强化**
  - PR [#9007](https://github.com/zeroclaw-labs/zeroclaw/pull/9007)：按“完整 turn”裁剪 structured history，避免工具调用过多时留下孤儿消息，属于关键运行时稳定修复。  
  - PR [#9011](https://github.com/zeroclaw-labs/zeroclaw/pull/9011)：ZeroCode Dashboard 显示当前运行时上下文，增强可观测性与排障能力。  
  - PR [#9027](https://github.com/zeroclaw-labs/zeroclaw/pull/9027)：AMQP dispatch idempotency 以 `message-id` 为键，减少重复 SOP 执行风险。

- **多渠道与接入体验扩展**
  - PR [#9015](https://github.com/zeroclaw-labs/zeroclaw/pull/9015)：补齐 `bind-wechat / bind-line` CLI verb，推进多渠道绑定体验一致性。  
  - PR [#9026](https://github.com/zeroclaw-labs/zeroclaw/pull/9026)：ACP 通过 `?agent=` 查询参数选择 session agent，提升多 agent 场景可用性。  
  - PR [#9023](https://github.com/zeroclaw-labs/zeroclaw/pull/9023)：Lark inbound 文件保存到 workspace，补上非 inline 文件的可访问性。

**整体推进判断：**  
今天的 13 个 PR 覆盖了 **provider、runtime、channel、config、docs、CI、ZeroCode** 等多个层面，说明项目不只是做单点修补，而是在同步推进“接口兼容性、可恢复性、渠道能力和操作体验”。  
但由于 **全部仍处于 OPEN**，这些推进仍停留在“提交到评审”的阶段，尚未转化为可发布版本。

---

## 3. 社区热点
今日社区讨论的热点，几乎全部集中在 **OpenAI 兼容性、ZeroCode 可靠性、以及部署/接入体验** 上。

- **#9016 [Bug] OpenAI tool turns fail when Chat Completions rejects reasoning effort**  
  链接：[Issue #9016](https://github.com/zeroclaw-labs/zeroclaw/issues/9016)  
  这是今天最“热”的问题单，**1 条评论**，也是最典型的工作流阻断类 bug。用户诉求很明确：OpenAI 兼容 provider 在处理工具调用与 reasoning effort 时不能直接失败，否则 ZeroClaw 的工具链会卡死。  
  这反映出用户非常依赖“OpenAI 兼容层 + function tools”的稳定性，且容错预期很高。

- **#9019 [Bug] OpenAI Responses provider rejects vision-capable models before serializing image input**  
  链接：[Issue #9019](https://github.com/zeroclaw-labs/zeroclaw/issues/9019)  
  这是另一个高优先级兼容问题，虽然暂无评论，但严重度高，直接影响图像输入工作流。  
  诉求本质上是：**兼容 OpenAI 的 responses wire API 时，不能把 vision 能力错误地置为 false**。

- **#9020 [Feature] Add session rewind and fork-from-message workflows to ZeroCode**  
  链接：[Issue #9020](https://github.com/zeroclaw-labs/zeroclaw/issues/9020)  
  这个需求很能代表用户对 ZeroCode 的期待：不是“重新来过”，而是希望在失败后能 **回退、分叉、从中间消息继续**。  
  说明用户把 ZeroCode 当作真正的生产级交互工作台，而不是一次性对话工具。

- **#9022 [Feature] Optional Slack Events API mode for scale-to-zero deploys**  
  链接：[Issue #9022](https://github.com/zeroclaw-labs/zeroclaw/issues/9022)  
  反映出一类典型的部署侧需求：**更适合低成本、按需唤醒、serverless 化的接入方式**。  
  用户希望从轮询/Socket Mode 再补一条 HTTP Request URL 路径，以适配 scale-to-zero 场景。

- **#9017 [Bug] --config-dir is ignored during CLI locale detection**  
  链接：[Issue #9017](https://github.com/zeroclaw-labs/zeroclaw/issues/9017)  
  虽然不是高热讨论项，但它体现了对 CLI 行为确定性的关注：用户明确指定了配置目录，就希望本地化行为也遵从该目录，而不是读错位置。

**社区热度结论：**  
当前热点不在“闲聊式讨论”，而在**核心兼容性与工作流连续性**。这类问题通常意味着项目已经进入真实使用阶段，用户开始在边界条件上施压。

---

## 4. Bug 与稳定性
按严重程度排序，今日主要风险如下：

1. **S1 - workflow blocked：OpenAI tool turns fail when Chat Completions rejects reasoning effort**  
   - Issue：[#9016](https://github.com/zeroclaw-labs/zeroclaw/issues/9016)  
   - 影响：工具调用链路在 assistant 输出前就失败，属于直接阻断。  
   - 是否已有 fix PR：**今日未见直接对应修复 PR**。  
   - 风险判断：高，且可能影响依赖 OpenAI 兼容 provider 的核心用户。

2. **S1 - workflow blocked：OpenAI Responses provider rejects vision-capable models before serializing image input**  
   - Issue：[#9019](https://github.com/zeroclaw-labs/zeroclaw/issues/9019)  
   - 影响：图像输入工作流被错误拦截。  
   - 是否已有 fix PR：**有相关方向 PR** [#9021](https://github.com/zeroclaw-labs/zeroclaw/pull/9021)，但它主要是在默认 slot 上切换 `wire_api=responses`，**不等同于已彻底修复该 bug**。  
   - 风险判断：高，属于模型能力识别错误导致的兼容性回归。

3. **S2 - degraded behavior：--config-dir is ignored during CLI locale detection**  
   - Issue：[#9017](https://github.com/zeroclaw-labs/zeroclaw/issues/9017)  
   - 影响：本地化/帮助文本可能读错配置目录，影响 CLI 体验。  
   - 是否已有 fix PR：**有** [#9018](https://github.com/zeroclaw-labs/zeroclaw/pull/9018)。  
   - 风险判断：中等，偏“行为不一致”而非直接阻断。

4. **潜在运行时稳定性问题：structured history trim 方式不安全**  
   - PR：[#9007](https://github.com/zeroclaw-labs/zeroclaw/pull/9007)  
   - 说明：这是一个修复型 PR，指向“工具密集 turn 会导致历史裁剪不完整”的问题。  
   - 风险判断：如果合并前未充分验证，仍可能成为隐性回归点。

---

## 5. 功能请求与路线图信号
今天的新需求，明显在为下一阶段路线图“打样”。

- **Slack Events API over HTTP（适配 scale-to-zero）**  
  - Issue：[#9022](https://github.com/zeroclaw-labs/zeroclaw/issues/9022)  
  - 路线图信号：这是典型的“部署形态驱动”需求，和现有 Web API polling / Socket Mode 形成互补。  
  - 可能去向：如果 ZeroClaw 强调多部署形态兼容，这个功能很可能进入渠道路线图。

- **ZeroCode session rewind + fork-from-message**  
  - Issue：[#9020](https://github.com/zeroclaw-labs/zeroclaw/issues/9020)  
  - 路线图信号：与容错、恢复、工作流连续性直接相关，和已有的 ZeroCode Consolidation & Hardening tracker 高度一致。  
  - 可能去向：**很像下一版本优先级较高的能力**。

- **ACP session agent via `?agent=`**  
  - PR：[#9026](https://github.com/zeroclaw-labs/zeroclaw/pull/9026)  
  - 路线图信号：提升多 agent 场景下的端点可选性，属于 ACP 协议体验补强。  
  - 可能去向：如果 ACP 是重点战略渠道，这类 PR 很可能被纳入近期版本。

- **OpenAI 默认 slot 切到 responses**  
  - PR：[#9021](https://github.com/zeroclaw-labs/zeroclaw/pull/9021)  
  - 路线图信号：这是“默认行为迁移”级别的变更，通常会进入即将发布版本，但需要谨慎处理兼容性与回退路径。  
  - 可能去向：高概率进入下一轮发布候选，但要与 #9019 一起验证。

- **bind-wechat / bind-line CLI verbs**  
  - PR：[#9015](https://github.com/zeroclaw-labs/zeroclaw/pull/9015)  
  - 路线图信号：和 Operator UX / Self-Service 方向直接相关，属于“渠道绑定体验补齐”。  
  - 可能去向：适合进入 UX/onboarding 路线图。

**判断：**  
从当前 PR/Issue 组合看，下一版本最可能围绕三条主线：  
1) **OpenAI 兼容层修正**，  
2) **ZeroCode 恢复与可观测性增强**，  
3) **多渠道/多 agent 接入体验补齐**。

---

## 6. 用户反馈摘要
从 Issues 的描述里，可以提炼出比较真实的用户痛点：

- **“兼容性不能只看表面，要保证工具调用和多模态输入都能跑通”**  
  来自 [#9016](https://github.com/zeroclaw-labs/zeroclaw/issues/9016) 和 [#9019](https://github.com/zeroclaw-labs/zeroclaw/issues/9019)。  
  用户不是在追求“模型接得上”，而是在追求**完整工作流可用**。

- **“失败后要能恢复，而不是从头再来”**  
  来自 [#9020](https://github.com/zeroclaw-labs/zeroclaw/issues/9020)。  
  这说明 ZeroCode 已经被当成真实生产交互环境，用户对可恢复性、可回放性要求很高。

- **“部署方式要适应不同规模与成本模型”**  
  来自 [#9022](https://github.com/zeroclaw-labs/zeroclaw/issues/9022)。  
  用户在意的是**低成本、低维护、可自动扩缩**，不是单一运行形态。

- **“CLI/配置行为要完全可预测”**  
  来自 [#9017](https://github.com/zeroclaw-labs/zeroclaw/issues/9017)。  
  说明用户已经在较细节层面使用 ZeroClaw，且对“显式参数优先级”很敏感。

- **“多渠道绑定和多 agent 入口要保持一致性”**  
  来自 [#9015](https://github.com/zeroclaw-labs/zeroclaw/pull/9015) 与 [#9026](https://github.com/zeroclaw-labs/zeroclaw/pull/9026)。  
  用户希望不同渠道不再是特例堆叠，而是统一能力面。

**总体来看：**  
今天几乎没有“满意度反馈”的直接信号，更多是围绕**可用性、兼容性、恢复性**提出的改进要求，这通常意味着项目已经进入较成熟的真实使用阶段。

---

## 7. 待处理积压
严格来说，今天的数据窗口内**没有真正意义上的长期未响应项**，因为所有 Issues/PR 都是近 1 天内新增或活跃。  
但从维护优先级看，以下条目已经形成“高优先级待处理堆积”：

- **S1 阻断问题，需优先止血**
  - [#9016](https://github.com/zeroclaw-labs/zeroclaw/issues/9016)
  - [#9019](https://github.com/zeroclaw-labs/zeroclaw/issues/9019)

- **重要但仍未落地的修复 PR**
  - [#9018](https://github.com/zeroclaw-labs/zeroclaw/pull/9018)
  - [#9007](https://github.com/zeroclaw-labs/zeroclaw/pull/9007)

- **路线图级功能/Tracker，适合持续排期**
  - [#9010](https://github.com/zeroclaw-labs/zeroclaw/issues/9010)（ZeroCode Consolidation & Hardening）
  - [#9009](https://github.com/zeroclaw-labs/zeroclaw/issues/9009)（Operator UX Onboarding, Pairing & Self-Service）

- **新功能请求，若资源允许应尽早评估**
  - [#9020](https://github.com/zeroclaw-labs/zeroclaw/issues/9020)
  - [#9022](https://github.com/zeroclaw-labs/zeroclaw/issues/9022)

**维护建议：**  
优先处理 **#9016 / #9019** 这类核心阻断问题；随后推进 **#9018 / #9007** 这类稳定性修复；最后再把 **#9020 / #9022 / #9015 / #9026** 纳入版本节奏。  

---

如果你愿意，我还可以把这份日报进一步整理成：  
1) **适合发给团队的短版晨报**，或  
2) **适合 GitHub/Notion 的表格式日报**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*