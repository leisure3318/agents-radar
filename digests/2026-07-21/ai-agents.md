# OpenClaw 生态日报 2026-07-21

> Issues: 54 | PRs: 40 | 覆盖项目: 13 个 | 生成时间: 2026-07-21 01:03 UTC

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

# OpenClaw 项目动态日报（2026-07-21）

## 1. 今日速览
过去 24 小时，OpenClaw 处于**高强度问题暴露与修复排队**状态：Issues 更新 54 条、PR 更新 40 条，但仅有 2 条 PR 关闭/合并，说明社区提交与维护响应之间仍存在明显落差。当前新增内容几乎全部集中在**稳定性、会话状态、权限/认证、跨渠道消息投递**等核心链路，问题密度高且多为高优先级。  
从标签分布看，P1/P2、`needs-maintainer-review`、`needs-live-repro`、`no-new-fix-pr` 很集中，表明项目健康度仍可控，但**review 与决策队列偏长**。  
总体判断：**社区活跃度很高，项目推进也在持续，但发布节奏明显慢于问题涌入速度。**

> 今日无新版本发布。

---

## 2. 项目进展
今天可见的关键推进，主要来自**已关闭/进入修复链路的 PR**，方向集中在“减少数据丢失、提升兼容性、补齐结构化输出”：

- **Windows 打包/超时后的子进程清理修复**：`fix(release): stop Windows package descendants after timeout`  
  PR：[#111956](https://github.com/openclaw/openclaw/pull/111956)  
  关联问题：[#111948](https://github.com/openclaw/openclaw/issues/111948)  
  价值：减少 Windows 构建或发布链路中残留子进程，降低打包失败后的环境污染风险。

- **JSON 日志结构化修复**：`fix(logging): keep JSON console output structured`  
  PR：[#111908](https://github.com/openclaw/openclaw/pull/111908)  
  关联问题：[#111906](https://github.com/openclaw/openclaw/issues/111906)  
  价值：修正 `logging.consoleStyle: "json"` 下仍有纯文本输出的问题，有助于可观测性与日志管道稳定性。

- **从控制 UI 到移动端、插件、macOS 的一批用户体验增强 PR 正在推进**  
  例如：  
  - [#111866](https://github.com/openclaw/openclaw/pull/111866) 长消息折叠  
  - [#111995](https://github.com/openclaw/openclaw/pull/111995) 显示已启用插件  
  - [#111996](https://github.com/openclaw/openclaw/pull/111996) 预览 lobster 声音  
  - [#111965](https://github.com/openclaw/openclaw/pull/111965) 控制 UI 现代化改版

**整体推进判断**：今日的“前进”更多体现在**修复型 PR 收口与 UX 改善积累**，而不是版本发布。按公开列表看，至少有一批明显高价值修复已经进入落地阶段，但**待合并队列仍然很长**，说明项目仍处于“修 bug + 补产品细节”的高负载周期。

---

## 3. 社区热点
以下是今天讨论最活跃的条目，按评论活跃度优先：

1. **[#111971](https://github.com/openclaw/openclaw/issues/111971) — Control UI 媒体设置需要自动请求权限并保持稳定 picker 宽度**  
   - 评论：5  
   - 热点原因：这是典型的**高频设置页可发现性问题**。用户并非不知道功能存在，而是“不知道要先点刷新按钮来触发权限”。  
   - 背后诉求：降低音频/摄像头设置的操作门槛，减少“功能看见了但不会用”的摩擦。

2. **[#111654](https://github.com/openclaw/openclaw/issues/111654) — runWithModelFallback 共享 abortSignal/deadline 导致瞬时失败误报为超时**  
   - 评论：3  
   - 热点原因：直接影响**模型路由与失败诊断**，会把“立即失败”包装成“超时”，影响故障排查。  
   - 背后诉求：希望失败归因更准确，避免把 provider 问题误判成链路超时。

3. **[#111817](https://github.com/openclaw/openclaw/issues/111817) — ChatGPT Responses 对确定性的 TLS 证书失败反复重试**  
   - 评论：2  
   - 热点原因：属于**不该重试却重试**的典型稳定性问题，浪费预算并延长失败时间。  
   - 背后诉求：对“可确定失败”的错误做更精细的分类。

4. **[#111887](https://github.com/openclaw/openclaw/issues/111887) — 运行中的 embedded subagent 无法由 operator 中止**  
   - 评论：2  
   - 热点原因：直接关系到**会话控制权**。  
   - 背后诉求：希望在代理卡住或误运行时，操作员能有明确且可用的中止路径。

5. **[#111704](https://github.com/openclaw/openclaw/issues/111704) — 动态工具调用未校验输入 schema**  
   - 评论：2  
   - 热点原因：这是**安全与契约一致性**问题。  
   - 背后诉求：模型驱动的工具调用必须经过输入验证，不能直接放行原始输入。

整体来看，今天的讨论热点集中在：**权限可发现性、失败归因准确性、会话控制、工具安全边界**。这说明用户最在意的仍是“能不能稳定、可控、可解释地工作”。

---

## 4. Bug 与稳定性
按严重程度与风险面排序，当前最值得关注的 Bug 如下：

### P1 / 高风险
- **[#111654](https://github.com/openclaw/openclaw/issues/111654)** — `runWithModelFallback` 共享 abort/deadline，导致瞬时失败被误标为 provider timeout  
  - 风险：会误导故障排查，影响重试/降级策略判断  
  - **是否已有 fix PR**：未见

- **[#111887](https://github.com/openclaw/openclaw/issues/111887)** — 运行中的 embedded subagent run 无法被 operator 中止  
  - 风险：会话控制权缺失，严重时需要人工干预进程  
  - **是否已有 fix PR**：未见

- **[#111857](https://github.com/openclaw/openclaw/issues/111857)** — CLI budget 重开已 compact 的 JSONL 分支，造成 prompt 估算膨胀与重复 compact  
  - 风险：可能引发**上下文膨胀与数据层级错误**  
  - **是否已有 fix PR**：未见

- **[#111897](https://github.com/openclaw/openclaw/issues/111897)** — 同一 session lane 并发运行可重复交付回复  
  - 风险：**重复回复 / 消息污染**，用户可见  
  - **是否已有 fix PR**：未见

- **[#111839](https://github.com/openclaw/openclaw/issues/111839)** — Channel follow-ups 不能 steering active Codex app-server runs  
  - 风险：交互模型失效，消息被错误排队  
  - **是否已有 fix PR**：未见

- **[#111797](https://github.com/openclaw/openclaw/issues/111797)** — security audit 在 symlink 技能根下跳过嵌套逃逸路径  
  - 风险：**安全审计绕过**  
  - **是否已有 fix PR**：未见

### P2 / 中风险，但影响面较广
- **[#111854](https://github.com/openclaw/openclaw/issues/111854)** — WebUI 暴露内部占位符 `[chat.history omitted: message too large]`  
  - **fix PR**：[#111865](https://github.com/openclaw/openclaw/pull/111865)  
  - 说明：属于 UX/信息泄露型问题，已有对应修复 PR。

- **[#111858](https://github.com/openclaw/openclaw/issues/111858)** — Discord 原始 bot mention 在 hydration 失败时被丢弃  
  - **fix PR**：[#111860](https://github.com/openclaw/openclaw/pull/111860)  
  - 说明：属于消息丢失问题，已有修复 PR。

- **[#111906](https://github.com/openclaw/openclaw/issues/111906)** — `logging.consoleStyle: "json"` 仍有纯文本输出  
  - **fix PR**：[#111908](https://github.com/openclaw/openclaw/pull/111908)  
  - 说明：影响日志结构化与运维可观测性。

- **[#111948](https://github.com/openclaw/openclaw/issues/111948)** — Windows package timeout 留下 command-shim 后代进程  
  - **fix PR**：[#111956](https://github.com/openclaw/openclaw/pull/111956)  
  - 说明：已进入修复链路。

- **[#111979](https://github.com/openclaw/openclaw/issues/111979)** — runtime cancel 后 tool calls 仍会执行并重复发送结果  
  - 风险：取消语义失效，可能导致副作用重复  
  - **是否已有 fix PR**：未见

### 其它值得注意的稳定性问题
- **[#111981](https://github.com/openclaw/openclaw/issues/111981)** — shared session file 写锁并发导致假“全部模型限流”  
- **[#111961](https://github.com/openclaw/openclaw/issues/111961)** — MCP server 恢复后，失败时缓存的 catalog 仍不刷新  
- **[#111990](https://github.com/openclaw/openclaw/issues/111990)** — memory_search 使用过期缓存导致超时/假零命中  
- **[#111985](https://github.com/openclaw/openclaw/issues/111985)** — memory-core 将 ChatGPT/Codex OAuth token 送去 OpenAI embeddings API  
  - 这一条尤其值得安全/合规侧复核。

---

## 5. 功能请求与路线图信号
今天的新功能需求，明显指向 **Control UI、Gateway 管理、插件生态、模型路由** 四条路线：

- **[#111973](https://github.com/openclaw/openclaw/issues/111973)** — 管理 macOS Gateway profiles，并支持多个窗口  
  - 路线信号：多实例/多 profile 方向很明确，属于桌面端平台能力增强。
  - **与现有 PR 的关系**：和桌面/控制 UI 一系列改版 PR 风格一致，较可能进入下一版本优先级池。

- **[#111971](https://github.com/openclaw/openclaw/issues/111971)** — Control UI 媒体设置需自动请求权限、稳定 picker 宽度  
  - 路线信号：可发现性和可用性优先，属于容易落地、收益明显的 UX 改善。
  - **纳入下一版本概率**：高。

- **[#111976](https://github.com/openclaw/openclaw/issues/111976)** — 为所有 provider-backed tools 提供统一 fallback chains  
  - 路线信号：这是平台级能力建设，能显著提升工具层韧性。
  - **纳入下一版本概率**：中高，但可能需要较多架构讨论。

- **[#111889](https://github.com/openclaw/openclaw/issues/111889)** — Plugin runtime 支持 declarative tools 和 single-attempt completions  
  - 路线信号：插件运行时能力增强，直接提升第三方开发可预测性。
  - **纳入下一版本概率**：中高，属于平台扩展性方向。

- **[#111924](https://github.com/openclaw/openclaw/issues/111924)** — 模型下拉框支持搜索/过滤  
  - 路线信号：随着 OpenRouter 等接入，模型数量增长后，UI 信息架构开始成为核心痛点。
  - **纳入下一版本概率**：高。

- **[#111995](https://github.com/openclaw/openclaw/pull/111995)**、**[#111996](https://github.com/openclaw/openclaw/pull/111996)**  
  - 这些 PR 表明维护者正在集中优化 **插件发现、声音提示、设置反馈**，与上述需求方向高度一致。

---

## 6. 用户反馈摘要
从今天的 Issues 评论与描述中，可以提炼出几类非常真实的用户痛点：

1. **“功能可见，但入口不明显”**  
   - 典型案例：[#111971](https://github.com/openclaw/openclaw/issues/111971)  
   - 用户并不是缺功能，而是不知道“刷新按钮就是权限动作”。  
   - 说明 OpenClaw 在权限获取与引导上仍有 UX 缺口。

2. **“复杂配置下，UI 很难用”**  
   - 典型案例：[#111924](https://github.com/openclaw/openclaw/issues/111924)、[#111884](https://github.com/openclaw/openclaw/issues/111884)  
   - 当模型数量超过 100 个时，下拉列表和显示名问题会迅速放大。  
   - 用户需要的是**可搜索、可筛选、命名清晰**的控制界面。

3. **“内部实现细节不应泄露给用户”**  
   - 典型案例：[#111854](https://github.com/openclaw/openclaw/issues/111854)  
   - 用户看到占位符文本，会把内部错误当成真实聊天内容。  
   - 这类问题虽不一定崩溃，但会显著削弱信任。

4. **“会话与声音/移动端场景对稳定性要求很高”**  
   - 典型案例：[#111936](https://github.com/openclaw/openclaw/issues/111936)、[#111850](https://github.com/openclaw/openclaw/issues/111850)  
   - iOS 后台切换、语音会话中断、设置失败误报，都说明移动与语音链路对用户体验的容错极低。

5. **“错误分类要准，否则排障成本很高”**  
   - 典型案例：[#111654](https://github.com/openclaw/openclaw/issues/111654)、[#111817](https://github.com/openclaw/openclaw/issues/111817)、[#111895](https://github.com/openclaw/openclaw/issues/111895)  
   - 用户非常在意“到底是 timeout、provider error，还是配置问题”。  
   - 这意味着 OpenClaw 的诊断层需要比现在更精细。

---

## 7. 待处理积压
从当前数据看，真正“长期未响应”的时间维度还不充分，但**高优先级待处理积压**已经很明显，建议维护者优先关注：

### 需要优先分流的 P1
- [#111654](https://github.com/openclaw/openclaw/issues/111654) — fallback deadline/abort 归因错误
- [#111887](https://github.com/openclaw/openclaw/issues/111887) — 无法中止 embedded subagent
- [#111857](https://github.com/openclaw/openclaw/issues/111857) — compacted session 复开导致上下文膨胀
- [#111897](https://github.com/openclaw/openclaw/issues/111897) — 并发运行重复回复
- [#111839](https://github.com/openclaw/openclaw/issues/111839) — follow-up 无法 steer
- [#111797](https://github.com/openclaw/openclaw/issues/111797) — security audit 绕过风险

### 已有修复 PR，但仍需尽快合并的项
- [#111860](https://github.com/openclaw/openclaw/pull/111860) / [#111858](https://github.com/openclaw/openclaw/issues/111858)
- [#111908](https://github.com/openclaw/openclaw/pull/111908) / [#111906](https://github.com/openclaw/openclaw/issues/111906)
- [#111956](https://github.com/openclaw/openclaw/pull/111956) / [#111948](https://github.com/openclaw/openclaw/issues/111948)
- [#111865](https://github.com/openclaw/openclaw/pull/111865) / [#111854](https://github.com/openclaw/openclaw/issues/111854)

### PR 队列压力信号
当前有大量 PR 处于 `needs proof`、`needs maintainer look`、`waiting on author` 状态，例如：
- [#111898](https://github.com/openclaw/openclaw/pull/111898)
- [#111893](https://github.com/openclaw/openclaw/pull/111893)
- [#111885](https://github.com/openclaw/openclaw/pull/111885)
- [#111805](https://github.com/openclaw/openclaw/pull/111805)
- [#111899](https://github.com/openclaw/openclaw/pull/111899)

这说明**问题输入很快，验证与合并相对慢**。如果这一状态持续，短期内会形成明显的 review 堵塞。

---

## 总体结论
OpenClaw 今天的信号很清晰：**产品与平台正在快速演进，但核心稳定性和会话控制问题仍密集暴露**。项目的社区活跃度很强，尤其在 UX、权限、消息投递、模型路由、工具安全等方面反馈集中；与此同时，PR 合并速度略显偏慢，维护者将面临更明显的 triage 压力。  
如果后续能尽快把已挂起的修复 PR 合并，并对 P1 级 session-state / auth-provider / security 问题做优先级收敛，项目健康度会明显改善。

---

## 横向生态对比

下面是基于你提供的 13 个项目日报整理的**横向对比分析报告**，面向技术决策者与开发者，尽量用数据和可行动结论表达。

---

# 个人 AI 助手 / 自主智能体开源生态横向对比报告（2026-07-21）

## 1) 生态全景

过去 24 小时，这一生态呈现出很清晰的特征：**高活跃、高问题暴露、高修复压力**。主流项目都在围绕会话状态、权限安全、跨渠道接入、工具链稳定性和 UX 可用性做密集迭代，说明行业已从“能跑起来”进入“能长期稳定工作”的阶段。  
同时，多个项目开始把**评测、可观测性、回归测试、成本控制**提升到一线优先级，这意味着 Agent 生态正在从“功能型应用”向“工程化系统”演进。  
整体来看，生态仍处于快速成长期，但**质量门槛正在显著抬升**：谁能把状态一致性、安全边界和交付节奏做好，谁就更可能在下一阶段脱颖而出。

---

## 2) 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 54 | 40 | 无新版本 | **高活跃，但修复压力很大**：问题暴露密集，合并偏慢，处于高负载排队期 |
| **NanoBot** | 1 | 10 | 无新版本 | **稳态迭代**：以修复和功能补强为主，整体健康 |
| **Hermes Agent** | 50 | 50 | **有新版本**：v0.19.0 | **高活跃、高产出**：但状态一致性与升级稳定性压力同步上升 |
| **PicoClaw** | 5 | 4 | 无新版本 | **中高活跃**：集中在 provider / OAuth / 配置持久化问题，需优先修复回归 |
| **NanoClaw** | 6 | 10 | 无新版本 | **中高活跃**：安全与审批链路修复密集，方向明确 |
| **NullClaw** | 0 | 0 | 无活动 | **无信号**：无法判断 |
| **IronClaw** | 36 | 48 | 无新版本 | **高活跃**：处于大迁移收尾期，工程推进强但风险也高 |
| **LobsterAI** | 0 | 10 | 无新版本 | **健康稳定**：以工程修复和体验打磨为主，外部问题少 |
| **TinyClaw** | 0 | 0 | 无活动 | **无信号**：无法判断 |
| **Moltis** | 0 | 0 | 无活动 | **无信号**：无法判断 |
| **CoPaw** | 9 | 11 | 无新版本 | **高活跃但审查偏慢**：需求密集，合并率低，处于快速收敛期 |
| **ZeptoClaw** | 0 | 0 | 无活动 | **无信号**：无法判断 |
| **ZeroClaw** | 18 | 28 | 无新版本 | **高活跃、高风险**：评测体系在建，但稳定性问题也较集中 |

---

## 3) OpenClaw 在生态中的定位

### 3.1 相对优势
OpenClaw 的定位很像这个生态里的**“核心链路压力测试场”**：  
它的问题覆盖了会话状态、认证/权限、消息投递、日志结构化、工具安全、移动端/桌面端体验等关键路径，说明项目已经进入**真实生产级复杂度**。  
相比很多项目只在某一条能力线上发力，OpenClaw 更像是一个**“全栈型 AI 助手底座”**，用户对它的期待更接近“可长期运行的系统”，而不是单功能工具。

### 3.2 技术路线差异
OpenClaw 的技术路线更偏向：
- **核心运行时稳定性优先**
- **会话状态与消息一致性优先**
- **权限/工具边界优先**
- **控制 UI、插件生态、模型路由并进**

与之对比：
- **Hermes Agent** 更像“大体量整合 + 桌面工作台 + 多渠道统一”的平台型路线；
- **IronClaw** 正在做旧栈退役与 Reborn 迁移，属于架构切换期；
- **ZeroClaw** 明显在建设评测/回归/基线体系，更偏工程平台；
- **CoPaw** 在模型、浏览器、checkpoint、token 成本等方向更强调“可操作性与实验性”。

### 3.3 社区规模对比
按今天 24 小时的更新量看，OpenClaw 属于**第一梯队**：  
- OpenClaw：**94** 次更新（54 Issues + 40 PR）
- Hermes Agent：**100** 次更新（50 + 50，且有新版本）
- IronClaw：**84** 次更新
- ZeroClaw：**46** 次更新
- CoPaw：**20** 次更新
- 其余项目明显更低或无活动

结论：OpenClaw 的社区热度和讨论密度已经足够高，**与 Hermes、IronClaw 处于同一量级**，只是当前的合并效率和问题收敛速度略慢于其输入速度。

---

## 4) 共同关注的技术方向

### 1. 会话状态一致性 / 并发语义
**涉及项目：** OpenClaw、Hermes Agent、CoPaw、ZeroClaw、IronClaw、LobsterAI  
**典型诉求：**
- 避免重复回复、重复 transcript、并发串台
- 统一 cancel / abort / deadline 语义
- 保证 session、thread、profile、workspace 的隔离性
- 提升 checkpoint / replay / resume 的正确性

### 2. 权限、安全边界与审批可解释性
**涉及项目：** OpenClaw、NanoClaw、PicoClaw、Hermes Agent、ZeroClaw、IronClaw  
**典型诉求：**
- 工具调用必须校验 schema
- 角色授权不能默认越权
- 审批卡片要展示“效果”而不是原始命令
- OAuth / token / credential 的路由不能串会话
- sandbox / admission / capability dispatch 必须可审计

### 3. 多渠道 / 多 provider / 多后端兼容
**涉及项目：** Hermes Agent、NanoClaw、PicoClaw、ZeroClaw、OpenClaw、IronClaw  
**典型诉求：**
- Slack / Telegram / WhatsApp / Discord / LINE / iMessage / WeChat 的统一接入
- provider fallback chain
- 外部托管 gateway / profile / channel routing
- 不同消息结构、附件、blocks、attachments 的完整保真

### 4. 评测、回归、可观测性与成本控制
**涉及项目：** ZeroClaw、CoPaw、OpenClaw、Hermes Agent  
**典型诉求：**
- replay regression suite、baseline gating、LLM judge 标定
- structured logging / trace ID / receipt / failure dump
- token 成本控制、工具描述瘦身、reasoning 计费准确
- 可复现、可比较、可量化的质量体系

### 5. UX 可发现性与控制面改进
**涉及项目：** OpenClaw、NanoBot、IronClaw、LobsterAI、CoPaw、PicoClaw  
**典型诉求：**
- 权限入口要清晰
- 模型列表要可搜索/筛选
- 会话历史要可分组/折叠/展开
- 长内容不能截断
- 移动端、桌面端、WebUI 的操作一致性要提升

---

## 5) 差异化定位分析

### OpenClaw
- **功能侧重：** 核心运行时、会话控制、权限/认证、消息投递、插件生态
- **目标用户：** 个人 AI 助手重度用户、需要稳定工具调用的开发者、关注可控性的社区用户
- **架构特征：** 典型“系统底座型”项目，问题暴露全面，适合验证 AI 助手的真实生产复杂度

### Hermes Agent
- **功能侧重：** 桌面工作台、多渠道统一、更新与安装、路由与权限
- **目标用户：** 更偏“工作台/操作系统式”使用者
- **架构特征：** 大体量平台整合，功能边界广，发布体量大，系统耦合度高

### IronClaw
- **功能侧重：** Reborn 迁移、旧栈退役、workspace / MCP / extension / onboarding
- **目标用户：** 已进入生产迁移阶段的团队用户
- **架构特征：** 架构切换期项目，强调从 legacy 向新体系收敛

### ZeroClaw
- **功能侧重：** eval harness、回归 gating、replay/live test、grader、receipt
- **目标用户：** 对质量验证和实验管理要求高的团队
- **架构特征：** 明显偏工程平台与评测基础设施

### CoPaw
- **功能侧重：** browser SDK、checkpoint、模型接入、token 成本、历史管理
- **目标用户：** 需要多模型、多工具、强实验能力的 agent 开发者
- **架构特征：** 偏“实验 + 生产化桥接”，关注可扩展与成本效率

### NanoClaw / PicoClaw / NanoBot / LobsterAI
- **共同特点：** 更偏业务落地、渠道适配、UI 体验、权限规则与部署便利
- **差异：**
  - NanoClaw：权限/审批安全和多渠道
  - PicoClaw：provider / OAuth / 配置持久化 / 本地化
  - NanoBot：多模态、WebUI、渠道扩展、执行器安全
  - LobsterAI：协作场景、Windows、认证和布局/交互稳定性

### 低活动项目
- NullClaw / TinyClaw / Moltis / ZeptoClaw 当前无活动，无法形成有效对比信号。

---

## 6) 社区热度与成熟度

### A. 快速迭代、风险也高
- **Hermes Agent**
- **OpenClaw**
- **ZeroClaw**
- **IronClaw**
- **CoPaw**

特征：
- 更新量高
- 问题暴露密集
- 关键链路复杂
- 多数处于“修复 + 扩展 + 收敛”并行阶段

其中：
- **Hermes**：唯一已发新版本，但升级后仍暴露大量状态问题
- **OpenClaw**：问题覆盖面最广之一，社区热度高但 backlog 压力明显
- **ZeroClaw**：评测体系很强，但 S0/S1 风险集中
- **IronClaw**：大迁移期，结构收尾与缺口补齐并存
- **CoPaw**：需求很活跃，但合并率偏低，说明审查和验证瓶颈明显

### B. 质量巩固、稳态优化
- **NanoBot**
- **NanoClaw**
- **PicoClaw**
- **LobsterAI**

特征：
- 更新不算少，但更偏修复、打磨、补齐能力
- 没有明显版本事故
- 更接近“把产品做稳”的阶段

### C. 低活动/静默
- **NullClaw**
- **TinyClaw**
- **Moltis**
- **ZeptoClaw**

特征：
- 24h 内无活动
- 无法从当前窗口判断技术进展或健康度

---

## 7) 值得关注的趋势信号

### 1. Agent 项目正在从“对话工具”变成“运行系统”
多项目都在处理 session、workspace、profile、checkpoint、runtime guard、gateway lifecycle，说明行业重心已经从聊天界面转向**可持续运行的系统能力**。

### 2. 状态一致性成为第一优先级
重复回复、重复 transcript、游标提前推进、并发错路由、abort/deadline 共享等问题，在多个项目中重复出现。  
这表明：**Agent 的核心难点不再是生成文本，而是保持状态正确**。

### 3. 安全与权限必须显式化
“默认授权”“自批”“schema 未校验”“token 串会话”“sandbox 误伤”等问题集中出现，说明用户和维护者都在往一个方向收敛：  
**AI 智能体不能靠隐式默认值工作，必须具备明确的权限边界和审计能力。**

### 4. 多渠道、多模型、多后端将成为标配
Slack、Telegram、WhatsApp、LINE、iMessage、WeChat、Discord、WebUI、Desktop 同时出现，说明 AI Agent 生态已经不是单一入口产品，而是**多 surface 统一编排**的问题。

### 5. 评测与可观测性正在产品化
ZeroClaw 的 eval harness、CoPaw 的 trace / token 关注、OpenClaw 的结构化日志修复，说明未来竞争力不只在功能，而在**是否能被度量、被回归、被审计**。

### 6. 成本控制成为 Agent 工程核心指标
工具描述太长、reasoning token 计费、上下文膨胀、重复推理块、历史数据索引性能，这些都表明：  
**token 成本、上下文效率和推理开销，已经是产品可用性的组成部分。**

### 7. 非英语本地化与企业部署能力在上升
PicoClaw 的日语本地化、NanoClaw 的企业 IM、Hermes / IronClaw / ZeroClaw 的桌面和工作流能力都说明：  
开源 Agent 不再只是英语开发者玩具，而是在向**全球化和企业化**扩散。

---

## 结论

如果只看今天的信号，这个生态的关键词是：  
**“高活跃、强复杂度、重安全、拼稳定。”**

- **OpenClaw** 是最典型的核心链路压力点，代表了个人 AI 助手/Agent 系统真正进入生产复杂度后的状态；
- **Hermes / IronClaw / ZeroClaw / CoPaw** 说明平台化、迁移化、评测化正在成为主流；
- **NanoBot / NanoClaw / PicoClaw / LobsterAI** 则显示出产品化落地、渠道扩展和体验打磨仍在持续；
- 低活动项目暂时不构成判断依据。

如果你需要，我可以进一步把这份报告整理成：
1. **一页管理层摘要版**
2. **适合技术评审会的 PPT 要点版**
3. **按“风险优先级”排序的行动清单版**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

以下为 **NanoBot（HKUDS/nanobot）** 在 **2026-07-21** 的项目动态日报（基于近 24 小时 GitHub 数据）。

---

## 1. 今日速览

过去 24 小时，NanoBot 维持了**较高活跃度**：共出现 **1 条 Issue 更新**、**10 条 PR 更新**，其中 **3 条已关闭/合并、7 条仍在推进**，但**没有新版本发布**。从变更主题看，项目重心集中在 **WebUI 性能与交互、通道/Provider 扩展、执行器安全约束、部署便利性与安全文档**，说明团队仍在对核心能力进行持续打磨。  
整体上，这是一个**“高频迭代、以功能补强和稳定性修复为主”的健康状态**，暂无发布节奏上的信号表明进入冻结或停滞期。  
项目地址：<https://github.com/HKUDS/nanobot>

---

## 2. 版本发布

**无新版本发布。**  
最新 Releases 为空：<https://github.com/HKUDS/nanobot/releases>

---

## 3. 项目进展

今日最重要的推进来自以下已关闭/合并 PR：

### 已关闭/合并的重要 PR

1. **#5008 fix(providers): keep all images when merging consecutive multimodal user turns**  
   链接：<https://github.com/HKUDS/nanobot/pull/5008>  
   影响：修复多模态对话中连续 `user` turn 合并时只保留最后一张图片的问题，避免相册/多图输入被截断。  
   意义：这是一个**直接影响多模态体验的数据丢失修复**，对真实使用场景很关键。

2. **#5002 style(webui): simplify Markdown code blocks**  
   链接：<https://github.com/HKUDS/nanobot/pull/5002>  
   影响：简化 WebUI 中 Markdown 代码块样式，减少视觉噪音，提升聊天界面一致性。  
   意义：属于**界面体验优化**，但对日常可读性和产品质感有正向作用。

3. **#5001 fix(webui): show copy action on every assistant message**  
   链接：<https://github.com/HKUDS/nanobot/pull/5001>  
   影响：让每条 assistant 消息都能显示复制操作，修复了复制入口不完整的问题。  
   意义：提升了 WebUI 的基础交互完整性，降低用户在长对话中复制内容的摩擦。

### 整体推进判断

从这 3 个已关闭 PR 看，项目在今日至少完成了三类推进：
- **多模态消息正确性**：防止图像内容丢失；
- **WebUI 可用性**：增强复制、优化代码块展示；
- **用户体验一致性**：减少交互不连续带来的困扰。

综合来看，NanoBot 今天的进展更像是**“稳态增强”**：没有版本发布，但功能可靠性和前端体验都在补齐，属于对产品成熟度非常有价值的持续迭代。  
相关链接汇总：  
- PR #5008：<https://github.com/HKUDS/nanobot/pull/5008>  
- PR #5002：<https://github.com/HKUDS/nanobot/pull/5002>  
- PR #5001：<https://github.com/HKUDS/nanobot/pull/5001>

---

## 4. 社区热点

根据当前数据，**最活跃的讨论点集中在 Issue #5000**，其余 PR 未提供明确评论数，且反应数均为 0 或未显示，因此没有明显的“高评论/高反应爆点”。

### 热点 1：#5000 Proposal: evolve the current subagent system toward multi-agent collaboration
链接：<https://github.com/HKUDS/nanobot/issues/5000>  
- 评论：1  
- 反应：0  
- 状态：OPEN  
- 标签：enhancement

**背后诉求：**  
该 Issue 明确指出：当前 subagent 更像“后台任务委派”，而非真正的多智能体协作系统。用户希望引入：
- 持久化身份；
- 共享任务状态；
- 更强的协同与上下文共享；
- 从“单次执行”迈向“协作式智能体网络”。

**分析：**  
这不是局部功能请求，而是对 **Agent 架构范式** 的升级建议，说明社区里已经出现对更强“协作智能体”能力的期待。它可能会影响后续系统设计方向，属于**战略级需求**。

### 热点 2：#5006 / #5009 / #5003 等高优先级功能 PR
这些 PR 都是当日活跃但缺少评论/反应数据的重点项：
- #5006 guarded tool gateway：<https://github.com/HKUDS/nanobot/pull/5006>
- #5009 Feishu groupPolicy listen：<https://github.com/HKUDS/nanobot/pull/5009>
- #5003 WebUI SQLite history index：<https://github.com/HKUDS/nanobot/pull/5003>

**分析：**  
它们分别覆盖**通道扩展、消息上下文 ingest、性能优化**，说明社区和维护者的关注点不只在“新能力”，也在“能不能稳定扩展、能不能更快更省”。

---

## 5. Bug 与稳定性

以下按严重程度排序，均可视为今日的稳定性/修复重点：

### P1：#5004 fix(session): tolerate unsupported directory fsync
链接：<https://github.com/HKUDS/nanobot/pull/5004>  
- 问题：某些共享文件系统允许打开目录，但不支持目录 `fsync`，会导致会话保存流程异常。
- 影响：影响 session 持久化可靠性，属于**运行稳定性问题**。
- fix 状态：**已有修复 PR**（当前为 OPEN，仍在推进）。

### P1：#5005 fix(exec): allow scoped tmp cleanup commands
链接：<https://github.com/HKUDS/nanobot/pull/5005>  
- 问题：过于宽泛的 `rm` 拒绝规则会误伤一些合法的临时目录清理脚本。
- 影响：可能阻断测试/构建/清理脚本执行，属于**可用性与安全边界平衡问题**。
- fix 状态：**已有修复 PR**（当前为 OPEN，仍在推进）。

### P1：#5008 fix(providers): keep all images when merging consecutive multimodal user turns
链接：<https://github.com/HKUDS/nanobot/pull/5008>  
- 问题：连续多模态 `user` 消息合并时仅保留最后一张图，导致图片内容丢失。
- 影响：多图输入场景的核心数据正确性问题。
- fix 状态：**已关闭/修复**。

### P2：#5001 fix(webui): show copy action on every assistant message
链接：<https://github.com/HKUDS/nanobot/pull/5001>  
- 问题：复制按钮显示不完整，影响 WebUI 使用体验。
- fix 状态：**已关闭/修复**。

### P2：#5002 style(webui): simplify Markdown code blocks
链接：<https://github.com/HKUDS/nanobot/pull/5002>  
- 问题：并非崩溃类 bug，更偏向 UI 风格和可读性修整。
- fix 状态：**已关闭/修复**。

**结论：**  
今天真正值得关注的稳定性议题是 **session fsync 兼容性** 与 **exec 清理命令安全边界**，两者都属于 P1，且都已进入修复流程。多模态图像丢失问题则已被及时修复，说明项目在关键路径上的响应速度较快。

---

## 6. 功能请求与路线图信号

今天出现的路线图信号比较清晰，主要有以下几类：

### 1）多智能体协作方向
Issue #5000：<https://github.com/HKUDS/nanobot/issues/5000>  
这是最明确的长期能力诉求：从“subagent 任务执行”升级到“多智能体协作系统”。  
**判断：** 这是中长期架构演进信号，不太像一版内的局部修补，但可能会影响后续 agent 协同、状态共享、任务编排等模块的设计。

### 2）通道能力增强与工具网关
PR #5006：<https://github.com/HKUDS/nanobot/pull/5006>  
引入 guarded tool gateway，面向 channel 插件开放工具调用。  
**判断：** 这很像下一阶段的平台化能力，若稳定落地，可能成为核心扩展接口之一。  
**纳入下一版本概率：高**

### 3）Feishu 场景增强
PR #5009：<https://github.com/HKUDS/nanobot/pull/5009>  
支持 `groupPolicy: listen`，让群聊在不触发 LLM 的情况下积累上下文，等到 `@mention` 再响应。  
**判断：** 这是非常典型的真实场景优化，尤其适合企业 IM 集成。  
**纳入下一版本概率：高**

### 4）WebUI 性能与可扩展性
PR #5003：<https://github.com/HKUDS/nanobot/pull/5003>  
用 SQLite 索引会话历史，替代运行时 JSONL 读取，属于明显的性能升级。  
**判断：** 如果当前 WebUI 存在历史加载慢、分页重算重的问题，这个 PR 很可能进入近期版本。  
**纳入下一版本概率：高**

### 5）部署与安全文档补强
PR #5007：<https://github.com/HKUDS/nanobot/pull/5007>  
PR #5010：<https://github.com/HKUDS/nanobot/pull/5010>  
分别对应 Dokploy 一键部署模板与安全文档对 API Key 存储方式的推荐升级。  
**判断：** 这类内容通常会提升项目上手率与合规性，较可能随版本或文档迭代一起合入。  
**纳入下一版本概率：中高**

---

## 7. 用户反馈摘要

从今日可见的 Issue 讨论中，最能代表真实用户痛点的是 **#5000**：<https://github.com/HKUDS/nanobot/issues/5000>

### 归纳出的用户反馈
- **当前 subagent 的能力边界偏弱**：更像“工具型后台任务执行器”，不是“协同型智能体”。
- **缺少共享状态与持续身份**：用户希望多个 agent 之间能有连续记忆、任务上下文和角色协作。
- **用户对复杂任务编排有更高期待**：说明 NanoBot 已经开始被当作“多智能体平台”而不仅是单轮问答系统。

### 真实场景映射
这类需求通常出现在：
- 复杂研究/调研任务；
- 多步骤工作流；
- 分工明确的协同处理场景；
- 希望主 agent 只负责协调、子 agent 负责执行和反馈的应用。

### 满意/不满意点
- **满意点**：用户已经认可 NanoBot 具备 subagent 基础。
- **不满意点**：当前实现还不够“协作式”，难以支撑真正的多智能体工作流。

---

## 8. 待处理积压

基于当前仅有的 24 小时快照，**无法严格识别“长期未响应”的陈旧项**；但从维护优先级和当前状态看，以下 open 项应重点关注，避免积压扩大：

### 高优先级待处理项

1. **#5006 feat(channels): add guarded tool gateway**  
   <https://github.com/HKUDS/nanobot/pull/5006>  
   重要性：P1，涉及 channel 插件工具调用能力与安全边界。

2. **#5004 fix(session): tolerate unsupported directory fsync**  
   <https://github.com/HKUDS/nanobot/pull/5004>  
   重要性：P1，涉及会话持久化稳定性。

3. **#5005 fix(exec): allow scoped tmp cleanup commands**  
   <https://github.com/HKUDS/nanobot/pull/5005>  
   重要性：P1，涉及执行器安全策略与合法脚本兼容性。

4. **#5003 perf(webui): index conversation history in SQLite**  
   <https://github.com/HKUDS/nanobot/pull/5003>  
   重要性：P1，涉及 WebUI 历史加载性能。

5. **#5009 feat(feishu): add groupPolicy listen for context-only group ingest**  
   <https://github.com/HKUDS/nanobot/pull/5009>  
   重要性：P1，企业 IM 场景增强，用户价值明确。

6. **#5010 docs(security): recommend env-var references over plaintext API keys**  
   <https://github.com/HKUDS/nanobot/pull/5010>  
   重要性：P2，但对安全最佳实践很重要。

7. **#5000 Proposal: evolve the current subagent system toward multi-agent collaboration**  
   <https://github.com/HKUDS/nanobot/issues/5000>  
   重要性：架构方向性需求，建议尽早给出技术路线回复，避免社区期待悬而未决。

---

### 总体判断

NanoBot 今日表现出的是一种**“高活跃、稳修复、强扩展”**的健康态势：  
- 没有发布，但开发节奏并不慢；  
- 既有 **P1 级稳定性/安全性修复**，也有 **产品能力扩展**；  
- 社区最重要的声音开始从“功能可用”转向“多智能体协作与平台化能力”。  

如果你需要，我也可以把这份日报进一步整理成：
1. **适合公众号/邮件推送的简版**，或  
2. **适合内部周报的表格版**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

以下为 **2026-07-21 Hermes Agent 项目动态日报**（基于过去 24 小时 GitHub 数据）。

---

## 1) 今日速览

Hermes Agent 今天仍处于**高强度迭代**状态：过去 24 小时内有 **50 条 Issues 更新**、**50 条 PR 更新**，并且发布了 **1 个新版本**。  
从内容看，讨论重心明显集中在 **桌面端会话一致性、更新/安装稳定性、权限与凭据路由、以及多平台适配** 等“系统性问题”上，而不是单点小修小补。  
这说明项目活跃度很高，但同时也暴露出 **状态管理和跨模块耦合** 带来的稳定性压力。  
整体判断：**项目热度高、产出密集，但质量风险也在同步上升**，尤其是在 Desktop / Gateway / Cron / Auth 这几条关键链路上。

---

## 2) 版本发布

### 新版本：v2026.7.20 — Hermes Agent v0.19.0 “The Quicksilver Release”
- Release 链接：<https://github.com/NousResearch/hermes-agent/releases/tag/v2026.7.20>

### 已披露的发布规模
- 约 **2,245 commits**
- 约 **1,065 merged PRs**
- 约 **2,465 files changed**
- 约 **300,000 insertions / 36,000 deletions**
- 约 **3,300 issues closed**
- **450+ 社区贡献者**

### 发布解读
这不是一次普通的小版本，而是一次**大体量整合型发布**。从发布规模看，v0.19.0 更像是对前一阶段大量功能、修复、适配工作的集中落地。

### 破坏性变更 / 迁移注意事项
> 数据中未给出完整 breaking changes 清单，因此不能武断列出明确破坏性变更。  
但从今天暴露出来的后续问题看，升级后需要重点关注以下迁移风险：

1. **更新/安装链路稳定性**
   - 例如更新后“是否恢复本地修改”的选择会影响桌面端启动路径：  
     <https://github.com/NousResearch/hermes-agent/issues/68244>

2. **桌面端会话与数据库去重**
   - 多个 profile / alias / 冷启动恢复场景下，容易出现重复 session、重复 transcript。  
   - 相关修复已在 PR 中推进：  
     <https://github.com/NousResearch/hermes-agent/pull/68303>  
     <https://github.com/NousResearch/hermes-agent/pull/68288>

3. **插件与远程 gateway 兼容性**
   - 远程 gateway 模式下本地磁盘插件发现可能失效：  
     <https://github.com/NousResearch/hermes-agent/issues/68267>

4. **认证与 provider 配置迁移**
   - 凭据轮换/移除后，配置镜像可能未被完全清理：  
     <https://github.com/NousResearch/hermes-agent/pull/68295>

---

## 3) 项目进展

今天可见的 PR 动向说明项目在向 **“更稳的桌面体验 + 更可控的路由/权限 + 更强的工具集成”** 三个方向推进。

### 今日已关闭/完成的 PR
- **[#68305 fmt(js): `npm run fix` auto-fix](https://github.com/NousResearch/hermes-agent/pull/68305)**  
  典型的自动化格式修复，偏维护性。
- **[#68298 nix: add cage to devDeps](https://github.com/NousResearch/hermes-agent/pull/68298)**  
  主要是开发/测试环境补齐。

### 今日最有“项目推进感”的开放 PR
这些 PR 虽然未必已合并，但方向非常明确，能看出产品路线：

- **[#68303 fix(desktop): dedupe aliased profile databases](https://github.com/NousResearch/hermes-agent/pull/68303)**  
  解决桌面端 profile 数据库别名导致的重复聚合问题，直接改善会话列表一致性。
- **[#68288 fix(agent/comp/desktop): prevent duplicate transcript rows on cold resume + rotating compression](https://github.com/NousResearch/hermes-agent/pull/68288)**  
  针对冷恢复/旋转压缩导致的 transcript 重复，属于高优先级稳定性修复。
- **[#68289 fix: close gateway-lifecycle guard gaps in cron guard and execute_code](https://github.com/NousResearch/hermes-agent/pull/68289)**  
  直指 gateway 生命周期保护漏洞，和真实宕机风险相关。
- **[#68295 fix(credentials): scrub the keyed `providers` schema on rotate/remove](https://github.com/NousResearch/hermes-agent/pull/68295)**  
  提升认证/配置清理完整性，属于安全与可维护性基础工作。
- **[#68287 fix(desktop): restore selection Read Aloud + Look Up, add Translate](https://github.com/NousResearch/hermes-agent/pull/68287)**  
  桌面端交互体验增强，属于高感知 UX 改善。

### 总体推进判断
今天的 PR 组合显示：项目不是单纯在“加功能”，而是在**修复底层状态一致性问题**，这会直接提升后续版本稳定性。  
从公开数据看，今天至少有 **2 个 PR 已关闭**，另有多项高价值修复/特性在排队，说明项目仍保持较强交付节奏。

---

## 4) 社区热点

今天讨论最活跃的焦点，几乎全部围绕“**状态错乱/重复/路由错误**”展开。

### 热点 Issue
1. **[#68244](https://github.com/NousResearch/hermes-agent/issues/68244)** — 更新后不恢复本地修改，导致 dashboard / agent 启动异常  
   - 评论：4  
   - 关键词：更新流程、恢复本地修改、启动失败  
   - 诉求本质：用户担心“升级后直接把环境弄坏”。

2. **[#68261](https://github.com/NousResearch/hermes-agent/issues/68261)** — TUI skill 凭据提示被路由到错误 session  
   - 评论：3  
   - 关键词：多 session、secret prompt、进程级回调  
   - 诉求本质：多会话环境下的**隔离性**必须可靠。

3. **[#68098](https://github.com/NousResearch/hermes-agent/issues/68098)** — Desktop 上 agent-authored views / contribution-driven shell  
   - 评论：3  
   - 关键词：可批准、可持久化、可摆放的交互视图  
   - 诉求本质：用户希望 Hermes 不只是聊天，而是**能生成可操作的桌面工作面板**。

4. **[#68196](https://github.com/NousResearch/hermes-agent/issues/68196)** — 冷恢复 + rotating preflight compression 导致 transcript 重复  
   - 评论：2  
   - 关键词：冷启动恢复、SQLite 持久化重复  
   - 诉求本质：用户对“历史记录正确性”非常敏感。

5. **[#68138](https://github.com/NousResearch/hermes-agent/issues/68138)** — Slack thread-context 跳过 blocks/attachments  
   - 评论：2  
   - 关键词：Grafana 告警、blocks/attachments、线程上下文丢失  
   - 诉求本质：企业消息集成需要**适配真实消息结构**，不能只看 text 字段。

6. **[#68128](https://github.com/NousResearch/hermes-agent/issues/68128)** — WhatsApp bridge 在 Windows job object 下启动失败  
   - 评论：2  
   - 关键词：WinError 5、breakaway job object、Windows 兼容  
   - 诉求本质：平台兼容性仍是 Hermes 的重要门槛。

### 热点结论
今天的讨论热点不是“喜欢某个新功能”，而是更偏向：
- 会话/线程是否会串
- 更新是否会把环境弄坏
- 多平台消息是否会丢
- Windows / Desktop / gateway 是否能稳定工作

这是一种非常典型的 **高活跃开源项目成熟期信号**：  
功能需求多，但社区最敏感的其实是 **可靠性**。

---

## 5) Bug 与稳定性

以下按严重度/影响面排序：

### P1 / 高危

1. **[#68178](https://github.com/NousResearch/hermes-agent/issues/68178)** — 自动更新在 live desktop backend 上重写源代码，导致 commit splice、会话损坏  
   - 影响：极高，涉及运行中源码被替换  
   - 状态：**已有修复方向**，对应 PR：  
     **[#68289](https://github.com/NousResearch/hermes-agent/pull/68289)**（gateway 生命周期守护修复，和该类风险强相关）

2. **[#68196](https://github.com/NousResearch/hermes-agent/issues/68196)** — 冷恢复 + 压缩导致 transcript 持久化重复  
   - 影响：高，属于数据污染  
   - 状态：**已有直接修复 PR**  
     **[#68288](https://github.com/NousResearch/hermes-agent/pull/68288)**

### P2 / 中高危

3. **[#68300](https://github.com/NousResearch/hermes-agent/issues/68300)** — `system_prompt.py` 与 `prompt_builder.py` 的跨模块导入导致版本非原子  
   - 影响：中高，release/拉取窗口中可能直接崩  
   - 状态：**暂无明显对应 fix PR**

4. **[#68261](https://github.com/NousResearch/hermes-agent/issues/68261)** — TUI skill credential prompts 路由到错误 session  
   - 影响：中高，属于隐私/会话隔离问题  
   - 状态：**暂无明确 fix PR**

5. **[#68244](https://github.com/NousResearch/hermes-agent/issues/68244)** — 更新时选择不恢复本地修改后，dashboard 和 agent 启动异常  
   - 影响：中高，影响升级路径  
   - 状态：**暂无明确 fix PR**

6. **[#68257](https://github.com/NousResearch/hermes-agent/issues/68257)** — Responses API 里 conversation history 指数级膨胀  
   - 影响：中高，可能造成成本和延迟失控  
   - 状态：**暂无明确 fix PR**

7. **[#68163](https://github.com/NousResearch/hermes-agent/issues/68163)** — bootstrap-installer 缓存损坏后会一直复用，导致安装失败  
   - 影响：中高，安装链路受阻  
   - 状态：**暂无明确 fix PR**

### P3 / 低到中危，但数量不少

8. **[#68302](https://github.com/NousResearch/hermes-agent/issues/68302)** — sidebar 里点击 session 无效  
   - 影响：中低，但直接影响可用性  
   - 状态：**暂无明确 fix PR**

9. **[#68286](https://github.com/NousResearch/hermes-agent/issues/68286)** — 连续下发两个命令时动作混在一起  
   - 影响：中低，但会显著损害用户对 agent 的信任  
   - 状态：**暂无明确 fix PR**

10. **[#68137](https://github.com/NousResearch/hermes-agent/issues/68137)** — one-shot 模式在 MCP discovery 未完成前就构建 agent，慢服务器被丢弃  
   - 影响：中低，但会造成工具缺失  
   - 状态：**暂无明确 fix PR**

---

## 6) 功能请求与路线图信号

今天的新需求非常多，但有几条信号特别明确，可能进入下一轮版本窗口。

### 最有可能进入下一版本的方向

1. **桌面端交互增强**
   - **[#68287](https://github.com/NousResearch/hermes-agent/pull/68287)**：恢复 Read Aloud / Look Up，并增加 Translate  
   - **[#68283](https://github.com/NousResearch/hermes-agent/pull/68283)**：安全的 code-client deep links  
   - **[#68268](https://github.com/NousResearch/hermes-agent/issues/68268)**：文件预览中直接 Open in Codex / Claude Code  
   这些需求都围绕“桌面端更像一个工作台”展开，优先级很高。

2. **会话/路由/多 surface 统一**
   - **[#68301](https://github.com/NousResearch/hermes-agent/issues/68301)**：桌面与 Telegram 镜像同一会话  
   - **[#68172](https://github.com/NousResearch/hermes-agent/issues/68172)**：按 channel/team ID 路由到 profile  
   - **[#68098](https://github.com/NousResearch/hermes-agent/issues/68098)**：agent-authored views  
   说明社区正在把 Hermes 从“单一聊天代理”推向“多入口统一会话系统”。

3. **定制化编排与成本控制**
   - **[#68304](https://github.com/NousResearch/hermes-agent/pull/68304)**：named delegation routes  
   - **[#68296](https://github.com/NousResearch/hermes-agent/pull/68296)**：controller-first cost router  
   - **[#68290](https://github.com/NousResearch/hermes-agent/pull/68290)**：OpenRouter usage 按 job 归因  
   这些都是企业/团队用户会非常看重的能力，尤其是成本与职责可追踪。

4. **桌面端结构化能力**
   - **[#68306](https://github.com/NousResearch/hermes-agent/pull/68306)**：widget-app SDK  
   - **[#68100](https://github.com/NousResearch/hermes-agent/issues/68100)** / **[#68101](https://github.com/NousResearch/hermes-agent/issues/68101)** / **[#68102](https://github.com/NousResearch/hermes-agent/issues/68102)** / **[#68103](https://github.com/NousResearch/hermes-agent/issues/68103)**  
   这组议题表明 Hermes 正在探索“可编排 UI / 可生成视图”的产品形态。

### 路线图判断
如果这些 PR 继续推进，下一版本很可能会优先覆盖：
- 桌面端体验增强
- 会话列表/路由一致性修复
- 权限、安全边界和生命周期 guard
- 成本可观测性与路由策略

---

## 7) 用户反馈摘要

从 Issues 评论内容可以提炼出几个真实痛点：

### 1. 用户在乎“升级后是否还能正常用”
- 例如 **[#68244](https://github.com/NousResearch/hermes-agent/issues/68244)** 提到升级后选择“不恢复本地修改”会导致 dashboard 消失、agent 无法启动。  
- 这说明用户对更新非常敏感，且一旦升级链路出错，会立刻影响主流程。

### 2. 用户需要“多会话隔离”而不是“偶发串台”
- **[#68261](https://github.com/NousResearch/hermes-agent/issues/68261)** 显示多个 session 共用 gateway 时，credential prompt 可能发错对象。  
- 对用户而言，这不是小 bug，而是**隐私和工作流失控**。

### 3. 用户希望 Hermes 更像“工作台”，不只是聊天框
- **[#68098](https://github.com/NousResearch/hermes-agent/issues/68098)**、**[#68268](https://github.com/NousResearch/hermes-agent/issues/68268)**、**[#68306](https://github.com/NousResearch/hermes-agent/pull/68306)** 都指向“可生成、可嵌入、可继续工作的界面”。  
- 说明用户希望 Hermes 能承载真实工作，而不是只做对话。

### 4. 企业集成用户非常在意消息上下文完整性
- **[#68138](https://github.com/NousResearch/hermes-agent/issues/68138)** 的 Grafana alert blocks/attachments 被忽略，说明实际业务消息并不总是 `text`。  
- 用户需要 Hermes 正确读取真实世界消息结构，否则会“看见了消息，却理解错上下文”。

### 5. Windows / 安装 / 跨平台兼容仍是痛点
- **[#68128](https://github.com/NousResearch/hermes-agent/issues/68128)**、**[#68163](https://github.com/NousResearch/hermes-agent/issues/68163)** 都表明安装和系统兼容问题会直接阻断使用。  
- 这类问题虽然不“性感”，但对留存影响最大。

### 总体反馈倾向
用户对 Hermes 的期待很高：  
**能多平台接入、能做更复杂工作、能记住上下文、能稳定升级。**  
不满意的地方也很一致：  
**会话串扰、状态重复、安装不稳、路由不准。**

---

## 8) 待处理积压

以下是今天最值得维护者优先关注的积压项：

### 高优先级未解决 Issue
- **[#68300](https://github.com/NousResearch/hermes-agent/issues/68300)** — 版本发布非原子，潜在 ImportError
- **[#68261](https://github.com/NousResearch/hermes-agent/issues/68261)** — 凭据 prompt 路由错 session
- **[#68244](https://github.com/NousResearch/hermes-agent/issues/68244)** — 更新后启动异常
- **[#68286](https://github.com/NousResearch/hermes-agent/issues/68286)** — 连续命令动作混淆
- **[#68302](https://github.com/NousResearch/hermes-agent/issues/68302)** — sidebar session 点击失效

### 仍在排队但方向明确的 PR
- **[#68308](https://github.com/NousResearch/hermes-agent/pull/68308)** — reasoning tokens 计费修正
- **[#68306](https://github.com/NousResearch/hermes-agent/pull/68306)** — widget-app SDK
- **[#68304](https://github.com/NousResearch/hermes-agent/pull/68304)** — named delegation routes
- **[#68303](https://github.com/NousResearch/hermes-agent/pull/68303)** — profile DB 去重
- **[#68295](https://github.com/NousResearch/hermes-agent/pull/68295)** — credentials schema scrub
- **[#68289](https://github.com/NousResearch/hermes-agent/pull/68289)** — gateway 生命周期 guard

### 维护建议
当前积压的共同特征是：**都不是单点 UI 问题，而是影响运行稳定性、会话一致性、升级路径和权限边界的基础设施问题。**  
建议维护者在后续 triage 中优先：
1. 收敛 update / install / release 原子性问题  
2. 清理 session / transcript / profile 去重逻辑  
3. 强化 gateway 生命周期 guard  
4. 统一 auth / provider 配置镜像规则  
5. 对 Desktop 多视图和多 session 做更严格隔离测试

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发到 Slack/飞书的精简版**
2. **适合内部周报的分析版**
3. **适合 GitHub README/Notion 的 Markdown 版**

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

以下为 **PicoClaw（sipeed/picoclaw）截至 2026-07-21 的项目动态日报**。本期无新版本发布。

---

## 1. 今日速览

过去 24 小时内，PicoClaw 维持了较高的开发活跃度：**Issue 更新 5 条、PR 更新 4 条**，但**没有新 Release**，说明项目当前仍处于持续迭代和问题修复阶段，而非版本收敛发布期。  
从内容看，讨论焦点集中在 **Antigravity provider、OAuth 登录、配置持久化、Launcher 的系统服务部署兼容性**，这些都属于直接影响可用性和稳定性的议题。  
与此同时，PR 侧也在推进 **日语本地化、默认模型名刷新、TTS/音频能力扩展**，显示项目在修复底层问题的同时，仍持续扩展产品能力。  
整体判断：**活跃度高，工程推进明确，但当前压力更多来自稳定性回归与部署兼容性，而不是功能停滞。**

---

## 2. 项目进展

### 已关闭的重要 PR
- **[#3277 fix(tools): deferred-tool visibility heal + sliding TTL + SSE tool-call index fix](https://github.com/sipeed/picoclaw/pull/3277)**  
  该 PR 关注的是工具发现、TTL 失效、SSE 工具调用索引错位等底层稳定性问题。虽然当前状态为 **CLOSED**，但从标题看，这类修复对长会话、多工具调用场景非常关键，能够减少“模型以为工具可用、实际请求中却缺失”的失配风险。

### 仍在推进的 PR
- **[#3273 feat(webui): add Japanese (ja) localization](https://github.com/sipeed/picoclaw/pull/3273)**  
  推进 WebUI 国际化，直接响应社区需求（见 Issue #3272）。  
- **[#3271 chore(providers): update default model names to 2026-07 latest](https://github.com/sipeed/picoclaw/pull/3271)**  
  属于维护型更新，降低因旧模型名导致的配置失效风险。  
- **[#3270 feat: add DashScope TTS provider and WeChat audio file sending](https://github.com/sipeed/picoclaw/pull/3270)**  
  扩展语音与消息通道能力，体现项目在多模态/消息集成方向的继续投入。

### 今日推进概况
从今天的 PR 结构看，项目并非只是在“修 bug”，而是同时推进了三条线：  
1. **稳定性修复**（#3277）  
2. **本地化与可用性**（#3273）  
3. **平台能力扩展**（#3270、#3271）  

这意味着 PicoClaw 当前的演进方向较均衡：**底层可靠性 + 用户可达性 + 生态扩展** 三线并行。

---

## 3. 社区热点

### 今日最活跃讨论
- **[#3274 [BUG] Antigravity provider: INVALID_ARGUMENT on main](https://github.com/sipeed/picoclaw/issues/3274)**  
  评论数：1  
  这是今日最典型的“回归/兼容性”问题，用户明确指出相较于 v0.3.1 出现退化，且 `tool_schema_transform "simple"` 已不足以满足新 provider 需求。

- **[#3275 [BUG] model_list entry loses api_keys after config rewrites](https://github.com/sipeed/picoclaw/issues/3275)**  
  评论数：1  
  该问题虽然已关闭，但讨论非常具有代表性：Launcher WebUI / auth login 的配置重写会丢失 `api_keys` 等字段，直接触发用户对“配置是否安全持久化”的担忧。

### 热点背后的诉求
这两条讨论反映出社区最关心的不是单纯“能不能用”，而是：  
- **新 provider 是否能稳定接入**
- **配置修改后是否会破坏用户已有设置**
- **自动化 / WebUI 是否适合长期运维场景**

### 热点链接
- [Issue #3274](https://github.com/sipeed/picoclaw/issues/3274)
- [Issue #3275](https://github.com/sipeed/picoclaw/issues/3275)

---

## 4. Bug 与稳定性

按严重程度排序如下：

### 1) 高严重度：Antigravity OAuth 登录被 Google 阻断
- **[#3278 [BUG] Antigravity OAuth login now blocked by Google](https://github.com/sipeed/picoclaw/issues/3278)**  
  现象：Google 直接拒绝登录，提示应用“不符合 OAuth 2.0 安全政策”。  
  影响：**认证链路被阻断，属于硬失败**，会直接影响该 provider 的可用性。  
  修复状态：**当前快照未见直接关联 fix PR**。

### 2) 中高严重度：Antigravity provider 在 main 分支返回 INVALID_ARGUMENT
- **[#3274 [BUG] Antigravity provider: INVALID_ARGUMENT on main](https://github.com/sipeed/picoclaw/issues/3274)**  
  现象：在 `main @ 85dcfcca` 上出现回归，作者明确提到相较于 v0.3.1 发生退化。  
  影响：**新 provider 能力不稳定，且已出现版本回归特征**。  
  修复状态：**未见直接对应 fix PR**。

### 3) 中等严重度：配置重写导致 api_keys 等字段丢失
- **[#3275 [BUG] model_list entry loses api_keys after config rewrites](https://github.com/sipeed/picoclaw/issues/3275)**  
  现象：Launcher WebUI / auth login 后重写 `config.json`，`model_list` 条目中的 `api_keys` 等字段被清空。  
  影响：这属于**配置数据破坏**，对多模型、多密钥用户影响较大。  
  状态：**已关闭**，但当前数据中未看到明确的修复 PR 关联。

### 4) 中等严重度：Launcher 不适配外部托管 gateway / 未知 channel 类型硬失败
- **[#3276 [Feature] Launcher: support/detect an externally-managed gateway](https://github.com/sipeed/picoclaw/issues/3276)**  
  严格来说是功能请求，但其背后是**部署稳定性和运维体验问题**：  
  在 systemd 托管的 headless 环境中，Launcher 假定自己管理 gateway 生命周期，容易引发冲突。  
  修复状态：**未见直接 fix PR**。

### 相关稳定性补丁
- **[#3277 PR](https://github.com/sipeed/picoclaw/pull/3277)** 虽已关闭，但它针对工具可见性、TTL 和 SSE 索引的修复，属于能提升整体稳定性的基础性工作。

---

## 5. 功能请求与路线图信号

### 1) 日语本地化：需求明确，且已有 PR 落地
- **Issue:** [#3272 Add Japanese localization to PicoClaw WebUI and Launcher](https://github.com/sipeed/picoclaw/issues/3272)  
- **PR:** [#3273 feat(webui): add Japanese (ja) localization](https://github.com/sipeed/picoclaw/pull/3273)  

**路线图信号：强。**  
这是“用户提出需求 -> 立即出现实现 PR”的典型信号，优先级较高，且变更风险相对可控。若审查顺利，较可能进入下一版。

### 2) 默认模型名刷新：维护型升级，落地概率高
- **PR:** [#3271 chore(providers): update default model names to 2026-07 latest](https://github.com/sipeed/picoclaw/pull/3271)  

**路线图信号：强。**  
此类更新通常是低风险、必要性高，能减少配置漂移和 provider 兼容问题，适合快速合并。

### 3) DashScope TTS + 微信音频发送：增强型功能，扩展生态边界
- **PR:** [#3270 feat: add DashScope TTS provider and WeChat audio file sending](https://github.com/sipeed/picoclaw/pull/3270)  

**路线图信号：中强。**  
如果项目希望强化“AI 助手 + 多渠道输出”的定位，这个方向很契合。它更像是功能增强，而非基础修复，因此可能需要更多测试和集成验证。

### 4) Launcher 支持外部托管 gateway：偏运维场景的重要增强
- **Issue:** [#3276](https://github.com/sipeed/picoclaw/issues/3276)  

**路线图信号：中。**  
这是典型的“生产部署需求”，对 headless / systemd 用户非常关键，若项目希望提升服务器侧可部署性，这个需求值得纳入中期路线图。

---

## 6. 用户反馈摘要

从今天的 Issues 可以提炼出几条非常真实的用户痛点：

1. **新 provider 接入时，兼容性和错误信息很敏感**  
   - 代表：[#3274](https://github.com/sipeed/picoclaw/issues/3274)、[#3278](https://github.com/sipeed/picoclaw/issues/3278)  
   - 用户期待：provider 一旦接入，应尽量避免认证、schema、参数格式上的硬失败。

2. **配置持久化必须“无损”**  
   - 代表：[#3275](https://github.com/sipeed/picoclaw/issues/3275)  
   - 用户非常在意 WebUI / 登录流程是否会悄悄改写并丢掉自定义字段，尤其是 `api_keys` 这类敏感配置。

3. **真实使用场景包括 headless / systemd / 服务器长期运行**  
   - 代表：[#3276](https://github.com/sipeed/picoclaw/issues/3276)  
   - 说明 PicoClaw 不只是桌面或本地工具，还被用于可持续运行的服务化部署。

4. **国际化需求开始显性化**  
   - 代表：[#3272](https://github.com/sipeed/picoclaw/issues/3272)  
   - 日本语本地化请求说明项目已进入更广泛的非英语使用场景。

### 用户满意/不满意点
- **满意点**：用户愿意继续使用并反馈，说明项目功能吸引力仍在。
- **不满意点**：主要集中在 **“新功能引入后稳定性下降”**、**“配置被重写破坏”**、**“部署场景假设过强”**。

---

## 7. 待处理积压

严格意义上，**当前没有明显“长期积压”**，因为所有列出的 Issue / PR 基本都在 **2026-07-20** 新近创建或更新。  
但从风险优先级看，以下开放项如果继续滞留，最容易演化为下一阶段的积压：

### 高优先级开放 Issue
- **[#3278 Antigravity OAuth 被 Google 阻断](https://github.com/sipeed/picoclaw/issues/3278)**  
  认证链路被硬拦截，优先级最高。
- **[#3274 Antigravity provider INVALID_ARGUMENT 回归](https://github.com/sipeed/picoclaw/issues/3274)**  
  直接影响 provider 可用性，且带有回归属性。
- **[#3276 Launcher 外部 gateway 支持](https://github.com/sipeed/picoclaw/issues/3276)**  
  对生产部署用户影响较大，建议尽早明确方案。

### 值得尽快合并/评审的 PR
- **[#3273 日语本地化](https://github.com/sipeed/picoclaw/pull/3273)**  
- **[#3271 默认模型名更新](https://github.com/sipeed/picoclaw/pull/3271)**  
- **[#3270 DashScope TTS / 微信音频](https://github.com/sipeed/picoclaw/pull/3270)**  

这些 PR 要么能直接提升用户体验，要么能减少配置和 provider 兼容风险，适合在近期版本中尽快推进。

---

### 总体结论
PicoClaw 今日呈现出典型的“**高活跃开发期**”特征：一边处理 provider、认证和配置持久化等关键稳定性问题，一边继续推进本地化与多模态能力扩展。  
如果后续能优先解决 **Antigravity 相关回归、OAuth 阻断、配置无损写回** 这三类问题，项目健康度会明显提升；反之，这些问题可能成为用户体验和信任度的主要风险点。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-07-21）

## 1) 今日速览
过去 24 小时，NanoClaw 维持了**中高活跃度**：共有 6 条 Issues 更新、10 条 PR 更新，且已有 3 个 PR 进入已关闭/合并状态，说明代码层面仍在持续推进。  
今天的讨论与开发重心明显集中在两条主线：一是**权限/审批安全**，二是**多渠道接入与兼容性修复**（WhatsApp、iMessage、LINE）。  
从更新结构看，项目不是在冲一个大版本，而是在做一轮密集的**稳定性补洞与能力扩展**。  
当前没有新 Release，意味着这些变更大概率仍处于迭代整合阶段，尚未形成对外发布节奏。  
项目整体健康度：**开发活跃、问题导向明确，但安全与迁移类风险需要优先收敛**。  
参考： [NanoClaw 仓库](https://github.com/qwibitai/nanoclaw)

---

## 2) 项目进展
今日最重要的已关闭/合并 PR，主要推动了以下几类能力：

1. **容器/工具链内置化**
   - [#3110 feat(container): bake caldav-mcp into the agent image](https://github.com/qwibitai/nanoclaw/pull/3110)  
   将 `caldav-mcp` 预置进 agent 镜像，说明项目在朝“开箱即用”的 agent 运行环境推进，减少外部依赖漂移。

2. **入站附件兼容性修复**
   - [#3108 fix(chat-sdk-bridge): rehydrate inbound attachments when adapters carry no fetchData](https://github.com/qwibitai/nanoclaw/pull/3108)  
   补齐某些 adapter 不提供 `fetchData` 时的附件恢复逻辑，提升消息附件处理鲁棒性。
   - 这类修复对 iMessage / 本地文件存储类场景尤其关键，减少“只看到文件名、拿不到文件内容”的问题。

3. **WhatsApp Cloud 迁移兼容**
   - [#3107 fix, core-team: copy the adoption module and document the row re-key](https://github.com/qwibitai/nanoclaw/pull/3107)  
   - [#3106 fix(whatsapp-cloud): adopt messaging_groups rows stranded by the instance re-key](https://github.com/qwibitai/nanoclaw/pull/3106)  
   这组 PR 直指升级/重键后数据挂起的问题，属于典型的“已有安装升级兼容”修复，能显著降低升级后消息中断风险。

**整体推进判断：**  
今天的合并/关闭内容并非大功能上线，而是围绕**运行稳定性、兼容性、安装升级可持续性**做了实质补强。对项目来说，这类变更的价值很高：它们直接降低生产环境故障率，并为后续通道扩展打底。  
相关链接： [#3110](https://github.com/qwibitai/nanoclaw/pull/3110) ｜ [#3108](https://github.com/qwibitai/nanoclaw/pull/3108) ｜ [#3107](https://github.com/qwibitai/nanoclaw/pull/3107) ｜ [#3106](https://github.com/qwibitai/nanoclaw/pull/3106)

---

## 3) 社区热点
> 说明：当前快照里，Issues/PR 的评论数和反应数整体偏低，因此“热点”更像是**高关注议题**而非高讨论热度。PR 的评论统计为未提供，无法做严格排名。

### 最活跃 Issue
- [#3096 feat: Add /add-line skill for LINE Official Account channel support](https://github.com/qwibitai/nanoclaw/issues/3096)  
  这是当前唯一明确有评论的 Issue（1 条评论），也是最清晰的新功能诉求。  
  **诉求背后：** LINE 在日本、台湾、泰国等市场是核心通讯工具，用户希望通过 `/add-line` 直接纳入官方账号通道，说明 NanoClaw 的渠道扩展需求正在向亚太主流 IM 平台外溢。

### 高关注 PR 议题（按主题，不按评论数）
- [#3106 WhatsApp Cloud 迁移修复](https://github.com/qwibitai/nanoclaw/pull/3106)
- [#3104 关闭最后一个 owner 的风险控制](https://github.com/qwibitai/nanoclaw/pull/3104)
- [#3103 审批路由的权限比例与目标排除修复](https://github.com/qwibitai/nanoclaw/pull/3103)
- [#3102 结构化角色变更审批卡片](https://github.com/qwibitai/nanoclaw/pull/3102)
- [#3101 角色授予/撤销要求显式 scope](https://github.com/qwibitai/nanoclaw/pull/3101)

**分析：**  
今天没有明显的“社区舆情爆点”，但可以看出项目关注重心非常集中：  
- 一边是**新通道需求**（LINE）；  
- 另一边是**权限与审批安全**（role grant/revoke、owner、approval routing）；  
- 还有一条明显的工程线是**消息与附件兼容性**。  
这意味着社区对 NanoClaw 的期待已从“能用”转向“可安全地规模化使用”。

---

## 4) Bug 与稳定性
按严重程度排序如下：

### 1. 高危：权限/信任根与审批安全问题
- [#3100 Revoking the sole remaining owner is not prevented](https://github.com/qwibitai/nanoclaw/issues/3100)  
  风险：可能删除最后一个 owner，导致系统失去 root of trust。  
  对应修复：[#3104](https://github.com/qwibitai/nanoclaw/pull/3104)
- [#3099 Approval routing ignores privilege and can route a role-change to its own target](https://github.com/qwibitai/nanoclaw/issues/3099)  
  风险：审批可能发给被变更对象本人，存在自批/低权限审批高权限操作的隐患。  
  对应修复：[#3103](https://github.com/qwibitai/nanoclaw/pull/3103)
- [#3097 Role grant silently confers GLOBAL admin when --group is omitted](https://github.com/qwibitai/nanoclaw/issues/3097)  
  风险：缺少显式 scope 时默认为全局 admin，容易造成误操作和权限扩散。  
  对应修复：[#3101](https://github.com/qwibitai/nanoclaw/pull/3101)
- [#3098 Approval cards for ncl commands echo the raw command line, not the effect](https://github.com/qwibitai/nanoclaw/issues/3098)  
  风险：审批信息不够结构化，容易让审批者误判操作后果。  
  对应修复：[#3102](https://github.com/qwibitai/nanoclaw/pull/3102)

### 2. 中高危：升级迁移导致消息链路失效
- [#3105 whatsapp-cloud: upgrading an existing install strands its messaging_groups rows](https://github.com/qwibitai/nanoclaw/issues/3105)  
  风险：已有安装升级后，WhatsApp 消息可能被“静默屏蔽”。  
  对应修复：[#3106](https://github.com/qwibitai/nanoclaw/pull/3106) / [#3107](https://github.com/qwibitai/nanoclaw/pull/3107)

### 3. 中危：入站附件在本地模式下不可恢复
- [#3109 fix(channels/imessage): read inbound attachment bytes in local mode (HEIC→JPEG)](https://github.com/qwibitai/nanoclaw/pull/3109)  
  当前表现：iMessage 附件在本地模式下只拿到文件名，实际字节未正确读取。  
  关联修复信号：[#3108](https://github.com/qwibitai/nanoclaw/pull/3108) 已关闭，覆盖“无 fetchData 的附件恢复”场景，但 #3109 仍在开放状态，说明 iMessage 场景可能还有定向补丁需求。

**稳定性判断：**  
今天暴露出的缺陷多数不是“普通 bug”，而是会直接影响**权限安全、升级可用性、消息接收完整性**的核心问题。好消息是：对应修复 PR 已经成组出现，说明维护团队响应速度较快。

---

## 5) 功能请求与路线图信号
### 明确的新功能需求
- [#3096 Add /add-line skill for LINE Official Account channel support](https://github.com/qwibitai/nanoclaw/issues/3096)  
  这是今天最明确的功能请求，且具有很强的区域市场价值。  
  **路线图信号：** LINE 很可能会进入后续“渠道扩展”优先级列表，尤其如果项目继续面向日本/台湾/泰国用户场景。

### 与下一版本关系更强的方向
- [#3109 iMessage 附件处理](https://github.com/qwibitai/nanoclaw/pull/3109)  
  更偏“能力补齐/体验完善”，如果修复完成，会提升多媒体消息的可用性。
- [#3110 caldav-mcp 内置镜像](https://github.com/qwibitai/nanoclaw/pull/3110)  
  表明项目也在扩展 agent 工具生态，不只是在做聊天通道。

### 版本优先级判断
如果按“对下一版本的实际影响”排序，当前最可能优先进入发布包的是：
1. **权限/审批安全修复**（#3101–#3104）
2. **WhatsApp 升级兼容修复**（#3106/#3107）
3. **附件入站恢复与 iMessage 处理增强**（#3108/#3109）
4. **LINE 通道技能新增**（#3096）

相关链接： [#3096](https://github.com/qwibitai/nanoclaw/issues/3096) ｜ [#3101](https://github.com/qwibitai/nanoclaw/pull/3101) ｜ [#3109](https://github.com/qwibitai/nanoclaw/pull/3109)

---

## 6) 用户反馈摘要
> 说明：当前快照中 Issues 评论很少，因此以下主要基于 Issue/PR 描述抽取真实用户痛点，而非完整评论线程。

### 真实痛点
- **“我要的不是通用聊天通道，而是本地主流通道”**  
  来自 [#3096](https://github.com/qwibitai/nanoclaw/issues/3096)：用户明确需要 LINE Official Account 支持，说明 NanoClaw 正在被用于地区化通讯集成，而非单一全球通道。
- **“升级不能把老系统弄哑火”**  
  来自 [#3105](https://github.com/qwibitai/nanoclaw/issues/3105)：升级后 WhatsApp 消息链路失效属于生产事故级体验问题，用户关心的是兼容迁移，而不是仅仅能否新装成功。
- **“审批要让我看懂效果，不要只给我命令”**  
  来自 [#3098](https://github.com/qwibitai/nanoclaw/issues/3098)：审批者需要的是业务影响，而不是原始 CLI 文本。
- **“权限变更必须显式、保守、不可误触”**  
  来自 [#3097](https://github.com/qwibitai/nanoclaw/issues/3097) 与 [#3100](https://github.com/qwibitai/nanoclaw/issues/3100)：用户对角色管理的预期是最小惊讶原则和可回滚信任边界。
- **“附件不是链接或文件名，而是可读内容”**  
  来自 [#3109](https://github.com/qwibitai/nanoclaw/pull/3109) / [#3108](https://github.com/qwibitai/nanoclaw/pull/3108)：用户希望系统能稳定提取实际字节，尤其在本地存储模式下。

### 满意/不满意倾向
- 满意点：项目对问题响应快，安全与兼容性修复已经形成连续 PR 链。  
- 不满意点：当前审批、权限与升级路径存在“默认不够安全/不够明确”的体验缺口。  
- 使用场景：面向企业/团队的代理式通信系统，强调权限隔离、审批流、以及多渠道消息可靠性。

---

## 7) 待处理积压
> 本快照未显示“长期未响应”的明显老 Issue/PR；大多数条目都在 2026-07-20 创建或更新，说明积压并不深，但**高优先级未合并项**仍不少。

### 需要维护者持续盯住的未决项
- [#3101 显式 scope 的角色授予/撤销](https://github.com/qwibitai/nanoclaw/pull/3101)
- [#3102 结构化审批卡片](https://github.com/qwibitai/nanoclaw/pull/3102)
- [#3103 权限比例正确的审批路由](https://github.com/qwibitai/nanoclaw/pull/3103)
- [#3104 禁止撤销最后一个 owner](https://github.com/qwibitai/nanoclaw/pull/3104)
- [#3106 WhatsApp Cloud 迁移修复](https://github.com/qwibitai/nanoclaw/pull/3106)
- [#3109 iMessage 本地附件读取](https://github.com/qwibitai/nanoclaw/pull/3109)
- [#3096 LINE 官方账号支持](https://github.com/qwibitai/nanoclaw/issues/3096)

### 维护建议
- **优先级 1：** 先把权限与审批安全链路收口，避免 root of trust 与自批风险继续暴露。  
- **优先级 2：** 再稳住 WhatsApp 升级兼容，避免存量安装被“静默断联”。  
- **优先级 3：** 处理 iMessage/附件与 LINE 扩展，增强多渠道可用性。  

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合 Slack/飞书推送的短版**，或  
2. **带“风险评级 + 优先级表格”的管理层版**。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-07-21）

## 1) 今日速览
过去 24 小时内，IronClaw 共有 **36 条 Issues 更新**、**48 条 PR 更新**，整体处于**高活跃度**状态，且开发重心明显偏向“重构/迁移/收敛架构”而非单纯功能扩展。  
今日没有新版本发布，但多个关键 PR 指向 **v1 旧栈（Tier B / `src/`）退役后的收尾**，说明项目正处在从旧体系向 Reborn 体系切换的关键窗口。  
从问题分布看，社区与维护者同时在推进 **可用性修复、稳定性回归、权限/安全边界收紧**，以及 **WebUI / onboarding / MCP / extensions** 等新能力铺设。  
总体判断：项目健康度较高，工程推进强劲，但当前正承受“架构大迁移 + 日常 Bug Bash”双重压力，短期内仍会持续出现 UX 与兼容性类反馈。

---

## 2) 版本发布
**今日无新版本发布**。  
- Releases：无  
- 最新发布：无

> 但值得注意的是，已有多条 PR 在为 `1.0.0-rc.1` 及其发布链路做准备，说明发布窗口正在逼近，但尚未形成正式新版本。

---

## 3) 项目进展
今日最重要的进展来自一批 **已合并/已关闭 PR**，核心主题是：**清理 v1 旧代码、收敛运行时路径、为 Reborn 迁移扫清障碍**。

### 关键合并/关闭 PR
1. **删除 v1 旧单体并切换部署到 Reborn**  
   - PR：[#6375](https://github.com/nearai/ironclaw/pull/6375)  
   - 这是今日最重磅的变更之一，直接移除了 `src/` 旧 monolith，并将部署配置切向 Reborn。  
   - 意义：这不是普通重构，而是**路线切换级别**的里程碑。

2. **Decouple reborn migration from legacy**  
   - PR：[#6368](https://github.com/nearai/ironclaw/pull/6368)  
   - 让 v1→Reborn 迁移工具不再依赖 `ironclaw_legacy`，减少 Tier B 降级残留。

3. **移除 local_trigger_access，减少 deployment-type 泄漏**  
   - PR：[#6374](https://github.com/nearai/ironclaw/pull/6374)  
   - 进一步削弱旧部署模型在代码中的残留。

4. **收敛 runner feature flags / 删除死代码**  
   - PR：[#6377](https://github.com/nearai/ironclaw/pull/6377)  
   - PR：[#6378](https://github.com/nearai/ironclaw/pull/6378)  
   - 表明项目正在做持续的配置与开关瘦身，降低维护复杂度。

5. **清理文档与过期计划**  
   - PR：[#6372](https://github.com/nearai/ironclaw/pull/6372)  
   - 删除大量 stale docs、drafts、工作文档，属于“项目收口”动作。

6. **发布相关修复与说明更新**  
   - PR：[#6370](https://github.com/nearai/ironclaw/pull/6370)  
   - PR：[#6383](https://github.com/nearai/ironclaw/pull/6383)  
   - 说明团队已开始围绕 `1.0.0-rc.1` 做发布修整、MSI 阻塞处理和命名清理。

### 整体推进幅度
- 24 小时内 **27 个 PR 已合并/关闭**，说明代码层推进非常快。
- 其中相当一部分集中在 **Tier B 退役、迁移解耦、配置瘦身、发布清理**。
- 若把这些动作视作“旧世界收尾”，今日可视为 Reborn 迁移的**加速日**。

---

## 4) 社区热点
今日讨论热度最高的，主要是 **问题跟踪型 Issues** 与 **架构规划型 Issues**。虽然你提供的数据里 PR 评论数未展示，但 Issues 侧已经清晰反映出关注焦点。

### 最活跃 Issues
1. **Tier B 退役后的功能缺口追踪**  
   - Issue：[#6369](https://github.com/nearai/ironclaw/issues/6369)  
   - 评论：3  
   - 这是旧 monolith 删除后的“补洞清单”，说明旧栈退役并不代表问题结束，反而进入“缺口补齐”阶段。  
   - 背后诉求：保证迁移后功能不回退，尤其是生产部署、运维与边界行为不能丢。

2. **长回复被截断，缺少展开能力**  
   - Issue：[#6353](https://github.com/nearai/ironclaw/issues/6353)  
   - 评论：2  
   - 典型 WebUI 可用性问题。  
   - 背后诉求：用户需要完整阅读长表格、长总结、结构化报告，当前展示机制影响实际使用。

3. **checkpoint unavailable / unreachable 导致 run 失败**  
   - Issue：[#6351](https://github.com/nearai/ironclaw/issues/6351)  
   - 评论：2  
   - 属于更偏底层的运行稳定性问题，影响多工具请求。  
   - 背后诉求：提高任务执行可靠性，减少“系统级临时不可用”带来的中断。

4. **assistant 意外切换输出语言**  
   - Issue：[#6350](https://github.com/nearai/ironclaw/issues/6350)  
   - 评论：2  
   - 直接影响用户沟通体验和信任感。  
   - 背后诉求：模型行为稳定、语言一致性可控。

5. **Reborn in-chat 命令覆盖优先级 backlog**  
   - Issue：[#6384](https://github.com/nearai/ironclaw/issues/6384)  
   - 评论：0，但为今日新开且方向重要  
   - 反映 Reborn 当前在“命令面覆盖”上还有明显空缺。

### 其他值得关注的热点
- [#6320](https://github.com/nearai/ironclaw/issues/6320) IronHub extension install flow  
- [#6325](https://github.com/nearai/ironclaw/issues/6325) thread-scoped MCP sessions  
- [#6324](https://github.com/nearai/ironclaw/issues/6324) WebUI workspace redesign / chat-first onboarding  
- [#6319](https://github.com/nearai/ironclaw/issues/6319) audited capability dispatch funnel

这些热点集中于：**新平台能力补齐、扩展安装/授权流程、工作区与聊天入口重设计、安全调度链路统一**。

---

## 5) Bug 与稳定性
按严重程度与用户影响排序，今日报告的主要问题如下：

### P1 / 高优先级
1. **Gmail extension 重新安装后自动授权，无需用户同意**  
   - Issue：[#6348](https://github.com/nearai/ironclaw/issues/6348)  
   - 风险：高，涉及权限与隐私授权。  
   - 是否已有 fix PR：**未看到直接修复 PR**。

2. **Provider onboarding 无法返回上一步**  
   - Issue：[#6360](https://github.com/nearai/ironclaw/issues/6360)  
   - 风险：高，直接卡住配置流程。  
   - fix PR：**有**，PR [#6366](https://github.com/nearai/ironclaw/pull/6366) 明确“让 Esc 返回 provider menu”。

3. **Run 失败：checkpoint 不可用/不可达**  
   - Issue：[#6351](https://github.com/nearai/ironclaw/issues/6351)  
   - 风险：高，影响多工具请求的核心执行链。  
   - fix PR：**未见直接对应**，但属于必须继续跟进的稳定性问题。

### P2 / 中优先级
4. **长 assistant 消息被截断，无法展开**  
   - Issue：[#6353](https://github.com/nearai/ironclaw/issues/6353)  
   - 风险：中高，影响复杂结果阅读。  
   - fix PR：未见直接对应。

5. **Assistant 意外切换输出语言**  
   - Issue：[#6350](https://github.com/nearai/ironclaw/issues/6350)  
   - 风险：中高，破坏交互一致性。  
   - fix PR：未见直接对应。

6. **Streamed response 回到页面后循环重放**  
   - Issue：[#6352](https://github.com/nearai/ironclaw/issues/6352)  
   - 风险：中，影响聊天会话稳定性。  
   - fix PR：未见直接对应。

7. **Telegram chat history 在 WebUI 渲染不一致**  
   - Issue：[#6349](https://github.com/nearai/ironclaw/issues/6349)  
   - 风险：中，跨渠道一致性问题。  
   - fix PR：未见直接对应。

### 体验 / 一致性问题
8. **Workspace tree 导航与无障碍不足**  
   - Issue：[#6334](https://github.com/nearai/ironclaw/issues/6334)

9. **加载更早聊天消息时视口跳动**  
   - Issue：[#6333](https://github.com/nearai/ironclaw/issues/6333)

10. **工具权限下拉在保存期间回退闪烁**  
   - Issue：[#6331](https://github.com/nearai/ironclaw/issues/6331)

11. **Admin user details 更新后仍然 stale**  
   - Issue：[#6330](https://github.com/nearai/ironclaw/issues/6330)

### 补充：已有修复动作的 Bug
- [#6360](https://github.com/nearai/ironclaw/issues/6360) 已有对应修复 PR [#6366](https://github.com/nearai/ironclaw/pull/6366)  
  这是今日最明确的 “bug → fix” 闭环之一。

---

## 6) 功能请求与路线图信号
今日的功能请求与路线图信号非常明显：**Reborn-native 能力补齐** 是主线。

### 可能进入下一版本/近期规划的方向
1. **IronHub extension 安装流**
   - Issue：[#6320](https://github.com/nearai/ironclaw/issues/6320)
   - 诉求：可发现、可安装、可配置、可激活，且保留 host-mediated credentials。
   - 相关 PR 信号：无直接落地 PR，但这是明显的产品方向。

2. **Thread-scoped MCP sessions + programmatic MCP config**
   - Issue：[#6325](https://github.com/nearai/ironclaw/issues/6325)
   - 诉求：MCP 会话按 thread/run/product 作用域隔离，适配更复杂自动化工作流。

3. **WebUI workspace redesign + chat-first onboarding**
   - Issue：[#6324](https://github.com/nearai/ironclaw/issues/6324)
   - 诉求：WebUI 首屏和主工作区要更符合 Reborn 产品模型。
   - 相关动向：PR [#6364](https://github.com/nearai/ironclaw/pull/6364)（Telegram/Slack workspace attachments）说明 workspace 入口能力在继续扩展。

4. **Offline v1-to-Reborn migration workflow**
   - Issue：[#6323](https://github.com/nearai/ironclaw/issues/6323)
   - 诉求：离线迁移、可验证、可回滚，是企业级迁移的重要支撑。

5. **Skill learning + approval-gated learned skills**
   - Issue：[#6322](https://github.com/nearai/ironclaw/issues/6322)
   - 诉求：从交互中学习技能，并通过审批控制激活。

6. **Non-interactive extension/tool setup with secret binding**
   - Issue：[#6321](https://github.com/nearai/ironclaw/issues/6321)
   - 诉求：自动化配置，不再完全依赖交互式流程。

7. **Audited capability dispatch funnel**
   - Issue：[#6319](https://github.com/nearai/ironclaw/issues/6319)
   - 诉求：统一工具执行入口，强化审计与安全边界。

### 路线图判断
结合今日 PR 与 Issue 结构看，短期最可能被纳入下一版本的，是：
- **MCP / extension / attachment / workspace** 这一组“产品面能力”
- **安全执行与授权链路统一**
- **旧栈退役后的迁移补缺与发布稳定化**

---

## 7) 用户反馈摘要
从 Issues 的文本可以提炼出几类非常真实的用户痛点：

### 1. “我看不到完整内容”
- 来源：[#6353](https://github.com/nearai/ironclaw/issues/6353)
- 用户反馈：长回复被截断，无展开入口。
- 场景：看长表格、长总结、结构化输出。
- 反映的问题：信息密度越高，当前展示越不适配。

### 2. “流程被卡死，不能回退”
- 来源：[#6360](https://github.com/nearai/ironclaw/issues/6360)
- 用户反馈：选错 provider 后无法返回。
- 场景：本地 CLI onboarding。
- 反映的问题：配置流程容错不足，影响首次体验。

### 3. “系统行为不稳定”
- 来源：[#6351](https://github.com/nearai/ironclaw/issues/6351)、[#6352](https://github.com/nearai/ironclaw/issues/6352)、[#6350](https://github.com/nearai/ironclaw/issues/6350)
- 用户反馈：checkpoint 失败、流式输出回放、语言切换异常。
- 场景：多工具请求、长会话、跨语言交互。
- 反映的问题：用户对“AI 代理”最敏感的不是功能数量，而是**行为一致性与任务成功率**。

### 4. “权限和授权不能默认替我做决定”
- 来源：[#6348](https://github.com/nearai/ironclaw/issues/6348)
- 用户反馈：扩展重装后自动授权 Gmail。
- 场景：扩展重装。
- 反映的问题：权限模型和用户预期不一致，存在明显信任风险。

### 5. “跨渠道内容应该一致”
- 来源：[#6349](https://github.com/nearai/ironclaw/issues/6349)
- 用户反馈：Telegram 在 WebUI 中渲染混乱。
- 场景：同一对话跨 Telegram/WebUI 查看。
- 反映的问题：多渠道统一体验仍是短板。

---

## 8) 待处理积压
以下是今日尤其值得维护者关注的“高价值积压项”：

### 重点未响应 Issues
- [#6369](https://github.com/nearai/ironclaw/issues/6369) Tier B 退役后的缺口追踪  
  - 评论数最多，说明已经开始形成“收尾清单”。
- [#6353](https://github.com/nearai/ironclaw/issues/6353) 长消息截断  
  - 直接影响高信息量输出阅读。
- [#6351](https://github.com/nearai/ironclaw/issues/6351) checkpoint unreachable  
  - 影响核心执行稳定性。
- [#6350](https://github.com/nearai/ironclaw/issues/6350) 输出语言异常  
  - 影响基本交互可信度。
- [#6348](https://github.com/nearai/ironclaw/issues/6348) Gmail 自动授权  
  - 安全/隐私高风险，优先级应靠前。
- [#6347](https://github.com/nearai/ironclaw/issues/6347) Slack instance-readiness 缺少 caller-level 覆盖  
  - 测试盲区问题，可能埋回归风险。
- [#6329](https://github.com/nearai/ironclaw/issues/6329) 8,789 行巨型文件拆解  
  - 维护性债务明显。

### 值得持续跟进的开放 PR
- [#6386](https://github.com/nearai/ironclaw/pull/6386) consolidate pre-flight policy into `authorize()`
- [#6385](https://github.com/nearai/ironclaw/pull/6385) 依赖批量升级
- [#6382](https://github.com/nearai/ironclaw/pull/6382) filesystem_store 大型重构
- [#6380](https://github.com/nearai/ironclaw/pull/6380) tokio 生态依赖升级
- [#6376](https://github.com/nearai/ironclaw/pull/6376) streaming retry resilience coverage
- [#6366](https://github.com/nearai/ironclaw/pull/6366) onboarding 返回上一级修复
- [#6365](https://github.com/nearai/ironclaw/pull/6365) hosted-MCP discovery 参考实现
- [#6364](https://github.com/nearai/ironclaw/pull/6364) Telegram/Slack workspace attachments

---

## 结论
IronClaw 在 2026-07-21 呈现出非常典型的“**大迁移冲刺期**”特征：  
一边是 v1 旧栈退役、发布链路收敛、权限与调度统一；另一边是大量 UX、稳定性和跨渠道一致性问题被集中暴露。  
从数据看，项目开发推进速度很高，且方向明确；从风险看，当前最需要持续关注的是 **安全授权、执行稳定性、消息展示完整性、以及迁移后遗留缺口补齐**。

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发 Slack/飞书的短版**  
2. **适合管理层阅读的 1 页摘要版**  
3. **按“风险/影响/优先级”排序的行动清单版**

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-07-21）

## 1) 今日速览
今日 LobsterAI 处于**“低外部噪声、高工程推进”**状态：过去 24 小时没有新增或活跃 Issues，说明公开问题面较平静。PR 侧共更新 10 条，其中 9 条已合并/关闭、1 条仍在开放，显示维护节奏较快、交付推进明确。当天的变更主要集中在 **Windows 安装/构建、协作（cowork）体验、稳定性修复、认证流程和 AI 皮肤创建** 等方向。整体看，项目健康度较好：**没有版本发布压力，也没有明显的事故/故障信号**，但仍有一条重要 Windows 相关 PR 待处理。  
相关链接： [PR 总览](https://github.com/netease-youdao/LobsterAI/pulls)

---

## 2) 版本发布
**今日无新版本发布。**  
相关链接： [Releases](https://github.com/netease-youdao/LobsterAI/releases)

---

## 3) 项目进展
今日主要推进集中在以下几类变更，整体上可视为**9 个已完成变更在 1 个未完成 Windows 更新 PR 前的密集收敛**：

### 关键已合并/关闭 PR
- **#2366 feat(cowork): 支持浏览器多注释附件**  
  引入浏览器注释协议、webview preload、截图资产存储 IPC，支持批量创建注释、保存裁剪截图，并将注释作为草稿附件参与展示/清理/发送。  
  这是今天最偏“产品能力扩展”的变更，明显增强了协作场景。  
  链接： [PR #2366](https://github.com/netease-youdao/LobsterAI/pull/2366)

- **#2365 fix(openclaw): deliver config hot-reload via RPC ack instead of file …**  
  将配置热更新从文件层面切换为 RPC ack 机制，目标是提升配置同步可靠性，减少热重载时的时序问题。  
  更偏底层稳定性与运行时一致性修复。  
  链接： [PR #2365](https://github.com/netease-youdao/LobsterAI/pull/2365)

- **#2364 fix(cowork): prevent scroll jumps on session refresh**  
  修复会话刷新导致的滚动跳动问题，并通过 session ID 作用域和消息历史保留减少 UI 抖动。  
  直接改善协作界面可用性。  
  链接： [PR #2364](https://github.com/netease-youdao/LobsterAI/pull/2364)

- **#2363 fix(cowork): prevent periodic IM message flicker**  
  通过对齐历史窗口并保留旧消息，减少 IM 消息周期性闪烁。  
  这是典型的“用户感知强、体验影响大”的稳定性修复。  
  链接： [PR #2363](https://github.com/netease-youdao/LobsterAI/pull/2363)

- **#2361 feat(skin): improve AI skin creation flow**  
  优化 AI skin 创建入口和引导流程，增强持续创作体验。  
  这代表产品在“个性化/可配置 AI 体验”上继续加码。  
  链接： [PR #2361](https://github.com/netease-youdao/LobsterAI/pull/2361)

- **#2360 fix(auth): preserve local callback across login retries**  
  修复重复登录/并发登录时的回调服务器复用问题，增强认证流程健壮性。  
  属于关键路径稳定性修复。  
  链接： [PR #2360](https://github.com/netease-youdao/LobsterAI/pull/2360)

- **#2359 fix(artifacts): 保持预览面板和输入区布局稳定**  
  通过稳定 key 与布局同步更新减少预览展开/输入区联动时的闪动。  
  主要提升 artifact 面板交互体验。  
  链接： [PR #2359](https://github.com/netease-youdao/LobsterAI/pull/2359)

- **#2362 fix: fix cron ui bug**  
  修复 cron 相关 UI 问题，虽摘要较少，但属于明确的前端缺陷修正。  
  链接： [PR #2362](https://github.com/netease-youdao/LobsterAI/pull/2362)

- **#2367 feat(build): add explicit channel entry points for Windows dist builds**  
  Windows 构建入口更明确，避免构建环境变量串扰，提升打包可控性。  
  这是 #2368 的前置/配套工程能力建设。  
  链接： [PR #2367](https://github.com/netease-youdao/LobsterAI/pull/2367)

### 今日推进总结
- **功能侧**：协作注释、AI skin 创建流程等能力增强；
- **稳定性侧**：认证、消息刷新、IM 闪烁、布局抖动、config hot-reload 等多项修复；
- **平台侧**：Windows 构建/更新链路持续完善。  

从节奏上看，今天约有 **90% 的 PR 活动已完成收敛（9/10）**，项目推进效率较高。  
相关链接： [PR 总览](https://github.com/netease-youdao/LobsterAI/pulls)

---

## 4) 社区热点
**今日没有明显的社区讨论热点。**  
根据现有数据，Issues 过去 24 小时为 0 条更新，且 PR 的评论数与反应数均未显示出活跃讨论信号，因此本日更像是**维护者主导的工程推进日**，而非社区协作讨论日。

如果按“值得关注的变更影响”来选，当前最应跟踪的是：
- **#2368 feat(update): install Windows updates silently**（当前唯一开放 PR）  
  该 PR 触及 Windows 更新安装体验，且涉及 UAC/静默安装/自动重启等高影响流程。  
  链接： [PR #2368](https://github.com/netease-youdao/LobsterAI/pull/2368)

参考入口： [Issues](https://github.com/netease-youdao/LobsterAI/issues) ｜ [Pull Requests](https://github.com/netease-youdao/LobsterAI/pulls)

---

## 5) Bug 与稳定性
**今日无新增公开 Issue 级 Bug 报告。**  
但从已完成 PR 看，项目确实在集中修复一批体验与稳定性问题，按影响程度可排序如下：

### 较高优先级
- **#2360 登录重试回调复用问题**  
  涉及认证主流程，若处理不当会影响登录成功率与重试可靠性。  
  是否已有 fix PR：**是**  
  链接： [PR #2360](https://github.com/netease-youdao/LobsterAI/pull/2360)

- **#2365 配置热重载同步机制问题**  
  由文件层热更新改为 RPC ack，说明原机制可能存在不一致或时序风险。  
  是否已有 fix PR：**是**  
  链接： [PR #2365](https://github.com/netease-youdao/LobsterAI/pull/2365)

### 中等优先级
- **#2363 周期性 IM 消息闪烁**  
  属于明显的视觉抖动/状态回收问题，影响用户对消息流稳定性的感知。  
  是否已有 fix PR：**是**  
  链接： [PR #2363](https://github.com/netease-youdao/LobsterAI/pull/2363)

- **#2364 会话刷新导致滚动跳动**  
  影响协作阅读与连续操作体验。  
  是否已有 fix PR：**是**  
  链接： [PR #2364](https://github.com/netease-youdao/LobsterAI/pull/2364)

### 低优先级/体验类
- **#2362 cron UI bug**  
  明确的前端修复项，但从当前信息看未指向系统级风险。  
  是否已有 fix PR：**是**  
  链接： [PR #2362](https://github.com/netease-youdao/LobsterAI/pull/2362)

- **#2359 预览面板与输入区布局不稳定**  
  主要为 UI 抖动和布局稳定性问题。  
  是否已有 fix PR：**是**  
  链接： [PR #2359](https://github.com/netease-youdao/LobsterAI/pull/2359)

结论：**今天没有“用户报障型”Bug，但工程侧确实在持续消化一批稳定性问题。**

---

## 6) 功能请求与路线图信号
今日没有新增 Issues，因此**没有来自用户的显式功能请求**。  
不过从 PR 方向看，以下能力很可能继续进入下一版本或后续迭代：

- **Windows 静默更新安装**  
  当前仍有开放 PR **#2368**，且与 #2367 的构建入口改造形成前后链路，说明 Windows 更新体验很可能是近期重点。  
  链接： [PR #2368](https://github.com/netease-youdao/LobsterAI/pull/2368)

- **浏览器多注释附件与协作标注能力**  
  #2366 已完成，属于较强的产品能力扩展，后续很可能围绕“注释管理、发送链路、上下文传递”继续迭代。  
  链接： [PR #2366](https://github.com/netease-youdao/LobsterAI/pull/2366)

- **AI skin 创建体验**  
  #2361 表明项目持续打磨“个性化 AI 形态创建”路径，这通常意味着后续还会有模板、引导、复用能力增强。  
  链接： [PR #2361](https://github.com/netease-youdao/LobsterAI/pull/2361)

整体判断：**下一版本更可能优先收敛 Windows 更新链路与协作体验增强，而非新增大规模架构性功能。**

---

## 7) 用户反馈摘要
**今日没有 Issues 评论数据可提炼。**  
因此无法从公开评论中总结出真实用户痛点、典型使用场景或满意/不满意点。

从“无新增 Issues、无讨论热点”的侧面看，当前项目处于**低投诉、低反馈噪声**状态；这通常意味着：
- 用户侧没有集中爆发的阻塞问题；
- 也可能意味着反馈入口较少或讨论主要发生在 PR/内部协作中。  

参考入口： [Issues](https://github.com/netease-youdao/LobsterAI/issues)

---

## 8) 待处理积压
当前明确的待处理项主要是：

- **#2368 feat(update): install Windows updates silently**  
  这是今日唯一开放 PR，也是最值得继续跟进的积压项。它涉及 Windows 更新安装体验、UAC 处理、安装后自动重启等关键路径，若落地成功，将直接改善升级链路的可用性。  
  关注点建议：  
  1. UAC 拒绝后的错误提示是否足够清晰；  
  2. 静默安装的兼容性与失败回退；  
  3. 安装后自动重启的用户感知与安全性。  
  链接： [PR #2368](https://github.com/netease-youdao/LobsterAI/pull/2368)

除该 PR 外，**当前没有公开 Issue 型长期积压项**。  
参考入口： [Pull Requests](https://github.com/netease-youdao/LobsterAI/pulls) ｜ [Issues](https://github.com/netease-youdao/LobsterAI/issues)

---

### 总体结论
LobsterAI 在 2026-07-21 的状态可以概括为：**问题面平稳、开发面活跃、质量修复与功能增强并进**。  
没有新版本发布，也没有公开故障/事故信号；但从 PR 方向看，项目正在围绕 **Windows 更新、协作体验、认证健壮性和 AI 个性化能力** 做密集优化，说明路线清晰、工程推进健康。

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

# CoPaw 项目动态日报｜2026-07-21

> 数据窗口：过去 24 小时  
> 总体状态：**高活跃、强讨论、低合并率**。今日没有新 Release，但 Issues 和 PR 都保持高频更新，说明项目仍处于快速迭代和需求收敛阶段。

## 1. 今日速览
过去 24 小时，项目新增/活跃 Issues 9 条、PR 11 条，说明社区参与度很高，且讨论集中在**核心能力增强、稳定性修复、模型/工具生态扩展**三条主线。  
从结果看，PR 虽然很多，但**仅 1 条合并/关闭、10 条仍待合并**，表明开发推进积极，但交付效率偏谨慎，审查与验证仍是当前节奏的瓶颈。  
Issues 侧几乎全部为新开且未关闭，且多数直接指向用户体验、上下文一致性、工具成本和移动端可用性，说明产品已经进入“**功能扩张后，开始集中暴露工程细节问题**”的阶段。  
整体健康度判断：**活跃度高、社区信号清晰，但版本产出仍偏慢；当前优先级应放在高价值 bug 修复与高频需求收敛上。**

---

## 2. 项目进展
### 已合并/关闭的重要 PR
- **[#6272 fix: register background chats and remove legacy runner](https://github.com/agentscope-ai/CoPaw/pull/6272)**  
  这是今日唯一明确合并/关闭的 PR。它解决了**后台任务聊天索引缺失**问题，并移除了旧的动态 runner 基础设施。  
  **影响判断：**
  - 修复了后台任务在会话索引中的可见性问题；
  - 简化了执行路径，减少历史包袱；
  - 对“后台对话/任务追踪”这一核心能力是实打实的稳定性提升。  

### 仍在推进中的关键 PR
- **[#6280 fix(agents): align reasoning with tool segments](https://github.com/agentscope-ai/CoPaw/pull/6280)**  
  直指 [#6282](https://github.com/agentscope-ai/CoPaw/issues/6282) 的推理重复问题，属于高优先级修复。
- **[#6271 feat(providers): add AIOnly as built-in model provider](https://github.com/agentscope-ai/CoPaw/pull/6271)**  
  与 [#6268](https://github.com/agentscope-ai/CoPaw/issues/6268) 对应，说明社区对模型接入生态扩展非常活跃。
- **[#6276 feat(browser): unified browser — one SDK, any backend](https://github.com/agentscope-ai/CoPaw/pull/6276)**  
  这是较大的架构型改动，若落地，将明显增强浏览器工具层统一性。
- **[#6269 feat(checkpoints): add workspace checkpoint management](https://github.com/agentscope-ai/CoPaw/pull/6269)**  
  指向工作区级恢复/回滚能力，是偏“生产可用性”的增强。
- **[#6284 feat(apps): add qwenpaw-creator app](https://github.com/agentscope-ai/CoPaw/pull/6284)**  
  说明插件/应用生态仍在扩张。
  
### 推进总结
今天的进展不是“发版式推进”，而是“**基础设施与能力补齐式推进**”：  
- 一部分 PR 在修复核心可靠性问题；
- 一部分在增强模型/浏览器/工作区能力；
- 还有一部分在扩展应用生态。  
**项目整体向前迈进的幅度：中等偏上**——功能覆盖在扩大，但离“稳定收敛并批量发布”还有一段审查和验证距离。

---

## 3. 社区热点
### 讨论最活跃的 Issues
1. **[#6283 在每次发给大模型的会话上下文基础上，自动附加当前真实时间信息](https://github.com/agentscope-ai/CoPaw/issues/6283)**  
   - 评论数：2  
   - 诉求核心：避免旧会话重启后，模型混淆“历史时间”和“当前时间”。  
   - 背后反映：用户非常在意**长会话/跨天会话的时间一致性**，这属于典型的上下文治理问题。

2. **[#6282 Reasoning relay repeats the first thinking block across AgentScope 2 tool iterations](https://github.com/agentscope-ai/CoPaw/issues/6282)**  
   - 评论数：1，👍：1  
   - 诉求核心：推理块在多轮工具调用中被重复/污染。  
   - 背后反映：这是**输出正确性与可解释性**问题，且已经有人给出正反馈，说明痛点明确、影响真实。

3. **[#6287 Grouping / Folder Support for Session History in Desktop Console](https://github.com/agentscope-ai/CoPaw/issues/6287)**  
   - 评论数：1  
   - 诉求核心：会话历史分组/文件夹。  
   - 背后反映：随着会话数量增长，用户开始进入**历史管理与检索效率**阶段。

4. **[#6286 Support disabling or customizing built-in tool descriptions](https://github.com/agentscope-ai/CoPaw/issues/6286)**  
   - 评论数：1  
   - 诉求核心：工具描述太长，单次请求消耗 8k–10k token。  
   - 背后反映：用户已经明显感受到**成本与上下文窗口压力**。

### 热门 PR 关注点
虽然 PR 评论数据未显式给出，但以下几条明显处于社区关注中心：
- **[#6280 fix(agents): align reasoning with tool segments](https://github.com/agentscope-ai/CoPaw/pull/6280)**  
- **[#6271 feat(providers): add AIOnly as a built-in model provider](https://github.com/agentscope-ai/CoPaw/pull/6271)**  
- **[#6276 feat(browser): unified browser — one SDK, any backend](https://github.com/agentscope-ai/CoPaw/pull/6276)**  

**热点结论：**  
社区关注点已经从“能不能用”转向“**是否稳定、是否省 token、是否方便组织、是否更容易接入更多模型/工具**”。

---

## 4. Bug 与稳定性
> 按影响面和潜在严重程度排序。

### 1) **[#6273] Unify task tracking and same-session concurrency semantics**
- 链接：<https://github.com/agentscope-ai/CoPaw/issues/6273>  
- 严重程度：**高**
- 问题特征：同一会话并发语义不一致，某些路径会串行，某些路径会静默忽略新 payload。  
- 风险：这类问题容易造成**任务错配、结果丢失、用户以为提交成功但实际未生效**。  
- 是否已有 fix PR：**未看到对应 fix PR**

### 2) **[#6282] Reasoning relay repeats the first thinking block across AgentScope 2 tool iterations**
- 链接：<https://github.com/agentscope-ai/CoPaw/issues/6282>  
- 严重程度：**中高**
- 问题特征：多轮工具调用时，推理块重复，属于输出链路污染。  
- 风险：会影响**模型可解释性、工具链一致性和调试效率**。  
- 是否已有 fix PR：**有**，对应 **[#6280](https://github.com/agentscope-ai/CoPaw/pull/6280)**（Under Review）

### 3) **[#6286] Built-in tool descriptions consume 8k–10k tokens per request**
- 链接：<https://github.com/agentscope-ai/CoPaw/issues/6286>  
- 严重程度：**中**
- 问题特征：不是崩溃型 bug，但对每次请求都造成显著 token 成本。  
- 风险：会带来**成本上升、上下文挤压、长对话效果下降**。  
- 是否已有 fix PR：**未看到对应 fix PR**

### 4) 稳定性相关已推进修复
- **[#6272](https://github.com/agentscope-ai/CoPaw/pull/6272)**：后台聊天注册与旧 runner 清理，提升任务可追踪性  
- **[#6267 fix(scroll): retry once after context overflow](https://github.com/agentscope-ai/CoPaw/pull/6267)**：上下文溢出后自动重试一次，增强容错  
- **[#6277 fix(observability): use valid Langfuse trace IDs](https://github.com/agentscope-ai/CoPaw/pull/6277)**：修复 trace ID 合法性，改善观测链路  

---

## 5. 功能请求与路线图信号
### 今日新增/活跃功能请求
1. **[#6283 自动附加当前真实时间信息](https://github.com/agentscope-ai/CoPaw/issues/6283)**  
   - 路线图信号：高。  
   - 原因：这是典型的“会话上下文增强”需求，价值明确、实现边界也相对清晰。

2. **[#6287 Session History 分组/文件夹](https://github.com/agentscope-ai/CoPaw/issues/6287)**  
   - 路线图信号：高。  
   - 原因：桌面端历史管理是成熟度提升的标志，属于高频使用场景改进。

3. **[#6286 可禁用/自定义内置工具描述](https://github.com/agentscope-ai/CoPaw/issues/6286)**  
   - 路线图信号：高。  
   - 原因：直接关联 token 成本，容易转化为“立即有感”的优化。

4. **[#6285 支持 qwen3.8-max-preview 模型](https://github.com/agentscope-ai/CoPaw/issues/6285)**  
   - 路线图信号：中高。  
   - 原因：模型列表更新属于高频维护项，用户预期强。

5. **[#6274 新增 ask_user_question 工具，支持 Human-in-the-Loop](https://github.com/agentscope-ai/CoPaw/issues/6274)**  
   - 路线图信号：中高。  
   - 原因：这是 Agent 实际生产使用中的关键能力，尤其适合高风险/不确定任务。

6. **[#6281 Web 控制台适配移动端](https://github.com/agentscope-ai/CoPaw/issues/6281)**  
   - 路线图信号：中。  
   - 原因：用户场景真实，但通常需要较多前端适配成本。

7. **[#6268 / #6271 添加 AIOnly 内置模型提供商](https://github.com/agentscope-ai/CoPaw/issues/6268)**  
   - 路线图信号：高。  
   - 原因：已有对应 PR **[#6271](https://github.com/agentscope-ai/CoPaw/pull/6271)**，说明该需求很可能进入下个版本或补丁包。

### 哪些最可能进入下一版本？
结合 PR 状态，最可能优先落地的是：
- **[#6271 AIOnly Provider](https://github.com/agentscope-ai/CoPaw/pull/6271)**  
- **[#6280 reasoning 修复](https://github.com/agentscope-ai/CoPaw/pull/6280)**  
- **[#6277 Langfuse trace 修复](https://github.com/agentscope-ai/CoPaw/pull/6277)**  
- **[#6267 context overflow 自动重试](https://github.com/agentscope-ai/CoPaw/pull/6267)**  

这些都属于“**能直接改善稳定性或扩大可用性**”的改动，通常更容易进入短周期发布。

---

## 6. 用户反馈摘要
从 Issues 评论内容和提案方向看，用户的真实诉求高度集中在以下几类：

- **时间/上下文一致性**  
  - 来自 **[#6283](https://github.com/agentscope-ai/CoPaw/issues/6283)**  
  - 用户痛点：旧会话跨天重启后，模型会误判“现在是几号”。  
  - 场景：长期对话、间歇性续聊、跨天工作流。

- **会话管理效率**  
  - 来自 **[#6287](https://github.com/agentscope-ai/CoPaw/issues/6287)**  
  - 用户痛点：会话多了以后难找、难归类。  
  - 场景：桌面端重度使用者、长期项目型对话。

- **token 成本与工具冗余**  
  - 来自 **[#6286](https://github.com/agentscope-ai/CoPaw/issues/6286)**  
  - 用户痛点：内置工具描述太长，浪费上下文与成本。  
  - 场景：高频调用、多工具 Agent、长上下文用户。

- **Agent 执行正确性与并发一致性**  
  - 来自 **[#6282](https://github.com/agentscope-ai/CoPaw/issues/6282)**、**[#6273](https://github.com/agentscope-ai/CoPaw/issues/6273)**  
  - 用户痛点：推理重复、并发行为不一致、任务可能静默错位。  
  - 场景：AgentScope 2、多轮工具调用、后台任务。

- **更自然的人工介入机制**  
  - 来自 **[#6274](https://github.com/agentscope-ai/CoPaw/issues/6274)**  
  - 用户痛点：Agent 在模糊/高风险任务上不能“主动问人”。  
  - 场景：需要审批、校验、二次确认的工作流。

- **更广的模型兼容性**  
  - 来自 **[#6285](https://github.com/agentscope-ai/CoPaw/issues/6285)**、**[#6268](https://github.com/agentscope-ai/CoPaw/issues/6268)**  
  - 用户痛点：模型列表更新不够快，希望更快支持新模型或新 provider。  
  - 场景：追新模型、平台聚合接入、统一管理多模型。

**总体判断：**  
用户并不只是在提“新功能”，而是在持续暴露三类现实问题：  
1) **可靠性**，2) **成本控制**，3) **工作流效率**。  
这说明项目已经进入成熟使用阶段，需求更偏向“生产可用”。

---

## 7. 待处理积压
> 说明：本次数据窗口仅 24 小时，**没有明显“长期未响应”项**。  
> 但以下 PR/Issue 属于**高价值、应尽快审阅**，若继续滞留，容易形成有效积压：

### 优先关注 PR
- **[#6280 fix(agents): align reasoning with tool segments](https://github.com/agentscope-ai/CoPaw/pull/6280)**  
  直接对应高优先级 bug，建议优先合并或给出明确 review 结论。
- **[#6271 feat(providers): add AIOnly as a built-in model provider](https://github.com/agentscope-ai/CoPaw/pull/6271)**  
  来自 first-time contributor，且需求清晰，适合尽快反馈。
- **[#6276 feat(browser): unified browser — one SDK, any backend](https://github.com/agentscope-ai/CoPaw/pull/6276)**  
  架构改动较大，越早澄清实现边界越好。
- **[#6269 feat(checkpoints): add workspace checkpoint management](https://github.com/agentscope-ai/CoPaw/pull/6269)**  
  关系到工作区恢复能力，值得单独排期审查。
- **[#6284 feat(apps): add qwenpaw-creator app](https://github.com/agentscope-ai/CoPaw/pull/6284)**  
  插件型大改动，适合确认对主线兼容性。

### 优先关注 Issue
- **[#6273 并发语义不一致](https://github.com/agentscope-ai/CoPaw/issues/6273)**  
  高风险，建议尽快指派 owner。
- **[#6286 工具描述 token 过高](https://github.com/agentscope-ai/CoPaw/issues/6286)**  
  性能/成本问题，虽然不致命，但影响广。
- **[#6287 会话分组/文件夹](https://github.com/agentscope-ai/CoPaw/issues/6287)**  
  属于明显的使用体验升级点，适合纳入规划。

---

## 结论
今日 CoPaw 的特征非常明确：**社区活跃、需求密集、修复和扩展并行推进**。  
短期最值得关注的是两条线：  
- **稳定性线**：[#6273](https://github.com/agentscope-ai/CoPaw/issues/6273)、[#6282](https://github.com/agentscope-ai/CoPaw/issues/6282)、[#6280](https://github.com/agentscope-ai/CoPaw/pull/6280)  
- **体验/成本线**：[#6286](https://github.com/agentscope-ai/CoPaw/issues/6286)、[#6287](https://github.com/agentscope-ai/CoPaw/issues/6287)、[#6283](https://github.com/agentscope-ai/CoPaw/issues/6283)

如果后续能把这些高价值问题尽快收敛，项目会从“高活跃”进一步走向“高可用”。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-07-21）

## 1) 今日速览
ZeroClaw 过去 24 小时保持了很高的迭代强度：Issues 更新 18 条、PR 更新 28 条，但没有新版本发布，说明当前重心仍在“修复 + 功能积累”，尚未进入发布窗口。  
从主题上看，今天的变更明显分成两条主线：一条是 **eval harness / 测评基础设施** 的集中建设，另一条是 **runtime、channel、provider、sandbox** 的稳定性修补。  
同时，今天新报出的问题里包含多起 **S0/S1 级别** 风险，涉及数据丢失、工作流阻塞和安全隔离异常，项目健康度表现为“开发活跃，但稳定性压力偏高”。  
总体判断：项目处于 **高活跃、强修复、低发布** 阶段，技术推进快，但需要更快消化高危 bug。

---

## 2) 项目进展
今日可见的已关闭 PR 只有 1 个：

- [#9210 fix(sop): construct required admission fields in blankSop](https://github.com/zeroclaw-labs/zeroclaw/pull/9210)  
  这是一个小范围但必要的修复，补齐 `blankSop` 创建时应带的 admission 字段，降低后续序列化/默认值行为不一致的风险。

除此之外，今天真正体现“项目向前推进”的，是一批仍在开放中的大 PR：
- [#9201 fix(runtime): prevent shared iteration budget underflow](https://github.com/zeroclaw-labs/zeroclaw/pull/9201)
- [#9203 fix(sop): wire authenticated HTTP fan-in](https://github.com/zeroclaw-labs/zeroclaw/pull/9203)
- [#9208 fix(runtime): stop per-iteration tool-schema deep clones in the agent loop](https://github.com/zeroclaw-labs/zeroclaw/pull/9208)
- [#9212 feat(eval): gate CI on the replay regression suite](https://github.com/zeroclaw-labs/zeroclaw/pull/9212)
- [#9214 feat(eval): live execution mode with sandboxed tool surface](https://github.com/zeroclaw-labs/zeroclaw/pull/9214)
- [#9217 refactor(eval): async Grader trait wired through the runner](https://github.com/zeroclaw-labs/zeroclaw/pull/9217)
- [#9220 feat(eval): comparable run receipts and failure transcript dumps](https://github.com/zeroclaw-labs/zeroclaw/pull/9220)
- [#9221 feat(eval): baseline files with paired regression gating and capability tracking](https://github.com/zeroclaw-labs/zeroclaw/pull/9221)
- [#9222 feat(eval): per-dimension LLM-judge grader, diagnostic until calibrated](https://github.com/zeroclaw-labs/zeroclaw/pull/9222)
- [#9223 feat(eval): junit xml report format](https://github.com/zeroclaw-labs/zeroclaw/pull/9223)
- [#9224 feat(eval): repeated live runs with pass@k, pass^k, and error bars](https://github.com/zeroclaw-labs/zeroclaw/pull/9224)
- [#9225 test(eval): seed regression suite from tracker failures](https://github.com/zeroclaw-labs/zeroclaw/pull/9225)

**结论**：ZeroClaw 在今天完成了“单点修补”，但更重要的是搭起了成体系的评测/回归/基线/报告链路，说明项目正从“功能可用”迈向“可验证、可回归、可度量”。

---

## 3) 社区热点
> 说明：当前数据未提供评论正文，仅有评论数与反应数；且大多数条目评论数很低（最高仅 1），点赞数均为 0。因此这里的“热点”主要按 **问题严重度 + 更新密度 + 主题集中度** 归纳。

### 热点 1：高危稳定性问题集中爆发
- [#9206 Cron agent jobs have no wall-clock timeout; in-flight locks only cleared at process start](https://github.com/zeroclaw-labs/zeroclaw/issues/9206)  
  S0，直接指向数据丢失/安全风险，最容易引发维护优先级上调。
- [#9188 Telegram long-poll advances update offset before successful inbound delivery](https://github.com/zeroclaw-labs/zeroclaw/issues/9188)  
  S0，涉及消息可能丢失，属于通信链路最敏感的问题之一。
- [#9187 WeChat sync cursor persisted before message enqueue — crash loses inbound messages](https://github.com/zeroclaw-labs/zeroclaw/issues/9187)  
  S0，同样是“先推进游标、后入队”的经典丢消息风险。

### 热点 2：运行时与沙箱边界的可靠性争议
- [#9192 shared_budget TOCTOU can wrap AtomicUsize; SopEngine::finish_run unwrap panics under mutex](https://github.com/zeroclaw-labs/zeroclaw/issues/9192)  
  这是今日最具工程含量的问题之一，已有 1 条评论，且对应了明确修复 PR [#9201](https://github.com/zeroclaw-labs/zeroclaw/pull/9201)。
- [#9204 Landlock sandbox locks zeroclaw itself into landlock](https://github.com/zeroclaw-labs/zeroclaw/issues/9204)  
  也是 1 条评论，说明用户/维护者对“自锁”类问题非常敏感。

### 热点 3：评测基础设施开始成为新焦点
- [#9222](https://github.com/zeroclaw-labs/zeroclaw/pull/9222), [#9223](https://github.com/zeroclaw-labs/zeroclaw/pull/9223), [#9224](https://github.com/zeroclaw-labs/zeroclaw/pull/9224), [#9225](https://github.com/zeroclaw-labs/zeroclaw/pull/9225)  
  虽然这些 PR 当前没有展示评论数，但从“连续成组提交”的密度看，已经形成今日最显著的产品方向：**评测体系工程化**。

---

## 4) Bug 与稳定性
按严重程度排序如下：

### S0 - 数据丢失 / 安全风险
1. [#9206](https://github.com/zeroclaw-labs/zeroclaw/issues/9206) Cron agent `workspace_dir` 偶发被解析成 `/`  
   - 风险：可能让 agent 在错误根目录执行，属于严重安全与数据破坏风险。  
   - 是否已有 fix PR：**未见明确对应 PR**。

2. [#9188](https://github.com/zeroclaw-labs/zeroclaw/issues/9188) Telegram 长轮询在成功投递前推进 offset  
   - 风险：失败路径会跳过 update，造成消息丢失。  
   - 是否已有 fix PR：**未见明确对应 PR**。

3. [#9187](https://github.com/zeroclaw-labs/zeroclaw/issues/9187) WeChat 同步游标在入队前持久化  
   - 风险：崩溃即丢 inbound 消息。  
   - 是否已有 fix PR：**未见明确对应 PR**。

### S1 - 工作流阻塞 / 崩溃 / 关键功能失效
4. [#9192](https://github.com/zeroclaw-labs/zeroclaw/issues/9192) shared_budget TOCTOU + mutex 下 unwrap panic  
   - 风险：并发下可能预算回绕或直接 panic。  
   - 是否已有 fix PR：**有**，对应 [#9201](https://github.com/zeroclaw-labs/zeroclaw/pull/9201)。

5. [#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207) `web_fetch` 对压缩响应返回乱码  
   - 风险：agent 无法解析网页内容，直接阻断工作流。  
   - 是否已有 fix PR：**未见明确对应 PR**。

6. [#9204](https://github.com/zeroclaw-labs/zeroclaw/issues/9204) Landlock sandbox 把 zeroclaw 自己锁进 sandbox  
   - 风险：导致 SQLite/进程权限等一系列后续异常。  
   - 是否已有 fix PR：**未见明确对应 PR**。

7. [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) Cron agent 无 wall-clock timeout  
   - 风险：长时间挂起，锁无法及时释放。  
   - 是否已有 fix PR：**未见明确对应 PR**。

8. [#9189](https://github.com/zeroclaw-labs/zeroclaw/issues/9189) Discord gateway 主循环内同步处理附件下载/转写，心跳被饿死  
   - 风险：频道状态异常、连接不稳定。  
   - 是否已有 fix PR：**未见明确对应 PR**。

9. [#9186](https://github.com/zeroclaw-labs/zeroclaw/issues/9186) MCP stdio 响应 ID 不匹配、30s 硬超时与 180–600s 工具预算冲突  
   - 风险：MCP 工具调用可靠性差，且互斥锁持有过久。  
   - 是否已有 fix PR：**未见明确对应 PR**。

### S2 - 退化行为
10. [#9190](https://github.com/zeroclaw-labs/zeroclaw/issues/9190) 可靠 provider key rotation 冷却错 key  
   - 风险：429 后重试策略失真，导致负载分配不正确。  
   - 是否已有 fix PR：**未见明确对应 PR**。

### S3 - 次要问题
11. [#9202](https://github.com/zeroclaw-labs/zeroclaw/issues/9202) `zeroclaw desktop` 死链 + Linux AppImage 识别失败  
   - 风险：影响桌面端引导体验。  
   - 是否已有 fix PR：**未见明确对应 PR**。

12. [#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198) Discord typing indicator 在 daemon reload 后卡死  
   - 风险：UI 状态残留，影响可用性和观感。  
   - 是否已有 fix PR：**未见明确对应 PR**。

### CI / 工具链问题
13. [#9216](https://github.com/zeroclaw-labs/zeroclaw/issues/9216) comment-hygiene gate 在 master 上失败  
   - 风险：阻断 Lint/CI 流水线。  
   - 是否已有 fix PR：**有**，对应 [#9218](https://github.com/zeroclaw-labs/zeroclaw/pull/9218)。

---

## 5) 功能请求与路线图信号

### 今日新出现的功能请求
- [#9228 Eval harness: results dashboard / trend tracking](https://github.com/zeroclaw-labs/zeroclaw/issues/9228)  
  诉求很明确：把单次跑测结果升级为趋势面板，支持 pass-rate、pass@k、错误模式随时间变化的观察。
- [#9227 Eval harness: LLM-judge calibration tooling](https://github.com/zeroclaw-labs/zeroclaw/issues/9227)  
  说明团队已经开始把 LLM judge 从“诊断”推进到“可用于 gate”的阶段，但缺少标定工具链。
- [#9226 Eval harness: memory seeding + memory side-effect graders](https://github.com/zeroclaw-labs/zeroclaw/issues/9226)  
  这是评测系统继续向“状态型场景”扩展的信号，说明仅 workspace grader 已不够。

### 结合现有 PR 判断，下一版本最可能纳入的方向
1. **评测系统完整化**  
   由 [#9212](https://github.com/zeroclaw-labs/zeroclaw/pull/9212)、[#9214](https://github.com/zeroclaw-labs/zeroclaw/pull/9214)、[#9220](https://github.com/zeroclaw-labs/zeroclaw/pull/9220)、[#9221](https://github.com/zeroclaw-labs/zeroclaw/pull/9221)、[#9222](https://github.com/zeroclaw-labs/zeroclaw/pull/9222)、[#9223](https://github.com/zeroclaw-labs/zeroclaw/pull/9223)、[#9224](https://github.com/zeroclaw-labs/zeroclaw/pull/9224)、[#9225](https://github.com/zeroclaw-labs/zeroclaw/pull/9225) 组成的连片 PR 来看，下一版本很可能会围绕 **replay/live 双模式、回归基线、judge、报告格式和重复实验统计** 展开。

2. **SOP / ingress 架构定型**  
   [#9203](https://github.com/zeroclaw-labs/zeroclaw/pull/9203) 与 [#9205](https://github.com/zeroclaw-labs/zeroclaw/pull/9205) 表明项目在把外部流量入口标准化、认证化、集中化，这很像下一阶段的平台化能力。

3. **运行时与性能修补优先级继续提高**  
   [#9201](https://github.com/zeroclaw-labs/zeroclaw/pull/9201)、[#9208](https://github.com/zeroclaw-labs/zeroclaw/pull/9208) 代表的“并发安全 + 性能开销”问题，说明运行时底座仍是高优先级战场。

---

## 6) 用户反馈摘要
> 说明：当前给到的是 Issue 标题、摘要和评论数，没有评论正文，因此以下为基于问题描述的用户诉求归纳，而非逐字评论统计。

- **用户最在意的是“不能丢消息、不能卡死、不能误路由”**  
  这从 [#9187](https://github.com/zeroclaw-labs/zeroclaw/issues/9187)、[#9188](https://github.com/zeroclaw-labs/zeroclaw/issues/9188)、[#9206](https://github.com/zeroclaw-labs/zeroclaw/issues/9206) 非常明显：一旦游标/offset 提前推进，损失就是不可逆的。

- **Agent / runtime 的并发正确性是核心痛点**  
  [#9192](https://github.com/zeroclaw-labs/zeroclaw/issues/9192)、[#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)、[#9186](https://github.com/zeroclaw-labs/zeroclaw/issues/9186) 体现出用户对“预算、超时、锁、响应匹配”极其敏感。

- **工具调用的“输出可解析性”是基本要求**  
  [#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207) 说明只要 `web_fetch` 返回乱码，agent 就无法继续工作；这类问题往往直接被用户视为“不可用”。

- **边界隔离/沙箱行为必须可预测**  
  [#9204](https://github.com/zeroclaw-labs/zeroclaw/issues/9204) 反映了用户对安全策略误伤的容忍度很低，尤其是执行 shell 命令时。

- **评测能力正在从“能跑”转向“能量化、能比较、能复现”**  
  [#9226](https://github.com/zeroclaw-labs/zeroclaw/issues/9226)、[#9227](https://github.com/zeroclaw-labs/zeroclaw/issues/9227)、[#9228](https://github.com/zeroclaw-labs/zeroclaw/issues/9228) 反映出用户/维护者希望把评测结果真正产品化，而不是停留在单次输出。

---

## 7) 待处理积压
严格来说，当前提供的数据窗口里没有“长期未响应”的老 Issue；绝大多数条目都是 7 月 20–21 日新鲜创建，说明 **积压更像“高压待审池”而不是历史陈旧池**。  
不过，从风险和影响面看，建议维护者优先关注以下开放项：

### 最高优先级
- [#9206](https://github.com/zeroclaw-labs/zeroclaw/issues/9206) S0 工作目录错误
- [#9188](https://github.com/zeroclaw-labs/zeroclaw/issues/9188) Telegram 丢消息
- [#9187](https://github.com/zeroclaw-labs/zeroclaw/issues/9187) WeChat 丢消息
- [#9192](https://github.com/zeroclaw-labs/zeroclaw/issues/9192) 并发预算与 panic 风险（已有修复 PR [#9201](https://github.com/zeroclaw-labs/zeroclaw/pull/9201)）

### 需要尽快排查的阻塞型问题
- [#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207) 压缩响应乱码
- [#9204](https://github.com/zeroclaw-labs/zeroclaw/issues/9204) Landlock 自锁
- [#9186](https://github.com/zeroclaw-labs/zeroclaw/issues/9186) MCP stdio 超时与响应匹配
- [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) Cron agent 无墙钟超时
- [#9189](https://github.com/zeroclaw-labs/zeroclaw/issues/9189) Discord 心跳饿死

### PR 侧待处理的“长链条”工作
- [#9212](https://github.com/zeroclaw-labs/zeroclaw/pull/9212) 到 [#9225](https://github.com/zeroclaw-labs/zeroclaw/pull/9225) 的 eval harness 系列
- [#9203](https://github.com/zeroclaw-labs/zeroclaw/pull/9203)、[#9205](https://github.com/zeroclaw-labs/zeroclaw/pull/9205) 的 SOP 入口体系改造
- [#9208](https://github.com/zeroclaw-labs/zeroclaw/pull/9208) 的运行时性能优化

---

### 总体结论
ZeroClaw 今天呈现出典型的“**高强度开发 + 高密度修复**”状态：一方面，评测基础设施在快速成型，另一方面，运行时和多渠道消息处理链路暴露出多起高严重度问题。  
如果接下来 24–72 小时内能持续推进 S0/S1 修复并逐步合入 eval harness 系列，项目健康度会显著改善；否则当前的稳定性风险仍会继续压制发布节奏。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*