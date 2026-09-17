# OpenClaw 生态日报 2026-09-17

> Issues: 7 | PRs: 66 | 覆盖项目: 13 个 | 生成时间: 2026-09-17 03:56 UTC

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
日期：2026-09-17  
仓库：github.com/openclaw/openclaw

---

## 1. 今日速览

过去 24 小时 OpenClaw 活跃度很高：Issues 更新 7 条，其中 6 条仍处于开放状态，PR 更新 66 条，其中 60 条仍待合并。今日工作重心明显集中在 **Gateway 启动/线程阻塞优化、会话恢复、WebUI 体验、消息/通道可靠性、安全边界与 CI 发布流程**。  
从标签看，多个问题被标记为 P1/P2、`impact:crash-loop`、`impact:security`、`impact:session-state`，说明项目当前正在处理较核心的稳定性和安全性议题。PR 侧维护者参与度较高，多个 PR 已处于 `ready for maintainer look`，但待合并队列偏长，短期内 review 压力较大。  
整体健康度评估：**开发活跃、响应较快，但主干合并压力和稳定性债务较高**，尤其是 Gateway 主线程阻塞、Agent 长任务超时、消息工具授权边界等问题值得优先处理。

---

## 2. 项目进展

> 今日无新版本发布。以下为今日关闭或进入关键推进阶段的重要 PR / Issue。

### 已关闭 / 已推进的重要事项

#### PR #150376 - `feat(onboarding): add Apple on-device setup and utility model`  
链接：openclaw/openclaw PR #150376  
状态：CLOSED  
标签：`app: macos`、`app: web-ui`、`gateway`、`cli`、`agents`、`dependencies-changed`、`P2`、`merge-risk: compatibility`

该 PR 推进了 macOS 端 Apple Intelligence / Apple Foundation Models 的本地模型引导能力，目标是让 Mac 用户在无需 API Key 的情况下完成引导设置，同时避免把小型本地模型误设为常规 Agent 模型。  
虽然当前状态为 closed，数据未明确显示是否已合并，但从内容看这是一个较大的 onboarding 方向改动，涉及 macOS、WebUI、Gateway、CLI、Agent 和依赖更新。它反映出 OpenClaw 正在加强 **本地模型、低门槛启动和端侧智能体验**。

#### PR #150414 - `refactor(fs): reuse prefix resolution and bounded reads`  
链接：openclaw/openclaw PR #150414  
状态：CLOSED  
标签：`docs`、`channel: imessage`、`size: M`、`proof: sufficient`

该 PR 旨在复用 `fs-safe` 依赖中已有的路径前缀解析与有界读取能力，减少 OpenClaw 内部重复实现。  
用户侧无预期行为变化，但对代码维护性和文件读取安全边界有积极意义。该类重构有助于降低未来文件系统相关 bug 与安全风险。

#### Issue #150487 - `Subagents bypass unavailable messaging tools through the CLI`  
链接：openclaw/openclaw Issue #150487  
状态：CLOSED  
标签：`impact:session-state`、`issue-rating: diamond lobster`、`P2`

该问题指出 spawned worker 即使被设计为无法使用消息工具，也可以通过 `exec` 调用 `openclaw gateway call sessions.send` 绕过限制。  
问题已关闭，说明维护者可能已接受、处理或转入相关修复流程。该问题涉及 **子 Agent 权限边界、消息归因、session attribution**，属于 Agent 安全模型中的关键点。

### 仍在推进中的关键 PR

#### PR #150562 - `fix(recovery): yield between store recovery iterations`  
链接：openclaw/openclaw PR #150562  
关联：Issue #149935  
状态：OPEN

该 PR 直接修复主会话重启恢复时逐 store 同步读导致 Gateway 事件循环长时间阻塞的问题。用户报告中 237 个 agents、会话存储位于 U 盘时可造成约 63.6 秒冻结。  
如果合并，将显著改善大规模 Agent 环境和慢速存储场景下的启动可靠性。

#### PR #149864 - `fix(codex): preserve native subagent results through recovery`  
链接：openclaw/openclaw PR #149864  
状态：OPEN，`ready for maintainer look`

该 PR 处理 Codex native subagent 在 yield、restart 或 parent-session reset 期间可能覆盖、丢失或错投结果的问题。  
这是对 Agent 任务恢复语义的重要修复，尤其影响多轮任务、长任务和子 Agent 协作结果的可信度。

#### PR #150493 - `fix(channels): prevent inbound tasks from stalling during restart`  
链接：openclaw/openclaw PR #150493  
状态：OPEN，`ready for maintainer look`

该 PR 解决 Gateway 重启期间，通过 channel-plugin raw inbound runner 进入的任务可能因缺少 reply dispatcher 而停滞的问题。  
这对 Telegram、Matrix、IMAP 等通道型入口的可靠性有直接影响。

---

## 3. 社区热点

### 热点 1：Gateway 启动与恢复期间阻塞问题  
- Issue：openclaw/openclaw Issue #149935  
- PR：openclaw/openclaw PR #150562  
- 相关 PR：openclaw/openclaw PR #150561、openclaw/openclaw PR #149847、openclaw/openclaw PR #149737、openclaw/openclaw PR #150565、openclaw/openclaw PR #150570

用户报告在大量 Agent、慢速存储环境下，主会话恢复逐 store 同步读取导致开机冻结 63.6 秒。围绕这一方向，今日出现多条 PR：  
- 跳过 startup 中未使用的 update-history diagnostics  
- 移除 Gateway startup 中未使用工作  
- 复用 Doctor metadata snapshots  
- 将 first-use session categories 注册移出 Gateway thread  
- 将 APNs registration SQLite lookup 移出 Gateway thread  

背后诉求很明确：**OpenClaw 的 Gateway 主线程必须保持响应，尤其是在大规模 Agent、慢盘、复杂插件环境中**。这也是今日最集中的工程主题。

### 热点 2：Agent 长任务与恢复语义  
- Issue：openclaw/openclaw Issue #150544  
- PR：openclaw/openclaw PR #150513  
- PR：openclaw/openclaw PR #149864  
- PR：openclaw/openclaw PR #149916

Issue #150544 报告 Agent 启动长时间后台子进程后等待/轮询时，会被 lane progress-idle timeout 在约 900–930 秒后杀死，且进展不可见，最终诊断被泛化为 abort。  
这反映出用户正在用 OpenClaw 执行更长、更复杂的自动化任务，例如后台构建、测试、下载、批处理等。当前进度判断机制对“后台子进程仍在工作”的感知不足。

相关 PR 中，#150513 处理长单轮工具循环中的 overflow recovery budget 不会在成功模型调用后恢复的问题；#149864 修复 native subagent 结果在恢复过程中的保留问题；#149916 则减少 completed workspace 中重复注入上下文导致的 prompt 成本。整体看，Agent runtime 正在从“可运行”走向“长任务可恢复、低成本、可解释”。

### 热点 3：WebUI 可用性与状态一致性  
- Issue：openclaw/openclaw Issue #150571  
- PR：openclaw/openclaw PR #150566  
- PR：openclaw/openclaw PR #150305  
- PR：openclaw/openclaw PR #150528  
- PR：openclaw/openclaw PR #150549  
- PR：openclaw/openclaw PR #150551  
- PR：openclaw/openclaw PR #150569  
- PR：openclaw/openclaw PR #150350

WebUI 相关工作非常活跃，覆盖状态持久化、catalog 缓存、session update、可访问性、移动端命令入口、外链标识和回复 attribution。  
其中 Issue #150571 指出打开已保存聊天时，即使 hydration 没有改变消息或 snapshot 字段，也会重写持久化 transcript。这类问题会带来不必要的 I/O、同步噪音和潜在的数据一致性风险。  
整体诉求是：**WebUI 不只是展示层，而是需要对会话状态、持久化快照和多 Agent 切换保持严格一致性**。

### 热点 4：安全边界与权限模型  
- Issue：openclaw/openclaw Issue #150487  
- Issue：openclaw/openclaw Issue #150558  
- PR：openclaw/openclaw PR #150534  
- PR：openclaw/openclaw PR #150272

今天安全相关议题较多：  
- 子 Agent 通过 CLI 绕过不可用消息工具  
- IMAP 插件 DMARC DNS timeout 过短导致误判  
- Gateway TLS 证书/密钥文件读取需要上限  
- secret audience 与 assignment 管理 UI 正在推进  

这表明 OpenClaw 的使用场景正在向多 Agent、插件化、跨通道、涉密配置方向扩展，安全边界正在成为路线图核心。

---

## 4. Bug 与稳定性

按严重程度和影响范围排序：

### P0/P1 级关注

#### 1. 主会话恢复同步 I/O 导致启动冻结 63.6 秒  
- Issue：openclaw/openclaw Issue #149935  
- 状态：OPEN  
- 严重标签：`impact:crash-loop`、`P2`、`diamond lobster`  
- Fix PR：openclaw/openclaw PR #150562

问题表现为 Gateway ready 后约 10 秒出现一次 63.6 秒事件循环阻塞，主要发生在大量 agents、慢速 U 盘存储环境。  
这是高影响稳定性问题：即使不是直接 crash，也会造成用户感知上的“假死”或 watchdog 误判。已有针对性 fix PR，建议优先 review。

#### 2. Agent 长后台子进程被 progress-idle timeout 杀死  
- Issue：openclaw/openclaw Issue #150544  
- 状态：OPEN  
- 标签：`P2`、`impact:other`、`needs-info`  
- Fix PR：暂无明确直接 PR

长任务约 900–930 秒后被终止，原因是 progress timer 只在任务启动时 arm 一次，没有根据真实进展续期。  
该问题会影响构建、测试、部署、批处理等真实生产场景。建议补充 repro 后尽快明确：后台 subprocess 输出、polling、文件变化或 tool progress 是否应续期。

#### 3. Overflow recovery budget 在成功模型调用后不恢复  
- PR：openclaw/openclaw PR #150513  
- 状态：OPEN  
- 严重标签：`P1`、`needs proof`

该 PR 修复长单轮工具循环中，run-level `overflowCompactionAttempts` 只增不减，导致第 4 次 compact-routed precheck 后提前耗尽 provider overflow recovery 的问题。  
属于 Agent 长任务可靠性问题，建议补充 proof 后优先推进。

### P2 级稳定性与安全问题

#### 4. IMAP 插件 DNS timeout 过短导致合法签名邮件 DMARC 误失败  
- Issue：openclaw/openclaw Issue #150558  
- 状态：OPEN  
- 标签：`bug`、`impact:security`、`impact:message-loss`、`needs-security-review`  
- Fix PR：暂无

IMAP sender authentication 使用硬编码 DNS resolver：`timeout: 5000`、`tries: 1`，可能导致 DKIM/SPF/DMARC 检查因临时 DNS 抖动失败，从而误判有效邮件。  
该问题同时影响安全判断和消息可靠性：过严会丢合法邮件，过松又可能放入伪造邮件。建议由安全维护者审阅 DNS retry / softfail 策略。

#### 5. Matrix message read 忽略 `--message-id`  
- Issue：openclaw/openclaw Issue #150552  
- 状态：OPEN  
- 标签：`clawsweeper:bulk-filed`  
- Fix PR：暂无

`openclaw message read --channel matrix --message-id <eventId>` 忽略指定 id，返回房间最新历史。这会破坏消息读取的确定性，也可能导致 Agent 操作错误上下文。  
建议补充单元测试覆盖 CLI 与 agent message tool 两条路径。

#### 6. WebUI 打开保存聊天会重写未变化 snapshot  
- Issue：openclaw/openclaw Issue #150571  
- 状态：OPEN  
- 标签：`bug`、`maintainer`  
- Fix PR：可能与 openclaw/openclaw PR #150566、openclaw/openclaw PR #150305 方向相关，但未见直接关联

该问题造成不必要的持久化写入，可能放大 I/O 和同步成本。对大聊天记录、慢盘和多设备同步用户尤其明显。

#### 7. Gateway TLS certificate/key 文件可被超大输入拖垮  
- PR：openclaw/openclaw PR #150534  
- 状态：OPEN  
- 标签：`P2`、`merge-risk: compatibility`

PR 增加 64 KiB 上限，避免 Gateway startup、证书续期、公钥检查时缓冲任意大文件。  
该修复对资源耗尽防护有意义，建议尽快 review。

#### 8. Channel plugin inbound task 在 Gateway restart 期间可能停滞  
- PR：openclaw/openclaw PR #150493  
- 状态：OPEN  
- 标签：`P2`、`ready for maintainer look`

影响通道插件任务在重启场景下的 reply dispatcher 归属和恢复能力，属于生产环境可靠性问题。

---

## 5. 功能请求与路线图信号

### 1. 支持 `sessions_send` 发送到 thread-scoped sessions  
- Issue：openclaw/openclaw Issue #150560  
- 状态：OPEN  
- 标签：`enhancement`、`impact:session-state`、`needs-product-decision`

用户希望 `sessions_send` 可以面向 thread-scoped sessions，而不是只能使用 parent channel session。理由是 thread 拥有独立上下文，父 channel 并不等价。  
该请求触及 session visibility 与 agent-to-agent authorization。由于已有 `needs-product-decision` 和 `needs-security-review` 类标签，短期内可能不会直接合并，但它是重要路线图信号：**OpenClaw 的会话模型正在从 channel-level 走向更细粒度的 thread-level 交互**。

### 2. Secret audiences and assignments 管理 UI  
- PR：openclaw/openclaw PR #150272  
- 状态：OPEN  
- 标签：`app: web-ui`、`app: android`、`gateway`、`cli`、`agents`、`merge-risk: security-boundary`

该 PR 为 agent-scoped secret backend 增加人类可操作的控制面，避免安全配置只能通过 CLI 管理。  
这很可能进入下一阶段路线图，因为它直接补齐 secret assignment 的可用性短板。但 PR 体量大、涉及安全边界，需要严格 review 和 proof。

### 3. Railway sandbox execution capability  
- PR：openclaw/openclaw PR #150543  
- 状态：OPEN  
- 标签：`size: XL`、`external-plugin-candidate`、`dependencies-changed`

该 PR 增加 Railway sandbox extension，提供 `railway_sandbox`、`railway_exec`、`railway_file` 等工具。  
标签显示它可能更适合作为 external plugin，而非核心内置能力。路线图信号是：OpenClaw 社区正在探索 **远程沙箱执行、隔离运行环境、可销毁任务执行容器**。

### 4. WebUI 交互体验增强  
- PR：openclaw/openclaw PR #150528 - 外链上箭头标识  
- PR：openclaw/openclaw PR #150549 - 回复 attribution 中引用被回答的 prompt  
- PR：openclaw/openclaw PR #150551 - 移动端保持 command palette 搜索图标可见  
- PR：openclaw/openclaw PR #150569 - 最新回复操作仅在 hover/focus 显示  
- PR：openclaw/openclaw PR #150350 - Swarm child statuses 支持屏幕阅读器

这些 PR 表明 WebUI 正在进行一轮细节打磨，重点是可访问性、移动端、共享会话上下文和视觉一致性。多数体量较小，进入下一版本的可能性相对较高。

---

## 6. 用户反馈摘要

### 大规模 Agent 用户：启动冻结不可接受  
代表 Issue：openclaw/openclaw Issue #149935  
用户场景是 237 agents，会话存储位于 U 盘。反馈表明 OpenClaw 已被用于较大规模、多 Agent 常驻环境。  
痛点不是功能缺失，而是 Gateway ready 后仍会出现长时间事件循环阻塞，导致“看似启动成功但随后冻结”。这会削弱用户对稳定性的信任。

### 长任务用户：后台进程工作时系统误判“无进展”  
代表 Issue：openclaw/openclaw Issue #150544  
用户期望 Agent 能够可靠等待长时间 subprocess，而不是因 progress-idle timeout 被杀死。  
痛点在于 OpenClaw 目前的 progress 机制无法表达“外部进程仍在工作”，最终错误诊断也被替换成泛化 abort，降低了可排查性。

### 消息/通道用户：读取和发送语义需要更精确  
代表 Issue：openclaw/openclaw Issue #150552、openclaw/openclaw Issue #150560  
Matrix 用户希望按 message id 精确读取，而不是返回最新历史。会话用户希望能向 thread-scoped session 发送消息，而不是被迫使用 parent channel。  
这说明用户已经在构建更复杂的 channel/session workflow，需要确定性更强、粒度更细的消息 API。

### 安全敏感用户：权限边界和认证误判都很重要  
代表 Issue：openclaw/openclaw Issue #150487、openclaw/openclaw Issue #150558  
子 Agent 通过 CLI 绕过工具限制说明用户或维护者正在主动审视 Agent 权限模型。IMAP DMARC 误失败说明安全机制不能只追求严格，也要处理真实网络环境中的 DNS 抖动。  
用户诉求是：**安全边界要可靠、可解释，同时不能误伤正常工作流**。

### WebUI 用户：状态更新、持久化和细节体验仍需打磨  
代表 Issue：openclaw/openclaw Issue #150571  
相关 PR：openclaw/openclaw PR #150305、openclaw/openclaw PR #150566、openclaw/openclaw PR #150528、openclaw/openclaw PR #150551  
WebUI 用户关注点包括 session 更新不丢失、移动端入口可见、外链有明确提示、保存聊天不做无意义 rewrite。  
这表明 OpenClaw WebUI 已进入“高频使用后的细节优化期”。

---

## 7. 待处理积压

### 1. 待合并 PR 数量偏高  
过去 24 小时共有 66 条 PR 更新，其中 60 条仍待合并。多个 PR 已标记为 `ready for maintainer look`，但涵盖 Gateway、Agent、WebUI、安全、CI 等多个方向。  
建议维护者优先 review 以下高影响 PR：

- openclaw/openclaw PR #150562  
  修复 Gateway recovery loop 事件循环阻塞，关联严重启动冻结问题。

- openclaw/openclaw PR #149864  
  修复 Codex native subagent 结果在恢复过程中的丢失或错投。

- openclaw/openclaw PR #150493  
  修复 Gateway restart 期间 inbound channel tasks 停滞。

- openclaw/openclaw PR #150534  
  限制 TLS certificate/key 文件大小，降低资源耗尽风险。

- openclaw/openclaw PR #150513  
  修复 Agent overflow recovery budget 不恢复问题，但仍需 proof。

- openclaw/openclaw PR #150494  
  修复 `openclaw update` 在 service inspection 不可用时拒绝继续的问题，影响 Linux 更新路径。

### 2. 需要产品决策的问题

#### Issue #150560 - thread-scoped sessions 发送支持  
链接：openclaw/openclaw Issue #150560  
当前已有 `needs-product-decision` 和 `needs-maintainer-review` 标签。  
该问题涉及 session 模型和授权边界，不建议仅作为 bug 修复处理，应明确产品语义：哪些 session 可见、哪些 Agent 可发、thread 与 parent channel 的权限继承关系如何定义。

### 3. 需要安全 review 的问题

#### Issue #150558 - IMAP DMARC DNS timeout  
链接：openclaw/openclaw Issue #150558  
该问题同时涉及误拒合法邮件和邮件认证安全策略，建议安全维护者介入，制定 DNS retry、timeout、temporary failure 处理规范。

#### PR #150272 - secret audiences and assignments UI  
链接：openclaw/openclaw PR #150272  
该 PR 涉及安全配置可视化管理，建议在合并前进行威胁建模和权限回归测试。

### 4. 需要补充 proof 的 PR

#### PR #150513 - overflow recovery budget  
链接：openclaw/openclaw PR #150513  
当前标记 `status: needs proof`。建议补充复现用例、长单轮工具循环测试和 provider overflow recovery 回归测试。

#### PR #150272 - secret 管理 UI  
链接：openclaw/openclaw PR #150272  
体量 XL，且涉及安全边界和 Android/WebUI/Gateway/CLI/Agent 多端联动，建议补充截图、端到端测试和权限矩阵说明。

---

## 总结

OpenClaw 今日呈现出高强度维护状态，核心关注点集中在 **Gateway 主线程去阻塞、Agent 长任务可靠性、session/message 语义、安全边界、WebUI 状态一致性**。  
项目活跃度非常高，但待合并 PR 数量达到 60 条，说明 review 和合并通道可能成为短期瓶颈。建议维护者优先处理与启动冻结、任务恢复、通道重启、安全边界相关的 P1/P2 项，随后再合并 WebUI 体验类小改，以降低主干风险并尽快释放稳定性收益。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
日期：2026-09-17

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态整体呈现出 **高活跃、高稳定性压力、高工程化投入** 的状态。OpenClaw、Hermes Agent、CoPaw、ZeroClaw 等头部项目均有大量 Issue / PR 更新，说明真实用户正在将这些系统用于长任务、多通道消息、桌面端、自动化调度和企业 IM 场景。  
从问题类型看，生态焦点已从“能否调用模型和工具”转向 **Gateway 可靠性、会话状态一致性、消息投递确定性、Agent 长任务恢复、安全边界和多端体验**。  
多个项目同时暴露出流式响应、MCP/OAuth、语音/STT/TTS、多渠道 adapter、Windows 生命周期、CI 挂死等问题，说明 AI Agent 正在进入更复杂的生产化验证阶段。  
整体判断：生态处于快速迭代期，但主流项目已经开始从功能扩张转向 **可靠性、可恢复性、可观测性和安全治理**。

---

## 2. 各项目活跃度对比

> 注：Issues / PR 数均基于题述 24 小时动态摘要；“Release”均指过去 24 小时是否有新版本发布。

| 项目 | Issues 更新 | PR 更新 | Release | 今日主要关注点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 7 | 66 | 无 | Gateway 去阻塞、会话恢复、WebUI、消息/通道可靠性、安全边界 | **高活跃，核心稳定性债务较高**；维护响应快，但 60 个待合并 PR 带来 review 压力 |
| **NanoBot** | 1 | 7 | 无 | 多会话隔离、Agent 消息串行化、TUI 响应、文件编辑工具稳定性 | **良好但稳定性修复压力较高**；问题集中、PR 规模可控 |
| **Hermes Agent** | 50 | 50 | 无 | Gateway 消息投递、Windows Desktop 生命周期、Cron/Kanban、Provider 路由 | **极高活跃，稳定性压力高**；真实用户反馈密集，需优先压降 P1/P2 |
| **PicoClaw** | 0 | 0 | 无 | 无活动 | **低活跃 / 静默** |
| **NanoClaw** | 2 | 10 | 无 | Bun `spawnSync` 挂死、Gateway/Iron Proxy、Signal 通道、安装体验 | **高修复密度，中等风险**；CI 与 provider registry 仍需硬化 |
| **NullClaw** | 1 | 0 | 无 | 移动端客户端架构探索 | **低活跃**；有路线信号但无代码推进 |
| **IronClaw** | 0 | 0 | 无 | 无活动 | **低活跃 / 静默** |
| **LobsterAI** | 0 | 4 | 无 | OpenClaw 修复链路、飞书插件、认证代理、状态迁移 | **中等活跃，质量巩固型**；偏维护者驱动 |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **低活跃 / 静默** |
| **Moltis** | 1 | 1 | 无 | Remote MCP 自恢复、per-agent sandbox | **中等偏稳**；问题少但指向核心可靠性和安全隔离 |
| **CoPaw / QwenPaw** | 13 | 12 | 无 | Console/SSE、MCP OAuth、桌面会话状态、上下文管理、前端性能 | **高活跃，高暴露，高修复推进**；Console/桌面端稳定性是短期风险 |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **低活跃 / 静默** |
| **ZeroClaw** | 19 | 19 | 无 | 多渠道消息、语音/STT/TTS、运行时解析、多模态、Windows 服务 | **高活跃，review 瓶颈明显**；问题暴露充分但合并吞吐为 0 |

### 活跃度分层

| 层级 | 项目 | 特征 |
|---|---|---|
| **超高活跃 / 高复杂度** | OpenClaw、Hermes Agent | Issue/PR 密集，涉及 Gateway、通道、状态、安全、桌面端等核心路径 |
| **高活跃 / 快速修复** | CoPaw、ZeroClaw、NanoClaw | 问题集中在 Console、消息、语音、CI、provider、通道适配 |
| **中等活跃 / 质量巩固** | NanoBot、LobsterAI、Moltis | PR 数较少但聚焦明确，多为稳定性、安全或兼容性增强 |
| **低活跃 / 静默观察** | PicoClaw、NullClaw、IronClaw、TinyClaw、ZeptoClaw | 当日无代码推进或仅有路线探索 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 定位概括

OpenClaw 是当前样本中最接近“全栈个人 AI 助手运行时”的项目之一，覆盖 **Gateway、CLI、WebUI、macOS、本地模型、Agent runtime、多通道消息、安全权限、会话恢复和插件生态**。  
与 NanoBot、Moltis 这类更聚焦 Agent loop / sandbox / MCP 的项目相比，OpenClaw 的系统边界更宽；与 Hermes Agent、CoPaw、ZeroClaw 相比，OpenClaw 今日的重点更偏向 **Gateway 主线程性能、会话恢复语义、安全边界和 WebUI 状态一致性**。

### 3.2 优势

1. **工程覆盖面广**  
   今日 PR 涉及 macOS、WebUI、Gateway、CLI、Agent、channel、security、CI 等多个模块，说明 OpenClaw 已形成较完整的个人 AI 助手基础设施。

2. **Gateway 与会话恢复能力受到重点投入**  
   Issue #149935 与 PR #150562 显示维护者正在处理 237 agents + 慢速 U 盘场景下 63.6 秒事件循环阻塞问题。相比许多项目仍在处理单通道或单会话问题，OpenClaw 已经暴露并处理更大规模 Agent 常驻场景。

3. **本地模型与端侧智能路线明确**  
   PR #150376 引入 Apple on-device setup 和 utility model，引导用户无需 API Key 启动。这区别于主要依赖远程 provider 的项目，说明 OpenClaw 正在强化低门槛、本地优先体验。

4. **安全边界意识较强**  
   子 Agent 通过 CLI 绕过消息工具限制、TLS cert/key 文件大小上限、secret audiences UI 等议题说明 OpenClaw 已经进入 Agent 权限模型和密钥治理阶段。

### 3.3 当前短板

1. **待合并 PR 过多**  
   过去 24 小时 66 条 PR 更新，60 条仍待合并，review 队列明显偏长。

2. **核心稳定性债务较集中**  
   Gateway 主线程阻塞、长任务 progress timeout、channel restart task stall、session state 边界等问题均影响生产化体验。

3. **WebUI 状态一致性仍需打磨**  
   打开保存聊天重写未变化 snapshot、session update、catalog cache 等问题表明 WebUI 已不只是展示层，而是状态系统的一部分。

### 3.4 与同类项目社区规模对比

| 项目 | 今日 Issue/PR 总更新量 | 对比判断 |
|---|---:|---|
| Hermes Agent | 100 | 今日最活跃，用户问题暴露最多 |
| OpenClaw | 73 | PR 侧最密集之一，维护/开发推进强 |
| ZeroClaw | 38 | 多渠道与语音方向活跃 |
| CoPaw | 25 | Console/桌面端问题密集 |
| NanoClaw | 12 | CI/Gateway/Signal 修复集中 |
| NanoBot | 8 | 小而聚焦，多会话和工具层修复 |

OpenClaw 的社区规模和工程吞吐处于第一梯队，仅次于 Hermes Agent 的总更新量；但 OpenClaw 的 PR 更新量更高，说明其内部工程推进和维护队列非常活跃。

---

## 4. 共同关注的技术方向

### 4.1 Gateway / Runtime 主循环可靠性

涉及项目：**OpenClaw、Hermes Agent、NanoClaw、CoPaw、Moltis、ZeroClaw**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | Gateway 启动/恢复期间不能因同步 I/O 阻塞事件循环；237 agents 场景冻结 63.6 秒 |
| Hermes Agent | Gateway 消息投递、Telegram poller stall、Feishu WS 失联、Dashboard plugin hub 阻塞事件循环 |
| NanoClaw | Gateway/Iron Proxy WebSocket、OAuth、cache miss、状态块完整性 |
| CoPaw | Console SSE 裸 `null` payload、失败路径缺少终止事件 |
| Moltis | Remote MCP server 启动失败后不重试，lost session 后持续失败 |
| ZeroClaw | Runtime streaming guard 误判、工具调用 fallback 解析、多模态 turn 生命周期 |

**趋势判断：**  
Agent 系统的核心瓶颈正在从模型调用转向 runtime/gateway 的事件循环、恢复机制和协议健壮性。

---

### 4.2 多会话 / 会话状态隔离

涉及项目：**OpenClaw、NanoBot、Hermes Agent、CoPaw**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | Codex native subagent 结果在恢复中保留；thread-scoped sessions 发送语义；session attribution |
| NanoBot | 每 session FIFO inbox、单 worker 处理、跨会话回复错投修复 |
| Hermes Agent | async delegation route 竞态、Copilot session model override 重启丢失 |
| CoPaw | 桌面端启动后 slash command 作用到 fallback session，需等待 chat ownership |

**趋势判断：**  
随着多 Agent、多会话、多窗口和长任务普及，session isolation 已成为 Agent 产品可信度的基础。

---

### 4.3 消息通道可靠性与投递可观测性

涉及项目：**OpenClaw、Hermes Agent、NanoClaw、ZeroClaw、CoPaw、LobsterAI**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | Matrix `--message-id` 精确读取、inbound task restart 不停滞、thread session send |
| Hermes Agent | Telegram/Feishu/Discord/Weixin/Teams 等通道出现失聪、重复派发、附件静默失败 |
| NanoClaw | Signal 附件、DM routing、outbound queue 修复 |
| ZeroClaw | Mattermost 首条 DM 丢失、delivery receipts RFC、durable human question primitive |
| CoPaw | 飞书 p2p 发送与文件事件问题 |
| LobsterAI | 飞书插件原生 Node 加载失败修复 |

**趋势判断：**  
“消息发送成功”不再能停留在 best-effort 层面。未来主流 Agent 框架需要 delivery receipt、ack、幂等、失败上报和平台级 watchdog。

---

### 4.4 长任务、调度与恢复

涉及项目：**OpenClaw、Hermes Agent、NanoClaw、ZeroClaw**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | Agent 长后台 subprocess 约 900 秒后被 progress-idle timeout 杀死 |
| Hermes Agent | Cron/Kanban heartbeat、respawn、running 状态滞留、occurrence 被跳过 |
| NanoClaw | scheduled task pre-script 强制 bash 导致 shebang 失效 |
| ZeroClaw | Windows task owner 识别、service log bounded、manual recoverable context compaction |

**趋势判断：**  
Agent 正从短交互助手走向长期自动化执行器，调度状态机、heartbeat、进度感知和中断恢复会成为关键竞争力。

---

### 4.5 安全边界、权限和沙箱

涉及项目：**OpenClaw、Moltis、NanoClaw、CoPaw、ZeroClaw、Hermes Agent**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | 子 Agent 绕过消息工具限制、secret audiences UI、TLS 文件大小上限 |
| Moltis | per-agent mounts、run_as、forced sandbox |
| NanoClaw | approval TTL、reject by id、审批卡片过期 |
| CoPaw | Discuss vs Execute 模式、Tool Guard i18n |
| ZeroClaw | durable human question primitive、delivery receipts、runtime guard 修复 |
| Hermes Agent | agent 可通过 `taskkill` 杀死 Gateway，需 lifecycle guard |

**趋势判断：**  
Agent 权限模型正在从“工具是否可用”升级为“谁可调用、在哪个会话调用、是否需要审批、是否可恢复、是否可审计”。

---

### 4.6 Provider / MCP / OAuth / 模型路由

涉及项目：**Hermes Agent、CoPaw、Moltis、NanoClaw、LobsterAI、OpenClaw**

| 项目 | 具体诉求 |
|---|---|
| Hermes Agent | provider switch stale model route、Copilot route 重启丢失、DeepSeek DSML tool call |
| CoPaw | MCP OAuth access token 刷新后未应用到 live client |
| Moltis | Remote MCP streamable HTTP 启动失败和 session 丢失恢复 |
| NanoClaw | OpenCode provider、Iron Proxy、Gateway OAuth |
| LobsterAI | 托管代理凭证 cooldown 豁免，区分上游故障和用户凭证问题 |
| OpenClaw | Apple on-device model onboarding、本地模型引导 |

**趋势判断：**  
Provider 抽象正在变复杂：不仅要支持多模型，还要处理 API mode、OAuth refresh、tool-call 方言、本地模型、fallback 透明度和计费/隐私边界。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特点 |
|---|---|---|---|
| **OpenClaw** | 全栈个人 AI 助手、Gateway、WebUI、CLI、多通道、本地模型、安全边界 | 高级个人用户、开发者、多 Agent 长驻用户 | Gateway-centric，强调会话恢复、端侧模型、插件/通道、安全治理 |
| **Hermes Agent** | 桌面端 + Gateway + Cron/Kanban 自动化 + 多平台消息 | 重度自动化用户、Windows/Linux 混合用户、企业 IM 用户 | 强调长期运行、桌面生命周期、调度系统、多 provider 路由 |
| **NanoBot** | Agent loop、多会话隔离、TUI、工具编辑 | 代码型 Agent 用户、CLI/TUI 用户 | 轻量聚焦，重视 per-session FIFO、工具层正确性 |
| **NanoClaw** | Gateway / Iron Proxy、provider registry、Signal、CI 硬化 | 框架维护者、provider 集成开发者、通道接入用户 | 强调 Bun runtime、provider gateway、测试与安装链路 |
| **LobsterAI** | OpenClaw 集成、桌面修复、认证代理、插件兼容 | 使用 LobsterAI 分发版 / 托管模型用户 | 偏产品化封装，强化 OpenClaw 修复、迁移和托管 provider 稳定性 |
| **Moltis** | MCP、Agent sandbox、安全执行 | 自托管、企业、安全敏感 Agent 部署 | MCP-centric，强化 remote MCP 自恢复和 per-agent sandbox |
| **CoPaw / QwenPaw** | Console/Desktop、SSE、MCP、上下文管理、Creator 插件 | 桌面端用户、中文用户、多模态/内容生产用户 | 前后端一体，重视 Console 体验、流式响应和插件应用 |
| **ZeroClaw** | 多渠道消息、语音/STT/TTS、多模态、ZeroCode | 多渠道个人助手用户、语音交互用户、开发者 | channel-heavy，强调人机协作原语、语音路由、多模态运行时 |
| **NullClaw** | 移动端客户端路线探索 | 移动端 Agent 客户端潜在用户 | 暂无代码推进，关注 Rust core + 原生 iOS/Android |
| **PicoClaw / IronClaw / TinyClaw / ZeptoClaw** | 暂无当日活动 | 不明确 | 当前无可判断动态 |

### 关键差异总结

- **OpenClaw / Hermes Agent / ZeroClaw / CoPaw** 是生态中最具完整产品形态的项目，但侧重点不同：  
  - OpenClaw：Gateway + 会话 + 安全 + 本地模型  
  - Hermes：桌面生命周期 + 自动化调度 + provider 路由  
  - ZeroClaw：多渠道 + 语音 + 人机协作可靠性  
  - CoPaw：Console/Desktop + SSE + MCP + 上下文管理  

- **NanoBot / Moltis / NanoClaw** 更像工程组件型或框架型项目：  
  - NanoBot 聚焦 Agent loop 和工具稳定性  
  - Moltis 聚焦 MCP 与 sandbox  
  - NanoClaw 聚焦 Gateway/proxy/provider/CI 链路  

- **LobsterAI** 更偏产品集成与发行体验，重点是 OpenClaw 的启动修复、状态迁移、插件兼容和托管模型代理稳定性。

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

项目：**Hermes Agent、OpenClaw、ZeroClaw、CoPaw**

特征：

- Issue 和 PR 数量高；
- 用户真实场景复杂；
- bug 涉及 Gateway、桌面端、通道、provider、runtime；
- 多个高优先级问题已有 PR，但待合并队列较长。

判断：

- 这些项目已经有较强社区使用基础；
- 当前瓶颈不是功能想法，而是 review、测试、合并和发布节奏；
- 适合技术决策者关注，但生产采用需评估稳定性和升级风险。

### 6.2 质量巩固阶段

项目：**NanoBot、NanoClaw、LobsterAI、Moltis**

特征：

- 活跃项较少但高度聚焦；
- 多数 PR 是稳定性、兼容性、安全或 CI 修复；
- 问题定位较明确，维护范围较可控。

判断：

- 这类项目更适合希望嵌入特定能力的开发者；
- 成熟度取决于其核心模块是否匹配使用场景；
- NanoBot 的多会话修复、Moltis 的 sandbox、NanoClaw 的 provider gateway 都有较强参考价值。

### 6.3 低活跃 / 观察阶段

项目：**PicoClaw、NullClaw、IronClaw、TinyClaw、ZeptoClaw**

特征：

- 当日无活动或仅有探索性 Issue；
- 缺少可确认代码推进；
- 当前不适合作为短期技术依赖决策核心依据。

判断：

- 可继续观察路线方向；
- NullClaw 的移动端客户端探索具有一定战略意义，但尚未形成执行信号。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 系统正在进入“运行时可靠性竞争”阶段

多个项目今日最核心的问题都不是模型能力，而是：

- Gateway 不能阻塞；
- 流式响应必须有终止事件；
- MCP session 丢失后要恢复；
- 消息不能静默失败；
- 长任务不能被错误 idle timeout 杀死。

**对开发者的参考价值：**  
构建 Agent 应用时，应将 runtime/gateway 视为一等核心系统，而不是模型 API 的薄封装。

---

### 7.2 会话状态和消息归属成为 Agent 安全基础

OpenClaw、NanoBot、Hermes、CoPaw 都出现会话错投、route 竞态、thread session、chat ownership 等问题。  
这说明多 Agent、多会话、多通道环境下，错误的 session attribution 可能带来隐私泄露、上下文污染和操作误执行。

**建议：**

- 明确 session / thread / channel / agent 的权限关系；
- 所有异步 completion 都应绑定版本化 route 或 ownership token；
- 会话恢复必须测试 restart、yield、reset、parent-child agent 等边界。

---

### 7.3 消息通道从 best-effort 走向可靠投递

Hermes、ZeroClaw、OpenClaw、NanoClaw、CoPaw 均暴露通道问题，包括 Telegram 失聪、Mattermost 首条 DM 丢失、Signal 附件、Matrix message-id、Weixin 附件静默失败等。

**趋势：**

- delivery receipt 会成为标准能力；
- adapter 需要平台级 watchdog；
- backfill 要具备幂等；
- 附件发送失败必须显式上报；
- connected 状态必须基于 receive progress，而非连接对象存在。

---

### 7.4 人机协作原语正在从审批扩展到“持久问答”

ZeroClaw 的 durable question primitive、NanoClaw 的 approval TTL、CoPaw 的 Discuss vs Execute、OpenClaw 的 secret assignment UI 都指向同一趋势：  
Agent 不是单向自动执行器，而是需要可持久等待、可审批、可拒绝、可恢复的人机协作系统。

**对开发者的启示：**

- 不要只实现一次性 approval；
- 应设计 durable human interaction：问题、选项、超时、重试、审计、跨重启恢复；
- 高风险工具调用应有清晰的模式切换和本地化风险说明。

---

### 7.5 本地模型与端侧智能正在成为降低门槛的关键路线

OpenClaw 的 Apple on-device setup 显示，个人 AI 助手正在尝试让用户不依赖 API Key 完成首次体验。  
这与隐私、成本、离线能力和低门槛安装密切相关。

**潜在影响：**

- 端侧小模型可能承担 onboarding、分类、轻量 utility task；
- 远程大模型继续处理复杂推理；
- 框架需要避免将 utility model 误设为主 Agent model。

---

### 7.6 Provider 抽象正在复杂化

Hermes 的 OpenRouter / Copilot / DeepSeek，CoPaw 的 MCP OAuth，LobsterAI 的托管代理 cooldown，Moltis 的 remote MCP session，都说明 provider 层已经不只是 base_url + api_key。

未来需要处理：

- API mode 差异；
- OAuth refresh；
- tool-call 非标准格式；
- provider fallback 透明度；
- 本地 provider fail-closed；
- 计费与隐私边界提示。

---

### 7.7 语音与多模态正在成为新一轮可靠性压力源

ZeroClaw 集中出现 STT cascade、MiniMax TTS/STT、voice transcript、suppress_voice、mirror voice replies 等问题；CoPaw 和 ZeroClaw 也都涉及图片 / 多模态持久展示。  
这表明 Agent 用户正在从文本交互走向语音、图片、附件和内容生产工作流。

**建议：**

- 语音输入应回显 transcript；
- STT/TTS provider 应支持 fallback；
- suppress_voice 等用户意图应跨通道一致；
- 多模态输出需要持久化为会话内容，而非临时流片段。

---

## 总结

今日个人 AI 助手 / 自主智能体开源生态的核心关键词是：**可靠性、会话一致性、消息确定性、长任务恢复、安全边界和多端体验**。  
OpenClaw 处于第一梯队，优势在于全栈覆盖、本地模型路线、Gateway 和安全治理投入，但也面临 PR 积压和稳定性债务。Hermes Agent、ZeroClaw、CoPaw 则分别在桌面生命周期、多渠道语音、Console/MCP 方向暴露出高强度真实使用需求。  
对技术决策者而言，当前选型不应只看功能清单，更应重点评估：Gateway 是否可恢复、消息是否可靠、会话是否隔离、长任务是否可观测、安全审批是否闭环、provider 路由是否透明。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
**日期：2026-09-17**  
**仓库：** [HKUDS/nanobot](https://github.com/HKUDS/nanobot)

---

## 1. 今日速览

过去 24 小时内，NanoBot 项目保持了较高的代码维护活跃度：共有 **7 条 Pull Request 更新**，其中 **6 条仍待合并**，**1 条已关闭/结束**；Issue 侧则较为安静，仅有 **1 条 Issue 更新且已关闭**。  
今日 PR 主要集中在 **Agent 会话并发、工具编辑稳定性、TUI 输入响应、目录遍历忽略规则、MCP Provider 标识** 等方向，说明项目当前重点在修复边界场景与提升多会话稳定性。  
没有新版本发布，意味着这些修复尚未通过 Release 形式交付给用户。  
整体来看，项目维护活跃度较高，但近期修复集中在并发、编辑器工具和会话隔离等关键路径，说明稳定性仍是当前版本演进的主要关注点。

---

## 2. 版本发布

过去 24 小时内 **无新版本发布**。

---

## 3. 项目进展

### 已关闭 / 完成的 PR

#### PR #5791：修复 TUI 在 Agent 输出期间输入不响应的问题  
- 链接：[HKUDS/nanobot PR #5791](https://github.com/HKUDS/nanobot/pull/5791)  
- 状态：Closed  
- 标签：`bug`, `fix`, `performance`, `test`, `priority: p2`  
- 作者：chengyongru  

该 PR 试图解决 TUI 场景下，当 Agent 持续输出时输入回调被饿死的问题。核心改动包括：

- 以有界 FIFO 批次方式 drain gateway output，避免输出处理长期占用事件循环；
- 在 IME 延迟提交读取和清空输入框时暂停输出 drain；
- 保持 FIFO 顺序、session attach invalidation、disconnect 状态顺序和已排队 fragment flush 的行为不变。

虽然该 PR 当前状态为 closed，数据中未明确标注是否已合并，因此无法确认修复是否进入主干。但从内容看，它针对的是用户交互体验中的高影响问题，尤其适用于 TUI 长时间输出、用户仍需输入打断或追加指令的场景。

---

## 4. 社区热点

今日整体社区讨论热度偏低。Issue 评论数和反应数均不高，PR 评论数据未提供，无法判断是否存在激烈技术讨论。

### Issue #5790：用户请求代码仓库邀请链接  
- 链接：[HKUDS/nanobot Issue #5790](https://github.com/HKUDS/nanobot/issues/5790)  
- 状态：Closed  
- 作者：heyang-930  
- 评论数：1  
- 反应数：0  
- 相关组件：`Channel (WeChat, Feishu, Telegram, etc.)`

用户提出“需要代码仓库邀请链接”，该 Issue 很快被关闭。  
这类请求不属于典型 Bug 或功能需求，更像是访问权限、社区加入方式或协作入口相关问题。背后的诉求可能包括：

- 用户希望参与私有仓库、插件仓库或部署相关代码；
- 项目文档中关于协作入口、邀请链接、社区渠道说明不够清晰；
- 用户可能误以为部分代码不在当前公开仓库中。

建议维护者在 README 或贡献指南中明确说明：

- 当前仓库是否完整开源；
- 是否存在私有组件；
- 如何加入社区、交流群或贡献者协作空间；
- 是否需要邀请链接，以及获取方式。

---

## 5. Bug 与稳定性

今日 PR 中大多数为 Bug 修复或回归修复，集中在 **Agent 多会话、工具编辑、目录遍历、TUI 响应性** 等关键路径。按潜在严重程度排序如下：

---

### P1：Agent 多会话消息串行化与批处理问题

#### PR #5792：fix(agent): serialize and batch per-session messages  
- 链接：[HKUDS/nanobot PR #5792](https://github.com/HKUDS/nanobot/pull/5792)  
- 状态：Open  
- 标签：`bug`, `regression`, `fix`, `test`, `priority: p1`  
- 作者：chengyongru  

该 PR 是今日最高优先级的稳定性修复。它关注 Agent 在多会话场景下的消息处理顺序与并发调度问题。主要修复方向包括：

- 在调度每个 session worker 前安装权威 FIFO inbox；
- 每个会话只通过单个 worker 处理，避免竞争性 dispatch tasks 或 bus re-publication；
- 在每次模型请求前截取有限快照，并按顺序注入可用消息前缀；
- 保持缓存与会话处理的一致性。

**影响分析：**  
该问题属于 Agent 核心调度路径，一旦出现，可能导致消息乱序、上下文污染、重复处理或跨会话行为异常。由于标签中包含 `regression` 和 `priority: p1`，建议维护者优先 Review 与合并。

---

### P2：跨会话响应投递错误

#### PR #5794：fix: cross-session response delivery in agent loop  
- 链接：[HKUDS/nanobot PR #5794](https://github.com/HKUDS/nanobot/pull/5794)  
- 状态：Open  
- 标签：`bug`, `fix`, `priority: p2`  
- 作者：adityanurdin  

该 PR 修复一个多会话响应投递错误：用户在 Session A 发送消息后，快速切换到 Session B 并发送另一条消息，Session A 的回复可能出现在 Session B 中。

**影响分析：**  
这是非常典型的多会话隔离问题，虽然优先级标为 P2，但对真实用户影响较大：

- 可能泄露另一个会话上下文；
- 用户会误认为 Agent 回答混乱；
- 在多用户或多 workspace 场景下可能带来隐私风险；
- 会降低对 Agent 会话可靠性的信任。

该 PR 与 #5792 在问题域上高度相关，建议维护者统一评估两者是否存在重叠、冲突或可合并设计。

---

### P2：TUI 输出期间输入响应性问题

#### PR #5791：fix(tui): keep input responsive during agent output  
- 链接：[HKUDS/nanobot PR #5791](https://github.com/HKUDS/nanobot/pull/5791)  
- 状态：Closed  
- 标签：`bug`, `fix`, `performance`, `test`, `priority: p2`  
- 作者：chengyongru  

该问题影响 TUI 交互体验。在 Agent 输出较多内容时，用户输入可能出现延迟或卡顿。  
如果该 PR 未被合并，建议继续跟进替代修复；如果已合并，则应在后续版本说明中突出其对交互体验的改善。

---

### P2：`edit_file` 内联替换时丢失分隔空白

#### PR #5796：fix(tools): preserve separator whitespace in inline replacements  
- 链接：[HKUDS/nanobot PR #5796](https://github.com/HKUDS/nanobot/pull/5796)  
- 状态：Open  
- 标签：`bug`, `fix`, `test`, `priority: p2`  
- 作者：KailBug  

该 PR 修复 `edit_file` 在非 Markdown 文件中执行内联替换时，会 strip `new_text` 每行尾部空白，导致相邻 token 被意外拼接的问题。

**影响分析：**  
此问题可能直接改变代码语义，例如：

- `foo + bar` 被错误拼接为 `foo+bar` 或更严重的 token 合并；
- 配置文件、源码、脚本中的空白被破坏；
- Agent 自动编辑代码时引入隐蔽 bug。

该修复对代码编辑型 Agent 工具链较重要，建议优先合并并补充回归测试。

---

### P2：`edit_file` fallback edits 丢失缩进并插入额外空行

#### PR #5795：fix(tools): preserve indentation in newline-terminated fallback edits  
- 链接：[HKUDS/nanobot PR #5795](https://github.com/HKUDS/nanobot/pull/5795)  
- 状态：Open  
- 标签：`bug`, `fix`, `test`, `priority: p2`  
- 作者：KailBug  

该 PR 修复 fallback 匹配替换中，如果 replacement 带有 trailing newline，可能丢失缩进并插入额外空行的问题。根因是 `_find_trim_matches` 即使 `old_text` 包含最终换行符，也总是从匹配 span 中排除该换行符。

**影响分析：**  
该问题同样影响 Agent 自动修改代码的可靠性。对 Python、YAML、Markdown、配置文件等缩进敏感或格式敏感内容尤其明显。

---

### P2：递归目录遍历忽略规则作用域错误

#### PR #5793：fix(tools): scope recursive directory ignores to listed root  
- 链接：[HKUDS/nanobot PR #5793](https://github.com/HKUDS/nanobot/pull/5793)  
- 状态：Open  
- 标签：`bug`, `regression`, `fix`, `test`, `priority: p2`  
- 作者：RaycarlLei  

该 PR 修复 `list_dir` 递归列目录时的忽略规则问题。当请求目录或其父目录名为 `build`、`dist` 等 `_IGNORE_DIRS` 条目时，递归 listing 会错误地报告目录为空。例如 `/tmp/build/project` 中的 `README.md` 和 `src/main.py` 会被隐藏，但非递归 listing 可以看到。

**影响分析：**  
该问题会影响 Agent 对项目结构的感知，进而影响代码分析、文件定位和修改决策。尤其在项目路径本身包含 `build`、`dist` 等常见目录名时，可能导致 Agent 误判仓库为空或文件缺失。

---

### P2：MCP / Parallel Search 请求缺少稳定 User-Agent

#### PR #5797：fix(mcp): identify nanobot requests to Parallel  
- 链接：[HKUDS/nanobot PR #5797](https://github.com/HKUDS/nanobot/pull/5797)  
- 状态：Open  
- 标签：`provider`, `fix`, `test`, `priority: p2`  
- 作者：georgeatparallel  

该 PR 为发送到 Parallel 的 HTTP 请求添加稳定的项目 User-Agent：`nanobot/<version>`，版本来自现有的 `nanobot.__version__` helper。

**影响分析：**  
该问题不是用户可见的崩溃类 bug，但有助于 Provider 侧统计集成使用情况、监控采用率，并为后续支持和优化提供依据。属于生态集成质量改进。

---

## 6. 功能请求与路线图信号

### Issue #5790：代码仓库邀请链接请求  
- 链接：[HKUDS/nanobot Issue #5790](https://github.com/HKUDS/nanobot/issues/5790)  
- 状态：Closed  
- 类型：enhancement  
- 作者：heyang-930  

该 Issue 被标记为 enhancement，但实际内容更偏向“访问入口 / 协作入口 / 社区链接”请求，而不是明确产品功能。  
短期看，它不太可能直接进入下一版本功能范围；但它传递出一个文档与社区运营信号：

- 用户可能不知道如何获取完整代码或参与贡献；
- 项目可能需要更清晰的社区入口；
- 与 Channel 组件相关的协作、部署或接入说明可能存在信息缺口。

### 从 PR 看出的路线图信号

虽然今日没有新功能 PR，但多个修复体现了 NanoBot 当前演进重点：

1. **多会话可靠性**  
   - 相关 PR：[#5792](https://github.com/HKUDS/nanobot/pull/5792)、[#5794](https://github.com/HKUDS/nanobot/pull/5794)  
   - 信号：Agent loop 正在加强 session isolation、FIFO 消息处理和并发一致性。

2. **代码编辑工具稳定性**  
   - 相关 PR：[#5795](https://github.com/HKUDS/nanobot/pull/5795)、[#5796](https://github.com/HKUDS/nanobot/pull/5796)  
   - 信号：项目正在补齐自动编辑文件时的格式保持能力，降低 Agent 写代码时引入格式或语义错误的概率。

3. **文件系统感知准确性**  
   - 相关 PR：[#5793](https://github.com/HKUDS/nanobot/pull/5793)  
   - 信号：工具层正在提升对真实项目目录结构的识别准确度。

4. **Provider 生态集成可观测性**  
   - 相关 PR：[#5797](https://github.com/HKUDS/nanobot/pull/5797)  
   - 信号：NanoBot 与外部搜索 / MCP provider 的集成正在进入更可监控、更可支持的阶段。

---

## 7. 用户反馈摘要

今日 Issue 侧的真实用户反馈较少，仅有一条已关闭请求。

### 用户痛点

#### 访问入口不清晰  
- 来源：[Issue #5790](https://github.com/HKUDS/nanobot/issues/5790)  
- 用户反馈：“我需要代码仓库邀请链接”

该反馈表明至少有部分用户对项目代码、协作权限或社区资源入口存在疑问。虽然这不是核心产品 bug，但对开源项目而言，入口不清晰会影响：

- 新用户上手；
- 外部贡献者参与；
- 私有/公开组件边界认知；
- 社区沟通效率。

### 使用场景推断

用户可能处于以下场景之一：

- 想加入项目协作或获取更多代码；
- 想访问某个私有仓库或示例仓库；
- 想获取部署、渠道接入或二次开发相关资源；
- 对当前 GitHub 仓库结构或权限说明不明确。

### 满意 / 不满意信号

目前没有足够评论数据判断用户满意度。Issue 已关闭，说明维护者可能已经通过评论解释或处理，但数据中未提供具体回复内容。

---

## 8. 待处理积压

基于当前提供的 24 小时数据，未发现长期未响应的 Issue 或 PR。今日待处理重点主要是新打开的 6 个 PR，其中多个涉及稳定性和回归修复，建议维护者优先级如下：

### 高优先级待处理

1. **PR #5792：Agent 每会话消息串行化与批处理**  
   - 链接：[HKUDS/nanobot PR #5792](https://github.com/HKUDS/nanobot/pull/5792)  
   - 原因：`priority: p1`，涉及 Agent 核心消息调度与回归问题。

2. **PR #5794：跨会话响应投递修复**  
   - 链接：[HKUDS/nanobot PR #5794](https://github.com/HKUDS/nanobot/pull/5794)  
   - 原因：涉及会话隔离与响应投递正确性，可能影响用户信任和隐私边界。

### 中优先级待处理

3. **PR #5796：保留 inline replacements 中的分隔空白**  
   - 链接：[HKUDS/nanobot PR #5796](https://github.com/HKUDS/nanobot/pull/5796)  
   - 原因：影响代码编辑语义正确性。

4. **PR #5795：保留 fallback edits 中的缩进和换行行为**  
   - 链接：[HKUDS/nanobot PR #5795](https://github.com/HKUDS/nanobot/pull/5795)  
   - 原因：影响 Agent 自动编辑文件的格式稳定性。

5. **PR #5793：限制递归目录忽略规则作用域**  
   - 链接：[HKUDS/nanobot PR #5793](https://github.com/HKUDS/nanobot/pull/5793)  
   - 原因：影响 Agent 对项目文件结构的认知准确性。

6. **PR #5797：为 Parallel 请求添加 NanoBot User-Agent**  
   - 链接：[HKUDS/nanobot PR #5797](https://github.com/HKUDS/nanobot/pull/5797)  
   - 原因：有助于 Provider 侧统计和支持，但用户影响相对间接。

---

## 项目健康度评估

**健康度：良好，但稳定性修复压力较高。**

积极信号：

- PR 活跃度高，过去 24 小时有 7 条 PR 更新；
- 修复覆盖 Agent loop、工具层、TUI、Provider 集成等多个核心模块；
- 多个 PR 带有测试标签，说明维护者重视回归保障；
- 高优先级问题已有对应修复 PR。

风险信号：

- 多个 PR 涉及 `regression`、会话隔离和消息顺序，说明近期核心交互路径可能存在稳定性压力；
- 多会话响应错投、消息竞争等问题若未及时修复，会明显影响 Agent 类产品的可信度；
- 无新版本发布，用户暂时无法通过正式 Release 获得这些修复；
- Issue 中出现访问入口类问题，提示文档或社区入口仍可改进。

**建议下一步：**  
优先 Review 并合并 [#5792](https://github.com/HKUDS/nanobot/pull/5792) 与 [#5794](https://github.com/HKUDS/nanobot/pull/5794)，统一验证多会话并发场景；随后集中处理工具编辑相关的 [#5795](https://github.com/HKUDS/nanobot/pull/5795)、[#5796](https://github.com/HKUDS/nanobot/pull/5796)，并在下一次 Release 中明确列出稳定性修复与迁移影响。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-17  
仓库：[`NousResearch/hermes-agent`](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

过去 24 小时 Hermes Agent 活跃度非常高：Issues 更新 50 条，其中 49 条仍处于新开或活跃状态，仅 1 条关闭；PR 更新 50 条，其中 48 条仍待合并，2 条已合并或关闭。  
今日问题集中在 **Gateway 消息投递、Windows 桌面/更新生命周期、Cron/Kanban 调度、插件平台适配、模型路由与 Provider 配置** 等稳定性领域，说明项目正在经历高强度真实用户场景验证。  
从 PR 侧看，维护者和社区已快速提出多条针对性修复，尤其是 Desktop、Gateway、Cron、CLI 配置与模型路由相关问题，但大多数仍处于待合并状态。  
整体健康度判断：**社区反馈活跃、修复响应速度快，但稳定性压力较高，短期内需要优先压降 P1/P2 消息投递与会话状态类问题。**

---

## 2. 项目进展

今日无新版本发布。以下为过去 24 小时内已关闭或推进度较高的重要 PR / 修复方向。

### 已关闭 / 已完成推进

#### [PR #113711 Repair active-PR dispatch guard for continued Kanban work](https://github.com/NousResearch/hermes-agent/pull/113711)  
状态：Closed  
涉及组件：Agent、CLI、Gateway、Cron、TTS、Kanban  
该 PR 修复 Kanban 中 active PR dispatch guard 的生命周期判断问题，使 `changes_requested` 或 `timed_out` 后的卡片能够继续在既有分支/PR 上工作，同时保留 live claim 场景下的 active PR 保护。  
这对自动化任务持续推进非常关键，尤其是当前 Issue 列表中出现了多条 Kanban respawn、running 状态滞留、heartbeat 失效相关问题。虽然该 PR 已关闭，仍建议维护者确认其变更是否已合入主线或被替代方案覆盖。

### 今日新提交、待合并但重要的修复 PR

#### [PR #113730 fix(desktop): reconnect SSH sockets after managed updates](https://github.com/NousResearch/hermes-agent/pull/113730)  
关联问题：可能对应 [Issue #113683](https://github.com/NousResearch/hermes-agent/issues/113683)  
修复 Windows Desktop 在远程 Linux backend 更新后仍持有旧 SSH / Gateway socket，导致 GUI 无法通信的问题。  
这是今日最重要的 Windows 桌面稳定性修复之一。

#### [PR #113716 fix(gateway): fail closed when a pinned route moves under a delegation completion](https://github.com/NousResearch/hermes-agent/pull/113716)  
关联问题：[Issue #113690](https://github.com/NousResearch/hermes-agent/issues/113690)  
修复 async delegation completion 在 session route 已被替换后仍覆盖 routing key 的竞态问题。  
该问题属于 session-state 与 message-delivery 双风险，修复后可减少异步代理任务写回错误会话的风险。

#### [PR #113709 fix(gateway): preserve Copilot model routing on restart](https://github.com/NousResearch/hermes-agent/pull/113709)  
关联问题：[Issue #113701](https://github.com/NousResearch/hermes-agent/issues/113701)  
修复 Gateway 重启后 Copilot session model override 丢失，导致 chat-completions-only 模型被错误送入 Responses API 并触发 400 的问题。  
这是模型路由稳定性的重要修复。

#### [PR #113735 fix(cron): defer tick dispatch while an update holds the lock](https://github.com/NousResearch/hermes-agent/pull/113735)  
修复 Cron 在代码更新过程中仍推进调度槽位的问题，避免任务在半替换代码树上运行。  
该 PR 与今日多条 Cron / Kanban 调度一致性问题方向一致。

#### [PR #113724 feat(desktop): keep Windows app in tray on close](https://github.com/NousResearch/hermes-agent/pull/113724)  
关联功能请求：[Issue #113712](https://github.com/NousResearch/hermes-agent/issues/113712)  
新增 Windows close-to-tray 能力，默认关闭，不改变现有行为。  
这说明用户对 Hermes 作为长期运行个人助手后台进程的需求正在增强。

#### [PR #113723 fix(desktop): improve mention completion contrast](https://github.com/NousResearch/hermes-agent/pull/113723)  
关联问题：[Issue #113713](https://github.com/NousResearch/hermes-agent/issues/113713)  
修复 Desktop 中 @-mention 自动补全面板过于透明、难以阅读的问题。  
属于 UI 可用性快速修复。

#### [PR #113737 fix(transports): execute DeepSeek DSML tool calls, retry truncated ones](https://github.com/NousResearch/hermes-agent/pull/113737)  
修复 DeepSeek 模型以 DSML XML 形式输出 tool call 时未被执行的问题，并支持对截断 tool call 重试。  
这对多模型 Provider 兼容性和工具调用可靠性有直接提升。

#### [PR #113728 fix(tts): prefer explicit XAI_API_KEY over subscription OAuth in streaming TTS](https://github.com/NousResearch/hermes-agent/pull/113728)  
修复 streaming TTS 误用 subscription OAuth bearer 导致 403 的问题，改为优先使用显式 `XAI_API_KEY`。  
对语音能力和凭证解析一致性有帮助。

#### [PR #113725 fix(cli): warn when a provider switch leaves a stale model route](https://github.com/NousResearch/hermes-agent/pull/113725)  
修复或缓解 Provider 切换后旧 `model.base_url` / `api_mode` 残留的问题。  
与今日 [Issue #113703](https://github.com/NousResearch/hermes-agent/issues/113703) 中 local provider alias 被 OpenRouter 接管的配置风险高度相关。

---

## 3. 社区热点

### 1. Windows GUI 在更新 Linux backend 后失效  
Issue：[ #113683 ](https://github.com/NousResearch/hermes-agent/issues/113683)  
状态：Open  
评论数：5  
标签：`type/bug`, `comp/tui`, `comp/desktop`, `platform/windows`, `area/install-update`, `area/sessions`, `P2`

用户反馈：每天更新 backend 后，Windows GUI 会停止工作，需要反复尝试 `hermes doctor`、`hermes update`、重启 GUI 等操作，且每次恢复方式不同。  
背后诉求：用户希望 Desktop 与 remote / Linux backend 的生命周期管理更可靠，尤其是更新后 socket、session、gateway reconnect 能自动恢复。  
相关修复：[PR #113730](https://github.com/NousResearch/hermes-agent/pull/113730)

### 2. Gateway 可被 agent 自己执行的 `taskkill /F /IM python.exe` 杀死  
Issue：[ #113667 ](https://github.com/NousResearch/hermes-agent/issues/113667)  
状态：Open  
评论数：3  
标签：`type/bug`, `comp/gateway`, `comp/cron`, `tool/terminal`, `platform/windows`, `P2`

用户指出 agent 在 Gateway 内部发起 `taskkill /F /IM python.exe` 会杀掉 Gateway 自身，且没有 planned-stop marker，也不会自动重启。  
背后诉求：Hermes 需要更强的 lifecycle guard，特别是 Windows 进程名级别保护，而不仅是已有命令模式拦截。  
当前未见直接修复 PR，是今日高优先级稳定性风险之一。

### 3. Weixin / WeChat 语音和视频附件静默失败  
Issue：[ #113640 ](https://github.com/NousResearch/hermes-agent/issues/113640)  
状态：Open  
评论数：3  
标签：`type/bug`, `comp/gateway`, `platform/wecom`, `sweeper:risk-message-delivery`, `P2`

用户报告 `MEDIA:/abs/path/*.mp3` 附件不会送达，文本到达但附件丢失，工具仍报告成功。  
背后诉求：平台适配层必须避免“静默成功”，尤其是消息投递和附件发送失败应向用户显式反馈。  
当前未见直接修复 PR。

### 4. Kanban review-lane budget reservation 可能饿死 ready lane  
Issue：[ #113598 ](https://github.com/NousResearch/hermes-agent/issues/113598)  
状态：Open  
评论数：3  
标签：`type/bug`, `comp/cron`, `P3`

该问题指出 Kanban review dispatch 默认启用时，在有限 `max_in_progress` 配置下，一个被 respawn guard defer 的 review card 可能长期占用预算，导致 ready lane 饥饿。  
背后诉求：自动化调度系统需要更强的预算公平性和 guard-aware 资源释放机制。  
当前未见直接修复 PR，但 [PR #113711](https://github.com/NousResearch/hermes-agent/pull/113711)、[PR #113735](https://github.com/NousResearch/hermes-agent/pull/113735) 均与 Kanban/Cron 生命周期可靠性相关。

### 5. Teams `require_mention` 配置被接受但未生效  
Issue：[ #113577 ](https://github.com/NousResearch/hermes-agent/issues/113577)  
状态：Open  
评论数：3  
标签：`type/bug`, `comp/gateway`, `comp/plugins`, `P3`

用户指出 Teams adapter 接收 `require_mention` 配置但完全未读取，造成配置表面有效、实际无作用。  
背后诉求：企业消息平台中，mention filter 是控制 bot 响应范围的重要安全与噪音控制能力。  
当前未见直接修复 PR。

---

## 4. Bug 与稳定性

以下按严重程度和影响面排序。

### P1

#### Telegram poller watchdog 重建后仍无法恢复  
Issue：[ #113618 ](https://github.com/NousResearch/hermes-agent/issues/113618)  
状态：Open  
标签：`type/bug`, `comp/gateway`, `platform/telegram`, `P1`, `sweeper:risk-message-delivery`

问题描述：Telegram gateway 显示 connected，但实际停止接收消息；watchdog 检测到 `getUpdates` stall 后重建 poller，但仍无法恢复，必须重启进程。  
影响：消息平台 Gateway 失聪，是严重可用性问题。  
当前修复 PR：未见直接对应 PR。  
建议优先级：最高。需要补充 poller rebuild 后的 end-to-end health check，以及失败后的进程级重启策略。

---

### P2

#### Windows Desktop 更新后 GUI 与 backend 断连  
Issue：[ #113683 ](https://github.com/NousResearch/hermes-agent/issues/113683)  
状态：Open  
相关 PR：[ #113730 ](https://github.com/NousResearch/hermes-agent/pull/113730)

影响：Windows + Linux backend 用户每日更新后 GUI 不可用。  
判断：已有明确修复 PR，建议优先 review / merge，并加入回归测试。

#### Windows Gateway 可被 `taskkill /F /IM python.exe` 杀死  
Issue：[ #113667 ](https://github.com/NousResearch/hermes-agent/issues/113667)  
状态：Open  
当前修复 PR：未见

影响：agent-issued terminal command 可杀死自身运行时，且无自动恢复。  
判断：这是 agent 工具安全与生命周期保护缺口，建议增加 image-name branch guard，并对 Gateway 自身 PID / process image 加保护。

#### Local provider alias 未配置 endpoint 时被 OpenRouter 接管  
Issue：[ #113703 ](https://github.com/NousResearch/hermes-agent/issues/113703)  
状态：Open  
相关 PR：[ #113725 ](https://github.com/NousResearch/hermes-agent/pull/113725)

影响：用户执行 `hermes chat --provider ollama` / `vllm`，若本地 endpoint 未配置且存在 `OPENROUTER_API_KEY`，请求会被发往 OpenRouter，造成隐私、计费、预期行为偏差。  
判断：这是配置解析与账单风险问题。PR #113725 提供 stale route warning，但可能还需要 local provider 的 fail-closed 策略。

#### Copilot session model override 重启后丢失  
Issue：[ #113701 ](https://github.com/NousResearch/hermes-agent/issues/113701)  
状态：Open  
相关 PR：[ #113709 ](https://github.com/NousResearch/hermes-agent/pull/113709)

影响：Gateway restart 后，chat-completions-only 模型被错误送入 Responses API，HTTP 400 后又静默 fallback 到其他模型。  
判断：同时涉及模型正确性和用户信任。已有修复 PR。

#### Async delegation route 竞态覆盖  
Issue：[ #113690 ](https://github.com/NousResearch/hermes-agent/issues/113690)  
状态：Open  
相关 PR：[ #113716 ](https://github.com/NousResearch/hermes-agent/pull/113716)

影响：异步 delegation completion 可能写入已被替换的 routing key，造成会话错投递。  
判断：高价值修复，应尽快合并。

#### Dashboard 插件 Hub 阻塞事件循环 90–300 秒  
Issue：[ #113677 ](https://github.com/NousResearch/hermes-agent/issues/113677)  
状态：Open  
当前修复 PR：未见

影响：`GET /api/dashboard/plugins/hub` 对每个已安装插件执行同步 HTTPS 请求，导致 dashboard 单事件循环阻塞，桌面 WebView 和 HTTP 探针均无响应。  
判断：典型性能/可用性问题，建议异步化、缓存 catalog 查询，并限制并发。

#### Cron job 失败后下一次 occurrence 被静默跳过  
Issue：[ #113603 ](https://github.com/NousResearch/hermes-agent/issues/113603)  
状态：Open  
标签：`needs-repro`, `sweeper:risk-automation`, `P2`

影响：自动化任务可靠性受损，且无 execution row / incident 记录，运营人员只能事后审计发现。  
判断：需要优先补充调度状态机审计日志和 missed-run 检测。

#### Discord missed-message backfill 重复派发同一消息  
Issue：[ #113631 ](https://github.com/NousResearch/hermes-agent/issues/113631)  
状态：Open  
当前修复 PR：未见

影响：单条消息在 reconnect 后被重复 dispatch 24 次，造成多轮 agent task 重复执行。  
判断：需要 backfill completion gate 与 reply anchor 解耦，尤其在 `reply_to_mode: off` 下避免无限重复。

#### Windows Scheduled Task 未重新注册，重启策略不可达  
Issue：[ #113670 ](https://github.com/NousResearch/hermes-agent/issues/113670)  
状态：Open  
当前修复 PR：未见

影响：旧安装保留未 harden 的 Windows Task Scheduler 配置，缺少 `<RestartOnFailure>`；并且 wscript launcher 使重启策略不可达。  
判断：需要迁移逻辑，检测旧 task schema 并强制 re-register。

#### Desktop context compression 失败  
Issue：[ #113646 ](https://github.com/NousResearch/hermes-agent/issues/113646)  
状态：Open  
当前修复 PR：未见

影响：用户表示 Desktop client 仍低于 context cap，但无法 compress context。  
判断：需要结合上传的 diagnostics 分析 compression cap、辅助模型、desktop 状态同步是否不一致。

---

### P3 / 中低优先级但影响体验

#### Feishu WebSocket 中途失联但健康状态仍显示 connected  
Issue：[ #113662 ](https://github.com/NousResearch/hermes-agent/issues/113662)  
状态：Open  
当前修复 PR：未见

影响：Gateway alive、heartbeat 正常、状态 connected，但事件停止接收。  
建议：增加平台级 receive-progress watchdog，而非仅依赖 SDK `start()` 返回。

#### Teams 不能发送文档附件  
Issue：[ #113578 ](https://github.com/NousResearch/hermes-agent/issues/113578)  
状态：Open  
当前修复 PR：未见

影响：本地文件被作为普通 attachment 发送，文档触发 `400 Unknown attachment type`，standalone sender 还会丢弃 media。  
建议：区分 image/document/file upload 通道，并避免 standalone media drop。

#### Slack clarify choices 横向按钮导致长标签被截断  
Issue：[ #113555 ](https://github.com/NousResearch/hermes-agent/issues/113555)  
状态：Open  
当前修复 PR：未见

影响：Slack 多选 clarify 的可读性差。  
建议：改为纵向布局或 section + button per block。

#### Disk cleanup 删除 PostgreSQL maintenance dirs  
Issue：[ #113673 ](https://github.com/NousResearch/hermes-agent/issues/113673)  
状态：Open  
当前修复 PR：未见

影响：`plugins/disk-cleanup` 删除 `.pg0` 下必要空目录，破坏 Hindsight checkpoints 和 pg0 启动。  
建议：将 `.pg0` 加入 protected top-level / path allowlist。

#### Kanban worker 状态与 heartbeat 相关问题  
Issues：  
- [#113611](https://github.com/NousResearch/hermes-agent/issues/113611) respawn guard 未覆盖 clean-exit-without-transition  
- [#113610](https://github.com/NousResearch/hermes-agent/issues/113610) worker `rc=0` 但无 terminal transition 后 run row 停留 `running`  
- [#113609](https://github.com/NousResearch/hermes-agent/issues/113609) auto-heartbeat bridge 在 delegated child context 中静默失败  

判断：这些问题共同指向 Kanban worker 生命周期状态机不够严格：退出码、terminal transition、heartbeat、claim 延长、respawn guard 之间需要统一判定模型。

---

## 5. 功能请求与路线图信号

### Windows 关闭窗口后保留系统托盘运行  
Issue：[ #113712 ](https://github.com/NousResearch/hermes-agent/issues/113712)  
相关 PR：[ #113724 ](https://github.com/NousResearch/hermes-agent/pull/113724)

用户希望 Hermes Desktop 像 Claude、Codex 等桌面 agent 一样，关闭窗口后仍在系统托盘运行，避免 scheduled jobs、profile backend、长 agent turn 被中断。  
路线图信号：Hermes 正从“交互式桌面应用”向“长期驻留的个人 AI 助手 runtime”演进。  
纳入下一版本可能性：高。已有 PR，且默认关闭，不破坏既有行为。

### Web Dashboard 支持 Bot Mode  
Issue：[ #113695 ](https://github.com/NousResearch/hermes-agent/issues/113695)

用户希望将当前 desktop-only 的 `hermes-bots` 插件能力扩展到 Web Dashboard，包括 bot roster、avatar、Routines、group rooms 等。  
路线图信号：Bot Mode 已有桌面实现，社区希望其成为跨界面的核心产品能力。  
纳入下一版本可能性：中。当前无对应 PR，但需求清晰，且与 dashboard/plugin 方向一致。

### Plugin Catalog 新增 You.com skills + MCP  
PR：[ #113715 ](https://github.com/NousResearch/hermes-agent/pull/113715)

新增 `you` 插件 catalog entry，包含 You.com workflow skills 与 MCP servers。  
路线图信号：Hermes 插件生态继续扩展，MCP、搜索、研究、金融、发现类能力是重点方向。  
纳入下一版本可能性：中高。属于 catalog 增量，若审核通过较容易合入。

### DeepSeek DSML tool call 支持  
PR：[ #113737 ](https://github.com/NousResearch/hermes-agent/pull/113737)

DeepSeek 模型有时将 tool call 作为 XML-like DSML 放入 `message.content`，该 PR 使 Hermes 能解析并执行这些调用。  
路线图信号：Hermes 正在强化多 Provider、多模型的非标准 tool-call 兼容性。  
纳入下一版本可能性：高。属于明显兼容性修复。

---

## 6. 用户反馈摘要

### 用户痛点 1：跨平台 Desktop + Gateway 生命周期不稳定  
代表问题：  
- [#113683](https://github.com/NousResearch/hermes-agent/issues/113683) Windows GUI 更新后失效  
- [#113670](https://github.com/NousResearch/hermes-agent/issues/113670) Windows Scheduled Task 未迁移 hardening  
- [#113667](https://github.com/NousResearch/hermes-agent/issues/113667) taskkill 可杀死 Gateway  

用户真实场景：Windows 前端连接 Linux backend，依赖 Hermes 长时间运行并频繁更新。  
不满意点：更新、关闭窗口、系统任务、进程重启等生命周期细节需要手动干预，且恢复方式不稳定。  
积极信号：已有 [#113730](https://github.com/NousResearch/hermes-agent/pull/113730) 和 [#113724](https://github.com/NousResearch/hermes-agent/pull/113724) 响应。

### 用户痛点 2：消息平台显示 connected，但实际失聪或投递失败  
代表问题：  
- [#113618](https://github.com/NousResearch/hermes-agent/issues/113618) Telegram gateway deaf  
- [#113662](https://github.com/NousResearch/hermes-agent/issues/113662) Feishu WS mid-life loss undetectable  
- [#113640](https://github.com/NousResearch/hermes-agent/issues/113640) Weixin media attachment silently fail  
- [#113631](https://github.com/NousResearch/hermes-agent/issues/113631) Discord backfill 重复 dispatch  
- [#113578](https://github.com/NousResearch/hermes-agent/issues/113578) Teams documents 无法发送  

用户真实场景：将 Hermes 接入 Telegram、Feishu、Weixin、Discord、Teams、Slack 等实际工作流。  
不满意点：平台 adapter 可能“表面成功、实际失败”，或 connected 状态不可信。  
建议：将 message delivery 从 best-effort 改为具备 ack、错误上报、平台级 watchdog、重复派发防护的可靠通道。

### 用户痛点 3：Cron / Kanban 自动化状态机存在边界问题  
代表问题：  
- [#113598](https://github.com/NousResearch/hermes-agent/issues/113598) review-lane budget starvation  
- [#113611](https://github.com/NousResearch/hermes-agent/issues/113611) clean-exit-without-transition 重复 respawn  
- [#113610](https://github.com/NousResearch/hermes-agent/issues/113610) run row 停留 running  
- [#113609](https://github.com/NousResearch/hermes-agent/issues/113609) heartbeat bridge 静默失败  
- [#113603](https://github.com/NousResearch/hermes-agent/issues/113603) cron job 下一次 occurrence 被跳过  

用户真实场景：依赖 Hermes 执行长期自动化任务、定时脚本、Kanban worker。  
不满意点：任务状态、heartbeat、claim、retry、respawn、incident 报警之间有不一致，导致任务被饿死、重复执行或静默跳过。  
积极信号：今日已有 [#113711](https://github.com/NousResearch/hermes-agent/pull/113711)、[#113735](https://github.com/NousResearch/hermes-agent/pull/113735) 等生命周期相关修复。

### 用户痛点 4：Provider / 模型路由需要更可解释、更 fail-closed  
代表问题：  
- [#113703](https://github.com/NousResearch/hermes-agent/issues/113703) 本地 provider alias 被 OpenRouter 接管  
- [#113701](https://github.com/NousResearch/hermes-agent/issues/113701) Copilot 模型重启后路由错误并 fallback  
- [#113689](https://github.com/NousResearch/hermes-agent/issues/113689) Anthropic delegate_task 全部 content_filter  
- [#113582](https://github.com/NousResearch/hermes-agent/issues/113582) compression failure 报错模型显示错误  

用户真实场景：混用 OpenRouter、Ollama、vLLM、Copilot、Gemini、Anthropic 等 provider。  
不满意点：错误 provider 被使用、fallback 不透明、错误消息指向错误模型，造成计费和调试风险。  
建议：Provider 切换、fallback、auxiliary model resolution 需要更明确的日志和用户可见提示。

---

## 7. 待处理积压

> 注：当前数据只覆盖过去 24 小时，无法严格判断“长期未响应”。以下列出的是今日仍处于 Open、影响较大且尚未看到直接修复 PR 的重点积压。

### 高优先级待处理

1. [Issue #113618 Telegram stall watchdog rebuilds the poller but never recovers](https://github.com/NousResearch/hermes-agent/issues/113618)  
   P1 消息接收中断，暂无直接修复 PR。建议优先处理。

2. [Issue #113667 Gateway 被 `taskkill /F /IM python.exe` 杀死](https://github.com/NousResearch/hermes-agent/issues/113667)  
   Windows lifecycle guard 缺口，可能导致 agent 自毁运行时。

3. [Issue #113677 Dashboard plugin hub blocks event loop for 90–300s](https://github.com/NousResearch/hermes-agent/issues/113677)  
   Dashboard 单事件循环被同步 HTTPS 阻塞，影响面广。

4. [Issue #113603 Cron job with last_status=error skipped next occurrence silently](https://github.com/NousResearch/hermes-agent/issues/113603)  
   自动化任务静默跳过且无 execution row，属于可靠性与可观测性问题。

5. [Issue #113631 Discord missed-message backfill re-dispatches same message](https://github.com/NousResearch/hermes-agent/issues/113631)  
   重复派发可能造成实际业务重复执行，需要尽快修复幂等性。

### 平台适配积压

1. [Issue #113640 Weixin send_voice/send_video drop kwargs](https://github.com/NousResearch/hermes-agent/issues/113640)  
   附件静默失败，需修复 kwargs 传递和失败上报。

2. [Issue #113662 Feishu WS mid-life loss undetectable](https://github.com/NousResearch/hermes-agent/issues/113662)  
   健康状态失真，需要 receive-progress watchdog。

3. [Issue #113578 Teams cannot send documents](https://github.com/NousResearch/hermes-agent/issues/113578)  
   Teams 文件发送路径需要按类型重构。

4. [Issue #113577 Teams require_mention ignored](https://github.com/NousResearch/hermes-agent/issues/113577)  
   配置接受但无效，容易造成企业聊天噪音和权限边界误判。

### Cron / Kanban 积压

1. [Issue #113598 Kanban review-lane budget starvation](https://github.com/NousResearch/hermes-agent/issues/113598)  
2. [Issue #113611 Kanban respawn guard gap](https://github.com/NousResearch/hermes-agent/issues/113611)  
3. [Issue #113610 Kanban run row stays running](https://github.com/NousResearch/hermes-agent/issues/113610)  
4. [Issue #113609 Kanban auto-heartbeat silently fails](https://github.com/NousResearch/hermes-agent/issues/113609)  
5. [Issue #113665 Cron failing job re-alerts on every run](https://github.com/NousResearch/hermes-agent/issues/113665)  

这些问题建议作为一个统一的 Kanban/Cron lifecycle epic 处理，而不是逐条局部修补。

---

## 结论

Hermes Agent 今日呈现出非常高的社区活跃度和快速修复势头，但稳定性议题明显集中：**Gateway 消息可靠性、Windows 桌面生命周期、Cron/Kanban 自动化状态机、Provider 路由透明度** 是当前最需要维护者聚焦的四条主线。  
积极的一面是，多数高价值问题已有对应 PR 或明确修复方向，例如 Windows 更新断连、Copilot 路由、async delegation 竞态、Desktop 托盘与 UI 可读性。  
短期建议优先合并并发布一轮稳定性版本，重点覆盖 P1/P2 的 message-delivery、session-state、Windows lifecycle 与 provider routing 问题。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报｜2026-09-17

## 1. 今日速览

过去 24 小时 NanoClaw 活跃度较高：新增/更新 Issues 2 条、PR 10 条，其中 7 条仍待处理，3 条已关闭或合并。今日工作重心明显集中在 **CI 稳定性、Bun `spawnSync` 挂死问题、Gateway / Iron Proxy / OpenCode provider 修复、Signal 通道修复、安装体验与审批流程可靠性**。  
整体来看，项目处于较密集的工程修复阶段：大量 PR 指向真实端到端安装、CI 长时间挂起、WebSocket、OAuth、任务脚本执行等基础能力问题，说明维护团队正在强化可用性和稳定性。  
健康度方面，PR 响应较快，问题定位较清晰，但多个关键修复仍处于 Open 状态，短期内 CI 与 provider registry 相关风险仍需重点关注。

---

## 2. 版本发布

过去 24 小时 **无新版本发布**。

---

## 3. 项目进展

今日有 3 个 PR 进入 Closed 状态，主要集中在 Gateway、Iron Proxy 与 CI 防护方向。由于数据仅显示 `CLOSED`，未明确区分已合并或关闭，以下按“已关闭/可能已被吸收进上游分支”解读，最终状态需以 GitHub 页面为准。

### 已关闭 / 已处理的重要 PR

#### #3843 fix(iron-proxy): complete WebSocket handshakes and keep upstream framing in the tunnel  
链接：https://github.com/qwibitai/nanoclaw/pull/3843  
作者：glifocat  
方向：Iron Proxy、WebSocket、Provider 通道稳定性  

该 PR 针对 `feat/iron-proxy-gateway` 分支中的前置代理问题，修复 Codex provider 通过 Iron 端到端运行时暴露的 WebSocket 握手与上游帧转发问题。  
它的意义在于增强 NanoClaw gateway/proxy 层对实时双向通信的支持，尤其是 provider 与代理之间依赖 WebSocket 的场景。

**影响判断：**
- 对 provider gateway 架构推进有直接帮助。
- 降低 WebSocket 握手失败导致 provider 不可用的风险。
- 可能作为 #3817 相关堆栈的一部分被折叠合入。

---

#### #3840 fix(gateway): status blocks, OAuth tokens, cache misses and WebSocket handshakes in the gateway seam  
链接：https://github.com/qwibitai/nanoclaw/pull/3840  
作者：glifocat  
方向：Gateway Setup、OAuth、缓存、WebSocket  

该 PR 修复 gateway 安装与认证流程中的多项端到端问题，包括：
- `--step gateway` / `--step gateway-auth` 结束时缺少终端状态块；
- OAuth token 处理问题；
- cache miss 场景；
- WebSocket 握手问题。

**影响判断：**
- 提升 gateway setup 的完整性与可观测性。
- 改善真实安装路径下的用户体验。
- 与 #3843 一起显示：Gateway/Iron Proxy 是当前项目短期重点之一。

---

#### #3836 ci(registry-skills): bound the skill test jobs at 20 minutes  
链接：https://github.com/qwibitai/nanoclaw/pull/3836  
作者：glifocat  
方向：CI 稳定性、Repository Maintenance、Skills  

该 PR 将 `registry-skills` 相关测试任务设置为 20 分钟超时，避免 `bun test` 卡死后占用 GitHub Actions runner 长达默认 6 小时。

**影响判断：**
- 明显改善 CI 资源消耗与反馈速度。
- 是对 #3839 / #3842 所反映 Bun 挂死问题的缓解措施，而非根因修复。
- 对维护者非常重要，因为它能避免单个挂起测试拖垮整体开发节奏。

---

## 4. 社区热点

从今日数据看，Issues 与 PR 的评论数、反应数均较低，未出现大量社区讨论。但从问题严重性和 PR 密度判断，以下主题是今日事实上的热点。

### 热点一：Bun `spawnSync` 导致 CI / 测试挂死

#### Issue #3839  
链接：https://github.com/qwibitai/nanoclaw/issues/3839  
标题：[bug] registry-skills: add-opencode reapply pass hangs in bun test until the 6-hour cancel  
作者：glifocat  
状态：Open  
标签：`kind/bug`, `area/providers`, `area/repository-maintenance`, `triage/needs-repro`

该 issue 报告 `registry-skills` 中 `add-opencode` reapply pass 在 `bun test` 中挂死，直到 GitHub Actions 6 小时超时取消。环境为 GitHub `ubuntu-latest` runner、Bun 1.4.0、Node 22。

相关 PR：
- #3836 CI 超时保护：https://github.com/qwibitai/nanoclaw/pull/3836
- #3841 OpenCode memory hook 改用异步 spawn：https://github.com/qwibitai/nanoclaw/pull/3841

**背后诉求：**
- CI 必须可预测、可中断。
- Provider registry 测试不能因 Bun runtime bug 长时间阻塞。
- `spawnSync` 在 Bun 下存在不可接受的风险，需要系统性替换或规避。

---

#### Issue #3842  
链接：https://github.com/qwibitai/nanoclaw/issues/3842  
标题：[hardening] upload-trace still runs curl through Bun's spawnSync, which can wedge the poll loop  
作者：glifocat  
状态：Open  

该 issue 指出即使 #3841 处理了 OpenCode memory hook，`upload-trace` 仍通过 Bun 的 `spawnSync` 调用 `curl`，依旧可能导致 poll loop 卡死、CPU 100%。

**背后诉求：**
- 不只是修一个测试点，而是需要全面审查 Bun 环境中的同步子进程调用。
- `spawnSync` 在 agent container 下可能成为稳定性隐患。
- 硬化方向应包括：异步 spawn、超时控制、可取消机制、避免事件循环永久占用。

---

### 热点二：Gateway / Proxy 端到端可靠性

相关 PR：
- #3840：https://github.com/qwibitai/nanoclaw/pull/3840
- #3843：https://github.com/qwibitai/nanoclaw/pull/3843

这两个 PR 均来自真实端到端安装或 provider 运行验证中暴露的问题，涉及 OAuth、缓存、状态块、WebSocket 握手、上游 framing。  
这表明 NanoClaw 的 gateway/proxy 层正在从“功能实现”进入“可稳定运行”的调优阶段。

---

### 热点三：Signal 通道质量修复

相关 PR：
- #3837 fix(signal): consolidate attachment, DM-routing, and outbound-queue fixes  
  https://github.com/qwibitai/nanoclaw/pull/3837
- #3838 docs(add-signal): document attachment/DM-routing fixes and troubleshooting  
  https://github.com/qwibitai/nanoclaw/pull/3838

Signal adapter 的修复聚焦：
- 附件统一落盘并通过 mounted inbox 转发；
- DM routing 的 `platform_id` 格式修正；
- outbound queue 可靠性；
- 文档同步补齐 troubleshooting。

这说明聊天通道集成仍在持续打磨，尤其是 Signal 这种消息类型复杂、附件处理多样的适配器。

---

## 5. Bug 与稳定性

以下按严重程度排序。

### P0 / 高严重：Bun `spawnSync` 可导致 CI 6 小时挂死

#### Issue #3839  
链接：https://github.com/qwibitai/nanoclaw/issues/3839  
状态：Open  
影响范围：CI、provider registry、skills 测试、OpenCode provider  

问题表现：
- `add-opencode` reapply pass 在 `bun test --isolate` 中挂死；
- GitHub Actions 默认 6 小时后才取消；
- 可能导致 runner 资源长时间占用，影响开发效率。

已有修复 / 缓解：
- #3836 已关闭：为相关 CI job 增加 20 分钟超时  
  https://github.com/qwibitai/nanoclaw/pull/3836
- #3841 Open：将 OpenCode memory hook 改为异步 spawn  
  https://github.com/qwibitai/nanoclaw/pull/3841

风险判断：
- #3836 是缓解措施；
- #3841 是更接近根因的修复；
- 但 #3842 表明仍存在其他 `spawnSync` 使用点，问题尚未完全解决。

---

### P0 / 高严重：`upload-trace` 仍通过 Bun `spawnSync` 调用 `curl`

#### Issue #3842  
链接：https://github.com/qwibitai/nanoclaw/issues/3842  
状态：Open  
影响范围：agent container、trace upload、Bun runtime  

问题表现：
- `upload-trace` 使用 Bun 的 `spawnSync` 运行 `curl`；
- 可能触发 Bun `spawnSync` 丢失子进程退出状态的问题；
- 导致 poll loop 卡死、CPU 100%。

已有 fix PR：
- 当前数据中未看到直接对应 #3842 的修复 PR。
- #3841 修复的是 memory hook，不覆盖 `upload-trace`。

建议优先级：
- 高。建议维护者尽快替换为异步 spawn，并加超时与失败上报。

---

### P1 / 高：Gateway / WebSocket / OAuth 端到端问题

#### PR #3840  
链接：https://github.com/qwibitai/nanoclaw/pull/3840  
状态：Closed  
影响范围：Gateway setup、OAuth、缓存、WebSocket  

修复内容：
- gateway step 结束状态显示；
- OAuth token 处理；
- cache miss；
- WebSocket 握手。

#### PR #3843  
链接：https://github.com/qwibitai/nanoclaw/pull/3843  
状态：Closed  
影响范围：Iron Proxy、WebSocket tunnel、provider runtime  

修复内容：
- 完成 WebSocket 握手；
- 保留 upstream framing；
- 改善 Codex provider 通过 Iron 的端到端路径。

---

### P1 / 中高：Signal adapter 附件与 DM routing 问题

#### PR #3837  
链接：https://github.com/qwibitai/nanoclaw/pull/3837  
状态：Open  

问题表现：
- 附件处理路径不一致；
- DM 与 group 的 platform ID 格式需要统一；
- outbound queue 需要修复。

相关文档 PR：
- #3838：https://github.com/qwibitai/nanoclaw/pull/3838

已有 fix PR：
- #3837 是主修复 PR，仍待合并。

---

### P2 / 中：安装脚本在 Linux distro Node 环境下权限失败

#### PR #3844  
链接：https://github.com/qwibitai/nanoclaw/pull/3844  
状态：Open  
作者：DorZvulun  

问题表现：
- `setup.sh` 的 pnpm 安装 fallback 在 Fedora / Debian / Ubuntu 等通过系统包安装 Node 的环境下失败；
- 典型错误为 npm `EACCES`；
- 原 sudo retry 逻辑不可用或体验较差。

修复方向：
- 使用用户拥有的 npm prefix fallback，避免依赖全局 sudo 安装。

影响判断：
- 对新用户安装体验影响较大；
- 若项目希望降低上手门槛，该 PR 应优先 review。

---

### P2 / 中：删除聊天组或 agent group 后产生 ghost destinations

#### PR #3835  
链接：https://github.com/qwibitai/nanoclaw/pull/3835  
状态：Open  
作者：shrwnsan  

问题表现：
- `deleteAllDestinationsTouching()` 没有调用方；
- 删除 messaging group 或 agent group 后，`agent_destinations` 表残留；
- 投影层会跳过无法解析的 channel/group，导致静默不一致。

影响判断：
- 属于数据一致性问题；
- 长期可能造成配置污染、调试困难。

---

### P2 / 中：scheduled task pre-script 强制 bash 导致 shebang 失效

#### PR #3834  
链接：https://github.com/qwibitai/nanoclaw/pull/3834  
状态：Open  
作者：shrwnsan  

问题表现：
- `runScript` 总是执行 `bash <file>`；
- 如果脚本使用 `#!/usr/bin/env node` 等 shebang，bash 会把 shebang 当注释并按 shell 解释正文；
- 导致 Node/Python 等任务脚本出现 bash syntax error。

影响判断：
- 对 scheduled tasks 的多语言脚本支持影响明显；
- 修复后将增强 agent runner 的通用性。

---

### P2 / 中：审批卡片永远 pending，拒绝能力不足

#### PR #3833  
链接：https://github.com/qwibitai/nanoclaw/pull/3833  
状态：Open  
作者：drsmk238  

问题表现：
- 模块发起的 approvals 缺少 TTL；
- `pending_approvals.expires_at` 虽被写入，但无人响应时状态不会自然结束；
- 请求 agent 无法获知审批过期；
- 增强 reject by id。

影响判断：
- 直接影响安全交互流程与用户信任；
- 建议优先进入下一轮稳定性发布。

---

## 6. 功能请求与路线图信号

今日没有明显的“纯功能请求”类新 issue，但多个 PR 暗示了项目短期路线图。

### 1）Gateway / Iron Proxy 将继续成为核心方向

相关 PR：
- #3840：https://github.com/qwibitai/nanoclaw/pull/3840
- #3843：https://github.com/qwibitai/nanoclaw/pull/3843

信号：
- Gateway setup、OAuth、WebSocket、Iron Proxy tunnel 正在被端到端验证；
- Provider 接入能力可能是下一阶段重点；
- Codex provider / OpenCode provider 的稳定运行是当前重点场景。

可能进入下一版本：
- 高概率。因为这些修复直接关系到 gateway stack 的可用性。

---

### 2）Provider registry / skills 测试体系需要硬化

相关 Issue / PR：
- #3839：https://github.com/qwibitai/nanoclaw/issues/3839
- #3841：https://github.com/qwibitai/nanoclaw/pull/3841
- #3842：https://github.com/qwibitai/nanoclaw/issues/3842
- #3836：https://github.com/qwibitai/nanoclaw/pull/3836

信号：
- 维护者正在处理 provider registry 的 CI 可靠性；
- Bun runtime 兼容性需要系统性修补；
- 未来可能出现一轮“去同步 spawn / 增加超时 / 增强子进程隔离”的硬化工作。

可能进入下一版本：
- 高概率，尤其是 #3841 和 #3842 相关修复。

---

### 3）通道适配器质量提升，Signal 是当前重点

相关 PR：
- #3837：https://github.com/qwibitai/nanoclaw/pull/3837
- #3838：https://github.com/qwibitai/nanoclaw/pull/3838

信号：
- NanoClaw 正在加强多通道消息处理的一致性；
- 附件、DM、group、outbound queue 是实际使用中的关键痛点；
- 文档与代码同步更新，说明该功能面向真实用户使用。

可能进入下一版本：
- 中高概率。代码修复和文档 PR 已成对出现，具备合入条件。

---

### 4）安装体验与本地环境兼容性被重视

相关 PR：
- #3844：https://github.com/qwibitai/nanoclaw/pull/3844

信号：
- 维护者/贡献者关注 Fedora、Debian、Ubuntu 等非 nvm/Homebrew Node 安装路径；
- 降低 setup.sh 权限问题，有助于扩大用户覆盖面。

可能进入下一版本：
- 中高概率。该修复范围明确，用户价值直接。

---

### 5）安全审批与 agent 操作治理正在增强

相关 PR：
- #3833：https://github.com/qwibitai/nanoclaw/pull/3833

信号：
- NanoClaw 对 agent 执行敏感操作时的审批生命周期越来越重视；
- TTL、过期通知、按 ID 拒绝等能力将提升系统可控性。

可能进入下一版本：
- 中高概率。属于安全与可靠性增强，不是大型功能改造。

---

## 7. 用户反馈摘要

今日 Issues 和 PR 数据中未见评论互动，无法从多轮评论中提取广泛用户反馈。但从 issue / PR 描述可归纳出以下真实使用痛点。

### 1）CI 挂死对维护者影响极大

相关：
- #3839：https://github.com/qwibitai/nanoclaw/issues/3839
- #3836：https://github.com/qwibitai/nanoclaw/pull/3836
- #3841：https://github.com/qwibitai/nanoclaw/pull/3841
- #3842：https://github.com/qwibitai/nanoclaw/issues/3842

痛点：
- `bun test` 挂死后 GitHub Actions 可能等待 6 小时；
- 同步子进程调用无法被常规 test timeout 打断；
- 维护者需要更快失败、更明确定位、更少 runner 浪费。

用户情绪判断：
- 不满点集中在“不可控”和“耗时过长”；
- 对超时保护和异步 spawn 修复的需求非常明确。

---

### 2）真实端到端安装暴露 gateway 细节问题

相关：
- #3840：https://github.com/qwibitai/nanoclaw/pull/3840
- #3843：https://github.com/qwibitai/nanoclaw/pull/3843

痛点：
- 状态输出不完整会降低安装可信度；
- OAuth token、cache miss、WebSocket 握手失败会让 provider gateway 路径难以调试；
- Iron Proxy 需要严格保留 WebSocket framing，否则上游通信可能异常。

用户情绪判断：
- 使用场景较真实，说明功能已进入验证阶段；
- 不满集中在“功能接近可用但细节不稳定”。

---

### 3）Linux 发行版包管理安装 Node 的用户会遇到 setup 权限问题

相关：
- #3844：https://github.com/qwibitai/nanoclaw/pull/3844

痛点：
- 使用 Fedora `dnf install nodejs` 或 Debian/Ubuntu `apt install nodejs` 后，npm 全局路径权限不足；
- 原有 sudo retry 不可靠；
- 新用户可能在 setup 阶段直接失败。

用户情绪判断：
- 这是典型上手门槛问题；
- 若不修复，会影响非开发者或不使用 nvm 的用户。

---

### 4）Signal 用户需要可靠的附件、DM 与队列行为

相关：
- #3837：https://github.com/qwibitai/nanoclaw/pull/3837
- #3838：https://github.com/qwibitai/nanoclaw/pull/3838

痛点：
- 图片、语音、通用文件需要一致处理；
- DM 与 group ID 格式不清会造成路由错误；
- 文档缺失会放大排障成本。

用户情绪判断：
- 这类问题通常来自真实通道接入；
- 文档 PR 表明贡献者希望减少后续重复踩坑。

---

## 8. 待处理积压

当前数据仅覆盖过去 24 小时，无法可靠识别“长期未响应”的历史积压。但从今日仍 Open 的项目中，以下条目建议维护者优先关注。

### 高优先级待处理

#### #3842 [hardening] upload-trace still runs curl through Bun's spawnSync  
链接：https://github.com/qwibitai/nanoclaw/issues/3842  
原因：
- 与已知 Bun `spawnSync` 挂死风险直接相关；
- 当前未见对应 fix PR；
- 可能继续造成 agent container CPU 100% 或流程卡死。

---

#### #3841 fix(opencode): run the memory hook with async spawn so bun test cannot wedge  
链接：https://github.com/qwibitai/nanoclaw/pull/3841  
原因：
- 是 #3839 的关键根因修复之一；
- 若不合入，CI 仍依赖 #3836 的超时兜底；
- 建议尽快 review / merge。

---

#### #3844 fix(setup): replace broken sudo retry with user-owned npm prefix fallback  
链接：https://github.com/qwibitai/nanoclaw/pull/3844  
原因：
- 直接影响 Fedora、Debian、Ubuntu 用户安装；
- 安装失败属于新用户流失高风险点；
- 修复范围明确，适合快速处理。

---

### 中优先级待处理

#### #3837 fix(signal): consolidate attachment, DM-routing, and outbound-queue fixes  
链接：https://github.com/qwibitai/nanoclaw/pull/3837  
原因：
- Signal 通道修复涉及真实消息流；
- 与文档 PR #3838 配套；
- 建议代码与文档一起 review。

---

#### #3838 docs(add-signal): document attachment/DM-routing fixes and troubleshooting  
链接：https://github.com/qwibitai/nanoclaw/pull/3838  
原因：
- 有助于降低 Signal 配置和排障成本；
- 最好与 #3837 同步合入，避免文档与行为不一致。

---

#### #3833 fix(approvals): expire unanswered cards and allow reject by id  
链接：https://github.com/qwibitai/nanoclaw/pull/3833  
原因：
- 审批卡片永久 pending 会影响安全流程闭环；
- TTL 与 reject by id 是 agent 操作治理的重要基础。

---

#### #3834 fix(scheduling): honor task-script shebangs instead of forcing bash  
链接：https://github.com/qwibitai/nanoclaw/pull/3834  
原因：
- scheduled tasks 应支持 Node/Python/其他解释器脚本；
- 当前强制 bash 会造成非 shell 脚本失败。

---

#### #3835 fix(destinations): sweep destination rows whose target no longer resolves  
链接：https://github.com/qwibitai/nanoclaw/pull/3835  
原因：
- 防止删除 group 后产生 ghost destination；
- 属于数据一致性和长期维护性问题。

---

## 总体健康度评估

NanoClaw 今日表现为 **高开发活跃、高修复密度、中等稳定性风险**。  
积极信号是：问题定位清晰，多个 PR 直接对应真实失败场景，CI、Gateway、Signal、安装、审批等核心路径都有修复推进。  
风险点是：Bun `spawnSync` 挂死问题尚未完全清除，Gateway/Iron Proxy 仍处在端到端稳定化阶段，多个关键 PR 仍 Open。  
建议短期优先级为：先合入 #3841 并处理 #3842，确保 CI 与 agent container 不再被同步子进程卡死；随后推进 #3844、#3837/#3838 和 #3833，改善安装、通道与安全审批体验。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报  
**日期：2026-09-17**  
**仓库：** [nullclaw/nullclaw](https://github.com/nullclaw/nullclaw)

---

## 1. 今日速览

过去 24 小时内，NullClaw 仓库共有 **1 条 Issue 更新**，其中 **1 条已关闭**，没有新的活跃 Issue、Pull Request 或版本发布。整体来看，今日项目活跃度 **偏低**，主要动态集中在一个移动端客户端方向的探索性议题关闭上。  
本日没有代码合并记录，因此主干功能、Bug 修复和版本演进未体现出直接推进。不过，从关闭的 Issue 内容看，社区或维护者仍在关注 **移动端 Agent 客户端形态**、**跨平台 GUI** 与 **human-guard-rail / NullClaw 客户端化** 等潜在路线。

---

## 3. 项目进展

过去 24 小时内没有 Pull Request 更新，因此没有可确认的代码合并、修复或功能落地。

### 已关闭议题

#### Issue #999：探索将 litter 的移动 GUI fork 为 human-guard-rail / NullClaw 客户端  
- 链接：[nullclaw/nullclaw#999](https://github.com/nullclaw/nullclaw/issues/999)  
- 状态：已关闭  
- 作者：Azdwarf5Azdwarf  
- 评论数：1  
- 反应数：0  
- 创建时间：2026-09-16  
- 更新时间：2026-09-16  

该 Issue 提出调研 [0xSero/litter](https://github.com/0xSero/litter) 的移动端架构：原生 iOS / Android UI，通过 Swift / Kotlin 构建轻量界面层，并使用共享 Rust core 与 Codex / Local Studio 类服务通信。议题希望探索类似模式是否可应用于 `human-guard-rail`，将其从现有 Android / Gradle 应用演进为更通用的 NullClaw 移动客户端。

由于该 Issue 已关闭且没有关联 PR，今日并未形成可追踪的代码层面推进。它更像是一次路线调研或方向记录的结束，而不是功能完成信号。

---

## 4. 社区热点

### 移动端 Agent 客户端架构探索  
- 相关 Issue：[nullclaw/nullclaw#999](https://github.com/nullclaw/nullclaw/issues/999)  
- 评论数：1  
- 反应数：0  

这是今日唯一有更新的社区议题。虽然互动量不高，但其主题具有一定战略意义：  
- 是否将 NullClaw 能力扩展到移动端；  
- 是否采用原生 UI + 共享 Rust core 的跨平台架构；  
- 是否让 `human-guard-rail` 成为 NullClaw 的移动客户端入口；  
- 是否对接 Codex / Local Studio 等本地或远程 Agent 服务。

从内容来看，社区关注点并非单一 UI 改造，而是更深层的 **Agent 客户端形态、跨平台复用和人类监督工作流**。不过，该议题已关闭，说明目前可能暂未进入近期执行计划，或已转移到其他仓库 / 讨论渠道。

---

## 5. Bug 与稳定性

过去 24 小时内未发现新的 Bug 报告、崩溃问题或回归问题。

| 严重程度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| - | 无新增 Bug 报告 | - | 无 |

从今日数据看，项目稳定性层面没有明显负面信号。但由于当日整体活跃度较低，不能仅凭一天数据判断缺陷风险下降。

---

## 6. 功能请求与路线图信号

### 移动端 NullClaw 客户端 / human-guard-rail 集成方向  
- 相关 Issue：[nullclaw/nullclaw#999](https://github.com/nullclaw/nullclaw/issues/999)  
- 当前状态：已关闭  
- 是否有对应 PR：无  

该 Issue 体现出一个潜在路线图信号：NullClaw 可能存在向移动端扩展的需求，尤其是构建一个可连接 Codex / Local Studio 服务的轻量客户端。其核心设想包括：

- 借鉴 `litter` 的 iOS + Android 原生客户端架构；
- 使用 Rust core 实现跨平台共享逻辑；
- 通过 UniFFI 或类似机制桥接 Swift / Kotlin；
- 将 `human-guard-rail` 从普通 Android 应用升级为更通用的 Agent 客户端；
- 支持人类监督、移动端审核、Agent 任务交互等场景。

不过，由于该 Issue 已关闭且没有 PR 跟进，目前无法判断该方向是否会进入下一版本。更可能的判断是：**这是一个被记录或初步评估过的方向，但短期内尚无明确实现计划**。

---

## 7. 用户反馈摘要

今日唯一 Issue 的内容反映出以下用户或贡献者诉求：

1. **希望 NullClaw 具备更好的移动端入口**  
   用户提到 `litter` 的原生 iOS / Android Agentic Coding 客户端形态，说明移动端访问 Agent 服务、查看任务、触发操作或进行监督可能是一个真实需求。

2. **希望避免重复构建客户端基础设施**  
   通过 fork 或借鉴现有项目的 GUI 与 Rust core 架构，可以降低从零实现移动端客户端的成本。

3. **关注跨平台核心逻辑复用**  
   Swift / Kotlin UI + Rust core 的方案显示出对可维护性和平台一致性的重视。对于 AI Agent 工具而言，移动端只是入口，核心协议、任务状态、权限和安全逻辑更适合统一维护。

4. **human-guard-rail 可能被视为 NullClaw 的监督层入口**  
   Issue 中提到 `human-guard-rail` 当前仍是普通 Android / Gradle 应用，说明用户可能希望它承担更大的职责，例如成为人类审核、权限确认或 Agent 操作把关的移动客户端。

由于评论数仅 1 条、反应数为 0，当前还不能判断这是广泛社区需求，还是单个贡献者的探索性建议。

---

## 8. 待处理积压

根据今日提供的数据，过去 24 小时内没有新的待处理 Issue 或 PR，也没有长期未响应的积压条目被更新。

当前可提醒维护者关注的点是：

### 已关闭但可能值得后续跟踪的路线议题  
- Issue：[nullclaw/nullclaw#999](https://github.com/nullclaw/nullclaw/issues/999)  
- 建议：如果移动端客户端、人类监督工作流或 `human-guard-rail` 是 NullClaw 的中长期方向，建议维护者将该探索沉淀为更明确的 Roadmap 条目，例如：
  - 是否计划支持官方移动端客户端；
  - 是否采用 Rust core + 原生 UI 架构；
  - `human-guard-rail` 与 NullClaw 主项目的关系；
  - 是否需要单独创建 design proposal / tracking issue；
  - 是否有计划对接 Codex、Local Studio 或其他 Agent server。

---

## 项目健康度评估

| 维度 | 今日状态 | 评价 |
|---|---:|---|
| Issue 活跃度 | 1 条更新，1 条关闭 | 低 |
| PR 活跃度 | 0 条 | 低 |
| 发布节奏 | 无新版本 | 平稳但无发布推进 |
| Bug 风险 | 无新增 Bug | 暂无明显风险 |
| 路线探索 | 移动端客户端方向被讨论但已关闭 | 有信号但未落地 |
| 社区互动 | 评论 1、反应 0 | 较弱 |

**综合判断：** NullClaw 今日处于低活跃维护状态，没有代码合并或版本发布。唯一动态集中在移动端客户端架构探索上，显示项目可能存在向多端 Agent 客户端、人类监督界面和 Rust 共享核心演进的潜在兴趣，但当前缺少 PR、设计文档或持续讨论支撑。建议维护者如认同该方向，可将已关闭 Issue 转化为正式路线图或 tracking issue，以便社区进一步参与。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报  
**日期：2026-09-17**  
**仓库：** [netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 1. 今日速览

过去 24 小时，LobsterAI **没有新的 Issue 更新**，但有 **4 条 Pull Request 被关闭或完成处理**，整体活动集中在代码修复、兼容性迁移和 OpenClaw 相关稳定性增强上。  
今日无新版本发布，说明项目当前更偏向于 **问题修复与内部质量提升**，尚未进入正式发版节奏。  
从 PR 内容看，OpenClaw 仍是当前维护重点，涉及启动修复、状态迁移、快速修复回滚、飞书插件加载以及认证代理稳定性等关键路径。  
社区讨论热度较低：无 Issue、PR 评论数缺失或为 0，说明今日主要是维护者驱动的工程推进，而非用户讨论驱动。  
综合判断：项目健康度较稳定，维护活跃度中等，重点在 **提升升级兼容性、故障恢复能力和插件/认证可靠性**。

---

## 2. 项目进展

今日共有 4 个 PR 被关闭或完成处理，主要集中在 OpenClaw、认证、插件加载和修复流程稳定性。

### 2.1 修复飞书插件原生 Node 加载失败问题

- **PR：** [#2691 `[area: docs] fix(openclaw): restore native Feishu plugin loading`](https://github.com/netease-youdao/LobsterAI/pull/2691)  
- **作者：** btc69m979y-dotcom  
- **状态：** Closed  
- **创建/更新：** 2026-09-17 / 2026-09-17  

该 PR 修复了飞书插件在原生 Node 加载路径中出现的：

```text
ReferenceError: exports is not defined in ES module scope
```

问题。根因来自 `@larksuite/openclaw-lark@2026.7.16` 的 `version.js` 与 `token-store.js` 在产物中混用了 CommonJS 与 `import.meta.url`，导致 macOS 原生加载路径触发异常。Windows 当前可能因为 jiti 回退路径而掩盖该问题。

**影响：**

- 修复升级后飞书渠道无法完成注册的问题。
- 提升 OpenClaw 插件在 macOS 原生加载路径下的兼容性。
- 对使用飞书集成的用户属于较关键修复。

---

### 2.2 增强 OpenClaw 快速修复失败回滚与媒体迁移处理

- **PR：** [#2690 `[area: renderer, area: main, area: openclaw, area: cowork] feat(openclaw): add repair snapshot rollback and agent media migration handling`](https://github.com/netease-youdao/LobsterAI/pull/2690)  
- **作者：** fisherdaddy  
- **状态：** Closed  
- **创建/更新：** 2026-09-16 / 2026-09-16  

该 PR 对 OpenClaw 的 Quick Repair 流程进行了增强，核心包括：

- 按阶段追踪修复失败：
  - preparation
  - snapshot
  - doctor
  - configuration
  - gateway
- 当 Quick Repair 失败时，可以明确报告失败阶段。
- 在修复失败后支持从修复前快照回滚。
- 抽取共享错误消息解析逻辑到：
  - `src/renderer/services/openclawRepair.ts`
- 为修复失败场景增加更明确的 UI 状态。
- 处理 agent media migration 相关逻辑。

**影响：**

- 显著提升 OpenClaw 自动修复流程的可观测性和可恢复性。
- 降低 Quick Repair 失败后用户配置损坏或状态不可恢复的风险。
- 对终端用户而言，修复失败时将更容易理解原因并恢复到安全状态。

---

### 2.3 在启动修复前迁移 OpenClaw 共享状态 Schema

- **PR：** [#2689 `[area: main, area: openclaw] feat(openclaw): migrate shared state schema before startup repair`](https://github.com/netease-youdao/LobsterAI/pull/2689)  
- **作者：** fisherdaddy  
- **状态：** Closed  
- **创建/更新：** 2026-09-16 / 2026-09-16  

该 PR 增加了一个 `prepare-startup` 兼容模式，用于在 Doctor/config repair 之前，对 OpenClaw SQLite 状态 schema 进行备份与迁移。

**解决的问题：**

过去 legacy config migration 可能会独立运行，并依赖一个可读取、格式正确的配置文件。这会导致在配置文件异常时，迁移和修复流程无法顺利进行。

**影响：**

- 启动修复流程更加健壮。
- 降低旧版本升级到新版本时因状态 schema 不兼容导致启动失败的概率。
- 与 #2690 的 Quick Repair 回滚能力形成互补，共同加强 OpenClaw 的升级与修复链路。

---

### 2.4 绕过 LobsterAI 托管代理凭证冷却机制

- **PR：** [#2688 `[area: renderer, area: docs, area: main] fix(auth): bypass LobsterAI proxy credential cooldowns`](https://github.com/netease-youdao/LobsterAI/pull/2688)  
- **作者：** Mind-Hand  
- **状态：** Closed  
- **创建/更新：** 2026-09-16 / 2026-09-16  

该 PR 修复了一个认证/计费异常引发的连锁可用性问题：上游模型认证或计费失败时，可能导致共享的 `lobsterai-server` 代理凭证被禁用 5 小时，从而影响后续对其他 LobsterAI 模型的请求。

该 PR 的核心处理包括：

- 将托管 provider 从 OpenClaw credential cooldown 机制中豁免。
- 区分上游服务故障与用户凭证问题。
- 避免单个上游认证/计费失败扩大为长时间的全局代理不可用。

**影响：**

- 提升 LobsterAI 托管模型调用的连续性。
- 减少因上游临时异常导致的误伤。
- 对依赖 LobsterAI 默认代理或托管 provider 的用户属于重要稳定性修复。

---

## 3. 社区热点

今日没有新增或活跃 Issue，PR 的评论数未提供或为 0，点赞反应也均为 0。因此，今天没有明显的社区讨论热点。

不过，从 PR 主题可以观察到当前维护重点集中在以下几类诉求：

1. **升级兼容性与状态迁移**
   - 相关 PR：
     - [#2689](https://github.com/netease-youdao/LobsterAI/pull/2689)
     - [#2690](https://github.com/netease-youdao/LobsterAI/pull/2690)
   - 背后诉求：用户在升级 OpenClaw 或 LobsterAI 后，希望历史配置、SQLite 状态和 agent 媒体资源能够平滑迁移。

2. **插件生态稳定性**
   - 相关 PR：
     - [#2691](https://github.com/netease-youdao/LobsterAI/pull/2691)
   - 背后诉求：飞书等第三方渠道插件需要在不同系统与加载路径下稳定运行，避免注册失败影响工作流。

3. **认证与模型调用可靠性**
   - 相关 PR：
     - [#2688](https://github.com/netease-youdao/LobsterAI/pull/2688)
   - 背后诉求：用户希望模型服务的临时上游故障不会导致长时间不可用，尤其是托管代理凭证不应被错误冷却。

---

## 4. Bug 与稳定性

今日没有新增 Issue 报告 Bug，但 4 个 PR 中至少 3 个直接指向稳定性或回归修复。按影响程度排序如下：

### 高优先级：LobsterAI 托管代理凭证被错误冷却

- **相关 PR：** [#2688 `fix(auth): bypass LobsterAI proxy credential cooldowns`](https://github.com/netease-youdao/LobsterAI/pull/2688)  
- **严重程度：** 高  
- **影响范围：** 使用 LobsterAI 托管 provider 或共享 `lobsterai-server` 代理凭证的用户  
- **问题表现：** 上游模型认证/计费失败可能导致共享代理凭证被禁用 5 小时，影响其他模型请求。  
- **修复状态：** 已有修复 PR，状态为 Closed。  

该问题的风险在于其影响具有放大效应：单个上游失败可能造成多个模型请求不可用。此次修复通过豁免托管 provider 的 cooldown 行为来降低误伤。

---

### 高优先级：OpenClaw Quick Repair 失败后缺乏明确阶段定位与回滚

- **相关 PR：** [#2690 `feat(openclaw): add repair snapshot rollback and agent media migration handling`](https://github.com/netease-youdao/LobsterAI/pull/2690)  
- **严重程度：** 高  
- **影响范围：** 使用 OpenClaw 修复流程、升级迁移或 agent media 迁移的用户  
- **问题表现：** 修复失败时难以定位具体阶段，且缺乏从修复前状态安全回滚的能力。  
- **修复状态：** 已有增强 PR，状态为 Closed。  

该 PR 不是单点 Bug 修复，而是对故障恢复能力的系统性补强。

---

### 中高优先级：OpenClaw SQLite 状态 Schema 迁移依赖配置文件完整性

- **相关 PR：** [#2689 `feat(openclaw): migrate shared state schema before startup repair`](https://github.com/netease-youdao/LobsterAI/pull/2689)  
- **严重程度：** 中高  
- **影响范围：** 从旧版本升级、存在 legacy config 或状态 schema 变更的用户  
- **问题表现：** legacy config migration 独立运行，可能依赖可读且格式良好的配置文件；配置文件异常时，迁移和修复可能被阻断。  
- **修复状态：** 已有增强 PR，状态为 Closed。  

该修复有助于提升启动阶段的容错能力，尤其适用于升级后首次启动场景。

---

### 中优先级：飞书插件在 macOS 原生加载路径下注册失败

- **相关 PR：** [#2691 `fix(openclaw): restore native Feishu plugin loading`](https://github.com/netease-youdao/LobsterAI/pull/2691)  
- **严重程度：** 中  
- **影响范围：** 使用飞书插件，特别是在 macOS 原生 Node 加载路径下运行的用户  
- **问题表现：** 插件加载时报 `ReferenceError: exports is not defined in ES module scope`，导致渠道无法完成注册。  
- **修复状态：** 已有修复 PR，状态为 Closed。  

该问题属于插件打包产物兼容性问题，Windows 环境可能因 jiti 回退路径而未显现。

---

## 5. 功能请求与路线图信号

今日没有新的 Issue，因此没有直接来自用户的新功能请求。不过，从 PR 内容可以推断出近期路线图信号：

### 5.1 OpenClaw 修复系统将继续增强

- **相关 PR：**
  - [#2690](https://github.com/netease-youdao/LobsterAI/pull/2690)
  - [#2689](https://github.com/netease-youdao/LobsterAI/pull/2689)

OpenClaw 的启动修复、Quick Repair、Doctor/config repair、snapshot rollback、SQLite schema migration 等能力正在持续完善。  
这表明后续版本可能会进一步强化：

- 自动诊断
- 自动修复
- 配置迁移
- 失败回滚
- 修复过程 UI 可视化

---

### 5.2 插件加载兼容性是短期重点

- **相关 PR：**
  - [#2691](https://github.com/netease-youdao/LobsterAI/pull/2691)

飞书插件的修复说明项目正在关注 OpenClaw 插件生态在不同运行时、不同平台上的一致性。  
后续可能继续出现与插件打包、ESM/CommonJS 兼容、Node 原生加载路径相关的修复。

---

### 5.3 托管模型服务的可用性边界会更细化

- **相关 PR：**
  - [#2688](https://github.com/netease-youdao/LobsterAI/pull/2688)

该 PR 明确区分了：

- 用户自身凭证问题
- 上游服务认证/计费问题
- LobsterAI 托管 provider 的代理凭证问题

这意味着后续在认证错误分类、重试策略、fallback 策略和 UI 错误提示方面，可能会继续细化。

---

## 6. 用户反馈摘要

今日没有 Issue 评论数据，因此无法从公开 Issue 评论中提取直接用户反馈。

不过，根据今日 PR 修复方向，可以归纳出潜在用户痛点：

1. **升级后渠道或插件不可用**
   - 代表修复：[飞书插件加载修复 #2691](https://github.com/netease-youdao/LobsterAI/pull/2691)
   - 可能痛点：升级后原本可用的飞书集成突然无法注册，影响自动化工作流。

2. **修复失败时不知道哪里出了问题**
   - 代表修复：[Quick Repair 阶段化失败追踪与回滚 #2690](https://github.com/netease-youdao/LobsterAI/pull/2690)
   - 可能痛点：用户点击修复后，如果流程失败，缺少清晰定位和恢复手段。

3. **旧数据迁移不稳定**
   - 代表修复：[启动前共享状态 schema 迁移 #2689](https://github.com/netease-youdao/LobsterAI/pull/2689)
   - 可能痛点：配置文件或 SQLite 状态异常时，升级流程容易失败。

4. **模型服务临时异常导致长时间不可用**
   - 代表修复：[代理凭证冷却绕过 #2688](https://github.com/netease-youdao/LobsterAI/pull/2688)
   - 可能痛点：一次上游认证/计费错误不应导致多个模型请求在数小时内不可用。

---

## 7. 待处理积压

今日数据中没有长期未响应的 Issue 或 PR，也没有开放状态的新增 Issue/PR 可供判断积压情况。

当前可提醒维护者关注的方向包括：

1. **确认今日 Closed PR 是否已全部合入目标分支**
   - [#2688](https://github.com/netease-youdao/LobsterAI/pull/2688)
   - [#2689](https://github.com/netease-youdao/LobsterAI/pull/2689)
   - [#2690](https://github.com/netease-youdao/LobsterAI/pull/2690)
   - [#2691](https://github.com/netease-youdao/LobsterAI/pull/2691)

2. **补充回归测试与跨平台验证**
   - 飞书插件加载问题涉及 macOS 原生 Node 路径与 Windows jiti 回退路径，建议增加跨平台插件加载测试。
   - OpenClaw 修复与迁移链路建议覆盖：
     - 损坏配置文件
     - 旧 SQLite schema
     - Quick Repair 中途失败
     - snapshot rollback
     - agent media migration

3. **观察后续是否需要补发版本**
   - 今日多个 PR 涉及用户可见的稳定性问题，尤其是：
     - 代理凭证冷却问题：[#2688](https://github.com/netease-youdao/LobsterAI/pull/2688)
     - 飞书插件注册失败：[#2691](https://github.com/netease-youdao/LobsterAI/pull/2691)
   - 如果这些问题影响已发布版本用户，可能需要考虑 patch release。

---

## 总体健康度评估

- **开发活跃度：** 中等，过去 24 小时有 4 个 PR 完成处理。  
- **社区互动：** 较低，今日无 Issue 更新，PR 评论和反应数据缺失或为 0。  
- **稳定性趋势：** 向好，多个 PR 针对认证、迁移、修复回滚和插件加载问题进行增强。  
- **发布节奏：** 今日无新版本，可能处于修复积累阶段。  
- **主要风险：** OpenClaw 升级/迁移链路复杂度较高，插件运行时兼容性和托管代理错误分类仍需持续验证。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-09-17）

## 1. 今日速览

过去 24 小时，Moltis 项目活跃度较低但有明确的工程信号：新增/更新 Issue 1 条、PR 1 条，暂无版本发布，也没有 PR 合并或 Issue 关闭。  
今日主要关注点集中在 **远程 MCP 服务稳定性** 与 **Agent 沙箱安全能力增强** 两个方向。  
Issue #1271 暴露了 remote MCP over streamable HTTP 在启动失败和会话丢失后的恢复机制缺陷，可能影响长期运行环境的可靠性。  
PR #1272 则推进了 per-agent sandbox 配置能力，体现项目在安全隔离、权限控制和多 Agent 运行策略上的持续演进。  
整体来看，项目今日处于“问题暴露 + 功能扩展待评审”阶段，维护节奏平稳，但尚未形成可交付增量。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日暂无已合并或已关闭的重要 PR，因此主分支功能并未出现可确认的新增交付。

不过，有一项新的开放 PR 值得关注：

### PR #1272 — `feat(sandbox): per-agent mounts, run_as and a forced sandbox`

- 状态：OPEN  
- 作者：Bergmann89  
- 创建时间：2026-09-16  
- 链接：https://github.com/moltis-org/moltis/pull/1272  

该 PR 为 Agent preset 的 `[sandbox]` 配置块增加了三个 per-agent 级别的沙箱控制参数：

- `sandbox.mounts`：为特定 Agent 的 sandbox container 额外配置 host bind mounts
- `sandbox.run_as`：指定容器运行时的 `uid:gid`
- `sandbox.force`：强制该 Agent 必须在 sandbox 中运行，禁止非沙箱执行

这项改动如果合并，将显著增强 Moltis 在多 Agent 场景下的安全隔离能力，尤其适用于以下使用场景：

- 不同 Agent 需要访问不同宿主机目录
- 某些 Agent 需要以非 root 用户运行
- 高风险 Agent 必须被强制限制在沙箱中
- 企业或自托管部署中需要更严格的执行边界

当前该 PR 尚未合并，因此项目整体进展仍处于“待评审/待集成”阶段。

---

## 4. 社区热点

今日活跃项数量较少，没有出现高评论数或高反应数的讨论。

### Issue #1271 — Remote MCP server 启动失败后不重试，会话丢失后影响后续调用

- 状态：OPEN  
- 评论数：0  
- 👍：0  
- 作者：tomachianura  
- 链接：https://github.com/moltis-org/moltis/issues/1271  

该 Issue 虽然暂无评论和反应，但主题本身较为关键。用户报告的问题涉及 remote MCP over streamable HTTP 的可恢复性：

1. MCP server 启动失败后，`McpManager::start_enabled` 记录 `failed to start MCP server` 后即放弃。
2. 健康监控逻辑似乎只会重启状态发生变化的 server。
3. 如果 server 在初始启动阶段失败，后续可能不会被再次尝试启动。
4. lost session 会导致之后的调用持续失败。

背后的诉求是：MCP 远程服务应具备更强的自愈能力，尤其是在网络不稳定、远端服务重启、初始依赖尚未就绪等场景下。

### PR #1272 — Per-agent sandbox 配置能力

- 状态：OPEN  
- 评论数：未提供  
- 👍：0  
- 作者：Bergmann89  
- 链接：https://github.com/moltis-org/moltis/pull/1272  

该 PR 是今日唯一的功能型工程进展。虽然目前没有明显社区讨论热度，但其方向与 Agent 安全模型、执行权限隔离、企业级部署需求高度相关，后续可能成为维护者重点评审对象。

---

## 5. Bug 与稳定性

### 高优先级：Remote MCP server 启动失败后不重试，lost session 后持续影响调用

- Issue：#1271  
- 状态：OPEN  
- 作者：tomachianura  
- 链接：https://github.com/moltis-org/moltis/issues/1271  
- 影响范围：remote MCP over streamable HTTP  
- 报告版本：Moltis `20260913.02`  
- 是否已有 fix PR：未发现对应修复 PR  

#### 问题表现

用户报告 remote MCP server 在以下场景中恢复能力不足：

- 启动阶段失败后，系统记录错误并停止尝试。
- 健康监控逻辑可能只处理“状态变化后”的重启，而不会主动重新拉起从未成功启动的 server。
- 会话丢失后，后续调用持续失败，可能需要人工干预或重启服务。

#### 稳定性影响

该问题对长期运行的 Moltis 部署有较高影响，尤其是：

- 远程 MCP server 依赖外部网络或上游服务
- MCP server 启动顺序存在不确定性
- streamable HTTP session 可能因网络抖动、服务端重启、代理超时而失效
- 用户期望 Moltis 作为 gateway 或 agent runtime 长时间无人值守运行

#### 初步严重程度评估

严重程度：高  
原因：该问题可能导致某些 MCP server 永久不可用，并且 lost session 可能让后续请求持续失败，属于可用性和自恢复能力缺陷。

---

## 6. 功能请求与路线图信号

### Per-agent sandbox 配置能力可能进入近期版本

- PR：#1272  
- 状态：OPEN  
- 链接：https://github.com/moltis-org/moltis/pull/1272  

该 PR 提供的 `sandbox.mounts`、`sandbox.run_as`、`sandbox.force` 三个配置项，明显指向更细粒度的 Agent 执行控制。

#### 路线图信号

这项变更表明 Moltis 可能正在加强以下方向：

1. **Agent 隔离能力**
   - 不同 Agent 可以拥有不同的文件系统访问权限。
   - 更适合多租户、多任务或高风险工具调用场景。

2. **最小权限执行**
   - 通过 `run_as` 指定非 root 用户运行容器。
   - 有助于降低容器逃逸、文件权限误用和宿主机污染风险。

3. **强制安全策略**
   - `sandbox.force` 表明某些 Agent 不允许在非 sandbox 环境中执行。
   - 对企业用户、自动化部署和安全敏感 Agent 非常重要。

#### 被纳入下一版本的可能性

可能性：中到高  
理由：该 PR 已经提供明确实现方向，且与 Agent runtime 安全模型高度相关。如果评审顺利，较可能进入后续版本。  
风险点在于该功能涉及配置兼容性、容器运行权限、mount 安全边界和不同部署环境下的行为一致性，维护者可能需要额外测试。

---

## 7. 用户反馈摘要

今日 Issue/PR 评论数据较少，无法提炼大规模社区情绪，但从 Issue #1271 可以看到一个明确的真实用户痛点。

### 用户痛点：远程 MCP 服务缺乏自动恢复能力

来源：Issue #1271  
链接：https://github.com/moltis-org/moltis/issues/1271  

用户在使用 `Moltis 20260913.02` 和 remote MCP over streamable HTTP 时遇到服务恢复问题。反馈表明，用户期望 Moltis 在面对远程 MCP server 启动失败、session 丢失或连接异常时，能够自动重试和恢复，而不是进入需要人工介入的不可用状态。

#### 使用场景推断

该用户可能运行的是：

- remote MCP server
- streamable HTTP transport
- 需要长期稳定连接的 gateway / agent runtime
- 可能存在远程服务启动慢、偶发失败或网络不稳定的部署环境

#### 不满意点

- server 启动失败后不会自动重试
- session 丢失后后续调用持续失败
- 健康检查机制未覆盖初始启动失败或失效 session 的恢复路径

#### 正向信号

用户提供了较具体的问题路径和相关代码位置，例如 `McpManager::start_enabled` 与 `crates/gateway/src/mcp_health.rs`，这有助于维护者快速定位问题。

---

## 8. 待处理积压

基于今日提供的数据，暂未发现长期未响应的重要 Issue 或 PR。当前可见的待处理事项主要是最新开放的 1 个 Issue 和 1 个 PR：

### 需要维护者关注：Issue #1271

- 链接：https://github.com/moltis-org/moltis/issues/1271  
- 原因：涉及 remote MCP 服务自恢复能力，可能影响生产环境稳定性。  
- 建议优先级：高  
- 建议处理方向：
  - 检查 `McpManager::start_enabled` 在启动失败后的 retry 策略。
  - 扩展 health monitor，使其能处理“从未成功启动”的 server。
  - 对 lost session 增加重新建连或 session refresh 逻辑。
  - 增加 remote MCP startup failure / lost session 的回归测试。

### 需要评审：PR #1272

- 链接：https://github.com/moltis-org/moltis/pull/1272  
- 原因：涉及 sandbox 配置能力扩展，对安全模型和部署行为有重要影响。  
- 建议优先级：中到高  
- 建议评审重点：
  - `sandbox.mounts` 是否有路径校验和安全限制。
  - `sandbox.run_as` 在不同容器运行时下的兼容性。
  - `sandbox.force` 是否会破坏现有非 sandbox 使用方式。
  - 配置文档、示例和迁移说明是否完整。
  - 是否需要为 per-agent sandbox 配置增加测试覆盖。

---

## 项目健康度小结

Moltis 今日没有发布和合并，短期交付节奏偏低；但新增 Issue 和 PR 均指向项目核心能力：MCP 稳定性与 Agent 执行安全。  
Issue #1271 暴露的远程 MCP 恢复问题值得优先处理，因为它可能直接影响生产环境可用性。  
PR #1272 则代表项目在沙箱隔离和权限控制方面的持续增强，若顺利合并，将提升 Moltis 面向复杂 Agent 部署场景的成熟度。  
总体健康度评估：**中等偏稳，需关注 MCP 自恢复能力缺口**。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报｜2026-09-17

## 1. 今日速览

过去 24 小时 CoPaw / QwenPaw 仓库活跃度较高：Issues 更新 13 条，其中 11 条仍处于打开或活跃状态；PR 更新 12 条，其中 9 条待合并，3 条已关闭或合并。  
今日关注点明显集中在 **Console 稳定性、SSE 流式响应健壮性、桌面端会话状态、MCP OAuth 刷新、上下文管理与前端性能** 等方向。  
维护侧已有多个修复 PR 快速跟进用户报告，尤其是 SSE `null` 事件、MCP OAuth token 刷新、Console 打包缺失、上下文用量显示等问题，说明项目响应速度较快。  
不过，当前仍有多项关键 Bug 处于打开状态，且多个修复 PR 尚未合并，短期内项目稳定性压力仍然较大。  
整体健康度评价：**社区活跃、问题暴露充分、修复推进积极，但 Console/桌面端稳定性和流式链路仍是当前主要风险区。**

---

## 2. 项目进展

今日无新版本发布，但有若干 PR 推进了稳定性、测试和工程质量。

### 已关闭 / 已合并的重要 PR

#### #7816 fix(pack): force-include console channel in PyInstaller bundle  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7816  
状态：Closed  
该 PR 处理 PyInstaller 打包时无法追踪动态导入 `console` channel 的问题。此前由于 `importlib.import_module(".console", ...)` 无法被静态分析，桌面端 Tauri sidecar 包可能遗漏 Console channel，导致打包后的桌面应用启动失败。  
该修复对桌面端可用性影响较大，尤其是官方发行包和本地打包用户。

#### #7805 fix: match settings menu font weight  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7805  
状态：Closed  
该 PR 修复设置菜单字体粗细不一致的问题，属于 UI 一致性优化。虽然不是核心功能变更，但有助于提升桌面端和 Console 体验的精致度。

#### #7803 ci(e2e): enable the declared pytest-timeout and raise the per-shard job timeout to 60 minutes  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7803  
状态：Closed  
该 PR 调整 E2E CI 配置，启用已声明的 `pytest-timeout`，并将单分片 job 超时时间提升到 60 分钟。  
虽然不涉及产品代码，但对测试稳定性和 CI 可诊断性有帮助，特别是在 E2E 测试耗时较长或偶发卡住时，可以更准确地暴露问题。

### 今日仍待合并、但推进价值较高的 PR

#### #7822 fix(drivers): apply refreshed OAuth Bearer to live MCP client  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7822  
关联 Issue：https://github.com/agentscope-ai/QwenPaw/issues/7821  
该 PR 修复 MCP driver 中 OAuth access token 刷新后未应用到 live client 的问题。若合并，将直接解决 MCP 长连接或 streamable HTTP 客户端仍使用旧 Authorization 的问题。

#### #7820 fix(console): reject bare null SSE event payloads  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7820  
关联 Issue：https://github.com/agentscope-ai/QwenPaw/issues/7814  
该 PR 从后端侧处理 Console SSE 中裸 `null` payload 导致流异常的问题，是今日 Console 流式稳定性修复的关键 PR 之一。

#### #7811 fix(token-usage): show measured context size in the chat context ring  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7811  
该 PR 修正聊天输入框旁上下文环显示值偏小的问题，使 UI 更接近真实请求上下文大小。结合今日用户关于 131k/271k 上下文爆表的反馈，该修复可能对用户理解和排查上下文管理问题有直接价值。

#### #7807 fix(channels): import channel modules only when the channel is enabled  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7807  
该 PR 避免 channel registry 解析时导入所有内置 channel 模块，减少启动或首次请求时的阻塞。对性能、冷启动体验和事件循环响应性有积极影响。

#### #7808 fix(loop): accept dict stages in doom loop gate  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7808  
该 PR 修复 DoomLoopGate 对 stage 数据结构的兼容问题，使其同时支持 dict-style 和 object-style stage，并增加回归测试。属于 Agent 执行安全和稳定性的底层修复。

---

## 3. 社区热点

### #7815 Console 懒加载页面 chunk 加载失败后无法恢复  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7815  
状态：Open  
评论数：4  
这是今日评论最多的 Issue 之一。用户报告 Console 中某个 lazy page chunk 加载失败后，后续所有页面导航都会停留在错误页，必须完整刷新页面才能恢复。  
背后诉求是：Console 应具备更好的前端错误恢复能力，包括懒加载 chunk 失败后的重试、错误边界重置、路由切换后的状态清理等。该问题对 Web Console 和桌面端内嵌前端都具有较高影响。

### #7799 v2.2.1 Console 不显示 Agent 通过 send_file_to_user 发送的图片  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7799  
状态：Closed  
评论数：4  
用户反馈 Agent 调用内置工具 `send_file_to_user` 发送图片时，图片只在流式输出期间短暂显示，回答结束后变成文件路径文本。用户认为该问题疑似历史问题 #5320 复发。  
该问题反映出用户对多模态输出持久化展示的强需求：Agent 发出的图片应像用户上传图片一样，在会话历史中稳定保留，而不是流式期间短暂出现。

### #7814 Console SSE 裸 `null` payload 与失败时无终止事件  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7814  
状态：Open  
评论数：3  
该问题指出 Console SSE 链路存在两个健壮性缺口：  
1. `_strip_event_headlines` 可能输出裸字符串 `null`，形成非法 SSE payload；  
2. `stream_one` 在中途失败时只记录异常，不向客户端发送终止事件。  
该问题已由 PR #7820 部分跟进，属于今日最重要的后端稳定性议题之一。

### #7818 UI 经常卡死且内存使用率特别高  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7818  
状态：Open  
评论数：2  
用户通过截图反馈 UI 卡死和高内存占用。该问题虽然目前描述信息较少，但从影响面看较严重，可能涉及前端渲染、流式消息累积、上下文膨胀、桌面端 WebView 内存释放等多个方向。  
建议维护者优先补充复现路径、系统环境、会话规模、模型与插件配置，并关联可能的性能优化 PR，例如 #7807。

### #7810 上下文管理和大模型最大上下文输入限制设置问题  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7810  
状态：Open  
评论数：2  
用户在 Windows desktop 2.2.1 中设置模型最大上下文为 131k，但实际提交请求达到 271k，压缩机制未按预期触发。  
该问题背后是用户对上下文管理可解释性的强烈需求：他们需要知道限制在哪里设置、为何压缩没有触发、UI 显示与实际请求是否一致。PR #7811 可能能缓解“显示不准确”的部分痛点，但不一定完全解决压缩策略问题。

---

## 4. Bug 与稳定性

以下按潜在严重程度排序。

### 严重：Console SSE 裸 `null` payload 导致流式响应冻结  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/7813  
状态：Open  
相关 PR：https://github.com/agentscope-ai/QwenPaw/pull/7820  
用户报告一个畸形 SSE frame，payload 为裸 JSON `null`，会导致 Console 当前流式 turn 崩溃。异常被外层 handler 捕获并仅记录日志，没有向客户端发送终止信号，导致 UI 端认为响应仍在进行，从而卡住。  
已有后端修复 PR #7820，但 Issue #7813 中提到还需要前端 companion 修复，因此当前应视为“部分修复进行中”。

### 严重：Console SSE 失败路径缺少终止事件  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/7814  
状态：Open  
相关 PR：https://github.com/agentscope-ai/QwenPaw/pull/7820  
该问题与 #7813 相关，但更偏后端协议健壮性。失败时没有 terminal event 会让客户端无法正确收尾，造成流式 UI 卡住、用户无法判断任务是否结束。  
PR #7820 已处理“拒绝裸 null SSE payload”的后端部分，但失败时完整终止语义仍需确认是否覆盖。

### 严重：UI 卡死与高内存占用  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/7818  
状态：Open  
相关 PR：暂无明确 fix PR  
用户报告 UI 经常卡死且内存使用率很高。由于缺少复现步骤，目前无法判断是 Console 渲染、桌面 WebView、上下文过大、流式事件堆积，还是 channel 初始化阻塞导致。  
建议优先要求用户提供：版本、操作系统、会话长度、是否开启插件、是否有大文件/图片输出、内存增长曲线以及开发者工具 Performance 记录。

### 高：懒加载页面 chunk 失败后 Console 无法从错误页恢复  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/7815  
状态：Open  
相关 PR：暂无明确 fix PR  
该问题会让用户在一次前端 chunk 加载失败后无法继续使用 Console 导航，必须完整刷新。对弱网、桌面端缓存、版本热更新场景影响明显。  
建议引入路由级错误边界 reset、chunk load retry、失败 chunk 缓存失效处理。

### 高：MCP driver 刷新 OAuth access_token 后未应用到 live client  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/7821  
状态：Open  
相关 PR：https://github.com/agentscope-ai/QwenPaw/pull/7822  
当前 `_guarded_execute` 每次工具调用都会 resolve credentials，并触发 OAuth2 access token 刷新，但 `_execute` 丢弃该 credential，live MCP client 仍使用连接建立时的 Authorization。  
这会导致长时间运行的 MCP 工具调用在 token 过期后持续失败。PR #7822 已给出直接修复，建议优先 review。

### 中高：桌面端启动后立即输入 slash command 会作用到 fallback session  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/7812  
状态：Open  
相关 PR：https://github.com/agentscope-ai/QwenPaw/pull/7819  
用户报告桌面端刚启动后，在聊天框输入 slash command 会作用到与当前屏幕不同的会话，典型表现是 `/compact` 报告空 memory。  
PR #7819 “wait for chat ownership before submit” 可能与此相关，通过等待 chat ownership 再提交，减少会话归属未准备好时的误操作。

### 中高：上下文限制和压缩策略未按用户预期生效  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/7810  
状态：Open  
相关 PR：https://github.com/agentscope-ai/QwenPaw/pull/7811  
用户设置模型最大上下文为 131k，但请求实际达到 271k，且压缩未触发。  
PR #7811 修复 UI context ring 显示不准确问题，但是否解决压缩触发逻辑仍不明确。建议将“显示值不准”和“压缩策略不生效”拆分验证。

### 中：Agent 发送图片后历史会话中消失  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/7799  
状态：Closed  
相关 PR：暂无从今日数据中明确关联  
虽然 Issue 已关闭，但用户描述显示它影响 Agent 多模态输出的持久展示。若未有明确修复链接，建议维护者补充关闭原因，例如重复、已修复、无法复现或设计预期。

### 中：飞书 / Lark p2p 发消息 230101 与文件事件缺失  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/7817  
状态：Open  
相关 PR：暂无明确 fix PR  
用户在 Docker 部署接入飞书自建机器人时，p2p 回复返回 `230101`，并指出文件事件处理缺失。  
该问题影响企业 IM channel 的可用性，建议维护者确认飞书 p2p 场景下 `receive_id_type` 和 receive id 选择策略，并完善文件事件支持。

---

## 5. 功能请求与路线图信号

### Creator 插件 1.3.0 大版本功能推进  
PR：https://github.com/agentscope-ai/QwenPaw/pull/7823  
状态：Open  
该 PR 将 Creator app-plugin 从 1.2.0 推进到 1.3.0，包含 OpenCode Zen/Go endpoints、并行素材理解、上传失败恢复、style-anchor versioning、overlay/subtitle timeline correction、prompt-sync gate recovery、多集制作加固等。  
这是今日规模最大的功能型 PR，若合并，Creator 插件能力会明显增强，尤其面向多集内容生产和复杂素材处理场景。

### 聊天模式选择：Discuss vs Execute  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/7801  
状态：Open  
用户希望在 Console / Desktop chat 中区分“讨论模式”和“执行模式”。当前每条消息都可能触发 agent 执行文件修改、shell、部署等动作，用户在仅想讨论方案时会感到风险较高。  
该需求与 Agent 安全、工具调用审批、执行意图确认高度相关，可能成为后续交互设计重点。

### 工具审批卡片与通知增加 i18n 支持  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/7809  
状态：Open  
用户反馈 Tool Guard 拦截高风险工具调用时，审批卡片和通知文本硬编码为英文，即使桌面语言不是英文也无法本地化。  
该需求指向国际化体验完善，尤其对中文用户和多语言团队重要。考虑到审批卡片涉及安全决策，文本本地化不仅是体验问题，也影响用户理解风险。

### 任务完成 / 中断 / 请求许可时底栏标签高亮提醒  
Issue：https://github.com/agentscope-ai/QwenPaw/issues/7800  
状态：Open  
用户希望当任务中断、请求许可或完成任务时，系统底栏标签显示橙色高亮，而不仅依赖右下角弹窗。  
该需求反映桌面端长任务运行时的可见性问题：用户往往切换到其他窗口工作，右下角通知容易错过。底栏高亮可作为更持久、更低打扰的状态提示。

### Runtime activity telemetry  
PR：https://github.com/agentscope-ai/QwenPaw/pull/7802  
状态：Open  
该 PR 计划在内置 Agent 或外部 harness 执行时，每日记录一次 Runtime activity 事件，包括计划任务；启动、页面访问和非 Agent 执行命令不计入。  
这是产品分析和运行态观测方向的路线图信号，但需要关注隐私、遥测开关、数据最小化和透明度。

### Channel 模块按需导入  
PR：https://github.com/agentscope-ai/QwenPaw/pull/7807  
状态：Open  
虽然是性能修复 PR，但也体现路线图方向：减少多 channel 架构带来的启动成本，使用户只为实际启用的 channel 付出开销。对插件化、企业 channel、多端部署都很重要。

---

## 6. 用户反馈摘要

### 用户对 Console / Desktop 稳定性的容忍度正在下降  
多个 Issue 指向 Console 卡死、流式响应不结束、页面错误后无法恢复、图片显示丢失等问题：  
- https://github.com/agentscope-ai/QwenPaw/issues/7813  
- https://github.com/agentscope-ai/QwenPaw/issues/7814  
- https://github.com/agentscope-ai/QwenPaw/issues/7815  
- https://github.com/agentscope-ai/QwenPaw/issues/7818  
用户真实痛点是：Agent 执行通常耗时较长，一旦 UI 卡住或状态不明确，用户无法判断任务是否仍在运行、是否需要重试、是否会重复执行危险操作。

### 上下文管理需要更透明、更可解释  
Issue #7810 显示用户已经主动设置模型最大上下文和压缩阈值，但实际请求仍超出预期。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7810  
这说明用户不仅需要“自动压缩”，还需要明确知道：  
- 当前请求实际 token 数是多少；  
- 哪些内容被计入上下文；  
- 系统 prompt、工具 schema、历史消息和 summary 各占多少；  
- 为什么压缩没有触发。  
PR #7811 对“显示真实上下文大小”是重要一步，但可能还需要进一步解释压缩策略。

### 用户希望 Agent 执行更可控  
Issue #7801 要求 Discuss / Execute 模式切换，Issue #7809 要求工具审批文本本地化，Issue #7800 要求任务状态提醒更明显。  
相关链接：  
- https://github.com/agentscope-ai/QwenPaw/issues/7801  
- https://github.com/agentscope-ai/QwenPaw/issues/7809  
- https://github.com/agentscope-ai/QwenPaw/issues/7800  
这些反馈共同表明：用户在使用个人 AI 助手时，不只关注“能不能执行”，也关注“什么时候执行、执行前是否确认、执行状态是否可见、风险说明是否看得懂”。

### 企业 channel 用户关注实际接入细节  
Issue #7817 来自飞书 / Lark Docker 部署场景，反馈 p2p 发送和文件事件问题。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7817  
这类反馈说明 CoPaw 在企业 IM 集成中已有真实使用场景，后续需要更细致地适配平台 API 差异，并给出部署配置建议。

### 多模态输出需要持久、可靠  
Issue #7799 反映 Agent 发送图片只在流式期间短暂可见，结束后退化为路径文本。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7799  
用户预期是图片作为会话内容长期保留，而不是作为临时流式片段存在。这对 Creator、多模态 Agent、文件交付类任务尤其重要。

---

## 7. 待处理积压

基于今日数据，未能识别“长期未响应”的旧 Issue 或 PR；多数条目均在 9 月 16 日至 9 月 17 日创建或更新。不过，以下新积压项影响较高，建议维护者优先处理或明确归属。

### 高优先级待 review PR

#### #7822 apply refreshed OAuth Bearer to live MCP client  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7822  
原因：直接修复 MCP OAuth token 刷新后仍使用旧 Authorization 的问题，影响长时间运行 MCP 工具链稳定性。

#### #7820 reject bare null SSE event payloads  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7820  
原因：关联 Console 流式冻结问题，是当前 SSE 稳定性的关键修复。

#### #7819 wait for chat ownership before submit  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7819  
原因：可能缓解桌面端启动后 slash command 操作错误会话的问题，涉及用户数据和会话状态一致性。

#### #7811 show measured context size in the chat context ring  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7811  
原因：上下文显示不准会误导用户判断请求规模，并与 #7810 中的上下文爆表反馈高度相关。

#### #7807 import channel modules only when the channel is enabled  
链接：https://github.com/agentscope-ai/QwenPaw/pull/7807  
原因：按需导入 channel 可改善启动性能和首次请求阻塞，对性能类投诉可能有间接帮助。

### 高优先级待 triage Issue

#### #7818 UI 卡死与高内存占用  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7818  
建议：尽快收集复现步骤和诊断信息，判断是否为已知 SSE 卡死、上下文膨胀、前端内存泄漏或桌面 WebView 问题。

#### #7815 Console chunk load 失败后无法恢复  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7815  
建议：需要前端 owner 评估错误边界、lazy import retry、路由切换 reset 方案。

#### #7810 上下文管理限制未生效  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7810  
建议：拆解为 UI 显示问题、真实请求 token 构成问题、压缩触发策略问题三部分排查。

#### #7817 飞书 / Lark p2p 与文件事件问题  
链接：https://github.com/agentscope-ai/QwenPaw/issues/7817  
建议：channel 维护者确认是否为平台 API 使用方式问题，并补充文档或框架级适配。

---

## 今日结论

CoPaw 今日表现为“高活跃、高暴露、高修复推进”的状态。社区正在集中验证桌面端、Console、流式响应、MCP 和上下文管理等核心路径，说明项目已经进入较真实的复杂使用阶段。  
短期建议维护者优先合并或处理 **#7820、#7822、#7819、#7811** 等稳定性 PR，并对 **#7818、#7815、#7810** 做重点 triage。  
如果这些问题能在下一轮版本中集中修复，项目的桌面端可靠性和 Agent 执行体验会有明显提升。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报｜2026-09-17

## 1. 今日速览

过去 24 小时 ZeroClaw 活跃度很高：新增/更新 Issues 19 条、PR 19 条，但暂无 Issue 关闭、PR 合并或版本发布。今日讨论重点集中在 **多渠道消息可靠性、语音/STT/TTS 体验、运行时稳定性、工具调用解析、多模态处理、Windows 服务/CI 稳定性** 等方向。  
从数据看，项目处于密集修复与架构补强阶段：大量问题已有对应或相关 PR，但尚未进入合并完成状态。整体健康度表现为 **开发活跃、问题暴露充分、维护压力较高**，短期内需要维护者集中 Review 高风险/高影响 PR。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日暂无已合并或已关闭 PR，因此主干代码尚未产生已确认推进。但有多条关键 PR 已打开，显示下一轮版本可能聚焦以下方向：

### 运行时与工具调用稳定性

- [PR #10935](https://github.com/zeroclaw-labs/zeroclaw/pull/10935)  
  **fix(runtime): keep prose that quotes a tool-result object out of the streaming protocol guard**  
  目标修复流式文本守卫误判普通文本为工具结果对象的问题，对应 [Issue #10912](https://github.com/zeroclaw-labs/zeroclaw/issues/10912)。该问题会导致整段回复被抑制，并在多次重试后返回泛化格式错误，属于影响 Agent 可用性的核心运行时问题。

- [PR #10914](https://github.com/zeroclaw-labs/zeroclaw/pull/10914)  
  **fix(tools): preserve string arguments during fallback parsing**  
  修复工具调用 fallback 解析时嵌套字符串参数被错误转换的问题，有助于提升复杂 JSON 文档、工具参数和 runtime text fallback 场景下的可靠性。

### 配置与运行时热更新

- [PR #10911](https://github.com/zeroclaw-labs/zeroclaw/pull/10911)  
  **feat(config): publish atomic live revisions**  
  大型高风险 PR，涉及配置、provider、runtime、daemon、gateway、多渠道等多个模块。若合并，将显著增强 live config revision 的原子发布能力，但 Review 成本较高。

### 多模态与图片处理

- [PR #10904](https://github.com/zeroclaw-labs/zeroclaw/pull/10904)  
  **fix(runtime): gate the no-vision error on image markers that resolve**  
  解决非视觉模型在遇到未实际解析成功的图片标记时错误中断整个 turn 的问题。

- [PR #10903](https://github.com/zeroclaw-labs/zeroclaw/pull/10903)  
  **fix(multimodal): keep tool-result images live for the current user turn**  
  修复同一用户 turn 内工具结果图片生命周期过短的问题，改善多工具链路中的图片可见性。

### Windows 服务与任务可靠性

- [PR #10931](https://github.com/zeroclaw-labs/zeroclaw/pull/10931)  
  **fix(service): bound Windows task stdout and stderr logs**  
  将 Windows 计划任务 stdout/stderr 接入已有 bounded service-log writer，避免日志无限增长，属于高风险但重要的服务稳定性修复。

- [PR #10928](https://github.com/zeroclaw-labs/zeroclaw/pull/10928)  
  **fix(runtime): recognize exited Windows task owners**  
  修复 Windows 任务 owner 识别中已退出进程被误判为存活的问题。

### CI 与项目维护

- [PR #10934](https://github.com/zeroclaw-labs/zeroclaw/pull/10934)  
  **ci(runners): move the housekeeping jobs to Blacksmith**  
  将 16 个 Quality Gate housekeeping jobs 迁移到 Blacksmith，目标是提升 CI 资源调度和维护效率。

- [PR #10915](https://github.com/zeroclaw-labs/zeroclaw/pull/10915)  
  **chore(codeowners): add Jordan to maintainer process docs**  
  更新 CODEOWNERS，扩展维护者流程文档的 Review 责任人。

---

## 4. 社区热点

今日 Issues/PR 的评论和反应整体偏低，大多数条目评论数为 0，少数为 1；没有出现高赞或高评论的集中讨论。但从主题密度看，有几个方向明显成为社区关注热点。

### 4.1 Human-in-the-loop 与消息可靠性架构

- [Issue #10930](https://github.com/zeroclaw-labs/zeroclaw/issues/10930)  
  **RFC: One durable primitive for questions an agent asks a human**  
  评论数：1  
  诉求：将 SOP approval gate 中已有的“Agent 向人类提问并持久等待回答”的能力抽象为通用 durable primitive。  
  分析：这是 Agent 产品成熟度的重要信号。用户/开发者希望 ZeroClaw 不仅能发消息，还能可靠地等待人类反馈，并跨重启、跨进程保持状态。

- [Issue #10929](https://github.com/zeroclaw-labs/zeroclaw/issues/10929)  
  **RFC: Delivery receipts for outbound messages**  
  评论数：1  
  诉求：为 outbound message 引入标识与 delivery receipt，判断消息是否真正送达。  
  分析：这与 #10930 构成一组可靠交互能力：一边是“问题持久等待”，另一边是“消息发送可追踪”。这说明 ZeroClaw 正从工具型 Agent 向生产级个人助手基础设施演进。

### 4.2 Mattermost 新 DM 首条消息丢失

- [Issue #10901](https://github.com/zeroclaw-labs/zeroclaw/issues/10901)  
  **Mattermost drops the first message in newly auto-discovered DMs**  
  评论数：1  
  严重性：S1 - workflow blocked  
  分析：这是今日最严重的用户可见问题。新建一对一 DM 的首条消息可能被静默跳过，会直接破坏用户对 Agent 的信任，尤其是在工作流、审批、告警和私聊入口场景中影响较大。

### 4.3 语音链路成为集中反馈区

相关 Issues：

- [Issue #10900](https://github.com/zeroclaw-labs/zeroclaw/issues/10900)  
  **transcription provider cascade**  
- [Issue #10933](https://github.com/zeroclaw-labs/zeroclaw/issues/10933)  
  **Add MiniMax TTS and STT provider families**  
- [Issue #10932](https://github.com/zeroclaw-labs/zeroclaw/issues/10932)  
  **Surface the voice-note transcript to the user**  
- [Issue #10927](https://github.com/zeroclaw-labs/zeroclaw/issues/10927)  
  **Telegram voice preferences match destination chats instead of sender identities**  
- [Issue #10925](https://github.com/zeroclaw-labs/zeroclaw/issues/10925)  
  **Support input-driven mirror voice replies on Matrix**  
- [Issue #10924](https://github.com/zeroclaw-labs/zeroclaw/issues/10924)  
  **Runtime-command replies enter conversational voice routing**  
- [Issue #10922](https://github.com/zeroclaw-labs/zeroclaw/issues/10922)  
  **WhatsApp Web ignores suppress_voice when queueing automatic TTS**

分析：语音交互正在成为 ZeroClaw 的高频使用场景，但当前暴露出三类问题：  
1. STT 失败缺少 fallback；  
2. 语音转写结果对用户不可见，错误难以纠正；  
3. 多渠道 voice routing 与 suppress_voice 语义不一致。  

---

## 5. Bug 与稳定性

以下按严重程度和影响范围排序。

### S1 / P1：工作流阻断

#### Mattermost 新自动发现 DM 首条消息可能被跳过

- Issue：[ #10901](https://github.com/zeroclaw-labs/zeroclaw/issues/10901)  
- 标签：`bug`, `channel`, `priority:p1`, `channel:mattermost`, `risk:medium`  
- 状态：Open  
- 已有关联 fix PR：暂无明确对应 PR  
- 影响：新建一对一 DM 的首条消息可能静默丢失，属于高信任损伤问题。  
- 建议优先级：最高。建议维护者尽快确认 REST polling 与 DM auto-discovery 的边界条件。

---

### S2：功能降级 / 用户体验明显受损

#### Telegram 语音偏好错误匹配 destination chat 而非 sender identity

- Issue：[ #10927](https://github.com/zeroclaw-labs/zeroclaw/issues/10927)  
- 状态：Open  
- 已有关联 fix PR：暂无明确对应 PR  
- 影响：可能导致语音回复策略应用到错误对象，影响个人/群组语音体验。

#### Matrix send_via 将 peer user identity 当作 room destination

- Issue：[ #10926](https://github.com/zeroclaw-labs/zeroclaw/issues/10926)  
- 状态：Open  
- 已有关联 fix PR：暂无明确对应 PR  
- 影响：Matrix 发送目标解析错误，可能导致消息投递失败或发往错误目的地。

#### Runtime command 回复进入 conversational voice routing

- Issue：[ #10924](https://github.com/zeroclaw-labs/zeroclaw/issues/10924)  
- 状态：Open  
- 已有关联 fix PR：暂无明确对应 PR  
- 影响：例如 `/stop` 等运行时命令确认消息可能被错误转成语音，破坏命令语义和用户预期。

#### WhatsApp Web 忽略 suppress_voice 自动排队 TTS

- Issue：[ #10922](https://github.com/zeroclaw-labs/zeroclaw/issues/10922)  
- 状态：Open  
- 已有关联 fix PR：暂无明确对应 PR  
- 影响：用户或系统明确要求 suppress voice 时仍触发语音回复，属于跨渠道行为一致性问题。

#### Qdrant 时间范围向量召回可能遗漏合格结果

- Issue：[ #10921](https://github.com/zeroclaw-labs/zeroclaw/issues/10921)  
- 状态：Open  
- 已有关联 fix PR：暂无明确对应 PR  
- 影响：记忆召回在 `since` / `until` 条件下可能漏掉符合条件的结果，影响 Agent 长期记忆准确性。

#### A2A 与 HTTP tool tests 使用不同锁保护全局代理状态

- Issue：[ #10919](https://github.com/zeroclaw-labs/zeroclaw/issues/10919)  
- 状态：Open  
- 已有关联 fix PR：暂无明确对应 PR  
- 影响：测试环境可能出现 flakiness，降低 CI 信号可信度。

#### Streaming text guard 误抑制普通回复

- Issue：[ #10912](https://github.com/zeroclaw-labs/zeroclaw/issues/10912)  
- 状态：Open  
- 已有 fix PR：[ #10935](https://github.com/zeroclaw-labs/zeroclaw/pull/10935)  
- 影响：普通 prose 中只要引用形似工具结果的对象，就可能触发协议守卫，导致完整回复被吞掉。  
- 评估：已有明确修复方向，是今日最值得优先 Review 的运行时修复之一。

#### Tool-result 文本中的图片标记被无来源地提升为附件

- Issue：[ #10908](https://github.com/zeroclaw-labs/zeroclaw/issues/10908)  
- 状态：Open  
- 相关 PR：[ #10903](https://github.com/zeroclaw-labs/zeroclaw/pull/10903)、[ #10904](https://github.com/zeroclaw-labs/zeroclaw/pull/10904)  
- 影响：工具输出中的日志、源码或文本可能被错误解释为图片附件，导致内容被剥离或误附加。  
- 说明：现有 PR 与多模态图片处理相关，但是否完整覆盖该 Issue 仍需维护者确认。

#### Sandbox discovery 忽略 TUI PATH

- Issue：[ #10923](https://github.com/zeroclaw-labs/zeroclaw/issues/10923)  
- 状态：Open  
- 已有关联 fix PR：暂无明确对应 PR  
- 影响：launcher 已尊重 child PATH，但 sandbox discovery 未同步，可能导致 TUI 场景下 shell/工具解析不一致。

---

### S3：轻微问题

#### 空 trailing chunk 将 exact-fit HTTP response 错标为 truncated

- Issue：[ #10918](https://github.com/zeroclaw-labs/zeroclaw/issues/10918)  
- 状态：Open  
- 已有关联 fix PR：暂无明确对应 PR  
- 影响：HTTP decode 边界条件错误，可能造成误报截断，但严重性较低。

---

## 6. 功能请求与路线图信号

今日新增的功能/RFC 显示 ZeroClaw 未来路线可能集中在以下方向。

### 6.1 可靠的人机协作原语

- [Issue #10930](https://github.com/zeroclaw-labs/zeroclaw/issues/10930)  
  **One durable primitive for questions an agent asks a human**  
  路线图信号：强。  
  该 RFC 建议复用 SOP approval gate 的 durable run/event 存储能力，将“Agent 提问并等待人类回答”上升为通用能力。若采纳，将增强审批、人工确认、澄清问题、长任务中断恢复等场景。

- [Issue #10929](https://github.com/zeroclaw-labs/zeroclaw/issues/10929)  
  **Delivery receipts for outbound messages**  
  路线图信号：强。  
  与 durable question primitive 互补，表明项目需要面向生产环境提供可审计、可追踪的消息发送语义。

### 6.2 语音与转写能力增强

- [Issue #10900](https://github.com/zeroclaw-labs/zeroclaw/issues/10900)  
  **Transcription provider cascade**  
  路线图信号：中高。  
  提议在主 STT endpoint 失败时按顺序 fallback 到备用 provider，适合提升语音入口可靠性。

- [Issue #10933](https://github.com/zeroclaw-labs/zeroclaw/issues/10933)  
  **Add MiniMax TTS and STT provider families**  
  路线图信号：中。  
  MiniMax 已在 model provider 中存在基础支持，新增 TTS/STT provider family 具备较清晰的扩展路径。

- [Issue #10932](https://github.com/zeroclaw-labs/zeroclaw/issues/10932)  
  **Surface the voice-note transcript to the user**  
  路线图信号：中高。  
  将语音转写内容回显给用户，可显著提升透明度和可纠错性，是语音交互产品化的重要体验改进。

- [Issue #10925](https://github.com/zeroclaw-labs/zeroclaw/issues/10925)  
  **Support input-driven mirror voice replies on Matrix**  
  路线图信号：中。  
  与 Telegram、WhatsApp 等渠道语音行为趋同，有助于统一多渠道体验。

### 6.3 ZeroCode 编辑器体验

- [Issue #10909](https://github.com/zeroclaw-labs/zeroclaw/issues/10909)  
  **Standard text editing in the ZeroCode composer**  
  路线图信号：中。  
  用户要求标准 undo/redo、键盘选择、select-all、cut 等编辑能力，说明 ZeroCode composer 已被用于较长文本和更复杂交互，不再只是轻量输入框。

### 6.4 配置热更新与上下文管理

- [PR #10911](https://github.com/zeroclaw-labs/zeroclaw/pull/10911)  
  **feat(config): publish atomic live revisions**  
  路线图信号：强。  
  大范围改动显示 live config 正成为核心能力。

- [PR #10905](https://github.com/zeroclaw-labs/zeroclaw/pull/10905)  
  **feat(zerocode): add manual recoverable context compaction**  
  路线图信号：强。  
  手动、可恢复的上下文压缩能力对长会话 Agent 很关键，尤其适合 ZeroCode/ACP 场景。

---

## 7. 用户反馈摘要

从今日 Issues 可以提炼出以下真实用户痛点：

1. **用户不接受“静默失败”**  
   Mattermost 首条 DM 丢失、STT 失败后语音输入静默死亡、delivery receipt 缺失，都指向同一个问题：用户需要知道消息是否送达、语音是否识别、Agent 是否真的收到输入。

2. **语音体验需要透明和可控**  
   用户希望看到 voice note transcript，以便发现 STT 错误；同时希望 `suppress_voice`、voice peer preference、mirror modality 在不同渠道行为一致。

3. **多渠道身份模型仍需打磨**  
   Telegram、Matrix、WhatsApp、Mattermost 都出现与身份、目标、路由相关的问题。说明 ZeroClaw 的 channel abstraction 正承受真实多平台差异带来的压力。

4. **Agent 运行时需要更少误判**  
   流式守卫误判普通文本、工具结果图片标记被错误提升、fallback parser 改写字符串参数，这些问题会让用户感觉 Agent “莫名其妙失败”或“擅自修改内容”。

5. **开发者与维护者重视 CI/测试可靠性**  
   A2A/HTTP tests 全局代理锁、daemon lifecycle 测试日志广播、CI runner 迁移等条目说明项目正在修复测试层面的非确定性，以提高合并信心。

---

## 8. 待处理积压

基于今日提供的数据，无法判断“长期未响应”的 Issue 或 PR，因为所有条目均为 2026-09-16 至 2026-09-17 创建或更新。不过从当前打开状态看，以下项目建议维护者优先排队处理：

### 高优先级待 Review / 待修复

1. [Issue #10901](https://github.com/zeroclaw-labs/zeroclaw/issues/10901)  
   Mattermost 新 DM 首条消息丢失，S1/P1，暂无明确 fix PR。

2. [PR #10935](https://github.com/zeroclaw-labs/zeroclaw/pull/10935)  
   修复 streaming text guard 误抑制回复，对应 [Issue #10912](https://github.com/zeroclaw-labs/zeroclaw/issues/10912)，建议优先 Review。

3. [PR #10911](https://github.com/zeroclaw-labs/zeroclaw/pull/10911)  
   原子 live config revision，大型高风险 PR，影响面广，需要尽早拆分 Review 关注点或安排维护者专项审查。

4. [PR #10931](https://github.com/zeroclaw-labs/zeroclaw/pull/10931)  
   Windows task stdout/stderr bounded logging，高风险服务稳定性修复，建议关注安全与回归测试。

5. [Issue #10929](https://github.com/zeroclaw-labs/zeroclaw/issues/10929) 与 [Issue #10930](https://github.com/zeroclaw-labs/zeroclaw/issues/10930)  
   两个 RFC 构成可靠人机交互基础设施方向，建议维护者尽快给出架构反馈，避免后续功能各自实现重复机制。

### 语音/渠道一致性积压

- [Issue #10927](https://github.com/zeroclaw-labs/zeroclaw/issues/10927) Telegram voice preference identity mismatch  
- [Issue #10926](https://github.com/zeroclaw-labs/zeroclaw/issues/10926) Matrix send_via destination mismatch  
- [Issue #10924](https://github.com/zeroclaw-labs/zeroclaw/issues/10924) Runtime command voice routing  
- [Issue #10922](https://github.com/zeroclaw-labs/zeroclaw/issues/10922) WhatsApp Web ignores suppress_voice  
- [Issue #10925](https://github.com/zeroclaw-labs/zeroclaw/issues/10925) Matrix mirror voice replies  

这些问题建议作为一个“cross-channel voice routing consistency”主题集中处理，而不是逐渠道零散修复。

---

## 总体健康度评估

ZeroClaw 今日表现出很强的开发活跃度和问题发现能力，但合并吞吐为 0，说明当前主要瓶颈在 Review 与集成阶段。短期健康风险集中在 **渠道消息可靠性、语音路由一致性、运行时误判、多模态工具结果处理**。如果维护者能优先合并低风险确定性修复，并对高风险架构 PR/RFC 给出明确方向，项目下一版本有望在生产可用性和 Agent 交互可靠性上取得明显提升。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*