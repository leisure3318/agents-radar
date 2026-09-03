# AI CLI 工具社区动态日报 2026-09-03

> 生成时间: 2026-09-03 03:28 UTC | 覆盖工具: 9 个

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

以下为基于你提供的 2026-09-03 社区动态摘要整理的**横向对比分析报告**。  
**口径说明**：下表中的 Issue/PR 数量按各日报中“今日明确列出的热点项”统计；Release 按当日可见发布节点统计。

---

# AI CLI 工具横向对比分析报告（2026-09-03）

## 1) 生态全景

当前 AI CLI 工具生态已经从“单纯命令行调用模型”进入到 **生产级 agent 工具链竞争** 阶段。  
社区关注点明显从功能新增转向 **稳定性、权限边界、长会话可恢复性、MCP/OAuth 集成、跨平台兼容** 等工程化问题。  
从反馈密度看，Windows、沙箱、安全、会话状态和成本透明度是全行业共同压力面，说明这些工具正在被更深地嵌入真实开发流程。  
同时，多个项目都在推进 **TUI/桌面化、插件化、企业治理、模型/Provider 多样化**，表明 AI CLI 正在向“可控的生产平台”演进。

---

## 2) 各工具活跃度对比

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 | 活跃度观察 |
|---|---:|---:|---|---|
| Claude Code | 10 | 0 | 1 个正式版（v2.1.259） | 问题反馈集中，偏稳定性修复需求 |
| OpenAI Codex | 10 | 10 | 1 正式版 + 2 个 alpha | 迭代最密集之一，生态最活跃 |
| Gemini CLI | 2 | 7 | 无新 Release | PR 偏多、Issues 较少，偏稳健推进 |
| GitHub Copilot CLI | 10 | 0 | 2 个小版本（v1.0.83-2 / v1.0.83-3） | 企业/MCP/Windows 问题较集中 |
| Kimi Code CLI | 0 | 0 | 无活动 | 今日无可见动态 |
| OpenCode | 10 | 10 | 1 个版本（v1.18.27） | 高速迭代，兼顾产品与基础设施 |
| Pi | 10 | 10 | 无新 Release | 架构/运行时导向，讨论深度高 |
| Qwen Code | 10 | 10 | 1 个版本（live-host-v0.2.0） | 安全、性能、Web Shell 并进 |
| DeepSeek TUI | 10 | 10 | 无新 Release | 功能扩张与架构收敛同步推进 |

---

## 3) 共同关注的功能方向

### 1. 跨平台稳定性，尤其是 Windows
**涉及工具：** Claude Code、OpenAI Codex、Copilot CLI、Gemini CLI、Qwen Code  
**共同诉求：**
- Windows / Git Bash / WSL 下的路径、权限、进程与沙箱行为一致
- Desktop、daemon、后台任务不要静默退出或卡死
- Windows 特有的路径分隔符、ACL、Shell 兼容问题需要持续修正

**典型信号：**
- Claude：Git Bash 下 `cd` 权限误触发、Bash 调用永不返回
- Codex：Windows 沙箱 ACL、启动卡顿、桌面切换失败
- Copilot：WSL2 高内存/CPU、Windows 路径截断
- Gemini：POSIX/Windows 边界检查与符号链接处理
- Qwen：审批模式与 shell guard 的安全可见性问题

---

### 2. 长会话、恢复能力与状态一致性
**涉及工具：** Codex、Copilot CLI、OpenCode、Pi、Qwen Code、DeepSeek TUI、Claude Code  
**共同诉求：**
- 会话恢复、断点续跑、历史回放可靠
- 长时间运行不 OOM、不膨胀、不串状态
- 重新连接/重启后，状态必须可解释、可追踪

**典型信号：**
- Codex：长 `--resume` OOM、会话恢复 PR
- Copilot：长时间空闲后 `allow-all` 状态丢失、resume 会话 OOM
- OpenCode：多 tab 共享状态、重复建 session、workflow projection 重算
- Pi：可恢复 runtime、JSONL session 安全、流式解析 OOM
- DeepSeek TUI：重启后 tool-call 历史回放、workflow runtime hardening
- Claude：remote control 消息丢失、`claude agents` 导航回弹

---

### 3. MCP / OAuth / Provider 生态兼容
**涉及工具：** Claude Code、Codex、Copilot CLI、OpenCode、Gemini CLI、Pi、Qwen Code、DeepSeek TUI  
**共同诉求：**
- MCP/OAuth token 的复用、刷新、发现机制稳定
- 自定义 provider / 多模型 fallback 行为可控
- 插件、扩展、provider discovery 的兼容性更强

**典型信号：**
- Claude：组织级 `managedMcpServers`
- Codex：MCP OAuth refresh、Windows daemon、managed network 规则
- Copilot：MCP OAuth token 复用、agent 级 provider 选择
- OpenCode：OpenAI-compatible provider 模型发现、fallback 计费争议
- Gemini：扩展加载器路径边界、临时目录隔离
- Pi：OpenRouter / llama.cpp / vLLM 兼容增强
- Qwen：MCP 图片预算、channels 消息路由
- DeepSeek：live catalog、computer-use plugin、runtime API

---

### 4. 权限、安全与路径边界控制
**涉及工具：** Claude Code、OpenAI Codex、Gemini CLI、Copilot CLI、OpenCode、Qwen Code、Pi、DeepSeek TUI  
**共同诉求：**
- 审批、deny-read、shell guard、路径边界、symlink 解析更精准
- 沙箱、临时目录、清理逻辑不能误删工作区
- 安全策略要“可解释、可审计、可配置”

**典型信号：**
- Claude：macOS `mktemp -d` 忽略 `$TMPDIR`，存在误删风险
- Codex：Windows 沙箱 deny-read ACL 失败
- Gemini：workspace boundary / symlink / sandbox 加固
- Copilot：Linux sandbox 网络出口限制
- OpenCode：`permission.ask` 未触发、tmp 规则不一致
- Qwen：shell guard 忽略 approval mode，operator 不可见
- Pi：capability policy hook、tool timeout
- DeepSeek：TTL cleanup 递归删除未验证路径

---

### 5. 可观测性、诊断与错误分类
**涉及工具：** Codex、Gemini CLI、OpenCode、Pi、Qwen Code、DeepSeek TUI  
**共同诉求：**
- 错误不能被归为“network”或“null”而丢失语义
- 后台进程、失败原因、执行链路要能被用户看见
- CI / release / runtime 失败要更容易定位

**典型信号：**
- Gemini：`Exit Code: null` 对 signal-killed 进程不准确
- Codex：`Reconnecting... waiting for network` 误判本地 IO/流超时
- OpenCode：失败展示下沉到当前 session、CI failure patrol 改进
- Pi：signal-killed 映射为非零退出码、EOF 报错
- Qwen：monitor pulse storm 导致会话近似 DoS，需 rate limit
- DeepSeek：重启后 400、历史回放失败需要更明确归因

---

## 4) 差异化定位分析

### Claude Code
**定位特征：** 企业级自动化 + Desktop/Windows 使用场景  
**关键词：** managed MCP、headless 运行、权限系统、Bash 交互、桌面稳定性  
**判断：** 更像“组织级 AI 开发助手平台”，强调可管理性与桌面可用性。

---

### OpenAI Codex
**定位特征：** 面向重度开发流的交互式 agent 平台  
**关键词：** Composer、会话恢复、Windows daemon、MCP/OAuth、长会话、模型策略  
**判断：** 交互体验和工程化能力并进，明显在补齐跨平台和企业集成短板。

---

### Gemini CLI
**定位特征：** 安全边界更强、节奏更稳的 CLI 工具  
**关键词：** sandbox、边界检查、扩展回滚、默认模型升级  
**判断：** 更偏底层安全与稳定性打磨，热度不高但方向清晰。

---

### GitHub Copilot CLI
**定位特征：** 企业模型治理 + MCP + 多平台执行环境  
**关键词：** OAuth、默认模型、WSL2、allow-all 状态、provider 选择  
**判断：** 明显面向组织治理与企业工作流，问题集中在“策略一致性”和“资源稳定性”。

---

### OpenCode
**定位特征：** 前端/TUI 与多 Provider 生态并重的轻平台  
**关键词：** model discovery、计费透明、插件权限、session 隔离、Web Shell  
**判断：** 产品化程度高，社区反馈非常关注“能不能看懂、能不能控住、会不会串状态”。

---

### Pi
**定位特征：** 更像 agent runtime / harness 框架，而不是单一 CLI  
**关键词：** recoverable runtime、capability policy、session storage、provider 兼容  
**判断：** 架构导向最强，强调可恢复、可治理、可扩展，偏底层基础设施路线。

---

### Qwen Code
**定位特征：** Web Shell + 安全边界 + 性能治理  
**关键词：** approval mode、shell guard、workflow projection、monitor storm、CI hardening  
**判断：** 在“安全可控”和“交互效率”之间寻找平衡，工程治理味道很强。

---

### DeepSeek TUI
**定位特征：** 从 TUI 走向 IDE / computer-use / memory 平台  
**关键词：** live catalog、workflow、plugins、memory、IDE integration、computer-use  
**判断：** 产品野心较大，正在从界面工具向 agent 平台和桌面工作台演进。

---

## 5) 社区热度与成熟度

### 社区最活跃的工具
- **OpenAI Codex、OpenCode、Pi、Qwen Code、DeepSeek TUI**  
  这些项目今天都同时出现了 **10 个左右的 Issues/PR**，说明迭代密度高、用户反馈活跃、边界问题暴露充分。

### 高度关注稳定性与企业落地的工具
- **Claude Code、Copilot CLI、Codex**  
  这些项目的问题类型更偏向 **生产可用性、权限、Windows、MCP/OAuth、会话恢复**，说明已经进入真实生产使用阶段。

### 相对稳健、节奏较克制的工具
- **Gemini CLI**  
  Issue 数少、PR 数中等，表现出较强的“先加固再扩展”风格，社区噪音较低。

### 处于快速迭代/边界暴露期的工具
- **OpenCode、Pi、Qwen Code、DeepSeek TUI**  
  共同特点是：功能扩展快、架构调整多、社区反馈覆盖权限/性能/生态/可恢复性，说明正在快速从早期产品向成熟平台过渡。

### 今日无活动
- **Kimi Code CLI**  
  可能处于低曝光或低更新窗口，当前难以做活跃度判断。

---

## 6) 值得关注的趋势信号

### 趋势 1：AI CLI 正在平台化，不再只是“命令行壳”
现在的竞争焦点已不是“谁能调模型”，而是：
- 谁能管权限
- 谁能接 MCP/OAuth
- 谁能支持多 provider
- 谁能恢复会话
- 谁能在企业环境稳定运行

**对开发者的价值：**  
后续设计 CLI 时，不能只做交互层，必须把 **权限、状态、集成、可恢复性** 当成一等公民。

---

### 趋势 2：安全与可解释性成为默认诉求
社区对“拦截是否合理”“为什么被拦”“谁能看见”“是否可审计”非常敏感。  
这说明安全策略已经从“防滥用”升级为“**安全 + 可运维 + 可解释**”三者并重。

**对开发者的价值：**  
如果安全规则不可配置、不可观察，用户会迅速把它视为阻塞而不是保护。

---

### 趋势 3：长会话和重连场景成为主战场
大量问题都在暴露同一件事：AI CLI 已经被当作 **持续工作流引擎** 使用，而不是一次性问答工具。  
因此内存膨胀、状态重放、资源泄漏、恢复失败，都会直接变成产品风险。

**对开发者的价值：**  
需要优先建设：
- 会话快照
- 增量重放
- 进程生命周期管理
- 资源上限控制
- 恢复后一致性校验

---

### 趋势 4：Windows 与企业环境是高频试金石
Windows/Git Bash/WSL、ACL、桌面端、自更新、后台守护进程这些问题在多个项目里重复出现。  
说明 AI CLI 一旦进入企业环境，最先暴露的就是 **平台差异和系统级边界问题**。

**对开发者的价值：**  
跨平台测试矩阵必须覆盖：
- Windows + Git Bash / WSL
- macOS sandbox
- Linux NFS / 大目录
- 企业代理 / OAuth / 内网模型

---

### 趋势 5：模型生态竞争正在向“治理能力”转移
多个工具都在处理：
- 默认模型策略
- fallback 行为
- provider discovery
- 预算/计费可视化
- 企业组织级配置

**对开发者的价值：**  
未来差异化不只是模型能力，而是 **谁能把模型接入、切换、回退、计费、权限策略做得更透明**。

---

如果你愿意，我还可以把这份报告继续加工成以下任一种版本：
1. **一页纸管理层摘要版**
2. **按“稳定性 / 安全 / 生态 / 体验”四象限图版**
3. **附风险等级和优先级排序的决策版**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下为基于 `anthropics/skills` 官方仓库数据（截至 2026-09-03）的 Claude Code Skills 社区热点报告。

---

## 1) 热门 Skills 排行（PR 热度综合判断，均为 Open）

> 说明：你提供的 PR 数据里评论数字段未展示具体值，因此这里按“问题影响面 + 社区反馈强度 + 关联 Issue 热度”做综合排序。

1. **#1298 `skill-creator` 评测修复：run_eval 召回率恒为 0%**
   - 功能：修复 `run_eval.py` / `run_loop.py` / `improve_description.py` 的评测链路，让 Skill 描述优化不再基于噪声。
   - 社区热点：评测失真、Windows 读取、触发检测、并行 worker 稳定性。
   - 状态：Open  
   - 链接：https://github.com/anthropics/skills/pull/1298

2. **#1099 `skill-creator`：Windows 下 subprocess pipe 崩溃修复**
   - 功能：修复 Windows 运行 `run_eval.py` 时的 pipe/子进程读取异常。
   - 社区热点：Windows 兼容性、`precision=100% recall=0%` 假象、CLI 在 Windows 环境不可用。
   - 状态：Open  
   - 链接：https://github.com/anthropics/skills/pull/1099

3. **#1602 评测/benchmark/编码/脚本稳定性综合修复**
   - 功能：修复 `mcp-builder`、benchmark 统计、编码问题与脚本稳定性。
   - 社区热点：真实服务器评测失败、序列化错误、指标可信度。
   - 状态：Open  
   - 链接：https://github.com/anthropics/skills/pull/1602

4. **#1607 `claude-api`：标记 4 个已退役模型 ID**
   - 功能：更新模型清单，避免继续引用已退役模型。
   - 社区热点：模型生命周期管理、API 文档准确性、旧模型兼容性。
   - 状态：Open  
   - 链接：https://github.com/anthropics/skills/pull/1607

5. **#514 `document-typography`：文档排版质量控制 Skill**
   - 功能：解决孤行/寡行、标题悬挂、编号错位等生成文档排版问题。
   - 社区热点：AI 生成文档的“最后一公里”质量，尤其是企业文档可交付性。
   - 状态：Open  
   - 链接：https://github.com/anthropics/skills/pull/514

6. **#723 `testing-patterns`：完整测试实践 Skill**
   - 功能：覆盖单测、React 组件测试、测试哲学与最佳实践。
   - 社区热点：如何让 Claude 生成“可用测试”而不是模板化测试。
   - 状态：Open  
   - 链接：https://github.com/anthropics/skills/pull/723

7. **#1367 `self-audit`：输出前机械校验 + 四维推理审计**
   - 功能：在交付前对输出进行文件级校验与 reasoning gate。
   - 社区热点：AI 输出自检、质量门禁、减少幻觉与漏交付。
   - 状态：Open  
   - 链接：https://github.com/anthropics/skills/pull/1367

8. **#568 `servicenow`：企业平台全栈 Skill**
   - 功能：覆盖 ITSM、ITOM、ITAM/SAM、FSM、SPM、SecOps、IntegrationHub 等。
   - 社区热点：企业级平台自动化、流程/配置/集成一体化。
   - 状态：Open  
   - 链接：https://github.com/anthropics/skills/pull/568

---

## 2) 社区需求趋势

### A. 评测与触发机制修复
社区最在意的是 **Skills 是否真的被触发、是否真的有效**。
- `run_eval.py` 触发率 0% 问题
- 评测序列化、真实 MCP server 评估失败
- Windows 环境兼容性导致“看似成功，实则失效”

代表 Issue：
- #556：https://github.com/anthropics/skills/issues/556
- #1390：https://github.com/anthropics/skills/issues/1390

### B. 安全、命名空间与信任边界
社区开始担心 **Skills 分发与安装的信任模型**，尤其是社区技能冒充官方技能的问题。
- `anthropic/` 命名空间的信任边界风险
- 组织内共享与分发机制缺失

代表 Issue：
- #492：https://github.com/anthropics/skills/issues/492
- #228：https://github.com/anthropics/skills/issues/228

### C. 上下文效率与重复内容治理
大家越来越关注 **Skill 是否过重、是否浪费上下文**。
- `claude-api` 一次注入 156k tokens
- document-skills / example-skills 内容重复
- 需要更轻量、更模块化的 Skills

代表 Issue：
- #1487：https://github.com/anthropics/skills/issues/1487
- #189：https://github.com/anthropics/skills/issues/189

### D. 文档类输出质量
文档仍是最强需求之一，但重点已从“能生成”转向 **能否交付**。
- DOCX/OOXML whitespace 破坏文档
- SharePoint 文档权限与上下文安全
- 排版、模板填充、格式转换、可读性控制

代表 Issue：
- #12：https://github.com/anthropics/skills/issues/12
- #1175：https://github.com/anthropics/skills/issues/1175

### E. 代码审查、测试与质量门禁
社区希望 Skills 不只是“写代码”，而是 **带质量控制的工程代理**。
- 测试模式、自动审计、推理质量门
- 代码检查、交付前验证、错误检测

代表 Issue：
- #202：https://github.com/anthropics/skills/issues/202
- #412：https://github.com/anthropics/skills/issues/412
- #1385：https://github.com/anthropics/skills/issues/1385

### F. 平台适配与外部生态集成
用户希望 Skills 能进入真实工作流：
- Bedrock
- MCP
- 企业平台（ServiceNow、SharePoint）
- 共享与组织级安装

代表 Issue：
- #29：https://github.com/anthropics/skills/issues/29
- #16：https://github.com/anthropics/skills/issues/16
- #228：https://github.com/anthropics/skills/issues/228

---

## 3) 高潜力待合并 Skills

这些 PR 多为“明确 bugfix / 小范围修复”，最有机会近期落地：

1. **#1607 `claude-api` 退役模型标记修复**
   - 价值：低风险、高准确性收益，属于文档/配置类刚需修复。
   - 链接：https://github.com/anthropics/skills/pull/1607

2. **#539 `skill-creator`：YAML description 未加引号的预检**
   - 价值：避免 frontmatter 静默解析失败，直接提升 Skill 可用性。
   - 链接：https://github.com/anthropics/skills/pull/539

3. **#538 `pdf`：修正 SKILL.md 大小写引用**
   - 价值：跨平台文件系统兼容性修复，改动小、收益明确。
   - 链接：https://github.com/anthropics/skills/pull/538

4. **#541 `docx`：tracked change 与 bookmark 的 ID 冲突修复**
   - 价值：修复文档损坏类高优先级问题，用户体感强。
   - 链接：https://github.com/anthropics/skills/pull/541

5. **#1050 `skill-creator`：Windows subprocess + encoding 修复**
   - 价值：直接解决 Windows 可用性问题，易合并。
   - 链接：https://github.com/anthropics/skills/pull/1050

6. **#1298 `skill-creator`：run_eval 召回率失真修复**
   - 价值：如果评测链路不可信，Skill 迭代就失去基础；属于平台级修复。
   - 链接：https://github.com/anthropics/skills/pull/1298

7. **#1602 评测/benchmark 稳定性综合修复**
   - 价值：覆盖面广，但若拆分得当，会成为强烈正向合并候选。
   - 链接：https://github.com/anthropics/skills/pull/1602

---

## 4) Skills 生态洞察

**一句话总结：当前社区最集中的诉求是——让 Skills 从“能演示”走向“可验证、可共享、低上下文成本、能稳定落地到真实工作流”。**

如果你愿意，我可以进一步把这份报告整理成：
- **高管版 1 页摘要**
- **按主题分组的详细榜单**
- **Markdown 表格版（适合直接发到 Notion / 飞书）**

---

# Claude Code 社区动态日报  
**日期：2026-09-03**  
数据源：`github.com/anthropics/claude-code`

---

## 1. 今日速览
今天 Claude Code 社区的焦点集中在 **Windows/Desktop 稳定性、Bash/权限系统回归、以及 macOS/Linux 性能问题** 上；同时出现了少量 **安全误判与数据风险级别** 的反馈。  
版本 **v2.1.259** 刚发布，新增了组织级 MCP 托管配置和无提示头less 运行参数，但社区反馈也同步暴露出一些与权限、Shell 交互和会话稳定性相关的边界问题。

---

## 2. 版本发布
### v2.1.259
**主要更新：**
- 新增 `managedMcpServers` 管理型设置：组织可以向所有用户下发 HTTP/SSE MCP 服务器配置，结构与 `.mcp.json` 类似；其中需要运行命令的条目会被跳过。
- 新增 `--permission-prompts none`，用于无人值守的 headless 主机场景，避免任何需要交互确认的提示中断流程。

**解读：**
- 这是一次偏向 **企业管理与自动化部署** 的版本，明显服务于组织级 MCP 管控和批量运行场景。
- 但从 Issue 看，权限提示、Shell 交互和后台任务稳定性仍是当前版本的敏感区域。

链接：  
- [Release v2.1.259](https://github.com/anthropics/claude-code/releases/tag/v2.1.259)

---

## 3. 社区热点 Issues
以下是今天最值得关注的 10 个 Issue：

### 1) Windows Desktop 自更新时崩溃且无法重新启动
- **Issue**: [#91663](https://github.com/anthropics/claude-code/issues/91663)
- **为什么重要**：属于高优先级桌面端稳定性问题，且发生在“自更新”这一关键路径，可能直接影响用户升级能力。
- **社区反应**：1 条评论，当前讨论不多，但问题严重性高。

### 2) Bash `cd` + 权限规则在 Windows Git Bash 上误触发提示
- **Issue**: [#91650](https://github.com/anthropics/claude-code/issues/91650)
- **为什么重要**：这是 **权限系统回归**，且影响日常最常见的目录切换操作。
- **社区反应**：已有复现，**8 个赞**，说明痛感较强、影响面较广。

### 3) Windows 上两个 Bash tool 调用永不返回，导致会话死锁
- **Issue**: [#91648](https://github.com/anthropics/claude-code/issues/91648)
- **为什么重要**：属于严重的执行链阻塞，直接拖垮主会话与 agent 完成。
- **社区反应**：1 条评论；从描述看是可复现的高危性能/调度问题。

### 4) 启动时 FileIndex 在大型非 Git 目录中阻塞事件循环约 41 秒
- **Issue**: [#91633](https://github.com/anthropics/claude-code/issues/91633)
- **为什么重要**：启动性能问题明显，且发生在大目录/家目录这类真实工作场景。
- **社区反应**：1 条评论；问题复现条件清晰，适合优先排查。

### 5) 大型 NFS 目录下 FileChanged watchPaths 递归注册导致主线程阻塞
- **Issue**: [#91634](https://github.com/anthropics/claude-code/issues/91634)
- **为什么重要**：涉及网络文件系统和启动时监控逻辑，属于环境敏感型性能故障。
- **社区反应**：1 条评论；对企业/NFS 用户影响较大。

### 6) 桌面端 Windows（Store 包）在后台 subagents 运行时静默退出
- **Issue**: [#91662](https://github.com/anthropics/claude-code/issues/91662)
- **为什么重要**：无 crash dump、无事件日志，排障难度高，且影响后台代理运行可靠性。
- **社区反应**：暂无评论，但属于高风险“静默失败”。

### 7) 登录状态反复失效，持续要求 `/login`
- **Issue**: [#91669](https://github.com/anthropics/claude-code/issues/91669)
- **为什么重要**：认证链路异常会严重影响长期会话与团队组织使用体验。
- **社区反应**：暂无评论，但问题定位明确，且与 Team organization 变更相关。

### 8) 跨机器 Remote Control 会话消息“已送达”但实际丢失
- **Issue**: [#91671](https://github.com/anthropics/claude-code/issues/91671)
- **为什么重要**：这是 agent-to-agent / session-to-session 协作能力的核心能力缺陷。
- **社区反应**：暂无评论，但若属实会影响远程协作场景。

### 9) `claude agents` 返回列表后，选择会被刷新回刚退出的会话
- **Issue**: [#91672](https://github.com/anthropics/claude-code/issues/91672)
- **为什么重要**：这是 **回归问题**，影响 agent-view 的导航流畅性与可用性。
- **社区反应**：暂无评论；明确标注为 2.1.257 回归，值得尽快修复。

### 10) macOS 沙箱 `mktemp -d` 忽略 `$TMPDIR`，可能导致误删工作目录
- **Issue**: [#91676](https://github.com/anthropics/claude-code/issues/91676)
- **为什么重要**：这是明显的 **数据风险 / 安全问题**，严重级别高于普通 bug。
- **社区反应**：暂无评论，但“误删工作目录”属于必须优先处理的红线问题。

---

## 4. 重要 PR 进展
**过去 24 小时内无 PR 更新。**  
因此今天没有可列入的 PR 进展条目。

- PR 列表：\[无更新\]

---

## 5. 功能需求趋势
从今天的 Issues 可以看出，社区需求主要集中在以下方向：

### 1) 企业级 MCP 与自动化部署
- `managedMcpServers` 的发布说明表明组织级管理是当前方向。
- 相关需求继续围绕 **集中配置、权限治理、无交互部署** 展开。
- 参考 Issue： [#91660](https://github.com/anthropics/claude-code/issues/91660)

### 2) Desktop / IDE 集成体验
- 社区对 **Desktop、VS Code sidebar、session group、agent view** 等 UI 交互需求持续增加。
- 典型诉求包括：会话分组自动化、侧边栏信息精简、导航稳定性提升。
- 参考 Issue： [#91674](https://github.com/anthropics/claude-code/issues/91674), [#91660](https://github.com/anthropics/claude-code/issues/91660)

### 3) Bash / 权限系统的准确性与稳定性
- 多个 issue 指向 Bash 工具、`Read()` deny 规则、`cd` 行为和权限提示误触发。
- 说明社区非常关注 **命令执行可靠性**，尤其是 Windows / Git Bash 组合环境。
- 参考 Issue： [#91650](https://github.com/anthropics/claude-code/issues/91650), [#91681](https://github.com/anthropics/claude-code/issues/91681)

### 4) 启动性能与大目录场景优化
- FileIndex、文件监控、NFS、大工作目录等问题集中出现。
- 这说明在真实项目/家目录环境中，**冷启动与扫描性能** 仍是痛点。
- 参考 Issue： [#91633](https://github.com/anthropics/claude-code/issues/91633), [#91634](https://github.com/anthropics/claude-code/issues/91634)

### 5) Agent 协作与远程控制
- `claude agents`、Remote Control、session messaging 等能力正在成为重要使用场景。
- 社区希望代理间通信更可靠，导航更稳定，状态同步更准确。
- 参考 Issue： [#91671](https://github.com/anthropics/claude-code/issues/91671), [#91672](https://github.com/anthropics/claude-code/issues/91672)

### 6) 安全与误报控制
- 多个安全/合规相关反馈表明：模型防护策略对 **合法的嵌入式、网络安全、内部开发任务** 仍存在误判。
- 相关方向包括更细粒度策略、行业任务白名单或更好的解释性。
- 参考 Issue： [#91659](https://github.com/anthropics/claude-code/issues/91659), [#91661](https://github.com/anthropics/claude-code/issues/91661), [#91667](https://github.com/anthropics/claude-code/issues/91667)

---

## 6. 开发者关注点
今天开发者反馈中暴露出的高频痛点主要有：

### 1) “可用性”优先于“功能新增”
- 新版本刚发布，但社区最关心的是 **崩溃、死锁、静默退出、登录失效** 等基础稳定性问题。
- 说明当前阶段，稳定性修复的优先级应高于新增功能。

### 2) 权限提示的边界行为需要更精准
- `Read()` deny 规则、`cd` 目录切换、`rg` 目录搜索都触发了不一致提示。
- 开发者希望权限系统既安全又不过度打扰。

### 3) Windows 生态问题密集
- 从 Desktop 崩溃、Bash 调用卡死，到登录/权限异常，Windows 相关问题占比很高。
- 建议重点关注 **Windows + Git Bash + Desktop** 组合测试矩阵。

### 4) 大目录与网络文件系统需要专门优化
- 家目录、NFS、非 Git 大目录会显著放大启动扫描和 watch 注册成本。
- 对企业用户而言，这是可感知的性能瓶颈。

### 5) agent / remote control 进入实用阶段，但可靠性不足
- 代理协作、远程消息、会话列表导航等能力正在被真实使用。
- 但目前仍存在“消息丢失”“列表回弹”“会话状态不同步”等问题。

### 6) 安全策略误报影响开发效率
- 安全防护命中了合法的嵌入式、内部研发、网络安全任务。
- 开发者期待更细致的分类和更少的误伤。

---

如需，我可以把这份日报进一步整理成：
1. **适合 Slack/飞书发布的短版**  
2. **适合内部周报系统的表格版**  
3. **按 Windows / macOS / Linux 分平台的分析版**

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-09-03）

## 1) 今日速览
过去 24 小时，Codex 侧一边持续发版，另一边集中合并了大量面向 **TUI/Composer、Windows App/Daemon、MCP/OAuth、会话恢复** 的修复与增强，说明当前迭代重点仍在提升“可用性”和“跨平台稳定性”。  
社区 Issues 则明显聚焦在 **Windows 桌面端、CLI 稳定性、沙箱/权限、长会话性能、文件访问与上下文一致性**，其中多条问题具有“阻塞使用”或“数据/工作流风险”级别。  
相关发布与变更：  
- Release： [rust-v0.153.0](https://github.com/openai/codex/releases/tag/rust-v0.153.0)  
- Alpha： [rust-v0.153.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.6) / [rust-v0.153.0-alpha.5.1](https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.5.1)

## 2) 版本发布
- **rust-v0.153.0**：新增 Vim 模式撤销/重做能力，且能完整保留草稿、粘贴内容和附件；同时插件 CLI 继续补强了列表/安装等管理能力。  
  链接： [release](https://github.com/openai/codex/releases/tag/rust-v0.153.0)
- **rust-v0.153.0-alpha.6 / alpha.5.1**：同步发布 alpha 迭代，说明主线功能已进入持续打磨阶段。  
  链接： [alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.6) · [alpha.5.1](https://github.com/openai/codex/releases/tag/rust-v0.153.0-alpha.5.1)

## 3) 社区热点 Issues
1. **#42355 Windows CLI 误删忽略目录父目录，存在数据损坏风险**  
   `git clean` 处理嵌套 ignored path 时，直接删掉整个父目录，属于高风险文件系统行为问题。3 条评论，属于明显的“安全/破坏性”缺陷。  
   链接： [Issue #42355](https://github.com/openai/codex/issues/42355)

2. **#42360 Windows 桌面端 ChatGPT 与 Codex 切换失败**  
   影响桌面端双产品切换流程，直接干扰日常工作流。已有 3 条评论，说明问题在实际使用中可复现且有跟进讨论。  
   链接： [Issue #42360](https://github.com/openai/codex/issues/42360)

3. **#42411 无法打开文件，阻断核心能力**  
   文件读取是 Codex 的基础能力之一，当前出现“无法打开读文件”的回归，虽然只有 2 条评论，但影响面非常大。  
   链接： [Issue #42411](https://github.com/openai/codex/issues/42411)

4. **#42387 桌面端中途崩溃后，聊天历史停止渲染**  
   直接影响会话恢复与可追溯性，属于“中断后数据展示异常”问题。2 条评论，说明社区已在排查复现路径。  
   链接： [Issue #42387](https://github.com/openai/codex/issues/42387)

5. **#42345 Rollout 文件重复写入，12 天会话膨胀到 1.4GB**  
   典型的长会话性能/存储问题，且已有 1 个点赞，说明用户痛感较强；2 条评论显示其关注点不只是体积，更是会话持久化设计。  
   链接： [Issue #42345](https://github.com/openai/codex/issues/42345)

6. **#42357 使用额度消耗异常快，且多为缓存输入**  
   这是典型的“计量透明度/计费可信度”问题，用户已经在关注缓存命中情况下的扣费是否合理。  
   链接： [Issue #42357](https://github.com/openai/codex/issues/42357)

7. **#42430 “Reconnecting... waiting for network” 误判本地 IO/流超时**  
   错误分类不准确会让重度长会话用户在“错误方向”上排查很久，属于高影响的可观测性问题。  
   链接： [Issue #42430](https://github.com/openai/codex/issues/42430)

8. **#42426 Windows 沙箱在 deny-read ACL 应用阶段失败**  
   沙箱启动前就失败，意味着 Windows 上的隔离执行链路仍有稳定性短板。  
   链接： [Issue #42426](https://github.com/openai/codex/issues/42426)

9. **#42424 Windows 26.831 启动卡顿 6 分钟，runtime relocation 性能退化明显**  
   启动时间过长会严重影响桌面端第一印象和可用性，属于性能回归类高优先级问题。  
   链接： [Issue #42424](https://github.com/openai/codex/issues/42424)

10. **#42427 MCP 登录忽略 `WWW-Authenticate` 的 `resource_metadata`**  
    这是协议兼容/认证发现流程问题，影响 MCP 与外部服务的 OAuth/DCR 集成。  
    链接： [Issue #42427](https://github.com/openai/codex/issues/42427)

## 4) 重要 PR 进展
1. **#42428 共享 Composer 接入 Agent Command Center**  
   将单行输入替换为共享聊天 Composer，补齐多行、粘贴、Vim、快捷键与草稿保留能力，属于交互层重大升级。  
   链接： [PR #42428](https://github.com/openai/codex/pull/42428)

2. **#42419 为 Agent Command Center 增加会话恢复**  
   新增可配置的会话恢复入口，且能保留命令中心状态，提升断点续用体验。  
   链接： [PR #42419](https://github.com/openai/codex/pull/42419)

3. **#42408 加固嵌入式 Composer 输入处理**  
   解决 `!`、`/`、`?` 前缀误触发命令的问题，并修复 Vim 模式、撤销输入、粘贴突发场景下的输入保真。  
   链接： [PR #42408](https://github.com/openai/codex/pull/42408)

4. **#42405 在 Windows 上支持 app-server daemon**  
   让后台 daemon、自动附加 TUI 等能力扩展到 Windows，是平台一致性的重要补齐。  
   链接： [PR #42405](https://github.com/openai/codex/pull/42405)

5. **#42417 暴露 managed application 的网络需求**  
   支持精确域名 allow/deny 规则，并规范 managed TOML 的优先级，利于企业网络策略落地。  
   链接： [PR #42417](https://github.com/openai/codex/pull/42417)

6. **#42413 协调式 MCP OAuth refresh**  
   改进 MCP 连接中的 token 刷新与持久化，降低长连接下的认证失效风险。  
   链接： [PR #42413](https://github.com/openai/codex/pull/42413)

7. **#42410 允许查看并继续被 misalignment 暂停的聊天**  
   让用户能先审阅 findings，再显式决定是否继续，增强了“可解释 + 可控”的暂停流程。  
   链接： [PR #42410](https://github.com/openai/codex/pull/42410)

8. **#42425 从服务器发现 TUI experimental features**  
   将实验特性目录下沉到服务端，改善功能开关、状态展示与可发现性。  
   链接： [PR #42425](https://github.com/openai/codex/pull/42425)

9. **#42422 Guardian computer-use scoring 遵循模型要求**  
   让评分逻辑随当前模型的自动审查要求变化，更符合模型策略一致性。  
   链接： [PR #42422](https://github.com/openai/codex/pull/42422)

10. **#42392 支持 Windows 上的 managed daemon 更新**  
    补齐 Windows 更新链路、重启握手与安装器处理，减少后台服务升级时的中断。  
    链接： [PR #42392](https://github.com/openai/codex/pull/42392)

## 5) 功能需求趋势
1. **Windows 桌面端与 CLI 的稳定性补强仍是第一优先级**  
   从启动卡顿、沙箱失败、文件打不开、切换失败到 daemon 更新，说明 Windows 体验仍是社区最密集的反馈面。  
   代表链接： [#42424](https://github.com/openai/codex/issues/42424) · [#42426](https://github.com/openai/codex/issues/42426) · [#42360](https://github.com/openai/codex/issues/42360)

2. **会话恢复、Composer 与输入体验持续被强化**  
   用户需要更可靠的草稿保留、撤销重做、恢复会话、继续暂停任务等能力，强调“不中断的编辑流”。  
   代表链接： [#42387](https://github.com/openai/codex/issues/42387) · [PR #42428](https://github.com/openai/codex/pull/42428) · [PR #42419](https://github.com/openai/codex/pull/42419)

3. **长会话性能与存储膨胀问题正在变成显性痛点**  
   rollout 文件重复写入、启动慢、远程输入卡顿，说明重度用户开始遇到“规模化使用”瓶颈。  
   代表链接： [#42345](https://github.com/openai/codex/issues/42345) · [#42421](https://github.com/openai/codex/issues/42421) · [#42424](https://github.com/openai/codex/issues/42424)

4. **MCP / OAuth / 插件集成需求继续上升**  
   社区在意登录发现、token refresh、插件启动等待和协议兼容，说明外部工具接入已是重要场景。  
   代表链接： [#42427](https://github.com/openai/codex/issues/42427) · [PR #42413](https://github.com/openai/codex/pull/42413) · [PR #42406](https://github.com/openai/codex/pull/42406)

5. **额度、计量与模型设置的可解释性需求增强**  
   缓存输入却快速消耗额度、thinking effort 被重置、长任务状态与验证不一致，反映用户希望更清楚地理解系统决策。  
   代表链接： [#42357](https://github.com/openai/codex/issues/42357) · [#42414](https://github.com/openai/codex/issues/42414) · [#42420](https://github.com/openai/codex/issues/42420)

## 6) 开发者关注点
- **错误分类要更准确**：网络错误、本地 IO、超时和沙箱失败目前容易混淆，影响排障效率。  
  代表链接： [#42430](https://github.com/openai/codex/issues/42430) · [#42426](https://github.com/openai/codex/issues/42426)

- **文件/会话状态必须更可靠**：文件打不开、历史不渲染、崩溃后恢复不完整，都会直接破坏主工作流。  
  代表链接： [#42411](https://github.com/openai/codex/issues/42411) · [#42387](https://github.com/openai/codex/issues/42387) · [#42393](https://github.com/openai/codex/issues/42393)

- **Windows 平台仍需持续补齐 parity**：桌面端、daemon、sandbox、启动更新和 UI 细节问题密集出现。  
  代表链接： [#42360](https://github.com/openai/codex/issues/42360) · [PR #42405](https://github.com/openai/codex/pull/42405) · [PR #42392](https://github.com/openai/codex/pull/42392)

- **长会话要兼顾性能和成本透明度**：重复落盘、输出膨胀、额度消耗异常，会显著拉低重度用户信任。  
  代表链接： [#42345](https://github.com/openai/codex/issues/42345) · [#42357](https://github.com/openai/codex/issues/42357)

- **外部协议与企业集成的兼容性在上升**：MCP、OAuth、custom model/provider、managed network 规则等，已成为实际生产落地的关键面。  
  代表链接： [#42427](https://github.com/openai/codex/issues/42427) · [PR #42417](https://github.com/openai/codex/pull/42417) · [PR #42413](https://github.com/openai/codex/pull/42413)

如果你愿意，我可以把这份日报进一步整理成：
- **适合公众号/周报的精简版**
- **适合内部情报简报的表格版**
- **按“产品 / 平台 / 协议 / 性能”分类的分析版**

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-09-03）

> 说明：本时间窗口内仅有 **2 个 Issue** 和 **7 个 PR** 更新，以下为全部可见重点项。

## 1) 今日速览
今天没有新版本发布，社区动态主要集中在 **发布稳定性**、**后台进程可观测性** 以及 **安全边界/沙箱隔离** 相关改进。  
最受关注的是一条 **P1 等级的 nightly release 失败** 问题，说明当前 CI/CD 发布链路仍是核心风险点；同时，围绕路径边界、符号链接、扩展回滚的 PR 也表明项目正在持续强化运行时安全。

---

## 2) 版本发布
- **无新 Release**（过去 24 小时内无发布）

---

## 3) 社区热点 Issues

### 1. Nightly Release Failed for on 2026-09-03
- **链接**：https://github.com/google-gemini/gemini-cli/issues/29174
- **为什么重要**：这是一个 **priority/p1** 的发布失败问题，直接影响 nightly 发布链路，若持续发生会影响版本验证、回归发现和外部用户对项目稳定性的信任。
- **社区反应**：由 `github-actions[bot]` 自动创建，当前 **1 条评论**，说明问题已被系统捕获但仍需人工排查；属于典型的高优先级运维/流水线问题。

### 2. Bug: list_background_processes prints (Exit Code: null) for signal-killed processes
- **链接**：https://github.com/google-gemini/gemini-cli/issues/29167
- **为什么重要**：影响 **非交互/后台任务** 的状态展示，错误地把被信号终止的进程显示为 `(Exit Code: null)`，会干扰用户和开发者对任务失败原因的判断。
- **社区反应**：当前 **0 条评论**，但问题描述较完整，且已定位到 `BackgroundProcess.exitCode` 的类型边界，属于较明确的工程 bug，后续大概率会被快速修复。

---

## 4) 重要 PR 进展

### 1. chore(deps): bump fast-uri from 3.1.2 to 3.1.7
- **链接**：https://github.com/google-gemini/gemini-cli/pull/29173
- **内容**：依赖升级，重点是 `fast-uri` 的安全修复与版本更新。
- **价值**：虽然是依赖维护类 PR，但通常与安全公告和供应链风险控制直接相关，优先级不低。

### 2. feat(core): add support for gemini-3.8-flash as default flash model
- **链接**：https://github.com/google-gemini/gemini-cli/pull/29172
- **内容**：新增并调整 Gemini 模型支持，将 `gemini-3.8-flash` 提升为默认 flash 模型。
- **价值**：这是本日报里最明确的 **模型能力演进**，反映 CLI 正在跟进新一代模型能力与默认体验优化。

### 3. fix(cli): isolate temporary directory for macOS Seatbelt sandbox
- **链接**：https://github.com/google-gemini/gemini-cli/pull/29171
- **内容**：为 macOS 沙箱环境隔离临时目录，避免共享宿主机 `os.tmpdir()` 带来的写入污染和安全风险。
- **价值**：直接提升沙箱隔离强度，属于安全性与多进程隔离层面的关键修复。

### 4. fix(core): enhance workspace path boundary checks and symlink resolution in command safety and file discovery
- **链接**：https://github.com/google-gemini/gemini-cli/pull/29170
- **内容**：增强工作区边界检查、符号链接解析和目录发现逻辑，覆盖 POSIX 与 Windows 场景。
- **价值**：这是典型的 **路径安全加固**，对于防止越权访问、路径逃逸非常关键。

### 5. feat(extensions): harden path resolution and boundary validation in extension loader
- **链接**：https://github.com/google-gemini/gemini-cli/pull/29169
- **内容**：强化扩展加载器对上下文文件和配置路径的解析与边界校验。
- **价值**：扩展机制是 CLI 可扩展性的核心入口，这类加固可减少恶意/误配置路径越界问题。

### 6. chore(deps): bump qs from 6.14.2 to 6.16.0
- **链接**：https://github.com/google-gemini/gemini-cli/pull/29168
- **内容**：依赖升级，更新 `qs` 到更高版本。
- **价值**：属于常规依赖维护，但在大型 CLI 工程中，这类更新通常与安全修复、兼容性维护同步推进。

### 7. fix(extensions): back up the extension dir before update so rollback restores it
- **链接**：https://github.com/google-gemini/gemini-cli/pull/29166
- **内容**：修复扩展更新时未正确备份目录，导致回滚无法恢复的问题。
- **价值**：这是一个很实用的 **可恢复性修复**，直接影响扩展升级失败时的用户体验和数据安全。

---

## 5) 功能需求趋势
从本日更新的 Issue/PR 来看，社区关注点主要集中在以下方向：

1. **稳定性与发布可靠性**
   - nightly release 失败暴露出发布流水线仍需加强自动化监控与失败恢复能力。
2. **非交互场景可观测性**
   - 后台进程状态展示不准确，说明用户对“任务是否真的失败/被杀死”的反馈仍不够清晰。
3. **模型支持升级**
   - 新增 `gemini-3.8-flash` 默认模型，表明社区持续跟进最新模型能力和默认体验优化。
4. **安全边界与沙箱隔离**
   - 多个 PR 同时在做路径边界、符号链接、临时目录隔离、扩展路径校验，说明这是当前较强的技术主线。
5. **扩展机制可靠性**
   - 扩展更新回滚、加载路径安全等问题，体现社区对扩展生态“可升级、可回退、可控”的需求。

---

## 6) 开发者关注点
结合今天的反馈，开发者侧最需要优先关注的痛点是：

- **CI/CD 发布链路的稳定性**：nightly release 失败是高优先级问题，应尽快定位失败环节并补充告警/回滚策略。  
- **错误状态展示的准确性**：后台进程被信号杀死时输出 `(Exit Code: null)`，会降低调试效率，建议统一失败原因的语义表达。  
- **路径与沙箱安全**：当前多条 PR 都指向路径边界、符号链接、临时目录隔离，说明这是高频安全风险点，应持续做输入约束与边界验证。  
- **扩展更新的可恢复性**：升级失败后的回滚机制需要真正可用，避免“回滚了但没恢复”的假恢复。  
- **新模型接入节奏**：社区对默认模型升级的关注较高，模型注册、默认值切换和兼容性验证需要同步完善。

--- 

如果你愿意，我还可以把这份日报进一步整理成：
- **适合公众号/周报的精简版**
- **面向研发管理层的摘要版**
- **带“风险等级 + 优先级”的运维视角版**

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# 2026-09-03 GitHub Copilot CLI 社区动态日报

## 1) 今日速览
Copilot CLI 过去 24 小时的讨论，核心集中在 **MCP/OAuth 可靠性、长会话稳定性、Windows/WSL 兼容性** 和 **模型/企业默认配置** 四条主线。  
版本侧已经出现 **v1.0.83-2 / v1.0.83-3** 连续更新，说明团队正在快速修复近期反馈的问题，并继续增强多模型与沙箱网络控制能力。  
整体看，社区关注点已从“能不能用”转向“在复杂企业与多平台环境下是否足够稳定、可控”。

---

## 2) 版本发布

### v1.0.83-3
- [Release v1.0.83-3](https://github.com/github/copilot-cli/releases/tag/v1.0.83-3)  
- 仅看到“Fixes and changes”，说明这是一次小版本修订，重点是继续修补已知问题。

### v1.0.83-2
- [Release v1.0.83-2](https://github.com/github/copilot-cli/releases/tag/v1.0.83-2)  
- 主要更新：
  - 自定义 agents 支持在 `model` 中配置多个模型，按顺序尝试，直到找到可用模型。
  - `model-policy: required` 会保持该模型列表，不轻易变更。
  - 新增对 `claude-fable-5.1` 的支持。
  - Linux sandbox 增强网络出口限制，仅允许访问配置的 proxy，安全性更强。

---

## 3) 社区热点 Issues

### 1. MCP OAuth token 不能稳定复用，导致反复重新认证
- [#4695 MCP OAuth tokens for HTTP servers not reliably reused across sessions](https://github.com/github/copilot-cli/issues/4695)
- 重要性：这是典型的 **会话级身份认证可靠性问题**，直接影响 MCP HTTP server 的使用体验。
- 社区反应：已有 **4 条评论**，说明问题复现清晰、影响面较大；当前被标记为 `triage`，值得优先跟进。

### 2. 企业默认模型在 CLI 中未正确生效
- [#4692 default Enterprise model](https://github.com/github/copilot-cli/issues/4692)
- 重要性：涉及 **企业托管默认模型** 与 CLI 的一致性，关系到组织级策略落地。
- 社区反应：已有 **3 条评论**，用户明确反馈 VS Code / GitHub Desktop 可识别，但 CLI 不一致，属于高优先级配置偏差。

### 3. 长时间空闲后 `allow-all`/`--yolo` 状态丢失
- [#4696 allow-all mode resets after long inactive period](https://github.com/github/copilot-cli/issues/4696)
- 重要性：这是 **权限状态持久性** 问题，影响自动化与连续开发流程。
- 社区反应：有 **1 条评论**，说明场景明确但尚未广泛扩散；如果属实，会显著影响长会话用户。

### 4. WSL2 下出现异常高内存与 CPU 占用
- [#4694 WSL2: Copilot CLI 1.0.82 consumes ~31 GB RSS and ~57% CPU](https://github.com/github/copilot-cli/issues/4694)
- 重要性：属于 **严重性能/资源消耗问题**，对长会话和大上下文任务影响极大。
- 社区反应：当前无评论，但问题描述直接给出具体资源量级，属于必须监控的性能回归。

### 5. 长 `--resume` 会话触发 OOM，且 crash dump 写入当前目录
- [#4699 OOM crash (`JavaScript heap out of memory`) on long `--resume` sessions](https://github.com/github/copilot-cli/issues/4699)
- 重要性：涉及 **会话稳定性 + 运行时内存上限 + 日志污染工作目录**，同时影响可靠性和开发体验。
- 社区反应：已有 **1 个 👍**，说明用户认同问题严重性；这类 OOM 在长期使用中风险很高。

### 6. `/clear` 没有正确终止旧的 stdio MCP 子进程
- [#4697 `/clear` does not terminate previous stdio MCP server child processes](https://github.com/github/copilot-cli/issues/4697)
- 重要性：这是 **进程生命周期管理** 问题，容易造成资源泄漏与行为异常。
- 社区反应：目前无评论，但问题具备可复现性，且与 `/mcp reload` 行为不一致，值得修复。

### 7. 自定义 agents 需要按 agent 级别选择 provider
- [#4703 Per-agent provider selection for custom agents](https://github.com/github/copilot-cli/issues/4703)
- 重要性：体现出社区对 **多 provider / 多 endpoint 并行使用** 的需求在增长。
- 社区反应：目前无评论，但问题描述清楚指出现有 `COPILOT_PROVIDER_BASE_URL` 与 `COPILOT_MODEL` 过于进程全局，限制了复杂场景。

### 8. Windows 下自定义指令文件被重复加载
- [#4702 Windows: instruction file loaded twice due to `\` vs `/` path-separator mismatch](https://github.com/github/copilot-cli/issues/4702)
- 重要性：属于 **跨平台路径规范化** Bug，会导致规则重复注入，影响提示稳定性。
- 社区反应：暂无评论，但问题直指 Windows 路径处理缺陷，属于高确定性兼容问题。

### 9. 权限确认弹窗中的 Windows 路径被截断
- [#4701 Permission-gate/tool-approval preview truncates full Windows paths](https://github.com/github/copilot-cli/issues/4701)
- 重要性：影响 **工具审批可读性**，容易让用户在授权时误判将执行的操作。
- 社区反应：暂无评论；这类 UI/UX 问题虽不致命，但会降低安全确认环节的可信度。

### 10. `skillDirectories` 在 ACP 模式下不生效
- [#4700 `skillDirectories` setting ... is not honored in ACP mode (`copilot --acp`)](https://github.com/github/copilot-cli/issues/4700)
- 重要性：反映 **交互 CLI 与 ACP 模式能力不一致**，对技能发现和复用有直接影响。
- 社区反应：暂无评论；属于典型的模式间功能缺口，可能影响采用 ACP 的用户。

---

## 4) 重要 PR 进展
- 过去 24 小时 **没有 PR 更新**，因此暂无可列出的 PR 进展。  
- PR 相关链接： [github.com/github/copilot-cli/pulls](https://github.com/github/copilot-cli/pulls)

---

## 5) 功能需求趋势

从近期 Issues 看，社区需求正在向以下方向集中：

1. **MCP 与认证稳定性**
   - OAuth token 复用、stdio 进程生命周期、`/clear` 与 `/mcp reload` 行为一致性。
   - 说明 MCP 已进入实际工作流，稳定性成为刚需。
   - 相关链接：
     - [#4695](https://github.com/github/copilot-cli/issues/4695)
     - [#4697](https://github.com/github/copilot-cli/issues/4697)

2. **长会话性能与内存控制**
   - OOM、WSL2 高 CPU/RSS、长时间 resume 场景稳定性。
   - 说明用户在把 CLI 用作持续型 agent，而不是短任务工具。
   - 相关链接：
     - [#4699](https://github.com/github/copilot-cli/issues/4699)
     - [#4694](https://github.com/github/copilot-cli/issues/4694)

3. **多模型 / 企业模型治理**
   - 企业默认模型识别、custom agents 多模型回退、`model-policy` 行为。
   - 说明组织级模型策略正在成为重要生产需求。
   - 相关链接：
     - [#4692](https://github.com/github/copilot-cli/issues/4692)
     - [Release v1.0.83-2](https://github.com/github/copilot-cli/releases/tag/v1.0.83-2)

4. **跨平台兼容性，尤其是 Windows / WSL**
   - 路径分隔符、路径展示、指令文件去重、WSL 资源占用。
   - 说明 CLI 在多平台落地时仍有明显工程细节挑战。
   - 相关链接：
     - [#4702](https://github.com/github/copilot-cli/issues/4702)
     - [#4701](https://github.com/github/copilot-cli/issues/4701)
     - [#4694](https://github.com/github/copilot-cli/issues/4694)

5. **ACP / session / skill 生态一致性**
   - `skillDirectories`、按 repo 过滤 session、`/resume` 体验。
   - 说明社区希望不同模式下能力保持一致，并支持更精细的上下文管理。
   - 相关链接：
     - [#4700](https://github.com/github/copilot-cli/issues/4700)
     - [#4693](https://github.com/github/copilot-cli/issues/4693)

---

## 6) 开发者关注点

### 主要痛点
- **会话状态不稳定**：权限、认证、MCP 连接在长时间使用后容易失效。
- **资源使用过高**：内存和 CPU 在长会话、WSL2、resume 场景下暴露出明显压力。
- **跨平台细节不足**：Windows 路径规范化、路径预览、指令去重等细节问题较集中。
- **模式一致性不足**：ACP、交互 CLI、企业模型配置之间存在行为差异。
- **可观测性与可恢复性**：OOM crash dump 落在 cwd、会话文件归因缺失等问题影响排查。

### 高频需求
- 更可靠的 **token 缓存复用** 与 **权限状态持久化**  
- 更强的 **多模型/多 provider** 支持  
- 更好的 **内存控制与长会话稳定性**  
- 更完整的 **Windows/WSL 兼容性**  
- 更一致的 **ACP 与交互模式能力对齐**

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发 Slack/飞书的超短版**，或  
2. **适合内部周报的管理层摘要版**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-09-03）

## 1) 今日速览
今天 OpenCode 的动态主要集中在两条线：**稳定性修复** 与 **生态/兼容性补强**。  
新增的 `v1.18.27` 版本重点放宽了慢模型启动与流式输出的超时限制，并为 Anthropic 相关行为增加了配置级绕过能力，明显是在提升弱网/慢启动场景的可用性。  
社区侧则持续围绕 **模型发现、计费准确性、会话隔离、权限/插件机制** 提出问题与需求，说明产品已进入高频使用后的“边界条件修复期”。

---

## 2) 版本发布

### v1.18.27
- 核心更新集中在 **超时策略** 与 **Anthropic 兼容性**：
  - 默认 provider header 超时提升到 5 分钟，降低慢模型启动失败概率。
  - 默认 streamed chunk 超时提升到 5 分钟，并支持用 `false` 关闭。
  - Anthropic 的 `thinking.blockBinding` 支持通过配置显式 opt-out，方便兼容特殊 provider 行为。  
- 这版更像是一次“容错增强”发布，目标是减少因启动慢、流式卡顿或 provider 约束导致的用户失败感。  
链接：<https://github.com/anomalyco/opencode/releases/tag/v1.18.27>

---

## 3) 社区热点 Issues

### 1. 格式化器按名称配置后被静默禁用
- Issue：`clang-format / air / uv` 按名称配置后会让 formatter 直接失效，属于高风险静默错误。  
- 重要性：影响代码格式化主流程，且“看起来配置成功、实际未生效”最容易误导用户。  
- 社区反应：3 条评论，说明问题可复现且关注度较高。  
链接：<https://github.com/anomalyco/opencode/issues/46868>

### 2. 自定义 OpenAI-compatible provider 无法通过 GET /models 自动发现模型
- Issue：自定义 provider 使用 `@ai-sdk/openai-compatible` 时无法自动拉取模型列表。  
- 重要性：直接影响第三方/自建模型接入体验，是生态扩展的基础能力。  
- 社区反应：2 条评论，说明这是新接入场景中的明确痛点。  
链接：<https://github.com/anomalyco/opencode/issues/46941>

### 3. OpenCode Go 用量面板对 glm-5.3-flash 出现“双倍计费”错觉
- Issue：客户端与 Go dashboard 的用量/额度显示不一致。  
- 重要性：计费可视化错误会直接损害用户信任，是高优先级问题。  
- 社区反应：2 条评论，典型的“费用争议”类敏感问题。  
链接：<https://github.com/anomalyco/opencode/issues/46931>

### 4. Anthropic 请求被 Zen gateway 因 `block_binding` 额外输入拒绝
- Issue：Anthropic 相关请求在最新版本下触发 `invalid_request_error`。  
- 重要性：属于 provider 兼容性回归，可能影响一批正在使用 Anthropic 的用户。  
- 社区反应：2 条评论，且已关闭，说明修复/定位推进较快。  
链接：<https://github.com/anomalyco/opencode/issues/46909>

### 5. 备用模型/回退机制意外消耗了约 25% 的 OpenCode Go 限额
- Issue：自动 fallback 在用户无感知下切换到更贵模型，造成额度损耗。  
- 重要性：涉及成本控制与默认策略透明度，是产品信任核心问题。  
- 社区反应：2 条评论，明显属于“高敏感、强争议”问题。  
链接：<https://github.com/anomalyco/opencode/issues/46894>

### 6. 双击 Enter / Send 会重复创建 session
- Issue：提交 prompt 时缺少 debounce 或禁用态，导致重复建会话。  
- 重要性：会话重复会破坏任务流、污染历史记录，也会引入额外费用。  
- 社区反应：2 条评论，属于典型交互竞态问题。  
链接：<https://github.com/anomalyco/opencode/issues/46844>

### 7. 两个独立 OpenCode 标签页意外共享状态/会话
- Issue：本应隔离的两个 tab 出现状态同步。  
- 重要性：这是多会话工具的基础隔离问题，影响并行工作流。  
- 社区反应：2 条评论，说明用户已实际碰到会话串线。  
链接：<https://github.com/anomalyco/opencode/issues/46824>

### 8. Skills 无视全局 AGENTS.md 中的 /tmp 规则
- Issue：技能执行仍请求访问 `/tmp`，而不是遵循 `~/.opencode/tmp`。  
- 重要性：权限策略不一致会导致用户频繁授权，降低自动化体验。  
- 社区反应：2 条评论，属于“权限摩擦”类高频问题。  
链接：<https://github.com/anomalyco/opencode/issues/46815>

### 9. `permission.ask` 已定义和文档化，但从未触发
- Issue：插件 hook surface 中声明了 `permission.ask`，但运行时不发事件。  
- 重要性：这是 API 文档与实际行为不一致，影响插件开发者预期。  
- 社区反应：2 条评论，容易成为插件生态的隐性坑。  
链接：<https://github.com/anomalyco/opencode/issues/46809>

### 10. GitHub Copilot 已连接但无模型可用
- Issue：没有 Copilot entitlement 的账号也能“连上”，但模型列表为空。  
- 重要性：认证成功不代表可用，容易造成连接成功但功能失效的假象。  
- 社区反应：1 条评论，但问题指向登录/授权逻辑的关键缺陷。  
链接：<https://github.com/anomalyco/opencode/issues/46891>

---

## 4) 重要 PR 进展

### 1. 在当前会话中直接展示执行失败
- PR：让 TUI 在用户正在查看的 session 内展示执行失败原因，而不是只在后台提示。  
- 价值：提升故障可见性，减少“任务失败但不知道为什么”的体验断层。  
链接：<https://github.com/anomalyco/opencode/pull/46968>

### 2. 给延迟执行的 skill 插件失败增加归因
- PR：当 plugin 先完成 setup、后续 skill transform 才失败时，能准确指出失败插件与操作。  
- 价值：大幅提升插件故障排查效率。  
链接：<https://github.com/anomalyco/opencode/pull/46967>

### 3. 清理 responses replay 的 tombstone 机制
- PR：移除旧的消息/工具 tombstone 逻辑，简化流式 replay 处理。  
- 价值：减少历史流重放的复杂度与边界错误。  
链接：<https://github.com/anomalyco/opencode/pull/46965>

### 4. 过滤 permission request 中的 undefined metadata
- PR：避免权限请求携带无意义的 `undefined` 元数据。  
- 价值：提升协议稳定性，降低序列化/校验异常概率。  
链接：<https://github.com/anomalyco/opencode/pull/46964>

### 5. 将更新检查下沉到 TUI 客户端
- PR：重构自动更新监测与通知路径，减少后台 server 负担。  
- 价值：更贴近前台交互场景，也更容易维护更新提示逻辑。  
链接：<https://github.com/anomalyco/opencode/pull/46963>

### 6. 持久化 compaction 的 model 和 provider state
- PR：让 compaction completion 事件携带 model/provider state，增强状态恢复能力。  
- 价值：对长会话、重放和恢复场景很关键。  
链接：<https://github.com/anomalyco/opencode/pull/46962>

### 7. 区分 location 加载失败与数据同步失败
- PR：当 `/api/location` 成功但 `/api/agent` 失败时，不再误导用户去换目录。  
- 价值：减少错误归因，避免用户被错误引导。  
链接：<https://github.com/anomalyco/opencode/pull/46961>

### 8. 为 route capability mismatch 增加 `UnsupportedOperation`
- PR：对不支持的操作返回专门错误类型，而不是泛化成 `InvalidRequest`。  
- 价值：改善 SDK/调用方错误处理的可判别性。  
链接：<https://github.com/anomalyco/opencode/pull/46960>

### 9. 拒绝没有 chat entitlement 的 GitHub Copilot 登录
- PR：修复“登录成功但无模型可用”的假连接状态。  
- 价值：直接对应今天的热点 issue，能减少用户困惑。  
链接：<https://github.com/anomalyco/opencode/pull/46959>

### 10. 失败的 location 初始化支持重试
- PR：修复 location 因文件缺失、权限异常等导致的永久失败问题。  
- 价值：增强恢复性，避免临时文件系统问题演变成永久故障。  
链接：<https://github.com/anomalyco/opencode/pull/46957>

---

## 5) 功能需求趋势

从过去 24 小时的 Issues 看，社区最关注的功能方向主要有 5 类：

1. **模型发现与多 provider 兼容**
   - 自定义 OpenAI-compatible provider 自动发现模型、Copilot entitlement、Anthropic 兼容问题都集中在这里。  
   链接示例：<https://github.com/anomalyco/opencode/issues/46941>

2. **计费/额度准确性与可解释性**
   - Go 用量误差、fallback 误消费、双倍计费疑虑，说明“费用透明”是高优先级诉求。  
   链接示例：<https://github.com/anomalyco/opencode/issues/46931>

3. **会话隔离与状态一致性**
   - 多 tab 串状态、history 混杂、prompt_async 不调度、重复创建 session，反映出状态管理压力较大。  
   链接示例：<https://github.com/anomalyco/opencode/issues/46824>

4. **权限与插件机制成熟度**
   - `permission.ask`、AGENTS.md tmp 规则、skill/editor 相关问题，说明插件/权限体系正被深度使用。  
   链接示例：<https://github.com/anomalyco/opencode/issues/46809>

5. **前端/TUI/桌面端交互稳定性**
   - 双 Enter、缩放快捷键、滚动条缺失、执行失败不可见等，说明 UI 交互边界仍在快速暴露。  
   链接示例：<https://github.com/anomalyco/opencode/issues/46844>

---

## 6) 开发者关注点

今天的反馈里，开发者和用户的痛点比较集中，主要是：

- **静默失败不可接受**：如 formatter 被悄悄禁用、权限 hook 名义存在但不触发、provider 请求被拦却缺少可读诊断。  
- **状态串线与竞态问题高发**：多 tab 共享状态、双击重复建会话、busy session 中的 prompt_async 丢任务，都指向并发控制需要加强。  
- **计费与模型可用性必须可验证**：社区对“显示已连接但无模型”“费用显示翻倍”“自动 fallback 偷跑额度”非常敏感。  
- **插件/权限 API 需要更强一致性**：文档、类型、运行时行为必须对齐，否则会直接影响生态开发者。  
- **慢启动与流式体验仍然脆弱**：因此本次版本把超时拉长到 5 分钟，是很明确的稳定性导向修复。  

如果你希望，我也可以把这份日报进一步整理成：
- **适合发 Slack/飞书的短版**
- **适合内部周报的长版**
- **带“影响等级/优先级”评分版**

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-09-03

## 1) 今日速览
今天社区没有新 Release，但 Issues 和 PR 的更新非常集中，核心关键词是 **运行时可恢复性、会话安全、工具调用控制、模型/提供商兼容**。  
最值得关注的是 `AgentHarness` 可恢复运行时与 capability policy 的提案开始落地，同时 Codex SSE OOM、JSONL 会话写入安全、OpenRouter / llama.cpp / OpenAI 兼容性等问题持续被修复。  
**结论：Pi 正在从“能跑”加速走向“可控、可恢复、可扩展”。**

---

## 2) 社区热点 Issues

1. [#9032 Expose frameless and prompt-prefix options on pi-tui Editor](https://github.com/earendil-works/pi/issues/9032)  
   - **为什么重要**：直接关系到 TUI 编辑器的展示能力，属于高频交互配置诉求，影响终端用户体验与可定制性。  
   - **社区反应**：3 条评论，是今天较活跃的 UI 需求之一，说明这类“低成本增强”有明确需求。

2. [#9045 Invalid --mode values are silently ignored](https://github.com/earendil-works/pi/issues/9045)  
   - **为什么重要**：CLI 参数校验缺失会导致脚本静默降级，属于典型的“可用但不可信”问题。  
   - **社区反应**：2 条评论，说明开发者对命令行可预测性很敏感。

3. [#9043 Contribution proposal: add an opt-in capability policy hook to pi-agent-core](https://github.com/earendil-works/pi/issues/9043)  
   - **为什么重要**：这是工具调用权限控制的核心能力，关系到 Pi 在企业/本地环境中的安全边界。  
   - **社区反应**：2 条评论，且提案较完整，显示出对“可审计、可拒绝、可治理”能力的强需求。

4. [#9042 Contribution proposal: make AgentHarness the canonical recoverable runtime](https://github.com/earendil-works/pi/issues/9042)  
   - **为什么重要**：这类提案决定了 agent runtime 的长期架构方向，涉及 prompt、abort、resume、lanes、watch 等关键生命周期。  
   - **社区反应**：2 条评论，属于架构级讨论，优先级很高。

5. [#9036 openai-codex SSE parser buffers the whole response in one string, fatal heap OOM](https://github.com/earendil-works/pi/issues/9036)  
   - **为什么重要**：这是直接影响稳定性的高危问题，内存 OOM 会导致整个会话中断。  
   - **社区反应**：虽然只有 1 条评论，但问题严重度高，且已迅速对应修复 PR。

6. [#9000 AgentSession still hardcodes SessionManager (JSONL); cannot use SqliteSessionRepository despite harness v2 stable](https://github.com/earendil-works/pi/issues/9000)  
   - **为什么重要**：会话后端的耦合限制了 Pi 在持久化和扩展上的能力，是基础设施层的瓶颈。  
   - **社区反应**：2 条评论，说明对 session 存储可替换性的需求持续升温。

7. [#9027 Optional per-tool timeoutMs enforced by the agent loop](https://github.com/earendil-works/pi/issues/9027)  
   - **为什么重要**：单个 tool 卡死拖垮整个 run，是 agent 系统常见痛点；超时机制能显著提升可靠性。  
   - **社区反应**：1 条评论，但属于高价值基础能力。

8. [#9007 openai-completions leaks <think> reasoning into assistant text](https://github.com/earendil-works/pi/issues/9007)  
   - **为什么重要**：推理内容外泄会破坏用户体验，也会影响不同模型在同一输出通道中的兼容性。  
   - **社区反应**：2 条评论，说明“隐藏 reasoning”是实际使用中的刚需。

9. [#9033 Use statically linked musl builds when downloading fd and ripgrep on Linux](https://github.com/earendil-works/pi/issues/9033)  
   - **为什么重要**：Linux / NixOS / Alpine 兼容性直接影响安装成功率，是开发工具能否“开箱即用”的关键。  
   - **社区反应**：1 条评论，属于典型的环境适配型问题。

10. [#9002 pi: OpenRouter finish_reason:"error" is never retried, kills the turn](https://github.com/earendil-works/pi/issues/9002)  
    - **为什么重要**：上游不稳定时缺少重试会放大失败率，影响模型供应商切换体验。  
    - **社区反应**：2 条评论，说明对多供应商容错机制的关注在上升。

---

## 3) 重要 PR 进展

1. [#9044 feat(agent): add initial recoverable harness runtime and capability policy](https://github.com/earendil-works/pi/pull/9044)  
   - 引入 `AgentHarness` 初始可恢复运行时生命周期，并加入可选 `ToolPolicy`，是今天最重要的架构 PR。

2. [#9037 fix(ai): bound and CRLF-aware Codex SSE parsing](https://github.com/earendil-works/pi/pull/9037)  
   - 修复 Codex SSE 解析无限累积导致的 OOM，并兼容 CRLF 行尾，直接提升流式稳定性。

3. [#9040 fix(agent): reject stale JSONL session writes after delete](https://github.com/earendil-works/pi/pull/9040)  
   - 防止会话删除后旧句柄又写回文件，避免生成损坏的 JSONL 会话。

4. [#9039 feat(coding-agent): add PI_DISABLE_MOUSE to opt out of fullscreen mouse tracking](https://github.com/earendil-works/pi/pull/9039)  
   - 为全屏模式提供鼠标跟踪开关，属于终端交互的可控性增强。

5. [#9031 feat(coding-agent): add opencode-go limits extension](https://github.com/earendil-works/pi/pull/9031)  
   - 在 footer 中展示 OpenCode Go 配额，解决订阅型模型“额度不可见”的问题。

6. [#9015 fix(coding-agent): enable reasoning and reasoning effort for llama.cpp provider](https://github.com/earendil-works/pi/pull/9015)  
   - 让 built-in `llama.cpp` provider 支持 reasoning / reasoning_effort，增强本地模型能力对齐。

7. [#9004 feat(ai): add vllmPriority compat flag for vLLM scheduler priority](https://github.com/earendil-works/pi/pull/9004)  
   - 为 OpenAI-compatible 模型增加 `vllmPriority` 兼容字段，方便本地 vLLM 调度。

8. [#8997 fix(agent): surface proxy stream EOF without terminal event as an error](https://github.com/earendil-works/pi/pull/8997)  
   - 让代理流在缺少终结事件时显式报错，避免“卡住但不退出”的问题。

9. [#8995 fix(coding-agent): never overwrite existing session files on /import](https://github.com/earendil-works/pi/pull/8995)  
   - 修复导入会话时覆盖同名文件的问题，属于数据安全修复。

10. [#8994 fix(agent): map signal-killed processes to non-zero exit codes](https://github.com/earendil-works/pi/pull/8994)  
    - 把被信号杀掉的子进程映射为非零退出码，避免把失败误判成成功。

---

## 4) 功能需求趋势

1. **运行时架构升级：可恢复、可中断、可恢复后继续执行**  
   - 代表 Issue：[#9042](https://github.com/earendil-works/pi/issues/9042)、[#9043](https://github.com/earendil-works/pi/issues/9043)  
   - 说明社区希望 Pi 从“单次执行引擎”升级为“可恢复 runtime 平台”。

2. **工具权限与执行治理：超时、准入、审计成为重点**  
   - 代表 Issue：[#9027](https://github.com/earendil-works/pi/issues/9027)、[#9043](https://github.com/earendil-works/pi/issues/9043)  
   - 开发者不仅要工具能跑，还要能限制、追踪和回放。

3. **模型/Provider 兼容性持续扩张**  
   - 代表 Issue：[#9007](https://github.com/earendil-works/pi/issues/9007)、[#9002](https://github.com/earendil-works/pi/issues/9002)、[#9036](https://github.com/earendil-works/pi/issues/9036)  
   - 社区持续推动 Pi 适配 OpenRouter、OpenAI-compatible、Codex、llama.cpp 等多种后端。

4. **TUI/CLI 体验仍是高频优化面**  
   - 代表 Issue：[#9032](https://github.com/earendil-works/pi/issues/9032)、[#9045](https://github.com/earendil-works/pi/issues/9045)、[#9023](https://github.com/earendil-works/pi/issues/9023)  
   - 用户非常关注编辑器展示、参数错误提示、图片输入等“日常可感知”的细节。

5. **基础设施可靠性：会话存储、文件导入、平台兼容**  
   - 代表 Issue：[#9000](https://github.com/earendil-works/pi/issues/9000)、[#9033](https://github.com/earendil-works/pi/issues/9033)  
   - 说明 Pi 正在从“功能驱动”进入“工程化打磨”阶段。

---

## 5) 开发者关注点

1. **失败不能静默吞掉，必须可诊断**  
   - 例如参数错误静默、流式 EOF 未报错、signal-killed 被当成功：  
     [#9045](https://github.com/earendil-works/pi/issues/9045)、[#8997](https://github.com/earendil-works/pi/pull/8997)、[#8994](https://github.com/earendil-works/pi/pull/8994)

2. **会话与文件安全是底层刚需**  
   - 删除后不能复写、导入不能覆盖、后端不能强耦合：  
     [#9040](https://github.com/earendil-works/pi/pull/9040)、[#8995](https://github.com/earendil-works/pi/pull/8995)、[#9000](https://github.com/earendil-works/pi/issues/9000)

3. **模型兼容问题集中在“输出规范”和“流式解析”**  
   - 例如 `<think>` 泄漏、Codex SSE OOM、OpenRouter error 不重试：  
     [#9007](https://github.com/earendil-works/pi/issues/9007)、[#9036](https://github.com/earendil-works/pi/issues/9036)、[#9002](https://github.com/earendil-works/pi/issues/9002)

4. **终端交互体验仍有大量可优化空间**  
   - 编辑器布局、鼠标行为、图片粘贴、全屏选择等都在被持续提案：  
     [#9032](https://github.com/earendil-works/pi/issues/9032)、[#9039](https://github.com/earendil-works/pi/pull/9039)、[#9023](https://github.com/earendil-works/pi/issues/9023)

5. **社区对“更强控制面”有明确共识**  
   - 包括工具准入、超时、审计、可恢复 runtime：  
     [#9043](https://github.com/earendil-works/pi/issues/9043)、[#9027](https://github.com/earendil-works/pi/issues/9027)、[#9042](https://github.com/earendil-works/pi/issues/9042)

---

如果你希望，我也可以把这份日报进一步整理成：
- **适合发群的短版**
- **适合 Notion/飞书的表格版**
- **带“风险等级 / 优先级”标签的运营版**

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报｜2026-09-03

## 1) 今日速览
过去 24 小时，社区讨论的焦点集中在 **安全边界、会话性能、以及 Web Shell 体验** 三条主线：既有 `qwen serve` 的 shell guard / Git 访问控制争议，也有长会话 reconnect、监控脉冲风暴、workflow projection 重算等性能问题。  
同时，CI 与发布链路持续在做加固：依赖 CVE、共享 ECS 资源争用、超时与重试策略、以及失败诊断可观测性都在密集推进。

---

## 2) 版本发布
- **[live-host-v0.2.0](https://github.com/QwenLM/qwen-code/releases/tag/live-host-v0.2.0)**  
  过去 24 小时新发布版本，已知更新包括：
  - `fix(ci): make shared ECS Vitest concurrency tunable`
  - `feat(cli): OpenTUI migration batch 4`（CLI 侧 OpenTUI 迁移继续推进）

  这次发布的核心价值在于：**让共享 CI 环境的并发参数可调**，并继续推进新 TUI 体系落地。

---

## 3) 社区热点 Issues
1. **[#10860](https://github.com/QwenLM/qwen-code/issues/10860)** `qwen serve` 的内置 shell guard 忽略 session approval mode，且无法配置/审计/对 operator 可见  
   - **为什么重要**：这是典型的 **安全边界与可控性** 问题，直接影响 daemon/Web Shell 的权限模型。  
   - **社区反应**：**3 条评论**，讨论集中在“为什么不能配置、为什么不能审计、为什么 operator 看不到原因”。

2. **[#10780](https://github.com/QwenLM/qwen-code/issues/10780)** `qwen serve` reconnect 反复回放完整历史，可能拖垮共享 transport  
   - **为什么重要**：属于 **长会话性能/稳定性** 问题，严重时会影响其他会话。  
   - **社区反应**：**3 条评论**，说明该问题具有明显的复现价值和优先级。

3. **[#10818](https://github.com/QwenLM/qwen-code/issues/10818)** Monitor pulse storm 可让交互会话近似 DoS，ESC 取消也失效  
   - **为什么重要**：直接影响 **交互式 CLI 可用性**，属于会话级阻塞问题。  
   - **社区反应**：**3 条评论**，说明用户对“输入被饿死”非常敏感。

4. **[#10850](https://github.com/QwenLM/qwen-code/issues/10850)** 依赖 CVE audit 因 fast-uri/qs/uuid 新告警而失败  
   - **为什么重要**：这是 **发布门禁级** 问题，涉及安全审计失败。  
   - **社区反应**：**2 条评论**，属于需要快速闭环的安全阻塞项。

5. **[#10834](https://github.com/QwenLM/qwen-code/issues/10834)** MCP 工具返回的图片绕过 read_file 图片预算，直接以原始分辨率进入上下文  
   - **为什么重要**：这会造成 **上下文膨胀、成本失控、以及多模态输入一致性问题**。  
   - **社区反应**：**2 条评论**，表明大家很关注 MCP 输出是否也要纳入统一预算。

6. **[#10797](https://github.com/QwenLM/qwen-code/issues/10797)** 非思考类 scaffolding（tool-result blocks、system-reminders）被回显到用户可见输出  
   - **为什么重要**：涉及 **输出洁净度与内部信息泄漏**。  
   - **社区反应**：**2 条评论**，说明“只拦 thinking 不够”已成为共识。

7. **[#10791](https://github.com/QwenLM/qwen-code/issues/10791)** content-only turn 中，平衡的 `<thinking>...</thinking>` 仍会泄漏到用户输出  
   - **为什么重要**：这是 **模型输出净化漏洞**，对所有依赖内容过滤的场景都关键。  
   - **社区反应**：**2 条评论**，属于高优先级的内容安全修复方向。

8. **[#10821](https://github.com/QwenLM/qwen-code/issues/10821)** Web Shell 中第二次打开 New task 后 model picker 消失  
   - **为什么重要**：这是 **核心交互流程 bug**，会直接阻断任务选择。  
   - **社区反应**：**2 条评论**，说明 UI 稳定性仍是活跃关注点。

9. **[#10866](https://github.com/QwenLM/qwen-code/issues/10866)** session workflow DAG 可视化已出现，但可导航性不足  
   - **为什么重要**：属于 **Web Shell 工作流可用性增强**，对复杂任务尤其关键。  
   - **社区反应**：**2 条评论**，说明用户已经开始围绕 DAG 图提出更细粒度的可操作需求。

10. **[#10816](https://github.com/QwenLM/qwen-code/issues/10816)** 希望为 channels 增加可配置的 inbound message prefix  
    - **为什么重要**：反映了 **集成/路由边界** 的需求，希望通道能更明确地区分消息类型。  
    - **社区反应**：**2 条评论**，偏向平台化与可扩展性诉求。

---

## 4) 重要 PR 进展
1. **[#10871](https://github.com/QwenLM/qwen-code/pull/10871)** `perf(web-shell): derive the session workflow projection once`  
   - 将 session workflow projection 的构建改为 **一次计算、下游复用**，减少重复派生开销。  
   - 对 Web Shell 的计划图、悬停、渲染链路都有直接收益。

2. **[#10868](https://github.com/QwenLM/qwen-code/pull/10868)** `fix(ci): retry a contended unit attempt and bound a hung one`  
   - 为 ubuntu unit lane 增加 **重试** 与 **step timeout**，降低共享环境下的偶发失败。  
   - 这是典型的 **CI 抗抖动** 修复。

3. **[#10869](https://github.com/QwenLM/qwen-code/pull/10869)** `ci: record host occupancy alongside the disk-pressure samples`  
   - CI 磁盘压力采样现在会记录 **主机占用情况**，增强故障定位能力。  
   - 有助于判断是“作业自身”还是“宿主机竞争”导致的问题。

4. **[#10862](https://github.com/QwenLM/qwen-code/pull/10862)** `chore(deps): bump fast-uri to 3.1.7 to clear the high-severity audit gate`  
   - 通过升级 `fast-uri` 消除高危审计阻塞。  
   - 属于 **安全门禁修复**，影响发布链路健康度。

5. **[#10861](https://github.com/QwenLM/qwen-code/pull/10861)** `fix(ci): read the CI patrol's status rollup one PR at a time`  
   - CI Failure Patrol 改为 **逐个 PR 读取 rollup**，避免一次性拉取过重。  
   - 提升巡检效率，也减少 API 压力。

6. **[#10858](https://github.com/QwenLM/qwen-code/pull/10858)** `fix(ci): give the scripts test suite the shared-ECS timeout ceiling`  
   - 将 scripts test suite 纳入共享 ECS 的统一超时上限。  
   - 这是针对 **共享 runner 环境差异** 的校准。

7. **[#10857](https://github.com/QwenLM/qwen-code/pull/10857)** `fix(web-shell): scope select-all in the cell value dialog to the value`  
   - 修复对话框内 `Cmd+A / Ctrl+A` 选中全页文本的问题。  
   - 属于典型的 **Web Shell 交互可用性修复**。

8. **[#10855](https://github.com/QwenLM/qwen-code/pull/10855)** `fix(ci): name the failing job when a main CI run reports no test result`  
   - 当 main CI 没有输出具体测试结果时，现在能标出 **失败 job 与 step**。  
   - 明显提升 **排障可读性**。

9. **[#10848](https://github.com/QwenLM/qwen-code/pull/10848)** `fix(ci): rate-limit interim monitor notification turns (#10818)`  
   - 为 monitor interim 通知加入 **最小 turn 间隔**，减少脉冲风暴。  
   - 直接回应了 #10818 的会话卡死问题。

10. **[#10842](https://github.com/QwenLM/qwen-code/pull/10842)** `fix(release): stop one flaky test from failing a stable release`  
    - 让稳定版发布对某些 flaky test 更鲁棒，并硬化多个真实阻塞过 release 的测试。  
    - 对 **发布成功率** 很关键。

---

## 5) 功能需求趋势
从所有 Issues 看，社区最关注的方向主要有 5 类：

1. **安全边界与权限可控性**
   - `qwen serve` shell guard、Git 命令拦截、审批模式、可审计性。
   - 说明大家希望 **“默认安全” 与 “可配置可解释” 同时成立**。  
   - 代表问题：[#10860](https://github.com/QwenLM/qwen-code/issues/10860)、[#10850](https://github.com/QwenLM/qwen-code/issues/10850)

2. **长会话性能与共享环境稳定性**
   - reconnect 回放、workflow projection 重算、monitor pulse storm、共享 ECS 争用。
   - 说明项目正从“能跑”进入“**大规模长时会话也要稳**”的阶段。  
   - 代表问题：[#10780](https://github.com/QwenLM/qwen-code/issues/10780)、[#10818](https://github.com/QwenLM/qwen-code/issues/10818)、[#10866](https://github.com/QwenLM/qwen-code/issues/10866)

3. **Web Shell / UI 可用性**
   - model picker、select-all、DAG 导航、图形化工作流操作体验。
   - 表明 Web Shell 已进入 **细节打磨期**，用户开始要求更强的可操作性。  
   - 代表问题：[#10821](https://github.com/QwenLM/qwen-code/issues/10821)、[#10866](https://github.com/QwenLM/qwen-code/issues/10866)、[#10857](https://github.com/QwenLM/qwen-code/issues/10857)

4. **内容输出净化与模型行为治理**
   - thinking 标签泄漏、scaffolding 回显、content-only turn 过滤不足。
   - 这类问题说明社区已经从“模型会不会想”转向“**模型输出是否可控**”。  
   - 代表问题：[#10797](https://github.com/QwenLM/qwen-code/issues/10797)、[#10791](https://github.com/QwenLM/qwen-code/issues/10791)

5. **多模态与工具链一致性**
   - MCP 图片预算、资源目录、skills 命名、channels 消息路由。
   - 体现出插件/MCP/Channels 正在走向 **平台化**，社区希望接口语义更统一。  
   - 代表问题：[#10834](https://github.com/QwenLM/qwen-code/issues/10834)、[#10816](https://github.com/QwenLM/qwen-code/issues/10816)、[#10837](https://github.com/QwenLM/qwen-code/issues/10837)

---

## 6) 开发者关注点
开发者反馈里最突出的痛点，可以总结为以下几项：

- **CI 太脆，且受共享资源影响明显**  
  典型表现是并发、超时、锁竞争、审计门禁、失败定位不清。  
  相关：[#10868](https://github.com/QwenLM/qwen-code/pull/10868)、[#10869](https://github.com/QwenLM/qwen-code/pull/10869)、[#10855](https://github.com/QwenLM/qwen-code/pull/10855)

- **安全策略需要“可解释、可配置、可审计”**  
  目前最大争议不是“要不要拦”，而是“**拦截规则能否让 operator 看见并调整**”。  
  相关：[#10860](https://github.com/QwenLM/qwen-code/issues/10860)、[#10859](https://github.com/QwenLM/qwen-code/issues/10859)

- **性能问题正在从单点优化变成系统性治理**  
  长会话 replay、projection 重算、pulse storm 说明需要从架构层减少重复计算和无效唤醒。  
  相关：[#10780](https://github.com/QwenLM/qwen-code/issues/10780)、[#10871](https://github.com/QwenLM/qwen-code/pull/10871)、[#10848](https://github.com/QwenLM/qwen-code/pull/10848)

- **输出净化是高频痛点**  
  现在不只是 `<thinking>` 泄漏，连工具块、system-reminders 也开始被回显。  
  相关：[#10797](https://github.com/QwenLM/qwen-code/issues/10797)、[#10791](https://github.com/QwenLM/qwen-code/issues/10791)

- **Web Shell 的细节交互正在被逐项放大审视**  
  输入框、任务切换、DAG 导航、选择快捷键等都进入了“可用性精修”阶段。  
  相关：[#10821](https://github.com/QwenLM/qwen-code/issues/10821)、[#10866](https://github.com/QwenLM/qwen-code/issues/10866)、[#10857](https://github.com/QwenLM/qwen-code/pull/10857)

如需，我可以把这份日报进一步整理成：
- **适合公众号/周报的精简版**
- **适合内部研发晨会的要点版**
- **按“安全 / 性能 / UI / CI”分类的管理层摘要版**

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026-09-03）

## 1) 今日速览
今天社区讨论的重心非常集中：一边是 **模型接入与上下文预算**（本地 Ollama、live catalog、reasoning effort、模型发现），另一边是 **IDE / 计算机使用 / 插件体系** 的路线推进。  
同时，多个 **稳定性与安全性修复** 已经落地，包括线程历史重放、TTL 清理误删防护、工作流运行时硬化等，说明项目正在从“功能扩张”转向“可用性与架构收敛”。

---

## 2) 社区热点 Issues

1. **#5820 Ollama provider: input budget collapses to 1024 tokens on 32K local models**  
   重要性：直接影响本地大上下文模型的实际可用输入长度，属于“看起来支持 32K，实际只能用 1K”的高影响问题。  
   社区反应：已有 **2 条评论**，说明复现路径和影响范围都比较明确。  
   链接：[#5820](https://github.com/Hmbown/DeepSeek-TUI/issues/5820)

2. **#5860 [enhancement] Continuous Self-Learning from Dialog**  
   重要性：这是从“手动 Skills”走向“自动技能演化”的能力升级，属于长期产品方向，不只是单点功能。  
   社区反应：已有 **1 条评论**，早期反馈不多，但议题本身很有战略性。  
   链接：[#5860](https://github.com/Hmbown/DeepSeek-TUI/issues/5860)

3. **#5824 Lane TTL cleanup can recursively delete an unverified path**  
   重要性：这是典型高风险安全问题，涉及清理逻辑是否可能误删非托管路径。  
   社区反应：问题已 **关闭**，只有 **1 条评论**，说明这是一个被快速重视并修复的破坏性缺陷。  
   链接：[#5824](https://github.com/Hmbown/DeepSeek-TUI/issues/5824)

4. **#5823 serve --http: threads with tool-call history fail with 400 missing field name after a runtime restart**  
   重要性：关乎服务重启后的历史回放与协议兼容，属于影响在线服务稳定性的核心问题。  
   社区反应：已 **关闭**，有 **1 条评论**；这类“重启后即坏”的 bug 通常会优先修。  
   链接：[#5823](https://github.com/Hmbown/DeepSeek-TUI/issues/5823)

5. **#5856 Computer-use plugin: live-install receipt + first look-act loop**  
   重要性：这是插件体系向“真实计算机操作”迈出的关键一步，直接关系到 agent 能否完成截图-点击-验证闭环。  
   社区反应：当前 **0 条评论**，但属于能力跃迁型功能，后续关注度大概率会上升。  
   链接：[#5856](https://github.com/Hmbown/DeepSeek-TUI/issues/5856)

6. **#5853 muse-spark-1.3 reasoning effort + Codex XHigh/Ultra picker rows**  
   重要性：聚焦新模型家族支持和推理档位映射，属于“模型适配质量”问题。  
   社区反应：暂未见评论，但这类 issue 往往会影响多个 provider / model family。  
   链接：[#5853](https://github.com/Hmbown/DeepSeek-TUI/issues/5853)

7. **#5849 Verify engine + app both resolve models from the live catalog**  
   重要性：强调模型能力来源必须以 live catalog 为准，避免 hard-coded id 和“能力描述不实”。  
   社区反应：目前 **0 条评论**，但它是平台一致性和可维护性的关键基础设施。  
   链接：[#5849](https://github.com/Hmbown/DeepSeek-TUI/issues/5849)

8. **#5852 Workflow-mode runtime hardening (needs live repro)**  
   重要性：工作流模式是高频操作链路，任何卡顿、子进程残留或取消失败都会明显影响体验。  
   社区反应：尚无评论，说明还处于“待实测确认”的阶段。  
   链接：[#5852](https://github.com/Hmbown/DeepSeek-TUI/issues/5852)

9. **#5847 Replace XOR thinking-collapse logic with intent-based expand/collapse**  
   重要性：这是交互逻辑正确性问题，解决后能避免“verbose / default-expanded / fold 状态”互相打架。  
   社区反应：暂无评论，但属于直接影响 TUI 交互一致性的基础修正。  
   链接：[#5847](https://github.com/Hmbown/DeepSeek-TUI/issues/5847)

10. **#5838 epic(ide): Codewhale Studio — VS Code fork as the canonical desktop**  
    重要性：这是路线级变更，意味着项目的桌面端形态正在从轻量壳转向更完整的 IDE 方向。  
    社区反应：目前 **0 条评论**，但作为 Epic，它会牵引后续大量子任务。  
    链接：[#5838](https://github.com/Hmbown/DeepSeek-TUI/issues/5838)

---

## 3) 重要 PR 进展

1. **#5862 Codewhale 0.9.12: Fleet-only UX**  
   进展：一次性整合 10 个 UX 切片，包括 workbar 命名、hover 交互、设置重组、主题与角色等，明显是 0.9.12 的主干集成 PR。  
   链接：[#5862](https://github.com/Hmbown/DeepSeek-TUI/pull/5862)

2. **#5861 chore(brand): serve the canonical whale on account-entry pages**  
   进展：统一登录/注册页的品牌标识，消除“入口页鲸鱼”和产品主视觉不一致的问题。  
   链接：[#5861](https://github.com/Hmbown/DeepSeek-TUI/pull/5861)

3. **#5858 tui: collapse ocean_treatment into ThemeId::Underwater**  
   进展：把海洋主题收敛到统一的 Underwater 主题 ID，减少主题分裂和配置漂移。  
   链接：[#5858](https://github.com/Hmbown/DeepSeek-TUI/pull/5858)

4. **#5857 fix(tui): thinking fold toggles relative to the expanded baseline**  
   进展：修正 thinking 折叠逻辑，使其围绕“展开基线”切换，避免状态反转。  
   链接：[#5857](https://github.com/Hmbown/DeepSeek-TUI/pull/5857)

5. **#5855 feat(plugins): computer-use bundle - screenshot, click, and type over MCP**  
   进展：插件边界上的首个独立 computer-use 包，覆盖截图、点击、输入等 MCP 能力。  
   链接：[#5855](https://github.com/Hmbown/DeepSeek-TUI/pull/5855)

6. **#5854 lane: require verified managed-worktree identity before TTL cleanup**  
   进展：为 TTL 清理加上“必须验证托管工作树身份”的保护，降低误删风险。  
   链接：[#5854](https://github.com/Hmbown/DeepSeek-TUI/pull/5854)

7. **#5842 feat(runtime-api): plugin + marketplace management over /v1/apps (Engine side)**  
   进展：引入本地插件与市场管理的引擎侧能力，为后续插件生态打底。  
   链接：[#5842](https://github.com/Hmbown/DeepSeek-TUI/pull/5842)

8. **#5840 runtime: persist tool-call identity so restarts replay valid history**  
   进展：修复重启后历史回放失败问题，保证 tool-call 身份可持续重放。  
   链接：[#5840](https://github.com/Hmbown/DeepSeek-TUI/pull/5840)

9. **#5833 feat(memory): FEAT-019 memory capability, memory facet, and typed outcomes**  
   进展：补齐 Memory 能力位、上下文 facet 和 typed outcomes，说明记忆体系正在正式产品化。  
   链接：[#5833](https://github.com/Hmbown/DeepSeek-TUI/pull/5833)

10. **#5831 feat(tui): per-session control socket**  
    进展：为每个 session 增加可选控制 socket，支持 message / interrupt / relaunch / status 等操作。  
    链接：[#5831](https://github.com/Hmbown/DeepSeek-TUI/pull/5831)

---

## 4) 功能需求趋势

从今天的 Issues 看，社区关注点主要集中在以下几条主线：

- **IDE 集成持续升温**：Codewhale Studio、ACP、VS Code 插件、Runtime API agent client 等都在推进，说明“从 TUI 到 IDE”是明确方向。  
  链接：[#5838](https://github.com/Hmbown/DeepSeek-TUI/issues/5838) / [#5835](https://github.com/Hmbown/DeepSeek-TUI/issues/5835) / [#5834](https://github.com/Hmbown/DeepSeek-TUI/issues/5834)

- **模型接入与能力映射更精细化**：live catalog、reasoning effort、模型家族扩展、Ollama 默认值与上下文预算都在被反复校准。  
  链接：[#5820](https://github.com/Hmbown/DeepSeek-TUI/issues/5820) / [#5849](https://github.com/Hmbown/DeepSeek-TUI/issues/5849) / [#5853](https://github.com/Hmbown/DeepSeek-TUI/issues/5853)

- **Agent 化执行能力增强**：computer-use、workflow、插件安装与验证，说明项目正向“能操作真实环境”的方向演进。  
  链接：[#5856](https://github.com/Hmbown/DeepSeek-TUI/issues/5856) / [#5852](https://github.com/Hmbown/DeepSeek-TUI/issues/5852)

- **云端/受管计算基础设施重构**：Daytona 退出、Lambda microVM、Computer rootfs 重建，反映出底层执行环境在换代。  
  链接：[#5836](https://github.com/Hmbown/DeepSeek-TUI/issues/5836) / [#5837](https://github.com/Hmbown/DeepSeek-TUI/issues/5837)

- **交互与品牌统一**：主题、标识、文案、hover、thinking 展开方式等 UX 细节被集中修整，说明 0.9.12 不只是功能堆叠，也在做整体体验整合。  
  链接：[#5847](https://github.com/Hmbown/DeepSeek-TUI/issues/5847) / [#5850](https://github.com/Hmbown/DeepSeek-TUI/issues/5850) / [#5861](https://github.com/Hmbown/DeepSeek-TUI/pull/5861)

- **记忆、技能与自学习开始产品化**：Memory、Skills、自动技能演化都在形成闭环。  
  链接：[#5833](https://github.com/Hmbown/DeepSeek-TUI/pull/5833) / [#5860](https://github.com/Hmbown/DeepSeek-TUI/issues/5860)

---

## 5) 开发者关注点

今天反馈中反复出现的痛点，基本可以归纳为以下几类：

- **上下文与预算计算不一致**：本地模型明明支持 32K，却被输出保留值“挤压”到只剩 1024 输入预算。  
  链接：[#5820](https://github.com/Hmbown/DeepSeek-TUI/issues/5820)

- **重启后的状态恢复必须可验证**：线程历史、tool-call 身份、工作流运行状态，任何一处不一致都会造成 400、卡死或回放错误。  
  链接：[#5823](https://github.com/Hmbown/DeepSeek-TUI/issues/5823) / [#5840](https://github.com/Hmbown/DeepSeek-TUI/pull/5840) / [#5852](https://github.com/Hmbown/DeepSeek-TUI/issues/5852)

- **危险操作必须先做身份校验**：TTL 清理、路径删除、工作树回收这类逻辑，社区对“误删风险”非常敏感。  
  链接：[#5824](https://github.com/Hmbown/DeepSeek-TUI/issues/5824) / [#5854](https://github.com/Hmbown/DeepSeek-TUI/pull/5854)

- **模型与 provider 不能靠静态写死**：大家希望运行时从 live catalog / provider capabilities 读取真实能力，而不是依赖硬编码。  
  链接：[#5849](https://github.com/Hmbown/DeepSeek-TUI/issues/5849) / [#5853](https://github.com/Hmbown/DeepSeek-TUI/issues/5853)

- **交互体验要“可预期”**：thinking 折叠、hover、主题、文案等小问题虽然不致命，但对 TUI 产品体验影响很大。  
  链接：[#5847](https://github.com/Hmbown/DeepSeek-TUI/issues/5847) / [#5858](https://github.com/Hmbown/DeepSeek-TUI/pull/5858) / [#5859](https://github.com/Hmbown/DeepSeek-TUI/pull/5859)

- **Agent 能力要真正落地到可执行闭环**：社区不只想要“会说”，更要“会做”，因此 computer-use、插件安装、截图验证、点击输入成为重点。  
  链接：[#5856](https://github.com/Hmbown/DeepSeek-TUI/issues/5856) / [#5842](https://github.com/Hmbown/DeepSeek-TUI/pull/5842)

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发到微信群/飞书的简版**，或  
2. **适合管理层阅读的 200 字摘要版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*