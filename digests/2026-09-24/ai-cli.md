# AI CLI 工具社区动态日报 2026-09-24

> 生成时间: 2026-09-24 03:40 UTC | 覆盖工具: 9 个

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

# AI CLI 工具生态横向对比分析报告  
日期：2026-09-24

## 1. 生态全景

当前 AI CLI 工具生态正从“命令行问答 / 单 Agent 编码助手”快速演进为 **多端协同、企业治理、可扩展 Agent Runtime**。  
社区反馈显示，开发者最关注的不再只是模型能力，而是 **会话可靠性、权限安全、成本透明度、MCP / 插件扩展、IDE / Desktop / Web 集成体验**。  
头部项目普遍进入高频迭代阶段：Codex、Gemini CLI、Qwen Code、DeepSeek TUI、OpenCode 都在密集修复底层稳定性问题；Claude Code 和 Copilot CLI 则更突出企业集成、模型治理和平台化能力。  
整体趋势是：AI CLI 正在成为开发工作流中的长期运行基础设施，而非一次性辅助工具。

---

## 2. 各工具活跃度对比

> 说明：下表基于用户提供的日报摘要统计；部分项目的 Issue / PR 数为“摘要中重点列出数量”，DeepSeek TUI 明确给出了过去 24 小时更新总量。

| 工具 | 今日 Issues 动态 | 今日 PR 动态 | Release 情况 | 活跃度判断 |
|---|---:|---:|---|---|
| Claude Code | 重点 Issues 10 条 | PR 5 条 | v2.1.281 | 高活跃，企业与集成问题集中 |
| OpenAI Codex | 重点 Issues 10 条 | PR 10 条 | 7 个 Rust alpha 版本 | 极高活跃，核心 Rust 组件快速迭代 |
| Gemini CLI | Issues 3 条 | PR 10 条 | 4 个版本：nightly / preview / stable | 中高活跃，P1 修复密集 |
| GitHub Copilot CLI | Issues 10 条 | PR 1 条 | v1.0.89-1 | Issue 活跃，PR 更新较少 |
| Kimi Code CLI | 0 | 0 | 无 | 暂无活动 |
| OpenCode | 重点 Issues 10 条 | PR 10 条 | 无 | 高活跃，V2 / Desktop / MCP 问题密集 |
| Pi | 重点 Issues 10 条 | PR 10 条 | 无 | 高活跃，兼容层与 TUI 体验持续打磨 |
| Qwen Code | 重点 Issues 10 条 | PR 10 条 | 1 个 nightly | 高活跃，会话、Web Shell、文件安全重点推进 |
| DeepSeek TUI | Issues 更新 39 条 | PR 更新 41 条 | 无 | 极高活跃，0.10.x 稳定性与 0.11 架构演进并行 |

---

## 3. 共同关注的功能方向

### 3.1 会话恢复、持久化与长任务一致性

多个工具都暴露出会话恢复、resume、长任务状态管理问题。

| 工具 | 具体表现 |
|---|---|
| Claude Code | Cloud session worker restart 后会话回退并自动重发 prompt；`/rename` 后 session 不出现在 resume picker；`/clear` 继承旧会话名 |
| Codex | WebSocket resume prewarm、context compaction 后重复输出、长时间 TUI 请求体截断 |
| Gemini CLI | 沙箱模式下登录和 session 无法持久化；ACP session/load 可能覆盖 checkpoint |
| OpenCode | V2 Desktop 消息不落库；V1 到 V2 会话迁移后不可见 |
| Pi | legacy session fork 丢历史；post-compaction continuation hang |
| Qwen Code | 项目移动后 session 不可达；ACP transcript replay 丢 embedded resource blocks |
| DeepSeek TUI | 会话恢复失败；auto-compaction 缺少模型可见提示 |

**判断：**  
AI CLI 已经被用于多小时、跨会话、跨设备的长期任务。会话一致性、幂等恢复、消息顺序保证，将成为工具成熟度的重要指标。

---

### 3.2 权限、安全与审批模型

安全边界是今日最明显的横向主题之一。

| 工具 | 具体诉求 |
|---|---|
| Claude Code | 安全过滤器误拦截授权系统管理任务；read-only 查询被阻止；reviewer 上下文不得包含 denied / secret 文件 |
| Codex | MCP-only 工具集外发生 fileChange；ChatGPT backend 请求需保留账号网络策略；工具结果元数据保留 |
| Gemini CLI | 未信任 workspace 中 `gemini mcp add` 覆盖 settings.json；OAuth URL 安全登录体验 |
| Copilot CLI | 企业 managed model 策略未生效；MCP servers 被 enterprise lockdown 误阻塞 |
| OpenCode | MCP OAuth refresh 竞争；Desktop MCP 工具注入链路不完整 |
| Pi | 工具中止后 tool call 历史缺失；PkgDiet 依赖治理 skill |
| Qwen Code | 大 inode 文件身份比较失真；hard-link overwrite guard；session-commit 归因安全 |
| DeepSeek TUI | 统一 approval grant store；Full Access、网络审批、Auto-Review 风险 schema |

**判断：**  
权限系统正在从“是否允许执行命令”升级为 **细粒度、可审计、跨进程一致、可恢复的安全治理体系**。

---

### 3.3 MCP / 插件 / Provider 扩展生态

几乎所有活跃工具都在处理扩展系统问题。

| 工具 | 具体诉求 |
|---|---|
| Codex | SDK 在 MCP-only 工具集之外执行 fileChange；扩展 API 新增 request / response hook |
| Gemini CLI | `gemini mcp add` 配置写入安全；MCP 配置持久化 |
| Copilot CLI | 单独禁用插件 hooks；workspace MCP servers 被误阻塞；custom MCP registry |
| OpenCode | Desktop MCP 工具未暴露；stdio MCP server 重复启动；MCP OAuth 串行化 |
| Qwen Code | MCP server 对 `-32601 Method not found` 容错；ACP embedded resource replay |
| Pi | PkgDiet 通过 MCP server 做依赖审查 |
| DeepSeek TUI | DeepSeek Harness bundle 原生导入；Fleet / 子 Agent 协作边界 |

**判断：**  
MCP 和插件系统正成为 AI CLI 的核心扩展层，但当前主要瓶颈集中在 **生命周期管理、权限隔离、OAuth、工具发现、配置安全**。

---

### 3.4 成本、配额与上下文透明度

成本感知成为高频诉求。

| 工具 | 具体表现 |
|---|---|
| Claude Code | Auto-memory 导致 prompt cache 每轮重写；Max x5 升级 x20 后 token allocation 不符合预期 |
| Codex | VS Code / Windows App 配额条缺失、reset 时间不一致 |
| OpenCode | session ID 破坏跨会话 prompt caching；Subagents picker 显示模型 token 成本 |
| Pi | 模型上下文限制、成本统计、reasoning level 映射问题 |
| Qwen Code | 避免 agent 重复调查历史信息；System One Decision Gate 降低大模型调用 |
| DeepSeek TUI | Spend / context 对模型可见；auto-compaction 前提示模型 |

**判断：**  
开发者越来越希望 AI CLI 能提供 **cache read/write token、配额窗口、上下文压力、预算消耗、模型成本** 等透明信息，以支持工程化成本控制。

---

### 3.5 IDE / Desktop / Web 多端体验

多端协同已经成为主流方向。

| 工具 | 具体表现 |
|---|---|
| Claude Code | VS Code 光标错位；Desktop policy blocks；mobile remote control |
| Codex | Windows Desktop Send 按钮禁用；Chrome tabs 操作失败；Computer Use attach 失败 |
| Gemini CLI | VSC 集成测试、OAuth 终端链接、retry 进度提示 |
| Copilot CLI | Desktop remote control token 缺失；`/ask` 窗口过小 |
| OpenCode | Desktop sidecar 持久化问题；TUI toast 损坏输入框 |
| Qwen Code | Web Shell artifact handling；Desktop 更新检查开关 |
| DeepSeek TUI | Windows Terminal 多行粘贴回归；VS Code undo snapshot 回滚 |

**判断：**  
AI CLI 正在突破“纯终端”边界，向 IDE、Desktop、Web Shell、移动控制、远程 Runtime 扩展，因此跨端状态一致性和交互体验成为核心竞争点。

---

## 4. 差异化定位分析

### Claude Code

**定位：企业级 Claude 开发工作流入口。**

- 重点能力：GitHub integration、Claude Apps Gateway、Desktop policy、Bedrock `assume_role`、Cloud session。
- 技术侧重：企业治理、权限策略、云端协作、GitHub 仓库集成。
- 目标用户：Claude Max / Team / Enterprise 用户，重视权限、审计、云端会话和 GitHub 工作流的团队。
- 当前短板：GitHub integration 状态诊断不足，安全误判较多，session consistency 问题突出。

---

### OpenAI Codex

**定位：OpenAI 官方多端 Agent / Coding Runtime，Rust 核心快速演进。**

- 重点能力：Rust CLI/TUI、Desktop App、Computer Use、WebSocket session、自定义 provider。
- 技术侧重：底层执行器、沙箱、WebSocket 恢复、扩展 API、Windows Desktop。
- 目标用户：OpenAI 生态开发者、IDE / Desktop 用户、需要官方模型深度集成的团队。
- 当前短板：Windows 桌面端问题密集，配额展示回归，自定义 provider 长会话稳定性仍需加强。

---

### Gemini CLI

**定位：Google Gemini 生态的稳定型 CLI / Agent 工具。**

- 重点能力：配置安全、OAuth 认证、沙箱、ACP、Git diff、终端可观测性。
- 技术侧重：P1 稳定性修复、发布工程、认证体验、shell / git 执行可靠性。
- 目标用户：Google / Gemini 用户、偏 CLI 的开发者、希望稳定接入 Gemini 的团队。
- 当前短板：Issue 数相对较少但 P1 集中，沙箱持久化、settings 覆盖这类问题对信任影响较大。

---

### GitHub Copilot CLI

**定位：GitHub / Copilot 企业生态中的 CLI Agent 前端。**

- 重点能力：GitHub 认证、企业托管策略、MCP / 插件、模型选择、BYOK。
- 技术侧重：企业策略一致性、自定义模型、插件生命周期、TUI 交互。
- 目标用户：GitHub Enterprise、Copilot Business / Enterprise 用户，尤其依赖 GitHub 组织策略的团队。
- 当前短板：PR 活跃度低于 Issue 反馈；企业 managed settings、MCP lockdown、自定义模型 picker 存在边界问题。

---

### Kimi Code CLI

**定位：当前样本期内无活动，暂无法判断。**

- 今日无 Issue、PR、Release。
- 短期内社区活跃度和迭代节奏明显低于其他工具。

---

### OpenCode

**定位：开放、多 Provider、多端形态的社区型 AI Coding Agent。**

- 重点能力：V2 架构、Desktop、TUI、MCP、多 Provider、session migration。
- 技术侧重：MCP 生命周期、Provider schema 兼容、V2 数据持久化、Desktop sidecar。
- 目标用户：偏开源、自托管、多模型、多 Provider 的高级开发者。
- 当前短板：V2 升级带来较多持久化和迁移问题，MCP 工具链仍需稳定化。

---

### Pi

**定位：强调 TUI 体验和多模型兼容的工程化 Agent 工具。**

- 重点能力：OpenAI Responses 兼容、LiteLLM / OpenRouter / Ollama 接入、TUI 细节、Agent 工具执行。
- 技术侧重：Responses API、多 provider gateway、终端渲染、工具中断 / timeout。
- 目标用户：深度终端用户、多模型网关用户、本地模型用户。
- 当前短板：兼容层边界问题多，Agent abort / timeout / stream watchdog 仍需加强。

---

### Qwen Code

**定位：面向长期会话、Web Shell、分布式 Agent 和本地模型优化的 AI Coding 平台。**

- 重点能力：session 管理、Web Shell 嵌入、ACP / MCP / SDK、CUA Driver、本地低延迟模式。
- 技术侧重：会话可达性、文件身份安全、embedded resource replay、远程 agents、System One gate。
- 目标用户：Qwen 生态用户、平台集成者、本地模型用户、需要 Web Shell / 远程 Agent 的团队。
- 当前短板：多模态 session 缓存错配较严重；项目路径绑定 session 的设计需要继续改进。

---

### DeepSeek TUI

**定位：快速演进中的 Agent Runtime / 多 Agent 协作平台。**

- 重点能力：审批权限、Auto-Review、Fleet / Subagent、上下文压缩、TUI。
- 技术侧重：统一 grant store、上下文管理、机器可验证 receipt、多 Agent 工作树隔离。
- 目标用户：愿意尝鲜复杂 Agent 工作流、关注权限审计和多 Agent 协作的开发者。
- 当前短板：0.10.0 后存在多个回归问题，基础交互稳定性仍需补齐。

---

## 5. 社区热度与成熟度

### 5.1 社区活跃度最高

**DeepSeek TUI、OpenAI Codex、OpenCode、Qwen Code、Pi**

- DeepSeek TUI：39 个 Issue 更新、41 个 PR 更新，是今日最活跃项目。
- Codex：7 个 Rust alpha Release，10 个重点 PR，显示底层架构高速迭代。
- OpenCode / Pi / Qwen Code：均有 10 条重点 Issue 和 10 条 PR，社区反馈和维护响应都较强。

### 5.2 企业化成熟度较高

**Claude Code、GitHub Copilot CLI、OpenAI Codex**

- Claude Code：Desktop policy blocks、Bedrock `assume_role`、reviewer 权限修复，企业治理方向明确。
- Copilot CLI：企业 managed model、MCP lockdown、BYOK、自定义 provider，是 GitHub 企业生态的延伸。
- Codex：网络策略保留、Windows sandbox、工具元数据、扩展 hook，逐步走向平台化。

### 5.3 快速迭代但仍在打磨稳定性的项目

**DeepSeek TUI、OpenCode、Qwen Code、Pi、Codex**

这些项目的共同特征是：

- PR 数量多；
- 架构变化频繁；
- 功能边界快速扩张；
- 同时伴随 session、MCP、TUI、provider、runtime 等稳定性问题。

### 5.4 相对低活跃项目

**Kimi Code CLI**

- 今日无活动，短期内不适合作为高确定性技术选型依据。
- 但需结合更长周期观察，单日无活动不能代表整体项目停滞。

---

## 6. 值得关注的趋势信号

### 趋势 1：AI CLI 正在演变为 Agent Runtime

从 DeepSeek TUI 的 Fleet、Qwen Code 的远程 Agents、Codex 的 WebSocket session、OpenCode 的 V2 Desktop sidecar 可以看出，AI CLI 已不再只是命令行界面，而是在承载：

- 长任务执行；
- 工具调用编排；
- 多 Agent 协作；
- 会话恢复；
- 权限审批；
- 跨端同步。

**对开发者的参考价值：**  
选型时应关注 runtime 能力，而不仅是模型效果。尤其要评估 session、tool execution、abort、resume、permission、logging 等基础设施。

---

### 趋势 2：MCP 成为事实上的扩展标准，但工程成熟度不足

Claude、Codex、Gemini、Copilot、OpenCode、Qwen、Pi 都出现 MCP 或类似扩展能力相关反馈。  
当前主要问题不是“有没有 MCP”，而是：

- server 生命周期管理；
- OAuth token 刷新；
- tools/list / prompts/list 容错；
- workspace trust；
- MCP 权限隔离；
- 插件 hook 粒度控制。

**对开发者的参考价值：**  
如果团队计划重度依赖 MCP，应优先验证工具发现、认证续期、并发进程、权限隔离和失败降级，而不是只看 demo 是否可用。

---

### 趋势 3：会话一致性成为 AI Coding 工具的核心可靠性指标

多个工具都出现 session 相关问题：

- Claude Code：worker restart 后自动重发 prompt；
- OpenCode：V2 消息不落库；
- Qwen Code：项目移动后 session 不可达；
- Gemini CLI：沙箱下 token 和 session 不持久；
- Pi：legacy session fork 丢历史；
- DeepSeek TUI：session restore 失败。

**对开发者的参考价值：**  
对于真实工程任务，应优先选择具备可靠 resume、可导出 transcript、明确 checkpoint、可恢复工具状态的工具。

---

### 趋势 4：权限系统正在从“提示确认”升级为“治理架构”

权限相关反馈已不局限于命令执行确认，而扩展到：

- 网络访问；
- 文件读取范围；
- secret 泄露防护；
- review 上下文过滤；
- enterprise policy；
- managed model；
- approval grant 持久化；
- 子 Agent 权限继承。

**对开发者的参考价值：**  
企业选型时，应重点评估工具是否支持策略集中配置、权限审计、最小权限、敏感文件隔离和跨端一致执行。

---

### 趋势 5：成本和上下文透明度成为刚需

Claude Code 的 prompt cache 异常、Codex 的配额条缺失、OpenCode 的 prompt cache 命中问题、DeepSeek TUI 的 spend/context 可见需求，都说明开发者越来越在意 AI 工具的运行成本。

**对开发者的参考价值：**  
应优先选择能显示 token 使用、cache read/write、模型上下文窗口、配额 reset、请求成本和压缩时机的工具。否则在大规模团队使用时，成本不可控风险较高。

---

### 趋势 6：Windows、Desktop、Web Shell 是下一轮体验竞争点

Codex、Copilot、OpenCode、Qwen、Claude 都在处理 Desktop / Windows / Web Shell 相关问题。  
这说明 AI CLI 正在从 Unix-like 终端用户扩展到更广泛的开发者群体。

**对开发者的参考价值：**  
如果团队中 Windows 用户较多，需重点验证：

- Desktop app 稳定性；
- shell / sandbox 兼容性；
- browser / computer-use 能力；
- 代理网络；
- 文件系统权限；
- WSL / native Windows 差异。

---

## 综合判断

今日最强信号是：**AI CLI 工具竞争的核心，正在从“模型接入能力”转向“Agent 工程化能力”。**

短期内最值得关注的方向包括：

1. 会话恢复与数据持久化；
2. MCP / 插件生命周期与权限隔离；
3. 企业策略和安全审批一致性；
4. 成本、配额、prompt cache 透明度；
5. Desktop / IDE / Web 多端稳定性；
6. 多 Agent 协作中的可验证执行证据。

对于技术决策者而言，选型时不应只比较模型质量或 CLI 交互体验，而应重点评估：**可靠性、安全治理、扩展生态、成本可观测性、跨端一致性和长期维护活跃度**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告  
数据截止：2026-09-24  
仓库：github.com/anthropics/skills

---

## 1. 热门 Skills 排行

> 注：PR 列表按社区评论/关注度排序给出，但评论数字段缺失；以下以提供的排序、更新时间、关联 Issue 活跃度综合判断。

### 1) `skill-creator` 触发评估修复  
- **PR**：[#1298](https://github.com/anthropics/skills/pull/1298)  
- **状态**：Open  
- **功能**：修复 `skill-creator` 的触发评估问题，包括并发探测互相干扰、Windows `select()` 管道失败、运行时错误被误判为非触发等。  
- **社区讨论热点**：  
  - Skill 触发评估的准确性  
  - Windows 兼容性  
  - 自动优化流程是否被错误指标误导  
- **关联关注**：Issue [#556](https://github.com/anthropics/skills/issues/556)、[#1721](https://github.com/anthropics/skills/issues/1721) 反映了 0% trigger rate / recall 的系统性问题。  

---

### 2) `proofcore-contract-auditor` 智能合约审计  
- **PR**：[#1771](https://github.com/anthropics/skills/pull/1771)  
- **状态**：Open  
- **功能**：面向 Web3 开发者，自动静态分析 Solidity / Rust 智能合约，并将审计证明锚定到 TON 区块链。  
- **社区讨论热点**：  
  - AI + 智能合约安全审计  
  - 审计结果可验证性与链上存证  
  - Claude Code Skills 在 Web3 安全场景中的落地  
- **看点**：这是较典型的“垂直行业 Skill”，从通用辅助走向专业审计工作流。  

---

### 3) `mcp-builder` MCP 2.x 兼容修复  
- **PR**：[#1742](https://github.com/anthropics/skills/pull/1742)  
- **状态**：Open  
- **功能**：修复 `mcp-builder` 在 `mcp>=2.0.0` 中的 `streamable_http_client` 导入变化，并支持自定义 HTTP headers。  
- **社区讨论热点**：  
  - MCP 版本升级兼容性  
  - 自定义 headers 与企业 MCP 服务集成  
  - MCP server 评估工具稳定性  
- **关联 Issue**：[#1668](https://github.com/anthropics/skills/issues/1668)、[#1390](https://github.com/anthropics/skills/issues/1390)  
- **看点**：MCP 是 Claude Code 生态的重要扩展层，相关 Skill 的稳定性直接影响开发者集成体验。  

---

### 4) `md2video-audio` Markdown 转视频与语音  
- **PR**：[#1703](https://github.com/anthropics/skills/pull/1703)  
- **状态**：Open  
- **功能**：将 Markdown 文档编译为带有类真人语音旁白的 MP4 视频，使用 Marp 生成演示幻灯片。  
- **社区讨论热点**：  
  - 文档自动转教学视频  
  - 低成本内容生产  
  - Markdown → Slides → Voiceover → Video 的端到端自动化  
- **看点**：体现社区对“内容生成工作流自动化”的强需求。  

---

### 5) `docx` 文档评论与修订处理修复  
- **PR**：[#1734](https://github.com/anthropics/skills/pull/1734)、[#1792](https://github.com/anthropics/skills/pull/1792)、[#1790](https://github.com/anthropics/skills/pull/1790)、[#541](https://github.com/anthropics/skills/pull/541)  
- **状态**：Open  
- **功能**：围绕 DOCX 的评论、修订、关系文件、LibreOffice 超时、ID 冲突等问题进行修复。  
- **社区讨论热点**：  
  - DOCX 结构完整性  
  - Track Changes / Comments 的可靠处理  
  - 避免 AI 修改 Word 文档时造成文件损坏  
- **看点**：文档类 Skills 是仓库中最持续活跃的方向之一，尤其关注“生成正确”之外的“格式稳定、可打开、可审阅”。  

---

### 6) `pyxel` 复古游戏开发  
- **PR**：[#525](https://github.com/anthropics/skills/pull/525)  
- **状态**：Open  
- **功能**：为 Python Pyxel 复古游戏开发提供创建、调试、验证、无头运行、帧检查和状态检查能力。  
- **社区讨论热点**：  
  - Claude 进行游戏开发的可验证性  
  - Headless 测试和输入驱动验证  
  - 游戏画面与状态的一致性检查  
- **看点**：这是偏创意开发但强调自动验证的 Skill，契合“让 Claude 不只是写代码，还能验证结果”的趋势。  

---

### 7) `awt` AI Watch Tester 端到端测试  
- **PR**：[#822](https://github.com/anthropics/skills/pull/822)  
- **状态**：Open  
- **功能**：引入 AI Watch Tester，让 Claude 通过视觉和浏览器控制自动执行 E2E 测试。  
- **社区讨论热点**：  
  - 零代码测试生成  
  - 视觉驱动的浏览器自动化  
  - AI 参与 QA / 回归测试流程  
- **看点**：与 Issue 中对测试、质量门禁、自动验证的需求高度一致。  

---

### 8) `testing-patterns` 测试模式  
- **PR**：[#723](https://github.com/anthropics/skills/pull/723)  
- **状态**：Open  
- **功能**：提供完整测试方法论，包括 Testing Trophy、单元测试、React 组件测试、集成测试、端到端测试等。  
- **社区讨论热点**：  
  - Claude 生成测试的规范化  
  - 测试策略和边界定义  
  - 前端与后端测试最佳实践  
- **看点**：和 `awt` 形成互补，一个偏测试方法论，一个偏自动执行。  

---

## 2. 社区需求趋势

### 趋势一：Skill 安全、信任边界与官方/社区命名治理  
- **代表 Issue**：[#492](https://github.com/anthropics/skills/issues/492)  
- **需求重点**：社区担心第三方 Skill 使用 `anthropic/` 命名空间，导致用户误以为是官方 Skill，从而授予过高权限。  
- **反映的问题**：随着 Skills 生态扩大，用户开始关注来源可信度、权限边界、供应链安全和官方认证机制。  

---

### 趋势二：组织级 Skill 分发与共享  
- **代表 Issue**：[#228](https://github.com/anthropics/skills/issues/228)  
- **需求重点**：希望 Claude.ai 支持组织内共享 Skill，而不是通过下载 `.skill` 文件再手动发送和上传。  
- **潜在方向**：  
  - 企业 Skill Library  
  - 团队共享链接  
  - 权限分级与版本管理  
  - 组织级安装和审计  

---

### 趋势三：Skill 触发、评估与调试工具链  
- **代表 Issue**：[#556](https://github.com/anthropics/skills/issues/556)、[#1390](https://github.com/anthropics/skills/issues/1390)  
- **需求重点**：社区强烈关注 Skill 是否能被正确触发、评估指标是否可信、MCP 工具调用是否被错误吞掉。  
- **对应 PR**：[#1298](https://github.com/anthropics/skills/pull/1298)、[#1769](https://github.com/anthropics/skills/pull/1769)、[#1742](https://github.com/anthropics/skills/pull/1742)  
- **反映的问题**：开发者已经不满足于“写一个 Skill”，而是需要完整的测试、评估、诊断与优化闭环。  

---

### 趋势四：文档处理与办公自动化  
- **代表 PR / Issue**：  
  - DOCX 修复：[#541](https://github.com/anthropics/skills/pull/541)、[#1734](https://github.com/anthropics/skills/pull/1734)、[#1792](https://github.com/anthropics/skills/pull/1792)  
  - ODT 支持：[#486](https://github.com/anthropics/skills/pull/486)  
  - 文档排版质量控制：[#514](https://github.com/anthropics/skills/pull/514)  
- **需求重点**：文档生成、格式修复、模板填充、评论处理、修订处理、OpenDocument 支持等。  
- **反映的问题**：办公文档仍是 Claude Code Skills 最刚需的应用场景之一。  

---

### 趋势五：测试生成、质量门禁和交付验证  
- **代表 PR / Issue**：  
  - `awt`：[#822](https://github.com/anthropics/skills/pull/822)  
  - `testing-patterns`：[#723](https://github.com/anthropics/skills/pull/723)  
  - Reasoning Quality Gate：[#1385](https://github.com/anthropics/skills/issues/1385)  
- **需求重点**：自动化测试、E2E 验证、AI 输出质量审查、交付前验证。  
- **反映的问题**：社区希望 Skills 能减少“看似完成但实际不可用”的 AI 输出。  

---

### 趋势六：MCP 与 Skills 的融合  
- **代表 Issue / PR**：  
  - Expose Skills as MCPs：[#16](https://github.com/anthropics/skills/issues/16)  
  - `mcp-builder` 修复：[#1742](https://github.com/anthropics/skills/pull/1742)  
- **需求重点**：希望 Skill 能以 MCP 形式暴露能力，或更好地生成、测试和连接 MCP server。  
- **反映的问题**：社区正在把 Skills 视为 Claude Code 与外部系统集成的上层封装。  

---

## 3. 高潜力待合并 Skills

### 1) `mcp-builder` 兼容性修复  
- **PR**：[#1742](https://github.com/anthropics/skills/pull/1742)  
- **状态**：Open  
- **潜力原因**：修复明确、关联 Issue 清晰、影响面大，且 MCP 是 Claude Code 生态核心扩展方向。  

---

### 2) `skill-creator` 触发评估修复  
- **PR**：[#1298](https://github.com/anthropics/skills/pull/1298)  
- **状态**：Open  
- **潜力原因**：直接解决 Skill 开发体验中的基础问题；若合并，可显著提升社区 Skill 创建、调试和优化的可信度。  

---

### 3) `AWT` AI 端到端测试  
- **PR**：[#822](https://github.com/anthropics/skills/pull/822)  
- **状态**：Open  
- **潜力原因**：自动化测试是高频开发需求，且“视觉 + 浏览器控制 + 零代码测试”具备明显产品化价值。  

---

### 4) `testing-patterns` 测试模式  
- **PR**：[#723](https://github.com/anthropics/skills/pull/723)  
- **状态**：Open  
- **潜力原因**：覆盖通用软件工程测试知识，可作为 Claude 生成测试代码的基础规范 Skill。  

---

### 5) `md2video-audio` 文档转视频  
- **PR**：[#1703](https://github.com/anthropics/skills/pull/1703)  
- **状态**：Open  
- **潜力原因**：面向内容生产自动化，应用场景清晰，适合教程、产品说明、内部培训等场景。  

---

### 6) `proofcore-contract-auditor` 智能合约审计  
- **PR**：[#1771](https://github.com/anthropics/skills/pull/1771)  
- **状态**：Open  
- **潜力原因**：垂直场景明确，结合安全审计与链上证明，代表社区向专业行业工作流扩展。  

---

### 7) `document-typography` 文档排版质量控制  
- **PR**：[#514](https://github.com/anthropics/skills/pull/514)  
- **状态**：Open  
- **潜力原因**：解决 AI 生成文档中常见但用户不一定会明确提出的问题，如孤行、寡行、编号错位等。  

---

### 8) `blast-radius` 批量危险操作检查  
- **PR**：[#1776](https://github.com/anthropics/skills/pull/1776)  
- **状态**：Open  
- **潜力原因**：聚焦删除、批量邮件、权限撤销等高风险操作前的检查清单，契合 AI Agent 安全执行需求。  

---

## 4. Skills 生态洞察

当前社区在 Skills 层面最集中的诉求是：**让 Claude Code Skills 从“可编写的提示模板”升级为“可信、可共享、可测试、可审计、可集成的工程化能力单元”。**

---

# Claude Code 社区动态日报  
**日期：2026-09-24**  
**数据源：github.com/anthropics/claude-code**

---

## 1. 今日速览

过去 24 小时，Claude Code 发布了 **v2.1.281**，重点增强 Claude Apps Gateway 对新版 Claude Desktop key 策略块的支持，并为 Bedrock upstream 增加 `assume_role` 能力。  
社区反馈主要集中在 **GitHub integration 连接异常、安全/权限误判、VS Code/桌面端体验问题、Cloud session 状态恢复与数据一致性** 等方向，其中 GitHub 集成问题数量明显偏高。

---

## 2. 版本发布

### v2.1.281  
链接：anthropics/claude-code Release `v2.1.281`

本次发布主要面向企业集成、权限策略与云网关能力：

- **Claude Apps Gateway 支持新版 Claude Desktop keys**
  - 在 `desktop` policy blocks 中新增支持：
    - `blockReadsOutsideWorkingDirectories`
    - `disableBypassPermissionsMode`
  - 对需要集中管控桌面端权限的团队较重要，尤其是企业环境中限制文件读取范围、禁用绕过权限模式的场景。

- **Bedrock upstream 支持 `assume_role`**
  - Claude Apps Gateway 调用 Bedrock 时可作为指定 IAM Role 执行。
  - 对 AWS 企业用户意义较大，可更好地融入现有 IAM、跨账号访问、最小权限与审计体系。

---

## 3. 社区热点 Issues

> 以下挑选过去 24 小时内最值得关注的 10 个 Issue，优先考虑影响面、可复现性、评论/点赞、标签严重性与产品方向代表性。

### 1. GitHub integration 无法完成连接  
链接：anthropics/claude-code Issue #96579  
状态：Closed  
标签：`bug`, `platform:web`, `github-integration`

用户在 claude.ai 的 Settings > Connectors > GitHub integration 中尝试连接 GitHub，但连接流程无法完成且没有明确错误提示。  
**重要性：** GitHub integration 是 Claude Code Web 工作流的关键入口，连接失败会直接阻断仓库访问、代码审查和自动修复能力。  
**社区反应：** 已有评论，且同类 GitHub 集成问题在当天大量出现，说明可能存在较广泛的连接或权限识别问题。

---

### 2. VS Code 扩展光标渲染位置异常  
链接：anthropics/claude-code Issue #96571  
状态：Open  
标签：`bug`, `platform:macos`, `platform:vscode`, `area:vscode`

用户报告 VS Code 扩展在输入暂停后，光标显示位置会向前偏移约两个字符，遮挡末尾字符；下一次输入后恢复。  
**重要性：** 虽然是显示层问题，但发生在核心输入体验中，容易造成误编辑、误判输入内容。  
**社区反应：** 已有评论，报告包含详细环境信息：Claude Code VS Code extension 2.1.281、VS Code 1.139.0、macOS 26.6.2、Apple Silicon，便于定位。

---

### 3. GitHub integration 已安装 App 但仍提示安装  
链接：anthropics/claude-code Issue #96582  
状态：Open  
标签：`bug`, `platform:web`, `github-integration`

用户表示 Claude Cloud 一直提示需要安装 Claude GitHub App，但实际上已经安装。  
**重要性：** 这类状态不同步问题会导致用户无法判断是 GitHub App 权限、Claude 侧缓存，还是组织权限配置异常。  
**社区反应：** 当天有多个类似 Issue，显示 GitHub App 安装状态识别可能是高频故障点。

---

### 4. 升级 Claude Max x5 到 x20 后 token allocation 仍不足  
链接：anthropics/claude-code Issue #96581  
状态：Open  
标签：`bug`, `platform:windows`, `area:cost`, `platform:vscode`

用户反馈从 Claude Max x5 升级到 x20 后，实际可用 token/配额体验并未明显提升，甚至原工作流无法继续使用 Opus，只能改用 Sonnet。  
**重要性：** 涉及订阅升级后的资源分配、成本感知和模型可用性，是付费用户高度敏感的问题。  
**社区反应：** 暂无评论，但 `area:cost` 类问题在当天不止一例，说明使用额度与成本透明度正在成为热点。

---

### 5. `/clear` 继承上一个会话的 `/rename` 名称  
链接：anthropics/claude-code Issue #96580  
状态：Open  
标签：`bug`, `platform:windows`, `area:tui`

用户报告执行 `/clear` 后，新会话仍继承旧会话通过 `/rename` 设置的名称，而不是新建干净会话。  
**重要性：** 会话命名、恢复、清理是 CLI/TUI 的基础交互能力；名称污染会影响用户组织多会话与后续 resume。  
**社区反应：** 暂无评论，但与当天另一个 `/rename` 相关 Issue #96559 可形成关联。

---

### 6. Auto-memory 导致新会话每轮重建 prompt cache  
链接：anthropics/claude-code Issue #96578  
状态：Open  
标签：`bug`, `has repro`, `platform:macos`, `area:cost`, `area:core`

用户发现某个 repo 的新会话中，每次用户消息都会以 cache-write 费率重写大段 prompt cache；设置 `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` 后问题消失。  
**重要性：** 该问题同时影响性能、成本和缓存命中率，是核心运行时与记忆管理相关的高价值 bug。  
**社区反应：** 标记为 `has repro`，说明具备复现条件，值得工程团队优先排查。

---

### 7. 安全过滤器误拦截授权系统管理任务  
链接：anthropics/claude-code Issue #96577  
状态：Open  
标签：`enhancement`, `area:model`, `area:security`

用户希望改进安全过滤器对合法、授权系统管理任务的识别准确性，避免正常工程任务被 cyber safeguards 中断。  
**重要性：** 这是安全策略与开发者效率之间的典型冲突，尤其影响 DevOps、安全工程、企业 IT 管理场景。  
**社区反应：** 当天有多条类似安全误判反馈，说明模型安全分类器近期可能对 cyber/infra 任务更敏感。

---

### 8. Read-only 查询在已授权情况下仍被阻止  
链接：anthropics/claude-code Issue #96575  
状态：Open  
标签：`bug`, `platform:macos`, `area:permissions`, `needs-repro`

用户报告正常工作中的只读生产 sizing 查询被阻止，即使已有授权。  
**重要性：** 权限系统误判会直接影响生产环境分析、容量评估、影响面检查等常见工程流程。  
**社区反应：** 暂无评论，当前需要复现信息；但与 #96577、#96576、#96572、#96566 等共同指向安全/权限过度拦截问题。

---

### 9. Cloud session worker restart 后会话回退并自动重发用户提示  
链接：anthropics/claude-code Issue #96562  
状态：Open  
标签：`bug`, `area:core`, `area:cowork`, `data-loss`

用户报告 Cloud session 在 worker restart 后，conversation 被回退到最后一次用户输入，并且该 prompt 在没有用户操作的情况下被重新发送。  
**重要性：** 标记 `data-loss`，涉及会话一致性、幂等性和用户意图安全；自动重发可能造成重复执行、误操作或上下文污染。  
**社区反应：** 暂无评论，但这是当天最值得关注的稳定性问题之一。

---

### 10. `/rename` 后 session 不出现在 resume picker 或 `claude agents`  
链接：anthropics/claude-code Issue #96559  
状态：Open  
标签：`bug`, `has repro`, `platform:linux`, `area:tui`

用户在长会话结束前执行 `/rename`，之后通过 `claude --resume`、`/resume` 或 `claude agents` 均无法看到该 session，但磁盘数据仍完整。  
**重要性：** 影响长期任务恢复和会话管理；若会话数据存在但索引/展示缺失，可能是 metadata 或 picker 查询逻辑问题。  
**社区反应：** 标记 `has repro`，且与 #96580 同属会话命名/恢复链路问题。

---

## 4. 重要 PR 进展

> 过去 24 小时内更新的 PR 共 5 条，因此本日报列出全部 5 条，而非强行补足 10 条。

### 1. command.run hook 改为使用字面量命令名，确保启动时命令等待逻辑正确  
链接：anthropics/claude-code PR #96570  
状态：Open  
作者：poteat

该 PR 修复 hook 模块中 `command.run` 使用常量命令名导致引擎扫描无法识别的问题。  
引擎会扫描 hook 中的字面量命令名，用于决定哪些启动时输入的 slash command 需要等待模块加载。改动后可避免启动阶段 slash command 因模块尚未加载而错过匹配。

---

### 2. telemetry rows 携带 engine version、base version 与 build time  
链接：anthropics/claude-code PR #96487  
状态：Open  
作者：poteat

该 PR 让 telemetry 数据行读取 `$.session.version()`，并附带：

- `version`
- `base`
- `builtAt`

**意义：** 外部构建或不同分发版本发送 telemetry 时，可以带上准确版本信息，便于排障、灰度分析和回归定位。该能力从 2.1.281 起可用。

---

### 3. security-guidance 防止 denied 与 secret 文件进入 reviewer 上下文  
链接：anthropics/claude-code PR #96434  
状态：Open  
作者：claude[bot]

该 PR 修复安全审查流程可能绕过当前会话权限规则的问题。  
问题场景包括 Stop-hook、commit review、push review prompt 通过 `git diff` / `git show` 组装上下文时，可能把 `secrets.yaml`、`config/prod.json` 等本不应被 Claude 读取的文件内容放入模型上下文。

**意义：** 这是一个关键安全修复，确保 review 辅助流程也遵守会话级权限策略，避免敏感文件泄露给模型。

---

### 4. nested AGENTS.md 被自动分页读取时不再视为已完整交付  
链接：anthropics/claude-code PR #96364  
状态：Open  
作者：poteat

当嵌套目录下的 `AGENTS.md` 超过 Read 工具 token 上限时，whole-file Read 会被工具自动分页。此前系统可能错误地把第一页读取视为完整交付，导致后续读取该目录下文件时不再附加对应 `AGENTS.md`。  
该 PR 修复后，自动分页读取不会被错误认定为完整交付。

**意义：** 改善大型项目中多层 `AGENTS.md` 指令的可靠性，避免模型遗漏局部开发规范。

---

### 5. git diff 强制关闭颜色，避免 ANSI escape 导致 diff body 为空  
链接：anthropics/claude-code PR #96363  
状态：Open  
作者：poteat

当仓库或用户 git 配置中设置 `color.ui=always` 或 `color.diff=always` 时，`git diff` 输出带 ANSI escape。此前这些颜色控制字符可能导致 diff hunk 解析失败，出现 header 和统计正确但 diff body 为空的问题。  
该 PR 通过传入 `--no-color` 修复。

**意义：** 提升代码审查、变更总结、提交前检查等基于 diff 的能力稳定性。

---

## 5. 功能需求趋势

### 1. GitHub integration 稳定性与权限状态同步

当天大量 Issue 与 GitHub integration 相关，包括无法连接、已安装 GitHub App 但 Claude 仍提示安装、组织/仓库权限请求无法处理等。  
代表 Issue：

- #96579：GitHub 连接无法完成  
  链接：anthropics/claude-code Issue #96579
- #96582：已安装 App 仍提示安装  
  链接：anthropics/claude-code Issue #96582
- #96560：有 repo access 但不是 owner 时无法链接  
  链接：anthropics/claude-code Issue #96560
- #96554：GitHub App pending permission request 处理异常  
  链接：anthropics/claude-code Issue #96554

**趋势判断：** 社区需要更清晰的 OAuth/App 安装状态反馈、组织权限诊断、pending request 引导，以及连接失败时的可操作错误信息。

---

### 2. 安全分类器与权限系统需要更细粒度上下文判断

多条 Issue 指向正常开发、系统管理、只读查询、公开资料研究被安全策略阻止。  
代表 Issue：

- #96577：授权系统管理任务被安全过滤器中断  
  链接：anthropics/claude-code Issue #96577
- #96576：False Positive Security Detection  
  链接：anthropics/claude-code Issue #96576
- #96575：只读查询被权限系统阻止  
  链接：anthropics/claude-code Issue #96575
- #96572：Opus 5.5 阻止普通研究和自有机器脚本  
  链接：anthropics/claude-code Issue #96572
- #96566：模型拒绝所有 cybersecurity-related tasks  
  链接：anthropics/claude-code Issue #96566

**趋势判断：** 用户希望 Claude Code 能区分授权环境、只读操作、自有系统、公开研究和真实攻击行为，并提供更透明的拒绝原因。

---

### 3. 成本、配额与 prompt cache 透明度

当天出现多起与成本或额度体验相关的反馈。  
代表 Issue：

- #96581：Max x5 升级到 x20 后 token allocation 不符合预期  
  链接：anthropics/claude-code Issue #96581
- #96578：auto-memory 导致 prompt cache 每轮重写  
  链接：anthropics/claude-code Issue #96578
- #96565：Usage keeps getting worse  
  链接：anthropics/claude-code Issue #96565

**趋势判断：** 开发者希望获得更可解释的 usage 计量、缓存写入/读取细节、模型额度策略，以及订阅升级后的实际资源变化说明。

---

### 4. 会话管理、resume 与 cloud session 一致性

多个 Issue 反映会话命名、恢复、worker resume、用户消息投递存在边界问题。  
代表 Issue：

- #96580：`/clear` 继承旧会话 `/rename` 名称  
  链接：anthropics/claude-code Issue #96580
- #96559：`/rename` 后 session 不出现在 resume picker  
  链接：anthropics/claude-code Issue #96559
- #96562：worker restart 后会话回退并自动重发 prompt  
  链接：anthropics/claude-code Issue #96562
- #96561：worker resume 后 AskUserQuestion 被丢弃  
  链接：anthropics/claude-code Issue #96561

**趋势判断：** 长任务、云端协作和 agent 化工作流要求会话状态具备更强一致性、幂等保障与恢复可见性。

---

### 5. IDE / TUI / Desktop 多端体验细节

用户持续反馈 VS Code、TUI、Desktop、mobile remote control 的体验问题。  
代表 Issue：

- #96571：VS Code 光标渲染错位  
  链接：anthropics/claude-code Issue #96571
- #96568：Remote Control 移动推送不达  
  链接：anthropics/claude-code Issue #96568
- #96574：Desktop app 标题栏中心区域拖动失败  
  链接：anthropics/claude-code Issue #96574
- #96556：Claude Desktop Intel Mac 启动失败/自动更新异常  
  链接：anthropics/claude-code Issue #96556

**趋势判断：** Claude Code 正在从 CLI 扩展到 IDE、桌面、Web、移动端联动，跨端一致性与基础交互可靠性成为关键体验指标。

---

## 6. 开发者关注点

### 1. GitHub 连接链路缺少可诊断性

大量用户只看到“无法连接”“仍提示安装”“pending permission”之类状态，但缺少明确原因。  
开发者需要：

- 显示 GitHub App 安装状态、安装目标 org/repo
- 区分 OAuth 成功、App 安装成功、repo 权限不足、org approval pending
- 提供可复制的诊断信息和下一步操作建议

---

### 2. 安全拦截影响正常工程任务

安全策略误判成为当天最明显的痛点之一。尤其在以下场景中，用户反馈较强烈：

- 授权的系统管理
- 只读生产查询
- 自有设备脚本
- 公开信息研究
- Cybersecurity 教学、检测或合规工作

开发者希望安全系统能支持更明确的上下文声明、授权证明方式，或至少返回更具体的拒绝说明。

---

### 3. 成本与缓存行为需要透明化

`prompt cache` 反复写入、订阅升级后额度体验不符预期等问题显示，开发者对成本控制越来越敏感。  
高频需求包括：

- 每轮请求展示 cache read/write token
- 解释为何触发 cache rewrite
- 提供关闭或调试 auto-memory 的明确开关
- 订阅升级后显示实际模型/额度/速率变化

---

### 4. 会话恢复必须更可靠

Cloud session 与 TUI resume 问题说明，开发者已经把 Claude Code 用于长时间、多步骤任务。  
因此以下能力变得关键：

- worker restart 后状态不回退
- 用户消息不自动重放
- AskUserQuestion/SendUserMessage 顺序保证
- `/rename`、`/clear`、`--resume` 元数据一致
- 会话数据存在时必须可发现、可恢复

---

### 5. 企业与安全能力正在增强，但需要端到端一致

v2.1.281 增强了 Desktop policy blocks 和 Bedrock `assume_role`，同时 PR #96434 修复 reviewer 上下文泄露风险。  
这表明 Claude Code 正在强化企业治理能力，但社区反馈也说明：

- 权限策略需要在 CLI、Desktop、Web、Review hooks 中一致执行
- 任何绕过权限系统的辅助流程都可能成为安全风险
- 企业用户需要可审计、可配置、可解释的权限模型

---

## 总结

今天的核心信号是：**Claude Code 正在加强企业网关、权限与遥测能力，但社区端最迫切的问题集中在 GitHub 集成稳定性、安全误判、成本透明度和会话一致性。**  
短期内，GitHub integration 状态诊断、安全分类器误报、prompt cache 成本异常和 Cloud session 恢复逻辑，可能是最值得优先处理的方向。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报  
**日期：2026-09-24**  
**仓库：openai/codex**

## 1. 今日速览

过去 24 小时，Codex 仓库发布了多枚 Rust alpha 版本，版本线覆盖 `0.155.x`、`0.157.x`、`0.158.x`，显示核心 Rust 组件仍处于高频迭代阶段。社区反馈集中在 Windows 桌面端稳定性、VS Code 扩展用量/配额显示、CLI/TUI 配置体验、沙箱与 WebSocket 会话可靠性等方向。

PR 侧则以基础设施修复和架构收敛为主：WebSocket 预热与恢复、Guardian 上下文模式简化、工具结果元数据保留、Windows 沙箱凭据修复、扩展 API 钩子等均有进展。

---

## 2. 版本发布

过去 24 小时内共有 7 个新 Release，均为 Rust alpha 版本：

| 版本 | 说明 | 链接 |
|---|---|---|
| `rust-v0.158.0-alpha.6` | Release `0.158.0-alpha.6` | https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.6 |
| `rust-v0.158.0-alpha.5` | Release `0.158.0-alpha.5` | https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.5 |
| `rust-v0.158.0-alpha.4` | Release `0.158.0-alpha.4` | https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.4 |
| `rust-v0.158.0-alpha.3` | Release `0.158.0-alpha.3` | https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.3 |
| `rust-v0.158.0-alpha.2` | Release `0.158.0-alpha.2` | https://github.com/openai/codex/releases/tag/rust-v0.158.0-alpha.2 |
| `rust-v0.157.0-alpha.11` | Release `0.157.0-alpha.11` | https://github.com/openai/codex/releases/tag/rust-v0.157.0-alpha.11 |
| `rust-v0.155.0-alpha.16.4` | Release `0.155.0-alpha.16.4` | https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.16.4 |

**观察：**  
官方 release 描述较简略，但结合当天 PR 可见，近期重点可能包括 Rust CLI/TUI、WebSocket 会话、Guardian 上下文、沙箱、配置拆分、执行器能力发现等底层能力的持续演进。

---

## 3. 社区热点 Issues

### 1. Windows 10 Computer Use / Appshots 无法 attach  
**Issue：** [#47699](https://github.com/openai/codex/issues/47699)  
**状态：** Open  
**标签：** `bug`, `windows-os`, `tool-calls`, `app`, `computer-use`  
**社区反应：** 3 条评论

该问题报告了 Windows 10 环境下 Computer Use 失败，并出现 `SetIsBorderRequired 0x80004002`，Appshots 无法 attach。Computer Use 是 Codex 桌面自动化能力的关键链路，此类问题会直接影响端到端 GUI 操作能力。

**重要性：** Windows 桌面端 + Computer Use 属于高价值场景，若截图、窗口绑定、Appshots 失效，会导致自动化任务无法启动或中断。

---

### 2. CLI completion 时间戳应可配置  
**Issue：** [#47676](https://github.com/openai/codex/issues/47676)  
**状态：** Open  
**标签：** `enhancement`, `TUI`, `CLI`, `config`  
**社区反应：** 3 条评论，2 个 👍

用户希望在 `config.toml` 中独立控制 completion timestamp 的显示，以及支持自动、12 小时制、24 小时制，同时保留现有的 “Worked for...” 耗时显示。

**重要性：** 这是典型的 CLI/TUI 可用性与个性化诉求。对于长期使用终端的开发者，日志信息密度和时间格式会影响阅读效率。

---

### 3. VS Code 扩展配额进度条不可见  
**Issue：** [#47667](https://github.com/openai/codex/issues/47667)  
**状态：** Open  
**标签：** `bug`, `extension`, `rate-limits`  
**社区反应：** 3 条评论

用户反馈从 VS Code 扩展 `26.5917` 起，Quota Limit Bars 不再可见。该问题与配额透明度直接相关，影响 Plus/Pro 用户判断剩余额度和使用节奏。

**重要性：** 与另一个类似问题 [#47734](https://github.com/openai/codex/issues/47734) 相互印证，说明扩展端用量展示可能存在回归。

---

### 4. Goals 在自动上下文压缩后重复输出  
**Issue：** [#47707](https://github.com/openai/codex/issues/47707)  
**状态：** Open  
**标签：** `bug`, `model-behavior`, `context`, `app`  
**社区反应：** 2 条评论

报告称长时间运行的 Codex Goals 在自动 context compaction 后，可能进入 runaway continuation loop，重复输出同一段或语义相近的 assistant 响应。

**重要性：** 这是上下文压缩与长任务稳定性的核心问题。若 compaction 后状态恢复异常，会导致任务浪费 token、占用时间，并降低开发者对长流程 agent 的信任。

---

### 5. Codex SDK 在 MCP-only 工具集之外完成 fileChange  
**Issue：** [#47692](https://github.com/openai/codex/issues/47692)  
**状态：** Open  
**标签：** `bug`, `windows-os`, `mcp`, `sandbox`, `app-server`  
**社区反应：** 2 条评论

用户报告 Codex SDK 在预期 MCP-only 工具集之外完成了 `fileChange`，且未触发 approval callback。该问题涉及工具权限、沙箱约束和审批链路。

**重要性：** 这是安全边界问题。对于企业或受控环境，未授权的文件变更行为会显著影响采用信心。

---

### 6. Windows App 用量 reset 时间比 Web Usage 晚 1 小时  
**Issue：** [#47738](https://github.com/openai/codex/issues/47738)  
**状态：** Open  
**标签：** `bug`, `windows-os`, `rate-limits`, `app`  
**社区反应：** 1 条评论

Windows 应用显示的 Codex reset timestamp 与网页 Usage 页面相差 1 小时，可能与时区、夏令时或客户端格式化逻辑有关。

**重要性：** 结合 VS Code 扩展用量条缺失问题，说明“配额/用量可视化”正在成为社区关注点。

---

### 7. VS Code 扩展 5 小时与周用量指标缺失  
**Issue：** [#47734](https://github.com/openai/codex/issues/47734)  
**状态：** Open  
**标签：** `bug`, `extension`, `rate-limits`  
**社区反应：** 1 条评论

用户在 VS Code Codex extension `26.917.62051` 中发现 5-hour 与 weekly usage indicators 在更新后缺失。

**重要性：** 与 [#47667](https://github.com/openai/codex/issues/47667) 高度相关，表明扩展的 rate-limit UI 可能发生版本回归。

---

### 8. Windows Desktop Chrome 插件 list/open tabs 失败  
**Issue：** [#47732](https://github.com/openai/codex/issues/47732)  
**状态：** Open  
**标签：** `bug`, `windows-os`, `app`, `connectivity`, `browser`  
**社区反应：** 1 条评论

Chrome 可被 Codex Desktop 发现，但列出标签页或打开页面时失败，错误为 `nodeRepl.fetch request failed`。

**重要性：** 浏览器连接是 Computer Use 与桌面自动化的重要基础能力。发现浏览器但无法操作标签页，说明连接链路或 nodeRepl 通信可能存在问题。

---

### 9. Windows 桌面端 Send 按钮首轮后禁用  
**Issue：** [#47716](https://github.com/openai/codex/issues/47716)  
**状态：** Open  
**标签：** `bug`, `windows-os`, `app`  
**社区反应：** 1 条评论

用户反馈 Windows Codex Desktop 首次消息可发送，但 assistant 完成后，后续输入 Send 按钮保持灰色禁用，CLI 正常。

**重要性：** 这是桌面端核心聊天交互阻断问题。类似现象也出现在 [#47682](https://github.com/openai/codex/issues/47682)，说明可能并非单一环境问题。

---

### 10. 自定义 provider 长时间 TUI 进程中请求体被截断  
**Issue：** [#47723](https://github.com/openai/codex/issues/47723)  
**状态：** Open  
**标签：** `bug`, `windows-os`, `CLI`, `custom-model`, `connectivity`  
**社区反应：** 1 条评论

用户使用本地 vLLM、自定义 `model_providers`、`wire_api="responses"` 时，长时间运行的 TUI 进程中请求体会在 JSON 中途被截断，之后请求持续返回 400 `Unterminated string`，直到重启。

**重要性：** 该问题影响自定义模型接入与长会话可靠性。随着开发者使用本地/私有模型，custom provider 稳定性会越来越关键。

---

## 4. 重要 PR 进展

### 1. 避免 TUI 模型选择器递归事件派发  
**PR：** [#47717](https://github.com/openai/codex/pull/47717)  
**状态：** Closed

修复确认 Astra 模型选择时，在 TUI 线程栈上递归轮询大型事件分发器的问题。通过先解包 `AstraSelectedFromModelPicker` 再派发模型更新，降低递归调用风险。

**影响：** 提升 TUI 模型切换稳定性，可能缓解与模型选择器相关的卡顿或栈深问题。

---

### 2. 更精细地保留工具结果元数据  
**PR：** [#47714](https://github.com/openai/codex/pull/47714)  
**状态：** Closed

此前超过聚合 metadata budget 时，会用 omission marker 替换所有工具结果元数据，导致小结果也被不必要丢弃。该 PR 改为更选择性地保留元数据，同时尽可能保留资源访问证据。

**影响：** 对审计、调试、授权判断和工具调用可解释性有帮助。

---

### 3. 降低共享配置 crate 的依赖耦合  
**PR：** [#47713](https://github.com/openai/codex/pull/47713)  
**状态：** Closed

将 `Provider` 与 `RetryConfig` 移入 `codex-client`，并从 `codex-api` 继续 re-export；同时调整 `codex-model-provider-info` 依赖方向，并把 feature-state metric emission 移入 `codex-core`。

**影响：** 改善 Rust crate 分层，降低配置与 API 层耦合，为后续客户端、provider 和核心模块演进打基础。

---

### 4. 原子更新 unified exec output buffers  
**PR：** [#47712](https://github.com/openai/codex/pull/47712)  
**状态：** Closed

此前 completion transcript 与 pending polling buffer 使用独立锁追加输出，取消操作可能打断两个 buffer 的一致更新。该 PR 将两个 buffer 放入共享 mutex 下的 `OutputBuffers` 中统一更新。

**影响：** 提升执行输出一致性，减少取消或并发场景下的 transcript/polling buffer 不一致问题。

---

### 5. resume prewarm 走缓存 WebSocket session  
**PR：** [#47709](https://github.com/openai/codex/pull/47709)  
**状态：** Closed

将完成启动预热的 session 放回 client cache，并通过正常 session setup path 安排 resume prewarm，同时简化非阻塞预热检查逻辑。

**影响：** 改善 resume 场景的 WebSocket 复用和启动体验，降低重复预热与连接管理复杂度。

---

### 6. 修复 spawn flag 类型与项目配置测试隔离  
**PR：** [#47704](https://github.com/openai/codex/pull/47704)  
**状态：** Closed

修复 `ProcessMode::NewSession` 分支中的 `POSIX_SPAWN_SETSID` 类型转换问题，并在项目配置测试中使用 `LoaderOverrides::without_managed_config_for_tests()` 保持测试隔离。

**影响：** 增强跨平台进程启动代码的类型安全，同时降低测试受 managed config 干扰的概率。

---

### 7. ChatGPT backend 请求保留账号网络策略  
**PR：** [#47703](https://github.com/openai/codex/pull/47703)  
**状态：** Closed

修复 ChatGPT backend 请求可能因使用默认 HTTP client 而绕过配置网络策略的问题。使用已捕获凭据的请求也会保留对应账号策略，确保凭据撤销后仍能阻断请求。

**影响：** 这是重要的网络策略与账号安全修复，尤其适用于企业或受管控网络环境。

---

### 8. 空闲线程可预热并修复 WebSocket 连接  
**PR：** [#47701](https://github.com/openai/codex/pull/47701)  
**状态：** Closed

为 `CodexThread` 暴露 `prewarm()`，允许 host 在下一轮交互前检查并修复 WebSocket 连接，避免空闲期间连接关闭后影响下一次请求。

**影响：** 提升长时间打开 Codex 会话后的首轮响应稳定性。

---

### 9. 修复 Windows sandbox 凭据被拒后的 provisioning  
**PR：** [#47695](https://github.com/openai/codex/pull/47695)  
**状态：** Closed

此前 Windows sandbox setup 即使存储账号密码被 Windows 拒绝，也可能显示已完成。该 PR 增加存储凭据验证与修复流程。

**影响：** 有助于减少 Windows 沙箱运行时登录失败，提高 sandbox provisioning 的可诊断性。

---

### 10. 增加模型请求与响应流的扩展钩子  
**PR：** [#47679](https://github.com/openai/codex/pull/47679)  
**状态：** Closed

新增 `ModelRequestContributor` 与 `ModelResponseInterceptor` 到 extension API。Contributor 可添加经过过滤的 `client_metadata`，Interceptor 可针对单个请求处理响应流。

**影响：** 为扩展生态提供更强的模型请求可观测性与可插拔能力，适合 IDE 集成、审计、实验性中间件和企业定制场景。

---

## 5. 功能需求趋势

### 1. CLI/TUI 可配置性增强  
相关 Issues：  
- [#47676](https://github.com/openai/codex/issues/47676)：completion timestamp 可配置  
- [#47737](https://github.com/openai/codex/issues/47737)：隐藏 long-wait overlay  
- [#47666](https://github.com/openai/codex/issues/47666)：`codex resume` 会话筛选体验问题  

社区正在要求更细粒度的 TUI 行为控制，包括时间显示、等待提示、会话恢复范围等。这说明高频终端用户希望 Codex 更像成熟开发工具，而不仅是交互式聊天入口。

---

### 2. IDE 集成与 VS Code 扩展体验  
相关 Issues：  
- [#47667](https://github.com/openai/codex/issues/47667)：配额条不可见  
- [#47734](https://github.com/openai/codex/issues/47734)：5 小时/周用量指标缺失  
- [#47702](https://github.com/openai/codex/issues/47702)：从 Codex 响应打开文件时尊重默认编辑器关联  
- [#47681](https://github.com/openai/codex/issues/47681)：VS Code on Windows/WSL sandbox bubblewrap 错误  

VS Code 扩展的关注点主要集中在用量透明度、文件打开行为、Windows/WSL 兼容性和沙箱稳定性。

---

### 3. Windows 桌面端稳定性  
相关 Issues：  
- [#47716](https://github.com/openai/codex/issues/47716)：Send 按钮首轮后禁用  
- [#47682](https://github.com/openai/codex/issues/47682)：send button greyed out  
- [#47724](https://github.com/openai/codex/issues/47724)：Codex 启动后无可见窗口  
- [#47722](https://github.com/openai/codex/issues/47722)：UI 反复 reinitialize  
- [#47731](https://github.com/openai/codex/issues/47731)：Review pane scope 自动重置  
- [#47732](https://github.com/openai/codex/issues/47732)：Chrome tabs 操作失败  

Windows 是当天最密集的问题来源之一，覆盖 UI 启动、消息发送、浏览器连接、代码审查面板、Computer Use 等多个关键路径。

---

### 4. 配额、限流与用量展示  
相关 Issues：  
- [#47667](https://github.com/openai/codex/issues/47667)  
- [#47734](https://github.com/openai/codex/issues/47734)  
- [#47738](https://github.com/openai/codex/issues/47738)  

社区对 rate-limit UI 的一致性和准确性非常敏感。对于 Plus/Pro 用户，5 小时窗口、周额度、reset 时间等信息会直接影响工作规划。

---

### 5. 自定义模型与 Provider 支持  
相关 Issues：  
- [#47723](https://github.com/openai/codex/issues/47723)：vLLM custom provider 请求体截断  
- [#47721](https://github.com/openai/codex/issues/47721)：GPT-6 Astra/Sol 任意 prompt 被 safety-check 拒绝  
- [#47718](https://github.com/openai/codex/issues/47718)：GPT-6 在遗留 C++ 游戏工程任务中不如 GPT-5.5 稳定  

开发者不仅关注 OpenAI 官方模型，也在尝试本地 vLLM、自定义 provider 和不同模型代际的工程表现。模型可靠性、协议兼容性与安全策略误判是高频痛点。

---

### 6. 沙箱、安全与权限边界  
相关 Issues：  
- [#47692](https://github.com/openai/codex/issues/47692)：MCP-only 工具集外 fileChange  
- [#47708](https://github.com/openai/codex/issues/47708)：Btrfs subvolume 下 sandbox socket mount isolation 失败  
- [#47674](https://github.com/openai/codex/issues/47674)：Podman Toolbx 中 `/run/host/tmp` alias 被拒  
- [#47681](https://github.com/openai/codex/issues/47681)：Windows/WSL bubblewrap 错误  

沙箱相关问题呈现出“平台差异 + 文件系统布局 + 容器环境 + 权限审批”交织的特点，是 Codex 走向专业开发工作流必须持续打磨的基础层。

---

## 6. 开发者关注点

1. **Windows 桌面端可靠性仍是最大痛点**  
   多个 Issue 指向 Windows 平台上的 UI 不显示、Send 按钮禁用、Chrome 连接失败、Computer Use 异常、review scope 重置等问题。对 Windows 用户而言，桌面端当前的稳定性风险较高。

2. **配额与用量信息需要更透明一致**  
   VS Code 扩展和 Windows App 均出现用量展示异常，包括配额条缺失、5 小时/周指标不可见、reset 时间不一致。开发者希望工具能准确告知剩余额度和恢复时间。

3. **长任务与上下文压缩的稳定性受到关注**  
   [#47707](https://github.com/openai/codex/issues/47707) 暴露了 context compaction 后重复输出的问题。对于多步骤 Goals、长代码修改任务和 agentic workflow，这类问题会显著影响可用性。

4. **自定义 provider 与本地模型接入正在升温**  
   vLLM、`wire_api="responses"`、GPT-6 Astra/Sol 等相关反馈显示，开发者正在更积极地把 Codex 接入多模型环境。请求序列化、长连接稳定性、安全策略和模型行为一致性将成为关键竞争点。

5. **CLI/TUI 用户希望更强的可配置性**  
   时间戳、等待 overlay、resume 会话筛选等反馈说明，终端用户希望 Codex 提供更少打扰、更可预测、更可脚本化的体验。

6. **安全边界与审批机制必须保持可解释**  
   MCP-only 工具集外的文件变更、网络策略保留、工具结果元数据保留等议题共同指向一个趋势：开发者需要明确知道 Codex 何时访问了什么资源、为何被允许、如何被审计。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报  
**日期：2026-09-24**  
**仓库：google-gemini/gemini-cli**

---

## 1. 今日速览

过去 24 小时 Gemini CLI 发布节奏较快，出现了 `v0.62.0-nightly`、`v0.62.0-preview.0`、`v0.61.0` 与 `v0.61.0-preview.1` 多个版本，说明主线、预览版与稳定版都在同步推进。  
社区反馈重点集中在 **配置文件安全、沙箱持久化、认证可靠性、会话恢复、终端交互体验** 等核心开发者体验问题上。  
PR 侧以 P1 修复为主，尤其是 settings.json 被覆盖、Git diff 执行失败、OAuth URL 截断、命令取消传播等问题，显示团队正在集中修复 CLI 在真实开发环境中的稳定性缺陷。

---

## 2. 版本发布

### v0.62.0-nightly.20260924.g8e70c862f  
链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-nightly.20260924.g8e70c862f>

本次 nightly 主要包含：

- 检查 VSC 集成测试是否存在后再执行，避免旧版本分支或 release 分支因缺失测试文件导致 CI 失败。  
  相关 PR：<https://github.com/google-gemini/gemini-cli/pull/29462>
- 修复连接恢复期间 retry 进度指示器不显示的问题。  
  相关 PR：<https://github.com/google-gemini/gemini-cli/pull/29468>

### v0.62.0-preview.0  
链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.62.0-preview.0>

预览版包含 A2A server 相关修复：

- `tasks metadata` endpoint 在遇到不支持的 store 时增加 early return，避免继续执行导致异常。  
  相关 PR：<https://github.com/google-gemini/gemini-cli/pull/29334>
- 自动生成 v0.61.0-preview.0 changelog。  
  相关 PR：<https://github.com/google-gemini/gemini-cli/pull/29344>

### v0.61.0  
链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0>

稳定版发布，主要包含前序 preview 与 nightly 中累积的变更，并由机器人自动生成 changelog、推进版本号。

相关 PR：

- <https://github.com/google-gemini/gemini-cli/pull/29251>
- <https://github.com/google-gemini/gemini-cli/pull/29254>

### v0.61.0-preview.1  
链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-preview.1>

这是针对 `v0.61.0-preview.0` 的 patch 版本，通过 cherry-pick 修复特定问题后生成。

相关 PR：<https://github.com/google-gemini/gemini-cli/pull/29455>

---

## 3. 社区热点 Issues

> 过去 24 小时内更新的 Issue 共 3 条，因此本节仅列出实际可用的 3 条，不虚构额外 Issue。

### 1. `gemini mcp add` 在未信任目录中会静默覆盖 `.gemini/settings.json`  
Issue：<https://github.com/google-gemini/gemini-cli/issues/29465>  
状态：OPEN  
标签：`priority/p1`, `area/core`, `kind/bug`, `effort/medium`

**问题概述：**  
用户报告在未被信任的项目目录中运行 `gemini mcp add` 时，项目的 `.gemini/settings.json` 会被静默重写，只保留新写入的 key，原有配置丢失。

**为什么重要：**  
这是高优先级核心问题，涉及项目配置数据丢失。由于“未信任目录”是默认状态，该问题可能影响大量普通使用路径。

**社区反应：**  
目前已有 2 条评论，虽然点赞数为 0，但该问题已被标记为 P1，并且已有对应修复 PR，说明维护者已快速响应。

相关 PR：<https://github.com/google-gemini/gemini-cli/pull/29466>

---

### 2. Sandboxed Gemini CLI 从 v0.60.0 起丢失登录和会话信息  
Issue：<https://github.com/google-gemini/gemini-cli/issues/29461>  
状态：OPEN  
标签：`priority/p1`, `area/platform`, `kind/bug`, `status/need-information`

**问题概述：**  
用户反馈从 v0.60.0 开始，在沙箱模式运行 Gemini CLI 时，每次启动都需要重新认证，OAuth token 无法持久保存。同时历史 session 也无法恢复，新 session 也不会持久化。

**为什么重要：**  
该问题直接影响沙箱环境下的连续开发体验。对于依赖隔离环境、容器化环境或受限执行环境的开发者而言，登录和会话无法持久化会显著降低可用性。

**社区反应：**  
目前处于 bot triaged 与 need-information 状态，说明维护者需要更多复现信息。由于被标记为 P1，该问题优先级较高。

---

### 3. Agent 存在“过度思考”和耗时过长问题  
Issue：<https://github.com/google-gemini/gemini-cli/issues/29464>  
状态：OPEN  
标签：`priority/p2`, `area/agent`, `kind/bug`, `status/need-information`

**问题概述：**  
用户反馈 Gemini CLI 存在响应耗时过长、过度推理的问题，但当前描述较少，维护者要求用户附加导出的聊天历史 JSON 以便诊断。

**为什么重要：**  
这类问题与 Agent 的响应效率、推理策略、token 消耗和交互体验密切相关。对于 CLI 工具而言，响应延迟会直接影响开发者使用频率。

**社区反应：**  
目前评论数为 1，处于 need-information 状态。问题优先级为 P2，说明团队认为其值得跟进，但仍需更多上下文。

---

## 4. 重要 PR 进展

### 1. 修复未信任 workspace 覆盖自身 `settings.json` 的问题  
PR：<https://github.com/google-gemini/gemini-cli/pull/29466>  
状态：OPEN  
标签：`priority/p1`, `area/core`, `size/m`

**内容：**  
修复 `gemini mcp add` 在未信任目录中静默覆盖 `.gemini/settings.json` 的问题，防止项目配置被破坏。

**重要性：**  
这是今天最关键的配置安全修复之一，直接对应 P1 Issue #29465。

---

### 2. 修复连接恢复期间 retry 进度提示不显示  
PR：<https://github.com/google-gemini/gemini-cli/pull/29468>  
状态：CLOSED  
标签：`priority/p1`, `area/core`, `size/l`

**内容：**  
修复在连接失败、429 rate limit、503 server overload 等场景下，`ui.errorVerbosity = "full"` 时终端一直停留在 `"Thinking..."`，不显示 retry 进度的问题。

**重要性：**  
改善长时间等待和网络异常时的用户反馈，降低用户误判 CLI 卡死的概率。该修复已进入 nightly release。

---

### 3. 移除无效的 `diff.external` override  
PR：<https://github.com/google-gemini/gemini-cli/pull/29467>  
状态：OPEN  
标签：`priority/p1`, `area/core`, `size/m`

**内容：**  
从 `ShellExecutionService` 和 `gitUtils.getSafeGitEnv()` 中移除无效的 `diff.external` 配置覆盖，修复执行 Git diff 命令时报：

- `fatal: cannot spawn : No such file or directory`
- `error: cannot run : No such file or directory`

**重要性：**  
Git diff 是代码代理类工具的核心能力之一，该修复关系到 Gemini CLI 在代码审查、补丁生成、上下文分析中的可靠性。

---

### 4. ACP 模式下先解析 session，再初始化 config，并避免同分钟文件名冲突  
PR：<https://github.com/google-gemini/gemini-cli/pull/29463>  
状态：OPEN  
标签：`priority/p1`, `area/core`, `size/m`

**内容：**  
修复 ACP 模式中，如果在同一分钟内先执行 `session/new` 再执行 `session/load`，可能覆盖当前 session checkpoint，导致报错：

```text
No previous sessions found for this project
```

**重要性：**  
会话恢复是长期任务、Agent 工作流和 IDE/ACP 集成的基础能力。该修复可提高 session 可靠性。

---

### 5. 修复 OAuth 长 URL 在终端换行后被截断  
PR：<https://github.com/google-gemini/gemini-cli/pull/29460>  
状态：OPEN  
标签：`priority/p1`, `area/security`, `size/s`, `size/m`

**内容：**  
使用 OSC 8 terminal hyperlink 渲染 OAuth URL，避免长 Google OAuth URL 被终端自动换行后截断，导致认证失败：

```text
Error 400: invalid_request
```

**重要性：**  
认证是 CLI 首次使用和持续使用的入口。该修复提升登录成功率，也改善终端环境兼容性。

---

### 6. 将取消信号传播到 shell command injections  
PR：<https://github.com/google-gemini/gemini-cli/pull/29459>  
状态：OPEN  
标签：`priority/p1`, `area/core`, `size/m`

**内容：**  
修复自定义命令中的 `!{...}` shell injections 使用全新的 `AbortController().signal`，导致调用方取消信号无法传递到子进程的问题。

**重要性：**  
该问题会导致挂起命令无法被取消，影响长任务、自动化脚本和 Agent 控制能力。修复后 CLI 的可控性和稳定性会更好。

---

### 7. 检查 VSC 集成测试存在性后再执行  
PR：<https://github.com/google-gemini/gemini-cli/pull/29462>  
状态：CLOSED  
标签：`size/xs`, `status/need-issue`

**内容：**  
近期引入了 VSC 集成测试，但 preview 和 stable 分支尚未包含这些测试。该 PR 在执行前检查测试是否存在，避免旧版本分支 CI 失败。

**重要性：**  
这是发布工程和 CI 稳定性修复，减少 release 分支因测试目录差异导致的构建失败。该修复已进入 nightly release。

---

### 8. 自动生成 v0.62.0-preview.0 changelog  
PR：<https://github.com/google-gemini/gemini-cli/pull/29470>  
状态：OPEN  
标签：`priority/p3`, `area/documentation`, `size/m`, `maintainer only`

**内容：**  
自动生成 `v0.62.0-preview.0` 的 changelog，供维护者 review 和合并。

**重要性：**  
虽然属于文档和发布流程类 PR，但对用户理解 preview 版本变更、评估升级风险具有重要作用。

---

### 9. 自动生成 v0.61.0 changelog  
PR：<https://github.com/google-gemini/gemini-cli/pull/29472>  
状态：CLOSED  
标签：`priority/p3`, `area/documentation`, `size/m`, `maintainer only`

**内容：**  
自动生成 `v0.61.0` 稳定版 changelog。

**重要性：**  
帮助稳定版用户追踪从上一版本升级时的功能变化和潜在破坏性变更。

---

### 10. nightly 版本号推进至 `0.62.0-nightly.20260924.g8e70c862f`  
PR：<https://github.com/google-gemini/gemini-cli/pull/29473>  
状态：OPEN  
标签：`size/s`, `status/need-issue`

**内容：**  
由 `gemini-cli-robot` 自动提交 nightly 版本 bump。

**重要性：**  
说明 nightly 发布链路持续运行，当前主线修复可以快速进入测试通道。

---

## 5. 功能需求趋势

基于今日 Issue 与 PR，可观察到以下趋势：

### 1. 配置安全与 workspace 信任机制成为重点  
相关链接：  
- Issue #29465：<https://github.com/google-gemini/gemini-cli/issues/29465>  
- PR #29466：<https://github.com/google-gemini/gemini-cli/pull/29466>

`gemini mcp add` 在未信任目录中覆盖配置的问题暴露出 CLI 在 workspace trust、配置写入策略、默认权限模型上的风险。后续社区可能会更关注：

- 配置写入前的 merge 策略
- 未信任 workspace 的限制边界
- 破坏性操作前的提示和备份机制

### 2. 会话持久化和恢复能力是高频痛点  
相关链接：  
- Issue #29461：<https://github.com/google-gemini/gemini-cli/issues/29461>  
- PR #29463：<https://github.com/google-gemini/gemini-cli/pull/29463>

无论是沙箱环境丢失 session，还是 ACP 模式中 session/load 失败，都说明开发者越来越依赖 Gemini CLI 的长期上下文和任务恢复能力。

### 3. 认证体验仍需增强  
相关链接：  
- PR #29460：<https://github.com/google-gemini/gemini-cli/pull/29460>

OAuth URL 被终端换行截断导致登录失败，说明 CLI 在不同终端环境中的兼容性仍是关键问题。OSC 8 hyperlink 的引入表明团队正在改善终端交互细节。

### 4. 终端交互反馈和可观测性持续优化  
相关链接：  
- PR #29468：<https://github.com/google-gemini/gemini-cli/pull/29468>

网络错误、限流、服务器过载等场景下，用户需要明确知道 CLI 正在重试，而不是只看到 `"Thinking..."`。这类改进有助于降低误操作和中断任务的概率。

### 5. Shell/Git 执行环境稳定性受到关注  
相关链接：  
- PR #29467：<https://github.com/google-gemini/gemini-cli/pull/29467>  
- PR #29459：<https://github.com/google-gemini/gemini-cli/pull/29459>

Gemini CLI 越来越多地参与真实代码修改、diff 分析、自定义命令执行，因此 shell 子进程控制、Git 环境变量隔离、取消传播等底层能力成为稳定性的核心。

---

## 6. 开发者关注点

### 1. “不要破坏我的项目配置”  
`settings.json` 被静默覆盖是今天最严重的用户信任问题。开发者希望 CLI 在修改项目文件时具备更强的保护机制，包括合并、备份、确认和错误回滚。

### 2. 沙箱环境下也要保持连续工作流  
沙箱模式丢失 OAuth token 和 session 会破坏自动化、隔离开发和容器化使用场景。开发者期望沙箱不等于无状态，至少应支持可配置的持久化目录。

### 3. 长任务需要明确状态反馈  
当遇到 429、503 或连接恢复时，CLI 不能只显示 `"Thinking..."`。开发者需要看到 retry 次数、等待时间、错误原因等可观测信息。

### 4. 认证流程必须适配真实终端环境  
长 OAuth URL 在终端换行后失效是典型的 CLI 可用性问题。用户期望登录链接可复制、可点击、不会被截断，并能在不同 terminal emulator 中稳定工作。

### 5. Agent 响应效率仍是体验关键  
“过度思考”和耗时过长的问题虽信息不足，但反映出用户对 Agent latency、推理预算、任务边界控制的敏感度正在提高。

### 6. 自定义命令和 shell 注入需要可取消、可控  
当用户中断一个任务时，所有派生 shell 命令都应同步取消。否则 CLI 会出现假退出、后台挂起、资源泄露等问题。

---

## 总结

今天 Gemini CLI 的社区动态以 **稳定性修复和发布推进** 为主。最值得关注的是 P1 级别的配置文件覆盖、沙箱会话丢失、Git diff 执行失败、OAuth 登录 URL 截断以及 shell 命令取消传播问题。整体来看，Gemini CLI 正在从“能完成任务”进一步走向“在复杂开发环境中可靠、可恢复、可观测地完成任务”。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-09-24）

## 1. 今日速览

过去 24 小时，GitHub Copilot CLI 发布了 `v1.0.89-1`，重点加入 GPT-6 Sol / GPT-6 Luna 模型选择支持，并修复了视图范围与本地会话输入队列相关问题。  
社区反馈集中在企业托管策略、MCP / 插件生态、模型选择、交互式体验和 BYOK 自定义模型兼容性上，说明 Copilot CLI 正在从单一 CLI 工具向企业级、可扩展 Agent 平台演进。  
今日新增 / 更新 Issue 较多，但大多仍处于 `triage` 阶段，尚未出现官方明确处理结论。

---

## 2. 版本发布

### v1.0.89-1

链接：https://github.com/github/copilot-cli/releases/tag/v1.0.89-1

#### Added

- 在模型选择器中加入 **GPT-6 Sol** 和 **GPT-6 Luna**，当这些模型可用时用户可以直接选择。
- 这表明 Copilot CLI 的模型接入层正在持续扩展，尤其是面向多模型与新一代推理模型的场景。

#### Fixed

- 修复 `view` 工具在 provider 传入扁平化 `view_range` 参数时未正确遵循行范围的问题。
- 修复本地会话中，空输入框按 `Up` 时应召回 pending message，并保持已排队 prompt 不被破坏的问题。

#### 影响分析

本次发布规模不大，但两个修复都与开发者日常交互质量相关：  
一是提升代码查看工具的准确性，二是改善本地会话中的输入历史和排队体验。新增模型支持则继续强化 Copilot CLI 作为多模型前端的定位。

---

## 3. 社区热点 Issues

### 1. Enterprise managed `model` 设置已接收但未在 Copilot app 和非交互式 CLI 中生效

- Issue：https://github.com/github/copilot-cli/issues/4959
- 状态：OPEN / triage
- 作者：PragmaticCoder
- 社区反应：👍 2，暂无评论

该问题指出企业托管配置中包含 `{ "model": "auto" }`，运行日志也显示服务端策略成功拉取，但模型解析器随后并未应用该托管设置。  
这对企业用户非常关键，因为模型策略通常涉及合规、成本控制和统一治理。如果非交互式 CLI 也无法应用托管模型配置，会影响 CI、自动化脚本和企业级 Agent 工作流。

---

### 2. 允许禁用单个插件的 hooks，但保留插件能力

- Issue：https://github.com/github/copilot-cli/issues/4958
- 状态：OPEN / triage
- 作者：androscodemo-crunchyroll
- 社区反应：暂无点赞与评论

用户希望可以只禁用某个插件的 `sessionStart` hook，而不禁用其 skills、agents 或 MCP servers。  
该需求反映出插件生态逐渐复杂后，开发者希望获得更细粒度的权限与生命周期控制。尤其当多个插件同时注入上下文时，hook 的可审计性、可替换性和冲突管理会变得非常重要。

---

### 3. 1.0.88：工作区 MCP servers 因托管策略先于 GitHub auth 解析而被阻塞

- Issue：https://github.com/github/copilot-cli/issues/4957
- 状态：OPEN / triage
- 作者：ahonamatata
- 社区反应：暂无点赞与评论

用户反馈升级到 `1.0.88` 后，GitHub Copilot desktop app 启动的新会话会间歇性跳过所有 workspace 和 plugin MCP server，并显示被 enterprise customization lockdown 阻塞。  
核心问题似乎是托管策略解析发生在 GitHub 认证之前，导致策略拉取被跳过，从而误判为受限环境。这是一个高优先级企业集成问题，会直接影响 MCP 工具链可用性。

---

### 4. 为每个 custom agent 报告解析后的定义路径和内容哈希

- Issue：https://github.com/github/copilot-cli/issues/4956
- 状态：OPEN / triage
- 作者：JereStay-MSFT
- 社区反应：暂无点赞与评论

当前 `session.custom_agents_updated` 仅报告 agent 来源为 `project`，但无法确认实际加载的是哪个定义文件。  
当 repo、user、plugin、`--add-dir` 等多个来源均可能定义同一 agent ID 时，缺少路径和内容哈希会给调试、审计和安全排查带来困难。该需求体现出用户对 Agent 可观测性和可追溯性的重视。

---

### 5. Agent 运行时无法可靠进行交互输入

- Issue：https://github.com/github/copilot-cli/issues/4955
- 状态：OPEN / triage
- 作者：alexanderkyte
- 社区反应：暂无点赞与评论

用户反馈当 Agent 正在后台执行任务时，连续按 `Esc` 无响应，`Ctrl+C` 会直接杀掉整个 Copilot app，输入文字也会出现错乱。  
这是明显的交互体验问题，影响开发者中断、修正或补充指令的能力。对于长时间执行的 Agent 工作流而言，可靠的 cancel / pause / edit 机制非常关键。

---

### 6. Windows Desktop app 启用 remote control 失败，提示缺少认证 token

- Issue：https://github.com/github/copilot-cli/issues/4954
- 状态：OPEN / triage
- 作者：sukrithanda
- 社区反应：暂无点赞与评论

用户在 Windows 版 GitHub Copilot desktop app 中启用 remote control 失败，日志显示 `No authentication token available; remote export disabled`。  
该问题涉及 desktop app、CLI session、远程控制与认证状态之间的联动。若 remote control 是未来多设备或远程 Agent 操作的重要能力，该类认证链路问题需要优先解决。

---

### 7. 企业自定义模型 provider ID 中包含 slash 时，无法从 `/model` picker 选择

- Issue：https://github.com/github/copilot-cli/issues/4953
- 状态：OPEN / triage
- 作者：corford
- 社区反应：暂无点赞与评论

用户反馈类似 `deepseek/deepseek-v4.1-flash`、`z-ai/glm-5.3` 这类 provider-side model ID 在 `/model` picker 中可见但无法选择。问题可能与服务端将 `/` 编码为 `%2F` 有关。  
这对企业自定义模型接入影响较大，因为许多主流模型命名都使用 `provider/model` 格式。若 CLI 无法正确选择这些模型，会限制 BYOK 和企业模型网关场景。

---

### 8. 请求可配置提交与换行快捷键

- Issue：https://github.com/github/copilot-cli/issues/4952
- 状态：OPEN / triage
- 作者：bhabegger
- 社区反应：暂无点赞与评论

用户希望可以配置 `Return`、`Shift+Return`、`Command+Return`、`Ctrl+Return` 等按键分别执行提交或换行。  
这是典型的开发者体验改进需求。随着用户在 CLI 中输入更复杂的多行 prompt，默认回车直接提交容易导致未完成指令被误发送。可配置 keybinding 将有助于降低误操作。

---

### 9. `/ask` 窗口固定尺寸过小

- Issue：https://github.com/github/copilot-cli/issues/4951
- 状态：OPEN / triage
- 作者：fridokus
- 社区反应：暂无点赞与评论

用户反馈 `/ask` 或 `/btw` 的窗口尺寸固定且过小，并对比 Claude Code 提到后者窗口可以根据回答内容扩展。  
这反映出开发者对 CLI / TUI 阅读体验的要求正在提升。随着模型回答变长，固定小窗口会降低代码解释、长回答和多步骤建议的可读性。

---

### 10. BYOK 自定义 provider 被强制使用 greedy sampling，导致推理模型退化或上下文溢出时静默挂起

- Issue：https://github.com/github/copilot-cli/issues/4950
- 状态：OPEN / triage
- 作者：bmazzarol-bunnings
- 社区反应：暂无点赞与评论

用户指出 CLI `1.0.81` 之后对 OpenAI-compatible 自定义 provider 请求中固定发送 `temperature: 0`、`top_p: 0.95` 等采样参数，而 `1.0.80` 不发送这些参数。  
这可能导致小型 reasoning model 在推理质量上退化，并且在上下文溢出时出现静默挂起。该问题对 BYOK、私有模型部署和企业模型平台用户影响较大，尤其是使用 vLLM 等自托管推理服务的团队。

---

## 4. 重要 PR 进展

过去 24 小时仅有 1 个 PR 更新。

### 1. Update github-script action pin

- PR：https://github.com/github/copilot-cli/pull/4948
- 状态：OPEN
- 作者：klockhoffbjorn-collab

该 PR 将 GitHub Actions 中固定的 `actions/github-script` 依赖更新到当前 `v9.0.0` release commit。  
作者说明仓库没有运行时依赖 manifest，其他 GitHub Actions pin 已检查，其中 `actions/stale` 已是最新版本，同时 `git diff --check` 通过。

#### 影响分析

这是一个供应链维护类 PR，主要价值在于保持 CI/CD 依赖版本新鲜并降低旧版本 action 带来的潜在维护风险。虽然不直接影响 Copilot CLI 功能，但对仓库安全和自动化稳定性有积极意义。

---

## 5. 功能需求趋势

### 1. 企业治理与托管策略一致性

相关 Issue：

- https://github.com/github/copilot-cli/issues/4959
- https://github.com/github/copilot-cli/issues/4957

企业用户正在关注托管 `model` 设置、permissions、enterprise customization lockdown 等策略是否在 desktop app、交互式 CLI、非交互式 CLI 中一致生效。  
这说明 Copilot CLI 在企业环境中的角色正在变重，策略解析顺序、认证时机和配置应用路径都需要更稳定。

---

### 2. MCP 与插件生态的可控性

相关 Issue：

- https://github.com/github/copilot-cli/issues/4958
- https://github.com/github/copilot-cli/issues/4957
- https://github.com/github/copilot-cli/issues/4949

MCP server、插件 hook、custom registry 等能力正在成为用户扩展 Copilot CLI 的核心方式。  
社区诉求不只是“能用”，而是希望具备更细粒度的控制能力，例如单独禁用 hook、避免误封 MCP server、正确访问企业自定义 MCP registry。

---

### 3. 自定义模型与 BYOK 支持

相关 Issue：

- https://github.com/github/copilot-cli/issues/4953
- https://github.com/github/copilot-cli/issues/4950

企业和高级用户正在通过自定义 provider、OpenAI-compatible 接口、私有推理服务接入模型。  
当前主要痛点包括模型 ID 编码、模型 picker 选择失败、采样参数被 CLI 固定覆盖、推理模型行为退化等。随着新版本加入 GPT-6 Sol / Luna，模型选择体系的兼容性会越来越关键。

---

### 4. Agent 可观测性与可追溯性

相关 Issue：

- https://github.com/github/copilot-cli/issues/4956

用户希望知道 custom agent 的最终定义来源、文件路径和内容哈希。  
这类需求通常来自多来源配置、插件叠加和企业审计场景，说明 Agent 定义管理需要更强的透明度。

---

### 5. CLI / TUI 交互体验优化

相关 Issue：

- https://github.com/github/copilot-cli/issues/4955
- https://github.com/github/copilot-cli/issues/4952
- https://github.com/github/copilot-cli/issues/4951

用户集中反馈输入控制、窗口尺寸、快捷键配置、中断机制等问题。  
这表明 Copilot CLI 不再只是短命令工具，而是被越来越多开发者用于长会话、多轮交互和 Agent 编排场景，因此终端交互体验成为重要竞争点。

---

## 6. 开发者关注点

### 1. 企业环境下的策略与认证顺序问题

多个反馈指向企业策略、GitHub auth、managed settings 与 MCP server 启动之间的时序问题。  
开发者关心的是：CLI 是否能在不同入口中保持一致行为，包括 desktop app、non-interactive CLI 和本地交互式会话。

### 2. 自定义模型接入仍存在边界问题

BYOK 和企业模型 provider 用户遇到的问题较多，包括：

- provider model ID 中包含 `/` 时选择失败
- URL 编码后的模型 ID 处理不正确
- CLI 默认采样参数影响模型输出
- 上下文溢出时缺少明确错误反馈

这类问题会直接影响企业模型平台和私有部署用户的可用性。

### 3. 插件与 MCP 需要更细粒度的权限控制

开发者希望能分别控制：

- 插件 hook
- 插件 skills
- agents
- MCP servers
- workspace MCP registry

这说明 Copilot CLI 的扩展系统需要从“启用 / 禁用插件”升级为“按能力、按生命周期、按来源进行控制”。

### 4. Agent 长任务期间的交互控制不足

用户无法可靠中断后台 Agent、无法顺畅输入、`Ctrl+C` 行为过于激进。  
对于真实开发工作流，Agent 经常会执行较长任务，因此 cancel、pause、resume、edit pending prompt 等能力会成为核心体验。

### 5. 终端 UI 可读性和输入习惯需要适配

`/ask` 窗口过小、多行 prompt 容易误提交等问题显示，开发者希望 Copilot CLI 更接近现代 TUI 工具体验。  
可配置 keybinding、自适应窗口、长回答阅读优化，将有助于提升高频使用场景下的效率。

---

## 总结

今天 Copilot CLI 的主要变化是小版本发布与一批企业级、扩展性、模型兼容性相关反馈集中出现。  
短期看，最值得关注的是企业托管模型设置未生效、MCP server 被误阻塞、自定义模型选择失败和 BYOK 采样参数问题。  
中长期看，Copilot CLI 社区需求正在明显转向企业治理、Agent 可观测性、插件 / MCP 精细化控制以及更成熟的终端交互体验。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报｜2026-09-24

## 1. 今日速览

过去 24 小时 OpenCode 没有新版本发布，但社区活跃度很高，Issue 与 PR 主要集中在 **V2 / Desktop / TUI 回归问题、MCP 集成、会话迁移与持久化、模型与 Provider 兼容性** 上。  
值得注意的是，多条新 Issue 指向 V2 架构下的实际使用痛点，例如 Desktop MCP 工具未暴露、会话消息不落库、V1 会话迁移不可见，以及多 TUI 实例重复通知。与此同时，维护者和贡献者也快速提交了多项修复 PR，覆盖通知去重、MCP OAuth、Gemini schema、Copilot Responses API 等关键路径。

---

## 2. 版本发布

过去 24 小时暂无新的 Release。

---

## 3. 社区热点 Issues

### 1. TUI toast API 导致输入框损坏  
- Issue：[#50962](https://github.com/anomalyco/opencode/issues/50962)  
- 状态：Open  
- 讨论热度：2 条评论  
- 重点：用户通过官方文档中的 `client.tui.showToast()` API 在 `command.execute.before` 中显示 toast，结果导致 TUI 输入框内容被破坏。  
- 重要性：这是插件 API 与 TUI 渲染交互的稳定性问题，影响自定义 slash command 和插件生态。

### 2. 请求支持将文件夹 / 项目整体加入上下文  
- Issue：[#50944](https://github.com/anomalyco/opencode/issues/50944)  
- 状态：Open  
- 讨论热度：2 条评论，1 个点赞  
- 重点：用户希望像 Claude Code 一样，能够将一个 folder/project 作为上下文加入会话。  
- 重要性：反映出社区对“项目级上下文管理”的强需求，尤其适合大型代码库分析、跨文件重构和持续开发场景。

### 3. Git 仓库不可读时 `vcs.diff()` 错误报告为“无变更”  
- Issue：[#50934](https://github.com/anomalyco/opencode/issues/50934)  
- 状态：Open  
- 讨论热度：2 条评论  
- 重点：当 Git 无法读取仓库时，`vcs.diff()` 返回“no changes”，而不是明确提示 diff 不可用。  
- 重要性：会误导模型和开发者判断当前工作区状态，影响自动化 review、commit 辅助和变更分析准确性。

### 4. Desktop MCP 已连接但工具未暴露给 Agent  
- Issue：[#51023](https://github.com/anomalyco/opencode/issues/51023)  
- 状态：Open  
- 重点：Desktop sidecar 能成功启动 MCP server、解析 `tools/list`，面板也显示 connected，但 Agent 会话中没有任何 MCP 工具。  
- 重要性：MCP 是 OpenCode 扩展能力的重要方向，该问题说明 Desktop 与 Agent 工具注入链路仍存在断点。

### 5. Windows 代理环境下 ripgrep 自动下载静默失败  
- Issue：[#51022](https://github.com/anomalyco/opencode/issues/51022)  
- 状态：Open  
- 重点：Windows 下按需下载 ripgrep 时不读取系统代理，只支持 `HTTP_PROXY` / `HTTPS_PROXY` 环境变量；失败后直到重启前都不会恢复。  
- 重要性：影响企业网络、代理网络和受限网络环境中的首次使用体验，也暴露出依赖自动下载的可观测性不足。

### 6. V2 Desktop sidecar 启动后消息与 part 不再持久化  
- Issue：[#51020](https://github.com/anomalyco/opencode/issues/51020)  
- 状态：Open  
- 重点：v2.0.12+ 中 sidecar 接管后，`opencode.db` 不再写入 `message` 或 `part` 行，但 `session_v2` 仍更新，LLM 请求也正常。  
- 重要性：这是严重的数据持久化问题，可能造成会话内容不可恢复，直接影响 Desktop 的可靠性。

### 7. 多个 TUI 实例导致重复桌面通知  
- Issue：[#51014](https://github.com/anomalyco/opencode/issues/51014)  
- 状态：Open  
- 重点：当多个 OpenCode TUI 实例同时运行时，一个事件会被所有 TUI 实例处理，产生重复通知和声音。  
- 重要性：影响多窗口、多项目开发者体验。该问题已被 PR [#51018](https://github.com/anomalyco/opencode/pull/51018) 针对性修复。

### 8. V2 session ID 出现在系统提示开头，破坏跨会话 prompt caching  
- Issue：[#51007](https://github.com/anomalyco/opencode/issues/51007)  
- 状态：Open  
- 社区反应：1 个点赞  
- 重点：V2 在系统 prompt 的 `<env>` 中加入唯一 session ID，使不同会话的系统提示很早就产生差异，削弱跨会话 prompt cache 命中。  
- 重要性：直接关联推理成本与延迟，对高频使用和长上下文用户影响明显。

### 9. 全局 stdio MCP server 按目录重复启动导致内存耗尽  
- Issue：[#51003](https://github.com/anomalyco/opencode/issues/51003)  
- 状态：Open  
- 重点：OpenCode 2 会为每个加载目录启动一份全局 stdio MCP server，多目录客户端可能快速耗尽内存。  
- 重要性：这是 MCP 生命周期管理问题，影响大型工作区、多会话客户端和长期运行环境的稳定性。

### 10. V1 到 V2 会话迁移后历史会话不可见  
- Issue：[#50999](https://github.com/anomalyco/opencode/issues/50999)  
- 状态：Open  
- 重点：V1 会话导入后被归到 `project_id='global'`，而不是原目录对应项目，导致项目会话列表看不到历史会话。  
- 重要性：V1→V2 迁移体验仍是近期高频痛点。类似问题也出现在 [#50980](https://github.com/anomalyco/opencode/issues/50980)，涉及 V1-era session 未进入 `session_v2`。

---

## 4. 重要 PR 进展

### 1. TUI 子 Agent 选择器显示模型 token 成本与 shell 耗时  
- PR：[#51025](https://github.com/anomalyco/opencode/pull/51025)  
- 状态：Open  
- 内容：在 composer 的 Subagents picker 中展示模型 token 成本，并补充 shell durations 信息。  
- 价值：提升多 Agent 使用时的成本感知和执行可观测性。

### 2. 根据上下文窗口自动适配输出限制  
- PR：[#51021](https://github.com/anomalyco/opencode/pull/51021)  
- 状态：Open  
- 关联：Closes [#46595](https://github.com/anomalyco/opencode/issues/46595), [#47398](https://github.com/anomalyco/opencode/issues/47398)  
- 内容：V2 此前除 Anthropic 外基本不发送 output limit，导致不同 Provider 走默认策略。该 PR 让输出限制根据上下文窗口进行适配。  
- 价值：有助于减少截断、超限和模型行为不一致问题。

### 3. 修复实例状态查询失败后缓存错误的问题  
- PR：[#51019](https://github.com/anomalyco/opencode/pull/51019)  
- 状态：Open  
- 关联：Closes [#50906](https://github.com/anomalyco/opencode/issues/50906)  
- 内容：修复 Effect `ScopedCache` 在一次 lookup 失败后缓存错误结果，导致后续同实例状态读取持续失败的问题。  
- 价值：提高配置异常后的恢复能力，避免单个坏配置“卡死”整个实例状态。

### 4. 多 TUI 实例通知去重  
- PR：[#51018](https://github.com/anomalyco/opencode/pull/51018)  
- 状态：Open  
- 关联：Closes [#51014](https://github.com/anomalyco/opencode/issues/51014)  
- 内容：多个 TUI 窗口连接同一 server 时，避免同一个 session event 触发多次桌面通知。  
- 价值：快速响应社区反馈，改善多窗口工作流体验。

### 5. 按模型名应用 Gemini 与 Kimi schema 处理逻辑  
- PR：[#51017](https://github.com/anomalyco/opencode/pull/51017)  
- 状态：Open  
- 内容：继 [#51009](https://github.com/anomalyco/opencode/pull/51009) 后，扩展 Gemini / Kimi schema 兼容逻辑到通过 OpenAI-compatible gateway 接入的模型。  
- 价值：增强 OpenRouter、Vercel AI Gateway、Google/Vertex OpenAI-compatible endpoint 等场景下的工具调用稳定性。

### 6. 修复 V1 macOS CLI 发布资产签名问题  
- PR：[#51015](https://github.com/anomalyco/opencode/pull/51015)  
- 状态：Open  
- 内容：修复 V1 macOS CLI 资产在发布前未对最终字节重新签名的问题。  
- 价值：改善 macOS 安全校验、企业白名单和发行可信度。

### 7. 改进 `read` 工具的 offset、limit 与长行处理  
- PR：[#51011](https://github.com/anomalyco/opencode/pull/51011)  
- 状态：Open  
- 内容：修复 `read` 在偏移、读取限制和长行场景下的行为，并明确报告读取长度。  
- 价值：提升 Agent 读取大文件、长行文件时的稳定性和可解释性。

### 8. Copilot 特定模型路由到 Responses API  
- PR：[#51024](https://github.com/anomalyco/opencode/pull/51024)  
- 状态：Closed  
- 内容：修复 Grok、Gemini、MAI Code 等 Copilot 模型在 metadata 未加载或缺失时被错误路由到 `/chat/completions` 的问题。  
- 价值：提升 Copilot provider 下多模型兼容性，减少 “model not supported” 类失败。

### 9. 串行化跨进程 MCP OAuth refresh  
- PR：[#50994](https://github.com/anomalyco/opencode/pull/50994)  
- 状态：Open  
- 关联：Fixes [#34520](https://github.com/anomalyco/opencode/issues/34520)  
- 内容：解决多个 OpenCode 进程同时刷新同一个 MCP OAuth token，导致 refresh token 轮换冲突的问题。  
- 价值：对多进程、后台 server、ACP 和 standalone 场景非常关键。

### 10. CLI auth login 与 MCP auth 共用分组选择器  
- PR：[#51006](https://github.com/anomalyco/opencode/pull/51006)  
- 状态：Open  
- 内容：让 `opencode auth login` 使用与 `/connect`、MCP auth 类似的分组选择体验，按 MCP / Popular / Services 展示，并显示连接状态。  
- 价值：统一认证入口，降低 Provider 与 MCP 登录配置的理解成本。

---

## 5. 功能需求趋势

### 1. 项目级上下文与大型代码库支持  
代表 Issue：[#50944](https://github.com/anomalyco/opencode/issues/50944)  
社区希望 OpenCode 能更自然地将文件夹、项目或整个工作区作为上下文引入，而不是逐个文件选择。这说明用户正在把 OpenCode 用于更复杂的项目级任务，而不仅是单文件问答。

### 2. MCP 成为扩展生态核心，但稳定性仍需加强  
代表 Issue / PR：  
- [#51023](https://github.com/anomalyco/opencode/issues/51023) Desktop MCP 工具未暴露  
- [#51003](https://github.com/anomalyco/opencode/issues/51003) 全局 MCP server 重复启动  
- [#50994](https://github.com/anomalyco/opencode/pull/50994) MCP OAuth refresh 串行化  
- [#51001](https://github.com/anomalyco/opencode/pull/51001) MCP 登录交互修复  

MCP 相关问题同时涉及连接、工具发现、进程生命周期和 OAuth，说明 MCP 已进入实际高频使用阶段。

### 3. V2 / Desktop 数据一致性与迁移可靠性是重点痛点  
代表 Issue：  
- [#51020](https://github.com/anomalyco/opencode/issues/51020) 消息和 part 不落库  
- [#50999](https://github.com/anomalyco/opencode/issues/50999) V1 导入会话归到 global  
- [#50980](https://github.com/anomalyco/opencode/issues/50980) V1 session 未迁移到 `session_v2`  

用户对历史会话、持久化和迁移完整性非常敏感，这类问题会显著影响升级信心。

### 4. 多 Provider / 多模型兼容性持续升温  
代表 Issue / PR：  
- [#51024](https://github.com/anomalyco/opencode/pull/51024) Copilot Responses API 路由  
- [#51017](https://github.com/anomalyco/opencode/pull/51017) Gemini / Kimi schema 处理  
- [#50993](https://github.com/anomalyco/opencode/issues/50993)、[#50992](https://github.com/anomalyco/opencode/issues/50992)、[#50990](https://github.com/anomalyco/opencode/issues/50990) 自定义 Provider 连接问题  
- [#50998](https://github.com/anomalyco/opencode/issues/50998) 社区 Provider 示例  

OpenAI-compatible 生态虽然降低接入门槛，但工具 schema、endpoint 路由、认证和错误提示仍是高频问题。

### 5. TUI 可用性与国际化需求上升  
代表 Issue / PR：  
- [#50962](https://github.com/anomalyco/opencode/issues/50962) TUI toast 破坏输入框  
- [#51014](https://github.com/anomalyco/opencode/issues/51014) 多实例重复通知  
- [#51005](https://github.com/anomalyco/opencode/issues/51005) RTL / 双向文本支持  
- [#51016](https://github.com/anomalyco/opencode/issues/51016) Desktop 文案未接入 i18n  
- [#50997](https://github.com/anomalyco/opencode/pull/50997) Catalan locale 修复  

随着用户群国际化，TUI 与 Desktop 的语言、方向性文本、可访问性和通知体验会越来越重要。

---

## 6. 开发者关注点

1. **V2 升级后的数据可靠性**  
   多个 Issue 指向 V1→V2 迁移、`session_v2`、消息持久化问题。开发者最担心的是“会话看不见”或“内容没有保存”，这会直接影响生产使用信任。

2. **MCP 工具链仍需完善生命周期管理**  
   用户已开始在真实工作流中依赖 MCP，但当前仍存在工具未注入、server 重复启动、OAuth token 竞争刷新、登录交互不一致等问题。

3. **Provider 兼容性需要更强的诊断能力**  
   自定义 Provider、OpenAI-compatible gateway、Copilot、Gemini/Kimi schema 等问题频繁出现。开发者需要更明确的错误提示、endpoint 路由策略和 schema 兼容层。

4. **TUI 插件 API 与多实例体验需要稳定化**  
   `client.tui.showToast()` 破坏输入框、多个 TUI 实例重复通知，说明 TUI 事件系统和插件扩展 API 在复杂使用场景下还有边界问题。

5. **性能与成本意识增强**  
   [#51007](https://github.com/anomalyco/opencode/issues/51007) 关注 prompt caching，[#51010](https://github.com/anomalyco/opencode/issues/51010) 关注 Zen Go 吞吐，[#51025](https://github.com/anomalyco/opencode/pull/51025) 展示模型 token 成本，说明用户越来越关注延迟、吞吐和推理成本。

6. **跨平台与企业网络环境支持不足**  
   Windows 系统代理下 ripgrep 下载失败 [#51022](https://github.com/anomalyco/opencode/issues/51022)、macOS CLI 签名修复 [#51015](https://github.com/anomalyco/opencode/pull/51015)，都说明企业或受限环境中的可部署性是后续需要重点打磨的方向。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-09-24

## 1. 今日速览

过去 24 小时 Pi 仓库没有新版本发布，但 Issue 与 PR 活跃度较高：社区集中反馈了 **OpenAI Responses 兼容性、TUI/终端交互、工具调用中断、模型配置与成本统计** 等问题。  
今日关闭的 Issue 数量较多，说明维护侧响应速度较快；同时多个 PR 聚焦于 **模型基础设施、终端体验、Agent 稳定性、依赖治理与测试能力**。

---

## 2. 社区热点 Issues

### 1. OpenAI Responses 在负载均衡代理后多轮对话失败  
Issue：[#9966](https://github.com/badlogic/pi-mono/issues/9966)  
该问题指出，当 OpenAI-compatible `openai-responses` 端点位于负载均衡代理后方时，Pi 会在下一轮重放 reasoning item 的服务端 ID，导致后端实例无法识别该 ID 并返回 upstream error。  
**重要性**：影响多轮对话可靠性，尤其是通过 Bifrost、LiteLLM 等网关接入模型的场景。  
**社区反应**：评论数较高，且同类问题重复出现，说明 Responses API 兼容层仍是近期重点。

### 2. CMD 模式忽略 `outputPad` 设置  
Issue：[#9946](https://github.com/badlogic/pi-mono/issues/9946)  
用户反馈 CMD 模式 `!` 输出即使设置 `"outputPad": 0`，行首仍然存在空格，而普通聊天消息可正确遵循该设置。  
**重要性**：影响终端复制、脚本输出对齐与视觉一致性。  
**社区反应**：评论活跃，属于 TUI 细节体验问题中的高关注项。

### 3. `/skill` 输入时自动补全为空  
Issue：[#9944](https://github.com/badlogic/pi-mono/issues/9944)  
用户在输入 `/skill` 时，自动补全面板为空，但截图显示技能已正确加载。  
**重要性**：影响 Skill 发现与使用体验，尤其对依赖技能扩展工作流的用户影响明显。  
**社区反应**：有多轮讨论，问题已关闭，说明维护侧已快速处理或定位。

### 4. 工具执行中止后，部分 tool calls 未写入结果  
Issue：[#9986](https://github.com/badlogic/pi-mono/issues/9986)  
当用户在批量工具执行过程中中止，已启动工具会有结果或 aborted 状态，但后续尚未执行的 tool calls 会从历史中消失，且无错误提示。  
**重要性**：直接影响 Agent 会话一致性与可恢复性，也可能破坏后续上下文。  
**社区反应**：评论较多，属于 Agent 执行模型中的关键可靠性问题。

### 5. Fork 旧版本会话时历史丢失  
Issue：[#9950](https://github.com/badlogic/pi-mono/issues/9950)  
用户报告 fork v3 之前创建的旧会话时，新副本显示为空历史，疑似 `forkFrom` 未进行 legacy session migration。  
**重要性**：影响长期用户的历史会话迁移与分支工作流。  
**社区反应**：多条评论，说明会话兼容性仍需关注。

### 6. Read renderer 行号范围字符串拼接错误  
Issue：[#9989](https://github.com/badlogic/pi-mono/issues/9989)  
当模型将 `offset` / `limit` 作为字符串传入时，TUI 中读取工具的行号范围会出现字符串拼接，例如 `25 + "13" - 1` 显示为 `25-2512`。  
**重要性**：虽然是显示层问题，但会误导开发者定位代码位置。  
**社区反应**：已有对应 PR 修复，属于社区贡献快速闭环案例。

### 7. Ollama 模型无法使用 reasoning level `max`  
Issue：[#9981](https://github.com/badlogic/pi-mono/issues/9981)  
社区反馈 Ollama 模型没有暴露 `max` reasoning level，请求时会被静默降级为 `high`。  
**重要性**：影响本地模型与高推理配置用户，尤其是希望显式控制 reasoning effort 的场景。  
**社区反应**：有讨论并关闭，反映模型能力映射仍需更透明。

### 8. 保存默认模型时覆盖全局模型配置  
Issue：[#9972](https://github.com/badlogic/pi-mono/issues/9972)  
用户发现通过 `/model` 保存默认模型可能用项目级 override 覆盖全局 `enabledModels`，导致其他项目使用的模型被移除。  
**重要性**：配置作用域错误会导致跨项目工作流混乱，影响较广。  
**社区反应**：评论较多，属于配置管理高风险问题。

### 9. Bash tool 的 `timeout` 参数不生效  
Issue：[#9985](https://github.com/badlogic/pi-mono/issues/9985)  
用户报告 agent 的 bash tool 设置 `timeout` 后仍会运行到自然结束，没有被中断。  
**重要性**：影响自动化任务安全性，可能导致长时间挂起或资源占用。  
**社区反应**：已关闭，但该问题与工具执行可靠性、watchdog 机制相关，值得持续关注。

### 10. LLM stream hang 没有完整 watchdog 覆盖  
Issue：[#9976](https://github.com/badlogic/pi-mono/issues/9976)  
该 Issue 指出 SDK timeout 仅覆盖 time-to-headers，SSE keepalive 会绕过 undici body idle timeout，而 post-compaction continuation 也可能不受 watchdog 保护。  
**重要性**：这是影响长会话稳定性的底层问题，可能导致 Agent 无限挂起。  
**社区反应**：虽然评论数不高，但技术影响面大，值得列为重点风险。

---

## 3. 重要 PR 进展

### 1. 修复 read renderer 行号范围参数类型问题  
PR：[#9988](https://github.com/badlogic/pi-mono/pull/9988)  
将 read tool renderer 中的 `offset` / `limit` 强制转换为数字，避免模型传入字符串时发生行号拼接错误。  
对应 Issue：[#9989](https://github.com/badlogic/pi-mono/issues/9989)

### 2. Claude/inspiring goodall yna025  
PR：[#9987](https://github.com/badlogic/pi-mono/pull/9987)  
该 PR 摘要为空，已关闭。  
从标题看可能是一次自动生成或实验性分支提交，暂无可判断的功能变更信息。

### 3. 导出 durable scoped storage conformance suite  
PR：[#9977](https://github.com/badlogic/pi-mono/pull/9977)  
为 `@earendil-works/pi-durable/testing` 导出存储一致性测试套件，支持注入 Vitest/Jest 兼容 adapter。  
**意义**：增强持久化存储后端的一致性验证能力，方便扩展或替换 storage provider。

### 4. Add clock sync  
PR：[#9975](https://github.com/badlogic/pi-mono/pull/9975)  
该 PR 摘要为空，已关闭。  
从标题看可能涉及时钟同步能力，但缺少具体描述，暂无法确认影响范围。

### 5. 新增 PkgDiet dependency guardrail skill  
PR：[#9970](https://github.com/badlogic/pi-mono/pull/9970)  
新增 PkgDiet 依赖治理技能，通过 MCP server 在执行 `npm install` / `yarn add` 前评估依赖包。  
**意义**：面向 AI Coding Agent 的安全边界建设，减少引入废弃、臃肿或恶意依赖的风险。  
相关 Issue：[#9971](https://github.com/badlogic/pi-mono/issues/9971)

### 6. 更新 GPT-6 API 上下文限制  
PR：[#9964](https://github.com/badlogic/pi-mono/pull/9964)  
将 GPT-6 Astra、Sol、Luna 的上下文窗口设置为 1,050,000 tokens，同时保留 128,000 输出限制，并补充 catalog 回归测试。  
**意义**：提升模型 catalog 准确性，避免上下文长度配置错误影响调度与计费估算。

### 7. 改进 Kitty 图片行数计算  
PR：[#9957](https://github.com/badlogic/pi-mono/pull/9957)  
使用 `Math.round()` 计算 Kitty protocol 图片行数，改善部分终端图像显示问题。  
**状态**：仍为 Open。  
**意义**：继续优化 TUI 在现代终端协议下的渲染体验。

### 8. Enter 后立即绘制用户消息气泡  
PR：[#9956](https://github.com/badlogic/pi-mono/pull/9956)  
修复用户按 Enter 后，输入框已清空但消息气泡需等待 `session.prompt` preflight 完成才显示的问题。  
**意义**：降低交互延迟感，改善 TUI 响应体验。

### 9. 统一 image 与 classifier 模型基础设施  
PR：[#9948](https://github.com/badlogic/pi-mono/pull/9948)  
对模型系统进行较大改造，使其支持 chat 之外的模型类型，包括 image 与 classifier。  
**意义**：这是模型架构层面的重要演进，为多模态能力和分类器能力接入打基础。

### 10. Abort unwind 期间重新提交 prompt 时转为 fresh prompt  
PR：[#9941](https://github.com/badlogic/pi-mono/pull/9941)  
修复用户按 Escape 中止流式响应后快速按 Enter 重新提交，导致新 prompt 被当作 steering message 丢失的问题。  
**意义**：提升中断、重试、快速交互场景下的会话可靠性。

---

## 4. 功能需求趋势

### 1. OpenAI Responses / LiteLLM / 网关兼容性  
多个 Issue 反映 Responses API 兼容层仍存在边界问题，包括 reasoning item ID 重放、tool calls 解析、provider 对 `tool_search` 的支持差异等。  
相关：[#9966](https://github.com/badlogic/pi-mono/issues/9966)、[#9967](https://github.com/badlogic/pi-mono/issues/9967)、[#9974](https://github.com/badlogic/pi-mono/issues/9974)、[#9961](https://github.com/badlogic/pi-mono/issues/9961)

### 2. Agent 工具执行可靠性  
社区关注 abort、timeout、bash shell 选择、tool call 历史一致性等问题。  
相关：[#9986](https://github.com/badlogic/pi-mono/issues/9986)、[#9985](https://github.com/badlogic/pi-mono/issues/9985)、[#9963](https://github.com/badlogic/pi-mono/issues/9963)、[#9976](https://github.com/badlogic/pi-mono/issues/9976)

### 3. TUI 与终端体验优化  
高频需求包括 `outputPad` 行为、Kitty keyboard protocol、图片渲染、select-all、tmux 不可见状态下延迟渲染等。  
相关：[#9946](https://github.com/badlogic/pi-mono/issues/9946)、[#9984](https://github.com/badlogic/pi-mono/issues/9984)、[#9949](https://github.com/badlogic/pi-mono/issues/9949)、[#9943](https://github.com/badlogic/pi-mono/issues/9943)、[#9957](https://github.com/badlogic/pi-mono/pull/9957)

### 4. 模型支持与模型 catalog 准确性  
社区对 Claude、Ollama、OpenRouter、GPT-6、GCP/AWS 模型接入提出多项反馈。重点包括模型可用性、reasoning level、上下文窗口、成本统计与云厂商支持。  
相关：[#9981](https://github.com/badlogic/pi-mono/issues/9981)、[#9978](https://github.com/badlogic/pi-mono/issues/9978)、[#9980](https://github.com/badlogic/pi-mono/issues/9980)、[#9983](https://github.com/badlogic/pi-mono/issues/9983)、[#9964](https://github.com/badlogic/pi-mono/pull/9964)

### 5. 配置作用域与会话迁移  
用户希望 Pi 在全局配置、项目配置、legacy session fork 等场景下行为更可预测。  
相关：[#9972](https://github.com/badlogic/pi-mono/issues/9972)、[#9950](https://github.com/badlogic/pi-mono/issues/9950)

### 6. 依赖治理与 Agent 安全边界  
PkgDiet 相关 Issue/PR 表明，社区开始关注 AI Agent 自动安装依赖时的安全、体积与维护风险。  
相关：[#9971](https://github.com/badlogic/pi-mono/issues/9971)、[#9970](https://github.com/badlogic/pi-mono/pull/9970)

---

## 5. 开发者关注点

1. **兼容层稳定性仍是核心痛点**  
   OpenAI Responses、LiteLLM、OpenRouter、Ollama 等适配问题频繁出现，说明 Pi 用户正在大量接入非官方或多供应商模型网关。

2. **Agent 中断与超时机制需要更强保障**  
   abort、timeout、stream hang、tool call 历史缺失等问题表明，开发者需要更可靠的任务生命周期管理。

3. **终端体验细节对高频用户影响明显**  
   `outputPad`、Cmd+A、Kitty 协议、tmux 渲染等反馈说明 Pi 的 TUI 已被深度用于日常开发，细节一致性会直接影响生产力。

4. **模型配置需要更透明、更少副作用**  
   默认模型保存覆盖全局配置、reasoning level 静默降级、成本估算偏差等问题，都会影响开发者对工具行为的信任。

5. **长期会话与迁移兼容性很重要**  
   fork legacy session 丢历史、post-compaction continuation hang 等问题显示，长会话和历史会话管理正在成为真实使用场景中的关键需求。

6. **社区贡献闭环较快**  
   多个 Issue 在当天关闭，且如 read renderer 行号错误已有对应 PR 修复，说明维护节奏较快，社区反馈能较快进入实现层。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报  
日期：2026-09-24  
仓库：QwenLM/qwen-code

## 1. 今日速览

过去 24 小时，Qwen Code 社区重点集中在 **会话管理、文件身份安全、Web Shell 集成、MCP/ACP 兼容性以及桌面端更新控制** 等方向。  
当天有一个 nightly 版本发布，同时多个 P1/P2 问题被快速跟进，尤其是图片会话缓存错配、项目移动后 session 不可达、64 位文件 ID 比较失真等问题，反映出社区正在强化 Qwen Code 在长期会话、跨平台文件系统和集成场景下的可靠性。

---

## 2. 版本发布

### v0.24.4-nightly.20260923.d0cd622a68  
链接：https://github.com/QwenLM/qwen-code/releases/tag/v0.24.4-nightly.20260923.d0cd622a68

本次 nightly 主要包含：

- 修复 deferred-tool bridge 相关的 stale / untested 问题，由 PR #12355 引入。
- 更新计划类文档。
- 发布 `cua-driver-rs v0.20.11` 预构建二进制，位于 `packages/cua-driver`：
  - macOS：已签名、公证，提供 universal binary 和 `QwenCuaDriver.app`
  - Linux：未签名，支持 x86_64 / arm64，glibc 2.31+
  - Windows：未签名 UIAccess worker 和 native SDK payload，支持 x86_64 / arm64

整体来看，这次发布偏向基础设施、文档和 CUA Driver 分发更新，为跨平台桌面/自动化能力继续铺底。

---

## 3. 社区热点 Issues

### 1. P1：新附图被会话旧图静默顶替  
Issue：https://github.com/QwenLM/qwen-code/issues/12544

该问题报告了会话中新增图片被旧图片替换的严重情况，即用户通过 `@路径` 引用新截图，但模型实际收到的是历史图片。  
重要性在于它直接影响多模态输入的可信度，尤其是截图驱动的开发、调试和 UI 分析场景。该 Issue 被标记为 P1，已有 4 条评论，说明维护者已将其视为高优先级会话/缓存问题。

### 2. 项目重命名或移动后，已保存 session 不可达  
Issue：https://github.com/QwenLM/qwen-code/issues/12553

Qwen Code 当前将 session 绑定到由绝对路径派生的目录名，项目移动或重命名后，即便用户提供完整 session UUID，也无法恢复旧会话。  
这是长期项目、迁移工作区、跨机器同步场景中的核心体验问题。社区已有对应修复 PR #12592，说明问题已经进入实现阶段。

### 3. repo-context 的 plan identity guard 在大 inode 上失效  
Issue：https://github.com/QwenLM/qwen-code/issues/12574

该问题指出 repo-context 中两个 plan identity guard 仍使用 number-backed inode 比较，在文件 ID 超过 `2^53` 时可能失真并 fail open。  
这是典型的跨平台文件系统安全问题，尤其影响 Windows 或大规模文件系统。该 Issue 已关闭，并由 PR #12577 跟进修复。

### 4. save-artifact 的 isSameFile 覆盖保护缺少 hard-link 见证测试  
Issue：https://github.com/QwenLM/qwen-code/issues/12578

该 Issue 是 #11848 的后续，要求对 `save-artifact` 中三个输入路径的覆盖保护增加硬链接验证，确保 `isSameFile` 在复杂文件身份场景下可靠。  
问题本身偏测试和安全防护，但重要性较高，因为 artifact 保存路径一旦判断错误，可能造成误覆盖。已有 PR #12581 跟进。

### 5. Desktop 应允许关闭启动更新检查  
Issue：https://github.com/QwenLM/qwen-code/issues/12575

用户希望 Qwen Code Desktop 遵循 `general.enableAutoUpdate` 或提供独立开关，以禁用启动时的更新检查。  
这个需求反映了企业环境、离线环境、受控部署场景下对网络访问和自动更新行为的控制需求。已有 PR #12587 增加环境变量开关。

### 6. ACP transcript replay 丢失 embedded resource prompt blocks  
Issue：https://github.com/QwenLM/qwen-code/issues/12538

ACP 的 `session/prompt` 可以包含 embedded `resource` block，模型能收到内容，但 durable user record 未保留原始 typed block，导致 daemon transcript 和 replay 无法完整还原。  
这对 IDE/ACP 集成、可审计性和会话回放非常关键。已有 PR #12585 处理 embedded text resource 的持久化与回放。

### 7. Runtime Broker 在 dispatch lease 过期后未正确 fence 取消中的工具执行  
Issue：https://github.com/QwenLM/qwen-code/issues/12584

Java Runtime Broker 中，工具执行可能停留在 `CANCEL_REQUESTED`，dispatch lease 过期后没有进一步 fence，导致结果被丢弃，Runtime Session release 被阻塞。  
这是 SDK / daemon / runtime 可靠性问题，尤其影响长时间运行的工具和远程 runtime。已有 PR #12583 修复，并已关闭。

### 8. session-commit 注册无法绑定到实际产生 commit 的命令  
Issue：https://github.com/QwenLM/qwen-code/issues/12523

该问题指出在 agent 命令窗口中，如果并发 commit 发生，session-commit 注册可能被错误关联，进而影响 `git commit --amend` 的安全豁免。  
这是 shell / git / core 安全边界问题，社区讨论已有 4 条评论，优先级 P2，后续可能需要将 commit 归因绑定到具体 child process。

### 9. Web Shell 缺少选择性 host artifact handling 和共享高亮能力  
Issue：https://github.com/QwenLM/qwen-code/issues/12586

嵌入式 Web Shell host 目前必须接管所有右侧面板打开行为，无法只处理部分 artifacts，也难以复用 transcript code highlighting。  
该需求对将 Qwen Code 嵌入到第三方 IDE、平台或浏览器工作台非常重要。已有 PR #12588 实现选择性集成能力。

### 10. Agent 重复调查已在会话历史中出现的信息  
Issue：https://github.com/QwenLM/qwen-code/issues/12579

用户反馈 agent 经常重新读取文件、重新搜索或重复分析已经在会话历史中处理过的信息，导致 token 和时间浪费，尤其影响本地 LLM。  
这是上下文利用效率问题，和成本、性能、体验直接相关。已有 PR #12580 通过 system prompt 增加“先从 conversation history 回答”的策略。

---

## 4. 重要 PR 进展

### 1. 修复项目移动后的显式 resume  
PR：https://github.com/QwenLM/qwen-code/pull/12592

该 PR 处理 #12553：当 `qwen --resume <full-uuid>` 在当前项目找不到 session 时，会在 Qwen 管理的项目目录中进行有界查找。  
如果发现唯一匹配且原项目目录已不存在，会提示用户重新绑定到当前位置，从而恢复项目移动/重命名后的会话可访问性。

### 2. 为 Web Shell E2E Smoke 增加超时时间  
PR：https://github.com/QwenLM/qwen-code/pull/12593

将 `web-shell E2E Smoke` job 超时从 20 分钟提升到 30 分钟。  
当前 smoke suite 已增长到 184 个测试，setup 耗时约 7.5 分钟，原 20 分钟限制容易导致测试通过但 CI 超时失败。该 PR 主要提升 CI 稳定性。

### 3. System One Decision Gate / superfast 模式  
PR：https://github.com/QwenLM/qwen-code/pull/12590

实现 #12589 中提出的可选 System One Decision Gate。  
通过小型本地决策模型 Von 对用户请求进行快速分类，在明显无需复杂推理的请求上跳过昂贵流程。功能默认关闭，失败时 fail open，不捆绑模型。该方向值得关注，可能成为本地模型与低延迟模式的重要探索。

### 4. Web Shell 支持选择性 host artifact 集成  
PR：https://github.com/QwenLM/qwen-code/pull/12588

对应 #12586，允许嵌入式 host 只处理选定的右侧面板请求，并将其他请求交还 Web Shell 默认处理。  
同时提供 artifact predicate 和 transcript highlighter 复用能力，有助于第三方平台更细粒度地集成 Qwen Code。

### 5. Desktop 增加启动更新检查关闭开关  
PR：https://github.com/QwenLM/qwen-code/pull/12587

为 Qwen Code Desktop 增加 `QWEN_DESKTOP_DISABLE_UPDATES=1` 环境变量。  
设置后，`check_updates_silently()` 会在启动 updater 任务前直接返回，不发起 feed 请求，也不会触发 `update-available` 事件。该 PR 回应了企业/离线部署场景需求。

### 6. ACP embedded text resource 持久化与 transcript replay  
PR：https://github.com/QwenLM/qwen-code/pull/12585

修复 #12538：将 ACP embedded text `resource` block 与所属用户 prompt 一起持久化，并在 replay 中作为 typed user chunks 还原。  
daemon UI SDK 也会区分这些 blocks、`resource_link` 和 native attachments，提升 transcript 的完整性和可审计性。

### 7. Runtime Broker lease 过期后仍可传递取消  
PR：https://github.com/QwenLM/qwen-code/pull/12583

修复 Java Runtime Broker 中工具执行取消状态悬挂问题。  
Broker 新增 in-flight invocation 跟踪，使 cancel 能真正到达仍在 `transport.execute` 中的调用。该 PR 已关闭，对 runtime 稳定性有直接改善。

### 8. 远程 Agents 与 A2A 共享能力  
PR：https://github.com/QwenLM/qwen-code/pull/12582

该 PR 基于 #11206，扩展 agent 运行时能力：支持 agents 在其他计算机运行，并通过 A2A 与 workspace 外部调用者共享。  
这是 Qwen Code 从本地 agent 工具向分布式、多 runtime 协作演进的重要一步。

### 9. 为 save-artifact overwrite guard 增加 hard-link witness 测试  
PR：https://github.com/QwenLM/qwen-code/pull/12581

对应 #12578，为 `save-artifact` 的覆盖保护增加 3 组 hard-link witness 测试，覆盖 `findings`、`composed`、`report` 三类输入路径。  
该 PR 强化了文件身份判断的测试覆盖，避免未来在硬链接/大 inode 场景下回归。

### 10. MCP server 遇到 `-32601 Method not found` 时保持连接  
PR：https://github.com/QwenLM/qwen-code/pull/12562

修复 #12496：部分 tools-only MCP server 在 discovery 阶段对 `prompts/list` 或 `resources/list` 返回 `-32601`。此前客户端将其视作硬错误并断开连接。  
该 PR 让 Qwen Code 对 legacy 或能力较少的 MCP server 更兼容，避免 tools/list 成功但整体 server 被误判为 disconnected。

---

## 5. 功能需求趋势

### 1. 会话管理与长期记忆可靠性

相关 Issues / PR：

- https://github.com/QwenLM/qwen-code/issues/12553
- https://github.com/QwenLM/qwen-code/issues/12544
- https://github.com/QwenLM/qwen-code/issues/12591
- https://github.com/QwenLM/qwen-code/issues/12576
- https://github.com/QwenLM/qwen-code/issues/12558

社区明显关注 session 的长期可达性、图片 payload replay 的准确性、scheduled task session 的可发现性，以及 managed memory 变更通知。  
这说明 Qwen Code 的使用场景正在从短会话问答扩展到长期项目协作、自动化任务和可回放工作流。

### 2. Web Shell 与嵌入式平台集成

相关 Issues / PR：

- https://github.com/QwenLM/qwen-code/issues/12586
- https://github.com/QwenLM/qwen-code/issues/12551
- https://github.com/QwenLM/qwen-code/issues/12576
- https://github.com/QwenLM/qwen-code/pull/12588

Web Shell 方向的需求集中在 artifact handling、HTML artifact 分享、session 列表可见性和 host 集成灵活性。  
这表明 Web Shell 正在成为 Qwen Code 面向外部平台、IDE 和浏览器工作流的重要集成面。

### 3. 性能、低延迟与本地模型体验

相关 Issues / PR：

- https://github.com/QwenLM/qwen-code/issues/12589
- https://github.com/QwenLM/qwen-code/issues/12579
- https://github.com/QwenLM/qwen-code/issues/12550
- https://github.com/QwenLM/qwen-code/pull/12590
- https://github.com/QwenLM/qwen-code/pull/12580

社区关注点包括：  
- 使用小模型进行快速决策，减少大模型调用；
- 避免 agent 重复读取和搜索；
- 降低 TUI 渲染开销；
- 提升本地 LLM 场景下的响应速度和 token 效率。

### 4. 安全与文件系统边界

相关 Issues / PR：

- https://github.com/QwenLM/qwen-code/issues/12574
- https://github.com/QwenLM/qwen-code/issues/12578
- https://github.com/QwenLM/qwen-code/issues/12523
- https://github.com/QwenLM/qwen-code/pull/12577
- https://github.com/QwenLM/qwen-code/pull/12581

多个问题都围绕文件身份、inode 精度、hard-link、git commit 归因等边界条件。  
这类问题虽然不一定影响日常用户，但对安全模型和企业级可信执行非常关键。

### 5. MCP / ACP / SDK 兼容性

相关 Issues / PR：

- https://github.com/QwenLM/qwen-code/issues/12538
- https://github.com/QwenLM/qwen-code/issues/12584
- https://github.com/QwenLM/qwen-code/pull/12585
- https://github.com/QwenLM/qwen-code/pull/12583
- https://github.com/QwenLM/qwen-code/pull/12562
- https://github.com/QwenLM/qwen-code/pull/12571

集成协议和 SDK 相关问题持续升温，主要包括 transcript replay 完整性、runtime broker 取消语义、MCP discovery 容错、SDK declaration 打包完整性。  
这说明第三方集成者和高级开发者正在更深入地使用 Qwen Code 的 daemon、ACP、MCP 和 SDK 能力。

---

## 6. 开发者关注点

### 1. 多模态输入必须具备可验证性

#12544 暴露的图片错配问题说明：当模型实际看到的图片和用户指定图片不一致时，会严重破坏 agent 的可信度。  
后续 #12591 进一步要求 replayed images 按 user turn 标注，说明开发者希望系统明确区分“当前输入”和“历史回放内容”。

### 2. Session 不应被绝对路径强绑定

#12553 体现了长期项目使用中的典型痛点：项目移动、重命名、同步到新位置后，历史 session 应该仍能恢复。  
开发者期望 session 能通过 UUID、元数据或重绑定机制保持可达，而不是被旧路径永久锁死。

### 3. Web Shell 需要更开放的宿主集成能力

多个 Web Shell 相关需求显示，嵌入式场景下 host 不希望“全量接管”，而是希望选择性处理 artifacts、预览、高亮和分享。  
这类需求主要来自平台化集成者，说明 Qwen Code 正在被用作可嵌入 AI 开发工作台，而不仅是独立 CLI。

### 4. 本地模型用户对 token 浪费极其敏感

#12579 和 #12589 都指向同一类诉求：不要让大模型反复做简单判断或重复调查。  
对本地 LLM 或低成本部署而言，conversation history 的有效利用、快速 gate、减少不必要 tool call，会直接影响可用性。

### 5. 企业和受控环境需要更强配置权

Desktop 更新检查 opt-out、Realtime endpoint 配置、SDK 打包完整性等问题都表明，开发者希望 Qwen Code 在企业网络、离线环境和内部平台中更可控。  
自动更新、网络请求、默认 endpoint、依赖安装等行为都需要明确、可配置、可审计。

### 6. 跨平台文件系统细节仍是安全热点

大 inode、hard-link、Windows file identity、number 精度等问题多次出现。  
开发者对“文件是否同一对象”的判断提出了更高要求，尤其是在 artifact 保存、repo context、删除日志和安全 guard 中。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026-09-24）

## 1. 今日速览

过去 24 小时社区活动非常密集：Issues 侧新增/更新 39 条，PR 侧更新 41 条，核心关注点集中在 **0.10.x 稳定性修复、审批/权限安全模型、Auto-Review、子代理协作与上下文压缩体验**。  
今天没有新 Release，但维护者明显在为 **0.10.1 / 0.10.2 / 0.11** 分层推进：短期修复运行卡死、粘贴回归、会话恢复等问题，中期强化审批与审查机制，长期重构权限与多 Agent 协作边界。

---

## 2. 社区热点 Issues

### 1. Windows Terminal 多行粘贴回归  
[#6427](https://github.com/Hmbown/DeepSeek-TUI/issues/6427)

**问题**：0.10.0 中 Windows Terminal 下多行粘贴会被拆成多条消息并自动提交，疑似此前 #5981 修复被破坏。  
**重要性**：这是高频交互路径，直接影响 Windows 用户的输入可靠性，尤其是粘贴代码块、日志、Prompt 模板时。  
**社区反应**：已有 1 条评论，属于明确回归类 Bug，优先级应较高。

---

### 2. 模型主动触发自压缩机制  
[#6426](https://github.com/Hmbown/DeepSeek-TUI/issues/6426)

**问题**：当前 auto-compaction 完全由引擎控制，模型无法在合适语义边界主动请求压缩。  
**重要性**：对于长任务、多轮代码修改、复杂 Agent 流程，模型如果能主动“整理记忆”，可减少上下文截断导致的误判。  
**社区反应**：已有 1 条评论，属于面向 Agent 能力增强的核心需求。

---

### 3. Auto-compaction 启用时缺少模型可见的上下文压力提示  
[#6425](https://github.com/Hmbown/DeepSeek-TUI/issues/6425)

**问题**：启用自动压缩后，模型不会收到上下文即将被压缩的提示。  
**重要性**：模型无法提前总结关键状态，可能导致压缩后丢失任务意图、约束或中间结论。  
**社区反应**：已有 1 条评论，与 #6426 共同反映“上下文管理应更模型感知”。

---

### 4. deepSeek-flash 在 0.10.0 中无法处理图片输入  
[#6421](https://github.com/Hmbown/DeepSeek-TUI/issues/6421)

**问题**：用户粘贴图片后，deepSeek-flash 提示不支持 image input。  
**重要性**：多模态能力是模型体验的重要入口，若模型能力识别或路由错误，会影响用户对新模型支持度的判断。  
**社区反应**：已有 1 条评论，属于模型能力兼容性问题。

---

### 5. 会话无法恢复  
[#6418](https://github.com/Hmbown/DeepSeek-TUI/issues/6418)

**问题**：用户恢复会话时报错，提示保存的 Runtime store 与当前环境不匹配。  
**重要性**：会话恢复是长任务开发的基础能力，失败会直接造成工作流中断。  
**社区反应**：已有 1 条评论，影响面可能较广，需关注是否与 0.10.0 的 Runtime 存储变更有关。

---

### 6. Deferred tool 首次调用不应额外消耗一轮  
[#6494](https://github.com/Hmbown/DeepSeek-TUI/issues/6494)

**问题**：首次调用 deferred tool 时仅返回“工具已加载，请重试”，导致每个工具多一次往返，弱模型还可能循环。  
**重要性**：直接影响工具调用效率和 Agent 稳定性。  
**社区反应**：暂无评论，但维护者已标明有 PR #6437 可落地，属于明确的工程优化项。

---

### 7. 子 Agent 结果需要机器可验证回执  
[#6492](https://github.com/Hmbown/DeepSeek-TUI/issues/6492)

**问题**：子 Agent 目前最终报告主要是自然语言，父 Agent 或用户需要手动验证修改、命令、测试结果。  
**重要性**：多 Agent 协作中，结果可信度和可审计性非常关键。该 Issue 提议附带 diff、命令退出码、测试数、耗时、花费等机器构建的 receipt。  
**社区反应**：暂无评论，但属于多 Agent 可靠性建设的重要方向。

---

### 8. 每会话 scratch 目录与 Agent 间工作树租约  
[#6491](https://github.com/Hmbown/DeepSeek-TUI/issues/6491)

**问题**：模型没有明确 scratch 目录，容易随意使用 `/tmp` 或污染仓库；多个 Agent 同时操作工作树也缺少协调机制。  
**重要性**：对复杂代码任务、临时文件生成、多 Agent 并发修改都很关键。  
**社区反应**：暂无评论，但设计上直指 Agent 工程化落地问题。

---

### 9. Spend / context 对模型可见，并在自动压缩前提示一次  
[#6490](https://github.com/Hmbown/DeepSeek-TUI/issues/6490)

**问题**：模型看不到当前花费、预算、剩余上下文，也不会在 auto-compaction 前收到提示。  
**重要性**：成本感知和上下文感知是 Agent 自我调度的基础，尤其适合长时间自动化任务。  
**社区反应**：暂无评论，但与 #6425/#6426 构成同一类“模型自我管理能力”需求。

---

### 10. 0.11 权限与审批架构重构：统一 Engine-owned approval grant store  
[#6481](https://github.com/Hmbown/DeepSeek-TUI/issues/6481)

**问题**：当前 TUI、runtime、network 存在三套独立 grant store，状态不同步。  
**重要性**：审批权限是安全边界核心。多存储会造成权限漂移、重启丢失、不一致授权等风险。  
**社区反应**：暂无评论，但这是 0.11 安全模型重构的关键基础 Issue。

---

## 3. 重要 PR 进展

### 1. 修复 approved `run_verifiers` 后运行卡死  
[#6496](https://github.com/Hmbown/DeepSeek-TUI/pull/6496)

修复 0.10.1 桌面 QA 中发现的审批卡死问题：用户点击 **Allow once** 后，`run_verifiers` 仍显示等待审批并持续 Working。  
该 PR 同时改进审批卡片文案，让用户更清楚批准后会发生什么。

---

### 2. 修复 TUI undo 无法回滚对应 turn 的文件  
[#6483](https://github.com/Hmbown/DeepSeek-TUI/pull/6483)

修复 VS Code 客户端保存的会话中，undo 无法正确关联 workspace snapshot，导致文件未回滚的问题。  
这对“让 Agent 修改代码后可安全撤销”非常重要。

---

### 3. CI change detection 强制更新 base ref  
[#6463](https://github.com/Hmbown/DeepSeek-TUI/pull/6463)

修复 base branch 移动后浅 fetch 导致 change detection 失败的问题。  
属于发布与合并流程稳定性改进，可降低 CI 假失败率。

---

### 4. 修复 release 测试中 tag fixture 清理与自动维护任务竞态  
[#6462](https://github.com/Hmbown/DeepSeek-TUI/pull/6462)

解决 release 测试中 `rm: Directory not empty` 的清理失败问题。  
该问题出现在多个 PR 的 version drift 测试中，修复后有助于稳定 0.10.1 发布流程。

---

### 5. 安装页改为从 Markdown 渲染已验证安装指南  
[#6460](https://github.com/Hmbown/DeepSeek-TUI/pull/6460)

网站安装页现在直接渲染 `docs/INSTALL.md`，避免网站与文档维护两套安装说明。  
同时支持复制命令和检查内部锚点，降低文档漂移风险。

---

### 6. 保存 API Key 不再固定模型默认值  
[#6456](https://github.com/Hmbown/DeepSeek-TUI/pull/6456)

修复保存 API Key 时可能持久化模型默认值的问题。  
新逻辑只更新凭据元数据，避免后续 provider 默认模型变更无法生效。

---

### 7. 无 Key 发送时给出明确修复指引，Esc 返回 composer  
[#6455](https://github.com/Hmbown/DeepSeek-TUI/pull/6455)

当用户未配置 Key 就发送消息时，Transcript 将明确说明缺失的 Key 和 `codewhale auth set` 修复命令。  
同时修复从选择器按 Esc 后返回路径不合理的问题，改善首次使用体验。

---

### 8. 原生 DeepSeek Harness bundle 导入与审核流程  
[#6451](https://github.com/Hmbown/DeepSeek-TUI/pull/6451)

将 DeepSeek Harness bundle 导入从外部 Python 脚本流程转为产品内原生导入，并纳入 review 流程。  
这有助于插件/工具生态标准化，也降低用户安装门槛。

---

### 9. Fleet：写入型 Agent 停止需二次确认，并增加后代回执  
[#6448](https://github.com/Hmbown/DeepSeek-TUI/pull/6448)

对子 Agent / Fleet 工作流增加更安全的 Stop 机制：能修改文件的 Agent 需要两次确认停止，Stop 会级联到后代，并生成对应回执。  
这改善了多 Agent 任务的可控性和可审计性。

---

### 10. 本地化审批摘要，Footer 标注权限状态  
[#6447](https://github.com/Hmbown/DeepSeek-TUI/pull/6447)

审批卡片摘要扩展到 15 个语言包，不再只在英文下有清晰说明。  
同时 Footer 标注当前权限状态，提升国际化用户在审批流程中的可理解性。

---

## 4. 功能需求趋势

### 1. 上下文与记忆管理成为核心议题

多个 Issue 聚焦 auto-compaction、上下文压力提示、模型主动 compact、模型可见 spend/context 等能力：

- [#6426](https://github.com/Hmbown/DeepSeek-TUI/issues/6426)
- [#6425](https://github.com/Hmbown/DeepSeek-TUI/issues/6425)
- [#6490](https://github.com/Hmbown/DeepSeek-TUI/issues/6490)

趋势表明：社区不只希望“自动压缩”，更希望模型能理解当前上下文状态，并在合适时机主动规划。

---

### 2. 审批、权限、安全边界持续升级

0.10.2 与 0.11 相关 Issue 大量围绕审批系统：

- Full Access 进入确认与作用域：[ #6473](https://github.com/Hmbown/DeepSeek-TUI/issues/6473)
- 审批 grant 持久化：[ #6472](https://github.com/Hmbown/DeepSeek-TUI/issues/6472)
- 统一 Engine-owned grant store：[ #6481](https://github.com/Hmbown/DeepSeek-TUI/issues/6481)
- 网络审批按 host/protocol/port 区分：[ #6484](https://github.com/Hmbown/DeepSeek-TUI/issues/6484)

这说明项目正在从“可用的 Agent 工具”转向“可审计、可控、安全默认”的工程平台。

---

### 3. Auto-Review 正在产品化

围绕 Auto-Review 的 G1-G6 Issue 形成完整路线：

- review failed 与 denied 分离：[ #6475](https://github.com/Hmbown/DeepSeek-TUI/issues/6475)
- 审查器获得带信任边界的上下文：[ #6476](https://github.com/Hmbown/DeepSeek-TUI/issues/6476)
- 风险 × 授权 schema：[ #6477](https://github.com/Hmbown/DeepSeek-TUI/issues/6477)
- 连续拒绝 circuit breaker：[ #6478](https://github.com/Hmbown/DeepSeek-TUI/issues/6478)
- `/approve` 覆盖近期拒绝：[ #6479](https://github.com/Hmbown/DeepSeek-TUI/issues/6479)
- 低成本模型路由：[ #6480](https://github.com/Hmbown/DeepSeek-TUI/issues/6480)

方向非常明确：Auto-Review 将不只是一个提示模型，而是带 schema、策略映射、失败降级和成本控制的安全子系统。

---

### 4. 多 Agent / Fleet 协作能力增强

子 Agent 相关需求集中在结果可验证、权限继承、工作树隔离与停止控制：

- 子 Agent 结果 receipt：[ #6492](https://github.com/Hmbown/DeepSeek-TUI/issues/6492)
- 工作树 lease：[ #6491](https://github.com/Hmbown/DeepSeek-TUI/issues/6491)
- 子权限与 live owner 取交集：[ #6485](https://github.com/Hmbown/DeepSeek-TUI/issues/6485)
- Fleet Stop 与 descendant receipts PR：[ #6448](https://github.com/Hmbown/DeepSeek-TUI/pull/6448)

这表明 Fleet / subagent 正在从实验能力走向可管理的并行工程流程。

---

### 5. 安装、文档与首次使用体验持续改善

相关 PR 涵盖安装文档、网站渲染、认证错误提示、配置文案：

- [#6460](https://github.com/Hmbown/DeepSeek-TUI/pull/6460)
- [#6450](https://github.com/Hmbown/DeepSeek-TUI/pull/6450)
- [#6455](https://github.com/Hmbown/DeepSeek-TUI/pull/6455)
- [#6453](https://github.com/Hmbown/DeepSeek-TUI/pull/6453)

趋势是减少“用户读错文档 / 不知道怎么修”的摩擦，尤其面向新用户和跨平台安装。

---

## 5. 开发者关注点

### 1. 0.10.0 回归与稳定性仍是短期焦点

Windows 多行粘贴、会话恢复、图片输入、审批卡死等问题说明 0.10.0 后仍有若干关键路径回归。  
开发者最关心的是：基础交互不能破坏，尤其是输入、恢复、审批、模型能力识别。

---

### 2. 长任务需要更可靠的上下文策略

开发者反馈不再满足于简单 token 裁剪，而是希望模型知道：

- 什么时候快到上下文上限；
- 是否即将被压缩；
- 当前花了多少钱；
- 还剩多少预算；
- 是否可以主动请求压缩。

这类需求与真实代码任务强相关，尤其影响多小时级别的 Agent 会话。

---

### 3. 权限系统需要统一、持久、可解释

当前多个 Issue 指出审批状态分散、重启后丢失、Full Access 可见性不足、网络授权粒度过粗。  
开发者希望权限行为符合三点：

1. 用户知道当前处于什么权限；
2. Runtime、TUI、App、ACP 表现一致；
3. 重启或恢复后授权状态可追踪、可审计。

---

### 4. 多 Agent 协作需要“机器可验证”而非只靠自然语言

子 Agent 报告不能只写“我完成了”。开发者需要 diff、命令、测试、退出码、耗时、成本等结构化证据。  
这会成为 Fleet / subagent 能否用于真实工程任务的关键条件。

---

### 5. CI 与发布流程稳定性仍在补强

多个 PR 在修复 change detection、release fixture、macOS runner 队列、runtime restart flake 等问题。  
这说明项目当前迭代速度很快，维护者正在同时处理功能推进与 CI 可持续性问题。

---

**总体判断**：今天的动态显示 DeepSeek TUI 正在从“交互式 AI 代码终端”快速演进为更完整的 Agent Runtime：上下文管理、安全审批、Auto-Review、多 Agent 协作和可审计性，已经成为下一阶段最核心的工程主线。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*