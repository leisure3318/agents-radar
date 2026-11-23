# OpenClaw 生态日报 2026-11-23

> Issues: 41 | PRs: 63 | 覆盖项目: 13 个 | 生成时间: 2026-11-23 02:17 UTC

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
**日期：2026-11-23｜仓库：[openclaw/openclaw](https://github.com/openclaw/openclaw)**

> **数据口径**：依据提供的过去 24 小时快照。PR 仅展示 63 条中的 30 条，且评论数字段均为 `undefined`，无法据此进行讨论热度排名；`CLOSED` 不等于已合并。Release 正文截断、Issue 评论正文缺失，因此下文不将关闭状态视为修复已发布，也不将摘要推断写成用户评论原话。

## 1. 今日速览

过去 24 小时共更新 **41 条 Issue、63 条 PR，并发布 1 个版本**，项目开发与社区反馈活跃；其中 Issue 新开/活跃 36 条、关闭 5 条，PR 待合并 32 条、合并或关闭 31 条。新版本 **v2026.11.7** 明确强化 Gateway 重启后的对话恢复，反映项目继续优先处理长期运行智能体的工作连续性。[版本链接](https://github.com/openclaw/openclaw/releases/tag/v2026.11.7)

今日另一条主线是“让 OpenClaw 自己引导安装、解释产品并协助修复”的 **ClippyClaw / Focus Week 5** 提案，但多数仍处于产品或安全评审阶段。[#203737](https://github.com/openclaw/openclaw/issues/203737)

**健康度判断：活跃度高，稳定性压力仍较明显。** 工具执行中断、升级恢复和会话状态问题仍在暴露；较多 CI 适配与修复工作说明团队正在消化架构调整后的验证成本，不宜仅凭 PR 关闭数量判断质量已显著改善。[工具执行回归 #203869](https://github.com/openclaw/openclaw/issues/203869) · [CI 生命周期修复 #203839](https://github.com/openclaw/openclaw/pull/203839)

## 2. 版本发布

### v2026.11.7：明确强化中断后的工作恢复

- **已确认更新**：Gateway 重启后，恢复被中断的回复及子任务结果，避免丢失待处理工作。Release 将其列为核心亮点，并关联 #198905、#201544、#200924、#200967。对多智能体协作、后台任务和服务重启场景具有直接价值。[Release](https://github.com/openclaw/openclaw/releases/tag/v2026.11.7)
- **信息不完整**：第二项亮点仅保留 “Reliable automations: Let an…” 开头，无法确认具体自动化改进；提供的文本也未包含完整破坏性变更和迁移说明。**不能据此认定“无破坏性变更”或“无需迁移”。**[Release](https://github.com/openclaw/openclaw/releases/tag/v2026.11.7)
- **发布后收尾**：待合并 PR #203880 用于将已发布的 2026.11.7 变更日志、贡献记录和版本信息同步回 `main`，明确保持既有 tag、npm 包及 release 分支不变；这不是另一个新版本。[#203880](https://github.com/openclaw/openclaw/pull/203880)

**升级注意事项**：建议先核对完整发布说明，并在升级前备份配置与会话状态、保留 CLI 恢复入口。当前仍有 Control UI 更新中断后卡住、候选版本启动挂起后约 20 分钟才回滚的报告；快照没有证明它们已被 v2026.11.7 修复。[#203757](https://github.com/openclaw/openclaw/issues/203757) · [#203764](https://github.com/openclaw/openclaw/issues/203764)

## 3. 项目进展

以下为今日更新且**已关闭**的重要 PR；由于缺少 `merged` 字段，仅能确认流程状态。

| 方向 | 关闭 PR 及其目标 | 进展意义 |
|---|---|---|
| macOS 恢复 | [#203871](https://github.com/openclaw/openclaw/pull/203871)：向 `release/2026.11.6` 回移植五项关键修复，目标是替换损坏的下载资产，保留原 tag、npm 包及版本号 | 面向已有发布物的紧急恢复；是否完成资产替换仍需核验 |
| 升级恢复 | [#203608](https://github.com/openclaw/openclaw/pull/203608)：让处于“切换一半”状态的 Git 安装继续完成更新 | 针对特定历史更新路径的自恢复能力 |
| 权限生命周期 | [#203847](https://github.com/openclaw/openclaw/pull/203847)：将部分运行时和 HTTP 权限检查统一到请求开始时 | 减少请求接纳后因权限重读而中途失败，涉及兼容性与安全边界 |
| 回归验证 | [#203874](https://github.com/openclaw/openclaw/pull/203874)、[#203868](https://github.com/openclaw/openclaw/pull/203868)、[#203862](https://github.com/openclaw/openclaw/pull/203862)：调整 Slack 下载、cron 结果复制及配对/Stop 测试 | 让测试跟上新的请求准入语义，恢复验证可信度 |
| 诊断文档 | [#203867](https://github.com/openclaw/openclaw/pull/203867)：区分 stall profile 与 Node 24 interrupt snapshot | 避免运维人员误读性能诊断结果 |

**整体推进程度**：今日更像一次“发布、恢复与验证收敛”，而非大规模功能落地。会话恢复已进入正式发布，但首次使用、自修复和部署治理等方向仍主要位于提案或待合并阶段。[Release](https://github.com/openclaw/openclaw/releases/tag/v2026.11.7) · [#203881](https://github.com/openclaw/openclaw/pull/203881)

## 4. 社区热点

### 讨论量领先的 Issue

1. **浏览器 xAI 实时 Talk 反复截断、不继续回答：8 条评论。**  
   是提供列表中评论最多的 Issue。诉求不是语音入口是否存在，而是实时交互能否完成一次有实质内容的回复；持续截断会直接削弱语音助手的可用性。[#203876](https://github.com/openclaw/openclaw/issues/203876)

2. **ClippyClaw 自引导与自修复提案：3 条评论。**  
   涵盖对话式设置、智能体“出生”流程、产品自解释及 macOS 桌面伴侣。其关注点是降低首次使用门槛，但“自行修复产品”同时引入权限与安全边界问题。[#203737](https://github.com/openclaw/openclaw/issues/203737)

3. **大体量会话触发 Agent DB 准入关闭：3 条评论，已关闭。**  
   报告涉及约 70,920 个事件、261 MB 的保留会话，提示重度用户对压缩与长会话生命周期的要求已超出轻量聊天场景；关闭原因和修复版本未提供。[#203637](https://github.com/openclaw/openclaw/issues/203637)

4. **模型选择器隐藏不可用模型：3 条评论。**  
   用户希望不再看到最终返回 `model_not_found` 或本地未安装的模型，核心诉求是让可见选项与实际可执行能力保持一致。[#203793](https://github.com/openclaw/openclaw/issues/203793)

**热度限制**：所有展示条目的 👍 均为 0，不能认定存在高反应量话题；PR 评论数缺失，无法可靠比较 PR 讨论热度。

## 5. Bug 与稳定性

按快照中的优先级及影响排序；“未见 fix PR”仅指本次提供的数据。

| 严重程度 | 问题与影响 | 状态 / fix PR |
|---|---|---|
| **P0 · 工具执行阻断** | macOS 报 `gRPC code-mode session closed`、`BrokenPipe`，工具无法执行，标为回归及发布阻断。[#203869](https://github.com/openclaw/openclaw/issues/203869) | OPEN；待补信息、维护者审查；未见 fix PR |
| **P0 · 更新卡死** | Control UI 更新过程中 Gateway 被终止后持续显示 “Updating…”，需 CLI 介入。[#203757](https://github.com/openclaw/openclaw/issues/203757) | OPEN；未见 fix PR |
| **P1 · 长时间不可用** | 新候选版本监听前挂起，约 20 分钟后才回滚。[#203764](https://github.com/openclaw/openclaw/issues/203764) | OPEN；已有复现，待产品/维护者决策；未见 fix PR |
| **P1 · 会话/消息风险** | Agent DB 在压缩或正常回合中出现 `execution admission is closed`。[#203637](https://github.com/openclaw/openclaw/issues/203637) | CLOSED；修复及发布状态不明 |
| **P2 · 权限识别** | Slack owner 在机器人创建的线程内回复，却失去 owner-only 工具权限；另有相似报告。[#203870](https://github.com/openclaw/openclaw/issues/203870) · [#203884](https://github.com/openclaw/openclaw/issues/203884) | OPEN；需安全审查，建议先核对是否重复；未见 fix PR |
| **P2 · 后台记忆失败** | L1 记忆提取因运行时插件 generation 被替代而快速失败，报告称 2026.11.6 仍存在。[#203540](https://github.com/openclaw/openclaw/issues/203540) | OPEN；未见 fix PR |
| **P2 · 跨系统浏览器下载** | WSL2 Gateway 连接 Windows Chrome 时，Linux `downloadPath` 导致下载取消。[#203842](https://github.com/openclaw/openclaw/issues/203842) | OPEN；已有源码复现、修复形态清晰，可排队处理；未见 fix PR |
| **P2 · 会话状态一致性** | 热读取在追加自动化结果后丢失最后使用的推理模型，冷读取正常。[#203801](https://github.com/openclaw/openclaw/issues/203801) | OPEN；标有 `linked-pr-open`，但未提供 PR 编号 |
| **P2 · 上下文计量** | 本地模型会话的 prompt token 估算超过提供方报告值两倍，且上下文条跳动。[#203594](https://github.com/openclaw/openclaw/issues/203594) | OPEN；未见 fix PR |

另有跨会话回复回流/空公告、cron 在父任务返回 `NO_REPLY` 后仍发布子任务原始结果、macOS `node_exec` 找不到 Node 等问题已关闭，但不能据此认定已进入正式版本。[#203840](https://github.com/openclaw/openclaw/issues/203840) · [#203821](https://github.com/openclaw/openclaw/issues/203821) · [#203758](https://github.com/openclaw/openclaw/issues/203758)

## 6. 功能请求与路线图信号

| 需求 | 当前信号 | 后续版本判断 |
|---|---|---|
| 部署系统统一管理技能变更与来源 | Issue 已有直接对应 PR，涉及只读配置无法约束技能安装、同名技能来源优先级等问题。[#203875](https://github.com/openclaw/openclaw/issues/203875) · [#203881](https://github.com/openclaw/openclaw/pull/203881) | **落地路径较清晰**，但涉及安全敏感变更，仍需评审 |
| 智能体理解并回答 OpenClaw 自身问题 | 已有 PR，状态为等待作者。[#203783](https://github.com/openclaw/openclaw/issues/203783) · [#203830](https://github.com/openclaw/openclaw/pull/203830) | 已进入实现阶段，尚不能承诺下一版本 |
| macOS 设置过程用自然语言解释每一步 | 已有 PR，属于桌面伴侣工作流，仍等待作者。[#203786](https://github.com/openclaw/openclaw/pull/203786) | 可能分阶段交付 |
| 对话式首次设置、新智能体统一“出生”流程、自修复 | 多个关联提案仍待产品决策；自修复还需安全审查。[#203781](https://github.com/openclaw/openclaw/issues/203781) · [#203782](https://github.com/openclaw/openclaw/issues/203782) · [#203784](https://github.com/openclaw/openclaw/issues/203784) | 更接近路线图信号，而非已承诺能力 |
| 审批卡显示解释、拒绝无解释审批 | 需产品与安全审查，未见实现 PR。[#203882](https://github.com/openclaw/openclaw/issues/203882) | 尚处需求澄清阶段 |

近期更容易形成小步交付的，还有 Claude 工具调用历史保真、附件去重及主模型恢复探测重试，均已有开放 PR，但尚未合并。[#203877](https://github.com/openclaw/openclaw/pull/203877) · [#203778](https://github.com/openclaw/openclaw/pull/203778) · [#203477](https://github.com/openclaw/openclaw/pull/203477)

## 7. 用户反馈摘要

*以下来自报告摘要，不是对缺失评论正文的转述。*

- **语音用户需要模式明确、回复完整。** 新会话麦克风启动听写而非预期的语音对话，与 xAI Talk 截断共同表明，语音入口语义和会话连续性均需改善。[#203886](https://github.com/openclaw/openclaw/issues/203886) · [#203876](https://github.com/openclaw/openclaw/issues/203876)
- **重度用户在意状态可信度。** 长会话、后台记忆、本地模型 token 显示的问题，会让用户难以判断系统是否真正保留上下文并正确执行任务。[#203637](https://github.com/openclaw/openclaw/issues/203637) · [#203540](https://github.com/openclaw/openclaw/issues/203540) · [#203594](https://github.com/openclaw/openclaw/issues/203594)
- **运维用户需要可恢复、可解释的升级。** 卡在 `validating`、异常阶段退出、成功后仍出现大量警告，都增加了判断成本；其中一次成功更新报告 19 项警告，11 项为延后检查通知。[#203732](https://github.com/openclaw/openclaw/issues/203732) · [#203863](https://github.com/openclaw/openclaw/issues/203863) · [#203743](https://github.com/openclaw/openclaw/issues/203743)
- **权限控制需要“安全但不误拒绝”。** Slack owner 身份丢失和审批解释缺失分别暴露了授权可靠性与决策透明度需求。[#203870](https://github.com/openclaw/openclaw/issues/203870) · [#203882](https://github.com/openclaw/openclaw/issues/203882)

本次样本以问题报告为主，没有足够证据总结用户满意点或整体满意度变化。

## 8. 待处理积压

**无法识别真正的“长期未响应”事项**：本次 Issue 主要创建于 11 月 22—23 日，且缺少维护者最后回复时间。以下应视为高价值待办，而非陈年积压。

1. **优先完成 P0/P1 可用性问题的复现与归属确认**：工具执行全面失败、更新 UI 卡死和长回滚窗口均未见直接 fix PR，应优先于体验型新增功能。[#203869](https://github.com/openclaw/openclaw/issues/203869) · [#203757](https://github.com/openclaw/openclaw/issues/203757) · [#203764](https://github.com/openclaw/openclaw/issues/203764)
2. **清理已有充分证明、等待维护者的 PR 队列**：附件去重、主模型恢复探测、大整数 JSON ID 精度修复均标有 `proof: sufficient`，适合集中评审以减少等待成本。[#203778](https://github.com/openclaw/openclaw/pull/203778) · [#203477](https://github.com/openclaw/openclaw/pull/203477) · [#203593](https://github.com/openclaw/openclaw/pull/203593)
3. **集中处理权限准入语义变更后的测试债务**：多个测试仍断言已退役的“请求中途重新校验权限”行为。应统一记录新契约，同时保留对真实撤权、安全副作用边界的覆盖。[#203828](https://github.com/openclaw/openclaw/issues/203828) · [#203813](https://github.com/openclaw/openclaw/issues/203813) · [#203803](https://github.com/openclaw/openclaw/issues/203803) · [#203798](https://github.com/openclaw/openclaw/issues/203798)
4. **谨慎推进文件安全依赖升级**：`fs-safe` 0.28.2 的开放 PR 明确提到先前 0.28.0 升级曾通过局部 CI 后被回滚，且本次带有兼容性、安全边界风险标签，应重视完整生命周期验证。[#203860](https://github.com/openclaw/openclaw/pull/203860)

---

**今日结论**：OpenClaw 正同时推进“长期运行可靠性”和“普通用户可自行上手”两条主线。前者已有正式版本成果，后者仍以提案和开放 PR 为主；下一阶段项目健康度最值得观察的，不是功能数量，而是 **P0 工具执行、升级恢复及权限生命周期回归能否形成可验证的闭环**。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-23｜覆盖 13 个项目**

> **统计口径**：仅依据所提供的过去 24 小时快照；Issues、PR 数均指窗口内更新条目，不是仓库总量。`CLOSED` 不等于已合并，开放 PR 不代表能力已交付；单日活跃度不直接代表社区规模、产品成熟度或长期维护质量。NanoClaw、CoPaw 的入口与条目仓库名称存在差异，归属仍需核验。

## 1. 生态全景

13 个项目合计记录 **107 条 Issue 更新、149 条 PR 更新、1 次版本发布**，其中 OpenClaw、Hermes Agent、ZeroClaw 集中了约 **94% 的 Issue 活动和 86% 的 PR 活动**。生态关注点正在从“接入更多模型和工具”，转向“长期运行是否可靠、任务是否可控、状态是否可信”。会话恢复、取消传播、权限隔离、异步审批和协议兼容性在多个项目同时出现，表明真实使用已覆盖长任务、多配置、多渠道及远程部署场景。多数可见进展仍处于待审或迁移验收阶段，**贡献活跃与用户可用之间的验证、发布环节，是当前主要观察重点**。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 41 | 63 | **v2026.11.7** | 活跃度最高；会话恢复已有发布成果，但工具执行、升级恢复及权限生命周期仍有明显压力 |
| **Hermes Agent** | 50 | 50 | 无 | 问题反馈和贡献密集；本窗口无关闭/合并，凭据一致性、孤儿进程和消息恢复需优先处理 |
| **ZeroClaw** | 10 | 15 | 无 | ACP、账户权限及 SSH 授权集中推进；大型待审改造与核心静默故障并存 |
| **LobsterAI** | 0 | 8 | 无 | 集中开展 DSH 迁移稳定化；8 条 PR 均关闭，但合并及交付状态未确认 |
| **NanoClaw** | 3 | 5 | 无 | 会话连续性、远程运行器及审批需求明确；3 条 PR 为自动化镜像刷新，尚无交付闭环 |
| **CoPaw** | 1 | 5 | 无 | 控制台体验、Telegram 隔离及跨平台测试有推进；全部 PR 待审 |
| **NanoBot** | 0 | 3 | 无 | 以 WebUI 细节和文档展示维护为主；2 条关闭 PR 的合并状态不明 |
| **PicoClaw** | 1 | 0 | 无 | 可见活动较低；QQ 渠道鉴权阻断待复现，未见修复 PR |
| **Moltis** | 1 | 0 | 无 | 可见活动较低；旧 MCP 协议阻断部分远程集成，未见修复 PR |
| **NullClaw** | 0 | 0 | 无 | 窗口内无活动，不足以评价长期健康度 |
| **IronClaw** | 0 | 0 | 无 | 同上 |
| **TinyClaw** | 0 | 0 | 无 | 同上 |
| **ZeptoClaw** | 0 | 0 | 无 | 同上 |
| **合计** | **107** | **149** | **1 次** | 活动高度集中，实际交付证据少于变更输入 |

## 3. OpenClaw 在生态中的定位

### 综合平台型路线，可靠性与易用性并行

OpenClaw 今日同时涉及 Gateway、多智能体、自动化、桌面伴侣、语音、多渠道、技能治理及权限生命周期，呈现出**综合型个人智能体平台**的特征。其主要优势是：

- **发布成果最明确**：是本样本唯一发布版本的项目，v2026.11.7 明确改善 Gateway 重启后的回复和子任务结果恢复。
- **运行场景覆盖较广**：问题与改动横跨后台任务、长会话、桌面安装、通信渠道和部署治理，体现出较大的集成覆盖面。
- **产品化目标清晰**：ClippyClaw、自解释、对话式设置和自修复提案，试图降低安装与排障门槛；但多数尚未落地。

### 与主要同类的路线差异

| 对比对象 | OpenClaw 的相对差异 |
|---|---|
| **Hermes Agent** | 两者都重视长驻运行与多配置。OpenClaw 今日更突出重启恢复和自引导；Hermes 更突出 Desktop 配置、插件目录及供应商推理参数适配 |
| **ZeroClaw** | OpenClaw 同时覆盖广泛产品流程；ZeroClaw 今日更集中于 ACP 协议统一、OIDC 账户作用域和任务级凭据授权 |
| **NanoClaw** | OpenClaw 倾向较完整的平台体验；NanoClaw 今日体现出容器运行器、按需技能及运行器部署解耦诉求 |
| **LobsterAI** | OpenClaw 直接演进核心运行能力；LobsterAI 当前重点是由 OpenClaw 向 DSH 迁移后的桌面、办公与工具链适配验收 |
| **NanoBot / CoPaw** | OpenClaw 的当日改动覆盖面更广；两者本窗口更集中于 WebUI、会话呈现和渠道交互 |

### 社区规模：活动领先，不能替代规模指标

OpenClaw 今日 **104 条 Issue/PR 更新**，略高于 Hermes 的 **100 条**，明显高于 ZeroClaw 的 **25 条**。这支持其处于本样本的**高活动第一梯队**，但缺少活跃贡献者、独立用户、Stars 和历史响应数据，不能据此断言社区规模最大。

其代价也较明显：**广覆盖增加了跨模块验证成本**。P0 工具执行和更新卡死报告说明，平台能力丰富并不自动等于生产可用性更高。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与共性 |
|---|---|---|
| **持久会话与故障恢复** | OpenClaw、Hermes、NanoClaw、LobsterAI、ZeroClaw、CoPaw | 重启续接、异常恢复不丢消息、长会话交接、历史导入、重连分页；关键不只是保存聊天记录，而是恢复执行状态 |
| **任务生命周期与用户控制权** | Hermes、OpenClaw、ZeroClaw | 停止覆盖子任务树、长工具调用可中断、恢复后状态一致；取消和恢复需要成为统一运行时契约 |
| **身份、权限与上下文隔离** | OpenClaw、Hermes、ZeroClaw、LobsterAI、CoPaw | owner 身份识别、配置写入范围、账户会话绑定、记忆作用域、Telegram 话题隔离 |
| **审批语义与异步协作** | OpenClaw、NanoClaw、CoPaw、Hermes | 审批需有解释、迟到点击可处理、成功提示准确、永久拒绝语义真实；界面承诺必须与后端行为一致 |
| **外部协议与依赖兼容** | Moltis、PicoClaw、LobsterAI、ZeroClaw、Hermes | MCP 版本、QQ HTTP 依赖、OAuth 路径、工具消息格式及模型推理参数适配 |
| **技能与插件治理** | OpenClaw、Hermes、NanoClaw、ZeroClaw | 技能来源和部署策略、插件下架与合并、按需安装、技能生成可观测性 |
| **状态透明与诊断能力** | OpenClaw、Hermes、ZeroClaw、CoPaw | token/费用口径、模型实际选择、错误与空结果区分、审批和执行状态反馈 |

**共同结论：竞争焦点正从“功能存在”转向“功能在异常、重连和跨边界情况下仍然可信”。**

## 5. 差异化定位分析

以下为本窗口体现的侧重，不是对项目完整架构的定论。

| 项目 | 功能与架构信号 | 对应用户场景 |
|---|---|---|
| **OpenClaw** | Gateway、后台自动化、多智能体和多渠道，并探索对话式设置 | 希望统一管理多类个人任务，同时需要持续运行和恢复能力的用户 |
| **Hermes Agent** | Desktop 多配置、CLI/TUI、Gateway 和插件生态协同 | 多配置重度用户、CLI 用户及插件开发者 |
| **ZeroClaw** | Dashboard/IDE 向 ACP 统一，强化 OIDC 与凭据 broker | 需要 Web/IDE 协同、账户隔离和受控远程执行的开发者或团队 |
| **NanoClaw** | 容器运行器、网关技能、可选扩展；提出网络 mailbox | 需要自定义执行环境、远程或隔离部署的开发者 |
| **LobsterAI** | DSH 迁移、桌面伴侣、Office、邮件、MCP 和定时任务 | 桌面办公与跨工具自动化用户 |
| **CoPaw** | Web 控制台、会话历史、审批和 Telegram 话题隔离 | 通过浏览器和消息渠道使用助手的用户 |
| **NanoBot** | 本日主要体现桌面 WebUI 操作效率与可访问性优化 | 重视轻量交互和日常聊天体验的用户；不能据此推断完整架构 |
| **PicoClaw / Moltis** | 本日分别暴露 QQ 渠道与 MCP 远程集成问题 | 对特定渠道或工具有依赖的部署者；样本不足以判断总体定位 |

NullClaw、IronClaw、TinyClaw、ZeptoClaw 无当日动态，无法从本次数据提炼差异化路线。

## 6. 社区热度与成熟度

### 活跃度分层

- **高活动、快速迭代：OpenClaw、Hermes Agent。** 两者贡献输入和问题发现都很密集；前者有版本发布，后者本窗口尚无合并闭环。
- **架构演进集中：ZeroClaw。** 多组跨子系统 PR 同时推进，集成、浏览器验收和安全边界验证是短期重点。
- **质量巩固与定向改进：LobsterAI、CoPaw、NanoBot。** 分别偏向迁移验收、控制台及会话体验、局部 WebUI 打磨。OpenClaw 同时也处于质量收敛阶段。
- **小规模需求与实现输入：NanoClaw。** 有人工实现候选，但不能把三条自动镜像 PR 等同于三项独立功能贡献。
- **低可见活动：PicoClaw、Moltis，以及四个无活动项目。** 单日低活动不能解释为维护停滞。

### 热度不等于成熟度

本样本可量化讨论整体较弱：最高为 OpenClaw 实时语音截断问题的 **8 条评论**，Hermes 孤儿进程问题为 **3 条**；PR 评论数据普遍缺失，展示条目的点赞均为 0。因此，应区分：

- **工程活动热度**：OpenClaw、Hermes、ZeroClaw 明显领先。
- **社区讨论热度**：证据有限，不能推出广泛共识。
- **交付成熟度**：更应看修复合并、回归测试、发布归属和真实恢复结果，而不是条目数量。

## 7. 值得关注的趋势信号

### ① 个人助手正在成为持久运行的工作环境

14 小时会话、数百 MB 会话记录、约 1 GB 状态库以及多配置使用，说明部分用户已超出短时聊天模式。

**开发参考**：尽早设计检查点、压缩交接、数据保留、数据库迁移和启动恢复，不要等数据规模扩大后再补救。

### ② “停止、恢复、撤销”正在成为核心产品能力

孤儿子进程、停止超时、删除凭据被写回、升级后卡死，本质上都涉及状态转换不可靠。

**开发参考**：把取消传播、幂等执行、凭据撤销和恢复路径纳入运行时设计，而不是只作为 UI 功能。

### ③ 安全边界正从工具权限扩展到整个上下文系统

账户、项目、话题、配置、技能来源和凭据都有独立作用域需求。

**开发参考**：身份与作用域应贯穿消息入口、会话、记忆、工具调用及结果交付，避免只在单个接口做检查。

### ④ 协议与供应商变化成为持续维护成本

MCP 版本过旧、OAuth 路径调整、HTTP 依赖兼容、推理参数差异，都可能让“曾经可用”的集成失效。

**开发参考**：建立版本协商、契约测试和供应商能力矩阵，并将授权、初始化和工具执行分层诊断。

### ⑤ 自引导与自修复会扩大用户范围，也放大权限风险

OpenClaw 的产品提案代表降低使用门槛的方向，但自动改配置、装技能或修环境可能产生高影响副作用。

**开发参考**：优先交付“诊断—解释—审批—执行—验证—回滚”的受控闭环，而非默认赋予助手自修改权限。

### ⑥ 可观察性正在成为用户信任的一部分

模型切换“显示成功但未生效”、错误显示为空结果、费用标签与实际口径不一致，会直接削弱信任。

**开发参考**：同时呈现**期望配置、实际执行配置与最终结果**；对关键操作提供可追踪记录，减少静默失败。

---

## 综合判断

**OpenClaw 是本窗口中覆盖面广、活动领先且有明确发布成果的综合平台参照；Hermes 的贡献与问题发现强度接近；ZeroClaw 的协议统一和授权边界建设最集中。** LobsterAI 处于迁移稳定化，CoPaw、NanoBot 偏向交互质量改进，NanoClaw 则释放出运行器解耦和异步工作流需求。

对技术决策者而言，下一阶段最值得比较的不是“谁新增功能最多”，而是：**任务能否可靠续接、操作能否真正停止、权限是否贯穿执行链，以及修复能否形成可验证的发布闭环。**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-23** · [GitHub 仓库](https://github.com/HKUDS/nanobot)  
*统计范围：所提供的过去 24 小时更新数据；3 条 PR 的展示更新时间均为 2026-11-22。*

## 1. 今日速览

过去 24 小时共记录 **3 条 PR 更新、0 条 Issue 更新、0 个新版本**，项目呈现低量、以界面体验打磨为主的维护活动。其中 2 条 WebUI PR 已关闭，分别涉及桌面端消息操作和侧栏焦点样式；但数据未提供合并标记，**不能将“已关闭”视为“已合并”**。另有 1 条 README 徽章 PR 待处理，主要提升项目热度信息的可见性。整体来看，今日有小步改进信号，未见核心智能体能力变更；现有样本不足以判断长期活跃度或稳定性趋势。[查看仓库](https://github.com/HKUDS/nanobot)

## 2. 项目进展

| PR | 状态 | 主要变化与价值 |
|---|---|---|
| [#6751：桌面端消息操作移至侧边留白区域](https://github.com/HKUDS/nanobot/pull/6751) | 已关闭，合并情况未确认 | 针对宽屏、支持悬停的桌面环境调整消息操作入口，旨在减少复制回复所需点击次数，同时避免在阅读区域常驻工具栏。属于交互效率优化。 |
| [#6750：侧栏标题聚焦时使用下划线](https://github.com/HKUDS/nanobot/pull/6750) | 已关闭，合并情况未确认 | 针对话题重命名完成后仍显示矩形焦点框的问题，改为标题下划线，兼顾键盘焦点可见性与“编辑已结束”的视觉表达。属于局部 UI 修复。 |

**进展判断：**今日工作集中于 WebUI 的细节可用性，范围较小、目标明确。由于缺少合并记录与发布信息，目前只能确认相关改动已提出且 PR 已关闭，不能确认其已进入主分支或用户可用版本。

## 3. 社区热点

**暂无可量化的讨论热点。**3 条 PR 的评论数均为 `undefined`，不能按零评论处理，也无法据此排名；提供的 👍 数均为 0，亦不足以判断社区支持度。

按议题而非热度观察：

- **减少桌面端操作成本**：[#6751](https://github.com/HKUDS/nanobot/pull/6751) 反映了桌面端与窄屏布局在复制操作效率上的差异，诉求是“更少点击，同时保持阅读区简洁”。
- **优化键盘操作后的视觉反馈**：[#6750](https://github.com/HKUDS/nanobot/pull/6750) 关注焦点提示与编辑状态之间的辨识度。
- **提升项目展示效果**：[#6752](https://github.com/HKUDS/nanobot/pull/6752) 拟在 README 现有状态徽章下加入 Star History 实时全球星标排名与 GitHub Trending 徽章，并提供深色模式图片和替代文本。

## 4. Bug 与稳定性

| 严重程度 | 问题 | Fix PR 与当前状态 |
|---|---|---|
| 低：界面与状态反馈问题 | 侧栏话题按 Enter 完成重命名后，标题仍被矩形框包围，容易让人误以为仍处于输入状态。 | 已有 [#6750](https://github.com/HKUDS/nanobot/pull/6750)，标注 `bug / webui / fix / priority: p2`；PR 已关闭，是否合并及是否随版本交付未确认。 |

本次数据**未报告崩溃、数据丢失、安全漏洞或核心执行链路回归**；这仅代表当前样本未出现相关记录，不等于已验证不存在此类问题。[查看 Issue 列表](https://github.com/HKUDS/nanobot/issues)

## 5. 功能请求与路线图信号

- **桌面端交互效率是当前可见的改进方向。**[#6751](https://github.com/HKUDS/nanobot/pull/6751) 已提供具体实现方案，说明消息操作入口优化不只是抽象需求；但其已关闭且合并状态不明，尚不能认定会进入下一版本。
- **README 展示增强仍待处理。**[#6752](https://github.com/HKUDS/nanobot/pull/6752) 当前为 OPEN，属于文档展示变更，不涉及所提供摘要中的运行时功能调整。是否接纳取决于维护者评审。
- **暂无核心能力路线图信号。**本次没有新增 Issue，也未提供模型接入、工具调用或智能体工作流方面的新需求记录。[查看 Issue 列表](https://github.com/HKUDS/nanobot/issues)

## 6. 用户反馈摘要

**本次没有 Issue 或评论正文，无法提炼可核验的真实用户反馈，也不能判断用户满意度。**以下仅来自 PR 作者对问题的描述，不代表社区共识：

- **回复复制场景**：桌面端原需先打开 `…` 菜单再选择复制，而窄屏布局已有一键复制入口，存在操作效率不一致。[#6751](https://github.com/HKUDS/nanobot/pull/6751)
- **话题重命名场景**：编辑结束后，焦点框仍让整行看起来像输入框；改进目标是在保留键盘可访问性的同时减少状态误读。[#6750](https://github.com/HKUDS/nanobot/pull/6750)

## 7. 待处理积压

- **当前可见待处理项：[#6752](https://github.com/HKUDS/nanobot/pull/6752)。**该 PR 于 2026-11-22 创建，尚不能归类为长期积压。建议评审徽章展示、深色模式效果及替代文本是否符合 README 风格。
- **建议补核两条关闭 PR 的处置结果：[#6750](https://github.com/HKUDS/nanobot/pull/6750)、[#6751](https://github.com/HKUDS/nanobot/pull/6751)。**确认是已合并、被替代还是未采纳，以免在版本记录中误报为已交付。
- **无法识别长期未响应事项。**当前数据只有 24 小时更新窗口，没有完整的未关闭列表、等待时长与维护者响应记录，不宜据此评价积压健康度。[查看开放 PR](https://github.com/HKUDS/nanobot/pulls)

---

**健康度结论：**今日可见活动以小范围 WebUI 优化和文档展示维护为主；存在明确的可用性改进工作，但缺少合并、测试和用户讨论数据，暂不足以对交付效率或整体稳定性作进一步判断。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-23** · [项目仓库](https://github.com/NousResearch/hermes-agent)

> **统计口径**：基于提供的过去 24 小时数据，共 50 条 Issue 更新、50 条 PR 更新；详情仅覆盖其中 30 条 Issue 和 20 条 PR。PR 评论数字段缺失，且未提供评论正文，因此讨论热度、用户反馈与积压分析存在范围限制。

## 1. 今日速览

过去 24 小时，Hermes Agent 有 **50 条 Issue、50 条 PR 更新**，贡献与问题反馈活跃，但统计窗口内**没有 Issue 关闭、PR 合并或关闭，也没有新版本发布**。已展示的内容主要围绕会话生命周期、Gateway 稳定性、Desktop 多配置管理，以及模型推理参数兼容性展开。社区插件目录持续出现新增、升级、合并与下架提案，说明生态仍在扩展，同时开始显现维护治理需求。总体判断：**开发活动活跃，但本窗口尚无交付闭环；进程清理、凭据一致性和状态数据库增长值得优先关注**。[仓库动态](https://github.com/NousResearch/hermes-agent)

## 2. 项目进展

### 本窗口没有已合并或关闭的重要 PR

以下均为 **OPEN 状态的修复提案**，代表待审进展，不能视为已修复或已交付。

| 方向 | 待审进展及价值 | PR |
|---|---|---|
| Desktop 资源管理 | SSH 配置清单仅保留有效配置，避免残留目录、删除标记目录各自拉起独立后端 | [#159056](https://github.com/NousResearch/hermes-agent/pull/159056) |
| 数据恢复 | SQLite 扫描提前结束时，通过有界精确键探测补查可读取尾部记录，降低恢复结果不完整的风险 | [#159054](https://github.com/NousResearch/hermes-agent/pull/159054) |
| 托管成本 | 调整后台进程对 scale-to-zero 的阻塞判断，避免空闲后台进程持续阻止机器休眠 | [#159052](https://github.com/NousResearch/hermes-agent/pull/159052) |
| 语音稳定性 | 修复 CLI/TUI 录音过程中的原生崩溃及持续重启循环 | [#159050](https://github.com/NousResearch/hermes-agent/pull/159050) |
| 自动化任务 | 提前拒绝缺少可用工作目录的 Kanban 任务，避免进入重复启动失败流程 | [#159048](https://github.com/NousResearch/hermes-agent/pull/159048) |
| 消息交付 | Slack 用户 ID 目标先打开 DM，修复定时任务私信发送失败 | [#159041](https://github.com/NousResearch/hermes-agent/pull/159041) |

**进展评价**：修复提案已覆盖多个真实运行场景，其中 SSH 配置与 Kanban 问题出现了明确的 Issue—PR 对应关系；但合并、测试和发布结果均未提供，暂不能量化实际交付改善。

## 3. 社区热点

可见 Issue 的最高评论数只有 **3 条**，全部展示条目的 👍 均为 **0**，因此“热点”仅是样本内相对排序，不代表大规模社区共识。

1. **中断或退出后子智能体仍继续运行：3 条评论**  
   报告强调这不是界面残留，而是真实孤儿进程，且与既有清单状态问题叠加。核心诉求是让用户的“停止”真正覆盖整个任务树，保证多智能体执行可控。  
   [Issue #158919](https://github.com/NousResearch/hermes-agent/issues/158919)

2. **Gateway 状态数据库持续膨胀：2 条评论**  
   已完成 admission 的结果记录未删除，报告称 `state.db` 可增长至约 1 GB。长期运行用户需要的是明确的数据保留周期与自动清理机制，而不只是单次功能正确。  
   [Issue #158976](https://github.com/NousResearch/hermes-agent/issues/158976)

3. **AMD APU 显存预算高估：2 条评论**  
   报告称预算使用全部系统内存，导致约 1.87 倍高估，并在加载时触发 `ErrorDeviceLost`。反映本地模型用户对硬件探测准确性和安全默认值的需求。  
   [Issue #158941](https://github.com/NousResearch/hermes-agent/issues/158941)

4. **已删除凭据被旧进程重新写回：1 条评论**  
   用户期望删除操作在多进程、密钥轮换状态之间保持一致，而非被旧内存状态覆盖。这既是配置一致性问题，也关系到撤销凭据的可信度。  
   [Issue #159043](https://github.com/NousResearch/hermes-agent/issues/159043)

**PR 热度不可排序**：评论数字段为 `undefined`，不能据此判断哪些提案讨论最多。

## 4. Bug 与稳定性

以下按**潜在影响优先级**排序，并非修改项目原有 P2/P3 标签。“未见 fix PR”仅指提供的数据中没有展示对应修复。

### 优先关注：安全边界、执行控制与消息可靠性

| 问题 | 潜在影响 | 修复状态 |
|---|---|---|
| **已删除凭据重新出现**（P2） | 旧进程重写凭据池，轮换回退可能再次选中已删除密钥 | 未见对应 fix PR；[#159043](https://github.com/NousResearch/hermes-agent/issues/159043) |
| **结果边界脱敏不完整**（P3） | JSON 编码工具内容中的部分 ENV、YAML 值可能未被脱敏；尚不能据摘要判定实际暴露范围 | 未见对应 fix PR；[#159006](https://github.com/NousResearch/hermes-agent/issues/159006) |
| **子智能体成为孤儿进程**（P2） | 父会话中断后任务仍运行，可能继续消耗资源或执行操作 | 未见对应 fix PR；[#158919](https://github.com/NousResearch/hermes-agent/issues/158919) |
| **异常退出恢复期间丢失入站消息**（P2） | 启动恢复时重新入队的消息被静默丢弃，影响消息可靠性 | 未见对应 fix PR；[#158993](https://github.com/NousResearch/hermes-agent/issues/158993) |
| **长工具调用阻塞停止与图片附加**（P2） | `session.interrupt`、`image.attach_bytes` 达到 30 秒超时，降低用户控制能力 | 未见对应 fix PR；[#159001](https://github.com/NousResearch/hermes-agent/issues/159001) |
| **会话内命令写入错误配置**（P2） | `config set`、`cron create` 可能被全局 sticky profile 重定向至其他配置 | 未见对应 fix PR；[#159008](https://github.com/NousResearch/hermes-agent/issues/159008) |

### 运行稳定性与性能

- **数据库增长与启动阻塞需联动排查**：结果记录不清理，以及升级后的全量 `integrity_check` 可能阻塞启动数分钟，分别构成长驻运行与重启风险。两者可能相互放大，但现有数据不能证明直接因果。均未见对应 fix PR。  
  [#158976](https://github.com/NousResearch/hermes-agent/issues/158976) · [#159039](https://github.com/NousResearch/hermes-agent/issues/159039)

- **语音原生崩溃**：提案描述 Linux `Illegal instruction` 及其他主机上的 SIGSEGV，故障涉及 PortAudio 回调线程；已有待审修复。  
  [PR #159050](https://github.com/NousResearch/hermes-agent/pull/159050)

- **本地模型加载失败**：AMD APU iGPU 预算高估可能造成设备丢失错误；未见对应 fix PR。  
  [#158941](https://github.com/NousResearch/hermes-agent/issues/158941)

- **Desktop SSH 多余后端进程**：残留配置目录被当作有效配置，导致额外后端启动；已有待审修复。  
  [Issue #159055](https://github.com/NousResearch/hermes-agent/issues/159055) → [PR #159056](https://github.com/NousResearch/hermes-agent/pull/159056)

- **Kanban 无效任务进入失败重试**：缺少工作目录的任务仍被接受，最终 `gave_up`；已有待审的前置校验修复。  
  [Issue #159047](https://github.com/NousResearch/hermes-agent/issues/159047) → [PR #159048](https://github.com/NousResearch/hermes-agent/pull/159048)

### 开发质量与可诊断性

- **测试隔离污染**：报告称 Kanban fixture 修改 `sys.modules` 后未恢复，导致约 130 个无关测试失败；可能干扰 CI 信号。未见对应 fix PR。  
  [#159065](https://github.com/NousResearch/hermes-agent/issues/159065)

- **权限与错误表达不准确**：ACP “Deny always” 实际仅单次拒绝；Desktop 搜索将认证或网络失败显示为空结果。前者 Issue 引用了修复 PR，但该 PR 详情不在本次清单中；后者未见对应修复。  
  [#159031](https://github.com/NousResearch/hermes-agent/issues/159031) / [关联 PR #159030](https://github.com/NousResearch/hermes-agent/pull/159030) · [#159060](https://github.com/NousResearch/hermes-agent/issues/159060)

## 5. 功能请求与路线图信号

### 已有 PR，属于较明确的候选方向

- **模型推理控制适配**：Vertex/Google thinking 内容分流、MiniMax M3.1 的 `output_config.effort`、Groq thinking-off 参数处理均有待审提案。说明多供应商接入正在从“可调用”走向“推理行为与界面语义一致”。  
  [#159057](https://github.com/NousResearch/hermes-agent/pull/159057) · [#159049](https://github.com/NousResearch/hermes-agent/pull/159049) · [#159040](https://github.com/NousResearch/hermes-agent/pull/159040)

- **可观测性与个人知识检索插件**：新增回合计时、额度面板、本地文档混合检索插件的目录提案，分别回应耗时、费用和知识复用需求。均未合并，不能视为已可用功能。  
  [turn-timings #159064](https://github.com/NousResearch/hermes-agent/pull/159064) · [hermes-quota-live #159051](https://github.com/NousResearch/hermes-agent/pull/159051) · [hermes-scout #159053](https://github.com/NousResearch/hermes-agent/pull/159053)

- **插件目录治理**：维护结束插件下架、重复功能包合并，说明目录管理不仅在追求数量，也在处理生命周期与入口清晰度。  
  [下架 oc-free-provider #159066](https://github.com/NousResearch/hermes-agent/pull/159066) · [Kame 插件合并 #159044](https://github.com/NousResearch/hermes-agent/pull/159044)

### 尚属需求信号，未见对应 PR

- **Desktop 个性化控制**：Windows 快捷方式创建可退出、侧栏普通点击可配置为新标签打开。  
  [#159046](https://github.com/NousResearch/hermes-agent/issues/159046) · [#158994](https://github.com/NousResearch/hermes-agent/issues/158994)
- **Dashboard 本地技能删除接口**：补齐管理 API，避免删除操作只能借助智能体工具。  
  [#158947](https://github.com/NousResearch/hermes-agent/issues/158947)
- **Portable Agent Plugins 原生 Python 入口**：希望复用既有插件发现和生命周期机制，扩展 Python 集成能力。  
  [#159019](https://github.com/NousResearch/hermes-agent/issues/159019)

**下一版本判断**：已有针对性 PR 的修复和目录变更具备更明确的推进路径，但没有合并、里程碑或发布计划依据，不能确认纳入下一版本。

## 6. 用户反馈摘要

> 未提供评论正文，以下仅从 Issue 描述提炼，不作为评论引用或满意度调查结论。

- **“停止”必须可靠**：孤儿子进程与停止超时共同反映，长时间、多工具执行场景下，用户需要可预测的取消能力。  
  [#158919](https://github.com/NousResearch/hermes-agent/issues/158919) · [#159001](https://github.com/NousResearch/hermes-agent/issues/159001)

- **重度用户正在暴露规模化边界**：长驻 Gateway 数据库增长、多配置场景置顶会话缺失，说明部分用户已把 Hermes 当作持续运行的个人工作环境。置顶问题报告涉及 13 个配置、27 个置顶会话，界面仅显示 8 个。  
  [#158976](https://github.com/NousResearch/hermes-agent/issues/158976) · [#159024](https://github.com/NousResearch/hermes-agent/issues/159024)

- **静默失败比显式报错更难排查**：搜索失败显示“无匹配”、403 默认提示密钥错误、配置就绪超时显示“starting”，都会把排障方向带偏。  
  [#159060](https://github.com/NousResearch/hermes-agent/issues/159060) · [#159038](https://github.com/NousResearch/hermes-agent/issues/159038) · [#159034](https://github.com/NousResearch/hermes-agent/issues/159034)

- **正面满意度证据不足**：插件提案活跃可以说明贡献意愿，但不能等同于用户满意；当前样本主要是故障报告与功能诉求。  
  [插件贡献示例 #159053](https://github.com/NousResearch/hermes-agent/pull/159053)

## 7. 待处理积压与维护建议

**本数据不足以识别“长期未响应”条目**：展示记录主要创建于 11 月 22—23 日，也没有维护者回复身份、首次响应时间或历史 PR 审阅信息。零评论不应直接解释为长期无人处理。

建议维护者优先建立以下跟踪队列：

1. **安全与状态一致性**：确认凭据删除复活和脱敏遗漏的影响范围，补充多进程与 JSON/YAML 回归测试。  
   [#159043](https://github.com/NousResearch/hermes-agent/issues/159043) · [#159006](https://github.com/NousResearch/hermes-agent/issues/159006)

2. **生命周期与恢复可靠性**：统一检查中断、退出、异常重启三个路径，避免任务未停和消息丢失成为独立补丁。  
   [#158919](https://github.com/NousResearch/hermes-agent/issues/158919) · [#159001](https://github.com/NousResearch/hermes-agent/issues/159001) · [#158993](https://github.com/NousResearch/hermes-agent/issues/158993)

3. **优先验证已有修复闭环**：推进语音崩溃、SSH 配置枚举和 Kanban 前置校验的审阅、回归测试及关联 Issue 关闭。  
   [#159050](https://github.com/NousResearch/hermes-agent/pull/159050) · [#159056](https://github.com/NousResearch/hermes-agent/pull/159056) · [#159048](https://github.com/NousResearch/hermes-agent/pull/159048)

**健康度结论**：项目呈现“贡献活跃、问题发现充分、待审修复持续进入”的状态；短期最值得观察的不是新增条目数量，而是高风险问题的首次响应、修复合并和回归验证是否形成稳定闭环。单个 24 小时窗口零关闭、零合并，尚不足以认定维护停滞。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报｜2026-11-23

> 项目：[sipeed/picoclaw](https://github.com/sipeed/picoclaw)  
> 统计范围：所提供的过去 24 小时 GitHub 更新数据；不代表仓库全部历史积压。

## 1. 今日速览

过去 24 小时，PicoClaw 有 **1 条 Issue 新开并更新、0 条 PR 更新、0 个新版本发布**，可见开发与社区互动活跃度较低。今日唯一新增报告集中在 **QQ 渠道鉴权失败**：提交者认为 `resty` 依赖版本变化与 `botgo` 的兼容性有关，导致渠道无法启动。目前该 Issue 仍处于开放状态，评论与点赞均为 0，所提供数据中尚无关联修复 PR。整体来看，今日没有可确认的功能交付，主要健康度风险是 QQ 集成的依赖兼容性问题，但其影响范围和根因仍待验证。  
来源：[仓库](https://github.com/sipeed/picoclaw) · [Issue #3472](https://github.com/sipeed/picoclaw/issues/3472)

## 2. 项目进展

- **今日未观察到合并、关闭或活跃更新的 PR**，因此无法确认有功能、修复或重构通过 PR 落地，也不能据此推断代码库完全没有提交。
- 可确认的进展是新增了一条较具体的故障线索：报告给出了 QQ 鉴权错误码及疑似相关依赖版本，为后续复现和定位提供了入口；目前仍处于问题报告阶段，而非修复交付阶段。  
  来源：[PR 列表](https://github.com/sipeed/picoclaw/pulls) · [Issue #3472](https://github.com/sipeed/picoclaw/issues/3472)

## 3. 社区热点

### QQ 渠道报错 11241：疑似依赖升级导致鉴权头不兼容

[Issue #3472](https://github.com/sipeed/picoclaw/issues/3472) 由 `redbrotherchen` 于今日提交，当前 **OPEN，0 条评论、0 个点赞**，是本统计窗口内唯一可见的社区议题，尚未形成讨论热点。

- **报告现象**：QQ 渠道启动失败，返回 `11241`，提示 `Authorization header format error`。
- **提交者判断**：`botgo v0.2.1` 与 `resty v2.17.1` 的组合存在兼容性回归；标题指出前者预期使用 `resty v2.6.0`。
- **背后诉求**：恢复 QQ 机器人的正常接入，避免底层 HTTP 客户端依赖变化破坏渠道可用性。

**分析**：这是集成可靠性诉求，而非新增能力诉求。依赖版本与鉴权失败之间的因果关系，目前仅来自提交者报告，尚未见维护者确认。  
来源：[Issue #3472](https://github.com/sipeed/picoclaw/issues/3472)

## 4. Bug 与稳定性

| 优先级评估 | 问题 | 影响与证据边界 | 修复状态 |
|---|---|---|---|
| **高：渠道级阻断，待验证** | QQ 渠道鉴权报错 `11241` | 据报告，QQ 渠道无法启动；疑似涉及 `botgo v0.2.1` 与 `resty v2.17.1` 的兼容性。不足以判断其他渠道或所有部署均受影响。 | Issue 开放；所提供数据中未见 fix PR。[#3472](https://github.com/sipeed/picoclaw/issues/3472) |

**建议优先核查**：复现所述依赖组合，对比不同 `resty` 版本下鉴权头的实际行为，再决定是否需要版本约束或兼容性修复。报告提及旧版本并不等于已有经过验证的回退方案。  
来源：[Issue #3472](https://github.com/sipeed/picoclaw/issues/3472)

## 5. 功能请求与路线图信号

今日数据中**没有明确的新功能请求，也没有可用于判断下一版本范围的活跃 PR**。唯一可见信号指向 QQ 渠道稳定性与依赖兼容性维护；若该问题得到确认，可作为近期修复候选，但目前没有证据表明其已进入下一版本计划。  
来源：[Issue #3472](https://github.com/sipeed/picoclaw/issues/3472) · [PR 列表](https://github.com/sipeed/picoclaw/pulls)

## 6. 用户反馈摘要

由于今日唯一 Issue **没有评论**，以下仅提炼自提交者的标题与摘要，不代表广泛用户共识：

- **使用场景**：通过 PicoClaw 的 QQ 渠道接入机器人。
- **核心痛点**：启动阶段即遭遇鉴权失败，阻断该渠道的正常使用。
- **反馈质量**：报告提供了错误码、错误信息及具体依赖版本，有助于缩小排查范围。
- **满意度信息**：没有明确的满意度评价，也没有其他用户确认同样受影响。  
  来源：[Issue #3472](https://github.com/sipeed/picoclaw/issues/3472)

## 7. 待处理积压

**当前数据不足以识别长期未响应的重要 Issue 或 PR**，不能将今日新开的 #3472 归为长期积压。

建议维护者近期优先分诊 [Issue #3472](https://github.com/sipeed/picoclaw/issues/3472)：确认复现条件、受影响版本和部署范围，并在验证后补充解决方案或关联修复 PR。该问题虽尚无社区互动，但涉及渠道无法启动，不宜仅按评论数判断优先级。

---

**健康度结论**：今日呈现“**低可见活动量、单一渠道可用性风险待确认**”的状态。没有发布或 PR 交付信号；接下来的关键观察点是 QQ 鉴权问题能否得到复现、维护者响应及修复闭环。  
跟踪：[Issue #3472](https://github.com/sipeed/picoclaw/issues/3472)

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-23｜统计范围：所提供的过去 24 小时数据**

> **数据口径说明：**项目名称指定仓库为 `qwibitai/nanoclaw`，但条目链接标识均指向 `nanocoai/nanoclaw`；以下按条目提供的仓库标识生成链接，仓库归属仍需核验。部分条目的更新时间显示为 11 月 22 日，本文沿用所给统计窗口，不另行推算。

## 1. 今日速览

今日窗口内共有 **3 条 Issue、5 条 PR 更新**，全部保持开放，**无合并、关闭或新版本发布**。活动以需求提出和变更提交为主，5 条 PR 中有 3 条为自动化镜像刷新，另有技能扩展和容器运行器修复各 1 条。关注方向集中在会话连续性、远程运行环境支持，以及异步人工审批，反映出个人助手向长时间运行、多环境部署发展的需求。整体呈现**有持续输入、尚无交付闭环**的状态；由于 Issue 均无评论、PR 评论数据缺失，暂不能据此判断社区讨论热度或维护响应速度。

## 2. 项目进展

**今日没有已合并或关闭的重要 PR，无法确认已有功能或修复进入主线。** 当前推进主要体现在以下待审变更：

| 待合并事项 | 内容与价值 | 当前判断 |
|---|---|---|
| [#4537：修复项目文档与网关技能选择不一致](https://github.com/nanocoai/nanoclaw/pull/4537) | 让生成的 `CLAUDE.md` 与 provider-contract 启动路径中的技能选择一致，使当前网关的常驻指令能够传递给 agent | 属于运行行为一致性修复，值得优先验证 |
| [#4541：新增 `/add-deja` 技能](https://github.com/nanocoai/nanoclaw/pull/4541) | 按需安装固定版本 `@vshulcz/deja-vu` CLI（`0.24.3`）及 `search-past-sessions` 容器技能，支持本地搜索历史编码会话 | 为历史上下文检索提供可选扩展，不等同于自动恢复会话 |
| [#4542](https://github.com/nanocoai/nanoclaw/pull/4542)、[#4539](https://github.com/nanocoai/nanoclaw/pull/4539)、[#4536](https://github.com/nanocoai/nanoclaw/pull/4536)：镜像刷新 | 为 `v2026.11.0` 更新标注为 hardened 的镜像构建及摘要 | 属于维护性候选更新；摘要未提供具体漏洞修复或兼容性说明 |

**推进幅度：**已有两项人工提交的实现候选，但仍停留在待合并阶段。三条镜像 PR 均替换同一旧摘要，建议维护者确认替代关系，避免重复审查；不能将它们计为三次已交付升级。

## 3. 社区热点

**当前没有可由互动数据支持的“热议榜”。** 三条 Issue 的评论数和 👍 均为 0；五条 PR 的评论数为 `undefined`，属于缺失数据，不能视作零评论。按影响面，以下议题值得关注：

- **长会话的上下文能否可靠延续：**[#4540](https://github.com/nanocoai/nanoclaw/issues/4540) 报告长时间工作后，冷启动转录轮转导致活动会话丢失且无交接。背后诉求是长期任务状态的可靠保存与恢复，而不仅是保留聊天记录。
- **运行器能否脱离宿主机共享目录：**[#4543](https://github.com/nanocoai/nanoclaw/issues/4543) 提议网络 mailbox，以支持无法访问宿主路径的远程、托管、Kubernetes 和沙箱运行环境。核心诉求是部署解耦。
- **人工审批能否适应真实响应时间：**[#4538](https://github.com/nanocoai/nanoclaw/issues/4538) 希望审批超时后仍可响应迟到点击，反映了移动端、人不持续在线场景与短时同步请求机制之间的冲突。

## 4. Bug 与稳定性

*以下优先级为基于摘要的分析判断，并非维护者已确认的严重等级。*

| 优先级 | 问题及影响 | Fix PR 状态 |
|---|---|---|
| **高** | [#4540：冷启动时活动会话静默丢失](https://github.com/nanocoai/nanoclaw/issues/4540)。报告称约 14 小时工作会话经历多次压缩，触及使用额度限制后闲置约 30 分钟，再次交互时启动全新 SDK 会话且没有交接。可能直接破坏长期任务连续性 | 所给数据中**未见关联修复 PR**；影响范围及复现条件待确认 |
| **中** | [#4537：生成指令与实际技能选择不一致](https://github.com/nanocoai/nanoclaw/pull/4537)。可能导致当前网关的常驻指令未进入 agent 的项目文档，造成运行行为偏差 | **已有修复 PR，尚未合并** |
| **中，设计限制** | [#4538：审批超时后点击失效](https://github.com/nanocoai/nanoclaw/issues/4538)。约 3 分钟后请求被拒绝，Discord 审批卡随之失效，影响离线审批场景 | 未见对应实现 PR；当前以能力请求提出，不宜直接认定为回归 Bug |

所给数据中没有明确的崩溃报告，也不足以认定上述问题由某次近期变更引入。

## 5. 功能请求与路线图信号

- **网络化运行器通信——需求明确，实现尚未出现。** [#4543](https://github.com/nanocoai/nanoclaw/issues/4543) 希望用网络 mailbox 替代对宿主会话目录中数据库、heartbeat 和 outbox 的直接挂载依赖。若推进，将扩大运行器部署选择，但当前没有对应 PR 或版本承诺。
- **可延后处理的审批——需要协议与状态管理配合。** [#4538](https://github.com/nanocoai/nanoclaw/issues/4538) 希望 agent 不被短超时审批阻塞，同时能处理迟到的批准操作。后续实现需关注审批状态持久化、操作是否仍有效及重复执行防护。
- **历史会话检索——已有代码候选，落地信号更强。** [#4541](https://github.com/nanocoai/nanoclaw/pull/4541) 已提供按需安装方案，相比仅有 Issue 的需求，更接近可审查交付；但不能据此确认会进入下一版本。

**近期交付观察重点：**[#4537](https://github.com/nanocoai/nanoclaw/pull/4537) 与 [#4541](https://github.com/nanocoai/nanoclaw/pull/4541) 已有实现候选；网络 mailbox 和异步审批仍属于需求信号。

## 6. 用户反馈摘要

**本批 Issue 无评论，以下仅提炼自提报正文，而非评论讨论或社区共识。**

- **重度长会话用户：**长达约 14 小时、包含多次自动压缩与截图读取的工作流，在额度限制后恢复交互时失去上下文。痛点是“暂停后不能可靠续接”。来源：[#4540](https://github.com/nanocoai/nanoclaw/issues/4540)。
- **移动审批用户：**审批人可能离开手机一至两小时，约 3 分钟的超时机制与实际响应节奏不匹配；回来点击也无法继续原操作。来源：[#4538](https://github.com/nanocoai/nanoclaw/issues/4538)。
- **远程与隔离部署用户：**宿主目录挂载成为运行器选择的约束，希望在不共享本地路径的情况下使用其他执行环境。来源：[#4543](https://github.com/nanocoai/nanoclaw/issues/4543)。

这些反馈共同指向**持久状态、异步协作和部署可移植性**。当前没有足够数据提炼正向满意度，也不能把缺少评论解读为问题不重要。

## 7. 待处理积压

**当前样本仅覆盖 11 月 22—23 日，无法识别“长期未响应”的积压项。** 建议维护者优先关注：

1. **验证并分诊会话丢失问题：**收集冷启动、SDK 会话 ID、转录轮转与交接日志，明确是否可复现及影响范围。关联：[#4540](https://github.com/nanocoai/nanoclaw/issues/4540)。
2. **审查指令一致性修复：**验证网关调整后的技能选择与 `CLAUDE.md` 内容一致，避免文档和实际技能分叉。关联：[#4537](https://github.com/nanocoai/nanoclaw/pull/4537)。
3. **整理镜像刷新队列：**确认三个候选构建的替代关系、验证结果及应保留的 PR。关联：[#4536](https://github.com/nanocoai/nanoclaw/pull/4536)、[#4539](https://github.com/nanocoai/nanoclaw/pull/4539)、[#4542](https://github.com/nanocoai/nanoclaw/pull/4542)。
4. **回应能力请求的范围与方向：**明确网络 mailbox、延迟审批是否符合架构规划，降低贡献者在方向未确认前投入实现的风险。关联：[#4543](https://github.com/nanocoai/nanoclaw/issues/4543)、[#4538](https://github.com/nanocoai/nanoclaw/issues/4538)。

**健康度结论：**NanoClaw 当前有持续的维护自动化和人工贡献输入，但本窗口尚无合并交付。最值得追踪的不是条目数量，而是会话丢失问题能否得到确认、待审修复能否闭环，以及新能力请求能否获得明确反馈。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报
**日期：2026-11-23** · [GitHub 仓库](https://github.com/netease-youdao/LobsterAI)

> **统计口径**：基于所提供的过去 24 小时数据；8 条 PR 的创建、更新时间均标为 2026-11-22。所有 PR 状态均为 `CLOSED`，**无法据此区分已合并与未合并关闭**，下文不将其视为已进入主分支。

## 1. 今日速览

过去 24 小时，LobsterAI 有 **8 条 PR 更新、0 条 Issue 更新、0 个新版本发布**，活动主要集中在代码修复与迁移验收。8 条 PR 均由同一位作者提交，其中 7 条围绕 `feat/migrate-openclaw-to-dsh` 的迁移验收及后续修复，另 1 条调整桌面伴侣动画。修复覆盖启动、会话、记忆、技能、MCP 和定时任务等核心链路，显示项目正集中处理迁移后的兼容性与稳定性问题。整体呈现出**工程修复活跃、社区讨论信号不足**的状态，但由于缺少合并记录、完整测试结果与发布信息，暂不能确认这些修复已交付用户。

## 2. 项目进展

### DSH 迁移：六部分验收修复集中关闭

这组 PR 在摘要中明确建议按 **1 → 6** 的顺序合并，表明修复需要协调集成；当前只能确认相关 PR 已关闭。

| 方向 | 主要修复内容 | 进展意义 |
|---|---|---|
| 启动与基础设施 | 启动去重、初始化状态控制，以及隔离、备份恢复、打包修复 | 面向迁移后“能否可靠启动与恢复”的基础保障。[#3146](https://github.com/netease-youdao/LobsterAI/pull/3146) |
| 会话与执行控制 | 会话生命周期、目标、上下文压缩、权限，以及旧编辑状态清理与分叉处理 | 改善长会话运行和历史状态兼容性。[#3147](https://github.com/netease-youdao/LobsterAI/pull/3147) |
| 记忆管理 | 项目/全局作用域、专家隔离、CRUD 迁移及 dream diary 查看器 | 强化记忆边界与可管理性。[#3148](https://github.com/netease-youdao/LobsterAI/pull/3148) |
| 技能与插件 | 技能运行环境、邮件技能、网页搜索沙箱和插件生命周期 | 修补工具运行环境与迁移兼容链路。[#3149](https://github.com/netease-youdao/LobsterAI/pull/3149) |
| MCP 集成 | 服务同步、差异协调、OAuth 2.1、SSE 桥接、工具过滤与包路径 | 提升外部工具接入的配置与运行可靠性。[#3150](https://github.com/netease-youdao/LobsterAI/pull/3150) |
| 模型与办公能力 | 模型兼容、推理参数和 OAuth 路由，以及 Office 编辑、定时任务、决策工具、桌面伴侣修复 | 覆盖迁移后的端到端功能兼容问题。[#3151](https://github.com/netease-youdao/LobsterAI/pull/3151) |

### 端到端测试后继续补漏

- **定时任务工作目录与待处理提示恢复**：基于 macOS Apple Silicon 实机端到端测试，补充定时任务工作目录绑定，并处理重载后待处理 DSH 提示的恢复。该 PR 反映出修复已推进到具体运行场景验证阶段，但摘要未提供完整验收结果。[#3152](https://github.com/netease-youdao/LobsterAI/pull/3152)
- **桌面伴侣视觉校准**：调整“鲸一鸣”和“醒醒星”的悬停/动画表现，属于界面体验打磨，而非核心引擎能力扩展。[#3145](https://github.com/netease-youdao/LobsterAI/pull/3145)

**整体判断**：本轮进展的价值主要在于补齐迁移的关键运行链路，而非新增大量功能；尚无法量化迁移完成度或确认可发布状态。

## 3. 社区热点

**无法给出可靠的讨论热度排名**：今日无 Issue 更新，8 条 PR 的评论数均为 `undefined`，👍 均为 0。评论数据缺失不能解释为“没有讨论”，同样也不足以认定某个 PR 是社区热点。

从代码主题而非讨论热度看，值得关注的是：

- **DSH 迁移后的可用性与连续性**：启动、会话、记忆和工具链修复集中出现，体现工程侧对迁移稳定性的关注，不等同于已证实的用户集中投诉。[#3146](https://github.com/netease-youdao/LobsterAI/pull/3146) · [#3147](https://github.com/netease-youdao/LobsterAI/pull/3147)
- **自动化任务与工具生态可靠性**：MCP 认证/同步、定时任务目录绑定关系到个人助手在真实工作环境中的执行可靠性。[#3150](https://github.com/netease-youdao/LobsterAI/pull/3150) · [#3152](https://github.com/netease-youdao/LobsterAI/pull/3152)

## 4. Bug 与稳定性

今日**没有新增 Issue 形式的 Bug 报告**。以下按 PR 涉及的潜在影响排序，并非官方严重等级；均已有对应 fix PR，但其是否合入、是否发布仍待确认。

| 优先级 | 风险领域 | 已有修复线索 |
|---|---|---|
| 高 | **启动、隔离与恢复**：可能影响应用可用性及迁移后的状态恢复 | 启动门控、重试、备份恢复和打包修复。[#3146](https://github.com/netease-youdao/LobsterAI/pull/3146) |
| 高 | **记忆作用域与专家隔离**：涉及跨项目或跨专家的记忆边界；不能据此认定已发生数据泄露 | 强制作用域标记与隔离处理。[#3148](https://github.com/netease-youdao/LobsterAI/pull/3148) |
| 中高 | **会话、权限与提示恢复**：可能影响任务继续执行及交互状态一致性 | 会话生命周期、权限和重载恢复修复。[#3147](https://github.com/netease-youdao/LobsterAI/pull/3147) · [#3152](https://github.com/netease-youdao/LobsterAI/pull/3152) |
| 中 | **工具、模型与自动化兼容**：技能环境、MCP、模型路由及定时任务存在迁移适配需求 | 已有系列修复。[#3149](https://github.com/netease-youdao/LobsterAI/pull/3149) · [#3150](https://github.com/netease-youdao/LobsterAI/pull/3150) · [#3151](https://github.com/netease-youdao/LobsterAI/pull/3151) |
| 低 | **桌面伴侣视觉不一致**：主要影响观感 | 悬停动画与素材表现校准。[#3145](https://github.com/netease-youdao/LobsterAI/pull/3145) |

现有数据没有提供可核实的崩溃次数、影响用户规模或回归率。

## 5. 功能请求与路线图信号

今日没有可确认的用户新功能请求。PR 所释放的路线图信号主要是：

- **优先完成 DSH 迁移验收**：六部分修复与实机测试补丁连续出现，说明近期工程重心偏向稳定化，而非功能扩张。[#3146](https://github.com/netease-youdao/LobsterAI/pull/3146) · [#3152](https://github.com/netease-youdao/LobsterAI/pull/3152)
- **强化项目级记忆管理与可观察性**：记忆隔离、CRUD 迁移和 dream diary 查看器可能成为后续版本的改进点，但并无发布承诺。[#3148](https://github.com/netease-youdao/LobsterAI/pull/3148)
- **补齐工作助手的执行链路**：邮件、Office、MCP 和定时任务修复共同指向实际办公场景的可靠性建设；是否纳入下一版本取决于合入与验收结果。[#3149](https://github.com/netease-youdao/LobsterAI/pull/3149) · [#3150](https://github.com/netease-youdao/LobsterAI/pull/3150) · [#3151](https://github.com/netease-youdao/LobsterAI/pull/3151)

## 6. 用户反馈摘要

**本期无法提炼真实用户满意度或痛点**：没有 Issue 内容与评论文本，PR 评论数也不可用，不应将开发者修复说明当作用户反馈。

唯一明确的使用验证线索来自开发者的 **macOS Apple Silicon 实机端到端测试**，涉及定时任务目录与重载后提示恢复；它说明测试覆盖了具体场景，但不代表普通用户反馈或整体满意度。[#3152](https://github.com/netease-youdao/LobsterAI/pull/3152)

## 7. 待处理积压

当前数据中待合并 PR 为 0，但这只描述本次更新集合，**不能据此判断全仓库没有积压**。由于缺少历史开放 Issue/PR、最后响应时间与阻塞信息，无法识别长期未响应事项。可进一步检查[开放 Issues](https://github.com/netease-youdao/LobsterAI/issues)与[开放 PR](https://github.com/netease-youdao/LobsterAI/pulls)。

建议维护者优先核对：

1. **迁移修复的最终归属**：确认六部分修复是否合入迁移分支，以及关闭原因与集成顺序是否清晰。[#3146](https://github.com/netease-youdao/LobsterAI/pull/3146)–[#3151](https://github.com/netease-youdao/LobsterAI/pull/3151)
2. **关键场景回归验收**：重点核验启动恢复、记忆隔离、定时任务工作目录与重载交互恢复，避免仅凭 PR 关闭认定问题解决。[#3146](https://github.com/netease-youdao/LobsterAI/pull/3146) · [#3148](https://github.com/netease-youdao/LobsterAI/pull/3148) · [#3152](https://github.com/netease-youdao/LobsterAI/pull/3152)

**健康度结论**：当前可见的是集中且覆盖面较广的稳定化投入；真正的交付质量仍需合并记录、回归测试与后续发布来验证。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报
**日期：2026-11-23**  
**统计口径：所提供的过去 24 小时 GitHub 更新数据；不代表仓库全部历史状态。**

## 1. 今日速览

过去 24 小时，Moltis 有 **1 条 Issue 更新、0 条 PR 更新、0 个新版本发布**，可见开发与社区活动较低。唯一新增关注点是 MCP 客户端协议兼容性：用户报告客户端固定使用旧协议版本，导致部分远程 MCP 服务无法连接。目前该 Issue 仍为开放状态，暂无评论，也未在所给数据中发现关联修复 PR。整体来看，今日没有可确认的交付进展，但暴露出一个影响外部工具接入的兼容性风险，值得优先确认与分诊。  
[项目仓库](https://github.com/moltis-org/moltis) · [问题 #1326](https://github.com/moltis-org/moltis/issues/1326)

## 2. 项目进展

- **今日无可确认的合并或关闭成果。** 数据中没有 PR 更新，无法确认有功能落地、修复合并或其他交付推进；这也不等同于仓库没有代码提交。今日可见进展主要是发现并记录了 MCP 协议兼容性缺口。  
  [PR 列表](https://github.com/moltis-org/moltis/pulls) · [问题 #1326](https://github.com/moltis-org/moltis/issues/1326)

## 3. 社区热点

### #1326：旧版 MCP 协议导致部分服务初始化失败
- **状态与热度：** OPEN，作者 `leitxio`，评论 **0**、👍 **0**；是本次数据中唯一的社区议题，尚不能视为广泛讨论的热点。
- **核心诉求：** 用户希望接入要求 MCP `2025-06-18` 或更高版本的远程服务，例如 Basecamp。报告称，Moltis 在 `initialize` 请求和 `MCP-Protocol-Version` 请求头中固定使用 `2024-11-05`，被已停止接受该版本的服务端拒绝。
- **分析：** 该问题体现了用户对真实远程工具集成的需求，也说明 **OAuth 授权成功并不代表 MCP 初始化成功**，两者需要分别验证与呈现错误。

[查看 Issue #1326](https://github.com/moltis-org/moltis/issues/1326)

## 4. Bug 与稳定性

| 优先级评估 | 问题与影响 | 当前状态 | Fix PR |
|---|---|---|---|
| **高：特定集成完全不可用**，非已证实的全局故障 | MCP 客户端固定发送 `2024-11-05`；据报告，要求更新协议的远程服务会拒绝初始化，即使 OAuth 已完成也无法使用 | OPEN；尚无评论或进一步确认记录 | 所给数据中未发现 |

该问题属于**协议兼容性与功能可用性风险**，现有信息不足以将其判定为崩溃、安全漏洞或已确认回归。建议优先核实协议版本的生成位置、服务端兼容范围，以及初始化失败时的错误提示是否足够明确。  
[问题详情与跟踪](https://github.com/moltis-org/moltis/issues/1326)

## 5. 功能请求与路线图信号

- **隐含需求：支持较新的 MCP 协议及适当的版本协商机制。** 这不是一条独立的新功能提案，而是由兼容性故障暴露出的能力缺口。可能涉及初始化版本选择、HTTP 请求头与会话协议版本一致性，以及不兼容场景的错误提示；这些仅是分析方向，并非已公布方案。
- **下一版本判断：暂无排期依据。** 当前没有关联 PR、维护者回复或版本计划，不能据此判断修复会进入下一版本。

[需求来源：Issue #1326](https://github.com/moltis-org/moltis/issues/1326)

## 6. 用户反馈摘要

**本次没有 Issue 评论可供提炼，以下仅来自问题描述：**

- **使用场景：** 从 Moltis 连接远程 MCP 服务，报告以 Basecamp 为例。
- **直接痛点：** OAuth 完成后，仍因协议版本不被接受而无法建立可用连接，集成流程被阻断。
- **反馈边界：** 目前仅有一名报告者的数据，无法判断影响用户规模；也没有明确的满意度评价或其他用户验证。

[用户原始反馈](https://github.com/moltis-org/moltis/issues/1326)

## 7. 待处理积压

- **暂无证据识别长期未响应的积压项。** 唯一提供的 Issue 创建、更新时间均为 **2026-11-22**，不能因零评论就归类为长期搁置。建议维护者先对其完成复现确认与优先级标注，明确受影响服务、协议支持范围及临时规避方案。  
  [待分诊：Issue #1326](https://github.com/moltis-org/moltis/issues/1326)

---

**健康度结论：** 本日可见活动较低、无交付记录，但单日样本不足以判断项目长期维护趋势。当前最值得关注的是 MCP 生态兼容性：应尽快明确 #1326 的影响范围和修复路径，避免工具接入能力随服务端协议升级而受限。  
[持续跟踪 #1326](https://github.com/moltis-org/moltis/issues/1326)

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报
**日期：2026-11-23｜统计范围：所提供的过去 24 小时 GitHub 更新**

> **数据说明**：项目名称及入口为 [CoPaw](https://github.com/agentscope-ai/CoPaw)，但本批 Issue、PR 链接及部分描述均指向 `agentscope-ai/QwenPaw`。下文沿用日报名称，条目链接按原始数据生成；不据此判断仓库是否已更名或迁移。

## 1. 今日速览

过去 24 小时共更新 **1 条 Issue、5 条 PR**，其中 5 条 PR 均待合并，未记录 Issue 关闭、PR 合并/关闭或新版本发布。开发活动主要集中于 **Web 控制台交互与会话历史体验**，相关 PR 占今日 PR 的 **60%（3/5）**。此外，Telegram 话题级会话隔离和 Windows 插件测试兼容性也有推进，说明贡献覆盖了用户体验、多渠道会话管理和跨平台质量保障。整体呈现“**贡献端持续活跃、交付端尚待验证**”的状态，但仅凭一天的数据无法判断合并效率或长期健康趋势。详见 [PR 列表](https://github.com/agentscope-ai/QwenPaw/pulls)。

## 2. 项目进展

**今日没有已合并或关闭的重要 PR，因此尚无可确认的主分支交付增量。** 当前进展主要体现为以下待审变更：

| 待合并 PR | 推进内容与价值 | 当前判断 |
|---|---|---|
| [#8859：明确确认与审批交互](https://github.com/agentscope-ai/QwenPaw/pull/8859) | 改进确认对话框、审批卡片及破坏性操作，处理授权文案不明确、过早提示成功、状态陈旧等问题 | 标记为 `size/XXXL`，覆盖面较大，应重点审查异步状态与审批流程回归 |
| [#8858：恢复会话历史分页](https://github.com/agentscope-ai/QwenPaw/pull/8858) | 在重连或发送者交接后的会话恢复路径中，将消息标记为历史消息，使 SDK 能分页呈现 | 属于小范围修复，面向恢复路径与普通加载路径的一致性 |
| [#8857：按 Telegram 论坛话题隔离会话](https://github.com/agentscope-ai/QwenPaw/pull/8857) | 解决不同话题共用同一 Agent 会话、记忆和控制台对话的问题 | 明确的功能增强；带有首次贡献者标签 |
| [#8855：修复 Windows Plugin SDK 测试](https://github.com/agentscope-ai/QwenPaw/pull/8855) | 标题指向 Windows 下的时序与编码兼容问题 | 正文摘要主要为模板，具体修改和验证结果仍需核查 |
| [#8854：会话历史支持键盘聚焦](https://github.com/agentscope-ai/QwenPaw/pull/8854) | 将消息滚动区设为具名、可聚焦区域，支持方向键及翻页键滚动 | 改善键盘可访问性，关联修复 [#8844](https://github.com/agentscope-ai/QwenPaw/issues/8844) |

## 3. 社区热点

- **当前唯一可量化的讨论：宽内容被裁切。** [Issue #8856](https://github.com/agentscope-ai/QwenPaw/issues/8856) 有 **1 条评论、0 个赞**。反馈聚焦 Markdown 表格和长行无法完整查看，反映出用户对结构化 AI 输出可读性的直接诉求。
- **开发关注点：控制台操作反馈与授权语义。** [PR #8859](https://github.com/agentscope-ai/QwenPaw/pull/8859) 同时涉及审批、确认和破坏性操作，体现出提升操作可理解性、避免误判执行结果的需求。
- **多话题使用场景：上下文隔离。** [PR #8857](https://github.com/agentscope-ai/QwenPaw/pull/8857) 指向 Telegram 论坛不同话题共享上下文的问题，核心诉求是让渠道内的业务边界与 Agent 会话边界一致。

**热度判断限制**：全部 PR 的评论数均为 `undefined`，不能视为零评论，也无法据此排名；所有已提供条目的点赞数均为 0，暂未出现可量化的高热度议题。

## 4. Bug 与稳定性

以下按**潜在用户影响**排序，并非维护者正式严重性评级：

| 优先级 | 问题与影响 | 是否已有 fix PR |
|---|---|---|
| 较高，待验证 | 确认/审批文案不明确，部分流程过早报告成功或展示陈旧状态，可能影响用户对授权内容和执行结果的判断 | **有**：[PR #8859](https://github.com/agentscope-ai/QwenPaw/pull/8859)，未合并；未提供证据表明存在权限绕过 |
| 较高，场景相关 | Telegram 论坛多个话题共用会话和记忆，存在跨话题上下文混用风险 | **有**：[PR #8857](https://github.com/agentscope-ai/QwenPaw/pull/8857)，未合并 |
| 中 | 表格、长行超出消息容器后直接裁切，缺少横向滚动；报告环境为 QwenPaw `2.3.0.post1`、macOS Apple Silicon、Chrome | **未见对应 PR**：[Issue #8856](https://github.com/agentscope-ai/QwenPaw/issues/8856) 仍开放 |
| 中 | 重连或发送者交接后恢复的历史消息未走预期分页路径 | **有**：[PR #8858](https://github.com/agentscope-ai/QwenPaw/pull/8858)，未合并 |
| 较低 | 会话历史区域无法按预期获得键盘焦点并滚动，影响键盘操作体验 | **有**：[PR #8854](https://github.com/agentscope-ai/QwenPaw/pull/8854)，未合并 |
| 工程质量项 | Windows Plugin SDK 测试时序与编码适配问题；现有信息不足以推断生产运行影响 | **有**：[PR #8855](https://github.com/agentscope-ai/QwenPaw/pull/8855)，未合并 |

本批数据未报告明确的崩溃事件，也不足以确认上述问题是否为近期版本回归。

## 5. 功能请求与路线图信号

- **最明确的功能增量：Telegram 话题级会话隔离。** 已有具体实现提案 [#8857](https://github.com/agentscope-ai/QwenPaw/pull/8857)，因此具备进入后续版本的候选基础；但尚无合并、里程碑或发布承诺。
- **控制台体验正在形成集中改进方向。** [审批交互 #8859](https://github.com/agentscope-ai/QwenPaw/pull/8859)、[历史分页 #8858](https://github.com/agentscope-ai/QwenPaw/pull/8858) 和 [键盘可访问性 #8854](https://github.com/agentscope-ai/QwenPaw/pull/8854) 共同指向更清晰、稳定且易操作的会话界面。这是待审工作体现的方向，并非官方路线图。
- **宽内容横向滚动仍处于需求/缺陷反馈阶段。** [#8856](https://github.com/agentscope-ai/QwenPaw/issues/8856) 有明确现象和环境信息，但未见对应实现，暂不能判断版本归属。

## 6. 用户反馈摘要

可直接引用的用户痛点来自 [Issue #8856](https://github.com/agentscope-ai/QwenPaw/issues/8856)：在 Web 控制台阅读助手生成的表格或长行时，超宽内容被裁切且无法横向滚动，导致回复无法完整查看。报告者还检查了前端资源，指出未发现 `overflow-x-auto`，为定位渲染与样式问题提供了线索，但根因仍需维护者验证。

数据只提供了评论数量，**未提供评论正文**，因此无法提炼评论中的补充场景、维护者回应或用户满意度，也不能将单条报告外推为普遍用户评价。

## 7. 待处理积压与维护建议

**当前样本不支持识别“长期未响应”积压**：所列条目均创建于 11 月 22—23 日，且缺少完整历史与响应记录。建议关注以下近期待办，而非将其定义为陈旧积压：

1. **尽快分诊宽内容裁切问题**：复现 [#8856](https://github.com/agentscope-ai/QwenPaw/issues/8856)，验证表格及长行的滚动行为，并明确修复负责人。
2. **拆解或分阶段审查大型交互改动**：[#8859](https://github.com/agentscope-ai/QwenPaw/pull/8859) 标记为 `XXXL`，建议优先验证审批、取消、失败与成功反馈路径。
3. **验证会话隔离边界**：审查 [#8857](https://github.com/agentscope-ai/QwenPaw/pull/8857) 对论坛话题、普通聊天和回复路由的兼容性。
4. **补齐测试证据与描述**：[#8855](https://github.com/agentscope-ai/QwenPaw/pull/8855) 的摘要仍含模板内容，需说明具体失败用例及 Windows 验证结果。

**健康度结论**：今日贡献主题明确、修复导向较强，并有首次贡献者参与；但未形成已合并成果。后续应重点观察待审 PR 的验证与合并进展，以及新报告的控制台裁切问题是否得到及时响应。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-23** · [项目仓库](https://github.com/zeroclaw-labs/zeroclaw)

> 统计口径：依据提供的过去 24 小时更新列表，包含部分标注为 11 月 22 日的记录。PR 的 `CLOSED` 状态不等同于已合并；本日报不将其直接计入已交付成果。今日无新版本发布，故不单列版本章节。

## 1. 今日速览

ZeroClaw 今日保持较高开发活跃度：**10 条 Issue 更新、15 条 PR 更新，其中 13 条 PR 待合并、2 条已关闭，无 Issue 关闭**。开发重点集中在 Dashboard 向 ACP 迁移、OIDC 账户权限隔离，以及任务级 SSH 凭据授权，体现出协议统一与多用户安全边界建设的方向。与此同时，用户报告了模型切换未生效、自主技能创建不触发等核心行为问题，提示功能扩张之外仍需加强端到端一致性验证。当前更适合将项目状态概括为“**开发投入活跃、架构改造集中，但交付与稳定性闭环尚待验证**”，而非依据关闭数量判断功能已落地。  
相关：[ACP 迁移入口 PR #12654](https://github.com/zeroclaw-labs/zeroclaw/pull/12654) · [模型切换 Issue #12667](https://github.com/zeroclaw-labs/zeroclaw/issues/12667)

## 2. 项目进展

### 已关闭的重要 PR：是否合并尚不明确

| PR | 内容与价值 | 当前可确认结论 |
|---|---|---|
| [#12656：安全依赖更新](https://github.com/zeroclaw-labs/zeroclaw/pull/12656) | 将 `url` 更新至 2.5.9，并更新 `ruma` 及标识符校验依赖，对应 RUSTSEC-2026-0588、0589、0592 | 已关闭；**不能据此确认安全修复已进入主分支** |
| [#12664：贡献流程文档](https://github.com/zeroclaw-labs/zeroclaw/pull/12664) | 补充创建分支前同步 fork 与上游仓库的说明 | 已关闭；是否合并、关闭原因均未提供 |

**交付判断：**现有数据无法确认今日有多少功能或修复实际合并，因此不宜量化“已完成”的推进幅度。可观察到的主要进展是形成了数条较完整的待审实施链路。

### 待合并的关键实施链路

- **Dashboard 与 IDE 的 ACP 路径统一。**五个关联 PR 依次覆盖共享逐轮计费、WebChat 运行时能力对齐、持久会话与旧历史导入、OIDC 身份及断线重放、Dashboard 切换至 `/acp`。这有望减少双协议路径导致的行为分叉，但最后一层仍注明历史导入、流式输出和轮次中途刷新等浏览器实测尚未完成。  
  链接：[#12650](https://github.com/zeroclaw-labs/zeroclaw/pull/12650) → [#12651](https://github.com/zeroclaw-labs/zeroclaw/pull/12651) → [#12652](https://github.com/zeroclaw-labs/zeroclaw/pull/12652) → [#12653](https://github.com/zeroclaw-labs/zeroclaw/pull/12653) → [#12654](https://github.com/zeroclaw-labs/zeroclaw/pull/12654)

- **Dashboard Code 的账户级权限隔离。**三个 PR 分别定义独立 Code agent 授权、将 OIDC 工作区绑定到作用域化核心会话、向获授权账户展示 Code 面板；缺少授权时默认拒绝，且前端草稿和选择状态按账户隔离。该链路仍依赖更早的 #11414。  
  链接：[#12645](https://github.com/zeroclaw-labs/zeroclaw/pull/12645) · [#12646](https://github.com/zeroclaw-labs/zeroclaw/pull/12646) · [#12647](https://github.com/zeroclaw-labs/zeroclaw/pull/12647)

- **SSH 操作纳入凭据授权边界。**新增任务所属 SSH，支持公钥、密码及 PAM 键盘交互认证；由 Rust broker 验证限定授权，并避免凭据进入 shell 命令行。改动跨多个子系统，应重点审查授权失效、凭据生命周期和认证交互边界。  
  链接：[#12659](https://github.com/zeroclaw-labs/zeroclaw/pull/12659)

## 3. 社区热点

**无法按互动热度排名：**所列 10 条 Issue 均为 **0 评论、0 👍**；PR 评论字段为 `undefined`，不能视为零评论，所列 PR 的 👍 均为 0。以下是按议题集中度和潜在影响筛选的关注点，而非“讨论最热”榜单。

- **Google/Gemini 接入路径调整。**新 tracker 称 Gemini CLI 与 Gemini Code Assist 消费级 OAuth 已被 Google 退役，计划转向 API Key、Vertex / Agent Platform、Gemini Enterprise 等受支持路径，并涉及 Antigravity CLI provider。背后诉求是第三方认证变化下的接入连续性；当前列表未提供配套实现 PR。  
  链接：[Issue #12669](https://github.com/zeroclaw-labs/zeroclaw/issues/12669)

- **聊天界面与实际执行结果的一致性。**`/model` 显示切换成功，但请求仍使用 profile 中的模型，说明用户需要的不只是命令反馈，而是可验证的执行状态。  
  链接：[Issue #12667](https://github.com/zeroclaw-labs/zeroclaw/issues/12667)

- **多用户 Dashboard 的权限与会话可靠性。**ACP 和 Code 两组 PR 均围绕身份、账户作用域、会话恢复展开，显示贡献者正在集中解决“谁能访问哪些 agent，以及重连后权限与任务如何保持一致”的问题。  
  链接：[PR #12653](https://github.com/zeroclaw-labs/zeroclaw/pull/12653) · [PR #12646](https://github.com/zeroclaw-labs/zeroclaw/pull/12646)

## 4. Bug 与稳定性

以下按**已标注严重度优先**排列；未标注项独立列出，不擅自赋予等级。“未见 fix PR”仅指本次提供的数据中没有明确关联修复。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **S2** | [`/model` 切换仅表面生效 #12667](https://github.com/zeroclaw-labs/zeroclaw/issues/12667)：后续请求仍使用 profile 配置模型，实际执行与用户选择不一致 | 未见 fix PR |
| **S2** | [自主技能创建不触发 #12655](https://github.com/zeroclaw-labs/zeroclaw/issues/12655)：开启配置无效果且无日志；报告指出工具调用历史格式与提取器预期不一致，并涉及输出目录问题 | 未见 fix PR |
| **S3** | [Dashboard 配对码 Generate 按钮始终 403 #12661](https://github.com/zeroclaw-labs/zeroclaw/issues/12661)：本地登录页提供了无法成功的操作入口 | 未见 fix PR |
| **S3** | [“本月”费用实际为累计费用 #12660](https://github.com/zeroclaw-labs/zeroclaw/issues/12660)：agent 卡片、抽屉与提示文案可能误导预算判断 | 未见 fix PR；不能将计费重构 PR 自动视作修复 |
| **S3** | [`delegate` 静默丢弃未知参数 #12666](https://github.com/zeroclaw-labs/zeroclaw/issues/12666)：与声明的闭合 schema 不一致，降低调用错误的可发现性 | 未见 fix PR |
| **未标注** | [工具结果恢复后缺少名称，Groq 重放失败 #12665](https://github.com/zeroclaw-labs/zeroclaw/issues/12665)：涉及 OpenAI-compatible 原生消息转换 | 需先等待 [PR #12188](https://github.com/zeroclaw-labs/zeroclaw/pull/12188) 落地；未见后续 fix PR |
| **未标注** | [不存在的 channel 仍注册相关工具并触发审批 #12649](https://github.com/zeroclaw-labs/zeroclaw/issues/12649)：报告环境为 Linux arm64、Telegram、supervised 模式，增加无效工具暴露与审批负担 | 未见 fix PR |

**稳定性结论：**本批数据未出现明确的崩溃报告，问题主要集中于静默失效、状态展示失真、协议兼容和工具注册边界。尤其应优先补齐模型选择、自主技能生成的端到端测试与可观测性。  
相关：[#12667](https://github.com/zeroclaw-labs/zeroclaw/issues/12667) · [#12655](https://github.com/zeroclaw-labs/zeroclaw/issues/12655)

## 5. 功能请求与路线图信号

| 方向 | 需求与实现信号 | 对后续版本的判断 |
|---|---|---|
| 有界 agentic delegate 的 thinking level | 允许操作者为显式列出的有界代理目标启用其运行时 profile 的思考等级，不包含单次调用目标 | 目前仅见需求，下一版本是否纳入尚无依据。[#12668](https://github.com/zeroclaw-labs/zeroclaw/issues/12668) |
| Gemini provider 现代化 | 已建立批次 tracker，涉及认证路径替换及 provider 调整 | 外部兼容性驱动较强，但未见实施 PR 或版本承诺。[#12669](https://github.com/zeroclaw-labs/zeroclaw/issues/12669) |
| 删除不可达 Raspberry Pi LED 工具 | Issue 与对应删除 PR 同时存在，清理二进制从未加载的工具及相关代码 | 范围明确、已有实现，是较具体的候选变更；仍待合并。[#12662](https://github.com/zeroclaw-labs/zeroclaw/issues/12662) · [PR #12663](https://github.com/zeroclaw-labs/zeroclaw/pull/12663) |
| 工作区访问权限文档纠正 | 明确 `workspace.access` 是本 agent 访问兄弟 agent 工作区的出站授权，而非入站白名单 | 小范围文档修正，有助于减少权限误配置。[PR #12670](https://github.com/zeroclaw-labs/zeroclaw/pull/12670) |
| Qwen 视频策略的有限例外 | 为 #12578 的文件策略传播及测试提出 runtime holding-crate 例外，并指向未来 `zeroclaw-kernel` 所有者 | 属于架构治理提案，不代表视频功能已交付。[PR #12671](https://github.com/zeroclaw-labs/zeroclaw/pull/12671) |

整体上，ACP、Code 权限和 SSH 授权均已有实现 PR，比仅有 Issue 的需求更接近交付；但缺少合并、测试及发布计划信息，**不能承诺进入下一版本**。

## 6. 用户反馈摘要

由于没有提供 Issue 评论内容，以下仅提炼**报告正文中的直接痛点**，不推断社区满意度：

- **“显示成功”不代表真正成功。**模型切换确认与实际请求不一致，费用时间口径也与标签不符，影响用户对界面状态的信任。  
  链接：[#12667](https://github.com/zeroclaw-labs/zeroclaw/issues/12667) · [#12660](https://github.com/zeroclaw-labs/zeroclaw/issues/12660)
- **静默失效显著增加排障成本。**技能生成无效果且无日志，delegate 未知参数又被静默丢弃，用户难以区分配置错误、调用错误与运行时缺陷。  
  链接：[#12655](https://github.com/zeroclaw-labs/zeroclaw/issues/12655) · [#12666](https://github.com/zeroclaw-labs/zeroclaw/issues/12666)
- **个人部署仍需减少无效交互。**本地 Dashboard 的配对码生成失败，以及 Telegram supervised 环境中无对应 channel 的工具审批，均增加了日常使用摩擦。  
  链接：[#12661](https://github.com/zeroclaw-labs/zeroclaw/issues/12661) · [#12649](https://github.com/zeroclaw-labs/zeroclaw/issues/12649)

本批数据没有可用于判断满意体验的明确正向反馈，不能将零评论或零反应解读为满意或不满。

## 7. 待处理积压与维护提醒

**无法确认长期未响应积压：**当前列表主要创建于 11 月 22—23 日，缺少历史等待时长、维护者响应与评审记录。建议重点跟踪以下依赖和闭环风险：

1. **核实安全修复是否真正落地。**确认已关闭的依赖更新 PR 是合并、替代还是放弃；若由其他 PR 接续，应补充关联，避免误判漏洞已修复。  
   链接：[PR #12656](https://github.com/zeroclaw-labs/zeroclaw/pull/12656)
2. **管理大型堆叠 PR 的审查与集成风险。**ACP 五层改动均为 XL，宜明确逐层验收标准，并补齐历史导入、重连、取消、身份隔离及浏览器验证。  
   链接：[PR #12650](https://github.com/zeroclaw-labs/zeroclaw/pull/12650) · [PR #12654](https://github.com/zeroclaw-labs/zeroclaw/pull/12654)
3. **给条件性修复建立后续追踪。**Groq 重放问题需等待前置 PR 落地，容易在依赖完成后遗漏。  
   链接：[Issue #12665](https://github.com/zeroclaw-labs/zeroclaw/issues/12665) · [PR #12188](https://github.com/zeroclaw-labs/zeroclaw/pull/12188)
4. **优先为核心静默故障建立修复闭环。**模型切换与技能生成两项 S2 问题目前均未见关联 fix PR，值得优先复现、分派并增加回归测试。  
   链接：[Issue #12667](https://github.com/zeroclaw-labs/zeroclaw/issues/12667) · [Issue #12655](https://github.com/zeroclaw-labs/zeroclaw/issues/12655)

**总评：**ZeroClaw 的短期优势是贡献活跃、架构演进方向集中；主要风险是多条跨子系统改造同时待审，而核心行为缺陷尚未展示修复闭环。后续应重点观察“实际合并与验证结果”，而不只看 PR 数量增长。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*