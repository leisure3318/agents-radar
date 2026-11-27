# OpenClaw 生态日报 2026-11-27

> Issues: 56 | PRs: 69 | 覆盖项目: 13 个 | 生成时间: 2026-11-27 03:56 UTC

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
**日期：2026-11-27｜项目：[openclaw/openclaw](https://github.com/openclaw/openclaw)**

> 数据口径：基于所提供的过去 24 小时统计及部分 Issue/PR 明细。PR 数据未区分“已合并”和“仅关闭”，且评论字段缺失，因此不将关闭直接视为功能落地，也不对 PR 讨论热度排名。用户反馈依据 Issue 正文摘要提炼，而非未提供的评论内容。

## 1. 今日速览

过去 24 小时，OpenClaw 有 **56 条 Issue 更新、69 条 PR 更新**，其中 Issue 新开/活跃 43 条、关闭 13 条；PR 待合并 47 条、合并或关闭 22 条，项目保持较高开发活跃度。今日未发布新版本，工作重点集中在 **升级恢复、SQLite 会话存储、模型认证以及语音会话生命周期**。稳定性压力仍然明显：可见列表中存在一个标为 P0 的认证引导问题，以及多项涉及消息阻塞、Gateway 卡顿和 Windows 服务启动的 P1 问题。整体呈现“修复与重构并行、贡献活跃，但高风险改动仍需验证”的状态；仅凭单日数据，不能判断积压是否持续改善。

## 2. 项目进展

### 已关闭 PR：工程收敛明确，合并结果待确认

以下重要 PR 在快照中均为 **CLOSED**，但没有合并标记，不能确认已进入主分支：

| PR | 推进方向与意义 |
|---|---|
| [#206323：隔离模型调用跳过无关 harness 发现](https://github.com/openclaw/openclaw/pull/206323) | 拟避免单次模型调用或模型目录读取遍历全部 agent/model 配置，降低大型配置下的额外开销。 |
| [#206330：审批测试隔离 shell 启动环境](https://github.com/openclaw/openclaw/pull/206330) | 针对宿主机 `BASH_ENV`、`ENV` 导致的 63 项测试失败，提高测试结果的可重复性；不代表修复了 63 个产品缺陷。 |
| [#206312：子代理完成通知不显示回复头](https://github.com/openclaw/openclaw/pull/206312) | 拟消除共享聊天中完成通知与正式回答出现重复“Replying to”头的混淆。 |
| [#206316：清理退役的 stream-follow 测试接口](https://github.com/openclaw/openclaw/pull/206316) | 减少为旧测试保留的生产代码分支，让测试更贴近现有滚动行为。 |

### 其他关闭信号

[P1 升级维护租约问题 #205939](https://github.com/openclaw/openclaw/issues/205939)、[备份提交缺表却报告成功 #206186](https://github.com/openclaw/openclaw/issues/206186)、[Mattermost 非字母数字按钮失效 #206226](https://github.com/openclaw/openclaw/issues/206226) 已关闭，说明相关条目已完成一定程度的分流或处置；但缺少关闭原因及对应合并记录，不能直接宣告修复。

**进展判断：**今日可确认的是队列处置和工程收敛在持续进行；面向用户的实际交付增量，仍需结合合并记录和后续版本核验。

## 3. 社区热点

可见 Issue 的最高评论数为 4，所有展示条目的 👍 均为 0。因此，今天更适合观察“问题集中度”，而非把少量评论解释为广泛共识。

- **历史会话迁移后的可用性——[#206030](https://github.com/openclaw/openclaw/issues/206030)，4 条评论。**  
  用户报告约 8 个月历史会话迁入 SQLite 后，回收机制无法消化积压，最终出现数据库降级及频道消息被拒绝。核心诉求不是迁移“执行成功”，而是迁移后系统仍能持续提供服务。

- **Gateway 长时间运行性能——[#206264](https://github.com/openclaw/openclaw/issues/206264)，3 条评论。**  
  报告称创建 Worker 的主线程阻塞均值在约两天内由 0.27 秒增至 2.5 秒，峰值达 9–12 秒。问题指向退出 Worker 的 SQLite admission 引用仍被重复序列化，反映常驻助手对长期运行可靠性的要求。

- **自动化会话记录一致性——[#206084](https://github.com/openclaw/openclaw/issues/206084)，3 条评论。**  
  `/hooks/agent` 在 persistent 会话、`deliver: false` 组合下将回复写入两次。自动化用户需要“调用一次、记录一次”，避免历史污染影响后续上下文和审计。

- **子代理不能阻塞用户对话——[#206335](https://github.com/openclaw/openclaw/issues/206335)，2 条评论。**  
  慢工具调用导致请求者的 Signal 私聊消息持续排队，暴露出后台代理执行与前台交互隔离不足的问题。

## 4. Bug 与稳定性

以下按 **Issue 标注优先级** 排列；“未见 fix PR”仅表示所给数据中没有可确认的对应修复。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **P0** | [#206215：Claude Code 登录永久过期被识别为未知错误](https://github.com/openclaw/openclaw/issues/206215)。聊天未提供重新登录指引，标注为 UX 发布阻塞项。 | 标签显示已有开放关联 PR，但明细未给出编号。 |
| **P1** | [#206030：迁移积压无法回收](https://github.com/openclaw/openclaw/issues/206030)。涉及数据库降级、消息拒收及 crash-loop 标签。 | 未见 fix PR，待维护者评审。 |
| **P1** | [#206264：Gateway 主线程阻塞随运行时间增长](https://github.com/openclaw/openclaw/issues/206264)。影响长期在线服务响应。 | 未见 fix PR，待维护者评审。 |
| **P1** | [#206335：子代理 continuation 长期占用请求者频道会话](https://github.com/openclaw/openclaw/issues/206335)。慢调用可能使用户无法继续交互。 | 未见 fix PR，待维护者评审。 |
| **P1** | [#206272：Windows daemon 安装记录临时 fnm 路径或接受 Bun 的 node.exe shim](https://github.com/openclaw/openclaw/issues/206272)。存在服务启动风险。 | 已标注可复现、修复方向清晰，未见对应 PR。 |
| **P1** | [#206320：Codex 基础提示词切换后长任务提前停止](https://github.com/openclaw/openclaw/issues/206320)。影响无人值守 cron 完整执行。 | 未见 fix PR，待维护者确认回归。 |
| **P2** | [#206311：备份 PAX 路径含换行时解析错误](https://github.com/openclaw/openclaw/issues/206311)。可能导致校验失败或恢复文件名截断。 | 有源码复现，未见 fix PR。 |
| **P2** | [#206207：L1 记忆提取无限重试](https://github.com/openclaw/openclaw/issues/206207)。报告约每 3.4 秒创建一次提取会话，重试计数不增长。 | 未见 fix PR。 |
| **P2** | [#206303：Qwen4-Max 思考强度参数丢失](https://github.com/openclaw/openclaw/issues/206303)。`low` 与 `xhigh` 请求参数相同。 | 已有开放修复 [#206346](https://github.com/openclaw/openclaw/pull/206346)。 |
| **P2** | [#206084：Webhook 持久会话重复写入回复](https://github.com/openclaw/openclaw/issues/206084)。影响会话状态一致性。 | 已标注可排队修复，未见对应 PR。 |

**跨平台风险补充：**结束 Talk 时取消已接受任务的问题，已有 Apple 修复 [#206329](https://github.com/openclaw/openclaw/pull/206329) 和 Android 修复 [#206333](https://github.com/openclaw/openclaw/pull/206333)，但两者均标注兼容性风险、仍需证明。升级链路的 [#206341](https://github.com/openclaw/openclaw/pull/206341) 与 [#206295](https://github.com/openclaw/openclaw/pull/206295) 也仍开放，前者明确处于验证中的草稿阶段。

## 5. 功能请求与路线图信号

### 已有实现候选，值得跟踪后续版本

- **大型记忆导入断点续传：**[#206325](https://github.com/openclaw/openclaw/pull/206325) 对应 [#205796](https://github.com/openclaw/openclaw/issues/205796)，拟保存导入进度，避免中断后从头开始。已有实现和截图证明标签，但仍等待作者，属于较明确的交付候选。
- **Codex 原生子代理继承宿主工具处理能力：**[#206241](https://github.com/openclaw/openclaw/pull/206241) 拟解决子代理获得工具声明却没有 handler 的问题。功能价值明确，但涉及安全边界和兼容性，不能仅凭已有代码推断近期落地。
- **听写文件引用审阅：**[#206088](https://github.com/openclaw/openclaw/pull/206088) 提供实验性、显式启用的文件引用检查流程，降低同名、大小写和扩展名歧义；仍需验证。
- **个人听写词汇：**[#205880](https://github.com/openclaw/openclaw/pull/205880) 提出存储、编辑、导入导出与恢复机制，目前更接近基础能力建设，不能视为完整功能即将发布。

### 仍待产品或安全决策

- **可配置本地媒体根目录：**[#206324](https://github.com/openclaw/openclaw/issues/206324) 希望直接展示 WSL `/mnt/...` 等工作区外文件，需权衡便利性与文件访问边界。
- **凭据获取与执行衔接：**[#206306](https://github.com/openclaw/openclaw/issues/206306) 要求同一 run 使用刚保存的凭据；[#206305](https://github.com/openclaw/openclaw/issues/206305) 要求重启后仍存活的后台进程使用受保护密钥。两项均需产品与安全审查。
- **Workboard 内连续协作：**[#206212](https://github.com/openclaw/openclaw/issues/206212) 请求向卡片现有 worker 追问，[#206211](https://github.com/openclaw/openclaw/issues/206211) 请求在卡片内聚合相关对话；可见数据中尚无对应实现 PR。
- **插件可控地添加模型请求头：**[#206349](https://github.com/openclaw/openclaw/issues/206349) 面向依赖传输层请求头进行路由的集成场景，目前仍处需求阶段。

## 6. 用户反馈摘要

- **“后台工作不应切断前台沟通。”** Signal 私聊被子代理占用，以及结束 Talk 取消已接受任务，都说明用户希望“关闭交互界面”与“终止任务”是两个明确动作。参见 [#206335](https://github.com/openclaw/openclaw/issues/206335)、[#206329](https://github.com/openclaw/openclaw/pull/206329)。
- **“大规模历史数据需要可恢复流程。”** 一位用户的 Learn from Memory 导入涉及 122 个文件、约 4.1 MB，读取 `MEMORY.md` 后停止且无法续传，表明记忆能力已进入真实存量数据导入场景。参见 [#205796](https://github.com/openclaw/openclaw/issues/205796)。
- **“安全限制需要解释，而不是模糊失败。”** 文件拾取拒绝硬链接被误解为缺少用户授权，显示错误分类会直接影响 agent 的解释与后续操作。参见 [#206340](https://github.com/openclaw/openclaw/issues/206340)。
- **“运维工具之间应形成闭环。”** Doctor 建议删除的旧 agent 目录又被维护任务重建；凭据粘贴命令保存明文后又被 secrets audit 报警，均增加用户修复成本。参见 [#205927](https://github.com/openclaw/openclaw/issues/205927)、[#206225](https://github.com/openclaw/openclaw/issues/206225)。

提供的数据以缺陷和需求为主，**没有足够直接的正向反馈支持满意度判断**。

## 7. 待处理积压与维护者提醒

本批可见条目主要创建于 11 月 26–27 日，且没有首次维护者响应时间，**无法识别真正“长期未响应”的积压**。更合理的关注对象是以下高风险待办：

1. **优先闭环 P0 认证引导。** [#206215](https://github.com/openclaw/openclaw/issues/206215) 虽有关联开放 PR，仍需确认错误分类、重新登录提示及回归验证。
2. **优先处理可能扩大故障范围的 P1。** [迁移积压 #206030](https://github.com/openclaw/openclaw/issues/206030)、[Worker 序列化增长 #206264](https://github.com/openclaw/openclaw/issues/206264)、[频道阻塞 #206335](https://github.com/openclaw/openclaw/issues/206335) 均未见对应修复 PR，应优先明确复现条件与处置方案。
3. **为高风险 PR 设置明确验证门槛。** [Codex 工具委派 #206241](https://github.com/openclaw/openclaw/pull/206241) 涉及安全边界；[更新恢复 #206295](https://github.com/openclaw/openclaw/pull/206295) 涉及自动化与兼容性，不宜以合并速度替代验证质量。
4. **补齐关闭条目的结果追踪。** [备份缺表 #206186](https://github.com/openclaw/openclaw/issues/206186) 和 [Mattermost 按钮 #206226](https://github.com/openclaw/openclaw/issues/206226) 已关闭，但仍需核验关闭原因、修复提交及可用版本，避免用户将“关闭”误读为“已发布”。

**今日结论：**OpenClaw 的贡献与问题处理活动保持活跃，但项目健康度的关键仍是可靠性交付：先确保升级可恢复、消息不被阻塞、长期运行不退化，再扩大多代理、记忆与语音能力的覆盖面。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-27｜核心参照：OpenClaw**

> **口径说明**：以下比较基于提供的过去 24 小时更新快照，Issue、PR 数均为“更新条目数”，不是新增量或仓库总量；`CLOSED` 不等于已合并。部分项目仅提供部分明细，评论数据普遍不完整，因此不以关闭率推断交付效率，也不以单日活动推断长期社区规模。

## 1. 生态全景

13 个项目合计记录 **124 条 Issue、198 条 PR 更新，均未报告新版本发布**，开发活动主要集中在 OpenClaw、Hermes Agent 和 ZeroClaw。生态关注点正从“能调用多少工具”转向“能否长期、可靠、可控地完成任务”，典型问题包括会话恢复、记忆正确性、后台任务隔离和审批边界。功能扩展仍在继续，但多集中于 MCP、办公连接器、模型网关和渠道输入等实际工作流，而非单纯增加聊天能力。整体呈现**高活跃项目修复与扩展并行、部分项目进行专项维护、多个项目单日静默**的格局；当前最缺少的不是补丁提案，而是可验证的合并、发布和用户回归闭环。

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 本窗口健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | **56** | **69** | 无 | 活动量最高；认证、迁移、长期运行与消息阻塞风险突出，关键修复仍需验证 |
| **Hermes Agent** | **50** | **50** | 无 | 修复提案密集；审批、脱敏、数据保全和 Profile 隔离值得优先核查 |
| **ZeroClaw** | 5 | **38** | 无 | 代码侧活动强；记忆正确性与工程可靠性集中补强，实际合并成果不完整 |
| **LobsterAI** | 1 | **20** | 无 | 运行时、工作台和连接器成组推进；部分有实测证据，合并与发布待核验 |
| **CoPaw** | 7 | 8 | 无 | 多项问题已有补丁；全部开放，执行预算和前端状态尚待闭环 |
| **NanoBot** | 5 | 5 | 无 | 聚焦代理网络和输出格式；Claude 历史缓存问题未见修复方案 |
| **NanoClaw** | 0 | 4 | 无 | 路由时序、镜像维护与安全流程并行；暂无已确认交付 |
| **PicoClaw** | 0 | 2 | 无 | 仅自动化依赖升级，无法据此判断人工维护效率或总体质量 |
| **Moltis** | 0 | 2 | 无 | Signal 启动阻断和 Discord 附件缺失已有待审方案 |
| **NullClaw** | 0 | 0 | 无 | 本窗口无活动，长期状态未知 |
| **IronClaw** | 0 | 0 | 无 | 本窗口无活动，长期状态未知 |
| **TinyClaw / TinyAGI** | 0 | 0 | 无 | 本窗口无活动，长期状态未知 |
| **ZeptoClaw** | 0 | 0 | 无 | 本窗口无活动，长期状态未知 |

**集中度观察：**OpenClaw 与 Hermes Agent 合计贡献约 **85% 的 Issue 更新**；两者加 ZeroClaw，贡献约 **79% 的 PR 更新**。这说明本批开发与反馈高度集中，但不代表市场份额或用户数量。

*标识提醒：NanoClaw 的项目标识与 PR 仓库路径不一致；CoPaw 的条目链接指向 QwenPaw，后续跟踪应先核实仓库对应关系。*

## 3. OpenClaw 在生态中的定位

### 优势：复杂个人助手场景的覆盖面与反馈密度

- **本窗口活动规模领先。**69 条 PR、56 条 Issue 更新均为样本最高，说明贡献输入和问题反馈较充分；但也意味着维护、评审和回归验证压力更大。
- **场景覆盖广。**可见工作涉及多渠道消息、多代理、长期记忆、语音、桌面与移动端，以及升级、备份和凭据管理，呈现综合型个人助手平台特征。
- **真实运行负载暴露得较充分。**约 8 个月历史会话迁移、持续运行约两天后的 Gateway 退化、大批量记忆导入等报告，为容量与耐久性验证提供了具体场景。

### 技术路线：综合能力整合，同时承担跨模块耦合成本

| 对比对象 | 本窗口可见的路线差异 |
|---|---|
| **Hermes Agent** | 两者均覆盖复杂助手运行；OpenClaw 更突出跨渠道、语音及任务生命周期，Hermes 更突出多 Profile、插件配置、成本与上下文治理 |
| **ZeroClaw** | OpenClaw 侧重综合交互与运行链路；ZeroClaw 更集中于记忆语义、预算精度和无 Shell 的确定性技能执行 |
| **LobsterAI** | OpenClaw 展现多渠道常驻助手特征；LobsterAI 更突出桌面 Cowork 工作台、会话导航和办公连接器 |
| **NanoBot / Moltis** | 两者本窗口变更范围更聚焦于网络、输出格式或渠道接入，不能据此认定其整体能力较弱 |

### 核心短板：能力广度尚未充分转化为可靠性优势

OpenClaw 的认证引导 P0，以及迁移积压、Gateway 阻塞、子代理占用前台会话等 P1，均涉及基础可用性。**当前更合理的定位是“场景广、活动强、系统复杂度高”，而不是“稳定性已领先”。**

社区规模方面，只能确认其**本窗口可见活动规模最大**；缺少独立贡献者数、活跃用户、下载量和长期响应时间，无法断言其拥有最大社区。

## 4. 共同关注的技术方向

| 方向 | 涉及项目 | 具体诉求与共同含义 |
|---|---|---|
| **会话与任务状态一致性** | OpenClaw、Hermes、NanoClaw、CoPaw、LobsterAI | 解决重复记录、异常状态残留、上下文乱序、任务完成但界面不更新等问题；执行状态、持久化状态与展示状态需要统一 |
| **长期记忆与上下文治理** | OpenClaw、ZeroClaw、Hermes、LobsterAI | 导入可续传、迁移后仍可服务、旧事实不被恢复、压缩保留后台进程信息、上下文占用可观测 |
| **后台自动化与前台交互解耦** | OpenClaw、Hermes、LobsterAI | 子代理不阻塞用户、结束语音不误取消已接受任务、无人值守审批适配、定时任务会话合理归并 |
| **安全边界与凭据治理** | OpenClaw、Hermes、NanoBot、ZeroClaw、LobsterAI | 凭据作用域、审批覆盖、脱敏生效、代理与 SSRF 边界、无 Shell 执行、高风险邮件操作确认 |
| **真实部署兼容性** | NanoBot、Hermes、OpenClaw、CoPaw、LobsterAI、Moltis | 隔离容器 DNS、无头 OAuth、Windows 服务与安装、IPv6、macOS 构建、Signal 空响应兼容 |
| **渠道输入与输出保真** | NanoBot、CoPaw、Moltis、LobsterAI、OpenClaw | 数学公式、代码块和数字区间正确显示，附件不丢失，IM 正文完整，通知不重复 |
| **模型与工具生态扩展** | NanoBot、ZeroClaw、Hermes、LobsterAI、CoPaw | 网关、搜索提供商、MCP、模型发现和插件更新；扩展价值越来越依赖认证、配置与升级的一致性 |

需要注意：WebRouter、TrustedRouter 在多个项目出现，是**跨仓库接入信号**，但部分来自服务方提议，尚不足以证明广泛用户需求。

## 5. 差异化定位分析

以下定位依据本窗口的变更和使用场景推断，并非完整产品评测。

| 项目 | 功能侧重与目标用户 | 可见技术特征及决策关注点 |
|---|---|---|
| **OpenClaw** | 需要多渠道、语音、多代理和长期记忆的综合助手用户 | Gateway、Worker、SQLite 会话及跨端生命周期交织；重点验证模块隔离与长期运行 |
| **Hermes Agent** | 多身份、多实例、插件化和无人值守的进阶用户 | Profile、网关、持久会话、Shell hook 与上下文压缩；重点验证配置和安全作用域 |
| **ZeroClaw** | 重视记忆可信度、执行确定性和工程可维护性的开发者 | SQLite/Markdown 记忆路径、快照恢复、固定 executable＋argv 提案 |
| **LobsterAI** | 偏桌面办公、多任务协作的终端用户 | Electron＋DSH、Cowork 工作台、邮箱 MCP；重点验证桌面交互与运行时集成 |
| **NanoBot** | 使用聊天渠道、WebUI/TUI、Web/MCP 工具的自部署用户 | 共享代理、渠道 manifest、兼容模型接口；重点验证网络和请求语义一致性 |
| **CoPaw** | 依赖 Console、IM 渠道和定时任务的用户 | 工具预算门控、会话级模型、Relay/Console；重点验证执行控制与状态展示 |
| **NanoClaw** | 需要可靠消息路由和受维护 Agent 镜像的部署者 | 会话写入轮次、回填和唤醒上下文时序；重点验证并发正确性 |
| **Moltis** | 依赖 Signal、Discord 等消息入口的用户 | 渠道协议适配与附件输入链路；重点验证输入完整性 |
| **PicoClaw** | 本窗口不足以推断目标用户 | 仅见 Go 云 SDK 依赖升级，不能据此推断新增云能力 |

其余四个静默项目没有足够新增信息，无法进行可靠的架构或定位比较。也不宜仅根据项目名称推断其“轻量”“低资源”或“安全优先”。

## 6. 社区热度与成熟度

### 活跃度分层

- **高活动、广范围迭代：OpenClaw、Hermes Agent。**既有能力扩展，也有核心运行问题，属于“扩展与质量巩固并行”，不能简单归为成熟稳定。
- **代码侧密集推进：ZeroClaw、LobsterAI。**前者偏记忆与工程正确性，后者偏运行时、桌面体验和办公工作流；需继续核验提案转化为正式交付的比例。
- **聚焦式修复：CoPaw、NanoBot。**问题范围较明确，多项已有补丁，适合观察评审、回归测试和发布后的用户验证。
- **专项维护：NanoClaw、Moltis、PicoClaw。**样本少，分别聚焦路由/镜像、渠道、依赖维护，不能由单日低量推断衰退。
- **单日静默：NullClaw、IronClaw、TinyClaw、ZeptoClaw。**不足以判断项目停滞。

### “代码活跃”不等于“讨论热烈”或“产品成熟”

可见 Issue 最高评论数：OpenClaw 为 4，Hermes 和 CoPaw 为 2，NanoBot 和 LobsterAI 为 1；展示条目的点赞普遍为 0。因此，本期更准确的描述是**工程活动集中，而非形成高互动社区热点**。

成熟度应进一步看：高风险问题是否有负责人、修复是否合并、迁移是否可回滚、正式版本是否通过长期运行与跨平台验证。当前数据尚不足以给出可靠的成熟度总排名。

## 7. 值得关注的趋势信号

### ① 常驻助手的竞争正在转向耐久性

OpenClaw 的长期运行退化、Hermes 的异常会话残留、ZeroClaw 的归档与恢复问题表明，短时演示已不足以验证产品质量。

**开发参考：**将长时间运行、异常退出恢复、历史数据迁移和持续负载纳入测试，而非只测单次任务成功。

### ② 记忆系统需要管理“事实生命周期”

用户不仅要求保存信息，还要求旧事实失效、时间过滤准确、恢复不复活过时内容、导入中断可继续。

**开发参考：**明确记忆的版本、替代关系、来源与恢复语义；不能只用召回率衡量质量。

### ③ 任务状态可信度正在成为核心体验

多个项目出现“任务完成但仍显示运行”“已经回复却仍等待”“后台正常但前端不更新”等反馈。

**开发参考：**统一任务 ID、终态定义、事件投递和重连同步，并使重试具备幂等性，降低重复执行风险。

### ④ 安全与无人值守必须联合设计

Hermes 同时出现误拦截与漏拦截，OpenClaw 面临凭据与工具委派边界，ZeroClaw 提出无 Shell 执行，说明单纯增加审批弹窗不足以解决问题。

**开发参考：**优先采用结构化工具参数、最小权限、明确凭据作用域和高风险动作确认；自动化策略应同时控制误拒与误放。

### ⑤ 工作台与渠道正在成为两种互补入口

LobsterAI 强化侧聊、导航和办公连接器；OpenClaw、CoPaw、Moltis 等继续完善消息渠道。共同要求是：不同入口不应改变任务语义，也不能丢失文件、代码或完成状态。

**开发参考：**把渠道能力声明、内容转换和任务执行解耦，避免在核心逻辑中堆积渠道特例。

---

**决策结论：**本期 OpenClaw 在可见活动量和场景覆盖上领先，但可靠性优势尚未得到证明；Hermes 更值得关注多 Profile 与自动化治理，ZeroClaw 值得关注记忆和执行正确性，LobsterAI 则体现桌面办公工作台方向。选型不应按 PR 数量排序，而应围绕实际部署路径，验证 **长期运行、故障恢复、安全边界、状态一致性和发布可追溯性**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-27｜项目：[HKUDS/nanobot](https://github.com/HKUDS/nanobot)**

> **数据口径**：本日报依据所提供的 5 条 Issue、5 条 PR 撰写。PR 的 `CLOSED` 状态不等于已合并，以下统一标注“已关闭”，不将其视为已进入主分支。PR 评论数未提供，无法据此判断讨论热度；另有 Issue #6811 的更新时间为 11 月 26 日，与“过去 24 小时”统计窗口是否完全一致需进一步核验。

## 1. 今日速览

NanoBot 今日有 **5 条 Issue、5 条 PR 更新**，其中各有 3 条关闭、2 条保持开放，样本显示项目保持了较活跃的问题处理与代码迭代节奏。工作重点集中在**代理网络兼容性、聊天回复格式和 WebUI 国际化**，以增量修复和体验完善为主。新报告的 Claude 历史缓存标记丢失问题尚未见对应修复 PR，而代理环境下的网络访问问题已有 Web 与 MCP 两条修复线索。今日无新版本发布；整体健康度呈现“修复响应积极、仍有兼容性问题待验证”的状态，但仅凭关闭记录无法确认修复已合并或发布。

## 2. 项目进展

### 已关闭的重要 PR

| PR | 主要变化 | 进展判断 |
|---|---|---|
| [#6815：允许共享代理解析 web_fetch 目标](https://github.com/HKUDS/nanobot/pull/6815) | 开启 **Use proxy** 且配置共享代理时，将容器无法本地解析的目标域名交由代理解析，无需新增设置。 | 针对无公共 DNS 容器的关键兼容性修复；**已关闭，是否合并待确认**。 |
| [#6810：为 WebSocket 回复增加数学格式提示](https://github.com/HKUDS/nanobot/pull/6810) | 建议模型使用 `\(...\)` 与 `\[...\]`，避免把数学公式放入代码格式。 | 对应 WebUI/TUI 的公式渲染痛点；**已关闭，实际交付状态待确认**。 |
| [#6814：WebUI 希伯来语翻译](https://github.com/HKUDS/nanobot/pull/6814) | 覆盖 WebUI、19 个内置渠道配置界面及组件图库，并支持语言选择持久化。 | 扩大国际化覆盖面，保留原贡献者提交；**已关闭，是否合并待确认**。 |

### 仍在推进

- **[PR #6818：MCP 共享代理 DNS 修复](https://github.com/HKUDS/nanobot/pull/6818)**：让 SSE 和 Streamable HTTP 在仅代理能够解析服务域名时仍可连接并注册工具，目前开放。
- **[PR #6816：由各渠道声明回复格式](https://github.com/HKUDS/nanobot/pull/6816)**：通过渠道 manifest 的静态 `reply_format` 提供格式约定，减少核心模板内维护渠道特例的需求，目前开放。

**整体推进幅度：**今日属于聚焦明确的增量改进。代理修复面向实际部署阻塞，回复格式工作则从单点提示走向渠道级抽象；但缺少合并及测试结果，暂不宜判断这些能力已可用于正式版本。

## 3. 社区热点

当前样本的互动量较低：Issue 最多仅 **1 条评论**，所有条目均为 **0 个 👍**，PR 评论数未知。因此，以下更多反映需求方向，而非高热度共识。

- **搜索服务可靠性与多供应商选择**  
  [Issue #6812：WebRouter 搜索提供方](https://github.com/HKUDS/nanobot/issues/6812)，1 条评论，已关闭。用户指出免密钥搜索可能遇到错误或限流，而现有单供应商配置难以利用多套 API 密钥，诉求是更有韧性的搜索路由。关闭原因及是否采纳未提供。

- **新增模型网关接入**  
  [Issue #6813：TrustedRouter gateway](https://github.com/HKUDS/nanobot/issues/6813)，1 条评论，已关闭。反映社区对扩展模型接入渠道的兴趣；摘要引用了第三方服务的规模及隐私宣传，但不能据此认定其能力或 NanoBot 已支持该网关。

- **隔离网络部署可用性**  
  [Issue #6811](https://github.com/HKUDS/nanobot/issues/6811) 暂无评论，但关联 [PR #6815](https://github.com/HKUDS/nanobot/pull/6815) 与 [PR #6818](https://github.com/HKUDS/nanobot/pull/6818)，形成今日最明显的跨模块处理主题：让 DNS、代理与安全检查适配真实容器部署方式。

## 4. Bug 与稳定性

*以下按潜在业务影响排序，并非项目官方严重性评级。*

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高：特定部署下功能不可用** | [#6811](https://github.com/HKUDS/nanobot/issues/6811)：在 `internal: true` Docker 网络中，用户报告 `web_fetch` 和 HTTP MCP 因本地 DNS 前置检查及共享代理忽略 `NO_PROXY` 而不可用。 | **部分有 fix PR**：Web 对应 [#6815](https://github.com/HKUDS/nanobot/pull/6815)，已关闭；MCP 对应 [#6818](https://github.com/HKUDS/nanobot/pull/6818)，开放。摘要仅能确认代理 DNS 处理方向，不能确认 `NO_PROXY` 已解决。 |
| **中：缓存效率与成本风险** | [#6817](https://github.com/HKUDS/nanobot/issues/6817)：OpenAI-compatible Claude 路径中，无文本的 assistant 工具调用及其结果之后，历史 `cache_control` 断点丢失，系统提示与工具之外的历史缓存受影响。 | **开放，未见对应 fix PR**。建议补充请求体回归测试，覆盖无文本工具调用场景。 |
| **低：数学内容显示体验** | [#6809](https://github.com/HKUDS/nanobot/issues/6809)：WebSocket 默认提示未约定数学格式，模型可能将公式写入代码块，导致客户端按字面显示。 | Issue 与修复 [PR #6810](https://github.com/HKUDS/nanobot/pull/6810) 均已关闭；后续抽象重构见开放的 [#6816](https://github.com/HKUDS/nanobot/pull/6816)。 |

**安全验证重点：**代理代解析修复涉及 SSRF 防护边界，审查时应验证域名、私网目标及重定向处理，避免以提升连通性为代价削弱访问控制。相关 PR：[Web #6815](https://github.com/HKUDS/nanobot/pull/6815)、[MCP #6818](https://github.com/HKUDS/nanobot/pull/6818)。现有数据未提供已确认的安全绕过或崩溃案例。

## 5. 功能请求与路线图信号

- **近期候选：渠道级回复格式声明。**已有开放 [PR #6816](https://github.com/HKUDS/nanobot/pull/6816)，实现路径明确，有望减少类似数学格式提示的核心层特判；能否进入下一版本仍取决于评审与合并。
- **近期候选：代理环境下的完整远程工具访问。**[PR #6818](https://github.com/HKUDS/nanobot/pull/6818) 与已关闭的 [#6815](https://github.com/HKUDS/nanobot/pull/6815) 显示 Web/MCP 网络处理正在向一致行为靠拢。
- **国际化交付信号：希伯来语。**[PR #6814](https://github.com/HKUDS/nanobot/pull/6814) 已具备具体覆盖范围，但需确认合并状态，不能直接列为下一版本已确定功能。
- **尚无实现证据：搜索路由与新增网关。**[WebRouter #6812](https://github.com/HKUDS/nanobot/issues/6812)、[TrustedRouter #6813](https://github.com/HKUDS/nanobot/issues/6813) 均已关闭，当前未提供关联实现 PR，不宜据此推断已纳入路线图。

## 6. 用户反馈摘要

**所给数据没有评论正文**，无法从评论中提炼真实的满意度或维护者回应；以下仅依据 Issue 描述归纳用户诉求：

- **“通过代理能联网，却在请求前被本地 DNS 检查拦住。”**隔离容器用户期待 Web 抓取和 MCP 尊重其代理拓扑，同时正确处理 `NO_PROXY`。[#6811](https://github.com/HKUDS/nanobot/issues/6811)
- **“工具循环不应破坏已有缓存策略。”**Claude 兼容接口用户关注缓存连续性，以及潜在的延迟、计费影响；目前没有量化损失数据。[#6817](https://github.com/HKUDS/nanobot/issues/6817)
- **“客户端支持公式，模型输出也应遵循约定。”**WebUI/TUI 用户需要默认可渲染的数学表达，而非依赖逐次提示。[#6809](https://github.com/HKUDS/nanobot/issues/6809)
- **“拥有多个搜索 API，不应只能依赖其中一个。”**用户希望降低单供应商失败或限流对搜索可用性的影响。[#6812](https://github.com/HKUDS/nanobot/issues/6812)

## 7. 待处理积压

本批条目均为近两日创建，**没有足够证据识别长期未响应积压**。当前更适合关注以下短期待办：

1. **优先分诊缓存回归**：[#6817](https://github.com/HKUDS/nanobot/issues/6817) 暂无评论、未见修复 PR，应确认复现条件、影响范围及回归测试。
2. **闭环代理问题**：核验 [#6811](https://github.com/HKUDS/nanobot/issues/6811) 的 DNS 与 `NO_PROXY` 两部分是否分别解决，并跟进开放的 [#6818](https://github.com/HKUDS/nanobot/pull/6818)。
3. **评审渠道格式抽象**：检查 [#6816](https://github.com/HKUDS/nanobot/pull/6816) 对现有渠道默认行为和模板兼容性的影响。
4. **明确已关闭需求的处置结果**：为 [#6812](https://github.com/HKUDS/nanobot/issues/6812) 与 [#6813](https://github.com/HKUDS/nanobot/issues/6813) 补充拒绝、重复或转实现的说明，降低社区对功能状态的误解。

**结论：**今日最值得肯定的是围绕真实部署问题快速形成修复线索；最需跟进的是代理安全边界、Claude 缓存回归，以及已关闭 PR 的实际合并与发布状态。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-27**  
项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)  
统计范围：所提供的过去 24 小时 GitHub 更新数据。

> **数据说明**：本期共记录 50 条 Issue 更新和 50 条 PR 更新，但仅提供其中 30 条 Issue、20 条 PR 的详情。PR 评论数为 `undefined`，未提供 Issue 评论正文，因此不能据此判断 PR 讨论热度，也不能将 Issue 摘要当作评论反馈。下文明确区分“用户报告”“待合并方案”与“已落地变更”。

## 1. 今日速览

过去 24 小时项目开发与反馈活跃：50 条 Issue 更新中，48 条为新开或活跃、2 条关闭；50 条 PR 更新中，46 条待合并、4 条已合并或关闭。可见工作主要围绕 **多 Profile 网关、会话状态一致性、安全边界、上下文压缩和调用成本**，例如 [多 Profile 模型路由问题 #160510](https://github.com/NousResearch/hermes-agent/issues/160510) 与 [提示缓存保活 PR #160651](https://github.com/NousResearch/hermes-agent/pull/160651)。本期没有新版本发布，且展示的 20 条 PR 均未合并，说明修复供给较充足，但不能把提案数量等同于交付成果。总体判断为 **活跃度高、稳定性压力值得关注**：审批绕过、工作目录文件误删、会话无法继续等反馈，应优先于一般体验优化排查。

## 2. 项目进展

### 已合并／关闭成果：详情不足，暂不计入功能交付

汇总显示有 **4 条 PR 已合并或关闭**，但其编号、内容及具体状态未提供，无法确认哪些功能已经进入主分支。

可见的关闭 Issue 有两项：
- [#160629：Buzz 托管社区认证返回 401](https://github.com/NousResearch/hermes-agent/issues/160629)：已经关闭，但没有关闭原因，不能认定已修复。
- [#160589：测试 Issue](https://github.com/NousResearch/hermes-agent/issues/160589)：无实质产品进展可归纳。

### 主要待合并进展

| 方向 | 关键 PR 与预期价值 | 当前状态 |
|---|---|---|
| 调用成本 | [#160651：长响应期间保持提示缓存](https://github.com/NousResearch/hermes-agent/pull/160651)，旨在减少超过 5 分钟响应后，下一次请求重新写入整段提示的成本 | OPEN |
| 安全脱敏 | [#160642：使 Shell hook 改写结果真正生效](https://github.com/NousResearch/hermes-agent/pull/160642)，避免脱敏脚本执行后模型仍读取原始内容 | OPEN |
| 会话可靠性 | [#160643：规范化后保证 tool-call ID 唯一](https://github.com/NousResearch/hermes-agent/pull/160643)，修复数据库唯一约束冲突导致的会话中止 | OPEN |
| 长会话体验 | [#160641：空闲网关聊天后台压缩](https://github.com/NousResearch/hermes-agent/pull/160641)，减少用户回到聊天后的等待；[#160621](https://github.com/NousResearch/hermes-agent/pull/160621) 在压缩摘要中保留后台进程信息 | 均 OPEN |
| 模型兼容性 | [#160633：修复 GPT-5 命名模型经兼容中转时的系统提示处理](https://github.com/NousResearch/hermes-agent/pull/160633)；[#160649](https://github.com/NousResearch/hermes-agent/pull/160649) 修复 Anthropic OAuth 工具别名解析 | 均 OPEN |
| 更新可靠性 | [#160650：暂停、恢复网关前验证安装归属](https://github.com/NousResearch/hermes-agent/pull/160650)，降低更新流程操作错误 checkout 的风险 | OPEN |

**进展判断**：修复方案覆盖成本、安全和持久化等核心路径，但本期能够确认的是“方案推进”，不是“修复交付”。

## 3. 社区热点

可见 Issue 评论最多仅为 **2 条**，所有展示条目的 👍 均为 0，尚未形成高互动热点；以下排序反映相对关注度，不代表广泛共识。

| 议题 | 可见互动 | 背后诉求 |
|---|---:|---|
| [#160510：Profile 路由忽略目标模型默认值](https://github.com/NousResearch/hermes-agent/issues/160510) | 2 评论 | 多 Profile 部署需要配置隔离；API 公布的模型 ID 应能实际使用 |
| [#160608：持久化 `unknown` 状态导致会话持续被阻断](https://github.com/NousResearch/hermes-agent/issues/160608) | 1 评论 | 网关异常退出后应自动恢复，而非留下永久阻断状态 |
| [#160605：部分 Shell 写法绕过审批](https://github.com/NousResearch/hermes-agent/issues/160605) | 1 评论 | 安全判断应覆盖等价命令结构，不能只对直接写法有效 |
| [#160616：会话列表包含过多内部字段](https://github.com/NousResearch/hermes-agent/issues/160616) | 1 评论 | 多会话场景需要更轻量的列表 API；报告称每 100 条约有 124 KB 记账字段，占响应体约 45% |
| [#160561：桌面新聊天继承上次推理强度](https://github.com/NousResearch/hermes-agent/issues/160561) | 1 评论 | 用户希望新会话遵循配置默认值，而非隐式继承上个会话状态 |

**共同信号**：用户关注的已不只是模型回答质量，而是多实例运行时的配置确定性、恢复能力和运维可预测性。

## 4. Bug 与稳定性

以下按**潜在影响**排序，并非改写仓库的 P2／P3 标签。“未见 fix PR”仅指当前展示数据中未发现明确对应项。

| 关注级别 | 问题及影响 | 修复状态 |
|---|---|---|
| **优先核查：审批安全** | [#160605](https://github.com/NousResearch/hermes-agent/issues/160605)：报告称重定向、管道或脚本调用等命令形态可将 `ask` 变成 `allow`，可能削弱审批边界 | 未见明确 fix PR |
| **优先核查：数据保全** | [#160597](https://github.com/NousResearch/hermes-agent/issues/160597)：`disk-cleanup` 将 `workbenches/` 下的 `test_*`／`tmp_*` 文件视为可清理文件，可能误删项目内容 | 未见明确 fix PR |
| **优先核查：脱敏失效** | [PR #160642](https://github.com/NousResearch/hermes-agent/pull/160642) 披露 Shell hook 改写结果被丢弃，模型仍可能看到原文 | 已有修复 PR，未合并 |
| **高：会话不可用** | [#160608](https://github.com/NousResearch/hermes-agent/issues/160608)：异常退出后遗留 `unknown` admission，重启仍阻断后续请求；[PR #160643](https://github.com/NousResearch/hermes-agent/pull/160643) 则处理另一类持久化失败导致中止的问题 | 前者未见 fix；后者已有待合并 PR |
| **高：配置／身份错配** | [#160556](https://github.com/NousResearch/hermes-agent/issues/160556)：环境变量静默覆盖显式平台 token，可能连接到非预期身份；[#160510](https://github.com/NousResearch/hermes-agent/issues/160510) 报告 Profile 模型默认值错用 | 均未见明确 fix PR |
| **高：更新与安装** | [#160645](https://github.com/NousResearch/hermes-agent/issues/160645)：符号链接 Profile 更新失败后无法恢复；[#160628](https://github.com/NousResearch/hermes-agent/issues/160628)：Intel Mac 更新／安装失败 | 未见明确对应修复；[#160650](https://github.com/NousResearch/hermes-agent/pull/160650) 为相关更新流程加固，不宜认定直接解决 |
| **高：移动端崩溃** | [#160637](https://github.com/NousResearch/hermes-agent/issues/160637)：第八代 iPad 使用 Live Mode 语音功能时崩溃 | 未见明确 fix PR |
| **中：状态一致性** | [#160634](https://github.com/NousResearch/hermes-agent/issues/160634)：已返回最终总结的 max-turns 运行被标为失败；[#160581](https://github.com/NousResearch/hermes-agent/issues/160581)：移动端已完成会话仍显示运行中；[#160636](https://github.com/NousResearch/hermes-agent/issues/160636)：Bot Mode 已回复仍显示等待 | 均未见明确 fix PR |
| **中：桌面行为回归** | [#160561](https://github.com/NousResearch/hermes-agent/issues/160561)：推理强度默认值失效；[#160646](https://github.com/NousResearch/hermes-agent/issues/160646)：Windows 关闭最小化到托盘后仍可能隐藏窗口 | 均未见明确 fix PR |

**数据质量提醒**：[#160647](https://github.com/NousResearch/hermes-agent/issues/160647) 标题报告 `onnxruntime` 依赖冲突，但摘要重复了符号链接 Profile 的内容。应核验原帖后再判断具体根因。

## 5. 功能请求与路线图信号

### 已有 PR 支撑，具备近期交付可能
以下均为待合并方案，**不构成下一版本承诺**。

- **成本可观测性**：[PR #160626](https://github.com/NousResearch/hermes-agent/pull/160626) 拟在桌面状态栏补齐会话费用，与 token、缓存命中信息形成更完整的使用反馈。
- **无人值守插件平台**：[PR #160631](https://github.com/NousResearch/hermes-agent/pull/160631) 允许平台插件声明 `unattended=True`，适配机器人桥接、事件总线等没有人工回应审批的环境。
- **远程 MCP 认证**：[PR #160624](https://github.com/NousResearch/hermes-agent/pull/160624) 增加 OAuth 回调监听地址配置，改善无头服务器与反向代理场景。
- **插件生态扩展**：[GitHub.Locker #160644](https://github.com/NousResearch/hermes-agent/pull/160644)、[Postqued #160639](https://github.com/NousResearch/hermes-agent/pull/160639)、[EverOS #160625](https://github.com/NousResearch/hermes-agent/pull/160625) 分别扩展 MCP 工具、社媒发布和记忆提供方接入。

### 需求明确，但尚无可见交付承诺

- [#160627：Profile 级桌面插件配置 SDK](https://github.com/NousResearch/hermes-agent/issues/160627)：希望插件可以读写压缩、上下文引擎和记忆配置。
- [#160583：按工具降低结果长度上限](https://github.com/NousResearch/hermes-agent/issues/160583)：反映用户希望主动控制上下文体积与成本。
- [#160603：更新 Hermes 时可选同步更新插件](https://github.com/NousResearch/hermes-agent/issues/160603)：降低核心程序与插件分开维护的负担。
- [#160536：Codex 凭据池按凭据设置用量上限](https://github.com/NousResearch/hermes-agent/issues/160536)：指向多账户自动化成本治理。
- [#160582：持久显示项目／会话标题](https://github.com/NousResearch/hermes-agent/issues/160582)：改善多会话并行时的定位能力。

## 6. 用户反馈摘要

由于未提供评论正文，以下仅归纳 **Issue 报告中的使用场景与痛点**：

- **多 Profile 已进入实际运维场景**：符号链接目录、独立平台身份、Codex OAuth 账户与定时投递均涉及 Profile 边界。用户期待隔离不仅体现在配置文件上，也能贯穿启动、认证和任务执行。参见 [#160648](https://github.com/NousResearch/hermes-agent/issues/160648)、[#160622](https://github.com/NousResearch/hermes-agent/issues/160622)、[#160590](https://github.com/NousResearch/hermes-agent/issues/160590)。
- **无人值守用户同时受到误拦截与漏拦截影响**：只读命令放进循环后触发人工审批，会阻断自动化；另一方面，部分包装命令又被报告可绕过审批。参见 [#160575](https://github.com/NousResearch/hermes-agent/issues/160575)、[#160605](https://github.com/NousResearch/hermes-agent/issues/160605)。
- **客户端状态不可信会增加操作负担**：移动端计时不停、Bot Mode 回复状态滞后、Runs API 把交接标为失败，都可能诱发重复提交或错误重试。参见 [#160581](https://github.com/NousResearch/hermes-agent/issues/160581)、[#160636](https://github.com/NousResearch/hermes-agent/issues/160636)、[#160634](https://github.com/NousResearch/hermes-agent/issues/160634)。

本期材料以问题反馈为主，**没有足够证据归纳用户满意度或正向口碑**。

## 7. 待处理积压

当前样本主要是近两天更新，不能认定其中哪些条目“长期无人响应”。以下是可核验的历史积压线索及需要尽早分诊的事项：

| 事项 | 维护建议 |
|---|---|
| [#160536：凭据池自动用量上限](https://github.com/NousResearch/hermes-agent/issues/160536) | 报告称关联 [PR #87233](https://github.com/NousResearch/hermes-agent/pull/87233) 自 8 月以来不活跃且存在冲突；建议核验当前状态、明确负责人，并决定继续推进还是重新拆分 |
| [#160587：Termux 包不可用](https://github.com/NousResearch/hermes-agent/issues/160587) | 用户称文档仍标记功能不可用；建议明确 Android／Termux 支持状态及恢复路径 |
| [#160590：Cron 投递缺少 secret scope](https://github.com/NousResearch/hermes-agent/issues/160590) | 报告含修复意愿及 PR 创建阻碍；建议帮助贡献者完成提交，并确认定时投递影响范围 |
| [#160605：审批绕过](https://github.com/NousResearch/hermes-agent/issues/160605)、[#160597：误删文件](https://github.com/NousResearch/hermes-agent/issues/160597) | 虽非已证实的长期积压，但潜在影响较高，应尽快复现、给出临时缓解措施并关联回归测试 |

### 项目健康度结论

**开发活跃，修复方向聚焦，但交付闭环仍需观察。** 下一观察重点应是：高影响报告是否完成分诊、安全与数据保全修复是否合并、多 Profile 和异常恢复是否补齐测试，以及这些变更何时进入可供用户验证的正式版本。当前不宜仅凭大量待合并 PR 判断稳定性已经改善。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报
**日期：2026-11-27**  
**项目：[sipeed/picoclaw](https://github.com/sipeed/picoclaw)**

> 统计口径：基于提供的过去 24 小时更新数据；两条 PR 的创建与更新时间均标注为 2026-11-26。本文不将该窗口内的更新等同于 11 月 27 日当天创建的事件。

## 1. 今日速览

过去 24 小时，PicoClaw 无 Issue 更新、无新版本发布，仅有 **2 条仍待合并的依赖升级 PR**，均由 Dependabot 自动提交，整体处于低活跃度的例行维护状态。当前变更集中在 AWS 与 Azure 的 Go SDK 依赖，未出现可确认的功能交付或缺陷修复。两条 PR 均未合并，尚不能视为已进入主分支的改进。现有数据不足以判断人工评审效率、用户满意度或长期项目健康趋势。  
来源：[项目仓库](https://github.com/sipeed/picoclaw) · [PR #3474](https://github.com/sipeed/picoclaw/pull/3474) · [PR #3473](https://github.com/sipeed/picoclaw/pull/3473)

## 2. 项目进展

### 已落地进展
本统计窗口内 **无已合并或已关闭 PR**，因此没有可确认已落地的功能、修复或依赖更新。今日可见进展主要是提出依赖维护变更，而非交付新能力。  
来源：[提供数据中的两条待合并 PR](https://github.com/sipeed/picoclaw/pulls)

### 待合并变更

| PR | 更新内容 | 进展与影响判断 |
|---|---|---|
| [#3474：升级 AWS SDK for Go v2](https://github.com/sipeed/picoclaw/pull/3474) | `github.com/aws/aws-sdk-go-v2`：`1.42.0 → 1.48.0` | 处于待合并状态。属于依赖维护，摘要不足以确认具体修复、性能收益或兼容性影响。 |
| [#3473：升级 Azure azcore](https://github.com/sipeed/picoclaw/pull/3473) | `github.com/Azure/azure-sdk-for-go/sdk/azcore`：`1.22.0 → 1.24.0` | 处于待合并状态。涉及 Azure SDK 核心依赖，需结合完整发行说明与测试结果评估影响。 |

**推进程度：** 本窗口尚无已落地交付；若后续通过评审与测试并合并，这两项变更将推进依赖版本跟进，但目前不能据此宣称新增了云服务能力。

## 3. 社区热点

**未观察到可确认的讨论热点。** 两条活跃 PR 均由 `dependabot[bot]` 提交，👍 均为 0；评论字段为 `undefined`，应视为**评论数据缺失**，不能认定为零评论，也无法按讨论热度排序。

- [PR #3474：AWS SDK 升级](https://github.com/sipeed/picoclaw/pull/3474)：反映自动化依赖维护需求，不构成用户主动表达的功能诉求。
- [PR #3473：Azure azcore 升级](https://github.com/sipeed/picoclaw/pull/3473)：同属依赖版本跟进，当前没有足够评论内容用于分析社区共识或争议。

## 4. Bug 与稳定性

本统计窗口内 **无 Issue 更新，也未提供新增 Bug、崩溃或回归报告**，因此没有可按严重程度排列的问题，亦无可确认的对应 fix PR。

两项依赖升级是后续应关注的验证点，而非已确认的缺陷：

- **AWS SDK 升级验证：** 建议检查构建、现有调用路径及相关测试；不能仅凭升级标题认定其修复了漏洞或稳定性问题。[PR #3474](https://github.com/sipeed/picoclaw/pull/3474)
- **Azure azcore 升级验证：** 建议检查项目实际使用的认证、请求处理等路径是否兼容。现有数据未包含 CI 结果，无法判断验证状态。[PR #3473](https://github.com/sipeed/picoclaw/pull/3473)

**稳定性判断：** 本窗口未出现新的负面信号，但“无新增报告”不等同于“无缺陷”。  
来源：[项目 Issues](https://github.com/sipeed/picoclaw/issues)

## 5. 功能请求与路线图信号

本窗口没有新的用户功能请求，也没有功能类 PR，无法识别明确的新功能方向。

当前唯一可见信号是**持续跟进云 SDK 依赖版本**。若两条 PR 通过验证并合并，可能进入后续版本；但没有发布计划或维护者承诺，不能判断是否纳入下一版本，更不能据此推断 AWS、Azure 集成能力将发生扩展。  
来源：[PR #3474](https://github.com/sipeed/picoclaw/pull/3474) · [PR #3473](https://github.com/sipeed/picoclaw/pull/3473)

## 6. 用户反馈摘要

**暂无可提炼的真实用户反馈。** 提供数据中没有 Issue 评论或其他用户讨论内容；自动化依赖 PR 不能代表用户的使用场景、痛点或满意度。当前无法对体验改善、使用障碍或社区情绪作出可靠判断。  
来源：[项目 Issues](https://github.com/sipeed/picoclaw/issues) · [PR #3474](https://github.com/sipeed/picoclaw/pull/3474) · [PR #3473](https://github.com/sipeed/picoclaw/pull/3473)

## 7. 待处理积压

**无法识别长期未响应的重要积压。** 现有数据仅覆盖短期更新，两条 PR 均创建于 2026-11-26，不宜标记为长期积压。

当前可跟进事项：

| 待处理项 | 建议关注点 | 优先级依据 |
|---|---|---|
| [PR #3474：AWS SDK 升级](https://github.com/sipeed/picoclaw/pull/3474) | 审阅完整上游变更，确认 CI 与兼容性后再决定合并 | 常规依赖维护；未提供紧急安全修复证据 |
| [PR #3473：Azure azcore 升级](https://github.com/sipeed/picoclaw/pull/3473) | 核对发行说明及项目实际使用路径的测试覆盖 | 常规依赖维护；未提供阻塞性故障证据 |

**总体结论：** 今日属于“低活跃、依赖维护为主、尚无新增交付”的窗口。自动化依赖更新仍在运作，但缺少评审、CI、历史积压和用户反馈数据，暂不足以对项目整体健康度作出更强判断。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-27**

> **数据口径说明**：本报告依据所提供的过去 24 小时数据生成，部分记录的更新日期为 11 月 26 日。项目标识为 `qwibitai/nanoclaw`，但 PR 数据指向 `nanocoai/nanoclaw`；下文链接按 PR 数据中的仓库路径生成，仓库归属差异需进一步核实。评论数为 `undefined`，不视为零评论。

## 1. 今日速览

过去 24 小时共记录 **4 条 PR 更新、0 条 Issue 更新，无新版本发布**，整体属于低量、以维护为主的活跃状态。3 条待合并 PR 中，2 条是机器人提交的 Agent 加固镜像更新，另 1 条涉及核心路由的并发上下文顺序修复。唯一关闭的 PR 转入私有漏洞报告流程，**不能据此认定漏洞已修复，也没有已合并代码的证据**。今日工作重心偏向运行稳定性与安全维护，尚无明显的新功能扩展信号。相关记录：[核心修复 #4576](https://github.com/nanocoai/nanoclaw/pull/4576)、[私有报告转移 #4575](https://github.com/nanocoai/nanoclaw/pull/4575)。

## 2. 项目进展

### 核心路由修复待合并：保证并发消息的上下文顺序
- **PR**：[#4576 — fix(router): await session write turn before backfill and wake context](https://github.com/nanocoai/nanoclaw/pull/4576)
- **状态**：OPEN；作者：taslim。
- **变更内容**：将跨会话历史回填和唤醒上下文收集串行化到会话写入轮次内。摘要指出，原有 `deliverToAgent` 在执行部分上下文准备操作后才等待 `turn.previous`，可能让并发到达的上下文排到更早消息之前。
- **进展判断**：已提出针对性的代码修复，但尚未合并；其价值主要是改善上下文时序一致性，而非新增用户功能。

### 两条 Agent 加固镜像更新待处理
- [#4577](https://github.com/nanocoai/nanoclaw/pull/4577)：拟将 `v2026.11.0` 对应的加固镜像更新为 `v2026.11.0-20261126T1234`。
- [#4578](https://github.com/nanocoai/nanoclaw/pull/4578)：拟更新为时间戳更晚的 `v2026.11.0-20261126T1756`。
- **进展判断**：两条均由 `nanoclaw-image-refresh[bot]` 提交，目前均未合并。它们指向同一基础版本的不同镜像构建，需核实是否存在替代关系；现有摘要不足以说明具体修复了哪些漏洞或依赖问题。**镜像更新 PR 不等同于正式版本发布。**

### 安全事项转入私有报告流程
- **PR**：[#4575 — Closed: moved to private reporting](https://github.com/nanocoai/nanoclaw/pull/4575)
- **状态**：CLOSED；作者：taslim。
- **处理结果**：按 `SECURITY.md` 转入私有漏洞报告流程。
- **进展判断**：推进的是披露与处理流程，而非已确认的修复交付。本期数据没有显示已合并 PR。

## 3. 社区热点

**无法根据现有数据评选“讨论最热”条目**：全部 PR 的评论数字段均缺失，👍 均为 0，且无 Issue 更新。以下仅按技术影响列出值得关注的事项，不代表社区热度排名。

| 关注事项 | 背后的工程诉求 | 数据边界 |
|---|---|---|
| [核心路由并发修复 #4576](https://github.com/nanocoai/nanoclaw/pull/4576) | 在并发到达、历史回填和唤醒上下文收集时，保持消息顺序一致 | 无评论正文，无法判断用户反馈规模 |
| [镜像更新 #4577](https://github.com/nanocoai/nanoclaw/pull/4577)、[#4578](https://github.com/nanocoai/nanoclaw/pull/4578) | 持续维护 Agent 执行镜像的加固状态 | 属于机器人活动，不能据此推断社区参与度 |
| [私有漏洞报告 #4575](https://github.com/nanocoai/nanoclaw/pull/4575) | 按安全政策处理潜在敏感问题 | 公开信息不足，不宜推断漏洞类型与影响范围 |

## 4. Bug 与稳定性

以下按**可确认的影响与排查优先级**排列，不代表正式漏洞评级。

| 优先级 | 问题与潜在影响 | 修复状态 |
|---|---|---|
| **优先关注：核心上下文顺序问题，严重程度待评估** | 并发消息到达时，跨会话回填或唤醒上下文可能先于更早消息进入上下文，影响 Agent 对对话顺序的理解。未提供崩溃、数据丢失或影响范围证据 | 已有 fix PR，尚未合并：[#4576](https://github.com/nanocoai/nanoclaw/pull/4576) |
| **安全事项：严重程度未知，不参与分级排序** | 一项 hardening PR 已转入私有漏洞报告；具体风险、受影响版本和利用条件均未披露 | 公开 PR 已关闭，不能确认修复状态：[#4575](https://github.com/nanocoai/nanoclaw/pull/4575) |

本期没有新增 Issue，也没有明确的崩溃或回归报告。两条加固镜像 PR 可视为维护信号，但不能据此认定存在已确认的新漏洞：[#4577](https://github.com/nanocoai/nanoclaw/pull/4577)、[#4578](https://github.com/nanocoai/nanoclaw/pull/4578)。

## 5. 功能请求与路线图信号

- **未观察到新增功能需求**：本期无 Issue 更新，所列 PR 均属于修复、安全流程或镜像维护，无法据此建立新功能路线图。当前最明确的候选变更是[路由修复 #4576](https://github.com/nanocoai/nanoclaw/pull/4576)。
- **后续版本可能继续聚焦可靠性与运行环境维护**：若通过审核，核心上下文顺序修复和加固镜像更新可能进入后续交付；但没有合并记录、里程碑或发布计划，**不能确认会纳入下一版本**。相关 PR：[#4576](https://github.com/nanocoai/nanoclaw/pull/4576)、[#4577](https://github.com/nanocoai/nanoclaw/pull/4577)、[#4578](https://github.com/nanocoai/nanoclaw/pull/4578)。

## 6. 用户反馈摘要

**本期无法提炼真实的用户满意度或评论诉求**：没有 Issue 更新及评论正文，PR 评论数也不可用。

从[修复 PR #4576](https://github.com/nanocoai/nanoclaw/pull/4576)只能识别一个待解决的工程场景：并发消息处理过程中，历史回填与唤醒上下文需要严格遵守时序。它体现了上下文可靠性的维护需求，但不能扩展解释为用户普遍投诉、特定生产事故或广泛不满。

## 7. 待处理积压

**没有足够历史数据确认“长期未响应”的积压项。** 当前开放 PR 均为 11 月 26—27 日创建，不宜归类为长期积压；建议关注以下近期审核队列：

| 待处理项 | 建议关注点 |
|---|---|
| [核心路由修复 #4576](https://github.com/nanocoai/nanoclaw/pull/4576) | 优先核查并发时序测试，覆盖跨会话回填、唤醒上下文和连续消息到达场景 |
| [镜像更新 #4577](https://github.com/nanocoai/nanoclaw/pull/4577)、[#4578](https://github.com/nanocoai/nanoclaw/pull/4578) | 核实两次构建的替代关系、校验结果与最终应采用的镜像，避免重复审核 |
| [已转私有报告 #4575](https://github.com/nanocoai/nanoclaw/pull/4575) | 在私有渠道持续追踪修复闭环，避免将公开 PR 关闭误认为风险已消除 |

**健康度结论**：本期可见持续的自动化镜像维护、核心稳定性修复提案及安全报告流程执行信号；但活动量有限，且缺少合并、测试与用户评论数据，尚不足以判断修复交付效率或整体质量趋势。

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
**日期：2026-11-27**  
**项目：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)**

> **统计口径**：本报告依据所提供的过去 24 小时数据，共涉及 1 条 Issue、20 条 PR，无新版本发布。18 条 PR 仅标注为 `CLOSED`，无法据此区分“已合并”与“关闭未合并”；部分条目的更新时间为 11 月 26 日，以下按本次统计窗口归纳，不视为全部发生于 27 日。

## 1. 今日速览

LobsterAI 本统计窗口开发活跃度较高：20 条 PR 中，18 条已关闭、2 条仍开放，工作重点集中在 **DSH 运行时完善、Cowork 会话体验与外部工具接入**。上下文优化、多标签侧聊、网易邮箱 MCP 和模型发现等改动，显示项目正同时补齐能力与改善可用性。稳定性工作覆盖冷启动、桌面连接、Windows 安装以及 IM 消息投递，但目前没有新版本发布，不能将 PR 进展直接等同于正式客户端已可使用。社区侧仅有 1 条账号禁用申诉，反馈样本有限，尚不足以判断普遍满意度或故障发生率。

## 2. 项目进展

以下重要 PR 均为 **CLOSED**；是否合并及进入哪个发行版本，仍需核验。

### 2.1 DSH 运行时：降低启动与上下文开销

- **冷启动优化与诊断**：[PR #3213](https://github.com/netease-youdao/LobsterAI/pull/3213) 通过共享 Zod 依赖等调整，报告 Windows ASAR 测试中，从子进程启动到本地就绪 URL 的耗时中位数由 **4.67 秒降至 1.99 秒，约减少 57%**；同时增加启动里程碑日志。样本为每个构建 4 次运行，不宜外推为全平台收益。
- **初始上下文与空闲能力治理**：[PR #3222](https://github.com/netease-youdao/LobsterAI/pull/3222) 推进 P0–P2 上下文优化，包含静态框架精简与空闲能力清理；[PR #3220](https://github.com/netease-youdao/LobsterAI/pull/3220) 补充上下文用量拆解、实时投影和内存防护。方向上同时改善资源开销与可观测性，但摘要未提供整体 Token 节省数据。
- **迁移与身份一致性**：[PR #3224](https://github.com/netease-youdao/LobsterAI/pull/3224) 清理旧实验性 DSH 配置、残留锁及失效 IPC；[PR #3223](https://github.com/netease-youdao/LobsterAI/pull/3223) 保留宿主身份优先级并避免重复生成会话标题，有助于减少迁移残留和会话行为不一致。

### 2.2 Cowork：从单线聊天向多任务工作台演进

- **多标签侧聊与原生分叉**：[PR #3221](https://github.com/netease-youdao/LobsterAI/pull/3221) 将浮动侧聊迁入右侧面板，支持 `/btw`、`/side`、选中文本引用、新建标签和重开近期侧聊。
- **长会话导航**：[PR #3219](https://github.com/netease-youdao/LobsterAI/pull/3219) 增加可搜索轮次大纲、快速跳转和阅读位置恢复；[PR #3215](https://github.com/netease-youdao/LobsterAI/pull/3215) 增加插件拖拽排序与侧栏溢出菜单。
- **定时任务会话归并**：[PR #3226](https://github.com/netease-youdao/LobsterAI/pull/3226) 让同一 Agent 的同一定时任务复用本地会话，但每次执行仍使用独立模型上下文，并处理既有重复会话迁移。其价值是减少列表碎片，而不是让多次执行共享全部推理上下文。

### 2.3 工具生态与模型配置继续扩展

- **网易邮箱 MCP**：[PR #3209](https://github.com/netease-youdao/LobsterAI/pull/3209) 接入查信、附件读取、草稿维护及邮件状态管理；发送、回复、转发和移入已删除前要求用户确认，并补充 OAuth 刷新及限额处理，强化真实办公场景中的操作控制。
- **模型发现与插件更新**：[PR #3208](https://github.com/netease-youdao/LobsterAI/pull/3208) 增加多类模型 API 的在线发现和模型编辑界面；[PR #3207](https://github.com/netease-youdao/LobsterAI/pull/3207) 增加第三方 npm Registry DSH 插件版本检查与热更新。
- **图像工作流**：[PR #3216](https://github.com/netease-youdao/LobsterAI/pull/3216) 传递专家预设标识，并为 DSH 打包图像处理技能，涉及固定 LobsterAI 水印处理。

**整体判断**：本轮属于跨运行时、交互和生态的成组完善，而非单一功能迭代；但正式交付程度仍取决于合并核验、集成测试和后续发布。

## 3. 社区热点

### 唯一可量化的讨论焦点：账号禁用申诉

[Issue #3225：账号被禁用，申请解封](https://github.com/netease-youdao/LobsterAI/issues/3225) 当前为 **OPEN，1 条评论、0 个赞**。用户称桌面登录时提示账号禁用，并推测此前通过本地反向代理使用内置模型接口可能触发风控；其表示已停止代理、清理凭据，希望恢复官方客户端访问。

背后的诉求包括：

- 明确内置模型接口的允许使用边界；
- 提供可理解的封禁原因与申诉流程；
- 在账号受限时给出清晰的恢复指引。

**注意**：触发原因只是用户推测，不能据此确认平台的风控判定。

PR 评论数均缺失，且点赞均为 0，因此无法可靠评选“讨论最热 PR”。从技术影响面看，[桌面连接修复 #3227](https://github.com/netease-youdao/LobsterAI/pull/3227) 和 [邮箱接入 #3209](https://github.com/netease-youdao/LobsterAI/pull/3209) 值得关注，但这不代表社区热度排名。

## 4. Bug 与稳定性

以下按对可用性的潜在影响排序，**不是官方严重等级**。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| 高 | **账号禁用导致无法进入应用**。现有信息不足以判断是产品缺陷还是策略执行结果。 | [Issue #3225](https://github.com/netease-youdao/LobsterAI/issues/3225) 开放；未见对应 fix PR。 |
| 高 | **桌面瞬时断连、配置热重载失效**。涉及 Electron 环境与 DSH `0.2.2-rc.5`，修复方案含恢复模块绑定路径、将网关心跳间隔设为 10 秒。 | [PR #3227](https://github.com/netease-youdao/LobsterAI/pull/3227) **OPEN**。 |
| 高 | **Windows 覆盖安装中止**。旧进程停止遇到权限拒绝，阻断替换安装；修复按需提权终止进程。 | [PR #3217](https://github.com/netease-youdao/LobsterAI/pull/3217) CLOSED，待核验合并及发布。 |
| 中 | **钉钉卡片已投递但正文为空**。修复补齐正文更新、结束流和完成标记，并处理重试。 | [PR #3211](https://github.com/netease-youdao/LobsterAI/pull/3211) CLOSED；摘要称收件人复测正常、57 项相关测试通过。 |
| 中 | **非交互会话工具策略与 IM 回复异常**。包括 IM、定时任务不应暴露交互式提问工具，以及富文本回复问题。 | [PR #3210](https://github.com/netease-youdao/LobsterAI/pull/3210) CLOSED。 |
| 中 | **会话与界面回归**：模型选择器裁切、自动压缩轮次切分、图像编辑状态及 IM 超时。 | [PR #3214](https://github.com/netease-youdao/LobsterAI/pull/3214) CLOSED。 |
| 中／构建侧 | **macOS 技能缺失锁文件影响打包**。拟生成并缓存锁文件，支持重复及通用架构构建。 | [PR #3218](https://github.com/netease-youdao/LobsterAI/pull/3218) **OPEN**。 |

本批数据未提供独立的崩溃报告或故障率指标，不能据此判断崩溃趋势。

## 5. 功能请求与路线图信号

今日唯一 Issue 是账号申诉，**没有明确新增功能请求**。以下为 PR 反映的开发方向，不代表已承诺的下一版本内容：

- **上下文精细化管理**：优化初始开销、可视化占用并治理空闲能力，可能成为后续版本的重要体验改进。见 [#3222](https://github.com/netease-youdao/LobsterAI/pull/3222)、[#3220](https://github.com/netease-youdao/LobsterAI/pull/3220)。
- **多线程任务工作台**：侧聊分叉、长会话导航和定时任务归并共同指向更复杂的个人助理工作流。见 [#3221](https://github.com/netease-youdao/LobsterAI/pull/3221)、[#3219](https://github.com/netease-youdao/LobsterAI/pull/3219)、[#3226](https://github.com/netease-youdao/LobsterAI/pull/3226)。
- **办公连接器与生态自维护**：邮箱 MCP、模型发现、插件热更新，显示接入能力和配置便利性均在提升。见 [#3209](https://github.com/netease-youdao/LobsterAI/pull/3209)、[#3208](https://github.com/netease-youdao/LobsterAI/pull/3208)、[#3207](https://github.com/netease-youdao/LobsterAI/pull/3207)。
- **认证策略变化需明确告知**：[PR #3212](https://github.com/netease-youdao/LobsterAI/pull/3212) 为全新安装强制登录，同时保留旧安装和隐藏登录的企业部署例外。若交付，建议在发布说明中明确适用范围与迁移行为。

## 6. 用户反馈摘要

所提供数据**没有 Issue 评论正文**，无法从评论中提炼维护者答复或用户后续满意度。以下仅来自 [Issue #3225](https://github.com/netease-youdao/LobsterAI/issues/3225) 的主帖：

- **使用场景**：用户希望在个人常用本地工具中调用内置模型。
- **核心痛点**：账号受限直接阻断桌面应用访问，用户缺乏明确的恢复路径。
- **用户态度**：愿意停止代理、清理凭据并回到官方客户端使用；尚无解封或问题解决证据。
- **产品启示**：可考虑加强使用边界、风险提示与申诉入口说明。该建议来自单个案例，不能外推为普遍需求。

报告未复述主帖中的手机号等个人信息。

## 7. 待处理积压与维护提醒

当前数据只覆盖近期窗口，**无法识别长期未响应的重要 Issue 或 PR**；以下属于待办，而非已证实的长期积压：

1. **优先处理账号申诉**：通过私密渠道核验账号状态，说明适用规则及恢复条件，避免在公开 Issue 索取更多敏感信息。见 [#3225](https://github.com/netease-youdao/LobsterAI/issues/3225)。
2. **评审桌面连接修复**：验证 DSH 版本限定、Electron 热重载与短时主线程阻塞下的连接表现。见 [#3227](https://github.com/netease-youdao/LobsterAI/pull/3227)。
3. **完成 macOS 打包修复验证**：检查锁文件缓存失效、重复构建与通用架构一致性。见 [#3218](https://github.com/netease-youdao/LobsterAI/pull/3218)。
4. **建立发布前回归清单**：重点覆盖登录策略、旧 DSH 配置清理、重复会话迁移和 Windows 覆盖安装。见 [#3212](https://github.com/netease-youdao/LobsterAI/pull/3212)、[#3224](https://github.com/netease-youdao/LobsterAI/pull/3224)、[#3226](https://github.com/netease-youdao/LobsterAI/pull/3226)、[#3217](https://github.com/netease-youdao/LobsterAI/pull/3217)。

**项目健康度结论**：开发活跃、改进面广，且部分修复具备测试或实测证据；当前主要不确定性在于 CLOSED PR 的实际合并情况、跨模块回归覆盖与正式发布落地。社区反馈量较小，应持续观察认证策略和 DSH 迁移后的真实使用反馈。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报｜2026-11-27

## 1. 今日速览

过去 24 小时，Moltis 共记录 **2 条 PR 更新，均处于待合并状态**；没有 Issue 更新，也没有新版本发布。变更集中于消息渠道接入：一项修复 Signal 健康检查兼容性，另一项补齐 Discord 入站文档附件处理能力。两项 PR 均由同一位贡献者提交，本次窗口内活跃度较低，但工作方向明确，聚焦渠道可用性与输入完整性。由于没有合并记录，相关改进尚不能视为已交付；评论数缺失，也不足以判断社区讨论热度。

> **统计口径**：以上采用所提供的过去 24 小时汇总；两项 PR 的创建、更新时间均标为 2026-11-26，因缺少具体时间与时区，不进一步推断其在 11 月 27 日的活动时点。  
> 项目：[moltis-org/moltis](https://github.com/moltis-org/moltis)

## 2. 项目进展

今日没有已合并或已关闭的重要 PR，推进主要体现在两项待审变更：

| PR | 进展内容 | 预期价值 | 当前状态 |
|---|---|---|---|
| [#1330：Discord 入站文档附件接入](https://github.com/moltis-org/moltis/pull/1330) | 针对音频、静态图片之外的附件被丢弃的问题，增加附件下载处理 | 补齐文件进入助手处理链路的缺口，支持更完整的 Discord 文件交互场景 | OPEN，待合并 |
| [#1329：兼容 Signal 空健康检查响应](https://github.com/moltis-org/moltis/pull/1329) | 修正将 `200 OK` 空响应体按 JSON 解码而报错的问题 | 解除 Signal 账号因健康检查失败而无法启动的阻断 | OPEN，待合并 |

**整体判断**：本次窗口有针对性的功能补齐与稳定性修复，但尚无已落地成果。现有摘要未提供完整测试信息，不能确认验证覆盖或合并时间。

## 3. 社区热点

当前仅有两项 PR 可供观察，**无法按讨论热度可靠排序**：二者评论数均为 `undefined`，不能视作零评论；👍 均为 0。

- **Signal 渠道启动可靠性**：[PR #1329](https://github.com/moltis-org/moltis/pull/1329)  
  核心诉求是兼容 `signal-cli` 实际返回的健康检查响应，避免正常服务被误判为异常。对于依赖 Signal 接入个人助手的使用场景，这是基础可用性问题。

- **Discord 文件输入完整性**：[PR #1330](https://github.com/moltis-org/moltis/pull/1330)  
  核心诉求是让助手不再只看到附件说明文字或空消息，而能接收到文件。该变更指向文件驱动交互，但**附件接入不等于所有文件类型均已具备解析、理解能力**。

## 4. Bug 与稳定性

以下按已知影响排序；问题来自 PR 摘要，并非今日新增 Issue 报告。

### 高影响：Signal 健康检查失败，阻断账号启动
- **表现**：`signal-cli` 对 `GET /api/v1/check` 返回 `200 OK` 和空响应体，`SignalClient::check` 尝试按 JSON 解码，产生 `signal-cli check json: error decoding response body`。
- **影响**：据摘要，该错误导致 Signal 账号无法启动，属于渠道可用性阻断。
- **修复状态**：已有 [fix PR #1329](https://github.com/moltis-org/moltis/pull/1329)，尚未合并；受影响版本及环境范围未提供。

### 中等影响：Discord 非音频、非静态图片附件被丢弃
- **表现**：PDF、文本、Office 文件、压缩包、视频等附件未传递给助手，助手只能看到说明文字或空消息。
- **影响**：文件相关任务缺少关键输入，可能导致任务无法执行或回答不完整。
- **修复状态**：已有 [PR #1330](https://github.com/moltis-org/moltis/pull/1330) 提供附件接入改进，尚未合并；具体格式支持边界需查看完整实现与测试。

## 5. 功能请求与路线图信号

- **Discord 文件输入能力是明确的近期候选方向**。已有实现 PR，说明项目正在补齐语音、图片之外的附件入口；但没有合并、里程碑或发布计划信息，不能确认会进入下一版本。建议关注其文件大小限制、下载失败处理及后续消费路径。  
  链接：[PR #1330](https://github.com/moltis-org/moltis/pull/1330)

- **渠道协议兼容性值得优先关注**。Signal 修复体现了对外部工具真实响应行为的适配需求。考虑到其阻断启动的影响，建议优先评审，并覆盖“成功状态码＋空响应体”的回归测试；这是维护建议，并非已公布路线图。  
  链接：[PR #1329](https://github.com/moltis-org/moltis/pull/1329)

## 6. 用户反馈摘要

本次没有提供 Issue 或评论正文，**无法提炼可核实的真实用户评价、满意度或需求频次**。只能从 PR 作者的问题描述识别两类使用痛点：

- **Signal 接入受阻**：健康检查解析失败导致账号无法启动，影响助手通过 Signal 提供服务。  
  来源：[PR #1329](https://github.com/moltis-org/moltis/pull/1329)
- **Discord 附件上下文缺失**：用户发送文件后，助手未获得文件本身，文件任务缺少必要输入。  
  来源：[PR #1330](https://github.com/moltis-org/moltis/pull/1330)

上述内容不能据此推断受影响用户规模或社区满意程度。

## 7. 待处理积压

现有数据没有历史等待时间、评审状态或维护者响应记录，**无法识别长期未响应的重要积压**。两项 PR 均创建于 2026-11-26，不宜标记为长期积压。

| 建议关注顺序 | 待处理事项 | 维护关注点 |
|---|---|---|
| 优先 | [Signal 修复 #1329](https://github.com/moltis-org/moltis/pull/1329) | 核验空响应成功场景，并确保异常状态仍能正确报错 |
| 随后 | [Discord 附件接入 #1330](https://github.com/moltis-org/moltis/pull/1330) | 核验附件下载、传递与失败处理边界，明确接入和解析能力的区别 |

**健康度结论**：项目本次窗口呈现低活跃、聚焦渠道质量的维护状态，两个具体问题均已有待合并方案。下一步最值得观察的是 Signal 阻断修复能否完成验证与合并，以及 Discord 附件能力的支持边界是否清晰；现有样本不足以评价长期响应效率或整体社区健康度。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报｜2026-11-27

> **数据口径**：依据所提供的过去 24 小时更新快照，不代表仓库全部存量。项目名称沿用 CoPaw；条目链接按原始数据指向 `agentscope-ai/QwenPaw`。部分条目更新时间为 11 月 26 日，本文仍按给定统计窗口纳入。

## 1. 今日速览

过去 24 小时共记录 **7 条 Issue、8 条 PR 更新**，全部处于开放状态，**无合并或关闭记录，也无新版本发布**。贡献主要集中于工具调用预算、前端状态展示、消息渲染、渠道适配和 Windows 测试兼容性，整体呈现“稳定性修复优先”的特征。多个问题已有对应修复 PR，说明问题定位与补丁提交较积极，但这些改动尚未形成已合并、已发布的成果。社区讨论量偏低：Issue 最高仅 2 条评论，全部条目点赞数为 0，因此更适合评价为**贡献活动较活跃、讨论热度有限、修复效果待验证**。

## 2. 项目进展

**今日没有已合并或已关闭的重要 PR。** 当前进展主要是修复方案进入待审队列，不能视为用户已获得修复。

| 方向 | 待合并进展 | 预期价值与当前边界 |
|---|---|---|
| Agent 执行循环 | [#8944：工具调用预算去重计数](https://github.com/agentscope-ai/QwenPaw/pull/8944) | 修复历史工具调用被反复累计的问题，避免任务过早触发预算上限。 |
| 飞书消息渲染 | [#8946：保留表格卡片中的围栏代码块](https://github.com/agentscope-ai/QwenPaw/pull/8946) | 避免代码中的管道符、表格示例和标题被错误转换。 |
| Windows 测试 | [#8942：插件安装锁与环境准备测试兼容](https://github.com/agentscope-ai/QwenPaw/pull/8942) | 针对 12 项测试失败调整环境假设，当前标记为 **Under Review**；并非已证实的产品运行故障。 |
| 会话模型管理 | [#8939：将 `/model` 切换限定到当前会话](https://github.com/agentscope-ai/QwenPaw/pull/8939) | 使渠道中的模型切换能覆盖当前会话的固定模型，改善模型不可用时的恢复能力。 |
| Relay / Console | [#8950：恢复 Platform 绑定与 Console 帧](https://github.com/agentscope-ai/QwenPaw/pull/8950) | 标题涉及绑定与帧恢复；摘要明确描述了 Windows/Python 3.11 下帧投递测试等待逻辑的调整，完整影响仍需审查。 |
| 渠道与 CLI 边界兼容 | [#8940：Slack 文件名解码](https://github.com/agentscope-ai/QwenPaw/pull/8940)、[#8936：cron 支持 IPv6 主机](https://github.com/agentscope-ai/QwenPaw/pull/8936) | 分别改善中文/空格文件名显示，以及 IPv6 环境下定时任务命令的可用性。 |
| 安装文档 | [#8937：为升级版本约束添加引号](https://github.com/agentscope-ai/QwenPaw/pull/8937) | 避免 Shell 将 `>` 解析为重定向，或因展开规则导致升级命令失败。 |

**推进幅度判断**：修复覆盖面较广，但可确认的成果仍是“补丁已提交”。8 条 PR 中，**7 条为 XS/S/M，1 条为 L**，以相对聚焦的修复为主，有利于分批审查，但实际落地取决于评审、测试及合并。

## 3. 社区热点

### 最高讨论量：升级后的前端状态不更新
[#8949](https://github.com/agentscope-ai/QwenPaw/issues/8949) 有 **2 条评论**，是本批 Issue 中评论最多的一条。用户称升级到 `2.3.0-post1` 后，前端可能持续转圈，刷新才看到任务结果。

其核心诉求不是单纯“加载动画异常”，而是**长任务执行过程必须可观察、完成状态必须可信**。这类问题容易让用户误判任务是否仍在运行，但现有材料尚不能确认根因。

### 执行预算准确性与消息保真
- [#8943：ToolCallBudgetGate 重复计数](https://github.com/agentscope-ai/QwenPaw/issues/8943)，1 条评论，已有 [修复 PR #8944](https://github.com/agentscope-ai/QwenPaw/pull/8944)。诉求是 Agent 多步执行的预算语义准确，而不是无故提前停止。
- [#8948：单个 `~` 被解析为删除线](https://github.com/agentscope-ai/QwenPaw/issues/8948)，1 条评论。数字区间可能丢失分隔符，并跨段触发删除线，反映出技术类回答对 Markdown 渲染保真度的要求。
- [#8945：飞书代码块被当作表格或标题](https://github.com/agentscope-ai/QwenPaw/issues/8945)，1 条评论，已有 [修复 PR #8946](https://github.com/agentscope-ai/QwenPaw/pull/8946)。用户需要代码、命令与表格在渠道转发后仍保留原意。

**热度边界**：其余 Issue 均为 1 条评论，全部点赞为 0；PR 评论数未提供，不能据此判断哪个 PR 讨论最活跃。

## 4. Bug 与稳定性

以下按**潜在影响优先级**排列，并非维护者正式严重级别。

### 高优先级：影响任务执行或执行判断

1. **工具调用预算重复累计，可能提前终止任务**  
   [Issue #8943](https://github.com/agentscope-ai/QwenPaw/issues/8943) 报告 `ToolCallBudgetGate` 每轮重新计入此前的调用，导致实际可执行调用数显著低于配置预算。报告环境为 `main`、`qwenpaw 2.3.1b2`、AgentScope `2.0.10`。  
   **Fix 状态：已有 [PR #8944](https://github.com/agentscope-ai/QwenPaw/pull/8944)，未合并。**

2. **升级后前端不持续展示最新任务状态**  
   [Issue #8949](https://github.com/agentscope-ai/QwenPaw/issues/8949) 指向 `2.3.0-post1` 升级后的状态展示异常；用户观察到后台似乎仍正常执行，刷新后可看到结果。当前证据不足以认定存在任务失败或数据丢失。  
   **Fix 状态：快照中未见明确对应 PR；不能将 [#8950](https://github.com/agentscope-ai/QwenPaw/pull/8950) 直接视为该问题的修复。**

3. **渠道内切换模型未作用于当前固定模型会话**  
   [PR #8939](https://github.com/agentscope-ai/QwenPaw/pull/8939) 描述：此前 `/model` 修改 Agent 默认模型，但已固定模型的会话仍使用原模型，可能阻碍故障恢复。  
   **Fix 状态：修复 PR 待合并。**

### 中优先级：内容正确性与特定环境可用性

4. **Console 数字区间渲染失真**  
   [Issue #8948](https://github.com/agentscope-ai/QwenPaw/issues/8948) 中，多个 `~` 被配对解析，可能使 `600~1500` 等区间显示异常。摘要说明后端保存的原文完整，问题集中在展示层。  
   **Fix 状态：未见对应 PR。**

5. **飞书卡片破坏代码块结构**  
   [Issue #8945](https://github.com/agentscope-ai/QwenPaw/issues/8945) 涉及代码块内管道符、表格行和标题被错误转换。  
   **Fix 状态：已有 [PR #8946](https://github.com/agentscope-ai/QwenPaw/pull/8946)，未合并。**

6. **IPv6 环境下 cron 命令无法发送请求**  
   [PR #8936](https://github.com/agentscope-ai/QwenPaw/pull/8936) 指出，`::1` 等地址直接拼接到 URL 后会被 HTTPX 拒绝。  
   **Fix 状态：修复 PR 待合并。**

### 较低优先级或开发基础设施问题

- **Slack 文件名显示为百分号编码**：影响含中文或空格的附件名称；已有 [PR #8940](https://github.com/agentscope-ai/QwenPaw/pull/8940)。
- **Windows 插件测试失败 12 项**：涉及符号链接权限、初始化超时预算和虚拟环境启动器 PID 等环境差异；[Issue #8941](https://github.com/agentscope-ai/QwenPaw/issues/8941) 明确未指向产品代码故障，已有 [PR #8942](https://github.com/agentscope-ai/QwenPaw/pull/8942)。
- **升级文档命令缺少引号**：可能导致版本约束丢失或命令失败；已有 [PR #8937](https://github.com/agentscope-ai/QwenPaw/pull/8937)。

## 5. 功能请求与路线图信号

### WebRouter 搜索提供商接入
[Issue #8947](https://github.com/agentscope-ai/QwenPaw/issues/8947) 由 WebRouter 维护者提出，希望在 Tavily、AnySearch、Firecrawl 之外增加第四种 `web_search` 提供商，以统一接口接入多种搜索 API。

**路线图判断**：这是明确的搜索生态扩展诉求，且存在上游维护者参与信号；但当前没有对应 PR 或维护者承诺，不能判断会进入下一版本。

### 聊天输入框向富文本编辑器演进
[Issue #8938](https://github.com/agentscope-ai/QwenPaw/issues/8938) 询问是否将原生 `textarea` 迁移到 Lexical 等富文本编辑器，并重做引用回复体验。

**路线图判断**：反映用户对结构化输入、引用可视化的需求，但目前仍是路线咨询，而非已排期功能。

### 下一版本更可能体现为稳定性改进
从现有待合并补丁看，工具预算、飞书渲染、会话模型切换、Slack 文件名和 IPv6 兼容等已有代码方案的修复，**比上述两项新功能更接近交付**。这只是基于 PR 成熟度的判断，不构成版本承诺；可跟踪 [#8944](https://github.com/agentscope-ai/QwenPaw/pull/8944)、[#8946](https://github.com/agentscope-ai/QwenPaw/pull/8946)、[#8939](https://github.com/agentscope-ai/QwenPaw/pull/8939) 的评审结果。

## 6. 用户反馈摘要

> 数据没有提供评论正文，以下仅从 Issue 描述提炼，不能作为评论情绪或满意度统计。

- **长任务需要可靠的过程反馈**：用户希望无需刷新即可判断任务是否完成，见 [#8949](https://github.com/agentscope-ai/QwenPaw/issues/8949)。
- **技术内容必须保持原样**：数字区间、Shell 管道和代码示例不能因渲染规则改变含义，见 [#8948](https://github.com/agentscope-ai/QwenPaw/issues/8948)、[#8945](https://github.com/agentscope-ai/QwenPaw/issues/8945)。
- **自定义执行预算需要可预测**：配置允许的调用次数应与实际执行一致，见 [#8943](https://github.com/agentscope-ai/QwenPaw/issues/8943)。
- **Windows 贡献者需要可复现的测试环境**：按照文档安装后仍有 12 项测试失败，会增加贡献门槛，见 [#8941](https://github.com/agentscope-ai/QwenPaw/issues/8941)。
- **输入体验有进一步升级需求**：引用回复目前依赖纯文本，用户希望了解富文本方向，见 [#8938](https://github.com/agentscope-ai/QwenPaw/issues/8938)。

本批数据未提供足够的正向体验反馈，不能据此评判整体用户满意度。

## 7. 待处理积压

**无法确认长期积压或长期未响应问题。** 本批条目均创建于 11 月 26—27 日，且缺少维护者回复身份及历史等待时长；不能将其标记为“长期无人处理”。

建议维护者优先关注以下当前待办：

1. **补齐无明确修复方案的用户可见问题**：优先复现 [#8949](https://github.com/agentscope-ai/QwenPaw/issues/8949) 的升级后状态异常，以及 [#8948](https://github.com/agentscope-ai/QwenPaw/issues/8948) 的数字区间渲染问题。
2. **完成核心执行修复的审查验证**：重点检查 [#8944](https://github.com/agentscope-ai/QwenPaw/pull/8944) 的跨迭代计数，以及 [#8939](https://github.com/agentscope-ai/QwenPaw/pull/8939) 的会话模型作用域。
3. **推进跨平台与渠道补丁闭环**：审查 [#8942](https://github.com/agentscope-ai/QwenPaw/pull/8942)、[#8946](https://github.com/agentscope-ai/QwenPaw/pull/8946)、[#8950](https://github.com/agentscope-ai/QwenPaw/pull/8950)，验证修复没有引入其他平台或消息格式回归。
4. **回应路线图咨询**：为 [WebRouter 接入 #8947](https://github.com/agentscope-ai/QwenPaw/issues/8947) 和 [富文本输入 #8938](https://github.com/agentscope-ai/QwenPaw/issues/8938) 明确接受方向、设计要求或暂缓理由。

**总体健康度结论**：项目展现了较好的问题发现与补丁提交能力，两条修复 PR 带有首次贡献者标签，体现出外部贡献参与。但当前快照的短板是**尚无合并闭环，且关键用户可见问题仍待定位**。后续应重点观察修复合并、回归测试及发布后的用户验证，而非仅以开放 PR 数量衡量进展。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-27**  
**项目：[zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)**

> 数据口径：基于提供的过去 24 小时更新记录；38 条 PR 仅展示了其中 20 条。PR 评论数为 `undefined`，不可视为零；`CLOSED` 不等于已合并。以下区分已确认状态、待合并改动与趋势判断。

## 1. 今日速览

过去 24 小时，ZeroClaw 有 **5 条 Issue、38 条 PR 更新**，开发活动较活跃，工作重点集中在记忆系统正确性、CI/发布脚本可靠性和 Web 交互体验。PR 中 **32 条待合并、6 条已合并或关闭**，但已展示数据不足以确认这 6 条中实际合并的数量。当前最值得关注的提案包括记忆快照避免恢复旧事实、Skills 无 Shell 参数执行，以及新增 TrustedRouter 模型提供商，均尚未合并。今日没有新版本发布；整体呈现“修复提案密集、落地效果待确认”的状态，另有一项 macOS 主分支测试不稳定问题需要关注。

## 2. 项目进展

### 已关闭：Web 流式消息滚动体验修复

- **[PR #12741：尊重用户手动滚动位置](https://github.com/zeroclaw-labs/zeroclaw/pull/12741)**  
  拟解决流式输出期间，用户向上阅读历史消息却被持续拉回底部的问题：仅在滚动位置距离底部 150px 内时自动跟随输出。  
  **状态：已关闭，是否合并未提供。** 因此不能据此断言该修复已进入主分支。

其余 5 条“已合并/关闭”PR 未展示详情，无法完整核实今日已交付成果。

### 待合并：记忆系统正确性集中补强

| PR | 拟解决的问题 | 推进价值 |
|---|---|---|
| [#12752](https://github.com/zeroclaw-labs/zeroclaw/pull/12752) | 快照导出包含已被替代的记录，恢复后可能重新作为有效记忆参与召回 | 防止恢复过程“复活”过时事实 |
| [#12750](https://github.com/zeroclaw-labs/zeroclaw/pull/12750) | SQLite 按字符而非字节计算 Core 记忆大小 | 使多字节内容正确受配置预算约束 |
| [#12761](https://github.com/zeroclaw-labs/zeroclaw/pull/12761) | 带会话或时间后缀的 Markdown 日志未正确应用日期过滤 | 提升按时间召回的准确性 |
| [#12757](https://github.com/zeroclaw-labs/zeroclaw/pull/12757) | 迁移归档发生文件名冲突后，部分过期会话无法被清理 | 改善存储生命周期管理 |

这些改动覆盖**召回、预算、归档清理与恢复**，比单纯增加功能更偏向长期运行可靠性；实际收益仍取决于后续评审、测试与合并。

### 待合并：工程链路与可观测性

- **[PR #12755](https://github.com/zeroclaw-labs/zeroclaw/pull/12755)**：将 RFC 3339 时间边界按实际时刻比较，避免小数秒和时区偏移导致日志筛选错误。
- **[PR #12759](https://github.com/zeroclaw-labs/zeroclaw/pull/12759)**：传播 Clippy 日志捕获错误，避免日志写入失败被包装脚本误判为成功。
- **[PR #12758](https://github.com/zeroclaw-labs/zeroclaw/pull/12758)**：修复 swap 初始化失败后遗留文件的问题。
- **[PR #12754](https://github.com/zeroclaw-labs/zeroclaw/pull/12754)**：依据锁定的 Git 提交刷新 Nix 哈希，改善构建可复现性。

**进展判断：**今日可见的增量主要是大量有针对性的修复进入待审队列，而非已确认完成的新功能交付。

## 3. 社区热点

**无法可靠评出“讨论最多”榜单。** 5 条 Issue 均为 0 评论、0 点赞；展示的 PR 评论数缺失、点赞均为 0。以下是按影响范围筛选的关注议题，不代表讨论热度排名。

- **Skills 执行边界与安全性——[PR #12744](https://github.com/zeroclaw-labs/zeroclaw/pull/12744)**  
  提议在 `SKILL.toml` 中声明固定可执行文件与 `argv`，无需 Shell 即可传递字面参数，并统一审计和加载规则。背后诉求是让工具调用更可预测，减少 Shell 解析带来的歧义；该 PR 为 XL 级、跨多个模块，评审复杂度较高。

- **Web 聊天的跨平台一致性——[Issue #12743](https://github.com/zeroclaw-labs/zeroclaw/issues/12743)、[PR #12745](https://github.com/zeroclaw-labs/zeroclaw/pull/12745)**  
  Windows Chrome 下上下文用量条高低不齐，修复提案指向避免字体回退。这反映出仪表盘在真实浏览器环境中的视觉一致性需求。

- **从“记得住”转向“记得准”——[PR #12752](https://github.com/zeroclaw-labs/zeroclaw/pull/12752)、[PR #12761](https://github.com/zeroclaw-labs/zeroclaw/pull/12761)**  
  关注点已延伸到恢复后旧事实是否重现、时间窗口是否准确。这些问题直接影响个人 AI 助手长期记忆的可信度。

## 4. Bug 与稳定性

以下按**潜在影响与处理优先级**排序；除明确标注外，不代表项目官方严重等级。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| 优先关注 | **记忆恢复可能重新激活旧事实**：快照包含被替代记录，恢复后可能再次参与召回 | 有待合并修复 [#12752](https://github.com/zeroclaw-labs/zeroclaw/pull/12752)；来自 PR 描述 |
| 优先关注 | **macOS 主分支测试不稳定**：Tailscale forwarder 测试的 200ms 时间窗口无法被 runner 稳定满足，报告明确表示并非由当前开放 PR 引入 | [Issue #12719](https://github.com/zeroclaw-labs/zeroclaw/issues/12719)；展示数据未见对应 fix PR |
| 中等 | **Core 字节预算低估多字节内容**：配置限制可能未被正确执行 | 有待合并修复 [#12750](https://github.com/zeroclaw-labs/zeroclaw/pull/12750) |
| 中等 | **记忆日期过滤与归档清理边界错误**：可能出现窗口外结果或过期文件未清理 | 有待合并修复 [#12761](https://github.com/zeroclaw-labs/zeroclaw/pull/12761)、[#12757](https://github.com/zeroclaw-labs/zeroclaw/pull/12757) |
| 较低／S3 | **页面重连后，回合结束未恢复输入框焦点**：影响连续键盘输入体验 | [Issue #12746](https://github.com/zeroclaw-labs/zeroclaw/issues/12746)；展示数据未见对应 fix PR |
| 较低／S3 | **Windows Chrome 上下文用量条高度不一致**：属于视觉问题 | [Issue #12743](https://github.com/zeroclaw-labs/zeroclaw/issues/12743)；已有开放修复 [#12745](https://github.com/zeroclaw-labs/zeroclaw/pull/12745) |

提供的数据中没有明确的崩溃报告，也不能仅凭这些条目判断整体缺陷率。macOS 问题属于测试时序不稳定，不能直接等同于生产环境隧道功能故障。

## 5. 功能请求与路线图信号

- **无 Shell 的 Skills 参数执行——[PR #12744](https://github.com/zeroclaw-labs/zeroclaw/pull/12744)**  
  是当前最显著的能力扩展信号，有望改善技能执行的确定性与安全边界。已有实现提案，但改动范围较大，不能确认进入下一版本。

- **新增 TrustedRouter 模型提供商——[PR #12742](https://github.com/zeroclaw-labs/zeroclaw/pull/12742)**  
  拟为 OpenAI 兼容多模型网关增加专用 provider 配置入口，体现模型接入选择继续扩展。当前仍为待合并，尚不能视作已支持。

- **清理无调用的运行时接口——[Issue #12740](https://github.com/zeroclaw-labs/zeroclaw/issues/12740)、[PR #12760](https://github.com/zeroclaw-labs/zeroclaw/pull/12760)、[Issue #12722](https://github.com/zeroclaw-labs/zeroclaw/issues/12722)**  
  涉及 Skills 目录初始化器，以及 thinking 辅助函数和返回类型。方向是减少遗留代码与维护面，而非新增用户功能。由于涉及公开符号删除，如存在仓库外调用方，仍需确认兼容性影响。

**下一版本判断：**小范围修复已有较完整的候选队列，但缺少里程碑、发布计划及评审结果，无法可靠预测哪些必定纳入下一版本。

## 6. 用户反馈摘要

**当前 Issues 没有评论，因此无法从评论中提炼满意度或讨论共识。** 以下仅依据问题正文中的真实使用场景：

- **重连后希望直接继续输入。** [Issue #12746](https://github.com/zeroclaw-labs/zeroclaw/issues/12746) 体现了操作员对连续键盘工作流的需求；该问题从既有 PR 范围中拆出，显示问题边界有被明确管理。
- **Windows 浏览器用户需要一致的状态展示。** [Issue #12743](https://github.com/zeroclaw-labs/zeroclaw/issues/12743) 指向字体回退造成的视觉差异，影响的是界面精致度与可读性。
- **阅读历史内容时不希望被流式消息打断。** [PR #12741](https://github.com/zeroclaw-labs/zeroclaw/pull/12741) 描述了自动滚动对回看历史的干扰，但不能据 PR 描述推断用户满意度已改善。
- **贡献者需要可信、稳定的跨平台 CI。** [Issue #12719](https://github.com/zeroclaw-labs/zeroclaw/issues/12719) 的主分支测试失败可能干扰贡献者判断自身改动是否有问题。

## 7. 待处理积压

**本批数据不足以识别“长期未响应”条目。** 展示记录主要创建于 11 月 26—27 日，不能将新近且无评论的 Issue 直接认定为长期积压。

建议维护者优先跟踪：

1. **主分支测试稳定性：[Issue #12719](https://github.com/zeroclaw-labs/zeroclaw/issues/12719)**  
   确认负责人、复现条件与修复方案，避免时序性失败持续增加评审噪声。

2. **记忆恢复正确性：[PR #12752](https://github.com/zeroclaw-labs/zeroclaw/pull/12752)**  
   优先核验“替代记录—导出—恢复—召回”的回归测试，防止过时记忆重新生效。

3. **跨模块大改动：[PR #12744](https://github.com/zeroclaw-labs/zeroclaw/pull/12744)**  
   建议明确运行时、安全策略与配置兼容性评审责任，降低大型 PR 长期悬而未决的风险。

4. **已有修复的缺陷闭环：[Issue #12743](https://github.com/zeroclaw-labs/zeroclaw/issues/12743) / [PR #12745](https://github.com/zeroclaw-labs/zeroclaw/pull/12745)，[Issue #12740](https://github.com/zeroclaw-labs/zeroclaw/issues/12740) / [PR #12760](https://github.com/zeroclaw-labs/zeroclaw/pull/12760)**  
   跟进评审、平台验证与合并后的 Issue 关闭，确保提案转化为实际交付。

**健康度结论：**ZeroClaw 当前开发输入活跃，修复方向覆盖长期记忆和工程可靠性等关键环节；但公开样本中的用户互动有限、实际合并成果不完整。短期最有价值的健康度信号，是关键修复能否落地，以及 macOS 主分支测试能否恢复稳定。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*