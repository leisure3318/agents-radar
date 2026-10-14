# OpenClaw 生态日报 2026-10-14

> Issues: 8 | PRs: 47 | 覆盖项目: 13 个 | 生成时间: 2026-10-14 03:58 UTC

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

# OpenClaw 项目动态日报｜2026-10-14

项目：[`openclaw/openclaw`](https://github.com/openclaw/openclaw)  
统计窗口：过去 24 小时  
数据概览：Issues 更新 8 条，PR 更新 47 条，新版本发布 2 个

---

## 1. 今日速览

OpenClaw 今日保持**高活跃度**：过去 24 小时内有 47 条 PR 更新，其中 42 条仍待合并，说明主干开发节奏非常快，但也带来了较高的评审与集成压力。Issues 方面新增或活跃 4 条、关闭 4 条，问题处理效率较好，尤其集中在 Gateway、会话状态、数据丢失、安全边界和 Web UI 迁移等核心区域。

今日发布了两个版本：`v2026.10.5-beta.3` 与 `v2026.10.3`，表明项目同时推进稳定版本维护与 beta 验证。整体来看，项目健康度较高，但当前待合并 PR 数量偏多，且多项变更涉及安全边界、兼容性和 Gateway 核心路径，建议维护者继续强化 release validation 与回归测试。

---

## 2. 版本发布

### v2026.10.5-beta.3

链接：[`v2026.10.5-beta.3`](https://github.com/openclaw/openclaw/releases/tag/v2026.10.5-beta.3)

版本标题：`openclaw 2026.10.5-beta.3`

#### 主要更新

根据 release 摘要，该 beta 版本重点围绕安装、更新与 Gateway 持久运行能力：

- **更新时保持 Gateway 运行**
  - `pnpm 12` 安装路径调整后，Gateway service 与 `openclaw` launcher 仍保持在 durable install path 上。
  - 这有助于减少升级过程中的服务中断。

- **Windows 更新增强**
  - Windows 更新流程支持 qualified Scheduled Task accounts。
  - 引入独立验证的 driver，说明 Windows 平台安装/服务管理路径正在加强。

- **macOS 服务兼容性增强**
  - macOS 接受受保护的 Bun service 配置。
  - 结合今日 macOS LaunchAgent 相关 Issue，可见 macOS 后台服务与环境变量处理仍是当前重点区域。

#### 破坏性变更

当前数据中未显示明确的 breaking changes。  
但该版本涉及安装路径、服务管理、Windows Scheduled Task、macOS Bun service，属于对运行时环境敏感的变更，建议用户在生产环境升级前验证：

- Gateway 是否能在升级后继续运行；
- `openclaw` 命令是否指向正确 launcher；
- Windows Scheduled Task 账户是否符合权限要求；
- macOS LaunchAgent 环境变量是否完整保留，尤其是多行密钥或 PEM 内容。

#### 迁移注意事项

建议升级用户重点检查：

1. Gateway service 状态；
2. CLI launcher 路径；
3. Windows 计划任务账户；
4. macOS LaunchAgent 环境变量；
5. 自定义 Bun service 配置。

---

### v2026.10.3

链接：[`v2026.10.3`](https://github.com/openclaw/openclaw/releases/tag/v2026.10.3)

版本标题：`openclaw 2026.10.3`

#### 发布规模

Release 摘要显示：

- 90 commits
- 79 pull requests
- 99 contributors

这是一版较大规模的稳定发布，贡献者数量非常高，说明 OpenClaw 社区协作活跃。

#### 主要内容

发布说明与 changelog 内容一致，并提供文档链接：

- Release notes：`https://docs.openclaw.ai/releases/2026...`

由于当前数据只展示了 release 摘要片段，无法完整判断所有功能项。但从今日 Issue 与 PR 主题来看，`2026.10.3` 版本相关反馈集中在：

- Gateway 会话状态；
- ACP agent 启动与 secrets/auth store；
- Browser Talk 历史保存；
- streamed delta 工具调用解析；
- 本地模型 prompt 成本；
- 原生 App reconnect 后消息失败。

#### 迁移注意事项

使用 `2026.10.3` 的用户应特别关注以下已报告问题：

- ACP-only agent 在慢启动后可能持续 degraded；
- Browser Talk 使用 Gemini Live 时可能丢失用户语音轮次；
- Gateway 处理包含 tool-call XML 的流式回复时可能出现重复解析性能问题；
- macOS Gateway restart 可能截断多行环境变量。

---

## 3. 项目进展

今日 PR 更新总量达到 47 条，其中已合并或关闭 5 条，待合并 42 条。虽然数据中未明确标记“merged”与“closed without merge”的区别，但以下已关闭 PR 对项目稳定性与功能推进具有代表性。

### 已关闭 / 完成的重要 PR

#### 1. Muse Code 可从 Model Setup 登录

PR：[#171526 feat(muse): sign in to Muse Code from Model Setup](https://github.com/openclaw/openclaw/pull/171526)  
状态：Closed  
标签：`docs`, `web-ui`, `gateway`, `commands`, `agents`, `plugin: muse`, `compatibility`

该 PR 解决了 Meta Muse Code 过去需要通过终端完成登录和配置的问题：

- 之前流程：
  - `muse login`
  - `openclaw plugins enable muse`
  - 手动配置 `agentRuntime: { id: "muse" }`
- 新目标：
  - 在 Models 页面直接完成 Muse Code 登录与模型设置。

#### 项目推进意义

这是 OpenClaw 在“模型与插件配置低门槛化”方向的重要进展。它降低了非 CLI 用户使用 Muse Code 的门槛，也让 Model Setup 成为更统一的模型接入入口。

---

#### 2. QA Lab 自检并发控制修复

PR：[#171654 fix(qa-lab): reject overlapping self-checks and drain failed runs](https://github.com/openclaw/openclaw/pull/171654)  
状态：Closed  
标签：`docs`, `extensions: qa-lab`

该 PR 修复 QA Lab self-check 并发运行导致的问题：

- 多个 QA Lab run 同时启动时，可能造成 self-check 报告失败；
- shared test state 可能被重置；
- shutdown 可能在失败 self-check 的 transport 未释放时完成。

#### 项目推进意义

该修复提升了 QA Lab 的测试可靠性，尤其适用于维护者和自动化测试环境。对于当前大量 PR 并行推进的项目节奏，QA 基础设施稳定性非常关键。

---

### 仍在推进的重要 PR

#### 1. Native App reconnect 后消息失败修复

PR：[#171528 fix: native app messages fail after reconnecting](https://github.com/openclaw/openclaw/pull/171528)  
状态：Open  
标签：`P1`, `security-sensitive-changed`, `security-review-required`

该 PR 解决 native Mac、Linux、iOS、Android 嵌入式 Control UI 在 reconnect 后消息停留为 “Not sent” 的问题。Gateway 会在 dispatch 前拒绝内部 reconnect marker，导致消息无法发送。

这是一个高优先级用户体验问题，并且涉及安全敏感路径，需要安全评审。

---

#### 2. ClawHub 包暴露给 Gateway

PR：[#171622 feat: expose published ClawHub packages to Gateway](https://github.com/openclaw/openclaw/pull/171622)  
状态：Open  
标签：`web-ui`, `gateway`, `scripts`, `size: XL`

该 PR 为 Gateway 提供 ClawHub catalog metadata 与 archive packages，为后续 one-click Add flow 做准备。

#### 项目推进意义

这是 OpenClaw 插件/资源生态建设的重要基础设施。若后续 Add PR 落地，用户将能更轻松添加 Claws、agents、skills 与 automations。

---

#### 3. 将 Claws 作为普通 agents 与 resources 添加

PR：[#171623 feat: add Claws as ordinary agents and resources](https://github.com/openclaw/openclaw/pull/171623)  
状态：Open  
标签：`gateway`, `cli`, `commands`, `agents`, `size: XL`, `merge-risk: automation`, `compatibility`, `security-boundary`

该 PR 旨在让 Add Claw 创建普通 OpenClaw 资源，而不是引入单独的 installed-Claw 生命周期。它会：

- 每次 Add 创建新的编号 agent；
- 安装 agent-owned files、skills、automations；
- 安装 required shared dependencies；
- 进入新 agent chat。

#### 项目推进意义

这是路线图级别的大功能，涉及用户资源模型、自动化、CLI、Gateway、安全边界和兼容性。短期内需要较谨慎评审。

---

#### 4. Saved question answer 恢复机制

PR：[#171682 feat: resume saved question answers without repeating interrupted tasks](https://github.com/openclaw/openclaw/pull/171682)  
状态：Open  
标签：`gateway`, `agents`, `size: XL`

该 PR 处理保存的问题回答在恢复时不重复执行已中断任务的问题，是 durable question / recovery 方向的重要前置工作。

相关 PR：

- [#171649 feat: keep durable question observations consistent with stored outcomes](https://github.com/openclaw/openclaw/pull/171649)

这说明 OpenClaw 正在加强会话恢复、任务中断与长期状态一致性。

---

## 4. 社区热点

> 注：当前 PR 数据中的评论数为 `undefined`，Issues 均显示 1 条评论，无法严格按评论数排序。因此本节按标签严重度、影响面、PR 规模与功能战略意义综合判断热点。

### 热点 1：Gateway / 会话状态 / 数据丢失风险

Issue：[#171670 daemon: gateway restart truncates multi-line LaunchAgent env values to their first line](https://github.com/openclaw/openclaw/issues/171670)  
状态：Open  
标签：`P2`, `impact:data-loss`, `maturity:stable`, `diamond lobster`

该问题发生在 macOS：Gateway service 的多行环境变量在安装时写入正确，但执行 `openclaw gateway restart` 后被截断为第一行。典型受影响场景是 PEM private key 或 `.env` 中的多行配置。

#### 背后诉求

用户希望 Gateway restart 与 install 行为一致，不应破坏密钥、证书、环境变量等关键配置。该问题被标记为 data-loss，说明它不仅是显示问题，而可能直接导致认证失败或服务不可用。

---

### 热点 2：OpenShell mirror sync 安全边界

Issue：[#171669 openshell: mirror sync copies and deletes nested .git despite documented .git exclusion](https://github.com/openclaw/openclaw/issues/171669)  
状态：Open  
标签：`P2`, `impact:data-loss`, `impact:security`, `needs-security-review`, `diamond lobster`

OpenShell mirror sync 文档说明应排除 `.git`、`hooks`、`git-hooks`，但当前只在 workspace root 生效。嵌套仓库如 `sub/.git` 仍可能被复制或删除。

#### 背后诉求

用户关心：

- repository credentials 不应被同步；
- Git history 不应暴露；
- trusted hooks 不应被破坏；
- 嵌套仓库应与根仓库享有同样保护。

该问题同时涉及数据丢失与安全风险，优先级应较高。

---

### 热点 3：ClawHub / Claws 生态建设

相关 PR：

- [#171622 feat: expose published ClawHub packages to Gateway](https://github.com/openclaw/openclaw/pull/171622)
- [#171623 feat: add Claws as ordinary agents and resources](https://github.com/openclaw/openclaw/pull/171623)

这两项 PR 共同指向 OpenClaw 的生态化方向：让 Claws 可以像普通 agents/resources 一样被添加、安装和使用。

#### 背后诉求

社区希望 OpenClaw 不只是一个 Agent runtime，而是具备可发现、可安装、可组合资源生态的平台。ClawHub 很可能成为未来版本的重要增长点。

---

### 热点 4：Web UI Solid 迁移

相关 PR：

- [#171576 refactor(ui): render agent and theme artwork with Solid](https://github.com/openclaw/openclaw/pull/171576)
- [#171664 refactor(ui): separate presentation contract from Lit adapters](https://github.com/openclaw/openclaw/pull/171664)
- [#171559 refactor(ui): decouple session controller types from Lit](https://github.com/openclaw/openclaw/pull/171559)
- [#171631 refactor(ui): simplify plugin catalog and editor rendering](https://github.com/openclaw/openclaw/pull/171631)
- [#171638 refactor(ui): consolidate new-session picker rendering](https://github.com/openclaw/openclaw/pull/171638)
- [#171643 refactor(ui): remove unused bridges from Solid pages](https://github.com/openclaw/openclaw/pull/171643)
- [#171615 chore(ui): document Solid 2 idioms and lint shared helpers](https://github.com/openclaw/openclaw/pull/171615)

#### 背后诉求

维护者正在系统性移除 Lit bridge、统一 Solid 渲染路径、简化 UI presentation contract。这类重构短期用户可见变化较少，但长期会改善：

- UI 一致性；
- native surface 复用能力；
- 组件生命周期可靠性；
- 迁移后维护成本。

---

## 5. Bug 与稳定性

以下按严重程度与影响面排序。

---

### P1 / 高影响

#### 1. ACP-only agent 慢启动后持续 degraded

Issue：[#171395 ACP-only agent ids stay degraded after a slow startup](https://github.com/openclaw/openclaw/issues/171395)  
状态：Closed  
标签：`P1`, `impact:session-state`, `maturity:stable`, `diamond lobster`

#### 问题摘要

在 `2026.10.3` 上，某些 agent id 仅通过 `acp.defaultAgents` / `acp.allowedAgents` 拥有 session store。慢启动后可能出现：

> “secrets preparation has not published its auth store”

并导致 cron maintenance 每分钟失败，状态持续 degraded，直到重启。

#### 影响

- ACP-only agent 可用性下降；
- session state 维护失败；
- 需要重启恢复。

#### fix 状态

Issue 已关闭，说明已有处理或不再复现。数据中未直接给出对应 PR。

---

#### 2. Browser Talk on Gemini 3.8 Live 丢失用户语音轮次

Issue：[#171505 Browser Talk on Gemini 3.8 Live drops spoken user turns from chat history](https://github.com/openclaw/openclaw/issues/171505)  
状态：Closed  
标签：`P1`, `impact:session-state`, `impact:data-loss`, `linked-pr-open`

#### 问题摘要

当使用：

```yaml
talk.realtime.model: gemini-3.8-live
```

Control UI 浏览器 Talk 在通话期间能显示用户语音内容，但停止并刷新后，聊天历史中不保存用户 spoken lines。

#### 影响

- 对话历史不完整；
- 用户无法回溯语音输入；
- session state 出现数据丢失。

#### fix 状态

Issue 已关闭，且标签显示 `linked-pr-open`，说明存在关联修复 PR，但当前数据未提供具体 PR 编号。

---

#### 3. Native App reconnect 后消息无法发送

PR：[#171528 fix: native app messages fail after reconnecting](https://github.com/openclaw/openclaw/pull/171528)  
状态：Open  
优先级：`P1`  
标签：`security-sensitive-changed`, `security-review-required`

#### 问题摘要

Native Mac、Linux、iOS、Android 的 embedded Control UI 在 reconnect 后，消息停留为 `Not sent`。Gateway 在 dispatch 前拒绝内部 reconnect marker。

#### fix 状态

已有 fix PR，但仍待合并并需要安全评审。

---

### P2 / 数据丢失、安全与稳定性风险

#### 4. macOS Gateway restart 截断多行环境变量

Issue：[#171670](https://github.com/openclaw/openclaw/issues/171670)  
状态：Open  
优先级：`P2`  
影响：`data-loss`

#### fix 状态

暂无明确 fix PR。标签显示 `clawsweeper:queueable-fix`，可能适合进入自动修复队列。

---

#### 5. OpenShell mirror sync 未正确排除嵌套 `.git`

Issue：[#171669](https://github.com/openclaw/openclaw/issues/171669)  
状态：Open  
优先级：`P2`  
影响：`data-loss`, `security`

#### fix 状态

暂无新 fix PR。标签显示：

- `clawsweeper:no-new-fix-pr`
- `needs-product-decision`
- `needs-security-review`

这表明该问题不仅是实现缺陷，还需要产品行为和安全策略确认。

---

#### 6. DashScope/Qwen 输入长度溢出被错误归类为 format，跳过 compaction recovery

Issue：[#171673](https://github.com/openclaw/openclaw/issues/171673)  
状态：Open

#### 问题摘要

当 Alibaba Cloud Model Studio / DashScope / Qwen 会话超过模型输入限制时，provider 返回 HTTP 400：

```text
invalid_parameter_error
Range of input length should be [1, 202745]
```

OpenClaw 将其归类为 format error，导致跳过 compaction recovery。

#### 影响

- 长会话恢复失败；
- 用户可能需要手动缩短上下文；
- 对 Qwen / Bailian Coding Plan 用户影响明显。

#### fix 状态

暂无明确 fix PR。

---

#### 7. Workspace hook 可借用 bundled/plugin/managed hookKey 绕过 opt-in

Issue：[#171672](https://github.com/openclaw/openclaw/issues/171672)  
状态：Open

#### 问题摘要

Workspace hook 可以声明 `metadata.openclaw.hookKey` 等于 bundled、plugin 或 managed hook 的 key，从而在未显式 opt-in 的情况下加载。

#### 影响

这是 hook 加载信任边界问题，可能导致 workspace hook 绕过配置授权。

#### fix 状态

暂无明确 fix PR。建议安全评审。

---

#### 8. 含 tool-call XML 的回复导致 Gateway 每个 streamed delta 重复解析整段回复

Issue：[#171363](https://github.com/openclaw/openclaw/issues/171363)  
状态：Closed  
标签：`P2`, `Regression`, `impact:other`, `diamond lobster`

#### 问题摘要

自 #138204 后，如果 streamed reply 中包含 `<invoke>` 或 `<parameter>` 等 tool-call tag，即使它们只是代码块中的示例，Gateway 也会在每个 streamed delta 重新将整段回复作为 Markdown 解析。

#### 影响

- 流式响应性能下降；
- 包含 XML 示例的回答尤其受影响；
- 属于回归问题。

#### fix 状态

Issue 已关闭，说明已有处理或关闭结论。

---

#### 9. CI flake：provider-local-service shutdown 进程树未停止

Issue：[#171472](https://github.com/openclaw/openclaw/issues/171472)  
状态：Closed

#### 问题摘要

在 `2026.10.5-beta.3` release validation 期间，Windows 测试 lane 出现 flake：

```text
provider-local-service shutdown
keeps a replacement service owned when a retired lease releases late
```

进程树未按预期停止。

#### 影响

- 影响 Windows CI 稳定性；
- 对 release validation 有干扰。

#### fix 状态

Issue 已关闭。

---

## 6. 功能请求与路线图信号

### 1. ClawHub 与一键 Add Flow

相关 PR：

- [#171622 expose published ClawHub packages to Gateway](https://github.com/openclaw/openclaw/pull/171622)
- [#171623 add Claws as ordinary agents and resources](https://github.com/openclaw/openclaw/pull/171623)

#### 路线图信号

ClawHub 正在从“目录/包元数据”走向“可安装资源生态”。后续版本很可能围绕以下能力继续推进：

- one-click Add；
- Claw package discovery；
- archive trust；
- agent-owned files / skills / automations；
- shared dependencies 管理。

该方向具备明显平台化特征，可能成为 OpenClaw 未来版本的核心亮点之一。

---

### 2. Durable questions 与中断恢复

相关 PR：

- [#171649 keep durable question observations consistent with stored outcomes](https://github.com/openclaw/openclaw/pull/171649)
- [#171682 resume saved question answers without repeating interrupted tasks](https://github.com/openclaw/openclaw/pull/171682)

#### 路线图信号

OpenClaw 正在补强长期任务与恢复路径，重点包括：

- 保存用户回答；
- 恢复时不重复执行已中断任务；
- committed answers 与 absolute deadlines 保持一致；
- recovery wiring 与 tool handoff 的前置数据模型。

这对 agent 长任务、异步工作流和可靠自动化非常关键。

---

### 3. Web UI 从 Lit 向 Solid 迁移

相关 PR：

- [#171576](https://github.com/openclaw/openclaw/pull/171576)
- [#171664](https://github.com/openclaw/openclaw/pull/171664)
- [#171559](https://github.com/openclaw/openclaw/pull/171559)
- [#171631](https://github.com/openclaw/openclaw/pull/171631)
- [#171638](https://github.com/openclaw/openclaw/pull/171638)
- [#171643](https://github.com/openclaw/openclaw/pull/171643)

#### 路线图信号

UI 迁移已进入收尾和架构清理阶段，目标不是增加新功能，而是降低旧 bridge 与 Lit 依赖。这可能为后续 native UI、主题、插件目录、session roster 等功能快速迭代打基础。

---

### 4. 模型与 Provider 体验优化

相关 PR / Issue：

- [#171588 fix: keep lean local-model Tool Search prompts compact](https://github.com/openclaw/openclaw/pull/171588)
- [#171673 DashScope/Qwen input length overflow misclassified](https://github.com/openclaw/openclaw/issues/171673)
- [#171661 fix(codex): project raw outer tool-call lifecycles](https://github.com/openclaw/openclaw/pull/171661)

#### 路线图信号

OpenClaw 正在优化不同模型与 provider 的边界行为，包括：

- prompt 成本；
- 上下文长度错误识别；
- compaction recovery；
- Codex tool-call lifecycle 投影；
- 本地模型 lean prompt。

这说明项目在向多 provider、多 agent runtime 的稳定兼容方向发展。

---

## 7. 用户反馈摘要

### 1. 用户对 Gateway 配置可靠性敏感

Issue：[#171670](https://github.com/openclaw/openclaw/issues/171670)

用户场景非常具体：`.env` 或 config 中包含 PEM private key 等多行环境变量。用户期望 Gateway restart 不应改变安装时正确写入的值。

痛点：

- restart 后配置被静默破坏；
- 多行密钥被截断；
- 可能导致认证失败；
- 需要用户手动排查环境变量。

---

### 2. 用户担心 OpenShell 同步越过安全边界

Issue：[#171669](https://github.com/openclaw/openclaw/issues/171669)

用户明确指出文档承诺 `.git`、`hooks`、`git-hooks` 双向排除，但嵌套仓库未被保护。

痛点：

- repository credentials 可能泄露；
- Git history 可能被同步到不应出现的位置；
- hooks 可能被复制或删除；
- 文档行为与实际行为不一致。

---

### 3. 长上下文用户需要自动 compaction recovery

Issue：[#171673](https://github.com/openclaw/openclaw/issues/171673)

DashScope/Qwen 用户在会话过长时遇到 provider 输入长度限制。用户希望 OpenClaw 能识别这是 context overflow，而不是 format error。

痛点：

- 自动恢复机制没有触发；
- 用户体验从“系统自动压缩上下文”退化为“请求失败”；
- 对长会话和 coding plan 用户影响较大。

---

### 4. Talk 用户希望语音对话被完整记录

Issue：[#171505](https://github.com/openclaw/openclaw/issues/171505)

Browser Talk 用户能在通话时看到自己说的话，但刷新后历史中缺失用户 spoken turns。

痛点：

- 通话结束后无法回看完整上下文；
- 模型回复与用户输入对应关系断裂；
- 对语音交互信任度下降。

---

### 5. Native App 用户关注 reconnect 后连续性

PR：[#171528](https://github.com/openclaw/openclaw/pull/171528)

Native app reconnect 后消息无法发送，会直接破坏移动端和桌面端连续使用体验。

痛点：

- 消息显示 `Not sent`；
- 用户以为网络恢复后可以继续，但 Gateway 拒绝 dispatch；
- 影响 Mac、Linux、iOS、Android 多平台。

---

## 8. 待处理积压

> 今日数据集中未提供长期未响应时间跨度，因此本节列出“当前仍未合并/未修复、且影响较大”的积压项，供维护者优先关注。

### 高优先级待处理

#### 1. macOS Gateway restart 截断多行环境变量

Issue：[#171670](https://github.com/openclaw/openclaw/issues/171670)  
状态：Open  
建议优先级：高

原因：

- `impact:data-loss`
- `maturity:stable`
- 涉及密钥、证书、环境变量
- 与新版安装/更新能力相关

建议：

- 尽快补充 fix PR；
- 增加 LaunchAgent 多行 env round-trip 测试；
- 覆盖 install、restart、update 三条路径。

---

#### 2. OpenShell nested `.git` 排除失效

Issue：[#171669](https://github.com/openclaw/openclaw/issues/171669)  
状态：Open  
建议优先级：高

原因：

- 同时涉及 data-loss 与 security；
- 文档承诺与实现不一致；
- 需要 product decision 与 security review。

建议：

- 明确 `.git` 排除策略是否递归；
- 将 nested `.git`、hooks、git-hooks 纳入测试；
- 在修复前考虑文档临时警示。

---

#### 3. Workspace hookKey 借用绕过 opt-in

Issue：[#171672](https://github.com/openclaw/openclaw/issues/171672)  
状态：Open  
建议优先级：高

原因：

- 涉及 hook 信任边界；
- workspace hook 可借用 bundled/plugin/managed hookKey；
- 可能绕过用户显式授权。

建议：

- 增加 hook origin 与 hookKey 绑定校验；
- 区分 workspace hook 与 managed/bundled/plugin hook 的命名空间；
- 安全团队评审加载策略。

---

#### 4. Native App reconnect 消息失败

PR：[#171528](https://github.com/openclaw/openclaw/pull/171528)  
状态：Open  
建议优先级：高

原因：

- `P1`
- 影响多平台 native app；
- 用户可见问题明显；
- 已有 fix PR，但需要安全评审。

建议：

- 优先完成 security review；
- 补充 reconnect marker 相关回归测试；
- 验证 Mac、Linux、iOS、Android embedded Control UI。

---

### 中优先级待处理

#### 5. DashScope/Qwen context overflow 分类错误

Issue：[#171673](https://github.com/openclaw/openclaw/issues/171673)  
状态：Open  
建议优先级：中高

建议：

- 将 `Range of input length should be [1, N]` 识别为 context overflow；
- 触发 compaction recovery；
- 为 DashScope/Qwen/Bailian Coding Plan 添加 provider-specific error mapping。

---

#### 6. ClawHub / Claws 大型功能 PR

PR：

- [#171622](https://github.com/openclaw/openclaw/pull/171622)
- [#171623](https://github.com/openclaw/openclaw/pull/171623)

状态：Open  
建议优先级：中高

原因：

- 路线图价值高；
- 涉及 Gateway、CLI、agents、resources、automation、安全边界；
- PR 规模为 XL，merge-risk 较高。

建议：

- 分阶段合并；
- 先合并 Gateway catalog 基础能力；
- Add Claw 行为需通过安全与兼容性评审；
- 明确 installed-Claw lifecycle 被移除后的迁移策略。

---

#### 7. Solid UI 迁移相关 PR 队列

PR：

- [#171576](https://github.com/openclaw/openclaw/pull/171576)
- [#171664](https://github.com/openclaw/openclaw/pull/171664)
- [#171559](https://github.com/openclaw/openclaw/pull/171559)
- [#171631](https://github.com/openclaw/openclaw/pull/171631)
- [#171638](https://github.com/openclaw/openclaw/pull/171638)
- [#171643](https://github.com/openclaw/openclaw/pull/171643)

状态：Open  
建议优先级：中

建议：

- 避免多个 UI 重构 PR 长时间并行漂移；
- 尽量按依赖顺序合并；
- 保持 visual regression 与 accessibility 检查；
- 对用户可见行为保持无变化承诺。

---

## 总体健康度评估

OpenClaw 今日表现出非常强的工程活跃度：release、bug 修复、架构重构、生态功能、provider 兼容性均在并行推进。项目在社区协作和 PR 产出方面非常健康，但当前风险主要来自三个方面：

1. **待合并 PR 数量较高**：42 条 open PR 对维护者评审能力提出较高要求。
2. **核心路径变更密集**：Gateway、session state、security boundary、native reconnect、ClawHub install flow 都属于高风险区域。
3. **稳定版反馈仍有关键问题**：`2026.10.3` 与 `2026.10.5-beta.3` 相关反馈显示，macOS/Windows service、ACP、Talk、OpenShell sync 仍需持续打磨。

建议维护者短期优先处理安全与数据丢失类问题，其次推进 P1 用户可见修复，最后再合并大规模生态与 UI 重构 PR。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向分析报告  
日期：2026-10-14

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出明显的“两极分化”：OpenClaw、Hermes Agent、NanoBot、CoPaw、ZeroClaw、LobsterAI 处于高频迭代阶段，而 PicoClaw、NullClaw、TinyClaw、Moltis、ZeptoClaw 等项目暂时静默。  
活跃项目的共同主题不再只是“接入更多模型”，而是转向 **Gateway 稳定性、会话持久化、插件/工具生态、桌面端体验、长任务恢复、安全边界** 等工程化能力。  
OpenClaw 与 Hermes Agent 是当前生态中规模和复杂度最高的两个项目：前者更强调 Gateway、ClawHub、插件资源生态与多端控制面，后者则在多平台消息通道、Desktop、MCP、Cron 和多 profile gateway 上高速扩张。  
整体来看，生态正在从“Agent 原型框架”进入“可长期运行的个人 AI 操作系统 / 工作台”阶段，可靠性、安全性和可恢复性成为新的竞争焦点。

---

## 2. 各项目活跃度对比

> 注：Issues / PR 数为过去 24 小时内的更新量或摘要中提供的统计口径；“健康度”综合活跃度、问题严重性、维护响应和风险判断。

| 项目 | Issues 更新 | PR 更新 | Release | 今日状态概览 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 8 | 47 | 2 个：`v2026.10.5-beta.3`、`v2026.10.3` | 高活跃；Gateway、ClawHub、Solid UI、会话恢复、安全边界并行推进 | **高活跃 / 健康，但评审与回归压力高** |
| **Hermes Agent** | 50 | 50 | 1 个：`v0.22.0` | 极高活跃；大版本发布后出现大量多平台、会话、Gateway、Desktop 回归反馈 | **高速增长 / 风险上升** |
| **NanoBot** | 4 | 16 | 无 | Google Drive/Sheets、WebUI、API lock、工具瘦身、Provider 扩展活跃 | **健康 / 稳定性修复待合并** |
| **CoPaw / QwenPaw** | 7 | 17 | 无 | Console、插件、Python Code Mode、聊天历史性能、ACP 插件问题集中 | **活跃 / 用户可用性问题需优先处理** |
| **ZeroClaw** | 5 | 14 | 无 | ZeroCode、多会话、Gateway 生命周期、A2A、Provider、安全依赖推进 | **活跃 / 可靠性风险中等** |
| **LobsterAI** | 1 | 10 | 无 | 桌面伴侣、TTS、模型目录、依赖升级；出现 API Key 导出安全问题 | **活跃 / 安全风险需快速响应** |
| **NanoClaw** | 0 | 1 | 无 | 聚焦新安装 update channel 选择 | **低活跃 / 稳定维护** |
| **IronClaw** | 0 | 1 | 无 | Dependabot 依赖升级 | **低活跃 / 低风险维护** |
| **PicoClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **NullClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |

### 活跃度分层

| 层级 | 项目 | 特征 |
|---|---|---|
| **超高活跃 / 平台化扩张** | OpenClaw、Hermes Agent | PR 和 Issue 密集，涉及 Gateway、插件生态、多端、会话可靠性、安全边界 |
| **高活跃 / 功能与稳定性并进** | NanoBot、CoPaw、ZeroClaw、LobsterAI | 有明确用户反馈和功能方向，但维护队列压力较 OpenClaw / Hermes 小 |
| **低活跃 / 定点维护** | NanoClaw、IronClaw | 少量安装或依赖维护，无明显社区压力 |
| **静默观察** | PicoClaw、NullClaw、TinyClaw、Moltis、ZeptoClaw | 过去 24 小时无活动，难以判断短期路线 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 相对优势

OpenClaw 当前在生态中处于 **第一梯队平台型项目** 位置，优势主要体现在：

1. **工程活跃度高且节奏稳定**  
   过去 24 小时有 47 条 PR 更新、8 条 Issue 更新，并发布两个版本。与 Hermes Agent 一样属于高密度迭代项目，但 OpenClaw 同时维护稳定版与 beta 版，发布节奏更偏工程化。

2. **Gateway 能力成熟度较高**  
   OpenClaw 的问题与 PR 高度集中在 Gateway service、native reconnect、macOS LaunchAgent、Windows Scheduled Task、session recovery 等底层运行路径，说明其 Gateway 已成为核心基础设施，而不是简单 API server。

3. **插件与资源生态路线清晰**  
   ClawHub、Claws as ordinary agents/resources、Muse Code 从 Model Setup 登录，显示 OpenClaw 正在构建“可发现、可安装、可组合”的资源生态。  
   这比单纯 provider 接入或工具列表扩展更接近“Agent 应用商店 / 资源市场”方向。

4. **会话持久化和恢复能力持续增强**  
   Durable questions、saved question answer resume、stored outcomes consistency 等 PR 表明 OpenClaw 正在重点解决长期任务、中断恢复和状态一致性问题。  
   这是个人 AI 助手从聊天工具走向可靠自动化平台的关键能力。

5. **多端控制面正在打磨**  
   Native app reconnect、Web UI Solid 迁移、Browser Talk 历史保存等问题说明 OpenClaw 已经覆盖 Web、Native、语音和插件配置等多个入口。

### 3.2 与 Hermes Agent 的差异

| 维度 | OpenClaw | Hermes Agent |
|---|---|---|
| 核心路线 | Gateway + ClawHub + agent/resource 生态 | Gateway + Desktop + 多平台消息通道 + MCP |
| 社区规模信号 | 版本 `2026.10.3`：90 commits、79 PR、99 contributors | `v0.22.0`：规模极大，数千 contributors 级别 release 摘要 |
| 当前主要风险 | 安全边界、Gateway restart、ClawHub 大型 PR、PR 积压 | 大版本后大量回归、消息通道、Desktop、checkpoint、SQLite lock |
| 插件生态 | ClawHub、Claws、Muse plugin、skills/automations | MCP Catalog、Memory shelf、hosted MCP、plugin trust tier |
| UI 路线 | Web UI 从 Lit 向 Solid 迁移 | Desktop / CLI / 多 IM 平台并行 |
| 定位倾向 | 可安装资源生态 + 本地/服务化 Gateway | 多通道智能体中枢 + Desktop/消息平台操作面 |

简言之，**OpenClaw 更像“Agent runtime + 资源生态平台”**，Hermes Agent 更像“多平台智能体操作系统 / 通信中枢”。

### 3.3 与 NanoBot、CoPaw、ZeroClaw 的对比

- 相比 **NanoBot**：OpenClaw 更平台化，关注 Gateway、资源生命周期和安全边界；NanoBot 更偏工具集成、WebUI、API 服务和轻量个人助手。
- 相比 **CoPaw**：OpenClaw 的生态抽象更完整；CoPaw 当前更集中在 Console、插件、Python Code Mode、本地模型兼容和中文/Windows 使用体验。
- 相比 **ZeroClaw**：两者都重视会话和 Gateway，但 ZeroClaw 更突出 Rust/A2A/ZeroCode/Tailscale 等系统工程路线；OpenClaw 更突出 ClawHub 和用户级插件资源安装。

---

## 4. 共同关注的技术方向

### 4.1 Gateway / 长连接 / 多端运行可靠性

涉及项目：**OpenClaw、Hermes Agent、ZeroClaw、CoPaw**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | Gateway restart 不应截断 macOS LaunchAgent 多行 env；native app reconnect 后消息应继续发送 |
| Hermes Agent | Multiplex gateway 不应阻塞 Discord heartbeat；terminal scope 不应跑到 host；多平台消息投递需可靠 |
| ZeroClaw | gateway reload 后旧 WebSocket 不应继续服务旧实例；SSE 客户端断开不应错误取消 turn |
| CoPaw | Console 本地服务恢复、后台轮询、热重载与 cron 生命周期需稳定 |

**趋势判断：** Gateway 正成为个人 AI 助手的“常驻内核”。项目竞争点从 API 调用转向 service lifecycle、reload、reconnect、long-lived socket、multi-profile isolation。

---

### 4.2 会话持久化、恢复与长任务可靠性

涉及项目：**OpenClaw、Hermes Agent、ZeroClaw、CoPaw、NanoBot**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | Durable questions、saved answers resume、session state consistency |
| Hermes Agent | checkpoint pruning、SQLite lock retry、compaction 后消息顺序、Desktop 首条 prompt 丢失 |
| ZeroClaw | 长对话 trimming 不应永久删除旧 turns；ZeroCode 重启恢复 open sessions |
| CoPaw | 聊天历史 base64 膨胀导致超时；Hub 重启恢复 running runtimes |
| NanoBot | AutoCompact 不应每秒全量扫描 session；API session locks 需释放 |

**趋势判断：** 用户已经开始把 Agent 当作长期工作流执行器，而不仅是一次性聊天窗口。历史完整性、恢复、压缩、快照、锁释放成为基础能力。

---

### 4.3 插件、工具与资源生态

涉及项目：**OpenClaw、Hermes Agent、NanoBot、CoPaw、ZeroClaw**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | ClawHub、Claws as ordinary agents/resources、Muse Code 登录 |
| Hermes Agent | MCP Catalog、Kumiho Memory、hosted MCP、trust tier |
| NanoBot | Google Drive、Google Sheets、exec supersedes 默认工具 |
| CoPaw | 插件内联聊天渲染、ACP 插件加载、Python Code Mode |
| ZeroClaw | A2A protocol crate、Standard Compute provider、scenario routing schema |

**趋势判断：** 插件系统正在从“简单工具调用”升级为“资源、权限、安装生命周期、展示协议、信任等级”的完整生态体系。

---

### 4.4 Provider 与模型目录治理

涉及项目：**OpenClaw、NanoBot、Hermes Agent、LobsterAI、CoPaw、ZeroClaw**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | DashScope/Qwen context overflow 分类、local-model prompt compact、Muse Code |
| NanoBot | Standard Compute provider、Google Workspace 工具 |
| Hermes Agent | OpenRouter regional endpoints、Grok 4.7 |
| LobsterAI | DeepSeek、Moonshot、Qwen、Zhipu、MiniMax、Xiaomi 模型目录刷新 |
| CoPaw | CommandCode、Hugging Face provider preset、Ollama num_ctx、LM Studio audio rejection |
| ZeroClaw | Standard Compute provider、vision route sticky 修复 |

**趋势判断：** 多 provider 兼容已进入“细节治理阶段”：不只是能调用，还要正确识别错误、上下文窗口、区域 endpoint、能力标签、模型废弃迁移。

---

### 4.5 安全边界与凭证保护

涉及项目：**OpenClaw、Hermes Agent、LobsterAI、ZeroClaw、NanoBot**

| 项目 | 具体风险 |
|---|---|
| OpenClaw | OpenShell nested `.git` 同步；workspace hookKey 绕过 opt-in；Gateway env 截断 |
| Hermes Agent | terminal scope 跑到 host；WhatsApp BSUID 碰撞；remote stdio MCP cleanup 边界 |
| LobsterAI | Provider API Key 导出使用硬编码公开密码 |
| ZeroClaw | `ruzstd` 安全依赖；gateway lifecycle；Tailscale serve 监管 |
| NanoBot | Hosted NanoBot README 背书、WebUI upload cookie 与 redirects |

**趋势判断：** Agent 工具链天然涉及文件、凭证、shell、远程服务和用户数据。随着真实用户增多，安全边界正在从“附加项”变成核心设计约束。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 / 路线特征 |
|---|---|---|---|
| **OpenClaw** | Gateway、ClawHub、agents/resources、插件安装、Web/Native 控制面 | 想构建长期个人 AI 助手、插件生态、自动化平台的用户和开发者 | 平台型 Agent runtime；重视 Gateway、资源生命周期、安全边界、Solid UI 迁移 |
| **Hermes Agent** | 多平台消息通道、Desktop、MCP、Cron、profile multiplex | 多设备、多 IM、Desktop 用户；高级自动化用户 | 超大规模多组件架构；强调消息平台、MCP catalog、Desktop/CLI |
| **NanoBot** | 轻量工具集成、WebUI/API、Google Workspace、provider 扩展 | 个人生产力、知识工作、轻量自动化用户 | 工具驱动型助手；关注外部 SaaS 数据源和 API 稳定性 |
| **CoPaw / QwenPaw** | Console、插件、Python Code Mode、本地模型、Windows/中文体验 | 中文开发者、本地模型用户、Console 工作流用户 | Console-centric；强调插件能力、代码编排、AgentScope 依赖 |
| **ZeroClaw** | ZeroCode、Gateway、A2A、Rust crate、Tailscale、会话恢复 | 系统工程型开发者、TUI/远程部署用户 | 偏系统级架构；Rust / A2A / Gateway / Tailscale 特征明显 |
| **LobsterAI** | 桌面伴侣、TTS、模型目录、Electron 桌面体验 | 桌面个人助手、语音朗读、多模型桌面用户 | Electron 桌面应用路线；重视 UI、TTS、模型目录 |
| **NanoClaw** | 安装与更新通道 | 新安装用户、稳定升级路径用户 | 小步维护，关注 setup/update channel 一致性 |
| **IronClaw** | 依赖治理 | 项目维护者 | 当前仅观察到自动化依赖维护 |
| **PicoClaw / NullClaw / TinyClaw / Moltis / ZeptoClaw** | 暂无新动态 | 暂不可判断 | 当前处于静默期 |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

代表项目：**Hermes Agent、OpenClaw、CoPaw、ZeroClaw**

特征：

- PR / Issue 更新量高；
- 同时推进功能扩展与稳定性修复；
- 多个核心路径被频繁修改；
- 用户反馈已经覆盖真实部署问题。

其中：

- **Hermes Agent** 是最高热度项目，但 v0.22.0 后回归压力也最大。
- **OpenClaw** 活跃度略低于 Hermes，但发布节奏更稳定，路线更集中在 Gateway 与资源生态。
- **CoPaw** 和 **ZeroClaw** 正在快速补齐 Console / ZeroCode / Gateway / 插件 / 本地模型能力。

### 6.2 质量巩固阶段

代表项目：**NanoBot、LobsterAI**

特征：

- 活跃度中高；
- 多数 PR 聚焦具体 bug fix、工具集成或依赖升级；
- 用户反馈开始触及安全、性能、部署体验。

NanoBot 的重点是 API/WebUI/工具体系稳定化；LobsterAI 的重点是桌面伴侣与模型目录，但当前 API Key 导出安全问题需要优先修复。

### 6.3 低噪声维护阶段

代表项目：**NanoClaw、IronClaw**

特征：

- 活动少；
- 无明显用户问题爆发；
- 今日主要是安装流程或依赖维护。

### 6.4 静默阶段

代表项目：**PicoClaw、NullClaw、TinyClaw、Moltis、ZeptoClaw**

过去 24 小时无活动，无法判断其真实社区状态。对技术选型者而言，若要求活跃维护和快速响应，应谨慎评估。

---

## 7. 值得关注的趋势信号

### 7.1 Agent 正在从“聊天应用”变成“常驻服务”

OpenClaw Gateway、Hermes multiplex gateway、ZeroClaw reload/WebSocket、CoPaw Console recovery、NanoBot API lock 都说明：  
开发者越来越需要 Agent 能长期运行、断线重连、后台执行、跨设备恢复。  
对开发者的启示是：未来 Agent 框架选型不能只看模型调用能力，还要看 service lifecycle、state store、reconnect、observability。

---

### 7.2 会话历史成为核心资产

多项目同时出现 session state、checkpoint、compaction、chat history bloat、trimming 数据丢失问题。  
这表明用户已经将 Agent 会话视为可审计、可恢复、可继续工作的长期记录。  
开发者应重点设计：

- 原始 transcript 与模型上下文裁剪分离；
- compaction 不应破坏历史；
- checkpoint pruning 要可解释；
- 工具大输出应外置存储或摘要化；
- 恢复路径要具备幂等性。

---

### 7.3 插件生态进入“信任与生命周期”阶段

OpenClaw 的 ClawHub、Hermes 的 MCP trust tier、CoPaw 的插件渲染 API、NanoBot 的 Google 工具、ZeroClaw 的 A2A crate 都指向同一趋势：  
插件不再只是函数列表，而是带有安装、权限、资源、UI、信任、更新和跨进程行为的生态单元。  
Agent 开发者需要提前考虑：

- 插件权限模型；
- 工具调用审计；
- 安装包来源与签名；
- 用户 opt-in；
- workspace hook / shell / file access 边界。

---

### 7.4 多 Provider 兼容进入深水区

模型生态变化快，项目开始处理更细的兼容问题：

- Qwen/DashScope context overflow 分类；
- OpenRouter regional endpoint；
- Ollama `num_ctx`；
- LM Studio audio rejection；
- 模型废弃迁移；
- 模型目录刷新；
- Grok 4.7 / Standard Compute 新 provider。

未来框架竞争点不是“支持多少模型”，而是能否正确抽象：

- 上下文窗口；
- multimodal 能力；
- tool-call lifecycle；
- provider-specific error mapping；
- 成本和推理 effort；
- region / compliance endpoint。

---

### 7.5 桌面端和本地工作流重新升温

Hermes Desktop、LobsterAI desktop companion、OpenClaw native app、ZeroCode、CoPaw Console 都说明本地桌面体验仍是个人 AI 助手的重要入口。  
用户希望 AI 不只是网页聊天框，而是能够：

- 常驻桌面；
- 管理本地文件；
- 连接 shell / IDE / workspace；
- 支持语音朗读或 Talk；
- 处理重启恢复；
- 与本地模型协作。

---

### 7.6 安全问题开始显性化

今日最典型的安全信号包括：

- LobsterAI API Key 导出硬编码密码；
- OpenClaw nested `.git` 同步与 hookKey 绕过；
- Hermes terminal scope 跑到 host；
- ZeroClaw vulnerable dependency；
- NanoBot hosted 服务 README 背书风险。

这说明 Agent 项目一旦触达文件系统、凭证、shell、远程服务，就必须按安全产品而非普通开发工具来设计。

---

## 结论

当前个人 AI 助手 / 自主智能体开源生态正在快速从“功能竞赛”转向“工程可靠性竞赛”。  
**OpenClaw** 在其中处于平台型第一梯队，优势是 Gateway、ClawHub、资源生态和会话恢复路线清晰；短期挑战是 PR 积压、安全边界和 Gateway 核心路径回归风险。  
**Hermes Agent** 热度最高、覆盖最广，但大版本后稳定性压力明显；**NanoBot、CoPaw、ZeroClaw、LobsterAI** 则分别在工具集成、Console/插件、本地系统架构、桌面伴侣方向形成差异化。  
对技术决策者而言，选型时应重点评估五项能力：**长期运行可靠性、会话持久化、插件权限模型、多 provider 兼容、安全边界**。这些能力正在成为下一阶段 Agent 框架成熟度的核心指标。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报｜2026-10-14

## 1. 今日速览

过去 24 小时，NanoBot 保持较高开发活跃度：新增或更新 Issues 4 条，PR 更新 16 条，其中 14 条仍待合并，2 条已关闭。今日没有新版本发布，项目主要处于功能扩展、稳定性修复和 WebUI/工具链重构并行推进阶段。

整体来看，社区贡献集中在三类方向：一是 Google Drive / Sheets 等外部数据源工具集成，二是 WebUI 与 API 稳定性修复，三是内置工具描述、默认工具选择、会话锁等内部机制优化。当前 PR 积压较多，但多数 PR 附带测试或明确修复目标，说明项目维护质量仍较健康。需要关注的是：多个高价值修复和新工具 PR 尚未合并，若审查延迟，可能影响下一版本节奏。

---

## 2. 版本发布

今日无新版本发布。

---

## 3. 项目进展

今日共有 2 个 PR 关闭，主要集中在代码清理与工具描述优化方向。

### 已关闭 PR

#### PR #6193：移除未使用的内部代码与样式  
链接：https://github.com/HKUDS/nanobot/pull/6193  
状态：Closed  
作者：chengyongru  

该 PR 清理了未使用的 provider registry 属性、过时的 WebUI CSS 选择器、冗余 WebUI/TUI 内部导出，以及未实例化的测试辅助代码。摘要中明确表示保留现有实现函数、客户端契约、SDK 入口、动态 channel/tool 注册与兼容性 shim。

**影响分析：**
- 属于低风险维护型重构。
- 有助于降低代码库复杂度和维护成本。
- 对用户侧功能影响应较小，主要改善内部可维护性。

#### PR #6201：精简内置工具描述  
链接：https://github.com/HKUDS/nanobot/pull/6201  
状态：Closed  
作者：chengyongru  

该 PR 针对内置工具定义中重复的操作说明、通用建议和展示细节进行了精简，涉及 `my`、`message`、`subagent`、`cron`、`apply_patch`、`generate_image`、`create_goal`、`write_file`、`list_dir`、`web_search` 等工具。

**影响分析：**
- 对 Agent 运行时上下文效率有潜在正面影响。
- 精简工具描述可能减少模型请求中的冗余 token。
- 若处理得当，可提升工具选择稳定性和响应效率。
- 但因状态为 Closed，需进一步确认是已合并、主动关闭，还是被其他 PR 替代。

### 今日仍在推进的重要 PR

#### PR #6202：当 `exec` 可用时隐藏被替代的默认工具  
链接：https://github.com/HKUDS/nanobot/pull/6202  
状态：Open  
作者：chengyongru  

该 PR 引入 `superseded_by` 机制：当 agent scope 中注册了 `exec` 时，默认工具列表会省略 `rg`、`find_files`、`list_dir`、`write_file` 等已被替代的工具。

**项目推进意义：**
- 有助于减少模型可见工具数量，降低工具选择噪音。
- 保留 `rg.py` 和直接 API，说明兼容性仍被重视。
- 这是工具体系“瘦身”和“能力整合”的重要信号。

#### PR #6199：新增 Standard Compute Provider  
链接：https://github.com/HKUDS/nanobot/pull/6199  
状态：Open  
作者：henrikdukefoss  

新增 Standard Compute 作为 OpenAI-compatible gateway provider，并更新 provider registry、WebUI、文档和测试。

**项目推进意义：**
- 扩展 NanoBot 的模型供应商生态。
- Standard Compute 同时兼容 OpenAI 与 Anthropic 风格网关，可能降低用户迁移成本。
- 属于生态型功能增强，但需维护者审慎评估商业供应商接入的长期维护责任。

#### PR #6195：新增只读 Google Drive 工具  
链接：https://github.com/HKUDS/nanobot/pull/6195  
状态：Open  
作者：gianfrancodemarco  

实现 `google_drive` 工具，支持通过 service account 读取共享 Drive 文件夹，可列出、搜索、读取元数据，并下载文件到 workspace。Google Docs、Sheets、Slides 分别可导出为文本、CSV 和 PDF。

**项目推进意义：**
- 直接回应 Issue #6187。
- 将 NanoBot 从“只能处理本地 workspace 文件”扩展到“可访问云端工作文件”。
- 对知识工作、团队协作和企业内部文件读取场景价值较高。

#### PR #6196：新增 Google Sheets 工具  
链接：https://github.com/HKUDS/nanobot/pull/6196  
状态：Open  
作者：gianfrancodemarco  

实现 `google_sheets` 工具，用于读取和更新电子表格。该 PR 堆叠在 #6195 之上，当前目标分支为 `main`，包含 Drive commit，待 #6195 合并后可进一步拆分或整理。

**项目推进意义：**
- 直接回应 Issue #6188。
- 补足结构化数据读写能力。
- 对预算、任务清单、库存、运营表格等轻量业务流程自动化场景意义明显。

---

## 4. 社区热点

今日所有 Issues 的评论数和反应数均为 0，因此“热点”主要按新增议题的重要性、PR 数量和潜在影响排序，而非讨论热度排序。

### 1）云端托管 NanoBot 入口与 README 链接请求  
Issue #6200：https://github.com/HKUDS/nanobot/issues/6200  
状态：Open  
作者：agentrohit37  

用户提出已为 NanoBot 提供免费云端运行环境：  
- 可通过 GitHub 或 Google 登录  
- 一键启动，约 1 分钟可用  
- 无需安装、无需 API key、无需银行卡  
- 为社区预留 100 台云电脑，每台 30 天  
- 请求维护者在 README 中添加链接

**背后诉求：**
- 降低 NanoBot 试用门槛。
- 面向非技术用户或快速体验用户提供 hosted 版本。
- 社区开始出现第三方托管/分发诉求。

**维护者需要关注：**
- 安全性、隐私、账号授权边界。
- 是否为官方认可托管入口。
- README 链接可能带来的信任背书风险。
- 是否需要设立“第三方服务/社区托管”清单和免责声明。

### 2）Google Drive / Sheets 集成需求  
Issue #6187：https://github.com/HKUDS/nanobot/issues/6187  
Issue #6188：https://github.com/HKUDS/nanobot/issues/6188  
相关 PR：  
- PR #6195：https://github.com/HKUDS/nanobot/pull/6195  
- PR #6196：https://github.com/HKUDS/nanobot/pull/6196  

这两个 Issue 分别请求新增 Google Drive 与 Google Sheets 工具，且已快速出现对应 PR。

**背后诉求：**
- 用户希望 Agent 能直接读取真实工作文件，而不是依赖手动下载和复制内容。
- 企业和个人生产力场景中，Google Drive 与 Sheets 是高频数据源。
- 说明 NanoBot 的工具生态正从“本地文件和通用网络能力”向“工作流 SaaS 集成”扩展。

### 3）AutoCompact 每秒全量扫描 session 的性能问题  
Issue #6192：https://github.com/HKUDS/nanobot/issues/6192  
状态：Open  
作者：hsinchao-athena  

用户指出在 `nanobot-ai 0.3.0` 中，`AgentLoop.run` 每次 `bus.consume_inbound()` 1 秒 timeout 后都会调用 `auto_compact.check_expired(...)`，而该方法每次调用都会触发 `SessionManager.list_sessions()`，进一步打开所有 `sessions/*.jsonl` 文件。

**背后诉求：**
- 会话数量增长后，空闲 tick 也可能导致持续 I/O 压力。
- 用户关注长时间运行、会话较多时的性能可扩展性。
- 这是典型“低频功能在高频循环中执行”的性能问题。

---

## 5. Bug 与稳定性

以下按潜在严重程度和影响面排序。

### 高优先级

#### 1）AutoCompact 每秒触发全量 session 扫描  
Issue #6192：https://github.com/HKUDS/nanobot/issues/6192  
状态：Open  
是否已有 fix PR：未看到直接关联 PR  

**问题描述：**
`AgentLoop.run` 在每次 1 秒 idle timeout 后调用 `auto_compact.check_expired(...)`，而 `check_expired` 会调用 `SessionManager.list_sessions()`，导致每秒扫描所有 session 文件。

**影响：**
- 会话数量多时可能造成显著磁盘 I/O。
- 长驻 agent 或多 session 部署可能受到影响。
- 即使系统空闲，也可能持续产生不必要负载。

**建议：**
- 引入检查节流，例如每 N 秒或基于下一次过期时间调度。
- 避免在 idle tick 中进行全量文件扫描。
- 为 session metadata 建索引或缓存。
- 添加包含大量 session 的性能回归测试。

#### 2）API 完成请求后 session locks 未释放  
PR #6194：https://github.com/HKUDS/nanobot/pull/6194  
状态：Open  
作者：ZedingZhang  
关联：Fixes #4883  

**问题描述：**
完成的 API 请求如果使用不同 `session_id`，其 lock 会长期留在应用 registry 中。PR 通过 `WeakValueDictionary` 存储锁，使空闲条目可被垃圾回收，同时请求处理器和 streaming tasks 保留强引用。

**影响：**
- 长期运行 API 服务可能出现内存增长。
- 多 session 高频调用场景风险更高。

**修复状态：**
已有 fix PR，建议优先审查合并。

### 中高优先级

#### 3）WebUI 上传在代理或 Cloudflare Tunnel 后无法携带 cookie  
PR #6198：https://github.com/HKUDS/nanobot/pull/6198  
状态：Open  
作者：DKlaper  

**问题描述：**
在代理或 Cloudflare Tunnel 后，上传附件请求没有发送 cookie，导致边缘认证部署中上传失败。PR 改为发送 same-origin cookies，并拒绝 redirects，避免上传能力被转发。

**影响：**
- 影响带认证代理的 WebUI 部署。
- 用户表现为附件上传不可用。
- 同时涉及认证凭据安全，需要谨慎 review。

**修复状态：**
已有 fix PR。

#### 4）Email 附件重名导致覆盖  
PR #6184：https://github.com/HKUDS/nanobot/pull/6184  
状态：Open  
作者：fhgffy  

**问题描述：**
同一封邮件中两个附件文件名相同，或经 sanitize 后变成相同文件名时，后一个附件会覆盖前一个。

**影响：**
- 数据丢失风险。
- 对邮件 channel 的可靠性影响较大。

**修复状态：**
已有 fix PR。PR 采用保留第一个文件名、后续文件选择未使用编号名的策略。

#### 5）Email 正文提取错误包含附加 `.eml` 内容  
PR #6186：https://github.com/HKUDS/nanobot/pull/6186  
状态：Open  
作者：fhgffy  

**问题描述：**
MIME walk 会跳过标记为 attachment 的 part，但仍会继续遍历其子节点，导致附加的 `.eml` 邮件正文被错误合并进父邮件正文。

**影响：**
- 代理可能误读邮件上下文。
- 邮件自动化场景可能产生错误判断。

**修复状态：**
已有 fix PR，包含基于真实 `message/rfc822` 附件的回归测试。

### 中优先级

#### 6）Cron 未显式 timezone 时跨 DST 可能漂移  
PR #6185：https://github.com/HKUDS/nanobot/pull/6185  
状态：Open  
作者：fhgffy  

**问题描述：**
未显式设置 timezone 的 cron schedule 使用主机当前 UTC offset，而该 offset 不包含夏令时规则，导致每日 9 点任务在跨 DST 后可能偏移一小时。

**影响：**
- 定时任务可靠性下降。
- 对依赖本地时间的自动化任务影响明显。

**修复状态：**
已有 fix PR，改为解析系统时区到 IANA `ZoneInfo`。

#### 7）`web_fetch` 对大小写混合的图片 media type 处理错误  
PR #6197：https://github.com/HKUDS/nanobot/pull/6197  
状态：Open  
作者：fhgffy  

**问题描述：**
服务器返回 `Content-Type: Image/PNG` 时，`web_fetch` 未能识别为图片，转而将图片 bytes 当作文本解码返回。HTTP media type 按 RFC 9110 是大小写不敏感的。

**影响：**
- 图片抓取和处理结果异常。
- 可能污染上下文或导致 agent 误判网页内容。

**修复状态：**
已有 fix PR，通过规范化 type/subtype 处理。

#### 8）XLSX grep 遇到单元格内 literal tab 时列定位错误  
PR #6183：https://github.com/HKUDS/nanobot/pull/6183  
状态：Open  
作者：rudycelekli  

**问题描述：**
XLSX 单元格中包含 literal tab 时，`grep` 会将其错误当作单元格分隔符，导致 Excel 列定位错误。例如 B1 可能被标记为 C1。

**影响：**
- 文件搜索定位不准确。
- 对电子表格分析场景影响明显。

**修复状态：**
已有 fix PR，通过记录真实 cell start offsets 来修正 match locator。

---

## 6. 功能请求与路线图信号

### 1）Google Drive 工具：高概率进入后续版本  
Issue #6187：https://github.com/HKUDS/nanobot/issues/6187  
PR #6195：https://github.com/HKUDS/nanobot/pull/6195  

**需求：**
用户希望 NanoBot 能直接读取 Google Drive 共享文件夹中的文件，而不是要求用户手动下载到 workspace。

**当前状态：**
已有完整 PR，支持 list、search、metadata、download，并处理 Google Docs/Sheets/Slides 导出。

**纳入可能性：高。**  
原因是 Issue 与 PR 一一对应，功能边界清晰，且只读权限相对安全。

### 2）Google Sheets 工具：较高概率进入后续版本，但依赖 Drive PR  
Issue #6188：https://github.com/HKUDS/nanobot/issues/6188  
PR #6196：https://github.com/HKUDS/nanobot/pull/6196  

**需求：**
用户希望 Agent 能读取和更新共享 spreadsheets，用于费用、任务清单、库存等数据维护。

**当前状态：**
已有 PR，但作者说明该 PR stacked on #6195，且当前包含 Drive commit。

**纳入可能性：中高。**  
若 #6195 顺利合并，#6196 很可能被整理后继续推进。需要重点 review 写权限、认证边界和误写保护。

### 3）Standard Compute Provider：生态扩展信号  
PR #6199：https://github.com/HKUDS/nanobot/pull/6199  

**需求：**
新增 OpenAI / Anthropic-compatible gateway provider。

**当前状态：**
已有 provider registry、WebUI、文档和测试修改。

**纳入可能性：中等偏高。**  
技术上路径清晰，但因作者声明“我在 Standard Compute 工作”，维护者可能需要评估中立性、文档措辞和商业 provider 接入标准。

### 4）Hosted NanoBot：产品分发与体验门槛降低信号  
Issue #6200：https://github.com/HKUDS/nanobot/issues/6200  

**需求：**
第三方提供免费云端 NanoBot 体验，并请求 README 链接。

**纳入可能性：不确定。**  
这不是代码功能，而是生态与品牌治理问题。建议维护者建立第三方托管服务政策，而不是直接在主 README 中背书。

### 5）工具系统精简与能力合并  
PR #6202：https://github.com/HKUDS/nanobot/pull/6202  

**需求/方向：**
当 `exec` 已覆盖部分默认工具能力时，隐藏 `rg`、`find_files`、`list_dir`、`write_file` 等默认工具，减少工具列表复杂度。

**纳入可能性：较高。**  
该方向与 #6201 的工具描述精简一致，显示维护者正在优化模型上下文中的工具暴露策略。

---

## 7. 用户反馈摘要

今日 Issues 评论数均为 0，因此反馈主要来自 Issue 正文和 PR 描述中的使用场景。

### 主要用户痛点

#### 1）安装与试用门槛仍然偏高  
来源：Issue #6200：https://github.com/HKUDS/nanobot/issues/6200  

用户提出“一键云端运行、无需安装、无需 API key、无需银行卡”的 hosted NanoBot，说明部分潜在用户希望先体验能力，而不是先完成本地部署和凭据配置。

**代表性场景：**
- 新用户快速试用。
- 非工程用户体验 AI agent。
- 社区演示或教学。

#### 2）Agent 无法直接访问 Google Workspace 中的工作资料  
来源：  
- Issue #6187：https://github.com/HKUDS/nanobot/issues/6187  
- Issue #6188：https://github.com/HKUDS/nanobot/issues/6188  

用户明确指出大量工作文件位于 Google Drive 和 Google Sheets 中，当前需要人工下载或复制内容到 workspace，破坏了自动化体验。

**代表性场景：**
- 读取共享文件夹中的文档。
- 查询或更新费用表。
- 管理任务清单、库存表。
- 将团队协作文档纳入 agent 工作上下文。

#### 3）长时间运行和多 session 场景下的性能可扩展性值得关注  
来源：Issue #6192：https://github.com/HKUDS/nanobot/issues/6192  

用户发现 AutoCompact 在 idle tick 中每秒扫描所有 session 文件，说明实际使用中已经有人关注 NanoBot 的持久运行成本。

**代表性场景：**
- 多会话服务器部署。
- 长时间后台运行 agent。
- session 文件数量增长后的性能退化。

### 满意/不满意信号

- **正向信号：** 社区能够快速从 Issue 推进到 PR，例如 Google Drive / Sheets 需求当天已有实现，说明贡献链路活跃。
- **负向信号：** 若性能类问题如 #6192 长期无修复，可能影响服务端部署用户信心。
- **潜在风险：** 第三方 hosted 服务请求 README 背书，若处理不谨慎，可能引发安全、隐私和官方认可边界问题。

---

## 8. 待处理积压

受限于本日报数据仅覆盖过去 24 小时，无法完整识别“长期未响应”的历史积压。不过，从今日数据看，有几类待处理事项值得维护者优先关注。

### 需要优先 review 的稳定性修复 PR

1. API session locks 释放问题  
PR #6194：https://github.com/HKUDS/nanobot/pull/6194  
原因：涉及长期运行内存占用，且关联历史 Issue #4883。

2. WebUI 上传 cookie 问题  
PR #6198：https://github.com/HKUDS/nanobot/pull/6198  
原因：影响代理/Cloudflare Tunnel 后的附件上传，属于部署兼容性问题。

3. Email 附件覆盖问题  
PR #6184：https://github.com/HKUDS/nanobot/pull/6184  
原因：存在数据丢失风险。

4. Cron DST 漂移问题  
PR #6185：https://github.com/HKUDS/nanobot/pull/6185  
原因：影响定时任务准确性，尤其是跨夏令时地区用户。

5. XLSX grep 定位错误  
PR #6183：https://github.com/HKUDS/nanobot/pull/6183  
原因：影响文件搜索结果可信度。

### 需要尽快 triage 的 Issue

1. AutoCompact 每秒全量 session 扫描  
Issue #6192：https://github.com/HKUDS/nanobot/issues/6192  
建议：标记为 performance/bug，并评估是否需要 hotfix。

2. Hosted NanoBot README 链接请求  
Issue #6200：https://github.com/HKUDS/nanobot/issues/6200  
建议：不要仅从便利性判断，应补充安全、隐私、服务可用性和官方背书政策评估。

### 需要协调依赖关系的功能 PR

1. Google Drive 工具  
PR #6195：https://github.com/HKUDS/nanobot/pull/6195  

2. Google Sheets 工具  
PR #6196：https://github.com/HKUDS/nanobot/pull/6196  

建议先审查并合并或反馈 #6195，再要求 #6196 rebase/拆分，避免 stacked PR 中重复 commit 干扰 review。

---

## 项目健康度评估

**总体健康度：良好，活跃度偏高。**

- **开发活跃度：高。** 24 小时内 16 条 PR 更新，覆盖 bug fix、feature、provider、WebUI、工具系统等多个模块。
- **社区参与度：中等。** Issues 数量不多，但需求质量较高，且有外部贡献者提交功能 PR。
- **稳定性风险：中等。** 多个 bug fix PR 待合并，涉及 API 资源释放、邮件附件、定时任务、WebUI 上传等实际运行问题。
- **路线图信号：清晰。** NanoBot 正在向更强的外部工具集成、更多 provider 支持、更精简的工具上下文和更低试用门槛发展。
- **维护建议：** 优先处理稳定性 PR 与 #6192 性能问题，同时为第三方 hosted 服务和 SaaS 工具集成建立明确的安全与维护准则。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
**日期：2026-10-14**  
**仓库：** https://github.com/NousResearch/hermes-agent

---

## 1. 今日速览

Hermes Agent 今日活跃度极高：过去 24 小时内有 **50 条 Issue 更新**、**50 条 PR 更新**，并发布了新版本 **v0.22.0 “The Threshold Release”**。从数据看，项目正处于高速迭代阶段，尤其集中在 **Gateway 多平台消息投递、会话状态可靠性、Cron 调度、Desktop/CLI 安装更新、插件与 MCP 生态** 等方向。  
今日 Issue 中仅 **1 条关闭**，其余大多为新开或持续活跃，说明社区反馈量大、问题面广；PR 侧同样以待合并为主，显示维护队列压力较高。  
整体健康度判断：**开发活跃、社区参与强，但稳定性与回归压力明显上升**，尤其是会话丢失、消息投递失败、Docker/多 profile 路由边界、Desktop 首次输入丢失等问题值得优先处理。

---

## 2. 版本发布

### v0.22.0：Hermes Agent v0.22.0 — The Threshold Release  
链接： https://github.com/NousResearch/hermes-agent/releases/tag/v0.22.0

本日发布了 **v0.22.0 “The Threshold Release”**。根据 Release 摘要，自 v0.21.0 以来，该版本包含：

- 约 **24,200 commits**
- 约 **6,080 merged PRs**
- 约 **15,600 files changed**
- 约 **2,045,000 insertions**
- 约 **1,140,000 deletions**
- 约 **7,180 issues closed**
- 约 **2,520 contributors**

这是一个规模非常大的版本周期，说明 v0.22.0 很可能不仅是常规补丁版本，而是一次涉及多组件、多平台、多运行路径的大型更新。

### 可观察到的版本主题

从今日新增问题和 PR 反推，v0.22.0 周边重点可能包括：

- Gateway 多平台适配：Discord、Telegram、Matrix、Slack、WhatsApp Cloud 等
- 多 profile / multiplex gateway 支持
- Cron 调度与自动化任务稳定性
- Desktop 新会话、Cloud 登录、远程项目选择等体验
- 插件系统、MCP Catalog、TTS、Memory 插件扩展
- 会话压缩、checkpoint、rollback、SQLite 状态持久化等会话可靠性能力

### 破坏性变更与迁移注意事项

当前 Release 摘要未提供完整 changelog，因此无法确认正式破坏性变更列表。但从今日 Issue 和 PR 观察，升级或部署 v0.22.0 时建议重点关注以下风险：

1. **多 profile / multiplex gateway 用户需谨慎升级**  
   相关问题显示 multiplex profile 模式下仍存在终端作用域、cron ticker 性能、配置重解析等问题。  
   - Issue #138105： https://github.com/NousResearch/hermes-agent/issues/138105  
   - Issue #138044： https://github.com/NousResearch/hermes-agent/issues/138044  

2. **Desktop 用户注意首条消息丢失与 Cloud 登录问题**  
   - Issue #138047： https://github.com/NousResearch/hermes-agent/issues/138047  
   - Issue #138162： https://github.com/NousResearch/hermes-agent/issues/138162  
   - PR #138190： https://github.com/NousResearch/hermes-agent/pull/138190  

3. **依赖更新路径仍可能受 uv / exclude-newer 影响**  
   - Issue #138131： https://github.com/NousResearch/hermes-agent/issues/138131  

4. **Docker / remote backend / container path 场景需关注路径映射与权限边界**  
   - Issue #138115： https://github.com/NousResearch/hermes-agent/issues/138115  
   - Issue #138088： https://github.com/NousResearch/hermes-agent/issues/138088  

5. **发布渠道本身出现稳定发布推进问题**  
   v0.22.0 发布后，稳定发布流程似乎在推进 Desktop feeds 与 Docker aliases 时遇到问题，已有修复 PR。  
   - PR #138179： https://github.com/NousResearch/hermes-agent/pull/138179  

---

## 3. 项目进展

过去 24 小时 PR 更新共 **50 条**，其中 **49 条仍待合并**，仅 **1 条已合并或关闭**。本次数据未展示该已合并/关闭 PR 的具体编号，因此无法对实际已落地代码做精确归因。以下为今日最值得关注的待合并进展。

### 3.1 会话可靠性与状态一致性

#### PR #138190：Desktop 首条 prompt 丢失问题的复现测试套件  
链接： https://github.com/NousResearch/hermes-agent/pull/138190  
关联 Issue： https://github.com/NousResearch/hermes-agent/issues/138047

该 PR 为 Desktop 新会话首条输入在竞态条件下丢失的问题补充复现测试。重点是固定 “first send races a context move” 时 composer 应恢复 draft 的行为。  
这属于稳定性基础工作，虽然不是直接修复，但对后续修复非常关键。

#### PR #138189：去除 outgoing messages 中的 `message_id` replay alias  
链接： https://github.com/NousResearch/hermes-agent/pull/138189

该 PR 处理消息重放 alias 泄漏问题，避免 outgoing message 携带持久化层重新暴露的 `message_id`。这对跨平台消息投递、会话回放、幂等处理都有直接影响。

#### PR #138185：暴露 scoped unfinished receipts，用于离线恢复  
链接： https://github.com/NousResearch/hermes-agent/pull/138185

该 PR 增加 `unfinished_runs(scope)`，使容器替换或离线恢复后可以发现未完成 API runs，而不需要客户端重建提交账本。  
这对自动化任务、API run 幂等恢复、长任务容错都有价值。

#### PR #138177 / #138182：修复 compaction 后 assistant reply 顺序错误  
链接：  
- https://github.com/NousResearch/hermes-agent/pull/138177  
- https://github.com/NousResearch/hermes-agent/pull/138182  
关联 Issue： https://github.com/NousResearch/hermes-agent/issues/138173

两个 PR 都指向会话压缩后回复被错误插入到后续 tool rows 之后的问题。该类 bug 会破坏会话时间线，影响 agent 对上下文的理解，属于会话状态一致性的重要修复方向。

---

### 3.2 Cron 与自动化任务

#### PR #138181：Cron 显示优先使用 cron expression  
链接： https://github.com/NousResearch/hermes-agent/pull/138181

该 PR 修复 schedule 编辑后显示 snapshot 过期的问题，确保显示来源与实际 cron expression 一致。

#### PR #138180：Interval schedule label 从实际 interval 渲染  
链接： https://github.com/NousResearch/hermes-agent/pull/138180

该 PR 避免 legacy interval records 中 stale cron-style display snapshot 误导用户。  
两者共同说明 Cron UI/工具层的“显示与实际执行不一致”问题正在被系统修复。

---

### 3.3 插件、MCP 与生态扩展

#### PR #138188：将 Kumiho Memory 加入 approved MCP catalog  
链接： https://github.com/NousResearch/hermes-agent/pull/138188

该 PR 支持 manifest v2，并引入 `trust: untrusted` 信任分层，保留写入审批边界。说明 Hermes 的 MCP Catalog 正向更明确的安全信任模型演进。

#### PR #138184：将 Kumiho Memory 移至 Memory shelf  
链接： https://github.com/NousResearch/hermes-agent/pull/138184

该 PR 更偏 catalog 展示与产品分类优化，强化 Memory 类插件的独立入口。

#### PR #138176：提议 Ship.com hosted MCP catalog entry  
链接： https://github.com/NousResearch/hermes-agent/pull/138176

该 PR 是一个待验证的 hosted MCP 目录条目，显示社区正在推动更多外部服务进入 Hermes MCP 生态。

#### PR #138172：文档化 remote stdio MCP cleanup 边界  
链接： https://github.com/NousResearch/hermes-agent/pull/138172  
关联 Issue： https://github.com/NousResearch/hermes-agent/issues/138143

该 PR 明确 Hermes 只能监管本地 `ssh` 子进程，不能监管远端 host 上启动的实际进程。属于安全与运维边界说明。

---

### 3.4 平台与 Provider 支持

#### PR #138183：OpenRouter 支持可配置区域 endpoint  
链接： https://github.com/NousResearch/hermes-agent/pull/138183

为 OpenRouter 增加 global/eu/us endpoint 配置，支持 Business/Enterprise 的区域化路由。  
这对企业用户、合规部署、数据驻留要求非常重要。

#### PR #138170：支持 Grok 4.7 on Responses API  
链接： https://github.com/NousResearch/hermes-agent/pull/138170

增加 `grok-4.7` 模型支持、500k context window、reasoning effort ladder、priority service tier，并支持 `responses/compact`。  
这是 provider 能力扩展方向的重要 PR。

---

### 3.5 发布与安装更新

#### PR #138179：Stable publish 推进 feeds 与 Docker aliases  
链接： https://github.com/NousResearch/hermes-agent/pull/138179

该 PR 直接关联 v0.22.0 稳定发布流程。当前症状是 GitHub release 已公开后，后续推进 desktop feeds 与 Docker aliases 的流程失败。  
这属于发布工程阻塞项，应尽快合并或回滚风险。

---

## 4. 社区热点

以下 Issue 是今日评论数、严重性或反应较高的热点。

### 4.1 Multiplex cron ticker 性能问题导致 Discord heartbeat 饥饿  
Issue #138105  
链接： https://github.com/NousResearch/hermes-agent/issues/138105  
评论数：4  
标签：`type/perf`, `comp/gateway`, `comp/cron`, `platform/discord`, `P2`, `area/profiles`

用户报告在 `gateway.multiplex_profiles: true` 下，cron ticker 每 60 秒遍历所有 profile，并重复解析配置、执行 chmod/container probes，导致 Discord heartbeat 被饿死。  
背后诉求：  
- 多 profile gateway 要具备可扩展性  
- cron 调度不能阻塞平台心跳  
- Gateway 需要隔离高成本定期任务与实时消息通道

这是今日讨论最活跃的问题，也暴露出 v0.22.0 多 profile 能力在大规模 profile 场景下的性能瓶颈。

---

### 4.2 Desktop 在 Omarchy 环境启动挂起  
Issue #138154  
链接： https://github.com/NousResearch/hermes-agent/issues/138154  
评论数：2  
标签：`type/bug`, `comp/cli`, `comp/desktop`, `area/install-update`, `needs-repro`, `P2`

该问题说明 Desktop 在特定 Linux/Omarchy 环境下启动挂起。当前带有 `needs-repro`，说明维护者仍需可复现环境或日志。  
背后诉求：  
- Desktop Linux 兼容性需要增强  
- 安装更新链路需要更好的错误诊断  
- 非主流发行版/桌面环境用户正在扩大

---

### 4.3 Docker backend 下 AGENTS.md 子目录提示无法识别容器绝对路径  
Issue #138115  
链接： https://github.com/NousResearch/hermes-agent/issues/138115  
评论数：2  
标签：`type/bug`, `comp/agent`, `backend/docker`, `P2`

用户指出当 `terminal.backend: docker` 且 cwd 挂载到 `/workspace` 时，agent 自然使用容器内绝对路径，但 AGENTS.md 子目录 hints 未正确匹配 `/workspace/...`。  
背后诉求：  
- agent 上下文和路径提示必须理解容器内路径  
- Docker backend 不应泄漏 host/container 路径差异给模型  
- 多后端路径规范需要统一

---

### 4.4 Remote folder picker 从 `/` 开始导致权限问题  
Issue #138088  
链接： https://github.com/NousResearch/hermes-agent/issues/138088  
评论数：2  
标签：`comp/cli`, `comp/desktop`, `area/config`, `area/docker`, `P2`

用户在 remote backend 创建项目时，folder picker 从 `/` 开始，而不是 managed files root，例如 `/opt/data`，导致进入 `/opt` 时触发 `403`。  
背后诉求：  
- 远程文件选择器应默认进入受管根目录  
- UI 不应引导用户进入不可访问路径  
- Docker/remote backend 的权限模型需要在前端体现

---

### 4.5 Multiplexed gateway 忽略 Managed Scope terminal.*，命令跑到 host  
Issue #138044  
链接： https://github.com/NousResearch/hermes-agent/issues/138044  
评论数：2  
标签：`comp/gateway`, `comp/tui`, `comp/cron`, `tool/terminal`, `backend/docker`, `area/config`, `P2`, `sweeper:risk-security-boundary`

该问题严重性较高：多路复用 gateway 在 per-turn terminal scope 中解析为 local，导致命令运行在 host 而不是预期 backend。  
背后诉求：  
- Managed Scope 必须是安全边界  
- 多 profile 路由不能改变终端执行位置  
- Docker backend 的隔离语义必须可靠

---

### 4.6 Checkpoint over-cap 导致 rollback 快照静默丢失  
Issue #138039  
链接： https://github.com/NousResearch/hermes-agent/issues/138039  
评论数：1，👍：1  
标签：`type/bug`, `comp/tools`, `tool/file`, `area/config`, `P1`, `sweeper:risk-session-state`

这是今日少数带有 👍 反应且标为 P1 的问题。用户报告 checkpoint store 超过 `max_total_size_mb` 后，pruner 会在每次 checkpoint 时从每个项目删除真实 snapshot，最终每个项目只剩一个快照，并且不能真正释放空间。  
背后诉求：  
- rollback 必须可靠  
- 存储上限不能造成静默数据损坏  
- checkpoint pruning 需要可解释、可观测、可恢复

---

## 5. Bug 与稳定性

以下按严重程度和影响范围排序。

### P1 / 高优先级

#### 5.1 Checkpoint pruning 导致 rollback 快照静默丢失  
Issue #138039  
链接： https://github.com/NousResearch/hermes-agent/issues/138039  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- 可能导致历史快照不可恢复  
- 用户以为 rollback 可用，但实际快照已被静默删除  
- 属于数据可靠性和会话状态高风险问题

建议优先级：最高。

---

#### 5.2 Cron turn 遇到 SQLite write lock 后无 retry，session finalization 崩溃  
Issue #138160  
链接： https://github.com/NousResearch/hermes-agent/issues/138160  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- Cron 自动任务可能因临时 SQLite 写锁失败  
- session finalization 抛出未处理 RuntimeError  
- 自动化任务和长时间运行代理的可靠性下降

建议优先级：最高，尤其影响 Docker gateway 常驻部署。

---

### P2 / 中高优先级

#### 5.3 Multiplex cron ticker O(profiles) 阻塞 Discord heartbeat  
Issue #138105  
链接： https://github.com/NousResearch/hermes-agent/issues/138105  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- profile 数量增长后性能退化  
- Discord bot heartbeat 受影响，可能断连  
- 暴露 gateway 调度隔离不足

---

#### 5.4 Multiplexed gateway 忽略 terminal scope，命令运行在 host  
Issue #138044  
链接： https://github.com/NousResearch/hermes-agent/issues/138044  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- 可能突破用户预期的 Docker/managed backend 安全边界  
- 命令执行位置错误，风险高  
- 关联 `sweeper:risk-security-boundary`

---

#### 5.5 Desktop 新聊天首条 prompt 可能静默消失  
Issue #138047  
链接： https://github.com/NousResearch/hermes-agent/issues/138047  
状态：Open  
已有相关 PR：  
- PR #138190： https://github.com/NousResearch/hermes-agent/pull/138190

影响：  
- 用户输入未执行、未持久化、UI 无错误  
- 用户可能误以为任务已开始  
- 属于严重 UX 与数据丢失问题

当前 PR 主要是复现测试，仍需实际修复。

---

#### 5.6 Compaction 后回复被重新插入到后续 tool rows 之后  
Issue #138173  
链接： https://github.com/NousResearch/hermes-agent/issues/138173  
状态：Open  
已有 fix PR：  
- PR #138177： https://github.com/NousResearch/hermes-agent/pull/138177  
- PR #138182： https://github.com/NousResearch/hermes-agent/pull/138182

影响：  
- 压缩后会话时间线错乱  
- 模型可能基于错误上下文继续推理  
- 对长会话稳定性影响较大

---

#### 5.7 Docker backend 下 AGENTS.md container path 匹配失败  
Issue #138115  
链接： https://github.com/NousResearch/hermes-agent/issues/138115  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- agent 无法正确应用子目录指导  
- Docker 工作区路径与 host 路径不一致时问题明显  
- 影响 coding agent 的代码库理解

---

#### 5.8 Remote folder picker 进入非 managed root 导致 403  
Issue #138088  
链接： https://github.com/NousResearch/hermes-agent/issues/138088  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- Remote/Docker 项目创建体验受阻  
- 用户容易进入不可访问路径  
- 需要前后端同时理解 managed root

---

#### 5.9 Matrix eM Client 消息无法解密，移除 Base64 padding 可复现修复  
Issue #138108  
链接： https://github.com/NousResearch/hermes-agent/issues/138108  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- Matrix 加密消息互操作性问题  
- Element 可读但 Hermes 不响应  
- 可能是 Base64 padding 处理兼容性问题

---

#### 5.10 Telegram execution approval card 未显示，终端命令超时  
Issue #138133  
链接： https://github.com/NousResearch/hermes-agent/issues/138133  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- 用户无法批准命令执行  
- terminal 工具等待 300 秒超时  
- 属于消息投递与人机确认链路问题

---

#### 5.11 `read_file` 将 permission denied 误报为 File not found  
Issue #138090  
链接： https://github.com/NousResearch/hermes-agent/issues/138090  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- agent 错误判断文件不存在  
- 会误导模型执行错误恢复动作  
- 应区分不存在、权限不足、sandbox denied

---

#### 5.12 Kubernetes `*.svc.cluster.local` 被误判为 local endpoint  
Issue #138053  
链接： https://github.com/NousResearch/hermes-agent/issues/138053  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- Kubernetes 内部服务可能被错误归类为 local  
- OpenAI-compatible endpoint 行为受影响  
- 影响集群部署场景

---

#### 5.13 OpenRouter 区域 endpoint 硬编码 global  
PR #138183  
链接： https://github.com/NousResearch/hermes-agent/pull/138183  
状态：Open

影响：  
- 企业用户无法使用 EU/US 区域 endpoint  
- 数据驻留与合规路由受限  
- 已有功能 PR，纳入下一版本概率较高

---

### P3 / 中低优先级

#### 5.14 Telegram MarkdownV2 code fence 被 tool-progress repeat counter 破坏  
Issue #138148  
链接： https://github.com/NousResearch/hermes-agent/issues/138148  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- Telegram 输出格式错误  
- code fence 反引号显示为转义文本  
- 影响消息可读性

---

#### 5.15 ACP adapter 未适配 `todo` → `todo_list` 工具重命名  
Issue #138186  
链接： https://github.com/NousResearch/hermes-agent/issues/138186  
已有 fix PR：  
- PR #138187： https://github.com/NousResearch/hermes-agent/pull/138187

影响：  
- ACP client 原生 task panel 不更新  
- curated rendering 失效  
- 属于工具命名迁移后的兼容性问题

---

#### 5.16 Desktop Cloud sign-in 打开 Portal marketing page  
Issue #138162  
链接： https://github.com/NousResearch/hermes-agent/issues/138162  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- Cloud agent discovery 无法完成  
- 用户被带到营销页而非登录/授权流程  
- 影响 hosted Cloud onboarding

---

#### 5.17 Slack native task cards：旧工具调用完成后仍显示 in progress  
Issue #138193  
链接： https://github.com/NousResearch/hermes-agent/issues/138193  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- Slack 原生任务卡状态不准确  
- 超过 8 个新工具调用后，旧任务完成状态不再推送  
- 影响长工具链任务可观察性

---

#### 5.18 WhatsApp Cloud allowlist 非数字字符剥离导致 BSUID 碰撞  
Issue #138192  
链接： https://github.com/NousResearch/hermes-agent/issues/138192  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- business-scoped user IDs 可能碰撞  
- 可能影响访问控制 allowlist 的准确性  
- 存在身份边界风险

---

#### 5.19 Web extract 保存长 PDF 为单行，read_file 无法读取中段  
Issue #138141  
链接： https://github.com/NousResearch/hermes-agent/issues/138141  
状态：Open  
是否已有 fix PR：当前数据未显示明确对应 PR

影响：  
- 长 PDF 的中间内容无法读取  
- footer 提示 offset 超出文件范围  
- 影响 web/file 工具协作

---

## 6. 功能请求与路线图信号

### 6.1 TTS 最终音频文件 observer hook  
Issue #138171  
链接： https://github.com/NousResearch/hermes-agent/issues/138171  
已有 PR：  
- PR #138175： https://github.com/NousResearch/hermes-agent/pull/138175

诉求：插件希望观察 Hermes 实际交付的音频文件，例如用于 provenance、AI disclosure、hash receipt 等。  
路线图信号：该功能已有实现 PR，且设计上强调 observer 不阻塞音频交付，纳入下一版本概率较高。

---

### 6.2 CLI/TUI 支持 OSC 7501 Program Status Protocol  
Issue #138147  
链接： https://github.com/NousResearch/hermes-agent/issues/138147

诉求：用户在多个 terminal tabs/panes 中运行 Hermes，希望不用切换窗口即可知道 session 状态，如 working、waiting、finished、failed。  
路线图信号：Hermes 已有 OSC 9 和 Warp OSC 777，OSC 7501 属于自然扩展，适合 CLI/TUI 体验增强。

---

### 6.3 Windows bundled Python 从 3.14.7 升级到 3.15  
Issue #138139  
链接： https://github.com/NousResearch/hermes-agent/issues/138139

诉求：利用 CPython 3.15 Windows 64-bit tail-calling interpreter 带来的纯 Python 热路径性能提升。  
路线图信号：该需求有性能收益，但涉及打包、兼容性、artifact 体积变化，应作为安装更新路线中的评估项。

---

### 6.4 OpenRouter 支持 region endpoints  
PR #138183  
链接： https://github.com/NousResearch/hermes-agent/pull/138183

诉求：企业/合规用户需要 global/eu/us OpenRouter base URL。  
路线图信号：已有实现 PR，且属于企业部署能力，短期合入概率较高。

---

### 6.5 Grok 4.7 支持  
PR #138170  
链接： https://github.com/NousResearch/hermes-agent/pull/138170

诉求：支持 xAI Grok 4.7、Responses API、reasoning effort、compact、成本统计。  
路线图信号：属于 provider 扩展常规方向，若测试通过，很可能进入下一批 provider 更新。

---

### 6.6 Kumiho Memory 与 MCP Catalog 扩展  
PR：  
- https://github.com/NousResearch/hermes-agent/pull/138188  
- https://github.com/NousResearch/hermes-agent/pull/138184

诉求：Memory 插件生态增强，同时引入 manifest v2 与 trust tier。  
路线图信号：Hermes 正在将插件目录从“工具列表”升级为带分类、权限、信任边界的生态入口。

---

### 6.7 Desktop 中文本地化：技能显示与 slash rows  
PR #138178  
链接： https://github.com/NousResearch/hermes-agent/pull/138178

诉求：中文用户希望 Skills 页面、skill detail、官方 skill hub preview、slash completion rows 等显示中文。  
路线图信号：已有 PR，说明项目正在扩展非英语用户体验。该 PR 带 `needs-decision`，可能需要产品层确认翻译策略。

---

## 7. 用户反馈摘要

### 7.1 用户对“可靠执行”的期望正在升高

多个 Issue 指向同一个核心痛点：用户将 Hermes 用作长期自动化 agent，但目前在 session、cron、消息投递、checkpoint 方面仍有隐性失败风险。

相关链接：  
- Cron SQLite lock 导致任务中断： https://github.com/NousResearch/hermes-agent/issues/138160  
- Checkpoint rollback 快照静默丢失： https://github.com/NousResearch/hermes-agent/issues/138039  
- Internal wakes restart drain 时仍被丢弃： https://github.com/NousResearch/hermes-agent/issues/138123  
- Desktop 首条 prompt 静默消失： https://github.com/NousResearch/hermes-agent/issues/138047  

用户痛点：  
- 任务失败没有足够可见性  
- 输入或状态可能静默丢失  
- 自动化场景无法完全信任  
- 需要更强的恢复、重试、幂等与告警机制

---

### 7.2 多平台消息投递体验仍不稳定

Telegram、Matrix、Slack、WhatsApp Cloud、Discord 今日均有相关问题。

相关链接：  
- Discord heartbeat 饥饿： https://github.com/NousResearch/hermes-agent/issues/138105  
- Matrix eM Client 解密失败： https://github.com/NousResearch/hermes-agent/issues/138108  
- Telegram MarkdownV2 code fence 错误： https://github.com/NousResearch/hermes-agent/issues/138148  
- Telegram approval card 未显示： https://github.com/NousResearch/hermes-agent/issues/138133  
- Slack task card 状态不更新： https://github.com/NousResearch/hermes-agent/issues/138193  
- WhatsApp Cloud allowlist ID 碰撞： https://github.com/NousResearch/hermes-agent/issues/138192  

用户痛点：  
- 不同 IM 平台的格式、加密、交互卡片、身份模型差异较大  
- agent 在消息通道里不仅要“回复”，还要可靠传递审批、进度、状态  
- 平台适配层需要更强测试矩阵

---

### 7.3 Docker / remote backend 用户关注路径、安全边界和可预测性

相关链接：  
- Docker backend AGENTS.md container path： https://github.com/NousResearch/hermes-agent/issues/138115  
- Remote folder picker root 错误： https://github.com/NousResearch/hermes-agent/issues/138088  
- Multiplexed gateway terminal scope 跑到 host： https://github.com/NousResearch/hermes-agent/issues/138044  

用户痛点：  
- host path 与 container path 映射容易破坏 agent 上下文  
- remote backend UI 未充分尊重 managed root  
- terminal 执行位置错误可能造成安全风险  
- 用户希望 Hermes 的 backend abstraction 更可靠、更透明

---

### 7.4 Desktop 用户仍遇到启动、登录、输入丢失问题

相关链接：  
- Desktop Omarchy 启动挂起： https://github.com/NousResearch/hermes-agent/issues/138154  
- Desktop 首条 prompt 丢失： https://github.com/NousResearch/hermes-agent/issues/138047  
- Desktop Cloud sign-in 进入 Portal marketing page： https://github.com/NousResearch/hermes-agent/issues/138162  

用户痛点：  
- 桌面端作为入口，任何无提示失败都会显著削弱信任  
- 首条 prompt 消失尤其严重，因为用户可能以为任务已开始  
- Cloud 登录与 discovery 流程需要更清晰的状态反馈

---

### 7.5 长期用户反馈：目标坚持能力下降

Issue #138135  
链接： https://github.com/NousResearch/hermes-agent/issues/138135

用户反馈称，近期 Hermes 在日常使用中表现出较弱的目标坚持能力，需要更多人工监督、重复提示和纠错。  
这类反馈虽然 `needs-repro`，但对 agent 产品非常重要：  
- 用户关注的不是单点 bug，而是端到端任务完成率  
- 模型、prompting、工具调度、记忆、压缩、错误恢复都可能影响“目标坚持”  
- 建议维护者将其转化为可测的 benchmark 或 regression suite

---

## 8. 待处理积压

由于本次数据主要覆盖过去 24 小时，无法判断真正“长期未响应”的历史积压。但从严重性、影响范围和是否已有修复看，以下 open 项应优先进入维护者队列。

### 8.1 P1 且暂无明确修复 PR

1. **Checkpoint over-cap 导致 rollback 快照静默丢失**  
   Issue #138039  
   链接： https://github.com/NousResearch/hermes-agent/issues/138039  
   建议：立即确认是否数据损坏类 bug；补充 regression test；必要时在 Release notes 中提示用户检查 checkpoint store。

2. **Cron turn 遇 SQLite write lock 后无 retry，session finalization 崩溃**  
   Issue #138160  
   链接： https://github.com/NousResearch/hermes-agent/issues/138160  
   建议：为 SQLite transient lock 增加 retry/backoff；session finalization 不应因单点异常崩溃。

---

### 8.2 安全边界相关

1. **Multiplexed gateway terminal scope 错误导致命令在 host 执行**  
   Issue #138044  
   链接： https://github.com/NousResearch/hermes-agent/issues/138044  
   建议：优先调查 managed scope resolution；若确认存在，应考虑安全公告或至少在文档中注明风险。

2. **WhatsApp Cloud allowlist BSUID 碰撞**  
   Issue #138192  
   链接： https://github.com/NousResearch/hermes-agent/issues/138192  
   建议：不要将业务作用域用户 ID 简化为纯数字；应保留完整规范化身份。

3. **Codex reset credit 清除所有 pool credential cooldown**  
   Issue #138121  
   链接： https://github.com/NousResearch/hermes-agent/issues/138121  
   建议：按 access token 精确清理 cooldown，避免影响未重置账号。

---

### 8.3 会话状态与消息投递

1. **Desktop 首条 prompt 消失**  
   Issue #138047： https://github.com/NousResearch/hermes-agent/issues/138047  
   PR #138190： https://github.com/NousResearch/hermes-agent/pull/138190  
   建议：测试 PR 合并后尽快进入实际修复。

2. **Compaction reply 顺序错误**  
   Issue #138173： https://github.com/NousResearch/hermes-agent/issues/138173  
   PR #138177： https://github.com/NousResearch/hermes-agent/pull/138177  
   PR #138182： https://github.com/NousResearch/hermes-agent/pull/138182  
   建议：两个 PR 存在功能重叠，应尽快去重并选择一个合并路径。

3. **Internal wakes restart drain 时仍被丢弃**  
   Issue #138123  
   链接： https://github.com/NousResearch/hermes-agent/issues/138123  
   建议：作为 gateway restart / delivery reliability 的后续补丁处理。

---

### 8.4 发布工程阻塞

1. **Stable publish 已公开 release 后推进 feeds/Docker aliases 失败**  
   PR #138179  
   链接： https://github.com/NousResearch/hermes-agent/pull/138179  
   建议：优先处理，避免 v0.22.0 用户通过不同渠道获得不一致版本。

2. **`hermes update --yes` 仍受 exclude-newer 影响**  
   Issue #138131  
   链接： https://github.com/NousResearch/hermes-agent/issues/138131  
   建议：检查 `_trust_core_lock` 修复是否覆盖 dependencies follow-up path。

---

## 总体健康度评估

Hermes Agent 当前呈现出典型的高速成长型开源项目状态：**贡献活跃、功能扩张快、平台覆盖广，但稳定性压力和维护队列压力同步上升**。v0.22.0 是一次非常大规模的版本发布，短期内出现集中回归和边界问题并不意外。  
接下来最关键的工作不是继续增加新功能，而是优先收敛以下四类风险：

1. **会话状态可靠性**：prompt 丢失、compaction 顺序、checkpoint pruning、SQLite lock  
2. **消息投递可靠性**：Telegram/Matrix/Slack/Discord/WhatsApp 多平台边界  
3. **安全与执行边界**：Docker backend、managed terminal scope、allowlist 身份规范化  
4. **发布与升级一致性**：v0.22.0 feeds、Docker aliases、`hermes update` 依赖同步

如果这些问题能在 v0.22.x 补丁周期内快速处理，Hermes Agent 的项目健康度仍然保持强劲；否则，大规模版本后的用户信任和自动化场景采用可能受到影响。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报｜2026-10-14

## 1. 今日速览

过去 24 小时内，NanoClaw 项目整体活跃度偏低但仍有功能向更新机制方向推进。今日无 Issue 新增、更新或关闭，说明社区反馈与问题报告暂时较为安静。PR 方面新增/更新 1 条开放中的功能型 Pull Request，聚焦新安装流程中的更新通道选择。今日无版本发布，也无 PR 合并，因此项目主干尚未产生可确认的代码落地变化。整体来看，项目处于低噪声维护状态，当前关注点集中在安装与升级体验的稳定性改进。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 项目进展

今日没有已合并或已关闭的 PR，因此暂无已经进入主分支的功能或修复。

当前值得关注的开放 PR：

### [PR #4084 feat(setup): new installs choose their update channel](https://github.com/qwibitai/nanoclaw/pull/4084)

- 状态：OPEN
- 作者：glifocat
- 标签：`kind/feature`, `PR: Feature`, `follows-guidelines`, `core-team`, `area/setup-installation`
- 创建时间：2026-10-13
- 更新时间：2026-10-13
- 评论数：暂无数据
- 👍：0

该 PR 旨在调整新安装流程：新安装的 NanoClaw 将在 setup 阶段选择更新通道，而不是等到首次执行更新时才确定通道。

从摘要看，其解决的问题是：当用户从 `main` 分支进行 fresh clone 时，默认处于 `stable` channel，但如果 `main` 已经领先于最新 stable release，首次执行 `/update-nanoclaw` 时可能出现版本或通道语义不一致的问题。该改动属于安装/更新体验优化，若合并，有助于降低新用户首次安装后的升级困惑。

项目推进程度评估：今日尚无合并，因此实际代码进展为“待确认”。但该 PR 指向核心安装路径，若通过 review，可能对下一版安装体验产生较明显影响。

---

## 4. 社区热点

今日没有活跃 Issue，也没有高评论或高反应的讨论。

唯一有更新的社区/开发活动是：

### [PR #4084 feat(setup): new installs choose their update channel](https://github.com/qwibitai/nanoclaw/pull/4084)

- 类型：功能改进
- 活跃度：低，暂无评论数与反应数据
- 关注点：安装阶段的 update channel 选择
- 潜在诉求：
  - 新用户希望安装后首次更新行为更可预测。
  - 维护者希望避免 `main` 分支代码与 `stable` 通道之间出现状态错配。
  - 项目可能正在强化 release channel 管理，减少升级路径上的隐性风险。

目前该 PR 未形成明显社区讨论，但因其带有 `core-team` 与 `area/setup-installation` 标签，说明维护团队可能认为其属于核心安装体验问题。

---

## 5. Bug 与稳定性

过去 24 小时内没有新的 Bug、崩溃、回归类 Issue 报告。

当前没有可确认的 bug fix PR。

不过，从 [PR #4084](https://github.com/qwibitai/nanoclaw/pull/4084) 的描述可以看出，它虽然标记为 feature，但实际也具有稳定性和可预测性改进意义：

- 潜在问题类型：安装后首次更新路径不一致
- 严重程度评估：中低
- 影响场景：从 `main` 分支 fresh clone 的新安装用户
- 是否已有 fix PR：是，PR #4084 正在开放中
- 是否已合并：否

---

## 6. 功能请求与路线图信号

今日没有来自 Issues 的新功能请求。

但 [PR #4084](https://github.com/qwibitai/nanoclaw/pull/4084) 释放出一个明确的路线图信号：NanoClaw 正在改进安装与更新通道管理。

可能被纳入后续版本的方向包括：

1. **安装时显式选择 update channel**
   - 当前 PR 已实现或正在实现该方向。
   - 可能影响新安装用户的 setup 流程。

2. **更清晰的 stable/main/release channel 语义**
   - PR 摘要中提到 `main` 与默认 `stable` channel 之间的错配。
   - 说明项目可能会进一步规范不同更新通道的行为边界。

3. **降低首次 `/update-nanoclaw` 的失败或误导风险**
   - 如果用户安装时已明确选择通道，首次更新时的行为会更符合预期。
   - 这对个人 AI 助手类项目尤其重要，因为安装体验往往直接影响用户留存。

综合判断，该 PR 有较高概率成为下一阶段安装体验优化的一部分，但是否进入下一版本仍取决于 review 与合并情况。

---

## 7. 用户反馈摘要

今日没有新的 Issue 评论或用户反馈数据，因此无法提炼新的真实用户痛点。

基于现有 PR 摘要可间接观察到一个使用场景问题：

- 使用场景：用户从 `main` 分支进行全新安装。
- 潜在痛点：安装完成后默认处于 `stable` channel，但实际代码可能领先于最新 stable release。
- 可能造成的困惑：用户首次执行 `/update-nanoclaw` 时，系统的更新逻辑与用户对 stable channel 的理解不一致。
- 改进方向：在 setup 阶段提前选择 update channel，让安装状态与后续更新策略保持一致。

需要注意：以上为基于 PR 描述的推断，不代表直接来自 Issue 评论的用户反馈。

---

## 8. 待处理积压

根据今日提供的数据，过去 24 小时内没有长期未响应的 Issue 或 PR 信息可供判断。

当前唯一需要维护者关注的待处理项是：

### [PR #4084 feat(setup): new installs choose their update channel](https://github.com/qwibitai/nanoclaw/pull/4084)

- 状态：OPEN
- 建议关注点：
  - setup 阶段新增 update channel 选择是否会影响现有自动化安装流程。
  - 是否需要补充迁移说明或安装文档。
  - 对 fresh clone、release tarball、已有安装用户的行为是否一致。
  - 默认 channel 的选择是否会改变现有用户预期。
  - 是否需要测试覆盖首次 `/update-nanoclaw` 的边界场景。

---

## 项目健康度小结

今日 NanoClaw 无发布、无 Issue 活动、无合并 PR，整体活跃度较低。但唯一开放 PR 聚焦安装和更新通道选择，属于影响用户首次体验和长期稳定升级路径的重要基础设施改进。短期内项目没有明显质量风险暴露，也没有新的社区争议或高热讨论。维护者若能尽快 review 并验证 [PR #4084](https://github.com/qwibitai/nanoclaw/pull/4084)，将有助于提升新安装用户的路径一致性与更新可靠性。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报  
**日期：2026-10-14**  
**仓库：** [nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. 今日速览

过去 24 小时内，IronClaw 项目整体活跃度较低，未出现新的 Issue 更新，也没有版本发布。  
今日唯一更新来自 Dependabot 提交的依赖升级 PR，主要涉及文档内部架构视频目录中的 JavaScript 依赖安全/维护性更新。  
当前没有合并或关闭的 PR，说明核心功能开发、Bug 修复和社区讨论在今日均较为平静。  
从项目健康度看，今日维护活动偏向基础依赖治理，未观察到明显的用户反馈压力或稳定性风险信号。

---

## 2. 项目进展

过去 24 小时内没有已合并或已关闭的重要 PR，因此暂无功能推进或修复落地。

当前有 1 个待合并 PR：

### 待合并 PR

#### [#8137 chore(deps): bump brace-expansion in /docs/internal/architecture-video](https://github.com/nearai/ironclaw/pull/8137)

- **状态：** Open  
- **作者：** dependabot[bot]  
- **标签：** dependencies, javascript  
- **创建时间：** 2026-10-13  
- **更新时间：** 2026-10-13  
- **评论数：** 未提供  
- **👍：** 0  

该 PR 将 `brace-expansion` 从 `1.1.18` 升级到 `1.1.21`，影响范围位于 `/docs/internal/architecture-video`。  
从摘要看，这是一次依赖联动升级，可能与安全补丁或依赖兼容性维护有关。由于作用域集中在文档/内部架构视频相关目录，预计不会直接影响 IronClaw 核心运行逻辑。

**进展评估：**  
今日项目整体向前推进幅度有限，主要体现在依赖健康度维护，而非产品功能、Agent 能力或用户体验改进。

---

## 3. 社区热点

今日没有活跃 Issue，也没有出现高评论量或高反应量讨论。

唯一可观察的社区/维护动态是：

### [#8137 Dependabot 依赖升级 PR](https://github.com/nearai/ironclaw/pull/8137)

该 PR 暂无明显社区互动信号，点赞数为 0，评论数未提供。  
其背后的诉求主要是：

- 保持 JavaScript 依赖版本安全；
- 降低潜在供应链风险；
- 避免文档构建或内部工具链依赖老旧版本；
- 维持自动化依赖管理流程的连续性。

从社区热度角度看，该 PR 更偏维护型事务，不代表用户需求或产品路线图变化。

---

## 4. Bug 与稳定性

过去 24 小时内没有新报告的 Bug、崩溃、回归问题或稳定性相关 Issue。

### 严重程度分布

| 严重程度 | 数量 | 说明 |
|---|---:|---|
| Critical | 0 | 未发现导致系统不可用或数据损坏的问题 |
| High | 0 | 未发现严重回归或核心功能阻塞 |
| Medium | 0 | 未发现一般功能异常 |
| Low | 0 | 未发现轻微问题或文档缺陷 |

当前唯一 PR [#8137](https://github.com/nearai/ironclaw/pull/8137) 与依赖升级相关，可能具有安全维护意义，但从现有数据无法确认其对应具体漏洞或 Bug 修复。

---

## 5. 功能请求与路线图信号

过去 24 小时内没有新的功能请求 Issue，也没有用户围绕路线图、Agent 能力、个人 AI 助手体验或集成场景提出新的公开需求。

当前待合并 PR [#8137](https://github.com/nearai/ironclaw/pull/8137) 不属于功能型变更，暂不构成路线图信号。

### 今日可观察结论

- 暂无新功能进入讨论；
- 暂无新路线图方向显现；
- 暂无与下一版本功能范围相关的 PR；
- 当前维护重点更偏依赖治理，而非功能扩展。

---

## 6. 用户反馈摘要

过去 24 小时内没有 Issue 评论更新，因此无法从新增讨论中提炼真实用户痛点或满意度变化。

### 今日未观察到的反馈类型

- 个人 AI 助手使用场景反馈；
- Agent 执行失败或能力不足反馈；
- 安装、部署、配置困难反馈；
- API、文档或开发者体验问题；
- 性能、稳定性或成本相关投诉；
- 对新功能或集成能力的需求表达。

从数据看，今日用户侧声音较少，项目社区处于低噪声状态。

---

## 7. 待处理积压

基于今日提供的数据，过去 24 小时内没有长期未响应的 Issue 或 PR 更新记录，因此无法识别新的积压风险。

当前需要维护者关注的待处理项为：

### [#8137 chore(deps): bump brace-expansion in /docs/internal/architecture-video](https://github.com/nearai/ironclaw/pull/8137)

- **类型：** 依赖升级  
- **状态：** Open  
- **建议处理：**
  - 检查 CI 是否通过；
  - 确认 `/docs/internal/architecture-video` 相关构建流程未受影响；
  - 如无兼容性问题，可尽快合并，以降低依赖老旧带来的维护风险。

---

## 项目健康度判断

| 维度 | 今日状态 | 评价 |
|---|---|---|
| 开发活跃度 | 低 | 仅 1 个 Dependabot PR，无人工功能/修复提交迹象 |
| 社区讨论 | 很低 | 无 Issue 更新，无明显评论或反应 |
| 稳定性风险 | 低 | 无新增 Bug、崩溃或回归报告 |
| 依赖维护 | 正常 | 有自动化依赖升级 PR |
| 发布节奏 | 静默 | 今日无新版本发布 |

**综合判断：**  
IronClaw 今日处于低活跃、低风险的维护状态。项目没有暴露新的稳定性问题，也没有出现明显用户需求波峰。短期内维护者可优先处理 [#8137](https://github.com/nearai/ironclaw/pull/8137)，保持依赖安全和文档工具链健康。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报  
**日期：2026-10-14**  
**仓库：** [netease-youdao/LobsterAI](https://github.com/netease-youdao/LobsterAI)

---

## 1. 今日速览

过去 24 小时，LobsterAI 项目保持了**较高开发活跃度**：共有 **1 条 Issue 更新**、**10 条 PR 更新**，其中 **8 条仍待处理**、**2 条已关闭**。  
今日最值得关注的是一个安全 Issue：Provider API Key 导出功能被报告存在**硬编码公开密码导致导出文件可被轻易解密**的风险，属于高优先级安全问题。  
PR 侧主要集中在三类方向：**桌面伴侣功能、TTS 播放体验修复、依赖升级与模型目录刷新**。  
整体来看，项目处于活跃迭代状态，但当前待合并 PR 较多，且安全问题尚未看到对应修复 PR，需要维护者尽快响应。

---

## 2. 项目进展

今日无新版本发布。以下为过去 24 小时内关闭的重要 PR。

### 2.1 桌面伴侣功能相关 PR 已关闭

- [PR #2860 feat: desktop companion](https://github.com/netease-youdao/LobsterAI/pull/2860)  
  **状态：CLOSED**  
  **作者：** fisherdaddy  
  **涉及范围：** renderer、build、docs、main、cowork、Windows 平台

该 PR 标题显示其目标是引入或推进 **desktop companion / 桌面伴侣** 功能，涉及前端渲染层、主进程、构建、文档以及协作模块，影响范围较广。  
不过当前数据仅显示为 **CLOSED**，无法确认是已合并还是被关闭放弃。若该功能已合并，说明 LobsterAI 正在向更强的桌面端常驻 AI 助手体验演进；若未合并，则可能仍处于方案调整或拆分阶段。

**影响判断：**

- 功能方向重要性：高
- 代码影响面：高
- 当前确定性：中低，需进一步确认是否 merged
- 建议维护者补充关闭原因或拆分后续 PR，便于社区追踪路线图

---

### 2.2 TTS 分段播放速度保持问题修复 PR 已关闭

- [PR #2861 fix(desktop-companion): preserve TTS playback speed across segments](https://github.com/netease-youdao/LobsterAI/pull/2861)  
  **状态：CLOSED**  
  **作者：** btc69m979y-dotcom  
  **涉及范围：** renderer、desktop companion、TTS/read-aloud

该 PR 针对桌面伴侣中的朗读功能修复了一个体验问题：用户选择更快的朗读速度后，在下一句音频加载时可能回退到 **1×**。  
修复方式是同时设置 `defaultPlaybackRate` 与 `playbackRate`，以确保在以下场景中播放速度保持一致：

- 分段音频切换
- 延迟加载音频
- 缓存音频重放
- 后续朗读请求

PR 摘要还提到回归测试已覆盖原生媒体加载行为，说明该修复具有一定稳定性保障。

**影响判断：**

- 用户体验影响：中高
- 回归风险：中
- 与桌面伴侣功能关联：强
- 当前确定性：中，需确认是否 merged

---

## 3. 社区热点

今日社区互动数据整体偏低：最新 Issue 与 PR 均未显示评论或点赞增长，说明目前仍以维护者和自动化依赖更新为主，尚未形成大规模讨论。

### 3.1 安全问题成为今日最高优先级热点

- [Issue #2851 \[Security\] Provider API Key Exports Use a Public Hardcoded Password, Allowing Trivial Decryption by Anyone With the Export File](https://github.com/netease-youdao/LobsterAI/issues/2851)  
  **状态：OPEN**  
  **作者：** carfeii  
  **评论数：** 0  
  **反应数：** 0  
  **创建时间：** 2026-10-13

该 Issue 指出 LobsterAI 的 “Export Providers” 功能在导出 Provider 配置时，会使用 AES-GCM 加密每个 Provider 的 API Key，但其密钥派生依赖的密码是**公开硬编码密码**。这意味着任何拿到导出文件的人，都可以使用已知密码完成解密，导致 API Key 泄露。

**背后诉求：**

- 用户希望导出的 Provider 配置文件真正具备安全保护能力
- 用户关心 API Key、模型服务凭证等敏感信息在本地与跨设备迁移时的安全性
- 项目需要明确导出文件的威胁模型：是仅用于格式封装，还是应提供加密保护

**维护建议：**

- 尽快确认影响范围与受影响版本
- 暂时在文档或 UI 中标注导出文件不应被视作安全加密文件
- 使用用户自定义密码、系统密钥链或随机 per-export secret 替代硬编码密码
- 如已有发布版本受影响，应考虑安全公告或修复版本

---

### 3.2 模型目录刷新反映多 Provider 生态维护压力

- [PR #2859 feat(models): refresh built-in provider model catalogs](https://github.com/netease-youdao/LobsterAI/pull/2859)  
  **状态：OPEN**  
  **作者：** nbjoe

该 PR 计划更新 6 个内置 Provider 的默认模型清单，包括：

- DeepSeek
- Moonshot
- Qwen
- Zhipu
- MiniMax
- Xiaomi

同时还包含本地配置迁移逻辑，用于删除已下线模型 ID、注入新的模型 ID。

**背后诉求：**

- 内置模型清单需要跟随各厂商 API 文档快速变化
- 用户希望开箱即用地看到最新可用模型
- 对已有用户而言，模型 ID 迁移需要兼顾兼容性与稳定性

该 PR 虽无评论，但从功能影响看，是近期较重要的可合并候选。

---

## 4. Bug 与稳定性

### 严重级别：高

#### 4.1 Provider API Key 导出存在潜在凭证泄露风险

- [Issue #2851](https://github.com/netease-youdao/LobsterAI/issues/2851)  
  **状态：OPEN**  
  **是否已有 fix PR：** 未在今日数据中发现明确对应修复 PR

**问题描述：**  
Provider 导出功能使用 AES-GCM 加密 API Key，但加密密钥由公开硬编码密码派生。攻击者只要拿到导出文件，即可根据代码中的固定密码还原 API Key。

**影响范围：**

- 使用 “Export Providers” 功能导出的文件
- 配置了第三方模型 Provider API Key 的用户
- 通过云盘、聊天工具、工单附件、团队共享等方式传播过导出文件的场景

**风险判断：**

- 机密性风险：高
- 利用门槛：低
- 用户感知：低，用户可能误以为导出文件已安全加密
- 优先级：应尽快修复

---

### 严重级别：中

#### 4.2 TTS 朗读速度在分段播放时回退到 1×

- [PR #2861](https://github.com/netease-youdao/LobsterAI/pull/2861)  
  **状态：CLOSED**  
  **是否已有 fix PR：** 是，即 PR #2861  
  **是否已合并：** 当前数据无法确认

**问题描述：**  
在桌面伴侣的 TTS/read-aloud 场景中，用户选择较快朗读速度后，下一句加载时可能恢复为默认 1×，导致连续朗读体验不一致。

**影响场景：**

- 长文本朗读
- 分句 TTS 播放
- 缓存音频重放
- 延迟音频加载

**修复方向：**  
同时维护 `defaultPlaybackRate` 与 `playbackRate`，避免媒体元素在切换音频源或加载新片段时丢失用户设置。

---

### 严重级别：低至中

#### 4.3 多项依赖升级可能带来兼容性风险

今日 Dependabot 提交了多项依赖升级 PR：

- [PR #2858 chore(deps): bump mermaid from 10.9.8 to 12.1.0](https://github.com/netease-youdao/LobsterAI/pull/2858)
- [PR #2857 chore(deps): bump @nodesecure/js-x-ray from 14.3.0 to 16.2.0](https://github.com/netease-youdao/LobsterAI/pull/2857)
- [PR #2856 chore(deps): bump @univerjs/find-replace from 1.0.2 to 1.0.3](https://github.com/netease-youdao/LobsterAI/pull/2856)
- [PR #2855 chore(deps): bump katex from 0.16.47 to 0.19.0](https://github.com/netease-youdao/LobsterAI/pull/2855)
- [PR #2854 chore(deps): bump @univerjs/sheets-data-validation-ui from 1.0.2 to 1.0.3](https://github.com/netease-youdao/LobsterAI/pull/2854)
- [PR #2853 chore(deps): bump @univerjs/drawing-ui from 1.0.2 to 1.0.3](https://github.com/netease-youdao/LobsterAI/pull/2853)
- [PR #2852 chore(deps-dev): bump the electron group with 2 updates](https://github.com/netease-youdao/LobsterAI/pull/2852)

其中需要重点关注：

- **Mermaid 10.9.8 → 12.1.0**：大版本升级，可能影响图表渲染、语法兼容性和安全策略。
- **KaTeX 0.16.47 → 0.19.0**：数学公式渲染升级，需验证 Markdown、文档、AI 输出中的公式展示。
- **Electron 43.5.0 → 44.7.0**：桌面端基础运行环境升级，可能影响窗口行为、权限、安全策略、打包兼容性。
- **electron-builder 升级**：可能影响安装包生成、签名、平台分发流程。

---

## 5. 功能请求与路线图信号

今日没有新的明确“功能请求型 Issue”，但从 PR 变化可以观察到以下路线图信号。

### 5.1 桌面伴侣正在成为重点方向

相关 PR：

- [PR #2860 feat: desktop companion](https://github.com/netease-youdao/LobsterAI/pull/2860)
- [PR #2861 fix(desktop-companion): preserve TTS playback speed across segments](https://github.com/netease-youdao/LobsterAI/pull/2861)

桌面伴侣功能涉及 renderer、main、cowork、build、docs 和 Windows 平台，说明该功能不是单点 UI 改动，而是面向桌面端使用场景的系统性能力扩展。

**可能进入下一版本的内容：**

- 桌面伴侣入口或常驻能力
- TTS/read-aloud 体验增强
- Windows 平台体验优化
- 与 cowork 或主进程能力的更深集成

---

### 5.2 内置模型 Provider 清单维护将持续增强

相关 PR：

- [PR #2859 feat(models): refresh built-in provider model catalogs](https://github.com/netease-youdao/LobsterAI/pull/2859)

该 PR 反映出 LobsterAI 正在维护多家模型服务商的默认模型配置，并尝试为已有用户做本地迁移。

**可能进入下一版本的内容：**

- DeepSeek、Moonshot、Qwen、Zhipu、MiniMax、Xiaomi 等 Provider 的新模型 ID
- 已下线模型 ID 清理
- 已有用户配置自动迁移
- 新模型能力标注，例如视觉、思考、长上下文等

---

### 5.3 依赖升级可能为后续功能和安全打基础

相关 PR：

- [PR #2852](https://github.com/netease-youdao/LobsterAI/pull/2852)
- [PR #2855](https://github.com/netease-youdao/LobsterAI/pull/2855)
- [PR #2858](https://github.com/netease-youdao/LobsterAI/pull/2858)

Electron、Mermaid、KaTeX 等依赖升级可能并非直接面向用户的新功能，但对桌面应用安全、渲染能力、内容展示能力和后续维护都有基础性价值。

---

## 6. 用户反馈摘要

今日 Issue 评论数据较少，未出现多轮用户讨论。可从新增 Issue 与 PR 摘要中提炼出以下用户痛点。

### 6.1 用户对 API Key 导出安全性的预期较高

相关 Issue：

- [Issue #2851](https://github.com/netease-youdao/LobsterAI/issues/2851)

用户反馈的核心痛点是：导出 Provider 配置时，用户可能认为 API Key 已被安全加密，但实际使用硬编码公开密码后，加密保护几乎失效。  
这类问题会直接影响用户对项目安全性的信任，尤其是在企业用户、团队共享配置、多设备迁移等场景中。

**典型使用场景：**

- 备份个人 Provider 配置
- 在多台设备之间迁移 API Key
- 团队成员共享模型服务配置
- 将配置文件作为附件发送给他人排查问题

**不满意点：**

- 安全机制与用户预期不一致
- 加密实现存在可预测密钥
- 缺少明显的风险提示

---

### 6.2 桌面伴侣朗读体验需要连续一致

相关 PR：

- [PR #2861](https://github.com/netease-youdao/LobsterAI/pull/2861)

从修复内容看，用户在使用 TTS 朗读时，希望播放速度设置能够跨句子、跨音频片段保持一致。  
如果每切换一句就回到 1×，会造成明显割裂感，尤其影响长文本阅读、学习、办公辅助等场景。

**典型使用场景：**

- 长文章朗读
- AI 回复朗读
- 桌面伴侣语音播报
- 快速听取摘要或文档内容

---

## 7. 待处理积压

当前数据未提供长期未响应 Issue/PR 的完整列表，因此无法判断真正意义上的“长期积压”。但从过去 24 小时看，以下待处理项具有较高关注价值。

### 7.1 高优先级安全 Issue 待响应

- [Issue #2851 Provider API Key Exports Use a Public Hardcoded Password](https://github.com/netease-youdao/LobsterAI/issues/2851)  
  **状态：OPEN**  
  **优先级建议：P0/P1**

建议维护者优先处理该 Issue，至少完成：

1. 复现与影响范围确认  
2. 临时安全提示  
3. 修复方案设计  
4. 对历史导出文件的风险说明  
5. 必要时发布安全修复版本

---

### 7.2 模型目录刷新 PR 待评审

- [PR #2859 feat(models): refresh built-in provider model catalogs](https://github.com/netease-youdao/LobsterAI/pull/2859)  
  **状态：OPEN**  
  **优先级建议：P1/P2**

该 PR 对用户直接可见，能够改善 Provider 默认模型列表的准确性。  
建议重点审查：

- 各 Provider 模型 ID 是否与官方文档一致
- 已下线模型删除是否可能破坏用户已有配置
- 本地迁移逻辑是否具备幂等性
- 模型能力标注是否准确

---

### 7.3 Electron 与桌面端基础依赖升级待验证

- [PR #2852 chore(deps-dev): bump the electron group with 2 updates](https://github.com/netease-youdao/LobsterAI/pull/2852)  
  **状态：OPEN**  
  **优先级建议：P2**

Electron 升级影响桌面端运行环境，建议在合并前覆盖：

- Windows 启动与窗口行为
- 自动更新或安装包流程
- 主进程/渲染进程通信
- 权限、安全策略与沙箱行为
- 打包产物体积和签名流程

---

### 7.4 内容渲染依赖升级待回归测试

- [PR #2858 mermaid 10.9.8 → 12.1.0](https://github.com/netease-youdao/LobsterAI/pull/2858)  
- [PR #2855 katex 0.16.47 → 0.19.0](https://github.com/netease-youdao/LobsterAI/pull/2855)

建议重点验证：

- AI 回复中的 Mermaid 图表渲染
- Markdown 文档预览
- 数学公式渲染
- 暗色模式兼容性
- XSS 或 HTML 注入相关安全行为变化

---

## 总体健康度评估

**活跃度：高**  
过去 24 小时有 10 条 PR 更新，说明项目维护与自动化依赖管理较活跃。

**稳定性：中等**  
TTS 回归问题已有修复迹象，但大量依赖升级仍需充分测试，尤其是 Electron、Mermaid、KaTeX 等基础组件。

**安全健康度：需关注**  
Provider API Key 导出安全问题影响敏感凭证，且目前未见对应修复 PR，应作为今日最高优先级处理。

**路线图清晰度：中高**  
桌面伴侣、多 Provider 模型维护、桌面端依赖升级是当前最明显的演进方向。项目正在向更完整的个人 AI 助手与桌面端智能体形态推进。

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

# CoPaw 项目动态日报｜2026-10-14

> 数据源中的 Issue/PR 链接指向 `agentscope-ai/QwenPaw`，以下日报按提供数据整理。

---

## 1. 今日速览

过去 24 小时 CoPaw / QwenPaw 相关仓库保持较高活跃度：共有 **7 条 Issue 更新**、**17 条 PR 更新**，其中 **6 个 PR 已关闭或完成处理**，**11 个 PR 仍待合并**。今日没有新版本发布，工作重心集中在 **Console 稳定性、工具链兼容性、插件能力、运行时恢复与聊天历史性能问题**。  
从信号看，项目正处于较密集的修复与能力扩展阶段：一方面有多个用户报告真实生产/本地使用中的阻塞问题，另一方面也有较大体量的新能力 PR，例如实验性 Python Code Mode、插件内联聊天渲染 API、主机级导航策略等。整体健康度较好，但短期内需要优先处理 **聊天历史膨胀、ACP 插件不可用、cron 被热重载取消、默认模型废弃** 等影响用户可用性的 Bug。

---

## 2. 项目进展

今日无新版本发布，但有多项重要 PR 完成或进入关闭状态，主要推进了 Console 稳定性、UI/UX 基础、依赖升级与交互体验修复。

### 已关闭 / 已完成的重要 PR

- [#8217 feat(console): establish UIUX foundation](https://github.com/agentscope-ai/QwenPaw/pull/8217)  
  推进 Console UI/UX 基础设施建设，包括路由元数据、页面标题、Page Shell、Push 轮询策略优化，以及懒加载 warning 降噪。  
  **影响**：提升 Console 可维护性与用户体验，为后续页面体系和插件兼容打基础。

- [#8219 fix(console): stabilize chunk recovery and reload allowance](https://github.com/agentscope-ai/QwenPaw/pull/8219)  
  修复本地服务暂时不可达时，恢复逻辑可能过早刷新并耗尽自动 reload 配额的问题。  
  **影响**：提升 Console 在本地服务波动场景下的恢复稳定性。

- [#8221 fix(console): bound background polling and unblock model picker](https://github.com/agentscope-ai/QwenPaw/pull/8221)  
  限制后台轮询重入，避免慢运行时下请求堆积，同时解除模型选择器被 provider/model 状态阻塞的问题。  
  **影响**：改善慢环境下 Console 响应性，减少交互请求被后台请求拖慢的情况。

- [#8214 fix(console): allow users to interrupt message navigation](https://github.com/agentscope-ai/QwenPaw/pull/8214)  
  升级 `@agentscope-ai/chat`，允许用户通过滚轮等输入中断消息导航滚动。  
  **影响**：改善长对话中的可控性和交互体验。关联修复 [#8186](https://github.com/agentscope-ai/QwenPaw/issues/8186)。

- [#8220 chore(deps): bumping version of agentscope to 2.0.10](https://github.com/agentscope-ai/QwenPaw/pull/8220)  
  更新 `agentscope` 依赖版本至 2.0.10。  
  **影响**：依赖层面跟进上游，可能包含兼容性或稳定性收益。

- [#8237 feat(plugins): add inline chat rendering and submission APIs](https://github.com/agentscope-ai/QwenPaw/pull/8237)  
  新增插件侧的 `chat.codeBlock`、`chat.submit`、`host.openExternalLink` 等 API，使插件可渲染特定 fenced block，并通过现有聊天队列提交上下文相关 follow-up。  
  **影响**：显著增强插件与聊天界面的集成能力。不过该 PR 当前状态为 closed，需确认是已合并还是被关闭替代。

### 今日整体推进评估

- **PR 处理量高**：17 条 PR 更新，说明维护与贡献活动活跃。
- **稳定性修复占比高**：Console 轮询、恢复、导航、工具文件处理、模型上下文等均有修复。
- **能力扩展明显**：插件 API、Python Code Mode、主机导航策略等显示项目正在扩展复杂部署与高级 Agent 编排能力。
- **风险点**：仍有 11 个待合并 PR，其中部分直接对应用户报告的严重 Bug，建议优先 review 和合并。

---

## 3. 社区热点

今日所有新 Issue 的评论数均为 1，点赞数为 0，社区互动尚处于早期反馈阶段；但从内容看，若干问题具有较强的产品方向信号。

### 1. 聊天历史膨胀导致 30 秒超时

- Issue：[ #8228 Chat history bloat — file & screenshot tool outputs stored as base64 inside tool_result ](https://github.com/agentscope-ai/QwenPaw/issues/8228)  
- Fix PR：[ #8229 fix(chat): truncate oversized tool outputs when serving chat history ](https://github.com/agentscope-ai/QwenPaw/pull/8229)

用户报告文件与截图工具输出以 base64 形式持久化在 `tool_result` 中，导致长会话响应超过 10 MB，并稳定触发 Console 30 秒超时。  
**背后诉求**：用户需要长会话、文件传输、截图等工具调用在真实使用中可持续，不希望历史记录成为性能瓶颈。  
**状态**：已有修复 PR，且处于 Under Review，建议优先合并。

### 2. ACP 会话无法加载已安装插件

- Issue：[ #8222 qwenpaw acp never loads installed plugins ](https://github.com/agentscope-ai/QwenPaw/issues/8222)

用户指出 `qwenpaw acp` 服务未实例化 `PluginLoader`，导致 ACP-hosted sessions 中无法加载插件提供的工具，跨进程任务回调也无法唤醒相关能力。  
**背后诉求**：ACP 场景下应与常规运行模式具备一致的插件工具能力。  
**影响面**：对依赖插件工具、跨进程任务回调、Agent 间协作的用户影响较大。  
**状态**：当前数据中未见直接修复 PR。

### 3. 实验性 Python Code Mode

- PR：[ #8224 feat: add experimental Python Code Mode ](https://github.com/agentscope-ai/QwenPaw/pull/8224)

该 PR 体量为 XXL，目标是将 Code Mode 重构为实验性 Python 工具编排接口，模型可通过 `run_code` 调用 Python worker，并在代码中使用 `await tools.<name>()` 调用原生工具。  
**背后诉求**：用户希望 Agent 不只是调用单个工具，而是能通过代码进行多步骤工具编排。  
**产品信号**：这是面向高级 Agent 自动化与复杂任务执行的重要能力，可能成为后续版本重点。

### 4. 主机级导航策略 / 定制部署需求

- Issue：[ #8223 Optional host navigation policy shared by sidebar and settings ](https://github.com/agentscope-ai/QwenPaw/issues/8223)  
- PR：[ #8230 feat(console): add optional host navigation allowlist ](https://github.com/agentscope-ai/QwenPaw/pull/8230)

用户希望部署方可以在首屏渲染前应用统一导航策略，使侧边栏与设置页使用同一套 allowlist。  
**背后诉求**：面向企业、托管版、定制化部署时，需要隐藏或限制部分 Console 功能。  
**状态**：已有对应 PR，且由首次贡献者提交，具备较高纳入下一版本的可能性。

---

## 4. Bug 与稳定性

以下按影响程度排序。

### 高优先级

#### 1. 聊天历史体积过大导致 Console 超时

- Issue：[ #8228 ](https://github.com/agentscope-ai/QwenPaw/issues/8228)  
- Fix PR：[ #8229 ](https://github.com/agentscope-ai/QwenPaw/pull/8229)  
- 严重程度：高  
- 影响：长对话、文件发送、截图工具调用后，历史记录可能超过 10 MB，导致 30 秒请求超时。  
- 当前状态：已有修复 PR，建议优先 review / merge。  
- 备注：该问题直接影响聊天可用性和工具调用后的持续会话能力。

#### 2. ACP 模式不加载已安装插件

- Issue：[ #8222 ](https://github.com/agentscope-ai/QwenPaw/issues/8222)  
- 严重程度：高  
- 影响：ACP-hosted sessions 中插件工具缺失，跨进程任务回调无法唤醒插件相关能力。  
- 当前状态：未见直接修复 PR。  
- 建议：优先确认 ACP 与普通运行模式的插件加载路径差异，并补充回归测试。

#### 3. 热重载取消正在运行的 cron 任务且无提示

- Issue：[ #8225 ](https://github.com/agentscope-ai/QwenPaw/issues/8225)  
- 严重程度：高  
- 影响：在 Console 保存心跳设置等配置时触发“零停机热重载”，正在运行的 cron 任务会被取消并标记为 `cancelled`，用户无明显提示。  
- 当前状态：未见直接修复 PR。  
- 建议：需要明确热重载与任务生命周期边界，至少增加保护、提示或重试机制。

#### 4. 默认模型已废弃导致默认 Agent 无法正常使用

- Issue：[ #8218 ](https://github.com/agentscope-ai/QwenPaw/issues/8218)  
- 严重程度：高  
- 影响：默认模型 `mimo-v2.5-free` 已废弃，用户遇到 `MODEL_EXECUTION_ERROR`，提示应使用 `mimo-v2.6-flash-free`。  
- 当前状态：未见直接修复 PR。  
- 建议：更新默认模型配置，并考虑在模型废弃时提供自动迁移或清晰提示。

### 中优先级

#### 5. Hub 重启后运行时未自动恢复，cron 可能错过执行

- PR：[ #8216 fix(hub): restore running runtimes on startup ](https://github.com/agentscope-ai/QwenPaw/pull/8216)  
- 严重程度：中高  
- 影响：Hub 重启后，原本应运行的 Local runtime 可能保持停止状态，导致启用的 cron job 错过执行。  
- 当前状态：已有待合并 PR。

#### 6. Ollama 上下文窗口错误使用 128k 默认值

- PR：[ #8236 fix(ollama): size context window from num_ctx instead of 128k default ](https://github.com/agentscope-ai/QwenPaw/pull/8236)  
- 严重程度：中  
- 影响：本地 Ollama 模型实际截断由 `num_ctx` 决定，而不是云端模型族默认窗口。错误估算可能导致上下文管理失准。  
- 当前状态：已有待合并 PR。

#### 7. 文件工具在 Windows / 中文环境下的编码与换行问题

- PR：[ #8234 fix(tools): decode GBK/CP936 in read/edit/grep instead of dropping bytes ](https://github.com/agentscope-ai/QwenPaw/pull/8234)  
- PR：[ #8235 fix(tools): preserve CRLF line endings in edit_file ](https://github.com/agentscope-ai/QwenPaw/pull/8235)  
- 严重程度：中  
- 影响：中文 Windows 常见 GBK/CP936 文件可能被 UTF-8 `errors="ignore"` 静默丢字节；CRLF 文件经 `edit_file` 后可能被整体改写为 LF。  
- 当前状态：均已有待合并 PR。  
- 价值：明显改善 Windows 用户与中文文本处理体验。

#### 8. 缺失 agent.json 时 fallback 配置丢失 active_model 与 heartbeat

- PR：[ #8226 fix(config): keep active_model and heartbeat when rebuilding a missing agent.json ](https://github.com/agentscope-ai/QwenPaw/pull/8226)  
- 严重程度：中  
- 影响：重建缺失的 agent 配置时，可能丢失 active model 和 heartbeat 设置。  
- 当前状态：已有待合并 PR。

#### 9. Console 中 workspace 外 HTML 文件“Open in browser”静默失败

- PR：[ #8227 fix(console): stop Open in browser from failing silently outside the workspace ](https://github.com/agentscope-ai/QwenPaw/pull/8227)  
- 严重程度：中低  
- 影响：用户点击按钮无反馈，误以为功能损坏。  
- 当前状态：已有待合并 PR。

#### 10. LM Studio 拒绝音频输入场景处理

- PR：[ #8215 fix(agents): recognize LM Studio at-most-zero audio rejection ](https://github.com/agentscope-ai/QwenPaw/pull/8215)  
- 严重程度：中  
- 影响：历史中的 audio `DataBlock` 被序列化为 `input_audio`，LM Studio 音频输入上限为 0 时会 400 报错。  
- 当前状态：已有待合并 PR。

---

## 5. 功能请求与路线图信号

### 1. 增加 CommandCode 与 Hugging Face Inference Providers 内置 Provider 预设

- Issue：[ #8233 Add built-in provider presets for CommandCode and Hugging Face ](https://github.com/agentscope-ai/QwenPaw/issues/8233)  
- 类型：功能请求  
- 用户诉求：这两个 OpenAI-compatible gateway 目前只能作为 custom provider 添加，缺少官方预设与图标。  
- 路线图信号：Provider catalog 正在成为用户体验关键入口。若维护成本较低，该需求适合纳入小版本。

### 2. 主机级导航 allowlist / curated deployment

- Issue：[ #8223 ](https://github.com/agentscope-ai/QwenPaw/issues/8223)  
- PR：[ #8230 ](https://github.com/agentscope-ai/QwenPaw/pull/8230)  
- 类型：部署定制能力  
- 用户诉求：在托管、企业或特定场景部署时，希望统一控制 Console 导航项，而不是依赖插件加载后再修改菜单。  
- 纳入可能性：高。已有 PR 实现，且与静态 Settings 页面和首屏渲染一致性相关。

### 3. 实验性 Python Code Mode

- PR：[ #8224 ](https://github.com/agentscope-ai/QwenPaw/pull/8224)  
- 类型：核心能力扩展  
- 用户诉求：让模型通过 Python 编排工具调用，提升复杂任务自动化能力。  
- 纳入可能性：中高，但因 PR 体量 XXL，建议分阶段 review，先以 experimental flag 发布。

### 4. 插件内联聊天渲染与 scoped follow-up

- PR：[ #8237 ](https://github.com/agentscope-ai/QwenPaw/pull/8237)  
- 类型：插件系统增强  
- 用户诉求：插件不仅能替换整条 assistant bubble，也能渲染特定 fenced block，并提交局部上下文 follow-up。  
- 纳入可能性：不确定。PR 已 closed，需确认是合并完成、关闭重做，还是设计仍有分歧。

### 5. 免费托管 QwenPaw / README 链接请求

- Issue：[ #8232 Free hosted QwenPaw for your users ](https://github.com/agentscope-ai/QwenPaw/issues/8232)  
- 类型：社区/生态合作请求  
- 用户诉求：请求在 README 中加入第三方免费托管入口。  
- 路线图信号：说明存在“免安装、免 API key、云端运行”的使用需求。  
- 风险点：涉及第三方托管、账号登录、资源承诺和信任边界，建议维护者审慎评估安全、隐私、品牌背书与长期可用性。

---

## 6. 用户反馈摘要

从今日 Issues 可提炼出以下真实使用痛点：

1. **长会话与工具输出的可扩展性不足**  
   用户已经在使用文件发送、截图等工具进行较长会话，但历史记录中保存 base64 原始内容导致响应膨胀，最终影响 Console 可用性。  
   相关链接：[ #8228 ](https://github.com/agentscope-ai/QwenPaw/issues/8228)、[ #8229 ](https://github.com/agentscope-ai/QwenPaw/pull/8229)

2. **自动化任务需要更可靠的生命周期保障**  
   cron 任务被热重载取消、Hub 重启后 runtime 未恢复，说明用户在依赖 CoPaw / QwenPaw 执行持续性任务，而不仅是临时聊天。  
   相关链接：[ #8225 ](https://github.com/agentscope-ai/QwenPaw/issues/8225)、[ #8216 ](https://github.com/agentscope-ai/QwenPaw/pull/8216)

3. **插件生态的一致性非常关键**  
   ACP 模式不加载插件会破坏用户对插件工具的预期，也影响跨进程回调与多 Agent 协作。  
   相关链接：[ #8222 ](https://github.com/agentscope-ai/QwenPaw/issues/8222)

4. **本地模型与第三方 OpenAI-compatible Provider 的兼容性仍需加强**  
   Ollama、LM Studio、CommandCode、Hugging Face Inference Providers 等需求表明用户正在大量使用非官方云模型或本地模型。  
   相关链接：[ #8236 ](https://github.com/agentscope-ai/QwenPaw/pull/8236)、[ #8215 ](https://github.com/agentscope-ai/QwenPaw/pull/8215)、[ #8233 ](https://github.com/agentscope-ai/QwenPaw/issues/8233)

5. **Windows 与中文环境用户体验需要持续改善**  
   GBK/CP936 解码、CRLF 保留等问题说明工具链需要更好适配中文 Windows 开发者和办公文件场景。  
   相关链接：[ #8234 ](https://github.com/agentscope-ai/QwenPaw/pull/8234)、[ #8235 ](https://github.com/agentscope-ai/QwenPaw/pull/8235)

6. **默认配置应避免“开箱即失败”**  
   默认模型已废弃导致默认 Agent 无法使用，这是明显的新用户阻塞点。  
   相关链接：[ #8218 ](https://github.com/agentscope-ai/QwenPaw/issues/8218)

---

## 7. 待处理积压

基于今日数据，未发现“长期未响应”的历史积压项；但当前有 **11 个开放 PR** 和 **7 个开放 Issue**，其中多项具备较高优先级，建议维护者重点关注以下队列。

### 建议优先处理的开放 Issue

- [#8228 Chat history bloat](https://github.com/agentscope-ai/QwenPaw/issues/8228)  
  已有修复 PR [#8229](https://github.com/agentscope-ai/QwenPaw/pull/8229)，建议优先合并。

- [#8222 ACP plugins not loaded](https://github.com/agentscope-ai/QwenPaw/issues/8222)  
  暂未见直接修复 PR，影响 ACP 插件生态一致性。

- [#8225 Hot reload cancels cron tasks](https://github.com/agentscope-ai/QwenPaw/issues/8225)  
  影响自动化任务可靠性，建议尽快确认是否可复现并设计保护机制。

- [#8218 Default model deprecated](https://github.com/agentscope-ai/QwenPaw/issues/8218)  
  影响新用户默认 Agent 可用性，建议快速修复默认配置。

### 建议优先 review 的开放 PR

- [#8229 fix(chat): truncate oversized tool outputs](https://github.com/agentscope-ai/QwenPaw/pull/8229)  
  直接对应高影响 Bug。

- [#8216 fix(hub): restore running runtimes on startup](https://github.com/agentscope-ai/QwenPaw/pull/8216)  
  保障 cron 与 runtime 恢复能力。

- [#8234 fix(tools): decode GBK/CP936](https://github.com/agentscope-ai/QwenPaw/pull/8234)  
  改善中文 Windows 文件处理。

- [#8235 fix(tools): preserve CRLF line endings](https://github.com/agentscope-ai/QwenPaw/pull/8235)  
  避免编辑工具产生不必要的大范围 diff。

- [#8236 fix(ollama): size context window from num_ctx](https://github.com/agentscope-ai/QwenPaw/pull/8236)  
  改善本地模型上下文管理准确性。

- [#8230 feat(console): add optional host navigation allowlist](https://github.com/agentscope-ai/QwenPaw/pull/8230)  
  与定制部署需求直接对应，功能边界相对清晰。

---

## 总体健康度判断

今日项目活跃度高，贡献者覆盖面较广，并出现首次贡献者 PR，说明社区参与度在增长。技术方向上，项目同时推进 **稳定性修复、插件系统增强、Console 体验改进、本地模型兼容、自动化任务可靠性**，路线健康且贴近真实用户场景。  
短期最大风险在于：多个高影响 Bug 仍处于开放状态，尤其是 **聊天历史超时、ACP 插件缺失、cron 被热重载取消、默认模型废弃**。如果这些问题能在下一轮维护中快速合并修复，项目整体可用性和用户信任度将明显提升。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报  
**日期：2026-10-14**  
**仓库：** [zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## 1. 今日速览

过去 24 小时，ZeroClaw 保持较高开发活跃度：共有 **5 条 Issue 更新**、**14 条 PR 更新**，其中 **12 条 PR 仍待合并**，**2 条 PR 已关闭/结束处理**。  
今日没有新版本发布，说明当前工作主要集中在 **缺陷修复、运行时稳定性、工具链安全、Provider/协议扩展，以及 ZeroCode 体验改进** 上。  
从 PR 分布看，项目正在同时推进多个关键方向：运行时对话控制、网关/WebSocket/SSE 生命周期、Tailscale tunnel 可靠性、A2A 协议模块化、模型 Provider 扩展和依赖安全治理。  
整体健康度较好：维护活动密集、问题定位具体，但也出现了多个涉及 **会话持久化、网关 reload、流式请求取消、Telegram 更新遗漏** 的稳定性信号，建议维护者优先处理 S2/S3 级别 Bug 与高风险 PR。

---

## 2. 项目进展

今日无新版本发布，但有若干重要 PR 推动了项目向前演进。

### 安全与依赖治理

- [PR #11715](https://github.com/zeroclaw-labs/zeroclaw/pull/11715)  
  **fix(deps): remove vulnerable ruzstd through probe-rs 0.32**  
  状态：**CLOSED**  
  该 PR 针对 `RUSTSEC-2026-0344`，尝试通过升级 `probe-rs` 相关依赖移除存在 decompression bomb 风险的 `ruzstd 0.8.3`。  
  虽然该 PR 已关闭，但其主题非常关键：安全扫描已发现高危依赖链问题。

- [PR #11714](https://github.com/zeroclaw-labs/zeroclaw/pull/11714)  
  **chore(deps): bump probe-rs to 0.32 to drop vulnerable ruzstd from the lockfile**  
  状态：**CLOSED**  
  同样围绕 `ruzstd` 安全风险展开，目标是通过升级 `probe-rs` 至 `0.32` 从 `Cargo.lock` 中移除受影响版本。  
  这两条关闭 PR 表明维护者正在处理安全门禁失败问题，但从数据中无法确认最终是否已成功合并到主线。

### 运行时与 Agent 控制流改进

- [PR #11725](https://github.com/zeroclaw-labs/zeroclaw/pull/11725)  
  **fix(runtime): deliver mid-turn steering at the next step, not after the final answer**  
  状态：**OPEN**  
  该 PR 修复 `session/steer` 在 Agent 正执行工具调用时无法及时送达模型的问题。此前中途 steering 信息可能要到最终回答后才被模型看到，若 turn 被取消则消息丢失。  
  这是对 Agent 可控性的重要改进，尤其影响长任务、多工具链调用和人机协同中途干预场景。

- [PR #11720](https://github.com/zeroclaw-labs/zeroclaw/pull/11720)  
  **fix(tools): expose scenario routing requirements**  
  状态：**OPEN**  
  该 PR 强化 `model_routing_config` 选择 `upsert_scenario` 时的 schema 要求，将 `hint`、`model_provider`、`model` 标记为必填非空字符串。  
  这有助于减少工具调用参数不完整导致的运行时错误。

### 网关、Tunnel 与流式生命周期

- [PR #11726](https://github.com/zeroclaw-labs/zeroclaw/pull/11726)  
  **fix(tunnel): supervise and verify the tailscale gateway serve process**  
  状态：**OPEN**  
  修复 `tailscale serve|funnel --https=443` 子进程启动后无人监管的问题。此前如果端口被占用或 serve 配置丢失，子进程可能退出而系统未感知。  
  该 PR 对远程访问、Tailscale Gateway 和部署可靠性有直接价值。

- [PR #11718](https://github.com/zeroclaw-labs/zeroclaw/pull/11718)  
  **fix(gateway): keep a streamed webhook turn running when its SSE client disconnects**  
  状态：**OPEN**，带有 `risk:high`、`needs-author-action` 标签  
  该 PR 试图修复流式 webhook 请求中，SSE 客户端断开会直接取消 turn 的问题。  
  对 webhook 集成、异步 Agent 执行和外部系统接入非常重要，但高风险标签意味着仍需仔细审查生命周期、取消语义和资源释放逻辑。

### ZeroCode 体验与会话恢复

- [PR #11727](https://github.com/zeroclaw-labs/zeroclaw/pull/11727)  
  **feat(zerocode): reopen open sessions when zerocode restarts**  
  状态：**OPEN**  
  该 PR 让 ZeroCode 重启后能够恢复此前打开的 session 列表。此前 daemon 保留 transcript，但 ZeroCode 侧边栏中的打开会话仅存在内存中，退出后丢失。  
  这是对终端用户体验的明显增强，尤其适用于多会话、长时间工作流和 TUI 常驻使用场景。

### Provider、协议与架构演进

- [PR #11721](https://github.com/zeroclaw-labs/zeroclaw/pull/11721)  
  **feat(providers): add Standard Compute model provider**  
  状态：**OPEN**  
  增加 Standard Compute 作为 OpenAI-compatible provider，并注册配置 schema。  
  该 PR 显示 ZeroClaw 仍在扩展多模型供应商生态。

- [PR #11712](https://github.com/zeroclaw-labs/zeroclaw/pull/11712)  
  **feat(a2a): extract A2A protocol core into a dedicated zeroclaw-a2a crate**  
  状态：**OPEN**，`size:XL`  
  将 A2A 协议核心从 `zeroclaw-api` / `zeroclaw-tools` / `zeroclaw-gateway` 中抽离到独立 `zeroclaw-a2a` crate。  
  这是架构层面的重构，有助于明确协议归属、降低重复实现和提升长期可维护性。

---

## 3. 社区热点

从数据看，今日 Issues 和 PR 的评论数、点赞数均较低，暂无明显“高互动讨论”。不过，若按影响范围和维护优先级看，以下主题具备较高社区信号。

### 1. ZeroCode 会话管理体验

- [Issue #11724](https://github.com/zeroclaw-labs/zeroclaw/issues/11724)  
  **feat(zerocode): make the per-pane session cap configurable**
- [PR #11727](https://github.com/zeroclaw-labs/zeroclaw/pull/11727)  
  **feat(zerocode): reopen open sessions when zerocode restarts**

用户诉求集中在 ZeroCode 的多会话工作流：  
当前每个 pane 最多跟踪 8 个 sessions，且 session 打开状态此前无法跨重启恢复。对于重度用户而言，这会限制并行上下文管理能力。  
PR #11727 已在推进“重启后恢复打开 sessions”，Issue #11724 则提出进一步将 per-pane session cap 配置化。这说明 ZeroCode 正从简单 TUI 客户端走向更长期、多会话、工作台式使用场景。

### 2. 网关与长连接生命周期

- [Issue #11709](https://github.com/zeroclaw-labs/zeroclaw/issues/11709)  
  **Other upgraded sockets outlive a gateway reload and keep serving a retired instance**
- [PR #11718](https://github.com/zeroclaw-labs/zeroclaw/pull/11718)  
  **fix(gateway): keep a streamed webhook turn running when its SSE client disconnects**

这组问题反映出 gateway 在 reload、SSE、WebSocket 等长连接场景下的生命周期边界仍需加强。  
背后的核心诉求是：用户希望在 reload、断连、客户端异常退出时，系统能够有明确、可预期的行为，而不是让旧实例继续服务或误取消正在执行的任务。

### 3. 运行时对话持久化与上下文裁剪

- [Issue #11711](https://github.com/zeroclaw-labs/zeroclaw/issues/11711)  
  **trimming a long conversation permanently deletes its older turns from the session store**

这是今日最值得关注的稳定性问题之一。用户报告长对话超过上下文预算后，历史裁剪会被持久化写回 transcript，导致旧 turns 永久丢失。  
该问题触及 Agent 产品的核心信任点：会话历史不应因上下文窗口管理而被不可逆删除。

---

## 4. Bug 与稳定性

以下按严重程度和潜在影响排序。

### S2：长对话裁剪导致历史永久丢失

- [Issue #11711](https://github.com/zeroclaw-labs/zeroclaw/issues/11711)  
  **[Bug]: trimming a long conversation permanently deletes its older turns from the session store**  
  组件：`runtime/daemon`，`zeroclaw-infra/src/session_sqlite.rs`  
  严重程度：**S2 - degraded behavior**  
  当前状态：**OPEN**  
  已知 fix PR：数据中未发现明确关联 PR。

**影响分析：**  
当 gateway conversation 超过上下文预算时，系统会裁剪历史；但当前实现似乎会通过 `rewrite_messages_on` 将裁剪后的 transcript 写回持久化存储，导致旧消息永久消失。  
这会破坏用户对 session store 的预期，也影响审计、回溯和长期记忆能力。

---

### 高风险：流式 webhook 客户端断开导致 turn 被取消

- [PR #11718](https://github.com/zeroclaw-labs/zeroclaw/pull/11718)  
  **fix(gateway): keep a streamed webhook turn running when its SSE client disconnects**  
  状态：**OPEN**，`risk:high`，`needs-author-action`

**影响分析：**  
在 `POST /api/webhook` 使用 `stream: true` 和 `Accept: text/event-stream` 时，客户端断开响应体会导致 turn 取消。  
对集成方来说，这意味着网络波动或前端断连可能错误中止 Agent 后台执行。该 PR 已在修复，但仍需作者进一步处理。

---

### 中高影响：gateway reload 后旧 WebSocket 继续服务旧实例

- [Issue #11709](https://github.com/zeroclaw-labs/zeroclaw/issues/11709)  
  **Other upgraded sockets outlive a gateway reload and keep serving a retired instance**  
  状态：**OPEN**  
  已知 fix PR：数据中未发现明确关联 PR。

**影响分析：**  
`POST /admin/reload` 或其他 stop signal 会让 daemon 启动新 gateway instance，但已升级的 WebSocket 可能继续持有旧实例状态并继续服务。  
这可能导致配置不一致、状态漂移、旧逻辑继续处理请求等问题，尤其影响长期连接类 channel 或 dashboard 场景。

---

### 中等影响：Telegram 忽略 edited_message 更新

- [Issue #11713](https://github.com/zeroclaw-labs/zeroclaw/issues/11713)  
  **[Bug]: Telegram channel ignores edited_message updates — mention added via edit is never seen**  
  状态：**OPEN**  
  已知 fix PR：数据中未发现明确关联 PR。

**影响分析：**  
Telegram listener 只读取 `update["message"]`，未处理 `edited_message`。如果用户先发送普通消息，再通过编辑添加 mention，ZeroClaw 不会重新评估 gate、不会记录 passive context，也不会产生 trace event。  
这影响 Telegram channel 的交互完整性和被动上下文捕获能力。

---

### 中等影响：Tailscale gateway serve 进程未被监管

- [PR #11726](https://github.com/zeroclaw-labs/zeroclaw/pull/11726)  
  **fix(tunnel): supervise and verify the tailscale gateway serve process**  
  状态：**OPEN**

**影响分析：**  
此前 `tailscale serve|funnel --https=443` 子进程启动后如果退出，系统可能不知情。  
这会造成“看似已启动，实际无法访问”的部署问题。该 PR 已给出修复方向。

---

### 中等影响：mid-turn steering 送达过晚或丢失

- [PR #11725](https://github.com/zeroclaw-labs/zeroclaw/pull/11725)  
  **fix(runtime): deliver mid-turn steering at the next step, not after the final answer**  
  状态：**OPEN**

**影响分析：**  
用户在 Agent 执行工具调用期间发送 steering 信息，原行为可能直到最终回答之后才生效，甚至在取消时丢失。  
这会降低 Agent 实时可控性。该 PR 已针对问题进行修复。

---

### S3：截断的 workspace 文件提示与系统 prompt 冲突

- [Issue #11710](https://github.com/zeroclaw-labs/zeroclaw/issues/11710)  
  **[Bug]: a truncated workspace file tells the agent to read it, while the prompt header forbids reading it**  
  组件：`runtime/daemon`，`zeroclaw-runtime/src/agent/system_prompt.rs`，`doctor`  
  严重程度：**S3 - minor / confusing behavior**  
  状态：**OPEN**  
  已知 fix PR：数据中未发现明确关联 PR。

**影响分析：**  
Bootstrap 文件如 `AGENTS.md`、`SOUL.md`、`TOOLS.md` 等会按每文件 20,000 字符上限注入。文件被截断后，提示内容可能要求 Agent 去读取完整文件，但 prompt header 又禁止读取，形成矛盾指令。  
该问题不一定导致崩溃，但会造成 Agent 行为混乱和用户困惑。

---

### 已有修复方向：多模态视觉路由“粘住”问题

- [PR #11716](https://github.com/zeroclaw-labs/zeroclaw/pull/11716)  
  **fix(runtime): degrade text-only follow-ups instead of pinning to the vision provider**  
  状态：**OPEN**  
  关联：**Fixes #11706**

**影响分析：**  
当配置了 `vision_model_provider` 且 primary 是 text-only 模型时，一次图片输入会让后续纯文本 turn 继续被固定到 vision provider。  
该 PR 修复“sticky vision route”，让后续纯文本请求能够降级回合适的文本模型路径。

---

## 5. 功能请求与路线图信号

### ZeroCode 多会话能力继续增强

- [Issue #11724](https://github.com/zeroclaw-labs/zeroclaw/issues/11724)  
  **feat(zerocode): make the per-pane session cap configurable**
- [PR #11727](https://github.com/zeroclaw-labs/zeroclaw/pull/11727)  
  **feat(zerocode): reopen open sessions when zerocode restarts**

路线图信号：ZeroCode 正在从“会话查看器”向“可恢复、多 session 工作台”演进。  
PR #11727 已实现重启恢复打开 sessions；Issue #11724 若被接受，可能进一步允许用户按机器性能、daemon session 限制和个人工作流自定义 pane session 上限。

---

### Provider 生态扩展

- [PR #11721](https://github.com/zeroclaw-labs/zeroclaw/pull/11721)  
  **feat(providers): add Standard Compute model provider**

路线图信号：ZeroClaw 持续强调 OpenAI-compatible provider 的可插拔性。  
Standard Compute provider 的加入，如果合并，将扩大用户在模型服务商上的选择范围。

---

### 本地 Whisper 转录配置增强

- [PR #11717](https://github.com/zeroclaw-labs/zeroclaw/pull/11717)  
  **feat(config): add optional model to local Whisper transcription**  
  状态：**OPEN**

路线图信号：语音转录能力正在变得更可配置。  
该 PR 为 `[providers.transcription.local_whisper.<alias>]` 和 legacy `[transcription.local_whisper]` 增加可选 `model` 字段，以适配严格 OpenAI-compatible 的自托管 STT 服务。

---

### A2A 协议模块化

- [PR #11712](https://github.com/zeroclaw-labs/zeroclaw/pull/11712)  
  **feat(a2a): extract A2A protocol core into a dedicated zeroclaw-a2a crate**

路线图信号：项目可能正在为 Agent-to-Agent 协议能力做长期架构铺垫。  
将协议核心抽离为独立 crate 有利于 API、工具、网关共享同一套 wire model 和协议处理逻辑。

---

### 主题和 UI 可定制性

- [PR #11719](https://github.com/zeroclaw-labs/zeroclaw/pull/11719)  
  **feat(theme): add Oxocarbon dark theme**  
  状态：**OPEN**，`needs-author-action`

路线图信号：ZeroCode TUI 和 dashboard 的可视化体验仍在扩展。  
但该 PR 目前需要作者进一步处理，短期进入下一版本存在不确定性。

---

## 6. 用户反馈摘要

由于今日 Issue 评论数均为 0，缺少进一步讨论上下文；以下反馈主要基于 Issue/PR 描述中的明确诉求提炼。

### 用户痛点 1：会话历史必须可靠持久化

相关条目：  
- [Issue #11711](https://github.com/zeroclaw-labs/zeroclaw/issues/11711)

用户期望 session store 是可靠记录，而不是上下文窗口裁剪的副作用目标。  
长对话被裁剪可以接受，但历史 turns 被永久删除会直接影响用户信任。

---

### 用户痛点 2：长连接和 reload 行为需要可预测

相关条目：  
- [Issue #11709](https://github.com/zeroclaw-labs/zeroclaw/issues/11709)  
- [PR #11718](https://github.com/zeroclaw-labs/zeroclaw/pull/11718)

用户在 webhook、SSE、WebSocket、gateway reload 等场景下需要明确生命周期语义：  
客户端断开不应随意取消后台任务；gateway reload 后旧连接也不应继续代表旧实例服务。

---

### 用户痛点 3：多会话 ZeroCode 工作流需要恢复和配置能力

相关条目：  
- [Issue #11724](https://github.com/zeroclaw-labs/zeroclaw/issues/11724)  
- [PR #11727](https://github.com/zeroclaw-labs/zeroclaw/pull/11727)

用户希望 ZeroCode 能支持更长期、连续的工作环境。  
重启后恢复打开 sessions 是重要一步；可配置 session cap 则反映高级用户需要更灵活的多任务布局。

---

### 用户痛点 4：Channel 适配应覆盖平台真实行为

相关条目：  
- [Issue #11713](https://github.com/zeroclaw-labs/zeroclaw/issues/11713)

Telegram 用户可能通过编辑消息补充 mention 或上下文。ZeroClaw 如果忽略 `edited_message`，就会漏掉真实交互意图。  
这说明 channel connector 需要更贴近各平台事件模型，而不只是处理最基础消息类型。

---

### 用户痛点 5：Agent 指令不应自相矛盾

相关条目：  
- [Issue #11710](https://github.com/zeroclaw-labs/zeroclaw/issues/11710)

被截断文件提示 Agent 去读取完整文件，但系统 header 又禁止读取，会造成模型行为不确定。  
用户希望系统 prompt 在安全限制、上下文注入和后续指令之间保持一致。

---

## 7. 待处理积压

基于今日数据，未看到“长期未响应”的历史 Issue/PR 证据；以下为当前最值得维护者优先关注的开放项。

### 高优先级稳定性积压

1. [Issue #11711](https://github.com/zeroclaw-labs/zeroclaw/issues/11711)  
   **长对话裁剪永久删除旧 turns**  
   建议优先级：高  
   原因：影响 session store 信任模型，且暂无明确 fix PR。

2. [Issue #11709](https://github.com/zeroclaw-labs/zeroclaw/issues/11709)  
   **gateway reload 后旧 WebSocket 继续服务旧实例**  
   建议优先级：高  
   原因：涉及 reload 后状态一致性和长连接生命周期。

3. [Issue #11713](https://github.com/zeroclaw-labs/zeroclaw/issues/11713)  
   **Telegram 忽略 edited_message**  
   建议优先级：中高  
   原因：影响 channel 行为完整性，且修复边界较明确。

---

### 需要作者行动的 PR

1. [PR #11718](https://github.com/zeroclaw-labs/zeroclaw/pull/11718)  
   **fix(gateway): keep a streamed webhook turn running when its SSE client disconnects**  
   标签：`needs-author-action`，`risk:high`  
   建议：优先完成审查反馈，明确 SSE disconnect 与 turn cancellation 的语义。

2. [PR #11719](https://github.com/zeroclaw-labs/zeroclaw/pull/11719)  
   **feat(theme): add Oxocarbon dark theme**  
   标签：`needs-author-action`，`risk:low`  
   建议：该 PR 风险较低，可在作者补齐要求后作为体验改进合入。

---

### 大体量架构 PR

- [PR #11712](https://github.com/zeroclaw-labs/zeroclaw/pull/11712)  
  **feat(a2a): extract A2A protocol core into a dedicated zeroclaw-a2a crate**  
  标签：`size:XL`  
  建议：需要重点审查 crate 边界、API 稳定性、依赖方向和迁移成本。该 PR 对长期架构价值较大，但合入风险也较高。

---

### 安全与依赖后续确认

- [PR #11715](https://github.com/zeroclaw-labs/zeroclaw/pull/11715)  
- [PR #11714](https://github.com/zeroclaw-labs/zeroclaw/pull/11714)

两条 PR 均围绕 `RUSTSEC-2026-0344` 和 `ruzstd` 高危依赖问题，但状态为关闭。  
建议维护者确认：  
- 安全门禁是否已经恢复通过；  
- `Cargo.lock` 中是否仍包含受影响的 `ruzstd 0.8.3`；  
- 是否已有替代 PR 或合并记录完成修复。

---

## 总体判断

ZeroClaw 今日开发活跃度较高，PR 数量明显高于 Issue 数量，说明维护和贡献侧正在快速响应问题并推进新能力。  
当前最重要的风险集中在 **会话持久化、网关长连接生命周期、流式请求取消语义、安全依赖治理** 四个方面。  
如果这些稳定性问题能在下一轮合并中得到处理，同时合入 ZeroCode 会话恢复、Tailscale tunnel 监管、mid-turn steering 修复等 PR，项目在可用性和可靠性上会有明显提升。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*