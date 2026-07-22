# OpenClaw 生态日报 2026-07-22

> Issues: 28 | PRs: 54 | 覆盖项目: 13 个 | 生成时间: 2026-07-22 01:01 UTC

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

# OpenClaw 项目动态日报｜2026-07-22

## 1) 今日速览
今天 OpenClaw 处于**高活跃**状态：过去 24 小时内有 **28 条 Issues 更新**、**54 条 PR 更新**，说明社区反馈和代码交付都在密集推进。  
尽管**没有新版本发布**，但已有 **18 条 PR 处于已合并/已关闭状态**，表明项目在持续收敛问题、推进修复与功能落地。  
今日讨论焦点主要集中在 **Linux/Gateway 兼容性、cron 执行策略、启动/迁移稳定性、模型目录稳定性、UI/体验优化**。  
整体来看，项目健康度不错，但仍存在若干**启动阻塞、回归、跨平台兼容与安全边界**类高风险议题，短期重点应放在 review、回归验证和发布收敛上。

---

## 2) 版本发布
**今日无新 Release。**

---

## 3) 项目进展
今天已关闭/合并的 PR 以**稳定性修复、安全加固、UI 改善、依赖治理**为主，推进面较广：

- [#112415](https://github.com/openclaw/openclaw/pull/112415) **cron 任务限额与永久失败处理修复**  
  修正了 cron script/code 模式下的执行上限与失败处理，属于典型的生产稳定性补强。  
  关联问题：[#112454](https://github.com/openclaw/openclaw/issues/112454)

- [#112411](https://github.com/openclaw/openclaw/pull/112411) **生产依赖刷新**  
  解决了依赖审计失败与已知漏洞清理问题，属于供应链安全维护。  

- [#112443](https://github.com/openclaw/openclaw/pull/112443) **fast-uri override 升级**  
  针对高危依赖告警做了定点修复，直接影响安全合规。  

- [#112434](https://github.com/openclaw/openclaw/pull/112434) **WorkBoard 原生 widget kinds**  
  推进 Dashboard × 插件集成能力，属于产品能力扩展。  

- [#112264](https://github.com/openclaw/openclaw/pull/112264) **gateway.port 超范围值校验**  
  修复配置校验漏洞，减少“配置看似成功、实际不可用”的隐性故障。  

- [#112437](https://github.com/openclaw/openclaw/pull/112437) / [#112456](https://github.com/openclaw/openclaw/pull/112456) **Control UI / native locales 刷新**  
  持续维护多语言资源，属于体验与国际化基础设施更新。  

- [#112433](https://github.com/openclaw/openclaw/pull/112433) **非 Git 目录直接会话支持**  
  改善新会话启动路径，降低新用户上手门槛。  
  关联问题：[#112242](https://github.com/openclaw/openclaw/issues/112242)

**整体判断：** 今日 PR 侧的推进不只是“修 bug”，还在继续夯实 OpenClaw 的**安全、兼容、可运维性**，同时维持产品侧的 UI/功能迭代。

---

## 4) 社区热点
### Issues 热点
- [#112386](https://github.com/openclaw/openclaw/issues/112386) **Linux 上无需 systemd 也能管理 gateway**  
  3 条评论，反映出用户希望 OpenClaw 在更多 Linux 发行版上可用，尤其是 **非 systemd 环境**（如 Slackware、容器/嵌入式/自管场景）。这是明显的“平台可移植性诉求”。

- [#112371](https://github.com/openclaw/openclaw/issues/112371) **cron 预检门控 + 可选 script-only jobs**  
  2 条评论，核心诉求是减少“世界很安静时仍然照常跑 LLM”的空转成本，用户在意的是 **token 成本、延迟和自动化效率**。  
  这类需求通常来自生产化 fleet 用户。

- [#112454](https://github.com/openclaw/openclaw/issues/112454) **claude-cli cron toolsAllow 无法被强制执行**  
  1 条评论，但问题更偏“执行路径一致性”和“fail-closed”安全策略，说明社区对 cron/工具权限控制的可靠性要求很高。  
  已有修复 PR：[#112457](https://github.com/openclaw/openclaw/pull/112457)

- [#112438](https://github.com/openclaw/openclaw/issues/112438) **Anthropic Claude Sonnet 5 配置导致 models list 崩溃**  
  用户关注的是“**一个模型配置错误不应拖垮整个模型列表**”，这类反馈直指配置健壮性和容错能力。

- [#112450](https://github.com/openclaw/openclaw/issues/112450) **Matrix 启动迁移扫描 legacy roots 但跳过 dedupe state**  
  这类问题多见于升级/迁移链路，说明有用户在真实生产数据上遇到**状态一致性**问题。

### PR 热点
PR 侧没有显式评论数数据，但以下几条属于明显的**高关注/高风险变更**：
- [#112453](https://github.com/openclaw/openclaw/pull/112453) **依赖大刷新 PR**：覆盖面极广，通常意味着需要较多回归验证。
- [#112000](https://github.com/openclaw/openclaw/pull/112000) **高风险 prompt refactor**：带有多个 merge-risk 标签，且当前仍在等待作者处理，属于维护者必须盯住的变更。

---

## 5) Bug 与稳定性
以下按“对可用性/安全影响”从高到低排序，并标注是否已有修复 PR：

1. [#112391](https://github.com/openclaw/openclaw/issues/112391) **Docker `:latest` 回退到旧版本，触发降级保护并阻塞启动**  
   - 影响：**启动阻塞 / 发布链路回退风险**  
   - 状态：开放  
   - 修复 PR：**未见明确对应 PR**

2. [#112395](https://github.com/openclaw/openclaw/issues/112395) **从 6.11 升级到 7.1 后启动前置迁移阻塞 gateway**  
   - 影响：**升级后不可启动**  
   - 状态：开放  
   - 修复 PR：**未见明确对应 PR**

3. [#112438](https://github.com/openclaw/openclaw/issues/112438) **Anthropic Claude Sonnet 5 配置导致 models list 全量崩溃**  
   - 影响：**核心命令崩溃 / 配置容错不足**  
   - 状态：开放  
   - 修复 PR：**未见明确对应 PR**

4. [#112454](https://github.com/openclaw/openclaw/issues/112454) **claude-cli runtime 无法执行受限 toolsAllow 的 cron 任务**  
   - 影响：**功能不可用 / 安全策略失效**  
   - 状态：开放  
   - 修复 PR：**有，[#112457](https://github.com/openclaw/openclaw/pull/112457)**

5. [#112450](https://github.com/openclaw/openclaw/issues/112450) **Matrix 启动迁移扫描旧 root，但跳过 dedupe state**  
   - 影响：**迁移一致性问题 / 状态异常**  
   - 状态：开放  
   - 修复 PR：**未见明确对应 PR**

6. [#112435](https://github.com/openclaw/openclaw/issues/112435) **exec-provider secret 解析只有一次 5000ms 尝试，慢解析器会永久失败**  
   - 影响：**启动脆弱性 / 对外部秘钥系统依赖过强**  
   - 状态：开放  
   - 修复 PR：**未见明确对应 PR**

7. [#112427](https://github.com/openclaw/openclaw/issues/112427) **Codex 插件在新装 Ubuntu 24.04 + Node 24.18.0 上加载失败**  
   - 影响：**插件初始化失败**  
   - 状态：开放  
   - 修复 PR：**未见明确对应 PR**

8. [#112423](https://github.com/openclaw/openclaw/issues/112423) **大 SQLite transcript 清理阻塞 gateway event loop**  
   - 影响：**性能退化 / 事件循环阻塞**  
   - 状态：开放  
   - 修复 PR：**有，[#112436](https://github.com/openclaw/openclaw/pull/112436)**

9. [#112445](https://github.com/openclaw/openclaw/issues/112445) **Codex OAuth 刷新忽略 env proxy，导致受地区限制 egress 下 403**  
   - 影响：**认证失败 / 网络环境兼容性**  
   - 状态：开放  
   - 修复 PR：**未见明确对应 PR**

10. [#112431](https://github.com/openclaw/openclaw/issues/112431) **Agent session toggle 展开/折叠异常**  
    - 影响：**UI 行为错误**  
    - 状态：开放  
    - 修复 PR：**未见明确对应 PR**

已关闭的稳定性/bug 项也值得注意：
- [#112040](https://github.com/openclaw/openclaw/issues/112040) 已关闭：国际电话号码格式化改进
- [#112220](https://github.com/openclaw/openclaw/issues/112220) 已关闭：macOS 活动/存在感知 consent 问题
- [#112219](https://github.com/openclaw/openclaw/issues/112219) 已关闭：macOS Voice Wake on-device 承诺不一致
- [#112217](https://github.com/openclaw/openclaw/issues/112217) 已关闭：macOS 权限状态触发 Automation consent
- [#112377](https://github.com/openclaw/openclaw/issues/112377) 已关闭：macOS app 因 PATH 审计重启健康 gateway

---

## 6) 功能请求与路线图信号
从今天的新增需求和已提交 PR 看，下面这些方向最像下一版本的路线图信号：

- [#112405](https://github.com/openclaw/openclaw/issues/112405) **从 live provider catalogs 发现模型**  
  已有实现 PR：[#112412](https://github.com/openclaw/openclaw/pull/112412)  
  这是非常明确的版本级功能信号：用户想更快看到新模型，而不是等静态 catalog 发版。

- [#112371](https://github.com/openclaw/openclaw/issues/112371) **cron 预检门控 + script-only jobs**  
  与 [#112457](https://github.com/openclaw/openclaw/pull/112457) 的 cron 工具策略修复形成组合拳，说明 cron 体系在往“更省钱、更可控、更 fail-closed”演进。

- [#112419](https://github.com/openclaw/openclaw/issues/112419) **WebChat 消息编辑**  
  这是典型的高频 UX 需求，若落地会明显降低输入失误成本。

- [#112399](https://github.com/openclaw/openclaw/issues/112399) **在 Control UI 中管理 DM pairing 请求**  
  这属于“把后台流程产品化”，对实际运营会很有价值。

- [#112425](https://github.com/openclaw/openclaw/issues/112425) **图片 lightbox**  
  属于 UI 可用性增强，可能进入中短期体验迭代。

- [#112386](https://github.com/openclaw/openclaw/issues/112386) **Linux gateway 脱离 systemd 管理**  
  如果继续推进，将显著扩大 OpenClaw 在非主流 Linux/自托管环境中的适用面。

- [#112404](https://github.com/openclaw/openclaw/issues/112404) **新增 Gemini 模型到目录**  
  模型目录持续扩充，说明“模型可用性”和“跟进供应商发布节奏”仍是重要产品方向。

---

## 7) 用户反馈摘要
从 Issues 里的真实描述可以提炼出几条非常清晰的用户痛点：

- **“我想在更多环境里跑起来”**  
  例如 [#112386](https://github.com/openclaw/openclaw/issues/112386) 要求 Linux 上不要强依赖 systemd，说明有相当一部分用户在 **非标准桌面 Linux / 自托管环境** 中使用 OpenClaw。

- **“别让我为空转付费”**  
  [#112371](https://github.com/openclaw/openclaw/issues/112371) 反映出生产用户很在意 cron 的 **空跑成本、token 消耗和调度效率**。

- **“启动和迁移必须稳”**  
  [#112395](https://github.com/openclaw/openclaw/issues/112395)、[#112450](https://github.com/openclaw/openclaw/issues/112450)、[#112435](https://github.com/openclaw/openclaw/issues/112435) 表明用户对 **升级、迁移、秘钥解析、初始化链路** 的容忍度很低。

- **“一个模型别拖垮整个列表”**  
  [#112438](https://github.com/openclaw/openclaw/issues/112438) 说明用户希望配置错误能被局部隔离，而不是影响整页/整命令。

- **“UI 要更可读、更顺手”**  
  如 [#112431](https://github.com/openclaw/openclaw/issues/112431)、[#112425](https://github.com/openclaw/openclaw/issues/112425)、[#112419](https://github.com/openclaw/openclaw/issues/112419)、[#112357](https://github.com/openclaw/openclaw/pull/112357) 等，反映出用户在意的是**会话状态可见性、内容可编辑性、图片可查看性、身份信息可读性**。

- **“网络/代理/地区限制不要把我卡死”**  
  [#112445](https://github.com/openclaw/openclaw/issues/112445) 说明 OpenClaw 的用户使用环境很复杂，常见于 **代理、跨地域、受限出口** 场景。

---

## 8) 待处理积压
严格说，给定窗口里未看到特别“长期沉默”的老单，但以下高风险项值得维护者优先盯住：

- [#112000](https://github.com/openclaw/openclaw/pull/112000) **高风险 prompt refactor，当前 waiting on author**  
  带有多个 merge-risk 标签，涉及 session-state、compatibility、security-boundary，属于**不适合拖延**的变更。

- [#112453](https://github.com/openclaw/openclaw/pull/112453) **全仓库依赖刷新大 PR**  
  覆盖面极广，若长时间悬而不决，容易形成后续发布阻塞与安全债务。

- [#112412](https://github.com/openclaw/openclaw/pull/112412) **live catalogs 模型发现**  
  这是明显的路线图功能，但涉及多 provider，建议尽早完成跨供应商回归。

- [#112433](https://github.com/openclaw/openclaw/pull/112433) **非 Git 目录直连会话**  
  影响新用户首轮体验，适合尽快收敛。

- [#112457](https://github.com/openclaw/openclaw/pull/112457) / [#112459](https://github.com/openclaw/openclaw/pull/112459) / [#112436](https://github.com/openclaw/openclaw/pull/112436)  
  这些都是与今日高关注问题强关联的修复 PR，建议维护者优先完成审阅、合并与回归验证。

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合 Slack/飞书发布的短版**，或  
2. **适合维护者周会的“风险优先级表格版”**。

---

## 横向生态对比

以下为基于 2026-07-22 公开动态的**横向对比分析报告**，面向技术决策者与开发者。

---

## 1) 生态全景

2026 年中期的个人 AI 助手/自主智能体开源生态，明显从“拼功能”进入“拼可用性、可控性和可运维性”的阶段。  
今天几乎所有活跃项目都在处理同一类问题：**权限边界、长会话稳定性、跨平台兼容、配置健壮性、流式交付可靠性**。  
同时，社区关注点也从单纯的模型能力扩展，转向“**agent 是否真的能在真实环境稳定跑起来**”。  
从节奏上看，生态分成两类：一类是 **RC/Beta 或高密度修复期**，另一类是 **维护型/低活跃型**。  
整体趋势很清晰：**AI 智能体正在从“演示型产品”走向“生产系统”**。

---

## 2) 各项目活跃度对比

| 项目 | Issues 更新 | PR 更新 | Release 情况 | 健康度评估 |
|---|---:|---:|---|---|
| **OpenClaw** | 28 | 54 | 无新 Release | **高活跃，问题面广但收敛快，进入稳定性攻坚期** |
| **Hermes Agent** | 50 | 50 | 无新 Release | **高活跃，修复驱动强，长会话/跨平台压力较大** |
| **CoPaw / QwenPaw** | 15 | 18 | 新增 **v2.0.1-beta.1** | **高活跃，Beta 收敛期，功能与回归并行** |
| **IronClaw** | 10 | 43 | 新增 **v1.0.0-rc.1** | **高活跃，RC 收敛期，架构重构密集** |
| **ZeroClaw** | 9 | 10 | 无新 Release | **高输入、低落地，安全与配置风险较集中** |
| **NanoBot** | 1 | 11 | 无新 Release | **中高活跃，围绕控制、安全与透明度持续修补** |
| **PicoClaw** | 1 | 3 | 无新 Release | **中等偏活跃，体验与稳定性打磨为主** |
| **NanoClaw** | 0 | 6 | 无新 Release | **维护型，偏连接器与消息链路修复** |
| **LobsterAI** | 0 | 6 | 无新 Release | **中低活跃，偏流程/体验修补** |
| **Moltis** | 0 | 1 | 无新 Release | **低活跃，主要是依赖维护** |
| **NullClaw** | 0 | 0 | 无活动 | **静默** |
| **TinyClaw** | 0 | 0 | 无活动 | **静默** |
| **ZeptoClaw** | 0 | 0 | 无活动 | **静默** |

---

## 3) OpenClaw 在生态中的定位

### 核心定位
OpenClaw 在这组项目里更像是**平台型中枢**，而不是单点功能型 agent。  
它的动态覆盖面最广：**gateway、cron、模型目录、Linux 兼容性、配置校验、UI、国际化、安全依赖**，说明其目标不是某个垂直场景，而是构建一个可长期运行的 AI 助手底座。

### 相比同类的优势
- **活跃度领先**：24h 内 **54 条 PR 更新**，是本组里最强的交付密度之一。
- **问题覆盖面广**：从启动、迁移、模型列表崩溃，到 cron 策略、Linux 非 systemd 支持，说明社区使用场景很分散，产品外延更大。
- **“生产化”导向明显**：大量议题围绕 fail-closed、权限校验、依赖安全、gateway 稳定性，已不是单纯 demo 工程。
- **产品与基础设施并重**：既做 UI/多语言/体验，也做安全与可运维性，路线更完整。

### 与其他项目的技术路线差异
- **vs Hermes Agent**：OpenClaw 更偏**网关/调度/平台治理**，Hermes 更偏**多平台交付与消息系统稳定性**。
- **vs CoPaw**：OpenClaw 更偏**基础设施和系统层**，CoPaw 更偏**桌面工作台、文档输入、模型控制**。
- **vs IronClaw**：IronClaw 是**架构重写与 RC 收敛**，OpenClaw 更像**持续迭代的生产平台**。
- **vs ZeroClaw**：ZeroClaw 明显更**安全/评测/隔离优先**，OpenClaw 则更均衡，兼顾体验与平台能力。
- **vs NanoBot / PicoClaw**：OpenClaw 规模和复杂度更高，不是单一控制点优化，而是多模块协同演进。

### 社区规模对比
从 GitHub 24h 可见活动看，OpenClaw 处于**第一梯队**，与 Hermes、CoPaw、IronClaw 共同构成生态中的高活跃核心；  
但与 OpenClaw 相比，其他项目要么更垂直，要么更偏 RC/Beta 收敛，**OpenClaw 的讨论面和改动面都更宽**。

---

## 4) 共同关注的技术方向

### 1. 权限边界与安全执行
涉及项目：
- **OpenClaw**：cron toolsAllow、gateway 配置校验
- **NanoBot**：shell 执行前用户确认、/stop、/cancel-goal
- **PicoClaw**：policy-gated system exec
- **Hermes Agent**：危险命令识别、fail closed
- **ZeroClaw**：shell 工具 workspace 边界绕过、Landlock
- **IronClaw**：witness / dispatch authority 收口

共同诉求：
- agent 能执行，但必须**可控、可审计、可拦截**。

---

### 2. 长会话/长任务的稳定终止与资源回收
涉及项目：
- **NanoBot**：/stop 终止子进程、取消持续目标
- **Hermes Agent**：session lease 泄漏、后台任务死锁
- **OpenClaw**：大 SQLite transcript 清理阻塞 event loop
- **CoPaw**：会话历史污染、性能回归
- **ZeroClaw**：session backend、runtime 行为收敛

共同诉求：
- agent 不仅要“跑得动”，还要**能停、能回收、能恢复**。

---

### 3. 配置健壮性与 fail-closed
涉及项目：
- **OpenClaw**：gateway.port 越界校验、模型列表容错
- **ZeroClaw**：save_dirty、config patch、alias 残留
- **Hermes Agent**：reasoning scope、认证/连接语义
- **CoPaw**：时区、模型 override、历史会话一致性
- **IronClaw**：session check、admin action、连接测试 fail closed

共同诉求：
- 一处配置出错，**不能拖垮整条链路**。

---

### 4. 跨平台/复杂环境兼容
涉及项目：
- **OpenClaw**：Linux 非 systemd、代理、地区限制
- **Hermes Agent**：Windows/macOS/Telegram/Discord/Thai 语言渲染
- **NanoClaw**：容器读取 WhatsApp 媒体、Telegram Markdown
- **PicoClaw**：远程 OAuth、headless callback
- **CoPaw**：Tauri、离线编辑器、内网场景
- **LobsterAI**：流式输出、权限弹窗流程

共同诉求：
- AI 助手必须能在**容器、桌面、内网、代理、不同 Linux 发行版**下稳定工作。

---

### 5. 可观测性、评测与回放机制
涉及项目：
- **ZeroClaw**：run-history、judge calibration、评测闭环
- **IronClaw**：QA trace replay、live QA trace catalog
- **LobsterAI**：tracing skill
- **OpenClaw**：依赖审计、安全治理、发布收敛
- **Hermes Agent**：测试 flake 修复、交付确认

共同诉求：
- agent 系统逐渐进入“**必须可回放、可定位、可验收**”阶段。

---

## 5) 差异化定位分析

### 按功能侧重
- **OpenClaw**：平台治理、gateway、cron、模型目录、Linux 兼容
- **Hermes Agent**：跨平台运行时、消息交付、桌面/TUI/适配器
- **CoPaw**：桌面工作台、多模态输入、会话控制、模型精细化
- **IronClaw**：架构重建、权限/调度模型、RC 收敛
- **ZeroClaw**：安全隔离、评测、配置正确性、远程后端
- **NanoBot**：控制权、安全确认、停止/取消机制
- **PicoClaw**：安全执行、OAuth、输出质量
- **NanoClaw**：消息连接器与路由稳定性
- **LobsterAI**：协作流程、分享/权限、流式输出体验

### 按目标用户
- **OpenClaw / ZeroClaw / IronClaw**：更像面向**重度自托管、平台集成、生产部署**用户。
- **CoPaw / LobsterAI**：更偏**桌面工作台/知识工作流**用户。
- **Hermes Agent**：面向**多平台消息交付与长期运行**用户。
- **NanoBot / PicoClaw / NanoClaw**：偏**中小团队、自动化执行、特定通道集成**。

### 按技术架构
- **OpenClaw**：偏平台化与模块化治理。
- **IronClaw**：偏从零重构，架构边界更强。
- **ZeroClaw**：偏安全约束和评测闭环。
- **CoPaw**：偏桌面产品化与模型控制中台。
- **Hermes Agent**：偏事件驱动、适配器化、多终端交付。

---

## 6) 社区热度与成熟度

### 快速迭代阶段
- **OpenClaw**
- **Hermes Agent**
- **CoPaw / QwenPaw**
- **IronClaw**
- **ZeroClaw**

特征：
- Issue/PR 密度高
- 讨论主题多且偏生产问题
- 多数在补齐稳定性、兼容性、权限边界
- 其中 **IronClaw、CoPaw** 已明确进入 RC/Beta 收敛

### 质量巩固阶段
- **NanoBot**
- **PicoClaw**
- **NanoClaw**
- **LobsterAI**

特征：
- 迭代量中等
- 主要修交互、安全、兼容、展示细节
- 更像“把产品打磨到可用”

### 维护型/低活跃
- **Moltis**
- **NullClaw**
- **TinyClaw**
- **ZeptoClaw**

特征：
- 几乎无社区讨论
- 以依赖更新或静默状态为主
- 短期内不体现明显生态势能

---

## 7) 值得关注的趋势信号

### 趋势 1：agent 的“权限治理”正在产品化
过去是“给模型工具”；现在是“给模型工具，但要有审批、边界、审计、fail-closed”。  
这在 OpenClaw、NanoBot、PicoClaw、ZeroClaw、IronClaw 上都非常明显。  
**对开发者的启示**：工具调用框架必须原生支持策略层，不要只做简单 allowlist。

### 趋势 2：长会话/长任务控制成为核心能力
/stop、/cancel-goal、session lease、后台子进程终止、continuation prompt 分隔等问题说明：  
**agent 的失败模式，越来越像操作系统和任务调度系统的问题**。  
**启示**：任务取消、恢复、幂等、资源回收要纳入一等公民设计。

### 趋势 3：兼容性不再只是“能启动”，而是“在复杂环境里能稳定启动”
Linux 非 systemd、Windows、macOS、代理网络、容器、远程 OAuth、地区限制都在被反复提及。  
**启示**：跨平台 agent 需要更强的环境抽象与可插拔后端。

### 趋势 4：配置错误不能拖垮整套系统
模型配置崩溃、迁移阻塞、路径校验失败、JSON 输出不稳定、secret 解析脆弱，都是同一个问题：  
**配置系统必须 fail-closed 且局部隔离**。  
**启示**：配置解析、迁移、加载链路要做强健错误分层。

### 趋势 5：评测与回放正在成为发布前基础设施
ZeroClaw 的 judge calibration、IronClaw 的 QA trace replay、Hermes 的测试稳定性修复，说明项目已经开始把“模型效果验证”工程化。  
**启示**：没有 trace/回放/基线，agent 很难进入稳定迭代。

### 趋势 6：模型与 provider 抽象进入深水区
live catalog、fast mode、model override、tool filtering、provider 差异映射等议题说明：  
**“接一个模型”已经不够，必须管理模型行为差异**。  
**启示**：模型层要支持动态发现、能力探测和行为约束，而不是静态配置。

---

## 总结

这组项目共同说明：**开源 AI 智能体生态已经从“概念验证”进入“工程收敛”阶段**。  
OpenClaw 代表了最典型的平台化方向；Hermes、ZeroClaw、IronClaw、CoPaw 则分别代表运行时稳定性、安全隔离、架构重构和桌面产品化的不同路径。  
对开发者而言，下一阶段的竞争重点不再是“谁的模型接得更多”，而是**谁能把权限、会话、配置、跨平台、评测这五件事做稳**。  

如果你愿意，我可以继续把这份报告整理成：
1. **一页纸决策摘要版**，或  
2. **面向团队例会的表格+要点版**。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 项目动态日报（2026-07-22）

## 1. 今日速览
过去 24 小时内，NanoBot 的变动以 **PR 驱动** 为主：仅 1 条 Issue 更新且已关闭，PR 更新则达到 11 条，其中 6 条已完成、5 条仍在开放处理中，说明项目仍处于较高频迭代状态。  
今天的工作重心非常明确，集中在 **安全可控性、停止/取消机制、稳定性修复、WebUI 体验优化** 和 **Provider 兼容性**。  
从健康度看，项目整体是“**活跃且持续向前**”的，但仍有几项 P1 级开放项，尤其是任务中断、子进程清理与运行时透明性，值得继续优先跟进。  
今日未见新版本发布。  

---

## 3. 项目进展
今天完成/关闭的 6 个 PR，主要推进了以下几个方向：

- **文件读取安全性与资源保护**  
  [#5014 fix(files): reject oversized reads before loading](https://github.com/HKUDS/nanobot/pull/5014)  
  先于加载阶段拒绝超大文件读取，避免 `read_file` 先把整文件读入内存造成 gateway 内存压力，是一条很实用的稳定性/安全性修复。

- **运行时失败可见性提升**  
  [#5011 fix: stop masking runtime failures](https://github.com/HKUDS/nanobot/pull/5011)  
  不再把上下文治理、工具准备、配置、会话 I/O、GitStore 等异常静默吞掉，减少“假成功”与隐性故障。

- **Codex Fast mode 支持**  
  [#5019 feat(providers): support Codex fast mode](https://github.com/HKUDS/nanobot/pull/5019)  
  扩展 OpenAI Codex provider 能力，补齐 `service_tier: "priority"` 等能力说明，增强 provider 适配面。

- **Skill 引用高亮优化**  
  [#5020 feat(webui): highlight skill references in sent messages](https://github.com/HKUDS/nanobot/pull/5020)  
  提升消息中 `$skillname` 引用的可读性，让用户更容易识别可用技能。

- **Skill 自动补全优化**  
  [#5016 fix(webui): prioritize skill names in autocomplete](https://github.com/HKUDS/nanobot/pull/5016)  
  将完整 skill 名称置顶，改善长技能名展示与插入体验，属于明显的 WebUI 可用性提升。

- **Markdown 表格 diff 渲染修复**  
  [#5015 fix(webui): keep Markdown table diffs inline](https://github.com/HKUDS/nanobot/pull/5015)  
  避免 Prism 的 `table` class 与 Tailwind `.table` 发生冲突，修复 Markdown diff 的展示错位问题。

**整体推进评价：**  
今天的完成项不是“堆功能”，而是围绕 **稳定性、可控性、透明度和交互细节** 做系统性增强。对于一个 AI agent / 个人助手类项目来说，这类改进直接提升可用性与可信度，属于高价值迭代。

---

## 4. 社区热点
今天最明确的讨论热点来自这一条 Issue：

- [#5013 [enhancement] shell执行前，需要用户确认](https://github.com/HKUDS/nanobot/issues/5013)  
  这是今日唯一可见的 Issue 讨论点，且有 1 条评论。核心诉求是：**在执行 shell 命令前增加 human confirmation**，避免自动执行带来的安全风险。

从热度上看，今天没有出现高评论量、强争议的线程；但从诉求强度看，#5013 反映的是一个非常典型的 AI Agent 使用痛点：  
**当模型拥有执行 shell 的能力时，用户最在意的不再只是“能不能做”，而是“做之前是否可控、可拦截、可确认”。**

另外，以下几条开放 PR 也体现出类似的“控制权”与“可视化”诉求，虽然暂无显著评论热度，但方向上非常接近社区关注点：

- [#5022 add /cancel-goal command to break sustained-goal loops](https://github.com/HKUDS/nanobot/pull/5022)
- [#5021 cascade exec session termination on /stop](https://github.com/HKUDS/nanobot/pull/5021)
- [#5017 show the actual fallback model](https://github.com/HKUDS/nanobot/pull/5017)

---

## 5. Bug 与稳定性
按影响程度排序，今日最值得关注的问题如下：

### P1：Shell 执行缺少人工确认，存在安全风险
- [#5013 shell执行前，需要用户确认](https://github.com/HKUDS/nanobot/issues/5013)  
- 状态：**已关闭的 enhancement issue，但问题本身仍值得纳入安全治理设计**
- 影响：用户担心 agent 在未确认情况下直接执行 shell 命令，带来误操作、越权或安全事故风险
- 现状：**暂无直接对应的 fix PR** 出现在今日数据中

### P1：持续目标可能导致任务“停不下来”
- [#5022 add /cancel-goal command to break sustained-goal loops](https://github.com/HKUDS/nanobot/pull/5022)  
- 状态：**开放中**
- 影响：在 sustained-goal 场景下，系统级目标提示会压过用户“停止”意图，导致 agent 陷入验证死循环
- 修复进度：**已有 fix PR，仍待合并**

### P1：`/stop` 不能彻底终止子 agent 的 exec 子进程
- [#5021 cascade exec session termination on /stop](https://github.com/HKUDS/nanobot/pull/5021)  
- 状态：**开放中**
- 影响：子任务被取消后，子进程仍可能继续运行，造成资源泄漏，最坏情况下持续 30 分钟或更久
- 修复进度：**已有 fix PR，仍待合并**

### P1：超大文件读取可能导致内存压力
- [#5014 fix(files): reject oversized reads before loading](https://github.com/HKUDS/nanobot/pull/5014)  
- 状态：**已完成**
- 影响：旧实现先完整加载文件再截断，存在 gateway 内存耗尽风险
- 修复进度：**已修复**

### P1：运行时错误被静默掩盖
- [#5011 fix: stop masking runtime failures](https://github.com/HKUDS/nanobot/pull/5011)  
- 状态：**已完成**
- 影响：异常被默认替换为“安全默认值”，会掩盖真正的故障来源
- 修复进度：**已修复**

---

## 6. 功能请求与路线图信号
从今日新增/推进的 PR 和 Issue 看，NanoBot 的路线图信号非常清晰：

### 1）执行控制与安全治理，优先级最高
- [#5013 shell执行前，需要用户确认](https://github.com/HKUDS/nanobot/issues/5013)
- [#5022 /cancel-goal](https://github.com/HKUDS/nanobot/pull/5022)
- [#5021 /stop 终止子进程](https://github.com/HKUDS/nanobot/pull/5021)

这组三件事说明社区正在强烈推动：  
**从“agent 能做什么”转向“agent 做之前、做中、做后如何可控”。**  
如果这些能力继续推进，很可能成为下一版本最核心的稳定性/安全卖点。

### 2）WebUI 的透明度与可解释性
- [#5017 show the actual fallback model](https://github.com/HKUDS/nanobot/pull/5017)
- [#5020 highlight skill references](https://github.com/HKUDS/nanobot/pull/5020)
- [#5016 prioritize skill names in autocomplete](https://github.com/HKUDS/nanobot/pull/5016)

这说明用户不仅要“能用”，还要“看得懂”系统当前到底在做什么、调用了什么模型、引用了什么技能。  
其中 [#5017](https://github.com/HKUDS/nanobot/pull/5017) 还是 P1，**很像下一版本的候选重点**。

### 3）Provider 兼容性持续扩展
- [#5023 fix(providers): add Qwen model-level thinking style mapping](https://github.com/HKUDS/nanobot/pull/5023)
- [#5019 support Codex fast mode](https://github.com/HKUDS/nanobot/pull/5019)

这表明项目仍在持续覆盖更多模型/Provider 的差异化行为，增强生态适配能力。  
其中 [#5023](https://github.com/HKUDS/nanobot/pull/5023) 虽然是 P2，但属于比较典型的兼容性补强项，后续值得关注。

---

## 7. 用户反馈摘要
从 Issue 和 PR 描述中，可以提炼出几类非常真实的用户痛点：

### 1）安全感不足：希望 shell 操作前必须确认
- [#5013](https://github.com/HKUDS/nanobot/issues/5013)  
用户明确担心自动执行 shell 命令的风险，希望在 WebUI 中加入确认机制，并且在循环执行路径中加入中断能力。

### 2）可控性不足：用户“停下来”的指令可能被系统目标覆盖
- [#5022](https://github.com/HKUDS/nanobot/pull/5022)  
这反映出长任务场景下，用户对 agent 的控制权不够强，希望拥有更直接、低摩擦的中止方式。

### 3）资源与进程管理不彻底
- [#5021](https://github.com/HKUDS/nanobot/pull/5021)
- [#5014](https://github.com/HKUDS/nanobot/pull/5014)  
用户在高负载、长任务、子进程场景下，对资源回收和稳定性非常敏感。

### 4）界面需要更透明、更容易理解
- [#5017](https://github.com/HKUDS/nanobot/pull/5017)
- [#5020](https://github.com/HKUDS/nanobot/pull/5020)
- [#5016](https://github.com/HKUDS/nanobot/pull/5016)  
用户希望知道“当前到底用了哪个模型”“这个技能是不是可用”“消息里引用的内容如何识别”，说明可解释性和可读性正在成为关键体验指标。

总体来看，用户的不满意点并不在“功能不够多”，而在 **安全、控制、透明、稳定** 这四个基础体验维度还需继续打磨。

---

## 8. 待处理积压
在本次提供的数据里，**没有看到长期无人响应的旧 Issue**；但当前仍有 5 个开放 PR，构成了维护者最现实的待办积压：

- [#5022 add /cancel-goal command to break sustained-goal loops](https://github.com/HKUDS/nanobot/pull/5022) — P1，建议优先
- [#5021 cascade exec session termination on /stop](https://github.com/HKUDS/nanobot/pull/5021) — P1，建议优先
- [#5017 show the actual fallback model](https://github.com/HKUDS/nanobot/pull/5017) — P1，强用户可见性诉求
- [#5018 support explicit context loading](https://github.com/HKUDS/nanobot/pull/5018) — 明确功能需求，适合后续版本纳入
- [#5023 add Qwen model-level thinking style mapping](https://github.com/HKUDS/nanobot/pull/5023) — P2，偏兼容性补强

**维护建议：**  
如果只能优先推进两项，建议先处理 [#5022](https://github.com/HKUDS/nanobot/pull/5022) 和 [#5021](https://github.com/HKUDS/nanobot/pull/5021)，因为它们直接关系到 agent 的中止控制和进程清理，属于高风险、高感知问题。  

--- 

如需，我也可以把这份日报进一步整理成 **适合公众号/飞书周报的简版摘要**，或者输出为 **Markdown 表格版**。

</details>

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目动态日报（2026-07-22）

## 1) 今日速览
今天 Hermes Agent 的仓库活动非常活跃：过去 24 小时共有 **50 条 Issue 更新**、**50 条 PR 更新**，但**没有新版本发布**。从内容结构看，社区讨论与开发提交几乎同步增长，且主题高度集中在 **稳定性修复、会话状态、网关交付、桌面/TUI 体验、MCP/工具链兼容性** 上，说明项目正处于密集修补与可靠性加固阶段。  
整体来看，项目健康度偏“高活跃、强修复驱动”，但也反映出系统复杂度带来的边缘问题仍较多，尤其是长会话、后台任务、跨平台行为和消息交付链路。

---

## 2) 版本发布
**今日无新 Releases。**  
- 最新 Releases：无  
- 当前没有可分析的版本变更、破坏性变更或迁移事项。

---

## 3) 项目进展
今天可见的 PR 大多仍处于开放状态，说明主线仍在快速迭代中；在已展示列表里，**唯一明确关闭的 PR 是测试修复类提交**，其余重点集中在高风险 bug 修复与功能补强。

### 今日已关闭/合并的重点 PR
- [#69003 test(mcp): fix monotonic-clock flake in circuit-breaker cooldown test](https://github.com/NousResearch/hermes-agent/pull/69003)  
  这是一个 **测试稳定性修复**，解决 MCP 熔断器冷却时间测试的 wall-clock 漂移问题。虽然不直接影响生产功能，但对 CI 稳定性和回归检测质量有帮助。

### 今日主要推进方向（从开放 PR 主题判断）
尽管多数 PR 仍在审核中，但可以看出项目在以下方向持续推进：
- [#69013 fix(oneshot): discover explicitly requested MCP toolsets before agent build](https://github.com/NousResearch/hermes-agent/pull/69013)  
  改善一次性任务中 MCP 工具集发现时机，避免 agent 构建前工具 schema 不完整。
- [#69012 fix(gateway): require explicit delivery acknowledgement for kanban notifications](https://github.com/NousResearch/hermes-agent/pull/69012)  
  强化 Kanban 通知交付语义，减少“看似送达、实际丢失”的风险。
- [#69011 fix(agent): delimit continuation prompts as system instructions](https://github.com/NousResearch/hermes-agent/pull/69011)  
  解决 continuation prompt 被模型误当成普通用户输入的问题，直接提升长任务稳定性。
- [#69007 fix(gateway): make adapter fatal-error handoff cancellation-proof](https://github.com/NousResearch/hermes-agent/pull/69007)  
  针对平台适配器致命错误处理链路进行加固，避免网关“假活着”。
- [#69006 fix(desktop): remove orphaned composer queue entries after max drain attempts](https://github.com/NousResearch/hermes-agent/pull/69006)  
  处理桌面端孤儿队列项，减少跨重启的永久错误通知。
- [#69004 fix(mcp): recover --env flags swallowed by argparse REMAINDER](https://github.com/NousResearch/hermes-agent/pull/69004)  
  修复 MCP 命令行参数解析吞掉 `--env` 的问题。
- [#69002 fix(tui-gateway): fail closed on session reasoning scope](https://github.com/NousResearch/hermes-agent/pull/69002)  
  收紧 session 级 reasoning scope 的边界，减少配置漂移。
- [#69001 fix(hindsight): clear the shutdown latch on session switch](https://github.com/NousResearch/hermes-agent/pull/69001)  
  改善长生命周期进程在会话切换后的 retain 行为。
- [#68997 fix(windows): share one bounded, tree-killing git probe across both probe call sites](https://github.com/NousResearch/hermes-agent/pull/68997)  
  解决 Windows 上 git 探测的子进程悬挂/死锁问题。
- [#68996 fix(approval): detect recursive rm when flags follow operands](https://github.com/NousResearch/hermes-agent/pull/68996)  
  强化危险命令识别，降低误操作风险。

**整体推进判断：**  
今天项目的“前进”主要不是新增功能面，而是围绕 **交付可靠性、会话一致性、跨平台稳定性和命令安全边界** 做系统性加固。这类 PR 一旦落地，会显著降低长期运行中的隐性故障率。

---

## 4) 社区热点
今天最活跃的讨论几乎全部围绕“会话状态、网关交付、终端/桌面边缘行为、平台适配”展开。以下是评论最多、最值得关注的热点：

1. [#68920 Desktop/TUI sessions leak active-session leases](https://github.com/NousResearch/hermes-agent/issues/68920)  
   - 评论数：4  
   - 诉求核心：桌面端/TUI 长时间运行后，active-session lease 累积，最终阻止新会话。  
   - 背后问题：这是典型的“资源泄露导致系统逐步失效”问题，直接影响多会话用户。

2. [#68915 Worker deadlocks when agent backgrounds a server via shell &](https://github.com/NousResearch/hermes-agent/issues/68915)  
   - 评论数：4  
   - 诉求核心：后台启动服务时 worker 死锁。  
   - 背后问题：开发者常见场景就是启动 dev server 并继续验证，说明该 bug 影响非常实际的 agent-in-the-loop 工作流。

3. [#68979 Desktop long-thread reconciliation re-stacks messages after compression](https://github.com/NousResearch/hermes-agent/issues/68979)  
   - 评论数：2  
   - 诉求核心：长线程压缩/重连后，消息渲染顺序错乱。  
   - 背后问题：数据库正确但 UI 错误，说明前端渲染与线程 ordinality 之间存在同步问题。

4. [#68963 Discord slash-command sync logs a retry but exits until reconnect](https://github.com/NousResearch/hermes-agent/issues/68963)  
   - 评论数：2  
   - 诉求核心：429/超时后不会在保持连接期间自动恢复。  
   - 背后问题：插件层“可恢复失败”处理不足，影响 bot 可用性。

5. [#68880 `/curator` slash command not implemented in gateway](https://github.com/NousResearch/hermes-agent/issues/68880)  
   - 评论数：2  
   - 诉求核心：文档说 gateway 支持，但实际没有实现。  
   - 背后问题：文档与产品能力不一致，属于较典型的“契约破裂”。

6. [#68858 v0.19 in-place compaction + dual FTS maintenance can saturate disk I/O](https://github.com/NousResearch/hermes-agent/issues/68858)  
   - 评论数：2  
   - 诉求核心：大 state.db 场景下，压缩导致磁盘 I/O 饱和并阻塞关闭。  
   - 背后问题：这是规模化部署的性能风险，属于高优先级稳定性议题。

7. [#68794 Telegram auth prefilter blocks DM pairing](https://github.com/NousResearch/hermes-agent/issues/68794)  
   - 评论数：2  
   - 诉求核心：`GATEWAY_ALLOW_ALL_USERS=false` 误被当作“已配置认证”。  
   - 背后问题：配置语义不严谨，导致配对流程被误拦截。

8. [#68783 Desktop app version stuck at 0.17.0](https://github.com/NousResearch/hermes-agent/issues/68783)  
   - 评论数：2  
   - 诉求核心：桌面版版本号不同步。  
   - 背后问题：构建与发布链路的版本管理存在偏差，影响用户对版本可信度的判断。

**热点结论：**  
社区现在最关心的不是“新功能有多少”，而是 **Hermes 在长时间运行、复杂消息流、多平台适配时是否足够稳**。这说明产品已进入“规模化使用后的质量压力测试”阶段。

---

## 5) Bug 与稳定性
以下按严重程度与影响面排序，并标注是否已有对应修复 PR（若可见）：

### P1 / 高危
- [#68915 Worker deadlocks when agent backgrounds a server via shell &](https://github.com/NousResearch/hermes-agent/issues/68915)  
  - 影响：worker 进入永久死锁，任务链路中断。  
  - 场景：启动后台服务验证时最常见。  
  - 修复状态：**当前未看到直接对应 fix PR**。

- [#69007 fix(gateway): make adapter fatal-error handoff cancellation-proof](https://github.com/NousResearch/hermes-agent/pull/69007)  
  - 这是一个正在推进的高优先级修复，针对“平台适配器致命错误后网关继续假运行”的严重问题。  
  - 相关风险与 [#68915](https://github.com/NousResearch/hermes-agent/issues/68915) 一样，都会造成任务链路不可恢复。

### P2 / 重要稳定性问题
- [#68920 Desktop/TUI sessions leak active-session leases](https://github.com/NousResearch/hermes-agent/issues/68920)  
  - 影响：新会话被 `max_concurrent_sessions` 阻断。  
  - 修复状态：**未见对应 fix PR**。

- [#68979 Desktop long-thread reconciliation re-stacks recent user messages](https://github.com/NousResearch/hermes-agent/issues/68979)  
  - 影响：UI 线程顺序错乱，阅读/对话体验受损。  
  - 修复状态：**未见对应 fix PR**。

- [#68963 Discord slash-command sync exits until reconnect](https://github.com/NousResearch/hermes-agent/issues/68963)  
  - 影响：插件同步失败后无法自动恢复。  
  - 修复状态：**未见对应 fix PR**。

- [#68858 v0.19 in-place compaction + dual FTS maintenance can saturate disk I/O](https://github.com/NousResearch/hermes-agent/issues/68858)  
  - 影响：大库场景下 I/O 饱和，甚至影响关闭。  
  - 修复状态：**未见对应 fix PR**。

- [#68880 `/curator` slash command not implemented in gateway](https://github.com/NousResearch/hermes-agent/issues/68880)  
  - 影响：文档承诺与实际能力不一致。  
  - 修复状态：**未见对应 fix PR**。

### P3 / 中低风险，但广泛影响体验
- [#68990 Thai combining marks dropped/doubled in TUI](https://github.com/NousResearch/hermes-agent/issues/68990)  
  - 影响：TUI 流式渲染破坏泰语字符显示。  
  - 修复状态：**未见对应 fix PR**。

- [#68989 Telegram adapter hangs indefinitely at “Connecting to Telegram”](https://github.com/NousResearch/hermes-agent/issues/68989)  
  - 影响：Telegram 适配器连接卡死。  
  - 修复状态：**未见对应 fix PR**。

- [#68937 Desktop (macOS) file links fail to open via shell.openPath](https://github.com/NousResearch/hermes-agent/issues/68937)  
  - 影响：文件链接打不开，回退到 Finder。  
  - 修复状态：**未见对应 fix PR**。

- [#68911 Gateway force-redacts standalone E.164 phone numbers](https://github.com/NousResearch/hermes-agent/issues/68911)  
  - 影响：电话号码被过度脱敏，妨碍业务场景。  
  - 修复状态：**未见对应 fix PR**。

- [#68895 Orphaned composer queue entries can never drain](https://github.com/NousResearch/hermes-agent/issues/68895)  
  - 影响：每次重启都弹“Queued message not sent”。  
  - 修复状态：**有对应修复 PR：[#69006](https://github.com/NousResearch/hermes-agent/pull/69006)**。

- [#68794 Telegram auth prefilter blocks DM pairing](https://github.com/NousResearch/hermes-agent/issues/68794)  
  - 影响：Telegram DM 配对被错误阻断。  
  - 修复状态：**未见对应 fix PR**。

- [#68783 Desktop app version stuck at 0.17.0](https://github.com/NousResearch/hermes-agent/issues/68783)  
  - 影响：桌面版版本号与 CLI 不一致。  
  - 修复状态：**未见对应 fix PR**。

### 已有修复/关闭的稳定性项
- [#68772 fix(gateway): duplicate checkpoint kwargs crash agent creation](https://github.com/NousResearch/hermes-agent/issues/68772)  
  - 状态：**已关闭**  
  - 说明：这是一个已结束的回归问题，表明网关 checkpoint 配置双传问题已被处理。

---

## 6) 功能请求与路线图信号
今天的新功能请求数量不少，但从 PR 方向看，短期内更可能被纳入的是“增强现有能力”的需求，而不是大规模新平台扩展。

### 高概率进入下一轮版本/迭代的信号
- [#68995 feat(cron): add interactive reminder feedback](https://github.com/NousResearch/hermes-agent/pull/68995)  
  - 与 cron 提醒交互有关，属于较实用的增量功能，容易形成可见价值。

- [#69013 fix(oneshot): discover explicitly requested MCP toolsets before agent build](https://github.com/NousResearch/hermes-agent/pull/69013)  
  - 更像平台能力补齐，会提升 MCP 生态体验。

- [#69012 fix(gateway): require explicit delivery acknowledgement for kanban notifications](https://github.com/NousResearch/hermes-agent/pull/69012)  
  - 会增强任务通知可靠性，属于路线图优先级较高的“质量功能”。

- [#68809 Normalize cron script wake-gate contract](https://github.com/NousResearch/hermes-agent/issues/68809)  
  - 更像是对 cron 机制的规则统一，可能成为后续文档与行为对齐的基础工作。

### 可能在中期进入版本规划的需求
- [#68970 searchable timezone dropdown in Desktop Settings](https://github.com/NousResearch/hermes-agent/issues/68970)  
  - 典型 UX 改进，落地成本不高。

- [#68964 Per-function tool filtering](https://github.com/NousResearch/hermes-agent/issues/68964)  
  - 更细粒度工具权限控制，需求清晰但涉及架构和配置模型，适合中期规划。

- [#68951 support Atomic Hermes (mobile) as a delivery target](https://github.com/NousResearch/hermes-agent/issues/68951)  
  - 明显的平台扩展诉求，若移动端生态推进，会是重要路线图候选。

- [#68871 Add messaging support for Buzz](https://github.com/NousResearch/hermes-agent/issues/68871)  
  - 新平台接入需求，取决于 Hermes 对消息工作空间生态的策略。

- [#68851 Add A2A support](https://github.com/NousResearch/hermes-agent/issues/68851)  
  - 属于更大的 agent-to-agent 协议路线，若推进会明显增强生态定位。

- [#68822 add Spanish locale for desktop UI](https://github.com/NousResearch/hermes-agent/issues/68822)  
  - 国际化需求，通常会在 UI 体系稳定后逐步吸收。

**路线图判断：**  
短期更可能优先吸收的是 **MCP、cron、gateway 交付、desktop/TUI 体验修复**；  
中期再看 **多语言、移动端、A2A、Buzz 这类生态扩展**。

---

## 7) 用户反馈摘要
从今天的 Issues 评论内容里，可以提炼出几类非常真实的用户痛点：

### 1. 长时间运行后的状态一致性问题
- [#68920](https://github.com/NousResearch/hermes-agent/issues/68920)、[#68979](https://github.com/NousResearch/hermes-agent/issues/68979)、[#68895](https://github.com/NousResearch/hermes-agent/issues/68895)  
  用户希望 Hermes 在长会话、压缩、重连、重启后仍然保持状态一致，不要出现“看起来在，但其实被卡住”的问题。

### 2. 开发者工作流中的后台任务卡死
- [#68915](https://github.com/NousResearch/hermes-agent/issues/68915)  
  真实场景是启动 dev server 后继续交互，但 worker 被 `&` 后台进程拖死。  
  这说明 Hermes 已经进入“代理辅助开发”主场景，后台进程管理是硬需求。

### 3. 多平台消息投递的可靠性与契约一致性
- [#68963](https://github.com/NousResearch/hermes-agent/issues/68963)、[#68880](https://github.com/NousResearch/hermes-agent/issues/68880)、[#68989](https://github.com/NousResearch/hermes-agent/issues/68989)、[#68911](https://github.com/NousResearch/hermes-agent/issues/68911)  
  用户在意的是：消息是否送达、命令是否真的存在、内容是否被过度脱敏、连接失败后是否能恢复。

### 4. 本地终端和国际化显示质量
- [#68990](https://github.com/NousResearch/hermes-agent/issues/68990)、[#68970](https://github.com/NousResearch/hermes-agent/issues/68970)、[#68869](https://github.com/NousResearch/hermes-agent/issues/68869)  
  用户已经开始关注“可用”之外的体验层：字符渲染、主题可读性、时间配置的易用性。

### 5. 用户对能力边界更精细的控制
- [#68964](https://github.com/NousResearch/hermes-agent/issues/68964)、[#68807](https://github.com/NousResearch/hermes-agent/issues/68807)  
  用户不再满足于开/关工具，而是希望有更细粒度、更可预测的权限与写入策略。

**总体反馈：**  
用户对 Hermes 的期待已经从“能用”上升到“长稳、可控、跨平台一致、可审计”。这是一类成熟产品的典型反馈信号。

---

## 8) 待处理积压
今天没有看到特别“长期沉默”的旧工单，但有几类**高优先级、尚未看到直接修复 PR** 的积压值得维护者优先盯住：

### 高优先级未闭环问题
- [#68915 Worker deadlocks when agent backgrounds a server via shell &](https://github.com/NousResearch/hermes-agent/issues/68915)  
  P1，影响任务链路稳定性，建议优先定位。

- [#68920 Desktop/TUI sessions leak active-session leases](https://github.com/NousResearch/hermes-agent/issues/68920)  
  会话租约泄露会逐步拖垮多会话能力，建议尽快修。

- [#68858 v0.19 in-place compaction + dual FTS maintenance can saturate disk I/O](https://github.com/NousResearch/hermes-agent/issues/68858)  
  规模化场景下的性能/关闭问题，值得关注。

- [#68911 Gateway force-redacts standalone E.164 phone numbers](https://github.com/NousResearch/hermes-agent/issues/68911)  
  这是业务可用性与安全边界冲突问题，需要明确策略。

- [#68989 Telegram adapter hangs indefinitely](https://github.com/NousResearch/hermes-agent/issues/68989)  
  平台连接卡死类问题通常会影响用户感知最直接。

### 需要决策/验证的开放 PR
- [#69002 fix(tui-gateway): fail closed on session reasoning scope](https://github.com/NousResearch/hermes-agent/pull/69002)  
- [#69004 fix(mcp): recover --env flags swallowed by argparse REMAINDER](https://github.com/NousResearch/hermes-agent/pull/69004)  
- [#69005 fix(feishu): avoid sensitive websocket URLs in info logs](https://github.com/NousResearch/hermes-agent/pull/69005)  
- [#69007 fix(gateway): make adapter fatal-error handoff cancellation-proof](https://github.com/NousResearch/hermes-agent/pull/69007)  

这些 PR 多数都属于“高收益的基础可靠性修复”，建议尽快完成 review，以免问题继续在 Issues 中扩散。

---

### 一句话结论
**Hermes Agent 今天呈现出“高热度、高修复密度、低发布节奏”的状态：社区在持续暴露真实使用场景下的稳定性问题，而开发侧也正集中火力修复会话、网关、MCP、桌面/TUI 和平台适配链路。**

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-07-22）

## 1. 今日速览
今天 PicoClaw 的活动强度属于**中等偏活跃**：过去 24 小时内共有 **1 条 Issue 更新**、**3 条 PR 更新**，但**没有新版本发布**。  
从内容上看，项目重心集中在三类问题：**Web UI 性能退化**、**OAuth 登录健壮性**、以及 **LLM 输出/总结内容的格式污染问题**。  
同时，今日出现了 1 条已关闭 PR，说明仓库仍在持续推进功能与修复，但当前更多表现为“修补与打磨”而非版本性跃迁。  
整体健康度判断：**开发活跃、问题聚焦明确，但稳定性与体验类问题仍在积累，适合优先处理核心链路体验**。  

---

## 2. 项目进展
今日可确认的进展主要来自 PR 流转，其中最值得关注的是：

- **[#3282 feat(nodes): add policy-gated system exec](https://github.com/sipeed/picoclaw/pull/3282)**  
  该 PR 已关闭，方向是为 node companion 引入**策略门控的系统执行能力**，强调：
  - 仅允许显式 opt-in 的 `system.exec.v1`
  - 禁止 shell 直接执行，改为 canonical argv
  - 在执行前后检查工作目录、环境、超时、输出限制
  - 将能力边界与持久化记录做强约束  
  这类改动对项目的意义是：**增强自动化执行能力的同时，显著提升安全边界**。若最终进入主线，会是对 agent 执行模型的重要补强。

- **[#3280 fix(auth): make browser OAuth login survive real-world callback conditions](https://github.com/sipeed/picoclaw/pull/3280)**  
  该 PR 当前为 open，指向一个高实用价值的修复方向：让浏览器 OAuth 登录在真实环境下更稳健，尤其是远程/无头场景。  
  这类修复若合入，将直接改善**账号接入成功率**，属于对用户路径影响很大的基础能力。

- **[#3279 fix(seahorse): prevent tool-call format leakage into LLM summaries](https://github.com/sipeed/picoclaw/pull/3279)**  
  该 PR 当前为 open，关注的是摘要/总结阶段的格式泄漏问题。  
  它的价值在于提升 **LLM 输出的可读性、可信度和最终用户体验**，属于典型的“看似细节、实际影响很大”的修复。

**整体向前迈进的幅度**：  
今天更像是围绕“**安全执行 + 身份认证 + 输出质量**”三个核心面进行推进。虽然没有新版本，但已有 **1 条能力型 PR 关闭、2 条关键修复 PR 持续推进**，说明项目在持续收敛核心使用链路上的问题。

---

## 3. 社区热点
今日没有出现高评论、高反应的爆款讨论；从数据上看，**活跃度主要来自更新而非争论**。  
当前最值得关注的热点仍是以下几条：

- **[#3281 [BUG] Web UI chat input is very laggy when history has a little bit long](https://github.com/sipeed/picoclaw/issues/3281)**  
  这是今日唯一新增/活跃 Issue，说明用户对 **Web UI 长上下文场景下的输入响应性能** 已经出现明确痛点。

- **[#3280 fix(auth): make browser OAuth login survive real-world callback conditions](https://github.com/sipeed/picoclaw/pull/3280)**  
  反映出用户对 **OAuth 登录流程可靠性** 的现实诉求，尤其是远程、无头、回调链路复杂的场景。

- **[#3279 fix(seahorse): prevent tool-call format leakage into LLM summaries](https://github.com/sipeed/picoclaw/pull/3279)**  
  说明用户/维护者对 **LLM 生成内容的格式正确性** 很敏感，尤其是工具调用痕迹不应污染面向用户的文本。

- **[#3282 feat(nodes): add policy-gated system exec](https://github.com/sipeed/picoclaw/pull/3282)**  
  代表社区对 **自动化执行能力** 有需求，但同时也明显要求“可控、可审计、可限制”。

**背后诉求总结**：  
社区关注点并不在“更多功能”，而是更偏向于：  
1) 交互不卡顿，2) 登录更稳，3) 输出更干净，4) 执行更安全。  
这说明 PicoClaw 已进入“**体验与可靠性驱动**”阶段。

---

## 4. Bug 与稳定性
按影响面与严重度排序，今日主要问题如下：

### 1) Web UI 长历史后输入极度卡顿
- **Issue**: [#3281 [BUG] Web UI chat input is very laggy when history has a little bit long](https://github.com/sipeed/picoclaw/issues/3281)
- **严重程度**：高  
- **影响**：核心聊天输入交互退化，直接影响可用性
- **现状**：**未见明确 fix PR**
- **判断**：这是典型的前端性能/渲染退化问题，如果会随着历史长度增长而恶化，优先级应高于一般功能优化。

### 2) 浏览器 OAuth 回调在真实环境下不稳定
- **PR**: [#3280 fix(auth): make browser OAuth login survive real-world callback conditions](https://github.com/sipeed/picoclaw/pull/3280)
- **严重程度**：高
- **影响**：登录流程失败会直接阻断使用
- **现状**：**已有修复 PR，但仍处 open**
- **判断**：从描述看属于“用户已经完成授权，但流程仍可能失败”的问题，体验成本很高，且在远程/无头环境里更容易复现。

### 3) LLM 摘要中混入 tool-call 格式
- **PR**: [#3279 fix(seahorse): prevent tool-call format leakage into LLM summaries](https://github.com/sipeed/picoclaw/pull/3279)
- **严重程度**：中
- **影响**：内容质量、可读性、用户信任
- **现状**：**已有修复 PR，但仍处 open**
- **判断**：不是功能崩溃，但会明显拉低生成结果的专业度，属于“稳定性+产品体验”问题。

### 4) System exec 能力的安全边界收紧
- **PR**: [#3282 feat(nodes): add policy-gated system exec](https://github.com/sipeed/picoclaw/pull/3282)
- **严重程度**：中-高
- **影响**：直接涉及执行系统命令的安全与可控性
- **现状**：**PR 已关闭**
- **判断**：若该能力后续继续推进，应严格关注权限、审计和默认关闭策略。

---

## 5. 功能请求与路线图信号
今日可见的“功能诉求”并不多，但信号很清楚：

- **[#3282 feat(nodes): add policy-gated system exec](https://github.com/sipeed/picoclaw/pull/3282)**  
  这是最强的路线图信号之一：用户/开发者希望 PicoClaw 具备更强的**本地执行与自动化能力**，但必须带有严格政策控制。  
  这类功能如果继续推进，预计会被归入下一阶段的“**安全自动化**”方向。

- **[#3280 fix(auth): make browser OAuth login survive real-world callback conditions](https://github.com/sipeed/picoclaw/pull/3280)**  
  虽然是修复 PR，但它反映的是一个长期功能诉求：**登录必须适应真实世界网络/浏览器/远程环境**。  
  这通常会被纳入下一轮稳定性优化或 release 候选。

- **[#3279 fix(seahorse): prevent tool-call format leakage into LLM summaries](https://github.com/sipeed/picoclaw/pull/3279)**  
  体现了用户对 **输出洁净度** 的需求，这类修复常常会成为“默认体验”的一部分，后续很可能进入主线。

**路线图判断**：  
如果要推测下一版本的重点，最可能是：  
1) 登录链路修复，  
2) UI/摘要质量修复，  
3) 安全可控的执行能力增强。  

---

## 6. 用户反馈摘要
从今日 Issue/PR 描述中，可以提炼出几类真实用户痛点：

- **长会话导致交互卡顿**
  - 来源：[#3281](https://github.com/sipeed/picoclaw/issues/3281)
  - 反馈本质：用户在长上下文中仍需要持续输入，但输入框响应变慢，说明前端性能或状态管理存在瓶颈。
  - 场景：Web UI 中持续对话、长历史会话编辑。

- **OAuth 登录对现实环境不够鲁棒**
  - 来源：[#3280](https://github.com/sipeed/picoclaw/pull/3280)
  - 反馈本质：用户在 headless/remote 环境中不应因为回调细节失败而重来。
  - 场景：远程服务器、无头浏览器、非标准回调路径。

- **LLM 输出不应混入内部 tool-call 结构**
  - 来源：[#3279](https://github.com/sipeed/picoclaw/pull/3279)
  - 反馈本质：用户希望看到的是自然语言摘要，而不是内部协议痕迹。
  - 场景：总结、回放、对话归档、给最终用户阅读的内容。

- **自动化执行能力有需求，但必须有安全边界**
  - 来源：[#3282](https://github.com/sipeed/picoclaw/pull/3282)
  - 反馈本质：用户希望 agent 更“能干活”，但前提是可控、可审计、可限制。
  - 场景：本地命令执行、工具链编排、受限环境自动化。

---

## 7. 待处理积压
根据当前数据，**没有明显的长期未响应积压项**：今日所有新增或活跃条目都集中在 2026-07-21，说明它们仍处于新鲜讨论期。  
不过，维护者仍应优先关注以下 open 项，因为它们触及核心使用路径：

- **[#3281 Web UI 输入卡顿](https://github.com/sipeed/picoclaw/issues/3281)**：直接影响日常交互，建议尽快确认性能瓶颈来源。
- **[#3280 OAuth 回调健壮性修复](https://github.com/sipeed/picoclaw/pull/3280)**：登录是入口能力，应该高优先级 review。
- **[#3279 Summary 格式泄漏修复](https://github.com/sipeed/picoclaw/pull/3279)**：影响输出质量，属于高可见度问题。

**提醒**：虽然当前没有“长期积压”的证据，但这三项都属于“用户一上线就能感知”的问题，建议不要让它们在 review 队列里停留过久。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发群的简版周报口吻**，或  
2. **适合内部管理层阅读的更正式版本**。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

以下为 **NanoClaw（2026-07-22）项目动态日报**，基于过去 24 小时的 GitHub 数据整理。

---

## 1) 今日速览
**项目链接：** https://github.com/qwibitai/nanoclaw

过去 24 小时内，NanoClaw 的更新主要集中在 **Pull Request 层面**：共有 **6 条 PR 活动**，其中 **2 条已关闭**、**4 条仍待处理**；**Issues 无新增/活跃/关闭**，**无新版本发布**。这说明项目当前处于“**修复与收敛**”阶段，而不是快速扩张阶段。  
从主题看，今日 PR 涉及 **OneCLI 路由兼容、WhatsApp 媒体处理、Telegram 消息安全、Postgres 安装冲突** 等问题，说明项目仍在持续打磨核心可用性。  
整体活跃度可评估为 **中低强度、偏维护型**：开发没有停，但社区问题讨论并不活跃，更多是通过 PR 推进修复与技能补充。  
健康度上看，**没有新增 Issues** 是积极信号，但也意味着用户反馈输入不足，短期内可能不利于优先级判断。

---

## 2) 项目进展
**项目链接：** https://github.com/qwibitai/nanoclaw/pulls

### 今日已关闭的重要 PR
1. **#3116 [CLOSED] [follows-guidelines] sync pr**  
   链接：https://github.com/qwibitai/nanoclaw/pull/3116  
   说明：属于按贡献规范提交的同步类 PR。虽然从摘要看更像流程性/仓库同步工作，但它反映出项目仍在持续接收标准化贡献。

2. **#3114 [CLOSED] [follows-guidelines] Langfuse tracing skill pr**  
   链接：https://github.com/qwibitai/nanoclaw/pull/3114  
   说明：围绕 **Langfuse tracing** 的 skill 能力补充，表明项目在 **观测、追踪、AI workflow 可视化** 方向继续扩展。

### 今日仍在推进的重要 PR
- **#3115 [OPEN] fix(onecli): block legacy Gmail API routes**  
  https://github.com/qwibitai/nanoclaw/pull/3115  
  这是今日最具系统影响力的修复之一，直接关系到 **OneCLI 的流量拦截策略** 是否能覆盖旧 Gmail 路由。

- **#3113 [OPEN] fix(whatsapp): stage inbound media where the container can read it**  
  https://github.com/qwibitai/nanoclaw/pull/3113  
  面向 WhatsApp 媒体接入链路，聚焦容器读取权限与入站媒体落盘位置。

- **#3112 [OPEN] docs(claude): note OneCLI/system-Postgres port collision and fix**  
  https://github.com/qwibitai/nanoclaw/pull/3112  
  这是安装/部署层面的稳定性说明，聚焦 **5432 端口冲突**。

- **#3111 [OPEN] Protect URLs from Telegram legacy-Markdown delimiter stripping**  
  https://github.com/qwibitai/nanoclaw/pull/3111  
  聚焦 Telegram 旧 Markdown 解析下的 URL 丢失问题，属于高可见度消息可靠性修复。

### 整体推进判断
今日共 **6 条 PR 事件**，其中 **2 条关闭、4 条在途**，说明仓库在持续消化修复和技能类贡献。  
从功能面看，项目向前推进主要体现在两条线：
- **核心连接器/路由稳定性修复**
- **AI 工具/追踪能力补强**

---

## 3) 社区热点
**项目链接：** https://github.com/qwibitai/nanoclaw/pulls  
**Issues 链接：** https://github.com/qwibitai/nanoclaw/issues

> 说明：今日 **Issues 无更新**，且 PR 数据未提供评论数/反应数，因此无法从“互动量”精确判断热点；以下热点基于 **变更影响面** 与 **当前状态（Open/Closed）** 综合判断。

### 热点 PR 1：OneCLI legacy Gmail 路由拦截
- **#3115** https://github.com/qwibitai/nanoclaw/pull/3115  
- 背后诉求：用户希望 Gmail 流量拦截规则对 **legacy API 路径** 也同样生效，避免策略失效。
- 热点原因：直接影响 **企业网络策略一致性**，且涉及“默认规则是否覆盖全路径”的系统可信度。

### 热点 PR 2：WhatsApp 入站媒体可读性修复
- **#3113** https://github.com/qwibitai/nanoclaw/pull/3113  
- 背后诉求：容器内任务需要能稳定读取入站媒体，属于 **消息/附件链路可靠性** 问题。
- 热点原因：这是典型的“能不能用”的问题，用户体感强。

### 热点 PR 3：Telegram 旧 Markdown 下 URL 被剥离
- **#3111** https://github.com/qwibitai/nanoclaw/pull/3111  
- 背后诉求：防止包含下划线的 URL 在旧 Markdown 解析中被破坏，避免消息悄悄丢失。
- 热点原因：属于 **隐蔽但高损失** 的消息投递问题，容易影响自动化通知可信度。

### 热点 PR 4：OneCLI/Postgres 端口冲突文档
- **#3112** https://github.com/qwibitai/nanoclaw/pull/3112  
- 背后诉求：降低安装时与本机 PostgreSQL 的端口冲突概率。
- 热点原因：虽然当前是文档说明，但它反映了 **安装体验痛点**，通常是新用户最先遇到的障碍。

---

## 4) Bug 与稳定性
**项目链接：** https://github.com/qwibitai/nanoclaw/issues  
**相关 PR 链接：** 见下方各项

今日没有 Issues 侧的显式 Bug 报告，因此以下按 PR 体现出的稳定性问题排序：

### 高严重度
1. **Gmail legacy API 路由可能绕过 OneCLI 拦截规则**  
   PR：#3115 https://github.com/qwibitai/nanoclaw/pull/3115  
   影响：策略不完整会导致 **安全/合规规则失效**。  
   Fix 状态：**已有修复 PR（Open）**

2. **WhatsApp 入站媒体容器不可读**  
   PR：#3113 https://github.com/qwibitai/nanoclaw/pull/3113  
   影响：可能导致 **附件/媒体处理失败**，属于核心消息链路风险。  
   Fix 状态：**已有修复 PR（Open）**

### 中严重度
3. **Telegram legacy Markdown 对带下划线 URL 的破坏**  
   PR：#3111 https://github.com/qwibitai/nanoclaw/pull/3111  
   影响：消息可能在三次重试后仍失败，属于 **消息投递可用性问题**。  
   Fix 状态：**已有修复 PR（Open）**

4. **OneCLI 安装时 Postgres 端口 5432 冲突**  
   PR：#3112 https://github.com/qwibitai/nanoclaw/pull/3112  
   影响：安装阻塞、首装失败，主要影响 **新用户上手体验**。  
   Fix 状态：**当前为文档修正，尚非代码级修复**

### 低严重度
5. **sync / tracing skill 类变更**  
   PR：#3116 https://github.com/qwibitai/nanoclaw/pull/3116  
   PR：#3114 https://github.com/qwibitai/nanoclaw/pull/3114  
   影响：偏能力补充，不是稳定性故障。  
   Fix 状态：不适用

---

## 5) 功能请求与路线图信号
**项目链接：** https://github.com/qwibitai/nanoclaw/pulls

今日 **未见新的 Issues 功能请求**，因此路线图信号主要来自 PR 方向：

### 明显可纳入下一版本的信号
- **OneCLI 路由与策略完善**  
  PR #3115：https://github.com/qwibitai/nanoclaw/pull/3115  
  这类修复通常优先级高，且容易被纳入下一个稳定版本。

- **WhatsApp 消息/媒体链路稳定性**  
  PR #3113：https://github.com/qwibitai/nanoclaw/pull/3113  
  如果通过验证，建议作为下个版本的重点修复之一。

- **Telegram 消息安全与兼容性**  
  PR #3111：https://github.com/qwibitai/nanoclaw/pull/3111  
  属于用户可感知较强的可靠性修复，适合合并进近期待发布版本。

### 更偏能力扩展的信号
- **Langfuse tracing skill**  
  PR #3114：https://github.com/qwibitai/nanoclaw/pull/3114  
  表明项目对 **可观测性、追踪能力、AI 工作流分析** 有继续投入的意图。

- **sync pr**  
  PR #3116：https://github.com/qwibitai/nanoclaw/pull/3116  
  更像仓库维护/同步动作，反映出贡献流程仍在运转。

### 路线图判断
如果后续进入版本整理，**优先级更高的候选项**大概率会是：
1. #3115 Gmail 路由拦截
2. #3113 WhatsApp 媒体可读性
3. #3111 Telegram URL 兼容性
4. #3112 安装冲突说明/修复

---

## 6) 用户反馈摘要
**项目 Issues 页：** https://github.com/qwibitai/nanoclaw/issues

今日 **Issues 为空**，因此没有可直接引用的评论或讨论内容，**无法从 Issues 评论中提炼真实用户原声反馈**。  
不过，从 PR 主题可以反推用户当前最关心的使用场景与痛点：

- **企业/自动化代理的路由拦截一致性**：Gmail legacy 路由覆盖是否完整
- **多模态消息处理稳定性**：WhatsApp 入站媒体能否被容器读取
- **消息投递可靠性**：Telegram Markdown 兼容性是否会导致消息静默丢失
- **首次安装体验**：OneCLI 与本机 PostgreSQL 的端口冲突是否足够友好

当前数据中**看不到明显的满意/不满意反馈样本**，这说明项目在“社区表达层”较弱，建议后续加强 issue 模板或用户回访机制。

---

## 7) 待处理积压
**项目链接：** https://github.com/qwibitai/nanoclaw/pulls

当前数据里**没有长期未响应的历史 Issue/PR 列表**，因此无法确认真正的“积压老单”。  
但从今天的状态看，以下 **4 个 open PR** 是最需要持续关注的待办项：

- **#3115** fix(onecli): block legacy Gmail API routes  
  https://github.com/qwibitai/nanoclaw/pull/3115

- **#3113** fix(whatsapp): stage inbound media where the container can read it  
  https://github.com/qwibitai/nanoclaw/pull/3113

- **#3112** docs(claude): note OneCLI/system-Postgres port collision and fix  
  https://github.com/qwibitai/nanoclaw/pull/3112

- **#3111** Protect URLs from Telegram legacy-Markdown delimiter stripping  
  https://github.com/qwibitai/nanoclaw/pull/3111

### 维护建议
如果维护资源有限，建议优先处理顺序：
1. **#3115**（策略覆盖/安全性）
2. **#3113**（消息媒体链路）
3. **#3111**（消息投递可靠性）
4. **#3112**（安装体验与文档）

---

如需，我还可以把这份日报进一步整理成：
- **适合直接发 Slack/飞书的简版**
- **适合管理层阅读的 KPI 版**
- **适合开源社区周报的长版**

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目动态日报（2026-07-22）

## 1) 今日速览
过去 24 小时，IronClaw 处于**高活跃、强重构**阶段：Issues 更新 10 条、PR 更新 43 条，且新增 1 个 RC 版本，说明项目已经明显进入 **1.0.0 候选版收敛期**。  
今天的工作重心主要集中在 **Reborn 架构重构、权限/调度链路收敛、WebUI 稳定性修复、以及依赖与测试体系清理**。  
从数据看，关闭/合并的 PR 数量（25）高于待合并 PR（18），说明推进效率较好，主干在持续吸收改动。  
整体健康度判断：**活跃度高、工程推进明确，但仍处于“重构密集 + 稳定性补漏”阶段**，短期内应重点关注回归风险与 UX 细节。  

---

## 2) 版本发布
### 新版本：`ironclaw-v1.0.0-rc.1`（2026-07-20）
链接：<https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.0.0-rc.1>

**核心变化**
- 这是 **全新架构的 Release Candidate**，**不是 0.29.x 线上的增量版本**。
- Release Notes 明确说明：这是对 **agent runtime、storage、extension host、web UI** 的**从零重建**。
- `ironclaw` 二进制已切换为**重构后的 CLI**，意味着旧版 monolith 的行为和接口不应默认兼容。

**潜在破坏性变更 / 迁移注意事项**
- 旧版基于 0.29.x 的脚本、自动化、运行方式可能需要重新验证。
- 若外部流程依赖旧 CLI 命令、存储结构、扩展宿主行为或 WebUI 启动逻辑，建议做一次完整回归测试。
- 由于 release notes 在当前数据中被截断，建议重点验证：
  1. 启动与登录流程  
  2. 运行时存储与持久化  
  3. 扩展加载与 OAuth 流程  
  4. WebUI 会话与流式输出  
  5. 与旧版工具链/CI 的兼容性  

---

## 3) 项目进展
今天关闭/合并的核心 PR，明显推进了 **Reborn 架构简化与稳定化**：

- **#6432** [CLOSED] `feat(reborn): witness always-present + §5.2.1 origin→gate matrix + dispatch-through-witness`  
  链接：<https://github.com/nearai/ironclaw/pull/6432>  
  作用：推进 witness 常驻与 dispatch 通过 witness 的链路，属于权限/调度路径的关键里程碑。

- **#6430** [CLOSED] `Remove in-memory ratchet stores`  
  链接：<https://github.com/nearai/ironclaw/pull/6430>  
  作用：把原先的内存型 ratchet 存储迁移到文件系统后端，增强持久化一致性，减少临时状态丢失。

- **#6429** [CLOSED] `Always compile database backends`  
  链接：<https://github.com/nearai/ironclaw/pull/6429>  
  作用：取消 libsql/postgres 的特性开关，让两个后端在主流程里始终编译，减少条件编译造成的分叉和遗漏。

- **#6427** [CLOSED] `Remove advisory runtime idempotency DTO field`  
  链接：<https://github.com/nearai/ironclaw/pull/6427>  
  作用：清理不再需要的 DTO 字段和无效 builder/logging，缩减 host-runtime 接口表面面积。

- **#6396** [CLOSED] `Reborn §5.2.1/§9: witness always-present + dispatch-routes-through-witness`  
  链接：<https://github.com/nearai/ironclaw/issues/6396>  
  作用：虽然是 Issue，但它是今天架构闭环的重要标志，说明前述权限整合工作已继续落地。

**项目整体前进幅度**
- 24 小时内有 **25 个 PR 处于已合并/已关闭状态**，表明主干在持续吸收大规模重构。
- 结合 RC 发布来看，项目已从“功能扩张”进入“**架构收敛 + 兼容性验证 + 稳定性补漏**”阶段。
- 这类节奏通常意味着：短期 PR 数仍会很多，但真正影响下一版发布质量的会是 **架构清理、回归修复、测试覆盖** 三条线。

---

## 4) 社区热点
> 注：当前抓取数据里，Issues 的评论数均为 0，PR 的评论数字段也未提供，因此**没有明显的“高评论/高反应”单项**。以下按“更新活跃度 + 影响面”判断今日热点。

### 热点 1：Reborn 核心权限/调度重构
- **#6434** `Reborn §5.3.2/§9: seal process re-dispatch ...`
  <https://github.com/nearai/ironclaw/issues/6434>
- **#6438** `Seal process redispatch authority`
  <https://github.com/nearai/ironclaw/pull/6438>
- **#6436** `sole-witness dispatch input + HIGH review fixes`
  <https://github.com/nearai/ironclaw/pull/6436>

**背后诉求**
- 目标非常明确：把“无 witness 的 loose dispatch”收拢到“sealed / authorized”模型里。
- 这反映出团队正在消除 runtime 里的权限歧义，提高可审计性与一致性。
- 对用户侧的直接价值是：**更少的隐式行为，更稳定的能力调度**。

### 热点 2：WebUI 体验与稳定性修复
- **#6425** `fix(webui): restore SSE streams across navigation`
  <https://github.com/nearai/ironclaw/pull/6425>
- **#6420** `fix(webui): recover from transient session check failures`
  <https://github.com/nearai/ironclaw/pull/6420>
- **#6419** `fix(webui): surface admin user management failures`
  <https://github.com/nearai/ironclaw/pull/6419>

**背后诉求**
- 用户正在集中反馈“页面跳转、会话检查、管理操作失败无反馈”等典型前端可用性问题。
- 说明产品已进入真实使用期，问题不再只是功能缺失，而是**“故障是否可见、是否可恢复”**。

### 热点 3：测试与 QA 体系
- **#6439** `test(reborn): replay all harvested QA traces with Emulate.dev`
  <https://github.com/nearai/ironclaw/pull/6439>
- **#6422** `test(live-qa): harvest full per-case LLM trace catalog`
  <https://github.com/nearai/ironclaw/pull/6422>

**背后诉求**
- 团队正在把 dogfooding/QA 过程产品化，说明项目在向“可重复验证”演进。
- 这是 RC 阶段非常关键的信号：**越接近发布，越依赖回放与 trace 级测试保障**。

---

## 5) Bug 与稳定性
按严重程度排序：

### 高：图像附件无法被 `read_file` 处理
- **#6424** `[bug_bash_P2] Agent read_file tool fails on image attachments (PNG)`
  <https://github.com/nearai/ironclaw/issues/6424>
- 影响：用户上传图片后，agent 能保存文件但无法通过文本读取工具处理，直接阻断多模态工作流。
- 状态：**暂无对应 fix PR 出现在当前数据中**。
- 影响面：高，属于明显的产品能力缺口。

### 高：会话检查失败后静默落入匿名 scope
- **#6417** `Session check failures silently leave the app in anonymous scope`
  <https://github.com/nearai/ironclaw/issues/6417>
- 对应 fix PR：**#6420**
  <https://github.com/nearai/ironclaw/pull/6420>
- 影响：网络/服务临时故障时，应用看似“正常加载”，但身份状态已异常，容易造成用户误判。
- 风险：高，涉及认证一致性与故障恢复体验。

### 中高：Admin 管理操作失败无反馈
- **#6416** `Admin user management actions fail without feedback`
  <https://github.com/nearai/ironclaw/issues/6416>
- 对应 fix PR：**#6419**
  <https://github.com/nearai/ironclaw/pull/6419>
- 影响：角色变更、停用、删除等关键管理动作失败时，UI 不提示原因，容易造成误操作和运维困扰。
- 风险：中高，属于管理面稳定性问题。

### 中：扩展配置/OAuth 文本未本地化
- **#6418** `Extension configuration and OAuth flows contain hard-coded English text`
  <https://github.com/nearai/ironclaw/issues/6418>
- 对应 fix PR：**#6421**
  <https://github.com/nearai/ironclaw/pull/6421>
- 影响：非英语环境下的错误信息不一致，降低国际化体验与可理解性。
- 风险：中，偏 UX/国际化，但对全球化部署很关键。

### 中：主分支 CI 失败
- **#6423** `Fix main branch CI failures`
  <https://github.com/nearai/ironclaw/issues/6423>
- 状态：**已关闭**
  <https://github.com/nearai/ironclaw/issues/6423>
- 解读：表明 CI 稳定性问题已有处理，属于正面信号。
- 风险：如果类似问题反复出现，会影响 RC 质量门槛。

---

## 6) 功能请求与路线图信号
### 功能请求 1：独立的 Custom Instructions / Master Prompt 区域
- **#6433** `[enhancement] Feature: Dedicated custom instructions / master prompt section`
  <https://github.com/nearai/ironclaw/issues/6433>

**路线图判断**
- 这是典型的“个人 AI 助手产品化”诉求：用户希望有持久、明确、可配置的个性化指令入口。
- 从用户价值看，优先级不低，尤其适合在 Reborn WebUI 上补齐。
- 若后续 UI 资源允许，这个需求**很可能进入下一版本或 RC 后半段**。

### 功能请求 2：多轮 QA trace 回放与 live QA 体系
- **#6439** `test(reborn): replay all harvested QA traces with Emulate.dev`
  <https://github.com/nearai/ironclaw/pull/6439>
- **#6422** `test(live-qa): harvest full per-case LLM trace catalog`
  <https://github.com/nearai/ironclaw/pull/6422>

**路线图判断**
- 虽然不是面向终端用户的功能，但它直接影响下一版质量。
- 说明团队非常重视：**可回放、可复现、可定位**，这是发布前的重要基础设施。

### 功能请求 3：更稳健的连接测试与失败闭环
- **#6426** `fix(composition): fail closed on unreachable endpoint in test_connection`
  <https://github.com/nearai/ironclaw/pull/6426>

**路线图判断**
- 这类问题通常会被快速吸收，因为它直接影响“首次接入成功率”和“错误判断准确率”。
- 对 onboarding 和 provider 配置流程很关键。

---

## 7) 用户反馈摘要
从今天的 Issues/PR 主题看，用户真实痛点主要集中在以下几类：

1. **多模态输入链路不完整**
   - 代表：**#6424**
   - 用户场景：上传图片后希望 agent 能读取、分析，而不是只会“存下来但读不了”。
   - 反馈含义：用户已经把 IronClaw 当作工作助手使用，期待其具备基础多模态处理能力。
   - 链接：<https://github.com/nearai/ironclaw/issues/6424>

2. **失败不能静默，必须可见、可恢复**
   - 代表：**#6417、#6416、#6420、#6419**
   - 用户场景：登录会话、管理员操作、网络波动都属于真实日常。
   - 反馈含义：用户对“错误提示不明确、状态不一致、无法重试”容忍度较低。
   - 链接：
     - <https://github.com/nearai/ironclaw/issues/6417>
     - <https://github.com/nearai/ironclaw/issues/6416>

3. **国际化与本地化体验仍需补齐**
   - 代表：**#6418、#6421**
   - 用户场景：扩展配置和 OAuth 是高频入口，错误信息必须符合本地语言。
   - 反馈含义：用户并不只要“能用”，还要“看得懂、信得过”。
   - 链接：<https://github.com/nearai/ironclaw/issues/6418>

4. **个性化和长期上下文配置需求上升**
   - 代表：**#6433**
   - 用户场景：希望把偏好、风格、行为约束固定成 master prompt，而不是每次重复输入。
   - 反馈含义：IronClaw 的使用方式正向“长期陪伴型助手”演进。
   - 链接：<https://github.com/nearai/ironclaw/issues/6433>

---

## 8) 待处理积压
> 说明：当前数据中几乎所有问题都创建于 2026-07-21，**尚未出现明显“长期未响应”的陈旧项**。因此这里列出的是**当前最值得优先跟进的高优先级未闭环项**，供维护者排期。

### 高优先级待跟进 Issues
- **#6434** process re-dispatch authority 收口问题  
  <https://github.com/nearai/ironclaw/issues/6434>
- **#6433** custom instructions / master prompt  
  <https://github.com/nearai/ironclaw/issues/6433>
- **#6424** 图片附件读取失败  
  <https://github.com/nearai/ironclaw/issues/6424>
- **#6417** session check 失败后匿名化静默  
  <https://github.com/nearai/ironclaw/issues/6417>
- **#6416** admin 操作失败无反馈  
  <https://github.com/nearai/ironclaw/issues/6416>
- **#6418** OAuth/extension 错误文本未本地化  
  <https://github.com/nearai/ironclaw/issues/6418>
- **#6394 / #6393** dogfooding & QA bug fixing epic  
  <https://github.com/nearai/ironclaw/issues/6394>  
  <https://github.com/nearai/ironclaw/issues/6393>

### 高优先级待跟进 PR
- **#6442** runtime store graph selection  
  <https://github.com/nearai/ironclaw/pull/6442>
- **#6441** ProductSurface boundary 重命名与过渡  
  <https://github.com/nearai/ironclaw/pull/6441>
- **#6438** seal process redispatch authority  
  <https://github.com/nearai/ironclaw/pull/6438>
- **#6436** witness dispatch input + review fixes  
  <https://github.com/nearai/ironclaw/pull/6436>
- **#6425** WebUI SSE 跨导航恢复  
  <https://github.com/nearai/ironclaw/pull/6425>
- **#6420 / #6419 / #6421** 一组 WebUI 稳定性与本地化修复  
  <https://github.com/nearai/ironclaw/pull/6420>  
  <https://github.com/nearai/ironclaw/pull/6419>  
  <https://github.com/nearai/ironclaw/pull/6421>

---

## 总体判断
IronClaw 今天的状态可以概括为：**“RC 发布后进入强收敛期，核心架构持续重构，产品可用性补丁并行推进”**。  
这类节奏对开源 AI 智能体项目是健康的：一方面说明项目已经具备较强的迭代能力，另一方面也意味着维护者需要重点盯住 **回归、会话稳定性、国际化、以及多模态输入链路**，避免在 1.0 候选阶段积累体验债。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 项目动态日报（2026-07-22）

## 1. 今日速览
过去 24 小时，LobsterAI 的社区侧整体偏静：**Issues 无新增/活跃更新，且没有新版本发布**。  
但代码侧仍然保持推进，**6 个 PR 发生更新，其中 4 个已处理（关闭/合并）**，覆盖 renderer、cowork、artifacts、openclaw 等模块。  
从变更主题看，今天的重心主要在**体验细节修复、分享/权限流程优化、协作注释状态一致性**以及**模型能力与附件行为对齐**。  
综合判断，项目当前属于**“讨论低活跃、开发中等活跃、维护质量偏稳”**的状态，健康度较好。

## 2. 版本发布
**今日无新版本发布。**  
- Releases：无  
- 版本更新链接：<https://github.com/netease-youdao/LobsterAI/releases>

## 3. 项目进展
今日已处理的 PR 主要集中在“稳定性修复 + 体验流程打磨”两类：

- [PR #2372](https://github.com/netease-youdao/LobsterAI/pull/2372) — **Fix/openclaw token proxy sse truncation**  
  修复 token proxy 的 SSE 截断问题，属于影响流式输出完整性的稳定性修复，优先级较高。

- [PR #2371](https://github.com/netease-youdao/LobsterAI/pull/2371) — **完善浏览器注释内容与会话状态**  
  强化协作标注的状态同步，解决“草稿清空后会话残留”“注释内容展示不完整”等问题，提升协作链路一致性。

- [PR #2370](https://github.com/netease-youdao/LobsterAI/pull/2370) — **统一分享与部署订阅拦截弹窗**  
  将文件分享与本地服务部署的订阅门槛提示统一起来，减少分支逻辑和提示割裂，利于后续维护。

- [PR #2369](https://github.com/netease-youdao/LobsterAI/pull/2369) — **优化分享访问权限提交流程**  
  改进分享创建/更新权限的交互，避免弹窗打开即触发创建，属于明显的流程优化。

**整体推进判断：**  
今天的合入/关闭 PR 没有带来“新大功能”，但显著推进了**权限体系、分享流程、协作注释、流式输出稳定性**四个核心体验面向。  
从项目成熟度看，这种“高频修边角、修流程、修一致性”的节奏，通常意味着产品正在向**可用性和稳定性收敛**。

## 4. 社区热点
**今日没有形成明显的社区热点。**  
原因是：  
- Issues 今日更新为 **0**  
- 已列出的 PR **评论数均为 0**，👍 也均为 0  
- 因此没有“围绕某个话题持续讨论”的信号

不过，以下两个 PR 具备较强的潜在关注度，后续可能更容易引发用户反馈：

- [PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374) — **永久隐藏侧边栏广告横幅**  
  这是直接面向用户体验的开关类需求，通常会牵动“界面是否可控”“是否打扰使用”等诉求。

- [PR #2373](https://github.com/netease-youdao/LobsterAI/pull/2373) — **模型能力与图片附件同步**  
  这是多模态场景里的正确性问题，容易引发“为什么图片还在但模型不支持”的使用困惑。

## 5. Bug 与稳定性
今日没有新增 bug issue，但从 PR 可识别出几类已被处理的稳定性问题，按潜在影响排序如下：

1. [PR #2372](https://github.com/netease-youdao/LobsterAI/pull/2372) — **SSE 截断问题**  
   - 严重性：**高**  
   - 影响：流式输出可能被截断，直接影响回答完整性与用户感知  
   - 是否已有 fix PR：**是**

2. [PR #2373](https://github.com/netease-youdao/LobsterAI/pull/2373) — **图片附件与模型 vision 能力不同步**  
   - 严重性：**中高**  
   - 影响：切换到非视觉模型后仍可能发送过期附件数据，容易造成错误输入  
   - 是否已有 fix PR：**是**

3. [PR #2371](https://github.com/netease-youdao/LobsterAI/pull/2371) — **浏览器注释会话状态残留**  
   - 严重性：**中**  
   - 影响：标注会话与页面状态可能不一致，影响协作编辑体验  
   - 是否已有 fix PR：**是**

补充来看，[PR #2370](https://github.com/netease-youdao/LobsterAI/pull/2370) 和 [PR #2369](https://github.com/netease-youdao/LobsterAI/pull/2369) 更偏向**权限/流程稳定性**，虽不属于传统 bug，但对降低误操作和提升一致性很关键。

## 6. 功能请求与路线图信号
今日最明确的功能需求信号来自以下几项：

- [Issue #2342](https://github.com/netease-youdao/LobsterAI/issues/2342) / [PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374) — **永久隐藏侧边栏广告横幅**  
  这类需求说明用户对“界面可控性”有明确诉求，属于高概率会进入正式版本的体验增强项。

- [PR #2373](https://github.com/netease-youdao/LobsterAI/pull/2373) — **模型切换时自动对齐附件能力**  
  反映出产品正在补齐多模型工作流中的一致性问题，属于很典型的下一阶段优化方向。

- [PR #2370](https://github.com/netease-youdao/LobsterAI/pull/2370) / [PR #2369](https://github.com/netease-youdao/LobsterAI/pull/2369) — **分享/部署权限与订阅门槛流程统一**  
  显示项目可能会继续强化**权限控制、订阅提示和访问门槛**相关能力。

**路线图判断：**  
如果这些 PR 顺利合入，下一版本大概率会围绕三条主线展开：  
1) **更可控的界面体验**  
2) **更稳的多模态/附件行为**  
3) **更统一的分享与权限流程**

## 7. 用户反馈摘要
今日 **没有可用的 Issues 评论数据**，因此无法从“评论原文”中提炼新的用户反馈。  
但从本日 PR 反映出的真实诉求，可以归纳出以下用户痛点与使用场景：

- [Issue #2342](https://github.com/netease-youdao/LobsterAI/issues/2342) / [PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374)  
  用户不希望广告横幅反复打扰工作流，说明其使用场景偏高频、重沉浸。

- [PR #2373](https://github.com/netease-youdao/LobsterAI/pull/2373)  
  用户在多模型切换中需要“附件行为自动正确”，反映出对模型能力边界和输入一致性要求较高。

- [PR #2370](https://github.com/netease-youdao/LobsterAI/pull/2370) / [PR #2369](https://github.com/netease-youdao/LobsterAI/pull/2369)  
  用户在分享、部署、订阅等流程中需要更清晰的门槛提示，说明当前流程可能存在理解成本或误触风险。

- [PR #2371](https://github.com/netease-youdao/LobsterAI/pull/2371)  
  协作标注用户对会话状态一致性较敏感，尤其在“草稿清空”“页面残留状态”这类细节上体验要求高。

## 8. 待处理积压
**长期未响应的重要 Issue：暂无。**  
今日 Issues 更新为 0，未见高龄未处理问题暴露。

当前需要维护者关注的“短期积压”主要是 2 个开放 PR：

- [PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374) — 永久隐藏侧边栏广告横幅  
  - 状态：OPEN  
  - 价值：直接提升界面控制感，用户感知强

- [PR #2373](https://github.com/netease-youdao/LobsterAI/pull/2373) — 图片附件与模型能力同步  
  - 状态：OPEN  
  - 价值：多模态正确性修复，建议优先审查

**建议：** 若维护资源有限，优先处理 [PR #2373](https://github.com/netease-youdao/LobsterAI/pull/2373)（涉及输入正确性）和 [PR #2374](https://github.com/netease-youdao/LobsterAI/pull/2374)（影响显著的 UI 控制项）。

--- 

如果你愿意，我也可以把这份日报进一步整理成**“适合发到团队周报/飞书公告”的精简版**。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyagi">TinyAGI/tinyagi</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-07-22）

## 1. 今日速览
今日 Moltis 的仓库活动整体偏低，过去 24 小时内没有新的 Issues 变动，也没有新版本发布，说明项目在用户侧与维护侧都处于相对平稳状态。  
唯一的新增动态是一条依赖更新 PR，属于自动化维护性质，未体现出明显的功能开发推进。  
从健康度看，当前没有暴露新的稳定性问题或社区争议，项目短期内风险较低。  
但从活跃度上看，今天更像是“维护日”而非“迭代日”，核心进展仍取决于该 PR 是否后续合并。  
- 仓库链接：<https://github.com/moltis-org/moltis>

---

## 2. 版本发布
今日**无新版本发布**，因此没有新增的 Release 说明、破坏性变更或迁移注意事项。  
- Releases 页面：<https://github.com/moltis-org/moltis/releases>

---

## 3. 项目进展
今日没有已合并或已关闭的重要 PR；项目的实质性推进主要体现在一条**待合并的依赖更新 PR** 上：

- [#1161 chore(deps): bump astro from 7.0.9 to 7.1.3 in /docs](https://github.com/moltis-org/moltis/pull/1161)  
  - 作者：dependabot[bot]  
  - 状态：OPEN  
  - 影响范围：`/docs` 目录  
  - 类型：依赖升级（`astro` 7.0.9 → 7.1.3）

这类 PR 的价值主要在于：
- 降低旧依赖带来的兼容性与安全风险；
- 让文档站点构建链路保持更新；
- 为后续文档/站点相关改动减少技术债。

**项目整体向前迈进的幅度：有限。**  
当前没有功能层面的里程碑推进，更多是“保持生态新鲜度”的维护性进展。

---

## 4. 社区热点
今日没有 Issues 更新，也没有可见的高评论、高反应讨论点，因此**没有形成明显的社区热点**。  
唯一相关的公开讨论对象是依赖升级 PR，但其当前未见评论，暂时不构成社区争议或活跃话题。

- 当前活跃 PR：[#1161](https://github.com/moltis-org/moltis/pull/1161)
- Issues 列表：<https://github.com/moltis-org/moltis/issues>

**背后诉求分析：**
- 该 PR 反映的是维护者对文档站点依赖更新的常规诉求；
- 用户侧暂无反馈数据，无法判断是否存在对 Astro 版本或 docs 体验的明确需求。

---

## 5. Bug 与稳定性
今日没有新增 Bug、崩溃、回归或高优先级故障报告。  
按严重程度看，当前**无已知稳定性风险项**需要排序处理。

- 无 Issues 记录：<https://github.com/moltis-org/moltis/issues>
- 当前相关 PR：[#1161](https://github.com/moltis-org/moltis/pull/1161)

**备注：**
- 该 PR 属于依赖升级，不是修复 bug 的 fix PR；
- 但若后续合并，建议在 docs 构建与运行链路上做一次基础回归验证，以避免静态站点构建差异。

---

## 6. 功能请求与路线图信号
今日没有新的 Issues，因此**没有直接可识别的功能需求信号**。  
从公开 PR 来看，当前唯一信号是文档基础设施维护，而不是新功能开发。

- 当前路线图信号参考：[#1161](https://github.com/moltis-org/moltis/pull/1161)
- Issues 页面：<https://github.com/moltis-org/moltis/issues>

**判断：**
- 该 PR 更可能被归类为“发布前维护/依赖卫生”；
- 暂时看不出它会直接指向下一版本的功能主题；
- 若后续出现更多 docs 或前端依赖升级 PR，可能意味着项目正集中处理基础设施升级窗口。

---

## 7. 用户反馈摘要
今日没有 Issues 评论，因此**没有可提炼的真实用户反馈**。  
当前无法从仓库公开数据中识别用户痛点、使用场景变化或满意/不满意点。

- Issues 页面：<https://github.com/moltis-org/moltis/issues>

**结论：**
- 暂无用户反馈样本；
- 只能确认当前社区未在公开 issue 层面表达明显诉求。

---

## 8. 待处理积压
从当前数据看，**没有长期未响应的重要 Issue**，因为今日没有 Issues 记录。  
待处理项主要集中在一个开放中的依赖更新 PR：

- [#1161 chore(deps): bump astro from 7.0.9 to 7.1.3 in /docs](https://github.com/moltis-org/moltis/pull/1161)

**维护建议：**
- 关注该 PR 的 CI / docs 构建结果；
- 若无兼容性问题，建议尽快合并以减少依赖滞后；
- 若存在构建差异，应补充回归验证并记录变更影响。

---

## 总体判断
Moltis 在 2026-07-22 的公开仓库动态表现为**低活跃、低风险、偏维护型**：没有新版本、没有 Issues 波动、没有社区热点，唯一进展是一个文档侧依赖升级 PR。  
这通常意味着项目当前处于稳定维护阶段，短期内健康度尚可，但外部可见的产品演进节奏较慢。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw / QwenPaw 项目动态日报（2026-07-22）

## 1) 今日速览
过去 24 小时内，项目保持**高活跃度**：Issues 更新 15 条、PR 更新 18 条，并且新增了 1 个 Beta 版本发布，说明团队正处在持续迭代与快速收敛阶段。  
从议题分布看，今天的焦点集中在**会话稳定性、模型路由、桌面端体验、性能回归**和**多模态/文档输入**上，属于典型的“功能扩张 + 稳定性修复”并行期。  
PR 侧有 6 个已合并/关闭，覆盖了模型覆盖传递、子代理审批路由、Markdown 链接行为、离线编辑器、插件治理等关键点，说明底层能力仍在持续补强。  
总体判断：项目健康度偏正向，但由于新诉求和回归问题同时增加，**短期内维护压力仍然较高**。  
- 数据源：GitHub 24h 概览（Issues/PR/Release）

---

## 2) 版本发布
### [v2.0.1-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.0.1-beta.1)
本次发布为 **Beta** 版本，当前可见的更新点包括：

1. **Tauri 入口点导入修复**  
   - `fix: use absolute import in Tauri entry point`  
   - 关联 PR：[#6234](https://github.com/agentscope-ai/QwenPaw/pull/6234)

2. **版本号提升到 2.0.1b1**  
   - `chore: bump version to 2.0.1b1`  
   - 关联 PR：[#6266](https://github.com/agentscope-ai/QwenPaw/pull/6266)

3. **memoryspace 稳定性修复**  
   - `fix(memoryspace): catch OSError in _saved_tool_refs ...`  
   - 该条在当前数据中被截断，但方向上属于异常兜底与运行稳定性增强。

### 迁移/验证建议
- 当前发布页未显示明显的破坏性变更说明，但由于这是 **beta**，建议在生产环境之外先做安装与核心流程验证。  
- 尤其关注：
  - Tauri 桌面端启动链路
  - memoryspace / tool refs 相关逻辑
  - 旧会话数据与历史库兼容性  
- 关联的发布验证工单：[#6319](https://github.com/agentscope-ai/QwenPaw/issues/6319)

---

## 3) 项目进展
今天已合并/关闭的 PR，主要推动了以下方向：

### 已合并/关闭的关键 PR
1. **模型覆盖参数在 Console 侧真正生效**  
   - PR：[#6304](https://github.com/agentscope-ai/QwenPaw/pull/6304)  
   - 作用：修复 `model_slot_override` 从 HTTP API 到 model factory 的传递链路，让前端/接口层的模型指定不再“传了但没用”。

2. **子代理审批回路修复**  
   - PR：[#6295](https://github.com/agentscope-ai/QwenPaw/pull/6295)  
   - 作用：让 `spawn_subagent` 的审批请求能够回到 root session 处理，增强多代理协作的一致性。

3. **Markdown 链接在桌面端改为外部打开**  
   - PR：[#6300](https://github.com/agentscope-ai/QwenPaw/pull/6300)  
   - 作用：改善 Tauri/WebView 场景下的链接跳转行为，减少页面被劫持或无响应问题。

4. **Monaco 改为本地 bundle，支持离线编码预览**  
   - PR：[#6291](https://github.com/agentscope-ai/QwenPaw/pull/6291)  
   - 作用：解决离线/隔离环境下无法加载 CDN 资源的问题，对企业内网用户价值较高。

5. **插件市场治理与默认值修正**  
   - PR：[#6313](https://github.com/agentscope-ai/QwenPaw/pull/6313)  
   - 作用：刷新插件工具默认值、校验 `tool_type`、并将缓存预热移出事件循环，偏向稳定性和可维护性提升。

6. **插件市场字段类型调整**  
   - PR：[#6303](https://github.com/agentscope-ai/QwenPaw/pull/6303)  
   - 作用：将 `is_featured` 从 number 调整为 boolean，提升语义清晰度与数据一致性。

### 今日推进的总体价值
这些 PR 共同推动了项目在以下几个维度前进：
- **模型路由更准确**
- **多代理协作更可靠**
- **桌面端体验更顺滑**
- **离线/内网场景更可用**
- **插件/工具治理更稳健**

从工程结果看，今天至少有 **6 个 PR** 完成合并/关闭，属于一次较有分量的“功能收敛 + 稳定性补强”日。

---

## 4) 社区热点
> 说明：当前 Issues 的 👍 反应均为 0，因此“热度”主要由**评论数与讨论深度**体现。

### 1. 文档拖拽上传需求最强
- Issue：[#6297](https://github.com/agentscope-ai/QwenPaw/issues/6297)  
- 评论数：4  
- 核心诉求：希望在对话中直接拖拽上传图片、PDF、Office 文档等常见格式。  
- 背后场景：合同审核、文档问答、材料整理等高频办公需求，且明确提到 Windows 11 当前不可用。  
- 这说明项目用户已经不满足纯文本对话，而是在向**生产力工作流**演进。

### 2. 连接中断与协议异常问题
- Issue：[#6314](https://github.com/agentscope-ai/QwenPaw/issues/6314)  
- 评论数：3  
- 问题：`RemoteProtocolError: peer closed connection without sending complete message body`  
- 背后诉求：用户在排查代理链路、抓包后发现连接是被 QwenPaw 主动关闭，说明对**流式传输稳定性**要求很高。

### 3. 会话历史污染与序列冲突
- Issue：[#6299](https://github.com/agentscope-ai/QwenPaw/issues/6299)  
- 评论数：3  
- 问题：删除会话后历史仍残留，导致 seq 冲突、串会话、刷新空白页、页面无响应等。  
- 这类反馈通常意味着用户已经在真实业务中存放了大量历史数据，对**会话完整性**和**数据恢复能力**非常敏感。

### 4. 性能回归受到关注
- Issue：[#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307)  
- 评论数：2  
- 问题：v2.0 相比 v1.x 每次简单回复多出约 2 秒固定开销。  
- 这类反馈说明项目在架构升级后，用户已经开始做“版本级体验对比”，性能基线正在成为重要门槛。

### 5. 时间戳时区转换错误
- Issue：[#6301](https://github.com/agentscope-ai/QwenPaw/issues/6301)  
- 评论数：2  
- 问题：UTC 容器中的 naive 时间戳被错误当作本地时间处理。  
- 这反映出海外/容器化部署用户对**时间正确性**十分敏感。

### 其他值得关注的热点
- 自定义终端命令需求：[#6308](https://github.com/agentscope-ai/QwenPaw/issues/6308)
- AGENTS.md 预条件规则：[#6321](https://github.com/agentscope-ai/QwenPaw/issues/6321)
- conversation 级模型指定：[#6318](https://github.com/agentscope-ai/QwenPaw/issues/6318)

---

## 5) Bug 与稳定性
按严重程度排序如下：

### 1. 会话数据污染 / 历史库一致性问题
- Issue：[#6299](https://github.com/agentscope-ai/QwenPaw/issues/6299)  
- 严重性：**高**
- 影响：删除会话后仍串入旧上下文、刷新丢失回复、页面空白甚至 CPU 满载。  
- 状态：**已关闭**  
- 是否已有 fix PR：当前数据中**未看到直接对应 PR**，但问题已被关闭，可能由内部修复或其他提交覆盖。

### 2. 简单回复引入固定 2 秒性能回归
- Issue：[#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307)  
- 严重性：**高**
- 影响：v2.0 版本在轻量对话场景下明显慢于 v1.x，属于可感知的体验退化。  
- 状态：**Open**
- 是否已有 fix PR：**未见明确 fix PR**

### 3. 流式/协议中断错误
- Issue：[#6314](https://github.com/agentscope-ai/QwenPaw/issues/6314)  
- 严重性：**中高**
- 影响：`RemoteProtocolError` 可能中断生成流程，影响长链路任务与代理协作。  
- 状态：**已关闭**
- 是否已有 fix PR：**未见明确对应 PR**

### 4. 时区转换错误
- Issue：[#6301](https://github.com/agentscope-ai/QwenPaw/issues/6301)  
- 严重性：**中**
- 影响：消息/会话时间显示偏移，影响审计、回溯与跨时区用户体验。  
- 状态：**Open**
- fix PR：[#6309](https://github.com/agentscope-ai/QwenPaw/pull/6309)  
- 备注：这是今天最明确“问题 → 修复 PR”配对之一。

### 5. 插件市场安装后不可见
- Issue：[#6294](https://github.com/agentscope-ai/QwenPaw/issues/6294)  
- 严重性：**中**
- 影响：安装成功但需刷新页面才能看到技能，造成“成功却无反馈”的错觉。  
- 状态：**Open**
- fix PR：[#6296](https://github.com/agentscope-ai/QwenPaw/pull/6296)

### 6. LaTeX 渲染失败
- Issue：[#6320](https://github.com/agentscope-ai/QwenPaw/issues/6320)  
- 严重性：**中**
- 影响：数学公式不可正确渲染，影响学术/技术场景。  
- 状态：**Open**
- fix PR：**未见**

### 7. 免费模型/连接错误导致执行失败
- Issue：[#6315](https://github.com/agentscope-ai/QwenPaw/issues/6315)  
- 严重性：**中**
- 影响：更新后无法使用 free model，报 `MODEL_EXECUTION_ERROR`。  
- 状态：以 Question 形式提出，但实质上属于可用性问题。  
- fix PR：**未见**

---

## 6) 功能请求与路线图信号
今天出现的功能诉求，已经比较清晰地指向下一阶段路线图：

### 高优先级候选
1. **对话中支持拖拽上传图片/PDF/Office 文档**
- Issue：[#6297](https://github.com/agentscope-ai/QwenPaw/issues/6297)
- 价值判断：非常像下一版的高价值能力，尤其适合办公知识库、合同审核、文档问答。

2. **conversation 级别指定模型**
- Issue：[#6318](https://github.com/agentscope-ai/QwenPaw/issues/6318)
- 路线图信号：与当前“模型绑定在 agent 级别”的设计冲突较小，属于自然演进。
- 相关支撑 PR：[#6304](https://github.com/agentscope-ai/QwenPaw/pull/6304) 已把 `model_slot_override` 的传递链路打通，说明底层能力正在准备中。

3. **agent-type cron jobs 可指定固定模型**
- Issue：[#6316](https://github.com/agentscope-ai/QwenPaw/issues/6316)
- 价值判断：面向自动化任务和稳定执行场景，适合企业级用户。

4. **终端支持自定义命令 + 移动端适配**
- Issue：[#6308](https://github.com/agentscope-ai/QwenPaw/issues/6308)
- 价值判断：如果项目继续向“Agent 工作台”演进，这项会越来越重要。

5. **AGENTS.md 中的前置条件规则**
- Issue：[#6321](https://github.com/agentscope-ai/QwenPaw/issues/6321)
- 价值判断：这是提升 agent 执行可靠性的治理能力，偏中长期路线。

### 更可能进入下一版本的信号
从 PR 活动看，以下方向最像“下一版可落地项”：
- **模型控制精细化**：[#6304](https://github.com/agentscope-ai/QwenPaw/pull/6304)、[#6318](https://github.com/agentscope-ai/QwenPaw/issues/6318)
- **会话与上下文连续性**：[#6323](https://github.com/agentscope-ai/QwenPaw/pull/6323)
- **技能市场与插件体验**：[#6296](https://github.com/agentscope-ai/QwenPaw/pull/6296)
- **离线/企业场景可用性**：[#6291](https://github.com/agentscope-ai/QwenPaw/pull/6291)

---

## 7) 用户反馈摘要
从今天的 Issues 评论和描述中，可以提炼出这些真实痛点：

### 1. 用户已经在把 CoPaw 当“办公生产工具”用
- 典型场景：合同审核、文档处理、知识问答  
- 证据：[#6297](https://github.com/agentscope-ai/QwenPaw/issues/6297)
- 含义：单纯聊天能力已不够，**文件输入/多模态接入**正在成为刚需。

### 2. 用户对“会话不丢、不串、可恢复”极其敏感
- 证据：[#6299](https://github.com/agentscope-ai/QwenPaw/issues/6299)
- 痛点：删除会话后历史污染、刷新后丢失流式内容、上下文串线。
- 含义：项目已进入“数据可信度”阶段，稳定性比炫技更重要。

### 3. 用户开始明显感知版本性能差异
- 证据：[#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307)
- 痛点：v2.0 在简单回复上比 v1.x 慢约 2 秒。
- 含义：架构升级后，性能基线需要被当作核心指标持续监控。

### 4. 用户场景横跨桌面、内网和移动网络
- 证据：[#6300](https://github.com/agentscope-ai/QwenPaw/pull/6300)、[#6291](https://github.com/agentscope-ai/QwenPaw/pull/6291)、[#6322](https://github.com/agentscope-ai/QwenPaw/issues/6322)
- 表现：
  - 桌面端链接跳转问题
  - 离线环境无法加载编辑器
  - 移动网络出现广告跳转
- 含义：用户环境复杂，项目正在从“单一 Web 应用”走向“多环境工作台”。

### 5. 用户对模型选择和自动化精细控制要求更高
- 证据：[#6318](https://github.com/agentscope-ai/QwenPaw/issues/6318)、[#6316](https://github.com/agentscope-ai/QwenPaw/issues/6316)、[#6304](https://github.com/agentscope-ai/QwenPaw/pull/6304)
- 含义：模型不再只是“默认能用”，而是要支持**会话级、任务级、工作流级**配置。

---

## 8) 待处理积压
> 说明：本次快照中未见“长期无响应”的明确老化项，但以下都是**高价值待处理事项**，建议维护者尽快分配 owner 或进入 review。

### 值得优先跟进的 Open 项
1. **文档拖拽上传**
- Issue：[#6297](https://github.com/agentscope-ai/QwenPaw/issues/6297)
- 理由：面向核心办公场景，影响产品扩展方向。

2. **性能回归**
- Issue：[#6307](https://github.com/agentscope-ai/QwenPaw/issues/6307)
- 理由：属于版本体验红线，建议尽快定位是架构开销还是请求编排问题。

3. **LaTeX 渲染失败**
- Issue：[#6320](https://github.com/agentscope-ai/QwenPaw/issues/6320)
- 理由：学术/技术用户高频使用，属于显著可见缺陷。

4. **自定义终端命令**
- Issue：[#6308](https://github.com/agentscope-ai/QwenPaw/issues/6308)
- 理由：如果要强化“Coding 模式”，这是核心能力之一。

5. **conversation 级模型指定**
- Issue：[#6318](https://github.com/agentscope-ai/QwenPaw/issues/6318)
- 理由：和当前模型 override 相关 PR 已有铺垫，适合尽快讨论设计边界。

### 值得继续观察的 Open PR
1. **Scroll 语境压缩与任务连续性**
- PR：[#6323](https://github.com/agentscope-ai/QwenPaw/pull/6323)

2. **Workspace/fork/deny-all gates 加固**
- PR：[#6317](https://github.com/agentscope-ai/QwenPaw/pull/6317)

3. **ToolGuard 安全检查统一**
- PR：[#6311](https://github.com/agentscope-ai/QwenPaw/pull/6311)

4. **移动端/桌面端体验增强类 PR**
- PR：[#6312](https://github.com/agentscope-ai/QwenPaw/pull/6312)、[#6306](https://github.com/agentscope-ai/QwenPaw/pull/6306)

---

### 总结判断
今天的 CoPaw / QwenPaw 呈现出很典型的“**Beta 收敛期**”特征：  
一方面，版本发布与多项 PR 合并说明项目仍在快速推进；另一方面，Issues 中高频出现的会话一致性、性能回归、文档输入与时间显示问题，表明项目正在从“功能可用”走向“可规模化使用”的门槛阶段。  
如果接下来能把 **模型控制精细化、会话稳定性、桌面端可用性** 这三条线继续打通，下一版本的产品完成度会明显提升。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

以下为 **ZeroClaw（zeroclaw-labs/zeroclaw）2026-07-22 项目动态日报**。

## 1. 今日速览
过去 24 小时内，项目保持了**高输入、低落地**的活跃状态：新增/活跃 Issues 9 条、待处理 PR 10 条，但**没有新版本发布，也没有 PR 合并或关闭**。  
议题重心非常集中，主要落在 **安全边界、runtime 行为、配置保存正确性、Windows 兼容性、评测/基础设施扩展** 等核心质量问题上。  
从内容看，今天的活跃度不低，但更多体现为“问题暴露与方案堆叠”，而不是“版本推进与发布交付”。  
整体健康度判断：**开发热度高，稳定性与发布节奏偏紧张**，当前更像是在为下一轮稳定化和功能扩展做集中铺垫。

## 2. 版本发布
今日**无新版本发布**。  

## 3. 项目进展
今日没有已合并/已关闭的 PR，因此**没有直接可量化的交付产出**；但从 10 条开放 PR 看，主线仍在推进，且方向较清晰：

- **远程会话持久化基础设施**：`session-backend foundation` 为后续远程持久化后端打底，属于架构级前置工作。  
  链接：[#9249](https://github.com/zeroclaw-labs/zeroclaw/pull/9249)
- **评测体系增强**：包括 run-history 归档、judge calibration 工具、案例记忆的隔离评分，说明项目在补强 AI 评测闭环与可回放能力。  
  链接：[#9248](https://github.com/zeroclaw-labs/zeroclaw/pull/9248) / [#9245](https://github.com/zeroclaw-labs/zeroclaw/pull/9245) / [#9244](https://github.com/zeroclaw-labs/zeroclaw/pull/9244)
- **安全与 runtime 修复**：围绕 shell、Landlock、模型切换隔离等问题，明显是在补“执行边界”和“跨轮污染”。  
  链接：[#9233](https://github.com/zeroclaw-labs/zeroclaw/pull/9233) / [#9232](https://github.com/zeroclaw-labs/zeroclaw/pull/9232)
- **渠道与文档扩展**：Teams channel、Telegram 文档、web reasoning turn 修复，体现产品外延在继续扩大。  
  链接：[#9241](https://github.com/zeroclaw-labs/zeroclaw/pull/9241) / [#9242](https://github.com/zeroclaw-labs/zeroclaw/pull/9242) / [#9234](https://github.com/zeroclaw-labs/zeroclaw/pull/9234)

**结论**：今天没有“已落地”的进展，但开放 PR 的覆盖面显示项目正在同时推进 **infra、eval、channel、security、config correctness** 五条线，属于高并行开发阶段。

## 4. 社区热点
> 由于提供的数据里，Issue 的评论数/反应数可见，PR 的评论数未明确给出，因此以下以“实际热度 + 风险关注度”综合判断。

- **最受讨论的 Issue：docker runtime 无法执行 shell 命令**  
  评论数 1，是今日唯一明确出现讨论的条目，且直接影响 workflow，属于高优先级阻断问题。  
  链接：[#9231](https://github.com/zeroclaw-labs/zeroclaw/issues/9231)

- **最高风险、最值得社区关注的安全问题：Shell 工具 workspace 边界绕过**  
  虽然当前评论数为 0，但这是 **S0 级数据/安全风险**，通常会迅速吸引维护者和安全敏感用户关注。  
  链接：[#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247)

- **配置系统一致性问题也在形成热点簇**  
  `save_dirty`、`config patch --json`、`config init`、Telegram alias 等一组问题集中暴露，说明用户/开发者对“配置命令是否可预期”非常敏感。  
  链接：[#9240](https://github.com/zeroclaw-labs/zeroclaw/issues/9240) / [#9239](https://github.com/zeroclaw-labs/zeroclaw/issues/9239) / [#9237](https://github.com/zeroclaw-labs/zeroclaw/issues/9237) / [#9236](https://github.com/zeroclaw-labs/zeroclaw/issues/9236)

**热点背后的诉求**：社区最关心的不是“有没有新功能”，而是 **边界安全、配置可靠性、错误输出可机器处理、容器/Windows 兼容性** 这些基础体验是否足够稳。

## 5. Bug 与稳定性
按严重程度排序，今日主要 Bug / 回归如下：

1. **S0 / 高安全风险：Shell 工具 workspace 边界绕过**  
   - 问题：symlink 可绕过 workspace 边界，可能导致越权读写。  
   - 影响：数据泄露、目录污染、潜在安全事故。  
   - 状态：**未见明确 fix PR**。  
   - 链接：[#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247)

2. **S1 / workflow blocked：Docker runtime 无法运行 shell 命令**  
   - 问题：docker runtime 在特定配置下无法执行 shell。  
   - 影响：核心工作流被阻塞。  
   - 状态：**未见明确 fix PR**。  
   - 链接：[#9231](https://github.com/zeroclaw-labs/zeroclaw/issues/9231)

3. **高危依赖安全告警：npm audit failed**  
   - 问题：CI 报告 3 个 high/critical 漏洞。  
   - 影响：供应链风险、发布门槛抬高。  
   - 状态：**未见明确 fix PR**。  
   - 链接：[#9235](https://github.com/zeroclaw-labs/zeroclaw/issues/9235)

4. **配置数据丢失/不一致类问题**
   - `save_dirty` 对带点号的 map key 写入静默失败。  
     链接：[#9240](https://github.com/zeroclaw-labs/zeroclaw/issues/9240)
   - `config patch --json` 仍有路径会输出 plain `anyhow` 错误。  
     链接：[#9239](https://github.com/zeroclaw-labs/zeroclaw/issues/9239)
   - `Config::ensure_map_key_for_path` 失败后残留 phantom alias。  
     链接：[#9237](https://github.com/zeroclaw-labs/zeroclaw/issues/9237)
   - `channels.telegram.<alias>` 写入后次次加载被 salvage 丢弃。  
     链接：[#9236](https://github.com/zeroclaw-labs/zeroclaw/issues/9236)

5. **测试/平台兼容性回归**
   - Windows 上 architecture gate 漏检 `tests/` 文件。  
     链接：[#9238](https://github.com/zeroclaw-labs/zeroclaw/issues/9238)

**已有 fix PR 的迹象**：  
- 配置 alias / map-key 相关问题，**PR #9243** 看起来是直接修复候选，覆盖面与 #9236、#9237 高度相关。  
  链接：[#9243](https://github.com/zeroclaw-labs/zeroclaw/pull/9243)

## 6. 功能请求与路线图信号
今日新增/活跃 PR 显示出几个明确的路线图方向：

- **远程持久化 / 会话后端** 是一个正在成型的架构方向。  
  链接：[#9249](https://github.com/zeroclaw-labs/zeroclaw/pull/9249)

- **评测与治理能力** 正在补齐：历史归档、校准、标签化、验收门禁，说明项目正在把“模型效果验证”产品化。  
  链接：[#9248](https://github.com/zeroclaw-labs/zeroclaw/pull/9248) / [#9245](https://github.com/zeroclaw-labs/zeroclaw/pull/9245)

- **新渠道扩展** 继续推进，尤其是 Teams，这说明 ZeroClaw 正在向企业 IM 场景延伸。  
  链接：[#9241](https://github.com/zeroclaw-labs/zeroclaw/pull/9241)

- **文档与接入体验** 也在跟进，Telegram 指南表明渠道落地的可用性正在补强。  
  链接：[#9242](https://github.com/zeroclaw-labs/zeroclaw/pull/9242)

- **安全与执行隔离** 仍是高优先级路线：Landlock、模型切换隔离、shell 边界问题，都说明项目在收紧执行面。  
  链接：[#9233](https://github.com/zeroclaw-labs/zeroclaw/pull/9233) / [#9232](https://github.com/zeroclaw-labs/zeroclaw/pull/9232) / [#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247)

**判断**：如果进入下一版本，最可能被纳入的是  
1) **安全/稳定性修复**，2) **配置正确性修复**，3) **评测与渠道扩展**。  
这三类内容与当前开放 PR/Issue 的密度最高，路线图信号非常明确。

## 7. 用户反馈摘要
> 说明：当前数据未提供评论正文，因此以下为基于 Issue/PR 摘要提炼的“真实用户痛点”，而非逐条评论原文复述。

用户反馈集中体现为四类痛点：

- **“能不能真的跑起来”**：Docker runtime 不能执行 shell 命令会直接阻断工作流。  
  链接：[#9231](https://github.com/zeroclaw-labs/zeroclaw/issues/9231)

- **“边界要一致、不能越权”**：file tool 有边界，shell tool 却可被 symlink 绕过，用户对安全隔离的一致性期待很高。  
  链接：[#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247)

- **“配置必须可预测”**：静默丢写、alias 丢失、JSON 错误输出不稳定，都会让用户对 CLI 失去信任。  
  链接：[#9240](https://github.com/zeroclaw-labs/zeroclaw/issues/9240) / [#9239](https://github.com/zeroclaw-labs/zeroclaw/issues/9239) / [#9237](https://github.com/zeroclaw-labs/zeroclaw/issues/9237) / [#9236](https://github.com/zeroclaw-labs/zeroclaw/issues/9236)

- **“跨平台要稳”**：Windows 测试门禁失效说明平台兼容性仍有盲区。  
  链接：[#9238](https://github.com/zeroclaw-labs/zeroclaw/issues/9238)

总体上，用户并不是在抱怨“功能少”，而是在追求 **可用、可控、可验证、可迁移** 的基础体验。

## 8. 待处理积压
> 说明：本次数据窗口内的所有 Issue / PR 都是 2026-07-21 新建或更新，**没有证据表明存在长期未响应项**。  
> 但从维护优先级看，以下对象应视为“高风险积压”，建议尽快跟进：

- **安全最高优先级**：Shell workspace 边界绕过  
  链接：[#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247)

- **工作流阻断**：Docker runtime 无法运行 shell 命令  
  链接：[#9231](https://github.com/zeroclaw-labs/zeroclaw/issues/9231)

- **供应链安全**：npm audit failed  
  链接：[#9235](https://github.com/zeroclaw-labs/zeroclaw/issues/9235)

- **配置正确性簇**：静默丢写 / alias 丢失 / JSON 错误输出 / Windows gate  
  链接：[#9240](https://github.com/zeroclaw-labs/zeroclaw/issues/9240) / [#9239](https://github.com/zeroclaw-labs/zeroclaw/issues/9239) / [#9238](https://github.com/zeroclaw-labs/zeroclaw/issues/9238) / [#9237](https://github.com/zeroclaw-labs/zeroclaw/issues/9237) / [#9236](https://github.com/zeroclaw-labs/zeroclaw/issues/9236)

- **尚未落地的关键 PR 堆栈**：评测、channel、runtime 安全、远程持久化  
  链接：[#9249](https://github.com/zeroclaw-labs/zeroclaw/pull/9249) / [#9248](https://github.com/zeroclaw-labs/zeroclaw/pull/9248) / [#9245](https://github.com/zeroclaw-labs/zeroclaw/pull/9245) / [#9244](https://github.com/zeroclaw-labs/zeroclaw/pull/9244) / [#9241](https://github.com/zeroclaw-labs/zeroclaw/pull/9241)

**综合判断**：ZeroClaw 当前处于“**高并行开发 + 高质量修复压力**”阶段；如果能尽快合并安全与配置修复，再推进评测与 channel 扩展，项目健康度会明显改善。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*