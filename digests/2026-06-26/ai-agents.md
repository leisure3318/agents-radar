# OpenClaw 生态日报 2026-06-26

> Issues: 7 | PRs: 25 | 覆盖项目: 13 个 | 生成时间: 2026-06-26 01:38 UTC

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

# OpenClaw 项目动态日报（2026-06-26）

## 1) 今日速览
今日 OpenClaw 处于**高活跃、偏修复导向**的推进状态：过去 24 小时共更新 **7 条 Issues**、**25 条 PR**，但**没有新版本发布**，说明当前仍以补丁迭代和合并前审阅为主。  
从内容上看，讨论焦点集中在**稳定性、兼容性、安全边界**与**agent 交互正确性**，而不是大规模新功能发布。  
今日有 **4 个 PR 关闭/合入**，虽然数量不算多，但覆盖了配置回归、工具调用兼容、编辑正确性、消息交互一致性等关键面，属于“基础质量修复”型进展。  
整体判断：项目健康度较好，开发活跃度高，但**待审 PR 队列较长（21 个）**，且不少条目带有 P1/P2 或安全边界标签，后续维护压力不小。

---

## 2) 版本发布
**今日无新版本发布**，Release 列表为空。  
链接：<https://github.com/openclaw/openclaw/releases>

---

## 3) 项目进展
今日最重要的推进来自 4 个已关闭/合入 PR，主要提升了**兼容性、正确性与一致性**：

- **修复 agent 对 bootstrap 配置路径的误判，恢复可配置性**  
  PR #96884 纠正了 `agents.defaults.bootstrapMaxChars` / `bootstrapTotalMaxChars` 被错误视为受保护路径的问题，避免了配置回归。  
  链接：<https://github.com/openclaw/openclaw/pull/96884>

- **修复 OpenAI 兼容工具调用参数双重字符串化**  
  PR #96717 解决了 tool call arguments 在回传时被 double-stringifying 的问题，增强了对 OpenAI-compatible provider 的协议兼容性。  
  链接：<https://github.com/openclaw/openclaw/pull/96717>

- **限制 fuzzy edit 归一化范围，防止误改无关内容**  
  PR #96814 针对 P0 问题 #89994，修复 fuzzy matching 时“整文件归一化”导致的意外文本变更，是今天最关键的正确性修复之一。  
  链接：<https://github.com/openclaw/openclaw/pull/96814>

- **修复 Signal structured delivery 下的 approval reaction 一致性**  
  PR #96880 统一了 Signal 反应控制在不同投递路径中的注册行为，减少消息分发路径差异带来的不一致。  
  链接：<https://github.com/openclaw/openclaw/pull/96880>

**阶段性判断**：今天的合入更像是在把 OpenClaw 的“底层稳定性”补齐，推动项目从“能跑”向“可长期可靠运行”迈进。  
今日推进的重点不是新增能力，而是**减少 silent failure、兼容性破坏和消息/编辑状态错乱**。

---

## 4) 社区热点
今日最活跃的讨论集中在以下 Issues，尤其是 **#96861**：

- **#96861：工具文本输出退化为 “(see attached image)” 占位符**  
  评论数最多（3 条），且有 1 个 👍。该问题会让 agent “看不见”普通工具输出，属于直接影响推理与执行链路的高关注 bug。  
  链接：<https://github.com/openclaw/openclaw/issues/96861>

- **#96882：按 provider 分组模型下拉框**  
  1 条评论、1 个 👍。这是明显的可用性诉求：随着模型数量增多，平铺列表难以检索。  
  链接：<https://github.com/openclaw/openclaw/issues/96882>

- **#96879：为 Gemini provider 增加 Interactions API transport**  
  1 条评论、1 个 👍。这反映出社区对 Google Gemini 新一代 agentic API 路线的跟进需求，属于平台能力演进信号。  
  链接：<https://github.com/openclaw/openclaw/issues/96879>

- **#96878：web_search provider 在 beta 升级后失效，官方插件也安装失败**  
  1 条评论、1 个 👍，且标记为 beta release blocker。说明搜索能力是实际生产流程中的核心依赖，回归影响面大。  
  链接：<https://github.com/openclaw/openclaw/issues/96878>

- **#96869：流式 reasoning/content 分块边界导致可见内容丢失**  
  1 条评论、1 个 👍。这类问题通常只有在长输出和复杂格式混合时才显现，但一旦发生就会直接破坏用户对模型输出的信任。  
  链接：<https://github.com/openclaw/openclaw/issues/96869>

**热点背后诉求总结**：  
社区最关心的不是“更多花哨功能”，而是**agent 能否稳定地看到、记住、恢复并正确执行**。模型切换、搜索、流式输出、工具可见性这些基础链路，决定了 OpenClaw 是否能成为生产环境可依赖的 AI 助手平台。

---

## 5) Bug 与稳定性
按严重程度排序，今日值得优先关注的稳定性问题如下：

### P1 / 高优先级
- **#96878：web_search providers 回归失效，官方插件安装也失败**  
  这是明确的 regression，而且还是 beta release blocker，影响搜索类工作流。  
  当前快照中**未看到直接对应的 fix PR**。  
  链接：<https://github.com/openclaw/openclaw/issues/96878>

- **#96869：reasoning+content streaming 边界导致可见内容丢失**  
  属于行为错误，不一定崩溃，但会让输出内容被错误分流到 thinking，从而影响最终答复完整性。  
  当前快照中**未看到直接对应的 fix PR**。  
  链接：<https://github.com/openclaw/openclaw/issues/96869>

### P2 / 中高优先级
- **#96858：claude-cli backend 缺少 pre-compaction handoff flush，且 100% context 显示过于吓人**  
  这是 session-state 风险问题，涉及长运行 agent 的上下文安全和用户感知。  
  当前快照中**未看到直接对应的 fix PR**。  
  链接：<https://github.com/openclaw/openclaw/issues/96858>

### 已关闭但仍值得关注的相关问题
- **#96861：普通 tool 文本输出退化为 `(see attached image)` 占位符**  
  该 issue 已关闭，但同类问题 **#96857** 仍在开放状态，说明根因或相近路径可能尚未完全根治。  
  链接：<https://github.com/openclaw/openclaw/issues/96861>  
  相关开放项：<https://github.com/openclaw/openclaw/issues/96857>

**稳定性判断**：  
今日的 bug 画像非常集中——**输出可见性、流式边界、搜索回归、会话安全**。这说明 OpenClaw 的主要风险不在单点功能，而在“agent 执行链路的连续性和可解释性”。

---

## 6) 功能请求与路线图信号
今日新增的功能需求里，有两个方向尤其值得关注：

- **#96882：模型下拉框按 provider 分组**  
  这是典型的 UI 可用性增强，解决“模型越来越多后难以选择”的问题。  
  这类需求实现成本低、用户感知强，**很可能进入较近版本的 UX 改进清单**。  
  链接：<https://github.com/openclaw/openclaw/issues/96882>

- **#96879：Gemini provider 增加 Interactions API transport**  
  这是更具路线图意义的需求。它不仅是“接一个新接口”，更是在适配 Google 对 agentic 能力的官方演进方向。  
  如果 OpenClaw 下一版本强调 provider 能力扩展，这个需求**优先级大概率高于纯 UI 类优化**。  
  链接：<https://github.com/openclaw/openclaw/issues/96879>

**路线图信号判断**：  
当前社区需求呈现出两条主线：  
1. **面向未来模型/平台的 provider 扩展**（如 Gemini Interactions API）；  
2. **面向规模化使用的交互可用性**（如模型分组）。  
结合今天已有的多条 provider 修复 PR，OpenClaw 下一阶段很可能继续围绕“**多 provider 兼容 + 可视化/选择体验**”推进。

---

## 7) 用户反馈摘要
从今日 Issues 的评论与摘要中，可以提炼出以下真实痛点：

- **用户希望工具输出必须“可读”而不是被占位符替代**  
  工具日志一旦变成 `(see attached image)`，agent 就会失去最基础的执行上下文。  
  这类反馈直接指向“AI 助手的可解释性”问题。  
  链接：<https://github.com/openclaw/openclaw/issues/96861>

- **当模型数量增多时，选择体验会迅速恶化**  
  用户已经开始感受到“flat list”不可扩展，说明 OpenClaw 的 provider 生态在扩张，UI 需要同步进化。  
  链接：<https://github.com/openclaw/openclaw/issues/96882>

- **用户对新 API 路线非常敏感，尤其是 Gemini**  
  这表明部分用户已经在依赖前沿 provider 能力，不满足于旧的 generateContent 路径。  
  链接：<https://github.com/openclaw/openclaw/issues/96879>

- **搜索和插件安装失败会立刻打断工作流**  
  web_search 回归与插件安装失败说明：用户实际把搜索当成主流程组件，而不是附属功能。  
  链接：<https://github.com/openclaw/openclaw/issues/96878>

- **长上下文、流式输出与会话恢复是实际生产场景**  
  这些 bug 都不是“边角问题”，而是长任务、跨项目、持续运行 agent 的典型痛点。  
  链接：<https://github.com/openclaw/openclaw/issues/96869> 、<https://github.com/openclaw/openclaw/issues/96858>

- **用户希望错误提示更可操作**  
  比如缺少 media provider 时，不满足于 bare error，而需要安装指引或刷新提示。  
  链接：<https://github.com/openclaw/openclaw/issues/96790>

**满意/不满意倾向**：  
用户对 OpenClaw 的不满意，主要不是“功能太少”，而是**失败时的反馈不够清晰、边界条件下不够稳**。相对地，今天大量安全/兼容性修复 PR 的出现，也说明维护者正在朝这个方向补课，整体体验有望继续改善。

---

## 8) 待处理积压
当前快照中，待处理队列主要集中在**高优先级但仍需作者回复/维护者审阅**的条目上：

- **#96883：agent cron 操作应绑定调用者身份**  
  P1，`waiting on author`，涉及权限边界与 cron 资源隔离，风险较高。  
  链接：<https://github.com/openclaw/openclaw/pull/96883>

- **#96878：web_search 回归失效**  
  P1，且是 beta blocker，优先级应极高。  
  链接：<https://github.com/openclaw/openclaw/issues/96878>

- **#96869：流式边界内容丢失**  
  P1，属于输出链路正确性问题，建议尽快定责。  
  链接：<https://github.com/openclaw/openclaw/issues/96869>

- **#96858：claude-cli backend context 安全问题**  
  P2，但涉及长会话和上下文保护，若持续悬而未决，容易转化为更广泛的信任问题。  
  链接：<https://github.com/openclaw/openclaw/issues/96858>

- **#96721：Moonshot/Kimi web search 继承 custom baseUrl**  
  `waiting on author`，属于兼容性修复，若不推进会影响自建代理/非默认 host 用户。  
  链接：<https://github.com/openclaw/openclaw/pull/96721>

- **#96700 / #96729 / #96776 / #96777 / #96723** 等多个 PR  
  这些多为 `needs proof`、`ready for maintainer look` 或 `waiting on author`，且不少带有兼容性、安全边界、session-state 风险标签，适合在合并窗口中优先清理。  
  例如：  
  <https://github.com/openclaw/openclaw/pull/96700>  
  <https://github.com/openclaw/openclaw/pull/96729>  
  <https://github.com/openclaw/openclaw/pull/96776>  
  <https://github.com/openclaw/openclaw/pull/96777>  
  <https://github.com/openclaw/openclaw/pull/96723>

**积压判断**：  
从今天的快照看，OpenClaw 的“积压”不是传统意义上的老旧沉淀，而是**一批新近产生但优先级很高的待审/待证实项**。维护者应优先处理的是：  
1. **P1 回归与安全边界问题**；  
2. **影响长会话、流式输出、搜索与工具调用的稳定性问题**；  
3. **等待作者补证据的高风险 PR**。  

如果你愿意，我还可以把这份日报进一步整理成：
- **适合发群里的简版摘要**
- **适合管理层看的表格式日报**
- **带“趋势判断 + 风险预警”的增强版**

---

## 横向生态对比

以下为基于 2026-06-26 各开源项目动态的**横向对比分析报告**，面向技术决策者与开发者，尽量保持简洁但有数据支撑。

---

# 1. 生态全景

过去 24 小时，这一批个人 AI 助手 / 自主智能体项目整体呈现出一个很清晰的特征：**高活跃，但几乎全部处于“修复优先于发版”的窗口期**。  
多数仓库没有新 Release，但 Issues 与 PR 持续涌入，说明生态已经从“做功能”进入到“补稳定性、补兼容性、补安全边界”的阶段。  
同时，社区关注点高度收敛到几条主线：**多 provider 兼容、工具调用权限控制、流式输出与会话一致性、跨平台运行稳定性、以及更可运维的审批/观测能力**。  
换句话说，这个生态正在从“能演示”向“能长期可靠运行”迁移。  
从成熟度看，头部项目活跃度很高，但也普遍伴随较长的待审 PR 队列，说明**创新速度快于合并与质量收敛速度**。

---

# 2. 各项目活跃度对比

> 说明：下表中的 Issues/PR 为过去 24 小时更新量；Release 均为“无”，表示今日未发布新版本。

| 项目 | Issues(24h) | PR(24h) | Release | 健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 7 | 25 | 无 | **高活跃、修复导向**；基础质量提升明显，但 PR backlog 偏长 |
| NanoBot | 10 | 14 | 无 | **安全收敛期**；安全问题密集，修复链条清晰 |
| Hermes Agent | 50 | 50 | 无 | **超高活跃**；生态体量最大之一，但稳定性压力显著 |
| PicoClaw | 0 | 8 | 无 | **维护型**；以稳定性和依赖升级为主，社区反馈弱 |
| NanoClaw | 1 | 5 | 无 | **中高活跃**；偏生产化、兼容性与运维能力打磨 |
| NullClaw | 0 | 0 | 无 | **低活跃/沉寂** |
| IronClaw | 33 | 40 | 无 | **高活跃**；架构收敛快，但运行时一致性风险仍高 |
| LobsterAI | 0 | 8 | 无 | **工程修复稳定**；讨论少，但交付链条较稳 |
| TinyClaw | 0 | 0 | 无 | **低活跃/沉寂** |
| Moltis | 0 | 0 | 无 | **低活跃/沉寂** |
| CoPaw | 9 | 25 | 无 | **高活跃**；兼容、迁移、工具链并进，评审压力较大 |
| ZeptoClaw | 0 | 0 | 无 | **低活跃/沉寂** |
| ZeroClaw | 4 | 17 | 无 | **高并发开发**；迭代快，PR 审核压力大 |

### 简要分层
- **超高热度/快速迭代**：Hermes Agent、IronClaw、OpenClaw、CoPaw、ZeroClaw、NanoBot  
- **质量巩固型**：PicoClaw、NanoClaw、LobsterAI  
- **低活跃/沉寂**：NullClaw、TinyClaw、Moltis、ZeptoClaw

---

# 3. OpenClaw 在生态中的定位

### 1) 相对优势
OpenClaw 今天的关键价值不在“功能更多”，而在于它的修复方向非常聚焦：  
- **兼容性**：OpenAI-compatible tool call 参数双重字符串化修复  
- **正确性**：fuzzy edit 归一化范围收窄，防止误改无关内容  
- **配置安全**：bootstrap 配置路径误判修复  
- **消息一致性**：Signal structured delivery 的 approval reaction 行为统一  

这说明 OpenClaw 的核心竞争力是：**把 agent 执行链路做得更可靠、更可预期**。

### 2) 技术路线差异
与 Hermes / IronClaw / CoPaw 这类“平台化、全栈化”项目相比，OpenClaw 更像是一个**以 agent runtime 正确性和 provider 兼容性为中心的核心引擎**。  
它不太像在做大而全的“AI 工作台”，而是在做**多 provider、多工具、多消息路径下的稳定执行层**。

### 3) 社区规模对比
- **比 Hermes Agent、IronClaw 更小**：后两者今天的 Issues/PR 声量明显更高，说明用户面更广、系统更复杂。  
- **比 PicoClaw、LobsterAI、NanoClaw 更热**：OpenClaw 的讨论密度和修复节奏明显更强。  
- **处于中高位梯队**：总活跃量（7+25）不算最大，但**问题集中度高、工程信号强**，属于“社区规模中等偏上、技术关注度很高”的类型。

### 结论
OpenClaw 在生态中的定位可以概括为：  
> **偏底层、偏 correctness、偏多 provider 兼容的核心运行时项目。**  
它的强项是“把 agent 真的跑稳”，而不是“把界面做多”。

---

# 4. 共同关注的技术方向

## A. 多 provider / API 兼容成为基础能力
涉及项目：
- **OpenClaw**：OpenAI-compatible tool call 参数双重字符串化、Gemini provider 路线
- **Hermes Agent**：provider 切换与 credential pool、desktop 依赖/认证稳定性
- **CoPaw**：OpenAI Response API provider、Gemini 兼容修复
- **NanoBot**：OpenAI-compatible API 下的 allowlist 绕过问题
- **IronClaw**：面向所有 LLM provider 的 HTTP client 强化治理

**共同诉求**：  
不是“支持某一个模型”，而是要建立**跨厂商、跨协议、跨版本**的稳定适配层。

---

## B. 工具权限与安全边界治理正在成为第一优先级
涉及项目：
- **NanoBot**：`enabledTools` / `allowPatterns` / shell-chain 绕过
- **OpenClaw**：agent cron 身份绑定、web_search 回归
- **IronClaw**：user-scoped tool approvals、capability policy、admin gate
- **NanoClaw**：多管理员审批、CLI 审批
- **ZeroClaw**：agent-aware tools / tool picker

**共同诉求**：  
工具调用不再只是“能执行”，而是要回答三个问题：  
1. 谁能调用；  
2. 调用后能看到什么；  
3. 调用边界是否可审计、可回滚。

---

## C. 流式输出、会话绑定、缓存一致性是影响“信任感”的核心链路
涉及项目：
- **OpenClaw**：streaming content 边界、fuzzy edit 正确性
- **NanoBot**：流式 delta 合并、session key 冲突、tool call 去重
- **Hermes Agent**：网关阻塞、provider 切换后凭证回写
- **LobsterAI**：history 同步重复 assistant 内容、子代理收敛
- **ZeroClaw**：response-cache timestamp 影响命中率

**共同诉求**：  
用户越来越不能接受“看起来跑了，但内容丢了 / 状态错了 / 缓存不命中”。  
**确定性**比“更聪明”更重要。

---

## D. 跨平台与桌面端交付仍然是高频故障源
涉及项目：
- **Hermes Agent**：Desktop 启动崩溃、asar 破损、simple-git 缺失
- **NanoBot**：Windows 后台服务、nssm restart 异常
- **CoPaw**：Windows 本地文件传输 / Linux browser tool 失败 / Windows 沙箱
- **PicoClaw**：依赖升级、稳定性修补
- **LobsterAI**：启动项同步、平台状态一致性

**共同诉求**：  
“做出来”不够，还必须“装得上、启得动、升级后不坏”。

---

## E. 更可运维的产品形态正在形成
涉及项目：
- **IronClaw**：WebUI 权限、自动化线程绑定、日志治理
- **NanoClaw**：容器资源限制、认证 failover、日志脱敏
- **CoPaw**：模型 provider 统计、技能页重构、Runtime 2.0
- **OpenClaw**：错误提示、模型分组、搜索/插件稳定性

**共同诉求**：  
智能体项目正在从“开发者玩具”变成“可长期部署的系统”，所以**权限、日志、审批、状态页、配置面板**都在变成刚需。

---

# 5. 差异化定位分析

## 生态内的几类典型定位

### 1) 核心运行时 / 协议兼容层
- **代表**：OpenClaw、ZeroClaw、NanoBot
- **特点**：更关注 provider 兼容、工具调用、安全边界、流式与缓存正确性
- **目标用户**：开发者、平台集成者、偏工程化的高级用户
- **架构倾向**：runtime + tool pipeline + provider adapter

### 2) 全栈智能体平台 / 多渠道助手
- **代表**：Hermes Agent、IronClaw、LobsterAI、CoPaw
- **特点**：桌面端、WebUI、消息平台、自动化线程、用户权限、技能系统一起做
- **目标用户**：重度使用者、团队用户、需要跨平台/跨渠道协作的用户
- **架构倾向**：UI + gateway + worker + plugin/skill system + auth

### 3) 生产化/安全化导向
- **代表**：NanoClaw、NanoBot、IronClaw
- **特点**：更重视权限、审批、容器隔离、认证容错、日志安全
- **目标用户**：团队、企业、生产环境部署者
- **架构倾向**：policy-driven + approval workflow + security boundary

### 4) 维护型/收敛型
- **代表**：PicoClaw、LobsterAI
- **特点**：以稳定修复、依赖升级、交付链路修补为主
- **目标用户**：已有部署用户、维护者
- **架构倾向**：保守迭代、重回归验证

## OpenClaw 的差异化结论
OpenClaw 最大的差异不是“覆盖面”，而是**执行正确性与 provider 兼容优先**。  
相比 Hermes / IronClaw 的平台化路线，OpenClaw 更像是**把智能体底座做稳**；相比 PicoClaw / LobsterAI，它又明显更活跃、更靠前沿问题。  
因此它的定位更接近：  
> **中高活跃的核心 agent runtime 参考实现。**

---

# 6. 社区热度与成熟度

## 快速迭代阶段
这些项目今天表现出明显的“高热 + 高修复 + 高 backlog”特征：
- **Hermes Agent**：Issues/PR 双 50，体量最大，问题面广
- **IronClaw**：33 Issues / 40 PR，平台能力扩张快
- **OpenClaw**：25 PR + 7 Issues，修复导向明显
- **CoPaw**：9 Issues / 25 PR，迁移与兼容并行
- **ZeroClaw**：4 Issues / 17 PR，PR 多、评审压力大
- **NanoBot**：安全问题集中，明显处于收敛修复阶段

## 质量巩固阶段
- **PicoClaw**：无 Issues 活动，PR 以 fix/deps 为主
- **NanoClaw**：偏安装、迁移、权限和日志安全
- **LobsterAI**：PR 全部收口，几乎无用户侧噪音

## 低热/沉寂阶段
- **NullClaw**
- **TinyClaw**
- **Moltis**
- **ZeptoClaw**

## 结论
当前生态呈现出典型的两极分化：  
**头部项目在高速迭代，但几乎都在补稳定性；尾部项目则处于低噪音或低活动状态。**  
OpenClaw、Hermes、IronClaw 是最值得持续关注的技术风向标。

---

# 7. 值得关注的趋势信号

## 趋势 1：多 provider 兼容已经从“加分项”变成“基础设施”
开发者参考价值：  
不要再把 provider 当作单一实现，应该设计成**适配层 + 能力探测 + 容错切换**。  
这在 OpenClaw、Hermes、CoPaw、NanoBot、IronClaw 上都已非常明显。

## 趋势 2：工具权限治理正在上升为产品核心
开发者参考价值：  
未来 agent 系统竞争的关键之一，不是会不会调用工具，而是**调用是否可控、可审计、可分级授权**。  
NanoBot、IronClaw、NanoClaw、ZeroClaw 都在往这条线收敛。

## 趋势 3：状态一致性比“聪明”更重要
开发者参考价值：  
流式边界、缓存 key、session binding、message routing 这些“看不见的基础层”决定了用户是否信任系统。  
OpenClaw、ZeroClaw、LobsterAI、NanoBot 的问题都说明这一点。

## 趋势 4：跨平台交付仍是 agent 产品化最大摩擦点之一
开发者参考价值：  
桌面端、Windows 服务、Linux 启动、打包依赖、asar / module 缺失，仍然是高频故障源。  
这意味着“研发验证通过”不等于“用户可稳定部署”。

## 趋势 5：用户开始要求“可运维的智能体”
开发者参考价值：  
多管理员审批、CLI 审批、日志脱敏、资源限制、自动化线程绑定、状态面板、模型分组，说明用户已不满足于 demo。  
他们要的是**可长期运行、可协作、可治理**的智能体系统。

---

# 一句话总结

**2026-06-26 的开源智能体生态，核心关键词不是“新功能爆发”，而是“兼容性、安全性、状态一致性和可运维性”集中成为主战场。**  
其中，**OpenClaw 代表的是“核心 runtime 正确性优先”的路线**，而 Hermes / IronClaw / CoPaw 代表的是“平台化与产品化扩张”的路线；两者共同说明，这个赛道已经进入**从可用到可信**的竞争阶段。

如果你需要，我可以进一步把这份报告压缩成：
1. **1 页管理层摘要版**，或  
2. **带风险等级与建议动作的决策版表格**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报｜2026-06-26

## 1) 今日速览
过去 24 小时，NanoBot 维持了**高强度活跃**：Issues 更新 10 条、PR 更新 14 条，但**没有新 Release**，说明当前迭代速度快于发版节奏。  
今天的讨论与开发重心明显集中在**安全加固、工具调用边界、Windows 运行稳定性**和**流式输出一致性**上。  
从结果看，项目在持续修补关键问题：已有 3 个 PR 处于已关闭状态，说明维护者正在把基础稳定性问题往前推进。  
整体健康度判断：**开发活跃，但进入“安全/稳定性优先”的维护窗口**，短期更像修补与收敛，而非功能扩张。  
相关链接：[Issues 总览](https://github.com/HKUDS/nanobot/issues)｜[PR 总览](https://github.com/HKUDS/nanobot/pulls)

---

## 2) 项目进展
今天值得关注的已关闭/落地 PR 共有 3 个，主要都在“打地基”：

- **[#4528](https://github.com/HKUDS/nanobot/pull/4528)**：按 `_stream_id` 键控流式缓冲区，修复同一房间/同一聊天中的**重叠流污染**问题。  
  这类修复对多会话并发场景很关键，直接提升消息流稳定性。

- **[#4509](https://github.com/HKUDS/nanobot/pull/4509)**：恢复 WebUI 代码块复制的 fallback 逻辑。  
  解决了 Clipboard API 不可用时“复制失效”的体验回退问题，属于典型的前端可用性修复。

- **[#4512](https://github.com/HKUDS/nanobot/pull/4512)**：测试相关修复并更新 `CLAUDE.md` 文档。  
  虽然偏维护性，但对后续合并和 CI 稳定有帮助。

**项目推进判断：**  
今天的已落地改动更多是在修复**并发一致性、前端可用性、测试稳定性**，属于“降低回归风险”的推进方式。对主线功能的增量不大，但对项目健康度加分明显。  
相关链接：[PR #4528](https://github.com/HKUDS/nanobot/pull/4528)｜[PR #4509](https://github.com/HKUDS/nanobot/pull/4509)｜[PR #4512](https://github.com/HKUDS/nanobot/pull/4512)

---

## 3) 社区热点
今天最活跃的讨论点基本都围绕**安全和 Windows 运行问题**展开。  
按评论数看，多个条目并列最高（均为 1 条评论），但主题集中度很高：

1. **Windows 后台/服务重启异常**  
   - [#4511](https://github.com/HKUDS/nanobot/issues/4511) `[bug] Windows 系统下 --background 问题`
   - [#4513](https://github.com/HKUDS/nanobot/issues/4513) `nssm 设置为系统服务后 /restart 异常`

   这类问题说明用户在 Windows 上并不是简单“能跑”，而是已经进入**守护进程、系统服务、重启恢复**等更接近生产部署的场景。

2. **安全告警集中爆发**
   - [#4519](https://github.com/HKUDS/nanobot/issues/4519) `MCP enabledTools Scope Bypass`
   - [#4517](https://github.com/HKUDS/nanobot/issues/4517) `MCP enabled_tools Allowlist Bypass`（已关闭）

   这说明社区对 **MCP / tools 边界控制** 的关注度很高，且问题暴露面不止一个。

3. **工具执行安全**
   - [#4514](https://github.com/HKUDS/nanobot/issues/4514)
   - [#4515](https://github.com/HKUDS/nanobot/issues/4515)
   - [#4516](https://github.com/HKUDS/nanobot/issues/4516)
   - [#4518](https://github.com/HKUDS/nanobot/issues/4518)
   - [#4520](https://github.com/HKUDS/nanobot/issues/4520)
   - [#4521](https://github.com/HKUDS/nanobot/issues/4521)

   这一串都指向 `exec` 的 allowlist / shell 链执行 / 登录 shell 等风险面，说明社区（或安全研究者）在持续做攻击面验证。

**热度判断：**  
目前点赞数全部为 0，说明讨论主要靠**问题复现与安全披露驱动**，而不是表情互动；但评论集中度高，意味着关注点很明确。  
相关链接：[#4511](https://github.com/HKUDS/nanobot/issues/4511)｜[#4513](https://github.com/HKUDS/nanobot/issues/4513)｜[#4519](https://github.com/HKUDS/nanobot/issues/4519)｜[#4517](https://github.com/HKUDS/nanobot/issues/4517)

---

## 4) Bug 与稳定性
按严重程度排序，今天最值得警惕的是安全问题，其次是 Windows 运行可靠性。

### Critical / 高危：工具执行与权限边界绕过
- **[#4519](https://github.com/HKUDS/nanobot/issues/4519)** `MCP enabledTools Scope Bypass Exposes Resource and Prompt Wrappers`  
  风险：MCP 作用域控制可能失效，导致资源/Prompt 包装器暴露。  
  **已有修复 PR：** [#4524](https://github.com/HKUDS/nanobot/pull/4524)

- **[#4514](https://github.com/HKUDS/nanobot/issues/4514)** `tools.exec.allowPatterns` 链式命令绕过  
  风险：白名单可被链式命令绕过，可能执行未授权 shell payload。  
  **已有修复 PR：** [#4526](https://github.com/HKUDS/nanobot/pull/4526)

- **[#4515](https://github.com/HKUDS/nanobot/issues/4515)** `exec.allow_patterns` 注释尾绕过  
  风险：allowlist 评估逻辑可被注释/尾部内容干扰。  
  **已有修复 PR：** [#4526](https://github.com/HKUDS/nanobot/pull/4526)

- **[#4516](https://github.com/HKUDS/nanobot/issues/4516)** ExecTool allowlist wrapper prefix bypass  
  风险：包装器前缀绕过导致意外命令执行。  
  **已有修复 PR：** [#4526](https://github.com/HKUDS/nanobot/pull/4526)

- **[#4518](https://github.com/HKUDS/nanobot/issues/4518)** 默认 login-shell 重新引入启动文件中的 secrets  
  风险：shell 启动文件中的敏感信息可能回流到执行环境。  
  **已有修复 PR：** [#4525](https://github.com/HKUDS/nanobot/pull/4525)

- **[#4520](https://github.com/HKUDS/nanobot/issues/4520)** OpenAI-compatible API 下的 allowlist 绕过  
  风险：API 入口可触发额外 shell 段执行。  
  **已有修复 PR：** 目前未在数据中看到直接对应的已合并修复。

- **[#4521](https://github.com/HKUDS/nanobot/issues/4521)** shell-chain bypass allows unintended command execution  
  风险：链式 shell 片段执行超出预期。  
  **已有修复 PR：** 目前未在数据中看到直接对应的已合并修复。

### High：Windows 运行与重启语义异常
- **[#4511](https://github.com/HKUDS/nanobot/issues/4511)** `gateway --background` 问题  
  风险：重启后进程信息文件与实际运行状态不一致，影响后台守护可靠性。  
  **已有修复 PR：** 暂未看到。

- **[#4513](https://github.com/HKUDS/nanobot/issues/4513)** nssm 系统服务下 `/restart` 异常  
  风险：服务状态与真实进程状态不一致，且可能出现端口占用/重复重启。  
  **已有修复 PR：** 暂未看到。

### 已关闭但值得记录
- **[#4517](https://github.com/HKUDS/nanobot/issues/4517)** `MCP enabled_tools` Allowlist Bypass  
  已关闭，说明该类安全问题已开始收敛，但同主题的 [#4519](https://github.com/HKUDS/nanobot/issues/4519) 仍在延伸。

---

## 5) 功能请求与路线图信号
今天没有看到明显的新 feature issue，但有一个非常明确的功能型信号：

- **[#4527](https://github.com/HKUDS/nanobot/pull/4527)** `Add ask_clarification tool`  
  这反映出用户/维护者希望 Agent 在不确定时能**主动澄清问题**，而不是盲目继续执行。  
  如果该 PR 通过测试并完成评审，它很可能成为**下一版本的候选功能**，因为它直接改善交互质量与任务成功率。

同时，以下已打开的修复 PR 也透露出路线图倾向：  
- **[#4533](https://github.com/HKUDS/nanobot/pull/4533)** 会话 key 冲突修复  
- **[#4530](https://github.com/HKUDS/nanobot/pull/4530)** 非流式工具调用 ID 去重  
- **[#4531](https://github.com/HKUDS/nanobot/pull/4531)** 流式 delta 合并 key 修复  
- **[#4522](https://github.com/HKUDS/nanobot/pull/4522)** 通用重复工具调用保护  

这说明下一阶段路线大概率会围绕：**更稳的 Agent 交互、更一致的会话管理、更严格的工具调用控制** 展开。  
相关链接：[#4527](https://github.com/HKUDS/nanobot/pull/4527)｜[#4533](https://github.com/HKUDS/nanobot/pull/4533)｜[#4530](https://github.com/HKUDS/nanobot/pull/4530)｜[#4531](https://github.com/HKUDS/nanobot/pull/4531)｜[#4522](https://github.com/HKUDS/nanobot/pull/4522)

---

## 6) 用户反馈摘要
从今天的 Issues/PR 描述里，可以提炼出几类真实用户痛点：

1. **Windows 部署用户需要“可恢复、可守护、可解释”的重启行为**  
   - 诉求来自：[#4511](https://github.com/HKUDS/nanobot/issues/4511)、[#4513](https://github.com/HKUDS/nanobot/issues/4513)  
   用户不只是想启动成功，而是希望在 `--background`、`nssm`、`/restart` 这类场景下，进程状态与服务状态完全一致。

2. **生产环境用户对安全边界非常敏感**  
   - 诉求来自：[#4519](https://github.com/HKUDS/nanobot/issues/4519)、[#4514](https://github.com/HKUDS/nanobot/issues/4514)、[#4515](https://github.com/HKUDS/nanobot/issues/4515)、[#4518](https://github.com/HKUDS/nanobot/issues/4518)  
   用户希望 allowlist / enabledTools / exec 的约束是“真的生效”，而不是在边界条件下被绕过。

3. **WebUI 交互要有退化路径**
   - 诉求来自：[#4509](https://github.com/HKUDS/nanobot/pull/4509)  
   用户希望在 Clipboard API 不可用时依然能复制内容，这类细节很影响日常体验。

4. **多会话、多流并发是实际使用场景，不是边角场景**
   - 诉求来自：[#4528](https://github.com/HKUDS/nanobot/pull/4528)、[#4533](https://github.com/HKUDS/nanobot/pull/4533)、[#4530](https://github.com/HKUDS/nanobot/pull/4530)  
   这说明 NanoBot 已被用于更复杂的并发交互场景，用户对“消息不串线、会话不冲突、工具调用不重复”要求很高。

---

## 7) 待处理积压
严格来说，**本次 24 小时窗口内没有真正“长期未响应”的老 Issue/PR**；新增与活跃项几乎都集中在 6/25–6/26。  
但如果从优先级角度看，当前最该纳入积压处理队列的是以下几类：

### 优先级 1：安全修复尽快合并
- [#4519](https://github.com/HKUDS/nanobot/issues/4519) ↔ [#4524](https://github.com/HKUDS/nanobot/pull/4524)
- [#4514](https://github.com/HKUDS/nanobot/issues/4514) ↔ [#4526](https://github.com/HKUDS/nanobot/pull/4526)
- [#4515](https://github.com/HKUDS/nanobot/issues/4515) ↔ [#4526](https://github.com/HKUDS/nanobot/pull/4526)
- [#4518](https://github.com/HKUDS/nanobot/issues/4518) ↔ [#4525](https://github.com/HKUDS/nanobot/pull/4525)

### 优先级 2：Windows 运行问题需要补齐修复链路
- [#4511](https://github.com/HKUDS/nanobot/issues/4511)
- [#4513](https://github.com/HKUDS/nanobot/issues/4513)

### 优先级 3：功能增强候选
- [#4527](https://github.com/HKUDS/nanobot/pull/4527) `ask_clarification` tool

**维护建议：**  
在下一次发版前，建议优先把**安全修复 PR**与**Windows 重启问题**收口；否则项目虽然活跃，但 release 质量和部署可信度会被这两类问题持续拉低。  
相关链接：[Issues](https://github.com/HKUDS/nanobot/issues)｜[PRs](https://github.com/HKUDS/nanobot/pulls)

---

如你需要，我也可以把这份日报进一步整理成：
1. **适合公众号/飞书的精简版**，或  
2. **适合内部周报的表格版（含优先级与负责人建议）**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-06-26）

## 1. 今日速览
过去 24 小时，仓库维持高强度活跃：**Issues 更新 50 条、PR 更新 50 条**，整体处于持续迭代和集中修复期。  
当前讨论重心明显偏向 **桌面端打包/启动崩溃、provider 切换与 credential pool、Windows/macOS/Linux 平台兼容性、网关消息交付稳定性**。  
从结果看，今天已有一批高优先级问题被关闭或提交修复 PR，说明维护节奏积极，但“更新后崩溃/依赖缺失/认证失败”仍是项目健康度的主要压力点。  
**总体活跃度：高；稳定性风险：中高；社区反馈密度：高。**

## 2. 版本发布
**今日无新版本发布。**

## 3. 项目进展
### 已关闭/落地的关键 PR
- **[#52772](https://github.com/nousresearch/hermes-agent/pull/52772)** — `feat(desktop): in-app spot editor for the file preview pane`  
  为桌面端右侧文件预览加入了 **CodeMirror 6 的“spot editor”**，把只读预览升级为可原地编辑，增强了 Desktop 的实用性。
- **[#52768](https://github.com/nousresearch/hermes-agent/pull/52768)** — `fix(approval): fold Windows absolute home paths in dangerous-command detection`  
  强化 Windows 下危险命令审批，避免对 `~/.ssh`、`~/.bashrc`、`~/.hermes/config.yaml` 等绝对家目录路径的写操作绕过审批。

### 今日推进中的高影响修复 PR（待合并）
- **[#52761](https://github.com/nousresearch/hermes-agent/pull/52761)** — 网关事件循环阻塞修复（跨进程 cache cleanup 从锁内移出）
- **[#52760](https://github.com/nousresearch/hermes-agent/pull/52760)** — Codex/xAI 轮转凭证回写 global root，避免 sibling profile 失效
- **[#52776](https://github.com/nousresearch/hermes-agent/pull/52776)** / **[#52771](https://github.com/nousresearch/hermes-agent/pull/52771)** — Desktop 打包依赖补齐，针对 `simple-git` 缺失 crash 的修复链
- **[#52785](https://github.com/nousresearch/hermes-agent/pull/52785)** / **[#52763](https://github.com/nousresearch/hermes-agent/pull/52763)** — provider 切换后刷新 credential pool，修复模型切换/恢复路径异常

**项目整体向前迈进：**
从公开样本看，今日至少有 **2 个明确功能/安全修复已落地**，并且还有一组 **针对桌面端、认证、网关的高优先级修复 PR 同步推进**。这表明项目当前的主线是先把稳定性和兼容性收敛，再继续扩展功能体验。

## 4. 社区热点
### 最活跃的 Issues / PR
1. **[#52735](https://github.com/nousresearch/hermes-agent/issues/52735)** — Desktop 启动即崩溃：`Cannot find module 'simple-git'`  
   - 评论数：**9**
   - 状态：已关闭  
   - 热点原因：这是典型的“更新后即不可用”问题，直接影响 Desktop 启动；也与今天多条打包修复 PR 高度相关。
2. **[#52598](https://github.com/nousresearch/hermes-agent/issues/52598)** — 为 profile distribution 增加更快的作者工作流  
   - 评论数：**5**，👍 **2**
   - 诉求：降低 profile 分发的制作成本，明显偏向开发者/维护者体验。
3. **[#52764](https://github.com/nousresearch/hermes-agent/issues/52764)** — `hermes update` 后生成的 Desktop asar 破损  
   - 评论数：**2**
   - 热点原因：与 #52735 属于同一类“更新后桌面端挂掉”的根因族，说明该问题已形成集中反馈。
4. **[#52753](https://github.com/nousresearch/hermes-agent/issues/52753)** — Windows Desktop 更新后找不到 `simple-git`
   - 评论数：**2**
   - 热点原因：证明该 crash 不是单平台偶发，而是跨平台共性回归。

### 背后诉求分析
- 用户最在意的是 **“更新完成后能否稳定启动”**，其次是 **“切换 provider 后不要丢状态”**。  
- 开发者/高级用户希望 Hermes 的 profile、skills、gateway、desktop 分发流程更自动化，减少手工构建和复制。  
- 说明 Hermes 已进入多平台、多入口的深度使用阶段，社区不再只关注“能不能用”，而是关注 **“能否持续可靠地用”**。

## 5. Bug 与稳定性
按严重程度排序如下：

| 严重程度 | 议题 | 影响 | 是否已有 fix PR |
|---|---|---|---|
| **P1** | [#52781](https://github.com/nousresearch/hermes-agent/issues/52781) — Docker `chown -R` 跟随 symlink，可能破坏用户 home 目录 | 容器启动可能误改宿主目录，属于高危安全边界问题 | **未见直接 fix PR** |
| **P1** | [#52761](https://github.com/nousresearch/hermes-agent/pull/52761) — 网关事件循环卡死/Discord heartbeat 阻塞 | 会导致网关僵死，影响消息处理可用性 | **已有修复 PR** |
| **P1** | [#52760](https://github.com/nousresearch/hermes-agent/pull/52760) — 轮转后的 Codex/xAI 凭证未写回 global root | 访问令牌过期后 sibling profile 可能因 `refresh_token_reused` 失效 | **已有修复 PR** |
| **P2** | [#52735](https://github.com/nousresearch/hermes-agent/issues/52735) — Desktop 启动崩溃：缺失 `simple-git` | 启动即失败，直接阻断桌面端使用 | **有相关修复链**：[#52776](https://github.com/nousresearch/hermes-agent/pull/52776)、[#52771](https://github.com/nousresearch/hermes-agent/pull/52771) |
| **P2** | [#52764](https://github.com/nousresearch/hermes-agent/issues/52764) — `hermes update` 后 Desktop asar 破损 | 更新流程后桌面端无法启动 | **有相关修复 PR**：[#52776](https://github.com/nousresearch/hermes-agent/pull/52776)、[#52771](https://github.com/nousresearch/hermes-agent/pull/52771) |
| **P2** | [#52777](https://github.com/nousresearch/hermes-agent/issues/52777) — credential pool checkout provider-blind，跨 provider 403 | provider 切换后可能误用错误凭证 | **暂无直接修复 PR**；相关方向见 [#52785](https://github.com/nousresearch/hermes-agent/pull/52785)、[#52763](https://github.com/nousresearch/hermes-agent/pull/52763) |
| **P2** | [#52649](https://github.com/nousresearch/hermes-agent/issues/52649) — Windows cp950 下 `UnicodeDecodeError`，导致 zombie cycle | Windows 本地化环境下网关不稳定 | **未见直接 fix PR** |
| **P2** | [#52727](https://github.com/nousresearch/hermes-agent/issues/52727) — 401 后 credential pool exhausted，阻断 provider 切换 | 单次认证错误可能演变为会话级不可恢复 | **有相关修复 PR**：[#52785](https://github.com/nousresearch/hermes-agent/pull/52785)、[#52763](https://github.com/nousresearch/hermes-agent/pull/52763) |
| **P2** | [#52713](https://github.com/nousresearch/hermes-agent/issues/52713) — WhatsApp 配对时报 `ERR_MODULE_NOT_FOUND` | macOS M1 上桥接不可用 | **未见直接 fix PR** |
| **P2** | [#52702](https://github.com/nousresearch/hermes-agent/issues/52702) — WhatsApp crash-loop 仍存在，并连带影响 Telegram | 平台级消息交付风险较高 | **未见直接 fix PR** |
| **P2** | [#52630](https://github.com/nousresearch/hermes-agent/issues/52630) — Anthropic OAuth token exchange 404 | Claude Pro/Max 登录链路失效 | **未见直接 fix PR** |

**稳定性结论：**  
今天的 bug 重点高度集中在 **Desktop 打包/依赖、认证与 credential pool、Windows 编码兼容、网关消息交付** 四个方向；其中桌面端 crash 和 provider 切换问题已经出现对应修复 PR，属于“正在止血”的状态。

## 6. 功能请求与路线图信号
### 明确的新需求
- **[#52598](https://github.com/nousresearch/hermes-agent/issues/52598)** — 更快创建 profile distributions 的开发者工作流  
  这是面向维护者/开发者效率的请求，和当前 profile 体系高度相关。
- **[#52773](https://github.com/nousresearch/hermes-agent/issues/52773)** — `config.yaml` 支持 per-profile default skills  
  反映用户希望把 skills 做成“每个 profile 默认配置”，降低每次启动/切换时的手工成本。
- **[#52766](https://github.com/nousresearch/hermes-agent/issues/52766)** — Discord 的 `free_response_thread_channels`  
  需求非常明确：**不 @mention 但仍保留自动开线程**，说明 Discord 场景下对自然交互和线程管理有细粒度诉求。
- **[#52769](https://github.com/nousresearch/hermes-agent/issues/52769)** — Linux 首次启动自动创建 `.desktop` 和图标  
  典型桌面产品化体验需求，说明 source-built 工作流已被真实用户长期使用。
- **[#52698](https://github.com/nousresearch/hermes-agent/issues/52698)** — 网关媒体上传大小预检  
  偏基础设施体验优化，目标是减少平台上传失败后的“事后报错”。

### 路线图信号判断
结合今天提交的 PR，**下一版本最可能优先收敛稳定性修复**，尤其是：
- Desktop 打包/依赖补齐：[#52776](https://github.com/nousresearch/hermes-agent/pull/52776)、[#52771](https://github.com/nousresearch/hermes-agent/pull/52771)
- provider / credential pool 切换稳定性：[#52785](https://github.com/nousresearch/hermes-agent/pull/52785)、[#52763](https://github.com/nousresearch/hermes-agent/pull/52763)
- 网关事件循环和认证写回问题：[#52761](https://github.com/nousresearch/hermes-agent/pull/52761)、[#52760](https://github.com/nousresearch/hermes-agent/pull/52760)

功能面上，**profile / skills / Discord 线程策略 / Desktop 首次安装体验** 是最清晰的下一阶段需求信号。

## 7. 用户反馈摘要
从 Issues 评论与摘要中，可以提炼出几类真实使用痛点：

- **“更新后不能用”是最强烈的不满。**  
  多名用户都在反馈 Desktop 更新后启动崩溃、ASAR 破损、缺少依赖等问题，说明发布链路对终端用户的容错性还不够。
- **用户非常依赖多平台接入。**  
  反馈覆盖 Desktop、CLI、TUI、Discord、WhatsApp、Signal、Matrix、Telegram，表明 Hermes 已被当作统一助理中枢使用。
- **用户希望更细粒度地控制行为。**  
  例如 per-profile skills、禁用某平台工具集、消息线程策略、媒体限额预检等，说明高级用户想把 Hermes 调成“适合自己工作流的样子”。
- **认证与凭证管理是隐性痛点。**  
  401、token rotation、oauth 404、credential pool exhaustion、provider-blind checkout 等问题，都会放大成“换模型/换 provider 就失灵”的体验问题。
- **总体上，用户对 Hermes 的功能覆盖是认可的，但对稳态运行要求很高。**  
  这类反馈通常意味着产品已经进入实用阶段，接下来比拼的是可靠性和可维护性。

## 8. 待处理积压
> 说明：从本次数据窗看，**真正长期未响应** 的条目不多，更多是 **今日新开但尚未获得评论** 的高优先级项。以下是建议维护者优先 triage 的对象：

- **[#52781](https://github.com/nousresearch/hermes-agent/issues/52781)** — Docker symlink + `chown -R` 高危问题（P1）
- **[#52777](https://github.com/nousresearch/hermes-agent/issues/52777)** — provider-blind credential checkout（P2）
- **[#52773](https://github.com/nousresearch/hermes-agent/issues/52773)** — per-profile default skills（P3）
- **[#52766](https://github.com/nousresearch/hermes-agent/issues/52766)** — Discord free_response_thread_channels（P3）
- **[#52769](https://github.com/nousresearch/hermes-agent/issues/52769)** — Linux 首次启动自动创建桌面项（P3）
- **[#52713](https://github.com/nousresearch/hermes-agent/issues/52713)** — WhatsApp M1 打包缺失依赖（P2）
- **[#52785](https://github.com/nousresearch/hermes-agent/pull/52785)** — provider 切换后刷新 credential pool（关键修复 PR，待合并）
- **[#52761](https://github.com/nousresearch/hermes-agent/pull/52761)** — 网关阻塞修复（P1，建议尽快合入）
- **[#52760](https://github.com/nousresearch/hermes-agent/pull/52760)** — 凭证回写修复（P1，建议尽快合入）

如果你愿意，我也可以把这份日报进一步整理成 **“管理层摘要版 / 技术负责人版 / Slack 通报版”** 三种格式。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-06-26）

## 1) 今日速览
- 截至今日，PicoClaw 过去 24 小时 **没有新增 Issues 活动**，但有 **8 个 PR 更新**，且全部处于 **Open** 状态；同时 **没有新版本发布**。  
- 从内容结构看，今日的活跃度主要集中在 **依赖升级** 与 **稳定性修复**，属于典型的维护型推进，而非功能扩张型推进。  
- 社区讨论热度较低：当前数据中没有 Issues，PR 也几乎没有评论和点赞，说明项目处于 **低噪声、低外部反馈** 的运行状态。  
- 综合判断：项目健康度偏稳，维护动作持续，但 **用户侧互动和版本输出都较弱**。  
- GitHub： [Issues 页面](https://github.com/sipeed/picoclaw/issues) ｜ [Pull Requests 页面](https://github.com/sipeed/picoclaw/pulls) ｜ [Releases 页面](https://github.com/sipeed/picoclaw/releases)

---

## 2) 版本发布
- **今日无新版本发布**。  
- GitHub： [Releases 页面](https://github.com/sipeed/picoclaw/releases)

---

## 3) 项目进展
今日 **没有已合并/已关闭的重要 PR**，因此从“已交付成果”角度看，项目在这 24 小时内 **尚未产生可见的版本产出**。不过，当前 8 个开放 PR 反映出项目的推进方向非常明确：  
- **3 个稳定性修复 PR**：  
  - [#3170 fix(agent): close base64 encoder on io.Copy error path](https://github.com/sipeed/picoclaw/pull/3170)  
  - [#3171 fix(line): add ok checks for sync.Map type assertions in Send](https://github.com/sipeed/picoclaw/pull/3171)  
  - [#3172 fix: explicitly ignore Close() errors in error paths and retry loops](https://github.com/sipeed/picoclaw/pull/3172)  
- **5 个依赖升级 PR**：  
  - [#3173 build(deps): bump modernc.org/sqlite from 1.51.0 to 1.53.0](https://github.com/sipeed/picoclaw/pull/3173)  
  - [#3174 build(deps): bump github.com/line/line-bot-sdk-go/v8 from 8.20.0 to 8.20.1](https://github.com/sipeed/picoclaw/pull/3174)  
  - [#3175 build(deps): bump fyne.io/systray from 1.12.1 to 1.12.2](https://github.com/sipeed/picoclaw/pull/3175)  
  - [#3176 build(deps): bump github.com/mymmrac/telego from 1.9.0 to 1.10.0](https://github.com/sipeed/picoclaw/pull/3176)  
  - [#3177 build(deps): bump github.com/github/copilot-sdk/go from 0.2.0 to 1.0.4](https://github.com/sipeed/picoclaw/pull/3177)  

**整体判断**：项目今天的“前进”主要体现在 **代码健壮性提升和依赖栈更新**，而不是新增功能落地。若这些 PR 后续合并，将显著降低运行时 panic、资源泄漏和依赖陈旧带来的风险。  
- GitHub： [PR 汇总](https://github.com/sipeed/picoclaw/pulls)

---

## 4) 社区热点
- **今日没有形成明显社区热点**：  
  - Issues 数量为 0，且无活跃讨论；  
  - PR 的评论数与点赞数均未体现出显著热度。  
- 从“最值得关注”的角度看，当前最核心的讨论入口其实是这些稳定性修复 PR：  
  - [#3171](https://github.com/sipeed/picoclaw/pull/3171)：防止 `sync.Map` 类型断言引发 panic，属于高价值稳定性修复。  
  - [#3170](https://github.com/sipeed/picoclaw/pull/3170)：修复 base64 encoder 在错误路径上的关闭问题，偏资源管理与可靠性。  
  - [#3172](https://github.com/sipeed/picoclaw/pull/3172)：在错误路径中显式忽略次要 `Close()` 错误，优化错误处理语义。  

**背后诉求**：当前社区关注点更偏向 **可靠性、容错和兼容性维护**，而不是新能力需求。  
- GitHub： [Issues 页面](https://github.com/sipeed/picoclaw/issues) ｜ [PR 页面](https://github.com/sipeed/picoclaw/pulls)

---

## 5) Bug 与稳定性
今日 **没有从 Issues 中观察到新增 Bug 报告**，但从 PR 标题和描述看，存在几类明确的稳定性风险在被主动修复：

### 高优先级
1. [#3171 fix(line): add ok checks for sync.Map type assertions in Send](https://github.com/sipeed/picoclaw/pull/3171)  
   - 风险点：`sync.Map` 取值后直接做类型断言，存在 **panic 风险**。  
   - 影响面：LINE 通道发送逻辑，属于用户可感知的崩溃/中断风险。  
   - 当前状态：**已有 fix PR，未合并**。

### 中高优先级
2. [#3170 fix(agent): close base64 encoder on io.Copy error path](https://github.com/sipeed/picoclaw/pull/3170)  
   - 风险点：`io.Copy` 出错后未调用 `encoder.Close()`，可能导致 **缓冲未刷新、资源泄漏**。  
   - 当前状态：**已有 fix PR，未合并**。

### 中优先级
3. [#3172 fix: explicitly ignore Close() errors in error paths and retry loops](https://github.com/sipeed/picoclaw/pull/3172)  
   - 风险点：错误路径中 `Close()` 返回值可能掩盖主错误，导致 **错误处理噪声增加**。  
   - 当前状态：**已有 fix PR，未合并**。

**结论**：今日没有外部 Bug 反馈，但维护侧已经在主动处理潜在崩溃、资源释放和错误链路问题，说明项目的稳定性治理是当前重点。  
- GitHub： [Issues 页面](https://github.com/sipeed/picoclaw/issues) ｜ [稳定性相关 PR](https://github.com/sipeed/picoclaw/pulls?q=is%3Aopen+label%3Afix)

---

## 6) 功能请求与路线图信号
- **今日未见新的功能需求 Issues**，因此没有来自用户侧的直接路线图输入。  
- 但从依赖更新 PR 可以推断出下一阶段可能更重视 **平台兼容性、生态适配和底层能力升级**：  
  - [#3176](https://github.com/sipeed/picoclaw/pull/3176)：`telego` 升级，且摘要提到 Telegram Bot API v10.1，暗示机器人接口兼容性维护；  
  - [#3174](https://github.com/sipeed/picoclaw/pull/3174)：LINE SDK 更新，说明消息通道侧的维护仍在持续；  
  - [#3177](https://github.com/sipeed/picoclaw/pull/3177)：Copilot SDK 升级，可能关联 AI/辅助编程能力链路；  
  - [#3173](https://github.com/sipeed/picoclaw/pull/3173)：SQLite 升级，偏向持久化层稳定性和兼容性。  

**路线图判断**：近期更可能进入“**底层依赖升级 + 稳定性修补**”阶段，暂未看到明显的新用户功能拉动。  
- GitHub： [PR 页面](https://github.com/sipeed/picoclaw/pulls)

---

## 7) 用户反馈摘要
- **当前没有 Issues 评论数据**，因此无法从真实用户对话中提炼出直接反馈。  
- 从现有 PR 的修复内容，仍可反推出用户可能正在经历的痛点：  
  1. **偶发 panic / 运行时异常** —— 对消息发送流程稳定性敏感；  
  2. **资源未正确释放** —— 长运行场景下对可靠性要求高；  
  3. **错误信息不清晰** —— 希望错误链路更稳定、更可诊断；  
  4. **依赖过旧带来的兼容风险** —— 需要持续跟进第三方 SDK。  

**使用场景推断**：PicoClaw 更像是一个需要长期在线、频繁与外部平台交互的智能体/助手类项目，因此用户对“不中断、少崩溃、少回归”的要求会高于“短期功能炫技”。  
- GitHub： [Issues 页面](https://github.com/sipeed/picoclaw/issues) ｜ [PR 页面](https://github.com/sipeed/picoclaw/pulls)

---

## 8) 待处理积压
- **长期未响应的重要 Issue：无**（当前 Issues 为 0）。  
- **当前积压主要来自 8 个开放 PR**，且都还是新鲜提交，没有明显“久拖未决”的迹象；不过从维护优先级看，建议优先处理以下修复类 PR：  
  1. [#3171](https://github.com/sipeed/picoclaw/pull/3171) —— 潜在 panic 风险，优先级最高；  
  2. [#3170](https://github.com/sipeed/picoclaw/pull/3170) —— 资源关闭路径修复；  
  3. [#3172](https://github.com/sipeed/picoclaw/pull/3172) —— 错误处理语义优化。  

- 其余 5 个依赖升级 PR 建议在完成关键修复后统一评估合并，以降低依赖升级引入的连锁回归风险：  
  - [#3173](https://github.com/sipeed/picoclaw/pull/3173)  
  - [#3174](https://github.com/sipeed/picoclaw/pull/3174)  
  - [#3175](https://github.com/sipeed/picoclaw/pull/3175)  
  - [#3176](https://github.com/sipeed/picoclaw/pull/3176)  
  - [#3177](https://github.com/sipeed/picoclaw/pull/3177)  

- GitHub： [开放 PR 列表](https://github.com/sipeed/picoclaw/pulls) ｜ [Issues 列表](https://github.com/sipeed/picoclaw/issues)

---

## 结论
PicoClaw 在 2026-06-26 的状态可以概括为：**无版本发布、无 Issues 活动、PR 端活跃但讨论稀薄**。项目当前的主线不是新增功能，而是围绕 **稳定性修复、错误处理加固和依赖更新** 做维护性推进。若这些 PR 后续集中合并，项目健康度会进一步提升；但就今天而言，**外部可见产出仍然有限**。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下为 **NanoClaw（qwibitai/nanoclaw）** 的 **2026-06-26 项目动态日报**。  
整体看，项目今日处于 **中高活跃度**：过去 24 小时有 **1 条 Issue 新增/活跃**、**5 条 PR 更新**，其中 **2 条 PR 已关闭**，但 **暂无新版本发布**。当前演进重心明显偏向 **稳定性修复、迁移兼容、安装体验与运行时安全/可观测性**，属于“持续打磨、面向落地”的健康状态。

---

## 1. 今日速览

- 今日社区与维护活动主要集中在 **PR 驱动的代码改进**，而非版本发布或大规模讨论。
- 5 条 PR 中有 3 条仍待合并，说明项目仍在快速迭代，且合入门槛较高，维护者正在收敛关键修复。
- 已关闭/收口的 PR 聚焦在 **容器资源限制** 与 **认证容错策略**，表明项目在往更稳健、更可运维的方向推进。
- 新增 Issue 反映出真实使用场景中的 **审批流程单点依赖** 问题，属于典型的生产可用性诉求。
- 综合判断：项目今日活跃度 **中等偏高**，健康度良好，当前风险更多来自 **兼容性与运维复杂度**，而非功能停滞。

---

## 2. 项目进展

### 今日已关闭/收口的关键 PR
1. **[PR #2856] feat(container): per-container CPU/memory limits (opt-in)**  
   链接：<https://github.com/qwibitai/nanoclaw/pull/2856>  
   进展意义：为每个 agent 容器提供可选的 CPU / 内存限制，能有效降低“单个容器抢占宿主机资源”的风险。  
   项目收益：增强多 agent 场景下的 **资源隔离与稳定性**，对生产部署价值很高。

2. **[PR #2855] feat(auth): subscription-primary credential posture with API-key failover**  
   链接：<https://github.com/qwibitai/nanoclaw/pull/2855>  
   进展意义：将 Claude 订阅 OAuth 作为主路径，并支持 API Key 热备故障切换。  
   项目收益：显著提升 **认证连续性与故障恢复能力**，减少人工切换带来的操作风险。

### 今日仍在推进的开放 PR
3. **[PR #2859] fix(migrate-v2): don't SELECT is_main from v1 registered_groups**  
   链接：<https://github.com/qwibitai/nanoclaw/pull/2859>  
   价值：修复旧 v1 安装升级到 v2 时的迁移崩溃问题，属于高优先级兼容修复。

4. **[PR #2860] chore(logging): silence libsignal session debug spam (incl. key material)**  
   链接：<https://github.com/qwibitai/nanoclaw/pull/2860>  
   价值：清理 libsignal 会话中的调试日志噪声，且涉及潜在敏感信息暴露风险，属于安全与可观测性双重优化。

5. **[PR #2858] fix(add-clidash): apply install and engine fixes**  
   链接：<https://github.com/qwibitai/nanoclaw/pull/2858>  
   价值：修复 clidash 安装步骤和 Node 版本要求，改善新环境落地成功率。

### 整体推进判断
- 今日项目推进不在“新功能爆发”，而在 **把已有能力做稳、做可部署、做可迁移**。
- 从已关闭 PR 看，项目至少在 **资源隔离**、**认证高可用** 两个方面完成了关键收口。
- 从开放 PR 看，下一步重点很可能落在 **迁移兼容、安装可重复性、日志安全**。

---

## 3. 社区热点

### 今日没有明显高互动热点
- 今日可见条目中，**Issue/PR 评论数均为 0 或未披露**，没有形成明显的讨论爆点。
- 这意味着当前社区热度更多体现在 **开发提交** 而非 **公开讨论**。

### 仍值得关注的“主题性热点”
1. **审批流程的可用性问题**  
   [Issue #2857] approval should support multi admins and terminal cli approvals  
   链接：<https://github.com/qwibitai/nanoclaw/issues/2857>  
   分析：用户希望审批请求不再绑定单一管理员，而是支持多管理员轮询/切换，以及通过 CLI 在终端上完成审批。  
   背后的诉求：**减少审批单点故障，提高值守与应急场景下的响应效率**。

2. **迁移与安装体验的稳定性**
   - [PR #2859](https://github.com/qwibitai/nanoclaw/pull/2859)
   - [PR #2858](https://github.com/qwibitai/nanoclaw/pull/2858)  
   分析：这类 PR 虽然不是“讨论热点”，但往往最接近真实用户痛点，尤其是首次部署与版本升级场景。

3. **运行日志与敏感信息治理**
   - [PR #2860](https://github.com/qwibitai/nanoclaw/pull/2860)  
   分析：日志噪声和潜在 key material 暴露属于典型运维风险点，说明项目正在向更严格的生产标准靠拢。

---

## 4. Bug 与稳定性

以下按严重程度排序：

### 1) 高严重度：旧版本升级到 v2 时迁移失败
- **[PR #2859]** fix(migrate-v2): don't SELECT is_main from v1 registered_groups  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2859>  
  问题概述：旧 v1 安装中 `registered_groups` 可能没有 `is_main` 列，导致迁移步骤直接崩溃，进而影响 v2.db 创建以及后续 sessions/tasks 流程。  
  影响：**升级阻断级问题**，对老用户影响最大。  
  是否已有 fix：**有，已提交修复 PR**（当前仍 OPEN）。

### 2) 中高严重度：会话日志中出现调试噪声，且可能包含敏感信息
- **[PR #2860]** chore(logging): silence libsignal session debug spam (incl. key material)  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2860>  
  问题概述：libsignal 依赖中存在会话开关时的 debug 输出，且摘要明确提到“incl. key material”。  
  影响：既影响日志可读性，也存在 **安全合规风险**。  
  是否已有 fix：**有，修复 PR 已提交**（当前仍 OPEN）。

### 3) 中度：新环境安装/初始化容易失败
- **[PR #2858]** fix(add-clidash): apply install and engine fixes  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2858>  
  问题概述：fresh checkout 下缺少 `tools` 目录、Node 版本要求未明确等，会导致安装或运行失败。  
  影响：影响 **新用户接入与 CI/本地复现**。  
  是否已有 fix：**有，修复 PR 已提交**（当前仍 OPEN）。

### 4) 低到中度：审批请求存在单管理员单点
- **[Issue #2857]** approval should support multi admins and terminal cli approvals  
  链接：<https://github.com/qwibitai/nanoclaw/issues/2857>  
  问题概述：当前审批请求只发给单个管理员，若其不在线，其他管理员无法代审批。  
  影响：更偏 **流程可用性问题**，在紧急操作场景下可能升级为效率瓶颈。  
  是否已有 fix：**尚未看到对应 PR**。

---

## 5. 功能请求与路线图信号

### 今日最明确的新需求
1. **多管理员审批 + CLI 审批**
- **[Issue #2857]**  
  链接：<https://github.com/qwibitai/nanoclaw/issues/2857>  
  信号判断：这是非常典型的“从单人工作流走向团队协作”的需求，属于较强的路线图信号。  
  可能优先级：如果 NanoClaw 面向生产/团队部署，这一需求 **很可能进入下一阶段规划**。

### 与现有 PR 形成的路线图关联
- **[PR #2855]** 认证主备切换  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2855>  
  说明：说明项目已在补齐“可用性”和“故障恢复”能力，多管理员审批与之方向一致，都是提升运营连续性。

- **[PR #2856]** 容器 CPU/内存限制  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2856>  
  说明：表示项目正在补生产部署能力；审批体系的多管理员支持属于同一类“企业化/团队化”能力增强。

- **[PR #2858]、[PR #2859]** 安装与迁移修复  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2858>  
  链接：<https://github.com/qwibitai/nanoclaw/pull/2859>  
  说明：路线图正在向“更容易升级、更容易安装、更不易失败”的基础体验侧收敛。

### 可能纳入下一版本的方向
- 多管理员审批路由
- CLI 审批入口
- 旧版本迁移兼容增强
- 安装/初始化自动修复
- 日志脱敏与噪声控制

---

## 6. 用户反馈摘要

> 说明：今日 Issue 评论数为 0，因此以下为基于标题/摘要提炼的“显性诉求”，不是评论逐字总结。

### 真实痛点
- **审批流程依赖单个管理员**，导致实际工作流容易卡住。  
  来源：<https://github.com/qwibitai/nanoclaw/issues/2857>

- **旧用户升级成本高**，迁移脚本对历史字段变化不够鲁棒。  
  来源：<https://github.com/qwibitai/nanoclaw/pull/2859>

- **日志噪声干扰排障，且可能泄露敏感信息**，影响安全与可维护性。  
  来源：<https://github.com/qwibitai/nanoclaw/pull/2860>

- **新环境部署容易踩坑**，fresh checkout / Node 版本 / 目录准备不足。  
  来源：<https://github.com/qwibitai/nanoclaw/pull/2858>

### 使用场景画像
- 团队协作审批
- 老版本平滑升级
- 多 agent 共享宿主机部署
- 需要审计、可观测、低噪声日志的生产环境

### 用户满意/不满意信号
- 满意点：维护者持续处理基础设施问题，说明项目对可用性很重视。
- 不满意点：当前仍存在 **升级、安装、审批路径** 等“首要落地环节”的摩擦。

---

## 7. 待处理积压

### 当前未见“长期未响应”的老问题
- 按本次数据，所有列出的 Issue/PR 创建时间均为 **2026-06-25 至 2026-06-26**，**暂无明显长期积压项**。

### 但以下开放项值得优先盯住
1. **[Issue #2857]** 多管理员审批与 CLI 审批  
   链接：<https://github.com/qwibitai/nanoclaw/issues/2857>  
   原因：这是清晰的用户流程痛点，若不及时跟进，容易演化为持续性反馈。

2. **[PR #2859]** 迁移兼容修复  
   链接：<https://github.com/qwibitai/nanoclaw/pull/2859>  
   原因：升级阻断类问题应尽快完成合入与回归验证。

3. **[PR #2860]** 日志脱敏/降噪  
   链接：<https://github.com/qwibitai/nanoclaw/pull/2860>  
   原因：涉及潜在敏感信息，建议优先审查。

4. **[PR #2858]** 安装与引擎修复  
   链接：<https://github.com/qwibitai/nanoclaw/pull/2858>  
   原因：影响新用户首轮体验，若不尽快落地，会形成新的安装类反馈。

---

### 总体结论
NanoClaw 今日表现出典型的“**稳定性增强期**”特征：没有新版本，但 PR 活动密集，且多项工作围绕 **资源限制、认证容错、迁移兼容、安装修复、日志安全** 展开。  
从健康度看，项目治理方向清晰，问题也较集中，说明维护节奏正常；从风险看，当前最需要关注的是 **升级兼容与运维安全**，而不是功能缺失本身。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-06-26）

## 1. 今日速览
今天 IronClaw 的更新非常活跃：过去 24 小时内有 **33 条 Issues 更新**、**40 条 PR 更新**，但 **没有新版本发布**。从内容看，主线明显集中在 **Reborn 能力策略（capability-policy）**、**自动化/调度稳定性**、**WebUI 体验修补** 三个方向，说明项目仍处于高频迭代和架构收敛阶段。  
今日已关闭/合并的 PR 达 **19 条**，从可见条目看，项目在权限、会话绑定、提示词安全、存储性能等方面都有实质推进，整体开发动能偏强。  
不过，新的自动化线程绑定失败、调度心跳误判、消息路由错位等问题仍在出现，说明 **稳定性与一致性** 仍是当前最需要优先压住的风险面。  
项目健康度判断：**开发活跃，高于平均；功能推进快，但运行时可靠性仍在补课。**

---

## 2. 版本发布
今日 **无新 Release**。  
- 最新 Releases：无  
- 影响：当前更像是“持续集成/持续修复”的开发窗口，尚未形成可对外宣布的版本收敛点。

---

## 3. 项目进展
今日已关闭/合并的 PR 中，以下几类进展最值得关注：

### 3.1 WebUI 权限与工具审批开始落地
- [#5256](https://github.com/nearai/ironclaw/pull/5256) — **feat(reborn): expose user-scoped tool settings**  
  为 WebUI v2 增加了认证用户可见的工具审批设置接口，直接修复了“普通用户无法管理工具权限”的问题，关联 [#5242](https://github.com/nearai/ironclaw/issues/5242)。
- [#5251](https://github.com/nearai/ironclaw/pull/5251) — **[codex] add user-scoped WebUI tool approvals**  
  与上面的 PR 同主题，进一步补齐了全局自动批准、持久化审批、工具级覆盖等能力。  
**意义**：这是 Reborn 权限体系从“只靠 operator 配置”走向“用户可操作”的关键一步。

### 3.2 提示词/技能内容安全策略正在松绑，减少误伤
- [#5254](https://github.com/nearai/ironclaw/pull/5254) — **fix(turns): remove prompt-assembly content denylist (#5169)**
- [#5258](https://github.com/nearai/ironclaw/pull/5258) — **fix(turns): exempt certified skill content from prompt content denylist (#5169)**  
这两项都在修复“无害请求被误判为系统错误”的问题，尤其是技能链加载后触发 denylist 的误杀。  
**意义**：直接改善模型任务可执行率，减少“看起来像平台故障”的假失败。

### 3.3 存储与路径访问性能在优化
- [#5255](https://github.com/nearai/ironclaw/pull/5255) — **fix(filesystem): fold CAS put directory pre-check into one statement (3→1 round-trip)**  
把 Postgres CAS 写入路径上的多次 round-trip 压缩为一次，属于非常实用的热路径优化。  
**意义**：减少存储层延迟，尤其对频繁写入的 turn/event 场景有直接价值。

### 3.4 会话持久化和运行时一致性继续补齐
- [#5252](https://github.com/nearai/ironclaw/pull/5252) — **fix(reborn): persist Slack host conversation bindings**  
  修复 Slack host 会话绑定在重启后的丢失问题，提升跨重启的一致性。
- [#5211](https://github.com/nearai/ironclaw/issues/5211) / [#5212](https://github.com/nearai/ironclaw/issues/5212)  
  这两类 UI 问题已关闭，分别涉及自动滚动和时间戳显示，说明团队也在持续处理基础交互体验。

### 3.5 当前推进幅度判断
从今日可见的关闭项来看，IronClaw 不是只在修小 bug，而是在同时推进：
- **用户权限模型**
- **运行时状态一致性**
- **调度/自动化可靠性**
- **存储性能**
- **WebUI 可用性**

这意味着项目的“前进”不是单点修复，而是朝着更完整的 Reborn 平台能力在收敛。

---

## 4. 社区热点
今天讨论最集中的主题，基本都围绕 **Reborn 自动化、权限和线程/会话一致性**。虽然单条 Issues/PR 的评论数都不高，但问题密度很集中。

### 4.1 自动化调度线程绑定失败
- [#5276](https://github.com/nearai/ironclaw/issues/5276) — **Scheduled automation fails with "No thread attached" (Daily PR Digest, 0% success)**  
  当前最“显眼”的问题之一：定时自动化每次运行都报 “No thread attached”，导致 0% success。  
  **背后诉求**：自动化任务必须稳定关联到 conversation thread，否则日常运营类 automation 没法用。

### 4.2 权限设置要能真正持久化
- [#5243](https://github.com/nearai/ironclaw/issues/5243) — **"Approve & always allow" does not persist tool permission to Settings > Tools**
- [#5242](https://github.com/nearai/ironclaw/issues/5242) — **Tools page under Settings shows operator-only tools error for WebUI users**  
  这两条都反映出同一个诉求：**非 operator 用户也要能管理自己的工具授权，而且设置要保存成功**。  
  **背后诉求**：WebUI 必须支持真实使用场景，而不是只适配内部运维身份。

### 4.3 Reborn 权限与能力策略成为核心讨论方向
- [#5261](https://github.com/nearai/ironclaw/issues/5261) — **[EPIC] Reborn capability policy: admin-shared tools & skills with per-user auth**
- [#5262](https://github.com/nearai/ironclaw/pull/5262)
- [#5277](https://github.com/nearai/ironclaw/pull/5277)  
  这条主线的热度来自它不是单一 bug，而是平台级能力建设：谁能看见什么工具、谁能授权、管理员如何下发策略。  
  **背后诉求**：多用户、公司内共享、按用户授权，是 Reborn 从 demo 走向生产的必经路径。

### 4.4 热点结论
今天社区关注点并不分散，几乎都聚焦在：
1. **自动化是否可靠**
2. **权限是否可控且可持久**
3. **WebUI 是否足够像一个真正可用的产品**

---

## 5. Bug 与稳定性
按严重程度排序如下：

### 5.1 高严重：定时自动化每次失败，线程未绑定
- [#5276](https://github.com/nearai/ironclaw/issues/5276) — **Scheduled automation fails with "No thread attached"**
- 影响：自动化任务记录创建了，但无法挂到 conversation thread，导致无输出、0% success。  
- 状态：**未见对应 fix PR**。  
- 评价：这是当前最直接影响自动化可用性的阻断级问题。

### 5.2 高严重：自动化设置阶段 HostUnavailable
- [#5231](https://github.com/nearai/ironclaw/issues/5231) — **Automation setup fails with HostUnavailable at planned driver prompt stage**
- 影响：自动化在计划驱动提示阶段直接失败。  
- 状态：**未见对应 fix PR**。  
- 评价：影响新自动化配置的落地，是流程级失败。

### 5.3 中高严重：过期心跳被误判为 runner failure
- [#5239](https://github.com/nearai/ironclaw/issues/5239) — **Scheduler treats stale terminal heartbeat as runner failure**
- 影响：运行其实已终态，但调度器仍错误地走失败分支，制造假告警/假故障。  
- 状态：**未见对应 fix PR**。  
- 评价：会污染稳定性指标，也可能触发错误补救逻辑。

### 5.4 中严重：失败消息挂到错误的 conversation turn
- [#5227](https://github.com/nearai/ironclaw/issues/5227) — **Run failure messages may attach to the wrong conversation turn**
- 影响：会误导用户，以为后一个输入触发了失败。  
- 状态：**未见对应 fix PR**。  
- 评价：这是明显的可观测性/可解释性问题，会损害用户信任。

### 5.5 中严重：WebUI 调试日志可能淹没 Railway
- [#5237](https://github.com/nearai/ironclaw/issues/5237) — **Reborn hosted debug logging floods Railway with Cranelift/Wasmtime compiler DEBUG output**
- 影响：日志量过大，可能带来成本和排障噪声。  
- 状态：**未见对应 fix PR**。  
- 评价：偏稳定性与运维风险，短期应尽快收敛。

### 5.6 已修复/已关闭：工具权限与 UI 交互问题
- [#5242](https://github.com/nearai/ironclaw/issues/5242) — **Settings page shows operator-only tools error**
  - 对应修复：[#5256](https://github.com/nearai/ironclaw/pull/5256)、[#5251](https://github.com/nearai/ironclaw/pull/5251)
- [#5243](https://github.com/nearai/ironclaw/issues/5243) — **Approve & always allow does not persist tool permission**
  - 同主题修复已在 [#5251](https://github.com/nearai/ironclaw/pull/5251) / [#5256](https://github.com/nearai/ironclaw/pull/5256) 方向上推进  
- [#5211](https://github.com/nearai/ironclaw/issues/5211)、[#5212](https://github.com/nearai/ironclaw/issues/5212)  
  - 已关闭，属于基础体验修补。  

---

## 6. 功能请求与路线图信号
今天出现的功能请求里，最强的路线图信号来自 **Reborn capability-policy** 方向：

### 6.1 Reborn capability-policy 很可能是下一阶段主线
- [#5261](https://github.com/nearai/ironclaw/issues/5261) — **EPIC: Reborn capability policy**
- [#5262](https://github.com/nearai/ironclaw/pull/5262) — policy foundation + crate
- [#5263](https://github.com/nearai/ironclaw/pull/5263) — per-capability default-policy source
- [#5266](https://github.com/nearai/ironclaw/issues/5266) / [#5270](https://github.com/nearai/ironclaw/pull/5270) — DB-backed user role + admin gate
- [#5267](https://github.com/nearai/ironclaw/issues/5267) / [#5277](https://github.com/nearai/ironclaw/pull/5277) — availability resolver at dispatch seam
- [#5268](https://github.com/nearai/ironclaw/issues/5268) — admin REST surface
- [#5272](https://github.com/nearai/ironclaw/issues/5272) — minimal multi-user local auth

**判断**：这条线非常像“下一版核心能力”，因为它把“管理员配置”真正转化成“用户实际可见/可用的工具面”。

### 6.2 记忆与自学习仍是长期方向
- [#5260](https://github.com/nearai/ironclaw/issues/5260) — Reborn personal memory & self-learning
- [#5264](https://github.com/nearai/ironclaw/issues/5264) — memory follow-ups  
**判断**：这更像中长期能力，短期可能继续以基础设施和存储策略为主。

### 6.3 产品体验类需求也在持续进入队列
- [#5278](https://github.com/nearai/ironclaw/pull/5278) — Logs 页面可滚动
- [#5275](https://github.com/nearai/ironclaw/pull/5275) — 修复 Logs 链接 basename 重复
- [#5279](https://github.com/nearai/ironclaw/pull/5279) — 队列消息 steering 改进  
**判断**：这些不是“宏大路线图”，但都说明 Reborn 正在向可日常使用的产品形态靠拢。

---

## 7. 用户反馈摘要
从 Issues 中能提炼出几类真实用户痛点：

### 7.1 自动化必须稳定、可解释
- 代表问题：[#5276](https://github.com/nearai/ironclaw/issues/5276)、[#5231](https://github.com/nearai/ironclaw/issues/5231)  
- 用户场景：定时 PR Digest、仓库监控、自动通知。  
- 痛点：运行记录有了，但线程没挂上、驱动阶段失败、结果不可见。  
- 真实诉求：**自动化任务不能“看起来跑了”，而是必须真正能产出和归档。**

### 7.2 权限系统要符合真实多用户场景
- 代表问题：[#5242](https://github.com/nearai/ironclaw/issues/5242)、[#5243](https://github.com/nearai/ironclaw/issues/5243)、[#5261](https://github.com/nearai/ironclaw/issues/5261)  
- 用户场景：普通 WebUI 用户、团队共享工具、管理员授权。  
- 痛点：页面报 operator-only、授权不持久、权限边界不清晰。  
- 真实诉求：**用户自己的工具权限应可见、可改、可保存。**

### 7.3 界面和日志可用性直接影响信任
- 代表问题：[#5211](https://github.com/nearai/ironclaw/issues/5211)、[#5212](https://github.com/nearai/ironclaw/issues/5212)、[#5278](https://github.com/nearai/ironclaw/pull/5278)、[#5275](https://github.com/nearai/ironclaw/pull/5275)  
- 用户场景：长回答、日志调试、后台排查。  
- 痛点：不自动滚动、时间戳不稳定、日志页不能滚动、链接路径错误。  
- 真实诉求：**产品层基本体验要稳定，否则用户会把平台当成“不可靠”。**

### 7.4 失败信息不应误导
- 代表问题：[#5227](https://github.com/nearai/ironclaw/issues/5227)、[#5239](https://github.com/nearai/ironclaw/issues/5239)  
- 痛点：失败被挂到错误 turn、过期心跳被误判。  
- 真实诉求：**状态机和展示层必须一致，否则排障成本很高。**

---

## 8. 待处理积压
下面这些是今天最值得维护者持续盯住的高优先级未结项，基本都属于“平台级基础设施/权限/稳定性”：

- [#5261](https://github.com/nearai/ironclaw/issues/5261) — Reborn capability policy epic  
- [#5262](https://github.com/nearai/ironclaw/pull/5262) — capability-policy foundation  
- [#5266](https://github.com/nearai/ironclaw/issues/5266) — Reborn DB-backed user role + admin gate  
- [#5267](https://github.com/nearai/ironclaw/issues/5267) — availability resolver at dispatch seam  
- [#5268](https://github.com/nearai/ironclaw/issues/5268) — admin REST surface  
- [#5272](https://github.com/nearai/ironclaw/issues/5272) — minimal multi-user local auth  
- [#5274](https://github.com/nearai/ironclaw/issues/5274) — runner-lease sidecar CAS loops consolidation  
- [#5253](https://github.com/nearai/ironclaw/issues/5253) — heartbeat lease write-behind  
- [#5214](https://github.com/nearai/ironclaw/issues/5214) — hardened HTTP client enforcement for all LLM providers  
- [#5213](https://github.com/nearai/ironclaw/issues/5213) — large-context / large-output timeout stack issue  

**提醒**：这些条目大多不是“边角优化”，而是直接影响 Reborn 能否进入更稳定、更可扩展的下一阶段。若后续仍没有快速合并或明确分工，自动化、权限和运行时一致性风险会继续累积。

---

如果你愿意，我可以把这份日报进一步整理成：
1. **更适合内部周报的精简版**，或  
2. **带“重点风险 / 下步建议”结论的管理层摘要版**。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-06-26）

## 1. 今日速览
过去 24 小时，LobsterAI 主要呈现“**工程修复密集、社区讨论清淡**”的状态：共处理 **8 条 PR**，且全部已关闭/合并，说明仓库在持续推进质量修复与体验打磨。  
本日 **Issues 侧无新增、无活跃、无关闭**，没有公开的问题反馈噪音，侧面反映当前用户侧压力不高。  
变更重心集中在 **OpenClaw 运行链路、cowork/plan mode 展示稳定性、启动项同步、子代理会话同步** 等核心路径，属于对产品可靠性的实质性增强。  
综合来看，项目当前活跃度可评为 **中高（开发活跃、社区互动偏低）**，健康度偏稳。

---

## 2. 版本发布
**今日无新版本发布。**  
（无 Releases，故不展开版本说明）

---

## 3. 项目进展
今日的 8 个 PR 全部完成合并/关闭，推进点主要集中在以下几类：

### A. 系统设置与启动行为更可靠
- **#2206** 修复启动项状态与操作系统不一致的问题，避免“本地显示已开启但系统实际未生效”的错配。  
  同时补齐 Windows 历史参数清理、诊断日志和本地化失败提示，属于典型的高优先级可靠性修复。  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2206

### B. cowork / plan mode 的展示与解析更稳定
- **#2204** 让 block-level 的 `proposed_plan` 标签优先于行内标签 mention，避免 GLM plan mode 把标签“泄漏”到消息正文里。  
  这直接改善了 plan card 的真实性与可读性。  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2204
- **#2200** 将轻微的 snapshot 长度回退识别为 stream jitter，减少 Qwen plan mode 的重复可见计划消息。  
  这类修复对对话流体验很关键。  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2200
- **#2205** 更新 plan mode 图标，属于 UI 层的视觉一致性优化。  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2205

### C. OpenClaw 扩展与插件管理链路更完整
- **#2203** 解决本地扩展条目预编译加载问题，让 packaged runtime 能正确落到 `index.js` 等入口；同时强化打包检查。  
  这对扩展系统的可部署性影响较大。  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2203
- **#2202** 将 bundled browser plugin 纳入 managed OpenClaw plugin entries，并加入 `plugins.allow` 白名单，避免在严格 allowlist 下浏览器控制失效。  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2202

### D. 会话同步与子代理生命周期更健壮
- **#2201** 避免 `sessions_yield` 后最终历史同步重复 assistant 内容，减少可见回复重复与思考块重复。  
  这是对多轮上下文一致性的关键修复。  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2201
- **#2199** 在父会话完成后，仍继续轮询运行中的子代理，直到其终态稳定，并对延迟终态做补刷。  
  这提升了多子代理场景下的结果完整性。  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2199

### 综合判断
今天的合并内容几乎全部属于 **“修稳定性、修一致性、修多代理流程”**，没有明显的大功能开关，但对用户真实体验的改善是连续且明确的。  
从影响面看，项目至少在 **启动项、对话渲染、计划模式、OpenClaw、子代理同步** 五条主链路上完成了加固，说明整体正在向“可用性与可靠性优先”的成熟阶段推进。

---

## 4. 社区热点
### 今日无明显高热讨论
- **Issues：0 条更新**，无新增也无活跃讨论。  
  Issues 列表： https://github.com/netease-youdao/LobsterAI/issues
- **PR：评论数均未体现有效活跃，点赞均为 0**，因此没有可识别的“评论最多 / 反应最多”热点线程。

### 讨论特征分析
当前社区互动热点不突出，说明：
1. **问题主要在开发侧被快速修复**，没有形成公开争议；
2. **讨论更像是代码合并流程内完成**，而非开放式需求收集；
3. 项目今日的公开可见噪音较低，整体维护节奏偏稳。

---

## 5. Bug 与稳定性
以下按影响严重程度排序：

### 高优先级
1. **#2206 启动项状态与 OS 不同步**
   - 风险：用户看到的开机自启状态可能与系统真实状态不一致，直接影响启动行为可信度。
   - 状态：**已有 fix PR**
   - 链接： https://github.com/netease-youdao/LobsterAI/pull/2206

2. **#2201 历史同步重复 assistant 内容**
   - 风险：对话历史出现重复可见回复，影响上下文准确性，容易引发误判。
   - 状态：**已有 fix PR**
   - 链接： https://github.com/netease-youdao/LobsterAI/pull/2201

3. **#2199 父会话结束后子代理轮询中断/遗漏**
   - 风险：子代理结果可能未及时收敛，影响多代理任务的完成质量。
   - 状态：**已有 fix PR**
   - 链接： https://github.com/netease-youdao/LobsterAI/pull/2199

### 中优先级
4. **#2202 浏览器插件在 allowlist 下被误禁用**
   - 风险：浏览器控制能力在受限配置下失效，影响 OpenClaw 核心功能。
   - 状态：**已有 fix PR**
   - 链接： https://github.com/netease-youdao/LobsterAI/pull/2202

5. **#2204 plan mode 解析错误导致标签泄漏**
   - 风险：计划内容展示失真，降低 AI 输出可信度与可读性。
   - 状态：**已有 fix PR**
   - 链接： https://github.com/netease-youdao/LobsterAI/pull/2204

6. **#2200 流式抖动导致重复计划消息**
   - 风险：重复消息影响对话流畅度，但通常不致命。
   - 状态：**已有 fix PR**
   - 链接： https://github.com/netease-youdao/LobsterAI/pull/2200

### 低到中优先级
7. **#2203 本地扩展入口预编译加载异常**
   - 风险：扩展打包/运行链路不稳定，影响扩展交付与可维护性。
   - 状态：**已有 fix PR**
   - 链接： https://github.com/netease-youdao/LobsterAI/pull/2203

> 说明：今日无 Issues，因此本节的“Bug”主要依据已合并 PR 所修复的问题来归类。

---

## 6. 功能请求与路线图信号
### 今日没有显式新功能 Issue
由于 **Issues 更新为 0**，本日没有观察到可直接归类的用户功能请求。

### 但从 PR 方向可读出的路线图信号
以下方向很可能会继续进入下一阶段迭代：
- **plan mode / cowork 的交互稳定性与可视化一致性**  
  相关：#2204、#2205、#2200  
  链接：  
  https://github.com/netease-youdao/LobsterAI/pull/2204  
  https://github.com/netease-youdao/LobsterAI/pull/2205  
  https://github.com/netease-youdao/LobsterAI/pull/2200

- **OpenClaw 扩展与插件管理能力**  
  相关：#2202、#2203  
  链接：  
  https://github.com/netease-youdao/LobsterAI/pull/2202  
  https://github.com/netease-youdao/LobsterAI/pull/2203

- **会话/子代理生命周期健壮性**  
  相关：#2201、#2199  
  链接：  
  https://github.com/netease-youdao/LobsterAI/pull/2201  
  https://github.com/netease-youdao/LobsterAI/pull/2199

- **系统设置与平台一致性**  
  相关：#2206  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2206

### 结论
这些更像是 **“产品可用性升级”** 而不是全新大功能，但对下一版本的用户体感会有明显拉升。

---

## 7. 用户反馈摘要
### 基于今日数据，暂无可用的 Issues 评论样本
由于本日 **无 Issues 更新**，也没有可见评论串，因此无法从评论中直接提炼“真实用户原声”。

### 仅从修复方向反推的用户痛点
若把 PR 作为用户反馈信号，可以归纳出以下典型痛点：
- **设置状态与真实系统行为不一致**：用户会质疑“看起来开了，但实际上没生效”。  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2206
- **对话内容重复、计划消息重复**：用户对 AI 输出的连贯性非常敏感。  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2201  
  https://github.com/netease-youdao/LobsterAI/pull/2200
- **计划模式内容展示不准确**：计划文本一旦被标签污染，会直接影响用户对结果的信任。  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2204
- **子代理任务结果不完整**：复杂任务场景下，用户需要稳定收敛而不是“父任务结束但子任务还没真正完”。  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2199
- **插件/扩展权限过严导致功能失效**：偏企业或受限环境用户对 allowlist 很敏感。  
  链接： https://github.com/netease-youdao/LobsterAI/pull/2202  
  https://github.com/netease-youdao/LobsterAI/pull/2203

---

## 8. 待处理积压
### 当前未识别到明显长期积压项
从今日提供的数据看：
- **Issues 无更新**
- **PR 全部已关闭/合并**
- **无待合并 PR**

因此，**没有可明确判定的长期未响应积压**。

### 维护建议
虽然表面上“零积压”，但仍建议持续关注以下高频风险面：
- 会话同步与重复消息问题
- plan mode / cowork 渲染链路
- OpenClaw 扩展与插件 allowlist
- 启动项与系统状态一致性

仓库问题列表： https://github.com/netease-youdao/LobsterAI/issues  
PR 列表： https://github.com/netease-youdao/LobsterAI/pulls

---

## 总体结论
LobsterAI 今日呈现出典型的 **“低讨论、高修复”** 状态：没有新 Issues、没有新版本，但 8 个 PR 覆盖了多个关键链路，且都已收敛，说明项目维护节奏稳定、工程推进有效。  
从项目健康度看，当前没有显著社区风险信号，反而显示出较强的问题修复能力；下一阶段值得关注的是这些稳定性修复能否尽快汇总成版本发布，以便让用户侧感知到完整收益。

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

# CoPaw 项目动态日报（2026-06-26）

## 1. 今日速览
过去 24 小时，CoPaw 相关仓库呈现**高活跃、以修复和重构为主**的状态：Issues 更新 9 条，只有 1 条关闭，说明用户反馈仍在持续进入；PR 更新 25 条，其中 15 条待合并，协作节奏明显偏快。  
今日没有新版本发布，项目推进主要依赖 PR 合并和问题修复，而非正式 Release 驱动。  
从议题分布看，社区关注点集中在**跨平台兼容、浏览器工具稳定性、模型/Provider 识别准确性、Runtime 2.0 迁移**等“基础能力”上，说明项目当前处于“补稳定性与补兼容”的阶段。  
整体判断：项目热度高、反馈密集，健康度处于**积极活跃但稳定性压力较大**的区间。

---

## 2. 项目进展
今日已合并/关闭的 PR 主要集中在以下方向，说明项目在多个核心模块同步推进：

- **技能页与知识管理 UI 重构**
  - [#5521](https://github.com/agentscope-ai/QwenPaw/pull/5521) `feat(skills): split Skills page into enabled/disabled sections`
  - [#5532](https://github.com/agentscope-ai/QwenPaw/pull/5532) `fix(skillpool): restore SkillPool styles after PR #5521`  
  这组改动提升了技能管理页面的可读性和维护性，属于明显的产品体验优化。

- **Inbox / 消息过滤能力增强**
  - [#5522](https://github.com/agentscope-ai/QwenPaw/pull/5522) `feat(inbox): add source type filter for push messages`  
  让用户可以按 Cron / Heartbeat / Memory 等来源筛消息，提升消息处理效率。

- **模型与 Provider 兼容性**
  - [#5519](https://github.com/agentscope-ai/QwenPaw/pull/5519) `feat: add OpenAI Response API provider`
  - [#5517](https://github.com/agentscope-ai/QwenPaw/pull/5517) `fix: override format_tools for gemini`
  - [#5516](https://github.com/agentscope-ai/QwenPaw/pull/5516) `docs(locales): update "tools" translations`  
  这表明项目在扩展模型接入能力的同时，也在修复不同厂商接口的细节兼容问题。

- **桌面端构建与发布链路**
  - [#5518](https://github.com/agentscope-ai/QwenPaw/pull/5518) `fix(pack): repair desktop packaging builds`  
  对桌面打包链路的修复，对后续发布稳定性很关键。

- **README / 文档与展示层优化**
  - [#5534](https://github.com/agentscope-ai/QwenPaw/pull/5534) `refactor(readme): add trending badge`  
  虽然偏文档性质，但说明项目在外部展示与生态传播上也在持续维护。

**整体推进判断：**  
今日至少有一批与“用户可见体验、平台适配、打包可发布性”强相关的 PR 被关闭，说明项目不是只在做功能堆叠，而是在同步夯实交付能力。若按可见 PR 估算，项目今天的前进主要体现在：**UI 更可用、Provider 更完整、桌面包更稳、消息和技能管理更顺手**。

---

## 3. 社区热点
今日讨论最活跃的话题，几乎都围绕“**实际使用中卡住的关键路径**”展开：

1. **文件传输/预览链路在 Windows 本地版失效**
   - [#5508](https://github.com/agentscope-ai/QwenPaw/issues/5508)  
   评论数 3，虽已关闭，但这是今天最热的问题之一。用户明确指出 `send_file_to_user` 在 Windows 本地 App 返回 404，直接影响文件预览与下载。

2. **模型提供商统计不准确**
   - [#5512](https://github.com/agentscope-ai/QwenPaw/issues/5512)  
   评论数 2。用户关注的是“显示在线 Provider 数量与真实配置不一致”，这类问题影响的是配置可信度。

3. **/new 命令与技能自动补全冲突**
   - [#5529](https://github.com/agentscope-ai/QwenPaw/issues/5529)  
   评论数 2。说明用户已经在真实的对话工作流里高频使用快捷命令，命令系统的可预测性很重要。

4. **Linux 浏览器工具启动失败**
   - [#5528](https://github.com/agentscope-ai/QwenPaw/issues/5528)  
   评论数 2。这个问题直接阻断 `browser_use(action="start")`，属于高优先级运行时故障。

5. **Ollama / cloud 模型访问异常**
   - [#5541](https://github.com/agentscope-ai/QwenPaw/issues/5541)  
   评论数 2。用户已经配置 URL 和 API Key 但无法选择模型，说明模型发现/加载链路存在问题。

**热点背后的共同诉求：**  
用户更在意的是“能不能稳定跑通真实任务”，包括文件流转、模型选择、浏览器自动化、命令交互等主链路，而不是单点的小特性。项目当前的社区关注明显偏向**可用性、兼容性和准确性**。

---

## 4. Bug 与稳定性
按影响程度从高到低，今日新增/活跃问题可归纳如下：

### 1) 运行时级稳定性问题：浏览器工具资源泄漏
- [#5520](https://github.com/agentscope-ai/QwenPaw/issues/5520) `[bug] browser_use stop() leaves Chrome renderer processes running`
- 严重程度：**高**
- 影响：重复 start/stop 后残留 Chrome renderer 进程，持续占用内存，属于典型资源泄漏
- 状态：**已有 fix PR**
  - [#5536](https://github.com/agentscope-ai/QwenPaw/pull/5536)

### 2) 核心工具不可用：Linux 浏览器启动失败
- [#5528](https://github.com/agentscope-ai/QwenPaw/issues/5528)
- 严重程度：**高**
- 影响：`browser_use(action="start")` 在 Linux 桌面环境下超时，直接阻断浏览器自动化
- 状态：**已有 fix PR**
  - [#5526](https://github.com/agentscope-ai/QwenPaw/pull/5526)

### 3) 模型接入/选择失败：Ollama cloud 模型不可访问
- [#5541](https://github.com/agentscope-ai/QwenPaw/issues/5541)
- 严重程度：**高**
- 影响：用户即便配置了 cloud URL 和 API Key，仍无法选到模型，属于核心功能阻塞
- 状态：**未见对应 fix PR**

### 4) 任务执行被超时误杀：heartbeat 偶发失败
- [#5539](https://github.com/agentscope-ai/QwenPaw/issues/5539)
- 严重程度：**中高**
- 影响：内置 heartbeat 任务固定 120 秒超时，对稍复杂任务不友好，会被误判为“用户打断”
- 状态：**未见对应 fix PR**

### 5) Windows 本地文件预览 404
- [#5508](https://github.com/agentscope-ai/QwenPaw/issues/5508)
- 严重程度：**中高**
- 影响：`send_file_to_user` 生成的预览链接在 Windows 本地版失效，影响文件预览/下载
- 状态：**已关闭**，但从当前数据未看到对应修复 PR，建议核实关闭原因

### 6) 交互层 UX 问题：/new 与技能补全冲突
- [#5529](https://github.com/agentscope-ai/QwenPaw/issues/5529)
- 严重程度：**中**
- 影响：命令输入被自动补全错误替换，影响高频操作效率
- 状态：未见 fix PR

### 7) 统计准确性问题：模型提供商在线数不一致
- [#5512](https://github.com/agentscope-ai/QwenPaw/issues/5512)
- 严重程度：**中**
- 影响：配置面板对 Provider 在线状态的统计不准确，可能误导用户判断
- 状态：**已有 fix PR**
  - [#5537](https://github.com/agentscope-ai/QwenPaw/pull/5537)

---

## 5. 功能请求与路线图信号
今日的功能诉求与 PR 动向显示，项目下一阶段大概率会继续围绕“**迁移、稳定性、可扩展性**”推进：

### 明显的路线图信号
- **自动记忆系统重构**
  - [#5540](https://github.com/agentscope-ai/QwenPaw/pull/5540)  
  这是一个较大的底层调整：从 reply_id 转为 turn marker，并改动默认行为。若合并，说明项目在推进更稳的记忆管理机制。

- **Runtime 2.0 迁移补齐**
  - [#5523](https://github.com/agentscope-ai/QwenPaw/issues/5523)
  - [#5524](https://github.com/agentscope-ai/QwenPaw/pull/5524)  
  这组问题/PR说明运行时工具注册、治理工具链和后端接口正处在迁移修复期，是明显的中长期重点。

- **Windows 原生沙箱**
  - [#5525](https://github.com/agentscope-ai/QwenPaw/pull/5525)  
  这代表项目正在补齐桌面端跨平台能力，利好 Windows 用户。

- **Chat UI 能力升级**
  - [#5515](https://github.com/agentscope-ai/QwenPaw/pull/5515)  
  依赖最新 beta 组件，说明前端交互仍在快速演进。

- **模型动态切换**
  - [#5527](https://github.com/agentscope-ai/QwenPaw/issues/5527)  
  用户明确提出“模型限流/不可用时可自动切到备用模型”，这是很典型的生产级诉求。结合当前已有的 Provider 兼容与统计修复，**该需求很可能进入下一阶段路线图**，但今天尚未看到对应 PR。

### 更可能进入下一版本的方向
优先级较高的，可能包括：
1. Runtime 2.0 工具迁移与回归修复  
2. 浏览器工具稳定性与 Linux/Windows 兼容修复  
3. 记忆系统重构  
4. 模型 Provider 选择、统计、动态切换能力增强  
5. 桌面端打包/沙箱能力完善

---

## 6. 用户反馈摘要
从 Issues 里可以提炼出几类真实痛点：

- **“功能能跑，但边界条件容易坏”**  
  例如 Windows 本地版文件预览 404、Linux 默认浏览器识别失败、renderer 进程残留等，说明用户在多平台使用时经常遇到环境差异问题。  
  - [#5508](https://github.com/agentscope-ai/QwenPaw/issues/5508)
  - [#5528](https://github.com/agentscope-ai/QwenPaw/issues/5528)
  - [#5520](https://github.com/agentscope-ai/QwenPaw/issues/5520)

- **“我需要的是稳定接管任务，而不是中途失败”**  
  heartbeat 超时、模型切换不足、browser tool 启动失败，都说明用户使用的是长任务/自动化工作流，一旦中断体验就会很差。  
  - [#5539](https://github.com/agentscope-ai/QwenPaw/issues/5539)
  - [#5527](https://github.com/agentscope-ai/QwenPaw/issues/5527)
  - [#5528](https://github.com/agentscope-ai/QwenPaw/issues/5528)

- **“界面上的状态要和实际一致”**  
  Provider 数量统计不准这类问题，虽然不是崩溃级 bug，但会明显削弱用户对系统状态的信任。  
  - [#5512](https://github.com/agentscope-ai/QwenPaw/issues/5512)

- **“命令和自动补全要足够可预测”**  
  /new 与 /news 冲突暴露出交互细节问题：在高频输入场景中，任何误触都会放大摩擦感。  
  - [#5529](https://github.com/agentscope-ai/QwenPaw/issues/5529)

总体来看，用户满意的点主要是：**项目功能覆盖面广、扩展速度快**；不满意的点则集中在：**跨平台兼容、自动化任务稳定性、状态准确性**。

---

## 7. 待处理积压
说明：你提供的数据只覆盖过去 24 小时，**无法可靠识别“长期未响应”**的真实积压项。以下列出的是当前仍值得维护者优先关注的开放问题/PR，它们更接近“高优先待处理”而非“长期未响应”：

### 高优先待处理 Issues
- [#5541](https://github.com/agentscope-ai/QwenPaw/issues/5541) Ollama cloud 模型不可访问
- [#5528](https://github.com/agentscope-ai/QwenPaw/issues/5528) Linux 浏览器启动失败
- [#5539](https://github.com/agentscope-ai/QwenPaw/issues/5539) heartbeat 任务 120s 超时误杀
- [#5529](https://github.com/agentscope-ai/QwenPaw/issues/5529) `/new` 与技能自动补全冲突
- [#5527](https://github.com/agentscope-ai/QwenPaw/issues/5527) 模型动态切换需求
- [#5523](https://github.com/agentscope-ai/QwenPaw/issues/5523) Runtime 2.0 中缺失 spawn_subagent

### 值得尽快推进的开放 PR
- [#5540](https://github.com/agentscope-ai/QwenPaw/pull/5540) 自动记忆系统重构
- [#5526](https://github.com/agentscope-ai/QwenPaw/pull/5526) Linux 默认浏览器识别修复
- [#5536](https://github.com/agentscope-ai/QwenPaw/pull/5536) browser stop 资源泄漏修复
- [#5537](https://github.com/agentscope-ai/QwenPaw/pull/5537) Provider 在线统计修复
- [#5524](https://github.com/agentscope-ai/QwenPaw/pull/5524) spawn_subagent 注册修复
- [#5525](https://github.com/agentscope-ai/QwenPaw/pull/5525) Windows 原生沙箱

**维护建议：**  
当前 backlog 的主要风险不是“缺少新功能”，而是**基础链路在多平台和多运行时下还存在不稳定点**。建议优先把浏览器工具、模型接入、Runtime 迁移这三条线收敛，否则新特性越多，边界问题越容易放大。

---

如果你愿意，我可以继续把这份日报整理成**更适合直接发群/发邮件的短版**，或者输出成**Markdown 表格版**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报  
**日期：2026-06-26**

## 1) 今日速览
ZeroClaw 今天的开发活动非常活跃：过去 24 小时新增/活跃 Issues 4 条、PR 17 条，仅 1 条 PR 合并/关闭，整体呈现“高并发开发、低合并落地”的节奏。  
从内容看，项目焦点集中在 **skills / runtime cache / provider / gateway / docs / config** 等核心模块，说明团队正在同时推进体验修复、运行时稳定性和能力扩展。  
当前没有新版本发布，意味着今日价值主要体现在代码与设计层面的持续推进，而不是面向用户的版本交付。  
整体健康度判断：**活跃度高、问题发现与功能迭代并行，但评审积压偏多，短期需要关注 PR 审核吞吐。**

---

## 2) 版本发布
**今日无新版本发布。**

---

## 3) 项目进展
今日最重要的进展来自 1 条已关闭 PR 和一批高价值开放 PR，覆盖了运行时、技能系统、网关、文档与构建链路。

### 已合并/关闭的重要 PR
- **#8318** `[CLOSED] fix(memory): keep sqlite sessions out of hygiene archives`  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8318>  
  价值：修正 session hygiene 归档逻辑，避免把活跃 SQLite 会话文件误归档，直接提升会话存储稳定性，降低数据损坏/丢会话风险。

### 今日推进中的主要方向
- **skills 系统开始向 bundle-aware 重构**  
  - **#8335** `feat(skills): make skills install/list/remove bundle-aware`  
    链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8335>  
  该 PR 直接回应了用户侧的技能安装/加载路径问题，意味着“装了却不能用”的核心体验正在修复。
- **运行时缓存与时间戳稳定性被系统性处理**  
  - **#8323** `fix(runtime): stabilize response-cache timestamp tests`  
    链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8323>  
  - **#8321** `[RFC] Define response-cache policy for volatile runtime context`  
    链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8321>  
  说明团队正在从“修单点测试”走向“定义缓存边界规则”。
- **ACP / tool 调用链路继续演进**
  - **#8338** `feat(channels): ACP elicitation Phase 1 — multiple-choice via elicitation/create`  
    链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8338>  
  这意味着多选式交互将更规范地进入 ACP 标准路径，而不是继续依赖临时 overload。
- **网关与可观测性增强**
  - **#8331** `feat(gateway): agent-aware /api/tools listing and agent-scoped tool picker`  
    链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8331>  
  - **#8337** `feat(observability): herdr agent reporting integration`  
    链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8337>  
  这类改动提升了多 agent 场景下的可理解性与可操作性。
- **构建与文档持续完善**
  - **#8336** `feat(nix): Repair zeroclaw/zerocode nix builds, add nix hash updates to release process`  
    链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8336>  
  - **#8332** `docs(i18n): pin v0.8.2 translations + self-init po submodule in mdbook sync`  
    链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8332>  

**项目整体向前迈进的幅度：**  
- 已有 1 项修复落地；  
- 同时有 16 条 PR 在审，覆盖多个关键子系统；  
- 说明 ZeroClaw 的“问题发现—工程修复—能力扩展”链条仍在高速运转。  

---

## 4) 社区热点
今天没有出现明显的评论高峰或 reactions 爆点：  
- 新开 Issues 的评论数均为 0  
- PR 评论字段也未显示活跃讨论  
因此，**“热点”更多体现在问题主题本身，而非社区舆论热度。**

### 主要关注点集中在以下几类
1. **skills 可用性问题**
   - Issue：**#8334** `skills install/list/remove target data_dir, which no multi-agent runtime loads`  
     链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8334>  
   - 对应 PR：**#8335**  
     链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8335>  
   背后诉求很明确：用户希望“安装技能后就能在实际 runtime 中生效”，而不是只写进某个 data_dir。

2. **图像工具结果的 token 膨胀问题**
   - Issue：**#8327** `Native tool calling: [IMAGE:data:...] markers in tool results sent as plain text`  
     链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8327>  
   这是典型的成本/性能型痛点，说明多模态工具调用在 OpenAI-compatible provider 上仍有格式兼容问题。

3. **运行时缓存策略与测试稳定性**
   - Issue：**#8320**  
     链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8320>  
   - RFC：**#8321**  
     链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8321>  
   社区诉求从“修 bug”升级到“定义 volatile context 的缓存边界”，这是项目走向成熟的重要信号。

4. **多 agent / 网关可视化与控制**
   - PR：**#8331**  
     链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8331>  
   - PR：**#8337**  
     链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8337>  
   反映出用户希望在多 agent 场景中更容易理解“哪个 agent 在干什么、有哪些工具可用”。

---

## 5) Bug 与稳定性
以下按严重性与影响面排序：

### S2 / 明显降级型问题
1. **#8334** `[Bug] skills install/list/remove target data_dir, which no multi-agent runtime loads`  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8334>  
   影响：安装、列出、移除技能的路径与 runtime 实际加载路径不一致，直接破坏“安装后可用”的主流程。  
   状态：**已有对应修复 PR #8335**  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8335>

2. **#8320** `[Bug] Agent response cache key includes per-turn wall-clock timestamp, causing cache misses and flaky runtime test`  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8320>  
   影响：缓存命中率下降、测试不稳定、运行行为受秒级时间变化影响。  
   状态：**已有对应修复 PR #8323**  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8323>

### 性能 / 成本型问题
3. **#8327** `Native tool calling: [IMAGE:data:...] markers sent as plain text, inflating token count`  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8327>  
   影响：base64 图片内容被当作纯文本发送，导致 token 成本上升，甚至影响上下文窗口。  
   状态：**当前未看到直接修复 PR**

### 相关稳定性/治理议题
4. **#8321** `[RFC] Define response-cache policy for volatile runtime context`  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8321>  
   这不是 bug 本身，但它说明 #8320 一类问题并非孤例，项目需要明确缓存与动态上下文的政策边界。

---

## 6) 功能请求与路线图信号
今天的路线图信号比较清晰，主要集中在 4 个方向：

### 1. Skills 体系向“bundle-aware”演进
- PR：**#8335**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8335>  
- 问题：**#8334**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8334>  
判断：**高概率进入下一版本**。这是直接面向用户主流程的修复，优先级高。

### 2. 缓存策略正式化
- Issue/RFC：**#8321**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8321>  
- 配套 bug：**#8320**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8320>  
判断：**很可能成为平台级规范**，后续不只是修一个测试，而是统一 volatile runtime context 的缓存行为。

### 3. ACP / 工具调用标准化
- PR：**#8338**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8338>  
判断：**中高概率进入近期版本**。这类改动通常代表协议层规范化，会继续推进。

### 4. 多 agent 可观测性与网关体验
- PR：**#8331**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8331>  
- PR：**#8337**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/8337>  
判断：**偏中期路线图**，但与多 agent 产品化高度相关，值得持续跟踪。

---

## 7) 用户反馈摘要
从 Issues 的描述可以提炼出几条非常真实的用户痛点：

### 1. “装了技能却不能用”是高优先级痛点
- 来源：**#8334**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8334>  
用户场景：使用 `zeroclaw skills install/list/remove` 管理技能，期望在 multi-agent runtime 中立即可见。  
不满点：当前写入的是 `data_dir`，但 runtime 不加载这一路径，导致流程断裂。

### 2. 多模态工具调用成本过高
- 来源：**#8327**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8327>  
用户场景：使用 native tool calling 处理图片。  
不满点：图像标记被当文本传递，token 成本暴涨，影响可用性和费用控制。

### 3. 缓存行为不可预测会破坏信任
- 来源：**#8320 / #8321**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8320>  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8321>  
用户场景：依赖 response cache 提升响应速度和稳定性。  
不满点：wall-clock timestamp 进入 cache key 后，导致命中失效且测试 flaky，用户会感觉“系统不稳定、不可复现”。

---

## 8) 待处理积压
严格意义上，**今天没有出现“长期未响应”的老 Issue/PR**：  
- 新开的 Issue 都是 2026-06-25  
- PR 主要集中在 2026-06-25 到 2026-06-26  
- 评论数也普遍为 0，说明尚未形成长时间积压讨论

但从维护优先级看，以下条目应尽快处理：
1. **#8334** Skills 路径与 runtime 不一致问题  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8334>
2. **#8327** 多模态 tool result 格式问题  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8327>
3. **#8320 / #8321** cache 规则与测试稳定性问题  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8320>  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/8321>
4. **待审高价值 PR 堆积**：  
   - **#8335** skills bundle-aware  
   - **#8338** ACP elicitation  
   - **#8331** agent-aware tools  
   - **#8337** herdr observability  
   链接分别见上

**维护建议：**当前更像是“高产出开发周”的中段，而不是健康的收敛阶段。若评审与合并吞吐不跟上，未来几天可能形成明显 PR 堵塞。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*