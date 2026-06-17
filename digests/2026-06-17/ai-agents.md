# OpenClaw 生态日报 2026-06-17

> Issues: 2 | PRs: 25 | 覆盖项目: 13 个 | 生成时间: 2026-06-17 02:05 UTC

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

# OpenClaw 项目动态日报（2026-06-17）

## 1) 今日速览
今天 OpenClaw 处于**高提交、低争议**状态：过去 24 小时仅新增/活跃 2 个 Issue，但 PR 更新达到 25 条，说明开发推进明显快于问题扩散。  
从内容看，项目重心集中在**消息通道兼容性**（Telegram / WhatsApp / Slack / Feishu / MS Teams）、**执行与 secrets 透传**、以及**网关/浏览器/调度稳定性**。  
同时发布了 **v2026.6.8**，表明项目正在持续向外输出可用版本。  
总体判断：**健康度较高、迭代活跃，短期内以修复与兼容性增强为主**，但仍有 19 个 PR 处于待合并状态，存在一定集成压力。

---

## 2) 版本发布
### 新版本：v2026.6.8
- GitHub Release: [v2026.6.8](https://github.com/openclaw/openclaw/releases/tag/v2026.6.8)

### 主要更新
本次 release 的公开亮点集中在**通道消息渲染能力增强**：
- **Telegram 更稳定地渲染结构化文本**：支持表格、列表、可展开 blockquote、保留有意的换行，并支持基于 CLI 的回复。
- **WhatsApp 更好地遵循配置的 ACP 绑定**，减少通道侧行为与配置脱节的问题。  
  相关：[#92679](https://github.com/openclaw/openclaw/issues/92679)、[#931xx](https://github.com/openclaw/openclaw/issues/931)（release 摘要中提及，编号片段有限）

### 破坏性变更
- 当前提供的 release 摘要中**未看到明确的 breaking change**。
- 但从“更严格/更丰富的通道呈现”这一方向看，用户在升级后应重点检查：
  - Telegram rich message / blockquote 的展示差异
  - WhatsApp 的 ACP 绑定配置是否完整
  - 旧客户端对富文本能力的兼容性

### 迁移注意事项
- 若你依赖 Telegram 富文本，建议回归验证：
  - 表格、列表、引用块是否按预期渲染
  - 分行与缩进是否影响自动化回复格式
- 若你使用 WhatsApp 通道，确认 ACP bindings 已按当前配置生效，避免升级后出现“配置存在但通道未按预期生效”的误判。

---

## 3) 项目进展
今日已结束生命周期的 PR 共 6 条，覆盖面很广，说明仓库在多个子系统同步推进：

### 关键已关闭 PR
1. **修复 reasoning tags 处理缺口**
   - [#93806](https://github.com/openclaw/openclaw/pull/93806)  
   修补 MiniMax `mm:` 标签在 silent-reply / streaming 路径上的遗漏，降低可见输出混入思维链内容的风险。

2. **Gateway 会话创建生命周期重构**
   - [#93691](https://github.com/openclaw/openclaw/pull/93691)  
   为 `sessions.create` 增加更清晰的生命周期 seam，提升会话创建、回滚、transcript 初始化的可维护性。

3. **浏览器 tab 可用性竞态修复**
   - [#93797](https://github.com/openclaw/openclaw/pull/93797)  
   使用 `openTab` 返回值规避 `wsUrl` 竞态，减少 `BrowserTabNotFoundError`。

4. **Feishu wiki 分页修复**
   - [#93796](https://github.com/openclaw/openclaw/pull/93796)  
   修复节点/空间列表只取第一页导致的静默截断问题。

5. **Android onboarding 等待态修复**
   - [#93792](https://github.com/openclaw/openclaw/pull/93792)  
   让节点能力审批在 onboarding 阶段显式等待，提升移动端入网流程可见性。

### 今日新增的明显推进方向
尽管多数 PR 仍在开放中，但可以看到几个“已经形成主题”的修复方向：
- **通道兼容性**：Telegram、Slack、MS Teams、Feishu
- **基础设施稳定性**：Docker sandbox、web_fetch、browser、gateway sessions
- **配置/环境变量透传**：secrets、proxy、memory embedding
- **安全与发布治理**：release controls、plugin allowlist

### 项目整体前进幅度
从结果看，今天不是“单点修 bug”，而是**多个核心子系统同时被补强**。  
若把 6 条已关闭 PR 视为今日落地成果，那么项目在：
- 消息交付兼容性
- 会话与调度生命周期
- 移动端和浏览器稳定性
- 多通道 webhook / wiki / secrets 兼容

这几个维度都向前迈了一步。

---

## 4) 社区热点
> 说明：当前数据里 Issues/PR 的评论数都很少，Issue 评论为 0，PR 评论未披露，因此“热点”主要依据**主题集中度和问题影响面**判断，而非讨论串长度。

### 今日最值得关注的话题

1. **Telegram 富文本与可展开引用**
   - PR: [#93836](https://github.com/openclaw/openclaw/pull/93836)
   - PR: [#93838](https://github.com/openclaw/openclaw/pull/93838)
   - 背后诉求：用户希望 Telegram 通道能更接近原生富文本体验，避免“能发但不好看/不好读”的问题。

2. **Secrets / 环境变量透传**
   - Issue: [#93851](https://github.com/openclaw/openclaw/issues/93851)
   - Fix PR: [#93855](https://github.com/openclaw/openclaw/pull/93855)
   - 背后诉求：自托管场景下，resolver 子进程必须继承关键环境变量，否则会直接导致认证失败。

3. **Docker sandbox 启动失败**
   - Issue: [#93854](https://github.com/openclaw/openclaw/issues/93854)
   - 背后诉求：用户自定义 bind mount 不应与内置只读挂载路径冲突；一旦冲突，sandbox 无法启动属于阻断级体验问题。

4. **Feishu / 企业协作通道稳定性**
   - PR: [#93850](https://github.com/openclaw/openclaw/pull/93850)
   - PR: [#93796](https://github.com/openclaw/openclaw/pull/93796)
   - 背后诉求：用户希望 webhook 验证、wiki 拉取、分页行为都能“开箱即用”，不被平台细节卡住。

5. **调度迁移兼容性**
   - PR: [#93847](https://github.com/openclaw/openclaw/pull/93847)
   - 背后诉求：从旧 jobs.json 迁移来的 cron 任务不能因为默认 agent_id 缺失而静默失效。

---

## 5) Bug 与稳定性
按严重程度排序：

### 1. 阻断级：Docker sandbox 因重复挂载点无法启动
- Issue: [#93854](https://github.com/openclaw/openclaw/issues/93854)
- 严重性判断：**高**
- 影响：当用户自定义 bind mount 指向受限/保留路径时，网关无法拉起 sandbox，直接阻断执行。
- 当前状态：**尚未看到对应 fix PR**。

### 2. 高优先级：exec secrets provider 未把 `BWS_SERVER_URL` 传给子进程
- Issue: [#93851](https://github.com/openclaw/openclaw/issues/93851)
- 严重性判断：**高**
- 影响：自托管 Bitwarden Secrets Manager 场景下，resolver 脚本无法连接正确服务器，导致认证失败。
- 修复进展：已有修复 PR  
  - [#93855](https://github.com/openclaw/openclaw/pull/93855)

### 3. 中高优先级：web_fetch 在 trusted proxy 模式下忽略 `NO_PROXY`
- PR: [#93840](https://github.com/openclaw/openclaw/pull/93840)
- 影响：代理策略不符合用户预期，可能把本应直连的请求错误走代理，造成内网请求异常。
- 当前状态：开放中，但属于明确稳定性修复方向。

### 4. 中优先级：Feishu URL verification 在加密模式下被过严拒绝
- PR: [#93850](https://github.com/openclaw/openclaw/pull/93850)
- 影响：webhook 初始化阶段无法完成配置，造成接入卡死。

---

## 6) 功能请求与路线图信号
今天出现的“新功能/增强”信号比较清晰，且不少是**小体积、高收益**类型，较可能进入下一版本：

### 1. 可配置 HTTP 流式分块大小
- PR: [#93624](https://github.com/openclaw/openclaw/pull/93624)
- 信号解读：对 SSE / Chat Completions / Responses 的性能和延迟控制有更细颗粒度需求。
- 路线图判断：**很像下一版候选**，因为它偏基础设施、收益明确。

### 2. macOS 语音唤醒捕获静默窗口可配置
- PR: [#93632](https://github.com/openclaw/openclaw/pull/93632)
- 信号解读：语音交互用户希望更细调体验参数。
- 路线图判断：**功能型增强**，容易被纳入客户端体验迭代。

### 3. MS Teams send action 支持 per-call `topLevel`
- PR: [#93846](https://github.com/openclaw/openclaw/pull/93846)
- 信号解读：企业通道用户希望每次调用能显式控制消息层级，而不是完全依赖静态配置。

### 4. Telegram rich blockquote 支持 `expandable`
- PR: [#93836](https://github.com/openclaw/openclaw/pull/93836)
- 信号解读：用户对“展示效果”要求越来越高，尤其在长引用、长说明场景。

### 5. Memory embedding provider 对自定义 baseUrl 走通用解析
- PR: [#93853](https://github.com/openclaw/openclaw/pull/93853)
- 信号解读：本地化/私有化模型部署在增加，配置需要更通用，避免“写死某供应商适配器”。

### 6. 显式选择的插件自动加入 allowlist
- PR: [#93603](https://github.com/openclaw/openclaw/pull/93603)
- 信号解读：安全收紧后，用户仍需要“显式授权即允许”的顺滑体验，否则配置阻力过大。

---

## 7) 用户反馈摘要
从今日 Issues 的描述中，可以提炼出几类真实用户痛点：

### 自托管与环境一致性
- [#93851](https://github.com/openclaw/openclaw/issues/93851) 反映出：  
  用户并不接受“主进程能读到环境变量，但子进程读不到”这种不一致行为。  
  这类问题在自托管、企业内网、私有 Bitwarden 场景里尤为致命。

### 配置不能静默冲突
- [#93854](https://github.com/openclaw/openclaw/issues/93854) 说明：  
  用户希望自定义 mount、路径、bind 不会被框架的内部默认值悄悄覆盖或冲突。  
  “明明配置了，却启动失败”是最影响信任的体验之一。

### 富文本与通道呈现质量
- 相关 PR：[#93822](https://github.com/openclaw/openclaw/pull/93822)、[#93836](https://github.com/openclaw/openclaw/pull/93836)、[#93815](https://github.com/openclaw/openclaw/pull/93815)
- 用户诉求：消息“能到”只是基础，**显示身份、结构、引用、最终状态**都要尽量符合通道原生体验。

### 迁移与兼容性
- PR: [#93847](https://github.com/openclaw/openclaw/pull/93847)
- 用户在意：旧配置迁移到新系统后，任务不能悄悄失效，必须有明确默认值与可见错误。

---

## 8) 待处理积压
> 这里优先列出**当前仍开放且影响面较大**的条目。由于本日报仅覆盖 24 小时数据，严格意义上的“长期未响应”难以从样本中直接证明，因此以下视为**需要持续关注的积压候选**。

### 高优先级开放项
1. **Docker sandbox 启动失败**
   - [#93854](https://github.com/openclaw/openclaw/issues/93854)
   - 典型阻断问题，建议尽快定位是否需要调整保留挂载路径策略。

2. **secrets exec 子进程未继承 `BWS_SERVER_URL`**
   - [#93851](https://github.com/openclaw/openclaw/issues/93851)
   - 已有修复 PR：[#93855](https://github.com/openclaw/openclaw/pull/93855)
   - 建议跟进合并与回归测试结果。

3. **release controls 加固**
   - [#93852](https://github.com/openclaw/openclaw/pull/93852)
   - 属于维护者级别的重要治理改动，若落地会影响发布门禁。

4. **Telegram / Slack / MS Teams 消息交付修复**
   - [#93822](https://github.com/openclaw/openclaw/pull/93822)
   - [#93836](https://github.com/openclaw/openclaw/pull/93836)
   - [#93815](https://github.com/openclaw/openclaw/pull/93815)
   - 这些 PR 直接影响多通道输出体验，建议重点看 proof 与兼容性风险。

5. **网关与媒体/视觉链路**
   - [#93848](https://github.com/openclaw/openclaw/pull/93848)
   - 影响 Telegram 图像入模，属于“用户看得见、模型也用得到”的关键链路。

---

### 总体结论
OpenClaw 今天的状态可以概括为：**版本已发、修复密集、通道兼容性持续增强、基础设施稳定性持续加固**。  
短期内项目面临的主要挑战不是“没有方向”，而是**开放 PR 数量较多，合并优先级与回归验证压力上升**。  
如果维护节奏保持当前强度，下一版很可能继续围绕**消息通道体验、配置兼容、执行环境稳定性**展开。

---

## 横向生态对比

下面给出一份面向技术决策者的**横向对比分析报告**，基于 2026-06-17 的项目动态摘要整理。

---

# 1) 生态全景

个人 AI 助手 / 自主智能体开源生态正在从“能跑”走向“能用、能稳、能集成”。  
今天最明显的共性是：**多通道交付、自动化调度、权限/审批、安全边界、以及自托管兼容性**，已经成为各项目共同的主战场。  
生态中，活跃项目普遍呈现“**高修复密度 + 低发版节奏**”的特点，说明大家更多是在做质量收敛而不是功能扩张。  
同时，用户反馈也很一致：真正的门槛不在模型能力本身，而在**消息链路、执行链路、配置一致性和故障恢复**。  
结论是：这一赛道已进入“**工程化竞争**”阶段，产品体验和运行可靠性正在取代单纯的功能堆叠。

---

# 2) 各项目活跃度对比

> 说明：下表中的 Issues / PR 为该日摘要中可见的活跃数量或更新量，适合作为“日度热度”参考。

| 项目 | Issues 数 | PR 数 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 2 | 25 | 发布 **v2026.6.8** | **高**：高提交、低争议，迭代活跃且稳定性修复持续 |
| **NanoBot** | 3 | 10 | 无新版本 | **较好**：偏工程修复，功能与稳定性同步推进 |
| **Hermes Agent** | 50 | 50 | 无新版本 | **活跃但压力高**：反馈与开发并发很强，triage 压力大 |
| **PicoClaw** | 1 | 4 | 无新版本 | **稳定**：中等活跃，偏兼容性与执行可靠性修补 |
| **NanoClaw** | 4 | 2 | 无新版本 | **中性偏稳**：偏运维能力与兼容性打磨 |
| **NullClaw** | 0 | 2 | 无新版本 | **稳定但低噪**：公开互动少，修复链路在推进 |
| **IronClaw** | 24 | 32 | 无新版本 | **中上**：高活跃，但审批/自动化/可观测性压力较大 |
| **LobsterAI** | 0 | 2 | 无新版本 | **稳定**：低风险，开发驱动型体验优化 |
| **TinyClaw** | 0 | 1 | 无新版本 | **低活跃**：单点关键修复推进，整体维护型 |
| **Moltis** | 3 | 0 | 无新版本 | **中等偏低**：需求在积累，代码推进较少 |
| **CoPaw** | 17 | 20 | 发布 **v1.1.12-beta.1** | **高活跃但压力显著**：修复密集，安全与稳定性并行 |
| **ZeptoClaw** | 0 | 1 | 无新版本 | **低活跃**：稳定巡航，偏基础维护 |
| **ZeroClaw** | 22 | 37 | 无新版本 | **高强度迭代**：功能补齐快，但稳定性债务也重 |

---

# 3) OpenClaw 在生态中的定位

## 优势
1. **多通道覆盖最强之一**  
   Telegram、WhatsApp、Slack、Feishu、MS Teams 都在高频修复与增强中，属于“通道优先”的典型项目。

2. **交付质量和执行链路重视程度高**  
   不只是消息发出去，还关注：
   - 富文本渲染
   - secrets / env 透传
   - browser / gateway / scheduler 稳定性
   - webhook、wiki、proxy 等边界行为

3. **版本输出节奏明确**  
   今日已发布 `v2026.6.8`，说明项目不是只修不发，而是有持续交付能力。

4. **争议少、修复密度高**  
   24 小时内 PR 更新 25 条、Issue 只有 2 条，说明开发推进快于问题扩散，属于健康的工程节奏。

## 与同类的技术路线差异
OpenClaw 的路线更偏向：
- **“消息通道 + 执行网关 + 企业协作接入”**
- 不是纯桌面端，也不是单一模型编排框架
- 更强调**外部平台兼容性**和**消息呈现 fidelity**

对比来看：
- **Hermes / ZeroClaw / CoPaw** 更偏“平台化、多交互面、复杂工作流”
- **NanoBot / Moltis / TinyClaw** 更偏本地部署、语音/模型/CLI 体验
- **OpenClaw** 更像“**通道与执行底座型助手**”，企业消息与自动化链路是核心

## 社区规模对比
按今日活跃度看，OpenClaw 处于**上游中段**：
- **明显强于**：PicoClaw、NanoClaw、NullClaw、LobsterAI、TinyClaw、Moltis、ZeptoClaw
- **低于**：Hermes Agent、ZeroClaw、CoPaw、IronClaw 这些超高活跃项目
- **特点**：**活跃度高，但讨论噪音低**，更像成熟工程团队在密集收敛问题，而不是大规模社区争论型项目

一句话：**OpenClaw 是生态里“工程成熟度较高、通道覆盖广、交付节奏清晰”的代表项目之一。**

---

# 4) 共同关注的技术方向

## 1. 通道消息 fidelity / 富文本一致性
**涉及项目：** OpenClaw、Hermes Agent、PicoClaw、CoPaw、ZeroClaw  
**具体诉求：**
- Telegram blockquote / 表格 / 列表正确渲染
- Slack/WhatsApp/Teams/企业微信消息不被重写或错解析
- 消息结构、引用、换行、附件展示更接近原生体验

## 2. secrets / 环境变量 / 鉴权透传
**涉及项目：** OpenClaw、NullClaw、CoPaw、NanoBot  
**具体诉求：**
- 子进程必须继承关键 env
- token / keychain / credentials 的持久化与隔离
- 自托管或多实例部署下避免认证断裂

## 3. 自动化调度与 cron 稳定性
**涉及项目：** NanoBot、IronClaw、CoPaw、ZeroClaw、NullClaw  
**具体诉求：**
- cron 不漏执行
- 不打断主对话
- 定时任务的静默执行、恢复、状态可见性
- 任务与主会话隔离

## 4. 运行时稳定性与恢复机制
**涉及项目：** Hermes Agent、OpenClaw、NanoClaw、CoPaw、ZeroClaw、IronClaw  
**具体诉求：**
- WebSocket / gateway 断线可恢复
- browser / sandbox / desktop 崩溃修复
- 卡死、僵尸进程、循环中断、blank transcript 等问题闭环

## 5. 权限、审批与安全边界
**涉及项目：** IronClaw、CoPaw、ZeroClaw、OpenClaw、NanoBot  
**具体诉求：**
- approval gate 不应阻塞整个流程
- prompt injection、RCE、协议误触发需要防护
- workspace / repository / tool permission 更细粒度控制

## 6. provider 路由与模型兼容性
**涉及项目：** Hermes Agent、OpenClaw、PicoClaw、Moltis、CoPaw、ZeroClaw  
**具体诉求：**
- 切换 provider 后不能残留旧 base_url
- Gemini / Anthropic / Ollama / OpenAI 等 schema 兼容
- tool call 格式与 reasoning tag 处理一致

## 7. 文档与 onboarding
**涉及项目：** ZeroClaw、LobsterAI、PicoClaw、NanoBot、Moltis  
**具体诉求：**
- quickstart 可执行
- 安装命令更稳
- 错误提示带恢复路径
- 文档与当前实现一致

---

# 5) 差异化定位分析

## OpenClaw
- **功能侧重**：多通道消息接入、企业协作、执行底座、富文本渲染
- **目标用户**：企业/团队场景、自托管用户、多 IM 通道使用者
- **架构特征**：gateway + browser + scheduler + channel adapter，偏“平台底座”

## Hermes Agent
- **功能侧重**：桌面端 + gateway + 多平台交互 + provider 路由
- **目标用户**：重交互、重桌面体验、跨 Slack/Telegram/desktop 的用户
- **架构特征**：更像“桌面智能体平台”，强调交互闭环和状态管理

## NanoBot
- **功能侧重**：本地模型、代理兼容、workspace 与安全边界
- **目标用户**：本地部署、混合网络环境、开发协作场景
- **架构特征**：更偏“本地智能助手工作区”

## PicoClaw
- **功能侧重**：命令执行、Telegram 线程路由、Gemini 适配
- **目标用户**：偏系统自动化、命令驱动型用户
- **架构特征**：轻量但关注执行正确性

## NanoClaw
- **功能侧重**：Tailscale / Docker / Teams / 凭证接入
- **目标用户**：受管 fleet、企业集成、沙箱/镜像部署
- **架构特征**：偏运维与基础设施兼容性

## IronClaw
- **功能侧重**：Reborn WebUI、Automations、审批、可观测性
- **目标用户**：工作流自动化、需要管理面板的团队
- **架构特征**：平台化明显，强调“可看、可管、可恢复”

## LobsterAI
- **功能侧重**：搜索、artifact 预览、浏览器体验
- **目标用户**：偏协作检索和内容预览用户
- **架构特征**：体验优化导向，较轻量

## TinyClaw
- **功能侧重**：CLI 跨平台兼容
- **目标用户**：Windows 原生 CLI 用户
- **架构特征**：小而专，工程补丁导向

## Moltis
- **功能侧重**：TTS、RPC、whisper.cpp 转录、自托管语音链路
- **目标用户**：语音/转录/远程调用部署用户
- **架构特征**：偏语音基础设施和参数可配置性

## CoPaw
- **功能侧重**：多通道、cron、上下文管理、安全、插件化
- **目标用户**：多 agent 工作流、企业集成、安全要求高的用户
- **架构特征**：平台化与自动化并重，风险与功能并行增长

## ZeptoClaw
- **功能侧重**：基础维护、镜像/依赖更新
- **目标用户**：现有使用者
- **架构特征**：低活跃、低噪声、维护型

## ZeroClaw
- **功能侧重**：runtime profile、ZeroCode/TUI、channels、Dream Mode、operator surfaces
- **目标用户**：重度自动化、终端优先、平台级用户
- **架构特征**：平台化程度很高，功能面广，工程复杂度也高

---

# 6) 社区热度与成熟度

## 快速迭代阶段
这些项目今日表现为“问题多、修复多、讨论多”，通常说明产品正处在快速打磨期：
- **Hermes Agent**
- **IronClaw**
- **CoPaw**
- **ZeroClaw**
- **OpenClaw**（更像“快速迭代 + 质量收敛并行”）

特征：
- Issue/PR 数高
- 争议和修复并存
- 用户开始把它用于真实工作流
- 稳定性、审批、路由、可见性成为主战场

## 质量巩固阶段
这些项目更偏向“修边角、补兼容、收敛体验”：
- **NanoBot**
- **PicoClaw**
- **NanoClaw**
- **LobsterAI**
- **Moltis**
- **NullClaw**
- **TinyClaw**
- **ZeptoClaw**

特征：
- 活动量较低或中等
- 以修复、兼容、安装、文档、体验优化为主
- 公开争议少，项目更稳定

## 分层判断
- **旗舰活跃层**：Hermes / ZeroClaw / CoPaw / IronClaw
- **高质量迭代层**：OpenClaw
- **稳步收敛层**：NanoBot / PicoClaw / NanoClaw / LobsterAI / Moltis
- **轻维护层**：NullClaw / TinyClaw / ZeptoClaw

---

# 7) 值得关注的趋势信号

## 趋势 1：消息“能发”不够，必须“发得像原生”
**代表项目：** OpenClaw、Hermes Agent、CoPaw、ZeroClaw  
**参考价值：**
- 富文本、线程、blockquote、媒体 marker、mention 解析，已经是产品体验核心，而不是附属功能。
- 做智能体平台时，通道 fidelity 会直接影响用户对“智能”的感知。

## 趋势 2：自托管场景正在成为主战场
**代表项目：** OpenClaw、NanoBot、NullClaw、Moltis、CoPaw  
**参考价值：**
- env 透传、token 持久化、keychain 隔离、代理规则、RPC timeout 都在说明：用户越来越多地在自己的网络和安全边界里部署。

## 趋势 3：自动化从“能跑”走向“不可打断”
**代表项目：** IronClaw、CoPaw、ZeroClaw、NanoBot  
**参考价值：**
- cron、automation、approval、resume、background execution 正在成为标准能力。
- 需要默认“任务会被打断、会失败、会恢复”，产品必须给出恢复路径。

## 趋势 4：权限和安全正在前置
**代表项目：** CoPaw（RCE / prompt injection）、IronClaw（approval gate）、OpenClaw（release controls）、ZeroClaw（runtime profile / strict flags）  
**参考价值：**
- 智能体不是普通应用，工具调用本身就是攻击面。
- 安全设计要从“事后审计”转向“执行前限制 + 最小权限 + 可恢复”。

## 趋势 5：可观测性和管理面板成为刚需
**代表项目：** IronClaw、ZeroClaw、OpenClaw、CoPaw  
**参考价值：**
- 用户不只要结果，还要知道“发生了什么、卡在哪、谁批准、如何回滚”。
- usage/cost/thread/status 的可视化，会直接影响产品可运营性。

## 趋势 6：文档和 onboarding 已经是产品的一部分
**代表项目：** ZeroClaw、LobsterAI、PicoClaw、NanoBot  
**参考价值：**
- quickstart、安装命令、错误提示、配置可见性，已经影响留存与 adoption。
- 对智能体项目来说，文档不是附属品，而是“首个交互层”。

---

# 结论

从今天的横向对比看，个人 AI 助手 / 自主智能体开源生态已经进入**工程化竞争阶段**。  
**OpenClaw** 在其中的定位非常清晰：它是一个**通道覆盖广、交付节奏明确、以消息与执行底座为核心**的上游项目，整体成熟度高于大多数中小项目，同时又保持了足够快的迭代速度。  
而 Hermes、IronClaw、CoPaw、ZeroClaw 则代表了更高复杂度的平台化方向：它们更强，但也面临更重的安全、审批、可观测性与稳定性压力。  
对开发者而言，今天最重要的启示是：**智能体项目的竞争已经从模型能力转向“通道 fidelity + 运行稳定性 + 安全边界 + 可恢复性”**。

如果你需要，我可以把这份报告进一步整理成：
1. **一页纸决策简报版**  
2. **表格更完整的管理层版**  
3. **适合周会汇报的 PPT 大纲版**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-06-17）

## 1. 今日速览
过去 24 小时，NanoBot 依然保持较高开发活跃度：Issues 更新 3 条、PR 更新 10 条，且有 6 条 PR 已合并/关闭，说明主线开发正在持续收敛到稳定性与体验优化上。当前没有新版本发布，更多改动以直接进入主分支的方式推进，属于“高频修复、低频发版”的节奏。  
从内容看，今天的重点集中在：本地模型/代理兼容性、工作区权限与读写一致性、MCP 协议健壮性、记忆/缓存优化、以及安装文档与默认行为的打磨。整体来看，项目健康度较好，但也暴露出若干影响核心工作流的边界问题，值得持续跟踪。

---

## 2. 版本发布
本日 **无新版本发布**。

---

## 3. 项目进展
今天合并/关闭的 PR 主要推动了四类能力前进：

- **安装与文档体验提升**
  - PR [#4365](https://github.com/HKUDS/nanobot/pull/4365)：将文档中的 curl 安装命令改为 pipe pattern，降低脚本嵌套场景下的兼容问题。
  - PR [#4368](https://github.com/HKUDS/nanobot/pull/4368)：修复 macOS 外部管理 Python 环境下的一键安装问题，减少 PEP 668 相关踩坑。

- **默认行为与产品体验优化**
  - PR [#4370](https://github.com/HKUDS/nanobot/pull/4370)：默认启用 idle auto-compact，将默认值从 0 调整为 15 分钟，体现出产品向“自动化记忆管理”方向演进。
  - PR [#4369](https://github.com/HKUDS/nanobot/pull/4369)：为 `/dream` 空结果提供可理解的解释，减少“无输出但不知原因”的困惑。

- **稳定性与配置健壮性**
  - PR [#4363](https://github.com/HKUDS/nanobot/pull/4363)：统一并校验 stream idle timeout 配置，避免无效环境变量引发运行时异常。

- **WebUI 可用性**
  - PR [#4364](https://github.com/HKUDS/nanobot/pull/4364)：修复 LAN 访问开发服务器时 WebUI 卡在“Opening new chat...”的问题。

**整体推进判断：**  
今天的已合并/关闭 PR 让 NanoBot 在“可安装性、默认体验、边界稳定性、局域网可用性”四个方向都有实质改善，属于偏工程质量与可用性的一天，而不是新增大功能的一天。

---

## 4. 社区热点
> 注：今日数据中 Issues/PR 的评论数与反应数几乎都为 0，因此“热点”主要依据新增/更新频率与问题影响面判断。

### 热点 1：本地模型服务器与代理兼容
- Issue [#4366](https://github.com/HKUDS/nanobot/issues/4366)（已关闭）
- PR [#4367](https://github.com/HKUDS/nanobot/pull/4367)（开放中）

**诉求分析：**  
用户希望在宿主机配置了 `HTTP_PROXY/HTTPS_PROXY/ALL_PROXY` 时，NanoBot 对本地模型端点（如 Ollama、llama.cpp、vLLM）不要被错误地走代理；同时云端请求仍应尊重代理设置。这说明项目正在面对“本地/云端混合部署”场景的真实需求。

### 热点 2：工作区安全策略与 Git 自动化
- Issue [#4375](https://github.com/HKUDS/nanobot/issues/4375)（开放中）

**诉求分析：**  
用户在允许的 workspace 边界内执行 `git add/commit/push` 仍被安全守卫拦截，说明当前安全策略在“防越权”和“可执行性”之间存在误伤。该问题直接影响代码协作流，是高优先级可用性问题。

### 热点 3：项目工作区读写一致性
- Issue [#4374](https://github.com/HKUDS/nanobot/issues/4374)（开放中）

**诉求分析：**  
WebUI 的 project workspaces 读取 `AGENTS.md/SOUL.md/USER.md` 来自项目根，但写回默认 workspace，出现读写不对称。用户实际诉求很明确：**读到哪里，写回也应当可预期地落到同一上下文**。

### 热点 4：记忆/缓存与协议鲁棒性
- PR [#4371](https://github.com/HKUDS/nanobot/pull/4371)（开放中）
- PR [#4372](https://github.com/HKUDS/nanobot/pull/4372)（开放中）
- PR [#4373](https://github.com/HKUDS/nanobot/pull/4373)（开放中）

**诉求分析：**  
这组三个 PR 共同反映出社区对“长期对话稳定性、协议容错、上下文保真”的关注度很高：既要更省 token，也要不丢 delivery context，还要能处理异常 MCP 消息。

---

## 5. Bug 与稳定性
按影响严重程度排序如下：

### 1) Git 操作在允许工作区内仍被安全策略阻断
- Issue [#4375](https://github.com/HKUDS/nanobot/issues/4375)
- 严重性：**高**
- 影响：阻断 `git add/commit/push`，直接破坏核心开发工作流
- Fix PR：**未见明确 fix PR**

### 2) 本地模型服务器在代理环境下不可用/请求错误走代理
- Issue [#4366](https://github.com/HKUDS/nanobot/issues/4366)
- 严重性：**高**
- 影响：Ollama / vLLM / llama.cpp 等本地推理服务在带代理环境中可能失效
- Fix PR：**有**，[#4367](https://github.com/HKUDS/nanobot/pull/4367)（开放中）

### 3) Project workspace 读写不对称
- Issue [#4374](https://github.com/HKUDS/nanobot/issues/4374)
- 严重性：**中高**
- 影响：上下文文件读写落点不一致，容易造成状态漂移与配置失真
- Fix PR：**未见明确 fix PR**

### 4) MCP `notifications/progress` 格式异常导致协议处理风险
- PR [#4372](https://github.com/HKUDS/nanobot/pull/4372)
- 严重性：**中**
- 影响：协议层异常消息可能污染客户端会话
- Fix PR：**已作为修复 PR 提交，待合并**

### 5) 回放/合并时丢失 delivery context 的风险
- PR [#4373](https://github.com/HKUDS/nanobot/pull/4373)
- 严重性：**中**
- 影响：消息链路在 consolidation 中可能失真
- Fix PR：**已提交，待合并**

**补充：**  
今天已关闭的稳定性修复包括 [#4363](https://github.com/HKUDS/nanobot/pull/4363)、[#4364](https://github.com/HKUDS/nanobot/pull/4364)、[#4368](https://github.com/HKUDS/nanobot/pull/4368)，说明团队对运行时边界问题的响应是连续的。

---

## 6. 功能请求与路线图信号
今天的新增需求与正在推进的 PR，释放出几个明确的路线图信号：

1. **记忆与上下文管理将继续强化**
   - 相关 PR：[#4370](https://github.com/HKUDS/nanobot/pull/4370)、[#4371](https://github.com/HKUDS/nanobot/pull/4371)、[#4373](https://github.com/HKUDS/nanobot/pull/4373)
   - 信号：项目正在从“能记住”走向“更聪明地记、自动地记、且不丢上下文”。

2. **本地模型部署兼容性会是下一阶段重点**
   - 相关 Issue/PR：[#4366](https://github.com/HKUDS/nanobot/issues/4366)、[#4367](https://github.com/HKUDS/nanobot/pull/4367)
   - 信号：NanoBot 需要更好适配本地模型、代理和企业网络环境。

3. **Workspace/安全边界会继续打磨**
   - 相关 Issue：[#4375](https://github.com/HKUDS/nanobot/issues/4375)、[#4374](https://github.com/HKUDS/nanobot/issues/4374)
   - 信号：下一版很可能继续围绕“安全不误伤、读写一致性、项目级工作流”优化。

4. **协议与运行时健壮性仍是持续主题**
   - 相关 PR：[#4372](https://github.com/HKUDS/nanobot/pull/4372)、[#4363](https://github.com/HKUDS/nanobot/pull/4363)
   - 信号：对 MCP、stream timeout、异常消息的防御性处理会继续加强。

---

## 7. 用户反馈摘要
从这些 Issues/PR 的内容里，可以提炼出几条真实用户痛点：

- **“我要的是可用的本地部署，而不是被代理配置误伤。”**  
  来自 [#4366](https://github.com/HKUDS/nanobot/issues/4366)，用户场景很明确：本地模型服务是核心使用方式之一，代理不能无差别介入。

- **“安全策略不能把合法工作流也挡住。”**  
  来自 [#4375](https://github.com/HKUDS/nanobot/issues/4375)，用户希望在 workspace 边界内完成完整 Git 操作，这是最基础的协作动作。

- **“读和写要一致，别让我猜文件最终写到哪。”**  
  来自 [#4374](https://github.com/HKUDS/nanobot/issues/4374)，说明用户对 project workspace 的预期是确定性的。

- **“别静默失败，解释清楚为什么没有结果。”**  
  来自 [#4369](https://github.com/HKUDS/nanobot/pull/4369)，用户希望系统能给出可恢复、可理解的反馈，而不是空白结果。

- **“默认值要更贴近真实使用。”**  
  来自 [#4370](https://github.com/HKUDS/nanobot/pull/4370)，用户倾向于更自动化的默认体验，减少手工配置负担。

- **“安装和升级流程必须经得住真实环境折腾。”**  
  来自 [#4365](https://github.com/HKUDS/nanobot/pull/4365)、[#4368](https://github.com/HKUDS/nanobot/pull/4368)，说明安装链路是用户对项目第一印象的重要来源。

---

## 8. 待处理积压
从当前数据看，**没有明显的长期未响应老积压项**；但以下近 24 小时内仍未收敛的关键项，建议维护者优先盯住：

- Issue [#4375](https://github.com/HKUDS/nanobot/issues/4375)：Git 操作被 workspace security policy 误拦，影响面大
- Issue [#4374](https://github.com/HKUDS/nanobot/issues/4374)：project workspace 读写不一致，容易造成状态混乱
- Issue [#4366](https://github.com/HKUDS/nanobot/issues/4366) / PR [#4367](https://github.com/HKUDS/nanobot/pull/4367)：本地模型与代理兼容性问题，属于高频场景
- PR [#4371](https://github.com/HKUDS/nanobot/pull/4371)：缓存优化，可能影响 token 成本与响应性能
- PR [#4372](https://github.com/HKUDS/nanobot/pull/4372)、[#4373](https://github.com/HKUDS/nanobot/pull/4373)：协议与记忆链路稳定性修复，建议尽快合并验证

**结论：**  
NanoBot 当前不是“缺乏活跃度”，而是“活跃度很高、问题也更贴近真实部署环境”。短期建议优先处理 workspace 安全误伤、本地模型代理兼容、以及读写一致性三类高影响问题。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-06-17）

## 1) 今日速览
Hermes Agent 今日处于**高活跃、强并发推进**状态：过去 24 小时内 Issues 与 PR 各更新 50 条，说明社区反馈和开发迭代都非常密集。  
从内容看，项目重心集中在**桌面端稳定性、Gateway/会话管理、Slack/Telegram 等多平台交互一致性、以及 provider 路由正确性**。  
今日**没有新版本发布**，但已有多条高优先级缺陷修复 PR 进入排队，表明团队正在对近期的稳定性与体验问题做集中收敛。  
整体健康度判断：**活跃度高，但 triage 压力也高**，短期内需要优先处理崩溃、会话串流、路由错配和成本可见性等问题。  
相关入口：[Issues](https://github.com/NousResearch/hermes-agent/issues) / [Pull Requests](https://github.com/NousResearch/hermes-agent/pulls)

---

## 2) 版本发布
今日**无新版本发布**。  
版本入口：[Releases](https://github.com/NousResearch/hermes-agent/releases)

---

## 3) 项目进展
今天最重要的进展不是“大版本发布”，而是**一批针对高频痛点的修复 PR 集中出现**，覆盖面很广：

- **Slack clarify 交互**：从纯文本编号升级到按钮式交互的工作已完成闭环，相关 PR `#47531` 已关闭（duplicate），对应 Issue `#47513/#47529` 也已关闭，说明这一需求已被纳入实现或被更完整的方案吸收。  
  - PR：[#47531](https://github.com/NousResearch/hermes-agent/pull/47531)
  - Issue：[#47513](https://github.com/NousResearch/hermes-agent/issues/47513) / [#47529](https://github.com/NousResearch/hermes-agent/issues/47529)

- **浏览器视觉截图过大导致会话被“打死”**：修复 PR `#47551` 直接对准高危稳定性问题 `#47467`，这是非常典型的“影响真实会话可用性”的修复。  
  - PR：[#47551](https://github.com/NousResearch/hermes-agent/pull/47551)
  - Issue：[#47467](https://github.com/NousResearch/hermes-agent/issues/47467)

- **MCP 子进程僵尸进程回收**：PR `#47540` 补上 `waitpid()` reaping，针对 `#47510` 这种 gateway 重启后残留僵尸进程的问题，属于基础稳定性补强。  
  - PR：[#47540](https://github.com/NousResearch/hermes-agent/pull/47540)
  - Issue：[#47510](https://github.com/NousResearch/hermes-agent/issues/47510)

- **provider 切换后 base_url 残留**：PR `#47533` 修复了 `#47521` 中的“从 Codex 切到 Ollama Cloud 仍打到旧 endpoint”的路由污染问题，这类 bug 对付费/自建模型场景影响很大。  
  - PR：[#47533](https://github.com/NousResearch/hermes-agent/pull/47533)
  - Issue：[#47521](https://github.com/NousResearch/hermes-agent/issues/47521)

- **桌面端/会话交互体验修复链条**：`#47544`（clarify prompts）、`#47537`（composer model pill 卡 spinner）、`#47530`（删除活跃会话）、`#47542`（Telegram progress 分组）都指向同一个方向：**减少桌面与 gateway 之间状态不同步造成的“卡住/错乱”**。  
  - PR：[#47544](https://github.com/NousResearch/hermes-agent/pull/47544) / [#47537](https://github.com/NousResearch/hermes-agent/pull/47537) / [#47530](https://github.com/NousResearch/hermes-agent/pull/47530) / [#47542](https://github.com/NousResearch/hermes-agent/pull/47542)

**项目整体向前迈进的幅度**：今天至少形成了**6+ 条明确对标高优先级问题的修复链路**，说明项目正在从“功能扩张”转向“稳定性收敛 + 体验修整”。  
相关 PR 总入口：[Pull Requests](https://github.com/NousResearch/hermes-agent/pulls)

---

## 4) 社区热点
今日讨论最活跃的热点主要集中在以下几类：

### A. Slack clarify 交互从“输入数字”升级为按钮
- Issue：[#47529](https://github.com/NousResearch/hermes-agent/issues/47529)
- Issue：[#47513](https://github.com/NousResearch/hermes-agent/issues/47513)
- PR：[#47531](https://github.com/NousResearch/hermes-agent/pull/47531)

**诉求分析**：Slack 用户希望获得与 Discord/Telegram 一致的交互体验，不想在 channel 中手动输入“2/3”这种脆弱流程。这个需求的本质是**跨平台 UX 对齐**。

### B. Agent 级 pre-response hook / meta-workflow 强制检查
- Issue：[#47446](https://github.com/NousResearch/hermes-agent/issues/47446)

**诉求分析**：这是比较“架构型”的需求，用户希望在响应前插入强制检查、技能预加载、工作流约束等机制。说明一部分用户已经把 Hermes 当作**可编排的 agent 平台**而非单纯聊天工具。

### C. Telegram typing indicator 卡死
- Issue：[#47539](https://github.com/NousResearch/hermes-agent/issues/47539)

**诉求分析**：这是典型的“状态清理不彻底”问题，用户对群聊/IM 场景中的长尾残留非常敏感，尤其是可见的 typing indicator 会直接影响使用体验与专业感。

### D. Desktop / Electron 稳定性与可用性问题
- Issue：[#47498](https://github.com/NousResearch/hermes-agent/issues/47498)
- Issue：[#47439](https://github.com/NousResearch/hermes-agent/issues/47439)
- Issue：[#47500](https://github.com/NousResearch/hermes-agent/issues/47500)

**诉求分析**：用户对桌面端的容错、链接处理和图片发送非常关注；这表明 Hermes Desktop 已进入“真实工作流使用”阶段，崩溃和误触发会直接阻断日常使用。

---

## 5) Bug 与稳定性
以下按严重程度排序：

### P1：Anthropic transport 中 tool call 以 text 形式出现会导致循环中断
- Issue：[#47472](https://github.com/NousResearch/hermes-agent/issues/47472)
- 状态：**暂无可见 fix PR**
- 影响：高。工具调用被丢失会直接导致 agent loop 停摆，属于核心执行链路故障。

### P2：Desktop 发送照片触发 `Maximum call stack size exceeded`，可能进入 crash loop
- Issue：[#47498](https://github.com/NousResearch/hermes-agent/issues/47498)
- 状态：**暂无可见 fix PR**
- 影响：高。属于桌面端致命崩溃，且会影响恢复能力。

### P2：macOS 打包桌面应用启动崩溃（ASAR 内图标路径）
- Issue：[#47439](https://github.com/NousResearch/hermes-agent/issues/47439)
- 状态：**暂无可见 fix PR**
- 影响：高。启动即崩溃直接阻断使用。

### P2：Ollama Cloud 切换后 stale `base_url` 导致请求打到旧 Codex endpoint
- Issue：[#47521](https://github.com/NousResearch/hermes-agent/issues/47521)
- Fix PR：[#47533](https://github.com/NousResearch/hermes-agent/pull/47533)
- 影响：高。会造成**模型/路由错配**，严重时是“看似选对模型，实际请求发错地方”。

### P2：Telegram typing indicator 无限持续
- Issue：[#47539](https://github.com/NousResearch/hermes-agent/issues/47539)
- 状态：**暂无可见 fix PR**
- 影响：中高。可见状态残留，说明 asyncio 清理存在边界问题。

### P2：`hermes config set` 把 `"off"/"on"` 等字符串静默转成 bool，破坏 enum 配置
- Issue：[#47515](https://github.com/NousResearch/hermes-agent/issues/47515)
- 状态：**暂无可见 fix PR**
- 影响：高。配置写坏是典型“隐性回归”，可能长期污染用户配置文件。

### P2：Desktop “New profile” 对保留名直接回显原始 IPC 错误
- Issue：[#47549](https://github.com/NousResearch/hermes-agent/issues/47549)
- 状态：**暂无可见 fix PR**
- 影响：中。偏 UX/错误处理，但暴露内部错误信息不友好。

### P2：外部链接自动预览触发自定义协议处理器
- Issue：[#47500](https://github.com/NousResearch/hermes-agent/issues/47500)
- 状态：**暂无可见 fix PR**
- 影响：中高。涉及协议处理器误触发，带有明显安全/可用性风险。

### P3：MCP stdio 子进程在重启后变成僵尸进程
- Issue：[#47510](https://github.com/NousResearch/hermes-agent/issues/47510)
- Fix PR：[#47540](https://github.com/NousResearch/hermes-agent/pull/47540)
- 影响：中。稳定性问题已进入修复链路。

### P3：会话消息串台/泄漏
- Issue：[#47475](https://github.com/NousResearch/hermes-agent/issues/47475)
- 状态：**暂无可见 fix PR**
- 影响：中高。多会话并发下的隔离错误，会造成严重信任问题。

---

## 6) 功能请求与路线图信号
今天的新功能信号非常明显，且大多围绕“更强控制力”和“更好的桌面体验”。

### 更可能被纳入近期版本的方向
1. **Slack / Telegram / Discord 的交互一致性**
   - Issue：[#47529](https://github.com/NousResearch/hermes-agent/issues/47529)
   - 关联 PR：[#47531](https://github.com/NousResearch/hermes-agent/pull/47531)
   - 判断：高概率短期内持续推进，因为已经有实装链路。

2. **桌面端体验补强**
   - UI zoom：[#47499](https://github.com/NousResearch/hermes-agent/issues/47499)
   - 自动预览文件：[#47481](https://github.com/NousResearch/hermes-agent/issues/47481)
   - profile 切换稳定性：[#47524](https://github.com/NousResearch/hermes-agent/issues/47524)
   - 判断：高概率进入下个迭代窗口，属于高频可感知改进。

3. **provider 路由、成本和用量可见性**
   - 成本/usage 透明度：[#47534](https://github.com/NousResearch/hermes-agent/issues/47534)
   - provider 切换后路由正确性：[#47521](https://github.com/NousResearch/hermes-agent/issues/47521) + [#47533](https://github.com/NousResearch/hermes-agent/pull/47533)
   - 判断：这类功能与当前修复方向一致，极可能被纳入近期版本。

### 更像中期路线图的功能
1. **多 API key / 凭证池管理**
   - Issue：[#47548](https://github.com/NousResearch/hermes-agent/issues/47548)
   - 判断：需求合理，但涉及 UI、密钥管理、轮询与失败切换策略，复杂度较高，更像中期功能。

2. **Agent 级 pre-response hook / meta-workflow**
   - Issue：[#47446](https://github.com/NousResearch/hermes-agent/issues/47446)
   - 判断：偏平台能力升级，可能需要架构层设计，不太像短期补丁。

3. **按 profile 调整 temperature**
   - Issue：[#47512](https://github.com/NousResearch/hermes-agent/issues/47512)
   - 判断：很实用，但属于配置面扩展，较适合在“配置体系整顿”后落地。

4. **更强的多客户端/插件化能力**
   - Issue：[#47541](https://github.com/NousResearch/hermes-agent/issues/47541)
   - 判断：偏平台战略型，通常不会作为紧急功能优先项。

---

## 7) 用户反馈摘要
从今日 Issues 的措辞和场景可以提炼出几条非常真实的用户痛点：

- **“我想要的是直观交互，不是让用户在频道里手输编号”**  
  Slack clarify 按钮需求说明用户对 IM 场景的期望已经从“能用”升级到“像原生产品一样好用”。  
  相关：[#47529](https://github.com/NousResearch/hermes-agent/issues/47529)

- **“桌面端不能只跑起来，还要稳、要不崩、要不乱跳状态”**  
  发送图片崩溃、profile 切换卡 spinner、启动崩溃等问题表明桌面端已进入真实生产/日常使用阶段，用户容忍度很低。  
  相关：[#47498](https://github.com/NousResearch/hermes-agent/issues/47498) / [#47439](https://github.com/NousResearch/hermes-agent/issues/47439) / [#47524](https://github.com/NousResearch/hermes-agent/issues/47524)

- **“成本和路由必须透明，否则就是直接花钱踩坑”**  
  用户不仅关注模型质量，更关注请求是否发到了正确 provider、是否能看到 usage、是否会误耗费额度。  
  相关：[#47521](https://github.com/NousResearch/hermes-agent/issues/47521) / [#47534](https://github.com/NousResearch/hermes-agent/issues/47534) / [#47502](https://github.com/NousResearch/hermes-agent/issues/47502)

- **“IM 场景的上下文和状态清理必须严格”**  
  Telegram typing 残留、WhatsApp mention 处理、会话串台等问题都在强调：**会话边界和消息边界一旦错，就会影响 agent 可信度**。  
  相关：[#47539](https://github.com/NousResearch/hermes-agent/issues/47539) / [#47493](https://github.com/NousResearch/hermes-agent/issues/47493) / [#47475](https://github.com/NousResearch/hermes-agent/issues/47475)

---

## 8) 待处理积压
以下条目建议维护者优先 triage，均属于**影响面较大但当前讨论热度不高/尚无明确修复链路**的问题：

- **P1：Anthropic tool call 丢失**  
  [#47472](https://github.com/NousResearch/hermes-agent/issues/47472)  
  这是核心执行链路，优先级应最高。

- **Desktop 发送照片崩溃**  
  [#47498](https://github.com/NousResearch/hermes-agent/issues/47498)  
  影响桌面端基本可用性，建议尽快复现和定位。

- **macOS 打包启动崩溃**  
  [#47439](https://github.com/NousResearch/hermes-agent/issues/47439)  
  这类问题会直接影响发行质量。

- **会话消息串台**  
  [#47475](https://github.com/NousResearch/hermes-agent/issues/47475)  
  属于数据隔离问题，优先级不应低。

- **配置值静默类型污染**  
  [#47515](https://github.com/NousResearch/hermes-agent/issues/47515)  
  很容易演变成“难以察觉的长期错误”。

- **外部链接自动预览误触发协议处理器**  
  [#47500](https://github.com/NousResearch/hermes-agent/issues/47500)  
  建议尽快确认是否存在安全边界问题。

- **原始 IPC 错误直接暴露给用户**  
  [#47549](https://github.com/NousResearch/hermes-agent/issues/47549)  
  可用性/可维护性问题，适合并入一轮统一错误处理优化。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发到群里的短版摘要**，或  
2. **适合内部周报的表格版（含优先级、状态、负责人建议）**。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
**日期：2026-06-17**  
数据范围：过去 24 小时 GitHub 活动

---

## 1. 今日速览
过去 24 小时，PicoClaw 的仓库活跃度保持在**中等偏活跃**水平：Issues 仅有 1 条更新且已关闭，说明用户侧新增问题不多，但项目方对反馈仍有响应。PR 层面共有 4 条更新，其中 3 条已合并/关闭、1 条仍处于开放状态，表明开发推进仍在持续。  
今天的变化主要集中在**Telegram 论坛主题消息处理**、**远程 cron 命令可配置控制**以及**Gemini 工具调用兼容性修复**等方向，整体更偏向“稳定性修补 + 能力补齐”。  
从健康度看，项目没有新版本发布，说明当前更像是在积累修复与功能调整，而非一次集中发版周期。  
**总体判断：项目运行正常，维护活跃，近期重点仍是兼容性与控制面能力增强。**

---

## 2. 版本发布
**今日无新版本发布。**

---

## 3. 项目进展
今日最重要的推进来自 4 条 PR 状态变化，其中 3 条已关闭、1 条开放：

1. **#3137 `feat: allow configured remote cron commands`**  
   链接：<https://github.com/sipeed/picoclaw/pull/3137>  
   为 `tools.cron.command_allowed_remotes` 增加配置能力，允许特定远端渠道或远端 cron 命令执行。  
   **意义：** 这是一个偏“权限/调度控制”的增强，说明 PicoClaw 在自动化任务执行上继续向可配置、可管控方向演进。

2. **#3135 `fix(telegram): use compositeChatID in InboundContext.ChatID for forum topics`**  
   链接：<https://github.com/sipeed/picoclaw/pull/3135>  
   修复 Telegram 论坛主题场景下的 ChatID 处理问题，避免消息被错误发送到 General topic。  
   **意义：** 这是一个典型的集成兼容性修复，直接提升 Telegram 场景下的消息路由准确性，对论坛型群组用户影响较大。

3. **#3133 `Main2`**  
   链接：<https://github.com/sipeed/picoclaw/pull/3133>  
   状态已关闭，但从标题和摘要看变更意图不清晰。  
   **意义：** 当前无法判断其最终价值，但它仍反映出仓库保持一定试验性提交和持续迭代的状态。

4. **#3136 `fix(gemini): set both camelCase and snake_case thought_signature in tool call request body`**（开放中）  
   链接：<https://github.com/sipeed/picoclaw/pull/3136>  
   修复 Gemini 工具调用请求体中 `thoughtSignature` / `thought_signature` 字段兼容问题。  
   **意义：** 这是当前最值得跟进的开放 PR，直接关系到 Gemini 新模型的 agentic reasoning 兼容性，若合并将明显减少工具调用失败风险。

**项目整体向前迈进的程度：**  
今日共有 **4 条 PR 变动、3 条已关闭/合并、1 条仍开放**，说明仓库主要在处理“可落地”的代码变更而非停滞不前。当前推进重点集中在**外部平台兼容性**与**命令执行控制**，属于对核心使用场景很关键的优化。

---

## 4. 社区热点
今日讨论最集中的条目是 **Issue #3134**，共有 **2 条评论**，为当天唯一有明确讨论热度的问题。  
- **Issue #3134 `[BUG] not support su -c 'echo OK'`**  
  链接：<https://github.com/sipeed/picoclaw/issues/3134>  
  该问题描述指出：在使用 `su -c 'echo OK'` 时，agent gateway 环境返回 `No daemon is currently running!`，而在 Picoclaw agent 对话中让其执行同样命令也会报错退出。  
  **背后诉求：** 用户希望 PicoClaw 能稳定支持带 `su` 的命令执行，说明其真实使用场景包含系统级命令、权限切换和自动化 shell 操作。  
  **潜在影响：** 这类问题若不解决，会直接影响用户对“可执行系统命令”的信任，尤其是需要提权或切换用户的自动化流程。

除该 Issue 外，今天的 PR 中没有明显评论数据或高反应条目，因此社区关注点主要集中在这一处实际故障上。

---

## 5. Bug 与稳定性
按影响优先级排序，今日主要 Bug 如下：

### 1) Issue #3134：`su -c 'echo OK'` 不支持，agent 执行失败
链接：<https://github.com/sipeed/picoclaw/issues/3134>  
- **现象：** 在 agent gateway 环境中报 `No daemon is currently running!`，agent 对话执行该命令时会报错退出。  
- **严重性判断：** 中高。  
  这是一个影响命令执行链路的稳定性问题，尤其会影响系统管理、提权调用和自动化脚本类场景。  
- **是否已有 fix PR：** 当前给出的 PR 列表中**未看到直接对应的修复 PR**。  
- **用户影响：** 若该问题广泛存在，会限制 PicoClaw 作为“个人 AI 助手/自动化代理”执行真实系统命令的能力。

### 2) Issue #3134 的环境/执行链路兼容性问题
同上链接。  
- 从摘要看，问题可能涉及 **daemon 状态判断**、**gateway 与 agent 的执行上下文不一致**，以及 **su 场景的权限/会话管理**。  
- **建议关注点：** 需要确认是 shell 执行层、daemon 连接层，还是权限切换后 stdout/stderr 回传链路的兼容性问题。

---

## 6. 功能请求与路线图信号
今日体现出的功能路线信号主要有两个：

### 1) 远程 cron 命令白名单能力
PR #3137  
链接：<https://github.com/sipeed/picoclaw/pull/3137>  
- 这是一个非常明确的功能请求/能力增强：允许配置哪些远程 channel 可以执行 cron 命令。  
- **路线图信号：** 项目在向“更细粒度的执行权限控制”演进。  
- **是否可能纳入下一版本：** 可能性较高，尤其如果该 PR 已经接近稳定，通常会被视为可发布增强项。

### 2) Gemini 工具调用兼容性修复
PR #3136  
链接：<https://github.com/sipeed/picoclaw/pull/3136>  
- 针对 Gemini 3.5 Flash Agentic reasoning 的参数格式兼容问题，属于模型适配层修复。  
- **路线图信号：** PicoClaw 持续跟进最新模型 API 变化，说明其产品策略仍然围绕多模型兼容和 agent 工具调用可靠性展开。  
- **是否可能纳入下一版本：** 很高。此类兼容修复通常优先级高，且对用户可见。

### 3) Telegram 论坛主题消息路由修复
PR #3135  
链接：<https://github.com/sipeed/picoclaw/pull/3135>  
- 表明 Telegram 集成仍是重要使用场景。  
- **路线图信号：** 产品在多聊天形态（普通群 / forum topic）下继续补齐边界行为。  
- **是否可能纳入下一版本：** 高。

---

## 7. 用户反馈摘要
从今日 Issue 的内容可以提炼出较真实的用户痛点和使用场景：

### 1) 用户希望 PicoClaw 能可靠执行带权限切换的命令
Issue #3134  
链接：<https://github.com/sipeed/picoclaw/issues/3134>  
- **真实痛点：** `su -c` 这种常见系统命令在 agent gateway 与 agent 对话执行中出现失败，说明用户并不只把 PicoClaw 当聊天工具，而是当作**可执行系统任务的自动化助手**。  
- **场景特征：** 需要执行 shell 命令、处理用户切换、可能涉及 daemon/会话状态。  
- **用户不满点：** 执行链路不稳定、错误信息不够直观、同一命令在不同入口表现不一致。  
- **满意点：** 用户愿意继续通过对话触发执行，说明对产品的“可代理执行”定位是认可的，只是希望更稳。

### 2) 对 Telegram 论坛主题消息定位准确性有实际需求
PR #3135 背后的场景  
链接：<https://github.com/sipeed/picoclaw/pull/3135>  
- **真实痛点：** 论坛 topic 中消息容易被打到 General topic，而不是指定线程。  
- **场景特征：** 用户在较复杂的 Telegram 群组结构中使用 PicoClaw。  
- **反馈含义：** 用户希望它能“理解并保留上下文中的线程信息”，这对机器人类产品非常关键。

---

## 8. 待处理积压
基于当前提供的数据，**没有明显的长期未响应 Issue 或 PR**；今日新增/活跃问题已全部关闭，说明短期响应效率尚可。  
不过从“待处理”角度看，建议维护者优先关注以下两项：

1. **开放 PR #3136：Gemini thought signature 兼容修复**  
   链接：<https://github.com/sipeed/picoclaw/pull/3136>  
   该 PR 直接影响新模型适配，建议尽快评估合并风险并推进。

2. **Issue #3134：`su -c` 执行失败问题**  
   链接：<https://github.com/sipeed/picoclaw/issues/3134>  
   虽然当天已关闭，但从摘要看属于较核心的执行能力问题；若没有对应修复 PR，建议纳入后续优先级列表。

---

## 综合结论
PicoClaw 今日表现出**稳定推进、持续修补、兼顾兼容性**的健康状态：  
- 维护侧响应正常，问题不过度积压；  
- 开发侧聚焦于实际使用中的兼容性和执行可靠性；  
- 社区反馈更偏向“可执行命令”和“多平台集成”的真实生产需求。  

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合微信群/飞书发布的短版**，或  
2. **适合管理层阅读的表格版**。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-06-17）

## 1. 今日速览
今日 NanoClaw 处于**“问题修复与运维能力打磨”**阶段：过去 24 小时共有 **4 条 Issues 更新**、**2 条 PR 更新**，但**没有新版本发布**。从议题分布看，新增与活跃内容主要集中在**兼容性/集成问题、容器运行时缓存一致性、文档安全模型过期、以及凭证接入路径**，说明项目当前的活跃度偏**中高**，但更多是“把边角问题补齐”，而不是大版本功能推进。  
社区讨论热度不算高，但已有条目都比较具体、工程导向，反映出 NanoClaw 正在进入更成熟阶段：用户开始关注**真实部署可用性**、**长期维护成本**和**企业/沙箱环境适配**。  
项目健康度整体**中性偏稳**：没有崩溃级大事故或版本回滚信号，但有几条会影响实际使用体验的缺陷值得尽快处理。  
参考仓库： [NanoClaw](https://github.com/qwibitai/nanoclaw)

---

## 3. 项目进展
### 已关闭的重要 PR
- **[#2782 fix: make tailscale-docker routing service self-healing](https://github.com/qwibitai/nanoclaw/pull/2782)**  
  这个 PR 聚焦于 **Tailscale / Docker 路由规则的自愈能力**：原先的 `Type=oneshot` systemd 单元只在启动时应用 ip rule，若 Tailscale 在会话中途重置规则，系统就会“表面 active、实际上失效”。  
  这类修复的意义在于：它不是增加新功能，而是补足**网络基础设施可靠性**，对长期在线、依赖出口节点切换的部署尤为重要。即便 PR 已关闭，从议题本身看，项目正在把“能跑”提升到“能持续稳定跑”。

### 仍在推进的关键 PR
- **[#2780 feat(upgrade-state): env opt-out for the startup tripwire (managed fleets)](https://github.com/qwibitai/nanoclaw/pull/2780)**  
  这是一个面向**受管 fleet / 镜像化部署**的可运维性特性：允许通过环境变量关闭启动升级 tripwire，减少不可变镜像或预置环境中的阻断。  
  它体现出 NanoClaw 的使用场景正在从“单机交互式安装”扩展到“批量、受控、自动化部署”。

**整体推进判断：**  
今天没有版本发布，但从 PR 主题看，项目在向 **“更稳的网络基础设施 + 更适合批量部署”** 方向迈进，属于**质量与可运维性增强**，而非功能扩张型进展。

---

## 4. 社区热点
### 当日最活跃讨论
- **[#2779 Slack: @handles inside URLs (e.g. hackmd.io/@user) get mangled into broken mentions](https://github.com/qwibitai/nanoclaw/issues/2779)**  
  这是今日**评论最多**的条目（1 条评论），也是当前最热的讨论点。  
  背后的诉求很明确：**Agent 往 Slack 发链接时，URL 中的 `@handle` 被错误解析为 mention，导致链接损坏**。这类问题直接影响协作流中的“结果可读性”和“链接可点击性”，属于典型的集成兼容 bug。  

### 其他条目热度
- 其余 Issues/PR 在给定数据中评论数均为 0 或未提供，说明讨论尚未充分展开，更多处于**刚提出、等待维护者响应**的阶段。  
  相关链接：
  - [#2784 container-runner: session source staleness check only watches index.ts, misses ipc-mcp-stdio.ts changes](https://github.com/qwibitai/nanoclaw/issues/2784)
  - [#2783 docs/SECURITY.md describes the retired v1 trust model and references a non-existent skill](https://github.com/qwibitai/nanoclaw/issues/2783)
  - [#2781 [Feature] Support NANOCLAW_NATIVE_CREDENTIALS to bypass OneCLI and use externally-provided provider credentials](https://github.com/qwibitai/nanoclaw/issues/2781)

---

## 5. Bug 与稳定性
按影响面与潜在严重程度排序：

### 1) 高优先级：Slack 链接被误解析，影响外部协作链路
- **[#2779](https://github.com/qwibitai/nanoclaw/issues/2779)**  
  现象是 `hackmd.io/@user/...` 这类 URL 在 Slack 中被改写成 broken mentions，导致链接失效。  
  **影响：** 这是典型的用户可见输出问题，会直接破坏 agent 生成结果的可用性，尤其影响 Slack 作为交付/协作终端的场景。  
  **是否已有 fix PR：** 当前数据中**未见直接对应的 fix PR**。

### 2) 高优先级：容器运行时源码缓存失效检测不完整
- **[#2784](https://github.com/qwibitai/nanoclaw/issues/2784)**  
  `container-runner` 只盯 `index.ts` 的变更，忽略了 `ipc-mcp-stdio.ts` 等相关文件，可能导致**会话目录中的 agent-runner 源码陈旧**。  
  **影响：** 这类问题会让修复和更新“看起来已同步、实际上未生效”，属于较隐蔽但影响实际运行一致性的 bug。  
  **是否已有 fix PR：** 当前数据中**未见直接对应的 fix PR**。

### 3) 中优先级：安全文档与当前实现不一致
- **[#2783](https://github.com/qwibitai/nanoclaw/issues/2783)**  
  `docs/SECURITY.md` 还在描述已退役的 v1 trust model，并引用了不存在的 skill。  
  **影响：** 不是运行时故障，但会误导维护者、集成方和安全审计人员，属于**文档型稳定性风险**。  
  **是否已有 fix PR：** 当前数据中**未见对应 PR**。

### 4) 中低优先级：路由自愈问题已被单独修补方向覆盖
- **[#2782 PR](https://github.com/qwibitai/nanoclaw/pull/2782)**  
  该 PR 试图解决 Tailscale 中途刷新 ip rule 后路由失效的问题。  
  **影响：** 属于运行稳定性问题，尤其在出口节点切换、网络抖动时更明显。  
  **状态：** PR 已关闭；从问题本身看，说明维护者已经在处理这类基础设施脆弱点。

---

## 6. 功能请求与路线图信号
### 明确的新功能诉求
- **[#2781 [Feature] Support NANOCLAW_NATIVE_CREDENTIALS...](https://github.com/qwibitai/nanoclaw/issues/2781)**  
  这是一个很清晰的路线图信号：希望 NanoClaw 支持 **绕过 OneCLI，直接使用外部注入的 provider credentials**。  
  **场景画像：** 下游打包、沙箱环境、企业镜像、受控部署。  
  这类场景通常不适合依赖额外交互式认证流程，因此该需求具有较强的**实际落地价值**。

### 与现有 PR 的关联判断
- **[#2780](https://github.com/qwibitai/nanoclaw/pull/2780)** 显示项目正在认真处理**受管 fleet** 的启动行为控制。  
- 这与 **#2781** 的方向是一致的：都在解决“非交互式、可预置、可自动化”部署中的摩擦点。  

### 可能进入下一版本的候选
优先级上更像会进入下一轮版本/补丁周期的，可能是：
1. **[#2781](https://github.com/qwibitai/nanoclaw/issues/2781)**：凭证接入方式优化，价值明确，适配范围广。  
2. **[#2779](https://github.com/qwibitai/nanoclaw/issues/2779)**：Slack 链接修复，用户感知强，适合快速补丁。  
3. **[#2784](https://github.com/qwibitai/nanoclaw/issues/2784)**：运行时同步一致性问题，偏工程质量，值得尽快纳入修复队列。  

---

## 7. 用户反馈摘要
基于当前 Issues 的标题与摘要，可以提炼出几类真实用户痛点：

### 1) 生成结果在外部平台上不够“稳”
- **来源：[#2779](https://github.com/qwibitai/nanoclaw/issues/2779)**  
  用户希望 Agent 输出的链接能在 Slack 中**原样可用**，而不是被平台自动重写。  
  这反映出用户对 NanoClaw 的期待不仅是“能生成内容”，还要“能在协作平台里无损传递”。

### 2) 长时间运行/分组会话下的同步一致性
- **来源：[#2784](https://github.com/qwibitai/nanoclaw/issues/2784)**  
  用户在意的是“改了代码之后，session 里是否真的更新了”。  
  这类反馈说明项目已进入更复杂的运行模式，用户开始依赖其作为**持续会话型系统**，不是一次性脚本。

### 3) 安全与文档可信度
- **来源：[#2783](https://github.com/qwibitai/nanoclaw/issues/2783)**  
  用户/维护者对文档准确性非常敏感，尤其是安全文档。  
  这意味着 NanoClaw 的生态中已经有一部分用户开始认真看文档做集成，而不是只看 README 快速试用。

### 4) 企业/沙箱部署的认证摩擦
- **来源：[#2781](https://github.com/qwibitai/nanoclaw/issues/2781)**  
  用户希望减少对 OneCLI 的依赖，说明一些部署环境里“默认认证路径”并不现实。  
  这类需求常见于**打包发行、离线环境、受控运行时**，属于产品走向更广泛部署阶段的典型反馈。

**总体反馈画像：**  
当前用户不太在意“新奇功能”，更在意**集成稳定、部署灵活、文档可信、输出不被平台破坏**。这通常是项目从探索期进入成熟期的标志。

---

## 8. 待处理积压
当前数据里没有明确显示“长期未响应”的老 Issue/PR，但从今天的新增/活跃项看，以下条目应优先纳入维护者关注队列：

### 优先跟进的待处理项
- **[#2779](https://github.com/qwibitai/nanoclaw/issues/2779)**：影响 Slack 输出质量，用户可见性强，建议尽快确认修复策略。  
- **[#2784](https://github.com/qwibitai/nanoclaw/issues/2784)**：运行时缓存一致性问题，建议尽快定位 staleness 判定逻辑。  
- **[#2783](https://github.com/qwibitai/nanoclaw/issues/2783)**：文档漂移虽不致命，但会持续降低信任度，适合尽早清理。  
- **[#2781](https://github.com/qwibitai/nanoclaw/issues/2781)**：功能请求已明确且场景合理，适合作为下一版本候选。  
- **[#2780](https://github.com/qwibitai/nanoclaw/pull/2780)**：open PR 仍在等待决策，若目标是提升 managed fleet 适配性，建议优先评审。

### 维护提醒
- 目前条目普遍**评论少、响应少**，说明问题刚浮出水面，适合在早期就明确优先级。  
- 若要控制支持成本，建议先处理 **[#2779](https://github.com/qwibitai/nanoclaw/issues/2779)** 和 **[#2784](https://github.com/qwibitai/nanoclaw/issues/2784)** 这类“用户感知强 + 运行影响大”的问题。  

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发微信群/Slack 的简版**  
2. **适合内部周报的管理层版**  
3. **带“优先级评分/风险等级”的运营版**

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报（2026-06-17）

## 1. 今日速览
过去 24 小时，NullClaw 的公开活动整体偏低：没有新增或活跃的 Issues，也没有新的版本发布。  
项目当天的主要动向集中在 **2 条修复型 Pull Request**，且都处于 **Open** 状态，说明维护重心更多在稳定性与集成兼容性，而非功能扩张。  
从数据看，仓库当前没有明显的社区讨论热度，属于 **低噪音、低事件密度** 的日常维护阶段。  
整体健康度判断：**稳定，但公开互动较少；技术修复在推进，等待合并验证。**  
- 仓库主页：https://github.com/nullclaw/nullclaw

---

## 2. 版本发布
**今日无新版本发布。**  
- Releases 页面：https://github.com/nullclaw/nullclaw/releases

---

## 3. 项目进展
今日没有已合并或关闭的 PR，但有 2 个重要修复方向正在推进，属于明显的稳定性增强信号。

### PR #959 - fix(cron): persist paired token for scheduler tool access (#839)
- 链接：https://github.com/nullclaw/nullclaw/pull/959
- 状态：Open
- 进展意义：
  - 修复 `/pair` 成功后 **token 未持久化** 的问题。
  - 使 cron / scheduler 工具能够稳定获取已配对的 bearer token。
  - 若该 PR 合并，将减少调度链路中“配对成功但后续访问失败”的断点，提升自动化任务可靠性。

### PR #958 - fix(teams): accept lowercase `serviceurl` JWT claim and raise JWKS fetch cap
- 链接：https://github.com/nullclaw/nullclaw/pull/958
- 状态：Open
- 进展意义：
  - 解决 MS Teams 入站消息在 Bot Framework token 校验时被 **403 拒绝** 的问题。
  - 兼容 lowercase `serviceurl` claim，并提高 JWKS 拉取上限。
  - 若合并，将直接改善 Teams 集成可用性，属于面向真实外部输入兼容性的关键修复。

### 今日整体推进评价
- 今日没有“已落地”的合并成果，但两条 PR 都属于 **高价值修复**。
- 从内容看，项目正在同时修补：
  1. **自动化调度链路稳定性**
  2. **外部消息平台兼容性**
- 若后续合并，这一批修复会明显提升 NullClaw 在“AI 智能体/助手”场景中的可用性与鲁棒性。

---

## 4. 社区热点
今日没有形成明显的社区热点。

### 活跃度最高的公开讨论
- **Issues：0 条**
  - 链接：https://github.com/nullclaw/nullclaw/issues
- **PR：2 条，均为 0 评论、0 👍**
  - PR #959：https://github.com/nullclaw/nullclaw/pull/959
  - PR #958：https://github.com/nullclaw/nullclaw/pull/958

### 背后诉求分析
- 目前没有看到集中讨论或多方反馈，说明：
  - 公开社区参与度偏低；
  - 维护者主导的修复推进明显；
  - 用户侧需求更可能通过提交 PR 直接表达，而非 issue 讨论。
- 热点缺失并不等于项目无需求，而是意味着**需求主要以工程修复的形式存在**，尚未在 Issue 区形成聚集。

---

## 5. Bug 与稳定性
今日没有新建 Issues，因此 **没有新增公开 Bug 报告**。  
不过，两条 open PR 明确指向稳定性问题，可视为当前最重要的“待修复缺陷”。

### 按潜在影响排序

1. **Teams 入站消息 403 / JWT 校验兼容性问题**
   - PR：[#958](https://github.com/nullclaw/nullclaw/pull/958)
   - 严重性：高
   - 影响面：外部集成（MS Teams）消息接入
   - 问题特征：认证失败导致消息被拒，直接影响功能可用性
   - 是否已有 fix PR：**有，PR #958（Open）**

2. **cron/scheduler 工具无法稳定持久化配对 token**
   - PR：[#959](https://github.com/nullclaw/nullclaw/pull/959)
   - 严重性：中-高
   - 影响面：调度/自动化任务访问权限
   - 问题特征：配对成功后 token 若不持久化，会造成后续任务访问异常或重复配对
   - 是否已有 fix PR：**有，PR #959（Open）**

### 稳定性判断
- 当前没有新增 crash 或回归的公开证据。
- 但现有 PR 指向的都是**真实生产可见问题**，说明项目维护重点落在“修复外部输入兼容性”和“提升长期可用性”上。
- 这对 AI 智能体/个人助手类项目很关键，因为这类项目通常对：
  - 鉴权稳定性
  - 第三方平台兼容性
  - 调度持久化  
  非常敏感。

---

## 6. 功能请求与路线图信号
今日没有新增公开 Issues，因此没有直接看到新的功能需求提交。  
不过，从现有 PR 可以反推出两个较明确的路线图信号：

### 路线图信号 1：自动化执行能力的可靠性优先级在上升
- 依据：PR #959
- 含义：项目可能在强化“agent / scheduler / cron”这一类后台自动执行能力。
- 可能进入下一版本的原因：
  - 直接影响无人值守任务；
  - 属于基础设施级能力，优先级通常高于新增特性。

### 路线图信号 2：外部平台接入兼容性持续修补
- 依据：PR #958
- 含义：Teams 集成是项目对外连接的重要入口，兼容性修复显然具有较高发布价值。
- 可能进入下一版本的原因：
  - 会直接改善用户接入体验；
  - 修复类型通常适合进入最近一次发布窗口。

### 当前判断
- **更可能被纳入下一版本的内容：**
  1. Teams JWT 校验兼容修复
  2. cron token 持久化修复
- 这两项都属于“高收益、低侵入”的修复，适合快节奏合并。

- PR 列表：https://github.com/nullclaw/nullclaw/pulls

---

## 7. 用户反馈摘要
今日没有 Issues 评论，因此没有可抽取的直接用户反馈样本。  
从现有公开信息中，能间接读出的用户痛点主要是：

### 真实痛点
- **配对后自动化访问不稳定**
  - 暗示用户希望 NullClaw 在配对成功后能够“持续可用”，而不是仅一次性连通。
- **Teams 消息接入失败**
  - 暗示有用户在实际业务中使用 Teams 作为入口，对消息到达率和鉴权兼容性要求较高。

### 使用场景
- 后台调度任务/cron 工具访问
- Teams Bot/消息入口集成
- 配对式授权后的长连接/长期访问

### 满意/不满意点
- 满意点：项目显然已经具备可接入第三方平台与调度工具的能力。
- 不满意点：当前暴露出的两个问题都属于“能用但不够稳”，说明用户对稳定性和兼容性仍有明显诉求。

- Issues 页面：https://github.com/nullclaw/nullclaw/issues

---

## 8. 待处理积压
从当前数据看，**没有可确认的长期未响应高优先级 Issue**，原因是：
- 公开 Issues 数量为 0；
- 当前未见积压的未处理讨论；
- 两个重要问题已经以 PR 形式进入修复流程。

### 当前值得持续关注的“隐性积压”
1. **PR #958** — Teams 兼容性修复  
   - 链接：https://github.com/nullclaw/nullclaw/pull/958  
   - 风险：如果长期不合并，Teams 用户会持续受到 403 问题影响。

2. **PR #959** — scheduler token 持久化修复  
   - 链接：https://github.com/nullclaw/nullclaw/pull/959  
   - 风险：如果长期不合并，自动化任务链路可靠性仍会受限。

### 管理建议
- 虽然没有传统意义上的“Issue 积压”，但这两条 open PR 已经承担了积压修复项的角色。
- 建议维护者尽快完成：
  - 安全回归检查
  - 最小化集成测试
  - 合并后观察真实环境反馈

- PR 列表：https://github.com/nullclaw/nullclaw/pulls

---

## 总体结论
NullClaw 在 2026-06-17 的公开活动不多，但维护方向非常清晰：**围绕稳定性、鉴权兼容性和自动化访问能力做修复**。  
虽然今天没有发布、没有合并、也没有新增社区讨论，但两条 open PR 都属于对核心使用路径有直接价值的改进。  
从项目健康度看，这是一个 **低噪音、问题导向、仍在积极修补关键链路** 的状态。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-06-17）

## 1) 今日速览
今天 IronClaw 仍处于**高活跃迭代**状态：过去 24 小时内有 **24 条 Issues 更新**、**32 条 PR 更新**，但**没有新版本发布**。  
从主题上看，讨论重心明显集中在 **Reborn WebUI / Automations / 认证审批 / 工具活动可见性**，说明项目正在持续打磨主流程体验与边界场景稳定性。  
整体上属于**“开发推进快、反馈密集、尚未收敛到发版”**的阶段：一方面有多条修复 PR 并行推进，另一方面用户在自动化和审批链路上的痛点仍然集中。  
项目健康度评估：**中上**，但当前积压的体验问题和权限/审批相关 bug 值得优先收敛。  
相关链接： [Issues 列表](https://github.com/nearai/ironclaw/issues) ｜ [PR 列表](https://github.com/nearai/ironclaw/pulls)

---

## 2) 项目进展
今天可见的已关闭 PR 主要有 2 条，代表项目在基础能力和运行链路上继续推进：

- **#4995** `[CLOSED] feat(bench): forward NEARAI_API_KEY so /benchmark reborn runs use NEAR cloud`  
  为 benchmark/dispatcher 流程补上 `NEARAI_API_KEY` 传递，使 Reborn benchmark 能走 NEAR AI cloud。  
  链接：<https://github.com/nearai/ironclaw/pull/4995>

- **#4973** `[CLOSED] fix(reborn): recover tool input/output on every terminal run`  
  将 WebChat v2 的 timeline 恢复逻辑从“仅成功态”扩展到所有终态，提升失败/取消/恢复场景下的工具输入输出回收能力。  
  链接：<https://github.com/nearai/ironclaw/pull/4973>

虽然今天未见新 Release，但从 OPEN PR 的结构看，项目正在同时向四个方向推进：

1. **运行与安全控制**  
   - #4993：no-progress stop 失败时不要伪装成完成  
   - #4998：auth resume 后正确暴露 approval gate  
   - #5001：放宽 provider-output 校验，减少 give-up loop  
   链接：<https://github.com/nearai/ironclaw/pull/4993> ｜ <https://github.com/nearai/ironclaw/pull/4998> ｜ <https://github.com/nearai/ironclaw/pull/5001>

2. **Reborn WebUI 可见性与恢复性**  
   - #4984：失败/未知工具活动在 WebUI 中正确展示  
   - #4978：approval deny 活动保持可见且顺序正确  
   - #5002：Recent threads 按最后交互排序  
   链接：<https://github.com/nearai/ironclaw/pull/4984> ｜ <https://github.com/nearai/ironclaw/pull/4978> ｜ <https://github.com/nearai/ironclaw/pull/5002>

3. **集成能力增强**  
   - #4997：`google-drive.download_file` 支持二进制文档抽取  
   - #4990：修正 NEAR AI MCP ready state 投影  
   链接：<https://github.com/nearai/ironclaw/pull/4997> ｜ <https://github.com/nearai/ironclaw/pull/4990>

4. **学习/反思/进度系统**  
   - #4975、#5000：reflection / content-digest / no-progress redesign 相关堆叠 PR  
   链接：<https://github.com/nearai/ironclaw/pull/4975> ｜ <https://github.com/nearai/ironclaw/pull/5000>

**结论**：今天项目的推进不是单点修补，而是围绕“可运行、可解释、可管理”的 Reborn 体验做系统性补强。

---

## 3) 社区热点
今天最活跃的话题几乎全部围绕 **自动化（Automations）与 Reborn WebUI 的可用性** 展开。  
评论最多的 Issue 目前是 **#4986**（1 条评论），其他多数新提报仍处于 0 评论状态，说明问题已经被快速发现，但社区讨论还处于早期。

重点热点如下：

- **#4986** `[bug] Recurring automation can become permanently blocked waiting for tool approval`  
  用户反馈自动化在等待工具审批时可能永久阻塞，这是典型的“运行卡死”高优先级问题。  
  链接：<https://github.com/nearai/ironclaw/issues/4986>

- **#5005** `Automations page provides status views but no management actions`  
  用户能看到 Active/Running/Failures/Paused，但不能直接暂停、恢复、编辑或删除，说明“看得见但管不了”。  
  链接：<https://github.com/nearai/ironclaw/issues/5005>

- **#5004** `Automations Failure summary card is not actionable`  
  Failure 卡片无法定位失败的 automation / run / 时间 / 原因，定位成本高。  
  链接：<https://github.com/nearai/ironclaw/issues/5004>

- **#4988** `[UX / Onboarding] Recent runs visualization is difficult to understand`  
  用户无法从彩色点图中理解运行状态与数量，信息表达不足。  
  链接：<https://github.com/nearai/ironclaw/issues/4988>

- **#4987** `Automation run threads are difficult to discover when user approval is required`  
  审批触发的 run thread 难以在常规会话列表中发现，导致“系统在跑，但用户不知道在哪”。  
  链接：<https://github.com/nearai/ironclaw/issues/4987>

**背后诉求总结**：  
用户并不是单纯要更多状态展示，而是希望 **状态能直接导向行动**：能看见、能定位、能恢复、能管理。

---

## 4) Bug 与稳定性
按严重程度排序，今天的主要稳定性问题集中在 **认证审批、自动化执行、工具活动展示** 三类。

### 高严重度

- **#4992** `[bug, risk: medium, scope: channel/web, scope: db/libsql, scope: worker, reborn, OAuth / Authorization] Local-dev SSO access mismatch can make Railway automations fail before run/thread creation`  
  影响面较大：自动化触发后在创建 run/thread 之前就失败，表现为 `No thread attached`、`0% visible runs`。  
  **是否已有 fix PR：有**，对应修复 PR **#5003**。  
  关联链接：<https://github.com/nearai/ironclaw/issues/4992> ｜ <https://github.com/nearai/ironclaw/pull/5003>

- **#4986** `[bug] Recurring automation can become permanently blocked waiting for tool approval`  
  这是非常典型的运行卡死问题，直接影响自动化可靠性。  
  **是否已有 fix PR：未见明确对应 PR**。  
  链接：<https://github.com/nearai/ironclaw/issues/4986>

- **#4991** `WASM google-drive auth failures dead-end as operation_failed without refresh-retry or AuthRequired gate`  
  OAuth 失效后直接变成泛化错误，缺少 refresh/retry 或 AuthRequired 兜底，导致集成任务恢复性差。  
  **是否已有 fix PR：未见明确对应 PR**。  
  链接：<https://github.com/nearai/ironclaw/issues/4991>

### 中严重度

- **#4977** `[Reborn WebUI] Approval-deny tool activity should stay visible and ordered`  
  拒绝审批后的 tool activity 可能仍显示为 RUN 或在刷新后丢失顺序，影响可追踪性。  
  **是否已有 fix PR：有**，对应 PR **#4978**，但仍为 OPEN。  
  链接：<https://github.com/nearai/ironclaw/issues/4977> ｜ <https://github.com/nearai/ironclaw/pull/4978>

- **#4984** `Fix failed tool activity updates in WebUI` 对应的问题域  
  失败工具活动在首次加载和 live update 中可能不完整。  
  **是否已有 fix PR：有**，PR **#4984** 已提交并在推进中。  
  链接：<https://github.com/nearai/ironclaw/pull/4984>

- **#4961** `[bug] "Working" indicator may remain visible after agent has already finished responding`  
  这是 UI 状态滞后问题，虽然不致命，但会误导用户判断运行是否结束。  
  **是否已有 fix PR：未见明确对应 PR**。  
  链接：<https://github.com/nearai/ironclaw/issues/4961>

### 低到中严重度

- **#4999** `Scale google-drive download_file extraction beyond the 1 MB WASM round-trip cap`  
  当前 1 MB cap 限制了文档抽取的规模，属于能力边界问题。  
  **是否已有 fix PR：有对应能力 PR #4997，但更偏基础实现**。  
  链接：<https://github.com/nearai/ironclaw/issues/4999> ｜ <https://github.com/nearai/ironclaw/pull/4997>

---

## 5) 功能请求与路线图信号
今天的新需求信号非常明显：**Reborn 的权限体系、自动化管理面板、可观测性、以及数据接入能力**，很可能会成为下一阶段路线图重点。

### 可能进入下一版本的方向

- **全局自动审批 / per-tool 权限模型**
  - #4959：全局 auto-approve 设置，且无需重启生效
  - #4958：per-tool permission model（always_allow / ask_each_time / disabled）
  - #4960：settings + tools permission API/UI
  链接：<https://github.com/nearai/ironclaw/issues/4959> ｜ <https://github.com/nearai/ironclaw/issues/4958> ｜ <https://github.com/nearai/ironclaw/issues/4960>

- **Automations 页面从“观察面板”升级为“管理面板”**
  - #5005：增加暂停/恢复/编辑/删除
  - #5004：失败摘要可点击可追踪
  - #4980：empty state 提示如何创建 automation
  - #4988：recent runs 视觉说明更清晰
  链接：<https://github.com/nearai/ironclaw/issues/5005> ｜ <https://github.com/nearai/ironclaw/issues/5004> ｜ <https://github.com/nearai/ironclaw/issues/4980> ｜ <https://github.com/nearai/ironclaw/issues/4988>

- **Google Drive / 二进制文档接入能力增强**
  - #4997：抽取 PDF/PPTX/DOCX/XLSX
  - #4999：突破 1MB round-trip cap
  - #4991：auth failure 的恢复闭环
  链接：<https://github.com/nearai/ironclaw/pull/4997> ｜ <https://github.com/nearai/ironclaw/issues/4999> ｜ <https://github.com/nearai/ironclaw/issues/4991>

- **Engine V2 可观测性**
  - #4985：persist LLM usage so /api/admin/usage returns data
  - #4989：Persist Engine V2 LLM usage
  链接：<https://github.com/nearai/ironclaw/issues/4985> ｜ <https://github.com/nearai/ironclaw/pull/4989>

**路线图判断**：  
若按“短期可落地优先级”看，最可能先进入下一版本的是 **#5003、#4984、#4978、#4989、#4997** 这类**直接修复用户可见问题**的 PR；  
而 **#4958/#4959/#4960** 这种权限体系重构，虽然战略价值更高，但通常会以更慢的节奏推进。

---

## 6) 用户反馈摘要
今天的用户反馈高度一致，核心痛点可以概括为四类：

1. **自动化能跑，但不好管**
   - 用户能看到状态卡片，但缺少管理动作。  
   - 典型场景：定时巡检 GitHub 仓库、自动触发工具、审批后继续执行。  
   链接：<https://github.com/nearai/ironclaw/issues/5005> ｜ <https://github.com/nearai/ironclaw/issues/4986>

2. **审批链路不透明**
   - 用户不知道 run thread 在哪、为什么停住、拒绝后是否已终止。  
   - 典型场景：触发工具需要人工审批，run 进入“看似运行、实际卡住”的状态。  
   链接：<https://github.com/nearai/ironclaw/issues/4987> ｜ <https://github.com/nearai/ironclaw/issues/4977>

3. **状态展示太“技术化”，不够可解释**
   - 彩色点、状态徽标、Working 指示器对新用户不够直观。  
   - 典型场景：用户想确认自动化是否执行成功，结果只能猜图例含义。  
   链接：<https://github.com/nearai/ironclaw/issues/4988> ｜ <https://github.com/nearai/ironclaw/issues/4981> ｜ <https://github.com/nearai/ironclaw/issues/4961>

4. **集成与认证失败缺少恢复路径**
   - Google Drive、Slack、SSO 等边界场景里，一旦失败，用户希望系统能给出下一步，而不是 generic failure。  
   - 典型场景：驱动文档读取、自动化触发、Railway/local-dev 认证。  
   链接：<https://github.com/nearai/ironclaw/issues/4991> ｜ <https://github.com/nearai/ironclaw/issues/4992> ｜ <https://github.com/nearai/ironclaw/issues/4952>

**用户满意点**：系统已经具备较完整的状态与流程框架，说明产品基础能力不弱。  
**用户不满点**：当前最大问题不是“没有功能”，而是**功能存在但难以理解、难以操作、失败后难以恢复**。

---

## 7) 待处理积压
严格来说，今天的数据里还没有“长期无人响应”的陈旧积压，但已经形成了几组**必须持续跟进的重点堆栈**：

- **自动化 / 审批 / run 可见性堆栈**
  - #4986、#4987、#4977、#5004、#5005、#4988  
  这组问题如果不收敛，会直接影响 Reborn 自动化的可用性。  
  链接：<https://github.com/nearai/ironclaw/issues/4986> ｜ <https://github.com/nearai/ironclaw/issues/4987> ｜ <https://github.com/nearai/ironclaw/issues/4977> ｜ <https://github.com/nearai/ironclaw/issues/5004> ｜ <https://github.com/nearai/ironclaw/issues/5005> ｜ <https://github.com/nearai/ironclaw/issues/4988>

- **认证 / SSO / auth resume 堆栈**
  - #4992、#4991、#4952、#4998  
  涉及触发失败、OAuth 失效、Slack auto-deny、auth resume 等关键路径。  
  链接：<https://github.com/nearai/ironclaw/issues/4992> ｜ <https://github.com/nearai/ironclaw/issues/4991> ｜ <https://github.com/nearai/ironclaw/issues/4952> ｜ <https://github.com/nearai/ironclaw/pull/4998>

- **权限体系与设置 API/UI 堆栈**
  - #4958、#4959、#4960  
  这是决定 Reborn 是否真正“可配置、可控”的基础工程。  
  链接：<https://github.com/nearai/ironclaw/issues/4958> ｜ <https://github.com/nearai/ironclaw/issues/4959> ｜ <https://github.com/nearai/ironclaw/issues/4960>

- **Engine V2 使用统计堆栈**
  - #4985、#4989  
  如果 usage 统计不准，会直接影响管理面板和成本观测。  
  链接：<https://github.com/nearai/ironclaw/issues/4985> ｜ <https://github.com/nearai/ironclaw/pull/4989>

---

### 总体判断
IronClaw 今天呈现出典型的**高频修复 + 功能堆栈并行推进**状态：  
- **优点**：迭代活跃、问题定位明确、多个关键修复已有 PR 对应。  
- **风险**：用户反馈高度集中在审批、自动化和 WebUI 可见性，说明主流程仍存在“可用但不顺手”的体验债。  
- **建议关注**：优先合并/落地 **#5003、#4998、#4984、#4978** 这类直接影响主流程可靠性的修复。  

如果你愿意，我也可以把这份日报进一步整理成 **“管理层摘要版”** 或 **“工程团队跟进版（按优先级/负责人/模块拆分）”**。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-06-17）

## 1) 今日速览
LobsterAI 过去 24 小时整体呈现**低讨论、高提交收尾**的状态：Issues 侧完全静默（0 条更新），但 PR 侧有 2 个变更完成合并/关闭，说明项目维护节奏仍在持续推进。  
今天没有新版本发布，意味着本日更多是**功能打磨与体验优化**，而非对外的版本节点。  
从维护健康度看，项目当前处于**稳定推进**阶段：没有新增缺陷暴露，也没有社区高噪声问题，风险面较低。  
不过，社区互动数据偏弱（PR 无评论/无反应），显示当前活跃主要来自开发侧，而非用户侧反馈驱动。  

---

## 2) 版本发布
今日**无新版本发布**。  
- Releases：无  
- 版本链接：<https://github.com/netease-youdao/LobsterAI/releases>

---

## 3) 项目进展
今日共有 2 个 PR 关闭，均已完成合并或关闭，推进方向主要集中在**协作搜索能力**与**预览/浏览器体验**优化。

### PR #2170 - fix(cowork): search tasks from database
- 链接：<https://github.com/netease-youdao/LobsterAI/pull/2170>
- 关键推进：
  - 将 Cowork 任务搜索从“仅过滤搜索弹窗中预加载的最近会话”改为**直接查询 SQLite 数据库**。
  - 在没有搜索词时保持原有会话列表行为不变，避免影响首页侧边栏、agent 预览、分页和快捷任务槽位等既有逻辑。
- 价值判断：
  - 这是一个偏**功能修复/补齐**的 PR，解决的是“搜索范围不完整”的体验缺陷。
  - 对协作场景有直接收益，能提高任务检索准确性与可用性。

### PR #2169 - feat(artifacts): 优化预览卡片与浏览器预览体验
- 链接：<https://github.com/netease-youdao/LobsterAI/pull/2169>
- 关键推进：
  - 统一对话窗预览卡片样式、文件类型展示、暗色 hover 效果和多文件折叠展示。
  - 新增预览卡 hover 副标题，HTML 卡片增加“在有道龙虾浏览器中打开”的引导。
  - 优化 HTML 打开方式菜单、右侧浏览器预览标题/地址栏/外部浏览器打开按钮样式。
  - 调整同路径预览文件的去重与打开逻辑，并补充测试与 spec 文档。
- 价值判断：
  - 这是一个典型的**体验增强型功能 PR**，覆盖预览卡片、浏览器预览、打开方式、去重逻辑等多个细节。
  - 对 artifacts 场景的可读性与操作效率提升明显，属于产品化体验打磨。

### 项目整体前进幅度
今天的推进不是“新增大功能”，而是更偏向**基础能力补强 + 体验收敛**：
- 协作搜索从前端局部过滤升级为后端数据检索，提升准确性；
- artifacts/预览链路在交互和视觉一致性上完成一轮优化。  

综合来看，项目今日进展属于**中等强度的产品迭代**，对核心功能可用性有实质提升。

---

## 4) 社区热点
今日**没有明显社区热点**。  
原因是：
- Issues：0 条更新，未形成讨论聚焦；
- PR：2 条均无评论、无点赞反应，说明没有产生公开争议或集中反馈。

### 可观察的“潜在关注点”
尽管没有热议，今日两个 PR 暗示社区/用户最关心的仍是：
1. **任务/会话检索是否足够准确**  
   - PR #2170 表明用户对“搜索结果不能覆盖全部任务”的问题可能存在实际痛点。  
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2170>

2. **预览与打开方式是否足够顺手**  
   - PR #2169 反映出用户对 artifacts 预览卡片、浏览器预览、打开方式菜单的体验有持续优化需求。  
   - 链接：<https://github.com/netease-youdao/LobsterAI/pull/2169>

---

## 5) Bug 与稳定性
今日**未发现新增 Bug、崩溃或回归报告**。  
按严重程度排序，今日风险面如下：

1. **高严重度：无**
   - 今日无 Issues 报告。  
   - 相关链接：<https://github.com/netease-youdao/LobsterAI/issues>

2. **中严重度：无**
   - 未见影响主流程的稳定性问题暴露。

3. **低严重度：无**
   - 无已知新缺陷登记。

### 是否已有 fix PR
- 今日没有新增 bug issue，因此不存在“对应 fix PR”的待跟踪链路。
- 但与稳定性/正确性相关的改动已在 PR #2170 中体现，属于对搜索逻辑的修复和约束性优化。  
  链接：<https://github.com/netease-youdao/LobsterAI/pull/2170>

---

## 6) 功能请求与路线图信号
今日没有新增 Issues，因此**没有来自用户的新功能请求**可直接纳入分析。  
不过，从已合并/关闭的 PR 可以提炼出两条较明确的路线图信号：

### 信号 1：协作与任务检索能力仍是重点
- PR #2170 将搜索从前端缓存过滤升级为数据库检索，说明项目在强化**可发现性**与**协作任务管理**能力。
- 这类方向通常意味着后续可能继续补充：
  - 更完整的筛选条件
  - 更高效的任务搜索体验
  - 搜索结果与历史会话/任务的联动

链接：<https://github.com/netease-youdao/LobsterAI/pull/2170>

### 信号 2：artifact 预览与浏览器打开体验是持续优化区
- PR #2169 涉及预览卡片、HTML 打开方式、浏览器预览标题/地址栏、去重逻辑和测试文档。
- 这说明项目正在向更成熟的**文档/文件预览工作流**演进，后续大概率继续围绕：
  - 预览一致性
  - 打开方式管理
  - 多文件处理
  - 浏览器内查看体验

链接：<https://github.com/netease-youdao/LobsterAI/pull/2169>

---

## 7) 用户反馈摘要
今日没有 Issues 评论，因此**无法从用户评论中提炼新的真实反馈样本**。  
从 PR 变更内容可以间接推测用户关注点：

- **检索准确性需求强**
  - 用户不希望搜索只局限于“最近会话”，而是希望能覆盖数据库中的完整任务集合。
  - 场景多半是：用户回头找历史任务、协作任务、或跨会话内容时需要更可靠的搜索。

- **预览体验影响效率**
  - 用户在处理 artifacts 时，较关注卡片样式、文件类型识别、HTML 打开方式、右侧预览面板等细节。
  - 说明实际使用中，预览页是高频入口，视觉和操作路径的顺滑程度会直接影响满意度。

- **对一致性与细节很敏感**
  - PR #2169 对 hover 效果、标题、菜单排序、文件去重等做了多处微调，说明产品体验优化是刚需而非锦上添花。

链接：
- Issues：<https://github.com/netease-youdao/LobsterAI/issues>
- PR #2170：<https://github.com/netease-youdao/LobsterAI/pull/2170>
- PR #2169：<https://github.com/netease-youdao/LobsterAI/pull/2169>

---

## 8) 待处理积压
基于今日数据，**未识别到新的长期未响应重要 Issue 或 PR**。  
原因：
- 今日 Issues 为 0；
- 今日 PR 均已关闭，没有显示出明显积压。

### 维护提醒
- 当前更像是“低噪声、持续迭代”的健康状态，但由于 Issues 偏空，建议维护者后续关注：
  - 是否存在未被及时提报的使用问题；
  - 搜索与预览相关改动上线后是否出现回归反馈；
  - 社区互动是否持续低位，影响需求收集效率。

仓库入口：<https://github.com/netease-youdao/LobsterAI>

---

## 总体结论
LobsterAI 在 2026-06-17 的项目状态可以概括为：**社区讨论平稳、代码迭代持续、产品体验向前推进**。  
虽然没有发布新版本，也没有新增 Issues，但两项已完成 PR 分别强化了**任务搜索能力**与**预览交互体验**，说明项目仍在围绕真实使用场景做细节打磨。  
从健康度看，项目今日表现为**稳定、低风险、开发驱动型推进**。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

# TinyClaw 项目动态日报（2026-06-17）
项目仓库：<https://github.com/TinyAGI/tinyagi>

## 1) 今日速览
过去 24 小时，TinyClaw 的整体活跃度偏低，**Issues 没有新增或状态变化，PR 侧仅有 1 条未合并更新**。当前没有新版本发布，也没有社区讨论热度明显上升的迹象，说明项目处于**小幅维护、低噪声推进**阶段。  
从健康度看，仓库没有出现新增缺陷堆积，但也缺少版本节奏与问题反馈，整体更像是在等待关键修复落地。  
**今日最重要的进展**集中在 Windows CLI 兼容性修复 PR，若合并，将显著改善原生 Windows 用户的可用性。  
相关链接：<https://github.com/TinyAGI/tinyagi>

---

## 2) 版本发布
**今日无新版本发布。**  
- Releases：<https://github.com/TinyAGI/tinyagi/releases>

---

## 3) 项目进展
### 重要 PR
- **#281 [OPEN] fix: Windows cross-platform support in CLI**  
  作者：mperkins0155 | 创建/更新：2026-06-16  
  链接：<https://github.com/TinyAGI/tinyagi/pull/281>

**进展解读：**  
该 PR 聚焦于修复 `tinyagi` CLI 在**原生 Windows（非 WSL）环境**下的三个兼容性问题，涉及路径解析、模块加载和命令执行稳定性。若合并，项目将从“主要可用在类 Unix/WSL 环境”向“真正跨平台 CLI”迈进一步，这对扩大用户覆盖面和降低安装门槛很关键。  
从项目推进幅度看，今天属于**单点高价值修复推进**，不是功能扩张，但对实际可用性提升明显。  

---

## 4) 社区热点
**今日未发现明显的社区热点。**  
- Issues：<https://github.com/TinyAGI/tinyagi/issues>（过去 24 小时无更新）  
- PR #281：<https://github.com/TinyAGI/tinyagi/pull/281>（当前无评论、无点赞反馈）

**背后诉求分析：**  
唯一有动作的 PR 直接指向 Windows 支持，说明当前用户最实际的诉求并非新功能，而是**跨平台可运行性**。这通常意味着项目已具备一定功能基础，但在不同操作系统上的工程化体验仍需补齐。  

---

## 5) Bug 与稳定性
### 今日报告的 Bug / 稳定性问题
当前 **没有新增 Issues**，但从 PR #281 可看出存在一组已识别的 Windows-only 问题：

1. **Windows 路径解析导致 `MODULE_NOT_FOUND`**  
   - 严重程度：高  
   - 影响：原生 Windows 下 CLI 无法正常启动或定位模块  
   - fix 状态：**已有修复 PR**  
   - 链接：<https://github.com/TinyAGI/tinyagi/pull/281>

2. **跨平台命令执行/路径兼容问题**  
   - 严重程度：中高  
   - 影响：CLI 在 Windows 环境下行为不一致，影响基础使用  
   - fix 状态：**已有修复 PR**  
   - 链接：<https://github.com/TinyAGI/tinyagi/pull/281>

**稳定性判断：**  
今天没有新的崩溃/回归报告，说明公开反馈层面较平静；但 PR 内容暗示项目在 Windows 支持上仍存在工程风险，建议维护者优先验证该修复的回归覆盖。  

---

## 6) 功能请求与路线图信号
**今日没有新增功能请求 Issues。**  
不过，PR #281 本身释放出一个明确的路线图信号：  
- **下一阶段优先级很可能是“跨平台支持完善”**，尤其是 CLI 在 Windows 的稳定运行。  
- 这类修复虽不是“新功能”，但从用户增长角度看，往往是进入更广泛分发前的必要门槛。  

**可能纳入下一版本的方向：**
- 原生 Windows CLI 支持
- 路径与模块加载兼容性统一
- 更完善的跨平台测试

相关链接：<https://github.com/TinyAGI/tinyagi/pull/281>

---

## 7) 用户反馈摘要
**今日无 Issues 评论可提炼用户反馈。**  
- Issues 列表：<https://github.com/TinyAGI/tinyagi/issues>

**可观察到的真实痛点：**
- 对 Windows 原生环境的兼容需求真实存在；
- 用户更关注“能否跑起来、是否稳定”，而非复杂新特性；
- 反馈主要以修复型 PR 的形式出现，说明项目当前使用者中有一部分在实际部署/运行阶段遇到环境差异问题。  

---

## 8) 待处理积压
### 需要关注的待处理项
- **PR #281：fix: Windows cross-platform support in CLI**  
  当前状态：OPEN  
  链接：<https://github.com/TinyAGI/tinyagi/pull/281>

**积压风险判断：**
- 当前没有长期未响应的 Issues（Issues 为空）
- 但该 PR 是今天唯一的活跃项，且直接关系到核心 CLI 可用性，若长期悬而未决，会影响 Windows 用户体验和项目口碑。  
- 建议维护者尽快完成代码审查、补充测试并评估合并窗口。  

---

如需，我可以继续把这份日报整理成**更适合发送到飞书/企业微信/邮件的简报格式**，或者补充一版**带“风险等级”和“维护建议”的管理层摘要**。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

以下为 **2026-06-17 Moltis（moltis-org/moltis）项目动态日报**，基于你提供的 GitHub 数据整理。

---

## 1. 今日速览

今日 Moltis 的社区互动以 **Issues 为主、PR 与 Release 为零**，整体处于“需求收集 + 问题修复”的轻量活跃状态。  
过去 24 小时内共有 **3 条 Issue 更新**，其中 **2 条为新/活跃的功能请求，1 条为已关闭的 bug**，说明项目当前讨论焦点主要集中在产品可配置性和自托管稳定性。  
从反馈结构看，维护者对问题的响应并不滞后：核心 bug 在当天被关闭，体现出一定的维护敏捷性。  
不过，由于 **没有新的 PR 和版本发布**，项目推进更多体现在需求澄清与问题收敛，而非代码层面的里程碑式进展。  
**综合判断：项目活跃度中等偏低，但反馈链路健康，当前处于需求积累与稳定性修补阶段。**

---

## 2. 版本发布

**今日无新版本发布。**

- Releases：无  
- 影响：暂无新功能包、无破坏性变更公告、也无需迁移说明

链接：  
- [GitHub Releases](https://github.com/moltis-org/moltis/releases)

---

## 3. 项目进展

今日 **没有合并或关闭的 PR**，因此没有来自代码合入层面的直接进展可汇报。  
从项目推进角度看，当前的“进展”主要体现在 issue 层面对需求方向的明确：

- **可配置 TTS 输出格式**：用户希望增强输出控制能力
- **可配置 RPC 超时**：用户希望提升长耗时/不稳定环境下的可用性
- **自托管 whisper.cpp 转录错误**：一个核心流程 bug 已被关闭，说明维护者已介入处理

总体而言，项目今天没有通过 PR 推出新能力，但在 **需求收敛与稳定性修复** 上向前推进了一小步。  
**净推进评价：功能侧 0，稳定性侧 1 个 bug 关闭，整体属于“轻量前进”。**

链接：  
- [Pull Requests 列表](https://github.com/moltis-org/moltis/pulls)  
- [Issue #1128 - transcription errors with self-hosted whisper.cpp](https://github.com/moltis-org/moltis/issues/1128)

---

## 4. 社区热点

今日讨论最活跃的条目主要是以下两个功能请求与一个 bug：

### 1）[#1126 - allow to configure the format of tts output](https://github.com/moltis-org/moltis/issues/1126)
- 状态：OPEN
- 评论：2
- 反应：0
- 热点原因：用户希望自定义 TTS 输出格式，说明当前默认格式在某些工作流中不够灵活。
- 背后诉求：更好地适配不同下游场景，例如日志化、提示词拼接、结构化处理、播报终端兼容等。

### 2）[#1128 - transcription errors with self-hosted whisper.cpp](https://github.com/moltis-org/moltis/issues/1128)
- 状态：CLOSED
- 评论：1
- 反应：0
- 热点原因：涉及核心能力“转录”在自托管场景下出错，属于直接影响可用性的高关注问题。
- 背后诉求：用户在自托管部署中对稳定识别、兼容性和可重复性要求较高。

### 3）[#1127 - allow to configure rpc timeout](https://github.com/moltis-org/moltis/issues/1127)
- 状态：OPEN
- 评论：0
- 反应：0
- 热点原因：虽未产生评论，但与 #1126 一样属于“可配置性增强”诉求，和实际部署体验密切相关。
- 背后诉求：降低 RPC 调用在网络波动、后端负载高或远程服务响应慢时的失败率。

**分析：**  
今日热点并不来自大规模争论，而是集中在 **“默认行为是否足够灵活”** 和 **“自托管部署是否足够稳定”** 两个方向。说明 Moltis 的用户已经开始从“能用”转向“更可控、更适配复杂环境”。

---

## 5. Bug 与稳定性

按影响程度排序，今日与稳定性相关的问题如下：

### 1）[#1128 - transcription errors with self-hosted whisper.cpp](https://github.com/moltis-org/moltis/issues/1128)
- 类型：Bug
- 状态：CLOSED
- 严重程度：中高
- 原因：转录是 Moltis 的核心链路之一，且问题发生在 **self-hosted whisper.cpp** 场景，意味着影响的是实际部署和使用可靠性。
- 是否有 fix PR：**未见对应 PR**
- 备注：当天关闭，说明问题已被处理或被判定为非代码缺陷，但数据中没有可见 PR 作为修复证据。

### 2）[#1127 - allow to configure rpc timeout](https://github.com/moltis-org/moltis/issues/1127)
- 类型：稳定性/可用性改进请求
- 状态：OPEN
- 严重程度：中
- 原因：超时不可配置会在网络抖动、远程推理或慢速后端环境中放大失败风险。
- 是否有 fix PR：**未见**
- 备注：虽然不是 bug 报告，但其本质是降低不稳定调用带来的失败率。

### 3）[#1126 - allow to configure the format of tts output](https://github.com/moltis-org/moltis/issues/1126)
- 类型：功能增强，间接影响稳定使用
- 状态：OPEN
- 严重程度：低到中
- 原因：更多是可用性/集成性问题，未直接体现为故障。
- 是否有 fix PR：**未见**

**结论：**  
今日没有新的高危崩溃或大范围回归信号；唯一明确 bug 已关闭，短期稳定性表现尚可。

---

## 6. 功能请求与路线图信号

今日新增/活跃的功能请求非常清晰，且都具备较强的产品方向指示性：

### 1）[#1126 - 配置 TTS 输出格式](https://github.com/moltis-org/moltis/issues/1126)
- 价值判断：高
- 路线图信号：这类请求通常容易进入近期版本，因为它属于典型的“增强可配置性”需求，风险相对低、用户收益直观。
- 可能落地优先级：高于纯体验优化，接近中短期迭代项。

### 2）[#1127 - 配置 RPC timeout](https://github.com/moltis-org/moltis/issues/1127)
- 价值判断：高
- 路线图信号：对自托管、远程调用、弱网环境都很关键，属于平台级健壮性能力。
- 可能落地优先级：很可能进入下一批稳定性迭代或配置系统增强。

### 3）[#1128 - whisper.cpp transcription errors](https://github.com/moltis-org/moltis/issues/1128)
- 价值判断：高，但已关闭
- 路线图信号：虽然是 bug 而非新功能，但它提示维护者需要持续优化自托管语音识别链路。
- 若未来出现对应 PR 或复现案例，可能演化为针对 whisper.cpp 的兼容性/参数调优任务。

**结合当前 PR 现状判断：**  
由于今天没有任何 PR，无法确认这些需求已进入实现阶段；但从问题性质看，**#1127 和 #1126 都是高概率进入下一轮版本的候选项**，尤其适合做成配置项增强。

---

## 7. 用户反馈摘要

从 Issues 内容中，可以提炼出以下真实用户痛点与使用场景：

### 用户痛点
- **默认输出格式不够灵活**：用户希望 TTS 输出可按场景定制，而不是固定格式。
- **RPC 调用缺少超时控制**：用户在不稳定网络或慢后端环境中，需要更强的容错能力。
- **自托管 whisper.cpp 的转录可靠性需要保障**：用户在本地/私有化部署场景下，仍然追求稳定识别效果。

### 使用场景
- 将 Moltis 集成到 **更复杂的自动化链路** 中，需要输出格式可控
- 在 **远程服务或自托管环境** 下运行，对超时与稳定性比较敏感
- 在 **私有部署** 下使用 whisper.cpp 做转录，对兼容性和可预测性要求更高

### 满意/不满意点
- 满意：项目仍能及时响应问题，至少一个 bug 在当天关闭，说明维护链路存在。
- 不满意：关键行为依赖默认值，配置项不足；对部署环境差异的适配能力仍有提升空间。

链接：  
- [#1126 TTS output format](https://github.com/moltis-org/moltis/issues/1126)  
- [#1127 RPC timeout](https://github.com/moltis-org/moltis/issues/1127)  
- [#1128 whisper.cpp transcription errors](https://github.com/moltis-org/moltis/issues/1128)

---

## 8. 待处理积压

根据当前数据，**没有明显的长期未响应积压项**：

- #1126：当日活跃，属于新近功能请求
- #1127：当日创建/活跃，尚未形成积压
- #1128：已关闭，不属于积压

**提醒维护者关注的点：**
- [#1126](https://github.com/moltis-org/moltis/issues/1126)：TTS 输出格式可配置性，可能影响较多集成场景
- [#1127](https://github.com/moltis-org/moltis/issues/1127)：RPC timeout 配置，属于稳定性与可运维性基础能力

**结论：**  
当前未见“陈旧悬而未决”的高风险积压，但如果这两个 enhancement 在接下来数日内仍无响应，可能会逐渐演变为产品体验上的长期缺口。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发邮件/飞书的简报版**  
2. **适合管理层看的表格版**  
3. **适合自动化系统入库的 JSON/YAML 结构化版本**

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

以下为 **2026-06-17 CoPaw（仓库数据对应 agentscope-ai/QwenPaw）项目动态日报**。  
整体看，过去 24 小时内项目处于**高活跃、高修复密度**状态：Issues 更新 17 条、PR 更新 20 条，并发布了 1 个 beta 版本。新增需求和稳定性问题同时涌入，说明项目仍在快速演进，但也暴露出一定的**可靠性、兼容性与安全压力**。

---

## 1. 今日速览

过去 24 小时，项目的节奏非常快：**17 条 Issue 更新、20 条 PR 更新、1 个新版本发布**。  
从内容上看，讨论重点已经从“单纯功能扩展”转向**稳定性修复、上下文管理、Cron 调度、通道可靠性和安全隔离**。  
社区反馈集中在“生产可用性”：例如进程冻结、macOS 崩溃、定时任务误打断主对话、企业微信/钉钉通道行为异常等。  
与此同时，PR 侧已有多项修复落地，说明项目维护响应积极，但也反映出当前版本迭代处于**边修边扩**的阶段。  
相关链接： [Issues 更新](https://github.com/agentscope-ai/QwenPaw/issues) ｜ [PR 更新](https://github.com/agentscope-ai/QwenPaw/pulls)

---

## 2. 版本发布

### 新版本：v1.1.12-beta.1
发布页： [v1.1.12-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.12-beta.1)

**已披露的更新重点：**
- `fix(security)`: 为每次安装隔离 keychain master key，降低跨安装凭据串扰风险  
  链接： [#5028](https://github.com/agentscope-ai/QwenPaw/pull/5028)
- `fix(desktop)`: 强化 Tauri Windows CI，对 crates.io 拉取失败更稳健  
  链接： [#5125](https://github.com/agentscope-ai/QwenPaw/pull/5125)
- release note 其余部分在当前数据中被截断，仅能确认还有继续中的重构内容。

**破坏性变更与迁移注意事项：**
- 目前可见 release 说明中**未明确标注 breaking change**。
- 但由于涉及 **keychain 隔离** 与 **桌面端依赖获取策略**，建议升级后重点验证：
  1. 旧安装与新安装之间的凭据/会话是否仍可互通；
  2. Windows 桌面端首次启动和依赖安装是否受网络/镜像影响；
  3. 与本地安全存储、登录状态、插件依赖相关的流程是否有回归。  
- 若部署环境存在多实例共机、镜像分发或受限网络，建议先做灰度验证。

---

## 3. 项目进展

今天已关闭/合并的 PR 共 **11 个**，重点推进了以下方向：

### 3.1 稳定性与兼容性修复
- **Cron 任务不再轻易污染主聊天流**：为 agent job 增加 `silent` 选项，避免调度任务把流式输出注入当前对话  
  PR： [#5251](https://github.com/agentscope-ai/QwenPaw/pull/5251)  
  关联问题： [#5250](https://github.com/agentscope-ai/QwenPaw/issues/5250)
- **修复空响应兜底提示**，减少“模型没输出”时的空白体验  
  PR： [#5232](https://github.com/agentscope-ai/QwenPaw/pull/5232)
- **修复 Gemini 工具调用 schema 兼容性**，避免 `400 INVALID_ARGUMENT`  
  PR： [#5226](https://github.com/agentscope-ai/QwenPaw/pull/5226)
- **修复无参数工具调用的 JSON 修复警告**，降低噪音日志  
  PR： [#5220](https://github.com/agentscope-ai/QwenPaw/pull/5220)
- **DingTalk 通道在系统睡眠后恢复连接**：加入 liveness watchdog，提升长连接稳定性  
  PR： [#5224](https://github.com/agentscope-ai/QwenPaw/pull/5224)

### 3.2 配置与模型适配
- **标题生成与技能优化走统一 formatter**，提升对不同模型供应商的兼容性  
  PR： [#5228](https://github.com/agentscope-ai/QwenPaw/pull/5228)
- **修复 agent config 的深拷贝问题**，避免不同实例间共享可变状态  
  PR： [#5229](https://github.com/agentscope-ai/QwenPaw/pull/5229)
- **移除配置缓存中的不必要深拷贝**，优化性能与内存占用  
  PR： [#5240](https://github.com/agentscope-ai/QwenPaw/pull/5240)

### 3.3 前端与交互体验
- **Console 支持可点击链接**，提升终端可用性  
  PR： [#5248](https://github.com/agentscope-ai/QwenPaw/pull/5248)
- **全视图代码高亮**，提升代码/JSON/Markdown 可读性  
  PR： [#5219](https://github.com/agentscope-ai/QwenPaw/pull/5219)
- **简化 Console 简单模式导航**，并按更新时间排序会话  
  PR： [#5222](https://github.com/agentscope-ai/QwenPaw/pull/5222)

### 3.4 总体推进幅度
今天的合并/关闭 PR 体现出项目正在同时推进：
- **稳定性补洞**
- **模型/provider 兼容性**
- **终端与界面易用性**
- **调度任务行为控制**

这意味着项目不是单纯“堆功能”，而是在往**更接近可部署、可维护、可扩展**的方向前进。  
相关链接： [已关闭 PR 列表](https://github.com/agentscope-ai/QwenPaw/pulls?q=is%3Apr+is%3Aclosed+updated%3A2026-06-16..2026-06-17)

---

## 4. 社区热点

### 4.1 最活跃 Issue：子 Agent 触发上下文压缩导致进程冻结
- Issue： [#5218](https://github.com/agentscope-ai/QwenPaw/issues/5218)
- 评论数：14
- 现象：子 Agent 触发上下文压缩后，QwenPaw 进程冻结、无响应，需手动重启。

**背后诉求：**
- 用户希望上下文压缩机制在复杂多 Agent 场景下仍可稳定运行；
- 这是典型的“生产中断型”问题，说明大家已经把项目用于高频、多轮、长上下文工作流。

### 4.2 企业微信图文混发能力诉求
- Issue： [#5217](https://github.com/agentscope-ai/QwenPaw/issues/5217)
- 评论数：3
- 诉求：企业微信频道希望支持“文本 + 图片”组合消息，而不是逐条拆开发送。

**背后诉求：**
- 用户更关心“业务消息表达完整性”和“消息编排效率”；
- 这类需求通常来自真实集成场景，不是纯 UI 偏好。

### 4.3 Cron 行为相关讨论持续升温
- Issue： [#5235](https://github.com/agentscope-ai/QwenPaw/issues/5235)（定时任务未按时执行）
- Issue： [#5250](https://github.com/agentscope-ai/QwenPaw/issues/5250)（定时任务打断主对话）
- 相关修复 PR： [#5241](https://github.com/agentscope-ai/QwenPaw/pull/5241)、[#5251](https://github.com/agentscope-ai/QwenPaw/pull/5251)

**背后诉求：**
- 用户正在把 Cron 用到更真实的自动化任务中；
- 他们要求调度系统不仅“能跑”，还要“别打扰主聊天流程、别漏执行”。

### 4.4 通道与安装路径差异引发关注
- Issue： [#5237](https://github.com/agentscope-ai/QwenPaw/issues/5237)
- 现象：uv 安装的 QwenPaw 下钉钉频道不生效，但安装包版本正常。

**背后诉求：**
- 用户已进入“不同安装方式一致性”阶段；
- 这通常是项目从实验走向部署后才会明显出现的问题。

---

## 5. Bug 与稳定性

以下按严重程度排序，并标注是否已有修复 PR：

### 5.1 高危安全问题：Prompt Injection 链导致 RCE / 隧道逃逸
- Issue： [#5234](https://github.com/agentscope-ai/QwenPaw/issues/5234)
- 严重性：**Critical**
- 描述：通过构造对话诱导 Agent 安装探针，形成远程代码执行和持久化 shell 访问链路。
- 状态：**当前未看到对应 fix PR**

**判断：**
- 这是优先级最高的风险项，属于“安全边界被业务能力打穿”的典型案例。
- 若该问题属实，应立即进入安全评估与响应流程。

### 5.2 macOS 上 ChromaDB Rust 绑定 SIGSEGV 崩溃
- Issue： [#5243](https://github.com/agentscope-ai/QwenPaw/issues/5243)
- 严重性：**High**
- 现象：频繁 SIGSEGV，堆栈落在 `chromadb_rust_bindings.abi3.so`
- 修复 PR： [#5246](https://github.com/agentscope-ai/QwenPaw/pull/5246)（已提交，待处理）

### 5.3 子 Agent 触发上下文压缩导致冻结
- Issue： [#5218](https://github.com/agentscope-ai/QwenPaw/issues/5218)
- 严重性：**High**
- 现象：进程冻结、无响应，重启后恢复
- 修复 PR： [#5242](https://github.com/agentscope-ai/QwenPaw/pull/5242)（已提交，待处理）

### 5.4 Cron 任务未按预期时间执行
- Issue： [#5235](https://github.com/agentscope-ai/QwenPaw/issues/5235)
- 严重性：**Medium**
- 现象：任务长期停留 pending，`last_run_at: null`
- 修复 PR： [#5241](https://github.com/agentscope-ai/QwenPaw/pull/5241)（已提交，待处理）

### 5.5 Cron 任务打断主对话
- Issue： [#5250](https://github.com/agentscope-ai/QwenPaw/issues/5250)
- 严重性：**Medium**
- 现象：定时任务以用户消息形式注入聊天流，干扰主任务
- 修复 PR： [#5251](https://github.com/agentscope-ai/QwenPaw/pull/5251)（已提交，待处理）

### 5.6 频道/安装兼容性问题
- Issue： [#5237](https://github.com/agentscope-ai/QwenPaw/issues/5237)
- 严重性：**Medium**
- 现象：uv 安装后钉钉频道不可用
- 修复 PR：暂无

### 5.7 自定义频道监听在保存后失活
- Issue： [#5253](https://github.com/agentscope-ai/QwenPaw/issues/5253)
- 严重性：**Medium**
- 现象：任何保存动作后监听宕掉，需重新保存才恢复
- 修复 PR：暂无

### 5.8 其他稳定性/体验问题
- Issue： [#5239](https://github.com/agentscope-ai/QwenPaw/issues/5239) —— token 统计单位显示错误（1GB 显示为 1B）
- Issue： [#5233](https://github.com/agentscope-ai/QwenPaw/issues/5233) —— Ollama 模型选项缺失（已关闭）
- 状态：前者暂无修复 PR；后者已关闭

---

## 6. 功能请求与路线图信号

今天新增/活跃的需求，显示用户对以下方向的关注明显上升：

### 6.1 通道能力增强
- 企业微信支持图文混发  
  Issue： [#5217](https://github.com/agentscope-ai/QwenPaw/issues/5217)
- 这类需求大概率会继续推动通道层的消息编排能力升级。

### 6.2 工作区与文件管理规范化
- 可配置的额外 trusted workspace  
  Issue： [#5252](https://github.com/agentscope-ai/QwenPaw/issues/5252)
- 定义用户生成文件的工作区目录结构  
  Issue： [#5230](https://github.com/agentscope-ai/QwenPaw/issues/5230)
- 优化工作区临时文件存储位置  
  Issue： [#5225](https://github.com/agentscope-ai/QwenPaw/issues/5225)

**判断：**
- 这些需求都指向同一个路线图信号：**项目正在向更强的交付/协作场景演进**；
- 后续版本很可能会更重视“工作区安全边界 + 文件生命周期管理”。

### 6.3 上下文与记忆管理
- MCP 工具名称显示优化、文件卡片默认展开  
  Issue： [#5231](https://github.com/agentscope-ai/QwenPaw/issues/5231)
- HeadroomContextManager 作为可选上下文压缩后端  
  PR： [#5244](https://github.com/agentscope-ai/QwenPaw/pull/5244)
- 结合 #5218 的冻结问题，说明“上下文管理”已经是核心演进主题之一。

### 6.4 插件/扩展能力
- AgentScope middleware 注册机制  
  PR： [#5221](https://github.com/agentscope-ai/QwenPaw/pull/5221)
- Chrome Extension takeover/browser_use 模式  
  PR： [#5227](https://github.com/agentscope-ai/QwenPaw/pull/5227)（标记 DO NOT MERGE）

**判断：**
- 插件化、浏览器控制、上下文管理都在说明项目有向“平台化智能体框架”靠拢的趋势；
- 但短期内更可能先吸收**稳定性修复**，再放大高风险新能力。

### 6.5 最可能进入下一版本的方向
结合今日 PR 与 Issue 的密度，下一版更可能优先纳入：
1. Cron 静默执行 / 不打断主对话： [#5251](https://github.com/agentscope-ai/QwenPaw/pull/5251)
2. 上下文压缩冻结修复： [#5242](https://github.com/agentscope-ai/QwenPaw/pull/5242)
3. macOS ChromaDB 崩溃修复： [#5246](https://github.com/agentscope-ai/QwenPaw/pull/5246)
4. 通道/安装兼容性修复： [#5238](https://github.com/agentscope-ai/QwenPaw/pull/5238)、[#5237](https://github.com/agentscope-ai/QwenPaw/issues/5237)

---

## 7. 用户反馈摘要

从评论与问题描述中，可以提炼出几个非常真实的用户痛点：

### 7.1 用户已经在“真工作流”里使用项目
- 不是简单体验，而是在多轮对话、Cron 自动化、企业微信/钉钉消息、Mac 本地记忆管理中遇到问题。  
- 这说明项目的使用场景已进入**实际部署/协作/自动化**阶段。  
  相关链接： [#5218](https://github.com/agentscope-ai/QwenPaw/issues/5218) ｜ [#5235](https://github.com/agentscope-ai/QwenPaw/issues/5235)

### 7.2 用户最不能接受的是“卡死、崩溃、打断”
- 进程冻结、SIGSEGV、Cron 打断主对话，都是高打扰度问题；
- 用户对“能否恢复工作”比“是否有新功能”更敏感。  
  相关链接： [#5218](https://github.com/agentscope-ai/QwenPaw/issues/5218) ｜ [#5243](https://github.com/agentscope-ai/QwenPaw/issues/5243) ｜ [#5250](https://github.com/agentscope-ai/QwenPaw/issues/5250)

### 7.3 企业集成用户很重视消息表达完整性
- 企业微信图文混发、钉钉频道可用性、通道监听稳定性，反映出用户在意“消息是否正确送达、是否可读、是否符合业务表达方式”。  
  相关链接： [#5217](https://github.com/agentscope-ai/QwenPaw/issues/5217) ｜ [#5237](https://github.com/agentscope-ai/QwenPaw/issues/5237) ｜ [#5253](https://github.com/agentscope-ai/QwenPaw/issues/5253)

### 7.4 安全边界意识明显增强
- 用户已经开始报告 prompt injection、RCE、隧道逃逸级别的问题，说明大家把它当成真实 agent 平台来评估安全性。  
  相关链接： [#5234](https://github.com/agentscope-ai/QwenPaw/issues/5234)

### 7.5 社区协作积极
- 多个修复 PR 来自 first-time contributor，说明项目仍有较好的社区吸纳能力。  
  相关链接： [#5242](https://github.com/agentscope-ai/QwenPaw/pull/5242) ｜ [#5246](https://github.com/agentscope-ai/QwenPaw/pull/5246) ｜ [#5251](https://github.com/agentscope-ai/QwenPaw/pull/5251)

---

## 8. 待处理积压

说明：由于当前只有 24 小时窗口数据，以下列为**当前最值得优先清理的 open 项**，不强行判断为“长期”，但它们确实值得维护者优先关注。

### 8.1 高优先级 Issue
- **Critical 安全风险**： [#5234](https://github.com/agentscope-ai/QwenPaw/issues/5234)
- **进程冻结**： [#5218](https://github.com/agentscope-ai/QwenPaw/issues/5218)（已有 PR：[#5242](https://github.com/agentscope-ai/QwenPaw/pull/5242)）
- **macOS 崩溃**： [#5243](https://github.com/agentscope-ai/QwenPaw/issues/5243)（已有 PR：[#5246](https://github.com/agentscope-ai/QwenPaw/pull/5246)）
- **Cron 未按时执行**： [#5235](https://github.com/agentscope-ai/QwenPaw/issues/5235)（已有 PR：[#5241](https://github.com/agentscope-ai/QwenPaw/pull/5241)）
- **Cron 打断主对话**： [#5250](https://github.com/agentscope-ai/QwenPaw/issues/5250)（已有 PR：[#5251](https://github.com/agentscope-ai/QwenPaw/pull/5251)）

### 8.2 中优先级功能/兼容性积压
- 企业微信图文混发： [#5217](https://github.com/agentscope-ai/QwenPaw/issues/5217)
- custom_channel 保存后监听失活： [#5253](https://github.com/agentscope-ai/QwenPaw/issues/5253)
- uv 安装版钉钉通道失效： [#5237](https://github.com/agentscope-ai/QwenPaw/issues/5237)
- 工作区临时文件位置优化： [#5225](https://github.com/agentscope-ai/QwenPaw/issues/5225)
- 额外 trusted workspace： [#5252](https://github.com/agentscope-ai/QwenPaw/issues/5252)

### 8.3 待审阅 PR
当前仍有多条 open PR，建议尽快排队 review，避免修复链条滞后：
- [#5246](https://github.com/agentscope-ai/QwenPaw/pull/5246)
- [#5244](https://github.com/agentscope-ai/QwenPaw/pull/5244)
- [#5242](https://github.com/agentscope-ai/QwenPaw/pull/5242)
- [#5241](https://github.com/agentscope-ai/QwenPaw/pull/5241)
- [#5238](https://github.com/agentscope-ai/QwenPaw/pull/5238)
- [#5221](https://github.com/agentscope-ai/QwenPaw/pull/5221)
- [#5227](https://github.com/agentscope-ai/QwenPaw/pull/5227)
- [#5251](https://github.com/agentscope-ai/QwenPaw/pull/5251)

---

### 总体判断
**项目健康度：中上，但稳定性与安全债务仍然明显。**  
一方面，PR 合并与新版本发布说明团队响应快、迭代活跃；另一方面，今日问题集中在**崩溃、冻结、调度误行为和安全边界**，意味着项目已经进入“可用性压力测试”阶段。  
如果后续能优先吸收上述高优先级修复，项目的生产可用性会明显提升。

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合公众号/周报发布的精简版**，或  
2. **面向维护者的行动清单版**。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报（2026-06-17）

> 仓库：**[qhkm/zeptoclaw](https://github.com/qhkm/zeptoclaw)**  
> 今日整体判断：**低活跃、维护型更新为主，当前项目运行稳定，没有新增问题暴露。**

---

## 1) 今日速览
过去 24 小时内，ZeptoClaw 没有新的 Issues，也没有新的版本发布，说明项目在用户侧没有出现明显的新故障或集中反馈。  
今日唯一可见的活跃项是一个 Dependabot 提交的依赖更新 PR，属于典型的例行维护动作，而非功能推进。  
从数据看，项目当前更像处于“稳定巡航”状态：**外部需求和缺陷输入都较少，维护负担轻，健康度偏稳**。  
但由于没有合并任何 PR，今天的代码层面进展有限，项目推进主要停留在潜在维护层面。  
相关链接：**[项目主页](https://github.com/qhkm/zeptoclaw)**

---

## 2) 版本发布
今日**没有新版本发布**，因此无新增功能、破坏性变更或迁移事项可报告。  
这意味着当前用户使用的主线版本仍在沿用，未进入新 release 节奏。  
相关链接：**[Releases 页面](https://github.com/qhkm/zeptoclaw/releases)**

---

## 3) 项目进展
今日**没有已合并或已关闭的重要 PR**，因此没有实际落地的新功能、修复或架构调整。  
目前唯一的 PR 是：

- **[#630](https://github.com/qhkm/zeptoclaw/pull/630)** — `[OPEN] [dependencies, docker] chore(deps): bump debian from \`b6e2a15\` to \`4e401d9\``  
  作者：dependabot[bot]  
  这是一项 Docker 基础镜像/依赖例行升级，通常用于跟进安全性与镜像新鲜度。  
  但由于尚未合并，**尚未对项目产生实际推进效果**。

整体来看，今天项目向前迈进的幅度较小，更多体现为维护信号而不是产品演进。  
相关链接：**[PR #630](https://github.com/qhkm/zeptoclaw/pull/630)**

---

## 4) 社区热点
今天没有活跃的 Issues，且唯一 PR **#630** 也没有评论、反应或讨论记录，因此**不存在明显的社区热点**。  
这通常表示两种情况之一：要么项目当前较稳定，用户无集中反馈；要么活跃讨论主要不在 GitHub Issues/PR 中体现。  
从维护视角看，当前社区诉求主要还没形成“问题驱动”或“需求驱动”的热点。  
相关链接：**[Issues 列表](https://github.com/qhkm/zeptoclaw/issues)**、**[PR #630](https://github.com/qhkm/zeptoclaw/pull/630)**

---

## 5) Bug 与稳定性
今日没有新增 Issues，也没有关闭 Issues，说明**未观察到新的 Bug、崩溃或回归报告**。  
按严重程度排序，当前可见的稳定性问题为：

1. **无已报告 Bug**
2. **无崩溃/回归记录**
3. **无可见 fix PR 待跟进**

在现有数据下，项目稳定性表现良好，但也要注意：**“没有问题”不等于“没有风险”**，更多可能是当前反馈量低。  
相关链接：**[Issues 列表](https://github.com/qhkm/zeptoclaw/issues)**

---

## 6) 功能请求与路线图信号
今日未出现新的功能请求类 Issues，因此**没有明确的用户需求信号**可纳入路线图分析。  
唯一可见的 PR #630 是依赖/镜像更新，不属于功能规划。  
因此从今天的数据看，下一版本更可能优先处理：
- 基础维护类改动
- 依赖更新
- 安全/镜像同步

暂时看不到明确的新功能方向。  
相关链接：**[Issues 列表](https://github.com/qhkm/zeptoclaw/issues)**、**[PR #630](https://github.com/qhkm/zeptoclaw/pull/630)**

---

## 7) 用户反馈摘要
今天没有 Issues 评论，也没有 PR 讨论，因此**无法从社区反馈中提炼出真实用户痛点、使用场景或满意/不满意点**。  
这说明当前用户反馈输入不足，尚不能形成基于 GitHub 的定性判断。  
如果后续出现与安装、Docker 镜像、兼容性或运行时行为相关的评论，通常会更容易暴露真实使用场景。  
相关链接：**[Issues 列表](https://github.com/qhkm/zeptoclaw/issues)**

---

## 8) 待处理积压
基于当前数据，**没有可识别的长期未响应重要 Issue 或 PR 积压**。  
唯一开放的 PR #630 刚于 2026-06-16 创建，时间较新，尚不构成积压问题。  
从维护优先级看，当前建议关注：
- 是否尽快处理 PR #630 的依赖升级
- 后续是否出现新的 Docker/兼容性反馈
- 是否需要通过发布节奏把维护更新落地

相关链接：**[开放 PR 列表](https://github.com/qhkm/zeptoclaw/pulls)**、**[PR #630](https://github.com/qhkm/zeptoclaw/pull/630)**

---

## 综合结论
ZeptoClaw 在 2026-06-17 的 GitHub 动态表现为**低噪声、低变动、稳定维护**：  
没有新 Issues、没有新版本、没有讨论热点，唯一动静来自一个依赖升级 PR。  
从项目健康度看，这是一个**较平稳的状态**；从项目推进角度看，则说明当前更多精力集中在基础维护，产品层面的增量暂时不明显。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-06-17）

## 1) 今日速览
过去 24 小时，ZeroClaw 维持了**高强度迭代**：Issues 更新 22 条、PR 更新 37 条，但**没有新版本发布**，说明团队主要精力仍放在功能补齐、回归修复和基础能力打磨上，而不是切版本。  
从议题分布看，今日焦点集中在**运行时正确性、渠道稳定性、ZeroCode/TUI 可用性、配置可见性**这几条主线上。  
整体来看，项目处于**活跃推进但稳定性压力较高**的阶段：一边在补新功能，一边在收敛高优先级缺陷与回归。  
公开可见的合并/关闭项显示，项目已有实质向前推进，但仍有不少高风险问题待处理，短期内健康度取决于这些核心缺陷的消化速度。  
仓库链接：<https://github.com/zeroclaw-labs/zeroclaw>

---

## 2) 版本发布
**今日无新 Release。**  
最新 Releases：无

---

## 3) 项目进展
今天可见的已关闭/合并 PR，主要推动了三类工作：

### 运行时与稳定性修复
- [PR #7792: fix(runtime): resolve runtime profiles for direct turns](https://github.com/zeroclaw-labs/zeroclaw/pull/7792)  
  让 direct turns 在进入工具循环前正确解析 runtime profile，直接对应并修复了相关问题链路，属于**关键稳定性修复**。
- [PR #7784: fix(discord): persist slash reconcile state + read shared stores from data_dir](https://github.com/zeroclaw-labs/zeroclaw/pull/7784)  
  修复 Discord 渠道的状态持久化与共享存储读取问题，提升重启后的可靠性。
- [PR #7786: perf(skills): cache skill-directory loads](https://github.com/zeroclaw-labs/zeroclaw/pull/7786)  
  通过缓存技能目录加载结果减少重复扫描与审计开销，改善高频路径性能。

### 文档与工程流程
- [PR #7788: docs(contributing): add first-party extension architecture guide](https://github.com/zeroclaw-labs/zeroclaw/pull/7788)  
  补充扩展架构指南，降低新贡献者理解门槛。
- [PR #7783: docs(ci): reflect merge queue disabled on master](https://github.com/zeroclaw-labs/zeroclaw/pull/7783)  
  同步主分支流程变更，减少文档与实际操作不一致。

### CI / 维护性收口
- [PR #7812: fix(ci): narrow Kilo provider path label](https://github.com/zeroclaw-labs/zeroclaw/pull/7812)  
  收紧 label 规则，减少误标与流水线噪音。

### 进展判断
- 按平台统计，过去 24 小时共有 **11 条 PR 进入合并/关闭状态**；从可见列表看，至少有 **6 个 PR 明确关闭**。
- 这说明维护节奏并不慢，且工作重点非常明确：**先修运行时正确性，再补文档和运维体验**。
- 但与此同时，待处理 PR 仍有 **26 条**，说明主线仍在持续吞吐，尚未进入收尾期。

---

## 4) 社区热点
今日讨论热度主要集中在以下 Issues 上：

### 1. [#7759: Decouple gateway WebSocket lifetime from agent turn lifecycle](https://github.com/zeroclaw-labs/zeroclaw/issues/7759)
- 评论：2
- 诉求核心：**WebSocket 断开不应取消正在执行的 agent turn**，而应支持后台执行与重连恢复。
- 背后需求：面向真实网络环境的**会话韧性**，尤其是 Web 端聊天场景下，用户希望“断线不丢任务”。

### 2. [#7758: Documentation is crap / quickstart doc issue](https://github.com/zeroclaw-labs/zeroclaw/issues/7758)
- 评论：2
- 诉求核心：文档不可读、配置语法不清晰，导致 quickstart 直接卡死。
- 背后需求：用户不是要“更多功能”，而是要**能被正确使用的功能**；文档可用性已成为工作流阻塞点。

### 3. [#7762: Cron documentation missing and need to run cronjobs with a specific model](https://github.com/zeroclaw-labs/zeroclaw/issues/7762)
- 评论：1
- 诉求核心：补齐 cron 文档，并支持指定模型运行。
- 背后需求：成本敏感型自动化任务需要**按任务级别选择合适模型**，体现出用户对运营成本和能力分层的关注。

### 4. [#7787: Prebuilt v0.8.0 binaries ship without Slack/Discord channel features](https://github.com/zeroclaw-labs/zeroclaw/issues/7787)
- 评论：1
- 诉求核心：官方预编译包回归，Slack/Discord 渠道功能缺失。
- 背后需求：用户对**发行版一致性**非常敏感，尤其是生产可用功能不能在预构建包里“消失”。

> 说明：PR 数据里未提供评论/反应数，因此本节以 Issues 的互动数据为主。今日社区讨论的明显特征是：**“能不能用、能不能稳、能不能看懂”**，而不是单纯追新功能。

---

## 5) Bug 与稳定性
以下按严重程度从高到低梳理今日主要 Bug 信号，并标注是否已有对应修复 PR：

### S1 / workflow blocked
1. [#7804: Code history can send non-alternating Anthropic messages](https://github.com/zeroclaw-labs/zeroclaw/issues/7804)  
   - 影响：Anthropic provider 调用可能因消息角色不交替而报 400，属于**会话阻断型**问题。  
   - 修复情况：**今日未看到直接对应 fix PR**。

2. [#7787: Prebuilt v0.8.0 binaries ship without Slack/Discord channel features](https://github.com/zeroclaw-labs/zeroclaw/issues/7787)  
   - 影响：官方预编译包回归，渠道能力缺失，直接影响可用性。  
   - 修复情况：**今日未看到直接对应 fix PR**。

### S2 / degraded behavior，且风险较高
3. [#7799: Resumed Code sessions reopen with a blank transcript](https://github.com/zeroclaw-labs/zeroclaw/issues/7799)  
   - 影响：会话恢复后 transcript 为空，严重影响“续接”体验。  
   - 修复情况：未见直接 fix PR。

4. [#7809: Channel turns ignore runtime-profile strict/parallel tool flags](https://github.com/zeroclaw-labs/zeroclaw/issues/7809)  
   - 影响：渠道 turn 可能无视 runtime-profile 中的工具执行约束，存在一致性与安全性风险。  
   - 修复情况：未见直接 fix PR。

5. [#7810: git_operations gives no recovery hint outside a repository](https://github.com/zeroclaw-labs/zeroclaw/issues/7810)  
   - 影响：错误信息过于“冷”，缺少恢复路径提示，不利于 CLI 用户自救。  
   - 修复情况：未见直接 fix PR。

6. [#7808: CLI secret prompts give no feedback after paste](https://github.com/zeroclaw-labs/zeroclaw/issues/7808)  
   - 影响：密钥输入后没有反馈，降低 onboarding 与配置体验。  
   - 修复情况：未见直接 fix PR。

7. [#7807: Approval overlay can inherit terminal background instead of ZeroCode theme](https://github.com/zeroclaw-labs/zeroclaw/issues/7807)  
   - 影响：审批弹窗主题错乱，属于 UI 可见性问题。  
   - 修复情况：未见直接 fix PR。

8. [#7803: Active Code sessions cannot switch agents directly](https://github.com/zeroclaw-labs/zeroclaw/issues/7803)  
   - 影响：会话中切换 agent 路径不顺畅，降低多 agent 工作流效率。  
   - 修复情况：未见直接 fix PR。

9. [#7800: Code help/keybindings are misleading or unreachable, especially on macOS](https://github.com/zeroclaw-labs/zeroclaw/issues/7800)  
   - 影响：帮助与快捷键提示不准，尤其 macOS 下可发现性差。  
   - 修复情况：未见直接 fix PR。

10. [#7795: static_voice_peers caches config-derived voice peers on the channel handle](https://github.com/zeroclaw-labs/zeroclaw/issues/7795)  
    - 影响：存在潜在 SSOT 违背，配置变更后可能出现状态不一致。  
    - 修复情况：未见直接 fix PR。

11. [#7815: ZeroCode Config does not show which config source/state it is editing](https://github.com/zeroclaw-labs/zeroclaw/issues/7815)  
12. [#7814: ZeroCode config fields look editable before Enter activates editing](https://github.com/zeroclaw-labs/zeroclaw/issues/7814)  
    - 影响：配置编辑器的可理解性和交互提示不足。  
    - 修复情况：未见直接 fix PR。

### 已有修复/关闭
- [#7796: Direct agent turns ignore runtime-profile max_tool_iterations](https://github.com/zeroclaw-labs/zeroclaw/issues/7796)  
  对应修复 PR：[#7792](https://github.com/zeroclaw-labs/zeroclaw/pull/7792)（已关闭）  
  这是今日最明确的**稳定性收口案例**之一，说明团队对 runtime-profile 相关错误正在快速修正。

---

## 6) 功能请求与路线图信号
以下是今日最值得关注的功能方向，很多都带有明显的路线图意味：

### 1. [#7816: Pluggable skill registries](https://github.com/zeroclaw-labs/zeroclaw/issues/7816)
- 方向：技能注册源可插拔，GitHub 仍是默认来源。
- 信号：这是**生态扩展能力**，如果落地，会显著增强第三方目录兼容性。

### 2. [#7759: Decouple gateway WebSocket lifetime from agent turn lifecycle](https://github.com/zeroclaw-labs/zeroclaw/issues/7759)
- 方向：提升 gateway/web 场景的会话恢复能力。
- 信号：面向生产可用性的关键增强，优先级很高。

### 3. [#7794: Per-agent opt-in Dream Mode + action-surface parity](https://github.com/zeroclaw-labs/zeroclaw/issues/7794)
- 方向：Dream Mode 按 agent 级别启用，并补齐 chat `/dream` 与 gateway/web Dreams 视图。
- 信号：说明 Dream Mode 正从“基础能力”走向“可操作、可监控”的完整功能链。

### 4. [#7776: Support free-form ask_user over the gateway WebSocket channel](https://github.com/zeroclaw-labs/zeroclaw/issues/7776)
- 方向：让 gateway web 端真正支持 ask_user。
- 信号：补齐交互闭环，属于**工具可用性增强**。

### 5. [#7762: Cron docs missing + specific model selection](https://github.com/zeroclaw-labs/zeroclaw/issues/7762)
- 方向：补文档，并支持 cron 使用指定模型。
- 信号：有望进入下一轮“可运营性”优化。

### 6. [#7790: Bring remaining web dashboard operator surfaces into zerocode](https://github.com/zeroclaw-labs/zeroclaw/issues/7790)
- 方向：把 Web dashboard 的运维能力迁移到 zerocode。
- 信号：清晰体现项目在做**TUI/终端优先的运维等价替代**。

### 已有 PR 表明可能进入下一版本的方向
- [PR #7797: feat(memory): per-agent opt-in dream mode](https://github.com/zeroclaw-labs/zeroclaw/pull/7797)
- [PR #7802: feat(zerocode): add doctor pane](https://github.com/zeroclaw-labs/zeroclaw/pull/7802)
- [PR #7791: feat(providers): re-add Manifest under schema v3 provider system](https://github.com/zeroclaw-labs/zeroclaw/pull/7791)
- [PR #7785: feat(config): find_all_references/plan_delete foundation](https://github.com/zeroclaw-labs/zeroclaw/pull/7785)
- [PR #7811: feat(channels/whatsapp): send Web media markers natively](https://github.com/zeroclaw-labs/zeroclaw/pull/7811)
- [PR #7813: feat(runtime): expose session key to shell tools](https://github.com/zeroclaw-labs/zeroclaw/pull/7813)

> 这些 PR 的共同特点是：都在补“平台级能力”，而不是单点小修。若主线继续保持节奏，它们很可能成为下一版本的主要内容。

---

## 7) 用户反馈摘要
从 Issues 里的描述，可以提炼出今天真实的用户痛点：

### 文档与可发现性不足
- [#7758](https://github.com/zeroclaw-labs/zeroclaw/issues/7758)、[#7762](https://github.com/zeroclaw-labs/zeroclaw/issues/7762)、[#7783](https://github.com/zeroclaw-labs/zeroclaw/issues/7783)  
  用户反复提到：**文档缺失、文档过时、配置语法不清楚**。  
  这说明新手问题不是“不会操作”，而是“没有可依赖的操作依据”。

### 状态可见性与交互反馈差
- [#7815](https://github.com/zeroclaw-labs/zeroclaw/issues/7815)、[#7814](https://github.com/zeroclaw-labs/zeroclaw/issues/7814)、[#7808](https://github.com/zeroclaw-labs/zeroclaw/issues/7808)  
  用户希望知道“我现在在改哪个配置源”“这个字段现在到底能不能编辑”“我粘贴的 secret 有没有被接收到”。  
  这类反馈说明 ZeroCode 在**交互提示层**仍有明显提升空间。

### 运行时可靠性与错误恢复
- [#7799](https://github.com/zeroclaw-labs/zeroclaw/issues/7799)、[#7810](https://github.com/zeroclaw-labs/zeroclaw/issues/7810)、[#7804](https://github.com/zeroclaw-labs/zeroclaw/issues/7804)  
  用户期待的是“失败后能继续”“错误时给出恢复办法”“长会话不要因为边界条件崩掉”。  
  这体现出项目已经进入**真实工作负载验证阶段**，而非仅仅能跑 demo。

### 渠道与多端一致性
- [#7787](https://github.com/zeroclaw-labs/zeroclaw/issues/7787)、[#7795](https://github.com/zeroclaw-labs/zeroclaw/issues/7795)、[#7809](https://github.com/zeroclaw-labs/zeroclaw/issues/7809)、[#7776](https://github.com/zeroclaw-labs/zeroclaw/issues/7776)  
  用户想要的是**渠道功能在不同入口保持一致**，并且配置变更能即时反映到执行逻辑中。  
  这里的核心不是“加功能”，而是“别回归、别失配”。

---

## 8) 待处理积压
> 由于今日窗口较短，严格意义上的“长期未响应”样本有限；下面列出的是**高优先级但当前仍未获得评论反馈**、最需要维护者尽快分派/回应的条目。

### 高优先级、0 评论的 Issue
- [#7816: Pluggable skill registries](https://github.com/zeroclaw-labs/zeroclaw/issues/7816)
- [#7815: ZeroCode config source visibility](https://github.com/zeroclaw-labs/zeroclaw/issues/7815)
- [#7814: config fields look editable before Enter](https://github.com/zeroclaw-labs/zeroclaw/issues/7814)
- [#7810: git_operations recovery hint](https://github.com/zeroclaw-labs/zeroclaw/issues/7810)
- [#7809: runtime-profile flags ignored in channel turns](https://github.com/zeroclaw-labs/zeroclaw/issues/7809)
- [#7803: active Code sessions cannot switch agents directly](https://github.com/zeroclaw-labs/zeroclaw/issues/7803)
- [#7799: resumed Code sessions reopen blank](https://github.com/zeroclaw-labs/zeroclaw/issues/7799)
- [#7795: static_voice_peers SSOT violation](https://github.com/zeroclaw-labs/zeroclaw/issues/7795)
- [#7794: per-agent Dream Mode parity](https://github.com/zeroclaw-labs/zeroclaw/issues/7794)
- [#7790: move web dashboard operator surfaces into zerocode](https://github.com/zeroclaw-labs/zeroclaw/issues/7790)
- [#7776: free-form ask_user over gateway WS](https://github.com/zeroclaw-labs/zeroclaw/issues/7776)
- [#7769: Matrix room-management APIs wiring](https://github.com/zeroclaw-labs/zeroclaw/issues/7769)

### 需要尽快 review 的高风险 PR
- [PR #7819](https://github.com/zeroclaw-labs/zeroclaw/pull/7819)
- [PR #7818](https://github.com/zeroclaw-labs/zeroclaw/pull/7818)
- [PR #7813](https://github.com/zeroclaw-labs/zeroclaw/pull/7813)
- [PR #7802](https://github.com/zeroclaw-labs/zeroclaw/pull/7802)
- [PR #7801](https://github.com/zeroclaw-labs/zeroclaw/pull/7801)
- [PR #7798](https://github.com/zeroclaw-labs/zeroclaw/pull/7798)
- [PR #7797](https://github.com/zeroclaw-labs/zeroclaw/pull/7797)
- [PR #7793](https://github.com/zeroclaw-labs/zeroclaw/pull/7793)
- [PR #7791](https://github.com/zeroclaw-labs/zeroclaw/pull/7791)
- [PR #7789](https://github.com/zeroclaw-labs/zeroclaw/pull/7789)
- [PR #7785](https://github.com/zeroclaw-labs/zeroclaw/pull/7785)
- [PR #7783](https://github.com/zeroclaw-labs/zeroclaw/pull/7783)

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发群的精简版**，或  
2. **适合管理层看的“风险/进展双表格版”**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*