# OpenClaw 生态日报 2026-09-16

> Issues: 6 | PRs: 56 | 覆盖项目: 13 个 | 生成时间: 2026-09-16 03:51 UTC

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
**日期：2026-09-16**  
**仓库：** [openclaw/openclaw](https://github.com/openclaw/openclaw)

---

## 1. 今日速览

过去 24 小时 OpenClaw 活跃度很高：Issues 更新 6 条，其中 5 条仍在开放，1 条已关闭；Pull Requests 更新 56 条，其中 48 条仍待合并，8 条已合并或关闭。  
今日工作重心集中在 **WebUI 交互体验、插件/Agent 运行时稳定性、SQLite/队列性能、CI 自动化成本控制、MCP/Crabbox/Codex 等扩展兼容性**。  
从标签看，多个 PR 已标记为 `proof: sufficient`、`ready for maintainer look`，说明不少修复已进入维护者审阅阶段，短期内有较高合并可能。  
项目整体健康度较好：问题响应及时，缺陷通常能在同日出现对应修复 PR；但待合并 PR 数量较多，维护者审核压力明显上升。  
今日无新版本发布。

---

## 2. 版本发布

今日 **无新版本发布**。  
最新 Releases 数据为空，因此暂无破坏性变更、迁移说明或升级注意事项。

---

## 3. 项目进展

> 注：数据中未展开今日已合并/关闭的 8 个 PR 详情，因此以下重点基于今日仍开放但处于“ready for maintainer look / proof sufficient / 修复链条明确”的 PR，以及今日已关闭 Issue 进行进展分析。

### 3.1 已关闭 Issue：Control UI 注释体验打磨完成

- [Issue #149306 - Control UI: polish inline annotations](https://github.com/openclaw/openclaw/issues/149306)  
  状态：已关闭  
  关注点：内联文本注释的用户气泡对比度、hovercard 尺寸、评论编辑器体验。  
  影响：该问题的关闭表明 Control UI 中 inline annotations 的视觉和交互细节已有改进或被确认解决，有助于降低协作注释场景中的 UX 摩擦。

### 3.2 WebUI 与交互体验持续修复

- [PR #149659 - fix(ui): keep sidebar attention previews open on tap](https://github.com/openclaw/openclaw/pull/149659)  
  修复移动端或触屏场景下，点击 sidebar attention icon 会关闭预览并切换会话的问题。  
  价值：让用户可以在不离开当前会话的情况下查看 pending request、approval 等提醒详情，改善触屏可用性。

- [PR #149344 - fix(gateway): expose session model selection provenance](https://github.com/openclaw/openclaw/pull/149344)  
  让 `sessions.list` 能区分模型选择来源是 runtime、override 还是 config default。  
  价值：提升 WebUI 和 Gateway 对会话模型来源的可解释性，减少用户在多模型配置下的困惑。

### 3.3 插件系统与内存释放方向取得明显推进

今日多个 PR 聚焦插件 reload、registry、timer、cached error 等对象生命周期问题：

- [PR #149646 - fix(plugins): reuse bundled setup code across reloads](https://github.com/openclaw/openclaw/pull/149646)  
  避免重复 plugin inventory 时为未变化的 bundled setup code 生成新的 module URL。  
  价值：降低重复 reload 的编译和内存成本。

- [PR #149648 - fix(plugins): reuse the published inbound registry during reload](https://github.com/openclaw/openclaw/pull/149648)  
  修复 reload cache 可能隐藏新发布 metadata、导致重复注册的问题。  
  价值：减少冗余注册，提高 plugin reload 一致性。

- [PR #149643 - fix(plugins): release retired callers retained by cached errors](https://github.com/openclaw/openclaw/pull/149643)  
  修复 cached metadata failures 通过 lazy Error stacks 保留 retired plugin registries 的问题。  
  价值：缓解长期运行和频繁 reload 下的内存保留问题。

- [PR #149644 - fix(plugins): release predecessor registries after replacement](https://github.com/openclaw/openclaw/pull/149644)  
  修复 capability resolver 保留旧 loader scope 和前代 registry 的问题。  
  价值：避免插件热替换后形成 registry 链式保留。

- [PR #149645 - fix(state): release async context when lease timers stop](https://github.com/openclaw/openclaw/pull/149645)  
  修复已完成或暂停的 lease 仍保留 native timer handles 与 async context 的问题。  
  价值：进一步清理 worker 和插件 generation 相关引用。

整体看，插件子系统今日的推进较集中，属于 **稳定性与资源治理层面的系统性修复**。

### 3.4 Agent / MCP / LSP 运行时稳定性增强

- [PR #149005 - fix: wait for owned stdio cleanup without premature timeout](https://github.com/openclaw/openclaw/pull/149005)  
  修复 MCP 和 LSP shutdown 过程中，owner 仍在合法清理时被 500ms 超时误判为失败的问题。  
  价值：降低关闭时的误报和硬取消带来的副作用，特别是 Windows direct adapter 场景。

- [PR #149662 - fix: restore MCP discovery after provider normalization](https://github.com/openclaw/openclaw/pull/149662)  
  修复 provider normalization 后 MCP tools 从 Code Mode API catalog 中消失的问题。  
  价值：恢复 agents 对 MCP 工具的发现与调用能力。

- [PR #149082 - fix: require current subagent control to cancel descendant tasks](https://github.com/openclaw/openclaw/pull/149082)  
  加强 descendant task cancel 权限控制，避免 former parent 或只具备 read visibility 的 recipient 获得取消权限。  
  价值：涉及安全边界，合并前仍需充分验证。

### 3.5 数据库、队列与性能优化

- [PR #149663 - fix: Bun can open more than four SQLite stores](https://github.com/openclaw/openclaw/pull/149663)  
  修复 Bun-backed OpenClaw 在打开第五个 SQLite store 时失败，以及关闭一个 multiplexed actor 可能影响其他 store 的问题。  
  价值：提升 Bun 运行时下多 SQLite store 支持能力。

- [PR #149420 - improve: avoid copying plugin blob reads twice](https://github.com/openclaw/openclaw/pull/149420)  
  避免读取 plugin blob 时重复复制完整 payload。  
  价值：降低大 Diff artifacts 和其他大 blob 查询时的内存分配与复制开销。

- [PR #149421 - improve: reduce repeated delivery queue query compilation](https://github.com/openclaw/openclaw/pull/149421)  
  减少 outbound delivery queue 在 custody checkpoint 中重复编译 SQLite 查询。  
  价值：提升 delivery queue 操作效率。

- [PR #149660 - perf(logbook): reduce pending frame read overhead](https://github.com/openclaw/openclaw/pull/149660)  
  减少 Logbook 读取 pending activity 时不必要的 capture paths 和 metadata 传输。  
  价值：backlog 较多时可明显减少 SQLite worker 处理压力。

### 3.6 CI 与自动化成本控制

- [PR #149656 - ci: pack compact and plugin test bins to 540/360 s on the 16-class](https://github.com/openclaw/openclaw/pull/149656)  
  通过更合理的测试 bin 分组减少重复 checkout/setup，同时隔离长尾任务。  
  价值：降低 CI wall time 与资源消耗。

- [PR #149655 - ci: gate Docker seed and QA smoke on main by owner paths](https://github.com/openclaw/openclaw/pull/149655)  
  让 Docker seed 和 QA smoke 在 main 上按 owner paths 触发，避免无关提交重复运行昂贵任务。  
  价值：减少主干 CI 成本，不改变产品行为。

- [PR #149522 - fix: unblock Blacksmith CI and restore MCP tool discovery](https://github.com/openclaw/openclaw/pull/149522)  
  当前作为 routing candidate 保留；MCP runtime repair 已拆分到 [PR #149662](https://github.com/openclaw/openclaw/pull/149662)。  
  价值：说明维护者正在拆分高风险 CI/MCP 修复，降低合并复杂度。

---

## 4. 社区热点

由于 PR 评论数在数据中显示为 `undefined`，无法按实际评论数精确排序。以下根据 Issue 评论数、标签严重程度、影响范围和修复链条判断今日热点。

### 4.1 WebUI 历史消息加载导致可见消息短暂位移

- [Issue #149619 - WebUI: older-history loading briefly shifts retained messages by 82.5 px](https://github.com/openclaw/openclaw/issues/149619)  
  评论数：3  
  标签：`P2`、`impact:ux-friction`、`issue-rating: 🦪 silver shellfish`  
  诉求分析：用户在加载更早聊天历史时，已可见消息会短暂下移再恢复。虽然最终 scroll-position 检查通过，但中间帧出现了 82.5px 的视觉跳动。  
  背后问题：现有测试只验证 settle 后状态，缺少对更新过程中的视觉稳定性采样。  
  影响场景：长聊天记录、键盘导航、真实 Gateway 复现场景。

### 4.2 WebUI “Show earlier” 加载时丢失键盘焦点

- [Issue #149618 - WebUI: Show earlier loses keyboard focus while loading older messages](https://github.com/openclaw/openclaw/issues/149618)  
  评论数：2  
  标签：`P2`、`clawsweeper:source-repro`、`impact:ux-friction`、`issue-rating: 🦞 diamond lobster`  
  诉求分析：键盘用户 Tab 到 “Show earlier” 后，在自动加载旧消息时按钮 disabled，焦点丢失。  
  背后问题：控件仍存在，但中间状态破坏了键盘用户的当前位置感知。  
  影响场景：键盘可访问性、屏幕阅读器用户、历史消息浏览。

### 4.3 WebUI 性能与稳定性长期观测

- [Issue #149361 - WebUI: continuous performance and stability study with real-Gateway evidence](https://github.com/openclaw/openclaw/issues/149361)  
  评论数：2  
  标签：`P3`、`impact:other`、`issue-rating: 🌊 off-meta tidepool`  
  诉求分析：这是一个持续性 tracking issue，用于整理 WebUI startup、route/session switching、real-Gateway evidence 等性能与稳定性发现。  
  背后信号：项目正在从单点 bug 修复走向持续观测和回归防护。

### 4.4 Crabbox installer import 阻塞已安装可用 binary

- [Issue #149657 - supported Crabbox binary is blocked by eager installer imports](https://github.com/openclaw/openclaw/issues/149657)  
  评论数：1  
  标签：`bug`、`maintainer`  
  对应修复：[PR #149658](https://github.com/openclaw/openclaw/pull/149658)  
  诉求分析：即使系统中已有受支持的 Crabbox binary，wrapper 仍会先导入 installer dependencies，并可能因此失败。  
  背后问题：启动路径耦合过强，探测已安装 binary 前不应被安装器依赖阻塞。

### 4.5 Discord follow-up 队列留下 progress draft

- [Issue #149640 - Discord progress draft is left behind when a message is queued as a follow-up](https://github.com/openclaw/openclaw/issues/149640)  
  评论数：1  
  标签：`P2`、`maturity:stable`、`clawsweeper:queueable-fix`、`impact:ux-friction`、`issue-rating: 🦞 diamond lobster`  
  诉求分析：当同一 Discord channel 的 session 仍在 mid-turn，后续消息被 queue 为 follow-up 时，progress draft 不会被删除。  
  背后问题：流式状态清理和 follow-up 队列生命周期之间存在遗漏。  
  影响场景：Discord channel 集成、连续消息、流式反馈体验。

---

## 5. Bug 与稳定性

### P1 / 高风险：安全边界与取消权限

#### 5.1 Former parent 可通过 retained task links 取消 descendant work

- [PR #149082 - fix: require current subagent control to cancel descendant tasks](https://github.com/openclaw/openclaw/pull/149082)  
  状态：开放，`needs proof`  
  严重性：高  
  类型：权限边界 / Agent task control  
  风险：取消权限可能被旧 parent 或 completion recipient 错误继承。  
  当前进展：已有修复 PR，但带有 `merge-risk: 🚨 security-boundary`，仍需证明与审查。

---

### P2 / 中高优先级：WebUI 可访问性与视觉稳定性

#### 5.2 历史消息加载时可见消息短暂位移

- [Issue #149619](https://github.com/openclaw/openclaw/issues/149619)  
  状态：开放  
  严重性：中高  
  是否已有 fix PR：数据中未显示明确对应 PR。  
  影响：视觉稳定性、长会话浏览体验、测试覆盖盲区。

#### 5.3 “Show earlier” 加载时丢失键盘焦点

- [Issue #149618](https://github.com/openclaw/openclaw/issues/149618)  
  状态：开放  
  严重性：中高  
  是否已有 fix PR：数据中未显示明确对应 PR。  
  影响：键盘可访问性、屏幕阅读器导航。

#### 5.4 Discord follow-up progress draft 未清理

- [Issue #149640](https://github.com/openclaw/openclaw/issues/149640)  
  状态：开放  
  严重性：中高  
  是否已有 fix PR：数据中未显示明确对应 PR。  
  影响：Discord 集成体验、queued turn 状态一致性。

---

### P2 / 稳定性与运行时兼容

#### 5.5 Crabbox wrapper 在探测已安装 binary 前被 installer imports 阻塞

- [Issue #149657](https://github.com/openclaw/openclaw/issues/149657)  
  状态：开放  
  对应修复：[PR #149658](https://github.com/openclaw/openclaw/pull/149658)  
  严重性：中  
  影响：已有合法 Crabbox binary 的部署无法正常启动。  
  当前进展：已有小型修复 PR，合并概率较高。

#### 5.6 Bun 打开超过四个 SQLite store 失败

- [PR #149663](https://github.com/openclaw/openclaw/pull/149663)  
  状态：开放  
  严重性：中  
  影响：Bun-backed OpenClaw 多 store 场景受限，并可能错误 retire unrelated stores。  
  当前进展：已有修复 PR。

#### 5.7 MCP tools 在 provider normalization 后从 Code Mode API catalog 消失

- [PR #149662](https://github.com/openclaw/openclaw/pull/149662)  
  状态：开放  
  严重性：中  
  影响：Agent 无法发现或调用已配置 MCP tools，可能出现 `Unknown API file: mcp/index.d.ts`。  
  当前进展：已有修复 PR，并与 [PR #149522](https://github.com/openclaw/openclaw/pull/149522) 的更大修复链条相关。

#### 5.8 Local Ollama embeddings 被 private/internal IP 规则误拦截

- [PR #149589 - fix(ollama): embeddings unreachable for a local Ollama host](https://github.com/openclaw/openclaw/pull/149589)  
  状态：开放，`waiting on author`  
  严重性：中  
  标签：`merge-risk: compatibility`、`merge-risk: security-boundary`  
  影响：本地或自托管 Ollama embeddings provider 无法用于 memory search 等功能，而 chat completions 对同一 host 可用。  
  当前进展：修复方向明确，但仍等待作者响应，且涉及安全边界。

#### 5.9 systemd inline directives 未正确转义 `%` specifiers

- [PR #149559 - fix(daemon): double % specifiers in systemd inline directives](https://github.com/openclaw/openclaw/pull/149559)  
  状态：开放，`needs proof`  
  严重性：中  
  影响：`Environment=`、`ExecStart`、`WorkingDirectory=` 中的 `%s`、`%n`、`%h` 等可能被 systemd 误展开。  
  当前进展：已有修复 PR，但还需 proof。

---

### P3 / 中低优先级：性能、内存与维护性

#### 5.10 插件 reload 导致 registry、caller、timer 等资源保留

相关 PR：

- [PR #149646](https://github.com/openclaw/openclaw/pull/149646)  
- [PR #149648](https://github.com/openclaw/openclaw/pull/149648)  
- [PR #149643](https://github.com/openclaw/openclaw/pull/149643)  
- [PR #149644](https://github.com/openclaw/openclaw/pull/149644)  
- [PR #149645](https://github.com/openclaw/openclaw/pull/149645)  

严重性：中低，但对长期运行服务重要。  
影响：频繁 plugin reload 或长期运行后可能造成内存保留、registry 链条堆积。  
当前进展：已有成组修复，且多数带 `proof: sufficient` 与 `ready for maintainer look`。

---

## 6. 功能请求与路线图信号

今日数据中没有典型“新功能请求”型 Issue，更多是稳定性、UX 和平台兼容性修复。但仍能观察到几个路线图信号。

### 6.1 WebUI 可访问性和真实 Gateway 场景将继续成为重点

- [Issue #149618](https://github.com/openclaw/openclaw/issues/149618)  
- [Issue #149619](https://github.com/openclaw/openclaw/issues/149619)  
- [Issue #149361](https://github.com/openclaw/openclaw/issues/149361)  

信号：维护者正在关注真实 Gateway 复现、键盘导航、加载中间态、视觉稳定性等更细粒度体验。  
可能进入下一版本的内容：历史消息加载稳定性、焦点保持、WebUI 性能观测覆盖。

### 6.2 Agent 与 MCP 工具链会继续强化

- [PR #149005](https://github.com/openclaw/openclaw/pull/149005)  
- [PR #149662](https://github.com/openclaw/openclaw/pull/149662)  
- [PR #149082](https://github.com/openclaw/openclaw/pull/149082)  

信号：OpenClaw 正在加固 Agent 子系统的工具发现、任务取消权限、进程 shutdown 生命周期。  
可能进入下一版本的内容：MCP discovery 恢复、更安全的 subagent cancellation、更可靠的 LSP/MCP cleanup。

### 6.3 插件系统热重载和长期运行内存治理正在系统化

- [PR #149646](https://github.com/openclaw/openclaw/pull/149646)  
- [PR #149648](https://github.com/openclaw/openclaw/pull/149648)  
- [PR #149643](https://github.com/openclaw/openclaw/pull/149643)  
- [PR #149644](https://github.com/openclaw/openclaw/pull/149644)  
- [PR #149645](https://github.com/openclaw/openclaw/pull/149645)  

信号：插件系统正在从“功能可用”转向“可长时间运行、可频繁 reload、可安全释放旧 generation”。  
可能进入下一版本的内容：插件 reload 资源释放、registry 复用、setup code 复用。

### 6.4 多运行时与本地模型生态兼容性增强

- [PR #149663](https://github.com/openclaw/openclaw/pull/149663)  
- [PR #149589](https://github.com/openclaw/openclaw/pull/149589)  
- [PR #149647](https://github.com/openclaw/openclaw/pull/149647)  
- [PR #149658](https://github.com/openclaw/openclaw/pull/149658)  

信号：Bun、Ollama、Codex remote app-server、Crabbox 等扩展生态正在被纳入更稳定的运行路径。  
可能进入下一版本的内容：Bun SQLite store 修复、local Ollama embeddings 兼容、Codex remote conversation resume、Crabbox installed binary 探测改进。

---

## 7. 用户反馈摘要

### 7.1 WebUI 用户痛点：加载历史消息时“不稳定”和“丢位置”

相关：

- [Issue #149619](https://github.com/openclaw/openclaw/issues/149619)  
- [Issue #149618](https://github.com/openclaw/openclaw/issues/149618)  

用户反馈集中在历史消息加载过程中的中间态问题：  
- 消息最终位置正确，但加载过程中会短暂跳动。  
- 键盘用户在聚焦 “Show earlier” 后，加载旧消息时焦点丢失。  
- 当前测试可能只覆盖最终 settled 状态，没有覆盖用户实际感知到的瞬时位移和焦点变化。

这类问题不会导致数据丢失，但会显著影响长对话浏览、辅助技术使用和键盘可访问性。

### 7.2 运维与集成用户痛点：已有依赖可用却被启动路径阻塞

相关：

- [Issue #149657](https://github.com/openclaw/openclaw/issues/149657)  
- [PR #149658](https://github.com/openclaw/openclaw/pull/149658)  

用户场景是：系统中已经安装了受支持的 Crabbox binary，但 OpenClaw wrapper 在探测 binary 前先导入 installer dependencies，导致启动失败。  
反馈背后的核心诉求是：**运行已安装组件的路径应尽可能轻量，不应被安装路径依赖影响**。

### 7.3 Discord 集成用户痛点：排队消息后的进度草稿残留

相关：

- [Issue #149640](https://github.com/openclaw/openclaw/issues/149640)  

用户期望在 Discord channel 中，follow-up queue 与 streaming progress draft 能正确完成生命周期清理。  
残留 progress draft 会让用户误以为任务仍在运行，或造成频道状态不一致。

### 7.4 开发者与维护者痛点：CI 过载与测试长尾

相关：

- [PR #149656](https://github.com/openclaw/openclaw/pull/149656)  
- [PR #149655](https://github.com/openclaw/openclaw/pull/149655)  
- [PR #149522](https://github.com/openclaw/openclaw/pull/149522)  

维护者正在主动降低重复 CI 工作、拆分高风险修复、隔离长尾测试。  
这说明项目规模已经达到需要精细化 CI 编排的阶段，否则会影响 PR 周转速度。

---

## 8. 待处理积压

> 数据仅覆盖过去 24 小时，无法判断“长期未响应”的完整历史积压。以下列出当前仍开放、风险较高或需要维护者优先关注的条目。

### 8.1 已有 proof、等待维护者审阅的高价值 PR

这些 PR 多数已标记 `proof: sufficient` 或 `ready for maintainer look`，建议优先排队审查：

- [PR #149005 - fix: wait for owned stdio cleanup without premature timeout](https://github.com/openclaw/openclaw/pull/149005)  
- [PR #149487 - chore: cover worker state in published upgrade tests](https://github.com/openclaw/openclaw/pull/149487)  
- [PR #149420 - improve: avoid copying plugin blob reads twice](https://github.com/openclaw/openclaw/pull/149420)  
- [PR #149421 - improve: reduce repeated delivery queue query compilation](https://github.com/openclaw/openclaw/pull/149421)  
- [PR #149648 - fix(plugins): reuse the published inbound registry during reload](https://github.com/openclaw/openclaw/pull/149648)  
- [PR #149646 - fix(plugins): reuse bundled setup code across reloads](https://github.com/openclaw/openclaw/pull/149646)  
- [PR #149643 - fix(plugins): release retired callers retained by cached errors](https://github.com/openclaw/openclaw/pull/149643)  
- [PR #149645 - fix(state): release async context when lease timers stop](https://github.com/openclaw/openclaw/pull/149645)  
- [PR #149308 - fix: preserve state across repeated Doctor repairs](https://github.com/openclaw/openclaw/pull/149308)  
- [PR #149634 - fix: repair stale ClawHub plugin host links during doctor](https://github.com/openclaw/openclaw/pull/149634)

### 8.2 需要 proof 或作者响应的风险 PR

- [PR #149082 - fix: require current subagent control to cancel descendant tasks](https://github.com/openclaw/openclaw/pull/149082)  
  状态：`needs proof`  
  关注点：安全边界。建议优先补充权限模型测试和反例测试。

- [PR #149589 - fix(ollama): embeddings unreachable for a local Ollama host](https://github.com/openclaw/openclaw/pull/149589)  
  状态：`waiting on author`  
  关注点：兼容性与安全边界。建议明确 private/internal IP 放行条件，避免 SSRF 风险。

- [PR #149559 - fix(daemon): double % specifiers in systemd inline directives](https://github.com/openclaw/openclaw/pull/149559)  
  状态：`needs proof`  
  关注点：systemd 兼容性。建议补充 `%` specifier 的 unit 文件生成与实际运行验证。

- [PR #149596 - fix(update): accept cgroup-v1 scope membership in triage admission](https://github.com/openclaw/openclaw/pull/149596)  
  状态：`needs proof`  
  关注点：systemd/cgroup v1 环境兼容。建议补充不同 cgroup 格式样例测试。

### 8.3 新开但尚未出现明确修复 PR 的 Issue

- [Issue #149619 - WebUI older-history loading shifts retained messages](https://github.com/openclaw/openclaw/issues/149619)  
  建议：补充过程帧级别的 scroll stability 测试，避免仅检查 settled 状态。

- [Issue #149618 - Show earlier loses keyboard focus](https://github.com/openclaw/openclaw/issues/149618)  
  建议：增加 keyboard focus retention 测试，覆盖 disabled/loading 状态过渡。

- [Issue #149640 - Discord progress draft is left behind](https://github.com/openclaw/openclaw/issues/149640)  
  建议：梳理 queued follow-up 与 streaming draft 生命周期，补充 Discord channel 端到端回归测试。

---

## 总体健康度评估

OpenClaw 今日表现为 **高活跃、高修复密度、维护者审阅压力偏高**。  
积极信号包括：Bug 通常能快速形成对应 PR，插件系统、Agent/MCP、CI、WebUI 都有明确修复推进；多个 PR 已具备 proof 并等待审阅。  
主要风险在于：开放 PR 数量较多，部分涉及安全边界、自动化、兼容性，需要维护者投入较高审查成本；WebUI 可访问性问题和 Discord draft 残留仍需明确修复路径。  
整体判断：项目处于健康的快速迭代状态，但短期重点应放在 **合并队列消化、P2 UX 回归修复、安全边界 PR 验证、CI 成本控制**。

---

## 横向生态对比

# 2026-09-16 个人 AI 助手 / 自主智能体开源生态横向对比报告

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态呈现出 **高活跃、强工程化、重稳定性修复** 的特征。OpenClaw、Hermes Agent、ZeroClaw、NanoBot、NanoClaw、CoPaw/QwenPaw 等项目都在围绕 **多端工作台、插件/工具运行时、长上下文、Provider 兼容、多通道接入、CI 成本与稳定性** 快速迭代。

整体来看，生态已经从“单一聊天机器人”阶段进入“跨 WebUI / TUI / Desktop / IM / 邮件 / MCP / 外部工具”的 **多入口智能体工作台** 阶段。与此同时，真实用户场景正在暴露更深层的系统问题：上下文压缩 livelock、工具循环、文件系统阻塞、多模态上下文丢失、凭证泄露、升级迁移失败、CI flaky 等。  
对技术决策者而言，当前选择开源 AI Agent 框架时，除了功能丰富度，更应重点评估 **运行时稳定性、升级路径、权限边界、插件生命周期、长会话能力和多 Provider 兼容性**。

---

## 2. 各项目活跃度对比

> 注：Issues / PR 数为过去 24 小时更新量；“健康度”基于活跃度、修复响应、风险密度和维护压力综合判断。

| 项目 | Issues 更新 | PR 更新 | Release | 今日重点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 6 | 56 | 无 | WebUI UX、插件 reload 内存释放、MCP/LSP 稳定性、SQLite/队列性能、CI 成本 | **高活跃，健康但维护者审阅压力大** |
| **NanoBot** | 3 | 12 | **v0.3.5** | Native TUI、跨入口工作台、Dream 后台任务、文件工具并发、Provider 兼容 | **快速迭代，发布节奏健康，后台任务稳定性需关注** |
| **Hermes Agent** | 50 | 50 | 无 | 长上下文压缩、更新系统、Desktop/Windows、MCP OAuth、网关竞态、安全 | **极高活跃，但高优先级稳定性债务较重** |
| **PicoClaw** | 0 | 0 | 无 | 无活动 | **静默 / 暂无可见维护活动** |
| **NanoClaw** | 1 | 16 | 无 | 多 Gateway、Provider 凭证架构、Mattermost/Telegram、安全、Host 性能 | **架构演进活跃，集成风险上升** |
| **NullClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **IronClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **LobsterAI** | 0 | 14 | 无 | OpenClaw 升级兼容、网关恢复、运行时依赖、长会话、历史数据容错 | **修复密度高，处于升级后稳定化阶段** |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 0 | 1 | 无 | Docker/Rust Cargo 构建缓存 | **低活跃，基础设施小步优化** |
| **CoPaw / QwenPaw** | 3 | 14 | 无 | Workbench、实时语音、工作区、WeChat 附件、Cloud/NFS 文件浏览、多 Agent | **功能扩展强，真实部署稳定性问题显现** |
| **ZeptoClaw** | 0 | 18 | 无 | Dependabot 依赖升级、Rust/Docs/CI/Docker 维护 | **维护型活跃，社区互动低，合并推进不足** |
| **ZeroClaw** | 14 | 19 | 无 | Anthropic 多模态缓存、Provider timeout、CI flaky、ZeroCode UX、配置一致性 | **高活跃，CI 与多模态路径存在稳定性压力** |

### 活跃度分层

| 层级 | 项目 | 特征 |
|---|---|---|
| **极高活跃 / 高复杂度** | Hermes Agent、OpenClaw | Issues/PR 密集，覆盖核心运行时、UI、Provider、安全、CI，多线并行 |
| **快速产品化迭代** | NanoBot、CoPaw/QwenPaw、ZeroClaw、NanoClaw | 功能扩展与稳定性修复并行，正在形成多入口工作台和多通道 Agent 能力 |
| **升级 / 兼容稳定化** | LobsterAI | 围绕 OpenClaw 升级后的兼容问题集中修复 |
| **维护型活跃** | ZeptoClaw、Moltis | 依赖、构建、CI 等基础设施维护为主 |
| **低活动 / 静默** | PicoClaw、NullClaw、IronClaw、TinyClaw | 当日无可见社区活动 |

---

## 3. OpenClaw 在生态中的定位

### 3.1 定位概述

OpenClaw 目前是该生态中 **最接近“通用 Agent Runtime + WebUI + 插件系统 + 多 Provider / MCP 集成底座”** 的项目之一。与 NanoBot、CoPaw 这类更偏产品工作台体验的项目相比，OpenClaw 今日动态更集中在 **运行时内核、插件生命周期、队列性能、MCP/LSP 兼容、CI 编排** 等基础设施层。

从今日数据看，OpenClaw 的 **PR 更新数达到 56 条**，仅次于或接近 Hermes Agent 的极高活跃区间，说明其社区与维护活动处于生态第一梯队。

### 3.2 相对优势

| 维度 | OpenClaw 表现 |
|---|---|
| **运行时工程化** | 插件 reload、registry、lease timer、cached error、SQLite worker、delivery queue 等底层问题均有系统性修复 |
| **插件生态成熟度** | 今日多个 PR 专门处理 plugin reload 内存释放与 registry 复用，说明插件机制已进入长期运行优化阶段 |
| **MCP / LSP / Agent 工具链** | 有 MCP discovery、stdio cleanup、subagent cancellation 等修复，工具链边界较完整 |
| **WebUI 真实体验** | 关注移动端 sidebar preview、历史消息加载、键盘焦点、真实 Gateway 复现，UX 修复粒度较细 |
| **CI 成本意识** | 已开始通过 owner paths、test bin packing 降低主干 CI 成本，说明项目规模已达到需精细化 CI 治理的阶段 |

### 3.3 技术路线差异

| 项目 | 技术路线重点 | 与 OpenClaw 的差异 |
|---|---|---|
| **OpenClaw** | 通用 Agent Runtime、插件系统、MCP/LSP、WebUI、队列/SQLite、长期运行稳定性 | 更偏底层平台和扩展运行时 |
| **NanoBot** | 统一智能体工作台，强调 TUI/WebUI/聊天渠道连续体验 | 更偏用户入口和跨端体验，runtime 深度相对轻 |
| **Hermes Agent** | 长上下文、大规模工具调用、Desktop、更新系统、Skills、Gateway | 社区更大、问题暴露更多，但稳定性债务更重 |
| **NanoClaw** | 多 Gateway、凭证网关、Provider 认证架构 | 更强调认证 / 网关抽象与凭证生命周期 |
| **CoPaw/QwenPaw** | 桌面端、语音、Workbench、多 Agent、企业渠道 | 更偏产品化前端和企业集成 |
| **ZeroClaw** | ZeroCode、Anthropic 多模态、Provider 缓存、CI 调度 | 更聚焦代码智能体与多模态 Provider 细节 |
| **LobsterAI** | 基于 OpenClaw 的桌面/应用集成与兼容层 | 更像 OpenClaw 下游产品，受 OpenClaw 升级影响显著 |

### 3.4 社区规模与维护压力

OpenClaw 今日 **6 个 Issues、56 个 PR**，Issue 数不算最高，但 PR 数很高，说明当前主要压力不是需求发现，而是 **修复合入与维护者审阅吞吐**。  
相比 Hermes Agent 的 50 Issues / 50 PR，OpenClaw 的问题密度更低、修复链条更集中，整体健康度更稳；但 48 个待合并 PR 表明维护者队列可能成为短期瓶颈。

---

## 4. 共同关注的技术方向

### 4.1 长上下文、压缩与记忆稳定性

涉及项目：**Hermes Agent、NanoBot、OpenClaw、LobsterAI、ZeroClaw、CoPaw/QwenPaw**

| 项目 | 具体诉求 |
|---|---|
| Hermes Agent | Compression livelock、compaction stall、fallback 被 backoff 抑制 |
| NanoBot | Dream consolidation 运行 1–2 小时、重复 `read_file`、`dream.maxIterations` 失效 |
| LobsterAI | 长会话输出 token 被错误压缩到 1、compaction summary 格式冲突 |
| OpenClaw | WebUI 长历史加载稳定性、Logbook pending frame 性能 |
| ZeroClaw | image marker token 估算、多模态上下文 replay 稳定性 |
| CoPaw/QwenPaw | 工作区产物、中间文件、长任务交付体验 |

**趋势判断：**  
长上下文已经从“模型能力问题”变成“Agent Runtime 状态管理问题”。真正困难的是压缩何时触发、如何 commit、如何避免 livelock、如何保留工具结果和审计事实。

---

### 4.2 多 Provider 与本地 / 自托管模型兼容

涉及项目：**OpenClaw、NanoBot、ZeroClaw、CoPaw/QwenPaw、NanoClaw、LobsterAI**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | Ollama embeddings 被 private/internal IP 规则误拦截；MCP tools discovery 恢复 |
| NanoBot | Provider 历史消息保留 assistant content + tool_calls；Provider picker 搜索 |
| ZeroClaw | OpenAI-compatible timeout、Anthropic image/cache、多 Provider alias |
| CoPaw/QwenPaw | DeepSeek V4 Flash 能力适配、自定义 IMAP/SMTP、OpenAI-compatible 附件 URL |
| NanoClaw | Provider credential connection、OpenCode 通过 Iron Proxy 认证 |
| LobsterAI | xAI OAuth 迁移到 OpenClaw SQLite auth store |

**趋势判断：**  
Provider 适配正在从“支持更多模型名”转向“支持不同认证、上下文格式、流式行为、多模态 URL、缓存语义和 timeout 策略”。

---

### 4.3 插件 / Skill / Gateway 架构

涉及项目：**OpenClaw、Hermes Agent、NanoClaw、ZeroClaw、NanoBot**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | 插件 reload 资源释放、registry 复用、setup code 复用 |
| Hermes Agent | 插件安装事务性、Skills Hub 搜索、memobase memory provider |
| NanoClaw | OneCLI 抽取为 installable gateway skill、Iron Proxy gateway |
| ZeroClaw | ZeroCode tool input 性能、Provider alias 保留 |
| NanoBot | MCP catalog、跨入口 workbench 能力展示 |

**趋势判断：**  
Agent 项目正在普遍采用 **插件化 / Skill 化 / Gateway 化** 架构，以降低核心 runtime 复杂度，同时支持企业和自托管场景下的扩展。

---

### 4.4 多入口工作台：WebUI、TUI、Desktop、IM、邮件、语音

涉及项目：**NanoBot、OpenClaw、CoPaw/QwenPaw、Hermes Agent、ZeroClaw、NanoClaw**

| 项目 | 具体诉求 |
|---|---|
| NanoBot | v0.3.5 强调 “one agent, more places to work”，Native TUI 打包进 wheels |
| OpenClaw | WebUI sidebar、history loading、keyboard focus、Control UI annotations |
| CoPaw/QwenPaw | 统一 Chat Workbench、实时语音、Record & Replay、邮件、WeChat |
| Hermes Agent | Desktop Windows tray、remote gateway only、session stamp label |
| ZeroClaw | ZeroCode Sessions / Queue / Plan dock |
| NanoClaw | 多 Gateway setup、Provider login 与 gateway selection 解耦 |

**趋势判断：**  
“AI 助手”正在从命令行或聊天窗口演进为 **多端持续工作台**。用户期待会话、上下文、工具状态、文件和任务队列能在多个入口间连续存在。

---

### 4.5 安全边界与凭证治理

涉及项目：**Hermes Agent、OpenClaw、NanoClaw、NanoBot、ZeroClaw**

| 项目 | 具体诉求 |
|---|---|
| Hermes Agent | shutdown forensics 泄露 argv credentials；body-parser vulnerable pin；SSRF guard 误杀 |
| OpenClaw | subagent cancellation 权限边界；Ollama private IP 放行风险 |
| NanoClaw | Mattermost callback secret、credential gateway contract |
| NanoBot | Email sender verification 加固 |
| ZeroClaw | gateway auth config 写入后未 live apply 到 RPC authority |

**趋势判断：**  
随着 Agent 接入邮件、IM、文件系统、浏览器、MCP、企业 API，安全边界已成为核心竞争力。未来成熟项目需要提供 **凭证遮蔽、权限模型、审计 provenance、callback secret、配置应用回执** 等机制。

---

### 4.6 CI、构建与发布工程

涉及项目：**OpenClaw、Hermes Agent、ZeroClaw、NanoBot、ZeptoClaw、Moltis、LobsterAI**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | test bin packing、owner paths gating、主干 CI 成本控制 |
| Hermes Agent | 文档补齐、更新 receipt、Windows rcedit retry |
| ZeroClaw | Telegram flaky、fmt 队列、compile job runner label |
| NanoBot | v0.3.5 release checklist、五平台 TUI 打包 |
| ZeptoClaw | Dependabot 批量升级 GitHub Actions / Docker / Rust |
| Moltis | BuildKit cache mounts 缓存 Cargo |
| LobsterAI | workspace runtime tarball 打包，避免 patched/unpatched 混用 |

**趋势判断：**  
Agent 项目复杂度快速上升后，CI/CD 不再是外围问题，而是决定合并速度、发布质量和贡献者体验的关键基础设施。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 | 当前主要风险 |
|---|---|---|---|---|
| **OpenClaw** | 通用 Agent Runtime、插件、MCP/LSP、WebUI、长期运行服务 | 开发者、平台构建者、自托管用户 | 插件化 runtime、SQLite/queue、Gateway、MCP 集成 | PR 积压、安全边界验证、WebUI P2 UX |
| **NanoBot** | 跨 TUI/WebUI/聊天渠道的统一助手 | 个人用户、轻量自托管、跨入口使用者 | Python distribution + Native TUI + WebUI + channels | Dream 后台任务循环、并发文件写入 |
| **Hermes Agent** | 高功能密度 Agent 平台、Desktop、Skills、长上下文 | 高级开发者、Desktop 用户、复杂自动化用户 | Gateway、Skills、Desktop、更新系统、长上下文压缩 | 安全泄露、compression livelock、更新链路复杂 |
| **NanoClaw** | 多 Gateway、凭证与 Provider 认证架构 | 企业 / 高级部署、自托管网关用户 | Gateway contract、OneCLI/Iron Proxy、Provider credential connections | 大规模架构重构集成风险 |
| **LobsterAI** | OpenClaw 下游应用 / 桌面集成兼容 | OpenClaw 生态用户、桌面应用用户 | Electron / OpenClaw runtime 集成、兼容补丁层 | OpenClaw 升级迁移风险 |
| **CoPaw/QwenPaw** | 工作台、实时语音、企业渠道、多 Agent | 企业用户、桌面用户、多模态工作流用户 | Console Workbench、语音、WeChat/WeCom、ACP、多 Agent | 文件 I/O 阻塞、多模态附件 URL、功能扩张带来的质量压力 |
| **ZeroClaw** | ZeroCode、Anthropic 多模态、Provider 缓存 | 代码智能体用户、多模态 Agent 开发者 | Provider 深度适配、ZeroCode、CI 并行测试 | 多模态上下文一致性、CI flaky |
| **ZeptoClaw** | 依赖维护、Rust/Docs/CI 栈 | 维护者、Rust 开发者 | Rust + Astro Docs + Docker/GitHub Actions | 用户互动低、依赖 PR 积压 |
| **Moltis** | Rust 镜像构建效率 | 贡献者、CI/CD 维护者 | Docker BuildKit + Cargo cache | 活跃度低，产品信号弱 |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代阶段

代表项目：**Hermes Agent、OpenClaw、ZeroClaw、CoPaw/QwenPaw、NanoBot、NanoClaw**

特征：

- PR/Issue 密集；
- 功能与稳定性修复并行；
- 多 Provider、多通道、多端入口快速扩展；
- CI、升级、权限、长上下文等系统性问题集中暴露。

其中：

- **Hermes Agent**：社区反馈最密集，功能覆盖广，但稳定性债务最高。
- **OpenClaw**：修复密度高，运行时工程质量较强，维护队列压力明显。
- **ZeroClaw**：围绕 Anthropic 多模态和 CI 稳定性高频修复，技术问题较集中。
- **CoPaw/QwenPaw**：产品功能扩张快，企业/桌面/语音/工作区方向明显。
- **NanoBot**：发布 v0.3.5，产品叙事清晰，正从聊天助手转向多入口工作台。
- **NanoClaw**：架构重构强烈，处于 Gateway / 凭证体系升级期。

### 6.2 质量巩固阶段

代表项目：**LobsterAI、ZeptoClaw、Moltis**

- **LobsterAI**：围绕 OpenClaw 升级后兼容问题进行高密度修复，是典型“版本迁移稳定化”阶段。
- **ZeptoClaw**：主要是 Dependabot 依赖更新，说明维护链路仍在，但缺少用户侧信号。
- **Moltis**：仅有构建缓存优化，属于低噪声基础设施维护。

### 6.3 静默或低活动项目

代表项目：**PicoClaw、NullClaw、IronClaw、TinyClaw**

这些项目过去 24 小时无活动。单日无活动不能说明项目停滞，但相较第一梯队，其社区反馈和维护节奏明显较弱。

---

## 7. 值得关注的趋势信号

### 趋势 1：Agent 产品正在从“聊天”走向“工作台”

NanoBot 的 v0.3.5、CoPaw/QwenPaw 的 unified Workbench、ZeroClaw 的 ZeroCode Dock、Hermes 的 Desktop/session stamp、OpenClaw 的 WebUI 打磨都指向同一方向：  
**AI 助手需要管理任务、文件、队列、工具、历史、上下文和多端状态，而不仅是响应一条消息。**

对开发者的参考价值：

- UI 设计应支持长任务、任务切换和上下文查看；
- 文件、终端、工具、审批、计划应成为一等公民；
- 会话连续性比单次响应质量更重要。

---

### 趋势 2：长上下文能力的瓶颈在 Runtime，而不仅是模型

Hermes 的 compression livelock、NanoBot 的 Dream 循环、LobsterAI 的输出预算饥饿、ZeroClaw 的 image marker token 估算，都说明长上下文问题已经进入工程深水区。

对开发者的参考价值：

- 需要设计明确的 compaction state machine；
- 压缩结果 commit 要可验证、可回滚；
- 工具结果、图片、审计事实不能在压缩中丢失；
- 需要 loop detection、iteration cap、timeout、fallback policy。

---

### 趋势 3：多 Provider 兼容正在变成核心护城河

OpenAI-compatible、Anthropic、Ollama、DeepSeek、Mistral、Codex、OpenCode、xAI、local gateway、自定义邮件服务器等都在不同项目中出现。  
兼容工作不再只是 API endpoint 配置，而包括：

- tool_calls 与 assistant content 共存；
- streaming idle timeout；
- image URL schema；
- Anthropic cache breakpoint；
- local/private IP 安全放行；
- Provider alias 与 model discovery；
- OAuth / API key / gateway credential lifecycle。

对开发者的参考价值：

- Provider abstraction 要足够细，不应只抽象 chat completion；
- capability catalog 应包含多模态、缓存、reasoning effort、streaming、timeout、工具调用格式；
- provider-specific bug 需要统一回归测试。

---

### 趋势 4：安全与凭证治理将决定企业采用

Hermes 的凭证落盘、NanoClaw 的 Mattermost callback secret、OpenClaw 的 cancellation 权限、ZeroClaw 的 gateway auth live apply、NanoBot 的 Email sender verification，都说明 Agent 系统的安全边界正在被真实使用场景检验。

对开发者的参考价值：

- 凭证不得进入日志、argv、diagnostic dump；
- Gateway / Provider / Channel 权限边界要清晰；
- 配置保存后要能追踪是否被运行时消费者实际应用；
- callback、webhook、IM action 必须有认证和 secret rotation 策略；
- Agent 的 task cancellation、tool invocation、file access 都应有权限模型。

---

### 趋势 5：插件化与 Gateway 化是扩展性的主流架构

OpenClaw 的插件生命周期治理、Hermes 的 Skills、NanoClaw 的 Gateway skill、ZeroClaw 的 Provider alias、NanoBot 的 MCP catalog 都表明：  
未来 AI Agent 框架很可能通过 **core runtime + plugin/skill/gateway + provider catalog** 的方式扩展。

对开发者的参考价值：

- 插件 reload 要考虑旧 generation 释放；
- registry、timer、cached error、loader scope 都可能导致内存保留；
- gateway 不应与 provider login 强耦合；
- skill/plugin 安装应具备事务性与回滚能力；
- catalog 搜索和文档可发现性会影响生态增长。

---

### 趋势 6：CI/CD 与升级系统成为成熟项目的分水岭

OpenClaw、ZeroClaw、Hermes、NanoBot、LobsterAI、ZeptoClaw、Moltis 都在处理 CI、构建、发布或升级问题。  
这说明 Agent 项目的复杂度已经接近大型系统工程，维护效率会显著影响社区贡献和版本质量。

对开发者的参考价值：

- 必须控制 CI wall time 和 flaky tests；
- 大型 PR 应拆分，安全边界修复应独立验证；
- 发布 checklist、平台 wheel、runtime dependency closure 很重要；
- 升级失败 receipt、doctor repair、迁移元数据需要标准化。

---

## 结论

今日生态最核心的判断是：**个人 AI 助手 / 自主智能体开源项目正在快速从 Demo 型应用迈向复杂平台型系统。**

- **OpenClaw** 处于平台运行时第一梯队，优势在插件系统、MCP/Agent runtime、长期运行稳定性和工程化修复密度。
- **Hermes Agent** 社区最热、覆盖面最广，但也暴露最多高风险稳定性问题。
- **NanoBot、CoPaw/QwenPaw、ZeroClaw、NanoClaw** 分别在多入口工作台、桌面/企业集成、多模态代码智能体、Gateway 凭证架构上形成差异化。
- **LobsterAI** 展示了下游产品集成 OpenClaw 时必须面对的升级兼容与迁移恢复问题。

对技术决策者而言，短期选型应重点关注：  
**运行时稳定性、长上下文治理、Provider 兼容深度、插件生命周期、安全边界、升级路径、CI 成熟度**。  
对开发者而言，最值得投入的方向是：  
**可观测的 Agent Runtime、可靠的上下文压缩、可插拔 Gateway/Provider、跨端工作台、安全凭证治理和高质量回归测试体系**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报｜2026-09-16

## 1. 今日速览

过去 24 小时 NanoBot 活跃度较高：共有 **3 条 Issue 更新**、**12 条 PR 更新**，并发布了 **v0.3.5** 新版本。今日工作重点集中在 **终端 / WebUI 工作台体验、Dream 后台任务稳定性、上下文压缩通知噪音、文件工具并发安全、Provider 兼容性与 WebUI 可用性**。  
从 PR 状态看，已有 **7 条 PR 合并或关闭**，另有 **5 条仍待处理**，说明维护节奏较快，但部分修复仍处于验证阶段。整体来看，项目处于快速迭代期，近期核心方向是把 NanoBot 从单一聊天体验扩展为跨 **浏览器、终端、聊天渠道** 的统一智能体工作台，同时继续修补后台任务和多渠道使用中的稳定性问题。

---

## 2. 版本发布

### v0.3.5 发布

- Release：<https://github.com/HKUDS/nanobot/releases/tag/v0.3.5>
- 相关公告 Issue：[#5788](https://github.com/HKUDS/nanobot/issues/5788)
- Release 准备 PR：[#5785](https://github.com/HKUDS/nanobot/pull/5785)
- Native TUI 打包 PR：[#5787](https://github.com/HKUDS/nanobot/pull/5787)

本次 **v0.3.5** 的主线是：**“one agent, more places to work”**，即同一个 NanoBot 智能体可以在更多入口中持续工作，包括：

- 原生终端客户端：`nanobot`
- 浏览器 WebUI：`nanobot webui`
- 聊天应用渠道中的持续对话

从 Release 描述和相关 PR 看，v0.3.5 重点强化了 **终端工作台体验** 与 **跨入口会话连续性**。用户可以在浏览器、终端、聊天渠道之间切换，而不必重新建立上下文。

#### 重要变化

1. **Native TUI 被打包进平台 wheels**
   - PR：[#5787](https://github.com/HKUDS/nanobot/pull/5787)
   - 支持的 PyPI 平台 wheel 可直接启动原生 TUI。
   - 减少首次运行时从 GitHub 下载 TUI 或额外安装 Bun 的需求。
   - 对普通用户而言，安装和启动路径更顺滑。

2. **版本号与发布流程更新**
   - PR：[#5785](https://github.com/HKUDS/nanobot/pull/5785)
   - Python distribution 版本和 source-only fallback 更新为 `0.3.5`。
   - 新增端到端 release checklist，覆盖候选版本检查、五平台 TUI 打包、source fallback 等发布流程。

3. **WebUI 截图和文档正在同步更新**
   - PR：[#5789](https://github.com/HKUDS/nanobot/pull/5789)
   - README WebUI 图集将刷新，覆盖新主题 composer、多面板 workbench、上下文使用情况、缓存复用、MCP catalog、Automations 日历等界面。

#### 破坏性变更

当前数据中 **未显示明确的 breaking change**。  
但需要注意：

- TUI 打包方式发生变化，依赖 Native TUI 的安装、发布、校验链路有所调整。
- Dream 配置项相关行为正在修复中，见 [#5781](https://github.com/HKUDS/nanobot/issues/5781) 与 [#5782](https://github.com/HKUDS/nanobot/pull/5782)。如果用户依赖 `dream.maxIterations`，需要关注新版本或后续 patch 中配置项的实际生效方式。

#### 迁移注意事项

- 使用 PyPI 安装并依赖终端 TUI 的用户，建议升级后验证 `nanobot` 命令是否能直接启动原生 TUI。
- 使用 scheduled Dream / Dream consolidation 的用户，建议重点观察后台任务耗时和 tool-call 次数，避免受全局 200 iteration 上限影响。
- 使用 QQ、Email 等 channel 的自托管用户，建议关注今日多个渠道相关修复，尤其是上下文压缩通知和 Email sender verification。

---

## 3. 项目进展

### 已合并 / 已关闭的重要 PR

#### 1. 修复 Dream 迭代上限失效问题

- PR：[#5782 fix(dream): enforce configured iteration limit](https://github.com/HKUDS/nanobot/pull/5782)
- 关联 Issue：[#5781](https://github.com/HKUDS/nanobot/issues/5781)

该 PR 恢复了独立的 `agents.defaults.dream.maxIterations` 设置，默认值为 15，并将其应用到手动和定时 Dream runs。  
此前 Dream 任务会回退到全局 `maxToolIterations`，导致卡住时可能跑满 200 次 tool-call。这个修复直接针对今日最严重的稳定性反馈。

**项目推进意义：**  
显著降低后台 Dream consolidation 进入长时间循环的风险，提升无人值守任务的可控性。

---

#### 2. 平台 wheels 内置 Native TUI

- PR：[#5787 build: bundle native TUI in platform wheels](https://github.com/HKUDS/nanobot/pull/5787)

该 PR 将 Native TUI 打包到平台 wheels 中，使支持平台上的 PyPI 安装可以直接启动终端客户端，不再依赖首次运行时从 GitHub 下载或单独安装 Bun。

**项目推进意义：**  
这是 v0.3.5 “workbench to the terminal” 的基础工程改进，明显降低终端工作台的使用门槛。

---

#### 3. 准备 v0.3.5 发布

- PR：[#5785 chore(release): prepare v0.3.5](https://github.com/HKUDS/nanobot/pull/5785)

完成版本号更新和 release checklist 增补，但该 PR 本身不发布 tag、GitHub Release、PyPI 包或文档部署。

**项目推进意义：**  
提升发布流程规范性，尤其覆盖多平台 TUI 打包和 source-only fallback，对未来版本发布质量有长期帮助。

---

#### 4. WebUI 分段控件动画重构

- PR：[#5786 refactor(webui): animate segmented control indicator](https://github.com/HKUDS/nanobot/pull/5786)

该 PR 将分段控件的选中态背景替换为一个可测量、可移动的 indicator，并加入水平 overshoot、宽度 easing 和 reduced-motion 支持。

**项目推进意义：**  
属于体验打磨类改进，改善 WebUI 设置项和外观选择器的交互细节。

---

#### 5. 修复 Provider 历史消息中 tool_calls 与 assistant content 共存问题

- PR：[#5783 fix(providers): preserve assistant content with tool calls](https://github.com/HKUDS/nanobot/pull/5783)

该 PR 停止从同时包含 `tool_calls` 的 assistant 历史消息中剥离 `content`。维护者认为当前 provider schemas 和示例允许同时 replay 两个字段，包括 Mistral，因此移除了拟议中的兼容性设置，并新增回归测试和文档说明。

**项目推进意义：**  
提升多 Provider 兼容性，降低复杂 tool-call 会话在历史重放时的信息丢失风险。

---

#### 6. 修复 read_file 去重作用域问题

- PR：[#5775 fix(tools): scope file-read dedup to model context](https://github.com/HKUDS/nanobot/pull/5775)

此前 `read_file` 可能在原始输出已被上下文压缩或裁剪后，仍返回 unchanged-file stub。修复后，去重逻辑要求原始读取结果仍完整保留在当前模型请求中，并且文件内容和请求范围一致。

**项目推进意义：**  
减少模型基于缺失文件内容继续推理的风险，与今日 Dream 重复读取问题存在间接关联。

---

#### 7. 加固 Email sender verification

- PR：[#5778 fix(email): require trusted authentication results](https://github.com/HKUDS/nanobot/pull/5778)

该 PR 强化 Email 入站边界的发件人验证，要求显式配置接收服务，结构化解析 authentication results，并检查认证身份与可见 sender domain 的一致性。

**项目推进意义：**  
提升 Email channel 安全性，减少伪造发件人带来的安全风险。对于把 NanoBot 接入自动化邮件处理的用户尤为重要。

---

## 4. 社区热点

### 1. Dream 长时间循环与配置失效

- Issue：[#5781 Dream runs for 1–2 h looping on the same read_file calls](https://github.com/HKUDS/nanobot/issues/5781)
- 评论数：3
- 状态：Open
- 相关修复 PR：[#5782](https://github.com/HKUDS/nanobot/pull/5782)

这是今日最值得关注的问题。用户报告 scheduled Dream consolidation 会运行 **25–111 分钟**，最多接近 **200 次 tool-call**，并反复读取相同两个文件。更关键的是，用户配置的 `dream.maxIterations` 被标记为 deprecated 或被忽略，实际回退到全局 200 iteration cap。

**背后诉求：**

- 后台任务必须可控，不能长时间占用资源。
- 配置项不能“看似存在但实际无效”。
- Dream consolidation 需要更强的循环检测和停止条件。
- `read_file` 去重、上下文压缩、Dream 任务之间存在联动，需要系统性验证。

该问题已有 PR [#5782](https://github.com/HKUDS/nanobot/pull/5782) 处理迭代上限，但是否完全解决重复读取和无效推理循环，还需要后续观察。

---

### 2. QQ 渠道收到自动上下文压缩通知噪音

- Issue：[#5784](https://github.com/HKUDS/nanobot/issues/5784)
- 状态：Open
- 评论数：1
- 相关 PR：[#5780](https://github.com/HKUDS/nanobot/pull/5780)

用户在自托管 NanoBot 并使用 QQ channel 时，发现 idle auto-compaction 会把生命周期提示作为普通聊天消息发送给用户：

> Compressing context…  
> Context compacted.

用户认为这与此前 #5719 属于同类噪音问题。由于 QQ channel 没有原生方式折叠这些通知，这些内部状态消息会直接污染聊天体验。

**背后诉求：**

- 自动后台维护行为不应打扰用户。
- `/compact` 主动命令可以保留提示，但 idle auto-compaction 应静默。
- 多 channel 需要根据渠道能力区分“系统状态”和“用户可见消息”。

PR [#5780](https://github.com/HKUDS/nanobot/pull/5780) 正在处理该问题：隐藏 autocompaction notices，同时保留 `/compact` 的显式提示。

---

### 3. v0.3.5 发布公告

- Issue：[#5788](https://github.com/HKUDS/nanobot/issues/5788)
- Release：<https://github.com/HKUDS/nanobot/releases/tag/v0.3.5>

发布公告本身暂无评论，但结合多个 release 相关 PR，可以看出社区和维护者当前重点是推进终端工作台、WebUI、跨入口对话连续性。

---

## 5. Bug 与稳定性

按影响程度排序如下。

### 高优先级：Dream consolidation 长时间循环

- Issue：[#5781](https://github.com/HKUDS/nanobot/issues/5781)
- 状态：Open
- Fix PR：[#5782](https://github.com/HKUDS/nanobot/pull/5782)，已关闭 / 合并状态待以 GitHub 为准
- 影响范围：scheduled Dream、后台上下文整理、长期运行实例

**问题表现：**

- Dream run 运行 25–111 分钟。
- 重复调用 `read_file`。
- 配置的 `dream.maxIterations` 不生效。
- 实际可能跑到全局 200 iteration cap。

**风险：**

- 增加 API 成本。
- 长时间占用资源。
- 后台任务可能影响前台响应。
- 用户难以通过配置限制风险。

---

### 中高优先级：自动上下文压缩通知泄露到聊天渠道

- Issue：[#5784](https://github.com/HKUDS/nanobot/issues/5784)
- PR：[#5780](https://github.com/HKUDS/nanobot/pull/5780)
- 状态：Issue Open，PR Open
- 影响范围：QQ channel，可能也影响其他无法折叠系统消息的聊天渠道

**问题表现：**

- idle auto-compaction 发送普通聊天消息。
- 用户收到内部生命周期提示。
- 破坏聊天体验。

**当前修复方向：**

- 自动压缩通知静默。
- `/compact` 主动命令仍保留用户可见反馈。

---

### 中优先级：并发文件写入可能导致内容截断或丢失

- PR：[#5779 fix(tools): serialize concurrent session file writes](https://github.com/HKUDS/nanobot/pull/5779)
- 状态：Open，且带有 conflict 标签
- 关联 Issue：#4798

**问题表现：**

`write_file`、`edit_file`、`apply_patch` 等 session file-tool 写路径此前没有按路径加互斥锁。两个并发 session 可能交错写入，导致：

- 字节 interleave
- 文件截断
- 更新静默丢失

**风险：**

这类问题对代码生成、自动修复、多智能体并行任务影响较大。当前 PR 仍有冲突，需要维护者尽快处理。

---

### 中优先级：移动端 drawer 自动聚焦到 search button

- PR：[#5777 fix(webui): stop mobile drawer stealing focus to search button](https://github.com/HKUDS/nanobot/pull/5777)
- 状态：Open
- 关联 Issue：#5770

**问题表现：**

移动端打开 drawer 时，`SheetContent` 会 autofocus 第一个可 tab 控件，导致焦点落到搜索按钮。该 PR 改为阻止 Radix 默认 autofocus，并聚焦 dialog container。

**影响：**

主要是移动端可用性和无障碍体验问题，不属于数据安全或核心稳定性问题，但会影响移动 WebUI 使用流畅度。

---

### 中优先级：Provider 历史消息丢失 assistant content

- PR：[#5783](https://github.com/HKUDS/nanobot/pull/5783)
- 状态：Closed
- 影响范围：包含 `tool_calls` 的 assistant 历史消息、多 Provider replay

**修复意义：**

避免在历史消息重放时丢失 assistant content，提升工具调用链路的可解释性和复现能力。

---

### 中低优先级：read_file 去重可能在上下文裁剪后返回 stub

- PR：[#5775](https://github.com/HKUDS/nanobot/pull/5775)
- 状态：Closed

**修复意义：**

确保 `read_file` 的 dedup 仅在原始读取结果仍在当前模型上下文中时生效，减少模型基于不存在上下文继续执行的风险。

---

### 安全相关：Email sender verification 加固

- PR：[#5778](https://github.com/HKUDS/nanobot/pull/5778)
- 状态：Closed

**修复意义：**

要求可信 authentication results，降低邮件入口被伪造 sender 滥用的风险。

---

## 6. 功能请求与路线图信号

### 1. WebUI 文档与展示素材更新

- PR：[#5789 docs: refresh README WebUI screenshots](https://github.com/HKUDS/nanobot/pull/5789)
- 状态：Open

该 PR 更新 README WebUI 图集，覆盖：

- 新主题 hero composer
- 多面板 workbench
- context usage
- cache reuse
- MCP catalog
- Automations calendar
- Tasks 与 Calendar 当前视图

**路线图信号：**  
NanoBot 正在将 WebUI 作为核心入口之一进行包装和展示，README 不再只是安装说明，而是在向用户展示完整工作台能力。

---

### 2. Settings 中 Provider Picker 增加搜索

- PR：[#5776 feat(webui): add search to provider pickers in settings](https://github.com/HKUDS/nanobot/pull/5776)
- 状态：Open

该 PR 在 Settings 的 provider pickers 中加入搜索 / 过滤能力，包括：

- “Add your own model provider”
- 按 provider name 和 label 过滤
- “Custom provider” 固定在顶部
- 无匹配时展示空状态

**路线图信号：**  
随着支持的模型 Provider 增多，NanoBot 的设置界面需要从简单列表升级为可搜索配置界面。这说明项目正在面向更多模型后端和更复杂部署场景。

---

### 3. 自动上下文压缩通知可控化

- Issue：[#5784](https://github.com/HKUDS/nanobot/issues/5784)
- PR：[#5780](https://github.com/HKUDS/nanobot/pull/5780)

虽然这是以 bug 形式出现，但实际也反映出一个产品功能诉求：**系统内部维护消息需要有 channel-aware 的展示策略**。  
未来可能演化为：

- 自动压缩静默
- 手动压缩提示
- 按 channel 配置通知策略
- 系统消息与用户消息分离

---

### 4. Dream 任务配置重新明确

- Issue：[#5781](https://github.com/HKUDS/nanobot/issues/5781)
- PR：[#5782](https://github.com/HKUDS/nanobot/pull/5782)

用户诉求不仅是 bug fix，还涉及配置语义。`dream.maxIterations` 被标记 deprecated 或忽略，导致用户无法控制后台任务。  
后续路线图可能需要：

- 清晰文档化 Dream 配置项
- 明确 default 与 global tool iteration 的关系
- 增加 loop detection
- 增加 scheduled job timeout / cancellation 策略

---

## 7. 用户反馈摘要

### 痛点 1：后台智能体任务失控，成本和时间不可预测

来自 [#5781](https://github.com/HKUDS/nanobot/issues/5781)。  
用户实际运行 scheduled Dream consolidation 时，任务持续 1–2 小时，重复读取同样文件，最多接近 200 次工具调用。这说明长期运行型智能体最核心的用户担忧是：

- 能否被配置限制？
- 是否会无限循环？
- 是否会浪费 token / API 成本？
- 是否会影响系统稳定性？

用户对 `dream.maxIterations` 无效尤其敏感，因为这意味着“看起来可以控制，实际上控制不了”。

---

### 痛点 2：内部系统状态消息污染真实聊天

来自 [#5784](https://github.com/HKUDS/nanobot/issues/5784)。  
QQ channel 用户明确指出，自动上下文压缩的生命周期通知以普通消息形式出现，会造成噪音。对聊天渠道用户而言，他们期望 NanoBot 像自然聊天助手一样工作，而不是暴露内部 housekeeping 流程。

这类反馈说明：  
跨渠道支持不只是协议适配，还需要考虑每个渠道的消息展示能力和用户心理预期。

---

### 痛点 3：移动端 WebUI 交互细节仍需打磨

来自 [#5777](https://github.com/HKUDS/nanobot/pull/5777)。  
移动端 drawer 打开后焦点被搜索按钮抢走，虽然不是核心功能错误，但会让移动端使用体验显得不稳定、不自然。对于将 WebUI 作为主入口之一的项目来说，这类交互细节会直接影响用户留存。

---

### 痛点 4：Provider 与工具调用历史需要更高兼容性

来自 [#5783](https://github.com/HKUDS/nanobot/pull/5783)。  
用户和维护者都在处理 tool-call 消息结构与多 Provider schema 的兼容问题。保留 assistant content 与 tool_calls 同时存在，是保障历史 replay 完整性的关键。

---

## 8. 待处理积压

> 当前数据仅覆盖过去 24 小时，无法完整判断“长期未响应”项目。以下列出今日仍处于 Open 或需要维护者继续关注的关键事项。

### 1. 并发文件写入序列化 PR 存在冲突

- PR：[#5779 fix(tools): serialize concurrent session file writes](https://github.com/HKUDS/nanobot/pull/5779)
- 状态：Open，带 conflict
- 建议优先级：高

这是一个底层数据一致性问题。若并发 session 同时修改同一路径，可能造成文件损坏或更新丢失。建议维护者优先解决 merge conflict 并补充并发写入测试。

---

### 2. 自动上下文压缩通知静默化仍待合并

- PR：[#5780](https://github.com/HKUDS/nanobot/pull/5780)
- 关联 Issue：[#5784](https://github.com/HKUDS/nanobot/issues/5784)
- 状态：Open
- 建议优先级：中高

该问题影响 QQ channel 用户体验，也可能影响其他聊天渠道。建议尽快确认产品语义：自动压缩是否默认静默，是否需要配置项控制。

---

### 3. 移动端 drawer 聚焦修复仍待处理

- PR：[#5777](https://github.com/HKUDS/nanobot/pull/5777)
- 状态：Open
- 建议优先级：中

该修复影响移动端 WebUI 体验和 accessibility。建议尽快 review，避免 v0.3.5 推广 WebUI / workbench 时出现移动端体验瑕疵。

---

### 4. Provider picker 搜索功能待合并

- PR：[#5776](https://github.com/HKUDS/nanobot/pull/5776)
- 状态：Open
- 建议优先级：中

随着 Provider 数量增加，搜索能力会显著改善设置页可用性。该功能与 NanoBot 多模型、多 Provider 方向一致，适合纳入后续小版本。

---

### 5. README WebUI 截图更新待合并

- PR：[#5789](https://github.com/HKUDS/nanobot/pull/5789)
- 状态：Open
- 建议优先级：中

v0.3.5 已发布，文档和截图应尽快同步，以免用户看到的 README 与实际 WebUI 不一致。特别是当前版本重点宣传 WebUI / terminal workbench，文档准确性会影响新用户转化。

---

## 项目健康度评估

NanoBot 今日整体健康度较好：发布节奏活跃，PR 响应迅速，多个用户反馈已有对应修复 PR。项目正在从“可用的 AI 助手”向“跨终端、浏览器、聊天渠道的统一智能体工作台”演进。  
主要风险集中在后台任务控制、上下文压缩副作用、并发文件写入和多渠道消息体验。若 [#5781](https://github.com/HKUDS/nanobot/issues/5781)、[#5780](https://github.com/HKUDS/nanobot/pull/5780)、[#5779](https://github.com/HKUDS/nanobot/pull/5779) 能尽快稳定落地，v0.3.5 系列的可用性和可信度会进一步提升。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
日期：2026-09-16  
仓库：NousResearch/hermes-agent  
数据窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时 Hermes Agent 维持了**极高活跃度**：Issues 更新 50 条，其中 48 条仍处于新开或活跃状态；PR 更新 50 条，其中 46 条仍待合并。今日没有新版本发布，说明项目仍处于高频修复与功能迭代阶段，而非正式发版窗口。

从议题分布看，今日重点集中在 **上下文压缩稳定性、更新流程、网关/客户端竞态、Desktop/Windows 体验、OAuth/MCP、会话管理与第三方集成**。多个 Issue 已经出现对应 Fix PR，例如 MCP OAuth 崩溃、一次性会话污染、TUI Gateway 响应竞态、Windows rcedit 升级失败等，显示维护者响应速度较快。

整体健康度判断：**社区反馈非常活跃，缺陷暴露充分，修复 PR 跟进积极；但当前 backlog 中高严重度稳定性问题较多，尤其是长上下文、更新系统、凭据泄露与工具循环防护，短期内仍存在较高回归风险。**

---

## 2. 项目进展

> 今日数据显示有 4 个 PR 已合并或关闭，但提供的 PR 明细主要为仍处于 OPEN 状态的 20 个高关注 PR，因此以下以“今日推进中的关键 PR”为主，并标注其推进意义。已合并/关闭 PR 的具体编号与内容在当前数据中未展开，无法逐条核验。

### 关键修复推进

- [PR #112569](https://github.com/NousResearch/hermes-agent/pull/112569) — `fix(mcp): skip malformed cached OAuth redirect_uris instead of crashing`  
  对应 [Issue #112568](https://github.com/NousResearch/hermes-agent/issues/112568)。修复 MCP OAuth 缓存中的 malformed `redirect_uris` 导致每次 OAuth 流程崩溃的问题。该修复会提升 MCP 服务器接入稳定性，避免用户必须手动删除缓存文件。

- [PR #112563](https://github.com/NousResearch/hermes-agent/pull/112563) — `fix(gateway): prevent lost prompt answers and legacy client stalls`  
  对应 [Issue #112548](https://github.com/NousResearch/hermes-agent/issues/112548)。解决审批、澄清、secret prompt 的用户回答可能被 timeout/interrupt 竞态覆盖的问题，同时避免老客户端在不支持 server-to-client request 时导致 agent 挂起到完整 deadline。属于较关键的交互可靠性修复。

- [PR #112559](https://github.com/NousResearch/hermes-agent/pull/112559) — `fix(tui_gateway): make server request settlement atomic`  
  同样指向网关请求结算竞态问题。通过在共享 settlement lock 下移除 pending entry 并提交结果，保证第一个终态结果获胜，减少提示响应丢失。

- [PR #112564](https://github.com/NousResearch/hermes-agent/pull/112564) — `fix(sessions): keep one-shot runs out of interactive session lists`  
  对应 [Issue #112550](https://github.com/NousResearch/hermes-agent/issues/112550)。修复 `hermes chat -q` 和一次性运行被错误持久化为 `source="tui"`，从而污染 WebUI/TUI 会话列表的问题。

- [PR #112561](https://github.com/NousResearch/hermes-agent/pull/112561) — `fix(cli): keep finite one-shot sessions out of TUI lists`  
  与 #112564 目标高度相似，说明该问题已有多个修复路径或存在重复 PR，需要维护者尽快去重并确定最终实现。

- [PR #112552](https://github.com/NousResearch/hermes-agent/pull/112552) — `fix(desktop): retry transient rcedit commit failures`  
  对应 [Issue #112544](https://github.com/NousResearch/hermes-agent/issues/112544)。通过对 Windows 桌面升级中的 `rcedit "Unable to commit changes"` 做有限重试，降低 Windows 升级失败概率。

- [PR #112549](https://github.com/NousResearch/hermes-agent/pull/112549) — `fix(update): retain failed update receipts after state loss`  
  修复更新失败后 receipt 丢失的问题。该类修复对诊断失败升级、自动恢复与用户支持非常重要。

- [PR #112546](https://github.com/NousResearch/hermes-agent/pull/112546) — `hermes plugins install rolls back or repairs an unreadable plugin tree instead of shipping it`  
  对应 [Issue #111804](https://github.com/NousResearch/hermes-agent/issues/111804)。增强插件安装事务性：如果安装后插件树不可读，则修复或回滚，避免留下半坏状态。

- [PR #112547](https://github.com/NousResearch/hermes-agent/pull/112547) — `fix(docker): carry deploy-injected Nous routing overrides into every profile .env`  
  修复托管 staging 实例启动后丢失 Nous login/routing override 的问题，影响 Docker 多 profile 部署场景。

### 功能与体验改进推进

- [PR #112566](https://github.com/NousResearch/hermes-agent/pull/112566) — `feat(sessions): per-session stamp label`  
  为 session 增加短标签/印章，例如 `Merged`、`WIP`、`Review`、`Handoff`、`Hold`。这是面向多会话工作流的 UX 增强。

- [PR #112565](https://github.com/NousResearch/hermes-agent/pull/112565) — `feat(skills): Windows tray optional-skill with live agent-status dot`  
  新增 Windows 系统托盘可选 skill，带实时 agent 状态点。属于 OS-specific 的轻量周边能力，采用 optional-skill 形式较符合低侵入设计。

- [PR #112551](https://github.com/NousResearch/hermes-agent/pull/112551) — `plugin-catalog: add memobase memory provider`  
  将 memobase memory provider 加入 plugin catalog，延续插件化记忆后端路线。

- [PR #112556](https://github.com/NousResearch/hermes-agent/pull/112556)、[PR #112555](https://github.com/NousResearch/hermes-agent/pull/112555)、[PR #112553](https://github.com/NousResearch/hermes-agent/pull/112553)  
  分别补充 `hermes skills`、`hermes sessions`、`hermes update` 的 CLI 文档缺口，说明当前 CLI 实际能力增长快于文档维护，文档同步正在补齐。

---

## 3. 社区热点

### 1. 上下文压缩 livelock 与压缩失败链路

- [Issue #112482](https://github.com/NousResearch/hermes-agent/issues/112482) — Compression livelock  
  评论数：3  
  诉求：在超大 session，约 200K+ tokens 场景下，context compression 会进入 livelock。summarizer 完成后，候选结果却被无实际工作的 no-op entries 判定为 superseded 并丢弃，导致 commit 永远无法落地。  
  分析：这是今日最值得关注的核心稳定性问题之一。Hermes Agent 的长上下文能力是其关键卖点，如果压缩提交机制在高 token session 下不可靠，会直接影响长期会话、复杂任务与记忆能力。

- [Issue #112420](https://github.com/NousResearch/hermes-agent/issues/112420) — Compaction stall 后继续无压缩执行  
  评论数：1  
  诉求：压缩无进展后系统继续执行，但上下文仍超预算，下一轮再次触发压缩，形成反复 120s+ 的延迟与系统提示重建漂移。  
  分析：与 #112482 同属上下文管理稳定性问题，反映用户在长任务中遇到“每轮都被压缩拖慢”的实际痛点。

- [Issue #112387](https://github.com/NousResearch/hermes-agent/issues/112387) — stall backoff 抑制同轮 fallback retry  
  评论数：1  
  诉求：压缩主路由 stall 后，fallback chain 原本可用，但被同一次尝试记录的 stall backoff 阻止，导致最终报 `Context compression timed out`。  
  分析：说明压缩 fallback 策略存在状态机交互问题，需要维护者统一审视 compression attempt、backoff 与 fallback_chain 的关系。

### 2. 安全与依赖风险

- [Issue #112382](https://github.com/NousResearch/hermes-agent/issues/112382) — WhatsApp bridge body-parser override 固定在 vulnerable 1.20.6  
  评论数：3  
  诉求：`scripts/whatsapp-bridge/package.json` 中 `overrides.body-parser` 固定到了 advisory 所覆盖的脆弱版本，导致 fresh install 仍有 3 个 moderate npm advisories，包括 transitive `qs` CVE。  
  分析：这是明确的供应链安全问题，影响 WhatsApp bridge 用户与部署方的安全信心，应优先处理。

- [Issue #112459](https://github.com/NousResearch/hermes-agent/issues/112459) — shutdown forensics 将子进程 argv 中的 live credentials 写入磁盘  
  评论数：1  
  诉求：shutdown diagnostic log 中包含 `ps`/`pstree` 的完整 argv，而子进程常携带 `LINEAR_API_KEY`、`SUPABASE_*` 等凭据。  
  分析：该问题严重程度高于普通 bug，因为涉及本地凭据落盘和诊断日志外传风险。应尽快遮蔽 argv 中的敏感字段，或默认禁用完整命令行采集。

### 3. 网关与客户端交互竞态

- [Issue #112548](https://github.com/NousResearch/hermes-agent/issues/112548) — resolve_response/cancel race、旧客户端 deadline stall、文档命名问题  
  评论数：1  
  已有 PR：[PR #112563](https://github.com/NousResearch/hermes-agent/pull/112563)、[PR #112559](https://github.com/NousResearch/hermes-agent/pull/112559)  
  诉求：用户回答 approval/clarify 时，若 timeout 或 interrupt 同时触发，回答可能被静默丢失；旧客户端可能导致 agent 卡到完整 deadline。  
  分析：这是 agent 交互闭环中的基础可靠性问题。已有多个 PR 跟进，预计较可能进入下一轮修复版本。

### 4. Desktop / Windows 更新体验

- [Issue #112544](https://github.com/NousResearch/hermes-agent/issues/112544) — Windows Desktop upgrade 间歇性 rcedit 失败  
  评论数：0  
  已有 PR：[PR #112552](https://github.com/NousResearch/hermes-agent/pull/112552)  
  诉求：Windows 桌面升级中 `rcedit "Unable to commit changes"` 间歇性阻塞升级。  
  分析：影响 Windows 桌面用户升级路径，虽然不是核心运行时缺陷，但直接影响用户留存与版本采用率。

---

## 4. Bug 与稳定性

以下按严重程度和潜在影响排序。

### P0 / 高风险：安全、数据泄露、长任务失效

1. [Issue #112459](https://github.com/NousResearch/hermes-agent/issues/112459) — shutdown forensics 写入 live credentials  
   - 类型：安全 / 凭据泄露  
   - 影响：API key、数据库密钥等可能进入本地诊断日志  
   - Fix PR：当前数据中未见对应 PR  
   - 建议：立即对 argv/env 进行 secret redaction；对诊断日志增加安全模式；补测试覆盖常见 `*_API_KEY`、`TOKEN`、`SECRET`、`PASSWORD`。

2. [Issue #112482](https://github.com/NousResearch/hermes-agent/issues/112482) — Compression livelock  
   - 类型：长上下文 / 任务可用性  
   - 影响：大 session 下压缩永远无法 commit，任务反复失败或卡顿  
   - Fix PR：当前数据中未见对应 PR  
   - 建议：修正 superseded 判定，区分 no-op/lock-contended entries 与真实候选；增加 200K+ tokens 压力测试。

3. [Issue #112420](https://github.com/NousResearch/hermes-agent/issues/112420) — Compaction stall 后反复重试  
   - 类型：长上下文 / 性能退化  
   - 影响：每轮都被压缩耗时拖慢，可能重复重建 drifted system prompt  
   - Fix PR：当前数据中未见对应 PR  
   - 建议：stall 后应有明确降级策略、用户可见状态与防重入机制。

4. [Issue #112535](https://github.com/NousResearch/hermes-agent/issues/112535) — tool-loop guardrail hard stop 默认关闭  
   - 类型：工具调用安全 / 成本控制  
   - 影响：相同工具调用可循环数百次，软警告不阻断  
   - Fix PR：当前数据中未见对应 PR  
   - 建议：重新评估 `hard_stop_enabled` 默认值，至少对完全相同 no-progress 工具调用启用硬停止。

5. [Issue #112382](https://github.com/NousResearch/hermes-agent/issues/112382) — WhatsApp bridge vulnerable body-parser pin  
   - 类型：供应链安全  
   - 影响：npm advisory 仍存在，包含 transitive `qs` CVE  
   - Fix PR：当前数据中未见对应 PR  
   - 建议：升级 override 至安全版本并补充 npm audit CI 检查。

### P1：交互可靠性、更新系统、OAuth、运行时状态损坏

6. [Issue #112548](https://github.com/NousResearch/hermes-agent/issues/112548) — prompt answer race / legacy client stall  
   - 类型：网关交互竞态  
   - Fix PR：[PR #112563](https://github.com/NousResearch/hermes-agent/pull/112563)、[PR #112559](https://github.com/NousResearch/hermes-agent/pull/112559)  
   - 状态：已有修复推进，优先 review。

7. [Issue #112568](https://github.com/NousResearch/hermes-agent/issues/112568) — MCP OAuth malformed cached `redirect_uris` 崩溃  
   - 类型：MCP / OAuth 缓存健壮性  
   - Fix PR：[PR #112569](https://github.com/NousResearch/hermes-agent/pull/112569)  
   - 状态：已有直接修复。

8. [Issue #112571](https://github.com/NousResearch/hermes-agent/issues/112571) — SQLite runtime repair 丢失 lazy-installed backends  
   - 类型：运行时修复 / 依赖保留  
   - 影响：Telegram、Hindsight、edge-tts、Bedrock 等后端在 repair 后被移除  
   - Fix PR：当前数据中未见对应 PR  
   - 建议：repair swap 前后保留 lazy feature capture，并在 up-to-date path 恢复依赖。

9. [Issue #112558](https://github.com/NousResearch/hermes-agent/issues/112558) — `hermes update` activation path 无 receipt、post-pull stale sys.modules ImportError  
   - 类型：更新系统 / 诊断可追踪性  
   - 相关 PR：[PR #112549](https://github.com/NousResearch/hermes-agent/pull/112549) 处理 failed update receipt 相关问题，但不一定完全覆盖 #112558  
   - 建议：统一 update receipt 生命周期；处理 post-pull Python 模块缓存污染。

10. [Issue #112522](https://github.com/NousResearch/hermes-agent/issues/112522) — `hermes update` gateway-restart ImportError  
    - 类型：更新系统 / atexit 清理  
    - Fix PR：当前数据中未见明确对应 PR  
    - 建议：检查更新后进程内旧模块引用与 atexit callback 的导入路径。

11. [Issue #112419](https://github.com/NousResearch/hermes-agent/issues/112419) — streaming 0 chars recovered 后静默继续  
    - 类型：流式响应恢复 / agent 行为重复  
    - 影响：模型可能重复执行已丢失动作，用户无感知  
    - Fix PR：当前数据中未见对应 PR  
    - 建议：0 字符 partial-stream 应标记为失败或显式告知模型/用户。

12. [Issue #112473](https://github.com/NousResearch/hermes-agent/issues/112473) — HTTP 400 oversized request 未触发 image-shrink recovery  
    - 类型：多 provider 兼容性 / 图像请求恢复  
    - 影响：NVIDIA NIM、Alibaba DashScope、Nebius Token Factory 等 provider  
    - Fix PR：当前数据中未见对应 PR  
    - 建议：扩展 oversized 判断，不仅依赖 HTTP 413。

### P2：桌面、会话、集成、平台兼容

13. [Issue #112544](https://github.com/NousResearch/hermes-agent/issues/112544) — Windows Desktop rcedit upgrade failure  
    - Fix PR：[PR #112552](https://github.com/NousResearch/hermes-agent/pull/112552)

14. [Issue #112550](https://github.com/NousResearch/hermes-agent/issues/112550) — one-shot jobs 污染 WebUI/TUI session lists  
    - Fix PR：[PR #112564](https://github.com/NousResearch/hermes-agent/pull/112564)、[PR #112561](https://github.com/NousResearch/hermes-agent/pull/112561)

15. [Issue #112538](https://github.com/NousResearch/hermes-agent/issues/112538) — Windows Desktop profile delete WinError 32  
    - 类型：Windows 文件锁 / profile 删除  
    - Fix PR：当前数据中未见对应 PR

16. [Issue #112529](https://github.com/NousResearch/hermes-agent/issues/112529) — TUN fake-ip DNS 下 SSRF guard 拒绝所有 fetch  
    - 类型：网络环境兼容 / SSRF 防护误判  
    - Fix PR：当前数据中未见对应 PR

17. [Issue #112527](https://github.com/NousResearch/hermes-agent/issues/112527) — messaging gateway 长会话不 commit 到 OpenViking  
    - 类型：记忆后端 / 长会话  
    - Fix PR：当前数据中未见对应 PR

18. [Issue #112518](https://github.com/NousResearch/hermes-agent/issues/112518) — SSH setup wizard 无法将端口重置为默认 22  
    - 类型：配置向导 / env 清理  
    - Fix PR：当前数据中未见对应 PR

19. [Issue #112517](https://github.com/NousResearch/hermes-agent/issues/112517) — Dashboard 将已停止 profile 的历史启动失败展示为当前错误  
    - 类型：Dashboard 状态归因  
    - Fix PR：当前数据中未见对应 PR

20. [Issue #112501](https://github.com/NousResearch/hermes-agent/issues/112501) — steer message 在 turn 运行中渲染顺序错误  
    - 类型：Desktop UI / transcript ordering  
    - Fix PR：当前数据中未见对应 PR

21. [Issue #112534](https://github.com/NousResearch/hermes-agent/issues/112534) — `probe_api_models` 对 bare array `/models` 响应崩溃  
    - 状态：Issue 已关闭  
    - 类型：OpenAI-compatible provider 兼容性  
    - 备注：当前数据未显示对应 PR，但关闭说明可能已修复、重复或无效。

---

## 5. 功能请求与路线图信号

### 明确功能请求

1. [Issue #112514](https://github.com/NousResearch/hermes-agent/issues/112514) — Hermes Desktop Setup 支持 remote gateway only  
   - 用户诉求：安装 Desktop 时希望只连接远程 gateway，不被强制安装本地 Hermes。  
   - 路线图信号：Hermes Desktop 正在从“本地一体化”走向“远程 gateway 客户端”使用场景。若远程部署用户增长，该需求很可能进入 Desktop setup 改进计划。

2. [PR #112566](https://github.com/NousResearch/hermes-agent/pull/112566) — per-session stamp label  
   - 功能方向：会话组织、状态标记、handoff/workflow 管理。  
   - 纳入概率：较高。PR 已实现 UI/交互语义，且与多会话 agent 工作流契合。

3. [PR #112565](https://github.com/NousResearch/hermes-agent/pull/112565) — Windows tray optional skill  
   - 功能方向：桌面常驻、状态可视化、Windows 用户体验。  
   - 纳入概率：中等偏高。采用 optional-skill 形式降低核心侵入，适合合并。

4. [Issue #112503](https://github.com/NousResearch/hermes-agent/issues/112503) — Skills Hub search 对 centralized index 外的 skill 返回空  
   - 用户诉求：skills.sh 上存在且有安装量的 skill，在 Hermes Skills Hub 搜索不到。  
   - 路线图信号：技能发现机制需要兼顾中心索引与实际生态内容，可能推动 Skills Hub 搜索源扩展或同步机制改进。

5. [PR #112551](https://github.com/NousResearch/hermes-agent/pull/112551) — 添加 memobase memory provider  
   - 功能方向：记忆后端生态扩展。  
   - 纳入概率：较高。plugin catalog 单 YAML entry，范围清晰。

### 文档与 CLI 可发现性信号

- [PR #112556](https://github.com/NousResearch/hermes-agent/pull/112556) — 补齐 `hermes skills` 5 个未记录子命令  
- [PR #112555](https://github.com/NousResearch/hermes-agent/pull/112555) — 补齐 `hermes sessions` 5 个未记录子命令  
- [PR #112553](https://github.com/NousResearch/hermes-agent/pull/112553) — 补齐 `hermes update` 6 个未记录 flags  

这些 PR 反映出 Hermes CLI 功能增长很快，但文档存在滞后。短期路线图中，“让现有能力可发现、可理解”可能和新增功能同等重要。

---

## 6. 用户反馈摘要

### 主要不满意点

1. **长上下文场景不稳定**  
   多个用户报告 compression livelock、compaction stall、fallback 被 backoff 抑制等问题。真实痛点是：长会话或复杂任务中，用户希望 agent 能自然延续上下文，但系统反复压缩、超时或继续无效执行，造成高延迟和任务中断。  
   相关链接：  
   - [Issue #112482](https://github.com/NousResearch/hermes-agent/issues/112482)  
   - [Issue #112420](https://github.com/NousResearch/hermes-agent/issues/112420)  
   - [Issue #112387](https://github.com/NousResearch/hermes-agent/issues/112387)

2. **更新与安装路径仍不够可靠**  
   用户在 `hermes update`、Desktop upgrade、SQLite runtime repair 中遇到 receipt 缺失、ImportError、rcedit 失败、lazy backend 丢失等问题。反馈表明，Hermes 的自动更新链路已经覆盖较多平台和场景，但状态恢复与失败诊断还不够成熟。  
   相关链接：  
   - [Issue #112558](https://github.com/NousResearch/hermes-agent/issues/112558)  
   - [Issue #112522](https://github.com/NousResearch/hermes-agent/issues/112522)  
   - [Issue #112544](https://github.com/NousResearch/hermes-agent/issues/112544)  
   - [Issue #112571](https://github.com/NousResearch/hermes-agent/issues/112571)

3. **多客户端/多 gateway 交互存在边界竞态**  
   用户反馈 approval、clarify、secret prompt 的回答可能丢失，旧客户端可能让 agent 卡住。这反映出 Hermes 正在支持越来越复杂的多端交互，但协议兼容和并发控制还需要加强。  
   相关链接：  
   - [Issue #112548](https://github.com/NousResearch/hermes-agent/issues/112548)  
   - [PR #112563](https://github.com/NousResearch/hermes-agent/pull/112563)  
   - [PR #112559](https://github.com/NousResearch/hermes-agent/pull/112559)

4. **安全边界与诊断工具之间存在冲突**  
   用户明确指出 shutdown forensics 将 credentials 写入磁盘、body-parser 仍在 vulnerable range、SSRF guard 在 fake-ip DNS 环境误杀所有 fetch。这类反馈说明 Hermes 的安全机制正在被真实部署环境检验，需要更细粒度和更少误伤。  
   相关链接：  
   - [Issue #112459](https://github.com/NousResearch/hermes-agent/issues/112459)  
   - [Issue #112382](https://github.com/NousResearch/hermes-agent/issues/112382)  
   - [Issue #112529](https://github.com/NousResearch/hermes-agent/issues/112529)

5. **桌面用户希望更清晰的本地/远程模式选择**  
   remote gateway only 安装诉求说明部分用户已经将 Hermes 作为远程服务使用，而 Desktop 更像客户端。当前 setup 流程未清晰支持这一模式。  
   相关链接：  
   - [Issue #112514](https://github.com/NousResearch/hermes-agent/issues/112514)

### 正向信号

- 用户报告质量较高，很多 Issue 包含具体复现、版本、平台、代码位置与根因推测。
- 多个 bug 在同日已有 PR 响应，说明维护者和社区贡献者响应活跃。
- 功能 PR 多采用较低侵入设计，例如 optional skill、plugin catalog、文档补齐，显示项目架构正在向模块化扩展。

---

## 7. 待处理积压

> 当前数据窗口仅覆盖过去 24 小时，无法严格判断“长期未响应”。以下列出的是今日暴露但尚未看到明确 Fix PR 的高优先级积压，建议维护者优先 triage。

### 高优先级待处理

1. [Issue #112459](https://github.com/NousResearch/hermes-agent/issues/112459) — shutdown forensics 写入 live credentials  
   - 原因：安全风险高，可能导致凭据落盘。  
   - 建议优先级：P0。

2. [Issue #112482](https://github.com/NousResearch/hermes-agent/issues/112482) — Compression livelock  
   - 原因：影响长上下文核心能力。  
   - 建议优先级：P0/P1。

3. [Issue #112382](https://github.com/NousResearch/hermes-agent/issues/112382) — WhatsApp bridge vulnerable dependency pin  
   - 原因：明确依赖漏洞，修复边界较清晰。  
   - 建议优先级：P1。

4. [Issue #112535](https://github.com/NousResearch/hermes-agent/issues/112535) — tool-loop guardrail 默认不硬停止  
   - 原因：可能造成 runaway loop、成本失控和外部工具滥用。  
   - 建议优先级：P1。

5. [Issue #112571](https://github.com/NousResearch/hermes-agent/issues/112571) — SQLite runtime repair 丢失 lazy backends  
   - 原因：repair 操作反而破坏已安装能力，影响多个 backend。  
   - 建议优先级：P1。

6. [Issue #112419](https://github.com/NousResearch/hermes-agent/issues/112419) — 空 partial-stream stub 静默继续  
   - 原因：可能导致模型重复执行丢失动作，用户无感知。  
   - 建议优先级：P1。

7. [Issue #112473](https://github.com/NousResearch/hermes-agent/issues/112473) — HTTP 400 oversized request 未触发图片缩小恢复  
   - 原因：影响多个 OpenAI-compatible / multimodal provider。  
   - 建议优先级：P2/P1，取决于使用量。

8. [Issue #112529](https://github.com/NousResearch/hermes-agent/issues/112529) — fake-ip DNS 环境 SSRF guard 误杀  
   - 原因：影响 TUN proxy 用户的所有 fetch 能力。  
   - 建议优先级：P2，但对相关网络环境用户是阻塞性问题。

### 需要去重或合并讨论的 PR / Issue

- [PR #112564](https://github.com/NousResearch/hermes-agent/pull/112564) 与 [PR #112561](https://github.com/NousResearch/hermes-agent/pull/112561)  
  两者均处理 one-shot sessions 污染 TUI/WebUI 会话列表问题，对应 [Issue #112550](https://github.com/NousResearch/hermes-agent/issues/112550)。建议维护者尽快确认采用哪一路实现，避免重复 review 与冲突。

- [PR #112563](https://github.com/NousResearch/hermes-agent/pull/112563) 与 [PR #112559](https://github.com/NousResearch/hermes-agent/pull/112559)  
  两者都涉及 server request settlement / prompt response 竞态。建议合并设计思路，确保 gateway 与 TUI gateway 行为一致。

---

## 总体判断

Hermes Agent 今日表现出典型的高速开源项目特征：**问题报告密集、社区贡献活跃、修复 PR 跟进快，但稳定性债务明显增加**。短期最应关注的方向是：

1. 长上下文压缩链路的状态机与 fallback 可靠性；
2. 更新/安装/repair 流程的事务性和可诊断性；
3. 凭据与依赖安全；
4. 多客户端网关交互的并发一致性；
5. Desktop 与远程 gateway 使用模式的体验优化。

如果今日这些高优先级 PR 能快速 review 并合并，Hermes Agent 的下一个版本很可能以**稳定性修复、Windows/Desktop 体验、CLI 文档补齐、session/workflow UX 改进**为主要内容。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
日期：2026-09-16  
仓库：github.com/qwibitai/nanoclaw

## 1. 今日速览

过去 24 小时 NanoClaw 活跃度较高：共有 **1 条 Issue 更新**、**16 条 PR 更新**，其中 **9 条仍待合并**、**7 条已合并或关闭**。今日工作重心明显集中在 **网关/凭证架构重构、Provider 认证、Mattermost/Telegram 通道安全与兼容性、Host 性能优化** 等方向。  
项目当前处于较密集的架构演进期，尤其是围绕 **OneCLI、Iron Proxy、凭证网关 contract、Provider 登录流程** 的一组 PR，显示维护团队正在为下一阶段的多网关、多 Provider 认证能力打基础。  
稳定性方面，今日出现一个较关键的升级流程问题：`/update-nanoclaw` 在 cutover drain 阶段可能永远无法完成，属于需要优先处理的更新/运维阻塞类 Bug。整体来看，项目健康度良好，维护响应活跃，但待合并 PR 数量较多，短期集成风险上升。

---

## 3. 项目进展

### 3.1 已合并/关闭的重要 PR

#### 1. Webhook 测试端口分配改进，降低 CI/本地测试抖动
- PR：[#3830 test(webhook): allocate free ports from the kernel instead of picking them at random](https://github.com/qwibitai/nanoclaw/pull/3830)  
- 状态：Closed  
- 领域：configuration / core  
- 影响：此前 webhook 相关测试通过随机选择端口，可能因为端口冲突导致 `EADDRINUSE`。该 PR 改为由内核分配空闲端口，提升测试稳定性。  
- 项目推进：属于典型的稳定性修复，有助于减少 flaky tests，提升 CI 可信度。

#### 2. Cross-session context 性能优化，降低唤醒路径延迟
- PR：[#3829 perf(cross-session-context): bound echo fan to the hot set, off the wake path](https://github.com/qwibitai/nanoclaw/pull/3829)  
- 状态：Closed  
- 领域：core / sessions  
- 影响：将跨 session 的 echo fan 从消息关键路径移出，并限制在 conversation 的 hot set 中，避免唤醒延迟随 sibling sessions 数量增长。  
- 项目推进：这是对多 session 场景下可扩展性的关键优化，说明项目正在解决真实并发使用场景中的性能瓶颈。

#### 3. Provider tone contract 落地到 Codex
- PR：[#3827 refactor(codex): use the provider tone contract](https://github.com/qwibitai/nanoclaw/pull/3827)  
- 状态：Closed  
- 领域：agent-runner / providers  
- 影响：Codex Provider 改为通过统一的 provider tone contract 声明 `friendly` 默认 tone 和 `personality` 映射。  
- 项目推进：减少 Provider 侧特殊逻辑，为统一 Provider 配置模型打基础。

#### 4. Provider 默认 tone 配置能力
- PR：[#3826 feat(providers): declare default tone settings](https://github.com/qwibitai/nanoclaw/pull/3826)  
- 状态：Closed  
- 领域：agent-runner / providers  
- 影响：允许 Provider 在 runtime contract 中声明默认 tone 及其原生 settings 映射。核心运行时负责解析并传递给 provider factory。  
- 项目推进：这是 Provider 抽象能力增强，后续有助于不同模型/Provider 在行为风格上保持一致配置入口。

#### 5. Git worktree 目录忽略
- PR：[#3822 Ignore .worktrees/](https://github.com/qwibitai/nanoclaw/pull/3822)  
- 状态：Closed  
- 领域：repository-maintenance  
- 影响：将 `.worktrees/` 加入 `.gitignore`，避免本地 worktree 目录污染 `git status`。  
- 项目推进：小型维护改进，改善开发者体验。

#### 6. Telegram skill credential check 支持自定义 API Base URL
- PR：[#3821 fix(add-telegram): the credential check curls TELEGRAM_API_BASE_URL when set](https://github.com/qwibitai/nanoclaw/pull/3821)  
- 状态：Closed  
- 领域：channels / skills  
- 影响：`/add-telegram` skill 的两个 `getMe` credential check 此前硬编码 `https://api.telegram.org`，在使用本地 Bot API server 或测试 façade 时会失败。该 PR 使其遵循 `TELEGRAM_API_BASE_URL`。  
- 项目推进：提升 Telegram 集成在本地测试、模拟环境和私有部署场景下的可用性。

#### 7. Telegram channel 内部 fetch 支持 TELEGRAM_API_BASE_URL
- PR：[#3820 fix(telegram): the channel's own fetches honour TELEGRAM_API_BASE_URL, like the adapter](https://github.com/qwibitai/nanoclaw/pull/3820)  
- 状态：Closed  
- 领域：channels  
- 影响：Telegram channel 中用于 `getMe`、`sendMessage`、`getChat` 的 fetch 之前硬编码官方 API 地址。该 PR 使其与 adapter 行为一致，支持 `TELEGRAM_API_BASE_URL`。  
- 项目推进：修复 Telegram 本地/代理环境下的集成不一致问题，与 #3821 形成配套。

---

### 3.2 待合并但方向明确的重要 PR

#### 1. Host session reconcile 与 delivery poll 并发化
- PR：[#3832 perf(host): reconcile and drain sessions concurrently; fixed-rate delivery polls](https://github.com/qwibitai/nanoclaw/pull/3832)  
- 状态：Open  
- 领域：core  
- 影响：将 Host 周期性 per-session loop 并行化，避免 tick 时间随 sessions × mailbox latency 线性增长。  
- 判断：这是高价值性能 PR，若合并，将明显改善多 session/远程 mailbox 条件下的调度延迟。

#### 2. Mattermost callback 安全迁移文档
- PR：[#3831 docs(mattermost): add callback migration guidance to the skill](https://github.com/qwibitai/nanoclaw/pull/3831)  
- 状态：Open  
- 领域：channels / skills  
- 影响：为 `/add-mattermost` skill 增加 callback security 迁移说明，覆盖空 secret、adapter refresh、旧卡片重发、泄露 secret 轮换等情况。  
- 判断：与 #3823 的安全修复互补，有助于降低用户升级后的配置误用风险。

#### 3. OpenCode 支持通过 Iron Proxy 认证
- PR：[#3825 feat(opencode): support authentication through Iron Proxy](https://github.com/qwibitai/nanoclaw/pull/3825)  
- 状态：Open  
- 领域：providers / setup-installation / skills  
- 影响：允许 OpenCode 通过选定的 Iron gateway 使用 API key 或原生 ChatGPT 登录，凭证存储与 OAuth refresh 由 Iron Control 管理。  
- 判断：这是多网关认证路线的重要组成部分，可能进入下一版本。

#### 4. Provider credential connection interface
- PR：[#3824 refactor(gateway): add provider credential connections](https://github.com/qwibitai/nanoclaw/pull/3824)  
- 状态：Open  
- 领域：setup-installation / skills  
- 影响：新增共享凭证连接接口，让 Agent Provider 描述认证需求，而不直接拥有 gateway 管理 API。  
- 判断：是网关抽象的基础设施 PR，和 #3815、#3816、#3817、#3818、#3825 构成同一条架构主线。

#### 5. Mattermost callback 认证与 action secret 隔离
- PR：[#3823 fix(mattermost): authenticate callbacks and isolate action secrets](https://github.com/qwibitai/nanoclaw/pull/3823)  
- 状态：Open  
- 领域：channels / repository-maintenance  
- 影响：要求配置 callback 时必须使用非空 secret，默认拒绝未认证 action，并使用 `timingSafeEqual` 等方式降低 secret 比较风险。  
- 判断：安全优先级较高，建议尽快审查合并。

#### 6. Advanced setup 支持选择 gateway
- PR：[#3818 feat(setup): select the gateway without changing provider login](https://github.com/qwibitai/nanoclaw/pull/3818)  
- 状态：Open  
- 领域：providers / setup-installation  
- 影响：Simple setup 继续默认 OneCLI，Advanced setup 暴露 gateway selection，同时 Provider login 与 gateway selection 解耦。  
- 判断：明确指向下一阶段安装体验与企业/高级部署灵活性。

#### 7. 新增 Iron Proxy gateway skill
- PR：[#3817 feat(skills): add the Iron Proxy gateway](https://github.com/qwibitai/nanoclaw/pull/3817)  
- 状态：Open  
- 领域：skills / repository-maintenance  
- 影响：新增可安装的 Iron Proxy gateway，并将 Iron Control 作为可选 gateway；OneCLI 仍保持默认。  
- 判断：是今日最重要的功能路线信号之一，表明 NanoClaw 正从单一网关模式转向多网关生态。

#### 8. OneCLI 抽取为可安装 gateway skill
- PR：[#3816 refactor(gateway): extract OneCLI into an installable skill](https://github.com/qwibitai/nanoclaw/pull/3816)  
- 状态：Open  
- 领域：agent-runner / configuration / core / credentials / providers / security / setup-installation 等  
- 影响：将 OneCLI 安装与运行时集成迁移到 gateway skill 中，setup、认证、升级、移除、agent guidance 均通过 gateway seam。  
- 判断：大规模架构重构 PR，影响面广，合并前需要重点关注回归测试和迁移兼容性。

#### 9. 集中化 credential gateway contract
- PR：[#3815 refactor(gateway): centralize the credential gateway contract](https://github.com/qwibitai/nanoclaw/pull/3815)  
- 状态：Open  
- 领域：channels / configuration / containers / core / credentials / providers / security / sessions 等  
- 影响：将 gateway contributions、provider-owned domains、session leases、approval decisions 汇总到一个 host-owned contract 下。  
- 判断：这是整组 gateway 重构的底座，短期风险较高，但长期有利于安全、凭证生命周期和人工审批流程的一致性。

---

## 4. 社区热点

今日没有明显的高评论或高反应讨论：所有提供的数据中，Issue 评论数为 0，PR 评论数未给出或为 undefined，点赞数均为 0。尽管互动指标不高，但从 PR 密度和主题集中度来看，热点主要集中在以下几个方向：

### 4.1 多 Gateway 与 Provider 凭证架构
- 相关 PR：
  - [#3815 centralize the credential gateway contract](https://github.com/qwibitai/nanoclaw/pull/3815)
  - [#3816 extract OneCLI into an installable skill](https://github.com/qwibitai/nanoclaw/pull/3816)
  - [#3817 add the Iron Proxy gateway](https://github.com/qwibitai/nanoclaw/pull/3817)
  - [#3818 select the gateway without changing provider login](https://github.com/qwibitai/nanoclaw/pull/3818)
  - [#3824 add provider credential connections](https://github.com/qwibitai/nanoclaw/pull/3824)
  - [#3825 support authentication through Iron Proxy](https://github.com/qwibitai/nanoclaw/pull/3825)
- 背后诉求：项目需要支持更多凭证管理方式、更灵活的网关选择，以及更清晰的 Provider 登录边界。这通常来自更复杂的企业部署、本地部署、安全隔离和多 Provider 使用需求。

### 4.2 通道安全与 callback 认证
- 相关 PR：
  - [#3823 fix(mattermost): authenticate callbacks and isolate action secrets](https://github.com/qwibitai/nanoclaw/pull/3823)
  - [#3831 docs(mattermost): add callback migration guidance to the skill](https://github.com/qwibitai/nanoclaw/pull/3831)
- 背后诉求：Mattermost action callback 需要更强认证和 secret 隔离，避免外部 button integration 获取 adapter 共享 secret。该方向体现出项目对通道安全模型的加固。

### 4.3 多 session 性能与 Host 调度可扩展性
- 相关 PR：
  - [#3829 perf(cross-session-context): bound echo fan to the hot set, off the wake path](https://github.com/qwibitai/nanoclaw/pull/3829)
  - [#3832 perf(host): reconcile and drain sessions concurrently; fixed-rate delivery polls](https://github.com/qwibitai/nanoclaw/pull/3832)
- 背后诉求：随着 session 数量增长，Host 的串行循环、delivery poll、cross-session fan-out 会成为延迟瓶颈。当前优化显示维护者正在主动提升大规模会话场景下的性能。

---

## 5. Bug 与稳定性

### 严重级别：高

#### 1. `/update-nanoclaw` cutover drain 可能永远无法成功
- Issue：[#3828 update: cutover drain can never succeed — the service is stopped before the containers it waits on](https://github.com/qwibitai/nanoclaw/issues/3828)  
- 状态：Open  
- 作者：laydros  
- 评论：0  
- 问题摘要：`/update-nanoclaw` 在 cutover 时先停止 host service，然后轮询等待 agent containers 退出。但 host 正是负责停止 idle containers 的组件，而且 host 的 shutdown path 会有意保留这些容器运行，因此 drain 阶段可能无法完成。  
- 影响判断：这是更新流程中的阻塞性问题，可能导致用户在有 agent container 运行时无法完成升级切换。  
- 是否已有 fix PR：数据中未看到明确关联的修复 PR。建议维护者优先确认是否可通过调整 stop/drain 顺序、由外部 supervisor 接管 container drain，或在 host 停止前完成容器退出协调来修复。

### 严重级别：中

#### 2. Mattermost callback 未认证与 secret 暴露风险
- PR：[#3823 fix(mattermost): authenticate callbacks and isolate action secrets](https://github.com/qwibitai/nanoclaw/pull/3823)  
- 状态：Open  
- 问题摘要：Mattermost action callback 需要非空 secret，并应默认拒绝未认证 action；同时需要避免外部 button integration 接收 adapter 共享 secret。  
- 影响判断：属于安全稳定性问题，不一定导致立即崩溃，但可能影响集成安全边界。  
- 是否已有 fix PR：已有，见 [#3823](https://github.com/qwibitai/nanoclaw/pull/3823)。配套迁移文档见 [#3831](https://github.com/qwibitai/nanoclaw/pull/3831)。

#### 3. Telegram 本地 Bot API / mock 环境兼容性问题
- PR：
  - [#3820 fix(telegram): the channel's own fetches honour TELEGRAM_API_BASE_URL](https://github.com/qwibitai/nanoclaw/pull/3820)
  - [#3821 fix(add-telegram): the credential check curls TELEGRAM_API_BASE_URL when set](https://github.com/qwibitai/nanoclaw/pull/3821)
- 状态：Closed  
- 问题摘要：Telegram channel 与 add-telegram skill 中部分请求硬编码 `https://api.telegram.org`，导致使用本地 Bot API server 或测试 façade 时失败。  
- 影响判断：影响本地测试、私有代理、mock 环境，对生产官方 Telegram API 使用者影响较小。  
- 是否已有 fix PR：已有并关闭。

### 严重级别：低

#### 4. Webhook 测试随机端口导致偶发 EADDRINUSE
- PR：[#3830 test(webhook): allocate free ports from the kernel instead of picking them at random](https://github.com/qwibitai/nanoclaw/pull/3830)  
- 状态：Closed  
- 问题摘要：测试随机选择端口，可能与系统已有进程冲突。  
- 影响判断：主要影响测试稳定性与 CI 噪音，不直接影响运行时功能。  
- 是否已有 fix PR：已有并关闭。

---

## 6. 功能请求与路线图信号

今日没有新增明确的用户功能请求 Issue，但 PR 活动本身释放了较强路线图信号。

### 6.1 多 Gateway 架构即将成为核心能力
- 相关 PR：
  - [#3815 centralize the credential gateway contract](https://github.com/qwibitai/nanoclaw/pull/3815)
  - [#3816 extract OneCLI into an installable skill](https://github.com/qwibitai/nanoclaw/pull/3816)
  - [#3817 add the Iron Proxy gateway](https://github.com/qwibitai/nanoclaw/pull/3817)
  - [#3818 select the gateway without changing provider login](https://github.com/qwibitai/nanoclaw/pull/3818)
- 判断：该方向很可能进入下一版本或近期主线。项目正在将 OneCLI 从内建路径抽象为可安装 gateway skill，同时引入 Iron Proxy，并允许高级安装选择 gateway。

### 6.2 Provider 认证将更加模块化
- 相关 PR：
  - [#3824 add provider credential connections](https://github.com/qwibitai/nanoclaw/pull/3824)
  - [#3825 support authentication through Iron Proxy](https://github.com/qwibitai/nanoclaw/pull/3825)
- 判断：Provider 不再直接耦合特定 gateway 管理 API，而是通过 shared credential-connection interface 描述认证需求。这意味着后续新增 Provider 或新增认证后端的成本会下降。

### 6.3 Provider tone 配置将走向统一 contract
- 相关 PR：
  - [#3826 declare default tone settings](https://github.com/qwibitai/nanoclaw/pull/3826)
  - [#3827 use the provider tone contract](https://github.com/qwibitai/nanoclaw/pull/3827)
- 判断：Provider 行为风格、默认语气、原生 settings 映射将趋于统一，这对个人 AI 助手场景中的“人格一致性”和多模型切换体验很重要。

### 6.4 通道安全会继续加强
- 相关 PR：
  - [#3823 authenticate callbacks and isolate action secrets](https://github.com/qwibitai/nanoclaw/pull/3823)
  - [#3831 add callback migration guidance](https://github.com/qwibitai/nanoclaw/pull/3831)
- 判断：Mattermost callback 安全加固 likely 会进入近期版本。该方向也可能影响其他 channel 的 callback/action 认证模型。

---

## 7. 用户反馈摘要

今日唯一新增 Issue 为更新流程阻塞问题，且暂无评论，因此可提炼的用户反馈主要来自 Issue 描述本身。

### 7.1 升级过程中的 cutover/drain 体验存在阻塞风险
- Issue：[#3828 update: cutover drain can never succeed](https://github.com/qwibitai/nanoclaw/issues/3828)  
- 用户痛点：当 agent container 正在运行时，用户执行 `/update-nanoclaw` 可能无法完成 cutover，因为服务停止顺序与容器退出机制相互冲突。  
- 使用场景：用户在已有 agent session/container 运行的环境中执行在线更新。  
- 不满意点：升级流程等待条件不可满足，可能表现为更新卡住或无法完成。  
- 建议关注：升级命令应在停止 host 前完成 drain，或明确由更新脚本/外部控制面负责停止 agent containers。

### 7.2 本地/代理 Telegram 环境需要完整支持自定义 API endpoint
- 相关 PR：
  - [#3820](https://github.com/qwibitai/nanoclaw/pull/3820)
  - [#3821](https://github.com/qwibitai/nanoclaw/pull/3821)
- 用户痛点：使用本地 Bot API server、mock façade 或测试环境时，部分流程仍访问 Telegram 官方 API，导致凭证检查或 pairing 流程失败。  
- 项目响应：已有修复 PR 关闭，说明维护团队对非生产官方 API 场景有响应。

### 7.3 安全部署用户需要更明确的 callback secret 迁移指引
- 相关 PR：
  - [#3823](https://github.com/qwibitai/nanoclaw/pull/3823)
  - [#3831](https://github.com/qwibitai/nanoclaw/pull/3831)
- 用户痛点：如果 callback secret 为空、泄露或旧卡片仍在使用，用户需要明确知道如何刷新 adapter、重发 cards、轮换 secret。  
- 项目响应：除代码安全修复外，还新增了 skill 内迁移说明，利于已安装用户接收指导。

---

## 8. 待处理积压

基于今日数据，无法判断“长期未响应”的 Issue 或 PR，因为数据仅覆盖最近 24 小时，且未提供历史未响应时长。不过以下 Open 项目影响面较大，建议维护者优先关注：

### 高优先级

#### 1. 更新 cutover drain 阻塞问题
- Issue：[#3828 update: cutover drain can never succeed](https://github.com/qwibitai/nanoclaw/issues/3828)  
- 原因：直接影响升级流程可靠性，且暂无明确 fix PR。  
- 建议：优先 triage，并关联修复 PR。

#### 2. Gateway contract 大规模重构
- PR：[#3815 refactor(gateway): centralize the credential gateway contract](https://github.com/qwibitai/nanoclaw/pull/3815)  
- 原因：影响 channels、configuration、containers、core、credentials、providers、security、sessions 等多个模块。  
- 建议：拆分审查关注点，确保迁移路径和回滚策略清晰。

#### 3. OneCLI 抽取为 installable gateway skill
- PR：[#3816 refactor(gateway): extract OneCLI into an installable skill](https://github.com/qwibitai/nanoclaw/pull/3816)  
- 原因：涉及 setup、认证、升级、移除、agent guidance 等关键路径。  
- 建议：重点验证现有 OneCLI 配置检测与保留逻辑，避免破坏现有安装。

#### 4. Mattermost callback 安全修复
- PR：[#3823 fix(mattermost): authenticate callbacks and isolate action secrets](https://github.com/qwibitai/nanoclaw/pull/3823)  
- 原因：安全相关，且可能改变已安装用户的 callback 行为。  
- 建议：与 [#3831](https://github.com/qwibitai/nanoclaw/pull/3831) 文档一并审查和发布。

### 中优先级

#### 5. Host 并发 reconcile 与 fixed-rate delivery polls
- PR：[#3832 perf(host): reconcile and drain sessions concurrently](https://github.com/qwibitai/nanoclaw/pull/3832)  
- 原因：性能收益明显，但并发化可能引入竞态条件。  
- 建议：重点检查 session lifecycle、mailbox polling、drain 语义和错误隔离。

#### 6. Iron Proxy gateway 与 OpenCode 认证
- PR：
  - [#3817 feat(skills): add the Iron Proxy gateway](https://github.com/qwibitai/nanoclaw/pull/3817)
  - [#3825 feat(opencode): support authentication through Iron Proxy](https://github.com/qwibitai/nanoclaw/pull/3825)
- 原因：属于新功能主线，依赖 gateway contract 稳定。  
- 建议：等待核心 gateway contract PR 收敛后再合并，避免重复返工。

---

整体结论：NanoClaw 今日开发活跃度高，核心架构正在围绕多 Gateway、统一凭证生命周期和 Provider 认证进行系统性重构。同时，Telegram/Mattermost 通道问题和 Host 性能优化也在推进。短期最需要关注的是 `/update-nanoclaw` 升级阻塞 Issue，以及多项 gateway 相关大 PR 的集成顺序与回归风险。

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

# LobsterAI 项目动态日报｜2026-09-16

项目：LobsterAI  
仓库：<https://github.com/netease-youdao/LobsterAI>  
统计窗口：过去 24 小时

---

## 1. 今日速览

过去 24 小时内，LobsterAI 没有新的 Issue 更新，也没有新版本发布，但 Pull Request 活动非常密集，共有 14 条 PR 更新，其中 13 条已关闭，1 条仍处于待处理状态。  
今日工作重心高度集中在 **OpenClaw 兼容性修复、升级后网关恢复、运行时依赖打包、长会话上下文处理、错误可观测性** 等稳定性议题上。  
从 PR 内容看，项目当前处于一次 OpenClaw 版本升级后的集中修复期，维护者正在快速处理用户日志暴露出的启动失败、历史数据损坏、配置迁移反复写入、运行时依赖不一致等问题。  
社区层面没有公开 Issue 讨论，但多个 PR 明确提到“来自用户日志”“用户反馈”，说明反馈主要可能来自非 GitHub 渠道或内部排查链路。  
整体健康度评估：**开发活跃度高，问题响应速度快；但升级兼容性风险仍然较高，OpenClaw 相关模块是当前主要稳定性焦点。**

---

## 2. 版本发布

过去 24 小时内无新版本发布。

最新 Releases：无。

---

## 3. 项目进展

今日的 PR 主要围绕 OpenClaw 升级后的兼容修复与稳定性增强展开。以下为较重要的更新。

### 3.1 OpenClaw 升级兼容性与网关恢复

#### PR #2683：OpenClaw compatibility repair  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2683>  
状态：Closed  
作者：fisherdaddy  
涉及区域：renderer、build、main、openclaw、cowork

该 PR 是今日较大的兼容性修复集合，覆盖渲染层、主进程、构建、OpenClaw 与 Cowork 相关区域。虽然摘要为空，但结合周边 PR 看，它很可能承接了 OpenClaw 升级后的一系列兼容修复工作，包括网关状态、运行时依赖、旧配置迁移等。

#### PR #2679：升级后网关状态兼容性修复  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2679>  
状态：Closed  
作者：fisherdaddy  
涉及区域：renderer、build、main、openclaw、cowork

该 PR 将原先较简单的“备份配置并重新生成”流程升级为更完整的修复流程，包括：

- 备份 engine data；
- 执行官方 OpenClaw doctor repair；
- 修复升级后损坏的 memory indexes；
- 修复 bundled plugins；
- 在重新生成配置并重启网关前完成兼容性恢复。

这表明维护者已经将升级故障从“配置层面问题”提升为“运行状态与引擎数据一致性问题”来处理，修复力度明显增强。

#### PR #2676：恢复特定范围的网关启动兼容失败  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2676>  
状态：Closed  
作者：btc69m979y-dotcom  
涉及区域：renderer、docs、main、openclaw、cowork

该 PR 针对 OpenClaw 升级后出现的网关启动失败问题：

- 旧 `plugins.bundledDiscovery` 配置可能阻断 session doctor；
- `current_conversation_bindings` 结构错误即使重建配置也无法恢复；
- 弹窗需要优先显示真正的阻断原因，而不是泛化错误。

该修复提升了启动失败场景下的自动恢复能力，也改善了用户侧错误提示的可诊断性。

#### PR #2681：启动时恢复无效的 legacy dreaming state  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2681>  
状态：Closed  
作者：btc69m979y-dotcom  
涉及区域：renderer、build、docs、main、openclaw、cowork

该 PR 处理旧版 Memory Core 中 `memory/.dreams/` JSON 解析失败导致网关启动被阻断的问题。修复策略包括：

- 在当前启动明确命中该错误时才进行恢复；
- 保存完整原始字节；
- 隔离坏源；
- 重新走标准迁移与启动；
- 健康启动后不重复执行恢复逻辑。

这是一个较高价值的稳定性修复，尤其面向长期使用、历史数据较多、升级跨度较大的用户。

---

### 3.2 OpenClaw 运行时依赖与构建修复

#### PR #2686：打包并暂存本地 workspace 依赖  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2686>  
状态：Closed  
作者：fisherdaddy  
涉及区域：build、openclaw

该 PR 修复了 OpenClaw runtime build 中本地 workspace 依赖被替换为 registry 版本的问题。核心问题是：

- `pnpm pack` 会将 `workspace:*` 依赖改写为 registry 版本；
- 这会导致本地 patch 后的 OpenClaw runtime 依赖丢失；
- 最终运行时使用未打补丁的 npm 发布包。

修复方式是从源码打包生产 workspace 闭包，并安装这些 tarball，同时在 build scripts 变更时使缓存 runtime 失效。

该修复对开发环境和发布构建一致性非常关键。

#### PR #2685：保留已 patch 的 workspace runtime dependencies  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2685>  
状态：Closed  
作者：btc69m979y-dotcom  
涉及区域：build、openclaw

该 PR 与 #2686 目标相近，具体修复了 `npm run electron:dev:openclaw` 因缺失 `prepareReplayMessages` export 而失败的问题。原因是 runtime 中混用了：

- 已 patch 的 OpenClaw 代码；
- 未 patch 的 npm 版本 `@openclaw/ai`。

通过安装本地构建的 workspace dependency archives，确保 runtime 依赖包含相同补丁，解决运行时代码与依赖不一致的问题。

---

### 3.3 长会话、上下文压缩与输出预算修复

#### PR #2684：防止启发式输出预算饥饿  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2684>  
状态：Closed  
作者：btc69m979y-dotcom  
涉及区域：docs、main、openclaw

该 PR 处理长会话中普通 Chat Completions 请求被字符估算错误地将输出 token 从 8192 压缩到 1 的问题。该问题会导致：

- 推理模型协议层成功；
- 但返回正文为空；
- 重复续答也无法恢复。

修复思路是保留常规请求的输出额度，由已有 usage 压缩策略和服务端真实超限错误决定恢复。只有当输出额度本身达到或超过整个上下文窗口时，才继续按输入估算收缩。

这是今日最重要的长会话体验修复之一，直接影响实际对话输出质量。

#### PR #2678：保留 compaction summary 格式与审计事实  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2678>  
状态：Closed  
作者：btc69m979y-dotcom  
涉及区域：docs、main、openclaw

该 PR 修复长会话压缩摘要中的两个问题：

- 模型可能被要求同时遵循两个不兼容的 summary template；
- 当完整 summary 重新排序章节后，retention parser fallback 到普通截断时可能丢失必要标题和标识符。

修复后，压缩流程将统一使用调用方选择的 summary format，有助于提升长会话记忆、审计事实保留和上下文连续性。

---

### 3.4 历史会话回放与损坏数据容错

#### PR #2682：校验历史 transcript replay  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2682>  
状态：Closed  
作者：btc69m979y-dotcom  
涉及区域：docs、main、openclaw

该 PR 解决旧任务历史内容块缺失 ID、字段类型错误或为空时，OpenClaw 在请求准备阶段调用字符串方法并抛错的问题。影响表现为：

- 旧任务无法继续；
- 任务反复失败；
- 普通重试无效。

修复包括：

- 在两个历史回放入口增加字段校验；
- 保留可用历史；
- 提供只读工具定位原始异常记录；
- 为 OpenClaw `v2026.8.1` 增加版本补丁；
- 在核心转换与自定义传输入口复用校验器。

该 PR 对历史数据兼容性和长期用户升级体验非常重要。

---

### 3.5 配置同步与模型策略迁移

#### PR #2680：配置同步时保留 model policy  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2680>  
状态：Open  
作者：btc69m979y-dotcom  
涉及区域：main、openclaw

链接：<https://github.com/netease-youdao/LobsterAI/pull/2680>

这是今日唯一仍处于 Open 状态的 PR。它处理 OpenClaw `v2026.8.1` 将旧模型目录物化为 `agents.defaults.modelPolicy` 后，LobsterAI 配置同步又删除这些字段的问题。后果是：

- 未发生业务变化的配置会被反复写入；
- 配置被反复下发；
- 网关调整对象键序后可能再次误判配置变化。

该 PR 的方向是：

- 保留 OpenClaw 迁移结果；
- 避免对象键序变化导致重复同步；
- 保留迁移元数据；
- 维护旧受管模型目录与 allowlist 的匹配关系。

建议维护者优先 review，因为它关系到升级后的配置稳定性和不必要的写入/下发循环。

---

### 3.6 错误详情展示与可观测性

#### PR #2677：恢复 Cowork 技术错误详情  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2677>  
状态：Closed  
作者：btc69m979y-dotcom  
涉及区域：docs、main

该 PR 修复升级到 OpenClaw `2026.8.1` 后，部分请求失败的“技术详情”只显示 provider、model、modelSource，而日志中的异常摘要没有传到错误卡片的问题。

修复后，错误卡片可以恢复展示已脱敏、限长的异常详情，例如：

`Cannot read properties of undefined (reading 'trim')`

这有助于用户和维护者更快定位实际故障，也说明项目在增强错误可观测性方面持续投入。

---

### 3.7 认证存储与计划模式恢复

#### PR #2675：迁移 xAI auth credentials 到 OpenClaw SQLite store  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2675>  
状态：Closed  
作者：fisherdaddy  
涉及区域：build、main、openclaw

该 PR 将 xAI OAuth 凭据迁移到 OpenClaw bundled auth-profiles SQLite store，不再使用手写的 `auth-profiles.json` 和 lock-file 实现。  
这有助于统一凭据存储模型，降低并发读写、锁文件残留和格式分裂带来的维护成本。

#### PR #2674：解决 plan-mode safety recovery 竞态条件  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2674>  
状态：Closed  
作者：fisherdaddy  
涉及区域：main

该 PR 修复 plan mode 安全恢复中的竞态问题：

- 从单一 aborted run id 改为跟踪多个 aborted run ids；
- 避免较晚到达的 lifecycle / agent events 被错误处理；
- 将 lifecycle error fallback 限定到调度它的 execution；
- 防止 stale event 干扰当前运行。

这是一个面向并发和异步事件一致性的稳定性修复。

---

### 3.8 Release 分支 PR

#### PR #2687：Release/2026.9.15  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2687>  
状态：Closed  
作者：liuzhq1986  
涉及区域：renderer、build、docs、main、openclaw、cowork

该 PR 标题显示为 `Release/2026.9.15`，但过去 24 小时没有 GitHub Release 记录。  
因此可以判断该 PR 可能是发布准备、发布分支合并或内部 release 流程的一部分，但尚未形成公开版本发布。

---

## 4. 社区热点

由于过去 24 小时没有 Issue 更新，且 PR 数据中的评论数为 `undefined`、点赞数均为 0，无法基于评论数或反应数严格判断“讨论最活跃”的条目。以下热点根据 PR 影响面、用户反馈指向和涉及模块综合判断。

### 热点一：OpenClaw 升级后的网关启动与状态修复

相关 PR：

- PR #2676：<https://github.com/netease-youdao/LobsterAI/pull/2676>
- PR #2679：<https://github.com/netease-youdao/LobsterAI/pull/2679>
- PR #2681：<https://github.com/netease-youdao/LobsterAI/pull/2681>
- PR #2683：<https://github.com/netease-youdao/LobsterAI/pull/2683>

背后诉求：

用户在升级 OpenClaw 后遇到网关无法启动、旧配置阻断 session doctor、memory/dreaming 状态损坏、engine data 不一致等问题。  
这些问题属于高影响稳定性问题，因为它们会阻止应用进入可用状态。

### 热点二：长会话输出为空与上下文压缩质量

相关 PR：

- PR #2684：<https://github.com/netease-youdao/LobsterAI/pull/2684>
- PR #2678：<https://github.com/netease-youdao/LobsterAI/pull/2678>

背后诉求：

长会话用户需要稳定、连续、可恢复的对话体验。输出 token 被错误压缩到 1、摘要格式冲突、审计事实丢失都会破坏长期任务和深度会话。  
这些修复表明 LobsterAI 正在强化面向复杂会话和长上下文场景的可靠性。

### 热点三：历史任务与旧数据兼容

相关 PR：

- PR #2682：<https://github.com/netease-youdao/LobsterAI/pull/2682>
- PR #2681：<https://github.com/netease-youdao/LobsterAI/pull/2681>

背后诉求：

长期用户升级后，旧任务、旧 memory、旧 transcript 需要继续可用。维护者正在对损坏字段、缺失 ID、旧 JSON 解析失败等问题做更精细的容错处理。

### 热点四：运行时依赖一致性与开发构建可用性

相关 PR：

- PR #2685：<https://github.com/netease-youdao/LobsterAI/pull/2685>
- PR #2686：<https://github.com/netease-youdao/LobsterAI/pull/2686>

背后诉求：

OpenClaw runtime 必须使用本地已 patch 的 workspace 依赖，否则会出现导出缺失、开发命令失败、patch 不生效等问题。  
这类问题影响开发者体验，也影响发布构建的确定性。

---

## 5. Bug 与稳定性

以下按严重程度排序。

### 严重：OpenClaw 升级后网关无法启动

相关 PR：

- PR #2676：<https://github.com/netease-youdao/LobsterAI/pull/2676>
- PR #2679：<https://github.com/netease-youdao/LobsterAI/pull/2679>
- PR #2681：<https://github.com/netease-youdao/LobsterAI/pull/2681>
- PR #2683：<https://github.com/netease-youdao/LobsterAI/pull/2683>

问题表现：

- 旧 `plugins.bundledDiscovery` 配置阻断 session doctor；
- `current_conversation_bindings` 结构错误；
- `memory/.dreams/` JSON 损坏导致启动失败；
- 需要 doctor repair、engine data 备份、memory index 恢复和插件修复。

处理状态：已有多个 Closed PR 覆盖修复。

---

### 严重：长会话输出 token 被错误压缩到 1

相关 PR：

- PR #2684：<https://github.com/netease-youdao/LobsterAI/pull/2684>

问题表现：

- 普通 Chat Completions 请求在长会话中被字符估算错误压缩；
- 模型调用协议成功但正文为空；
- 续答也无法恢复。

处理状态：已有 Closed PR 修复。

---

### 高：历史 transcript replay 中损坏字段导致旧任务无法继续

相关 PR：

- PR #2682：<https://github.com/netease-youdao/LobsterAI/pull/2682>

问题表现：

- 旧任务历史内容块缺失 ID；
- 字段类型错误或为空；
- OpenClaw 请求准备阶段调用字符串方法时抛错；
- 任务反复无法继续。

处理状态：已有 Closed PR 增加字段校验和只读定位工具。

---

### 高：OpenClaw runtime 混用 patched 与 unpatched 依赖

相关 PR：

- PR #2685：<https://github.com/netease-youdao/LobsterAI/pull/2685>
- PR #2686：<https://github.com/netease-youdao/LobsterAI/pull/2686>

问题表现：

- `npm run electron:dev:openclaw` 失败；
- 缺失 `prepareReplayMessages` export；
- `pnpm pack` 将 `workspace:*` 依赖改写为 registry 版本；
- 本地 patch 没有进入 runtime。

处理状态：已有 Closed PR 修复依赖打包和安装策略。

---

### 中高：配置同步删除 OpenClaw 迁移出的 modelPolicy

相关 PR：

- PR #2680：<https://github.com/netease-youdao/LobsterAI/pull/2680>

问题表现：

- OpenClaw 迁移出的 `agents.defaults.modelPolicy` 被 LobsterAI 配置同步删除；
- 配置反复写入和下发；
- 键序变化导致误判配置变化。

处理状态：PR 仍为 Open，尚待合并或关闭。

---

### 中：Cowork 错误卡片缺失真实异常摘要

相关 PR：

- PR #2677：<https://github.com/netease-youdao/LobsterAI/pull/2677>

问题表现：

- 请求失败时技术详情过于简略；
- 只显示 provider、model、modelSource；
- 日志中的异常摘要没有传递到 UI。

处理状态：已有 Closed PR 恢复脱敏、限长错误详情展示。

---

### 中：plan-mode safety recovery 存在竞态条件

相关 PR：

- PR #2674：<https://github.com/netease-youdao/LobsterAI/pull/2674>

问题表现：

- 多个被中止的 run 事件可能晚到；
- 旧 lifecycle / agent events 可能污染当前执行；
- fallback 可能作用到错误 execution。

处理状态：已有 Closed PR 修复。

---

## 6. 功能请求与路线图信号

过去 24 小时没有新的公开 Issue，因此没有直接来自 GitHub Issues 的新功能请求。不过从 PR 方向可以观察到以下路线图信号。

### 6.1 OpenClaw 升级兼容性将继续是短期重点

相关 PR：

- PR #2676：<https://github.com/netease-youdao/LobsterAI/pull/2676>
- PR #2679：<https://github.com/netease-youdao/LobsterAI/pull/2679>
- PR #2681：<https://github.com/netease-youdao/LobsterAI/pull/2681>
- PR #2683：<https://github.com/netease-youdao/LobsterAI/pull/2683>
- PR #2680：<https://github.com/netease-youdao/LobsterAI/pull/2680>

判断：

下一版本很可能继续围绕 OpenClaw `v2026.8.1` 或相邻版本的升级恢复、配置迁移、状态修复展开。当前唯一 Open PR #2680 也与配置迁移一致性相关。

### 6.2 长会话体验与上下文管理正在增强

相关 PR：

- PR #2684：<https://github.com/netease-youdao/LobsterAI/pull/2684>
- PR #2678：<https://github.com/netease-youdao/LobsterAI/pull/2678>

判断：

长上下文压缩、输出预算、摘要格式一致性和审计事实保留，可能成为后续版本持续优化方向。  
这对智能体类应用非常关键，因为长任务、多轮协作和历史记忆质量直接影响用户体验。

### 6.3 认证与配置存储正向 OpenClaw canonical store 收敛

相关 PR：

- PR #2675：<https://github.com/netease-youdao/LobsterAI/pull/2675>

判断：

xAI OAuth 凭据迁移到 OpenClaw SQLite store，说明项目可能继续减少自定义存储实现，转向 OpenClaw 提供的标准化状态与配置存储。

### 6.4 开发构建与 runtime reproducibility 是工程化重点

相关 PR：

- PR #2685：<https://github.com/netease-youdao/LobsterAI/pull/2685>
- PR #2686：<https://github.com/netease-youdao/LobsterAI/pull/2686>

判断：

维护者正在提升本地 patch、workspace 依赖、runtime build 之间的一致性。后续可能继续强化构建缓存失效、workspace closure 打包和 Electron/OpenClaw 开发链路。

---

## 7. 用户反馈摘要

过去 24 小时没有新的公开 Issue 评论，因此无法直接提炼 GitHub 上的用户原文反馈。不过多个 PR 明确说明来自“用户日志”“用户反馈”或“用户网关启动失败日志”，可归纳出以下真实痛点。

### 7.1 升级后应用无法启动或网关反复失败

相关 PR：

- PR #2676：<https://github.com/netease-youdao/LobsterAI/pull/2676>
- PR #2679：<https://github.com/netease-youdao/LobsterAI/pull/2679>
- PR #2681：<https://github.com/netease-youdao/LobsterAI/pull/2681>

用户痛点：

- 升级后旧配置或旧状态阻断网关启动；
- 重建配置不一定能解决问题；
- 损坏的 memory / dreams 数据难以由用户自行定位；
- 弹窗错误若不显示真实原因，会明显增加排查成本。

### 7.2 长会话返回空内容，用户难以理解原因

相关 PR：

- PR #2684：<https://github.com/netease-youdao/LobsterAI/pull/2684>

用户痛点：

- 模型调用看似成功，但没有正文；
- 继续请求也无法恢复；
- 问题出现在长会话中，用户可能误以为是模型、网络或 provider 问题。

### 7.3 旧任务与历史会话不可继续

相关 PR：

- PR #2682：<https://github.com/netease-youdao/LobsterAI/pull/2682>

用户痛点：

- 旧任务中某些历史块损坏后，整个任务可能反复失败；
- 用户缺少工具定位具体损坏记录；
- 长期使用者在版本升级后更容易遇到历史兼容问题。

### 7.4 错误详情不足影响自助排查

相关 PR：

- PR #2677：<https://github.com/netease-youdao/LobsterAI/pull/2677>

用户痛点：

- UI 只展示 provider、model、modelSource，无法判断真正异常；
- 日志中有异常摘要，但没有传递到错误卡片；
- 用户在反馈问题时需要更明确的技术细节。

---

## 8. 待处理积压

### 当前待处理 PR

#### PR #2680：配置同步时保留 model policy  
链接：<https://github.com/netease-youdao/LobsterAI/pull/2680>  
状态：Open  
作者：btc69m979y-dotcom

建议优先级：高

原因：

- 与 OpenClaw `v2026.8.1` 配置迁移直接相关；
- 可能导致配置反复写入和下发；
- 与今日大量 OpenClaw 升级兼容修复属于同一问题链；
- 若不处理，可能在升级用户中持续制造噪音和不稳定行为。

### 长期未响应 Issue / PR

本次数据中没有提供长期未响应 Issue 或 PR 信息，也没有过去 24 小时的 Issue 更新，因此无法判断长期积压项。

---

## 总体结论

LobsterAI 今日没有发布新版本，也没有公开 Issue 活动，但 PR 层面非常活跃。维护者集中处理 OpenClaw 升级后的兼容性、启动恢复、运行时依赖、历史数据容错和长会话稳定性问题，说明项目当前处于一次重要升级后的稳定化阶段。

今日最值得关注的风险仍是 OpenClaw 相关兼容问题，特别是网关启动、配置迁移和旧数据恢复。唯一仍 Open 的 PR #2680 建议尽快完成 review，以减少配置同步带来的重复写入和潜在不稳定。整体来看，项目维护响应积极，工程修复密度高，但短期内仍建议对升级路径、迁移恢复和长会话场景保持重点测试。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报  
**日期：2026-09-16**  
**仓库：** [moltis-org/moltis](https://github.com/moltis-org/moltis)

---

## 1. 今日速览

过去 24 小时，Moltis 项目整体活跃度较低但仍有工程基础设施方向的推进。今日没有新的 Issue、没有 Issue 关闭，也没有新版本发布。PR 方面新增 / 更新了 1 个待合并 PR，主要聚焦于优化 Docker / 镜像构建过程中的 Rust Cargo 缓存机制。整体来看，项目今日没有明显的用户侧问题反馈或功能讨论，但构建效率优化有助于提升开发者体验与 CI/CD 迭代速度。

---

## 2. 项目进展

今日暂无已合并或已关闭 PR。

### 待合并 PR

#### [#1270 feat(build): cache cargo across image builds, and script building the image](https://github.com/moltis-org/moltis/pull/1270)  
- **状态：** Open  
- **作者：** Bergmann89  
- **创建时间：** 2026-09-15  
- **更新时间：** 2026-09-15  
- **评论数：** 暂无数据  
- **反应：** 👍 0  

该 PR 针对镜像构建过程中的 Rust 编译缓存问题进行了优化。根据 PR 摘要，当前每次镜像构建都会重新编译完整依赖树，原因是 Cargo 的 `target` 目录与 crate registry 位于容易被源码变更失效的镜像层中。该 PR 将这些目录改为使用 BuildKit cache mounts，使后续构建能够复用已有编译缓存，仅重新编译发生变化的部分并进行链接。

**潜在影响：**
- 显著减少 Rust workspace 的重复编译时间。
- 改善本地开发与 CI 镜像构建体验。
- 降低频繁构建时的资源消耗。
- 属于基础设施与开发效率优化，不直接改变用户侧功能。

---

## 3. 社区热点

今日社区讨论热度较低，没有新的 Issue，也没有高评论量或高反应数的讨论。

当前唯一活跃项为：

#### [#1270 feat(build): cache cargo across image builds, and script building the image](https://github.com/moltis-org/moltis/pull/1270)  
该 PR 虽暂无明显社区互动数据，但其关注点反映出维护者或贡献者对构建效率的诉求。对于 Rust 项目而言，依赖树较大时冷启动构建成本通常较高，因此该优化可能服务于以下场景：

- 频繁构建 Docker 镜像的开发者。
- 使用 CI/CD 流程进行镜像验证的维护者。
- 需要快速迭代后端或基础组件的贡献者。
- 希望降低构建等待时间和计算资源消耗的团队。

---

## 4. Bug 与稳定性

过去 24 小时没有新报告的 Bug、崩溃、回归或稳定性问题。

当前数据中也没有发现与 Bug 修复直接相关的 PR。今日唯一 PR [#1270](https://github.com/moltis-org/moltis/pull/1270) 属于构建性能和开发体验优化，不属于用户运行时稳定性修复。

**严重程度排序：**
1. **高严重度：** 无  
2. **中严重度：** 无  
3. **低严重度：** 无  

---

## 5. 功能请求与路线图信号

过去 24 小时没有新增功能请求类 Issue。

不过，从当前待合并 PR 可以观察到一个工程路线图信号：

### 构建与交付链路优化  
- 相关 PR：[ #1270 ](https://github.com/moltis-org/moltis/pull/1270)  
- 类型：构建系统 / 开发者体验 / 镜像构建优化  
- 纳入下一版本可能性：中等偏高  

该 PR 不属于产品功能，但如果顺利通过 review，较可能被纳入后续开发分支或下一次发布前的基础设施改进中。它对最终用户功能影响有限，但对项目维护效率和贡献者体验有正向作用。

---

## 6. 用户反馈摘要

过去 24 小时没有新的 Issue 评论或用户反馈数据，因此无法提炼新的真实用户痛点或满意度变化。

基于现有数据，仅能观察到开发者侧的一个痛点：

- **痛点：** 镜像构建时 Rust 依赖树重复编译，导致构建耗时较长。  
- **对应改进：** [#1270](https://github.com/moltis-org/moltis/pull/1270) 引入 BuildKit cache mounts 缓存 Cargo registry 与 target 目录。  
- **影响对象：** 贡献者、维护者、CI/CD 使用者，而非直接终端用户。

---

## 7. 待处理积压

当前数据中没有长期未响应的重要 Issue 或 PR 信息，因此无法判断历史积压情况。

今日需要维护者关注的待处理项：

#### [#1270 feat(build): cache cargo across image builds, and script building the image](https://github.com/moltis-org/moltis/pull/1270)  
- **状态：** Open  
- **建议动作：**
  - 检查 BuildKit cache mounts 在目标 CI 环境中的兼容性。
  - 验证缓存目录不会引入不一致或污染构建的问题。
  - 评估脚本化镜像构建流程是否需要补充文档。
  - 若 CI 通过且无兼容性风险，可考虑尽快合并，以提升后续开发效率。

---

## 项目健康度评估

**今日健康度：稳定，活跃度偏低。**

Moltis 今日没有新 Bug、没有用户侧问题堆积，也没有高强度社区讨论，说明短期内没有明显质量风险暴露。但同时 Issue 与社区反馈为零，表明用户互动较少。唯一活跃 PR 聚焦构建效率，属于维护质量和工程效率方面的正向信号。总体而言，项目当前处于低噪音、低风险、基础设施小步优化的状态。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw 项目动态日报（2026-09-16）

> 数据来源：过去 24 小时 GitHub Issues / Pull Requests 活动。  
> 注：本日报按提供数据中的仓库链接 `agentscope-ai/QwenPaw` 生成。

---

## 1. 今日速览

过去 24 小时，项目活跃度较高：共更新 **3 个 Issues**、**14 个 Pull Requests**，其中 **10 个 PR 仍待合并**，**4 个 PR 已关闭/合并**。  
今日工作重点集中在 **桌面端交互体验、实时语音、工作区/文件管理、邮件配置、模型能力适配、多 Agent 协作与稳定性修复** 等方向。  
社区反馈主要指向两个方面：一是实际部署中的稳定性问题，例如 WeChat 附件 URL 兼容性、Cloud/NFS 文件浏览卡死；二是产物输出、工作区组织等“AI 助手可用性”问题。  
整体来看，项目处于快速迭代阶段，功能扩展明显，但同时也暴露出在复杂部署环境、文件系统访问、外部 API 兼容方面的稳定性挑战。

---

## 2. 版本发布

过去 24 小时 **无新版本发布**。

---

## 3. 项目进展

今日共有 **4 个 PR 处于已关闭/合并状态**，主要覆盖 MCP 稳定性、测试环境、技能通道配置以及文档建设。

### 3.1 MCP gzip 响应处理修复

- PR：[#7787 fix(mcp): avoid double-decompressing gzip 4xx MCP responses](https://github.com/agentscope-ai/QwenPaw/pull/7787)
- 状态：Closed
- 作者：yuanxs21

该 PR 修复了 Streamable-HTTP 双时代握手过程中，对 gzip 压缩的 HTTP 400 discover 响应进行二次解压导致 `DecodingError` 的问题。  
这是一个偏底层协议兼容性的稳定性修复，有助于提升 MCP 服务发现和错误响应处理的健壮性。

**影响评估：**

- 改善 MCP 客户端与服务端在异常响应下的兼容性。
- 降低因响应头与已解码 body 不一致导致的握手失败风险。
- 对依赖 MCP 外部工具/服务的 Agent 场景有直接价值。

---

### 3.2 测试环境禁用 telemetry

- PR：[#7784 chore: disable telemetry in tests](https://github.com/agentscope-ai/QwenPaw/pull/7784)
- 状态：Closed
- 作者：xieyxclack

该 PR 在测试中禁用 telemetry。虽然属于工程维护类改动，但对 CI 稳定性、测试隔离和隐私合规都有积极意义。

**影响评估：**

- 减少测试环境中的外部依赖和非确定性因素。
- 避免测试过程中产生不必要的数据上报。
- 有利于提升开源贡献者本地测试体验。

---

### 3.3 自定义 channel 支持技能选择

- PR：[#7782 fix(skill): Enable customized channel for skill selection](https://github.com/agentscope-ai/QwenPaw/pull/7782)
- 状态：Closed
- 作者：Leirunlin
- 关联 Issue：#7746

该 PR 修复了技能选择仅支持内置 channel 的限制，现在可以选择自定义 channel。同时还修复了一个 tag UI 不一致问题，并更新了相关测试。

**影响评估：**

- 增强了技能系统的可扩展性。
- 对自定义接入渠道、多端集成和企业内部渠道集成有帮助。
- 属于 Agent 平台化能力的重要补齐。

---

### 3.4 Pawport 文档与博客补充

- PR：[#7781 docs(pawport): add docs and blog for pawport](https://github.com/agentscope-ai/QwenPaw/pull/7781)
- 状态：Closed
- 作者：Luohh5

该 PR 增加了 Pawport 相关文档和博客内容，属于文档建设工作。

**影响评估：**

- 改善新用户理解 Pawport 相关功能的路径。
- 有助于降低上手门槛。
- 对外部开发者和社区传播有正向作用。

---

### 今日整体推进评估

从已关闭/合并 PR 看，今日项目主要在 **稳定性修复、测试治理、能力扩展和文档完善** 上取得进展。  
虽然没有新版本发布，但待合并 PR 数量达到 **10 个**，说明下一阶段可能会集中释放一批面向桌面端、语音、工作区、邮件、多 Agent 协作等方向的功能改进。

---

## 4. 社区热点

今日 Issues 的评论数整体不高，所有新增/活跃 Issue 均为 1 条评论，反应数为 0。但从内容看，多个问题反映了真实部署场景下的高价值诉求。

### 4.1 产物输出过多中间文件，影响可读性

- Issue：[#7797 [Feature]: 希望产物只输出任务目标产出物，不要输出中间文件、临时文件等无用的文件](https://github.com/agentscope-ai/QwenPaw/issues/7797)
- 状态：Open
- 作者：rerbin
- 评论数：1

用户反馈当前产物目录中会输出大量中间文件、临时文件，导致结果杂乱、不便查看。用户明确对比了其他产品：期望只展示最终目标文件。

**背后诉求：**

- AI 助手的交付物需要更接近“最终成果”，而不是执行过程痕迹。
- 用户关心的是结果整理、成果清晰度，而不仅是任务是否完成。
- 这反映了从“开发者工具”向“个人/企业 AI 助手产品”演进时的体验要求。

**相关可能方向：**

- 增加产物过滤策略。
- 将中间文件与最终产物分层展示。
- 提供 `.artifactignore` 或任务输出白名单/黑名单机制。
- 在 UI 中区分 “Final Deliverables” 与 “Execution Artifacts”。

---

### 4.2 WeChat / WeCom 音视频附件转换为 file:// 导致 OpenAI-compatible API 报错

- Issue：[#7792 WeChat video/audio attachments become file:// URLs in tool_result](https://github.com/agentscope-ai/QwenPaw/issues/7792)
- 状态：Open
- 作者：sacrtap
- 评论数：1

用户在 Docker 部署、OpenAI-compatible endpoint、WeChat / WeCom 渠道场景下遇到问题：视频/音频附件在 `tool_result` 中变成 `file://` URL，随后被原样发送到 OpenAI-compatible API，引发 400 错误：

> “The provided URL does not appear to be valid”

**背后诉求：**

- 多模态附件在不同渠道和不同模型 API 之间需要统一、安全、可访问的 URL 处理机制。
- 本地文件路径不能直接暴露给上游 API，尤其是在容器化、私有部署或云 API 场景中。
- 用户期望 WeChat / WeCom 等实际业务渠道能稳定处理音视频输入。

**可能修复方向：**

- 对 `file://` 附件进行上传或转存，生成模型 API 可访问的 HTTPS URL。
- 对不支持本地文件 URL 的 provider 增加预检查。
- 在发送到 OpenAI-compatible API 前做附件类型与 URL schema 校验。
- 对音视频附件降级为文本提示或转录任务。

---

### 4.3 Cloud/NFS 工作区文件浏览导致进程卡死

- Issue：[#7786 Cloud/NFS deployment — opening the workspace file browser freezes the whole process](https://github.com/agentscope-ai/QwenPaw/issues/7786)
- 状态：Open
- 作者：hxx0611
- 评论数：1

用户报告在 Cloud/NFS 部署场景中，打开 Console → Files 并点击文档会导致整个实例无响应 5–6 分钟，且问题会反复出现。环境为 Docker、2 vCPU、`qwenpaw app --host 0.0.0.0 --port 8088`。

**背后诉求：**

- 文件浏览器不能在请求路径上执行阻塞式 I/O。
- 对 NFS、云盘、远程挂载目录等高延迟文件系统需要更稳健的异步处理。
- 用户对 WebUI 可用性非常敏感，单个文件操作不应阻塞整个实例。

**可能修复方向：**

- 将文件系统扫描、读取、metadata 获取移出事件循环。
- 引入分页、懒加载、超时控制和后台任务。
- 对 NFS/Cloud FS 增加性能保护和缓存。
- 对大目录和慢文件系统增加降级 UI。

---

## 5. Bug 与稳定性

以下按严重程度排序。

### 高严重度：Cloud/NFS 文件浏览导致整个进程冻结

- Issue：[#7786](https://github.com/agentscope-ai/QwenPaw/issues/7786)
- 状态：Open
- 是否已有明确 fix PR：未在今日数据中看到直接关联 PR

**问题表现：**

- 打开工作区文件浏览器后，整个 WebUI 停止响应。
- 卡顿持续 5–6 分钟。
- 在 Cloud/NFS 环境中可复现且反复发生。
- 疑似请求路径阻塞文件 I/O 运行在 event loop 上。

**风险：**

- 影响范围可能覆盖所有使用文件浏览功能的云部署用户。
- 属于可用性级别问题，不只是局部 UI 卡顿。
- 如果运行在单进程/单事件循环服务中，可能造成全局不可用。

**建议优先级：P0/P1**

---

### 高严重度：WeChat / WeCom 音视频附件 file:// URL 导致上游 API 400

- Issue：[#7792](https://github.com/agentscope-ai/QwenPaw/issues/7792)
- 状态：Open
- 是否已有明确 fix PR：未在今日数据中看到直接关联 PR

**问题表现：**

- WeChat / WeCom 渠道接收音视频附件后，在 `tool_result` 中变成 `file://` URL。
- URL 被发送到 OpenAI-compatible API。
- 上游 API 返回 400：URL 无效。

**风险：**

- 影响多模态输入链路。
- 对企业微信、微信渠道实际使用场景影响较大。
- 可能暴露 provider adapter 对 URL schema 的校验不足。

**建议优先级：P1**

---

### 中严重度：MCP gzip 4xx 响应二次解压

- PR：[#7787](https://github.com/agentscope-ai/QwenPaw/pull/7787)
- 状态：Closed
- 是否已有 fix PR：已有

**问题表现：**

- MCP discover 阶段遇到 gzip 压缩的 HTTP 400 响应时，因 body 已被 `aread()` 解码，但后续重建 `httpx.Response` 时保留原始 `Content-Encoding`，导致二次解压失败。

**当前进展：**

- 已通过 PR #7787 处理。
- 若已合并，应纳入后续版本说明中。

**建议优先级：已处理，关注回归测试**

---

### 中严重度：Subagent model override 静默丢失

- PR：[#7796 fix(agents): diagnose dropped subagent model overrides](https://github.com/agentscope-ai/QwenPaw/pull/7796)
- 状态：Open
- 是否已有 fix PR：已有，待合并

**问题表现：**

- `_build_subagent_request_context` 在加载 per-agent config 时吞掉异常，导致用户配置的 subagent model override 看起来像未设置。
- 问题以“静默失效”的形式出现，难以诊断。

**修复方向：**

- 增加 agent id 和异常堆栈日志。
- 避免用户配置失败时无任何可见信号。

**建议优先级：P2，建议尽快合并以提升可诊断性**

---

### 中严重度：外部 ACP runner 委派体验问题

- PR：[#7783 fix(ACP): Improves the experience of delegating work to external ACP runners](https://github.com/agentscope-ai/QwenPaw/pull/7783)
- 状态：Open
- 是否已有 fix PR：已有，待合并

**问题表现：**

- ACP 回复可能重复或碎片化。
- 一个 turn 的文本会以 delta 形式增量到达，又从 `finish_prompt` 完整到达，导致 `delegate_external_agent` 收到两次。

**影响：**

- 影响外部 Agent 协作体验。
- 会降低多 Agent / 外部 runner 场景下的结果可读性和可信度。

**建议优先级：P2**

---

## 6. 功能请求与路线图信号

### 6.1 产物输出整理：只展示目标成果

- Issue：[#7797](https://github.com/agentscope-ai/QwenPaw/issues/7797)
- 类型：Feature Request
- 状态：Open

这是一个明显的产品体验型需求。用户希望最终产物目录不要混入中间文件、临时文件。  
该需求与 Agent 执行流程、工作区管理、文件浏览器、任务产物定义都有关系，可能成为后续版本中“任务交付体验”的改进点。

**纳入路线图可能性：较高**

原因：

- 诉求清晰，且有截图对比。
- 与 AI 助手最终交付质量强相关。
- 与当前多个工作区相关 PR 方向一致。

相关 PR 信号：

- [#7790 feat(console): add unified chat workbench shell](https://github.com/agentscope-ai/QwenPaw/pull/7790)
- [#7789 feat(proj dir): support configurable multi-folder default workspaces](https://github.com/agentscope-ai/QwenPaw/pull/7789)

---

### 6.2 统一 Chat Workbench

- PR：[#7790 feat(console): add unified chat workbench shell](https://github.com/agentscope-ai/QwenPaw/pull/7790)
- 状态：Open
- 作者：zhijianma

该 PR 引入 session-scoped、可调整大小的右侧 Workbench，替代固定 capability tabs，并支持用户按需打开 Files、Changes、Terminal、Tools。

**路线图信号：**

- Console 正在向更灵活的“工作台”形态演进。
- 文件、终端、工具、变更查看等能力将从固定布局转为按需加载。
- 有助于降低初始 UI 负担，并提升复杂任务执行时的可操作性。

**纳入下一版本可能性：较高，视评审进度而定**

---

### 6.3 实时语音聊天

- PR：[#7785 feat(voice): add realtime voice chat](https://github.com/agentscope-ai/QwenPaw/pull/7785)
- 状态：Open
- 作者：jinglinpeng

该 PR 增加 provider-configurable Realtime Voice chat，支持语音输入、播放、中断和模型选择，并复用现有 Chat 执行路径。

**路线图信号：**

- 项目正在从文本交互扩展到实时语音交互。
- 语音输入将与历史记录、工具调用、长任务、队列、持久化和渲染共用现有机制。
- 这表明语音不会只是独立 demo，而是计划纳入核心 Chat 工作流。

**纳入下一版本可能性：中高**

风险点：

- 实时语音涉及模型 provider、音频权限、播放中断、延迟控制等复杂问题。
- 需要重点关注稳定性、兼容性和隐私提示。

---

### 6.4 Record & Replay 工作流

- PR：[#7798 feat(recording): add reusable record and replay workflows](https://github.com/agentscope-ai/QwenPaw/pull/7798)
- 状态：Open
- 作者：jinglinpeng

该 PR 为 QwenPaw Desktop 增加可选的 Record & Replay 插件，通过 Computer Use Helper 记录经过隐私过滤的 macOS 桌面事件，并要求用户明确确认发送给模型的 payload。

**路线图信号：**

- 项目正在探索“可复现桌面操作流程”的 Agent 能力。
- Record & Replay 可用于自动化、调试、演示和任务复用。
- 显式 consent 和 privacy-filtered events 表明维护者关注桌面自动化中的隐私边界。

**纳入下一版本可能性：中等**

---

### 6.5 自定义 IMAP/SMTP 邮件服务器

- PR：[#7791 feat(mail): support custom IMAP/SMTP servers via provider "custom"](https://github.com/agentscope-ai/QwenPaw/pull/7791)
- 状态：Open
- 作者：unclesamwk
- 标签：first-time-contributor

该 PR 允许通过 provider `"custom"` 支持自定义 IMAP/SMTP 服务器，解决当前邮件管理界面仅接受内置个人域名和部分企业邮箱的问题。

**路线图信号：**

- 邮件 Agent 能力正在向自托管、企业内部邮件系统扩展。
- 社区贡献者开始参与具体集成能力建设。
- 对私有化部署和企业用户有较高价值。

**纳入下一版本可能性：较高**

---

### 6.6 多文件夹默认工作区配置

- PR：[#7789 feat(proj dir): support configurable multi-folder default workspaces](https://github.com/agentscope-ai/QwenPaw/pull/7789)
- 状态：Open
- 作者：x1n95c

该 PR 支持将当前 workspace 配置设为未来任务默认配置，并支持运行时编辑多文件夹 workspace。

**路线图信号：**

- 工作区能力正在从单目录向多目录、多任务复用演进。
- 与用户对产物输出整理、文件浏览性能的反馈高度相关。
- 是面向复杂项目和长期任务的重要基础能力。

**纳入下一版本可能性：较高**

---

### 6.7 小屏幕侧边栏会话列表重设计

- PR：[#7788 feat(console): redesign sidebar session list for small screens](https://github.com/agentscope-ai/QwenPaw/pull/7788)
- 状态：Open
- 作者：zhijianma
- 关联：#7739

该 PR 针对 13–14 英寸屏幕上会话历史显示空间不足的问题，重新设计 sidebar conversation history，以回收垂直空间。

**路线图信号：**

- 项目正在持续打磨桌面端/小屏设备体验。
- UI 优化已从功能可用转向效率和空间利用率。

**纳入下一版本可能性：中高**

---

### 6.8 多 Agent 协作触发词扩展

- PR：[#7795 fix(skills): expand multi-agent collaboration trigger keywords](https://github.com/agentscope-ai/QwenPaw/pull/7795)
- 状态：Open / Under Review
- 作者：lorenzozanee
- 关联 Issue：#3113

该 PR 扩展内置多 Agent 协作技能描述，使 skill-selection prompt 能在第一轮识别用户请求团队协作的表达，而不是依赖中断和重试。

**路线图信号：**

- 多 Agent 协作仍是项目重点能力之一。
- 当前优化方向包括降低触发门槛、提升意图识别准确率。

**纳入下一版本可能性：较高**

---

### 6.9 DeepSeek V4 Flash 能力适配

- PR：[#7794 feat(providers): add DeepSeek V4 Flash capabilities](https://github.com/agentscope-ai/QwenPaw/pull/7794)
- 状态：Open
- 作者：lorenzozanee

该 PR 为 provider catalog 和 capability baseline 添加 DeepSeek V4 Flash 能力，包括图像输入、1,000,000 token 输入窗口和 reasoning effort values。

**路线图信号：**

- 项目持续扩展模型 provider 能力目录。
- 长上下文、多模态、reasoning effort 管理将成为模型选择和上下文管理的重要参数。

**纳入下一版本可能性：较高**

---

## 7. 用户反馈摘要

### 7.1 用户希望 AI 助手输出“最终结果”，而不是暴露执行过程

相关 Issue：

- [#7797](https://github.com/agentscope-ai/QwenPaw/issues/7797)

用户不满点：

- 产物目录混入大量中间文件、临时文件。
- 文件结构杂乱，影响查看和交付。
- 与其他产品相比，最终产物展示不够清晰。

反映出的使用场景：

- 用户可能将 CoPaw/QwenPaw 用于生成报告、代码、文档、项目文件等可交付成果。
- 用户更关注任务完成后的“交付目录”是否整洁，而不是完整执行痕迹。

---

### 7.2 企业渠道用户关注多模态附件的端到端可用性

相关 Issue：

- [#7792](https://github.com/agentscope-ai/QwenPaw/issues/7792)

用户不满点：

- WeChat / WeCom 音视频附件无法顺利进入 OpenAI-compatible 模型处理链路。
- `file://` URL 对上游 API 无效，导致任务失败。

反映出的使用场景：

- Docker 私有部署。
- 企业微信/微信作为输入渠道。
- 使用 OpenAI-compatible 模型服务。
- 希望处理音频、视频等真实业务附件。

---

### 7.3 云部署用户对 WebUI 阻塞极其敏感

相关 Issue：

- [#7786](https://github.com/agentscope-ai/QwenPaw/issues/7786)

用户不满点：

- 打开文件浏览器会导致整个实例无响应。
- 卡顿持续时间长达 5–6 分钟。
- 问题反复出现，影响核心使用流程。

反映出的使用场景：

- 低资源云容器，2 vCPU。
- NFS 或云存储挂载工作区。
- 通过 Web Console 使用文件浏览器。

---

### 7.4 开发者和企业用户需要更开放的配置能力

相关 PR：

- [#7791 自定义 IMAP/SMTP](https://github.com/agentscope-ai/QwenPaw/pull/7791)
- [#7789 多文件夹默认工作区](https://github.com/agentscope-ai/QwenPaw/pull/7789)
- [#7782 自定义 channel 技能选择](https://github.com/agentscope-ai/QwenPaw/pull/7782)

反馈趋势：

- 用户不满足于内置 provider、内置 channel、单一 workspace。
- 私有化、企业化、自定义集成需求正在增强。
- 项目正在逐步补齐可配置性和扩展性。

---

## 8. 待处理积压

基于今日数据，没有看到“长期未响应”的 Issue 或 PR 信息；所有列出的 Issues/PRs 都是在 2026-09-15 至 2026-09-16 期间创建或更新。  
但以下事项建议维护者重点关注，因为它们要么影响稳定性，要么可能阻塞即将发布的核心体验改进。

### 8.1 高优先级待处理 Issues

1. [#7786 Cloud/NFS 文件浏览导致整体冻结](https://github.com/agentscope-ai/QwenPaw/issues/7786)  
   - 建议优先排查 event loop 阻塞、NFS 文件扫描、同步 I/O。
   - 影响云部署可用性，优先级应较高。

2. [#7792 WeChat 音视频附件 file:// URL 导致 API 400](https://github.com/agentscope-ai/QwenPaw/issues/7792)  
   - 建议明确附件 URL 转换策略。
   - 对 WeChat / WeCom 企业渠道使用影响明显。

3. [#7797 产物输出包含过多中间文件](https://github.com/agentscope-ai/QwenPaw/issues/7797)  
   - 建议产品和工程共同定义 artifact 输出规范。
   - 可与 Workbench / Files / workspace 改造一起规划。

---

### 8.2 建议尽快评审的开放 PR

1. [#7795 多 Agent 协作触发词扩展](https://github.com/agentscope-ai/QwenPaw/pull/7795)  
   - 已标记 Under Review。
   - 改动目标明确，可能快速改善多 Agent 协作触发体验。

2. [#7791 自定义 IMAP/SMTP 邮件服务器](https://github.com/agentscope-ai/QwenPaw/pull/7791)  
   - first-time-contributor 贡献。
   - 建议及时反馈，维护社区贡献积极性。

3. [#7796 Subagent model override 诊断日志](https://github.com/agentscope-ai/QwenPaw/pull/7796)  
   - 有助于提升配置问题可观测性。
   - 风险相对可控，建议尽快评审。

4. [#7783 ACP 外部 runner 委派体验修复](https://github.com/agentscope-ai/QwenPaw/pull/7783)  
   - 影响外部 Agent 协作质量。
   - 建议结合多 Agent 路线优先处理。

5. [#7785 实时语音聊天](https://github.com/agentscope-ai/QwenPaw/pull/7785)  
   - 功能较大，建议重点关注权限、延迟、provider 差异和降级策略。

6. [#7790 统一 Chat Workbench](https://github.com/agentscope-ai/QwenPaw/pull/7790)  
   - 涉及 Console 交互框架变化。
   - 建议与文件浏览性能问题、产物输出需求联动评审。

---

## 项目健康度评估

| 维度 | 今日表现 | 评估 |
|---|---:|---|
| 开发活跃度 | 14 个 PR 更新 | 高 |
| 社区反馈 | 3 个 Issue 更新 | 中等 |
| 发布节奏 | 无新 Release | 平稳 |
| 稳定性风险 | 文件浏览冻结、附件 URL 错误 | 需关注 |
| 功能演进 | 语音、Workbench、Record & Replay、邮件、工作区 | 强 |
| 贡献者生态 | 出现 first-time-contributor PR | 正向 |

**总体判断：**  
CoPaw/QwenPaw 今日呈现出较强的工程推进速度，尤其在桌面端能力、语音交互、工作区管理和企业集成方面信号明显。但同时，真实部署环境中的稳定性问题开始显现，尤其是 Cloud/NFS 文件 I/O 阻塞和 WeChat 多模态附件 URL 兼容性，建议维护者优先处理，以避免新功能快速扩展时积累体验债务。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

# ZeptoClaw 项目动态日报｜2026-09-16

项目：qhkm/zeptoclaw  
统计窗口：过去 24 小时  
数据来源：GitHub Issues / Pull Requests / Releases

---

## 1. 今日速览

过去 24 小时内，ZeptoClaw 没有新增或更新 Issues，也没有新版本发布；项目活动主要集中在依赖维护层面。今日共有 18 个新的 Dependabot PR 处于开放状态，覆盖 Rust、JavaScript 文档站、GitHub Actions 与 Docker 基础镜像等多个依赖面。所有 PR 均尚未合并或关闭，说明当前维护队列出现了一批集中升级任务，但尚未进入实际集成阶段。整体来看，项目今日开发活跃度偏“维护型”，用户反馈与功能讨论活跃度较低，短期重点应是验证依赖升级兼容性并尽快合并低风险更新。

---

## 2. 版本发布

过去 24 小时内无新版本发布。

---

## 3. 项目进展

今日没有已合并或已关闭的 PR，因此暂无可确认进入主分支的功能、修复或基础设施改进。

不过，今日新增的 18 个开放 PR 显示项目正在进行一轮较大规模的依赖刷新，主要方向如下：

### 3.1 Rust 依赖更新

- [PR #694](https://github.com/qhkm/zeptoclaw/pull/694) — `base64` 从 `0.22.1` 升级到 `0.23.1`
- [PR #692](https://github.com/qhkm/zeptoclaw/pull/692) — `rustls` 从 `0.23.39` 升级到 `0.23.43`
- [PR #690](https://github.com/qhkm/zeptoclaw/pull/690) — `clap` 从 `4.6.1` 升级到 `4.6.6`
- [PR #688](https://github.com/qhkm/zeptoclaw/pull/688) — `async-trait` 从 `0.1.89` 升级到 `0.1.92`
- [PR #685](https://github.com/qhkm/zeptoclaw/pull/685) — `tokio-serial` 从 `5.4.5` 升级到 `5.5.0`

**影响判断：**  
这些更新主要涉及命令行参数解析、异步 trait、TLS、Base64 编解码和串口异步通信。若 ZeptoClaw 的核心能力涉及设备通信、网络连接或本地 Agent 运行时，这批 Rust 依赖更新值得重点跑完整测试，尤其是 `rustls` 与 `tokio-serial`。

### 3.2 JavaScript / 文档站依赖更新

- [PR #696](https://github.com/qhkm/zeptoclaw/pull/696) — `/landing/zeptoclaw/docs` 中 `@astrojs/starlight` 从 `0.39.2` 升级到 `0.41.10`
- [PR #695](https://github.com/qhkm/zeptoclaw/pull/695) — `/landing/zeptoclaw/docs` 中 `astro` 从 `6.3.7` 升级到 `7.2.2`
- [PR #693](https://github.com/qhkm/zeptoclaw/pull/693) — `/landing/zeptoclaw/docs` 中 `sharp` 从 `0.34.5` 升级到 `0.35.4`
- [PR #691](https://github.com/qhkm/zeptoclaw/pull/691) — `/landing/r8r/docs` 中 `sharp` 从 `0.34.5` 升级到 `0.35.4`
- [PR #689](https://github.com/qhkm/zeptoclaw/pull/689) — `/landing/r8r/docs` 中 `@astrojs/starlight` 从 `0.39.2` 升级到 `0.41.10`
- [PR #686](https://github.com/qhkm/zeptoclaw/pull/686) — `/landing/r8r/docs` 中 `astro` 从 `6.3.7` 升级到 `7.2.2`

**影响判断：**  
`astro` 从 6.x 升级到 7.x 属于较大版本变更，可能涉及构建配置、插件兼容性或文档站渲染行为变化。建议优先检查两个文档站的构建、页面路由、搜索、导航和图片处理流程。

### 3.3 GitHub Actions / CI 依赖更新

- [PR #687](https://github.com/qhkm/zeptoclaw/pull/687) — `docker/login-action` 从 `4.2.0` 升级到 `4.6.0`
- [PR #684](https://github.com/qhkm/zeptoclaw/pull/684) — `EmbarkStudios/cargo-deny-action` 从 `2.0.18` 升级到 `2.1.1`
- [PR #683](https://github.com/qhkm/zeptoclaw/pull/683) — `Swatinem/rust-cache` 从 `2.9.1` 升级到 `2.9.2`
- [PR #682](https://github.com/qhkm/zeptoclaw/pull/682) — `taiki-e/install-action` 从 `2.79.7` 升级到 `2.87.6`
- [PR #681](https://github.com/qhkm/zeptoclaw/pull/681) — `softprops/action-gh-release` 从 `3.0.0` 升级到 `3.0.3`

**影响判断：**  
这批 PR 主要影响 CI、缓存、依赖审计、Docker 登录和 Release 发布流程。建议按低风险顺序合并，并确认 Release 自动化流程没有权限或参数变更。

### 3.4 Docker 基础镜像更新

- [PR #680](https://github.com/qhkm/zeptoclaw/pull/680) — `debian` 镜像 digest 从 `4e401d9` 更新到 `d7e1218`
- [PR #679](https://github.com/qhkm/zeptoclaw/pull/679) — `rust` 镜像 digest 从 `17d1ba8` 更新到 `bce1476`

**影响判断：**  
Docker digest 更新可能带来系统包、编译器环境或 libc 相关变化。虽然通常是安全和基础镜像维护，但建议至少执行完整镜像构建和核心集成测试。

---

## 4. 社区热点

今日没有 Issues 更新，也没有人工讨论活跃的 PR。所有 18 个 PR 均由 `dependabot[bot]` 创建，评论数未提供，点赞数均为 0，因此暂无明显社区热点或用户侧讨论焦点。

相对值得维护者优先关注的 PR 包括：

1. [PR #695](https://github.com/qhkm/zeptoclaw/pull/695) — `/landing/zeptoclaw/docs` 中 `astro` 6.x 到 7.x 升级  
   - 原因：主版本升级，潜在破坏性变更风险较高。
2. [PR #686](https://github.com/qhkm/zeptoclaw/pull/686) — `/landing/r8r/docs` 中 `astro` 6.x 到 7.x 升级  
   - 原因：同样涉及文档站构建栈主版本升级。
3. [PR #692](https://github.com/qhkm/zeptoclaw/pull/692) — `rustls` 升级  
   - 原因：TLS 依赖会影响网络连接、安全通信和兼容性。
4. [PR #685](https://github.com/qhkm/zeptoclaw/pull/685) — `tokio-serial` 升级  
   - 原因：若项目涉及串口或硬件通信，该依赖可能影响运行时稳定性。

---

## 5. Bug 与稳定性

今日没有新增 Bug 报告、崩溃反馈或回归问题，也没有对应的修复 PR 被合并。

从稳定性角度看，今日需要关注的是“依赖升级引入回归”的潜在风险，而非已知线上问题：

### 高优先级稳定性风险

- [PR #695](https://github.com/qhkm/zeptoclaw/pull/695) / [PR #686](https://github.com/qhkm/zeptoclaw/pull/686) — `astro` 6.x 到 7.x  
  - 风险：文档站构建失败、路由或插件兼容性问题。
  - Fix PR：暂无，当前 PR 本身为升级 PR。

- [PR #692](https://github.com/qhkm/zeptoclaw/pull/692) — `rustls` 从 `0.23.39` 到 `0.23.43`  
  - 风险：TLS 行为、安全策略或依赖树变化可能影响网络连接。
  - Fix PR：暂无。

### 中优先级稳定性风险

- [PR #685](https://github.com/qhkm/zeptoclaw/pull/685) — `tokio-serial` 从 `5.4.5` 到 `5.5.0`  
  - 风险：串口设备通信、异步 I/O 行为可能变化。
  - Fix PR：暂无。

- [PR #680](https://github.com/qhkm/zeptoclaw/pull/680) — `debian` Docker 镜像 digest 更新  
- [PR #679](https://github.com/qhkm/zeptoclaw/pull/679) — `rust` Docker 镜像 digest 更新  
  - 风险：构建环境和运行时基础库变化。
  - Fix PR：暂无。

---

## 6. 功能请求与路线图信号

今日没有新增 Issues，也没有用户提交的功能请求。因此暂时没有来自社区的明确路线图信号。

从 PR 类型看，今日所有更新都属于依赖维护，并不直接指向新功能。但可以观察到以下间接信号：

- 文档站依赖持续更新：  
  [PR #696](https://github.com/qhkm/zeptoclaw/pull/696)、[PR #695](https://github.com/qhkm/zeptoclaw/pull/695)、[PR #693](https://github.com/qhkm/zeptoclaw/pull/693)、[PR #689](https://github.com/qhkm/zeptoclaw/pull/689)、[PR #686](https://github.com/qhkm/zeptoclaw/pull/686)、[PR #691](https://github.com/qhkm/zeptoclaw/pull/691)  
  说明项目维护者至少保留了对官网或文档体验的持续维护基础。

- CI / Release 自动化依赖更新：  
  [PR #687](https://github.com/qhkm/zeptoclaw/pull/687)、[PR #684](https://github.com/qhkm/zeptoclaw/pull/684)、[PR #683](https://github.com/qhkm/zeptoclaw/pull/683)、[PR #682](https://github.com/qhkm/zeptoclaw/pull/682)、[PR #681](https://github.com/qhkm/zeptoclaw/pull/681)  
  表明项目仍在维持自动化交付链路，为后续版本发布保留工程基础。

---

## 7. 用户反馈摘要

今日没有 Issues 评论或用户讨论数据，因此无法提炼新的真实用户痛点、满意度反馈或具体使用场景。

当前可确认的信息是：

- 没有新增用户问题；
- 没有新增 Bug 报告；
- 没有新增功能诉求；
- 没有高互动 PR 或社区讨论。

这通常可能意味着两种情况：一是项目当前用户反馈负载较低，短期稳定；二是社区参与度偏低，外部用户互动不足。需要结合更长周期的 Issues、Discussions、Stars、Forks 和下载量数据进一步判断项目健康度。

---

## 8. 待处理积压

今日新增的 18 个 PR 均处于开放状态，虽然不是长期积压，但已经形成一组集中维护队列。建议维护者分批处理，避免依赖更新长期堆积后造成冲突或升级难度增加。

### 建议优先处理：可能影响构建或运行时的升级

1. [PR #695](https://github.com/qhkm/zeptoclaw/pull/695) — `astro` 从 `6.3.7` 到 `7.2.2`，路径：`/landing/zeptoclaw/docs`
2. [PR #686](https://github.com/qhkm/zeptoclaw/pull/686) — `astro` 从 `6.3.7` 到 `7.2.2`，路径：`/landing/r8r/docs`
3. [PR #692](https://github.com/qhkm/zeptoclaw/pull/692) — `rustls` 从 `0.23.39` 到 `0.23.43`
4. [PR #685](https://github.com/qhkm/zeptoclaw/pull/685) — `tokio-serial` 从 `5.4.5` 到 `5.5.0`
5. [PR #679](https://github.com/qhkm/zeptoclaw/pull/679) — `rust` Docker 镜像 digest 更新
6. [PR #680](https://github.com/qhkm/zeptoclaw/pull/680) — `debian` Docker 镜像 digest 更新

### 可批量验证后合并：文档和图片处理相关

- [PR #696](https://github.com/qhkm/zeptoclaw/pull/696) — `@astrojs/starlight`，`/landing/zeptoclaw/docs`
- [PR #689](https://github.com/qhkm/zeptoclaw/pull/689) — `@astrojs/starlight`，`/landing/r8r/docs`
- [PR #693](https://github.com/qhkm/zeptoclaw/pull/693) — `sharp`，`/landing/zeptoclaw/docs`
- [PR #691](https://github.com/qhkm/zeptoclaw/pull/691) — `sharp`，`/landing/r8r/docs`

### 低风险但建议尽快清理：CI / GitHub Actions 更新

- [PR #687](https://github.com/qhkm/zeptoclaw/pull/687) — `docker/login-action`
- [PR #684](https://github.com/qhkm/zeptoclaw/pull/684) — `cargo-deny-action`
- [PR #683](https://github.com/qhkm/zeptoclaw/pull/683) — `rust-cache`
- [PR #682](https://github.com/qhkm/zeptoclaw/pull/682) — `taiki-e/install-action`
- [PR #681](https://github.com/qhkm/zeptoclaw/pull/681) — `softprops/action-gh-release`

### 其他 Rust 依赖更新

- [PR #694](https://github.com/qhkm/zeptoclaw/pull/694) — `base64`
- [PR #690](https://github.com/qhkm/zeptoclaw/pull/690) — `clap`
- [PR #688](https://github.com/qhkm/zeptoclaw/pull/688) — `async-trait`

---

## 项目健康度判断

今日 ZeptoClaw 的健康状态可以评估为：**维护活动活跃，但社区互动偏低，合并推进不足**。

正向信号：

- Dependabot 依赖维护覆盖面较完整；
- Rust、文档站、CI、Docker 镜像均在持续更新；
- 今日没有新增 Bug 或崩溃报告。

风险信号：

- 18 个 PR 全部未合并，短期维护队列较重；
- 没有用户讨论、Issue 更新或功能反馈；
- 多个升级涉及主版本或基础运行环境，需要谨慎验证。

建议维护者优先跑 CI、文档构建和核心集成测试，并将依赖更新分为“低风险自动合并”和“高风险人工验证”两类，以降低积压和回归风险。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报（2026-09-16）

## 1. 今日速览

过去 24 小时，ZeroClaw 维持了较高活跃度：Issues 更新 14 条，其中 13 条仍处于 Open，PR 更新 19 条，其中 18 条待合并，说明问题发现与修复提交都很密集，但合入节奏偏谨慎。  
今日焦点集中在 **Anthropic 多模态/缓存一致性、Provider 超时配置、CI 稳定性、Telegram 测试 flaky、ZeroCode 体验优化** 等方向。  
从标签看，`priority:p1/p2`、`risk:high/medium` 问题较多，项目当前处于“快速修复关键稳定性问题 + 并行推进体验改进”的阶段。  
整体健康度判断：**开发活跃、响应迅速，但 CI 与多模态 Provider 路径存在明显稳定性压力，短期需要优先清理阻塞合并的测试与运行时回归。**

---

## 2. 项目进展

过去 24 小时没有新版本发布，也没有明确标记为已合并的 PR；仅有 1 个 PR 关闭，多个修复 PR 已提交并等待合并。

### 已关闭 PR

#### PR #10865：`fix(config): write the confusable-character set as a byte string`
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10865
- 状态：Closed
- 影响范围：Config / Clippy 兼容性
- 内容摘要：将 `[b'I', b'L', ...]` 改写为字节字符串 `*b"ILOUlo"`，用于满足 Clippy 1.98 的 `byte_char_slices` lint。
- 进展判断：该 PR 已关闭，后续似乎由更完整或替代性的 PR #10866 继续处理。

### 今日关键待合并 PR 推进

#### PR #10895：修复 Anthropic provider 图片结尾时缓存断点丢失
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10895
- 关联 Issue：#10889  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10889
- 价值：修复最后一个 message 以 image/tool_use/thinking block 结尾时，rolling `cache_control` breakpoint 无法正确设置的问题。
- 项目推进：有助于提升 Anthropic 原生 Provider 的缓存命中稳定性，降低多模态对话成本与延迟波动。

#### PR #10894：在 `run_model_query` 边界规范化 image markers
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10894
- 关联方向：runtime / agent / provider / Anthropic / 多模态
- 价值：将 max-iteration graceful summary 的历史准备流程与常规模型请求路径统一，避免 image marker 在不同阶段表现不一致。
- 项目推进：属于多模态一致性修复，对 ZeroCode 图片描述、工具返回图像等场景有直接意义。

#### PR #10886：允许 `timeout_secs` 提高 streaming idle timeout
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10886
- 关联 Issue：#10884  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10884
- 价值：修复 OpenAI-compatible、OpenAI Responses、Codex 等 streaming client 将 idle timeout 硬编码为 300 秒的问题。
- 项目推进：改善慢首 token 模型、长上下文请求、代理链路较慢环境下的可用性。

#### PR #10881：缓解 Telegram media-group 测试在 CI 中超时
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10881
- 关联 Issues：#10875、#10883  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10875  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10883
- 价值：针对 `Parallel Runtime Test` 下 Telegram media-group 测试 flaky 进行防护。
- 项目推进：若合入，可直接降低无关 PR 被 CI 阻塞的概率。

#### PR #10879：ZeroCode Sessions / Queue / Plan 合并为可调整 Dock
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10879
- 关联 Issue：#10878  
  https://github.com/zeroclaw-labs/zeroclaw/issues/10878
- 价值：优化 ZeroCode TUI 布局，将 Sessions、Queue、Plan 整合到一个可调整侧边 Dock。
- 项目推进：属于用户体验增强，可能进入下一轮功能版本。

---

## 3. 社区热点

### 1）Anthropic 多模态与缓存一致性问题成为今日最热主题

#### Issue #10885：tool-returned images 在同一 turn 内后续工具调用后消失
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10885
- 评论数：3
- 标签：`bug`, `provider`, `runtime`, `provider:anthropic`, `risk:high`, `zerocode`
- 用户诉求：工具返回的图片应该在同一用户 turn 内持续可用，而不是在一次无关工具调用之后丢失。
- 背后信号：ZeroClaw 的多模态上下文管理已经进入复杂场景，包括工具返回图像、同 turn 多工具调用、ZeroCode 图片描述链路等。用户对“图像上下文连续性”的期望明显提升。

#### Issue #10889：Anthropic provider 在最后 message 为 image block 时丢失 rolling cache breakpoint
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10889
- 评论数：2
- 已有 fix PR：#10895  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10895
- 用户诉求：多模态消息不应破坏缓存断点；缓存策略应独立于最后一个 content block 类型。
- 背后信号：Anthropic 原生 Provider 的缓存语义是项目近期重点优化对象，尤其是多模态 block 与 tool result 混排时。

#### Issue #10888：stale tool-result image strip 导致 message 二次请求时重写并使缓存前缀失效
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10888
- 状态：Closed
- 评论数：2
- 标签：`risk:high`, `provider:anthropic`, `zerocode`
- 用户诉求：历史消息的序列化结果应稳定，不应在 replay 生命周期中发生一次性字节变化。
- 背后信号：缓存命中不仅依赖 provider 逻辑，还依赖 runtime/agent 对历史消息的稳定重放。

---

### 2）CI Flaky 与队列阻塞成为维护效率热点

#### Issue #10875：Telegram media-group 测试在无关 PR 上导致 Parallel Runtime Test 失败
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10875
- 状态：Open / In Progress
- 已有 fix PR：#10881  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10881
- 用户诉求：无关 PR 不应被 Telegram 测试的偶发超时阻塞。
- 背后信号：CI 稳定性已经影响贡献者吞吐量，属于维护体验和项目交付速度问题。

#### PR #10874：停止让 GitHub-hosted jobs 排队等待 fmt
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10874
- 状态：Open
- 标签：`domain:ci`, `risk:high`
- 诉求：消除 `fmt` job 作为全局前置依赖导致的 CI 队列等待。
- 背后信号：项目 CI 规模较大，工作流拓扑本身已成为性能瓶颈。

#### PR #10896：compile-heavy jobs 固定 runner labels，避免读取 fmt 输出
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10896
- 状态：Open
- 诉求：减少 compile job 对 `fmt` 输出的依赖，使工作流能更早调度。
- 背后信号：CI 优化正在从单点测试修复扩展到整体流水线架构优化。

---

## 4. Bug 与稳定性

以下按严重程度与影响面排序。

### 高风险 / 高优先级

#### Issue #10876：gateway config 写入 auth sections 后未同步到 RPC 授权 authority，需 daemon reload
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10876
- 状态：Open / Accepted / Blocked
- 标签：`priority:p1`, `domain:security`, `risk:high`, `config`, `gateway`, `runtime`
- 影响：用户可能看到配置“已保存”，但运行中的 RPC 授权逻辑未实际采用新配置。
- 风险：安全配置与运行时授权状态不一致，容易造成运维误判。
- Fix PR：当前数据中未见直接对应 PR。

#### Issue #10885：同一 turn 内 tool-returned images 可能消失
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10885
- 状态：Open / Accepted
- 标签：`risk:high`, `provider:anthropic`, `zerocode`
- 影响：ZeroCode 或工具链依赖图像结果进行后续推理时，模型可能无法看到此前工具返回的图片。
- Fix PR：可能与 #10894 相关，但数据未明确一一绑定。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10894

#### Issue #10888：tool-result image strip 导致缓存前缀失效
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10888
- 状态：Closed
- 标签：`risk:high`, `provider:anthropic`, `zerocode`
- 影响：历史消息在第二次请求时发生序列化变化，导致缓存从该点之后失效。
- Fix PR：可能与 #10894 的 image marker normalization 相关。  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10894

#### PR #10877：修复 `sops/run-detail` 未返回 run-level failure reason
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10877
- 状态：Open
- 标签：`domain:security`, `risk:high`
- 问题：当 SOP run 在 step 结果生成前失败时，API 返回 `status: failed`、`steps: []`，但没有失败原因。
- 影响：安全/运维场景下可观测性不足，排障困难。

---

### P1 / CI 阻塞类

#### Issue #10875：Telegram media-group tests flaky，阻塞无关 PR
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10875
- 状态：Open / In Progress
- 标签：`priority:p1`, `type:test`, `channel:telegram`, `risk:low`
- Fix PR：#10881  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10881
- 影响：CI Required Gate 变红，降低合并效率。

#### Issue #10883：Telegram media-group listener tests 在 repeated parallel runtime job 下超时
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10883
- 状态：Open / Accepted
- 标签：`priority:p1`, `channel:telegram`, `risk:medium`
- Fix PR：#10881 可能覆盖  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10881
- 影响：重复并行测试环境下出现间歇性失败。

#### Issue #10897：`daemon::tests::supervisor_preserves_component_error_chain` 在 parallel nextest 下 flaky
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10897
- 状态：Open
- 标签：`bug`
- 影响：全局 log-broadcast race 导致 CI 间歇变红。
- Fix PR：当前未见对应 PR。

---

### Provider / Runtime 多模态一致性

#### Issue #10889：Anthropic provider 在最后 block 为 image 时丢失 rolling cache breakpoint
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10889
- 状态：Open / Accepted
- 风险：Medium
- Fix PR：#10895  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10895

#### Issue #10887：非视觉能力 gate 对“形似 image marker 的普通文本”硬失败
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10887
- 状态：Open / Accepted
- 标签：`risk:high`, `runtime`, `provider`
- 问题：如果用户消息包含看起来像 image marker 但并不指向可加载图片的文本，`resolve_vision_provider` 会返回硬错误。
- 用户影响：普通文本可能误触发视觉能力检查，导致整个 turn 丢失。
- Fix PR：当前未见明确对应 PR。

#### Issue #10890 对应 PR：图片 marker 在历史 token 估算中被低估
- PR 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10890
- 状态：Open
- 问题：`[IMAGE:...]` marker 被按普通文本估算 token，低估真实多模态成本。
- 影响：上下文裁剪与预算管理可能错误，导致 provider 请求超限或表现不稳定。

---

### Provider 超时与慢响应模型

#### Issue #10884：Streaming clients 将 idle timeout 硬编码为 300 秒，`timeout_secs` 无法提高
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10884
- 状态：Open / In Progress
- 标签：`priority:p1`, `provider:openai`, `provider:compatible`, `risk:medium`
- Fix PR：#10886  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10886
- 影响：慢首 token 或长推理模型可能被误判为 provider timed out。

---

### ZeroCode / 工具性能与体验

#### Issue #10869：避免重复完整解析 specialized ZeroCode tool inputs
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10869
- 状态：Open / Accepted
- 标签：`zerocode`, `tool`, `risk:medium`
- 问题：`default_tool_disclosure` 对 specialized file input JSON 进行完整解析，可能造成重复开销。
- Fix PR：当前未见明确对应 PR。

#### PR #10882：保留 provider aliases 以修复 ZeroCode model discovery
- 链接：https://github.com/zeroclaw-labs/zeroclaw/pull/10882
- 状态：Open
- 影响：防止 `custom.first` 被降级为 `custom`，避免不同 alias 间模型选择缓存混淆。

---

## 5. 功能请求与路线图信号

### Issue #10893：当 channel 消息在生成中到达时，将其注入 in-flight turn steering pipeline
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10893
- 类型：Feature
- 诉求：消息在模型生成过程中到达时，不应只能取消当前 turn 或排队等待，而应进入已有的 steering pipeline。
- 路线图信号：ZeroClaw 正在向更实时的 Agent 交互模型演进，尤其适合聊天机器人、IM channel、长任务中断/补充指令等场景。
- 当前 PR：未见直接实现 PR。

### Issue #10892：发布 canonical config generations 并跟踪每个 target 的 apply result
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10892
- 类型：Enhancement
- 诉求：配置保存后，应明确哪些运行中消费者已经采用该配置。
- 路线图信号：与 #10876 的配置热更新一致性问题高度相关。该方向可能成为 live config apply 的基础设施。
- 当前 PR：未见直接实现 PR。

### Issue #10891：在 runtime admission 与 steering 中携带 channel provenance
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10891
- 类型：Enhancement
- 诉求：每条进入模型的 message 和 steering injection 都应携带可信 channel provenance。
- 路线图信号：项目在加强多通道消息的审计性、可信边界和安全上下文，为更复杂的 multi-channel agent 场景做准备。
- 当前 PR：未见直接实现 PR。

### Issue #10878：将 ZeroCode Sessions、Queue、Plan 合并为一个可调整 Dock
- 链接：https://github.com/zeroclaw-labs/zeroclaw/issues/10878
- 类型：Feature
- 已有 PR：#10879  
  https://github.com/zeroclaw-labs/zeroclaw/pull/10879
- 纳入下一版本可能性：较高。已有大型实现 PR，且需求边界清晰，属于用户体验增强。

---

## 6. 用户反馈摘要

### 多模态上下文连续性是当前主要痛点
用户通过 #10885、#10888、#10889 反映：工具返回图片、image marker、Anthropic cache breakpoint 在复杂 turn 中表现不稳定。  
典型场景是 ZeroCode 或 Agent 工具调用先生成/读取图片，随后模型继续分析，但图像上下文在后续请求中消失或改变，导致推理链断裂。

相关链接：
- https://github.com/zeroclaw-labs/zeroclaw/issues/10885
- https://github.com/zeroclaw-labs/zeroclaw/issues/10888
- https://github.com/zeroclaw-labs/zeroclaw/issues/10889
- https://github.com/zeroclaw-labs/zeroclaw/pull/10894
- https://github.com/zeroclaw-labs/zeroclaw/pull/10895

### CI 不稳定正在影响贡献体验
#10875、#10883、#10897 显示，多个 flaky 测试会让无关 PR 的 Required Gate 失败。  
维护者已经开始通过 #10881、#10874、#10896、#10868、#10867 等 PR 优化测试等待、任务并行度和 CI 拓扑。

相关链接：
- https://github.com/zeroclaw-labs/zeroclaw/issues/10875
- https://github.com/zeroclaw-labs/zeroclaw/issues/10883
- https://github.com/zeroclaw-labs/zeroclaw/issues/10897
- https://github.com/zeroclaw-labs/zeroclaw/pull/10881
- https://github.com/zeroclaw-labs/zeroclaw/pull/10874
- https://github.com/zeroclaw-labs/zeroclaw/pull/10896

### 用户希望配置变更具备可验证的运行时生效状态
#10876 与 #10892 指向同一类问题：配置保存成功不等于运行时组件已经应用成功。  
这对 gateway auth、RPC authorization、live config 等场景尤为关键，用户需要“保存—发布—应用—结果回执”的闭环。

相关链接：
- https://github.com/zeroclaw-labs/zeroclaw/issues/10876
- https://github.com/zeroclaw-labs/zeroclaw/issues/10892

### 慢模型与长推理场景需要更灵活的超时控制
#10884 与 #10886 显示，用户已经在使用慢首 token 或长时间 streaming 的 provider。硬编码 300 秒 idle timeout 与用户配置不一致，会造成误超时。

相关链接：
- https://github.com/zeroclaw-labs/zeroclaw/issues/10884
- https://github.com/zeroclaw-labs/zeroclaw/pull/10886

---

## 7. 待处理积压

基于本次数据，未发现“长期未响应”的历史 Issue 或 PR；今日列出的条目大多创建于 2026-09-15 至 2026-09-16，响应速度较快。  
但以下高优先级或高风险事项建议维护者优先处理，避免短期积压扩大。

### 优先关注 1：安全配置 live apply 一致性
- Issue #10876：https://github.com/zeroclaw-labs/zeroclaw/issues/10876
- 原因：`priority:p1`、`risk:high`、`domain:security`，且当前未见明确修复 PR。
- 建议：尽快明确是否由 #10892 的 config generation ledger 方案覆盖，或先做短期修复避免 auth 配置“保存但未生效”。

### 优先关注 2：CI flaky 导致合并吞吐下降
- Issue #10875：https://github.com/zeroclaw-labs/zeroclaw/issues/10875
- Issue #10883：https://github.com/zeroclaw-labs/zeroclaw/issues/10883
- Issue #10897：https://github.com/zeroclaw-labs/zeroclaw/issues/10897
- PR #10881：https://github.com/zeroclaw-labs/zeroclaw/pull/10881
- PR #10896：https://github.com/zeroclaw-labs/zeroclaw/pull/10896
- 建议：优先合入低风险 CI/test 修复，恢复 Required Gate 的可信度。

### 优先关注 3：Anthropic 多模态缓存路径
- Issue #10885：https://github.com/zeroclaw-labs/zeroclaw/issues/10885
- Issue #10889：https://github.com/zeroclaw-labs/zeroclaw/issues/10889
- PR #10895：https://github.com/zeroclaw-labs/zeroclaw/pull/10895
- PR #10894：https://github.com/zeroclaw-labs/zeroclaw/pull/10894
- 建议：将 image marker normalization、cache breakpoint、tool-result image replay 作为同一稳定性主题联合验证，避免局部修复后仍出现缓存失效或图片丢失。

### 优先关注 4：Streaming timeout 配置不生效
- Issue #10884：https://github.com/zeroclaw-labs/zeroclaw/issues/10884
- PR #10886：https://github.com/zeroclaw-labs/zeroclaw/pull/10886
- 建议：尽快评审合入。该问题影响 OpenAI-compatible provider，覆盖面较广。

---

## 总体判断

ZeroClaw 今日处于高活跃维护状态：问题定位细、修复 PR 跟进快，尤其在 Anthropic 多模态、ZeroCode、CI 与配置一致性方面动作密集。  
短期风险主要来自两类：一是 CI flaky 影响合并速度，二是多模态上下文与缓存路径存在高风险回归。  
如果 #10881、#10886、#10894、#10895 等 PR 顺利合入，项目稳定性会有明显改善；而 #10878/#10879、#10891-#10893 则显示下一阶段路线图正在向更实时、更可审计、更适合多通道 Agent 的方向演进。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*