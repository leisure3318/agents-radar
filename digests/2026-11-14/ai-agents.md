# OpenClaw 生态日报 2026-11-14

> Issues: 22 | PRs: 61 | 覆盖项目: 13 个 | 生成时间: 2026-11-14 09:55 UTC

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
**日期：2026-11-14｜统计窗口：过去 24 小时**

> 数据口径：基于提供的 22 条 Issue 与 30 条 PR 明细；PR 更新总量为 61 条。PR 评论数均为 `undefined`，未提供评论正文，因此无法核实 PR 讨论热度，也不能将问题摘要当作用户评论引用。下文严格区分“已关闭”“修复 PR 待合并”与“已发布”。

## 1. 今日速览

过去 24 小时，OpenClaw 有 **22 条 Issue 更新、61 条 PR 更新**，开发活跃度较高；其中 20 条 Issue 仍开放、47 条 PR 待合并，新增工作与审查压力并存。今日主线是 **Templates 添加流程的可靠性、会话与消息完整性，以及大规模测试去重**，而非新版本交付。Templates 集中出现 **12 条问题报告**，其中一条被标为 P0，暴露出“预检通过或已有阻塞项，但仍先创建 Agent、随后失败”的一致性风险。今日无新版本发布；汇总中的 14 条“已合并/关闭”PR 无法进一步拆分，不能据此认定已有 14 项改进落地。

重点入口：[Templates P0 #198761](https://github.com/openclaw/openclaw/issues/198761) · [会话写入冲突 #198790](https://github.com/openclaw/openclaw/issues/198790) · [测试精简 #198737](https://github.com/openclaw/openclaw/issues/198737)

## 2. 项目进展

### 已关闭事项：有进展，但落地范围尚不完整

| 事项 | 今日状态与意义 |
|---|---|
| [隐身会话首轮失败 #198724](https://github.com/openclaw/openclaw/issues/198724) | **P1 回归问题已关闭**。报告指出 Control UI 隐身线程在 `sessions.create` 返回后释放内存会话 actor，导致首条消息失败。关闭是积极信号，但现有数据未提供对应合并 PR 或发布版本，不能确认用户端已获得修复。 |
| [文本截断破坏 emoji/代理对 #198685](https://github.com/openclaw/openclaw/issues/198685) | **Issue 已关闭**。涉及以安全截断替代原始 `.slice(0, N)`；有助于降低无效 UTF-16 输出风险，但不能仅凭关闭状态认定全部调用点均已整改。 |
| [Node launcher 测试跨运行时兼容 #198788](https://github.com/openclaw/openclaw/pull/198788) | **PR 已关闭，未注明合并**。目标是让 Windows selector 恢复测试在 stock Bun 上正确触发注入错误；不能作为已落地改进计入。 |

### 主要推进中的工作

- **会话与 Gateway 性能治理**：大历史回退拟避免一次性持有全部消息正文，降低共享数据库 worker 内存耗尽风险；广播优化拟减少压缩输出的重复复制。两者均待合并，尚无实测收益数据。  
  [PR #198786](https://github.com/openclaw/openclaw/pull/198786) · [PR #198779](https://github.com/openclaw/openclaw/pull/198779)

- **测试维护成本治理**：出现多层堆叠的测试去重 PR。其中 #198756 声明净删除 **58,205 行、涉及 408 个路径，生产代码行数变化为 0**。这是显著的工程维护投入，但收益取决于保留用例是否真正覆盖被删场景，不能简单等同于质量提升。  
  [PR #198756](https://github.com/openclaw/openclaw/pull/198756) · [前置 PR #198739](https://github.com/openclaw/openclaw/pull/198739)

- **前端可维护性改造**：将 transcript 数据准备与展示层分离，目标是便于独立分析和性能剖析，声明保持现有展示行为。  
  [PR #198794](https://github.com/openclaw/openclaw/pull/198794)

**进展判断：**今日可确认的是修复与重构管线活跃；受限于合并明细缺失，尚不能量化最终交付了多少用户可见改善。

## 3. 社区热点

### ① Windows Gateway 锁恢复：评论最多
[Issue #198757](https://github.com/openclaw/openclaw/issues/198757) 有 **4 条评论**，为所列 Issue 最高。Windows 11 用户运行 `pnpm gateway:dev` 时无法确认 Gateway 所有权，报告将问题指向 PID 存活检测与 Windows fallback 缺失。

**背后诉求：**异常退出后应能可靠恢复，而不是让陈旧锁阻断后续启动。目前仍需维护者审查，未见关联修复 PR。

### ② Usage 页面显示未知 provider：可观测性不一致
[Issue #198488](https://github.com/openclaw/openclaw/issues/198488) 有 **3 条评论**。即使 `usage.modelUsage[].provider` 已有信息，缺少会话级模型字段时，页面仍显示 provider 为 `unknown`。

**背后诉求：**用户需要可信的模型与供应商用量归因，而非数据存在、页面却无法展示。该问题已有源码复现及修复路径明确标签。

### ③ Templates：不是单条高热，而是集中暴露的一组缺陷
同一贡献者报告的 12 条问题覆盖目录、预览、校验、添加、升级与失败恢复，显示其进行了较系统的流程检查。最值得关注的是添加失败后的残留 Agent，以及目录中“可见但不可用”的模板。  
[添加一致性 #198761](https://github.com/openclaw/openclaw/issues/198761) · [150 个官方模板不可打开或添加 #198758](https://github.com/openclaw/openclaw/issues/198758)

**热度限制：**所有已列条目的 👍 均为 0；PR 评论数缺失，不能推断这些话题具有广泛社区共识。

## 4. Bug 与稳定性

按所附优先级排序；“未见 fix PR”仅指本次提供的数据中未见。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **P0** | [#198761：阻塞计划仍执行 Add](https://github.com/openclaw/openclaw/issues/198761)。先创建 Agent 与会话、后检查阻塞项，失败后留下空 Agent，Retry 无法完成。 | **未见 fix PR**；已有源码复现、可排队修复标签。虽标 P0/UX release blocker，报告表单中的 Beta blocker 为 No，需维护者统一口径。 |
| **P1** | [#198790：transcript 序号唯一约束冲突](https://github.com/openclaw/openclaw/issues/198790)。同一会话中两次在 delivery mirror 写入后中止 Agent 回合，涉及会话状态与消息丢失风险。 | **未见 fix PR**；仍需补充信息与维护者审查，因果关系尚待验证。 |
| **P1** | [#198724：隐身线程首条消息失败](https://github.com/openclaw/openclaw/issues/198724)。普通会话不受影响。 | **已关闭**；具体修复与发布版本未给出。 |
| **P2** | [#198757：Windows 陈旧锁无法恢复](https://github.com/openclaw/openclaw/issues/198757)，可阻断 Gateway 启动。 | **未见 fix PR**。 |
| **P2** | Templates 校验与执行不一致：重复插件 ID、过长自动化名称等通过预检，创建 Agent 后才失败；失败保留的 Agent 还可能缺少 bootstrap 文件。 | 名称/heartbeat 校验已有待合并 [PR #198800](https://github.com/openclaw/openclaw/pull/198800)，对应 [#198743](https://github.com/openclaw/openclaw/issues/198743)；[#198750](https://github.com/openclaw/openclaw/issues/198750)、[#198744](https://github.com/openclaw/openclaw/issues/198744) 未见 fix PR。 |
| **P2** | [#198758：150 个官方模板使用已退役的 `packages` 字段](https://github.com/openclaw/openclaw/issues/198758)，在当前 `main` 列出却无法打开或添加。 | **未见 fix PR**；需产品决策。 |
| **P2** | [#198748：模板内插件变更后无法添加新版](https://github.com/openclaw/openclaw/issues/198748)，旧安装与新版本产生 `bundled_plugin_conflict`。 | **未见 fix PR**。 |
| **P2** | [#198782：断线后重试 Replace with new，重复调用 scribe](https://github.com/openclaw/openclaw/issues/198782)，同一次替换意图可能触发两次模型运行。 | 已有待合并 [PR #198783](https://github.com/openclaw/openclaw/pull/198783)，标记为待维护者查看。 |
| **P2** | 模板预览与工具兼容：二进制文件被当作 UTF-8 文本、带 publisher 引用预览失败、文件数量限制在不同命令间不一致。 | [#198767](https://github.com/openclaw/openclaw/issues/198767) · [#198770](https://github.com/openclaw/openclaw/issues/198770) · [#198755](https://github.com/openclaw/openclaw/issues/198755)，均未见 fix PR。 |
| **P2** | [#198787：macOS arm64 更新失败](https://github.com/openclaw/openclaw/issues/198787)，报告环境为 OpenClaw 2026.9.7 / Node 26.5.1。 | 需补充信息；尚无法判断普遍性。 |

另有 **P1 级待合并修复**处理 Claude CLI 输入管道断开后会话悬挂，值得与上述会话中止问题并行关注：[PR #198778](https://github.com/openclaw/openclaw/pull/198778)。

## 5. 功能请求与路线图信号

- **复用已有个人身份进行邀请**：避免同一用户被创建为第二份 profile，保持姓名与会话归属一致。已有功能 PR，标记待维护者审查，属于较明确的近期候选；但依赖 OpenClaw ID lab，并涉及安全敏感变更。  
  [PR #198773](https://github.com/openclaw/openclaw/pull/198773)

- **自动化更尊重人工决策边界**：Goals 在必要动作未解决时停止自动重试，等待新的用户指令。已有开放 PR，体现对不必要自主重试的约束。  
  [PR #198784](https://github.com/openclaw/openclaw/pull/198784)

- **iOS 更具亲和力的聊天界面**：用户希望居中显示 Agent 头像、放大聊天文字。目前为 P3，仍需产品决策，未见实现 PR，近期落地确定性较低。  
  [Issue #198792](https://github.com/openclaw/openclaw/issues/198792)

- **按客户端能力处理 widget 工具提示**：无 inline-widgets 能力的界面不应因 canvas 隐含授权持续报 unavailable 警告。问题是此前关闭后的重报，摘要指出已有开放修复 PR，但本次未提供其详情。  
  [Issue #198801](https://github.com/openclaw/openclaw/issues/198801) · [PR #192597](https://github.com/openclaw/openclaw/pull/192597)

**下一版本判断：**已有具体实现的定向修复更接近交付，但没有发布计划或合并确认，不能将任何开放 PR 写作下一版本承诺。

## 6. 用户反馈摘要

以下提炼自问题描述，**不是评论原文或满意度调查**：

- **“预览通过”必须意味着可执行。** 模板用户遇到的是创建后才报错、重试也无法收尾，而不仅是错误提示不够友好。核心需求是校验前置与失败后的可恢复性。  
  [#198761](https://github.com/openclaw/openclaw/issues/198761) · [#198743](https://github.com/openclaw/openclaw/issues/198743)

- **断线恢复应保持一次操作只执行一次。** Knowledge Scribes 的重试场景说明，网络恢复后的幂等性直接影响模型调用次数与任务语义。  
  [#198782](https://github.com/openclaw/openclaw/issues/198782)

- **对话可靠性优先于界面完善。** 首轮失败、回合中止与回复路由问题会直接破坏助手的基本可用性。WebChat 路由修复草案也明确承认尚未完成原 Telegram chat/topic 的完整投递要求。  
  [#198790](https://github.com/openclaw/openclaw/issues/198790) · [PR #198785](https://github.com/openclaw/openclaw/pull/198785)

- **用户既要“能用”，也要“更像个人助手”。** iOS 头像与字号需求体现亲和力诉求，但现有数据不足以判断用户整体满意或不满意的比例。  
  [#198792](https://github.com/openclaw/openclaw/issues/198792)

## 7. 待处理积压与维护者提醒

当前明细大多创建于 11 月 13—14 日，**不足以识别真正长期无人响应的积压**。可确认的关注项是：

1. **避免仍可复现的问题因不活跃反复关闭。** widget 警告在旧 Issue 于 11 月 12 日因不活跃关闭后再次报告，且已有开放修复线索，建议先核对修复进度再处理重报。  
   [#198801](https://github.com/openclaw/openclaw/issues/198801) · [原 Issue #158832](https://github.com/openclaw/openclaw/issues/158832)

2. **优先审查高影响、已有明确复现的问题。** Templates P0 添加一致性，以及会话写入冲突，分别需要快速修复评估和更完整的并发证据。  
   [#198761](https://github.com/openclaw/openclaw/issues/198761) · [#198790](https://github.com/openclaw/openclaw/issues/198790)

3. **为等待作者的修复明确下一步要求。** 会话 prompt cache 修复与 CLI 状态库拒写诊断均处于 waiting on author；应明确剩余验证或修改项，避免形成审查停滞。  
   [PR #198221](https://github.com/openclaw/openclaw/pull/198221) · [PR #198771](https://github.com/openclaw/openclaw/pull/198771)

4. **控制大规模堆叠测试精简的审查风险。** 建议逐层验证保留用例、跨运行时行为与关键回归覆盖；当前尚无数据证明 CI 时间或维护成本已经下降。  
   [PR #198756](https://github.com/openclaw/openclaw/pull/198756) · [后续 PR #198799](https://github.com/openclaw/openclaw/pull/198799)

**总体健康度：开发投入充足、问题定位活跃，但交付确认不足。** 短期最值得投入审查资源的是 Templates 添加一致性和会话/消息完整性；测试精简是积极的维护信号，但不能替代对这些用户可见故障的修复。

---

## 横向生态对比

# 个人 AI 助手与自主智能体开源生态横向分析
**日期：2026-11-14｜基于所提供的过去 24 小时社区快照**

> **统计说明：**Issue、PR 数均指窗口内更新条目，不代表新增量或仓库总积压；`CLOSED` 不等于已合并，开放 PR 不代表已交付。社区规模、长期成熟度与维护效率无法仅凭单日快照确定。NanoClaw、CoPaw 存在项目入口与条目链接仓库不一致的问题，相关归属仍待核实。

## 1. 生态全景

本次覆盖的 **13 个项目中，8 个有更新、5 个无活动记录**，合计 **87 条 Issue 更新、159 条 PR 更新**，唯一可确认的新发布来自 Hermes Agent 的 Canary 版本。整体工作重心明显偏向**会话可靠性、模型与渠道兼容、权限边界和执行过程可解释性**，而不是新增智能体能力的竞赛。OpenClaw 与 Hermes Agent 构成当日主要开发活动中心，合计贡献约 **70% 的 PR 更新**，但这不能直接换算为社区规模或交付领先。多个项目同时暴露“提示成功但实际未生效”“任务完成却没有最终回复”等问题，说明生态的关键挑战正从“能调用工具”转向“能否可靠完成用户意图”。

## 2. 各项目活跃度对比

**健康度为本次快照评估，不是长期评级。**

| 项目 | Issue 更新 | PR 更新 | Release | 当日健康度与主要观察 |
|---|---:|---:|---|---|
| **OpenClaw** | 22 | 61 | 无 | **高活跃、可靠性承压**；47 条 PR 待合并，Templates 一致性与会话完整性优先 |
| **Hermes Agent** | 50 | 50 | **1 个 Canary** | **高活跃、验证压力较大**；45 条 PR 待合并，多 Profile 隔离与会话恢复突出 |
| **LobsterAI** | 0 | 12 | 无 | **维护活跃、交付待核实**；重点治理数据保留、会话分叉与历史容错 |
| **ZeroClaw** | 7 | 11 | 无 | **修复与测试并进**；需优先确认安全依赖修复及 QQ 长任务阻塞 |
| **NanoBot** | 3 | 10 | 无 | **体验巩固活跃**；9 条 PR 涉及 WebUI，QQ 文件发送仍有可靠性缺口 |
| **CoPaw** | 5 | 9 | 无 | **贡献活跃、尚未形成交付闭环**；全部 PR 开放，认证与模型协议修复重要 |
| **NanoClaw** | 0 | 5 | 无 | **定向维护活跃**；聚焦最终回复交付、连接超时及本地模型扩展 |
| **NullClaw** | 0 | 1 | 无 | **低活跃、局部改进**；Telegram 表格渲染方案待合并 |
| PicoClaw | 0 | 0 | 无 | 本窗口无活动，长期健康度无法判断 |
| IronClaw | 0 | 0 | 无 | 同上 |
| TinyClaw | 0 | 0 | 无 | 同上 |
| Moltis | 0 | 0 | 无 | 同上 |
| ZeptoClaw | 0 | 0 | 无 | 同上 |

**解读：**OpenClaw 的 PR 更新量最高，Hermes 的 Issue 更新量最高；两者反映的是开发与问题处理负荷，不能简单理解为质量排名。其余活跃项目主要在较明确的产品边界内进行修复和体验优化。

## 3. OpenClaw 在生态中的定位

### 优势：广覆盖的产品面与较高工程投入

- **当日开发吞吐领先。**61 条 PR 更新高于 Hermes 的 50 条，明显高于其余项目的 1—12 条，显示出较强的并行开发能力。
- **平台化特征较明显。**本次工作横跨 Templates、Agent 创建、会话存储、Gateway、身份邀请、自动化和移动端，覆盖从配置分发到持续运行的多个环节。
- **工程维护投入突出。**测试去重 PR 声明净删除 **58,205 行、涉及 408 个路径，生产代码变化为 0**，说明维护成本治理已经成为重要任务；但尚无证据证明覆盖率或 CI 效率改善。
- **具备下游集成关联。**LobsterAI 的数据保护、配置同步等工作涉及 OpenClaw，说明其至少已进入部分下游产品的集成与维护链路，不能据此推断生态占有率。

### 技术路线差异：更突出“模板到运行”的完整生命周期

与 Hermes 当日更突出的**多 Profile、多客户端与凭据路由**相比，OpenClaw 的焦点是 **Templates 的分发、预检、添加、升级和失败恢复**。相较 NanoBot 的 WebUI 优化、NanoClaw 的回复交付修复，OpenClaw 暴露的问题更具有跨组件一致性特征：创建 Agent、创建会话、校验依赖和执行任务必须保持一致。

其最大短板也在这里：**12 条 Templates 问题由同一贡献者集中报告**，其中包含 P0 标记的添加一致性问题。这说明系统性检查发现了较深的流程缺陷，但不能将其当作 12 个独立用户的普遍反馈。

### 社区规模：只能比较活动，不能比较用户基数

OpenClaw 与 Hermes 是本日活动中心，但缺少 Stars、独立贡献者数、活跃用户和长期合并数据，**无法认定谁的社区更大**。OpenClaw 可见 Issue 最高评论数为 4，Hermes 为 2，绝对讨论量均不高；PR 评论信息又普遍缺失，因此更适合称为“开发活动领先”，而非“社区热度领先”。

## 4. 共同关注的技术方向

| 共同方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **会话生命周期与消息完整性** | OpenClaw、Hermes、LobsterAI、CoPaw | 避免回合写入冲突、恢复旧会话、工具调用关联丢失，以及摘要失败破坏长对话连续性 |
| **最终结果交付与可恢复失败** | NanoClaw、CoPaw、ZeroClaw、NanoBot | 处理空回复、连接持续等待、长任务笼统超时和附件上传失败，让任务有明确结果 |
| **幂等性与重试边界** | OpenClaw、Hermes、LobsterAI、ZeroClaw | 避免重复模型调用、退役会话无限重试、重复技能安装及编辑消息重复触发 |
| **身份、凭据与授权隔离** | Hermes、CoPaw、ZeroClaw、OpenClaw | 保证 Profile 密钥与计费归属正确、代理场景不绕过认证、服务凭据不暴露给模型，并约束身份复用风险 |
| **执行过程可解释性** | NanoBot、LobsterAI、OpenClaw、CoPaw | 区分检查结束与命令结束、修改量与费用、默认模型与实际会话模型、主回复与子任务通知 |
| **模型与渠道适配** | NanoBot、CoPaw、ZeroClaw、NanoClaw、NullClaw | 跟进模型退役与协议差异，改善 QQ、Matrix、Mattermost、Telegram 的交付和展示 |
| **运行成本与性能治理** | OpenClaw、NanoBot、CoPaw、ZeroClaw、LobsterAI | 降低历史加载内存、无效健康检查、进度传输、缓存失配和重复提示词开销 |

**共同底层问题：**控制面显示的状态，必须与实际执行、持久化状态和用户收到的结果一致。

## 5. 差异化定位分析

以下定位依据本日可见工作推断，**不代表完整产品能力或底层架构评测**。

| 项目 | 当日呈现的功能侧重 | 更匹配的用户场景 | 可见技术路线与复杂度 |
|---|---|---|---|
| **OpenClaw** | 模板、自动化、会话与多端助手 | 希望组合、复用并长期运行 Agent 的用户及集成开发者 | Templates—Agent—Gateway—会话链路较长，事务一致性要求高 |
| **Hermes Agent** | 多 Profile、多 Gateway、Desktop/Web 与语音 | 多身份、多设备或多模型账户的进阶用户 | Profile 路由、凭据、记忆插件及客户端协同复杂度突出 |
| **NanoBot** | WebUI、活动展示、远程访问 | 重视可视化操作与日常交互体验的用户 | 当日主要优化展示层与运行状态表达，不能据此判断核心架构更简单 |
| **LobsterAI** | Cowork 会话、技能管理、编辑与差异查看 | 需要检查工具执行结果、持续修改任务的桌面工作流用户 | 涉及持久化历史、分叉、技能分发及 OpenClaw 相关维护 |
| **CoPaw** | 模型接入、渠道操作、Console 文件检查 | 跨模型、跨渠道并处理办公产物的用户 | Provider 协议、SSE、工具进度与控制台体验并行推进 |
| **ZeroClaw** | 工具恢复、渠道接入、安全授权 | 对服务访问控制和可恢复执行要求较高的开发者 | 类型化配置、Rust 依赖治理、SSH broker 与 WASM 架构提案 |
| **NanoClaw** | 回复交付、渠道连接、可选本地模型工具 | 聊天渠道用户及 Apple Silicon 本地模型使用者 | 通过可选 skill/MCP 工具扩展 Rapid-MLX，仍为开放提案 |
| **NullClaw** | Telegram 输出适配 | 需要在 Telegram 阅读结构化内容的用户 | 本日仅见局部渲染改进，无法据此评价完整架构 |

其余五个项目无当日活动材料，不宜据此补充产品定位或架构判断。

## 6. 社区热度与成熟度

### 活跃度分层

1. **高强度并行迭代：OpenClaw、Hermes Agent**  
   工作覆盖面广，开放修复和审查负荷较高；既有功能扩展，也有基础正确性治理。Hermes 发布 Canary 说明存在预发布渠道，但更新说明不完整，不能认定今日修复已包含其中。

2. **中等强度、以质量巩固为主：LobsterAI、ZeroClaw、NanoBot、CoPaw、NanoClaw**  
   多数改动围绕已有路径的可靠性。CoPaw **8/9 条 PR 为修复**，NanoClaw **4/5 条为修复**；NanoBot 则明显偏向 WebUI 打磨。

3. **低活动或静默观察：NullClaw及五个无更新项目**  
   只能判断当日活动较少，不能推断项目停滞、维护不足或产品已经成熟。

### 成熟度判断应与热度分开

质量巩固并不意味着产品已经成熟，高提交量也不意味着不稳定。更有价值的观察指标是：**关键故障是否有复现、回归测试、合并记录、发布版本和用户确认**。本次多数项目仅能确认问题或补丁已出现，交付闭环证据普遍不足；LobsterAI #3092 提供的测试记录较具体，但仍不等于发布后验证。

## 7. 值得关注的趋势信号

### ① “可靠完成”正在成为比“自主执行”更重要的门槛
会话写入冲突、空最终回复、错误恢复和工具结果关联在多个项目同时出现。

**开发参考：**将最终答复交付、任务终态持久化、断线恢复和工具调用关联作为核心验收项，而不只是测试工具能否成功调用。

### ② 多身份助手正在引入账户级安全与计费问题
Hermes 的错误 Profile 密钥使用、CoPaw 的代理认证边界、ZeroClaw 的受限凭据提案，共同说明权限管理已超出简单的 API Key 配置。

**开发参考：**让身份、凭据和计费归属随任务上下文显式传播，避免依赖进程级默认账户，并建立隔离回归测试。

### ③ 重试机制需要理解业务语义
OpenClaw 的重复模型调用、Hermes 的退役会话无限重试，以及多个渠道的超时问题说明，“自动重试”本身可能扩大故障。

**开发参考：**区分可重试错误与终止错误，为用户操作设计幂等标识、重试预算和可见的恢复入口。

### ④ 助手界面正在从聊天窗口转向任务工作台
活动摘要、目标区域、diff、Office 预览与文件动作展示，表明用户不仅需要答案，也需要检查执行过程和产物。

**开发参考：**优先提供低噪声进度、清晰终态和就地产物验收，而非简单暴露更多内部日志。

### ⑤ 模型兼容已成为持续维护成本
退役模型推荐、Responses 思考控制、模型目录和上下文容量发现均出现问题。

**开发参考：**减少硬编码模型名单，采用能力声明、协议兼容测试及明确的失效处理策略。

### ⑥ 本地推理与插件化扩展仍有探索空间，但交付证据有限
NanoClaw 的 Rapid-MLX 提案与 Hermes 的本地模型故障报告，分别呈现了接入需求和运行挑战。

**开发参考：**将本地运行时与助手编排层解耦，以健康检查、标准化接口和可选插件控制核心复杂度，不宜把已有提案等同于成熟能力。

---

**决策结论：**本日生态最强的共同信号不是功能数量增长，而是对**状态一致性、可靠交付和权限边界**的集中治理。评估 OpenClaw 或其他项目时，应优先验证自身关键工作流的故障恢复与发布闭环；PR 更新量适合衡量投入强度，不适合作为生产可用性的替代指标。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报
**日期：2026-11-14** · [项目仓库](https://github.com/HKUDS/nanobot)

## 1. 今日速览

过去 24 小时，NanoBot 数据集记录了 **3 条 Issue 更新、10 条 PR 更新**；其中 2 条 Issue 仍开放、1 条已关闭，PR 为 1 条开放、9 条关闭，未发布新版本。开发活动主要集中在 **WebUI 交互、活动状态展示与稳定性打磨**，10 条 PR 中有 9 条涉及 WebUI。OpenAI 已退役图像模型仍被推荐的问题，已有对应关闭 PR，相关 Issue 也已关闭；QQ 附件上传失败与 WebUI 行内代码渲染问题仍待跟进。整体呈现出**代码侧活跃、维护型迭代密集，但社区讨论证据有限**的状态。

> **数据口径说明：**PR 仅提供 `CLOSED` 状态，不能据此确认已经合并；以下统一称“已关闭”，不将其视为已交付功能。部分条目的更新时间为 11 月 13 日，但被纳入所提供的过去 24 小时数据集，本报按该数据集统计。[查看 PR 列表](https://github.com/HKUDS/nanobot/pulls)

## 2. 项目进展

### 重点功能与修复

| 方向 | 重要 PR 与状态 | 推进价值 |
|---|---|---|
| 活动摘要与执行可见性 | [#6661](https://github.com/HKUDS/nanobot/pull/6661) **已关闭**：运行时默认折叠活动详情，显示最新活动，兼顾桌面与窄屏；[#6664](https://github.com/HKUDS/nanobot/pull/6664) **已关闭**：修正活动标题与耗时区域切换时的布局移动 | 减少活动信息占屏，同时保留智能体正在执行什么的可见性 |
| 会话切换与目标展示 | [#6653](https://github.com/HKUDS/nanobot/pull/6653) **已关闭**：稳定会话切换时的输入框布局，调整消息过渡，并加入 Mac 风格目标展示区域 | 提升多会话操作的连贯性，减少界面跳动与信息竞争 |
| 远程访问性能 | [#6657](https://github.com/HKUDS/nanobot/pull/6657) **已关闭**：将远程健康检查与可见需求关联，避免切换至本地或隐藏标签页后继续周期性读取目录 | 降低无效后台请求与远程连接检查开销 |
| 命令状态表达 | [#6654](https://github.com/HKUDS/nanobot/pull/6654) **已关闭**：尽可能展示源命令，区分检查操作与进程状态 | 降低用户把“检查结束”误解为“命令结束”的风险 |
| 模型兼容性 | [#6663](https://github.com/HKUDS/nanobot/pull/6663) **已关闭**：移除 `gpt-image-1`、`dall-e-3`、`dall-e-2` 的推荐项，关联 [#6660](https://github.com/HKUDS/nanobot/issues/6660) | 针对失效推荐项导致的图像请求失败提供修复方案 |

其他已关闭 PR 包括：修正 Tailwind 缓动工具类歧义 [#6658](https://github.com/HKUDS/nanobot/pull/6658)、弱化欢迎标记悬停描边 [#6656](https://github.com/HKUDS/nanobot/pull/6656)、统一引用消息圆角 [#6655](https://github.com/HKUDS/nanobot/pull/6655)。

**进展判断：**本轮主要是现有产品体验与可靠性的增量提升，而非核心智能体能力的大幅扩展。关闭 PR 覆盖面较广，但实际合入比例及用户可用范围仍需以合并记录、发布记录核实。

## 3. 社区热点

**无法依据现有数据评出“讨论最热”条目：**3 条 Issue 均为 0 评论、0 👍；PR 的评论数为 `undefined`，不能解释为零评论，且所列 PR 均为 0 👍。以下按影响范围与处理关联度选取关注点，而非热度排名。

- **图像模型列表的有效性**：[#6660](https://github.com/HKUDS/nanobot/issues/6660) 与 [#6663](https://github.com/HKUDS/nanobot/pull/6663) 形成明确的问题—修复关联。背后的诉求是：产品推荐选项应与上游服务可用性同步，避免用户选择后才发现不可用。
- **QQ 附件发送可靠性**：[#6652](https://github.com/HKUDS/nanobot/issues/6652) 报告约 2.4 MB PDF 发送时接近一半概率失败，直接影响文件交付场景。
- **WebUI 内容保真与过程透明度**：行内代码显示异常 [#6662](https://github.com/HKUDS/nanobot/issues/6662)、最新活动展示 [#6661](https://github.com/HKUDS/nanobot/pull/6661) 共同反映出用户需要既紧凑、又不丢失关键信息的交互界面。

## 4. Bug 与稳定性

以下为**分析性优先级**，并非项目官方严重性评级。

| 优先级 | 问题及影响 | 状态与 fix PR |
|---|---|---|
| 较高 | **QQ 附件随机发送失败**：报告称约 2.4 MB PDF 可能触发超时及 `media upload failed: empty response`，用户仅收到回退文本。标题将问题指向 botpy 默认 5 秒 HTTP 超时及缺少重试，仍需验证 | [Issue #6652](https://github.com/HKUDS/nanobot/issues/6652) 开放；所给数据中**未见对应 fix PR** |
| 较高 | **退役图像模型仍被推荐**：按报告，选择这些模型会导致请求失败；影响特定模型选择路径 | [Issue #6660](https://github.com/HKUDS/nanobot/issues/6660) 已关闭；对应 [fix PR #6663](https://github.com/HKUDS/nanobot/pull/6663) 已关闭，合并状态未提供 |
| 中等 | **远程健康检查在无需显示时仍持续运行**：保留视图可能每 5 秒读取目录，并检查已建立连接 | [fix PR #6657](https://github.com/HKUDS/nanobot/pull/6657) 已关闭；合并状态未提供 |
| 中等 | **命令执行状态可能被误读**：重复 `exec_session` 检查暴露内部会话 ID，检查结束可能看起来像命令结束 | [fix PR #6654](https://github.com/HKUDS/nanobot/pull/6654) 已关闭；合并状态未提供 |
| 中等 | **行内代码渲染异常**：长行内代码可能变成滚动块，部分内容可能只显示文件名 | [Issue #6662](https://github.com/HKUDS/nanobot/issues/6662) 当日新开；所给数据中**未见对应 fix PR** |
| 较低 | **历史加载指示器过早收起**：较早历史请求可能先返回记账页或不完整回合片段，尚无新增内容可展示 | [fix PR #6659](https://github.com/HKUDS/nanobot/pull/6659) **开放，待处理** |

现有数据未见崩溃、数据丢失或安全事件报告；这仅代表本次样本中未出现，不能据此推断项目不存在相关风险。

## 5. 功能请求与路线图信号

本批 Issue 均为缺陷反馈，**没有明确的新增功能请求**。从 PR 可观察到以下短期方向，但不构成正式路线图或版本承诺：

- **紧凑的智能体活动展示**：折叠状态下显示最新活动，说明界面正尝试兼顾低干扰与执行可解释性；相关方案见 [#6661](https://github.com/HKUDS/nanobot/pull/6661)。
- **多会话与目标信息组织**：会话切换稳定性及独立目标展示区域，体现持续整理复杂任务界面的方向；见 [#6653](https://github.com/HKUDS/nanobot/pull/6653)。
- **历史浏览体验继续完善**：[#6659](https://github.com/HKUDS/nanobot/pull/6659) 是本批唯一开放 PR，属于明确的近期候选改进，但是否进入下一版本仍取决于审核和合并结果。

## 6. 用户反馈摘要

**没有可供提炼的 Issue 评论内容**；以下仅来自 Issue 正文，不能视为社区共识或满意度调查。

- **文件发送需要端到端可靠**：QQ 用户希望正常发送中等体积 PDF，而不是偶发失败后只收到回退文字；核心痛点是交付不确定性，而非单纯上传速度。[#6652](https://github.com/HKUDS/nanobot/issues/6652)
- **技术内容应保持原貌**：行内代码变成滚动块或只显示文件名，会破坏阅读连续性，并可能丢失表达上下文。[#6662](https://github.com/HKUDS/nanobot/issues/6662)
- **默认推荐应值得信任**：用户不希望在选择产品提供的模型后，才发现上游已停止服务。[#6660](https://github.com/HKUDS/nanobot/issues/6660)

当前数据没有明确的正向满意度反馈，不宜将 Issue 关闭直接等同于用户确认解决。

## 7. 待处理积压

**本批数据中没有证据表明存在“长期未响应”条目**：所列开放事项均创建于 11 月 13—14 日。建议优先跟进以下短期待办：

1. **验证 QQ 附件上传失败的根因并建立修复关联**：补充不同文件大小、网络延迟下的复现，核实超时与重试行为；当前无可见 fix PR。[Issue #6652](https://github.com/HKUDS/nanobot/issues/6652)
2. **复现 WebUI 行内代码的两个异常路径**：分别验证长行内代码与文件名识别行为，防止只修复其中一种表现。[Issue #6662](https://github.com/HKUDS/nanobot/issues/6662)
3. **推进历史加载修复审核**：重点验证“首批响应没有可展示内容”以及连续拉取片段的场景。[PR #6659](https://github.com/HKUDS/nanobot/pull/6659)
4. **核实关闭 PR 的交付状态**：尤其确认模型兼容性、远程检查和命令状态修复是否已合入，避免把关闭量当成交付量。[#6663](https://github.com/HKUDS/nanobot/pull/6663) · [#6657](https://github.com/HKUDS/nanobot/pull/6657) · [#6654](https://github.com/HKUDS/nanobot/pull/6654)

**健康度结论：**NanoBot 当前展现出较强的 WebUI 维护活跃度，且对模型推荐失效问题已有明确处理关联；主要待观察点是 QQ 通道可靠性、开放缺陷的后续响应，以及关闭 PR 到实际交付之间的可验证性。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报
**日期：2026-11-14**  
**项目：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)**

> **数据口径**：过去 24 小时有 50 条 Issue、50 条 PR 更新；本报可见其中 30 条 Issue、20 条 PR 的标题及摘要。PR 的 `CLOSED` 状态不等于已合并，评论数 `undefined` 不等于 0；未提供评论正文，因此用户反馈主要依据问题描述，不推断社区共识。

## 1. 今日速览

Hermes Agent 今日保持**较高开发活跃度**：50 条 Issue 更新中 49 条仍开放或活跃，50 条 PR 更新中 45 条待合并，同时发布了一个 Canary 版本。可见工作主要围绕 **多 Profile 隔离、Gateway 会话恢复、Desktop/Web 稳定性以及语音与消息平台体验**展开。稳定性压力集中在会话状态一致性、凭据与计费归属、运行时启动和跨平台兼容性，而非单一功能缺陷。当前数据呈现“提交活跃、待验证工作较多”的状态，但不足以据此判断长期积压趋势或维护响应速度。  
相关入口：[版本发布](https://github.com/NousResearch/hermes-agent/releases) · [Profile 生命周期追踪 #155595](https://github.com/NousResearch/hermes-agent/issues/155595)

## 2. 版本发布

### Canary：`v0.23.1+canary.20261114T064334Z`

- **发布日期**：2026-11-14。
- **发布内容可确认范围**：提供 Hermes Desktop 下载表，截取部分列出了 macOS Apple Silicon 的 DMG。
- **更新内容**：提供的发布说明在下载区即被截断，**没有可核实的功能、修复清单**，不能将今日 PR 自动视为已包含在该版本中。
- **破坏性变更与迁移**：当前材料未提供相关说明，不能确认“无破坏性变更”或“无需迁移”。生产环境建议先核对完整 Release、保留配置与状态数据备份，并重点回归多 Profile、Gateway 恢复和语音流程。

[查看该版本](https://github.com/NousResearch/hermes-agent/releases/tag/v0.23.1%2Bcanary.20261114T064334Z)

## 3. 项目进展

整体统计中有 **5 条 PR 已合并或关闭**，但展示列表仅包含 3 条 `CLOSED` PR，且没有合并标记。以下按“关闭记录”报告，不视为已交付成果。

| PR | 推进方向与价值 | 状态边界 |
|---|---|---|
| [#155608：流式 TTS 与预热使用路由目标 Profile](https://github.com/NousResearch/hermes-agent/pull/155608) | 针对多 Profile 共用 TUI Gateway 时的语音上下文隔离，意在避免调用落入错误 Profile | 已关闭，是否合并未知 |
| [#155614：补充 memory write approval 文档例外](https://github.com/NousResearch/hermes-agent/pull/155614) | 澄清后台审查配置额外写入工具、直接文件写入等情况下的审批边界，降低用户对权限保障的误解 | 已关闭，是否合并未知 |
| [#155613：JS 自动格式修复](https://github.com/NousResearch/hermes-agent/pull/155613) | 自动化格式与 lint 维护 | 已关闭；该工作流既可能合并，也可能因 CI 或主分支变化关闭，不能据此认定落地 |

另有一项问题状态收敛：WhatsApp 私聊已读回执被静默丢弃的 [Issue #155576](https://github.com/NousResearch/hermes-agent/issues/155576) 已关闭，但摘要没有给出修复 PR 或验证结果。

**进展判断**：今日可见推进偏向隔离、可靠性与工程维护；缺少合并记录，无法量化已经交付的功能增量。

## 4. 社区热点

可见 Issue 的最高评论数仅为 **2 条**，且点赞均为 0，因此更适合称为“相对关注点”，而非高热度争议。PR 评论数缺失，无法参与讨论热度排名。

| 议题 | 可见热度 | 背后诉求 |
|---|---:|---|
| [#155595：Profile 创建与生命周期追踪](https://github.com/NousResearch/hermes-agent/issues/155595) | 2 评论 | 将配置创建、凭据、模型继承、克隆安全、Gateway 所有权及 Honcho 清理纳入统一交接，反映多 Profile 已成为核心复杂度来源 |
| [#155461：借用数据根目录启动丢失 site-packages](https://github.com/NousResearch/hermes-agent/issues/155461) | 2 评论 | 用户需要在自定义 `HERMES_HOME`、git 安装及受管 Python 环境下稳定启动 |
| [#155494：中途引导消息时间戳晚于助手回复](https://github.com/NousResearch/hermes-agent/issues/155494) | 1 评论 | 对话记录应忠实呈现实际交互顺序，尤其影响 Desktop/Web 回看与审计 |
| [#155451：Webapp 登录失败原因混淆](https://github.com/NousResearch/hermes-agent/issues/155451) | 1 评论 | 用户需要区分票据过期与兑换被拒，避免重复生成登录链接却无法解决问题 |
| [#155576：WhatsApp 私聊已读回执失效](https://github.com/NousResearch/hermes-agent/issues/155576) | 1 评论，已关闭 | API 返回成功必须与用户侧实际效果一致，避免“成功但未送达”的静默失败 |

## 5. Bug 与稳定性

以下按**潜在用户影响**排序，并非替代项目官方优先级。除特别说明外，“未见修复 PR”仅指本次材料中没有提供关联记录。

### 优先核查：隔离、核心可用性与会话阻断

| 问题 | 影响 | 修复状态 |
|---|---|---|
| [PR #155611：FAL 图像/视频任务使用错误 Profile 的密钥](https://github.com/NousResearch/hermes-agent/pull/155611) | 多 Profile Gateway 中，路由目标的任务可能由启动 Profile 的账户付费；涉及凭据与计费归属 | **修复 PR 开放中** |
| [#155563：`/new` 后 Bot Chat 交付持续遭拒](https://github.com/NousResearch/hermes-agent/issues/155563) | 会话轮换后出现 `admission_conflict`，报告称对应 Bot Chat 后续交付被持续阻断 | 未见修复 PR |
| [#155582：已退役会话被无限重试](https://github.com/NousResearch/hermes-agent/issues/155582) | 约每 5 秒重试一次，报告时日志已超过 3,560 行，带来日志噪声与无效恢复开销 | 未见修复 PR |
| [#155461：借用根目录启动丢失依赖](https://github.com/NousResearch/hermes-agent/issues/155461) | 重启进入带 `-I` 的工具 Python 后丢失 site-packages，影响相关安装方式的启动 | 未见修复 PR |
| [#155599：Desktop 本地 llama.cpp 输出不可用](https://github.com/NousResearch/hermes-agent/issues/155599) | 用户报告多个模型输出异常字符；通过自定义端点连接本地服务则正常 | 未见修复 PR |

### 较高优先级：恢复、认证与跨平台兼容

| 问题 | 影响 | 修复状态 |
|---|---|---|
| [#155581：重启后进入旧会话、重复气泡](https://github.com/NousResearch/hermes-agent/issues/155581) | Windows Desktop 可能展示已完成分支而非当前会话，影响用户对对话状态的判断 | 未见修复 PR |
| [#155580：MCP OAuth 回调监听器泄漏](https://github.com/NousResearch/hermes-agent/issues/155580) | 粘贴提示写入失败后端口仍被占用，后续登录可能必须重启进程 | 已关联 [修复 PR #155579](https://github.com/NousResearch/hermes-agent/pull/155579)，状态未提供 |
| [#155594：Safari/WebKit 工作区空白](https://github.com/NousResearch/hermes-agent/issues/155594) | 未保护调用 `requestIdleCallback`，iPad Safari 可登录但主面板渲染失败 | 未见修复 PR |
| [#155539：关机进入重启排空路径](https://github.com/NousResearch/hermes-agent/issues/155539) | Gateway 停止可能超过 systemd 用户管理器的 120 秒超时 | 未见修复 PR |
| [#155550：Anthropic 模型冷却期不复查](https://github.com/NousResearch/hermes-agent/issues/155550) | 上游提前恢复额度后，本地仍可能阻止该模型使用凭据 | 未见修复 PR |
| [#155572：Termux 包缺少 Web 静态产物](https://github.com/NousResearch/hermes-agent/issues/155572)、[#155571：缺少 aiohttp](https://github.com/NousResearch/hermes-agent/issues/155571) | 分别影响 Dashboard 可达性和已配置 API Server 平台启动 | 未见修复 PR |

### 数据正确性、性能及测试覆盖

- **会话与变更展示**：[时间戳顺序错误 #155494](https://github.com/NousResearch/hermes-agent/issues/155494)、[Review“Last turn”列入全部未跟踪文件 #155605](https://github.com/NousResearch/hermes-agent/issues/155605)，可能误导用户理解消息顺序或 Agent 修改范围；均未见关联修复 PR。
- **启动性能**：[每任务 `HERMES_HOME` 导致反复准备运行时 #155607](https://github.com/NousResearch/hermes-agent/issues/155607)，影响任务隔离部署的启动成本；未见关联修复 PR。
- **Windows 测试盲区**：[tools 测试 #155593](https://github.com/NousResearch/hermes-agent/issues/155593)、[state 测试 #155592](https://github.com/NousResearch/hermes-agent/issues/155592)、[cron 测试 #155591](https://github.com/NousResearch/hermes-agent/issues/155591) 暴露 POSIX 假设及 CI 标记覆盖不足。其中 tools 问题关联 [PR #155590](https://github.com/NousResearch/hermes-agent/pull/155590)，状态未提供；这些报告**不能直接等同于生产功能故障**。

## 6. 功能请求与路线图信号

### 已有开放 PR，近期进入版本的信号较强

| 方向 | 变化及用户价值 | 判断 |
|---|---|---|
| [#155623：仅语音输入触发自动 TTS](https://github.com/NousResearch/hermes-agent/pull/155623) | 新增可选 `voice.auto_tts_mode: voice_only`，默认保留现有全部朗读行为 | 范围明确、兼容性设计清晰，具备近期候选特征 |
| [#155617：Telegram 交互式输入网站验证码](https://github.com/NousResearch/hermes-agent/pull/155617) | 通过卡片回复验证码，随后删除回复并继续登录流程 | 扩展聊天端 Agent 完成人机协作任务的能力；仍需审核 |
| [#155609：browser-viewer 支持 macOS](https://github.com/NousResearch/hermes-agent/pull/155609) | 插件升级至 0.2.0，并扩展平台支持 | 属于明确的插件目录更新候选 |
| [#155612：qdrant-memory Runtime 升至 0.6.3](https://github.com/NousResearch/hermes-agent/pull/155612) | 更新运行时及恢复相关行为；可选 Shared Owner 仍默认关闭 | 体现记忆插件可靠性建设，不代表已随 Canary 发布 |

### 需求阶段，尚不足以判断版本安排

- **更可控的输入与审阅体验**：允许 URL 保持纯文本、不自动展开上下文，以及双击 Review 文件在主视图打开 diff。共同诉求是降低自动化行为对用户意图的干扰。[#155610](https://github.com/NousResearch/hermes-agent/issues/155610) · [#155606](https://github.com/NousResearch/hermes-agent/issues/155606)
- **多客户端身份与插件协作**：每轮请求携带应用/设备身份、公开 Gateway owner 客户端接口，表明单会话跨设备与跨会话工具正在成为重要使用场景。[#155538](https://github.com/NousResearch/hermes-agent/issues/155538) · [#155596](https://github.com/NousResearch/hermes-agent/issues/155596)
- **经用户批准的人格演进**：`/soul reflect` RFC 提议从 MEMORY.md 生成 SOUL.md 修改建议，每次变更由用户批准；目前是设计提案，不是已实现能力。[#155573](https://github.com/NousResearch/hermes-agent/issues/155573)
- **受限环境接入**：可选 Unix Socket WebSocket 传输，旨在改善沙箱客户端连接 Gateway 的方式。[#155529](https://github.com/NousResearch/hermes-agent/issues/155529)

**版本判断**：已有 PR 的小范围体验改进比 RFC 更接近交付，但材料未给出维护者排期、里程碑或合并结果，不能承诺进入下一版本。

## 7. 用户反馈摘要

*以下来自 Issue 正文摘要，而非未提供的评论内容。*

- **“会话到底有没有恢复正确”是突出痛点。** 重启后显示旧会话、重复消息，以及 `/new` 后交付持续失败，会削弱用户对长期任务连续性的信任。[#155581](https://github.com/NousResearch/hermes-agent/issues/155581) · [#155563](https://github.com/NousResearch/hermes-agent/issues/155563)
- **高级使用场景已覆盖多设备、多 Gateway 和按任务隔离。** 有用户同时连接远程常驻 Gateway 与本机 Gateway，希望按 Bot 职责而非连接来源组织列表；也有人为每个任务设置独立数据根目录。[#155578](https://github.com/NousResearch/hermes-agent/issues/155578) · [#155607](https://github.com/NousResearch/hermes-agent/issues/155607)
- **用户希望减少“失败但没有解释”。** 登录错误原因混淆、配对码发送失败无提示、已读回执返回成功但实际无效，均指向可观测性和错误语义不足。[#155451](https://github.com/NousResearch/hermes-agent/issues/155451) · [#155562](https://github.com/NousResearch/hermes-agent/issues/155562) · [#155576](https://github.com/NousResearch/hermes-agent/issues/155576)
- **正向证据有限，但存在局部可用路径。** 本地模型报告指出，自定义端点连接本地 Llama/Ollama 服务可正常工作，为故障定位提供了对照；这不能外推为整体满意度。[#155599](https://github.com/NousResearch/hermes-agent/issues/155599)

## 8. 待处理积压

**无法确认长期未响应项**：展示记录均创建于当天，缺少历史活动与维护者回应信息。45 条待合并 PR 也只是本次更新样本，不是仓库全部积压量。建议优先跟踪以下“当日未闭环”事项：

| 待跟踪事项 | 维护建议 |
|---|---|
| [FAL Profile 密钥隔离 #155611](https://github.com/NousResearch/hermes-agent/pull/155611) | 优先验证凭据、账户与实际计费归属，补充多 Profile 回归用例 |
| [Bot Chat 轮换阻断 #155563](https://github.com/NousResearch/hermes-agent/issues/155563) 与 [退役会话无限重试 #155582](https://github.com/NousResearch/hermes-agent/issues/155582) | 联合审查会话生命周期及错误码的“可重试/终止”语义 |
| [Windows 测试覆盖 #155592](https://github.com/NousResearch/hermes-agent/issues/155592)、[#155591](https://github.com/NousResearch/hermes-agent/issues/155591) | 不仅修复单测，也检查 CI 是否继续遗漏未标记测试 |
| [Profile 生命周期追踪 #155595](https://github.com/NousResearch/hermes-agent/issues/155595) | 明确剩余任务、验收标准与已交付证据，避免追踪项过大而难以关闭 |

### 健康度结论

**开发活跃度高，交付可确认性有限，稳定性关注应优先于功能数量。** 下一阶段最值得观察的指标，是多 Profile 隔离、会话生命周期和跨平台测试能否形成可验证的修复闭环，而不仅是 PR 提交量继续增长。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报
**日期：2026-11-14**

> **数据口径**：本报告基于所提供的 GitHub 快照。项目标识为 `qwibitai/nanoclaw`，但 PR 链接指向 `nanocoai/nanoclaw`，以下沿用数据中的 PR 仓库路径，归属关系需进一步核实。此外，#4351 的更新时间为 11 月 13 日，虽被列入过去 24 小时数据，仍应注意统计窗口差异。

## 1. 今日速览

过去 24 小时共记录 **5 条 PR 更新，其中 4 条开放、1 条关闭**；没有 Issue 更新，也没有新版本发布。开发工作以稳定性修复为主：5 条 PR 中有 4 条属于 Bug 修复，覆盖回复交付、内部标签解析、Mattermost 连接和安装命名。功能方面，新增 Apple Silicon 本地 Rapid-MLX 模型工具提案，体现出对本地推理场景的扩展意图。整体呈现**开发端持续活跃、讨论热度无法确认**的状态；开放修复尚未合并，关闭项也缺少合并标记，因此不能将这些改动视为已交付成果。相关条目：[PR 列表](https://github.com/nanocoai/nanoclaw/pulls)。

## 2. 项目进展

### 安装标识一致性修复：#4350 已关闭，是否合并待确认
[查看 PR #4350](https://github.com/nanocoai/nanoclaw/pull/4350)

该 PR 旨在让 Shell 脚本及安装服务与 TypeScript 辅助逻辑一致，遵循 `NANOCLAW_INSTALL_ID`，并将其用于服务和镜像命名。

- **推进价值**：减少安装流程不同实现之间的命名不一致，尤其有利于自定义安装标识的部署场景。
- **当前状态**：11 月 14 日更新为 `CLOSED`，但数据未提供合并标记。
- **交付判断**：可以确认该项处理已结束，**不能确认修复已进入主分支或发布版本**。

今日其余 4 条 PR 均处于开放状态，整体进展主要体现为修复方案和功能提案进入评审队列，而非已验证的版本交付。

## 3. 社区热点

**无法按讨论量可靠排名**：所有 PR 的评论字段均为 `undefined`，不能解释为零评论；提供的 👍 数均为 0。以下按影响范围列出值得关注的议题，而非“最热讨论”。

| 议题 | 相关 PR | 反映的需求 |
|---|---|---|
| 智能体任务结束却没有最终答复 | [#4354](https://github.com/nanocoai/nanoclaw/pull/4354) | 用户需要明确的执行结果，不能停留在“正在检查”的中间状态 |
| 技术文本中的标签被错误解析 | [#4353](https://github.com/nanocoai/nanoclaw/pull/4353) | 回复过滤应区分内部标记与用户可见的代码文本 |
| Apple Silicon 本地模型接入 | [#4352](https://github.com/nanocoai/nanoclaw/pull/4352) | 为本地推理提供可选的工具集成路径 |

其中，两条 agent-runner 修复共同指向一个重要质量目标：**既避免暴露内部内容，也避免误吞正常回复**。

## 4. Bug 与稳定性

以下按潜在用户影响排序，**不代表项目官方严重性评级**。本次没有独立 Issue 报告，问题信息均来自 PR 摘要。

| 优先级 | 问题与影响 | Fix PR 与状态 |
|---|---|---|
| 高 | **聊天轮次结束后没有最终答复**：智能体先发送“Checking… one moment”，继续处理后以仅含内部内容或空内容结束，可能让用户持续等待。修复拟补充催促机制。 | [#4354](https://github.com/nanocoai/nanoclaw/pull/4354)，开放 |
| 高 | **Mattermost WebSocket 升级无限等待**：服务器接受连接但不回应升级请求，现有连接超时尚未生效，可能使适配器一直挂起。 | [#4351](https://github.com/nanocoai/nanoclaw/pull/4351)，开放 |
| 中 | **行内代码中的 `<internal>` 被误识别为内部片段**：正常技术说明可能被扣留，导致完成的回复丢失。 | [#4353](https://github.com/nanocoai/nanoclaw/pull/4353)，开放 |
| 中 | **安装命名未统一遵循 `NANOCLAW_INSTALL_ID`**：Shell 和服务命名行为与 TypeScript 实现不一致。 | [#4350](https://github.com/nanocoai/nanoclaw/pull/4350)，已关闭，合并情况未知 |

**稳定性判断**：修复集中于“输出能否可靠送达”和“连接能否及时失败”，与个人助手的日常可用性直接相关。当前没有崩溃日志、受影响版本或复现频率，无法判断这些问题的实际覆盖面，也不能确认是否属于回归。

## 5. 功能请求与路线图信号

### Rapid-MLX 本地模型工具
[查看 PR #4352](https://github.com/nanocoai/nanoclaw/pull/4352)

该提案提供一个**可选安装的 skill**，面向 Apple Silicon，为智能体增加模型列表、文本聊天和健康检查等 MCP 工具，并包含传输测试；配置沿用按群组管理的 `ncl` 命令。

- **路线图信号**：通过 skill 扩展本地模型能力，而非将其直接内置为核心依赖。
- **潜在场景**：希望在 Apple Silicon 设备上使用本地文本模型的用户。
- **下一版本判断**：已有实现提案，比单纯功能建议更接近交付，但目前仍为开放 PR，没有合并或版本计划证据。

稳定性方面，[#4354](https://github.com/nanocoai/nanoclaw/pull/4354) 与 [#4353](https://github.com/nanocoai/nanoclaw/pull/4353) 同时针对回复交付边界，值得关注后续是否形成集中修复；目前不能据此断言维护者的发布优先级。

## 6. 用户反馈摘要

**本次没有可供提炼的 Issue 或评论正文，因此无法提供真实用户满意度或直接反馈。** 以下仅是 PR 描述呈现的使用痛点：

- **等待却得不到结果**：中间提示发出后没有最终答复，用户难以判断任务是否仍在运行。来源：[#4354](https://github.com/nanocoai/nanoclaw/pull/4354)。
- **技术说明被误过滤**：讨论 `<internal>` 标签本身时，正常内容可能丢失。来源：[#4353](https://github.com/nanocoai/nanoclaw/pull/4353)。
- **渠道连接无明确失败结果**：Mattermost 异常握手可能使适配器持续等待。来源：[#4351](https://github.com/nanocoai/nanoclaw/pull/4351)。

以上属于问题场景归纳，不应当作已验证的用户投诉规模或满意度结论。

## 7. 待处理积压

**现有数据未显示长期未响应的 Issue 或 PR。** 所列 PR 均创建于 11 月 13—14 日，不能归类为长期积压。建议维护者优先关注：

1. **回复可靠性修复的评审与联合回归测试**：覆盖空最终输出、仅内部内容输出，以及行内代码提及标签等边界条件。相关：[#4354](https://github.com/nanocoai/nanoclaw/pull/4354)、[#4353](https://github.com/nanocoai/nanoclaw/pull/4353)。
2. **Mattermost 超时后的恢复行为**：确认异常升级不会无限阻塞，并核查重试及资源释放。相关：[#4351](https://github.com/nanocoai/nanoclaw/pull/4351)。
3. **补齐关闭项的交付状态**：核实 #4350 是合并还是未合并关闭，避免误将关闭等同于修复上线。相关：[#4350](https://github.com/nanocoai/nanoclaw/pull/4350)。

**健康度结论**：今日体现出明确的稳定性治理方向，并有本地模型扩展提案补充功能面；但缺少合并记录、评论内容和发布信息，尚不足以判断修复交付效率及社区响应质量。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报
**日期：2026-11-14**  
**统计范围：所提供的过去 24 小时 GitHub 更新数据**  
**项目：[nullclaw/nullclaw](https://github.com/nullclaw/nullclaw)**

## 1. 今日速览
过去 24 小时，NullClaw 有 **1 条 PR 更新、0 条 Issue 更新、0 个新版本发布**，整体处于低活跃状态。唯一更新的 [PR #1094](https://github.com/nullclaw/nullclaw/pull/1094) 聚焦 Telegram 消息展示，拟将 Markdown 表格转换为等宽预格式化文本，改善表格可读性。该 PR 尚未合并，今日也没有已合并或关闭的 PR，因此当前进展主要体现在候选改进，而非已交付成果。现有数据未显示新增稳定性事件，但仅凭单日记录，无法判断项目长期维护节奏或整体健康度。

## 2. 项目进展
### Telegram 表格渲染改进进入待合并阶段
- **PR：**[feat(telegram): render markdown tables as monospace pre blocks #1094](https://github.com/nullclaw/nullclaw/pull/1094)
- **作者：**timosha
- **状态：**OPEN；创建及最近更新时间均为 2026-11-13。

根据提供的摘要，现有 `markdownToTelegramHtml` 会将 Markdown 表格中的竖线直接传递给 Telegram，导致表格显示混乱、挤成一行。该 PR 拟识别表头后的分隔行，并将表头和数据行拆分为去除首尾空白的单元格，以等宽预格式化块呈现。

**推进程度：**这是 Telegram 渠道输出体验的一项局部改进，尚未形成已合并交付。摘要未提供完整实现、测试或 CI 信息，因此暂不能确认边界情况覆盖程度。

## 3. 社区热点
### 唯一活跃条目：Telegram 中的结构化内容可读性
[PR #1094](https://github.com/nullclaw/nullclaw/pull/1094) 是本次数据中的唯一活跃条目，👍 为 **0**，评论数字段为 `undefined`，应视为**未知**，不能当作零评论。

其背后的诉求是让 AI 助手生成的表格内容在 Telegram 中保持清晰的行列结构，例如比较结果或清单。不过，现有数据只能确认这一改进方向，不能据此认定它已形成社区广泛关注或共识。

## 4. Bug 与稳定性
| 严重程度 | 问题 | 修复状态 |
|---|---|---|
| 较低：展示层问题 | Markdown 表格在 Telegram 中被直接输出为竖线文本，出现排版混乱；会影响信息阅读，暂无证据表明涉及崩溃或数据丢失 | 已有候选修复 [PR #1094](https://github.com/nullclaw/nullclaw/pull/1094)，尚未合并 |

本次数据中没有新增 Bug Issue，也没有崩溃或回归报告。上述问题来自 PR 摘要，并非今日新报的 Issue。

## 5. 功能请求与路线图信号
- **明确方向：改善 Telegram 对 Markdown 表格的展示。**已有具体实现 PR，说明该方向已从问题识别推进到代码提案阶段，但不能据此确认会进入下一版本。[PR #1094](https://github.com/nullclaw/nullclaw/pull/1094)
- **建议审查重点：**表格识别是否误伤普通含竖线文本、不同列数及空单元格是否正确处理，以及长表格在 Telegram 中的显示效果。这些是基于改动范围提出的验证建议，并非已发现的问题。[PR #1094](https://github.com/nullclaw/nullclaw/pull/1094)

今日没有 Issue 数据可用于识别其他用户功能请求。

## 6. 用户反馈摘要
本次没有提供 Issue 评论，也没有提供 PR 评论正文，因此**无法提炼真实用户的满意度、使用频率或具体反馈**。

可确认的痛点仅来自 [PR #1094](https://github.com/nullclaw/nullclaw/pull/1094) 的描述：Telegram 中的 Markdown 表格缺乏可读的布局。它反映了渠道展示适配的实际问题，但不应被表述为已验证的普遍用户诉求。

## 7. 待处理积压
- **近期待处理：**[PR #1094](https://github.com/nullclaw/nullclaw/pull/1094) 仍待审查或合并，建议维护者关注实现正确性与渲染测试。该 PR 于 2026-11-13 创建，距日报日期仅一天，**不属于长期积压**。
- **长期积压：**所提供数据不包含历史未响应条目，无法判断是否存在重要 Issue 或 PR 长期无人处理。

**总体判断：**今日呈现的是低活跃度下的一项明确体验改进。Telegram 表格显示问题已有候选修复，但尚未交付；未出现新增稳定性警报，长期项目健康度仍需结合更长周期的合并、响应和发布数据评估。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报
**日期：2026-11-14**  
**项目：[netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)**

> **数据口径说明：**所给窗口汇总为 12 条 PR 更新，其中 3 条 OPEN、9 条 CLOSED；部分条目的更新时间显示为 11 月 13 日，以下按所给窗口统计，不将其全部认定为 11 月 14 日发生的变更。`CLOSED` 不等于已合并；评论字段为 `undefined`，无法据此判断讨论热度。

## 1. 今日速览

LobsterAI 本次统计窗口呈现**修复驱动、代码侧活跃**的状态：共 12 条 PR 更新，无 Issue 更新，也没有新版本发布。工作重点集中在 Cowork 会话完整性、OpenClaw 删除后维护安全，以及技能管理和界面信息表达。9 条 PR 已关闭，但现有数据不能确认其是否合并，因此不能将相关修复直接视为已交付。贡献主要来自 fisherdaddy（9/12 条 PR），说明维护推进较集中；整体健康信号偏积极，但交付状态和用户验证仍需补充。详见 [项目 PR 列表](https://github.com/netease-youdao/LobsterAI/pulls)。

## 2. 项目进展

以下为窗口内的重要**已关闭 PR**，不代表均已合并或进入发布版本。

| 方向 | 重要进展 | 对项目的意义 |
|---|---|---|
| 删除后数据保护 | [#3092](https://github.com/netease-youdao/LobsterAI/pull/3092)：自动维护跳过已删除智能体的受保护数据库，媒体 GC 增加删除日志与路径保护检查 | 降低“删除智能体但保留文件”场景中的启动维护失败及附件误删风险 |
| 会话分叉完整性 | [#3082](https://github.com/netease-youdao/LobsterAI/pull/3082)：分叉时重新映射而非移除 `toolUseId`，摘要还提及一次性启动迁移 | 保持并行工具调用与结果的对应关系，修补复杂 Agent 会话的基础正确性 |
| 历史记录容错 | [#3087](https://github.com/netease-youdao/LobsterAI/pull/3087)：逐条解析持久化消息元数据，并共享恢复逻辑 | 避免单条损坏元数据阻断整段历史加载 |
| 中断轮次编辑 | [#3086](https://github.com/netease-youdao/LobsterAI/pull/3086)：修复网关尚未记录的轮次无法编辑、切换版本的问题 | 改善用户快速停止生成后继续修改对话的体验 |
| 技能分发精简 | [#3088](https://github.com/netease-youdao/LobsterAI/pull/3088)：内置技能由 27 个减至 19 个，保留现有用户副本、启用状态和离线本地化名称 | 精简新安装内容，同时兼顾存量用户兼容性；保留副本转为可删除的用户技能 |
| 提示词开销优化 | [#3085](https://github.com/netease-youdao/LobsterAI/pull/3085)：精简托管 `AGENTS.md` 与初始模板中的重复、未使用文本 | 旨在降低模型请求上下文开销；未提供可量化的 token 或成本收益 |

其他体验改进包括：回复底部元信息间距与朗读状态调整 [#3089](https://github.com/netease-youdao/LobsterAI/pull/3089)，以及引擎启动期间展示应用内广告目标页提示 [#3084](https://github.com/netease-youdao/LobsterAI/pull/3084)。

**阶段判断：**本轮更接近“可靠性收敛与体验打磨”，而非新增 Agent 能力的大版本扩张。另有关闭的 [Release/2026.11.9 PR #3083](https://github.com/netease-youdao/LobsterAI/pull/3083)，但没有摘要或 Release 记录，不能据此确认版本已发布。

## 3. 社区热点

**无法建立真实的讨论热榜：**本窗口没有 Issue 更新，所有 PR 的评论数均缺失，👍 均为 0。以下是按问题影响和改动内容筛选的关注主题，而非按互动量排名。

- **执行过程是否足够易懂。**[#3093](https://github.com/netease-youdao/LobsterAI/pull/3093) 指出，文件编辑步骤中的绿色/红色 `+N / -N` 缺少单位，可能被误认为积分扣费。拟默认展示文件动作与结果，通过 **View changes** 查看前后差异。背后诉求是让助手执行过程可理解，避免把修改量与费用混淆。
- **删除是否尊重“保留数据”的选择。**[#3092](https://github.com/netease-youdao/LobsterAI/pull/3092) 聚焦删除后的后台维护边界，反映出个人助手对会话与附件保留语义的高要求。
- **技能安装能否重复执行而不产生副本。**[#3091](https://github.com/netease-youdao/LobsterAI/pull/3091) 针对重复导入相同本地 ZIP 后生成 `-1` 副本的问题，体现本地技能管理对幂等安装的需求。

## 4. Bug 与稳定性

以下按**潜在影响**排序，并非官方严重性定级；所给数据未提供独立崩溃报告。

| 优先级 | 问题与影响 | Fix PR / 当前状态 |
|---|---|---|
| **高：数据保留风险** | 删除智能体并保留文件后，后台媒体清理可能误删保留会话附件；维护还可能访问受保护数据库，导致启动迁移或插件清理失败 | [#3092](https://github.com/netease-youdao/LobsterAI/pull/3092)，CLOSED，合并未确认。摘要报告 98 个补丁强校验通过、7 个定向测试文件共 166 项测试通过 |
| **高：会话执行记录完整性** | 分叉会话丢失 `toolUseId`，并行工具结果无法与调用正确配对 | [#3082](https://github.com/netease-youdao/LobsterAI/pull/3082)，CLOSED，合并未确认 |
| **中：历史加载失败** | 单条持久化消息元数据损坏，可能阻断整个历史加载 | [#3087](https://github.com/netease-youdao/LobsterAI/pull/3087)，CLOSED，合并未确认 |
| **中：执行模式配置失效** | 配置读取强制返回 `local`，使已保存的 `auto`、`sandbox` 无法在重载后保留 | [#3090](https://github.com/netease-youdao/LobsterAI/pull/3090)，**OPEN** |
| **中：中断后编辑受限** | 用户快速停止轮次后，网关可能未写入用户消息，导致无法编辑或切换版本 | [#3086](https://github.com/netease-youdao/LobsterAI/pull/3086)，CLOSED，合并未确认 |
| **低：重复安装与信息误读** | 相同本地技能 ZIP 产生副本；文件修改计数易被理解为扣费 | [#3091](https://github.com/netease-youdao/LobsterAI/pull/3091)、[#3093](https://github.com/netease-youdao/LobsterAI/pull/3093)，均为 **OPEN** |

**稳定性观察：**[#3092](https://github.com/netease-youdao/LobsterAI/pull/3092) 提供了本批数据中较充分的测试证据，但仍需区分“PR 中报告验证通过”与“发布后得到用户验证”。

## 5. 功能请求与路线图信号

本窗口没有新增 Issue 型功能请求。现有 PR 显示以下近期候选方向，但**不构成版本承诺**：

- **更透明的执行展示：**[#3093](https://github.com/netease-youdao/LobsterAI/pull/3093) 将默认信息从增删计数转向动作与结果，并提供显式差异查看入口，有望改善非技术用户理解。
- **更可靠的执行模式选择：**[#3090](https://github.com/netease-youdao/LobsterAI/pull/3090) 修复配置持久化读取，而非引入新执行模式；若合并，可恢复已有选项的预期行为。
- **更可控的技能生命周期：**待审的本地 ZIP 去重 [#3091](https://github.com/netease-youdao/LobsterAI/pull/3091)，与已关闭的内置技能精简 [#3088](https://github.com/netease-youdao/LobsterAI/pull/3088)，共同指向更精简、可管理的技能体系。

## 6. 用户反馈摘要

**没有可直接引用的 Issue 评论，无法判断用户满意度或反馈覆盖面。**能够确认或合理提炼的痛点仅来自 PR 摘要：

- **明确标为用户报告的问题：**文件编辑 `+N / -N` 展示容易被误认为积分扣费，说明执行状态表达存在歧义；没有原始用户评论可供进一步核验。[#3093](https://github.com/netease-youdao/LobsterAI/pull/3093)
- **从修复场景提炼、非用户原话：**快速停止生成后仍需编辑、重试和切换版本；分叉会话应继续保持工具记录一致性。[#3086](https://github.com/netease-youdao/LobsterAI/pull/3086)、[#3082](https://github.com/netease-youdao/LobsterAI/pull/3082)
- **从兼容设计提炼、非满意度证据：**技能精简保留现有副本及启用状态，表明维护者在减少内置内容时关注存量工作流连续性。[#3088](https://github.com/netease-youdao/LobsterAI/pull/3088)

## 7. 待处理积压

**没有证据表明存在长期未响应积压。**当前 3 条 OPEN PR 均创建于 11 月 13—14 日，不能称为长期搁置；建议按影响安排评审：

1. **优先审查执行模式读取修复。**确认配置重载与 OpenClaw 同步链路均保留预期值，避免用户选择失效。[#3090](https://github.com/netease-youdao/LobsterAI/pull/3090)
2. **审查本地技能去重边界。**重点核验相同 ZIP 重复导入，以及缺少发布元数据时的安装目标判断。[#3091](https://github.com/netease-youdao/LobsterAI/pull/3091)
3. **验证文件编辑展示的可理解性。**确认默认状态、失败结果与差异查看入口均能消除费用歧义。[#3093](https://github.com/netease-youdao/LobsterAI/pull/3093)
4. **补齐高风险修复的交付追踪。**优先确认删除后数据保护与会话完整性修复是否合并、进入哪个版本，并在发布说明中明确验证范围。[#3092](https://github.com/netease-youdao/LobsterAI/pull/3092)、[#3082](https://github.com/netease-youdao/LobsterAI/pull/3082)

**总体结论：**代码侧维护较活跃，修复重点覆盖个人 AI 助手的关键可靠性链路；目前最大的判断盲区是关闭 PR 的实际合并情况、版本交付状态，以及缺失的社区讨论数据。

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
**日期：2026-11-14｜统计范围：所提供的过去 24 小时数据**

> **数据口径说明：**项目入口为 [agentscope-ai/CoPaw](https://github.com/agentscope-ai/CoPaw)，但所提供的 Issue、PR 及版本描述均指向 `agentscope-ai/QwenPaw`。以下保留 CoPaw 日报名称，条目链接按数据中的 QwenPaw 仓库生成，不推断仓库更名或迁移关系。数据未提供评论正文，PR 评论数为 `undefined`，因此不能据此判断 PR 讨论热度或提炼评论原话。

## 1. 今日速览

过去 24 小时共记录 **5 条 Issue 更新、9 条 PR 更新**，全部仍处于开放状态，未记录 Issue 关闭、PR 合并或新版本发布。按本次样本判断，贡献活动较活跃，但尚无可确认的合并交付，不能将修复提案视为已经上线。9 条 PR 中 **8 条为修复、1 条为功能增强**，工作重点集中在模型协议兼容、流式响应、认证边界及跨平台稳定性。另有 **3 条 PR 标记为首次贡献者提交**，显示出外部贡献参与；当前健康度的关键观察点是这些修复能否及时完成验证和合并。

## 2. 项目进展

### 已完成进展：本期未记录

本期 **0 条 PR 合并或关闭**，因此没有可确认的功能落地或缺陷关闭。以下均为待合并进展，而非已交付成果。

| 方向 | 待合并工作及价值 | 状态 |
|---|---|---|
| 模型输出可靠性 | [#8735](https://github.com/agentscope-ai/QwenPaw/pull/8735)：对正常结束但没有答案或工具调用的空流，在重试预算允许时增加一次重试，并对思考及纯空白内容进行有限缓冲。 | OPEN |
| Responses 协议兼容 | [#8728](https://github.com/agentscope-ai/QwenPaw/pull/8728)：根据模型声明的 `ThinkingControl` 关闭思考，减少硬编码模型名单带来的兼容问题。 | OPEN |
| 反向代理下的流式体验 | [#8730](https://github.com/agentscope-ai/QwenPaw/pull/8730)：为聊天及工具调用的另外两个 SSE 端点补充禁用代理缓冲的响应头。 | OPEN |
| Hub 模型连接 | [#8729](https://github.com/agentscope-ai/QwenPaw/pull/8729)：为 AnthropicProvider 预设暴露 `request_headers`，处理部分预设连接立即返回 HTTP 502 的问题。 | OPEN |
| Codex 会话恢复 | [#8723](https://github.com/agentscope-ai/QwenPaw/pull/8723)：app-server 在回复中断连时结束当前等待，并在下一轮重连、恢复已保存线程。 | OPEN |
| 工具输出性能 | [#8722](https://github.com/agentscope-ai/QwenPaw/pull/8722)：将工具输出实时预览限制为最近 4096 个字符，结束后仍保留完整结果，降低进度事件重复传输成本。 | OPEN |

**进展判断：**修复方向覆盖了个人助手“连接模型—生成回复—执行工具—展示结果”的多个关键环节，但本期推进主要体现在补丁提交层面。[#8723](https://github.com/agentscope-ai/QwenPaw/pull/8723) 与 [#8722](https://github.com/agentscope-ai/QwenPaw/pull/8722) 声明针对性回归测试通过，全量本地检查仍未勾选，应继续关注验证结果。

## 3. 社区热点

当前可见讨论量整体不高：5 条 Issue 合计 **6 条评论、0 个 👍**，尚无明显高热度议题。

- **讨论最多：续接摘要被推理预算挤占**  
  [Issue #8727](https://github.com/agentscope-ai/QwenPaw/issues/8727) 有 **2 条评论**，是样本中评论最多的条目。用户报告模型默认推理可能耗尽 4000-token 输出预算，导致 continuation summary 失败。背后诉求是：摘要这类系统任务应能可靠关闭思考，而非依赖模型默认行为。已有相关修复提案 [PR #8728](https://github.com/agentscope-ai/QwenPaw/pull/8728)。

- **渠道内模型切换必须真正作用于当前会话**  
  [Issue #8725](https://github.com/agentscope-ai/QwenPaw/issues/8725) 有 **1 条评论**。用户在飞书等渠道执行 `/model` 后收到成功提示，但会话级钉住模型不变，暴露出操作反馈与实际状态不一致的问题。

- **桌面通知应区分主回复与子任务完成**  
  [Issue #8736](https://github.com/agentscope-ai/QwenPaw/issues/8736) 有 **1 条评论**。子智能体完成错误触发“Reply completion”通知，反映用户希望多智能体内部事件不会干扰主对话通知。

- **本地兼容性与外观定制各有关注**  
  中文 Windows 插件加载问题 [#8733](https://github.com/agentscope-ai/QwenPaw/issues/8733) 与外观设置请求 [#8732](https://github.com/agentscope-ai/QwenPaw/issues/8732) 各有 **1 条评论**，分别指向基础可用性和个性化体验需求。

## 4. Bug 与稳定性

以下为依据影响范围与可恢复性作出的**分析优先级**，并非维护者官方严重性评级。

| 优先级 | 问题与影响 | 修复状态 |
|---|---|---|
| **高** | [#8725：渠道内无法切换会话级钉住模型](https://github.com/agentscope-ai/QwenPaw/issues/8725)。当原模型故障时，用户无法通过渠道命令自救，可能阻断整条会话。 | 本次数据中未见对应 fix PR。 |
| **高** | [#8727：续接摘要失败](https://github.com/agentscope-ai/QwenPaw/issues/8727)。关闭思考的配置未按预期传递到 Responses 模型，默认推理可能耗尽摘要输出预算，影响长对话续接。 | 有相关 [PR #8728](https://github.com/agentscope-ai/QwenPaw/pull/8728)，待合并、验证。 |
| **中高** | [#8733：中文 Windows 上 CloudPaw 插件无法加载](https://github.com/agentscope-ai/QwenPaw/issues/8733)。UTF-8 JSON 被系统默认 GBK 编码读取，属于平台相关功能阻断。 | [PR #8734](https://github.com/agentscope-ai/QwenPaw/pull/8734) 明确修复该 Issue，待合并。 |
| **中** | [#8736：子智能体完成误触发桌面通知](https://github.com/agentscope-ai/QwenPaw/issues/8736)。影响通知准确性；报告者称在 2.3.0 和所检查的 main 代码中均存在。 | 本次数据中未见对应 fix PR。 |

### 额外值得优先审查的稳定性与安全修复

- **认证边界：**[PR #8724](https://github.com/agentscope-ai/QwenPaw/pull/8724) 拟修复来自回环地址、同时携带代理转发头的请求仍可能跳过认证的问题。建议优先验证可信代理配置与免认证主机规则的交互；现有摘要不足以判断所有部署的实际暴露范围。
- **模型连接及空响应：**[PR #8729](https://github.com/agentscope-ai/QwenPaw/pull/8729) 和 [PR #8735](https://github.com/agentscope-ai/QwenPaw/pull/8735) 分别处理 Hub 502 与空流结束，均直接影响“能否获得有效回复”。
- **断连与持续输出：**[PR #8723](https://github.com/agentscope-ai/QwenPaw/pull/8723) 和 [PR #8722](https://github.com/agentscope-ai/QwenPaw/pull/8722) 分别降低回复持续等待及实时输出传输膨胀风险。

## 5. 功能请求与路线图信号

### 外观设置集中化：已有明确需求，尚无对应 PR

[Issue #8732](https://github.com/agentscope-ai/QwenPaw/issues/8732) 请求在 Settings Center 新增 Appearance 页面，统一配置欢迎头像、问候语、布局位置及背景颜色或样式。提交者称底层多数能力已经存在，需求重点在于提供统一配置入口；但当前没有对应 PR，**不能据此确认进入下一版本**。

### Office 文档预览：已有实现提案

[PR #8726](https://github.com/agentscope-ai/QwenPaw/pull/8726) 提议在 Console 文件抽屉中增加 `.docx`、`.xlsx`、`.pptx` 的客户端只读预览，减少用户下载文件后再检查智能体产物的操作成本。该 PR 为 **XL 规模**，虽比纯需求更接近交付，但仍需关注评审与合并结果。

**路线图信号：**本期同时出现外观定制需求和 Office 预览提案，表明 Console 的个人工作台体验正在获得关注；不过从 PR 构成看，当前贡献重心仍是可靠性修复，而不是大规模新功能扩张。

## 6. 用户反馈摘要

> 以下来自 Issue 描述及 PR 问题陈述，不是评论正文分析；数据不足以判断社区整体满意度。

- **“成功提示”必须与实际执行一致。**渠道用户需要直接切换当前会话模型，尤其是在原模型不可用时；仅修改 Agent 默认值不能满足恢复需求。见 [#8725](https://github.com/agentscope-ai/QwenPaw/issues/8725)。
- **长对话摘要需要可预测的 token 使用。**用户关心的不只是模型支持推理，而是系统能否在摘要任务中可靠关闭推理并产出结果。见 [#8727](https://github.com/agentscope-ai/QwenPaw/issues/8727)。
- **本地化部署不应依赖系统默认编码。**中文 Windows 用户遭遇的是插件整体不可用，而非简单乱码。见 [#8733](https://github.com/agentscope-ai/QwenPaw/issues/8733)。
- **多智能体执行不应制造通知噪声。**子任务完成与主回复完成需要明确区分。见 [#8736](https://github.com/agentscope-ai/QwenPaw/issues/8736)。
- **生成的办公文件应能就地检查。**Office 预览提案反映了减少下载、切换应用和人工验收成本的需求，但该诉求来自 PR 描述，不能视为已被广泛验证的社区共识。见 [#8726](https://github.com/agentscope-ai/QwenPaw/pull/8726)。

## 7. 待处理积压

**当前数据不足以识别“长期未响应”的条目。**所列条目创建于 11 月 13—14 日，也未提供维护者响应时间，不宜将其归类为长期积压。建议重点跟踪：

1. **补齐尚无对应修复的阻断问题：**优先处理渠道会话模型无法切换 [#8725](https://github.com/agentscope-ai/QwenPaw/issues/8725)，并为通知误触发 [#8736](https://github.com/agentscope-ai/QwenPaw/issues/8736) 明确修复计划。
2. **优先评审安全及基础连接补丁：**认证修复 [#8724](https://github.com/agentscope-ai/QwenPaw/pull/8724)、Hub 连接修复 [#8729](https://github.com/agentscope-ai/QwenPaw/pull/8729)，应关注配置组合和回归测试覆盖。
3. **推动已形成修复配对的问题闭环：**验证 [#8733](https://github.com/agentscope-ai/QwenPaw/issues/8733)／[#8734](https://github.com/agentscope-ai/QwenPaw/pull/8734)，以及 [#8727](https://github.com/agentscope-ai/QwenPaw/issues/8727)／[#8728](https://github.com/agentscope-ai/QwenPaw/pull/8728)，避免停留在“有补丁、未确认解决”的阶段。
4. **控制大型功能评审成本：**为 Office 预览 [#8726](https://github.com/agentscope-ai/QwenPaw/pull/8726) 明确验收范围，避免 XL 变更长期悬置。

**总体结论：**本期呈现“修复贡献活跃、交付结果尚待确认”的状态。下一阶段最值得观察的不是新增条目数量，而是关键阻断问题的关闭率、修复 PR 的验证与合并进度，以及新贡献者提交能否顺利完成评审。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报
**日期：2026-11-14** · [项目仓库](https://github.com/zeroclaw-labs/zeroclaw)

> 数据口径：基于提供的近 24 小时更新列表；部分条目的更新时间为 11 月 13 日，可能涉及统计窗口或时区边界。PR 的评论数未提供，`CLOSED` 不等同于已合并。

## 1. 今日速览

ZeroClaw 今日有 **7 条 Issue、11 条 PR 更新**，其中 10 条 PR 仍开放、1 条已关闭，未发布新版本，整体呈现**提交活跃、交付结果尚待确认**的状态。工作重心集中在 OpenCode Go 兼容性、工具错误恢复、消息渠道处理以及边界场景测试，体现出对可靠性的持续投入。安全方向同时出现受限凭据授权 RFC 与 SSH 实现提案，但均尚未落地。当前最值得优先跟踪的是 QQ 长任务超时导致工作流阻塞，以及安全依赖更新是否真正进入主分支；现有数据不足以评价合并效率或问题解决率。[Issue 列表](https://github.com/zeroclaw-labs/zeroclaw/issues) · [PR 列表](https://github.com/zeroclaw-labs/zeroclaw/pulls)

## 2. 项目进展

### 已关闭事项：安全依赖更新，合并状态未确认
- **[#12419：升级 quinn-udp 至 0.5.16](https://github.com/zeroclaw-labs/zeroclaw/pull/12419)**  
  该 PR 针对 `RUSTSEC-2026-0538`：受截断数据报影响，接收循环可能持续空转；摘要指出相关问题已导致 `cargo audit` 安全 CI 失败。PR 当前为 **CLOSED**，但未提供合并信息，因此**不能据此认定漏洞已修复**，需核查主分支锁文件或替代 PR。

### 主要在途进展：修复与回归保护并行
- **OpenCode Go 修复已提出**：[#12423](https://github.com/zeroclaw-labs/zeroclaw/pull/12423) 同时处理模型目录分流与上下文容量发现，对应两条用户报告；目前仍待合并。
- **工具失败恢复更明确**：[#12424](https://github.com/zeroclaw-labs/zeroclaw/pull/12424) 拟将目录路径、文件读取失败等预期错误转换为失败的 `ToolResult`，避免成为不透明的适配器错误，有利于智能体继续判断和恢复。
- **回归测试补强**：新增 Gmail 异常 MIME 回退测试 [#12429](https://github.com/zeroclaw-labs/zeroclaw/pull/12429)、Schema 引用键单次解码测试 [#12428](https://github.com/zeroclaw-labs/zeroclaw/pull/12428)，以及 Unicode 日志分页与轮转测试 [#12427](https://github.com/zeroclaw-labs/zeroclaw/pull/12427)。三者均为开放 PR，尚不能视为主分支已获得保护。

**进展判断：**今天的主要增量是形成了可审查的修复和测试方案，而非已确认交付的新能力。

## 3. 社区热点

**当前无法按讨论热度排序**：7 条 Issue 的评论与点赞均为 0；PR 点赞均为 0，评论数缺失。以下按议题关联度和影响范围列出关注点，不代表社区热度排名。

| 关注议题 | 相关条目 | 背后诉求 |
|---|---|---|
| OpenCode Go 服务识别 | [#12412](https://github.com/zeroclaw-labs/zeroclaw/issues/12412)、[#12413](https://github.com/zeroclaw-labs/zeroclaw/issues/12413)、修复 [#12423](https://github.com/zeroclaw-labs/zeroclaw/pull/12423) | 配置的服务应匹配正确模型目录，并能发现上下文容量 |
| 不向模型暴露凭据的授权 | RFC [#12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422)、SSH PR [#12418](https://github.com/zeroclaw-labs/zeroclaw/pull/12418) | 让智能体执行真实服务任务，同时保持凭据隔离和访问范围约束 |
| WASM 插件唤醒与架构边界 | 请求 [#12416](https://github.com/zeroclaw-labs/zeroclaw/issues/12416)、文档 PR [#12417](https://github.com/zeroclaw-labs/zeroclaw/pull/12417) | 在不破坏依赖边界的前提下，由宿主完成插件唤醒分发 |

## 4. Bug 与稳定性

以下按已标注严重程度及潜在影响排列；未定级事项不强行赋予等级。

| 优先级 / 严重度 | 问题与影响 | 修复状态 |
|---|---|---|
| **优先核验：安全风险** | `quinn-udp` 接收循环空转问题，并影响安全 CI | [#12419](https://github.com/zeroclaw-labs/zeroclaw/pull/12419) 已关闭，**是否合并未知** |
| **S1：工作流阻塞** | QQ 发起 Bing 搜索长任务后，仅返回“等待模型响应超时”，报告者认为流程失去控制 | [#12425](https://github.com/zeroclaw-labs/zeroclaw/issues/12425)；所给数据中无对应 fix PR |
| **S2：行为降级** | OpenCode Go 错取 Zen 的 139 模型目录，缺少 Go 专属模型并混入其他模型 | [#12412](https://github.com/zeroclaw-labs/zeroclaw/issues/12412)；有开放修复 [#12423](https://github.com/zeroclaw-labs/zeroclaw/pull/12423) |
| **S2：行为降级** | OpenCode Go 上下文窗口发现返回无容量或获取失败 | [#12413](https://github.com/zeroclaw-labs/zeroclaw/issues/12413)；有开放修复 [#12423](https://github.com/zeroclaw-labs/zeroclaw/pull/12423) |
| **S3：性能问题** | Cron 智能体任务未进入 session-key 作用域，缺少提供商提示词缓存亲和性 | [#12421](https://github.com/zeroclaw-labs/zeroclaw/issues/12421)；无对应 fix PR |
| **未定级：消息处理** | Matrix 编辑事件可能以旧文本触发重复智能体轮次 | 开放 PR [#12426](https://github.com/zeroclaw-labs/zeroclaw/pull/12426) 提出可选编辑消息处理 |
| **未定级：配置兼容** | OpenAI STT 环境凭据需桥接到类型化配置字段 | 开放 PR [#12410](https://github.com/zeroclaw-labs/zeroclaw/pull/12410)，保留显式配置优先级 |

现有数据未提供崩溃报告，也不足以确认上述问题是否属于近期回归。

## 5. 功能请求与路线图信号

- **受限服务凭据与任务级 SSH：方向明确，落地仍有前置条件。**  
  [RFC #12422](https://github.com/zeroclaw-labs/zeroclaw/issues/12422) 希望授权智能体使用服务而不向模型、聊天、技能文本或通用工具泄露凭据；[PR #12418](https://github.com/zeroclaw-labs/zeroclaw/pull/12418) 提出任务级 SSH broker，支持本地加密密钥和 OpenBao 引用，并检查实际主机、端口与用户。该 PR 为 XL，且依赖 #11869、#12408，不能据此预测下一版本交付。

- **Matrix 编辑消息：已有具体实现，具备近期候选特征。**  
  [PR #12426](https://github.com/zeroclaw-labs/zeroclaw/pull/12426) 将编辑事件处理做成可选行为，兼顾避免旧文本重复执行与编辑消息使用需求；仍需审查和验证。

- **OIDC 完整退出：需求已提出，尚无实现信号。**  
  [Issue #12415](https://github.com/zeroclaw-labs/zeroclaw/issues/12415) 请求支持 `end_session_endpoint`，解决只退出 ZeroClaw 本地会话、身份提供方仍保持登录的问题。

- **WASM 插件唤醒：仍处架构授权阶段。**  
  [Issue #12416](https://github.com/zeroclaw-labs/zeroclaw/issues/12416) 与 [PR #12417](https://github.com/zeroclaw-labs/zeroclaw/pull/12417) 请求有限的 ADR-016 例外。当前 PR 是文档提案，不能视为功能实现；其高风险、人工审查标签也提示需要架构层面把关。

## 6. 用户反馈摘要

**没有可供提炼的 Issue 评论内容**，以下仅来自问题正文，不代表社区共识。

- **长任务需要可解释、可恢复的结果。** QQ 搜索场景中，报告者希望收到正确搜索结果，或明确的搜索引擎错误，而不是笼统超时。这反映的是端到端流程可控性诉求，尚不能据此确定超时根因。[#12425](https://github.com/zeroclaw-labs/zeroclaw/issues/12425)
- **模型服务配置应所见即所得。** OpenCode Go 用户在 v0.9.0 使用命令行刷新目录、发现上下文窗口时，遇到错误目录与容量缺失，影响配置可信度。[#12412](https://github.com/zeroclaw-labs/zeroclaw/issues/12412) · [#12413](https://github.com/zeroclaw-labs/zeroclaw/issues/12413)
- **“退出登录”应符合身份会话预期。** OIDC 用户退出后再次登录仍被静默认证，说明本地退出与身份提供方退出的语义存在落差。[#12415](https://github.com/zeroclaw-labs/zeroclaw/issues/12415)

数据中没有明确的正向满意反馈，不宜推断整体用户满意度。

## 7. 待处理积压

本批条目均创建于 **11 月 13—14 日**，无法识别“长期未响应”的积压；评论为 0 也不能证明维护者未处理。建议优先建立以下跟踪项：

1. **确认安全修复闭环**：核查关闭的 [#12419](https://github.com/zeroclaw-labs/zeroclaw/pull/12419) 是否已有替代提交；同时检查包含 36 项更新的依赖批量 PR [#12420](https://github.com/zeroclaw-labs/zeroclaw/pull/12420) 是否覆盖相关修复，不能仅凭标题认定。
2. **优先分诊 S1 长任务问题**：为 [#12425](https://github.com/zeroclaw-labs/zeroclaw/issues/12425) 补充日志、超时配置与任务执行状态，区分模型、搜索工具和渠道超时。
3. **推进双问题修复验证**：检查 [#12423](https://github.com/zeroclaw-labs/zeroclaw/pull/12423) 是否分别覆盖旧别名、类型化配置、目录发现和容量发现，避免只修复部分路径。
4. **补齐尚无修复的需求评估**：对 Cron 缓存作用域 [#12421](https://github.com/zeroclaw-labs/zeroclaw/issues/12421) 和 OIDC 退出 [#12415](https://github.com/zeroclaw-labs/zeroclaw/issues/12415) 明确负责人、实现范围与验收标准。

**健康度结论：**提交侧活跃，修复与测试投入较均衡；但今日没有可确认的合并成果，安全修复状态及 S1 问题闭环应成为下一观察周期的重点。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*