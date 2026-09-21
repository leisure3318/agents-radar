# OpenClaw 生态日报 2026-09-21

> Issues: 4 | PRs: 73 | 覆盖项目: 13 个 | 生成时间: 2026-09-21 03:54 UTC

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

# OpenClaw 项目动态日报｜2026-09-21

## 1. 今日速览

过去 24 小时 OpenClaw 维持了**非常高的开发活跃度**：Issues 更新 4 条，PR 更新 73 条，其中 65 条仍待合并，8 条已合并或关闭。今日工作重点集中在 **Gateway 性能与稳定性、会话/子代理生命周期、Web UI 体验、权限边界、浏览器扩展能力、SQLite/存储维护** 等方向。  
整体看，项目处于高频修复与架构打磨阶段：大量 PR 已标记为 `ready for maintainer look`，说明实现层面推进较快，但维护者审核压力较大。今日没有新版本发布，短期内更像是在为后续补丁版或稳定版积累修复。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日 PR 更新量很高，但在提供的数据中明确显示为已关闭的重点 PR 主要有以下两项：

### 已关闭 / 已完成的重要 PR

#### 1. `perf(gateway): overlap observed project identity probes`
- PR：[#154210](https://github.com/openclaw/openclaw/pull/154210)
- 状态：Closed
- 模块：Gateway / Projects
- 影响级别：P2
- 摘要：优化 `projects.list` 在 `includeObserved: true` 场景下的项目身份探测逻辑，将原本串行的 Git identity probes 改为并发重叠执行。
- 用户影响：在 5,000 个 session、200 个 checkout 的合成基准中，观测项目发现速度约提升 **38%**。
- 项目意义：这是典型的 Gateway 请求延迟优化，有助于大型工作区或长期运行实例的响应速度。

#### 2. `fix: preserve implied access in operator role ceilings`
- PR：[#153978](https://github.com/openclaw/openclaw/pull/153978)
- 状态：Closed
- 模块：Gateway / 权限系统
- 标签：`security-sensitive-changed`
- 摘要：修复 operator role ceiling 中隐含权限丢失的问题。例如客户端持有 `operator.write` 时，理论上应包含读权限，但此前 role ceiling 过滤可能导致 write token 被移除，从而失去可用授权。
- 用户影响：权限边界更符合预期，避免合法客户端在权限裁剪后被错误拒绝。
- 项目意义：该修复对 Visitor Access、Operator 权限模型和后续权限校验 PR 具有基础性意义。

### 仍在推进但值得关注的关键 PR

#### Gateway 与会话稳定性
- [#154300](https://github.com/openclaw/openclaw/pull/154300) `fix: forced Gateway restarts cancel healthy subagent work`  
  修复强制 Gateway 重启会取消健康子代理任务的问题，P1，影响会话可靠性。
- [#154302](https://github.com/openclaw/openclaw/pull/154302) `fix: stop session cleanup from amplifying a blocked WAL`  
  修复 SQLite WAL checkpoint 被阻塞时，session cleanup 继续写入并放大问题的行为，P1。
- [#154318](https://github.com/openclaw/openclaw/pull/154318) `perf(state): move transcript reads off the Gateway thread`  
  将 transcript 搜索与历史读取移出 Gateway 请求线程，降低阻塞风险。
- [#154336](https://github.com/openclaw/openclaw/pull/154336) `fix: revalidate session previews and tool inventories`  
  修复 session preview 与工具 inventory 在异步读取期间权限或物理存储发生变化后的结果一致性问题。

#### Web UI 体验
- [#154364](https://github.com/openclaw/openclaw/pull/154364) `fix(ui): use remote defaults for manual worktree creation`  
  修复手动创建 worktree 时错误使用陈旧本地默认分支的问题。
- [#154367](https://github.com/openclaw/openclaw/pull/154367) `fix: restore supported image pastes in chat`  
  修复聊天中粘贴受支持图片 data URL 失败的问题。
- [#154347](https://github.com/openclaw/openclaw/pull/154347) `fix: stop subagent rows jumping during progress updates`  
  修复子代理进度更新时 UI 行顺序跳动的问题。
- [#154259](https://github.com/openclaw/openclaw/pull/154259) `fix(ui): prevent stale copies after text changes`  
  修复文本更新后复制按钮状态和复制内容可能滞后的问题。

#### 浏览器与扩展能力
- [#154215](https://github.com/openclaw/openclaw/pull/154215) `fix(browser): preserve references across waits and renderer changes`  
  修复浏览器 wait 期间元素引用丢失，以及 iframe renderer 替换后 stale reference 指向错误元素的问题。
- [#154354](https://github.com/openclaw/openclaw/pull/154354) `fix(update): plugin snapshots fail without native rename support`  
  修复 FreeBSD 等缺少原生 no-replace rename 支持环境下，插件 snapshot 更新失败的问题。

---

## 4. 社区热点

> 注：本次数据中 PR 评论数显示为 `undefined`，Issues 评论数均为 1。因此以下“热点”主要基于标签优先级、影响面、模块关键性和是否涉及安全/兼容性判断。

### 1. Gateway 重启与子代理任务可靠性
- PR：[#154300](https://github.com/openclaw/openclaw/pull/154300)
- 诉求：用户希望 Gateway 重启不应无差别取消已经健康运行的子代理任务。
- 背后问题：OpenClaw 的多代理执行依赖长生命周期任务，若 Gateway 重启导致任务丢失或无终态记录，会直接影响用户对自动化执行可靠性的信任。
- 信号：P1，且已有较完整修复，可能是下一批稳定性修复的重点。

### 2. SQLite WAL 与 session cleanup 稳定性
- PR：[#154302](https://github.com/openclaw/openclaw/pull/154302)
- 诉求：避免 cleanup 在 WAL checkpoint 阻塞时进一步增加写入压力或删除不该删除的归档。
- 背后问题：长期运行、多会话、多读者环境下，SQLite WAL 管理是稳定性核心。
- 信号：P1，属于基础设施级修复，合并优先级应较高。

### 3. Visitor Access 权限边界
- PR：[#153987](https://github.com/openclaw/openclaw/pull/153987)
- 链接：[#153987](https://github.com/openclaw/openclaw/pull/153987)
- 诉求：在授予 Visitor Access 前先验证访问权限，避免权限边界被绕过或错误扩大。
- 背后问题：OpenClaw 正在扩展协作/访客访问能力，权限模型需要更严格的前置校验。
- 风险：带有 `security-boundary`、`compatibility`、`security-sensitive-changed` 标签，合并前需要充分证明。

### 4. 浏览器自动化引用稳定性
- PR：[#154215](https://github.com/openclaw/openclaw/pull/154215)
- 诉求：浏览器自动化中的 snapshot → wait → action 流程需要可靠保留元素引用，尤其是跨 iframe、renderer 替换、导航等复杂场景。
- 背后问题：OpenClaw 的浏览器代理能力正在从简单 CDP 操作走向更稳健的语义浏览器控制。
- 信号：该 PR 涉及依赖变化与兼容风险，说明浏览器扩展层正在进行较深层修复。

### 5. Agent 存储压缩与全文索引维护
- PR：[#153683](https://github.com/openclaw/openclaw/pull/153683)
- 诉求：减少大型 agent store 中昂贵 JSON payload 的长期保留成本，并优化全文索引维护范围。
- 背后问题：随着会话、记忆、搜索内容增加，存储膨胀与 FTS 维护成本成为性能瓶颈。
- 信号：带有 `session-state`、`compatibility` 风险标签，是一次较大的内部存储演进。

---

## 5. Bug 与稳定性

### 高优先级 / 影响面较大

#### 1. 2026.9.4 updater 无法升级到 2026.9.5 timeout fix
- Issue：[#154381](https://github.com/openclaw/openclaw/issues/154381)
- 状态：Open
- 类型：行为 Bug
- 摘要：2026.9.4 updater 在验证 2026.9.5 candidate 时仍受 300 秒合并验证上限影响，即使传入 `--timeout 1800`，仍会拒绝候选版本，导致用户无法获取 timeout 修复。
- 严重性：高  
- 原因：这是升级路径阻塞问题，影响用户从已知问题版本迁移到修复版本。
- 已有 fix PR：数据中未看到明确关联 PR。
- 建议：维护者应优先确认是否需要发布 bootstrap updater 或绕过验证上限的热修复说明。

#### 2. 强制 Gateway 重启取消健康子代理工作
- PR：[#154300](https://github.com/openclaw/openclaw/pull/154300)
- 状态：Open，ready for maintainer look
- 类型：稳定性修复
- 严重性：高
- 摘要：修复 Gateway 强制重启后健康子代理任务被立即取消、前序 session 缺少终态记录的问题。
- 已有 fix PR：是，[#154300](https://github.com/openclaw/openclaw/pull/154300)

#### 3. Session cleanup 放大 blocked WAL 问题
- PR：[#154302](https://github.com/openclaw/openclaw/pull/154302)
- 状态：Open，ready for maintainer look
- 类型：存储稳定性修复
- 严重性：高
- 摘要：当 SQLite checkpoint 无法完成时，cleanup 不应继续删除 archive 或增加 WAL 写入。
- 已有 fix PR：是，[#154302](https://github.com/openclaw/openclaw/pull/154302)

#### 4. 已排队 automation 在 native reply 后丢失 authority
- PR：[#154320](https://github.com/openclaw/openclaw/pull/154320)
- 状态：Open
- 类型：Agent / Automation 行为修复
- 严重性：中高
- 摘要：修复已被接受的手动 automation 在 OpenClaw native caller 完成回复后、队列激活前被误判为取消的问题。
- 已有 fix PR：是，[#154320](https://github.com/openclaw/openclaw/pull/154320)

### 中优先级

#### 5. Per-sender chat bubble tint 忽略当前主题调色板
- Issue：[#154371](https://github.com/openclaw/openclaw/issues/154371)
- 状态：Open
- 类型：UI 行为 Bug
- 摘要：聊天气泡的 per-sender tint 只按主题模式固定饱和度和亮度，而不是按具体主题 palette 调整，导致用户消息气泡在部分主题下显得不协调。
- 严重性：中
- 已有 fix PR：数据中未看到明确关联 PR。
- 用户影响：影响主题一致性与视觉质量，但不阻塞核心功能。

#### 6. Workspace 上传与 runtime hash 存在重复 fs-safe 逻辑
- Issue：[#154370](https://github.com/openclaw/openclaw/issues/154370)
- 状态：Open
- 类型：维护者提出的清理 / 稳定性问题
- 摘要：OpenClaw 仍重复实现 fs-safe 0.17.0 已提供的文件写入与 hashing 逻辑，且取消处理行为存在差异。
- 严重性：中
- 已有 fix PR：数据中未看到直接关联 PR。
- 项目意义：减少重复实现，有助于降低写入边界、取消行为和 hash 计算的不一致风险。

#### 7. 浏览器引用在 wait 与 renderer 变化后丢失
- PR：[#154215](https://github.com/openclaw/openclaw/pull/154215)
- 状态：Open，waiting on author
- 类型：浏览器自动化稳定性
- 严重性：中
- 摘要：修复现有 session 中浏览器 waits 丢弃可用元素引用，以及 iframe renderer 替换后 stale reference 指向错误元素的问题。
- 已有 fix PR：是，[#154215](https://github.com/openclaw/openclaw/pull/154215)

### 低优先级 / 测试稳定性

#### 8. Worker fixture 数据库清理偶发 `ENOTEMPTY`
- PR：[#154386](https://github.com/openclaw/openclaw/pull/154386)
- 状态：Open
- 类型：测试稳定性
- 严重性：低
- 摘要：修复 worker live-chat fixture 清理临时 agent database 目录时偶发 `ENOTEMPTY`。
- 已有 fix PR：是，[#154386](https://github.com/openclaw/openclaw/pull/154386)

#### 9. CLI readiness 与 Mattermost probe timing 测试不稳定
- PR：[#154333](https://github.com/openclaw/openclaw/pull/154333)
- 状态：Open
- 类型：测试稳定性
- 严重性：低
- 摘要：修复 CLI cancellation 测试过早读取 startup trace，以及 Mattermost DNS timeout 测试受 event loop pause 影响的问题。
- 已有 fix PR：是，[#154333](https://github.com/openclaw/openclaw/pull/154333)

---

## 6. 功能请求与路线图信号

### 1. 轻量级浏览器 profile 与 portable deployment
- Issue：[#154341](https://github.com/openclaw/openclaw/issues/154341)
- 状态：Open
- 标签：`needs-product-decision`
- 摘要：提出实验性轻量级浏览器 profiles，用于更低内存的语义浏览器任务，并支持 portable deployment 与 benchmarks。
- 用户诉求：
  - 不希望所有浏览器 profile 都默认依赖 Chromium 能力。
  - 希望轻量引擎可作为 semantic browser work 的低资源选项。
  - 需要避免 generic CDP profile 导致 tabs 丢失、unsupported visual actions 暴露、stale references 复用等问题。
- 路线图判断：该 Issue 带有产品决策标签，短期未必立即进入主线，但与 [#154215](https://github.com/openclaw/openclaw/pull/154215) 的浏览器引用稳定性修复方向一致，可能成为浏览器能力分层的后续路线。

### 2. Visitor Access 与权限预校验
- PR：[#153987](https://github.com/openclaw/openclaw/pull/153987)
- 状态：Open，needs proof
- 摘要：在授予 visitor access 前验证 visitor permissions。
- 路线图判断：该方向大概率会进入后续版本，但需要等待相关 session permission enforcement 和 [#153989](https://github.com/openclaw/openclaw/pull/153989) 等依赖完成。权限边界类变更不宜快速合并。

### 3. Chat / Web UI 多媒体体验增强
- PR：[#154051](https://github.com/openclaw/openclaw/pull/154051)
- 状态：Open
- 摘要：在同一 chat turn 中支持展开视频的前后导航，可用左右箭头、按钮或滑动切换。
- 路线图判断：属于用户体验增强，若已有截图与测试证明，可能被纳入较近版本。

### 4. Agent 进度展示规范化
- PR：[#154385](https://github.com/openclaw/openclaw/pull/154385)
- 状态：Open
- 摘要：引导 agents 在 status cards 中优先使用可度量的进度条，如 `PRs reviewed · 12/30`。
- 路线图判断：体现 OpenClaw 对长任务可观察性的持续投入，可能与子代理 UI 稳定性 PR [#154347](https://github.com/openclaw/openclaw/pull/154347) 形成一组体验改进。

### 5. Agent 存储与全文索引重构
- PR：[#153683](https://github.com/openclaw/openclaw/pull/153683)
- 状态：Open
- 摘要：压缩 agent storage，并将全文索引维护限定到更合理范围。
- 路线图判断：这是面向长期可扩展性的基础设施变更，合并风险较高，但如果测试充分，可能成为后续版本的重要内部升级。

---

## 7. 用户反馈摘要

### 1. 升级路径必须可靠
- 来源：[#154381](https://github.com/openclaw/openclaw/issues/154381)
- 痛点：用户尝试从 2026.9.4 升级到包含 timeout fix 的 2026.9.5，但 updater 自身的 300 秒验证上限阻止了升级。
- 反映的问题：当修复版本需要通过有缺陷的旧 updater 获取时，用户会陷入“无法升级以修复升级器”的闭环。
- 用户情绪判断：明显不满意，且该问题会削弱对自动更新机制的信任。

### 2. 主题系统需要真正遵循 palette
- 来源：[#154371](https://github.com/openclaw/openclaw/issues/154371)
- 痛点：聊天气泡颜色与当前主题表面色不协调，尤其在非默认主题下显得突兀。
- 反映的问题：用户对主题一致性有较高要求，UI 细节会影响日常使用舒适度。
- 用户情绪判断：不是阻塞问题，但属于高频可见体验瑕疵。

### 3. 浏览器自动化需要更低资源、更强兼容
- 来源：[#154341](https://github.com/openclaw/openclaw/issues/154341)、[#154215](https://github.com/openclaw/openclaw/pull/154215)
- 痛点：Chromium 假设过重，轻量浏览器引擎在 CDP 兼容、tab identity、visual action 暴露和 stale reference 方面存在挑战。
- 反映的问题：用户希望 OpenClaw 的浏览器能力能覆盖更多部署环境，而不是只适配重型桌面浏览器。
- 用户情绪判断：偏建设性，属于路线图讨论。

### 4. 长任务和子代理执行需要可解释、可恢复
- 来源：[#154300](https://github.com/openclaw/openclaw/pull/154300)、[#154347](https://github.com/openclaw/openclaw/pull/154347)、[#154385](https://github.com/openclaw/openclaw/pull/154385)
- 痛点：子代理任务若因 Gateway 重启被取消、进度 UI 跳动或进度表达不清，会让用户难以判断任务真实状态。
- 反映的问题：OpenClaw 正在面对越来越多长时运行、多代理并发场景，可观察性和任务连续性成为核心体验。

---

## 8. 待处理积压

> 本次数据只覆盖最近 24 小时，无法完整识别“长期未响应”的 Issue/PR。以下为当前数据中应优先提醒维护者关注的高风险或高价值积压项。

### 1. P1 Gateway / Session 稳定性 PR 等待维护者审核
- [#154300](https://github.com/openclaw/openclaw/pull/154300) `fix: forced Gateway restarts cancel healthy subagent work`
- [#154302](https://github.com/openclaw/openclaw/pull/154302) `fix: stop session cleanup from amplifying a blocked WAL`
- 风险：均为 P1，且涉及任务取消、WAL、session cleanup 等核心稳定性问题。
- 建议：优先 review，必要时拆分为较小补丁以降低合并风险。

### 2. 权限与安全边界 PR 需要证明材料
- [#153987](https://github.com/openclaw/openclaw/pull/153987) `feat: validate visitor permissions before granting access`
- 风险：涉及 Visitor Access、file-transfer、security boundary、compatibility。
- 当前状态：`needs proof`
- 建议：维护者应明确要求的 proof 范围，例如权限矩阵测试、HTTP/WebSocket 场景、回归用例与迁移说明。

### 3. 浏览器引用稳定性 PR 等待作者处理
- [#154215](https://github.com/openclaw/openclaw/pull/154215) `fix(browser): preserve references across waits and renderer changes`
- 当前状态：`waiting on author`
- 风险：涉及依赖变化、浏览器扩展、file-transfer 插件，兼容性风险较高。
- 建议：作者补充跨 iframe、导航、renderer replacement 的最小复现与测试覆盖。

### 4. 大型存储重构 PR 合并风险较高
- [#153683](https://github.com/openclaw/openclaw/pull/153683) `refactor: compact agent storage and index full-text maintenance`
- 风险：涉及 session-state、memory-core、commands、agents、qa-lab 等多个模块。
- 建议：维护者应重点审查迁移路径、旧数据兼容、FTS 重建策略和回滚方案。

### 5. Updater 阻塞升级问题尚未看到修复 PR
- Issue：[#154381](https://github.com/openclaw/openclaw/issues/154381)
- 风险：用户无法通过正常 updater 获取修复版本。
- 建议：优先确认是否需要：
  - 临时手动升级说明；
  - 单独发布 updater 修复；
  - 放宽 candidate validation 的硬编码上限；
  - 在 release notes 中明确受影响版本和规避方式。

---

## 健康度评估

OpenClaw 今日表现为**高活跃、高修复密度、维护者审核压力偏高**。项目工程面在持续改善，尤其是 Gateway、SQLite、权限边界和浏览器自动化稳定性，但开放 PR 数量较大，且多个关键 PR 带有兼容性、安全边界或 session-state 风险。短期建议将维护重点放在 P1 稳定性修复、升级阻塞问题和安全权限链路上；中期则继续推进浏览器能力分层、agent 存储压缩和 UI 可观察性优化。

---

## 横向生态对比

# AI 智能体 / 个人 AI 助手开源生态横向对比报告  
日期：2026-09-21

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的“两极分化”：头部项目如 OpenClaw、Hermes Agent、CoPaw/QwenPaw、ZeroClaw、NanoBot 维持高频迭代，而 PicoClaw、NanoClaw、NullClaw、Moltis 等项目则处于低活跃维护或单点问题处理阶段。  
整体技术焦点正在从“能调用模型和工具”转向“长期运行可靠性、权限边界、插件生态、浏览器/桌面自动化、多 Provider 兼容、会话状态一致性”。  
多个项目同时暴露出 session 生命周期、SQLite/持久化、工具调用 schema、Windows 兼容、插件运行时安全等问题，说明智能体系统正在进入更复杂的生产化阶段。  
从路线图看，生态正在向 **多代理协作、能力市场、插件/WASM、网关拆分、浏览器与桌面操作、企业级权限与审计** 方向演进。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release 情况 | 今日状态概括 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 4 | 73 | 无新版本 | 高密度修复，Gateway、SQLite、权限、浏览器、UI 并行推进 | **高活跃，高审核压力，核心稳定性待收敛** |
| **NanoBot** | 1 | 17 | 无新版本 | WebUI、Provider、Responses API、API session 隔离快速迭代 | **活跃健康，需关注 security PR 与 API 隔离** |
| **Hermes Agent** | 50 | 50 | 无新版本 | 会话状态、Desktop、Provider、技能、Windows、语音问题集中爆发 | **极高活跃，高复杂度，高稳定性压力** |
| **PicoClaw** | 0 | 1 | 无新版本 | 仅 v0.11.0 sprint 规划文档更新 | **低活跃，路线图整理中** |
| **NanoClaw** | 1 | 0 | 无新版本 | WhatsApp 群聊 sender display name 缺失 | **低活跃，单点适配器问题待分诊** |
| **NullClaw** | 1 | 0 | 无新版本 | Ollama tools 不兼容提示不足 | **低活跃，用户体验问题明确** |
| **IronClaw** | 0 | 3 | 1.4.1-rc.1 release cut 迹象 | 发布准备与依赖升级为主 | **维护型活跃，处于候选版本准备期** |
| **LobsterAI** | 0 | 11 | 最新 2026.9.20 | OpenClaw 集成、Windows 修复、Passkey/WebAuthn、插件稳定性 | **高活跃，产品化推进快，底层兼容风险仍在** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 0 | 1 | 无 | 修复 active_tools 空数组覆盖 preset 工具配置 | **低活跃，维护方向清晰** |
| **CoPaw / QwenPaw** | 5 | 10 | 无新版本 | Windows 进程隔离、消息队列、DoomLoopGate、Provider 管理 | **活跃，运行时稳定性问题需优先处理** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeroClaw** | 26 | 7 | 无新版本 | ACP 生命周期、插件/WASM、Gateway IPC、Windows CI、Matrix 语音 | **高规划活跃，交付待合并，路线图清晰** |

> 注：部分项目 PR 状态仅显示 `Closed`，未区分 merged 与直接关闭，因此表中以“更新量/关闭量”而非严格合并量衡量活跃度。

---

## 3. OpenClaw 在生态中的定位

### 3.1 定位概括

OpenClaw 是今日样本中最具“基础平台”特征的项目之一。它不仅关注聊天、工具调用或单一 UI，而是围绕 **Gateway、Session、Subagent、权限系统、浏览器自动化、SQLite 状态存储、Web UI、插件能力** 构建完整智能体运行时。

相比多数项目，OpenClaw 更接近“智能体操作系统 / Agent Runtime Platform”，而不是单纯的个人助手前端。

---

### 3.2 相对优势

| 维度 | OpenClaw 表现 | 对比项目 |
|---|---|---|
| **开发活跃度** | 73 条 PR 更新，显著领先多数项目 | 高于 NanoBot、LobsterAI、CoPaw、ZeroClaw；低于 Hermes 的 Issue 规模但 PR 更新更多 |
| **基础设施深度** | Gateway、SQLite WAL、session cleanup、权限 ceiling、subagent lifecycle 均有持续修复 | 比 NanoBot、Moltis、NullClaw 更底层；与 Hermes、ZeroClaw 接近 |
| **权限与安全边界** | operator role ceiling、Visitor Access、security-boundary PR 活跃 | 强于多数偏 UI/Provider 项目 |
| **长任务与多代理能力** | 子代理生命周期、进度 UI、session preview、tool inventory 等持续打磨 | 与 Hermes、ZeroClaw、LobsterAI 同属多代理方向，但 OpenClaw 更偏 runtime 稳定性 |
| **浏览器自动化能力** | 元素引用、renderer 替换、轻量 profile 讨论 | 与 LobsterAI 的 in-app browser、ZeroClaw 的 desktop computer-use 形成互补 |

---

### 3.3 技术路线差异

OpenClaw 当前路线具有三个明显特征：

1. **Gateway-first 架构**  
   今日大量 PR 围绕 Gateway 请求线程、重启、session cleanup、observed project probes、权限过滤展开，说明 Gateway 是其运行时核心。

2. **状态一致性优先**  
   SQLite WAL、transcript reads、session preview revalidation、agent store compaction 等工作表明 OpenClaw 对长期状态、历史搜索和并发读写非常重视。

3. **权限模型逐步强化**  
   Visitor Access、operator role ceiling、security-sensitive-changed 标签频繁出现，说明 OpenClaw 正在从单用户助手向协作、多角色访问模式演进。

---

### 3.4 社区规模与压力

从今日数据看，OpenClaw 属于第一梯队高活跃项目：

- Issues 更新：4，数量不高；
- PR 更新：73，极高；
- 待合并 PR：65；
- 多个 PR 已标记 `ready for maintainer look`。

这说明 OpenClaw 当前瓶颈不在贡献输入，而在 **维护者 review 吞吐量、风险评估与发布节奏控制**。  
与 Hermes Agent 的“问题爆发型活跃”不同，OpenClaw 更像是“修复和架构打磨型活跃”。

---

## 4. 共同关注的技术方向

## 4.1 会话生命周期与长期状态一致性

涉及项目：

- **OpenClaw**：Gateway 重启取消健康 subagent、SQLite WAL cleanup、transcript 读取线程迁移；
- **Hermes Agent**：session history 非 ASCII 数据损坏、会话压缩重复乱序、fallback providers 失效；
- **ZeroClaw**：ACP hard cancellation 后 session_end exactly-once、active-turn cancellation 事务化；
- **NanoBot**：temporary chats navigation 后丢失、session_id 路由隔离；
- **CoPaw**：idle queue cleanup 丢消息、DoomLoopGate 误终止；
- **Moltis**：preset tools 与 per-turn active_tools 语义一致性。

共同诉求：

- 长会话不能丢状态；
- Gateway / runtime 重启不能误取消任务；
- session delete / kill / cleanup 需要原子性；
- 临时聊天、子代理、工具调用历史必须可恢复、可解释；
- 多 session API 必须隔离，不能上下文串线。

这表明智能体系统正在从“单轮对话工具”进入“长期任务容器”阶段。

---

## 4.2 Provider / 模型兼容与多模型路由

涉及项目：

- **NanoBot**：OpenAI Responses SSE reasoning_text 事件、Unifically Provider、OpenAI-compatible API session_id；
- **Hermes Agent**：Volcengine Ark reasoning_config、custom provider 第二轮丢 provider、fallback_providers 失效、llama.cpp overflow 文案；
- **CoPaw**：provider 模型发现、定价、选择、thinking controls 统一；
- **NullClaw**：Ollama 模型不支持 tools 时提示不足；
- **IronClaw**：依赖维护，虽非直接 provider 功能，但处于发布准备；
- **ZeroClaw**：llmfit 本地模型选择文档；
- **OpenClaw**：浏览器 profile 与工具 inventory 权限 revalidation 间接涉及能力暴露。

共同诉求：

- 不同 Provider 的参数兼容性不能硬编码套用；
- OpenAI-compatible 并不等于行为完全一致；
- 本地模型、Ollama、llama.cpp、Volcengine、xAI、OpenRouter 等需要能力检测；
- reasoning / thinking / tool calling / context overflow 要有统一抽象与降级策略。

趋势判断：  
多模型接入已从“配置 endpoint”进入“能力建模、成本建模、失败恢复、Provider identity 持久化”阶段。

---

## 4.3 插件、技能与能力市场

涉及项目：

- **OpenClaw**：plugin snapshots、tool inventories、Visitor Access 权限边界；
- **Hermes Agent**：plugin skills listing、skill frontmatter 解析、write approval；
- **LobsterAI**：digital employees、expert teams、capability markets、MCP tool exposure、nsp-clawguard ESM；
- **ZeroClaw**：WASM plugin runtime artifact、verified plugin update、rollback、Discord plugin release binary；
- **NanoBot**：Baizhi Agent Toolkit MCP preset、Skills 生态；
- **CoPaw**：community / inbox、资源来源追踪、插件审批 actor；
- **PicoClaw**：module trust、ACP/mesh depth 规划。

共同诉求：

- 插件必须可发现、可安装、可更新、可回滚；
- 技能/插件需要权限、审批、信任边界；
- 插件运行时需要跨平台兼容，尤其 ESM、WASM、Windows 路径；
- 能力市场和 preset 正在成为产品化入口。

趋势判断：  
开源智能体项目正在从“内置工具集合”转向“插件生态 + 能力市场 + 安全审批”。

---

## 4.4 浏览器、桌面与真实环境自动化

涉及项目：

- **OpenClaw**：浏览器元素引用跨 wait / renderer replacement 稳定性、轻量 browser profile；
- **LobsterAI**：内置浏览器 Passkey / WebAuthn；
- **ZeroClaw**：Desktop computer-use protocol；
- **Hermes Agent**：Desktop gateway、Google Meet realtime、Windows desktop 后台体验；
- **CoPaw**：Console 文件刷新、Hub 文件预览；
- **NanoClaw**：WhatsApp native adapter sender metadata；
- **ZeroClaw / LobsterAI / Hermes**：Matrix、WhatsApp、Telegram 等通道能力。

共同诉求：

- Agent 必须处理真实网页登录、Passkey、iframe、renderer 替换；
- 桌面应用需要稳定的后台进程、权限和多端访问；
- IM / Matrix / WhatsApp / Telegram 等渠道需要保留 sender metadata、多媒体与语音能力；
- 文件预览、目录选择、workspace 需要更接近 IDE / OS 体验。

趋势判断：  
“浏览器代理”和“桌面代理”正在成为个人 AI 助手的关键竞争点。

---

## 4.5 Windows 与跨平台稳定性

涉及项目：

- **Hermes Agent**：Windows console window、Defender 误报、WSL bash 测试；
- **LobsterAI**：Windows OpenClaw gateway 退出确认、一键修复；
- **CoPaw**：Windows 子进程 Ctrl event 终止宿主；
- **ZeroClaw**：Windows scheduled task 弹窗、runner inventories、ShellTool cache env；
- **IronClaw**：CI/CD 依赖升级可能影响构建；
- **OpenClaw**：FreeBSD rename support、SQLite WAL 长期运行环境。

共同诉求：

- 子进程隔离必须可靠；
- Windows 服务 / daemon / scheduled task 不应弹窗；
- CI 要覆盖 Windows 特有路径；
- 文件系统语义差异需要显式处理；
- 安装、升级、修复流程必须跨平台一致。

趋势判断：  
Windows 用户不再是边缘场景，个人 AI 助手项目必须把 Windows 作为一等平台。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构/路线特点 |
|---|---|---|---|
| **OpenClaw** | Gateway、session、subagent、权限、浏览器自动化、状态存储 | 高级用户、开发者、需要长期运行 agent 的团队 | Gateway-centric，重视状态一致性与权限边界 |
| **NanoBot** | WebUI、Provider、Responses API、会话搜索、MCP preset | WebUI 用户、多 Provider 用户、轻量 agent 使用者 | Python/WebUI 体验导向，canonical events 迁移，FTS5 搜索 |
| **Hermes Agent** | 长会话个人助理、Desktop、skills、Provider、本地模型、语音 | power user、个人助理重度用户、本地模型用户 | 功能面广，复杂度高，会话状态和 provider identity 是核心挑战 |
| **PicoClaw** | agentic web3、module trust、ACP/mesh 规划 | web3 / 多 agent 协作探索者 | 当前偏路线图设计，尚未体现大量实现活动 |
| **NanoClaw** | 原生聊天适配器、WhatsApp 群聊上下文 | IM 集成用户、群聊 agent 用户 | 重点在 native adapter metadata 与消息上下文 |
| **NullClaw** | 本地模型/Ollama 使用体验 | Ollama、本地模型用户 | 轻量维护，当前需改进能力检测与错误提示 |
| **IronClaw** | Release engineering、Rust 依赖、CI | 稳定版本用户、Rust 生态用户 | 当前处于发布准备与依赖维护阶段 |
| **LobsterAI** | 桌面产品、OpenClaw 集成、浏览器、IM、数字员工、能力市场 | 终端用户、企业/团队、Agent 产品化用户 | 产品化速度快，依赖 OpenClaw，强调 UX 与商业化能力形态 |
| **TinyClaw** | 暂无活动 | 不明 | 静默 |
| **Moltis** | 工具调用控制、preset 语义 | 需要精细工具权限的 agent 开发者 | 小而专注，重视工具配置语义 |
| **CoPaw / QwenPaw** | Agent runtime、Console、Provider、Hub、社区、工具安全 | 开发者、Console 用户、Hub 用户 | runtime + Console + community，重视测试覆盖与产品化工作台 |
| **ZeptoClaw** | 暂无活动 | 不明 | 静默 |
| **ZeroClaw** | ACP、插件/WASM、Gateway IPC、runtime composition、Matrix | 架构型开发者、插件生态构建者、自托管用户 | 路线图清晰，强调多进程、WASM 插件、IPC 契约与可组合 runtime |

---

## 6. 社区热度与成熟度

### 6.1 第一梯队：快速迭代且复杂度高

包括：

- **OpenClaw**
- **Hermes Agent**
- **ZeroClaw**
- **CoPaw / QwenPaw**
- **NanoBot**
- **LobsterAI**

特征：

- 每日 Issue/PR 密度高；
- 多个核心模块并行变化；
- 用户反馈覆盖真实生产场景；
- 维护者响应快，但 review 压力明显；
- 稳定性问题集中在 session、provider、工具调用、Windows、插件。

其中：

- **OpenClaw**：基础设施修复密度最高；
- **Hermes Agent**：问题面最广，复杂度最高；
- **ZeroClaw**：路线图拆解最系统，但今日无合并；
- **CoPaw**：runtime 稳定性和 Console 产品化并重；
- **NanoBot**：维护响应快，WebUI 与 Provider 生态推进稳定；
- **LobsterAI**：产品化和 OpenClaw 集成最积极。

---

### 6.2 第二梯队：质量巩固 / 维护型活跃

包括：

- **IronClaw**
- **Moltis**
- **NullClaw**
- **NanoClaw**

特征：

- 今日活动量低；
- 问题明确且范围较小；
- 多数不处于大规模功能爆发期；
- 更偏补丁、依赖、错误提示、适配器一致性修复。

其中：

- **IronClaw**：接近候选版本准备，需关注依赖升级风险；
- **Moltis**：工具控制语义修复清晰，适合快速合并；
- **NullClaw**：Ollama 兼容提示是低成本高收益改进；
- **NanoClaw**：WhatsApp sender metadata 对群聊 agent 体验关键。

---

### 6.3 第三梯队：静默或规划期

包括：

- **PicoClaw**
- **TinyClaw**
- **ZeptoClaw**

特征：

- 今日无代码或社区实质活动；
- PicoClaw 有路线图信号，但实现尚未展开；
- TinyClaw、ZeptoClaw 暂无可观察进展。

---

## 7. 值得关注的趋势信号

### 7.1 Agent Runtime 正在走向“长期运行系统”，而不是脚本工具

多个项目的问题都指向同一件事：智能体开始承担长期任务、跨会话记忆、多代理协作和自动化执行。  
因此，开发者需要重点关注：

- session 生命周期；
- durable storage；
- cleanup / cancellation 原子性；
- Gateway / runtime 重启恢复；
- 子代理任务终态记录；
- 历史压缩与索引一致性。

代表项目：OpenClaw、Hermes Agent、ZeroClaw、NanoBot、CoPaw。

---

### 7.2 多 Provider 兼容进入“能力建模”阶段

简单支持 OpenAI-compatible API 已不足够。不同模型和 Provider 在以下方面差异显著：

- tool calling；
- reasoning / thinking 参数；
- SSE event 类型；
- context overflow 错误文案；
- usage-limit fallback；
- session_id / chat_id 映射；
- model capability discovery。

开发者应构建显式的 provider capability layer，而不是依赖字符串适配和硬编码参数。

代表项目：NanoBot、Hermes Agent、CoPaw、NullClaw、ZeroClaw。

---

### 7.3 插件生态成为智能体平台化的核心分水岭

从 OpenClaw、Hermes、LobsterAI、ZeroClaw、NanoBot、CoPaw 的动态看，插件、skills、MCP preset、WASM runtime、能力市场正在快速升温。  
但插件系统的核心挑战不在“能加载”，而在：

- 信任与权限；
- 安装与升级；
- rollback；
- runtime sandbox；
- 审批与可审计；
- 跨平台路径和模块格式；
- 能力发现与 UI 展示。

开发者如果构建 Agent 平台，应尽早设计插件生命周期，而不是后期补丁式扩展。

---

### 7.4 浏览器与桌面自动化是下一阶段用户体验高地

Passkey/WebAuthn、iframe renderer、元素引用、桌面 computer-use、Hub 文件预览、Console 文件刷新等问题说明，Agent 正在从“聊天窗口”走向“操作真实软件环境”。  
这会带来新的工程要求：

- 现代认证流程；
- 浏览器上下文稳定引用；
- 用户确认与权限提示；
- 文件系统同步；
- accessibility-first desktop control；
- 跨端远程访问。

代表项目：OpenClaw、LobsterAI、ZeroClaw、CoPaw、Hermes Agent。

---

### 7.5 Windows 支持正在成为个人 AI 助手生态的硬指标

多个项目今日都出现 Windows 相关问题，且大多不是小问题，而是进程退出、控制台弹窗、杀软误报、CI runner、shell 环境、路径编码等基础设施问题。  
对于面向个人用户的 AI 助手项目，Windows 不能只靠“理论兼容”，需要：

- 专门 CI；
- 子进程隔离策略；
- 安装与升级验证；
- Windows 路径和编码测试；
- Defender / 签名 / 打包流程；
- daemon / scheduled task UX 设计。

代表项目：Hermes Agent、LobsterAI、CoPaw、ZeroClaw。

---

### 7.6 可观察性和错误解释正在变成产品竞争力

用户不再满足于 `adapter error`、`500`、`failed`。今日多个项目都在改善：

- OAuth reauth 提示；
- Weixin resend rejection 解释；
- Ollama tools 不支持提示；
- LLM request fingerprint；
- TodoWrite persistence failure 可见化；
- updater 阻塞升级说明；
- provider event stream 一致性。

对开发者的参考价值是：  
智能体系统失败路径复杂，**错误解释质量本身就是核心 UX**。

---

## 总结判断

当前开源个人 AI 助手 / 自主智能体生态正处于从“功能扩张”向“生产级可靠性”过渡的关键阶段。  
OpenClaw、Hermes、ZeroClaw、CoPaw、NanoBot、LobsterAI 构成了高活跃核心圈，但它们面临的共同挑战已经不再是模型调用，而是 **状态一致性、权限边界、插件安全、多 Provider 兼容、真实环境操作和跨平台稳定性**。  

对技术决策者而言：

- 若关注底层 Agent Runtime 和 Gateway，可重点观察 **OpenClaw、ZeroClaw、Hermes Agent**；
- 若关注产品化个人助手和桌面体验，可关注 **LobsterAI、Hermes Agent、CoPaw**；
- 若关注 WebUI、多 Provider 和轻量使用体验，可关注 **NanoBot**；
- 若关注插件/WASM/能力市场趋势，可关注 **ZeroClaw、LobsterAI、OpenClaw、Hermes Agent**；
- 若关注工具调用语义和本地模型适配，可关注 **Moltis、NullClaw、NanoBot、CoPaw**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
**日期：2026-09-21**  
**仓库：HKUDS/nanobot**  
**统计窗口：过去 24 小时**

---

## 1. 今日速览

过去 24 小时 NanoBot 维护活动非常活跃：共出现 **1 条 Issue 更新**、**17 条 PR 更新**，其中 **9 条仍待合并**，**8 条已关闭/合并**，说明项目处于高频迭代阶段。  
今日重点集中在 **WebUI 体验优化、OpenAI Responses 流式事件兼容、Provider 扩展、会话搜索性能、TUI/工具稳定性** 等方向。  
虽然没有新版本发布，但多个 PR 已经完成或进入待合并状态，显示维护团队正在为下一轮版本积累修复与功能改进。  
整体健康度较好：Bug 有对应修复 PR，测试覆盖被频繁补充；但也出现了一个标题为 “added malicious skill” 的安全相关 PR，需要维护者优先审查。

---

## 2. 版本发布

过去 24 小时 **无新版本发布**。

最近一次版本相关活动主要体现在文档更新：

- [PR #5828 docs: refresh v0.3.5 release information](https://github.com/HKUDS/nanobot/pull/5828) 已关闭  
  - 更新 README 中的 v0.3.5 发布信息。
  - 刷新 Recent Updates 与每日发布归档。
  - 说明当前版本在 Terminal、WebUI、上下文、Apps、Skills、自动化等方面的能力。

---

## 3. 项目进展

### 3.1 WebUI 架构与交互继续推进

- [PR #5823 refactor(webui): remove legacy message projection](https://github.com/HKUDS/nanobot/pull/5823) 已关闭  
  该 PR 完成 WebUI 事件协议迁移的后续清理，移除了旧的消息投影路径，包括 `replay_transcript_to_ui_messages` 以及 Python 端 UI 折叠逻辑。  
  这意味着 WebUI 更加依赖统一的 canonical events，减少了双路径兼容成本，有助于降低未来维护复杂度。

- [PR #5822 refactor: remove expired write_stdin compatibility](https://github.com/HKUDS/nanobot/pull/5822) 已关闭  
  移除了 `write_stdin` 到 `exec_session` 的过渡兼容逻辑。项目已进入 v0.3.5 之后的稳定阶段，因此清理旧兼容分支可以减少技术债。

- [PR #5827 feat(webui): show persisted fallback preset on replies](https://github.com/HKUDS/nanobot/pull/5827) 已关闭  
  在 WebUI 回复中展示实际触发 fallback 的命名 preset，提升用户对模型回退行为的可解释性。该改动对多 provider、多 preset 使用场景尤其重要。

- [PR #5836 fix(webui): make OAuth reauthentication actionable](https://github.com/HKUDS/nanobot/pull/5836) 已关闭  
  改善 OAuth 失效时的用户体验：区分凭据被拒绝与临时 catalog 失败。对于明确授权失败的情况，UI 会提示用户重新登录，而不是继续展示不可用的模型选择。

### 3.2 Provider 与 Responses API 兼容性增强

- [PR #5832 feat: add Unifically provider](https://github.com/HKUDS/nanobot/pull/5832) 已关闭  
  新增 Unifically 作为内置 LLM Provider，复用 OpenAI-compatible 路径。  
  变更包括：
  - 注册 `UNIFICALLY_API_KEY`
  - 添加 `https://api.unifically.com/v1`
  - 支持 `providers.unifically` 配置  
  这继续扩大 NanoBot 的 provider 生态。

- [PR #5834 fix(providers): handle `response.reasoning_text.*` events in the SSE Responses consumer](https://github.com/HKUDS/nanobot/pull/5834) 待合并  
  修复 raw SSE Responses API consumer 未处理 `response.reasoning_text.delta` / `response.reasoning_text.done` 的问题。该 PR 直接对应今日新 Issue [#5833](https://github.com/HKUDS/nanobot/issues/5833)。

### 3.3 测试与 CI 稳定性修复

- [PR #5835 test(agent): fix response-source CI contract](https://github.com/HKUDS/nanobot/pull/5835) 已关闭  
  修复 response-source runner 测试中未传入 `consolidate_history` callback 导致 CI 失败的问题。  
  这是测试契约层面的修复，不改变生产逻辑，但对主分支健康度重要。

### 3.4 WebUI Apps 与 MCP 生态扩展

- [PR #5830 feat(webui): add Baizhi Agent Toolkit MCP preset](https://github.com/HKUDS/nanobot/pull/5830) 已关闭  
  为 WebUI Apps 添加 Baizhi Cloud Agent Toolkit MCP preset。  
  用户可通过内置 preset 使用 hosted Streamable HTTP endpoint，并暴露：
  - `websearch_search`
  - `web_scrape`
  - `web_extract`  
  这表明 NanoBot 正继续将 WebUI Apps 打造成面向外部工具集成的入口。

---

## 4. 社区热点

由于数据中未提供有效评论数，所有 PR 的评论字段均为 `undefined`，Issue 评论数为 0，因此无法基于评论量排序。根据变更影响范围和用户场景，今日热点主要集中在以下条目。

### 4.1 Responses API reasoning_text 事件丢失

- Issue：[ #5833 SSE Responses consumer drops `response.reasoning_text.*` events that the SDK consumer handles](https://github.com/HKUDS/nanobot/issues/5833)  
- Fix PR：[ #5834 fix(providers): handle `response.reasoning_text.*` events in the SSE Responses consumer](https://github.com/HKUDS/nanobot/pull/5834)

**诉求分析：**  
用户在比较两个 Responses API stream consumer 时发现传输层行为不一致：SDK consumer 会处理 reasoning text 事件，而 raw SSE consumer 会丢弃相关事件。  
这会影响 xAI Grok、OpenAI Codex 等依赖 raw SSE Responses consumer 的 provider，使 reasoning 相关输出在某些路径下不可见或不完整。  
该问题已在同日出现修复 PR，响应速度较快。

### 4.2 WebUI 临时聊天状态保持

- PR：[ #5837 fix(webui): retain temporary chats across navigation](https://github.com/HKUDS/nanobot/pull/5837)

**诉求分析：**  
用户在切换会话、回复运行中或 compact workbench 卸载 pane 时，临时聊天可能丢失消息并回到新聊天欢迎页。  
这类问题直接影响 WebUI 的可靠性和用户信任，尤其是在长对话或运行中任务场景下。该 PR 通过将 in-memory message cache 提升到 app-session 层级来解决。

### 4.3 OpenAI-compatible API session_id 路由问题

- PR：[ #5838 fix(api): route each session_id to its own chat](https://github.com/HKUDS/nanobot/pull/5838)

**诉求分析：**  
此前所有 OpenAI-compatible API 请求都使用 `chat_id="default"`，即使请求携带不同 `session_id`。这会导致 processing session 与 request context、turn route、cron bindings、subagent origins、message-tool targets 等上下文键不一致。  
对于 API 用户而言，这可能造成多会话串线、上下文污染或工具路由异常。该 PR 是重要的 API 隔离性修复。

### 4.4 会话搜索性能优化

- PR：[ #5826 feat(webui): add FTS5 index for session search](https://github.com/HKUDS/nanobot/pull/5826)

**诉求分析：**  
此前 session search 每次查询需要扫描所有 JSONL transcript。随着工作区会话增多，这会成为明显性能瓶颈。  
该 PR 引入 per-workspace SQLite FTS5 index，说明用户或维护者已经关注到大规模历史会话下的搜索性能问题。

---

## 5. Bug 与稳定性

### 高优先级

#### 5.1 OpenAI-compatible API session_id 路由隔离错误

- PR：[ #5838 fix(api): route each session_id to its own chat](https://github.com/HKUDS/nanobot/pull/5838)  
- 状态：Open  
- 严重程度：高

**问题：**  
不同 `session_id` 的请求实际都落到 `chat_id="default"`，可能导致 API 多会话上下文被错误复用。  
**影响：**  
API 集成方、多用户代理、自动化任务、cron/subagent/tool routing 等场景都可能受到影响。  
**修复状态：**  
已有待合并 PR。

---

#### 5.2 SSE Responses consumer 丢弃 reasoning_text 事件

- Issue：[ #5833](https://github.com/HKUDS/nanobot/issues/5833)  
- Fix PR：[ #5834](https://github.com/HKUDS/nanobot/pull/5834)  
- 状态：Issue Open，PR Open  
- 严重程度：中高

**问题：**  
raw SSE consumer 未处理 `response.reasoning_text.delta` / `response.reasoning_text.done`，而 SDK consumer 能处理。  
**影响：**  
会导致 reasoning text 在部分 provider 的流式输出中缺失。  
**修复状态：**  
已有对应修复 PR，响应及时。

---

#### 5.3 WebUI 临时聊天导航后丢失

- PR：[ #5837 fix(webui): retain temporary chats across navigation](https://github.com/HKUDS/nanobot/pull/5837)  
- 状态：Open  
- 严重程度：中高

**问题：**  
切换会话、运行回复或 compact workbench 卸载 pane 后，临时聊天可能丢失消息。  
**影响：**  
用户可能误以为对话内容消失，影响 WebUI 可用性。  
**修复状态：**  
已有待合并 PR。

---

### 中优先级

#### 5.4 TUI Markdown 链接不可点击

- PR：[ #5829 fix(tui): make Markdown links clickable](https://github.com/HKUDS/nanobot/pull/5829)  
- 状态：Open  
- 严重程度：中

**问题：**  
TUI 中 Markdown 链接的渲染和点击检测存在问题。  
**修复：**  
升级 `@opentui/core` 至 0.5.11，并添加回归测试，确保链接 label 的每个 cell 都保留目标 URL。

---

#### 5.5 `read_file` 读取超长行时无法推进

- PR：[ #5824 fix(tools): keep read_file progressing on oversized lines](https://github.com/HKUDS/nanobot/pull/5824)  
- 状态：Open  
- 严重程度：中

**问题：**  
当首个编号行超过 `read_file` 字符预算时，可能返回空页并且 continuation offset 不推进。  
**影响：**  
工具读取大文件或含超长行文件时可能卡住。  
**修复：**  
返回有界前缀，并推进 offset，覆盖超长首行和中间行测试。

---

#### 5.6 OAuth 重新认证路径不清晰

- PR：[ #5836 fix(webui): make OAuth reauthentication actionable](https://github.com/HKUDS/nanobot/pull/5836)  
- 状态：Closed  
- 严重程度：中

**问题：**  
OAuth 凭据被拒绝与网络/限流等临时 catalog 失败不易区分。  
**修复：**  
在确认授权失败时隐藏模型搜索与选项，并提供 “Sign in again”。

---

#### 5.7 CI 测试契约失配

- PR：[ #5835 test(agent): fix response-source CI contract](https://github.com/HKUDS/nanobot/pull/5835)  
- 状态：Closed  
- 严重程度：中

**问题：**  
测试直接构造 `AgentRunSpec`，但未传入 context compaction 后强制要求的 `consolidate_history` callback。  
**修复：**  
补齐测试依赖，恢复 CI 健康。

---

### 安全关注

#### 5.8 可疑安全 PR：added malicious skill

- PR：[ #5821 added malicious skill](https://github.com/HKUDS/nanobot/pull/5821)  
- 状态：Open  
- 标签：security  
- 严重程度：高，需要人工审查

**说明：**  
标题显示 “added malicious skill”，且摘要为空。虽然可能是安全测试、恶意样本、检测用例或误提 PR，但由于涉及 skill 机制和安全标签，应由维护者优先确认其意图、代码行为和风险边界。  
**建议：**  
在合并前必须完成安全审查，确认是否为测试夹具、隔离样本或误提交。

---

## 6. 功能请求与路线图信号

### 6.1 WebUI 会话搜索性能进入路线图

- PR：[ #5826 feat(webui): add FTS5 index for session search](https://github.com/HKUDS/nanobot/pull/5826)

该 PR 实现了 [Issue #5509](https://github.com/HKUDS/nanobot/issues/5509) 所需的 session search 优化。  
从 JSONL 全量扫描转向 SQLite FTS5 索引，说明项目正在面向更大规模工作区和长期会话历史做性能建设。  
该能力很可能进入后续版本，因为它直接提升 WebUI 高频操作体验。

---

### 6.2 WebUI 完成轮次 UI 降噪

- PR：[ #5831 feat(webui): reduce completed turn UI noise](https://github.com/HKUDS/nanobot/pull/5831)

该 PR 尝试减少已完成 assistant turn 的视觉噪音，包括：
- 用 hover/focus contextual controls 替代常驻 footer chrome
- 默认折叠 completed activity
- 合并 activity status 与 message actions 的行空间
- 保留触控、键盘、reduced-motion、复制、测试等可访问性与功能需求

这反映出 WebUI 正从“功能完整”进入“交互打磨”阶段。

---

### 6.3 Provider 生态继续扩展

- PR：[ #5832 feat: add Unifically provider](https://github.com/HKUDS/nanobot/pull/5832)
- PR：[ #5825 feat: add reusable JEV client](https://github.com/HKUDS/nanobot/pull/5825)

Unifically provider 的加入说明 NanoBot 继续强化 OpenAI-compatible Provider 接入策略。  
JEV client 则面向 OpenRouter Decisions endpoint，为后续 heartbeat、shell policy、provider selection 等能力提供基础设施。  
这两个方向共同表明：项目可能继续投入“多 provider 管理、自动决策、策略化路由”能力。

---

### 6.4 MCP Preset 与 WebUI Apps 扩展

- PR：[ #5830 feat(webui): add Baizhi Agent Toolkit MCP preset](https://github.com/HKUDS/nanobot/pull/5830)

WebUI Apps 增加 Baizhi Agent Toolkit MCP preset，说明官方倾向于把常见外部工具集成封装为可选 preset，降低用户配置 MCP 的门槛。  
未来可能继续增加类似 hosted MCP preset 或第三方工具预设。

---

## 7. 用户反馈摘要

今日只有 1 条 Issue，且评论数为 0，因此可提炼的直接用户评论有限。结合 Issue 与 PR 摘要，可归纳以下使用痛点。

### 7.1 流式 API 行为需要一致性

- 相关 Issue：[ #5833](https://github.com/HKUDS/nanobot/issues/5833)  
用户在比较 SDK consumer 与 SSE consumer 时发现两者对 reasoning events 的处理不一致。  
这类反馈说明高级用户关注的不只是输出文本，而是完整的 event stream 语义，包括 reasoning delta、done、summary 等结构化事件。

### 7.2 WebUI 用户重视状态保持与导航稳定性

- 相关 PR：[ #5837](https://github.com/HKUDS/nanobot/pull/5837)  
临时聊天在导航后丢失，会给用户造成“消息没了”或“任务中断”的感受。  
这类问题通常在实际使用中非常敏感，因为它直接破坏会话连续性。

### 7.3 API 用户需要可靠的多 session 隔离

- 相关 PR：[ #5838](https://github.com/HKUDS/nanobot/pull/5838)  
OpenAI-compatible API 使用者通常会通过 `session_id` 维护多用户或多任务上下文。  
如果不同 session 被错误映射到同一个 chat，会带来上下文污染风险，这对生产集成场景影响较大。

### 7.4 大规模历史会话用户需要更快搜索

- 相关 PR：[ #5826](https://github.com/HKUDS/nanobot/pull/5826)  
从 JSONL 扫描迁移到 FTS5 索引，说明已有或预期存在大量 transcript 的用户场景。  
用户痛点是搜索延迟和工作区规模增长后的性能退化。

---

## 8. 待处理积压

本日报数据仅覆盖过去 24 小时，未提供长期未响应 Issue/PR 的历史信息，因此无法准确识别“长期未响应”的积压项。基于今日仍处于 Open 状态且影响较大的条目，建议维护者优先关注以下待处理事项。

### 高优先级待处理

1. [PR #5821 added malicious skill](https://github.com/HKUDS/nanobot/pull/5821)  
   - 原因：带有 security 标签，标题涉及 malicious skill，摘要为空。  
   - 建议：优先人工审查，确认是否为安全测试、隔离样本或恶意提交。

2. [PR #5838 fix(api): route each session_id to its own chat](https://github.com/HKUDS/nanobot/pull/5838)  
   - 原因：影响 OpenAI-compatible API 的多 session 隔离。  
   - 建议：优先 review，避免 API 用户出现上下文串线。

3. [Issue #5833](https://github.com/HKUDS/nanobot/issues/5833) / [PR #5834](https://github.com/HKUDS/nanobot/pull/5834)  
   - 原因：Responses API raw SSE consumer 与 SDK consumer 行为不一致。  
   - 建议：尽快合并修复，并补充回归测试。

### 中优先级待处理

4. [PR #5837 fix(webui): retain temporary chats across navigation](https://github.com/HKUDS/nanobot/pull/5837)  
   - 原因：影响 WebUI 临时聊天可靠性。  
   - 建议：重点验证运行中回复、导航切换、compact workbench 场景。

5. [PR #5826 feat(webui): add FTS5 index for session search](https://github.com/HKUDS/nanobot/pull/5826)  
   - 原因：涉及持久化索引和性能路径。  
   - 建议：关注索引一致性、迁移、损坏恢复和跨工作区隔离。

6. [PR #5824 fix(tools): keep read_file progressing on oversized lines](https://github.com/HKUDS/nanobot/pull/5824)  
   - 原因：工具读取超长行时可能卡住。  
   - 建议：合并前验证 continuation offset 在多种边界输入下稳定推进。

---

## 总体健康度评估

NanoBot 今日表现为 **高活跃、高维护响应、功能与稳定性并行推进**。  
项目没有发布新版本，但 PR 更新密集，且多个问题在同日出现报告与修复，说明维护响应速度较好。  
主要风险集中在三类：  
1. API/session 隔离正确性；  
2. Responses API 流式事件一致性；  
3. security 标签下的可疑 skill PR。  

如果上述高优先级 PR 能及时审查和合并，NanoBot 下一版本有望在 WebUI 稳定性、Provider 兼容性、搜索性能和多会话 API 可靠性方面取得明显改进。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-21  
仓库：NousResearch/hermes-agent

---

## 1. 今日速览

Hermes Agent 今日活跃度非常高：过去 24 小时共有 **50 条 Issue 更新**，其中 **49 条仍处于打开或活跃状态**，仅 **1 条关闭**；同时有 **50 条 PR 更新**，其中 **38 条待合并**、**12 条已合并或关闭**。  
今日新增问题主要集中在 **Agent 会话状态、Desktop/网关连接、技能管理、配置解析、本地模型兼容性、语音/TTS、Windows 平台稳定性** 等方向。  
维护侧响应也较快，多个高优先级 Bug 已出现对应修复 PR，例如 Volcengine Ark 标题生成失败、会话压缩展示重复、Desktop 认证恢复、Windows 后台弹窗等。  
整体来看，项目处于高开发强度阶段，功能面持续扩张，但稳定性压力明显上升，尤其是 **会话状态一致性、provider/fallback 路由、跨平台兼容和安全审批边界**。

---

## 2. 版本发布

今日 **无新版本发布**。

---

## 3. 项目进展

今日 PR 活动密集，尽管展示列表中大部分仍处于 OPEN 状态，但已有若干关闭或自动修复类 PR，另有多项修复已进入待合并队列，说明维护者正在快速处理主干回归和用户侧稳定性问题。

### 已关闭 / 已处理的 PR

#### #117837 `fmt(js): npm run fix auto-fix`  
链接：NousResearch/hermes-agent PR #117837  
状态：CLOSED  
类型：自动格式化修复  
说明：由 `hermes-seaeye[bot]` 自动生成，用于修复 JS lint/format 问题。该类 PR 通常用于保持前端/桌面端代码风格一致，若 CI 或主干变化导致失效会自动关闭并重新生成。

#### #117826 `fmt(js): npm run fix auto-fix`  
链接：NousResearch/hermes-agent PR #117826  
状态：CLOSED  
类型：Desktop 代码格式化  
说明：同样是自动格式化工作流产物，聚焦 Desktop 相关 JS/前端代码。

#### #117832 `test(sessions): held-store gate no---db invariant scoped to the gated actions`  
链接：NousResearch/hermes-agent PR #117832  
状态：CLOSED  
类型：测试修复 / 会话状态  
说明：修复主干测试红灯问题。背景是两个独立绿色分支合并后产生交叉冲突：一个测试断言所有 `hermes sessions` 子命令都不应使用 `--db`，另一个 PR 新增了合法的 `set-journal-mode --db` 离线命令。该 PR 将断言范围收窄到真正受 held-store gate 保护的动作。

#### #117829 `test(sessions): scope the held-store gate's no-alternate-store check to gated actions`  
链接：NousResearch/hermes-agent PR #117829  
状态：CLOSED  
类型：测试修复 / 主干回归  
说明：与 #117832、#117828 同属同一主干红灯修复系列，目标是消除会话命令测试中的过宽约束。

#### #117828 `test: held-store gate no longer forbids --db on unrelated sessions subcommands`  
链接：NousResearch/hermes-agent PR #117828  
状态：CLOSED  
类型：测试修复  
说明：解决 `tests/hermes_cli/test_sessions_held_store_gate.py` 因新旧测试假设冲突导致的失败。该问题虽是测试层面，但反映出 CLI 会话存储命令正在扩展，需要更精细的测试边界。

#### #117825 `オプティマイズ`  
链接：NousResearch/hermes-agent PR #117825  
状态：CLOSED  
类型：安全/工具/Agent 相关，但摘要信息不足  
说明：该 PR 描述模板未完整填写，涉及 `comp/agent`、`comp/tools`、`tool/file`、`tool/delegate`、`backend/docker` 等标签。由于摘要缺失，建议维护者确认关闭原因并避免类似低信息量 PR 进入审查队列。

### 重要待合并 PR 进展

#### #117830 `Fix Volcengine Ark title generation reasoning control`  
链接：NousResearch/hermes-agent PR #117830  
关联 Issue：#117810  
说明：修复 Volcengine Ark 在 `title_generation` 场景下拒绝 `reasoning_config={"enabled": False}` 导致 HTTP 400 的问题。PR 做法是在解析到 Volcengine Ark host 时，省略标题生成路径上的 reasoning-disable projection，同时保留其他 provider 和非标题任务的推理控制。

#### #117824 `fix(sessions): keep display identity across prune-shaped compaction carries`  
链接：NousResearch/hermes-agent PR #117824  
关联 Issue：#117750  
说明：修复会话压缩时 carried-forward 工具消息因裁剪后获得新 display identity，导致历史展示重复和顺序错乱的问题。该修复直接改善长会话可读性和状态一致性。

#### #117831 `fix(desktop): re-auth a lapsed saved Cloud gateway from Settings`  
链接：NousResearch/hermes-agent PR #117831  
说明：为 Desktop 中已保存但认证过期的 Hermes Cloud gateway 提供重新登录路径，避免用户在 session 失效后陷入无法恢复的连接状态。

#### #117833 `fix(windows): hide console windows spawned by the console-less desktop backend`  
链接：NousResearch/hermes-agent PR #117833  
说明：为 Desktop 后台触发的 console-helper spawn 增加 Windows 隐藏窗口 flags，减少 Windows 用户在使用桌面端时看到闪烁控制台窗口的问题。

#### #117836 `fix(skills): expose plugin skills across listing surfaces`  
链接：NousResearch/hermes-agent PR #117836  
说明：将已注册 plugin skills 暴露到 `hermes skills list` 和 Desktop skills API，同时保持 profile-scoped、platform-gated、read-only 等边界。这是技能系统可见性和插件集成体验上的重要改进。

#### #117834 `Dashboard chat can start in a chosen project/repo directory from any browser or phone`  
链接：NousResearch/hermes-agent PR #117834  
说明：Dashboard 新会话可以从浏览器或手机选择目标目录/仓库，而不是固定使用 dashboard 进程启动目录。这是对远程/移动工作流的重要增强。

---

## 4. 社区热点

### #117736：`skill_manage` 与 loader 的 frontmatter 解析严格度不一致  
链接：NousResearch/hermes-agent Issue #117736  
评论数：2  
标签：`type/bug`, `comp/agent`, `tool/skills`, `P2`  
热点原因：  
用户发现某些 skill 可以被 loader 正常加载和注入，但 `skill_manage` 无法维护，因为二者对 frontmatter 的解析严格度不同。典型触发条件是未加引号的 description 中包含 `: `。  
背后诉求：  
- 技能系统的读写路径需要一致解析规则。  
- 用户希望已加载技能不会进入“可用但不可维护”的半损坏状态。  
- 对技能生态而言，这是较基础的可靠性问题。

### #117682：`--ignore-existing` 仍启动本地 backend  
链接：NousResearch/hermes-agent Issue #117682  
评论数：2  
标签：`type/bug`, `area/config`, `comp/desktop`, `P2`  
热点原因：  
用户希望 Desktop 仅连接远程 gateway，但 `hermes desktop --ignore-existing` 或 `HERMES_DESKTOP_IGNORE_EXISTING=1` 仍会解析到本地 active runtime，导致本地 backend 被启动。  
背后诉求：  
- Desktop-only client 场景需要清晰、可靠的 backend 解析顺序。  
- `ignore-existing` 语义必须与用户预期一致。  
- 多实例/远程网关工作流正在变得重要。

### #117666：自定义 endpoint 名称包含冒号导致 Use/Delete 永久 404  
链接：NousResearch/hermes-agent Issue #117666  
评论数：2  
标签：`type/bug`, `comp/cli`, `area/config`, `comp/dashboard`, `area/local-models`, `P2`  
热点原因：  
自定义 endpoint 的 name/URL 中常见 `host:port` 格式，但 `_custom_endpoint_id()` 会将 `:` sanitize 为 `-`，导致存储 key 与配置文件中的真实 key 不一致。  
背后诉求：  
- 本地模型、自定义 OpenAI-compatible endpoint 使用越来越多。  
- 配置 ID 生成与存储格式必须保持稳定。  
- Dashboard 与 CLI 的配置管理需要统一。

### #117810：Volcengine Ark 标题生成 HTTP 400  
链接：NousResearch/hermes-agent Issue #117810  
评论数：1  
关联 PR：#117830  
热点原因：  
标题生成辅助任务在 Volcengine Ark 上因硬编码禁用 reasoning 的参数被拒绝。  
背后诉求：  
- Provider 特性差异需要更细粒度适配。  
- 不能将 OpenAI 或某个 provider 的控制参数默认投射到所有后端。

### #117806：显式 session model pin 绕过 fallback_providers  
链接：NousResearch/hermes-agent Issue #117806  
评论数：1  
标签：`provider/openai`, `area/billing`, `area/sessions`, `P2`  
热点原因：  
当 session 显式绑定模型时，主 provider 遇到 usage-limit 429 后不会切换 fallback provider，而是在同一 provider 上重试直至失败。  
背后诉求：  
- fallback provider 需要覆盖更多真实失败场景。  
- 用户期望 model pin 不应完全破坏可用性策略。  
- billing/usage limit 是生产环境中非常常见的失败模式。

---

## 5. Bug 与稳定性

### P1 / 高风险

#### #117802：ASCII fallback 会不可逆删除 session history 中的非 ASCII 内容  
链接：NousResearch/hermes-agent Issue #117802  
标签：`P1`, `comp/agent`, `area/sessions`, `sweeper:risk-session-state`  
问题：  
当 chat-completion 请求抛出包含 `"ascii"` 字样的 `UnicodeEncodeError` 时，恢复逻辑误判为系统 locale 是 ASCII，并对整个 messages array 执行非 ASCII 字符剥离，最终写入 `state.db`。  
影响：  
- 会话历史中的中文、俄文、emoji、代码注释等非 ASCII 内容可能被永久破坏。  
- 属于状态数据库层面的不可逆数据损坏风险。  
是否有 fix PR：当前展示数据中未看到明确对应 PR。

### P2 / 重要稳定性问题

#### #117806：显式模型绑定绕过 fallback providers  
链接：NousResearch/hermes-agent Issue #117806  
影响：usage-limit 429 无法切换备用 provider，session 直接死亡。  
是否有 fix PR：未看到明确对应 PR。

#### #117750：会话压缩后工具消息展示重复、乱序  
链接：NousResearch/hermes-agent Issue #117750  
关联 PR：#117824  
影响：长会话中 display history 可能出现同一逻辑事件的归档副本和活跃副本并存，影响用户理解和 UI 展示一致性。  
状态：已有修复 PR #117824。

#### #117747：`session.interrupt` 后 wake-word detector 永久暂停  
链接：NousResearch/hermes-agent Issue #117747  
标签：`comp/tui`, `tool/tts`, `comp/desktop`, `P2`  
影响：用户中断 TTS 后，唤醒词检测不会恢复，语音交互需重启才能正常工作。  
是否有 fix PR：未看到明确对应 PR。

#### #117710：custom provider 第二轮对话丢失 provider 导致 500  
链接：NousResearch/hermes-agent Issue #117710  
标签：`comp/agent`, `comp/gateway`, `P2`  
问题：  
`POST /api/sessions/{id}/chat` 在 custom provider 上第一轮可用，但持久化 session model 时丢失 provider 信息，第二轮 500。  
影响：  
- 自定义 provider / OpenAI-compatible Bedrock 等生产集成受影响。  
是否有 fix PR：未看到直接对应 PR，但 #117839 修复了 named custom provider vision routing，属于相关 provider identity 方向。

#### #117666：自定义 endpoint 名称含冒号导致 Use/Delete 404  
链接：NousResearch/hermes-agent Issue #117666  
影响：`host:port` 这类常见 endpoint 名称无法正常使用或删除。  
是否有 fix PR：未看到明确对应 PR。

#### #117682：Desktop ignore-existing 不阻止本地 backend  
链接：NousResearch/hermes-agent Issue #117682  
影响：远程 gateway 客户端场景被本地 runtime 干扰。  
是否有 fix PR：未看到明确对应 PR。

#### #117793：llama.cpp context overflow 文案无法识别  
链接：NousResearch/hermes-agent Issue #117793  
标签：`duplicate`, `area/compression`, `area/local-models`, `P2`  
影响：本地模型 context overflow 不能被识别为上下文限制问题，压缩/恢复策略无法正确触发。  
是否有 fix PR：未看到明确对应 PR。

#### #117792：cron classify_items.py 未把 JSON schema 放入 prompt  
链接：NousResearch/hermes-agent Issue #117792  
标签：`comp/cron`, `P2`  
影响：分类模型不知道必须输出 `{index, score, reason}` 格式，可能导致 cron 自动化结果不稳定。  
是否有 fix PR：未看到明确对应 PR。

#### #117800：生产网关向终端用户暴露 “No home channel is set” 基础设施信息  
链接：NousResearch/hermes-agent Issue #117800  
标签：`comp/gateway`, `platform/telegram`, `platform/whatsapp`, `P2`  
影响：新用户可能收到技术性配置说明，暴露内部操作细节，影响产品体验。  
是否有 fix PR：未看到明确对应 PR。

#### #117795：Telegram media_write_timeout 不可通过环境变量覆盖  
链接：NousResearch/hermes-agent Issue #117795  
标签：`comp/gateway`, `platform/telegram`, `P2`  
影响：大媒体发送或网络较差环境下，Telegram 发送路径缺少与其他 timeout 一致的配置能力。  
是否有 fix PR：未看到明确对应 PR。

#### #117791：TASK_COMPLETION_GUIDANCE 未阻止模型伪造不存在的 TOOL CALL  
链接：NousResearch/hermes-agent Issue #117791  
标签：`comp/agent`, `tool/terminal`, `provider/qwen`, `P2`  
影响：模型可能生成看似合理但并不存在的工具调用，影响任务可靠性。  
是否有 fix PR：未看到明确对应 PR。

### P3 / 中低优先级但影响体验

#### #117810：Volcengine Ark title_generation 失败  
链接：NousResearch/hermes-agent Issue #117810  
关联 PR：#117830  
状态：已有修复 PR。

#### #117784：Windows surrogate stdin round-trip 测试误调用裸 `bash`  
链接：NousResearch/hermes-agent Issue #117784  
影响：Windows + WSL 环境下测试污染 repo root，3 个测试失败。  
是否有 fix PR：未看到明确对应 PR。

#### #117696：`profiles.list` 返回字段违反自身 result contract  
链接：NousResearch/hermes-agent Issue #117696  
影响：生产日志警告；测试隔离模式下抛出 `ContractViolation`。  
是否有 fix PR：未看到明确对应 PR。

#### #117693：Google Meet realtime v2 仍使用已退役 OpenAI beta API shape  
链接：NousResearch/hermes-agent Issue #117693  
影响：Google Meet 实时模式无法连接。  
是否有 fix PR：未看到明确对应 PR。

#### #117801：Desktop 语音停止词硬编码英文，非英语 STT 中断失败  
链接：NousResearch/hermes-agent Issue #117801  
影响：俄语等非英语用户无法可靠使用 spoken stop / interrupt。  
是否有 fix PR：未看到明确对应 PR。

#### #117796：Windows CLI launcher 被 Defender 标记为 Pomal!rfn  
链接：NousResearch/hermes-agent Issue #117796  
影响：Windows 用户安装或运行 CLI 可能被杀软阻断。  
是否有 fix PR：未看到明确对应 PR。

---

## 6. 功能请求与路线图信号

### #117838：长会话每轮时间注入与日期引用重写  
链接：NousResearch/hermes-agent Issue #117838  
诉求：  
长会话达到 20k+ messages 后，模型对日期的注意力下降。用户希望每轮注入当前时间，并对“今天/昨天/明天”等日期引用进行改写或增强。  
路线图信号：  
这与 Hermes 的 long-lived session、个人助理记忆、时间感知能力高度相关。考虑到今日多条 issue 都涉及 session state 和 compression，该需求可能成为后续长会话可靠性改进的一部分。

### #117762：operator-required context fail-closed admission  
链接：NousResearch/hermes-agent Issue #117762  
状态：CLOSED  
诉求：  
当项目/persona context 被 scanner 阻断时，当前系统可能继续推理，只放入 block marker。用户建议对 operator-designated safety/behavioral contracts 采用 fail-closed。  
路线图信号：  
尽管该 RFC 已关闭，但它反映出用户对“关键上下文必须被加载，否则不应继续执行”的强诉求。后续可能以安全/合规配置项形式回归。

### #117542：Kanban board-level archive  
链接：NousResearch/hermes-agent Issue #117542  
诉求：  
当前 `hermes kanban archive` 只能归档单个任务，用户希望可以归档整个 board，例如 `hermes kanban boards archive <slug>`。  
路线图信号：  
Kanban 功能正在从任务级工具向完整项目管理面板演进。该需求简单直接，可能较容易进入后续版本。

### #117834：Dashboard 支持从任意浏览器/手机选择项目目录启动聊天  
链接：NousResearch/hermes-agent PR #117834  
状态：OPEN  
意义：  
这是明确的功能扩展，提升远程 Dashboard 使用体验。若合并，将增强 Hermes 在“单个 runner + 多端访问”场景下的可用性。

### #117836：plugin skills 暴露到 CLI 与 Desktop 列表  
链接：NousResearch/hermes-agent PR #117836  
状态：OPEN  
意义：  
技能系统从内置技能扩展到 plugin skills 的可发现性，说明插件生态和技能市场/技能管理体验可能是近期路线图重点。

---

## 7. 用户反馈摘要

### 1. 长会话用户最关心“状态不能被破坏”
相关 Issues：  
- #117802：非 ASCII 内容被不可逆剥离  
- #117750：压缩后工具消息重复和乱序  
- #117806：usage-limit 后 fallback 不生效  
- #117793：本地模型 context overflow 无法识别  

用户痛点：  
Hermes 被用于长期个人助理和复杂任务会话时，历史记录、工具结果、上下文压缩和 fallback 行为都必须稳定。一旦 `state.db` 或 display history 出错，用户不仅失去当前响应，还可能失去长期上下文可信度。

### 2. Desktop 用户需要更可控的远程连接与认证恢复
相关 Issues / PRs：  
- #117682：ignore-existing 无法避免本地 backend  
- #117831：Settings 中重新认证过期 Cloud gateway  
- #117541：auth-required remote 上 Kanban 无实时更新  
- #117747：TTS interrupt 后唤醒词不恢复  

用户痛点：  
Desktop 正在承担本地端、远程 gateway 客户端、Cloud gateway 客户端等多种角色。用户希望连接模式、认证状态、实时事件和语音交互都能稳定恢复，而不是需要重启或手工清理状态。

### 3. 自定义 provider 与本地模型用户正在增加
相关 Issues / PRs：  
- #117666：custom endpoint `host:port` key 不一致  
- #117710：custom provider 第二轮会话丢失 provider  
- #117839：preserve named custom provider vision routing  
- #117793：llama.cpp context limit 文案不兼容  

用户痛点：  
用户不再只使用默认 provider，而是大量使用本地模型、OpenAI-compatible endpoint、Bedrock SigV4、llama.cpp 等。Hermes 的 provider identity、capability lookup、错误解析和配置管理需要适配更多后端差异。

### 4. Windows 用户反馈集中在安装、测试和桌面体验
相关 Issues / PRs：  
- #117784：Windows + WSL 下测试调用裸 `bash`  
- #117796：Defender 检测 CLI launcher 为 Pomal!rfn  
- #117833：隐藏 Desktop 后台 spawn 的 console windows  

用户痛点：  
Windows 生态下的 shell、杀软、console 行为与 Linux/macOS 差异较大。Hermes 当前正在补齐 Windows 平台体验，但仍存在测试路径、安装信任和桌面后台进程体验问题。

### 5. 安全审批与 hardening 反馈增多
相关 Issues / PRs：  
- #117818：write approval 覆盖 memory/skills，但未覆盖 `write_file`/`patch`  
- #117817：多个 fail-open 路径希望改为 fail-closed 或至少日志提示  
- #117815：approval/redaction 视图与实际执行内容存在差异  
- #117827：smart review 保留 word 内 hash，避免审批输入被截断  

用户痛点：  
用户并不一定将这些视为私密漏洞，但希望审批、redaction、工具 allowlist 的行为更加透明一致。对于个人 AI 助手和自动化 agent 来说，“审查者看到的内容”和“实际运行的内容”必须尽可能一致。

---

## 8. 待处理积压

由于本次数据只覆盖过去 24 小时更新，无法完整判断“长期未响应”问题。但从当前打开状态和严重程度看，以下问题应优先进入维护者队列。

### 高优先级待处理

#### #117802：非 ASCII 会话历史被不可逆剥离  
链接：NousResearch/hermes-agent Issue #117802  
原因：P1、涉及持久化状态损坏，目前未见对应修复 PR。

#### #117806：显式模型绑定导致 fallback providers 失效  
链接：NousResearch/hermes-agent Issue #117806  
原因：P2、直接影响 session 可用性和 usage-limit 场景恢复能力。

#### #117710：custom provider 第二轮对话 500  
链接：NousResearch/hermes-agent Issue #117710  
原因：P2、影响自定义 provider 生产集成；与 provider identity 持久化相关。

#### #117682：Desktop `--ignore-existing` 不符合语义  
链接：NousResearch/hermes-agent Issue #117682  
原因：P2、影响远程 gateway-only 工作流。

#### #117666：自定义 endpoint 名称含冒号导致 Use/Delete 404  
链接：NousResearch/hermes-agent Issue #117666  
原因：P2、本地模型和自定义 endpoint 用户高频遇到 `host:port` 格式。

### 安全与审批 hardening 待关注

#### #117818：write approval 覆盖范围与注释承诺不一致  
链接：NousResearch/hermes-agent Issue #117818  

#### #117817：多个 silent fail-open 路径  
链接：NousResearch/hermes-agent Issue #117817  

#### #117815：approval/redaction 粒度不一致  
链接：NousResearch/hermes-agent Issue #117815  

这些 issue 被标注为 hardening 而非私密漏洞，但它们集中指向一个方向：Hermes 需要更强的可审计性和安全边界解释能力。

### 体验类积压

#### #117801：非英语语音停止词不可配置  
链接：NousResearch/hermes-agent Issue #117801  

#### #117796：Windows CLI 被 Defender 隔离  
链接：NousResearch/hermes-agent Issue #117796  

#### #117693：Google Meet realtime 使用退役 API shape  
链接：NousResearch/hermes-agent Issue #117693  

这些问题优先级不一定最高，但会显著影响特定用户群体的可用性，建议按平台/插件维护人分流处理。

---

## 总体健康度评估

Hermes Agent 今日表现为 **高活跃、高修复投入、高稳定性压力**。  
项目功能面正在快速扩张：Dashboard、Desktop、skills、plugin、Kanban、voice、custom providers 都在并行演进。但 issue 分布显示，系统复杂度已经明显上升，尤其是会话状态、provider 路由、跨平台兼容和审批安全语义。  

短期建议维护重点：  
1. 优先修复 P1/P2 的 session state 与 provider fallback 问题。  
2. 为 custom provider / local model 建立更系统的兼容测试。  
3. 收敛 Desktop backend 解析、认证恢复、远程 gateway 连接语义。  
4. 对 approval/redaction/write tools 建立一致的用户可见模型。  
5. 将 Windows 平台问题纳入常规 CI 与发布验证流程。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
**日期：2026-09-21**  
**仓库：** [sipeed/picoclaw](https://github.com/sipeed/picoclaw)

---

## 1. 今日速览

过去 24 小时内，PicoClaw 项目整体活跃度偏低：未出现新的 Issue 更新，也没有新版本发布。PR 侧仅有 1 条更新，且该 PR 已关闭，主要内容是补充 `v0.11.0` sprint 规划文档。  
从今日数据看，项目当前更偏向于路线图整理和设计阶段推进，而非代码实现或问题修复密集期。由于没有新增 Bug、用户反馈或社区讨论，短期稳定性风险未见上升，但社区互动热度也较低。

---

## 2. 项目进展

### 已关闭 PR

#### [#3383 docs: v0.11.0 sprint plan — agentic web3, module trust, ACP/mesh depth](https://github.com/sipeed/picoclaw/pull/3383)

- **状态：** Closed  
- **作者：** `stpinkie`  
- **创建时间：** 2026-09-20  
- **更新时间：** 2026-09-20  
- **评论数：** 未提供  
- **点赞数：** 0  

**主要内容：**

该 PR 添加或更新了与 `v0.11.0` sprint 相关的规划文档，核心包括：

- 新增 `docs/design/v0.11.0-sprint.md`
  - 记录 `v0.11.0` sprint 的设计方案
  - 覆盖 Tracks 67–75
  - 包含 ordering DAG、设计决策、各 track 文件映射、实现期验证 checklist、风险登记表等内容
- 更新 `.todo.md`
  - 新增 `v0.11.0` 进行中章节
  - 为各 track 增加 checklist 与验收标准

**推进意义：**

该 PR 虽然不是直接功能实现，但对项目后续开发有明显的路线图价值。它将 `v0.11.0` 的工作拆解为多个 track，并明确了验收标准和风险项，有助于后续实现阶段减少范围漂移和重复决策。

从摘要看，`v0.11.0` 可能会重点关注以下方向：

- agentic web3
- module trust
- ACP / mesh depth
- 模块级信任与验证机制
- 多 track 并行推进的工程治理

**项目推进评估：**

今日项目没有新增代码层面的功能合入或修复，但在规划层面推进了下一阶段版本的设计准备。整体进度可视为“路线图和执行计划向前推进”，但尚未体现为用户可感知的功能变化。

---

## 3. 社区热点

今日没有高互动 Issue 或 PR。

当前唯一有更新的 PR 为：

- [#3383 docs: v0.11.0 sprint plan — agentic web3, module trust, ACP/mesh depth](https://github.com/sipeed/picoclaw/pull/3383)

该 PR 的反应数为 0，评论数未提供，因此无法判断其在社区中产生了明显讨论热度。  
不过，从内容本身看，它释放了较强的路线图信号：维护者正在为 `v0.11.0` 规划 agentic web3、模块信任、ACP/mesh 等更复杂的架构方向。

**潜在社区诉求分析：**

尽管今日没有直接用户讨论，但该 PR 涉及的方向通常对应以下潜在需求：

- 更可靠的模块信任与安全边界
- 更复杂的 agent 协作或 mesh 拓扑能力
- 面向 web3 场景的 agentic 能力扩展
- 更明确的开发路线与验收标准

---

## 4. Bug 与稳定性

过去 24 小时内未发现新的 Bug、崩溃、回归或稳定性相关 Issue。

| 严重程度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| Critical | 无 | - | - |
| High | 无 | - | - |
| Medium | 无 | - | - |
| Low | 无 | - | - |

**稳定性观察：**

今日没有新增缺陷报告，也没有相关修复 PR。短期看，项目没有显著稳定性恶化信号。但由于没有用户反馈或测试失败数据，无法进一步判断实际运行质量是否改善。

---

## 5. 功能请求与路线图信号

今日没有新的功能请求 Issue。

不过，[#3383](https://github.com/sipeed/picoclaw/pull/3383) 提供了较清晰的路线图信号。根据 PR 标题和摘要，`v0.11.0` 可能围绕以下方向展开：

### 可能进入 v0.11.0 的方向

1. **Agentic Web3**
   - 可能涉及面向 web3 场景的 agent 能力扩展
   - 可能包括身份、交易、链上交互、去中心化协作等方向，但当前摘要未给出实现细节

2. **Module Trust**
   - 可能用于增强模块加载、执行或协作过程中的信任机制
   - 对插件化、模块化 agent 系统的安全性有重要意义

3. **ACP / Mesh Depth**
   - 可能与 agent communication protocol、agent mesh 或多节点协作深度有关
   - 说明项目可能在推进更复杂的多 agent 协作结构

4. **Track 67–75**
   - PR 中提到将 `v0.11.0` sprint 拆分为 Tracks 67–75
   - 说明后续开发会以多个并行或依赖 track 方式推进

**判断：**

这些内容更像是维护者主导的路线图规划，而非外部用户提出的功能请求。其进入下一版本的概率较高，但仍需要观察后续是否有实现类 PR 跟进。

---

## 6. 用户反馈摘要

过去 24 小时内无新增 Issue 评论或用户反馈数据。

因此今日无法提炼新的真实用户痛点、使用场景或满意度变化。

**当前可见信号：**

- 没有用户报告新的阻塞问题
- 没有用户提出新的功能需求
- 没有用户对近期路线图进行公开反馈
- 社区参与度在今日数据中较低

---

## 7. 待处理积压

本次数据未提供长期未响应的 Issue 或 PR，因此无法识别具体积压项。

今日没有新增开放 Issue，也没有待合并 PR。唯一更新的 PR [#3383](https://github.com/sipeed/picoclaw/pull/3383) 已关闭。

**维护者关注建议：**

- 若 `v0.11.0` sprint 文档已关闭但未合并，应确认关闭原因：
  - 是否被替代 PR 覆盖
  - 是否已合并但状态显示为 closed
  - 是否因范围调整被放弃
- 建议后续将 `v0.11.0` 规划拆解为实现类 Issue/PR，方便社区跟踪实际进展
- 对 Tracks 67–75，可考虑建立公开看板或 milestone，提升路线图透明度

---

## 项目健康度评估

| 维度 | 今日状态 | 评估 |
|---|---|---|
| 开发活跃度 | 1 条 PR 更新 | 偏低 |
| 社区讨论 | 无 Issue 更新，无明显评论/反应 | 偏低 |
| 稳定性风险 | 无新增 Bug | 稳定 |
| 路线图清晰度 | 有 `v0.11.0` sprint 文档信号 | 较好 |
| 发布节奏 | 无新版本 | 暂无变化 |

**综合判断：**  
PicoClaw 今日处于低互动、低变更状态，但并非停滞。项目重点似乎转向 `v0.11.0` 的规划和设计整理。短期用户侧变化有限，长期来看，agentic web3、module trust、ACP/mesh depth 等方向可能成为下一阶段核心演进路线。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
**日期：2026-09-21**  
**项目：NanoClaw — github.com/qwibitai/nanoclaw**

---

## 1. 今日速览

过去 24 小时内，NanoClaw 项目活跃度较低：仅有 **1 条 Issue 更新**，且没有新的 Pull Request、合并记录或版本发布。今日新增的问题集中在 **原生适配器的消息元数据传递**，特别是 WhatsApp 群聊中发送者显示名缺失，影响 Agent 对多人对话上下文的理解。  
从项目健康度看，当前没有明显的大规模回归或发布风险信号，但该问题触及 Agent 在真实聊天场景中的核心可用性，值得维护者优先分诊。由于该 Issue 暂无评论、暂无修复 PR，短期内仍处于待确认状态。

---

## 2. 项目进展

过去 24 小时内没有新的 Pull Request 更新。

- **合并 PR：0**
- **关闭 PR：0**
- **待合并 PR：0**

因此，今日未观察到代码层面的功能推进、Bug 修复或架构调整。项目在过去一天主要处于问题收集与等待分诊阶段。

---

## 3. 社区热点

### #3858 — Agent 在原生适配器中无法看到发送者显示名  
- 状态：OPEN  
- 标签：`kind/bug`, `triage/unresolved`  
- 作者：glifocat  
- 创建时间：2026-09-20  
- 评论数：0  
- 反应数：0  
- 链接：https://github.com/qwibitai/nanoclaw/issues/3858  

该 Issue 是今日唯一活跃事项。用户反馈在 WhatsApp 群聊中，Agent 接收到的入站消息只包含发送者的 **JID / 电话标识**，而没有可读的显示名，导致 Agent 难以区分群聊参与者。

背后的核心诉求是：  
- Agent 需要获得更完整的消息上下文，而不仅是底层协议 ID。  
- 原生聊天适配器应向模型层传递用户可识别的身份信息。  
- 在多人群聊场景中，发送者显示名是 Agent 正确理解对话、建立人物关系和回应上下文的基础字段。

虽然该问题目前没有评论和社区反应，但从影响面看，它可能影响 WhatsApp 原生适配器在群聊场景下的实际可用性。

---

## 4. Bug 与稳定性

### 高优先级：WhatsApp 群聊中发送者显示名缺失  
- Issue：[#3858](https://github.com/qwibitai/nanoclaw/issues/3858)  
- 状态：OPEN  
- 是否已有 fix PR：未发现  
- 影响版本：  
  - v2.3.0  
  - main `7902716b`  
  - channels `224827b9`  
- 平台：Linux  
- 严重程度评估：高  
- 类型：功能性 Bug / 上下文完整性问题  

#### 问题描述  
用户报告，在 WhatsApp 群聊中，Agent 接收到的每条入站消息只包含发送者的 phone JID，没有显示名。结果是模型无法通过自然名称区分不同参与者，只能看到底层账号标识。

#### 影响分析  
该问题不一定导致程序崩溃，但会明显降低 Agent 在多人聊天中的可用性：

1. **上下文理解受损**  
   Agent 无法自然地区分 “Alice 说了什么” 与 “Bob 说了什么”。

2. **群聊体验下降**  
   在群聊中，用户通常期待 Agent 能基于昵称、姓名或群名片识别发言者。

3. **可能影响记忆与个性化能力**  
   如果 NanoClaw 的记忆、偏好学习或角色识别依赖 sender 字段，该问题可能导致身份聚合错误或上下文污染。

4. **原生适配器一致性问题**  
   如果其他适配器能够提供 display name，而 WhatsApp 不能，可能导致跨平台行为不一致。

#### 建议维护者关注点  
- 检查 WhatsApp native adapter 是否能从消息事件中读取 `pushName`、联系人名称、群成员名称或类似 display name 字段。  
- 确认消息 schema 中是否已有 `senderDisplayName` / `displayName` / `profileName` 字段。  
- 如果底层协议只能提供 JID，应考虑在 adapter 层增加联系人缓存或成员信息解析。  
- 在模型输入层明确区分机器可识别 ID 与人类可读名称，例如：  
  - `sender_id`  
  - `sender_jid`  
  - `sender_display_name`  
  - `sender_alias`

---

## 5. 功能请求与路线图信号

今日没有明确的新功能请求。不过，[#3858](https://github.com/qwibitai/nanoclaw/issues/3858) 虽被标记为 Bug，但也释放出一个清晰的路线图信号：

### 潜在方向：增强多平台消息元数据标准化

用户实际需求不仅是修复 WhatsApp 显示名缺失，还包括：

- 为所有 native adapters 提供统一的 sender metadata。
- 在 Agent 输入中暴露人类可读的参与者名称。
- 支持群聊参与者身份解析。
- 避免模型直接面对底层协议 ID，例如 JID、电话号码或平台内部 ID。
- 在跨平台场景下保持消息结构一致。

如果后续出现相关 PR，该方向很可能被纳入下一轮适配器稳定性修复或消息 schema 改进中。

---

## 6. 用户反馈摘要

今日唯一用户反馈来自 WhatsApp 群聊场景，核心痛点较明确：

- **使用场景**：Linux 平台，NanoClaw v2.3.0 / main 分支，连接 WhatsApp 群聊。  
- **用户痛点**：Agent 无法通过显示名识别群聊成员。  
- **不满意点**：模型只看到 phone JID，缺少对人类可读的 sender display name。  
- **潜在期望**：Agent 应像真实群聊成员一样，知道是谁在发言，而不是只处理平台内部标识。  

该反馈说明 NanoClaw 在真实即时通讯集成场景中，除了消息收发能力外，还需要更强的上下文封装能力。对于个人 AI 助手类项目而言，联系人、昵称、群成员身份等信息是影响体验的重要基础设施。

---

## 7. 待处理积压

基于本次提供的数据，过去 24 小时内未发现长期未响应的历史 Issue 或 PR。当前需要关注的待处理项为：

### 待分诊 Bug  
- [#3858 — Agent never sees sender display names from native adapters](https://github.com/qwibitai/nanoclaw/issues/3858)  
  - 当前状态：OPEN  
  - 标签：`triage/unresolved`  
  - 评论数：0  
  - 修复 PR：暂无  
  - 建议动作：维护者应尽快确认是否为 WhatsApp adapter 数据提取缺失、消息 schema 未传递，还是模型上下文构造层丢弃了 display name。

---

## 项目健康度判断

今日 NanoClaw 活跃度偏低，没有代码合并和版本发布；但新增 Issue 指向一个较关键的真实使用场景问题。项目整体没有出现大面积故障信号，不过 WhatsApp 群聊 sender display name 缺失可能影响 Agent 在多人对话中的核心体验。建议维护者优先完成分诊，并评估是否需要统一 native adapters 的发送者元数据结构。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报  
**日期：2026-09-21**  
**仓库：** [nullclaw/nullclaw](https://github.com/nullclaw/nullclaw)

---

## 1. 今日速览

过去 24 小时内，NullClaw 项目新增/活跃 Issue 1 条，未出现新的 Pull Request，也没有新版本发布。整体活跃度偏低，主要社区反馈集中在 **Ollama 模型工具调用兼容性提示不足** 这一体验问题上。当前没有合并记录或修复提交，因此项目代码层面暂无明显推进。  
从今日数据看，项目维护重点可能需要放在 **错误提示可理解性、模型能力检测、用户排障体验** 等方面。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

过去 24 小时内无新的 Pull Request 更新，也没有合并或关闭的 PR。

- 合并 PR：无
- 关闭 PR：无
- 待合并 PR：无

因此，今日项目在功能实现、缺陷修复或架构演进方面暂无可观察的代码推进。

---

## 4. 社区热点

### [Issue #1000 - ollama incompatibility notification](https://github.com/nullclaw/nullclaw/issues/1000)

- **状态：** Open
- **类型：** enhancement
- **作者：** aaafgcfg
- **创建时间：** 2026-09-20
- **评论数：** 1
- **反应数：** 👍 0

该 Issue 是今日唯一活跃讨论项。用户反馈称，当 Ollama 使用的模型不支持 tools/tool calling 时，NullClaw 当前只返回较模糊的 `adapter error`，缺少明确说明，导致用户难以判断失败原因。

用户提到自己需要借助 Wireshark 抓包才定位到问题，这表明当前错误反馈链路对普通用户并不友好。该问题背后的核心诉求是：  
- 在 Ollama 模型不支持工具调用时，给出明确提示  
- 区分“适配器错误”和“模型能力不支持”  
- 降低用户排障成本  
- 改善本地模型接入体验

该反馈虽然不是高评论数热点，但由于它直接影响 AI Agent 工具调用能力的可用性，具有较高产品优先级参考价值。

---

## 5. Bug 与稳定性

今日未报告明确的崩溃、回归或安全问题。

不过，以下问题虽然被标记为 enhancement，但实际也涉及稳定性与可诊断性：

### 中等优先级：Ollama 工具调用不兼容时错误信息不清晰

- **Issue：** [#1000 - ollama incompatibility notification](https://github.com/nullclaw/nullclaw/issues/1000)
- **状态：** Open
- **是否已有 fix PR：** 暂无
- **影响范围：** 使用 Ollama 作为模型后端，并尝试启用 tools/tool calling 的用户
- **用户影响：**  
  - 当前仅看到泛化的 adapter error  
  - 无法快速判断是配置错误、模型问题还是 NullClaw 适配层问题  
  - 需要额外排查网络请求或模型响应，排障门槛较高

### 严重程度判断

| 严重程度 | 问题 | 状态 | 修复 PR |
|---|---|---|---|
| 中 | Ollama 模型不支持 tools 时缺少明确提示 | Open | 无 |

该问题暂未表现为程序崩溃，但会导致用户误判故障来源，影响本地模型集成体验。

---

## 6. 功能请求与路线图信号

### Ollama 模型能力检测与不兼容提示

- **Issue：** [#1000](https://github.com/nullclaw/nullclaw/issues/1000)
- **类型：** enhancement
- **建议方向：**
  1. 在调用 tools 前检测模型是否支持 tool calling
  2. 当模型不支持时返回明确错误，例如：  
     `The selected Ollama model does not support tool calling. Please use a model with tools support or disable tools.`
  3. 在 UI 或日志中区分：
     - 模型能力不支持
     - Ollama API 响应异常
     - NullClaw adapter 内部错误
     - 用户配置错误
  4. 增加文档说明：哪些 Ollama 模型支持工具调用，如何验证能力

### 是否可能进入下一版本

目前没有相关 PR，因此无法判断维护者是否已开始实现。但该需求具备以下特点，适合进入近期小版本或补丁版本：

- 实现范围相对明确
- 用户痛点清晰
- 不一定涉及大规模架构调整
- 可显著提升新用户和本地模型用户体验

如果项目近期计划增强 Ollama 集成，该 Issue 应被优先纳入路线图。

---

## 7. 用户反馈摘要

今日用户反馈集中体现出以下痛点：

### 1. 错误信息缺乏可解释性

用户在 Ollama 模型不支持 tools 的情况下，只看到模糊的 adapter error。该错误信息没有告诉用户真正原因，也没有给出下一步操作建议。

### 2. 本地模型能力差异没有被显式暴露

Ollama 生态中不同模型对工具调用的支持并不一致。如果 NullClaw 没有在运行前或失败时提示能力差异，用户很容易误认为是 NullClaw 或配置出现故障。

### 3. 排障成本过高

用户表示通过 Wireshark 才定位到问题，这说明当前日志和错误提示不足以支持正常排障。对于普通用户而言，这种排查方式门槛过高，会降低使用满意度。

### 4. 对 Agent 工具调用体验的期待较高

该反馈反映出用户正在使用 NullClaw 的工具调用/Agent 能力，并希望本地模型后端能够与之稳定配合。这是一个重要的产品信号：Ollama 集成质量会直接影响个人 AI 助手场景的可用性。

---

## 8. 待处理积压

基于今日提供的数据，暂未发现长期未响应的重要 Issue 或 PR。当前需要维护者关注的主要待处理项为：

### [Issue #1000 - ollama incompatibility notification](https://github.com/nullclaw/nullclaw/issues/1000)

- **状态：** Open
- **建议处理优先级：** 中
- **建议维护动作：**
  - 确认 Ollama adapter 当前错误处理逻辑
  - 判断是否可检测模型 tools 支持能力
  - 增加更清晰的错误提示
  - 如短期无法实现自动检测，可先改进报错文案和文档说明

---

## 项目健康度观察

| 指标 | 今日表现 | 评价 |
|---|---:|---|
| Issue 活跃度 | 1 条 | 低 |
| PR 活跃度 | 0 条 | 低 |
| Release 活跃度 | 0 个 | 无发布 |
| 社区反馈质量 | 明确、可操作 | 较高 |
| 稳定性风险 | 无崩溃报告 | 稳定 |
| 用户体验风险 | 错误提示不足 | 需关注 |

**总体判断：** NullClaw 今日开发活动较少，但出现了一个具有明确产品价值的用户反馈。该问题不属于严重故障，但直接影响 Ollama 本地模型与 Agent tools 能力的使用体验。建议维护者优先改善错误提示与模型兼容性检测，以降低用户排障成本并提升本地模型接入的可靠性。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报  
**日期：2026-09-21**  
**仓库：** [nearai/ironclaw](https://github.com/nearai/ironclaw)

## 1. 今日速览

过去 24 小时内，IronClaw 没有新的 Issue 更新，说明社区侧问题反馈与需求讨论较为安静。PR 侧共有 3 条更新，其中 1 条 release 相关 PR 已关闭，2 条 Dependabot 依赖升级 PR 仍处于待合并状态。整体来看，今日项目活跃度偏低到中等，主要集中在版本发布准备与依赖维护，而非功能开发或缺陷修复。当前没有新版本正式发布，但 `1.4.1-rc.1` 的 release cut 工作已出现，表明项目可能正在进入候选版本验证阶段。

---

## 2. 项目进展

### 已关闭 PR

#### [#8105 chore(release): cut 1.4.1-rc.1](https://github.com/nearai/ironclaw/pull/8105)  
- **状态：** Closed  
- **作者：** henrypark133  
- **创建 / 更新：** 2026-09-21 / 2026-09-21  
- **类型：** Release 准备 / 版本号维护  
- **摘要：**  
  该 PR 将 shipping `ironclaw` package 的版本推进到 **1.4.1-rc.1**，目的是让 Cut Ironclaw Release 工作流能够在合并提交上打出 `ironclaw-v1.4.1-rc.1` 标签。摘要中特别提到，`cut_ironclaw_release.py` 会拒绝候选 manifest 版本与请求版本不一致的 tag，因此版本 bump 必须先落地。

- **影响分析：**  
  这是一个发布流程相关 PR，本身不直接引入用户可见的新功能或修复，但对发布工程链路很关键。它说明维护者正在为 `1.4.1-rc.1` 候选版本做准备，项目可能已接近一个小版本修订或补丁版本发布节点。

- **项目推进程度：**  
  今日项目主要推进在 release engineering 层面，而不是功能层面。该 PR 对版本发布自动化流程有明确推动作用，但由于当前状态为 `CLOSED`，且数据中未显示是否 merged，需要谨慎判断：它可能是被关闭、替代，或通过其他方式完成。

---

### 待合并 PR

#### [#8104 chore(deps): bump the everything-else group across 1 directory with 29 updates](https://github.com/nearai/ironclaw/pull/8104)  
- **状态：** Open  
- **作者：** dependabot[bot]  
- **创建 / 更新：** 2026-09-20 / 2026-09-20  
- **标签：** dependencies, rust  
- **类型：** Rust 依赖升级  
- **摘要：**  
  该 PR 批量升级 `/` 目录下 `everything-else` 依赖组，共涉及 **29 个依赖更新**。已知示例包括：
  - `uuid`: `1.24.0` → `1.26.1`
  - `base64`: `0.22.1` → `0.23.1`
  - `rust_decimal`: 版本升级，摘要未完整展示

- **影响分析：**  
  该 PR 涉及范围较广，属于依赖生态维护型变更。潜在收益包括安全补丁、兼容性提升、性能改进以及上游 bug 修复。但由于一次性升级 29 个包，也存在较高的回归风险，尤其是 Rust crate 的 minor / patch 更新中可能包含行为差异。

- **建议关注点：**
  - CI 是否完整通过
  - 是否涉及 transitive dependency 的 breaking behavior
  - 是否需要重点跑 agent runtime、数据序列化、CLI、网络请求等核心路径测试
  - `base64`、`uuid`、`rust_decimal` 等基础依赖升级是否影响序列化格式、标识符生成、数值精度处理

---

#### [#8103 chore(deps): bump the actions group across 1 directory with 8 updates](https://github.com/nearai/ironclaw/pull/8103)  
- **状态：** Open  
- **作者：** dependabot[bot]  
- **创建 / 更新：** 2026-09-20 / 2026-09-20  
- **标签：** dependencies, github_actions  
- **类型：** GitHub Actions / CI 依赖升级  
- **摘要：**  
  该 PR 批量升级 `/` 目录下 GitHub Actions 依赖组，共涉及 **8 个 action 更新**。已知示例包括：
  - `anthropics/claude-code-action`: `1.0.183` → `1.0.228`
  - `actions/setup-node`: `4.0.2` → `7.0.0`

- **影响分析：**  
  该 PR 主要影响 CI/CD 与自动化工作流，不直接影响用户运行时体验。值得注意的是，`actions/setup-node` 从 v4 升至 v7，属于较大的主版本跨度，可能包含运行环境、默认行为或 Node.js 版本管理方面的变化。`claude-code-action` 升级也可能影响 AI 辅助代码审查、自动化生成或相关 workflow 行为。

- **建议关注点：**
  - release workflow 是否仍能正常触发
  - CI 缓存策略是否受影响
  - Node 版本解析、依赖安装和构建流程是否保持一致
  - Claude Code Action 的权限、输出格式或触发条件是否发生变化

---

## 3. 社区热点

今日没有 Issue 更新，PR 也未显示评论数与反应数，因此社区讨论热度整体较低。

相对值得关注的热点是以下两个 Dependabot 批量升级 PR：

1. [#8104 Rust 依赖批量升级，29 个更新](https://github.com/nearai/ironclaw/pull/8104)  
   - **关注点：** 更新面广，潜在影响运行时稳定性。  
   - **背后诉求：** 维护依赖健康度，降低安全与兼容性风险，为后续 release 保持依赖栈新鲜。

2. [#8103 GitHub Actions 批量升级，8 个更新](https://github.com/nearai/ironclaw/pull/8103)  
   - **关注点：** CI/CD 基础设施升级，尤其涉及 `actions/setup-node` 跨主版本更新。  
   - **背后诉求：** 保持自动化工作流可维护，减少旧版 actions 带来的弃用、权限、安全或兼容性问题。

由于今日没有用户 Issue、评论或表情反馈，暂未观察到明确的用户侧争议、需求集中点或痛点爆发。

---

## 4. Bug 与稳定性

过去 24 小时内没有新的 Bug Issue 报告，也没有崩溃、回归或稳定性问题被记录。

当前与稳定性相关的主要信号来自依赖升级 PR：

### 中等风险：Rust 依赖批量升级  
- **相关 PR：** [#8104](https://github.com/nearai/ironclaw/pull/8104)  
- **风险等级：** Medium  
- **原因：** 一次性升级 29 个 Rust 依赖，可能引入行为变化或间接依赖差异。  
- **是否已有 fix PR：** 不适用，该 PR 本身是维护性更新，不是针对已报告 bug 的修复。  
- **建议：** 合并前应确保完整测试覆盖核心路径，尤其是 agent 执行、配置解析、数据序列化、身份标识、数值处理和网络交互。

### 中低风险：GitHub Actions 升级可能影响 CI/CD  
- **相关 PR：** [#8103](https://github.com/nearai/ironclaw/pull/8103)  
- **风险等级：** Medium-Low  
- **原因：** CI 依赖升级通常不影响用户运行时，但可能影响构建、测试、release cut 或自动化审查。  
- **是否已有 fix PR：** 不适用。  
- **建议：** 在合并前重点验证 release workflow 与测试矩阵，避免影响后续 `1.4.1-rc.1` 或正式版本发布流程。

---

## 5. 功能请求与路线图信号

今日没有新的功能请求 Issue，也没有明显的功能开发型 PR。

不过，从 release 相关 PR 可以观察到一个路线图信号：

### `1.4.1-rc.1` 候选版本准备中  
- **相关 PR：** [#8105](https://github.com/nearai/ironclaw/pull/8105)  
- **信号解读：**  
  维护者已开始围绕 `1.4.1-rc.1` 进行版本切割准备，这通常意味着项目进入候选版本稳定阶段。由于该 PR 摘要聚焦于 manifest version 与 release tag 的一致性，当前阶段更像是发布工程与版本一致性修正，而非新增功能开发。

- **可能纳入下一版本的内容：**  
  基于今日数据，无法确认具体功能会被纳入 `1.4.1`。但两个依赖升级 PR 若通过测试并合并，可能作为维护性更新进入后续版本：
  - [#8104 Rust 依赖更新](https://github.com/nearai/ironclaw/pull/8104)
  - [#8103 GitHub Actions 更新](https://github.com/nearai/ironclaw/pull/8103)

---

## 6. 用户反馈摘要

过去 24 小时内没有新的 Issue 评论、用户反馈或社区讨论记录，因此无法从真实用户评论中提炼新增痛点。

目前可确认的是：

- **没有新增用户报告的 Bug**
- **没有新增用户提出的功能请求**
- **没有新增用户表达满意或不满**
- **没有明显的使用场景讨论**

从项目运营角度看，今日用户侧信号较弱，维护者侧活动主要集中在发布流程与依赖维护。

---

## 7. 待处理积压

基于本次提供的数据，无法识别长期未响应的重要 Issue 或历史 PR。今日可见的待处理事项主要是以下两个 Open PR：

### [#8104 Rust 依赖批量升级](https://github.com/nearai/ironclaw/pull/8104)  
- **状态：** Open  
- **建议优先级：** 中高  
- **原因：** 涉及 29 个依赖更新，更新面较大。若项目正在准备 `1.4.1-rc.1` 或后续正式版本，建议尽快明确是否纳入当前 release train，避免 release 前后依赖状态不一致。

### [#8103 GitHub Actions 批量升级](https://github.com/nearai/ironclaw/pull/8103)  
- **状态：** Open  
- **建议优先级：** 中  
- **原因：** 影响 CI/CD 与自动化流程。若 release workflow 依赖相关 actions，应在 release cut 前完成验证，尤其关注 `actions/setup-node` 主版本升级后的兼容性。

---

## 项目健康度评估

- **开发活跃度：** 中低  
- **维护活跃度：** 中等  
- **社区互动：** 低  
- **发布节奏：** 有候选版本准备信号，但暂无正式 release  
- **稳定性风险：** 当前无新增用户报告问题；主要风险来自批量依赖升级  
- **总体判断：** IronClaw 今日处于维护与发布准备阶段，社区讨论安静，代码层面没有明显功能推进。短期重点应放在 `1.4.1-rc.1` 发布链路一致性、依赖升级验证，以及 CI/CD 工作流稳定性确认。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报  
日期：2026-09-21  
仓库：netease-youdao/LobsterAI

---

## 1. 今日速览

过去 24 小时 LobsterAI 没有新增或更新 Issue，但 PR 活动较高，共有 11 条 PR 更新，其中 4 条仍处于 Open 状态，7 条已关闭或合并。项目当前维护重心明显集中在 OpenClaw 网关稳定性、Windows 启动/修复链路、插件兼容、内置浏览器能力以及 IM/定时任务体验修复上。

版本发布节奏非常密集，近期连续发布了 2026.9.14、2026.9.15、2026.9.17、2026.9.20 四个版本，说明项目仍处于快速迭代期。整体健康度较好：核心维护者响应快、修复 PR 密集，但同时也暴露出 OpenClaw 兼容迁移、网关重启、插件运行时上下文等稳定性问题仍在持续收敛。

---

## 2. 版本发布

### 最新版本：LobsterAI 2026.9.20  
链接：https://github.com/netease-youdao/LobsterAI/releases/tag/2026.9.20

从已披露的 Release Notes 看，2026.9.20 主要包含以下方向：

#### 主要更新

- **子智能体会话可见性**
  - 关联 PR：[#2703](https://github.com/netease-youdao/LobsterAI/pull/2703)
  - 提升多 Agent / Subagent 场景下的会话透明度，有利于用户理解子任务执行状态。

- **内置 Agent 浏览器支持 Passkey / WebAuthn**
  - 关联 PR：[#2723](https://github.com/netease-youdao/LobsterAI/pull/2723)
  - 增加 browserPasskeys 模块、passkey 服务、页面观察器、preload bridge，以及 macOS WebAuthn 集成。
  - 对需要登录第三方服务、使用现代无密码认证的网站自动化场景很关键。

- **定时任务相关能力**
  - Release 文本中出现 `feat: scheduled ta...`，但数据截断，无法确认完整变更。
  - 今日 PR 中也出现定时任务修复：[#2722](https://github.com/netease-youdao/LobsterAI/pull/2722)。

#### 潜在破坏性变更 / 行为变化

- **后台任务能力被移除**
  - 关联 PR：[#2724](https://github.com/netease-youdao/LobsterAI/pull/2724)
  - 移除了 background job store、OpenClaw `tasks.list` / `tasks.cancel` 网关调用、`cowork:backgroundJob:*` IPC 通道，以及相关前端面板、类型和 i18n 文案。
  - 如果用户或二次开发者依赖后台任务 API，需要关注这一变更带来的兼容性影响。

#### 迁移注意事项

- 使用 OpenClaw、插件系统或网关相关能力的用户，建议优先升级到 2026.9.20 后的修复分支或关注今日修复 PR，因为 9.20 后仍有多个与 OpenClaw 网关、SQLite、Windows 进程退出、插件 ESM 上下文有关的修复在推进。
- macOS 用户如果使用内置浏览器登录支持 Passkey / WebAuthn 的服务，需要注意新版可能涉及 entitlements 和打包权限变化。

---

### 近期版本节奏

#### LobsterAI 2026.9.17  
链接：https://github.com/netease-youdao/LobsterAI/releases/tag/2026.9.17

重点围绕 OpenClaw 共享状态迁移、启动前修复、快照回滚、Agent media migration 等兼容与恢复能力展开。说明 9 月中旬版本线的主要目标之一是降低 OpenClaw 升级和状态迁移失败的风险。

#### LobsterAI 2026.9.15  
链接：https://github.com/netease-youdao/LobsterAI/releases/tag/2026.9.15

重点包括：

- OpenClaw 兼容性修复。
- xAI auth credentials 迁移到 canonical SQLite store。
- OpenClaw 相关恢复逻辑改进。

这表明项目正在将认证、插件、网关状态逐步收敛到更标准化的 SQLite 存储结构。

#### LobsterAI 2026.9.14  
链接：https://github.com/netease-youdao/LobsterAI/releases/tag/2026.9.14

重点包括：

- OpenClaw 升级到 v2026.8.1。
- Artifact workflows 改进。
- Markdown 编辑支持与体验优化。

该版本更偏功能扩展和基础设施升级，是后续 OpenClaw 修复与兼容工作的基础版本。

---

## 3. 项目进展

### 今日已关闭 / 已合并的重要 PR

> 注：数据中 PR 状态为 `CLOSED`，未区分 merged 与直接关闭；以下按“已关闭/可能已合入”处理。

---

### 3.1 内置浏览器支持 Passkey / WebAuthn

- PR：[#2723 feat(browser): add passkey/WebAuthn support for the in-app agent browser](https://github.com/netease-youdao/LobsterAI/pull/2723)
- 状态：CLOSED
- 作者：fisherdaddy
- 涉及区域：renderer、build、main、macOS、artifacts

该 PR 为内置 Agent 浏览器增加 Passkey / WebAuthn 支持，包括：

- browserPasskeys 模块；
- passkey service；
- page observer；
- preload bridge；
- macOS WebAuthn 集成；
- 打包所需 entitlements；
- 浏览器面板中的 passkey 提示组件；
- i18n 文案和共享常量。

**项目推进意义：**  
这是 Agent 浏览器能力的一次重要增强。随着越来越多网站采用 Passkey、WebAuthn、多因素认证，AI Agent 如果要在真实网页环境中完成登录、操作和自动化任务，必须处理现代认证流程。该 PR 提升了 LobsterAI 在真实浏览器代理场景中的可用性。

---

### 3.2 Windows OpenClaw 网关退出与一键修复链路修复

- PR：[#2729 fix(openclaw): recover Windows gateway exits and repair startup](https://github.com/netease-youdao/LobsterAI/pull/2729)
- 状态：CLOSED
- 作者：btc69m979y-dotcom
- 涉及区域：main、openclaw

该 PR 解决 Windows 上 OpenClaw gateway 重启和一键修复失败的问题。问题表现为：

- 日志显示 `OpenClaw gateway process ... did not exit after SIGKILL`；
- 实际上进程可能稍后已经退出；
- 修复流程因此误判失败；
- 安装态环境下还发现了额外的 repair blockers。

PR 的核心改动是等待 Windows 进程确认终止，并修复安装环境中的启动修复阻塞点。

**项目推进意义：**  
这是一个重要稳定性修复，尤其面向 Windows 用户。OpenClaw 网关是项目运行时核心组件之一，网关重启和修复失败会直接影响插件、IM、Agent 工具调用等能力。

---

### 3.3 OpenClaw SQLite 只读结果文件修复

- PR：[#2728 fix: openclaw sqlite readonly result file](https://github.com/netease-youdao/LobsterAI/pull/2728)
- 状态：CLOSED
- 作者：fisherdaddy
- 涉及区域：main、openclaw

该 PR 摘要为空，但标题显示其修复 OpenClaw SQLite 结果文件只读问题。

**项目推进意义：**  
SQLite 是近期 OpenClaw 状态和配置迁移的核心存储层。只读文件问题可能导致修复流程、状态写入、插件配置同步失败。该修复有助于提升 OpenClaw 运行和迁移可靠性。

---

### 3.4 可选定向更新候选版本支持

- PR：[#2730 feat(updater): support optional targeted update candidates](https://github.com/netease-youdao/LobsterAI/pull/2730)
- 状态：CLOSED
- 作者：btc69m979y-dotcom
- 涉及区域：renderer、main

该 PR 支持登录会话接收可选的定向更新候选版本，同时保留现有更新检查逻辑：

- 只有当候选版本有效且更新时才使用；
- 候选检查不可用或失败时回退到现有更新结果；
- 对更新逻辑做了兼容性保护。

**项目推进意义：**  
该能力可能用于灰度发布、定向测试、分批升级或企业用户定制更新。对于一个快速迭代项目来说，这有助于降低新版本直接全量发布带来的回归风险。

---

### 3.5 微信定时任务目标大小写与重发提示修复

- PR：[#2722 fix(scheduled-task): preserve Weixin target casing and explain resend rejection](https://github.com/netease-youdao/LobsterAI/pull/2722)
- 状态：CLOSED
- 作者：fisherdaddy
- 涉及区域：renderer、main

该 PR 修复定时任务向微信目标发送时的问题：

- 保留 Weixin direct peer id 的原始大小写；
- 在 resend 前修复被小写化的目标；
- 当微信因上下文过期或主动消息配额耗尽而拒绝发送时，向用户展示 session-expired 提示。

**项目推进意义：**  
这直接改善 IM / 微信场景下的定时任务可靠性和可解释性。相比单纯修复发送失败，新增错误解释能帮助用户理解是 session 过期、上下文失效还是额度耗尽。

---

### 3.6 移除 Cowork 后台任务功能

- PR：[#2724 refactor(cowork): remove background jobs feature](https://github.com/netease-youdao/LobsterAI/pull/2724)
- 状态：CLOSED
- 作者：fisherdaddy
- 涉及区域：renderer、main、cowork、artifacts

该 PR 移除了：

- background job store；
- OpenClaw `tasks.list` / `tasks.cancel` gateway calls；
- `cowork:backgroundJob:*` IPC channels；
- renderer hook；
- task panel section；
- 相关 types 与 i18n strings。

**项目推进意义：**  
这是一次功能裁剪和架构简化。可能说明后台任务能力当前成本高、使用不足或与新任务机制重叠。对用户来说，若已依赖 background jobs，需要关注替代路径。

---

### 3.7 Release 分支处理

- PR：[#2725 Release/2026.9.18](https://github.com/netease-youdao/LobsterAI/pull/2725)
- 状态：CLOSED
- 作者：liuzhq1986
- 涉及区域：renderer、build、docs、main、openclaw、cowork、im、macOS、artifacts

该 PR 是一次 release 分支相关变更，覆盖范围较广。由于摘要为空，无法进一步确认具体内容。

**项目推进意义：**  
从覆盖区域看，它可能承担了 2026.9.18/2026.9.20 版本发布前后的集成工作。

---

## 4. 社区热点

今日没有 Issue 更新，PR 评论数在数据中为 `undefined`，reaction 均为 0，因此无法基于评论量或表情反应识别传统意义上的“最热讨论”。

不过从 PR 数量和主题集中度看，今日热点主要集中在以下几个方向：

### 4.1 OpenClaw 网关稳定性与配置热更新

- [#2729 fix(openclaw): recover Windows gateway exits and repair startup](https://github.com/netease-youdao/LobsterAI/pull/2729)
- [#2728 fix: openclaw sqlite readonly result file](https://github.com/netease-youdao/LobsterAI/pull/2728)
- [#2721 fix(openclaw): apply IM configuration without restarting the gateway](https://github.com/netease-youdao/LobsterAI/pull/2721)
- [#2731 fix(plugins): complete nsp-clawguard ESM startup context](https://github.com/netease-youdao/LobsterAI/pull/2731)

**背后诉求：**  
用户希望 OpenClaw 网关更稳定，配置修改不应打断正在运行的任务，插件加载不应因 ESM 上下文缺失导致崩溃，Windows 下修复和重启也应可靠完成。

---

### 4.2 真实网页自动化与认证能力

- [#2723 feat(browser): add passkey/WebAuthn support for the in-app agent browser](https://github.com/netease-youdao/LobsterAI/pull/2723)

**背后诉求：**  
Agent 浏览器要进入真实生产场景，必须适配 Passkey、WebAuthn 等现代登录方式。该能力对办公自动化、SaaS 操作、账号登录类任务非常关键。

---

### 4.3 能力市场、数字员工和专家团队

- [#2726 feat: add digital employees, expert teams and capability markets](https://github.com/netease-youdao/LobsterAI/pull/2726)

**背后诉求：**  
该 PR 体现出项目正在从“单体 AI 助手 / Agent 工具”向“能力市场 + 数字员工 + 专家团队”方向扩展，可能是未来产品化和生态化的重要路线。

---

## 5. Bug 与稳定性

### 严重级别：高

#### 5.1 nsp-clawguard 在原生 ESM 加载时启动崩溃

- PR：[#2731 fix(plugins): complete nsp-clawguard ESM startup context](https://github.com/netease-youdao/LobsterAI/pull/2731)
- 状态：OPEN
- 作者：btc69m979y-dotcom
- 涉及区域：docs、main

问题描述：

- `nsp-clawguard 2.5.0` 在原生 ESM 加载时发生启动崩溃；
- 现有 v1 补丁只补齐了 `require`；
- 插件虽然能注册成功，但 `gateway_start` 中 SQL.js 初始化访问缺失的 `__dirname`；
- 网关 ready 后退出 1，并反复重启。

修复方向：

- 补齐模块内 `__filename` / `__dirname`；
- 通过 `fileURLToPath(import.meta.url)` 正确处理 Windows 盘符、空格和中文路径；
- 让真实启动回调可以完成数据库初始化。

是否已有 fix PR：有，[#2731](https://github.com/netease-youdao/LobsterAI/pull/2731)，当前未合并。

---

#### 5.2 Windows OpenClaw gateway 重启 / 一键修复误判失败

- PR：[#2729 fix(openclaw): recover Windows gateway exits and repair startup](https://github.com/netease-youdao/LobsterAI/pull/2729)
- 状态：CLOSED
- 作者：btc69m979y-dotcom

问题描述：

- Windows gateway 进程退出确认存在竞态；
- 即便进程稍后退出，系统仍可能报 `did not exit after SIGKILL`；
- 一键修复流程可能因此失败。

是否已有 fix PR：有，[#2729](https://github.com/netease-youdao/LobsterAI/pull/2729)，已关闭。

---

### 严重级别：中

#### 5.3 OpenClaw SQLite 结果文件只读

- PR：[#2728 fix: openclaw sqlite readonly result file](https://github.com/netease-youdao/LobsterAI/pull/2728)
- 状态：CLOSED
- 作者：fisherdaddy

问题描述：

- OpenClaw SQLite result file 出现 readonly 问题；
- 可能影响结果写入、修复流程或状态持久化。

是否已有 fix PR：有，[#2728](https://github.com/netease-youdao/LobsterAI/pull/2728)，已关闭。

---

#### 5.4 OpenClaw entry hooks 在 sync 后丢失

- PR：[#2727 fix(user_plugins): persist OpenClaw entry hooks across sync (#2654)](https://github.com/netease-youdao/LobsterAI/pull/2727)
- 状态：OPEN
- 作者：FOWEPJF255

问题描述：

- `plugins.entries.*.hooks` 未能在 SQLite 中持久化；
- `syncToDisk` 后 gateway restart 会丢失 OpenClaw entry hook 配置；
- 影响用户插件入口 hook 的稳定性。

修复方向：

- 在 SQLite 中持久化 hooks；
- 在 `syncToDisk` 时重写 hooks；
- 对齐 store、sync、plugin manager 路径。

是否已有 fix PR：有，[#2727](https://github.com/netease-youdao/LobsterAI/pull/2727)，当前未合并。

---

#### 5.5 保存 IM 配置需要重启 gateway，且存在 watcher 竞态

- PR：[#2721 fix(openclaw): apply IM configuration without restarting the gateway](https://github.com/netease-youdao/LobsterAI/pull/2721)
- 状态：OPEN
- 作者：alison-xx

问题描述：

- 保存 IM 配置可能强制整个 gateway 重启；
- 会中断无关任务；
- 与配置文件 watcher 存在竞态；
- 写 RPC 成功不代表 runtime 已应用配置。

修复方向：

- 对符合条件的配置变更通过 live gateway 应用；
- 避免不必要的 gateway 重启；
- 提升配置变更的实时性和可靠性。

是否已有 fix PR：有，[#2721](https://github.com/netease-youdao/LobsterAI/pull/2721)，当前未合并。

---

### 严重级别：低到中

#### 5.6 微信定时任务目标大小写与重发失败提示

- PR：[#2722 fix(scheduled-task): preserve Weixin target casing and explain resend rejection](https://github.com/netease-youdao/LobsterAI/pull/2722)
- 状态：CLOSED
- 作者：fisherdaddy

问题描述：

- Weixin direct peer id 被 normalize 时可能丢失原始大小写；
- resend 前目标可能被错误小写化；
- 微信拒绝发送时缺少明确解释。

是否已有 fix PR：有，[#2722](https://github.com/netease-youdao/LobsterAI/pull/2722)，已关闭。

---

## 6. 功能请求与路线图信号

今日没有新的 Issue 型功能请求，但多个 PR 已释放明显路线图信号。

### 6.1 能力市场、数字员工、专家团队

- PR：[#2726 feat: add digital employees, expert teams and capability markets](https://github.com/netease-youdao/LobsterAI/pull/2726)
- 状态：OPEN
- 作者：alison-xx

该 PR 引入：

- capability marketplace workflow；
- skill discovery；
- digital employees；
- expert teams；
- expert kits；
- tool plugins；
- MCP tool exposure 配置；
- SQLite persistence；
- OpenClaw 集成。

**路线图判断：**  
这是今日最重要的产品方向信号。LobsterAI 可能正在从“个人 AI 助手”向“可组合能力平台”演进。若该 PR 合入，下一版本很可能出现围绕数字员工、专家团队、能力市场、MCP 工具暴露的早期体验。

---

### 6.2 更新灰度 / 定向候选版本

- PR：[#2730 feat(updater): support optional targeted update candidates](https://github.com/netease-youdao/LobsterAI/pull/2730)
- 状态：CLOSED

**路线图判断：**  
支持 optional targeted update candidates 后，项目具备更强的灰度发布基础。未来可能用于：

- 登录用户定向推送；
- 企业客户专属版本；
- A/B 测试；
- 热点 bug 小范围验证；
- Canary 发布。

---

### 6.3 内置浏览器真实登录能力增强

- PR：[#2723 feat(browser): add passkey/WebAuthn support for the in-app agent browser](https://github.com/netease-youdao/LobsterAI/pull/2723)
- 状态：CLOSED

**路线图判断：**  
Passkey / WebAuthn 支持表明 LobsterAI 正在强化真实网页环境下的 Agent 执行能力。后续可能继续补齐：

- 多因素认证流程；
- 企业 SSO；
- Cookie/session 安全管理；
- 浏览器自动化权限提示；
- 用户确认式网页登录交互。

---

### 6.4 IM 配置热应用

- PR：[#2721 fix(openclaw): apply IM configuration without restarting the gateway](https://github.com/netease-youdao/LobsterAI/pull/2721)
- 状态：OPEN

**路线图判断：**  
如果该 PR 合入，OpenClaw 网关配置管理将更接近热更新模式。对 IM、插件和长运行任务而言，这是提升可靠性的关键基础设施。

---

## 7. 用户反馈摘要

今日没有 Issue 评论数据，因此无法直接提炼来自 Issue 的真实用户反馈。不过从 PR 摘要中可以反推当前用户或维护者观察到的主要痛点：

### 7.1 OpenClaw 网关重启会打断工作流

相关 PR：

- [#2721](https://github.com/netease-youdao/LobsterAI/pull/2721)
- [#2729](https://github.com/netease-youdao/LobsterAI/pull/2729)

痛点：

- 保存配置不应导致整个 gateway 重启；
- gateway 重启影响无关任务；
- Windows 进程退出确认不稳定会造成修复失败；
- 用户需要更少中断、更可靠的运行时配置应用。

---

### 7.2 插件系统在 ESM、Windows 路径和 SQLite 初始化场景下仍有兼容风险

相关 PR：

- [#2731](https://github.com/netease-youdao/LobsterAI/pull/2731)
- [#2727](https://github.com/netease-youdao/LobsterAI/pull/2727)

痛点：

- 插件注册成功不等于运行时启动成功；
- ESM 环境下 `__dirname` / `__filename` 缺失会导致真实启动阶段崩溃；
- Windows 盘符、空格、中文路径需要被正确处理；
- 插件 entry hooks 在同步和重启后必须保持一致。

---

### 7.3 IM / 微信任务需要更好的失败解释

相关 PR：

- [#2722](https://github.com/netease-youdao/LobsterAI/pull/2722)

痛点：

- 用户不只需要“发送失败”，还需要知道失败原因；
- session 过期、上下文失效、主动消息配额耗尽是不同问题；
- 明确提示可以降低排障成本。

---

### 7.4 真实网页代理需要适配现代登录方式

相关 PR：

- [#2723](https://github.com/netease-youdao/LobsterAI/pull/2723)

痛点：

- 越来越多服务采用 Passkey / WebAuthn；
- 如果内置浏览器无法完成认证，Agent 自动化能力会受限；
- 用户需要在安全认证和 Agent 操作之间取得平衡。

---

## 8. 待处理积压

数据中没有长期未响应的 Issue；过去 24 小时内也没有 Issue 活动。因此当前无法识别“长期未响应的重要 Issue”。

但以下 Open PR 值得维护者优先关注：

### 8.1 高优先级：nsp-clawguard ESM 启动崩溃

- PR：[#2731 fix(plugins): complete nsp-clawguard ESM startup context](https://github.com/netease-youdao/LobsterAI/pull/2731)
- 状态：OPEN
- 建议优先级：高

原因：

- 涉及插件启动崩溃；
- 会导致 gateway ready 后退出并反复重启；
- 影响插件生态稳定性；
- Windows 路径兼容也在修复范围内。

---

### 8.2 高优先级：IM 配置热应用，避免 gateway 重启

- PR：[#2721 fix(openclaw): apply IM configuration without restarting the gateway](https://github.com/netease-youdao/LobsterAI/pull/2721)
- 状态：OPEN
- 建议优先级：高

原因：

- 直接影响 IM 配置变更体验；
- 避免中断无关任务；
- 可减少 watcher 竞态；
- 对长运行 Agent 场景很重要。

---

### 8.3 中高优先级：OpenClaw entry hooks 持久化

- PR：[#2727 fix(user_plugins): persist OpenClaw entry hooks across sync (#2654)](https://github.com/netease-youdao/LobsterAI/pull/2727)
- 状态：OPEN
- 建议优先级：中高

原因：

- 插件 hooks 丢失会导致重启后行为不一致；
- 与 SQLite 持久化和 syncToDisk 路径相关；
- 对插件开发者影响较大。

---

### 8.4 中优先级：能力市场、数字员工、专家团队

- PR：[#2726 feat: add digital employees, expert teams and capability markets](https://github.com/netease-youdao/LobsterAI/pull/2726)
- 状态：OPEN
- 建议优先级：中

原因：

- 功能范围大，涉及 renderer、main、OpenClaw、SQLite、MCP 工具暴露；
- 可能是下一阶段核心产品方向；
- 建议在合入前重点关注权限模型、数据迁移、插件安装安全性和用户体验一致性。

---

## 总体健康度评估

LobsterAI 今日开发活跃度较高，PR 更新密集，维护者对稳定性问题响应迅速。项目当前处于“快速功能扩展 + 基础设施稳定性修复”并行阶段：一方面引入 Passkey/WebAuthn、能力市场、数字员工等新能力；另一方面持续修复 OpenClaw 网关、SQLite、插件同步、Windows 进程管理等底层问题。

短期风险主要集中在 OpenClaw 生态复杂度上，包括网关重启、插件 ESM 兼容、SQLite 持久化、配置热更新和 Windows 安装态行为。若当前几个 Open 修复 PR 能尽快合入，下一版本的稳定性预计会有明显改善。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报  
日期：2026-09-21  
仓库：[`moltis-org/moltis`](https://github.com/moltis-org/moltis)

---

## 1. 今日速览

过去 24 小时内，Moltis 项目整体活跃度偏低，但仍有针对工具调用控制逻辑的维护性修复推进。今日无新 Issue、无 Issue 关闭，也没有新版本发布。PR 方面新增 / 更新 1 条，当前仍处于待合并状态，主要修复 `active_tools` 为空数组时错误覆盖 preset 工具配置的问题。整体来看，项目今日处于小规模维护阶段，重点集中在稳定性与行为一致性修复，而非大功能迭代。

---

## 2. 项目进展

### 待合并 PR

#### [`#1280 fix(tools): preserve preset tools for empty active_tools`](https://github.com/moltis-org/moltis/pull/1280)  
- 状态：Open  
- 作者：`mikemikimike`  
- 创建 / 更新：2026-09-21  
- 关联 Issue：[`#1277`](https://github.com/moltis-org/moltis/issues/1277)  
- 评论数：无数据  
- 👍：0  

该 PR 修复了工具配置中的一个边界行为：当 per-turn 请求中显式传入空的 `active_tools` 数组时，系统不再将其视为“禁用所有工具”，而是视为“没有本轮覆盖”，从而保留 preset 中原有的工具控制配置。

根据 PR 摘要，修复点包括：

- 将空数组 `active_tools: []` 视为无 per-turn override；
- 保留 preset 层级的工具允许 / 禁止策略；
- 非空 per-turn 工具列表仍然需要受到 preset allow / deny 策略约束；
- 保留显式空值的语义，避免误清空 preset 工具设置。

这一改动属于行为一致性修复，对依赖 preset 工具配置的用户较重要。若合并，将减少 AI Agent 在工具启用 / 禁用场景下的意外行为，尤其是多轮对话或动态工具注入场景中。

今日无已合并或已关闭 PR，因此项目主分支尚未因该修复产生正式推进。

---

## 3. 社区热点

今日没有新的 Issue 讨论，也没有高评论或高反应的 PR / Issue。

唯一活跃项为：

- [`#1280 fix(tools): preserve preset tools for empty active_tools`](https://github.com/moltis-org/moltis/pull/1280)

该 PR 当前无明显社区互动数据，说明讨论热度较低。不过它关联的 [`#1277`](https://github.com/moltis-org/moltis/issues/1277) 反映出用户或维护者对工具控制语义存在明确诉求：  
在 AI Agent / 个人助手场景中，preset 通常承担安全边界、工具白名单、默认能力配置等职责。如果一次请求中的 `active_tools` 空数组意外覆盖 preset，可能导致工具不可用或行为与用户预期不一致。

---

## 4. Bug 与稳定性

### 中等严重程度

#### Preset 工具配置可能被空 `active_tools` 意外覆盖  
- 关联 Issue：[`#1277`](https://github.com/moltis-org/moltis/issues/1277)  
- 修复 PR：[`#1280`](https://github.com/moltis-org/moltis/pull/1280)  
- 当前状态：已有修复 PR，尚未合并  

从 PR 描述来看，该问题属于配置解释层面的逻辑缺陷。其潜在影响包括：

- preset 中预设的工具控制策略被意外绕过或清空；
- 用户传入 `active_tools: []` 时，系统行为与“未指定工具覆盖”的预期不一致；
- 在多 preset、多 agent 或多轮任务执行中，可能造成工具调用能力异常变化。

该问题尚未进入 release，也未合并到主线，因此用户仍需等待维护者 review 与合并。

今日未发现新的崩溃、严重回归或安全问题报告。

---

## 5. 功能请求与路线图信号

过去 24 小时没有新增功能请求类 Issue。

不过 [`#1280`](https://github.com/moltis-org/moltis/pull/1280) 释放出一个较明确的路线图信号：Moltis 正在继续细化 Agent 工具控制模型，尤其是 preset 与 per-turn override 之间的优先级和语义边界。

这类改动通常对以下方向有帮助：

- 更可靠的工具权限管理；
- 更清晰的 preset 行为；
- 更安全的多轮 Agent 执行；
- 更适合企业或高级用户的工具白名单 / 黑名单控制。

如果该 PR 被合并，相关修复很可能进入下一个 patch 或 minor 版本，尤其适合打包为稳定性修复发布。

---

## 6. 用户反馈摘要

今日没有新的 Issue 评论数据，因此无法提炼新增的直接用户反馈。

从关联修复 [`#1280`](https://github.com/moltis-org/moltis/pull/1280) 与 Issue [`#1277`](https://github.com/moltis-org/moltis/issues/1277) 可以间接看出一个用户痛点：

- 用户希望 preset 中配置好的工具控制规则具有稳定性；
- 用户不希望一次请求中传入空的 `active_tools` 数组时，意外覆盖默认工具能力；
- 对 Agent 工具选择逻辑的可预测性有较高要求。

这表明 Moltis 用户可能已经在较复杂的工具调用场景中使用 preset，例如按任务、角色或安全策略预设工具集合。

---

## 7. 待处理积压

基于本次提供的数据，今日没有发现长期未响应的重要 Issue 或 PR。

当前最值得维护者关注的是：

#### [`#1280 fix(tools): preserve preset tools for empty active_tools`](https://github.com/moltis-org/moltis/pull/1280)  
- 类型：Bug fix / 行为修复  
- 状态：Open  
- 建议优先级：中高  

建议维护者尽快 review 该 PR，重点确认：

1. `active_tools: []` 是否应在所有上下文中都表示“无本轮覆盖”；
2. 是否需要补充测试覆盖以下场景：
   - 未传 `active_tools`；
   - `active_tools: []`；
   - 非空 `active_tools`；
   - preset allowlist / denylist 同时存在；
3. 是否需要在文档中明确 preset 与 per-turn tool override 的优先级规则。

---

## 项目健康度评估

今日 Moltis 活跃度较低，但维护方向健康。没有新增 Issue 和社区讨论，说明短期内外部反馈较少；同时，有针对具体 bug 的修复 PR 提交，表明核心维护仍在持续。当前项目的主要风险不是失控的缺陷积压，而是修复尚未合并，可能导致相关用户继续遇到 preset 工具配置语义不一致的问题。总体健康度可评为：**稳定维护中，低活跃度，需关注待合并修复 PR**。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-09-21）

> 数据源说明：本日报基于提供的 GitHub 活动数据生成；条目链接显示为 `agentscope-ai/QwenPaw` 仓库路径。

---

## 1. 今日速览

过去 24 小时内，项目共有 **5 条 Issue 更新**、**10 条 PR 更新**，其中 **4 个 Issue 仍处于活跃状态**，**6 个 PR 待合并**，整体开发活跃度较高。  
今日重点集中在 **稳定性修复、工具调用安全、Console 体验、模型供应商管理** 等方向。  
Bug 报告中出现了若干影响较大的问题，包括 **Windows 下子进程 Ctrl 事件可能终止宿主进程**、**消息队列清理导致消息丢失**、**工具 schema 清洗导致参数错误** 等，说明近期核心运行时与工具链仍需重点加固。  
与此同时，多个修复 PR 已快速跟进，如 DoomLoopGate、idle queue cleanup、Console 文件刷新等，显示维护响应较快，项目健康度总体良好，但稳定性风险仍偏中高。

---

## 2. 项目进展

今日无新版本发布，但有多项 PR 进入关闭/完成状态，主要推进了 **CI 流程、Console 体验、插件审批链路、前端测试覆盖率**。

### 已关闭 / 已完成的重要 PR

#### 1. 修复 pet 插件审批 actor 传递问题  
- PR：[#7904 fix(pet): forward approval actor to native service (#7856)](https://github.com/agentscope-ai/QwenPaw/pull/7904)  
- 状态：CLOSED  
- 影响范围：`qwenpaw-pet` 插件、Console 工具审批流程  
- 进展说明：该 PR 针对 pet 插件中的审批 actor 传递问题进行修复，关联 Issue #7856。结合另一个相关 PR [#7898](https://github.com/agentscope-ai/QwenPaw/pull/7898) 的描述，此类问题会导致 Console 中点击 Approve / Deny 时返回 HTTP 500，工具调用无法完成。  
- 项目价值：修复后可提升插件生态与工具审批链路的可靠性，避免用户在启用 bundled plugin 后无法正常使用工具审批。

#### 2. Release 冻结解除机制优化  
- PR：[#7901 ci(release): unfreeze merges as soon as the release finishes instead of waiting for cron](https://github.com/agentscope-ai/QwenPaw/pull/7901)  
- 状态：CLOSED  
- 影响范围：CI / Release 流程  
- 进展说明：新增 `workflow_run` 触发机制，使 release 完成后能够更快解除 merge freeze，而不是等待 5 分钟 cron。  
- 项目价值：降低发布后 PR 被长时间冻结的概率，改善维护者与贡献者的合并体验，提升发布工程效率。

#### 3. 改进 Console 会话项目目录选择器  
- PR：[#7897 fix(console): improve session project directory picker](https://github.com/agentscope-ai/QwenPaw/pull/7897)  
- 状态：CLOSED  
- 影响范围：Console UI / 项目目录选择体验  
- 进展说明：提升 session-level panel 高度，增加目录列表可见行数，将 “Recent Projects” 改名为 “Workspace Projects”，并增加 tooltip 说明数据来源。  
- 项目价值：改善用户在 Console 中选择项目目录时的可用性，属于较直接的体验优化。

#### 4. 前端测试覆盖率提升  
- PR：[#7894 test(console): raise frontend statement coverage by +1027 statements (+543 cases, tests only)](https://github.com/agentscope-ai/QwenPaw/pull/7894)  
- 状态：CLOSED  
- 影响范围：Console 前端测试  
- 进展说明：仅新增前端单元测试，不修改产品代码。Console statement coverage 从 **64.4519%** 提升到 **67.6465%**，增加 **1027 条 statement 覆盖**、**543 个测试用例**。  
- 项目价值：显著提升前端回归防护能力，有助于后续 Console 功能迭代的稳定性。

---

## 3. 社区热点

### 1. Hub token 鉴权不支持 `?token=` 参数，影响文件预览  
- Issue：[#7900 Bug: Hub authentication doesn't support ?token= query parameter, breaking file previews](https://github.com/agentscope-ai/QwenPaw/issues/7900)  
- 状态：CLOSED  
- 评论数：2  
- 反应数：0  
- 诉求分析：用户在 Hub mode 下使用 control plane + Docker runtime provisioner，发现 Hub authentication 不支持 `?token=` query parameter，导致文件预览失效。该问题影响的是 Hub 中较核心的文件访问与预览体验。  
- 热点原因：评论数在今日 Issue 中最高，且已关闭，说明维护者可能已确认并处理，或者已有替代方案。该问题反映出 Hub 权限模型与前端文件预览 URL 生成之间存在兼容性要求。

### 2. Windows 下子进程 Console Ctrl 事件可能终止宿主服务  
- Issue：[#7908 [bug] Windows: child Console Ctrl event from execute_shell_command can terminate the QwenPaw host](https://github.com/agentscope-ai/QwenPaw/issues/7908)  
- 状态：OPEN  
- 评论数：1  
- 反应数：0  
- 诉求分析：用户报告在 Windows 上通过 `execute_shell_command` 启动的子进程可能发出 Console Ctrl event，并传播到 QwenPaw / Uvicorn 宿主进程，导致整个服务退出。  
- 热点原因：虽然评论数不高，但问题严重性高，直接影响宿主服务存活性。该问题反映出 Windows 平台上的进程隔离、信号处理与工具执行安全边界需要加强。

### 3. 模型管理能力统一成为功能演进重点  
- PR：[#7899 feat(providers): unify model discovery, pricing, selection and thinking controls](https://github.com/agentscope-ai/QwenPaw/pull/7899)  
- 状态：OPEN  
- 更新时间：2026-09-21  
- 诉求分析：该 PR 试图统一模型发现、价格、选择、能力解析与 thinking 控制逻辑，使配置 provider、发现模型、选择模型和能力解析都依赖 provider-owned model information。  
- 热点原因：这是今日最重要的功能型 PR 之一，指向项目在多模型、多供应商、多能力管理上的体系化演进。

---

## 4. Bug 与稳定性

以下按潜在严重程度排序。

### P0 / 高危：Windows 工具子进程可终止宿主进程  
- Issue：[#7908](https://github.com/agentscope-ai/QwenPaw/issues/7908)  
- 状态：OPEN  
- 影响版本：v2.2.1  
- 问题描述：Windows 上由 `execute_shell_command` 启动的子进程可触发 Console Ctrl event，并传播到 QwenPaw / Uvicorn 宿主进程，导致整个服务退出。  
- 用户影响：一次工具调用失败可能升级为整个服务崩溃，影响本地开发、长任务执行和 Windows 用户稳定性。  
- 是否已有 fix PR：当前数据中未看到明确关联修复 PR。  
- 建议优先级：最高。建议维护者优先检查 Windows process group、CTRL_C_EVENT / CTRL_BREAK_EVENT 处理、子进程隔离策略。

### P1 / 高：idle queue cleanup 可能丢弃新消息  
- Issue：[#7895 [Bug]: idle cleanup drops messages received while another consumer is stopping](https://github.com/agentscope-ai/QwenPaw/issues/7895)  
- 状态：OPEN  
- 影响版本：当前 `main`，commit `7ff690f4f69961e7cfa842a072d4d440eb46e55e`  
- 问题描述：idle cleanup 在收集候选队列后，会等待 consumer shutdown；如果等待期间另一个队列收到新消息，清理逻辑仍可能基于旧候选列表删除该队列并取消 consumer，从而导致消息丢失。  
- 用户影响：属于消息系统一致性问题，可能造成事件丢失、任务丢失或会话状态异常。  
- 关联修复 PR：[#7896 fix(channels): recheck idle queues after awaiting consumer shutdown](https://github.com/agentscope-ai/QwenPaw/pull/7896)  
- 当前进展：修复 PR 已打开，且由 first-time contributor 提交。  
- 建议优先级：高。建议尽快 review，因为该问题影响消息可靠性。

### P1 / 高：DoomLoopGate 在无新工具调用证据时误升级为 TERMINATE  
- Issue：[#7905 [Bug]: DoomLoopGate escalates to TERMINATE on a text-only round without new tool-call evidence](https://github.com/agentscope-ai/QwenPaw/issues/7905)  
- 状态：OPEN  
- 影响版本：`2.2.2b1`，commit `1d5021a4`；main 中相关文件与该 commit 一致  
- 问题描述：`DoomLoopGate.check` 在 text-only round 中，即使没有新的 tool-call evidence，也可能复用旧窗口状态并推进重复阶段，最终误判为 doom loop 并 TERMINATE。  
- 用户影响：Agent 可能被错误终止，尤其是在工具调用后进入文本解释或恢复阶段时，影响多轮任务成功率。  
- 关联修复 PR：[#7906 fix(loop): prevent stale doom-loop escalation](https://github.com/agentscope-ai/QwenPaw/pull/7906)  
- 当前进展：修复 PR 已打开，方案为仅在记录到新的 tool-call evidence 时推进重复阶段；text-only response 会重置 stale repetition state。  
- 建议优先级：高。该修复边界清晰，建议尽快合并并补充回归测试。

### P1 / 中高：Responses API 工具 schema 清洗移除 nullable，导致可选日期参数无法省略  
- Issue：[#7907 [bug] Responses API 工具 schema 清洗移除 nullable，叠加隐式 strict 导致 recall_history 可选日期参数无法省略](https://github.com/agentscope-ai/QwenPaw/issues/7907)  
- 状态：OPEN  
- 环境：QwenPaw `2.2.1`，AgentScope `2.0.7.post1`，OpenAI SDK `2.33.0`，Python `3.11.2`，使用 `OpenAIResponseModel`，经 codex2api 中转  
- 问题描述：调用 `recall_history` 时，即使用户不需要日期筛选，模型仍填入空字符串日期字段，导致报错：`ValueError: created_on cannot be combined with...`。  
- 用户影响：记忆检索、历史召回等能力受阻；对使用 Responses API 和中转服务的用户影响较明显。  
- 是否已有 fix PR：当前数据中未看到明确关联修复 PR。  
- 建议优先级：中高。建议检查 schema 清洗逻辑中 nullable、required、strict 的兼容策略，并避免将可选参数转换为必须填空字符串。

### P2 / 中：Hub authentication 不支持 `?token=`，影响文件预览  
- Issue：[#7900](https://github.com/agentscope-ai/QwenPaw/issues/7900)  
- 状态：CLOSED  
- 影响版本：Hub `2.2.1`，`2.2.0` 也可复现  
- 问题描述：Hub authentication 不支持 `?token=` query parameter，导致文件预览失效。  
- 用户影响：Hub 文件预览链路不可用，影响 Web 端资产查看和调试体验。  
- 是否已有 fix PR：数据中未看到明确关联 PR，但 Issue 已关闭。  
- 建议优先级：中。建议在关闭原因中明确是否已修复、是否需要升级版本或配置变更。

### P2 / 中：Console 文件标签页缓存刷新问题  
- PR：[#7902 fix(console): refresh cached file tabs on activation](https://github.com/agentscope-ai/QwenPaw/pull/7902)  
- 状态：OPEN  
- 问题描述：修复打开已有 tab 或恢复 workspace 时，文本和 CSV 文件缓存未及时刷新导致内容陈旧的问题。  
- 用户影响：用户可能看到过期文件内容，尤其是在多编辑器、多进程修改文件的场景下。  
- 当前进展：PR 已提出，包含激活 tab 时重新校验、恢复 workspace 时重新校验、保留未保存本地编辑、忽略重叠刷新请求中的过期响应等改动。  
- 建议优先级：中。属于 Console 数据一致性与用户体验问题。

---

## 5. 功能请求与路线图信号

### 1. 社区与 Inbox 集成可能成为下一阶段产品化方向  
- PR：[#7903 feat(community): integrate QwenPaw community and inbox](https://github.com/agentscope-ai/QwenPaw/pull/7903)  
- 状态：OPEN  
- 内容概述：新增内嵌 community feed，支持排序、分类、评论和 Platform editor links；跟踪已安装资源来源；提供带模型辅助编辑的 issue report；通过 Platform HTTP PKCE 授权连接账号，并同步选定消息类别到 native inbox。  
- 路线图信号：项目正在从单纯 Agent Runtime / Console 工具，向 **社区协作、资源分发、用户反馈闭环** 扩展。  
- 纳入下一版本可能性：中高。该 PR 体量较大，若 review 通过，可能成为下一版本的重要产品功能。

### 2. Provider 模型发现、定价、选择与 thinking 控制统一  
- PR：[#7899 feat(providers): unify model discovery, pricing, selection and thinking controls](https://github.com/agentscope-ai/QwenPaw/pull/7899)  
- 状态：OPEN  
- 内容概述：重构模型管理，使 provider 配置、模型发现、模型选择、能力解析、价格和 thinking 控制使用统一的 provider-owned model information。  
- 路线图信号：项目正在补强多模型供应商管理能力，可能为更复杂的模型路由、成本控制、能力选择和 reasoning / thinking 参数控制打基础。  
- 纳入下一版本可能性：高。该 PR 更新至 2026-09-21，且方向与 Agent 产品核心能力高度相关。

### 3. Console 文件刷新一致性改进  
- PR：[#7902](https://github.com/agentscope-ai/QwenPaw/pull/7902)  
- 状态：OPEN  
- 内容概述：激活已有文件 tab 时刷新文本和 CSV 文件，恢复 workspace 时重新校验活跃 tab，并保护未保存编辑。  
- 路线图信号：Console 正在向更稳定的 IDE-like 体验演进。  
- 纳入下一版本可能性：高。该改动边界相对清晰，属于用户可感知的体验修复。

### 4. Channels idle cleanup 可靠性修复  
- PR：[#7896](https://github.com/agentscope-ai/QwenPaw/pull/7896)  
- 状态：OPEN  
- 内容概述：在等待 consumer shutdown 后重新检查 idle queue，避免基于过期候选列表删除已有新消息的队列。  
- 路线图信号：运行时消息可靠性正在被重点修复。  
- 纳入下一版本可能性：高。该 PR 直接修复潜在数据丢失问题，优先级应高于一般功能开发。

---

## 6. 用户反馈摘要

### 用户痛点 1：工具执行失败不应拖垮整个宿主服务  
- 来源：[#7908](https://github.com/agentscope-ai/QwenPaw/issues/7908)  
- 反馈场景：Windows 用户通过 `execute_shell_command` 执行 shell 命令时，子进程事件可能导致 QwenPaw / Uvicorn 宿主进程终止。  
- 用户期望：单个 shell/tool call 失败应被隔离处理，不应影响主服务稳定性。  
- 反映问题：工具执行沙箱、进程组管理、跨平台信号隔离仍需加强。

### 用户痛点 2：Agent 不应因旧的工具调用证据被错误终止  
- 来源：[#7905](https://github.com/agentscope-ai/QwenPaw/issues/7905)、[#7906](https://github.com/agentscope-ai/QwenPaw/pull/7906)  
- 反馈场景：Agent 在工具调用之后进入纯文本轮次，DoomLoopGate 仍可能复用历史窗口并误判为循环。  
- 用户期望：loop gate 应准确区分新的重复工具调用和正常文本响应，避免误杀任务。  
- 反映问题：Agent 控制流的安全机制需要更精细，避免防护逻辑本身造成可用性问题。

### 用户痛点 3：可选工具参数不应被强制填入空字符串  
- 来源：[#7907](https://github.com/agentscope-ai/QwenPaw/issues/7907)  
- 反馈场景：调用 `recall_history` 时，用户不需要日期筛选，但模型仍输出空字符串日期字段，导致参数冲突报错。  
- 用户期望：可选参数应可真正省略；schema 清洗与 strict 模式不应破坏工具调用语义。  
- 反映问题：工具 schema 与 OpenAI Responses API / SDK / 中转层之间的兼容性需要系统性测试。

### 用户痛点 4：Hub 文件预览鉴权需要兼容 token URL 场景  
- 来源：[#7900](https://github.com/agentscope-ai/QwenPaw/issues/7900)  
- 反馈场景：Hub mode 下通过带 `?token=` 的 URL 访问文件预览失败。  
- 用户期望：文件预览链路应兼容常见的 token query parameter 鉴权方式。  
- 反映问题：Hub 权限系统和前端资源访问机制之间需要保持一致。

### 用户痛点 5：Console 中看到的文件内容需要与磁盘状态保持一致  
- 来源：[#7902](https://github.com/agentscope-ai/QwenPaw/pull/7902)  
- 反馈场景：文件已被外部修改，但 Console 中已有 tab 仍显示缓存内容。  
- 用户期望：重新激活 tab 或恢复 workspace 时能看到最新文件，同时未保存编辑不被覆盖。  
- 反映问题：Console 正逐步承担 IDE 类工作台职责，需要更完善的文件状态同步机制。

---

## 7. 待处理积压

基于今日提供的数据，未发现明确的“长期未响应” Issue 或 PR；多数条目均创建或更新于 2026-09-20 至 2026-09-21，属于近期活跃项。不过以下事项建议维护者重点跟进，避免形成新的积压：

### 1. Windows 宿主进程被子进程 Ctrl 事件终止  
- Issue：[#7908](https://github.com/agentscope-ai/QwenPaw/issues/7908)  
- 当前状态：OPEN，暂无明确修复 PR  
- 建议：尽快分配 owner，并确认是否需要 hotfix 或纳入下一个 patch 版本。

### 2. Responses API schema nullable 清洗问题  
- Issue：[#7907](https://github.com/agentscope-ai/QwenPaw/issues/7907)  
- 当前状态：OPEN，暂无明确修复 PR  
- 建议：需要模型工具调用、schema 转换、OpenAI SDK 兼容层共同排查，避免影响更多工具函数。

### 3. idle queue 消息丢失修复等待 review  
- Issue：[#7895](https://github.com/agentscope-ai/QwenPaw/issues/7895)  
- PR：[#7896](https://github.com/agentscope-ai/QwenPaw/pull/7896)  
- 当前状态：Issue OPEN，PR OPEN  
- 建议：该问题涉及消息可靠性，建议优先 review 并补充并发场景测试。

### 4. DoomLoopGate 误终止修复等待合并  
- Issue：[#7905](https://github.com/agentscope-ai/QwenPaw/issues/7905)  
- PR：[#7906](https://github.com/agentscope-ai/QwenPaw/pull/7906)  
- 当前状态：Issue OPEN，PR OPEN  
- 建议：修复方向明确，可优先合并，降低 Agent 被误终止风险。

### 5. pet approval actor 相关重复修复需整理  
- PR：[#7904](https://github.com/agentscope-ai/QwenPaw/pull/7904)  
- PR：[#7898](https://github.com/agentscope-ai/QwenPaw/pull/7898)  
- 当前状态：#7904 CLOSED，#7898 OPEN，且 #7898 标记为 `[Close-and-review-later]`  
- 建议：维护者应明确两者关系：若 #7904 已覆盖修复，应关闭或重定向 #7898；若 #7898 包含额外复现和测试价值，应拆分可合并部分。

---

## 总体健康度评估

今日 CoPaw / QwenPaw 项目表现出较强的维护活跃度：Issue 与 PR 更新频繁，多个 Bug 有对应修复 PR 快速跟进。  
不过，从问题类型看，当前稳定性风险主要集中在 **工具执行隔离、消息队列并发清理、Agent loop gate 判断、工具 schema 兼容性** 四个方向。  
功能演进方面，**社区 / Inbox 集成** 与 **Provider 模型管理统一** 是最明显的路线图信号，显示项目正在同时推进产品化能力和多模型基础设施。  
建议短期优先级排序为：先处理宿主崩溃与消息丢失类问题，再合并 DoomLoopGate 与 Console 一致性修复，最后推进社区与 provider 重构等大功能。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-09-21

## 1. 今日速览

过去 24 小时 ZeroClaw 活跃度较高：新增/活跃 Issues 26 条、PR 7 条，且无 Issue 关闭、无 PR 合并或关闭，说明项目当前处于集中规划、拆分任务与待评审推进阶段。  
今日新增内容明显围绕三条主线展开：ACP/session 生命周期可靠性、插件/WASM/网关拆分路线图、以及 Windows/Matrix/可观测性等具体工程改进。  
PR 侧以低风险测试、文档、CI 修复为主，也有一项 Matrix 语音回复能力和一项 LLM 请求可观测性增强，整体偏向稳定性与可维护性建设。  
需要注意的是，今日所有 Issue 和 PR 均未产生评论或反应，社区讨论热度低，但维护者/贡献者的任务拆解密度很高，路线图信号清晰。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日没有合并或关闭的 PR，因此从“已落地代码”角度看项目主干没有新增变更。不过有 7 个开放 PR 进入待评审状态，主要推进测试覆盖、文档规范、CI 可用性、Matrix 语音能力与运行时可观测性。

### 待合并 PR 进展

- [PR #11022 — test(runtime): update narration fixture for current loop inputs](https://github.com/zeroclaw-labs/zeroclaw/pull/11022)  
  更新双通道 narration 测试 fixture，使其匹配当前 runtime loop 输入类型，包括 dispatch model、context limits 和 loop-state 字段。  
  **影响**：低风险测试修复，有助于恢复或稳定 runtime 相关测试。

- [PR #11018 — test(tools): verify inherited Windows cache environment](https://github.com/zeroclaw-labs/zeroclaw/pull/11018)  
  为 Windows 下 `PSModuleAnalysisCachePath` 环境变量继承增加 ShellTool 与 SkillShellTool 回归测试。  
  **影响**：针对 Windows 执行环境的稳定性回归保护。

- [PR #11011 — test(ci): restore Windows runner inventories and document opt-in use](https://github.com/zeroclaw-labs/zeroclaw/pull/11011)  
  恢复 Windows runner inventories，并补充何时使用 `ci:windows` 标签的维护者说明。  
  **影响**：改善 Windows CI 的可解释性与维护流程。

- [PR #11010 — docs(github): add a plain-language section to the PR template](https://github.com/zeroclaw-labs/zeroclaw/pull/11010)  
  在 PR 模板中增加“简单说明本 PR 做了什么”的栏目。  
  **影响**：降低评审门槛，改善跨子系统协作。

- [PR #11008 — docs(getting-started): guide local model selection with llmfit](https://github.com/zeroclaw-labs/zeroclaw/pull/11008)  
  在多模型设置文档中加入 llmfit 辅助本地模型选择的流程。  
  **影响**：增强本地模型配置体验，有助于用户根据硬件能力选择模型。

- [PR #11007 — feat(matrix): answer a mirror peer's voice message with a voice note](https://github.com/zeroclaw-labs/zeroclaw/pull/11007)  
  为 Matrix mirror 模式补齐语音消息回复语音 note 的能力。  
  **影响**：这是今日功能性最强的 PR，改善 Matrix/WhatsApp 等多模态通道体验。

- [PR #10990 — feat(observability): fingerprint the system and tools prefix on llm_request events](https://github.com/zeroclaw-labs/zeroclaw/pull/10990)  
  在 `llm_request` trace event 中加入 system prompt 与 tools prefix 的长度和 SHA256 指纹。  
  **影响**：提升 LLM 请求可观测性，便于排查 prompt/tool spec 变化导致的行为差异。

---

## 4. 社区热点

今日所有 Issue/PR 的评论数与反应数均为 0，因此没有传统意义上的“高讨论度”热点。以下热点按新增任务密度、路线图重要性和近期更新时间归纳。

### ACP 生命周期与一致性问题集中出现

- [Issue #11021 — Guarantee exactly-once session_end delivery after ACP hard cancellation](https://github.com/zeroclaw-labs/zeroclaw/issues/11021)  
  诉求：ACP provider 被强制取消后，仍需保证 `session_end` hook 精确投递一次。  
  背后反映出：项目正在强化 agent/session 生命周期的可靠性，尤其关注硬取消、清理、hook delivery 等边界条件。

- [Issue #11020 — Surface ACP TodoWrite plan persistence failures](https://github.com/zeroclaw-labs/zeroclaw/issues/11020)  
  诉求：ACP TodoWrite plan 持久化失败不应被静默吞掉，需要显式可观测契约。  
  背后反映出：用户或维护者希望失败路径能够被监控、定位，而不是表现为空计划或日志级成功。

- [Issue #11019 — Make ACP administrative removal transactional with active-turn cancellation](https://github.com/zeroclaw-labs/zeroclaw/issues/11019)  
  诉求：session kill/delete 与 active-turn cancellation 需要事务化，避免 durable storage 失败造成部分成功状态。  
  背后反映出：管理操作正在从“尽力而为”转向强一致语义。

### 插件、WASM、网关拆分路线图被系统化拆解

- [Issue #11000 — Define and review the complete core-to-gateway IPC contract](https://github.com/zeroclaw-labs/zeroclaw/issues/11000)  
  诉求：先定义并评审 core-to-gateway IPC 契约，再推进网关进程拆分。  
  这是后续 [#11001](https://github.com/zeroclaw-labs/zeroclaw/issues/11001)、[#11002](https://github.com/zeroclaw-labs/zeroclaw/issues/11002)、[#11003](https://github.com/zeroclaw-labs/zeroclaw/issues/11003)、[#11004](https://github.com/zeroclaw-labs/zeroclaw/issues/11004) 的基础。

- [Issue #10994 — Ship and verify a supported WASM plugin runtime artifact](https://github.com/zeroclaw-labs/zeroclaw/issues/10994)  
  诉求：发布可直接安装与执行 WIT 插件的官方支持 runtime artifact。  
  背后反映出：ZeroClaw 插件体系正在从源码构建能力转向可分发、可验证的用户体验。

- [Issue #10995 — Add verified plugin update with failure rollback](https://github.com/zeroclaw-labs/zeroclaw/issues/10995)  
  诉求：增加明确的 plugin update 命令，并支持失败回滚。  
  背后反映出：插件生命周期管理正在补齐“安装之后”的安全更新路径。

---

## 5. Bug 与稳定性

以下按潜在严重程度与影响面排序。

### 高优先级 / 高风险一致性问题

1. [Issue #11021 — ACP hard cancellation 后保证 session_end exactly-once 投递](https://github.com/zeroclaw-labs/zeroclaw/issues/11021)  
   - 类型：可靠性 / 生命周期一致性  
   - 影响：非协作 ACP provider 被硬取消后，可能导致 `session_end` hook 丢失或重复投递。  
   - 当前状态：Open  
   - Fix PR：未见对应修复 PR。

2. [Issue #11019 — ACP session kill/delete 与 active-turn cancellation 事务化](https://github.com/zeroclaw-labs/zeroclaw/issues/11019)  
   - 类型：一致性 / 管理操作原子性  
   - 影响：如果 durable storage 后续失败，可能留下部分完成的管理操作结果。  
   - 当前状态：Open  
   - Fix PR：未见对应修复 PR。

3. [Issue #11020 — ACP TodoWrite plan persistence failures 应显式暴露](https://github.com/zeroclaw-labs/zeroclaw/issues/11020)  
   - 类型：可观测性 / 数据持久化失败处理  
   - 影响：读取失败被视为空 plan、写入失败仅日志记录，可能误导用户和自动化系统。  
   - 当前状态：Open  
   - Fix PR：未见对应修复 PR。

### 中高优先级配置与授权问题

4. [Issue #11009 — Agent alias rename does not cascade permission-profile selectors](https://github.com/zeroclaw-labs/zeroclaw/issues/11009)  
   - 类型：配置生命周期 / RPC 授权  
   - 影响：agent alias 重命名后，`permission_profiles.<profile>.allowed_agents` 未级联更新，可能导致授权配置失效或出现意外拒绝。  
   - 当前状态：Open  
   - Fix PR：未见对应修复 PR。

5. [Issue #11006 — Restack #10259 onto current master](https://github.com/zeroclaw-labs/zeroclaw/issues/11006)  
   - 类型：集成阻塞 / 合并冲突  
   - 影响：#10259 分支与 master 存在 12 个 conflict hunks，CI 未在当前 base 上运行，阻碍 RPC inbound enforcement 阶段推进。  
   - 当前状态：Open  
   - Fix PR：关联 PR [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259)，但当前日报数据未显示修复完成。

### Windows 稳定性与用户体验

6. [Issue #10991 — Windows scheduled task opens a console window at logon](https://github.com/zeroclaw-labs/zeroclaw/issues/10991)  
   - 类型：Windows daemon/service 用户体验  
   - 严重度：S2 degraded behavior  
   - 影响：登录时计划任务会打开空控制台窗口，影响桌面体验。  
   - 当前状态：Open  
   - Fix PR：未见对应修复 PR。

7. [PR #11018 — Windows cache environment 回归测试](https://github.com/zeroclaw-labs/zeroclaw/pull/11018)  
   - 类型：测试补强  
   - 影响：验证 Windows `PSModuleAnalysisCachePath` 环境变量可被 ShellTool / SkillShellTool 正确继承。  
   - 当前状态：Open  
   - 说明：这是稳定性防回归 PR，不是直接修复上述 console window 问题。

8. [PR #11011 — 恢复 Windows runner inventories](https://github.com/zeroclaw-labs/zeroclaw/pull/11011)  
   - 类型：CI 稳定性  
   - 影响：改善 Windows CI opt-in 流程与 runner inventory 可用性。  
   - 当前状态：Open

---

## 6. 功能请求与路线图信号

今日新增功能请求集中在插件系统、网关拆分、runtime composition、桌面 computer-use 和多模态通道能力。

### 插件与 WASM runtime：从实验能力走向可分发产品能力

- [Issue #10994 — 支持发布 WASM plugin runtime artifact](https://github.com/zeroclaw-labs/zeroclaw/issues/10994)  
  路线图信号：ZeroClaw 需要让用户无需重编译即可安装和执行兼容 WIT 插件。  
  纳入下一版本可能性：较高。该 issue 标记为 accepted、risk:high、type:ci，属于发布工程关键路径。

- [Issue #10995 — verified plugin update with failure rollback](https://github.com/zeroclaw-labs/zeroclaw/issues/10995)  
  路线图信号：插件生命周期将补齐 update/rollback 语义。  
  纳入下一版本可能性：中高。它是插件系统可安全运营的必要能力。

- [Issue #10996 — 插件安装时初始化 channel instance config 与 grants](https://github.com/zeroclaw-labs/zeroclaw/issues/10996)  
  路线图信号：安装插件不仅是下载二进制，还要完成通道配置、权限授予与实例激活。  
  纳入下一版本可能性：中高，尤其依赖 channel/plugin grant 流程完善。

- [Issue #10997 — onboarding 时安装并激活选定插件](https://github.com/zeroclaw-labs/zeroclaw/issues/10997)  
  路线图信号：插件能力将进入 Quickstart/onboarding 用户路径。  
  纳入下一版本可能性：中等，依赖 #10994/#10995/#10996 等基础设施。

- [Issue #10999 — 发布并验证 Discord plugin release binary 安装](https://github.com/zeroclaw-labs/zeroclaw/issues/10999)  
  路线图信号：官方插件生态需要以 release binary 验证，而不是仅有源码。  
  纳入下一版本可能性：中等，依赖 WASM host、registry 与 release artifact 完整性。

### Gateway 与 core 分离：走向多进程架构

- [Issue #11000 — 定义 core-to-gateway IPC contract](https://github.com/zeroclaw-labs/zeroclaw/issues/11000)  
  这是整个 gateway 外置化工作的契约基础。

- [Issue #11001 — Complete local IPC coverage for an external gateway](https://github.com/zeroclaw-labs/zeroclaw/issues/11001)  
  目标是补齐外部 gateway 所需的本地 IPC 方法、streaming、生命周期与授权覆盖。

- [Issue #11002 — Ship zeroclaw-gw as a standalone IPC client](https://github.com/zeroclaw-labs/zeroclaw/issues/11002)  
  目标是将 web dashboard 和 HTTP gateway 作为可选独立进程交付。

- [Issue #11003 — Carry plugin webhook registration and dispatch across IPC](https://github.com/zeroclaw-labs/zeroclaw/issues/11003)  
  目标是将插件 webhook 注册与分发跨进程化。

- [Issue #11004 — Package and supervise separate core and gateway processes in Tauri](https://github.com/zeroclaw-labs/zeroclaw/issues/11004)  
  目标是在 Tauri 桌面安装中自动启动与管理 core 和 gateway 双进程。  
  综合判断：这组 issue 是明确的 Phase 3 架构路线图，短期可能先合并契约与 IPC 覆盖，完整桌面进程监管可能需要更长周期。

### Runtime composition 与工具瘦身

- [Issue #10993 — Complete the public runtime composition boundary](https://github.com/zeroclaw-labs/zeroclaw/issues/10993)  
  目标是让 agent runtime 可嵌入，并通过显式能力注入替代直接构造具体工具。  
  路线图信号：ZeroClaw 正在从单体 runtime 向可组合 runtime 演进。

- [Issue #10998 — Deliver minimal core tool set and binary-size evidence](https://github.com/zeroclaw-labs/zeroclaw/issues/10998)  
  目标是拆分默认 runtime 的可选工具构造，并提供二进制体积证据。  
  路线图信号：核心包体积、默认工具边界和插件化能力正在被重新定义。

### 桌面 computer-use 与文件/适配器体系

- [Issue #11015 — Desktop computer-use protocol and spike implementation](https://github.com/zeroclaw-labs/zeroclaw/issues/11015)  
  路线图信号：ZeroClaw 有意支持本地桌面应用的屏幕观察、accessibility-first 控制与协议化实现。

- [Issue #11013 — Unified file intake, resolver, and delivery implementation](https://github.com/zeroclaw-labs/zeroclaw/issues/11013)  
  路线图信号：文件接入、解析、投影、保留和交付将统一建模。

- [Issue #11012 — Runtime ingress and adapter migration implementation](https://github.com/zeroclaw-labs/zeroclaw/issues/11012)  
  路线图信号：runtime ingress 与 adapter migration 将进入实现跟踪阶段。

### 用户体验与多模态

- [PR #11007 — Matrix mirror 语音消息以 voice note 回复](https://github.com/zeroclaw-labs/zeroclaw/pull/11007)  
  这是今日最接近用户可感知功能改进的 PR。若合并，Matrix mirror peer 的语音交互将更自然，尤其适合语音优先的聊天场景。

- [PR #11008 — 使用 llmfit 指导本地模型选择](https://github.com/zeroclaw-labs/zeroclaw/pull/11008)  
  改善本地模型配置文档，帮助用户基于硬件能力选择模型。属于 onboarding 和 self-host 体验优化。

---

## 7. 用户反馈摘要

今日数据中没有 Issue/PR 评论，因此无法提炼来自评论区的直接用户反馈。基于新增 Issue/PR 内容，可以归纳出以下隐含痛点和使用场景：

- **可靠性痛点**：ACP session 生命周期、hard cancellation、plan persistence failure 等问题显示，用户或维护者对 agent 执行过程中的取消、清理、持久化失败处理有更高一致性要求。相关链接：[Issue #11021](https://github.com/zeroclaw-labs/zeroclaw/issues/11021)、[#11020](https://github.com/zeroclaw-labs/zeroclaw/issues/11020)、[#11019](https://github.com/zeroclaw-labs/zeroclaw/issues/11019)。

- **插件可用性痛点**：多个 issue 指向插件安装、更新、rollback、artifact 发布和 Discord 插件验证，说明当前插件体系仍存在从“开发者可用”到“普通用户可安装可维护”的差距。相关链接：[Issue #10994](https://github.com/zeroclaw-labs/zeroclaw/issues/10994)、[#10995](https://github.com/zeroclaw-labs/zeroclaw/issues/10995)、[#10999](https://github.com/zeroclaw-labs/zeroclaw/issues/10999)。

- **本地部署体验痛点**：llmfit 文档 PR 和最小 core tool set issue 表明，用户关心本地模型选择、硬件适配、二进制体积和默认能力边界。相关链接：[PR #11008](https://github.com/zeroclaw-labs/zeroclaw/pull/11008)、[Issue #10998](https://github.com/zeroclaw-labs/zeroclaw/issues/10998)。

- **桌面用户体验痛点**：Windows 登录时弹出控制台窗口会破坏桌面应用体验；Tauri 双进程监管需求说明桌面产品化仍在补齐。相关链接：[Issue #10991](https://github.com/zeroclaw-labs/zeroclaw/issues/10991)、[#11004](https://github.com/zeroclaw-labs/zeroclaw/issues/11004)。

- **贡献者协作痛点**：PR 模板增加 plain-language section、文档去重 tracker、expedited merge RFC，都反映出项目正在降低评审和贡献流程的认知负担。相关链接：[PR #11010](https://github.com/zeroclaw-labs/zeroclaw/pull/11010)、[Issue #10992](https://github.com/zeroclaw-labs/zeroclaw/issues/10992)、[#11017](https://github.com/zeroclaw-labs/zeroclaw/issues/11017)。

---

## 8. 待处理积压

本日报仅基于过去 24 小时数据，无法完整识别“长期未响应”的历史积压。不过从当前开放项看，以下内容值得维护者优先关注。

### 需要尽快评审的开放 PR

- [PR #11022 — runtime narration fixture 测试修复](https://github.com/zeroclaw-labs/zeroclaw/pull/11022)  
  低风险、XS 规模，适合快速评审合并，以恢复测试与类型同步。

- [PR #11018 — Windows ShellTool 环境变量继承测试](https://github.com/zeroclaw-labs/zeroclaw/pull/11018)  
  低风险、小规模，建议与 Windows CI 修复一起评审。

- [PR #11011 — Windows runner inventories 与 opt-in 文档](https://github.com/zeroclaw-labs/zeroclaw/pull/11011)  
  对 Windows 测试基础设施有直接帮助，建议优先处理。

- [PR #11007 — Matrix mirror voice note 回复](https://github.com/zeroclaw-labs/zeroclaw/pull/11007)  
  中等风险、较大规模，是用户可见功能，建议安排熟悉 Matrix/channel/gateway 的维护者评审。

- [PR #10990 — llm_request system/tools fingerprint 可观测性](https://github.com/zeroclaw-labs/zeroclaw/pull/10990)  
  对调试 LLM 行为差异有帮助，但涉及 trace event 字段，建议确认隐私与兼容性后推进。

### 需要优先 triage 的开放 Issue

- [Issue #11021](https://github.com/zeroclaw-labs/zeroclaw/issues/11021)、[#11020](https://github.com/zeroclaw-labs/zeroclaw/issues/11020)、[#11019](https://github.com/zeroclaw-labs/zeroclaw/issues/11019)  
  ACP 可靠性三连 issue，均与取消、清理、持久化和 hook delivery 相关，建议统一 triage，避免分别修复造成语义不一致。

- [Issue #11006 — Restack #10259 onto current master](https://github.com/zeroclaw-labs/zeroclaw/issues/11006)  
  合并冲突已经明确到 12 个 hunks，且影响 RPC inbound enforcement 进展，建议尽快分配处理人。

- [Issue #11000 — core-to-gateway IPC contract](https://github.com/zeroclaw-labs/zeroclaw/issues/11000)  
  是后续 gateway 外置化工作的前置契约，建议优先评审和冻结版本化边界。

- [Issue #10991 — Windows scheduled task opens console window](https://github.com/zeroclaw-labs/zeroclaw/issues/10991)  
  虽为 S2 degraded behavior，但直接影响桌面用户观感，建议纳入近期 Windows UX 修复批次。

---

## 健康度评估

- **活跃度**：高。24 小时内 26 个 Issue、7 个 PR，路线图拆解密集。  
- **交付速度**：中低。今日无 PR 合并、无 Issue 关闭，产出主要停留在规划与待评审阶段。  
- **稳定性关注度**：高。ACP 一致性、Windows 环境、CI runner、LLM trace 可观测性均有新增工作。  
- **社区互动**：低。所有条目评论与反应均为 0，需要观察后续是否有维护者评审与用户反馈跟进。  
- **路线图清晰度**：高。插件/WASM、gateway IPC、runtime composition、desktop computer-use 等方向均已拆成可执行 tracker 或任务。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*