# OpenClaw 生态日报 2026-09-22

> Issues: 5 | PRs: 50 | 覆盖项目: 13 个 | 生成时间: 2026-09-22 03:50 UTC

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

# OpenClaw 项目动态日报 — 2026-09-22

## 1. 今日速览

OpenClaw 今日活跃度很高：过去 24 小时内有 **5 条 Issue 更新**、**50 条 PR 更新**，并发布了 **1 个 extended-stable 版本**。PR 侧以稳定性、权限边界、会话/历史同步、CI 性能和模型提供商支持为主，说明项目当前处于高强度修复与发布稳定化阶段。  
Issue 侧没有关闭项，新增反馈集中在 **升级失败、Claude CLI 会话状态污染、Codex final-answer 恢复失败、会话层级管理** 等实际使用问题。整体看，项目维护节奏非常快，但待合并 PR 数量达到 **39 个**，其中不少涉及安全边界、兼容性和可用性，需要维护者重点把控回归风险。

---

## 2. 版本发布

### v2026.7.35 — `extended-stable` 网关专用稳定版

- Release：[`v2026.7.35`](https://github.com/openclaw/openclaw/releases/tag/v2026.7.35)
- 标题：`openclaw 2026.7.35`
- 类型：**gateway-only extended-stable release**
- 当前说明：这是 OpenClaw 当前等价于 LTS 的 `extended-stable` 发布分支，基于 **2026 年 7 月底的 OpenClaw**，并向后移植关键修复。

#### 主要更新方向

根据 Release 描述，本版本包含：

- 关键安全更新
- 可靠性修复
- 性能修复
- 新模型支持
- Gateway 相关稳定性改进

#### 与 latest 分支关系

Release 文本提到当前最新 OpenClaw 版本为 **2026.9.5**，而本次 `v2026.7.35` 面向的是更保守的 extended-stable 用户，适合不希望快速跟随 2026.9.x 版本线、但需要安全和稳定性补丁的部署环境。

#### 破坏性变更

从提供的数据看，未明确标注 breaking change。由于该版本为 extended-stable，理论上应避免引入高风险行为变更；但由于包含安全、可靠性和模型支持更新，仍建议生产环境先在 staging 环境验证。

#### 迁移注意事项

建议维护者和用户关注：

1. **Gateway-only 范围**：该版本主要面向 Gateway，不应默认期待完整客户端/全组件同步升级。
2. **与 2026.9.x 的差异**：如果已运行 `2026.9.4` 或 `2026.9.5`，该 release 不是常规“升级目标”，而是稳定分支更新。
3. **升级前备份状态与配置**：今日已有升级失败报告出现，尤其应关注状态迁移与回滚路径。
4. **模型支持变更**：如依赖特定模型 provider，应验证 provider preset、tool calling、reasoning history 等行为。

---

## 3. 项目进展

过去 24 小时内 PR 更新达到 **50 条**，其中 **11 条已合并或关闭**，**39 条仍待处理**。由于数据中只标注为 `CLOSED`，未区分 merged 与 closed without merge，以下按“已关闭/完成处理”归纳。

### 重要已关闭 PR

#### 1. Doctor deferral 测试去重，降低 CI 耗时

- PR：[#155372](https://github.com/openclaw/openclaw/pull/155372) — `test: avoid duplicate runtime loading in Doctor deferral tests`
- 作者：steipete
- 状态：Closed
- 影响范围：commands / Doctor / CI
- 摘要：修复 plugin-migration deferral fixture 在测试中重复转换真实 Doctor binding-repair 依赖树的问题。此前相关 CI 用例耗时可达 **41 秒以上**。
- 项目推进：提升测试效率，减少 CI 长尾任务，有助于加快 PR 验证速度。

#### 2. Skills library 文件限制校验强化

- PR：[#154793](https://github.com/openclaw/openclaw/pull/154793) — `fix(skills): enforce library limits when files change`
- 作者：steipete
- 状态：Closed
- 影响范围：CLI / skills
- 摘要：修复 skills-library CLI 在文件发生 TOCTOU 式变化时可能接受超大或被替换输入的问题。
- 用户影响：`create`、`update`、`import` 会继续强制执行文档中的限制：
  - 单文件 1 MiB
  - bundle 8 MiB
  - 最多 256 个文件
- 项目推进：提升 CLI 输入校验一致性和安全性。

#### 3. Stop 延迟响应绑定原始聊天

- PR：[#154805](https://github.com/openclaw/openclaw/pull/154805) — `fix(ui): keep delayed Stop responses with their original chat`
- 作者：steipete
- 状态：Closed
- 影响范围：Web UI
- 摘要：修复延迟到达的 Stop 失败响应可能覆盖新聊天或新 run 的问题。
- 用户影响：Stop 操作反馈会保留在发起该操作的原始 chat/run 上，避免跨会话污染。
- 项目推进：改善多聊天、多代理切换时的状态一致性，是用户体验稳定性的重要修复。

#### 4. 启动迁移时减少重复 SQLite 扫描

- PR：[#155386](https://github.com/openclaw/openclaw/pull/155386) — `fix: avoid a duplicate SQLite scan when startup claims migrations`
- 作者：fuller-stack-dev
- 状态：Closed
- 影响范围：commands / SQLite migration
- 摘要：修复启动发现需要 migration 并立即获取 migration lease 时发生额外全库扫描的问题。
- 用户影响：在 schema 未变且无竞争的 checkpoint 路径上减少一次完整 SQLite scan。
- 项目推进：改善启动性能，尤其对大规模本地状态或长期运行实例更有意义。

#### 5. CI Gateway 测试成本重新计权

- PR：[#154959](https://github.com/openclaw/openclaw/pull/154959) — `fix(ci): account for isolated Gateway test cost`
- 作者：steipete
- 状态：Closed
- 影响范围：CI / Gateway tests
- 摘要：修正 isolated Gateway 测试族的耗时估算。此前某 compact PR job 预测 357 秒，实际耗时达 1,245 秒。
- 项目推进：CI 调度更准确，减少超时和队列阻塞，有助于维持高 PR 吞吐。

### 待合并但进展显著的关键 PR

#### 1. 会话 owner 可回答自身 agent 问题

- PR：[#155335](https://github.com/openclaw/openclaw/pull/155335) — `fix(gateway): let session owners answer their agent's questions`
- 状态：Open
- 标签：security-boundary / availability / needs proof
- 影响：Gateway 权限模型
- 重要性：高。该 PR 解决 session-scoped 用户能运行 agent，但无法接收或回答其普通问题的问题。
- 风险：涉及安全边界与可用性，需要额外 proof。

#### 2. 保持 live replies 在 history refresh 中可见

- PR：[#155404](https://github.com/openclaw/openclaw/pull/155404) — `fix(ui): keep live replies visible during history refreshes`
- 状态：Open
- 标签：P1 / proof sufficient / ready for maintainer look
- 影响：Web UI 聊天历史与实时回复
- 重要性：高。修复延迟 history 响应抹掉新 live reply、tool activity 和 Stop button 的问题。
- 可能性：已有 proof sufficient，且为 P1，较可能较快进入合并队列。

#### 3. Xiaomi MiMo V2.6 模型支持

- PR：[#155409](https://github.com/openclaw/openclaw/pull/155409) — `feat(xiaomi): support MiMo V2.6 models`
- 状态：Open
- 影响：模型 provider / agents
- 新增：
  - `xiaomi/mimo-v2.6-pro`
  - `xiaomi/mimo-v2.6-flash`
  - `xiaomi/mimo-v2.6-ultraspeed`
- 重要性：中高。体现 OpenClaw 持续扩展模型生态。

#### 4. 自然语言 intent matching 与 slash discovery

- PR：[#155405](https://github.com/openclaw/openclaw/pull/155405) — `feat(tui): add natural language intent matching and keyword slash discovery`
- 状态：Open
- 标签：compatibility / needs proof
- 影响：TUI 交互体验
- 用户价值：用户无需记住精确 slash command，可用自然语言表达“重置聊天、切换模型、查看 token 用量”等意图。
- 风险：兼容性与误触发风险需要验证。

---

## 4. 社区热点

> 注：提供的数据中 PR 评论数显示为 `undefined`，Issue 评论数较低，因此以下热点主要依据 Issue 评论数、PR 风险标签、P1/P2 优先级、影响范围与更新频率综合判断。

### 1. 升级失败：`state-migrated-no-rollback`

- Issue：[#155406](https://github.com/openclaw/openclaw/issues/155406) — `Update failure: state-migrated-no-rollback (2026.9.4)`
- 作者：Loganwoooof
- 评论：2
- 平台：darwin/arm64
- OpenClaw 版本：2026.9.4
- Node：26.6.0

#### 背后诉求

用户在升级过程中遇到状态迁移后无法回滚的问题，这类问题对个人 AI 助手/agent 工具尤其敏感，因为本地会话、配置、模型 provider 状态和历史记录都可能受到影响。

#### 相关 PR

- [#155389](https://github.com/openclaw/openclaw/pull/155389) — `fix(update): report deferred repairs as warnings and clear resolved notices`

该 PR 修复 update repair 在 Doctor maintenance 拒绝时失败的问题，并将 deferred repairs 作为 warning 处理。虽然未明确声明直接修复 #155406，但属于同一升级/修复链路，值得关联排查。

---

### 2. Claude CLI session `modelProvider` 持久化错误

- Issue：[#155397](https://github.com/openclaw/openclaw/issues/155397) — `[Bug]: Claude CLI turns persist session modelProvider as claude-cli`
- 作者：hannnnn-l
- 评论：1

#### 问题概述

Claude CLI backend 的任意 user turn 后，session entry 的 `modelProvider` 被持久化为 backend id `claude-cli`，而不是 canonical provider `anthropic`，导致 doctor 在每次 turn 后反复重新标记 session。

#### 背后诉求

用户希望 backend 实现细节不要污染面向用户和诊断系统的 canonical provider 状态。这反映 OpenClaw 多 provider、多 backend 抽象层需要更强一致性。

#### 当前 fix PR

数据中未看到明确关联该 Issue 的 PR。建议维护者优先确认是否需要在 provider canonicalization 或 doctor 诊断路径补测试。

---

### 3. Codex final-answer recovery 中 `provenance_rejected`

- Issue：[#155396](https://github.com/openclaw/openclaw/issues/155396) — `[Bug]: Ordinary Codex tool turns can fail closed on provenance_rejected during final-answer recovery`
- 作者：Lidashi1025
- 评论：1

#### 问题概述

在 OpenClaw 2026.9.5 managed Codex harness 下，普通 Codex tool turn 已完成，但 final-answer recovery 阶段因为 `provenance_rejected` 失败关闭，最终只暴露通用失败而非实质回答。

#### 背后诉求

用户期望工具调用已产生的有效答案不会在恢复阶段丢失。对于 agent 工具链而言，“完成但最后展示失败”是高挫败感问题。

#### 相关 PR

可能相关但未明确直接修复：

- [#155353](https://github.com/openclaw/openclaw/pull/155353) — `fix(codex): keep native children accessible after automatic completion`
- [#155358](https://github.com/openclaw/openclaw/pull/155358) — `fix: honor sandbox requirements for native forks`
- [#154728](https://github.com/openclaw/openclaw/pull/154728) — `fix(agents): keep proven completions over later queue timeouts`

尤其 #154728 的“proven completions 优先于后续 timeout 观察”与“已完成结果不应被后续状态覆盖”的方向相近，值得维护者交叉验证。

---

### 4. 最高 effort 设置的视觉增强

- Issue：[#155399](https://github.com/openclaw/openclaw/issues/155399) — `[Feature]: Colour and animate the highest effort settings`
- PR：[#155402](https://github.com/openclaw/openclaw/pull/155402) — `feat: colour and animate the highest effort settings`

#### 背后诉求

用户希望 Control UI 中 Maximum 和 Ultra reasoning effort 能有更明确视觉区分，而不是保持灰色。该需求已经快速进入 PR，显示 UI/UX 小改进响应速度较快。

---

### 5. 会话层级 reparent / move

- Issue：[#155410](https://github.com/openclaw/openclaw/issues/155410) — `Feature request: ability to reparent / move a session in the sidebar hierarchy`
- 作者：jcstrong
- 评论：0

#### 背后诉求

当前 sidebar 会话层级来自 spawn lineage，fork/spawn 后父子关系似乎不可变。用户希望能将已有 session 移动到其他 parent，或提升为顶层 session。

#### 产品信号

这说明 OpenClaw 用户已经在进行复杂、多分支、多任务会话管理。随着 agent 工作流增多，会话树从“历史记录”逐渐变成“任务组织系统”，后续可能需要 session taxonomy、drag-and-drop、manual grouping、workspace 等能力。

---

## 5. Bug 与稳定性

### 严重程度：高

#### 1. 升级失败且状态已迁移无法回滚

- Issue：[#155406](https://github.com/openclaw/openclaw/issues/155406)
- 严重程度：高
- 影响范围：升级流程、状态迁移、回滚
- 平台：darwin/arm64
- 版本：2026.9.4
- 状态：Open
- 是否已有 fix PR：未看到明确关联 PR；[#155389](https://github.com/openclaw/openclaw/pull/155389) 可能相关

风险在于升级失败发生在 state migration 之后，可能导致用户无法无损退回旧版本。建议维护者优先确认 migration transaction、rollback marker、Doctor repair 和 backup 策略是否覆盖该路径。

---

#### 2. Codex tool turn 已完成但 final answer recovery 失败

- Issue：[#155396](https://github.com/openclaw/openclaw/issues/155396)
- 严重程度：高
- 影响范围：Codex extension、managed harness、final-answer recovery
- 状态：Open
- 是否已有 fix PR：未见明确 fix PR；可能与 [#154728](https://github.com/openclaw/openclaw/pull/154728)、[#155353](https://github.com/openclaw/openclaw/pull/155353) 的完成态保护问题相关

核心风险是用户的有效结果被恢复流程覆盖为通用失败，影响信任度和可解释性。

---

#### 3. 会话 owner 无法回答自身 agent 普通问题

- PR：[#155335](https://github.com/openclaw/openclaw/pull/155335)
- 严重程度：高
- 影响范围：Gateway 权限、session-scoped users、agent Q&A
- 状态：Open
- 标签：security-boundary / availability / needs proof

虽然这是 PR 而非今日 Issue，但它修复的是实际权限可用性问题。当前风险是 session owner 可以运行 agent，却缺少回答 agent 普通问题的权限，导致工作流中断。

---

### 严重程度：中高

#### 4. Claude CLI provider 状态污染导致 Doctor 重复报警

- Issue：[#155397](https://github.com/openclaw/openclaw/issues/155397)
- 严重程度：中高
- 影响范围：Claude CLI backend、session persistence、Doctor
- 状态：Open
- 是否已有 fix PR：未看到明确 PR

该问题不一定导致核心功能不可用，但会造成 Doctor 持续重复提示，降低诊断系统可信度。

---

#### 5. Live reply 被 history refresh 覆盖

- PR：[#155404](https://github.com/openclaw/openclaw/pull/155404)
- 严重程度：中高
- 影响范围：Web UI、实时回复、工具活动、Stop button
- 状态：Open
- 标签：P1 / proof sufficient / ready for maintainer look

该 PR 已有充分 proof，建议优先合入。它解决的是前端状态竞争：较旧的 history response 覆盖较新的 live state。

---

#### 6. Native subagents 完成后仍显示 running

- PR：[#155408](https://github.com/openclaw/openclaw/pull/155408)
- 严重程度：中
- 影响范围：任务面板、conversation activity、native subagents
- 状态：Open

用户影响是已完成子任务仍显示为运行中，造成任务状态误导。该 PR 修复后，completed children 会立即从 ongoing activity 中消失，并向 Tasks panel 发送最终状态。

---

#### 7. Setup 成功 probe 后仍误报 activation failure

- PR：[#155407](https://github.com/openclaw/openclaw/pull/155407)
- 严重程度：中
- 影响范围：inference setup、provider activation、config reload
- 状态：Open

该 PR 修复成功模型探测后，由于 probe runtime 仍保留 plugin work，config reload 期间误报 activation failure 并回滚的问题。

---

### 严重程度：中

#### 8. Geolocation cache 写入失败导致 lookup 不可用

- PR：[#154569](https://github.com/openclaw/openclaw/pull/154569)
- 状态：Open
- 标签：proof sufficient / ready for maintainer look
- 影响：geolocation plugin
- 说明：修复多个 Gateway 并发写同一 cache staging file 或数据库无法保存时，lookup 直接失败的问题。修复后已验证下载可在内存中继续使用。

---

#### 9. Helper-tool download Content-Length 校验误拒

- PR：[#154676](https://github.com/openclaw/openclaw/pull/154676)
- 状态：Open
- 标签：ready for maintainer look
- 影响：agents / helper tool installation
- 说明：修复合法 encoded transfer 的下载响应因 Content-Length 指向 encoded bytes 而被拒的问题。

---

#### 10. Crabbox 安装中过度 buffering release archives

- PR：[#154622](https://github.com/openclaw/openclaw/pull/154622)
- 状态：Open
- 标签：proof sufficient / ready for maintainer look
- 影响：Crabbox extension、Gateway
- 说明：减少 release archive 下载时内存占用，并避免 HTTP await 后 staging-directory pathname 被替换的风险。

---

## 6. 功能请求与路线图信号

### 1. 会话可重组：reparent / move session

- Issue：[#155410](https://github.com/openclaw/openclaw/issues/155410)
- 当前状态：Open
- 路线图信号：强

用户希望突破 spawn lineage 的不可变层级，手动整理 sidebar session hierarchy。这表明 OpenClaw 的会话管理正在从简单线性历史走向更复杂的 agent workspace。若后续加入拖拽、手动分组、顶层/子层切换，将显著改善长期项目管理体验。

---

### 2. 高 reasoning effort 的 UI 动效与视觉强调

- Issue：[#155399](https://github.com/openclaw/openclaw/issues/155399)
- PR：[#155402](https://github.com/openclaw/openclaw/pull/155402)
- 当前状态：PR Open
- 纳入下一版本可能性：较高

该需求已经有对应实现 PR，且影响面相对局部，较可能进入近期版本。它反映用户希望不同 reasoning effort 档位在 UI 中更有感知，而不是仅靠文字区分。

---

### 3. TUI 自然语言命令发现

- PR：[#155405](https://github.com/openclaw/openclaw/pull/155405)
- 当前状态：Open
- 纳入下一版本可能性：中等

该功能允许用户通过自然语言表达意图，系统匹配 slash command。方向上非常契合“个人 AI 助手”的低门槛交互，但 PR 带有 compatibility 风险和 needs proof 标签，需要重点验证误匹配、多语言输入和现有 slash 语义兼容性。

---

### 4. Xiaomi MiMo V2.6 模型支持

- PR：[#155409](https://github.com/openclaw/openclaw/pull/155409)
- 当前状态：Open
- 纳入下一版本可能性：较高

新增 Xiaomi MiMo V2.6 系列模型，并修复 Flash/UltraSpeed proxy routes 可能丢失 tool conversation 所需 reasoning history 的问题。该方向说明 OpenClaw 仍在快速扩充 provider/model 覆盖范围。

---

### 5. Provider-neutral decision evaluation tool

- PR：[#155134](https://github.com/openclaw/openclaw/pull/155134)
- 当前状态：Open
- 标签：XL / compatibility / needs proof
- 纳入下一版本可能性：中等偏低，取决于 proof

该 PR 试图提供 provider-neutral 的 explicit evaluation tool，避免 Decision provider 只能使用 TypeSafe-owned `typesafe_evaluate` 工具。方向上有利于 provider 抽象层长期健康，但 PR 规模大、兼容风险高，短期需要更多验证。

---

### 6. 角色模型限制在 model pickers 中生效

- PR：[#154839](https://github.com/openclaw/openclaw/pull/154839)
- 当前状态：Open
- 标签：auth-provider / security-boundary / needs proof
- 纳入下一版本可能性：中等

该 PR 涉及 Control UI、iOS、macOS、Web UI、Gateway 等多个端，修复 model-restricted role 仍能看到或保留不允许模型的问题。安全边界意义较大，但改动面广，需要谨慎验证。

---

## 7. 用户反馈摘要

### 1. 用户对升级可靠性高度敏感

来自 [#155406](https://github.com/openclaw/openclaw/issues/155406) 的反馈显示，用户在 2026.9.4 升级中遇到 state migration 后无回滚路径的问题。这类问题直接影响用户对 OpenClaw 作为长期个人 AI 助手底座的信任。

**痛点：**

- 升级失败后状态不可回退
- 用户难以判断是否能安全重试
- 需要更清晰的 repair / rollback / backup 指引

---

### 2. 多 provider 抽象层仍存在一致性问题

[#155397](https://github.com/openclaw/openclaw/issues/155397) 指出 Claude CLI backend 将 session `modelProvider` 持久化为 `claude-cli` 而非 `anthropic`。用户实际痛点不是“显示名错误”这么简单，而是 Doctor 会因此反复诊断同一问题。

**痛点：**

- backend id 与 canonical provider 混用
- Doctor 重复报警降低信任
- 用户无法区分真实配置错误与系统状态污染

---

### 3. Agent 完成态需要被严格保护

[#155396](https://github.com/openclaw/openclaw/issues/155396) 和 [#154728](https://github.com/openclaw/openclaw/pull/154728) 都指向一个共同问题：当 agent/tool run 已经有“完成”证据时，后续 timeout、recovery、provenance 检查不应覆盖最终结果。

**痛点：**

- 明明工具任务完成，却只看到通用失败
- run history、retry 和状态显示可能误导用户
- 用户希望系统保留 substantive final answer，而不是丢弃

---

### 4. 用户希望复杂任务会话可以被整理

[#155410](https://github.com/openclaw/openclaw/issues/155410) 反映，用户已经在大量使用 session fork/spawn 形成复杂层级，但目前缺少后期整理能力。

**痛点：**

- spawn lineage 一旦形成不可修改
- sidebar hierarchy 不能反映用户后续理解的任务结构
- 难以整理长期项目或多分支探索

---

### 5. UI 状态一致性是当前高频体验问题

多条 PR 指向 Web UI / Control UI 状态一致性：

- [#155404](https://github.com/openclaw/openclaw/pull/155404)：history refresh 覆盖 live replies
- [#154805](https://github.com/openclaw/openclaw/pull/154805)：Stop 延迟响应污染其他 chat
- [#155408](https://github.com/openclaw/openclaw/pull/155408)：completed subagents 仍显示 running
- [#155402](https://github.com/openclaw/openclaw/pull/155402)：highest effort 缺少视觉区分

**用户感受：**

- 对“当前到底在运行什么”缺少确定性
- 多 agent、多 session 操作时容易被 UI 误导
- 希望状态反馈实时、准确、可区分

---

## 8. 待处理积压

> 今日数据未提供长期未响应时间跨度，因此以下重点列出当前仍 Open、影响面大、带有高风险标签或已具备 proof 但尚未合入的 PR/Issue，供维护者优先关注。

### 优先级高：建议尽快处理

#### 1. P1 UI live state 修复

- PR：[#155404](https://github.com/openclaw/openclaw/pull/155404)
- 状态：Open
- 标签：P1 / proof sufficient / ready for maintainer look
- 建议：优先 review / merge。该问题直接影响用户对实时聊天状态的信任。

#### 2. Gateway session owner 问答权限

- PR：[#155335](https://github.com/openclaw/openclaw/pull/155335)
- 状态：Open
- 标签：security-boundary / availability / needs proof
- 建议：尽快补足 proof。该问题影响 session-scoped users 使用 agent 的完整闭环。

#### 3. 升级失败 `state-migrated-no-rollback`

- Issue：[#155406](https://github.com/openclaw/openclaw/issues/155406)
- 状态：Open
- 建议：需要维护者确认是否与 [#155389](https://github.com/openclaw/openclaw/pull/155389) 相关，并给用户明确恢复步骤。

#### 4. Codex final-answer recovery 丢失有效结果

- Issue：[#155396](https://github.com/openclaw/openclaw/issues/155396)
- 状态：Open
- 建议：与 Codex 相关 PR 一并排查，尤其关注 completed/proven answer 被后续 recovery 状态覆盖的问题。

---

### 中高优先级：已有 proof 或接近可合入

#### 5. Crabbox archive streaming / memory fix

- PR：[#154622](https://github.com/openclaw/openclaw/pull/154622)
- 状态：Open
- 标签：proof sufficient / ready for maintainer look
- 建议：该 PR 已有 proof，且可改善内存占用和路径安全，适合进入近期维护批次。

#### 6. Geolocation cache write failure fallback

- PR：[#154569](https://github.com/openclaw/openclaw/pull/154569)
- 状态：Open
- 标签：proof sufficient / ready for maintainer look
- 建议：提升并发 Gateway 下的可用性，风险相对可控。

#### 7. Helper-tool download Content-Length 修复

- PR：[#154676](https://github.com/openclaw/openclaw/pull/154676)
- 状态：Open
- 标签：ready for maintainer look
- 建议：修复安装链路误拒合法下载的问题，影响 agents 可用性。

---

### 需要更多 proof 的高影响 PR

#### 8. Provider-neutral decision evaluation tool

- PR：[#155134](https://github.com/openclaw/openclaw/pull/155134)
- 状态：Open
- 标签：XL / compatibility / needs proof
- 建议：需要重点验证 provider 抽象、TypeSafe / ONNX 插件交互和模型选择语义。

#### 9. Role model restrictions in model pickers

- PR：[#154839](https://github.com/openclaw/openclaw/pull/154839)
- 状态：Open
- 标签：auth-provider / security-boundary / needs proof
- 建议：该 PR 涉及多端 picker 与 Gateway discovery，应补充权限变更时 open picker 的实时行为测试。

#### 10. Codex native children accessible after automatic completion

- PR：[#155353](https://github.com/openclaw/openclaw/pull/155353)
- 状态：Open
- 标签：compatibility / message-delivery / needs proof
- 备注：PR 摘要中明确写明 “not merge-ready”，并指出 current-head review 发现新的 P1。
- 建议：暂不合入，优先补齐 `message_tool_only` delivery 场景证明。

#### 11. Native forks sandbox requirements

- PR：[#155358](https://github.com/openclaw/openclaw/pull/155358)
- 状态：Open
- 标签：security-boundary / compatibility / needs proof
- 建议：涉及 native session branch materialization 前的 runtime policy 应用顺序，属于安全边界问题，需要严格测试。

---

## 项目健康度评估

- **开发活跃度：高**  
  24 小时内 50 条 PR 更新，说明维护者与贡献者投入度很高。

- **发布节奏：稳定但复杂**  
  同时维护 latest 与 extended-stable，表明项目进入较成熟阶段，但也带来 backport、升级路径和兼容性管理压力。

- **稳定性风险：中高**  
  今日问题集中在升级、状态迁移、UI 实时状态覆盖、agent 完成态保护和权限边界，均属于用户信任相关路径。

- **社区需求方向清晰**  
  用户正从“能运行 agent”转向“可靠管理长期会话、多模型、多分支任务与复杂权限”的更高级需求。

- **维护者关注重点**  
  建议优先处理升级/回滚、Codex final-answer recovery、P1 UI live state、权限边界 PR，以及已具备 proof 的稳定性修复，避免 39 个待合并 PR 继续堆积形成 review bottleneck。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
日期：2026-09-22

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的“两极分化”：头部项目如 **OpenClaw、Hermes Agent、CoPaw/QwenPaw、ZeroClaw、NanoBot** 保持高频迭代，围绕 Gateway、Desktop/WebUI、工具治理、会话状态、多 provider 兼容和长会话稳定性快速修复；而 PicoClaw、NullClaw、TinyClaw、ZeptoClaw 等项目几乎无实质活动。

整体技术重心正在从“接入模型、跑通 Agent”转向“长期稳定运行、复杂会话管理、多任务可观测、安全权限边界、插件/工具生态治理”。  
多项目同时暴露出 **状态一致性、升级/迁移、长会话压缩、工具权限、provider 抽象、前端实时渲染** 等成熟化阶段问题，说明该生态正在进入生产化、日常化使用阶段。  
OpenClaw、Hermes Agent 和 ZeroClaw 代表了当前最复杂的 agent runtime / gateway / desktop 类项目，而 NanoBot、LobsterAI、CoPaw 则更突出产品化 WebUI、渠道集成和开发者体验。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日主要主题 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 5 | 50 | 1 个 extended-stable：v2026.7.35 | Gateway 稳定性、权限边界、会话状态、CI、模型 provider | **高活跃，中高风险**。维护节奏快，但 39 个待处理 PR 带来 review 压力 |
| **NanoBot** | 2 | 18 | 无 | 长会话压缩、BUILD 延迟诊断、WebUI 工作台、provider/MCP 扩展 | **高活跃，产品化加速**。长会话稳定性是核心风险 |
| **Hermes Agent** | 50 | 50 | 1 个：v2026.9.21 / v0.21.4 | Desktop session、streaming、update、plugin/tool cache、provider 适配 | **极高活跃，中高稳定性压力**。响应快，但 P2 问题密集 |
| **PicoClaw** | 0 | 1 | 无 | 误提交 PR 清理 | **低活跃，稳定但缺少推进信号** |
| **NanoClaw** | 1 | 1 | 无 | restart 脚本鲁棒性、WhatsApp channel 命名 | **低到中活跃，小步维护** |
| **NullClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **IronClaw** | 1 | 0 | 无 | officeqa benchmark failure taxonomy | **低活跃，偏质量观测** |
| **LobsterAI** | 1 | 8 | 无 | Gateway 启动修复、微信/飞书通道、浏览器凭据、CJK 渲染 | **较高活跃，修复效率高** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 2 | 1 | 无 | 本地 TTS / VoxCPM | **低活跃但方向明确** |
| **CoPaw / QwenPaw** | 5 | 14 | 无 | Console UX、工具治理、插件可用性、测试覆盖率、Benchmark 诉求 | **高活跃，质量巩固明显** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeroClaw** | 4 | 17 | 无 | 安全、runtime、多 agent 协作、Nix、MCP、memory | **高活跃，高 review 压力** |

### 活跃度梯队

| 梯队 | 项目 | 特征 |
|---|---|---|
| 第一梯队：高速迭代 | Hermes Agent、OpenClaw、ZeroClaw、CoPaw、NanoBot | PR/Issue 密集，涉及核心 runtime、UI、工具、安全和 provider |
| 第二梯队：稳定维护 / 产品修复 | LobsterAI、NanoClaw、Moltis、IronClaw | 有明确问题或功能方向，但规模较小 |
| 第三梯队：低活动 / 静默 | PicoClaw、NullClaw、TinyClaw、ZeptoClaw | 今日无实质推进或仅有清理性事件 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 核心定位

OpenClaw 当前更接近一个 **通用型个人 AI 助手 / agent gateway / 多 provider runtime 平台**，而不是单纯聊天前端或轻量 agent 框架。  
它同时维护 latest 与 extended-stable 分支，并发布 `gateway-only extended-stable` 版本，说明其用户中已经存在对稳定部署、长期维护和回溯安全补丁有需求的群体。

### 3.2 相对优势

| 维度 | OpenClaw 表现 | 对比说明 |
|---|---|---|
| 开发活跃度 | 24 小时 50 条 PR 更新 | 与 Hermes Agent 并列第一梯队，高于 NanoBot、CoPaw、ZeroClaw |
| 发布成熟度 | 同时维护 latest 与 extended-stable | 比多数项目更接近成熟软件发布模型 |
| Gateway 能力 | 大量修复围绕 Gateway 权限、session、migration、provider | 比 NanoBot、CoPaw 更偏底层运行时和网关稳定性 |
| 多 provider 支持 | 新增 Xiaomi MiMo V2.6，关注 Claude CLI、Codex 等 backend 兼容 | provider 抽象复杂度高，与 Hermes、ZeroClaw 同级 |
| 会话管理 | 关注 session owner 权限、history refresh、session reparent 需求 | 说明用户已进入多分支、多任务长期使用场景 |
| 安全边界 | 多个 PR 带 security-boundary、auth-provider、availability 标签 | 安全治理优先级高于许多轻量项目 |

### 3.3 技术路线差异

OpenClaw 的路线偏向：

- **Gateway-first**：大量修复集中在 Gateway、session-scoped users、migration、provider preset、Doctor；
- **多端状态一致性**：Web UI、TUI、Control UI、iOS/macOS picker 等路径均被覆盖；
- **兼容性与 LTS 化**：`extended-stable` 分支使其不同于只追 mainline 的项目；
- **agent 完成态保护**：Codex final-answer recovery、native children、queue timeout 等问题表明其 runtime 复杂度较高；
- **权限边界显式治理**：session owner、role model restriction、native forks sandbox 等问题显示其在向企业化/多用户化靠近。

相比之下：

- **Hermes Agent** 更偏 Desktop + Gateway + Plugin Catalog，桌面 session/streaming 问题更多；
- **NanoBot** 更偏 WebUI agent 工作台和长会话上下文管理；
- **CoPaw/QwenPaw** 更偏开发者框架、Console、工具治理、Benchmark、插件平台；
- **ZeroClaw** 更偏 runtime 安全、多 agent 协作、Nix 可复现部署和架构 RFC；
- **LobsterAI** 更偏本地桌面产品、IM/微信/飞书渠道和 OpenClaw 嵌入式集成。

### 3.4 社区规模与风险

OpenClaw 今日 50 条 PR 更新、5 条 Issue 更新，说明维护密度很高，但 **39 个待处理 PR** 是明显瓶颈。  
当前风险不在于缺少贡献，而在于：

- 安全边界 PR 需要严格 proof；
- 升级/迁移问题影响信任；
- UI live state 与 agent 完成态问题影响用户感知；
- 多 provider/backend 抽象容易出现状态污染。

总体看，OpenClaw 是生态中最接近“成熟平台化运行时”的项目之一，但也因此承担了更高的兼容性和回归风险。

---

## 4. 共同关注的技术方向

### 4.1 长会话、上下文压缩与记忆管理

涉及项目：

- **OpenClaw**：Codex final-answer recovery、agent 完成态保护、history refresh；
- **NanoBot**：自动 transcript summarization 缺少 token-budget guard，BUILD 阶段长延迟；
- **Hermes Agent**：derived conversation indexing、semantic compaction、Curator ledger 增长；
- **ZeroClaw**：bootstrap 文件截断显式提示、Qdrant time-bound recall；
- **CoPaw**：scroll history 中 tool_result blocks 按 retention 清理。

共同诉求：

- 长会话不能因为压缩失败而死锁；
- 已完成的 agent/tool 结果不能被后续 timeout/recovery 覆盖；
- 用户需要知道上下文何时被截断、压缩或丢弃；
- memory 检索要支持时间、来源和结构化限制；
- 长期运行实例需要存储保留策略。

### 4.2 UI / Desktop / WebUI 实时状态一致性

涉及项目：

- **OpenClaw**：live replies 被 history refresh 覆盖、Stop 延迟响应污染其他 chat；
- **Hermes Agent**：Desktop transcript、streaming duplicate、reasoning-only turn settle 后消失；
- **NanoBot**：WebUI commands、subtasks、file/link/image artifact panels；
- **CoPaw**：Console Markdown 表格、KaTeX、API loading；
- **LobsterAI**：CJK 字重、工作区切换需重启 Gateway。

共同诉求：

- 前端实时态与最终持久态必须一致；
- 后台任务不能污染前台 session；
- 多 session / 多 agent UI 需要清晰状态归属；
- agent 输出从文本扩展到命令、文件、图片、图表、链接、usage analytics；
- WebUI 正从聊天窗口升级为 agent 工作台。

### 4.3 工具调用权限、安全边界与治理

涉及项目：

- **OpenClaw**：session owner 权限、role model restrictions、native forks sandbox；
- **Hermes Agent**：MCP deregistration、防止工具注册误删、pre_verify 扩展到 effect tools；
- **CoPaw**：run_tool_batch 绕过 governance checks；
- **ZeroClaw**：proxy credentials 脱敏、git global options 安全解析、detached tool result signing；
- **NanoBot**：temporary chat privacy in tool execution；
- **LobsterAI**：浏览器凭据 OS secure storage 显式授权。

共同诉求：

- 所有工具入口应经过统一权限管线；
- 工具执行结果、日志、快照不能泄漏凭据；
- 临时聊天和隐私模式必须贯穿工具、异常和恢复路径；
- 有外部副作用的工具需要 pre-verify 或 operator approval；
- 多 agent / 多 session 场景下需要更明确的身份和授权模型。

### 4.4 Provider / Model 生态扩展与抽象一致性

涉及项目：

- **OpenClaw**：Xiaomi MiMo V2.6、Claude CLI canonical provider、Codex harness；
- **NanoBot**：Opper provider；
- **Hermes Agent**：xAI Grok、Anthropic/Claude subscription direct SDK、zai/Qwen；
- **ZeroClaw**：Opencode big-pickle；
- **CoPaw**：Responses API function tools strict 默认行为；
- **LobsterAI**：Parallel web search skill；
- **Moltis**：VoxCPM 本地 TTS provider。

共同诉求：

- provider id、backend id、canonical provider 不能混用；
- tool calling、reasoning summary、content 字段归一化必须一致；
- free tier / keyless / OpenAI-compatible provider 是新用户入口；
- 本地模型、本地 TTS、私有化 provider 需求上升；
- provider 失败需要更可操作的诊断信息。

### 4.5 插件、MCP 与外部生态集成

涉及项目：

- **NanoBot**：Adam Network MCP 示例；
- **Hermes Agent**：Plugin Catalog、Chinese PII redaction、Desktop Browser 插件能力；
- **CoPaw**：MCP web research 示例、OMP skill frontmatter；
- **ZeroClaw**：You.com MCP search server 示例；
- **LobsterAI**：web-search skill 扩展；
- **NanoClaw**：WhatsApp channel adapter；
- **LobsterAI**：微信、飞书 IM 通道修复。

共同诉求：

- 用户需要可复制的 MCP 示例，而不是仅有配置字段；
- 插件必须有清晰 metadata、校验和错误提示；
- channel adapter 需要更准确的 conversation/channel 命名；
- 企业 IM、社交网络、搜索、浏览器、PII 脱敏等外部集成正在增多。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特征 |
|---|---|---|---|
| **OpenClaw** | Gateway、agent runtime、多 provider、会话/权限/Doctor、extended-stable | 高级个人用户、长期运行用户、开发者、可能的团队部署 | Gateway-first，多端 UI，强安全边界，兼容 latest/LTS 双线 |
| **Hermes Agent** | Desktop、Gateway、Plugin Catalog、provider 适配、streaming | 桌面用户、插件用户、Hosted/Docker 下游部署者 | Desktop + Gateway + 插件生态，快速 patch release，问题暴露密集 |
| **NanoBot** | WebUI agent 工作台、长会话、artifact、commands、subtasks、MCP | WebUI 用户、个人助手用户、agent 工作流用户 | Web-first，重视 artifact 可视化和长会话上下文管理 |
| **CoPaw / QwenPaw** | Agent 框架、Console、工具治理、插件、Benchmark、测试覆盖 | 开发者、框架选型者、企业集成者 | AgentScope 基座，强调工具治理、Console UX、评测与插件平台 |
| **ZeroClaw** | Runtime 安全、多 agent 协作、Nix、memory、MCP | 系统型开发者、NixOS 用户、安全敏感部署者 | 安全和架构 RFC 驱动，重 runtime、可复现部署、agent-to-agent |
| **LobsterAI** | 桌面产品、OpenClaw 集成、IM 通道、微信/飞书、浏览器凭据 | 中文个人/团队用户、本地桌面用户、IM 助手用户 | 产品化集成强，关注 Gateway 启动、渠道迁移、中文体验 |
| **NanoClaw** | 消息 channel、WhatsApp、部署脚本 | 多渠道助手用户、轻量部署者 | 小步维护，channel adapter 与脚本鲁棒性 |
| **Moltis** | Voice personas、本地 TTS | 本地语音助手、隐私敏感用户、多语言语音场景 | Voice-first，开始引入本地 TTS provider |
| **IronClaw** | Benchmark、failure taxonomy | 评测/研究用户 | 质量观测导向，今日无代码推进 |
| **PicoClaw / NullClaw / TinyClaw / ZeptoClaw** | 暂无明显今日方向 | 不明确 | 今日无有效活动或静默 |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

代表项目：

- **Hermes Agent**
- **OpenClaw**
- **NanoBot**
- **ZeroClaw**
- **CoPaw / QwenPaw**

特征：

- Issue/PR 数量高；
- 当天问题常有当天 PR；
- 功能、修复、安全、UI、provider 同时推进；
- 维护压力主要来自 review backlog 和回归风险；
- 用户已经进入真实复杂使用场景。

其中：

- Hermes Agent：问题暴露最多，响应也最快；
- OpenClaw：平台化和 stable 分支能力最突出；
- ZeroClaw：安全和架构讨论最强；
- NanoBot：WebUI 产品化速度快；
- CoPaw：工程质量和框架治理明显。

### 6.2 质量巩固阶段

代表项目：

- **LobsterAI**
- **IronClaw**
- **NanoClaw**

特征：

- 活跃度中低；
- 动态集中在具体 bug、部署体验或通道适配；
- 不是大规模功能扩展，而是补齐使用链路；
- 用户反馈更偏产品体验或基础设施稳定性。

LobsterAI 今日表现较好，8 条 PR 中 7 条完成处理，说明其维护响应明确，尤其关注 Gateway 启动和中文用户体验。

### 6.3 低活动 / 观察阶段

代表项目：

- **PicoClaw**
- **NullClaw**
- **TinyClaw**
- **ZeptoClaw**
- **Moltis**，部分例外：虽低活跃，但 VoxCPM 本地 TTS 方向明确。

特征：

- 今日几乎无 PR/Issue 或只有单点事件；
- 难以从 24 小时数据判断长期健康度；
- 如果持续低活动，可能面临社区关注度下降。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 产品正在从“聊天”升级为“工作台”

NanoBot 的 Commands/Subtasks/Artifacts/Usage，CoPaw 的 Console 表格和 KaTeX，OpenClaw 的 live replies 与 Stop 状态，Hermes 的 Desktop transcript，都说明用户不再满足于线性聊天窗口。

对开发者的参考：

- 需要设计任务面板、命令面板、artifact viewer、usage analytics；
- UI 状态必须支持多 session、多 agent、后台任务；
- 前端 reconciliation 和最终态一致性会成为核心技术债。

### 7.2 长会话可靠性成为核心竞争力

NanoBot 的 auto-compaction deadlock、OpenClaw 的 Codex final-answer recovery、Hermes 的 semantic compaction、ZeroClaw 的 bootstrap truncation，都指向同一问题：长会话是 agent 的真实主战场。

对开发者的参考：

- 压缩、摘要、记忆、截断必须有 token budget；
- completed/proven result 应高于后续 timeout/recovery；
- 需要用户可见的上下文丢弃/压缩提示；
- memory recall 不能只追相似度，还要支持时间、来源和权限约束。

### 7.3 工具治理和安全边界正在前移

CoPaw 的 batch tool governance、ZeroClaw 的 proxy credential redaction、OpenClaw 的 session owner 权限、Hermes 的 effect-tool pre_verify、NanoBot 的 temporary chat privacy，都说明工具执行已经是最主要的风险面。

对开发者的参考：

- 工具调用入口必须统一；
- batch、nested、MCP、background delegate 都不能绕过权限；
- tool result、snapshot、traceback、diagnostic context 要默认脱敏；
- 有副作用工具需要 approval、pre-verify 或 policy gate。

### 7.4 Provider 抽象复杂度持续上升

越来越多项目接入 OpenAI-compatible、本地模型、免费 tier、云 provider、TTS provider 和搜索 provider。与此同时，reasoning/content、tool calling、canonical provider、模型别名和错误诊断问题同步增多。

对开发者的参考：

- provider adapter 需要强归一化测试；
- backend id 与 canonical provider 必须分离；
- reasoning-only、tool-call-only、content-empty 等边界场景要覆盖；
- provider 失败信息要可操作，不能只提示“all attempts failed”。

### 7.5 本地化、私有化和低门槛接入需求增强

Moltis 的 VoxCPM 本地 TTS、LobsterAI 的中文 CJK/微信/飞书、Hermes 的中文 PII 脱敏、ZeroClaw/NanoBot/CoPaw 的 MCP 示例、LobsterAI 的 keyless Parallel search，都显示用户希望减少云依赖、降低配置成本，并支持本地/中文/企业场景。

对开发者的参考：

- 本地 provider、本地 TTS、本地 memory 将是重要卖点；
- 中文和企业 IM 场景值得单独优化；
- keyless/free tier 是新用户 onboarding 的重要入口；
- MCP 示例需要包含认证、隐私、速率限制和数据边界说明。

### 7.6 开源 Agent 项目正在进入“发布治理”阶段

OpenClaw 的 extended-stable、Hermes 的 patch release、CoPaw 的测试覆盖提升、ZeroClaw 的 advisory scan、LobsterAI 的迁移兼容修复，都显示项目已从实验性开发进入稳定发布和长期维护阶段。

对技术决策者的参考：

- 选型时不应只看功能数量，还要看 release cadence、backport 策略、CI 健康度和安全响应；
- 有 stable/LTS 分支的项目更适合长期部署；
- PR backlog 和高风险标签数量是判断维护压力的重要指标；
- 插件生态越繁荣，越需要治理、校验和兼容承诺。

---

## 总结判断

从今日数据看，**OpenClaw、Hermes Agent、ZeroClaw、CoPaw、NanoBot** 是当前个人 AI 助手 / 自主智能体开源生态中最值得持续关注的第一梯队项目。  
其中 OpenClaw 的优势在于 **Gateway 平台化、stable 分支、provider 覆盖和权限边界治理**；Hermes Agent 胜在 **Desktop + Plugin 生态活跃度**；NanoBot 在 **WebUI 工作台产品化** 上推进明显；CoPaw 在 **框架治理、测试和开发者生态** 上更突出；ZeroClaw 则在 **runtime 安全、多 agent 架构和可复现部署** 上差异化明显。

对开发者和技术决策者而言，当前生态的关键选型标准已经从“能否调用模型”转向：

1. 长会话是否可靠；  
2. 工具权限是否可控；  
3. 多 session / 多 agent 状态是否一致；  
4. provider 抽象是否稳健；  
5. UI 是否能承载真实工作流；  
6. 项目是否具备持续发布和安全治理能力。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报  
日期：2026-09-22  
仓库：HKUDS/nanobot

## 1. 今日速览

过去 24 小时 NanoBot 活跃度较高：新增/活跃 Issue 2 条，PR 更新 18 条，其中 15 条仍待处理，3 条已关闭。今日工作重心明显集中在 WebUI 体验增强、会话上下文/内存稳定性、BUILD 阶段性能可观测性，以及 provider/channel 扩展。  
从健康度看，项目维护节奏积极，多个用户报告的问题已经在同日出现对应修复 PR，例如自动压缩死锁问题已有 #5857 跟进，BUILD 阶段延迟问题已有 #5846 增加诊断能力。  
不过，当前开放 PR 数量较多，且多项 WebUI 功能 PR 之间存在依赖或堆叠关系，短期内需要维护者加强评审与集成风险控制。

---

## 3. 项目进展

### 已关闭 / 已处理 PR

#### #5840 fix: improve log reliability and request correlation  
链接：https://github.com/HKUDS/nanobot/pull/5840  
状态：CLOSED  
作者：chengyongru  

该 PR 聚焦日志可靠性和请求关联能力，主要包括：

- 标准化 CLI 日志格式，加入更明确的时间戳、request / turn / session 关联信息；
- 改善生命周期字段与单行消息渲染；
- 修复 13 处 Loguru 调用中错误使用 `exc_info=True` 导致真实异常堆栈可能无法正确保留的问题；
- 增加 request ID 和 completion telemetry。

**项目推进意义：**  
这是偏基础设施层面的稳定性改进，有助于后续定位复杂会话、通道请求、LLM 调用链路中的问题。结合今日 #5843 报告的 BUILD 阶段延迟问题，日志与追踪能力的增强对项目可维护性非常关键。

---

#### #5839 fix(webui): prevent mobile sidebar tooltip and double-tap navigation  
链接：https://github.com/HKUDS/nanobot/pull/5839  
状态：CLOSED  
作者：Re-bin  

该 PR 修复移动端 WebUI 侧边栏的交互问题：

- 打开移动侧边栏时避免错误聚焦搜索按钮并显示 tooltip；
- 修复移动浏览器或 PWA 中选择 topic 需要二次点击的问题；
- 保持共享 Sheet 组件不变，只调整移动侧边栏的聚焦行为。

**项目推进意义：**  
这是针对移动端使用体验的细节修复。NanoBot 作为个人 AI 助手类项目，WebUI 的跨设备可用性非常重要，该修复降低了移动端入口操作摩擦。

---

#### #5841 fix(agent): respect temporary chat privacy in tool execution  
链接：https://github.com/HKUDS/nanobot/pull/5841  
状态：CLOSED  
作者：Re-bin  

该 PR 修复临时聊天中的隐私策略执行问题：

- 在工具执行进度、web/MCP 诊断、runner/worker 恢复等路径中遵守 session 的内容日志策略；
- 在重连或 session 丢弃后的异常 tracebacks 中继续遵循隐私限制；
- 对临时聊天中的大体积工具结果保持内存态处理，避免不必要的持久化。

**项目推进意义：**  
这是一次重要的隐私与安全边界修复。对个人 AI 助手而言，临时会话是否真正“临时”直接影响用户信任。该 PR 提升了工具调用和异常恢复路径中的隐私一致性。

---

### 待合并但具有明显推进价值的 PR

#### #5857 fix(memory): bound automatic transcript summarization  
链接：https://github.com/HKUDS/nanobot/pull/5857  
状态：OPEN  
关联 Issue：https://github.com/HKUDS/nanobot/issues/5849  

该 PR 直接修复 #5849 报告的自动上下文压缩死锁问题。改动包括：

- 在自动 transcript summarization 前预算 conversation history；
- 估算归档 prompt、system/developer 指令、tool schema 等固定开销；
- 当完整摘要可接受时保留原前缀，否则进行裁剪；
- 目标是避免 summarization 请求本身超过模型输入窗口。

**影响评估：高。**  
如果该问题属实，长会话可能进入“无法压缩、无法继续”的不可恢复状态。该 PR 应优先评审。

---

#### #5846 fix(agent): trace BUILD substage latency (#5843)  
链接：https://github.com/HKUDS/nanobot/pull/5846  
状态：OPEN  
关联 Issue：https://github.com/HKUDS/nanobot/issues/5843  

该 PR 针对长会话 BUILD 阶段延迟问题增加结构化 DEBUG timing：

- 为 BUILD 生命周期的关键子阶段加入 timing events；
- 记录安全诊断元数据，如 model、context-window size、message/block 数、persistence/resume flags；
- 不记录消息内容，避免泄露隐私；
- 覆盖普通用户 turn 与系统触发场景。

**影响评估：中高。**  
该 PR 本身更偏诊断而非直接性能修复，但对定位“10 秒到数十秒”的内部延迟非常关键。

---

#### #5845 Add Opper as a built-in provider  
链接：https://github.com/HKUDS/nanobot/pull/5845  
状态：OPEN  

该 PR 新增 Opper 作为内置 gateway provider：

- 在 provider registry 中增加 `ProviderSpec(name="opper", …)`；
- 使用 `OPPER_API_KEY`；
- 采用 `openai_compat` backend；
- 标记为 gateway provider；
- 补充文档与测试。

**项目推进意义：**  
扩大 NanoBot 的模型/网关生态兼容性，有助于增强用户选择权，降低对单一 LLM provider 的依赖。

---

#### #5858 feat(mcp): add Adam Network MCP integration example  
链接：https://github.com/HKUDS/nanobot/pull/5858  
状态：OPEN  

该 PR 增加 NanoBot 通过 MCP endpoint 连接 Adam Network 的示例。Adam Network 被描述为面向 AI agents 和人类的去中心化消息流与开放社交网络。

**项目推进意义：**  
这是 MCP 生态扩展示例，体现 NanoBot 正在向 agent-to-agent、agent-to-social-network 场景延展。

---

## 4. 社区热点

今日所有 Issue 和 PR 的评论数、点赞数均为 0 或未提供，因此没有出现传统意义上“高评论/高反应”的热点讨论。但从问题性质和 PR 数量看，以下主题值得重点关注。

### 热点一：长会话上下文管理与自动压缩可靠性

#### #5849 Auto-compaction deadlock  
链接：https://github.com/HKUDS/nanobot/issues/5849  
状态：OPEN  
作者：Krislu1221  
评论：0  
反应：0  

用户指出自动上下文压缩路径 `summarize_transcript` 会把整个 session history 和 system prompt 一次性发送给 summarization model，缺少 token-budget guard。与之相比，手动归档路径 `archive_session` 使用了 `get_history(max_tokens=budget)` 分块，因此自动路径更容易在长会话中超过模型输入预算，并进入无法恢复状态。

对应修复 PR：  
#5857 https://github.com/HKUDS/nanobot/pull/5857

**背后诉求：**  
用户需要 NanoBot 在长时间、多轮、工具密集型会话中稳定运行。自动压缩本应是长会话可持续性的核心机制，如果压缩本身不受 token 限制，就会从“保护机制”变成“故障源”。

---

### 热点二：长会话 BUILD 阶段延迟与可观测性

#### #5843 Long sessions wait 10s–tens of seconds before LLM call  
链接：https://github.com/HKUDS/nanobot/issues/5843  
状态：OPEN  
作者：Lucky314159  
评论：0  
反应：0  

用户报告长会话中每次用户输入后，在 LLM provider 请求发起前，NanoBot 内部 BUILD 阶段会等待约 10 秒，有时达到数十秒。

对应诊断 PR：  
#5846 https://github.com/HKUDS/nanobot/pull/5846

**背后诉求：**  
用户希望明确该延迟是否为预期行为，并希望项目能够区分以下可能原因：

- 历史消息构建过慢；
- 工具 schema 或上下文拼装耗时；
- 持久化或恢复逻辑阻塞；
- token 估算或压缩逻辑性能问题；
- WebUI/agent runtime 内部调度问题。

该问题如果频繁出现，会显著影响个人 AI 助手的交互流畅性。

---

### 热点三：WebUI 能力密集扩展

今日大量 PR 来自 WebUI 方向，说明项目正在快速增强可视化交互层：

- #5856 Inspect and stop session commands  
  https://github.com/HKUDS/nanobot/pull/5856
- #5855 Show bounded parent-scoped subtask outputs  
  https://github.com/HKUDS/nanobot/pull/5855
- #5854 Add scoped prompt commands and management UI  
  https://github.com/HKUDS/nanobot/pull/5854
- #5853 Deliver typed image artifacts with temporary-chat ownership  
  https://github.com/HKUDS/nanobot/pull/5853
- #5852 Add link actions and isolated website previews  
  https://github.com/HKUDS/nanobot/pull/5852
- #5851 Add usage ranges, activity calendar and model breakdowns  
  https://github.com/HKUDS/nanobot/pull/5851
- #5850 Unify file reference actions  
  https://github.com/HKUDS/nanobot/pull/5850
- #5848 Render safe Mermaid diagrams in replies  
  https://github.com/HKUDS/nanobot/pull/5848
- #5847 Restore session-scoped file previews  
  https://github.com/HKUDS/nanobot/pull/5847
- #5844 Clarify queued guidance delivery  
  https://github.com/HKUDS/nanobot/pull/5844

**背后诉求：**  
NanoBot 的 WebUI 正从“聊天界面”向“agent 工作台”演进：用户希望查看子任务、命令、文件、链接、图片、图表、token 用量，并能更安全地预览和管理 agent 产生的中间结果。

---

## 5. Bug 与稳定性

### 严重级别：高

#### #5849 自动上下文压缩可能死锁，长会话无法恢复  
链接：https://github.com/HKUDS/nanobot/issues/5849  
状态：OPEN  
是否已有修复 PR：有，#5857  
修复 PR：https://github.com/HKUDS/nanobot/pull/5857  

**问题描述：**  
自动压缩路径 `summarize_transcript` 缺少 token-budget guard，可能将完整 session history、system prompt 一次性发送给 summarization model。一旦历史超过输入预算，压缩流程可能失败，且由于压缩无法完成，历史也无法缩短，形成死锁。

**影响范围：**

- 长会话；
- 多工具调用会话；
- system/developer prompt 较长的会话；
- tool schema 较重的 agent 配置；
- 依赖自动 compact 维持上下文长度的用户。

**建议优先级：P1/P2 之间偏 P1。**  
虽然 PR 标注为 priority p2，但该问题可能导致会话不可恢复，应优先评审和回归测试。

---

### 严重级别：中高

#### #5843 长会话 BUILD 阶段在 LLM 调用前出现 10 秒到数十秒等待  
链接：https://github.com/HKUDS/nanobot/issues/5843  
状态：OPEN  
是否已有修复 PR：有诊断 PR，#5846  
诊断 PR：https://github.com/HKUDS/nanobot/pull/5846  

**问题描述：**  
用户在长会话中观察到，每次 user turn 在真正发起 provider 请求前，会在 BUILD 阶段停留较久。等待发生在 NanoBot 内部，而不是 provider 响应慢。

**当前处理状态：**  
#5846 增加 BUILD 子阶段 timing events，用于定位延迟来源。但它更偏可观测性增强，尚不能确认已经消除性能问题。

**建议：**

- 合并 #5846 后收集真实日志样本；
- 进一步拆分 BUILD 阶段中的历史加载、消息构建、token 估算、工具 schema 拼装、压缩判断等耗时；
- 若与 #5849 相关，应联合验证自动压缩逻辑是否造成阻塞。

---

### 严重级别：中

#### #5847 WebUI session-scoped file previews 恢复  
链接：https://github.com/HKUDS/nanobot/pull/5847  
状态：OPEN  

**问题描述：**  
文件预览需要按会话隔离，避免在切换 pane、切换 session 或重新挂载组件后状态错乱。该 PR 恢复 PNG、JPEG、GIF、WebP 预览，并将 HTML/SVG 保持为源码显示。

**稳定性意义：**  
减少 WebUI 中跨会话状态污染，尤其是在多聊天、多文件引用场景中。

---

#### #5844 WebUI queued guidance delivery 表达不清  
链接：https://github.com/HKUDS/nanobot/pull/5844  
状态：OPEN  

**问题描述：**  
queued guidance 的状态和 action 命名不够明确，可能导致用户误解“Guide”按钮的行为。

**修复方向：**

- 将 ambiguous Guide action 重命名为 Send now；
- 明确提示 queued guidance 正在等待发送；
- 解释自动发送行为；
- 增加 composer 回归测试。

**稳定性意义：**  
属于交互语义稳定性改进，可降低用户误操作和理解成本。

---

#### #5842 channels status 无法展示不可用插件  
链接：https://github.com/HKUDS/nanobot/pull/5842  
状态：OPEN  

**问题描述：**  
当 channel 插件的可选 runtime dependency 无法导入时，`channels status` 不能完整展示这些 channel descriptor。

**修复方向：**

- 列出所有 channel descriptor；
- 增加 `Available` 列，区分 available、missing dependencies、invalid runtimes；
- 覆盖三种状态的 CLI 测试。

**稳定性意义：**  
提升 channel 生态的可诊断性，避免用户误以为插件不存在，而实际只是依赖缺失。

---

## 6. 功能请求与路线图信号

### WebUI 正在向完整 agent 工作台演进

以下 PR 显示 WebUI 方向可能成为下一版本重点：

#### #5856 Inspect and stop session commands  
链接：https://github.com/HKUDS/nanobot/pull/5856  

新增 Commands 面板，允许用户查看当前聊天中 agent 产生的 exec commands，包括：

- 输出；
- cwd；
- elapsed time；
- state；
- exit code；
- 暂停/跟随滚动；
- 复制输出；
- 不消费 agent 原始输出。

**路线图信号：**  
用户需要更强的命令执行可见性与控制能力，尤其适合 coding agent、shell automation、长任务执行场景。

---

#### #5855 Show bounded parent-scoped subtask outputs  
链接：https://github.com/HKUDS/nanobot/pull/5855  

新增 parent-scoped Subtasks panel，用于展示 inline/background child work：

- 任务状态；
- elapsed time；
- 最近工具名；
- 可见输出；
- 完成结果；
- retention 限制为 32 tasks / 12,000 answer characters。

**路线图信号：**  
NanoBot 正在强化多 agent / subagent / background task 的可观察性。未来版本可能会更加重视复杂任务编排体验。

---

#### #5854 Add scoped prompt commands and management UI  
链接：https://github.com/HKUDS/nanobot/pull/5854  

新增可复用 prompt commands，并提供管理 UI：

- instance-user scope；
- workspace scope；
- literal `$ARGUMENTS`；
- 内置名称保留；
- workspace precedence；
- Commands tab 中可创建、编辑、启用/禁用、删除。

**路线图信号：**  
项目正在引入类似“自定义 slash commands / prompt macros”的能力，适合高频工作流、团队/工作区模板、个人自动化指令库。

---

#### #5853 Deliver typed image artifacts with temporary-chat ownership  
链接：https://github.com/HKUDS/nanobot/pull/5853  

将图片生成结果作为 typed artifacts 展示在 assistant response 下方，而不要求额外调用 `message` tool。

**路线图信号：**  
NanoBot 正从纯文本对话扩展到多模态 artifact 管理。临时聊天 ownership 也表明隐私模型会继续贯穿新功能。

---

#### #5852 Add link actions and isolated website previews  
链接：https://github.com/HKUDS/nanobot/pull/5852  

为回复中的链接增加 action menu 和隔离网站预览：

- 右键、Shift+F10 或 ellipsis 打开菜单；
- 支持 preview、external-browser、copy；
- 使用 session-scoped preview state；
- 预览区域与对话并列显示。

**路线图信号：**  
WebUI 正在增加安全预览能力，减少用户在 agent 输出链接时离开当前上下文的成本。

---

#### #5851 Add usage ranges, activity calendar and model breakdowns  
链接：https://github.com/HKUDS/nanobot/pull/5851  

增强 token usage 详情：

- 7/30/365 天范围；
- retained-history 范围；
- keyboard-accessible activity calendar；
- provider/model breakdown；
- daily numeric table。

**路线图信号：**  
用户开始关注成本、模型使用分布和历史趋势。NanoBot 可能会继续增强 usage analytics、计费可见性和模型治理能力。

---

#### #5848 Render safe Mermaid diagrams in replies  
链接：https://github.com/HKUDS/nanobot/pull/5848  

支持在回复中安全渲染 Mermaid 图：

- 完整 Mermaid fence 渲染为图；
- 提供 source/copy、expanded view、zoom、drag-to-pan；
- streaming 未完成、语法错误或不支持定义时保留源码；
- 跟随主题；
- 懒加载已有 Mermaid chunk。

**路线图信号：**  
NanoBot 正在强化技术文档、系统设计、流程图等知识工作场景。

---

### Provider 与 MCP 生态扩展

#### #5845 Add Opper as a built-in provider  
链接：https://github.com/HKUDS/nanobot/pull/5845  

增加 Opper provider，说明项目继续支持更多 OpenAI-compatible gateway。

#### #5858 Add Adam Network MCP integration example  
链接：https://github.com/HKUDS/nanobot/pull/5858  

新增 Adam Network MCP 集成示例，说明 NanoBot 在 MCP 外部生态集成方面仍在扩展。

**路线图信号：**  
NanoBot 的定位不只是单机助手，而是在向开放 agent 生态、MCP 服务、外部网络和多 provider 兼容方向前进。

---

## 7. 用户反馈摘要

今日 Issues 评论数为 0，因此无法从评论串中提取多轮讨论。但从 Issue 正文可以归纳出以下明确用户痛点。

### 长会话用户对可靠性的要求提高

相关 Issue：#5849  
链接：https://github.com/HKUDS/nanobot/issues/5849  

用户痛点：

- 会话历史变长后，自动压缩机制可能失败；
- 用户预期 compact 是恢复上下文预算的保护机制；
- 当前自动 compact 如果不加 token guard，可能在最需要它时失效；
- 手动归档路径已有 chunking，用户期望自动路径保持同等健壮性。

典型使用场景：

- 长时间 coding session；
- agent 持续执行任务；
- 多工具调用产生大量 observation；
- 使用大型 system prompt 或复杂 tool schema 的高级用户。

---

### 长会话交互延迟影响助手可用性

相关 Issue：#5843  
链接：https://github.com/HKUDS/nanobot/issues/5843  

用户痛点：

- 用户输入后，LLM 请求尚未开始，但 NanoBot 内部 BUILD 阶段已经等待 10 秒甚至更久；
- 用户不清楚这是预期行为、性能瓶颈，还是 bug；
- 延迟发生在 provider 请求前，因此无法归因于模型服务商；
- 缺少足够细粒度日志来定位具体耗时点。

典型使用场景：

- `nanobot gateway --verbose`；
- 通过 WebUI 连接；
- 长 session 中连续多轮提问；
- 对响应启动速度敏感的交互式助手场景。

---

### WebUI 用户期待更强的透明度和控制感

相关 PR：

- #5856 https://github.com/HKUDS/nanobot/pull/5856
- #5855 https://github.com/HKUDS/nanobot/pull/5855
- #5850 https://github.com/HKUDS/nanobot/pull/5850
- #5852 https://github.com/HKUDS/nanobot/pull/5852
- #5851 https://github.com/HKUDS/nanobot/pull/5851

归纳反馈：

- 用户希望看到 agent 正在执行什么命令；
- 用户希望能检查和停止命令；
- 用户希望子任务结果能归属到父任务，并且不会无限增长；
- 用户希望文件、链接、图片等 artifact 有统一、安全、可预期的操作方式；
- 用户希望了解 token 使用、模型分布和历史趋势。

---

## 8. 待处理积压

根据今日数据，未发现“长期未响应”的旧 Issue 或 PR；当前待处理项主要是过去 24 小时内集中出现的新 PR 和新 Issue。虽然不属于长期积压，但以下事项建议维护者优先关注。

### 高优先级待处理

#### #5857 fix(memory): bound automatic transcript summarization  
链接：https://github.com/HKUDS/nanobot/pull/5857  
关联 Issue：https://github.com/HKUDS/nanobot/issues/5849  

建议尽快评审，重点检查：

- token budget 估算是否覆盖 system/developer prompt、tool schema、archive prompt；
- 裁剪策略是否会丢失关键上下文；
- 与手动 `archive_session` 的行为是否一致；
- 超长会话、极大 tool schema、不同 provider context window 的测试覆盖。

---

#### #5846 fix(agent): trace BUILD substage latency  
链接：https://github.com/HKUDS/nanobot/pull/5846  
关联 Issue：https://github.com/HKUDS/nanobot/issues/5843  

建议尽快合并诊断能力，以便收集真实用户日志。后续需要基于日志判断是否继续拆出性能修复 PR。

---

### 中优先级待处理

#### WebUI PR 队列较长，需要控制集成风险

当前 WebUI 相关开放 PR 数量较多：

- #5856 https://github.com/HKUDS/nanobot/pull/5856
- #5855 https://github.com/HKUDS/nanobot/pull/5855
- #5854 https://github.com/HKUDS/nanobot/pull/5854
- #5853 https://github.com/HKUDS/nanobot/pull/5853
- #5852 https://github.com/HKUDS/nanobot/pull/5852
- #5851 https://github.com/HKUDS/nanobot/pull/5851
- #5850 https://github.com/HKUDS/nanobot/pull/5850
- #5848 https://github.com/HKUDS/nanobot/pull/5848
- #5847 https://github.com/HKUDS/nanobot/pull/5847
- #5844 https://github.com/HKUDS/nanobot/pull/5844

建议维护者：

- 明确这些 PR 的依赖顺序，尤其 #5852 明确堆叠在 #5847 之上；
- 优先合并基础状态管理修复，如 #5847；
- 再合并共享 action/menu 类能力，如 #5850、#5852；
- 最后合并更复杂的 artifact、commands、subtasks、usage analytics；
- 对 WebUI 增加端到端回归测试，避免侧边栏、预览面板、composer、artifact 区域互相影响。

---

### 生态扩展待处理

#### #5845 Add Opper as a built-in provider  
链接：https://github.com/HKUDS/nanobot/pull/5845  

建议检查：

- OpenAI-compatible 行为是否与现有 gateway provider 一致；
- 错误处理、模型列表、认证环境变量文档是否完整；
- provider registry 顺序和文档是否清晰。

#### #5858 Adam Network MCP integration example  
链接：https://github.com/HKUDS/nanobot/pull/5858  

建议检查：

- 示例是否可复现；
- MCP endpoint 配置是否安全；
- 是否需要补充 agent 输出发布的权限、隐私和速率限制说明。

---

## 总体健康度评估

NanoBot 今日处于高活跃开发状态，PR 数量远高于 Issue 数量，说明维护和功能推进非常积极。项目当前最关键风险集中在长会话稳定性：自动压缩 token budget 和 BUILD 阶段延迟都直接影响核心 agent 体验。与此同时，WebUI 正在快速升级为多任务、多 artifact、多命令可视化工作台，这是明显的产品化信号。  
短期建议优先处理 #5857 和 #5846，确保长会话可靠性与可观测性；随后分批评审 WebUI PR，避免功能密集合并带来的回归风险。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-22  
仓库：NousResearch/hermes-agent

---

## 1. 今日速览

Hermes Agent 今日活跃度非常高：过去 24 小时内有 **50 条 Issue 更新**、**50 条 PR 更新**，并发布了 **1 个新版本 v2026.9.21 / Hermes Agent v0.21.4**。  
Issue 侧以 **Desktop 会话渲染、流式输出、会话状态、配置/升级、插件与工具注册** 为主要问题域，P2 级稳定性问题数量较多。  
PR 侧有大量针对当天新报问题的快速修复，例如 Desktop session scope、xAI reasoning 内容丢失、MCP 工具注销、update marker、doctor 配置校验等，说明维护响应速度较快。  
整体看，项目处于 **高速迭代与高问题暴露并存** 的状态：生态活跃、修复迅速，但 Desktop、Gateway、工具缓存、配置升级链路仍是稳定性压力点。

---

## 2. 版本发布

### v2026.9.21 — Hermes Agent v0.21.4

- Release：<https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.21>
- 发布时间：2026-09-21
- 类型：Patch release

本次版本说明显示，v0.21.4 是一个补丁发布版本，主要将自 v0.21.3 以来合并的约 **1,800 个 PR** 汇总为稳定标签，用于下游消费者，包括：

- Docker images
- Hermes Cloud
- Hosted deployments
- 其他依赖固定 tag 的部署环境

### 更新内容判断

由于 release note 当前仅展示了开头，完整 curated notes 尚未给出，因此无法确认所有细项变化。但从今日 Issue / PR 活跃主题看，v0.21.4 之后仍有大量修复正在排队，尤其集中在：

- Desktop transcript/session 渲染
- Gateway streaming 与 TTS
- 插件目录与插件 pin
- provider 适配，如 Anthropic、xAI、zai
- update / install / doctor 配置校验

### 破坏性变更

当前 release 数据中 **未明确列出 breaking changes**。建议维护者在后续补全 release note 时明确标注：

- 是否有配置字段变更
- Gateway / Desktop 升级路径是否需要重启
- Plugin Catalog pin 是否影响已有安装
- provider 适配层是否改变响应归一化逻辑

### 迁移注意事项

基于今日新报问题，升级到 v2026.9.21 后建议用户特别注意：

1. **Desktop 用户升级后检查 Gateway 是否真正重启**  
   相关问题：[#118643](https://github.com/NousResearch/hermes-agent/issues/118643)、[#118742](https://github.com/NousResearch/hermes-agent/issues/118742)

2. **长生命周期 Gateway 用户注意工具定义缓存**  
   新安装依赖后工具可能不可见。  
   相关问题：[#118752](https://github.com/NousResearch/hermes-agent/issues/118752)  
   修复 PR：[#118754](https://github.com/NousResearch/hermes-agent/pull/118754)

3. **Desktop 会话、后台 review、reasoning-only 输出场景仍有风险**  
   相关问题：[#118693](https://github.com/NousResearch/hermes-agent/issues/118693)、[#118755](https://github.com/NousResearch/hermes-agent/issues/118755)、[#118738](https://github.com/NousResearch/hermes-agent/issues/118738)

---

## 3. 项目进展

过去 24 小时 PR 更新总计 **50 条**，其中 **46 条待合并，4 条已合并或关闭**。当前数据未提供这 4 条已合并/关闭 PR 的具体编号，因此无法逐条确认已落地内容。以下为今日最重要的待合并推进项，它们多与当天 Issue 形成直接闭环。

### Desktop 与会话状态修复

- PR：[#118749 fix(desktop): scope message.reaction events to the active session transcript](https://github.com/NousResearch/hermes-agent/pull/118749)  
  对应 Issue：[#118748](https://github.com/NousResearch/hermes-agent/issues/118748)  
  修复后台 session 的 `message.reaction` 事件错误修改前台 transcript 的问题。该修复直接改善多会话并发使用下的 Desktop 正确性。

- PR：[#118730 fix(desktop): resolve the serve subcommand positionally when a profile is named "serve"](https://github.com/NousResearch/hermes-agent/pull/118730)  
  对应 Issue：[#118729](https://github.com/NousResearch/hermes-agent/issues/118729)  
  修复 profile 名称为 `serve` 时与真实子命令冲突的问题，属于 CLI / Desktop 参数解析边界问题。

- PR：[#118745 fix(update): discharge desktop-only fleet markers](https://github.com/NousResearch/hermes-agent/pull/118745)  
  对应 Issue：[#118742](https://github.com/NousResearch/hermes-agent/issues/118742)  
  解决 Desktop-only 主机上 stranded `fleet_restart_pending` marker 导致后续 update 持续失败的问题。

### Provider 与响应归一化

- PR：[#118747 fix(agent): promote xAI tool-call turn narration from reasoning into content](https://github.com/NousResearch/hermes-agent/pull/118747)  
  对应 Issue：[#118738](https://github.com/NousResearch/hermes-agent/issues/118738)  
  修复 xAI Grok 工具调用场景下回答只存在 reasoning summary 中，Desktop 在关闭 reasoning 展示时误以为内容为空的问题。

- PR：[#118750 plugin-catalog: claude-subscription-directsdk pin → f1c1220](https://github.com/NousResearch/hermes-agent/pull/118750)  
  关联 Issue：[#118622](https://github.com/NousResearch/hermes-agent/issues/118622)  
  更新 Claude subscription direct SDK 插件 pin，带来 5 个插件修复。该方向与 prompt cache 写入放大问题高度相关。

### 工具、MCP 与插件边界

- PR：[#118754 fix(tools): refresh gated tool schemas after driver install](https://github.com/NousResearch/hermes-agent/pull/118754)  
  对应 Issue：[#118752](https://github.com/NousResearch/hermes-agent/issues/118752)  
  修复长生命周期 Gateway 中安装 driver 后工具 schema 缓存不刷新的问题。

- PR：[#118736 fix(mcp): keep foreign-owned tool names out of MCP deregistration sweeps](https://github.com/NousResearch/hermes-agent/pull/118736)  
  对应 Issue：[#118735](https://github.com/NousResearch/hermes-agent/issues/118735)  
  防止 MCP lazy-connect 清理过程误删除非 MCP 所有的工具注册。

- PR：[#118733 fix(tools): write_file's non-string 'content' error names the recovery](https://github.com/NousResearch/hermes-agent/pull/118733)  
  改善工具错误提示的可恢复性，降低 agent 反复调用错误参数的概率。

### 配置、doctor 与运维体验

- PR：[#118728 fix: validate auto auxiliary provider credentials](https://github.com/NousResearch/hermes-agent/pull/118728)  
  对应 Issue：[#118721](https://github.com/NousResearch/hermes-agent/issues/118721)  
  改进 `provider: auto` 场景下辅助模型凭证校验。

- PR：[#118731 fix(doctor): skip unconsumed auxiliary routes](https://github.com/NousResearch/hermes-agent/pull/118731)  
  对应 Issue：[#118720](https://github.com/NousResearch/hermes-agent/issues/118720)  
  避免 `hermes doctor` 对无消费者的辅助路由报硬错误。

- PR：[#118741 fix(agent): bump iron-proxy to v0.50.0](https://github.com/NousResearch/hermes-agent/pull/118741)  
  对应 Issue：[#118734](https://github.com/NousResearch/hermes-agent/issues/118734)  
  将 `iron-proxy` pin 从 0.39.0 升级到 0.50.0。

- PR：[#118744 fix(egress): let operators override the pinned iron-proxy version via HERMES_IRON_PROXY_VERSION](https://github.com/NousResearch/hermes-agent/pull/118744)  
  同样对应 Issue：[#118734](https://github.com/NousResearch/hermes-agent/issues/118734)  
  提供环境变量覆盖 pin 的运维出口。

---

## 4. 社区热点

### 1. Desktop transcript 与后台 review 并发导致渲染缺失

- Issue：[#118693](https://github.com/NousResearch/hermes-agent/issues/118693)
- 评论数：2
- 标签：`type/bug`, `comp/agent`, `comp/desktop`, `area/sessions`, `P2`

用户反馈在一次 chat turn 后立即触发自动 background review 时，Desktop transcript pane 无法正确渲染已完成 turn。该问题反映出 Hermes 在 **主会话流与后台 review fork 共用 session 状态** 时仍存在隔离不足。  
背后的核心诉求是：用户希望后台自我审查、记忆总结、技能 review 等任务不应影响前台对话可见性。

### 2. ntfy adapter 配置路径不一致

- Issue：[#118684](https://github.com/NousResearch/hermes-agent/issues/118684)
- 评论数：2
- 标签：`comp/gateway`, `comp/cron`, `comp/plugins`, `area/config`, `P3`

ntfy adapter 在 `config.yaml` 中配置 topic 时无法注册，因为 requirement 检查只读环境变量 `NTFY_TOPIC`。同时日志提示把安装提示误报成缺失依赖。  
该问题显示用户期望 Hermes 的配置来源具有一致性：如果文档或配置支持 `config.yaml`，运行时检查也必须遵守同一来源。

### 3. Desktop 关闭 session tile 中断后台 turn

- Issue：[#118628](https://github.com/NousResearch/hermes-agent/issues/118628)
- 评论数：2
- 标签：`comp/desktop`, `area/sessions`, `P2`

用户指出关闭 session tile 会对 mid-flight turn 发送 `session.interrupt`，即使该 turn 只是用户希望继续在后台运行的任务。  
该问题代表 Desktop 用户对 “关闭视图” 与 “停止任务” 的语义区分需求：UI 层关闭不应默认等同于任务取消。

### 4. iron-proxy pin 落后

- Issue：[#118734](https://github.com/NousResearch/hermes-agent/issues/118734)
- PR：[#118741](https://github.com/NousResearch/hermes-agent/pull/118741)、[#118744](https://github.com/NousResearch/hermes-agent/pull/118744)
- 评论数：1

用户指出内置 `iron-proxy` pin 停留在 0.39.0，而上游已发布 0.50.0。当天即出现两个修复方向：直接 bump 与提供 env override。  
这是一个典型的运维可控性诉求：安全边界组件不能长期固定在旧版本，且生产用户需要 override 机制。

### 5. Claude subscription direct SDK prompt cache 写入放大

- Issue：[#118622](https://github.com/NousResearch/hermes-agent/issues/118622)
- PR：[#118750](https://github.com/NousResearch/hermes-agent/pull/118750)

用户报告在工具密集会话中，prompt-cache writes 相比 Claude Code 放大 28.9 倍。该问题集中在成本、性能和 provider 集成效率上。  
相关插件 pin 更新已经出现，说明该问题可能会在插件层先行缓解。

---

## 5. Bug 与稳定性

以下按严重程度与影响面排序。

### P2 / 高优先级

#### Desktop transcript / session state

1. **后台 review 干扰前台 transcript 渲染**  
   Issue：[#118693](https://github.com/NousResearch/hermes-agent/issues/118693)  
   状态：Open，暂无明确 fix PR  
   影响：前台对话可见性，session 状态一致性。

2. **关闭 session tile 会中断 mid-flight turn**  
   Issue：[#118628](https://github.com/NousResearch/hermes-agent/issues/118628)  
   状态：Open，暂无明确 fix PR  
   影响：后台任务可靠性，用户可能误中断长任务。

3. **长 streaming turn 在 Desktop 中实时渲染两次**  
   Issue：[#118670](https://github.com/NousResearch/hermes-agent/issues/118670)  
   状态：Open，暂无明确 fix PR  
   影响：UI 层重复渲染；数据库仅有一份，说明问题可能在 live stream accumulator 或前端 reconciliation。

4. **reasoning-only turns 流式显示后消失**  
   Issue：[#118755](https://github.com/NousResearch/hermes-agent/issues/118755)  
   状态：Open，暂无明确 fix PR  
   影响：本地 Qwen / 自定义 OpenAI-compatible provider 用户。

5. **xAI Grok 工具调用回答被保存到 reasoning 而非 content**  
   Issue：[#118738](https://github.com/NousResearch/hermes-agent/issues/118738)  
   Fix PR：[#118747](https://github.com/NousResearch/hermes-agent/pull/118747)  
   影响：关闭 reasoning 展示时，用户看到空回复或回复消失。

6. **message.reaction 跨 session 修改前台 transcript**  
   Issue：[#118748](https://github.com/NousResearch/hermes-agent/issues/118748)  
   Fix PR：[#118749](https://github.com/NousResearch/hermes-agent/pull/118749)  
   影响：多 session 并发下前台 UI 数据污染。

#### 安装、升级与配置

7. **Desktop Update + external supervisor Gateway 留在旧 sys.modules**  
   Issue：[#118643](https://github.com/NousResearch/hermes-agent/issues/118643)  
   状态：Open，暂无明确 fix PR  
   影响：升级成功但运行进程仍加载旧模块，可能导致 ImportError。

8. **Desktop-only host 上 fleet_restart_pending marker 无法清除**  
   Issue：[#118742](https://github.com/NousResearch/hermes-agent/issues/118742)  
   Fix PR：[#118745](https://github.com/NousResearch/hermes-agent/pull/118745)  
   影响：后续 `hermes update` 持续 exit 1。

9. **`get_default_hermes_root` 未捕获 Path.resolve OSError**  
   Issue：[#118618](https://github.com/NousResearch/hermes-agent/issues/118618)  
   状态：Open，暂无明确 fix PR  
   影响：异常 HOME / HERMES_HOME 环境下启动失败。

10. **doctor 对 auxiliary provider 校验不准确**  
    Issues：[#118721](https://github.com/NousResearch/hermes-agent/issues/118721)、[#118720](https://github.com/NousResearch/hermes-agent/issues/118720)  
    Fix PRs：[#118728](https://github.com/NousResearch/hermes-agent/pull/118728)、[#118731](https://github.com/NousResearch/hermes-agent/pull/118731)  
    影响：配置诊断误报或漏报，影响用户排障。

#### MCP / 工具注册 / 工具缓存

11. **MCP lazy-connect phantom cleanup 可能删除外部工具注册**  
    Issue：[#118735](https://github.com/NousResearch/hermes-agent/issues/118735)  
    Fix PR：[#118736](https://github.com/NousResearch/hermes-agent/pull/118736)  
    影响：工具命名冲突时造成非 MCP 工具丢失，属于工具注册安全边界问题。

12. **gated tool dependency 安装后工具定义缓存不刷新**  
    Issue：[#118752](https://github.com/NousResearch/hermes-agent/issues/118752)  
    Fix PR：[#118754](https://github.com/NousResearch/hermes-agent/pull/118754)  
    影响：长生命周期 Gateway 中新装工具对所有 session 不可见。

13. **skill_manage batch rollback 将 symlink skill dir 转为真实目录**  
    Issue：[#118699](https://github.com/NousResearch/hermes-agent/issues/118699)  
    状态：Open，暂无明确 fix PR  
    影响：技能管理回滚破坏文件结构。

### P3 / 中低优先级但影响体验或成本

14. **ntfy adapter 无法从 config.yaml 注册**  
    Issue：[#118684](https://github.com/NousResearch/hermes-agent/issues/118684)  
    状态：Open，暂无明确 fix PR

15. **Curator ledger 无限增长**  
    Issue：[#118674](https://github.com/NousResearch/hermes-agent/issues/118674)  
    状态：Open，暂无明确 fix PR  
    影响：长期使用 profile 下 `.curator_ledger.jsonl` 膨胀，属于性能与磁盘占用问题。

16. **zai GLM-5.x `<think>` 泄漏到 memory content**  
    Issue：[#118673](https://github.com/NousResearch/hermes-agent/issues/118673)  
    状态：Open，needs-repro  
    影响：reasoning 泄漏到记忆系统，可能污染长期记忆。

17. **mnemosyne_invalidate 跨 session 静默 no-op**  
    Issue：[#118672](https://github.com/NousResearch/hermes-agent/issues/118672)  
    状态：Open  
    影响：memory invalidation 反馈与实际 DB 状态不一致。

18. **streaming_tts_consumer 测试失败与 pending task warning**  
    Issue：[#118658](https://github.com/NousResearch/hermes-agent/issues/118658)  
    状态：Open  
    影响：Gateway TTS streaming 测试稳定性。

19. **Camofox VNC live-view link 无法发现**  
    Issue：[#118619](https://github.com/NousResearch/hermes-agent/issues/118619)  
    状态：Open  
    影响：browser tool 的可观测性与调试体验。

20. **Feishu 多工具进度重复、空 fenced code blocks**  
    Issue：[#118702](https://github.com/NousResearch/hermes-agent/issues/118702)  
    状态：Open  
    影响：企业 IM 集成中的消息可读性。

---

## 6. 功能请求与路线图信号

### 1. Conversation indexing 与 semantic compaction

- PR：[#118740 feat: add derived conversation indexing and semantic compaction](https://github.com/NousResearch/hermes-agent/pull/118740)
- 标签：`needs-decision`, `area/memory`, `area/compression`

这是今日最明显的路线图型 PR。它提出 provider-neutral 的 derived conversation indexing，并保持现有 session store 作为 canonical transcript。  
如果被接受，Hermes 可能在下一阶段强化：

- 长对话检索
- 语义压缩
- provider 插件参与上下文压缩
- memory / compression 子系统解耦

### 2. pre_verify 覆盖 effect-tool turns

- PR：[#118739 feat(agent): fire pre_verify for effect-tool turns, not only file edits](https://github.com/NousResearch/hermes-agent/pull/118739)

该 PR 扩展 verification gate，不再只覆盖 `write_file` / `patch`，而是覆盖 terminal、execute_code、部署、发送邮件、重启服务等有外部副作用的工具。  
这体现了 Hermes 对 **agent 行为可验证性与安全边界** 的增强方向。

### 3. Plugin hooks 增加 gateway_session_key

- Issue：[#118717](https://github.com/NousResearch/hermes-agent/issues/118717)

用户希望插件的 `pre_tool_call` / `post_tool_call` hook 能拿到稳定的 `gateway_session_key`，而不是只有 transcript `session_id`。  
该需求说明插件作者正在构建更复杂的跨系统关联、审计、遥测或权限控制能力。

### 4. Desktop in-app Browser 暴露给插件

- Issue：[#118703](https://github.com/NousResearch/hermes-agent/issues/118703)

插件目前能调用 `host.revealPane('preview')`，但不能确保打开 Browser tab。用户希望插件能够直接操控或打开 Desktop 内置 Browser。  
这显示 Desktop 插件生态正在从简单按钮/命令扩展到更完整的 UI 工作流集成。

### 5. Chinese-context PII redaction / desensitize plugin

- Issue：[#118722](https://github.com/NousResearch/hermes-agent/issues/118722)
- PR：[#118727](https://github.com/NousResearch/hermes-agent/pull/118727)

社区提出中文语境下的 PII 脱敏，包括姓名、公司名、地址、数量级等。已有对应 plugin catalog PR。  
这是插件生态国际化与合规能力增强的信号，尤其适合中文企业用户、本地知识库与客服场景。

### 6. Hermes Switchyard 插件加入目录

- PR：[#118732](https://github.com/NousResearch/hermes-agent/pull/118732)

将 Hermes Switchyard v0.5.1 加入社区插件目录，说明 Plugin Catalog 仍在持续扩展。  
如果快速合入，短期内会提高用户通过 catalog 安装社区能力的便利性。

---

## 7. 用户反馈摘要

### 主要痛点

1. **Desktop 用户对 session 隔离要求更高**  
   多个 Issue 都指向同一个核心问题：后台任务、后台 session、reaction、background review 不应污染或中断当前可见 transcript。  
   相关：[#118693](https://github.com/NousResearch/hermes-agent/issues/118693)、[#118628](https://github.com/NousResearch/hermes-agent/issues/118628)、[#118748](https://github.com/NousResearch/hermes-agent/issues/118748)

2. **流式输出最终态与实时态不一致**  
   用户看到内容流式出现，但 turn settle 后消失、重复或变为空。这类问题对信任感影响很大，因为用户会认为 agent “说了又删了”。  
   相关：[#118755](https://github.com/NousResearch/hermes-agent/issues/118755)、[#118738](https://github.com/NousResearch/hermes-agent/issues/118738)、[#118670](https://github.com/NousResearch/hermes-agent/issues/118670)

3. **升级与长期运行进程的状态管理不够透明**  
   Desktop update 成功但 Gateway 仍加载旧模块，或 marker 无法清除导致后续升级失败，都会让用户难以判断当前系统是否处于一致状态。  
   相关：[#118643](https://github.com/NousResearch/hermes-agent/issues/118643)、[#118742](https://github.com/NousResearch/hermes-agent/issues/118742)

4. **配置诊断需要更贴近真实 runtime**  
   `hermes doctor` 的误报与漏报说明用户依赖 doctor 进行排障，但当前校验逻辑与实际 runtime 消费路径仍有差异。  
   相关：[#118720](https://github.com/NousResearch/hermes-agent/issues/118720)、[#118721](https://github.com/NousResearch/hermes-agent/issues/118721)

5. **插件和工具生态正在进入生产化阶段**  
   用户不只要求“能安装插件”，还要求插件能获得稳定 session key、能打开 Desktop Browser、能处理中文 PII、能避免工具注册冲突。  
   相关：[#118717](https://github.com/NousResearch/hermes-agent/issues/118717)、[#118703](https://github.com/NousResearch/hermes-agent/issues/118703)、[#118722](https://github.com/NousResearch/hermes-agent/issues/118722)、[#118735](https://github.com/NousResearch/hermes-agent/issues/118735)

### 满意点

- 维护者/贡献者响应速度很快，多个当天新开 Issue 已经有对应 PR：
  - [#118748](https://github.com/NousResearch/hermes-agent/issues/118748) → [#118749](https://github.com/NousResearch/hermes-agent/pull/118749)
  - [#118735](https://github.com/NousResearch/hermes-agent/issues/118735) → [#118736](https://github.com/NousResearch/hermes-agent/pull/118736)
  - [#118729](https://github.com/NousResearch/hermes-agent/issues/118729) → [#118730](https://github.com/NousResearch/hermes-agent/pull/118730)
  - [#118742](https://github.com/NousResearch/hermes-agent/issues/118742) → [#118745](https://github.com/NousResearch/hermes-agent/pull/118745)
  - [#118738](https://github.com/NousResearch/hermes-agent/issues/118738) → [#118747](https://github.com/NousResearch/hermes-agent/pull/118747)

### 不满意点

- Desktop 体验仍然容易受到边界条件影响，尤其是长 streaming、后台 review、多 session、reasoning-only provider。
- 运维类错误信息与真实原因有时不一致，例如 ntfy dependency 提示、doctor 误报、update marker。
- 长生命周期进程中的 cache invalidation 问题反复出现，说明 Gateway 的热更新、依赖安装、工具注册需要更明确的 invalidation 策略。

---

## 8. 待处理积压

当前数据仅覆盖过去 24 小时，无法严格判断“长期未响应”的 Issue 或 PR。以下是从今日数据看应优先关注、且仍处于 Open 状态的重要积压项。

### 高优先级建议关注

1. **Desktop transcript 与后台 review 并发问题**  
   Issue：[#118693](https://github.com/NousResearch/hermes-agent/issues/118693)  
   原因：P2，会话状态核心路径，暂无 fix PR。

2. **关闭 session tile 中断后台 turn**  
   Issue：[#118628](https://github.com/NousResearch/hermes-agent/issues/118628)  
   原因：P2，影响用户对后台任务的信任。

3. **Desktop long streaming live duplicate rendering**  
   Issue：[#118670](https://github.com/NousResearch/hermes-agent/issues/118670)  
   原因：P2，长任务和多工具调用场景常见，且 DB 与 UI 状态不一致。

4. **Desktop reasoning-only turns settle 后消失**  
   Issue：[#118755](https://github.com/NousResearch/hermes-agent/issues/118755)  
   原因：影响本地模型 / custom provider 用户，属于新兴 provider 兼容性问题。

5. **Desktop Update + external supervisor stale sys.modules**  
   Issue：[#118643](https://github.com/NousResearch/hermes-agent/issues/118643)  
   原因：P2，升级链路风险较高，可能导致用户认为已升级但实际运行旧代码。

6. **ntfy adapter config.yaml 不生效**  
   Issue：[#118684](https://github.com/NousResearch/hermes-agent/issues/118684)  
   原因：配置一致性问题，虽为 P3，但影响 Gateway/plugin 可用性与用户排障。

7. **Curator ledger 无限增长**  
   Issue：[#118674](https://github.com/NousResearch/hermes-agent/issues/118674)  
   原因：长期使用会积累性能和磁盘问题，建议设计 compaction 或 retention policy。

8. **memory invalidation 静默 no-op**  
   Issue：[#118672](https://github.com/NousResearch/hermes-agent/issues/118672)  
   原因：工具返回成功但 DB 无变化，可能造成用户对 memory 操作结果的错误认知。

### 待维护者决策的较大设计项

1. **Derived conversation indexing and semantic compaction**  
   PR：[#118740](https://github.com/NousResearch/hermes-agent/pull/118740)  
   建议：需要 architecture review，明确 canonical transcript 与 derived index 的一致性边界。

2. **pre_verify 扩展到 effect-tool turns**  
   PR：[#118739](https://github.com/NousResearch/hermes-agent/pull/118739)  
   建议：需要安全模型评审，确定哪些工具算 effect-capable，以及误拦截成本。

3. **iron-proxy bump vs override 两个并行方案**  
   PR：[#118741](https://github.com/NousResearch/hermes-agent/pull/118741)、[#118744](https://github.com/NousResearch/hermes-agent/pull/118744)  
   建议：维护者应决定是否两者都保留。较稳妥路径是：默认 bump 到 0.50.0，同时保留 `HERMES_IRON_PROXY_VERSION` 作为运维 escape hatch。

---

## 综合健康度评估

- **活跃度：高**  
  24 小时内 100 条 Issue/PR 更新，且有新版本发布。

- **响应速度：高**  
  多个新报 Bug 在同日出现对应 PR，社区贡献密集。

- **稳定性风险：中高**  
  P2 问题集中在 Desktop session state、streaming、升级和工具注册，均属于核心路径。

- **生态成熟度：上升中**  
  Plugin Catalog、中文 PII、Desktop 插件能力、MCP、provider 适配均在扩展。

- **维护建议**  
  下一阶段应优先收敛 Desktop/session/streaming 一致性问题，并为 Gateway 长生命周期缓存、升级重启、工具注册建立更系统的 invalidation 与状态验证机制。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
日期：2026-09-22  
仓库：<https://github.com/sipeed/picoclaw>

## 1. 今日速览

过去 24 小时内，PicoClaw 项目活跃度较低：没有新的 Issue 更新，也没有版本发布。PR 方面仅出现 1 条更新，且该 PR 已关闭，内容为误提交到错误仓库的请求，并未带来实际代码变更或项目推进。整体来看，今日项目处于相对静默状态，未观察到功能开发、Bug 修复或社区讨论的实质性进展。项目健康度短期内保持稳定，但从今日数据看，维护与社区互动信号较弱。

---

## 2. 项目进展

### 已关闭 PR

#### #3384 Misplaced PR, please ignore.  
- 链接：<https://github.com/sipeed/picoclaw/pull/3384>  
- 状态：Closed  
- 作者：stpinkie  
- 创建时间：2026-09-21  
- 更新时间：2026-09-21  
- 评论数：无数据  
- 👍：0  

该 PR 明确说明是由 AI agent 误提交到错误仓库的请求，作者也标注“please ignore”。因此，该 PR 的关闭属于仓库维护层面的清理操作，不涉及功能新增、Bug 修复、文档改进或测试增强。

**项目推进评估：**  
今日没有实质性代码合入或功能变更，项目整体推进幅度可视为 0。该 PR 的关闭有助于保持 PR 列表整洁，但不构成产品或技术层面的进展。

---

## 3. 社区热点

今日没有活跃的 Issue 讨论，也没有高互动 PR。

唯一更新的 PR 为：

- #3384 Misplaced PR, please ignore.  
  链接：<https://github.com/sipeed/picoclaw/pull/3384>  

该 PR 没有点赞，也未体现出社区讨论热度。其背后反映的问题并非 PicoClaw 用户需求，而是自动化或 AI agent 提交流程中的仓库定位错误。维护者可以关注是否需要在贡献指南中增加更明确的仓库边界说明，或在 CI/PR 模板中提示提交者确认目标仓库。

---

## 4. Bug 与稳定性

过去 24 小时内未发现新的 Bug 报告、崩溃问题或回归问题。

| 严重程度 | 问题 | 状态 | Fix PR |
|---|---|---|---|
| 高 | 无 | - | - |
| 中 | 无 | - | - |
| 低 | 无 | - | - |

从今日数据看，项目稳定性没有新增负面信号。但由于没有 Issue 活动，也无法判断是否存在未报告或外部渠道反馈的问题。

---

## 5. 功能请求与路线图信号

过去 24 小时内没有新的功能请求，也没有与路线图相关的 Issue 或 PR。

当前唯一 PR #3384 为误提交内容，不具备产品方向或版本规划参考价值。

- PR：<https://github.com/sipeed/picoclaw/pull/3384>

因此，今日无法从社区数据中提炼出下一版本可能纳入的功能方向。

---

## 6. 用户反馈摘要

今日没有 Issue 评论或用户反馈数据可供分析。

从现有数据看，未出现以下类型的用户信号：

- 使用障碍或配置困难
- 功能缺口反馈
- 文档不清晰问题
- 性能、稳定性或兼容性抱怨
- 对已有功能的正向反馈

唯一事件是误投 PR，不能视为真实用户反馈。

---

## 7. 待处理积压

基于本次提供的过去 24 小时数据，没有发现长期未响应的重要 Issue 或 PR。

需要注意的是，当前数据仅覆盖最近 24 小时活动，无法全面判断仓库中是否存在历史积压问题。建议维护者后续重点关注：

- 长期未关闭的 open Issues
- 长期未 review 的 open PRs
- 标记为 bug、regression、help wanted、good first issue 的未处理事项
- 最近无维护者回复但仍有用户追问的问题

今日唯一相关 PR 已关闭：

- #3384 Misplaced PR, please ignore.  
  链接：<https://github.com/sipeed/picoclaw/pull/3384>

---

## 今日健康度总结

PicoClaw 今日整体处于低活跃、无实质变更状态。没有新增 Issue、没有版本发布、没有有效功能或修复 PR。唯一关闭的 PR 是误提交请求，对项目代码与路线图没有影响。短期来看项目状态稳定，但社区活跃度和开发推进信号偏弱，建议持续观察后续是否有正常的 Issue、PR 或 Release 活动恢复。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
日期：2026-09-22  
仓库：github.com/qwibitai/nanoclaw

## 1. 今日速览

过去 24 小时 NanoClaw 项目活跃度偏低但仍有有效维护信号：新增/活跃 Issue 1 条、开放 PR 1 条，暂无合并、关闭或新版本发布。今日动态主要集中在两个方向：一是启动脚本在特定环境变量下的稳定性问题，二是 WhatsApp 渠道注册体验优化。当前没有高评论量或高反应量的社区讨论，说明今日社区互动较为平静。整体看，项目处于小步修复与适配阶段，维护节奏正常但短期推进幅度有限。

---

## 2. 项目进展

过去 24 小时暂无已合并或已关闭的重要 PR，因此尚未形成可落地的代码进展。

### 待合并 PR

#### PR #3859：[area/channels] fix(whatsapp): implement resolveChannelName so registration cards can name a group  
- 状态：OPEN  
- 作者：IamAdamJowett  
- 创建时间：2026-09-21  
- 链接：https://github.com/qwibitai/nanoclaw/pull/3859  

**内容概述：**  
该 PR 为 WhatsApp 适配器实现 `resolveChannelName`，使未知渠道注册卡片能够显示具体 WhatsApp 群组名称，而不是泛化地显示为 “a whatsapp channel”。

**影响分析：**  
- 改善 WhatsApp 群组接入时的识别体验。  
- 有助于提升多渠道注册流程中的可读性和用户信任感。  
- 属于渠道适配层的体验修复，风险相对可控。  

**项目推进程度：**  
由于尚未合并，今日实际推进尚未进入主分支。但该 PR 一旦合并，将补齐 WhatsApp adapter 在频道命名解析上的能力，属于小型但明确的产品体验改进。

---

## 3. 社区热点

今日没有明显的高热度讨论。所有新增/活跃事项均无评论、无点赞反应，社区互动较低。

### 当前值得关注的讨论

#### Issue #3860：restart.sh: FORCE_COLOR makes the restart timestamp unparseable  
- 状态：OPEN  
- 作者：witek  
- 评论数：0  
- 👍：0  
- 链接：https://github.com/qwibitai/nanoclaw/issues/3860  

**讨论焦点：**  
该问题指出 `setup/lib/restart.sh` 中通过 Node.js 输出 `Date.now()` 获取启动时间戳时，若子进程继承了 `pnpm` 导出的 `FORCE_COLOR=1`，Node 可能会对数字输出进行颜色转义，导致生成的时间戳无法被后续逻辑解析。

**背后诉求：**  
用户期望 NanoClaw 的安装、重启、开发脚本在包管理器或终端环境变量变化下保持稳定，避免因 ANSI color escape code 这类环境细节导致脚本失败。

---

## 4. Bug 与稳定性

### 严重程度：中等

#### Issue #3860：`restart.sh` 中 `FORCE_COLOR` 导致 restart timestamp 无法解析  
- 状态：OPEN  
- 作者：witek  
- 链接：https://github.com/qwibitai/nanoclaw/issues/3860  
- 是否已有 fix PR：当前数据中未看到对应修复 PR  

**问题描述：**  
`setup/lib/restart.sh` 使用如下方式生成启动时间戳：

```sh
started_after="$(node -e 'console.log(Date.now())')"
```

在 `pnpm` 环境下，`FORCE_COLOR=1` 会被导出到子进程。Node.js 在 `console.log` 输出数字时可能加入颜色控制字符，导致输出结果不是纯数字，从而出现 “Invalid restart time” 类错误。

**影响范围：**  
- 可能影响使用 `pnpm` 或启用了 `FORCE_COLOR` 的开发/部署环境。  
- 主要影响重启脚本、安装流程或自动化启动流程。  
- 如果该脚本用于 CI/CD 或生产部署，可能造成自动重启失败。  

**稳定性判断：**  
该问题不是核心业务逻辑崩溃，但会影响项目的可部署性和开发体验，建议优先修复。潜在修复方式包括：  
- 在 Node 命令中显式禁用颜色输出。  
- 使用 `process.stdout.write(String(Date.now()))` 替代 `console.log(Date.now())`。  
- 在 shell 层对输出做数字过滤。  
- 执行命令时覆盖 `FORCE_COLOR=0` 或 `NO_COLOR=1`。  

---

## 5. 功能请求与路线图信号

今日没有明确的新功能请求 Issue，但 PR #3859 释放了一个较清晰的路线图信号：NanoClaw 正在继续完善多渠道/消息渠道适配体验，尤其是 WhatsApp 场景。

### PR #3859：WhatsApp 群组名称解析能力  
- 链接：https://github.com/qwibitai/nanoclaw/pull/3859  

**路线图信号：**  
该 PR 表明项目在持续增强 channel adapter 的一致性和上下文可读性。`requestChannelApproval` 需要在注册卡片中展示更准确的 conversation/channel 名称，这意味着后续其他渠道 adapter 也可能需要实现类似的 `resolveChannelName` 或 `resolveConversation` 能力。

**可能纳入下一版本的内容：**  
- WhatsApp 群组注册卡片显示真实群组名称。  
- 更统一的渠道命名解析接口。  
- 更好的 unknown-channel onboarding/approval 体验。  

---

## 6. 用户反馈摘要

今日 Issues 和 PR 均无评论，因此没有足够的社区对话可提炼大规模用户情绪。但从提交内容可以看出两个明确痛点：

### 1. 启动/重启脚本需要对环境变量更鲁棒  
对应 Issue：#3860  
链接：https://github.com/qwibitai/nanoclaw/issues/3860  

用户痛点：  
- 在常见工具链如 `pnpm` 下，环境变量可能改变 Node 输出格式。  
- 当前脚本默认输出为纯数字，但未防御 ANSI color escape code。  
- 这类问题排查成本较高，容易让用户误以为重启逻辑或时间解析逻辑本身损坏。

### 2. WhatsApp 群组注册卡片的命名过于泛化  
对应 PR：#3859  
链接：https://github.com/qwibitai/nanoclaw/pull/3859  

用户痛点：  
- 注册审批卡片显示 “a whatsapp channel” 不够具体。  
- 在多个群组或多个渠道并行接入时，用户难以判断审批对象。  
- 更准确的群组名称有助于降低误操作风险。

---

## 7. 待处理积压

基于今日提供的数据，暂无长期未响应的重要 Issue 或 PR 可明确识别。当前需要维护者关注的待处理事项主要是今日新增/活跃的两个开放项：

### 待处理 Issue

#### #3860：restart.sh timestamp parsing failure under FORCE_COLOR  
- 状态：OPEN  
- 优先级建议：中  
- 链接：https://github.com/qwibitai/nanoclaw/issues/3860  

建议维护者尽快确认复现路径，并补充一个小型修复 PR。该问题修复成本预计不高，但对开发和部署体验有明显影响。

### 待处理 PR

#### #3859：WhatsApp resolveChannelName implementation  
- 状态：OPEN  
- 优先级建议：中低  
- 链接：https://github.com/qwibitai/nanoclaw/pull/3859  

建议维护者重点 review：  
- `resolveChannelName` 与现有 adapter interface 是否一致。  
- 对单聊、群聊、未知 conversation 的 fallback 行为是否合理。  
- 是否需要为其他 channel adapter 建立一致实现规范。  

---

## 健康度评估

**项目健康度：稳定但活跃度偏低。**

- 维护信号：有新增 Issue 和 PR，说明项目仍在被使用和改进。  
- 风险信号：今日无合并、无关闭、无 release，短期交付节奏较慢。  
- 技术风险：`FORCE_COLOR` 导致脚本输出污染的问题说明部分基础设施脚本对环境变化的防御不足。  
- 产品方向：WhatsApp 渠道体验仍在持续完善，多渠道 agent 场景是当前明显投入方向之一。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报  
**日期：2026-09-22**  
**仓库：** [nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. 今日速览

过去 24 小时，IronClaw 项目活跃度较低，仅有 **1 条 Issue 更新**，无 Pull Request 更新，也无新版本发布。今日唯一新增/活跃事项是每日基准测试失败分类报告，集中在 `officeqa` benchmark 的非通过任务分析上。该 Issue 没有评论和社区反应，说明当前更多是自动化或维护性监控活动，而非用户驱动的讨论。整体来看，项目今日处于 **低开发变更、持续质量观测** 状态。

---

## 2. 项目进展

过去 24 小时内未发现新的 PR 创建、合并或关闭记录。

- **PR 更新数：0**
- **待合并 PR：0**
- **已合并/关闭 PR：0**

因此，今日没有代码层面的功能推进、修复合入或架构调整。项目进展主要体现在 benchmark 失败归因分析的持续记录上，而非实际代码变更。

---

## 3. 社区热点

### [Issue #8106 — Daily ironclaw failure taxonomy — 2026-09-21](https://github.com/nearai/ironclaw/issues/8106)

- **状态：** Open  
- **作者：** pranavraja99  
- **创建时间：** 2026-09-21  
- **更新时间：** 2026-09-21  
- **评论数：** 0  
- **点赞/反应：** 0  

该 Issue 是一份每日失败分类报告，分析了 IronClaw 在 benchmark 中的非通过任务情况。其中提到 `officeqa` suite 中存在 **47 个 non-pass 任务**，并指出这些失败主要属于真实的模型质量问题，而非基础设施、测试框架或运行环境异常。

从内容来看，这类 Issue 的核心价值在于：

- 持续追踪 agent 在办公问答类任务中的失败模式；
- 区分模型能力问题与测试/环境问题；
- 为后续模型改进、prompt 调整、工具调用策略优化提供依据；
- 帮助维护者判断 benchmark 失败是否需要代码修复，还是需要模型层面的能力增强。

不过该 Issue 当前没有评论或社区反应，说明其尚未引发进一步讨论或行动项拆解。

---

## 4. Bug 与稳定性

### 高优先级

今日未发现明确的崩溃、回归、运行时异常或阻断性 bug 报告。

---

### 中优先级

#### [Issue #8106 — Daily ironclaw failure taxonomy — 2026-09-21](https://github.com/nearai/ironclaw/issues/8106)

- **类型：** Benchmark 失败分析 / 模型质量问题  
- **影响范围：** `officeqa` suite  
- **涉及 non-pass 任务数：** 47  
- **是否已有 fix PR：** 否，过去 24 小时无相关 PR  
- **严重程度评估：** 中等  

该 Issue 指出 `officeqa` benchmark 的失败主要是模型质量错误，而非系统性故障。这意味着问题可能不会通过简单代码修复解决，而更可能涉及以下方向：

- 模型选择或模型能力提升；
- agent 推理策略优化；
- 对办公文档/问答场景的任务理解增强；
- prompt、工具调用或上下文管理策略改进；
- benchmark 失败案例的进一步归类和可复现分析。

由于当前没有关联 PR，短期内尚未看到直接修复路径。

---

### 低优先级

未发现低优先级 bug 报告。

---

## 5. 功能请求与路线图信号

过去 24 小时未出现明确的新功能请求，也没有 PR 显示某项功能即将进入下一版本。

不过从 [Issue #8106](https://github.com/nearai/ironclaw/issues/8106) 中可以观察到一个潜在路线图信号：项目正在持续关注 benchmark failure taxonomy，即失败分类体系。这表明 IronClaw 可能在以下方向上持续投入：

- 更系统化的 agent 评测与回归分析；
- 针对不同任务 suite 的失败归因；
- 自动化质量监控；
- 将 benchmark 结果转化为模型或 agent 行为改进依据。

但由于今日没有 PR 或维护者评论，无法判断这些方向是否会被纳入近期版本计划。

---

## 6. 用户反馈摘要

今日没有来自用户评论的直接反馈。

基于唯一 Issue 的内容，可以间接提炼出以下质量关注点：

- **痛点：** 在 `officeqa` 场景中，模型仍存在较多非通过任务，说明 agent 在办公问答、文档理解或任务执行细节上仍有不足。
- **使用场景：** office QA 类任务，可能涉及办公文档理解、问题回答、信息检索与推理。
- **不满意点：** benchmark 结果显示模型质量错误较多，但当前 Issue 尚未给出具体修复方案或负责人。
- **满意点：** 项目有持续的每日失败分类机制，有助于维护 benchmark 健康度和长期质量追踪。

由于该 Issue 评论数为 0，以上仅为基于报告内容的归纳，并非直接用户表达。

---

## 7. 待处理积压

基于本次提供的数据，仅能看到过去 24 小时内的更新情况，无法完整判断长期未响应的 Issue 或 PR。

当前需要关注的开放事项：

### [Issue #8106 — Daily ironclaw failure taxonomy — 2026-09-21](https://github.com/nearai/ironclaw/issues/8106)

- **状态：** Open  
- **当前风险：** benchmark 失败已被记录，但尚无评论、责任人或修复 PR  
- **建议维护者关注：**
  - 是否需要将 47 个 `officeqa` non-pass 任务拆分为可执行子问题；
  - 是否应标记为模型质量问题、prompt 问题、工具调用问题或 benchmark 问题；
  - 是否需要关联历史 failure taxonomy，判断是否为持续性退化；
  - 是否需要创建后续修复/优化 PR 或追踪任务。

---

## 项目健康度评估

| 指标 | 今日状态 | 评估 |
|---|---:|---|
| Issue 活跃度 | 1 条 | 低 |
| PR 活跃度 | 0 条 | 很低 |
| Release 活跃度 | 0 个 | 无发布 |
| 社区讨论 | 0 评论 / 0 反应 | 很低 |
| 稳定性风险 | `officeqa` 47 个 non-pass | 中等 |
| 修复推进 | 无相关 PR | 偏弱 |

**总体判断：** IronClaw 今日处于低活跃维护状态。虽然没有代码合入或版本发布，但 benchmark 失败分类仍在持续进行，显示项目对质量监控保持关注。短期风险主要集中在 `officeqa` suite 的模型质量问题上，建议维护者将失败分类进一步转化为可执行的修复任务或模型优化计划。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报  
日期：2026-09-22  
仓库：netease-youdao/LobsterAI

---

## 1. 今日速览

过去 24 小时，LobsterAI 项目保持较高维护活跃度：共有 **1 条 Issue 更新**、**8 条 PR 更新**，其中 **7 条 PR 已关闭/完成处理**，另有 **1 条 PR 仍处于待合并状态**。  
今日工作重点集中在 **OpenClaw / Gateway 启动稳定性、IM 定时任务能力、浏览器凭据安全存储、前端渲染体验** 等方向，说明项目当前处于密集修复和体验打磨阶段。  
社区侧新增了一个明确的性能/体验类功能请求：希望 **切换工作区时无需重启网关**，反映出用户在本地资源受限场景下对效率的关注。  
整体来看，项目健康度较好：维护响应快、修复密度高，但 Gateway 启动链路和工作区切换体验仍是值得持续关注的稳定性与可用性重点。

---

## 2. 项目进展

今日共有 **8 个 PR 更新**，其中 **7 个已关闭/完成处理**，推进重点主要集中在以下几个方面。

### 2.1 OpenClaw / Gateway 启动稳定性修复

#### [PR #2735 - fix(openclaw): avoid startup failure on legacy identity conflicts](https://github.com/netease-youdao/LobsterAI/pull/2735)  
状态：CLOSED  
作者：btc69m979y-dotcom  
涉及领域：docs、openclaw

该 PR 修复了在以下场景下 Gateway 启动失败的问题：

- SQLite 中已有有效设备身份；
- 旧版 `identity/device.json` 中也存在有效身份；
- 两者不一致；
- 且缺少导入回执。

修复策略是让迁移逻辑遵循运行时读取器已有的权威规则：  
**保留 SQLite 身份，并妥善保存退役的 legacy 身份信息**。

这是一个偏底层的兼容性修复，有助于减少老用户升级或迁移过程中的 Gateway 启动失败风险。

---

#### [PR #2734 - fix(openclaw): migrate legacy weixin allowFrom files blocking gateway startup](https://github.com/netease-youdao/LobsterAI/pull/2734)  
状态：CLOSED  
作者：fisherdaddy  
涉及领域：renderer、main、openclaw、cowork

该 PR 处理了旧版微信授权文件阻塞 Gateway 就绪的问题。  
问题来源于旧文件：

- `credentials/openclaw-weixin-allowFrom.json`
- `credentials/openclaw-weixin-<account>-allowFrom.json`

这些 legacy 文件如果没有被正确迁移，会导致 OpenClaw 2026.8.1 无法完成 Gateway readiness，即使重启或 Quick Repair 也无法清理。

本次修复增加了 `openclawWeixinPairingMigration`，将已批准的 ID 合并到微信 channel config 中，并迁移旧文件。  
这对使用微信通道的老用户非常关键，属于启动路径上的重要稳定性修复。

---

#### [PR #2733 - PR-2704](https://github.com/netease-youdao/LobsterAI/pull/2733)  
状态：CLOSED  
作者：fisherdaddy  
涉及领域：main、openclaw

该 PR 修复了 macOS 下测试路径解析差异导致的本地测试失败问题。  
macOS 中 `os.tmpdir()` 位于 `/var/folders`，而 `/var` 实际是 `/private/var` 的软链接。测试实现使用真实路径，而测试断言使用未解析的 `mkdtemp` 路径，导致本地 macOS 失败、Linux CI 通过。

修复方式是对 `mkdtemp` 结果使用 `fs.realpathSync`。  
该改动提升了跨平台开发一致性，降低维护者在 macOS 本地开发时遇到假阳性测试失败的概率。

---

### 2.2 IM 与定时任务能力恢复

#### [PR #2737 - fix(im): restore native scheduled tasks and Feishu delivery](https://github.com/netease-youdao/LobsterAI/pull/2737)  
状态：CLOSED  
作者：btc69m979y-dotcom  
涉及领域：docs、main、openclaw

该 PR 修复了 IM 场景下自然语言定时提醒无法使用原生调度工具的问题，例如：

> “两分钟后提醒我喝水”

修复内容包括：

- 恢复符合 channel access policy 用户的 native scheduling tool；
- 保留现有工具权限；
- 保留来源飞书账号信息；
- 确保提醒可以投递回正确的 Feishu 账号。

这项修复直接改善了 IM 助手的实用性，尤其是将 LobsterAI 作为个人助手或团队 IM 助手使用的场景。

---

### 2.3 浏览器凭据与安全存储体验优化

#### [PR #2736 - feat(browserCredentials): request OS secure storage access explicitly](https://github.com/netease-youdao/LobsterAI/pull/2736)  
状态：CLOSED  
作者：fisherdaddy  
涉及领域：renderer、main

该 PR 调整了浏览器凭据存储与 OS keychain 访问方式。  
此前系统可能会在每次可用性检查时验证 OS keychain，本次改为：

- 只有用户主动选择时才通过 IPC 请求访问；
- 持久化最近一次可用性状态；
- 用户 opt-in 后首次保存时重试访问；
- 当 macOS OSCrypt 状态变化需要重启时，向前端暴露 `requiresRestart` 标识。

这项改动降低了不必要的系统级敏感权限访问，也提升了用户对凭据存储行为的可理解性和可控性。  
从产品体验角度看，这是向更透明、更安全的本地凭据管理迈进。

---

### 2.4 渲染与排版体验修复

#### [PR #2740 - fix(theme): restore CJK body weight to 400 to keep bold text distinguishable](https://github.com/netease-youdao/LobsterAI/pull/2740)  
状态：CLOSED  
作者：fisherdaddy  
涉及领域：renderer

该 PR 修复了中文等 CJK 字体下正文和加粗文本视觉区分度不足的问题。  
原因是 PingFang SC 的可变字重轴最高到 600，而正文使用 445 时，和 Markdown `<strong>` 加粗文本的 600 视觉差异被压缩，导致加粗不明显。

修复方式是将 CJK 正文字重恢复为 400。  
这属于细节体验修复，但对中文用户阅读 Markdown、文档、助手输出内容非常重要。

---

### 2.5 Web Search Skill 扩展仍待合并

#### [PR #2739 - Add optional keyless Parallel web search](https://github.com/netease-youdao/LobsterAI/pull/2739)  
状态：OPEN  
作者：georgeatparallel  
涉及领域：docs、skills

该 PR 为内置 web-search skill 增加 Parallel 搜索引擎支持。  
亮点是用户可以在没有 Parallel 账号、API Key 或浏览器连接的情况下运行：

```bash
WEB_SEARCH_ENGINE=parallel bash "$SKILLS_ROOT/web-search/scripts/search.sh" "query"
```

匿名访问使用 Fast 模式，并带有速率限制。

如果该 PR 被接受，LobsterAI 的 web search skill 将新增一个低门槛搜索后端，降低用户配置成本。  
不过，由于它涉及第三方搜索服务接入、匿名访问、速率限制和文档说明，预计维护者可能会重点审查稳定性、隐私和默认行为。

---

## 3. 社区热点

### 热点 1：[Issue #2738 - 支持不重启网关切换工作区，解决网关重启耗时问题](https://github.com/netease-youdao/LobsterAI/issues/2738)  
状态：OPEN  
作者：BlackPottery1928  
评论数：1  
反应数：0

这是今日唯一新增/活跃的 Issue，也是最明确的用户体验诉求。

用户反馈：  
当前每次切换工作区都需要重启网关。在本机性能有限的情况下，Gateway 启动耗时超过 10 秒，频繁切换工作区时体验较差。

核心诉求是：

- 工作区切换不应强依赖 Gateway 重启；
- 希望支持运行时切换 workspace；
- 减少等待时间，提高多工作区用户的操作效率。

该 Issue 与今日多个 Gateway 启动相关修复形成呼应：  
维护者今日已经在处理 Gateway 启动稳定性问题，而社区用户进一步提出了 **减少 Gateway 重启依赖** 的产品体验需求。

---

### 热点 2：[PR #2739 - Add optional keyless Parallel web search](https://github.com/netease-youdao/LobsterAI/pull/2739)  
状态：OPEN  
作者：georgeatparallel

该 PR 是今日唯一仍处于开放状态的 PR，代表外部贡献者对 skills 生态的扩展尝试。  
其背后诉求是降低 web search skill 的使用门槛，尤其是减少 API Key、账号、浏览器连接等前置条件。

如果合并，将增强 LobsterAI 作为智能体平台时的联网检索能力。

---

## 4. Bug 与稳定性

以下按影响程度和潜在用户影响范围排序。

### 高优先级：Gateway 启动被 legacy 微信 allowFrom 文件阻塞

- 相关 PR：[PR #2734](https://github.com/netease-youdao/LobsterAI/pull/2734)
- 状态：CLOSED
- 是否已有 fix：是

问题表现：  
OpenClaw 2026.8.1 在存在旧版微信 allowFrom 文件时可能无法完成 Gateway readiness，且重启或 Quick Repair 无法清理。

影响范围：  
使用过旧版微信通道配置、并升级到新版 OpenClaw 的用户。

风险评估：  
该问题会直接导致 Gateway 无法启动或无法就绪，属于启动路径关键问题。

---

### 高优先级：legacy identity 冲突导致 Gateway 启动失败

- 相关 PR：[PR #2735](https://github.com/netease-youdao/LobsterAI/pull/2735)
- 状态：CLOSED
- 是否已有 fix：是

问题表现：  
SQLite 设备身份与旧版 `identity/device.json` 均有效但不一致时，缺少导入回执可能导致 Gateway 启动失败。

影响范围：  
经历过身份存储迁移或长期使用旧版本升级的用户。

风险评估：  
属于升级兼容性问题，若触发会影响应用启动和连接能力。

---

### 中高优先级：IM 自然语言提醒无法使用原生调度工具

- 相关 PR：[PR #2737](https://github.com/netease-youdao/LobsterAI/pull/2737)
- 状态：CLOSED
- 是否已有 fix：是

问题表现：  
用户在 IM 中发起类似“几分钟后提醒我”的请求时，无法走原生 scheduled tasks，并且 Feishu 投递链路受影响。

影响范围：  
使用飞书或 IM 通道进行个人提醒、团队助手、日程提醒的用户。

风险评估：  
不一定影响启动，但会明显削弱 LobsterAI 作为个人助手的可用性。

---

### 中优先级：macOS 本地测试路径解析不一致

- 相关 PR：[PR #2733](https://github.com/netease-youdao/LobsterAI/pull/2733)
- 状态：CLOSED
- 是否已有 fix：是

问题表现：  
macOS 本地测试因 `/var` 与 `/private/var` 软链接解析差异失败，而 Linux CI 正常。

影响范围：  
主要影响维护者和 macOS 本地开发者。

风险评估：  
不会直接影响终端用户，但会影响开发效率和测试可信度。

---

### 中优先级：浏览器凭据存储权限访问时机不够明确

- 相关 PR：[PR #2736](https://github.com/netease-youdao/LobsterAI/pull/2736)
- 状态：CLOSED
- 是否已有 fix：是

问题表现：  
OS keychain 可用性检查可能在用户未明确选择时发生，影响权限访问透明度。

影响范围：  
使用浏览器凭据、需要系统安全存储的用户，尤其是 macOS 用户。

风险评估：  
更多属于安全体验和权限交互优化，但涉及敏感凭据管理，重要性较高。

---

### 低到中优先级：CJK 文本加粗不明显

- 相关 PR：[PR #2740](https://github.com/netease-youdao/LobsterAI/pull/2740)
- 状态：CLOSED
- 是否已有 fix：是

问题表现：  
中文字体下正文与 Markdown 加粗文本视觉差异不足。

影响范围：  
中文用户、文档阅读、聊天输出、Markdown 渲染场景。

风险评估：  
不影响功能正确性，但影响可读性和内容层级表达。

---

## 5. 功能请求与路线图信号

### 5.1 运行时切换工作区，避免 Gateway 重启

- Issue：[Issue #2738](https://github.com/netease-youdao/LobsterAI/issues/2738)
- 状态：OPEN
- 用户诉求：切换工作区时不重启 Gateway
- 当前热度：1 条评论，暂无 reaction

该需求是今日最重要的产品体验信号。  
用户明确指出 Gateway 启动耗时超过 10 秒，频繁切换工作区会带来明显等待成本。

结合今日多个 Gateway 启动稳定性修复来看，项目当前已经在强化 Gateway 相关基础设施。下一步如果要进一步提升体验，可能需要考虑：

- workspace 配置的热加载；
- Gateway 会话与 workspace 状态解耦；
- 按工作区隔离配置，但复用 Gateway 进程；
- 提供更轻量的 workspace switch 流程；
- 在无法完全免重启时，至少提供增量重载或后台预热。

该需求有较强路线图价值，尤其适合多项目、多身份、多团队场景。

---

### 5.2 无需 Key 的 Parallel Web Search

- PR：[PR #2739](https://github.com/netease-youdao/LobsterAI/pull/2739)
- 状态：OPEN
- 类型：功能增强
- 影响模块：skills、docs

该 PR 传递出的路线图信号是：  
LobsterAI 的内置 skills 正在向更低配置门槛、更开箱即用的方向发展。

潜在收益：

- 新用户无需申请 API Key 即可尝试 web search；
- 降低 skill 使用成本；
- 增强 Agent 联网检索能力；
- 丰富可选搜索后端。

潜在审查点：

- 匿名访问的速率限制；
- 第三方服务可用性；
- 隐私说明；
- 默认搜索引擎选择；
- 失败回退策略。

该 PR 有一定概率被纳入后续版本，但需要维护者确认服务边界和文档质量。

---

## 6. 用户反馈摘要

今日用户反馈主要来自 [Issue #2738](https://github.com/netease-youdao/LobsterAI/issues/2738)。

### 6.1 真实痛点

用户在本机性能有限的情况下，Gateway 启动耗时超过 10 秒。  
每次切换工作区都需要重启 Gateway，导致频繁切换时等待成本较高。

核心不满点：

- 重启 Gateway 过慢；
- 切换工作区操作不够轻量；
- 多工作区使用体验受到影响；
- 当前设计对低性能本地机器不够友好。

---

### 6.2 典型使用场景

该反馈暗示用户可能存在以下场景：

- 同时维护多个项目工作区；
- 频繁在不同 workspace 之间切换；
- 本地机器性能一般，Gateway 启动耗时明显；
- 将 LobsterAI 作为日常高频工具使用，而非偶尔启动一次。

这说明 LobsterAI 已经进入较真实的日常使用场景，用户开始关注操作流畅性和效率，而不仅仅是功能是否存在。

---

### 6.3 用户满意与不满意信号

满意信号：

- 用户愿意提交具体功能建议，说明仍在持续使用项目；
- 反馈包含明确耗时和场景，有助于维护者定位体验瓶颈。

不满意信号：

- Gateway 重启成本已经影响到日常效率；
- 当前工作区切换流程与用户预期不匹配；
- 对低性能设备的体验优化不足。

---

## 7. 待处理积压

基于当前提供的 24 小时数据，未发现长期未响应的历史 Issue 或 PR。以下为今日仍需维护者关注的开放项。

### 7.1 [Issue #2738 - 支持不重启网关切换工作区](https://github.com/netease-youdao/LobsterAI/issues/2738)

状态：OPEN  
建议优先级：中高

建议维护者关注点：

- 确认当前 Gateway 与 workspace 的耦合边界；
- 评估是否支持 workspace 热切换；
- 如果短期无法支持，可考虑先优化 Gateway 重启耗时；
- 在 Issue 中回应可行性、限制条件和可能路线。

该 Issue 虽然目前互动数不高，但它指向高频操作路径，且与多工作区用户体验直接相关，建议不要长期搁置。

---

### 7.2 [PR #2739 - Add optional keyless Parallel web search](https://github.com/netease-youdao/LobsterAI/pull/2739)

状态：OPEN  
建议优先级：中

建议维护者关注点：

- 审查匿名 Parallel 搜索的隐私与服务条款风险；
- 明确是否作为默认可选搜索后端；
- 确认 rate limit 下的失败行为；
- 检查文档是否充分说明无需 API Key 的边界；
- 如暂不合并，可要求补充测试或配置说明。

该 PR 对 skills 生态有正向价值，但涉及外部服务，应谨慎审查。

---

## 总体健康度评估

今日 LobsterAI 的维护活跃度较高，PR 处理效率明显，尤其在 Gateway / OpenClaw 启动稳定性方面连续完成多项修复。  
从工程状态看，项目正在快速处理迁移兼容、通道配置、IM 调度、安全存储和渲染体验等问题，说明维护团队对实际用户场景的响应较积极。  
从风险侧看，Gateway 仍是当前关键稳定性区域：今日既有多项启动修复，也有用户提出希望减少重启依赖。  
建议短期继续围绕 Gateway 的启动耗时、热切换能力、老配置迁移可靠性进行专项优化。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报｜2026-09-22

## 1. 今日速览

过去 24 小时，Moltis 项目活跃度较低但方向明确：共有 2 条 Issue 更新、1 条 PR 更新，集中在“本地语音合成 TTS 能力”上。今日没有新版本发布，也没有 PR 被合并，说明项目仍处于功能提案与实现评审阶段。社区关注点高度集中在为 Voice personas 增加本地 TTS Provider，尤其是引入 VoxCPM。整体来看，项目健康度稳定，但今日推进主要依赖单一贡献者，维护侧尚未形成明显反馈或合并动作。

---

## 2. 项目进展

今日没有已合并 PR，因此主分支功能层面暂无实质性变更。

### 待合并 PR

#### #1283 feat(voice): add VoxCPM as a local TTS provider  
- 状态：OPEN  
- 作者：Caldalis  
- 链接：https://github.com/moltis-org/moltis/pull/1283  
- 概要：该 PR 提议新增 VoxCPM 作为本地 TTS Provider，并通过 vLLM-Omni 的 OpenAI-compatible speech API 提供服务。VoxCPM 项目为 Apache-2.0 许可，参数规模约 2B，支持 30 种语言、48 kHz 音频输出。  
- 影响评估：  
  - 如果合并，将补齐 Moltis Voice personas 当前缺少本地 TTS 实现的问题。  
  - 有望提升离线部署、隐私敏感场景、本地 AI 助手场景下的可用性。  
  - PR 摘要中仍保留 `Closes #NNNN` 占位符，建议贡献者或维护者更新为实际关联的 Issue，例如 #1282，以便自动关闭和追踪需求来源。

---

## 3. 社区热点

今日社区热点非常集中，主要围绕 VoxCPM 本地 TTS Provider。

### #1282 [Feature]: VoxCPM as a local TTS provider  
- 状态：OPEN  
- 作者：Caldalis  
- 评论数：0  
- 👍：0  
- 链接：https://github.com/moltis-org/moltis/issues/1282  
- 诉求分析：  
  - 用户指出当前 Voice personas 缺少本地实现。  
  - Issue 引用了 `docs/src/voice.md` 中 Provider Support 表，说明现有文档已暴露出本地 TTS Provider 支持不足的问题。  
  - 该需求背后反映的是用户对隐私、本地部署、低延迟和摆脱第三方云服务依赖的诉求。

### #1283 feat(voice): add VoxCPM as a local TTS provider  
- 状态：OPEN  
- 作者：Caldalis  
- 评论数：未提供  
- 👍：0  
- 链接：https://github.com/moltis-org/moltis/pull/1283  
- 热点分析：  
  - 该 PR 与 #1282 高度对应，说明社区不仅提出需求，也提供了实现路径。  
  - 尽管当前没有明显评论或反应，但从 Issue 与 PR 同日创建来看，该功能可能是一个完整的“需求 + 实现”贡献包。  
  - 如果维护者认可 VoxCPM 与 vLLM-Omni 的集成方式，该 PR 有较高概率进入下一轮评审。

---

## 4. Bug 与稳定性

今日未发现新的 Bug、崩溃、回归或稳定性问题报告。

当前更新均为功能请求与功能实现，不涉及已知缺陷修复。也没有发现针对 Bug 的 fix PR。

---

## 5. 功能请求与路线图信号

### 本地 TTS Provider：VoxCPM

#### #1282 [Feature]: VoxCPM as a local TTS provider  
- 状态：OPEN  
- 链接：https://github.com/moltis-org/moltis/issues/1282  
- 核心需求：为 Voice personas 增加本地 TTS Provider，解决当前缺少本地语音生成实现的问题。  
- 路线图信号：  
  - Moltis 的语音能力可能正在从云端 Provider 扩展到本地推理 Provider。  
  - 这符合个人 AI 助手项目常见演进方向：更强隐私、更低依赖、更适合本地工作流。  
  - 如果 #1283 被接受，VoxCPM 可能成为后续本地语音系统的重要基线实现。

#### #1283 feat(voice): add VoxCPM as a local TTS provider  
- 状态：OPEN  
- 链接：https://github.com/moltis-org/moltis/pull/1283  
- 纳入下一版本可能性：中等偏高  
- 判断依据：  
  - 已有对应实现 PR，而不仅是需求提案。  
  - 功能方向与 Voice personas 的能力缺口直接相关。  
  - 但仍需维护者审查依赖引入、部署复杂度、文档质量、Provider 抽象一致性以及与现有语音接口的兼容性。

---

## 6. 用户反馈摘要

从今日 Issue 内容可以提炼出以下用户痛点与使用场景：

- **痛点 1：Voice personas 缺少本地 TTS 实现**  
  - 用户明确指出当前语音人格能力没有本地实现，意味着在无云服务或隐私敏感环境下使用受限。  
  - 相关链接：https://github.com/moltis-org/moltis/issues/1282

- **痛点 2：文档中 Provider Support 表暴露能力空缺**  
  - 用户引用 `docs/src/voice.md`，说明文档已经展示了 Provider 支持情况，但本地实现仍不足。  
  - 这类反馈通常说明用户已尝试根据官方文档配置功能，但发现实际选项无法满足部署需求。

- **使用场景：本地 AI 助手 / 私有化部署 / 多语言语音输出**  
  - VoxCPM 支持多语言和高采样率输出，说明用户可能关注更自然、更可控的语音交互体验。  
  - 对个人 AI 助手项目而言，本地 TTS 是提升端到端本地化体验的重要组件。

当前没有评论线程，因此暂无更多关于满意度、替代方案比较或部署失败的直接反馈。

---

## 7. 待处理积压

基于本次提供的 24 小时数据，未发现长期未响应的历史 Issue 或 PR。今日需要维护者关注的主要积压如下：

### #1283 feat(voice): add VoxCPM as a local TTS provider  
- 状态：OPEN  
- 链接：https://github.com/moltis-org/moltis/pull/1283  
- 建议处理：  
  - 尽快确认是否接受 VoxCPM 作为官方本地 TTS Provider。  
  - 检查 PR 中 `Closes #NNNN` 占位符，建议修正为 `Closes #1282` 或其他正确 Issue。  
  - 审查新增依赖、部署说明、Provider 配置项、错误处理与文档更新是否完整。

### #1282 [Feature]: VoxCPM as a local TTS provider  
- 状态：OPEN  
- 链接：https://github.com/moltis-org/moltis/issues/1282  
- 建议处理：  
  - 与 #1283 建立明确关联。  
  - 如果 PR 方案可行，可将该 Issue 标记为待 PR 合并关闭。  
  - 如果维护者对实现路线有不同意见，应尽早反馈，以避免贡献者在错误方向上继续投入。

### #1281 [Feature]: VoxCPM as a local TTS provider  
- 状态：CLOSED  
- 链接：https://github.com/moltis-org/moltis/issues/1281  
- 观察：  
  - 内容与 #1282 高度相似，可能是重复 Issue。  
  - 建议维护者确认关闭原因是否已标注清楚，例如 duplicate of #1282，以保持 Issue 历史可追踪。

---

## 总体健康度评估

今日 Moltis 项目活跃度偏低，但信号集中且有价值。虽然没有 release 或合并发生，但社区已围绕本地 TTS 能力提交了完整的需求与实现 PR，说明项目仍具备外部贡献动能。短期内，维护者是否及时 review #1283 将决定该功能能否进入下一版本，也会影响社区对语音能力路线图的信心。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报｜2026-09-22

## 1. 今日速览

过去 24 小时 CoPaw / QwenPaw 相关仓库活跃度较高：Issue 更新 5 条，全部处于 Open 状态；PR 更新 14 条，其中 6 条仍待合并，8 条已合并或关闭。今日没有新版本发布，项目主要节奏集中在 **Console 体验优化、工具治理安全、插件可用性、依赖合规、测试覆盖率与运行稳定性** 等方向。

从数据看，社区反馈较为集中且具体，既有终端用户提出的 Web UI Markdown 表格体验问题，也有插件、技能、MCP 文档、Benchmark 对比等框架选型相关诉求。PR 侧响应速度较快，多个当天问题已有对应修复 PR 或相关改动，说明维护节奏健康，但仍有若干安全与治理相关 PR 需要尽快 review。

---

## 2. 项目进展

今日共有 8 条 PR 已合并或关闭，6 条仍在等待处理。已关闭/合并的 PR 主要推动了以下方向。

### 2.1 Console 与前端体验改进

- [#7917 fix(console): improve API loading on slow networks](agentscope-ai/QwenPaw PR #7917)  
  改进慢网络下 Console API 加载体验，针对较大的 JSON 与纯文本响应启用压缩，并避免对流式响应、附件、部分响应等场景产生副作用。  
  **影响**：有助于降低传输成本，提升技能列表等页面在弱网环境下的加载速度。

- [#7909 fix(console): render LaTeX math with KaTeX](agentscope-ai/QwenPaw PR #7909)  
  为 release notes 与 Markdown 文件预览增加 LaTeX 数学公式渲染能力，引入 `remark-math` 与 `rehype-katex`，并本地化 KaTeX 字体资源。  
  **影响**：提升文档、技术说明、公式类内容的可读性，对科研、工程文档场景友好。

- [#7920 fix: resolve default thinking and streamline model onboarding](agentscope-ai/QwenPaw PR #7920)  
  修复继承模型设置、新会话中 thinking 指示可能隐藏的问题，并优化模型选择与初始化体验。  
  **影响**：改善新用户或空模型池场景下的 onboarding，降低配置困惑。

### 2.2 Agent 行为与工具调用稳定性

- [#7919 fix: require new tool-call evidence for doom loop escalation](agentscope-ai/QwenPaw PR #7919)  
  修复 DoomLoopGate 在没有新工具调用证据时也可能升级为终止的问题，避免在纯文本轮次中错误触发“死循环”终止。  
  **影响**：提升 agent 执行稳定性，减少误判导致的任务中断。

- [#7915 fix(responses): default function tools to non-strict mode](agentscope-ai/QwenPaw PR #7915)  
  将 Responses API 中 function tools 默认设为 `strict: false`，同时保留显式 strict 设置，避免 schema 清洗后可选参数被错误地变成必填。  
  **影响**：减少工具调用参数校验误伤，提升与不同模型 / API 行为的兼容性。

### 2.3 依赖、测试与工程质量

- [#7913 chore(deps): bumping version of agentscope to 2.0.8](agentscope-ai/QwenPaw PR #7913)  
  升级 AgentScope 依赖到 2.0.8。  
  **影响**：项目继续跟进 AgentScope 2.x 基座，可能包含上游 bugfix 与接口改进。

- [#7911 test(unit): coverage sprint batch 3 — 2720 cases across agents, routers, CLI, portability and config (+3.28pp)](agentscope-ai/QwenPaw PR #7911)  
  新增 47 个测试文件、2720 个测试用例，将 `src/qwenpaw` 语句覆盖率从 70.51% 提升到 73.79%，增加 3.28 个百分点。  
  **影响**：这是今日工程质量方面最重要的进展之一，显著增强 agents、routers、CLI、可移植性与配置相关代码的回归保护。

- [#7918 docs: remove accidentally committed design documents](agentscope-ai/QwenPaw PR #7918)  
  移除误提交到 `docs/design` 下的 9 份设计文档，共 877 行。  
  **影响**：清理内部设计资料，降低信息泄露或文档混淆风险，不影响应用代码。

### 2.4 当前整体推进评估

今日项目推进偏“修复与质量增强”而非大版本功能发布。比较明确的进展包括：

- Console 网络性能、Markdown/LaTeX 渲染、模型 onboarding 均有改善；
- Agent 工具调用、Responses API schema、DoomLoopGate 等运行逻辑获得修复；
- 测试覆盖率显著提升；
- 依赖与文档仓库卫生继续维护。

整体看，项目处于 **高频迭代与稳定性打磨阶段**，尚未进入版本发布节点。

---

## 3. 社区热点

### 3.1 Benchmark 与框架选型诉求上升

- [#7925 [Question]: QwenPaw是否有与业界Agent对比的Benchmark](agentscope-ai/QwenPaw Issue #7925)  
  评论数：1  
  用户关注 QwenPaw 2.x 是否有新的 Benchmark 结果，并希望看到与 OpenCode、Claude Code 等 CodeAgent 的对比，以及基于业界公开榜单的横向评测。

**诉求分析**：  
这类反馈说明用户已进入“框架选型”阶段，不再只关心功能可用性，而是希望通过公开、可复现的 Benchmark 判断 QwenPaw / CoPaw 在 Agent 框架、Coding Agent、通用任务执行等方向的竞争力。该 Issue 对项目定位和生态推广价值较高，建议维护者优先回应：

- QwenPaw 2.x 是否已有或计划发布新的 PawBench；
- 是否覆盖 AgentScope 2.0 重构后的能力；
- 是否计划加入 Coding Agent 维度；
- 是否能提供与主流公开榜单或标准任务集的对齐结果。

### 3.2 插件与技能系统可用性问题

- [#7921 [Bug]: omp-roles SKILL.md 缺少 YAML frontmatter，导致该技能静默不可用](agentscope-ai/QwenPaw Issue #7921)  
  评论数：1  
  用户报告官方插件 `omp-workflows` 中的 `omp-roles` 技能缺少 YAML frontmatter，导致运行时技能注册表跳过该技能，但列表仍可能显示，造成“看得到但不可用”的静默失败。

对应修复 PR：

- [#7922 fix(omp): add missing SKILL.md frontmatter to omp-roles skill](agentscope-ai/QwenPaw PR #7922)

**诉求分析**：  
该问题反映用户对插件分发质量和诊断透明度有较高期待。除了补齐 frontmatter，后续还可考虑在技能加载失败时提供显式错误、警告或 Console 提示，避免用户误以为是模型或配置问题。

### 3.3 Console Markdown 表格体验问题

- [#7924 [Bug/UX] Console 中 Markdown 表格超宽且横向滚动条沉底，无法自动限宽到对话框](agentscope-ai/QwenPaw Issue #7924)  
  评论数：1  
  用户指出 agent 输出 Markdown 表格时，表格可能超出气泡宽度；若表格较高，横向滚动条位于底部，操作困难；长 URL、长数字、长文本不折行，导致表格撑宽。

**诉求分析**：  
这是典型的高频内容展示体验问题。Agent 输出表格、长文本、链接和结构化结果很常见，若渲染体验不佳，会直接影响 Console 的日常可用性。该问题尚未看到明确修复 PR，建议前端优先评估。

### 3.4 工具治理与安全检查问题

- [#7926 fix(tools): run_tool_batch inner calls bypass governance checks](agentscope-ai/QwenPaw PR #7926)  
  状态：Open  
  该 PR 指出 `run_tool_batch._call_tool` 直接调用 `Toolkit.call_tool`，绕过 agent 侧的 `check_permissions`，导致批处理内部工具调用未经过治理管线，包括权限检查等。

**诉求分析**：  
这是今日最值得关注的安全 / 治理相关 PR。若问题属实，批量工具调用可能绕过现有权限控制，影响工具沙箱、权限审批、治理策略一致性。建议维护者尽快 review，并补充回归测试。

---

## 4. Bug 与稳定性

按潜在影响程度排序如下。

### 高优先级

#### 4.1 批量工具调用绕过治理检查

- PR：[ #7926 fix(tools): run_tool_batch inner calls bypass governance checks](agentscope-ai/QwenPaw PR #7926)  
- 状态：Open  
- 类型：安全 / 权限治理 / 工具调用一致性  
- 是否已有 fix PR：有，即该 PR

**问题说明**：  
`run_tool_batch` 内部调用路径绕过 `Agent._execute_tool_call` 中的权限检查逻辑，可能导致批处理工具调用不经过完整治理流程。

**建议**：  
优先 review，并确认以下内容：

- 是否所有工具调用入口都必须经过统一权限检查；
- 是否需要在 Toolkit 层增加兜底检查；
- 是否补充批量调用、嵌套调用、拒绝权限场景的测试。

---

#### 4.2 Windows shell 子进程可能影响宿主 Console / Server

- PR：[ #7910 fix(shell): isolate Windows command consoles](agentscope-ai/QwenPaw PR #7910)  
- 状态：Open  
- 类型：稳定性 / 平台兼容 / Shell 执行隔离  
- 是否已有 fix PR：有

**问题说明**：  
Windows shell 命令虽然使用 `CREATE_NEW_PROCESS_GROUP`，但仍继承 QwenPaw 宿主 console。子进程 console control event 可能影响宿主进程，甚至终止服务器。PR 计划增加 `CREATE_NO_WINDOW`，让 `execute_shell_command` 不再附着到宿主控制台。

**建议**：  
该问题影响 Windows 桌面版和本地 server 稳定性，建议尽快合并并补充 Windows 平台回归测试。

---

### 中优先级

#### 4.3 官方 OMP 技能缺少 YAML frontmatter，导致静默不可用

- Issue：[ #7921 omp-roles SKILL.md 缺少 YAML frontmatter](agentscope-ai/QwenPaw Issue #7921)  
- PR：[ #7922 fix(omp): add missing SKILL.md frontmatter to omp-roles skill](agentscope-ai/QwenPaw PR #7922)  
- 状态：Issue Open，PR Open  
- 类型：插件 / 技能注册 / 用户体验  
- 是否已有 fix PR：有

**问题说明**：  
官方 bundle 插件中的技能文件格式不完整，运行时被跳过，但用户层面可能难以察觉失败原因。

**建议**：  
除修复文件本身外，建议增加技能加载校验与可视化错误提示。

---

#### 4.4 AgentScope Platform 校验器未收录新增 memory 插件类型

- Issue：[ #7916 AgentScope Platform 校验器尚未收录 QwenPaw 2.2.1b1 新增的 memory 插件类型](agentscope-ai/QwenPaw Issue #7916)  
- 状态：Open  
- 评论数：2  
- 类型：平台兼容 / 插件类型校验  
- 是否已有 fix PR：未见对应 PR

**问题说明**：  
新增 memory 插件类型尚未被 AgentScope Platform 校验器识别，可能导致插件发布、校验或集成流程受阻。

**建议**：  
需要同步平台 schema / validator，并补充插件类型兼容测试。

---

#### 4.5 Console Markdown 表格超宽与横向滚动体验差

- Issue：[ #7924 Console 中 Markdown 表格超宽且横向滚动条沉底](agentscope-ai/QwenPaw Issue #7924)  
- 状态：Open  
- 类型：前端 UI / Markdown 渲染 / 可用性  
- 是否已有 fix PR：未见对应 PR

**问题说明**：  
Markdown 表格在对话气泡内无法自动限宽，长内容不折行，高表格的横向滚动条在底部，影响阅读和操作。

**建议**：  
可考虑：

- 表格容器固定最大宽度；
- 单元格长文本 `word-break` / `overflow-wrap`；
- sticky 横向滚动条或顶部同步滚动条；
- 对超宽表格提供“展开 / 全屏查看”入口。

---

### 低到中优先级

#### 4.6 Responses API function tools strict 默认行为修复

- PR：[ #7915 fix(responses): default function tools to non-strict mode](agentscope-ai/QwenPaw PR #7915)  
- 状态：Closed  
- 类型：API 兼容 / schema 处理  
- 是否已有 fix PR：已处理

**问题说明**：  
schema 清洗后 nullable 类型被移除时，可选参数可能被错误处理为必填。该 PR 已将默认 strict 行为改为 false，并保留显式配置。

---

#### 4.7 DoomLoopGate 误升级为终止

- PR：[ #7919 fix: require new tool-call evidence for doom loop escalation](agentscope-ai/QwenPaw PR #7919)  
- 状态：Closed  
- 类型：Agent 控制流 / 稳定性  
- 是否已有 fix PR：已处理

**问题说明**：  
缺少新的 tool-call 证据时也可能触发死循环升级。该 PR 已修复相关判断逻辑。

---

## 5. 功能请求与路线图信号

### 5.1 QwenPaw 2.x Benchmark 与 CodeAgent 对比

- Issue：[ #7925 QwenPaw是否有与业界Agent对比的Benchmark](agentscope-ai/QwenPaw Issue #7925)

**路线图信号**：  
用户希望项目给出更清晰的性能与能力边界，尤其是：

- QwenPaw 2.x 基于 AgentScope 2.0 重构后的 Benchmark；
- 与 OpenCode、Claude Code 等 CodeAgent 的对比；
- 是否接入公开榜单或标准化评测。

**可能进入下一阶段的方向**：

- 更新 PawBench 至 QwenPaw 2.x；
- 增加 Coding Agent 任务集；
- 发布选型指南或 benchmark report；
- 将评测结果纳入 README / docs / website。

---

### 5.2 MCP 文档增加认证型 Web Research 示例

- Issue：[ #7912 Optional authenticated MCP web-research example with Baizhi Agent Toolkit](agentscope-ai/QwenPaw Issue #7912)

**用户请求**：  
希望在 MCP 文档中增加一个可选的公共 Web Research 示例，基于 Baizhi Agent Toolkit，展示 search → fetch → extract 工作流，并明确 credential、数据共享和安全边界。

**路线图信号**：  
这说明 MCP 使用者需要的不只是连接字段说明，还希望看到可运行、可复制、边界清晰的集成样例。若采纳，有助于降低 MCP 工具接入门槛。

---

### 5.3 Console 浏览器标签页标题可自定义

- PR：[ #7914 feat(console): customize browser tab title](agentscope-ai/QwenPaw PR #7914)  
- 状态：Open

**功能说明**：  
为 General → Appearance & language 增加 Browser tab title 字段，将标题保存到浏览器 local storage，按 Console origin 隔离。

**路线图信号**：  
用户可能在多个项目、多个部署环境中同时打开 Console，希望通过标签页标题区分实例。这属于轻量但实用的多环境管理体验增强，进入下一版本的可能性较高。

---

### 5.4 Scroll 历史保留策略细化

- PR：[ #7923 feat(scroll): age out tool_result blocks after blocks_retention_days](agentscope-ai/QwenPaw PR #7923)  
- 状态：Open

**功能说明**：  
为 `tool_result` 的结构化 `blocks` 增加按天清理策略，解决高频使用场景下 durable scroll history 无界增长的问题。

**路线图信号**：  
说明项目正在处理长期运行、生产部署中的存储膨胀问题。该能力偏运维和可持续运行，适合纳入后续稳定版本。

---

### 5.5 Web Fetch HTML 转 Markdown 依赖替换

- PR：[ #7927 fix(web): replace html2text with markdownify](agentscope-ai/QwenPaw PR #7927)  
- 状态：Open

**功能 / 合规说明**：  
将 GPL-3.0-or-later 的 `html2text` 替换为 MIT 许可的 `markdownify`，用于 `web_fetch` HTML 转换，并保持链接、段落等行为。

**路线图信号**：  
这属于依赖许可证合规优化。若项目面向企业或商业集成，该变更重要性较高，预计较容易进入下一版本。

---

## 6. 用户反馈摘要

### 6.1 用户希望项目提供可量化能力证明

来自 [#7925](agentscope-ai/QwenPaw Issue #7925) 的反馈显示，用户在做框架选型时需要更客观的比较依据。尤其是 QwenPaw 2.x 与 1.x 架构差异较大，旧版 Benchmark 已不足以代表当前能力。用户还明确提出 Coding Agent 对比需求，说明 QwenPaw 的 coding 能力已开始被外部关注。

**痛点**：  
缺少最新、公开、可复现的评测结果。

**使用场景**：  
技术选型、Agent 框架横向对比、Coding Agent 能力判断。

---

### 6.2 Console 是用户高频接触面，展示体验直接影响满意度

[#7924](agentscope-ai/QwenPaw Issue #7924) 反映的 Markdown 表格问题非常具体，说明用户已经在真实任务中让 agent 输出大量结构化内容，如表格、URL、长数字和长文本。当前渲染行为导致阅读和横向滚动困难。

**痛点**：  
长表格不可读、横向滚动条难以触达、内容不自动折行。

**使用场景**：  
数据分析结果展示、网页抓取摘要、报告生成、结构化任务输出。

---

### 6.3 插件生态需要更强的校验、错误提示和兼容保障

[#7921](agentscope-ai/QwenPaw Issue #7921) 与 [#7916](agentscope-ai/QwenPaw Issue #7916) 都指向插件系统问题：一个是技能元数据缺失导致静默不可用，另一个是平台校验器未识别新增插件类型。

**痛点**：  
插件看似存在但运行不可用，或被平台校验阻断；用户难以判断是配置错误、版本不兼容还是插件包问题。

**使用场景**：  
官方 bundle 插件使用、自定义插件开发、平台侧插件发布与校验。

---

### 6.4 文档用户希望看到更贴近真实工作流的 MCP 示例

[#7912](agentscope-ai/QwenPaw Issue #7912) 表明 MCP 文档读者需要“从连接到完成任务”的完整示例，而不是只解释字段。用户还特别关注认证、凭证和数据共享，说明安全边界是 MCP 集成时的重要决策因素。

**痛点**：  
文档缺少端到端示例；认证和数据边界说明不足。

**使用场景**：  
接入第三方 Web Research 工具、构建搜索 / 抓取 / 提取工作流。

---

## 7. 待处理积压

基于本次提供的数据，未发现“长期未响应”的历史 Issue 或 PR；今日所有 Issue 均为 2026-09-21 至 2026-09-22 创建或更新。不过，以下 Open 项目建议维护者优先关注，以避免演变为短期积压。

### 高优先级待处理

1. [#7926 fix(tools): run_tool_batch inner calls bypass governance checks](agentscope-ai/QwenPaw PR #7926)  
   工具批处理绕过权限治理，涉及安全与策略一致性，建议优先 review。

2. [#7910 fix(shell): isolate Windows command consoles](agentscope-ai/QwenPaw PR #7910)  
   Windows shell 隔离问题可能影响宿主进程稳定性，建议尽快验证并合并。

3. [#7922 fix(omp): add missing SKILL.md frontmatter to omp-roles skill](agentscope-ai/QwenPaw PR #7922)  
   对应用户报告的官方插件不可用问题，修复范围明确，建议尽快处理。

### 中优先级待处理

4. [#7924 Console 中 Markdown 表格超宽且横向滚动条沉底](agentscope-ai/QwenPaw Issue #7924)  
   影响 Console 高频阅读体验，建议分配前端修复。

5. [#7916 AgentScope Platform 校验器尚未收录 memory 插件类型](agentscope-ai/QwenPaw Issue #7916)  
   涉及平台与插件类型兼容，建议同步 validator / schema。

6. [#7923 feat(scroll): age out tool_result blocks after blocks_retention_days](agentscope-ai/QwenPaw PR #7923)  
   面向长期运行实例的存储控制能力，建议评估数据迁移与清理策略。

### 产品与生态方向待处理

7. [#7925 QwenPaw是否有与业界Agent对比的Benchmark](agentscope-ai/QwenPaw Issue #7925)  
   对项目生态影响较大，建议维护者给出 Benchmark 路线或公开计划。

8. [#7912 Optional authenticated MCP web-research example with Baizhi Agent Toolkit](agentscope-ai/QwenPaw Issue #7912)  
   可提升 MCP 文档实用性，适合作为 docs good-first-contribution 或官方示例补充。

9. [#7914 feat(console): customize browser tab title](agentscope-ai/QwenPaw PR #7914)  
   轻量 UX 增强，适合快速 review。

10. [#7927 fix(web): replace html2text with markdownify](agentscope-ai/QwenPaw PR #7927)  
   依赖许可证合规相关，建议尽快确认转换行为兼容性与测试覆盖。

---

## 项目健康度判断

今日 CoPaw / QwenPaw 项目整体健康度较好：社区反馈具体、PR 响应活跃、修复方向覆盖稳定性、体验、合规和测试质量。短期风险主要集中在工具治理绕过、Windows shell 隔离、插件静默不可用和 Console 表格体验四类问题。若维护者能快速处理当前 6 个 Open PR，并对 Benchmark 与 MCP 示例给出明确回应，项目在开发者信任、生产可用性和生态扩展方面都会继续增强。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报  
日期：2026-09-22  
仓库：github.com/zeroclaw-labs/zeroclaw

---

## 1. 今日速览

过去 24 小时 ZeroClaw 活跃度很高：新增或更新 Issues 4 条，PR 更新 17 条，且全部仍处于打开状态，说明社区与贡献者正在集中推进修复、文档、Nix 构建、运行时和安全相关工作。  
今日没有新版本发布，也没有 PR 合并或 Issue 关闭，项目处于“高提交、待维护者消化”的状态。  
从主题看，安全、运行时、工具调用、代理间协作、Nix 部署和文档治理是今日重点。  
健康度方面，贡献流入充足，但高风险安全项和 17 个待合并 PR 累积，维护者审核压力明显上升。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日没有已合并或关闭的重要 PR，因此主分支功能层面尚未发生可确认推进。  
不过，待合并 PR 覆盖面较广，若后续集中合入，可能会带来以下进展：

### 运行时与代理链路

- [PR #11043](https://github.com/zeroclaw-labs/zeroclaw/pull/11043)  
  `fix(runtime): bind background delegate rows to their delegation chain and sign detached tool results`  
  该 PR 修复后台 delegate 任务与 delegation chain 的绑定问题，并为 detached tool results 添加签名。它直接影响多代理委派、后台任务管理与工具结果可信度，属于较关键的 runtime/agent 修复。

- [PR #11033](https://github.com/zeroclaw-labs/zeroclaw/pull/11033)  
  `fix(runtime): surface bootstrap-file truncation to the operator`  
  当前 compact context 默认会截断 bootstrap 文件，但操作者可能无法感知。该 PR 让截断行为显式暴露给 operator，有助于减少“模型上下文缺失但用户不知情”的调试成本。

- [PR #11024](https://github.com/zeroclaw-labs/zeroclaw/pull/11024)  
  `test(runtime): keep narration fixture context limits consistent`  
  修复 narration fixture 的上下文限制配置，属于测试稳定性维护，关联 Issue [#11023](https://github.com/zeroclaw-labs/zeroclaw/issues/11023)。

### 安全与凭据保护

- [PR #11026](https://github.com/zeroclaw-labs/zeroclaw/pull/11026)  
  `fix(tools): redact proxy credentials from snapshots`  
  防止 proxy URL 中的用户名和密码进入模型可见的诊断快照。该问题带有 `risk:high`，对生产环境安全性较重要。

- [PR #11029](https://github.com/zeroclaw-labs/zeroclaw/pull/11029)  
  `fix(security): consume value-taking git global options before resolving the subcommand`  
  修复 git 参数解析中的安全策略绕过风险，尤其是 `-c`、`--config-env`、`--attr-source` 等带值选项的处理。

- [PR #11038](https://github.com/zeroclaw-labs/zeroclaw/pull/11038)  
  `chore(security): ignore RUSTSEC-2026-0292`  
  针对 advisory scan 中 `imbl-sized-chunks` 的 double free/use-after-free 漏洞报警做 ignore 配置。该 PR 更像是 CI 解堵措施，但仍需维护者判断风险接受是否合理。

### 工具、解析器与压缩输入

- [PR #11025](https://github.com/zeroclaw-labs/zeroclaw/pull/11025)  
  `fix(parser): normalize tool aliases across text formats`  
  将工具别名规范化逻辑扩展到 XML、MiniMax invoke、Markdown fence 等调用格式，减少不同格式下工具调用行为不一致的问题。

- [PR #11031](https://github.com/zeroclaw-labs/zeroclaw/pull/11031)  
  `fix(tools): ignore an empty chunk before the compressed-input allowance check`  
  修复压缩输入边界条件：当 allowance 恰好耗尽时，尾部空 chunk 不应触发失败。

### Memory 与 Qdrant

- [PR #11035](https://github.com/zeroclaw-labs/zeroclaw/pull/11035)  
  `fix(memory): apply Qdrant time bounds before the recall limit, not after`  
  修复 Qdrant recall 先 limit 后本地过滤导致的召回缺失问题。该问题会影响带时间范围的记忆检索准确性。

### Nix 与部署

- [PR #11041](https://github.com/zeroclaw-labs/zeroclaw/pull/11041)  
  `feat(nix): build web UI as nix package and wire into module`  
  将 Web dashboard 暴露为 Nix flake package，并接入 NixOS module，有利于提升 NixOS 部署体验。

- [PR #11040](https://github.com/zeroclaw-labs/zeroclaw/pull/11040)  
  `fix(nix): build zerocode with its own feature set`  
  修复 `zerocode` 构建时错误复用 zeroclaw dist feature 列表的问题。

### 文档与治理

- [PR #11042](https://github.com/zeroclaw-labs/zeroclaw/pull/11042)  
  `docs(developing): record the replacement-first integration policy`  
  补充 RFC #6165 后续的 standing document，强化后续移除、feature gate 与迁移评审的依据。

- [PR #11039](https://github.com/zeroclaw-labs/zeroclaw/pull/11039)  
  `docs(tools): add You.com MCP search server example`  
  添加 You.com MCP 搜索服务器示例，降低用户接入远程 MCP 搜索服务的门槛。

- [PR #11030](https://github.com/zeroclaw-labs/zeroclaw/pull/11030)  
  `docs(runtime): record bounded peer-inbox lifecycle exception`  
  记录 peer-inbox 生命周期相关的例外，有助于后续架构治理。

---

## 4. 社区热点

### 1. Agent-to-agent session messaging RFC

- [Issue #11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027)  
  `RFC: Agent-to-agent session messaging with receiver discretion`  
  标签：`agent`, `channel`, `runtime`, `security`, `domain:architecture`, `risk:high`  
  评论数：2

这是今日评论最多的 Issue。该 RFC 提出让不同 session 中的 agent 能够交换发现、问题和协调消息，同时避免合并历史或依赖人工复制文本。  
背后诉求很明确：ZeroClaw 正在从单 agent / 单会话协作，走向多 agent、多 session 的协作运行时。  
不过该提案同时触及身份、访问控制、接收方裁量权、agent loop 边界和安全隔离，因此被标记为高风险，需要架构与安全层面的维护者审查。

### 2. Opencode big-pickle 模型调用失败

- [Issue #11036](https://github.com/zeroclaw-labs/zeroclaw/issues/11036)  
  `[Bug]: Opencode model big-pickle, turn failed.`  
  标签：`bug`  
  评论数：1

用户报告使用 Opencode credentials 和 free tier 模型 `big-pickle` 时，agent turn 失败，提示所有 provider/model 尝试均失败。  
这反映了 provider 兼容性和错误诊断体验问题：用户当前只能看到整体失败，可能难以区分是认证、模型名、quota、provider API 还是 ZeroClaw 适配层问题。

### 3. Security advisory scan 失败

- [Issue #11034](https://github.com/zeroclaw-labs/zeroclaw/issues/11034)  
  `ci: Advisory scan failed — 2026-09-21`  
  标签：`security`, `risk:high`

该 Issue 由 GitHub Actions 自动创建，指出 `imbl-sized-chunks` 相关 RUSTSEC advisory 导致安全扫描失败。  
相关修复/缓解 PR 已出现：[PR #11038](https://github.com/zeroclaw-labs/zeroclaw/pull/11038)。  
该问题的热点不在评论量，而在于其会阻塞所有打开 PR 的 security job，对项目交付流有直接影响。

---

## 5. Bug 与稳定性

按严重程度和影响面排序如下：

### 高风险 / 安全相关

#### 1. Advisory scan failed：`imbl-sized-chunks` double free / use-after-free

- Issue：[ #11034](https://github.com/zeroclaw-labs/zeroclaw/issues/11034)  
- 相关 PR：[ #11038](https://github.com/zeroclaw-labs/zeroclaw/pull/11038)  
- 严重程度：高  
- 状态：Issue open，PR open

CI 安全扫描发现 `RUSTSEC-2026-0292`，涉及 double free / use-after-free。  
当前 PR 的处理方式是 ignore advisory，意图是恢复 CI，但这并不等同于真正升级或移除受影响依赖。维护者需要确认：  
- 项目是否实际触达漏洞路径；  
- ignore 是否有过期时间或后续替代方案；  
- 是否需要跟进上游修复版本。

#### 2. Proxy credentials 可能泄露到诊断快照

- PR：[ #11026](https://github.com/zeroclaw-labs/zeroclaw/pull/11026)  
- 严重程度：高  
- 状态：PR open

该修复会将 proxy URL 中用户名和密码从 shared `proxy_config` snapshot helper 中移除，避免凭据进入模型可见诊断结果。  
这类问题对 AI agent 项目尤其敏感，因为日志、快照、tool result 和模型上下文之间存在潜在泄露链路。

#### 3. Git subcommand 解析安全策略问题

- PR：[ #11029](https://github.com/zeroclaw-labs/zeroclaw/pull/11029)  
- 严重程度：中高  
- 状态：PR open

`git_effective_subcommand_index` 对带值 global option 的解析不完整，可能将 option value 误判为子命令，影响安全策略判断。  
此类问题可能导致 read-only / restricted command policy 被绕过，需要尽快 review。

---

### 中等风险 / 功能正确性

#### 4. Opencode `big-pickle` 模型 turn failed

- Issue：[ #11036](https://github.com/zeroclaw-labs/zeroclaw/issues/11036)  
- 严重程度：S2 degraded behavior  
- 状态：Issue open，暂无明确关联 fix PR

用户无法通过 Opencode free tier 模型完成基本对话。  
建议维护者补充 provider 层诊断信息，例如：  
- 模型是否存在或可用；  
- provider 返回的原始错误码；  
- 是否为认证或额度问题；  
- 是否需要模型别名映射。

#### 5. Qdrant recall 时间过滤顺序错误

- PR：[ #11035](https://github.com/zeroclaw-labs/zeroclaw/pull/11035)  
- 严重程度：中  
- 状态：PR open

当前逻辑先按 limit 获取结果，再本地应用 `since` / `until`，会导致高相关但超出时间窗口的结果挤占页内名额，使有效结果缺失。  
该修复会提升 memory backend 在时间范围检索场景下的准确性。

#### 6. Tool alias 在不同文本格式中表现不一致

- PR：[ #11025](https://github.com/zeroclaw-labs/zeroclaw/pull/11025)  
- 严重程度：中  
- 状态：PR open

工具别名在 JSON 路径可用，但 XML、MiniMax invoke、Markdown fence 等格式未完全一致。  
该问题会影响多模型、多格式工具调用的可靠性。

#### 7. 压缩输入尾部空 chunk 触发 allowance 错误

- PR：[ #11031](https://github.com/zeroclaw-labs/zeroclaw/pull/11031)  
- 严重程度：中低  
- 状态：PR open

这是边界条件问题，但可能造成合法压缩输入被误拒。修复范围较小，适合快速合入。

---

### 低风险 / 测试与可观测性

#### 8. Narration fixture context limits 配置不一致

- Issue：[ #11023](https://github.com/zeroclaw-labs/zeroclaw/issues/11023)  
- 相关 PR：[ #11024](https://github.com/zeroclaw-labs/zeroclaw/pull/11024)  
- 严重程度：低  
- 状态：Issue open，PR open

该问题是 follow-up 测试修复，避免 fixture 使用超过 window 的预算配置。对最终用户影响有限，但有助于维持 CI 稳定性和测试语义正确性。

---

## 6. 功能请求与路线图信号

### 1. 多 agent / 多 session 协作能力正在进入架构讨论

- Issue：[ #11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027)

Agent-to-agent session messaging 是最明显的路线图信号。该 RFC 暗示 ZeroClaw 可能继续增强：  
- agent 间消息传递；  
- session 隔离下的协作；  
- 接收方权限裁量；  
- agent identity 与 access control；  
- 多 agent loop 的安全边界。

结合今日 [PR #11043](https://github.com/zeroclaw-labs/zeroclaw/pull/11043) 对 delegation chain 和 detached tool results 的修复，可以看出项目正在强化多代理委派链路的安全性与可追踪性。  
这类能力很可能成为后续版本的重要方向，但由于风险高，预计不会以简单功能开关的方式快速落地。

### 2. NixOS 部署体验增强

- PR：[ #11041](https://github.com/zeroclaw-labs/zeroclaw/pull/11041)  
- PR：[ #11040](https://github.com/zeroclaw-labs/zeroclaw/pull/11040)

Nix 相关 PR 表明社区正在推动 ZeroClaw 更好地支持可复现部署和系统级集成。  
Web dashboard 被打包为 Nix package 后，NixOS 用户可更方便地部署完整服务，而不需要单独构建前端静态资源。

### 3. MCP 工具生态继续扩展

- PR：[ #11039](https://github.com/zeroclaw-labs/zeroclaw/pull/11039)

You.com MCP search server 示例说明工具生态文档仍在扩展。  
这类文档 PR 虽然不改变核心代码，但会降低用户接入外部搜索能力的成本，尤其是 keyless/free tier 场景。

### 4. Runtime 国际化与配置引导增强

- PR：[ #11028](https://github.com/zeroclaw-labs/zeroclaw/pull/11028)

该 PR 将 Telegram、Discord、Slack 等聊天集成设置提示迁移到 Fluent 本地化消息，并引导用户使用 ZeroCode Config。  
这说明项目正在改善 operator onboarding，尤其是多语言和多渠道部署场景。

---

## 7. 用户反馈摘要

### Provider 兼容性仍是用户痛点

- Issue：[ #11036](https://github.com/zeroclaw-labs/zeroclaw/issues/11036)

用户场景：使用 Opencode credentials 和 free tier 模型 `big-pickle` 进行基本对话。  
痛点：一次简单的 “hi” 即触发 `turn failed`，错误信息显示所有 provider/model 都失败，但缺少足够的定位信息。  
不满意点主要是：  
- 无法确认是模型不可用、认证失败、额度问题还是适配层问题；  
- provider 失败信息聚合后对普通用户不够可操作；  
- free tier 模型可能是新用户入口，失败会直接影响首次体验。

### Operator 需要更透明的运行时行为

- PR：[ #11033](https://github.com/zeroclaw-labs/zeroclaw/pull/11033)

bootstrap 文件被截断但未清晰提示，会导致用户以为完整上下文已被注入，实际模型只看到部分内容。  
这类问题体现了 AI agent 项目中的典型反馈：用户不仅需要“自动压缩上下文”，还需要知道系统何时丢弃或截断了信息。

### 多代理协作需求正在增强

- Issue：[ #11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027)

用户或贡献者希望不同 session 中的 agent 能够协调，而不是依靠人工复制粘贴。  
这说明 ZeroClaw 的使用场景正在从单轮任务执行，扩展到更复杂的多任务、多角色、多上下文协作。

---

## 8. 待处理积压

基于今日数据，未发现“长期未响应”的历史 Issue 或 PR 证据；当前数据主要覆盖过去 24 小时活动。  
不过以下待处理项已经具备较高优先级，建议维护者尽快分流：

### 高优先级待审

1. [Issue #11034](https://github.com/zeroclaw-labs/zeroclaw/issues/11034) / [PR #11038](https://github.com/zeroclaw-labs/zeroclaw/pull/11038)  
   安全扫描失败影响所有 PR 的 CI 状态，需要决定是临时 ignore、升级依赖，还是等待上游。

2. [PR #11026](https://github.com/zeroclaw-labs/zeroclaw/pull/11026)  
   凭据脱敏修复，风险高且范围相对明确，建议优先 review。

3. [PR #11043](https://github.com/zeroclaw-labs/zeroclaw/pull/11043)  
   涉及 background delegate、delegation chain 和 detached tool result signing，功能关键但 size 为 L，需要 runtime/agent 维护者重点审查。

4. [Issue #11027](https://github.com/zeroclaw-labs/zeroclaw/issues/11027)  
   高风险 RFC，建议尽早给出架构边界反馈，避免后续贡献者在未定方向上投入过多实现成本。

5. [Issue #11036](https://github.com/zeroclaw-labs/zeroclaw/issues/11036)  
   真实用户 provider 失败报告，建议先复现并补充诊断信息，即使暂时没有完整修复，也应明确是配置问题、上游问题还是适配问题。

### 当前维护风险

今日 17 个 PR 全部未合并，且覆盖安全、runtime、Nix、memory、tools、docs 多个子系统。  
短期内最大风险不是贡献不足，而是 review backlog 增长导致：  
- 安全修复滞留；  
- CI 被 advisory scan 持续阻塞；  
- 多个小修复相互 rebase；  
- 大型 runtime PR 审核周期拉长。  
建议维护者优先处理高风险小 PR，再安排大型架构相关 PR 的专项 review。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*