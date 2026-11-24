# OpenClaw 生态日报 2026-11-24

> Issues: 7 | PRs: 38 | 覆盖项目: 13 个 | 生成时间: 2026-11-24 07:04 UTC

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
**日期：2026-11-24｜观察窗口：过去 24 小时**

> **数据口径**：本日报基于提供的 7 条 Issue、38 条 PR 更新统计及其中展示的 30 条 PR 明细。PR 的 `CLOSED` 状态不等同于已合并；下文将其称为“已关闭”，不据此认定修复已进入主分支。PR 评论数为 `undefined`，且未提供评论正文，因此无法可靠评选讨论热度或直接引用评论反馈。

## 1. 今日速览

过去 24 小时，OpenClaw 有 **7 条 Issue 更新、38 条 PR 更新**，其中 26 条 PR 待合并、12 条已合并或关闭，开发与维护活动较为活跃，**无新版本发布**。今日工作主要集中在升级恢复、会话状态一致性、上下文压缩测试，以及模型接入和 Web UI 使用流程。风险侧值得优先关注的是 **P1 级升级后 Agent 列表不一致**、旧 Git 安装可能被状态检查误触发回滚，以及 Teams 附件访问边界问题。整体呈现“持续修复与回归治理”的维护节奏，但多项重要修复仍待审查，尚不能将 PR 活跃度等同于稳定性问题已经解决。  
相关：[Agent 列表异常 #204425](https://github.com/openclaw/openclaw/issues/204425) · [升级误回滚 #204342](https://github.com/openclaw/openclaw/pull/204342) · [Teams 附件边界 #204026](https://github.com/openclaw/openclaw/pull/204026)

## 2. 项目进展

### 今日重要关闭项

| 方向 | PR 与状态 | 推进内容及意义 |
|---|---|---|
| 多智能体数据隔离 | [#204026](https://github.com/openclaw/openclaw/pull/204026)，已关闭，P1 | 针对 Teams 回复使用进程级而非 Agent 级媒体根目录的问题，提出按回复 Agent 限定本地附件访问范围，涉及跨会话文件泄露风险。 |
| Goal 与后台任务调度 | [#204265](https://github.com/openclaw/openclaw/pull/204265)，已关闭 | 避免后台命令完成结果被 Goal 自动续跑抢先处理；关联 Issue [#204187](https://github.com/openclaw/openclaw/issues/204187) 也已关闭。该方向直接影响长任务的执行顺序与可靠性。 |
| 出站 URL 校验 | [#204027](https://github.com/openclaw/openclaw/pull/204027)，已关闭 | 统一拒绝特殊用途、非全球可路由 IPv6 目的地址，减少地址分类差异带来的策略空隙。 |
| 更新幂等性 | [#204426](https://github.com/openclaw/openclaw/pull/204426)，已关闭 | 将已经安装的目标产物识别为“当前版本”，处理安装冒烟测试中已是最新版的无操作场景。 |
| 多 Agent 帮助入口 | [#204341](https://github.com/openclaw/openclaw/pull/204341)，已关闭 | 针对多 Agent Gateway 中 Ask OpenClaw 无法展示渠道指南的问题，改善系统 Agent 的选择路径。 |
| 会话工作区诊断 | [#204424](https://github.com/openclaw/openclaw/pull/204424)，已关闭 | 工作树已被删除时明确报告并提供恢复方向，而不是返回误导性的空 diff。 |

**进展判断**：今日关闭项覆盖安全边界、任务调度和运维诊断，价值主要在可靠性而非新功能扩张。不过，缺少合并记录和发布信息，无法确认这些改动是否已经交付用户。

## 3. 社区热点

**今日没有形成可验证的高互动热点**：7 条 Issue 中，6 条各有 1 条评论、1 条为 0 评论，点赞均为 0；PR 评论数不可用。以下按影响和主题聚集度选取关注点，而非按讨论热度排名。

- **升级后的状态一致性成为集中诉求。** [#204425](https://github.com/openclaw/openclaw/issues/204425) 报告 CLI 能列出 3 个 Agent，而 Web UI 仅显示 1 个；另有 [#204441](https://github.com/openclaw/openclaw/issues/204441) 报告 `update-recovery-pending`。用户关切不只是“能否升级”，还包括升级后配置是否仍然可见、可用。
- **长任务成本与上下文管理受到关注。** [#204451](https://github.com/openclaw/openclaw/issues/204451) 指出 Gemini 多请求回合中的历史变更可能破坏隐式缓存；[#204449](https://github.com/openclaw/openclaw/issues/204449)、[#204450](https://github.com/openclaw/openclaw/issues/204450) 则揭示压缩策略调整后测试断言未同步。
- **模型接入仍存在首用阻力。** [#204429](https://github.com/openclaw/openclaw/pull/204429) 尝试允许无已连接模型的新会话先执行 `/login`；[#204447](https://github.com/openclaw/openclaw/pull/204447) 则补齐本地 MCP 服务登录过期后的重新认证流程。共同诉求是避免配置门槛阻断恢复操作。

## 4. Bug 与稳定性

以下按标签优先级及潜在影响排序；未标注优先级的项目，其影响判断属于分析，不代表官方定级。

| 优先级／影响 | 问题与适用场景 | Fix PR 状态 |
|---|---|---|
| **P1：升级后功能不可用** | [#204425](https://github.com/openclaw/openclaw/issues/204425)：从 11.4 升级到 11.5 后，Web UI Agent 选择器与 CLI 列表不一致，报告称持续到 11.7。 | 提供数据中未见对应修复 PR；标签要求维护者审查、补充信息。 |
| **P1：更新误回滚** | 旧开发版 launcher 可能把 `gateway status` 当作启动，反复检查后耗尽试运行次数，回滚原本健康的安装。 | [#204342](https://github.com/openclaw/openclaw/pull/204342)、[#204344](https://github.com/openclaw/openclaw/pull/204344) 均开放，且指向同一问题；需确认主修复方案。 |
| **P1：附件访问边界** | Teams 回复可能按进程级媒体根目录读取其他会话沙箱文件。 | [#204026](https://github.com/openclaw/openclaw/pull/204026) 已关闭；是否合并、发布未确认。 |
| **会话重置与插件兼容** | [#204453](https://github.com/openclaw/openclaw/issues/204453)：SQLite 迁移后，`sessions.reset` 删除旧 `sessions.json`，依赖文件的 portal 插件出现 ENOENT 循环、上下文仪表冻结。 | 未见对应修复 PR，当前 0 评论。 |
| **P2：更新恢复失败** | [#204441](https://github.com/openclaw/openclaw/issues/204441)：macOS arm64、2026.11.5 环境出现 `update-recovery-pending`。 | 未见明确对应修复 PR；仍需补充信息。不能直接认定与 Agent 列表异常同根因。 |
| **缓存效率／运行成本** | [#204451](https://github.com/openclaw/openclaw/issues/204451)：Docker、SQLite、Gemini 直连 API 场景中，多请求回合的历史变动可能降低缓存命中。 | 未见直接修复 PR，仍需复现；[#204437](https://github.com/openclaw/openclaw/pull/204437) 针对的是 OpenAI 缓存测试，不是该问题的已知修复。 |
| **P2：任务执行顺序** | [#204187](https://github.com/openclaw/openclaw/issues/204187)：Goal 自动续跑可能先于后台执行结果进入处理。 | Issue 与关联 [#204265](https://github.com/openclaw/openclaw/pull/204265) 均已关闭；交付状态待确认。 |
| **CI 回归：压缩阈值** | [#204449](https://github.com/openclaw/openclaw/issues/204449)、[#204450](https://github.com/openclaw/openclaw/issues/204450)：测试仍使用旧 80% 上限，与新 85% 触发规则不一致。 | [#204443](https://github.com/openclaw/openclaw/pull/204443) 开放，拟从共享阈值生成夹具；另有 [#204445](https://github.com/openclaw/openclaw/pull/204445) 恢复压缩看门狗测试。 |

**稳定性观察**：压缩与缓存相关的部分失败来自测试口径落后，而非已证实的生产功能故障。应将其与真实缓存失效、会话重置异常分开跟踪，避免以“测试修复”替代用户问题验证。

## 5. 功能请求与路线图信号

以下仅是开放 PR 所体现的方向，不代表已承诺进入下一版本。

| 方向 | 用户价值 | 当前信号 |
|---|---|---|
| **本地 MCP 重新登录** | stdio MCP 服务凭证过期后，可通过标准 URL 模式认证请求恢复使用，而非工具持续失败。 | [#204447](https://github.com/openclaw/openclaw/pull/204447) 已开放，属于明确的能力补齐。 |
| **Vercel AI Gateway 语音转写** | 已使用该网关的用户可统一处理语音笔记和音频附件，减少单独配置转写供应商密钥的需求。 | [#204286](https://github.com/openclaw/openclaw/pull/204286) 开放，但仍需验证材料，并有认证提供方风险标签。 |
| **跨工具、跨客户端置顶一致性** | 助手返回的“我的置顶会话”与 Web、Mac、Android 的个人排序一致。 | [#204436](https://github.com/openclaw/openclaw/pull/204436) 等待作者处理，改动规模 XL、存在兼容性风险，落地不确定性较高。 |
| **模型设置与错误恢复体验** | 保留已选供应商、显示更有用的计费指导、卸载默认模型供应商前预警。 | [#204440](https://github.com/openclaw/openclaw/pull/204440) 待维护者审查；[#204431](https://github.com/openclaw/openclaw/pull/204431)、[#204435](https://github.com/openclaw/openclaw/pull/204435) 等待作者处理。 |

相较跨端大改动，范围较小、已进入维护者审查的 UI 修复更接近集成阶段；但现有数据不足以预测下一版本的确定内容。

## 6. 用户反馈摘要

> 未提供评论正文，以下提炼自 Issue 描述，不是评论引用或满意度调查。

- **升级后的“配置仍在，但界面找不到”最损害信任。** 多 Agent 使用者需要 CLI 与 UI 对同一配置给出一致结果；异常跨版本持续出现，也提高了定位成本。来源：[#204425](https://github.com/openclaw/openclaw/issues/204425)。
- **旧插件用户承担迁移兼容成本。** Docker + SQLite 会话存储与文件式 portal 插件混用时，重置操作可能影响消息操作与状态显示，暴露核心存储迁移与插件依赖之间的断层。来源：[#204453](https://github.com/openclaw/openclaw/issues/204453)。
- **重度 Agent 用户关注每个回合的成本效率。** Gemini 报告涉及每回合 8 次以上模型请求，说明缓存稳定性对长任务场景具有直接经济意义。来源：[#204451](https://github.com/openclaw/openclaw/issues/204451)。
- **自主执行需要可预期的事件顺序。** 后台任务结果必须先被消费，再推进下一目标，否则用户难以信任自动续跑。该反馈已形成关闭的 Issue/PR 配对，但尚无用户确认修复效果的材料。来源：[#204187](https://github.com/openclaw/openclaw/issues/204187)。

**满意度结论**：现有样本以缺陷报告为主，没有足够材料判断整体满意度，也没有明确的正向使用反馈。

## 7. 待处理积压与维护建议

当前记录主要创建于 **11 月 23—24 日**，无法识别真正“长期未响应”的积压。以下是应优先跟进的短期队列：

1. **优先完成 P1 升级问题分诊。** 为 [#204425](https://github.com/openclaw/openclaw/issues/204425) 明确负责人、补充所需诊断信息，并单独验证其与 `update-recovery-pending` 的关系，避免过早合并根因。
2. **尽快确认会话重置的兼容边界。** [#204453](https://github.com/openclaw/openclaw/issues/204453) 尚无评论和可见修复 PR，建议明确文件式插件在 SQLite 时代的支持方式及临时恢复方案。
3. **收敛重复修复提案。** [#204342](https://github.com/openclaw/openclaw/pull/204342) 与 [#204344](https://github.com/openclaw/openclaw/pull/204344) 同指升级误回滚；[#204429](https://github.com/openclaw/openclaw/pull/204429) 与已关闭的 [#204439](https://github.com/openclaw/openclaw/pull/204439) 同指首次登录受阻。应标明主方案、替代关系及覆盖范围。
4. **核验安全相关关闭项的最终交付状态。** 对 [Teams 媒体根目录 #204026](https://github.com/openclaw/openclaw/pull/204026) 和 [IPv6 策略 #204027](https://github.com/openclaw/openclaw/pull/204027)，应补充合并提交及包含修复的版本，便于管理员判断风险。
5. **优先恢复持续红灯测试的诊断价值。** 推进 [压缩夹具 #204443](https://github.com/openclaw/openclaw/pull/204443)、[缓存断言 #204437](https://github.com/openclaw/openclaw/pull/204437) 与 [launcher IPC 测试 #204452](https://github.com/openclaw/openclaw/pull/204452)，减少已知噪声掩盖新回归的可能。

**总体判断：开发活跃，修复覆盖面较广；项目健康度的关键观察点，是升级与会话迁移问题能否完成闭环，以及安全、调度相关关闭项能否被验证已交付。**

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**观察日期：2026-11-24｜窗口：过去 24 小时**

> **口径说明：**以下仅基于所给摘要，Issue、PR 数表示当日更新条目，不等于新增数量；`CLOSED` 不等于已合并。健康度评估限于当日可见信号，不能替代长期维护评估。NanoClaw、CoPaw 的项目名与条目仓库路径存在差异，相关归属仍需核验。

## 1. 生态全景

本次覆盖 **13 个项目，共有 20 条 Issue、68 条 PR 更新，均无新版本发布**；其中 6 个项目有可见活动，7 个项目在观察窗口内无活动。OpenClaw 与 Hermes Agent 合计贡献 **60 条 PR，占全部 PR 更新的 88.2%**，开发活动明显集中。今日主题以升级恢复、会话一致性、认证、安全边界和上下文管理为主，显示活跃项目正投入较多精力处理持续运行与多端使用中的可靠性问题。与此同时，技能、媒体生成与 Creator 工作流仍在扩展，但多数改动尚待评审，**修复供给活跃不等于交付闭环完成**。

## 2. 各项目活跃度对比

| 项目 | Issue 更新 | PR 更新 | Release | 当日健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 7 | 38 | 无 | **高活跃、可靠性治理密集**；升级、会话及安全问题需优先闭环，交付状态待核验 |
| **Hermes Agent** | 8 | 22 | 无 | **高活跃、修复集中提交**；21 条 PR 开放，认证、会话隔离与云端恢复仍有核心风险 |
| **CoPaw** | 5 | 3 | 无 | **问题发现集中**；安全与记忆治理诉求明确，全部开放，尚无当日交付闭环 |
| **NanoBot** | 0 | 3 | 无 | **聚焦型维护**；统计口径与 WebUI 打磨，3 条 PR 来自同一贡献者 |
| **NanoClaw** | 0 | 1 | 无 | **自动化维护**；镜像刷新待合并，不能据此确认具体漏洞修复 |
| **LobsterAI** | 0 | 1 | 无 | **定向兼容维护**；关注升级后的 IM 会话连续性，关闭不代表已交付 |
| PicoClaw | 0 | 0 | 无 | 窗口内无活动，无法判断长期健康度 |
| NullClaw | 0 | 0 | 无 | 同上 |
| IronClaw | 0 | 0 | 无 | 同上 |
| TinyClaw | 0 | 0 | 无 | 同上 |
| Moltis | 0 | 0 | 无 | 同上 |
| ZeptoClaw | 0 | 0 | 无 | 同上 |
| ZeroClaw | 0 | 0 | 无 | 同上 |
| **合计** | **20** | **68** | **0 个** | 活动集中，合并与发布证据不足 |

**解读边界：**OpenClaw、Hermes 分别只展示了 30/38、20/22 条 PR 明细；不能把更新总数直接当作完整的技术主题样本，也不宜按 PR 数量简单排名产品质量。

## 3. OpenClaw 在生态中的定位

### 优势：本次样本中覆盖面最广的综合平台型项目

- **工程活动领先。**38 条 PR 占全部 PR 更新的 **55.9%**，是 Hermes 的约 **1.7 倍**；涉及升级器、Gateway、多 Agent、会话存储、上下文压缩、模型供应商、MCP、渠道和多端界面。
- **平台集成问题覆盖较完整。**维护重点不只是模型调用，而是“安装升级—认证—任务执行—状态展示—故障恢复”的完整使用链路。
- **存在跨项目兼容关联。**LobsterAI 的修复明确涉及 OpenClaw → DSH 升级路径，表明 OpenClaw 相关技术变化会影响至少一个关联项目；但不足以据此推断其整体生态支配力。

### 技术路线差异

| 对比对象 | OpenClaw 的相对侧重 | 对方当日体现的侧重 |
|---|---|---|
| Hermes Agent | 多 Agent Gateway、多端状态一致性、升级与接入体系 | 委派任务、账户池轮换、云端常驻、插件与桌面执行环境 |
| NanoBot | 跨模块平台治理与多端整合 | 状态可理解性、WebUI 交互与前端维护 |
| CoPaw | 对已有平台链路进行修复、回归治理 | 深入审视技能、沙箱、检索记忆的安全与治理边界 |
| LobsterAI | 提供更广泛的底层能力与集成面 | 聚焦桌面与多 IM 渠道的会话连续性体验 |

上述差异是**当日工作重心**，并非各项目完整能力清单。

### 社区规模：活动领先，但无法证明用户规模领先

现有资料没有 Star、活跃贡献者、安装量或长期响应时间，**只能确认 OpenClaw 当日开发活动最多，不能确认其用户或开发者社区规模最大**。NanoBot 的 3 条 PR 来自同一贡献者，CoPaw 的 5 条 Issue 来自同一作者，也说明条目数量不等于参与广度。

OpenClaw 当前的主要挑战是：集成面越广，升级、状态同步和插件兼容的回归验证成本越高。其下一阶段竞争力更应看问题关闭后的实际交付与用户验证，而非继续增加 PR 数量。

## 4. 共同关注的技术方向

| 技术方向 | 涉及项目 | 具体诉求与共同含义 |
|---|---|---|
| **会话身份、隔离与连续性** | OpenClaw、Hermes、LobsterAI、CoPaw | Agent 列表不一致、子智能体路由接管、升级后会话分裂、检索作用域隔离；核心是建立稳定身份与明确数据归属 |
| **长任务与常驻运行可靠性** | OpenClaw、Hermes、CoPaw | 后台结果与 Goal 续跑排序、云端硬重启恢复、取消或超时后的子进程回收；要求执行生命周期可控 |
| **安全边界实际生效** | OpenClaw、CoPaw、Hermes | 附件目录边界、出站地址限制、技能扫描默认行为、资源约束、敏感输入与镜像依赖风险 |
| **上下文与成本可观测性** | OpenClaw、NanoBot、Hermes | 缓存命中、压缩阈值、上下文占比、无效压缩统计；需区分累计用量、窗口占用和实际成本 |
| **认证与恢复体验** | OpenClaw、Hermes | 无模型时允许先登录、MCP 重新认证、OAuth 池轮换、WebSocket 与 REST 认证一致性 |
| **桌面及 Web 操作体验** | NanoBot、Hermes、OpenClaw | 回复操作栏布局、技能页性能、最终文档预览、供应商设置与错误引导 |

其中，**会话身份与生命周期管理**最具跨项目共性：它同时影响正确性、安全性、升级兼容和自主任务结果交付。

## 5. 差异化定位分析

以下目标用户与架构侧重由当日变更推断，不代表完整产品定位。

| 项目 | 功能侧重 | 更相关的用户场景 | 可见架构关注点 |
|---|---|---|---|
| **OpenClaw** | 多 Agent、多渠道、多端与模型接入 | 需要统一配置和运营复杂个人助手的用户、集成开发者 | Gateway、Agent 级资源边界、会话存储迁移、插件兼容 |
| **Hermes Agent** | 委派执行、插件技能、云端与桌面协作 | 长任务用户、自动化运营者、跨平台部署者 | 父子会话路由、账户池、RPC、插件宿主与进程生命周期 |
| **NanoBot** | 状态展示和 WebUI 使用体验 | 重视用量理解与日常交互的用户、前端维护者 | 状态统计统一、样式按功能组织 |
| **CoPaw** | 技能、Creator 工作流、长期记忆 | 长期知识助手及关注沙箱安全的开发者 | 检索作用域、资源与网络策略、召回子进程 |
| **LobsterAI** | 桌面与多 IM 会话衔接 | 钉钉、飞书、企微、微信、QQ 用户 | 升级映射、联系人与会话标识连续性 |
| **NanoClaw** | 当日仅见运行镜像维护 | 维护容器化 Agent 运行环境的部署者 | 镜像摘要固定与刷新；其他架构信息不足 |

其余 7 个项目缺少当日技术信息，不能仅凭名称或零活动对其能力与架构作出比较。

## 6. 社区热度与成熟度

### 活跃度分层

1. **高频迭代与质量巩固并行：OpenClaw、Hermes**  
   两者并非单纯功能冲刺：大量工作用于修复集成复杂度带来的问题。OpenClaw 更集中于升级、状态及回归治理；Hermes 同时推进核心修复与技能、渠道扩展。

2. **集中设计审视与候选实现：CoPaw**  
   安全和记忆问题发现密集，但由单一作者集中提出，尚不能认定为广泛社区共识。较大的 Creator PR 与基础治理诉求并存，需关注评审和测试能力。

3. **聚焦质量维护：NanoBot、LobsterAI**  
   改动范围集中，分别打磨统计与 UI、修复升级兼容。活动较少不代表成熟度更高，只能说明当天维护目标较明确。

4. **自动化维护或观察不足：NanoClaw及其余项目**  
   NanoClaw 有镜像维护信号；其他项目一天无活动，不足以认定停滞或维护不足。

### 热度不等于成熟度

本批数据几乎没有可比较的互动热度：可见点赞均为 0，PR 评论数缺失，Issue 评论有限。**不能可靠评选“最受欢迎项目”，也不能用缺陷数量判断谁更不稳定。**

更有价值的成熟度指标是：核心故障响应时间、修复合并周期、版本归属、回归测试覆盖，以及升级后的用户验证——这些数据本次大多缺失。

## 7. 值得关注的趋势信号

### ① 竞争重点正延伸到“持续运行是否可信”

升级误回滚、云端无法自启动、残留子进程和事件乱序，都发生在首次演示之外。

**开发参考：**将硬重启、取消、超时、重试和并发委派纳入验收；不能只验证一次正常执行。

### ② 会话身份正在成为基础设施问题

父子 Agent、IM 联系人、桌面会话、长期记忆与延迟消息都依赖稳定的身份绑定。路由或目录约定不足以覆盖复杂生命周期。

**开发参考：**区分会话身份、投递路由、存储标识和租户作用域，并明确重置与迁移语义。

### ③ 安全要求从“有配置”转向“可证明执行”

CoPaw 的资源限制与扫描诉求、OpenClaw 的附件和出站边界、Hermes 的凭据与镜像反馈，共同指向配置与实际保护之间的差距。

**开发参考：**明确默认放行还是拒绝、哪些后端真正支持限制，并提供可验证的执行状态，避免制造安全错觉。

### ④ 成本治理需要更准确的指标体系

NanoBot 的累计 Token 与上下文占比区分、OpenClaw 的缓存反馈、Hermes 的压缩计数问题，说明“展示一个 Token 数”已经不够。

**开发参考：**分别统计累计用量、单请求上下文、缓存用量、压缩行为及最终费用，避免错误指标驱动错误优化。

### ⑤ 生态兼容将成为升级质量的重要部分

OpenClaw 的 SQLite 与文件式插件兼容问题，以及 LobsterAI 的升级后会话分裂，表明核心迁移可能将成本转移给插件和下游产品。

**开发参考：**为存储、会话和插件接口建立迁移契约、兼容测试及可操作的恢复方案。

---

**结论：**本次最值得持续跟踪的是 OpenClaw、Hermes 的核心修复交付，以及 CoPaw 安全诉求的分诊结果。对技术选型而言，应优先核验目标场景下的会话隔离、升级恢复和认证闭环，而不是仅比较功能清单或当日活跃度；对维护者而言，当前最有价值的投入是把“已提交修复”转化为“可验证、可发布、用户可恢复”的工程闭环。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-24** · [项目仓库](https://github.com/HKUDS/nanobot)

## 1. 今日速览

过去 24 小时，NanoBot 有 **3 条 PR 更新、0 条 Issue 更新，无新版本发布**，开发活动集中于状态统计准确性和 WebUI 维护。3 条 PR 均由同一位贡献者提交，涉及两项 P2 Bug 修复和一项 P2 样式重构，属于范围集中的维护型活跃。当前 1 条 PR 待合并、2 条已关闭；**数据未提供合并标记，不能将“已关闭”直接视为已合并**。整体呈现持续修补体验与维护性问题的信号，但仅凭这一天的数据，尚不足以判断长期社区活跃度或发布节奏。

## 2. 项目进展

今日两条已关闭 PR 均围绕 WebUI；以下描述其拟推进的改动，**是否已进入主分支仍需核实**。

| PR | 状态 | 主要改动与价值 |
|---|---|---|
| [#6778：按功能归属组织 WebUI 样式](https://github.com/HKUDS/nanobot/pull/6778) | 已关闭，合并状态未确认 | 将原先集中在 **2,266 行样式表**中的规则、媒体查询和动画定义迁移到所属功能附近，使 `globals.css` 保留为 **119 行入口**。重点是降低定位和维护样式的成本，并非新增响应式或无障碍能力。 |
| [#6777：恢复桌面端回复操作栏单行布局](https://github.com/HKUDS/nanobot/pull/6777) | 已关闭，合并状态未确认 | 修正此前回复布局调整引入的操作按钮换行及顺序变化，恢复单行排列，并将备用来源入口放回预期位置。属于针对桌面交互回归的小范围修复。 |

**进展判断：**今日以体验修复和代码组织改善为主，没有显著扩展功能边界。若上述改动已合并，其价值主要体现在降低前端维护成本、修复可见回归，而非带来新的助手能力。

## 3. 社区热点

**现有数据无法可靠评选“讨论最活跃”条目**：3 条 PR 的评论数字段均为 `undefined`，不能视为零评论；👍 均为 0，也不足以形成热度排名。按变更内容，值得关注的议题如下：

- **状态面板中的统计口径一致性**  
  [PR #6779](https://github.com/HKUDS/nanobot/pull/6779) 希望让 `/status` 的上下文占比与 WebUI 仪表保持一致。其背后诉求是明确区分“累计 Token 用量”和“单次请求的上下文占用”，减少用户对窗口余量的误判。

- **桌面回复操作栏的布局稳定性**  
  [PR #6777](https://github.com/HKUDS/nanobot/pull/6777) 聚焦按钮换行、排列顺序改变的问题，反映出回复区在控件齐全时仍需保持紧凑、可预测的交互布局。

- **WebUI 样式维护成本**  
  [PR #6778](https://github.com/HKUDS/nanobot/pull/6778) 针对大型集中式样式表进行拆分，体现的是贡献者侧的维护诉求，而非已验证的社区共识。

## 4. Bug 与稳定性

两项 Bug 均标为 **P2**。以下按潜在影响范围排序，不代表维护者给出了不同严重级别。

| 问题 | 影响与复现信息 | Fix PR / 当前状态 |
|---|---|---|
| **状态面板上下文占比口径不一致** | `/status` 应采用与 WebUI 相同的单次请求上下文计数，并按完整窗口计算百分比。摘要中的 18 次请求示例显示：`Tokens` 累计输入为 **1,474,000**，而 `Context` 为 **80,000 / 204,800（39%）**；二者不应混为一谈。摘要明确指出 `Tokens` 累计本身已正确。 | [#6779](https://github.com/HKUDS/nanobot/pull/6779)，**开放、待合并**；关联 [Issue #6774](https://github.com/HKUDS/nanobot/issues/6774)。 |
| **桌面端回复操作栏布局回归** | 此前 [PR #6776](https://github.com/HKUDS/nanobot/pull/6776) 的布局调整允许操作栏换行，并改变备用来源入口位置；控件齐全时，图标可能堆叠在回复旁。 | [#6777](https://github.com/HKUDS/nanobot/pull/6777)，**已关闭，是否合并待确认**。 |

提供的数据中**未出现崩溃、数据丢失或安全问题报告**；这仅代表本次数据未覆盖相关问题，不等于项目不存在此类风险。

## 5. 功能请求与路线图信号

今日没有新增或活跃 Issue，未发现可确认的新功能请求。现有 PR 指向两个短期维护方向：

- **统一 CLI/状态命令与 WebUI 的指标展示**：[PR #6779](https://github.com/HKUDS/nanobot/pull/6779) 已开放，可作为后续版本的候选修复；目前没有证据确认其合并时间或版本归属。
- **巩固 WebUI 的交互稳定性和代码可维护性**：[PR #6777](https://github.com/HKUDS/nanobot/pull/6777) 与 [PR #6778](https://github.com/HKUDS/nanobot/pull/6778) 显示近期工作偏向前端打磨，但不能据此推断正式路线图。

## 6. 用户反馈摘要

**本次未提供 Issue 评论正文，因此无法提炼或引用真实用户评价，也无法判断满意度。**以下仅为 PR 摘要反映的问题场景：

- **多轮请求后的用量理解**：累计 Token 数与上下文窗口占用是不同指标；展示口径不一致会增加理解成本。[#6779](https://github.com/HKUDS/nanobot/pull/6779)
- **桌面端控件齐全时的回复操作**：按钮换行和来源入口位置变化，会影响布局稳定性及操作习惯。[#6777](https://github.com/HKUDS/nanobot/pull/6777)
- **开发者维护体验**：修改单个功能时，需要在大型全局样式表中寻找相关规则，维护成本较高。[#6778](https://github.com/HKUDS/nanobot/pull/6778)

## 7. 待处理积压

现有数据只覆盖过去 24 小时，**无法识别长期未响应的 Issue 或 PR**。当前可明确跟进的是：

- **评审状态统计修复**：[PR #6779](https://github.com/HKUDS/nanobot/pull/6779) 当日创建、仍开放，属于新增待办而非长期积压。建议核对 `/status` 与 WebUI 是否使用一致计数及舍入方式，并验证 18 次请求的复现场景。
- **确认关联 Issue 的后续处置**：[Issue #6774](https://github.com/HKUDS/nanobot/issues/6774) 被 #6779 标注为待解决对象，但未提供其当前状态、创建时间和讨论内容，不宜判断是否久拖未决。
- **核实已关闭 PR 的实际落地情况**：[PR #6777](https://github.com/HKUDS/nanobot/pull/6777)、[PR #6778](https://github.com/HKUDS/nanobot/pull/6778) 需确认是合并、撤回还是被替代，避免将关闭数量误计为已交付成果。

**健康度结论：**今日存在明确的维护投入，改动范围集中、问题描述具体；最值得跟进的是状态统计修复的评审，以及两条关闭 PR 的落地状态。评论、合并和历史积压信息不足，是本次评估的主要限制。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-24** · [项目仓库](https://github.com/NousResearch/hermes-agent)

## 1. 今日速览

过去 24 小时共有 **8 条 Issue 更新、22 条 PR 更新**，其中 21 条 PR 待合并、1 条已合并或关闭，显示出较高的开发活跃度。今日工作重点偏向**稳定性与边界场景修复**，覆盖 OAuth 凭据轮换、子智能体会话隔离、Windows 兼容性以及多端认证。新增反馈暴露了云端网关无法自启动、桌面端 REST 认证失败等影响核心使用链路的问题，同时有影视生成技能、LINE 群聊控制等能力扩展提案。**今日无新版本发布，交付成效暂不能等同于提交活跃度**；现有数据仅能确认一条 PR 已关闭，不能确认其已合并。

> **数据口径：**22 条 PR 中仅展示 20 条明细；Issue 评论数均为 0、👍 均为 0，PR 评论数为 `undefined`。因此无法可靠评选“讨论最热”，也无法从评论或历史记录判断长期积压。

## 2. 项目进展

### 已关闭：内置例程经聊天配置时的技能保留
[PR #159504](https://github.com/NousResearch/hermes-agent/pull/159504) 针对 `/blueprint important-mail` 等交互式配置流程：此前通过聊天逐项填写参数创建任务时，会遗漏例程依赖的技能，而仪表盘或完整命令行参数路径没有该问题。

- **推进价值：**补齐自然语言配置与其他入口之间的行为一致性，减少“任务创建成功但缺少执行能力”的隐性失败。
- **状态边界：**记录为 **CLOSED**，未提供合并标记；不能认定修复已进入主分支或正式版本。

### 待合并工作的主要推进方向
- **核心代理可靠性：**OAuth 账户池轮换和子智能体会话路由各有一条 P1 修复提案，是今日最值得跟踪的核心链路工作。[#159516](https://github.com/NousResearch/hermes-agent/pull/159516)、[#159513](https://github.com/NousResearch/hermes-agent/pull/159513)
- **客户端互操作性：**修正 RPC 中非法 `Infinity` 值，目标是阻止严格 JSON 客户端进入断线重连循环。[#159519](https://github.com/NousResearch/hermes-agent/pull/159519)
- **Windows 可用性：**涉及技能目录只读属性、配置档目录被插件进程占用，以及测试和换行兼容问题，说明维护工作正覆盖实际桌面部署环境。[#159523](https://github.com/NousResearch/hermes-agent/pull/159523)、[#159517](https://github.com/NousResearch/hermes-agent/pull/159517)、[#159512](https://github.com/NousResearch/hermes-agent/pull/159512)、[#159509](https://github.com/NousResearch/hermes-agent/pull/159509)

**整体判断：**今日呈现出较密集的修复供给，但已确认的交付证据有限，当前更接近“修复集中提交期”，而非“问题集中解决期”。

## 3. 社区热点

由于互动数据不足，以下按**影响范围与跨条目聚集程度**筛选关注主题，不代表评论热度排名。

| 关注主题 | 代表条目 | 背后诉求 |
|---|---|---|
| 多端认证一致性 | [桌面远程连接 #159501](https://github.com/NousResearch/hermes-agent/issues/159501)、[Webapp 登录 #159500](https://github.com/NousResearch/hermes-agent/issues/159500) | 用户需要“连接或登录成功”真正意味着 REST 接口可用，而不是仅 WebSocket 或登录页面成功。 |
| 会话身份与隔离 | [身份绑定消息注入 #159510](https://github.com/NousResearch/hermes-agent/issues/159510)、[子智能体路由修复 #159513](https://github.com/NousResearch/hermes-agent/pull/159513) | 长期任务、插件和子智能体需要稳定的会话身份，不能只依赖可能复用或变更的路由。 |
| 桌面技能与文档体验 | [技能页卡顿 #159515](https://github.com/NousResearch/hermes-agent/issues/159515)、[文件预览 #159499](https://github.com/NousResearch/hermes-agent/issues/159499) | 用户关注的不只是代理是否完成操作，还包括能否快速浏览能力、方便地验收修改结果。 |
| 部署安全与凭据保护 | [镜像漏洞 #159506](https://github.com/NousResearch/hermes-agent/issues/159506)、[后台进程安全输入 #159526](https://github.com/NousResearch/hermes-agent/pull/159526) | 自托管和长期运行场景要求同时保障依赖供应链与运行时敏感输入安全。 |

## 4. Bug 与稳定性

以下优先列出高优先级及核心链路问题；**P1/P2/P3 为原始标签，不代表本文重新评定的安全严重等级**。“未见修复”仅指所提供的数据中未发现对应 PR。

| 优先级 | 问题与影响 | Fix PR 状态 |
|---|---|---|
| **P1** | OAuth 池中账户达到刷新上限后直接失败，而非切换健康账户；重复刷新还可能撤销其他委派任务正在使用的令牌。 | [#159516](https://github.com/NousResearch/hermes-agent/pull/159516) 待合并 |
| **P1** | 子智能体会话可能接管父聊天路由，导致父会话结束、委派结果丢失。 | [#159513](https://github.com/NousResearch/hermes-agent/pull/159513) 待合并 |
| **P2** | Hermes Cloud 连续两次快速硬重启后，网关状态可能停留在 `starting` 且缺少 `desired_state`，后续启动不再自动拉起网关。[Issue #159527](https://github.com/NousResearch/hermes-agent/issues/159527) | 未见对应修复 |
| **P2** | 桌面端打开 Skills 初始页面即阻塞主线程约 **1.7 秒**，报告指向每个分类重复扫描完整目录；不同于已有输入搜索路径问题。[Issue #159515](https://github.com/NousResearch/hermes-agent/issues/159515) | 未见对应修复 |
| **P2** | Windows 删除配置档时，插件宿主进程占用目录，触发 `WinError 32`。 | [#159517](https://github.com/NousResearch/hermes-agent/pull/159517) 待合并 |
| **P2** | 多个托管 worker 同批丢失时，相同错误可能导致多张看板卡片过早受阻；上下文压缩可行性跳过也可能被误计为无效压缩。 | [#159514](https://github.com/NousResearch/hermes-agent/pull/159514)、[#159508](https://github.com/NousResearch/hermes-agent/pull/159508) 待合并 |
| **P3，核心功能受阻** | Windows Desktop token 模式下 WebSocket 成功认证，但 REST 未携带凭据，`/api/profiles`、`/api/config` 返回 401。[Issue #159501](https://github.com/NousResearch/hermes-agent/issues/159501) | 未见对应修复 |
| **P3，核心功能受阻** | Webapp 在 loopback 监听配置下登录成功并设置 Cookie，但后续认证接口仍返回 401。[Issue #159500](https://github.com/NousResearch/hermes-agent/issues/159500) | 未见对应修复 |
| **P3，安全待核实** | 用户报告 `stable-desktop` 镜像被 Coolify 扫描出 3 项已知未修补漏洞，扫描结果为“No fix yet”。摘要未提供 CVE 或可利用条件，暂不能判断实际风险等级。[Issue #159506](https://github.com/NousResearch/hermes-agent/issues/159506) | 未见对应修复 |

**其他值得跟踪的兼容性问题：**

- 非有限浮点数被输出为非法 JSON，可能使 iOS 等严格客户端约每 2 秒重连一次；已有待合并修复。[PR #159519](https://github.com/NousResearch/hermes-agent/pull/159519)
- Provider 插件包含长文件名测试文件时可能无法暂存，进而出现 `Unknown provider` 和静默回退；已有待合并修复。[PR #159521](https://github.com/NousResearch/hermes-agent/pull/159521)
- Discord 重连回填消息可能连续打断前一轮执行；拟将回填排在活动轮次之后。[PR #159518](https://github.com/NousResearch/hermes-agent/pull/159518)

## 5. 功能请求与路线图信号

| 方向 | 当前信号 | 下一版本判断 |
|---|---|---|
| **插件消息绑定会话身份** | 希望延迟任务投递给“调度时的会话”，避免同一路由重置后误投。[Issue #159510](https://github.com/NousResearch/hermes-agent/issues/159510) | 尚处需求阶段，未见直接实现 PR。 |
| **可统计的对话拒绝结果** | 为最终轮次结果增加类型化 disposition，使运营方无需匹配回复文本即可统计拒绝。[Issue #159505](https://github.com/NousResearch/hermes-agent/issues/159505) | 指向代理结果结构化与可观测性，尚无明确交付信号。 |
| **修改文件一键渲染预览** | 从聊天中的 changed-files 卡片直接打开最终文档，而非只查看 diff。[Issue #159499](https://github.com/NousResearch/hermes-agent/issues/159499) | 明确的桌面工作流需求，未见配套 PR。 |
| **技能管理 API** | 新增 `DELETE /api/skills`，复用现有删除逻辑及 bundled／pinned／locked 限制。[PR #159522](https://github.com/NousResearch/hermes-agent/pull/159522) | 已有实现提案，比纯需求更接近交付，但仍待合并。 |
| **LINE 群聊控制** | 增加 @mention 门控、媒体绕过、类型过滤及被动观察。[PR #159503](https://github.com/NousResearch/hermes-agent/pull/159503) | 扩大消息适配器能力一致性，需继续观察审核结果。 |
| **代码驱动讲解影片生成** | 可选 cinematic-film 技能支持脚本、配音、字幕与画面渲染。[PR #159507](https://github.com/NousResearch/hermes-agent/pull/159507) | 属于能力扩展探索；标题注明 optional、upstream stub，不宜视为完整内置能力。 |
| **后台进程安全输入** | 为本地长任务扩展安全输入路径，叠加在前台安全输入 PR 之上。[PR #159526](https://github.com/NousResearch/hermes-agent/pull/159526) | 存在前置依赖 [#56937](https://github.com/NousResearch/hermes-agent/pull/56937)，交付节奏取决于依赖合并。 |

以上仅为实现成熟度判断，**不构成下一版本承诺**。

## 6. 用户反馈摘要

今日没有可供提炼的 Issue 评论，以下均来自**报告正文中的使用场景与痛点**，不代表社区普遍意见。

- **云端常驻运行：**快速硬重启后的状态残留，会让用户遭遇跨重启持续存在的服务不可用，而非一次性启动失败。[#159527](https://github.com/NousResearch/hermes-agent/issues/159527)
- **Windows 远程使用：**连接成功但页面接口持续 401，形成“看起来连上、实际上无法使用”的体验断层。[#159501](https://github.com/NousResearch/hermes-agent/issues/159501)
- **深层 Markdown 知识库：**使用 4–5 层目录的用户更想验收最终渲染结果，而不是查看差异，说明文档交付体验仍有缺口。[#159499](https://github.com/NousResearch/hermes-agent/issues/159499)
- **能力浏览：**无需输入查询就出现约 1.7 秒卡顿，性能瓶颈发生在最基础的页面打开路径。[#159515](https://github.com/NousResearch/hermes-agent/issues/159515)
- **代理运营统计：**用户希望把“对话拒绝”转为机器可读结果，反映出需求正从个人聊天延伸到监测、统计和自动化处理。[#159505](https://github.com/NousResearch/hermes-agent/issues/159505)

本批数据没有明确的正向满意度反馈，不能据此计算或推断整体满意度。

## 7. 待处理积压与维护建议

**无法确认长期未响应条目：**所展示条目均在当天创建和更新，且没有历史响应时间。以下是建议优先跟踪的待办，而非已经证实的长期积压。

1. **优先审查两条 P1 修复：**重点验证 OAuth 并发持有者场景、子智能体会话重标记与路由隔离回归测试。[#159516](https://github.com/NousResearch/hermes-agent/pull/159516)、[#159513](https://github.com/NousResearch/hermes-agent/pull/159513)
2. **为新增核心故障明确负责人：**云端自启动、Desktop REST 认证、Webapp Cookie 授权均尚未见对应修复 PR，建议先完成复现与影响范围确认。[#159527](https://github.com/NousResearch/hermes-agent/issues/159527)、[#159501](https://github.com/NousResearch/hermes-agent/issues/159501)、[#159500](https://github.com/NousResearch/hermes-agent/issues/159500)
3. **补全镜像安全信息：**需要 CVE、受影响组件版本、镜像摘要与可利用条件，才能判断是否需要紧急重建或部署缓解措施。[#159506](https://github.com/NousResearch/hermes-agent/issues/159506)
4. **澄清关闭与交付状态：**确认内置例程修复是已合并、被替代还是仅关闭，并标明可用版本，避免用户误判已修复。[#159504](https://github.com/NousResearch/hermes-agent/pull/159504)

**健康度结论：**项目开发活跃，修复覆盖面较广；当前主要风险集中在认证、会话隔离和常驻服务恢复。后续应重点观察待合并修复能否及时落地，以及新增核心故障是否得到明确响应。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-24｜统计范围：过去 24 小时**

> **数据说明：**本报告仅依据所提供的 GitHub 数据。项目标注为 [qwibitai/nanoclaw](https://github.com/qwibitai/nanoclaw)，但唯一 PR 的链接标注为 [nanocoai/nanoclaw#4556](https://github.com/nanocoai/nanoclaw/pull/4556)，存在仓库路径差异，建议核对；下文沿用所提供的 PR 链接。

## 1. 今日速览

今日记录到 **0 条 Issue 更新、1 条 PR 更新、0 个新版本发布**，项目可见活跃度较低，主要活动来自自动化镜像维护。唯一更新是机器人提交的 [PR #4556](https://github.com/nanocoai/nanoclaw/pull/4556)，拟更新 `v2026.11.0` 对应的加固版 Agent 镜像，目前仍待合并。今日没有已合并或关闭的 PR，因此尚无可确认的代码落地进展。现有数据体现出自动化维护活动，但不足以判断整体社区健康度或稳定性趋势。

## 2. 项目进展

### 待合并：Agent 加固镜像更新
[PR #4556 — agent-images: v2026.11.0 → v2026.11.0-20261123T2132](https://github.com/nanocoai/nanoclaw/pull/4556)

- **作者：**`nanoclaw-image-refresh[bot]`
- **状态：**OPEN；今日创建并更新。
- **变更内容：**将 `v2026.11.0-20261123T2132` 列为 `v2026.11.0` 对应的加固镜像，替换此前引用的 Agent 镜像摘要。新镜像为：
  ```text
  797273591697.dkr.ecr.us-east-1.amazonaws.com/nanoclaw/agent@sha256:5da78e4cc2e3ab8c98f0720f9275f2fb1d74a12070fa4038392f5de2be8728e1
  ```
- **进展判断：**属于运行镜像维护，而非已确认的产品功能升级。由于尚未合并，今日推进主要停留在变更提交阶段。
- **信息边界：**摘要未披露具体依赖更新、安全修复、兼容性变化或测试结果，不能据此认定已修复某项漏洞。

**今日无已合并或关闭的重要 PR。**

## 3. 社区热点

今日唯一可见议题是 [Agent 镜像刷新 PR #4556](https://github.com/nanocoai/nanoclaw/pull/4556)，但**没有足够数据将其认定为社区热议话题**：

- 👍 为 **0**。
- 评论字段为 `undefined`，表示评论数不可用，不能视为零评论。
- 提交者为机器人，未提供人工讨论内容。

该变更反映了对 Agent 运行镜像持续维护的关注，但无法从现有资料判断用户诉求或社区共识。

## 4. Bug 与稳定性

- **今日提供的数据中无新增或活跃 Bug Issue**，也无可确认的崩溃、回归问题及对应修复 PR；这不等于项目不存在相关问题。
- [PR #4556](https://github.com/nanocoai/nanoclaw/pull/4556) 涉及加固镜像，但没有关联 Bug、漏洞编号或修复说明，因此不将其归类为已确认的安全修复。
- **维护建议：**审核该 PR 时，核验镜像来源、扫描结果及运行兼容性，尤其关注摘要替换后的启动与核心 Agent 工作流是否正常。

## 5. 功能请求与路线图信号

今日无可见的新功能请求，也没有功能型 PR 可用于判断下一版本的范围。

唯一可观察到的方向是 **Agent 镜像维护**：[PR #4556](https://github.com/nanocoai/nanoclaw/pull/4556) 可能在合并后更新项目引用的镜像，但目前不能确认合并时间、交付方式或是否纳入下一版本。

## 6. 用户反馈摘要

今日未提供 Issue 评论或其他真实用户反馈，因此无法提炼具体使用场景、痛点或满意度。机器人提交的 [PR #4556](https://github.com/nanocoai/nanoclaw/pull/4556) 不应作为用户需求或体验反馈的替代证据。

## 7. 待处理积压

- **当前可见待处理项：**[PR #4556](https://github.com/nanocoai/nanoclaw/pull/4556) 尚待审核与合并；该 PR 为今日新建，**不属于长期积压**。
- **长期积压情况：**数据仅覆盖过去 24 小时的更新，未提供历史未响应事项，无法识别长期悬而未决的重要 Issue 或 PR。

---

**总体判断：**今日属于低活跃度、自动化维护主导的一天。最值得跟进的是镜像更新 PR 的审核结果及验证证据；现有数据不足以对功能推进速度、用户满意度或长期积压状况作出趋势判断。

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

# LobsterAI 项目动态日报｜2026-11-24

## 1. 今日速览

过去 24 小时，LobsterAI 有 **1 条 PR 更新、0 条 Issue 更新、0 个新版本发布**，公开活动量较低。今日唯一更新为 [PR #3170](https://github.com/netease-youdao/LobsterAI/pull/3170)，重点修复 OpenClaw 升级至 DSH 后即时通讯私聊会话的连续性问题。该 PR 状态为 **CLOSED**，但所给数据未提供合并标记，因此不能确认修复已进入主分支。整体来看，今日属于低活跃度的稳定性维护日，工作集中于升级兼容与历史会话体验，而非新增功能。

## 2. 项目进展

### 私聊会话升级兼容修复
[PR #3170 — fix(im): preserve direct-message conversations across the DSH upgrade](https://github.com/netease-youdao/LobsterAI/pull/3170)  
作者：`btc69m979y-dotcom`｜涉及模块：`main`、`im`｜状态：**已关闭，是否合并未确认**

- **修复背景**：从 OpenClaw 升级至 DSH 后，同一机器人与同一联系人的私聊消息可能在桌面端创建第二个会话，造成会话分裂。
- **预期效果**：继续使用原有会话，覆盖钉钉、飞书、企业微信、微信和 QQ。
- **已有重复会话的处理**：PR 摘要提及早期 DSH 构建已经创建重复会话的情况，但摘要在说明处理结果前被截断，无法确认是否会合并历史、保留两份记录或采取其他策略。
- **推进幅度**：这是针对升级路径的定向稳定性改进，具有多渠道覆盖价值；但因缺少合并与测试信息，尚不能认定问题已在可用版本中解决。

## 3. 社区热点

### 唯一公开更新聚焦升级后的会话连续性
[PR #3170](https://github.com/netease-youdao/LobsterAI/pull/3170)

- **可见互动**：👍 0；评论数字段为 `undefined`，应视为缺失，而不是 0 条评论。
- **关注诉求**：升级不应改变用户对“同一联系人、同一会话”的预期，尤其需要避免历史上下文被拆分。
- **热度判断**：当天没有 Issue 更新，也没有其他 PR 可供比较，因此只能将其视为唯一观察点，不能据此判断社区讨论热烈或形成广泛共识。

## 4. Bug 与稳定性

| 优先级评估 | 问题与影响 | 修复状态 |
|---|---|---|
| **中等：升级兼容与使用连续性问题** | OpenClaw → DSH 升级后，同一机器人和联系人可能产生第二个桌面私聊会话，导致历史上下文分散。涉及钉钉、飞书、企业微信、微信、QQ。现有摘要未显示崩溃或数据丢失。 | 已有 [fix PR #3170](https://github.com/netease-youdao/LobsterAI/pull/3170)，状态为 CLOSED；是否合并、是否发布均未确认。 |

**维护建议**：围绕该修复核验升级前后会话是否一致，以及已经出现重复会话时历史记录的可访问性。当天未提供新增 Bug Issue 或崩溃报告，但零 Issue 更新不等于不存在未报告问题。

## 5. 功能请求与路线图信号

- **未观察到新增功能需求**：本次数据没有 Issue 更新，唯一 PR 也属于修复，无法据此确认新增功能计划。参考：[PR #3170](https://github.com/netease-youdao/LobsterAI/pull/3170)。
- **可见方向是升级兼容与多渠道一致性**：该修复同时覆盖五类 IM 渠道，说明会话连续性是当前维护关注点之一。若修复已合并，可能成为后续版本的稳定性更新内容，但现有数据不足以确认纳入版本或发布时间。参考：[PR #3170](https://github.com/netease-youdao/LobsterAI/pull/3170)。

## 6. 用户反馈摘要

**本次没有可供提炼的 Issue 评论，不能形成真实用户满意度结论。** 以下仅为 PR 描述体现的问题场景，不代表用户评论或访谈结果。

- **使用场景**：用户升级至 DSH 后，继续通过外部 IM 联系同一机器人，并在桌面端查看、延续对话。
- **潜在痛点**：重复会话会增加查找历史记录的成本，也可能让用户误以为原有上下文未被保留。
- **反馈边界**：没有可验证的用户评价、受影响人数或修复后反馈。上述场景均来自 [PR #3170](https://github.com/netease-youdao/LobsterAI/pull/3170) 的问题描述。

## 7. 待处理积压

本次数据未提供历史 Issue、长期开放 PR 或响应时间信息，**无法识别长期未响应的重要积压**。

当前建议优先补齐 [PR #3170](https://github.com/netease-youdao/LobsterAI/pull/3170) 的处理结论：确认关闭是否代表已合并、修复将随哪个版本交付，以及已产生重复会话的用户应如何处理。这属于信息闭环事项，不应将当天创建并关闭的 PR 归类为长期积压。

---

**项目健康度结论**：今日公开活动较少，但维护内容指向明确的升级兼容问题，具有实际使用价值。由于缺少合并状态、测试结果、用户反馈及历史积压数据，目前只能确认存在稳定性修复动作，不能进一步判断修复交付质量或项目长期健康趋势。

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
**日期：2026-11-24｜统计窗口：过去 24 小时**

> **数据说明：**本日报按 CoPaw 项目整理，但所提供条目的链接均指向 `agentscope-ai/QwenPaw`，以下保留该路径。分析仅依据所给标题、摘要与计数；未提供完整评论、评审和 CI 结果，问题是否成立及修复效果仍待验证。

## 1. 今日速览

今日共更新 **5 条 Issue、3 条 PR**，全部为新开且仍处于开放状态；**没有 Issue 关闭、PR 合并或新版本发布**。活跃度表现为集中提出问题和提交改动，尚未形成可确认的交付闭环。讨论重点集中在 **技能安装安全、沙箱资源与网络边界、长期记忆治理**，显示社区开始深入审视个人 AI 助手的安全性与长期运行可靠性。开发侧出现 Creator 功能更新、历史召回子进程清理修复及版本号调整，但均未合并，不能视为已上线能力。

## 2. 项目进展

**今日没有已合并或已关闭的重要 PR，能够确认的是候选改动推进，而非交付完成。**

| 待合并 PR | 推进内容 | 当前判断 |
|---|---|---|
| [#8885 Creator 2.0.7：审核恢复与媒体修复](https://github.com/agentscope-ai/QwenPaw/pull/8885) | 摘要涉及恢复旧项目及归档中的待决策事项、拒绝后清理失效产物引用、重放审核完成后的后续流程等 | 标记为 **XXXL**，变更范围较大，需重点检查状态恢复、旧数据兼容与回归测试 |
| [#8884 修复中断后的召回子进程回收](https://github.com/agentscope-ai/QwenPaw/pull/8884) | 针对本地 `recall_history_python` 在取消和超时路径中的进程清理问题 | 属于明确的稳定性修复候选，尚未合并 |
| [#8883 版本号调整至 2.3.1b2](https://github.com/agentscope-ai/QwenPaw/pull/8883) | 标题表明拟调整版本号；正文主要为模板内容 | 可视为版本准备信号，但不足以确认发布日期或版本范围 |

**进展评估：**今日有具体代码提案，但交付状态未发生变化。尤其应区分 Creator 的 **2.0.7** 与另一版本调整 PR 的 **2.3.1b2**，不能将二者合并解读为已发布版本。

## 3. 社区热点

5 条 Issue 均为 **1 条评论、0 个 👍**，且全部由同一作者提交；PR 评论数缺失。因此，今天没有可按互动量明确排出的“最热条目”，更接近一次集中式设计与安全问题梳理，而非已形成广泛社区共识。

- **安全默认值与防护是否真正生效**  
  [#8880 技能扫描默认放行](https://github.com/agentscope-ai/QwenPaw/issues/8880)、[#8879 沙箱资源限制未执行](https://github.com/agentscope-ai/QwenPaw/issues/8879)、[#8878 出站网络策略](https://github.com/agentscope-ai/QwenPaw/issues/8878)共同指向一个诉求：不能只提供扫描、配置或隔离机制，还需要明确其默认行为和实际保护边界。

- **长期记忆需要同时解决“记得住”与“不会串用”**  
  [#8882 长期记忆引用计数归档](https://github.com/agentscope-ai/QwenPaw/issues/8882)关注旧记忆堆积与重要信息遗忘；[#8881 检索层租户隔离](https://github.com/agentscope-ai/QwenPaw/issues/8881)关注数据作用域。两者说明记忆系统的诉求已从“保存信息”延伸至生命周期管理和隔离保证。

## 4. Bug 与稳定性

以下为**基于摘要的初步风险排序**，不是维护者确认的严重等级；目前未提供已利用、崩溃或回归验证证据。

| 优先级 | 问题与影响 | Fix PR 状态 |
|---|---|---|
| **高：安全策略可能放行风险技能** | [#8880](https://github.com/agentscope-ai/QwenPaw/issues/8880) 报告默认 `warn` 模式下，即使出现 CRITICAL 发现仍继续安装，扫描超时也采用放行行为；可能造成用户对扫描保护能力的误判 | 所给数据中未见 |
| **高：记忆检索隔离风险** | [#8881](https://github.com/agentscope-ai/QwenPaw/issues/8881) 指出隔离依赖目录约定，检索过滤可选；存在跨作用域取回数据的潜在风险，但摘要不足以证明已发生泄漏 | 所给数据中未见 |
| **高：资源约束未落地** | [#8879](https://github.com/agentscope-ai/QwenPaw/issues/8879) 报告 `max_processes`、`max_memory_mb` 被接受但未由任何后端执行，可能削弱资源耗尽防护 | 所给数据中未见 |
| **中高：出站访问防护缺口** | [#8878](https://github.com/agentscope-ai/QwenPaw/issues/8878) 提议默认拒绝元数据端点并引入策略文件允许列表；属于安全加固诉求，非已确认攻击事件 | 所给数据中未见 |
| **中：召回任务取消后残留子进程** | [#8884](https://github.com/agentscope-ai/QwenPaw/pull/8884) 描述协程取消后子进程继续运行，超时路径也未完整等待退出、清理管道，影响长期运行可靠性 | **已有修复 PR，待合并** |
| **中：长期记忆质量退化** | [#8882](https://github.com/agentscope-ai/QwenPaw/issues/8882) 指出缺少 TTL、引用跟踪与衰减机制，并引用历史“遗忘”反馈 | 所给数据中未见 |

## 5. 功能请求与路线图信号

- **记忆生命周期治理：**[#8882](https://github.com/agentscope-ai/QwenPaw/issues/8882) 提议通过引用计数及状态变化归档过时条目，而非直接删除。当前仅见设计 Issue，无法判断是否进入下一版本。
- **检索层强制租户作用域：**[#8881](https://github.com/agentscope-ai/QwenPaw/issues/8881) 希望将隔离要求下沉至检索层。尚无对应实现 PR。
- **更明确的 coding mode 出站策略：**[#8878](https://github.com/agentscope-ai/QwenPaw/issues/8878) 提议在现有 Landlock 端口规则之上增加元数据端点默认拒绝与策略文件允许列表，仍处于方案阶段。
- **近期交付候选：**已有代码提交的 [召回进程清理 #8884](https://github.com/agentscope-ai/QwenPaw/pull/8884) 与 [Creator 更新 #8885](https://github.com/agentscope-ai/QwenPaw/pull/8885)，比上述设计提案更接近交付，但没有合并记录或发布承诺。

## 6. 用户反馈摘要

**未提供评论正文，无法直接提炼评论中的真实用户评价。**从 Issue 描述可归纳出以下反馈信号：

- **长期使用时，重要信息遗忘与旧信息堆积并存。**[#8882](https://github.com/agentscope-ai/QwenPaw/issues/8882) 引用历史 [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) 的“持续遗忘”反馈，反映对长期记忆质量的不满；历史评论本次未提供。
- **安全配置应与实际执行一致。**[#8879](https://github.com/agentscope-ai/QwenPaw/issues/8879) 和 [#8880](https://github.com/agentscope-ai/QwenPaw/issues/8880) 体现对“配置存在但未限制”“扫描发现风险但仍安装”的担忧。
- **对已有安全工程有明确肯定。**[#8878](https://github.com/agentscope-ai/QwenPaw/issues/8878) 的描述认可现有文件系统隔离、内核状态验证，以及对限制未执行情况的透明说明；其诉求是补齐网络边界，而非否定现有沙箱工作。

## 7. 待处理积压

**本次数据无法识别长期未响应积压：所有列出的 Issue 和 PR 均于当天创建，且没有维护者响应内容。**建议优先跟踪：

1. **安全问题分诊：**确认 [#8880](https://github.com/agentscope-ai/QwenPaw/issues/8880)、[#8881](https://github.com/agentscope-ai/QwenPaw/issues/8881)、[#8879](https://github.com/agentscope-ai/QwenPaw/issues/8879) 的适用配置、复现条件与风险边界。
2. **小型稳定性修复闭环：**审查 [#8884](https://github.com/agentscope-ai/QwenPaw/pull/8884) 是否覆盖取消、超时及异常退出测试。
3. **大型变更评审风险：**为 [#8885](https://github.com/agentscope-ai/QwenPaw/pull/8885) 明确测试范围，重点验证旧项目恢复及审核状态一致性。
4. **历史记忆问题复核：**结合 [#8882](https://github.com/agentscope-ai/QwenPaw/issues/8882) 回查 [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571)，确认历史痛点是否仍可复现；不能据本次摘要认定其长期无人响应。

**健康度结论：**今日的问题发现和改动提交较集中，但合并、关闭、发布均为零。接下来最值得观察的指标是安全问题能否及时完成分诊、稳定性修复能否落地，以及大型 Creator PR 是否具备充分的回归验证。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*