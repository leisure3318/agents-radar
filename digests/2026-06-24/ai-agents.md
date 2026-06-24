# OpenClaw 生态日报 2026-06-24

> Issues: 53 | PRs: 27 | 覆盖项目: 13 个 | 生成时间: 2026-06-24 01:28 UTC

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

以下为 **OpenClaw（openclaw/openclaw）** 的 **2026-06-24 项目动态日报**。

## 1. 今日速览
过去 24 小时，项目保持了很高的社区活跃度：**Issues 更新 53 条**，**PR 更新 27 条**，整体呈现出明显的“反馈/修复驱动”节奏，且 Issue 侧活跃度显著高于 PR 合并节奏。  
从内容看，今日新增与活跃讨论主要集中在 **2026.6.9 之后的回归修复、通道消息正确性、OAuth/权限、安全边界、稳定性与可观测性**。  
同时，已有多条关键修复 PR 进入 “ready for maintainer look / proof sufficient” 阶段，说明维护工作仍在持续推进。  
**总体判断：项目处于高活跃、偏修复窗口期；健康度中等偏稳，但仍受回归与集成边界问题牵制。**

## 2. 版本发布
**今日无新 Release。**

---

## 3. 项目进展
今日有一批关键 PR 关闭，推动了安全、路由、状态展示、文档解析和 UI 体验的修复：

- **#96149** 修复系统服务单元中 **GEMINI_API_KEY 明文写入** 问题，强化了密钥处理安全性。  
  https://github.com/openclaw/openclaw/pull/96149
- **#96140** 修复 exec approval followup 在插件通道中**丢失原始 routing target** 的问题，改善审批回调消息的落点正确性。  
  https://github.com/openclaw/openclaw/pull/96140
- **#96151** 修复 `openclaw status` 对 **fallback model** 的展示不清，提升模型状态可观测性。  
  https://github.com/openclaw/openclaw/pull/96151
- **#96130** 让 `wiki_apply` / `wiki_lint` 对 **YAML frontmatter 解析错误** 更宽容，减少单页异常导致全局失败。  
  https://github.com/openclaw/openclaw/pull/96130
- **#96141** 修复 Control UI 在 **service worker 更新** 后不刷新的问题，改善前端版本切换体验。  
  https://github.com/openclaw/openclaw/pull/96141

另外，还有 3 个偏性能/维护类 PR 关闭，进一步补强索引与运行效率：

- **#96087** perf(reply): hoist direct-send fragment index  
  https://github.com/openclaw/openclaw/pull/96087
- **#96085** perf(codex): index rollout transcript ids  
  https://github.com/openclaw/openclaw/pull/96085
- **#96072** perf(browser): index role snapshot references  
  https://github.com/openclaw/openclaw/pull/96072

**综合来看：今日关闭的 PR 主要在“安全边界 + 消息路由 + 状态可见性 + 前端一致性”四个方向上推进，属于高价值的修复性进展。**

---

## 4. 社区热点
以下是今日讨论最活跃的 Issues/PRs（按评论热度与诉求强度综合）：

1. **#96148 Track iMessage source-reply latency instrumentation** — **17 条评论**  
   https://github.com/openclaw/openclaw/issues/96148  
   这是今日最热的线程，核心诉求是为 iMessage source-reply / message-tool-only turns 增加延迟观测，说明社区已开始从“现象反馈”转向“性能剖析”。

2. **#96236 Request: iOS Node TestFlight invite** — **3 条评论**  
   https://github.com/openclaw/openclaw/issues/96236  
   体现出用户希望把 iPhone 作为 `role: node` 接入，以获得推送、位置感知和主动提醒能力，说明移动端节点需求真实存在。

3. **#96118 [6.9 Regression] Dreaming runs but memory never promotes + Dreams UI shows dash** — **3 条评论**  
   https://github.com/openclaw/openclaw/issues/96118  
   这类 session-state / memory 回归说明升级后“能跑但不对”的问题很受关注，影响用户对长期记忆与 UI 状态的信任。

4. **#96156 [Feature]: Let compaction providers be MCP servers** — **3 条评论**  
   https://github.com/openclaw/openclaw/issues/96156  
   这是一个明确的架构型需求：希望 compaction 机制能够复用 MCP server，而不是局限于内部 provider 注册。

5. **#96197 Document safe 5.28 -> 6.x migration for openai-codex OAuth users** — **2 条评论**  
   https://github.com/openclaw/openclaw/issues/96197  
   反映出生产用户在版本迁移上非常谨慎，尤其是 OAuth-backed `openai-codex/*` 路由，迁移安全性是核心诉求。

**热点特征总结：**  
今日高热线程集中在 **性能观测、升级迁移、移动节点、记忆/状态正确性、可扩展性接口**；用户并不只是报 bug，更在推动产品能力向“可运维、可扩展、可迁移”演进。

---

## 5. Bug 与稳定性
按严重度排序，今日最值得关注的稳定性问题如下：

### P0 / 最高优先级
- **#96203 Gateway crash-loops with default Node heap (~4 GB)**  
  https://github.com/openclaw/openclaw/issues/96203  
  在大规模 workspace / 多 agent / cron 场景下出现持续 crash-loop，是典型的生产级可用性风险。  
  **当前未见对应 fix PR。**

### P1 / 高优先级回归与数据/消息风险
- **#95997 CLI gateway calls can poison local device scopes after read probes**  
  https://github.com/openclaw/openclaw/issues/95997  
  涉及设备 scope 污染与写权限被阻断，属于 auth/provider 侧高风险问题。  
  **未见明确 fix PR。**

- **#96084 /readyz stays healthy when PVC-backed workspace is full and writes fail with ENOSPC**  
  https://github.com/openclaw/openclaw/issues/96084  
  这是健康检查与真实写入状态脱节的问题，会误导运维判断。  
  **未见明确 fix PR。**

- **#96116 memory index --force exits early without processing full backlog**  
  https://github.com/openclaw/openclaw/issues/96116  
  内存索引提前退出会导致索引漂移，属于 session-state / knowledge 基础设施问题。  
  **未见明确 fix PR。**

- **#96046 Gateway 'plugins.slots.memory: plugin not found' for extensions plugin**  
  https://github.com/openclaw/openclaw/issues/96046  
  这是 2026.6.9 回归，影响插件启动。  
  **已有 linked PR open。**

- **#96098 Telegram inline buttons stopped working after update to 2026.6.9**  
  https://github.com/openclaw/openclaw/issues/96098  
  直接影响交互可用性，属于通道级消息能力退化。  
  **已有 linked PR open。**

- **#95998 ensureGlobalUndiciEnvProxyDispatcher() breaks COS chunked upload via qqbot plugin**  
  https://github.com/openclaw/openclaw/issues/95998  
  属于网络/上传路径回归，影响消息附件与文件上传。  
  **已有 linked PR open。**

- **#96135 OAuth-backed OpenAI batch audio transcription no longer works after provider migration**  
  https://github.com/openclaw/openclaw/issues/96135  
  影响语音转写链路。  
  **对应修复 PR：#96238**  
  https://github.com/openclaw/openclaw/pull/96238

- **#96103 Approval resolution injection loses channel routing target**  
  https://github.com/openclaw/openclaw/issues/96103  
  会导致审批后续消息发错通道，属于 message-loss 风险。  
  **对应修复 PR：#96140**  
  https://github.com/openclaw/openclaw/pull/96140

- **#96125 wiki_apply & wiki_lint YAML 解析错误**  
  https://github.com/openclaw/openclaw/issues/96125  
  **对应修复 PR：#96130**  
  https://github.com/openclaw/openclaw/pull/96130

- **#96126 Model field should distinguish base model from active fallback**  
  https://github.com/openclaw/openclaw/issues/96126  
  **对应修复 PR：#96151**  
  https://github.com/openclaw/openclaw/pull/96151

- **#96093 Diagnostics: no model.usage emitted for HTTP ingress**  
  https://github.com/openclaw/openclaw/issues/96093  
  **对应修复 PR：#96152**  
  https://github.com/openclaw/openclaw/pull/96152

### 今日已关闭、但非常关键的稳定性问题
- **#96192 Auto-detect and recover from corrupted thinking block signatures**  
  https://github.com/openclaw/openclaw/issues/96192
- **#96160 Cron agentTurn jobs hang at model-call-started**  
  https://github.com/openclaw/openclaw/issues/96160
- **#96150 Auto-failover on invalid model selection**  
  https://github.com/openclaw/openclaw/issues/96150

**稳定性结论：**  
项目当前的主要压力点仍然是 **回归、消息路由、健康检查、认证/权限、插件外部化后的兼容性**。  
好消息是，高优先级 bug 中已有一部分开始被 PR 回收，说明修复链条正在形成。

---

## 6. 功能请求与路线图信号
今日出现的功能请求，显示出 OpenClaw 正在从“能用”走向“可扩展、可治理、可编排”：

- **#96156** 让 compaction provider 支持 MCP server  
  https://github.com/openclaw/openclaw/issues/96156
- **#96153** 增加 `openclaw agents charter validate`  
  https://github.com/openclaw/openclaw/issues/96153
- **#96056** 为 OpenShell sandbox 配置增加非 secret env 列表  
  https://github.com/openclaw/openclaw/issues/96056
- **#96205** `attach`：session-bound scoped tool grants  
  https://github.com/openclaw/openclaw/issues/96205
- **#96190** `cron.jobs[].notifyOnCompletion`  
  https://github.com/openclaw/openclaw/issues/96190
- **#95966** Protected Content Output Filtering Mechanism  
  https://github.com/openclaw/openclaw/issues/95966
- **#96101** 导出 `OPENCLAW_SESSION_ID` 给 bash 子进程  
  https://github.com/openclaw/openclaw/issues/96101
- **#96163** LINE 文件型音频附件不转写  
  https://github.com/openclaw/openclaw/issues/96163

### 路线图判断
结合现有 open PR，**下一版最可能优先纳入的，仍然是安全/稳定/可观测性修复，而非大体量新能力**。优先级较高的候选包括：

- **#96149** 安全：systemd 不再明文写密钥  
  https://github.com/openclaw/openclaw/pull/96149
- **#96140** 事件/审批路由正确性  
  https://github.com/openclaw/openclaw/pull/96140
- **#96151** 状态页 fallback model 可见性  
  https://github.com/openclaw/openclaw/pull/96151
- **#96238** OAuth-backed 音频转写恢复  
  https://github.com/openclaw/openclaw/pull/96238
- **#96130** wiki YAML 容错  
  https://github.com/openclaw/openclaw/pull/96130
- **#96152** HTTP ingress 指标补齐  
  https://github.com/openclaw/openclaw/pull/96152
- **#96141** Control UI service worker 更新刷新  
  https://github.com/openclaw/openclaw/pull/96141

**判断：** 下一阶段路线图很可能继续围绕 **安全边界、稳定性、状态可见性、跨通道一致性、运维可诊断性** 展开。

---

## 7. 用户反馈摘要
从今日 Issues 的评论与摘要里，可以提炼出几类非常真实的用户痛点：

1. **“升级后能跑，但行为不对”是最大痛点**  
   例如 2026.6.9 引入的 Telegram 按钮失效、memory promotion 异常、插件找不到、COS 上传损坏等，说明用户对回归容忍度很低。  
   - 代表：[#96098](https://github.com/openclaw/openclaw/issues/96098)、[#96118](https://github.com/openclaw/openclaw/issues/96118)、[#96046](https://github.com/openclaw/openclaw/issues/96046)

2. **用户希望“看得见”系统状态，而不是猜**  
   包括 fallback model、model usage、iMessage latency、cron hang、memory index 完整性等问题。  
   - 代表：[#96126](https://github.com/openclaw/openclaw/issues/96126)、[#96093](https://github.com/openclaw/openclaw/issues/96093)、[#96148](https://github.com/openclaw/openclaw/issues/96148)、[#96116](https://github.com/openclaw/openclaw/issues/96116)

3. **消息路由和上下文连续性非常重要**  
   用户特别在意 reply target、approval followup、Discord/Telegram/iMessage 的消息正确落点。  
   - 代表：[#96103](https://github.com/openclaw/openclaw/issues/96103)、[#95977](https://github.com/openclaw/openclaw/issues/95977)、[#96007](https://github.com/openclaw/openclaw/issues/96007)

4. **移动端与外部节点能力有明确需求**  
   TestFlight invite 请求说明用户希望把 iPhone 作为 node 纳入系统，做主动通知和位置感知。  
   - 代表：[#96236](https://github.com/openclaw/openclaw/issues/96236)

5. **安全与权限治理在变得更重要**  
   包括 per-agent exec security、secret 安全写入、protected content filtering、session-scoped grants。  
   - 代表：[#96228](https://github.com/openclaw/openclaw/issues/96228)、[#96149](https://github.com/openclaw/openclaw/pull/96149)、[#95966](https://github.com/openclaw/openclaw/issues/95966)、[#96205](https://github.com/openclaw/openclaw/issues/96205)

---

## 8. 待处理积压
虽然今日很多问题都是新报，但已经形成了一个需要维护者优先处理的高风险积压池：

### 建议优先关注的未关闭高优先级 Issue
- **#96203** P0 crash-loop / heap limit  
  https://github.com/openclaw/openclaw/issues/96203
- **#95997** device scope 污染  
  https://github.com/openclaw/openclaw/issues/95997
- **#96084** PVC 满导致写失败但 `/readyz` 仍健康  
  https://github.com/openclaw/openclaw/issues/96084
- **#96116** memory index 提前退出  
  https://github.com/openclaw/openclaw/issues/96116
- **#96148** iMessage latency instrumentation  
  https://github.com/openclaw/openclaw/issues/96148
- **#96046** 插件外部化后 memory slot 找不到  
  https://github.com/openclaw/openclaw/issues/96046
- **#96098** Telegram inline buttons 失效  
  https://github.com/openclaw/openclaw/issues/96098
- **#95998** COS chunked upload 回归  
  https://github.com/openclaw/openclaw/issues/95998
- **#96197** Codex OAuth 升级迁移安全说明  
  https://github.com/openclaw/openclaw/issues/96197

### 建议优先 Review 的 open PR
- **#96149** 安全修复：系统服务单元密钥泄漏  
  https://github.com/openclaw/openclaw/pull/96149
- **#96140** 审批回调路由修复  
  https://github.com/openclaw/openclaw/pull/96140
- **#96151** 状态展示修复  
  https://github.com/openclaw/openclaw/pull/96151
- **#96238** 音频转写恢复  
  https://github.com/openclaw/openclaw/pull/96238
- **#96130** wiki YAML 容错  
  https://github.com/openclaw/openclaw/pull/96130
- **#96152** HTTP ingress diagnostics 补齐  
  https://github.com/openclaw/openclaw/pull/96152
- **#96141** Control UI 刷新修复  
  https://github.com/openclaw/openclaw/pull/96141
- **#96154** cron 心跳抑制混合内容误杀  
  https://github.com/openclaw/openclaw/pull/96154

**维护建议：**  
短期内应优先压住 **P0/P1 crash-loop、消息丢失、认证/权限、外部化插件兼容性、健康检查误报**；这些问题一旦持续，会直接影响用户对版本升级的信任。

---

## 横向生态对比

以下基于你提供的 **2026-06-24 24h GitHub 动态** 做横向对比。说明：表中的 Issues/PR 为 **今日更新量**，健康度为综合判断，不代表最终质量结论。

---

## 1) 生态全景

个人 AI 助手 / 自主智能体开源生态正在从“能对话、能接工具”快速转向“**可运维、可迁移、可扩展、可审计**”的阶段。  
今天最明显的共识不是新能力，而是：**路由正确性、权限边界、可观测性、版本迁移、安全隔离** 这些工程问题已经成为主战场。  
同时，生态形态也在分化：有的项目偏 **平台中枢/基础设施**，有的偏 **UI/移动端体验**，有的偏 **多 provider 与协议兼容**，还有的在做 **记忆与上下文重构**。  
整体看，这一生态已经明显进入“**从 demo 竞争到生产化竞争**”阶段。

---

## 2) 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | **53** | **27** | 无 | 高活跃，修复压力大，处于关键回归窗口 |
| **Hermes Agent** | 50 | 50 | 无 | 高活跃，高反馈密度，稳定性与功能并进 |
| **ZeroClaw** | 6 | **39** | 无 | 高活跃，PR 堆积明显，偏测试/修复驱动 |
| **CoPaw** | 14 | **34** | **有：v1.1.12.post2** | 高活跃，持续迭代，发布节奏正常 |
| **IronClaw** | 11 | 19 | 无 | 高活跃，产品化与工程治理并行 |
| **NanoBot** | 6 | 12 | 无 | 中高活跃，偏兼容修复与体验打磨 |
| **NanoClaw** | 1 | 9 | 无 | 中等活跃，收敛效率高，偏架构整理 |
| **LobsterAI** | 0 | 6 | 无 | 低噪声，偏稳定收敛与应用层增强 |
| **PicoClaw** | 1 | 1 | 无 | 低频更新，问题点明确，维护型 |
| **NullClaw** | 0 | 0 | 无 | 静默 |
| **TinyClaw** | 0 | 0 | 无 | 静默 |
| **Moltis** | 0 | 0 | 无 | 静默 |
| **ZeptoClaw** | 0 | 0 | 无 | 静默 |

**简要分层：**
- **第一梯队高活跃**：OpenClaw、Hermes Agent、ZeroClaw、CoPaw、IronClaw  
- **第二梯队中高活跃**：NanoBot、NanoClaw、LobsterAI、PicoClaw  
- **低频/静默**：NullClaw、TinyClaw、Moltis、ZeptoClaw

---

## 3) OpenClaw 在生态中的定位

### 定位判断
OpenClaw 更像生态里的 **“基础平台/核心参照系”**，而不是单点功能项目。  
它的今日数据是全场最重的：**53 条 Issues 更新、27 条 PR 更新**，且问题覆盖面极广——安全、路由、OAuth、健康检查、memory、插件、UI、迁移、可观测性都在同一天同时发力。

### 相比同类的优势
1. **问题面最广，说明生态承载面最深**  
   今天 OpenClaw 暴露的问题类型最完整，说明它承载的真实使用场景最多，也最接近“通用 AI 助手基础设施”。

2. **修复链条清晰**  
   多个高优先级问题都有对应 PR 回收，说明维护机制已经形成闭环。

3. **安全与可观测性优先级高**  
   今天关闭的关键 PR 集中在密钥处理、路由正确性、fallback model 显示、HTTP ingress 指标等，这类改动是生产化项目的标志。

### 技术路线差异
- OpenClaw 偏 **系统级编排、跨通道一致性、权限治理、可诊断性**；
- 相比 NanoBot/CoPaw 这类更偏 UI/体验导向的项目，OpenClaw 更像 **基础能力层**；
- 相比 Hermes 的 gateway/cron/MCP 路线，OpenClaw 更强调 **消息路由、状态正确性与生态边界治理**；
- 相比 ZeroClaw 的测试与运行时补强，OpenClaw 的问题域更偏 **大系统集成与回归收敛**。

### 社区规模对比
按 24h 更新量看，OpenClaw 已处于 **生态第一梯队**，且其 Issue 数显著高于多数项目，说明：
- 用户基数/使用面更广；
- 回归暴露更充分；
- 生态角色更接近“参考实现 + 生产平台”。

---

## 4) 共同关注的技术方向

### 1. 可观测性 / 性能诊断
- **OpenClaw**：iMessage latency instrumentation、HTTP ingress model.usage、cron hang 可观测性  
- **Hermes Agent**：gateway telemetry、crash-loop 可见性  
- **ZeroClaw**：大量测试补强，反映对可验证性的要求  
- **CoPaw**：内存占用、上下文/响应可见性  
**共同诉求**：不仅要“能跑”，还要“看得见为什么慢、为什么坏”。

### 2. 安全边界 / 权限隔离
- **OpenClaw**：systemd 密钥泄漏修复、session-scoped grants  
- **Hermes Agent**：Anthropic token 跨 profile 泄漏风险  
- **ZeroClaw**：按 agent 配置独立 env  
- **IronClaw**：prompt-safety denylist、凭据删除与重认证  
- **NanoClaw**：hook surface guard  
**共同诉求**：从“全局配置”转向“按 session / agent / profile 隔离”。

### 3. 通道输出正确性 / 路由一致性
- **OpenClaw**：approval followup 路由 target 丢失、Telegram/插件回归  
- **NanoBot**：Telegram 流式输出闪烁、thinking 标签泄漏  
- **Hermes Agent**：Slack/Email/Telegram 投递失真  
- **ZeroClaw**：DingTalk 流式输出诉求  
- **NanoClaw**：Slack Socket Mode 规避端口暴露  
**共同诉求**：跨通道消息必须“发对、回对、显示对”。

### 4. 迁移兼容 / 升级安全
- **OpenClaw**：2026.6.9 回归、OAuth 迁移文档、wiki frontmatter 容错  
- **Hermes Agent**：Docker 启动迁移、.env 处理  
- **LobsterAI**：cron storage migration  
- **CoPaw**：AgentScope 2.0 post-merge 修复  
- **NanoClaw**：Chat SDK 版本统一到 4.29.0  
**共同诉求**：升级不能“能装不能用”，迁移路径必须显式化。

### 5. 记忆 / 上下文架构重构
- **OpenClaw**：memory index backlog、fallback model 状态展示  
- **NanoBot**：Dream/workspace skill 去重、增量更新  
- **IronClaw**：memory 作为 userland extension  
- **ZeroClaw**：relationship memory 工作流化  
- **LobsterAI**：session 归一化  
**共同诉求**：记忆系统从“全量堆叠”走向“模块化、可恢复、可增量”。

---

## 5) 差异化定位分析

### OpenClaw
- **功能侧重**：安全、路由、可观测性、迁移、通道一致性  
- **目标用户**：重度使用者、维护者、需要跨渠道/多节点编排的团队  
- **架构特征**：偏平台中枢，系统边界复杂，生产化特征强

### Hermes Agent
- **功能侧重**：gateway、cron、MCP、桌面/多平台接入  
- **目标用户**：需要把 agent 接到真实工作流和多平台通道的用户  
- **架构特征**：网关和调度味道重，运维与兼容性压力高

### CoPaw
- **功能侧重**：WebUI、移动端适配、会话体验、文件交互  
- **目标用户**：桌面/移动混合使用的个人生产力用户  
- **架构特征**：UI 驱动，强体验导向，偏产品层

### ZeroClaw
- **功能侧重**：工具循环、测试、环境隔离、企业通道  
- **目标用户**：注重可控性和实验性的大模型编排用户  
- **架构特征**：测试与修复密集，像“高强度工程化试验场”

### IronClaw
- **功能侧重**：Slack/WebUI、记忆重构、安全治理、自动化链路  
- **目标用户**：偏企业集成与多工作流协作场景  
- **架构特征**：功能广，且明显向“产品化 AI 平台”演进

### NanoBot / NanoClaw / LobsterAI
- **NanoBot**：偏 provider 兼容、输出渲染、Dream 工作流  
- **NanoClaw**：偏 Slack 接入、SDK 统一、扩展边界硬化  
- **LobsterAI**：偏 OpenClaw 的应用层增强、计划确认、cron/session 收敛

### PicoClaw
- **功能侧重**：轻量运行、Termux/移动端兼容、Bedrock 成本优化  
- **目标用户**：边缘/移动场景、低资源部署用户  
- **架构特征**：小而明确，强调运行环境兼容

---

## 6) 社区热度与成熟度

### 快速迭代阶段
**OpenClaw、Hermes Agent、CoPaw、ZeroClaw、IronClaw**  
特征：Issues 和 PR 都高，且大量聚焦在修复、回归、可观测性、权限、安全和通道一致性。  
这类项目已经不是“做不做功能”的阶段，而是“**能否稳定交付**”的阶段。

### 质量巩固阶段
**NanoClaw、NanoBot、LobsterAI**  
特征：PR 收敛效率高，改动较集中，问题面相对可控。  
它们更像是在做 **架构整理、兼容性修复、体验打磨**。

### 探索/窄域维护阶段
**PicoClaw**  
特征：活动少，但诉求很明确，主要围绕移动端稳定性与模型成本优化。

### 低频/静默阶段
**NullClaw、TinyClaw、Moltis、ZeptoClaw**  
特征：缺少可见活跃信号，暂不适合做生态趋势样本。

---

## 7) 值得关注的趋势信号

1. **Agent 项目正在“分布式系统化”**
   - 路由、健康检查、消息投递、回退、迁移，已经不再是边角问题，而是核心能力。
   - 对开发者的启示：要按分布式系统标准设计工具调用和状态流转。

2. **安全边界从“全局”走向“按主体隔离”**
   - session-scoped、profile-scoped、agent-scoped、workspace-scoped 成为高频词。
   - 启示：密钥、工具权限、环境变量必须最小授权。

3. **可观测性正在成为一等公民**
   - latency、usage、crash-loop、heartbeat、session state 都在被显式化。
   - 启示：没有指标就没有治理，尤其在多通道/多模型环境下。

4. **升级兼容性是生产门槛，不是文档附属品**
   - 迁移失败、OAuth 回归、SDK 版本不一致、历史存储迁移，都是高频问题。
   - 启示：版本升级必须默认考虑数据迁移和行为回归。

5. **记忆/上下文正在从“堆上下文”转向“模块化记忆”**
   - userland extension、增量更新、去重、工作流化是明显方向。
   - 启示：长上下文并不是终局，未来更依赖结构化记忆与选择性暴露。

6. **移动端和 IM 通道是智能体落地的主入口之一**
   - Slack、Telegram、DingTalk、iMessage、PWA、Node mobile 需求都很真实。
   - 启示：AI 智能体不只要能聊天，更要能进入用户的主工作场景。

---

### 一句话结论
今天的开源 AI 智能体生态，已经从“功能竞赛”切换到“**工程可靠性竞赛**”；谁能在 **安全、路由、观测、迁移、跨端一致性** 上先建立系统优势，谁就更接近下一阶段的主流平台位置。

如果你愿意，我可以把这份报告再压缩成：
1. **管理层 1 页版**，或  
2. **开发者晨会版表格**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-06-24）

## 1. 今日速览
过去 24 小时内，NanoBot 处于**高活跃迭代**状态：Issues 更新 6 条、PR 更新 12 条，但**没有新版本发布**，说明当前主要精力集中在问题修复、兼容性调整和功能扩展的开发评审阶段。  
从主题上看，今天的变更高度集中在 **WebUI 呈现、Telegram 输出、Provider 兼容性、Dream/记忆系统** 四条主线，说明项目正在同时推进“可用性修复”和“能力扩展”。  
今日仅有 1 个 PR 关闭、1 个 Issue 关闭，释放的“确定性成果”不算多，但修复目标都指向核心链路，属于**质量优先型推进**。  
整体判断：**项目健康度偏正向，活跃度高，但发布节奏仍偏开发期，离对外稳定版本还有集成与回归验证空间。**

---

## 2. 项目进展
今日最重要的已关闭 PR 是：

- **[#4474 fix(provider): deduplicate parallel tool_use ids in AnthropicProvider](https://github.com/HKUDS/nanobot/pull/4474)**  
  - 状态：CLOSED  
  - 作用：修复 AnthropicProvider 在并行工具调用场景下的 `tool_use.id` 重复问题，避免下游 `tool_result` 冲突。  
  - 影响：直接打通了 Kimi Coding / Anthropic-compatible endpoint 的兼容链路，也同步关闭了对应问题 **[#4473](https://github.com/HKUDS/nanobot/issues/4473)**。  
  - 评价：这是一个典型的“**协议兼容性阻塞点**”修复，虽然不是大功能，但对可用性和后续 provider 扩展很关键。

**阶段性结论：**  
今天的“已落地成果”更偏底层兼容修复，而非面向用户的新能力发布。项目整体仍在向前推进，但推进方式是“**先把核心链路修稳，再继续扩展功能**”。

---

## 3. 社区热点
按评论量看，今日最热的讨论主要集中在以下 Issues（均为 1 条评论，👍 为 0）：

1. **[#4470 telegram display bug](https://github.com/HKUDS/nanobot/issues/4470)**  
   - 关注点：Telegram 消息换行失效、流式生成时频繁编辑导致闪烁。  
   - 背后诉求：用户希望 Telegram 输出**保留格式、减少抖动**，即“像正常聊天消息一样稳定呈现”。

2. **[#4473 fix(provider): parallel tool_use ids are duplicated in AnthropicProvider with Kimi Coding endpoint](https://github.com/HKUDS/nanobot/issues/4473)**  
   - 关注点：工具调用 ID 重复导致请求报错。  
   - 背后诉求：用户在接入新 provider 时，非常在意**协议兼容性和工具链稳定性**。

3. **[#4465 Bug: WebUI renders `<thinking/>` tags as visible text instead of a reasoning block](https://github.com/HKUDS/nanobot/issues/4465)**  
   - 关注点：WebUI 把思考标签直接展示给用户，泄漏了内部控制文本。  
   - 背后诉求：用户希望前端能**正确区分 reasoning 与普通消息**，避免“模板/控制信息外露”。

此外，需求型话题虽然评论不多，但方向明确，值得持续关注：

- **[#4479 feat(webui): PWA support and mobile swipe gesture for sidebar](https://github.com/HKUDS/nanobot/issues/4479)**  
- **[#4475 feat: add OpenCode Zen and OpenCode Go as providers](https://github.com/HKUDS/nanobot/issues/4475)**  
- **[#4467 [enhancement] Dream should update existing workspace skills instead of creating duplicates on each run](https://github.com/HKUDS/nanobot/issues/4467)**  

**社区热点判断：**  
当前社区关注点不是“新奇功能”，而是**输出呈现是否可靠、协议兼容是否稳、已有工作成果是否会被重复创建/覆盖**。这类反馈通常意味着产品已进入更接近真实使用场景的阶段。

---

## 4. Bug 与稳定性
按影响面和严重程度排序，今日主要问题如下：

### 1) Telegram 流式输出格式错误与闪烁
- Issue: **[#4470 telegram display bug](https://github.com/HKUDS/nanobot/issues/4470)**
- 症状：
  - 换行不生效，文本被压成一整段；
  - 生成中消息反复编辑，造成闪烁。
- 严重性：**高**，直接影响 Telegram 用户的核心交互体验。
- 已有修复 PR：**[#4472 fix: skip sendRichMessage when streaming preview exists](https://github.com/HKUDS/nanobot/pull/4472)**

### 2) WebUI 将 `<thinking/>` 直接渲染为可见文本
- Issue: **[#4465 Bug: WebUI renders `<thinking/>` tags as visible text instead of a reasoning block](https://github.com/HKUDS/nanobot/issues/4465)**
- 症状：推理标签泄漏到前端，影响界面整洁和模型输出可信度。
- 严重性：**高**，属于前端呈现与信息隔离问题。
- 已有修复 PR：**[#4466 [bug, fix] Fix raw `<thinking>` tags in reasoning output](https://github.com/HKUDS/nanobot/pull/4466)**

### 3) Anthropic/Kimi Coding 工具调用 ID 重复
- Issue: **[#4473 fix(provider): parallel tool_use ids are duplicated...](https://github.com/HKUDS/nanobot/issues/4473)**
- 症状：`tool call id ... is duplicated`，导致请求失败。
- 严重性：**中-高**，影响特定 provider 的兼容性与稳定性。
- 状态：**已关闭**
- 对应修复 PR：**[#4474](https://github.com/HKUDS/nanobot/pull/4474)**

### 4) 其他稳定性修复
- PR: **[#4468 fix: exclude archived keys in heartbeat & fallback missing session timestamps](https://github.com/HKUDS/nanobot/pull/4468)**
- 作用：清理 heartbeat 目标、补齐 session 时间戳缺失时的兜底逻辑。
- 评价：偏“基础设施健壮性”修复，能减少边缘状态导致的异常。

**稳定性结论：**  
今天的 bug 主要集中在**输出格式、前端渲染、provider 协议适配**三类“用户可见问题”上，说明项目正在把注意力从“能跑”推进到“跑得稳、显示对、兼容广”。

---

## 5. 功能请求与路线图信号
今日新增的功能诉求，已经清晰暴露出下一阶段路线图方向：

### A. Provider 生态扩展
- Issue: **[#4475 feat: add OpenCode Zen and OpenCode Go as providers](https://github.com/HKUDS/nanobot/issues/4475)**
- 配套 PR: **[#4476](https://github.com/HKUDS/nanobot/pull/4476)**
- 信号：用户希望更快接入**低成本 / 高可靠**的新模型入口，说明项目的 provider 抽象正在被更多场景检验。

### B. WebUI 移动端体验增强
- Issue: **[#4479 feat(webui): PWA support and mobile swipe gesture for sidebar](https://github.com/HKUDS/nanobot/issues/4479)**
- 配套 PR: **[#4480](https://github.com/HKUDS/nanobot/pull/4480)**
- 信号：项目开始从“桌面 Web 工具”向“**可安装、可移动端使用**”演进。

### C. Dream / Workspace 知识与记忆机制
- Issue: **[#4467]([enhancement] Dream should update existing workspace skills instead of creating duplicates on each run](https://github.com/HKUDS/nanobot/issues/4467)**
- 配套 PR: **[#4469](https://github.com/HKUDS/nanobot/pull/4469)**  
- 相关 PR：**[#4477](https://github.com/HKUDS/nanobot/pull/4477)**、**[#4478](https://github.com/HKUDS/nanobot/pull/4478)**、**[#4481](https://github.com/HKUDS/nanobot/pull/4481)**
- 信号：用户希望系统**记住已有 workspace skill 并持续增量更新**，而不是每次都“重造轮子”。这是典型的生产级工作流需求。

### D. 自定义 provider 能力进一步下沉
- PR: **[#4482 [enhancement, provider] fix: allow custom provider to configure thinking style](https://github.com/HKUDS/nanobot/pull/4482)**
- 信号：用户已不满足于“接入 provider”，而是希望能细粒度控制**thinking/reasoning 风格**。  
  这通常意味着项目的 provider 框架正进入成熟期。

**路线图判断：**  
下一版本最可能纳入的方向是：**OpenCode provider 支持、WebUI 移动端/PWA、Dream/记忆系统去重与增量更新、custom provider thinking 配置**。这些都不是边缘优化，而是能直接提升留存和使用效率的功能。

---

## 6. 用户反馈摘要
从今日 Issues 的评论与摘要中，可以提炼出几个非常真实的用户痛点：

1. **“输出必须像人类消息一样稳定”**  
   - 代表问题：**[#4470](https://github.com/HKUDS/nanobot/issues/4470)**  
   - 用户不接受换行丢失、消息不断闪烁，这说明 Telegram 场景对“流式体验”容忍度低。

2. **“不要把内部思考过程直接暴露给最终用户”**  
   - 代表问题：**[#4465](https://github.com/HKUDS/nanobot/issues/4465)**  
   - 用户把 `<thinking>` 标签视为模板泄漏，体现了对产品“专业感”和“输出洁净度”的要求。

3. **“兼容性不是加分项，而是基本盘”**  
   - 代表问题：**[#4473](https://github.com/HKUDS/nanobot/issues/4473)**  
   - 新 provider 一旦和现有协议细节不一致，就会立刻触发失败，说明用户对多 provider 支持的预期已经很高。

4. **“希望系统理解并保留我已经做过的工作”**  
   - 代表问题：**[#4467](https://github.com/HKUDS/nanobot/issues/4467)**  
   - 这类反馈来自长期用户，反映他们已经把 NanoBot 当作“持续积累知识”的助手，而不是一次性生成器。

**总体反馈画像：**  
用户最在意的是：**格式正确、状态可控、不会重复生成、不会泄漏内部信息、并且能兼容更多模型服务**。这对 AI 智能体类项目来说，是从 demo 走向生产可用的典型信号。

---

## 7. 待处理积压
从本次 24h 数据看，**未见明显“长期沉默”的老问题**，但有一批高价值 open 项目已经形成了明确积压，建议维护者优先安排评审与合并：

### 优先级较高的待处理项
- **[#4472](https://github.com/HKUDS/nanobot/pull/4472)** — Telegram 流式消息修复，直接影响用户可见体验
- **[#4466](https://github.com/HKUDS/nanobot/pull/4466)** — WebUI thinking 标签清理，属于前端正确性问题
- **[#4476](https://github.com/HKUDS/nanobot/pull/4476)** — OpenCode Zen/Go provider 扩展
- **[#4480](https://github.com/HKUDS/nanobot/pull/4480)** — PWA 与移动端侧边栏手势
- **[#4469](https://github.com/HKUDS/nanobot/pull/4469)** — Dream 注入已有 workspace skills，解决重复生成
- **[#4478](https://github.com/HKUDS/nanobot/pull/4478)** — 保留 Dream cron，避免配置保存丢失
- **[#4477](https://github.com/HKUDS/nanobot/pull/4477)** — 生命周期记忆写入，属于较大能力增强
- **[#4481](https://github.com/HKUDS/nanobot/pull/4481)** — Dream 禁用时推进 cursor，避免 prompt 膨胀
- **[#4482](https://github.com/HKUDS/nanobot/pull/4482)** — custom provider thinking style 配置

### 维护建议
- **优先合并用户可见 bug 修复**：#4472、#4466  
- **其次处理协议兼容与 provider 扩展**：#4476、#4482  
- **最后推进 Dream/记忆系统的结构性优化**：#4469、#4477、#4478、#4481  
- 这些 PR 如果集中合并，能显著降低后续回归风险，并提升下一次版本发布的完成度。

---

如需，我可以把这份日报进一步整理成：
1. **更适合发到群里的简版摘要**，或  
2. **适合内部周报/晨会的表格版**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-06-24）

## 1) 今日速览
过去 24 小时，Hermes Agent 维持了**高强度活跃**：Issues 与 PR 更新各 50 条，说明社区反馈、修复与功能推进都处于密集期，但**没有新版本发布**，当前主要处在持续修补与体验打磨阶段。  
从内容看，今天的热点明显集中在 **MCP / Gateway / Cron / Desktop / 认证与跨平台兼容**，问题类型以“静默失败”“配置漂移”“消息/工具未按预期暴露或投递”为主。  
整体健康度判断：**活跃度高，但稳定性议题占比也高**，项目正从“功能扩张”转向“可靠性交付与边界条件收敛”。  
值得关注的是，今天已经出现若干针对高优先级问题的修复型 PR，说明维护节奏仍在正向推进。  

---

## 2) 版本发布
**今日无新版本发布。**  
最新 Releases 为空，说明今天的变更主要体现在 issue 处理与 PR 流转层面。  
链接：<https://github.com/NousResearch/hermes-agent/releases>

---

## 3) 项目进展
今天公开列表中，**可确认关闭的 PR 只有 1 个重要条目**，其余多为待合并修复或功能增强，说明维护重点仍在“修复先行”。

- **#51595 [CLOSED] feat(relay): Phase 5 Unit C — wake primitive (gateway side)**  
  这个 PR 给 gateway 增加了 per-instance wake URL，并在自助配置时把它传给 connector，用于唤醒挂起的 gateway 并接收缓冲工作流量。  
  这类改动对 **消息可达性、后台唤醒、持续在线体验** 很关键，属于基础设施层面的可靠性增强。  
  链接：<https://github.com/NousResearch/hermes-agent/pull/51595>

从今日 PR 方向看，项目正在集中补强：
- **Docker 启动迁移/回滚安全性**（#51615）
- **MCP OAuth 与连接探测**（#51600）
- **computer_use Linux/Qt6 兼容性**（#51608、#51614）
- **Anthropic 密钥作用域隔离**（#51604）
- **Cron 与调度语义修复**（#51598、#51612）

结论：**今天的推进更多是“修稳定性与可用性”，而不是新增大功能。**

---

## 4) 社区热点
以下是今天最活跃、讨论最集中的 Issues（按评论数与影响面综合）：

1. **#51587 [CLOSED] MCP tools 已连接并启用，但从未进入 agent session toolset**  
   评论数最高，说明这是一个直接影响可用性的核心故障：用户明明完成了 MCP 配置，却在实际会话里看不到工具。  
   诉求本质是：**“配置成功”必须等于“会话可用”**，不能停留在表面连接状态。  
   链接：<https://github.com/NousResearch/hermes-agent/issues/51587>

2. **#51486 [CLOSED] Gateway model 切换后残留旧 base_url**  
   反映出模型切换过程中存在配置继承/污染问题，用户担心“切到新模型却仍走旧路由”。  
   背后的核心诉求是：**模型切换必须可预期、无隐式副作用**。  
   链接：<https://github.com/NousResearch/hermes-agent/issues/51486>

3. **#51579 [OPEN] Docker 启动时自动迁移反复剥离 `$HERMES_HOME/.env`**  
   这是今天最危险的高优先级问题之一，会在每次容器启动时反复破坏环境文件，甚至影响 Telegram 等下游功能。  
   说明用户非常在意 **容器重启后的状态稳定性**。  
   链接：<https://github.com/NousResearch/hermes-agent/issues/51579>

4. **#51535 [OPEN] OAuth MCP 连接在 `--auth oauth` 下返回 405**  
   代表 MCP OAuth 流程仍有明显兼容问题，用户在对接第三方 MCP 服务时会直接卡死。  
   诉求是：**认证流程应自动兼容常见服务端握手逻辑**。  
   链接：<https://github.com/NousResearch/hermes-agent/issues/51535>

5. **#51465 [OPEN] Slack gateway `--replace` 退出 SIGTERM + Unclosed client session**  
   指向 gateway 在消息平台接入层存在生命周期管理问题，属于生产可用性范畴。  
   链接：<https://github.com/NousResearch/hermes-agent/issues/51465>

总体看，今天的热点非常集中：**用户最关心的不是“能不能连上”，而是“连上后是否真能稳定工作、配置是否会漂移、消息/工具是否会静默失效”。**

---

## 5) Bug 与稳定性
按严重程度排序，今天最值得关注的问题如下：

### P1 / 高风险
- **#51579 [OPEN] Docker 启动迁移每次都会剥离 `.env`，导致容器重启后反复损坏配置**  
  影响面大，属于会直接破坏部署状态的回归问题。  
  **是否已有 fix PR：有相关修复 PR #51615**（事务化回滚/恢复备份）。  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51579>  
  PR 链接：<https://github.com/NousResearch/hermes-agent/pull/51615>

- **#51587 [CLOSED] MCP 工具已启用但不进入 agent 可调用工具集**  
  这会让用户感觉“功能配置成功却完全不可用”，属于典型高优先级可用性故障。  
  **是否已有 fix PR：未在今日数据中看到明确对应 PR。**  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51587>

- **#51568 [OPEN] cron deliver=origin 从 TUI/CLI 触发时静默失败**  
  任务执行成功但无法送回原会话，属于消息回投链路失效。  
  **是否已有 fix PR：未看到。**  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51568>

### 安全 / 账号隔离
- **#51603 [OPEN] Anthropic token 解析绕过 profile secret scope，存在跨 profile 凭证泄漏风险**  
  这是今天最需要优先处理的安全问题之一，尤其在 multiplex 模式下影响更大。  
  **是否已有 fix PR：有，#51604。**  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51603>  
  PR 链接：<https://github.com/NousResearch/hermes-agent/pull/51604>

### P2 / 中高风险
- **#51605 [OPEN] Email adapter 在 `previewed=True` 且 `content_delivered=False` 时重复回复**  
  会导致用户重复收件，属于消息投递可靠性问题。  
  **是否已有 fix PR：未看到。**  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51605>

- **#51543 [OPEN] Telegram channel 附件不投递，仅文本到达**  
  对多媒体消息场景影响明显，说明平台适配层仍存在缓存/转发缺口。  
  **是否已有 fix PR：未看到。**  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51543>

- **#51512 [OPEN] openai-codex reasoning-replay 返回 400 Unsupported content type，且未触发自愈**  
  影响 Codex backend 的稳定调用链。  
  **是否已有 fix PR：未看到。**  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51512>

- **#51520 [OPEN] Desktop cron sidebar 显示所有 profile 的 job 聚合列表**  
  属于多 profile 场景下的数据隔离/UI 误导问题。  
  **是否已有 fix PR：未看到。**  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51520>

### P3 / 体验与边界条件
- **#51613 [OPEN] Oracle Linux 安装未自动安装 git / ripgrep / ffmpeg**  
  属于安装依赖探测不足。  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51613>

- **#51578 [OPEN] computer_use 找不到 Qt6 应用窗口**  
  影响桌面自动化能力，在 Linux/Qt6 组合上尤为明显。  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51578>

- **#51463 [OPEN] Signal 重复消息回归**  
  说明历史修复可能未完全覆盖当前路径。  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51463>

### 已关闭的稳定性修复
- **#51571 [CLOSED] Desktop stop-button popup 修正**  
  修复了提示用户执行不存在 `/interrupt` 的问题。  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51571>

- **#51575 [CLOSED] Desktop stop-button popup 指向错误 slash command**  
  与上面同类问题，已关闭。  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51575>

---

## 6) 功能请求与路线图信号
今天出现的功能需求，明显指向三个方向：**桌面效率、插件上下文能力、外部存储/可观测性**。

- **#51548 [OPEN] Desktop 左侧栏增加 “New Workspace” 按钮**  
  这是典型的桌面工作流优化，目标是降低新工作区/新会话创建成本。  
  若桌面端继续强化，这类交互优化有较高纳入概率。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/51548>

- **#51555 [OPEN] context-aware plugin slash commands for authenticated gateway metadata**  
  这是插件系统的重要演化方向：从“只能处理 raw_args”走向“可感知上下文、可审计、可授权”。  
  **高度相关的实现信号已出现：#51596 PR 正在推进。**  
  Issue 链接：<https://github.com/NousResearch/hermes-agent/issues/51555>  
  PR 链接：<https://github.com/NousResearch/hermes-agent/pull/51596>

- **#51591 [OPEN] Turso memory 外部 provider**  
  说明用户希望 Hermes 的记忆层更可插拔。  
  如果后续继续出现 memory/skills 相关 PR，这条很可能进入下一轮功能包。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/51591>

- **#51590 [OPEN] gateway 启动被阻塞时的结构化 telemetry + crash-loop 可见性**  
  这类需求非常贴近运维场景，说明项目正走向生产可观测性建设。  
  链接：<https://github.com/NousResearch/hermes-agent/issues/51590>

- **#51599 [OPEN] skills frontmatter validator + provenance-aware Source/Trust labeling**  
  这虽然以 PR 形式出现，但实质上是能力治理与来源标注的路线信号。  
  对企业/多来源技能生态很重要。  
  链接：<https://github.com/NousResearch/hermes-agent/pull/51599>

**路线图判断：**
- **较可能优先进入下一版本**：插件上下文能力、MCP OAuth/连接稳定性、computer_use/Linux 兼容、cron 语义修复、Telemetry/可观测性。
- **中期值得关注**：桌面端工作区效率、Memory provider 扩展、技能来源/信任体系。

---

## 7) 用户反馈摘要
从今天 Issues 的真实表述看，用户痛点非常一致：

1. **“看起来配置成功，但实际上没生效”**  
   MCP 工具未进入 session toolset、OAuth 连接失败、channel 附件丢失、cron 任务回投失败，都是典型的**静默失败**问题。  
   用户最在意的是“可用性闭环”，而不是仅仅“连接建立”。

2. **“状态不应该在重启或切换时漂移”**  
   Docker 启动迁移重复改写 `.env`、gateway model 切换残留旧 base_url、profile 间凭证可能串用，反映出大家对**持久化与隔离**非常敏感。  
   这说明 Hermes 已经被用于更接近生产的场景。

3. **“我需要它接入真实工作流，而不是只在理想路径里运行”**  
   Telegram / Slack / Feishu / Signal / Email / MCP / Any.do / AgentMail / FreeCAD / Oracle Linux / Termux / Windows installer 这些场景，说明 Hermes 不是单一聊天机器人，而是被当作**跨平台 AI 中枢**来用。  
   也因此，平台适配问题会被迅速放大。

4. **桌面端与 cron 场景的反馈集中在“交互和可见性”**  
   用户希望 stop、workspace、cron list、delivery target 这些概念在 UI 上明确且准确，不能靠隐式约定。

总体来看，用户对 Hermes 的评价逻辑是：**能力面很强，但对稳定性、提示准确性、认证与投递链路的要求同样高。**

---

## 8) 待处理积压
虽然今天没有看到“长时间无人响应”的老问题，但**高优先级且尚未被充分讨论的新增积压**已经开始形成，建议维护者尽快 triage：

- **#51579** Docker `.env` 被自动迁移反复剥离，P1  
  <https://github.com/NousResearch/hermes-agent/issues/51579>

- **#51568** cron `deliver=origin` 静默失败，P1  
  <https://github.com/NousResearch/hermes-agent/issues/51568>

- **#51587** MCP tools 不进入 session toolset，P1  
  <https://github.com/NousResearch/hermes-agent/issues/51587>

- **#51603** Anthropic 凭证跨 profile 泄漏风险，安全问题  
  <https://github.com/NousResearch/hermes-agent/issues/51603>

- **#51605** Email 重复回复，影响投递稳定性  
  <https://github.com/NousResearch/hermes-agent/issues/51605>

- **#51606** Kanban dispatcher SQLite 索引损坏  
  <https://github.com/NousResearch/hermes-agent/issues/51606>

- **#51535** MCP OAuth 405，第三方接入阻塞  
  <https://github.com/NousResearch/hermes-agent/issues/51535>

- **#51543** Telegram 附件丢失  
  <https://github.com/NousResearch/hermes-agent/issues/51543>

同时，PR 队列也很长，当前有大量待合并修复，建议优先审核：
- **#51615 / #51604 / #51600 / #51608 / #51614 / #51602 / #51601 / #51594 / #51598 / #51597 / #51596 / #51590**  
  PR 列表入口：<https://github.com/NousResearch/hermes-agent/pulls>

---

### 总结判断
今天 Hermes Agent 的状态可以概括为：**高活跃、高反馈密度、高修复压力**。  
项目正在围绕 **gateway 稳定性、MCP 接入、cron 投递、跨平台兼容、安全隔离** 进行集中修补；这说明产品使用面在扩大，但也意味着维护重心已经明显从“加功能”转向“保可靠”。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

以下为 **PicoClaw（sipeed/picoclaw）2026-06-24 项目动态日报**。整体来看，过去 24 小时项目处于**低频更新、明确聚焦**的状态：只有 1 条 Issue 和 1 条 PR 产生活动，暂无新版本发布。当前最值得关注的是一个 **Android/Termux 上的高优先级崩溃问题**，以及一个围绕 **AWS Bedrock prompt caching** 的功能增强提案。

---

## 1. 今日速览

过去 24 小时，PicoClaw 的社区活跃度偏低，但问题与需求都较集中：一边是 **Android/Termux 环境下 gateway 崩溃的稳定性问题**，另一边是 **Bedrock Converse API 的缓存优化能力**，说明项目当前同时面临“可靠性修复”和“能力增强”的双线诉求。  
从数量上看，只有 **1 条新/活跃 Issue、1 条待合并 PR**，没有已合并变更，也没有新版本发布，表明仓库进入了一个**轻量讨论、等待维护者响应**的阶段。  
就健康度而言，项目并未出现广泛的故障扩散，但新增 Issue 的描述指向了**启动即崩**级别的问题，这类反馈通常对移动端/嵌入式用户影响较大，值得优先排查。  
整体判断：**活跃度低、风险点明确、技术方向清晰**，当前更像是“少量高价值反馈”驱动的维护窗口。  

---

## 2. 项目进展

今日 **没有已合并或关闭的重要 PR**，因此没有实际进入主线的功能或修复落地。  
当前最接近“项目推进”的，是下面这条仍处于 OPEN 的功能 PR：

- **#3163 feat(bedrock): leverage Converse prompt caching via cache points**  
  链接：<https://github.com/sipeed/picoclaw/pull/3163>  
  该 PR 试图利用 AWS Bedrock Converse API 的 **prompt caching / cache points**，目标是降低输入成本、提高长上下文场景效率。  
  如果该 PR 后续合并，将意味着 PicoClaw 在 **LLM 接入与推理成本优化** 上迈出一步，尤其对长 prompt、多轮对话、工具调用密集场景有明显价值。

**今日整体推进幅度评估：较小。**  
原因在于：没有合并/关闭记录，说明代码层面的实质推进尚未发生；但从 PR 主题看，项目方向仍在围绕“AI 接入效率”和“运行稳定性”持续演化。

---

## 3. 社区热点

今天没有出现高评论、高反应的讨论线程，社区热度主要集中在两个单点：

### 3.1 Android/Termux 崩溃问题
- **#3164 [OPEN] [BUG] Process hooks crash gateway on Android/Termux (v0.2.9, config v3)**  
  链接：<https://github.com/sipeed/picoclaw/issues/3164>  
  关注点：进程 hooks（JSON-RPC over stdio）在 Android/Termux 下会导致 gateway 在启动后约 2 秒内崩溃。  
  **背后诉求：**
  - 用户希望 PicoClaw 在移动/类 Linux 终端环境稳定运行；
  - 这类场景通常资源受限、兼容性复杂，说明用户群里存在“本地轻量部署”需求；
  - 即使是最小化 hook 也会触发崩溃，说明问题可能在生命周期管理、stdio 处理或平台兼容层。

### 3.2 Bedrock prompt caching 增强
- **#3163 feat(bedrock): leverage Converse prompt caching via cache points**  
  链接：<https://github.com/sipeed/picoclaw/pull/3163>  
  关注点：利用 cache points 降低长 prompt 的输入成本。  
  **背后诉求：**
  - 用户希望降低 LLM 调用开销；
  - 这通常来自频繁调用、长系统提示词、工具链较多的工作流；
  - 说明 PicoClaw 的使用场景正在向**成本敏感型 AI 编排**延伸。

**结论：**  
今天的热点不是“广泛讨论”，而是“两个明确方向的单点诉求”：  
- 一类用户在追求 **稳定运行**；  
- 另一类用户在追求 **更低成本、更高效率的模型接入**。

---

## 4. Bug 与稳定性

按严重程度排序，今日新增/活跃问题如下：

### 4.1 高严重性：Android/Termux 启动即崩
- **#3164 [OPEN] [BUG] Process hooks crash gateway on Android/Termux (v0.2.9, config v3)**  
  链接：<https://github.com/sipeed/picoclaw/issues/3164>  
  严重程度：**高**  
  影响范围：Android/Termux 用户、使用 process hooks / JSON-RPC over stdio 的场景  
  主要表现：gateway 启动后约 2 秒内崩溃，最小化 hook 也会触发  
  当前状态：**暂无已知 fix PR**  
  风险判断：这属于**运行时崩溃级**问题，优先级应高于普通兼容性 bug，因为它直接阻断核心功能使用。

**稳定性判断：**
- 今天没有大规模报错潮，但这个单点问题足够说明项目在某些平台上的边界条件仍需加强；
- 若该 bug 复现稳定，建议优先补充：
  1. Android/Termux 复现脚本  
  2. process hooks 生命周期日志  
  3. stdio 子进程管理与退出码分析  
  4. 最小可复现样例

---

## 5. 功能请求与路线图信号

今日最明确的功能信号来自 PR，而不是 Issue：

### 5.1 Bedrock Converse prompt caching
- **#3163 feat(bedrock): leverage Converse prompt caching via cache points**  
  链接：<https://github.com/sipeed/picoclaw/pull/3163>  
  这不是纯概念性建议，而是已经进入实现阶段的功能增强提案。  
  **路线图含义：**
  - PicoClaw 正在向更强的 **LLM 成本控制能力** 发展；
  - 如果合并，说明项目对云模型 API 的高级特性支持在加深；
  - 对多轮对话、Agent 编排、长系统提示词场景有直接收益。

### 5.2 稳定性修复需求也在形成“隐性路线图”
- **#3164** 暗示项目下一阶段可能需要补足：
  - 非桌面平台兼容性
  - process hooks 的鲁棒性
  - gateway 容错与崩溃保护

**判断：**
- 如果维护者资源有限，**#3164 更偏“必须修”**，  
- **#3163 更偏“值得收”**，因为它提升能力和体验，但不影响当前用户生存。  
- 从版本节奏看，若下一版发布，较可能同时包含 **稳定性修复 + Bedrock 相关能力增强** 两条主线之一或两者兼有。

---

## 6. 用户反馈摘要

从今日 Issue 的描述中，可以提炼出较真实的用户痛点与使用场景：

### 6.1 用户痛点
- **启动即崩，无法使用**
  - 用户反馈不是“偶发异常”，而是“一启动就死”；
  - 对终端工具而言，这是最高等级的阻断式体验问题。

- **最小化配置也会失败**
  - “hello world” 级别的 hook 也能触发崩溃，意味着问题不在复杂业务逻辑，而更可能是底层机制或平台兼容性；
  - 这让用户对配置复杂度和稳定性产生负反馈。

### 6.2 使用场景
- **Android/Termux 本地运行**
  - 说明 PicoClaw 被用于移动端终端环境，可能是轻量代理、脚本执行、AI gateway 或本地编排入口；
  - 这类场景对子进程、stdio、权限、信号处理要求更敏感。

### 6.3 用户期待
- 希望 PicoClaw 在**多平台可用性**上更稳；
- 希望对 hook / gateway 的失败有更清晰的日志和隔离机制；
- 同时也希望在模型调用上获得**成本优化**能力（从 PR#3163 可见）。

---

## 7. 待处理积压

从当前数据看，**没有真正意义上的“长期未响应积压”**，因为今日活跃项都是 2026-06-23 新近出现的。  
但从“待处理”角度，以下两项值得维护者尽快关注：

### 7.1 需要优先 triage 的高风险 Bug
- **#3164 [OPEN] [BUG] Process hooks crash gateway on Android/Termux (v0.2.9, config v3)**  
  链接：<https://github.com/sipeed/picoclaw/issues/3164>  
  说明：虽然不是积压很久，但属于影响使用面较广的崩溃问题，应优先排查。

### 7.2 等待评审的功能 PR
- **#3163 feat(bedrock): leverage Converse prompt caching via cache points**  
  链接：<https://github.com/sipeed/picoclaw/pull/3163>  
  说明：若该 PR 能尽快评审，将有助于项目在 AI 成本优化能力上形成新亮点。

**积压风险判断：**
- 目前不是“数量堆积”问题，而是“关键项等待响应”问题；
- 如果这两项继续滞留，用户会更明显感受到：**稳定性问题无人确认、功能优化无人推进**。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合直接发群/周报的简版**，或  
2. **适合管理层阅读的表格化版本**（含风险评级、优先级、建议动作）。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下为 **NanoClaw（q/wibitai/nanoclaw）2026-06-24 项目动态日报**。  
统计口径：过去 24 小时内的 GitHub 更新。

---

## 1. 今日速览

过去 24 小时内，NanoClaw 处于 **中高活跃、以收敛式迭代为主** 的状态：共有 **1 条 Issue 更新**、**9 条 PR 更新**，其中 **7 条已关闭/合并**，推进效率较高。  
当前工作重心明显集中在 **Slack 接入链路修正、Chat SDK 版本统一、以及可扩展性/硬化改造** 上，说明项目正在从功能落地转向接口稳定与架构整理。  
今天没有新版本发布，因此本轮变化主要体现在代码流推进，而不是正式对外发版。  
从健康度看，项目活跃但没有明显“讨论型”社区噪音，更多是开发侧的持续推进。  
相关仓库：https://github.com/nanocoai/nanoclaw

---

## 2. 版本发布

**今日无新版本发布**，因此该部分省略。

---

## 3. 项目进展

过去 24 小时内，PR 层面有 **9 条更新**，其中 **7 条已关闭/合并**，意味着约 **77.8%** 的 PR 变更已完成收敛，项目推进效率较好。

### 重点进展
1. **Slack 接入能力继续演进**
   - PR #2837：新增 **Slack Socket Mode**，使用 `SLACK_APP_TOKEN` 通过 **出站 WebSocket** 连接，避免依赖公网入口。
   - 这类改动对 NAT/本地开发/无公网端口环境非常关键，直接改善 Slack 场景可用性。  
   链接：https://github.com/nanocoai/nanoclaw/pull/2837

2. **Chat SDK 与 channel adapter 全面升版到 4.29.0**
   - PR #2834：主干安装面升级到 **Chat SDK 4.29.0**
   - PR #2835：channels 分支的 `@chat-adapter/*` 和 `chat` 升级到 **4.29.0**
   - PR #2836：providers 分支同步到 **4.29.0**
   - 这说明项目正在统一版本栈，减少 adapter/bridge 之间的类型与生成代码不一致问题。  
   链接：
   - https://github.com/nanocoai/nanoclaw/pull/2834
   - https://github.com/nanocoai/nanoclaw/pull/2835
   - https://github.com/nanocoai/nanoclaw/pull/2836

3. **可扩展性与稳定性硬化**
   - PR #2841：引入通用的 **inert extension-point seams**（`registerX/applyX`）
   - PR #2842：继续补强扩展点，并 **预留内置 MCP server 名称**
   - 这类改动表明项目开始为后续插件化、下游 fork、以及 MCP 生态兼容做结构准备。  
   链接：
   - https://github.com/nanocoai/nanoclaw/pull/2841
   - https://github.com/nanocoai/nanoclaw/pull/2842

4. **Hook / surface 防护**
   - PR #2833：`hook surface guard`
   - 表明项目在限制不安全扩展面，属于稳定性与治理类改动。  
   链接：https://github.com/nanocoai/nanoclaw/pull/2833

### 今日整体推进判断
- 功能上，Slack 能力和 provider 扩展继续补齐。
- 工程上，版本锁定与扩展边界正在整理。
- 维护上，关闭/合并占比高，说明近期 PR 流转较顺畅。  
总的来说，项目今天的“前进量”不在于新增大量用户可见功能，而在于 **把关键通道做稳、把架构边界做清晰**。

---

## 4. 社区热点

从当前数据看，**没有明显的高评论或高 reaction 热点**：  
- Issues 评论数均为 0
- PR 评论字段未提供，反应数也均为 0

不过，**最贴近真实用户诉求** 的仍是 Slack 相关问题：

### 热点 1：Slack 安装/端口冲突问题
- Issue #2840：`Nanoclaw v2 binds port 3000 of external host ip for slack`
- 用户反馈：安装并选择 Slack 后，文档建议创建到 3000 端口的 tunnel，但程序却已经把外部主机 IP 的 3000 端口占住了，导致 tunnel 失去意义。  
链接：https://github.com/nanocoai/nanoclaw/issues/2840

### 热点 2：Slack 连接方式转向 Socket Mode
- PR #2837：`feat(slack): Socket Mode — adapter + guided setup (SLACK_APP_TOKEN)`
- 这条 PR 与上面的 issue 诉求高度一致：从“依赖入站端口”转向“出站 WebSocket”，更适合本地开发和无公网入口环境。  
链接：https://github.com/nanocoai/nanoclaw/pull/2837

### 结论
当前“热点”不是讨论热度，而是 **Slack 可用性与部署形态适配** 这一真实使用场景。

---

## 5. Bug 与稳定性

### 高优先级 / 影响较大
1. **Slack tunnel/端口冲突**
   - Issue #2840：`Nanoclaw v2 binds port 3000 of external host ip for slack`
   - 影响：破坏了“通过 tunnel 避免公网暴露端口”的预期，尤其影响 NAT/外网受限环境下的 Slack 使用。
   - 严重程度：**中高**
   - 相关修复信号：PR #2837 提供了 Socket Mode 方案，方向上可缓解该问题，但当前数据无法确认其是否已完全覆盖该 issue。  
   链接：https://github.com/nanocoai/nanoclaw/issues/2840  
   相关 PR：https://github.com/nanocoai/nanoclaw/pull/2837

### 低风险观察
- 今日未见新的崩溃、回归或数据损坏类报告。
- 未出现多条同时爆发的稳定性事件，当前稳定性压力主要集中在 Slack 接入方式的兼容性上。

---

## 6. 功能请求与路线图信号

结合今日开放的 PR，可以看出几个明确的路线图信号：

### 1) 扩展点与插件化能力增强
- PR #2841：通用 extension-point seams
- PR #2842：在扩展点基础上进一步做硬化，并预留 MCP server 名称
- 说明项目未来大概率会继续强化 **可插拔、可定制、可下游扩展** 的架构。  
链接：
- https://github.com/nanocoai/nanoclaw/pull/2841
- https://github.com/nanocoai/nanoclaw/pull/2842

### 2) Provider 体系持续扩容
- PR #2838：`feat(providers): add Manifest model router provider`
- 表明项目在新增模型/路由 provider 能力，路线图上更偏向 **多 provider 接入与统一编排**。  
链接：https://github.com/nanocoai/nanoclaw/pull/2838

### 3) Slack 场景从“端口暴露”走向“Socket Mode”
- PR #2837 与 Issue #2840 共同说明：Slack 的部署体验是当前用户痛点之一，后续很可能继续围绕 **无公网端口、安全连接、引导式配置** 迭代。  
链接：
- https://github.com/nanocoai/nanoclaw/pull/2837
- https://github.com/nanocoai/nanoclaw/issues/2840

### 路线图判断
若有下一版本，这三类方向最可能被纳入：
- 扩展点/插件化
- MCP 相关兼容与命名治理
- Slack/Channel 接入体验完善

---

## 7. 用户反馈摘要

当前 Issues 中没有评论线程，因此用户反馈主要来自 **Issue 标题与描述本身**。

### 真实痛点
- 用户在 **安装并选择 Slack** 时，希望通过 tunnel 保持安全、避免直接暴露端口。
- 但当前行为会占用外部 host 的 3000 端口，导致 tunnel 方案失效。
- 这说明用户在意的是：
  1. **安全性**
  2. **本地/受限网络可用性**
  3. **安装指引与实际运行行为一致性**

### 典型使用场景
- 本地开发环境
- 受 NAT/防火墙限制的主机
- 希望通过 tunnel 或 Socket Mode 规避公网暴露的 Slack 集成场景

### 情绪与满意度信号
- 没有评论互动，因此无法从讨论中判断情绪波动。
- 但从问题表述看，用户对“文档建议”和“实际行为冲突”存在明确不满意。  
链接：https://github.com/nanocoai/nanoclaw/issues/2840

---

## 8. 待处理积压

### 当前结论
从本次数据看，**没有明显的长期未响应积压**：  
- 新 Issue 仅 1 条，且为当天更新
- 新 PR 多为当天创建/关闭，整体流转较快

### 仍建议继续跟踪的待处理项
1. **Slack 端口冲突 Issue**
   - #2840 需要确认是否被 #2837 的 Socket Mode 方案完全覆盖，或者仍需文档/默认配置修正。  
   链接：https://github.com/nanocoai/nanoclaw/issues/2840

2. **开放中的功能 PR**
   - #2838 Manifest model router provider  
   - #2842 extension-point seams + MCP 名称预留  
   这两项都更偏向下一阶段能力建设，值得维护者优先评估是否纳入主线。  
   链接：
   - https://github.com/nanocoai/nanoclaw/pull/2838
   - https://github.com/nanocoai/nanoclaw/pull/2842

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合直接发 Slack/飞书的简版**
2. **适合管理层看的 KPI 版**
3. **适合开源社区周报的正式版**

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

以下为 **IronClaw（nearai/ironclaw）2026-06-24 项目动态日报**，基于过去 24 小时 GitHub 数据整理。

## 1. 今日速览

过去 24 小时内，IronClaw 处于 **高活跃迭代期**：共更新 **11 个 Issues**、**19 个 PR**，但 **没有新版本发布**。从内容看，项目重点集中在 **Slack/WebUI 集成、认证与凭据修复、E2E/CI 稳定性、记忆与上下文架构重构**，说明团队正在同时推进产品功能完善和底层可靠性治理。  
今天已关闭/合并的 PR 有 **6 个**，整体节奏偏快，且多数变更围绕高价值模块展开，项目健康度总体良好，但仍暴露出若干 **体验型 Bug、CI 抖动和性能/上下文压力问题**，后续需要持续消化。  
相关：Issues 总览、PR 总览  
- Issues: <https://github.com/nearai/ironclaw/issues>  
- PRs: <https://github.com/nearai/ironclaw/pulls>

---

## 2. 版本发布

**无新版本发布**（过去 24 小时 Releases = 0）。  
Releases: <https://github.com/nearai/ironclaw/releases>

---

## 3. 项目进展

今日较重要的合并/关闭 PR，主要推动了 **Slack 体系、WebUI 配置、E2E 覆盖、GSuite 回退逻辑** 和 **GitHub API 修复**：

1. **Slack 路由与交付链路继续完善**
   - [#5164 Restore Slack routine outbound targets](https://github.com/nearai/ironclaw/pull/5164)  
     让动态 Slack outbound target 可用，补齐 routine 选择链路。
   - [#5166 Wire dynamic Slack routine delivery](https://github.com/nearai/ironclaw/pull/5166)  
     将 WebUI 管理的 Slack 交付接入 triggered-run delivery hook，增强动态投递能力。
   - [#5152 feat(slack): move setup into WebUI](https://github.com/nearai/ironclaw/pull/5152)  
     将 Slack setup 从 TOML/静态配置迁移到 WebUI，说明产品在向“可视化配置 + 运行时管理”演进。
   - [#5150 restore GSuite duplicate account fallback](https://github.com/nearai/ironclaw/pull/5150)  
     恢复重复账号回退逻辑，提升真实环境下的容错。

2. **E2E / 回归测试继续增强**
   - [#5155 Add Reborn Emulate full-path calendar E2E](https://github.com/nearai/ironclaw/pull/5155)  
     增加全链路 calendar E2E 覆盖，说明团队在补强端到端验证。
   - 相关 canary issue 已关闭：  
     - [#5153](https://github.com/nearai/ironclaw/issues/5153)  
     - [#5154](https://github.com/nearai/ironclaw/issues/5154)  
     - [#5158](https://github.com/nearai/ironclaw/issues/5158)

3. **GitHub API 修复链路出现“关闭后重开/重提”迹象**
   - [#5168 CLOSED fix: correct Reborn GitHub API requests](https://github.com/nearai/ironclaw/pull/5168)  
   - [#5171 OPEN fix: correct Reborn GitHub API requests](https://github.com/nearai/ironclaw/pull/5171)  
   这很像同一问题从旧 PR 关闭后，以新 PR 继续推进，说明修复方向明确，但实现/验证仍在迭代。

**整体推进判断：**  
今天的已关闭 PR 不是“零散修补”，而是明显在向两个方向收敛：  
- **产品层**：Slack/WebUI 体验与配置从静态走向动态、可管理；  
- **工程层**：E2E、回退逻辑、API 请求形态、认证健壮性持续补洞。  
这意味着项目不仅在做功能增量，也在提升可运营性与发布可信度。

---

## 4. 社区热点

### Issues 热点

1. [#5154 E2E Canary: GitHub issue workflow](https://github.com/nearai/ironclaw/issues/5154)  
   - 评论数：2，点赞：0  
   - 虽然是 canary 任务，但它验证的是核心工作流：**Issue → 自动认领 → 创建草稿 PR → 产出最小修改**。  
   - 这类 issue 之所以活跃，是因为它直接反映自动化编排链路是否可用。

2. [#5169 Bundled skills trip the prompt-safety vocabulary denylist](https://github.com/nearai/ironclaw/issues/5169)  
   - 评论数：1，点赞：0  
   - 核心诉求很明确：**安全词表过于激进，误伤正常 API 词汇**，导致用户的 benign 请求被错误拦截并伪装成“temporary system issue”。  
   - 这是典型的“安全与可用性冲突”问题，且影响面可能较广。

### PR 热点

> PR 的评论数/反应数在原始数据里未提供，无法严格按“最活跃”排序；以下按影响面与主题热度列出。

- [#5156 feat(skill-learning): any-backend distillation...](https://github.com/nearai/ironclaw/pull/5156)  
  大型特性 PR，涉及技能学习、审批门禁、持久化开关，通常会引发较多讨论。

- [#5163 feat(memory): model memory as a userland extension](https://github.com/nearai/ironclaw/pull/5163)  
  这是结构级重构，涉及 memory 由 kernel 下沉/上移到 extension 化架构，属于路线图级热点。

- [#5149 feat(reborn): Context management — progressive tool disclosure](https://github.com/nearai/ironclaw/pull/5149)  
  直接针对“上下文过大、NEAR AI 超时”的实际痛点，属于性能与成本控制的热点议题。

- [#5172 Fix Reborn credential delete and reauth](https://github.com/nearai/ironclaw/pull/5172)  
  认证与凭据回收是高敏感、高优先级主题，通常会影响线上可恢复性。

---

## 5. Bug 与稳定性

按严重程度排序如下：

### 1) 高危：误杀正常请求，影响核心可用性
- [#5169 Bundled skills trip the prompt-safety vocabulary denylist](https://github.com/nearai/ironclaw/issues/5169)  
  **问题**：普通 API 词汇触发 prompt-safety denylist，导致任务直接失败并返回误导性“temporary system issue”。  
  **影响**：这不是单纯 UX 问题，而是会让正常请求不可执行。  
  **已有 fix PR？** 当前数据中 **未见明确对应修复 PR**。

### 2) 高危：调度/心跳可能自死锁，任务卡死
- [#5148 Turn scheduler heartbeat can self-deadlock](https://github.com/nearai/ironclaw/issues/5148)  
  **问题**：scheduler heartbeat 在持有同一 async store lock 时触发，可能导致 run 永久卡住。  
  **影响**：会造成任务停滞，属于执行层稳定性隐患。  
  **已有 fix PR？** 当前数据中 **未见明确对应修复 PR**。

### 3) 高危：CI/merge queue 抖动，直接影响交付效率
- [#5147 Flaky test blocks the merge queue](https://github.com/nearai/ironclaw/issues/5147)  
  **问题**：测试 `trigger_poller_does_not_submit_turn_for_unpaired_actor` 偶发失败，甚至把 PR 踢出 merge queue。  
  **影响**：直接拖慢整体研发节奏。  
  **已有 fix PR？** 未见直接对应修复；  
  相关但不等同修复的 PR：[#5159](https://github.com/nearai/ironclaw/pull/5159)（减少旧 CI 重复运行，偏“减噪”而非修复 flaky 本身）。

### 4) 中危：自动化能力失灵，影响 Agent 能力可信度
- [#5151 Claude fails to create Reborn automation after trigger pause/resume tools are exposed](https://github.com/nearai/ironclaw/issues/5151)  
  **问题**：模型没有按预期调用 `builtin.trigger_create`，而是错误使用其他工具。  
  **影响**：自动化创建失败，属于核心 agent 行为偏差。  
  **已有 fix PR？** 当前未见直接对应修复。

### 5) 中危：环境/设置不一致，功能入口消失
- [#5157 Inference section sometimes missing from Settings on Railway hosting](https://github.com/nearai/ironclaw/issues/5157)  
  **问题**：Settings 中 Inference 区块有时缺失。  
  **影响**：影响部署环境下的配置可见性。  
  **已有 fix PR？** 未见明确对应修复。

### 6) 中低危：产品功能缺口/管理链路不完整
- [#5146 No button to deactivate an extension on Extensions page](https://github.com/nearai/ironclaw/issues/5146)  
  **问题**：扩展页缺少停用入口。  
  **影响**：降低扩展管理闭环体验。  
- [#5144 Show NEAR AI default base URL in provider card](https://github.com/nearai/ironclaw/issues/5144)  
  **问题**：实际有效 base URL 存在，但 UI 显示 `None`。  
  **影响**：可观测性差，容易误判配置状态。  
- [#5167 Stop tracking `dist` in git and build it from current code](https://github.com/nearai/ironclaw/issues/5167)  
  **问题**：仓库追踪 dist 引发 PR churn。  
  **影响**：偏工程治理与发布卫生问题。

---

## 6. 功能请求与路线图信号

结合今日 Issues 与 PR，以下方向很可能进入下一阶段的持续投入：

1. **记忆系统架构重构**
   - [#5163 feat(memory): model memory as a userland extension](https://github.com/nearai/ironclaw/pull/5163)  
   - [#5165 optional native memory seeding](https://github.com/nearai/ironclaw/pull/5165)  
   这是明显的路线图级变更：从 kernel 走向 provider-neutral contract，再到 native provider。  
   **判断**：极可能是下一版的重要主线之一。

2. **上下文管理与 token 成本控制**
   - [#5149 progressive tool disclosure](https://github.com/nearai/ironclaw/pull/5149)  
   直接回应“每次调用都塞入大量工具 schema 导致超时”的问题。  
   **判断**：如果 NEAR AI timeout 问题持续存在，这个 PR 的优先级会很高。

3. **技能学习与安全审批门禁**
   - [#5156 feat(skill-learning): approval gate, learned-only scoping](https://github.com/nearai/ironclaw/pull/5156)  
   这类变更通常会进入产品主线，因为它同时影响安全、质量与用户可控性。  
   **判断**：非常像下一版本的候选功能。

4. **认证/凭据治理**
   - [#5172 Fix Reborn credential delete and reauth](https://github.com/nearai/ironclaw/pull/5172)  
   - [#5171 correct Reborn GitHub API requests](https://github.com/nearai/ironclaw/pull/5171)  
   说明项目在持续补强“授权、失效、恢复”路径。  
   **判断**：这类修复通常会随着功能扩张继续出现，是稳定上线的前置条件。

5. **Slack/WebUI 走向可配置化、产品化**
   - [#5152](https://github.com/nearai/ironclaw/pull/5152)  
   - [#5161](https://github.com/nearai/ironclaw/pull/5161)  
   - [#5162](https://github.com/nearai/ironclaw/pull/5162)  
   Slack 配置从静态转为 WebUI 管理，并增加 env override，说明平台化能力在增强。  
   **判断**：短期内仍会继续完善。

---

## 7. 用户反馈摘要

从 issues 的描述来看，用户反馈集中在以下真实痛点：

- **“我明明发的是正常请求，却被安全词表误伤”**  
  来自 [#5169](https://github.com/nearai/ironclaw/issues/5169)。  
  这类反馈说明用户最不满意的是：系统把可理解的输入误判为危险内容，而且失败信息还不够真实可诊断。

- **“设置页/管理页不稳定或不完整”**  
  来自 [#5157](https://github.com/nearai/ironclaw/issues/5157)、[#5146](https://github.com/nearai/ironclaw/issues/5146)、[#5144](https://github.com/nearai/ironclaw/issues/5144)。  
  说明用户在部署、配置、扩展管理阶段的体验并不平滑，尤其是在 Railway 这类托管环境中，UI 与实际运行态存在偏差。

- **“自动化没有按我的意图做事”**  
  来自 [#5151](https://github.com/nearai/ironclaw/issues/5151)。  
  用户希望 agent 能可靠创建自动化，但模型工具选择偏离预期，暴露出计划执行层的不确定性。

- **“系统会卡死、测试会抖、队列会被拖慢”**  
  来自 [#5148](https://github.com/nearai/ironclaw/issues/5148)、[#5147](https://github.com/nearai/ironclaw/issues/5147)。  
  这类反馈不是单点 bug，而是用户/开发者对平台稳定性的整体担忧。

- **“上下文太重，导致超时或体验迟钝”**  
  来自 [#5149](https://github.com/nearai/ironclaw/pull/5149) 所反映的问题背景。  
  用户真正的痛点是：系统功能很多，但每次调用都带着过重的上下文与工具定义，最终伤害可用性。

---

## 8. 待处理积压

当前数据中 **没有明显“长期未响应”的老 issue/PR**（大多数条目都在 2026-06-23 创建/更新）。但以下开放项虽然“新”，却是高优先级积压，建议维护者尽快跟进：

- [#5169 Prompt-safety denylist 误伤](https://github.com/nearai/ironclaw/issues/5169)  
- [#5148 scheduler heartbeat 自死锁](https://github.com/nearai/ironclaw/issues/5148)  
- [#5147 merge queue flaky test](https://github.com/nearai/ironclaw/issues/5147)  
- [#5151 自动化创建失败](https://github.com/nearai/ironclaw/issues/5151)  
- [#5167 dist 不应被追踪进 git](https://github.com/nearai/ironclaw/issues/5167)  
- [#5163 memory 体系重构](https://github.com/nearai/ironclaw/pull/5163)  
- [#5149 progressive tool disclosure](https://github.com/nearai/ironclaw/pull/5149)  
- [#5172 credential delete and reauth](https://github.com/nearai/ironclaw/pull/5172)  
- [#5171 GitHub API requests 修复](https://github.com/nearai/ironclaw/pull/5171)

**提醒：** 这些条目大多属于“高影响、低容忍”问题，建议优先处理前 3 个稳定性项，再推进功能型重构。  

如果你希望，我还可以把这份日报进一步整理成 **“适合发给团队群/邮件的精简版”**，或者做成 **表格版（含优先级、风险等级、建议动作）**。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

以下为 **2026-06-24 的 LobsterAI 项目动态日报**（基于过去 24 小时 GitHub 数据）：

---

## 1. 今日速览
过去 24 小时，LobsterAI 呈现出**“低 Issue、高 PR”**的维护型活跃状态：Issues 侧没有新增、也没有关闭，说明外部故障反馈暂时平稳；PR 侧则有 **6 条更新**，其中 **5 条已合并/关闭、1 条仍在审**，表明项目仍在持续推进功能迭代与稳定性修复。  
今日改动重点集中在 **OpenClaw 的 cron/session 处理、scheduled-task 启动状态、以及 cowork 计划确认流程**，属于偏工程质量和产品体验并重的更新。  
整体来看，项目健康度良好，当前节奏更像是“稳步收敛现有能力”，而非大规模新增功能爆发。  
GitHub： [netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 2. 版本发布
今日 **无新版本发布**。  
Release 页面： [GitHub Releases](https://github.com/netease-youdao/LobsterAI/releases)

---

## 3. 项目进展
今日最重要的推进来自 5 条已合并/关闭的 PR，方向高度集中，体现出明显的主线：

- **#2192** `feat(cowork): add persistent plan confirmation flow`  
  为 Plan Mode 增加更持久的确认流程：计划在草稿/会话内保持激活，支持“确认执行”和“调整计划”，并在确认后回到默认模式执行。  
  这会显著改善协作式任务的可控性。  
  链接： [PR #2192](https://github.com/netease-youdao/LobsterAI/pull/2192)

- **#2191** `fix(scheduled-task): clarify startup state`  
  将 scheduled-task 的启动状态拆分得更清晰：loading / ready / error 更易辨识，同时在 OpenClaw 网关握手后立即刷新 cron 数据，减少用户等待。  
  这类改动偏向“可观测性 + 交互体验”双提升。  
  链接： [PR #2191](https://github.com/netease-youdao/LobsterAI/pull/2191)

- **#2190** `fix(openclaw): sync cron run sessions`  
  修复 OpenClaw cron run-scoped session key 的识别与归一化问题，避免重复运行时产生多个本地 Cowork 会话。  
  这属于典型的运行时一致性修复，对稳定性价值很高。  
  链接： [PR #2190](https://github.com/netease-youdao/LobsterAI/pull/2190)

- **#2189** `fix(openclaw): migrate legacy cron storage on startup`  
  启动时检测并迁移旧版 OpenClaw cron 存储，减少升级后因历史数据格式带来的启动异常或数据不一致风险。  
  这类迁移修复通常是平台成熟度提升的标志。  
  链接： [PR #2189](https://github.com/netease-youdao/LobsterAI/pull/2189)

- **#2188** `Liuzhq/rlog`  
  该 PR 已关闭，但当前公开摘要不足，无法准确判断其功能细节；从标签看涉及 renderer / docs / main / openclaw / cowork，多半也是围绕基础体验或日志/协作链路的改动。  
  链接： [PR #2188](https://github.com/netease-youdao/LobsterAI/pull/2188)

**综合判断：** 今日项目进展并非单点功能爆发，而是围绕 **OpenClaw 运行链路、会话一致性、迁移兼容性、计划执行 UX** 做了一轮较完整的打磨。  
GitHub： [Pull Requests](https://github.com/netease-youdao/LobsterAI/pulls)

---

## 4. 社区热点
今日 **没有新增 Issues，也没有可见的高评论/高反应 Issue 线程**；社区讨论热点主要体现在 PR 上，而不是 Issue 上。由于评论数与 reaction 数据均为 0/undefined，说明当前外部争议度不高，讨论更偏工程实现。  

当前最显著的“热点方向”有两类：

1. **AI 网关兼容性扩展**  
   - **#2193** `feat: add LiteLLM as AI gateway provider`  
   这表明社区/维护者对“接入更多模型提供方”的诉求在增强，尤其是希望通过 OpenAI-compatible 统一入口接入 LiteLLM。  
   链接： [PR #2193](https://github.com/netease-youdao/LobsterAI/pull/2193)

2. **OpenClaw / scheduled-task 稳定性与升级兼容**  
   - **#2191 / #2190 / #2189**  
   这一组 PR 集中反映出用户对“任务启动状态清晰、会话不串、老数据可迁移”的实际诉求，典型场景是长期运行后的 cron 任务管理与升级体验。  
   链接： [PR #2191](https://github.com/netease-youdao/LobsterAI/pull/2191)  
   链接： [PR #2190](https://github.com/netease-youdao/LobsterAI/pull/2190)  
   链接： [PR #2189](https://github.com/netease-youdao/LobsterAI/pull/2189)

**结论：** 今日社区热点不是“争论”，而是“能力补齐”和“稳定性修复”。  
GitHub： [Issues](https://github.com/netease-youdao/LobsterAI/issues)

---

## 5. Bug 与稳定性
今日 **没有新增 Bug/崩溃/回归类 Issues**，因此没有来自用户侧的直接故障报告。  
但从已关闭 PR 的内容看，项目团队正在主动处理以下稳定性风险，按影响面大致排序如下：

1. **OpenClaw cron session 错配 / 重复会话风险**  
   - 已通过 **#2190** 处理  
   这是运行时一致性问题，若不修复，可能导致重复会话、任务历史混乱。  
   链接： [PR #2190](https://github.com/netease-youdao/LobsterAI/pull/2190)

2. **历史 cron 存储升级兼容问题**  
   - 已通过 **#2189** 处理  
   对升级用户很关键，属于“从旧版本迁移到新版本”时最容易暴露的稳定性风险。  
   链接： [PR #2189](https://github.com/netease-youdao/LobsterAI/pull/2189)

3. **scheduled-task 启动状态不可辨识 / 数据刷新延迟**  
   - 已通过 **#2191** 处理  
   严重性相对较低，但会显著影响用户对系统健康状态的判断。  
   链接： [PR #2191](https://github.com/netease-youdao/LobsterAI/pull/2191)

**结论：** 没有新增用户报障，但维护侧已经在提前消除潜在稳定性隐患。  
GitHub： [Pull Requests](https://github.com/netease-youdao/LobsterAI/pulls)

---

## 6. 功能请求与路线图信号
今日最明确的功能信号来自以下两项：

- **#2193：LiteLLM 作为 AI gateway provider**  
  这表明项目正在向“多模型/多供应商接入”方向扩展，符合个人 AI 助手和 AI 智能体项目的主流路线。  
  若该 PR 通过，后续很可能成为下一版本的重要卖点之一。  
  链接： [PR #2193](https://github.com/netease-youdao/LobsterAI/pull/2193)

- **#2192：持久化计划确认流程**  
  说明用户/内部对“计划先审后执”的需求明确，尤其适用于复杂任务、协作执行、以及需要二次确认的 agent 场景。  
  这类交互通常会被继续打磨，可能演进为更完整的 plan review / execution workflow。  
  链接： [PR #2192](https://github.com/netease-youdao/LobsterAI/pull/2192)

**路线图判断：**  
下一阶段若继续围绕“接入层 + 执行层”演进，**#2193** 和 **#2192** 相关能力最有可能进入下一轮发布焦点。  
GitHub： [PRs](https://github.com/netease-youdao/LobsterAI/pulls)

---

## 7. 用户反馈摘要
本日报周期内 **没有 Issues 评论数据**，因此无法从真实用户评论中提炼直接反馈、满意点或不满点。  
不过，从 PR 主线仍可推断出用户最关心的实际使用场景：

- **更广泛的模型接入能力**：通过 LiteLLM 统一接入多家 LLM 服务  
  链接： [PR #2193](https://github.com/netease-youdao/LobsterAI/pull/2193)

- **任务执行可控性更强**：Plan Mode 需要“确认后执行”而不是直接落地  
  链接： [PR #2192](https://github.com/netease-youdao/LobsterAI/pull/2192)

- **长期运行场景稳定性**：cron/session/migration 相关修复，说明用户在真实生产或准生产环境中使用较多  
  链接： [PR #2190](https://github.com/netease-youdao/LobsterAI/pull/2190)

**结论：** 当前缺少评论型反馈，但开发优先级已经清晰地反映了用户痛点：**兼容性、稳定性、和执行可控性**。  
GitHub： [Issues](https://github.com/netease-youdao/LobsterAI/issues)

---

## 8. 待处理积压
从当前数据看，**没有长期未响应的重要 Issue**；Issue 侧为 0，说明公开积压压力较小。  
但仍有一个需要维护者尽快关注的“短期待办”：

- **#2193：feat: add LiteLLM as AI gateway provider**  
  当前为 **OPEN**，是今日唯一未关闭的 PR，也最像下一步版本中的候选功能。  
  如果 review 顺利，这将直接影响项目的模型接入能力版图。  
  链接： [PR #2193](https://github.com/netease-youdao/LobsterAI/pull/2193)

GitHub： [Pull Requests](https://github.com/netease-youdao/LobsterAI/pulls)

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合直接发群里的简版**，或  
2. **适合周报系统的结构化 JSON/Markdown 模板**。

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

# CoPaw 项目动态日报（2026-06-24）

## 1) 今日速览
过去 24 小时内，CoPaw/ QwenPaw 仓库保持了**高活跃**：Issues 更新 14 条、PR 更新 34 条，新版本发布 1 个，说明项目仍处于密集迭代期。整体节奏呈现出“**一边修稳定性，一边补体验**”的特征：一方面集中处理运行时错误、上下文/内存问题和移动端适配，另一方面继续推进前端测试与 TUI/ACP、技能市场等功能完善。  
从数据结构看，**34 条 PR 更新里仍有 25 条待合并**，说明开发产出充足，但审查与收敛压力也同步上升；Issues 侧则以真实用户痛点为主，且不少集中在响应速度、上下文正确性和轻量化体验上。  
相关入口： [Release v1.1.12.post2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.12.post2) ｜ [PR 列表](https://github.com/agentscope-ai/QwenPaw/pulls) ｜ [Issues 列表](https://github.com/agentscope-ai/QwenPaw/issues)

---

## 2) 版本发布
### 新版本：v1.1.12.post2
发布说明显示，本次版本主要包含两类修复/增强：

- **会话导航修复**：删除当前 session 后，能正确跳转到新 chat  
  - 关联 PR：[#5376](https://github.com/agentscope-ai/QwenPaw/pull/5376)
- **文件预览增强**：console/chat 的文件预览支持相对路径  
  - 关联 PR：[#5377](https://github.com/agentscope-ai/QwenPaw/pull/5377)

从可见 release note 看，**未出现明确的 breaking change**；但这类改动会影响聊天会话切换与文件预览路径解析，升级后建议重点回归：
1. 删除当前会话后的 UI 导航是否正常  
2. 相对路径文件在 Chat/Console 中的预览是否稳定  
3. 旧配置或自定义工作目录下的文件引用是否仍可识别  

补充说明：release page 下方还有一个安装验证任务 issue，表明本次发布后维护流程仍在执行中。  
相关入口： [v1.1.12.post2 Release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v1.1.12.post2) ｜ [Release Duty Issue #5430](https://github.com/agentscope-ai/QwenPaw/issues/5430)

---

## 3) 项目进展
今天的 PR 动态显示，项目推进主要集中在以下几个方向：

### A. 移动端体验补齐
多个 PR 在补前端移动端适配，覆盖面很广：
- Skills 页面移动适配：[#5458](https://github.com/agentscope-ai/QwenPaw/pull/5458)
- Skill Market 页面移动适配：[#5459](https://github.com/agentscope-ai/QwenPaw/pull/5459)
- Security 页移动适配：[#5451](https://github.com/agentscope-ai/QwenPaw/pull/5451)
- Debug 页移动适配：[#5449](https://github.com/agentscope-ai/QwenPaw/pull/5449)
- Chat / Sidebar / Header / ModelSelector 等整体移动端修整：[#5444](https://github.com/agentscope-ai/QwenPaw/pull/5444)、[#5445](https://github.com/agentscope-ai/QwenPaw/pull/5445)、[#5446](https://github.com/agentscope-ai/QwenPaw/pull/5446)

**意义**：说明项目在从“可用”走向“可移动端高频使用”。这对个人助手和多端协同场景非常关键。

### B. 稳定性与错误处理
- 解决 console 错误后 UI 卡死：[#5447](https://github.com/agentscope-ai/QwenPaw/pull/5447)
- 修复 macOS sandbox 问题：[#5454](https://github.com/agentscope-ai/QwenPaw/pull/5454)
- 限制 `send_file_to_user` 文件大小：[#5457](https://github.com/agentscope-ai/QwenPaw/pull/5457)
- 修复 agentscope 2.0 post-merge 问题：[#5440](https://github.com/agentscope-ai/QwenPaw/pull/5440)

**意义**：这些 PR 直接指向“稳定性/安全性/异常兜底”，是当前版本质量提升的重要支撑。

### C. 架构与工作流恢复
- TUI 项目级代码会话：[#5448](https://github.com/agentscope-ai/QwenPaw/pull/5448)
- 恢复 ACP 命令与 inline approvals：[#5443](https://github.com/agentscope-ai/QwenPaw/pull/5443)
- Mission mode 接入 Runtime v2：[#5442](https://github.com/agentscope-ai/QwenPaw/pull/5442)

**意义**：这些更偏“框架能力恢复/迁移补齐”，说明仓库在 AgentScope 2.0 迁移后持续修复能力断层。

### D. 可观测性与测试覆盖
- 前端测试继续推进：[#5438](https://github.com/agentscope-ai/QwenPaw/pull/5438)、[#5434](https://github.com/agentscope-ai/QwenPaw/pull/5434)
- 相关 issue 已关闭：[#5437](https://github.com/agentscope-ai/QwenPaw/issues/5437)、[#5433](https://github.com/agentscope-ai/QwenPaw/issues/5433)、[#5419](https://github.com/agentscope-ai/QwenPaw/issues/5419)

**总体判断**：今天至少有 **9 个 PR 进入合并/关闭收敛状态**（数据概览），项目在功能、体验和稳定性三条线上同时前进，属于“**中高强度推进**”的一天。  
相关入口： [PR 更新概览](https://github.com/agentscope-ai/QwenPaw/pulls?q=is%3Apr+updated%3A%3E%3D2026-06-23)

---

## 4) 社区热点
### 热点 1：思考内容与可见回复分离导致“用户看不到答案”
- Issue：[#5416](https://github.com/agentscope-ai/QwenPaw/issues/5416)（4 条评论）
- 关联关闭问题：[#5415](https://github.com/agentscope-ai/QwenPaw/issues/5415)

**诉求分析**：  
用户反馈部分模型把正文放进 `thinking` / `reasoning_content`，而 `content` 为空，导致前端无可见回复。这个问题非常典型，属于**模型输出格式兼容性**问题，影响范围大，且会直接破坏对话体验。它之所以热，是因为它不是“边角 bug”，而是“能不能看到回答”的核心问题。

### 热点 2：内存占用过高，刚启动就 1.4G
- Issue：[#5441](https://github.com/agentscope-ai/QwenPaw/issues/5441)（3 条评论）
- 相近问题：[#5439](https://github.com/agentscope-ai/QwenPaw/issues/5439)

**诉求分析**：  
用户明确表达了对启动即高内存的担忧，这类反馈通常意味着：
- 桌面端/常驻进程感知差
- 多 agent、多窗口、多插件场景下的资源泄露或缓存膨胀
- 用户开始将 CoPaw 视为“本地助手常驻应用”，而非一次性对话工具

### 热点 3：多 agent / 多窗口切换明显卡顿
- Issue：[#5421](https://github.com/agentscope-ai/QwenPaw/issues/5421)（2 条评论）

**诉求分析**：  
这说明项目在“多工作区 / 多会话”场景下存在性能瓶颈。对于 AI 智能体助手来说，切换流畅性直接影响“多任务并行”的可用性，属于中高优先级性能问题。

### 热点 4：agent 身份与工作区上下文不一致
- Issue：[#5456](https://github.com/agentscope-ai/QwenPaw/issues/5456)（1 条评论）

**诉求分析**：  
这个问题涉及运行时构建上下文时 agent_id 误用 `default`，属于**上下文正确性**和**多 agent 隔离**的基础问题。一旦出错，会造成模型行为、审计和用户认知全部错位。

### PR 侧热点
本批数据里 PR 的评论数未给出有效值（多为 `undefined`），因此**无法客观排名“谁最热”**；但从更新密度看，以下 PR 主题最集中：
- 移动端适配：[#5444](https://github.com/agentscope-ai/QwenPaw/pull/5444)、[#5446](https://github.com/agentscope-ai/QwenPaw/pull/5446)、[#5458](https://github.com/agentscope-ai/QwenPaw/pull/5458)
- 稳定性修复：[#5447](https://github.com/agentscope-ai/QwenPaw/pull/5447)、[#5457](https://github.com/agentscope-ai/QwenPaw/pull/5457)
- 迁移/架构恢复：[#5442](https://github.com/agentscope-ai/QwenPaw/pull/5442)、[#5443](https://github.com/agentscope-ai/QwenPaw/pull/5443)

---

## 5) Bug 与稳定性
以下按影响优先级排序：

### 1. 严重：模型回复内容落入 `thinking/reasoning_content`，用户看不到正文
- Issue：[#5416](https://github.com/agentscope-ai/QwenPaw/issues/5416)
- 关联已关闭问题：[#5415](https://github.com/agentscope-ai/QwenPaw/issues/5415)
- 状态判断：**仍未完全闭环**
  
**影响**：核心对话功能受损，属于可见性 bug。  
**现状**：已有相关修复/讨论痕迹，但 `#5416` 仍 OPEN，说明更广泛的兼容场景可能还没完全覆盖。

### 2. 高：错误身份构建导致非默认 agent 被当成 default
- Issue：[#5456](https://github.com/agentscope-ai/QwenPaw/issues/5456)
- 状态判断：**未见明确 fix PR**

**影响**：会话上下文、权限、模型行为可能全部错配，属于多 agent 场景的基础正确性问题。

### 3. 高：多 agent / 多 chat 切换严重卡顿
- Issue：[#5421](https://github.com/agentscope-ai/QwenPaw/issues/5421)
- 状态判断：**未见明确 fix PR**

**影响**：体验退化明显，直接影响连续使用。

### 4. 中高：启动即 1.4G 内存占用
- Issue：[#5441](https://github.com/agentscope-ai/QwenPaw/issues/5441)
- 相关相近反馈：[#5439](https://github.com/agentscope-ai/QwenPaw/issues/5439)
- 状态判断：**未见明确 fix PR**

**影响**：常驻桌面端成本高，可能制约用户长期使用。

### 5. 中：console 遇错后 UI 无法解除等待态
- PR：[#5447](https://github.com/agentscope-ai/QwenPaw/pull/5447)

**说明**：这是一个已在修复中的稳定性问题，若合并成功将明显改善错误恢复能力。

---

## 6) 功能请求与路线图信号
今天新增/活跃的功能请求，反映出几个清晰方向：

### A. 移动端体验是明确路线图信号
- Skills 页面移动适配：[#5458](https://github.com/agentscope-ai/QwenPaw/pull/5458)
- Skill Market 页面移动适配：[#5459](https://github.com/agentscope-ai/QwenPaw/pull/5459)
- 相关聊天/设置页移动适配 PR：[#5444](https://github.com/agentscope-ai/QwenPaw/pull/5444)、[#5446](https://github.com/agentscope-ai/QwenPaw/pull/5446)、[#5451](https://github.com/agentscope-ai/QwenPaw/pull/5451)

**判断**：这些内容已经不再是单点需求，而像是**系统性前端体验升级**。如果下一版本继续收敛，移动端适配很可能会成为稳定主题之一。

### B. 文件与输入交互能力增强
- 拖拽上传文件：[#5420](https://github.com/agentscope-ai/QwenPaw/issues/5420)
- 对应实现 PR：[#5436](https://github.com/agentscope-ai/QwenPaw/pull/5436)
- 文件大小限制：[#5457](https://github.com/agentscope-ai/QwenPaw/pull/5457)

**判断**：用户对“把文件直接丢进聊天框”的期望很强，这类交互非常适合个人 AI 助手场景，纳入下一版本概率高。

### C. 模型接入能力扩展
- Kimi Coding Plan / Anthropic 兼容支持：[#5427](https://github.com/agentscope-ai/QwenPaw/issues/5427)

**判断**：如果项目继续强调多模型/多供应商兼容，这类 provider 适配会进入优先级队列。

### D. 富文本/科学计算表达增强
- KaTeX 支持：[#5453](https://github.com/agentscope-ai/QwenPaw/issues/5453)

**判断**：这是偏“体验加分项”，对技术用户和知识工作场景很有吸引力，容易进入中期路线图。

### E. 上下文与时间信息设计
- “当前时间是否应放到每条用户消息前缀而不是环境上下文”：[#5455](https://github.com/agentscope-ai/QwenPaw/issues/5455)

**判断**：这类问题说明用户已经开始关注 prompt 结构与时间语义，属于更成熟的使用方式。若后续要优化推理效果，这个方向值得实验。

---

## 7) 用户反馈摘要
从 issues 评论和摘要里，可以提炼出今天最真实的用户痛点：

### 1. “我要看见模型真正回复的内容”
- 来源：[#5416](https://github.com/agentscope-ai/QwenPaw/issues/5416)
- 痛点：模型把答案放在 `thinking/reasoning_content`，前端却只看 `content`，用户以为“模型没回复”。

### 2. “启动别太重，别一上来就 1.4G”
- 来源：[#5441](https://github.com/agentscope-ai/QwenPaw/issues/5441)、[#5439](https://github.com/agentscope-ai/QwenPaw/issues/5439)
- 痛点：用户已经把它当作桌面常驻助手，资源占用被直接感知。

### 3. “多 agent / 多窗口切换要快”
- 来源：[#5421](https://github.com/agentscope-ai/QwenPaw/issues/5421)
- 场景：多工作区并行、频繁切换会话，要求界面响应和状态同步足够流畅。

### 4. “上下文身份必须正确”
- 来源：[#5456](https://github.com/agentscope-ai/QwenPaw/issues/5456)
- 痛点：agent_id 错配会导致模型行为错误，这是多 agent 产品的底层信任问题。

### 5. “我希望它像真正的生产力工具，而不是只能对话”
- 来源：[#5420](https://github.com/agentscope-ai/QwenPaw/issues/5420)、[#5453](https://github.com/agentscope-ai/QwenPaw/issues/5453)、[#5455](https://github.com/agentscope-ai/QwenPaw/issues/5455)
- 体现：用户在推动 CoPaw 向“文件处理、公式渲染、时间语义、工作流辅助”演进。

### 6. “我喜欢这个产品，但希望它更完整”
- 来源：[#5453](https://github.com/agentscope-ai/QwenPaw/issues/5453)
- 体现：这类反馈本身就是正向信号，说明用户认可产品定位，只是在期待能力补齐。

---

## 8) 待处理积压
严格按当前数据窗口看，**没有明显“长期未响应”的跨周积压项**；但以下几个 open 任务属于高优先级、且当前缺少明确收敛信号，建议维护者优先分配跟进：

### 优先级 1：可见回复缺失的兼容性问题
- Issue：[#5416](https://github.com/agentscope-ai/QwenPaw/issues/5416)
- 原因：直接影响聊天主链路，且用户已明确报告实际可复现。

### 优先级 2：非默认 agent 身份错配
- Issue：[#5456](https://github.com/agentscope-ai/QwenPaw/issues/5456)
- 原因：属于核心上下文正确性问题，影响多 agent 架构可信度。

### 优先级 3：启动内存偏高
- Issue：[#5441](https://github.com/agentscope-ai/QwenPaw/issues/5441)
- 原因：会影响安装后第一印象和长期驻留可行性。

### 优先级 4：console 错误后 UI 挂起
- PR：[#5447](https://github.com/agentscope-ai/QwenPaw/pull/5447)
- 原因：这是典型“错误恢复”缺口，适合尽快合并以降低卡死感知。

### 优先级 5：发布验证流程
- Issue：[#5430](https://github.com/agentscope-ai/QwenPaw/issues/5430)
- 原因：发布后校验任务应尽快闭环，避免版本发布质量流于形式。

---

### 总体结论
今天的 CoPaw 表现出明显的**高活跃、强修复、重体验**特征：新版本已经落地，前端移动端适配、稳定性补丁、TUI/ACP 恢复和测试覆盖同步推进；与此同时，Issues 侧集中暴露了**回复可见性、上下文正确性、性能与内存**等核心问题。  
如果这些高优先级问题在接下来 1–2 个迭代内继续被收敛，项目健康度会显著提升；反之，若 PR 审查速度跟不上更新速度，待合并积压将成为下一阶段的主要风险。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报｜2026-06-24

## 1) 今日速览
今天 ZeroClaw 依然处于**高活跃、低发布**状态：过去 24 小时共有 **6 条 Issue 更新**、**39 条 PR 更新**，但**没有新版本发布**。从内容结构看，社区与维护团队的重心明显偏向两类：一是**高风险/高价值功能需求**（如渠道流式输出、专属环境变量、独立委派模式），二是**大量测试补强与稳定性修复**。  
整体上，项目健康度偏正向：开发推进活跃，问题反馈也在持续输入；但同时也能看出**PR 审核与合流压力较大**，当前仍有 **34 个待合并 PR**。  
链接总览：Issues 更新区块见 [#8228](https://github.com/zeroclaw-labs/zeroclaw/issues/8228)、[#8226](https://github.com/zeroclaw-labs/zeroclaw/issues/8226)；PR 活动见 [#8260](https://github.com/zeroclaw-labs/zeroclaw/pull/8260)、[#8249](https://github.com/zeroclaw-labs/zeroclaw/pull/8249)。

---

## 2) 版本发布
**今日无新版本发布。**

---

## 3) 项目进展
> 说明：本次提供的数据中，**已合并/关闭的 5 个 PR 未给出具体编号与标题**，因此无法逐条确认“今日合并/关闭的重要 PR”。以下基于当前可见 PR 流向，概括项目推进重点。

### 今日推进最明显的方向
- **测试覆盖系统性补强**：今日新增大量测试类 PR，覆盖了 `memory`、`tools`、`log`、`api`、`eval`、`hardware`、`config` 等核心模块，说明团队在为后续版本做**回归防线**和**稳定性加固**。  
  代表 PR：
  - [#8260](https://github.com/zeroclaw-labs/zeroclaw/pull/8260) `test(memory): cover importance scoring weights and category bases`
  - [#8250](https://github.com/zeroclaw-labs/zeroclaw/pull/8250) `test(api): cover JSON-RPC request/response/error helpers`
  - [#8246](https://github.com/zeroclaw-labs/zeroclaw/pull/8246) `test(eval): cover suite report aggregation and rendering`
  - [#8244](https://github.com/zeroclaw-labs/zeroclaw/pull/8244) `test(eval): cover evaluate_expects grading checks`

- **稳定性/兼容性修复同步推进**：有几条面向真实故障的修复 PR 正在处理，方向集中在 Windows、systemd、PID liveness、命令构造等易出问题场景。  
  代表 PR：
  - [#8249](https://github.com/zeroclaw-labs/zeroclaw/pull/8249) `fix(runtime): warn when systemd user lingering is disabled`
  - [#8247](https://github.com/zeroclaw-labs/zeroclaw/pull/8247) `fix(windows): share cmd shell command construction`
  - [#8242](https://github.com/zeroclaw-labs/zeroclaw/pull/8242) `fix(test): make control-plane PID liveness tests deterministic`

### 项目整体向前迈进了多少
- 从数量上看：**39 条 PR 更新中，5 条已进入合并/关闭状态**，说明项目有实际收敛，但**合流速度仍低于提交/更新速度**。
- 从质量上看：今日 PR 以**测试覆盖、边界条件、稳定性修复**为主，意味着项目正在从“功能扩张”转向“可发布性打磨”。

---

## 4) 社区热点
今天最活跃的讨论点，主要集中在以下几类 Issue：

### 1. DingTalk 渠道流式消息支持
- [#8228](https://github.com/zeroclaw-labs/zeroclaw/issues/8228)  
- 关键词：`channel` `dingtalk` `runtime` `priority:p2` `accepted`  
- 评论：2  
- 热点原因：用户希望在 DingTalk 渠道中获得**流式响应**，避免长输出必须等整段生成完毕才展示，直接指向**交互延迟**与**使用体验**问题。  
- 诉求本质：把聊天式 agent 的“即时反馈”能力带到企业 IM 场景。

### 2. 按 Agent 配置独立环境变量
- [#8226](https://github.com/zeroclaw-labs/zeroclaw/issues/8226)  
- 关键词：`agent` `runtime` `security:secrets` `tool:shell` `tool:mcp` `needs-author-action`  
- 评论：2  
- 热点原因：这是一个带明显安全属性的需求，涉及**按 agent 隔离环境变量**、**注入密钥**、**外部工具执行上下文隔离**。  
- 诉求本质：在保留自动化能力的同时，降低**密钥泄露/环境串扰**风险。

### 3. 独立委派模式
- [#8238](https://github.com/zeroclaw-labs/zeroclaw/issues/8238)  
- 关键词：`delegate` `runtime` `tool` `status:in-progress`  
- 热点原因：这是更偏架构级的能力，目标是让专家代理按自己的策略和工具集运行。  
- 诉求本质：支持更复杂的**多代理协作**和**跨角色分工**。

### 4. Groq / OpenAI-compatible 多轮工具循环兼容问题
- [#8219](https://github.com/zeroclaw-labs/zeroclaw/issues/8219)  
- 关键词：`provider:groq` `runtime` `priority:p1` `status:in-progress`  
- 热点原因：这是高优先级稳定性问题，影响的是**核心 agent loop**。  
- 诉求本质：确保模型在**多轮工具调用**中稳定工作，避免 provider 兼容性导致主流程中断。

> 观察：当前可见热门项的评论数都不算高，说明讨论更偏“问题提交与需求确认”，而不是大规模争论；同时反应数普遍为 0，社区情绪整体偏理性、务实。  
> 热点链接汇总：[#8228](https://github.com/zeroclaw-labs/zeroclaw/issues/8228)、[#8226](https://github.com/zeroclaw-labs/zeroclaw/issues/8226)、[#8238](https://github.com/zeroclaw-labs/zeroclaw/issues/8238)、[#8219](https://github.com/zeroclaw-labs/zeroclaw/issues/8219)。

---

## 5) Bug 与稳定性
按严重程度排序，今日值得关注的 Bug 如下：

### P1 / 高严重度
- [#8219](https://github.com/zeroclaw-labs/zeroclaw/issues/8219)  
  **问题**：`gpt-oss-120b` 在 Groq 上跑 native multi-turn tool loop 时失败。  
  **影响**：会打断 agent 的核心工具循环，属于**生产可用性风险**。  
  **现状**：Issue 标记为 `status:in-progress`，当前数据里**未看到明确对应的 fix PR**。

### S2 / 低严重度但会阻断构建
- [#8236](https://github.com/zeroclaw-labs/zeroclaw/issues/8236)  
  **问题**：`voice_wake.rs` 中 `ChannelMessage` 字面量缺少 `subject` 字段，导致 `--all-features` 构建失败。  
  **影响**：属于**构建完整性回归**，会影响全功能编译验证。  
  **现状**：当前数据里**未看到明确对应的 fix PR**。

### 相关稳定性修复 PR（未确认是否已合并）
- [#8249](https://github.com/zeroclaw-labs/zeroclaw/pull/8249) systemd user lingering 提示修复  
- [#8247](https://github.com/zeroclaw-labs/zeroclaw/pull/8247) Windows shell 命令构造共享  
- [#8242](https://github.com/zeroclaw-labs/zeroclaw/pull/8242) 控制面 PID liveness 测试确定化

---

## 6) 功能请求与路线图信号
今天的功能诉求，呈现出比较清晰的路线图信号：

### 更可能进入下一阶段/下一版的需求
- [#8238](https://github.com/zeroclaw-labs/zeroclaw/issues/8238) **独立委派模式**  
  - `status:in-progress`，且是架构级能力，优先级较高。  
  - 若继续推进，可能成为 agent 协作能力的重要升级点。

- [#8228](https://github.com/zeroclaw-labs/zeroclaw/issues/8228) **DingTalk 渠道流式消息**
  - `accepted`，并且是明确的用户体验优化。  
  - 对企业 IM 集成价值直接，比较像近期可落地需求。

- [#8226](https://github.com/zeroclaw-labs/zeroclaw/issues/8226) **按 agent 配置环境变量**
  - 涉及安全与运行时隔离，虽然实施复杂，但属于高价值基础设施能力。  
  - `needs-author-action` 表示推进仍依赖需求方补充信息或方案细化。

### 中期产品化信号
- [#8251](https://github.com/zeroclaw-labs/zeroclaw/issues/8251) **将 relationship memory 以用户工作流形式呈现**
  - 更偏文档/工作流表达层，体现的是“把能力显性化、可操作化”。  
  - 可能作为 memory / skills 方向的体验增强项进入后续迭代。

### 路线图判断
当前 PR 侧重点明显是**补测试、修稳定性**，说明如果要上新功能，团队大概率会优先处理那些：
1. 已被 `accepted` 或 `in-progress` 标记的需求；
2. 风险可控、对体验提升明显的功能；
3. 不会显著增加运行时复杂度的改动。

相关链接：[#8238](https://github.com/zeroclaw-labs/zeroclaw/issues/8238)、[#8228](https://github.com/zeroclaw-labs/zeroclaw/issues/8228)、[#8226](https://github.com/zeroclaw-labs/zeroclaw/issues/8226)、[#8251](https://github.com/zeroclaw-labs/zeroclaw/issues/8251)。

---

## 7) 用户反馈摘要
> 由于当前提供的是 Issue 标题与摘要，而非完整评论内容，以下为**基于问题描述提炼出的真实用户痛点与场景**。

### 主要痛点
- **长任务反馈慢**：DingTalk 渠道只能等完整响应结束后再显示，用户希望过程可见、反馈更及时。  
  链接：[#8228](https://github.com/zeroclaw-labs/zeroclaw/issues/8228)

- **执行环境不够隔离**：用户需要按 agent 独立注入环境变量，尤其在 shell/MCP/tool 场景下，希望减少密钥外泄与环境串扰。  
  链接：[#8226](https://github.com/zeroclaw-labs/zeroclaw/issues/8226)

- **复杂协作能力不足**：专家 agent 的手动/自动委派需要更强的策略隔离与工具边界。  
  链接：[#8238](https://github.com/zeroclaw-labs/zeroclaw/issues/8238)

- **兼容性脆弱**：Groq/OpenAI-compatible provider 在多轮工具循环中出现严格校验失败，说明多 provider 兼容仍是高敏感区域。  
  链接：[#8219](https://github.com/zeroclaw-labs/zeroclaw/issues/8219)

- **全功能构建可靠性不足**：某些功能分支下仍可能因为字段缺失导致编译失败。  
  链接：[#8236](https://github.com/zeroclaw-labs/zeroclaw/issues/8236)

### 可见的用户偏好
用户整体更看重：
- **响应实时性**
- **安全隔离**
- **多代理协作**
- **provider 兼容稳定**
- **可预测的全功能构建**

---

## 8) 待处理积压
### 需要优先盯住的高风险事项
- [#8219](https://github.com/zeroclaw-labs/zeroclaw/issues/8219) Groq 多轮工具循环失败，P1，影响核心执行链路
- [#8238](https://github.com/zeroclaw-labs/zeroclaw/issues/8238) 独立委派模式，高风险架构诉求
- [#8228](https://github.com/zeroclaw-labs/zeroclaw/issues/8228) DingTalk 流式输出，用户体验导向且已 accepted
- [#8226](https://github.com/zeroclaw-labs/zeroclaw/issues/8226) 按 agent 环境变量配置，安全相关且需要作者动作
- [#8251](https://github.com/zeroclaw-labs/zeroclaw/issues/8251) relationship memory 工作流化，偏产品表达层

### 维护者应特别关注的“隐性积压”
- 当前有 **34 个 PR 处于待合并**，而且今日新增 PR 多为测试与修复，说明**review 队列已形成明显压力**。  
- 这类积压不一定是“老问题”，但会直接影响：  
  1. 功能落地速度  
  2. 修复进入主干的时效  
  3. 发布窗口的可控性

相关链接：  
- PR 堆积代表性条目：[#8260](https://github.com/zeroclaw-labs/zeroclaw/pull/8260)、[#8249](https://github.com/zeroclaw-labs/zeroclaw/pull/8249)、[#8247](https://github.com/zeroclaw-labs/zeroclaw/pull/8247)  
- 高优先级 Issue：[#8219](https://github.com/zeroclaw-labs/zeroclaw/issues/8219)、[#8228](https://github.com/zeroclaw-labs/zeroclaw/issues/8228)

---

如果你希望，我可以把这份日报进一步整理成：
1. **更适合管理层阅读的 1 页简报版**，或  
2. **适合发到 Slack / 飞书 / 公众号的精简版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*