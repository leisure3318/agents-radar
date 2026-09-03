# OpenClaw 生态日报 2026-09-03

> Issues: 49 | PRs: 74 | 覆盖项目: 13 个 | 生成时间: 2026-09-03 03:28 UTC

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

# OpenClaw 项目动态日报（2026-09-03）

## 1) 今日速览
OpenClaw 过去 24 小时保持了**非常高的变更活跃度**：Issues 更新 49 条、PR 更新 74 条，但**没有新 Release**，说明仓库仍处于“密集修复 + 评审推进”阶段，而不是发版窗口。  
今天讨论重心明显偏向**稳定性、性能、资源治理和安全边界**，其中不乏 P0/P1 级别问题，表明项目仍在持续打磨核心体验。  
与此同时，多个修复 PR 已经进入 `ready for maintainer look` / `needs proof` 等评审状态，维护节奏活跃，但最终合并效率仍有提升空间。  
整体看，项目是**高活跃、强修复导向、稳定性压力不低**的健康状态。

---

## 2) 版本发布
- **今日无新 Release。**

---

## 3) 项目进展
> 说明：本次数据里未展开“已合并/关闭 PR”的具体编号，因此以下以**今日已关闭的重要 Issue**与**已进入评审的修复 PR**作为项目进展代表。

### 今日已关闭的重要问题
- [#136734](https://github.com/openclaw/openclaw/issues/136734) Secret egress proxy 在 HTTPS 请求头中未替换 store-secret sentinel（安全/密钥处理）
- [#136875](https://github.com/openclaw/openclaw/issues/136875) automations 列表工具筛选偏差
- [#136791](https://github.com/openclaw/openclaw/issues/136791) macOS 上 Gateway benchmarks 误留下 LAN discovery
- [#136865](https://github.com/openclaw/openclaw/issues/136865) Cron 任务删除后关联 session 无法删除
- [#136631](https://github.com/openclaw/openclaw/issues/136631) clean source CLI 可能因 mtime 触发不必要重建
- [#136837](https://github.com/openclaw/openclaw/issues/136837) WhatsApp outbound “sent message” 误报发送成功
- [#136824](https://github.com/openclaw/openclaw/issues/136824) 飞书账号消息无响应回归
- [#136815](https://github.com/openclaw/openclaw/issues/136815) Control UI 中 commentary 文本工具运行时重复渲染
- [#136887](https://github.com/openclaw/openclaw/issues/136887) Linux systemd-user pre-exec enforcement adapter
- [#136892](https://github.com/openclaw/openclaw/issues/136892) host-local admission + fenced reservations

### 今日推进到评审/实现阶段的修复 PR
- [#136836](https://github.com/openclaw/openclaw/pull/136836) 修复 native prompt annotation 的历史扫描问题，直接对接 [#136831](https://github.com/openclaw/openclaw/issues/136831)
- [#136845](https://github.com/openclaw/openclaw/pull/136845) 修复 Swarm Code Mode fan-out 触达 bridge limit 的问题，对接 [#136834](https://github.com/openclaw/openclaw/issues/136834)
- [#136880](https://github.com/openclaw/openclaw/pull/136880) 修复 GitHub hovercard preview unavailable 说明不足，对接 [#136841](https://github.com/openclaw/openclaw/issues/136841)
- [#136820](https://github.com/openclaw/openclaw/pull/136820) 让 in-flight announce handoff 保持可重试，对接 [#136513](https://github.com/openclaw/openclaw/issues/136513)

### 今日整体推进幅度
- 从问题闭环看，今天至少有 **10 个 Issue 被关闭**
- 从修复管线看，已有多条高优问题进入**可合并/可维护者审查**阶段  
- 项目正在从“发现问题”快速转入“收口问题”，但**发布前稳定性压力仍然明显**

---

## 4) 社区热点

### 讨论最活跃的 Issue
- [#136734](https://github.com/openclaw/openclaw/issues/136734) Secret egress proxy 未替换 secret sentinel（3 评论）  
  **诉求**：密钥传递必须“要么正确替换、要么明确拒绝”，不能把原始 sentinel 泄漏到上游请求里。  
- [#136786](https://github.com/openclaw/openclaw/issues/136786) archive symlink guard 破坏备份流程（3 评论）  
  **诉求**：备份/归档场景需要“安全默认值 + 可控逃逸口”，不能因为新增 guard 直接把已工作流程打断。  
- [#136895](https://github.com/openclaw/openclaw/issues/136895) resource execution：pressure watchdog 与 owned-handle cancellation（2 评论）  
  **诉求**：需要真正可执行的压力感知与取消机制，而不是只做 admission snapshot。  
- [#136886](https://github.com/openclaw/openclaw/issues/136886) resource execution：Gateway protection policy 和 baseline（2 评论）  
  **诉求**：希望把 Gateway 的响应性与内存 SLO 变成可验证基线。  
- [#136899](https://github.com/openclaw/openclaw/issues/136899) main 上 repo-e2e-artifacts 失败回归（2 评论）  
  **诉求**：CI 门禁变红后，需要快速定位“是谁把构建预算打爆了”。  

### 热点背后的共同主题
今天最热的并不是新功能，而是**“系统行为必须可预测、可解释、可恢复”**：  
- 安全密钥不能穿透边界  
- 备份/归档不能被硬规则误伤  
- 资源压力下要有明确的治理策略  
- CI/构建门禁必须能定位回归来源  

---

## 5) Bug 与稳定性

### P0 / 最高优先级
- [#136863](https://github.com/openclaw/openclaw/issues/136863) macOS onboarding 中 Gateway URL 输入框可聚焦但无法键入  
  **影响**：直接阻塞远程 Gateway onboarding，属于明显的 release blocker 级 UX 问题。  
  **fix PR**：当前数据里未见对应 PR。

### P1 / 高风险问题
- [#136813](https://github.com/openclaw/openclaw/issues/136813) Secret egress proxy CA 24h 过期且不续期  
  **影响**：长期运行的 Gateway 可能在 24 小时后静默失效，且带有安全审查需求。  
  **fix PR**：未见。
- [#136842](https://github.com/openclaw/openclaw/issues/136842) build-artifacts 持续红：Control UI startup JS gzip 超预算 125B  
  **影响**：PR 门禁级回归，直接影响合并效率。  
  **fix PR**：未见。
- [#136899](https://github.com/openclaw/openclaw/issues/136899) repo-e2e-artifacts 在 main 上失败  
  **影响**：工具链回归，已影响持续集成稳定性。  
  **fix PR**：未见。
- [#136818](https://github.com/openclaw/openclaw/issues/136818) session tools 丢失 role-aware visibility  
  **影响**：会让 agent 误判 session 不存在，进而退化成 shell/Gateway 绕行。  
  **fix PR**：未见。
- [#136769](https://github.com/openclaw/openclaw/issues/136769) browser navigate 偶发 20s 超时  
  **影响**：同一 CDP target 上其他操作健康，说明是导航链路特有的不稳定。  
  **fix PR**：未见。
- [#136821](https://github.com/openclaw/openclaw/issues/136821) archived conversation 的 session assignment 漏掉 teammates  
  **影响**：会造成会话分配不完整，影响协作流转。  
  **fix PR**：未见。

### 已关闭但值得注意的稳定性问题
- [#136734](https://github.com/openclaw/openclaw/issues/136734) secret sentinel 泄漏到上游请求头
- [#136875](https://github.com/openclaw/openclaw/issues/136875) automations list 过滤错误
- [#136791](https://github.com/openclaw/openclaw/issues/136791) benchmark fixture 留下 LAN discovery
- [#136865](https://github.com/openclaw/openclaw/issues/136865) cron session 删除异常
- [#136837](https://github.com/openclaw/openclaw/issues/136837) WhatsApp 消息误报已发送
- [#136824](https://github.com/openclaw/openclaw/issues/136824) 飞书消息无响应
- [#136815](https://github.com/openclaw/openclaw/issues/136815) commentary 重复渲染

### 已有 fix PR 的高风险问题
- [#136831](https://github.com/openclaw/openclaw/issues/136831) → [#136836](https://github.com/openclaw/openclaw/pull/136836)
- [#136834](https://github.com/openclaw/openclaw/issues/136834) → [#136845](https://github.com/openclaw/openclaw/pull/136845)
- [#136841](https://github.com/openclaw/openclaw/issues/136841) → [#136880](https://github.com/openclaw/openclaw/pull/136880)
- [#136513](https://github.com/openclaw/openclaw/issues/136513) → [#136820](https://github.com/openclaw/openclaw/pull/136820)

---

## 6) 功能请求与路线图信号

### 高概率进入下一轮路线图的方向
#### A. 资源感知执行 / 调度治理
这一组是今天最强的路线图信号，且呈现“成体系批量提出”的特征：
- [#136882](https://github.com/openclaw/openclaw/issues/136882) Resource-aware execution：safe placement、host-local admission、enforcement
- [#136893](https://github.com/openclaw/openclaw/issues/136893) Gateway placement policy 与可解释决策
- [#136894](https://github.com/openclaw/openclaw/issues/136894) sandbox / remote applied-limit receipts 标准化
- [#136895](https://github.com/openclaw/openclaw/issues/136895) pressure watchdog + owned-handle cancellation
- [#136896](https://github.com/openclaw/openclaw/issues/136896) tenancy、data-boundary、egress placement policy
- [#136897](https://github.com/openclaw/openclaw/issues/136897) disk / output / network / queue amplification bounds
- [#136898](https://github.com/openclaw/openclaw/issues/136898) provider-backed cost and latency policy
- [#136888](https://github.com/openclaw/openclaw/issues/136888) typed resource model and effective capacity snapshot
- [#136889](https://github.com/openclaw/openclaw/issues/136889) bounded read-only runtime resource context
- [#136891](https://github.com/openclaw/openclaw/issues/136891) plugin-safe backend capability protocol
- [#136885](https://github.com/openclaw/openclaw/issues/136885) managed-work launch boundaries
- [#136892](https://github.com/openclaw/openclaw/issues/136892) host-local admission and fenced reservations

**判断**：这不是零散需求，而是一个很明确的产品方向——OpenClaw 正在从“执行工具”往“资源治理控制面”演进，**非常可能被纳入后续版本主线**。

#### B. 可观测性 / 运行时信号
- [#136857](https://github.com/openclaw/openclaw/issues/136857) run-duration estimation 所需的真实 token、per-tool wall time、step structure
- [#136852](https://github.com/openclaw/openclaw/issues/136852) CLI stderr 丢弃字节数可见化
- [#136853](https://github.com/openclaw/openclaw/issues/136853) MCP stderr 截断字节数诊断
- [#136883](https://github.com/openclaw/openclaw/issues/136883) Telegram pre-dispatch rejection logs

**判断**：这些需求都偏“低风险、高收益”，且与今天大量的稳定性问题高度同向，**很像下一版本会优先吸收的改进项**。

#### C. 产品体验与插件生态
- [#136907](https://github.com/openclaw/openclaw/issues/136907) 第三方 Session Catalog 自定义图标
- [#136854](https://github.com/openclaw/openclaw/issues/136854) line / mattermost setup adapters 缺少 singleAccountKeysToMove
- [#136908](https://github.com/openclaw/openclaw/issues/136908) Maturity renderer 丢失 redirect 片段链接

**判断**：这类属于生态与 UX 修补，优先级通常低于资源治理和稳定性，但会持续累积成“使用感”。

### 与路线图高度一致的已打开 PR 信号
- [#136859](https://github.com/openclaw/openclaw/pull/136859) 报告 live node host load / memory / disk stats
- [#136866](https://github.com/openclaw/openclaw/pull/136866) 控制 UI 启动时延优化
- [#136862](https://github.com/openclaw/openclaw/pull/136862) chat deep-link cold load 优化
- [#136916](https://github.com/openclaw/openclaw/pull/136916) Activity 在长 session history 下保持响应

**判断**：PR 方向说明维护团队正在同步推进**性能优化 + 资源可视化 + 交互流畅度**，与上述 feature request 方向一致。

---

## 7) 用户反馈摘要
从今日问题描述里，可以提炼出几类非常明确的真实痛点：

### 1. “系统不能只看起来正常，必须真的正常”
典型诉求来自：
- [#136734](https://github.com/openclaw/openclaw/issues/136734)
- [#136813](https://github.com/openclaw/openclaw/issues/136813)
- [#136842](https://github.com/openclaw/openclaw/issues/136842)

**用户在意的是**：密钥、证书、构建预算、长期运行时限这些基础能力不能悄悄失效。

### 2. “出错时要给可操作的解释，不要只给表面错误”
典型诉求来自：
- [#136841](https://github.com/openclaw/openclaw/issues/136841)
- [#136852](https://github.com/openclaw/openclaw/issues/136852)
- [#136853](https://github.com/openclaw/openclaw/issues/136853)
- [#136883](https://github.com/openclaw/openclaw/issues/136883)

**用户在意的是**：诊断信息要告诉我“发生了什么、丢了多少、怎么修”。

### 3. “协作态/会话态不要丢”
典型诉求来自：
- [#136818](https://github.com/openclaw/openclaw/issues/136818)
- [#136821](https://github.com/openclaw/openclaw/issues/136821)
- [#136617](https://github.com/openclaw/openclaw/issues/136617)
- [#136865](https://github.com/openclaw/openclaw/issues/136865)

**用户在意的是**：角色、session、归属、回复收据这些状态在重启、切换、删除后仍然要一致。

### 4. “性能和规模一上来就要有边界感”
典型诉求来自：
- [#136786](https://github.com/openclaw/openclaw/issues/136786)
- [#136895](https://github.com/openclaw/openclaw/issues/136895)
- [#136886](https://github.com/openclaw/openclaw/issues/136886)

**用户在意的是**：在真实负载下，系统不能只靠乐观默认值，要能识别压力并主动退让。

---

## 8) 待处理积压
> 这里优先列出**重要、但当前仍处于等待维护者/等待作者/等待证明**状态的对象。虽然它们很多是“今天新冒出来”的，但风险已经足够高，值得优先盯住。

### 高优先级待跟进 PR
- [#136297](https://github.com/openclaw/openclaw/pull/136297) preserve desktop readiness and worker outcomes  
  状态：`needs proof`，且体量大、风险覆盖安全边界与可用性。
- [#136507](https://github.com/openclaw/openclaw/pull/136507) arm supervisor timeouts before adapter construction  
  状态：`needs proof`，涉及挂死链路，属于高风险修复。
- [#136690](https://github.com/openclaw/openclaw/pull/136690) restore plugin types at registry  
  状态：`waiting on author`，已卡在作者侧。
- [#136858](https://github.com/openclaw/openclaw/pull/136858) redesign Devices page  
  状态：`waiting on author`，偏大功能改造，若拖久会占用路线图。

### 当前最该优先处理的高风险 Issue
- [#136863](https://github.com/openclaw/openclaw/issues/136863) P0 macOS onboarding 阻塞
- [#136813](https://github.com/openclaw/openclaw/issues/136813) P1 长运行 Gateway 证书过期风险
- [#136842](https://github.com/openclaw/openclaw/issues/136842) P1 CI 门禁持续红
- [#136899](https://github.com/openclaw/openclaw/issues/136899) P1 main 分支回归
- [#136818](https://github.com/openclaw/openclaw/issues/136818) P1 session 角色可见性错误

### 建议维护者重点盯防
- [#136886](https://github.com/openclaw/openclaw/issues/136886) / [#136895](https://github.com/openclaw/openclaw/issues/136895) / [#136896](https://github.com/openclaw/openclaw/issues/136896)  
  这一组是“资源治理”方向的批量提案，建议尽快做一次**主题归并**，避免路线图分散。
- [#136786](https://github.com/openclaw/openclaw/issues/136786)  
  备份/归档类问题一旦处理不好，很容易从单点 bug 变成广泛的用户阻断。

---

### 总体结论
今天的 OpenClaw 呈现出很典型的“**高活跃、高修复密度、无发版但问题持续收口**”状态。  
短期看，项目最大的风险不是缺需求，而是**P0/P1 稳定性问题与资源治理议题同时涌现**；长期看，这也说明 OpenClaw 正在从“功能可用”进入“平台化/控制面化”的关键阶段。

---

## 横向生态对比

下面给出一份**横向对比分析报告**，面向技术决策者与开发者，重点看“活跃度、技术路线、成熟度与趋势”。

---

# 1) 生态全景

过去 24 小时，这组开源 AI 智能体/个人助手项目整体呈现出一个非常明确的趋势：**从“功能堆叠”转向“稳定性、可解释性、可治理性”**。  
多数项目没有追求大版本发布，而是在围绕 **安全边界、会话状态、资源治理、跨平台兼容、CI 稳定性** 做密集修补。  
与此同时，像 CoPaw、Moltis 这样的项目已经进入**高频发布 + 小步快跑**阶段，而 OpenClaw、Hermes Agent、ZeroClaw 则更像是在为“平台化/控制面化”铺底。  
换句话说，这个生态正在从“能跑”进入“**能长期可靠运行、能审计、能恢复、能扩展**”的阶段。  
对开发者来说，今天最重要的信号不是“谁功能最多”，而是“谁在把 AI 智能体做成可上线的系统”。

---

# 2) 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 49 | 74 | 无新 Release | **高活跃，高修复压力，平台化推进中** |
| NanoBot | 1 | 10 | 无新 Release | **高活跃，低合并，修复密集** |
| Hermes Agent | 50 | 50 | 无新 Release | **高活跃，反馈强，主干修复并行** |
| PicoClaw | 0 | 0 | 无活动 | **沉寂** |
| NanoClaw | 1 | 2 | 无新 Release | **活跃度中低，聚焦核心修复** |
| NullClaw | 0 | 0 | 无活动 | **沉寂** |
| IronClaw | 6 | 14 | 无新 Release | **高活跃，底层治理/质量收敛** |
| LobsterAI | 0 | 2 | 无新 Release | **低活跃，维护型推进** |
| TinyClaw | 0 | 0 | 无活动 | **沉寂** |
| Moltis | 2 | 2 | **3 个新 Release** | **高频发布，问题快速收敛** |
| CoPaw | 12 | 18 | **2 个新 Release** | **高活跃，高压力迭代** |
| ZeptoClaw | 0 | 0 | 无活动 | **沉寂** |
| ZeroClaw | 13 | 23 | 无新 Release | **高活跃，边修边重构** |

---

# 3) OpenClaw 在生态中的定位

## 3.1 优势
OpenClaw 的最大优势是：**问题发现与修复吞吐量明显高于其他项目**。  
从今天的数据看，它的 **Issues 更新 49、PR 更新 74**，在这组项目里属于最靠前的一档，明显高于大多数项目，且接近 Hermes Agent 的问题规模，但 PR 活跃度更高。  
这说明 OpenClaw 的社区/维护节奏不是“偶尔修一下”，而是**持续高密度修复 + 审查推进**。

## 3.2 技术路线差异
OpenClaw 的路线非常清晰：  
- 重点不在单纯聊天 UI，而在 **资源感知执行、host-local admission、fenced reservations、Gateway 治理、密钥边界、安全代理**  
- 它正在从“执行工具”向“**资源治理控制面**”演进  
- 这和很多偏桌面体验、模型路由、hook 事件、WebUI 交互的项目不同

换句话说，OpenClaw 更像是在做**AI 智能体基础设施层**，而不是单一助手产品。

## 3.3 社区规模对比
按今天的活跃面看，OpenClaw 的社区规模属于**第一梯队**：  
- Issue/PR 量级高，且问题类型覆盖安全、性能、CI、会话、资源治理  
- 相比之下，Moltis、LobsterAI、NanoClaw 等项目更偏单点修复或小范围迭代  
- Hermes Agent 的 issue 量相近，但 OpenClaw 的 PR 吞吐更高，说明它的**修复/评审活动更密集**

因此，OpenClaw 在这个生态里的定位不是“最大功能集”，而是**最强的系统治理与稳定性演进枢纽之一**。

---

# 4) 共同关注的技术方向

以下是多个项目同时涌现的共同方向：

## A. 安全边界与权限治理
涉及项目：
- **OpenClaw**：secret egress proxy、host-local admission、fenced reservations
- **NanoBot**：session key 路径穿越、sandbox
- **CoPaw**：security sandbox breach、tool guard、whitelist
- **ZeroClaw**：Seatbelt allowed_roots、bounded delegates
- **Hermes Agent**：审批、OAuth、MCP 可靠性

**共同诉求：**
- 工具调用不能越权
- 目录/路径/凭据不能被输入污染
- 沙箱和策略必须真实生效，而不是“看起来生效”

---

## B. 资源感知执行与治理
涉及项目：
- **OpenClaw**：resource-aware execution、pressure watchdog、capacity snapshot
- **NanoBot**：缓存边界、请求大小保护、内存控制
- **Hermes Agent**：quota / rate-limit / context meter
- **ZeroClaw**：runtime/config/provider 边界
- **CoPaw**：workspace / hub / runtime 资源管理

**共同诉求：**
- 智能体不能只做乐观执行
- 必须能识别压力、限制扩散、避免放大失败
- 长跑服务要有资源治理机制

---

## C. 可观测性与可解释性
涉及项目：
- **OpenClaw**：更可解释的资源与 CI 问题定位
- **Hermes Agent**：token 计量、checkpoint、rollback diff、approval 可见性
- **Moltis**：hook lifecycle、tool_call_id
- **ZeroClaw**：status 需要报告 dashboard 可用性
- **NanoBot**：WebUI 中显示上下文与速度
- **IronClaw**：回复拼接正确性、错误语义

**共同诉求：**
- 系统不能只“失败”，还要说明失败在哪
- 用户需要能追踪一次调用、一次工具链、一次会话状态
- 解释性正从“锦上添花”变成“产品门槛”

---

## D. 会话连续性与状态一致性
涉及项目：
- **OpenClaw**：session / cron / role-aware visibility / archived assignment
- **Hermes Agent**：session history、profile 切换、desktop 更新
- **NanoBot**：SDK 流关闭、缓存亲和、消息重试
- **Moltis**：hook 生命周期与 tool call 关联
- **CoPaw**：session 切换、远程 WebUI、流式体验

**共同诉求：**
- 不要丢会话，不要错归属，不要静默重开
- agent 的“状态”已经成为第一等公民

---

## E. 跨平台与桌面端可靠性
涉及项目：
- **Hermes Agent**：Windows/macOS/Desktop/embedded terminal
- **CoPaw**：Desktop、WebUI、远程/移动端
- **NanoBot**：macOS sandbox、container 持久化
- **OpenClaw**：macOS onboarding、systemd-user、Linux
- **ZeroClaw**：macOS / Windows / CI 跨平台一致性

**共同诉求：**
- 桌面端不是“网页的壳”
- 本地模型、远程 gateway、打包发布、升级流程都必须稳

---

# 5) 差异化定位分析

## OpenClaw
- **功能侧重**：资源治理、执行控制、安全边界、平台化能力
- **目标用户**：需要把 AI 智能体当作基础设施来运营的团队
- **架构特征**：更像控制面 / 调度面 / 执行治理层

## Hermes Agent
- **功能侧重**：桌面端工作流、会话连续性、审批、OAuth/MCP、跨平台兼容
- **目标用户**：重度桌面使用者、多 profile / 多 bot 工作流用户
- **架构特征**：桌面产品与集成生态导向明显

## NanoBot
- **功能侧重**：安全、缓存、流式传输、WebUI 可观测性
- **目标用户**：本地部署、容器部署、偏轻量但要求稳定的用户
- **架构特征**：偏“轻量助手 + 工程可靠性”

## NanoClaw
- **功能侧重**：执行语义、delivery 重试、gateway credential 边界、CLI 调度
- **目标用户**：偏编排/调度/网关模式使用者
- **架构特征**：更强调执行链路与命令语义

## IronClaw
- **功能侧重**：CI 稳定性、TS 技术债、输出正确性、多代理审批可见性
- **目标用户**：注重工程质量和可维护性的团队
- **架构特征**：偏“质量修复驱动型”

## LobsterAI
- **功能侧重**：维护治理、renderer 修复、版本回滚清理
- **目标用户**：存量用户、稳定优先场景
- **架构特征**：低活跃，偏维护阶段

## Moltis
- **功能侧重**：hooks 事件完整性、tool call 追踪、快速发布
- **目标用户**：需要事件驱动、可审计、可集成的 agent 用户
- **架构特征**：偏“事件系统/插件系统”

## CoPaw
- **功能侧重**：Hub 平台化、多用户、workspace 权限、桌面与 WebUI、技能系统
- **目标用户**：要把 AI 助手做成可部署平台的团队
- **架构特征**：平台化最强之一，接近“产品操作系统”

## ZeroClaw
- **功能侧重**：配置正确性、provider/runtime 边界、跨平台 CI、治理流程
- **目标用户**：需要严格配置与策略控制的团队
- **架构特征**：偏规范化和平台稳定性建设

---

# 6) 社区热度与成熟度

## 快速迭代阶段
这些项目的共同特征是：**活跃度高、修复密集、迭代快、仍未进入稳定发版节奏**  
- **OpenClaw**
- **Hermes Agent**
- **ZeroClaw**
- **CoPaw**
- **Moltis**

其中：
- **Moltis**：最明显的“快发快修”
- **CoPaw**：已进入稳定版 + beta 并行迭代
- **OpenClaw / Hermes / ZeroClaw**：更像高压修复期，重点在收敛风险

## 质量巩固阶段
这些项目更强调“把底层质量补齐”：  
- **IronClaw**：质量修复、CI、类型债、输出正确性
- **NanoBot**：安全、缓存、流式稳定性
- **NanoClaw**：核心执行链路修复
- **LobsterAI**：维护与回滚治理

## 沉寂阶段
几乎没有可见活动，说明当前社区热度较低：  
- **PicoClaw**
- **NullClaw**
- **TinyClaw**
- **ZeptoClaw**

---

# 7) 值得关注的趋势信号

## 1. AI 智能体正在“基础设施化”
最明显的趋势是：项目不再只拼 UI 或模型接入，而是在补 **安全、资源、权限、审计、CI、恢复能力**。  
这意味着未来的竞争点会从“能不能回答”变成“**能不能稳定、可控、可追责地运行**”。

## 2. 资源治理会成为主线能力
OpenClaw、ZeroClaw、CoPaw 都在明显朝这个方向走。  
对开发者的启发是：  
> 智能体系统要从一开始就设计 admission、placement、quota、watchdog、capacity snapshot，而不是上线后再补。

## 3. 可观测性正在从附加项变成必选项
Hermes Agent、Moltis、NanoBot、ZeroClaw 的信号都很强。  
用户不再接受“黑盒式 agent”，他们要知道：
- 当前上下文用了多少
- 哪一步失败了
- 哪个 tool call 对应哪条日志
- 为什么被拒绝

## 4. 桌面端与本地部署仍是高价值场景
Hermes Agent、CoPaw、NanoBot 都表明：  
**本地模型、桌面工作流、远程访问、移动端可用性** 仍然是强需求。  
这说明“云端纯 API”不是唯一方向，**local-first / hybrid** 仍有很大市场。

## 5. 安全不是后置补丁，而是产品定义的一部分
几乎所有活跃项目都在补：
- 路径越界
- 沙箱
- 白名单
- 审批透明度
- 证书/secret 处理

这意味着 AI 智能体开发者需要把安全边界视作核心架构，而不是开发末尾的附加项。

---

如果你愿意，我可以继续把这份报告压缩成两种版本之一：
1. **管理层 1 页摘要版**  
2. **开发团队可直接转发的 Slack/飞书要点版**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

以下为 **2026-09-03 NanoBot 项目动态日报**（基于过去 24 小时 GitHub 数据）。

---

## 1) 今日速览

过去 24 小时，NanoBot 处于**高活跃、低合并**状态：新增/活跃 Issue 1 条、活跃 PR 10 条，但**没有任何 PR 合并或关闭**，也没有新版本发布。  
从 PR 主题看，项目重心明显落在**稳定性、安全性、流式传输可靠性、缓存治理和 WebUI 体验修整**上，说明维护者正在集中处理底层质量问题。  
当前没有明显的版本节奏推进，但代码层面的修复面很广，属于“**审查堆积、修复密集**”的一天。  
整体健康度上看：**活跃度高，风险控制意识强，但主干落地速度偏慢**，需要后续靠合并来兑现这些修复收益。

---

## 2) 版本发布

- **今日无新版本发布**。  
  最新 Releases：无。  
  https://github.com/HKUDS/nanobot/releases

---

## 3) 项目进展

### 今日无已合并/关闭的重要 PR
本窗口内**没有任何 PR 合并或关闭**，因此“已进入主干”的实际进展为 0。

### 但今日新增/活跃的 PR，代表项目正在推进的方向
尽管未落地，以下 PR 已形成明确推进信号：

- **安全性增强：会话键路径穿越防护**
  - PR: https://github.com/HKUDS/nanobot/pull/5633  
  - 作用：阻止恶意 session key 通过 `../../` 之类路径穿越访问 sessions 目录外文件。  
  - 意义：这是典型高优先级安全修复，对多租户/外部输入场景很关键。

- **容器/持久化友好：Copilot OAuth token 改存数据目录**
  - PR: https://github.com/HKUDS/nanobot/pull/5638  
  - 作用：避免 token 落在不可写或不持久的默认目录。  
  - 意义：提升容器部署可用性和运维稳定性。

- **流式传输可靠性：Matrix 发送失败可重试**
  - PR: https://github.com/HKUDS/nanobot/pull/5637  
  - 作用：把发送失败暴露给 channel manager 的重试策略。  
  - 意义：减少消息丢失，提升异步通道的健壮性。

- **SDK 流关闭时保留未读事件**
  - PR: https://github.com/HKUDS/nanobot/pull/5635  
  - 作用：避免队列满时丢弃尚未消费的事件。  
  - 意义：修复边界条件下的数据损失。

- **重复抑制缓存加边界**
  - PR: https://github.com/HKUDS/nanobot/pull/5634  
  - 作用：限制 origin reply fingerprint cache 的无限增长。  
  - 意义：降低长期运行网关的内存压力。

- **Codex prompt cache affinity 保持一致**
  - PR: https://github.com/HKUDS/nanobot/pull/5632  
  - 作用：让 session 路由键与 prompt_cache_key 保持稳定一致。  
  - 意义：偏向性能与缓存命中优化，改善模型调用效率。

- **Dream 记忆文件与请求大小保护**
  - PR: https://github.com/HKUDS/nanobot/pull/5630  
  - 作用：补回此前被移除的 size cap，防止记忆文件无限膨胀。  
  - 意义：稳定性和成本控制双重收益。

- **工具提示长度限制修复**
  - PR: https://github.com/HKUDS/nanobot/pull/5629  
  - 作用：对普通工具值也遵守 `max_length`。  
  - 意义：减少超长参数带来的提示污染和性能问题。

- **macOS 沙箱能力增强**
  - PR: https://github.com/HKUDS/nanobot/pull/5628  
  - 作用：新增 seatbelt sandbox backend。  
  - 意义：明显偏向安全与隔离能力建设。

- **WebUI / 原生侧边栏对齐**
  - PR: https://github.com/HKUDS/nanobot/pull/5636  
  - 作用：统一 WebUI 和 native host 的侧边栏控制。  
  - 意义：体验一致性优化，偏 UI 精修。

**总体判断：**  
今天的推进不是“功能大版本跃迁”，而是**围绕核心系统质量的一轮广泛修补**。如果这些 PR 后续顺利合并，项目在**安全性、流式稳定性、内存控制、缓存策略和桌面体验**上会有一轮明显抬升。

---

## 4) 社区热点

### 结论：今日没有明显“评论爆点”
当前数据中，所有 Issue/PR 的评论数都很低或未体现，**没有出现高讨论度、高反应量的条目**。  
因此，社区热点更多是“**需求与修复主题集中**”，而不是“讨论激烈”。

### 值得关注的代表性条目
- **WebUI 需要展示上下文与模型速度**
  - Issue: https://github.com/HKUDS/nanobot/issues/5631  
  - 诉求：提升可观测性，让用户在交互时看到上下文和速度信息。  
  - 背后动机：用户在意模型运行状态和效率反馈，希望像 DeepSeek harness 一样透明。

- **macOS 沙箱与安全隔离**
  - PR: https://github.com/HKUDS/nanobot/pull/5628  
  - 背后诉求：用户希望在本地/桌面环境下运行时更安全，减少 shell 命令风险。

- **会话安全防护**
  - PR: https://github.com/HKUDS/nanobot/pull/5633  
  - 背后诉求：防止不可信输入造成文件越界访问，这是维护者与用户都会高度关注的问题。

---

## 5) Bug 与稳定性

按严重程度排序如下：

### P1 / 安全类
- **会话键路径穿越风险**
  - PR: https://github.com/HKUDS/nanobot/pull/5633  
  - 问题：session key 在持久化前可能被构造成文件路径，存在越界访问风险。  
  - 严重性：**高**，属于明确安全问题。  
  - 状态：**已有 fix PR（当前 PR）**。

### P2 / 正确性与可靠性
- **Matrix 流式发送失败被吞掉**
  - PR: https://github.com/HKUDS/nanobot/pull/5637  
  - 风险：消息失败后未正确进入重试，可能导致输出丢失。  
  - 状态：已有 fix PR。

- **SDK 流关闭时丢事件**
  - PR: https://github.com/HKUDS/nanobot/pull/5635  
  - 风险：队列满时会丢失未读事件，影响上层消费一致性。  
  - 状态：已有 fix PR。

- **重复抑制 fingerprint cache 无界增长**
  - PR: https://github.com/HKUDS/nanobot/pull/5634  
  - 风险：长期运行下内存占用持续上升。  
  - 状态：已有 fix PR。

- **Dream 记忆文件/请求体无大小保护**
  - PR: https://github.com/HKUDS/nanobot/pull/5630  
  - 风险：文件与请求体膨胀，导致 prompt 成本升高、性能下降。  
  - 状态：已有 fix PR。

- **Codex prompt cache 亲和性不一致**
  - PR: https://github.com/HKUDS/nanobot/pull/5632  
  - 风险：缓存键不稳定会降低命中率，影响性能与会话一致性。  
  - 状态：已有 fix PR。

- **工具提示长度限制失效**
  - PR: https://github.com/HKUDS/nanobot/pull/5629  
  - 风险：长参数未截断，可能污染提示上下文。  
  - 状态：已有 fix PR。

- **Copilot OAuth token 落盘位置不可靠**
  - PR: https://github.com/HKUDS/nanobot/pull/5638  
  - 风险：容器环境中 token 可能丢失或不可写。  
  - 状态：已有 fix PR。

### UI / 体验类
- **WebUI 与 native sidebar 对齐**
  - PR: https://github.com/HKUDS/nanobot/pull/5636  
  - 影响：体验一致性问题，不是稳定性故障。  
  - 状态：已有修复 PR。

---

## 6) 功能请求与路线图信号

### 新功能需求信号
- **在 WebUI 展示上下文、模型速度等信息**
  - Issue: https://github.com/HKUDS/nanobot/issues/5631  
  - 信号强度：**高**，因为这是直接面向用户的可观测性增强，且诉求明确、场景清晰。  
  - 路线图意义：如果纳入，将明显提升“响应透明度”和“交互信心”。

### 从现有 PR 反推的下一步方向
- **安全与隔离能力继续加码**
  - PR: https://github.com/HKUDS/nanobot/pull/5628  
  - 说明项目已在补桌面/命令执行沙箱能力，后续很可能继续补齐相关安全链路。

- **运行稳定性与资源治理优先级很高**
  - PR: https://github.com/HKUDS/nanobot/pull/5630  
  - PR: https://github.com/HKUDS/nanobot/pull/5634  
  - PR: https://github.com/HKUDS/nanobot/pull/5635  
  - 说明下一版本大概率优先解决“长跑服务”的内存、队列、文件大小等问题。

- **WebUI 体验优化仍在持续**
  - PR: https://github.com/HKUDS/nanobot/pull/5636  
  - 说明 UI 方向还在打磨，#5631 这样的可观测性需求可能较容易进入后续版本候选。

### 版本路线判断
若按当前活跃度判断，**下一版本更可能优先收敛安全、稳定性、性能修复**，#5631 这种 UI 可观测性增强可能会作为“增强项”进入后续迭代，而非本轮优先修复对象。

---

## 7) 用户反馈摘要

本日最清晰的用户反馈来自：

- **Issue #5631：希望在 WebUI 中展示上下文和模型速度**
  - 链接：https://github.com/HKUDS/nanobot/issues/5631  
  - 真实痛点：用户希望知道“模型现在跑得快不快、上下文还剩多少”，以便判断回复质量和成本。  
  - 使用场景：回答结束后、输入框附近、类似 deepseek harness 的状态展示。  
  - 反馈含义：当前 WebUI 的问题不是“不能用”，而是**缺少足够的运行态透明度**。  
  - 用户态度：偏积极改进型，没有抱怨崩溃或严重错误，但明确希望增强可视化反馈。

---

## 8) 待处理积压

### 说明
在你提供的数据里，所有 Issue/PR 都集中在 **2026-09-02 ~ 2026-09-03**，**暂时无法严格判断为“长期未响应积压”**。  
也就是说：**当前快照中没有可确认的老旧沉默项**。

### 但从优先级看，以下开放项值得尽快处理
- **安全高优先级**
  - PR: https://github.com/HKUDS/nanobot/pull/5633

- **用户明确需求、影响面广**
  - Issue: https://github.com/HKUDS/nanobot/issues/5631

- **基础设施/长跑稳定性**
  - PR: https://github.com/HKUDS/nanobot/pull/5634  
  - PR: https://github.com/HKUDS/nanobot/pull/5635  
  - PR: https://github.com/HKUDS/nanobot/pull/5637

### 维护建议
如果这些 PR 持续停留在开放状态，建议优先组织一次**安全/稳定性集中 review**，避免质量修复长期滞留影响后续发布节奏。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发群的短版**，或  
2. **适合放到周报/日报系统里的 Markdown 标准版**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-09-03）

## 1) 今日速览

今天 Hermes Agent 处于**高活跃、强反馈**状态：过去 24 小时内共有 **50 条 Issues 更新** 和 **50 条 PR 更新**，但**没有新版本发布**。从议题分布看，讨论重心明显集中在 **桌面端、会话状态、权限/审批、Windows 兼容性、MCP/OAuth、cron/CLI 稳定性** 等核心路径。  
当前数据表明项目仍在快速迭代，但同时暴露出不少“**可复现、可定位、影响实际使用**”的问题，说明社区参与度高，维护压力也较大。  
从健康度看，项目不是停滞，而是处在**问题密集发现与修复并行推进**的阶段；短期内更像是“**修复驱动型增长**”而非“发布驱动型增长”。

---

## 3) 项目进展

今日可见的已结束 PR 中，最有意义的是以下两项：

- [PR #101823](https://github.com/NousResearch/hermes-agent/pull/101823) — **enable local models by default on win32 and darwin**  
  这说明项目在桌面端平台策略上继续向“**开箱即用本地模型**”靠拢，对 Windows/macOS 用户体验是明显加分项。

- [PR #101836](https://github.com/NousResearch/hermes-agent/pull/101836) — **fmt(js): `npm run fix` auto-fix**  
  虽然偏工程卫生，但这类自动格式修复有助于降低后续审查噪音，提升维护效率。

此外，今天还有多项关键修复 PR 处于待合并状态，说明主线修复正在加速推进，例如：  
- [PR #101842](https://github.com/NousResearch/hermes-agent/pull/101842) — kanban reclaim 的 dirty worktree 拒绝机制  
- [PR #101841](https://github.com/NousResearch/hermes-agent/pull/101841) — 远程 Desktop 更新后避免 agent 启动损坏  
- [PR #101840](https://github.com/NousResearch/hermes-agent/pull/101840) — 永久 allowlist 改为替换式重载  
- [PR #101834](https://github.com/NousResearch/hermes-agent/pull/101834) — timeout-to-late-ack handoff 原子化  
- [PR #101838](https://github.com/NousResearch/hermes-agent/pull/101838) — Embedded terminal 的 MSYS 路径转换修复  

**整体判断**：今日项目推进不是靠大版本发布，而是靠一批针对性修复把高风险路径逐步收紧；但当前 PR 堆积仍多，说明修复带宽仍偏紧。

---

## 4) 社区热点

今日最活跃的讨论，几乎全部围绕“**真实使用中会直接出问题的路径**”。

1. [Issue #101800](https://github.com/NousResearch/hermes-agent/issues/101800) — Rate-limit exit sentinel 不可达，配额耗尽被误判为 clean-exit 协议违规并触发 crashloop  
   - 评论数：4  
   - 诉求本质：**错误分类会放大故障**，不是单纯报错，而是把“资源耗尽”处理成“协议违规”，会导致流程反复崩溃。

2. [Issue #101817](https://github.com/NousResearch/hermes-agent/issues/101817) — ACP context meter 把累计 token 当成当前用量  
   - 评论数：2  
   - 诉求本质：**计量口径必须准确**，否则用户会误判上下文剩余量，直接影响会话继续和成本控制。

3. [Issue #101748](https://github.com/NousResearch/hermes-agent/issues/101748) — Dashboard 在 Desktop 场景仍错误服务 Electron renderer  
   - 评论数：2  
   - 诉求本质：**桌面/网页双栈兼容性**仍存在边界遗漏，说明此前修复没有覆盖 Desktop-spawned 的全部路径。

4. [Issue #101644](https://github.com/NousResearch/hermes-agent/issues/101644) — named `/v1/responses` conversation 会重复写入历史  
   - 评论数：2  
   - 诉求本质：**会话历史一致性**是底层可靠性问题，重复写入会直接污染上下文和后续推理。

5. [Issue #101655](https://github.com/NousResearch/hermes-agent/issues/101655) — 受保护指令写入审批卡只显示目标标签，不展示将写入内容  
   - 评论数：2  
   - 诉求本质：**审批必须可审计、可理解**，否则“确认”本身就变成盲签。

**热点背后的共同信号**：  
用户并不只在“要功能”，而是在要求 Hermes Agent 的核心能力——**状态、审批、计量、会话和路由**——必须足够可信。换句话说，社区今天最关心的是“**不会悄悄做错事**”。

---

## 5) Bug 与稳定性

以下按严重性与影响面排序，优先列出 P2 与有明确回归/稳定性风险的问题，并标注是否已有修复 PR。

### P2：高优先级、影响核心流程

- [Issue #101800](https://github.com/NousResearch/hermes-agent/issues/101800)  
  **Rate-limit exit sentinel 不可达，quota exhaustion 被误分类**  
  影响：CLI / cron 在配额耗尽时可能 crashloop，属于运行时控制流误判。  
  修复 PR：**未见对应 PR**

- [Issue #101748](https://github.com/NousResearch/hermes-agent/issues/101748)  
  **Dashboard 在 Desktop 场景仍错误提供 Electron renderer**  
  影响：桌面/浏览器客户端行为分叉，属于回归型兼容问题。  
  修复 PR：**未见对应 PR**

- [Issue #101824](https://github.com/NousResearch/hermes-agent/issues/101824)  
  **compute-host timeout 到 late-ack 的 handoff 非原子**  
  影响：会话/压缩路径存在竞态，可能造成状态丢失或错误归属。  
  修复 PR：**有** — [PR #101834](https://github.com/NousResearch/hermes-agent/pull/101834)

- [Issue #101756](https://github.com/NousResearch/hermes-agent/issues/101756)  
  **MCP OAuth async_auth_flow 没有 close 内部 generator，污染 context.lock**  
  影响：OAuth MCP server 可能永久卡死，属于典型的资源泄露/锁污染问题。  
  修复 PR：**未见对应 PR**

- [Issue #101803](https://github.com/NousResearch/hermes-agent/issues/101803)  
  **自定义/本地 Ollama provider 直接报 `No route to host`**  
  影响：本地模型接入失败，严重影响私有部署与离线场景。  
  修复 PR：**未见对应 PR**

- [Issue #101789](https://github.com/NousResearch/hermes-agent/issues/101789)  
  **Windows Desktop 更新在最终目录交换阶段失败**  
  影响：更新流程脆弱，容易卡在发布/升级环节。  
  修复 PR：**未见对应 PR**

- [Issue #101786](https://github.com/NousResearch/hermes-agent/issues/101786)  
  **项目级 skill 在项目会话中无法通过 `/` 唤醒和调用**  
  影响：Desktop + 项目技能链路断裂，属于工作流主路径失败。  
  修复 PR：**未见对应 PR**

- [Issue #101783](https://github.com/NousResearch/hermes-agent/issues/101783)  
  **Discord typing indicator 持续不消失**  
  影响：消息交付状态失真，虽然不致命，但会显著降低信任。  
  修复 PR：**未见对应 PR**

### P3：中高优先级、影响准确性和体验

- [Issue #101744](https://github.com/NousResearch/hermes-agent/issues/101744)  
  **`rollback.diff` 静默截断到 4000 字符**  
  修复 PR：**未见对应 PR**

- [Issue #101743](https://github.com/NousResearch/hermes-agent/issues/101743)  
  **Dashboard 的 checkpoint 列表全是空标签**  
  修复 PR：**未见对应 PR**

- [Issue #101742](https://github.com/NousResearch/hermes-agent/issues/101742)  
  **打开 session 可能落入 sub-agent/branch transcript**  
  修复 PR：**未见对应 PR**

- [Issue #101741](https://github.com/NousResearch/hermes-agent/issues/101741)  
  **撤销永久 command approval 后仍继续生效**  
  修复 PR：**有** — [PR #101840](https://github.com/NousResearch/hermes-agent/pull/101840)

- [Issue #101826](https://github.com/NousResearch/hermes-agent/issues/101826)  
  **Windows embedded terminal 的 bash 子进程缺少 MSYS path-conversion 保护**  
  修复 PR：**有** — [PR #101838](https://github.com/NousResearch/hermes-agent/pull/101838)、[PR #101835](https://github.com/NousResearch/hermes-agent/pull/101835)

- [Issue #101822](https://github.com/NousResearch/hermes-agent/issues/101822)  
  **Desktop SSH remote update 让 backend 处于 stale modules，导致初始化失败**  
  修复 PR：**有** — [PR #101841](https://github.com/NousResearch/hermes-agent/pull/101841)

- [Issue #101788](https://github.com/NousResearch/hermes-agent/issues/101788)  
  **kanban reclaim 会在未检查脏工作区的情况下释放 claim**  
  修复 PR：**有** — [PR #101842](https://github.com/NousResearch/hermes-agent/pull/101842)

- [Issue #101669](https://github.com/NousResearch/hermes-agent/issues/101669)  
  **MCP boolean property schema 让整个 server 失效**  
  修复 PR：**未见对应 PR**

- [Issue #101644](https://github.com/NousResearch/hermes-agent/issues/101644)  
  **responses conversation 历史重复写入**  
  修复 PR：**未见对应 PR**

**稳定性总评**：  
今天的 bug 不是“零散小毛病”，而是集中落在 **会话状态、更新链路、权限边界、Windows 兼容、MCP/OAuth 可靠性** 上。好消息是，已有多项修复 PR 对准了这些问题；坏消息是，仍有不少核心故障没有对应修复进入公开排队。

---

## 6) 功能请求与路线图信号

今日新增/活跃的功能诉求，主要反映出用户希望 Hermes Agent 更“**少打断、少重开、少歧义**”。

- [Issue #101769](https://github.com/NousResearch/hermes-agent/issues/101769) — **Profile 切换时应打开已有 Bot Chat，而不是总新建 session**  
  路线图信号：这是典型的 **会话连续性** 需求，若 Desktop 继续强化“多 profile / 多 bot”工作流，这类能力很可能会上升。

- [Issue #101684](https://github.com/NousResearch/hermes-agent/issues/101684) — **在没有本地 backend 时可隐藏/移除内置 “This device” 连接**  
  路线图信号：桌面端对 **远程托管拓扑** 的适配需求变强，UI 降噪会成为重点。

- [Issue #101837](https://github.com/NousResearch/hermes-agent/issues/101837) — **Webhook adapter 支持 Standard Webhooks 签名头**  
  路线图信号：说明 Hermes Agent 正在触达更广泛的外部集成生态，Webhook 兼容性有现实需求。

- [Issue #101832](https://github.com/NousResearch/hermes-agent/issues/101832) — **本地化 slash command catalog**  
  路线图信号：国际化已经从“界面文案”走向“命令系统”，说明桌面端多语言体验在继续推进。  
  同时对应已有 PR： [PR #101832](https://github.com/NousResearch/hermes-agent/pull/101832)

- [PR #101823](https://github.com/NousResearch/hermes-agent/pull/101823) — **桌面端默认启用本地模型**  
  虽然这是已关闭项，但它强烈表明：**本地模型与跨平台默认可用性** 很可能是下一阶段的持续方向。

**结论**：下一版本最可能优先纳入的，不是“炫技型新特性”，而是能显著提升连续工作体验的能力：**会话复用、国际化、远程拓扑友好、Webhook/MCP 生态适配**。

---

## 7) 用户反馈摘要

从 Issues 评论与描述内容看，用户最真实的痛点集中在以下几类：

1. **状态不可信**  
   用户多次指出 token 计量、session 历史、checkpoint 标签、rollback diff 等显示/统计结果不准确。  
   相关链接： [#101817](https://github.com/NousResearch/hermes-agent/issues/101817), [#101643](https://github.com/NousResearch/hermes-agent/issues/101743), [#101744](https://github.com/NousResearch/hermes-agent/issues/101744)

2. **权限/审批不透明**  
   受保护文件写入、永久命令审批撤销等问题说明，用户对“**看不见内容就让我批准**”非常敏感。  
   相关链接： [#101655](https://github.com/NousResearch/hermes-agent/issues/101655), [#101741](https://github.com/NousResearch/hermes-agent/issues/101741)

3. **桌面端跨平台不一致**  
   Windows、macOS、Desktop preview、embedded terminal、remote gateway 等路径问题密集，说明真实用户在混合环境中使用 Hermes。  
   相关链接： [#101748](https://github.com/NousResearch/hermes-agent/issues/101748), [#101783](https://github.com/NousResearch/hermes-agent/issues/101783), [#101826](https://github.com/NousResearch/hermes-agent/issues/101826), [#101822](https://github.com/NousResearch/hermes-agent/issues/101822)

4. **更新/升级过程不够稳**  
   远程更新、Windows update swap、update receipt 丢失等问题说明升级链路仍是高风险点。  
   相关链接： [#101690](https://github.com/NousResearch/hermes-agent/issues/101690), [#101789](https://github.com/NousResearch/hermes-agent/issues/101789), [#101822](https://github.com/NousResearch/hermes-agent/issues/101822)

5. **用户并不排斥复杂功能，但要求“可控、可解释”**  
   无论是 MCP、Webhook、OAuth 还是 cron，大家要的不是“更多自动化”本身，而是自动化在出错时能明确退化、能追踪、能恢复。  
   相关链接： [#101756](https://github.com/NousResearch/hermes-agent/issues/101756), [#101669](https://github.com/NousResearch/hermes-agent/issues/101669), [#101837](https://github.com/NousResearch/hermes-agent/issues/101837)

**总体感受**：用户对 Hermes Agent 的期待已经从“能用”上升到“**在复杂场景中也要可信赖**”。这是一种积极信号，也意味着项目进入了更成熟的产品化阶段。

---

## 8) 待处理积压

从当前快照看，未必存在“长期未响应”的历史老 issue，但已经形成了一批**高优先级、未见修复 PR 的待办积压**，建议维护者优先关注：

- [Issue #101800](https://github.com/NousResearch/hermes-agent/issues/101800) — rate-limit 误分类，可能诱发 crashloop  
- [Issue #101748](https://github.com/NousResearch/hermes-agent/issues/101748) — Desktop-spawned Dashboard 仍走错渲染路径  
- [Issue #101756](https://github.com/NousResearch/hermes-agent/issues/101756) — MCP OAuth generator/lock 泄漏  
- [Issue #101803](https://github.com/NousResearch/hermes-agent/issues/101803) — 本地 Ollama 连接瞬时失败  
- [Issue #101789](https://github.com/NousResearch/hermes-agent/issues/101789) — Windows 更新最终 swap 失败  
- [Issue #101669](https://github.com/NousResearch/hermes-agent/issues/101669) — MCP schema 一处异常拖垮整个 server  
- [Issue #101644](https://github.com/NousResearch/hermes-agent/issues/101644) — responses conversation 历史重复写入  
- [Issue #101742](https://github.com/NousResearch/hermes-agent/issues/101742) — session 打开后落入错误 transcript 分支  
- [Issue #101655](https://github.com/NousResearch/hermes-agent/issues/101655) — 受保护写入审批缺少内容披露  

**提醒维护者**：这些问题大多不是“边角体验”，而是会直接影响 **会话可信度、更新安全性、Windows 可用性、远程部署稳定性** 的核心积压项。若不尽快分流到修复 PR，后续讨论成本会继续上升。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合内部晨会的 1 页精简版**，或  
2. **适合发到飞书/Slack 的要点版**。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-09-03）

## 1. 今日速览
过去 24 小时，NanoClaw 的仓库表现为**高活跃、无发布**状态：新增/活跃 Issue 1 条，开放 PR 2 条，且均集中在 **bug 修复** 方向。  
这说明维护节奏仍然在推进，当前重点不是功能扩张，而是**稳定性与执行路径修正**。  
今日没有新版本发布，也没有已合并 PR，意味着本日的改动仍停留在审查与验证阶段。  
整体来看，项目健康度偏稳，社区诉求清晰，但“已解决成果”尚未落地。  

---

## 2. 版本发布
**今日无新版本发布。**

---

## 3. 项目进展
今日没有 PR 合并或关闭，因此**没有可确认的已交付功能增量**。  
不过，两个开放中的修复 PR 明确指向核心体验改进，体现出项目正在处理真实使用中的边缘缺陷：

- **PR #3703**：修复“适配器断开连接时，delivery 仍消耗重试次数”的问题  
  链接：<https://github.com/qwibitai/nanoclaw/pull/3703>  
  影响：这类修复直接提升传输层的容错效率，减少无效重试带来的延迟和资源浪费。

- **PR #3702**：修复 `ncl tasks run` 任务需要等到下一次 resync tick 才启动的问题  
  链接：<https://github.com/qwibitai/nanoclaw/pull/3702>  
  影响：这属于 CLI 交互/调度即时性改进，能显著降低用户感知延迟，改善命令执行体验。

**项目前进程度评估：**  
今天没有“已交付”的里程碑，但从 PR 内容看，项目正在围绕**核心执行链路、连接状态判断、任务调度即时性**做底层修补，这类改动虽然不一定立刻形成版本发布，却对稳定性和可用性有直接价值。

---

## 4. 社区热点
今日最活跃的话题主要集中在以下 3 个条目（均无评论/无明显 reaction 数据，但从内容上看是社区关注焦点）：

### 4.1 Issue #3701：是否接受 gateway-declared credential lane？
链接：<https://github.com/qwibitai/nanoclaw/issues/3701>  
- 状态：OPEN  
- 评论：0  
- 👍：0  
- 主题：认证凭据注入与 gateway/driver seam 的设计边界

**背后诉求：**  
该 Issue 反映出用户在多 agent group、多 credential set 场景下，需要一种更适合 gateway 模式的凭据声明方式。  
这不是简单的“多传一个配置项”，而是在讨论：
- gateway 代理边界如何表达凭据；
- `validateSpec` 是否应接受由 gateway 声明的 credential lane；
- 如何让 `contributedEnv` 与 placeholder-swap 模式更自然地协作。

这类问题通常意味着：项目已经进入**真实部署复杂场景**，用户开始把 NanoClaw 用在更像“平台层”的环境中，而不只是单一 agent 运行。

### 4.2 PR #3702：`tasks run` 即时进入 reconcile queue
链接：<https://github.com/qwibitai/nanoclaw/pull/3702>  
- 状态：OPEN  
- 评论：0  
- 👍：0  

**背后诉求：**  
用户期待命令执行后“立即生效”，而不是依赖周期性 resync。  
这说明 CLI 的即时反馈体验已成为关注点，尤其是在任务调度类工具里，**延迟会直接被感知为 bug**。

### 4.3 PR #3703：断连适配器不应继续消耗 delivery 重试
链接：<https://github.com/qwibitai/nanoclaw/pull/3703>  
- 状态：OPEN  
- 评论：0  
- 👍：0  

**背后诉求：**  
社区关注的是“失败是否可恢复”以及“失败成本是否合理”。  
如果适配器只是断线重连中，就不应该把有限的重试次数耗在必然失败的 delivery 上。  
这类修复体现了项目在向更成熟的失败处理语义演进。

---

## 5. Bug 与稳定性
今日最明确的稳定性问题都已经以 **修复 PR** 的形式出现，按影响优先级排序如下：

### 5.1 高优先级：delivery 在适配器断开时仍浪费重试次数
- 相关 PR：#3703  
  链接：<https://github.com/qwibitai/nanoclaw/pull/3703>  
- 问题描述：`ChannelAdapter.isConnected()` 虽然是契约的一部分，但 delivery 流程未检查它，导致断连/重连期间反复 throw 并消耗三次 attempt。  
- 风险：  
  - 无效重试浪费时间；
  - 可能掩盖真正的链路状态；
  - 降低消息投递成功率与系统可解释性。  
- 是否已有 fix PR：**是**

### 5.2 中优先级：`ncl tasks run` 不会立即触发执行
- 相关 PR：#3702  
  链接：<https://github.com/qwibitai/nanoclaw/pull/3702>  
- 问题描述：任务已入 due row，但未进入 reconcile queue，导致最多等待 60 秒 resync。  
- 风险：  
  - 用户误以为命令无响应；
  - 影响自动化脚本与交互式使用体验；
  - 容易被误判为调度失效。  
- 是否已有 fix PR：**是**

### 5.3 今日未见明确 crash / 数据丢失 / 回归报告
- Issue 列表中没有新的崩溃、数据损坏或严重回归描述。  
- 说明当前暴露的问题偏向**执行逻辑与体验层面**，尚未出现明显的高危稳定性事故。

---

## 6. 功能请求与路线图信号
今日最值得关注的新功能需求来自 **Issue #3701**：

### 6.1 gateway-declared credential lane
链接：<https://github.com/qwibitai/nanoclaw/issues/3701>  
- 需求本质：希望在 `validateSpec` 中接纳由 gateway 声明的 credential lane，以支持多 agent group、每组独立凭据、gateway 代理注入的部署方式。  
- 路线图信号：  
  - 如果项目未来继续强化 gateway / proxy 边界，这一需求很可能会进入下一阶段设计讨论；
  - 该诉求与 `contributedEnv`、placeholder-swap、driver seam 等已有机制相关，属于**架构兼容性增强**，不是孤立特性。  
- 进入下一版本的可能性：**中等偏高**  
  原因是它贴近真实场景，且 issue 叙述显示已有可运行 fork，说明需求并非概念性建议，而是落地压力。

### 6.2 与当前 PR 的路线图关联
- PR #3702 和 #3703 都在修复核心执行链路，说明短期路线图优先级仍是：
  1. 任务调度即时性；
  2. delivery / reconnect 稳定性；
  3. 执行语义更可预测。  
- 这些修复若合并，可能会为下一版奠定“更稳定的基础行为”，从而为 gateway 相关设计留出更可靠的底座。

---

## 7. 用户反馈摘要
从今日 Issue 内容可以提炼出以下真实用户反馈：

### 7.1 使用场景更复杂，已进入多租户/多凭据代理模式
链接：<https://github.com/qwibitai/nanoclaw/issues/3701>  
用户在实际使用中将 NanoClaw 放在 gateway 模式下运行，管理 **24 个 agent groups**，每组有独立凭据。  
这说明项目不再只被当作单机 agent 工具使用，而是逐步进入**中大型编排场景**。

### 7.2 用户对“配置边界”非常敏感
Issue 中强调 `validateSpec`、`contributedEnv`、placeholder-swap 等机制，说明用户对系统内部 seam 的设计很关注。  
这反映出一个事实：  
- 用户希望项目提供**可扩展但不脆弱**的接入点；
- 他们不满足于临时绕过，而希望框架原生支持复杂部署。

### 7.3 用户对命令即时反馈有明显期待
PR #3702 所反映的问题表明，用户把“运行后马上开始”视为基本预期。  
这类反馈通常来自实际操作中的不耐等待体验，说明项目在交互链路上还有继续打磨空间。

### 7.4 用户对失败语义的容忍度较低
PR #3703 所对应的问题表明，用户不接受“明知会失败还继续重试”的行为。  
他们更希望系统能正确识别连接状态，避免把时间浪费在无效动作上。

---

## 8. 待处理积压
从今日数据看，**没有明显的长期未响应积压项**：  
- Issue #3701 创建于 2026-09-02，仍是新鲜需求；  
- 两个 PR 都是 2026-09-03 新开，尚处于待审阶段。  

因此，当前更像是**新问题快速涌入、等待维护者确认方向**，而不是“老问题堆积”的局面。  
建议维护者优先关注：

1. **Issue #3701**：架构级需求，若方向明确，能减少后续 fork 分化。  
   链接：<https://github.com/qwibitai/nanoclaw/issues/3701>  
2. **PR #3702**：直接改善 CLI 可用性，用户感知强。  
   链接：<https://github.com/qwibitai/nanoclaw/pull/3702>  
3. **PR #3703**：核心 delivery 稳定性修复，建议尽快评审。  
   链接：<https://github.com/qwibitai/nanoclaw/pull/3703>  

---

如果你愿意，我也可以把这份日报进一步整理成：
- **适合周报/晨报的更短版**
- **面向维护者的优先级清单版**
- **适合团队 Slack / 飞书发布的简洁播报版**

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-09-03）

## 1. 今日速览
今天 IronClaw 处于**高活跃、偏底层治理**的状态：过去 24 小时共有 **6 条 Issue 更新**、**14 条 PR 更新**，虽然没有新版本发布，但工程推进非常集中。  
从内容看，团队主要在处理三类问题：**运行时正确性**（如工具失败语义、回复拼接）、**CI/CLI 稳定性**（烟雾测试、执行环境、编译缓存）、以及 **WebUI TypeScript 技术债清理**。  
整体上这是一次“打地基”型的活跃窗口：不追求新增功能数量，而是优先修复会影响模型行为、测试可靠性和前端长期维护成本的问题。  
当前项目健康度偏正向，但也说明核心子系统正在经历较大规模重构与收敛，后续需要关注回归风险。

---

## 3. 项目进展

### 已关闭/合并的重要 PR
1. **[#8051](https://github.com/nearai/ironclaw/pull/8051)** — `fix(reply): the answer is the current model call's text; earlier calls are narration`  
   修复了回复拼接逻辑：最终答案应来自**当前模型调用的文本**，而不是把更早的 narration 一并拼进去。  
   这类修复直接提升了对话输出的正确性，属于用户可感知的高价值修正。

2. **[#8050](https://github.com/nearai/ironclaw/pull/8050)** — `ci: stop cold-compiling every Reborn lane...`  
   优化 Reborn lane 的 CI 编译策略，减少冷编译和重复编译，改善构建成本与等待时间。  
   这是明显的基础设施收益，通常会显著降低 PR 队列和 merge queue 的阻塞概率。

3. **[#8045](https://github.com/nearai/ironclaw/pull/8045)** — `fix(ci): wait for CLI listener readiness in smoke tests`  
   修复 CLI smoke test 的就绪判断，避免只看 banner 不看真实监听状态导致的偶发失败。  
   这类改动直接提升测试稳定性，减少“假启动成功”的问题。

4. **[#8042](https://github.com/nearai/ironclaw/pull/8042)** — `fix(cli,ci): keep serve alive when stderr closes...`  
   修复 serve 进程在 stderr 关闭时提前退出、以及 critical gate 判定不严谨等问题。  
   这属于典型的运行时/测试双修复，对稳定性和回归覆盖都有帮助。

### 进展评估
今天已关闭的 4 个 PR，覆盖了 **回复正确性、CI 性能、CLI 启动稳定性、门禁判定** 四个关键方向。  
从项目层面看，这说明 IronClaw 在把“可用”推进到“可持续可靠可维护”的阶段，属于**质量优先的实质推进**，而不是表面功能迭代。

---

## 4. 社区热点

> 说明：当前抓取中，Issues/PR 的评论数与点赞数基本为 0 或未统计，**没有明显的高评论爆点**。因此这里按“近期更新密度 + 影响面”识别热点。

### 热点 1：WebUI TypeScript 技术债清理
- **[#8032](https://github.com/nearai/ironclaw/issues/8032)** — Eliminate `@ts-nocheck` Debt from the WebUI v2 Frontend  
- **[#8033](https://github.com/nearai/ironclaw/issues/8033)** — Remove Redundant `@ts-nocheck` Directives and Prevent New Suppressions  
- **[#8034](https://github.com/nearai/ironclaw/issues/8034)** — Add Shared API Types and Remove `@ts-nocheck` from Frontend Boundary Modules  
- **[#8035](https://github.com/nearai/ironclaw/issues/8035)** — Remove `@ts-nocheck` from WebUI Production Components and Hooks  
- **[#8036](https://github.com/nearai/ironclaw/issues/8036)** — Type WebUI Test Infrastructure and Remove Remaining Test Suppressions  
- 对应 PR：**[#8037](https://github.com/nearai/ironclaw/pull/8037)**、**[#8038](https://github.com/nearai/ironclaw/pull/8038)**、**[#8039](https://github.com/nearai/ironclaw/pull/8039)**、**[#8040](https://github.com/nearai/ironclaw/pull/8040)**  
- 诉求分析：社区/维护者显然希望通过系统性类型化，结束 `@ts-nocheck` 蔓延带来的维护不可控问题。这类工作通常不“显眼”，但对长期质量和 CI 可预期性非常关键。

### 热点 2：模型失败语义与可恢复性
- **[#8041](https://github.com/nearai/ironclaw/issues/8041)** — `A tool failure whose kind is wrong sends the model somewhere it cannot recover`  
- 诉求分析：这里关注的不是简单报错，而是**错误分类错误会把模型引到不可恢复路径**。这说明团队正在面对“agent/工具调用的失败语义”这一核心问题，属于高优先级正确性热点。

### 热点 3：子代理审批/凭证门控可见性
- **[#8046](https://github.com/nearai/ironclaw/pull/8046)** — `feat(subagent): a child's approval/auth gate reaches the owner's inbox`  
- 诉求分析：用户/维护者希望子代理卡在审批或授权时，**上游 owner 能及时感知**，避免“子任务悄悄卡死”。这反映了多代理协作场景中可观测性与责任回传的重要性。

### 热点 4：LLM 缓存与流式性能
- **[#8044](https://github.com/nearai/ironclaw/pull/8044)** — `fix(llm): cache-gate new Claude families...`  
- **[#8043](https://github.com/nearai/ironclaw/pull/8043)** — `perf(loop-host): coalesce streamed text updates...`  
- 诉求分析：前者是**能力兼容性**，后者是**流式输出性能**。二者都直接影响实际使用体验，尤其是大模型响应时延、缓存命中率和系统成本。

---

## 5. Bug 与稳定性

### 严重级别：高
1. **[#8041](https://github.com/nearai/ironclaw/issues/8041)** — 工具失败类型错误导致模型进入不可恢复状态  
   - 问题性质：这是一个**状态机/错误语义级别**的问题，不只是单次失败，而是可能让 agent 走到无法恢复的分支。  
   - 影响：会导致工具调用失败后重试/纠正机制失效，严重时影响整个任务链路。  
   - 现状：**当前未看到对应已合并的 fix PR**。

### 严重级别：中
2. **[#8051](https://github.com/nearai/ironclaw/pull/8051)** — 回复文本拼接错误  
   - 问题性质：输出内容正确性 bug，容易造成“回答被 narration 污染”。  
   - 现状：**已有修复 PR，且已关闭**。  
   - 影响：用户侧可见性高，属于必须修复的准确性问题。

3. **[#8042](https://github.com/nearai/ironclaw/pull/8042)**、**[#8045](https://github.com/nearai/ironclaw/pull/8045)** — CLI/CI 稳定性问题  
   - 问题性质：启动就绪判断、服务进程生命周期、烟雾测试 flake。  
   - 现状：**已有修复 PR，且已关闭**。  
   - 影响：减少假阳性失败和 merge queue 波动，对稳定性提升明显。

### 严重级别：低/治理型
4. **[#8032](https://github.com/nearai/ironclaw/issues/8032)** 至 **[#8036](https://github.com/nearai/ironclaw/issues/8036)**  
   - 这组问题主要是 WebUI 的 TypeScript 抑制债务，不是直接崩溃 bug，但会显著放大后续缺陷风险。  
   - 现状：多数已有对应 PR 在推进中，属于“长期健康度修复”。

---

## 6. 功能请求与路线图信号

### 可能进入下一版本的方向
1. **子代理审批与权限流转改进**
   - 来源：**[#8046](https://github.com/nearai/ironclaw/pull/8046)**
   - 信号：多代理协作的可见性和 owner 通知机制正在补齐。  
   - 预判：很可能会被纳入下一轮版本，因为它直接改善任务阻塞与人机协作效率。

2. **LLM 缓存兼容性扩展**
   - 来源：**[#8044](https://github.com/nearai/ironclaw/pull/8044)**  
   - 信号：新 Claude 家族需要更稳健的 cache 识别策略，OpenAI Responses 也需要显式 `prompt_cache_key`。  
   - 预判：属于模型接入层面的持续演进，通常会优先进入正式版本。

3. **流式输出性能优化**
   - 来源：**[#8043](https://github.com/nearai/ironclaw/pull/8043)**
   - 信号：性能优化不是锦上添花，而是大响应场景下的核心体验问题。  
   - 预判：若回归测试稳定，值得较快合入。

4. **WebUI 类型安全与 API 边界收紧**
   - 来源：**[#8032](https://github.com/nearai/ironclaw/issues/8032)** 到 **[#8040](https://github.com/nearai/ironclaw/pull/8040)**
   - 信号：团队正在把前端从“能跑”推进到“可验证、可维护、可扩展”。  
   - 预判：这更像一轮持续性平台化升级，可能分批进入多个后续版本。

---

## 7. 用户反馈摘要

### 真实痛点
- **失败后要能恢复，而不是“失败即迷路”**  
  来自 **[#8041](https://github.com/nearai/ironclaw/issues/8041)**：用户非常在意工具失败的语义是否正确，因为这决定 agent 能否继续自我修正。

- **子任务卡住时，owner 必须知道**  
  来自 **[#8046](https://github.com/nearai/ironclaw/pull/8046)**：用户需要的是“可见的阻塞”，而不是子代理静默挂起。

- **模型能力变化不能悄悄降级**  
  来自 **[#8044](https://github.com/nearai/ironclaw/pull/8044)**：当新模型家族不在 allowlist 内时，系统静默降级为无缓存，这对成本和时延都不友好。

- **前端和测试不应长期依赖抑制注释**  
  来自 **[#8032](https://github.com/nearai/ironclaw/issues/8032)** 到 **[#8036](https://github.com/nearai/ironclaw/issues/8036)**：维护者显然不满意大量 `@ts-nocheck` 带来的“看似稳定、实则脆弱”的开发体验。

### 使用场景反馈
- 代理执行链路中既有**工具调用**、又有**审批门控**、还有**流式输出**，说明 IronClaw 正在被用于较复杂的 agent 工作流。  
- 用户最看重的不是单点功能，而是：**失败可恢复、状态可见、接口稳定、输出正确、性能可接受**。

---

## 8. 待处理积压

> 说明：当前数据里，这些条目大多只更新于 **2026-09-02/09-03**，严格来说还不算“长期未响应”；但它们影响面大，值得维护者尽快分配和跟进。

### 高优先级待办
- **[#8041](https://github.com/nearai/ironclaw/issues/8041)** — 工具失败语义错误，可能导致不可恢复状态
- **[#8046](https://github.com/nearai/ironclaw/pull/8046)** — 子代理审批/授权门控可见性
- **[#8044](https://github.com/nearai/ironclaw/pull/8044)** — 新 Claude 家族缓存兼容
- **[#8043](https://github.com/nearai/ironclaw/pull/8043)** — 流式文本更新性能优化
- **[#8040](https://github.com/nearai/ironclaw/pull/8040)**、**[#8039](https://github.com/nearai/ironclaw/pull/8039)**、**[#8038](https://github.com/nearai/ironclaw/pull/8038)**、**[#8037](https://github.com/nearai/ironclaw/pull/8037)** — WebUI 类型化主线，建议统一排期以避免分散推进

### 次级但值得关注
- **[#8049](https://github.com/nearai/ironclaw/pull/8049)**、**[#8048](https://github.com/nearai/ironclaw/pull/8048)**、**[#8047](https://github.com/nearai/ironclaw/pull/8047)** — 依赖升级类 PR，风险低但需要常规检查
- **[#8033](https://github.com/nearai/ironclaw/issues/8033)**、**[#8034](https://github.com/nearai/ironclaw/issues/8034)**、**[#8035](https://github.com/nearai/ironclaw/issues/8035)**、**[#8036](https://github.com/nearai/ironclaw/issues/8036)** — 建议建立统一的类型化里程碑，避免只修局部不收口

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发 Slack/飞书的短版摘要**，或  
2. **适合管理层看的“风险/收益”版日报**】【。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-09-03）
仓库：**[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)**

---

## 1) 今日速览
今日项目整体处于**低活跃、维护型推进**状态：过去 24 小时没有新的 Issues 更新，也没有新版本发布，说明外部反馈和发布节奏都较平稳。  
PR 层面有 **2 条变更完成合并/关闭**，主要集中在 **renderer 修复** 和 **release 回滚清理**，属于偏稳定性和版本治理的工作。  
从动态看，项目当前没有明显的社区争议或故障扩散迹象，健康度总体正常，但**对外可见的功能推进较少**。  
活跃度评估：**低到中低**，以维护和收敛为主。  
链接：[仓库主页](https://github.com/netease-youdao/LobsterAI) ｜ [Issues](https://github.com/netease-youdao/LobsterAI/issues) ｜ [Pull Requests](https://github.com/netease-youdao/LobsterAI/pulls)

---

## 2) 版本发布
**今日无新版本发布。**  
Releases 页面暂无新增内容，说明本日没有对外可用的版本包或正式发布说明。  
链接：[Releases](https://github.com/netease-youdao/LobsterAI/releases)

---

## 3) 项目进展
今日最重要的推进来自 2 条已关闭 PR：

- **[PR #2598 - [area: renderer] Liuzhq/fix guide win](https://github.com/netease-youdao/LobsterAI/pull/2598)**  
  从标题判断，这是一个针对 **renderer / Windows guide** 的修复类变更。  
  这类改动通常意味着 UI 引导、渲染适配或 Windows 平台兼容性问题得到处理，属于直接提升可用性的补丁。

- **[PR #2597 - revert(browser): remove in-app browser from 2026.8.31 release](https://github.com/netease-youdao/LobsterAI/pull/2597)**  
  这是一个 **回滚型 PR**，将 `2026.8.31` 版本线中的 **in-app browser** 功能撤回到后续发布窗口。  
  其价值不在于新增功能，而在于**控制发布风险、恢复稳定行为、避免历史被重写**，说明团队在版本治理上保持谨慎。

**整体推进判断：**  
今天项目没有新增大功能，但通过“修复 + 回滚”两类操作，完成了**稳定性收敛和版本线整理**。  
如果按“功能增量”衡量，推进幅度有限；如果按“发布质量控制”衡量，推进是明确且有效的。  
链接：[PR #2598](https://github.com/netease-youdao/LobsterAI/pull/2598) ｜ [PR #2597](https://github.com/netease-youdao/LobsterAI/pull/2597)

---

## 4) 社区热点
**今日无活跃 Issues，亦无明显高评论、高反应的讨论点。**  
由于过去 24 小时 Issues 更新为 0，当前没有可识别的社区热点，也无法从评论量或表情反应中判断用户关注焦点。  

从现有 PR 来看，唯一可见的“讨论信号”来自发布治理：  
- **[PR #2597 - in-app browser 回滚](https://github.com/netease-youdao/LobsterAI/pull/2597)**  
  这反映出团队对浏览器功能的发布时机做了再安排，背后诉求更可能是**稳定性优先**和**分阶段交付**，而非临时取消功能。

链接：[Issues](https://github.com/netease-youdao/LobsterAI/issues) ｜ [PR #2597](https://github.com/netease-youdao/LobsterAI/pull/2597)

---

## 5) Bug 与稳定性
今日未见新增 Issues，因此**没有公开登记的 Bug、崩溃或回归问题**可供排序。  
按稳定性相关信号看，最值得关注的是以下两类变更：

1. **[PR #2597](https://github.com/netease-youdao/LobsterAI/pull/2597)**  
   - 性质：回滚 / 发布线修正  
   - 含义：说明 `in-app browser` 功能暂不适合留在该 release 分支中，团队主动回退以降低风险  
   - 是否已有 fix PR：**无需额外 fix PR，已通过回滚处理**

2. **[PR #2598](https://github.com/netease-youdao/LobsterAI/pull/2598)**  
   - 性质：修复类变更  
   - 含义：Windows 侧的 guide / renderer 相关问题得到处理  
   - 是否已有 fix PR：**是，PR 本身即为修复动作**

**结论：** 今日未见公开故障扩散，稳定性风险总体可控。  
链接：[Issues](https://github.com/netease-youdao/LobsterAI/issues) ｜ [PR #2597](https://github.com/netease-youdao/LobsterAI/pull/2597) ｜ [PR #2598](https://github.com/netease-youdao/LobsterAI/pull/2598)

---

## 6) 功能请求与路线图信号
今日没有新增 Issues，因此**没有来自用户侧的新功能需求可直接提取**。  
不过，从 **[PR #2597](https://github.com/netease-youdao/LobsterAI/pull/2597)** 可以读出一个明确的路线图信号：

- **in-app browser 功能已从 2026.8.31 release 线撤出**
- 这通常意味着该能力并未取消，而是**延期到后续版本窗口**
- 团队倾向于把它放到更合适的发布阶段再重新合并

因此，若按“下一版本可能纳入内容”判断，**in-app browser 仍是高概率候选项**，但前提是完成稳定性验证与发布窗口重排。  
链接：[PR #2597](https://github.com/netease-youdao/LobsterAI/pull/2597) ｜ [Issues](https://github.com/netease-youdao/LobsterAI/issues)

---

## 7) 用户反馈摘要
过去 24 小时**没有 Issues 评论和活跃反馈**，因此无法从用户评论中提炼真实痛点、满意点或不满点。  
当前可见的反馈更多来自维护侧动作，而非用户侧显式诉求。  
这意味着今天的数据更像是一个**“无噪声、低反馈”窗口**：项目没有明显舆情压力，但也缺少直接的用户使用反馈输入。  
链接：[Issues](https://github.com/netease-youdao/LobsterAI/issues)

---

## 8) 待处理积压
根据当前数据，**未观察到长期未响应的重要 Issue 或未处理 PR**：  
- Issues：0  
- 待合并 PR：0  
- 已知积压：无  

也就是说，今日可见范围内没有明显 backlog 压力。  
建议维护者持续关注：
- **[PR #2597](https://github.com/netease-youdao/LobsterAI/pull/2597)** 所代表的浏览器功能后续重新纳入节奏
- **[PR #2598](https://github.com/netease-youdao/LobsterAI/pull/2598)** 所反映的 Windows 端修复是否还存在相关连锁问题

链接：[Issues](https://github.com/netease-youdao/LobsterAI/issues) ｜ [Pull Requests](https://github.com/netease-youdao/LobsterAI/pulls)

---

### 总结判断
LobsterAI 在 2026-09-03 这一天呈现出典型的**低活跃维护态**：没有新增问题、没有发布，但通过修复和回滚完成了稳定性整理。  
短期内项目健康度偏稳，风险可控；中期看，**in-app browser 的重新安排**可能是下一阶段最值得跟踪的路线图信号。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

以下为 **2026-09-03 Moltis 项目动态日报**（基于过去 24 小时 GitHub 数据）：

---

## 1) 今日速览

过去 24 小时内，Moltis 仍保持**较高迭代活跃度**：新增/活跃 Issues 2 条、PR 2 条，并连续发布了 3 个版本，说明项目处于密集修复与快速交付阶段。  
今天的讨论主题非常集中，核心围绕 **hook 生命周期事件完整性** 与 **tool call 追踪标识** 两个方向展开，反映出项目正在补齐可观测性与事件一致性能力。  
从数据看，当前没有已关闭 Issue 或已合并 PR，说明社区反馈已很快进入修复路径，但尚处于“提交—验证—待合并”的推进阶段。  
整体健康度判断：**活跃、问题导向明确、修复节奏快，但需要尽快完成关键 PR 落地以释放社区诉求。**

相关链接：  
- Issues：https://github.com/moltis-org/moltis/issues  
- PRs：https://github.com/moltis-org/moltis/pulls  
- Releases：https://github.com/moltis-org/moltis/releases

---

## 2) 版本发布

过去 24 小时内发布了 3 个新版本：

- [20260902.03](https://github.com/moltis-org/moltis/releases/tag/20260902.03)
- [20260902.02](https://github.com/moltis-org/moltis/releases/tag/20260902.02)
- [20260902.01](https://github.com/moltis-org/moltis/releases/tag/20260902.01)

### 观察
- 发布节奏非常快，说明项目在持续做小步快跑式迭代。
- 但当前数据**未提供 release note / changelog 细节**，因此无法准确确认每个版本的具体改动、是否存在破坏性变更。

### 风险与迁移建议
- 从同期 PR/Issue 可以看出，版本演进重点集中在 hook payload 兼容与事件分发修复上。  
- 若下游系统依赖 hook payload 结构，建议关注后续版本中是否引入新字段（例如 `tool_call_id`）以及事件是否补发。
- 目前可见的修复方向强调“向后兼容”，**未见明确破坏性变更证据**，但仍建议在升级后做一次 hook 事件链路回归测试。

相关链接：  
- [Release 20260902.03](https://github.com/moltis-org/moltis/releases/tag/20260902.03)  
- [Release 20260902.02](https://github.com/moltis-org/moltis/releases/tag/20260902.02)  
- [Release 20260902.01](https://github.com/moltis-org/moltis/releases/tag/20260902.01)

---

## 3) 项目进展

### 今日未见已合并/关闭的重要 PR
当前 2 个 PR 均为 **OPEN**，尚未合并，因此今天还没有“已经落地”的代码进展可确认。

### 值得关注的推进
#### [#1257 fix(hooks): complete lifecycle dispatch](https://github.com/moltis-org/moltis/pull/1257)
- 该 PR 直接回应了 Issue #1255 的问题：补齐此前声明但未实际派发的 `AgentEnd`、`MessageSending`、`MessageSent` 事件。
- 同时为 `BeforeToolCall`、`AfterToolCall`、`ToolResultPersist` 增加可选 `tool_call_id`，以便关联一次调用的完整生命周期。
- 这意味着 Moltis 正在从“能触发”走向“可追踪、可串联、可观测”的方向升级。

#### [#1256 chore(deps-dev): bump browserslist...](https://github.com/moltis-org/moltis/pull/1256)
- 这是依赖更新 PR，影响 `crates/web/ui` 中的前端开发依赖。
- 对项目核心 AI/Agent 能力影响较小，但有助于维护前端构建生态与依赖安全性。

### 项目整体向前迈进了多少
今天的推进主要体现在：  
1. **补齐 hook 生命周期缺口**  
2. **增强 tool call 级别追踪能力**  
3. **通过快速发布验证修复节奏**

如果 #1257 合并，将是一次对事件系统一致性和可观测性的明显提升，属于“基础设施级修补”。

相关链接：  
- [PR #1257](https://github.com/moltis-org/moltis/pull/1257)  
- [PR #1256](https://github.com/moltis-org/moltis/pull/1256)

---

## 4) 社区热点

今日最受关注的主题并不是“评论热议”，而是**问题与修复方案高度聚焦**。由于所有条目的评论数均为 0，说明当前社区互动以“作者提交问题/补丁”为主，尚未形成多方讨论。

### 热点 1：Hook 生命周期事件未实际派发
- [Issue #1255](https://github.com/moltis-org/moltis/issues/1255)
- [PR #1257](https://github.com/moltis-org/moltis/pull/1257)

**诉求分析：**
- 用户希望 hooks 不只是声明存在，而是能真实反映 agent/message 生命周期。
- 这类问题会直接影响插件、审计、自动化编排和事件驱动集成。
- PR #1257 说明维护者已将该诉求纳入修复路径。

### 热点 2：为 hook payload 提供稳定 tool call ID
- [Issue #1254](https://github.com/moltis-org/moltis/issues/1254)
- [PR #1257](https://github.com/moltis-org/moltis/pull/1257)

**诉求分析：**
- 用户想要一个能跨 `BeforeToolCall` / `AfterToolCall` / `ToolResultPersist` 贯穿的稳定标识。
- 这通常来自真实使用场景：需要把一次工具调用的前后事件、结果持久化和日志关联起来。
- 这表明 Moltis 的用户开始从“能用”转向“可审计、可追踪、可自动化”。

### 热度判断
- **评论活跃度：低**
- **需求集中度：高**
- **问题指向性：强**

相关链接：  
- [Issue #1255](https://github.com/moltis-org/moltis/issues/1255)  
- [Issue #1254](https://github.com/moltis-org/moltis/issues/1254)  
- [PR #1257](https://github.com/moltis-org/moltis/pull/1257)

---

## 5) Bug 与稳定性

### 1. 较高优先级 Bug：hook 生命周期事件未派发
- [Issue #1255](https://github.com/moltis-org/moltis/issues/1255)
- 现象：`AgentEnd`、`MessageSending`、`MessageSent` hooks 已声明，但实际没有被 dispatch。
- 影响：会导致依赖这些 hook 的插件、监控、自动化流程失效，属于**事件一致性问题**，对扩展生态影响较大。
- 状态：**已有修复 PR**
  - [PR #1257](https://github.com/moltis-org/moltis/pull/1257)

### 2. 稳定性/可观测性缺口：缺少稳定 tool call ID
- [Issue #1254](https://github.com/moltis-org/moltis/issues/1254)
- 严格来说这是 Feature Request，但它对应的是稳定性与可追踪性问题。
- 影响：难以把同一次工具调用的前后事件关联起来，降低调试、审计和结果追踪能力。
- 状态：**已有对应修复 PR**
  - [PR #1257](https://github.com/moltis-org/moltis/pull/1257)

### 今日未见
- 未见崩溃类报告
- 未见已关闭的回归修复
- 未见多起重复性故障

相关链接：  
- [Issue #1255](https://github.com/moltis-org/moltis/issues/1255)  
- [Issue #1254](https://github.com/moltis-org/moltis/issues/1254)  
- [PR #1257](https://github.com/moltis-org/moltis/pull/1257)

---

## 6) 功能请求与路线图信号

### 新功能请求 1：稳定的 tool call ID
- [Issue #1254](https://github.com/moltis-org/moltis/issues/1254)
- 这是非常明确的产品信号：用户正在构建需要“跨事件关联”的工作流。
- 若该能力落地，将显著提升 hooks 在自动化代理场景中的可用性。

### 路线图判断
结合 [PR #1257](https://github.com/moltis-org/moltis/pull/1257) 的描述，以下方向**很可能被纳入下一版本**：
1. **hook 生命周期完整派发**
2. **tool call 级别的端到端关联**
3. **保持旧 JSON payload 的兼容性**
4. **围绕非 shell / 原生场景的事件补齐**

### 结论
这批需求不是孤立的功能点，而是同一条主线：  
**让 Moltis 的 agent/tool 事件链条可追踪、可对齐、可回放。**

相关链接：  
- [Issue #1254](https://github.com/moltis-org/moltis/issues/1254)  
- [PR #1257](https://github.com/moltis-org/moltis/pull/1257)

---

## 7) 用户反馈摘要

从今日 Issues 中可以提炼出以下真实用户反馈：

### 1. 用户非常在意“声明存在”和“真实执行”是否一致
- [Issue #1255](https://github.com/moltis-org/moltis/issues/1255)
- 痛点：hook 名称已定义，但实际未触发，说明用户在做集成时遇到了“文档/接口表面可用、行为不完整”的问题。
- 这类问题通常会直接损害信任，尤其是对自动化平台、插件系统和事件监听器。

### 2. 用户需要跨事件链路的稳定标识
- [Issue #1254](https://github.com/moltis-org/moltis/issues/1254)
- 痛点：工具调用前后缺少统一 ID，导致无法把一次操作的开始、结束、持久化结果串起来。
- 场景：日志关联、监控埋点、审计追踪、故障回溯。

### 3. 用户使用方式偏“先验证、再反馈”
- 两个 Issue 都明确提到基于最新官方 release 进行了复现。
- 这说明社区用户对版本验证较认真，也意味着项目版本发布后会被快速测试并反馈问题。
- 对维护者而言，这是积极信号：用户不仅报错，还提供了可复现的验收路径。

相关链接：  
- [Issue #1255](https://github.com/moltis-org/moltis/issues/1255)  
- [Issue #1254](https://github.com/moltis-org/moltis/issues/1254)

---

## 8) 待处理积压

### 目前没有明显“长期未响应”的老旧条目
从给定数据看，所有 Issues 和 PR 都是 **2026-09-02 创建/更新**，因此**尚不属于长期积压**。

### 需要优先关注的待处理项
#### [PR #1257 fix(hooks): complete lifecycle dispatch](https://github.com/moltis-org/moltis/pull/1257)
- 这是今天最关键的修复 PR。
- 由于它同时关联两个需求点，建议优先推进评审与合并。

#### [PR #1256 chore(deps-dev): bump browserslist...](https://github.com/moltis-org/moltis/pull/1256)
- 属于维护性 PR，可在核心修复之后处理。
- 若维护资源有限，可暂缓，但不建议长期挂起。

相关链接：  
- [PR #1257](https://github.com/moltis-org/moltis/pull/1257)  
- [PR #1256](https://github.com/moltis-org/moltis/pull/1256)

---

### 总体结论

Moltis 今天呈现出典型的“**高频发布 + 问题快速收敛**”状态。社区反馈集中在 hooks 生命周期与调用链追踪上，而维护者已经通过 PR #1257 给出直接修复路径。若该 PR 尽快合并，项目在 **事件一致性、可观测性、扩展稳定性** 三个方面都会有明显提升。

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发群/发邮件的简版摘要**  
2. **适合内部周报的管理层视角版本**  
3. **适合 GitHub Issue/Release Note 的英文版**

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下为 **2026-09-03 的 CoPaw 项目动态日报**（基于当前 GitHub 轨迹，仓库展示为 `agentscope-ai/QwenPaw`）。

---

## 1) 今日速览

过去 24 小时内，项目共出现 **12 条 Issue 更新、18 条 PR 更新，并发布了 2 个版本**，整体活跃度很高，且方向非常集中：**安全/治理、稳定性修复、桌面兼容性、以及 Console/WebUI 体验优化**。  
从议题结构看，今天不是“纯功能扩张日”，而是一个典型的 **“发布后快速修复 + 继续迭代”** 周期：既有稳定版 `v2.2.0` 上线，也有 `v2.2.0-beta.7` 继续推进。  
值得注意的是，今天最突出的风险点仍然是 **安全沙箱/工具调用边界** 与 **会话/流式输出稳定性**，说明项目在快速演进的同时，仍处于高频打磨阶段。  
总体判断：**项目健康度偏积极，但处于高压力迭代期，维护者需要同时盯住安全、回归和 UX 三条线。**

---

## 2) 版本发布

### `v2.2.0`（Stable）
- Release 链接：<https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0>
- 当前可见更新重点：
  - **QwenPaw Hub**
    - 支持自托管多用户 Hub
    - 支持本地进程或 Docker 运行时
    - 支持 workspace 级访问控制
    - 支持凭据管理
    - 支持反向代理
    - 相关 PR：[#7112](https://github.com/agentscope-ai/QwenPaw/pull/7112)

**解读：**
- 这是一个明显的“平台化”升级，不再只是单机助手，而是在向 **可部署、可多用户协作、可运维** 的形态演进。
- 对已有单机/轻量部署用户来说，迁移时需要重点检查：
  - 运行时选择：本地进程 vs Docker
  - workspace 权限边界
  - 认证/凭据管理
  - 反向代理与域名部署配置

> 注：当前 release 摘要中 “QwenPaw Data - D...” 部分被截断，未能完整读取，故不做推断。

### `v2.2.0-beta.7`
- Release 链接：<https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.0-beta.7>
- 可见更新：
  - `fix(memory)`: 规范化不同后端的 embedding dimensions
    - PR: [#7465](https://github.com/agentscope-ai/QwenPaw/pull/7465)
  - `chore`: 版本号提升到 `v2.2.0b7`
    - PR: [#7485](https://github.com/agentscope-ai/QwenPaw/pull/7485)
  - `fix(webui)`: 增加深色模式覆盖
    - 当前摘要被截断，但可确认方向是 WebUI 主题适配

**解读：**
- beta 版本主要在做 **兼容性和显示层修补**，说明稳定版发布前后仍在持续清理体验类问题。
- 如果使用 memory / embedding 相关能力，建议关注不同模型后端的维度一致性。

---

## 3) 项目进展

今日进入关闭/合并状态的 2 个 PR，虽然数量不多，但都属于“基础能力修补”，对后续版本质量很关键：

### [#7508 feat(skill): Update make-skill to v2](https://github.com/agentscope-ai/QwenPaw/pull/7508)  
- 状态：CLOSED
- 方向：用 **审批驱动、脚本式工作流** 替代旧的 `materialize_skill`
- 价值：
  - 强化 Skill 创建流程的规范性
  - 更适合 workspace 级复用与治理
  - 为未来技能生态/自动化工作流打底

### [#7489 fix(desktop): preserve PyInstaller multiprocessing runtime hook](https://github.com/agentscope-ai/QwenPaw/pull/7489)  
- 状态：CLOSED
- 方向：修复 macOS 上 Desktop 后端在 StdIO MCP server 触发 multiprocessing helper 时重启的问题
- 价值：
  - 直接提升桌面版稳定性
  - 对打包分发用户尤其重要
  - 说明项目在持续修复“打包后才出现”的系统级兼容问题

**整体推进判断：**
- 今日的“已落地变更”偏向 **平台基础能力**，不是单点小修小补。
- 与此同时，仍有 **16 个 PR 处于待合并**，说明项目的变更池很大，下一轮版本的功能/修复密度会继续很高。

---

## 4) 社区热点

以下是今日讨论最活跃、最值得关注的条目：

### 1. [#7511 [bug] QwenPaw2 security sandbox was breached](https://github.com/agentscope-ai/QwenPaw/issues/7511)
- 评论数：3
- 状态：CLOSED
- 热点原因：
  - 涉及 **安全沙箱被突破**
  - 属于高风险问题，天然会引起维护者优先处理
- 背后诉求：
  - 用户对 **工具调用、沙箱隔离、敏感路径保护** 的边界非常敏感
  - 这类问题会直接影响项目可信度

### 2. [#7505 qwenpaw访问局域网 LLM SERVER 频繁 client disconnect](https://github.com/agentscope-ai/QwenPaw/issues/7505)
- 评论数：3
- 热点原因：
  - 局域网模型服务在流式调用中频繁断开
  - 最终引发重试和超时失败
- 背后诉求：
  - 用户希望 QwenPaw 在 **本地/内网部署** 场景下也能稳定工作
  - “可用性”比“功能数”更重要

### 3. [#7513 deepseek-v4-pro 对话过程中出现与 qwenpaw 调用工具混合的问题](https://github.com/agentscope-ai/QwenPaw/issues/7513)
- 评论数：2
- 热点原因：
  - 对话内容和工具调用提示发生混杂
  - 属于 **模型输出协议/渲染层** 兼容问题
- 背后诉求：
  - 用户希望 AI 输出在多模型场景中仍保持可读、可控

### 4. [#7514 提高远程 WebUI 首次加载对话内容的速度](https://github.com/agentscope-ai/QwenPaw/issues/7514)
- 评论数：1
- 热点原因：
  - 远程 WebUI 首屏可见，但对话内容加载慢
  - 手机浏览器场景尤为明显
- 背后诉求：
  - 用户对“首屏快”非常敏感，尤其是移动端远程访问

### 5. [#7512 无法切换会话](https://github.com/agentscope-ai/QwenPaw/issues/7512)
- 评论数：1
- 热点原因：
  - 当前会话在思考/输出时，无法切换到其他会话
- 背后诉求：
  - 用户希望多会话并行操作，不能被单次推理锁死界面交互

---

## 5) Bug 与稳定性

按严重程度排序如下：

### S1 - 安全风险
#### [#7511 QwenPaw2 security sandbox was breached](https://github.com/agentscope-ai/QwenPaw/issues/7511)
- 影响：安全边界失守，属于最高优先级
- 当前状态：已关闭
- 是否已有 fix PR：**数据中未显示明确关联 fix PR**
- 备注：虽然已关闭，但建议维护者复盘关闭原因，确认是修复、误报还是不可复现

### S1 - 治理/权限逻辑风险
#### [#7496 CRITICAL-type rule 会被直接拒绝，而不是触发 inquiry](https://github.com/agentscope-ai/QwenPaw/issues/7496)
- 影响：违反预期治理流程，可能导致关键指令被错误阻断
- 是否已有 fix PR：**高相关 PR 已出现**
  - [#7497 fix(tool guard): deny sensitive paths in off mode](https://github.com/agentscope-ai/QwenPaw/pull/7497)
  - [#7504 fix(mcp): enforce per-tool whitelist on the agent runtime path](https://github.com/agentscope-ai/QwenPaw/pull/7504)
- 备注：虽然这两个 PR 不一定是同一个 bug 的直接修复，但都属于“安全与权限边界收紧”的同方向修复

### S2 - 会话与交互稳定性
#### [#7512 无法切换会话](https://github.com/agentscope-ai/QwenPaw/issues/7512)
- 影响：多会话工作流受阻
- 是否已有 fix PR：**当前数据未显示**
- 用户体验风险：高

#### [#7505 局域网 LLM SERVER client disconnect，重试后超时失败](https://github.com/agentscope-ai/QwenPaw/issues/7505)
- 影响：内网/本地模型部署不可用或体验极差
- 是否已有 fix PR：**当前数据未显示**
- 可关联方向：
  - [#7488 fix(pawapp-sdk): finalize stream resources exactly once](https://github.com/agentscope-ai/QwenPaw/pull/7488)
  - [#7490 fix(console): handle CRLF replay event boundaries](https://github.com/agentscope-ai/QwenPaw/pull/7490)

### S2 - Desktop/服务兼容性
#### [#7510 Memory status returns 500 on v2.2.0-beta.7 Desktop](https://github.com/agentscope-ai/QwenPaw/issues/7510)
- 影响：桌面版诊断/资源接口异常
- 当前状态：开放
- 是否已有 fix PR：**未见直接对应**
- 相关背景：该问题出现在 beta.7 Desktop，说明发布后还存在回归风险

### S3 - 流式体验/性能
#### [#7507 WeCom channel streams character-by-character slowly](https://github.com/agentscope-ai/QwenPaw/issues/7507)
- 影响：流式输出过慢，体验“卡顿”
- 是否已有 fix PR：**当前数据未显示**
- 风险：影响企业微信渠道的即时感

#### [#7514 提高远程 WebUI 首次加载对话内容的速度](https://github.com/agentscope-ai/QwenPaw/issues/7514)
- 影响：远程访问首屏慢，尤其移动端
- 是否已有 fix PR：**当前数据未显示**
- 性质：性能优化需求，优先级中等但用户感知强

---

## 6) 功能请求与路线图信号

今天的功能需求很清晰：项目正在从“能用”向“可管理、可扩展、可运营”转变。

### 1. Agent 路由与模型编排
- [#7501 feat: add agent model routing settings](https://github.com/agentscope-ai/QwenPaw/pull/7501)
- 关联问题：
  - [#7493 Console never renders the agent model routing panel](https://github.com/agentscope-ai/QwenPaw/issues/7493)
- 路线图信号：
  - 这个方向很可能进入下一版
  - 它补的是 **Agent 管理与路由控制** 的关键能力
  - 与多模型、多子代理的复杂场景高度相关

### 2. Console / Sidebar / Settings 重构
- [#7502 redesign sidebar and settings experience](https://github.com/agentscope-ai/QwenPaw/pull/7502)
- 相关 UI 类 PR：
  - [#7499 fix(console): unify nav and theme-toggle icons](https://github.com/agentscope-ai/QwenPaw/pull/7499)
  - [#7495 fix(console): name language and theme toggle buttons](https://github.com/agentscope-ai/QwenPaw/pull/7495)
  - [#7487 Feat/theme token unification](https://github.com/agentscope-ai/QwenPaw/pull/7487)
- 路线图信号：
  - Console 体验正在被系统性重做
  - 更像是“整体 UI 体系升级”而不是局部修补

### 3. 技能系统升级
- [#7509 feat(skill): Update make-skill to v2 (DO NOT MERGE)](https://github.com/agentscope-ai/QwenPaw/pull/7509)
- 路线图信号：
  - skill/workspace 生态正在变成重要能力
  - 如果该方向继续推进，未来版本可能会更强调 **审批、脚本化、可复用技能包**

### 4. 远程/移动端可用性
- [#7514 提高远程 WebUI 首次加载对话内容的速度](https://github.com/agentscope-ai/QwenPaw/issues/7514)
- 路线图信号：
  - 移动端和远程访问体验已经进入核心需求池
  - 很可能在后续版本继续优化

---

## 7) 用户反馈摘要

从今日 Issues 的措辞和场景描述里，可以提炼出几个非常真实的用户痛点：

### 1. “安全必须可验证”
- 来源：[#7511](https://github.com/agentscope-ai/QwenPaw/issues/7511)、[#7496](https://github.com/agentscope-ai/QwenPaw/issues/7496)、[#7497](https://github.com/agentscope-ai/QwenPaw/pull/7497)
- 用户关心点：
  - 沙箱是否真的隔离
  - 敏感路径是否会被误执行
  - 审批流程是否符合预期
- 含义：项目的用户开始把 QwenPaw 当作“生产可控工具”，不是单纯玩具

### 2. “本地/内网部署要稳定”
- 来源：[#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505)、[#7510](https://github.com/agentscope-ai/QwenPaw/issues/7510)
- 用户场景：
  - LAN / LM Studio / Desktop / Windows / Docker
- 不满点：
  - client disconnect
  - 诊断接口 500
  - 桌面版回归
- 含义：项目已被用于私有化或本地推理场景，稳定性要求很高

### 3. “远程和移动端要快”
- 来源：[#7514](https://github.com/agentscope-ai/QwenPaw/issues/7514)
- 用户场景：
  - 手机浏览器打开历史会话
  - 远程 WebUI 首次加载
- 不满点：
  - UI 先出现，但内容慢半拍
- 含义：用户容忍不了“壳先到、内容后到”的空白等待

### 4. “多会话/多模型交互要顺滑”
- 来源：[#7512](https://github.com/agentscope-ai/QwenPaw/issues/7512)、[#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513)
- 用户诉求：
  - 一个会话在思考时不应阻塞整个工作台
  - 模型对话输出和工具调用提示不能混在一起
- 含义：随着多模型场景增多，交互层一致性问题开始暴露

---

## 8) 待处理积压

当前样本里没有特别“老”的沉默问题，但**待合并 PR 的积压明显**，并且不少是高影响变更，建议维护者优先盯住以下条目：

### 高优先级 PR 积压
- [#7509 feat(skill): Update make-skill to v2](https://github.com/agentscope-ai/QwenPaw/pull/7509)  
  体量大，涉及工作流变更，值得尽快评审
- [#7504 fix(mcp): enforce per-tool whitelist on the agent runtime path](https://github.com/agentscope-ai/QwenPaw/pull/7504)  
  直接关系到权限边界，建议优先合并/验证
- [#7502 redesign sidebar and settings experience](https://github.com/agentscope-ai/QwenPaw/pull/7502)  
  UI 重构范围大，容易引入回归
- [#7501 feat: add agent model routing settings](https://github.com/agentscope-ai/QwenPaw/pull/7501)  
  与现存 issue #7493 强相关，建议尽快闭环
- [#7486 feat(creator)...](https://github.com/agentscope-ai/QwenPaw/pull/7486)  
  描述显示为较大功能集成，建议拆分审查风险
- [#7500 fix(providers): forward OpenAI extra_headers during connection testing](https://github.com/agentscope-ai/QwenPaw/pull/7500)  
  对兼容 OpenAI-compatible endpoint 很关键

### 需要持续观察的开放 Issue
- [#7510 Desktop /memory/status returns 500](https://github.com/agentscope-ai/QwenPaw/issues/7510)
- [#7507 WeCom streaming sluggish](https://github.com/agentscope-ai/QwenPaw/issues/7507)
- [#7514 Remote WebUI first-load slow](https://github.com/agentscope-ai/QwenPaw/issues/7514)
- [#7512 Cannot switch sessions](https://github.com/agentscope-ai/QwenPaw/issues/7512)
- [#7505 LAN LLM server disconnect timeout](https://github.com/agentscope-ai/QwenPaw/issues/7505)

---

### 一句话结论

**CoPaw/QwenPaw 今天是“发布后快速修复”的高活跃日：版本已进入稳定发布，但安全、治理、会话稳定性和远程体验仍是最需要盯紧的主线。**

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-09-03）

## 1. 今日速览
过去 24 小时，ZeroClaw 处于**高活跃、强迭代**状态：Issues 更新 13 条、PR 更新 23 条，但没有新版本发布，说明当前仍以**修复、评审和架构收敛**为主，而不是发布驱动。  
从内容分布看，工作重心集中在 **security / config / runtime / provider / docs / CI** 等核心链路，属于典型的“边修边重构”阶段。  
当天仅有少量关闭项，说明项目虽然推进速度快，但多数变更仍在审查与集成中，整体处于**中高风险但健康推进**的节奏。  
对维护者而言，这是一种“需求密集、问题密集、但响应也密集”的健康活跃状态。

---

## 2. 项目进展
- [PR #10545](https://github.com/zeroclaw-labs/zeroclaw/pull/10545)（已关闭）  
  记录了 cron 抽离与 holding crate 例外机制的 ADR 背景，有助于把“cron 从运行时抽出”的架构决策正式化，为后续拆分铺路。
- [Issue #10537](https://github.com/zeroclaw-labs/zeroclaw/issues/10537)（已关闭）  
  修复/关闭了 ZeroCode 新建本地会话时 workspace 被 TUI 启动目录覆盖的问题，减少了 CLI 会话上下文错乱。
- [Issue #10561](https://github.com/zeroclaw-labs/zeroclaw/issues/10561)（已关闭）  
  Windows cron workspace 的 POSIX 路径断言问题被关闭，属于 CI 稳定性修复。
- 与上述问题强相关的修复 PR 已在排队推进中：  
  [PR #10556](https://github.com/zeroclaw-labs/zeroclaw/pull/10556)（Seatbelt allowed_roots）、[PR #10568](https://github.com/zeroclaw-labs/zeroclaw/pull/10568)（reader scale）、[PR #10554](https://github.com/zeroclaw-labs/zeroclaw/pull/10554)（provider refs）。  
  这表明项目正在从“发现问题”快速转向“补齐修复”。

**整体推进判断：**  
从 24h 视角看，项目至少完成了 **4 个闭环动作**（2 个 Issue 关闭 + 1 个 PR 关闭 + 1 个 CI/稳定性问题关闭），但新增/活跃变更更多，说明当前仍处于**大批量修复与评审**阶段，离稳定发布还有一段收敛过程。

---

## 3. 社区热点
> 说明：你提供的数据中，Issue 的评论数可见且大多为 1；PR 的评论数未给出，因此 PR 热度只能按“风险/范围/影响面”判断，无法严格按评论量排序。

### 讨论最活跃的 Issues（并列，均为 1 条评论）
- [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)  
  RFC：简化 RFC 投票流程，去掉强制讨论窗口并调整 REVISE 行为。  
  **背后诉求：** 减少流程摩擦，加快决策效率，偏治理/流程类诉求。
- [Issue #10540](https://github.com/zeroclaw-labs/zeroclaw/issues/10540)  
  在 `zeroclaw status` 中报告 Web dashboard 可用性。  
  **背后诉求：** 让运维/操作者更清楚 dashboard 是否可用，强调可观测性。
- [Issue #10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536)  
  macOS Seatbelt 忽略 `allowed_roots`。  
  **背后诉求：** 配置必须真实生效，属于高优先级安全一致性问题。
- [Issue #10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534)  
  bounded delegates 静默移除 delegate 工具。  
  **背后诉求：** 代理/委托链路要与配置一致，避免“看起来支持、实际被剥离”。
- [Issue #10533](https://github.com/zeroclaw-labs/zeroclaw/issues/10533)  
  `model_routing_config` 拒绝 `custom.*` 等合法 provider slot。  
  **背后诉求：** 配置 schema 与工具校验不一致，影响可配置性与扩展性。

### PR 热点判断
- [PR #10551](https://github.com/zeroclaw-labs/zeroclaw/pull/10551)  
  agent-facing config authoring with operator-approved policy previews，范围大、风险高，且涉及核心配置链路。
- [PR #10556](https://github.com/zeroclaw-labs/zeroclaw/pull/10556)  
  修复 macOS Seatbelt allowed roots，直接对应高优先级安全问题。
- [PR #10542](https://github.com/zeroclaw-labs/zeroclaw/pull/10542)  
  Anthropic thinking.display beta，带有 `needs-maintainer-review`，属于 provider 能力扩展热点。

**热点结论：**  
当前社区关注点不是单一功能，而是围绕**配置一致性、工具链可信性、平台兼容性、安全策略**展开；评论量不高，说明争议不大，但诉求很明确、很具体。

---

## 4. Bug 与稳定性
按严重程度排序如下：

### S1 - 工作流阻断
- [Issue #10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536)  
  **问题：** macOS Seatbelt 忽略 `allowed_roots`，导致 shell 命令仍被拒绝。  
  **状态：** open  
  **是否已有 fix PR：** 有，见 [PR #10556](https://github.com/zeroclaw-labs/zeroclaw/pull/10556)
- [Issue #10533](https://github.com/zeroclaw-labs/zeroclaw/issues/10533)  
  **问题：** `model_routing_config` 拒绝合法 provider slot，导致工具校验与配置 schema 分叉。  
  **状态：** open / in-progress  
  **是否已有 fix PR：** 有，见 [PR #10554](https://github.com/zeroclaw-labs/zeroclaw/pull/10554)
- [Issue #10561](https://github.com/zeroclaw-labs/zeroclaw/issues/10561)  
  **问题：** Windows cron workspace 断言对 POSIX 路径表示不兼容。  
  **状态：** closed  
  **是否已有 fix PR：** 未在数据中显示对应 PR，但问题已关闭

### S2 - 功能降级 / 稳定性下降
- [Issue #10558](https://github.com/zeroclaw-labs/zeroclaw/issues/10558)  
  **问题：** Cranelift CI 在最终测试通过后仍可能超 20 分钟超时。  
  **状态：** open  
  **是否已有 fix PR：** 未看到
- [Issue #10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534)  
  **问题：** bounded delegates 静默剥离 delegate 工具，违背 delegation_policy / max_delegation_depth 配置预期。  
  **状态：** open  
  **是否已有 fix PR：** 未看到
- [Issue #10548](https://github.com/zeroclaw-labs/zeroclaw/issues/10548)  
  **问题：** Mermaid 图在 zoom dialog 中失去可访问性。  
  **状态：** open  
  **是否已有 fix PR：** 未看到
- [Issue #10540](https://github.com/zeroclaw-labs/zeroclaw/issues/10540)  
  **问题：** `zeroclaw status` 无法显示 Web dashboard 是否可用。  
  **状态：** open  
  **是否已有 fix PR：** 未看到

### S3 - 轻度问题
- [Issue #10547](https://github.com/zeroclaw-labs/zeroclaw/issues/10547)  
  **问题：** docs reader scale 选择 85% 后刷新回到 90%。  
  **状态：** open  
  **是否已有 fix PR：** 有，见 [PR #10568](https://github.com/zeroclaw-labs/zeroclaw/pull/10568)

### 已关闭的稳定性问题
- [Issue #10537](https://github.com/zeroclaw-labs/zeroclaw/issues/10537)  
  ZeroCode 本地会话 cwd 覆盖问题已关闭。
- [Issue #10561](https://github.com/zeroclaw-labs/zeroclaw/issues/10561)  
  Windows cron 路径断言问题已关闭。

**稳定性判断：**  
今天的 bug 集中在 **安全策略、配置一致性、跨平台 CI、docs 可用性** 四类，说明 ZeroClaw 正在处理的是“成熟系统常见的边界问题”，不是单纯功能缺口。  
其中最需要优先跟进的是 **#10536、#10533、#10558、#10534**，因为它们直接影响工作流、策略执行和 CI 成功率。

---

## 5. 功能请求与路线图信号
以下需求最可能进入下一阶段迭代：

- [Issue #10551](https://github.com/zeroclaw-labs/zeroclaw/issues/10551) / [PR #10551](https://github.com/zeroclaw-labs/zeroclaw/pull/10551)  
  agent-facing config authoring with operator-approved policy previews。  
  **信号：** 这是一个平台级能力，涉及配置编辑、策略预览、权限边界，若推进完成，很可能成为下一版本的重要卖点。
- [Issue #10544](https://github.com/zeroclaw-labs/zeroclaw/issues/10544)  
  Web dashboard 图片上传与 attach/drop UI。  
  **信号：** 补齐 Web 端多模态入口，增强与移动/网页渠道的功能一致性，优先级较高。
- [Issue #10542](https://github.com/zeroclaw-labs/zeroclaw/issues/10542)  
  Anthropic thinking.display beta 支持。  
  **信号：** 属于 provider 能力扩展，适合进入 provider 线的版本计划。
- [Issue #10553](https://github.com/zeroclaw-labs/zeroclaw/issues/10553)  
  选中文本加入聊天。  
  **信号：** 明确改善零代码/编辑器交互，属于可见度高、用户感知强的增强项。
- [Issue #10550](https://github.com/zeroclaw-labs/zeroclaw/issues/10550)  
  bound skill HTTP DNS resolution 与端到端测试 seam。  
  **信号：** 偏基础设施与可测试性增强，对稳定发布很有价值。
- [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)  
  RFC 流程简化。  
  **信号：** 这类治理变更不直接影响产品功能，但会影响整个项目的决策效率，属于“组织能力”路线图。

**路线图判断：**  
如果按“用户可见性 + 核心链路影响 + 代码体量”综合排序，**#10551、#10544、#10542、#10553** 更像下一版本候选；  
如果按“降低风险/提升稳定性”排序，则 **#10556、#10568、#10554** 这类修复会优先进入合并窗口。

---

## 6. 用户反馈摘要
从 Issues 描述和少量评论痕迹看，用户/贡献者的真实痛点主要集中在以下几类：

1. **配置必须真实生效，不能“文档上有、运行时没”**  
   - [#10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536)  
   - [#10533](https://github.com/zeroclaw-labs/zeroclaw/issues/10533)  
   - [#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534)  
   说明用户对安全策略、provider 路由、delegate 工具链的一致性非常敏感。

2. **运维/调试需要更强的状态透明度**  
   - [#10540](https://github.com/zeroclaw-labs/zeroclaw/issues/10540)  
   用户希望 `zeroclaw status` 不只是报 daemon 是否活着，还要告诉他 Web dashboard 是否真的可用。

3. **跨平台行为必须一致**  
   - [#10561](https://github.com/zeroclaw-labs/zeroclaw/issues/10561)  
   - [#10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536)  
   Windows 路径表示、macOS 沙箱策略都是典型的“只有到了真机才暴露”的问题，说明项目的平台兼容压力较大。

4. **文档与交互细节也会影响体验**  
   - [#10547](https://github.com/zeroclaw-labs/zeroclaw/issues/10547)  
   - [#10548](https://github.com/zeroclaw-labs/zeroclaw/issues/10548)  
   用户不仅关注功能，还关注阅读缩放、可访问性等细节，这表明 docs 端已经进入成熟产品应有的质量要求。

**反馈模式总结：**  
当前反馈并不是“要更多功能”，而是更偏向 **可靠性、可解释性、可预期性**。  
评论数普遍不高，意味着社区更多是在“报问题、提补丁”，而不是长篇争论。

---

## 7. 待处理积压
> 说明：本次数据只覆盖 24 小时，**无法严格识别“长期未响应”** 的沉积项；以下是从当前窗口中筛出的、值得维护者优先关注的高风险待办。

### 优先 triage 的 open 项
- [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)  
  RFC 流程简化，带有 `needs-maintainer-review`。  
  **原因：** 影响项目治理，且会影响后续 RFC 吞吐。
- [Issue #10542](https://github.com/zeroclaw-labs/zeroclaw/issues/10542)  
  Anthropic thinking.display beta，带有 `needs-maintainer-review`。  
  **原因：** Provider 兼容性与新模型能力入口。
- [Issue #10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536)  
  高优先级安全问题，当前仍 open。  
  **原因：** 直接阻断 shell 安全策略的预期行为。
- [Issue #10533](https://github.com/zeroclaw-labs/zeroclaw/issues/10533)  
  配置与工具校验分叉，P1 / high risk。  
  **原因：** 会误导配置使用者，并造成模型路由错误。
- [Issue #10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534)  
  delegate 工具被静默剥离。  
  **原因：** 影响代理链路能力，属于高风险行为偏差。
- [PR #10551](https://github.com/zeroclaw-labs/zeroclaw/pull/10551)  
  XL 级改动、high risk、涉及核心配置作者体验。  
  **原因：** 体量大，值得尽快完成架构审查。

**积压判断：**  
从这份数据看，没有明显“老而未动”的沉寂项，但存在一批**高优先级、跨模块、需要维护者拍板**的任务。  
如果要清 backlog，建议先看 **#10536 / #10533 / #10549 / #10542 / #10551** 这组。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*