# OpenClaw 生态日报 2026-11-20

> Issues: 41 | PRs: 57 | 覆盖项目: 13 个 | 生成时间: 2026-11-20 04:14 UTC

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
**日期：2026-11-20｜项目：[openclaw/openclaw](https://github.com/openclaw/openclaw)**

> **数据口径**：过去 24 小时共 41 条 Issue 更新、57 条 PR 更新、1 个版本发布。PR 明细仅展示其中 30 条，且评论数字段均为 `undefined`；Release 正文被截断，Issue 评论正文未提供。因此，下文不将“关闭”等同于“已合并/已修复”，也不推断未展示的发布内容或用户评价。

## 1. 今日速览

OpenClaw 今日保持**高活跃度**：41 条 Issue 更新中，34 条处于新开或活跃状态、7 条已关闭；57 条 PR 更新中，40 条待合并、17 条已合并或关闭。新发布的 [v2026.11.6](https://github.com/openclaw/openclaw/releases/tag/v2026.11.6) 重点改善升级衔接与 Windows 插件依赖校验，但同版本也出现压缩会话归档读取失败的 P1 回归报告。研发活动集中于会话与提示词一致性、实时语音运行时适配、Gateway 升级恢复，以及多智能体交互体验。总体来看，项目响应积极、修复供给充足，但会话状态和跨平台升级仍是稳定性压力最大的领域。

## 2. 版本发布

### [v2026.11.6：升级体验与插件校验改进](https://github.com/openclaw/openclaw/releases/tag/v2026.11.6)

**已确认的更新**
- 将 2026.11.5 的更新器衔接至当前发布路径，改善旧版本升级流程，对应 [#200662](https://github.com/openclaw/openclaw/pull/200662)。
- 修正 Windows 上暂存插件依赖的校验，对应 [#200595](https://github.com/openclaw/openclaw/pull/200595)。
- 发布说明另提到“更具韧性的对话”，但正文在子智能体相关内容处截断，无法确认具体机制。

**破坏性变更与迁移注意**
- **所提供片段未披露破坏性变更，不能据此判断完整版本没有破坏性变更。**
- 使用 `*.jsonl.zst` 压缩会话归档的用户，应重点验证历史读取：[#202213](https://github.com/openclaw/openclaw/issues/202213) 报告在 2026.11.6 出现 `ERR_BUFFER_TOO_LARGE`。
- Windows 原生外部插件用户应验证 Gateway 冷启动：[#202210](https://github.com/openclaw/openclaw/issues/202210) 报告固定 15 秒准备超时会拒绝合法插件；该 Issue 已关闭，但资料未说明是否已有可用修复。
- macOS 自定义 Gateway wrapper 用户需额外验证应用更新恢复流程，相关修复 [#202216](https://github.com/openclaw/openclaw/pull/202216) 仍待审。

## 3. 项目进展

### 已进入关闭状态的重要 PR

以下 PR 均显示为 **CLOSED，未提供 merge 信息**；可确认处理流程已有推进，但不能确认代码已进入主分支或发布版本。

| PR | 拟推进的功能或修复 | 状态解读 |
|---|---|---|
| [#202204](https://github.com/openclaw/openclaw/pull/202204) | 为已完成聊天保留工作树至空闲窗口结束，避免重新打开会话时准备失败 | P1，已关闭；需核实是否合并 |
| [#202197](https://github.com/openclaw/openclaw/pull/202197) | 限制后台工作树删除突发负载，减少共享存储上对数据库持久化的干扰 | 已关闭；关注是否实际落地 |
| [#202224](https://github.com/openclaw/openclaw/pull/202224) | 等待排队中的资源清理完成后再报告 Worker 空闲，避免过早触发 GC、缓存刷新 | 已关闭；属于运行时生命周期修复 |
| [#202206](https://github.com/openclaw/openclaw/pull/202206) | Gateway 崩溃后恢复中断的 QuickJS 单元执行 | 已关闭；不能视为恢复能力已交付 |

### 问题处理进展

源码构建缺插件清单导致无法启动的 [#201640](https://github.com/openclaw/openclaw/issues/201640)，以及自动维护跳过静默窗口的 [#202218](https://github.com/openclaw/openclaw/issues/202218) 均已关闭。它们覆盖启动完整性和 SQLite 会话维护两条关键路径，但关闭原因及修复版本仍需核实。

**进展判断**：今日主要是在补强长期运行助手的可靠性底座，而非集中扩展新能力。由于缺少明确的合并记录，不能把统计中的 17 条“已合并/关闭”全部计作交付成果。

## 4. 社区热点

### 可验证的高讨论 Issue

1. **提示词缓存失效：[ #202001](https://github.com/openclaw/openclaw/issues/202001)，9 条评论**  
   同一会话中系统提示词章节增减、重编号，导致后缀摘要变化并使缓存失效；诊断还将其识别为历史重写。背后的诉求是**稳定缓存命中、控制推理成本，并提供准确的诊断信息**。当前仍需更多信息和维护者审阅。

2. **源码构建无法启动：[ #201640](https://github.com/openclaw/openclaw/issues/201640)，5 条评论，已关闭**  
   `dist/extensions` 缺少插件 manifest 与资源，触发配置校验失败、退出码 78。反映开发者对“构建成功即产物可运行”的基本预期。

3. **Windows 插件准备超时：[ #202210](https://github.com/openclaw/openclaw/issues/202210)，3 条评论，已关闭**  
   固定 15 秒超时与合法本地插件初始化耗时不匹配。用户诉求不仅是延长超时，还包括让启动策略适应不同平台。

4. **构建告警导致返回失败：[ #201641](https://github.com/openclaw/openclaw/issues/201641)，3 条评论，仍开放**  
   既有 `INEFFECTIVE_DYNAMIC_IMPORT` 诊断使成功构建返回非零状态，影响触及相关模块的分支通过 CI，暴露贡献者工作流摩擦。

**热度限制**：展示记录的 👍 均为 0，PR 评论数不可用，无法可靠评出“反应最多”或“讨论最多”的 PR。

## 5. Bug 与稳定性

以下按现有优先级标签排序；标签反映分诊状态，不等同于已确认影响范围。

| 严重度 | 问题与影响 | Fix PR / 当前状态 |
|---|---|---|
| **P0，待补充信息** | [#202185](https://github.com/openclaw/openclaw/issues/202185)：Windows、2026.11.10-beta.1 更新失败，标记为发布体验阻断 | 未展示修复 PR；应优先确认日志与复现条件 |
| **P1，回归** | [#202213](https://github.com/openclaw/openclaw/issues/202213)：2026.11.6 无法读取特定压缩会话归档，影响历史访问 | 报告指向 [#192743](https://github.com/openclaw/openclaw/pull/192743)、[#193548](https://github.com/openclaw/openclaw/pull/193548)；其合并和发布状态未提供 |
| **P1** | [#202208](https://github.com/openclaw/openclaw/issues/202208)：电话、会议、FaceTime 咨询忽略 Claude CLI 运行时，报“No API key” | [#202209](https://github.com/openclaw/openclaw/pull/202209) 开放；需补证据并完成安全审查 |
| **P1** | [#202176](https://github.com/openclaw/openclaw/issues/202176)：macOS 临时进程拓扑不完整，导致 Codex 启动整体失败 | 未展示修复 PR；待维护者审阅 |
| **P1** | [#202167](https://github.com/openclaw/openclaw/issues/202167)：macOS 大小写冲突仍影响身份恢复与 Codex 迁移 | 未展示修复 PR；标记为可排队修复 |
| **P2，崩溃** | [#202169](https://github.com/openclaw/openclaw/issues/202169)：macOS Gateway 在 Bun 模块解析中触发 `Alloc(AllocError)` | 未展示修复 PR；缺充分复现信息 |
| **P2，性能/状态** | [#202134](https://github.com/openclaw/openclaw/issues/202134)：插件辅助会话清理在独占 SQLite writer 内扫描孤立记录，单次阻塞约 8.6–13 秒，导致记忆召回超时 | 未展示修复 PR；已有源码复现、修复形态清晰 |
| **P2，升级体验** | [#202215](https://github.com/openclaw/openclaw/issues/202215)：wrapper 位于 `~/.openclaw` 时，Mac 应用更新反复提示需人工协助 | [#202216](https://github.com/openclaw/openclaw/pull/202216) 开放；拟防止新发生，不能自动清除既有失败记录 |
| **P2，上下文管理** | [#202172](https://github.com/openclaw/openclaw/issues/202172)：字节阈值将系统提示词和工具 schema 计入，导致过早压缩；[#202150](https://github.com/openclaw/openclaw/issues/202150)：配置重载后提示词与历史增量发生变化 | 均未展示对应修复 PR |

另需关注语音费用漏记：[#202165](https://github.com/openclaw/openclaw/issues/202165) 已有 [#202171](https://github.com/openclaw/openclaw/pull/202171)，但仍待作者处理兼容性、会话状态相关审阅意见。

## 6. 功能请求与路线图信号

### 已有实现 PR，具备近期落地基础
- **读后自动清除浏览器通知**：请求 [#202178](https://github.com/openclaw/openclaw/issues/202178)，实现 [#202214](https://github.com/openclaw/openclaw/pull/202214)。适用于 Android PWA 等场景，仍需补充证据并评估消息投递风险。
- **实时语音 token 与成本统计**：请求 [#202165](https://github.com/openclaw/openclaw/issues/202165)，实现 [#202171](https://github.com/openclaw/openclaw/pull/202171)。补齐语音助手运营可观测性，但尚不能承诺进入下一版本。
- **邀请访客前校验沙箱可用性**：[ #202230](https://github.com/openclaw/openclaw/pull/202230) 将隔离环境检查前置，体现多人使用场景下的部署可靠性需求。
- **私有模板草稿内登录 ClawHub**：[ #202013](https://github.com/openclaw/openclaw/pull/202013) 已标记证据充分、待维护者查看；属于较具体的创作者流程改善。

### 尚处需求或产品决策阶段
- **延迟远程 MCP 发现**：[ #202199](https://github.com/openclaw/openclaw/issues/202199)，减少新 Codex 对话开始前的网络等待。
- **媒体保留与自动清理策略**：[ #202137](https://github.com/openclaw/openclaw/issues/202137)，解决生成媒体长期累积。
- **支持 GPT-Live-1.1 API 模型**：[ #202123](https://github.com/openclaw/openclaw/issues/202123)，已有源码复现和清晰修复形态，但未展示实现 PR。
- **Workboard 遵循代理模型配置**：[ #202138](https://github.com/openclaw/openclaw/issues/202138)，要求消除按钮硬编码模型与用户策略之间的不一致。

**路线图信号**：需求正从“增加接入能力”转向“统一配置语义、减少隐性成本、改善长期运行体验”。

## 7. 用户反馈摘要

*以下来自 Issue 描述，不是对未提供评论正文的转述。*

- **“文本正常，语音却不能工作”**：同一代理的文字和 Discord 语音可用，但电话、会议、FaceTime 咨询失败，说明用户希望不同入口共享同一运行时和凭据语义。[#202208](https://github.com/openclaw/openclaw/issues/202208)
- **长期运行产生看不见的开销**：默认 Proactive 检查在没有 owner route 时仍每 30 分钟执行完整模型回合；实时语音费用又未计入统计，增加成本判断难度。[#202146](https://github.com/openclaw/openclaw/issues/202146)、[#202165](https://github.com/openclaw/openclaw/issues/202165)
- **个人助手需要完整的数据生命周期管理**：有用户报告约 10 周积累 954 MB、706 个媒体文件；另有备份在写入 32.8 GB 后才发现大小写冲突。痛点是缺少清理策略和昂贵操作前的预检查。[#202137](https://github.com/openclaw/openclaw/issues/202137)、[#202159](https://github.com/openclaw/openclaw/issues/202159)
- **用户需要可解释的失败信息**：自动压缩成功后随即中止，却只展示模糊错误；Worker 失败也可能被“channel closed”掩盖。相比单纯提示失败，用户更需要原因、已完成工作和恢复路径。[#202152](https://github.com/openclaw/openclaw/issues/202152)、[#202022](https://github.com/openclaw/openclaw/issues/202022)

数据未提供明确的正面满意度评论，不宜将关闭 Issue 直接解读为用户满意。

## 8. 待处理积压

本批记录主要创建于 11 月 19–20 日，**无法认定哪些条目“长期未响应”**。更适合将以下内容列为重点跟踪队列：

- **稳定版归档回归的交付闭环**：确认 [#202213](https://github.com/openclaw/openclaw/issues/202213) 所引用修复是否已合并、何时进入稳定版，并补充高压缩比归档测试。
- **已关闭问题再次暴露**：[ #202167](https://github.com/openclaw/openclaw/issues/202167) 明确关联此前关闭的 [#174089](https://github.com/openclaw/openclaw/issues/174089)，应复核旧修复覆盖范围及迁移测试。
- **跨入口语音运行时一致性**：推进 [#202209](https://github.com/openclaw/openclaw/pull/202209) 的安全审查，避免为修复认证问题引入会话或安全边界风险。
- **待维护者查看的上下文正确性修复**：[ #201838](https://github.com/openclaw/openclaw/pull/201838) 防止 cron 回复重复进入模型上下文；[#201843](https://github.com/openclaw/openclaw/pull/201843) 防止投影后的提示词更新混入后续用户轮次，均值得优先审阅。

### 健康度结论

**活跃度高，修复响应积极；稳定性交付仍需重点观察。** 当前最值得优先投入的不是更多入口，而是压缩归档兼容性、提示词与会话状态一致性、跨平台升级恢复，以及语音运行时和费用统计的统一。明确标注“已关闭、已合并、已发布”的区别，将有助于减少社区误判，也能让高强度开发活动更可靠地转化为用户可感知的稳定性提升。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**观察日期：2026-11-20｜覆盖 13 个项目**

> **口径说明**：本报告仅基于所给近 24 小时快照。Issue/PR 数为更新条目数，不等于新增数量；`CLOSED` 不等于已合并，提交量不等于交付量。部分项目明细不完整，社区规模、长期趋势及架构判断均限于现有证据。

## 1. 生态全景

个人 AI 助手开源生态的竞争焦点，正在从“支持多少模型和工具”转向“能否可靠地长期运行”：会话连续性、异常恢复、消息不丢失和成本可观测性成为共同议题。13 个项目合计记录 **101 条 Issue 更新、122 条 PR 更新和 3 个版本发布**，其中 OpenClaw 与 Hermes Agent 占 Issue 更新约 **90%**、PR 更新约 **88%**，可见活动高度集中。功能扩展仍在继续，但多 Profile、多入口、插件与本地推理也带来了更复杂的状态和权限边界。安全治理正从核心运行时延伸至技能文档、凭据配置、二进制下载和依赖供应链；同时，多数项目缺少完整合并、验证与落版信息，**“有修复提案”与“用户已获得修复”之间仍存在交付可见性缺口**。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release 情况 | 当日健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 41 | 57 | **v2026.11.6** | 高活跃，修复提案充足；归档回归、会话状态与跨平台升级承压 |
| **Hermes Agent** | 50 | 50 | **v0.23.3**，11 月 19 日发布、纳入窗口 | 高活跃，插件供给持续；Desktop、多 Profile、Telegram 可靠性需收敛 |
| **NanoClaw** | 6 | 4 | **v2026.11.0-rc.3** | 候选版收尾，安装升级与供应链加固并行；参与集中于少数贡献者 |
| **CoPaw** | 3 | 3 | 无 | 小步维护；Windows 推理进程残留影响较大，OAuth 修复待审 |
| **ZeroClaw** | 1 | 5 | 无 | 权限与维护治理持续推进；Telegram 消息阻断尚未见直接修复 |
| **NanoBot** | 0 | 2 | 无 | 局部质量维护；主题一致性与测试有效性改善，交付结果待核实 |
| **LobsterAI** | 0 | 1 | 无 | 低活跃但有明确安全价值；技能 API Key 保护修复待合并 |
| PicoClaw | 0 | 0 | 无 | 本窗口无活动，无法评价长期健康度 |
| NullClaw | 0 | 0 | 无 | 同上 |
| IronClaw | 0 | 0 | 无 | 同上 |
| TinyClaw | 0 | 0 | 无 | 同上 |
| Moltis | 0 | 0 | 无 | 同上 |
| ZeptoClaw | 0 | 0 | 无 | 同上 |
| **合计** | **101** | **122** | **3 个版本** | 活动集中，可靠性与治理成为主线 |

**数据注意事项：**
- OpenClaw 仅展示 30/57 条 PR；Hermes 仅展示 30/50 条 Issue、20/50 条 PR，不能据此计算完整修复覆盖率或合并率。
- NanoClaw 条目指向 `nanocoai/nanoclaw`，CoPaw 条目指向 `agentscope-ai/QwenPaw`，与所列项目地址不一致；正式选型前需核实仓库归属。
- 无活动仅代表本次窗口未记录更新，**不代表停更或成熟稳定**。

## 3. OpenClaw 在生态中的定位

### 3.1 优势：综合个人助手平台的覆盖广度

OpenClaw 当日 **57 条 PR 更新为样本最高**，活动覆盖 Gateway、会话归档、提示词、语音、浏览器通知、多智能体、工作树和跨平台升级。相比只围绕少数维护点活动的项目，其优势是能够同时处理多个端到端工作流，已有较丰富的修复提案和问题分诊。

不过，广度也带来更大的集成面：文本正常而电话入口认证失败、配置重载改变提示词、维护任务阻塞记忆召回等问题，说明其主要挑战已不是单点能力不足，而是**多个子系统能否共享一致的状态、配置与生命周期语义**。

### 3.2 与主要同类的路线差异

| 对比对象 | OpenClaw 的相对特点 | 对方当日更突出的方向 |
|---|---|---|
| **Hermes Agent** | Gateway、长期会话、语音运行时与跨平台运维问题更突出 | Desktop、多 Profile、插件发行与跨聊天协作 |
| **NanoClaw** | 能力面与集成复杂度更广 | 安装升级、技能兼容性、供应链可复现性 |
| **ZeroClaw** | 更聚焦综合助手运行体验与状态一致性 | 浏览器凭据细粒度授权、Telegram 访问策略、依赖治理 |
| **CoPaw** | 多入口与长期运行链路更丰富 | 本地推理、控制台体验、MCP OAuth 与群组会话划分 |
| **NanoBot / LobsterAI** | 当日可见开发范围显著更大 | 分别集中于 WebUI/测试质量、技能凭据保护 |

上述是**本次活动体现的工程重心**，不代表完整功能清单或能力优劣排名。

### 3.3 社区规模：可见活跃度领先，但不能等同用户规模

OpenClaw 与 Hermes 构成当日第一梯队：前者 PR 更新更多，后者 Issue 更新更多。OpenClaw 可见最高讨论 Issue 有 **9 条评论**，Hermes 为 **3 条**，但样本截断且 PR 评论数缺失，不能据此得出长期讨论热度结论。

缺少 Stars、活跃贡献者数、下载量和留存数据，因此只能判断 **OpenClaw 处于当日开发活动领先位置**，不能认定其实际社区规模或用户基数最大。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求与技术含义 |
|---|---|---|
| **会话连续性与隔离** | OpenClaw、Hermes、CoPaw | 归档可读、提示词不漂移、Profile 不串扰、拒答后历史保留、Telegram 按 topic 独立上下文 |
| **长期运行与故障隔离** | OpenClaw、Hermes、CoPaw、ZeroClaw | SQLite 维护不阻塞召回、断线重连不耗尽资源、推理子进程可回收、单条失败消息不阻塞队列 |
| **认证与凭据生命周期** | OpenClaw、Hermes、CoPaw、LobsterAI、ZeroClaw | 不同入口共享运行时与凭据语义、OAuth 端到端成功、轮换令牌持久化、避免明文密钥痕迹、浏览器最小权限 |
| **上下文与成本效率** | OpenClaw、Hermes | 提示词缓存稳定、压缩阈值准确、token 统计完整、工具 schema 按需加载、本地模型减少重复写入 |
| **插件与供应链治理** | NanoClaw、Hermes、ZeroClaw、OpenClaw | 固定版本与摘要校验、原生资产兼容性验证、依赖监测、插件冷启动与构建产物完整性 |
| **本地模型使用体验** | CoPaw、Hermes | Apple Silicon 接入、本地推理生命周期、小上下文窗口工具开销与执行效率 |
| **有效测试与升级验证** | NanoBot、NanoClaw、CoPaw、OpenClaw、Hermes | 测试能真实识别回归；升级覆盖技能组合、多 Profile、历史数据与平台差异 |

最值得注意的是：**相同问题跨越不同技术栈反复出现**。例如消息重试、子进程残留和 SQLite 写锁问题，本质上都属于常驻服务的可靠性工程，而非模型能力问题。

## 5. 差异化定位分析

以下定位依据本次功能与故障场景归纳；输入不足以全面比较语言、性能、部署体积或底层架构。

| 项目 | 可见功能侧重 | 主要适用人群/场景 | 架构与集成层面的关键观察 |
|---|---|---|---|
| **OpenClaw** | 多入口综合助手、多智能体、语音与自动化 | 需要长期运行、多渠道交互及复杂工作流的用户 | Gateway、会话存储、插件与多运行时协同；集成边界较多 |
| **Hermes** | Desktop/CLI、多 Profile、插件与跨会话协作 | 重度桌面用户、多个身份/配置并行使用者、插件开发者 | Desktop 与 CLI 初始化、Profile 注册及共享安装链路的一致性是重点 |
| **NanoClaw** | 技能安装、容器工具、版本发布 | 重视安装可复现与升级可控的部署者 | 技能引入的合法配置、二进制与镜像供应链需要统一治理 |
| **ZeroClaw** | Telegram 接入、浏览器凭据授权 | 通信入口与敏感浏览器操作并重的部署者 | 精确 HTTPS origin 授权、密码/TOTP 分权，以及消息 offset 策略 |
| **CoPaw** | 控制台、本地推理、MCP 与 Telegram | 本地模型用户及群组助手部署者 | 外部推理进程管理、OAuth 持久化、话题级会话边界 |
| **NanoBot** | WebUI 配置体验与内部质量维护 | 本次可确认的是交互配置场景，目标用户证据有限 | 共享 UI 组件与测试有效性；不足以推断整体架构 |
| **LobsterAI** | 第三方笔记技能集成 | 有道云笔记接入用户 | 技能指令与配置文档也是凭据安全边界 |
| **其余六项目** | 本窗口无新增证据 | 无法据此判断 | 不宜基于项目名称或静默状态推断架构与定位 |

## 6. 社区热度与成熟度

### 第一层：高频迭代，功能扩张与稳定性收敛并行
**OpenClaw、Hermes Agent**

- 两者都具备高提交量和版本发布活动。
- OpenClaw 当日更偏可靠性补强；Hermes 在插件、跨聊天和原生资产安装方向仍有明显扩张。
- 高影响故障横跨持久化、认证、连接恢复和客户端状态，说明系统复杂度已成为核心工程约束。
- Hermes v0.23.3 汇总约 **370 个已合并 PR**，但详细说明不足；补丁版标签本身不能替代升级风险评估。

### 第二层：有明确维护主题的质量巩固
**NanoClaw、ZeroClaw、CoPaw**

- NanoClaw 有候选版到稳定版的明确收敛路径。
- ZeroClaw 重点推进权限与维护流程，同时面临 Telegram 阻断问题。
- CoPaw 以小规模修复为主，本地推理异常恢复和 OAuth 续期是关键。

### 第三层：局部专项维护
**NanoBot、LobsterAI**

活动量较低，但分别触及测试有效性和凭据保护，不能简单视作低价值工作。当前证据不足以评价长期交付效率。

### 第四层：单日观察不足
**PicoClaw、NullClaw、IronClaw、TinyClaw、Moltis、ZeptoClaw**

需要结合至少数周的提交、发布、维护者响应和问题关闭原因再作判断。

**成熟度应看交付闭环，而非单日热度。** 更有价值的指标是：高影响问题恢复时间、回归率、升级成功率，以及修复从提交到发布的可追踪性。

## 7. 值得关注的趋势信号

### ① 智能体正在成为常驻服务，而非一次性对话工具
网络断开、数据库维护、资源清理和子进程退出，都会影响用户能否持续使用助手。

**开发参考**：把故障隔离、有限重试、资源回收和恢复测试列为基础能力；优先验证“依赖失败后服务还能做什么”。

### ② 上下文管理正在演变为配置与状态一致性工程
OpenClaw 的缓存失效、压缩阈值，Hermes 的 token usage、本地模型 schema 开销，以及 CoPaw 的 topic 隔离，均说明上下文不仅是 token 数量问题。

**开发参考**：明确系统提示词、历史、工具定义和摘要的版本及边界，记录每次上下文变化的来源与成本。

### ③ 安全边界已扩展到整个工具接入链路
LobsterAI 的技能配置、NanoClaw 的下载与镜像、ZeroClaw 的浏览器授权、CoPaw 的令牌轮换，覆盖从安装到执行的完整生命周期。

**开发参考**：除代码审计外，还应审查技能指令、日志、命令参数、下载完整性和撤权流程。相关加固建议不等于已发生泄露或可利用漏洞。

### ④ 多 Profile、多入口使“同一配置、同一行为”更难保证
文字与电话、Desktop 与 CLI、主 Profile 与次级 Profile，已出现行为不一致。

**开发参考**：集中管理模型选择、凭据和工具注册语义，建立跨入口一致性测试，而不是仅测试每个入口单独可用。

### ⑤ 成本透明度成为个人助手的产品能力
后台主动检查、实时语音漏记、本地模型工具开销，都会产生用户难以察觉的成本。

**开发参考**：将费用、token、后台任务频率和压缩原因做成可查询指标；本地部署也要统计延迟、内存和重复工作。

### ⑥ 版本可解释性将影响用户信任
关闭状态不明确、发布说明截断、修复落版关系缺失，会直接增加升级决策成本。

**开发参考**：建立 **Issue → PR → 合并提交 → Release → 验证结果** 的可追踪链路，并为高风险工作流提供升级前检查和回滚说明。

---

## 综合判断

**OpenClaw 与 Hermes 是当日最值得持续跟踪的综合平台，但高活跃度不代表低风险。** 前者应重点验证历史归档、提示词一致性与跨入口运行时；后者应重点验证 Desktop、多 Profile 和 Telegram 长期运行。NanoClaw、ZeroClaw、CoPaw 分别提供了供应链治理、细粒度授权和本地推理运维的重要观察窗口。

对技术选型者而言，下一阶段最具区分度的指标不是功能数量，而是：**关键工作流成功率、故障后的恢复能力、成本透明度，以及修复能否可靠到达用户。**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-20**  
**项目：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)**

## 1. 今日速览
过去 24 小时，NanoBot 有 **2 条 PR 更新、0 条 Issue 更新、0 个新版本发布**，可见活跃度较低，工作集中在 WebUI 体验修复与内部代码清理。两条 PR 均由同一位贡献者提交，其中 1 条待合并、1 条已关闭。今日没有可确认的新功能落地，整体呈现小步维护状态。需要注意，已关闭 PR 的数据未注明是否合并，评论数也缺失，因此无法据此判断代码交付量或社区讨论热度。  
来源：[项目仓库](https://github.com/HKUDS/nanobot) · [PR #6730](https://github.com/HKUDS/nanobot/pull/6730) · [PR #6729](https://github.com/HKUDS/nanobot/pull/6729)

## 2. 项目进展

### 内部代码与测试清理：PR 已关闭，是否合并待核实
[PR #6729 — refactor: remove unreachable code and redundant tests](https://github.com/HKUDS/nanobot/pull/6729)  
**状态：CLOSED｜标签：channel、webui、refactor、test、priority: p2**

- **变更方向**：清理调用方无法触达的内部路径，以及无法有效保护目标行为的冗余测试。
- **关键发现**：PR 摘要指出，旧的原子写入测试即使将写入器替换为空操作仍然能够通过，说明该测试对相关回归的检测能力不足。
- **价值判断**：若变更已合入，有助于降低维护复杂度、减少测试“虚假安全感”；但当前仅能确认 PR 已关闭，**不能认定这些改进已经进入主分支**。

**整体进展评估**：今日主要是局部质量维护，而非能力扩展。现有数据不足以确认已合入成果，不能将关闭 PR 计为已交付功能。  
来源：[PR #6729](https://github.com/HKUDS/nanobot/pull/6729)

## 3. 社区热点

**今日无法可靠评出“讨论最活跃”条目**：没有 Issue 更新，两条 PR 的评论数均为 `undefined`，点赞数均为 0。以下是变更关注点，而非热度排名。

| 条目 | 核心诉求 | 可见互动 |
|---|---|---|
| [#6730：推理强度选择器主题修复](https://github.com/HKUDS/nanobot/pull/6730) | 避免浏览器原生下拉列表与 WebUI 主题不一致，改善设置界面的视觉统一性 | 评论数缺失，👍 0 |
| [#6729：不可达代码与冗余测试清理](https://github.com/HKUDS/nanobot/pull/6729) | 减少内部维护负担，让测试真正具备回归检测价值 | 评论数缺失，👍 0 |

两项工作分别指向**用户界面一致性**与**工程质量**；目前没有证据表明它们已形成广泛社区讨论。

## 4. Bug 与稳定性

### P2：自定义推理强度选择器主题不一致
**已有 fix PR，尚未合并。**  
[PR #6730 — fix(webui): theme the custom reasoning effort picker](https://github.com/HKUDS/nanobot/pull/6730)

- **触发条件**：当前会话的推理强度值不在模型提供的有序等级列表中。
- **问题表现**：模型预设菜单使用浏览器原生下拉框；当 WebUI 与系统主题不一致时，展开列表的视觉风格不协调。
- **修复方案**：摘要显示拟改用 WebUI 共享的 `Select` 组件。
- **影响判断**：属于界面体验问题，未见崩溃、数据丢失或推理执行失败的报告。

### 测试有效性隐患：原子写入测试无法识别空操作
[PR #6729](https://github.com/HKUDS/nanobot/pull/6729) 暴露了测试保护不足的问题。**这不是已确认的运行时写入故障**，但可能削弱对相关回归的发现能力。该 PR 已关闭，具体处理是否合入仍需核实。

## 5. 功能请求与路线图信号

今日没有新增功能请求或活跃 Issue，无法识别明确的用户需求新增趋势。可见 PR 反映出两个短期维护方向：

- **统一 WebUI 组件与主题行为**：[#6730](https://github.com/HKUDS/nanobot/pull/6730) 若合并，可能进入后续版本，但暂无发布计划或版本归属信息。
- **清理内部实现并提升测试有效性**：[#6729](https://github.com/HKUDS/nanobot/pull/6729) 属于工程维护信号，不代表新增面向用户的能力；是否落地尚待确认。

## 6. 用户反馈摘要

**今日没有可供提炼的 Issue 评论数据**，因此无法总结真实用户的满意度、不满情绪或使用频率。

仅从 [PR #6730](https://github.com/HKUDS/nanobot/pull/6730) 的问题描述，可以识别一个具体使用场景：会话保留了模型预设列表之外的推理强度配置，同时 WebUI 主题与操作系统主题不同，导致选择器外观不一致。这是贡献者描述的体验问题，**不应外推为普遍用户反馈**。

## 7. 待处理积压

**当前数据不足以识别长期未响应的积压项**：两条 PR 均于今日创建并更新，没有历史 Issue 或长期待审 PR 信息。

建议维护者关注：

- **审查待合并修复**：[PR #6730](https://github.com/HKUDS/nanobot/pull/6730)，重点验证异常推理强度值的兼容性，以及不同主题下的显示效果。
- **核实关闭结果**：[PR #6729](https://github.com/HKUDS/nanobot/pull/6729)，确认是已合并、被替代还是未采纳，避免将“已关闭”误计为“已完成”。

**健康度结论**：今日可见工作偏向有针对性的质量维护，方向积极，但活动范围有限。缺少合并状态、CI 结果和评论数据，暂不足以判断整体交付效率及社区响应健康度。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-20**  
**项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)**

> **数据口径**：过去 24 小时有 50 条 Issue、50 条 PR 更新；本日报可分析的明细为其中 30 条 Issue、20 条 PR。Issue 评论正文未提供，PR 评论数为 `undefined`；以下用户反馈依据提交者描述归纳，不代表评论共识。`CLOSED` 不等同于已合并，未展示的信息均不作推断。

## 1. 今日速览

- **开发与社区提交活跃，但当日交付闭环有限**：50 条 Issue 均为新开或活跃状态，未见关闭；50 条 PR 中 49 条待合并、1 条已合并或关闭，不能据此计算合并率或判断长期积压趋势。[Issues](https://github.com/NousResearch/hermes-agent/issues) · [PRs](https://github.com/NousResearch/hermes-agent/pulls)
- **v0.23.3 成为新的稳定发布落点**，将 v0.23.2 以来约 370 个已合并 PR 汇入发布包；详细策划版说明留待 v0.24.0 发布。[发布说明](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.3)
- **稳定性压力集中在 Desktop、多 Profile、Telegram 与会话生命周期**，包括升级后崩溃、工具缺失、离线消息丢弃及重连资源增长。不同报告涉及不同版本与环境，不能全部归因为本次升级。[#158086](https://github.com/NousResearch/hermes-agent/issues/158086) · [#158080](https://github.com/NousResearch/hermes-agent/issues/158080)
- **功能侧继续扩展插件生态与跨会话协作**，同时出现面向本地模型的上下文成本、文件重复写入等效率诉求。整体呈现“生态扩张活跃、可靠性仍需收敛”的状态。[PR #158096](https://github.com/NousResearch/hermes-agent/pull/158096) · [#158051](https://github.com/NousResearch/hermes-agent/issues/158051)

## 2. 版本发布

### v0.23.3：大规模变更的补丁版汇总
**发布日期：2026-11-19；纳入本次日报窗口。**  
[GitHub Release](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.3)

| 项目 | 已知信息 |
|---|---|
| 发布定位 | Patch release，汇总 v0.23.2 以来约 370 个已合并 PR |
| 发布渠道 | GitHub Release（CLI、安装器）、Microsoft Store 应用、Docker、Hermes Cloud |
| 详细更新内容 | 当前说明未逐项列出，完整策划版说明计划随 v0.24.0 提供 |
| 破坏性变更 | **未披露，不能据此认定不存在** |
| 迁移要求 | 未提供明确迁移步骤或兼容性矩阵 |

**升级注意事项：**

- 多 Profile Desktop 用户宜先验证启动、Profile 切换和会话恢复。已有用户报告 runtime 0.23.3 与同期 Desktop 更新后发生渲染进程循环崩溃，环境为 macOS、26 个 Profile；影响范围尚未确认。[#158086](https://github.com/NousResearch/hermes-agent/issues/158086)
- 使用 `dashboard.turn_isolation` 的用户应验证 MCP 工具可见性：目前有 Desktop 整个会话缺失 MCP 工具、同配置 CLI 正常的报告；材料未明确其适用版本范围。[#158065](https://github.com/NousResearch/hermes-agent/issues/158065)
- 建议采用小范围升级与关键工作流回归测试，而非仅依据“补丁版”判断风险。这是基于本次变更规模与上述报告的操作建议，并非官方迁移要求。[发布说明](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.3)

## 3. 项目进展

### 已关闭条目：官方插件目录更新，但合并状态未确认

**[PR #158093](https://github.com/NousResearch/hermes-agent/pull/158093)** 将 memory-wiki、bubblewrap、Home Assistant、Spotify、camofox 五个官方插件的目录引用更新到新的固定提交，并同步相关版本信息。

- **推进方向**：让目录安装能够获取上游插件的第二批修复。
- **状态边界**：该 PR 显示 `CLOSED`，材料没有 merged 标记，不能认定修复已通过此 PR 交付。
- **实际进展判断**：当日最明确的交付是 v0.23.3 发布；可见 PR 明细不足以证明有多少新增修复在当日完成合并。[v0.23.3](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.3)

### 值得跟踪的待合并修复

| PR | 拟解决的问题及价值 | 状态 |
|---|---|---|
| [#158089](https://github.com/NousResearch/hermes-agent/pull/158089) | 识别非标准位置的 token usage，避免计数为零影响用量显示、上下文占用和压缩触发 | OPEN |
| [#158084](https://github.com/NousResearch/hermes-agent/pull/158084) | 识别服务端标记的重复循环响应，避免继续展示循环文本或执行其中工具调用 | OPEN |
| [#158095](https://github.com/NousResearch/hermes-agent/pull/158095) | 防止技能目录并发回滚后，已删除的临时技能仍进入缓存 | OPEN |
| [#158088](https://github.com/NousResearch/hermes-agent/pull/158088) | 为 Desktop 合成搜索结果补齐 Profile 信息，改善多 Profile 会话定位 | OPEN |
| [#158083](https://github.com/NousResearch/hermes-agent/pull/158083) | `/learn` 改用路由状态传递笔记，避免写入浏览器历史，并规范终端输入 | OPEN |

**总体判断**：修复覆盖运行时正确性、隐私与多 Profile 一致性，但目前应视为“修复储备”，不能计入已发布成果。

## 4. 社区热点

当前可见讨论量整体不高，热点主要由使用影响而非大量互动构成。

| 议题 | 互动数据 | 背后诉求 |
|---|---:|---|
| [#158023：群聊 `@user` 不触发 “needs you”](https://github.com/NousResearch/hermes-agent/issues/158023) | **3 评论**，👍0 | 本次可见 Issue 中评论最多；用户需要可靠的“需要人工判断”升级通知，而非仅在聊天正文中出现提及 |
| [#158094：首轮被安全拒绝后会话消失](https://github.com/NousResearch/hermes-agent/issues/158094) | 1 评论，👍0 | 即使模型拒答，用户也希望保留输入与会话痕迹，保持历史可解释性 |
| [#157984：Windows Telegram 重连资源增长](https://github.com/NousResearch/hermes-agent/issues/157984) | 1 评论，👍0 | 常驻助手必须能承受外部网络故障，不能拖累整个操作系统 |
| [#158003：Square MCP OAuth 授权后仍登录失败](https://github.com/NousResearch/hermes-agent/issues/158003) | 1 评论，👍0 | 浏览器显示授权成功不等于集成可用，用户期待端到端完成认证 |
| [#158040：Hooks 注入位置与触发顺序文档矛盾](https://github.com/NousResearch/hermes-agent/issues/158040) | 1 评论，👍0 | 插件开发者需要准确理解上下文注入和压缩顺序，避免依赖错误行为 |

**PR 热度不可排序**：可见 PR 的评论数均缺失、👍均为 0，因此不能称某条 PR 为“讨论最热”。

## 5. Bug 与稳定性

以下按**潜在影响**排序，不改变原始标签；多数条目原标 P2。表中“未见 fix PR”仅表示本次提供的明细未展示直接对应修复。

| 关注级别 | 问题与影响 | 修复状态 |
|---|---|---|
| **高：系统资源风险** | Windows Telegram 无法联网时，重连期间 Python 进程虚拟内存被报告增长至约 **17.5 GB**，并引发系统低内存卡顿；尚不能仅凭摘要确定泄漏根因。[#157984](https://github.com/NousResearch/hermes-agent/issues/157984) | 未见直接 fix PR |
| **高：客户端不可用** | macOS 多 Profile 环境在升级后出现 Desktop renderer crash-loop，涉及 `unreadFinishedSessions` 状态类型异常。[#158086](https://github.com/NousResearch/hermes-agent/issues/158086) | 未见直接 fix PR |
| **高：消息丢失** | 多路复用下的次级 Profile 在初次连接时错误拒绝离线期间排队的 Telegram 群消息。[#158080](https://github.com/NousResearch/hermes-agent/issues/158080) | 未见直接 fix PR |
| **高：核心工具不可用** | 开启 `dashboard.turn_isolation` 后，Desktop 会话缺失全部 MCP 工具，而 CLI 正常。[#158065](https://github.com/NousResearch/hermes-agent/issues/158065) | 未见直接 fix PR |
| **高：Profile 功能失效** | 并发首次查询可能清除 Profile 的 provider 插件注册，导致 Unknown provider 或回退模型。[#157976](https://github.com/NousResearch/hermes-agent/issues/157976) | 未见直接 fix PR；[#158097](https://github.com/NousResearch/hermes-agent/pull/158097) 修复的是 Windows 快照重命名，不能视为同一问题 |
| **中高：连接恢复失败** | Telegram fallback 不在 HTTP 502 / ReadTimeout 时切换路径，报告称可能离线超过一小时。[#158072](https://github.com/NousResearch/hermes-agent/issues/158072) | 未见直接 fix PR |
| **中高：新建会话失败** | Windows v0.23.2 新聊天返回 `storage_unavailable`；另有 Home 页面把 `/resume` 当作 cwd 导致 `invalid_params`。[#158085](https://github.com/NousResearch/hermes-agent/issues/158085) · [#158054](https://github.com/NousResearch/hermes-agent/issues/158054) | 均未见直接 fix PR |
| **中：交互状态丢失** | API 错误重试退避期间的中断消息被丢弃；首轮安全拒绝后会话从侧栏消失。[#157945](https://github.com/NousResearch/hermes-agent/issues/157945) · [#158094](https://github.com/NousResearch/hermes-agent/issues/158094) | 均未见直接 fix PR |
| **中：模型与认证一致性** | 编辑 `model.default` 会改变部分已打开聊天的模型；Desktop 重连时向自定义端点发出未认证探测并产生 401。[#158081](https://github.com/NousResearch/hermes-agent/issues/158081) · [#158099](https://github.com/NousResearch/hermes-agent/issues/158099) | 均未见直接 fix PR |
| **中：性能与结果可见性** | 远端回传打包缓存导致慢链路超时；后台完成通知可能被截断到 0 字符；CLI 启动被报告耗时 5.9–9.8 秒。[#157993](https://github.com/NousResearch/hermes-agent/issues/157993) · [#158043](https://github.com/NousResearch/hermes-agent/issues/158043) · [#158047](https://github.com/NousResearch/hermes-agent/issues/158047) | 均未见直接 fix PR |

**健康度信号**：问题并非只集中在界面细节，而是跨越连接恢复、状态持久化、Profile 隔离和工具加载链路，适合以端到端场景补充回归测试，而不只是逐项修补。

## 6. 功能请求与路线图信号

### 已有实现 PR，具备较明确的近期推进信号
*不等于已承诺进入下一版本。*

- **跨聊天引用**：在 Desktop `@` 菜单中选择其他会话，不再依赖从侧栏拖拽，增强多会话上下文复用。[PR #158096](https://github.com/NousResearch/hermes-agent/pull/158096)
- **原生插件发行资产安装**：CLI 与 Desktop 共用安装器，按后端 OS/CPU 选择已审核的原生资产，并校验系统基线与归档摘要。[PR #158077](https://github.com/NousResearch/hermes-agent/pull/158077)
- **插件目录继续扩展**：实时语音 z0live、instabox 执行后端、Slack History 等均已有开放 PR，显示生态正在补齐语音、执行环境与通信上下文能力。[#158091](https://github.com/NousResearch/hermes-agent/pull/158091) · [#158087](https://github.com/NousResearch/hermes-agent/pull/158087) · [#158074](https://github.com/NousResearch/hermes-agent/pull/158074)

### 尚处需求阶段，下一版落地证据不足

- **小窗口本地模型优化**：提交者测得特定模型配置中，工具 schema 占新提示词约 77%，希望 `tool_search.defer` 能按上下文窗口调整。该数据不能推广到所有模型。[#158051](https://github.com/NousResearch/hermes-agent/issues/158051)
- **降低本地模型重复写文件成本**：提交者在特定 terminal-bench 测试中观察到大量重复 `write_file`，希望改进重写提示策略。[#158050](https://github.com/NousResearch/hermes-agent/issues/158050)
- **自动化并发控制**：Kanban `schedule` / `block` 增加预期状态约束，避免外部扫描结束自己未观察到启动的任务运行。[#158076](https://github.com/NousResearch/hermes-agent/issues/158076)
- **减少只读 CLI 开销**：只读命令跳过 secret-source 加载，与启动缓慢报告形成相互关联的优化方向，但尚不能认定这是唯一根因。[#158046](https://github.com/NousResearch/hermes-agent/issues/158046) · [#158047](https://github.com/NousResearch/hermes-agent/issues/158047)
- **群聊可追溯性与音频扩展**：用户希望发送后保留引用消息，并允许转录 hook 在上传大小检查前替换音频路径。[#158042](https://github.com/NousResearch/hermes-agent/issues/158042) · [#158090](https://github.com/NousResearch/hermes-agent/issues/158090)

## 7. 用户反馈摘要

> 未提供评论正文，以下为 Issue 描述体现的痛点与场景，不是对评论情绪的直接统计。

- **“成功提示”与真实可用性之间存在落差**：Square 页面显示授权成功，但 CLI 仍失败；另有 Desktop 更新成功后崩溃的报告。用户需要的是完整操作链路成功，而不是某个步骤成功。[#158003](https://github.com/NousResearch/hermes-agent/issues/158003) · [#158086](https://github.com/NousResearch/hermes-agent/issues/158086)
- **重度用户已依赖多 Profile、远端与常驻运行**：26 个 Profile、次级 Telegram bot、远端回传等场景，对隔离性、断线恢复和可观测性提出更高要求。[#158086](https://github.com/NousResearch/hermes-agent/issues/158086) · [#158080](https://github.com/NousResearch/hermes-agent/issues/158080) · [#157993](https://github.com/NousResearch/hermes-agent/issues/157993)
- **用户重视控制权与历史连续性**：模型不应静默切换；拒答不应让会话消失；重试期间的中断消息不应丢失。[#158081](https://github.com/NousResearch/hermes-agent/issues/158081) · [#158094](https://github.com/NousResearch/hermes-agent/issues/158094) · [#157945](https://github.com/NousResearch/hermes-agent/issues/157945)
- **积极信号主要来自主动贡献，而非明确满意评价**：社区继续提交插件与招募测试者，例如 LearnHermes 新手旅程伴侣；这说明参与意愿，但不能直接推导整体满意度。[#158041](https://github.com/NousResearch/hermes-agent/issues/158041)

## 8. 待处理积压

**当前材料不足以识别“长期未响应”条目**：可见项目均创建于 11 月 19–20 日，且缺少维护者响应记录、旧 Issue 年龄与完整 PR 历史。以下是建议优先跟进的开放事项，而非认定为长期积压。

| 建议优先级 | 待跟进事项 | 建议下一步 |
|---|---|---|
| 最高 | [Telegram Windows 内存增长 #157984](https://github.com/NousResearch/hermes-agent/issues/157984) | 确认可复现性，增加网络故障与长时间重连压力测试 |
| 最高 | [Desktop 升级崩溃 #158086](https://github.com/NousResearch/hermes-agent/issues/158086) | 明确影响版本、状态数据条件及可恢复方案 |
| 高 | [离线群消息丢失 #158080](https://github.com/NousResearch/hermes-agent/issues/158080) | 验证初始化授权顺序和排队消息处理 |
| 高 | [Desktop MCP 工具缺失 #158065](https://github.com/NousResearch/hermes-agent/issues/158065) | 对齐隔离模式下 Desktop 与 CLI 的工具初始化路径 |
| 高 | [token usage 修复 PR #158089](https://github.com/NousResearch/hermes-agent/pull/158089) | 优先审查跨 provider 测试，防止上下文压缩判断失真 |
| 中高 | [CLI 启动慢 #158047](https://github.com/NousResearch/hermes-agent/issues/158047) | 分离 bootstrap、导入与密钥加载成本，建立启动性能基线 |

### 日报结论

**Hermes Agent 当前的优势是高提交活跃度、持续的插件供给和较快的修复提案产出；主要风险则是多 Profile、会话与通信链路的稳定性，以及待审修复能否及时形成交付闭环。** 下一观察窗口应重点确认高影响问题是否得到维护者分诊、直接修复 PR 是否出现，以及 v0.23.3 升级后的故障范围是否收敛。[Issues](https://github.com/NousResearch/hermes-agent/issues) · [PRs](https://github.com/NousResearch/hermes-agent/pulls)

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-20**

> **统计口径**：基于提供的近 24 小时数据生成，未额外核验 GitHub。部分条目的更新时间为 11 月 19 日，仍按输入统计窗口纳入。项目地址标为 `qwibitai/nanoclaw`，但 Issue/PR 数据指向 `nanocoai/nanoclaw`；下文条目链接沿用后者，版本链接沿用项目地址。

## 1. 今日速览

过去 24 小时共记录 **6 条 Issue 更新、4 条 PR 更新和 1 个新版本**，工作重点集中在正式版发布前的稳定性收尾与供应链加固。新发布的 **v2026.11.0-rc.3** 被定位为预期转为稳定版的候选构建，但是否正式发布仍取决于测试结果。5 条新开 Issue 均为同一贡献者提交的安全加固建议，说明本轮活动更接近集中审查，而非广泛用户讨论。整体呈现“**维护活动集中、发布节奏明确，但社区互动证据有限**”的状态：Issue 评论和点赞均为 0，PR 评论数据缺失。

## 2. 版本发布

### [v2026.11.0-rc.3](https://github.com/qwibitai/nanoclaw/releases/tag/v2026.11.0-rc.3)：稳定版前的关键候选版本

- **发布定位**：2026.11.0 的第三个候选版本；公告称，如测试未发现问题，预期以该构建发布稳定版，不再安排 beta 阶段。
- **版本路径调整**：11 月版本将取代原计划的 **2026.10.1**，后者不会发布稳定版。
- **变更规模**：发布 PR 说明，rc.3 从 `main@7c01ee234` 切出，相比 rc.2 包含 **6 个 PR**；`channels` 引用也有一次更新。当前材料未提供完整变更清单。  
  关联：[发布 PR #4487](https://github.com/nanocoai/nanoclaw/pull/4487)
- **破坏性变更**：提供的公告摘要中未列出，**不能据此确认不存在**。
- **迁移注意事项**：rc.3 仍是预发布版本，生产环境应先验证安装、升级和已启用技能的兼容性。原本等待 2026.10.1 稳定版的用户，应关注后续 2026.11.0 稳定版，而非继续等待 2026.10.1。
- **修复包含情况**：不要仅凭时间接近就认定下述 setup、Vercel 修复已包含在 rc.3 中；当前数据未明确给出其与发布标签的包含关系。

## 3. 项目进展

**状态说明：以下 3 个 PR 均标记为 `CLOSED`，数据未提供合并标志，因此不能统一表述为“已合并”。**

| PR | 主要推进内容 | 状态与价值 |
|---|---|---|
| [#4488：setup 日志写入修复](https://github.com/nanocoai/nanoclaw/pull/4488) | 安装步骤等待原始日志写入完成；处理日志无法打开的情况 | 已关闭。针对安装流程崩溃与日志落盘时序问题，提升安装可靠性和排障能力 |
| [#4489：Vercel 安装兼容性修复](https://github.com/nanocoai/nanoclaw/pull/4489) | 测试守卫接受 `/add-vercel` 合法添加的 `vercel` 条目 | 已关闭。消除已启用 Vercel 技能的安装在更新时遭遇的校验阻碍 |
| [#4487：rc.3 发布准备](https://github.com/nanocoai/nanoclaw/pull/4487) | 更新版本号并整理候选版本发布 | 已关闭；结合实际 Release，候选版本已发布 |

**整体进展判断**：本轮是正式版前的增量收敛，核心价值在安装、升级和发布流程的可靠性，而非新增大规模功能。

## 4. 社区热点

### 供应链可追溯性成为集中关注点

5 条新开 Issue 全部带有 `kind/hardening`、`triage/unresolved` 标签，指向技能安装路径中的依赖固定、完整性校验和更新监测：

- [#4494：Iron Proxy 固定版本落后上游 7 个版本](https://github.com/nanocoai/nanoclaw/issues/4494)：当前固定为 v0.52.0，报告称上游已到 v0.59.0。
- [#4493：14 项非 npm 固定依赖缺少公告与陈旧度检查](https://github.com/nanocoai/nanoclaw/issues/4493)：人工检查清单尚未形成持续监测闭环。
- [#4492：mnemon 二进制下载未固定版本、未校验 checksum](https://github.com/nanocoai/nanoclaw/issues/4492)：安装来源缺少充分的版本与完整性约束。
- [#4491：Dashboard 包安装未指定版本](https://github.com/nanocoai/nanoclaw/issues/4491)：不同时间安装可能获得不同依赖结果。
- [#4490：Iron Proxy 基础镜像仅固定 tag](https://github.com/nanocoai/nanoclaw/issues/4490)：未以 digest 锁定具体镜像内容。

**热度边界**：上述 Issue 均为 **0 评论、0 点赞**，无法按互动量区分热门程度。它们体现的是集中提交的治理诉求，尚不能视为社区共识或已确认漏洞；提交者均声明这些不是可利用漏洞。

## 5. Bug 与稳定性

以下按潜在影响排序，为日报分析优先级，**不是官方严重性评级**。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| 较高 | [#4486：setup 无法打开原始日志时崩溃](https://github.com/nanocoai/nanoclaw/issues/4486)。涉及 `spawnQuiet`、`spawnStep` 的流错误处理及日志写入时序，影响安装完成与故障诊断 | Issue 已关闭；已有 [fix PR #4488](https://github.com/nanocoai/nanoclaw/pull/4488)，PR 已关闭，是否合并及进入哪个版本待核实 |
| 中等 | 启用 `/add-vercel` 后，容器工具测试守卫拒绝合法的 `vercel` 条目，阻碍更新 | 已有 [fix PR #4489](https://github.com/nanocoai/nanoclaw/pull/4489)，PR 已关闭；未提供对应 Issue |
| 加固待评估 | 二进制下载缺少校验、依赖未固定、镜像 tag 可变，以及依赖监测不足 | [#4490–#4494](https://github.com/nanocoai/nanoclaw/issues/4490) 均未解决；提供的数据中未见对应 fix PR |

**趋势判断**：当前材料没有显示大范围运行时故障，但安装/更新链路和供应链治理仍有明确改进空间。加固报告不应与已确认安全漏洞混为一谈。

## 6. 功能请求与路线图信号

本轮**没有明确的新业务功能请求**，路线图信号主要集中在工程治理：

- **依赖安装可复现性**：为 mnemon、Dashboard 和 Iron Proxy 基础镜像补齐版本固定与完整性约束。  
  来源：[#4492](https://github.com/nanocoai/nanoclaw/issues/4492)、[#4491](https://github.com/nanocoai/nanoclaw/issues/4491)、[#4490](https://github.com/nanocoai/nanoclaw/issues/4490)
- **非 npm 依赖持续维护**：为人工维护的固定依赖建立公告、陈旧度检查或定期复核机制。  
  来源：[#4493](https://github.com/nanocoai/nanoclaw/issues/4493)、[#4494](https://github.com/nanocoai/nanoclaw/issues/4494)
- **强化镜像更新仍在推进**：[PR #4485](https://github.com/nanocoai/nanoclaw/pull/4485) 待处理，拟为 v2026.10.0 更新带时间戳的强化镜像，并替换对应 digest。

**下一版本判断**：已有具体 PR 的镜像刷新比尚无修复 PR 的加固建议更接近落地；但所有上述事项均缺少明确版本承诺。不能推断 5 条加固 Issue 会纳入即将发布的稳定版。

## 7. 用户反馈摘要

**提供的数据没有 Issue 评论正文，无法提炼评论中的真实满意度或用户共识。**仅能从报告正文识别以下痛点：

- **安装失败时诊断链路也可能失效**：日志文件打不开不应直接导致 setup 崩溃。  
  来源：[#4486](https://github.com/nanocoai/nanoclaw/issues/4486)
- **可选技能不应破坏后续升级**：启用 Vercel 后，更新检查应识别技能引入的合法状态。  
  来源：[PR #4489](https://github.com/nanocoai/nanoclaw/pull/4489)
- **扩展技能应具备一致的供应链保障**：核心依赖之外的二进制、包和容器基础镜像，也需要可追踪、可复现的安装机制。  
  来源：[#4492](https://github.com/nanocoai/nanoclaw/issues/4492)、[#4491](https://github.com/nanocoai/nanoclaw/issues/4491)、[#4490](https://github.com/nanocoai/nanoclaw/issues/4490)

本轮反馈集中来自同一贡献者，不宜外推为整个用户群的满意或不满意评价。

## 8. 待处理积压

**当前数据不足以识别“长期未响应”的积压**：开放 Issue 均为当天创建，开放 PR 为前一天创建。建议关注以下短期待办：

1. **优先分诊下载完整性与版本固定问题**，明确风险边界、负责人及修复方案。  
   [#4492](https://github.com/nanocoai/nanoclaw/issues/4492) · [#4491](https://github.com/nanocoai/nanoclaw/issues/4491) · [#4490](https://github.com/nanocoai/nanoclaw/issues/4490)
2. **为依赖陈旧度建立维护闭环**，避免仅升级一次版本、后续仍依赖人工发现。  
   [#4493](https://github.com/nanocoai/nanoclaw/issues/4493) · [#4494](https://github.com/nanocoai/nanoclaw/issues/4494)
3. **审查待处理的强化镜像刷新**，确认验证结果及适用版本。  
   [PR #4485](https://github.com/nanocoai/nanoclaw/pull/4485)
4. **补齐修复落版信息**，明确已关闭修复 PR 是否合并、是否进入 rc.3 或后续版本，便于用户决定升级时机。  
   [PR #4488](https://github.com/nanocoai/nanoclaw/pull/4488) · [PR #4489](https://github.com/nanocoai/nanoclaw/pull/4489)

**健康度结论**：NanoClaw 当前处于候选版向稳定版收敛阶段，发布和维护活动持续，但社区互动证据较少。接下来最值得观察的是：新增加固问题能否获得明确分诊，以及稳定性修复能否形成清晰、可验证的版本交付闭环。

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

# LobsterAI 项目动态日报｜2026-11-20

## 1. 今日速览

过去 24 小时，LobsterAI 仅有 **1 条 PR 更新**，无 Issue 更新，也无新版本发布，按本次数据窗口判断，项目处于**低活跃状态**。今日唯一变更是尚待合并的 [PR #3122](https://github.com/netease-youdao/LobsterAI/pull/3122)，聚焦有道云笔记技能的 API Key 配置安全，旨在避免明文凭据进入对话和命令执行链路。今日没有已合并或已关闭的 PR，因此该修复仍属待落地成果。整体来看，项目出现了明确的安全加固信号，但单日数据不足以判断长期维护健康度。

## 2. 项目进展

### 有道云笔记技能：凭据配置安全加固，尚未合并

- **PR**：[#3122 — fix(skills): protect YoudaoNote API key setup](https://github.com/netease-youdao/LobsterAI/pull/3122)
- **作者**：akshathayadav378-boop
- **状态**：OPEN；今日创建并更新
- **涉及范围**：`area: docs`、`area: skills`
- **变更目标**：原有内置 YoudaoNote 技能要求智能体将用户 API Key 直接放入命令。该 PR 旨在避免明文凭据出现在对话、命令行参数、Shell 历史记录及进程参数中。
- **进展判断**：安全修复已进入提交阶段，但尚无合并、发布或验证结果。**今日推进的是修复准备，而非已交付能力。**

今日没有已合并或关闭的重要 PR，暂无可确认落地的功能或修复。

## 3. 社区热点

### 唯一活跃议题：智能体配置第三方服务时的凭据保护

[PR #3122](https://github.com/netease-youdao/LobsterAI/pull/3122) 是今日唯一有更新的条目，👍 为 **0**；评论数未提供有效值，不能据此判断讨论热度。

该议题反映的核心诉求是：**个人 AI 助手在引导用户接入外部服务时，应避免将敏感凭据带入可留存、可查看的文本和命令执行记录。** 对于涉及工具调用的智能体，配置文档和技能指令本身也是安全边界的一部分。不过，当前数据并未显示广泛讨论或社区共识，不能将其视为高热度话题。

## 4. Bug 与稳定性

| 优先级 | 问题 | 当前状态 | 修复进度与链接 |
|---|---|---|---|
| **优先关注：凭据暴露风险** | YoudaoNote 技能要求将 API Key 直接放入命令，可能使凭据进入对话、命令参数、Shell 历史及进程参数 | 今日 PR 摘要提及；缺少完整问题详情，无法确认实际泄露事件、影响范围或严重性评级 | 已有待合并修复 [PR #3122](https://github.com/netease-youdao/LobsterAI/pull/3122)，关联 [Issue #3120](https://github.com/netease-youdao/LobsterAI/issues/3120) |

今日数据中没有新增崩溃、运行回归或其他稳定性问题记录。**这仅表示本次窗口未提供相关报告，不代表项目不存在此类问题。**

## 5. 功能请求与路线图信号

今日未提供新增功能请求。唯一可观察到的方向是 **技能配置流程的安全加固**，而非新增用户功能。

[PR #3122](https://github.com/netease-youdao/LobsterAI/pull/3122) 已将这一方向落实为待审变更，但没有维护者确认、里程碑或发布计划，**无法判断其是否会纳入下一版本**。若修复获准合并，可进一步考虑检查其他内置技能是否存在类似的明文凭据配置模式；这是分析建议，并非已确认路线图。

## 6. 用户反馈摘要

今日未提供 Issue 评论或可核验的用户反馈，因此无法提炼真实用户的满意度、使用频率或具体受影响经历。

仅从 [PR #3122](https://github.com/netease-youdao/LobsterAI/pull/3122) 的摘要可以识别出一个待解决的使用痛点：用户在配置有道云笔记接入时，不应被引导通过可能留下明文痕迹的方式传递 API Key。该判断来自变更说明，**不等同于用户评论或已确认的泄露反馈**。

## 7. 待处理积压

当前数据不足以识别“长期未响应”的重要事项；今日唯一 PR 为当天创建，不宜归为长期积压。

| 待关注事项 | 建议跟进 | 链接 |
|---|---|---|
| 凭据保护修复待审核 | 优先确认新配置流程是否覆盖摘要中列出的暴露路径，并验证技能仍能正常完成配置与调用 | [PR #3122](https://github.com/netease-youdao/LobsterAI/pull/3122) |
| 关联问题状态待核实 | 核实问题影响范围、是否已有用户将密钥写入相关记录，以及是否需要补充密钥轮换提示 | [Issue #3120](https://github.com/netease-youdao/LobsterAI/issues/3120) |

**健康度结论**：今日活动量较低，但变更方向具有安全价值。近期最值得关注的是 [PR #3122](https://github.com/netease-youdao/LobsterAI/pull/3122) 的审核、验证与合并进度，而不是功能扩张。

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

# CoPaw 项目动态日报
**日期：2026-11-20**

> **数据口径**：本日报基于提供的 GitHub 数据。项目名称为 CoPaw，但 Issue/PR 条目指向 `agentscope-ai/QwenPaw`，下文沿用所给条目的仓库路径构造链接。部分条目的更新时间为 11 月 19 日，仍按本次“过去 24 小时”数据集纳入；未提供评论正文、PR 合并标记和历史响应记录。

## 1. 今日速览

今日共收录 **3 条 Issue 更新和 3 条 PR 更新**，其中 2 条 PR 待合并、1 条已关闭，没有新版本发布。开发活动以小规模维护为主，涉及控制台通知、MCP OAuth 凭据持久化和插件测试稳定性，整体呈现**有持续维护、以修复为主**的状态。最值得关注的是 Windows 本地推理进程残留问题，报告称其会累积占用内存并阻止本地模型启动，当前数据中尚无对应修复 PR。社区侧出现 Telegram 话题级会话隔离和 Apple Silicon 本地推理接入需求，但每条 Issue 仅有 1 条评论，尚不足以判断形成广泛共识。  
相关：[项目仓库](https://github.com/agentscope-ai/CoPaw) · [Windows 问题 #8830](https://github.com/agentscope-ai/QwenPaw/issues/8830)

## 2. 项目进展

### 控制台标签页通知逻辑调整：1 条 PR 已关闭，合并状态待核实

[PR #8829：仅在标签页图标中显示未读完成状态](https://github.com/agentscope-ai/QwenPaw/pull/8829) 由 **zhaozhuang521** 提交，拟作以下调整：

- 移除表示“运行中”的蓝点。
- 保留表示“已完成且未读”的绿点。
- 新执行周期不再覆盖已有绿点，用户重新访问标签页后清除提示。

这项改动旨在减少通知噪声，同时避免用户遗漏已完成的任务。**数据仅标记为 CLOSED，不能据此确认已合并或已进入主分支。**

### 两项维护修复正在推进

| PR | 状态 | 预期价值 |
|---|---|---|
| [#8828：持久化轮换后的 MCP OAuth refresh token](https://github.com/agentscope-ai/QwenPaw/pull/8828) | OPEN | 避免授权服务器使旧 refresh token 失效后，客户端继续使用旧值，导致后续刷新失败 |
| [#8831：稳定 nightly 插件安装与卸载测试](https://github.com/agentscope-ai/QwenPaw/pull/8831) | OPEN | 从标题看，目标是改善插件相关自动化测试的稳定性；摘要未提供具体实现或验证结果 |

**进展判断**：今日属于小步维护推进，三条 PR 均标记为 `size/S`。尚无可核实的合并记录，不宜将这些改动描述为已经交付。

## 3. 社区热点

三条 Issue 均为 **1 条评论、0 个 👍**，活跃度并列；PR 评论数缺失，无法进行可靠的跨类型热度排名。

| 议题 | 社区诉求与分析 |
|---|---|
| [#8830：Windows 残留 llama-server.exe 进程](https://github.com/agentscope-ai/QwenPaw/issues/8830) | 用户关注本地模型在后端异常退出、重启后的可恢复性。它直接影响资源占用和模型启动，处理优先级高于当前讨论量所体现的热度。 |
| [#8827：按 Telegram forum topic 隔离会话](https://github.com/agentscope-ai/QwenPaw/issues/8827) | 希望同一超级群中的不同话题拥有独立 agent 会话，反映出群组多任务、多主题使用场景对上下文边界的需求。 |
| [#8826：新增 Rapid-MLX 本地提供商预设](https://github.com/agentscope-ai/QwenPaw/issues/8826) | Apple Silicon 用户希望通过模型设置接入本地 OpenAI 兼容推理服务，并获得配置指引，核心诉求是降低部署门槛。 |

## 4. Bug 与稳定性

以下为**基于影响范围的分析排序**，并非维护者官方严重性评级。

### 高：Windows 本地推理进程残留与内存耗尽

- **问题**：后端崩溃、强制终止或重启后，其启动的 `llama-server.exe` 未被清理；后续启动又使用新的随机端口创建进程，造成残留进程累积。
- **影响**：报告称会耗尽内存，并阻止本地模型启动。
- **修复状态**：Issue 为 OPEN，**本次数据中未见对应 fix PR**。
- **建议关注**：异常退出后的子进程清理、重启时的存量进程识别，以及重复启停场景验证。  
  链接：[Issue #8830](https://github.com/agentscope-ai/QwenPaw/issues/8830)

### 中：MCP OAuth 令牌轮换后可能出现刷新失败

- **问题**：此前的交换逻辑仅返回新 access token 及有效期，未持久化轮换后的 refresh token；旧令牌被服务端作废后，下一次刷新仍可能提交旧值。
- **影响**：使用相关远程 MCP OAuth 授权流程的连接可能无法持续刷新凭据。
- **修复状态**：**已有 fix PR，尚待合并**；未提供独立关联 Issue。
- 链接：[PR #8828](https://github.com/agentscope-ai/QwenPaw/pull/8828)

### 较低／工程质量：插件测试与控制台通知

- **插件测试稳定性**：已有待合并修复，但现有摘要不足以判断是环境波动、时序问题还是产品缺陷。[PR #8831](https://github.com/agentscope-ai/QwenPaw/pull/8831)
- **控制台通知可辨识性**：调整运行中与未读完成提示，属于交互体验修复；PR 已关闭，是否合并未知。[PR #8829](https://github.com/agentscope-ai/QwenPaw/pull/8829)

## 5. 功能请求与路线图信号

| 需求 | 当前证据 | 后续版本判断 |
|---|---|---|
| **Telegram 话题级会话隔离** | 已提交需求，影响 Channels；未见对应 PR。[#8827](https://github.com/agentscope-ai/QwenPaw/issues/8827) | 是明确的会话隔离需求信号，但尚无实现或排期依据，不能推断将进入下一版本。 |
| **Rapid-MLX 提供商预设与配置指南** | 希望在 Models 设置中接入 Apple Silicon 本地服务；未见对应 PR。[#8826](https://github.com/agentscope-ai/QwenPaw/issues/8826) | 需求较聚焦，但尚无维护者接受或开发进展证据。 |
| **MCP OAuth 凭据续期可靠性** | 已有具体修复 PR。[#8828](https://github.com/agentscope-ai/QwenPaw/pull/8828) | 相比仅有 Issue 的需求，更接近可交付状态；仍需以审核、合并及发布记录为准。 |

## 6. 用户反馈摘要

**未提供评论正文，因此以下仅从 Issue 描述提炼，不代表评论区共识。**

- **Windows 本地模型用户**：后端重启后残留推理进程，需要承担持续增加的资源占用，最终可能无法启动模型。痛点是异常恢复缺乏可靠的进程生命周期管理。[#8830](https://github.com/agentscope-ai/QwenPaw/issues/8830)
- **Telegram 群组用户**：希望按 forum topic 划分独立会话，适配同一群组中的多个主题或任务，避免共用会话边界带来的使用限制。[#8827](https://github.com/agentscope-ai/QwenPaw/issues/8827)
- **Apple Silicon 用户**：希望获得 Rapid-MLX 预设和设置指南，以更直接地使用本地推理服务。[#8826](https://github.com/agentscope-ai/QwenPaw/issues/8826)

现有材料没有明确的满意度评价，也不足以推断整体用户口碑。

## 7. 待处理积压

**本次样本均为近期创建或更新的条目，无法识别“长期未响应”的重要积压。** 建议维护者优先关注：

1. **尽快分诊 Windows 进程残留问题**：确认复现条件、受影响范围与清理策略；目前未见修复 PR。[Issue #8830](https://github.com/agentscope-ai/QwenPaw/issues/8830)
2. **审核 MCP OAuth 修复**：重点验证轮换令牌的持久化，以及连续多次刷新场景；该 PR 同时标记为首次贡献者提交。[PR #8828](https://github.com/agentscope-ai/QwenPaw/pull/8828)
3. **核实控制台 PR 的关闭结果**：区分已合并、放弃或被替代，避免将关闭误记为交付。[PR #8829](https://github.com/agentscope-ai/QwenPaw/pull/8829)
4. **为两项功能请求提供方向性反馈**：明确是否接受、实现边界及贡献要求，帮助社区判断下一步投入。[Telegram #8827](https://github.com/agentscope-ai/QwenPaw/issues/8827) · [Rapid-MLX #8826](https://github.com/agentscope-ai/QwenPaw/issues/8826)

**总体结论**：项目保持维护活动，当前重点是可靠性和交互细节，而非大规模功能扩张。短期健康度最值得跟踪的指标，是 Windows 本地模型故障能否得到分诊，以及已有 OAuth 修复能否完成验证并落地。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-20**  
**项目：[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)**

> 本报告基于所提供的 GitHub 数据快照。PR 评论数为 `undefined`，无法用于讨论热度排名；此外，#12593 的更新时间为 11 月 19 日，与“过去 24 小时更新”口径存在差异，以下将其作为待合并背景项保留。

## 1. 今日速览

过去 24 小时，数据汇总记录 **1 条 Issue 更新、5 条待合并 PR 更新**，没有 PR 合并或关闭，也没有新版本发布。项目呈现**有开发活动、但尚无交付落地**的状态，工作主要集中在浏览器凭据权限、Telegram 群组授权以及依赖与安全扫描维护。今日最需关注的是 Telegram 语音转写失败后阻塞后续消息的 **S1 工作流阻断问题**，目前提供的数据中未见对应修复 PR。整体健康度信号较为混合：权限与维护流程在持续完善，但消息通道可靠性和依赖更新积压仍需优先处理。  
相关：[阻断性 Bug #12597](https://github.com/zeroclaw-labs/zeroclaw/issues/12597) · [浏览器权限 #12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596) · [依赖分组 #12594](https://github.com/zeroclaw-labs/zeroclaw/pull/12594)

## 2. 项目进展

**今日没有已合并或已关闭的重要 PR，因此不能将以下工作计为已上线能力。** 当前进展主要体现为待审实现与维护方案：

| 方向 | 待合并进展 | 价值与限制 |
|---|---|---|
| 浏览器凭据权限 | [#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596)：分别授予用户名/密码与 TOTP 的浏览器访问权限，记录默认禁用浏览器访问，按精确 HTTPS origin 独立授权或撤销 | 有助于缩小敏感凭据的授权范围；标记为 XL，且依赖其他提案与 PR，不能视为即将落地 |
| Telegram 群组授权 | [#12592](https://github.com/zeroclaw-labs/zeroclaw/pull/12592)：增加 `channels.telegram.<alias>.trusted_groups` | 允许名单中的群组成员无需逐个配置发送者条目即可通过授权，降低群聊部署成本；同时扩大了群内成员的可访问范围 |
| 安全扫描可见性 | [#12595](https://github.com/zeroclaw-labs/zeroclaw/pull/12595)：修正每日安全公告扫描被已有开放 Issue 遮蔽的问题 | 提升持续告警的可见性；这是扫描通知流程改进，不代表相关依赖风险已被修复 |
| 依赖维护 | [#12594](https://github.com/zeroclaw-labs/zeroclaw/pull/12594)：为 Rust patch 更新建立独立分组 | 有望降低大批量更新的审查负担，但是否改善合并效率仍需后续验证 |
| 依赖更新候选 | [#12593](https://github.com/zeroclaw-labs/zeroclaw/pull/12593)：一次更新 38 项 Rust 依赖 | 尚未合并，不能据此认定项目已使用这些新版本；时间戳也需核对 |

**进展判断：** 今天更接近“准备与治理推进日”，而非“功能交付日”；没有可确认的已合并增量。

## 3. 社区热点

### 可确认的讨论焦点：Telegram 消息队列被单条语音消息阻塞

[#12597](https://github.com/zeroclaw-labs/zeroclaw/issues/12597) 是所给数据中唯一的 Issue，已有 **1 条评论、0 个 👍**。报告指出，语音转写失败后，Telegram channel 会持续重试同一条 update，offset 不推进，导致后续文本消息也无法处理。

背后的诉求不只是“转写成功率”，而是**单条输入失败不应使整个消息通道失去可用性**。这对以 Telegram 作为个人助手入口的部署尤其关键。

### 开发议题：权限边界与维护可持续性

- **凭据细粒度授权：** [#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596) 将用户名/密码与 TOTP 分开授权，体现对 AI 浏览器操作中最小权限原则的重视。
- **依赖更新吞吐：** [#12594](https://github.com/zeroclaw-labs/zeroclaw/pull/12594) 指出，大组依赖更新 PR 多次被关闭或替代而未合并，说明维护流程已有实际摩擦。

**热度限制：** 所列条目均为 0 个 👍，PR 评论数缺失，因此上述为议题重要性分析，不能认定为社区互动热度排名。

## 4. Bug 与稳定性

### S1：Telegram 语音转写失败导致后续消息全部阻塞

- **条目：** [Issue #12597](https://github.com/zeroclaw-labs/zeroclaw/issues/12597)
- **状态：** OPEN；报告标注为 **S1 — workflow blocked**。
- **触发条件：** 收到语音消息，且语音转写失败。
- **故障表现：** 持续重试同一条 update，offset 不推进，后续文本消息被卡住，机器人表现为不再接收消息。
- **影响范围：** 从单条语音输入失败扩散为整个 Telegram 接收链路阻塞。
- **Fix PR：** 提供的数据中未见对应修复 PR。[#12592](https://github.com/zeroclaw-labs/zeroclaw/pull/12592) 属于群组授权功能，不能视为该问题的修复。
- **建议关注：** 优先确认复现条件、失败后的重试与 offset 处理策略，并补充“失败语音之后仍能处理文本”的回归测试。

### 稳定性相关：安全扫描通知可能长期失去增量提示

[#12595](https://github.com/zeroclaw-labs/zeroclaw/pull/12595) 指出，扫描流程在已有标题包含 “Advisory scan failed” 的开放 Issue 时，不再新建 Issue。此前用于跟踪已接受的 `anymap2` advisory 的 [#11429](https://github.com/zeroclaw-labs/zeroclaw/issues/11429) 因而可能遮蔽后续扫描结果。该项属于**安全运维可观测性问题**，修正 PR 已提交但尚未合并，不能据此推断存在新的漏洞或实际利用事件。

## 5. 功能请求与路线图信号

提供的数据中没有新增的独立功能请求 Issue，功能方向主要来自待合并 PR：

| 路线图信号 | 需求与场景 | 下一版本判断 |
|---|---|---|
| Telegram 可信群组 | 群聊助手部署不再需要逐个配置群成员发送者条目 | [#12592](https://github.com/zeroclaw-labs/zeroclaw/pull/12592) 已有实现提案，具备候选基础，但未见合并或发布安排 |
| 浏览器凭据分权 | 对同一站点的用户名/密码与 TOTP 分别授权、撤销 | [#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596) 依赖 [#12517](https://github.com/zeroclaw-labs/zeroclaw/pull/12517) 与 [RFC #12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422)，且范围为 XL，落地节奏不确定 |

维护类的 [依赖分组 #12594](https://github.com/zeroclaw-labs/zeroclaw/pull/12594) 和 [扫描通知 #12595](https://github.com/zeroclaw-labs/zeroclaw/pull/12595) 均标记为 XS，变更范围较小，但**不能仅凭规模预测合并顺序或下个版本内容**。

## 6. 用户反馈摘要

**数据限制：** 快照只提供 Issue 摘要及评论数量，没有评论正文，因此无法直接提炼评论中的满意度、维护者回应或已验证的临时解决方案。

从 [#12597](https://github.com/zeroclaw-labs/zeroclaw/issues/12597) 的问题描述，可以确认：

- **使用场景：** 用户通过 Telegram 向助手发送语音和文本消息。
- **核心痛点：** 一条语音转写失败会拖累后续全部消息，缺少输入之间的故障隔离。
- **用户可见影响：** 后续文本无法得到处理，机器人看起来停止接收消息。
- **尚待确认：** 具体运行环境、转写失败原因、影响用户数量，以及是否存在可靠恢复办法。

## 7. 待处理积压

当前样本不足以识别“长期未响应”的 Issue 或 PR；以下是值得维护者跟进的**积压与阻塞信号**，不代表均无人响应：

| 关注项 | 已知依据 | 建议 |
|---|---|---|
| 反复被替代的依赖更新 | [#12594](https://github.com/zeroclaw-labs/zeroclaw/pull/12594) 提及多轮大组更新未合并；当前 [#12593](https://github.com/zeroclaw-labs/zeroclaw/pull/12593) 仍打包 38 项更新 | 明确新分组配置与现有大组 PR 的处理顺序，避免继续累积或重复审查 |
| 长期开启的安全扫描跟踪项 | 据 [#12595](https://github.com/zeroclaw-labs/zeroclaw/pull/12595) 摘要，[#11429](https://github.com/zeroclaw-labs/zeroclaw/issues/11429) 自 10 月 2 日开启，截至日报日约 49 天 | 区分“已接受风险跟踪”与“新增扫描失败告警”，避免长期开启的跟踪项阻断通知 |
| 浏览器授权功能的前置依赖 | [#12596](https://github.com/zeroclaw-labs/zeroclaw/pull/12596) 依赖 #12517 与 RFC #12422 | 明确前置方案状态及评审顺序，降低大型变更的集成风险 |
| 新增高优先级待办 | [#12597](https://github.com/zeroclaw-labs/zeroclaw/issues/12597) 为当日新报的工作流阻断问题，尚未构成长期积压 | 优先完成分诊并关联修复，避免通道可靠性问题持续影响用户 |

**维护优先级建议：先处理 Telegram 阻断问题，再恢复安全扫描的持续可见性，并推进依赖更新拆分；新权限功能则继续进行边界与兼容性审查。**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*