# OpenClaw 生态日报 2026-06-10

> Issues: 42 | PRs: 46 | 覆盖项目: 13 个 | 生成时间: 2026-06-10 01:38 UTC

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

⚠️ 摘要生成失败。

---

## 横向生态对比

以下为基于你提供的 2026-06-10 社区动态摘要整理的**横向对比分析报告**。  
说明：**OpenClaw、NanoBot、Hermes Agent、PicoClaw 的摘要生成失败**，因此相关项目只能做“数据缺失”标注，不能做定量判断。

---

# 个人 AI 助手 / 自主智能体开源生态横向对比报告（2026-06-10）

## 1) 生态全景

过去 24 小时，这一生态整体呈现出三个明显特征：**高活跃项目继续加速迭代，低活跃项目偏维护或停滞，少数项目已进入生产化/企业化收敛阶段**。  
社区关注点已从“做出一个能跑的 Agent”转向“**权限、安全、可观测性、跨模型兼容、桌面端稳定性、生产切换**”等工程问题。  
多项目同时在补齐 **插件化、E2E 测试、渠道投递、任务归因、附件持久化** 等基础能力，说明该赛道正在从“概念验证期”进入“工程落地期”。  
整体来看，生态竞争焦点不是单一功能领先，而是**谁能把 Agent 运行链路做得更稳、更可控、更可扩展**。

---

## 2) 各项目活跃度对比

> 说明：Issues/PR 数为“今日摘要中明确给出的更新量”；无数据则标注“摘要缺失/无法统计”。

| 项目 | 今日 Issues 数 | 今日 PR 数 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| OpenClaw | 无法统计（摘要失败） | 无法统计（摘要失败） | 无法确认 | 数据缺失，暂无法评估 |
| NanoBot | 无法统计（摘要失败） | 无法统计（摘要失败） | 无法确认 | 数据缺失，暂无法评估 |
| Hermes Agent | 无法统计（摘要失败） | 无法统计（摘要失败） | 无法确认 | 数据缺失，暂无法评估 |
| PicoClaw | 无法统计（摘要失败） | 无法统计（摘要失败） | 无法确认 | 数据缺失，暂无法评估 |
| NanoClaw | 0 | 6 | 无新版本 | 低噪音、偏安全/稳定性治理，健康度较好 |
| NullClaw | 0 | 1 | 无新版本 | 低活跃、维护型，状态平稳 |
| IronClaw | 37 | 45 | 无新版本 | 高活跃，但仍在大规模补洞与收敛阶段 |
| LobsterAI | 1 | 4 | 无新版本 | 中等活跃，偏协作链路修复与体验完善 |
| TinyClaw | 0 | 0 | 无活动 | 低活跃/停滞 |
| Moltis | 0 | 0 | 无活动 | 低活跃/停滞 |
| CoPaw | 9 | 15 | 1 个新版本 | 高活跃，功能推进与稳定性补强并行 |
| ZeptoClaw | 0 | 0 | 无活动 | 低活跃/停滞 |
| ZeroClaw | 7 | 22 | 无新版本 | 高活跃，工程密度高但审阅压力大 |

### 活跃度分层
- **高活跃 / 快速迭代**：IronClaw、CoPaw、ZeroClaw  
- **中等活跃 / 修复导向**：NanoClaw、LobsterAI  
- **低活跃 / 维护型**：NullClaw  
- **停滞或无活动**：TinyClaw、Moltis、ZeptoClaw  
- **数据缺失，无法判断**：OpenClaw、NanoBot、Hermes Agent、PicoClaw

---

## 3) OpenClaw 在生态中的定位

### 结论先行
**由于 OpenClaw 的摘要生成失败，今天无法基于社区数据做出可信的定量定位。**  
也就是说，不能确认它的今日 Issues/PR/Release 活跃度，也不能准确判断其社区热度、技术重心或阶段成熟度。

### 作为“核心参照”的合理定位
从你给出的上下文看，OpenClaw更像是**生态中的基线项目**，可理解为：
- 可能承担通用 Agent 框架/协议基座角色；
- 其定位应更偏“平台层、标准层”而非单一场景应用；
- 对生态其他项目具有参照意义，但**今天缺少可验证社区信号**。

### 与同类项目的对比视角
在可见数据中：
- **CoPaw** 更偏桌面端、浏览器自动化、渠道投递与插件生态；
- **IronClaw** 更偏生产化、企业化、多租户、附件与认证；
- **ZeroClaw** 更偏底层运行时、turn engine、provider/security/gateway；
- **LobsterAI** 更偏协作工作台、任务闭环、数据迁移与导出体验；
- **NanoClaw/NullClaw** 更偏轻量修复或局部能力增强。

如果 OpenClaw 是“核心参照”，其优势理论上应在：
1. **通用性更强**
2. **生态兼容面更广**
3. **更容易形成事实标准**

但这一判断目前**缺少当天社区数据支撑**。  
因此，OpenClaw 的**技术路线差异、社区规模对比、优势强弱**，在本日只能标记为“待补数据”。

---

## 4) 共同关注的技术方向

以下是跨多个项目反复出现的共性需求：

### 1. 安全、权限、鉴权、边界控制
- **涉及项目**：NanoClaw、IronClaw、ZeroClaw
- **具体诉求**：
  - host 侧权限复核
  - pairing code 安全生成
  - auth/security/gateway 边界收紧
  - 运行时 fallback 不可静默降级
- **判断**：安全已经从“附加项”升级为 Agent 平台的基础能力。

### 2. Agent 执行链路与任务归因
- **涉及项目**：NullClaw、LobsterAI、ZeroClaw
- **具体诉求**：
  - cron/agent 投递归因准确
  - 子任务/主任务协作闭环
  - turn engine 统一
  - 任务完成通知与状态回传
- **判断**：大家不再满足“能执行”，而是要求“**能追踪、能审计、能回传**”。

### 3. 跨模型 / Provider 兼容性
- **涉及项目**：IronClaw、CoPaw、ZeroClaw
- **具体诉求**：
  - strict-mode provider 的 schema 兼容
  - DeepSeek / OpenAI-compatible / custom provider 差异适配
  - 不同 API wire protocol 的正确路由
- **判断**：多模型支持已从“可选特性”变为“主路径刚需”。

### 4. 桌面端、浏览器自动化与渠道投递稳定性
- **涉及项目**：CoPaw、LobsterAI、NanoClaw
- **具体诉求**：
  - Tauri 桌面端性能与外链/下载兼容
  - 浏览器切换、CDP timeout、profile isolation
  - Feishu/WeChat/Telegram/DingTalk 投递可靠性
- **判断**：AI 助手正从纯对话工具转向“**工作台 + 自动化入口**”。

### 5. 附件、导出、数据持久化与迁移
- **涉及项目**：IronClaw、LobsterAI
- **具体诉求**：
  - universal attachments
  - data backup/migration
  - export / code copy 稳定
- **判断**：用户开始把 AI 结果当作资产，要求可迁移、可保存、可复用。

### 6. 插件化与扩展体系
- **涉及项目**：ZeroClaw、CoPaw、IronClaw
- **具体诉求**：
  - native plugin system
  - MCP / OpenSandbox / wasmtime
  - tool cards / skills / extension 体系
- **判断**：生态竞争正在从“功能数量”转向“扩展效率”。

---

## 5) 差异化定位分析

### A. 工程平台型
**代表**：ZeroClaw、IronClaw  
- **功能侧重**：runtime、turn loop、provider、gateway、安全、生产化  
- **目标用户**：开发者、平台工程团队、企业落地团队  
- **架构特征**：更强调核心链路、扩展性、治理与稳定性  
- **差异点**：这类项目不追求最先做出 UI，而是优先把平台底座做稳

### B. 协作工作台型
**代表**：LobsterAI  
- **功能侧重**：主任务/子任务协作、通知闭环、导出、备份迁移  
- **目标用户**：需要长流程协作的重度个人用户、小团队  
- **架构特征**：更注重工作流连贯性和结果可迁移性  
- **差异点**：价值在“协作闭环”，而不是纯工具链扩展

### C. 桌面自动化 + 多渠道接入型
**代表**：CoPaw  
- **功能侧重**：Tauri 桌面端、浏览器自动化、MCP、渠道投递、插件生态  
- **目标用户**：最终用户、自动化重度使用者、桌面工作流用户  
- **架构特征**：客户端体验、浏览器能力、渠道适配并重  
- **差异点**：最接近“个人 AI 助手产品化落地”

### D. 轻量维护/局部修复型
**代表**：NanoClaw、NullClaw  
- **功能侧重**：安全加固、稳定性修复、局部能力补齐  
- **目标用户**：已有用户、维护者、二次集成者  
- **架构特征**：不追求大爆发，更强调修复与小步演进  
- **差异点**：健康但节奏较慢，偏“修缮型项目”

### E. 停滞/低活动项目
**代表**：TinyClaw、Moltis、ZeptoClaw  
- **功能侧重**：当前无明显社区推进  
- **目标用户**：难以判断  
- **架构特征**：缺少足够活跃信号  
- **差异点**：在生态中暂不构成主要竞争变量

### OpenClaw 的位置
OpenClaw 由于今天缺少有效摘要，**无法证实其更接近哪一类**。  
但按“核心参照”的语义推断，它更可能是**基础平台/基座型**，而不是单一场景应用型。

---

## 6) 社区热度与成熟度

### 快速迭代阶段
- **IronClaw**
  - 37 个 Issue、45 个 PR，密度最高
  - 特征：功能与架构同时推进，处于重构/补洞/生产化并行期
- **ZeroClaw**
  - 7 个 Issue、22 个 PR
  - 特征：高密度工程推进，审阅压力大，正在向更成熟的运行时平台过渡
- **CoPaw**
  - 9 个 Issue、15 个 PR、1 个 release
  - 特征：既有版本发布，也有大量稳定性修复，成熟度在提升

### 质量巩固阶段
- **NanoClaw**
  - 无新 Issue，6 条 PR，重点在安全与稳定性
  - 特征：更像“收紧边界、补生产问题”
- **LobsterAI**
  - 1 个 Issue、4 条 PR
  - 特征：围绕核心工作流做体验闭环修复

### 维护型/低活跃
- **NullClaw**
  - 1 条 PR，0 Issue
  - 特征：低噪音、偏修复
- **TinyClaw / Moltis / ZeptoClaw**
  - 无活动
  - 特征：当前难以判断是否仍处于持续维护

### 数据缺失
- **OpenClaw / NanoBot / Hermes Agent / PicoClaw**
  - 无法评估当前热度与成熟度

---

## 7) 值得关注的趋势信号

### 趋势 1：Agent 平台正在从“能跑”走向“可治理”
- 体现项目：IronClaw、ZeroClaw、NanoClaw
- 典型诉求：安全、权限、审计、fallback 失败策略、host-side authorization
- 对开发者的价值：**未来竞争点不只是模型能力，而是治理能力**

### 趋势 2：多模型兼容已成为默认要求
- 体现项目：CoPaw、IronClaw、ZeroClaw
- 典型诉求：OpenAI-compatible、DeepSeek schema 兼容、custom provider 校验
- 对开发者的价值：**必须把 provider 差异当成常态，而不是异常**

### 趋势 3：桌面端 AI 工具开始承担“主工作台”角色
- 体现项目：CoPaw、LobsterAI
- 典型诉求：Tauri 性能、外链、下载、浏览器切换、通知恢复
- 对开发者的价值：**桌面端体验已经是核心竞争力，不是附属能力**

### 趋势 4：任务归因、协作闭环、状态回传成为关键基础设施
- 体现项目：NullClaw、LobsterAI
- 典型诉求：cron attribution、subtask notification、agent turn loop 统一
- 对开发者的价值：**没有可追踪的执行链路，就难以形成真正可靠的 Agent 系统**

### 趋势 5：附件、导出、迁移、持久化正在成为用户刚需
- 体现项目：IronClaw、LobsterAI
- 典型诉求：universal attachments、backup/migration、export/copy 稳定
- 对开发者的价值：**AI 结果资产化是下一阶段的重要产品门槛**

### 趋势 6：插件化和运行时扩展正在从概念进入工程化
- 体现项目：ZeroClaw、CoPaw、IronClaw
- 典型诉求：wasmtime、MCP、native plugin system、skills framework
- 对开发者的价值：**谁能先建立稳定插件边界，谁就更容易形成生态黏性**

---

## 一句话总结

这套开源生态正在从“个人 AI 助手 Demo 竞赛”进入“**工程化平台竞争**”阶段：  
**高活跃项目在补安全、兼容、插件、桌面体验和生产化；中低活跃项目在收敛质量；而核心参照 OpenClaw 当前因数据缺失，暂无法完成有效对标。**

如果你愿意，我可以继续把这份报告整理成：
1. **PPT 汇报版**  
2. **适合管理层阅读的 1 页摘要版**  
3. **按项目逐一点评的深度分析版**

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报（2026-06-10）

## 1) 今日速览
过去 24 小时内，NanoClaw 没有新的 Issue 和 Release 产出，项目节奏主要体现在 PR 侧：共有 6 条 PR 更新，其中 2 条已关闭、4 条仍在推进中。整体看，项目当前处于“低 Issue 噪音、较活跃的变更审查”状态，说明维护重心更多放在安全加固、稳定性修复和文档/能力扩展上。  
从健康度上看，这是一个偏稳健的信号：没有新增故障或用户报错洪峰，但核心改动开始触及权限边界、配对安全和运行时清理，属于值得重点关注的高价值变更。  
GitHub： [Issues](https://github.com/qwibitai/nanoclaw/issues) ｜ [Pull Requests](https://github.com/qwibitai/nanoclaw/pulls)

---

## 2) 版本发布
过去 24 小时 **没有新版本发布**。  
GitHub： [Releases](https://github.com/qwibitai/nanoclaw/releases)

---

## 3) 项目进展
今日最重要的推进来自 2 条已关闭 PR，方向集中在“权限收紧 + 运行稳定性修复”：

1. **#2720 `security: authorize create_agent host-side (approval for confined groups)`**  
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/2720>  
   - 价值：补上了 `create_agent` 这类系统动作的 **host 侧授权检查**。  
   - 推进意义：把原本只在容器内生效的权限约束，上升到宿主机执行链路再校验，显著降低越权创建 agent group、写入路由/ACL 的风险。  
   - 对项目的影响：这是典型的“安全边界收紧”变更，提升了系统级操作的可信度。

2. **#2718 `fix(feishu): cleanup zombie active_cards when agent-runner exits abnormally`**  
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/2718>  
   - 价值：修复 Feishu 交互卡片在 agent-runner 异常退出后仍显示“运行中”的生产问题。  
   - 推进意义：补齐了异常退出路径下的清理逻辑，避免用户看到长时间悬挂的“假活跃”状态。  
   - 对项目的影响：这是面向真实生产故障的稳定性修复，能直接改善可观测性与用户信任感。

**整体推进评估：**  
今天已结束的变更数量不多，但质量较高，且集中在安全/稳定性两个关键面向。对于一个 AI Agent/个人助手框架来说，这类变更比一般功能增量更能提升项目成熟度。  
GitHub： [PR #2720](https://github.com/qwibitai/nanoclaw/pull/2720) ｜ [PR #2718](https://github.com/qwibitai/nanoclaw/pull/2718)

---

## 4) 社区热点
过去 24 小时内，Issue 侧没有新增或活跃讨论，PR 侧也没有可见的评论数/点赞数数据，**因此没有形成明显的“讨论热点”**。  
不过从变更主题看，社区协作关注点主要集中在以下方向：

- **安全与权限**：#2722、#2720  
  - 链接：<https://github.com/qwibitai/nanoclaw/pull/2722>  
  - 链接：<https://github.com/qwibitai/nanoclaw/pull/2720>  
- **文档与可定制性**：#2721  
  - 链接：<https://github.com/qwibitai/nanoclaw/pull/2721>  
- **安装/卸载与运维工具**：#2719  
  - 链接：<https://github.com/qwibitai/nanoclaw/pull/2719>  
- **模型后端兼容性**：#2717  
  - 链接：<https://github.com/qwibitai/nanoclaw/pull/2717>  

**背后诉求判断：**  
当前贡献者更关心的是“能否安全地扩展”“是否容易维护”“是否便于接入更多模型/渠道”，而不是单纯追加表层功能。  
GitHub： [Issues](https://github.com/qwibitai/nanoclaw/issues) ｜ [Pull Requests](https://github.com/qwibitai/nanoclaw/pulls)

---

## 5) Bug 与稳定性
按严重程度排序，今日值得关注的问题如下：

### 1. 高危安全问题：配对码可预测
- PR：**#2722 `fix(telegram): use CSPRNG for pairing codes and lock down store permissions`**
- 链接：<https://github.com/qwibitai/nanoclaw/pull/2722>
- 风险说明：配对码原先使用 `Math.random` 生成，可被推测；而配对码又关系到 chat 注册/owner 提升，属于明显的安全敏感面。
- 当前状态：**已有修复 PR，仍处 OPEN，建议优先处理/合并。**
- 严重度判断：**Critical**

### 2. 权限边界漏洞：`create_agent` 宿主侧未复核
- PR：**#2720 `security: authorize create_agent host-side (approval for confined groups)`**
- 链接：<https://github.com/qwibitai/nanoclaw/pull/2720>
- 风险说明：容器内授权通过后，host 侧若不再校验，存在越权落地风险，尤其影响持久化 agent group 与 ACL 写入。
- 当前状态：**已关闭，表示该安全问题已被处理或方案已收敛。**
- 严重度判断：**High**

### 3. 运行时残留状态：Feishu active card “僵尸运行中”
- PR：**#2718 `fix(feishu): cleanup zombie active_cards when agent-runner exits abnormally`**
- 链接：<https://github.com/qwibitai/nanoclaw/pull/2718>
- 风险说明：agent-runner 异常退出后，交互卡片长时间不清理，会造成用户误判任务仍在执行。
- 当前状态：**已关闭，说明该稳定性问题已有修复路径。**
- 严重度判断：**Medium**

GitHub： [Pull Requests](https://github.com/qwibitai/nanoclaw/pulls)

---

## 6) 功能请求与路线图信号
当前没有新 Issue，因此**没有来自用户侧的明确功能请求**；但从开放 PR 可以看出，路线图信号已经比较清晰：

1. **技能/文档体系升级**
   - PR：#2721  
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/2721>  
   - 信号：项目正在强化“skills-based customization”叙事，说明未来可能继续围绕可定制工作流、技能分层和贡献约束展开。

2. **运维能力补齐**
   - PR：#2719  
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/2719>  
   - 信号：`uninstall.sh` 这类能力通常意味着项目开始重视“安装后生命周期管理”，对桌面/自托管用户很重要。

3. **LLM 后端扩展**
   - PR：#2717  
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/2717>  
   - 信号：增加 Atlas Cloud 说明为 OpenAI-compatible 后端，表明项目在扩大模型适配面，后续可能继续推进更多 provider 兼容。

4. **安全治理优先级上升**
   - PR：#2722 / #2720  
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/2722> ｜ <https://github.com/qwibitai/nanoclaw/pull/2720>  
   - 信号：安全与权限已明显成为路线图中的高优先级主题，短期内可能持续出现相关修复与加固。

GitHub： [Pull Requests](https://github.com/qwibitai/nanoclaw/pulls)

---

## 7) 用户反馈摘要
过去 24 小时 **没有 Issues 更新**，因此没有可提炼的真实用户评论、使用抱怨或满意度反馈。  
从现有 PR 内容看，贡献者更像是在主动补齐用户可能感知到的问题：比如安全风险、卡片状态残留、后端兼容性和卸载体验，但这些还不是来自 Issues 的直接用户反馈。  
这意味着当前项目的反馈闭环主要依赖 PR 驱动，而不是公开 Issue 驱动。  
GitHub： [Issues](https://github.com/qwibitai/nanoclaw/issues)

---

## 8) 待处理积压
### 目前没有“长期未响应”的公开 Issue
- 过去 24 小时 Issues 更新为 0，因此数据中没有显示出明显积压的用户问题。  
- GitHub： [Issues](https://github.com/qwibitai/nanoclaw/issues)

### 但有 4 个未合并 PR 需要持续跟进
按优先级建议关注：

1. **#2722 安全修复：Telegram 配对码 CSPRNG**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/2722>
   - 优先级：**最高**
2. **#2721 文档：customizing / skills model / skill guidelines**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/2721>
   - 优先级：高
3. **#2719 安装/卸载工具：uninstall.sh**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/2719>
   - 优先级：中高
4. **#2717 文档：Atlas Cloud 作为 LLM 后端**
   - 链接：<https://github.com/qwibitai/nanoclaw/pull/2717>
   - 优先级：中

GitHub： [Pull Requests](https://github.com/qwibitai/nanoclaw/pulls)

---

### 总体结论
NanoClaw 在 2026-06-10 的状态可以概括为：**没有新增用户故障噪音，但安全与稳定性治理正在加速**。今天最有价值的信号不是新功能数量，而是高风险问题开始被系统性修补，说明项目正向更成熟的 Agent 平台形态推进。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报（2026-06-10）

## 1) 今日速览
今天 NullClaw 的仓库活跃度偏低，**过去 24 小时仅有 1 条 PR 更新、0 条 Issue 更新、0 个新版本发布**。整体来看，项目处于**小幅维护/修复推进**状态，而不是功能密集迭代阶段。当前唯一的新增动向集中在 **cron/agent 投递归因修复**，说明维护重点更偏向运行链路正确性与可观测性。  
**活跃度评估：低活跃，但健康度尚可**——没有新增问题暴露，且有针对性修复在推进。  
链接：  
- 仓库主页：https://github.com/nullclaw/nullclaw  
- PR #948：https://github.com/nullclaw/nullclaw/pull/948  

---

## 2) 版本发布
**今日无新版本发布。**  
因此暂无可分析的更新日志、破坏性变更或迁移注意事项。  
链接：  
- Releases：https://github.com/nullclaw/nullclaw/releases  

---

## 3) 项目进展
今日没有已合并或关闭的重要 PR；不过有 **1 条开放中的修复型 PR**，是当前最值得关注的进展信号：

### PR #948：fix cron agent delivery attribution
- 链接：https://github.com/nullclaw/nullclaw/pull/948  
- 作者：DonPrus  
- 状态：OPEN  
- 核心内容：
  - 将 **cron delivery origin metadata** 传递到启动的 `nullclaw agent` 子进程中，使 `agent_start` 能正确归因到投递渠道/账号。
  - 为 `nullclaw cron once-agent` 保留投递路由标记，并同步写入本地存储与 gateway `/cron/add` payload。
  - 更新 `once-agent` 相关逻辑，改善任务执行来源追踪的一致性。

### 进展解读
这类改动属于**运行时链路修正**，不是面向用户的显性功能，但对：
- 任务来源审计
- 自动化投递归因
- 后续问题排查
- 指标统计准确性

都有明显价值。  
**项目向前迈进的幅度：小但关键**，属于“把基础链路做正确”的稳健型推进。

---

## 4) 社区热点
**今日未发现活跃 Issues；PR 讨论热度也很低。**  
从给定数据看：
- Issues：0 条更新
- PR：仅 1 条更新，且未显示评论数增长
- 无明显“热门讨论”或“高反应”对象

### 目前可视为社区关注点的内容
- PR #948：https://github.com/nullclaw/nullclaw/pull/948  
  背后诉求更偏向于：
  - **任务归因准确性**
  - **cron/agent 调度链路透明度**
  - **多渠道投递场景下的追踪一致性**

由于没有评论与反应数据，这一诉求更像是维护者/贡献者推动的工程修复，而不是广泛社区争议点。  
链接：  
- Issues 列表：https://github.com/nullclaw/nullclaw/issues  
- PR #948：https://github.com/nullclaw/nullclaw/pull/948  

---

## 5) Bug 与稳定性
今日**没有新增 Issues**，因此未见公开的崩溃、回归或高优先级缺陷报告。  
按严重程度看，当前可见问题如下：

### 高严重度
- **无公开报告**  
  链接：https://github.com/nullclaw/nullclaw/issues

### 中严重度
- **无公开报告**  
  链接：https://github.com/nullclaw/nullclaw/issues

### 低严重度 / 潜在质量问题
- PR #948 所修复的问题本质上是**归因与路由元数据丢失**，虽然不一定直接导致服务不可用，但会影响：
  - 任务执行记录准确性
  - 后台审计
  - 自动化调度排障效率  
  链接：https://github.com/nullclaw/nullclaw/pull/948

### 是否已有 fix PR
- **有潜在 fix PR：#948**
- 但该 PR 目前仍为 **OPEN**，尚未合并，修复尚未最终落地。

---

## 6) 功能请求与路线图信号
今日**没有新增 Issue 形式的功能请求**，因此无法从用户提案中提炼新的需求方向。  
不过，PR #948 释放了一个较明确的路线图信号：项目后续可能持续强化 **cron/agent、投递归因、任务链路审计** 相关能力。

### 可能进入下一阶段的方向
1. **任务来源/投递渠道归因**
   - PR #948：https://github.com/nullclaw/nullclaw/pull/948  
   - 说明项目正在补齐“谁触发、从哪触发、如何投递”的链路信息。

2. **调度与自动化任务的稳定性**
   - 如果该修复合并，后续可能继续围绕 cron、once-agent、gateway payload 做一致性增强。

### 当前判断
- **没有足够证据表明有新的用户功能诉求正在排队**
- 但“调度链路可追踪性”很可能是近期开发重点之一  
链接：  
- Issues：https://github.com/nullclaw/nullclaw/issues  
- PR #948：https://github.com/nullclaw/nullclaw/pull/948  

---

## 7) 用户反馈摘要
**由于今日没有 Issues 评论数据，无法从真实用户反馈中提炼具体痛点。**  
现阶段可确认的是：
- 没有公开的新增抱怨、使用障碍或满意度反馈
- 没有评论驱动的需求收敛信号

### 结合现有 PR 可推断的隐性场景
PR #948 指向的使用场景可能包括：
- 用户通过 cron 启动 agent，希望后台能正确识别触发来源
- 需要区分不同 delivery channel/account 的执行记录
- 需要更可靠的审计和排障信息

但这些仍属于**工程推断**，不是已公开的用户评论结论。  
链接：  
- Issues：https://github.com/nullclaw/nullclaw/issues  
- PR #948：https://github.com/nullclaw/nullclaw/pull/948  

---

## 8) 待处理积压
从当前数据看，**没有已知长期未响应的重要 Issue**，也没有沉积中的关闭阻塞项。  
但有一个需要继续跟进的开放项：

### 重点待办
- **PR #948（OPEN）**：fix cron agent delivery attribution  
  - 链接：https://github.com/nullclaw/nullclaw/pull/948  
  - 价值：影响调度链路归因准确性，建议尽快评审并推进合并或补充测试。

### 积压风险评估
- **Issue 积压：低**
- **PR 积压：低**
- **维护优先级建议**：优先处理 #948，以免调度链路元数据不一致影响后续排障与统计。

---

## 总结判断
NullClaw 今日表现为**低噪声、低活跃、偏维护型**的一天：没有新增问题，也没有版本发布，但有一条围绕 cron/agent 归因的修复 PR 在推进。整体项目状态稳定，暂未显现社区压力或质量危机；下一步更值得关注的是 **#948 是否合并**，以及后续是否继续沿着“任务归因与投递链路可观测性”方向扩展。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-06-10）

## 1) 今日速览
过去 24 小时，IronClaw 维持了**高活跃度**：Issues 更新 37 条、PR 更新 45 条，但**没有新版本发布**。从内容结构看，项目重心明显集中在 **Reborn 迁移收敛、WebUI/认证稳定性、附件链路、生产可用性** 这些“底层能力补齐”上。  
整体判断：**项目推进速度快，工程面非常活跃，但仍处在大量功能补洞与架构整理阶段**，说明产品在快速演进，同时稳定性与一致性仍是主要关注点。  
- 项目主页：<https://github.com/nearai/ironclaw>

---

## 2) 项目进展
今日可见的已关闭 PR 不多，但方向很明确，主要是在做**运维兼容性修复**与**工程治理增强**：

- **#4669**：新增 `thermo-nuclear-code-quality-review` 技能  
  这是一个偏治理/评审能力的补充，强调巨型文件、抽象质量和“code judo”式重构，反映出仓库已经进入对大型模块持续瘦身和质量审查的阶段。  
  链接：<https://github.com/nearai/ironclaw/pull/4669>

- **#4651**：处理 Railway 启动命令中的占位符问题  
  修复了 Docker/平台启动参数里 `$IRONCLAW_REBORN_SERVE_HOST` 这类字面量占位符导致的启动失败，属于明确的部署可用性修复。  
  链接：<https://github.com/nearai/ironclaw/pull/4651>

此外，今天的 PR 流水显示出几个**明确的产品推进方向**，虽然多数仍在 open 状态，但已经形成了可见的功能链条：

- **附件体系重构**（`#4644` 相关：`#4654` `#4655` `#4668` `#4670`）  
  正在打通“附件格式注册表 → transcript 传引用 → bytes 落地存储 → inbound bridge”的完整链路，目标是让 Reborn 不再丢附件。  
  入口：<https://github.com/nearai/ironclaw/issues/4644>

- **项目级所有权/自动化**（`#4662` `#4663` `#4664`）  
  从“代理/用户”所有权向“项目”所有权演进，是多租户和团队协作能力的重要基础。  
  入口：<https://github.com/nearai/ironclaw/pull/4662>

- **SSO / operator auth 修正**（`#4659`、`#4658`）  
  说明 WebUI 的真实部署场景正在从单用户验证走向企业认证与权限隔离。  
  链接：<https://github.com/nearai/ironclaw/pull/4659>

- **生产态运行与存储**（`#4660`、`#4615`-`#4621`）  
  这些票据集中在 production profile、切换门禁、readiness diagnostics、回滚意识等，属于 Reborn 真正走向生产的关键路径。  
  入口：<https://github.com/nearai/ironclaw/issues/4617>

**结论：** 今日项目并非单纯“修 bug”，而是在持续推进 **Reborn 生产化、附件能力、认证/权限、项目所有权** 这四条主线。  
- 项目进展总入口：<https://github.com/nearai/ironclaw/pulls>

---

## 3) 社区热点
今日最活跃的讨论主要集中在**兼容性、迁移、生产化和产品能力补齐**四类议题。由于 PR 列表未给出明确评论数，这里以 Issues 的活跃度与问题重要性综合判断：

1. **Strict-mode provider 兼容性问题**
   - **#4642**：[bug] Strict-mode providers' null-for-unset-optionals rejected by capability-port validation  
   - 这是当前列表里唯一明确显示有评论的高关注 issue（1 条评论），且它影响“多数 first-party tools”，说明问题面较广。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4642>

2. **附件能力跨通道统一**
   - **#4644**：Universal attachments across all channels  
   - 该议题牵出了多个并行 PR（#4654/#4655/#4668/#4670），说明它已经成为一条独立技术主线，而不是单点修补。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4644>

3. **Reborn 生产切换与 readiness**
   - **#4617**-**#4621**：生产 readiness diagnostics、cutover gate、backend parity 等  
   - 这是典型的“上线前最后一公里”讨论，热度来源于风险高、依赖多。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4617>

4. **WebUI v2 E2E/Smoke 体系补齐**
   - **#4632**-**#4636**：E2E 覆盖、工具流、流式协议、管理面、SSO 等  
   - 说明社区/维护者对“真实浏览器 + 全链路”的测试缺口非常敏感。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4632>

5. **项目级所有权与多租户协作**
   - **#4628**、**#4625**、**#4657**  
   - 这些话题反映出用户不只想要“个人助手”，还想要“团队/企业协作助手”。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4628>

总体来看，今天的热点不是“争论某个 UI 细节”，而是**围绕 Reborn 是否能真正替代旧路径、是否能在企业场景稳定运行**展开。  
- 热点问题总入口：<https://github.com/nearai/ironclaw/issues>

---

## 4) Bug 与稳定性
按严重程度排序，今日暴露出的主要稳定性问题如下：

### 高严重度
1. **Strict-mode LLM provider 的空值兼容失败**
   - Issue：**#4642**
   - 问题：严格模式 provider 在未设置可选参数时会发送 `null`，但 capability-port 校验按原始 schema 拒绝，导致**大量 first-party tools 失效**。  
   - 影响：这是**平台级兼容性问题**，会直接阻断工具调用。  
   - 是否已有 fix PR：**未看到直接对应的修复 PR**。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4642>

2. **Google Calendar `list_events` 返回最旧事件、无序**
   - Issue：**#4640**
   - 问题：缺少 `timeMin` 默认值、`singleEvents` 和 `orderBy`，导致“即将到来的会议”查询返回老事件。  
   - 影响：直接损害日历类 first-party tool 的可用性，属于**核心功能错误**。  
   - 是否已有 fix PR：**未看到直接对应的修复 PR**。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4640>

### 中严重度
3. **WeChat  मिशन/提醒通知无法送达**
   - Issue：**#4612**
   - 场景：Staging 中连接 WeChat 后，定时 mission/reminder 触发但无法送达。  
   - 影响：影响消息通知链路与自动提醒体验，偏“集成故障”。  
   - 是否已有 fix PR：**未看到直接对应的修复 PR**。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4612>

### 风险提示（非典型 bug，但会影响稳定性）
4. **生产切换、readiness、回滚链路未完全闭合**
   - 相关 Issue：**#4617**-**#4621**
   - 这类问题不一定是“崩溃”，但一旦进入生产，会直接影响可恢复性和失败域控制。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4619>

---

## 5) 功能请求与路线图信号
今日出现的功能请求，已经很明显地指向下一阶段路线图：

1. **Reborn REPL 支持 Ask-gated capability approvals**
   - Issue：**#4667**
   - 说明：用户希望 REPL 也能处理 `PermissionMode::Ask` 的审批流程，而不是只支持“模型可见能力”。  
   - 路线图信号：这是**CLI/交互式 agent 生产力**的关键增强，优先级很可能不低。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4667>

2. **统一的跨线程/跨对象搜索**
   - Issue：**#4647**
   - 说明：用户希望在一个入口里搜索 threads、skills、extensions、memory。  
   - 路线图信号：这是 WebUI v2 的高价值产品能力，属于“提升留存与可发现性”的功能。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4647>

3. **全通道附件支持**
   - Issue：**#4644**
   - 说明：从“上传即丢”演进到“可持久化、可索引、可跨通道使用”。  
   - 路线图信号：已明显进入实现期，极可能进入下一版本的核心能力清单。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4644>

4. **企业多租户与共享资源**
   - Issue：**#4628**、**#4625**、**#4657**
   - 说明：管理员共享工具/技能、Slack channel 路由、Google OAuth 复用，都是企业场景刚需。  
   - 路线图信号：这些功能若继续推进，IronClaw 会从“个人 AI 助手”明显走向“组织级平台”。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4628>

5. **本地服务生命周期管理**
   - Issue：**#4598**
   - 说明：安装/启动/停止/状态支持，说明用户期待把 Reborn 当作可运维服务而非一次性命令。  
   - 路线图信号：这类能力通常会随生产化路线继续推进。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4598>

**判断：** 结合今日 open PR，**下一版本最可能纳入的主线** 是：
- 附件链路完善（#4644 系列）
- 认证/SSO/operator 权限修正（#4658/#4659）
- 生产存储与启动配置修复（#4660/#4615）
- 项目级所有权与协作模型（#4662-#4664）
- MCP 会话隔离（#4648）
- NEAR 只读扩展（#4661）

---

## 6) 用户反馈摘要
由于今日给出的数据里**没有具体评论正文**，以下总结主要基于 issue 标题与摘要所反映的真实诉求；整体上，用户反馈非常一致地指向“**功能可以更强，但不能在关键链路上丢失一致性**”。

### 主要痛点
- **工具兼容性脆弱**：严格模式 provider 一旦返回 `null`，校验就失败，用户感受到的是“工具突然不可用”。  
  链接：<https://github.com/nearai/ironclaw/issues/4642>

- **集成能力不稳定或不完整**：Google Calendar、WeChat、MCP、附件等，都体现出用户希望“接入后即可靠工作”，而不是靠手工绕开。  
  链接：<https://github.com/nearai/ironclaw/issues/4640>

- **Reborn 功能还在补齐期**：E2E、SSO、管理面、security headers、CSRF、rate limit 等都说明用户在真实部署前需要更多“可验证的安全和稳定性保证”。  
  链接：<https://github.com/nearai/ironclaw/issues/4632>

- **多租户/团队协作需求上升**：共享工具、项目级自动化、Slack 路由、Google OAuth 复用等需求，说明用户已经在拿 IronClaw 做组织协作，而不仅是个人聊天。  
  链接：<https://github.com/nearai/ironclaw/issues/4628>

### 正面信号
- 用户并不是要求“从零重做”，而是持续在现有系统上提出**补齐缺口**：这通常说明基础使用价值已经被认可。  
- 他们愿意把问题拆成明确 issue，表明项目的使用场景已经足够真实、复杂，进入了“工程化落地”阶段。  
  链接：<https://github.com/nearai/ironclaw/issues>

---

## 7) 待处理积压
由于这份数据只覆盖近 24 小时，**看不出明显的“长期沉积”老 issue**；但从重要性和依赖关系看，下面这些票据应被维护者重点盯住：

1. **Reborn 生产 readiness / cutover 栈**
   - **#4617**-**#4621**  
   - 这是生产化主线，任何延迟都会放大后续发布风险。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4617>

2. **附件系统大重构**
   - **#4644** 及其 PR 链（#4654/#4655/#4668/#4670）  
   - 这是多个模块联动的基础设施问题，建议持续跟踪，否则后续新能力会继续被“附件丢失/格式漂移”拖累。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4644>

3. **项目级所有权模型**
   - **#4662**-**#4664**  
   - 这条线决定了系统能否从个人助手扩展到团队/企业协作。  
   - 链接：<https://github.com/nearai/ironclaw/pull/4662>

4. **认证/权限一致性**
   - **#4658**、**#4659**、**#4603**  
   - 这类问题不一定“高曝光”，但一旦出错就是权限泄漏或 operator 误判。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4603>

5. **测试与 E2E 覆盖**
   - **#4632**-**#4636**  
   - 当前项目显然在补测试债，建议不要让功能扩张速度继续快过验证体系。  
   - 链接：<https://github.com/nearai/ironclaw/issues/4632>

---

## 总体判断
IronClaw 今日表现为**高吞吐、强演进、但仍处于关键工程收敛期**：  
- **优点**：PR/Issue 活跃，方向清晰，生产化与产品化都在同步推进。  
- **风险**：bug 集中在工具兼容、集成链路、认证/权限、生产切换这些“高影响面”区域。  
- **健康度结论**：**中上活跃、建设性强，但稳定性仍需持续补强**。  

如果你愿意，我还可以把这份日报再加工成：
1. **面向管理层的一页纸版本**，或  
2. **面向研发团队的行动清单版（按优先级排序）**。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报  
**日期：2026-06-10**  
**仓库：** [netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 1. 今日速览

过去 24 小时内，LobsterAI 的活跃度处于**中等偏活跃**水平：Issues 侧新增/活跃 1 条，PR 侧更新 4 条，其中 3 条已关闭或合并、1 条仍在打开状态。整体上看，项目当前的推进重点集中在**任务协作链路修复**、**数据备份/迁移相关能力收束**以及**导出/复制类体验问题修补**。  
从健康度看，项目没有新增版本发布，但代码层面的变更持续发生，说明团队仍在进行功能收口和稳定性打磨。  
当前最值得关注的是一个涉及**跨模型子任务调用机制**的开放 Issue，以及一个针对**导出与代码复制 bug** 的开放 PR，这两类问题都直接影响核心使用体验。  
综合判断：项目处于“**持续迭代、以修复和完善为主**”的阶段，而不是大规模新增功能爆发期。

---

## 3. 项目进展

今日最重要的进展集中在 3 个已关闭 PR 与 1 个仍待处理 PR 上：

### 已关闭 / 已推进的重要 PR

1. **#2134 [CLOSED] [area: renderer, area: docs, area: main] Liuzhq/task complete notice**  
   链接：[#2134](https://github.com/netease-youdao/LobsterAI/pull/2134)  
   这个 PR 重点增强了**任务完成通知**链路，核心改动包括：
   - 在主窗口关闭或销毁后，仍可通过任务完成通知恢复 LobsterAI；
   - 打开目标 Cowork 会话前，等待 renderer 通知处理器就绪；
   - 保留活动系统通知引用，改善 macOS 通知中心点击的可用性。  
   **意义：** 这类改动直接提升了“任务完成—用户感知—会话恢复”的闭环，属于协作型 AI 助手的关键体验补强。

2. **#2135 [CLOSED] [area: renderer] chore: temporary close databackup**  
   链接：[#2135](https://github.com/netease-youdao/LobsterAI/pull/2135)  
   该 PR 暂时关闭 data backup 相关能力，说明项目在备份功能上可能进行了**阶段性收束或临时回退**。  
   **意义：** 虽然看起来是“收缩”，但通常意味着维护者正在控制变更范围，优先保证主链路稳定。

3. **#2136 [CLOSED] [area: renderer, area: docs, area: main] feature: data backup and migration**  
   链接：[#2136](https://github.com/netease-youdao/LobsterAI/pull/2136)  
   该 PR 涉及**数据备份与迁移**能力，并同时覆盖 renderer、docs 和 main，说明它不只是 UI 层调整，也涉及产品使用和文档说明。  
   **意义：** 这类能力对本地 AI 工具非常关键，通常与用户数据安全、版本切换、环境迁移直接相关，是中长期可用性的重要补丁。

### 仍在推进中的 PR

4. **#2133 [OPEN] [area: renderer, area: cowork] fix: fix export and code copy bugs**  
   链接：[#2133](https://github.com/netease-youdao/LobsterAI/pull/2133)  
   该 PR 仍处于打开状态，目标是修复**导出**和**代码复制**相关 bug。  
   **意义：** 这属于直接影响日常使用效率的高频问题，若合入成功，能明显改善内容流转和结果复用体验。

### 整体推进判断

今日 PR 流水显示，项目并没有大规模新功能扩张，而是明显在做**体验修复 + 协作通知链路补强 + 数据管理能力整理**。  
从项目成熟度角度看，这是一个比较健康的信号：说明维护者在把“能用”逐步推向“更稳、更可迁移、更适合协作”。

---

## 4. 社区热点

今日没有看到高评论数或高反应数的热点项，说明社区讨论热度**不算高，但议题较集中**。  
当前最受关注的两个方向是：

### 1) 跨模型子任务调用机制
- Issue：[#2132 跨模型子任务调用的问题](https://github.com/netease-youdao/LobsterAI/issues/2132)

这条 Issue 反映了用户对“**主任务—子任务协作机制**”的明确期待：  
- 主任务负责规划、验收、监督汇报；
- 子任务负责快速执行；
- 子任务完成后应主动通知主任务；
- 若遇到卡点，也应主动对接主任务。  

**背后的诉求：** 用户不是单纯要“模型调用成功”，而是要一个真正可用的**多智能体协作闭环**。这说明 LobsterAI 的用户已经开始把它当成一个“AI 工作流系统”，而不仅仅是聊天或单任务工具。

### 2) 导出 / 代码复制稳定性
- PR：[#2133 fix export and code copy bugs](https://github.com/netease-youdao/LobsterAI/pull/2133)

这类问题虽没有热烈讨论，但属于典型的“**高频隐性痛点**”：一旦导出或代码复制失效，用户会直接感知到工作流断裂。  
**背后的诉求：** 用户希望结果可以无摩擦地被拿走、复用、迁移到外部环境中。

---

## 5. Bug 与稳定性

按严重程度排序，今日值得关注的问题如下：

### 高严重度：跨模型子任务调用异常
- Issue：[#2132 跨模型子任务调用的问题](https://github.com/netease-youdao/LobsterAI/issues/2132)
- 状态：Open
- 现状摘要：检查结果显示 `call_function_gblu0nmqpcej_1` 不在 `sessions_list` 里，也不在 `subagents` 里，疑似是**网关级函数调用**而非 `sessions_spawn` 创建的子任务。

**影响：**
- 可能导致主任务无法及时获知子任务完成状态；
- 也可能导致子任务脱离编排体系，影响监督、验收与消息回传；
- 对多智能体协作链路是核心级风险。  

**是否已有 fix PR：** 当前数据中**未看到直接对应的修复 PR**。  
链接：[#2132](https://github.com/netease-youdao/LobsterAI/issues/2132)

### 中严重度：导出与代码复制 bug
- PR：[#2133 fix export and code copy bugs](https://github.com/netease-youdao/LobsterAI/pull/2133)
- 状态：Open

**影响：**
- 导出失败会影响结果沉淀；
- 代码复制异常会影响开发者和重度用户的复用效率；
- 这类问题通常不致命，但会显著拉低使用体验。  

**是否已有 fix PR：** 是，当前已有开放 PR 在处理。  
链接：[#2133](https://github.com/netease-youdao/LobsterAI/pull/2133)

### 低到中严重度：通知恢复与会话恢复体验问题
- PR：[#2134 task complete notice](https://github.com/netease-youdao/LobsterAI/pull/2134)
- 状态：Closed

**影响：**
- 主要影响“任务完成后能否顺畅触发后续动作”；
- 对窗口关闭、macOS 通知中心点击等边缘场景尤为关键。  

**是否已有 fix PR：** 已有，且已关闭。  
链接：[#2134](https://github.com/netease-youdao/LobsterAI/pull/2134)

---

## 6. 功能请求与路线图信号

今日最明确的功能路线图信号来自 **Issue #2132**：

### 1) 跨模型子任务协作机制
- Issue：[#2132](https://github.com/netease-youdao/LobsterAI/issues/2132)

这不是单一 bug，而是对产品核心工作流的**机制级需求**。  
从描述看，用户希望系统支持：
- 主任务负责规划与监督；
- 子任务完成后自动向主任务回报；
- 子任务遇到卡点时可主动通知主任务；
- 这种机制在跨模型场景下应被正式定义并落地。

**判断：** 这类需求很可能被纳入后续版本重点，因为它直接决定 LobsterAI 是否能稳定承载“多模型协作”这一差异化卖点。

### 2) 数据备份与迁移
- PR：[#2136](https://github.com/netease-youdao/LobsterAI/pull/2136)
- PR：[#2135](https://github.com/netease-youdao/LobsterAI/pull/2135)

备份/迁移能力说明团队正在补齐本地 AI 工具的基础设施能力。  
**判断：** 如果后续稳定下来，这条线很可能成为“版本发布时的可靠性卖点”，尤其适合面向需要长期使用、跨设备迁移的用户群。

### 3) 导出与代码复制体验优化
- PR：[#2133](https://github.com/netease-youdao/LobsterAI/pull/2133)

这类修复虽然不是“新功能”，但通常会被视为下一版本的基础质量项。  
**判断：** 若该 PR 通过测试并合入，很可能进入下一轮版本包。

---

## 7. 用户反馈摘要

从当前 Issues 内容中可以提炼出较清晰的用户画像与痛点：

### 真实痛点
1. **多智能体协作不够“可控、可见、可回传”**  
   - 用户期望任务完成状态能被主任务及时感知；
   - 也期望子任务在卡点时能主动发起通知。  
   链接：[#2132](https://github.com/netease-youdao/LobsterAI/issues/2132)

2. **结果输出链路需要更稳**
   - 导出和代码复制是高频动作；
   - 一旦出错，用户会直接感觉产品“不好用”。  
   链接：[#2133](https://github.com/netease-youdao/LobsterAI/pull/2133)

3. **通知与会话恢复是协作场景中的关键体验**
   - 用户希望任务完成通知不是“看见就算”，而是能真正拉起后续会话动作；
   - 对窗口关闭、macOS 通知点击等情况也有明确需求。  
   链接：[#2134](https://github.com/netease-youdao/LobsterAI/pull/2134)

### 使用场景
- 以“主任务规划 + 子任务执行”为核心的多模型协作；
- 需要把 AI 输出持续转成可复制、可导出、可迁移的结果；
- 依赖系统通知与会话恢复来维持工作流连续性。

### 满意 / 不满意点
- **满意点：** 项目持续迭代，说明维护活跃，且正在补齐协作通知、数据迁移等关键能力；
- **不满意点：** 协作链路仍存在机制性问题，说明离“真正可靠的多智能体工作台”还有一段距离。

---

## 8. 待处理积压

当前可见的待处理项不多，但有两个值得维护者优先关注：

### 1) 开放 Issue：跨模型子任务调用问题
- 链接：[#2132](https://github.com/netease-youdao/LobsterAI/issues/2132)
- 原因：这是项目核心协作能力的机制性问题，优先级高。

### 2) 开放 PR：导出与代码复制 bug 修复
- 链接：[#2133](https://github.com/netease-youdao/LobsterAI/pull/2133)
- 原因：属于高频使用路径，建议尽快验证并合入。

### 积压判断
从时间上看，这些条目都创建于 2026-06-09，**还不属于长期积压**。  
但从产品重要性看，它们属于“**短期不老、长期影响大**”的类型，建议持续跟进，而不是等到形成历史遗留问题后再处理。

---

## 总体结论

LobsterAI 今天的动态体现出一个较健康的开源项目状态：**有持续提交、有明确修复方向、没有发布噪音、但核心协作机制仍在打磨中**。  
如果后续 `#2133` 的导出/复制修复合入，再加上 `#2132` 的跨模型子任务机制修正，项目在“可用性”和“多智能体协作可信度”上都会有比较明显的跃升。

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

# CoPaw 项目动态日报（2026-06-10）

## 1) 今日速览
过去 24 小时，仓库共出现 **24 条动态**：Issues 更新 9 条、PR 更新 15 条，并发布 **1 个新版本**。从数量上看，项目仍处于高活跃迭代期；从内容上看，讨论重点集中在 **Windows/Tauri 桌面端稳定性、渠道投递可靠性、工具调用兼容性** 这三类问题。与此同时，版本发布继续推进浏览器自动化能力和跨浏览器切换稳定性，说明项目当前是“**功能推进 + 稳定性补强**”并行。整体来看，项目健康度偏积极，但用户侧对桌面端性能与自动化链路稳定性的压力明显上升。  
链接：  
- 仓库首页：https://github.com/agentscope-ai/QwenPaw  
- 最新 Release：https://github.com/agentscope-ai/QwenPaw/releases

---

## 2) 版本发布
### 1.1.11-beta.2
已发布新版本 **1.1.11-beta.2**。从已披露的变更看，本次 release 主要包含：

- **browser_control 增强**：新增页面坐标点击支持
- **浏览器切换稳定性增强**：增加 CDP timeout 参数
- **跨浏览器切换隔离**：加入 browser profile isolation，降低切换污染风险

### 影响判断
- 这次 release 更偏向 **浏览器自动化与稳定性修复**，不是大规模架构重构。
- 在给出的 changelog 中，**未看到明确的破坏性变更（breaking change）**。
- 但由于涉及 **CDP 超时参数** 与 **profile 隔离**，建议依赖浏览器自动化的用户做一次回归验证，尤其是：
  - 多浏览器切换场景
  - 依赖既有 profile / localStorage 的流程
  - 对超时敏感的自动化任务

链接：  
- Release 列表：https://github.com/agentscope-ai/QwenPaw/releases  
- 版本相关 PR（版本号提升）：https://github.com/agentscope-ai/QwenPaw/pull/5055

---

## 3) 项目进展
今日已完成（合并/关闭）的 PR，整体把项目往两个方向推进：**稳定性增强** 与 **易用性/集成能力扩展**。

### 重点完成项
1. **E2E CI 管线补齐**
   - PR #5054：构建完整的 Playwright E2E CI 流程，接入真实后端启动、覆盖率收集和测试修复。  
   - 意义：把“可跑”推进到“可持续验证”，对桌面端和核心链路稳定性很关键。  
   链接：https://github.com/agentscope-ai/QwenPaw/pull/5054

2. **提供更低门槛的模型接入**
   - PR #5049：free models 零配置 + Provider OAuth 一键授权。  
   - 意义：明显降低新用户上手成本，是典型的增长型改进。  
   链接：https://github.com/agentscope-ai/QwenPaw/pull/5049

3. **修复 agent 广播中的 coroutine 问题**
   - PR #5048：避免 `_broadcast_to_subscribers` 中未 await 的 coroutine。  
   - 意义：这是运行时稳定性修复，直接影响消息流正确性。  
   链接：https://github.com/agentscope-ai/QwenPaw/pull/5048

4. **插件生态继续扩张**
   - PR #5043：新增 OpenSandbox 插件并接入 MCP 协议。  
   - 意义：继续加强工具生态和 MCP 集成能力。  
   链接：https://github.com/agentscope-ai/QwenPaw/pull/5043

5. **CI 资源优化**
   - PR #5056：移除冗余 channel-tests workflow。  
   - 意义：减少重复跑测，降低 CI 成本。  
   链接：https://github.com/agentscope-ai/QwenPaw/pull/5056

6. **版本链条闭合**
   - PR #5055：版本号 bump 到 v1.1.11b2，为 release 提供直接支撑。  
   链接：https://github.com/agentscope-ai/QwenPaw/pull/5055

### 综合判断
今天完成的 PR 更像是“**底座加固 + 入口降门槛 + 集成扩容**”三线并进。对项目来说，这意味着：
- 运行时错误减少
- 交付链路更可测
- 新用户接入更顺滑
- 插件/协议生态持续扩展

---

## 4) 社区热点
过去 24 小时最活跃的讨论，几乎都围绕 **桌面端体验、工具调用兼容性、Windows 路径/浏览器行为** 展开。

### 热点 1：DeepSeek 工具名校验不兼容
- Issue #5045，**3 条评论**
- 用户指出 `pat.batch_plan`、`pat.batch_grant` 这类带点号的 tool name，不符合 DeepSeek 的正则要求 `^[a-zA-Z0-9_-]+$`，导致 API 直接拒绝。  
- 背后诉求：希望框架对不同模型/Provider 的 schema 差异更具兼容性。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5045

### 热点 2：Tauri 桌面端外链和文件下载不可用
- Issue #5044，**2 条评论**
- 外部链接打不开、文件下载被静默阻止，直接影响桌面端实用性。  
- 背后诉求：桌面客户端需要像原生应用一样可靠地处理外部跳转与文件流。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5044

### 热点 3：Windows 下“打开目录”路径兼容性问题
- Issue #5042，**2 条评论**
- 无法打开 C 盘外的代码目录。  
- 背后诉求：Windows 用户希望文件系统操作对多盘符环境完全兼容。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5042

### 热点 4：OpenAI 兼容流式解析中的 tool call 覆盖
- Issue #5039，**2 条评论**
- 多个 thinking/text block 中解析出的 tool call 会互相覆盖。  
- 背后诉求：流式解析必须保证工具调用的幂等和累积正确性。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5039

### 热点结论
社区热度并不分散，而是高度集中在一个信号上：**用户越来越多地把 CoPaw 用于桌面自动化和渠道投递，因而对“底层兼容性”和“稳定性”容忍度很低。**

---

## 5) Bug 与稳定性
按严重程度排序如下：

### 高：Windows Tauri 桌面端多会话切换严重卡顿
- Issue #5053：打开 4 个会话后，来回切换卡顿超过 10 秒。  
- 影响：直接影响核心交互体验，属于明显性能回归/退化。  
- fix PR：**当前未见对应修复 PR**。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5053

### 高：WeChat 渠道定时投递失败
- Issue #5060：`to_handle_from_target` 在 `session_id` 非空时返回错误目标，导致 cron job WeChat 投递失败。  
- 影响：自动化消息链路中断，属于业务级故障。  
- fix PR：**当前未见对应修复 PR**。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5060

### 高：多轮工具调用后全部报 `unexpected keyword argument 'arguments'`
- Issue #5052：前几轮正常，后续所有工具调用失败。  
- 影响：工具执行链路不稳定，属于核心能力回归。  
- fix PR：**当前未见对应修复 PR**。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5052

### 中高：Tauri 桌面端外链打开与文件下载失效
- Issue #5044：外部链接无法打开、下载被阻止。  
- 影响：桌面端可用性和完整性明显受损。  
- fix PR：**当前未见对应修复 PR**。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5044

### 中：OpenAI-compat stream parser 中 tool call 被覆盖
- Issue #5039：多个 block 的 tool call 相互覆盖。  
- 影响：会导致推理/工具链结果错误。  
- fix PR：**当前未见对应修复 PR**。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5039

### 中：钉钉 AI Card 在空输出时仍发送空卡片
- Issue #5057：Agent 最终输出为空时，仍发送“处理中...”空卡片。  
- 影响：体验噪音和流程误导。  
- fix PR：**当前未见对应修复 PR**。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5057

### 中低：DeepSeek 对 dotted tool name 的严格校验
- Issue #5045：`pat.batch_plan`、`pat.batch_grant` 触发 DeepSeek API 拒绝。  
- 影响：特定 Provider 兼容性问题，属于跨模型适配痛点。  
- fix PR：**当前未见对应修复 PR**。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5045

### 中低：Windows “Open Directory” 无法打开非 C 盘路径
- Issue #5042：多盘符环境下打不开目录。  
- 影响：Windows 文件操作兼容性不足。  
- fix PR：**当前未见对应修复 PR**。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5042

### 中低：Windows Tauri 桌面端启动过慢
- Issue #5047：启动从 1-2 分钟变成十几分钟，且偶发无响应。  
- 影响：影响首次使用和日常启动。  
- fix PR：**当前未见对应修复 PR**。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5047

---

## 6) 功能请求与路线图信号
今天的“纯新功能诉求”不算多，更多是稳定性与兼容性问题；但从已完成/在研 PR 里，路线图信号很明确：**降低接入门槛、增强插件化、强化多渠道/多模型能力**。

### 明显的路线图信号
1. **零配置接入与一键授权**
   - PR #5049：free models 零配置 + OAuth 一键认证  
   - 解读：这是面向增长和新用户留存的关键方向。  
   链接：https://github.com/agentscope-ai/QwenPaw/pull/5049

2. **插件系统清理与优先级重排**
   - PR #5046：tool cards plugin system clean  
   - 解读：说明项目正在梳理内建插件与外部插件的覆盖关系，未来可能继续扩展“卡片/工具渲染”体系。  
   链接：https://github.com/agentscope-ai/QwenPaw/pull/5046

3. **MCP / OpenSandbox 继续扩展**
   - PR #5043：OpenSandbox plugin with MCP protocol  
   - 解读：生态整合方向清晰，后续可能继续补充更多 MCP 工具/协议。  
   链接：https://github.com/agentscope-ai/QwenPaw/pull/5043

4. **测试覆盖和多 agent 管理**
   - PR #5058：channel layer + multi-agent management 集成测试  
   - 解读：这是为后续功能扩展做“地基”，通常意味着下一版本会更依赖这些基础能力。  
   链接：https://github.com/agentscope-ai/QwenPaw/pull/5058

### 结合当前态势的版本判断
如果按当前节奏推进，**下一版本/下一个 beta** 很可能优先吸收：
- Provider / OAuth / free model 的接入体验优化
- 插件系统与工具卡片体系梳理
- MCP 生态扩展
- 浏览器自动化与桌面端稳定性修复

---

## 7) 用户反馈摘要
从 Issues 评论和描述里，可以提炼出几类非常真实、且重复出现的用户痛点：

### 1. 用户希望“开箱即用”，不想配置太多
- 相关：#5049  
- 反馈信号：用户对 **零配置模型**、**一键 OAuth** 的接受度高，说明“降低门槛”是强需求。  
链接：https://github.com/agentscope-ai/QwenPaw/pull/5049

### 2. 桌面端被当作主力工作台使用，但稳定性还不够
- 相关：#5053、#5047、#5044  
- 反馈信号：用户不是把它当 demo，而是当成高频工作台；因此对 **启动速度、Tab 切换、外链、下载** 很敏感。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5053  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5047  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5044

### 3. 自动化投递链路要求“绝对稳定”
- 相关：#5060、#5057  
- 反馈信号：WeChat / DingTalk 这类渠道经常承载定时任务，一旦目标映射或空输出处理不严谨，就会直接破坏业务流程。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5060  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5057

### 4. 多模型兼容性是硬需求，不是加分项
- 相关：#5045  
- 反馈信号：不同模型对 tool schema 的严格程度不同，框架必须尽量“向下兼容”而非假设统一行为。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5045

### 5. 用户愿意接受更强能力，但前提是“不要破坏现有链路”
- 相关：#5039、#5052  
- 反馈信号：工具调用解析、stream parser、长期会话稳定性，是核心信任基础。  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5039  
链接：https://github.com/agentscope-ai/QwenPaw/issues/5052

---

## 8) 待处理积压
以下是截至日报时仍值得维护者优先关注的 **高价值待处理项**（包含开放 Issue 与开放 PR）：

### 优先级最高的用户侧问题
1. **Windows Tauri 多会话卡顿**
   - #5053  
   - 影响广、主观感知强，建议优先排查渲染/状态同步/缓存策略。  
   链接：https://github.com/agentscope-ai/QwenPaw/issues/5053

2. **WeChat 渠道 cron 投递失败**
   - #5060  
   - 属于自动化任务“失效”级别问题，优先级应很高。  
   链接：https://github.com/agentscope-ai/QwenPaw/issues/5060

3. **工具调用若干轮后全部失败**
   - #5052  
   - 对模型工具链是核心打击，建议优先定位 state pollution / wrapper 兼容性。  
   链接：https://github.com/agentscope-ai/QwenPaw/issues/5052

### 需要尽快审查的开放 PR
4. **Open Sandbox / Matrix / 桌面端修复类 PR**
   - #5059：https://github.com/agentscope-ai/QwenPaw/pull/5059  
   - #5051：https://github.com/agentscope-ai/QwenPaw/pull/5051  
   - 这两项都偏“基础能力/桌面体验”，值得尽快 review。

5. **插件系统与测试基础设施 PR**
   - #5046：https://github.com/agentscope-ai/QwenPaw/pull/5046  
   - #5058：https://github.com/agentscope-ai/QwenPaw/pull/5058  
   - 这类 PR 会影响后续扩展效率和发布稳定性。

6. **历史兼容性与稳健性修复 PR**
   - #5041：https://github.com/agentscope-ai/QwenPaw/pull/5041  
   - #5040：https://github.com/agentscope-ai/QwenPaw/pull/5040  
   - #5038：https://github.com/agentscope-ai/QwenPaw/pull/5038  
   - #5037：https://github.com/agentscope-ai/QwenPaw/pull/5037

### 建议的处理顺序
- 先处理 **会影响真实任务结果** 的问题：#5060、#5052、#5039  
- 再处理 **桌面端核心体验**：#5053、#5044、#5047  
- 最后推进 **插件/测试/生态类 PR**：#5058、#5046、#5059

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合直接发群里的精简版**  
2. **适合邮件/周报系统的正式版**  
3. **带风险分级和负责人建议的管理层版**

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-06-10）

## 1. 今日速览
过去 24 小时，ZeroClaw 处于**高活跃度**状态：共更新 **7 条 Issues**、**22 条 PR**，但**暂无新版本发布**。从节奏看，项目明显处在“**密集修复 + 架构演进**”阶段，主题集中在 agent turn loop、provider 兼容性、runtime/tool、gateway/security 和 plugin 扩展。  
PR 侧 **19 条待合并、3 条已合并/关闭**，说明提交速度快于收敛速度，短期内审阅与集成压力偏大。整体健康度仍然不错，但高风险变更较多，后续需要更强的维护者审阅与回归测试支撑。  
相关总览：  
- Issues：<https://github.com/zeroclaw-labs/zeroclaw/issues>  
- PRs：<https://github.com/zeroclaw-labs/zeroclaw/pulls>

---

## 2. 版本发布
今日**无新版本发布**。  
- Releases：<https://github.com/zeroclaw-labs/zeroclaw/releases>

---

## 3. 项目进展
今日已关闭/收尾的变更中，最有价值的是两类“基础设施修复”：

- **#7422 / #7425 相关的 web_fetch 与计费修复收口**
  - `fix(web_fetch)`：允许 `allowed_private_hosts = ["*"]` 覆盖 DNS 解析到的私网主机，减少 Web Fetch 安全策略误伤。
  - `fix(runtime)`：修正 channel 价格查找逻辑，避免 `cost_usd = 0` 导致预算控制失效。  
  链接：  
  - <https://github.com/zeroclaw-labs/zeroclaw/pull/7422>  
  - <https://github.com/zeroclaw-labs/zeroclaw/pull/7425>

- **整体推进方向**
  - 项目正从“功能可用”向“**稳定性、权限边界、可扩展性**”演进。
  - 今日新增/更新的 PR 大量集中在 runtime、agent、provider、gateway、安全与 CI，说明核心链路正在被系统性加固。  
  PR 总体入口：<https://github.com/zeroclaw-labs/zeroclaw/pulls>

> 注：数据中显示今日有 3 条 PR 已合并/关闭，但当前摘要仅展示了 2 条已关闭项；另一条未在给定列表中展开。

---

## 4. 社区热点
> 说明：你提供的数据里**Issue 评论数可见**，但 PR 评论数未给出，因此这里按“公开讨论热度 + 议题影响面”综合判断。

### 最活跃 Issue
- **#7415 — RFC: Unify the three agent turn engines**  
  评论数：1（当前 Issues 中最高）  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7415>  
  热点原因：  
  - 触及 agent 核心执行循环，属于**架构级重构**。
  - 涉及 `run_tool_call_loop + turn_streamed + Agent::turn` 三套实现统一，容易引发兼容性与行为一致性讨论。
  - 这类 RFC 往往会牵动运行时安全、工具调用保护和维护成本问题。

### 高关注路线图/争议主题
- **#7432 — v0.9.0 auth / security / gateway / breaking-change tracker**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7432>  
  背后诉求：用户和维护者都在推动更严格的鉴权、隔离与网关边界，说明项目正在进入“多租户/多主体”安全加固阶段。

- **#7420 — Native Dynamic-Library Plugin System**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7420>  
  背后诉求：社区对扩展性和插件化有强需求，希望减少单体扩展成本，增强运行时可插拔能力。

- **#7431 — Pre-turn routing intent extraction**  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7431>  
  背后诉求：希望系统能从自然语言中自动识别路由意图，减少用户显式配置 `send_via` 的门槛。

### 近期高影响 PR（评论数未披露，但变更面广）
- **#7442 — parallel SubAgents / Delegates return reliably**  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/7442>
- **#7430 — daemon registry 重构**  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/7430>
- **#7429 — 引入 wasmtime 依赖，为插件体系铺路**  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/7429>

---

## 5. Bug 与稳定性
按严重程度排序如下：

### S1 / workflow blocked
1. **#7439 — Custom provider 导致 Doctor 报错：`model_provider "custom.<alias>" is invalid`**  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7439>  
   影响：自定义 provider 在 Agent 中可用，但 Doctor 校验失败，直接影响配置验证链路。  
   **已有修复 PR：#7441**  
   <https://github.com/zeroclaw-labs/zeroclaw/pull/7441>

2. **#7421 — Postgres memory backend 初始化失败**  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7421>  
   影响：`i64` 与 Postgres `int4` 序列化不匹配，属于典型的初始化阻断问题。  
   **当前未见对应修复 PR**

### S2 / degraded behavior
3. **#7436 — `image_info` 工具输出在很多常见情况下到不了 vision 模型**  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7436>  
   影响：相对路径、workspace-relative 等常见调用形态下会静默丢失图像信息，影响多模态体验。  
   **当前未见对应修复 PR**

### 高风险 / 安全与兼容性
4. **#7424 — `web_fetch.allowed_private_hosts = ["*"]` 对 DNS 解析私网主机覆盖不完整**  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7424>  
   影响：可能导致安全策略与用户预期不一致，属于高风险配置边界问题。  
   **已有修复 PR：#7424（open）**

5. **#7419 — 不可用 fallback provider 需要明确失败，而不是静默降级**  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7419>  
   影响：涉及 provider 安全与可观测性，避免错误 fallback 掩盖真实故障。  
   **已有修复 PR：#7419（open）**

6. **#7418 — OpenCode Zen 的 `wire_api = "responses"` 未被正确尊重**  
   链接：<https://github.com/zeroclaw-labs/zeroclaw/pull/7418>  
   影响：兼容性 bug，可能导致请求被错误路由到 chat-completions 路径。  
   **已有修复 PR：#7418（open）**

### 已收口的稳定性问题
- **#7425** 计费/预算跟踪修复已关闭：<https://github.com/zeroclaw-labs/zeroclaw/pull/7425>  
- **#7422** Web Fetch 私网主机策略修复已关闭：<https://github.com/zeroclaw-labs/zeroclaw/pull/7422>

---

## 6. 功能请求与路线图信号
今日新增/活跃的功能请求，明显指向下一阶段的路线图：

### 最可能进入下一版本的方向
1. **Agent turn engine 统一化**
   - Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7415>  
   这是核心执行链路重构，优先级很高，且直接影响工具调用一致性、安全保护和维护成本。

2. **v0.9.0 安全 / 鉴权 / 网关 / breaking-change 队列**
   - Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7432>  
   这基本可以视为下一版本的“硬路线图”，大概率会持续吸纳安全相关改动。

3. **原生动态库插件系统**
   - Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7420>  
   再结合 PR **#7429 wasmtime**：<https://github.com/zeroclaw-labs/zeroclaw/pull/7429>  
   说明插件化方向已从概念讨论进入工程落地准备期。

4. **自然语言路由意图抽取**
   - Issue：<https://github.com/zeroclaw-labs/zeroclaw/issues/7431>  
   若能与现有 `send_via` 机制结合，会显著改善可用性，尤其适合多渠道/多入口场景。

### 可能进入“技术债清理”队列的信号
- **#7427 — `context_aware_tools` 已配置但未实现**
  <https://github.com/zeroclaw-labs/zeroclaw/pull/7427>
- **#7426 — `rerank_enabled` 已配置但未实现**
  <https://github.com/zeroclaw-labs/zeroclaw/pull/7426>

这类 PR 说明项目正在主动清理“文档已暴露、运行时未生效”的配置债务，通常是版本前整顿的前兆。

---

## 7. 用户反馈摘要
从 Issues 的描述里，可以提炼出几类真实痛点：

### 1) 配置与诊断工具不一致
- **#7439** 表明用户希望 Doctor 能准确理解自定义 provider 配置，而不是误报无效。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7439>

### 2) 多模态工具链存在路径敏感问题
- **#7436** 说明用户在真实工作流中并不总是使用绝对路径；工具必须适配相对路径、workspace 路径和其他常见输入形态。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7436>

### 3) 后端存储初始化需要更强的兼容性
- **#7421** 反映出内存/会话后端在 Postgres 集成上仍有类型兼容问题，属于阻断级体验。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7421>

### 4) 渠道与交互体验正在被强烈打磨
- **#7437**：WeChat 需要支持 streaming chat response  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/7437>
- **#7438**：Telegram 的 delivery prompt 不应抑制工具使用  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/7438>

这类反馈说明用户对“能跑”已经不满足，更关注**不同渠道上的一致交互体验**和**模型行为可控性**。

### 5) 路由与自动化诉求增强
- **#7431** 的 intent extraction 需求表明，用户希望系统减少显式配置成本，让 agent 更“懂”任务意图。  
  链接：<https://github.com/zeroclaw-labs/zeroclaw/issues/7431>

---

## 8. 待处理积压
> 说明：当前仅提供近 24 小时数据，**无法严格判断“长期未响应”**。下面列出的是**优先级高、但仍处于 open/pending 的积压项**，建议维护者优先关注。

### 高优先级 Issue
- **#7415** RFC：统一三套 agent turn engine  
  <https://github.com/zeroclaw-labs/zeroclaw/issues/7415>
- **#7432** v0.9.0 auth/security/gateway tracker  
  <https://github.com/zeroclaw-labs/zeroclaw/issues/7432>
- **#7420** 原生动态库插件系统 RFC  
  <https://github.com/zeroclaw-labs/zeroclaw/issues/7420>
- **#7421** Postgres memory backend 初始化失败  
  <https://github.com/zeroclaw-labs/zeroclaw/issues/7421>
- **#7439** Custom provider Doctor 校验错误  
  <https://github.com/zeroclaw-labs/zeroclaw/issues/7439>
- **#7436** image_info 多模态信息丢失  
  <https://github.com/zeroclaw-labs/zeroclaw/issues/7436>

### 高风险待审 PR
- **#7442** parallel SubAgents / Delegates  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/7442>
- **#7430** daemon registry 重构  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/7430>
- **#7429** 引入 wasmtime  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/7429>
- **#7441** Doctor 自定义 provider 校验修复  
  <https://github.com/zeroclaw-labs/zeroclaw/pull/7441>

---

## 总体判断
ZeroClaw 今天的状态可以概括为：**活跃、工程密度高、方向清晰，但审阅与收敛压力也同步上升**。  
当前最值得关注的是三条主线：

1. **Agent 核心执行链路重构**  
2. **安全 / 鉴权 / 网关边界加强**  
3. **插件化与运行时扩展能力建设**

如果这些高风险 PR 能在接下来几天内稳步收敛，项目会进入一个更成熟、更可扩展的阶段。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*