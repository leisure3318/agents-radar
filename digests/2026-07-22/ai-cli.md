# AI CLI 工具社区动态日报 2026-07-22

> 生成时间: 2026-07-22 01:01 UTC | 覆盖工具: 9 个

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

以下为基于你提供的 9 个 AI CLI 工具社区动态，整理的**横向对比分析报告**。

> 说明：表中“今日 Issues/PR 数”按你提供的**当日更新/精选条目**统计；Release 情况按当日是否出现新版本或 release 动作计。

---

# 1) 生态全景

过去 24 小时，AI CLI 工具整体呈现出一个很清晰的趋势：**从“能聊天的命令行工具”快速演进为“可编排、可恢复、可集成的 agent 工作台”**。  
当前社区最关注的，不再只是模型输出质量，而是 **MCP / provider / IDE / Desktop / WebShell / 沙箱** 等外围链路是否稳定。  
同时，**会话恢复、长任务续跑、后台 agent、权限审批、状态一致性** 正在成为产品竞争力的核心指标。  
另一个明显信号是：**多模型、开源模型、本地模型、自托管 provider** 的需求全面上升，说明用户正在把 CLI 当作统一 AI 接入层，而不是单一模型入口。

---

# 2) 各工具活跃度对比

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 |
|---|---:|---:|---|
| Claude Code | 10 | 10 | 有：v2.1.217 |
| OpenAI Codex | 10 | 10 | 无新 Release |
| Gemini CLI | 2 | 4 | 无新 Release |
| GitHub Copilot CLI | 10 | 0 | 有：v1.0.74-0 |
| Kimi Code CLI | 3 | 1 | 无新 Release |
| OpenCode | 10 | 10 | 无新 Release |
| Pi | 10 | 10 | 有：v0.81.0、v0.81.1 |
| Qwen Code | 10 | 10 | 有：v0.20.0-nightly、v0.20.0-preview.0、v0.20.1、cua-driver-rs-v0.7.3 |
| DeepSeek TUI | 10 | 8 | 无新 Release |

---

# 3) 共同关注的功能方向

## 3.1 集成稳定性：MCP / Desktop / Browser / IDE / Provider
这是当前最强的跨工具共性。

- **Claude Code**：MCP / Claude Desktop / Chrome 扩展 / VSCode 相关调用断裂
- **Codex**：Xcode 登录、Windows Desktop、sandbox、MCP suite、远端消息同步
- **Copilot CLI**：MCP handshake、remote OAuth、registry policy、结构化响应兼容
- **OpenCode**：upstream provider 阻断、401、localhost 连接、runtime 兼容
- **Gemini CLI**：OAuth 登录弃用错误，认证链路不稳
- **Pi / Qwen / DeepSeek**：也都在围绕 provider、route、daemon、serve 等接入层补强

**共同诉求**很明确：  
> 不是“能接入”，而是“接入后可持续、可恢复、可调试”。

---

## 3.2 会话恢复与状态一致性
几乎所有成熟工具都在处理同一个问题：**长会话不应因为重启、超限、切换端而失去上下文**。

- **Claude Code**：session 恢复、deep-research 断点续跑、plan-review 状态残留
- **Codex**：消息丢失、TUI 保持、会话命名、长会话资源回收
- **Copilot CLI**：resume 搜索、stale sessions、Plan Mode 独立模型
- **OpenCode**：后台 agent roster、SSE cursor 恢复、worktree / session 管理
- **Qwen Code**：daemon restart 后 SSE 恢复、background agent 生命周期
- **Pi**：session entry ID 稳定化、`/resume` 归档、`--no-session` 清理
- **DeepSeek TUI**：子代理 worktree、审批预览、上下文隔离

**共同诉求**：  
> CLI 正在从“单次交互”变成“持续工作流容器”。

---

## 3.3 权限、认证、审批与安全策略
这类问题在所有工具中都很高频，说明 **AI CLI 已进入企业/团队/受控环境**。

- **Gemini CLI**：OAuth login deprecation / fallback
- **Copilot CLI**：remote MCP OAuth refresh、registry policy、runtime headers
- **Claude Code**：approval 状态异常、安全分类器误报
- **OpenCode**：auto-accept permissions 与 runtime 不一致
- **Pi**：OpenRouter OAuth、Retry-After 阻塞
- **Codex**：提权沙箱、可写根目录、网络策略回调

**共同诉求**：  
> 权限系统要“少打断、可解释、可回退”，否则 agent 自动化就会失去生产可用性。

---

## 3.4 多模型 / 多 provider / 本地与自托管
这是增长最快的能力诉求之一。

- **Gemini CLI**：明确要求支持 OpenAI-compatible 与开源模型
- **OpenCode**：provider registry、Copilot API endpoint discovery
- **Pi**：llama.cpp、Hugging Face、本地模型下载与路由
- **Qwen Code**：provider registry、daemon transport、多语言 SDK
- **DeepSeek TUI**：自定义 provider / model 配置
- **Kimi Code CLI**：k2.5 模型 tool calling 兼容性问题，显示模型适配是关键
- **Claude Code / Copilot / Codex**：也都在围绕云端/本地/远端接入做工程补强

**趋势结论**：  
> 用户不再接受“只绑定一个模型供应商”的 CLI，通用 provider 抽象正在成为默认需求。

---

## 3.5 性能、阻塞与交互可靠性
高频 CLI 产品最终都会回到这三个问题：**快不快、稳不稳、卡不卡**。

- **Codex**：Windows CPU 飙高、taskkill 残留、分钟级延迟
- **Kimi Code CLI**：shell mode 阻塞、输出过长、键盘输入无响应
- **DeepSeek TUI**：输入延迟、TUI 卡顿、CI 不稳
- **OpenCode**：TUI freeze、大 binary 文件导致输入冻结
- **Pi**：Retry-After 睡死、补全崩溃、升级回归
- **Qwen Code**：startup perf、undici 懒加载、daemon/serve 恢复
- **Claude Code**：输入补全、转录写入告警、hookify 兼容性
- **Copilot CLI**：终端失焦按键丢失、Ctrl+G 交互异常

---

# 4) 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线/特征 |
|---|---|---|---|
| Claude Code | MCP、Desktop/Chrome/VSCode 集成、hook 生态 | 重度编码用户、自动化工作流用户 | 强集成、强扩展、围绕 hookify 和状态机打磨 |
| OpenAI Codex | Desktop/IDE、Windows 稳定性、沙箱与网络策略 | 企业/桌面重度用户 | 偏系统工程，强调进程治理、权限边界、可恢复性 |
| Gemini CLI | 认证稳定性、模型/provider 兼容 | Gemini 用户、希望统一 CLI 的开发者 | 较轻量，正在补 provider 抽象和登录链路 |
| GitHub Copilot CLI | Plan Mode、MCP、成本治理、企业策略 | GitHub 生态、团队协作用户 | 深度绑定 Copilot / GitHub 工作流，强调用量与策略 |
| Kimi Code CLI | Shell 执行、tool calling、goal mode | 偏 CLI 原生用户 | 更聚焦核心执行链路，当前优先修 shell / 输入体验 |
| OpenCode | Web/Desktop/TUI 一体化、provider 可配置 | 多环境、多项目开发者 | 平台化倾向明显，强调 UI 一致性和多工作区 |
| Pi | 本地模型、llama.cpp、可验证发布 | 本地模型爱好者、实验型用户 | 强调本地化、多模型、发布可信度和扩展性 |
| Qwen Code | daemon/serve、background agents、telemetry | 平台型开发者、多语言集成用户 | 架构上偏“服务化 agent 平台”，重恢复语义与观测 |
| DeepSeek TUI | TUI 交互、worktree/子代理、自托管配置 | TUI 重度用户、中文/本地开发者 | 偏终端工作流与上下文隔离，强调审查与可控性 |

### 进一步概括
- **Claude Code / Copilot CLI / Codex**：更像“企业级 agent 工作台”
- **OpenCode / Qwen Code**：更像“可编排平台”
- **Pi / Gemini CLI / Kimi**：更偏“模型接入与核心执行体验”
- **DeepSeek TUI**：更偏“终端原生工作流与隔离控制”

---

# 5) 社区热度与成熟度

## 社区最活跃的几个
- **Claude Code**：Issues/PR 双高，且问题集中在核心链路，说明用户密度和使用强度都很高。
- **OpenCode**：讨论覆盖 provider、UI、worktree、性能，社区参与面广，明显处于活跃迭代期。
- **Codex**：问题数量大且偏工程底层，说明用户已进入规模化使用阶段，稳定性压力明显。
- **Pi**：版本发布密集，且从崩溃修复到本地模型能力都在快速推进，属于高频迭代。
- **Qwen Code**：daemon/serve 主线清晰，release、PR、issue 都很集中，平台化节奏强。

## 热度高但工程推进偏保守
- **Copilot CLI**：issue 热度高，尤其围绕 MCP / 企业策略 / 交互稳定，但今日 PR 为 0，说明短期更像在积累问题与需求。
- **DeepSeek TUI**：议题很多，尤其围绕发布一致性与 TUI 体验，但整体更像在打磨成熟度。

## 相对更小、更聚焦的社区
- **Gemini CLI**：今日 issue 很少，但需求指向清晰，主要集中在认证与 provider 扩展。
- **Kimi Code CLI**：更新量少，但问题直接指向 shell / tool calling / 输入层，属于“问题少但关键”。

### 成熟度判断
- **更成熟、已进入规模化工程治理阶段**：Claude Code、Codex、Copilot CLI、OpenCode
- **快速成长、正在补平台能力**：Pi、Qwen Code、DeepSeek TUI
- **仍处于能力扩展或早期稳定化阶段**：Gemini CLI、Kimi Code CLI

---

# 6) 值得关注的趋势信号

## 6.1 AI CLI 正在平台化
CLI 不再只是“命令行聊天窗口”，而是在向 **agent runtime + workspace orchestrator** 演进。  
典型信号：
- session 命名、恢复、归档
- background agents / subagents
- daemon / serve / SSE cursor
- plan mode / goal mode
- worktree / multi-project / multi-session

**对开发者的参考价值**：  
> 未来的核心竞争点不只是模型能力，而是“工作流编排能力 + 状态管理能力”。

---

## 6.2 集成链路会成为产品分水岭
谁能稳定打通 **MCP / IDE / Browser / Desktop / OAuth / sandbox**，谁就更容易进入真实生产场景。  
今天几乎所有头部工具都在修这类问题，说明这是行业共性难点。

**参考价值**：  
> 任何新 CLI 工具都应把集成链路测试视作一级工程任务，而不是外围功能。

---

## 6.3 “可控性”开始超过“生成能力”成为用户主诉
用户越来越在意：
- 审批是否准确
- 权限是否一致
- 模型是否可切换
- 费用是否可见
- 状态是否可恢复
- 失败是否可解释

**参考价值**：  
> 企业落地时，治理能力会比模型分数更重要。

---

## 6.4 多模型和本地/自托管支持会继续扩张
Gemini、OpenCode、Pi、Qwen、DeepSeek 的反馈已经说明：  
**统一 provider 抽象层** 正成为 CLI 的标配诉求。

**参考价值**：  
> 开发者在设计 CLI 时，应该默认支持 provider 插件化、模型路由化、认证分层化。

---

## 6.5 稳定性问题会更多出现在“长会话 + 多线程 + 异步恢复”组合场景
典型问题包括：
- stale session
- recovery mismatch
- duplicate process
- cursor drift
- retry sleep
- message drop
- output blocking

**参考价值**：  
> 要用状态机、幂等设计、可恢复日志、进程树治理来做底层架构，而不是只靠界面层修补。

---

如果你愿意，我可以继续把这份报告压缩成：
1. **一页纸管理层简报版**  
2. **适合 Slack/飞书群发的短版**  
3. **带“风险等级 / 建议跟进动作”的决策版**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

下面是一份基于你提供的数据、按**仓库热度序列 + 议题影响面**综合整理的 Claude Code Skills 社区热点报告。  
> 注：你给出的 PR 列表里“评论数”字段缺失，因此以下“热门”主要依据当前排序、问题影响范围与社区反复出现的主题综合判断。

---

## 1) 热门 Skills 排行（PR）

| 排名 | PR / Skill | 功能与社区关注点 | 当前状态 |
|---|---|---|---|
| 1 | [#1298 fix(skill-creator): run_eval.py always reports 0% recall](https://github.com/anthropics/skills/pull/1298) | 修复 skill-creator 的评估链路：`run_eval.py` 误报 0% recall，导致 `run_loop.py` / `improve_description.py` 在噪声上优化；还涉及 Windows 流读取、触发检测与并行 worker。社区焦点是“**技能优化工具本身是否可信**”。 | OPEN |
| 2 | [#1323 fix run_eval trigger detection misses real skill name](https://github.com/anthropics/skills/pull/1323) | 继续修复评估器触发检测：会漏掉真实 Skill 名称，并在遇到第一个非 Skill tool 时提前退出，直接影响描述优化闭环。讨论热点集中在“**评估器误判导致技能永远学不会触发**”。 | OPEN |
| 3 | [#1099 skill-creator: fix run_eval.py crash on Windows when reading from subprocess pipe](https://github.com/anthropics/skills/pull/1099) | 解决 Windows 上 `run_eval.py` 从子进程管道读取时崩溃的问题。社区关心的是 **Windows 可用性** 与“触发率 0%/评估失效”这类共性故障。 | OPEN |
| 4 | [#1050 skill-creator: fix Windows subprocess + encoding bugs](https://github.com/anthropics/skills/pull/1050) | 修复 Windows 下 `subprocess.Popen`、编码和命令解析问题。与 #1099 同属 Windows 兼容性热区，说明 **跨平台支持** 是高频痛点。 | OPEN |
| 5 | [#1367 feat(skills): add self-audit — mechanical verification + four-dimension reasoning quality gate](https://github.com/anthropics/skills/pull/1367) | 新增“自审”Skill：先做机械校验，再做多维推理质量门禁。社区关注点是 **输出可靠性、交付前检查、减少幻觉/漏文件**。 | OPEN |
| 6 | [#723 feat: add testing-patterns skill](https://github.com/anthropics/skills/pull/723) | 覆盖测试金字塔、单测、React 测试、E2E 等全栈测试实践。说明社区对 **“写测试/生成测试”** 的通用技能需求很强。 | OPEN |
| 7 | [#514 Add document-typography skill](https://github.com/anthropics/skills/pull/514) | 提供文档排版质量控制，解决 orphan/widow、编号对齐等问题。反映出社区对 **文档产出质量** 的关注已从“能生成”升级到“可交付”。 | OPEN |
| 8 | [#1302 Add color-expert skill](https://github.com/anthropics/skills/pull/1302) | 面向颜色命名、色彩空间和配色决策的专业技能。体现社区在 **细分知识型技能** 上的持续扩张需求。 | OPEN |

---

## 2) 社区需求趋势

从 Issues 看，社区最期待的方向主要集中在以下几类：

### A. Skills 评估/触发链路可靠性
- 代表问题：
  - [#556 run_eval.py: claude -p never triggers skills/commands (0% trigger rate)](https://github.com/anthropics/skills/issues/556)
  - [#1169 description-optimisation loop: recall=0% on every iteration](https://github.com/anthropics/skills/issues/1169)
- 趋势判断：大家非常在意 **Skill 是否真的能被触发、评估是否可信、优化闭环是否有效**。

### B. Windows 跨平台兼容
- 代表问题：
  - [#1061 Windows compatibility: skill-creator scripts fail](https://github.com/anthropics/skills/issues/1061)
  - 相关 PR：[#1099](https://github.com/anthropics/skills/pull/1099)、[#1050](https://github.com/anthropics/skills/pull/1050)
- 趋势判断：Skill 工具链当前仍偏 Unix-first，社区强烈希望 **Windows 能稳定运行**。

### C. 安全边界、信任与分发治理
- 代表问题：
  - [#492 Security: Community skills distributed under anthropic/ namespace enable trust boundary abuse](https://github.com/anthropics/skills/issues/492)
  - [#228 Enable org-wide skill sharing in Claude.ai](https://github.com/anthropics/skills/issues/228)
- 趋势判断：社区不仅想“能用”，更希望 **能安全地分发、共享和管理技能权限**。

### D. 通用生产力技能：文档、测试、审查、质量门禁
- 代表问题：
  - [#189 duplicate skills in document-skills and example-skills](https://github.com/anthropics/skills/issues/189)
  - [#1385 Reasoning Quality Gate Pipeline](https://github.com/anthropics/skills/issues/1385)
  - [#412 agent-governance](https://github.com/anthropics/skills/issues/412)
- 趋势判断：高需求不只是垂直技能，而是 **“能提升输出质量的基础型技能”**，比如测试生成、审查、自检、治理。

### E. 多格式文档与企业场景适配
- 代表问题：
  - [#1175 SharePoint Online documents via Agent Skills](https://github.com/anthropics/skills/issues/1175)
  - [#29 Usage with bedrock](https://github.com/anthropics/skills/issues/29)
  - [#16 Expose Skills as MCPs](https://github.com/anthropics/skills/issues/16)
- 趋势判断：社区希望 Skills 更容易接入 **企业文档系统、Bedrock、MCP 生态**。

---

## 3) 高潜力待合并 Skills

以下 PR 虽然都还是 OPEN，但从“问题明确、影响面大、修复必要性强”来看，最有机会近期落地：

1. [#1298 fix(skill-creator) run_eval recall 0% 问题](https://github.com/anthropics/skills/pull/1298)  
   核心评估链路修复，直接影响 skill-creator 的可信度。

2. [#1323 run_eval 触发检测修复](https://github.com/anthropics/skills/pull/1323)  
   与 #556 / #1169 高度相关，属于“评估器不能错”的关键补丁。

3. [#1099 Windows pipe 崩溃修复](https://github.com/anthropics/skills/pull/1099)  
   典型高优先级兼容性问题，且与多个 Windows issue 呼应。

4. [#1050 Windows subprocess + encoding 修复](https://github.com/anthropics/skills/pull/1050)  
   另一个高频兼容性补丁，适合与 #1099 一并推进。

5. [#538 pdf: 修正 SKILL.md 大小写文件引用](https://github.com/anthropics/skills/pull/538)  
   这是典型“文档/路径细节导致实装失败”的问题，修复成本低、收益高。

6. [#361 / #539 / #362 skill-creator 校验增强系列](https://github.com/anthropics/skills/pull/361)  
   这组 PR 聚焦 YAML special characters、UTF-8、前置校验，属于 **提升技能定义鲁棒性** 的基础设施改进。

---

## 4) Skills 生态洞察

**一句话总结：当前社区最集中的诉求是——让 Skills 从“可演示”走向“可可靠生产”，即评估可信、跨平台可用、安全可分发、并能显著提升交付质量。**

如果你愿意，我还可以继续把这份报告整理成：
- **PPT 风格 1 页摘要**
- **按“技术债 / 新技能 / 安全治理”三类的优先级清单**
- **适合发到 Slack / 飞书的短版周报**

---

# Claude Code 社区动态日报（2026-07-22）

## 1) 今日速览
今天 Claude Code 社区的反馈仍然高度集中在**稳定性与集成可用性**上：MCP/Claude Desktop、Chrome 扩展、VSCode、会话恢复与审批流程相关问题占据主流。  
同时，最新版本 v2.1.217 带来了两个偏“体验增强”的更新：**提示输入框支持 emoji 简写自动补全**，以及**转录文件写入失败时的告警**，说明产品在“易用性”和“数据持久化可观测性”上继续补课。

---

## 2) 版本发布

### v2.1.217
- **Emoji shortcode 自动补全**：在 prompt 输入框中输入 `:heart:` 可直接插入 ❤️，输入 `:hea` 可弹出候选；可通过 `emojiCompletionEnabled` 关闭。  
  链接：暂无单独 Release 页面，仅基于你提供的发布说明
- **转录写入失败告警**：当 transcript 写入失败（如磁盘满）或因继承配置导致 session saving 关闭时，新增 warning 提示。  
  链接：暂无单独 Release 页面，仅基于你提供的发布说明

---

## 3) 社区热点 Issues（精选 10 个）

> 选取标准：影响面大、与核心工作流相关、或代表当前社区高频痛点。

1. **[#79986 Claude Desktop MSIX: tools/call 不再发送到 MCP Server，Filesystem 工具全失效](https://github.com/anthropics/claude-code/issues/79986)**  
   - 重要性：直接影响 Claude Desktop 与本地 MCP 工具链，属于“核心集成断裂”级别问题。  
   - 社区反应：当前 0 评论，但问题描述清晰且复现链完整，属于高优先级兼容性故障。

2. **[#79985 claude-in-chrome 扩展重装后无法连接，提示 Browser extension is not connected](https://github.com/anthropics/claude-code/issues/79985)**  
   - 重要性：浏览器自动化链路失联，会直接影响 Claude in Chrome 场景。  
   - 社区反应：暂无评论，但属于典型的“重装/重启后连接状态丢失”问题，用户感知强。

3. **[#79983 MCP tool call 仍然报“requires approval”，即使已授权](https://github.com/anthropics/claude-code/issues/79983)**  
   - 重要性：审批状态机异常会让工具调用无法推进，影响所有依赖 MCP 的自动化流程。  
   - 社区反应：暂无评论；这类“已授权仍被拦截”的问题通常会被视为高阻断 bug。

4. **[#79982 所有会话中 TaskCreate/TaskUpdate/TaskList/TaskGet 工具不可用](https://github.com/anthropics/claude-code/issues/79982)**  
   - 重要性：任务管理工具失效，意味着内置任务流/规划能力不可用。  
   - 社区反应：暂无评论；属于功能级退化，可能影响大量日常使用者。

5. **[#79975 Claude Code 本地会话无法从 Claude App Code 视图恢复](https://github.com/anthropics/claude-code/issues/79975)**  
   - 重要性：跨端会话续接是“连续工作流”的关键体验，关系到 Code/桌面端协同。  
   - 社区反应：1 条评论，问题已关闭；说明这是一个明确需求，且有一定修复/处理进展。

6. **[#79980 安全分类器误报过多（false positives）](https://github.com/anthropics/claude-code/issues/79980)**  
   - 重要性：安全误报会直接打断正常编码，尤其在本地开发和游戏/脚本场景中。  
   - 社区反应：暂无评论；但这类问题通常会持续累积不满，是体验型高频痛点。

7. **[#79979 会话重启后模型降级](https://github.com/anthropics/claude-code/issues/79979)**  
   - 重要性：模型选择稳定性影响质量预期，尤其对付费用户和重度用户敏感。  
   - 社区反应：暂无评论；从描述看是“重启即变更模型”的状态保持问题。

8. **[#79972 Plan-review widget 展示旧计划，且重启后仍残留](https://github.com/anthropics/claude-code/issues/79972)**  
   - 重要性：计划审批展示错内容会破坏信任，属于高风险 UI/状态同步 bug。  
   - 社区反应：暂无评论；但“跨重启残留”说明状态持久化层可能有问题。

9. **[#79971 Claude Desktop：chat 触发的 tools/call 无法到达健康的本地 MCP（stdio）服务](https://github.com/anthropics/claude-code/issues/79971)**  
   - 重要性：即使服务健康、握手成功，调用仍不到达，属于“链路中段断流”。  
   - 社区反应：暂无评论；和 #79986 共同指向 MCP 调用链问题。

10. **[#79958 deep-research 在 token/spend 限额后无法续跑，会从零开始](https://github.com/anthropics/claude-code/issues/79958)**  
    - 重要性：长任务工作流不能断点续传，会造成明显的时间与成本浪费。  
    - 社区反应：暂无评论；但这是偏“生产力工作流”的关键能力缺口。

---

## 4) 重要 PR 进展（精选 10 个）

1. **[#79898 Add Claude apps gateway on AWS example deployment assets](https://github.com/anthropics/claude-code/pull/79898)**  
   - 内容：新增 AWS 上运行 Claude apps gateway 的示例部署资产，补齐云端部署参考。  
   - 价值：有助于企业用户和平台团队快速上手 AWS/Bedrock 部署。

2. **[#79889 fix(hookify): 让 hook 入口在没有 CLAUDE_PLUGIN_ROOT 时也能运行](https://github.com/anthropics/claude-code/pull/79889)**  
   - 内容：修复 hook 入口脚本对环境变量的强依赖。  
   - 价值：提升插件可移植性和本地调试稳定性。

3. **[#79873 fix(hookify): `event: prompt` 规则实际上读取的是 `prompt` 字段](https://github.com/anthropics/claude-code/pull/79873)**  
   - 内容：修正 prompt 规则事件字段名不一致导致的“规则永不触发”。  
   - 价值：这是典型逻辑 bug 修复，直接影响规则系统可用性。

4. **[#79647 fix(hookify): 让导入不再依赖插件目录名](https://github.com/anthropics/claude-code/pull/79647)**  
   - 内容：修复 Python 导入路径假设目录名固定的问题。  
   - 价值：降低插件部署约束，增强兼容性。

5. **[#79645 fix(hookify): 以 UTF-8 读取规则与 transcript 文件](https://github.com/anthropics/claude-code/pull/79645)**  
   - 内容：显式指定 UTF-8 编码，避免 Windows 默认编码导致的解析失败。  
   - 价值：明显的跨平台兼容性修复。

6. **[#79644 fix: 引用 `${CLAUDE_PLUGIN_ROOT}` 时加引号](https://github.com/anthropics/claude-code/pull/79644)**  
   - 内容：修复 macOS 路径包含空格时的 shell 词拆分问题。  
   - 价值：属于高频环境问题修复，影响插件命令稳定执行。

7. **[#79643 docs(commit-commands): 统一 /commit-push-pr 的说明与实际行为](https://github.com/anthropics/claude-code/pull/79643)**  
   - 内容：修正文档，明确该命令基于当前变更生成 PR 描述。  
   - 价值：减少用户误解，提升命令预期一致性。

8. **[#79642 docs(plugin-dev): 修正 marketplace 名称为 claude-code-plugins](https://github.com/anthropics/claude-code/pull/79642)**  
   - 内容：修正文档中的 marketplace 名称。  
   - 价值：减少插件安装路径和文档不一致带来的困惑。

9. **[#79640 fix(ralph-wiggum): 使用 disable-model-invocation 保持命令只由用户执行](https://github.com/anthropics/claude-code/pull/79640)**  
   - 内容：修复命令 frontmatter 标记使用错误。  
   - 价值：保障命令执行边界，避免模型意外介入。

10. **[#79636 fix(hookify): 示例规则文件补上 hookify. 前缀](https://github.com/anthropics/claude-code/pull/79636)**  
    - 内容：修复示例文件命名与加载规则不一致。  
    - 价值：降低新用户配置失败概率，改善上手体验。

---

## 5) 功能需求趋势

从今日 Issues 看，社区关注点主要集中在以下几条主线：

1. **MCP / Desktop / Chrome 集成稳定性**
   - 大量问题围绕 `tools/call`、浏览器扩展连接、桌面端桥接失败展开。  
   - 说明 Claude Code 的价值越来越依赖外部工具链，但集成链路稳定性仍是核心短板。

2. **会话连续性与状态恢复**
   - 包括会话恢复、deep-research 断点续传、plan-review 残留、session restart 后模型变化。  
   - 用户希望“长任务可恢复、跨端可接续、状态一致”。

3. **安全/审批机制的误拦截**
   - 安全分类器误报、MCP 需要 approval 但已授权仍失败、文档解析被误判为 cybersecurity。  
   - 说明社区对“少打断、少误报”的诉求很强。

4. **内置工具与命令可用性**
   - Task 工具缺失、slash command 大小写敏感、命令可发现性不足。  
   - 用户希望 CLI 更像一个稳定的生产力平台，而不是“偶发性可用”。

5. **插件/Hookify 生态修复**
   - PR 大量集中在 hookify 的路径、编码、环境变量、命名问题。  
   - 表明插件系统正在扩展，但工程化细节仍需打磨。

---

## 6) 开发者关注点

### 主要痛点
- **集成链路脆弱**：Desktop、Chrome、MCP、1Password 等外部依赖一旦断开，用户几乎无法继续工作。
- **状态一致性不足**：会话恢复、计划预览、模型选择、审批状态等问题反复出现，说明状态持久化与同步机制值得重点排查。
- **安全策略误伤**：误报会直接损害信任，尤其是本地开发、游戏开发、文档解析等“正常业务”场景。
- **长任务恢复能力不足**：deep-research 等工作流一旦超限就从零开始，浪费时间和 token。
- **交互细节影响效率**：命令大小写、输入补全、复制空白字符、Vim mode 行为等都在影响重度用户体验。

### 高频需求
- 更稳定的 **MCP 调用与工具审批**；
- 更可靠的 **跨端会话恢复**；
- 更少误报的 **安全/内容分类**；
- 更完善的 **插件与 hook 生态**；
- 更清晰的 **命令发现性与文档一致性**。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合公众号/内部周报的正式版**，或  
2. **更偏产品/研发管理视角的简报版**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

以下是 **2026-07-22** 的 OpenAI Codex 社区动态日报（基于 `github.com/openai/codex` 过去 24 小时数据）。

## 1. 今日速览
过去 24 小时 **没有新 Releases**，社区讨论几乎完全聚焦在 **稳定性与性能治理**：尤其是 Windows Desktop/CLI 的进程清理、WMI 轮询、沙箱权限和子进程回收问题。  
另一方面，**IDE/跨端一致性** 依然是高频痛点，包括 Xcode 登录、会话消息同步、线程搜索和新聊天卡顿等。整体看，Codex 的关注点正在从“功能扩张”转向“工程化加固”。

## 3. 社区热点 Issues

- [#34614 Windows 26.715: duplicate MCP suites accumulate per session](https://github.com/openai/codex/issues/34614)  
  重要性：MCP suite 在同一会话中持续累积，且终止路径未正确清理子进程，属于典型的资源泄漏/僵尸进程问题。  
  社区反应：**2 条评论、1 个赞**，说明这是能被明确复现且影响较大的平台问题。

- [#34606 macOS: Simulator workflows can exhaust RAM and disk](https://github.com/openai/codex/issues/34606)  
  重要性：模拟器工作流可能耗尽内存和磁盘，直接威胁整机稳定性，属于高风险故障。  
  社区反应：**2 条评论**，问题描述集中，影响面很实在。

- [#34639 Codex login in Xcode doesn't work](https://github.com/openai/codex/issues/34639)  
  重要性：Xcode 扩展登录失败会阻断 IDE 首次使用，是典型的入口级问题。  
  社区反应：**2 条评论**，说明认证/回调链路在 Apple 生态下仍有明显兼容性风险。

- [#34627 Severe multi-minute tool latency and inconsistent writable-root permissions in Codex Desktop on Windows](https://github.com/openai/codex/issues/34627)  
  重要性：工具调用分钟级延迟叠加写入根权限不稳定，直接影响 agent 执行吞吐。  
  社区反应：**1 条评论、1 个赞**，属于“影响不小、共鸣明确”的高优先级问题。

- [#34594 Codex desktop app (Windows) pins CPU via WMI](https://github.com/openai/codex/issues/34594)  
  重要性：后台 WMI 轮询失控导致高 CPU，占用与其他 Windows 性能问题形成同类簇。  
  社区反应：**1 条评论**，但症状很明确，且容易在长时间运行中放大。

- [#34579 Codex Desktop spawns hundreds of lingering taskkill.exe processes during agent work](https://github.com/openai/codex/issues/34579)  
  重要性：大量 `taskkill.exe` 残留最终可把 Windows 会话拖到不可用，属于系统级高危故障。  
  社区反应：**1 条评论**，但问题严重度很高。

- [#34575 Windows elevated sandbox loses logon session](https://github.com/openai/codex/issues/34575)  
  重要性：提权沙箱丢失 logon session 会导致反复重试、额外额度消耗，涉及安全上下文与成本控制。  
  社区反应：**1 条评论**，偏底层但对生产使用影响明显。

- [#34572 App freezes for 3-10 seconds shortly after opening any new chat](https://github.com/openai/codex/issues/34572)  
  重要性：新聊天卡顿直接影响首屏体验，是用户最容易感知的交互抖动之一。  
  社区反应：**1 条评论、2 个赞**，说明该体验问题共鸣较强。

- [#34599 Messages sent during active work can be dropped instead of steering or queuing](https://github.com/openai/codex/issues/34599)  
  重要性：活跃工作中的消息丢失会破坏“人机协同”的会话连续性，属于核心交互可靠性问题。  
  社区反应：**1 条评论**，反映的是状态同步/排队机制不稳定。

- [#34619 Restore GPT-5.6 Sol’s 372k Codex context window](https://github.com/openai/codex/issues/34619)  
  重要性：长上下文能力是高级用户处理大仓库、大任务的关键诉求，也直接影响模型适用边界。  
  社区反应：**1 条评论**，属于能力诉求而非单点 bug，代表高阶用户期待。

## 4. 重要 PR 进展

- [#34629 Harden Windows elevated sandbox startup](https://github.com/openai/codex/pull/34629)  
  强化 Windows 提权沙箱启动流程，修复 writable-root 权限检查和 ACL 刷新问题，降低启动失败与权限漂移风险。

- [#34624 Terminate Windows process trees with job objects](https://github.com/openai/codex/pull/34624)  
  用 Job Object 管理 Windows 进程树终止，重点解决子进程回收不彻底的问题，对付僵尸进程特别关键。

- [#34625 Fix Windows TUI navigation key handling](https://github.com/openai/codex/pull/34625)  
  修复 Windows TUI 导航键处理，解决终端输入模式下方向键被当作转义字节的问题。

- [#34636 Keep the TUI open when starting a turn fails](https://github.com/openai/codex/pull/34636)  
  将 turn 启动失败改为可见错误而不是直接退出 TUI，提升交互容错与会话可恢复性。

- [#34630 Add a policy-aware HTTP client builder](https://github.com/openai/codex/pull/34630)  
  引入策略感知的 HTTP client builder，统一默认头、重定向、cookie 和诊断能力，减少底层 `reqwest` 分散使用。

- [#34631 Migrate agent identity to the shared HTTP client](https://github.com/openai/codex/pull/34631)  
  将 agent identity、任务注册和 JWKS 请求迁移到共享 HTTP client，增强网络栈一致性与重试分类。

- [#34641 Harden managed proxy setup for sandboxed executions](https://github.com/openai/codex/pull/34641)  
  修复 sandbox 内代理桥接路径、环境变量转发与目录可见性，提升受限环境下的联网稳定性。

- [#34603 Allow explicitly permitted loopback proxy targets](https://github.com/openai/codex/pull/34603)  
  放开显式允许的 loopback/private IP 代理目标，让本地 allowlist 在 `allow_local_binding=false` 场景下真正生效。

- [#34605 Allow naming sessions with `/new` and `/clear`](https://github.com/openai/codex/pull/34605)  
  允许在 `/new`、`/clear` 时附带会话名，改善多会话管理与任务切换体验。

- [#34620 Add exec-server network policy callback types](https://github.com/openai/codex/pull/34620)  
  为网络请求增加 allow/deny/ask 回调类型，使 exec-server 能更细粒度地执行网络策略决策。

## 5. 功能需求趋势
- **Windows 平台稳定性与性能治理**：`WMI`、`taskkill.exe`、`job object`、沙箱启动/终止等问题和 PR 同时高频出现，说明 Windows 端已是当前最需要“系统级修复”的区域。  
  代表链接：[#34594](https://github.com/openai/codex/issues/34594)、[#34579](https://github.com/openai/codex/issues/34579)、[#34614](https://github.com/openai/codex/issues/34614)、[#34624](https://github.com/openai/codex/pull/34624)

- **IDE/桌面端集成一致性**：Xcode 登录、消息丢失、线程搜索不准、聊天卡顿等问题，显示用户对“可用、可恢复、可追踪”的桌面体验要求很高。  
  代表链接：[#34639](https://github.com/openai/codex/issues/34639)、[#34599](https://github.com/openai/codex/issues/34599)、[#34638](https://github.com/openai/codex/issues/34638)、[#34572](https://github.com/openai/codex/issues/34572)

- **沙箱、权限与网络策略精细化**：提权沙箱、代理桥接、loopback allowlist、网络策略回调等内容密集出现，说明平台正在朝“更可控的执行边界”演进。  
  代表链接：[#34575](https://github.com/openai/codex/issues/34575)、[#34629](https://github.com/openai/codex/pull/34629)、[#34641](https://github.com/openai/codex/pull/34641)、[#34620](https://github.com/openai/codex/pull/34620)

- **长上下文与模型能力开关**：用户明确要求恢复更大的上下文窗口，说明大项目场景下的“长记忆”仍是重要购买点。  
  代表链接：[#34619](https://github.com/openai/codex/issues/34619)、[#34621](https://github.com/openai/codex/pull/34621)（相关上下文加载改进）

- **会话管理与可恢复性**：命名会话、TUI 保持打开、转写/排队机制、远端 turn 同步等需求表明，用户正在把 Codex 当作持续工作台，而非一次性问答工具。  
  代表链接：[#34605](https://github.com/openai/codex/pull/34605)、[#34636](https://github.com/openai/codex/pull/34636)、[#34632](https://github.com/openai/codex/issues/34632)

## 6. 开发者关注点
- **子进程和资源回收**：Windows 端的子进程树、WMI 轮询、`taskkill.exe` 残留，说明“干净退出”和“后台任务不失控”是当前最关键的工程问题。  
- **权限/会话边界**：提权沙箱、logon session、可写根目录、代理 SID 等反馈，表明权限模型和执行边界已经进入高频调试区。  
- **跨端状态同步**：Xcode 登录、VS Code 消息队列、远端 turn 渲染、线程搜索等问题，都指向同一个痛点——客户端和 app-server 的状态一致性仍需加强。  
- **默认体验的性能抖动**：打开新聊天、启动发现流程、模拟器工作流、浏览器 viewport 等“开箱即用”路径上的卡顿/阻塞，正在成为用户最先感知的质量门槛。  
- **可配置性与高级能力诉求**：更大上下文窗口、会话命名、外部 skill provider、网络策略回调，说明高级用户希望 Codex 更像一个可编排的平台，而不仅是单一模型入口。  

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发 Slack/飞书的短版**，或  
2. **按“产品 / 平台 / 安全 / 性能”分类的管理层简报版**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-07-22）

## 1) 今日速览
过去 24 小时内，Gemini CLI 社区的讨论焦点仍集中在**认证链路稳定性**与**模型/提供方兼容性**上：一条 P1 级 Issue 指向 OAuth 登录弃用错误与聊天中的“幻觉式包名”，另一条则明确提出希望支持 OpenAI-compatible 与开源模型。  
PR 侧则出现了与**认证回退修复**、**遥测增强**、**时区相关变更**以及**依赖安全升级**相关的更新，说明项目当前既在补稳定性短板，也在持续完善可观测性与维护性。

---

## 2) 版本发布
**过去 24 小时无新 Releases。**

---

## 3) 社区热点 Issues

> 说明：过去 24 小时内仅更新 2 条 Issue，以下为全部重点项。

### 1. [#28473] OAuth login deprecation error and package hallucination in chat interface
- 链接：<https://github.com/google-gemini/gemini-cli/issues/28473>
- 重要性：这是一个 **P1 / agent / bug** 级问题，且同时涉及**登录不可用**和**模型输出错误**两类核心体验，影响面较大。
- 社区反应：当前已有 **1 条评论**，并被打上 `manual-triage`、`need-information`，说明维护者已注意到问题，但仍需要更多环境信息来定位。
- 关注点：Free individual account 的 OAuth 认证已出现弃用/迁移提示，意味着认证入口可能正处于平台切换期。

### 2. [#28477] Support OpenAI-compatible and open-source LLM providers alongside Gemini
- 链接：<https://github.com/google-gemini/gemini-cli/issues/28477>
- 重要性：这是一个典型的**能力扩展型需求**，直接关系到 Gemini CLI 是否能成为更通用的终端 AI Agent。
- 社区反应：目前是 `need-triage`，**0 评论、0 👍**，但问题本身非常明确，反映出用户对**多模型/多供应商接入**的强烈期待。
- 关注点：如果后续落地，可能需要统一 provider 抽象层，并兼顾 OpenAI-compatible 接口与本地/开源模型的调用体验。

---

## 4) 重要 PR 进展

> 说明：过去 24 小时内仅更新 4 条 PR，以下为全部重点项。

### 1. [#28472] fix(core): sequentially verify cached credentials and restore GOOGLE_APPLICATION_CREDENTIALS fallback
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28472>
- 状态：OPEN
- 内容：修复认证回退回归问题，重点是**按顺序验证缓存凭据**并恢复 `GOOGLE_APPLICATION_CREDENTIALS` 兜底逻辑。
- 价值：这是典型的高优先级稳定性修复，直接关联 Agent Mode 中的认证失败与进程异常退出。

### 2. [#28474] feat(core): add skill name dimension to tool call telemetry
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28474>
- 状态：OPEN
- 内容：为工具调用遥测新增 `skill_name` 维度，便于分析技能激活与工具调用路径。
- 价值：有助于提升产品可观测性，为后续优化 Agent 行为、技能使用分析和企业级诊断提供数据基础。

### 3. [#28475] Time changes
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28475>
- 状态：CLOSED
- 内容：标题较宽泛，但属于已完成的时间相关变更。
- 价值：这类改动通常与时区、时间格式或调度逻辑有关，可能影响日志、测试或用户可见时间显示。

### 4. [#28476] chore(deps): bump body-parser from 2.2.2 to 2.3.0
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28476>
- 状态：CLOSED
- 内容：升级 `body-parser`，覆盖到上游安全/修复版本。
- 价值：属于常规依赖维护，但对降低安全风险、保持依赖健康度很重要。

---

## 5) 功能需求趋势
从当前 Issue 看，社区最关注的功能方向主要有三类：

1. **认证与账户体系稳定性**
   - OAuth 登录弃用、凭据回退、Agent Mode 认证失败等问题，说明用户对“能否稳定登录并持续工作”非常敏感。
   - 这类问题一旦出现，会直接阻断使用路径，优先级通常高于一般功能优化。

2. **多模型 / 多提供方支持**
   - 用户明确提出希望支持 OpenAI-compatible 及开源 LLM provider。
   - 这代表 Gemini CLI 的用户群正在从“只用 Gemini”向“统一接入多模型”演进。

3. **Agent 输出质量与工具调用可靠性**
   - Issue 中提到聊天界面出现 package hallucination，说明用户对**工具调用、依赖识别、代码建议准确性**的要求在提高。
   - 与 PR 中的 telemetry 增强形成呼应，表明项目正在向更精细化的 Agent 行为分析推进。

---

## 6) 开发者关注点
开发者反馈中可归纳出以下高频痛点：

- **认证链路脆弱**：OAuth/凭据回退一旦失效，会导致 Agent 无法启动或退出异常。
- **环境兼容性问题突出**：`GOOGLE_APPLICATION_CREDENTIALS` 回退恢复说明用户在本地/企业环境中的配置差异较大。
- **希望更强的模型抽象层**：多 provider 支持需求说明现有架构可能较偏向 Gemini 单一生态。
- **需要更好的可观测性**：skill_name 级遥测表明维护者与用户都需要更细粒度的数据来分析 Agent 行为。
- **基础依赖与平台变更仍需持续维护**：依赖升级和时间相关变更反映出项目在保持工程健康度上仍有持续投入。

如需，我也可以把这份日报进一步整理成：
- **适合发群的极简版**
- **面向管理层的摘要版**
- **带趋势图表/标签统计的分析版**

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报  
**日期：2026-07-22**  
**数据源：github.com/github/copilot-cli**

## 1) 今日速览
Copilot CLI 今日最重要的变化是发布了 **v1.0.74-0**，重点增强了 **Plan Mode 的模型选择能力**，并优化了 **Resume 搜索对会话标题空白差异的匹配**。  
社区讨论仍然集中在 **MCP 集成、远程认证、会话稳定性、终端输入/渲染兼容性** 等问题上，说明产品正快速走向深度工作流集成，但稳定性与可用性仍是核心关注点。

## 2) 版本发布
- **[v1.0.74-0](https://github.com/github/copilot-cli/releases/tag/v1.0.74-0)**  
  - 新增 **`/model plan`**（或 `/model --plan`）：可为 Plan Mode 单独选择模型；支持传入 model id、`off` 清除，或不传入以打开选择器。离开 Plan Mode 后会回到会话模型。  
  - 改进 **Resume 搜索**：当会话标题存在空白差异时也能正确匹配。

## 3) 社区热点 Issues
以下是过去 24 小时内最值得关注的 10 个 Issue：

1. **[#4207 - Show per-subagent AI credit usage breakdown in /usage](https://github.com/github/copilot-cli/issues/4207)**  
   关注点：用户希望在 `/usage` 中区分主代理与子代理、后台任务的 AI credit 消耗。  
   为什么重要：这直接影响成本透明度与团队使用治理。  
   社区反应：**5 个 👍**，说明需求明确且优先级较高。

2. **[#4208 - Support explicit inline custom agent invocation and agent chaining within prompts](https://github.com/github/copilot-cli/issues/4208)**  
   关注点：希望在同一 prompt 中显式调用指定自定义 agent，并支持链式编排。  
   为什么重要：这是自定义 agent 从“可用”走向“可编排”的关键一步。  
   社区反应：**3 个 👍**，表明用户对 agent 工作流编排需求强烈。

3. **[#4206 - Environment footer stuck on "Loading:" forever when built-in GitHub MCP handshake stalls under org MCP policy](https://github.com/github/copilot-cli/issues/4206)**  
   关注点：组织级 MCP 策略下握手卡住，环境状态长期停留在 Loading。  
   为什么重要：影响启动体验和环境状态可信度，属于高感知卡点。  
   社区反应：**1 个评论、1 个 👍**，属于已有实际复现的稳定性问题。

4. **[#4203 - Remote MCP (OAuth): expired access token forces interactive re-auth instead of silent refresh_token grant](https://github.com/github/copilot-cli/issues/4203)**  
   关注点：access token 过期后未尝试 refresh_token，而是强制交互式登录。  
   为什么重要：远程 MCP 场景中这会打断自动化与长时间会话。  
   社区反应：当前无明显互动数据，但问题直指 OAuth 会话续期机制。

5. **[#4205 - Registry policy rejects MCP configs that add required runtime headers](https://github.com/github/copilot-cli/issues/4205)**  
   关注点：组织 registry/allowlist 与本地运行时 header 冲突，导致 MCP 配置被拒。  
   为什么重要：涉及企业环境下的合规与可接入性，是典型企业痛点。  
   社区反应：暂无评论/点赞，但问题面向企业部署场景，影响面较广。

6. **[#4211 - Copilot CLI couldn't handle BigInt in structured MCP response](https://github.com/github/copilot-cli/issues/4211)**  
   关注点：MCP 返回 BigInt 时序列化失败，导致任务中断。  
   为什么重要：这是典型的协议/数据兼容性缺陷，会直接造成执行失败。  
   社区反应：暂无互动，但属于高优先级运行时错误。

7. **[#4202 - Built-in view reports Path does not exist for existing files in 1.0.73; 1.0.71 succeeds](https://github.com/github/copilot-cli/issues/4202)**  
   关注点：`view` 工具在 1.0.73 出现回归，已存在文件被误判为不存在。  
   为什么重要：这是明显的版本回归，会影响基础读文件能力。  
   社区反应：暂无互动，但带有明确版本对比，定位价值高。

8. **[#4199 - Stale sessions keep running an old deleted binary after an in-CLI update, and idle sessions never trim their heap](https://github.com/github/copilot-cli/issues/4199)**  
   关注点：CLI 内更新后旧会话继续跑被删除的 binary，且空闲会话内存不回收。  
   为什么重要：同时涉及升级可靠性与长期运行内存占用。  
   社区反应：暂无互动，但属于“多标签页长期使用”场景的关键问题。

9. **[#4213 - copilot cli drops enter and other key events when the terminal pane is unfocused](https://github.com/github/copilot-cli/issues/4213)**  
   关注点：终端窗格失焦时丢失 Enter 等按键事件。  
   为什么重要：影响自动化、pty 代理和多窗格工作流。  
   社区反应：暂无互动，但对工具集成生态影响较大。

10. **[#4198 - Ctrl+G fails to open $EDITOR during ask_user prompts](https://github.com/github/copilot-cli/issues/4198)**  
    关注点：在 `ask_user` 交互中，Ctrl+G 未能按预期打开编辑器。  
    为什么重要：属于交互一致性问题，直接影响复杂输入体验。  
    社区反应：暂无互动，但对高频交互用户很敏感。

## 4) 重要 PR 进展
- **过去 24 小时暂无 PR 更新**  
  由于当前周期内 PR 数量为 **0**，本日报不单列 PR 进展。  
  参考仓库：**[github.com/github/copilot-cli/pulls](https://github.com/github/copilot-cli/pulls)**

## 5) 功能需求趋势
从本次 Issues 主题看，社区需求主要集中在以下方向：

- **MCP 能力增强与兼容性**  
  包括 OAuth 刷新、registry policy、runtime headers、BigInt 结构化响应等。  
  代表链接：**[#4203](https://github.com/github/copilot-cli/issues/4203)**、**[#4205](https://github.com/github/copilot-cli/issues/4205)**、**[#4211](https://github.com/github/copilot-cli/issues/4211)**

- **自定义 agent 编排与工具扩展**  
  用户希望显式调用 agent、支持链式编排、扩展 skill/tool alias。  
  代表链接：**[#4208](https://github.com/github/copilot-cli/issues/4208)**、**[#4209](https://github.com/github/copilot-cli/issues/4209)**

- **可观测性与用量透明**  
  用户希望拆分主代理/子代理/后台任务的费用与使用明细。  
  代表链接：**[#4207](https://github.com/github/copilot-cli/issues/4207)**

- **Plan Mode / 模型控制**  
  新版已开始支持 Plan Mode 单独选模型，说明“按场景选模型”是明确方向。  
  代表链接：**[v1.0.74-0](https://github.com/github/copilot-cli/releases/tag/v1.0.74-0)**

- **终端与会话体验稳定性**  
  tmux、失焦窗格、键盘事件、编辑器快捷键、prompt 可见性等问题持续出现。  
  代表链接：**[#4212](https://github.com/github/copilot-cli/issues/4212)**、**[#4213](https://github.com/github/copilot-cli/issues/4213)**、**[#4198](https://github.com/github/copilot-cli/issues/4198)**

- **版本回归与长会话资源管理**  
  1.0.73 相关回归、旧 binary 残留、内存不回收，说明多会话与升级流程仍需加强。  
  代表链接：**[#4202](https://github.com/github/copilot-cli/issues/4202)**、**[#4199](https://github.com/github/copilot-cli/issues/4199)**

## 6) 开发者关注点
- **企业级 MCP 集成的“最后一公里”问题**：认证刷新、策略允许、header 注入、远程 server 恢复等仍是主要痛点。  
  相关：**[#4203](https://github.com/github/copilot-cli/issues/4203)**、**[#4205](https://github.com/github/copilot-cli/issues/4205)**、**[#4206](https://github.com/github/copilot-cli/issues/4206)**

- **交互稳定性比功能新增更敏感**：tmux 渲染、按键丢失、`Ctrl+G`、prompt 可读性等属于高频使用场景，一旦出问题会显著影响口碑。  
  相关：**[#4212](https://github.com/github/copilot-cli/issues/4212)**、**[#4213](https://github.com/github/copilot-cli/issues/4213)**、**[#4198](https://github.com/github/copilot-cli/issues/4198)**

- **可编排的 agent 工作流需求正在上升**：用户不只想“用 agent”，更想“选择、串联、复用 agent”。  
  相关：**[#4208](https://github.com/github/copilot-cli/issues/4208)**、**[#4209](https://github.com/github/copilot-cli/issues/4209)**

- **成本可见性成为团队落地门槛**：当子代理、后台任务、自动化调用增多后，usage 明细需求会迅速放大。  
  相关：**[#4207](https://github.com/github/copilot-cli/issues/4207)**

- **版本回归与长期会话管理需要继续补强**：用户已经在真实多标签页、远程环境、长时间运行场景中暴露出稳定性问题。  
  相关：**[#4202](https://github.com/github/copilot-cli/issues/4202)**、**[#4199](https://github.com/github/copilot-cli/issues/4199)**

如果你需要，我也可以把这份日报进一步整理成：
1. **适合发 Slack/飞书的短版**，或  
2. **适合团队周报的分析版**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报  
**日期：2026-07-22**  
**数据来源：MoonshotAI/kimi-cli**

## 1) 今日速览
今天没有新版本发布，社区讨论几乎全部集中在 **CLI 核心可用性问题** 上：输入交互、shell 模式输出控制，以及 **k2.5 模型的 tool calling / goal mode 稳定性**。  
从更新情况看，Issue 以高优先级 bug 为主，且都尚未获得评论或点赞，说明问题已被提交但仍处于待验证、待修复阶段。  
同时有 1 个针对 shell 执行阻塞的 PR，方向上与今日高频反馈高度一致，体现出项目当前的修复重心在 **执行链路稳定性**。

---

## 2) 版本发布
**无新版本发布。**

---

## 3) 社区热点 Issues
> 注：今日仅有 3 条更新 Issues，以下为全部纳入；由于未达到 10 条，已按重要性完整列出。

### 1. #2527 - k2.5 模型 tool calling 完全失效 + goal mode 无限循环（必现）
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2527
- **为什么重要**：这是最影响核心能力的 bug 之一，直接涉及 **模型工具调用链路** 和 **Goal Mode** 的任务闭环能力。若 tool calling 失效，CLI 的自动化能力基本被削弱；若 goal mode 死循环，会严重影响稳定性与可控性。
- **社区反应**：当前 **0 评论 / 0 👍**，但问题描述详细、复现路径明确，属于高优先级待修复问题。
- **关注点**：k2.5 模型兼容性、工具注册/映射、目标模式退出条件。

### 2. #2528 - shell mode 下输出过长
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2528
- **为什么重要**：shell mode 是 CLI 的高频场景，输出过长通常意味着 **命令结果未正确截断、流式输出处理不当或回显逻辑异常**，会直接影响可读性与终端体验。
- **社区反应**：当前 **0 评论 / 0 👍**，但该类问题往往与 shell 执行框架相关，且容易引发连带故障。
- **关注点**：shell 输出边界、日志截断策略、交互模式下的信息展示控制。

### 3. #2529 - Windows 右侧数字小键盘点击后输入框无反应
- **链接**：https://github.com/MoonshotAI/kimi-cli/issues/2529
- **为什么重要**：这是典型的 **平台兼容性 / 输入事件处理** 问题，直接影响 Windows 用户的基础输入体验。对 CLI 类产品而言，输入失效属于首要可用性缺陷。
- **社区反应**：当前 **0 评论 / 0 👍**，但问题描述已指出疑似是按键事件监听缺失，定位方向较明确。
- **关注点**：Windows 事件监听、键盘布局兼容、数字小键盘输入链路。

---

## 4) 重要 PR 进展
> 今日仅有 1 条更新 PR，以下全部纳入。

### 1. #2530 - fix(shell): stop blocking until timeout when a detached child holds the pipes
- **链接**：https://github.com/MoonshotAI/kimi-cli/pull/2530
- **功能/修复内容**：修复 foreground shell 路径中，`_run_shell_command` 在等待 stdout/stderr EOF 时被 **detached child 进程占用管道**，从而一直阻塞到超时的问题。
- **为什么重要**：这是一个直接影响 shell 执行体验的修复，能够避免“命令已完成但 CLI 迟迟不返回”的卡死感，提升 shell mode 的响应速度与可靠性。
- **相关性**：与 Issue #2528 的“shell mode 输出/行为异常”属于同一类执行链路问题，表明 shell 子系统是当前重点修复区域。

---

## 5) 功能需求趋势
从今日更新的 Issues 看，社区关注点主要集中在以下方向：

1. **模型工具调用稳定性**
   - 代表问题：#2527
   - 说明：用户最关心的是模型能否正确触发工具、执行任务并退出循环，而不是仅仅“能对话”。

2. **Shell / 命令执行体验**
   - 代表问题：#2528、#2530
   - 说明：shell mode 的输出长度、阻塞、管道处理，直接决定 CLI 的实用性与可靠性。

3. **跨平台输入兼容性**
   - 代表问题：#2529
   - 说明：Windows 键盘事件处理仍存在边缘兼容问题，说明输入层仍需强化测试覆盖。

4. **Goal Mode 的可控性**
   - 代表问题：#2527
   - 说明：用户对自动执行流程的期望是“可完成、可退出、可预期”，死循环是强烈负反馈。

---

## 6) 开发者关注点
结合今日反馈，开发者侧最值得关注的痛点有：

- **工具调用映射与执行层一致性不足**
  - k2.5 的 tool calling “完全失效”说明模型输出与执行器解析之间可能存在协议兼容问题。

- **Shell 子进程与管道生命周期管理**
  - detached child 持有 pipes 导致阻塞，说明 shell 执行逻辑需要更严格地处理进程组、EOF 判断和超时策略。

- **输入事件在 Windows 下的覆盖不完整**
  - 数字小键盘点击无响应表明键盘输入监听可能未覆盖所有按键来源或平台差异。

- **输出控制策略需要更清晰**
  - shell mode 输出过长通常会影响可读性和终端交互，需要明确截断、折叠或分页机制。

- **高风险 bug 以“零反馈”状态出现**
  - 今日所有 Issue 均无评论/点赞，建议团队对这类明确可复现的问题快速分级和响应，避免积压。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发飞书/企业微信群的短版**，或  
2. **适合内部周报的分析版**。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-07-22）

## 1. 今日速览
今天社区讨论几乎全部围绕“稳定性”和“跨平台可用性”展开：上游 provider 拦截、401 鉴权失败、全模型内部错误、TUI/桌面端卡顿或挂起，是最集中的反馈。另一方面，Web/Desktop 配置一致性、工作区/会话管理、权限开关与多语言 UI 兼容，也持续获得关注。  
**今日无新 Releases。**

## 2. 社区热点 Issues

1. **[#38190 Request blocked by upstream provider.](https://github.com/anomalyco/opencode/issues/38190)**  
   已关闭；**7 条评论、3 个赞**。这是今天最热的报错之一，直接影响写消息/继续对话，说明上游 provider 的可用性或鉴权链路仍是高优先级问题。

2. **[#38195 401 AuthError: Request blocked by upstream provider](https://github.com/anomalyco/opencode/issues/38195)**  
   开放中；**1 条评论、3 个赞**。与 #38190 同类问题，但明确指向 Go 订阅模型在 Desktop/Hermes 中统一失败，社区对“付费模型不可用”反应明显。

3. **[#38131 Too many internal server errors and prompt failures across ALL AI models](https://github.com/anomalyco/opencode/issues/38131)**  
   已关闭；**2 条评论**。问题覆盖所有模型，说明不是单一供应商故障，而是请求链路或运行时稳定性出现更广泛的异常。

4. **[#38124 Web: existing profiles are not eligible for the layout transition toggle](https://github.com/anomalyco/opencode/issues/38124)**  
   开放中；**3 条评论、1 个赞**。Web 端老账号无法获得布局切换资格，属于典型“状态迁移/灰度逻辑”问题，影响新旧 UI 过渡体验。

5. **[#38140 [Windows] @ai-sdk/openai-compatible cannot connect to localhost:9877](https://github.com/anomalyco/opencode/issues/38140)**  
   开放中；**2 条评论**。Windows 上 Bun fetch 无法连 localhost，但 Node fetch 正常，暴露出嵌入式运行时在本地连接上的兼容性风险。

6. **[#38154 Desktop 1.18.4: Settings "Auto-accept permissions" is disconnected from runtime auto-accept](https://github.com/anomalyco/opencode/issues/38154)**  
   已关闭；**2 条评论**。权限开关“看起来开了但运行时没生效”，是高风险 UX/安全配置问题，容易造成用户误判。

7. **[#38151 select project path not match work path](https://github.com/anomalyco/opencode/issues/38151)**  
   已关闭；**2 条评论**。项目选择路径与实际工作路径不一致，会直接影响文件修改上下文，属于严重的“工作区指向错误”。

8. **[#38163 [FEATURE]: auto-name new sessions from first message content](https://github.com/anomalyco/opencode/issues/38163)**  
   开放中；**2 条评论**。会话默认命名不可区分，用户对“自动命名”的需求反映出会话管理进入高频使用阶段。

9. **[#38113 Serve doesn't meaningfully separate worktrees](https://github.com/anomalyco/opencode/issues/38113)**  
   开放中；**2 条评论**。worktree 没有明显隔离标识，容易混淆分支/目录上下文，是面向多任务开发者的关键可用性问题。

10. **[#38201 TUI input frozen when project contains large binary files](https://github.com/anomalyco/opencode/issues/38201)**  
    开放中；**1 条评论**。大体积二进制文件导致 TUI 输入冻结，属于“性能 + 索引/扫描策略”类严重卡顿问题，实际影响可用性。

## 3. 重要 PR 进展

1. **[#38204 fix(core): await initial Copilot model sync](https://github.com/anomalyco/opencode/pull/38204)**  
   解决 Copilot 模型同步时序问题，避免在远端模型列表返回前暴露内置模型，减少初始化阶段的错配风险。

2. **[#38198 fix(acp): stage file edits for native review instead of writing twice](https://github.com/anomalyco/opencode/pull/38198)**  
   优化原生 review 流程，避免文件编辑重复写入，属于典型的可靠性与数据一致性修复。

3. **[#38194 fix(opencode): skip tui migration when tui.jsonc exists](https://github.com/anomalyco/opencode/pull/38194)**  
   修复 TUI 配置迁移逻辑，避免在已有 `tui.jsonc` 时仍强制重建 `tui.json`，直接对应社区问题 #38167。

4. **[#38184 fix(core): discover Copilot API endpoint](https://github.com/anomalyco/opencode/pull/38184)**  
   在 V2 OAuth 完成后发现并持久化账号专属 Copilot API endpoint，减少后续模型发现/推理阶段的额外开销。

5. **[#38189 fix(core): identify spawned subagents](https://github.com/anomalyco/opencode/pull/38189)**  
   为子 Agent 的提示词加入明确上下文，提升多 Agent 场景可追踪性，减少“谁在执行什么任务”的歧义。

6. **[#38188 fix(core): reject malformed patch hunks](https://github.com/anomalyco/opencode/pull/38188)**  
   严格拒绝格式错误的 patch hunk，补上之前“静默跳过”的校验漏洞，有助于提升代码修改安全性。

7. **[#38186 fix(app): defer unavailable notification state](https://github.com/anomalyco/opencode/pull/38186)**  
   延迟处理尚不可用的通知/权限状态，避免因 server state 未就绪而触发错误，偏向底层状态同步修复。

8. **[#38185 fix(github): remove eyes reaction when `use_github_token: true`](https://github.com/anomalyco/opencode/pull/38185)**  
   修正 GitHub Actions 场景下的副作用行为，避免在启用 GitHub Token 时错误添加 👀 reaction。

9. **[#38177 perf(tui): batch event propagation](https://github.com/anomalyco/opencode/pull/38177)**  
   批量传播 TUI 事件，降低高频事件流下的响应开销，是明显的性能优化 PR。

10. **[#38175 feat(session-ui): render mermaid code blocks as diagrams in chat](https://github.com/anomalyco/opencode/pull/38175)**  
    聊天视图支持 Mermaid 图表渲染，增强技术交流表达能力，同时保留源码复制能力，用户体验提升明显。

## 4. 功能需求趋势

- **模型接入与鉴权稳定性仍是第一优先级**  
  相关问题集中在 upstream provider 拦截、401、全模型报错、Copilot endpoint 发现等方面。  
  代表链接：[#38190](https://github.com/anomalyco/opencode/issues/38190)、[#38195](https://github.com/anomalyco/opencode/issues/38195)、[#38131](https://github.com/anomalyco/opencode/issues/38131)

- **Desktop / Web / TUI 的一致性与可发现性**  
  包括 layout transition、sidebar、Plan/Build、自动刷新、滚动导航等，说明 UI 进入“可用后优化”阶段。  
  代表链接：[#38124](https://github.com/anomalyco/opencode/issues/38124)、[#38113](https://github.com/anomalyco/opencode/issues/38113)、[#38125](https://github.com/anomalyco/opencode/issues/38125)

- **跨平台兼容性仍然是高频需求**  
  Windows 本地连接、安装/PE loader、Mac TUI hang、Linux/终端显示等问题反复出现。  
  代表链接：[#38140](https://github.com/anomalyco/opencode/issues/38140)、[#38110](https://github.com/anomalyco/opencode/issues/38110)、[#38169](https://github.com/anomalyco/opencode/issues/38169)

- **会话、项目、worktree 的上下文管理需求增强**  
  用户希望更清晰地知道“当前在哪个目录、哪个分支、哪个 session”，尤其在多项目并行时。  
  代表链接：[#38151](https://github.com/anomalyco/opencode/issues/38151)、[#38113](https://github.com/anomalyco/opencode/issues/38113)、[#38163](https://github.com/anomalyco/opencode/issues/38163)

- **性能与大项目场景的鲁棒性**  
  大二进制目录导致 TUI 冻结、事件传播过密、文件树不刷新等，说明大仓库/复杂项目下的性能仍需持续打磨。  
  代表链接：[#38201](https://github.com/anomalyco/opencode/issues/38201)、[#38177](https://github.com/anomalyco/opencode/pull/38177)、[#38125](https://github.com/anomalyco/opencode/issues/38125)

- **生态扩展与外部集成需求持续增长**  
  Telegram、长期记忆搜索、生态页插件等提案表明，OpenCode 正在从 CLI 工具向“可编排开发平台”演进。  
  代表链接：[#38130](https://github.com/anomalyco/opencode/issues/38130)、[#38176](https://github.com/anomalyco/opencode/issues/38176)、[#38146](https://github.com/anomalyco/opencode/issues/38146)

## 5. 开发者关注点

- **先稳住请求链路，再谈功能扩张**：当前最影响用户的仍是 provider 拦截、401、内部错误和模型不可用。  
- **配置状态必须和运行时强一致**：权限开关、layout eligible、TUI 迁移等问题表明“设置已保存但未生效”是高频痛点。  
- **跨平台兼容性要优先验证**：尤其是 Windows 上的 Bun/localhost、Mac 上的 TUI hang、不同终端的 Unicode/RTL 渲染。  
- **上下文管理要更明确**：session 命名、worktree 区分、项目路径一致性，都是多任务开发者的核心诉求。  
- **性能问题多出现在“大项目 + 高频事件”场景**：需要继续优化事件批处理、文件扫描、刷新策略与 TUI 渲染路径。  

如果你希望，我可以把这份日报再整理成“**适合发 Slack/飞书的短版**”或“**按稳定性/功能/性能分组的管理层摘要版**”。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报｜2026-07-22

## 1) 今日速览
过去 24 小时，Pi 的社区讨论明显集中在 **0.81.0 升级后的稳定性回归** 与 **新上线的本地 llama.cpp 能力** 两条主线：一边是崩溃、重试、构建失败等高频问题，一边是模型管理、下载与默认模型配置等新能力的落地与适配。  
同时，仓库发布了 **v0.81.1**，重点补上了 **可验证的源码归档**，这对构建可信发布链路很关键。  
整体看，Pi 正处于“**快速加功能 + 快速修回归**”的节奏中。  

---

## 2) 版本发布

- **v0.81.1**｜[Release](https://github.com/earendil-works/pi/releases/tag/v0.81.1)  
  主要新增 **可验证的 release source archives**：GitHub Release 现在提供确定性、带校验和的源码归档，并附带从源码重建独立二进制的说明。  
  这一步强化了发布可审计性，也方便社区验证官方二进制与源码的一致性。

- **v0.81.0**｜[Release](https://github.com/earendil-works/pi/releases/tag/v0.81.0)  
  重点功能是 **本地 llama.cpp 模型管理**：可连接 llama.cpp router、搜索和下载 Hugging Face 模型，并支持显式加载/卸载模型和实时进度展示。  
  这代表 Pi 在“本地模型 + 外部模型源”方面进一步完善，开始向更灵活的多模型工作流靠拢。

---

## 3) 社区热点 Issues

1. **升级 0.81.0 后恢复会话直接崩溃**｜[Issue #6915](https://github.com/earendil-works/pi/issues/6915)  
   这是最典型的升级回归之一，报错集中在 `streamFunction is not a function`。  
   **重要性**：影响核心交互路径，且发生在“恢复旧会话”这一高频场景。  
   **社区反应**：14 条评论、2 个赞，说明复现与排查讨论都很活跃。

2. **自动补全在 provider 返回非字符串时崩溃**｜[Issue #6920](https://github.com/earendil-works/pi/issues/6920)  
   `/` 触发的补全链路在 `fuzzyMatch` 中对值类型假设过强，导致 `startsWith is not a function`。  
   **重要性**：属于编辑器/交互层的稳定性问题，会直接破坏输入体验。  
   **社区反应**：3 条评论，说明已有明确复现路径，且可能影响多个代码路径。

3. **0.81.0 下持续崩溃**｜[Issue #6918](https://github.com/earendil-works/pi/issues/6918)  
   与 #6915 类似，用户报告在新版本中持续触发 `streamFunction` 相关崩溃。  
   **重要性**：表明问题不是单点环境，而可能是版本回归面较广。  
   **社区反应**：虽只有 3 条评论，但和 #6915 共同构成一组高优先级稳定性信号。

4. **OpenAI/Anthropic SDK 的 Retry-After 会把 Pi “睡死”**｜[Issue #6911](https://github.com/earendil-works/pi/issues/6911)  
   社区指出 SDK 会按 `Retry-After` 原样等待，且不可被 Escape 中断。  
   **重要性**：直接影响可用性，属于“看似重试，实际阻塞”的体验灾难。  
   **社区反应**：3 条评论，且后续已推动对应修复 PR 合入。

5. **0.81.0 改动导致模型元数据生成/构建失败**｜[Issue #6908](https://github.com/earendil-works/pi/issues/6908)  
   用户反馈 `packages/tui` 构建失败，指向模型元数据生成逻辑变化。  
   **重要性**：这是发布后“构建链路回归”，会影响开发者本地编译和 CI。  
   **社区反应**：2 条评论，说明问题范围较明确但影响链路关键。

6. **默认模型不能是 llama.cpp 模型**｜[Issue #6922](https://github.com/earendil-works/pi/issues/6922)  
   当 `defaultProvider=llama.cpp` 且默认模型已配置时，启动仍提示 “No models available”。  
   **重要性**：属于新功能落地后的配置兼容问题，直接影响本地模型工作流。  
   **社区反应**：1 条评论、1 个赞，说明需求清晰且有实际使用场景。

7. **希望能只下载文本模型，不要附带其它组件**｜[Issue #6921](https://github.com/earendil-works/pi/issues/6921)  
   这是对 `/llama` 下载体验的细化需求，针对 Hugging Face 模型下载粒度提出改进。  
   **重要性**：反映社区开始从“能用”走向“更省流量/更可控”的模型管理诉求。  
   **社区反应**：1 条评论，属于新功能使用后自然冒出的优化需求。

8. **上下文压缩希望支持异步执行与冻结基线**｜[Issue #6919](https://github.com/earendil-works/pi/issues/6919)  
   社区提出 deferred compaction，避免高上下文时阻塞主流程。  
   **重要性**：这类提案直指长会话性能与交互流畅度。  
   **社区反应**：1 条评论，属于“架构级改进”型反馈。

9. **希望在自定义 SYSTEM.md 中暴露系统提示变量**｜[Issue #6932](https://github.com/earendil-works/pi/issues/6932)  
   用户希望把可用的 SYSTEM PROMPT 变量开放给自定义系统提示文件。  
   **重要性**：说明社区对提示词可编排性、可扩展性的需求在上升。  
   **社区反应**：1 条评论，需求明确但仍偏定制化。

10. **`--no-session` 会遗留临时会话目录**｜[Issue #6924](https://github.com/earendil-works/pi/issues/6924)  
   临时目录未清理会影响测试脚本和批量任务环境。  
   **重要性**：对自动化测试、临时执行和 CI 清理都很敏感。  
   **社区反应**：1 条评论，属于低噪声但高价值的工程问题。

---

## 4) 重要 PR 进展

1. **加入可验证的 release source archives**｜[PR #6913](https://github.com/earendil-works/pi/pull/6913)  
   为发布版本增加确定性源码归档和校验机制，并补齐从源码重建二进制的文档。  
   这条 PR 直接提升了发行物可信度，也是 v0.81.1 的核心内容。

2. **彻底关闭 OpenAI/Anthropic SDK 的 Retry-After 睡眠**｜[PR #6912](https://github.com/earendil-works/pi/pull/6912)  
   将 SDK `maxRetries` 固定为 0，避免把 Pi 卡在不可中断的长时间等待里。  
   这是对 #6911 的直接修复，属于高优先级稳定性补丁。

3. **稳定 session entry IDs**｜[PR #6909](https://github.com/earendil-works/pi/pull/6909)  
   引入可预留的会话条目 ID，增强重启与碰撞处理能力。  
   这类改动通常是会话一致性、日志追踪和后续功能扩展的基础设施。

4. **支持 OpenRouter 原生 OAuth**｜[PR #6927](https://github.com/earendil-works/pi/pull/6927)  
   通过 `Provider.auth.oauth` 实现浏览器授权、PKCE、回调验证等完整流程。  
   这会显著降低第三方 provider 接入成本，提升多供应商兼容性。

5. **模型目录生成使用 models.dev 的 reasoning 选项**｜[PR #6928](https://github.com/earendil-works/pi/pull/6928)  
   为模型目录引入推理能力相关选项，提升模型元数据的准确性。  
   这条 PR 对“模型能力展示”与“路由决策”都比较关键。

6. **加速外部编辑器启动**｜[PR #6903](https://github.com/earendil-works/pi/pull/6903)  
   将编辑 prompt 抽到共享实现，优化临时文件路径与启动性能。  
   对重度编辑场景和外部 IDE/编辑器联动体验有直接收益。

7. **更新过时的 GitHub Actions**｜[PR #6902](https://github.com/earendil-works/pi/pull/6902)  
   将 CI 依赖升级到更现代的 action 版本，顺带迁移到 Node 24 运行时。  
   这是典型的维护型 PR，但对 CI 稳定性和可持续维护很重要。

8. **将 jiti cache 持久化到 agent 目录**｜[PR #6892](https://github.com/earendil-works/pi/pull/6892)  
   避免 macOS 临时目录被清理后重复冷编译，提高 TypeScript 扩展的启动速度。  
   对扩展开发者和频繁启停 Pi 的用户都很实用。

9. **会话选择器增加 Ctrl+A 归档快捷键**｜[PR #6917](https://github.com/earendil-works/pi/pull/6917)  
   在 `/resume` 会话列表中加入归档能力，帮助整理长期会话。  
   这体现了 Pi 在“会话管理/收纳”方向上的持续打磨。

10. **AgentHarness 执行工具抽象**｜[PR #6916](https://github.com/earendil-works/pi/pull/6916)  
    引入带应用上下文的 `AgentHarnessTool`，让工具执行能拿到 session、环境等额外信息。  
    这对扩展系统、测试 harness 和更复杂的 agent 集成都很关键。

---

## 5) 功能需求趋势

从近 24 小时 Issues 看，社区最关注的方向主要有：

- **本地模型与多模型管理**：llama.cpp、Hugging Face 下载、默认模型选择、文本模型精简下载等需求集中出现。  
- **稳定性与可中断性**：升级崩溃、自动补全崩溃、SDK 长时间重试不可中断，是最强烈的痛点。  
- **上下文与会话管理**：compaction、session ID、归档、`--no-session` 清理等都说明用户在重度使用场景下需要更强的会话治理能力。  
- **扩展性与定制化**：SYSTEM.md 变量暴露、官方扩展、公开渲染函数等需求，反映社区希望把 Pi 当作可编排平台而不仅是单一客户端。  
- **工程可维护性**：构建失败、release 可验证性、Linux arm64 资源路径、CI 依赖升级，说明开发者非常在意发行与本地开发链路。

---

## 6) 开发者关注点

- **升级后回归需要更快拦截**：0.81.0 相关崩溃集中爆发，说明发布前后的回归测试、灰度验证和快速补丁能力很关键。  
- **异常类型与边界值处理不足**：例如补全管线中把非字符串当字符串处理，提示内部接口契约需要更严格。  
- **重试策略必须可中断、可控**：SDK 层的长睡眠会破坏用户体验，社区明显更偏好“短重试 + 可 Abort”的策略。  
- **本地模型支持已进入“可用性打磨”阶段**：不再只是“能接入”，而是默认模型、下载粒度、展示能力等细节都开始被追问。  
- **发布链路可信度在上升**：可验证源码归档是一个明显信号，社区开始关注“怎么构建出来的”而不只是“能不能用”。  
- **扩展与自定义需求变强**：公开 API、系统提示变量、官方扩展等诉求持续出现，说明 Pi 的生态边界正在被快速推进。

如需，我也可以把这份日报再压缩成 **适合发群/发邮件的 300 字版本**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-07-22）

## 1) 今日速览
今天社区讨论的核心仍然集中在 **daemon / serve 稳定性、后台 agent 生命周期、以及 WebShell 体验修复** 上，相关问题和后续 PR 持续密集出现。与此同时，项目在 **发布自动化、启动性能、Telemetry** 方向也有明显推进，说明当前主线是“稳定性修补 + 基础能力完善”。  

---

## 2) 版本发布
- **v0.20.1**：[Release v0.20.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.20.1)  
  公开 changelog 显示，这个版本重点包含 **autofix 的 label-driven takeover/release**、以及 **forced-dispatch green no-op 修复** 等发布与流程相关改进。  
- **v0.20.0-preview.0**：[Release v0.20.0-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.20.0-preview.0)  
  主要是 **telemetry 相关回归测试补强**，覆盖 daemon metrics 初始化顺序。  
- **v0.20.0-nightly.20260722.b98306b7e**：[Release v0.20.0-nightly.20260722.b98306b7e](https://github.com/QwenLM/qwen-code/releases/tag/v0.20.0-nightly.20260722.b98306b7e)  
  与 preview 版本相同，继续围绕 telemetry / daemon 行为做验证。  
- **cua-driver-rs-v0.7.3**：[Release cua-driver-rs-v0.7.3](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.7.3)  
  提供跨平台预编译二进制，macOS 已签名并公证，Linux/Windows 也有对应构建。  

---

## 3) 社区热点 Issues（精选 10 条）
> 注：以下以“影响面 + 讨论热度 + 关联主线价值”综合筛选。

1. **#7427 web-shell 自动刷新反复弹出 “Load artifacts failed: Failed to fetch”**  
   [OPEN, 4 评论](https://github.com/QwenLM/qwen-code/issues/7427)  
   这是当前最直观的 WebShell 可用性问题之一，直接影响 `qwen serve` 的会话面板体验；自动刷新链路出错，说明 UI/daemon 交互仍有稳定性缺口。

2. **#7404 启动后检查可更新版本的超时时间太短**  
   [OPEN, 3 评论](https://github.com/QwenLM/qwen-code/issues/7404)  
   影响启动路径，尤其在加载旧会话较慢时几乎必现，属于“用户一上来就感知到”的体验问题。

3. **#7452 cronParser 的 `*/N` 语义与 vixie-cron 文档不一致**  
   [OPEN, 2 评论](https://github.com/QwenLM/qwen-code/issues/7452)  
   这是核心工具层的语义正确性问题，虽然偏底层，但会直接影响定时任务行为，属于“看似小、实则会出错”的高价值修复点。

4. **#7433 本地模型发起会话后，SDK 误报 currentModel 为 `coder-model(qwen-oauth)`**  
   [OPEN, 2 评论](https://github.com/QwenLM/qwen-code/issues/7433)  
   直接关系到 **本地模型 / 自定义模型接入** 的可信度，属于模型切换与状态同步问题。

5. **#7430 WebShell 的 workspaceId 无法正确初始化原生工作区选择器**  
   [OPEN, 2 评论](https://github.com/QwenLM/qwen-code/issues/7430)  
   这是 WebShell 多工作区场景的关键 bug，影响“进入即用”的体验，和工作区切换链路强相关。

6. **#7440 web_fetch 工具完全不可用，侧查询报 enable_thinking 参数错误**  
   [OPEN, 1 评论](https://github.com/QwenLM/qwen-code/issues/7440)  
   属于工具链可用性问题，且是“所有 URL 都失败”的高严重度反馈，对内容获取能力影响明显。

7. **#7457 daemon 模式下 SSE resume cursor 跨 epoch 可能静默错位，且 compaction 失败会被隐藏**  
   [OPEN, 1 评论](https://github.com/QwenLM/qwen-code/issues/7457)  
   这是 daemon 恢复链路的深层正确性问题，社区虽然评论不多，但属于高风险数据一致性缺陷。

8. **#7451 daemon exactly-once prompt-terminal PR 的后续问题：终端丢失、队列失败污染、deadline rejection 类型不清晰**  
   [OPEN, 1 评论](https://github.com/QwenLM/qwen-code/issues/7451)  
   说明 daemon 事件闭环已经进入“细节打磨期”，社区关注点从“能跑”转向“恢复/失败语义必须准确”。

9. **#7410 希望 completed background agents 能留在 session 内，不要从 transcript 重新构建**  
   [OPEN, 1 评论](https://github.com/QwenLM/qwen-code/issues/7410)  
   这是多 agent / 后台自动化方向的重要需求，体现出社区希望 agent 具备更强的“状态驻留”能力。

10. **#7394 希望通过 settings 支持自定义 skill 目录**  
    [OPEN, 1 评论](https://github.com/QwenLM/qwen-code/issues/7394)  
    这是典型的可配置性需求，说明社区在扩展系统能力时很在意目录、路径和企业部署可控性。

---

## 4) 重要 PR 进展（精选 10 条）

1. **#7464 fix(core): align stepped day fields with Vixie cron semantics**  
   [PR](https://github.com/QwenLM/qwen-code/pull/7464)  
   修正 cron day 字段的星号步进语义，与 vixie-cron 对齐，属于底层行为修复。

2. **#7463 feat(sdk-java): Add daemon transport**  
   [PR](https://github.com/QwenLM/qwen-code/pull/7463)  
   为 Java 11 SDK 增加 daemon transport，说明生态扩展正在往多语言接入推进。

3. **#7461 chore(release): v0.20.1**  
   [PR](https://github.com/QwenLM/qwen-code/pull/7461)  
   版本发布 PR，同步 `package.json` 和 `CHANGELOG.md`，是本轮发布流程的中心动作。

4. **#7460 fix(core): make fork subagents discoverable**  
   [PR](https://github.com/QwenLM/qwen-code/pull/7460)  
   让 fork 类型子 agent 可被发现，强化了后台 agent / fork 工作流。

5. **#7459 feat(core): restore background agent roster**  
   [PR](https://github.com/QwenLM/qwen-code/pull/7459)  
   恢复会话重开时的后台 agent 名册，已完成任务不自动重启，偏向 session 记忆与可恢复性。

6. **#7458 fix(serve): detect stale SSE cursors across daemon restarts via epoch token**  
   [PR](https://github.com/QwenLM/qwen-code/pull/7458)  
   针对 daemon 重启后的 SSE 恢复链路加固，解决 stale cursor 与 turn attribution 问题。

7. **#7456 test(telemetry): Cover daemon metrics init ordering and document metricReader asymmetry**  
   [PR](https://github.com/QwenLM/qwen-code/pull/7456)  
   给 telemetry / daemon metrics 补测试并补说明，属于非功能但很关键的稳定性收口。

8. **#7455 perf(startup): Load undici lazily behind package-local dynamic imports**  
   [PR](https://github.com/QwenLM/qwen-code/pull/7455)  
   通过懒加载降低启动期开销，对 cold start 优化直接有效。

9. **#7454 fix(core): Advertise completed task revival**  
   [PR](https://github.com/QwenLM/qwen-code/pull/7454)  
   明确向用户暴露“已完成任务可复活”的能力，减少 subagent 复用上的误解。

10. **#7453 fix(acp-bridge): close prompt-terminal follow-ups from the PR #7400 self-review**  
    [PR](https://github.com/QwenLM/qwen-code/pull/7453)  
    收尾 daemon prompt-terminal exactly-once 机制的后续缺口，典型的“主修复之后继续补洞”。

---

## 5) 功能需求趋势
从近期 Issues 看，社区最关注的方向主要有以下几类：

- **Daemon / Serve 稳定性与恢复语义**  
  包括 SSE 恢复、terminal exactly-once、attach/detach 计数、重启 epoch 等。  
  代表链接：[#7457](https://github.com/QwenLM/qwen-code/issues/7457)、[#7451](https://github.com/QwenLM/qwen-code/issues/7451)、[#7399](https://github.com/QwenLM/qwen-code/issues/7399)、[#7385](https://github.com/QwenLM/qwen-code/issues/7385)

- **后台 Agent 生命周期与复用能力**  
  社区希望 completed / paused / fork agent 都能更自然地驻留、恢复、复用，而不是重建。  
  代表链接：[#7410](https://github.com/QwenLM/qwen-code/issues/7410)、[#7450](https://github.com/QwenLM/qwen-code/issues/7450)、[#7459](https://github.com/QwenLM/qwen-code/pull/7459)、[#7460](https://github.com/QwenLM/qwen-code/pull/7460)

- **WebShell / UI 可用性与工作区体验**  
  重点集中在 artifact 刷新、workspace selector 初始化、token 刷新后的权限保持。  
  代表链接：[#7427](https://github.com/QwenLM/qwen-code/issues/7427)、[#7430](https://github.com/QwenLM/qwen-code/issues/7430)、[#7398](https://github.com/QwenLM/qwen-code/issues/7398)、[#7437](https://github.com/QwenLM/qwen-code/pull/7437)

- **工具链与模型兼容性**  
  包括 `web_fetch`、本地模型 currentModel、send_message 复活 completed agent 等。  
  代表链接：[#7440](https://github.com/QwenLM/qwen-code/issues/7440)、[#7433](https://github.com/QwenLM/qwen-code/issues/7433)、[#7448](https://github.com/QwenLM/qwen-code/issues/7448)、[#7454](https://github.com/QwenLM/qwen-code/pull/7454)

- **可配置性与企业扩展能力**  
  用户希望 skill、memory、identity、channel delivery 这些能力更可控、更标准化。  
  代表链接：[#7394](https://github.com/QwenLM/qwen-code/issues/7394)、[#7436](https://github.com/QwenLM/qwen-code/issues/7436)、[#7449](https://github.com/QwenLM/qwen-code/issues/7449)、[#7387](https://github.com/QwenLM/qwen-code/issues/7387)

---

## 6) 开发者关注点
- **正确性优先于“功能已上线”**：daemon 恢复、事件终止、cron 语义、任务复活等问题说明，社区对“静默错误”非常敏感。  
  参考：[#7457](https://github.com/QwenLM/qwen-code/issues/7457)、[#7452](https://github.com/QwenLM/qwen-code/issues/7452)、[#7399](https://github.com/QwenLM/qwen-code/issues/7399)

- **启动性能与默认开销仍是重点**：`undici` 懒加载、update-check 超时、telemetry 分层加载，都说明项目在持续压缩冷启动成本。  
  参考：[#7455](https://github.com/QwenLM/qwen-code/pull/7455)、[#7404](https://github.com/QwenLM/qwen-code/issues/7404)、[#7447](https://github.com/QwenLM/qwen-code/pull/7447)

- **集成稳定性比“新特性”更受关注**：WebShell、web_fetch、本地模型、workspace selector 这些问题都表明，用户更在意端到端可用性。  
  参考：[#7427](https://github.com/QwenLM/qwen-code/issues/7427)、[#7440](https://github.com/QwenLM/qwen-code/issues/7440)、[#7433](https://github.com/QwenLM/qwen-code/issues/7433)、[#7430](https://github.com/QwenLM/qwen-code/issues/7430)

- **发布与 CI 流程需要继续收敛**：release PR、integration_docker 失败、环境变量隔离修复，说明工程化链路仍在打磨。  
  参考：[#7461](https://github.com/QwenLM/qwen-code/pull/7461)、[#7441](https://github.com/QwenLM/qwen-code/issues/7441)、[#7432](https://github.com/QwenLM/qwen-code/issues/7432)、[#7442](https://github.com/QwenLM/qwen-code/pull/7442)

- **文档与接口定义同步需求强**：JSDoc、metricReader 说明、completed task revival 文案等，表明开发者很在意“文档即契约”。  
  参考：[#7446](https://github.com/QwenLM/qwen-code/issues/7446)、[#7456](https://github.com/QwenLM/qwen-code/pull/7456)、[#7454](https://github.com/QwenLM/qwen-code/pull/7454)

---

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合微信群/飞书群的短版**  
2. **适合内部周报的管理层版**  
3. **带“风险等级 / 建议跟进动作”的分析版**

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# 2026-07-22 DeepSeek TUI 社区动态日报

> 数据来源：GitHub 过去 24 小时更新记录（Hmbown/CodeWhale）

## 1) 今日速览
今天社区讨论明显围绕 **v0.9.1 收尾与主线整合** 展开：一边是 runtime / 发布面 / 官网内容的整体收口，另一边是子代理 worktree、模型路由、审批预览、输入延迟和 CI 稳定性等基础问题的修补。  
整体看，这是一个“**功能平台化 + 对外发布一致性 + 可靠性修复**”并行推进的一天。

---

## 2) 社区热点 Issues

1. **[#4674 子代理 worktree 默认 cwd 错误](https://github.com/Hmbown/CodeWhale/issues/4674)**  
   子代理在 `worktree: true` 时命令却跑到父仓库，直接破坏隔离性，属于高优先级 bug。  
   反馈：1 条评论，0 👍，问题虽小范围讨论，但影响面很核心，已被快速闭环。

2. **[#4660 自定义 provider / model 配置方案](https://github.com/Hmbown/CodeWhale/issues/4660)**  
   用户明确提出希望支持更灵活的多提供商、多模型配置，这是平台化能力的基础需求。  
   反馈：讨论不多，但属于后续产品扩展的关键入口，值得优先设计配置模型。

3. **[#4659 edit_file 审批预览仅显示 3 行](https://github.com/Hmbown/CodeWhale/issues/4659)**  
   审批面板无法看到完整 diff，直接削弱人工审查价值，属于典型的 TUI 可用性问题。  
   反馈：问题描述非常具体，属于“看得见、修得快、收益高”的高价值 UX issue。

4. **[#4655 自托管路由输出上限被 4K fallback 限制](https://github.com/Hmbown/CodeWhale/issues/4655)**  
   自托管模型的显式输出限制被通用 4K fallback 截断，影响本地/私有化部署能力。  
   反馈：已关闭，说明问题已进入修复闭环；对重视自托管的用户很关键。

5. **[#4671 官网源码、部署版本与事实不一致](https://github.com/Hmbown/CodeWhale/issues/4671)**  
   live 网站显示的版本、运行时事实、Latest 信息彼此矛盾，说明发布链路和静态内容存在漂移。  
   反馈：这是外部展示可信度问题，虽然评论少，但对品牌认知影响大。

6. **[#4670 README / 官网截图仍未统一到 v0.9.1](https://github.com/Hmbown/CodeWhale/issues/4670)**  
   旧截图与新版文案不一致，容易让新用户产生“版本错位”的感受。  
   反馈：属于对外内容收口任务，是 v0.9.1 发布完成度的重要一环。

7. **[#4669 并行 CI 下的 raw-read 工作集测试不稳定](https://github.com/Hmbown/CodeWhale/issues/4669)**  
   单个 Ubuntu 失败暴露出并行 CI 下的偶发回归，这类问题往往最容易拖慢主干稳定性。  
   反馈：属于维护者必须优先处理的稳定性问题，说明测试边界仍需加固。

8. **[#4666 前缀与隐私不变式的延续修复](https://github.com/Hmbown/CodeWhale/issues/4666)**  
   这是围绕上下文隔离、前缀保护和隐私边界的延续工作，属于安全/可靠性底座。  
   反馈：讨论不热，但技术含金量高，属于长期价值型任务。

9. **[#4665 IME 感知的 Enter 发送延迟问题](https://github.com/Hmbown/CodeWhale/issues/4665)**  
   中文输入法场景下的发送延迟会显著影响日常输入体验，是典型的高频交互痛点。  
   反馈：对中文用户非常敏感，属于“小 bug，大感知”的问题。

10. **[#4664 Verifiers harness 集成收尾](https://github.com/Hmbown/CodeWhale/issues/4664)**  
    验证器 harness 的继续集成，说明项目在强化自动化评估和质量门禁。  
    反馈：对普通用户不显眼，但对后续稳定交付很重要。

---

## 3) 重要 PR 进展

> 过去 24 小时内更新的 PR 共 8 个，以下为最值得关注的条目。

1. **[#4675 Integrate CodeWhale v0.9.1 runtime and release surface](https://github.com/Hmbown/CodeWhale/pull/4675)**  
   这是今天最核心的整合 PR：把 v0.9.1 runtime 简化、空工作区修复和最终 TUI 配色语法一起收进主线，并同步发布面。

2. **[#4678 fix(credit): preserve v0.9.1 integration authorship](https://github.com/Hmbown/CodeWhale/pull/4678)**  
   处理作者归属和历史保留，确保集成过程不丢失原始贡献记录。  
   这类 PR 对开源协作和审计很重要。

3. **[#4673 fix(shell): default no-cwd shell commands to context.workspace](https://github.com/Hmbown/CodeWhale/pull/4673)**  
   直接修复子代理 worktree 命令跑到父目录的问题，和 #4674 对应。  
   属于高优先级可靠性修复。

4. **[#4658 fix(runtime-api): add provider registry + switch endpoints](https://github.com/Hmbown/CodeWhale/pull/4658)**  
   新增 provider registry 和切换接口，让 GUI 能动态渲染 provider/model 选择器，并避免旧式配置流程互相覆盖。

5. **[#4657 fix(streaming): report progress on idle timeouts](https://github.com/Hmbown/CodeWhale/pull/4657)**  
   优化 SSE 空闲超时错误信息，补充字节和时间线索，提升流式故障定位能力。  
   对排查“卡住但没报错”的问题很有帮助。

6. **[#4656 fix(route): honor explicit limits for unknown local models](https://github.com/Hmbown/CodeWhale/pull/4656)**  
   修复自托管/未知模型别名被 4K fallback 限死的问题，保留显式输出上限。  
   这是 #4655 的直接修复。

7. **[#4668 chore(deps-dev): bump js-yaml](https://github.com/Hmbown/CodeWhale/pull/4668)**  
   Web 侧开发依赖更新，偏维护型，但有利于减少已知漏洞和兼容性风险。

8. **[#4661 chore(deps): bump axios](https://github.com/Hmbown/CodeWhale/pull/4661)**  
   Feishu bridge 依赖升级，属于集成插件层面的常规维护。

---

## 4) 功能需求趋势

1. **多 provider / 多模型配置能力正在成为核心诉求**  
   代表：[#4660](https://github.com/Hmbown/CodeWhale/issues/4660)、[#4658](https://github.com/Hmbown/CodeWhale/pull/4658)  
   社区希望配置更灵活，尤其是自定义 provider、模型切换和独立参数管理。

2. **子代理、worktree、上下文隔离仍是高频问题**  
   代表：[#4674](https://github.com/Hmbown/CodeWhale/issues/4674)、[#4662](https://github.com/Hmbown/CodeWhale/issues/4662)  
   用户越来越依赖多工作区/多代理并行，任何 cwd 或权限偏差都会放大成严重可靠性问题。

3. **TUI 审批、差异预览、视觉层级在持续被打磨**  
   代表：[#4659](https://github.com/Hmbown/CodeWhale/issues/4659)、[#4676](https://github.com/Hmbown/CodeWhale/issues/4676)、[#4677](https://github.com/Hmbown/CodeWhale/issues/4677)  
   说明产品不再只追求“能用”，而是在向“易审查、易理解、观感专业”推进。

4. **发布一致性和公共展示面正在被系统性收口**  
   代表：[#4670](https://github.com/Hmbown/CodeWhale/issues/4670)、[#4671](https://github.com/Hmbown/CodeWhale/issues/4671)、[#4672](https://github.com/Hmbown/CodeWhale/issues/4672)  
   README、官网、截图、版本事实需要统一，已经进入 v0.9.1 的最后整理阶段。

5. **稳定性、测试和回归防护仍是底层优先级**  
   代表：[#4669](https://github.com/Hmbown/CodeWhale/issues/4669)、[#4666](https://github.com/Hmbown/CodeWhale/issues/4666)、[#4664](https://github.com/Hmbown/CodeWhale/issues/4664)  
   说明项目在扩功能的同时，也在加强质量门禁和安全边界。

6. **本地/自托管模型兼容性需求继续增强**  
   代表：[#4655](https://github.com/Hmbown/CodeWhale/issues/4655)、[#4656](https://github.com/Hmbown/CodeWhale/pull/4656)  
   社区对“非官方模型、私有路由、显式限制”的诉求越来越明确。

---

## 5) 开发者关注点

- **配置体系要更开放**：用户希望能自定义 provider / model / route，而不是被固定在单一路径里。  
- **上下文隔离必须更严格**：子代理、worktree、默认 cwd 这类基础假设一旦出错，问题会直接扩散到命令执行层。  
- **审批与 diff 可见性要足够好**：多行改动看不全，会直接影响人工审查效率。  
- **中文输入与交互延迟仍有优化空间**：IME 场景下的发送时机、响应速度仍是高频体验痛点。  
- **发布物需要“事实一致”**：官网、README、运行时版本、截图必须同步，否则会削弱专业感。  
- **CI 和回归测试要继续加固**：并行环境下的偶发失败，最容易在主干稳定性上制造隐患。

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合直接发群里的短版**，或  
2. **适合贴到周报/日报系统的标准模板版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*