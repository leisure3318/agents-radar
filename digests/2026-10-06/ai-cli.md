# AI CLI 工具社区动态日报 2026-10-06

> 生成时间: 2026-10-06 05:23 UTC | 覆盖工具: 9 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [Kimi Code CLI](https://github.com/MoonshotAI/kimi-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/badlogic/pi-mono)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [DeepSeek TUI](https://github.com/Hmbown/DeepSeek-TUI)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具生态横向对比分析报告｜2026-10-06

## 1. 生态全景

当前 AI CLI 工具正从“命令行问答/代码助手”快速演进为 **多 Agent、跨端、可远程控制、可集成企业系统的开发自动化平台**。  
社区反馈高度集中在 **会话可靠性、权限与认证、MCP/插件生态、长上下文压缩、后台任务、跨平台稳定性** 等工程化问题上。  
Claude Code、Codex、Qwen Code、OpenCode 等工具正在加速平台化；Gemini CLI、Pi、DeepSeek TUI 则更聚焦 CLI 交互、模型兼容、运行时稳定性与跨平台细节。  
整体来看，AI CLI 的竞争重点已不只是模型能力，而是 **工具调用安全、状态一致性、错误可观测性、企业集成和长任务可靠执行**。

---

## 2. 各工具活跃度对比

> 注：部分仓库摘要未给出完整 Issue/PR 总数，下表采用“明确给出数量”或“摘要中可见数量”。

| 工具 | 今日 Issues 活跃度 | 今日 PR 活跃度 | Release 情况 | 活跃度判断 |
|---|---:|---:|---|---|
| **Claude Code** | ≥10 个热点 Issue | 0 | v2.1.290、v2.1.291 | Issue 活跃，Release 快速修复会话可靠性 |
| **OpenAI Codex** | ≥10 个热点 Issue | ≥10 个重要 PR | rust-v0.160.1，另有 0.162 alpha | 高活跃，Windows/Dots/会话可靠性快速迭代 |
| **Gemini CLI** | 3 个 Issue | 10 个 PR | v0.64.0 nightly | 中等活跃，重点在测试、终端 UI、认证 |
| **GitHub Copilot CLI** | 9 个 Issue | 0 | v1.0.92、v1.0.92-5、v1.0.93-0、v1.0.93-1 | Release 密集，Issue 集中在 MCP/OAuth 回归 |
| **Kimi Code CLI** | 0 | 0 | 无 | 今日无活动 |
| **OpenCode** | ≥10 个热点 Issue | ≥10 个重要 PR | 无 | 高活跃，V2 稳定性、安全、MCP、Desktop 重点推进 |
| **Pi** | ≥10 个热点 Issue | 9 个 PR | v1.0.3、v1.0.4 | 高活跃，MCP 工具筛选与多模型接入增强 |
| **Qwen Code** | 32 个 Issue | 37 个 PR | v0.25.0，SDK/Desktop 同步 | 今日最活跃，多 Agent 与 Channel 架构快速推进 |
| **DeepSeek TUI** | 6 个 Issue | ≥10 个 PR | 无 | 中高活跃，重点清理超时/挂死/运行时韧性问题 |

---

## 3. 共同关注的功能方向

### 3.1 多 Agent 与后台任务

多个工具都在从单轮 CLI 助手转向持续运行的 Agent 平台。

| 工具 | 具体诉求 |
|---|---|
| **Qwen Code** | v0.25.0 引入 workspace-agent；推进 session-centric multi-agent、Managed Agent、EventTransport、Channel contracts |
| **Claude Code** | hook 中新增 `agentId`，支持区分主代理与子代理权限检查；社区关注 Remote Control、Cowork、spawn_task |
| **Codex** | 用户希望 CLI 后台命令完成后自动唤醒 Codex，支持 watcher/长任务恢复 |
| **OpenCode** | 关注多 Agent 高负载下 submission starvation、工具 timeout、task delegation deadline |
| **Copilot CLI** | 用户要求在 subagentStart hook 暴露 `agentId`，用于父子 Agent 安全策略关联 |
| **DeepSeek TUI** | Runtime API、Automation、approval wait、dynamic tool result 等都在向自动化平台演进 |

**判断：** AI CLI 正在从“交互式工具”转向“可持续运行的本地/远程 Agent runtime”。

---

### 3.2 MCP、插件与扩展生态

MCP 已成为主流 AI CLI 工具的扩展协议，但认证、权限、工具命名和错误可见性仍是痛点。

| 工具 | 具体诉求 |
|---|---|
| **Codex** | 修复 remote stdio MCP Windows 环境变量问题；PR 增加 MCP telemetry |
| **Copilot CLI** | Entra/OAuth/Datadog MCP 接入问题集中爆发；标准 `api://` scope 被拒绝 |
| **OpenCode** | MCP server 名称过长导致工具静默丢弃；请求新增 MCP permission key；OAuth 延迟鉴权修复 |
| **Pi** | v1.0.4 增强 `--tools`/`--exclude-tools` 通配符，新增 `--no-mcp` |
| **DeepSeek TUI** | 讨论 MCP server 启动失败时是否向模型提供上下文提示；OAuth/PKCE 回调窗口需放宽 |
| **Gemini CLI** | 扩展 Gallery 发现机制不透明，影响第三方扩展发布体验 |

**判断：** MCP 正从实验性能力进入生产使用阶段，下一步竞争点是 **权限治理、认证兼容、工具发现和故障解释**。

---

### 3.3 认证、授权与企业集成

认证问题在 Claude Code、Copilot CLI、Codex、Gemini CLI、OpenCode、DeepSeek TUI 中都有体现。

| 工具 | 具体问题 |
|---|---|
| **Claude Code** | 403 Access grant、OAuth refresh、企业 LLM Gateway 自定义 Header 未传递 |
| **Copilot CLI** | Microsoft Entra、Datadog OAuth、access-token-only credentials 刷新 |
| **Codex** | Android/Windows 配对授权循环，ChatGPT 登录模式任务错误 |
| **Gemini CLI** | 重新选择 Google 登录时需清除缓存凭据 |
| **OpenCode** | API 返回已解析 provider 明文凭据，存在安全风险 |
| **DeepSeek TUI** | OAuth/PKCE 浏览器回调窗口 300 秒过短 |
| **Qwen Code** | WeChat Channel 登录 headers 缺失导致 v0.25.0 回归 |

**判断：** 企业级 AI CLI 必须把认证视为核心基础设施，而不是外围功能。

---

### 3.4 长会话、上下文压缩与会话恢复

长会话可靠性是所有成熟 AI CLI 的关键指标。

| 工具 | 具体诉求 |
|---|---|
| **Claude Code** | 修复退出时尾部消息丢失；社区关注 auto-compaction 未经同意、transcript 30 天静默删除 |
| **Codex** | oversized tool-call arguments 可能永久损坏线程；会话隔离错误导致 Linux Desktop 输入发往错误会话 |
| **Copilot CLI** | 自动 compaction 超时；ACP session 不再索引 conversation 和 usage |
| **OpenCode** | 长 session 加载性能、工具 timeout、PTY 无流控导致资源耗尽 |
| **Pi** | prompt cache miss、Durable entry cutoff、Bash 超长输出裁剪 |
| **Qwen Code** | cancellation 后上下文污染、cancelled turn 重入模型上下文 |
| **DeepSeek TUI** | request_user_input、approval、模型请求、Git snapshot 等路径都在补超时边界 |

**判断：** 长会话已经成为 AI CLI 的核心战场，关键能力包括 **可控压缩、可恢复线程、上下文隔离、超时治理和审计保留**。

---

### 3.5 跨平台与桌面端稳定性

Windows、Linux、macOS、TTY/headless、Desktop/Web/TUI 的行为一致性成为高频问题。

| 工具 | 具体问题 |
|---|---|
| **Codex** | Windows Computer Use 捕获超时、sandbox service、安装器校验、远程配对 |
| **Gemini CLI** | Windows 缺少 PowerShell 7 时测试失败；非 TTY/headless 测试失败 |
| **OpenCode** | Windows Desktop 静默退出；TUI diff hunk 跳转；Desktop browser bar 重设计 |
| **Pi** | Nix PATH 覆盖、Windows 盘符大小写、mintty OSC 回复污染 |
| **Claude Code** | Linux PID namespace/procfs mismatch、macOS worktree guard |
| **DeepSeek TUI** | Windows 安全门禁误拦截变量 PID 下的 Stop-Process |
| **Qwen Code** | Web Shell、Hosted Harness、LSP capability、CI/Docker release 稳定性 |

**判断：** AI CLI 已进入真实生产环境，跨平台“边角问题”会直接影响采纳率。

---

## 4. 差异化定位分析

### Claude Code

**定位：** 强调 Claude 原生能力、云端会话、Remote Control、hook/plugin/mod 生态。  
**技术侧重：**

- 会话可靠性
- 权限提示与自动批准
- 多端远程控制
- 安全审查插件
- hook 可观测性

**目标用户：** 深度使用 Claude 进行长会话代码开发、远程任务、企业安全审查的开发者。  
**当前短板：** 认证稳定性、长会话透明度、Desktop/Remote 权限状态一致性。

---

### OpenAI Codex

**定位：** 面向 ChatGPT/Codex 生态的桌面端、CLI、Dots、多设备远程自动化平台。  
**技术侧重：**

- Windows Desktop
- Computer Use
- Dots 设备编排
- partial answer 消息语义
- sandbox 和 session runtime

**目标用户：** 使用 ChatGPT/Codex 进行跨设备、本地/云端混合开发的用户。  
**当前短板：** Windows 稳定性、远程配对、会话隔离、工具参数超限恢复。

---

### Gemini CLI

**定位：** Google Gemini 生态下的轻量 CLI 与扩展平台。  
**技术侧重：**

- 终端 UI 体验
- Google 登录
- VS Code Companion
- 遥测与 OTLP 集成
- 跨平台测试稳定性

**目标用户：** Google/Gemini 用户、CLI 爱好者、扩展开发者、企业可观测性集成用户。  
**当前短板：** 今日社区规模相对较小，扩展发现机制透明度仍不足。

---

### GitHub Copilot CLI

**定位：** GitHub/Copilot 生态中的企业级 CLI Agent，强调 MCP、OAuth、云/本地环境切换。  
**技术侧重：**

- MCP 企业认证
- Entra/OAuth
- `copilot config`
- LSP
- BYOK/air-gapped
- workflow 与 canvas extension

**目标用户：** GitHub 企业用户、Copilot 深度用户、MCP/Entra 集成场景。  
**当前短板：** 快速发布带来的回归、MCP scope/OAuth 兼容性、离线功能 gating。

---

### OpenCode

**定位：** 开源、可扩展、重视本地/多 provider/MCP 的 AI coding workbench。  
**技术侧重：**

- V2 runtime
- Desktop/Web/TUI
- MCP 权限与 OAuth
- 多 provider 模型接入
- 安全合规
- Agent timeout 与资源控制

**目标用户：** 开源生态用户、自托管用户、多模型/本地模型用户、希望深度定制的开发者。  
**当前短板：** V2 边界稳定性、安全暴露面、运行时资源隔离和错误可诊断性。

---

### Pi

**定位：** 多模型、多 provider、高度可脚本化的 coding agent CLI。  
**技术侧重：**

- MCP 工具筛选
- Azure Foundry / Cloudflare / NVIDIA NIM 等 provider 兼容
- Durable 执行
- Nix/Windows/shell 环境一致性
- prompt/tool schema 适配

**目标用户：** 多模型高级用户、企业云模型用户、本地模型/非主流 provider 用户、自动化任务用户。  
**当前短板：** provider 差异适配压力大，跨平台 shell 环境边界复杂。

---

### Qwen Code

**定位：** 快速演进中的多 Agent 开发平台，围绕 Qwen 生态构建 CLI、Desktop、SDK、Channel。  
**技术侧重：**

- workspace-agent
- Managed Agent
- Web Shell
- Channel/WeChat/H5
- Memory Agent
- Session-centric collaboration
- TypeScript SDK

**目标用户：** Qwen 模型用户、多 Agent 应用开发者、希望将 AI Agent 接入外部通道的团队。  
**当前短板：** 取消语义、配置安全边界、Channel 回归、发布与文档一致性。

---

### DeepSeek TUI

**定位：** 偏 TUI/runtime 的 AI 开发自动化工具，近期重点是运行时韧性。  
**技术侧重：**

- 防挂死 timeout
- Runtime API
- Skill API
- Provider OAuth
- Automation run history
- Git/OCR/Pandoc/HTTP 子进程边界

**目标用户：** 重视 TUI、可集成 runtime、自动化任务和 DeepSeek/自定义模型接入的开发者。  
**当前短板：** 超时策略仍在系统性补齐，OAuth/MCP/Provider 状态解释能力需增强。

---

### Kimi Code CLI

**定位：** 今日无新增活动，暂无法从当天数据判断趋势。  
**观察：** 与 OpenCode/Pi 中 Kimi/K3 相关问题相比，Kimi 自家 CLI 今日社区动态较弱。

---

## 5. 社区热度与成熟度

### 5.1 今日最活跃工具

按 Issue/PR/Release 综合看：

1. **Qwen Code**
   - 32 Issues、37 PR、v0.25.0 发布
   - 明显处于高速架构扩张期
   - 多 Agent、Channel、Managed Runtime 同时推进

2. **OpenAI Codex**
   - 多个 release/alpha，≥10 PR
   - Windows、Dots、partial answer、sandbox、session 等多线并进
   - 平台化程度高，但复杂度也高

3. **OpenCode**
   - Issue/PR 均活跃
   - 安全、MCP、Desktop/TUI、V2 runtime 同时推进
   - 开源社区反馈密集，问题覆盖面广

4. **Pi**
   - 两个 release，9 PR
   - MCP 与多模型 provider 支持推进明显
   - 对高级用户和多模型场景响应快

---

### 5.2 快速迭代阶段

以下工具处于明显快速迭代阶段：

| 工具 | 证据 |
|---|---|
| **Qwen Code** | v0.25.0 后大量 Agent/Channel/Runtime PR；Issue 数最高 |
| **Codex** | alpha 版本持续推进，partial answer、Windows sandbox、session runtime 密集合并 |
| **OpenCode** | V2 迁移、安全、MCP、Desktop/TUI 多线活跃 |
| **Pi** | v1.0.3/v1.0.4 快速响应 MCP 与 Azure Foundry 需求 |
| **Copilot CLI** | 1.0.92/1.0.93 系列密集发布，但 PR 今日不活跃 |

---

### 5.3 成熟度较高但暴露复杂边界的工具

| 工具 | 成熟度表现 | 暴露问题 |
|---|---|---|
| **Claude Code** | hook/plugin/mod、云端会话、远程控制较成熟 | 认证、权限状态、长会话数据生命周期 |
| **Codex** | Desktop/Dots/Computer Use/沙箱能力丰富 | Windows、会话隔离、远程配对复杂度高 |
| **Copilot CLI** | 企业认证、config、cloud/local 环境切换 | MCP/OAuth 回归、BYOK/air-gapped 缺口 |
| **Gemini CLI** | 测试和终端体验打磨细致 | 今日规模较小，扩展生态反馈链路待增强 |

---

## 6. 值得关注的趋势信号

### 趋势 1：AI CLI 正在平台化，不再只是命令行助手

Qwen Code、Codex、Claude Code、OpenCode、Copilot CLI 都在引入或增强：

- 多 Agent
- 后台任务
- 远程控制
- Channel
- Desktop/Web/TUI
- Runtime API
- hook/plugin/mod/MCP

**对开发者的参考价值：**  
选型时不能只看模型效果，应评估工具是否支持团队需要的 **任务生命周期、权限治理、远程执行和可恢复性**。

---

### 趋势 2：MCP 成为事实上的扩展中枢，但治理能力滞后

多个工具都在处理 MCP 的：

- OAuth/Entra/PKCE 认证
- 工具命名与筛选
- server 启动失败解释
- permission allow/ask/deny
- tool discovery
- telemetry

**对开发者的参考价值：**  
如果计划构建 MCP server，应优先关注：

- 标准 OAuth/OIDC 兼容
- 工具命名长度与稳定性
- 错误返回语义
- 权限最小化
- 企业网关/Header 支持

---

### 趋势 3：长会话与上下文压缩成为核心工程问题

Claude Code、Copilot CLI、Codex、OpenCode、Pi、Qwen Code 都暴露了长会话问题：

- 自动压缩不可控
- 历史静默删除
- oversized tool-call 损坏线程
- compaction 超时
- cancelled turn 重入上下文
- prompt cache miss

**对开发者的参考价值：**  
长任务场景下应优先选择支持以下能力的工具：

- 手动/自动压缩策略可配置
- 会话历史可导出/保留
- 线程损坏可恢复
- 上下文边界可审计
- 取消操作有强语义保证

---

### 趋势 4：安全问题从“模型安全”扩展到“工具运行时安全”

今日高风险问题包括：

- OpenCode API 泄露 provider 明文凭据
- Claude security-guidance fail-open
- Codex sandbox-writable bubblewrap 防护
- OpenCode 工具输出 chat-template token 注入
- Qwen workspace memory 配置影响自动 Agent budget
- Copilot subagent 缺少 agentId 影响策略关联

**对开发者的参考价值：**  
AI CLI 的安全边界包括：

- 凭据管理
- 工具输出转义
- sandbox 可写路径
- hook 审计
- Agent 身份追踪
- 安全审查 fail-closed
- workspace 配置隔离

企业落地时必须纳入安全评审。

---

### 趋势 5：跨平台问题决定真实可用性

Windows、Nix、Linux namespace、macOS worktree、headless CI、mintty、PowerShell、Desktop app 都出现问题。

**对开发者的参考价值：**  
团队选型时应按实际开发环境验证：

- Windows 是否一等支持
- CI/headless 是否稳定
- shell 环境是否继承项目配置
- Desktop 与 CLI 状态是否一致
- 沙箱与权限弹窗是否可预测
- 终端渲染是否适配主力终端

---

### 趋势 6：错误可观测性正在成为核心竞争力

社区反复抱怨：

- 静默失败
- 无日志崩溃
- 错误会话显示
- 工具消失但无原因
- queued message 失败无提示
- security review 失败却显示 clean
- MCP connected 但工具未注册

**对开发者的参考价值：**  
优秀 AI CLI 应提供：

- 明确错误码
- 用户可见诊断
- hook/telemetry
- structured logs
- 失败重试路径
- 权限/认证状态可视化
- 工具可用性 briefing

---

## 结论

今天的社区动态显示，AI CLI 工具生态正在进入 **工程化、平台化、企业化** 阶段。  
短期内，开发者最应关注的不是单次代码生成质量，而是：

1. **长会话是否可靠**
2. **Agent/工具调用是否可控**
3. **认证和权限是否稳定**
4. **MCP/插件生态是否成熟**
5. **跨平台和桌面端体验是否可用**
6. **错误、安全和审计是否可观测**

从活跃度看，**Qwen Code、Codex、OpenCode、Pi** 今日迭代最强；从成熟度看，**Claude Code、Codex、Copilot CLI** 已进入复杂生产场景；从趋势看，未来 AI CLI 的核心竞争会集中在 **多 Agent runtime、MCP 治理、长任务可靠性、安全边界和企业集成能力**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-10-06  
仓库：`anthropics/skills`

> 注：本次 PR 列表标注为“按评论数排序”，但评论数字段显示为 `undefined`，因此以下判断结合 PR 排序、更新时间、Issue 讨论热度与主题关联综合分析。

---

## 1. 热门 Skills 排行

### 1. `skill-creator` 修复与评测体系改进  
- **PR**：[#1298 fix(skill-creator): isolate trigger evals and handle Windows and runtime failures](https://github.com/anthropics/skills/pull/1298)  
- **状态**：Open  
- **功能 / 变更**：修复 Skill 触发评测中的误判、Windows 下 `select()` 管道问题、运行时失败被错误计为 non-trigger 等问题。  
- **社区讨论热点**：  
  - Skill 是否能被稳定触发  
  - `run_eval.py` / trigger eval 的可信度  
  - Windows 兼容性  
  - 评测失败是否被静默吞掉  
- **相关 Issues**：  
  - [#556](https://github.com/anthropics/skills/issues/556) `run_eval.py` 0% trigger rate  
  - [#1383](https://github.com/anthropics/skills/issues/1383) skill-creator benchmark / trigger eval 问题  
  - [#202](https://github.com/anthropics/skills/issues/202) skill-creator 最佳实践改造  

---

### 2. `mcp-builder` MCP v2 兼容修复  
- **PR**：[#1742 fix(mcp-builder): support mcp>=2 streamable_http_client import and custom headers](https://github.com/anthropics/skills/pull/1742)  
- **状态**：Open  
- **功能 / 变更**：适配 `mcp>=2.0.0` 中 `streamablehttp_client` 到 `streamable_http_client` 的 API 变化，并支持自定义 HTTP headers。  
- **社区讨论热点**：  
  - MCP 生态快速变化带来的兼容性问题  
  - 真实 MCP server 连接与评测可靠性  
  - 自定义 header / auth 场景支持  
- **相关 Issue**：  
  - [#1390](https://github.com/anthropics/skills/issues/1390) mcp-builder 对真实 MCP server 评测失败  

---

### 3. `proofcore-contract-auditor` 智能合约审计 Skill  
- **PR**：[#1771 feat(skills): add proofcore-contract-auditor for smart contract notarization](https://github.com/anthropics/skills/pull/1771)  
- **状态**：Open  
- **功能 / 变更**：新增 Web3 智能合约审计 Skill，支持 Solidity / Rust 合约静态分析，并将审计证明锚定到 TON Blockchain。  
- **社区讨论热点**：  
  - AI 辅助智能合约安全审计  
  - 审计结果可验证 / 可公证  
  - Web3 与 Claude Code Skill 的结合  
- **看点**：属于垂直行业型高价值 Skill，面向安全、链上开发与合规场景。

---

### 4. `docx` 文档处理修复系列  
- **PRs**：  
  - [#1734 Detect orphaned docx comments](https://github.com/anthropics/skills/pull/1734)  
  - [#1792 fix(docx): report LibreOffice timeout as an error and verify the output](https://github.com/anthropics/skills/pull/1792)  
  - [#541 fix(docx): prevent tracked change w:id collision with existing bookmarks](https://github.com/anthropics/skills/pull/541)  
- **状态**：Open  
- **功能 / 变更**：围绕 DOCX 评论、修订、LibreOffice 超时、OOXML ID 冲突等问题进行修复。  
- **社区讨论热点**：  
  - 文档自动化生成后的正确性验证  
  - DOCX tracked changes / comments 的可靠处理  
  - LibreOffice 转换失败不应被误报为成功  
- **看点**：文档类 Skill 是最成熟、最常用方向之一，社区关注点正在从“能生成”转向“可验证、不中断、不损坏文件”。

---

### 5. `md2video-audio` Markdown 转视频与配音  
- **PR**：[#1703 Add md2video-audio skill](https://github.com/anthropics/skills/pull/1703)  
- **状态**：Open  
- **功能 / 变更**：将 Markdown 文档转换为带真实感配音的 MP4 视频，使用 Marp 生成幻灯片并进一步合成为视频。  
- **社区讨论热点**：  
  - 内容生产自动化  
  - 文档到演示视频的一键转换  
  - 零成本、端到端媒体生成工作流  
- **看点**：体现社区对“从文本到多媒体交付物”的强需求。

---

### 6. `notion-spec-to-implementation` / `quantitative-resume-auditor`  
- **PR**：[#1245 Add notion-spec-to-implementation and quantitative-resume-auditor skills](https://github.com/anthropics/skills/pull/1245)  
- **状态**：Open  
- **功能 / 变更**：  
  - `notion-spec-to-implementation`：将 Notion 产品 / 技术规格转为可执行任务。  
  - `quantitative-resume-auditor`：量化分析和改进简历内容。  
- **社区讨论热点**：  
  - 产品需求到工程任务的自动拆解  
  - PM / 工程团队协作工作流  
  - 知识库与 Claude Code 的衔接  
- **看点**：代表“企业工作流自动化”方向，尤其是从 Notion 等协作工具进入开发执行链路。

---

### 7. `pyxel` 复古游戏开发 Skill  
- **PR**：[#525 Add pyxel skill for retro game development](https://github.com/anthropics/skills/pull/525)  
- **状态**：Open  
- **功能 / 变更**：支持用 Python Pyxel 创建、调试、验证复古游戏，包括 headless 运行、输入驱动测试和帧检查。  
- **社区讨论热点**：  
  - AI 辅助游戏开发  
  - 可视化程序的自动验证  
  - Headless 测试与状态检查  
- **看点**：虽然垂直，但覆盖“代码生成 + 运行验证 + 视觉输出检查”的完整闭环。

---

### 8. `testing-patterns` / `AWT` 测试自动化方向  
- **PRs**：  
  - [#723 feat: add testing-patterns skill](https://github.com/anthropics/skills/pull/723)  
  - [#822 feat: add AWT — AI-powered E2E testing skill](https://github.com/anthropics/skills/pull/822)  
- **状态**：Open  
- **功能 / 变更**：  
  - `testing-patterns`：覆盖单测、React 组件测试、集成测试等测试模式。  
  - `AWT`：AI 驱动端到端测试，可结合视觉和浏览器控制进行测试生成。  
- **社区讨论热点**：  
  - 测试生成与测试策略标准化  
  - AI 执行 E2E 测试  
  - 从代码生成走向质量保障  
- **看点**：测试类 Skill 具备强通用性，是 Claude Code 在工程团队中落地的关键方向。

---

## 2. 社区需求趋势

### 趋势一：Skill 安全、命名空间与信任边界  
- **代表 Issue**：[#492 Security: Community skills distributed under anthropic/ namespace enable trust boundary abuse](https://github.com/anthropics/skills/issues/492)  
- **热度**：43 条评论，当前 Issues 中最高。  
- **需求总结**：社区强烈关注官方 Skill 与社区 Skill 的边界，尤其是 `anthropic/` 命名空间可能导致用户误信第三方 Skill。  
- **潜在方向**：  
  - Skill 签名 / 来源认证  
  - 官方与社区 Skill 分区  
  - 安全扫描与权限提示  
  - Marketplace 信任等级机制  

---

### 趋势二：组织级 Skill 分发与共享  
- **代表 Issue**：[#228 Enable org-wide skill sharing in Claude.ai](https://github.com/anthropics/skills/issues/228)  
- **热度**：16 条评论，8 个 👍。  
- **需求总结**：团队希望能在组织内共享 Skill，而不是手动下载 `.skill` 文件并逐个上传。  
- **潜在方向**：  
  - 企业 Skill Library  
  - 组织级 Skill 发布 / 审批  
  - 共享链接  
  - 权限与版本管理  

---

### 趋势三：Skill 触发与评测可靠性  
- **代表 Issues**：  
  - [#556 run_eval.py 0% trigger rate](https://github.com/anthropics/skills/issues/556)  
  - [#1383 skill-creator benchmark / trigger eval 问题](https://github.com/anthropics/skills/issues/1383)  
- **需求总结**：社区希望 Skill 能被稳定触发，并能通过可信评测判断描述、触发词和负例是否有效。  
- **潜在方向**：  
  - 更可靠的 trigger eval  
  - 跨平台评测支持  
  - Skill 质量评分  
  - 自动回归测试  

---

### 趋势四：文档自动化与 Office 文件可靠处理  
- **代表 PRs / Issues**：  
  - [#1734 Detect orphaned docx comments](https://github.com/anthropics/skills/pull/1734)  
  - [#1792 DOCX LibreOffice timeout 验证](https://github.com/anthropics/skills/pull/1792)  
  - [#486 Add ODT skill](https://github.com/anthropics/skills/pull/486)  
  - [#514 document-typography](https://github.com/anthropics/skills/pull/514)  
- **需求总结**：文档类 Skill 不再只是生成文件，而是需要处理格式、修订、评论、排版、模板填充和转换质量。  
- **潜在方向**：  
  - DOCX / ODT / PDF 高可靠编辑  
  - 批注、修订、审阅自动化  
  - 文档排版质检  
  - 企业文档模板流水线  

---

### 趋势五：测试、质量保障与代码交付  
- **代表 PRs / Issues**：  
  - [#723 testing-patterns](https://github.com/anthropics/skills/pull/723)  
  - [#822 AWT](https://github.com/anthropics/skills/pull/822)  
  - [#1385 Reasoning Quality Gate Pipeline](https://github.com/anthropics/skills/issues/1385)  
- **需求总结**：社区希望 Claude Code 不只是写代码，还能生成测试、执行验证、进行交付前质量门禁。  
- **潜在方向**：  
  - E2E 测试生成  
  - 单元测试策略  
  - AI 输出质量门禁  
  - 发布前风险检查  

---

### 趋势六：上下文窗口与 Token 效率  
- **代表 Issue**：[#1487 claude-api skill eagerly injects ~156k tokens](https://github.com/anthropics/skills/issues/1487)  
- **需求总结**：大型 Skill 容易一次性注入过多上下文，导致窗口耗尽。社区希望 Skill 更模块化、按需加载。  
- **潜在方向**：  
  - Skill lazy loading  
  - 分层 reference 文档  
  - 上下文预算控制  
  - 精简版 Skill profile  

---

## 3. 高潜力待合并 Skills

以下 PR 均处于 Open 状态，且主题明确、更新较新或与高热 Issue 强相关，具备较高落地潜力。

| Skill / PR | 状态 | 潜力判断 |
|---|---:|---|
| [`skill-creator` trigger eval 修复 #1298](https://github.com/anthropics/skills/pull/1298) | Open | 与多个高热 Issue 直接相关，属于基础设施级修复，优先级高。 |
| [`mcp-builder` MCP v2 兼容 #1742](https://github.com/anthropics/skills/pull/1742) | Open | MCP 生态快速演进，兼容性修复需求强，近期落地概率高。 |
| [`docx` LibreOffice timeout / 输出验证 #1792](https://github.com/anthropics/skills/pull/1792) | Open | 文档处理可靠性问题明确，修复范围清晰，合并阻力相对较小。 |
| [`docx` orphaned comments 检测 #1734](https://github.com/anthropics/skills/pull/1734) | Open | 补强 DOCX 审阅场景，适合并入现有文档 Skill。 |
| [`testing-patterns #723`](https://github.com/anthropics/skills/pull/723) | Open | 测试模式通用性强，面向前端、后端、组件测试等广泛场景。 |
| [`AWT` AI E2E 测试 #822](https://github.com/anthropics/skills/pull/822) | Open | E2E 测试自动化与 Claude Code 高度契合，但可能依赖外部工具评估。 |
| [`md2video-audio #1703`](https://github.com/anthropics/skills/pull/1703) | Open | 内容生产场景吸引力强，适合拓展 Skills 到多媒体生成。 |
| [`notion-spec-to-implementation #1245`](https://github.com/anthropics/skills/pull/1245) | Open | 企业协作与工程任务拆解需求明确，适合团队工作流。 |

---

## 4. Skills 生态洞察

**一句话总结**：  
当前 Claude Code Skills 社区最集中的诉求是：在保证安全可信和可评测的前提下，把 Skills 从“单点能力说明”升级为可在团队中共享、可稳定触发、可验证输出的工程化工作流组件。

---

# Claude Code 社区动态日报｜2026-10-06

## 1. 今日速览

过去 24 小时 Claude Code 发布了两个小版本，重点修复了云端会话权限提示回答丢失、退出时会话尾部消息丢失等回归问题。社区 Issue 主要集中在认证 / 权限、桌面端与远程控制、GitHub 集成、安全审查插件、长会话上下文管理等方向，显示出 Claude Code 在多端协作和自动化场景下的稳定性仍是核心关注点。

今日无 Pull Request 更新。

---

## 2. 版本发布

### v2.1.291

链接：https://github.com/anthropics/claude-code/releases/tag/v2.1.291

主要修复：

- 修复 v2.1.290 引入的回归：云端会话可能丢失对权限提示的回答。
- 修复 v2.1.288 引入的回归：退出会话时，最后几条消息可能丢失。

**影响分析：**  
这两个修复都与会话可靠性直接相关，尤其是权限确认和会话收尾消息丢失问题，会影响自动化任务、远程控制和长会话开发体验。建议使用云端会话或长时间运行 Claude Code 的用户尽快升级。

---

### v2.1.290

链接：https://github.com/anthropics/claude-code/releases/tag/v2.1.290

主要变化：

- 在 mod 的 `turn.step` hook 结果中新增 `serverToolUses` 字段，用于暴露 API 自身运行的工具调用信息，包括工具调用的 id、名称、输入、开始和结束时间。
- 在插件 hook 的 `tool.check` 事件中新增 `agentId`，便于 hook 区分主代理与子代理的权限检查。

**影响分析：**  
该版本增强了插件、mod 和多代理场景下的可观测性与权限控制能力。对于构建 Claude Code 插件、安全策略、审计工具和自定义 agent 工作流的开发者来说，这些字段有助于更精细地追踪工具调用来源。

---

## 3. 社区热点 Issues

### 1. API 认证异常：403 Access grant 错误

链接：https://github.com/anthropics/claude-code/issues/99837

用户反馈已登录状态下仍反复出现：

> API Error: 403 Access to this model requires an access grant

标签涉及 `area:auth`、`platform:linux`。该 Issue 评论数最高，说明认证、模型访问权限和登录状态同步仍是社区高频痛点。

**重要性：**  
认证失败会直接阻断 Claude Code 使用，是 P0/P1 级体验问题。  
**社区反应：**  
已有 4 条评论，是今日讨论度最高的 Issue。

---

### 2. security-guidance 在 LLM Gateway 后因未发送自定义 Header 导致 401

链接：https://github.com/anthropics/claude-code/issues/99857

用户报告 `ANTHROPIC_CUSTOM_HEADERS` 未被发送到安全审查模型请求中，导致通过 LLM Gateway 使用时出现 401。

**重要性：**  
该问题影响企业网关、自托管代理、统一鉴权网关等高级集成场景。  
**社区反应：**  
已有复现信息，标签包含 `has repro`、`area:security`、`area:networking`，值得插件和企业用户关注。

---

### 3. Worktree guard 拒绝用户 `!` 命令中的 `git -C ~/...`

链接：https://github.com/anthropics/claude-code/issues/99855

在绑定 worktree 的会话中，用户执行 `!` 命令时，如果命令包含 `git -C ~/...`，会被 worktree guard 拒绝，并且在 Remote Control 下原因不可见。

**重要性：**  
Git worktree 是高级开发工作流常用能力，该问题会影响远程控制、脚本化 Git 操作和多仓库开发。  
**社区反应：**  
已有复现，涉及 `area:bash`、`area:sandbox`、`platform:macos`。

---

### 4. 会话重命名输入框希望预填当前名称

链接：https://github.com/anthropics/claude-code/issues/99827

用户提出在重命名 session 时，输入框应自动填入当前 session 名称。

**重要性：**  
这是典型的低成本 UX 改进，有助于改善多会话管理体验。  
**社区反应：**  
已有评论，说明 TUI 会话管理仍有不少细节优化空间。

---

### 5. 会话 transcript 30 天后被静默删除

链接：https://github.com/anthropics/claude-code/issues/99817

用户反馈 Claude Code 会在无明确同意、警告或 UI 提示的情况下删除 30 天前的 session transcripts。

**重要性：**  
该问题涉及数据保留策略、开发审计、历史上下文复用和用户信任。标签包含 `data-loss`，优先级较高。  
**社区反应：**  
已有点赞和评论，虽然被标为 duplicate，但反映出社区对数据生命周期透明度的关注。

---

### 6. Desktop app 从 spawn_task 卡片打开的新会话忽略 effortLevel 设置

链接：https://github.com/anthropics/claude-code/issues/99862

用户反馈桌面端 Code tab 中，通过后台任务卡片打开的新本地会话总是以 `medium` effort 启动，忽略 `settings.json` 中的 `"effortLevel": "high"` 和父会话 effort。

**重要性：**  
影响桌面端任务派生、子任务质量控制和一致性设置。  
**社区反应：**  
虽然暂无评论，但该问题指向 Desktop、Agents 和配置继承机制之间的集成缺陷。

---

### 7. Auto-compaction 未经用户同意自动运行并降低长会话质量

链接：https://github.com/anthropics/claude-code/issues/99860

Windows 用户反馈自动压缩上下文在未获用户明确同意时运行，并降低长会话的回答质量。

**重要性：**  
长会话是 Claude Code 的核心使用场景之一。自动压缩若缺乏可控性，可能影响需求跟踪、架构推理和大型重构任务。  
**社区反应：**  
该 Issue 反映了用户对“自动化上下文管理”和“可解释控制权”的需求。

---

### 8. Bedrock oversized image payload 未被识别为 request_too_large

链接：https://github.com/anthropics/claude-code/issues/99859

用户反馈 Amazon Bedrock 返回 `400 Input is too long.` 时，Claude Code 未将其识别为 `request_too_large`，导致不会清理媒体或压缩上下文，会话后续请求持续失败。

**重要性：**  
影响 Bedrock 集成、图片输入、多模态开发工作流和错误恢复机制。  
**社区反应：**  
Issue 带有 `has repro` 和 `api:bedrock`，说明具备明确复现路径，适合优先修复。

---

### 9. Linux PID namespace / procfs mismatch 导致 Read 和 Grep 读取异常

链接：https://github.com/anthropics/claude-code/issues/99853

用户报告 Linux 下 PID namespace 与 procfs 不匹配，可能导致 PDF / `.ipynb` Read、单文件 Grep 出错，甚至返回其他文件内容。

**重要性：**  
该问题同时涉及工具正确性与安全性。如果工具返回错误文件内容，可能导致误判、信息泄露或错误修改。  
**社区反应：**  
标签包含 `area:tools`、`area:security`、`regression`、`has repro`，技术风险较高。

---

### 10. security-guidance 审查失败却显示“无漏洞”

链接：https://github.com/anthropics/claude-code/issues/99840

用户反馈当安全审查因 API 错误，例如 HTTP 401，无法访问模型时，security-guidance 会记录为“no vulnerabilities found”，并将 commit 标记为已审查。

**重要性：**  
这是安全工具中典型的 fail-open 问题。失败不应被等同于通过，否则会破坏安全审查可信度。  
**社区反应：**  
虽暂无评论，但与 #99857、#99839 共同表明 security-guidance 插件链路存在多个一致性和错误处理问题。

---

## 4. 重要 PR 进展

过去 24 小时无 Pull Request 更新。

链接：https://github.com/anthropics/claude-code/pulls

**观察：**  
虽然今天没有 PR 进展，但 Issue 活跃度较高，尤其是认证、桌面端、GitHub 集成、安全审查和上下文压缩相关问题。预计后续修复可能集中在稳定性、权限链路和插件 hook 行为上。

---

## 5. 功能需求趋势

### 1. 会话管理与 TUI 体验优化

相关 Issue：

- 会话重命名预填当前名称：https://github.com/anthropics/claude-code/issues/99827
- iPhone / Web 交互能力对齐终端建议体验：https://github.com/anthropics/claude-code/issues/99844
- 按真实文件夹分组，而非按 repo 分组：https://github.com/anthropics/claude-code/issues/99836

趋势说明：  
用户正在更多地使用 Claude Code 管理多个项目、多条会话和跨端任务，因此对会话命名、分组、跨端交互一致性的诉求上升。

---

### 2. 自动化权限与远程控制稳定性

相关 Issue：

- 云端会话权限提示回答丢失已在 v2.1.291 修复：https://github.com/anthropics/claude-code/releases/tag/v2.1.291
- Desktop Projects 重连后丢失 auto-approve：https://github.com/anthropics/claude-code/issues/99858
- Remote Control 下 worktree guard 拒绝原因不可见：https://github.com/anthropics/claude-code/issues/99855
- Cowork 定时任务在 Skip all approvals 下仍需设备批准：https://github.com/anthropics/claude-code/issues/99848

趋势说明：  
开发者希望 Claude Code 能稳定执行长时间、后台化、跨设备的任务。但当前权限提示、自动批准和设备桥接仍存在状态丢失或不可解释问题。

---

### 3. 安全审查与插件系统可靠性

相关 Issue：

- security-guidance 未发送自定义 Header：https://github.com/anthropics/claude-code/issues/99857
- 审查失败被标记为 clean：https://github.com/anthropics/claude-code/issues/99840
- commit-review findings 被无关 connector 警告覆盖：https://github.com/anthropics/claude-code/issues/99839
- Plugin Button 快速二次点击丢失：https://github.com/anthropics/claude-code/issues/99847
- Mods prompt.edit hook 渲染顺序异常：https://github.com/anthropics/claude-code/issues/99863

趋势说明：  
随着插件、mod、hook 生态扩展，社区开始关注 hook 数据完整性、错误处理语义、UI 事件一致性和安全工具 fail-safe 行为。

---

### 4. GitHub 集成与私有仓库访问

相关 Issue：

- Cowork / Web GitHub connector 无法访问私有 repo：https://github.com/anthropics/claude-code/issues/99861
- GitHub integration 连接异常：https://github.com/anthropics/claude-code/issues/99856
- Cloud connect 无法发现私有 repo：https://github.com/anthropics/claude-code/issues/99850
- 安装后仍提示未安装：https://github.com/anthropics/claude-code/issues/99842

趋势说明：  
GitHub 集成仍是 Web / Cowork 用户的高频入口，但私有仓库授权、connector 状态同步和安装检测仍存在稳定性问题。

---

### 5. 长会话与上下文压缩可控性

相关 Issue：

- Auto-compaction 未经同意运行：https://github.com/anthropics/claude-code/issues/99860
- 退出时会话尾部消息丢失已在 v2.1.291 修复：https://github.com/anthropics/claude-code/releases/tag/v2.1.291
- session transcripts 静默删除：https://github.com/anthropics/claude-code/issues/99817
- Bedrock oversized image payload 导致会话卡死：https://github.com/anthropics/claude-code/issues/99859

趋势说明：  
用户希望对上下文压缩、历史保留、错误恢复和多模态内容裁剪有更透明的控制能力。长会话质量和历史可追溯性正成为核心体验指标。

---

## 6. 开发者关注点

### 1. 认证和访问授权问题仍然突出

包括 403 access grant、OAuth refresh 网络异常导致永久登出、账号关闭 / appeal loop、用户被 block 时错误提示不清晰等。

相关 Issue：

- https://github.com/anthropics/claude-code/issues/99837
- https://github.com/anthropics/claude-code/issues/99849
- https://github.com/anthropics/claude-code/issues/99852
- https://github.com/anthropics/claude-code/issues/99843

开发者期望：  
更清晰的错误信息、更稳定的 token refresh、更好的登录状态恢复机制。

---

### 2. 桌面端和远程任务需要更强的状态一致性

桌面端、Remote Control、Cowork、scheduled task、spawn_task 等能力正在被用于真实开发工作流，但权限、effortLevel、auto-approve 和设备桥接状态容易出现不一致。

相关 Issue：

- https://github.com/anthropics/claude-code/issues/99862
- https://github.com/anthropics/claude-code/issues/99858
- https://github.com/anthropics/claude-code/issues/99848
- https://github.com/anthropics/claude-code/issues/99845

开发者期望：  
跨会话、跨设备、跨任务的配置继承和权限状态应可预测、可恢复、可观察。

---

### 3. 安全与审计工具不能 fail-open

security-guidance 多个 Issue 显示，安全审查失败时不应显示 clean，也不应将 commit 标记为 reviewed。

相关 Issue：

- https://github.com/anthropics/claude-code/issues/99840
- https://github.com/anthropics/claude-code/issues/99857
- https://github.com/anthropics/claude-code/issues/99839

开发者期望：  
安全审查失败应明确提示、阻止误判，并提供重试或降级路径。

---

### 4. 工具层正确性与沙箱边界需要加强

Linux Read / Grep 异常、macOS grep shim 对 invalid UTF-8 处理不一致、worktree guard 拒绝命令但隐藏原因等，说明底层工具封装仍需提升可预测性。

相关 Issue：

- https://github.com/anthropics/claude-code/issues/99853
- https://github.com/anthropics/claude-code/issues/99846
- https://github.com/anthropics/claude-code/issues/99855

开发者期望：  
工具行为应尽量贴近原生命令语义，沙箱限制应提供明确原因，避免静默失败或返回错误内容。

---

### 5. 用户希望更多“可控的自动化”

自动压缩、自动批准、自动安全审查、自动更新、自动启动 dev server 等功能都带来了效率，但也引发控制权和透明度问题。

相关 Issue：

- https://github.com/anthropics/claude-code/issues/99860
- https://github.com/anthropics/claude-code/issues/99845
- https://github.com/anthropics/claude-code/issues/99838
- https://github.com/anthropics/claude-code/issues/99817

开发者期望：  
自动化能力应提供开关、日志、预警、恢复路径和可解释 UI，而不是静默执行。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报  
**日期：2026-10-06**  
**仓库：** https://github.com/openai/codex

---

## 1. 今日速览

过去 24 小时 Codex 社区活跃度较高，集中在 **Windows 桌面端稳定性、远程控制配对、Dots / Cloud browser 体验、CLI 沙箱与后台任务能力** 等方向。  
版本侧发布了 `rust-v0.160.1` 修复远程 stdio MCP 启动时 Windows 环境变量丢失问题，同时多个 alpha 版本继续推进。PR 方面则围绕 **partial answer 消息阶段、Windows 安装与沙箱、Fast / Ultra Fast 策略、会话分页稳定性、MCP 遥测、安全加固** 等进行了密集合并。

---

## 2. 版本发布

### rust-v0.160.1  
链接：https://github.com/openai/codex/releases/tag/rust-v0.160.1

**主要修复：**

- 修复在显式配置远程环境变量时，启动 remote stdio MCP server 会丢失 `SYSTEMROOT`、`TEMP`、`TMP` 的问题。
- 该修复对 **Unix 主机连接 Windows executor** 的场景较关键，可避免 Windows 启动环境变量被覆盖导致远程执行异常。

相关 PR：  
- https://github.com/openai/codex/pull/51121

### rust-v0.162.0-alpha.16  
链接：https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.16

Alpha 预发布版本，继续推进 0.162.0 线的迭代。

### rust-v0.162.0-alpha.15  
链接：https://github.com/openai/codex/releases/tag/rust-v0.162.0-alpha.15

Alpha 预发布版本，继续推进 0.162.0 线的迭代。

---

## 3. 社区热点 Issues

### 1. Android Cloud browser Cookies 显示异常  
Issue：https://github.com/openai/codex/issues/51270  
状态：Open｜评论：2｜标签：bug, browser, dots

用户反馈 Android 端 Settings → Cloud browser → Cookies 显示为 0，但桌面端能看到多个 dot computer browser cookies。  
**重要性：** 这暴露出 Android 与桌面端在 Cloud browser / Dots 数据展示上的一致性问题，影响移动端管理远程浏览器状态。  
**社区反应：** 评论数较高，且同一用户还提交了相关增强需求，说明移动端 Dots 管理体验正在成为关注点。

---

### 2. Windows 10 Computer Use 捕获超时  
Issue：https://github.com/openai/codex/issues/51245  
状态：Open｜评论：2｜标签：bug, windows-os, app, computer-use

用户报告 Codex desktop Computer Use 通过 `@oai/sky` 接口捕获 Windows 10 屏幕时超时，但独立 Windows.Graphics.Capture 可成功。  
**重要性：** Computer Use 是 Codex 桌面自动化能力的核心路径，该问题可能影响 Windows 10 企业环境中的可用性。  
**社区反应：** 报告提供了系统版本、GPU、驱动和 App build 信息，复现材料较完整，便于定位。

---

### 3. Windows Codex task error / 登录模式相关错误  
Issue：https://github.com/openai/codex/issues/51242  
状态：Open｜评论：2｜标签：bug, windows-os, app

Windows 11 用户在 ChatGPT 登录模式下遇到 Codex task error，涉及 `auth_mode=chatgpt`、无 relay/API key 的场景。  
**重要性：** 反映 Windows 桌面端在 ChatGPT 账号体系下的任务执行链路仍存在稳定性问题。  
**社区反应：** 评论较多，且与其他 Windows 认证、远程配对类问题形成趋势。

---

### 4. 桌面侧边栏缺少任务执行位置与 Dot 参与标识  
Issue：https://github.com/openai/codex/issues/51234  
状态：Open｜评论：2｜标签：enhancement, app, dots

用户建议在桌面 sidebar 中显示任务是在 cloud 还是 local computer 执行，以及是否由 Dot 发起或管理。  
**重要性：** 随着 Dots、云端任务、本地任务混合使用，任务来源和执行位置的可观察性成为明显痛点。  
**社区反应：** 评论数较高，说明多设备、多执行上下文下的 UX 透明度受到关注。

---

### 5. Android 与 Windows 配对授权流程循环  
Issue：https://github.com/openai/codex/issues/51212  
状态：Open｜评论：2｜标签：bug, windows-os, auth, app, remote

用户通过 Google 登录，在 Android 与 Windows 远程控制配对时进入授权循环，无明确错误。  
**重要性：** 远程控制是跨设备 Codex 使用的关键入口，授权循环会直接阻塞功能启用。  
**社区反应：** 类似问题在 #51243 中也出现，说明不是孤立个案。

---

### 6. Linux Desktop 错误显示 Web Work chat，并把输入发送到错误会话  
Issue：https://github.com/openai/codex/issues/51274  
状态：Open｜评论：1｜标签：bug, app, session

Linux 桌面端项目面板中偶发显示另一个 ChatGPT Work 浏览器会话的内容，并可能把桌面输入发送到该会话。  
**重要性：** 这是严重的会话隔离与上下文错配问题，涉及用户信任、数据边界和工作流安全。  
**社区反应：** 虽然评论数不高，但问题性质严重，值得优先关注。

---

### 7. Dot 失去已连接 Windows 电脑，委派任务无法恢复  
Issue：https://github.com/openai/codex/issues/51273  
状态：Open｜评论：1｜标签：bug, windows-os, connectivity, dots

用户在 Windows 电脑从公司 Wi-Fi 切换到热点再到家庭 Wi-Fi 后，Dot 无法恢复与本地执行环境的连接。  
**重要性：** Dots 依赖长连接和设备状态同步，网络切换后的自动恢复能力直接影响远程任务可靠性。  
**社区反应：** 与 #51229、#51213 等 Dots 在线状态问题共同构成高频主题。

---

### 8. 希望 CLI 后台命令完成后能唤醒 Codex  
Issue：https://github.com/openai/codex/issues/51272  
状态：Open｜评论：1｜标签：enhancement, CLI, agent

用户希望 Codex CLI 能监控后台命令，即使当前 turn 结束，也能在命令完成或 watcher 检测到变化时自动恢复。  
**重要性：** 这是 agentic CLI 工作流的重要能力，适合长时间构建、测试、文件监听、部署任务。  
**社区反应：** 需求明确，反映开发者希望 Codex 从单轮执行升级到更持久的异步代理。

---

### 9. 审批弹窗抢占系统键盘焦点  
Issue：https://github.com/openai/codex/issues/51271  
状态：Closed｜评论：1｜标签：bug, sandbox, app

用户反馈 Codex 权限审批弹窗会在用户输入其他应用时抢占键盘焦点，导致按键被弹窗消费，可能误批准或拒绝操作。  
**重要性：** 该问题涉及安全与 UX，误触审批可能带来实际风险。  
**社区反应：** 已关闭，说明可能已被处理或合并到其他跟踪项。

---

### 10. 过大的 tool-call arguments 会永久损坏线程  
Issue：https://github.com/openai/codex/issues/51275  
状态：Open｜评论：0｜标签：bug, context, tool-calls, app, session

用户报告超过 1 MB 的 tool-call arguments 会导致线程进入 `string_above_max_length on input[N].arguments` 状态，后续无法恢复。  
**重要性：** 这影响长上下文、工具调用和会话恢复的健壮性，尤其对复杂自动化任务风险较高。  
**社区反应：** 新提交 issue，暂无评论，但技术影响面较大。

---

## 4. 重要 PR 进展

### 1. Handle partial answers in realtime routing and thread search  
PR：https://github.com/openai/codex/pull/51260  
状态：Closed

处理 `partial_answer` 阶段消息在实时路由和线程搜索中的行为。  
**价值：** 让部分回答既可搜索、可朗读，又不会被误判为最终答案，改善流式输出和实时交互体验。

---

### 2. Add a partial answer message phase  
PR：https://github.com/openai/codex/pull/51241  
状态：Closed

新增 `MessagePhase::PartialAnswer`，并在协议中暴露 `partial_answer`。  
**价值：** 为“回答文本之后仍可能继续工具调用或输出”的场景提供明确语义，是后续 agent workflow 修复的基础设施。

---

### 3. Handle partial answers consistently across agent workflows  
PR：https://github.com/openai/codex/pull/51249  
状态：Closed

统一 agent workflow 中 partial answer 的处理逻辑，避免将其当作 final answer。  
**价值：** 可减少邮箱投递延迟、空 final response 误计数、forked history 污染等问题。

---

### 4. Fix installer checksum verification under Windows PowerShell  
PR：https://github.com/openai/codex/pull/51257  
状态：Closed

修复 Windows PowerShell 下安装器校验和验证失败的问题。  
**价值：** 避免 PowerShell 7 module path 影响 Windows PowerShell 加载 `Get-FileHash`，提升 Windows 安装可靠性。

---

### 5. Start the Windows sandbox service during registered Core setup  
PR：https://github.com/openai/codex/pull/51256  
状态：Closed

在 registered Core setup 期间自动启动 Windows sandbox service。  
**价值：** 避免 sandbox provisioning service 停止时被误判为不可用，改善 Windows 沙箱初始化成功率。

---

### 6. Enforce Fast and Ultra Fast policies independently  
PR：https://github.com/openai/codex/pull/51253  
状态：Closed

新增默认启用的 `features.ultrafast_mode`，将 Fast 与 Ultra Fast 策略独立控制。  
**价值：** 让企业或策略系统可以分别允许 / 禁用 Fast 与 Ultra Fast 模式，提升策略精细度。

---

### 7. Make session lookup pagination stable and report listing failures  
PR：https://github.com/openai/codex/pull/51230  
状态：Closed

修复会话查找分页不稳定的问题，并报告 listing failure。  
**价值：** 避免由于 unread thread 移动、相同创建时间 cursor 导致 session label 查找漏检，提高会话索引可靠性。

---

### 8. Separate environment requests from runtime selections  
PR：https://github.com/openai/codex/pull/51221  
状态：Closed

引入 `TurnEnvironmentRequest`，将调用方提供的环境请求与运行时环境选择分离。  
**价值：** 改善 session startup、app-server settings、默认环境继承等边界，降低环境选择逻辑耦合。

---

### 9. Reject sandbox-writable bubblewrap executables from PATH  
PR：https://github.com/openai/codex/pull/51211  
状态：Closed

拒绝从 PATH 中发现位于 sandbox-writable 路径下的 bubblewrap 可执行文件。  
**价值：** 防止在沙箱外执行可写路径中的 bubblewrap，提高 Linux sandbox 安全性。

---

### 10. Add ranked tool discovery to JavaScript code mode  
PR：https://github.com/openai/codex/pull/51209  
状态：Closed

为 JavaScript code mode 增加默认关闭的 `code_mode_tool_search` 能力，支持 `await tools.tool_search({ query, limit })`。  
**价值：** 引入 BM25-ranked deferred tools 发现能力，有助于代码模式下按需检索工具，减少工具上下文膨胀。

---

## 5. 功能需求趋势

### 1. Dots 多设备任务可观察性  
相关 Issues：  
- https://github.com/openai/codex/issues/51234  
- https://github.com/openai/codex/issues/51214  
- https://github.com/openai/codex/issues/51273  
- https://github.com/openai/codex/issues/51229  

社区希望更清楚地看到：任务由谁发起、在哪台设备执行、是否由 Dot 管理、当前是否等待用户输入或计划任务触发。  
**趋势判断：** Dots 正从“辅助入口”变成多设备 agent 编排层，因此任务状态、设备状态、调度状态的统一视图会越来越重要。

---

### 2. Windows 桌面端稳定性与沙箱能力  
相关 Issues：  
- https://github.com/openai/codex/issues/51245  
- https://github.com/openai/codex/issues/51242  
- https://github.com/openai/codex/issues/51252  
- https://github.com/openai/codex/issues/51218  
- https://github.com/openai/codex/issues/51219  

Windows 用户集中反馈 Computer Use、CLI 权限、Code Review 插件、沙箱审批、远程连接等问题。  
**趋势判断：** Windows 已是 Codex 桌面端的重要使用平台，但权限模型、沙箱服务、安装器、图形捕获等系统层能力仍是高频摩擦点。

---

### 3. 远程控制与移动端配对体验  
相关 Issues：  
- https://github.com/openai/codex/issues/51212  
- https://github.com/openai/codex/issues/51243  
- https://github.com/openai/codex/issues/51270  
- https://github.com/openai/codex/issues/51269  

用户希望 Android 能稳定连接 Windows / desktop，并拥有与桌面端一致的 Cloud browser 可见性。  
**趋势判断：** 移动端将成为 Codex 远程控制的重要入口，但认证循环、cookie 可见性、设备状态同步仍需完善。

---

### 4. CLI 长任务与后台代理能力  
相关 Issues：  
- https://github.com/openai/codex/issues/51272  
- https://github.com/openai/codex/issues/51268  
- https://github.com/openai/codex/issues/51252  

CLI 用户希望 Codex 能处理更长生命周期的工作流，例如后台命令完成后自动唤醒、watcher 触发后继续执行、减少重复安全提示。  
**趋势判断：** 开发者对 CLI 的期待正在从“交互式命令助手”转向“可持续运行的本地 agent”。

---

### 5. 会话、上下文与工具调用健壮性  
相关 Issues：  
- https://github.com/openai/codex/issues/51275  
- https://github.com/openai/codex/issues/51274  
- https://github.com/openai/codex/issues/51261  
- https://github.com/openai/codex/issues/51251  
- https://github.com/openai/codex/issues/51266  

包括 oversized tool-call arguments 损坏线程、Web Work chat 错入桌面项目面板、大 PNG 附件膨胀 global state、queued message 静默失败、模型重复输出等。  
**趋势判断：** 随着 Codex 支持更复杂的上下文和多工具调用，线程恢复、上下文隔离、输入限制、错误可见性成为核心工程挑战。

---

## 6. 开发者关注点

1. **Windows 体验仍是最大痛点之一**  
   多个 issue 涉及 Windows 10/11 上的 Computer Use、沙箱服务、CLI 非管理员权限、Code Review 插件复制、远程配对和登录流程。开发者需要更稳定的安装、权限和图形捕获链路。

2. **Dots / 远程设备状态不透明**  
   用户难以判断任务在云端还是本地执行、Dot 是否接管、连接设备是否在线、网络切换后是否自动恢复。社区明显需要更强的状态展示和恢复机制。

3. **会话隔离和线程恢复需要加强**  
   Linux 桌面出现跨会话内容显示、tool-call 参数过大导致线程永久损坏、大附件导致启动失败等问题，说明复杂会话状态管理仍有边界缺陷。

4. **CLI 用户希望更适合真实开发流程**  
   后台命令唤醒、watcher 事件响应、持久化关闭提醒、非管理员权限可用性，都是典型开发者日常工作流需求。

5. **错误可见性不足**  
   多个报告提到“无明显错误”“输入框灰掉”“queued message 失败但没有提示”“HTTP hang 且 timeout/retry 不触发”。这说明 Codex 需要更清晰的诊断信息、超时策略和用户可见错误状态。

6. **安全与自动化之间的平衡仍在调整**  
   审批弹窗抢焦点、sandbox-writable bubblewrap 防护、Daybreak 安全提醒、Fast/Ultra Fast 策略拆分等，都反映 Codex 正在细化自动执行能力与安全边界之间的控制机制。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报  
**日期：2026-10-06**  
**仓库：google-gemini/gemini-cli**

---

## 1. 今日速览

过去 24 小时，Gemini CLI 发布了新的 nightly 版本 `v0.64.0-nightly.20261006.gfb972b2f8`，同时社区重点集中在 **平台兼容性测试稳定性**、**终端 UI 渲染体验**、**认证流程优化** 与 **遥测配置增强** 上。  
今日新增/更新的 Issue 数量不多，但多个 PR 已直接响应 Windows、CI/headless 环境下的测试失败问题，说明项目正在持续提升跨平台开发体验与自动化测试可靠性。

---

## 2. 版本发布

### v0.64.0-nightly.20261006.gfb972b2f8

- 类型：Nightly Release
- 发布时间：2026-10-06
- 变更对比：  
  https://github.com/google-gemini/gemini-cli/compare/v0.64.0-nightly.20261005.gfb972b2f8...v0.64.0-nightly.20261006.gfb972b2f8

本次发布是自动 nightly 版本推进，对应 PR 为版本号 bump。由于当前数据未给出完整提交明细，建议关注 changelog 中是否包含今日多个测试稳定性、CLI UI、认证与遥测相关修复。

相关 PR：  
- [#29645 chore/release: bump version to 0.64.0-nightly.20261006.gfb972b2f8](https://github.com/google-gemini/gemini-cli/pull/29645)

---

## 3. 社区热点 Issues

> 今日数据中仅有 3 条过去 24 小时内更新的 Issue，因此以下列出全部值得关注的问题。

### 1. Mavlow 扩展未出现在官方扩展 Gallery

- Issue：[#29639](https://github.com/google-gemini/gemini-cli/issues/29639)
- 状态：Open
- 标签：`priority/p2`, `area/extensions`, `kind/bug`, `status/need-information`, `effort/small`
- 作者：kbgamble
- 评论数：3
- 👍：0

**问题概述：**  
开发者反馈其扩展 Mavlow 已发布约 6 天，并声称满足文档中的扩展发现要求，但仍未出现在 Gemini CLI extensions gallery 中。

**为什么重要：**  
扩展生态是 CLI 工具增强能力的重要入口。如果扩展发现机制不透明或存在延迟，会影响第三方开发者的发布体验，也会削弱扩展生态的增长动力。

**社区反应：**  
该 Issue 已有 3 条评论，并被 bot triage，同时标记为需要更多信息。说明维护侧可能正在确认扩展索引、元数据或文档要求是否存在偏差。

---

### 2. Windows 环境缺少 PowerShell 7 时核心 shell 集成测试失败

- Issue：[#29646](https://github.com/google-gemini/gemini-cli/issues/29646)
- 状态：Open
- 标签：`status/need-triage`, `area/platform`
- 作者：supunyasanthaofficial
- 评论数：0
- 👍：0

**问题概述：**  
`packages/core/src/services/shellExecutionService.windows.integration.test.ts` 中的真实 shell 集成测试仅判断是否为 Windows，但没有判断系统是否安装 `pwsh.exe`。在未安装 PowerShell 7 的标准 Windows 环境中，测试会失败。

**为什么重要：**  
Gemini CLI 涉及 shell 执行能力，Windows 兼容性对开发者非常关键。测试对环境依赖判断不充分，会导致本地开发、CI 或贡献者环境出现非代码逻辑导致的失败。

**社区反应：**  
虽然尚无评论，但已经有对应修复 PR [#29647](https://github.com/google-gemini/gemini-cli/pull/29647)，说明问题被快速响应。

---

### 3. 非 TTY/headless 环境下 CLI 测试因工作区信任错误失败

- Issue：[#29634](https://github.com/google-gemini/gemini-cli/issues/29634)
- 状态：Open
- 标签：`status/need-triage`, `area/platform`
- 作者：supunyasanthaofficial
- 评论数：0
- 👍：0

**问题概述：**  
`packages/cli/src/gemini.test.tsx` 中测试用例 `"should NOT load project hooks when workspace is not trusted"` 在非 TTY 或自动化环境中会抛出 `FatalUntrustedWorkspaceError`。受影响场景包括 CI、管道执行、后台进程以及部分 Windows 终端环境。

**为什么重要：**  
该问题直接影响自动化测试和贡献者体验。对于 CLI 项目而言，headless/CI 环境是核心测试场景，测试逻辑不应依赖交互式终端行为。

**社区反应：**  
该问题也已有对应修复 PR [#29635](https://github.com/google-gemini/gemini-cli/pull/29635)，通过 mock `isHeadlessMode` 降低测试对运行环境的依赖。

---

## 4. 重要 PR 进展

### 1. 跳过缺少 `pwsh.exe` 的 Windows shell quoting 集成测试

- PR：[#29647](https://github.com/google-gemini/gemini-cli/pull/29647)
- 状态：Open
- 标签：`area/platform`, `size/xs`
- 作者：supunyasanthaofficial
- 关联 Issue：[#29646](https://github.com/google-gemini/gemini-cli/issues/29646)

**内容：**  
为 `shellExecutionService.windows.integration.test.ts` 增加环境判断，当 Windows 环境中未安装 PowerShell 7 `pwsh.exe` 时跳过相关测试。

**影响：**  
提升 Windows 本地开发和 CI 测试稳定性，避免因环境缺失导致误报失败。

---

### 2. Nightly 版本号自动 bump

- PR：[#29645](https://github.com/google-gemini/gemini-cli/pull/29645)
- 状态：Open
- 标签：`size/s`, `status/need-issue`
- 作者：gemini-cli-robot

**内容：**  
自动将版本推进至 `0.64.0-nightly.20261006.gfb972b2f8`。

**影响：**  
保持 nightly 发布节奏，便于用户和贡献者验证最新变更。

---

### 3. 修复终端宽度变化时静态 UI 未刷新问题

- PR：[#29644](https://github.com/google-gemini/gemini-cli/pull/29644)
- 状态：Open
- 标签：`priority/p1`, `size/m`
- 作者：jvargassanchez-dot

**内容：**  
在 `AppContainer.tsx` 中恢复 `terminalWidth` 变化时的 debounced `refreshStatic()` 效果，使用 100ms debounce。

**影响：**  
修复默认 inline rendering 模式下水平调整终端大小时 UI 不及时刷新的问题。该 PR 被标记为 `priority/p1`，说明对 CLI 交互体验影响较高。

---

### 4. 重新选择 Google 登录时清除缓存凭据

- PR：[#29643](https://github.com/google-gemini/gemini-cli/pull/29643)
- 状态：Open
- 标签：`size/s`, `size/m`, `status/need-issue`
- 作者：urielefrenvirtusa

**内容：**  
在 `AuthDialog` 中，当用户重新选择 `LOGIN_WITH_GOOGLE` 时清除缓存凭据，避免继续使用旧 token。

**影响：**  
改善账号切换和重新认证体验，解决用户被旧凭据“锁住”的问题。对多账号开发者尤其重要。

---

### 5. 遥测配置支持自定义 OTLP Headers

- PR：[#29641](https://github.com/google-gemini/gemini-cli/pull/29641)
- 状态：Open
- 标签：`priority/p2`, `area/agent`, `size/l`, `maintainer only`
- 作者：jesussamuel-byte

**内容：**  
为 Gemini CLI telemetry 配置增加自定义 OTLP headers 支持，可用于向 OTLP HTTP/gRPC endpoint 传递认证信息或自定义元数据。

**影响：**  
增强企业级可观测性集成能力，便于接入 Grafana Cloud、Honeycomb、Datadog 或受认证保护的 OpenTelemetry Collector。

---

### 6. 修复 Ctrl+O 展开内容时终端清屏和滚动重置问题

- PR：[#29640](https://github.com/google-gemini/gemini-cli/pull/29640)
- 状态：Open
- 标签：`priority/p2`, `area/core`, `size/l`, `maintainer only`
- 作者：jesussamuel-byte

**内容：**  
修复按 `Ctrl+O` 展开被截断输出时，部分 VTE 终端如 Terminator 出现空白屏幕或滚动回顶部的问题。

**影响：**  
提升长输出、`/plan` 模式和 pending tool output 场景下的可读性与终端体验，减少 CLI 在复杂输出场景中的交互中断。

---

### 7. 移除 VS Code Companion 启动时 Marketplace 更新检查

- PR：[#29638](https://github.com/google-gemini/gemini-cli/pull/29638)
- 状态：Open
- 标签：`area/core`, `size/l`
- 作者：Sandeep332005
- 关联 Issue：[#29555](https://github.com/google-gemini/gemini-cli/issues/29555)

**内容：**  
移除 `vscode-ide-companion` 每次激活时调用 VS Code Marketplace API 的更新检查逻辑。

**影响：**  
减少扩展启动时的网络请求，降低启动阻塞或变慢风险。该改动对 IDE 集成性能和离线/受限网络环境下的体验有直接帮助。

---

### 8. 升级 `@grpc/grpc-js` 依赖

- PR：[#29637](https://github.com/google-gemini/gemini-cli/pull/29637)
- 状态：Closed
- 标签：`dependencies`, `javascript`, `size/xs`
- 作者：dependabot[bot]

**内容：**  
将 `/tools/caretaker-agent/cloudrun/ingestion-service` 中的 `@grpc/grpc-js` 从 `1.14.4` 升级到 `1.14.5`。

**影响：**  
依赖维护类更新，通常涉及 bugfix、兼容性或安全性改进。该 PR 已关闭，可能已合并或由维护者处理完成。

---

### 9. 升级 `ip-address` 依赖

- PR：[#29636](https://github.com/google-gemini/gemini-cli/pull/29636)
- 状态：Closed
- 标签：`dependencies`, `javascript`, `size/l`
- 作者：dependabot[bot]

**内容：**  
将 `ip-address` 从 `10.2.0` 升级到 `10.7.3`。

**影响：**  
依赖版本跨度较大，可能包含多个修复和行为变化。该 PR 已关闭，需关注是否已合并以及是否对网络解析相关逻辑产生影响。

---

### 10. Mock `isHeadlessMode` 以修复非 TTY 环境下 CLI 测试失败

- PR：[#29635](https://github.com/google-gemini/gemini-cli/pull/29635)
- 状态：Open
- 标签：`area/platform`, `size/xs`
- 作者：supunyasanthaofficial
- 关联 Issue：[#29634](https://github.com/google-gemini/gemini-cli/issues/29634)

**内容：**  
在 `gemini.test.tsx` 中 mock `isHeadlessMode`，避免测试在非 TTY、CI、管道执行或 Windows 终端中触发 `FatalUntrustedWorkspaceError`。

**影响：**  
提升 CLI 测试在自动化环境中的确定性，降低贡献者因运行环境差异遇到的测试失败概率。

---

## 5. 功能需求趋势

### 1. 跨平台与 CI 稳定性成为短期重点

今日多个 Issue/PR 都围绕 Windows、PowerShell、非 TTY、headless 环境展开：

- [#29646](https://github.com/google-gemini/gemini-cli/issues/29646)
- [#29647](https://github.com/google-gemini/gemini-cli/pull/29647)
- [#29634](https://github.com/google-gemini/gemini-cli/issues/29634)
- [#29635](https://github.com/google-gemini/gemini-cli/pull/29635)

这表明社区正在关注 Gemini CLI 在真实开发环境、CI/CD 和 Windows 生态中的一致性表现。

### 2. 终端 UI 体验持续优化

相关 PR：

- [#29644](https://github.com/google-gemini/gemini-cli/pull/29644)
- [#29640](https://github.com/google-gemini/gemini-cli/pull/29640)

重点集中在终端 resize、长输出展开、滚动位置保持、清屏行为等问题。这类改动说明 Gemini CLI 已进入较深的交互体验打磨阶段。

### 3. 认证与账号切换体验受到关注

相关 PR：

- [#29643](https://github.com/google-gemini/gemini-cli/pull/29643)

用户需要更灵活地切换 Google 账号或重新认证，避免缓存 token 导致登录流程不可控。

### 4. 企业级可观测性能力增强

相关 PR：

- [#29641](https://github.com/google-gemini/gemini-cli/pull/29641)

支持自定义 OTLP headers 说明 Gemini CLI 正在增强与企业监控、审计和遥测平台的集成能力。

### 5. 扩展生态发现机制需要更透明

相关 Issue：

- [#29639](https://github.com/google-gemini/gemini-cli/issues/29639)

扩展发布后无法进入 gallery，反映出扩展索引规则、发布流程或文档说明可能需要进一步完善。

---

## 6. 开发者关注点

### 1. 测试不应依赖隐式本地环境

今日两个测试相关问题都指向同一痛点：测试用例需要更明确地检测运行环境，而不是默认存在 `pwsh.exe`、TTY 或交互式终端。

代表问题：  
- [#29646](https://github.com/google-gemini/gemini-cli/issues/29646)  
- [#29634](https://github.com/google-gemini/gemini-cli/issues/29634)

### 2. CLI 交互稳定性仍是高优先级

终端宽度变化、长输出展开、滚动位置等问题会直接影响日常使用体验。相关 PR 优先级较高，说明维护者也将其视为核心体验问题。

代表 PR：  
- [#29644](https://github.com/google-gemini/gemini-cli/pull/29644)  
- [#29640](https://github.com/google-gemini/gemini-cli/pull/29640)

### 3. 账号认证流程需要支持更真实的多账号场景

缓存凭据带来的账号切换困难，是开发者常见痛点。修复重新选择 Google 登录时不清理旧凭据的问题，有助于改善认证流程可控性。

代表 PR：  
- [#29643](https://github.com/google-gemini/gemini-cli/pull/29643)

### 4. IDE 集成应减少启动期网络依赖

VS Code companion 启动时访问 Marketplace API 会带来性能和网络可用性问题。移除该检查有助于提升扩展启动速度，也更适合企业内网或离线环境。

代表 PR：  
- [#29638](https://github.com/google-gemini/gemini-cli/pull/29638)

### 5. 扩展发布体验需要更清晰的反馈链路

扩展满足文档要求但未进入 gallery，说明开发者需要更明确的状态反馈，例如索引周期、校验失败原因、metadata 要求、审核流程等。

代表 Issue：  
- [#29639](https://github.com/google-gemini/gemini-cli/issues/29639)

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
**日期：2026-10-06**  
**仓库：github.com/github/copilot-cli**

## 1. 今日速览

过去 24 小时内，Copilot CLI 发布了多个 1.0.93 / 1.0.92 系列版本，重点集中在 **MCP 认证、配置管理、环境切换、LSP 稳定性与交互体验**。社区 Issue 主要围绕 **Microsoft Entra / OAuth MCP 连接、CLI 交互回退、扩展发现回归、可访问性、离线/BYOK 场景支持、会话索引与大上下文压缩稳定性** 展开。

当前没有新的 Pull Request 更新，说明今日社区反馈明显多于代码合并动态，维护重点可能仍在 triage 与快速修复阶段。

---

## 2. 版本发布

### v1.0.93-1  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.93-1  

**更新摘要：**
- 官方描述为 “Fixes and changes”，未给出更细粒度变更说明。
- 从同期 Issue 来看，该版本可能继续围绕 1.0.92 后的 MCP / OAuth / CLI 交互问题做增量修复。

---

### v1.0.93-0  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.93-0  

**修复内容：**
- 当禁用 sandboxing 时，已预热的 language servers 可在多个 LSP 请求之间保持运行，减少重复启动开销。
- 点击被截断的 compact shell command 后可以展开查看完整命令。

**影响：**
- 对使用 LSP、代码理解、命令审查流程的开发者较重要。
- 改善了长命令可读性，降低误执行或漏审风险。

---

### v1.0.92  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.92  

**主要更新：**
- 新增 `copilot config` 子命令：
  - list
  - read
  - set
  - remove
- 新增会话前 `Ctrl+E` 环境选择器，可在 local 与 cloud run 之间切换。
- Entra 保护的 MCP server 支持静默刷新 access-token-only credentials。
- 修复旧式 HTTP+SSE MCP 连接相关问题。

**影响：**
- `copilot config` 标志着 CLI 配置管理开始走向显式化和脚本化，方便团队统一配置。
- 环境选择器强化了本地 / 云端运行切换能力，适合多环境开发流程。
- MCP 与 Entra 认证增强是近期社区关注的核心方向。

---

### v1.0.92-5  
链接：https://github.com/github/copilot-cli/releases/tag/v1.0.92-5  

**改进：**
- Microsoft Entra 登录后可选择使用哪个账户。
- `/logout` 可登出这些 OAuth session。

**修复：**
- Entra 保护的 MCP server 可以静默续期 access-token-only credentials。

**影响：**
- 对企业用户、多账号用户、远程 MCP server 使用者较关键。
- 改善 OAuth session 管理能力，减少认证状态混乱。

---

## 3. 社区热点 Issues

> 过去 24 小时内共有 9 条 Issue 更新，因此本节列出全部 9 条，而非 10 条。

---

### #5061 Copilot CLI 1.0.92 rejects standard Entra api:// scopes for remote MCP servers  
链接：https://github.com/github/copilot-cli/issues/5061  
状态：OPEN  
作者：teamstap100  
评论：0，👍：0  

**问题摘要：**  
用户反馈 Copilot CLI 1.0.92 会拒绝远程 MCP server 广告的标准 Microsoft Entra delegated scope，尤其是 `api://<application-id>/<scope>` 形式。

**为什么重要：**
- 直接影响企业级 Entra 保护 MCP server 的接入。
- 与近期 release 中 Entra / MCP 认证改动高度相关。
- 如果属实，可能是 1.0.92 引入的新回归。

**社区反应：**
- 当前暂无评论和点赞，但该问题对企业集成场景影响较大，值得优先 triage。

---

### #5060 Turn off "Rewind on double Esc"  
链接：https://github.com/github/copilot-cli/issues/5060  
状态：OPEN  
作者：nayato  
评论：0，👍：0  

**问题摘要：**  
用户希望能够关闭“双击 Esc 触发 rewind”的行为。当前 Esc 在不同上下文中可能用于清空输入、中断任务、停止 agent 或回退上一步，双击容易误触。

**为什么重要：**
- 影响 CLI 交互安全性和可预测性。
- Rewind 属于高影响操作，误触可能导致上下文或任务状态变化。
- 反映出快捷键语义需要更明确的配置选项。

**社区反应：**
- 暂无评论和点赞，但属于典型 UX / 可控性问题。

---

### #5059 Expose agentId in subagentStart hook for secure parent-child policy correlation  
链接：https://github.com/github/copilot-cli/issues/5059  
状态：OPEN  
作者：F4r4m4rz  
评论：0，👍：0  

**问题摘要：**  
`subagentStart` hook 当前只暴露父 session 的 `sessionId`，没有暴露即将启动的 subagent 的 `agentId`。后续 hook 如 `preToolUse` 使用 subagent 的 `agentId` 作为 `sessionId`，导致父子 agent 策略关联困难。

**为什么重要：**
- 影响 agent 安全策略、审计和权限控制。
- 对多 agent / subagent 架构中的治理非常关键。
- 企业用户可能需要基于 parent-child 关系执行精细化安全策略。

**社区反应：**
- 暂无评论和点赞，但需求明确，偏高级集成场景。

---

### #5058 Datadog MCP OAuth token exchange fails: invalid_grant  
链接：https://github.com/github/copilot-cli/issues/5058  
状态：OPEN  
作者：andrii-rymar  
评论：0，👍：0  

**问题摘要：**  
通过 `/mcp` wizard 添加 Datadog 远程 MCP server 时，浏览器授权成功，但 CLI 在 token exchange 阶段失败，报错 `invalid_grant`。

**为什么重要：**
- 影响第三方 MCP server 的实际可用性。
- Datadog 是常见可观测性平台，该问题会阻碍 AI agent 与监控 / 日志系统集成。
- 与 OAuth / MCP 认证链路稳定性相关，是近期高频问题方向。

**社区反应：**
- 暂无评论和点赞，但属于实际接入失败问题，影响面可能扩大。

---

### #5057 Project-level canvas extension discovery regressed between 1.0.87-0 and 1.0.90-0  
链接：https://github.com/github/copilot-cli/issues/5057  
状态：OPEN  
作者：aakash-lufthansa  
评论：0，👍：0  

**问题摘要：**  
项目级 canvas extension 曾可正常工作，但在 CLI 自动升级后不再被发现。日志显示目标扩展数始终为 0，host 没有尝试加载 `.github/extensions/<name>/extension.mjs`。

**为什么重要：**
- 属于明确版本回归，影响扩展机制可靠性。
- 项目级扩展是团队定制 Copilot CLI 行为的重要入口。
- 自动升级后功能失效会削弱用户对稳定性的信任。

**社区反应：**
- 暂无评论和点赞，但回归范围横跨多个版本，值得维护者复现。

---

### #5056 The new color theme introduced in October is a regression  
链接：https://github.com/github/copilot-cli/issues/5056  
状态：OPEN  
作者：StarshipCaptainNemo  
评论：0，👍：0  

**问题摘要：**  
用户认为 10 月引入的新配色相比 9 月版本在可访问性和可读性上退步，例如热力图灰度区分不明显，选中高亮和工作状态颜色对比度下降。

**为什么重要：**
- 影响终端 UI 的可读性和可访问性。
- 对低视力、不同终端主题、不同显示器环境的用户影响明显。
- 说明视觉主题变更需要考虑对比度、可配置性和回退选项。

**社区反应：**
- 暂无评论和点赞，但可访问性问题通常应被优先考虑。

---

### #5055 Support dynamic workflows in BYOK / air-gapped sessions  
链接：https://github.com/github/copilot-cli/issues/5055  
状态：OPEN  
作者：shloimy-wiesel  
评论：0，👍：0  

**问题摘要：**  
在 BYOK / air-gapped session 中，`/workflows` 返回 `Unknown command`，而设置 `COPILOT_OFFLINE=true` 后 workflow tools 被完全移除，即便动态 workflows 本身可在 BYOK model 上运行。

**为什么重要：**
- 直接影响离线、内网、合规环境中的高级功能可用性。
- BYOK 和 air-gapped 是企业部署 AI 工具的重要方向。
- 暴露出功能 gating 与实际模型能力之间存在不一致。

**社区反应：**
- 暂无评论和点赞，但企业离线场景价值较高。

---

### #5054 Automatic compaction keeps timing out  
链接：https://github.com/github/copilot-cli/issues/5054  
状态：OPEN  
作者：ericwangffff  
评论：0，👍：0  

**问题摘要：**  
在 Windows、较大上下文、`xhigh reasoning`、高 token limit 场景下，自动 compaction 经常超时，报错 `summarizer did not settle within 300s`，并几乎每轮重试。

**为什么重要：**
- 影响长会话和大上下文工作流稳定性。
- 自动压缩失败可能导致性能下降、上下文管理失效或任务中断。
- 高 reasoning 模式和超大上下文是高级用户重点使用场景。

**社区反应：**
- 暂无评论和点赞，但问题描述包含较明确环境信息，有助于复现。

---

### #5053 Regression in 1.0.89: ACP sessions stop indexing conversation history and usage  
链接：https://github.com/github/copilot-cli/issues/5053  
状态：OPEN  
作者：yfoel  
评论：0，👍：0  

**问题摘要：**  
从 1.0.88 升级到 1.0.89 后，完成的 ACP session 不再写入本地 `session-store.db` 的 conversation 和 usage index。直接 ACP session 能正常完成，但索引缺失。

**为什么重要：**
- 影响本地会话历史、用量统计、审计和后续分析。
- 属于明确版本回归。
- 如果 session-store 索引是其他工具链的依赖，可能产生连锁问题。

**社区反应：**
- 暂无评论和点赞，但对依赖历史记录和本地数据分析的开发者很关键。

---

## 4. 重要 PR 进展

过去 24 小时内没有 Pull Request 更新。

**观察：**
- 今日项目动态主要集中在 release 与 issue triage。
- 没有新的 PR 说明暂未看到公开代码层面的修复合并。
- 多个 Issue 与近期发布内容高度相关，后续可能会出现针对 MCP OAuth、Entra scope、扩展发现、会话索引等方向的修复 PR。

---

## 5. 功能需求趋势

### 1. MCP 与企业认证集成持续升温  
相关 Issue：  
- #5061：https://github.com/github/copilot-cli/issues/5061  
- #5058：https://github.com/github/copilot-cli/issues/5058  

社区正在集中反馈远程 MCP server 与 OAuth / Microsoft Entra 集成问题。主要痛点包括：
- 标准 Entra `api://` scope 兼容性；
- OAuth token exchange 失败；
- 多账号登录与 OAuth session 管理；
- access token 续期稳定性。

这表明 MCP 正从实验性集成进入实际企业落地阶段，认证兼容性成为关键阻塞点。

---

### 2. CLI 交互可控性和可访问性需求增强  
相关 Issue：  
- #5060：https://github.com/github/copilot-cli/issues/5060  
- #5056：https://github.com/github/copilot-cli/issues/5056  

用户开始关注 Copilot CLI 的交互细节：
- 快捷键是否可关闭；
- rewind 等高影响操作是否容易误触；
- 终端主题颜色是否具备足够对比度；
- UI 变化是否应提供回退或配置项。

这说明 CLI 已被用于更长时间、更复杂任务，用户对稳定交互体验的期望提高。

---

### 3. Agent / Subagent 治理与安全策略能力成为新需求  
相关 Issue：  
- #5059：https://github.com/github/copilot-cli/issues/5059  

随着 subagent 与 hook 机制使用加深，开发者需要更强的：
- agent 身份暴露；
- 父子 agent 关系追踪；
- hook 级安全策略；
- 审计链路关联能力。

这类需求更偏平台化和企业治理，可能会影响未来 Copilot CLI 的 agent runtime API 设计。

---

### 4. 离线、BYOK、air-gapped 场景仍存在功能缺口  
相关 Issue：  
- #5055：https://github.com/github/copilot-cli/issues/5055  

用户希望 dynamic workflows 在 BYOK / air-gapped 环境中可用，而不是被 GitHub 用户数据或 quota gating 间接屏蔽。趋势显示：
- 企业希望在受控环境中使用完整 CLI 能力；
- 本地模型或自带模型场景需要与云端体验尽量一致；
- 离线模式不应简单移除高级工具。

---

### 5. 回归问题集中在扩展、会话存储与长上下文  
相关 Issue：  
- #5057：https://github.com/github/copilot-cli/issues/5057  
- #5054：https://github.com/github/copilot-cli/issues/5054  
- #5053：https://github.com/github/copilot-cli/issues/5053  

多个用户报告升级后出现回归：
- 项目级 canvas extension 不再发现；
- ACP session 不再索引历史与使用数据；
- 自动 compaction 在大上下文下超时。

这说明 Copilot CLI 快速迭代过程中，需要更强的回归测试覆盖，尤其是高级工作流和长期会话场景。

---

## 6. 开发者关注点

### 认证链路稳定性是今日首要痛点  
MCP、OAuth、Microsoft Entra、Datadog 等相关反馈集中出现。开发者希望 Copilot CLI 能更可靠地处理：
- 标准 Entra scope；
- OAuth 授权码交换；
- token 刷新；
- 多账号选择；
- `/logout` 清理 OAuth session。

---

### 自动升级带来的回归风险受到关注  
#5057 与 #5053 都指向“升级后功能退化”。开发者希望：
- 关键行为保持兼容；
- 自动升级前后有清晰变更说明；
- 对扩展发现、session-store、ACP 等内部机制提供更稳定契约。

---

### 长会话与大上下文体验仍需优化  
#5054 反映自动 compaction 在大上下文和高 reasoning 模式下不稳定。开发者关注：
- summarizer 超时处理；
- compaction 重试策略；
- 是否能手动控制压缩；
- 大上下文任务下的性能和可恢复性。

---

### 企业部署能力需求上升  
#5055、#5059、#5061 共同指向企业场景：
- air-gapped / BYOK；
- Entra 认证；
- agent 安全策略；
- workflow 可用性；
- 审计与治理。

Copilot CLI 正被用于更复杂、更受控的开发环境，企业级能力将是后续社区重点。

---

### CLI UX 需要更多配置开关  
从 Esc rewind 到颜色主题，开发者反馈表明：
- 默认行为不能适配所有人；
- 高影响快捷键应可配置；
- 主题和可访问性最好支持用户自定义；
- 交互改动需要兼顾长期用户习惯。

---

## 总结

今日 Copilot CLI 的核心动态是 **1.0.92 / 1.0.93 系列快速发布与 MCP 认证相关问题集中爆发**。社区反馈显示，Copilot CLI 正在从基础命令行助手转向更复杂的企业级 agent 平台，因此 **认证兼容性、离线/BYOK 支持、扩展稳定性、agent 治理、长上下文可靠性** 将成为近期最值得关注的方向。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报  
日期：2026-10-06  
仓库：[`anomalyco/opencode`](https://github.com/anomalyco/opencode)

## 1. 今日速览

过去 24 小时 OpenCode 没有新版本发布，但 Issue 与 PR 活跃度很高，社区重点集中在 **V2 稳定性、安全合规、Desktop/TUI 体验、MCP 与模型接入可靠性**。  
今日新增/更新的问题中，多项涉及潜在安全风险与运行时可靠性，例如 API 泄露 provider 凭据、工具输出未转义导致上下文污染、PTY 无流控导致资源耗尽等。  
PR 侧已有多个对应修复进入推进状态，包括 diff hunk 跳转修复、项目目录重命名迁移、MCP OAuth 触发、未知模型返回 404、桌面浏览器栏重设计等。

---

## 2. 社区热点 Issues

### 1. 工具输出中特殊 chat-template token 未转义，可能污染模型上下文  
Issue：[#53478](https://github.com/anomalyco/opencode/issues/53478)  
状态：Open｜评论：2  

该问题指出 bash、grep、read 等工具输出会原样写回模型上下文，如果输出中包含类似 chat-template 的特殊 token，可能导致本地模型自截断或对话边界被污染。  
重要性较高，属于 **模型上下文安全与 prompt 注入防护** 问题，尤其影响本地模型与兼容 OpenAI Chat Template 的推理后端。社区已有少量讨论，标签为 `needs:compliance`。

---

### 2. Windows Desktop 启动后 5–30 秒静默退出且无日志  
Issue：[#53469](https://github.com/anomalyco/opencode/issues/53469)  
状态：Open｜评论：2  

用户反馈在干净的 Windows 11 环境中，OpenCode Desktop 每次启动后都会在 5–31 秒内退出，且没有 Crashpad、WER、事件日志或 stderr/stdout 记录。  
这是典型的 **可观测性与桌面端稳定性** 问题：不仅影响使用，也缺少诊断入口。社区关注点在于如何补齐崩溃采集和日志链路。

---

### 3. 希望按模型与 Agent 配置 warming 参数  
Issue：[#53457](https://github.com/anomalyco/opencode/issues/53457)  
状态：Open｜评论：2  

当前 `warming` 配置无法按模型或 Agent 精细化设置，而不同模型的冷启动特征差异较大。  
该需求反映出社区对 **多模型运行时调优** 的关注，尤其是本地模型、云模型、长上下文模型在预热成本和响应延迟上的差异化管理。

---

### 4. Kimi K3 通过 NVIDIA NIM 后端时 thinking 阶段卡住  
Issue：[#53426](https://github.com/anomalyco/opencode/issues/53426)  
状态：Open｜评论：2  

用户在 Windows 上通过 npm 安装 CLI 后，使用 Kimi K3 + NVIDIA NIM 后端时，thinking 阶段打印大量 `!` 后停止。Desktop、CLI、清缓存均无法解决。  
该问题涉及 **新模型/第三方推理后端兼容性**，对 OpenCode 的多 provider 生态扩展有参考价值。

---

### 5. MCP server 名称超过 64 字符时工具被静默丢弃  
Issue：[#53400](https://github.com/anomalyco/opencode/issues/53400)  
状态：Open｜评论：2  

当 MCP server 名称标准化后超过 64 字符，其所有工具不会注册，但 `/api/mcp` 仍显示 server 已连接，只有日志中出现错误。  
该问题影响 **MCP 可用性与错误可见性**。静默失败会让用户误以为 MCP 已正常工作，实际工具不可调用。

---

### 6. config 目录任意文件写入都会触发未防抖 reload  
Issue：[#53393](https://github.com/anomalyco/opencode/issues/53393)  
状态：Open｜评论：2  

`ConfigCompatibilityPlugin` 会在全局 config 目录内任何文件系统事件发生时重新加载，且没有 debounce，可能导致 watcher resubscribe loop。  
这是一个 **配置监听与性能稳定性** 问题，尤其对包含 Claude skills、插件或频繁写入配置目录的用户影响明显。

---

### 7. API 返回已解析的 provider 凭据  
Issue：[#53465](https://github.com/anomalyco/opencode/issues/53465)  
状态：Open｜评论：1  

`/api/model`、`/api/config`、`/api/provider/{id}` 会返回 provider settings 中已经从环境变量解析出的明文密钥。  
该问题安全影响较高，属于 **凭据泄露风险**。对于本地服务、桌面端、Web UI 或多用户代理环境都需要重点关注。

---

### 8. PTY 无流控，`yes` 命令可导致 CPU 飙升与内存无限增长  
Issue：[#53473](https://github.com/anomalyco/opencode/issues/53473)  
状态：Open｜评论：1  

复现方式为启动 `opencode serve` 后通过 PTY 执行 `yes`，数秒内 server CPU 达到约 150%，内存增长至数 GB，且输入可能被饿死。  
这是 **资源隔离与后端健壮性** 问题，可能导致本地服务被单个命令拖垮，也涉及终端输出背压与限流设计。

---

### 9. MCP 工具缺少 permission 控制  
Issue：[#53434](https://github.com/anomalyco/opencode/issues/53434)  
状态：Open｜评论：1  

社区请求新增 `mcp` permission key，支持按 MCP server 与 tool pattern 设置 `allow / ask / deny`。  
该需求非常关键，因为 OpenCode 已支持 bash 与 external directory 权限策略，但 MCP 工具作为能力扩展入口，目前缺少同等权限治理。

---

### 10. 工具调用无统一 timeout，未完成工具会永久挂住 step  
Issue：[#53433](https://github.com/anomalyco/opencode/issues/53433)  
状态：Open｜评论：1  

用户反馈某些工具调用永不 settle 时，整个 step 会永久挂起，只能手动 interrupt 或重启进程。  
该问题反映出 **Agent 运行时的超时与取消机制** 仍需完善。对于长任务、多 Agent 委派和外部工具调用场景，这是稳定性的核心基础设施。

---

## 3. 重要 PR 进展

### 1. Desktop 浏览器栏重设计  
PR：[#53488](https://github.com/anomalyco/opencode/pull/53488)  
状态：Open  

实现新的 Desktop browser bar 设计，基于 Figma 中的 states、components 和 tooltips。  
该 PR 属于 **桌面端交互体验升级**，可能影响导航、地址栏、状态展示和整体产品一致性。

---

### 2. 添加 UI 设计 skills 与 design lint，辅助编码 Agent 遵循设计系统  
PR：[#53485](https://github.com/anomalyco/opencode/pull/53485)  
状态：Open  

在 `@opencode/ui` 中内置设计系统规则和 lint，用于让 coding agents 在生成 UI 代码时遵循组件规范。  
这是一个很有代表性的 **AI 辅助开发工作流增强**：不仅让人类开发者受益，也为 Agent 编码提供可执行约束。

---

### 3. 修复 TUI workspace notice timer 未重置问题  
PR：[#53484](https://github.com/anomalyco/opencode/pull/53484)  
状态：Open｜关联 Issue：[#53481](https://github.com/anomalyco/opencode/issues/53481)  

该 PR 在显示新 workspace notice 前取消旧 timer，并在 owner dispose 时清理 timer。  
属于 TUI 小而关键的稳定性修复，可避免通知状态错乱或生命周期泄露。

---

### 4. 修复 diff hunk 跳转在换行渲染下偏移错误  
PR：[#53483](https://github.com/anomalyco/opencode/pull/53483)  
状态：Open｜关联 Issue：[#53480](https://github.com/anomalyco/opencode/issues/53480)  

改用 `DiffRenderable.getHunkRowOffsets()` 来定位 next/previous hunk，而不是基于 raw patch line index 计算。  
该修复直接改善代码审查与 diff 浏览体验，尤其是长行 wrap 后的 TUI 导航准确性。

---

### 5. 移除 V2 packages 中未使用依赖  
PR：[#53482](https://github.com/anomalyco/opencode/pull/53482)  
状态：Open  

清理多个 V2 package manifest 中未被实际 import 的依赖，例如 `ignore`、`google-auth-library` 等。  
该 PR 有助于降低包体积、减少供应链攻击面，并提升依赖维护清晰度。

---

### 6. 项目文件夹重命名后迁移 stale worktree  
PR：[#53475](https://github.com/anomalyco/opencode/pull/53475)  
状态：Open｜关联 Issue：[#53476](https://github.com/anomalyco/opencode/issues/53476)  

修复 git-backed 项目目录重命名后，OpenCode 仍使用旧 worktree path，导致新 session 失败的问题。  
这是项目索引与 session 解析链路的重要修复，影响 Desktop 与 CLI 对项目路径变更的容错能力。

---

### 7. Web UI 按住导航键时恢复全速滚动  
PR：[#53474](https://github.com/anomalyco/opencode/pull/53474)  
状态：Open｜关联 Issue：[#49928](https://github.com/anomalyco/opencode/issues/49928)  

修复按住 PageUp、PageDown、ArrowUp、ArrowDown 时 timeline 滚动过慢的问题。  
该 PR 改善长会话浏览体验，属于高频交互优化。

---

### 8. MCP：为仅在请求时校验认证的 server 触发 OAuth  
PR：[#53468](https://github.com/anomalyco/opencode/pull/53468)  
状态：Open｜关联 Issue：[#26195](https://github.com/anomalyco/opencode/issues/26195)  

部分 Google 官方 MCP connector 在 `initialize`、`ping`、`tools/list` 阶段不会触发 auth，只有实际请求时才要求 OAuth。该 PR 处理这类延迟鉴权场景，并提供配置逃生口。  
对 MCP 生态兼容性非常重要，尤其是 Gmail、Drive、Calendar 等实际生产连接器。

---

### 9. prompt 中指定未知模型时返回 404 而非 500  
PR：[#53464](https://github.com/anomalyco/opencode/pull/53464)  
状态：Open｜关联 Issue：[#47162](https://github.com/anomalyco/opencode/issues/47162)  

当前 `SessionPrompt.getModel` 抛出 `Provider.ModelNotFoundError` 后会被中间件转换为 500。该 PR 将其修正为更合理的 404。  
这提升了 API 语义准确性，也方便客户端对模型不存在场景做用户友好提示。

---

### 10. 修复 app/core/client 中 submission starvation 与 timeout  
PR：[#53458](https://github.com/anomalyco/opencode/pull/53458)  
状态：Open  

该 PR 旨在解决多 Agent 或后台高负载下，用户 prompt、Agent 问题回复、权限确认和命令提交过慢或超时的问题。  
这是今天最值得关注的运行时稳定性 PR 之一，直接关联多 Agent 并发、请求调度与交互响应能力。

---

## 4. 功能需求趋势

### 1. 更细粒度的模型与 Agent 配置  
相关 Issue：[#53457](https://github.com/anomalyco/opencode/issues/53457)、[#53462](https://github.com/anomalyco/opencode/issues/53462)  

社区希望 OpenCode 在模型配置上更灵活，例如按模型/Agent 设置 warming，或允许显式发送 catalog 中不存在但 provider 支持的模型 ID。  
这说明用户正在从“使用内置模型列表”转向“管理复杂多模型运行环境”。

---

### 2. MCP 权限、认证与生态集成  
相关 Issue：[#53400](https://github.com/anomalyco/opencode/issues/53400)、[#53434](https://github.com/anomalyco/opencode/issues/53434)、[#53439](https://github.com/anomalyco/opencode/issues/53439)  
相关 PR：[#53468](https://github.com/anomalyco/opencode/pull/53468)、[#53455](https://github.com/anomalyco/opencode/pull/53455)  

MCP 已成为 OpenCode 扩展能力的核心方向，但社区反馈集中在三类问题：  
- server/tool 注册与错误可见性  
- OAuth 与请求时鉴权兼容性  
- MCP 工具权限治理  

预计 MCP permission、server namespace 校验、认证流程会继续成为后续重点。

---

### 3. Desktop 与 TUI 体验持续打磨  
相关 Issue：[#53469](https://github.com/anomalyco/opencode/issues/53469)、[#53379](https://github.com/anomalyco/opencode/issues/53379)、[#53452](https://github.com/anomalyco/opencode/issues/53452)、[#53480](https://github.com/anomalyco/opencode/issues/53480)  
相关 PR：[#53488](https://github.com/anomalyco/opencode/pull/53488)、[#53483](https://github.com/anomalyco/opencode/pull/53483)、[#53484](https://github.com/anomalyco/opencode/pull/53484)  

社区对 Desktop/Web/TUI 的使用体验提出了不少细节需求，包括：  
- macOS 标准 tab 快捷键  
- TUI 水平分屏终端  
- diff hunk 精准导航  
- Desktop 启动稳定性  
- 新 browser bar 设计  

这表明 OpenCode 正从核心 Agent 能力扩展到更成熟的 IDE/工作台体验。

---

### 4. 安全与合规成为高频主题  
相关 Issue：[#53478](https://github.com/anomalyco/opencode/issues/53478)、[#53465](https://github.com/anomalyco/opencode/issues/53465)、[#53446](https://github.com/anomalyco/opencode/issues/53446)、[#53434](https://github.com/anomalyco/opencode/issues/53434)  

多个 Issue 带有 `needs:compliance`，集中在：  
- 工具输出注入  
- API 泄露明文凭据  
- permission deny 回显完整 bash ruleset  
- MCP 权限缺失  

随着 OpenCode 的工具调用和 MCP 能力增强，安全边界和最小权限原则正在成为社区核心诉求。

---

### 5. 长任务、多 Agent 与运行时超时机制  
相关 Issue：[#53459](https://github.com/anomalyco/opencode/issues/53459)、[#53433](https://github.com/anomalyco/opencode/issues/53433)、[#53473](https://github.com/anomalyco/opencode/issues/53473)  
相关 PR：[#53458](https://github.com/anomalyco/opencode/pull/53458)  

社区希望 OpenCode 提供更可控的执行约束，包括：  
- task delegation 的父级 deadline  
- 工具调用 timeout  
- bounded cancellation  
- PTY 输出背压与资源上限  
- 高负载下提交请求不被饿死  

这说明 OpenCode 的使用场景正向更复杂、更长时间运行的自动化任务演进。

---

## 5. 开发者关注点

### 1. V2 迁移后的项目与 session 兼容性  
多个问题涉及 V1 到 V2 或项目路径变化后的状态不一致：  
- V1 非 git 目录 session 不显示：[#53450](https://github.com/anomalyco/opencode/issues/53450)  
- project folder 重命名后新 session 失败：[#53476](https://github.com/anomalyco/opencode/issues/53476)  
- session move 后路径异常：[#53454](https://github.com/anomalyco/opencode/issues/53454)  
- Desktop 中 `global` 项目重命名保存但不显示：[#53431](https://github.com/anomalyco/opencode/issues/53431)  

开发者希望项目索引、session 归属、worktree path 在边界场景下更可靠。

---

### 2. 错误应更可诊断，而不是静默失败  
典型案例包括：  
- Desktop 静默退出无日志：[#53469](https://github.com/anomalyco/opencode/issues/53469)  
- MCP 工具被丢弃但 server 仍显示 connected：[#53400](https://github.com/anomalyco/opencode/issues/53400)  
- detached HEAD build 生成空 channel 导致 TUI 崩溃：[#53463](https://github.com/anomalyco/opencode/issues/53463)  

社区对“失败可见性”的要求明显提升：错误码、日志、诊断信息和 UI 提示都需要更明确。

---

### 3. API 与 CLI 行为需要更符合开发者预期  
相关反馈包括：  
- `--help` 附带多余参数时仍返回帮助而不报错：[#53472](https://github.com/anomalyco/opencode/issues/53472)  
- prompt 中未知模型应返回 404 而非 500：[#53464](https://github.com/anomalyco/opencode/pull/53464)  
- API 不应返回明文 provider credentials：[#53465](https://github.com/anomalyco/opencode/issues/53465)  

这类问题直接影响自动化脚本、IDE 插件和上层客户端的可靠集成。

---

### 4. 本地模型与第三方 provider 兼容性仍是重点  
Kimi K3 + NVIDIA NIM 卡住：[#53426](https://github.com/anomalyco/opencode/issues/53426)  
Azure migrated `resourceName` 被拒绝：[#53443](https://github.com/anomalyco/opencode/issues/53443)  
显式 provider/model ID 不在 catalog 时被拒绝：[#53462](https://github.com/anomalyco/opencode/issues/53462)  

开发者需要 OpenCode 更好地适配 provider 差异，尤其是私有部署、本地推理和企业云服务场景。

---

### 5. 性能问题集中在长会话、文件监听与高输出工具  
相关问题包括：  
- 长 session 打开前等待最后 100 条消息：[#53428](https://github.com/anomalyco/opencode/issues/53428)  
- config 目录任意写入触发 reload：[#53393](https://github.com/anomalyco/opencode/issues/53393)  
- PTY 高输出命令导致资源耗尽：[#53473](https://github.com/anomalyco/opencode/issues/53473)  
- Web UI 长按导航键滚动慢：[#53474](https://github.com/anomalyco/opencode/pull/53474)  

社区对性能的关注不再局限于模型响应速度，也包括 UI 渲染、事件监听、终端流控和长会话加载。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-10-06

## 1. 今日速览

过去 24 小时 Pi 社区发布了 **v1.0.3 / v1.0.4** 两个版本，重点围绕 **MCP 工具筛选、Azure Foundry Chat Completions、工具兼容性与运行稳定性** 展开。Issue 侧讨论集中在 **MCP 可配置性、模型提供商兼容、Durable 执行语义、Nix/Windows/本地模型环境问题**。PR 方面，多项修复已合入，尤其是 Bash 工具继承会话 shell 设置、ANSI 输出解析、TUI 输入污染等问题。

---

## 2. 版本发布

### v1.0.4

链接：<https://github.com/earendil-works/pi/releases/tag/v1.0.4>

主要更新：

- **工具筛选支持通配符模式**
  - `--tools` 与 `--exclude-tools` 现在支持 `*` 模式。
  - 例如：`--tools read,codemode,'mcp__radius__*'` 可仅保留指定 MCP server 的工具。
- **MCP 工具默认保留逻辑调整**
  - `--tools` 默认不会排除 MCP 工具，除非显式使用 `mcp__` 前缀指定。
- **新增 `--no-mcp`**
  - 可在单次运行中关闭 MCP，方便排查 MCP 工具冲突或启动性能问题。

影响：该版本直接回应了社区对 **MCP 工具数量过多、命名冗长、选择粒度不足** 的反馈，是 MCP 使用体验上的重要改进。

---

### v1.0.3

链接：<https://github.com/earendil-works/pi/releases/tag/v1.0.3>

主要更新：

- **Azure provider 重命名与扩展**
  - `azure-openai-responses` 重命名为 `azure`。
- **支持 Azure Foundry Chat Completions**
  - 新增对 Foundry Chat Completions 部署的支持。
  - 首批包括 `azure/deepseek-v4-pro`。
- **扩展模型接入范围**
  - 为使用 Azure Foundry 托管 DeepSeek 等模型的团队提供更直接的接入路径。

影响：该版本强化了 Pi 在企业云模型平台中的适配能力，尤其适合已有 Azure / Foundry 基础设施的团队。

---

## 3. 社区热点 Issues

### 1. Add Anthropic Claude support to Google Vertex AI provider

链接：<https://github.com/earendil-works/pi/issues/10486>

状态：Closed  
评论数：4

该 Issue 请求在现有 `google-vertex` provider 下直接支持 Anthropic Claude 系列模型，包括 Sonnet、Opus、Haiku。重要性在于，很多企业团队并不直接使用 Anthropic API，而是通过 Google Cloud Vertex AI Model Garden 访问 Claude，并依赖 ADC 等 GCP 身份机制。

社区反应较集中，说明 **企业云平台统一接入多模型** 是 Pi 用户的重要诉求。虽然该 Issue 已关闭且标记为 no-action，但它反映出 provider 抽象层仍有继续扩展的需求。

---

### 2. Local models return file contents in chat instead of writing the file

链接：<https://github.com/earendil-works/pi/issues/10540>

状态：Closed  
评论数：2

用户反馈本地模型在被要求生成文件时，常常直接把文件内容粘贴到聊天中，而不是写入磁盘并返回路径。提议是在默认 system prompt 中明确说明：交付文件应通过写入磁盘完成。

该问题对本地模型使用体验影响较大，尤其是在代码生成、报告生成、配置文件生成场景中。本质上是 **系统提示词对工具行为约束不足** 的问题。

---

### 3. Nix package puts Node 22 first on PATH

链接：<https://github.com/earendil-works/pi/issues/10519>

状态：Open  
评论数：2

Nix 包装器将 Pi 自带的 Node 22 放在 PATH 最前面，导致 Pi 内部 Bash 工具调用的 `node`、`npm`、`npx`、`corepack` 总是来自 Pi 包，而不是用户项目环境。

这是一个高影响的开发环境问题，可能导致项目构建、依赖安装、脚本执行结果与用户本地环境不一致。对 Nix 用户尤其关键，也暴露出 **工具运行环境隔离与继承边界** 的设计问题。

---

### 4. forceSystemPrompt projection hoists later toolsAdded into request tool list

链接：<https://github.com/earendil-works/pi/issues/10489>

状态：Open  
评论数：2

该 Issue 指出，当扩展通过 `before_agent_start` 返回 `systemPrompt` 或启用 `forceSystemPrompt` 时，后续 `toolsAdded` 可能被提升进请求工具列表，引发 prompt cache miss，尤其在 `tool_search` 后更明显。

这是一个偏底层但影响性能和上下文一致性的缺陷。对依赖扩展系统、工具动态加载和 prompt cache 的高级用户来说非常重要。

---

### 5. False skill collision on Windows when cwd and home drive-letter casing differs

链接：<https://github.com/earendil-works/pi/issues/10488>

状态：Open  
评论数：2

Windows 下当当前工作目录使用小写盘符，而 home 目录返回大写盘符时，Pi 可能错误报告 skill 名称冲突。该问题与路径规范化有关。

重要性在于它影响 Windows 用户的 skill 发现与加载体验，尤其是同时使用全局 skill 和项目 skill 的场景。它也再次说明跨平台路径处理仍是 Pi 生态中的高频边界问题。

---

### 6. Preserve oversized final bash output after rolling-buffer trimming

链接：<https://github.com/earendil-works/pi/issues/10482>

状态：Open  
评论数：2

用户希望在 Bash 输出超过滚动缓冲限制时，仍保留超长最后一行的尾部内容。目前在输出很长且以换行结束时，关键 sentinel 可能被裁剪掉。

这对测试、构建日志、长输出诊断非常重要。模型面对被截断的输出时，可能无法看到真正的错误尾部，从而影响调试准确性。

---

### 7. MCP: allow configuring or removing MCP tool name prefixes

链接：<https://github.com/earendil-works/pi/issues/10541>

状态：Closed  
评论数：1

该 Issue 请求允许配置或移除 `mcp__<server>__` 工具名前缀。用户场景是将 Pi 作为底层 harness，为平台用户托管聊天机器人，而 prompt 和 skills 中需要引用工具名。

虽然已关闭，但它与 v1.0.4 中 MCP 工具筛选增强高度相关。社区正在关注 **MCP 工具命名、可读性、稳定引用** 等问题。

---

### 8. cloudflare-ai-gateway catalog skips DeepSeek, xAI, Qwen and other upstreams

链接：<https://github.com/earendil-works/pi/issues/10539>

状态：Closed  
评论数：1

用户指出内置 `cloudflare-ai-gateway` catalog 仅包含 `openai/*`、`anthropic/*` 和 `workers-ai/*`，遗漏 DeepSeek、xAI、Qwen、Moonshot 等上游模型。

该问题体现了模型目录更新速度与聚合网关支持范围之间的差距。随着多模型网关普及，用户希望 Pi 的 `/model` 能准确反映网关真实可用模型。

---

### 9. Per-model overrides for hideThinkingBlock

链接：<https://github.com/earendil-works/pi/issues/10537>

状态：Closed  
评论数：1

用户希望按模型配置是否显示 thinking block，例如通过 `hideThinkingBlockByModel` 针对 `provider/modelId` 覆盖全局设置。

该需求反映出不同模型在 reasoning 输出上的行为差异很大，统一开关不足以满足实际使用。社区正在从全局配置走向 **模型级细粒度体验控制**。

---

### 10. Cache warming stops immediately for sessions on a virtual model

链接：<https://github.com/earendil-works/pi/issues/10536>

状态：Closed  
评论数：1

用户反馈在使用 `registerVirtualModel` 注册的虚拟模型会话中，`cacheWarming: "idle"` 无法持续刷新，`/session` 显示 warmer inactive。

这对使用扩展路由、虚拟模型或自定义模型调度的用户很关键。它说明 Pi 的 cache warming 机制仍需更好适配虚拟模型和扩展模型抽象。

---

## 4. 重要 PR 进展

> 过去 24 小时共更新 9 条 PR，因此本节覆盖全部重要 PR。

### 1. fix(coding-agent): extension bash tools inherit session shell settings

链接：<https://github.com/earendil-works/pi/pull/10538>

状态：Closed

该 PR 修复扩展注册的 Bash 工具没有继承会话中的 `shellPath` 和 `shellCommandPrefix` 的问题。同时在 Windows Bash discovery 中跳过 WSL launcher，避免错误选择 shell。

重要性：提升扩展工具在多平台、多 shell 环境下的一致性，尤其对 Windows 和自定义 shell 用户影响较大。

---

### 2. fix(durable): reject waits that close a cycle

链接：<https://github.com/earendil-works/pi/pull/10533>

状态：Open

该 PR 修复 Durable 任务等待形成环时可能挂起的问题。现在当某个 wait 会闭合循环时，会立即失败，而不是进入无法完成的状态。

重要性：Durable 执行语义的可靠性增强，适合长任务、多任务编排和 serverless 场景。

---

### 3. Add awaits to tool search functions in the system prompt

链接：<https://github.com/earendil-works/pi/pull/10530>

状态：Closed

该 PR 在 system prompt 中明确 tool search 函数是异步函数，避免模型生成不带 `await` 的 `searchTools` 调用，导致无结果后退回扫描 `ALL_TOOLS`。

重要性：这是典型的 prompt-level 行为修复，可减少无效工具调用和 token 浪费。

---

### 4. refactor nix package

链接：<https://github.com/earendil-works/pi/pull/10528>

状态：Closed

该 PR 重构 Nix packaging，使构建流程更接近 release 包发布方式，切换到 `bun` 构建，并支持覆盖 plugin installation provider。

重要性：改善 Nix 用户的安装和构建体验，也与当前 Nix PATH 相关 Issue 形成上下文关联。

---

### 5. fix(ai): inline $ref tool schemas for NVIDIA NIM models

链接：<https://github.com/earendil-works/pi/pull/10521>

状态：Open

该 PR 处理 NVIDIA NIM 模型在工具参数中返回 JSON 字符串的问题，尤其是 schema 中只通过本地 `$ref` 描述对象时，`validateToolArguments` 会拒绝模型输出。

重要性：提升 NVIDIA NIM、Nemotron、Qwen 等模型的工具调用兼容性，是多模型适配的重要修复。

---

### 6. feat(durable): support entry cutoffs in conversation context

链接：<https://github.com/earendil-works/pi/pull/10513>

状态：Open

该 PR 为 Durable conversation context 增加 entry cutoff 支持，用于控制进入上下文的会话条目边界。

重要性：有助于长上下文管理、任务恢复和历史裁剪，是 Durable 能力走向生产化的重要基础。

---

### 7. Prune managed installs

链接：<https://github.com/earendil-works/pi/pull/10511>

状态：Open

该 PR 调整 managed install 清理策略，只保留新 release 和执行更新时使用的版本。

重要性：减少长期使用中的磁盘占用，改善自动更新后的本地安装管理。

---

### 8. fix(coding-agent): preserve ANSI state across user bash output chunks

链接：<https://github.com/earendil-works/pi/pull/10503>

状态：Closed

该 PR 修复 ANSI 转义序列跨 chunk 被拆分时污染 Bash 输出的问题。例如 `ESC[0m` 被拆开后，尾部 `m` 可能残留到文本中。

重要性：保证终端输出、保留上下文和模型可见 Bash 结果的准确性，直接对应 Issue #10504。

---

### 9. fix(tui): consume mintty OSC 4 replies

链接：<https://github.com/earendil-works/pi/pull/10495>

状态：Closed

该 PR 处理 mintty 中 OSC 4 palette replies 进入编辑器输入的问题，包括对无 OSC introducer 的回复进行消费、缓冲拆分回复，并增加解析器与 TUI 回归测试。

重要性：提升 Windows/mintty 终端环境下 TUI 稳定性，避免控制序列污染用户输入。

---

## 5. 功能需求趋势

### 1. MCP 工具体验继续成为焦点

相关链接：

- <https://github.com/earendil-works/pi/issues/10541>
- <https://github.com/earendil-works/pi/releases/tag/v1.0.4>

社区关注点包括：

- MCP 工具名前缀是否可配置或移除
- 如何用通配符筛选特定 MCP server 的工具
- 如何在单次运行中禁用 MCP
- MCP 工具是否会干扰 prompt、skills 或平台封装

v1.0.4 已经通过 `--tools` / `--exclude-tools` 通配符和 `--no-mcp` 给出部分回应。

---

### 2. 多模型与云模型提供商支持持续扩张

相关链接：

- <https://github.com/earendil-works/pi/issues/10486>
- <https://github.com/earendil-works/pi/issues/10539>
- <https://github.com/earendil-works/pi/pull/10521>
- <https://github.com/earendil-works/pi/releases/tag/v1.0.3>

主要方向：

- Azure Foundry Chat Completions
- Google Vertex AI 上的 Claude
- Cloudflare AI Gateway 的 DeepSeek、xAI、Qwen、Moonshot
- NVIDIA NIM 模型工具调用兼容性

Pi 用户显然希望 Pi 能成为统一的多模型开发入口，而不只是支持少数主流 API。

---

### 3. Durable / Serverless 执行语义增强

相关链接：

- <https://github.com/earendil-works/pi/issues/10535>
- <https://github.com/earendil-works/pi/issues/10534>
- <https://github.com/earendil-works/pi/pull/10533>
- <https://github.com/earendil-works/pi/pull/10513>

高频诉求包括：

- 等待状态持久化
- retry backoff 不应阻塞进程
- 多进程 / 多 writer ownership lost 语义
- 等待环检测
- conversation context cutoff

这说明 Pi Durable 正在从实验性能力向生产级任务编排能力演进。

---

### 4. 开发环境一致性与跨平台兼容

相关链接：

- <https://github.com/earendil-works/pi/issues/10519>
- <https://github.com/earendil-works/pi/issues/10488>
- <https://github.com/earendil-works/pi/pull/10538>
- <https://github.com/earendil-works/pi/pull/10495>

重点问题：

- Nix 包覆盖用户 PATH
- Windows 盘符大小写导致 skill 冲突
- Windows Bash discovery 误选 WSL launcher
- mintty 控制序列污染输入

Pi 的用户环境复杂度较高，社区对“在我的 shell / OS / 包管理器中行为一致”的要求正在上升。

---

### 5. 模型行为控制从全局走向细粒度

相关链接：

- <https://github.com/earendil-works/pi/issues/10537>
- <https://github.com/earendil-works/pi/issues/10540>
- <https://github.com/earendil-works/pi/pull/10530>

趋势包括：

- 按模型控制 thinking block
- 通过 system prompt 约束本地模型输出文件行为
- 在 prompt 中明确异步工具函数调用方式

这表明 Pi 用户正在要求更精细的模型行为调优能力，而不只是统一默认提示词。

---

## 6. 开发者关注点

### 1. 工具调用可靠性仍是核心痛点

多个 Issue / PR 都围绕工具调用展开，包括 MCP 工具筛选、tool search 是否需要 `await`、NVIDIA NIM `$ref` schema、Anthropic API 拒绝 `strict: true` 等。

开发者希望 Pi 在不同模型和 provider 下保持一致的工具调用语义，避免每个后端都产生特殊失败模式。

---

### 2. Shell 环境必须尊重用户项目上下文

Nix PATH 覆盖、扩展 Bash 工具未继承 session shell、Windows shell discovery 等问题说明，用户非常在意 Pi 执行命令时是否真正处在“项目自己的环境”中。

对 coding agent 来说，错误的 Node、npm 或 shell 可能直接导致错误修复、错误测试结果和不可复现行为。

---

### 3. 长会话性能与上下文裁剪受到关注

`forceSystemPrompt` 引发 prompt cache miss、`emitBoundary` 重建上下文、Bash 输出裁剪、Durable entry cutoff 等问题都指向一个共同主题：长会话下的上下文管理需要更高效、更可控。

这对高强度代码代理、长期任务和自动化工作流非常关键。

---

### 4. 本地模型和非主流模型需要更多 prompt / schema 适配

本地模型倾向于把文件内容直接输出到 chat，NVIDIA NIM 模型会返回特殊 JSON 字符串，Cloudflare Gateway catalog 也存在覆盖不足。社区反馈表明，Pi 的多模型支持不只是“能发请求”，还需要适配模型实际行为差异。

---

### 5. Windows 与终端兼容性仍需持续打磨

Windows 盘符大小写、mintty OSC 回复、WSL launcher 识别等问题说明，跨平台终端环境仍然容易出现边界 bug。对广泛采用的 AI coding agent 来说，这类问题虽然细碎，但会直接影响日常可用性。

---

## 总结

今天 Pi 社区的主线是 **多模型接入、MCP 工具治理、执行环境一致性和 Durable 可靠性**。v1.0.4 对 MCP 工具筛选做出实质改进，v1.0.3 则增强了 Azure Foundry 模型接入能力。与此同时，社区反馈显示 Pi 正在进入更复杂的生产使用场景：多 provider、多 shell、多 OS、多任务编排以及长会话上下文管理都成为开发者关注重点。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-10-06）

## 1. 今日速览

Qwen Code 今日发布 **v0.25.0**，核心亮点是引入本地 workspace-agent 协作能力，同时 Desktop 与 TypeScript SDK 也同步更新到对应版本。社区讨论主要集中在 **多 Agent / Managed Agent、会话取消与恢复、Memory Agent 配置、安全边界、WeChat 集成回归、CI 稳定性** 等方向。

过去 24 小时内 Issue 与 PR 活跃度较高：新增或更新 Issue 32 条、PR 37 条。多项修复 PR 已对近期高优先级问题给出响应，例如 WeChat 登录、LSP 能力声明、JSONL 读取、模糊编辑、token 显示和 CI 失败等。

---

## 2. 版本发布

### v0.25.0：Release v0.25.0

链接：https://github.com/QwenLM/qwen-code/releases/tag/v0.25.0

**主要变化：**

- 新增本地 workspace-agent 协作能力  
  PR：https://github.com/QwenLM/qwen-code/pull/11206
- 官方说明中标注：**无已知 Breaking Changes**
- 同步发布：
  - **SDK TypeScript v0.1.18**
    - 捆绑 CLI 版本：`0.25.0`
  - **Qwen Code Desktop v0.25.0**
    - 包含 session 创建失败诊断保留、Java SDK managed runtime 等相关改动

**观察：**

v0.25.0 的重点明显偏向 Agent 协作与托管运行时能力，为后续多 Agent、Web Shell、Channel、Automation 等方向铺路。但从当日 Issue 看，新版本也暴露出部分集成和会话边界问题，尤其是 WeChat 集成回归与 cancellation 语义相关问题。

---

## 3. 社区热点 Issues

### 1. WeChat 集成在 v0.25.0 中不可用

链接：https://github.com/QwenLM/qwen-code/issues/13480

**问题摘要：**  
用户在执行 `qwen channel configure-weixin` 扫码时，iOS WeChat 报错：`please upgrade WeChat interface version in OpenClaw`。

**重要性：**

- 标记为 `priority/P1`
- 直接影响 WeChat Channel 的可用性
- 属于 v0.25.0 后的集成回归问题

**社区反应：**  
评论数 4，已有对应修复 PR #13482，说明维护者响应较快。

---

### 2. `memory.agentMaxTurns` 在 user-scoped memory dream 中被忽略

链接：https://github.com/QwenLM/qwen-code/issues/13458

**问题摘要：**  
文档声明 `memory.agentMaxTurns` 和 `agentTimeoutMinutes` 可控制后台 memory agent 预算，但 `planUserAutoMemoryDreamByAgent` 中硬编码使用 `MAX_TURNS2 = 8`，未读取配置。

**重要性：**

- 标记为 `priority/P2`
- 涉及 Memory Agent 的配置可信度
- 会造成用户配置与实际行为不一致

**社区反应：**  
评论数 5，是今日讨论最多的 Issue。该问题还拆分出后续配置粒度与错误信息体验问题。

---

### 3. Managed Agent 取消后的输入可能被后续 Host run 重放

链接：https://github.com/QwenLM/qwen-code/issues/13463

**问题摘要：**  
Web Shell 验收中发现：某些取消后的 managed-agent 输入，在后续 Host run 中存在语义边界风险，可能被重新带入上下文。

**重要性：**

- 涉及 `session-management`、`multi-agent`、`web-shell`
- 与 cancellation、上下文隔离、安全语义相关
- 对多 Agent 场景的可靠性影响较大

**社区反应：**  
评论数 4，属于需要讨论的问题，说明边界定义仍在收敛中。

---

### 4. Hosted Harness 中被取消的 tool-profile turn 可能重新进入模型上下文

链接：https://github.com/QwenLM/qwen-code/issues/13487

**问题摘要：**  
作为 #13463 的验证拆分问题，该 Issue 指出在 hosted harness 中，取消的 tool-profile turn 在特定路径下可能重新进入后续模型上下文。

**重要性：**

- 标记为 `priority/P2`
- 影响 Hosted Harness 的取消恢复语义
- 对测试基线和 managed runtime 可靠性有直接影响

**社区反应：**  
评论数 4，问题描述包含较完整的验证范围和分支分析，适合后续作为回归测试依据。

---

### 5. 加载需要鉴权的插件仓库时卡住

链接：https://github.com/QwenLM/qwen-code/issues/13447

**问题摘要：**  
启动时加载需要鉴权的插件仓库，Git 弹出用户名输入框但无法输入，也无法跳过，导致 Qwen Code 卡住。

**重要性：**

- 标记为 `priority/P1`
- 影响插件仓库、Git 鉴权、启动流程
- 对 CLI 用户体验影响明显

**社区反应：**  
评论数 4，Issue 已关闭，后续又衍生出 #13459，用于改进失败原因展示。

---

### 6. POSIX Shell 取消后仍留下忽略 TERM 的后代进程

链接：https://github.com/QwenLM/qwen-code/issues/13441

**问题摘要：**  
取消普通 POSIX Shell 命令后，如果进程组 leader 退出，忽略 TERM 的 descendant 进程可能继续存活。

**重要性：**

- 影响 shell tool 的取消语义
- 涉及进程组、pty、子进程清理
- 对长任务、自动化运行和资源释放都很关键

**社区反应：**  
评论数 4，目前等待反馈。该问题与 managed-agent worker 生命周期治理方向一致。

---

### 7. 文档引用不存在的 `@qwen-code/node-repl-mcp@0.1.7`

链接：https://github.com/QwenLM/qwen-code/issues/13501

**问题摘要：**  
computer-use 文档中引用了 npm 上不存在的 `@qwen-code/node-repl-mcp@0.1.7`，导致用户按文档无法安装。

**重要性：**

- 标记为 `priority/P1`
- 涉及 MCP、文档、packaging
- 直接影响 computer-use 功能的 onboarding

**社区反应：**  
评论数 3，属于高优先级文档/发布一致性问题。

---

### 8. XML tool-call recovery 会误调度参数值中引用的 markup

链接：https://github.com/QwenLM/qwen-code/issues/13492

**问题摘要：**  
`extractXmlToolCalls` 会把参数值里“引用”的 XML 工具调用示例误识别为真实调用，导致原本的 `write_file` 内容被丢弃并触发错误调度。

**重要性：**

- 涉及核心工具调用解析
- 可能造成错误工具执行
- 对安全性和可预测性影响较大

**社区反应：**  
评论数 3，问题描述给出明确复现语义，适合作为解析器 hardening 的测试样例。

---

### 9. Workspace 级 Memory Agent 配置可能移除自动批准 Agent 的 turn/time 限制

链接：https://github.com/QwenLM/qwen-code/issues/13477

**问题摘要：**  
仓库内 `.qwen/settings.json` 可以设置 `memory.agentMaxTurns` 和 `memory.agentTimeoutMinutes`，这些配置会影响五类自动批准的 memory agents，且缺少剥离或警告机制。

**重要性：**

- 标记为 `category/security`
- 涉及 workspace 信任边界
- 克隆仓库可能改变后台 agent 预算，存在安全与资源风险

**社区反应：**  
评论数 3，已进入需要讨论状态。该问题反映出配置作用域与安全策略需要进一步明确。

---

### 10. Fuzzy edit 以换行结尾时可能删除后续空行

链接：https://github.com/QwenLM/qwen-code/issues/13483

**问题摘要：**  
EditTool 在进行 fuzzy match 时，如果 `old_string` 以换行结尾，可能误删匹配行后的空白行。

**重要性：**

- 涉及文件编辑工具正确性
- 影响自动代码修改的稳定性
- 已标记 `status/in-review`

**社区反应：**  
评论数 3，并已有对应修复 PR #13484，说明问题处理进展较快。

---

## 4. 重要 PR 进展

### 1. 修复 WeChat QR 登录缺少 iLink headers

链接：https://github.com/QwenLM/qwen-code/pull/13482

**内容：**  
`qwen channel configure-weixin` 获取登录二维码时，补充 `iLink-App-Id`、`iLink-App-ClientVersion`、`Content-Type` 等 headers。

**对应问题：**  
修复 v0.25.0 中 WeChat 扫码登录失败问题。  
Issue：https://github.com/QwenLM/qwen-code/issues/13480

---

### 2. Session-centric multi-agent collaboration

链接：https://github.com/QwenLM/qwen-code/pull/13467

**内容：**  
将 workspace-agent 协作从 thread/ticket 模式调整为 session-centric 模式。用户可在普通 chat session 中通过 `@mention` 调用 agent，并在同一会话中查看回复、状态、工具步骤和 token 使用情况。

**意义：**

- 明显提升多 Agent 协作的交互自然度
- 与 v0.25.0 的 workspace-agent 能力方向一致
- 是后续 Agent 协同体验的重要基础

---

### 3. Web Shell 支持取消无输出 prompt 后恢复到输入框

链接：https://github.com/QwenLM/qwen-code/pull/13488

**内容：**  
当用户在 Web Shell 中取消尚未产生输出的 prompt 时，系统会将文本、图片、文件和 tags 放回 composer，并移除该 turn。

**意义：**

- 改善误提交 prompt 后的恢复体验
- 降低 cancellation 造成的上下文污染风险
- 与近期多个 cancellation issue 方向一致

---

### 4. 修复 LSP 动态注册能力声明错误

链接：https://github.com/QwenLM/qwen-code/pull/13494

**内容：**  
停止声明不支持的 LSP dynamic registration 能力，包括 completion、hover、definition、references、document symbols、code actions 等。

**对应问题：**  
Issue：https://github.com/QwenLM/qwen-code/issues/13491

**意义：**  
避免 LSP server 发起 `client/registerCapability` 后被客户端以 `Method not supported` 拒绝，提升 IDE/LSP 集成兼容性。

---

### 5. 修复 JSONL 前缀读取超出预算

链接：https://github.com/QwenLM/qwen-code/pull/13486

**内容：**  
当 bounded JSONL read 达到读取预算后立即停止，不再消费完整的下一物理行。

**对应问题：**  
Issue：https://github.com/QwenLM/qwen-code/issues/13485

**意义：**

- 降低大文件场景下的额外 I/O 和内存风险
- 改善 session header 读取性能
- 对长会话日志处理很重要

---

### 6. 修复 fuzzy edit 行边界处理

链接：https://github.com/QwenLM/qwen-code/pull/13484

**内容：**  
保护 fuzzy edit 后续空行，确保 occurrence counting、replacement 和隐式换行删除都限制在完整 canonical line match 内。

**对应问题：**  
Issue：https://github.com/QwenLM/qwen-code/issues/13483

**意义：**  
提升 EditTool 对代码和文本文件的编辑精度，减少自动修改带来的意外 diff。

---

### 7. Memory Agent 停止时展示可读错误原因

链接：https://github.com/QwenLM/qwen-code/pull/13466

**内容：**  
后台 memory agent 未达成目标而停止时，不再直接暴露内部 token，例如 `MAX_TURNS`，而是展示更可读的错误原因。

**对应问题：**  
Issue：https://github.com/QwenLM/qwen-code/issues/13465

**意义：**

- 改善 `/dream` 等 memory 功能的错误体验
- 降低内部实现细节泄漏
- 有助于用户理解 turn cap、timeout 等限制

---

### 8. Managed Agent EventTransport message-envelope contract

链接：https://github.com/QwenLM/qwen-code/pull/13498

**内容：**  
新增跨节点 EventTransport 的 message envelope contract，属于 #12380 中 MQ/Redis transport 延后范围的 H0 基础工作。

**意义：**

- 为跨节点 managed-agent 事件传输打基础
- 当前为 TypeScript contract、fixtures 和 negative tests，尚无 runtime consumer
- 指向未来分布式 agent runtime

---

### 9. Stage H5 Channel contracts and persistence

链接：https://github.com/QwenLM/qwen-code/pull/13497

**内容：**  
为 H5 Channel 阶段新增 channel foundation，包括 `/v1/agent-channels` API route shape、connection listing、route bindings 和 outbound delivery 持久化等 contract。

**意义：**

- 推动 Agent Channel 能力落地
- 与 WeChat、Email、未来外部通道集成方向相关
- 为多通道 Agent 交互建立公共模型

---

### 10. 修复 nightly release Docker 磁盘空间问题

链接：https://github.com/QwenLM/qwen-code/pull/13481

**内容：**  
在 nightly release 的 Docker integration lane 中，构建 sandbox image 前增加 BuildKit cache 清理，并对 data root 做空间 gate。

**对应问题：**  
Issue：https://github.com/QwenLM/qwen-code/issues/13479

**意义：**

- 提升 nightly release 稳定性
- 降低 GitHub runner 磁盘耗尽导致的发布失败
- 对持续发布链路很关键

---

## 5. 功能需求趋势

### 1. 多 Agent 与 Managed Agent 架构持续升温

相关链接：

- Session-centric multi-agent collaboration：https://github.com/QwenLM/qwen-code/pull/13467
- EventTransport contract：https://github.com/QwenLM/qwen-code/pull/13498
- EventTransport design：https://github.com/QwenLM/qwen-code/pull/13500
- Stage H4/H5/H6 designs：https://github.com/QwenLM/qwen-code/pull/13499
- Channel contracts：https://github.com/QwenLM/qwen-code/pull/13497

**趋势判断：**  
社区和维护者正在把 Qwen Code 从单 CLI 助手推进到多 Agent、跨会话、跨节点、跨通道的执行平台。设计文档和 contract 先行，说明团队在为后续大规模 runtime 能力做架构铺垫。

---

### 2. 会话取消、恢复与上下文隔离成为高频主题

相关链接：

- Managed Agent cancellation replay：https://github.com/QwenLM/qwen-code/issues/13463
- Hosted Harness cancelled turns：https://github.com/QwenLM/qwen-code/issues/13487
- Web Shell cancelled prompt recovery：https://github.com/QwenLM/qwen-code/pull/13488
- Cancellation recovery invariant tests：https://github.com/QwenLM/qwen-code/issues/13478

**趋势判断：**  
随着 Web Shell、Hosted Runtime、多 Agent 场景增加，取消操作不再只是 UI 行为，而是涉及上下文污染、模型输入边界和任务生命周期的核心语义。

---

### 3. Memory Agent 配置、安全边界与可观测性受到关注

相关链接：

- `memory.agentMaxTurns` 被忽略：https://github.com/QwenLM/qwen-code/issues/13458
- Workspace 配置影响 Memory Agent 限制：https://github.com/QwenLM/qwen-code/issues/13477
- Memory Agent 停止原因展示：https://github.com/QwenLM/qwen-code/issues/13465
- Per-agent budget keys：https://github.com/QwenLM/qwen-code/issues/13490

**趋势判断：**  
用户希望 Memory Agent 的行为更加可配置、可解释，同时也需要明确 user/workspace 配置的安全边界。未来可能需要更细粒度的 per-agent budget 配置和配置来源告警机制。

---

### 4. Channel / 外部集成进入活跃修复期

相关链接：

- WeChat 集成失败：https://github.com/QwenLM/qwen-code/issues/13480
- WeChat headers 修复：https://github.com/QwenLM/qwen-code/pull/13482
- H5 Channel contracts：https://github.com/QwenLM/qwen-code/pull/13497

**趋势判断：**  
外部 Channel 是 Qwen Code 扩展的重要方向，但接口版本、headers、鉴权、消息投递持久化等细节仍需要快速迭代。

---

### 5. 工具调用与文件编辑可靠性仍是核心需求

相关链接：

- XML tool-call recovery 误触发：https://github.com/QwenLM/qwen-code/issues/13492
- Fuzzy edit 删除空行：https://github.com/QwenLM/qwen-code/issues/13483
- Fuzzy edit 修复 PR：https://github.com/QwenLM/qwen-code/pull/13484

**趋势判断：**  
开发者对 AI 自动修改代码的容错率很低。工具调用解析和编辑边界必须更保守、更可预测，否则容易造成错误执行或错误 diff。

---

## 6. 开发者关注点

### 1. “取消”必须具备强语义保证

多个 Issue 指向同一痛点：用户取消任务后，不希望任何残留输入、tool profile、子进程或上下文在后续任务中复活。  
这对 Web Shell、Hosted Runtime、多 Agent 和后台任务都很关键。

代表链接：

- https://github.com/QwenLM/qwen-code/issues/13463
- https://github.com/QwenLM/qwen-code/issues/13487
- https://github.com/QwenLM/qwen-code/issues/13441

---

### 2. 配置必须可预测，并且区分信任边界

Memory Agent 的 turn/time budget、workspace settings、user settings 的优先级和安全影响正在成为社区关注焦点。  
开发者希望配置文档、实际行为和安全策略保持一致。

代表链接：

- https://github.com/QwenLM/qwen-code/issues/13458
- https://github.com/QwenLM/qwen-code/issues/13477
- https://github.com/QwenLM/qwen-code/issues/13490

---

### 3. 发布与文档一致性需要加强

文档引用不存在的 npm 包、nightly release 失败、CI 多次失败，说明发布链路和文档链路仍有稳定性压力。

代表链接：

- https://github.com/QwenLM/qwen-code/issues/13501
- https://github.com/QwenLM/qwen-code/issues/13479
- https://github.com/QwenLM/qwen-code/issues/13471
- https://github.com/QwenLM/qwen-code/issues/13503

---

### 4. 外部集成的兼容性会直接影响采用

WeChat 集成回归属于 P1 问题，说明 Channel 类能力一旦发布，就需要更强的兼容性测试和回归保障。

代表链接：

- https://github.com/QwenLM/qwen-code/issues/13480
- https://github.com/QwenLM/qwen-code/pull/13482

---

### 5. AI 代码编辑需要更高精度的边界控制

开发者对文件编辑工具的要求是“不多删、不误改、不跨边界”。Fuzzy edit、XML tool-call recovery 等问题反映出工具层需要持续 hardening。

代表链接：

- https://github.com/QwenLM/qwen-code/issues/13483
- https://github.com/QwenLM/qwen-code/pull/13484
- https://github.com/QwenLM/qwen-code/issues/13492

---

## 总结

今天 Qwen Code 的关键词是：**v0.25.0 发布、多 Agent 协作、Managed Runtime、取消语义、Memory Agent 配置安全、Channel 集成修复**。  
从社区反馈看，项目正在快速从 CLI 工具演进为多 Agent 开发平台，但随之而来的会话隔离、任务取消、配置边界和发布稳定性问题，已经成为开发者最关注的工程化挑战。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026-10-06）

## 1. 今日速览

过去 24 小时没有新版本发布，但社区围绕“长时间等待/超时边界”“人工交互阻塞”“OAuth/PKCE 登录窗口”“MCP 工具可见性与恢复提示”等稳定性问题集中提交 Issue 和 PR。  
PR 侧出现一批围绕 Runtime API、工具调用、HTTP 请求、OCR、Pandoc、Git 子进程等“防挂死”修复，说明项目近期重点正在从功能扩展转向运行时韧性与可观测性。

---

## 2. 社区热点 Issues

> 过去 24 小时内仅有 6 条 Issue 更新，因此以下列出全部值得关注的 Issue。

### 1. UI 等待 `request_user_input` 超过 600 秒后被 watchdog 杀死  
- Issue：[#6872](https://github.com/codewhale-hq/Codewhale/issues/6872)  
- 状态：OPEN  
- 标签：`needs-triage`  
- 重要性：该问题直接影响 TUI 中需要用户输入的长流程任务。即使用户输入超时已在历史 Issue 中变为可配置，外层 UI tool-hang watchdog 仍可能在 600 秒后终止整个 turn。  
- 社区反应：暂无评论和点赞，但它与多个历史问题相关，属于高优先级稳定性边界问题。

### 2. Windows 安全门禁误拦截变量 PID 下的 `Stop-Process`  
- Issue：[#6871](https://github.com/codewhale-hq/Codewhale/issues/6871)  
- 状态：OPEN  
- 标签：`bug`, `needs-triage`  
- 重要性：安全门禁本意是阻止危险的批量进程终止，但当前实现也拒绝了“按已知 PID 精准终止自有进程”的推荐操作，影响 Windows 用户的自动化与清理流程。  
- 社区反应：暂无评论和点赞，但该问题指向安全策略与可用性之间的平衡。

### 3. MCP 启动服务器失败或恢复时，应向模型提供上下文提示  
- Issue：[#6866](https://github.com/codewhale-hq/Codewhale/issues/6866)  
- 状态：OPEN  
- 标签：`needs-triage`  
- 重要性：当 MCP server 启动失败时，模型只会发现工具“消失”或调用时报 `unknown tool`，无法区分是配置问题、服务失败还是能力不存在。该设计讨论关系到 MCP 工具生态的可解释性。  
- 社区反应：暂无评论和点赞，但方向很关键：让模型理解工具可用性状态，而不是盲目调用。

### 4. 放宽 MCP OAuth 与 Provider PKCE 登录的 300 秒浏览器回调窗口  
- Issue：[#6865](https://github.com/codewhale-hq/Codewhale/issues/6865)  
- 状态：OPEN  
- 标签：`needs-triage`  
- 重要性：OAuth/PKCE 登录需要用户在浏览器中操作，固定 300 秒超时对慢速登录、企业 SSO、多因素认证场景不友好。  
- 社区反应：暂无评论和点赞，但与近期 OrcaRouter OAuth PR、MCP 登录流程强相关。

### 5. 每周健康摘要：Windows CI 可能处于红灯状态  
- Issue：[#6868](https://github.com/codewhale-hq/Codewhale/issues/6868)  
- 状态：CLOSED  
- 标签：`bot-authored`  
- 重要性：机器人摘要指出 `main` 可能在 `Test (windows-latest)` 必需检查上失败，并列出健康度建议。对维护者判断主干质量、阻断合并风险具有参考价值。  
- 社区反应：机器人生成、只读摘要，无评论和点赞。

### 6. 每日安全与依赖扫描：CodeQL 告警无法读取  
- Issue：[#6845](https://github.com/codewhale-hq/Codewhale/issues/6845)  
- 状态：CLOSED  
- 标签：`bot-authored`  
- 重要性：安全扫描无法列出 CodeQL open alerts，原因是 `GITHUB_CODEWHALE_SECURITY_PAT` 未配置，默认凭据返回 403。这意味着安全可观测性存在权限缺口。  
- 社区反应：机器人生成、无评论和点赞，但对安全流程有实际影响。

---

## 3. 重要 PR 进展

### 1. 修复模型快照 ID 识别与自定义 Provider 模型列表探测  
- PR：[#6870](https://github.com/codewhale-hq/Codewhale/pull/6870)  
- 状态：CLOSED  
- 内容：修复 DeepSeek V4 等通过快照/变体 ID 暴露时被识别为未知 128K 模型形态的问题，并增强自定义 OpenAI 兼容网关的模型 roster 探测。  
- 影响：提升私有网关、模型中转和 DeepSeek 变体模型接入体验。

### 2. Runtime API 支持读取单个 Skill 的正文  
- PR：[#6869](https://github.com/codewhale-hq/Codewhale/pull/6869)  
- 状态：OPEN  
- 内容：新增 `GET /v1/skills/{name}`，返回 `SKILL.md` 正文及路由元数据，如 `source`、`invocation`、`aliases`、`bundled_tier`、`enabled`。  
- 影响：让外部客户端能够真正激活和展示 Skill，而不只是看到 Skill 列表。

### 3. OrcaRouter 增加 OAuth 2.0 + PKCE 登录与实时 Chat Catalog  
- PR：[#6867](https://github.com/codewhale-hq/Codewhale/pull/6867)  
- 状态：OPEN  
- 内容：在原有 API Key 方式之外，为 OrcaRouter 增加浏览器登录入口，并提供实时 chat catalog。  
- 影响：降低用户配置门槛，增强 Provider 生态接入能力。

### 4. 删除 Automation 时归档 Terminal Runs  
- PR：[#6864](https://github.com/codewhale-hq/Codewhale/pull/6864)  
- 状态：OPEN  
- 内容：删除 automation 时不再直接丢弃终端运行历史；如果存在 queued/running 的 run，则拒绝删除，避免破坏恢复链路。  
- 影响：提升自动化任务的审计性、可恢复性和运行历史保留能力。

### 5. 非流式模型请求增加可感知重试的总超时封装  
- PR：[#6863](https://github.com/codewhale-hq/Codewhale/pull/6863)  
- 状态：CLOSED  
- 内容：为非流式 completion 请求增加整体超时，避免 Provider 接受连接后挂起，或 429 携带超长 `Retry-After` 导致调用无限等待。  
- 影响：解决非流式调用可能永久卡死的问题。

### 6. 引擎或 Runtime 退出时正确解决 Pending Approvals  
- PR：[#6862](https://github.com/codewhale-hq/Codewhale/pull/6862)  
- 状态：CLOSED  
- 内容：当 engine 崩溃或 runtime shutdown 时，外部 approval wait 不再无限等待，而是感知 owner 消失并完成清理。  
- 影响：减少人工审批链路中的僵尸等待与资源泄漏。

### 7. RLM 子查询超时使用配置值而非硬编码 120 秒  
- PR：[#6861](https://github.com/codewhale-hq/Codewhale/pull/6861)  
- 状态：CLOSED  
- 内容：`rlm` 工具原本暴露 `sub_query_timeout_secs`，但实际未生效，所有 child completion 都被硬编码为 120 秒；该 PR 将配置正确传入 `RlmBridge`。  
- 影响：修复配置项“看似可用但实际无效”的问题，提升长子查询场景可控性。

### 8. 搜索工具在 Bing 与 DuckDuckGo 中尊重 Locale 配置  
- PR：[#6860](https://github.com/codewhale-hq/Codewhale/pull/6860)  
- 状态：OPEN  
- 内容：Bing 增加 `mkt` 与 `setlang` 参数，DuckDuckGo 也使用配置 locale，修复此前区域查询失真的问题。  
- 影响：改善国际化搜索质量，尤其对非英语地区开发者更重要。

### 9. Git Snapshot 子进程增加超时，防止卡住整个 Turn  
- PR：[#6859](https://github.com/codewhale-hq/Codewhale/pull/6859)  
- 状态：CLOSED  
- 内容：为 snapshot side repo 中的 Git 调用增加时间边界，避免 NFS/FUSE 卡顿、锁竞争或 hook 挂起导致 snapshot、restore、prune 无限阻塞。  
- 影响：提升会话快照与恢复路径的稳定性。

### 10. Vision 结果返回真实图片尺寸  
- PR：[#6858](https://github.com/codewhale-hq/Codewhale/pull/6858)  
- 状态：OPEN  
- 内容：`image_analyze` 使用 `image::image_dimensions` 从文件头读取宽高，并将真实 `width`/`height` 放入结果。  
- 影响：让视觉结果更结构化，避免模型凭肉眼猜测尺寸。

---

## 4. 功能需求趋势

### 1. 超时与长任务可控性成为核心主题  
大量 PR 和 Issue 都围绕“防止无限等待”展开，包括模型请求、Git 子进程、OCR、Pandoc、HTTP fetch、approval、dynamic tool result、agent wait 等。社区当前最关注的是：工具调用必须有明确时间边界，并且超时结果要可解释。

相关链接：  
- [#6872](https://github.com/codewhale-hq/Codewhale/issues/6872)  
- [#6863](https://github.com/codewhale-hq/Codewhale/pull/6863)  
- [#6862](https://github.com/codewhale-hq/Codewhale/pull/6862)  
- [#6859](https://github.com/codewhale-hq/Codewhale/pull/6859)

### 2. 人机交互流程需要更长、更智能的等待策略  
`request_user_input`、OAuth/PKCE 登录、approval wait 等都属于 human-in-the-loop 场景。固定短超时容易误杀正常用户流程，过长或无边界又会拖垮 turn。未来可能需要区分“用户等待”“工具执行”“外部回调”等不同等待类型。

相关链接：  
- [#6872](https://github.com/codewhale-hq/Codewhale/issues/6872)  
- [#6865](https://github.com/codewhale-hq/Codewhale/issues/6865)  
- [#6862](https://github.com/codewhale-hq/Codewhale/pull/6862)

### 3. MCP 与 Provider 接入体验持续增强  
MCP server 启动失败提示、OAuth 登录窗口、OrcaRouter OAuth、Provider catalog、模型 roster 探测等都指向更复杂的外部服务集成需求。开发者希望 TUI 不只是“能连上”，还要能解释连接状态、恢复状态和工具缺失原因。

相关链接：  
- [#6866](https://github.com/codewhale-hq/Codewhale/issues/6866)  
- [#6865](https://github.com/codewhale-hq/Codewhale/issues/6865)  
- [#6867](https://github.com/codewhale-hq/Codewhale/pull/6867)  
- [#6870](https://github.com/codewhale-hq/Codewhale/pull/6870)

### 4. Runtime API 正在向外部客户端开放更多能力  
Skill body 查询、SSE 兼容流取消语义、dynamic tool result 处理等 PR 表明 Runtime API 正在成为外部集成的重要边界。社区需求不再局限于 TUI 内部体验，也开始关注 headless/client 场景。

相关链接：  
- [#6869](https://github.com/codewhale-hq/Codewhale/pull/6869)  
- [#6849](https://github.com/codewhale-hq/Codewhale/pull/6849)  
- [#6848](https://github.com/codewhale-hq/Codewhale/pull/6848)

### 5. Windows 与跨平台安全策略需要更精细  
Windows shell safety gate 的误拦截说明跨平台安全策略不能只做模式匹配，还需要理解上下文，例如变量中保存的 PID 是否来自自有进程。安全与自动化便利性之间需要更细粒度的规则。

相关链接：  
- [#6871](https://github.com/codewhale-hq/Codewhale/issues/6871)

---

## 5. 开发者关注点

### 1. “会卡死”的路径太多，开发者希望所有外部依赖都有硬边界  
今天的 PR 高度集中在 unbounded wait：HTTP 请求、DNS 解析、OCR、Pandoc、Git、模型请求、approval 等。开发者显然在系统性清理“可能永久挂住 turn 或 executor thread”的路径。

### 2. 超时信息需要暴露给模型和客户端  
不仅要设置 timeout，还要让模型、Runtime API 客户端和用户知道为什么失败。例如 agent wait schema、SSE cancellation、MCP boot server failure briefing 都反映出“可观测失败”比“静默失败”更重要。

### 3. 人工参与流程不能简单套用工具执行超时  
用户登录、审批、输入确认等场景天然不可预测。开发者反馈表明，统一的 300 秒或 600 秒上限容易误伤真实工作流，需要更可配置、更符合场景的等待策略。

### 4. Provider 与模型生态变得更碎片化  
自定义 OpenAI-compatible gateway、DeepSeek snapshot ID、OrcaRouter OAuth、live catalog 等需求说明模型供应商和中转服务越来越多样化。模型识别、能力映射、价格/上下文长度配置需要更动态。

### 5. 自动化与审计能力正在增强  
Automation 删除时保留 run history、Skill body API、运行结果取消语义等改动，说明项目正在从单次交互工具转向可集成、可追踪、可恢复的开发自动化平台。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*