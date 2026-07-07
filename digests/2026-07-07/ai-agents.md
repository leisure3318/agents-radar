# OpenClaw 生态日报 2026-07-07

> Issues: 8 | PRs: 39 | 覆盖项目: 13 个 | 生成时间: 2026-07-07 01:20 UTC

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

# OpenClaw 项目动态日报｜2026-07-07

## 1) 今日速览
OpenClaw 今天仍处于**高活跃、强修复导向**的状态：过去 24 小时有 **8 条 Issue 更新**、**39 条 PR 更新**，但**没有新版本发布**。从内容看，团队主要在推进 **会话/状态一致性、消息交付可靠性、跨渠道兼容性** 和 **客户端体验优化**。  
当天 **5 个 Issue 已关闭**，说明部分用户问题已被快速收敛；同时 **29 个 PR 仍待合并**，表明主线仍在密集集成期。整体健康度偏正面，但“修复多、发布少”，意味着当前更像是**稳定性打磨窗口**，而非功能大版本冲刺期。

---

## 2) 版本发布
**今日无新版本发布。**

---

## 3) 项目进展
今日可见的已关闭/落地 PR，主要把项目往以下几个方向推进：

- **macOS 原生聊天窗口重设计落地**  
  PR：[#101103](https://github.com/openclaw/openclaw/pull/101103)  
  关闭 Issue：[#101086](https://github.com/openclaw/openclaw/issues/101086)  
  这次更新把 macOS 聊天窗口从“单列固定壳”推进到更接近控制台/工作台的原生交互形态，包含 sessions sidebar、toolbar pickers、slash commands 和 context usage 等能力。  
  **意义**：这是明显的高价值 UX 升级，说明桌面端体验正在补齐 Web 端能力差距。

- **会话存储访问边界继续收敛**  
  PR：[#101180](https://github.com/openclaw/openclaw/pull/101180)  
  PR：[#101179](https://github.com/openclaw/openclaw/pull/101179)  
  这类 refactor 将会话元信息、目标、delivery reads 等逻辑从直接读写 store 迁回 accessor 层，强化了“存储中立”边界。  
  **意义**：这是平台级稳定性改造，直接服务于 session-state 一致性，减少未来功能绕开统一入口造成的回归。

- **Android 截图模式尺寸调优**  
  PR：[#100895](https://github.com/openclaw/openclaw/pull/100895)  
  关闭了 Android 视觉尺寸不一致问题，属于移动端可视化质量修复。  
  **意义**：说明移动端仍在持续补体验细节，尤其是截图/证明类场景。

**阶段性判断**：  
从当天可见的落地内容看，OpenClaw 的推进并不是单点功能堆叠，而是在同时做三件事：  
1. **体验升级**（macOS、Android）  
2. **架构收敛**（session accessor）  
3. **稳定性补洞**（消息/会话/交付链路）  
这类组合通常意味着项目正在为后续更稳定的版本节奏做底座。

---

## 4) 社区热点
### 评论最活跃的议题
- **[#101086](https://github.com/openclaw/openclaw/issues/101086)**  
  2 条评论，且已关闭。  
  主题是 **macOS 原生聊天窗口重设计**，属于典型的“高频使用场景 + 交互效率”诉求。  
  **背后诉求**：用户不满足于“能用”，而是希望本地客户端具备更高的信息密度、会话管理能力和输入效率。

- **[#101247](https://github.com/openclaw/openclaw/issues/101247)**  
  1 条评论，开放中。  
  主题是 **Docker sandbox exec 取消后，容器内命令仍继续运行**。  
  **背后诉求**：用户在意的是“停止”必须真正停止，不能只停本地 client，而把资源/副作用留在容器里。

- **[#101239](https://github.com/openclaw/openclaw/issues/101239)**  
  1 条评论，开放中。  
  主题是 Android 外接物理键盘时，Enter 应发送消息而不是换行。  
  **背后诉求**：移动端聊天产品的基本输入范式要跟主流聊天应用一致，尤其是平板/键盘用户。

### 反应较集中的条目
当天多条 Issue 获得 1 个 👍，反应集中在：
- [#101086](https://github.com/openclaw/openclaw/issues/101086)
- [#101111](https://github.com/openclaw/openclaw/issues/101111)
- [#101215](https://github.com/openclaw/openclaw/issues/101215)
- [#101231](https://github.com/openclaw/openclaw/issues/101231)
- [#101237](https://github.com/openclaw/openclaw/issues/101237)
- [#101239](https://github.com/openclaw/openclaw/issues/101239)

**解读**：社区关注点并不分散，主要集中在：
- **会话与状态管理**
- **多渠道一致性**
- **移动端操作效率**
- **消息/工具输出可读性**

---

## 5) Bug 与稳定性
按严重程度排序如下：

### P1：Docker exec 取消不生效，容器内命令继续跑
- Issue：[#101247](https://github.com/openclaw/openclaw/issues/101247)  
- 状态：**开放中**
- 影响：取消/超时只杀本地 `docker exec`，容器内进程继续执行，可能导致资源泄漏、状态污染甚至误操作。  
- **是否已有 fix PR**：**未见明确对应修复 PR**

### P1：WhatsApp 渠道所有 tool outputs 变成“不可见截图”
- Issue：[#101237](https://github.com/openclaw/openclaw/issues/101237)  
- 状态：**已关闭**
- 影响：工具输出不可读，属于明显的消息展示/可用性回归，且可能被用户感知为“消息丢失”。  
- **是否已有 fix PR**：**Issue 已关闭，说明已有处理；但摘录中未给出关联 PR 编号**

### P1：`chat.abort` 无法可靠停止正在运行的嵌入式子进程
- 相关 PR：[#101226](https://github.com/openclaw/openclaw/pull/101226)、[#101222](https://github.com/openclaw/openclaw/pull/101222)  
- 影响：外部客户端把停止按钮映射到 `chat.abort` 时，可能只中断表层 RPC，底层 tool subprocess 仍在跑。  
- **是否已有 fix PR**：**有，且修复 PR 已在推进中**

### P1：Signal 场景下 session initialization conflict 导致消息丢失/退化
- 相关 PR：[#101240](https://github.com/openclaw/openclaw/pull/101240)、[#101004](https://github.com/openclaw/openclaw/pull/101004)、[#101252](https://github.com/openclaw/openclaw/pull/101252)  
- 影响：在短时间连续消息、debounce flush、回复会话初始化冲突时，Signal 可能出现消息丢弃。  
- **是否已有 fix PR**：**有，且已有多条针对性修复 PR**

### P2：`/new` 与后台持久化并发时会话初始化冲突
- Issue：[#101250](https://github.com/openclaw/openclaw/issues/101250)  
- 状态：**开放中**
- 影响：重置会话和后台更新并发时，容易触发冲突，属于会话一致性问题。  
- **是否已有 fix PR**：**未见明确对应修复 PR**

### P2：iOS / Android 组管理能力缺失
- Issue：[#101231](https://github.com/openclaw/openclaw/issues/101231)  
- 状态：**已关闭**
- 影响：移动端 session group 只能创建，不能灵活重命名、删除或空组创建。  
- **是否已有 fix PR**：**Issue 已关闭，说明已有修复路径或合并处理**

**稳定性结论**：  
今天的稳定性主题非常明确——**会话冲突、停止不彻底、输出不可读**。这三类问题都直接打击“AI 助手是否可信”的核心体验，因此优先级很高。

---

## 6) 功能请求与路线图信号
今天出现的需求，明显透露出下一阶段路线图的几个方向：

### 1. 多端输入与会话操作体验继续补齐
- [#101239](https://github.com/openclaw/openclaw/issues/101239) Android 外接键盘 Enter 发送消息  
- [#101231](https://github.com/openclaw/openclaw/issues/101231) 移动端 session group 管理  
- [#101086](https://github.com/openclaw/openclaw/issues/101086) macOS 原生聊天窗重设计

**判断**：这类需求都属于“高频主流程”改进，且多数已经有相应 PR / 关闭动作，**很可能继续进入下一版本的收尾范围**。

### 2. 会话、子代理、路由和上下文协议正在标准化
- PR：[#101248](https://github.com/openclaw/openclaw/pull/101248) subagent completion routing  
- PR：[#101182](https://github.com/openclaw/openclaw/pull/101182) typed session targets  
- PR：[#101228](https://github.com/openclaw/openclaw/pull/101228) self-update root 修正  
- PR：[#100858](https://github.com/openclaw/openclaw/pull/100858) universal pagination contract

**判断**：这些不是单一功能，而是在打通“跨渠道、跨代理、跨存储模式”的统一抽象，**很像下一个版本的底层主线**。

### 3. 渠道兼容性继续扩张
- PR：[#101249](https://github.com/openclaw/openclaw/pull/101249) Feishu 分页  
- PR：[#101230](https://github.com/openclaw/openclaw/pull/101230) Telegram CJK 强调  
- PR：[#101035](https://github.com/openclaw/openclaw/pull/101035) Google Vertex AI 支持

**判断**：渠道适配还在持续扩展，且重点已从“接入”转向“协议细节一致性”和“内容渲染正确性”。

---

## 7) 用户反馈摘要
从 Issue 内容里，可以提炼出几类真实痛点：

- **“停止”必须真的停止**  
  代表 Issue：[#101247](https://github.com/openclaw/openclaw/issues/101247)、[#101226](https://github.com/openclaw/openclaw/pull/101226)  
  用户希望取消操作能够终止容器/子进程，而不是只停前端请求。

- **会话状态不能互相打架**  
  代表 Issue：[#101250](https://github.com/openclaw/openclaw/issues/101250)  
  用户在“重置会话 / 更新元数据 / 持久化 flush”并发时遭遇冲突，说明后台状态同步仍需更强的一致性保障。

- **移动端和桌面端需要符合直觉的输入行为**  
  代表 Issue：[#101239](https://github.com/openclaw/openclaw/issues/101239)、[#101231](https://github.com/openclaw/openclaw/issues/101086)  
  用户不是只要“可用”，而是要像成熟聊天产品一样：  
  - Enter 发送  
  - 组可管理  
  - 关键入口可达  
  - 桌面端信息布局更高效

- **工具输出必须可读、可追踪**  
  代表 Issue：[#101237](https://github.com/openclaw/openclaw/issues/101237)  
  用户容忍度低的是“看不见输出”这种直接影响任务完成的回归。

---

## 8) 待处理积压
以下条目值得维护者优先盯住，避免卡在 proof / author / review 上：

### 高优先级开放 Issue
- [#101247](https://github.com/openclaw/openclaw/issues/101247) Docker sandbox 取消不彻底，容器内命令继续执行  
- [#101250](https://github.com/openclaw/openclaw/issues/101250) `/new` 与后台 session 更新并发冲突

### 卡在 proof / review / author 的 PR
- [#100769](https://github.com/openclaw/openclaw/pull/100769) Dependabot，**waiting on author**
- [#101228](https://github.com/openclaw/openclaw/pull/101228) **needs maintainer look**
- [#101220](https://github.com/openclaw/openclaw/pull/101220) **needs proof**
- [#101004](https://github.com/openclaw/openclaw/pull/101004) **needs proof**
- [#101229](https://github.com/openclaw/openclaw/pull/101229) **waiting on author**
- [#101241](https://github.com/openclaw/openclaw/pull/101241) **needs proof**

**积压判断**：  
当前积压不是“没人做”，而是很多 PR 卡在**证明可行性、维护者确认、作者补充上下文**这几个典型门槛上。对 OpenClaw 这种强工程化项目来说，这类卡点会直接拖慢合并节奏，建议优先清理。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **更适合发群里的简版**，或  
2. **带风险分级和趋势图的管理层版**。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告（2026-07-07）

## 1) 生态全景
过去 24 小时，这个生态整体呈现出一个很清晰的信号：**开源 AI 智能体项目已从“能跑”进入“能稳、能控、能解释”阶段**。  
主流项目普遍不再追求单点功能爆发，而是在补齐 **会话状态一致性、停止/中断可靠性、跨渠道兼容、默认安全、可观测性**。  
同时，社区活跃度呈现明显分层：一部分项目处于**高强度修复和重构**，一部分进入**质量收敛与版本准备**，也有少量项目基本静默。  
从技术路线看，生态正在从“工具型 agent”走向“平台型 agent”，即更重视 **配置治理、运行时边界、UI/桌面体验、provider 兼容和成本控制**。

---

## 2) 各项目活跃度对比

> 口径：以下为过去 24 小时 GitHub 更新量；“健康度”基于活跃度、问题收敛速度、发布节奏与风险暴露综合判断。

| 项目 | Issues 更新 | PR 更新 | Release | 健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 8 | 39 | 无 | **高活跃、修复导向强**，处于稳定性打磨窗口 |
| NanoBot | 37 | 14 | 无 | **高压排错**，安全/稳定性问题集中暴露，需加速收敛 |
| Hermes Agent | 50 | 50 | 无 | **最高强度迭代**，覆盖面广，但治理压力也最大 |
| PicoClaw | 3 | 2 | 无 | **中等活跃**，聚焦 provider 兼容与缓存优化 |
| NanoClaw | 3 | 8 | 无 | **中高活跃**，偏 agent-runner 稳定性与文档治理 |
| NullClaw | 0 | 0 | 无 | **静默** |
| IronClaw | 33 | 46 | 无 | **高活跃**，基础设施/框架层推进强，但稳定性问题多 |
| LobsterAI | 0 | 10 | 无 | **低讨论、高交付**，进入收敛与版本准备期 |
| TinyClaw | 0 | 0 | 无 | **静默** |
| Moltis | 0 | 0 | 无 | **静默** |
| CoPaw | 3 | 22 | **有**（v1.1.12.post3） | **发布后快速修复**，健康但强度高 |
| ZeptoClaw | 0 | 0 | 无 | **静默** |
| ZeroClaw | 9 | 22 | 无 | **高活跃**，CI/配置/运行时一起补强 |

### 活跃度分层
- **第一梯队：** Hermes Agent、IronClaw、OpenClaw、ZeroClaw  
- **第二梯队：** NanoBot、CoPaw、LobsterAI、NanoClaw、PicoClaw  
- **静默/低活跃：** NullClaw、TinyClaw、Moltis、ZeptoClaw

---

## 3) OpenClaw 在生态中的定位

### 核心定位
OpenClaw 是这批项目里非常典型的 **“主流程体验 + 多渠道一致性 + 会话状态治理”** 型项目。  
它不是今天活跃度最高的那个，但它的修复分布最集中地指向：  
- 会话/状态一致性  
- 消息交付可靠性  
- 多端输入体验  
- 桌面端与移动端 UX 补齐  
- 存储边界与 accessor 抽象收敛

### 相比同类的优势
1. **产品主流程聚焦更强**  
   今天的热点几乎都围绕“会话、停止、交付、输入、渲染”。这说明 OpenClaw 关注的是 agent 最核心的用户路径，而不是边缘能力堆叠。

2. **工程边界收敛更明确**  
   例如 session accessor、storage-neutral 边界、subagent routing、typed session targets 这类改动，说明它在做平台级抽象，而不是临时补丁式修修补补。

3. **跨端体验推进明显**  
   macOS 原生聊天窗重设计、Android 键盘输入、WhatsApp/Signal/Telegram/Feishu/Vertex AI 等多渠道适配，显示它的目标不是单一 UI，而是统一的多端 agent 体验。

### 与同类项目的技术路线差异
- **相较 NanoBot：**  
  NanoBot 更偏 **默认安全、资源限制、权限边界**；OpenClaw 更偏 **会话和消息主链路正确性**。

- **相较 Hermes Agent：**  
  Hermes 关注面更广，桌面、Cron、memory、browser、provider 都在推进；OpenClaw 更聚焦于 **会话状态和用户交互闭环**。

- **相较 IronClaw：**  
  IronClaw 更像 **基础设施和框架层大规模重构**；OpenClaw 更像 **面向终端体验的稳定性强化**。

- **相较 PicoClaw / CoPaw：**  
  PicoClaw 更偏 provider 兼容与缓存成本；CoPaw 刚经历版本修复；OpenClaw 的主线更偏 **多渠道助手的产品化体验**。

### 社区规模对比
仅从今日互动量看，OpenClaw 属于**第一梯队**：  
- PR 更新量 **39**，高于多数项目，仅次于 Hermes、IronClaw 这类更大体量项目的顶格活跃。  
- Issue 更新量 **8**，说明社区不是单纯提需求，而是有大量修复和收敛动作在同步推进。  
- 与 Hermes/IronClaw 相比，OpenClaw 的社区“面”没那么宽，但**问题密度更集中、反馈更贴近主流程**。这通常意味着项目更接近“可用产品化”阶段。

---

## 4) 共同关注的技术方向

### 1. 会话状态一致性与恢复
- **涉及项目：** OpenClaw、PicoClaw、NanoBot、Hermes Agent、LobsterAI、ZeroClaw  
- **诉求：** 重新加载历史、后台持久化、session 初始化、conversation cache、state refresh 不能互相打架。  
- **典型表现：**  
  - OpenClaw：`/new` 与后台更新并发冲突、Signal 会话初始化冲突  
  - PicoClaw：重载历史后 tool_use 参数恢复  
  - LobsterAI：stale final sync 导致 context maintenance 回退  
  - ZeroClaw：context exhaustion 后需明确终态

### 2. 停止 / 中断必须真正生效
- **涉及项目：** OpenClaw、NanoBot、Hermes Agent、IronClaw  
- **诉求：** abort/stop/cancel 不能只停前端或 RPC，要真正停子进程、容器、工具执行链。  
- **典型表现：**  
  - OpenClaw：Docker exec cancel 后容器内命令仍运行  
  - NanoBot：`/stop` 丢弃队列或无法正确终止  
  - Hermes：工具链 “fake success” 或静默失败  
  - IronClaw：静默失败与通知缺失

### 3. 默认安全与资源边界
- **涉及项目：** NanoBot、IronClaw、ZeroClaw、Hermes Agent  
- **诉求：** API key、环境变量、文件系统、shell 子进程、权限目录都要默认收紧。  
- **典型表现：**  
  - NanoBot：明文存 key、无速率限制、shell 无资源限制  
  - IronClaw：能力目录泄露、HTTP 场景 mutating 请求失效  
  - ZeroClaw：CI gate 与 security advisory 清理  
  - Hermes：provider / browser / Windows 兼容引发安全式失败

### 4. provider / channel 兼容性
- **涉及项目：** PicoClaw、Hermes Agent、LobsterAI、CoPaw、OpenClaw  
- **诉求：** 多 provider 接入后，协议字段、OAuth、路由、分页、缓存控制必须稳定。  
- **典型表现：**  
  - PicoClaw：Gemini OpenAI compat 缺字段、Anthropic cache_control  
  - Hermes：Python 3.14、desktop provider picker、browser CDP 兼容  
  - LobsterAI：xAI OAuth、MCP transport 残留  
  - CoPaw：ACP 版本兼容问题

### 5. 可观测性与“静默失败”治理
- **涉及项目：** Hermes Agent、IronClaw、NanoClaw、ZeroClaw、NanoBot  
- **诉求：** 失败不能只是日志里有异常，用户界面和任务状态必须明确告知。  
- **典型表现：**  
  - Hermes：Cron scheduler silently fails  
  - IronClaw：失败无 Slack 通知、错误 banner 与 chat stream 脱节  
  - NanoClaw：MCP 启动失败静默化  
  - ZeroClaw：context exhaustion 后无终态说明

### 6. 长上下文成本与 memory / cache 优化
- **涉及项目：** PicoClaw、Hermes Agent、NanoBot、ZeroClaw、OpenClaw  
- **诉求：** 通过缓存、token 估算、rolling breakpoint、context window 管理降低成本并提升稳定性。  
- **典型表现：**  
  - PicoClaw：system blocks + cache_control  
  - Hermes：session folders、memory/provider cleanup  
  - NanoBot：session 消息无限增长、cache 无 TTL/LRU  
  - ZeroClaw：memory/RAG spans 追踪

---

## 5) 差异化定位分析

### 按功能侧重
- **OpenClaw：** 多端聊天主流程、会话治理、交互效率
- **NanoBot：** 安全默认值、资源控制、运行时硬边界
- **Hermes Agent：** 桌面端 + Cron + browser + provider + memory 的综合型平台
- **PicoClaw：** provider 兼容、缓存、长上下文成本优化
- **NanoClaw：** agent-runner 稳定性、审计、可观测性
- **IronClaw：** 框架/基础设施重构、WebUI v2、harness
- **LobsterAI：** 协作/技能/Provider 配置整合，偏应用层收敛
- **CoPaw：** 发布后兼容修复、桌面端打包与 memory 改进
- **ZeroClaw：** CI 门禁、ZeroCode 配置可见性、runtime 稳定性

### 按目标用户
- **OpenClaw：** 需要跨端使用、强调对话效率和会话管理的个人/团队用户
- **NanoBot：** 更偏安全敏感型开发者、需要默认边界的本地 agent 用户
- **Hermes Agent：** 希望在桌面、自动化、browser、memory 上获得一体化体验的重度用户
- **PicoClaw：** 关注多 provider 接入、成本控制和长会话的高级用户
- **NanoClaw / ZeroClaw：** 对可观测性、审计、调试与配置透明度要求高的工程用户
- **IronClaw：** 偏平台/框架贡献者和复杂工作流构建者
- **LobsterAI：** 面向实际工作流整合，如邮件、协作、技能、MCP
- **CoPaw：** 追求桌面可部署、兼容稳定的用户和维护者

### 按架构风格
- **OpenClaw：** 更强调 accessor 层、typed target、跨渠道统一抽象
- **NanoBot：** 更强调 sandbox、权限、资源配额、并发隔离
- **Hermes Agent：** 更像多模块平台，横向扩展快，治理复杂度高
- **PicoClaw：** provider-specific 兼容层与缓存协议优化
- **NanoClaw：** agent-runner + 审计日志驱动的可追踪架构
- **IronClaw：** harness/gate-dispatch/ WebUI v2，典型大重构
- **ZeroClaw：** schema V4、ZeroCode、CI gate，强调工程化与可配置性

---

## 6) 社区热度与成熟度

### 快速迭代阶段
这些项目的特征是：**Issue/PR 都很活跃，但问题暴露密集，修复与需求并行**。
- **Hermes Agent**：50 Issue 更新、50 PR 更新，典型高压迭代
- **IronClaw**：33 Issue、46 PR，基础设施和 UI 同步重构
- **OpenClaw**：8 Issue、39 PR，修复导向很强，用户主流程在持续打磨
- **ZeroClaw**：9 Issue、22 PR，围绕 CI、配置和 runtime 补强
- **NanoBot**：37 Issue、14 PR，问题暴露快于合并，属于质量整治期

### 质量巩固阶段
这些项目更像在**收敛版本、修复回归、补齐可用性**。
- **CoPaw**：已有 release，且 PR 主要是兼容/回归修复
- **LobsterAI**：0 Issue、10 PR，低讨论高交付，像在为下一次发版收口
- **PicoClaw**：小规模但聚焦，偏 provider 和缓存稳定性
- **NanoClaw**：中等活跃，强调审计与运行时正确性

### 静默/低活跃阶段
- **NullClaw、TinyClaw、Moltis、ZeptoClaw**：过去 24 小时无活动

---

## 7) 值得关注的趋势信号

### 1. “默认安全”正在成为基础门槛
典型来自 NanoBot、IronClaw、ZeroClaw。  
开发者不再接受“先开放、后补安全”，而是要求：
- API key 不明文
- 环境变量不过度暴露
- filesystem 默认收紧
- shell / tool 具备资源上限

### 2. “停止”与“失败”必须可验证
典型来自 OpenClaw、Hermes Agent、NanoClaw、IronClaw。  
用户对 agent 的容忍度越来越低，核心标准是：
- 停止后不能继续执行副作用
- 失败不能静默
- 必须有可观察的终态

### 3. provider / 协议兼容成为高频痛点
典型来自 PicoClaw、CoPaw、Hermes Agent、LobsterAI。  
行业已经进入多 provider 并存阶段，下一层竞争不只是“接入谁”，而是：
- 协议字段是否完整
- 兼容层是否稳定
- 版本升级是否可控
- 缓存/分页/路由是否统一

### 4. 长上下文和 memory 成本控制变得现实化
典型来自 PicoClaw、NanoBot、ZeroClaw、Hermes Agent。  
这说明 agent 使用已从短问答进入真实工作流，开发者需要关注：
- token 预算
- session 膨胀
- cache 策略
- memory 清理与审计

### 5. 桌面端与可视化工作台的重要性继续上升
典型来自 OpenClaw、Hermes Agent、IronClaw、CoPaw。  
说明 AI 助手正在从 CLI / API 工具，进一步走向：
- 桌面工作台
- 多会话管理
- tool activity 可视化
- 本地诊断与配置中心

### 6. 可观测性正在从“日志”升级为“产品能力”
典型来自 NanoClaw、ZeroClaw、IronClaw、Hermes Agent。  
用户要的不只是日志，而是：
- 当前卡在哪一步
- 为什么停止
- 哪个 provider 失败
- 哪个 tool 没执行
- 终态是什么

---

## 结论
如果只看今天的数据，这个生态的主旋律是：**从功能扩张转向工程治理**。  
OpenClaw 的位置很清晰：它不是最“广”的项目，但在 **会话治理、跨端体验和主流程稳定性** 上表现出很强的产品化倾向，属于这个生态里非常有代表性的“体验收敛型”项目。  
而整个行业的共同趋势也很明确：**安全默认、停止可验证、provider 兼容、长上下文成本控制、可观测性增强**，正在成为 AI 智能体开源项目的基本竞争门槛。

如果你需要，我可以继续把这份报告整理成：
1. **1 页管理层摘要版**，或  
2. **适合研发例会的表格版（含风险等级与建议优先级）**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-07-07）

## 1) 今日速览
过去 24 小时，NanoBot 的仓库活跃度很高：共有 **37 条 Issue 更新**、**14 条 PR 更新**，但 **没有新版本发布**。从内容看，社区与维护者的关注点高度集中在 **安全加固、稳定性修复、并发/资源控制**，而不是新功能扩张。  
当前信号显示：项目处于“**高压排错 + 代码质量整治**”阶段，问题发现速度快于修复落地速度，但修复链路已经开始形成。  
就健康度而言，这是一个“**问题暴露充分、但仍需加速收敛**”的状态：风险被系统性挖出，对后续质量提升是好事，但短期需要尽快处理高危项。  
GitHub：仓库主页 [HKUDS/nanobot](https://github.com/HKUDS/nanobot)

---

## 2) 项目进展
今日真正进入代码闭环的变更不多，但方向明确：**优先修复高频崩溃点与运行时边界问题**。

- **#4770 已关闭：修复 gateway state refresh 的配置路径回归**  
  这类修复有助于恢复主分支 CI / gateway 状态自愈链路的稳定性，属于“基础设施可用性”层面的关键修补。  
  链接：PR [#4770](https://github.com/HKUDS/nanobot/pull/4770)

- **#4818 已关闭：修复 web_fetch 对 None URL 的签名问题**  
  该修复消除了 `None -> "None"` 造成的错误缓存签名，是典型的“低成本、高收益”热路径修正。  
  链接：PR [#4818](https://github.com/HKUDS/nanobot/pull/4818)

- **围绕同一问题链条，已有一批 open PR 在推进**  
  包括 `CancelledError` 泄漏、`BaseException` 误捕获、多模态 `.strip()` 崩溃、`role` 缺失 KeyError、锁对象弱引用问题等，说明维护者/贡献者正在对运行时核心路径进行成组修补。  
  这些 PR 仍待合并，意味着“问题识别”已经充分，下一步是尽快完成代码收口。  
  GitHub：PR [#4814](https://github.com/HKUDS/nanobot/pull/4814)、[#4816](https://github.com/HKUDS/nanobot/pull/4816)、[#4813](https://github.com/HKUDS/nanobot/pull/4813)、[#4812](https://github.com/HKUDS/nanobot/pull/4812)、[#4819](https://github.com/HKUDS/nanobot/pull/4819)

**阶段性判断：**  
今日已闭合/合并 2 个 PR，按当前 PR 更新量计算，闭合推进约 **14%（2/14）**。整体上项目向前迈进的幅度不大，但修复覆盖面很广，属于“**少量合并，显著减风险**”的日子。  
GitHub：PR 列表 [HKUDS/nanobot/pulls](https://github.com/HKUDS/nanobot/pulls)

---

## 3) 社区热点
> 注：本次快照里，Issue/PR 的评论数几乎全部为 0，说明**讨论深度暂时不高**，社区更像是在“集中报问题/集中提修复”，而非展开长链路辩论。

### 最受关注的话题方向（按影响面与危险度综合判断）
1. **安全审计总报告：35 项发现**
   - Issue [#4815](https://github.com/HKUDS/nanobot/issues/4815)
   - 这是今天最具“总览意义”的热点。它一次性覆盖了命令注入、路径逃逸、鉴权绕过、反序列化/eval、密钥处理、TOCTOU、资源耗尽、并发缺陷等多个风险面。
   - 背后诉求：希望项目从“功能可用”升级到“**默认安全、默认稳健**”。

2. **Markdown 转富文本逻辑重复，3 个 channel 存在同构转换器**
   - Issue [#4810](https://github.com/HKUDS/nanobot/issues/4810)
   - 说明多渠道文本渲染逻辑已经出现明显技术债，维护成本正在抬升。
   - 背后诉求：降低重复实现、减少平台差异 bug、提升长期可维护性。

3. **Channel 初始化模板在 16 个文件中重复**
   - Issue [#4807](https://github.com/HKUDS/nanobot/issues/4807)
   - 这类结构性重复通常意味着项目扩张后缺少统一抽象层。
   - 背后诉求：抽公共基类，降低新增 channel 的接入成本。

4. **API Key 以明文形式落盘**
   - Issue [#4803](https://github.com/HKUDS/nanobot/issues/4803)
   - 这是高优先级安全热点，直接影响用户对该项目的信任。
   - 背后诉求：提供更安全的凭据管理与默认配置策略。

5. **Workspace / 文件系统边界默认不收紧**
   - Issue [#4796](https://github.com/HKUDS/nanobot/issues/4796)
   - 对 AI agent 项目来说，默认工作区隔离是用户最敏感的安全边界之一。
   - 背后诉求：让“默认安全”成为产品设定，而不是用户自己额外配置。

---

## 4) Bug 与稳定性
以下按严重程度排序，并标注是否已有对应修复 PR。

### P0 / 高危安全与资源风险

- **API Key 明文存储于 `~/.nanobot/config.json`**  
  影响：凭据泄露风险极高。  
  状态：**未见修复 PR**。  
  Issue：[#4803](https://github.com/HKUDS/nanobot/issues/4803)

- **`restrict_to_workspace` 默认 False，文件系统默认暴露**  
  影响：agent 可访问工作区外文件，安全边界过宽。  
  状态：**未见修复 PR**。  
  Issue：[#4796](https://github.com/HKUDS/nanobot/issues/4796)

- **`/v1/chat/completions` 无任何速率限制**  
  影响：可被刷请求耗尽 LLM 额度与系统资源。  
  状态：**未见修复 PR**。  
  Issue：[#4782](https://github.com/HKUDS/nanobot/issues/4782)

- **CLI 子进程继承完整 `os.environ`，泄漏 API keys**  
  影响：外部 CLI app 可能直接读到 provider key。  
  状态：**未见修复 PR**。  
  Issue：[#4783](https://github.com/HKUDS/nanobot/issues/4783)

- **Shell 子进程缺少资源限制（ulimit / cgroup / CPU / memory cap）**  
  影响：易被 fork bomb / CPU 占满 / 内存耗尽拖垮进程。  
  状态：**未见修复 PR**。  
  Issue：[#4797](https://github.com/HKUDS/nanobot/issues/4797)

- **文件工具存在 TOCTOU symlink 攻击窗口**  
  影响：可能越权访问工作区外路径。  
  状态：**未见修复 PR**。  
  Issue：[#4790](https://github.com/HKUDS/nanobot/issues/4790)

- **并发文件写入未串行化，可能造成工作区文件损坏**  
  影响：多会话并发时可能出现写入交错或文件腐坏。  
  状态：**未见修复 PR**。  
  Issue：[#4798](https://github.com/HKUDS/nanobot/issues/4798)

- **流式 LLM 调用绕过 wall-clock timeout**  
  影响：慢速但持续输出的请求可能无限运行。  
  状态：**未见修复 PR**。  
  Issue：[#4795](https://github.com/HKUDS/nanobot/issues/4795)

### P1 / 运行时稳定性与崩溃修复

- **`CancelledError` 泄漏被错误吞掉，主循环可能丢迭代**  
  状态：已有修复 PR **[#4814](https://github.com/HKUDS/nanobot/pull/4814)**（open）  
  Issue：[#4804](https://github.com/HKUDS/nanobot/issues/4804)

- **`prepare_call` 异常被 `suppress(Exception)` 静默吞掉**  
  状态：已有修复 PR **[#4811](https://github.com/HKUDS/nanobot/pull/4811)**（open）  
  Issue：[#4805](https://github.com/HKUDS/nanobot/issues/4805)

- **工具执行路径错误捕获 `BaseException`**  
  状态：已有修复 PR **[#4816](https://github.com/HKUDS/nanobot/pull/4816)**（open）  
  Issue：[#4788](https://github.com/HKUDS/nanobot/issues/4788)

- **多模态消息 `msg.content` 为 list 时 `.strip()` 崩溃**  
  状态：已有修复 PR **[#4813](https://github.com/HKUDS/nanobot/pull/4813)**（open）  
  Issue：[#4800](https://github.com/HKUDS/nanobot/issues/4800)

- **消息字典缺少 `role` 时触发 KeyError**  
  状态：已有修复 PR **[#4812](https://github.com/HKUDS/nanobot/pull/4812)**（open）  
  Issue：[#4801](https://github.com/HKUDS/nanobot/issues/4801)

- **`context_window_tokens=0` 时返回伪造的 128 token 预算**  
  状态：已有修复 PR **[#4817](https://github.com/HKUDS/nanobot/pull/4817)**（open）  
  Issue：[#4802](https://github.com/HKUDS/nanobot/issues/4802)

- **`external_lookup_signature()` 对 None URL 生成错误缓存签名**  
  状态：已有修复 PR **[#4820](https://github.com/HKUDS/nanobot/pull/4820)**（open），并有已关闭 PR [#4818](https://github.com/HKUDS/nanobot/pull/4818)  
  Issue：[#4799](https://github.com/HKUDS/nanobot/issues/4799)

- **Consolidator 使用 `WeakValueDictionary` 存锁，GC 可能破坏互斥**  
  状态：已有修复 PR **[#4819](https://github.com/HKUDS/nanobot/pull/4819)**（open）  
  Issue：[#4789](https://github.com/HKUDS/nanobot/issues/4789)

### P2 / 可用性与长期可靠性
- **`/stop` 丢弃 pending 队列消息，造成永久消息丢失**  
  状态：暂无修复 PR。  
  Issue：[#4792](https://github.com/HKUDS/nanobot/issues/4792)

- **Session 消息列表无限增长，内存占用持续扩大**  
  状态：暂无修复 PR。  
  Issue：[#4787](https://github.com/HKUDS/nanobot/issues/4787)

- **SessionManager 缓存无 TTL/LRU，长期运行会持续膨胀**  
  状态：暂无修复 PR。  
  Issue：[#4786](https://github.com/HKUDS/nanobot/issues/4786)

- **`read_file` 先整文件读入内存，超大文件可能 OOM**  
  状态：暂无修复 PR。  
  Issue：[#4785](https://github.com/HKUDS/nanobot/issues/4785)

---

## 5) 功能请求与路线图信号
今日新增/推进的“功能向”信号主要集中在 **WebUI 体验、channel 抽象、运行时能力统一**。

- **WebUI 工具活动展示增强**
  - PR [#4821](https://github.com/HKUDS/nanobot/pull/4821)
  - 诉求：在 activity 中展示更可读的通用参数预览，改善调试体验与可观察性。
  - 路线图判断：很可能进入下一轮小版本，因为这是直接提升可用性的低风险前端改进。

- **WebUI 支持文档附件**
  - PR [#4771](https://github.com/HKUDS/nanobot/pull/4771)
  - 诉求：从“仅图片”扩展到“图片 + 文档”，说明 WebUI 正在向更完整的交互入口演进。
  - 路线图判断：如果测试稳定，适合进入下一版本候选。

- **WebUI 原生运行时访问统一封装**
  - PR [#4769](https://github.com/HKUDS/nanobot/pull/4769)
  - 诉求：将 restart、诊断、日志、目录选择等 native 能力收口到 runtime facade。
  - 路线图判断：这是架构型演进，利于后续继续扩展 WebUI 功能。

- **通用 channel / converter 抽象**
  - Issue [#4807](https://github.com/HKUDS/nanobot/issues/4807)
  - Issue [#4810](https://github.com/HKUDS/nanobot/issues/4810)
  - 诉求：减少重复实现、提升跨渠道一致性。
  - 路线图判断：如果维护者接受重构成本，可能会进入中期路线图，但不一定是短期版本主线。

---

## 6) 用户反馈摘要
从今日 issue/PR 内容看，真实用户痛点非常集中，主要是下面几类：

1. **“默认安全”不足**
   - 用户担心 API key、环境变量、文件系统边界、shell 子进程权限外泄。  
   - 典型场景：本地 gateway、安装型 CLI app、多渠道接入、带工具执行的 agent。  
   - 代表链接：[#4803](https://github.com/HKUDS/nanobot/issues/4803)、[#4796](https://github.com/HKUDS/nanobot/issues/4796)、[#4783](https://github.com/HKUDS/nanobot/issues/4783)

2. **“多会话/并发”下稳定性不够**
   - 用户在并发 session、文件工具、exec session、consolidation lock 等路径上遇到竞态和数据隔离问题。  
   - 典型场景：多人并行使用、长连接对话、后台任务混跑。  
   - 代表链接：[#4798](https://github.com/HKUDS/nanobot/issues/4798)、[#4793](https://github.com/HKUDS/nanobot/issues/4793)、[#4789](https://github.com/HKUDS/nanobot/issues/4789)

3. **“长时间运行”下资源控制不足**
   - 用户希望有超时、速率限制、内存/CPU 限制、缓存回收。  
   - 典型场景：公开 API、持续对话、自动化工作流、文件读取与 shell 执行。  
   - 代表链接：[#4782](https://github.com/HKUDS/nanobot/issues/4782)、[#4797](https://github.com/HKUDS/nanobot/issues/4797)、[#4786](https://github.com/HKUDS/nanobot/issues/4786)

4. **“多模态 / WebUI” 支持正在成为新需求**
   - 用户希望消息内容、附件、WebUI 活动展示更友好、更统一。  
   - 典型场景：图文混合输入、文档附件传递、前端调试可视化。  
   - 代表链接：[#4800](https://github.com/HKUDS/nanobot/issues/4800)、[#4821](https://github.com/HKUDS/nanobot/pull/4821)、[#4771](https://github.com/HKUDS/nanobot/pull/4771)

**总体反馈画像：**  
用户不是在抱怨“功能不够多”，而是在要求项目补上 AI agent 产品最关键的三件事：**安全边界、并发稳态、可观测性**。

---

## 7) 待处理积压
> 说明：当前快照中的多数高风险条目都创建于 2026-07-06，因此严格来说还不算“长期沉积”。但它们已经构成了明确的 **高优先级待处理积压**，建议维护者优先分流。

### 建议尽快跟进的积压项
- **安全主线：**  
  [#4803](https://github.com/HKUDS/nanobot/issues/4803)、[#4796](https://github.com/HKUDS/nanobot/issues/4796)、[#4783](https://github.com/HKUDS/nanobot/issues/4783)、[#4782](https://github.com/HKUDS/nanobot/issues/4782)

- **资源/稳定性主线：**  
  [#4797](https://github.com/HKUDS/nanobot/issues/4797)、[#4795](https://github.com/HKUDS/nanobot/issues/4795)、[#4794](https://github.com/HKUDS/nanobot/issues/4794)、[#4787](https://github.com/HKUDS/nanobot/issues/4787)、[#4786](https://github.com/HKUDS/nanobot/issues/4786)、[#4785](https://github.com/HKUDS/nanobot/issues/4785)

- **并发/数据一致性主线：**  
  [#4798](https://github.com/HKUDS/nanobot/issues/4798)、[#4793](https://github.com/HKUDS/nanobot/issues/4793)、[#4789](https://github.com/HKUDS/nanobot/issues/4789)

- **已进入修复链路、但仍待合并的关键 PR：**  
  [#4811](https://github.com/HKUDS/nanobot/pull/4811)、[#4812](https://github.com/HKUDS/nanobot/pull/4812)、[#4813](https://github.com/HKUDS/nanobot/pull/4813)、[#4814](https://github.com/HKUDS/nanobot/pull/4814)、[#4816](https://github.com/HKUDS/nanobot/pull/4816)、[#4817](https://github.com/HKUDS/nanobot/pull/4817)、[#4819](https://github.com/HKUDS/nanobot/pull/4819)、[#4820](https://github.com/HKUDS/nanobot/pull/4820)

**维护者提醒：**  
建议将当前积压分成三条并行处理线：**安全默认值**、**运行时崩溃/竞态**、**WebUI/可用性增强**。这样既能快速降低风险，也能避免修复任务彼此阻塞。  
GitHub：Issue 列表 [HKUDS/nanobot/issues](https://github.com/HKUDS/nanobot/issues)、PR 列表 [HKUDS/nanobot/pulls](https://github.com/HKUDS/nanobot/pulls)

---

如果你愿意，我可以把这份日报进一步整理成 **“适合直接发到微信群 / 飞书 / 公众号”的精简版**，或输出成 **表格版（Issue/PR/风险等级/状态）**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-07-07）

## 1) 今日速览
过去 24 小时，Hermes Agent 维持**高强度活跃**：Issues 更新 50 条、PR 更新 50 条，说明社区反馈与开发提交都很密集，但当前仍**没有新版本发布**。  
从内容分布看，今天的讨论几乎被**桌面端、Cron/任务调度、模型/Provider 配置、浏览器工具、记忆系统**几条主线占据，属于典型的“高并发修 bug + 收需求”状态。  
整体上项目健康度偏积极：一方面有持续的修复和文档推进，另一方面也暴露出不少平台兼容性和隐性回归问题，说明产品正在快速迭代，但稳定性治理压力仍然较大。  
项目主页：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 2) 版本发布
**今日无新 Release。**  
最新 Releases：无  
项目未出现新的版本标签，意味着今天的变化主要来自代码合并/修复排队，而不是面向用户的一次统一发版。

---

## 3) 项目进展
过去 24 小时，统计口径显示共有 **6 个 PR 已合并/关闭**，说明项目仍在持续推进；但在当前可见样本里，真正确认“已关闭”的 PR 只有少数，且以小步修复和文档类变更为主。

### 可见的已关闭/完成项
- [#59905 docs(skills): add environmental map forecast graphics skill](https://github.com/NousResearch/hermes-agent/pull/59905)  
  关闭的文档型 PR，扩展了 skills 目录中的社区/能力说明，偏向生态建设而非核心功能。

### 今日明显推进的方向
- **桌面端体验修复**：包括会话、模型选择器、弹出窗口、认证表单等多个方向，说明 Desktop 仍是高优先级战场。
- **Cron / Kanban 稳定性**：有多条修复围绕任务执行、事件通知、权限/拦截逻辑展开，显示调度体系正在补漏洞。
- **Python 3.14 兼容性**：已有修复 PR 直接回应安装与并行工具调用的版本兼容问题，属于近期最现实的环境阻塞点。
- **记忆/技能体系治理**：多个 feature/bug 提案集中在 memory、skill 索引与清理机制，说明“长期使用后质量衰减”已成为真实痛点。

总体判断：项目今天的进展更像是**围绕稳定性和可用性做横向收敛**，而不是引入一个单一的大功能；这对一个快速增长的 agent 平台是正常且必要的。

---

## 4) 社区热点
今天最热的话题明显集中在 **“看得见但用不了”** 的产品问题上，尤其是桌面端和配置类故障。

### 讨论最活跃的 Issues
- [#59702 Desktop model picker shows only some named custom_providers entries](https://github.com/NousResearch/hermes-agent/issues/59702)  
  评论数最高（6）。用户明确指出：后端数据正确，但桌面端模型选择器只显示部分 `custom_providers` 条目，属于高迷惑性的 UI/同步问题。
- [#59896 DaemonThreadPoolExecutor breaks on Python 3.14](https://github.com/NousResearch/hermes-agent/issues/59896)  
  Python 3.14 兼容性导致并行工具调用直接失败，属于开发/安装环境阻塞类问题。
- [#59780 Spanish (Spain) localization](https://github.com/NousResearch/hermes-agent/issues/59780)  
  体现出国际化需求真实存在，且用户开始主动请求本地化支持。
- [#59856 opt-in Claude-Code-parity orchestration primitives](https://github.com/NousResearch/hermes-agent/issues/59856)  
  获得 1 个 👍，说明社区对更高级的编排能力有兴趣，但希望是**默认关闭、可选启用**的形式。

### 热点背后的诉求
1. **用户希望系统“少出声、多准确”**：不少 bug 都是“silent failure”“no warning”“fail open”，说明社区对可观测性与可靠性非常敏感。  
2. **桌面端是第一接触面**：模型选择器、会话窗口、认证、分享到 iOS 等需求都集中在 Desktop/GUI。  
3. **跨平台兼容性压力上升**：Windows、Linux、Termux、Python 3.14 都在出问题，说明 Hermes 已从单一开发环境进入广泛部署期。  

---

## 5) Bug 与稳定性
以下按严重程度排序，优先列出高风险、影响面大的问题：

### P1 / 高严重度
- [#59824 Cron scheduler silently fails (no Discord delivery)](https://github.com/NousResearch/hermes-agent/issues/59824)  
  **严重性：高**。Cron 定时任务按时触发但消息不送达，且是静默失败，直接影响自动化交付可信度。  
  **是否已有 fix PR：未看到明确对应 PR。**

### P2 / 中高严重度
- [#59702 Desktop model picker shows only some named custom_providers entries](https://github.com/NousResearch/hermes-agent/issues/59702)  
  桌面端配置展示异常，影响可用性与信任感。  
  **fix PR：未见明确对应。**
- [#59877 Package requires a different Python: 3.14.6 not in '<3.14,>=3.11'](https://github.com/NousResearch/hermes-agent/issues/59877)  
  安装直接失败，阻塞新用户。  
  **fix PR：有，[#59891 raise Python upper bound to support 3.14](https://github.com/NousResearch/hermes-agent/pull/59891)**。
- [#59850 hermes update (Windows) dependency install runs at PROJECT_ROOT](https://github.com/NousResearch/hermes-agent/issues/59850)  
  Windows 更新流程半更新、依赖阶段失败，属于安装/升级链路问题。  
  **fix PR：未见明确对应。**
- [#59845 Cron job fails with AttributeError: '_is_copilot_url'](https://github.com/NousResearch/hermes-agent/issues/59845)  
  运行时异常会中断整个会话/调用链，属于稳定性问题。  
  **fix PR：未见明确对应。**
- [#59761 remove key doesn't fully remove provider](https://github.com/NousResearch/hermes-agent/issues/59761)  
  认证残留导致重启后仍存在 provider 数据，属于配置一致性问题。  
  **fix PR：未见明确对应。**
- [#59797 browser_navigate / browser_vision fail with 'Not allowed'](https://github.com/NousResearch/hermes-agent/issues/59797)  
  Windows + Brave CDP 场景下浏览器工具不可用，影响 browser 工具链。  
  **fix PR：未见明确对应。**
- [#59731 computer-use reports unverified CUA keyboard actions as success](https://github.com/NousResearch/hermes-agent/issues/59731)  
  工具层会把未验证动作报告成成功，属于“假成功”风险。  
  **fix PR：未见明确对应。**
- [#59694 Tencent TokenHub provider only shows 1 model](https://github.com/NousResearch/hermes-agent/issues/59694)  
  模型列表与真实 API 返回不一致，影响 provider 选择。  
  **fix PR：未见明确对应。**

### 已关闭但值得关注的稳定性项
- [#59749 Discord silently broken after upgrade](https://github.com/NousResearch/hermes-agent/issues/59749)  
  已关闭。说明升级/迁移兼容问题已经被确认并处理或归档。
- [#59748 Dashboard /auth/login crashes when BasicAuth is sole session provider](https://github.com/NousResearch/hermes-agent/issues/59748)  
  已关闭。表明认证流程中的一类崩溃已进入收敛阶段。

---

## 6) 功能请求与路线图信号
今天出现的功能诉求非常集中，且和已有 PR/修复方向高度一致，说明下一版本的路线图轮廓已经比较清晰。

### 高概率进入近期版本的方向
- [#59892 session folders for organizing sessions](https://github.com/NousResearch/hermes-agent/pull/59892)  
  用户对会话组织能力有明确需求，且这是典型的桌面端可见增强，**很可能进入下一轮迭代**。
- [#59898 prepare_memory_write pre-commit hook for memory providers](https://github.com/NousResearch/hermes-agent/pull/59898)  
  属于 memory 体系的基础设施增强，和今天多个 memory 相关 issue 高度同频，**落地概率较高**。
- [#59891 raise Python upper bound to support 3.14](https://github.com/NousResearch/hermes-agent/pull/59891)  
  明确回应安装失败问题，属于“阻塞用户安装”的高优先级修复，**很可能优先合入**。
- [#59900 fix(dashboard): handle password auth login form](https://github.com/NousResearch/hermes-agent/pull/59900)  
  认证流程问题真实且高频，修复价值直接。
- [#59903 fix(slack): avoid duplicated bang command block text](https://github.com/NousResearch/hermes-agent/pull/59903)  
  平台集成体验优化，风险相对可控，容易进入补丁版本。
- [#59906 fix(kanban): guard needs_input unblock from non-interactive sessions](https://github.com/NousResearch/hermes-agent/pull/59906)  
  任务执行安全边界问题，属于基础稳定性修补。

### 更偏中长期的功能诉求
- [#59822 iOS Share Extension](https://github.com/NousResearch/hermes-agent/issues/59822)  
  需求合理，但涉及移动端系统集成，工程量较大。
- [#59780 Spanish localization](https://github.com/NousResearch/hermes-agent/issues/59780)  
  价值明确，但通常需要单独的国际化投入。
- [#59821 Agent thinking pane](https://github.com/NousResearch/hermes-agent/issues/59821)  
  体验价值高，但牵涉交互设计与信息暴露策略。
- [#59856 Claude-Code-parity orchestration primitives](https://github.com/NousResearch/hermes-agent/issues/59856)  
  适合做成 opt-in 扩展能力，短期内更像路线探索而非默认功能。

---

## 7) 用户反馈摘要
从今天的 Issues 文本中，可以提炼出几个非常清晰的用户痛点：

1. **“界面显示不对，但后端其实是好的”**  
   典型如 [#59702](https://github.com/NousResearch/hermes-agent/issues/59702)、[#59694](https://github.com/NousResearch/hermes-agent/issues/59694)。  
   用户对配置展示、模型列表、provider 可见性非常敏感，说明桌面端/CLI 的数据一致性问题正在影响信任。

2. **“升级/安装/环境兼容不能卡死用户”**  
   典型如 [#59877](https://github.com/NousResearch/hermes-agent/issues/59877)、[#59850](https://github.com/NousResearch/hermes-agent/issues/59850)、[#59896](https://github.com/NousResearch/hermes-agent/issues/59896)。  
   社区已经进入多平台、多 Python 版本的真实使用阶段，包管理与兼容策略需要更稳。

3. **“静默失败比报错更糟”**  
   典型如 [#59824](https://github.com/NousResearch/hermes-agent/issues/59824)、[#59749](https://github.com/NousResearch/hermes-agent/issues/59749)、[#59748](https://github.com/NousResearch/hermes-agent/issues/59748)。  
   用户更在意的是任务到底有没有成功，而不是只是日志里有没有异常。

4. **“长期使用后质量会退化”**  
   来自 [#59796](https://github.com/NousResearch/hermes-agent/issues/59796) 与 [#59823](https://github.com/NousResearch/hermes-agent/issues/59823)。  
   真实用户已经开始观察到 memory/skill 累积带来的“经验债务”，希望系统具备清理、审核、收敛能力。

5. **“希望 Hermes 更像一个可扩展平台，而不只是单点工具”**  
   见 [#59856](https://github.com/NousResearch/hermes-agent/issues/59856)、[#59707](https://github.com/NousResearch/hermes-agent/issues/59707)、[#59822](https://github.com/NousResearch/hermes-agent/issues/59822)。  
   用户希望有可选编排、会话组织、分享扩展、局部启用/禁用等能力，显示平台化期待正在增强。

---

## 8) 待处理积压
由于本次数据只覆盖过去 24 小时，严格意义上的“长期未响应”样本不足；但从**高优先级且仍无明显接手信号**的角度，建议维护者优先盯以下项：

- [#59824 Cron scheduler silently fails (P1)](https://github.com/NousResearch/hermes-agent/issues/59824)  
  这是今天最值得立刻分派的稳定性问题。
- [#59850 hermes update on Windows fails](https://github.com/NousResearch/hermes-agent/issues/59850)  
  更新链路故障会直接影响留存和扩散。
- [#59702 desktop custom_providers picker bug](https://github.com/NousResearch/hermes-agent/issues/59702)  
  桌面端核心入口的可信展示问题。
- [#59731 computer-use unverified actions reported as success](https://github.com/NousResearch/hermes-agent/issues/59731)  
  这是工具链“假成功”风险，建议尽快确认。
- [#59845 AIAgent missing _is_copilot_url guard](https://github.com/NousResearch/hermes-agent/issues/59845)  
  运行时 AttributeError，容易造成任务中断。
- [#59797 browser tool Not allowed on Windows/Brave](https://github.com/NousResearch/hermes-agent/issues/59797)  
  浏览器自动化是重要能力面，兼容性问题不宜拖延。

如果需要，我也可以把这份日报进一步整理成：
1. **适合发群/发邮件的短版摘要**，或  
2. **适合内部周报的表格版（含优先级、影响面、建议负责人）**。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-07-07）

## 1) 今日速览
过去 24 小时内，PicoClaw 维持了**中等偏活跃**的开发节奏：Issues 有 3 条新增/活跃，PR 有 2 条更新，其中 1 条已关闭、1 条仍待合并。  
从内容看，今天的讨论重点集中在**兼容性修复、会话缓存优化、以及搜索请求认证能力**，说明项目仍在围绕 AI Agent / 多模型适配继续打磨核心能力。  
虽然没有新版本发布，但 PR 已经推进到较具体的实现层面，表明项目处于“**功能持续补齐、稳定性持续修复**”的阶段。  
总体健康度来看：**活跃度正常，问题主要集中在集成兼容与性能/成本优化**，属于成熟开源 AI 助手框架常见的演进方向。  

---

## 2) 版本发布
**今日无新版本发布。**  
- Releases：无  
- 链接：<https://github.com/sipeed/picoclaw/releases>

---

## 3) 项目进展
今日最重要的进展来自 1 个已关闭 PR 和 1 个仍在推进中的 PR，分别覆盖**工具调用历史重载修复**与**Anthropic system prompt 缓存支持**。

### 已关闭 PR
- **#3227 fix(providers): resolve tool_use name/args from Function on reloaded history**  
  链接：<https://github.com/sipeed/picoclaw/pull/3227>  
  这条 PR 解决了 Anthropic provider 在历史消息重载后，`tool_use` 的 `name/args` 无法从 `Function` 正确恢复的问题。  
  **意义**：提升了会话持久化后的工具调用一致性，减少 agent 运行在“续聊”场景下的状态丢失，属于典型的稳定性补丁。  

### 待合并 PR
- **#3228 fix(anthropic-messages): send SystemParts as system blocks with cache_control**  
  链接：<https://github.com/sipeed/picoclaw/pull/3228>  
  这条 PR 让 `anthropic_messages` provider 能把 `SystemParts` 以 system blocks 形式发送，并携带 `cache_control`。  
  **意义**：这是面向 Anthropic prompt caching 的关键改进，直接影响长系统提示词与固定前缀的缓存可用性。  

### 今日整体推进评估
- 从“修复工具调用历史恢复”到“支持更细粒度的缓存控制”，项目今天向前推进的重点是：  
  **让 agent 对话更可持续、更省 token、更适合长上下文任务。**  
- 若将已关闭 PR 与待合并 PR 合并看，PicoClaw 在“provider 兼容性 + 运行效率”这条主线上又迈出了一步。  

---

## 4) 社区热点
今天没有出现明显的高评论或高反应线程；所有最新 Issues / PR 的评论数均为 **0**（PR 页面中评论字段为 undefined，说明暂无可见讨论量或数据未填充）。  
因此，社区热度主要体现在**“问题刚提出、方案刚进入讨论/实现”**的早期阶段，而不是已经形成大规模争论。

### 热点话题 1：Gemini OpenAI 兼容格式的 tool call 兼容性
- **Issue #3230 [BUG] Function call is missing thought_signature when calling Gemini API via OpenAI compat format**  
  链接：<https://github.com/sipeed/picoclaw/issues/3230>  
  诉求背后反映出：用户正在通过 **Cloudflare AI Gateway + OpenAI 兼容接口** 接入 Gemini，并在工具调用时遇到协议字段缺失问题。  
  这类问题通常会直接阻断 agent 执行，因此对实际使用影响较大。  

### 热点话题 2：Anthropic 会话缓存的进一步优化
- **Issue #3229 Proposal: rolling conversation cache breakpoints...**  
  链接：<https://github.com/sipeed/picoclaw/issues/3229>  
  这是一个偏架构/性能方向的提案，目标是减少长对话历史重复输入带来的 token 浪费。  
  它与 PR #3228 高度相关，说明社区正在围绕“**如何让 agent 更省钱、更快**”形成明确方向。  

### 热点话题 3：搜索服务认证方式扩展
- **Issue #3231 [Feature] 给searxng搜索加入basicauth请求头验证**  
  链接：<https://github.com/sipeed/picoclaw/issues/3231>  
  该需求表明用户希望 PicoClaw 对接更多受保护的搜索后端，且要求以标准请求头方式传递认证信息。  

---

## 5) Bug 与稳定性
按影响优先级排序，今天最值得关注的是以下问题：

### 高优先级：Gemini 工具调用兼容性错误
- **#3230 [BUG] Function call is missing thought_signature when calling Gemini API via OpenAI compat format**  
  链接：<https://github.com/sipeed/picoclaw/issues/3230>  
  **影响**：可能导致工具调用失败，直接破坏 agent 工作流。  
  **场景**：通过 OpenAI 兼容格式调用 Gemini，并经过 Cloudflare AI Gateway。  
  **当前状态**：尚未看到对应 fix PR。  
  **严重性判断**：高，因为它影响核心“工具调用”链路。  

### 中优先级：历史重载后的 tool_use 参数恢复问题
- **#3227 fix(providers)...**（已关闭，疑似已修复）  
  链接：<https://github.com/sipeed/picoclaw/pull/3227>  
  该问题属于会话恢复/重载后的数据一致性问题。  
  **状态**：已关闭，说明修复已完成或被替代方案吸收。  
  **严重性判断**：中高，因为它影响持续对话和状态恢复。  

### 低优先级：搜索认证能力缺失
- **#3231 [Feature] 给searxng搜索加入basicauth请求头验证**  
  链接：<https://github.com/sipeed/picoclaw/issues/3231>  
  这更偏功能缺口，但若用户依赖私有 searxng 实例，实际上会变成可用性问题。  
  **当前状态**：暂无 fix PR。  

---

## 6) 功能请求与路线图信号
今天的新增需求里，有两个信号很值得关注：

### 信号 1：Anthropic 缓存与长上下文成本优化，可能进入下一阶段路线图
- **Issue #3229 Proposal: rolling conversation cache breakpoints...**  
  链接：<https://github.com/sipeed/picoclaw/issues/3229>  
- **相关 PR #3228**  
  链接：<https://github.com/sipeed/picoclaw/pull/3228>  

**判断**：  
这不是孤立需求，而是与已在推进的 cache_control 支持形成了明显的连续路线。  
如果 PR #3228 合并，#3229 提出的“rolling breakpoints”很可能成为下一步优化方向。  
**结论**：该方向进入下一版本的概率较高，尤其适合长期会话、agentic 工作流和高频调用场景。  

### 信号 2：搜索后端认证能力扩展
- **Issue #3231 [Feature] 给searxng搜索加入basicauth请求头验证**  
  链接：<https://github.com/sipeed/picoclaw/issues/3231>  

**判断**：  
这是典型的“从可用走向可部署”的需求。  
当用户开始把 PicoClaw 接到私有基础设施时，认证、代理、请求头控制等能力会成为刚需。  
**结论**：如果项目下一版继续强化工具生态与外部服务接入能力，这个需求很可能被纳入。  

### 信号 3：Gemini 兼容层稳定性仍是路线图重点
- **Issue #3230 [BUG]...**  
  链接：<https://github.com/sipeed/picoclaw/issues/3230>  

**判断**：  
多模型兼容是 PicoClaw 的核心价值之一，因此此类协议兼容 bug 通常会优先级较高。  
若后续出现 fix PR，这个问题很可能会被快速推进。  

---

## 7) 用户反馈摘要
从今天的 Issues 内容中，可以提炼出三类真实用户痛点：

### 1. “接口兼容，但协议细节不兼容”
- 来自 **#3230**：用户能成功走 OpenAI compat 路径，但 Gemini 在 tool call 场景下仍因缺少 `thought_signature` 报错。  
- **反馈含义**：用户希望的是“能跑”之外的“**完全对齐 provider 规范**”。  
- 链接：<https://github.com/sipeed/picoclaw/issues/3230>  

### 2. “长对话成本太高，需要更聪明的缓存”
- 来自 **#3229**：用户明确指出 conversation history 是主要 token 消耗来源。  
- **反馈含义**：PicoClaw 已开始进入真实 agent 场景，用户开始关心成本、延迟和缓存策略，而不仅是功能能否工作。  
- 链接：<https://github.com/sipeed/picoclaw/issues/3229>  

### 3. “希望更容易接入受保护的内部服务”
- 来自 **#3231**：用户想给 searxng 加 Basic Auth 请求头验证，而不是把认证信息拼进 URL。  
- **反馈含义**：用户对安全性和工程规范有明确诉求，说明 PicoClaw 已被用于更严肃的集成环境。  
- 链接：<https://github.com/sipeed/picoclaw/issues/3231>  

### 满意点与不足点
- **满意点**：项目在多 provider、工具调用、缓存控制上持续迭代，说明框架扩展性较强。  
- **不足点**：部分 provider 的协议兼容和会话恢复仍有边角问题，且长上下文成本优化还在补课。  

---

## 8) 待处理积压
基于当前 24 小时数据，**没有明显“长期未响应”的老积压项**；但有几条最新打开的关键工单值得维护者尽快跟进：

### 重点待跟进 1：Gemini 工具调用缺少 thought_signature
- **#3230 [BUG] Function call is missing thought_signature...**  
  链接：<https://github.com/sipeed/picoclaw/issues/3230>  
  **原因**：这是核心调用链路问题，优先级应高于一般功能请求。  

### 重点待跟进 2：searxng Basic Auth 请求头支持
- **#3231 [Feature] 给searxng搜索加入basicauth请求头验证**  
  链接：<https://github.com/sipeed/picoclaw/issues/3231>  
  **原因**：涉及真实部署可用性，属于“接入门槛”问题。  

### 重点待跟进 3：rolling conversation cache breakpoints 提案
- **#3229 Proposal...**  
  链接：<https://github.com/sipeed/picoclaw/issues/3229>  
  **原因**：这类提案往往需要维护者明确方向，决定是否进入主线。  

### 重点待跟进 4：Anthropic system blocks + cache_control PR
- **#3228 fix(anthropic-messages)...**  
  链接：<https://github.com/sipeed/picoclaw/pull/3228>  
  **原因**：它是当前最接近落地的性能优化改动，建议尽快 review/merge。  

---

## 总体结论
今天 PicoClaw 的项目状态可以概括为：**活跃、聚焦、问题导向明确**。  
开发重心已经非常清晰地落在三条主线：**provider 兼容性修复、会话/工具调用稳定性、以及长上下文缓存优化**。  
从需求与 PR 的匹配度看，项目短期内很可能继续围绕 Anthropic/Gemini 兼容和 agent 成本优化推进。  
如果你愿意，我也可以把这份日报进一步整理成**适合公众号/飞书周报/Markdown 仪表盘**的版本。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-07-07）

## 1) 今日速览
过去 24 小时内，NanoClaw 维持**中高活跃度**：Issues 有 3 条更新，PR 有 8 条更新，但**没有新版本发布**。从内容看，今天的工作重心明显偏向两类：一是 **agent-runner / SDK 兼容性与错误处理**，二是 **文档与架构说明的系统性校准**。  
今日仅有 **1 个 PR 关闭/合并**，说明项目在稳步推进，但仍以小步修复和文档治理为主，而非一次性功能跃迁。整体健康度判断为：**活跃、方向明确、以稳定性与可维护性建设为主**。  
相关条目：[#2967](https://github.com/qwibitai/nanoclaw/pull/2967)、[#2968](https://github.com/qwibitai/nanoclaw/issues/2968)、[#2963](https://github.com/qwibitai/nanoclaw/pull/2963)

---

## 2) 项目进展
### 已合并/关闭的重要 PR
- **[#2967 feat: opt-in local audit log (AUDIT_ENABLED)](https://github.com/qwibitai/nanoclaw/pull/2967)**  
  今日最实质性的落地是本 PR：为 `ncl` 增加了**可选本地审计日志**能力，按动作生成规范化 JSON 事件并落盘到 `data/audit/` 下的 NDJSON 日文件，同时提供 `ncl audit list` 回读和后续导出钩子。  
  这意味着项目在**可观测性、审计合规、企业可用性**上前进了一大步。

### 进展评估
- 今日已确认推进的“已落地能力”主要是 **1 项审计/可观测性增强**。
- 其余 7 个 PR 仍处于开放状态，说明当前迭代仍在集中打磨底层正确性、文档准确性和集成能力。  
- 从路线来看，项目正在从“功能可用”向“**可解释、可追踪、可维护**”演进。  
相关链接：[#2967](https://github.com/qwibitai/nanoclaw/pull/2967)、[#2966](https://github.com/qwibitai/nanoclaw/pull/2966)、[#2965](https://github.com/qwibitai/nanoclaw/pull/2965)、[#2964](https://github.com/qwibitai/nanoclaw/pull/2964)

---

## 3) 社区热点
### 讨论最值得关注的条目
- **[#2968 MCP server spawn/connect failures are silent](https://github.com/qwibitai/nanoclaw/issues/2968)**  
  虽然当前评论数为 0，但这是今天最关键的稳定性议题之一：MCP server 启动/连接失败时，系统**不会显式暴露错误**，导致 agent 看起来“正常运行”，但实际上工具集缺失。这类问题对用户信任和排障体验影响很大。

- **[#2960 Proposal: Live Zoom voice agent + K-ai KB integration](https://github.com/qwibitai/nanoclaw/issues/2960)**  
  今日已关闭但仍具代表性，只有 1 条评论，反映出用户对**实时会议语音助手 + 知识库问答 + 会议转录提取行动项**的强需求。这是一个明显的高价值场景。

- **[#2959 Image generation](https://github.com/qwibitai/nanoclaw/issues/2959)**  
  这是较轻量的创意类需求，但也表明用户会把 NanoClaw 当作更通用的 AI 助手入口，而不仅是开发者工具。

### 热点背后的诉求
- **可靠性诉求**：用户希望失败是可见的，而不是“表面成功”。
- **场景扩展诉求**：希望助手进入会议、知识问答、转录总结等高频工作流。
- **通用能力诉求**：部分用户期待图像生成等多模态能力。

相关链接：[#2968](https://github.com/qwibitai/nanoclaw/issues/2968)、[#2960](https://github.com/qwibitai/nanoclaw/issues/2960)、[#2959](https://github.com/qwibitai/nanoclaw/issues/2959)

---

## 4) Bug 与稳定性
按严重程度排序如下：

### 1. 高严重度：MCP server 启动/连接失败静默化
- **[#2968 MCP server spawn/connect failures are silent](https://github.com/qwibitai/nanoclaw/issues/2968)**  
  风险点在于：agent 可能带着**缺失工具**继续运行，并对外表现为成功，属于典型的“静默退化”问题。  
  **当前未看到直接对应的 fix PR**，建议优先处理。

### 2. 中高严重度：provider 错误被标记为 completed
- **[#2966 fix(agent-runner): record provider errors as failed, and mirror failed acks](https://github.com/qwibitai/nanoclaw/pull/2966)**  
  该 PR 直接针对错误状态记录问题：provider 出错后不应被记为 completed，否则会污染任务状态与审计结果。  
  **已有 fix PR**，属于稳定性补丁方向。

### 3. 中严重度：rate limit 事件类型识别不匹配
- **[#2965 fix(agent-runner): match rate_limit_event as a top-level SDK message type](https://github.com/qwibitai/nanoclaw/pull/2965)**  
  说明当前代码与 `@anthropic-ai/claude-agent-sdk` 0.3.x 的消息结构存在偏差，可能导致限流信号处理异常。  
  **已有 fix PR**，属于兼容性修复。

### 额外稳定性增益
- **[#2967 feat: opt-in local audit log](https://github.com/qwibitai/nanoclaw/pull/2967)**  
  虽不是 bug 修复，但会显著提高问题追踪能力，对后续稳定性排查很有帮助。

---

## 5) 功能请求与路线图信号
### 可能进入后续路线图的需求
- **[#2960 Live Zoom voice agent + K-ai KB integration](https://github.com/qwibitai/nanoclaw/issues/2960)**  
  这是一个明显的战略型功能提案：会议实时接入、语音问答、转录抽取行动项，属于高价值场景。如果团队继续扩展“助手进入会议流”的方向，这类能力很可能成为后续版本的重要候选。

- **[#2958 add-teams: Teams-CLI-first credentials flow in SSF directive grammar](https://github.com/qwibitai/nanoclaw/pull/2958)**  
  这说明项目正在把外部协作平台接入做得更“CLI-first”和结构化。若该方向继续推进，说明 NanoClaw 在**多渠道集成**上还有明确路线。

- **[#2959 Image generation](https://github.com/qwibitai/nanoclaw/issues/2959)**  
  属于通用能力需求，但与当前主线（代理、工作流、可观测性）相比优先级可能较低，除非项目明确走多模态助手路线。

### 路线图信号判断
- **更可能优先纳入的**：Teams/会议类集成、审计日志、错误可观测性修复。
- **次优先**：通用图像生成类需求。  
相关链接：[#2960](https://github.com/qwibitai/nanoclaw/issues/2960)、[#2958](https://github.com/qwibitai/nanoclaw/pull/2958)、[#2959](https://github.com/qwibitai/nanoclaw/issues/2959)

---

## 6) 用户反馈摘要
从今日 Issues 中可以提炼出几类真实痛点：

1. **“不要静默失败”**  
   用户在意工具是否真的可用，而不是 agent 是否“自认为成功”。  
   代表条目：[#2968](https://github.com/qwibitai/nanoclaw/issues/2968)

2. **“把助手放进会议里”**  
   用户希望 AI 能实时参与 Zoom 会议，做语音问答、知识库查询、行动项提炼，说明 NanoClaw 被期待成为**工作流内助手**，而不仅是命令行工具。  
   代表条目：[#2960](https://github.com/qwibitai/nanoclaw/issues/2960)

3. **“基础创作也要能做”**  
   图像生成类请求表明，一部分用户把它当作通用 AI 接口来使用，希望低门槛获得创意输出。  
   代表条目：[#2959](https://github.com/qwibitai/nanoclaw/issues/2959)

总体上，用户对项目的期待集中在：**更强的可靠性、更广的场景覆盖、更直观的结果反馈**。

---

## 7) 待处理积压
> 说明：在本次数据里，未看到“长期未响应”的历史积压项；以下为**当前需要优先跟进的未闭环条目**，如果 48 小时内没有推进，建议进入维护者待办。

### 优先级 1：高风险运行时问题
- **[#2968 MCP server spawn/connect failures are silent](https://github.com/qwibitai/nanoclaw/issues/2968)**  
  直接影响工具可用性和错误透明度，应优先确认是否已有补丁或复现方案。

### 优先级 2：正在推进的核心修复
- **[#2966 fix(agent-runner): record provider errors as failed, and mirror failed acks](https://github.com/qwibitai/nanoclaw/pull/2966)**
- **[#2965 fix(agent-runner): match rate_limit_event as a top-level SDK message type](https://github.com/qwibitai/nanoclaw/pull/2965)**  
  这两项都与 agent-runner 稳定性直接相关，建议尽快完成 review/merge。

### 优先级 3：文档与知识债清理
- **[#2963 docs: rewrite architecture.md and agent-runner-details.md to match current code](https://github.com/qwibitai/nanoclaw/pull/2963)**
- **[#2962 docs: sync DB schema and entity docs with migrations 010-018](https://github.com/qwibitai/nanoclaw/pull/2962)**
- **[#2961 docs: fix stale claims across README, CONTRIBUTING, CLAUDE.md and operational docs](https://github.com/qwibitai/nanoclaw/pull/2961)**  
  文档批量对齐虽然风险低，但如果积压过久，会影响新贡献者和使用者理解成本。

---

如果你愿意，我可以继续把这份日报整理成：
1. **更适合内部周报的精简版**，或  
2. **适合发到 Slack / 飞书的消息版**。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报  
**日期：2026-07-07**  
**仓库：nearai/ironclaw**

## 1. 今日速览
今天 IronClaw 仍处于**高活跃、高并行推进**状态：过去 24 小时内有 **33 条 Issue 更新**、**46 条 PR 更新**，说明项目仍在密集迭代。  
从内容看，团队重心主要落在 **Reborn harness / gate-dispatch / 运行时稳定性 / WebUI 重构** 这些基础设施与框架层工作上，而不是面向终端用户的新功能发布。  
整体健康度上，项目的“工程推进能力”很强，但同时暴露出较多 **安全边界、可观测性、错误提示、外部集成失败** 之类的体验与稳定性问题，说明产品已进入“规模化打磨”阶段。  
今天的节奏更像是：**底层在收敛，表层问题也在集中暴露**。

---

## 2. 版本发布
**今日无新版本发布。**  
- 最新 Releases：无  
- 影响：本日更像是“修复/重构/测试覆盖推进日”，尚未进入面向用户的版本交付节奏。

---

## 3. 项目进展
今天最明确可见的已关闭 PR 是：

- **[#5746](https://github.com/nearai/ironclaw/pull/5746)** — `fix(deps): RUSTSEC-2026-0204 crossbeam-epoch bump`
  - 价值：修复 `cargo-deny` 在所有 PR 上都为红的问题，直接恢复 CI 健康。
  - 这类依赖修复虽然不改产品功能，但对**持续集成与合并效率**非常关键。

此外，今天的 PR 结构很清晰：  
- **15 个 PR 已合并/关闭，31 个仍待合并**，约 **33%** 的 PR 更新已经落地。  
- 推进方向集中在三条主线：
  1. **Harness / gate-dispatch 覆盖**：  
     - [#5735](https://github.com/nearai/ironclaw/pull/5735)  
     - [#5743](https://github.com/nearai/ironclaw/pull/5743)  
     - [#5740](https://github.com/nearai/ironclaw/pull/5740)  
     - [#5738](https://github.com/nearai/ironclaw/pull/5738)  
  2. **Reborn 运行时与模型错误处理**：  
     - [#5745](https://github.com/nearai/ironclaw/pull/5745)  
     - [#5742](https://github.com/nearai/ironclaw/pull/5742)  
     - [#5736](https://github.com/nearai/ironclaw/pull/5736)  
     - [#5733](https://github.com/nearai/ironclaw/pull/5733)  
  3. **WebUI v2 现代化迁移**：  
     - [#5730](https://github.com/nearai/ironclaw/pull/5730)  
     - [#5731](https://github.com/nearai/ironclaw/pull/5731)  
     - [#5732](https://github.com/nearai/ironclaw/pull/5732)  
     - [#5729](https://github.com/nearai/ironclaw/pull/5729)  
     - [#5728](https://github.com/nearai/ironclaw/pull/5728)

**项目整体向前迈进的判断：**  
今天不是“功能发布型推进”，而是**把基础设施、测试覆盖、依赖健康、前端技术栈与运行时边界问题一起往前推**。这通常意味着接下来 1-2 个迭代会有更稳的合并窗口。

---

## 4. 社区热点
今天讨论最集中的 Issue 主要围绕 **静默失败、权限边界、集成不可用**：

1. **[#5713](https://github.com/nearai/ironclaw/issues/5713)** — 触发/定时运行失败后没有 Slack 通知  
   - 评论数：3  
   - 诉求：用户希望失败状态能被**显式通知**，而不是“任务已经挂了但没人知道”。  
   - 背后问题：这属于**自动化可观测性缺口**，会直接影响运维和告警闭环。

2. **[#5702](https://github.com/nearai/ironclaw/issues/5702)** — GitHub issue 搜索/创建返回 HTTP 403  
   - 评论数：2  
   - 诉求：GitHub 集成“配置了却不可用”，影响核心工作流。  
   - 背后问题：这是典型的**集成权限/鉴权失败**，对“AI 助手代办事项”场景打击很大。

3. **[#5712](https://github.com/nearai/ironclaw/issues/5712)** — `tool_search` 在受限能力集下泄露完整能力目录  
   - 评论数：1  
   - 诉求：用户/维护者关心**能力可见性是否越权**。  
   - 背后问题：这已经不只是体验问题，而是**安全与策略隔离**问题。

4. **[#5676](https://github.com/nearai/ironclaw/issues/5676)** — `records_for_scope` 的 N+1 读取与 CAS 重读性能问题  
   - 评论数：1  
   - 诉求：底层存储性能。  
   - 背后问题：说明社区/维护者对**运行时尾延迟与存储效率**也非常关注。

**热点结论：**  
今天的讨论焦点并不在“新功能想要什么”，而在“系统为什么会安静地失败、为什么权限会出错、为什么可见性不对”。这说明项目已经进入**成熟系统常见的稳定性与治理问题集中暴露期**。

---

## 5. Bug 与稳定性
按严重程度排序，今日值得优先关注的问题如下：

### P0 / 高优先级

- **[#5702](https://github.com/nearai/ironclaw/issues/5702)** — GitHub issue 搜索和创建能力失败，HTTP 403  
  - 影响：直接阻断 GitHub 集成能力，属于核心功能不可用。  
  - fix PR：**未看到直连修复 PR**。

- **[#5713](https://github.com/nearai/ironclaw/issues/5713)** — Failed 的定时/触发运行不发 Slack 通知  
  - 影响：会造成**静默自动化失败**，风险很高。  
  - fix PR：**未看到直连修复 PR**。

- **[#5712](https://github.com/nearai/ironclaw/issues/5712)** — `tool_search` 泄露未缩窄的完整能力目录  
  - 影响：涉及能力边界与信息泄露，属于安全/隔离风险。  
  - fix PR：**未看到直连修复 PR**。

- **[#5694](https://github.com/nearai/ironclaw/issues/5694)** — `clientActionId()` 在非 HTTPS / insecure origin 下抛错，导致所有 mutating 请求失效  
  - 影响：会让本地/自托管 HTTP 场景下的 v2 写操作整体失效。  
  - fix PR：**未看到直连修复 PR**。

### P1 / 中高优先级

- **[#5741](https://github.com/nearai/ironclaw/issues/5741)** — `builtin.http.save` 因 `OutputTooLarge` 失败，无法保存大响应  
  - 影响：阻断网页抓取/保存类工作流。  
  - fix PR：**未看到直连修复 PR**。

- **[#5739](https://github.com/nearai/ironclaw/issues/5739)** — 上下文预算硬编码为 128K，忽略模型 `context_length`  
  - 影响：大上下文模型性能被浪费，且过早触发 compaction。  
  - fix PR：**未看到直连修复 PR**。

- **[#5703](https://github.com/nearai/ironclaw/issues/5703)** — routine 失败只给通用错误，缺少根因  
  - 影响：降低排障效率。  
  - 相关修复方向：可关注 **[#5745](https://github.com/nearai/ironclaw/pull/5745)**，它在“模型/网络失败不应静默空回合”方向上相关，但**不等同于该 issue 的直连修复**。

- **[#5701](https://github.com/nearai/ironclaw/issues/5701)** — Activity 面板隐藏 tool 细节，且运行中不实时更新  
  - 影响：降低可观测性，影响调试。  
  - fix PR：**未看到直连修复 PR**。

- **[#5708](https://github.com/nearai/ironclaw/issues/5708)** — 错误 banner 脱离 chat stream 显示  
  - 影响：错误上下文和消息流分离，用户感知差。  
  - fix PR：**未看到直连修复 PR**。

### P2 / 体验与一致性问题

- **[#5705](https://github.com/nearai/ironclaw/issues/5705)** — Terminal 图标没有关闭选项  
- **[#5704](https://github.com/nearai/ironclaw/issues/5704)** — 聊天进行中图片预览透明化  
- **[#5706](https://github.com/nearai/ironclaw/issues/5706)** — instance lag 时 sidebar 显示 raw thread ID  
- **[#5698](https://github.com/nearai/ironclaw/issues/5698)** — Tools 设置保存失败未提示  
- **[#5696](https://github.com/nearai/ironclaw/issues/5696)** — Inference 设置暴露了当前不支持的字段

---

## 6. 功能请求与路线图信号
今日出现的“新需求”里，最值得关注的是这些：

- **[#5747](https://github.com/nearai/ironclaw/issues/5747)** — built-in Slack mount 无法 unpair  
  - 这是非常明确的产品能力缺口：**解绑/撤销配对**。  
  - 这类需求通常会优先进入下一轮，因为它关系到账号治理和自助恢复。

- **[#5739](https://github.com/nearai/ironclaw/issues/5739)** — 允许覆盖 context budget，按模型实际窗口配置  
  - 如果后续做模型适配增强，这很可能会被纳入配置层改造。

- **[#5705](https://github.com/nearai/ironclaw/issues/5705)** — Terminal 图标可关闭  
  - 属于典型的可配置 UI 诉求，优先级通常取决于 WebUI 设计路线。

- **[#5696](https://github.com/nearai/ironclaw/issues/5696)** — 隐藏不受支持的 operator config 字段  
  - 更像是“设置页对齐后端能力”的产品清理项，属于高概率进入下一个稳定版本的体验修复。

**路线图信号：**  
从 PR 轨迹看，下一阶段很可能仍以这两条主线为主：  
1. **WebUI v2 现代化迁移**：  
   - [#5730](https://github.com/nearai/ironclaw/pull/5730)  
   - [#5731](https://github.com/nearai/ironclaw/pull/5731)  
   - [#5732](https://github.com/nearai/ironclaw/pull/5732)  
   - [#5729](https://github.com/nearai/ironclaw/pull/5729)  
2. **Harness / coverage / gate dispatch 收敛**：  
   - [#5735](https://github.com/nearai/ironclaw/pull/5735)  
   - [#5743](https://github.com/nearai/ironclaw/pull/5743)  
   - [#5740](https://github.com/nearai/ironclaw/pull/5740)  
   - [#5738](https://github.com/nearai/ironclaw/pull/5738)

这意味着：**下一版本更可能是“架构和稳定性增强版”而非“功能大扩张版”**。

---

## 7. 用户反馈摘要
从今天的 Issues 里，可以提炼出几类非常真实的用户痛点：

1. **“我不知道系统失败了”**  
   - 代表：[#5713](https://github.com/nearai/ironclaw/issues/5713)、[#5703](https://github.com/nearai/ironclaw/issues/5703)、[#5708](https://github.com/nearai/ironclaw/issues/5708)  
   - 场景：定时任务、routine、模型调用失败后，用户得不到足够的根因或通知。  
   - 反馈本质：用户对**可观测性和可诊断性**很敏感。

2. **“我配置了，但它还是不能用”**  
   - 代表：[#5702](https://github.com/nearai/ironclaw/issues/5702)、[#5694](https://github.com/nearai/ironclaw/issues/5694)、[#5698](https://github.com/nearai/ironclaw/issues/5698)  
   - 场景：GitHub 集成、HTTP 自托管、工具权限保存。  
   - 反馈本质：用户最怕的是**配置表面存在、执行层实际失效**。

3. **“UI 不告诉我发生了什么”**  
   - 代表：[#5701](https://github.com/nearai/ironclaw/issues/5701)、[#5706](https://github.com/nearai/ironclaw/issues/5706)、[#5704](https://github.com/nearai/ironclaw/issues/5704)  
   - 场景：工具调用细节被折叠、线程名显示不稳定、图片预览异常。  
   - 反馈本质：用户希望 UI 更贴近运行状态，而不是只给一个抽象结果。

4. **“我需要自主管理和撤销能力”**  
   - 代表：[#5747](https://github.com/nearai/ironclaw/issues/5747)、[#5705](https://github.com/nearai/ironclaw/issues/5705)  
   - 场景：Slack 配对解绑、终端入口开关。  
   - 反馈本质：用户希望 AI 助手在默认开放的同时，保留**可控性和可撤回性**。

整体来看，今天的反馈不是“功能不够多”，而是“**系统应该更透明、更可控、更少静默失败**”。

---

## 8. 待处理积压
在当前数据里，以下未解决项最值得维护者优先盯住：

- **[#5702](https://github.com/nearai/ironclaw/issues/5702)** — GitHub 集成 403，核心能力不可用  
- **[#5713](https://github.com/nearai/ironclaw/issues/5713)** — 自动化失败无通知，风险高  
- **[#5712](https://github.com/nearai/ironclaw/issues/5712)** — 能力目录泄露，安全边界问题  
- **[#5694](https://github.com/nearai/ironclaw/issues/5694)** — HTTP 自托管 mutating 请求整体失效  
- **[#5741](https://github.com/nearai/ironclaw/issues/5741)** — 大响应保存失败  
- **[#5739](https://github.com/nearai/ironclaw/issues/5739)** — 上下文预算不可配置  
- **[#5747](https://github.com/nearai/ironclaw/issues/5747)** — Slack 解绑缺失  
- **[#5703](https://github.com/nearai/ironclaw/issues/5703)** — routine 失败缺少根因信息

另外，PR 侧还有一批**规模较大、跨模块的 stacked 变更**仍在排队合并，尤其是：  
- [#5735](https://github.com/nearai/ironclaw/pull/5735)  
- [#5743](https://github.com/nearai/ironclaw/pull/5743)  
- [#5742](https://github.com/nearai/ironclaw/pull/5742)  
- [#5732](https://github.com/nearai/ironclaw/pull/5732)  
- [#5731](https://github.com/nearai/ironclaw/pull/5731)

**提醒维护者：**  
今天的 backlog 不是单纯“数量多”，而是**问题类型集中在权限、静默失败、可观测性、UI 一致性、配置对齐**。这类问题若不尽快处理，会直接影响用户对平台可靠性的信任。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **更适合 Slack/飞书群发的短版**，或  
2. **带风险分级和优先级建议的管理层版**。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

以下为 **LobsterAI（netease-youdao/LobsterAI）2026-07-07 项目动态日报**。  
基于过去 24 小时 GitHub 数据：**Issues 无更新、PR 共 10 条更新且全部已合并/关闭、无新版本发布**。

---

## 1) 今日速览

今天 LobsterAI 的仓库状态呈现出典型的 **“高开发、低讨论”** 特征：过去 24 小时没有新增或活跃 Issues，但 PR 层面非常活跃，共有 **10 个 PR 完成合并/关闭**，说明功能开发和稳定性修复仍在持续推进。  
从内容看，今日变更主要集中在 **OpenClaw/协作（cowork）能力、MCP/Provider 配置、邮件技能、UI 清理与稳定性修复**，属于“产品能力完善 + 体验打磨 + 关键边界修复”并行推进。  
虽然没有新版本发布，但这些 PR 已为后续发版积累了较多可见增量。  
整体判断：**项目健康度良好，研发推进积极，当前更像是在为下一次正式发布做集中收敛。**

参考：  
- 仓库首页：https://github.com/netease-youdao/LobsterAI  
- 今日 PR 列表（本日报数据来源）：https://github.com/netease-youdao/LobsterAI/pulls

---

## 2) 版本发布

**今日无新版本发布。**  
- Releases 页面无新增内容：https://github.com/netease-youdao/LobsterAI/releases

---

## 3) 项目进展

今日最重要的进展来自 10 个已关闭 PR，覆盖了多个核心模块，整体上推动了以下方向：

### A. 配置与协作体验继续收敛
- **#2284** `chore: settings and cowork cleanup`  
  对设置页、协作页、Cron、Windows Python 启动等做了一轮清理与修复，属于横向收敛型工作，减少历史包袱并提升稳定性。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2284
- **#2283** `chore: optimize skill, mcp, memrory and mail UI`  
  集中优化 Skill、MCP、Memory、Mail 的界面体验，说明产品正在从“能用”向“更易用”推进。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2283

### B. OpenClaw 心跳/成本控制机制更成熟
- **#2280** `feat(openclaw): add heartbeat cost-control policy and legacy file repair`  
  引入心跳成本控制策略，并修复旧版 HEARTBEAT.md 的遗留问题，说明项目开始更明确地约束 Agent 自动调用行为，降低资源浪费。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2280
- **#2278** `feat(openclaw): add heartbeat toggle setting`  
  新增心跳开关设置，并与 Cowork 配置同步，用户可直接控制 Agent 是否启用 heartbeat，提升可控性。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2278

### C. Provider / MCP 配置能力增强，减少“脏配置”
- **#2276** `feat(providers): add xAI (Grok) OAuth login support`  
  新增 xAI/Grok OAuth 登录，说明模型/提供方接入能力继续扩展。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2276
- **#2277** `fix(mcp): clear stale transport config`  
  解决 MCP 传输切换后残留 headers/env/args 的问题，属于重要的配置一致性修复。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2277
- **#2279** `fix(plugins): hide bundled xai plugin from sync`  
  隐藏内置 xAI provider 插件，避免被同步到用户插件列表，减少误操作和冗余暴露。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2279

### D. 邮件技能与账号管理更适合真实使用场景
- **#2275** `Liuzhq/optimize email`  
  为内置 `imap-smtp-email` skill 增加多账号支持、账号管理、连通性测试等能力，明显提升真实办公场景可用性。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2275

### E. 稳定性修复覆盖关键边界
- **#2281** `fix(cowork): prevent stale final sync from restarting context maintenance…`  
  修复聊天错误后空 final history sync 导致会话状态回退的问题，并增加回归测试，属于高价值稳定性补丁。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2281

### F. 额外说明
- **#2282** `Pr 2256`  
  从摘要看像是占位/补提 PR，具体技术信息不足，但已完成关闭。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2282

### 今日推进总结
今日代码变更并非单点修补，而是围绕 **Agent 控制、模型/Provider 接入、MCP 配置清理、邮件技能增强、UI 可用性改善** 的系统性推进。  
若按影响面估算，今天的 PR 已经覆盖了 LobsterAI 中 **“使用入口”与“运行稳定性”** 两条主线，属于对下一阶段发版非常关键的积累。

---

## 4) 社区热点

**今日没有明显的社区讨论热点。**  
原因如下：
- 过去 24 小时 **Issues 更新为 0**；
- 相关 PR 的评论数、反应数在当前数据中均未显示为活跃值（多为 `0/undefined`）；
- 因此无法从数据上识别“评论最多”或“反应最多”的单个话题。

### 可观察到的潜在关注方向
尽管没有评论热度，但从 PR 主题可以推断社区/维护者关注点主要集中在：
1. **MCP/Provider 配置可靠性**：避免用户修改配置后残留旧参数；
2. **OpenClaw 心跳与成本控制**：降低自动化 Agent 的无效调用；
3. **邮件技能多账号支持**：满足真实办公和多账户场景；
4. **xAI/Grok 接入**：模型生态扩展。

相关链接：  
- PR 列表：https://github.com/netease-youdao/LobsterAI/pulls  
- Issues 列表：https://github.com/netease-youdao/LobsterAI/issues

---

## 5) Bug 与稳定性

今日没有新增 Issues，因此**没有来自 Issues 的新 Bug 报告**。  
但从已关闭 PR 中可以识别出多个稳定性修复点，按潜在严重程度排序如下：

### 1. 高优先级：协作会话状态回退问题
- **PR #2281**：修复 stale final sync 导致 context maintenance 重启的问题  
  **影响**：聊天错误后的恢复逻辑可能把已失败会话错误地带回上下文维护状态，属于影响会话状态机一致性的关键问题。  
  **状态**：已有 fix PR。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2281

### 2. 高优先级：MCP 配置残留导致行为异常
- **PR #2277**：清理切换 transport 后残留的 headers/env/args  
  **影响**：用户切换 MCP 连接方式时，旧配置可能干扰新连接，导致调试困难或服务异常。  
  **状态**：已有 fix PR。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2277

### 3. 中优先级：Windows 上 Python 进程窗口问题
- **PR #2284** 中包含 `fix(python): hide console window when spawning python on Windows`  
  **影响**：提升 Windows 用户体验，避免命令窗口闪烁/干扰。  
  **状态**：已有 fix PR。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2284

### 4. 中优先级：历史 HEARTBEAT 文件导致不必要模型调用
- **PR #2280**：legacy HEARTBEAT.md 修复  
  **影响**：旧文件可能引发周期性模型调用，造成额外成本和行为偏差。  
  **状态**：已有 fix PR。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2280

### 5. 中优先级：插件同步暴露内置 xAI 插件
- **PR #2279**：隐藏 bundled xai plugin from sync  
  **影响**：减少用户侧插件同步中的噪音与误配置概率。  
  **状态**：已有 fix PR。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2279

---

## 6) 功能请求与路线图信号

今天的 PR 中包含多个明显的“路线图信号”，可视作未来版本大概率会继续强化的方向：

### 1. 多模型/多 Provider 接入将持续增强
- **PR #2276**：新增 xAI/Grok OAuth 登录  
  这表明项目在继续扩展模型供应商接入层，未来很可能继续加入更多 provider 或完善统一鉴权体验。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2276

### 2. Agent 行为控制将更精细
- **PR #2278**：heartbeat toggle setting  
- **PR #2280**：heartbeat cost-control policy  
  说明项目正在从“默认自动化”转向“可配置、可审计、可控成本”的 Agent 运行模式。  
  这类能力通常会进入下一版本重点。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2278  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2280

### 3. MCP 配置与连接体验仍是重点方向
- **PR #2277**：清理 stale transport config  
  MCP 相关配置的正确性、可维护性、表单行为一致性，显然仍处于持续优化阶段。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2277

### 4. 真实办公场景能力在加速补齐
- **PR #2275**：邮件多账号管理  
  这是非常明确的用户场景导向需求，说明项目正在强化“个人 AI 助手”在工作流中的实用性。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2275

### 5. UI/设置页会继续被打磨
- **PR #2284、#2283** 都指向界面与设置结构优化  
  这通常意味着下一轮版本可能继续围绕“可发现性”“设置分组”“减少学习成本”做调整。  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2284  
  链接：https://github.com/netease-youdao/LobsterAI/pull/2283

---

## 7) 用户反馈摘要

**当前没有 Issues 评论数据，因此无法从评论中提炼直接的用户原声反馈。**  
不过结合今日 PR 内容，可以较为可靠地推断出用户真实痛点与使用场景：

### 真实痛点推断
1. **用户希望“少出错、少残留”**
   - MCP 切换后残留参数、协作状态回退等问题，说明用户对配置正确性和状态一致性非常敏感。
   - 对应 PR：#2277、#2281  
   链接：https://github.com/netease-youdao/LobsterAI/pull/2277  
   链接：https://github.com/netease-youdao/LobsterAI/pull/2281

2. **用户希望 Agent 行为可控、成本可控**
   - heartbeat 的开关和成本策略表明，用户并不希望 AI 持续“自作主张”地产生调用。  
   - 对应 PR：#2278、#2280  
   链接：https://github.com/netease-youdao/LobsterAI/pull/2278  
   链接：https://github.com/netease-youdao/LobsterAI/pull/2280

3. **用户在真实工作场景中使用邮件、MCP、Provider 管理**
   - 多账号邮件支持、Provider OAuth 登录、MCP 管理优化，都是偏生产力落地的诉求。  
   - 对应 PR：#2275、#2276、#2277  
   链接：https://github.com/netease-youdao/LobsterAI/pull/2275  
   链接：https://github.com/netease-youdao/LobsterAI/pull/2276  
   链接：https://github.com/netease-youdao/LobsterAI/pull/2277

### 满意/不满意倾向
- **满意点**：功能覆盖在加速扩展，且可见对边界问题有持续修复。
- **不满意点**：如果没有稳定的配置收敛和 UI 简化，用户可能仍会觉得“可用但偏复杂”。今日大量 UI 与配置清理，恰好回应这一点。

---

## 8) 待处理积压

基于当前数据，**没有明显长期未响应的活跃 Issue 或 PR**：
- 今日 Issues 为 0；
- 今日 PR 均已关闭/合并；
- 未见挂起的高热度讨论项。

### 但维护者仍应持续关注的“潜在积压方向”
1. **协作状态机与会话恢复逻辑**
   - 虽然 #2281 已修，但这类问题通常容易在边界条件下复现，建议持续观察回归。  
   链接：https://github.com/netease-youdao/LobsterAI/pull/2281

2. **MCP 配置与 UI 同步一致性**
   - #2277 解决的是当前残留问题，但 MCP 表单、同步、远端配置之间的状态一致性仍值得继续测试。  
   链接：https://github.com/netease-youdao/LobsterAI/pull/2277

3. **Heartbeat 相关策略是否需要文档补充**
   - #2278、#2280 已落地，但用户对“为什么默认开/关”“成本如何控制”可能还需要更清晰的说明。  
   链接：https://github.com/netease-youdao/LobsterAI/pull/2278  
   链接：https://github.com/netease-youdao/LobsterAI/pull/2280

4. **邮件多账号能力的边界验证**
   - #2275 解决的是功能能力，但多账号、默认账号、兼容旧环境变量等场景通常还会带来二次反馈。  
   链接：https://github.com/netease-youdao/LobsterAI/pull/2275

---

## 综合判断

今天 LobsterAI 没有发版、没有 Issues 活跃，但 **PR 交付密度较高**，且覆盖了**Agent 控制、Provider 接入、MCP 稳定性、邮件技能、UI 清理**等关键模块。  
从项目健康度看，这是一个 **“研发推进稳定、用户反馈面暂时平静、正在为下一版做收敛”** 的状态。  
如果接下来 1-3 天继续保持这种节奏，并补充一次 Release，项目的可见度和用户体验都会进一步提升。

如需，我也可以把这份日报进一步整理成：
- **更适合公众号/周报的简版**
- **适合内部研发例会的表格版**
- **带“风险评级”和“下周建议”的管理层版**

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

# CoPaw（agentscope-ai/QwenPaw）项目动态日报  
**日期：2026-07-07**  
**数据窗口：过去 24 小时**

## 1) 今日速览
过去 24 小时内，项目处于明显的“**发布后快速修复 + 回归加固**”节奏：共出现 **3 条 Issue 更新、22 条 PR 更新、1 个新版本发布**。整体活跃度偏高，且研发重心非常集中在 **兼容性修复、运行时稳定性、桌面端能力补齐、测试覆盖** 等基础质量工作上。  
从状态上看，项目当前不是单纯冲功能，而是在快速收敛近期回归问题，属于**健康但高强度迭代**阶段。  
GitHub：<https://github.com/agentscope-ai/QwenPaw>

---

## 2) 版本发布
### v1.1.12.post3
发布页：<https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.12.post3>  
对应发布治理 Issue：<https://github.com/agentscope-ai/QwenPaw/issues/5819>  
对应修复 PR：<https://github.com/agentscope-ai/QwenPaw/pull/5818>

**本次发布核心内容：**
- **修复 1.x 线兼容性问题**
- 通过 **Pin ACP 版本**，规避 ACP 新版本引入的破坏性变更
- 目标是恢复历史 **1.x 版本 QwenPaw / CoPaw** 的可用性

**破坏性变更 / 风险点：**
- 本质上是一次“**依赖约束收紧**”的修复型发布  
- 对于依赖较新的 `agent-client-protocol`（ACP）的用户，可能需要接受版本回退或固定版本区间
- 如果用户环境已经升级到不兼容的 ACP 新版本，`qwenpaw app` 可能出现导入失败

**迁移注意事项：**
- 建议将 ACP 版本控制在本次发布指定区间内
- 1.x 用户优先升级到 **v1.1.12.post3**，不要直接手动放开 ACP 约束
- 若是桌面端 / 打包环境，需同步检查 PyInstaller、wheel 依赖是否与新约束一致

---

## 3) 项目进展
过去 24 小时内，项目的“前进”主要体现在两类动作：**已闭环的修复** 和 **正在推进的质量建设**。

### 已关闭/合并的代表性 PR
> 官方统计显示已合并/关闭 8 条；以下为可见的关键项。

- **依赖兼容性修复与版本发布**  
  PR：<https://github.com/agentscope-ai/QwenPaw/pull/5818>  
  将 ACP 版本锁定，解决 1.x 历史版本失效问题，并完成 **v1.1.12.post3** 发布准备。

- **OpenRouter OAuth 路由恢复**  
  PR：<https://github.com/agentscope-ai/QwenPaw/pull/5806>  
  恢复 Runtime 2.0 迁移中意外丢失的 provider OAuth 路由，减少第三方接入中断风险。

- **Yuanbao 连接失败修复**  
  PR：<https://github.com/agentscope-ai/QwenPaw/pull/5804>  
  修补空 `api_domain` 与缺失 proto descriptors 引发的问题，提升连接与打包稳定性。

- **运行时 memory 相关回归修复**  
  PR：<https://github.com/agentscope-ai/QwenPaw/pull/5803>  
  清理 `_process_memory_section` 的过时参数，减少 pre-commit / 构建链回归。

- **请求路径前缀修复**  
  PR：<https://github.com/agentscope-ai/QwenPaw/pull/5802>  
  修正 `/api` 双前缀导致的 404，同时修复 timestamp 常显问题。

- **桌面诊断能力增强**  
  PR：<https://github.com/agentscope-ai/QwenPaw/pull/5800>  
  为桌面端加入诊断/系统信息能力，方便定位性能与运行环境问题。

### 对项目整体推进的判断
- 从公开可见记录看，至少有 **7 个代表性闭环 PR** 涉及关键稳定性路径
- 当前主线不是“新增大功能”，而是围绕 **运行时、provider、桌面端、打包、兼容性** 做底座加固
- 这意味着项目正在把近期积累的风险点一项项收口，属于**向稳定版演进**的积极信号

---

## 4) 社区热点
### 讨论最活跃的 Issue
1. **#5816 [bug] ImportError: cannot import name `SetSessionModelResponse` from `acp`**  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/5816>  
   评论数：2  
   这是今日最明确的高关注故障，直接影响安装后启动，属于“阻断型问题”。

2. **#5821 [enhancement] Granular rejects_media capability**  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/5821>  
   评论数：1  
   诉求很清晰：希望把媒体拒绝能力从“全局一刀切”改成“按媒体类型粒度控制”，反映出用户在多模态场景下对可用性保留的强需求。

3. **#5819 [release-duty] 安装验证**  
   链接：<https://github.com/agentscope-ai/QwenPaw/issues/5819>  
   评论数：0  
   虽然没评论，但它是发布后的质量门禁，说明维护者对新版本上线非常谨慎。

### PR 热点观察
PR 侧未提供统一评论数，无法严格按评论排序；但从更新活跃度看，热点集中在：
- **#5822** 修复上下文阈值与 active provider 匹配问题  
  <https://github.com/agentscope-ai/QwenPaw/pull/5822>
- **#5820** token 估算与 embedding 配置增强  
  <https://github.com/agentscope-ai/QwenPaw/pull/5820>
- **#5815** auto-memory 重构  
  <https://github.com/agentscope-ai/QwenPaw/pull/5815>
- **#5814** ACP desktop 打包 Node runtime  
  <https://github.com/agentscope-ai/QwenPaw/pull/5814>

**背后诉求：**
- 用户希望**更少的环境依赖问题**
- 多模态与记忆系统希望**更精细、更可控**
- 桌面端希望**更易部署、更可诊断**

---

## 5) Bug 与稳定性
按影响面和严重程度排序：

### 1. 启动级兼容性故障：ACP 导入失败
- Issue：<https://github.com/agentscope-ai/QwenPaw/issues/5816>  
- 修复 PR：<https://github.com/agentscope-ai/QwenPaw/pull/5818>  
- 影响：安装后执行 `qwenpaw app` 即可能崩溃，属于**最高优先级阻断问题**
- 状态：**已有 fix PR，并已随 v1.1.12.post3 处理**

### 2. 第三方接入中断：OpenRouter OAuth 路由缺失
- 修复 PR：<https://github.com/agentscope-ai/QwenPaw/pull/5806>  
- 影响：Runtime 2.0 迁移后，OpenRouter OAuth 相关端点不可用
- 状态：**已修复**

### 3. 连接失败：Yuanbao 空域名 / proto 描述缺失
- 修复 PR：<https://github.com/agentscope-ai/QwenPaw/pull/5804>  
- 影响：请求连接失败、WebSocket AuthBind 编码异常、打包环境不稳定
- 状态：**已修复**

### 4. 构建/回归问题：memory section 参数不一致
- 修复 PR：<https://github.com/agentscope-ai/QwenPaw/pull/5803>  
- 影响：pre-commit / 构建链报错，属于典型回归
- 状态：**已修复**

### 5. API 路径错误：双 `/api` 前缀导致 404
- 修复 PR：<https://github.com/agentscope-ai/QwenPaw/pull/5802>  
- 影响：接口请求失败，表现为功能不可达
- 状态：**已修复**

**稳定性结论：**  
今日暴露的问题类型主要是 **依赖兼容、路由回归、路径拼接、打包缺失**。好消息是，这些问题大多已有对应修复，说明项目的响应速度和问题闭环能力较强。

---

## 6) 功能请求与路线图信号
### 今日新功能需求
- **#5821 Granular rejects_media capability**  
  <https://github.com/agentscope-ai/QwenPaw/issues/5821>  
  这是一个较明确的产品诉求：希望“失败不拖累全部”，体现出用户对**多模态降级策略**的精细化需求。

### 从 PR 看出的路线图信号
更可能进入下一版本或近期版本的方向包括：

1. **Memory / Context 管理增强**
   - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5820>
   - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5815>
   - 信号：自动记忆、token 估算、上下文阈值等能力正在系统化，说明记忆模块是短期重点。

2. **Provider / Runtime 稳定性修复继续优先**
   - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5822>
   - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5806>
   - 信号：多 provider 场景下的兼容与回归治理仍是主线。

3. **桌面端可部署性增强**
   - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5814>
   - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5800>
   - 信号：桌面端正在补齐“开箱即用”和“问题可观测”能力。

4. **生态接入扩展**
   - PR：<https://github.com/agentscope-ai/QwenPaw/pull/5801>
   - 信号：如 Zalo Bot 这类渠道扩展，说明项目仍在向更多消息生态延伸。

**判断：**  
若按当前 PR 走势，**memory / context 相关增强**、**provider 稳定性修复**、**桌面端打包与诊断** 最可能优先进入下一版本。

---

## 7) 用户反馈摘要
从 Issues 与修复动机里能提炼出几类真实用户痛点：

### 1. “能不能先别崩，先能跑起来”
- 典型反馈：`ImportError` 导致启动失败  
- 链接：<https://github.com/agentscope-ai/QwenPaw/issues/5816>  
- 说明：用户对依赖兼容非常敏感，任何底层协议变更都可能直接影响使用。

### 2. “别一失败就全禁用，我只想禁掉出问题的媒体类型”
- 典型反馈：`rejects_media` 想要按媒体类型粒度控制  
- 链接：<https://github.com/agentscope-ai/QwenPaw/issues/5821>  
- 说明：用户已开始在多模态场景下使用，且希望系统具备**更柔性的降级策略**。

### 3. “安装和打包别再把环境依赖甩给用户”
- 典型反馈：桌面端希望自带 Node runtime、补齐诊断能力  
- 链接：<https://github.com/agentscope-ai/QwenPaw/pull/5814>  
- 说明：用户希望减少本地环境配置成本，追求**开箱即用**。

### 4. “记忆和上下文要更聪明，但也要可控”
- 典型反馈：token 估算、auto-memory 重构、上下文阈值修复  
- 链接：<https://github.com/agentscope-ai/QwenPaw/pull/5820>  
- 说明：用户开始面对更复杂的对话/记忆场景，对成本和行为可解释性要求更高。

**总体用户情绪：**
- 对新能力有期待
- 但对**兼容性、稳定性、部署成本**的容忍度很低
- 当前最核心的满意点是：**问题响应快、修复链路清晰**

---

## 8) 待处理积压
> 说明：当前可见数据仅覆盖过去 24 小时，**无法严格判断“长期未响应”**；以下按“重要且仍待处理”筛选，供维护者优先关注。

### 高优先级待合并 PR
1. **#5822 fix(console): match active provider for context threshold**  
   <https://github.com/agentscope-ai/QwenPaw/pull/5822>  
   影响上下文阈值显示与 provider 选择准确性，属于用户可感知问题。

2. **#5820 feat(memory): add token estimation and enhance embedding configuration**  
   <https://github.com/agentscope-ai/QwenPaw/pull/5820>  
   与记忆系统优化直接相关，可能影响下一轮版本体验。

3. **#5815 refactor(memory): simplify auto-memory search state and context handling**  
   <https://github.com/agentscope-ai/QwenPaw/pull/5815>  
   涉及 memory 状态重构，建议重点把关回归风险。

4. **#5814 [codex] Bundle Node runtime for ACP desktop**  
   <https://github.com/agentscope-ai/QwenPaw/pull/5814>  
   对桌面端可安装性与易用性影响较大。

5. **#5801 [first-time-contributor] feat(channels): add Zalo Bot channel**  
   <https://github.com/agentscope-ai/QwenPaw/pull/5801>  
   这是明显的生态扩展型 PR，值得评估是否纳入路线图。

### 高关注 Issue
- **#5821 Granular rejects_media capability**  
  <https://github.com/agentscope-ai/QwenPaw/issues/5821>  
  这是一个具备产品意义的功能诉求，建议尽早给出设计结论。

---

### 一句话结论
**CoPaw 今日呈现“高频修复、快速闭环、稳定性优先”的健康状态；短期最值得关注的是 ACP 兼容修复后的版本验证，以及 memory / provider / desktop 三条主线是否能顺利进入下一版本。**

如果你愿意，我可以继续把这份日报整理成：
1. **适合发群/邮件的精简版**，或  
2. **带趋势判断的周报模板**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下是 **ZeroClaw（2026-07-07）项目动态日报**。  
**仓库链接：** https://github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

过去 24 小时，ZeroClaw 共有 **9 条 Issue 更新**、**22 条 PR 更新**，但 **没有任何 Release 发布**。整体来看，项目处于一个**高活跃、强迭代、但尚未进入版本收敛**的阶段：讨论重点集中在 **CI 门禁、测试覆盖、ZeroCode 体验、runtime 稳定性和配置可见性**。  
从数据上看，今日新增/活跃内容全部处于开启状态，说明社区和维护者都在持续推进问题定位与修复方案，但**尚未出现合并落地**，短期健康度更依赖 review 与修复上线速度。  
总体判断：**活跃度高，工程化方向明确，但稳定性与回归风险仍是当前主线。**

---

## 2. 版本发布

**今日无新版本发布。**  
Release 列表为空，暂无可供总结的版本更新或迁移说明。  
Release 页面：<https://github.com/zeroclaw-labs/zeroclaw/releases>

---

## 3. 项目进展

> 今日没有已合并/关闭的 PR，因此以下为“正在推进中的关键改动”，它们代表项目今天实际向前迈进的方向。

- **CI 门禁修复正在推进：**  
  PR **#8776** 试图让本地 Rust quality gate 变成 workspace-aware，对应 Issue **#8753** 中“member-crate 测试目标未覆盖，坏代码可能放行到 master”的高优先级问题。  
  链接：Issue <https://github.com/zeroclaw-labs/zeroclaw/issues/8753> ｜ PR <https://github.com/zeroclaw-labs/zeroclaw/pull/8776>

- **ZeroCode 配置可发现性在补齐：**  
  PR **#8768** 将 root `[channels]` 设置暴露到 ZeroCode 的配置入口，直接对齐 Issue **#8757**，有助于解决“看不到 show_tool_calls 等根级配置”的问题。  
  链接：Issue <https://github.com/zeroclaw-labs/zeroclaw/issues/8757> ｜ PR <https://github.com/zeroclaw-labs/zeroclaw/pull/8768>

- **ZeroCode 视觉与交互稳定性修复：**  
  PR **#8767** 修复 queue/sidebar 和 session picker 的背景渲染问题，对应 Issue **#8765**。  
  链接：Issue <https://github.com/zeroclaw-labs/zeroclaw/issues/8765> ｜ PR <https://github.com/zeroclaw-labs/zeroclaw/pull/8767>

- **ZeroCode 输出一致性增强：**  
  PR **#8779** 增加在没有流式文本时回退使用 daemon 的最终文本，改善“最终内容丢失”的情况。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8779>

- **安全与依赖治理继续清理：**  
  PR **#8781** 删除已经不在依赖树中的 stale advisory ignores，有助于恢复 security gate 的准确性。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8781>

- **长期结构性改动也在继续：**  
  PR **#8754** 推进 schema V4 的 breaking cut，属于配置体系重构的基础工程。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8754>

**阶段性判断：**  
今天的推进并不是“功能大版本发布”，而是围绕 **CI/测试、配置、TUI、runtime、security** 五条线同步补强。若这些 PR 逐步合并，项目会在**可维护性和稳定性**上明显前进一大步。

---

## 4. 社区热点

> 公开数据中，Issue 有明确评论数；PR 的评论数未提供，因此热度判断主要依据 Issue 讨论量与主题重要性。

### 热点 1：CI 门禁缺陷，讨论最集中
- **Issue #8753**：`rust_quality_gate.sh` 漏掉 member-crate 测试，可能让坏代码进入 master  
  评论：**3**（本日报里最高）  
  这类问题直接影响主干质量，是典型的“高优先级工程化风险”。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8753>

### 热点 2：实时语音双向通道的产品化方向
- **Issue #8780**：实时 speech-to-speech channel（Gemini Live）  
  虽然当前无评论，但这是非常明确的路线图信号：希望模型成为“会话大脑”，ZeroClaw 提供工具、权限和跨通道记忆。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8780>

### 热点 3：首轮使用与配置路径的“可用性焦虑”
- **Issue #8766**：首轮 setup 的 E2E 覆盖  
- **Issue #8757**：ZeroCode 配置隐藏 root channel settings  
  这两条合起来说明用户对“首次上手”和“配置可见性”很敏感。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8766> ｜ <https://github.com/zeroclaw-labs/zeroclaw/issues/8757>

### 说明
- **PR 公开评论数未给出**，因此无法客观比较“哪条 PR 最热”。  
- 当前最活跃讨论的明确焦点仍是 **#8753**。

---

## 5. Bug 与稳定性

以下按严重程度从高到低整理，并标注是否已有对应 fix PR。

### P1 / High risk

- **#8753** `chore(ci): rust_quality_gate.sh misses member-crate test targets`  
  问题：CI gate 没有覆盖 member-crate 测试，可能让未编译通过的代码进入主干。  
  影响：**release gate 风险高**，属于“质量门漏检”。  
  **已有 fix PR：#8776**  
  链接：Issue <https://github.com/zeroclaw-labs/zeroclaw/issues/8753> ｜ PR <https://github.com/zeroclaw-labs/zeroclaw/pull/8776>

### P2 / 中等风险

- **#8762** Anthropic provider 长 turn 使用固定总超时，约 120 秒后失败  
  问题：长文档综合、长推理任务容易被无差别超时切断。  
  影响：**会话连续性差**，对长任务用户非常不友好。  
  **fix PR：未见明确对应 PR**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8762>

- **#8760** daemon-owned agent output 进入 daemon stdout  
  问题：模型输出和 daemon 输出边界混淆。  
  影响：**日志/交互污染**，可能影响 Zerocode 和工具链消费。  
  **fix PR：未见明确对应 PR**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8760>

- **#8758** agent 在 context exhaustion 后变 idle，但没有终态说明  
  问题：长任务在上下文压力下中止，却未向用户给出明确终止原因。  
  影响：**可观测性差、用户难排障**。  
  **fix PR：未见明确对应 PR**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8758>

- **#8765** ZeroCode queue/session picker overlay 继承 terminal background  
  问题：深色主题下 UI 局部背景不一致。  
  影响：**体验降级**，但不影响核心功能。  
  **已有 fix PR：#8767**  
  链接：Issue <https://github.com/zeroclaw-labs/zeroclaw/issues/8765> ｜ PR <https://github.com/zeroclaw-labs/zeroclaw/pull/8767>

- **#8757** ZeroCode config 隐藏 root channel settings（如 show_tool_calls）  
  问题：配置项不可发现。  
  影响：**配置能力被“藏起来”**，增加误用和支持成本。  
  **已有 fix PR：#8768**  
  链接：Issue <https://github.com/zeroclaw-labs/zeroclaw/issues/8757> ｜ PR <https://github.com/zeroclaw-labs/zeroclaw/pull/8768>

### 稳定性补充

- **#8766** 首轮 setup 的 E2E 覆盖不是 bug 本身，但它是在为“首跑稳定性”补测试。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8766>

---

## 6. 功能请求与路线图信号

以下是今天较明确的功能/路线图信号，按“对下一版本的纳入概率”与“战略价值”综合判断：

### 高战略价值

- **#8780** 实时 speech-to-speech channel（Gemini Live）  
  这是最明确的前沿能力请求：模型主导 turn-taking、barge-in、function-calling，ZeroClaw 只提供工具与记忆层。  
  若推进成功，会明显增强产品在 **实时多模态助手** 方向的定位。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8780>

### 中高优先级、较可能纳入近期版本

- **#8763** 展示 subagent activity 和可展开的 tool results  
  反映用户希望提升“长对话/多代理”场景下的可解释性。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8763>

- **#8752** 将 memory / RAG spans 嵌套到 turn trace 下  
  偏 observability，但对调试大模型工作流很重要。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8752>

### 近期更可能落地的路线图信号

从当前 PR 走势看，以下方向更像“下一版本的确定性内容”：
- **ZeroCode 配置与可见性**：#8768、#8757  
- **ZeroCode 交互细节修复**：#8767、#8777、#8759、#8779  
- **CI / 测试门禁**：#8776、#8756、#8775  
- **runtime / provider 稳定性**：#8769、#8771、#8764、#8761  
- **schema / config 重构**：#8754

链接示例：  
- PR <https://github.com/zeroclaw-labs/zeroclaw/pull/8768>  
- PR <https://github.com/zeroclaw-labs/zeroclaw/pull/8776>  
- PR <https://github.com/zeroclaw-labs/zeroclaw/pull/8779>  
- PR <https://github.com/zeroclaw-labs/zeroclaw/pull/8754>

---

## 7. 用户反馈摘要

从 Issue 文本中可以提炼出几个非常真实的用户痛点：

- **“看起来能跑，实际上没跑通” 的首轮配置焦虑**  
  用户担心 first-run / quickstart 生成的配置“表面正确、实际不可用”。  
  代表 Issue：#8766  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8766>

- **长任务易被硬超时打断**  
  在 Anthropic 长文档处理场景中，用户希望系统“继续工作，而不是在 120 秒左右直接失败”。  
  代表 Issue：#8762  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8762>

- **配置入口不透明，影响可控性**  
  用户在 ZeroCode 里找不到 root channel 设置，说明配置层次设计对实际使用并不友好。  
  代表 Issue：#8757  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8757>

- **TUI 细节和终端兼容性仍有摩擦**  
  包括 overlay 背景异常、截图粘贴偶发丢附件、代码块复制带 markdown fence。  
  代表 Issue/PR：#8765、#8759、#8777  
  链接：  
  <https://github.com/zeroclaw-labs/zeroclaw/issues/8765>  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8759>  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8777>

- **用户希望更清楚地知道 agent 为什么停住了**  
  “idle 但无终态原因”会严重削弱信任感。  
  代表 Issue：#8758  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8758>

- **用户希望看见子代理与工具执行细节**  
  这说明在复杂任务中，透明度比“只看最终答案”更重要。  
  代表 Issue：#8763  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8763>

**总体反馈画像：**  
用户并非在抱怨“没有功能”，而是在抱怨 **稳定性、可解释性、可发现性和终端场景兼容性**。这通常意味着产品已经进入“可用但需要打磨”的阶段。

---

## 8. 待处理积压

严格来说，今天新增的大多数 Issue/PR 都是 **昨天才创建**，还不能算“长期积压”；但从维护优先级看，以下事项需要尽快盯住：

### 高优先级未闭环 Issue
- **#8753** CI 门禁漏测，高风险，且已有直接修复 PR  
  链接：Issue <https://github.com/zeroclaw-labs/zeroclaw/issues/8753> ｜ PR <https://github.com/zeroclaw-labs/zeroclaw/pull/8776>

- **#8762** 长任务超时问题，影响真实生产使用  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8762>

- **#8760** daemon stdout 污染，可能引发日志/交互问题  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8760>

- **#8758** context exhaustion 后无终态说明，影响可观测性  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8758>

- **#8780** 实时语音通道，战略方向明确但需要评估范围  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8780>

### 需要 review 消化的 PR backlog
今日共有 **22 个 PR 待处理**，其中多个已经直接对应高价值问题或关键稳定性修复：
- **#8781** 安全审计忽略清理  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8781>
- **#8776** workspace-aware CI gates  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8776>
- **#8768** 暴露 root channel 设置  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8768>
- **#8767** overlay 背景修复  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8767>
- **#8764** Telegram token 保留修复  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8764>
- **#8754** schema V4 切换  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/8754>

**提醒：**  
虽然这些还不是“长期沉积”的积压，但从健康度看，**review 速度**会直接决定 ZeroClaw 能否把今天的高活跃转化为真正的质量提升。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合飞书/Notion 的简洁版**  
2. **适合管理层汇报的 1 页摘要版**  
3. **带“风险等级/优先级矩阵”的分析版**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*