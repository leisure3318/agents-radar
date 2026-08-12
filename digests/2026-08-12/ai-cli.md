# AI CLI 工具社区动态日报 2026-08-12

> 生成时间: 2026-08-12 02:03 UTC | 覆盖工具: 9 个

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

以下是基于你提供的 8 个 AI CLI 工具社区日报，整理出的**横向对比分析报告**。  
> 说明：表格中的 **Issues / PR / Release** 统计，均按本次日报中**明确披露的近 24h 活跃条目数**汇总，便于横向比较。

---

# 1. 生态全景

过去 24 小时内，AI CLI 生态的主线已经从“能不能聊天”转向“**能否稳定地做长任务、跨平台工作、并与 agent/技能系统协作**”。  
当前最密集的社区反馈集中在 **会话恢复、模型路由、TUI/桌面端稳定性、更新与安装可靠性、以及企业网络/权限兼容性**。  
这说明 AI CLI 正在从“开发者玩具”加速演化为“**生产级开发工具平台**”，而稳定性、可观测性和可控性正在成为核心竞争力。  
从发布节奏看，多个项目仍处于**高频修补与快速迭代**阶段，但少数项目已开始呈现更强的工程化治理特征，例如安全依赖升级、CI 收敛和会话一致性修复。

---

# 2. 各工具活跃度对比

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况（近 24h） | 备注 |
|---|---:|---:|---|---|
| Claude Code | 10 | 5 | 1 个正式版（v2.1.228） | 以稳定性补丁为主，Windows/TUI/Hook 回归集中 |
| OpenAI Codex | 10 | 10 | 3 个 alpha 版本 | 迭代最密集之一，桌面端/长会话/工具状态问题突出 |
| Gemini CLI | 3 | 10 | 4 个版本（nightly/preview/stable） | 版本治理和安全依赖修复很活跃，问题面较聚焦 |
| GitHub Copilot CLI | 10 | 3 | 无新 Release | 重点在模型配置、skills/subagents、MCP 兼容 |
| Kimi Code CLI | 2 | 0 | 无新 Release | 活跃度最低，但诉求明确，集中在 Web 交互与 Windows 兼容 |
| OpenCode | 10 | 10 | 无新 Release | 高强度打磨期，V2 平台化、权限/会话/兼容性并进 |
| Pi | 10 | 10 | 无新 Release | TUI/终端体验和多供应商兼容是核心主线 |
| Qwen Code | 10 | 10 | 3 个版本（preview/nightly/stable） | 自动化、serve、Web Shell、安全与多工作区并行推进 |
| DeepSeek TUI | 4 | 5 | 无新 Release | 规模较小但聚焦，核心是 TUI 稳定性与协议简化 |

---

# 3. 共同关注的功能方向

下面这些需求，已经在多个工具社区里形成了明显共识：

## 3.1 会话恢复、状态一致性、长任务可续接
**涉及工具：** Gemini CLI、OpenAI Codex、Qwen Code、OpenCode、Pi、DeepSeek TUI、Claude Code  
**共同诉求：**
- `/resume`、session load、snapshot、continuation 的语义要可靠
- 不能出现“显示成功但状态丢失/写错存储/恢复错上下文”
- 长会话下要避免假成功、沉默失败、子进程未回收

**典型例子：**
- Gemini：`session/load`、`--resume`、会话文件误删
- Codex：`functions.wait` 提前完成、Windows 长会话内存增长
- Qwen：session navigation 安全、serve resume、wrong runtime storage
- OpenCode：snapshot 与 crash recovery、location switch、session isolation
- Pi：`/resume` 计数不一致、流式挂起
- DeepSeek TUI：snapshot 读取与 crash recovery 解耦
- Claude：hook 回归、会话重绘卡死

---

## 3.2 Windows / macOS / 终端兼容性
**涉及工具：** Claude Code、Codex、Kimi Code、OpenCode、Pi、DeepSeek TUI、Qwen Code  
**共同诉求：**
- Windows 下 Git、PowerShell、WSL、沙箱、路径识别要稳
- macOS 下自动更新、权限、桌面端、WebView/浏览器预览不能出问题
- TUI 在不同终端（iTerm、tmux、Kitty、VTE、CMD）下表现一致

**典型例子：**
- Claude：Windows Git/Git Bash 识别异常、桌面端崩溃
- Codex：Windows Desktop 内存飙升、WSL 线程/句柄泄漏
- Kimi：PowerShell 默认 D 盘启动导致路径错误
- Pi：CMD 问题、终端鼠标/链接/TUI 兼容
- DeepSeek TUI：宽屏布局回归
- Qwen：mac iTerm 闪屏、Windows 文件链接导出
- OpenCode：desktop、Open With、workspace 隔离

---

## 3.3 agent / subagent / skills / hooks 的协作链路
**涉及工具：** Claude Code、GitHub Copilot CLI、OpenCode、Pi、DeepSeek TUI、Qwen Code  
**共同诉求：**
- 显式调用优先于模型推断
- 子代理、技能、hooks、后台任务之间不要串消息
- 协作链路要可解释、可追踪、可回放

**典型例子：**
- Claude：subagent 面板抢焦点、消息投递失败、hook 回归
- Copilot：skills / subagents 路由与模型 registry 冲突
- OpenCode：background shell completions 不应回传父模型流
- Pi：tool metadata、extension loader、agent discovery
- DeepSeek TUI：32-field schema 太复杂导致模型报错
- Qwen：autofix、review bot、ACP、serve 侧自动化链路

---

## 3.4 模型路由、可达性、供应商兼容
**涉及工具：** Gemini CLI、Copilot CLI、Pi、Qwen Code、Codex、OpenCode  
**共同诉求：**
- 模型选择要可预测、可回退
- provider 兼容性不能靠“碰运气”
- 企业网络、OAuth、代理、CA、MCP 要稳定支持

**典型例子：**
- Gemini：`MODEL_CAPACITY_EXHAUSTED` 误报、quota 映射
- Copilot：模型配置失效、auto mode 选到不可用模型
- Pi：OpenRouter / OpenAI-compatible / Anthropic 兼容问题
- Qwen：reasoning effort、provider 更新、multi-workspace runtime
- Codex：代理、认证、cloud config、sandbox 网络
- OpenCode：第三方客户端、v2 API 缺口
- Claude：模型选择与可达性问题也在持续出现

---

## 3.5 更新、安装、CI、自动化可靠性
**涉及工具：** Claude Code、Gemini CLI、Copilot CLI、Qwen Code、OpenCode、Pi  
**共同诉求：**
- 自动更新不能“显示成功但实际不可用”
- CI / nightly / release pipeline 要可复现
- 自动化审查、自动修复、依赖升级要更可靠

**典型例子：**
- Claude：macOS 自动更新 stub binary 问题
- Gemini：critical CVE 依赖升级、nightly release 修复
- Copilot：pull_request_target 迁移、回滚修复
- Qwen：autofix verification gates、review event 风暴
- OpenCode：迁移脚本、补丁语义、release 行为
- Pi：package gallery 可见性、扩展加载速度

---

# 4. 差异化定位分析

## Claude Code
- **功能侧重：** agent 协作、hooks、TUI、桌面端
- **目标用户：** 深度使用 Claude 的开发者、团队协作场景、重度自动化用户
- **技术路线：** 强调 agent workflow、规则/钩子、跨平台桌面可用性
- **特点：** 功能面广，但回归压力也最大，当前明显处于“高频修补期”

## OpenAI Codex
- **功能侧重：** 桌面端、远程控制、工具执行生命周期、网络/认证兼容
- **目标用户：** 桌面工作流用户、企业网络环境用户、长会话/远程控制用户
- **技术路线：** 强调运行时与会话状态正确性，Rust alpha 持续迭代
- **特点：** 高速迭代、底层问题密集，偏“运行时工程化”

## Gemini CLI
- **功能侧重：** 会话恢复、配额/容量识别、发布稳定性、安全依赖治理
- **目标用户：** 需要稳定 CLI 体验和可靠 release 的开发者
- **技术路线：** 更强调 reliability-first、release governance、依赖安全
- **特点：** 问题面相对集中，但发布治理感更强，工程成熟度较高

## GitHub Copilot CLI
- **功能侧重：** 模型配置、skills/subagents、MCP 集成、权限控制
- **目标用户：** GitHub / GitLab / 企业集成工作流用户
- **技术路线：** 以配置驱动和集成为中心，强调权限与语义一致性
- **特点：** 更像“GitHub 生态里的 AI 编排层”

## Kimi Code CLI
- **功能侧重：** Web 交互粒度、Windows/PowerShell 兼容
- **目标用户：** 轻量级 CLI/网页联动用户，偏开发者日常使用
- **技术路线：** 当前更偏用户体验与环境兼容补齐
- **特点：** 社区量少，但需求非常具体，仍在打基础

## OpenCode
- **功能侧重：** V2 平台、server/runtime、权限、session、第三方 API
- **目标用户：** 想要可扩展平台、服务端协作、self-host/多工作区用户
- **技术路线：** 平台化、运行时化、服务端化明显
- **特点：** 很像在从“产品”向“AI 开发平台”过渡

## Pi
- **功能侧重：** TUI/终端体验、流式协议、供应商兼容、扩展生态
- **目标用户：** 终端重度用户、跨 provider 用户、工具链开发者
- **技术路线：** 强调协议健壮性、UI 体验、扩展性
- **特点：** 终端体验打磨非常深，是“terminal-native”路线代表

## Qwen Code
- **功能侧重：** 自动化、serve/daemon、Web Shell、安全、ACP、multimodal
- **目标用户：** 企业开发者、自动化/CI 场景用户、多工作区用户
- **技术路线：** 平台化 + 自动化 + 观测性 + 安全治理
- **特点：** 迭代广度很大，既补功能也补基础设施

## DeepSeek TUI
- **功能侧重：** TUI 可用性、协议简化、运行时隔离、恢复链路
- **目标用户：** 终端用户、偏轻量和稳定性优先的开发者
- **技术路线：** 保持 TUI 简洁，同时增强多代理/后台任务隔离
- **特点：** 体量较小，但技术方向很清晰，偏“精修型”

---

# 5. 社区热度与成熟度

## 社区更活跃、迭代更快的工具
按近 24h 披露的 issue/PR/release 体量看，最活跃的是：

- **OpenAI Codex**：10 Issue / 10 PR / 3 release
- **Qwen Code**：10 Issue / 10 PR / 3 release
- **OpenCode**：10 Issue / 10 PR / 无 release
- **Pi**：10 Issue / 10 PR / 无 release

这几家都表现出明显的**高频修补 + 高速演进**特征，说明社区活跃、问题暴露也更充分。

## 问题暴露多、但修补节奏稳定的工具
- **Claude Code**：Issue 面广，PR 和 release 也有，但更多呈现“高压修补”
- **GitHub Copilot CLI**：问题集中在核心配置/模型/skills，PR 较少，说明仍在收敛关键机制
- **Gemini CLI**：Issue 少但 release 多，且有安全升级与 CI 收敛，体现出更强的 release governance

## 体量较小、方向更聚焦的工具
- **Kimi Code CLI**：活跃度最弱，但需求很明确，主要集中在交互和 Windows 兼容
- **DeepSeek TUI**：社区规模不大，但围绕 TUI、协议、恢复链路做精细化打磨

---

# 6. 值得关注的趋势信号

## 6.1 AI CLI 正在平台化，不再只是“命令行聊天壳”
**信号：** skills、subagents、hooks、ACP、serve、daemon、workspace、runtime、review bot 都在出现  
**参考工具：** Claude Code、Copilot CLI、OpenCode、Qwen Code、DeepSeek TUI  
**价值：** 说明未来竞争焦点不是“谁回答更像人”，而是“谁能更稳定地编排任务、权限和上下文”

## 6.2 “会话可恢复”正在成为基础能力，而不是高级特性
**信号：** `/resume`、session load、snapshot、continuation、state isolation 频繁出现  
**参考工具：** Gemini CLI、Codex、Qwen Code、OpenCode、Pi、DeepSeek TUI  
**价值：** 长任务、后台自动化、多工作区成为常态后，状态一致性会直接决定产品可用性

## 6.3 跨平台兼容性仍是决定口碑的关键
**信号：** Windows/macOS/终端兼容问题在多个仓库反复出现  
**参考工具：** Claude Code、Codex、Kimi Code、Pi、Qwen Code、DeepSeek TUI  
**价值：** 真正的分水岭不是“Linux 上能跑”，而是能否在企业真实环境里稳定跑

## 6.4 安全、CI、依赖治理已经进入产品主线
**信号：** CVE 升级、自动化审查、release pipeline、stub binary、pull_request_target、autofix  
**参考工具：** Gemini CLI、Copilot CLI、Qwen Code、Claude Code  
**价值：** AI CLI 正进入企业采纳阶段，供应链安全与发布可靠性会越来越重要

## 6.5 模型路由和 provider 兼容正在从“可选项”变成“刚需”
**信号：** OpenRouter、OpenAI-compatible、Anthropic、GitLab MCP、quota mapping、capacity error  
**参考工具：** Gemini CLI、Copilot CLI、Pi、Qwen Code、Codex  
**价值：** 未来 CLI 工具的壁垒不只是接入一个模型，而是能否稳定支持多供应商、多账号、多网络环境

## 6.6 可观测性与“失败可见性”正在变成核心体验
**信号：** silent failure、false success、hang forever、stream stall、tool metadata missing  
**参考工具：** Codex、Pi、Qwen Code、OpenCode、DeepSeek TUI  
**价值：** 用户越来越不能接受“看起来成功，实际失败”，这会直接影响自动化链路可靠性

---

如果你愿意，我可以进一步把这份报告压缩成：
1. **管理层 1 页摘要版**，或  
2. **按“机会 / 风险 / 建议动作”三栏输出的决策版**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下是基于你提供的 **anthropics/skills**（Claude Code 官方 Skills 仓库）样本数据整理的 **Claude Code Skills 社区热点报告**。  
说明：你给出的 PR 样本里评论数未显式展示，因此“热门”这里主要按 **问题重复度、讨论指向性、更新活跃度、对核心脚本/基础能力的影响面** 来综合判断。

---

## 1) 热门 Skills 排行（PR）

### 1. [#1298] fix(skill-creator): run_eval.py always reports 0% recall
- 链接：<https://github.com/anthropics/skills/pull/1298>
- 功能：修复 `skill-creator` 的评测链路，让 `run_eval.py / run_loop.py / improve_description.py` 能真实评估 Skill 描述质量。
- 社区热点：这是 **技能优化工具链的核心可信度问题**，涉及 recall 恒为 0%、Windows 读流、触发检测、并行 worker 等多个基础缺陷。
- 当前状态：**open**

### 2. [#1323] fix(skill-creator): run_eval trigger detection misses real skill name
- 链接：<https://github.com/anthropics/skills/pull/1323>
- 功能：修复评测时对“Skill 是否真正触发”的识别逻辑。
- 社区热点：与 #556 / #1298 同类，反映出大家最关心的是 **skill-creator 的自动评估是否可靠**；如果评估失真，后续优化都失去意义。
- 当前状态：**open**

### 3. [#1099] skill-creator: fix run_eval.py crash on Windows when reading from subprocess pipe
- 链接：<https://github.com/anthropics/skills/pull/1099>
- 功能：修复 Windows 下 `run_eval.py` 子进程管道读取崩溃。
- 社区热点：说明 **Windows 兼容性** 是社区持续痛点，且直接影响 Skill 自动评测与迭代。
- 当前状态：**open**

### 4. [#1050] skill-creator: fix Windows subprocess + encoding bugs
- 链接：<https://github.com/anthropics/skills/pull/1050>
- 功能：修复 Windows 下 `claude.cmd` 调用、编码等子进程兼容问题。
- 社区热点：与 #1099 形成明显聚类，说明 **跨平台可用性** 是社区对官方 Skills 工具链的高频诉求。
- 当前状态：**open**

### 5. [#538] fix(pdf): correct case-sensitive file references in SKILL.md
- 链接：<https://github.com/anthropics/skills/pull/538>
- 功能：修复 `pdf` skill 中文档引用大小写错误，避免在大小写敏感文件系统上失效。
- 社区热点：属于 **技能包可移植性/可执行性** 问题，反映社区对“能否稳定落地”的高度敏感。
- 当前状态：**open**

### 6. [#539] fix(skill-creator): warn on unquoted description with YAML special characters
- 链接：<https://github.com/anthropics/skills/pull/539>
- 功能：为 Skill frontmatter 增加 YAML 描述字段的预校验，防止解析失败。
- 社区热点：说明大家不仅关注新 Skill，更关注 **Skill 定义格式是否健壮**，尤其是创作/发布链路的易错点。
- 当前状态：**open**

### 7. [#1479] Add plan-file-hygiene skill
- 链接：<https://github.com/anthropics/skills/pull/1479>
- 功能：治理计划文件生命周期，减少 planning artifacts 堆积。
- 社区热点：体现出社区对 **Agent 工作区卫生、任务过程文件管理** 的需求在上升。
- 当前状态：**open**

### 8. [#723] feat: add testing-patterns skill
- 链接：<https://github.com/anthropics/skills/pull/723>
- 功能：覆盖单测、组件测试、测试哲学等完整测试栈。
- 社区热点：这是典型的 **代码质量/测试生成** 方向，属于最容易被社区持续需求的通用型 Skill。
- 当前状态：**open**

---

## 2) 社区需求趋势

从 Issues 看，社区最期待的新 Skill 方向主要集中在以下几类：

### A. 安全与权限边界
- [#492 Security: Community skills distributed under anthropic/ namespace enable trust boundary abuse](https://github.com/anthropics/skills/issues/492)
- 诉求：避免社区 Skill 冒充官方 Skill，解决命名空间与信任边界问题。
- 趋势判断：社区已经开始把 Skills 当成“可授予权限的能力模块”来看待，而不是普通脚本。

### B. 团队/组织级共享与分发
- [#228 Enable org-wide skill sharing in Claude.ai](https://github.com/anthropics/skills/issues/228)
- 诉求：组织内直接共享 Skill，减少下载、转发、手动安装成本。
- 趋势判断：Skills 正在从“个人使用”走向“团队资产”。

### C. 评测、质量门禁与自我审查
- [#556 run_eval.py: claude -p never triggers skills/commands (0% trigger rate across all queries)](https://github.com/anthropics/skills/issues/556)
- [#1169 skill-creator description-optimisation loop: recall=0% on every iteration](https://github.com/anthropics/skills/issues/1169)
- [#1385 Reasoning Quality Gate Pipeline](https://github.com/anthropics/skills/issues/1385)
- 诉求：让 Skill 不只是“写出来”，还要能 **自动验证、自动评估、自动审计**。
- 趋势判断：社区对 “Skill 的可信评测体系” 需求非常强。

### D. 文档与办公自动化
- [#12 Add guidance to avoid whitespace reformatting in docx/ooxml skill](https://github.com/anthropics/skills/issues/12)
- [#189 document-skills and example-skills plugins install identical content](https://github.com/anthropics/skills/issues/189)
- [#1175 SPO documents via Agent Skills](https://github.com/anthropics/skills/issues/1175)
- 诉求：Word/OOXML/SharePoint/企业文档处理要更稳、更安全。
- 趋势判断：**文档处理仍是 Skills 最核心的落地点之一**。

### E. 新格式/新工作流支持
- [#1329 compact-memory](https://github.com/anthropics/skills/issues/1329)
- [#16 Expose Skills as MCPs](https://github.com/anthropics/skills/issues/16)
- [#29 Usage with bedrock](https://github.com/anthropics/skills/issues/29)
- 诉求：把 Skills 扩展到更广的 Agent 架构、记忆系统和运行环境。
- 趋势判断：社区在推动 Skills 从“内容模板”升级成“Agent 工作流接口层”。

### F. 代码审查 / 测试 / 工程化
- [#202 skill-creator should be updated to best practice](https://github.com/anthropics/skills/issues/202)
- [#412 agent-governance — safety patterns for AI agent systems](https://github.com/anthropics/skills/issues/412)
- [#189 duplicate skills](https://github.com/anthropics/skills/issues/189)
- 诉求：更工程化、更可控、更可复用的开发类 Skills。
- 趋势判断：社区不只要“会做”，还要“做得标准、可维护、可审计”。

---

## 3) 高潜力待合并 Skills

以下 PR 从题目和内容看，较像近期可能落地的高价值项：

### 1. [#1298] skill-creator 评测修复
- 链接：<https://github.com/anthropics/skills/pull/1298>
- 理由：这是基础设施级修复，直接影响整个 Skill 迭代工具链可信度，优先级很高。

### 2. [#1323] trigger detection 修复
- 链接：<https://github.com/anthropics/skills/pull/1323>
- 理由：和 #556 强相关，属于“官方评测系统失真”的直接修复，落地概率高。

### 3. [#1099] Windows pipe crash 修复
- 链接：<https://github.com/anthropics/skills/pull/1099>
- 理由：明显的跨平台 bug fix，通常更容易被接受。

### 4. [#1050] Windows subprocess / encoding 修复
- 链接：<https://github.com/anthropics/skills/pull/1050>
- 理由：与 #1099 同属 Windows 兼容性补丁，工程收益直接。

### 5. [#538] pdf skill 文件引用修复
- 链接：<https://github.com/anthropics/skills/pull/538>
- 理由：属于低风险、高确定性的文档修复，较容易合并。

### 6. [#539] skill-creator YAML 解析预警
- 链接：<https://github.com/anthropics/skills/pull/539>
- 理由：提升作者体验，避免隐性错误，属于典型的“防呆型”改进。

### 7. [#1479] plan-file-hygiene
- 链接：<https://github.com/anthropics/skills/pull/1479>
- 理由：是很明确的工作流治理需求，且问题场景容易复现。

### 8. [#723] testing-patterns
- 链接：<https://github.com/anthropics/skills/pull/723>
- 理由：测试类 Skill 通用性强，且与开发者需求高度匹配，长期价值高。

---

## 4) Skills 生态洞察

**一句话总结：当前社区最集中的诉求是——把 Skills 从“可用的模板集合”推进为“可靠、可评测、跨平台、可共享、可治理的 Agent 能力层”。**

如果你愿意，我还可以把这份报告进一步整理成：
1. **适合汇报的 PPT 风格摘要版**  
2. **按“产品/工程/安全”三条线拆分的深度分析版**  
3. **带表格的 Markdown 版本，方便直接发到 Notion / 飞书**

---

# Claude Code 社区动态日报  
**日期：2026-08-12**  
数据来源：`github.com/anthropics/claude-code`

## 1) 今日速览
今天最值得关注的是 **v2.1.228** 已发布，重点修复了交互会话重绘卡死、Windows 下 Git/Git Bash 识别异常等稳定性问题，说明本轮更新偏向“止血型”补丁。与此同时，社区 Issues 继续集中爆发在 **Agents / Hooks / Windows 桌面端 / TUI / 自动更新** 等核心场景，且不乏数据丢失、回归和跨平台故障类问题。  
GitHub：<https://github.com/anthropics/claude-code>

---

## 2) 版本发布
### v2.1.228
- 修复了少数情况下交互会话“停止重绘但进程仍在运行”的问题，直接影响 TUI 可用性。
- 修复了 Claude Code 从 Git 安装目录的父目录启动时，Windows 上找不到 `git` / Git Bash 的问题。
- 修复了 `/tui` 回退流程中的异常问题。  
GitHub：<https://github.com/anthropics/claude-code/releases/tag/v2.1.228>

---

## 3) 社区热点 Issues
> 本次更新的 50 个 Issue 中，评论数普遍只有 0-1 条，说明很多问题刚冒头，但场景都比较“硬核”和高影响，值得优先跟踪。

1. **#85948 - 写入 Xcode 未保存文件导致缓冲区被覆盖并崩溃，出现数据丢失**  
   - 重要性：这是最严重的一类问题，已经触及用户工作成果安全，属于高优先级数据损坏风险。  
   - 社区反应：已明确标注 `data-loss`，且是“已复现”问题。  
   GitHub：<https://github.com/anthropics/claude-code/issues/85948>

2. **#85951 - v2.1.228 起 SessionStart hook 的 `initialUserMessage` 静默失效**  
   - 重要性：这是典型回归，且与新版本直接相关，容易影响自动化工作流和团队脚本。  
   - 社区反应：评论虽少，但复现清晰，且与上一版本对比明确。  
   GitHub：<https://github.com/anthropics/claude-code/issues/85951>

3. **#85967 - Windows 桌面端打开内置 Browser preview 时 GPU 进程崩溃，整个窗口关闭**  
   - 重要性：影响桌面端主流程，且是浏览器预览能力的核心稳定性问题。  
   - 社区反应：已标注 `has repro`，说明问题足够稳定、可定位。  
   GitHub：<https://github.com/anthropics/claude-code/issues/85967>

4. **#85953 - Windows Desktop：GPU/Chromium 崩溃后 CoworkVMService 残留，阻塞 AppX 修复**  
   - 重要性：不仅崩溃，还会遗留系统级服务进程，影响修复和后续安装。  
   - 社区反应：已是 `duplicate`，说明同类故障并非个案。  
   GitHub：<https://github.com/anthropics/claude-code/issues/85953>

5. **#85974 - macOS 自动更新报告成功，但 postinstall 失败后留下不可用 stub binary**  
   - 重要性：安装/升级链路故障会直接导致“升级成功但不可用”，非常影响信任。  
   - 社区反应：同类问题还有 **#85975**，已出现重复报障。  
   GitHub：<https://github.com/anthropics/claude-code/issues/85974>

6. **#85975 - 同类自动更新 stub binary 问题（duplicate）**  
   - 重要性：与 #85974 同类，说明自动更新/安装脚本可能存在系统性问题。  
   - 社区反应：`duplicate` 标签表明已有其他用户遇到相同故障。  
   GitHub：<https://github.com/anthropics/claude-code/issues/85975>

7. **#85957 - 子代理面板抢占主输入焦点，影响正常输入**  
   - 重要性：TUI/多代理交互中的基础体验问题，容易打断用户工作流。  
   - 社区反应：问题描述具体，属于典型可复现的交互 bug。  
   GitHub：<https://github.com/anthropics/claude-code/issues/85957>

8. **#85963 - Teammates 忽略 inbox，直到任务结束才处理消息**  
   - 重要性：直接影响 agent 协作模式，可能导致长时间消息滞后甚至误解任务状态。  
   - 社区反应：当前评论少，但场景对“团队代理”功能很关键。  
   GitHub：<https://github.com/anthropics/claude-code/issues/85963>

9. **#85949 - forked-skill 的 subagents 无法回复父代理，甚至出现“伪成功”消息投递**  
   - 重要性：这是协作型 Agent 的通信链路 bug，严重时会造成死锁。  
   - 社区反应：已指出 `success: true` 但消息丢失，问题性质较重。  
   GitHub：<https://github.com/anthropics/claude-code/issues/85949>

10. **#85928 - marketplace clone 的 fetch refspec 被锁死，tag 切 branch 后更新失效但仍显示成功**  
    - 重要性：插件/Marketplace 更新链路被破坏，会让用户长期停留在旧版本。  
    - 社区反应：标注 `has repro`，并且问题描述非常明确。  
    GitHub：<https://github.com/anthropics/claude-code/issues/85928>

---

## 4) 重要 PR 进展
> 本次公开更新中仅有 5 个 PR，以下全部纳入。

1. **#85925 - docs: point remaining stale doc links at code.claude.com**  
   - 说明：继续清理旧文档域名链接，统一指向 `code.claude.com`。  
   - 意义：降低文档跳转混乱，减少“链接可用但非规范入口”的维护成本。  
   GitHub：<https://github.com/anthropics/claude-code/pull/85925>

2. **#85822 - docs: fix stale doc links and README drift in plugins and examples**  
   - 说明：修复插件、示例中的 stale links 和 README 内容漂移。  
   - 意义：提升插件文档一致性，减少开发者按旧文档集成时踩坑。  
   GitHub：<https://github.com/anthropics/claude-code/pull/85822>

3. **#85806 - fix(security-guidance): skip XSS warnings in docs**  
   - 说明：在文档中出现 XSS 相关术语时抑制误报。  
   - 意义：降低安全扫描噪音，让文档与代码文件的规则更合理地区分。  
   GitHub：<https://github.com/anthropics/claude-code/pull/85806>

4. **#85716 - fix(hookify): load rules from ancestor .claude directories to prevent silent bypass**  
   - 说明：让 hookify 从父级 `.claude` 目录加载规则，避免静默绕过。  
   - 意义：这是偏安全治理的关键修复，直接关系到规则继承与执行一致性。  
   GitHub：<https://github.com/anthropics/claude-code/pull/85716>

5. **#85834 - fix: HackerOne Bug Bounty Program access issue**  
   - 说明：调整 `devcontainer.json` 和插件安装方式，修复安全赏金项目访问问题。  
   - 意义：提升内部/外部安全协作入口可用性，利于漏洞反馈闭环。  
   GitHub：<https://github.com/anthropics/claude-code/pull/85834>

---

## 5) 功能需求趋势
从近 24 小时 Issues 看，社区最关注的功能方向主要有：

1. **Agents / Teams 协作能力**  
   - 典型诉求：子代理通信、消息回收、任务感知、输入焦点管理。  
   - 代表 Issue：#85949、#85955、#85957、#85963  
   GitHub：<https://github.com/anthropics/claude-code/issues/85949>

2. **Windows / 桌面端稳定性与兼容性**  
   - 典型诉求：GPU 崩溃、输出文件打开、Git 识别、浏览器预览稳定性、Terminal 显示。  
   - 代表 Issue：#85967、#85966、#85969、#85960  
   GitHub：<https://github.com/anthropics/claude-code/issues/85967>

3. **TUI 可用性与无障碍体验**  
   - 典型诉求：重绘不卡死、减少动效下的计时器正常刷新、链接交互不重复触发。  
   - 代表 Issue：#85972、#85956、#85957  
   GitHub：<https://github.com/anthropics/claude-code/issues/85972>

4. **模型选择与模型可达性**  
   - 典型诉求：会话级模型切换、特定模型不可用、按计划/账号能力暴露更细粒度限制。  
   - 代表 Issue：#85968、#85971、#85964  
   GitHub：<https://github.com/anthropics/claude-code/issues/85968>

5. **自动更新、安装与 Marketplace 更新可靠性**  
   - 典型诉求：升级后可执行文件有效、ref 更新后 clone 可跟随、文档清楚说明更新机制。  
   - 代表 Issue：#85974、#85975、#85928、#85962  
   GitHub：<https://github.com/anthropics/claude-code/issues/85974>

---

## 6) 开发者关注点
综合今天的社区反馈，开发者最需要关注的痛点有：

- **回归风险偏高**：v2.1.228 刚发布，就出现了 hook、TUI、更新链路等多处回归迹象。  
  GitHub：<https://github.com/anthropics/claude-code/issues/85951>

- **跨平台一致性不足**：Windows、macOS、Linux 三端都在报不同类别的问题，尤其是 Windows 桌面端和终端兼容。  
  GitHub：<https://github.com/anthropics/claude-code/issues/85967>

- **Agent 协作链路不稳定**：消息投递、回复路径、焦点切换、后台状态判断都暴露出问题。  
  GitHub：<https://github.com/anthropics/claude-code/issues/85949>

- **更新/安装体验需要更强的失败可见性**：自动更新“显示成功但不可用”会严重损害信任。  
  GitHub：<https://github.com/anthropics/claude-code/issues/85974>

- **安全与策略误判仍会干扰正常开发**：包括 API 误拦截、权限提示缺失、文档安全规则误报等。  
  GitHub：<https://github.com/anthropics/claude-code/issues/85961>

---

如果你希望，我也可以把这份日报进一步整理成：
1. **适合内部周报的更短版**，或  
2. **面向产品/工程管理层的“风险优先级版”**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# 2026-08-12 OpenAI Codex 社区动态日报

## 1) 今日速览
过去 24 小时，Codex 继续保持高频迭代：Rust 线连续发布了 3 个 alpha 版本，说明底层能力仍在快速推进。  
社区讨论则明显聚焦在 **Windows/macOS 桌面端稳定性、远程控制、认证/代理兼容性、以及工具调用生命周期正确性** 上，多个问题都带有明显的性能退化或长时会话风险。  

---

## 2) 版本发布
近 24 小时共发布 3 个 Rust alpha 版本，节奏非常密集，表明核心 CLI/运行时仍在持续小步快跑式修复与迭代。

- [rust-v0.148.0-alpha.9](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.9) — 0.148.0-alpha.9  
- [rust-v0.148.0-alpha.8](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.8) — 0.148.0-alpha.8  
- [rust-v0.148.0-alpha.7](https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.7) — 0.148.0-alpha.7  

---

## 3) 社区热点 Issues

1. [#38059 Windows Desktop 空闲时内存飙升至 8.8GB 并在 1-2 条消息后卡死](https://github.com/openai/codex/issues/38059)  
   - 重要性：典型高优先级性能回归，直接影响可用性。  
   - 社区反应：已出现 3 条评论，说明复现与影响面都比较明确。

2. [#38093 Code Mode 中 `functions.wait` 可能提前报告完成，但子进程仍在运行](https://github.com/openai/codex/issues/38093)  
   - 重要性：影响工具调用的状态一致性，可能导致错误的自动化决策。  
   - 社区反应：已有 2 条评论，属于偏技术型、需要深入排查的执行状态问题。

3. [#38048 Windows 自动化 SSH 研究流程长时运行后出现持续内存增长，10+ 小时后系统不可用](https://github.com/openai/codex/issues/38048)  
   - 重要性：长会话场景的资源泄露问题，直接命中生产级使用。  
   - 社区反应：已有 2 条评论，关注点集中在长期稳定性和资源管理。

4. [#38022 希望支持关闭自动更新/固定版本，尤其是低于新最低 macOS 版本的机器](https://github.com/openai/codex/issues/38022)  
   - 重要性：这是更新策略与兼容性策略的冲突，涉及老设备可持续使用。  
   - 社区反应：2 条评论，说明升级策略已成为明确痛点。

5. [#38100 Codex Desktop 反复提示 GitHub 认证过期，但 `gh` 明明已登录](https://github.com/openai/codex/issues/38100)  
   - 重要性：认证状态不一致会直接阻断日常工作流。  
   - 社区反应：1 条评论，属于“单点但高影响”的身份验证问题。

6. [#38096 macOS Desktop 在空配置、零会话时仍长时间 beach-ball，界面无法加载](https://github.com/openai/codex/issues/38096)  
   - 重要性：启动即冻结，属于最影响第一印象的桌面端故障。  
   - 社区反应：1 条评论，但问题描述非常具体，利于复现。

7. [#38095 Mac 上无法启用 Remote Control](https://github.com/openai/codex/issues/38095)  
   - 重要性：远程控制是 Codex 跨设备工作流的关键能力。  
   - 社区反应：1 条评论，属于功能阻塞型问题。

8. [#38076 macOS 上活动 rollout JSONL 被反复删除，存在数据丢失风险](https://github.com/openai/codex/issues/38076)  
   - 重要性：数据丢失是最高等级风险之一，直接影响用户信任。  
   - 社区反应：1 条评论，但问题本身严重度极高。

9. [#38088 系统代理（VeePN/privoxy）开启时 Webview 无法启动，30 秒超时导致 “Codex could not start”](https://github.com/openai/codex/issues/38088)  
   - 重要性：代理兼容性问题会影响企业网络环境和开发者本地网络。  
   - 社区反应：1 条评论，属于典型“环境依赖型”故障。

10. [#38079 Windows 版 Codex Desktop 泄露 `wslservice` 线程/句柄，并残留 `node_repl` 进程](https://github.com/openai/codex/issues/38079)  
    - 重要性：句柄与进程泄露会逐步拖垮整机性能。  
    - 社区反应：1 条评论，且与 #38059/#38048 形成明显的性能问题聚类。

---

## 4) 重要 PR 进展

1. [#38092 Simplify queued user message admission](https://github.com/openai/codex/pull/38092)  
   - 简化用户消息接纳逻辑，减少对 rollout 持久化和 hook 状态的依赖，降低 turn 入队复杂度。

2. [#38087 Route gRPC code-mode sessions through the shared HTTP client](https://github.com/openai/codex/pull/38087)  
   - 让 code-mode 的 gRPC 会话复用统一 HTTP 客户端，增强代理和自定义 CA 兼容性。

3. [#38080 Allow nested Git repositories in the Windows sandbox](https://github.com/openai/codex/pull/38080)  
   - 修复 Windows sandbox 对嵌套 Git 仓库的访问问题，提升复杂仓库结构可用性。

4. [#38064 Grant Windows sandbox access to the Codex app root](https://github.com/openai/codex/pull/38064)  
   - 扩展 Windows sandbox 对 Codex 应用根目录的读取/执行 ACL，避免沙箱访问受限。

5. [#38061 Preserve proxy settings for Windows sandbox debug sessions](https://github.com/openai/codex/pull/38061)  
   - 修复 debug 会话中代理设置被重整的问题，提升网络环境兼容性。

6. [#38089 Add CIMD support to MCP OAuth registration](https://github.com/openai/codex/pull/38089)  
   - 为 MCP OAuth 注册加入 CIMD 支持，优化自动化注册流程与公共客户端兼容性。

7. [#38086 Support execution-host context when resolving cloud config](https://github.com/openai/codex/pull/38086)  
   - 云配置解析支持 execution-host 上下文，更好处理 `~` 路径与嵌套 home 目录覆盖。

8. [#38072 Forward gRPC code-mode callbacks to session delegates](https://github.com/openai/codex/pull/38072)  
   - 修复 gRPC code-mode 的回调转发，确保嵌套 tool call 和通知能正确回传。

9. [#38066 Track resource-backed skill invocations](https://github.com/openai/codex/pull/38066)  
   - 增强技能调用埋点，支持资源型 skill 的识别、记录和稳定 ID 生成。

10. [#38074 Track implicit executor skill invocations](https://github.com/openai/codex/pull/38074)  
    - 识别隐式执行器 skill 调用，覆盖文档读取与脚本执行等场景，补齐可观测性。

---

## 5) 功能需求趋势
从近期 Issues 看，社区需求主要集中在以下方向：

- **桌面端性能与稳定性**：Windows/macOS 上的内存增长、句柄泄露、UI 冻结、启动卡死，是最突出的主线。  
- **远程控制与跨设备工作流**：Remote Control、Android Remote、SSH research workflow 等场景需求明显。  
- **工具调用正确性与会话状态一致性**：`wait`、foreground handle、child process 生命周期、turn/start 超时等问题频繁出现。  
- **代理、认证与企业网络兼容性**：系统代理、GitHub auth、Cloud config、Sandbox 网络相关反馈集中。  
- **多工作区/多仓库配置能力**：`AGENTS.md`、multi-root workspace、subagent 可见性与控制等需求在增加。  
- **更新与版本控制**：自动更新、最低系统版本、版本固定等“可控升级”诉求正在增强。  

---

## 6) 开发者关注点
从社区反馈里可以看出，开发者当前最在意的痛点是：

- **长时运行不稳定**：内存/线程/句柄泄露会把单次问题放大成整机级故障。  
- **状态可信度不足**：工具“已完成”但子进程仍活着、认证“过期”但外部工具已登录，这类不一致很伤工作流。  
- **网络环境适配不够稳**：代理、CA、远程连接、SSH、移动端远控等场景容易触发兼容性问题。  
- **可控性需求强**：自动更新、版本固定、错误计费、权限/远程控制开关，都希望能有更明确的用户控制。  
- **跨平台体验仍有差异**：Windows、macOS、Linux 的问题类型都不一样，说明平台一致性仍是长期任务。  
- **更细粒度的工作区感知**：多 root、嵌套仓库、AGENTS.md、subagent 行为都在推动“按仓库/按线程”精细化配置。  

---

如果你希望，我还可以把这份日报进一步整理成：
1. **适合公众号发布的精简版**，或  
2. **适合内部研发周报的表格版**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-12）

## 1. 今日速览
今天的主线是 **nightly/preview 持续推进 + 稳定性修复**：最新 nightly 重点修复了误报的 `MODEL_CAPACITY_EXHAUSTED` 与核心 quota 映射问题，并新增本地 report 能力。  
与此同时，社区与维护侧都在集中处理 **会话恢复、ACP 交互、CI 夜间构建、以及两项 Critical 依赖漏洞升级**，说明当前版本迭代更偏向“可靠性优先”。

---

## 2. 版本发布

- **v0.56.0-nightly.20260812.g5024443c7**  
  重点更新：修复 `MODEL_CAPACITY_EXHAUSTED` 误报、修正 core quota lookup 的 model mapping，并新增 `evals` 本地 report 命令与开发文档。  
  链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260812.g5024443c7>

- **v0.56.0-preview.1**  
  主要是预览版发布整理，包含历史版本 changelog 与 nightly 版本回退/升级记录，属于发布链路梳理。  
  链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-preview.1>

- **v0.55.1**  
  稳定版补丁发布，围绕 release 验证、`npm ci` 忽略脚本、workspace binary shadowing 等发布可靠性问题做了修复。  
  链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.55.1>

- **v0.55.0-preview.3**  
  预览分支补丁版本，属于 cherry-pick 型修复发布。  
  链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.55.0-preview.3>

---

## 3. 社区热点 Issues
> 说明：过去 24 小时内实际更新的 Issue 只有 3 条，因此这里列出全部 3 条，并按影响度排序。

1. **#28772 Persistent `MODEL_CAPACITY_EXHAUSTED` (429) on `gemini-3.5-flash` with Gemini Code Assist Standard**  
   重要性：这是典型的“生产阻断”问题，直接影响交互可用性；虽然已关闭，但标题和描述显示问题曾持续超过 24 小时。  
   社区反应：`priority/p1`、`area/enterprise`、`manual-triage`，且有 1 条评论，说明这是高优先级但需要后端/配额链路确认的问题。  
   链接：<https://github.com/google-gemini/gemini-cli/issues/28772>

2. **#28775 ACP `session/load` erases the session it is asked to load (0.53.0)**  
   重要性：涉及 ACP 会话加载和状态保持，属于会话数据一致性/潜在数据丢失级别的问题。  
   社区反应：目前无评论、仍处于 `need-triage`，说明问题已被发现但尚未进入实质讨论。  
   链接：<https://github.com/google-gemini/gemini-cli/issues/28775>

3. **#28777 ticket IT support**  
   重要性：这条更像泛咨询/支持类诉求，而非明确产品需求；对 issue 管理来说，它反映了需求边界仍有一定模糊。  
   社区反应：`bot-triaged` + `need-information`，已有 2 条评论但尚缺少可执行的技术上下文。  
   链接：<https://github.com/google-gemini/gemini-cli/issues/28777>

---

## 4. 重要 PR 进展

1. **#28780 fix: upgrade shell-quote to 1.8.4 (CVE-2026-9277)**  
   关键点：修复 Critical 级别供应链漏洞，属于必须优先合入的安全补丁。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28780>

2. **#28778 fix: upgrade simple-git to 3.32.3 (CVE-2026-28292)**  
   关键点：另一项 Critical 漏洞升级，说明仓库近期的依赖安全治理很活跃。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28778>

3. **#28767 fix(cli): --resume opens a second session file, and cleanup deletes the real one**  
   关键点：高优先级 CLI 会话恢复 bug，涉及会话文件误创建/误删，直接影响用户工作流可靠性。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28767>

4. **#28768 fix: resolve failing CI nightly release and perf tests**  
   关键点：修复 nightly release 与性能测试失败，属于保障持续交付稳定性的基础工作。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28768>

5. **#28781 chore/release: bump version to 0.56.0-nightly.20260812.g5024443c7**  
   关键点：自动化 nightly 版本 bump，说明发布流水线在按计划推进。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28781>

6. **#28779 Changelog for v0.55.1**  
   关键点：稳定版发布前的 changelog 维护，体现 release 管理流程成熟。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28779>

7. **#28776 Changelog for v0.56.0-preview.1**  
   关键点：预览版 changelog 自动生成，帮助维持预览通道的可追踪性。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28776>

8. **#28774 Changelog for v0.55.0-preview.3**  
   关键点：预览补丁版本的变更说明，属于版本链路整理的一部分。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28774>

9. **#28771 fix(patch): cherry-pick ... create version 0.55.0-preview.3**  
   关键点：通过 cherry-pick 快速补丁修复预览分支，体现紧急修复能力。  
   链接：<https://github.com/google-gemini/gemini-cli/pull/28771>

10. **#28773 chore(deps): bump nanoid from 3.3.11 to 3.3.18**  
    关键点：依赖更新类 PR，虽已关闭，但属于常规安全与稳定性维护。  
    链接：<https://github.com/google-gemini/gemini-cli/pull/28773>

---

## 5. 功能需求趋势

1. **模型容量 / 配额识别可靠性**  
   社区最明确的痛点是“明明可用却误报容量耗尽”，说明用户更关心“能不能稳定用”，而不是单纯的新能力。  
   参考：<https://github.com/google-gemini/gemini-cli/issues/28772>、<https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260812.g5024443c7>

2. **会话状态与恢复能力（ACP / `--resume`）**  
   `session/load`、`--resume`、session file 管理等问题都指向同一个方向：用户希望代理会话能“可恢复、不中断、不丢状态”。  
   参考：<https://github.com/google-gemini/gemini-cli/issues/28775>、<https://github.com/google-gemini/gemini-cli/pull/28767>

3. **发布与依赖安全治理**  
   今日出现两项 Critical CVE 升级，说明社区与维护者对供应链风险非常敏感；“先修漏洞、再谈功能”是当前明显趋势。  
   参考：<https://github.com/google-gemini/gemini-cli/pull/28780>、<https://github.com/google-gemini/gemini-cli/pull/28778>

4. **新功能诉求不强，稳定性诉求更强**  
   在今天的 Issue 集合里，没有看到明显的 IDE 集成、多模型扩展等大功能诉求；更多是错误修复、边界问题和发布稳定性。  
   参考：<https://github.com/google-gemini/gemini-cli/issues/28777>

---

## 6. 开发者关注点

- **误报容量耗尽会直接阻塞使用**：这类问题优先级极高，尤其在企业/标准套餐场景下，用户会把它视为“服务不可用”。  
  参考：<https://github.com/google-gemini/gemini-cli/issues/28772>

- **会话恢复逻辑存在数据一致性风险**：`session/load` 和 `--resume` 都暴露出状态管理问题，若处理不当可能导致会话丢失或错删。  
  参考：<https://github.com/google-gemini/gemini-cli/issues/28775>、<https://github.com/google-gemini/gemini-cli/pull/28767>

- **CI / nightly 稳定性是持续交付的前提**：夜间构建失败、性能测试失败会直接拖慢发布节奏，因此修 CI 是高价值工作。  
  参考：<https://github.com/google-gemini/gemini-cli/pull/28768>

- **安全依赖升级是当前维护重点**：两项 Critical CVE 的修复表明仓库在主动收敛供应链风险。  
  参考：<https://github.com/google-gemini/gemini-cli/pull/28780>、<https://github.com/google-gemini/gemini-cli/pull/28778>

- **Issue 模板/需求边界仍需收紧**：像 `ticket IT support` 这类内容说明社区中仍存在“问题描述不够技术化”的输入。  
  参考：<https://github.com/google-gemini/gemini-cli/issues/28777>

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发群的极简版**，或  
2. **带“风险等级/影响面/建议动作”的运维版**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-08-12）

## 1) 今日速览
今天仓库没有新 Release，社区讨论几乎全部聚焦在 **模型配置/路由、skills 与 subagents、MCP 兼容性、权限与稳定性** 这几条主线上。  
其中最值得警惕的是：有多条反馈指向 **配置丢失、模型选择失效、会话崩溃或工具调用失败**，说明 1.0.79 相关问题仍在集中暴露。

---

## 2) 社区热点 Issues（精选 10 个）

1. **[#4431] Using /model config wipes all settings**  
   [链接](https://github.com/github/copilot-cli/issues/4431)  
   这是高优先级数据破坏问题：用户设置模型后会把 `settings.json` 其他配置清空。该 issue 已关闭、且有 3 条评论，说明问题已被确认并快速跟进。

2. **[#4434] User-level configured model is not used in new sessions**  
   [链接](https://github.com/github/copilot-cli/issues/4434)  
   影响面很广，属于“配置能写入但不生效”的典型状态一致性问题。虽然目前只有 1 条评论，但它和 #4431 共同指向配置体系不稳定。

3. **[#4445] Auto mode sometimes picks impossible model**  
   [链接](https://github.com/github/copilot-cli/issues/4445)  
   自动模式选到不可用模型并直接崩溃，且会导致工作中断/丢失，风险很高。当前暂无评论，通常意味着问题刚被提出来但影响严重。

4. **[#4451] Explicit slash skill is redundantly reloaded through model registry and fails with “Skill not found”**  
   [链接](https://github.com/github/copilot-cli/issues/4451)  
   这是技能调用链路的逻辑错误：用户显式调用的 skill 被二次走 model registry，最终失败。已有 2 个 👍，说明这个问题对技能/agent 生态场景共鸣较强。

5. **[#4438] disable-model-invocation: true makes a skill unreachable**  
   [链接](https://github.com/github/copilot-cli/issues/4438)  
   “只允许手动触发”却变成“根本不可触达”，属于语义偏差问题。虽然互动不多，但会直接破坏 project skill 的可用性。

6. **[#4432] rubber-duck: model-emitted `model` argument silently overrides complementary strategy**  
   [链接](https://github.com/github/copilot-cli/issues/4432)  
   这是 subagent 路由策略冲突：模型返回的 `model` 参数覆盖了用户的 `/subagents` 配置和 complementary 策略。对多模型协作场景影响明显。

7. **[#4439] Copilot CLI 1.0.79 rejects GitLab MCP OAuth metadata with an RFC 8414 issuer mismatch**  
   [链接](https://github.com/github/copilot-cli/issues/4439)  
   外部 MCP/OAuth 兼容性问题，直接阻断 GitLab Self-Managed 场景接入。当前 1 条评论，属于“集成可用性”问题。

8. **[#4427] Subagent started with unsupported model fails the whole session**  
   [链接](https://github.com/github/copilot-cli/issues/4427)  
   长会话里子 agent 模型变动后，整个 session 失败，说明模型能力检测和容错不足。对 autopilot/长任务用户尤为敏感。

9. **[#4442] Copilot CLI binary contains vulnerable version of adm-zip package**  
   [链接](https://github.com/github/copilot-cli/issues/4442)  
   这是供应链安全问题，会影响企业扫描与合规发布。虽然没有评论，但一旦被安全扫描命中，通常优先级会很高。

10. **[#4448] Search stuck and never finishes**  
    [链接](https://github.com/github/copilot-cli/issues/4448)  
    搜索/grep 工具卡死会拖垮交互效率，属于明显的性能与可靠性问题。当前暂无评论，但会直接影响日常使用体验。

---

## 3) 重要 PR 进展
> 说明：本次数据中 **仅有 3 条 PR 更新**，以下为全部列出。

1. **[#4452] Revert 5 copilot/fix with copilot**  
   [链接](https://github.com/github/copilot-cli/pull/4452)  
   已关闭。从标题看是一次回滚操作，通常意味着前序修复需要止损或撤销，值得关注其对应的稳定性背景。

2. **[#4449] Migrate pull request automation away from pull_request_target**  
   [链接](https://github.com/github/copilot-cli/pull/4449)  
   开放中。核心价值是提升仓库自动化的安全性：减少 `pull_request_target` 带来的高权限执行风险。

3. **[#4428] Add initial devcontainer configuration**  
   [链接](https://github.com/github/copilot-cli/pull/4428)  
   开放中。补齐 devcontainer 基础配置，主要面向开发环境标准化和新贡献者上手效率。

---

## 4) 功能需求趋势

1. **模型配置与自动路由更稳定**  
   代表 issues：[#4431](https://github.com/github/copilot-cli/issues/4431)、[#4434](https://github.com/github/copilot-cli/issues/4434)、[#4445](https://github.com/github/copilot-cli/issues/4445)  
   社区希望模型设置能“写入即生效、跨会话一致、自动模式可回退”。

2. **skills / subagents 的调用语义需要更一致**  
   代表 issues：[#4438](https://github.com/github/copilot-cli/issues/4438)、[#4432](https://github.com/github/copilot-cli/issues/4432)、[#4451](https://github.com/github/copilot-cli/issues/4451)  
   用户更关心“显式调用应优先于模型推断”，而不是被内部策略覆盖。

3. **MCP 与外部生态兼容性**  
   代表 issues：[#4439](https://github.com/github/copilot-cli/issues/4439)、[#4429](https://github.com/github/copilot-cli/issues/4429)、[#4436](https://github.com/github/copilot-cli/issues/4436)  
   说明 CLI 正在向更广泛的 MCP/企业环境扩展，但配置 schema 和 OAuth 兼容仍是痛点。

4. **权限控制需要更细粒度**  
   代表 issues：[#4443](https://github.com/github/copilot-cli/issues/4443)、[#4446](https://github.com/github/copilot-cli/issues/4446)、[#4433](https://github.com/github/copilot-cli/issues/4433)  
   社区希望区分只读/写入、交互式/非交互式，以及 cwd 内外的不同审批策略。

5. **可靠性与性能问题仍在被持续放大**  
   代表 issues：[#4448](https://github.com/github/copilot-cli/issues/4448)、[#4427](https://github.com/github/copilot-cli/issues/4427)、[#4440](https://github.com/github/copilot-cli/issues/4440)  
   包括搜索卡死、长会话失败、规则读取兼容性等，说明“稳定可用”仍是基础诉求。

---

## 5) 开发者关注点

- **配置系统不能破坏用户数据**：#4431、#4434 反映出设置持久化与会话继承问题非常敏感。  
  [#4431](https://github.com/github/copilot-cli/issues/4431) / [#4434](https://github.com/github/copilot-cli/issues/4434)

- **模型选择必须可预测且可回退**：#4445、#4427 都说明“选错模型”不是小问题，而是会导致任务失败。  
  [#4445](https://github.com/github/copilot-cli/issues/4445) / [#4427](https://github.com/github/copilot-cli/issues/4427)

- **技能/代理系统需要明确优先级**：用户显式意图不应被内部 registry 或 `model:` 字段覆盖。  
  [#4451](https://github.com/github/copilot-cli/issues/4451) / [#4432](https://github.com/github/copilot-cli/issues/4432) / [#4438](https://github.com/github/copilot-cli/issues/4438)

- **权限与审批体验要更细粒度**：特别是只读命令、非交互模式、跨目录操作的审批策略。  
  [#4443](https://github.com/github/copilot-cli/issues/4443) / [#4433](https://github.com/github/copilot-cli/issues/4433)

- **外部集成与企业合规需求在上升**：MCP、GitLab、自定义规则、供应链安全都在进入主讨论区。  
  [#4439](https://github.com/github/copilot-cli/issues/4439) / [#4429](https://github.com/github/copilot-cli/issues/4429) / [#4442](https://github.com/github/copilot-cli/issues/4442)

如果你希望，我也可以把这份日报再整理成 **“适合内部周报/PPT 的一页版”** 或 **“按 Bug/Feature/Security 分类的精简版”**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报  
**日期：2026-08-12**  
数据来源：`github.com/MoonshotAI/kimi-cli`

---

## 1. 今日速览
- 过去 24 小时内，**没有新 Releases 和 PR 更新**，社区活跃度主要集中在 **2 条新增/更新 Issue** 上，问题聚焦于 **Web 端交互体验** 与 **Windows / PowerShell 兼容性**。  
- 从反馈看，用户一方面希望 AI 回复支持更细粒度的“选中即回复”交互，另一方面也暴露出 CLI 在 Windows 启动路径处理上的稳定性问题。  
- 这些信号说明：社区当前最关注的，不只是功能扩展，也包括跨平台可用性和交互效率。  
  - 相关 Issue：[#2601](https://github.com/MoonshotAI/kimi-cli/issues/2601)、[#2600](https://github.com/MoonshotAI/kimi-cli/issues/2600)

---

## 2. 版本发布
- **无新 Releases**
  - 过去 24 小时未检测到新版本发布。  
  - Release 链接：<https://github.com/MoonshotAI/kimi-cli/releases>

---

## 3. 社区热点 Issues
> 过去 24 小时共 2 条活跃 Issue，本日报列出全部。

### 1) [#2601] Quote & Reply：对 AI 回复的任意选中片段进行评论/追问
- **链接**：<https://github.com/MoonshotAI/kimi-cli/issues/2601>
- **为什么重要**：这是一个典型的 **AI 交互效率优化** 需求，目标是让用户在 Kimi Web 中对 assistant 的任意局部内容进行引用回复，适用于代码块、步骤说明、差异解释等场景。  
- **价值判断**：如果实现，将显著提升“**上下文定位精度**”和“**多轮追问效率**”，尤其适合开发者在审查代码解释、方案拆解时使用。  
- **社区反应**：当前该 Issue **0 评论、0 👍**，说明它更像是单点高质量需求，尚未形成广泛讨论，但方向明确。  
- **摘要要点**：用户希望对 AI 回复中的任意文字片段直接附加评论，并让 agent 基于被选中的内容继续推理。

### 2) [#2600] Windows / PowerShell 7 默认 D 盘启动导致 Kimi Code 找不到路径
- **链接**：<https://github.com/MoonshotAI/kimi-cli/issues/2600>
- **为什么重要**：这是一个直接影响 **Windows 用户可用性** 的阻断型问题，涉及 CLI 启动路径和当前工作目录的处理。  
- **价值判断**：对命令行工具而言，启动目录识别错误会直接影响项目打开、路径解析、文件读写等核心流程，属于高优先级兼容性问题。  
- **社区反应**：同样 **0 评论、0 👍**，但从描述看问题较具体，且复现环境清楚（PowerShell 7 默认从 D 盘启动）。  
- **摘要要点**：在 PowerShell 7 默认工作目录不在 C 盘时，打开 kimi code 报路径不存在，说明 CLI 对当前目录或绝对/相对路径处理可能存在兼容缺陷。

---

## 4. 重要 PR 进展
- **过去 24 小时无 PR 更新**
  - PR 链接：<https://github.com/MoonshotAI/kimi-cli/pulls>

---

## 5. 功能需求趋势
从当前全部 Issues 看，社区关注点可归纳为以下方向：

### 1) AI 交互粒度更细：支持“引用片段回复”
- **代表 Issue**：[#2601](https://github.com/MoonshotAI/kimi-cli/issues/2601)
- **趋势解读**：用户希望不是只能对整段回答继续提问，而是能对某一段、某一行、某个步骤单独追问，说明社区正在从“聊天式交互”走向“**文档批注式 / 代码审阅式交互**”。

### 2) 跨平台兼容性与路径鲁棒性
- **代表 Issue**：[#2600](https://github.com/MoonshotAI/kimi-cli/issues/2600)
- **趋势解读**：Windows、PowerShell、默认启动目录等问题再次表明，社区对 CLI 工具的期待不仅是“能用”，而是“**在不同终端环境下稳定可预期地工作**”。

### 3) 面向开发者场景的工作流增强
- **综合判断**：两个 Issue 都围绕开发者高频场景展开——一个是代码/解释的局部交互，一个是命令行启动与路径处理。  
- **趋势结论**：Kimi Code CLI 的社区需求正向 **IDE/终端深度集成、交互精细化、环境兼容性** 三个方向集中。

---

## 6. 开发者关注点
### 1) Windows 兼容性仍是高频痛点
- **表现**：PowerShell 7 默认启动目录、路径解析、跨盘符工作目录等细节会直接影响 CLI 可用性。  
- **相关链接**：[#2600](https://github.com/MoonshotAI/kimi-cli/issues/2600)

### 2) 用户希望 AI 回复支持“局部可操作”
- **表现**：用户不满足于对整段回复继续对话，更希望像在编辑器里做批注一样，对某个选中片段直接提问或评论。  
- **相关链接**：[#2601](https://github.com/MoonshotAI/kimi-cli/issues/2601)

### 3) 社区反馈量少但指向明确
- **表现**：当前两条 Issue 均无评论、无点赞，说明问题还处于“需求提出/单点反馈”阶段，但方向都很明确，适合产品和工程团队优先评估。  
- **相关链接**：[#2601](https://github.com/MoonshotAI/kimi-cli/issues/2601)、[#2600](https://github.com/MoonshotAI/kimi-cli/issues/2600)

---

如果你愿意，我还可以把这份日报进一步整理成 **适合发飞书/Slack 的精简版**，或输出成 **Markdown 表格版**。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-08-12）

## 1. 今日速览
今天社区讨论和提交高度集中在 **V2 稳定性修复、权限/会话体验、以及第三方兼容性** 三条主线。  
Issue 侧出现了多起高影响故障：包括 **音频/终端异常、LLM 无限重试、启动卡死、迁移失败、权限弹窗失效** 等；PR 侧则明显在推进 **新运行时、会话行为修正、TUI 可用性优化**。

---

## 2. 版本发布
**无新 Release。**

---

## 3. 社区热点 Issues

### 1) [#41848 LLM retry 没有最大次数，流式错误导致 UI 永久停在 Thinking](https://github.com/anomalyco/opencode/issues/41848)
- **重要性**：这是典型的“看起来像卡死”的高优先级稳定性问题，直接影响用户感知。
- **社区反应**：已有 2 条评论，说明问题复现和影响都比较明确，值得优先排查。
- **关注点**：重试上限、错误反馈、DeepSeek 流式异常处理。

### 2) [#41806 Linux 下实例 bootstrap 永久挂起：git 子进程退出但未被回收](https://github.com/anomalyco/opencode/issues/41806)
- **重要性**：启动阶段卡死属于高严重度问题，影响“能不能用”。
- **社区反应**：已有 2 条评论，且描述非常具体，便于定位。
- **关注点**：子进程回收、初始化 await 未完成、TUI 表面可交互但会话无法启动。

### 3) [#41846 UI 权限设置被 opencode.json 静默覆盖](https://github.com/anomalyco/opencode/issues/41846)
- **重要性**：权限控制失效是产品可信度问题，尤其涉及安全与用户预期一致性。
- **社区反应**：已有 1 条评论，但问题叙述非常严重，属于高优先级用户反馈。
- **关注点**：UI 配置和项目级配置的优先级/合并逻辑。

### 4) [#41847 权限弹窗未渲染：后端阻塞于用户看不到的提示](https://github.com/anomalyco/opencode/issues/41847)
- **重要性**：这是“隐形阻塞”型故障，用户会误判为应用冻结。
- **社区反应**：已有 1 条评论，但证据很强，说明是系统性问题而非个例。
- **关注点**：前后端同步、弹窗渲染链路、提示队列可见性。

### 5) [#41849 同一秒内重复权限提示未去重](https://github.com/anomalyco/opencode/issues/41849)
- **重要性**：重复弹窗会放大等待时间，也会显著恶化交互体验。
- **社区反应**：已有 1 条评论；描述中提到“141 组重复提示”，影响面不小。
- **关注点**：权限请求去重策略、同秒合并、队列抖动。

### 6) [#41869 V1 迁移遇到单引号导致 SQLite 语法错误](https://github.com/anomalyco/opencode/issues/41869)
- **重要性**：升级迁移失败是非常高优先级的阻断性问题，可能导致老用户无法启动。
- **社区反应**：已有 2 条评论，且复现路径清楚。
- **关注点**：SQL 拼接安全性、JSON 注入转义、迁移脚本鲁棒性。

### 7) [#41777 V2 中 webfetch 在 Code Mode 返回 null 的回归](https://github.com/anomalyco/opencode/issues/41777)
- **重要性**：核心工具回归会直接影响代码模式能力，属于功能性退化。
- **社区反应**：已有 3 条评论，是本批次中较受关注的问题之一。
- **关注点**：工具暴露列表、执行上下文、next 版本回归窗口。

### 8) [#41875 apply_patch 的 Add File 可覆盖已有文件](https://github.com/anomalyco/opencode/issues/41875)
- **重要性**：这是典型的数据破坏风险，工具层安全性和幂等性都受影响。
- **社区反应**：已有 2 条评论，说明开发者很快识别到行为偏差。
- **关注点**：补丁语义校验、文件存在性检查、写入前保护。

### 9) [#41839 多工作区共享服务器时，TUI 状态栏显示了别的工作区分支](https://github.com/anomalyco/opencode/issues/41839)
- **重要性**：这是多会话/多工作区场景下的状态污染问题，容易误导用户。
- **社区反应**：已有 2 条评论，且属于 V2 / serve 架构相关问题。
- **关注点**：状态隔离、工作区上下文绑定、TUI 多实例一致性。

### 10) [#41828 V2 API 缺口阻塞第三方客户端](https://github.com/anomalyco/opencode/issues/41828)
- **重要性**：直接关系到生态扩展和第三方工具兼容，是平台化能力的关键。
- **社区反应**：已有 2 条评论，说明有真实客户端迁移压力。
- **关注点**：v2 server API 完整度、会话与工具接口覆盖、兼容层。

---

## 4. 重要 PR 进展

### 1) [#41918 feat(server): workerd runtime profile and SDK workerd entrypoint](https://github.com/anomalyco/opencode/pull/41918)
- **内容**：为 OpenCode Server 增加 workerd runtime profile，支持部署到 Cloudflare Durable Object。
- **意义**：明显是面向云原生/边缘运行的架构扩展，影响部署形态。

### 2) [#41917 feat(tui): experiments via devtools bar, drafts stay put](https://github.com/anomalyco/opencode/pull/41917)
- **内容**：将实验入口迁移到 DevTools bar，移除旧的秘密 slash 入口。
- **意义**：提升实验功能可发现性，并收敛入口设计。

### 3) [#41904 feat(opencode): add Claude Code ACP runtime](https://github.com/anomalyco/opencode/pull/41904)
- **内容**：通过 `@agentclientprotocol/claude-agent-acp` 接入 Claude Code 运行时。
- **意义**：这是重要的模型/协议生态扩展，直接增强多运行时支持。

### 4) [#41903 feat(tui): wipe in first titles and dim placeholders](https://github.com/anomalyco/opencode/pull/41903)
- **内容**：优化会话标签标题占位状态，未命名会话显示更克制。
- **意义**：改善 TUI 信息密度和视觉层级，属于高频体验优化。

### 5) [#41902 docs(skill): document project external paths](https://github.com/anomalyco/opencode/pull/41902)
- **内容**：补充 project-level `.claude/skills` 和 `.agents/skills` 的自动发现文档。
- **意义**：修正文档与真实行为不一致的问题，降低集成成本。

### 6) [#41900 fix(tui): render instruction updates as compact notices](https://github.com/anomalyco/opencode/pull/41900)
- **内容**：将指令更新提示统一压缩为单行通知。
- **意义**：避免模型侧更新内容污染 transcript，减少 UI 噪音。

### 7) [#41899 feat(session): record location switches](https://github.com/anomalyco/opencode/pull/41899)
- **内容**：把会话位置切换记录为 timeline message，并同步到模型上下文。
- **意义**：增强会话可追踪性，也改善多目录/多 worktree 语义。

### 8) [#41898 fix(session): fail empty assistant responses instead of recording success](https://github.com/anomalyco/opencode/pull/41898)
- **内容**：对“无文本、无工具调用”的 assistant 响应不再误记为成功。
- **意义**：修复会话状态可信度问题，避免沉默失败。

### 9) [#41894 fix(app): use Sublime CLI for open with](https://github.com/anomalyco/opencode/pull/41894)
- **内容**：修正桌面应用“Open With”对 Sublime Text 的调用方式。
- **意义**：完善桌面集成和跨平台外部编辑器支持。

### 10) [#41889 fix(desktop): align local development identity](https://github.com/anomalyco/opencode/pull/41889)
- **内容**：统一本地开发身份与版本标识，并通过本地服务配置发现隔离 server。
- **意义**：对桌面开发/调试流程很关键，减少环境混淆。

---

## 5. 功能需求趋势

从今天的 Issues 看，社区关注点主要集中在以下方向：

1. **V2 API 完整性与第三方生态支持**  
   - 代表问题：[#41828](https://github.com/anomalyco/opencode/issues/41828)、[#41777](https://github.com/anomalyco/opencode/issues/41777)  
   - 说明：第三方客户端、兼容 provider、工具暴露方式都在推动 API 继续补齐。

2. **会话与多工作区语义一致性**  
   - 代表问题：[#41839](https://github.com/anomalyco/opencode/issues/41839)、[#41806](https://github.com/anomalyco/opencode/issues/41855)、[#41905](https://github.com/anomalyco/opencode/issues/41905)  
   - 说明：共享 server、session list、cwd 继承、location switch 等都在强调“会话状态必须可预测”。

3. **权限系统可见性和可靠性**  
   - 代表问题：[#41846](https://github.com/anomalyco/opencode/issues/41846)、[#41847](https://github.com/anomalyco/opencode/issues/41847)、[#41849](https://github.com/anomalyco/opencode/issues/41849)  
   - 说明：用户对“设置是否真的生效”极其敏感，当前更需要去重、渲染和优先级一致性。

4. **LLM/模型运行稳定性**  
   - 代表问题：[#41848](https://github.com/anomalyco/opencode/issues/41848)、[#41873](https://github.com/anomalyco/opencode/issues/41873)、[#41886](https://github.com/anomalyco/opencode/issues/41886)  
   - 说明：流式错误、provider 兼容、模型可用性直接影响核心使用体验。

5. **工具链安全性与事务性**  
   - 代表问题：[#41875](https://github.com/anomalyco/opencode/issues/41875)、[#41871](https://github.com/anomalyco/opencode/issues/41871)  
   - 说明：补丁应用、文件变更需要更强的原子性和失败回滚能力。

6. **文档与插件/技能发现体系完善**  
   - 代表问题：[#41850](https://github.com/anomalyco/opencode/issues/41850)、[#41822](https://github.com/anomalyco/opencode/issues/41822)  
   - 说明：生态扩展越来越活跃，文档一致性开始成为“使用门槛”的关键因素。

---

## 6. 开发者关注点

今天开发者反馈中，最突出的痛点可以概括为：

- **“卡住但不报错”类问题很多**  
  包括 Thinking 永久不结束、bootstrap 挂起、权限提示不可见、LLM 无限重试等，说明当前最需要的是更可靠的失败退出和可观测性。

- **会话状态的一致性问题频发**  
  分支、cwd、location、session list、tab title 等都出现了跨上下文污染或继承错误，提示需要更强的 session isolation。

- **权限与设置系统存在“UI 显示正确、后端行为不同步”的风险**  
  这类问题会严重削弱用户对产品的信任，建议优先修复配置优先级和实时同步链路。

- **对 V2 API/运行时兼容性的诉求明显增强**  
  不论是第三方客户端还是新的 ACP/runtime 接入，社区都在推动 OpenCode 从单一产品向平台化演进。

- **工具层安全性需要加固**  
  `apply_patch`、迁移脚本、empty response 这类问题都说明：工具执行不能只追求成功率，更要保证语义正确和失败可恢复。

如果你愿意，我可以继续把这份日报整理成：
1. **适合直接发群的精简版**，或  
2. **带“风险等级/建议优先级”的管理层版**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-08-12）
数据源：`github.com/badlogic/pi-mono`

## 1) 今日速览
今天社区讨论几乎全集中在**稳定性修复、模型兼容性、以及终端/TUI 体验**三条主线上：包括命令参数失效、`/resume` 统计不一致、OpenAI/Anthropic 流式异常、以及全屏 TUI 的鼠标/链接交互问题。  
与此同时，PR 侧继续围绕**新模型接入、流式事件协议补强、编辑工具鲁棒性、扩展系统体验**推进，说明项目当前仍在快速补齐“可用性”和“兼容性”短板。  
今天**没有新 Release**。

---

## 2) 社区热点 Issues（10 个）

> 选取标准：更新热度、问题影响面、是否涉及核心路径、以及是否有明确的用户痛点。

1. **#7966 `[bug, no-action] Command line parameter --thinking has no effect`**  
   这个问题直接影响 CLI 行为，且用户反馈是“参数传了但状态沿用上一次会话”，属于**核心交互一致性**问题。虽然已关闭，但 3 条评论说明它引发了明确关注。  
   链接：<https://github.com/badlogic/pi-mono/issues/7966>

2. **#7960 `[untriaged] /resume progress total counts files, completed list counts parsed sessions — counts diverge`**  
   `/resume` 显示的进度计数与最终会话列表不一致，说明**会话加载/统计口径**有偏差。该类问题容易让用户误判数据完整性，且与 #7931 形成连续反馈，关注度较高。  
   链接：<https://github.com/badlogic/pi-mono/issues/7960>

3. **#7938 `[no-action] Anthropic models via OpenRouter fail with tools.N.cache_control: Extra inputs are not permitted`**  
   这是典型的**供应商兼容性 bug**：同一套工具调用在 OpenRouter 场景下因 `cache_control` 字段失败。对使用聚合网关的用户影响很大，3 条评论也反映出问题较“硬”。  
   链接：<https://github.com/badlogic/pi-mono/issues/7938>

4. **#7954 `[bug, untriaged] OpenAI-compatible SSE turn can hang forever ... no inactivity timeout on the completions path`**  
   这是高风险稳定性问题：流式响应可能在“输出完了但连接不结束”时**永久挂起**。这会直接拖死会话，属于必须优先处理的运行时问题。  
   链接：<https://github.com/badlogic/pi-mono/issues/7954>

5. **#7947 `[bug, untriaged]【P0】在 CMD 上运行遇到重复输出、内存泄漏等严重问题`**  
   这是明显的高优先级故障，涉及 Windows CMD 环境下的**输出异常、重复增长、内存泄漏**。虽然只有 2 条评论，但问题严重度非常高。  
   链接：<https://github.com/badlogic/pi-mono/issues/7947>

6. **#7979 `[untriaged] Regression: fallback tool result renderer ignores expanded flag since v0.62.0`**  
   这是回归问题，影响工具结果在 UI 中的折叠/展开逻辑，说明**工具渲染状态管理**出现倒退。对日常使用体验影响明显，且回归类 issue 往往优先级高。  
   链接：<https://github.com/badlogic/pi-mono/issues/7979>

7. **#7964 `[untriaged] subagent example: array-form tools throws and breaks agent discovery`**  
   这是示例与真实 YAML 输入不兼容导致的崩溃，虽然看似只在 example 层面，但会影响**子代理发现机制**和文档可用性。对扩展开发者尤其关键。  
   链接：<https://github.com/badlogic/pi-mono/issues/7964>

8. **#7925 `[bug, inprogress] RPC: tool name unavailable at toolcall_start after partial removal (#7290)`**  
   这是面向 RPC/移动端客户端的协议问题，核心是 `toolcall_start` 阶段拿不到工具名，影响**外部集成能力**。目前仍在处理中，说明其对 API 兼容性影响较大。  
   链接：<https://github.com/badlogic/pi-mono/issues/7925>

9. **#7930 `[bug, no-action] Fullscreen TUI: OSC 8 hyperlinks rendered but not clickable`**  
   全屏 TUI 中链接显示出来但点不了，属于**交互链路断裂**问题，尤其影响文档、日志、工具路径跳转等高频场景。  
   链接：<https://github.com/badlogic/pi-mono/issues/7930>

10. **#7987 `[untriaged] Package remains absent from gallery after republish despite valid pi-package metadata`**  
    这是发布/分发链路问题：包已经可安装但仍不进入 gallery，影响**生态可发现性**。对于插件/包作者来说，这是很直接的“上线后不可见”痛点。  
    链接：<https://github.com/badlogic/pi-mono/issues/7987>

---

## 3) 重要 PR 进展（10 个）

1. **#7989 `feat(ai): add Qwen Token Plan Individual CN provider`**  
   新增 Qwen 中国区 Individual 订阅提供方，继续扩大模型覆盖面，说明项目在**本地化/区域化模型接入**上持续推进。  
   链接：<https://github.com/badlogic/pi-mono/pull/7989>

2. **#7982 `fix(coding-agent): preserve usage in streaming events`**  
   修复流式事件中 usage 统计丢失的问题，并保持 wire size 线性增长，属于**协议层关键改进**。这会直接影响观测、计费和调试体验。  
   链接：<https://github.com/badlogic/pi-mono/pull/7982>

3. **#7981 `fix(ai): map models.dev cost tiers for every provider`**  
   将 models.dev 的成本 tier 映射推广到所有 provider，提升**模型成本展示的一致性**，对成本敏感型用户和调度逻辑都很重要。  
   链接：<https://github.com/badlogic/pi-mono/pull/7981>

4. **#7978 `fix(edit): normalize single-object edits argument to array and collapse whitespace in fuzzy match`**  
   提升 edit 工具对模型输出格式差异的容错能力，兼容“单对象/字符串”参数，并修复空白匹配问题。属于**工具链鲁棒性增强**。  
   链接：<https://github.com/badlogic/pi-mono/pull/7978>

5. **#7970 `feat(coding-agent): Show when the fullscreen transcript is scrolled up`**  
   在全屏 transcript 滚动离底时增加视觉提示，改善**长对话阅读与定位**体验，是比较实用的 TUI UX 优化。  
   链接：<https://github.com/badlogic/pi-mono/pull/7970>

6. **#7968 `feat: intercom (live session-to-session messaging) + ask_predecessor ghost responder`**  
   这是偏实验性的会话间通信能力，支持 session 之间协作和交接问答，属于**多会话/协作型扩展**的重要探索。  
   链接：<https://github.com/badlogic/pi-mono/pull/7968>

7. **#7967 `feat(coding-agent): add VS Code support to notify example`**  
   让 notify 示例在 VS Code 集成终端中也能发通知，补齐**IDE 集成兼容性**。这类改动对开发者实际使用非常关键。  
   链接：<https://github.com/badlogic/pi-mono/pull/7967>

8. **#7965 `docs: document terminal-specific fullscreen mouse behavior`**  
   补充不同终端下全屏鼠标行为的文档，说明项目在处理**终端兼容性差异**方面开始系统化沉淀。  
   链接：<https://github.com/badlogic/pi-mono/pull/7965>

9. **#7959 `fix(ai): abort OpenAI-compatible streams that stall mid-response`**  
   修复 OpenAI 兼容流在中途卡死的问题，属于对 #7954 这类问题的直接响应，能显著提升**会话可恢复性和稳定性**。  
   链接：<https://github.com/badlogic/pi-mono/pull/7959>

10. **#7953 `fix(coding-agent): expose tool metadata at stream start`**  
    在 `toolcall_start` 阶段暴露 `id` 和 `toolName`，对 RPC 客户端、移动端以及工具链调试都很重要，属于**协议能力补强**。  
    链接：<https://github.com/badlogic/pi-mono/pull/7953>

---

## 4) 功能需求趋势

从今天的 Issues 看，社区需求主要集中在以下方向：

1. **终端 / TUI 交互体验**  
   包括鼠标点击、拖拽复制、OSC 8 超链接、全屏滚动状态提示、tmux/Kitty/VTE 兼容等。  
   链接示例：<https://github.com/badlogic/pi-mono/issues/7930>、<https://github.com/badlogic/pi-mono/issues/7963>、<https://github.com/badlogic/pi-mono/issues/7951>

2. **模型与供应商兼容性**  
   OpenRouter、Azure Foundry、Anthropic、OpenAI-compatible SSE、Claude Sonnet 5 等兼容问题频繁出现，说明用户在真实生产环境中大量使用多供应商路由。  
   链接示例：<https://github.com/badlogic/pi-mono/issues/7938>、<https://github.com/badlogic/pi-mono/issues/7983>、<https://github.com/badlogic/pi-mono/issues/7954>

3. **会话恢复与状态一致性**  
   `/resume` 统计、session JSONL 版本、progress 口径不一致等问题，表明用户非常依赖**可恢复会话**。  
   链接示例：<https://github.com/badlogic/pi-mono/issues/7960>、<https://github.com/badlogic/pi-mono/issues/7937>、<https://github.com/badlogic/pi-mono/issues/7931>

4. **扩展系统与工具协议**  
   包括 tool metadata、tool renderer、extension loader、agent discovery、RPC 暴露信息等，说明生态扩展能力正在成为核心诉求。  
   链接示例：<https://github.com/badlogic/pi-mono/issues/7986>、<https://github.com/badlogic/pi-mono/issues/7964>、<https://github.com/badlogic/pi-mono/issues/7925>

5. **性能与启动速度**  
   扩展加载慢、jiti transpilation 串行、startup 5.5s 等反馈表明，用户已开始对**启动延迟**敏感。  
   链接示例：<https://github.com/badlogic/pi-mono/issues/7958>、<https://github.com/badlogic/pi-mono/issues/7957>

6. **包分发与 Gallery 可发现性**  
   包可安装但未进入 gallery，说明大家不仅关注“能用”，也关注“能被发现、能被传播”。  
   链接示例：<https://github.com/badlogic/pi-mono/issues/7987>

---

## 5) 开发者关注点

从近期反馈看，开发者最常遇到的痛点主要是：

- **行为不稳定或状态漂移**：例如参数失效、session 统计不一致、工具结果渲染回归。  
  链接：<https://github.com/badlogic/pi-mono/issues/7966>、<https://github.com/badlogic/pi-mono/issues/7979>

- **流式协议边界处理不足**：SSE 卡死、usage 丢失、toolcall_start 元信息缺失，说明流式链路还在快速打磨。  
  链接：<https://github.com/badlogic/pi-mono/issues/7954>、<https://github.com/badlogic/pi-mono/pull/7982>、<https://github.com/badlogic/pi-mono/pull/7953>

- **终端/IDE 环境差异大**：VS Code、tmux、Ghostty、iTerm2、VTE、CMD 的行为差异都在影响体验。  
  链接：<https://github.com/badlogic/pi-mono/issues/7947>、<https://github.com/badlogic/pi-mono/issues/7951>、<https://github.com/badlogic/pi-mono/pull/7967>

- **兼容性优先于新功能**：大量 issue 不是“加能力”，而是“让已有能力在更多模型/平台上正确工作”。  
  链接：<https://github.com/badlogic/pi-mono/issues/7938>、<https://github.com/badlogic/pi-mono/issues/7983>、<https://github.com/badlogic/pi-mono/issues/7961>

- **扩展开发门槛仍需降低**：示例、文档、错误提示、默认导出约定等都在被反复打磨。  
  链接：<https://github.com/badlogic/pi-mono/issues/7985>、<https://github.com/badlogic/pi-mono/issues/7969>、<https://github.com/badlogic/pi-mono/issues/7964>

如果你希望，我也可以把这份日报再整理成一版**“管理层摘要版”**或**“研发周会版”**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-08-12）

## 1) 今日速览
今天社区讨论的焦点仍然集中在**会话管理、Web Shell 稳定性、CI/自动化回归**三条主线：一边是预览版/夜版继续修补会话导航安全与服务端日志，一边是主干 CI、headless 输出、图片加载、tmux/mac 闪屏等稳定性问题持续被集中反馈。  
同时，PR 侧明显在推进**自动化审查、autofix、daemon/ACP 资源控制、Web Shell 交互安全**等基础设施能力，说明项目仍在快速迭代“AI 开发工具平台化”能力。

---

## 2) 版本发布

### v0.21.11-preview.0  
链接：https://github.com/QwenLM/qwen-code/releases/tag/v0.21.11-preview.0  
- 重点修复了 **Web Shell 会话导航安全**：`fix(web-shell): Enforce prompt-safe session navigation`
- 同步加入了 **serve 会话续接审计日志**：`chore(serve): Log session continuation admissions`
- 说明本轮预览版主要是围绕 **会话切换/续接的安全性与可观测性** 做小步修补。

### v0.21.10-nightly.20260812.a64d1291d2  
链接：https://github.com/QwenLM/qwen-code/releases/tag/v0.21.10-nightly.20260812.a64d1291d2  
- 与预览版保持一致，继续收敛 **Web Shell 导航安全** 与 **serve 会话审计** 相关修复
- 夜版体现出当前发布节奏偏向 **快速验证热修复**

### v0.21.10  
链接：https://github.com/QwenLM/qwen-code/releases/tag/v0.21.10  
- 支持通过会话配置将 **reasoning effort** 从 Default 配到 Max（ACP）
- Web Shell 中点击上传/粘贴图片可直接在 artifact 中预览
- 整体看，0.21.10 是一次偏“能力增强 + 体验修复”的版本

---

## 3) 社区热点 Issues

> 下面按“影响面 + 讨论热度 + 问题紧迫性”筛选 10 条。

1. **#8959 Main CI failed: E2E Tests on a64d1291d2f6**  
   链接：https://github.com/QwenLM/qwen-code/issues/8959  
   - 这是主干 CI 失败，直接影响发布可信度与合并节奏。
   - 已有 **4 条评论**，说明团队/社区已快速介入定位。
   - 属于典型的“主线稳定性报警”，优先级很高。

2. **#8920 bug(headless): OpenAI API errors emit success result and exit 0 in stream-json mode**  
   链接：https://github.com/QwenLM/qwen-code/issues/8920  
   - headless 模式把失败当成功返回，会误导上层自动化。
   - **4 条评论**，说明这是自动化链路中的高关注一致性问题。
   - 对 CI、脚本编排、批处理任务影响很大。

3. **#8901 mac中iTerm使用总是出现闪屏**  
   链接：https://github.com/QwenLM/qwen-code/issues/8901  
   - 典型的交互体验问题，且在 mac/iTerm 场景稳定复现。
   - **4 条评论**，表明问题影响面不小，用户体验负反馈明显。
   - 直接影响日常使用意愿。

4. **#8957 [Regression] Qwen code crashes on image load since 0.21.2**  
   链接：https://github.com/QwenLM/qwen-code/issues/8957  
   - 图片加载崩溃属于高优先级回归，且涉及核心多模态场景。
   - 已有 **3 条评论**，说明复现和确认正在推进。
   - 这类问题对“AI 开发工具”的基础能力打击很大。

5. **#8948 Provider update prompt promises a model switch the update no longer performs**  
   链接：https://github.com/QwenLM/qwen-code/issues/8948  
   - 配置更新提示与实际行为不一致，属于产品信任问题。
   - **3 条评论**，说明用户对“提示—实际”一致性很敏感。
   - 涉及模型切换路径，容易引发误操作。

6. **#8945 Opening a bot PR fires multiple review_requested events, spawning a burst of self-cancelling review runs**  
   链接：https://github.com/QwenLM/qwen-code/issues/8945  
   - CI/Review 自动化被 GitHub 事件风暴打爆，浪费资源且降低可用性。
   - **3 条评论**，属于自动化体系的稳定性问题。
   - 对 PR review bot 的可靠性影响很直接。

7. **#8944 2 high severity vulnerabilities reported after `npm update` since 0.21.0**  
   链接：https://github.com/QwenLM/qwen-code/issues/8944  
   - 安全漏洞是所有依赖升级场景里的硬门槛。
   - **3 条评论**，说明社区对供应链安全高度敏感。
   - 会影响发布节奏与用户升级意愿。

8. **#8940 Parallel read_file calls produce merged results**  
   链接：https://github.com/QwenLM/qwen-code/issues/8940  
   - 并发工具调用结果串台，会直接破坏 agent 推理上下文。
   - **3 条评论**，属于核心工具层正确性问题。
   - 影响多文件读取、并行调用等高频场景。

9. **#8922 bug(core): Shell ignores tools.truncateToolOutputThreshold**  
   链接：https://github.com/QwenLM/qwen-code/issues/8922  
   - 文档配置不生效，且 Shell 仍用固定预算，属于可配置性缺陷。
   - **3 条评论**，说明用户已在真实工作负载中碰到限制。
   - 对大输出命令、日志处理场景很关键。

10. **#8909 bug(serve): cold load/resume can use the wrong runtime storage in multi-workspace mode**  
    链接：https://github.com/QwenLM/qwen-code/issues/8909  
    - 多工作区下会话恢复可能落到错误存储，影响数据隔离与状态一致性。
    - **3 条评论**，是 daemon / session 管理的关键逻辑缺陷。
    - 一旦出错会造成难以排查的上下文混乱。

---

## 4) 重要 PR 进展

> 下面选取 10 个对平台能力、稳定性或安全性影响较大的 PR。

1. **#8964 test DSW EAS prerelease pipeline**  
   链接：https://github.com/QwenLM/qwen-code/pull/8964  
   - 调整预发布流水线到香港 DSW 自托管 runner，并补充 EAS / smoke 后端。
   - 说明项目在继续加强 **发布基础设施与环境隔离**。

2. **#8961 fix(ci): make autofix verification gates hermetic to runner git config**  
   链接：https://github.com/QwenLM/qwen-code/pull/8961  
   - 让 autofix 验证门禁不受 runner 主机 git 配置污染。
   - 属于典型的 **CI 可复现性增强**，对自动化修复很重要。

3. **#8960 feat(autofix): escalate stopped takeover PRs and age out unanswered pauses**  
   链接：https://github.com/QwenLM/qwen-code/pull/8960  
   - 为自动接管中止的 PR 增加 `autofix/needs-human` 标记，并推动久挂暂停单。
   - 重点提升 **自动化修复闭环能力**，避免“停住就没人看”。

4. **#8958 [autofix/takeover] fix(ci): seed the dist-rebuild warning on every retryable A/B exit**  
   链接：https://github.com/QwenLM/qwen-code/pull/8958  
   - 在可重试退出路径中补充 dist 重建警告，减少误判。
   - 强化了 **自动修复与产物一致性**。

5. **#8956 feat(review): cover modeled-system defect layers in the reverse audit**  
   链接：https://github.com/QwenLM/qwen-code/pull/8956  
   - 扩展 review 逆向审计能力，专门识别“外部系统执行模型”的缺陷层。
   - 说明 review bot 正在从“看 diff”升级到“看执行模型”。

6. **#8955 fix(web-shell): Harden prompt admission ownership**  
   链接：https://github.com/QwenLM/qwen-code/pull/8955  
   - 强化 Web Shell 提示词提交所有权校验，防止异步场景串权。
   - 与当前会话导航安全问题高度相关，是核心修补之一。

7. **#8954 feat(serve): Propagate session list cancellation**  
   链接：https://github.com/QwenLM/qwen-code/pull/8954  
   - 让 daemon Session List 支持请求取消传播，减少无意义消耗。
   - 对服务端并发控制和长轮询性能有帮助。

8. **#8953 fix(vscode): preserve Windows file links in session exports**  
   链接：https://github.com/QwenLM/qwen-code/pull/8953  
   - 修复 Windows 场景下 session 导出文件链接丢失。
   - 直接提升跨平台可用性和导出可读性。

9. **#8952 chore(deps): bump sharp to ^0.35.0 to resolve GHSA-f88m-g3jw-g9cj**  
   链接：https://github.com/QwenLM/qwen-code/pull/8952  
   - 升级 sharp 以修复已知安全漏洞。
   - 是对 #8944 安全压力的直接回应之一。

10. **#8951 fix(desktop): follow-up review fixes from #8896**  
    链接：https://github.com/QwenLM/qwen-code/pull/8951  
    - 补齐桌面端合并后遗留的 review 修复项。
    - 体现桌面端仍处于持续打磨阶段。

---

## 5) 功能需求趋势

从过去 24 小时的 Issues 看，社区最关注的方向主要集中在：

1. **会话管理 / 多工作区 / 会话恢复**
   - 关键词：session navigation、resume、load、rotation、standalone session、wrong storage
   - 用户希望更可靠的会话切换、恢复、绑定和生命周期管理，尤其在 daemon / multi-workspace 模式下。

2. **Web Shell / UI 稳定性**
   - 关键词：闪屏、渲染、图片预览、refresh transactional、prompt ownership
   - 说明交互层已经成为高频使用入口，体验抖动会显著影响接受度。

3. **工具调用正确性**
   - 关键词：read_file 并发串台、Shell 输出截断、自动运行卡住
   - 社区希望 agent 工具链更可预测，避免结果污染与长任务中断。

4. **CI / 自动化审查 / Autofix**
   - 关键词：main CI、review_requested 风暴、incremental review、takeover PR、retryable gate
   - 自动化正在从“能跑”转向“可控、可追踪、可续接”。

5. **安全与供应链治理**
   - 关键词：npm update 漏洞、sanitize、vulnerability、fail-fast placeholder
   - 用户和维护者都在强调模型端、依赖端、输入清洗端的边界防护。

6. **多模态与图片处理**
   - 关键词：image load crash、Web Shell image preview
   - 说明图片输入/预览已成为重要场景，但稳定性仍待提升。

7. **企业集成与消息渠道扩展**
   - 关键词：DingTalk Workspace、scheduled-tasks、ACP、serve
   - 社区在推动 Qwen Code 向更广泛的企业协作和后台自动化场景扩展。

---

## 6) 开发者关注点

从开发者反馈看，当前高频痛点主要是：

- **“看起来成功，实际失败”** 的结果语义问题  
  典型如 headless stream-json 把 API 错误当成功返回，极易污染自动化链路。

- **跨平台渲染/交互稳定性不足**  
  mac/iTerm 闪屏、tmux 下卡顿、图片加载崩溃都在说明 UI 层仍有明显磨损。

- **会话与状态一致性问题**  
  多工作区 runtime 选错、session 导航引发意外 cancel/replay、恢复路径不一致，都是高风险点。

- **工具并发与输出边界不可靠**  
  并行 read_file 串台、Shell 输出截断配置失效，会直接影响 agent 任务质量。

- **自动化体系需要更强的可观测性和收敛机制**  
  CI 失败、review 事件风暴、autofix 停滞、retry 语义不明确，说明内部“机器人链路”已经进入复杂度高峰。

- **安全升级与回归控制成为常态任务**  
  依赖漏洞、输入清洗、placeholder 响应识别，显示项目正在向更严肃的生产级工具演进。

如果你希望，我也可以把这份日报进一步整理成：
1) **适合内部群发的短版**，或  
2) **适合周报/汇报 PPT 的结构化版本**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI 社区动态日报（2026-08-12）

说明：今日 **无新 Release**；过去 24 小时内仅更新 **4 条 Issue**、**5 条 PR**，以下按优先级汇总为全部内容。

## 1) 今日速览
今天社区讨论的核心，集中在 **v0.9.5 回归修复** 和 **运行时/工具协议稳定性** 两条线上。最受关注的是一个会直接阻断 Bash 与写入操作的 Auto-Review 回归问题，同时还出现了终端布局、后台任务事件隔离、agent 工具 schema 简化等基础能力优化，说明项目当前正处于“修稳定性、降误报、提兼容性”的阶段。

---

## 2) 社区热点 Issues
> 今日仅更新 4 条 Issue，以下全部列出。

1. **[#5323 Regression in v0.9.5: Auto-Review mode silently blocks every Bash call and write operation](https://github.com/Hmbown/DeepSeek-TUI/issues/5323)**  
   - **重要性**：这是最高优先级的回归问题，直接影响核心工具链可用性；如果 Bash 和写入操作被误拦，等同于阻断了日常开发工作流。  
   - **社区反应**：已有 **2 条评论**，说明问题已引发即时讨论，属于典型“高危阻断型”反馈。

2. **[#5325 runtime: don't deliver child-owned background shell completions to the parent model stream](https://github.com/Hmbown/DeepSeek-TUI/issues/5325)**  
   - **重要性**：涉及多智能体/子代理场景下的事件隔离，避免父模型收到不该看到的后台完成事件，属于运行时正确性修复。  
   - **社区反应**：当前 **0 评论、0 点赞**，但这是维护者主动提出的底层改进，技术价值较高。

3. **[#5324 agent tool: simplify the 32-field schema so models stop erroring on it](https://github.com/Hmbown/DeepSeek-TUI/issues/5324)**  
   - **重要性**：直接面向模型调用稳定性，32 字段 schema 过于复杂，容易导致模型报错；简化后有助于提升 tool call 成功率和兼容性。  
   - **社区反应**：当前 **0 评论、0 点赞**，属于协议层优化，但长期收益明显。

4. **[#5322 Regression: output area doesn't fill wide terminals (worked in v0.8.65)](https://github.com/Hmbown/DeepSeek-TUI/issues/5322)**  
   - **重要性**：TUI 在宽屏终端下无法撑满可用空间，属于明显可见的界面回归，影响使用体验与信息密度。  
   - **社区反应**：已有 **1 条评论**，说明问题可复现且具有明确的用户可见性。

---

## 3) 重要 PR 进展
> 今日仅更新 5 条 PR，以下全部列出。

1. **[#5326 web: audit fixes — i18n parity, copy/spacing, test fixes](https://github.com/Hmbown/DeepSeek-TUI/pull/5326)**  
   - 对 `web/` 社区站点做审计修正，补齐 **i18n 一致性**、**文案/间距** 和 **测试修复**，偏向站点质量与可维护性提升。

2. **[#5321 feat: register OrcaRouter as a named provider](https://github.com/Hmbown/DeepSeek-TUI/pull/5321)**  
   - 新增 **OrcaRouter** 提供方接入方式，和现有 OpenRouter 的 wiring 保持一致，补齐模型选择、配置与文档链路。

3. **[#5320 fix(session): separate snapshot reads from crash recovery](https://github.com/Hmbown/DeepSeek-TUI/pull/5320)**  
   - 将 **session snapshot 读取** 与 **崩溃恢复** 解耦，减少副作用，提升嵌入式宿主场景下的恢复可靠性。

4. **[#5319 fix(tui): copy messages without visual rails](https://github.com/Hmbown/DeepSeek-TUI/pull/5319)**  
   - 修复消息复制逻辑：复制 **源内容** 而不是渲染后的 Ratatui 线条，避免复制结果混入视觉边框信息。

5. **[#5318 feat(tui): pin host terminal window as an always-on-top mini window](https://github.com/Hmbown/DeepSeek-TUI/pull/5318)**  
   - 为 Windows 主机终端增加 **置顶迷你窗** 能力，支持 `/pin` 或右键菜单缩小并置顶，再次触发可恢复原状态。

---

## 4) 功能需求趋势
从今日 Issues 可见，社区最关注的方向主要有：

1. **工具调用与审批策略的可控性**  
   - 代表问题：[#5323](https://github.com/Hmbown/DeepSeek-TUI/issues/5323)  
   - 用户希望安全策略不要误伤正常 Bash / 写入操作，尤其在 Auto-Review 模式下要“默认可用、必要时再确认”。

2. **TUI 布局与显示适配**  
   - 代表问题：[#5322](https://github.com/Hmbown/DeepSeek-TUI/issues/5322)  
   - 宽屏终端下的内容填充、信息密度与视觉一致性仍是高频关注点。

3. **多智能体/后台任务事件隔离**  
   - 代表问题：[#5325](https://github.com/Hmbown/DeepSeek-TUI/issues/5325)  
   - 社区希望子代理的后台事件不要污染父模型流，保证上下文边界清晰。

4. **模型工具协议的简化与容错**  
   - 代表问题：[#5324](https://github.com/Hmbown/DeepSeek-TUI/issues/5324)  
   - 工具 schema 过大、字段过多会降低模型稳定性；社区明显在推动更简洁、更少报错的协议设计。

5. **版本升级后的回归治理**  
   - 代表问题：[#5323](https://github.com/Hmbown/DeepSeek-TUI/issues/5323)、[#5322](https://github.com/Hmbown/DeepSeek-TUI/issues/5322)  
   - 说明社区对“升级后可用性不退化”非常敏感，回归修复优先级很高。

---

## 5) 开发者关注点
从今天的反馈看，开发者/维护者需要重点盯住以下痛点：

- **安全策略误拦截**：Auto-Review 不能把正常工具调用当成破坏性操作。  
- **运行时边界清晰**：子代理、后台 shell、父模型流之间需要严格隔离。  
- **协议复杂度控制**：agent tool schema 需要更轻、更稳，减少模型报错。  
- **TUI 可用性回归**：宽屏适配、复制行为等基础交互不能退化。  
- **升级兼容性**：v0.9.5 的回归说明版本发布后需要更强的回归测试与灰度验证。

如果你需要，我也可以把这份日报进一步整理成 **“管理层版 100 字摘要”** 或 **“工程团队版行动清单”**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*