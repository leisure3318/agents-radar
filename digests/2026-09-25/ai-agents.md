# OpenClaw 生态日报 2026-09-25

> Issues: 4 | PRs: 48 | 覆盖项目: 13 个 | 生成时间: 2026-09-25 03:57 UTC

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
日期：2026-09-25  
仓库：openclaw/openclaw

## 1. 今日速览

过去 24 小时 OpenClaw 维持了很高的工程活跃度：Issues 更新 4 条，PR 更新 48 条，其中 45 条仍待合并，3 条已合并或关闭。今日工作重心明显集中在 **Gateway、Agents、插件体系、移动端、CI/构建稳定性、安全边界与更新流程** 等核心基础设施上。  
从标签看，多个 PR 带有 `P0/P1`、`security-sensitive-changed`、`merge-risk: security-boundary / compatibility / availability`，说明当前项目正处于高频修复与架构收敛阶段，但合并风险也较高。  
社区反馈方面，今日新增 Issue 数量不多，但质量较高，集中暴露了 **自动化工具 schema 不一致、短期记忆引用错误、更新失败、iOS Cloudflare Access 登录后体验** 等具体问题。整体健康度判断：**开发活跃、维护响应快，但待审 PR 积压较多，且高风险改动密集，需要加强合并节奏与验证闭环。**

---

## 2. 项目进展

今日无新版本发布，但有 3 条 PR 被合并或关闭。已展示数据中可见 2 条关闭 PR，另有 1 条未出现在评论数最多的 30 条列表中。

### 已关闭 / 合并的重要 PR

#### 1. `fix: use publicOrigin as the default browser origin`  
链接：https://github.com/openclaw/openclaw/pull/157170  
状态：CLOSED  
作者：steipete  
标签：`gateway`、`security`、`docker`、`commands`、`merge-risk: compatibility`、`merge-risk: security-boundary`

该 PR 解决了 Gateway 控制 UI 的浏览器 origin 配置问题：此前操作者在设置 `gateway.publicOrigin` 后，仍需要重复配置 `gateway.controlUi.allowedOrigins`，否则浏览器连接可能失败。  
这项改动将 `publicOrigin` 作为默认浏览器 origin 来源，降低了容器化与公开网关部署中的配置摩擦。

项目推进意义：

- 改善 Gateway / Dashboard 的部署体验。
- 降低用户因 origin 配置遗漏导致的连接失败。
- 但由于涉及安全边界与兼容性，关闭后仍需关注后续替代 PR 或修订方案。

相关后续 PR：  
- https://github.com/openclaw/openclaw/pull/157860  
  `fix: preserve container dashboard origins with public origin`

---

#### 2. `fix(android): preserve QR pairing when setup permissions change`  
链接：https://github.com/openclaw/openclaw/pull/157569  
状态：CLOSED  
作者：fuller-stack-dev  
标签：`P1`、`rating: platinum hermit`

该 PR 关注 Android 初始配对流程中的稳定性问题：当用户在设置过程中改变权限或能力状态时，QR 配对可能中断，导致一次性 setup credential 无法顺利交换为永久设备凭据。  
该问题直接影响移动端首次使用体验，尤其是相机权限、通知权限、设备能力权限发生变化时。

项目推进意义：

- 针对 Android onboarding 的关键失败路径进行修复。
- 降低新用户首次配对失败率。
- 虽然当前状态为关闭，仍需结合是否被替代实现接管来判断最终修复是否已进入主线。

---

#### 3. 其他关闭 / 合并 PR  
今日统计显示共有 3 条 PR 被合并或关闭，但当前输入仅展示评论数最多的 30 条 PR，其中只包含 2 条关闭 PR。建议维护者在日报自动化中补充完整的 closed/merged PR 列表，以便更准确评估今日实际交付量。

---

### 待合并但进展显著的核心 PR

#### `fix: preserve task restrictions through delegation`  
链接：https://github.com/openclaw/openclaw/pull/157806  
作者：joshavant  
优先级：P1  
标签：`agents`、`gateway`、`merge-risk: security-boundary`、`merge-risk: compatibility`、`merge-risk: availability`

该 PR 解决委派任务时原始任务限制可能丢失的问题。当前设计中，如果限制被应用到整个接收会话，又会阻塞其他合法工作；如果不保留限制，则可能绕过原始任务授权边界。  
这是一个影响 Agent delegation 安全模型的重要修复。

判断：**高优先级、高风险、高价值，建议优先审查。**

---

#### `fix(system-agent): prevent helper failures from inherited runtime generations`  
链接：https://github.com/openclaw/openclaw/pull/157801  
作者：terratenney  
标签：`gateway`、`size: XL`

该 PR 修复 system-agent 委派失败、planner/greeting helper 无结果的问题，原因是请求运行携带了派生 runtime generation，并在进入不同 helper agent 或工作区时造成不兼容。  
这属于运行时隔离与 helper agent 稳定性问题，对多 Agent 协作链路影响较大。

---

#### `fix(build): pnpm build peaks near 9.5GB in the tsdown-unified step`  
链接：https://github.com/openclaw/openclaw/pull/157739  
作者：emes  
标签：`P2`、`proof: sufficient`、`ready for maintainer look`

该 PR 解决 `pnpm build` 在 `tsdown-unified` 阶段内存峰值接近 9.5GB，导致 10GB 内存机器 OOM 或 thrashing 的问题。  
对贡献者、本地构建、CI 成本都有直接影响。

判断：验证充分，维护者可优先 review。

---

#### `fix(plugins): updates fail when a plugin dependency assigns to import.meta.url`  
链接：https://github.com/openclaw/openclaw/pull/157862  
作者：obviyus  
优先级：P0  
标签：`proof: sufficient`、`ready for maintainer look`

该 PR 修复 `openclaw update` 在某些插件依赖包含合法 JavaScript：`import.meta.url` 赋值时失败的问题。  
错误表现为：

> Update state snapshot failed (exit): Assigning to rvalue

这是今日最值得关注的更新链路修复之一，因为会直接阻断用户升级。

判断：**P0 且 proof sufficient，建议尽快合并。**

---

#### `fix: prevent temporary-file exhaustion from SQLite coordination`  
链接：https://github.com/openclaw/openclaw/pull/157413  
作者：steipete  
优先级：P1  
标签：`security-sensitive-changed`、`merge-risk: availability`、`merge-risk: security-boundary`

该 PR 解决 Gateway 长时间运行或 QA 测试中可能耗尽临时文件系统 inode 的问题。即使磁盘空间充足，inode 耗尽也会导致更新、状态写入和其他操作失败。  
这是一个典型的长期运行稳定性问题，影响生产部署。

---

## 3. 社区热点

> 注：输入数据中 PR 评论数为 `undefined`，因此以下热点主要依据 Issue 评论数、优先级标签、风险标签和影响面综合判断。

### 热点 1：短期记忆 REM 引用不准确  
链接：https://github.com/openclaw/openclaw/issues/157827  
标题：`[Bug]: Grounded short-term seeds cite only the first ref of a merged REM item but store the merged text from every ref`  
作者：mariorivas1  
评论数：4  
标签：`P2`、`impact:session-state`、`issue-rating: diamond lobster`

问题描述：  
当使用：

```bash
openclaw memory rem-backfill --path <path> --stage-short-term
```

将 grounded REM evidence 写入短期存储时，单个 seed 可能包含来自多个 source line 的合并文本，但 citation 只标注第一个来源引用。这会造成候选记忆内容与引用范围不匹配。

用户诉求：

- 短期记忆应保持可追溯性。
- 合并 REM item 时，引用信息必须覆盖所有来源。
- 对于 grounded memory，错误引用会削弱信任度，尤其影响审计、调试和事实校验。

当前状态：OPEN，暂无明确 fix PR 出现在今日列表中。  
建议：优先确认是否存在数据迁移需求，因为已经写入的短期 store 可能包含不完整引用。

---

### 热点 2：`automations` 工具输出违反自身 schema  
链接：https://github.com/openclaw/openclaw/issues/157811  
标题：`automations tool returns a result violating its own outputSchema (state.scheduleErrorCount), making update/get unusable`  
作者：xiaozishan  
评论数：2  
标签：`P1`、`impact:other`、`issue-rating: diamond lobster`

问题描述：  
调用 `automations` 工具的 `action:"update"` 或 `action:"get"` 时，返回结果不符合该工具声明的 `outputSchema`，具体字段为 `state.scheduleErrorCount`。  
调用结果会被丢弃，同时工具提示副作用可能已发生，导致调用者既不能信任结果，也不能安全重试。

用户诉求：

- 工具输出必须与 schema 严格一致。
- update/get 操作应具备可验证、可重试的语义。
- 出现 schema 校验失败时，不应让用户处于“副作用可能已发生但结果不可见”的状态。

当前状态：OPEN，暂无明确 fix PR 出现在今日列表中。  
优先级判断：**P1，建议尽快修复**，因为这影响自动化任务的可靠性与幂等性。

---

### 热点 3：插件更新失败，影响升级体验  
Issue 链接：https://github.com/openclaw/openclaw/issues/157873  
PR 链接：https://github.com/openclaw/openclaw/pull/157862  

Issue #157873 报告了 OpenClaw `2026.9.6` 在 macOS arm64、Node 26.8.2 环境下更新失败，错误类型为 `invalid-config`。  
与此同时，PR #157862 针对插件依赖中 `import.meta.url` 赋值导致 `openclaw update` 失败的问题给出了 P0 修复。

虽然两者是否为同一根因仍需确认，但它们共同指向一个明显信号：**当前 update 链路对插件依赖、配置快照和错误可诊断性仍较脆弱。**

---

### 热点 4：iOS Cloudflare Access 登录后应打开内嵌 Dashboard  
链接：https://github.com/openclaw/openclaw/issues/157874  
标题：`[Feature]: Open the iOS embedded Dashboard after Cloudflare Access sign-in`  
作者：TheAngryPit  
评论数：1  
标签：`P2`、`impact:security`、`impact:ux-friction`、`needs-product-decision`、`needs-security-review`

用户诉求：  
用户希望配对后的 iOS App 在完成 Cloudflare Access 登录后，能够打开内嵌 Dashboard 和 Settings 页面，而不是被登录流程割裂。  
该需求同时涉及 UX 和安全评审，因为 Cloudflare Access 登录态、移动端嵌入式 Dashboard、设备配对状态之间存在权限边界。

判断：这是一个清晰的产品路线图信号，但需要安全评审后才能进入实现阶段。

---

## 4. Bug 与稳定性

按严重程度和影响面排序如下。

### P0 / 阻断级

#### 1. 插件依赖导致 `openclaw update` 失败  
PR：https://github.com/openclaw/openclaw/pull/157862  
相关 Issue：https://github.com/openclaw/openclaw/issues/157873  
状态：PR OPEN，`proof: sufficient`

影响：

- 用户执行 `openclaw update` 时可能失败。
- 错误信息不指向具体文件，难以定位问题插件或依赖。
- 对安装插件的用户影响较大。

是否已有 fix PR：有，#157862。  
建议：尽快合并，并补充错误上下文输出。

---

#### 2. Termux legacy metadata import 在 hardlink 受限时失败  
PR：https://github.com/openclaw/openclaw/pull/157661  
状态：OPEN，`P0`，`waiting on author`

影响：

- Termux 或受限文件系统环境下，legacy metadata 导入可能失败。
- 可能影响 Android / mobile-adjacent 场景中的数据迁移与恢复。
- 当前 PR 标记为草稿修订中，仍需作者补齐方案。

是否已有 fix PR：有，#157661，但等待作者。

---

### P1 / 高优先级

#### 3. `automations` 工具返回结果违反 outputSchema  
Issue：https://github.com/openclaw/openclaw/issues/157811  
状态：OPEN

影响：

- `update` / `get` 操作不可可靠使用。
- 调用方无法安全重试。
- 自动化任务状态管理可信度下降。

是否已有 fix PR：未在今日数据中看到明确关联 PR。

---

#### 4. 委派任务可能丢失原始 action restrictions  
PR：https://github.com/openclaw/openclaw/pull/157806  
状态：OPEN

影响：

- Agent delegation 安全边界可能不一致。
- 限制传播过弱会导致越权风险；传播过强会误伤合法工作。
- 涉及 Gateway、Agents、Docs，风险标签较高。

是否已有 fix PR：有，#157806。

---

#### 5. Android transcript refresh 可能在 worker overload 后丢失  
PR：https://github.com/openclaw/openclaw/pull/157865  
状态：OPEN，`P1`

影响：

- Android 端在 Gateway history worker 过载时可能无法刷新持久 transcript。
- 用户看到的会话历史可能滞后或缺失。
- 涉及 session-state 与安全边界风险。

是否已有 fix PR：有，#157865，但需要 proof。

---

#### 6. SQLite coordination 导致临时文件 inode 耗尽  
PR：https://github.com/openclaw/openclaw/pull/157413  
状态：OPEN，`P1`

影响：

- 长时间运行 Gateway 或 QA 测试可能耗尽临时文件系统 inode。
- 导致更新、状态写入、测试任务失败。
- 属于生产稳定性风险。

是否已有 fix PR：有，#157413，已标记 proof sufficient。

---

### P2 / 中高优先级

#### 7. REM 短期记忆引用只指向第一个来源  
Issue：https://github.com/openclaw/openclaw/issues/157827  
状态：OPEN

影响：

- 记忆内容与 citation 不匹配。
- grounded memory 的可审计性下降。
- 对依赖引用追踪的用户和开发者影响较大。

是否已有 fix PR：未在今日数据中看到明确关联 PR。

---

#### 8. Chrome 外部 attach 后下载目录被 Playwright 临时目录接管  
PR：https://github.com/openclaw/openclaw/pull/157606  
状态：OPEN，`waiting on author`

影响：

- 用户使用外部 Chromium 会话时，原生下载可能不再进入配置目录。
- 对浏览器自动化与文件下载场景影响明显。

是否已有 fix PR：有，#157606，但等待作者。

---

#### 9. Container Dashboard origin 与 publicOrigin 配置冲突  
PR：https://github.com/openclaw/openclaw/pull/157860  
状态：OPEN，`needs proof`

影响：

- 容器部署下，当设置 `gateway.publicOrigin` 且未显式配置 `gateway.controlUi.allowedOrigins` 时，Dashboard 浏览器请求可能被 origin admission 拒绝。
- 与已关闭 PR #157170 形成连续修复链。

是否已有 fix PR：有，#157860。

---

#### 10. 构建内存峰值过高导致 OOM  
PR：https://github.com/openclaw/openclaw/pull/157739  
状态：OPEN，`proof: sufficient`

影响：

- 10GB 内存机器上运行 `pnpm build` 可能失败。
- 降低贡献者开发体验和 CI 稳定性。
- 当前修复聚焦 `tsdown-unified` 阶段，另有 declaration-stage memory 问题未覆盖。

是否已有 fix PR：有，#157739。

---

## 5. 功能请求与路线图信号

### 1. iOS 内嵌 Dashboard 支持 Cloudflare Access 登录后自动打开  
Issue：https://github.com/openclaw/openclaw/issues/157874  
状态：OPEN  
标签：`needs-product-decision`、`needs-security-review`

这是今日最明确的新功能请求。它反映出 OpenClaw 在移动端和企业访问控制场景中的需求增长：用户不只希望移动端完成配对，还希望在经过 Cloudflare Access 身份认证后，直接进入内嵌 Dashboard 和 Settings。

纳入下一版本可能性：中等。  
原因：

- 需求明确，用户场景具体。
- 但涉及 Cloudflare Access、嵌入式 WebView、移动端登录态和安全边界，需要产品和安全评审。
- 当前标签明确标注 `no-new-fix-pr` 与 `needs-product-decision`，说明短期内不会直接实现。

---

### 2. 部署插件提供 supervisor 指引  
PR：https://github.com/openclaw/openclaw/pull/157679  
状态：OPEN  
标签：`feat(plugins)`、`proof: sufficient`、`ready for maintainer look`

该 PR 允许 deployment plugins 提供特定 supervisor 名称与管理说明，而不是所有外部托管部署都显示通用 Gateway 管理提示。  
这代表 OpenClaw 正在增强面向多部署形态的运维体验。

纳入下一版本可能性：较高。  
原因：

- 已有 PR。
- proof sufficient。
- 处于 ready for maintainer look。
- 用户影响清晰，主要是改善部署和升级指导。

---

### 3. Cron run 应继承频道格式规则  
PR：https://github.com/openclaw/openclaw/pull/157877  
状态：OPEN

该 PR 修复定时任务向频道发布公告时，没有获得该频道格式规则的问题。例如 Telegram 频道启用 `richMessages: true`，但 scheduled run 不知道该 contract，导致模型猜测 markup。  
这既是修复，也体现出路线图方向：**自动化任务应更完整地继承 channel context**。

纳入下一版本可能性：中等偏高。  
原因：

- 场景具体。
- 用户影响直观。
- 风险相对小于 security-boundary 类 PR。

---

### 4. 模型选择器中保持当前选择优先显示  
PR：https://github.com/openclaw/openclaw/pull/157869  
状态：OPEN

该 PR 改善 Models settings 和 `/models` 页面中模型列表的排序体验，避免当前已选模型在大型 provider 列表中被淹没。  
随着 provider 模型数量增加，这类 UX 优化会越来越重要。

纳入下一版本可能性：中等偏高。  
原因：

- 改动范围较小。
- 用户体验收益明确。
- 涉及 Web UI、Gateway、Agents、Docs，但风险标签不高。

---

## 6. 用户反馈摘要

### 用户痛点 1：更新失败时缺少可诊断信息  
相关 Issue：https://github.com/openclaw/openclaw/issues/157873  
相关 PR：https://github.com/openclaw/openclaw/pull/157862

用户在 macOS arm64、Node 26.8.2、OpenClaw 2026.9.6 环境下报告 update failure。类似 `Assigning to rvalue` 这类错误如果不指明文件或插件，会让用户无法自助排查。  
反馈说明 OpenClaw 的 update 体验不仅需要修复根因，也需要改进错误报告质量。

---

### 用户痛点 2：自动化工具结果不可信任，且不可安全重试  
Issue：https://github.com/openclaw/openclaw/issues/157811

`automations` 工具返回不符合 outputSchema 的数据后，调用结果被丢弃，但副作用可能已经发生。这是典型的“最坏状态”：用户不知道操作是否成功，也不能无风险重试。  
这类问题会显著影响用户对自动化系统的信任。

---

### 用户痛点 3：记忆系统的引用必须准确  
Issue：https://github.com/openclaw/openclaw/issues/157827

用户关注 REM backfill 到 short-term store 后，seed 文本与 citation 不一致的问题。  
这说明 OpenClaw 用户已经在认真使用 grounded memory / evidence traceability，而不只是简单地把记忆当上下文缓存。引用错误会让用户难以审计模型为何得出某个结论。

---

### 用户痛点 4：移动端登录与 Dashboard 体验割裂  
Issue：https://github.com/openclaw/openclaw/issues/157874

iOS 用户希望 Cloudflare Access 登录后自然进入内嵌 Dashboard，而不是手动绕过多个步骤。  
该反馈表明移动端 OpenClaw 正在从“配对工具”走向“完整控制界面”，但同时也需要更成熟的认证与授权设计。

---

### 用户痛点 5：构建和测试成本偏高  
相关 PR：  
- https://github.com/openclaw/openclaw/pull/157739  
- https://github.com/openclaw/openclaw/pull/157653  
- https://github.com/openclaw/openclaw/pull/157655  
- https://github.com/openclaw/openclaw/pull/157695  

多条 PR 都在降低构建内存、缩短 E2E fixture、减少 UI proof dwell、串行化不安全 QA proof。这反映出贡献者和 CI 系统正在承受较高验证成本。  
维护者正在主动优化，但仍需持续关注测试矩阵复杂度。

---

## 7. 待处理积压

> 由于输入仅覆盖过去 24 小时，无法准确判断“长期未响应”。以下列出当前高优先级、等待作者、需要 proof 或需要维护者决策的关键积压项。

### 需要维护者优先审查

#### `fix(plugins): updates fail when a plugin dependency assigns to import.meta.url`  
链接：https://github.com/openclaw/openclaw/pull/157862  
优先级：P0  
状态：ready for maintainer look  
原因：更新链路阻断问题，且已有 proof sufficient。

---

#### `fix: prevent temporary-file exhaustion from SQLite coordination`  
链接：https://github.com/openclaw/openclaw/pull/157413  
优先级：P1  
状态：ready for maintainer look  
原因：影响长期运行 Gateway 的可用性，涉及 inode 耗尽。

---

#### `fix: preserve task restrictions through delegation`  
链接：https://github.com/openclaw/openclaw/pull/157806  
优先级：P1  
状态：needs proof  
原因：涉及 Agent delegation 安全边界，必须尽快形成验证闭环。

---

#### `fix(build): pnpm build peaks near 9.5GB in the tsdown-unified step`  
链接：https://github.com/openclaw/openclaw/pull/157739  
优先级：P2  
状态：ready for maintainer look  
原因：影响本地构建和 CI 稳定性，已有充分 proof。

---

### 等待作者补充的 PR

#### `fix: import legacy metadata when Termux blocks hardlinks`  
链接：https://github.com/openclaw/openclaw/pull/157661  
优先级：P0  
状态：waiting on author  
原因：当前说明显示 follow-up revision in progress，需作者完成修订后再评审。

---

#### `fix: keep native Chrome downloads in the configured folder after CDP attach`  
链接：https://github.com/openclaw/openclaw/pull/157606  
优先级：P2  
状态：waiting on author  
原因：涉及 browser extension 和安全评审，需作者补充或调整。

---

#### `fix: authenticate transitive Windows repair proof modules`  
链接：https://github.com/openclaw/openclaw/pull/157856  
优先级：P2  
状态：waiting on author  
原因：涉及 Windows repair proof 的 transitive module 鉴权，属于自动化与供应链安全相关问题。

---

### 需要产品 / 安全决策的 Issue

#### iOS Cloudflare Access 登录后打开内嵌 Dashboard  
链接：https://github.com/openclaw/openclaw/issues/157874  
状态：needs-product-decision、needs-security-review  
原因：功能诉求明确，但涉及认证、移动端嵌入式 UI 和访问控制边界。

---

## 综合健康度评估

OpenClaw 今日表现出非常强的开发动能：48 条 PR 更新说明维护与贡献活动高度活跃，且大量工作集中在核心稳定性、安全边界、插件更新、移动端体验和部署体验上。  
不过，待合并 PR 高达 45 条，且其中不少是 XL size、security-sensitive 或 compatibility risk，说明维护者面临较重的 review 和验证压力。  
短期建议优先处理三类事项：

1. **P0/P1 阻断问题**：如 update 失败、Termux metadata 导入、automation schema mismatch。  
2. **安全边界问题**：如 delegation restrictions、Gateway origin、Windows repair proof module 鉴权。  
3. **高收益稳定性问题**：如 SQLite 临时文件耗尽、构建 OOM、Android transcript refresh。

总体判断：项目处于 **高活跃、高复杂度、高维护压力** 状态；只要合并验证节奏跟上，当前积压中的多项修复将显著提升下一版本的稳定性与部署体验。

---

## 横向生态对比

# 个人 AI 助手 / 自主智能体开源生态横向对比报告  
日期：2026-09-25

---

## 1. 生态全景

过去 24 小时，个人 AI 助手与自主智能体开源生态整体呈现 **高活跃、高复杂度、强工程化收敛** 的状态。头部项目如 OpenClaw、Hermes Agent、ZeroClaw、NanoBot、CoPaw/QwenPaw 正在从“能跑的 Agent”进入“可长期运行、可安全部署、可跨端使用、可观测可恢复”的阶段。  
共同问题集中在 **更新链路、Gateway/代理、安全边界、Provider 兼容、多端 UI、长任务状态恢复、记忆与上下文治理**。  
生态中也出现明显分层：OpenClaw、Hermes Agent 代表高复杂度基础设施型 Agent；NanoBot、CoPaw 更偏多端体验与渠道集成；NanoClaw、ZeroClaw 聚焦安全代理、SOP、插件和发布工程；PicoClaw、IronClaw、NullClaw 则处于局部能力打磨或质量巩固阶段。

---

## 2. 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release | 今日重点 | 健康度评估 |
|---|---:|---:|---|---|---|
| **OpenClaw** | 4 | 48 | 无 | Gateway、Agents、插件更新、移动端、CI、安全边界 | **高活跃，高维护压力**。核心基础设施推进快，但 45 个 PR 待合并且高风险标签密集 |
| **Hermes Agent** | 50 | 50 | v0.21.5 / v2026.9.24 | Windows 桌面、PM runtime、更新链路、远程文件写入、安全隐私 | **极高活跃，稳定性压力大**。刚发布后回归密集，但修复响应很快 |
| **NanoBot** | 7 | 11 | 无 | WebUI、Provider、Telegram/DingTalk/Feishu/WeChat | **健康活跃**。问题能快速转化为 PR，多端体验持续改善 |
| **PicoClaw** | 2 | 5 | 无 | Go 依赖升级、多行输入 bug | **中等活跃**。依赖维护正常，但核心体验 bug 待修复 |
| **NanoClaw** | 2 | 11 | 无 | Iron Proxy、arm64、CI、Claude streaming heartbeat | **较高活跃，发布后打磨期**。问题闭环较快 |
| **NullClaw** | 0 | 8 | 无 | Memory、CLI、Provider diagnostics、Discord、Skills、Docs | **维护活跃但社区反馈弱**。以主动修复和文档补强为主 |
| **IronClaw** | 1 | 0 | 1.4.1-rc.2 | Google OAuth RC、benchmark failure taxonomy | **低代码活跃，质量监控稳定**。处于小版本验证期 |
| **LobsterAI** | 0 | 8 | 无 | OpenClaw 集成稳定性、Gateway 热重载、Cowork UI | **中高活跃**。偏产品集成与运行时修复 |
| **CoPaw / QwenPaw** | 5 | 10 | 无 | Console、上下文窗口、媒体历史、工具调用、移动端诉求 | **高活跃修复期**。真实用户场景反馈明显 |
| **ZeroClaw** | 8 | 18 | 无 | 发布链路、SOP、安全、插件、Provider、Windows | **高活跃，高风险并行开发**。能力扩张快，需控制 PR 风险 |
| **TinyClaw** | 0 | 0 | 无 | 无活动 | **静默** |
| **Moltis** | 0 | 0 | 无 | 无活动 | **静默** |
| **ZeptoClaw** | 0 | 0 | 无 | 无活动 | **静默** |

---

## 3. OpenClaw 在生态中的定位

### 3.1 定位概括

OpenClaw 当前处于生态中的 **核心基础设施型个人 AI 助手 / Agent 平台** 位置。相比 NanoBot、PicoClaw 等更轻量或渠道导向项目，OpenClaw 的关注点更接近完整 Agent OS：Gateway、Delegation、安全限制、插件更新、移动端配对、记忆、CI 构建、长期运行稳定性都在同时推进。

### 3.2 相对优势

| 维度 | OpenClaw 表现 | 对比观察 |
|---|---|---|
| 工程活跃度 | 48 个 PR 更新，4 个 Issue 更新 | 仅低于 Hermes Agent 的 50/50 级别，显著高于大多数项目 |
| 基础设施深度 | Gateway、Agents、插件、移动端、更新、安全边界同时推进 | 比 NanoBot、PicoClaw 更底层、更系统化 |
| 安全意识 | 多个 PR 带 `security-sensitive-changed`、`merge-risk: security-boundary` | 安全边界治理成熟度较高，但也带来 review 压力 |
| 用户场景覆盖 | 桌面、移动、容器、插件、自动化、记忆 | 覆盖面接近 Hermes Agent、ZeroClaw 这类平台型项目 |
| 维护响应 | P0/P1 问题已有多个对应 PR | update、SQLite inode、delegation restrictions 等修复推进较快 |

### 3.3 技术路线差异

OpenClaw 的路线重点是 **以 Gateway 和 Agent runtime 为中心的可部署 AI 助手基础设施**：

- 相比 **NanoBot**：OpenClaw 更强调安全边界、任务委派、Gateway 和插件基础设施；NanoBot 更强调 WebUI、多 IM 渠道和 Provider 兼容。
- 相比 **Hermes Agent**：两者都偏复杂 Agent 平台，但 Hermes 当前更受桌面端、Windows、PM runtime 和更新回归困扰；OpenClaw 今日更集中在 Gateway、delegation、插件更新和构建稳定性。
- 相比 **ZeroClaw**：ZeroClaw 更强调 SOP、插件权限、发布链路和企业化安全架构；OpenClaw 更强调个人助手运行链路、插件更新和移动端配对体验。
- 相比 **LobsterAI**：LobsterAI 当前大量工作是在集成和增强 OpenClaw 行为，说明 OpenClaw 已成为其他项目可复用的底层 Agent 能力源。

### 3.4 社区规模与压力

OpenClaw 今日 48 个 PR 更新、45 个待合并，说明其社区与维护流量处于头部梯队。  
但这也带来明显风险：高优先级、高风险、大体量 PR 同时堆积，短期最关键不是缺少贡献，而是 **review、proof、CI 和合并节奏能否跟上**。

---

## 4. 共同关注的技术方向

### 4.1 更新与发布链路可靠性

涉及项目：**OpenClaw、Hermes Agent、ZeroClaw、NanoClaw、LobsterAI**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | `openclaw update` 因插件依赖 `import.meta.url` 赋值失败；需要更强错误诊断 |
| Hermes Agent | `hermes update`、Desktop Update、PM runtime、Hindsight 插件多处回归 |
| ZeroClaw | crates.io / GitHub Release 顺序和 preflight 校验需要强化 |
| NanoClaw | Iron Proxy 安装失败恢复、arm64 安装兼容 |
| LobsterAI | Gateway 策略热重载，减少配置变更重启成本 |

**趋势判断：** Agent 项目已经从“源码运行”转向“长期安装、自动更新、插件扩展、桌面/移动部署”，更新链路成为核心用户体验。

---

### 4.2 Provider 兼容与模型能力发现

涉及项目：**NanoBot、CoPaw、ZeroClaw、PicoClaw、OpenClaw、NullClaw、LobsterAI**

| 项目 | 具体诉求 |
|---|---|
| NanoBot | OpenCode Go muse-spark 需要 Responses API；GitHub Copilot GPT-6 不兼容 |
| CoPaw | 本地 llama.cpp 被错误套用云模型 1M 上下文窗口 |
| ZeroClaw | 新增 Cheaper Inference typed provider；保留 provider alias 成本配置 |
| PicoClaw | Anthropic SDK、MCP SDK 升级需验证兼容性 |
| NullClaw | Provider 非 2xx 错误体需要脱敏记录 |
| LobsterAI | OpenAI-compatible 工具调用参数异常需 repair 和 continuation |
| OpenClaw | 插件和 Provider 依赖影响 update，模型/工具链兼容性成为更新风险 |

**趋势判断：** “OpenAI-compatible” 不再意味着完全兼容。Responses API、reasoning history、tool calling、context window、provider alias、错误体格式都成为适配重点。

---

### 4.3 长上下文、记忆与状态压缩治理

涉及项目：**OpenClaw、NanoBot、Hermes Agent、CoPaw、NullClaw、LobsterAI、IronClaw**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | REM 短期记忆 citation 不完整；session-state 可信度问题 |
| NanoBot | context compaction 内部 checkpoint 不应发给 Feishu/WeChat 用户 |
| Hermes Agent | session compression 后 identity mismatch、消息消失、phase replay 问题 |
| CoPaw | Scroll 历史媒体回收、thinking 省略与 token counting 对齐 |
| NullClaw | archived conversation shards 不应进入实时上下文；memory recall 可配置 |
| LobsterAI | compaction / recovery 后 accepted work 需保留 |
| IronClaw | benchmark 暴露 OCR 文档理解质量问题 |

**趋势判断：** 记忆不再只是“多塞上下文”，而是进入 **可追溯、可预算、可恢复、可隐藏内部机制** 的阶段。

---

### 4.4 Gateway、代理、安全边界与权限治理

涉及项目：**OpenClaw、ZeroClaw、NanoClaw、Hermes Agent、LobsterAI**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | delegation restrictions、Gateway origin、SQLite coordination、Dashboard origin |
| ZeroClaw | OIDC principals、plugin egress 授权、host-mediated sockets、TLS profiles |
| NanoClaw | Iron Proxy per-host auto-approval、arm64 proxy 安装 |
| Hermes Agent | vault 密码 redaction、Bot Mode group chat 可能跨 gateway 泄露 |
| LobsterAI | Gateway trusted proxies / tools / real IP fallback 热重载 |

**趋势判断：** Agent 运行环境越来越像“微型云平台”：有网关、有身份、有代理、有插件权限、有审计和热配置。安全边界将决定项目能否进入企业和长期自托管场景。

---

### 4.5 多端 UI 与移动端诉求

涉及项目：**OpenClaw、NanoBot、Hermes Agent、CoPaw、NanoClaw、LobsterAI**

| 项目 | 具体诉求 |
|---|---|
| OpenClaw | iOS Cloudflare Access 登录后打开内嵌 Dashboard |
| NanoBot | WebUI 会话草稿、tokens/sec、移动交互优化 |
| Hermes Agent | Desktop 引用回复、Windows Desktop 稳定性 |
| CoPaw | 官方移动端 App、Console Recent Sessions |
| NanoClaw | 安装提示、CLI help、community portal runtime |
| LobsterAI | Cowork 进度卡、UI 主题和布局统一 |

**趋势判断：** 用户不再满足于 CLI Agent。Web、Desktop、Mobile、IM 渠道正在并行成为 AI 助手的主要入口。

---

## 5. 差异化定位分析

| 项目 | 功能侧重 | 目标用户 | 技术架构特征 |
|---|---|---|---|
| **OpenClaw** | Gateway、Agent delegation、插件、移动端、记忆、安全边界 | 高级个人用户、自托管用户、Agent 平台开发者 | 以 Gateway + Agent runtime + 插件体系为核心，强调安全限制与长期运行 |
| **Hermes Agent** | 桌面端、PM runtime、远程后端、session 状态、工具执行 | 重度桌面用户、开发者、远程环境用户 | 大型一体化 Agent 平台，跨 Desktop/CLI/TUI/Cloud，复杂度最高之一 |
| **NanoBot** | WebUI、多 IM 渠道、Provider 兼容 | 多渠道聊天机器人用户、轻量团队助手用户 | WebUI + Provider adapter + IM channel，强调渠道一致性 |
| **PicoClaw** | Go 生态、移动 TUI、MCP/多渠道依赖 | Go 开发者、轻量本地助手用户 | Go 技术栈，当前重点在依赖维护和输入体验 |
| **NanoClaw** | Iron Proxy、安全代理、setup、Claude/OpenCode runtime | 安全代理用户、本地 AI 工作站用户 | 强调代理网关、安装可靠性、运行时容器 heartbeat |
| **NullClaw** | Memory、CLI、Provider diagnostics、Skills、Discord | 轻量可扩展助手用户、运维型用户 | 模块化能力明显，重视 memory 可控性和诊断 |
| **IronClaw** | Google 集成、benchmark、质量监控 | 企业集成用户、评测关注者 | 发布节奏较稳，强调外部服务 OAuth 与 benchmark taxonomy |
| **LobsterAI** | OpenClaw 集成、Cowork、UI、Gateway 配置 | 桌面协作用户、OpenClaw 上层产品用户 | 在 OpenClaw 能力上做产品化封装和体验增强 |
| **CoPaw / QwenPaw** | Console、多 Agent、上下文、媒体、插件 | 桌面 / Console 用户、多 Agent 工作台用户 | 强调 Console 信息架构、跨 Provider 媒体和本地模型能力配置 |
| **ZeroClaw** | SOP、插件权限、安全认证、发布工程、Provider | 企业化 Agent 平台开发者、自动化工作流用户 | SOP + Gateway + plugin + OIDC + release pipeline，企业化倾向强 |

---

## 6. 社区热度与成熟度

### 6.1 快速迭代 / 高复杂度阶段

代表项目：**Hermes Agent、OpenClaw、ZeroClaw、CoPaw**

特征：

- Issue / PR 数量高；
- 高风险 PR 多；
- 涉及 Gateway、Runtime、安全、插件、桌面端、更新链路等核心基础设施；
- 用户真实环境反馈密集。

| 项目 | 判断 |
|---|---|
| Hermes Agent | 极高活跃，但 v0.21.5 后回归密集，属于“高速发布后稳定性消化” |
| OpenClaw | 高活跃且基础设施推进系统化，但待合并 PR 多，review 压力大 |
| ZeroClaw | 能力扩张很快，SOP、安全、插件、发布工程并行推进，需控制大型 PR 风险 |
| CoPaw | 用户反馈具体，Console、媒体、上下文问题体现真实使用深度 |

---

### 6.2 质量巩固 / 产品体验打磨阶段

代表项目：**NanoBot、NanoClaw、LobsterAI、NullClaw**

特征：

- PR 数量中等；
- 主要围绕稳定性、UI/UX、Provider 兼容和诊断能力；
- 更强调“真实使用中的边界条件”。

| 项目 | 判断 |
|---|---|
| NanoBot | WebUI 与 IM 渠道体验快速成熟，Provider 问题响应快 |
| NanoClaw | 2.4.0 后稳定性打磨，Iron Proxy 和 setup 问题闭环清晰 |
| LobsterAI | OpenClaw 上层产品化明显，Cowork 和 UI 体验持续增强 |
| NullClaw | 无 Issue 但 PR 集中，维护者主动补齐 memory、CLI、diagnostics |

---

### 6.3 小版本验证 / 低活跃稳定阶段

代表项目：**IronClaw、PicoClaw**

| 项目 | 判断 |
|---|---|
| IronClaw | 今日主要是 RC 发布和 benchmark 观察，代码活跃低但质量治理稳定 |
| PicoClaw | 依赖升级活跃，多行输入 bug 需尽快处理，整体规模较小 |

---

### 6.4 静默阶段

代表项目：**TinyClaw、Moltis、ZeptoClaw**

过去 24 小时无活动，无法判断其长期健康度，但在今日横向生态中热度最低。

---

## 7. 值得关注的趋势信号

### 趋势 1：Agent 平台正在从“模型调用器”演进为“长期运行系统”

多个项目都在处理更新、恢复、状态压缩、session takeover、heartbeat、rollback、SQLite、cron、Gateway 热重载等问题。  
这说明 AI 助手的核心竞争力正在从 prompt / model adapter 转向 **系统可靠性工程**。

对开发者的参考：

- 需要把 Agent 当成长期服务，而不是一次性脚本；
- 需要设计状态恢复、幂等、回滚、错误可诊断；
- 需要为 compaction、memory、tool side effects 建立一致语义。

---

### 趋势 2：Provider 生态碎片化正在加剧

NanoBot、CoPaw、ZeroClaw、LobsterAI、NullClaw 都出现 Provider 兼容问题。  
差异点包括：

- `/chat/completions` vs `/responses`；
- reasoning history；
- tool calling 参数格式；
- context window；
- provider alias；
- 错误响应体；
- 本地模型能力与云 catalog 不一致。

对开发者的参考：

- 不要假设 OpenAI-compatible 等于兼容；
- Provider adapter 应具备 capability discovery、显式 override、错误体记录和兼容层；
- 本地模型与云模型应分离能力配置。

---

### 趋势 3：安全边界成为 Agent 项目的主线能力

OpenClaw、Hermes、ZeroClaw、NanoClaw 都在处理安全边界：

- task restrictions 传播；
- vault secret redaction；
- plugin egress permission；
- OIDC enrollment；
- Gateway origin；
- per-host approval；
- Bot Mode 隐私同步。

对开发者的参考：

- Agent 安全不能只靠用户确认弹窗；
- 权限应具备 scope、method、host、workspace、skill 维度；
- 审批、审计、redaction、默认拒绝策略会成为基础设施标配。

---

### 趋势 4：记忆系统进入“可信记忆”阶段

OpenClaw 的 REM citation、NullClaw 的 archived shard 污染、NanoBot 的 checkpoint 泄露、LobsterAI 的 accepted work 保留，都指向同一问题：  
记忆系统不仅要“记住”，还要 **知道来源、控制注入、避免污染、支持恢复、隐藏内部机制**。

对开发者的参考：

- memory recall 必须有 citation 和可追溯性；
- 自动召回应可配置；
- 内部 checkpoint / compaction 消息不应泄露给终端用户；
- 历史状态进入 prompt 前应经过严格过滤和预算控制。

---

### 趋势 5：移动端和多入口成为下一阶段竞争点

OpenClaw、CoPaw、NanoBot、Hermes、LobsterAI 都出现移动端、Desktop、WebUI、IM 渠道、多 surface session 的诉求。

对开发者的参考：

- Agent 产品需要跨端 session ownership 设计；
- 移动端不只是聊天窗口，还涉及认证、Dashboard、Settings、配对、安全连接；
- WebUI / Desktop / IM / Mobile 的消息可见性和 hidden/system message 策略必须统一。

---

### 趋势 6：发布工程与 CI 成为开源 Agent 项目的成熟度分水岭

ZeroClaw 的 release preflight、OpenClaw 的构建 OOM、NanoClaw 的 flaky test、Hermes 的 PM runtime 测试、PicoClaw 的依赖升级，都说明项目越成熟，越需要发布工程投入。

对开发者的参考：

- 建议建立 release preflight、artifact 校验、crates/npm/pip 发布一致性检查；
- 高风险 PR 应要求 proof；
- CI flaky 会直接拖慢安全修复合并；
- 构建内存、测试耗时、依赖升级兼容性是维护成本大头。

---

## 总结判断

当前个人 AI 助手 / 自主智能体开源生态已经进入 **基础设施化和产品化并行推进** 阶段。OpenClaw、Hermes Agent、ZeroClaw 是平台型项目的代表，承担复杂运行时、安全和部署能力；NanoBot、CoPaw、LobsterAI 更贴近用户界面、多端入口和真实使用体验；NullClaw、NanoClaw、PicoClaw、IronClaw 则在特定能力点上持续打磨。  

对技术决策者而言，选型时应重点关注三类指标：

1. **运行可靠性**：更新、恢复、compaction、长任务、CI/release 是否成熟。  
2. **安全与权限模型**：Gateway、插件、工具调用、secret redaction、审批机制是否完备。  
3. **Provider 与多端适配能力**：是否能应对模型接口碎片化，以及 Web/Desktop/Mobile/IM 多入口需求。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报｜2026-09-25

## 1. 今日速览

过去 24 小时，NanoBot 项目保持较高活跃度：新增或更新 Issues 7 条，PR 更新 11 条，其中 5 条仍待合并，6 条已合并或关闭。今日没有新版本发布，但 WebUI、Provider、Telegram/DingTalk/Feishu/WeChat 等多端能力均有明显推进。  
整体来看，项目当前重点集中在三条主线：**多模型 Provider 兼容性、WebUI 体验优化、IM 渠道稳定性与消息表现一致性**。  
社区反馈以实际使用中的边界问题为主，例如长任务期间无法继续发送消息、上下文压缩消息泄露到用户侧、GitHub Copilot 新模型不兼容等，说明 NanoBot 正在被用于较复杂的真实工作流场景。  
项目健康度良好：问题被快速转化为 PR，例如 OpenCode Go Responses API 支持已有对应实现 PR，Telegram Markdown 渲染问题也已有修复 PR。

---

## 2. 项目进展

今日共有 6 个 PR 已合并或关闭，主要推进 WebUI 性能、Provider 稳定性、测试清理和用户增长入口。

### WebUI 性能与体验改进

- [PR #5905：fix(webui): keep global page URLs clean and defer chat mounting](https://github.com/HKUDS/nanobot/pull/5905)  
  该 PR 修复了全局页面 URL 中错误携带选中会话的问题，并避免直接打开设置等页面时不必要地挂载隐藏聊天组件。  
  影响：
  - 减少无意义的会话和命令拉取；
  - 改善从设置页返回临时聊天时的状态保持；
  - 降低 WebUI 初始化时的副作用。

- [PR #5904：perf(webui): improve chat refresh and mobile interactions](https://github.com/HKUDS/nanobot/pull/5904)  
  优化聊天刷新与移动端交互。刷新时不再直接替换为完整 loading 页面，而是从 tab-local bounded cache 中恢复最近认证线程，同时后台重新校验。  
  影响：
  - 聊天刷新体验更平滑；
  - 移动端交互更稳定；
  - 减少启动阶段对应用目录等资源的急切加载。

- [PR #5901：fix(webui): allow custom context window token budgets](https://github.com/HKUDS/nanobot/pull/5901)  
  WebUI 上下文窗口设置从固定选项改为可输入精确 token 数或 K/M 简写。  
  影响：
  - 支持 128000、131072 等实际模型常用上下文预算；
  - 增强高级用户对成本、性能和上下文长度的控制；
  - 增加可访问的内联校验提示。

- [PR #5895：feat(webui): invite returning users to star nanobot](https://github.com/HKUDS/nanobot/pull/5895)  
  为回访 WebUI 用户增加 GitHub Star 邀请，并在 Settings → About 中增加 Star 链接。  
  影响：
  - 有助于项目增长和社区传播；
  - 触发条件较克制：需要跨 3 个 UTC 日期累计 10 次成功回复，避免过早打扰用户。

### Provider 稳定性修复

- [PR #5894：fix(providers): backfill missing reasoning history for deepseek-flash](https://github.com/HKUDS/nanobot/pull/5894)  
  修复 `deepseek-flash` 在默认 thinking mode 下，通过 Chat Completions 使用工具调用历史时，因缺少 `reasoning_content` 导致 HTTP 400 的问题。  
  影响：
  - 提升 DeepSeek Flash 工具调用链路稳定性；
  - 延续既有 history backfill 机制；
  - 对使用 thinking 模型和工具调用的用户较关键。

### 代码清理与维护

- [PR #5897：refactor: remove unused helpers and internal exports](https://github.com/HKUDS/nanobot/pull/5897)  
  移除多个无调用方的 helper 和内部导出，包括 `run_quick_start_onboard`、`WorkspaceScopeResolver.for_message`、`WebUIGatewayEndpoint.is_webui_connection`、`localeOption` 等。  
  影响：
  - 降低维护负担；
  - 减少无效公共 API 面；
  - 未涉及运行时行为变更，风险较低。

整体来看，今日已完成的 PR 主要提升了 **WebUI 可靠性、Provider 兼容性和代码库可维护性**，属于中等规模但质量导向明显的一轮推进。

---

## 3. 社区热点

今日所有 Issue 和 PR 的互动量整体不高，绝大多数评论数为 0、反应数为 0；唯一有评论的 Issue 是 OpenCode Go Provider 相关需求。

### OpenCode Go / muse-spark Contributor 模型兼容性

- [Issue #5896：feat(providers): support OpenAI Responses API for opencode_go](https://github.com/HKUDS/nanobot/issues/5896)  
  评论数：1，反应数：0  
  用户反馈 `muse-spark-1.3-contributor` / `muse-spark-1.2-contributor` 在 `opencode.ai/zen/go/v1` 上需要使用 OpenAI Responses API 格式，即 `/responses`，但当前网关 `/chat/completions` 会返回 500。  
  该问题已有对应 PR：
  - [PR #5906：feat(providers): route OpenCode Go muse-spark contributor models through Responses](https://github.com/HKUDS/nanobot/pull/5906)

  背后诉求：  
  用户希望 NanoBot 能够适配不同 Provider 对 OpenAI 兼容协议的差异，尤其是在新模型或第三方网关逐渐采用 Responses API 的背景下，单一路由到 Chat Completions 已无法覆盖所有模型。

### WebUI 会话状态与输入体验

- [Issue #5910：feat(webui): persist composer draft per conversation](https://github.com/HKUDS/nanobot/issues/5910)  
  用户指出在侧边栏打开多个会话时，切换会话会导致 composer 中未发送文本丢失。  
  背后诉求：  
  用户正在使用 NanoBot 进行多任务、多会话协作，希望草稿状态能按会话保存，避免上下文切换造成输入损失。

- [Issue #5908：feat(webui): show live tokens/sec while streaming a reply](https://github.com/HKUDS/nanobot/issues/5908)  
  用户希望在 WebUI 流式回复期间显示实时 tokens/sec。  
  背后诉求：  
  用户不仅关心结果，也关心模型运行状态、吞吐速度和是否卡顿。这是面向高级用户和调试场景的重要可观测性需求。

### 多渠道消息表现

- [Issue #5903：Feishu hidden session-checkpoint marker delivered to user](https://github.com/HKUDS/nanobot/issues/5903)  
  Feishu 渠道中，内部 session checkpoint marker 被作为普通消息发送给用户。  
  背后诉求：  
  用户希望内部上下文压缩、工作记忆恢复等机制对终端用户不可见，避免破坏聊天体验。

- [Issue #5900：Silent context compaction and reduce WeChat channel polling log verbosity](https://github.com/HKUDS/nanobot/issues/5900)  
  用户希望上下文压缩静默进行，不再向 WeChat / WhatsApp 等渠道发送通知，同时降低 WeChat 轮询日志噪声。  
  背后诉求：  
  NanoBot 的长期会话能力正在被实际用于 IM 场景，用户更关注“像真人助手一样安静工作”，而不是暴露内部维护动作。

---

## 4. Bug 与稳定性

以下按影响程度和用户可感知程度排序。

### 高优先级：内部 checkpoint 消息泄露给 Feishu 用户

- [Issue #5903：Feishu: hidden session-checkpoint marker is delivered to the user after idle compaction](https://github.com/HKUDS/nanobot/issues/5903)  
  状态：Open  
  是否已有 fix PR：当前数据中未发现直接对应 PR  
  影响：  
  Feishu 渠道在 idle auto-compaction 后，将内部消息：

  ```text
  Continue the active task from the working-memory checkpoint above.
  ```

  作为普通聊天消息发送给用户。  
  风险分析：
  - 暴露内部工作流语义；
  - 影响用户信任和产品观感；
  - 可能导致用户误解任务状态；
  - 与“隐藏消息”“系统消息不下发”的预期不一致。

### 中高优先级：GitHub Copilot Provider 不支持 GPT-6 系列

- [Issue #5898：gpt-6 model series through Github Copilot](https://github.com/HKUDS/nanobot/issues/5898)  
  状态：Open  
  是否已有 fix PR：当前数据中未发现直接对应 PR  
  影响：  
  用户在 v0.3.5 中通过 GitHub Copilot 使用 OpenAI 6 系列模型失败，报错：

  ```text
  Mode provider request failed. Check the provider configuration or service status, then try again.
  ```

  风险分析：
  - 影响新模型接入体验；
  - 可能与 Provider 模型名映射、能力声明、鉴权或协议差异有关；
  - 对依赖 GitHub Copilot 作为模型入口的用户影响较大。

### 中优先级：OpenCode Go muse-spark Contributor 模型 `/chat/completions` 返回 500

- [Issue #5896：support OpenAI Responses API for opencode_go](https://github.com/HKUDS/nanobot/issues/5896)  
  状态：Open  
  是否已有 fix PR：有  
  对应 PR：
  - [PR #5906](https://github.com/HKUDS/nanobot/pull/5906)

  影响：  
  `muse-spark-1.2-contributor` 和 `muse-spark-1.3-contributor` 在 OpenCode Go Provider 下不可用，因为它们需要走 `/responses`，而不是 `/chat/completions`。  
  修复方向明确，且 PR 已经打开，是今日最接近解决的 Provider 兼容性问题。

### 中优先级：Telegram Markdown 代码块渲染问题

- [PR #5911：fix(telegram): render tilde and longer code fences as code](https://github.com/HKUDS/nanobot/pull/5911)  
  状态：Open  
  关联问题：当前数据中未列出对应 Issue  
  影响：  
  Telegram Markdown 转 HTML 时，当前 `_markdown_to_telegram_html` 对代码块的保护只识别反引号围栏，并且遇到第一个 ``` 就关闭代码块，导致：
  - `~~~` 代码围栏无法正确保护；
  - 更长的代码围栏或内部包含反引号的代码可能被错误解析；
  - 代码内容可能被当作普通文本格式化。

  这是渠道渲染一致性问题，对开发者用户和代码问答场景较重要。

### 中低优先级：DeepSeek Flash reasoning history 缺失导致 HTTP 400

- [PR #5894：fix(providers): backfill missing reasoning history for deepseek-flash](https://github.com/HKUDS/nanobot/pull/5894)  
  状态：已合并或关闭  
  影响：  
  该问题今日已有修复推进。对于使用 `deepseek-flash` + tool calling + thinking mode 的用户，稳定性应有所改善。

---

## 5. 功能请求与路线图信号

今日功能请求集中在 WebUI 状态管理、长任务队列、流式可观测性、Provider 协议兼容和 IM 渠道原生能力。

### 可能进入下一版本的功能

#### OpenCode Go Responses API 支持

- [Issue #5896](https://github.com/HKUDS/nanobot/issues/5896)  
- [PR #5906](https://github.com/HKUDS/nanobot/pull/5906)

该需求已从 Issue 转化为实现 PR，且范围明确：仅将 `muse-spark-1.2-contributor`、`muse-spark-1.3-contributor` 通过 Responses API 路由。  
纳入下一版本可能性：高。

#### Telegram 私有话题自动重命名为生成的会话标题

- [PR #5902：feat(tg): rename topic to generated session title](https://github.com/HKUDS/nanobot/pull/5902)  
  状态：Open  
  功能内容：
  - 抽取 session title 生成逻辑到共享模块；
  - WebUI 和 Telegram 私有 topic 会话后生成标题并持久化；
  - 尝试将 Telegram forum topic 重命名为生成标题。

  路线图信号：  
  NanoBot 正在加强跨端“会话对象”的一致性，不只是 WebUI 内有标题，Telegram topic 也会同步表达会话语义。

#### DingTalk 群回复真实 @ 提醒

- [PR #5899：feat(dingtalk): send true @-mentions via sessionWebhook in group replies](https://github.com/HKUDS/nanobot/pull/5899)  
  状态：Open  
  当前问题：  
  DingTalk 群回复目前只能用视觉上的 `# @name` markdown header 模拟 mention，无法触发真实通知。  
  功能方向：  
  通过 `sessionWebhook` 支持真实 @-mentions。  
  纳入下一版本可能性：中高，已有 PR 实现。

#### WebUI 每会话保存 composer 草稿

- [Issue #5910](https://github.com/HKUDS/nanobot/issues/5910)  
  状态：Open  
  当前无对应 PR。  
  价值：
  - 改善多会话并行写作体验；
  - 降低误切换、刷新导致输入丢失的挫败感；
  - 与 WebUI 今日已有的状态恢复和刷新优化方向一致。

  纳入下一版本可能性：中。

#### 服务端消息队列 / waiting room

- [Issue #5909：feat(api): server-side message queue while agent is busy](https://github.com/HKUDS/nanobot/issues/5909)  
  状态：Open  
  用户希望在 Agent 执行长任务时，后续消息可以进入队列，而不是被丢弃或产生不可预测行为。  
  价值：
  - 对 browser automation、查成绩、长链路工具调用等场景很重要；
  - 涉及服务端会话调度和并发语义，复杂度较高；
  - 可能需要明确 interrupt、queue、cancel、append instruction 等多种行为。

  纳入下一版本可能性：中低，需求重要但实现设计需要谨慎。

#### WebUI 流式 tokens/sec 显示

- [Issue #5908](https://github.com/HKUDS/nanobot/issues/5908)  
  状态：Open  
  价值：
  - 增强模型运行可观测性；
  - 帮助用户判断模型是否卡顿；
  - 对性能调试、Provider 对比和高级用户有价值。

  纳入下一版本可能性：中。

#### 静默上下文压缩与 WeChat 日志降噪

- [Issue #5900](https://github.com/HKUDS/nanobot/issues/5900)  
  状态：Open  
  价值：
  - 改善 IM 渠道使用体验；
  - 避免内部系统维护动作打扰用户；
  - 降低日志噪音，提升可运维性。

  纳入下一版本可能性：中，且与 [Issue #5903](https://github.com/HKUDS/nanobot/issues/5903) 的 Feishu checkpoint 泄露问题方向一致。

---

## 6. 用户反馈摘要

今日用户反馈呈现出明显的真实使用场景特征，而不是单纯的功能设想。

### 多会话使用中，输入状态容易丢失

- [Issue #5910](https://github.com/HKUDS/nanobot/issues/5910)  
  用户在侧边栏同时打开两个会话，切换后发现 composer 中已输入文本丢失。  
  痛点：  
  NanoBot 被用于多任务对话时，用户希望每个会话都像独立文档一样保留草稿，当前纯内存状态不足以支撑复杂使用。

### 长任务期间缺少可靠的后续输入机制

- [Issue #5909](https://github.com/HKUDS/nanobot/issues/5909)  
  用户描述 Agent 正在执行较长任务，例如 browser automation 查成绩时，无法追加消息，也无法可靠中断。  
  痛点：  
  长任务 Agent 需要清晰的交互模型：用户后续输入到底是排队、打断、补充上下文，还是被拒绝。当前行为“不确定”会降低信任。

### 用户开始关注模型运行状态和速度

- [Issue #5908](https://github.com/HKUDS/nanobot/issues/5908)  
  用户希望在流式回复中看到实时 tokens/sec。  
  痛点：  
  只显示流式文本还不够，用户希望判断模型是否正常工作、Provider 是否变慢、当前任务是否停滞。

### IM 渠道中，内部机制不应暴露给终端用户

- [Issue #5903](https://github.com/HKUDS/nanobot/issues/5903)  
- [Issue #5900](https://github.com/HKUDS/nanobot/issues/5900)

用户明确不希望上下文压缩或 checkpoint 恢复提示直接发送到 Feishu、WeChat、WhatsApp 等渠道。  
痛点：  
IM 用户期待的是自然、安静、连续的助手体验，而不是看到系统内部维护消息。

### Provider 兼容性仍是高频刚需

- [Issue #5896](https://github.com/HKUDS/nanobot/issues/5896)  
- [Issue #5898](https://github.com/HKUDS/nanobot/issues/5898)

用户正在尝试接入 OpenCode Go、GitHub Copilot、muse-spark、GPT-6、DeepSeek Flash 等不同模型和网关。  
痛点：  
模型生态变化快，不同 Provider 即使宣称 OpenAI 兼容，也可能在 `/chat/completions`、`/responses`、reasoning history、tool calling 等细节上存在差异。

---

## 7. 待处理积压

由于本次数据仅覆盖过去 24 小时，无法判断“长期未响应”的历史积压。不过，以下新开但影响较大的事项建议维护者优先关注。

### 建议优先处理

1. [Issue #5903：Feishu hidden checkpoint marker 泄露给用户](https://github.com/HKUDS/nanobot/issues/5903)  
   原因：用户可见的内部消息泄露，影响产品可信度。  
   建议：优先排查 `_hidden` 消息在 Feishu channel dispatch、session compaction、message persistence 之间的过滤链路。

2. [Issue #5898：GitHub Copilot 下 GPT-6 系列不可用](https://github.com/HKUDS/nanobot/issues/5898)  
   原因：新模型兼容性问题，可能影响一批 Provider 用户。  
   建议：确认模型名、能力映射、请求格式、Copilot API 响应错误细节。

3. [Issue #5909：Agent busy 时的 server-side message queue](https://github.com/HKUDS/nanobot/issues/5909)  
   原因：关系到 Agent 长任务的核心交互模型。  
   建议：先定义语义，再实现队列，包括排队、取消、覆盖、追加 instruction、超时策略等。

4. [Issue #5900：静默上下文压缩与 WeChat 日志降噪](https://github.com/HKUDS/nanobot/issues/5900)  
   原因：与多渠道用户体验直接相关，也可与 Feishu checkpoint 泄露问题一起设计统一策略。  
   建议：为 internal/system/hidden messages 建立跨 channel 的统一发送过滤规则。

### 待合并 PR 关注列表

- [PR #5911：fix(telegram): render tilde and longer code fences as code](https://github.com/HKUDS/nanobot/pull/5911)  
  建议关注 Telegram Markdown 边界测试覆盖。

- [PR #5907：test: consolidate redundant coverage across the test suite](https://github.com/HKUDS/nanobot/pull/5907)  
  该 PR 不改生产代码，但涉及 34 个测试文件、净减少 703 行，建议重点确认测试语义是否完全保留。

- [PR #5906：feat(providers): route OpenCode Go muse-spark contributor models through Responses](https://github.com/HKUDS/nanobot/pull/5906)  
  直接解决 [Issue #5896](https://github.com/HKUDS/nanobot/issues/5896)，建议优先 review。

- [PR #5902：feat(tg): rename topic to generated session title](https://github.com/HKUDS/nanobot/pull/5902)  
  涉及共享 title 生成模块和 Telegram topic 修改，建议关注权限失败、速率限制、标题更新幂等性。

- [PR #5899：feat(dingtalk): send true @-mentions via sessionWebhook](https://github.com/HKUDS/nanobot/pull/5899)  
  建议关注 sessionWebhook 可用性、降级路径和群聊 mention 语义一致性。

---

## 总体判断

NanoBot 今日没有发布新版本，但开发活动密集，且大多围绕真实用户场景展开。WebUI 正在从“可用”走向“更稳定、更适合长期多会话使用”；Provider 层正在适配更复杂的模型协议差异；Telegram、DingTalk、Feishu、WeChat 等渠道问题则表明项目正在强化多端一致性。  
短期内，最值得优先推进的是 **Feishu 内部消息泄露修复、OpenCode Go Responses API 支持、GitHub Copilot GPT-6 兼容性排查**。这些问题分别对应用户信任、模型可用性和新模型接入能力，对下一版本质量影响较大。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报  
**日期：2026-09-25**  
**仓库：** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日速览

过去 24 小时 Hermes Agent 维持了**极高活跃度**：Issues 更新 50 条，其中 48 条仍处于新开或活跃状态；PR 更新 50 条，其中 49 条仍待合并。项目刚发布 **v0.21.5 / v2026.9.24**，但当天随即出现大量与更新、桌面端、Windows、PM 运行时、会话状态和工具执行相关的回归报告，说明当前版本处于快速迭代后的稳定性消化阶段。  
从问题分布看，**安装/更新链路、Windows 桌面端、远程环境文件写入、会话状态一致性、安全边界**是今日主要风险区域。与此同时，社区和维护者已经提交多项针对 P0/P1/P2 问题的修复 PR，响应速度较快，项目整体健康度表现为：**开发活跃、修复动能强，但短期稳定性压力明显偏高**。

---

## 2. 版本发布

### v2026.9.24：Hermes Agent v0.21.5  
- Release：[# v2026.9.24](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.24)  
- 发布日期：2026-09-24  
- 类型：Patch release  
- 说明：该版本将自 v0.21.4 以来约 **460 个已合并 PR** 汇总为稳定标签，面向 Docker 镜像、Hermes Cloud、托管部署和下游消费者。

#### 更新内容概览

官方 Release Notes 当前较简略，说明完整整理版发布说明仍延后补充。从今日 Issue/PR 的上下文可以看出，v0.21.5 主要是一次大规模滚动修复后的稳定版本，但仍暴露出以下回归或兼容性问题：

- 桌面端更新和启动链路存在多平台问题，尤其是 Windows。
- PM 运行时与旧虚拟环境、依赖激活、外部进程 re-exec 等路径仍有兼容风险。
- 浏览器工具、会话状态、SQLite 恢复、远程环境文件写入等关键路径出现高优先级缺陷。
- 插件系统和 Hindsight 插件在 workspace / uv lock 场景下仍可能阻塞更新。

#### 破坏性变更 / 潜在不兼容点

当前 Release 未明确列出破坏性变更，但从当天反馈看，以下行为对用户具有实际“破坏性”影响：

1. **更新后桌面端可能无法启动或无法正确恢复**
   - Windows Desktop 正常退出后再次启动失败：[#122142](https://github.com/NousResearch/hermes-agent/issues/122142)
   - macOS Desktop 在中断更新后 backend 后续 ready，但 UI 停留失败页：[#122206](https://github.com/NousResearch/hermes-agent/issues/122206)

2. **PM 运行时迁移后旧 venv 可能污染路径**
   - Windows gateway 仍优先使用旧 pre-PM venv，导致 `pydantic_core` 导入失败：[#122183](https://github.com/NousResearch/hermes-agent/issues/122183)

3. **插件依赖解析可能阻塞 `hermes update`**
   - Hindsight 插件 duplicate workspace member 问题：[#122071](https://github.com/NousResearch/hermes-agent/issues/122071)、[#122133](https://github.com/NousResearch/hermes-agent/issues/122133)

4. **远程环境写文件可能清空目标文件**
   - Modal / Daytona / Vercel 上 `write_file` 与 `patch` 可能清空文件：[#122011](https://github.com/NousResearch/hermes-agent/issues/122011)

#### 迁移与升级注意事项

建议用户在升级 v0.21.5 前后注意：

- **Windows 用户**：升级前保留 `auth.json`、session DB、配置文件和工作目录备份；若升级后无法启动，参考相关 Issues 附带日志。
- **使用 Hindsight 插件的用户**：升级前检查 plugin-sources 中是否存在多个 hindsight clone；若 `uv lock` 报 duplicate workspace member，关注：[#122071](https://github.com/NousResearch/hermes-agent/issues/122071)、[#122133](https://github.com/NousResearch/hermes-agent/issues/122133)。
- **Modal / Daytona / Vercel 后端用户**：在修复合并前，避免依赖高价值文件的 `write_file` / `patch` 操作，或在操作前先做备份。
- **桌面端用户**：如遇更新失败但代码/依赖已替换，应检查是否只是 packaged desktop build 失败，参见：[#122228](https://github.com/NousResearch/hermes-agent/issues/122228)。

---

## 3. 项目进展

过去 24 小时 PR 更新 50 条，其中仅 1 条关闭，其余大多仍待合并。虽然实际合并/关闭数量不高，但维护方向非常明确：围绕 v0.21.5 后暴露出的 P0/P1/P2 稳定性问题，已有多条修复 PR 快速跟进。

### 今日关闭 / 完成的 PR

#### 测试基础设施修复：停止依赖 in-tree venv  
- PR：[#122227](https://github.com/NousResearch/hermes-agent/pull/122227)  
- 状态：Closed  
- 主题：`test: stop relying on the in-tree venv after #122161`

该 PR 针对 #122161 之后测试仍依赖源码树内 `venv/.venv` 的问题。其背景是 PM 尚未提交环境时，启动流程不再激活 in-tree venv，导致 Windows 测试线出现红灯。虽然该 PR 已关闭，具体是合并还是关闭未在数据中明确，但它反映出项目正在调整测试体系以适配新的 PM 运行时模型。

### 待合并但重要的修复推进

#### P0/P1 级别稳定性修复

1. **远程环境 stdin / 文件写入修复**
   - PR：[#122218](https://github.com/NousResearch/hermes-agent/pull/122218)  
   - 对应 Issue：[#122011](https://github.com/NousResearch/hermes-agent/issues/122011)  
   - 影响：Modal、Daytona、Vercel 上 `write_file` / `patch` 可能清空目标文件。  
   - 进展意义：这是今日最关键的 P0/P1 修复之一，直接影响远程开发环境中的文件安全。

2. **cron external worker 依赖路径修复**
   - PR：[#122238](https://github.com/NousResearch/hermes-agent/pull/122238)  
   - 对应 Issue：[#122222](https://github.com/NousResearch/hermes-agent/issues/122222)  
   - 影响：self-managed 安装中所有定时任务在 ownership ack 前即失败。  
   - 进展意义：恢复 cron/scheduled jobs 的可用性，对自动化场景关键。

3. **curator rollback 数据安全修复**
   - PR：[#122217](https://github.com/NousResearch/hermes-agent/pull/122217)  
   - 对应 Issue：[#122210](https://github.com/NousResearch/hermes-agent/issues/122210)  
   - 影响：rollback 失败时可能删除唯一残存的 staged 原始文件，尤其是嵌套 Git metadata。  
   - 进展意义：降低技能/curator 文件操作中的数据丢失风险。

4. **SQLite restore 路径转义修复**
   - PR：[#122215](https://github.com/NousResearch/hermes-agent/pull/122215)  
   - 对应 Issue：[#122209](https://github.com/NousResearch/hermes-agent/issues/122209)  
   - 影响：路径包含 `#` 或 percent escape 时可能误读源路径并擦除 live DB。  
   - 进展意义：这是 session/backup 数据完整性的重要修复。

5. **PM build snapshot 修复**
   - PR：[#122216](https://github.com/NousResearch/hermes-agent/pull/122216)  
   - 影响：source install 上每个 `hermes pm` 子命令可能失败，并阻断 `hermes update` 完成步骤。  
   - 进展意义：直接修复 PM 基础设施问题，影响面较大。

#### 更新链路与桌面端修复

1. **本地 parked branch 更新策略修复**
   - PR：[#122235](https://github.com/NousResearch/hermes-agent/pull/122235)  
   - 对应 Issue：[#122182](https://github.com/NousResearch/hermes-agent/issues/122182)  
   - 解决：`updates.parked_branch_strategy: update_in_place` 时不应检查不存在于远端的本地分支。

2. **Windows desktop update stdin / gateway prompts 修复**
   - PR：[#122234](https://github.com/NousResearch/hermes-agent/pull/122234)  
   - 解决：Windows 桌面更新脚本在无人可回答的地方询问 gateway 问题，以及问题重复询问。

3. **会话 takeover 配置化**
   - PR：[#122220](https://github.com/NousResearch/hermes-agent/pull/122220)  
   - 类型：Feature  
   - 作用：通过 `session.takeover` 支持跨 surface session handover，提供 `off` / `idle` / `always` 模式。  
   - 进展意义：回应桌面端、TUI、CLI 之间会话所有权冲突问题。

---

## 4. 社区热点

### 1. Camofox snapshot 泄露 vault 密码明文  
- Issue：[#122174](https://github.com/NousResearch/hermes-agent/issues/122174)  
- 状态：Open  
- 评论数：3  
- 标签：`type/security`, `tool/browser`, `P3`, `sweeper:risk-security-boundary`

该问题是今日最值得关注的安全类反馈之一。用户报告在 Camofox backend 中 vault fill 成功后，随后的 `browser_snapshot` 会将填充后的密码以明文打印，并持久化进 session transcript / `state.db`。这违反了 vault “密码永不出现在工具结果、日志或 session DB” 的安全契约。

**背后诉求：**
- 用户信任 vault 的核心前提是 secret 不应离开受控边界。
- 浏览器工具链中的不同 backend 应保持一致的 redaction 行为。
- session transcript 和 state DB 中不得出现凭据明文，否则影响企业部署和安全审计。

---

### 2. Modal / Daytona / Vercel 上 write_file / patch 清空文件  
- Issue：[#122011](https://github.com/NousResearch/hermes-agent/issues/122011)  
- PR：[#122218](https://github.com/NousResearch/hermes-agent/pull/122218)  
- 状态：Issue Open，PR Open  
- 评论数：3  
- 标签：`P0`, `tool/terminal`, `tool/file`, `backend/modal`, `backend/daytona`, `backend/vercel`

这是今日影响最直接的 P0 级问题。用户指出 `write_file` 与 `patch` 在特定 remote backend 中会清空目标文件，原因与 heredoc stdin 和 shell argv 绑定方式有关。对应修复 PR 已提交，尝试将 remote stdin 从 shell argv 中移出，避免文件写入行为依赖 shell 语法和命令长度限制。

**背后诉求：**
- 文件写入工具必须具备强一致性和可预期性。
- 远程执行 backend 不能因为 stdin 分类差异导致 destructive 行为。
- 对 agent 来说，文件工具是基础能力，数据损坏会极大削弱用户信任。

---

### 3. Hindsight 插件导致 `hermes update` 依赖同步失败  
- Issue：[#122071](https://github.com/NousResearch/hermes-agent/issues/122071)  
- 相关 Issue：[#122133](https://github.com/NousResearch/hermes-agent/issues/122133)  
- 状态：#122071 Closed，#122133 Open  
- 评论数：#122071 为 2，#122133 为 1  
- 标签：`comp/cli`, `comp/plugins`, `tool/memory`, `area/install-update`

用户报告安装 Hindsight catalog plugin 后，`hermes update` 在 `uv lock` 阶段失败，原因包括 duplicate workspace member 和 `[hindsight]` extra 依赖回归。另一个问题指出，partial git clone timeout 后会残留 stale plugin-sources entries，导致两个 `hermes-plugin-hindsight` workspace member 同名。

**背后诉求：**
- 插件安装和更新必须具备容错能力，尤其是在 git clone 中断、网络超时、重复源目录等情况下。
- `hermes update` 不应被单个插件的 workspace 状态永久阻塞。
- memory 插件属于高价值扩展，用户希望其与核心更新流程解耦或具备自动修复能力。

---

### 4. Windows Desktop 正常退出后再次启动失败  
- Issue：[#122142](https://github.com/NousResearch/hermes-agent/issues/122142)  
- 状态：Open  
- 评论数：1  
- 👍：1  
- 标签：`P1`, `comp/desktop`, `platform/windows`

用户报告自 #121563 之后，Windows Desktop 在每次正常退出后的下一次启动都会失败，表现为 backend 未在 45 秒预算内应答。报告指出 backend 本身健康，但 attach 逻辑采用了 dead backend 发布的 token，导致等待超时。

**背后诉求：**
- 桌面端必须能在正常退出/重启后可靠恢复。
- session token adoption 逻辑需要区分 live backend 与 dead backend。
- Windows 是当前桌面端稳定性的重点风险平台。

---

### 5. Codex / OpenAI Responses 状态组装与 phase 处理问题  
相关 Issues：  
- [#122173](https://github.com/NousResearch/hermes-agent/issues/122173)  
- [#122172](https://github.com/NousResearch/hermes-agent/issues/122172)  
- [#122171](https://github.com/NousResearch/hermes-agent/issues/122171)  
- [#122137](https://github.com/NousResearch/hermes-agent/issues/122137)

这些问题集中在 `comp/agent` 与 `provider/openai`，关注 Responses normalizer、Codex stream assembler、phase replay、commentary-only 消息分类等细节。问题虽然评论数不高，但技术密度较高，指向同一类核心控制流缺陷：agent 可能错误判断完成状态、丢失 message phase、将 commentary-only 响应误判为 reasoning-only stall。

**背后诉求：**
- 多阶段 message / phase 语义需要稳定保留。
- 流式组装不能将 silent EOF 当作有效完成。
- commentary 与 final answer 的边界影响 agent 是否继续、是否误触发 nudge，以及最终用户看到的输出质量。

---

## 5. Bug 与稳定性

以下按严重程度和影响面排序。

### P0 / 数据破坏与核心能力中断

#### 1. 远程后端 `write_file` / `patch` 清空目标文件  
- Issue：[#122011](https://github.com/NousResearch/hermes-agent/issues/122011)  
- Fix PR：[#122218](https://github.com/NousResearch/hermes-agent/pull/122218)  
- 影响范围：Modal、Daytona、Vercel；文件写入工具；remote shell。  
- 风险：高。可能导致目标文件被清空，属于数据破坏型缺陷。  
- 状态：修复 PR 已提交，待合并。

---

### P1 / 数据完整性、启动失败、大面积任务失败

#### 2. cron external worker 在 self-managed 安装中无法导入依赖  
- Issue：[#122222](https://github.com/NousResearch/hermes-agent/issues/122222)  
- Fix PR：[#122238](https://github.com/NousResearch/hermes-agent/pull/122238)  
- 影响：所有 scheduled jobs 在 ownership ack 前失败。  
- 风险：高。影响自动化和定时任务可靠性。  
- 状态：修复 PR 已提交。

#### 3. Curator rollback 失败后可能删除唯一 staged 原始文件  
- Issue：[#122210](https://github.com/NousResearch/hermes-agent/issues/122210)  
- Fix PR：[#122217](https://github.com/NousResearch/hermes-agent/pull/122217)  
- 影响：skills / curator 文件操作；嵌套 `.git` 元数据。  
- 风险：高。可能造成不可恢复的数据丢失。  
- 状态：修复 PR 已提交。

#### 4. SQLite restore 路径解析错误可能擦除 live database  
- Issue：[#122209](https://github.com/NousResearch/hermes-agent/issues/122209)  
- Fix PR：[#122215](https://github.com/NousResearch/hermes-agent/pull/122215)  
- 影响：`/snapshot restore`、`hermes import`。  
- 风险：高。涉及 session DB 恢复和备份安全。  
- 状态：修复 PR 已提交。

#### 5. Windows Desktop 退出后再次启动失败  
- Issue：[#122142](https://github.com/NousResearch/hermes-agent/issues/122142)  
- Fix PR：未见明确对应 PR  
- 影响：Windows Desktop 每次正常退出后的下一次启动。  
- 风险：高。影响桌面端基本可用性。  
- 状态：待修复。

#### 6. PM workspace snapshot 缺失 `uv.lock` 导致 `hermes pm` 与 update 失败  
- PR：[#122216](https://github.com/NousResearch/hermes-agent/pull/122216)  
- 影响：source install；`hermes pm` 子命令；`hermes update`。  
- 风险：高。更新和包管理链路核心缺陷。  
- 状态：修复 PR 已提交。

---

### P2 / 平台兼容、会话状态、provider 行为异常

#### 7. Windows gateway 误用旧 pre-PM venv，导致 `pydantic_core` 导入失败  
- Issue：[#122183](https://github.com/NousResearch/hermes-agent/issues/122183)  
- Fix PR：未见明确对应 PR  
- 影响：Windows PM runtime；gateway；hosted room worker。  
- 状态：Open。

#### 8. Desktop session/profile 切换后 sessions 被隐藏，Home 列表截断  
- Issue：[#122190](https://github.com/NousResearch/hermes-agent/issues/122190)  
- Fix PR：未见明确对应 PR  
- 影响：Windows Desktop；session list；profile switching。  
- 状态：Open。

#### 9. Desktop active session 中 `drive_preview` 被错误拒绝  
- Issue：[#122062](https://github.com/NousResearch/hermes-agent/issues/122062)  
- Fix PR：可能与 session takeover PR [#122220](https://github.com/NousResearch/hermes-agent/pull/122220) 方向相关，但未明确关联。  
- 影响：context compression 后 session identity mismatch。  
- 状态：Open。

#### 10. Desktop 更新在 local-only parked branch 上失败  
- Issue：[#122182](https://github.com/NousResearch/hermes-agent/issues/122182)  
- Fix PR：[#122235](https://github.com/NousResearch/hermes-agent/pull/122235)  
- 影响：本地自定义分支、Desktop Update、GitHub API 422。  
- 状态：修复 PR 已提交。

#### 11. Windows source install 外部 Python entry point 被 bootstrap re-exec 干扰  
- Issue：[#122160](https://github.com/NousResearch/hermes-agent/issues/122160)  
- Fix PR：未见明确对应 PR  
- 影响：Windows source install；外部脚本；`hermes-webui`。  
- 状态：Open。

#### 12. Codex / Responses phase 与 completion 判断问题  
- Issues：[#122173](https://github.com/NousResearch/hermes-agent/issues/122173)、[#122172](https://github.com/NousResearch/hermes-agent/issues/122172)、[#122171](https://github.com/NousResearch/hermes-agent/issues/122171)、[#122137](https://github.com/NousResearch/hermes-agent/issues/122137)  
- Fix PR：未见明确对应 PR  
- 影响：OpenAI provider、Codex runtime、Responses adapter。  
- 状态：Open。

#### 13. Bot Mode group chats 同步到所有 connected gateway，可能暴露私人聊天  
- Issue：[#122151](https://github.com/NousResearch/hermes-agent/issues/122151)  
- Fix PR：未见明确对应 PR  
- 影响：Desktop + shared gateway；隐私边界。  
- 状态：Open，needs-repro。  
- 备注：虽然标为 P2，但具有潜在隐私风险，应优先确认复现。

---

### P3 / 可用性、配置、插件、诊断问题

#### 14. `hermes plugins install` 在 non-TTY stdin 下无可行路径  
- Issue：[#122134](https://github.com/NousResearch/hermes-agent/issues/122134)  
- 影响：SSH 自动化、CI、Docker entrypoint、cron。  
- 状态：Open。

#### 15. `hermes doctor` 针对 agent-browser npm vulnerabilities 的 remedy 失效  
- Issue：[#122223](https://github.com/NousResearch/hermes-agent/issues/122223)  
- 影响：PM system 将 `agent-browser` 移出 repo 后，doctor 提示仍指向旧路径。  
- 状态：Open。

#### 16. Desktop 打开不存在本地文件时未先检查存在性  
- Issue：[#122027](https://github.com/NousResearch/hermes-agent/issues/122027)  
- 影响：macOS Desktop；`shell.openExternal`。  
- 状态：Open。

#### 17. Windows cp936 locale 下 `hermes update` UnicodeDecodeError  
- Issue：[#122239](https://github.com/NousResearch/hermes-agent/issues/122239)  
- 影响：中文 Windows / 非 UTF-8 ANSI code page。  
- 状态：Open。

---

### 安全与隐私类特别关注

#### 18. Camofox snapshot 泄露 vault 密码明文  
- Issue：[#122174](https://github.com/NousResearch/hermes-agent/issues/122174)  
- Fix PR：未见明确对应 PR  
- 影响：browser snapshot、vault egress redaction、session transcript、state.db。  
- 风险：高于标签 P3 的实际安全敏感度。  
- 建议：维护者应考虑提升优先级，至少增加回归测试和临时 redaction guard。

#### 19. Bot Mode group chat 同步到共享 gateway  
- Issue：[#122151](https://github.com/NousResearch/hermes-agent/issues/122151)  
- Fix PR：未见明确对应 PR  
- 影响：共享实例上的个人聊天暴露风险。  
- 建议：尽快确认 sync target 逻辑是否过宽。

---

## 6. 功能请求与路线图信号

### 1. Desktop transcript 支持引用一段内容进入下一条消息  
- Issue：[#122185](https://github.com/NousResearch/hermes-agent/issues/122185)  
- 类型：Feature  
- 诉求：用户希望能像聊天应用一样，从长回答中引用某一段继续提问，避免“你刚才说的那个部分”这种模糊表达。  
- 路线图信号：该功能直接增强桌面端对长对话和多段回答的交互体验，适合进入 Desktop UX backlog。

### 2. 支持非 `api_key` provider 使用自定义 `fetch_models` 探测 live catalog  
- Issue：[#122202](https://github.com/NousResearch/hermes-agent/issues/122202)  
- 类型：Feature  
- 诉求：当前 `_profile_live_catalog()` 只允许 external_process 或带 base_url 的 api_key provider 进行动态模型探测，限制了其他 provider 类型。  
- 路线图信号：随着 provider/plugin 生态扩大，模型目录发现机制需要更通用。

### 3. 配置化 session takeover  
- PR：[#122220](https://github.com/NousResearch/hermes-agent/pull/122220)  
- 类型：Feature  
- 价值：通过 `session.takeover` 支持 CLI/TUI/Desktop 等多个 surface 对同一 session 的接管策略。  
- 可能性：已进入 PR 阶段，且与多个 session ownership 问题相关，较可能被纳入近期版本。

### 4. Plugin Catalog 新增 hermes-lcm-x 社区插件  
- PR：[#122225](https://github.com/NousResearch/hermes-agent/pull/122225)  
- 类型：Feature / Plugin Catalog  
- 功能：LCM-X 提供 lossless context engine，将消息保存在本地 SQLite，并构建可恢复摘要 DAG。  
- 路线图信号：社区正在围绕长期记忆、上下文压缩可恢复性、source-grounded recall 进行扩展。该方向与当前 Hermes 的 memory/session/context compression 痛点高度相关。

### 5. Opt-in provider SDK 首次使用自动安装并热切换  
- PR：[#122221](https://github.com/NousResearch/hermes-agent/pull/122221)  
- 类型：Feature / Bug fix  
- 涉及 provider：Anthropic、Bedrock 等。  
- 价值：用户首次选择 provider 时不再因缺少 SDK 包而失败，PM 自动安装 extra 并切换依赖 generation。  
- 路线图信号：Hermes 正在向更顺滑的多 provider 运行时体验演进。

---

## 7. 用户反馈摘要

### 主要痛点一：升级链路仍不够可预测

多个用户集中反馈 `hermes update` 或 Desktop Update 后出现失败、半成功、状态误报或无法启动：

- `hermes update` 在 desktop packaged-app build 失败时记录整体 failed，即使代码、Python deps、Web UI 已替换：[#122228](https://github.com/NousResearch/hermes-agent/issues/122228)
- Windows upgrade 后软件无法运行：[#122237](https://github.com/NousResearch/hermes-agent/issues/122237)
- local-only parked branch 导致 Desktop update GitHub API 422：[#122182](https://github.com/NousResearch/hermes-agent/issues/122182)
- Windows cp936 locale 更新前即 UnicodeDecodeError：[#122239](https://github.com/NousResearch/hermes-agent/issues/122239)

**用户真实诉求：**
- 更新结果要分层表达：代码更新成功、依赖更新成功、桌面打包失败不应被混为同一个 failed。
- 更新失败后要有明确恢复路径。
- 非英文 Windows、本地自定义分支、shared gateway 等真实环境需要被纳入兼容性测试矩阵。

---

### 主要痛点二：Windows 桌面端稳定性仍是高压区域

今日多个问题都与 Windows Desktop / Windows PM runtime 有关：

- 正常退出后无法重启：[#122142](https://github.com/NousResearch/hermes-agent/issues/122142)
- PM runtime 混用旧 venv：[#122183](https://github.com/NousResearch/hermes-agent/issues/122183)
- profile switching 后 session 隐藏：[#122190](https://github.com/NousResearch/hermes-agent/issues/122190)
- source install 外部进程被 bootstrap re-exec：[#122160](https://github.com/NousResearch/hermes-agent/issues/122160)
- cp936 locale UnicodeDecodeError：[#122239](https://github.com/NousResearch/hermes-agent/issues/122239)

**用户真实诉求：**
- Windows 不应是“次级支持平台”；桌面端启动、更新、session list、locale 编码都属于基本体验。
- PM 迁移应提供更强的旧环境隔离和清理机制。

---

### 主要痛点三：会话状态和 UI 显示一致性不足

多个反馈表明 session identity、activeSessionId、hidden 标记、server-side display projection 等路径存在不一致：

- `drive_preview` 在 active session 中被拒绝：[#122062](https://github.com/NousResearch/hermes-agent/issues/122062)
- session 被 hidden 后从 sidebar 消失：[#122190](https://github.com/NousResearch/hermes-agent/issues/122190)
- 刚发送的消息消失，assistant replies 渲染两次：[#122167](https://github.com/NousResearch/hermes-agent/issues/122167)
- session takeover 需要配置化：[#122220](https://github.com/NousResearch/hermes-agent/pull/122220)

**用户真实诉求：**
- 多 surface、多 profile、长会话压缩后的 session 身份必须稳定。
- 用户需要确信“我正在看的会话”就是工具和后端正在操作的会话。
- 消息不应消失或重复渲染，否则会破坏对 agent 状态的信任。

---

### 主要痛点四：安全边界需要更严格的一致性

- vault 密码明文进入 browser snapshot / state.db：[#122174](https://github.com/NousResearch/hermes-agent/issues/122174)
- Bot Mode group chat 同步到共享 gateway：[#122151](https://github.com/NousResearch/hermes-agent/issues/122151)

**用户真实诉求：**
- 凭据、私人聊天、共享 gateway 之间必须有强隔离。
- 文档承诺的安全契约需要在所有 backend 和工具路径中一致执行。
- 一旦涉及 secret 泄露，用户更看重默认安全而非功能便利。

---

## 8. 待处理积压

> 注：本日报仅基于过去 24 小时数据，无法准确判断“长期未响应”的历史积压。以下列出的是**当前窗口内仍 Open、优先级高、尚未看到明确 fix PR 或需要维护者尽快确认**的问题。

### 高优先级待关注

1. **Camofox snapshot 泄露 vault 密码明文**
   - Issue：[#122174](https://github.com/NousResearch/hermes-agent/issues/122174)
   - 建议：提升优先级；增加 redaction 测试；确认历史 state.db 是否需要清理建议。

2. **Windows Desktop 正常退出后再次启动失败**
   - Issue：[#122142](https://github.com/NousResearch/hermes-agent/issues/122142)
   - 建议：尽快定位 token adoption 与 dead backend 检测逻辑。

3. **Windows gateway PM runtime 使用旧 venv**
   - Issue：[#122183](https://github.com/NousResearch/hermes-agent/issues/122183)
   - 建议：明确 PM runtime 环境隔离策略，并增加旧 venv 残留测试。

4. **Bot Mode group chats 可能跨 gateway 泄露**
   - Issue：[#122151](https://github.com/NousResearch/hermes-agent/issues/122151)
   - 建议：优先复现；若属实，应按隐私问题处理。

5. **Codex / OpenAI Responses phase 与 completion 判断系列问题**
   - Issues：[#122173](https://github.com/NousResearch/hermes-agent/issues/122173)、[#122172](https://github.com/NousResearch/hermes-agent/issues/122172)、[#122171](https://github.com/NousResearch/hermes-agent/issues/122171)、[#122137](https://github.com/NousResearch/hermes-agent/issues/122137)
   - 建议：集中设计一次 Responses phase/state assembly 修复，避免多个 PR 分散修改同一状态边界。

6. **Desktop 消息消失 / assistant 回复重复渲染**
   - Issue：[#122167](https://github.com/NousResearch/hermes-agent/issues/122167)
   - 建议：检查 server-side display projection 与 compression 后 message chain 的一致性。

7. **Windows cp936 locale 更新崩溃**
   - Issue：[#122239](https://github.com/NousResearch/hermes-agent/issues/122239)
   - 建议：所有 git subprocess 输出统一显式 encoding，避免 locale 依赖。

---

## 项目健康度结论

Hermes Agent 今日表现出典型的高速开源 AI agent 项目状态：**开发和响应非常活跃，但大规模变更后稳定性回归密集出现**。v0.21.5 刚发布即带来大量真实环境反馈，尤其集中在 Windows、桌面端、PM 运行时、session 状态、插件更新与安全边界。积极的一面是，多个 P0/P1 问题已在同日出现对应修复 PR，说明维护链路响应迅速；风险在于待合并 PR 多、关键路径 bug 多，短期内应优先控制发布节奏，集中合并和验证数据安全、启动更新、安全隐私相关修复。

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报  
日期：2026-09-25  
仓库：[`sipeed/picoclaw`](https://github.com/sipeed/picoclaw)

---

## 1. 今日速览

过去 24 小时 PicoClaw 活跃度中等偏高，主要由依赖升级 PR 和一个重复上报的 Bug Issue 驱动。今日共有 **2 条 Issue 更新**，其中 **1 条仍开放、1 条已关闭**；同时有 **5 条 PR 更新**，全部为 Dependabot 发起的 Go 依赖升级，当前均处于待合并状态。  
从项目健康度看，维护面临的重点是依赖栈更新与客户端输入体验修复：安全/生态依赖升级较集中，但尚未看到对应合并动作。用户侧今日反馈集中在 **Pico 客户端移动 TUI 对多行输入的处理异常**，该问题会影响代码块、诗歌、长文本等常见 AI 对话场景，建议优先确认与修复。

---

## 2. 项目进展

今日没有已合并或已关闭的 PR，因此暂无可确认进入主分支的功能更新或修复。

当前待处理 PR 主要集中在依赖维护：

- [`#3389 build(deps): bump golang.org/x/crypto from 0.53.0 to 0.57.0`](https://github.com/sipeed/picoclaw/pull/3389)  
  类型：Go 依赖升级 / 安全相关基础库  
  状态：Open  
  影响：`golang.org/x/crypto` 通常涉及加密、认证、SSH/TLS 相关能力，建议优先跑 CI 与回归测试。

- [`#3388 build(deps): bump github.com/modelcontextprotocol/go-sdk from 1.6.1 to 1.8.0`](https://github.com/sipeed/picoclaw/pull/3388)  
  类型：MCP Go SDK 升级  
  状态：Open  
  影响：可能影响 PicoClaw 与 MCP 工具/上下文协议集成行为，建议重点检查接口兼容性。

- [`#3387 build(deps): bump github.com/anthropics/anthropic-sdk-go from 1.55.1 to 1.74.0`](https://github.com/sipeed/picoclaw/pull/3387)  
  类型：Anthropic SDK 升级  
  状态：Open  
  影响：跨度较大，可能涉及 Claude API 调用参数、响应结构或错误处理变更，建议不要直接批量合并。

- [`#3386 build(deps): bump maunium.net/go/mautrix from 0.27.0 to 0.31.0`](https://github.com/sipeed/picoclaw/pull/3386)  
  类型：Matrix SDK 升级  
  状态：Open  
  影响：上游版本说明中提到最低 Go 版本变化，需确认项目 Go 版本要求与 CI 环境是否匹配。

- [`#3385 build(deps): bump github.com/line/line-bot-sdk-go/v8 from 8.20.1 to 8.22.0`](https://github.com/sipeed/picoclaw/pull/3385)  
  类型：LINE Bot SDK 升级  
  状态：Open  
  影响：涉及 LINE 渠道集成，建议检查消息发送、Webhook 解析与兼容性。

整体来看，今日项目推进主要是“依赖准备阶段”，尚未形成实际合并成果。

---

## 3. 社区热点

### 热点 1：Pico 客户端多行输入被拆分为多条消息

- [`#3391 [BUG] Pico channel splits multi-line input into multiple messages`](https://github.com/sipeed/picoclaw/issues/3391)  
  状态：Open  
  作者：`chentianxiong123`  
  评论数：0  
  反应数：0  

- [`#3390 [BUG] Pico channel splits multi-line input into multiple messages`](https://github.com/sipeed/picoclaw/issues/3390)  
  状态：Closed  
  作者：`chentianxiong123`  
  评论数：1  
  反应数：0  

该问题今日被重复提交了一次，其中 `#3390` 已关闭，`#3391` 仍保持开放。虽然评论数和反应数不高，但从问题描述看，这是一个影响核心交互体验的 Bug：用户在 Pico 客户端移动 TUI 中粘贴多行文本时，系统会按换行符将内容拆成多条消息发送，破坏原始语义结构。

背后的用户诉求非常明确：  
用户希望 PicoClaw 在处理诗歌、代码块、配置文件、长 prompt、多段文本时，能够保持输入内容的完整性，而不是将每一行误认为独立消息。这对 AI 助手类项目尤其重要，因为多行 prompt 和代码上下文是高频使用场景。

---

## 4. Bug 与稳定性

### 高优先级：多行输入被拆分为多条消息

- Issue：[`#3391 [BUG] Pico channel splits multi-line input into multiple messages`](https://github.com/sipeed/picoclaw/issues/3391)  
- 状态：Open  
- 影响范围：Pico client / mobile TUI / Pico channel  
- 严重程度：高  
- 是否已有 fix PR：未发现  
- 相关重复 Issue：[`#3390`](https://github.com/sipeed/picoclaw/issues/3390)，已关闭  

#### 问题表现

用户在 Pico 客户端粘贴多行文本，例如：

- 诗歌
- 代码块
- Markdown 内容
- 多段 prompt
- 配置片段

PicoClaw 会自动按照换行符将内容拆分，并分别发送为多条消息。这会导致：

1. 原本应作为整体处理的上下文被打散；
2. AI 模型收到的消息结构与用户意图不一致；
3. 代码块、列表、配置文件等内容可能失去语义；
4. 用户无法稳定提交复杂 prompt。

#### 稳定性影响分析

该问题不一定导致崩溃，但属于明显的交互层回归或行为缺陷。对于 AI 助手项目来说，“输入完整性”是基础能力，因此建议将其视为高优先级体验问题处理。

#### 建议处理方向

- 区分“用户按 Enter 发送”和“粘贴内容中包含换行”；
- 为移动 TUI 增加多行输入缓冲；
- 支持显式发送快捷键，例如 `Ctrl+Enter` / Send 按钮；
- 对代码块或 Markdown 粘贴场景增加测试用例；
- 若当前行为是设计选择，应在文档中说明如何输入多行文本。

---

## 5. 功能请求与路线图信号

今日没有明确的新功能请求。  
但从 Bug 报告 [`#3391`](https://github.com/sipeed/picoclaw/issues/3391) 可以提炼出一个潜在路线图信号：

### 多行消息输入支持可能成为下一阶段体验改进点

虽然该问题以 Bug 形式提交，但实际指向的是 Pico 客户端输入系统能力不足。对 AI 助手类应用来说，以下能力具有路线图价值：

- 多行 prompt 编辑；
- 粘贴代码块时保持格式；
- Markdown / 代码 / 长文本输入不被拆分；
- 移动 TUI 下更明确的发送机制；
- 对不同 channel 的消息边界处理保持一致。

目前尚未看到针对该问题的修复 PR，因此是否进入下一版本仍不确定。但考虑到该问题影响核心使用路径，建议维护者尽快 triage。

---

## 6. 用户反馈摘要

今日真实用户反馈主要来自 `chentianxiong123` 提交的多行输入问题。

### 用户痛点

- 用户希望一次性发送完整多行文本；
- 当前 Pico 客户端会将换行误判为消息分隔；
- 粘贴诗歌、代码块或多行 prompt 时体验被破坏；
- 消息结构被拆散后，AI 回复质量可能下降。

### 使用场景

该问题涉及多个典型 AI 助手场景：

- 向 AI 粘贴代码并请求解释或修改；
- 输入 Markdown 格式文档；
- 提交多段式任务说明；
- 粘贴诗歌、日志、配置文件；
- 在移动 TUI 中进行连续上下文对话。

### 满意与不满意信号

- 不满意点：当前输入行为不符合用户对“粘贴即保留原格式”的预期；
- 正面信号：用户提供了清晰的问题描述和复现路径，便于维护者定位；
- 风险信号：同一问题出现重复 Issue，说明问题可能比较直观且容易被用户再次遇到。

---

## 7. 待处理积压

基于今日提供的数据，未能识别长期未响应的历史 Issue 或 PR；以下为当前 24 小时内新增/更新且仍待处理的事项。

### 待处理 Issue

1. [`#3391 [BUG] Pico channel splits multi-line input into multiple messages`](https://github.com/sipeed/picoclaw/issues/3391)  
   状态：Open  
   建议优先级：高  
   原因：影响 Pico 客户端核心输入体验，且暂无修复 PR。

### 待处理 PR

1. [`#3389 build(deps): bump golang.org/x/crypto from 0.53.0 to 0.57.0`](https://github.com/sipeed/picoclaw/pull/3389)  
   建议优先级：高  
   原因：加密相关依赖，建议优先审查 CI 与安全影响。

2. [`#3387 build(deps): bump github.com/anthropics/anthropic-sdk-go from 1.55.1 to 1.74.0`](https://github.com/sipeed/picoclaw/pull/3387)  
   建议优先级：中高  
   原因：版本跨度较大，可能影响 Anthropic API 调用兼容性。

3. [`#3388 build(deps): bump github.com/modelcontextprotocol/go-sdk from 1.6.1 to 1.8.0`](https://github.com/sipeed/picoclaw/pull/3388)  
   建议优先级：中高  
   原因：MCP 相关能力对 AI Agent 项目较关键，应检查工具调用和上下文协议兼容性。

4. [`#3386 build(deps): bump maunium.net/go/mautrix from 0.27.0 to 0.31.0`](https://github.com/sipeed/picoclaw/pull/3386)  
   建议优先级：中  
   原因：涉及 Matrix 渠道，且上游可能提高最低 Go 版本要求。

5. [`#3385 build(deps): bump github.com/line/line-bot-sdk-go/v8 from 8.20.1 to 8.22.0`](https://github.com/sipeed/picoclaw/pull/3385)  
   建议优先级：中  
   原因：涉及 LINE 渠道兼容性，建议结合渠道测试后合并。

---

## 总体健康度评估

PicoClaw 今日处于维护活跃状态，但代码层面暂无合并成果。依赖更新集中出现，说明自动化维护机制正常运行；不过 5 个依赖 PR 全部待合并，后续需要维护者进行兼容性验证与分批合入。  
用户侧最值得关注的是 Pico 客户端多行输入问题，该问题虽评论数不高，但对 AI 助手类应用的实际可用性影响较大。建议维护者优先 triage [`#3391`](https://github.com/sipeed/picoclaw/issues/3391)，并为多行输入行为补充回归测试。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目动态日报  
日期：2026-09-25  
仓库：github.com/qwibitai/nanoclaw

## 1. 今日速览

过去 24 小时 NanoClaw 活跃度较高：新增或更新 Issues 2 条，PR 更新 11 条，其中 8 条仍待合并，3 条已关闭。今日工作重心明显集中在 **Iron Proxy 安装可靠性、arm64 兼容性、CI 稳定性、Agent Runner 长流式输出稳定性** 以及 CLI 帮助信息一致性上。  
从数据看，项目维护节奏健康，核心团队在同一天内围绕用户报告的问题快速提交了多个修复 PR，尤其是 Iron Proxy 相关问题已形成 Issue → Fix PR 的闭环。  
不过，今日讨论热度不高：Issues 评论数均为 0，PR 评论数据未提供，说明当前更多是维护者驱动的修复与硬化，而非社区长线程讨论。  
整体判断：项目处于 **2.4.0 发布后的稳定性打磨期**，短期重点是修复安装、代理网关、CI flaky test 和运行时边界问题。

---

## 2. 项目进展

今日无新版本发布，但有 3 个 PR 已关闭，另有多个关键修复 PR 处于待合并状态。

### 已关闭 / 完成的 PR

#### PR #3890：解释聊天系统提示中的 inbound message blocks  
链接：https://github.com/qwibitai/nanoclaw/pull/3890  
状态：Closed  
作者：Koshkoshinsk

该 PR 针对 Agent Runner 的聊天上下文解释能力进行改进。问题在于，格式化器会生成 `<message>`、`<dm-history>` / `<channel-history>`、`<cross-session-context>` 等 block，但系统提示中没有解释这些 block 的语义。在存在大量跨会话上下文或 sibling echo rows 时，模型可能无法正确理解输入结构。

推进意义：

- 改善聊天会话对上下文块的理解。
- 降低模型误读历史消息、频道历史或跨会话上下文的风险。
- 对多会话、多上下文场景的 Agent 可靠性有帮助。

---

#### PR #3885：仅在选择 Claude 运行时时提供 Claude CLI 安装提示  
链接：https://github.com/qwibitai/nanoclaw/pull/3885  
状态：Closed  
作者：glifocat

该 PR 修复 setup 流程中过早或错误展示 Claude CLI 安装 / 登录提示的问题。此前在 Standard 安装流程中，如果运行在选择 agent runtime 之前失败，例如环境、容器或网关阶段失败，系统仍可能提示安装 Claude CLI，造成误导。

推进意义：

- 改善安装失败时的用户体验。
- 减少非 Claude 用户看到 Claude 专属提示的混淆。
- 修复 setup 流程中的 provider 状态判断问题。

备注：该 PR 与仍开放的 PR #3884 内容高度相关，可能存在替代、重提或后续修正关系。

---

#### PR #3882：补全 `ncl approvals help` 和 `ncl dropped-messages help` 的状态 / 原因枚举  
链接：https://github.com/qwibitai/nanoclaw/pull/3882  
状态：Closed  
作者：glifocat

该 PR 修复 CLI 帮助信息与 host 实际写入状态不一致的问题。此前 `approvals` 的 status 枚举停留在 `expired`，而 dropped messages 的 reason 也未完整反映 host 实际输出。

推进意义：

- 提升 CLI 可观测性和自解释能力。
- 降低用户排查 approvals、dropped messages 时的认知成本。
- 为网关审批、消息投递诊断提供更可靠的命令行提示。

后续注意：PR #3889 进一步修正了该 PR 引入的 `unknown_sender_public` help 列表问题。

---

## 3. 社区热点

今日 Issues 评论数均为 0，PR 评论数未提供，因此没有明显的高评论社区讨论。不过，从 Issue 与 PR 的关联来看，以下主题是今日最值得关注的热点。

### 热点一：Iron Proxy 在 arm64 主机安装失败  
Issue：https://github.com/qwibitai/nanoclaw/issues/3888  
关联 PR：https://github.com/qwibitai/nanoclaw/pull/3891

用户报告在 aarch64 主机上部署 Iron Proxy 失败，环境包括 NVIDIA DGX Spark、NanoClaw 2.4.0、OpenCode + Iron Proxy Advanced setup。失败点在 Iron Control 步骤，Docker 启动 `web` 服务后容器因 `exec format error` 退出。

核心诉求：

- NanoClaw 应支持 arm64 / aarch64 主机，尤其是本地 AI、GPU 工作站、边缘设备场景。
- Iron Proxy 安装流程需要识别或规避 amd64-only 镜像。
- Advanced setup 不应在架构不兼容时以低可读性的 Docker 错误失败。

维护响应：

- PR #3891 已提出修复，使 Iron Control 能在 arm64 hosts 上运行。
- 这是今日最明确的用户问题 → 修复 PR 闭环。

---

### 热点二：Iron Proxy 需要 per-host 自动审批规则  
Issue：https://github.com/qwibitai/nanoclaw/issues/3881  
链接：https://github.com/qwibitai/nanoclaw/issues/3881

该 Issue 提出 Iron Proxy gateway 的审批策略改进需求。当前 core 的 approval coordinator 仅自动批准两类请求：

1. 当前 agent provider 声明的模型域名，所有方法；
2. `NANOCLAW_GATEWAY_READ_ONLY_HOSTS` 中列出的 host 的 GET / HEAD 请求。

除此之外，前端代理转发的请求都会触发人工审批卡片。

核心诉求：

- 工具 skills 在访问可信 host 时，不应每次都弹出人工审批。
- 需要 per-host 级别的 auto-approval 规则。
- 这反映了 Iron Proxy 从“安全默认”向“可配置生产可用”演进的需求。

潜在影响：

- 若纳入路线图，将显著改善工具调用体验。
- 但也会扩大自动放行面，需要精细权限边界、审计日志和配置可见性。

---

### 热点三：Claude 长流式输出导致 heartbeat 失效  
PR：https://github.com/qwibitai/nanoclaw/pull/3893

PR #3893 修复 Claude Agent SDK 在长 content block streaming 期间 heartbeat 不更新的问题。当前容器只在 provider event 到达时 touch `.heartbeat`，而 Claude SDK 可能在一个长 assistant message block 内持续流式输出，却不产生新的 provider event，导致 host sweep 误判容器 idle 并杀死正在生成的 Claude container。

核心诉求：

- 长输出、长推理、长代码生成期间，运行容器不能被错误回收。
- Agent Runner 的健康检查不能只依赖 provider event 粒度。
- 对 Claude 用户的长任务稳定性影响较大。

---

## 4. Bug 与稳定性

### 严重级别：高

#### 1. Iron Proxy 在 arm64 / aarch64 主机上安装失败  
Issue：https://github.com/qwibitai/nanoclaw/issues/3888  
Fix PR：https://github.com/qwibitai/nanoclaw/pull/3891  
状态：Issue Open，Fix PR Open

问题描述：

- 在 aarch64 主机上运行 Iron Proxy Advanced setup 时，Iron Control 容器启动后报 `exec format error`。
- 根因是 `ironsh/iron-control` 镜像仅发布 `linux/amd64`，而版本配置中固定使用该镜像。
- 影响 arm64 Linux 主机，包括部分 AI 工作站、开发板、ARM 服务器和 GPU appliance。

影响评估：

- 安装阻断型问题。
- 对 OpenCode + Iron Proxy 用户影响较大。
- 由于发生在 setup 阶段，用户无法进入正常使用。

修复进展：

- PR #3891 已提交，目标是让 Iron Proxy gateway 可在 arm64 hosts 上安装运行。

---

#### 2. Claude 长 streaming block 期间容器可能被 host sweep 杀死  
PR：https://github.com/qwibitai/nanoclaw/pull/3893  
状态：Open

问题描述：

- Claude Agent SDK 在单个较长 assistant message block 内流式输出时，可能不会频繁产生 provider event。
- 当前 heartbeat 仅在 provider event 到达时更新。
- 若一个 block streaming 时间超过 idle ceiling，host sweep 会误杀仍在活跃生成的容器。

影响评估：

- 运行时稳定性问题。
- 对长代码生成、长回答、复杂推理任务影响明显。
- 用户表现可能是任务中断、容器消失或生成失败。

修复进展：

- PR #3893 已提交，目标是在 Claude 长 block streaming 期间保持 heartbeat 活跃。

---

### 严重级别：中

#### 3. Iron Proxy 重新安装时无法恢复 orphaned Iron Control database  
PR：https://github.com/qwibitai/nanoclaw/pull/3883  
状态：Open

问题描述：

- 如果 Iron Proxy 安装失败或被中断，之后 checkout 被删除，可能留下 Iron Control database volume 与 compose containers。
- 重新安装时，这些孤儿资源会阻塞或污染安装流程。

影响评估：

- 影响失败恢复与重复安装体验。
- 对测试、试用、CI 或频繁重装用户尤其明显。
- 属于安装幂等性与清理策略问题。

修复进展：

- PR #3883 已提交，目标是让失败或 abandoned 的 Iron Proxy install 可以被重新尝试。

---

#### 4. setup 失败时错误提供 Claude CLI 安装提示  
相关 PR：

- https://github.com/qwibitai/nanoclaw/pull/3885 Closed
- https://github.com/qwibitai/nanoclaw/pull/3884 Open

问题描述：

- Codex、OpenCode 安装流程，或尚未选择 runtime 的安装流程失败时，可能错误提示用户安装 Claude CLI。
- 根因是 `offerClaudeOnFailure` 只读取 run-scoped pick，而这个值在某些阶段尚未设置或不准确。

影响评估：

- 不会阻断核心功能，但会造成安装向导误导。
- 对多 provider setup 体验不利。

修复进展：

- PR #3885 已关闭。
- PR #3884 仍开放，可能是更完整或后续版本的修复。

---

#### 5. setup readiness probe 与 delivery-poll drain test 存在 CI timing flakes  
PR：https://github.com/qwibitai/nanoclaw/pull/3887  
状态：Open

问题描述：

- `restart-readiness.test.ts` 中 `waitForHost` 会将每次 status probe 的 socket timeout 裁剪到剩余预算，导致 deadline 附近诊断不可靠。
- delivery-poll drain test 在高负载 CI runner 上也存在 timing flake。

影响评估：

- 主要影响 CI 稳定性与诊断准确性。
- 可能导致非确定性测试失败，拖慢合并速度。

修复进展：

- PR #3887 已提交，目标是修复 readiness wait 的真实诊断问题，并为 delivery-poll drain test 增加合理预算。

---

#### 6. community portal runtime test 使用 sleep 导致 flaky  
PR：https://github.com/qwibitai/nanoclaw/pull/3892  
状态：Open

问题描述：

- `runtime.test.ts:205` 中测试在观察到 `sign_in_required` log event 后 sleep 200ms 再读取 journal。
- 在高负载 CI runner 上，固定 sleep 不可靠，可能导致测试偶发失败。

影响评估：

- CI 稳定性问题。
- 不直接影响用户功能，但影响维护效率。

修复进展：

- PR #3892 已提交，改为等待 journal clear，而不是固定 sleep。

---

### 严重级别：低

#### 7. CLI dropped-messages help 列出 host 实际不会写入的 reason  
PR：https://github.com/qwibitai/nanoclaw/pull/3889  
状态：Open

问题描述：

- PR #3882 后，`ncl dropped-messages help` 中出现 `unknown_sender_public`。
- 但 host 实际不会写入该 reason。
- 原因是 help reason enum 从所有 `UNKNOWN_SENDER_POLICIES` 派生，未区分实际可落盘值。

影响评估：

- 文档 / CLI 元数据准确性问题。
- 会误导用户排查 dropped messages。

修复进展：

- PR #3889 已提交，移除 `unknown_sender_public`。

---

## 5. 功能请求与路线图信号

### 1. Iron Proxy per-host auto-approval 规则  
Issue：https://github.com/qwibitai/nanoclaw/issues/3881  
状态：Open

这是今日最明确的功能请求。用户希望 Iron Proxy gateway 支持按 host 配置自动审批，使工具 skills 能够访问明确允许的 host，而不必每次请求都触发审批卡片。

路线图信号：

- NanoClaw 当前的安全模型偏保守：默认只自动批准模型域名，以及只读 host 的 GET / HEAD。
- 用户已经开始在更复杂的 tool / skill 调用场景中使用 Iron Proxy，需要更细粒度、更低摩擦的审批机制。
- 未来可能出现类似配置：
  - per-host allowlist；
  - per-method policy；
  - skill-scoped allow rule；
  - 审批规则审计与可视化；
  - workspace / project 级策略。

纳入下一版本可能性：中高。  
理由：该需求直接改善 Iron Proxy 的实际可用性，并与今日多个 Iron Proxy 修复 PR 的方向一致。

---

### 2. arm64 / aarch64 安装支持成为明确兼容性方向  
Issue：https://github.com/qwibitai/nanoclaw/issues/3888  
Fix PR：https://github.com/qwibitai/nanoclaw/pull/3891

虽然表面是 bug，但背后是平台支持信号。用户在 NVIDIA DGX Spark 等 arm64 环境运行 NanoClaw，说明项目需要更正式地覆盖 ARM Linux / AI workstation 场景。

路线图信号：

- 安装脚本需要更强的架构检测。
- 第三方镜像依赖需要 multi-arch 校验。
- 文档中可能需要明确 supported platforms。
- Advanced setup 对容器镜像架构不匹配应给出更友好的错误或替代路径。

纳入下一版本可能性：高。  
理由：已有 PR #3891 对应修复，且属于安装阻断型问题。

---

### 3. Release note 质量门禁  
PR：https://github.com/qwibitai/nanoclaw/pull/3886  
状态：Open

该 PR 要求 PR 描述中必须勾选 “No user-visible behavior change” 或填写 `release-note` block，否则 CI 失败。

路线图信号：

- 项目正在提升发布工程质量。
- 2.4.0 中 91 个 merged PR 里有 59 个缺少 release-note block，导致 changelog 需要手工重建。
- 后续版本的变更追踪、升级说明、用户可见变更管理会更加规范。

纳入下一版本可能性：高。  
理由：这是流程性硬化，影响维护质量，不依赖大规模功能设计。

---

## 6. 用户反馈摘要

今日 Issues 评论较少，无法从多轮讨论中提炼广泛情绪，但从新开 Issue 内容可以总结出以下真实痛点。

### 1. ARM 主机用户遇到安装阻断，错误信息底层且不可恢复  
来源：https://github.com/qwibitai/nanoclaw/issues/3888

用户场景：

- aarch64 host；
- NVIDIA DGX Spark；
- NanoClaw 2.4.0；
- OpenCode + Iron Proxy；
- Advanced setup。

痛点：

- 安装过程失败在 Docker 容器执行阶段，报 `exec format error`。
- 用户需要自行定位到镜像架构 amd64-only。
- 对非容器专家而言，这类错误不直观。

反馈含义：

- NanoClaw 的高级安装路径正在被用于真实多架构环境。
- 用户期待安装器替他们处理架构兼容性，而不是暴露底层容器错误。

---

### 2. Iron Proxy 的审批体验对 tool skills 场景仍偏重  
来源：https://github.com/qwibitai/nanoclaw/issues/3881

用户场景：

- 通过 Iron Proxy gateway 运行工具型 skills。
- skill 需要访问某些可信外部 host。
- 当前每个非默认批准请求都需要人工审批卡片。

痛点：

- 重复审批打断自动化流程。
- 只读 host 策略不足以覆盖 POST / API 调用等真实工具场景。
- 用户希望能对可信 host 进行显式授权。

反馈含义：

- 用户正在从“试用安全代理”进入“构建长期工具流”的阶段。
- 安全与效率之间需要更可配置的平衡点。

---

### 3. 安装失败后的提示需要与用户选择的 provider 保持一致  
来源：

- https://github.com/qwibitai/nanoclaw/pull/3885
- https://github.com/qwibitai/nanoclaw/pull/3884

用户场景：

- 使用 Codex、OpenCode，或尚未选择 runtime 时 setup 失败。
- 系统却提示安装或登录 Claude CLI。

痛点：

- 提示与用户意图不一致。
- 容易让用户误以为 Claude CLI 是必需依赖。
- 多 provider 安装路径下，状态追踪需要更准确。

反馈含义：

- NanoClaw 的 provider 多样性提高后，安装向导必须更严格区分 runtime-specific 提示。

---

## 7. 待处理积压

根据本次提供的数据，今日没有看到长期未响应的 Issue 或 PR；所有列出的 Issues 与 PR 都创建或更新于 2026-09-24，属于新近活跃项目。因此这里重点列出当前仍待维护者处理的开放项。

### 待合并 PR，建议优先级排序

#### 高优先级

1. PR #3891：修复 Iron Proxy arm64 安装失败  
   链接：https://github.com/qwibitai/nanoclaw/pull/3891  
   原因：对应安装阻断型 Issue #3888，影响 aarch64 用户。

2. PR #3893：Claude 长 streaming block 期间保持 heartbeat  
   链接：https://github.com/qwibitai/nanoclaw/pull/3893  
   原因：可能导致活跃容器被误杀，影响长任务可靠性。

3. PR #3883：Iron Proxy 重新安装时恢复 orphaned database  
   链接：https://github.com/qwibitai/nanoclaw/pull/3883  
   原因：改善失败恢复能力，与 Iron Proxy 安装可靠性直接相关。

#### 中优先级

4. PR #3887：修复 setup readiness 与 delivery-poll drain 的 timing flakes  
   链接：https://github.com/qwibitai/nanoclaw/pull/3887  
   原因：提高 CI 稳定性和诊断准确性。

5. PR #3892：community portal runtime test 等待 journal clear  
   链接：https://github.com/qwibitai/nanoclaw/pull/3892  
   原因：减少高负载 CI runner 上的 flaky test。

6. PR #3884：仅对 Claude installs 提供 Claude CLI offer  
   链接：https://github.com/qwibitai/nanoclaw/pull/3884  
   原因：修复 provider-specific setup 提示误导。

#### 低到中优先级

7. PR #3889：移除 dropped-messages help 中无效的 `unknown_sender_public`  
   链接：https://github.com/qwibitai/nanoclaw/pull/3889  
   原因：CLI 元数据准确性修复，影响诊断体验。

8. PR #3886：要求 PR 描述包含 release note 或 no-change 勾选  
   链接：https://github.com/qwibitai/nanoclaw/pull/3886  
   原因：提升发布流程质量，减少 changelog 手工维护成本。

### 待评估 Issue

1. Issue #3881：Iron Proxy per-host auto-approval rule  
   链接：https://github.com/qwibitai/nanoclaw/issues/3881  
   建议：需要安全模型设计评审，明确 host、method、skill、workspace 之间的授权边界。

2. Issue #3888：Iron Proxy arm64 setup failure  
   链接：https://github.com/qwibitai/nanoclaw/issues/3888  
   建议：在 PR #3891 合并后回归验证，并补充文档说明 arm64 支持策略。

---

## 项目健康度判断

NanoClaw 今日表现为高维护活跃、低社区讨论的状态。维护团队对 2.4.0 后暴露的问题响应迅速，尤其是 Iron Proxy、setup、Agent Runner 和 CI 稳定性方面都有明确修复动作。  
主要风险集中在安装链路和运行时边界条件：arm64 镜像兼容、失败重装恢复、Claude 长流式输出 heartbeat、CI flaky test。  
如果当前 8 个开放 PR 能在短期内完成 review 和合并，项目稳定性预计会有明显提升；下一阶段值得关注的是 Iron Proxy 审批策略是否从安全默认进一步演进为可配置策略体系。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目动态日报  
**日期：2026-09-25**  
**仓库：** [nullclaw/nullclaw](https://github.com/nullclaw/nullclaw)

---

## 1. 今日速览

过去 24 小时，NullClaw 没有新的 Issue 或 Release，但出现了 **8 个新的开放 PR**，说明维护侧开发活动较活跃，重点集中在 **文档修复、记忆系统、CLI 输出、Provider 错误可观测性、Discord 稳定性、Skills 能力扩展** 等方向。  
今日没有 PR 被合并或关闭，因此这些改动尚未进入主线，项目处于“集中提交、等待评审/合并”的状态。  
从内容看，今日 PR 中包含多个稳定性修复，尤其是 CLI 流式输出、记忆召回污染、Provider 非 2xx 错误不可见、Discord typing 线程栈大小等问题，表明项目正在加强运行可靠性和排障能力。  
社区互动数据较少：Issues 为 0，PR 评论数未提供，反应数均为 0，外部用户反馈信号较弱，主要活动来自维护者/贡献者主动推进。

---

## 2. 版本发布

过去 24 小时 **无新版本发布**。  
最新 Releases 数据为空，因此暂无可记录的版本更新、破坏性变更或迁移说明。

---

## 3. 项目进展

今日没有已合并或关闭的 PR，因此严格意义上尚无进入主线的项目进展。不过，以下开放 PR 代表了即将进入主线的候选改动。

### 待合并 PR 概览

| PR | 类型 | 主题 | 状态 |
|---|---|---|---|
| [#1008](https://github.com/nullclaw/nullclaw/pull/1008) | docs | 修复文档索引并新增子系统指南 | OPEN |
| [#1007](https://github.com/nullclaw/nullclaw/pull/1007) | docs | 解释 diagnostics logging flags | OPEN |
| [#1006](https://github.com/nullclaw/nullclaw/pull/1006) | fix(cli) | 修复流式 stdout 写入覆盖问题 | OPEN |
| [#1005](https://github.com/nullclaw/nullclaw/pull/1005) | fix(memory) | 避免归档会话片段进入实时上下文 | OPEN |
| [#1004](https://github.com/nullclaw/nullclaw/pull/1004) | fix(providers) | 非 2xx 响应记录脱敏错误体 | OPEN |
| [#1003](https://github.com/nullclaw/nullclaw/pull/1003) | feat(skills) | 支持跟随符号链接的 skill 目录 | OPEN |
| [#1002](https://github.com/nullclaw/nullclaw/pull/1002) | discord/fix | typing 线程使用 heavy runtime stack | OPEN |
| [#1001](https://github.com/nullclaw/nullclaw/pull/1001) | feat(memory) | 新增 memory auto-recall 等可配置项 | OPEN |

### 重点待合并方向

#### 文档体系补强
- [#1008](https://github.com/nullclaw/nullclaw/pull/1008) 修复 beginner guide 页面中导致公共文档索引无法渲染的前缀问题，并新增 MCP、subagents、voice、hardware 的中英文指南。
- [#1007](https://github.com/nullclaw/nullclaw/pull/1007) 补充 diagnostics logging flags 的说明，包括默认值、输出位置，以及生产环境应避免开启内容日志。

这些 PR 说明 NullClaw 正在补齐面向新用户和运维用户的文档入口，有助于降低上手和排障成本。

#### 稳定性与可观测性修复
- [#1006](https://github.com/nullclaw/nullclaw/pull/1006) 修复 CLI 流式 stdout 写入 offset 0 导致首行输出被破坏的问题。
- [#1005](https://github.com/nullclaw/nullclaw/pull/1005) 修复归档会话 shard 被错误召回进 prompt 和 `memory_recall` 工具的问题。
- [#1004](https://github.com/nullclaw/nullclaw/pull/1004) 在 Provider POST 返回非 2xx 时记录脱敏且限长的错误响应体，提升排障能力。
- [#1002](https://github.com/nullclaw/nullclaw/pull/1002) 将 Discord typing loop 放到更大的 runtime stack 上，避免 HTTPS/TLS 相关操作在线程栈不足时崩溃。

#### 功能能力扩展
- [#1003](https://github.com/nullclaw/nullclaw/pull/1003) 允许 `nullclaw skills list` 和分类扫描跟随指向 skill 目录的符号链接。
- [#1001](https://github.com/nullclaw/nullclaw/pull/1001) 为 memory recall 增加 `auto_recall`、`recall_limit`、`max_context_bytes` 等配置项，增强记忆系统可控性。

---

## 4. 社区热点

今日没有 Issue 更新，PR 的评论数未提供，反应数均为 0，因此无法从评论或表情反应中识别明确的社区热点。

从 PR 内容的重要性推断，以下议题可能是当前维护者重点关注方向：

### 记忆系统准确性与可控性
- [#1005 fix(memory): keep archived conversation shards out of live turns](https://github.com/nullclaw/nullclaw/pull/1005)
- [#1001 feat(memory): add configurable auto-recall, recall_limit, max_context_bytes](https://github.com/nullclaw/nullclaw/pull/1001)

这两个 PR 共同指向一个核心诉求：**让 AI 助手的长期记忆更可靠、可解释、可控**。  
[#1005](https://github.com/nullclaw/nullclaw/pull/1005) 解决错误召回旧历史导致模型误判当前上下文的问题；[#1001](https://github.com/nullclaw/nullclaw/pull/1001) 则提供开关、数量上限和上下文字节上限，让用户能根据场景调节记忆注入策略。

### 运维排障与生产安全
- [#1007 docs: explain the diagnostics logging flags](https://github.com/nullclaw/nullclaw/pull/1007)
- [#1004 fix(providers): log scrubbed provider error bodies on non-2xx](https://github.com/nullclaw/nullclaw/pull/1004)

这两个 PR 表明项目正在平衡 **可观测性** 与 **隐私/安全**。  
[#1004](https://github.com/nullclaw/nullclaw/pull/1004) 让 Provider 错误原因更容易定位；[#1007](https://github.com/nullclaw/nullclaw/pull/1007) 则强调内容日志在生产环境应保持关闭，避免敏感信息泄露。

### 文档入口与生态子系统
- [#1008 docs: repair the index and add subsystem guides](https://github.com/nullclaw/nullclaw/pull/1008)

该 PR 修复文档索引渲染问题，并新增 MCP、subagents、voice、hardware 等子系统指南，说明 NullClaw 的能力边界正在扩大，文档体系需要同步跟进。

---

## 5. Bug 与稳定性

今日没有新 Issue 报告 Bug，但多个开放 PR 直接修复稳定性问题。按潜在严重程度排序如下：

### 高优先级：记忆召回污染当前上下文
- PR：[ #1005 fix(memory): keep archived conversation shards out of live turns](https://github.com/nullclaw/nullclaw/pull/1005)
- 状态：OPEN
- 问题：归档副本被召回进 prompt 和 `memory_recall` 工具，导致模型可能把当前用户消息误判为旧历史。
- 影响：可能直接影响 AI 助手对话质量、上下文理解和用户信任。
- 是否已有 fix PR：是，即 [#1005](https://github.com/nullclaw/nullclaw/pull/1005)。

### 高优先级：Discord typing 线程栈不足可能导致崩溃
- PR：[ #1002 discord: run typing thread on the heavy runtime stack](https://github.com/nullclaw/nullclaw/pull/1002)
- 状态：OPEN
- 问题：`typingLoop` 每个 interval 执行 HTTPS/TLS 操作，原栈大小可能不足。
- 影响：Discord 集成场景下可能出现运行时崩溃或不稳定。
- 是否已有 fix PR：是，即 [#1002](https://github.com/nullclaw/nullclaw/pull/1002)。

### 中高优先级：Provider 非 2xx 错误原因不可见
- PR：[ #1004 fix(providers): log scrubbed provider error bodies on non-2xx](https://github.com/nullclaw/nullclaw/pull/1004)
- 状态：OPEN
- 问题：Provider POST 返回非 2xx 时，响应 body 被释放，只返回 `HttpStatusError`，导致无法看到服务端原因，例如模型不支持 tools。
- 影响：显著增加排障难度，尤其影响集成不同模型/Provider 的用户。
- 是否已有 fix PR：是，即 [#1004](https://github.com/nullclaw/nullclaw/pull/1004)。

### 中优先级：CLI 流式 stdout 输出被破坏
- PR：[ #1006 fix(cli): append streamed stdout instead of overwriting offset zero](https://github.com/nullclaw/nullclaw/pull/1006)
- 状态：OPEN
- 问题：流式 CLI stdout 使用 offset 0 的 positional write，在 macOS 管道场景下可能覆盖首字节，导致类似 `pong` 的响应首行损坏。
- 影响：影响 CLI 用户体验和自动化脚本可靠性。
- 是否已有 fix PR：是，即 [#1006](https://github.com/nullclaw/nullclaw/pull/1006)。

### 中低优先级：诊断日志配置说明不足
- PR：[ #1007 docs: explain the diagnostics logging flags](https://github.com/nullclaw/nullclaw/pull/1007)
- 状态：OPEN
- 问题：诊断示例开启了内容日志，但没有充分解释各 flag 的含义和生产风险。
- 影响：可能导致用户在生产环境误开内容日志，引入隐私或合规风险。
- 是否已有修复 PR：是，即 [#1007](https://github.com/nullclaw/nullclaw/pull/1007)。

---

## 6. 功能请求与路线图信号

今日没有新的 Issue 型功能请求，但开放 PR 展示出若干明确的路线图信号。

### 记忆系统将更强调配置化与上下文预算
- PR：[ #1001 feat(memory): add configurable auto-recall, recall_limit, max_context_bytes](https://github.com/nullclaw/nullclaw/pull/1001)
- 可能纳入下一版本：较高
- 信号：
  - `memory.auto_recall`：允许关闭自动记忆注入。
  - `memory.recall_limit`：限制注入条目数量。
  - `memory.max_context_bytes`：限制注入上下文字节数。
- 判断：这是面向真实使用场景的重要能力，尤其适合需要控制 token 成本、隐私边界和上下文污染的用户。

### Skills 生态可能支持更灵活的本地组织方式
- PR：[ #1003 feat(skills): follow symlinked skill directories](https://github.com/nullclaw/nullclaw/pull/1003)
- 可能纳入下一版本：中高
- 信号：
  - `nullclaw skills list` 和 category scan 支持跟随指向 skill 目录的符号链接。
  - 下载归档中的 symlink 仍被拒绝，说明安全边界保持谨慎。
- 判断：该功能适合高级用户、团队共享 skill 目录、monorepo 或 dotfiles 管理场景。

### 文档覆盖 MCP、Subagents、Voice、Hardware
- PR：[ #1008 docs: repair the index and add subsystem guides](https://github.com/nullclaw/nullclaw/pull/1008)
- 可能纳入下一版本：高
- 信号：
  - 项目正在系统化整理 MCP、子代理、语音、硬件相关指南。
  - 这些能力可能是 NullClaw 后续重点模块或已具备但文档不足的能力。
- 判断：文档扩展通常意味着这些子系统已达到需要面向用户解释和推广的阶段。

---

## 7. 用户反馈摘要

今日没有 Issue 更新，也没有可用的 PR 评论内容，因此无法提炼直接的用户反馈。

基于 PR 摘要，可以间接看到以下潜在用户痛点：

1. **CLI 输出可靠性问题**  
   - 相关 PR：[ #1006](https://github.com/nullclaw/nullclaw/pull/1006)  
   - 痛点：用户通过 CLI 或脚本消费流式输出时，首行内容可能被破坏，影响自动化使用。

2. **记忆系统容易污染当前对话**  
   - 相关 PR：[ #1005](https://github.com/nullclaw/nullclaw/pull/1005)、[ #1001](https://github.com/nullclaw/nullclaw/pull/1001)  
   - 痛点：旧历史、归档内容和当前会话边界不清，会导致 AI 助手回答偏离当前任务。

3. **Provider 集成错误难以诊断**  
   - 相关 PR：[ #1004](https://github.com/nullclaw/nullclaw/pull/1004)  
   - 痛点：当模型、工具调用或 Provider 配置不兼容时，仅看到 HTTP 状态错误不足以定位问题。

4. **生产日志配置存在误用风险**  
   - 相关 PR：[ #1007](https://github.com/nullclaw/nullclaw/pull/1007)  
   - 痛点：缺乏清晰说明时，用户可能在生产环境开启包含内容的日志，带来隐私风险。

5. **文档入口和子系统说明不足**  
   - 相关 PR：[ #1008](https://github.com/nullclaw/nullclaw/pull/1008)  
   - 痛点：新用户或集成用户难以从现有文档快速理解 MCP、subagents、voice、hardware 等能力。

---

## 8. 待处理积压

今日没有长期未响应的 Issue 数据，且所有 8 个 PR 都是在过去 24 小时内创建/更新，因此不能归类为长期积压。不过，这些 PR 已形成短期评审队列，建议维护者优先关注以下顺序：

### 建议优先评审

1. [#1005 fix(memory): keep archived conversation shards out of live turns](https://github.com/nullclaw/nullclaw/pull/1005)  
   - 理由：直接影响对话正确性和记忆系统可信度。

2. [#1002 discord: run typing thread on the heavy runtime stack](https://github.com/nullclaw/nullclaw/pull/1002)  
   - 理由：涉及潜在崩溃修复，且是从较大分支中拆出的独立 crash fix。

3. [#1006 fix(cli): append streamed stdout instead of overwriting offset zero](https://github.com/nullclaw/nullclaw/pull/1006)  
   - 理由：修复 CLI 输出损坏问题，影响基础使用体验和脚本兼容性。

4. [#1004 fix(providers): log scrubbed provider error bodies on non-2xx](https://github.com/nullclaw/nullclaw/pull/1004)  
   - 理由：提升 Provider 集成可观测性，可降低后续 Issue 诊断成本。

5. [#1001 feat(memory): add configurable auto-recall, recall_limit, max_context_bytes](https://github.com/nullclaw/nullclaw/pull/1001)  
   - 理由：为 memory 模块提供重要配置能力，但需关注默认行为、兼容性和文档同步。

6. [#1003 feat(skills): follow symlinked skill directories](https://github.com/nullclaw/nullclaw/pull/1003)  
   - 理由：功能增强明确，但需仔细确认 symlink 安全边界，尤其是路径遍历、权限和归档安装策略。

7. [#1007 docs: explain the diagnostics logging flags](https://github.com/nullclaw/nullclaw/pull/1007)  
   - 理由：文档修复风险较低，建议尽快合并以降低生产误配置风险。

8. [#1008 docs: repair the index and add subsystem guides](https://github.com/nullclaw/nullclaw/pull/1008)  
   - 理由：修复文档索引渲染问题，并补齐多个子系统指南，可提升新用户体验。

---

## 项目健康度判断

- **开发活跃度：较高**  
  过去 24 小时新增/更新 8 个 PR，覆盖文档、稳定性、功能增强多个方向。

- **社区互动：较低**  
  无 Issue 更新，PR 无反应数据，评论数缺失，暂未看到明显社区讨论热度。

- **稳定性关注度：较高**  
  多个 PR 直接修复运行时问题、上下文污染问题和错误诊断问题，说明维护者正在主动降低生产使用风险。

- **发布节奏：等待合并阶段**  
  今日无 Release，且无 PR 合并。短期内若上述修复完成评审并合入，下一版本可能重点改善 memory、CLI、Provider diagnostics、Discord integration 与文档体验。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报  
**日期：2026-09-25**  
**仓库：** [nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. 今日速览

过去 24 小时，IronClaw 项目活跃度偏低但有明确维护动作：新增/更新 Issue 1 条，PR 更新 0 条，新发布候选版本 1 个。  
今日最重要的进展是发布了 `1.4.1-rc.2`，继续围绕 Google 扩展的 OAuth 配置问题进行补丁验证。  
Issue 侧主要集中在每日基准失败归因分析，当前报告显示部分失败来自模型质量问题，而非系统性工程回归。  
整体来看，项目处于 **小版本修复验证阶段**，核心维护重点是发布稳定性与 benchmark 质量监控，社区讨论热度较低。

---

## 2. 版本发布

### `ironclaw-v1.4.1-rc.2: 1.4.1-rc.2`

- **发布时间：** 2026-09-24  
- **链接：** [Release ironclaw-v1.4.1-rc.2](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.1-rc.2)

#### 更新内容

本次发布是基于 `1.4.0` 的第二个补丁候选版本，延续了 RC1 中的修复内容。

主要修复：

- Google 扩展，包括 Gmail 与 Google Calendar，现在可以在以下部署场景中被正常激活：
  - 部署操作方通过 Web UI 提供 Google OAuth client；
  - 而不是依赖环境变量配置 OAuth client。

这意味着 IronClaw 在企业部署、托管部署或多租户环境中的 Google 集成配置更加灵活，降低了对运行时环境变量的强依赖。

#### 破坏性变更

根据当前 release notes，未发现明确的破坏性变更。

#### 迁移注意事项

对使用 Gmail / Google Calendar 扩展的部署方建议重点关注：

1. 如果此前依赖环境变量注入 Google OAuth client，本次更新不要求强制迁移。
2. 如果希望通过 Web UI 配置 OAuth client，建议升级到 `1.4.1-rc.2` 进行验证。
3. 由于该版本仍为 `rc` 候选版本，生产环境升级前建议先在 staging 环境测试：
   - Gmail 授权流程；
   - Google Calendar 授权流程；
   - OAuth client 配置持久化；
   - 授权回调与 token 刷新行为。

---

## 3. 项目进展

过去 24 小时无新的 PR 合并、关闭或待合并记录。

- **最新 PR 更新数量：** 0  
- **已合并/关闭 PR：** 0  
- **待合并 PR：** 0  

因此，今日代码层面的直接推进有限。项目进展主要体现在发布流程上，即通过 `1.4.1-rc.2` 对 Google OAuth 相关修复进行候选版本验证。

从项目节奏看，维护团队当前可能处于：

- 小版本补丁发布验证阶段；
- 等待 RC 反馈；
- 持续监控 benchmark / failure taxonomy，以区分模型质量问题与工程缺陷。

---

## 4. 社区热点

### Issue #8111：Daily ironclaw failure taxonomy — 2026-09-24

- **状态：** Open  
- **作者：** pranavraja99  
- **创建时间：** 2026-09-24  
- **更新时间：** 2026-09-24  
- **评论数：** 0  
- **反应数：** 👍 0  
- **链接：** [#8111 Daily ironclaw failure taxonomy — 2026-09-24](https://github.com/nearai/ironclaw/issues/8111)

#### 内容摘要

该 Issue 是每日 IronClaw failure taxonomy 报告，分析了 benchmark 中的非通过任务。当前提到的 suite 包括：

- `officeqa`
- 共 38 个 non-pass 任务
- 报告判断这些失败均为 deepseek-v4-flash 在 OCR 数字化 Treasury 文档上的真实模型质量失败，而非 IronClaw 框架或工具链导致的工程问题。

#### 背后诉求分析

该 Issue 反映出项目维护方正在进行系统化的 benchmark 失败归因：

- 区分模型能力不足与产品/框架缺陷；
- 避免将模型回答质量问题误判为系统 bug；
- 为后续模型选择、agent 评估、工具调用鲁棒性优化提供依据。

虽然该 Issue 目前无评论和反应，社区互动较低，但它对项目健康度很重要，因为它提供了持续质量监控信号。

---

## 5. Bug 与稳定性

### 中低风险：Google 扩展 OAuth 配置路径修复

- **关联版本：** [`ironclaw-v1.4.1-rc.2`](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.1-rc.2)
- **影响范围：**
  - Gmail 扩展
  - Google Calendar 扩展
  - 通过 Web UI 配置 Google OAuth client 的部署场景
- **严重程度：** 中等
- **是否已有修复：** 是，已进入 `1.4.1-rc.2` 候选版本

#### 分析

该问题影响 Google 相关扩展的激活流程。对于依赖 Gmail 或 Calendar 的个人 AI 助手场景来说，这属于较关键的集成稳定性问题。

尤其是在以下部署模式中影响较大：

- SaaS / hosted deployment；
- 管理员通过控制台配置 OAuth；
- 多环境部署不方便使用环境变量注入密钥；
- 企业用户希望统一在 Web UI 中管理外部集成。

修复进入 RC2 表明维护方认为该问题已经具备候选发布质量，但仍需等待用户或测试环境验证。

---

### 观察项：Benchmark 中的 officeqa 非通过任务

- **关联 Issue：** [#8111](https://github.com/nearai/ironclaw/issues/8111)
- **影响范围：**
  - `officeqa` benchmark
  - deepseek-v4-flash 模型表现
  - OCR 数字化 Treasury 文档问答场景
- **严重程度：** 低到中等，取决于项目是否将该模型/场景作为核心能力目标
- **是否已有 fix PR：** 暂无

#### 分析

当前报告认为 38 个 non-pass 任务均为真实模型质量失败，而非 IronClaw 工程 bug。因此短期内不一定需要框架层面的修复 PR。

但这类失败仍然对产品体验有启示：

- OCR 文档理解仍是 agent 系统中的高风险能力；
- 财务、政府、Treasury 类文档往往包含大量数字、表格、引用关系；
- 如果 IronClaw 面向办公自动化场景，模型选择与文档解析链路仍需持续优化。

---

## 6. 功能请求与路线图信号

过去 24 小时未发现明确的新功能请求 Issue，也没有相关 PR 推进。

不过，从今日 release 与 Issue 信号可以推断出两个潜在路线方向：

### 1. 外部服务集成配置将继续向 Web UI 收敛

- **来源：** [`ironclaw-v1.4.1-rc.2`](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.1-rc.2)
- **信号：** Google OAuth client 可通过 Web UI 提供，而不是仅依赖环境变量。

这说明项目可能正在增强非开发者部署体验，尤其是面向运营人员、企业管理员或托管部署方的配置能力。

### 2. Benchmark failure taxonomy 可能成为持续质量治理机制

- **来源：** [#8111](https://github.com/nearai/ironclaw/issues/8111)
- **信号：** 每日分析 benchmark 失败并区分模型质量问题与系统问题。

这可能意味着后续路线图会继续强化：

- agent benchmark 追踪；
- 模型质量回归监控；
- 不同模型在任务套件中的表现比较；
- failure taxonomy 自动化。

---

## 7. 用户反馈摘要

今日 Issue 没有新增评论，因此缺少直接用户反馈。

基于现有数据，可提炼出以下间接反馈与使用痛点：

### Google 扩展配置体验存在实际需求

- **来源：** [`ironclaw-v1.4.1-rc.2`](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.4.1-rc.2)
- **痛点：** 仅通过环境变量配置 OAuth client 对部分部署方不够友好。
- **使用场景：**
  - 非开发者通过 Web UI 管理集成；
  - 企业管理员配置 Gmail / Calendar；
  - 托管服务中动态配置第三方 OAuth client。

### OCR 文档问答质量仍需提升

- **来源：** [#8111](https://github.com/nearai/ironclaw/issues/8111)
- **痛点：** 在 OCR 数字化 Treasury 文档上，模型出现真实质量失败。
- **使用场景：**
  - 办公文档问答；
  - 财务/政府文档解析；
  - 多页扫描件、表格、数字密集型内容理解。

当前没有明确的满意或不满意评论，但从 failure taxonomy 的存在可以看出维护方对质量问题较为敏感，具备主动监控意识。

---

## 8. 待处理积压

根据本次提供的数据，过去 24 小时内没有长期未响应的重要 Issue 或 PR 被更新，也没有待合并 PR。

当前需要维护者关注的开放项主要是：

### Issue #8111：Daily ironclaw failure taxonomy — 2026-09-24

- **状态：** Open  
- **链接：** [#8111](https://github.com/nearai/ironclaw/issues/8111)
- **建议处理方式：**
  1. 若该 Issue 仅为每日自动报告，可考虑打上 `benchmark`、`quality`、`taxonomy` 等标签，便于归档。
  2. 对于其中的 38 个 officeqa non-pass，如果后续多日重复出现，可拆分为更具体的模型质量跟踪项。
  3. 如果失败集中在 OCR 数字、表格或财政文档字段抽取，可考虑建立专项 benchmark 或 prompt / parser 改进任务。

---

## 项目健康度评估

| 维度 | 今日状态 | 评价 |
|---|---:|---|
| Issue 活跃度 | 1 条更新 | 较低 |
| PR 活跃度 | 0 条 | 较低 |
| Release 活跃度 | 1 个 RC 发布 | 良好 |
| Bug 修复推进 | Google OAuth 修复进入 RC2 | 稳定推进 |
| 社区互动 | 评论与反应均为 0 | 偏弱 |
| 质量治理 | 有每日 failure taxonomy | 较好 |

**综合判断：** IronClaw 今日处于低社区互动、低代码合并，但有明确发布维护动作的状态。项目健康度整体稳定，短期重点应是验证 `1.4.1-rc.2` 中 Google OAuth 修复，并继续跟踪 benchmark 中模型质量失败是否会影响用户可感知体验。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报｜2026-09-25

## 1. 今日速览

过去 24 小时，LobsterAI 仓库没有 Issue 更新，但 Pull Request 活动较活跃，共有 **8 条 PR 更新**，其中 **4 条仍待合并，4 条已关闭/合并**。今日工作重点集中在 **OpenClaw 稳定性修复、Gateway 热更新能力、Cowork 进度卡展示，以及 UI 布局与主题一致性调整**。  
整体来看，项目处于中高活跃度状态：虽然社区 Issue 反馈较少，但核心维护者持续通过 PR 推进运行时可靠性、模型调用容错和前端体验优化。今日没有新版本发布，说明当前更偏向于主干功能修复与下一版本前的质量积累。

---

## 2. 项目进展

今日共有 4 条 PR 处于已关闭/合并状态，主要推进了 UI 体验统一和 OpenClaw 运行稳定性修复。

### 已关闭/合并 PR

#### 1. 修复 OpenClaw 模型输出长度截断问题  
- PR：[#2761 fix(openclaw): resolve model output-length truncation issues](https://github.com/netease-youdao/LobsterAI/pull/2761)  
- 作者：fisherdaddy  
- 涉及领域：`area: renderer`, `area: main`, `area: openclaw`  
- 状态：CLOSED  
- 影响评估：高

该 PR 修复了 GLM-5.3 以及类似模型在执行任务时被过早截断的问题。问题根源在于传递给 OpenClaw 的 `max_tokens` 默认值过低，同时内置模型目录扫描范围不足，未覆盖 `third-party-extensions` 下的第三方 Provider 插件，例如 volcengine、zai、deepseek 等。

这类问题会直接影响 Agent 长任务执行质量，尤其是代码生成、工具调用、多轮推理等需要较长输出的场景。该修复对提升模型响应完整性和任务成功率有明显价值。

---

#### 2. 修复 OpenAI-compatible 工具调用参数异常导致的中断  
- PR：[#2759 fix(openclaw): repair and continue malformed OpenAI-compatible tool calls](https://github.com/netease-youdao/LobsterAI/pull/2759)  
- 作者：fisherdaddy  
- 涉及领域：`area: docs`, `area: main`, `area: openclaw`  
- 状态：CLOSED  
- 影响评估：高

该 PR 处理了 OpenClaw v2026.8.1 在面对 OpenAI-compatible 工具调用时的健壮性问题。当工具调用参数中存在原始控制字符或非法转义时，完整工具调用会被拒绝，甚至可能在工具已经执行后丢失带有副作用的上下文轮次。

修复内容包括回移上游 string-literal repair 逻辑，并允许针对被拒绝调用最多进行两次内部 continuation。该修复降低了 Agent 在真实模型输出不规范时的失败概率，对工具调用型任务尤其关键。

---

#### 3. UI 主题与布局对齐  
- PR：[#2762 feat(ui): align palette and layout](https://github.com/netease-youdao/LobsterAI/pull/2762)  
- 作者：fisherdaddy  
- 涉及领域：`area: renderer`, `area: main`, `area: cowork`  
- 状态：CLOSED  
- 影响评估：中

该 PR 对界面视觉体系进行了统一，包括：

- 将主题 token 调整为中性灰阶，去除蓝色偏色；
- 主内容区域与侧边栏边缘对齐，不再表现为内嵌卡片；
- 侧边栏导航项改为 pill button 风格；
- 调整默认窗口与已存储窗口尺寸逻辑，使宽高能够独立适配；
- 优化 Cowork 相关布局一致性。

这类调整更多偏向产品体验和视觉一致性，说明项目在稳定底层能力的同时，也在推进桌面端或渲染层的成熟度。

---

#### 4. 重复/替代性的 UI 布局 PR 关闭  
- PR：[#2760 feat(ui): align palette and layout](https://github.com/netease-youdao/LobsterAI/pull/2760)  
- 作者：fisherdaddy  
- 涉及领域：`area: renderer`, `area: main`, `area: cowork`  
- 状态：CLOSED  
- 影响评估：低到中

该 PR 与 #2762 内容高度相似，均围绕 UI 主题、布局和窗口尺寸调整展开。结合其关闭状态判断，#2760 可能是被 #2762 替代、重提或整理后的版本。

---

### 仍在推进中的重要 PR

#### 1. 保留压缩与恢复过程中的 accepted work  
- PR：[#2765 fix(openclaw): preserve accepted work through recovery and compaction](https://github.com/netease-youdao/LobsterAI/pull/2765)  
- 作者：alison-xx  
- 状态：OPEN  
- 涉及领域：`area: docs`, `area: main`  
- 影响评估：高

该 PR 目标是在 compaction 和 gateway 重启过程中保留已接受的工作结果，同时降低 pinned-runtime 启动开销。摘要显示其还涉及 model-catalog worker contract 与 host orchestration 的解耦，以及通过完整性校验连接读取迁移 checkpoint。

这是一个偏底层可靠性的改动，关系到 Agent 长任务、恢复机制、状态持久化与运行时重启后的连续性。如果合入，将显著提升 LobsterAI 在复杂任务和异常恢复场景下的可信度。

---

#### 2. Gateway 策略支持热重载  
- PR：[#2764 fix(openclaw): reload live gateway policies without restarting](https://github.com/netease-youdao/LobsterAI/pull/2764)  
- 作者：alison-xx  
- 状态：OPEN  
- 涉及领域：`area: docs`, `area: main`  
- 影响评估：中到高

该 PR 允许以下配置在不重启 Gateway 的情况下生效：

- `gateway.tools`
- `gateway.trustedProxies`
- `gateway.allowRealIpFallback`

这些配置本身已经由 HTTP consumers 在每个请求中读取，因此 PR 将它们标记为 hot-reloadable。该改动可以减少策略变更时的服务中断，对部署在团队环境、代理网关或企业网络中的用户有实际价值。

---

#### 3. 防止模型调用开始后整轮重放  
- PR：[#2763 fix(openclaw): stop whole-turn replay after a model call started](https://github.com/netease-youdao/LobsterAI/pull/2763)  
- 作者：fisherdaddy  
- 状态：OPEN  
- 涉及领域：`area: docs`, `area: main`, `area: openclaw`  
- 影响评估：高

该 PR 针对模型调用已经开始后的失败重试逻辑进行修复。摘要指出，一旦 model call 开始，当前轮次的 keyed user message 已经提交；如果失败后继续重放整轮，会与已提交消息冲突，最终用户看到的是泛化错误 `"LLM request failed."`，而不是底层真实 provider error。

该 PR 新增 `modelCallStarted` 到 `OverloadRetryState`，并在 `agent-runner-error-handler.ts` 中限制外层 replay。该修复能够提升错误透明度，也能避免因重试机制导致的二次故障。

---

#### 4. Cowork 展示并刷新原生 OpenClaw 进度卡  
- PR：[#2758 feat(cowork): display and refresh native OpenClaw progress cards](https://github.com/netease-youdao/LobsterAI/pull/2758)  
- 作者：alison-xx  
- 状态：OPEN  
- 涉及领域：`area: renderer`, `area: docs`, `area: main`, `area: cowork`  
- 影响评估：中到高

该 PR 在 Cowork composer 上方展示 OpenClaw 持久化进度卡，并允许用户显式刷新，同时保留之前的计划。摘要中提到支持：

- Card Markdown；
- step states；
- revision-safe dismissal；
- reconnect updates；
- collapse state 权威保留；
- React 端口保留 OpenClaw 行为。

该功能明显面向长任务协作与可解释性，能够帮助用户了解 Agent 当前计划、步骤状态和任务进度，是 Cowork 体验中的重要可视化增强。

---

## 3. 社区热点

今日没有 Issue 更新，PR 数据中也没有可用的评论数或反应数，所有 PR 点赞数均为 0，评论字段为 `undefined`。因此，无法从评论量或反应数判断典型意义上的社区讨论热点。

不过从 PR 主题看，今日技术焦点主要集中在以下方向：

1. **OpenClaw 运行可靠性与恢复能力**
   - [#2765](https://github.com/netease-youdao/LobsterAI/pull/2765)
   - [#2763](https://github.com/netease-youdao/LobsterAI/pull/2763)
   - [#2761](https://github.com/netease-youdao/LobsterAI/pull/2761)
   - [#2759](https://github.com/netease-youdao/LobsterAI/pull/2759)

2. **Gateway 配置热更新与服务连续性**
   - [#2764](https://github.com/netease-youdao/LobsterAI/pull/2764)

3. **Cowork 与 UI 使用体验**
   - [#2758](https://github.com/netease-youdao/LobsterAI/pull/2758)
   - [#2762](https://github.com/netease-youdao/LobsterAI/pull/2762)
   - [#2760](https://github.com/netease-youdao/LobsterAI/pull/2760)

背后的核心诉求是：让 LobsterAI 在长任务、多模型、多工具调用和 Gateway 部署场景下更稳定、更透明，同时改善最终用户在 Cowork 界面中的操作反馈。

---

## 4. Bug 与稳定性

今日没有新的 Issue 报告 Bug，但多个 PR 明确指向运行时缺陷或稳定性问题。按严重程度排序如下。

### 高严重度

#### 1. 模型输出被截断，导致长任务无法完成  
- 相关 PR：[#2761](https://github.com/netease-youdao/LobsterAI/pull/2761)  
- 状态：CLOSED  
- 是否已有 fix PR：是，已关闭/合并  
- 影响范围：GLM-5.3 及类似配置模型、第三方 Provider 插件、长输出任务

该问题会使模型在任务中途停止输出，对 Agent 执行复杂任务有直接破坏性。已通过调整模型 catalog 扫描和 max token 相关逻辑修复。

---

#### 2. OpenAI-compatible 工具调用参数格式异常导致任务上下文丢失  
- 相关 PR：[#2759](https://github.com/netease-youdao/LobsterAI/pull/2759)  
- 状态：CLOSED  
- 是否已有 fix PR：是，已关闭/合并  
- 影响范围：工具调用、带副作用操作、OpenAI-compatible provider

如果工具已经执行但后续轮次被丢弃，可能造成状态不一致或用户无法追踪实际执行结果。该修复显著增强了对非严格 JSON 或异常字符串输出的容错能力。

---

#### 3. 模型调用开始后整轮 replay 导致错误被掩盖  
- 相关 PR：[#2763](https://github.com/netease-youdao/LobsterAI/pull/2763)  
- 状态：OPEN  
- 是否已有 fix PR：是，待合并  
- 影响范围：Overload retry、Agent runner、Provider error 透传

该问题会导致用户看到泛化的 `"LLM request failed."`，而不是真实 provider 错误，降低可诊断性。由于涉及重试机制和消息提交边界，建议优先评审。

---

#### 4. compaction 或 Gateway 重启后 accepted work 可能无法正确保留  
- 相关 PR：[#2765](https://github.com/netease-youdao/LobsterAI/pull/2765)  
- 状态：OPEN  
- 是否已有 fix PR：是，待合并  
- 影响范围：任务恢复、状态压缩、Gateway restart、migration checkpoint

该问题影响长任务与恢复流程，是 Agent 可靠性的重要组成部分。若项目面向生产级个人助手或团队助手场景，该 PR 具有较高优先级。

---

### 中严重度

#### 5. Gateway 策略更新需要重启  
- 相关 PR：[#2764](https://github.com/netease-youdao/LobsterAI/pull/2764)  
- 状态：OPEN  
- 是否已有 fix PR：是，待合并  
- 影响范围：Gateway 配置变更、工具策略、代理信任设置

该问题不一定导致功能错误，但会造成策略变更时的服务中断或运维复杂度增加。热重载能力对部署体验有明显改善。

---

## 5. 功能请求与路线图信号

今日没有新的 Issue 形式功能请求，但从 PR 可以观察到若干路线图信号。

### 1. Cowork 将强化任务进度可视化  
- 相关 PR：[#2758](https://github.com/netease-youdao/LobsterAI/pull/2758)  
- 可能进入下一版本：较高

OpenClaw progress card 的展示、刷新、折叠状态和 reconnect updates 表明项目正在增强 Cowork 模块的“任务可观察性”。这符合 Agent 产品常见演进方向：用户不仅要看到最终结果，也要理解当前步骤、计划和进度。

---

### 2. Gateway 配置将更偏向在线动态治理  
- 相关 PR：[#2764](https://github.com/netease-youdao/LobsterAI/pull/2764)  
- 可能进入下一版本：较高

`gateway.tools`、`trustedProxies`、`allowRealIpFallback` 支持热重载，说明项目正在减少重启依赖，提升服务端组件的持续运行能力。这是从本地工具向更复杂部署形态演进的信号。

---

### 3. OpenClaw 运行时可靠性仍是近期核心路线  
- 相关 PR：
  - [#2765](https://github.com/netease-youdao/LobsterAI/pull/2765)
  - [#2763](https://github.com/netease-youdao/LobsterAI/pull/2763)
  - [#2761](https://github.com/netease-youdao/LobsterAI/pull/2761)
  - [#2759](https://github.com/netease-youdao/LobsterAI/pull/2759)

多个 PR 围绕恢复、compaction、工具调用、模型调用重试和输出长度展开，说明维护重点仍在提升 Agent 执行链路的稳定性。下一版本很可能包含较多 OpenClaw 可靠性修复。

---

### 4. UI/UX 正在进入统一设计阶段  
- 相关 PR：
  - [#2762](https://github.com/netease-youdao/LobsterAI/pull/2762)
  - [#2760](https://github.com/netease-youdao/LobsterAI/pull/2760)

中性灰阶主题、侧边栏导航样式、主内容区域边界和窗口尺寸逻辑的调整，说明项目正在对产品界面做系统化整理。这通常意味着项目已从“功能可用”逐步转向“体验一致”。

---

## 6. 用户反馈摘要

今日没有 Issue 评论、用户讨论或反应数据，因此无法从 Issues 中提炼直接的真实用户反馈。

但从修复类 PR 可以间接推断出以下潜在用户痛点：

1. **长任务中模型输出不完整**
   - 相关 PR：[#2761](https://github.com/netease-youdao/LobsterAI/pull/2761)  
   - 可能场景：用户让 Agent 生成较长代码、规划任务、执行复杂分析时，输出在中途被截断。

2. **工具调用失败后错误不透明**
   - 相关 PR：[#2759](https://github.com/netease-youdao/LobsterAI/pull/2759), [#2763](https://github.com/netease-youdao/LobsterAI/pull/2763)  
   - 可能场景：使用 OpenAI-compatible Provider 或第三方模型时，工具调用参数格式不稳定，最终只看到泛化失败信息，难以判断是模型、Provider、工具还是框架问题。

3. **长任务恢复与重启后的连续性不足**
   - 相关 PR：[#2765](https://github.com/netease-youdao/LobsterAI/pull/2765)  
   - 可能场景：Gateway 重启、运行时 compaction 或迁移后，用户希望已经确认或接受的工作不会丢失。

4. **Cowork 执行过程缺少进度可见性**
   - 相关 PR：[#2758](https://github.com/netease-youdao/LobsterAI/pull/2758)  
   - 可能场景：用户在等待 Agent 执行任务时，希望看到当前计划、步骤状态、是否仍在运行以及能否刷新状态。

---

## 7. 待处理积压

基于今日数据，未发现长期未响应的 Issue 或 PR；当前没有 Issue 更新，也没有历史积压列表可供判断。今日仍待处理的主要是 4 条 Open PR，均为近期创建或更新，暂不属于长期积压，但建议维护者按影响程度优先关注以下项目。

### 高优先级待处理

#### 1. Accepted work 恢复与 compaction 保留  
- PR：[#2765](https://github.com/netease-youdao/LobsterAI/pull/2765)  
- 建议优先级：高  
- 原因：影响状态恢复、Gateway 重启后的任务连续性，是 Agent 可靠性的核心问题。

#### 2. 模型调用开始后的 replay 边界修复  
- PR：[#2763](https://github.com/netease-youdao/LobsterAI/pull/2763)  
- 建议优先级：高  
- 原因：涉及错误呈现、重试机制和消息提交一致性，可能影响用户排障与任务执行成功率。

### 中优先级待处理

#### 3. Gateway 策略热重载  
- PR：[#2764](https://github.com/netease-youdao/LobsterAI/pull/2764)  
- 建议优先级：中到高  
- 原因：能减少配置更新导致的重启，对部署型用户价值较大。

#### 4. Cowork 原生 OpenClaw 进度卡展示与刷新  
- PR：[#2758](https://github.com/netease-youdao/LobsterAI/pull/2758)  
- 建议优先级：中  
- 原因：提升长任务可观察性和 Cowork 体验，适合作为下一版本体验增强项。

---

## 项目健康度评估

- **活跃度**：中高。24 小时内 8 条 PR 更新，说明核心开发节奏较快。  
- **社区参与度**：偏低。今日无 Issue 更新，PR 评论和反应数据缺失或为 0。  
- **稳定性趋势**：向好。多个 PR 正在修复模型调用、工具调用、恢复与重试相关问题。  
- **产品成熟度**：持续提升。Cowork 进度卡和 UI 布局统一表明项目正在优化最终用户体验。  
- **发布节奏**：今日无新版本，当前更像是版本前的修复与整合阶段。

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

# CoPaw 项目动态日报（2026-09-25）

> 数据源显示本日 Issues/PR 链接指向 `agentscope-ai/QwenPaw`，以下日报按提供的 GitHub 活动数据整理。

---

## 1. 今日速览

过去 24 小时项目活跃度较高：共更新 **5 条 Issues**、**10 条 Pull Requests**，其中新开/活跃 Issue 4 条，关闭 Issue 1 条；PR 中仍有 8 条待合并，2 条已关闭。  
今日主题明显集中在 **Console 侧边栏体验、上下文窗口/媒体历史处理、插件与工具调用稳定性、移动端诉求** 等方向。  
从 PR 分布看，社区贡献者参与度较强，多个 `[first-time-contributor]` PR 覆盖插件、微信登录、浏览器执行、消息分片、Cron 回滚等边缘问题，说明项目正在收到较多真实使用场景反馈。  
整体健康度评估：**活跃、修复导向明确，但近期回归与上下文/媒体处理问题值得维护者优先关注**。

---

## 3. 项目进展

### 已关闭 / 已处理的重要 PR

#### 1. Console 会话列表默认分组调整，跟进侧边栏回归问题  
- PR：[#7972 fix(console): default session list grouping to source](https://github.com/agentscope-ai/QwenPaw/pull/7972)  
- 状态：Closed  
- 关联 Issue：[#7968 Console sidebar redesign broke chat group/folder feature](https://github.com/agentscope-ai/QwenPaw/issues/7968)  
- 主要内容：
  - 将 Console 侧边栏会话列表默认分组模式从 `date` 改为 `source`。
  - 测试中显式设置旧的 date 模式，以保留覆盖。
- 项目推进意义：
  - 这是对 v2.2.2b3 侧边栏重构回归的快速响应。
  - 有助于恢复用户对“聊天分组/来源分组”心智模型的预期。
  - 该问题已关闭，说明维护者已确认或已有修复路径。

#### 2. 工具调用生命周期查询时机修正  
- PR：[#7971 fix(console): gate tool-call lifecycle queries on execution start](https://github.com/agentscope-ai/QwenPaw/pull/7971)  
- 状态：Closed  
- 主要内容：
  - 修正 Console 在 `plugin_call` 消息生成完成后过早轮询工具调用生命周期的问题。
  - 原逻辑会在后端 ToolCoordinator 尚未注册调用时请求 `GET /api/tool-calls/{sid}/{tcid}`。
- 项目推进意义：
  - 改善工具调用状态展示的稳定性。
  - 降低前端误报、404 或生命周期状态不同步的概率。
  - 对依赖插件/工具链的 Agent 使用体验有直接改善。

### 待合并但值得关注的修复 PR

#### 3. 媒体 URL 被 Provider 拒绝后的会话恢复  
- PR：[#7973 fix(agents): recover from rejected media URLs](https://github.com/agentscope-ai/QwenPaw/pull/7973)  
- 状态：Open  
- 关联 Issue：[#7966 Session permanently broken after provider switch](https://github.com/agentscope-ai/QwenPaw/issues/7966)  
- 主要内容：
  - 当 Provider 返回 HTTP 400，提示媒体 URL 非法时，避免会话在后续每一轮都持续失败。
- 项目推进意义：
  - 直接修复跨 Provider 切换后的“会话永久损坏”问题。
  - 对使用 OpenAI-compatible endpoint、云端 Provider 与本地文件媒体混合场景很关键。

#### 4. Scroll 上下文回收与 thinking 省略规则修正  
- PR：[#7965 fix(context): reclaim historical media in Scroll and align thinking omission with token counting](https://github.com/agentscope-ai/QwenPaw/pull/7965)  
- 状态：Open  
- 主要内容：
  - 解决长图像会话、工具循环中旧媒体内容无法被有效折叠的问题。
  - 修正 thinking 省略与 token counting 之间的不一致。
- 项目推进意义：
  - 对长上下文、多图像、多工具调用场景非常重要。
  - 与今日新报的上下文窗口误判问题形成同一类稳定性信号。

#### 5. Langfuse 工具观测未记录输出  
- PR：[#7964 fix(observability): Langfuse tool observation never records tool output](https://github.com/agentscope-ai/QwenPaw/pull/7964)  
- 状态：Open  
- 主要内容：
  - 修复 Langfuse `tool.*` observations 只记录 input 和 metadata、不记录 output 的问题。
- 项目推进意义：
  - 提升可观测性与调试能力。
  - 对生产环境定位 Agent 工具调用异常很有价值。

---

## 4. 社区热点

### 1. Console 侧边栏重构导致分组/文件夹能力异常  
- Issue：[#7968 Console sidebar redesign broke chat group/folder feature](https://github.com/agentscope-ai/QwenPaw/issues/7968)  
- 状态：Closed  
- 评论数：2  
- 关联 PR：[#7972](https://github.com/agentscope-ai/QwenPaw/pull/7972)  
- 背后诉求：
  - 用户升级到 QwenPaw Desktop `2.2.2b3` 后，原有聊天组不可见，也无法创建新组。
  - 该问题属于明显的 UI/UX 回归，影响用户组织会话的基础工作流。
- 分析：
  - 虽然评论数不高，但这是今日最关键的回归之一。
  - 修复速度较快，说明维护者对 Console 体验回归比较敏感。

### 2. Provider 切换后历史中的 `file://` 媒体 URL 导致会话永久失败  
- Issue：[#7966 Session permanently broken after provider switch](https://github.com/agentscope-ai/QwenPaw/issues/7966)  
- 状态：Open  
- 评论数：2  
- 关联 PR：[#7973](https://github.com/agentscope-ai/QwenPaw/pull/7973)  
- 背后诉求：
  - 用户在本地/桌面环境中使用带文件媒体的历史消息，再切换到 OpenAI-compatible Provider 后，Provider 拒绝 `file://` URL。
  - 用户希望系统能自动降级、清理或跳过不可用媒体，而不是让整个会话永久不可用。
- 分析：
  - 这是典型的跨 Provider 兼容性问题。
  - 随着项目支持更多模型服务端和本地文件能力，该类问题会越来越常见，应考虑建立统一的媒体 URL 兼容策略。

### 3. 本地 llama.cpp 上下文窗口被云模型目录误判  
- Issue：[#7979 Cloud context-window catalog applied to a local llama.cpp provider](https://github.com/agentscope-ai/QwenPaw/issues/7979)  
- 状态：Open  
- 评论数：1  
- 背后诉求：
  - 用户部署的本地 llama.cpp 服务实际上下文窗口为 32k，但系统根据静态云模型目录将别名 `qwen3.8-27b` 误认为 1M。
  - 结果是上下文压缩机制不触发，最终导致请求超过本地服务能力。
- 分析：
  - 这是模型能力发现与 Provider 类型绑定不清的问题。
  - 表明项目需要区分“云模型 catalog 能力”和“本地部署实际能力”。

### 4. 官方移动端应用诉求  
- Issue：[#7976 [Feature]: Official QwenPaw mobile app](https://github.com/agentscope-ai/QwenPaw/issues/7976)  
- 状态：Open  
- 评论数：1  
- 背后诉求：
  - 用户希望官方至少提供 Android 移动端，用于安全连接自托管 QwenPaw 服务，进行对话和常用管理。
  - 用户已经制作了临时非官方 Android 客户端，但不希望其替代官方长期维护方案。
- 分析：
  - 这是明确的路线图信号：用户使用场景正在从桌面/网页扩展到移动端。
  - 安全连接、自托管服务、会话管理可能是移动端 MVP 的核心需求。

---

## 5. Bug 与稳定性

按影响程度排序如下：

### P0 / 高优先级：会话永久不可用

#### Provider 切换后 `file://` 媒体 URL 被拒绝，导致历史会话持续失败  
- Issue：[#7966](https://github.com/agentscope-ai/QwenPaw/issues/7966)  
- 状态：Open  
- 环境：
  - QwenPaw Desktop `2.2.2b3`
  - Windows 10 ARM64
  - Provider：`agentscope` OpenAI-compatible endpoint
- 影响：
  - 用户切换 Provider 后，历史中的本地文件媒体 URL 被远程 Provider 拒绝。
  - 会话在后续轮次持续失败，用户无法自然恢复。
- Fix PR：
  - [#7973 fix(agents): recover from rejected media URLs](https://github.com/agentscope-ai/QwenPaw/pull/7973)  
- 建议：
  - 优先合并并验证该 PR。
  - 后续应补充跨 Provider 媒体历史兼容测试。

---

### P1 / 高优先级：上下文窗口误判导致压缩失效

#### 本地 llama.cpp Provider 被错误套用云模型 1M 上下文配置  
- Issue：[#7979](https://github.com/agentscope-ai/QwenPaw/issues/7979)  
- 状态：Open  
- 影响：
  - 本地服务实际只有 32k 上下文窗口，但系统认为模型有 1M。
  - 上下文压缩不触发，长会话可能直接失败。
- Fix PR：
  - 暂未看到直接对应 PR。
  - 相关上下文修复 PR：[＃7965](https://github.com/agentscope-ai/QwenPaw/pull/7965) 可能缓解部分长上下文压力，但不直接解决 Provider 能力识别问题。
- 建议：
  - 将本地 Provider 的上下文窗口配置从静态云模型 catalog 中剥离。
  - 支持显式配置、服务端探测或按 Provider 优先级覆盖。

---

### P1 / 高优先级：Console 侧边栏分组/文件夹功能回归

#### v2.2.2b3 侧边栏重构后聊天组不可见、无法创建新组  
- Issue：[#7968](https://github.com/agentscope-ai/QwenPaw/issues/7968)  
- 状态：Closed  
- 影响：
  - 会话组织能力受损。
  - 已有分组不可见会造成用户误以为数据丢失。
- Fix PR：
  - [#7972 fix(console): default session list grouping to source](https://github.com/agentscope-ai/QwenPaw/pull/7972)
- 结论：
  - 已有修复闭环，但建议在下个 beta 中明确列为回归修复项。

---

### P2 / 中优先级：工具调用状态查询时机不当

#### Console 过早查询工具调用生命周期  
- PR：[#7971](https://github.com/agentscope-ai/QwenPaw/pull/7971)  
- 状态：Closed  
- 影响：
  - 工具调用生命周期可能出现查询失败或状态不同步。
- 结论：
  - 已处理，对工具调用 UI 稳定性有正面作用。

---

### P2 / 中优先级：长上下文、媒体与 thinking 计数不一致

#### 图像密集型会话和工具循环可能耗尽上下文  
- PR：[#7965](https://github.com/agentscope-ai/QwenPaw/pull/7965)  
- 状态：Open  
- 影响：
  - Scroll 无法有效回收历史媒体。
  - thinking 省略与 token counting 不一致，可能导致上下文预算判断偏差。
- 建议：
  - 该 PR 与 #7979 一起评估，形成一组上下文稳定性修复。

---

### P3 / 低到中优先级：插件、微信、浏览器、Cron、消息分片等边缘稳定性

#### 禁用插件目录不应被识别为已安装  
- PR：[#7975](https://github.com/agentscope-ai/QwenPaw/pull/7975)  
- 状态：Open  
- 影响：App Center 安装状态显示可能误导用户。

#### 微信二维码登录等待时间应按真实时间而不是轮询次数计算  
- PR：[#7974](https://github.com/agentscope-ai/QwenPaw/pull/7974)  
- 状态：Open  
- 影响：网络慢或接口耗时时，登录等待预算可能不准确。

#### 浏览器执行中禁止 `finally` 内模块级 return 造成异常语义  
- PR：[#7970](https://github.com/agentscope-ai/QwenPaw/pull/7970)  
- 状态：Open  
- 影响：Agent 提交的浏览器代码执行语义可能不符合预期。

#### Cron 删除失败后回滚应恢复到原始行位置  
- PR：[#7969](https://github.com/agentscope-ai/QwenPaw/pull/7969)  
- 状态：Open  
- 影响：删除失败回滚后任务顺序可能变化，影响管理体验。

#### Markdown 分片时应使用原打开 fence 关闭代码块  
- PR：[#7967](https://github.com/agentscope-ai/QwenPaw/pull/7967)  
- 状态：Open  
- 影响：长消息拆分后 Markdown 渲染可能异常，尤其是非标准 fence 长度或语言标记场景。

---

## 6. 功能请求与路线图信号

### 1. 跨 Agent 的 Recent Sessions 面板  
- Issue：[#7978 [Feature]: Cross-agent "Recent Sessions" panel](https://github.com/agentscope-ai/QwenPaw/issues/7978)  
- 状态：Open  
- 需求描述：
  - 在 Console 侧边栏增加“Recent Sessions”区域。
  - 聚合所有 Agent 最近活跃会话。
  - 显示生成中、等待输入、空闲、未读等状态。
  - 点击后可一步跳转到对应会话。
- 路线图信号：
  - 用户正在管理多个 Agent、多条会话，需要更高效的监控和切换入口。
  - 与今日 Console 侧边栏分组回归、默认分组调整相关，说明侧边栏正在成为核心信息架构区域。
- 纳入下一版本可能性：
  - 中等。该需求与当前 Console 改造方向高度相关，但需要较多 UI/状态管理设计。

### 2. 官方移动端应用  
- Issue：[#7976 [Feature]: Official QwenPaw mobile app](https://github.com/agentscope-ai/QwenPaw/issues/7976)  
- 状态：Open  
- 需求描述：
  - 用户希望官方至少推出 Android 客户端。
  - 支持安全连接自托管 QwenPaw 服务。
  - 支持对话和常用管理操作。
- 路线图信号：
  - 项目使用场景从桌面端扩展到移动端。
  - 自托管用户对安全连接、认证、远程管理的需求增强。
- 纳入下一版本可能性：
  - 短期较低，中长期值得进入路线图。
  - 若已有 Web Console 响应式能力，可先考虑 PWA 或轻量移动 Web 方案。

---

## 7. 用户反馈摘要

### 1. 用户对回归问题敏感，尤其是会话组织能力  
- 来源：[#7968](https://github.com/agentscope-ai/QwenPaw/issues/7968)  
- 痛点：
  - 升级后原有聊天组不可见，会引发“数据是否丢失”的焦虑。
  - 无法创建新组会直接破坏用户日常整理会话的流程。
- 反馈信号：
  - Console 信息架构变更需要更强的兼容性测试和迁移提示。

### 2. 多 Provider 切换是实际使用场景，但历史媒体兼容性不足  
- 来源：[#7966](https://github.com/agentscope-ai/QwenPaw/issues/7966)  
- 痛点：
  - 用户可能在本地模型、云模型、OpenAI-compatible 服务之间切换。
  - 历史中的 `file://` 媒体 URL 对远端 Provider 无效，导致整个会话不可继续。
- 反馈信号：
  - 系统需要将“历史消息可重放性”和“Provider 能力差异”作为核心兼容性问题处理。

### 3. 本地模型用户需要可控、准确的能力配置  
- 来源：[#7979](https://github.com/agentscope-ai/QwenPaw/issues/7979)  
- 痛点：
  - 本地部署模型的上下文窗口不一定等同于云端同名/相似模型。
  - 静态 catalog 匹配别名可能造成严重误判。
- 反馈信号：
  - 本地 Provider 应支持显式能力声明，避免云端模型知识污染本地配置。

### 4. 多 Agent 使用者需要更高效的会话监控  
- 来源：[#7978](https://github.com/agentscope-ai/QwenPaw/issues/7978)  
- 痛点：
  - 当前在多个 Agent 和多个会话之间切换成本较高。
  - 用户希望看到实时状态和未读提示。
- 反馈信号：
  - 项目用户正在从“单 Agent 对话”进入“多 Agent 工作台”场景。

### 5. 移动端访问需求开始出现  
- 来源：[#7976](https://github.com/agentscope-ai/QwenPaw/issues/7976)  
- 痛点：
  - 用户希望在手机上安全访问自己的 QwenPaw 服务。
  - 非官方客户端只能临时满足需求，不适合作为长期方案。
- 反馈信号：
  - 官方应至少明确移动端策略：原生 App、PWA、移动 Web 或开放 API 客户端规范。

---

## 8. 待处理积压

基于当前 24 小时数据，未发现“长期未响应”的历史 Issue 或 PR 记录；但以下开放项应优先进入维护者队列：

### 高优先级待处理

1. **Provider 切换后媒体 URL 导致会话永久失败**  
   - Issue：[#7966](https://github.com/agentscope-ai/QwenPaw/issues/7966)  
   - Fix PR：[#7973](https://github.com/agentscope-ai/QwenPaw/pull/7973)  
   - 建议：优先 Review/Merge，并补充回归测试。

2. **本地 llama.cpp 上下文窗口被云 catalog 误判**  
   - Issue：[#7979](https://github.com/agentscope-ai/QwenPaw/issues/7979)  
   - 建议：明确本地 Provider 能力解析优先级，避免静态云模型目录错误匹配。

3. **上下文回收与 token 计数一致性修复**  
   - PR：[#7965](https://github.com/agentscope-ai/QwenPaw/pull/7965)  
   - 建议：与 #7979 一并评估，作为上下文稳定性专项修复。

### 中优先级待处理

4. **Langfuse 工具输出观测缺失**  
   - PR：[#7964](https://github.com/agentscope-ai/QwenPaw/pull/7964)  
   - 建议：尽快合并以提升线上调试能力。

5. **App Center 插件安装状态误判**  
   - PR：[#7975](https://github.com/agentscope-ai/QwenPaw/pull/7975)

6. **微信二维码登录等待时间计算问题**  
   - PR：[#7974](https://github.com/agentscope-ai/QwenPaw/pull/7974)

7. **Markdown 长消息分片 fence 修复**  
   - PR：[#7967](https://github.com/agentscope-ai/QwenPaw/pull/7967)

8. **Cron 删除失败回滚顺序问题**  
   - PR：[#7969](https://github.com/agentscope-ai/QwenPaw/pull/7969)

9. **浏览器执行模块级 return/finally 语义问题**  
   - PR：[#7970](https://github.com/agentscope-ai/QwenPaw/pull/7970)

---

## 今日结论

今日 CoPaw/QwenPaw 项目处于 **高活跃修复周期**：Console 回归、媒体历史兼容、上下文窗口判断、工具调用观测等稳定性问题集中出现，同时社区贡献者提交了大量边缘场景修复 PR。  
短期最值得关注的是 **#7966 + #7973** 和 **#7979 + #7965** 两组问题，它们分别影响会话可恢复性和长上下文可靠性。  
从产品方向看，用户正在提出更明确的工作台化和移动化诉求，包括跨 Agent Recent Sessions 面板与官方移动端，这些可能成为后续版本的重要路线图信号。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目动态日报 — 2026-09-25

## 1. 今日速览

过去 24 小时 ZeroClaw 活跃度较高：新增/活跃 Issues 8 条、PR 更新 18 条，其中 16 条仍待合并，2 条已关闭。今日工作重心明显集中在 **发布链路稳定性、SOP/安全/插件能力、Provider 扩展、Windows 与 CI 稳定性修复**。  
从数据看，项目处于高并发开发阶段：多个 `risk:high`、`size:XL` 的大型 PR 同时推进，功能扩张速度快，但也带来较高的评审、回归与发布风险。社区反馈方面，今日 Issue 评论与反应数均较低，说明当前更多是维护者/贡献者主动提交问题与修复，公开讨论热度不高。

---

## 2. 版本发布

今日无新版本发布。  
最新 Releases 数据为空，过去 24 小时没有新的 tag/release 公布。

---

## 3. 项目进展

### 已关闭的重要 PR

#### PR #11102 — SOP 能力栈整合：Headless SOP 运行与跨入口重命名能力  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11102  
状态：已关闭  
标签：`risk:high`, `size:XL`, `tool:sop`, `gateway`, `runtime`, `cli`, `web`, `zerocode`

该 PR 将 SOP 相关能力作为一个完整 stack 合并式推进，覆盖 headless SOP run、SOP 重命名、网关、运行时、CLI、Web 与 Zerocode 等多个入口。  
它反映出项目正在将 SOP 从文档/配置层能力推进到更完整的自动化执行体系。由于 PR 已关闭，但数据未明确显示是否 merged，日报中不应假定其已进入主干；维护者仍需确认关闭原因与后续替代 PR。

#### PR #11083 — 修复 Webhook 启动的 SOP agent step 未执行问题  
链接：https://github.com/zeroclaw-labs/zeroclaw/pull/11083  
状态：已关闭  
标签：`bug`, `gateway`, `risk:medium`, `size:XS`

该 PR 针对 `POST /sop/<path>` 触发的 SOP run，如果首个 action 是 agent step，则不会被实际执行的问题进行修复。  
这是一个较小但关键的网关/SOP 执行链路修复，影响自动化 webhook 场景的可靠性。状态为关闭，同样需要确认是否已合并或被其他 PR 替代。

### 今日仍在推进的关键方向

#### 发布链路与 crates.io 发布可靠性  
相关 PR：

- PR #11086 — 发布 dashboard bundle 前进行 preflight 校验  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11086
- PR #11091 — GitHub Release 之前验证 crates  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11091
- PR #11095 — 阻止无法发布 crates 的版本 bump  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11095
- PR #11105 — 使用当前 tooling 恢复 crates.io 发布  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11105

这一组 PR 说明近期发布流程曾出现 crates.io 发布失败或校验顺序不足的问题。项目正在把发布失败从“发布后发现”前移到“发布前阻断”，这对提升 release 可信度非常重要。

#### 安全与身份认证栈  
相关 PR：

- PR #11082 — OIDC principals、enrollment 与 gateway auth surface  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11082

该 PR 是大型安全功能集合，覆盖 OIDC、注册流程、网关认证面、pairing、安全策略等多个模块。它可能是下一阶段 ZeroClaw 面向多用户、企业或远程代理场景的重要基础设施。

#### 插件能力增强  
相关 PR：

- PR #11081 — Host-mediated sockets、WebSocket、TLS profiles、durable state  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11081
- PR #11098 — 插件安装时授权 egress，并报告插件是否加载成功  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11098

插件系统正在从“可安装/可运行”走向更完整的运行时能力：网络访问、TLS 配置、持久状态、安装时权限授权、加载状态反馈。这对第三方工具、agent 扩展和安全边界都很关键。

#### Provider 扩展  
相关 Issue/PR：

- Issue #11103 — 请求添加 Cheaper Inference typed provider  
  https://github.com/zeroclaw-labs/zeroclaw/issues/11103
- PR #11104 — 添加 Cheaper Inference model provider  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11104

该需求已快速对应到实现 PR，说明 Provider catalog 扩展流程较成熟，也反映用户希望 ZeroClaw 支持更多 OpenAI-compatible 网关，以降低推理成本、提升可选模型范围。

---

## 4. 社区热点

今日 Issues 均为 0 评论、0 反应，PR 评论数在数据中未提供或为 `undefined`。因此从公开互动指标看，没有明显的“高讨论热度”话题。不过从标签、PR 体量和关联影响面看，以下议题应视为事实上的维护热点。

### 发布可靠性与 crates.io 发布失败恢复  
链接：

- https://github.com/zeroclaw-labs/zeroclaw/pull/11105
- https://github.com/zeroclaw-labs/zeroclaw/pull/11095
- https://github.com/zeroclaw-labs/zeroclaw/pull/11091
- https://github.com/zeroclaw-labs/zeroclaw/pull/11086

背后诉求：  
维护者希望避免发布流程中出现“GitHub Release 已公开，但 crates.io 发布失败”的不一致状态。当前方案是强化 preflight、提前验证可发布性，并阻断风险版本 bump。

### SOP 自动化能力扩张  
链接：

- https://github.com/zeroclaw-labs/zeroclaw/pull/11102
- https://github.com/zeroclaw-labs/zeroclaw/pull/11085
- https://github.com/zeroclaw-labs/zeroclaw/pull/11083

背后诉求：  
SOP 正从静态流程描述走向可执行、可触发、可被模型决策门控的自动化执行系统。`selectable decision models` 表明 ZeroClaw 可能希望让不同决策模型决定 SOP 是否触发及如何执行。

### 插件权限与网络能力  
链接：

- https://github.com/zeroclaw-labs/zeroclaw/issues/11097
- https://github.com/zeroclaw-labs/zeroclaw/pull/11098
- https://github.com/zeroclaw-labs/zeroclaw/pull/11081

背后诉求：  
插件系统需要在“能力开放”和“安全控制”之间取得平衡。用户希望安装插件时权限更清晰、网络访问更易配置，同时避免 shell/配置转义等细节导致运维错误。

### Windows 桌面端生命周期问题  
链接：https://github.com/zeroclaw-labs/zeroclaw/issues/11087

背后诉求：  
Windows 用户关闭窗口后，应用进程仍残留且无法重新打开或退出，属于直接阻断日常使用的桌面体验问题。该问题严重程度为 S1，应优先排查。

---

## 5. Bug 与稳定性

### S1 — Windows 关闭窗口后应用无法重新打开或退出  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11087  
组件：`runtime/daemon`  
状态：Open  
是否已有 fix PR：未在今日数据中看到明确对应 PR

问题摘要：  
Windows 上关闭主窗口后，`zeroclaw-desktop.exe` 进程仍存活，并持有一个 16x16 的单实例 marker 窗口，导致用户既无法重新打开应用，也无法正常退出。

影响评估：  
这是今日最严重的用户工作流阻断问题。它影响桌面端基本生命周期管理，应优先定位是窗口关闭事件处理、daemon 生命周期、single-instance lock 还是 tray/minimize 逻辑的问题。

---

### S2 — Apple preflight 测试因 retry sleep mock 干扰 subprocess polling 而失败  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11094  
相关 PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11101  
组件：`tooling/ci`  
状态：Issue Open，PR Open

问题摘要：  
Apple preflight test harness patch 了 `self.helper.time.sleep`，但 Python 的 `time` 模块是共享的，因此该 patch 也可能影响真实 subprocess polling 中的 sleep，导致测试不稳定。

影响评估：  
这是 CI 稳定性问题，会造成非相关 PR 的 required check 间歇失败。PR #11101 已针对该问题修复测试记录 subprocess reap sleep 的行为，建议优先合并以降低 CI 噪音。

---

### S2 — Stable docs promotion 未同步 root llms 文件  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11093  
组件：`tooling/ci`  
状态：Open  
是否已有 fix PR：未在今日数据中看到明确对应 PR

问题摘要：  
`promote-stable` 路径会更新站点 root redirect、stable pointer 和 version selector，但没有同步根目录下的 `llms.txt` 与 `llms-full.txt`。当 stable 从 release A 切换到 release B 时，面向 LLM 的文档索引可能仍指向旧内容。

影响评估：  
该问题会影响文档一致性，尤其是 LLM、搜索、RAG 或自动文档消费场景。考虑到 ZeroClaw 面向 AI agent/assistant 用户，该问题不只是文档细节，也可能影响下游自动化工具获取正确知识。

---

### S3 — Plugin egress remedy command 未转义既有 grant 中的 apostrophe  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11097  
可能相关 PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11098  
组件：`plugins`  
状态：Open

问题摘要：  
egress-denial remedies 会把完整 grant list 序列化为 JSON，再用单引号包裹传给 `zeroclaw config set`。如果既有 entry 中含有 apostrophe，命令可能被破坏。

影响评估：  
严重程度标为 S3，但该问题涉及权限补救命令的可靠性与安全边界。建议在 PR #11098 的插件安装/授权 UX 改动中一并检查是否覆盖该转义问题；若未覆盖，应单独补测试。

---

### 发布流程稳定性风险 — crates.io 与 GitHub Release 顺序不一致  
相关 PR：

- https://github.com/zeroclaw-labs/zeroclaw/pull/11086
- https://github.com/zeroclaw-labs/zeroclaw/pull/11091
- https://github.com/zeroclaw-labs/zeroclaw/pull/11095
- https://github.com/zeroclaw-labs/zeroclaw/pull/11105

问题摘要：  
多个 PR 显示 v0.8.5 发布期间 crates.io 发布链路存在失败或验证时机过晚问题。当前修复重点是确保 dashboard bundle 与 crates tarball 在发布前完成一致性验证。

影响评估：  
这类问题不会直接影响运行时功能，但会影响用户对 release 的信任，并可能导致包仓库和 GitHub Release 状态不一致。风险标签多为 `risk:high`，应保持小步合并与严格验证。

---

## 6. 功能请求与路线图信号

### Cheaper Inference Provider 支持  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11103  
PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11104

用户诉求：  
希望 ZeroClaw 原生支持 Cheaper Inference，作为 typed OpenAI-compatible provider。该服务提供统一 endpoint：`https://api.cheaperinference.com/v1`，可访问多家模型实验室的模型。

路线图判断：  
已存在对应 PR，且 PR 规模为 `size:S`，进入下一版本的可能性较高。该需求符合 ZeroClaw 多 provider、多模型网关支持方向。

---

### 保留 provider alias 的 cost-rate catalog prefill  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11100

用户诉求：  
Dashboard 和 Zerocode 在从 provider catalog 预填模型成本费率时，应保留完整 provider identity，即 `<family>.<alias>`，而不是只保留 provider family。

路线图判断：  
该需求与成本管理、多账号/多 endpoint provider 配置有关。对于使用多个同 family provider alias 的团队，这是实际运营需求。今日未看到对应 PR，但值得纳入 dashboard / Zerocode 成本配置优化。

---

### Risk-based merge-result freshness  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11096  
相关 PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11084

用户诉求：  
当前 required checks 可能是在较旧 master base 上通过的。之后 master 发生共享依赖或 workspace-wide test 变更时，PR 虽然仍可 clean merge，但实际合并结果可能失败。

路线图判断：  
PR #11084 已对 squash-merge freshness 文档/技能进行调整，拒绝 stale green checks。这个方向可能演变为更严格的合并守门策略：不仅看 PR head checks，还要按风险判断 merge result 是否足够新鲜。

---

### Multi-agent setup guide 文档迁移  
Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11088

用户诉求：  
当前 multi-agent setup guide 放在 Contributing 下，用户认为它更应归入 Agents 文档区域。

路线图判断：  
这是信息架构问题，但对新用户理解多 agent 使用路径有帮助。PR 数据中未看到直接对应修复，建议作为低风险 docs 改进尽快处理。

---

### Relay frontdoor prefill 与二维码配对体验  
相关 PR：

- PR #11089 — relay frontdoor 支持 `?node=&code=` 预填  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11089
- PR #11099 — enroll 时输出 relay frontdoor link 和二维码  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11099

路线图判断：  
这组 PR 明显面向移动端或跨设备 pairing/enrollment 体验。通过 link 和 QR code 降低用户手动输入 node id 与 pairing code 的成本，进入下一版本的可能性较高，但 #11099 依赖 #11089。

---

### Runtime composition contract  
相关 PR：

- PR #11092 — holding-crate exception for composition contract  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11092
- PR #11090 — runtime composition contract  
  https://github.com/zeroclaw-labs/zeroclaw/pull/11090

路线图判断：  
这是偏架构治理的工作。#11090 依赖 #11092，且 #11092 需要 Core Team review。短期是否进入版本取决于核心团队对 ADR-016 例外的批准。

---

## 7. 用户反馈摘要

> 注：今日 Issues 评论数均为 0，因此以下摘要基于 Issue/PR 描述中的问题陈述和使用场景提炼，不包含后续评论讨论。

### 桌面用户：Windows 生命周期体验存在阻塞  
来源：https://github.com/zeroclaw-labs/zeroclaw/issues/11087  
用户痛点：关闭窗口后应用无法重新打开，也无法退出，进程残留。  
使用场景：Windows 桌面端日常使用、单实例应用重启、关闭后再次启动。  
满意/不满意信号：这是明显的不满意反馈，属于核心体验问题。

### 运维/插件用户：插件 egress 授权命令需要更可靠  
来源：https://github.com/zeroclaw-labs/zeroclaw/issues/11097  
用户痛点：配置命令中未正确处理 apostrophe，可能导致自动生成 remedy 无法执行。  
使用场景：安装或运行插件时遇到 egress denial，需要按提示修复配置。  
满意/不满意信号：用户希望系统生成的命令是可直接复制执行的，而不是需要手动修正 shell quoting。

### 文档/LLM 消费者：stable docs 与 llms 索引需一致  
来源：https://github.com/zeroclaw-labs/zeroclaw/issues/11093  
用户痛点：stable 文档推广后，根目录 LLM 索引文件可能仍指向旧版本。  
使用场景：LLM、RAG、搜索索引或自动文档工具读取 `llms.txt` / `llms-full.txt`。  
满意/不满意信号：不一致会降低文档可信度，尤其影响 AI 工具集成。

### 成本管理用户：Provider alias 不应在 cost prefill 时丢失  
来源：https://github.com/zeroclaw-labs/zeroclaw/issues/11100  
用户痛点：多个 provider alias 场景下，仅按 family 查询 catalog 会导致成本配置不精确。  
使用场景：团队配置多个同类 provider endpoint/account，并分别维护成本费率。  
满意/不满意信号：用户希望 dashboard 和 Zerocode 尊重完整 provider identity。

### 多 Agent 用户：文档入口位置影响可发现性  
来源：https://github.com/zeroclaw-labs/zeroclaw/issues/11088  
用户痛点：multi-agent setup guide 放在 Contributing 下，容易让使用者误以为它只面向贡献者。  
使用场景：用户搭建多 agent 环境，而非参与项目开发。  
满意/不满意信号：文档结构与用户心智模型不一致。

---

## 8. 待处理积压

由于提供的数据仅覆盖过去 24 小时，无法可靠判断“长期未响应”的 Issue 或 PR。以下为今日新增/活跃但需要维护者重点排队处理的积压项。

### 高优先级待处理

1. Windows 桌面端关闭后无法重新打开或退出  
   Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11087  
   原因：S1，直接阻断用户工作流；今日未看到对应 fix PR。

2. Apple preflight 测试不稳定  
   Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11094  
   PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11101  
   原因：影响 required CI，可能阻塞无关 PR；已有小规模修复 PR，适合优先评审。

3. Stable docs promotion 未同步 LLM 文档索引  
   Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11093  
   原因：影响 stable 文档一致性和 AI/LLM 文档消费场景；暂无明确修复 PR。

4. 发布链路高风险 PR stack  
   PRs：  
   - https://github.com/zeroclaw-labs/zeroclaw/pull/11086  
   - https://github.com/zeroclaw-labs/zeroclaw/pull/11091  
   - https://github.com/zeroclaw-labs/zeroclaw/pull/11095  
   - https://github.com/zeroclaw-labs/zeroclaw/pull/11105  
   原因：多个 PR 互相依赖且标记 `risk:high`，但直接关系到后续 release 可靠性。建议按依赖顺序合并，避免 stack 漂移。

### 中优先级待处理

5. Cheaper Inference provider  
   Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11103  
   PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11104  
   原因：需求与实现已对齐，PR 规模小，适合快速评审以扩展 provider 生态。

6. Provider alias cost-rate prefill  
   Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11100  
   原因：影响多 alias、多账号成本管理，暂无对应 PR。

7. Plugin egress remedy apostrophe escaping  
   Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11097  
   可能相关 PR：https://github.com/zeroclaw-labs/zeroclaw/pull/11098  
   原因：虽为 S3，但涉及自动修复命令可靠性；建议确认 #11098 是否覆盖。

8. Multi-agent setup guide 文档迁移  
   Issue：https://github.com/zeroclaw-labs/zeroclaw/issues/11088  
   原因：低风险文档 IA 优化，可改善新用户发现路径。

---

## 项目健康度判断

整体来看，ZeroClaw 今日开发活跃度高，维护者正在同时推进核心能力扩张和工程质量修复。积极信号包括：发布流程问题被系统性前移到 preflight、Provider 扩展响应较快、插件和 SOP 能力持续完善。  
主要风险在于：高风险大型 PR 过多且相互依赖，可能增加评审压力和回归概率；Windows 桌面端 S1 问题尚未看到修复路径；部分 CI/docs 稳定性问题会影响项目外部可信度。建议短期优先合并小型稳定性修复，随后按依赖顺序处理 release-gate 与安全/SOP 大型 PR。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*