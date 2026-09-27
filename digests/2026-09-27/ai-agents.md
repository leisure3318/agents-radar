# OpenClaw 生态日报 2026-09-27

> Issues: 9 | PRs: 62 | 覆盖项目: 13 个 | 生成时间: 2026-09-27 04:14 UTC

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

# OpenClaw 项目动态日报｜2026-09-27

## 1. 今日速览

过去 24 小时，OpenClaw 维持了**非常高的开发活跃度**：Issues 更新 9 条，其中 8 条仍处于开放状态；Pull Requests 更新 62 条，其中 56 条仍待合并，说明维护队列明显偏重在评审与验证阶段。  
今日没有新版本发布，主线工作集中在 **Gateway 稳定性、Control UI 体验、插件/工具运行时、Worker 推理架构、跨平台启动与更新可靠性**。  
风险面上，多个 P1/P2 问题涉及 **会话状态、认证提供方、消息丢失、Windows/macOS 平台行为、插件捕获、模型可用性判断**，短期内需要维护者优先处理。  
整体看，项目健康度偏高：问题响应快、修复 PR 跟进及时，但待合并 PR 数量较大，存在 CI、证明材料、兼容性与安全边界评审压力。

---

## 2. 项目进展

今日无新版本发布；以下为过去 24 小时内已关闭或进入关键推进阶段的 PR / Issue。

### 已关闭 / 已完成的重要 PR

#### 1. 修复进程归属测试 flaky 问题  
- PR：[#159061](https://github.com/openclaw/openclaw/pull/159061)  
- 状态：Closed  
- 作者：BotanicaWorld  
- 关联问题：修复 #158997  
- 影响范围：测试稳定性、进程管理测试  
- 摘要：该 PR 修正了 `exec-spawn.test.ts` 中对进程组消亡时机的错误假设，从“仅等待 PID 不再存活”改为“等待实际进程组不可达”。  
- 项目推进意义：降低 CI 偶发失败概率，有助于提升维护者对主线测试结果的信任度。

#### 2. 插件清理迁移策略性能优化  
- PR：[#159338](https://github.com/openclaw/openclaw/pull/159338)  
- 状态：Closed  
- 作者：steipete  
- 影响范围：插件替换、SQLite 读取、清理迁移策略  
- 摘要：避免在插件替换后的 source-cleanup 策略检查中反复在调用线程读取 SQLite 延迟迁移记录，改为利用已有 lease 下的 worker 预处理。  
- 项目推进意义：减少插件清理路径中的同步数据库读取，改善性能与主线程负载。

### 今日进入重点推进的开放 PR

#### 3. Worker 原生推理三段式架构推进  
- PR：[#158901](https://github.com/openclaw/openclaw/pull/158901)、[#158902](https://github.com/openclaw/openclaw/pull/158902)、[#158903](https://github.com/openclaw/openclaw/pull/158903)  
- 状态：Open  
- 影响范围：Gateway、Web UI、Agents、Worker placement、模型推理  
- 摘要：三段式 PR 栈推进“配对 Worker 上运行原生推理”的能力，包括运行时、UI 可用性判断、会话强制 Worker placement。  
- 风险标签：compatibility、security-boundary、auth-provider、session-state  
- 项目推进意义：这是近期最明显的路线图信号之一，表明 OpenClaw 正在向更清晰的本地/远程 Worker 推理部署模式演进。

#### 4. Agent 查询在线人员和设备活动  
- PR：[#159117](https://github.com/openclaw/openclaw/pull/159117)  
- 状态：Open  
- 影响范围：Android、Web UI、Gateway、Agents、workboard、geolocation  
- 摘要：新增 `presence` 能力，使 Agent 能够回答“谁在线”“最近由哪个设备产生了活动”等问题。  
- 项目推进意义：增强个人 AI 助手的上下文感知能力，是明显的产品能力扩展。

#### 5. Control UI 长聊天滚动性能优化  
- PR：[#159400](https://github.com/openclaw/openclaw/pull/159400)  
- 状态：Open  
- 影响范围：Web UI、聊天体验  
- 摘要：修复长会话滚动时仍然掉帧的问题，原因是每次滚动都会重新渲染整个 chat pane 并重建 transcript 结构。  
- 项目推进意义：改善高频真实使用场景，尤其是长对话用户体验。

---

## 3. 社区热点

### 1. Gateway 重启后 claude-cli 模型被错误标记为不可用  
- Issue：[#158922](https://github.com/openclaw/openclaw/issues/158922)  
- 状态：Open  
- 评论数：4  
- 严重度：P2  
- 标签：`impact:auth-provider`、`impact:ux-friction`、`issue-rating: 🦞 diamond lobster`  
- 摘要：在 main 分支 Gateway 重启后，`models.list` 将所有 `claude-cli/*` 模型返回为 `available: false`，导致 Control UI 隐藏 Effort picker；但 claude-cli 实际运行正常。  
- 社区诉求：用户希望模型可用性检测与实际运行状态一致，避免 UI 错误隐藏能力。该问题带有明显回归属性，且影响认证/模型提供方路径。

### 2. llama.cpp embedding 子进程失败但 manager 仍报告 ready  
- Issue：[#159356](https://github.com/openclaw/openclaw/issues/159356)  
- 状态：Open  
- 评论数：4  
- 严重度：P2  
- 标签：`impact:other`、`issue-rating: 🐚 platinum hermit`  
- 摘要：OpenClaw 2026.9.6 中，本地 llama.cpp embedding manager 在 embedding 子进程失败且未加载时仍报告 ready，随后 semantic-memory 请求超时并返回 HTTP 500。  
- 社区诉求：用户需要更准确的健康检查与失败状态传播，避免“看似 ready，实际不可用”的本地模型/embedding 体验。

### 3. 并发首次发送到空共享会话被误判为 branch change  
- Issue：[#159330](https://github.com/openclaw/openclaw/issues/159330)  
- 状态：Open  
- 评论数：2  
- 严重度：P2  
- 标签：`impact:session-state`、`impact:ux-friction`、`maturity:stable`、`clawsweeper:linked-pr-open`  
- 摘要：30 个客户端并发向空共享 Control UI conversation 首次发送消息时，23 条被拒绝为 branch change，只有 7 条成功。  
- 社区诉求：多人/并发协作场景需要更可靠的首条消息提交语义，尤其是共享会话初始化阶段。  
- 修复状态：已有关联开放 PR，但具体 PR 编号未在数据中给出。

### 4. macOS / Bun 插件捕获在大于 128 KiB 的 `/dev/fd` 拷贝上失败  
- Issue：[#159313](https://github.com/openclaw/openclaw/issues/159313)  
- PR：[#159403](https://github.com/openclaw/openclaw/pull/159403)  
- 状态：Issue Open，Fix PR Open  
- 评论数：2  
- 摘要：Bun 1.4.2 + macOS arm64 下，插件捕获对有效 `/dev/fd` 源在超过约 128 KiB 时传播 `EBADF`。  
- 社区诉求：希望插件依赖捕获在 Bun/macOS 上与 Node 路径保持一致，不因文件大小触发平台特定失败。  
- 修复状态：已有明确修复 PR，进展较好。

### 5. 浏览器 CDP 凭据化 WebSocket URL 暴露给模型侧结果  
- Issue：[#158966](https://github.com/openclaw/openclaw/issues/158966)  
- 状态：Open  
- 评论数：2  
- 摘要：带 HTTP Basic 凭据或 query token 的 loopback CDP endpoint 会将派生的 credentialed WebSocket URL 暴露到模型可见的 tab/open results。  
- 社区诉求：模型执行 tab 操作只需要 targetId，不应获得连接凭据。  
- 风险判断：这是明显的安全边界问题，应优先安排安全评审。

---

## 4. Bug 与稳定性

以下按严重程度与影响面排序。

### P1 / 高优先级

#### 1. Model fallback 在 runtime-context 注入后拒绝当前 keyed user  
- Issue：[#158759](https://github.com/openclaw/openclaw/issues/158759)  
- 状态：Open  
- 标签：`P1`、`impact:session-state`、`impact:message-loss`、`impact:auth-provider`  
- 摘要：OpenClaw 2026.9.6 中，模型 fallback 可能在未联系 fallback provider 前本地失败。主尝试持久化 keyed user message，并追加 `openclaw.runtime-context` custom_message 后，fallback 拒绝当前 keyed user。  
- 用户影响：可能造成消息发送失败、fallback 不生效、会话状态混乱。  
- Fix PR：未见明确关联 PR。  
- 建议优先级：最高。该问题同时涉及消息丢失、会话状态和认证提供方。

#### 2. Doctor legacy capture cleanup 被无关 macOS 进程阻塞  
- Issue：[#159112](https://github.com/openclaw/openclaw/issues/159112)  
- 状态：Closed  
- 标签：`P1`、`needs-maintainer-review`、`needs-security-review`、`maturity:stable`  
- 摘要：macOS 上，Doctor repair 在遇到其他账户下不可读取 argv 的无关进程时，会跳过 legacy plugin capture cleanup。  
- 用户影响：Doctor 修复路径可能被第三方 daemon 阻断。  
- 当前状态：Issue 已关闭，但从标签看曾需要产品和安全评审，建议确认关闭原因与修复落地情况。

#### 3. Crabbox 云分发在 coordinator read 需要重试时失败  
- PR：[#159399](https://github.com/openclaw/openclaw/pull/159399)  
- 状态：Open  
- 标签：`P1`、`extensions: crabbox`  
- 摘要：Crabbox coordinator 首次 lease-inspection read 响应慢时，云 session dispatch 会在机器已 provision 后失败，并可能留下运行中的机器。  
- 用户影响：云会话失败、资源泄漏、成本或运维风险。  
- Fix PR：已有开放 PR。

#### 4. Windows Gateway 重启遭遇 SQLite sharing errors  
- PR：[#159347](https://github.com/openclaw/openclaw/pull/159347)  
- 状态：Open  
- 标签：`P1`、`merge-risk: availability`  
- 关联：Closes #159222  
- 摘要：Windows Scheduled Task Gateway stop/restart 在强制终止后可能遇到 `SQLITE_IOERR_TRUNCATE`，导致请求的 restart 离线。  
- 用户影响：Windows 原生部署的可用性问题。  
- Fix PR：已有开放 PR，但状态为 waiting on author。

---

### P2 / 中高优先级

#### 5. claude-cli 模型可用性回归  
- Issue：[#158922](https://github.com/openclaw/openclaw/issues/158922)  
- 状态：Open  
- 严重度：P2  
- 影响：模型选择 UI、auth-provider、UX  
- Fix PR：未见明确关联 PR。

#### 6. llama.cpp embedding ready 状态不准确  
- Issue：[#159356](https://github.com/openclaw/openclaw/issues/159356)  
- 状态：Open  
- 严重度：P2  
- 影响：本地 embedding、semantic memory、HTTP 500  
- Fix PR：未见明确关联 PR。

#### 7. 并发首次发送被误判为 branch change  
- Issue：[#159330](https://github.com/openclaw/openclaw/issues/159330)  
- 状态：Open  
- 严重度：P2  
- 影响：共享会话、并发发送、Control UI  
- Fix PR：已有 linked-pr-open 标签，但具体 PR 未在数据中列出。

#### 8. Gateway 启动时 lease heartbeat worker 慢启动导致失败  
- PR：[#159405](https://github.com/openclaw/openclaw/pull/159405)  
- 状态：Open  
- 摘要：繁忙或慢速主机上，Gateway 可能因 lease heartbeat worker 未在 5 秒内 ready 而拒绝启动。  
- 用户影响：启动可靠性下降。  
- Fix PR：已有开放 PR。

#### 9. 更新失败：plugin-target-unavailable  
- Issue：[#159407](https://github.com/openclaw/openclaw/issues/159407)  
- 状态：Open  
- 环境：OpenClaw 2026.9.4，darwin/arm64，Node 24.19.0  
- 摘要：用户提交了经 OpenClaw 确认的更新失败报告，目标版本更新过程中出现 `plugin-target-unavailable`。  
- Fix PR：未见明确关联 PR。  
- 相关 PR：[#159392](https://github.com/openclaw/openclaw/pull/159392) 优化 npm target metadata 复用，但是否覆盖该问题尚不明确。

#### 10. Windows Gateway 冷启动出现 103 秒 event-loop stall  
- Issue：[#159336](https://github.com/openclaw/openclaw/issues/159336)  
- 状态：Open  
- 环境：OpenClaw 2026.9.6，native Windows Gateway  
- 摘要：一次冷启动耗时 204,663 ms，其中包含 103,549 ms event-loop delay。  
- Fix PR：未见明确关联 PR。  
- 风险：目前复现信息不足，但对 Windows 原生体验影响较大。

---

### 平台 / 插件兼容性问题

#### 11. Bun/macOS 插件捕获 EBADF  
- Issue：[#159313](https://github.com/openclaw/openclaw/issues/159313)  
- PR：[#159403](https://github.com/openclaw/openclaw/pull/159403)  
- 状态：Issue Open，Fix PR Open  
- 影响：Bun/macOS、插件依赖捕获  
- 进展：已有明确修复，建议优先评审合入。

#### 12. Code Mode Tool Search 在 Bun 无 Node 环境下消失  
- PR：[#159398](https://github.com/openclaw/openclaw/pull/159398)  
- 状态：Open  
- 标签：`plugin: code-mode-quickjs`  
- 摘要：`tool_search_code` 在 Gateway 运行于 Bun 且未安装 Node 时会静默消失。  
- 用户影响：Bun-only 主机上 Code Mode 能力不完整。  
- 修复方向：让 `tools.toolSearch: true` 或 `mode: "code"` 在 Node/Bun 环境中更一致。

---

## 5. 功能请求与路线图信号

### 1. Worker-based 原生推理部署正在成型  
- PR：[#158901](https://github.com/openclaw/openclaw/pull/158901)、[#158902](https://github.com/openclaw/openclaw/pull/158902)、[#158903](https://github.com/openclaw/openclaw/pull/158903)  
- 判断：高概率进入后续版本，但需要经过安全边界、兼容性和会话状态评审。  
- 路线图信号：OpenClaw 正在把模型运行从单一 Gateway 本地模型循环扩展到“配对 Worker / 配置化 placement / 无本地 provider key 的默认 worker flow”。

### 2. Agent Presence：查询在线人员与设备活动  
- PR：[#159117](https://github.com/openclaw/openclaw/pull/159117)  
- 判断：具备明确用户价值，可能成为下一阶段个人 AI 助手体验的重要能力。  
- 路线图信号：Agent 不再只处理消息和工具调用，而是开始理解“人、设备、在线状态、活动来源”等现实上下文。

### 3. macOS Gateway browser sign-in 自动续期  
- PR：[#159381](https://github.com/openclaw/openclaw/pull/159381)  
- 状态：Open  
- 摘要：解决 Cloudflare Access 默认 24 小时 session 过期后，Mac app 被迫登出的问题。  
- 路线图信号：OpenClaw 正在加强企业/远程 Gateway 场景下的登录连续性。

### 4. PR-only CI repair agent  
- PR：[#159402](https://github.com/openclaw/openclaw/pull/159402)  
- 状态：Open  
- 摘要：增加仅面向 PR 的 CI 修复 agent，避免过去直接向 main 推送修复导致风险的问题。  
- 路线图信号：维护团队在探索更安全的自动化维护方式，但会重点关注权限边界、覆盖门槛和自动化风险。

### 5. Control UI 加载与长会话性能持续优化  
- PR：[#159408](https://github.com/openclaw/openclaw/pull/159408)、[#159400](https://github.com/openclaw/openclaw/pull/159400)  
- 判断：很可能进入近期版本，因为风险较低且用户体验收益直接。  
- 方向：更早发起历史请求、减少长会话滚动时的重渲染。

### 6. iOS 首条消息发送可靠性  
- PR：[#159404](https://github.com/openclaw/openclaw/pull/159404)  
- 状态：Open  
- 摘要：修复 iOS 在 agent discovery 期间发送第一条 chat message 时，消息留在草稿或消失的问题。  
- 路线图信号：移动端正在补齐核心聊天可靠性，特别是首次发送与默认 agent 发现流程。

---

## 6. 用户反馈摘要

### 主要痛点一：系统“看起来可用”，但实际请求失败  
代表问题：  
- llama.cpp manager ready 状态错误：[#159356](https://github.com/openclaw/openclaw/issues/159356)  
- claude-cli 模型被错误标记 unavailable：[#158922](https://github.com/openclaw/openclaw/issues/158922)  

用户反馈显示，OpenClaw 在模型可用性、embedding 子进程健康检查、UI 可用性展示之间仍存在一致性问题。用户最不满意的是：底层能力实际上可运行或已经失败，但 UI / manager 暴露的状态与真实状态不一致。

### 主要痛点二：会话状态与消息发送可靠性仍是高风险区域  
代表问题：  
- Model fallback 拒绝 keyed user：[#158759](https://github.com/openclaw/openclaw/issues/158759)  
- 并发首次发送被误判 branch change：[#159330](https://github.com/openclaw/openclaw/issues/159330)  
- iOS 首条消息发送丢失/停留草稿：[#159404](https://github.com/openclaw/openclaw/pull/159404)  

这些问题共同指向：用户希望“发送消息”这一核心路径绝对可靠，尤其在 fallback、并发、移动端 agent discovery 等复杂状态切换场景下不能出现消息丢失或错误拒绝。

### 主要痛点三：跨平台运行时差异影响插件和工具体验  
代表问题：  
- Bun/macOS 插件捕获 EBADF：[#159313](https://github.com/openclaw/openclaw/issues/159313)、[#159403](https://github.com/openclaw/openclaw/pull/159403)  
- Tool Search Code Mode 在 Bun 无 Node 时消失：[#159398](https://github.com/openclaw/openclaw/pull/159398)  
- Windows Gateway event-loop stall：[#159336](https://github.com/openclaw/openclaw/issues/159336)  

用户场景正在覆盖 Node、Bun、macOS、Windows、iOS 等多端多运行时组合。反馈表明，OpenClaw 需要继续减少“某个平台/运行时才出现”的边缘失败。

### 主要痛点四：安全边界需要更严格默认值  
代表问题：  
- CDP credentialed WebSocket URL 暴露：[#158966](https://github.com/openclaw/openclaw/issues/158966)  

用户明确指出：模型执行浏览器 tab action 不需要拿到连接凭据。该反馈说明社区对“模型可见上下文中不应包含敏感凭据”的安全预期较高。

---

## 7. 待处理积压

> 注：本日报仅基于过去 24 小时数据，无法完整判断“长期未响应”。以下列出当前仍开放、影响面较大、或标签显示需要维护者关注的事项。

### 需要维护者优先决策 / 评审

1. **Model fallback keyed user 拒绝问题**  
   - Issue：[#158759](https://github.com/openclaw/openclaw/issues/158759)  
   - 原因：P1，涉及 session-state、message-loss、auth-provider，且未见明确 fix PR。

2. **CDP 凭据泄露到模型可见结果**  
   - Issue：[#158966](https://github.com/openclaw/openclaw/issues/158966)  
   - 原因：安全边界问题，建议安全评审优先介入。

3. **llama.cpp embedding manager ready 状态错误**  
   - Issue：[#159356](https://github.com/openclaw/openclaw/issues/159356)  
   - 原因：影响 semantic memory，本地模型用户会遇到 HTTP 500 与超时。

4. **claude-cli 模型可用性回归**  
   - Issue：[#158922](https://github.com/openclaw/openclaw/issues/158922)  
   - 原因：回归问题，影响 Control UI 模型能力展示。

5. **Windows Gateway event-loop stall**  
   - Issue：[#159336](https://github.com/openclaw/openclaw/issues/159336)  
   - 原因：复现信息不足但影响严重，建议补充诊断信息和采样日志。

### 需要尽快评审合入的修复 PR

1. **Bun/macOS 插件捕获修复**  
   - PR：[#159403](https://github.com/openclaw/openclaw/pull/159403)  
   - 对应 Issue：[#159313](https://github.com/openclaw/openclaw/issues/159313)

2. **Gateway lease heartbeat 慢启动修复**  
   - PR：[#159405](https://github.com/openclaw/openclaw/pull/159405)

3. **Crabbox cloud dispatch retry 修复**  
   - PR：[#159399](https://github.com/openclaw/openclaw/pull/159399)

4. **Windows Gateway SQLite sharing errors 恢复修复**  
   - PR：[#159347](https://github.com/openclaw/openclaw/pull/159347)

5. **iOS 首条消息发送保护**  
   - PR：[#159404](https://github.com/openclaw/openclaw/pull/159404)

### 评审压力较大的大型 PR 栈

1. **Worker 原生推理架构栈**  
   - PR：[#158901](https://github.com/openclaw/openclaw/pull/158901)、[#158902](https://github.com/openclaw/openclaw/pull/158902)、[#158903](https://github.com/openclaw/openclaw/pull/158903)  
   - 风险：compatibility、security-boundary、auth-provider、session-state  
   - 建议：按依赖顺序分层评审，先锁定运行时契约，再评估 UI availability 与 required placement。

2. **ACP metadata off Gateway thread**  
   - PR：[#159084](https://github.com/openclaw/openclaw/pull/159084)  
   - 风险：message-delivery、security-boundary、compatibility  
   - 建议：需要更强 proof，尤其是 authority 与 stored-session identity 的跨异步边界保持。

3. **Native Worker / Presence / CI automation 等 XL PR**  
   - PR：[#159117](https://github.com/openclaw/openclaw/pull/159117)、[#159402](https://github.com/openclaw/openclaw/pull/159402)、[#159409](https://github.com/openclaw/openclaw/pull/159409)  
   - 建议：大型 PR 数量较多，维护者应优先区分“用户可见修复”和“结构性重构”，避免修复队列被重构队列阻塞。

---

## 今日结论

OpenClaw 今日表现出高强度开发节奏，尤其在 Gateway、Worker、Control UI、插件运行时和跨平台可靠性方面推进明显。与此同时，开放 PR 积压较重，且多个 P1/P2 问题集中在消息可靠性、会话状态、模型可用性和安全边界上。短期维护重点建议放在：**P1 消息/会话问题、CDP 凭据暴露、Gateway 启动/重启可靠性、Bun/macOS 插件兼容修复**，同时控制大型架构 PR 的合入节奏。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
日期：2026-09-27

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现明显的“两极分化”：OpenClaw、Hermes Agent、ZeroClaw、NanoClaw 等头部或高活跃项目保持高强度迭代，而 PicoClaw、IronClaw、Moltis、TinyClaw、ZeptoClaw 等项目活动较低。  
技术重点从单纯“能调用模型和工具”转向更复杂的 **会话可靠性、跨平台部署、通道集成、权限安全、运行时架构重构、可观测性与自动化运维**。  
用户反馈集中暴露出一个共同问题：AI 助手一旦进入长期运行、多端接入、多工具调用和企业环境，最核心的竞争力不再只是模型能力，而是 **稳定、可控、可审计、可恢复**。  
OpenClaw、Hermes Agent、ZeroClaw 代表了当前生态中最活跃的系统级 agent 平台方向；NanoBot、NanoClaw 更偏渠道与技能生态扩展；LobsterAI 则明显向桌面生产力和文档编辑体验演进。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日主线 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 9 | 62 | 无 | Gateway、Worker 推理、Control UI、插件运行时、跨平台可靠性 | **高活跃，高健康度，但 PR 积压和 P1/P2 风险较重** |
| **Hermes Agent** | 50 | 50 | 无 | install/update、session state、message delivery、desktop、CLI | **极高活跃，高风险修复期，稳定性压力大** |
| **ZeroClaw** | 6 | 49 | 无 | RPC/gateway split、runtime capabilities、安全边界、CI 去抖动 | **高活跃，架构演进强，但 stacked PR 风险高** |
| **NanoClaw** | 3 | 21 | 无 | skills、渠道能力、运维自动化、provider 扩展 | **研发活跃，但升级链路与供应链安全风险突出** |
| **NanoBot** | 2 | 11 | 无 | Feishu、邮件、cron、文件、Unicode、工具参数校验 | **高维护活跃，质量收敛期，社区讨论较低** |
| **LobsterAI** | 0 | 4 | 无 | Word 文档编辑、Markdown/artifacts、OpenClaw 启动稳定性 | **功能推进稳定，偏桌面生产力方向** |
| **CoPaw** | 3 | 3 | 无 | 文件面板刷新、i18n、WeCom Markdown、任务状态 | **中等活跃，用户体验修复响应较快** |
| **NullClaw** | 0 | 2 | 无 | Discord 自循环修复、工具解析内存泄漏 | **低讨论，中等维护，稳定性修复明确** |
| **PicoClaw** | 1 | 0 | 无 | QQ 通道接口适配反馈 | **低活跃，需关注外部平台接口变更** |
| **IronClaw** | 1 | 0 | 无 | NEARA hosted-MCP / NEAR launchpad 需求 | **低活跃，需求收集阶段，Web3 agent 方向明确** |
| **Moltis** | 0 | 1 | 无 | RepoCloud 一键部署文档 | **低活跃，轻量维护，部署体验小幅改善** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |

**活跃度结论：**

- 第一梯队：OpenClaw、Hermes Agent、ZeroClaw  
- 第二梯队：NanoClaw、NanoBot  
- 垂直演进型：LobsterAI、CoPaw  
- 低频维护 / 需求收集型：PicoClaw、IronClaw、Moltis、NullClaw  
- 静默型：TinyClaw、ZeptoClaw

---

## 3. OpenClaw 在生态中的定位

### 3.1 定位概括

OpenClaw 当前是生态中最典型的 **全栈个人 AI 助手基础设施型项目**：同时覆盖 Gateway、Control UI、Worker、插件运行时、模型 provider、跨平台启动、移动端和安全边界。  
与 NanoBot、NanoClaw 这类更偏渠道和技能扩展的项目相比，OpenClaw 更像一个可长期运行的本地/远程 AI 助手操作系统。  
与 Hermes Agent、ZeroClaw 相比，OpenClaw 的差异在于它更强调 **Gateway + Worker + Control UI + 插件生态** 的整体产品闭环，而不仅是 CLI/daemon 或 RPC 架构演进。

### 3.2 优势

1. **开发活跃度高**  
   - 今日 62 条 PR 更新，仅次于或高于多数同类项目。
   - Issues 响应快，多个问题已有修复 PR。

2. **产品闭环完整**  
   - Control UI、Gateway、Worker、插件、移动端、模型 provider 均有活跃开发。
   - 与只聚焦 CLI、channel 或文档编辑的项目相比，OpenClaw 的系统边界更完整。

3. **路线图清晰**  
   - Worker 原生推理三段式 PR 栈表明项目正在向 **本地/远程 Worker placement、无本地 provider key、配对 Worker 推理** 演进。
   - Presence 能力显示 Agent 正从纯工具执行走向理解“人、设备、在线状态、活动来源”的个人助手上下文。

4. **稳定性问题暴露充分**  
   - Gateway 重启、模型可用性、embedding manager、会话并发、iOS 首条消息、Bun/macOS 插件捕获、Windows SQLite 等问题覆盖真实生产环境。
   - 这说明项目用户场景复杂，也说明生态成熟度正在提升。

### 3.3 风险与短板

1. **PR 积压明显**  
   - 今日 62 条 PR 更新，56 条仍待合并。
   - 大型架构 PR 与用户可见修复并行，Review 压力较大。

2. **核心路径仍有 P1/P2 风险**  
   - Model fallback keyed user 拒绝涉及 `session-state`、`message-loss`、`auth-provider`。
   - CDP credentialed WebSocket URL 暴露涉及安全边界。
   - Gateway 启动、Windows 重启、Crabbox 云分发均涉及可用性。

3. **跨平台复杂度高**  
   - Windows、macOS、Bun、iOS、Node、插件捕获、SQLite 等问题说明 OpenClaw 的平台矩阵已经非常复杂。

### 3.4 与主要竞品对比

| 维度 | OpenClaw | Hermes Agent | ZeroClaw | NanoBot | NanoClaw |
|---|---|---|---|---|---|
| 核心定位 | 全栈个人 AI 助手平台 | 多平台 agent runtime / desktop / CLI | RPC 化 daemon/runtime 架构平台 | 多渠道 agent 与工具执行 | 技能生态与聊天通道自动化 |
| 今日活跃度 | 极高，62 PR | 极高，50 PR / 50 Issues | 极高，49 PR | 中高，11 PR | 高，21 PR |
| 架构重点 | Gateway + Worker + Control UI + 插件 | update/session/message delivery/desktop | RPC split + runtime capabilities | channel runtime + tool robustness | skills + ops automation + provider seam |
| 用户侧重点 | 个人助手完整体验、模型/插件/Worker | 长期运行、多平台、消息可靠性 | 架构模块化、daemon/dashboard | IM、邮件、cron、工具调用 | 自维护、渠道体验、可观测性 |
| 当前最大风险 | 会话/消息、安全、Gateway 可用性 | update 链路、会话丢消息、跨平台 | CI flaky、安全边界、XL PR | sudo loop、待合并修复 | 升级链路、供应链安全 |

---

## 4. 共同关注的技术方向

### 4.1 会话状态与消息可靠性

涉及项目：OpenClaw、Hermes Agent、CoPaw、NanoBot、ZeroClaw

具体诉求：

- OpenClaw：model fallback 拒绝 keyed user、并发首次发送误判 branch change、iOS 首条消息丢失。
- Hermes Agent：persist override 覆盖 unanswered user row、`/stop` 后 queued follow-up 仍运行。
- CoPaw：TaskTracker running count 与 `/api/chats` 不一致。
- NanoBot：sudo 授权生命周期过短导致 agent loop。
- ZeroClaw：session-owned turns、viewer attach、history-trim observer attribution。

结论：  
**消息发送、会话恢复、任务取消、状态统计** 已成为 AI 助手平台的核心可靠性指标。对开发者而言，必须将 session state 当作强一致性系统设计，而不是普通前端状态。

---

### 4.2 Gateway / Runtime / Worker 架构重构

涉及项目：OpenClaw、ZeroClaw、Hermes Agent、NanoClaw

具体诉求：

- OpenClaw：Worker 原生推理、required placement、Gateway/Worker 协同。
- ZeroClaw：RPC parity、gateway split、runtime capabilities、session-owned turns。
- Hermes Agent：gateway/session state、Docker path、terminal backend、cron 环境隔离。
- NanoClaw：provider-wrapper seam、minimalContext、agent-runner 扩展。

结论：  
生态正在从单体 agent 进程走向 **分层 runtime 架构**：Gateway/daemon 负责协调，Worker/backend 负责执行，UI/channel 作为 client，provider 层可插拔。

---

### 4.3 跨平台安装、更新与长期运行

涉及项目：OpenClaw、Hermes Agent、NanoClaw、NanoBot、LobsterAI

具体诉求：

- OpenClaw：Windows Gateway SQLite sharing errors、macOS/Bun 插件捕获、Gateway 慢启动。
- Hermes Agent：Windows install/update、企业 TLS 代理、manual gateway update 后不恢复。
- NanoClaw：`/update-nanoclaw` 崩溃、lockfile 被改写、Baileys 安全版本 pinning。
- NanoBot：cron 本地时区 / DST、Windows 文件换行。
- LobsterAI：OpenClaw Gateway startup timeout extension。

结论：  
AI 助手开始进入真实桌面、服务器、企业网络、长期 cron 场景后，**安装更新可靠性** 与 **跨平台语义一致性** 成为采用门槛。

---

### 4.4 多渠道与企业 IM 集成

涉及项目：NanoBot、NanoClaw、NullClaw、CoPaw、PicoClaw、Hermes Agent

具体诉求：

- NanoBot：Feishu bot-to-bot 群聊互通。
- NanoClaw：Slack 折叠卡片、Telegram live progress、Discord proxy、WhatsApp 安全依赖。
- NullClaw：Discord bot 忽略自身消息，避免循环。
- CoPaw：企业微信 Markdown 表格误判。
- PicoClaw：QQ 机器人接口更新适配。
- Hermes Agent：Slack progress-bubble edit cap mismatch。

结论：  
聊天渠道已经不只是“输入输出适配器”，而是需要处理 **权限、循环防护、限流、富格式渲染、bot-to-bot 协作、平台 API 变更** 的复杂子系统。

---

### 4.5 安全边界与凭据最小暴露

涉及项目：OpenClaw、ZeroClaw、NanoClaw、Hermes Agent、IronClaw

具体诉求：

- OpenClaw：CDP credentialed WebSocket URL 暴露给模型结果。
- ZeroClaw：first-run pairing code 仅本地可见、steering provenance、delegation approval inheritance。
- NanoClaw：WhatsApp Baileys message spoofing、lockfile integrity。
- Hermes Agent：reasoning tag 泄露、claim evidence 校验。
- IronClaw：NEARA hosted-MCP 涉及链上交易和 keyless 授权模型。

结论：  
智能体系统正在进入“模型可见上下文必须做最小权限设计”的阶段。凭据、连接 URL、推理痕迹、链上交易权限都需要明确隔离。

---

### 4.6 可观测性与审计

涉及项目：NanoClaw、ZeroClaw、Hermes Agent、OpenClaw、CoPaw

具体诉求：

- NanoClaw：turn traces、error reports、per-session stderr sink。
- ZeroClaw：history-trim observer attribution、steering provenance。
- Hermes Agent：claim evidence、日志 ownership、cron delivery outcome。
- OpenClaw：Doctor repair、Gateway/Worker health、embedding ready 状态。
- CoPaw：TaskTracker 状态一致性。

结论：  
未来成熟 agent 平台必须提供 **turn-level trace、工具调用审计、错误报告、状态来源归因、任务生命周期可视化**。

---

## 5. 差异化定位分析

### 5.1 OpenClaw：全栈个人 AI 助手基础设施

- 功能侧重：Gateway、Control UI、Worker、插件、模型 provider、移动端。
- 目标用户：希望部署长期运行个人 AI 助手、需要本地/远程 Worker、插件和跨端控制的高级用户。
- 技术架构：Gateway 中心化协调，Worker placement 正在成型，插件运行时和模型可用性管理较复杂。
- 差异点：产品闭环最完整，但系统复杂度和稳定性风险也最高。

### 5.2 Hermes Agent：多平台长期运行 agent runtime

- 功能侧重：CLI、Desktop、Gateway、install/update、message delivery。
- 目标用户：开发者、桌面用户、长期运行自动化用户。
- 技术架构：多 backend、多平台、多 channel，强调更新和运行时可靠性。
- 差异点：社区问题量大，真实平台边界暴露充分；更新系统是当前关键短板。

### 5.3 ZeroClaw：架构重构驱动的 daemon/runtime 平台

- 功能侧重：RPC parity、gateway split、runtime capabilities、session turns。
- 目标用户：更偏系统开发者、需要 daemon/dashboard 架构的 agent 平台用户。
- 技术架构：明显向 RPC client/server、capability injection、session-owned turn 演进。
- 差异点：工程架构雄心强，但 stacked XL PR 多，合并风险较高。

### 5.4 NanoBot：渠道与工具执行鲁棒性

- 功能侧重：Feishu、邮件、cron、文件、JSON Schema、Unicode、多平台边界输入。
- 目标用户：希望将 agent 接入企业 IM、邮件、定时任务和工具流的用户。
- 技术架构：偏 channel runtime + tool execution + WebUI 管理。
- 差异点：今日修复集中在边界条件，说明项目处于质量收敛期。

### 5.5 NanoClaw：技能生态与自运维 agent

- 功能侧重：skills、scheduled update、turn traces、error reports、Slack/Telegram/Discord/WhatsApp。
- 目标用户：希望通过技能扩展 agent，并让 agent 辅助维护自身的用户。
- 技术架构：skill-first，provider seam 和 minimalContext 正在增强。
- 差异点：自我维护、自我更新、可观测性方向突出，但升级链路和供应链安全需要优先补强。

### 5.6 LobsterAI：桌面生产力与文档编辑

- 功能侧重：Word 编辑、Markdown live editing、artifacts、OpenClaw 集成。
- 目标用户：重视桌面交互、文档生成和编辑的个人生产力用户。
- 技术架构：Electron/renderer/main/artifacts/skills/OpenClaw 联动。
- 差异点：不像基础设施项目，而更接近 AI 文档工作台。

### 5.7 CoPaw：控制台与任务状态体验

- 功能侧重：Files panel、任务状态、上下文显示、i18n、企业微信。
- 目标用户：通过 Web console 管理 agent 工作流的用户。
- 技术架构：console + backend task tracking + channel formatting。
- 差异点：用户体验修复响应快，但任务状态一致性仍需加强。

### 5.8 PicoClaw / IronClaw / Moltis / NullClaw

- PicoClaw：偏聊天通道，当前重点是 QQ 接口适配。
- IronClaw：NEAR / Web3 agent 方向，关注 hosted-MCP 和链上 launchpad。
- Moltis：轻量维护，部署入口优化。
- NullClaw：低活动但关注底层稳定性和 Discord 安全循环防护。

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

项目：OpenClaw、Hermes Agent、ZeroClaw、NanoClaw

特征：

- PR 数量高。
- 架构性改动多。
- 大量 P1/P2 或 S1 问题暴露。
- 维护响应快，但 backlog 压力大。

判断：

- OpenClaw：产品体系快速扩展期。
- Hermes Agent：高强度稳定性修复期。
- ZeroClaw：核心架构迁移期。
- NanoClaw：技能生态扩张期。

### 6.2 质量巩固阶段

项目：NanoBot、CoPaw、NullClaw、LobsterAI

特征：

- PR 数量中等或较少。
- 修复集中在边界条件、UI 状态、渠道格式、内存泄漏。
- 目标不是大规模重构，而是提升真实使用体验。

判断：

- NanoBot：生产边界条件修复集中。
- CoPaw：console 体验和状态可信度修复。
- NullClaw：小规模但关键稳定性修复。
- LobsterAI：文档能力扩展与编辑器工程化并行。

### 6.3 低频维护 / 需求探索阶段

项目：PicoClaw、IronClaw、Moltis、TinyClaw、ZeptoClaw

特征：

- Issue/PR 很少或无活动。
- 多数只有单点需求或文档更新。
- 缺少明显版本推进。

判断：

- PicoClaw：需关注 QQ 渠道适配，否则通道用户体验可能受损。
- IronClaw：Web3 agent 需求明确，但实现尚未启动。
- Moltis：部署体验维护。
- TinyClaw、ZeptoClaw：今日静默。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 平台正在从“聊天机器人”升级为“长期运行系统”

多个项目的问题都与长期运行有关：

- Gateway 重启与启动可靠性：OpenClaw、Hermes Agent。
- cron / scheduled tasks：NanoBot、Hermes Agent、NanoClaw。
- 日志、trace、error reports：NanoClaw、ZeroClaw、Hermes Agent。
- update 链路：Hermes Agent、NanoClaw。

对开发者的启示：  
构建 agent 不能只关注单轮推理，需要像构建后台服务一样设计 **启动、停止、恢复、升级、日志、健康检查、状态迁移**。

---

### 7.2 Worker / RPC / capability injection 成为新架构主线

代表项目：

- OpenClaw：Worker 原生推理和 placement。
- ZeroClaw：RPC parity、gateway split、RuntimeCapabilities。
- NanoClaw：provider-wrapper seam、minimalContext。
- Hermes Agent：多 backend、Docker/terminal/cron 隔离。

对开发者的启示：  
未来 agent runtime 会趋向 **模块化、分布式、能力注入式架构**。模型调用、工具执行、UI 会话、channel delivery 不应全部耦合在一个主进程中。

---

### 7.3 消息可靠性成为 AI 助手的“第一性体验”

代表问题：

- OpenClaw：message loss、fallback 拒绝 keyed user、iOS 首条消息。
- Hermes Agent：unanswered user row 丢失。
- NanoBot：sudo loop 使会话不可用。
- CoPaw：任务状态不一致。
- ZeroClaw：session-owned turns。

对开发者的启示：  
用户可以接受模型回答不完美，但很难接受 **消息丢失、任务失控、状态不可信**。Agent 系统需要事务化地处理用户输入、turn lifecycle 和持久化。

---

### 7.4 多渠道集成正在走向“平台原生体验”

代表方向：

- Slack Block Kit、Telegram live progress、Feishu bot-to-bot、WeCom Markdown、Discord slash command、QQ 接口适配。
- 不同平台有不同限制：消息编辑次数、Markdown 语义、bot 消息循环、代理网络、权限范围。

对开发者的启示：  
channel adapter 不能只做文本转发。成熟实现需要支持 **平台限流、循环防护、富格式渲染、权限配置、bot-to-bot 协作和 API 版本跟踪**。

---

### 7.5 安全边界从 API key 管理扩展到“模型可见上下文治理”

代表问题：

- OpenClaw：CDP credentialed WebSocket URL 暴露。
- Hermes Agent：reasoning tag 泄露。
- ZeroClaw：pairing code 暴露、steering provenance。
- NanoClaw：供应链完整性和 message spoofing。
- IronClaw：链上交易与 keyless hosted-MCP。

对开发者的启示：  
安全不只是密钥存储，还包括 **哪些信息可以进入模型上下文、哪些工具结果可以展示、哪些权限可以继承、哪些链上操作需要确认**。

---

### 7.6 可观测性正在成为 agent 产品竞争力

代表能力：

- NanoClaw：turn traces、error reports。
- ZeroClaw：history-trim attribution、steering provenance。
- Hermes Agent：claim evidence、partial delivery outcome。
- OpenClaw：模型/embedding health、Doctor repair。
- CoPaw：dashboard task count 一致性。

对开发者的启示：  
AI agent 的调试难点在于“为什么它这么做”。未来高质量平台需要提供 **工具调用轨迹、上下文裁剪记录、消息投递结果、错误上报、任务生命周期追踪**。

---

## 总结判断

当前个人 AI 助手 / 自主智能体开源生态已经进入系统工程竞争阶段。  
OpenClaw、Hermes Agent、ZeroClaw 是最值得重点跟踪的基础设施型项目，其中 OpenClaw 的产品闭环最完整，Hermes Agent 的真实平台问题暴露最充分，ZeroClaw 的架构重构信号最强。  
NanoBot、NanoClaw 则代表渠道、技能和运维自动化方向的快速演进；LobsterAI 显示出 AI 助手向桌面文档生产力工具融合的趋势。  
对技术决策者而言，短期选型应重点考察：**消息可靠性、跨平台部署、更新机制、安全边界、可观测性、通道生态和架构可扩展性**，而不仅是模型接入数量或单次 demo 效果。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
**日期：2026-09-27**  
**仓库：** [HKUDS/nanobot](https://github.com/HKUDS/nanobot)

---

## 1. 今日速览

过去 24 小时 NanoBot 活跃度较高：新增或活跃 Issue 2 条，PR 更新 11 条，其中 10 条仍待合并，1 条已关闭。今日更新以 **Bug 修复、稳定性增强、边界条件处理** 为主，覆盖 Feishu 渠道、邮件解析、后台通知、文件写入、图片 base64、cron 调度、日志流、Unicode 截断、工具参数校验等多个模块。  
社区层面讨论热度不高，Issue 和 PR 均几乎没有评论或点赞，说明当前更多是开发者主动修复与功能推进，而非高强度用户讨论驱动。整体来看，项目处于 **高维护活跃、偏质量收敛** 的状态，下一阶段若这些修复 PR 集中合并，将显著提升稳定性和多平台兼容性。

---

## 2. 项目进展

### 已关闭 / 已处理 PR

#### [#5919 feat(linear): manage member access and simplify workspace connections](https://github.com/HKUDS/nanobot/pull/5919)  
**状态：Closed**  
**作者：Re-bin**

该 PR 目标是增强 Linear 集成的成员访问管理能力，让管理员可以直接在 WebUI 中配置谁可以使用 Linear agent，而不需要每位团队成员单独交换 pairing code。

主要推进点包括：

- 支持 workspace 级别的成员搜索；
- 显示成员头像与访问开关；
- 限定只有活跃的人类成员、且属于应用可见团队的用户可被授权；
- 简化 Linear workspace 连接流程；
- 更适合团队协作场景中的集中权限管理。

虽然该 PR 当前为 Closed，数据中未明确标注是合并还是关闭未采纳，但从内容看，它代表 NanoBot 在 **企业协作工具集成与权限治理** 方向上的重要尝试。如果后续以其他 PR 形式继续推进，Linear agent 的团队可用性会明显提升。

---

### 待合并 PR 概览

今日仍有 10 个 Open PR，集中在 Bug 修复和测试增强：

| PR | 类型 | 影响范围 | 优先级 |
|---|---|---|---|
| [#5930](https://github.com/HKUDS/nanobot/pull/5930) | Feature / Channel | Feishu 群聊机器人互通 | P2 |
| [#5928](https://github.com/HKUDS/nanobot/pull/5928) | Bug Fix | 邮件正文解析 | P2 |
| [#5927](https://github.com/HKUDS/nanobot/pull/5927) | Bug Fix | 后台通知评估器 | P2 |
| [#5926](https://github.com/HKUDS/nanobot/pull/5926) | Bug Fix | 网页抓取去重 | P2 |
| [#5925](https://github.com/HKUDS/nanobot/pull/5925) | Bug Fix | 文件创建 / Windows 换行 | P2 |
| [#5923](https://github.com/HKUDS/nanobot/pull/5923) | Bug Fix | 图片 base64 解码 | P2 |
| [#5922](https://github.com/HKUDS/nanobot/pull/5922) | Bug Fix | cron 本地时区 / DST | P1 |
| [#5921](https://github.com/HKUDS/nanobot/pull/5921) | Bug Fix | 后台日志流关闭状态 | P2 |
| [#5920](https://github.com/HKUDS/nanobot/pull/5920) | Bug Fix | Unicode token 截断 | P2 |
| [#5918](https://github.com/HKUDS/nanobot/pull/5918) | Bug Fix | JSON Schema 工具参数校验 | P2 |

整体判断：今日项目进展主要不是“大功能落地”，而是围绕真实边界条件进行密集修复。若这些 PR 合并，NanoBot 在生产环境中的容错能力、跨平台一致性和 agent 执行可靠性将有明显提升。

---

## 3. 社区热点

今日社区互动数据整体偏低：Issues 评论数均为 0，PR 评论数未提供，点赞数均为 0。因此“热点”主要依据影响范围和潜在用户诉求判断，而非评论活跃度。

### 1. Feishu 群聊机器人互通能力

- Issue：[ #5929 feishu: allow bot-to-bot messages in groups](https://github.com/HKUDS/nanobot/issues/5929)  
- PR：[ #5930 feat(feishu): allow bot-to-bot messages in groups](https://github.com/HKUDS/nanobot/pull/5930)

该问题指出，飞书实际上会在具备权限 `im:message.group_at_msg.include_bot:readonly` 时，将其他机器人发送的 @ 消息推送给当前机器人，但 NanoBot 的 Feishu channel runtime 当前会无条件丢弃 bot-authored message。

背后的用户诉求是：

- 希望 NanoBot 能参与多机器人群聊协作；
- 希望支持 bot-to-bot workflow，例如一个机器人触发 NanoBot，NanoBot 再执行任务；
- 同时需要避免机器人之间无限循环，因此 PR 引入 allowlist 和 hop limit 是合理设计。

这类需求通常出现在企业 IM、自动化运维、群机器人协同场景中，属于渠道能力增强。

---

### 2. Agent sudo 授权循环问题

- Issue：[ #5924 [bug] Agent gets stuck in sudo loop - becomes unusuable](https://github.com/HKUDS/nanobot/issues/5924)

用户报告 sudo 授权只持续一个 turn，导致 agent 还没执行命令授权就失效，进而陷入不断请求 sudo 的循环。更严重的是，当 agent 达到最大迭代次数后，仍会持续执着于无法完成的命令，使会话变得不可用。

背后的用户诉求是：

- sudo 授权生命周期需要覆盖实际命令执行；
- agent 应在授权失败或迭代耗尽后优雅停止；
- 避免因单个失败命令污染后续会话上下文；
- 提升终端 / 系统操作类 agent 的可靠性。

该问题目前尚未看到对应 fix PR，是今日最值得维护者优先关注的用户痛点之一。

---

## 4. Bug 与稳定性

以下按潜在严重程度排序。

### P1：cron 本地时区规则错误，可能导致定时任务跨 DST 偏移

- PR：[ #5922 fix: 使用本地时区规则计算 cron 下次运行时间](https://github.com/HKUDS/nanobot/pull/5922)  
- 状态：Open  
- 优先级：P1  
- 是否已有 fix：有

问题描述：未显式设置 `CronSchedule.tz` 时，系统使用 `datetime.now().astimezone().tzinfo` 获取当前时区信息，但该对象只保留当前 UTC offset，不包含完整夏令时规则。比如纽约主机在冬季计算夏季 09:00 任务时，可能按 UTC-05:00 调度，导致实际本地时间 10:00 执行。

影响：

- 定时任务在跨季节时可能提前或延后一小时；
- 对长期运行的自动化任务影响较大；
- 企业用户、定时提醒、周期性 agent workflow 都可能受影响。

修复方向：复用 `detect_system_timezone()`，通过 IANA 时区构造 `ZoneInfo`，保留完整时区规则。

---

### 高：Agent sudo 循环导致会话不可用

- Issue：[ #5924 [bug] Agent gets stuck in sudo loop - becomes unusuable](https://github.com/HKUDS/nanobot/issues/5924)  
- 状态：Open  
- 是否已有 fix：暂未发现对应 PR

问题描述：sudo 授权仅持续一轮，agent 在真正执行命令前授权已失效，导致反复请求 sudo。达到最大迭代次数后，agent 仍持续围绕失败命令循环，用户认为系统变得不可用。

影响：

- 直接影响 agent 执行需要权限的本地命令；
- 可能造成对话状态污染；
- 用户体验较差，属于 agent control loop 层面的稳定性问题。

建议优先级：高。建议维护者补充状态机或授权生命周期测试。

---

### 中高：工具参数 JSON Schema union 类型被错误转换或拒绝

- PR：[ #5918 fix(tools): preserve valid JSON Schema union arguments](https://github.com/HKUDS/nanobot/pull/5918)  
- 状态：Open  
- 是否已有 fix：有

问题描述：当工具参数 schema 使用 `{"type": ["integer", "string"]}` 这类 union 类型时，NanoBot 可能把字符串 `"00123"` 强制转换成整数 `123`，或错误拒绝 `"doc-A"`，尽管这些都是合法字符串。

影响：

- 影响工具调用参数准确性；
- 可能破坏 ID、编号、文档名等字符串字段；
- 对 MCP / tool-use 场景有较大影响。

---

### 中：邮件正文未知字符集导致收件轮询中断

- PR：[ #5928 fix: 邮件正文字符集未知时回退解码，避免中断收件轮询](https://github.com/HKUDS/nanobot/pull/5928)  
- 状态：Open  
- 是否已有 fix：有

问题描述：当邮件 `Content-Type` 声明 Python 不认识的 charset，例如 `unknown-charset`，`get_content()` 抛出 `LookupError`。现有 fallback 再次使用同一个无效 charset 解码，导致异常逃逸，收件轮询中断。

影响：

- 邮件 channel 的稳定性受影响；
- 单封格式异常邮件可能阻塞后续轮询；
- 对邮件驱动 agent workflow 有实际风险。

修复方向：捕获 `LookupError`，使用 UTF-8 加 replacement character 做尽力解码。

---

### 中：后台通知评估器将字符串 `"false"` 误判为 true

- PR：[ #5927 fix: 通知评估器拒绝非布尔值，避免将字符串 false 视为通知许可](https://github.com/HKUDS/nanobot/pull/5927)  
- 状态：Open  
- 是否已有 fix：有

问题描述：通知评估器的参数 `should_notify` 语义上应为布尔值，但执行时直接调用 `bool(should_notify)`。Python 中非空字符串 `"false"` 会被视为 `True`，导致原本不应通知的后台检查向用户发送通知。

影响：

- 可能产生误通知；
- 干扰用户；
- 违背模型工具参数 schema 约束。

修复方向：严格检查布尔类型，非布尔值记录警告并返回 `default_notify`。

---

### 中：网页抓取将大小写不同的 URL 误判为重复请求

- PR：[ #5926 fix: 避免网页抓取将大小写不同的 URL 误判为重复请求](https://github.com/HKUDS/nanobot/pull/5926)  
- 状态：Open  
- 是否已有 fix：有

问题描述：重复抓取保护把整个 URL 转成小写，但 URL 路径和查询参数值可能区分大小写，例如 `/API`、`/Api`、`/api` 或 `?id=ABC`、`?id=Abc`、`?id=abc` 应被视为不同请求。

影响：

- agent 浏览网页或读取 API 时可能漏抓；
- 对大小写敏感的服务造成错误行为；
- 影响信息检索准确性。

---

### 中：Windows 创建文件时出现重复回车

- PR：[ #5925 fix: 创建文件时保留原始换行，避免 Windows 重复回车](https://github.com/HKUDS/nanobot/pull/5925)  
- 状态：Open  
- 是否已有 fix：有

问题描述：Windows 上 `write_file` 和 `edit_file(old_text="", ...)` 创建文件时使用默认文本换行转换，传入 `\r\n` 内容可能写成 `\r\r\n`，导致读取时出现额外空行。

影响：

- 影响 Windows 用户；
- 可能破坏生成代码、配置文件、脚本文本；
- 对文件编辑工具可靠性有影响。

---

### 中：图片 base64 中非 ASCII 字符导致异常未被正确转换

- PR：[ #5923 fix: 正确处理图片 base64 中的非 ASCII 字符](https://github.com/HKUDS/nanobot/pull/5923)  
- 状态：Open  
- 是否已有 fix：有

问题描述：图片解码路径只捕获 `binascii.Error`，但 `base64.b64decode()` 遇到包含中文或孤立代理字符的字符串时可能抛出 `ValueError`，导致错误未转换为业务异常。

影响：

- MCP 可能将整条响应标为 malformed content；
- 本可保留的文本被丢弃；
- 图片生成客户端无法通过既有异常路径报告失败。

---

### 中低：关闭后的后台日志流仍可重新打开文件

- PR：[ #5921 fix: 禁止关闭的后台日志流重新打开文件](https://github.com/HKUDS/nanobot/pull/5921)  
- 状态：Open  
- 是否已有 fix：有

问题描述：`RotatingTextOutput` 关闭后，`write()` 和 `fileno()` 仍可能通过 `_ensure_open()` 重新打开日志文件，导致 closed 状态与实际文件行为不一致。

影响：

- 文件流语义不符合预期；
- 可能造成日志文件被意外创建、追加或轮转；
- 对后台任务日志可靠性有影响。

---

### 中低：按 token 截断时产生 Unicode 替换字符

- PR：[ #5920 fix: 按 token 截断时保留完整 Unicode 字符](https://github.com/HKUDS/nanobot/pull/5920)  
- 状态：Open  
- 是否已有 fix：有

问题描述：`truncate_text_to_tokens()` 直接解码被截断 token 序列。如果截断点落在汉字或 Emoji 字符内部，可能生成原文中不存在的 `�`。

影响：

- 影响归档上下文和摘要质量；
- 对中文、Emoji、多语言内容不友好；
- 可能引入不可读字符。

---

## 5. 功能请求与路线图信号

### Feishu bot-to-bot 群聊消息支持可能进入下一版本

- Issue：[ #5929](https://github.com/HKUDS/nanobot/issues/5929)  
- PR：[ #5930](https://github.com/HKUDS/nanobot/pull/5930)

这是今日最明确的功能请求，并且已经有对应实现 PR。该能力允许 NanoBot 在 Feishu 群聊中接收来自其他机器人的 @ 消息，但通过 allowlist 和 hop limit 控制风险。

路线图信号：

- NanoBot 正在增强企业 IM channel 的灵活性；
- 多机器人协作将成为更重要的使用场景；
- channel 层需要更多安全阀机制，例如 allowlist、hop limit、去重、循环检测。

纳入下一版本可能性：较高。原因是已有 PR，且范围相对清晰。

---

### Linear workspace 成员访问管理显示出企业权限治理方向

- PR：[ #5919](https://github.com/HKUDS/nanobot/pull/5919)

虽然 PR 已关闭，但其功能方向值得关注。它反映出 NanoBot 在第三方 SaaS agent 集成中，开始面对更复杂的组织权限模型：谁可以使用某个 workspace agent、谁可以被授权、管理员如何集中控制。

路线图信号：

- 从个人助手走向团队级 agent；
- WebUI 管理能力会越来越重要；
- 第三方工具集成不只是连接 API，还需要权限、成员、可见性和审计能力。

---

## 6. 用户反馈摘要

今日可用的用户评论较少，Issues 评论数均为 0，因此以下主要基于 Issue 描述和 PR 摘要中的直接痛点提炼。

### 用户痛点 1：Agent 权限授权体验不稳定

- 来源：[ #5924](https://github.com/HKUDS/nanobot/issues/5924)

用户明确表示 agent 会陷入 sudo 循环，并最终变得不可用。这说明在需要系统权限的 agent 工作流中，用户期望的是：

- 授权一次后能完成实际操作；
- 授权失败时不要无限循环；
- 达到最大迭代次数后应停止或恢复，而不是继续执着于失败任务；
- agent 应具备更强的自我纠错与退出机制。

这是非常典型的“AI agent 控制流可靠性”问题。

---

### 用户痛点 2：企业 IM 中需要机器人协同，而不是孤立机器人

- 来源：[ #5929](https://github.com/HKUDS/nanobot/issues/5929)

Feishu 用户发现平台本身已经支持向当前 bot 投递其他 bot 的 @ 消息，但 NanoBot runtime 直接丢弃了这类消息。用户诉求不是简单放开所有 bot 消息，而是希望在可控条件下支持 bot-to-bot 协作。

典型场景包括：

- 一个工作流机器人在群里触发 NanoBot 分析；
- 运维机器人将告警 @ NanoBot 进行总结或处理；
- 多 agent 协作中需要消息链路传递。

---

### 用户痛点 3：边界输入应被稳健处理，而不是中断整个流程

多个 PR 体现出相同反馈方向：

- 邮件未知字符集不应中断轮询：[ #5928](https://github.com/HKUDS/nanobot/pull/5928)
- 非 ASCII base64 错误应进入业务异常路径：[ #5923](https://github.com/HKUDS/nanobot/pull/5923)
- Unicode 截断不应产生脏字符：[ #5920](https://github.com/HKUDS/nanobot/pull/5920)
- JSON Schema union 参数不应被过度转换：[ #5918](https://github.com/HKUDS/nanobot/pull/5918)

这说明 NanoBot 在实际使用中正在遇到更多非理想输入，项目当前修复重点是提升鲁棒性。

---

## 7. 待处理积压

基于本次提供的 24 小时数据，未发现明确的长期未响应 Issue 或 PR。但今日形成了一个新的短期积压池，维护者可重点关注以下事项：

### 1. 高优先级待合并修复

- [#5922 cron 本地时区规则修复](https://github.com/HKUDS/nanobot/pull/5922)  
  标注 P1，建议优先 review。该问题会影响长期定时任务准确性，尤其是存在夏令时的地区。

### 2. 尚无修复 PR 的用户可用性问题

- [#5924 Agent sudo loop](https://github.com/HKUDS/nanobot/issues/5924)  
  当前为 Open，且未发现对应 fix PR。该问题会导致 agent 不可用，建议优先确认复现路径，并评估 sudo 授权生命周期、最大迭代退出策略和会话恢复机制。

### 3. Feishu 功能请求与实现 PR 需尽快对齐

- Issue：[ #5929](https://github.com/HKUDS/nanobot/issues/5929)  
- PR：[ #5930](https://github.com/HKUDS/nanobot/pull/5930)

建议维护者重点 review allowlist、hop limit、循环防护和权限文档，避免 bot-to-bot 消息支持引入消息风暴风险。

### 4. 多个 P2 稳定性修复等待合并

以下 PR 都属于小范围但高价值的稳定性修复，建议批量 review：

- [#5928 邮件未知字符集回退解码](https://github.com/HKUDS/nanobot/pull/5928)
- [#5927 通知评估器布尔值校验](https://github.com/HKUDS/nanobot/pull/5927)
- [#5926 URL 大小写精确去重](https://github.com/HKUDS/nanobot/pull/5926)
- [#5925 Windows 文件换行保留](https://github.com/HKUDS/nanobot/pull/5925)
- [#5923 图片 base64 非 ASCII 异常处理](https://github.com/HKUDS/nanobot/pull/5923)
- [#5921 关闭日志流后禁止重开](https://github.com/HKUDS/nanobot/pull/5921)
- [#5920 Unicode token 截断修复](https://github.com/HKUDS/nanobot/pull/5920)
- [#5918 JSON Schema union 参数保留](https://github.com/HKUDS/nanobot/pull/5918)

---

## 项目健康度评估

**活跃度：高**  
过去 24 小时有 11 条 PR 更新，说明维护活动密集。

**社区讨论热度：低**  
Issues 和 PR 基本没有评论或反应，今日主要是代码层面的修复推进。

**稳定性趋势：改善中**  
大量 PR 聚焦边界条件、异常处理、跨平台行为和 schema 校验，表明项目正在补齐生产环境中的可靠性短板。

**主要风险：待合并 PR 堆积与核心 agent 控制流问题**  
目前 10 个 PR 仍待合并，其中包含 P1 cron 修复和多个 P2 稳定性修复；同时 sudo loop Issue 尚无对应修复，是最需要关注的开放问题。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-27  
仓库：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

过去 24 小时 Hermes Agent 活跃度非常高：Issues 更新 50 条，PR 更新 50 条，其中 40 个 PR 仍待合并，10 个 PR 已合并或关闭。今日没有新版本发布，说明项目处于高频修复与功能集成阶段，而非正式发版窗口。  
从议题分布看，`install/update`、`gateway/session state`、`message delivery`、`desktop`、`CLI` 是今日最集中的风险区域。多个 P0/P1/P2 问题与会话状态、更新流程、Windows/Linux 平台兼容、消息投递可靠性相关，显示项目在多平台部署和长期运行稳定性上仍有较大维护压力。  
积极的一面是，若干高优先级问题已经出现对应修复 PR，例如会话持久化丢消息、MiniMax reasoning tag 泄露、cron lifecycle guard 误拦截等，维护响应速度较快。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

> 数据概览显示今日有 10 个 PR 已合并或关闭，但当前明细中仅展示到评论数最多的 20 个 PR，且其中明确标记为关闭的是 #124765。以下仅基于可见 PR 信息整理。

### 已关闭 / 终止推进

- [PR #124765 feat(optional-mcps): add Apple macOS MCP servers](https://github.com/NousResearch/hermes-agent/pull/124765)  
  状态：Closed，标记为 duplicate。  
  该 PR 试图新增 macOS 相关 optional MCP 服务器，包括 Apple Mail、Notes、Numbers、Photos。虽然未直接合入，但表明社区对本地桌面生态和 Apple 应用自动化能力有明确需求。由于被标记为重复，相关能力可能已有其他实现路径或重复 PR，需要维护者统一 catalog 策略。

### 今日推进中的关键修复 PR

- [PR #124770 fix(agent): preserve unanswered user text through persist override](https://github.com/NousResearch/hermes-agent/pull/124770)  
  对应高危 Issue：[Issue #124731](https://github.com/NousResearch/hermes-agent/issues/124731)。  
  修复会话恢复后 unanswered user row 被新消息合并、随后 persist override 覆盖导致旧用户消息丢失的问题。该问题为 P0，直接影响会话完整性和用户输入可靠性，是今日最重要的稳定性修复之一。

- [PR #124761 fix(agent): strip namespaced reasoning tags](https://github.com/NousResearch/hermes-agent/pull/124761)  
  对应 Issue：[Issue #124705](https://github.com/NousResearch/hermes-agent/issues/124705)。  
  修复 MiniMax 等模型输出 `<mm:think>` / `</mm:think>` 这类带命名空间 reasoning tag 未被过滤、最终泄露到用户可见消息的问题。该修复提升了消息交付质量和内部推理信息隔离。

- [PR #124753 fix(cron): lifecycle guard matches the gateway's own service label](https://github.com/NousResearch/hermes-agent/pull/124753)  
  对应 Issue：[Issue #124700](https://github.com/NousResearch/hermes-agent/issues/124700)。  
  修复 lifecycle guard 过度匹配服务标签，错误阻止无关 LaunchAgent 维护操作的问题。该修复缩小防护范围，兼顾安全意图与运维可用性。

- [PR #124772 fix(terminal): isolate local cron run environments](https://github.com/NousResearch/hermes-agent/pull/124772)  
  修复本地 terminal backend 下 session-less cron runs 共享 `default` 环境，导致环境变量、PATH 修改在不同定时任务之间串扰的问题。该 PR 对长期自动化任务的可预测性有帮助。

- [PR #124771 fix(cli): stop an --isolated backend from claiming the host record](https://github.com/NousResearch/hermes-agent/pull/124771)  
  修复 `--isolated` 只阻止 attach、不阻止 claim host record 的不一致行为，避免隔离 backend 仍污染或占用主机 rendezvous 记录。

- [PR #124764 fix(logging): preserve log ownership across a rollover](https://github.com/NousResearch/hermes-agent/pull/124764)  
  修复日志轮转后文件所有权可能变更，导致后续进程无法写日志的问题。该问题横跨 agent、CLI、gateway、terminal、browser、Windows/install-update 等多个标签，属于基础设施稳定性修复。

- [PR #124757 fix(gateway): translate bare container paths in reply prose before local file delivery](https://github.com/NousResearch/hermes-agent/pull/124757)  
  改进 Docker backend 下回复正文中裸容器路径的 host/container 映射，避免文件投递路径无法被正确识别。

- [PR #124751 fix(agent): resolve a container terminal.cwd to its host mount](https://github.com/NousResearch/hermes-agent/pull/124751)  
  修复 Docker terminal backend 下 `AGENTS.md` 等上下文文件无法发现的问题，提升 Docker 沙箱场景中的上下文加载能力。

- [PR #124750 fix(skills): show the model the container path of a skill under Docker terminal](https://github.com/NousResearch/hermes-agent/pull/124750)  
  改善 Docker backend 下 skills 路径暴露方式，确保模型看到的是容器内可访问路径，而非 host 路径。

- [PR #124774 feat(acp): installed skills appear in editor slash palette](https://github.com/NousResearch/hermes-agent/pull/124774)  
  让已安装 skills 出现在 ACP 编辑器 `/` palette 中，并允许 `/<skill-name> <instruction>` 在 turn 前加载 skill。该 PR 对 Zed、Buzz、Paseo 等 ACP 编辑器集成体验有直接提升。

---

## 4. 社区热点

### 1. Terminal 工具提示指向不存在工具名

- [Issue #124583 terminal tool: background hint references non-existent tool name process(action=...)](https://github.com/NousResearch/hermes-agent/issues/124583)  
  评论数：4，状态：Open，优先级：P3。  
  问题是 terminal tool 的 background hint 提示用户调用 `process(action='poll')` / `process(action='wait')`，但实际工具名是 `process_manage`。  
  **背后诉求**：用户希望工具提示与真实 API 完全一致，避免 agent/operator 按提示操作时遇到 tool-not-found。该问题虽不是核心崩溃，但影响工具可用性和模型自我纠错能力。

### 2. 企业 TLS 代理环境下 `hermes update` 失败

- [Issue #124654 hermes update: git fetch ignores SSL_CERT_FILE](https://github.com/NousResearch/hermes-agent/issues/124654)  
  评论数：2，状态：Open，优先级：P2。  
  在 TLS-inspecting proxy 环境中，Python channel read 尊重 `SSL_CERT_FILE`，但后续 `git fetch` 不尊重，导致更新流程中途失败。  
  **背后诉求**：企业用户需要 Hermes 的更新链路完整支持公司根证书和代理策略。该问题表明 Hermes 在企业网络环境中的安装更新体验仍需加强。

### 3. Memory replace 部分编辑导致整条记忆被覆盖

- [Issue #124582 memory tool: replace silently overwrites the whole entry on partial edits](https://github.com/NousResearch/hermes-agent/issues/124582)  
  评论数：2，状态：Open，优先级：P3。  
  `memory replace` 在用户只想修改长条目中的一个子事实时，会覆盖整条 entry，导致其他 sibling facts 静默丢失。  
  **背后诉求**：用户希望记忆系统具备更安全的局部更新语义，避免 silent fact loss。该问题虽标为 P3，但对个人 AI 助手长期记忆可信度影响较大。

### 4. 会话状态持久化导致未回答用户消息丢失

- [Issue #124731 Persist override overwrites a merged user row](https://github.com/NousResearch/hermes-agent/issues/124731)  
  评论数：1，状态：Open，优先级：P0。  
  会话恢复后若历史以 unanswered user row 结尾，新消息到达时 alternation repair 会合并两条用户消息，但 finalize 阶段 persist override 又只保留新消息，导致旧请求从 live list 中丢失。  
  **背后诉求**：用户希望会话恢复、消息合并、持久化之间保持严格一致，不能丢失未回答请求。  
  已有修复 PR：[PR #124770](https://github.com/NousResearch/hermes-agent/pull/124770)。

### 5. Cron lifecycle guard 过度拦截

- [Issue #124700 lifecycle guard over-matches](https://github.com/NousResearch/hermes-agent/issues/124700)  
  评论数：1，状态：Open，优先级：P2。  
  修复 SIGTERM-respawn loop 的 guard 过度匹配，导致无关 LaunchAgent 维护和非执行命令被阻止。  
  **背后诉求**：用户认可防止 gateway 生命周期滥用的安全目标，但需要更精确的规则，不能阻碍合法系统维护。  
  已有部分修复 PR：[PR #124753](https://github.com/NousResearch/hermes-agent/pull/124753)。

---

## 5. Bug 与稳定性

### P0 / 阻断级

- [Issue #124731 Persist override overwrites a merged user row](https://github.com/NousResearch/hermes-agent/issues/124731)  
  影响：会话状态、用户消息完整性。  
  风险：旧的 unanswered 用户请求可能从 live conversation 中消失。  
  状态：Open。  
  Fix PR：[PR #124770](https://github.com/NousResearch/hermes-agent/pull/124770)。

### P1

- [Issue #124649 hermes update leaves a manually started gateway down](https://github.com/NousResearch/hermes-agent/issues/124649)  
  影响：手动启动的 gateway 在 `hermes update` 后无法恢复。  
  风险：更新后服务中断，且 restart watcher 因 `ModuleNotFoundError: ruamel` 失败。  
  状态：Open。  
  可见数据中未发现对应 fix PR。

### P2 / 高优先级稳定性问题

- [Issue #124654 hermes update: git fetch ignores SSL_CERT_FILE](https://github.com/NousResearch/hermes-agent/issues/124654)  
  影响：企业代理、TLS 检查网络下的更新流程。  
  状态：Open。  
  可见数据中未发现 fix PR。

- [Issue #124721 pm update: Gh/Git fetch_url crash on linux-arm64-bionic target](https://github.com/NousResearch/hermes-agent/issues/124721)  
  影响：`hermes pm update gh/git` 在 `linux-arm64-bionic` target 上 pin artifacts 时崩溃。  
  状态：Open。  
  可见数据中未发现 fix PR。

- [Issue #124634 Fresh Windows script install: hermes update fails with WinError 2](https://github.com/NousResearch/hermes-agent/issues/124634)  
  影响：Windows 新安装，尤其是系统 PATH 中没有 git 的情况。  
  风险：安装脚本虽然 provision git，但后续 update 流程找不到。  
  状态：Open。  
  可见数据中未发现 fix PR。

- [Issue #124659 Windows: hermes update force-stops gateways of other installs](https://github.com/NousResearch/hermes-agent/issues/124659)  
  影响：同一 Windows 机器上多个 Hermes install 并存时，一个 install 的 update 会停止其他 install 的 gateway。  
  状态：Open。  
  可见数据中未发现 fix PR。

- [Issue #124646 /stop can leave a queued follow-up running untracked](https://github.com/NousResearch/hermes-agent/issues/124646)  
  影响：gateway session turn lease。  
  风险：`/stop` 后仍可能启动 queued follow-up，且该 follow-up 不受追踪，持有 session turn lease。  
  状态：Open。  
  可见数据中未发现 fix PR。

- [Issue #124705 Namespaced reasoning tags are not stripped](https://github.com/NousResearch/hermes-agent/issues/124705)  
  影响：Telegram / MiniMax 等消息交付渠道。  
  风险：内部 reasoning tag 泄露到用户消息。  
  状态：Open。  
  Fix PR：[PR #124761](https://github.com/NousResearch/hermes-agent/pull/124761)。

- [Issue #124700 lifecycle guard over-matches](https://github.com/NousResearch/hermes-agent/issues/124700)  
  影响：cron、terminal、macOS LaunchAgent 运维。  
  状态：Open。  
  Fix PR：[PR #124753](https://github.com/NousResearch/hermes-agent/pull/124753)。

- [Issue #124688 hermes desktop never opens a window on Linux when HERMES_HOME is long](https://github.com/NousResearch/hermes-agent/issues/124688)  
  影响：Linux Desktop 启动。  
  风险：Electron 在 `requestSingleInstanceLock()` 阶段阻塞，用户无错误提示。  
  状态：Open。  
  可见数据中未发现 fix PR。

- [Issue #124672 Slack progress-bubble edit cap mismatch floods channel](https://github.com/NousResearch/hermes-agent/issues/124672)  
  影响：Slack adapter 消息更新。  
  风险：进度消息超过 Slack `chat.update` 限制后，恢复路径可能刷屏并耗尽 workspace per-app posting quota。  
  状态：Open。  
  可见数据中未发现 fix PR。

- [Issue #124739 gateway strips delivered file path from code samples and URLs](https://github.com/NousResearch/hermes-agent/issues/124739)  
  影响：gateway 本地文件抽取与附件投递。  
  风险：代码样例中的路径被错误移除，例如 `pd.read_csv('')`。  
  状态：Open。  
  相关但不完全等价的路径投递修复：[PR #124757](https://github.com/NousResearch/hermes-agent/pull/124757)。

### P3 / 中低优先级但影响体验

- [Issue #124583 terminal tool background hint references non-existent tool](https://github.com/NousResearch/hermes-agent/issues/124583)  
  状态：Open。  
  影响：工具提示准确性。

- [Issue #124582 memory tool replace silently overwrites whole entry](https://github.com/NousResearch/hermes-agent/issues/124582)  
  状态：Open。  
  影响：长期记忆准确性与用户信任。

- [Issue #124687 ui-tui: OSC-11 background answer causes skin flash](https://github.com/NousResearch/hermes-agent/issues/124687)  
  状态：Open。  
  影响：TUI 启动视觉一致性。

- [Issue #124618 Desktop saved SSH connection keeps reconnecting](https://github.com/NousResearch/hermes-agent/issues/124618)  
  状态：Open。  
  影响：远程 Hermes 已卸载后 Desktop 仍不断重连，日志一天可重复 1800+ 次。

---

## 6. 功能请求与路线图信号

### ACP / 编辑器集成能力增强

- [PR #124774 feat(acp): installed skills appear in editor slash palette](https://github.com/NousResearch/hermes-agent/pull/124774)  
  该 PR 显示项目正在补齐 ACP 编辑器场景下的 skills 使用体验，使其与 CLI 和聊天平台保持一致。若合入，下一版本很可能增强 Zed、Buzz、Paseo 等编辑器中的 `/` 命令发现与 skill 预加载能力。

### Desktop 体验优化

- [Issue #124769 Desktop: inline ::preview frames should fill available transcript width](https://github.com/NousResearch/hermes-agent/issues/124769)  
  用户希望 Desktop transcript 内的 HTML preview 不再固定 640px，而是自适应可用宽度并随容器 resize。  
  路线图信号：Desktop 正从“可用”走向更高质量的富内容展示体验。

- [Issue #124726 fix(icons): desktop icon asset names no longer describe what they are](https://github.com/NousResearch/hermes-agent/issues/124726)  
  虽标为 feature，但实质是桌面端资源命名与实际用途不一致。  
  路线图信号：Desktop 打包、平台资产、品牌一致性仍在整理中。

- [Issue #124760 Desktop voice composer: make the silence hold configurable](https://github.com/NousResearch/hermes-agent/issues/124760)  
  用户希望 voice composer 的 1250ms silence hold 可配置。  
  路线图信号：语音交互开始出现个性化参数需求，尤其适用于不同语速、不同本地模型延迟场景。

### Cron / 自动化任务交付

- [PR #124756 feat(cron): opt-in partial delivery outcome](https://github.com/NousResearch/hermes-agent/pull/124756)  
  允许 cron 多目标投递时，在至少一个目标成功的情况下记录 partial success，而不是 all-or-nothing。  
  该能力很可能被纳入后续版本，因为它直接改善自动化任务在 Slack、Email 等多渠道交付时的可观测性和容错性。

### Web 工具能力

- [PR #124752 feat(web): add format="summary" to web_extract](https://github.com/NousResearch/hermes-agent/pull/124752)  
  增加 `web_extract(format="summary")`，使模型可请求网页摘要而非全文。  
  路线图信号：工具层正在向更结构化、更低 token 成本的信息获取方式演进。

### Evidence / Claim 校验

- [Issue #124657 Design: on chat surfaces, nothing checks that a claim is backed by evidence](https://github.com/NousResearch/hermes-agent/issues/124657)  
  用户提出聊天表面中“已修复”“已验证”等声明缺少工具结果支撑的问题。  
  路线图信号：这是面向 agent 可信度的重要设计议题，可能发展为 evidence-aware messaging、claim verification 或 delivery gate 机制。

---

## 7. 用户反馈摘要

### 主要痛点

1. **更新链路在复杂环境中脆弱**  
   多个 Issue 集中在 `hermes update`、`hermes pm update`、Windows 安装、企业 TLS 代理、partial clone、rebase 状态等场景：  
   - [#124654](https://github.com/NousResearch/hermes-agent/issues/124654)  
   - [#124721](https://github.com/NousResearch/hermes-agent/issues/124721)  
   - [#124644](https://github.com/NousResearch/hermes-agent/issues/124644)  
   - [#124634](https://github.com/NousResearch/hermes-agent/issues/124634)  
   - [#124653](https://github.com/NousResearch/hermes-agent/issues/124653)  
   用户对“更新应该可靠完成、失败时不破坏现有状态”的预期很强。

2. **会话与消息交付可靠性是核心关注点**  
   P0/P2 问题显示，用户不能接受消息丢失、`/stop` 后任务继续运行、Slack 刷屏、代码路径被误删等行为：  
   - [#124731](https://github.com/NousResearch/hermes-agent/issues/124731)  
   - [#124646](https://github.com/NousResearch/hermes-agent/issues/124646)  
   - [#124672](https://github.com/NousResearch/hermes-agent/issues/124672)  
   - [#124739](https://github.com/NousResearch/hermes-agent/issues/124739)

3. **多平台部署仍是摩擦点**  
   Windows、Linux、Docker、SSH、macOS LaunchAgent 均出现问题：  
   - Windows update / install：[#124634](https://github.com/NousResearch/hermes-agent/issues/124634)、[#124659](https://github.com/NousResearch/hermes-agent/issues/124659)  
   - Linux Desktop 启动：[#124688](https://github.com/NousResearch/hermes-agent/issues/124688)  
   - Docker path/context：[PR #124751](https://github.com/NousResearch/hermes-agent/pull/124751)、[#124757](https://github.com/NousResearch/hermes-agent/pull/124757)  
   - SSH profile reconnect loop：[#124618](https://github.com/NousResearch/hermes-agent/issues/124618)

4. **用户希望 AI 助手更可信、更可控**  
   memory replace 的 silent fact loss、claim 无证据校验、reasoning tag 泄露，都指向同一类需求：AI 助手不仅要能执行任务，还要可审计、可恢复、不泄露内部状态。  
   - [#124582](https://github.com/NousResearch/hermes-agent/issues/124582)  
   - [#124657](https://github.com/NousResearch/hermes-agent/issues/124657)  
   - [#124705](https://github.com/NousResearch/hermes-agent/issues/124705)

### 满意信号

- 高优先级问题能较快出现修复 PR，例如 [#124731](https://github.com/NousResearch/hermes-agent/issues/124731) 对应 [#124770](https://github.com/NousResearch/hermes-agent/pull/124770)，[#124705](https://github.com/NousResearch/hermes-agent/issues/124705) 对应 [#124761](https://github.com/NousResearch/hermes-agent/pull/124761)。  
- 多个 PR 体现维护者正在主动改善 edge cases，而不只是新增功能，例如日志轮转所有权、Docker 路径映射、cron 环境隔离等。

---

## 8. 待处理积压

由于今日数据全部集中在 2026-09-27，未看到“长期未响应”的历史 Issue 或 PR。但从严重程度和影响面看，以下新开问题应优先进入维护队列，避免快速积压成高风险 backlog。

### 建议优先处理

- [Issue #124649 hermes update leaves a manually started gateway down](https://github.com/NousResearch/hermes-agent/issues/124649)  
  P1，更新后 gateway 不恢复，直接影响服务可用性。

- [Issue #124654 git fetch ignores SSL_CERT_FILE](https://github.com/NousResearch/hermes-agent/issues/124654)  
  P2，影响企业网络环境更新，是企业采用的重要阻塞点。

- [Issue #124634 Fresh Windows script install update fails](https://github.com/NousResearch/hermes-agent/issues/124634)  
  P2，Windows 新用户安装后立即更新失败，影响首体验。

- [Issue #124659 Windows update force-stops gateways of other installs](https://github.com/NousResearch/hermes-agent/issues/124659)  
  P2，影响多安装并存场景，可能造成跨 profile / 跨 install 干扰。

- [Issue #124646 /stop can leave queued follow-up running untracked](https://github.com/NousResearch/hermes-agent/issues/124646)  
  P2，涉及 session lease 和任务取消语义，应尽快明确修复方案。

- [Issue #124582 memory replace silently overwrites whole entry](https://github.com/NousResearch/hermes-agent/issues/124582)  
  虽为 P3，但影响长期记忆可信度。建议至少补充 warning、diff、partial update API 或 replace guard。

- [Issue #124739 gateway strips delivered file path from code samples and URLs](https://github.com/NousResearch/hermes-agent/issues/124739)  
  P2，破坏代码样例，影响开发者用户的实际可用性。

---

## 项目健康度判断

Hermes Agent 今日呈现“高活跃、高修复、高风险并存”的状态。PR 处理量和新修复覆盖面说明维护动能充足，但 Issue 集中暴露出更新系统、会话状态、跨平台兼容、消息投递四条主线上的稳定性压力。  
短期内，建议维护者优先合入并验证 P0/P1 修复，随后集中处理 `install/update` 相关 P2 问题；否则高频平台 edge cases 可能削弱用户对 Hermes 作为长期运行个人 AI 助手基础设施的信任。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报

日期：2026-09-27  
仓库：[`sipeed/picoclaw`](https://github.com/sipeed/picoclaw)

---

## 1. 今日速览

过去 24 小时内，PicoClaw 项目新增或更新了 1 条 Issue，未观察到 Pull Request 活动，也没有新版本发布。  
今日活跃度偏低，主要社区信号集中在 QQ 机器人 / QQ 聊天通道接口适配问题上。  
从数据看，当前项目暂无代码合入、版本迭代或修复发布，维护节奏较为平稳但偏静默。  
新反馈指向外部平台接口变更带来的兼容性问题，属于需要及时跟进的集成稳定性风险。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 项目进展

过去 24 小时内无新的 Pull Request 更新，未观察到合并、关闭或待合并的 PR。

因此，今日暂无可确认的代码层面进展，包括功能推进、Bug 修复或文档更新。项目整体推进主要停留在社区反馈收集阶段。

---

## 4. 社区热点

### QQ 机器人接口更新后，QQ 聊天通道疑似未同步适配

- Issue：[#3394](https://github.com/sipeed/picoclaw/issues/3394)
- 状态：Open
- 作者：`qinglt`
- 创建时间：2026-09-26
- 评论数：0
- 👍：0

该 Issue 是过去 24 小时内唯一新增/活跃的问题反馈。用户指出 QQ 机器人的接口已经更新，但 PicoClaw 中 QQ 聊天通道的接口似乎尚未同步更新，希望项目进行修复。

从反馈内容看，问题可能涉及外部聊天平台 API 变更后的适配滞后。虽然目前尚无评论和维护者响应，但该问题对使用 QQ 作为机器人接入通道的用户具有直接影响，可能导致相关功能不可用或行为异常。

---

## 5. Bug 与稳定性

### 高优先级：QQ 聊天通道接口可能与上游 QQ 机器人接口不兼容

- Issue：[#3394](https://github.com/sipeed/picoclaw/issues/3394)
- 严重程度：中到高
- 当前状态：Open
- 是否已有 fix PR：暂无
- 影响范围：使用 QQ 聊天通道或 QQ 机器人集成的用户

用户反馈 QQ 机器人接口已发生更新，而 PicoClaw 的 QQ 聊天通道接口似乎没有同步调整。该类问题通常会影响机器人消息收发、鉴权、事件回调或连接稳定性。

目前 Issue 描述中尚缺少完整环境信息，例如 PicoClaw 版本、Go 版本、操作系统、具体 QQ 接入方式、错误日志等。因此暂时无法判断是确定性回归、接口破坏性变更，还是配置兼容问题。

建议维护者优先补充以下信息：

- 当前 QQ 机器人官方接口变更点
- PicoClaw 中对应 QQ 通道模块的实现位置
- 用户复现步骤与错误日志
- 是否影响所有 QQ 通道用户，还是仅影响特定版本或特定配置
- 是否需要临时兼容旧接口与新接口

---

## 6. 功能请求与路线图信号

今日暂无明确的新功能请求。

不过，[#3394](https://github.com/sipeed/picoclaw/issues/3394) 虽然被归类为 Bug，但也释放出一个路线图信号：PicoClaw 作为多通道 AI Agent / 个人助手项目，需要持续跟踪外部聊天平台接口变化，尤其是 QQ 这类高频使用渠道。

潜在路线图方向包括：

1. **QQ 通道接口适配更新**  
   尽快同步 QQ 机器人最新接口，恢复或保证通道可用性。

2. **聊天通道兼容性测试机制**  
   为 QQ、Telegram、Discord、微信等外部平台通道建立最小可用测试，降低平台接口变更导致的回归风险。

3. **通道适配层抽象优化**  
   如果多个聊天平台存在类似变更压力，可考虑将通道接入逻辑进一步模块化，减少单个平台 API 变化对核心逻辑的影响。

目前暂无相关 PR，因此无法判断该问题是否会进入下一版本。

---

## 7. 用户反馈摘要

今日用户反馈主要集中在 QQ 渠道集成稳定性上。

### 真实用户痛点

- QQ 机器人接口已更新，但 PicoClaw 的 QQ 聊天通道似乎未及时跟进。
- 用户希望官方修复接口适配问题，以保证 QQ 场景下的机器人继续可用。
- 当前 Issue 模板中的环境信息尚未填写完整，说明用户可能更关注问题本身，而非提供完整复现材料。

### 使用场景判断

该反馈大概率来自使用 PicoClaw 作为 QQ 机器人或 QQ 聊天入口的用户。对这类用户而言，QQ 通道不是附属功能，而是 AI 助手与用户交互的核心入口之一，因此接口失配会直接影响实际使用体验。

### 满意 / 不满意信号

- 不满意点：外部平台接口更新后，项目适配不够及时。
- 满意点：暂无明确正向反馈。
- 维护风险：若该问题长期无响应，可能影响 QQ 通道用户对项目稳定性的信任。

---

## 8. 待处理积压

基于本次提供的数据，无法判断是否存在长期未响应的重要 Issue 或 PR。  
过去 24 小时内仅观察到 1 条新 Issue，暂无长期积压数据、历史未关闭问题列表或停滞 PR 信息。

当前建议维护者优先关注：

- [#3394：QQ机器人的接口更新了，但QQ聊天通道的接口似乎没有更新，希望修复](https://github.com/sipeed/picoclaw/issues/3394)

处理建议：

1. 尽快确认是否为真实接口不兼容问题。
2. 请求用户补充运行环境、版本号、错误日志和复现步骤。
3. 若确认 QQ 官方接口存在破坏性变更，应创建修复 PR 并在 Release Notes 中说明迁移影响。
4. 如暂时无法修复，可在 Issue 中提供临时规避方案或标注当前 QQ 通道支持的接口版本。

---

## 项目健康度评估

- 社区活跃度：低
- 代码推进活跃度：低
- 发布节奏：今日无发布
- 稳定性风险：中等，主要来自 QQ 通道接口兼容问题
- 维护关注重点：外部聊天平台接口适配与通道稳定性

总体来看，PicoClaw 今日项目活动较少，但新增 Issue 暴露出一个具有实际影响的渠道兼容性问题。建议维护者尽快确认 QQ 通道状态，以避免该问题扩大为更广泛的用户可用性故障。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
日期：2026-09-27  
仓库：github.com/qwibitai/nanoclaw  
统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时 NanoClaw 活跃度很高：新增或更新 Issues 3 条、PR 21 条，但没有 PR 合并、关闭或新版本发布。今日活动主要集中在 **skills 扩展、渠道能力增强、运维自动化、agent-runner/provider 可扩展性** 等方向，说明项目正在快速推进功能边界。

不过，用户侧同时报告了多个与 `/update-nanoclaw`、WhatsApp 依赖、安全公告、lockfile 稳定性相关的问题，显示当前升级链路存在一定回归风险。整体来看，项目研发活跃、路线清晰，但短期健康度受未合并 PR 积压和升级/依赖安全问题影响，需要维护者优先处理稳定性与安全修复。

---

## 2. 项目进展

今日没有已合并或已关闭的重要 PR，因此代码主线没有实际落地的新功能或修复。

不过，过去 24 小时打开了 21 个 PR，形成了明显的功能推进方向：

### Skills 与运维自动化方向

- [PR #3944 feat(skills): let /add-typesafe-tool call Jev through OpenRouter](https://github.com/nanocoai/nanoclaw/pull/3944)  
  让 `/add-typesafe-tool` 可通过 OpenRouter 调用 Jev，叠加在 #3848 之上。该 PR 指向更灵活的模型接入能力。

- [PR #3929 feat(skills): add /add-scheduled-update for unattended host-side updates](https://github.com/nanocoai/nanoclaw/pull/3929)  
  新增无人值守的 host-side 定时更新技能，试图解决 NanoClaw 自身更新需要宿主机权限、systemd/launchctl/Docker socket 等问题。

- [PR #3928 feat(skills): add /contribute-upstream operational skill](https://github.com/nanocoai/nanoclaw/pull/3928)  
  为自定义 fork 提供将本地特性贡献回上游的操作技能，体现项目在降低长期 fork 维护成本方面的路线。

- [PR #3937 feat(skills): add /add-repo-self-edit](https://github.com/nanocoai/nanoclaw/pull/3937)  
  允许指定 agent 提议修改 NanoClaw 自身源码，以 git patch 形式提交，并要求管理员审批与自动回滚。这是较强的“自我维护型 agent”能力，但也需要严格安全审查。

### Agent 可观测性与错误报告方向

- [PR #3939 feat(skills): add-turn-traces](https://github.com/nanocoai/nanoclaw/pull/3939)  
  增加 per-turn agent traces，记录每轮 agent 调用了哪些工具、输入输出如何，并存储在中心数据库中。该功能有助于调试、审计和问题复盘。

- [PR #3935 feat(skills): add /add-error-reports](https://github.com/nanocoai/nanoclaw/pull/3935)  
  当 NanoClaw 自身发生崩溃、任务脚本失败、消息处理失败时，将错误报告发送到指定聊天，而不是让用户从“沉默”中推断问题。

- [PR #3934 refactor: add an operational error sink seam](https://github.com/nanocoai/nanoclaw/pull/3934)  
  为宿主运行时的 plumbing failures 增加观测 seam，是 #3935 这类错误报告能力的基础设施。

### Channels 与消息体验方向

- [PR #3940 feat(slack): render collapsible send_card sections as Block Kit containers](https://github.com/nanocoai/nanoclaw/pull/3940)  
  让 Slack 中的 `send_card` 折叠内容以 Block Kit 容器展示，避免长日志、堆栈信息刷屏。该 PR 明确依赖 #3926 和 #3927。

- [PR #3927 feat(send_card): accept collapsible section children](https://github.com/nanocoai/nanoclaw/pull/3927)  
  扩展 `send_card`，支持可折叠 section child，解决长 trace 展示体验差的问题。

- [PR #3926 refactor(chat-sdk-bridge): add optional postCard hook](https://github.com/nanocoai/nanoclaw/pull/3926)  
  为渠道技能提供自定义渲染 `send_card` payload 的 hook，是更丰富卡片表现的基础设施。

- [PR #3936 feat(telegram): opt-in live progress message during long turns](https://github.com/nanocoai/nanoclaw/pull/3936)  
  Telegram 长任务期间显示可更新的 “Working on it…” 消息，降低用户等待时的不确定感。

- [PR #3923 fix(discord): connect the Gateway through Node's env proxy](https://github.com/nanocoai/nanoclaw/pull/3923)  
  修复 Discord Gateway 在仅能通过 HTTPS proxy 出网的环境下无法连接的问题。

### Agent runner / Provider 可扩展性方向

- [PR #3925 refactor(agent-runner): add provider-wrapper seam](https://github.com/nanocoai/nanoclaw/pull/3925)  
  增加 provider wrapper seam，支持按 query 切换模型和处理可重试失败，为模型 fallback、备用凭证、策略路由打基础。

- [PR #3930 fix(opencode): resolve config, runtime key and server env from one environment](https://github.com/nanocoai/nanoclaw/pull/3930)  
  修复 OpenCode payload 中配置解析、runtime key、server env 来源不一致的问题。

- [PR #3931 refactor(agent-runner): add a minimalContext provider option](https://github.com/nanocoai/nanoclaw/pull/3931)  
  允许 provider 在 minimal context 模式下运行，避免加载完整 Claude Code preset、用户/项目设置和内置工具。

- [PR #3932 feat(skills): add /add-lean-tasks](https://github.com/nanocoai/nanoclaw/pull/3932)  
  基于 minimalContext，为 scheduled tasks 提供更低成本、上下文更小的执行模式。

---

## 3. 社区热点

今日 Issues 和 PR 均无评论数与反应数的显著积累，公开讨论热度不高；但从新增内容看，热点集中在以下几个主题。

### 3.1 `/update-nanoclaw` 升级链路稳定性

- [Issue #3943 update-nanoclaw: controller imports setup/gateways and npm deps missing](https://github.com/nanocoai/nanoclaw/issues/3943)  
- [Issue #3942 Skill refresh during /update-nanoclaw validate rewrites pnpm-lock.yaml](https://github.com/nanocoai/nanoclaw/issues/3942)  
- [Issue #3941 channels still pins vulnerable baileys version](https://github.com/nanocoai/nanoclaw/issues/3941)

用户连续报告了 3 个与 `/update-nanoclaw`、skills refresh、channels 分支依赖固定相关的问题，说明升级工具链已成为当前最需要稳定化的区域。尤其是 #3943 指向升级后 `prepare` 阶段直接崩溃，属于阻断型问题。

### 3.2 消息卡片与长输出展示体验

- [PR #3926 postCard hook](https://github.com/nanocoai/nanoclaw/pull/3926)  
- [PR #3927 send_card collapsible section](https://github.com/nanocoai/nanoclaw/pull/3927)  
- [PR #3940 Slack collapsible Block Kit containers](https://github.com/nanocoai/nanoclaw/pull/3940)

这一组 PR 反映出用户在真实使用中经常遇到日志、堆栈、长输出刷屏的问题。项目正在从通用 card model 向 channel-native rich rendering 演进。

### 3.3 Agent 运维与自我修复能力

- [PR #3935 /add-error-reports](https://github.com/nanocoai/nanoclaw/pull/3935)  
- [PR #3937 /add-repo-self-edit](https://github.com/nanocoai/nanoclaw/pull/3937)  
- [PR #3929 /add-scheduled-update](https://github.com/nanocoai/nanoclaw/pull/3929)  
- [PR #3939 /add-turn-traces](https://github.com/nanocoai/nanoclaw/pull/3939)

这些 PR 显示 NanoClaw 正在向“可观测、可自动更新、可辅助维护自身”的个人 AI 助手/智能体运行平台发展。

---

## 4. Bug 与稳定性

按影响程度排序如下。

### 严重：WhatsApp 依赖存在安全风险且会被更新流程重新 pin

- [Issue #3941 channels still pins @whiskeysockets/baileys@7.0.0-rc.9, affected by GHSA-qvv5-jq5g-4cgg](https://github.com/nanocoai/nanoclaw/issues/3941)  
  问题：`channels` 分支仍固定 `@whiskeysockets/baileys@7.0.0-rc.9`，该版本受 GHSA-qvv5-jq5g-4cgg 影响，涉及 message spoofing。用户指出 `/add-whatsapp` 或 `/update-nanoclaw` 会重新 pin 到该版本。  
  影响：安全风险，且更新流程可能反复恢复到脆弱版本。  
  当前状态：Open。  
  已知 fix PR：未在今日数据中看到明确修复 PR。

### 严重：`/update-nanoclaw` 后 `prepare` 因缺失模块崩溃

- [Issue #3943 update-nanoclaw: controller imports setup/gateways and npm deps missing](https://github.com/nanocoai/nanoclaw/issues/3943)  
  问题：从 v2.3.x 更新到 NanoClaw 2.4.0/main 后，`update-nanoclaw` controller 导入了文档化 extraction 未提供的 `setup/gateways/` 和 npm 依赖，导致 `prepare` 阶段 `MODULE_NOT_FOUND`。  
  影响：升级路径中断，属于回归问题。  
  当前状态：Open。  
  已知 fix PR：未在今日数据中看到明确修复 PR。

### 中高：`/update-nanoclaw validate` 会改写 lockfile 并移除 git-hosted dependency integrity

- [Issue #3942 Skill refresh during /update-nanoclaw validate rewrites pnpm-lock.yaml](https://github.com/nanocoai/nanoclaw/issues/3942)  
  问题：在包含 WhatsApp/Baileys 依赖的安装中，`/update-nanoclaw validate` 过程会重写 `pnpm-lock.yaml`，并移除 git-hosted 依赖的 `integrity` hash。  
  影响：降低 lockfile 可复现性与供应链完整性，可能引发后续安装差异或审计风险。  
  当前状态：Open。  
  已知 fix PR：未在今日数据中看到明确修复 PR。

### 中等：Discord Gateway 不走 Node env proxy

- [PR #3923 fix(discord): connect the Gateway through Node's env proxy](https://github.com/nanocoai/nanoclaw/pull/3923)  
  问题：在依赖 `NODE_USE_ENV_PROXY=1` 或 `--use-env-proxy` 的环境下，Discord REST 可用，但 Gateway 连接不通过代理。  
  当前状态：PR Open，尚未合并。  
  影响：企业网络、受限网络、代理出网环境中的 Discord channel 可用性。

### 中等：OpenCode 环境解析不一致

- [PR #3930 fix(opencode): resolve config, runtime key and server env from one environment](https://github.com/nanocoai/nanoclaw/pull/3930)  
  问题：OpenCode payload 的配置解析、shared-runtime cache key、`opencode serve` 子进程环境可能来源不一致，导致配置和凭证不匹配。  
  当前状态：PR Open，尚未合并。

### 中等：agent container stderr 难以持久化排查

- [PR #3922 fix(drivers): add a per-session log sink for agent container stderr](https://github.com/nanocoai/nanoclaw/pull/3922)  
  问题：agent-runner 日志主要转发到 stderr，Docker `--rm` 容器退出后日志容易丢失。  
  当前状态：PR Open，尚未合并。  
  影响：问题复盘和生产排障困难。

---

## 5. 功能请求与路线图信号

今日新增 PR 显示项目短期路线大致分为五条主线。

### 5.1 更强的运维型 skills

可能进入下一版本的候选项：

- [PR #3929 /add-scheduled-update](https://github.com/nanocoai/nanoclaw/pull/3929)  
  自动化 NanoClaw 更新，适合长期运行的个人助手实例。

- [PR #3935 /add-error-reports](https://github.com/nanocoai/nanoclaw/pull/3935)  
  将系统自身故障推送到聊天，提升可运维性。

- [PR #3928 /contribute-upstream](https://github.com/nanocoai/nanoclaw/pull/3928)  
  面向 fork 用户的上游贡献流程辅助。

### 5.2 可观测性与审计

- [PR #3939 /add-turn-traces](https://github.com/nanocoai/nanoclaw/pull/3939)  
  每轮 agent 行为追踪，适合定位工具调用、上下文、执行结果问题。

- [PR #3922 per-session log sink](https://github.com/nanocoai/nanoclaw/pull/3922)  
  容器 stderr 持久化，提升生产排障能力。

这些功能共同表明，NanoClaw 正从“能运行”转向“可解释、可审计、可维护”。

### 5.3 多渠道体验增强

- [PR #3940 Slack collapsible send_card sections](https://github.com/nanocoai/nanoclaw/pull/3940)  
- [PR #3936 Telegram live progress message](https://github.com/nanocoai/nanoclaw/pull/3936)  
- [PR #3923 Discord proxy fix](https://github.com/nanocoai/nanoclaw/pull/3923)

方向上，项目正在强化不同聊天渠道的原生体验，而不是只提供最低限度的文本桥接。

### 5.4 低成本 scheduled tasks 与 minimal context

- [PR #3931 minimalContext provider option](https://github.com/nanocoai/nanoclaw/pull/3931)  
- [PR #3932 /add-lean-tasks](https://github.com/nanocoai/nanoclaw/pull/3932)

这组 PR 指向更低成本、更确定性的定时任务运行模式，尤其适合小模型、本地模型和批处理场景。

### 5.5 Agent 自我修改与语音能力

- [PR #3937 /add-repo-self-edit](https://github.com/nanocoai/nanoclaw/pull/3937)  
  高潜力但高风险，需要安全边界、审批流程、回滚机制和审计日志充分成熟。

- [PR #3938 /add-voice-replies](https://github.com/nanocoai/nanoclaw/pull/3938)  
  让 agent 能以语音回复，默认离线。该方向与语音输入、实时浏览器语音 channel 等既有工作形成互补。

---

## 6. 用户反馈摘要

今日 Issues 主要来自用户 bmultini，反馈集中在升级、依赖安全与可复现性上。

### 6.1 用户痛点：升级流程不够可靠

相关 Issue：

- [#3943](https://github.com/nanocoai/nanoclaw/issues/3943)  
- [#3942](https://github.com/nanocoai/nanoclaw/issues/3942)  
- [#3941](https://github.com/nanocoai/nanoclaw/issues/3941)

用户从 v2.3.x 升级到 v2.4.0/main 时遇到 `prepare` 崩溃、文档化 extraction 缺失模块、更新流程重复 pin 旧依赖等问题。这说明当前更新路径对真实安装环境、channels 分支、skills refresh、副作用控制的覆盖不足。

### 6.2 用户痛点：供应链完整性和 lockfile 可复现性

- [Issue #3942](https://github.com/nanocoai/nanoclaw/issues/3942)

用户明确关注 `pnpm-lock.yaml` 中 git-hosted dependencies 的 `integrity` hash 被移除。这类反馈显示 NanoClaw 用户并不只关注功能是否可用，也关注依赖来源、可复现安装和供应链安全。

### 6.3 用户痛点：WhatsApp 集成依赖安全

- [Issue #3941](https://github.com/nanocoai/nanoclaw/issues/3941)

WhatsApp channel 使用的 Baileys 版本涉及已公开安全公告，并且更新流程会重新 pin 到受影响版本。该反馈体现出 channels 分支与核心更新流程之间的依赖治理需要加强。

### 6.4 正向信号：用户在真实升级路径中复现并报告问题

这些 Issues 提供了版本号、commit、pnpm 版本、Node 版本、复现步骤，质量较高。维护者可以据此快速定位问题，说明社区反馈虽然数量不多，但可操作性强。

---

## 7. 待处理积压

### 7.1 今日新增 PR 积压较高：21 个 Open PR，0 个合并

过去 24 小时打开 21 个 PR，但没有合并或关闭。短期内需要维护者进行分组 review，否则容易形成依赖链阻塞。

重点依赖链如下：

#### send_card / Slack 折叠卡片链路

- [PR #3926 postCard hook](https://github.com/nanocoai/nanoclaw/pull/3926)  
- [PR #3927 send_card collapsible sections](https://github.com/nanocoai/nanoclaw/pull/3927)  
- [PR #3940 Slack Block Kit collapsible rendering](https://github.com/nanocoai/nanoclaw/pull/3940)

建议优先 review #3926 和 #3927，因为 #3940 明确依赖它们。

#### minimalContext / lean scheduled tasks 链路

- [PR #3931 minimalContext provider option](https://github.com/nanocoai/nanoclaw/pull/3931)  
- [PR #3932 /add-lean-tasks](https://github.com/nanocoai/nanoclaw/pull/3932)

建议先合并底层 provider option，再评估 `/add-lean-tasks` 的用户配置体验。

#### error sink / error reports 链路

- [PR #3934 operational error sink seam](https://github.com/nanocoai/nanoclaw/pull/3934)  
- [PR #3935 /add-error-reports](https://github.com/nanocoai/nanoclaw/pull/3935)

建议优先 review #3934，确认 no-op seam 的边界和错误分类，再合并上层 skill。

#### provider wrapper / opencode 环境一致性

- [PR #3925 provider-wrapper seam](https://github.com/nanocoai/nanoclaw/pull/3925)  
- [PR #3930 opencode env fix](https://github.com/nanocoai/nanoclaw/pull/3930)

这组 PR 与 provider 扩展、fallback、环境隔离相关，建议关注是否会影响现有 provider 行为。

### 7.2 高优先级未解决 Issues

以下 Issues 需要优先 triage：

- [Issue #3941 WhatsApp/Baileys 安全风险](https://github.com/nanocoai/nanoclaw/issues/3941)  
  建议优先级：P0/P1，涉及公开安全公告与 message spoofing。

- [Issue #3943 update-nanoclaw prepare 崩溃](https://github.com/nanocoai/nanoclaw/issues/3943)  
  建议优先级：P1，阻断升级路径。

- [Issue #3942 lockfile integrity 被移除](https://github.com/nanocoai/nanoclaw/issues/3942)  
  建议优先级：P1/P2，影响可复现性和供应链可信度。

### 7.3 长期未响应项

本次数据窗口只包含过去 24 小时活动，未提供长期未响应 Issue/PR 的创建时间分布和最后互动时间，因此无法可靠判断真正的长期积压项。

但从今日数据看，**短期积压风险已经出现**：21 个 PR 全部处于 Open 状态，且多个 PR 存在明显依赖顺序。如果维护者不及时分层合并或关闭，后续冲突和 review 成本会快速上升。

---

## 结论

NanoClaw 今日研发活跃度很高，功能路线明显向“更强的技能生态、更好的多渠道体验、更高可观测性、更自动化的运维能力”扩展。但项目当前最紧迫的问题不是新增功能，而是 **升级流程稳定性、WhatsApp 依赖安全、lockfile 可复现性**。

建议维护者优先处理：

1. [#3941](https://github.com/nanocoai/nanoclaw/issues/3941) WhatsApp/Baileys 安全版本更新与 channels pinning 策略。  
2. [#3943](https://github.com/nanocoai/nanoclaw/issues/3943) `/update-nanoclaw` 的 `MODULE_NOT_FOUND` 回归。  
3. [#3942](https://github.com/nanocoai/nanoclaw/issues/3942) `/update-nanoclaw validate` 改写 lockfile 的副作用。  
4. 分批 review 基础设施 PR，例如 [#3926](https://github.com/nanocoai/nanoclaw/pull/3926)、[#3931](https://github.com/nanocoai/nanoclaw/pull/3931)、[#3934](https://github.com/nanocoai/nanoclaw/pull/3934)，以降低后续 stacked PR 阻塞。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报  
日期：2026-09-27  
仓库：[`nullclaw/nullclaw`](https://github.com/nullclaw/nullclaw)

## 1. 今日速览

过去 24 小时内，NullClaw 没有新增或更新 Issue，也没有新版本发布，社区讨论面相对安静。  
项目活跃度主要体现在 Pull Request 层面：今日有 2 个新的待合并 PR，均为稳定性与运行安全相关修复。  
这两个 PR 分别聚焦于 agent 工具调用解析中的内存释放问题，以及 Discord 集成中机器人自触发消息循环的问题，说明维护重点偏向生产环境可靠性。  
整体来看，今日项目没有功能扩张信号，但有明确的质量修复推进，健康度表现为“低讨论、中等维护活跃”。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日没有已合并或已关闭的 PR，因此暂无正式进入主分支的变更。

不过，有 2 个新开的修复型 PR 值得关注：

### 待合并 PR

#### [#1011 fix(agent): free parsed tool call when a later allocation fails](https://github.com/nullclaw/nullclaw/pull/1011)

- 状态：OPEN
- 作者：vernonstinebaker
- 创建时间：2026-09-26
- 类型：稳定性 / 内存管理修复

该 PR 修复 `parseXmlToolCalls` 在解析工具调用时的资源释放问题。根据摘要，当前逻辑在 append 失败或后续分配失败时，可能导致已解析出的 `name`、`arguments` 等字段发生内存泄漏，同时错误路径也遗漏了 `tool_call_id` 的释放。

该修复属于底层可靠性改进，尤其对长时间运行的 agent 服务较重要。若 NullClaw 被部署为持续在线的个人 AI 助手或多会话 agent，内存泄漏会逐步放大，因此该 PR 对生产稳定性有实际价值。

#### [#1010 fix(discord): ignore messages the bot itself posted](https://github.com/nullclaw/nullclaw/pull/1010)

- 状态：OPEN
- 作者：vernonstinebaker
- 创建时间：2026-09-26
- 类型：集成稳定性 / 消息循环修复

该 PR 修复 Discord ingress 中机器人可能响应自己消息的问题。摘要显示，当部署配置中 `allow_bots = true` 时，机器人自己发送的消息也可能重新进入 agent 流程；如果回复内容开头包含机器人自己的 `@` 提及，还会满足 `require_mention` 条件，导致每一轮回复触发下一轮回复，形成自循环。

这是一个较高优先级的生产风险修复。对 Discord bot 类部署而言，该问题可能导致无限消息循环、频道刷屏、API 配额消耗或成本异常。该 PR 若合并，将显著提升 Discord 集成的安全性。

---

## 4. 社区热点

过去 24 小时没有 Issue 评论、反应或讨论数据，无法观察到明显的社区热点。

今日相对值得关注的是两个新开的修复 PR：

1. [#1010 fix(discord): ignore messages the bot itself posted](https://github.com/nullclaw/nullclaw/pull/1010)  
   - 关注点：Discord bot 自触发循环  
   - 背后诉求：避免 agent 在外部消息平台中因错误过滤逻辑而失控运行  
   - 适用场景：Discord bot、群组助手、需要 `require_mention` 的 bot 部署

2. [#1011 fix(agent): free parsed tool call when a later allocation fails](https://github.com/nullclaw/nullclaw/pull/1011)  
   - 关注点：工具调用解析过程中的内存泄漏  
   - 背后诉求：提升 agent 核心解析路径的健壮性  
   - 适用场景：长时间运行的 agent、频繁使用 tool call 的工作流

由于两者均暂无评论和反应，当前还不能判断社区优先级，但从风险角度看，#1010 对最终用户可见影响更直接，#1011 对系统长期稳定性更关键。

---

## 5. Bug 与稳定性

### 高严重度

#### Discord bot 可能响应自身消息并形成循环  
- 相关 PR：[ #1010 ](https://github.com/nullclaw/nullclaw/pull/1010)  
- 状态：已有 fix PR，待合并  
- 影响范围：Discord 集成、bot 部署、启用 `allow_bots = true` 且使用 mention 触发的场景  
- 风险评估：高

该问题可能导致 bot 对自己发送的消息持续响应，形成自动对话循环。实际影响包括频道刷屏、服务端负载上升、调用成本增加，以及用户体验受损。由于该问题可直接在生产环境暴露，建议维护者优先审查并合并。

### 中等严重度

#### agent 工具调用解析失败路径存在内存泄漏  
- 相关 PR：[ #1011 ](https://github.com/nullclaw/nullclaw/pull/1011)  
- 状态：已有 fix PR，待合并  
- 影响范围：`parseXmlToolCalls` 相关解析路径  
- 风险评估：中等，长运行场景下风险升高

当工具调用解析过程中 append 或后续内存分配失败时，已分配字段可能未被正确释放。单次影响可能有限，但在长时间运行、频繁工具调用或低内存环境中，泄漏可能累积并影响服务稳定性。

### 今日新增 Bug 报告

无新的 Issue 型 Bug 报告。

---

## 6. 功能请求与路线图信号

过去 24 小时没有新增功能请求 Issue，也没有明确的路线图讨论。

从当前 PR 可以推断，短期维护方向更偏向：

- 提升 agent 核心解析路径的内存安全性
- 加固外部平台 ingress，尤其是 Discord bot 的消息过滤逻辑
- 降低生产部署中的自触发、循环调用、资源泄漏风险

这些信号表明 NullClaw 当前可能处于稳定性打磨阶段，而不是大规模新增功能阶段。若近期准备发布下一个版本，#1010 和 #1011 都是较适合纳入补丁版本或小版本更新的修复项。

---

## 7. 用户反馈摘要

过去 24 小时没有 Issue 评论或用户讨论数据，因此没有可直接提炼的用户反馈。

从 PR 摘要间接反映出的潜在用户痛点包括：

- Discord bot 部署用户可能遭遇机器人自我回复、自循环或频道刷屏问题  
  - 相关 PR：[ #1010 ](https://github.com/nullclaw/nullclaw/pull/1010)

- 长时间运行 agent 的用户可能受到内存泄漏影响，尤其是在工具调用解析失败或异常路径下  
  - 相关 PR：[ #1011 ](https://github.com/nullclaw/nullclaw/pull/1011)

当前缺少来自 Issues 的真实用户场景描述，因此以上仅基于代码修复意图推断。

---

## 8. 待处理积压

根据本次提供的数据，过去 24 小时内没有长期未响应 Issue 或旧 PR 的更新记录，无法判断历史积压情况。

今日需要维护者关注的待处理项主要是两个新开的修复 PR：

1. [#1010 fix(discord): ignore messages the bot itself posted](https://github.com/nullclaw/nullclaw/pull/1010)  
   - 建议优先级：高  
   - 原因：可能引发生产环境消息循环和外部平台滥发

2. [#1011 fix(agent): free parsed tool call when a later allocation fails](https://github.com/nullclaw/nullclaw/pull/1011)  
   - 建议优先级：中高  
   - 原因：修复 agent 核心解析路径的内存泄漏问题，利于长期运行稳定性

---

## 总体健康度评估

- 活跃度：中低  
- 维护响应：中等，有新的修复 PR 提交  
- 社区讨论：低，过去 24 小时无 Issue 活动  
- 稳定性趋势：正向，今日 PR 均聚焦生产可靠性  
- 发布节奏：暂无新版本信号

NullClaw 今日没有明显的社区讨论和版本发布，但维护工作并未停滞。两个新 PR 都指向关键稳定性问题，尤其是 Discord 自触发循环修复，建议优先 review 并尽快合并。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-09-27）

## 1. 今日速览

过去 24 小时，IronClaw 仓库活跃度较低，仅有 1 条新 Issue 更新，未出现新的 Pull Request、合并记录或版本发布。今日唯一新增议题聚焦于 **NEAR 生态 token launchpad 工具接入**，说明社区仍在探索 IronClaw agent 与链上资产发行、交易工具的集成边界。由于没有 PR 推进和发布动作，项目代码层面今日暂无可见进展。整体来看，项目处于 **低频维护/需求收集状态**，但新增需求具备较明确的产品方向信号。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

过去 24 小时无新增、合并或关闭的 Pull Request。

- 合并 PR：0
- 关闭 PR：0
- 待合并 PR：0

因此，今日暂无可确认的代码级功能推进、Bug 修复或稳定性改进。项目进展主要体现在社区层面的新功能需求提出，而非实现落地。

---

## 4. 社区热点

### Feature: NEARA hosted-MCP extension  
- Issue：[#8112](https://github.com/nearai/ironclaw/issues/8112)  
- 状态：Open  
- 作者：iwaterheater  
- 创建时间：2026-09-26  
- 评论数：0  
- 👍：0  

该 Issue 是今日唯一新增社区动态，提出为 IronClaw agents 增加 **NEARA hosted-MCP extension** 的能力。核心诉求是让 IronClaw agent 能够在 NEAR 主网上与 token launchpad 交互，包括：

- 查询和报价新发行的 coins
- 发起 token launch
- 执行交易
- 通过 NEARA 提供的 hosted-MCP 工具实现无密钥或简化密钥管理的调用方式

从需求背景看，提出者认为当前 IronClaw agents 缺少对 NEAR token launchpad 场景的原生操作能力，限制了 agent 在链上资产发行和交易自动化中的可用性。

尽管该议题暂无评论或 reaction，但它释放出一个明确路线图信号：社区可能希望 IronClaw 从通用 agent 框架进一步扩展到 **链上金融操作、token launch 自动化和 MCP 工具生态集成**。

---

## 5. Bug 与稳定性

过去 24 小时未报告新的 Bug、崩溃、回归或稳定性问题。

当前数据中没有发现以下类型问题：

- 运行时崩溃
- agent 执行失败
- MCP 工具调用异常
- 安全或权限相关缺陷
- 回归问题
- 性能退化

因此今日稳定性风险较低。不过，由于没有新的修复 PR，也无法确认是否有未公开处理中的稳定性改进。

---

## 6. 功能请求与路线图信号

### 新增功能请求：NEARA hosted-MCP extension  
- Issue：[#8112](https://github.com/nearai/ironclaw/issues/8112)  
- 状态：Open  
- 类型：Feature request  

该需求希望 IronClaw agents 能够通过 NEARA 的 hosted-MCP extension 操作 NEAR token launchpad。结合 Issue 摘要，该功能可能覆盖以下能力模块：

1. **Launchpad 信息读取**
   - 获取新 coin 列表
   - 查看 token 报价
   - 查询流动性池信息

2. **Token 发行**
   - 发起新 token launch
   - 与 NEARA launchpad 的发行参数进行交互

3. **交易执行**
   - 支持 agent 对 launchpad token 进行买卖
   - 可能需要报价、滑点、交易确认等流程

4. **MCP 工具集成**
   - 以 MCP extension 形式向 agent 暴露能力
   - 降低 agent 与 NEAR 链上工具交互的集成成本

5. **Keyless / Hosted 能力**
   - Issue 标题中特别提到 “keyless”，说明用户关注点可能包括私钥托管、免密交互或更安全的凭证抽象。

目前没有对应 PR，因此该需求尚未进入实现阶段。是否进入下一版本取决于维护者对以下问题的判断：

- NEARA 是否属于 IronClaw 官方希望支持的核心生态集成
- hosted-MCP 的安全模型是否满足项目要求
- agent 执行链上交易时的权限、签名和风控如何设计
- 是否需要先引入通用 NEAR launchpad 工具接口，再适配 NEARA

路线图信号强度：**中等**。  
原因是需求场景清晰，但目前缺少评论、维护者反馈、设计文档或实现 PR 支撑。

---

## 7. 用户反馈摘要

今日 Issue 没有评论，因此无法从后续讨论中提炼多方反馈。不过从新增 Issue 本身可以归纳出以下用户痛点和使用场景：

### 用户痛点

- IronClaw agents 当前无法直接操作 NEAR token launchpad。
- 用户需要 agent 能够完成从发现新 token、报价、发行到交易的一整套链上流程。
- 当前缺少面向 NEARA/Rhea DCL 这类 NEAR DeFi 基础设施的工具适配。
- 链上交易场景中，密钥管理可能是重要门槛，因此提出了 keyless / hosted-MCP 方向。

### 使用场景

- 个人或自动化 agent 监控 NEAR 主网上的新 token launch。
- agent 自动查询新 coin 的价格和流动性。
- 使用自然语言或自动策略发起 token 创建。
- 通过 MCP 工具让 IronClaw agent 调用 NEARA launchpad 完成交易动作。

### 满意/不满意信号

- 不满意点：当前 IronClaw 缺少该类链上 launchpad 操作能力。
- 正向信号：用户认为 IronClaw agent 有潜力成为 NEAR 生态资产发行与交易自动化入口。

---

## 8. 待处理积压

基于今日提供的数据，未发现长期未响应的重要 Issue 或 PR。当前可见待处理事项主要是今日新增的功能请求：

### 待维护者 triage：NEARA hosted-MCP extension  
- Issue：[#8112](https://github.com/nearai/ironclaw/issues/8112)  
- 状态：Open  
- 当前评论：0  
- 当前反应：0  

建议维护者优先进行以下处理：

1. 标记 Issue 类型，例如 `feature`、`integration`、`mcp`、`near`。
2. 明确该功能是否符合 IronClaw 的项目边界。
3. 要求提出者补充：
   - NEARA hosted-MCP 的接口文档
   - 预期工具列表
   - 权限和签名模型
   - 示例 agent workflow
4. 评估安全风险，尤其是 token 发行和交易操作中的授权、资金安全、滑点控制与用户确认机制。
5. 若方向认可，可拆分为更小的实施任务：
   - 只读查询工具
   - 报价工具
   - launch 工具
   - 交易执行工具
   - keyless 授权支持

---

## 项目健康度判断

今日 IronClaw 仓库整体活跃度偏低，未出现代码合并、版本发布或 Bug 修复。社区侧虽只有 1 条新增 Issue，但该需求具备较强的生态集成价值，指向 NEAR DeFi、MCP 工具和 agent 链上执行能力的结合。短期健康度表现为 **稳定但推进有限**；中长期看，如果维护者能够围绕 MCP extension 和 NEAR launchpad 工具建立清晰集成路径，该方向可能成为 IronClaw 在个人 AI 助手与链上 agent 场景中的重要扩展点。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报｜2026-09-27

## 1. 今日速览

过去 24 小时，LobsterAI 没有新的 Issue 更新，但 Pull Request 活跃度较高，共有 4 条 PR 更新，其中 2 条仍处于 Open 状态，2 条已关闭。  
今日开发活动主要集中在 **renderer、artifacts、Markdown 编辑、OpenClaw 启动稳定性、Word 文档编辑能力** 等方向，显示项目当前重点仍在增强桌面端交互与文档/制品编辑体验。  
从活跃度看，虽然社区反馈层面较安静，但核心维护者仍在持续推进功能拆分、开发体验修复与新能力建设，项目工程演进保持健康。  
暂无新版本发布，因此今日变更更多体现为主干开发和即将进入版本的功能准备。

---

## 2. 项目进展

### 已关闭 / 已完成 PR

#### 1. Refactor Markdown 实时编辑引擎模块拆分  
- PR：[#2767 refactor(markdown): split live-editing engine into structure/commands/widgets modules](https://github.com/netease-youdao/LobsterAI/pull/2767)  
- 状态：Closed  
- 涉及领域：`renderer`、`docs`、`artifacts`  
- 作者：fisherdaddy  

该 PR 将原本较为庞大的 `markdownLivePreview` 实现拆分为多个职责更清晰的模块：

- `markdownLiveStructure`：负责语法与行结构解析
- `markdownEditorCommands`：负责 inline / block 编辑命令
- `markdownLiveWidgets`：负责预览组件与交互部件

这类重构不会直接体现为用户可见功能，但对后续 Markdown 实时编辑能力、制品面板维护、文档编辑扩展都有明显的工程价值。  
它降低了单一模块复杂度，也为后续功能如富文本命令、块级编辑、组件化预览等能力提供了更清晰的扩展点。

**项目推进判断：**  
这是一次偏底层的结构性优化，有助于提升 artifacts / Markdown 编辑系统的可维护性和后续迭代速度。

---

#### 2. OpenClaw 网关启动超时扩展修复  
- PR：[#2768 fix: openclaw gateway startup timeout extension](https://github.com/netease-youdao/LobsterAI/pull/2768)  
- 状态：Closed  
- 涉及领域：`main`、`openclaw`  
- 作者：fisherdaddy  

该 PR 针对 OpenClaw Gateway 启动超时问题进行了修复或调整。虽然摘要为空，但从标题判断，该变更可能是为了应对 OpenClaw 网关初始化时间较长导致的启动失败、误判超时或环境差异下的不稳定问题。

**项目推进判断：**  
该修复属于稳定性增强，尤其对依赖 OpenClaw 子系统的用户或开发者较重要。它可能降低启动阶段的失败率，提升本地运行和集成体验。

---

### 当前仍待合并 PR

#### 1. Word 文档编辑能力  
- PR：[#2770 Feat: word document editing](https://github.com/netease-youdao/LobsterAI/pull/2770)  
- 状态：Open  
- 涉及领域：`renderer`、`build`、`docs`、`main`、`openclaw`、`skills`、`artifacts`  
- 作者：fisherdaddy  

这是今日最值得关注的功能型 PR。它涉及多个核心模块，说明 Word 文档编辑能力并非单一 UI 改动，而可能贯穿：

- 前端渲染层
- 文档 artifacts 管理
- 技能系统
- OpenClaw 调用链
- 构建流程
- 主进程能力
- 文档说明

从范围看，这可能是 LobsterAI 向“文档生产 / 办公自动化 / AI 助手编辑器”方向的重要扩展。  
如果合并，该功能很可能成为下一版本的重要亮点之一。

---

#### 2. 修复 Vite 开发模式下 artifacts 源文件未热更新问题  
- PR：[#2769 fix(dev): stop Vite watch from ignoring renderer artifact sources](https://github.com/netease-youdao/LobsterAI/pull/2769)  
- 状态：Open  
- 涉及领域：`renderer`  
- 作者：fisherdaddy  

该 PR 修复了开发环境中的热更新问题。此前由于 `**/artifacts/**` 排除规则过宽，导致 `src/renderer/components/artifacts/` 也被 Vite watch 忽略，进而造成以下模块无法在 `electron:dev` 中热重载：

- artifact panel
- artifact renderers
- Markdown editor

PR 的修复方式是将排除规则锚定到 repo 根目录的 `artifacts/` scratch directory，避免误伤 renderer 内部的 artifacts 源码目录。

**项目推进判断：**  
这是典型的开发体验修复。虽然对终端用户影响不大，但对贡献者和维护者很关键，可显著提升 artifacts 与 Markdown 编辑器相关功能的开发效率。

---

## 3. 社区热点

今日无 Issue 更新，PR 评论数与反应数均未显示明显社区讨论热度。根据 PR 覆盖范围和功能价值，今日关注度最高的变更主要是以下两个：

### 1. Word 文档编辑能力  
- PR：[#2770 Feat: word document editing](https://github.com/netease-youdao/LobsterAI/pull/2770)  
- 热点原因：功能范围广，涉及 artifacts、skills、renderer、main、OpenClaw 等多个核心模块。  
- 背后诉求：项目可能正在从聊天式 AI 助手进一步扩展到“可操作文档”的生产力工具，满足用户对 AI 编辑、生成、修改 Office 文档的需求。

### 2. Markdown 实时编辑引擎模块化  
- PR：[#2767 refactor(markdown): split live-editing engine into structure/commands/widgets modules](https://github.com/netease-youdao/LobsterAI/pull/2767)  
- 热点原因：虽然是重构，但直接关系到 artifacts 与文档编辑体验的长期演进。  
- 背后诉求：开发团队可能希望为更复杂的文档编辑、实时预览、块级编辑器或富文本交互能力提前打基础。

---

## 4. Bug 与稳定性

### 中等优先级：OpenClaw Gateway 启动超时问题  
- PR：[#2768 fix: openclaw gateway startup timeout extension](https://github.com/netease-youdao/LobsterAI/pull/2768)  
- 状态：Closed  
- 是否已有 fix PR：是  
- 涉及模块：`main`、`openclaw`

该问题可能影响 OpenClaw Gateway 的启动稳定性。若网关启动时间较长，旧有超时设置可能导致启动流程提前失败。该 PR 已关闭，说明修复已完成或对应分支处理完毕。

---

### 中低优先级：Vite watch 忽略 renderer artifacts 源码导致开发热更新失效  
- PR：[#2769 fix(dev): stop Vite watch from ignoring renderer artifact sources](https://github.com/netease-youdao/LobsterAI/pull/2769)  
- 状态：Open  
- 是否已有 fix PR：是，待合并  
- 涉及模块：`renderer`

该问题主要影响开发者体验，而非线上用户功能。由于 artifacts 源码目录被错误排除，artifact panel、artifact renderers 和 Markdown editor 修改后无法热重载，会降低相关功能开发与调试效率。

---

### 今日未发现新的用户报告 Bug

过去 24 小时没有新的 Issue，因此没有来自用户侧的新崩溃、回归或兼容性问题报告。

---

## 5. 功能请求与路线图信号

### Word 文档编辑能力可能进入后续版本路线图  
- PR：[#2770 Feat: word document editing](https://github.com/netease-youdao/LobsterAI/pull/2770)  
- 状态：Open

该 PR 是今日最强的路线图信号。结合其涉及模块，可以判断 LobsterAI 可能正在加强以下方向：

- 文档类 artifacts 的创建与编辑
- AI 辅助 Office 文档处理
- renderer 内文档编辑 UI
- skills 与文档操作能力的结合
- OpenClaw 与本地文档工具链的协作

如果该 PR 后续合并，LobsterAI 可能会从 Markdown / artifacts 编辑进一步扩展到更通用的办公文档处理场景。

---

### Markdown / artifacts 编辑体验仍是重点演进方向  
- PR：[#2767](https://github.com/netease-youdao/LobsterAI/pull/2767)  
- PR：[#2769](https://github.com/netease-youdao/LobsterAI/pull/2769)

今日多个变更都与 artifacts 和 Markdown 编辑相关，说明该区域是项目近期重点。  
从重构与开发体验修复来看，团队可能正在为更复杂的编辑器能力做准备，而不仅是修补现有 UI。

---

## 6. 用户反馈摘要

过去 24 小时没有新的 Issue，也没有可见的高互动评论或用户讨论数据，因此无法从 Issue 评论中提炼新的真实用户反馈。

基于今日 PR 内容，可以间接观察到以下潜在用户痛点：

- 用户可能需要更强的文档编辑能力，而不仅是文本生成或 Markdown 预览。
- 开发者在 artifacts 和 Markdown 编辑器开发过程中遇到热更新失效，影响调试效率。
- OpenClaw Gateway 启动过程可能在部分环境下不够稳定，需要更宽松或更合理的超时处理。

---

## 7. 待处理积压

基于本次提供的 24 小时数据，暂无长期未响应的 Issue 或 PR 可识别。当前需要维护者重点关注的是两个仍处于 Open 状态的 PR：

### 1. Word 文档编辑功能待评审 / 合并  
- PR：[#2770 Feat: word document editing](https://github.com/netease-youdao/LobsterAI/pull/2770)  
- 状态：Open  
- 建议关注点：
  - 是否引入新的构建依赖
  - Word 文档编辑能力的兼容性与边界条件
  - artifacts 与 skills 的接口是否稳定
  - 是否需要补充用户文档和迁移说明
  - 是否影响现有 Markdown / artifacts 编辑流程

### 2. Vite watch 规则修复待合并  
- PR：[#2769 fix(dev): stop Vite watch from ignoring renderer artifact sources](https://github.com/netease-youdao/LobsterAI/pull/2769)  
- 状态：Open  
- 建议关注点：
  - 确认根目录 `artifacts/` 排除规则仍然有效
  - 验证 `src/renderer/components/artifacts/` 下文件变更可正常触发热更新
  - 避免 watch 范围扩大导致开发模式性能下降

---

## 项目健康度判断

今日 LobsterAI 的用户反馈面较安静，但核心开发活动持续推进。  
从 PR 内容看，项目处于较积极的功能扩展和架构整理阶段，尤其是文档编辑、artifacts、Markdown 实时编辑和 OpenClaw 稳定性方向。  
短期内建议维护者优先完成 Word 文档编辑 PR 的评审与测试，同时尽快合并 Vite watch 修复，以提升后续 artifacts 相关开发效率。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报  
**日期：2026-09-27**  
**仓库：** [moltis-org/moltis](https://github.com/moltis-org/moltis)

---

## 1. 今日速览

过去 24 小时，Moltis 项目整体活跃度较低，未出现新的 Issue、Issue 更新或版本发布。  
今日唯一更新来自 1 个开放中的 Pull Request，内容为文档层面的部署入口补充，未涉及核心功能、架构调整或 Bug 修复。  
从当前数据看，项目今日处于轻量维护状态，主要活动集中在提升部署可达性与用户上手体验。  
暂无明显社区讨论、Bug 报告或路线图变化信号。

---

## 2. 版本发布

过去 24 小时无新版本发布。

---

## 3. 项目进展

今日没有已合并或已关闭的 PR，因此尚未产生实际进入主分支的功能变更或修复。

### 待合并 PR

#### [#1285 docs: add RepoCloud one-click deploy button](https://github.com/moltis-org/moltis/pull/1285)  
- **状态：** OPEN  
- **作者：** cosark  
- **创建时间：** 2026-09-26  
- **更新时间：** 2026-09-26  
- **类型：** 文档 / 部署体验改进  
- **反应：** 👍 0  
- **评论数：** 数据未提供  

该 PR 向 `README.md` 的 Cloud Deployment 表格中新增 RepoCloud 一键部署入口，并添加指向 `https://repocloud.io/details/Moltis/` 的部署按钮。  
这项变更不影响运行时代码，但有助于降低新用户部署门槛，尤其是希望通过云平台快速体验 Moltis 的用户。

**项目推进评估：**  
- 核心功能推进：无  
- 稳定性改进：无  
- 文档与可访问性改进：轻微推进  
- 对下一版本影响：若合并，可能作为文档改进进入后续发布说明，但不构成版本级功能更新

---

## 4. 社区热点

今日没有高评论量、高反应数的 Issue 或 PR。

唯一有更新的 PR 是：

#### [#1285 docs: add RepoCloud one-click deploy button](https://github.com/moltis-org/moltis/pull/1285)  
该 PR 暂无点赞反应，评论数据未提供，尚不能判断是否形成社区热点。

**潜在诉求分析：**  
新增一键部署入口通常反映出项目希望降低试用和部署成本。对于 AI 智能体与个人 AI 助手类项目而言，部署复杂度往往是用户采用的重要门槛，因此云部署按钮属于提升转化率和新手体验的基础设施型改进。

---

## 5. Bug 与稳定性

过去 24 小时未报告新的 Bug、崩溃、回归问题或稳定性相关 Issue。

当前无可关联的修复 PR。

| 严重程度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| 高 | 无 | - | - |
| 中 | 无 | - | - |
| 低 | 无 | - | - |

---

## 6. 功能请求与路线图信号

过去 24 小时未新增功能请求类 Issue。

不过，当前开放 PR 显示出一个轻微信号：

#### 部署体验继续扩展  
- 相关 PR：[ #1285 docs: add RepoCloud one-click deploy button](https://github.com/moltis-org/moltis/pull/1285)  
- 信号类型：文档与部署生态扩展  
- 可能影响：提升项目在不同云部署平台上的可见性和可试用性  
- 纳入下一版本可能性：中等，取决于维护者是否接受 RepoCloud 作为 README 中的官方推荐部署入口之一

该变更不代表核心产品路线图变化，但表明项目仍在优化新用户进入路径。

---

## 7. 用户反馈摘要

过去 24 小时没有新的 Issue 评论或用户反馈数据，因此无法提炼新增用户痛点、使用场景或满意度变化。

基于现有 PR 内容，仅能观察到一个间接反馈方向：  
- 用户或贡献者可能希望 Moltis 提供更多低门槛部署方式。  
- README 中的云部署表格仍是项目 onboarding 的重要入口。  
- 一键部署能力可能对非深度技术用户、快速评估用户、个人 AI 助手部署场景有帮助。

---

## 8. 待处理积压

本次数据未提供长期未响应的 Issue 或 PR 列表，因此无法识别历史积压项。

当前可关注的未处理项：

#### [#1285 docs: add RepoCloud one-click deploy button](https://github.com/moltis-org/moltis/pull/1285)  
- **状态：** 待合并  
- **建议维护者关注点：**
  - RepoCloud 链接是否稳定、可信、长期可维护  
  - README 中部署平台展示标准是否一致  
  - 是否需要对第三方部署按钮增加安全或免责声明  
  - 是否与现有 DigitalOcean 部署按钮格式完全一致

---

## 项目健康度简评

今日 Moltis 仓库活动较少，无 Issue 流入、无版本发布、无合并记录，说明短期内项目处于低噪声维护状态。  
唯一更新集中在部署文档增强，属于低风险、低复杂度改进。  
从健康度角度看，当前没有暴露新的稳定性风险，但也缺少核心功能推进和社区讨论信号。维护者可优先处理开放 PR，以保持贡献响应速度和文档及时性。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报｜2026-09-27

> 数据说明：本日报基于过去 24 小时 GitHub 动态生成。数据中的 Issue/PR 链接指向 `agentscope-ai/QwenPaw`，以下按原始数据链接呈现。

---

## 1. 今日速览

过去 24 小时项目活跃度中等偏高：共有 **3 条 Issue 更新**、**3 条 PR 更新**，但 **暂无 PR 合并**、**暂无新版本发布**。  
今日动态主要集中在 **前端控制台体验、任务状态一致性、国际化错误提示、企业微信 Markdown 渲染兼容性** 等稳定性问题。  
值得关注的是，Issue #7995 在当天即出现对应修复 PR #7996，说明维护响应较快；但其他两个开放 PR 仍处于待合并状态，短期内需要 Review 推进。  
整体来看，项目当前处于 **问题快速暴露与修复候选积累阶段**，健康度良好，但仍需尽快合并修复以降低用户侧回归感知。

---

## 2. 项目进展

今日 **无已合并 PR**，因此主干代码尚未实际推进。不过有 3 个待合并 PR 对稳定性和用户体验改进较明确：

### 待合并 PR

1. **#7996 fix(console): refresh expanded folders in Files panel**  
   链接：<https://github.com/agentscope-ai/QwenPaw/pull/7996>  
   关联 Issue：[#7995](https://github.com/agentscope-ai/QwenPaw/issues/7995)  
   进展说明：  
   - 修复 Files 面板刷新时，已展开目录不会同步磁盘新增文件的问题。  
   - 保持目录展开状态，同时重新加载已展开的 workspace 目录及嵌套目录。  
   - 对折叠目录丢弃缓存，并避免旧的异步响应覆盖新结果。  
   - 若合并，将直接改善 agent 写入文件后用户无法及时看到结果的问题。

2. **#7993 fix(i18n): add two missing error strings used by unguarded call sites**  
   链接：<https://github.com/agentscope-ai/QwenPaw/pull/7993>  
   进展说明：  
   - 补齐 `common.operationFailed` 与 `voiceTranscription.loadFailed` 两个缺失的 i18n 文案。  
   - 解决错误 toast 直接显示翻译 key 的问题。  
   - 属于小范围但高可见度的体验修复。

3. **#7992 fix(wecom): stop treating prose containing a pipe as a markdown table**  
   链接：<https://github.com/agentscope-ai/QwenPaw/pull/7992>  
   进展说明：  
   - 修复企业微信通道中普通文本包含 `|` 时被误判为 Markdown 表格的问题。  
   - 防止 `_format_table()` 错误插入表格分隔行。  
   - 对使用 WeCom 输出技术文本、表达式或包含竖线符号的内容场景较重要。

今日项目实际推进度：**代码层面尚未落地合并，但已形成 3 个可 Review 的修复候选**。

---

## 3. 社区热点

### 1. Files 面板刷新不更新已展开目录

- Issue：[#7995 [Bug]: Files panel refresh leaves expanded folders stale](https://github.com/agentscope-ai/QwenPaw/issues/7995)  
- PR：[#7996 fix(console): refresh expanded folders in Files panel](https://github.com/agentscope-ai/QwenPaw/pull/7996)  
- 状态：Issue Open，已有 Fix PR  
- 评论数：1  
- 反应数：0  

**诉求分析：**  
用户在 agent 或外部进程向 workspace 写入文件后，希望 Files 面板的刷新按钮能立即反映磁盘状态。目前问题是，已展开目录仍显示旧缓存，用户必须刷新整个浏览器页面才能看到新增文件。这属于典型的 **Agent 工作流可见性问题**：当 AI 生成或修改文件后，用户需要即时确认产物是否存在、路径是否正确、内容是否生成成功。

**影响面：**  
对依赖文件面板观察 agent 输出的用户影响较明显，尤其是代码生成、文档生成、自动化任务执行等场景。

---

### 2. 上下文状态显示与压缩行为不符合预期

- Issue：[#7994 [Bug]: 上下文显示状态信息不及时更新和不压缩](https://github.com/agentscope-ai/QwenPaw/issues/7994)  
- 状态：Closed，标签包含 `Close-and-review-later`  
- 评论数：1  
- 反应数：0  

**诉求分析：**  
用户反馈两个问题：  
1. 上下文显示圈在切换对话或新建对话后仍显示旧会话数据。  
2. 上下文显示已达 `91.7K / 131.1K`，并且压缩阈值设置为 0.5，但点击压缩却提示少于 3 个对话而不执行压缩。

这反映出用户对 **上下文窗口状态准确性** 与 **手动压缩可控性** 的关注。上下文显示若滞后，会直接影响用户判断当前会话是否接近模型上限；压缩逻辑若与 UI 展示不一致，会降低用户对上下文管理机制的信任。

**备注：**  
该 Issue 已关闭，但从标签 `Close-and-review-later` 看，可能并非彻底修复，而是后续再评估。建议维护者避免该类问题沉入积压。

---

### 3. TaskTracker 运行任务数统计不一致

- Issue：[#7991 TaskTracker _runs zombie entries inflate running_task_count, disagree with /api/chats](https://github.com/agentscope-ai/QwenPaw/issues/7991)  
- 状态：Open  
- 评论数：1  
- 反应数：0  

**诉求分析：**  
用户发现 dashboard 显示 “2 running tasks”，但 `/api/chats` 仅返回 1 个 `status="running"` 的 chat。问题指向 `task_tracker.get_global_status()` 与 `tracker.get_status(chat_id)` 的统计范围或清理逻辑不一致，可能存在 `_runs` 僵尸条目。

**影响面：**  
这类问题会影响任务运行状态的可信度，尤其是在多任务、多会话、长时间运行 agent 的场景下。若 dashboard 持续显示不存在的运行任务，用户可能误以为系统卡死、任务未结束或后台资源泄漏。

---

## 4. Bug 与稳定性

按潜在严重程度排序如下：

### 高优先级

#### 1. TaskTracker 僵尸运行记录导致任务数虚高

- Issue：[#7991](https://github.com/agentscope-ai/QwenPaw/issues/7991)  
- 状态：Open  
- 是否已有 Fix PR：暂无  
- 类型：任务状态一致性 / 后端状态管理  
- 影响：Dashboard 与 API 状态不一致，可能误导用户判断任务是否仍在运行。  

**建议：**  
优先检查 `_runs` 生命周期管理、异常退出清理逻辑，以及全局统计和按 chat 统计的作用域是否一致。

---

### 中高优先级

#### 2. 上下文状态不及时更新，压缩判断与 UI 显示不一致

- Issue：[#7994](https://github.com/agentscope-ai/QwenPaw/issues/7994)  
- 状态：Closed  
- 是否已有 Fix PR：未见关联 PR  
- 类型：上下文管理 / UI 状态同步  
- 影响：用户无法准确判断当前会话上下文占用；压缩策略表现不符合用户预期。  

**建议：**  
虽然 Issue 已关闭，但建议维护者复核：  
- 会话切换时上下文统计是否重新拉取或清空旧状态；  
- 压缩阈值与“少于 3 个对话不压缩”的规则是否存在优先级冲突；  
- UI 展示的 token 使用量是否与压缩逻辑读取的是同一数据源。

---

### 中优先级

#### 3. Files 面板刷新后已展开目录仍使用旧缓存

- Issue：[#7995](https://github.com/agentscope-ai/QwenPaw/issues/7995)  
- Fix PR：[#7996](https://github.com/agentscope-ai/QwenPaw/pull/7996)  
- 状态：Issue Open，PR Open  
- 类型：前端缓存 / 文件浏览器刷新逻辑  
- 影响：agent 写入文件后，用户无法通过面板刷新看到新文件，需要整页 reload。  

**建议：**  
尽快 Review 并合并 #7996，同时增加针对嵌套目录、并发刷新、旧请求返回覆盖新请求的测试。

---

### 中低优先级

#### 4. 企业微信 Markdown 表格识别过宽

- PR：[#7992](https://github.com/agentscope-ai/QwenPaw/pull/7992)  
- 状态：Open  
- 类型：消息格式化 / 渠道兼容性  
- 影响：普通文本中包含 `|` 时会被错误转换为表格。  

**建议：**  
合并前重点验证合法 Markdown 表格仍可正常格式化，同时普通 prose、代码片段、逻辑表达式不会被误处理。

---

#### 5. 缺失国际化错误文案导致 toast 显示 key

- PR：[#7993](https://github.com/agentscope-ai/QwenPaw/pull/7993)  
- 状态：Open  
- 类型：i18n / UI 错误提示  
- 影响：错误提示不友好，影响用户理解失败原因。  

**建议：**  
该 PR 风险较低，适合快速合并。后续可增加 i18n key 静态检查，避免类似遗漏。

---

## 5. 功能请求与路线图信号

今日没有明确的新功能请求，主要是 Bug 与体验修复。不过从用户反馈可提炼出几个潜在路线图信号：

### 1. 更可靠的文件系统同步体验

- 相关 Issue：[#7995](https://github.com/agentscope-ai/QwenPaw/issues/7995)  
- 相关 PR：[#7996](https://github.com/agentscope-ai/QwenPaw/pull/7996)  

用户期望 agent 对文件系统的操作能被 UI 实时或准实时反映。未来可能演进方向包括：  
- workspace 文件变化自动监听；  
- Files 面板局部刷新；  
- 文件生成完成后的显式提示；  
- agent 输出产物与文件树联动高亮。

### 2. 上下文窗口与压缩策略透明化

- 相关 Issue：[#7994](https://github.com/agentscope-ai/QwenPaw/issues/7994)  

用户不仅希望看到上下文占用量，还希望理解系统为何压缩或不压缩。未来可考虑：  
- 明确展示压缩触发条件；  
- 区分 token 阈值、消息数量阈值、对话数量阈值；  
- 在无法压缩时给出具体原因，而非笼统提示。

### 3. 多任务状态统计一致性

- 相关 Issue：[#7991](https://github.com/agentscope-ai/QwenPaw/issues/7991)  

任务追踪是 agent 平台核心能力之一。用户对 dashboard 状态准确性有较高预期。未来可能需要：  
- 统一任务状态数据源；  
- 增加任务清理机制；  
- 暴露异常任务重置或回收入口；  
- 增强运行中任务的可观测性。

---

## 6. 用户反馈摘要

今日用户反馈集中体现出以下痛点：

1. **“我知道文件已经生成，但 UI 看不到。”**  
   来自 [#7995](https://github.com/agentscope-ai/QwenPaw/issues/7995)。  
   用户场景是 agent 或外部进程在磁盘上新增文件，但 Files 面板刷新仍不显示。用户不得不刷新浏览器页面，打断工作流。

2. **“上下文状态看起来不可信。”**  
   来自 [#7994](https://github.com/agentscope-ai/QwenPaw/issues/7994)。  
   用户在切换会话、新建会话后仍看到旧上下文数据；同时压缩行为与 token 占用显示不一致，造成困惑。

3. **“Dashboard 的运行任务数和 API 对不上。”**  
   来自 [#7991](https://github.com/agentscope-ai/QwenPaw/issues/7991)。  
   用户通过 dashboard 与 `/api/chats` 对比发现运行任务数不一致，说明高级用户正在主动排查系统内部状态，也意味着此类不一致容易削弱对系统稳定性的信心。

4. **“错误提示应当可读，而不是显示翻译 key。”**  
   来自 [#7993](https://github.com/agentscope-ai/QwenPaw/pull/7993)。  
   虽然不是直接 Issue，但 PR 指向真实体验问题：错误场景下，用户更需要清晰反馈。

---

## 7. 待处理积压

由于本日报仅覆盖过去 24 小时动态，未观察到长期未响应的历史积压。但以下开放事项建议维护者优先关注：

### 需要 Review / 合并的 PR

1. **#7996 Files 面板刷新修复**  
   链接：<https://github.com/agentscope-ai/QwenPaw/pull/7996>  
   优先级：高  
   原因：已有明确用户报告和直接修复，影响 agent 文件产物可见性。

2. **#7993 i18n 缺失文案修复**  
   链接：<https://github.com/agentscope-ai/QwenPaw/pull/7993>  
   优先级：中  
   原因：低风险体验修复，适合快速合并。

3. **#7992 企业微信 Markdown 表格误判修复**  
   链接：<https://github.com/agentscope-ai/QwenPaw/pull/7992>  
   优先级：中  
   原因：影响 WeCom 渠道消息格式正确性，建议补充回归用例后合并。

### 需要进一步诊断的 Issue

1. **#7991 TaskTracker 运行任务数不一致**  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/7991>  
   优先级：高  
   原因：可能涉及任务生命周期清理、僵尸状态、dashboard 统计准确性。

2. **#7994 上下文状态与压缩行为问题**  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/7994>  
   优先级：中高  
   原因：虽然已关闭，但标签显示可能需要后续复核。建议不要完全忽略该类上下文管理体验问题。

---

## 总体健康度评估

- **活跃度：中等偏高**  
  24 小时内有 3 个 Issue 与 3 个 PR 更新，说明用户反馈和修复提交都较活跃。

- **维护响应：较好**  
  #7995 当日已有对应修复 PR #7996，响应速度积极。

- **稳定性风险：中等**  
  当前问题多集中在状态同步、缓存刷新、任务统计、上下文管理等“可信度”相关模块，虽然不一定造成崩溃，但会影响用户对系统行为的判断。

- **短期建议：**  
  优先 Review 并合并 #7996、#7993、#7992；同时尽快为 #7991 明确复现路径和修复方案，并复核 #7994 是否确实可关闭。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报  
日期：2026-09-27  
仓库：github.com/zeroclaw-labs/zeroclaw

## 1. 今日速览

过去 24 小时 ZeroClaw 保持高强度开发节奏：Issues 更新 6 条，PR 更新 49 条，其中 47 条仍待合并，2 条已关闭或合并。今日工作重心明显集中在 **RPC / gateway 拆分、runtime 稳定性、配置清理、安全边界、测试去抖动** 等方向，显示项目正处于较活跃的架构演进期。  
从 PR 规模看，多个 `size:XL` 的 RPC parity、runtime capabilities、session-owned turns 等改动同时推进，说明 v0.9.0 相关核心重构仍在密集落地。与此同时，新增 flaky test、stream recovery、pairing code 暴露等问题表明当前 CI 与安全边界仍需维护者重点关注。整体健康度评估为：**活跃度高，但待合并队列偏长，且 stacked PR 较多，合并风险与 review 压力较大**。

---

## 2. 项目进展

### 已关闭 / 合并的重要 PR

#### PR #11189：修复 parser 对 browser / search 工具语义的保留  
链接：zeroclaw-labs/zeroclaw PR #11189  
状态：CLOSED  
作者：Xscaperrr  

该 PR 修复共享 text-call alias resolver 中对 `browser_open`、`browser`、`web_search` 等工具调用身份的处理，避免这些调用被错误解析为 shell 输入。  
这类修复对 agent 工具调用可靠性很关键，尤其影响浏览器工具、搜索工具等外部信息检索能力。

相关仍开放 PR：

- PR #11188：zeroclaw-labs/zeroclaw PR #11188  
  与 #11189 内容高度相似，当前仍为 OPEN，可能是 #11189 的后续或替代分支，建议维护者确认是否需要关闭重复 PR 或合并有效版本。

### 今日主要推进方向

#### RPC / Gateway 拆分继续快速推进

多个 PR 明确指向 v0.9.0 gateway split / core parity 路线：

- PR #11182：feat(rpc): core parity for workspace, catalog, canvas, pairing, channels and system methods  
  链接：zeroclaw-labs/zeroclaw PR #11182  
  目标是让 core 通过 RPC 提供当前 dashboard 依赖的 HTTP 能力，为 gateway 未来转为 RPC client 铺路。

- PR #11176：feat(rpc): cron, memory, skills, personality and quickstart parity with the HTTP routes  
  链接：zeroclaw-labs/zeroclaw PR #11176  
  补齐 cron、memory、skills、personality、quickstart 等 RPC 行为，并修复 cron 预审批绕过问题。

- PR #11172：feat(rpc): config parity for the remaining HTTP config routes  
  链接：zeroclaw-labs/zeroclaw PR #11172  
  将更多 config HTTP route 补齐 RPC 对应方法。

- PR #11171：feat(rpc): bound the local transport and add chunked uploads  
  链接：zeroclaw-labs/zeroclaw PR #11171  
  改善本地传输边界处理，对超过 8 MiB 的 frame 返回明确错误，并加入 chunked uploads。

- PR #11186：feat(rpc): add zeroclaw-rpc-client and the in-process gateway seam  
  链接：zeroclaw-labs/zeroclaw PR #11186  
  新增 `zeroclaw-rpc-client` crate，建立 daemon RPC client 侧能力与 in-process gateway seam。

整体来看，项目正在把 dashboard / gateway 依赖的 HTTP 能力逐步迁移到 RPC 层，这是一次系统性架构调整。

#### Runtime 能力注入与组合层重构

- PR #11174：feat(runtime): add capability-taking constructors for turn entry points  
  链接：zeroclaw-labs/zeroclaw PR #11174  

- PR #11187：feat(composition): build DefaultCapabilities in the application layer and run the CLI agent on it  
  链接：zeroclaw-labs/zeroclaw PR #11187  

这两项工作共同指向一个趋势：将 runtime turn 构建所需能力从隐式全局或内部构造，转为显式的 `RuntimeCapabilities` / `DefaultCapabilities` 注入。  
这有利于测试、替换、daemon 化以及后续多 client / 多 session 场景。

#### Session-owned turns 与订阅/观察能力

- PR #11185：feat(rpc): let the session own a turn and attach viewers to it  
  链接：zeroclaw-labs/zeroclaw PR #11185  

该 PR 让 session 可以拥有一个 turn，并允许 viewer 附着到该 turn。这是 RPC 化、多客户端观察、dashboard 实时状态同步的重要基础能力。

#### 安全与访问控制修复

- PR #11177：fix(gateway): show the first-run pairing code only to local callers  
  链接：zeroclaw-labs/zeroclaw PR #11177  

该 PR 修复 `GET /pair/code` 在首次配对前可被非本地调用者读取 live pairing code 的问题。虽然摘要未标高危标签，但从影响面看，这是今日最值得优先 review 的安全修复之一。

#### 测试稳定性修复

- PR #11192：test(runtime): isolate payload capture tests by trace id  
  链接：zeroclaw-labs/zeroclaw PR #11192  

该 PR 针对 payload capture 测试使用固定 `turn_id: "trace-req-test"` 导致并行测试串扰的问题，将测试按 trace id 隔离。它直接回应了今日新报的 flaky test 问题。

---

## 3. 社区热点

> 注：PR 数据中的评论数为 `undefined`，无法严格按评论数排序。以下基于更新频率、标签、功能影响面和 issue 评论数据判断热点。

### Issue #11166：超出单请求图片上限时批量淘汰 image blocks  
链接：zeroclaw-labs/zeroclaw Issue #11166  
标签：`enhancement`, `provider`, `provider:anthropic`, `provider:compatible`, `status:blocked`, `risk:medium`  
评论数：1  

该 issue 是今日唯一有评论记录的 issue，诉求是当 session 超过 `max_images` 上限时，不要每新增一张图片就重写 prompt cache，而是按批次淘汰 image blocks。  
背后的核心痛点是：多图会话在 provider image cap 附近会产生频繁 cache rewrite，增加延迟和成本。该问题同时涉及 Anthropic、compatible provider 与 provider transport 策略，已被标记为 blocked，说明实现可能依赖更底层的 provider/request normalization 设计。

### PR #11182：RPC core parity 大范围补齐  
链接：zeroclaw-labs/zeroclaw PR #11182  

这是今日影响面最大的功能 PR 之一，覆盖 workspace、catalog、canvas、pairing、channels、system methods 等多个能力。  
诉求非常明确：让 core 层通过 RPC 提供 dashboard 当前通过 HTTP 消费的能力，从而降低 gateway 的业务负担，为下一阶段架构拆分做准备。

### PR #11187：应用层构建 DefaultCapabilities，并让 CLI agent 使用  
链接：zeroclaw-labs/zeroclaw PR #11187  

该 PR 与 #11174 形成上下游关系，说明团队正在把 runtime 的能力构造职责上移到 application layer。  
这类改动通常会影响 CLI、daemon、channel、provider、delegate tool 等多个系统边界，因此 review 成本较高，但长期可维护性收益明显。

### PR #11181：保留 per-message steering provenance  
链接：zeroclaw-labs/zeroclaw PR #11181  
标签：`security`, `domain:security`, `risk:high`, `stacked`, `size:XL`  

该 PR 关注每条 message 的 steering provenance，即消息级 steering 来源与上下文归因。  
这对安全审计、策略执行、agent 行为可解释性都很重要。由于标记为 `risk:high` 且为 stacked PR，应当作为重点 review 对象。

### PR #11175：ZeroCode composer 标准编辑能力  
链接：zeroclaw-labs/zeroclaw PR #11175  

该 PR 为 ZeroCode Chat/Code composer 增加 undo/redo、键盘选择、全选、剪切/复制、按词删除等基础编辑能力。  
从用户体验角度看，这是直接面向终端用户的高价值改进，尤其针对长 prompt 误编辑后无法恢复的痛点。

---

## 4. Bug 与稳定性

### S1：并行 runtime gate 中 payload capture 测试读取到其他测试记录  
链接：zeroclaw-labs/zeroclaw Issue #11180  
组件：runtime/daemon  
严重程度：S1 - workflow blocked  
状态：OPEN  

问题描述：  
`agent::turn::provider_call::payload_capture_tests::llm_request_payload_off_still_carries_prefix_fingerprints` 在并行 runtime 测试中偶发失败，原因是读取到其他测试的 capture record。

可能修复 PR：  
- PR #11192：test(runtime): isolate payload capture tests by trace id  
  链接：zeroclaw-labs/zeroclaw PR #11192  

分析：  
这是典型的全局广播 / 共享 capture channel 在并行测试下未隔离导致的 flake。由于会使 CI Required Gate 变红，优先级应较高。

---

### S1：sop::engine 测试跨秒边界时偶发失败  
链接：zeroclaw-labs/zeroclaw Issue #11179  
组件：runtime/daemon  
严重程度：S1 - workflow blocked  
状态：OPEN  

问题描述：  
`sop::engine::tests::pending_park_retry_respects_pending_pool_cap` 当测试跨过秒边界时会偶发失败，导致 PR 的 CI Required Gate 变红。

是否已有 fix PR：  
当前数据中未看到明确对应的修复 PR。

分析：  
这类问题通常来自测试依赖 wall-clock 时间、秒级时间戳或 retry/backoff 边界。建议改为注入 clock、使用 deterministic time，或放宽断言窗口。

---

### S3：stream recovery 在连接失败后跳过 primary，导致冷缓存 fallback  
链接：zeroclaw-labs/zeroclaw Issue #11145  
组件：provider  
严重程度：S3 - minor / cost  
状态：OPEN  

问题描述：  
当 streaming request 在连接阶段失败，Reliable provider 有多个候选项时，非 streaming recovery 会跳过刚刚 stream 失败的 primary，直接转到下一个 candidate。  
如果实际上还没有任何 token 被发送，跳过 primary 会导致冷缓存 fallback，带来额外成本或性能损失。

是否已有 fix PR：  
当前数据中未看到明确对应的修复 PR。

分析：  
该问题不一定阻塞功能，但会影响 provider fallback 策略的经济性与缓存命中率。对高频 provider 调用场景较重要。

---

### 中等风险：history-trim observer events 缺少归因字段  
链接：zeroclaw-labs/zeroclaw PR #11184  
状态：OPEN  
标签：`bug`, `agent`, `runtime`, `risk:medium`  

问题描述：  
history-trim observer events 当前缺少 effective agent alias 和 turn ID，导致运维人员难以把历史裁剪事件与具体 agent / turn 关联。

修复进展：  
- PR #11184 已提交修复，覆盖 pre-dispatch trimming、reactive context-overflow recovery、reported-budget trimming 等路径。  
  链接：zeroclaw-labs/zeroclaw PR #11184  

分析：  
这是可观测性与运维诊断问题。对生产环境排查上下文裁剪、预算裁剪和 agent 行为异常很有价值。

---

### 安全稳定性：first-run pairing code 可被非本地调用者读取  
链接：zeroclaw-labs/zeroclaw PR #11177  
状态：OPEN  

问题描述：  
`GET /pair/code` 在首次设备配对前无认证、无 localhost 检查，会向任意调用者返回 live pairing code。  

修复进展：  
PR #11177 已限制 first-run pairing code 仅本地调用者可见。  
链接：zeroclaw-labs/zeroclaw PR #11177  

分析：  
虽然以 gateway fix 形式出现，但本质是访问控制问题。建议优先 review 并合入。

---

## 5. 功能请求与路线图信号

### 图片上限批量淘汰与 prompt cache 优化  
链接：zeroclaw-labs/zeroclaw Issue #11166  

用户/维护者希望在 `max_images` 超限后批量淘汰图片块，而不是每新增图片就淘汰一个。  
路线图信号：  
- 与 provider transport、Anthropic/compatible provider 适配相关。
- 已标记 `status:blocked`，说明短期可能不会立即落地，但它揭示了多模态会话和 prompt cache 成本优化的方向。

---

### Discord channel 可关闭内置 `/ask` slash command  
链接：zeroclaw-labs/zeroclaw Issue #11150  

诉求：  
新增 `channels.discord.<alias>.slash_builtin_ask` 配置项，默认 `true`，允许 Discord channel 注册 skill slash commands，但不注册内置 `/ask`。  

路线图信号：  
- 反映出用户希望更细粒度控制 channel command namespace。
- 对多 bot、多 command、已有 `/ask` 冲突的 Discord workspace 尤其重要。
- 该需求实现范围相对可控，较可能进入近期配置/渠道能力改进队列。

---

### Bounded delegation 中 caller tool-level approval 继承语义  
链接：zeroclaw-labs/zeroclaw Issue #11138  

诉求：  
明确 bounded agentic child 是否必须遵守 caller 对继承工具设置的 tool-level approval requirements。  

路线图信号：  
- 与 delegation、安全审批、工具权限继承直接相关。
- 结合 PR #11181 的 per-message steering provenance、PR #11174/#11187 的 runtime capabilities 重构，可以看出项目正在强化 agent 权限边界、审计与能力注入模型。
- 该议题可能进入安全/委托能力的设计讨论，而不只是单点修复。

---

### Plugin manifest 支持 channel mirrors  
链接：zeroclaw-labs/zeroclaw PR #11178  

功能：  
新增 `PluginManifest.provides`，允许插件声明其作为某个内置 channel 的 drop-in mirror。  
链接：zeroclaw-labs/zeroclaw PR #11178  

路线图信号：  
插件系统正在向更灵活的 channel 扩展机制演进，有助于第三方实现替代 channel 或兼容内置 channel 行为。

---

### ZeroCode composer 标准编辑能力  
链接：zeroclaw-labs/zeroclaw PR #11175  

功能：  
为 Chat/Code composer 增加 undo/redo、选择、全选、剪切/复制、按词删除等基础编辑能力。  

路线图信号：  
ZeroCode 的交互体验正在补齐基础编辑器能力，说明项目不仅关注 daemon/runtime 架构，也在改善面向用户的输入体验。

---

## 6. 用户反馈摘要

从今日 Issues 与 PR 摘要可以提炼出以下真实痛点：

1. **多模态会话成本与缓存效率问题**  
   Issue #11166 显示，用户在多图输入场景中遇到 `max_images` 限制带来的 prompt cache 频繁重写问题。痛点不是单纯的功能不可用，而是高频图片交互下的性能与成本退化。  
   链接：zeroclaw-labs/zeroclaw Issue #11166

2. **CI flaky 导致贡献流程被阻塞**  
   Issue #11180 与 #11179 都标记为 S1 workflow blocked，说明当前测试偶发失败已经影响 PR 合并体验。  
   链接：zeroclaw-labs/zeroclaw Issue #11180  
   链接：zeroclaw-labs/zeroclaw Issue #11179

3. **Discord slash command 命名空间需要更细控制**  
   Issue #11150 表明，内置 `/ask` 无条件注册可能与用户已有 command 或只想暴露 skill commands 的需求冲突。  
   链接：zeroclaw-labs/zeroclaw Issue #11150

4. **agent delegation 权限继承语义仍需明确**  
   Issue #11138 反映用户或维护者对 bounded delegation 中工具审批边界的安全预期尚未完全固化。  
   链接：zeroclaw-labs/zeroclaw Issue #11138

5. **长 prompt 编辑体验仍有改进空间**  
   PR #11175 明确提到用户可能误编辑长 prompt 且难以恢复，因此需要 undo/redo 等标准编辑功能。  
   链接：zeroclaw-labs/zeroclaw PR #11175

---

## 7. 待处理积压

> 当前数据只覆盖过去 24 小时，无法判断“长期未响应”的真实时长。以下列出今日仍需维护者重点关注的开放事项。

### 高优先级待处理

1. **Issue #11179：sop::engine flaky test 尚未看到对应修复 PR**  
   链接：zeroclaw-labs/zeroclaw Issue #11179  
   建议：优先定位时间边界依赖，避免继续阻塞 CI gate。

2. **Issue #11180 / PR #11192：payload capture 并行测试串扰**  
   Issue：zeroclaw-labs/zeroclaw Issue #11180  
   PR：zeroclaw-labs/zeroclaw PR #11192  
   建议：尽快 review #11192，若可稳定复现并修复，应优先合入。

3. **PR #11177：pairing code 仅本地可见的安全修复**  
   链接：zeroclaw-labs/zeroclaw PR #11177  
   建议：作为安全边界修复优先处理。

4. **PR #11181：per-message steering provenance，高风险 stacked PR**  
   链接：zeroclaw-labs/zeroclaw PR #11181  
   建议：拆分 review 重点，确认 provenance 数据是否覆盖安全审计关键路径。

### 架构类待处理

1. **RPC parity 系列 PR 队列较长**  
   - PR #11182：zeroclaw-labs/zeroclaw PR #11182  
   - PR #11176：zeroclaw-labs/zeroclaw PR #11176  
   - PR #11172：zeroclaw-labs/zeroclaw PR #11172  
   - PR #11171：zeroclaw-labs/zeroclaw PR #11171  
   - PR #11186：zeroclaw-labs/zeroclaw PR #11186  

   建议：明确依赖顺序与合并批次，避免 stacked PR 长时间漂移导致冲突成本上升。

2. **Runtime capabilities / composition 系列需统一 review**  
   - PR #11174：zeroclaw-labs/zeroclaw PR #11174  
   - PR #11187：zeroclaw-labs/zeroclaw PR #11187  

   建议：先合并底层能力构造接口，再处理应用层 DefaultCapabilities，降低 diff 噪声。

3. **重复或替代 PR 需要清理**  
   - PR #11189 已关闭：zeroclaw-labs/zeroclaw PR #11189  
   - PR #11188 仍开放：zeroclaw-labs/zeroclaw PR #11188  

   建议：确认 #11188 是否为 #11189 的有效替代版本，避免 reviewer 重复投入。

---

## 项目健康度结论

ZeroClaw 今日处于 **高活跃、高并发改造** 状态。RPC / gateway split、runtime capabilities、session-owned turns 等工作显示项目正在为更模块化、更可观测、更适合 daemon/dashboard 架构的下一版本做准备。  
主要风险来自三方面：  
1. 待合并 PR 数量高，且大量为 `size:XL` / stacked PR；  
2. CI flaky 已经阻塞工作流；  
3. 安全与权限边界相关问题正在暴露，需要快速闭环。  

若能优先合入测试稳定性与安全修复，并对 RPC 系列 PR 建立清晰合并顺序，项目整体推进质量仍然较健康。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*