# AI CLI 工具社区动态日报 2026-07-10

> 生成时间: 2026-07-10 01:13 UTC | 覆盖工具: 9 个

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

下面是一份基于你提供的 2026-07-10 社区动态的**横向对比分析报告**。  
> 说明：表中的 Issue/PR 数量，采用各日报中披露的**过去 24 小时更新/精选数量**，用于横向比较，不等同于仓库全量统计。

---

# 1) 生态全景

过去 24 小时，AI CLI 生态呈现出一个非常明确的趋势：**从“能用的命令行助手”快速演进为“带权限、沙箱、会话、子代理、IDE/桌面集成的工程化系统”**。  
各家最集中的反馈不再只是“模型答得好不好”，而是**状态机是否稳定、权限边界是否可靠、跨平台是否一致、外部工具是否兼容**。  
同时，模型侧更新速度很快，GPT-5.6、Grok、Claude 自适应模型等都在频繁进入 CLI 适配清单，说明**模型兼容层**已经成为产品竞争的基础设施。  
总体看，生态已经进入“高频迭代 + 高风险回归”的阶段，谁能把**稳定性、可观测性和安全默认值**做好，谁就更容易形成长期优势。

---

# 2) 各工具活跃度对比

| 工具 | 今日 Issue 数 | 今日 PR 数 | Release 情况 |
|---|---:|---:|---|
| Claude Code | 50 | 3 | 无新 Release |
| OpenAI Codex | 10 | 10 | 有：0.144.1、0.144.0 及 alpha 预览 |
| Gemini CLI | 9 | 8 | 无新 Release |
| GitHub Copilot CLI | 10 | 0 | 有：v1.0.70-0 |
| Kimi Code CLI | 0 | 1 | 无新 Release |
| OpenCode | 10 | 10 | 有：v1.17.16 / 17 / 18，连续小版本迭代 |
| Pi | 10 | 10 | 有：v0.80.6、v0.80.5 |
| Qwen Code | 10 | 10 | 有：nightly 版本更新 |
| DeepSeek TUI | 10 | 10 | 无新 Release；release PR 已打开 |

---

# 3) 共同关注的功能方向

## 3.1 Agent / Subagent 状态一致性与权限隔离
这是跨工具最明显的共性。  
- **Claude Code**：子代理继承父会话身份、`can_use_tool` 回调失效、`Always allow` 规则失真。  
- **OpenAI Codex**：`spawn_agent` schema 限制、多 agent 工作流约束。  
- **Gemini CLI**：auth loop、无限 fallback 说明状态机不稳。  
- **OpenCode**：子代理模型隔离、权限优先级、工具注册保持一致。  
- **Qwen Code**：subagent 可观测性、memory/channel gate、权限边界。  
- **Pi**：切模型时自动重试取消、compaction 后预算一致性。  

**结论**：当前竞争重点已从“让 agent 跑起来”转向“让 agent 在多轮、多子任务、多权限场景下不串状态”。

---

## 3.2 MCP / 外部工具 / IDE 集成
外部工具接入仍是所有 CLI 的高频议题。  
- **Claude Code**：managed MCP discovery metadata、MCP 兼容性。  
- **Copilot CLI**：研究型 agent 的 MCP 工具可配置性。  
- **Qwen Code**：ACP transport、workspace-qualified 通道。  
- **OpenCode**：external agent import sources、tool loading。  
- **Kimi Code CLI**：兼容 `CLAUDE.md` / `.claude/CLAUDE.md`，强调迁移友好。  
- **Gemini CLI**：hooks、eval、triage 工具链的安全接入。  

**结论**：生态正在从“单一 CLI”走向“CLI + 外部协议 + IDE/工作区通道”的组合架构。

---

## 3.3 跨平台 TUI / Desktop 稳定性
Windows、macOS、WSL、Termux、网络盘等平台差异仍然是核心痛点。  
- **Claude Code**：Windows Cowork 挂载失败、映射盘 `/resume` 异常。  
- **Copilot CLI**：Windows Terminal / WSL2 黑屏、卡死、输入失效。  
- **Gemini CLI**：Windows/macOS OAuth 循环。  
- **OpenAI Codex**：macOS/Windows 桌面端回归、sandbox 延迟。  
- **Qwen Code**：macOS/Windows 剪贴板图片输入问题。  
- **DeepSeek TUI**：流式文本显示过慢。  

**结论**：CLI 的“命令行外壳”已经不再是简单终端程序，而是跨平台交互产品；终端兼容性直接决定留存。

---

## 3.4 新模型 / 新供应商兼容性
模型更新节奏已经逼近产品层的适配能力上限。  
- **OpenAI Codex**：GPT-5.6、Azure、Plus、custom provider 兼容。  
- **OpenCode**：GPT-5.6、Meta、Grok、Copilot 等多模型适配。  
- **Pi**：新增 `max` thinking level，扩展模型目录与上下文能力。  
- **Qwen Code**：GPT-5.6、Muse Spark、Grok、DeepSeek 等路由更新。  
- **DeepSeek TUI**：pricing / alias / provider 迁移。  

**结论**：模型适配已经从“加个模型名”变成了“请求协议、上下文窗口、reasoning 变体、计费元数据”的系统工程。

---

## 3.5 安全、审批与默认保护
安全问题不是边角料，而是当前高频主线。  
- **Claude Code**：bash 命令误执行导致真实数据丢失。  
- **Gemini CLI**：`pull_request_target` RCE、token 文件权限。  
- **Qwen Code**：敏感环境变量泄露、评论附件审核守卫。  
- **OpenCode**：多文件 patch 授权、permission precedence。  
- **Copilot CLI**：sandbox 切换与插件 SHA 锁定。  

**结论**：AI CLI 正在从“默认可执行”转向“默认受限、显式授权、可审计”。

---

# 4) 差异化定位分析

| 工具 | 功能侧重 | 目标用户 | 技术路线特征 |
|---|---|---|---|
| Claude Code | 协作式 agent、Cowork、subagent、MCP、权限边界 | 追求端到端 AI 编码协作的重度用户/团队 | 强会话管理、强权限控制、强桌面协同 |
| OpenAI Codex | 底层执行链路、sandbox、Path URI、模型兼容 | OpenAI 生态用户、企业级开发者 | 偏平台化重构，强调执行与路径抽象 |
| Gemini CLI | 认证、重试、hook 安全、agent loop 稳定性 | 依赖 Gemini 体系的 CLI 用户 | 以 auth/retry/security 为核心稳定性建设 |
| GitHub Copilot CLI | TUI 交互、会话恢复、队列调度、终端可用性 | Windows/WSL/终端重度用户 | 终端优先，强调交互体验和会话可恢复性 |
| Kimi Code CLI | 配置兼容、迁移成本、生态接入 | 已在 Claude/AGENTS 体系中的迁移用户 | 以兼容性切入，当前更偏“接入层” |
| OpenCode | 多模型、多供应商、子代理、桌面/TUI | 高级用户、模型中立用户 | 迭代快，强调可配置性和生态扩展 |
| Pi | thinking level、context budget、model router | 追求推理可控性与模型细粒度控制的用户 | 强调“推理控制面”与上下文管理 |
| Qwen Code | 多工作区、ACP/IDE 集成、subagent 可观测性 | IDE 重度用户、团队协作用户 | 平台化/daemon 化，强调工作区与通道治理 |
| DeepSeek TUI | 流式渲染、计费、workflow、发布稳定性 | TUI 重度用户、成本敏感用户 | 更偏 TUI 工具化与工程化收敛 |

### 关键差异总结
- **Claude Code / OpenCode / Qwen Code** 更像“agent 平台”，重点在**协作、子代理、权限与工具生态**。  
- **Codex / Pi** 更像“底层模型与执行控制平台”，重点在**路径抽象、推理控制、上下文预算、沙箱**。  
- **Gemini CLI / Copilot CLI** 更强调**可用性、终端稳定性、认证与调度可靠性**。  
- **Kimi Code CLI** 目前更偏向**生态兼容与迁移入口**。  
- **DeepSeek TUI** 则更像**TUI 工程化产品**，核心是**性能、计费、workflow 发布稳定**。

---

# 5) 社区热度与成熟度

## 社区最活跃的几类
1. **Claude Code**
   - 50 个 Issue 更新，说明社区反馈量极高。  
   - 但 PR 只有 3 个、且无新 Release，意味着**问题暴露速度明显快于修复速度**。  
   - 这是“高热度 + 高压力”的典型状态。

2. **OpenCode / Qwen Code / Pi / OpenAI Codex / DeepSeek TUI**
   - 都呈现出 **Issue + PR 双高频** 的模式。  
   - 说明这些项目都处在**快速迭代期**，且工程团队对社区反馈响应较快。  
   - 其中 OpenAI Codex 和 Pi 的 release/架构更新更像“平台化推进”，OpenCode 和 Qwen 更像“高密度修复与能力扩张”。

3. **Gemini CLI**
   - Issue 和 PR 都不低，但内容高度集中在 auth/security/retry。  
   - 说明社区活跃度不算低，但问题面比较聚焦，属于**稳定性压力集中型**。

4. **Copilot CLI**
   - Issues 有一定热度，但 PR 为 0，说明社区在集中暴露问题，而代码侧更新相对慢。  
   - 结合已有 1.0.70-0 release，更像是**成熟产品遭遇回归压力**。

5. **Kimi Code CLI**
   - 今日几乎没有社区噪声，仅 1 个 PR。  
   - 说明当前更像**低噪声、早期生态兼容期**，社区规模和问题密度都较小。

## 成熟度判断
- **更成熟但压力大**：Copilot CLI、Claude Code  
  - 用户基数和使用场景更广，所以问题暴露更多。  
- **快速迭代中的平台型项目**：OpenCode、Qwen Code、Pi、OpenAI Codex  
  - release/PR/issue 都活跃，工程推动明显。  
- **处于补强基础能力阶段**：Gemini CLI、DeepSeek TUI  
  - 重点在 auth、安全、性能、workflow 和发布稳定。  
- **生态接入/迁移导向早期阶段**：Kimi Code CLI  
  - 更像在扩展兼容层和入口能力。

---

# 6) 值得关注的趋势信号

## 6.1 AI CLI 正在平台化
不再只是“执行命令的聊天框”，而是在向 **工作区、子代理、权限、沙箱、插件、MCP/ACP、桌面端** 的复合平台演进。  
**对开发者的意义**：架构设计必须把“工具调用、会话、权限、身份”拆成独立层，而不是绑死在 prompt 逻辑里。

## 6.2 “状态机正确性”正在变成核心质量指标
大量问题都不是模型回答错，而是**会话串了、resume 错了、权限丢了、队列断了、重试卡住了**。  
**对开发者的意义**：需要更强的状态机测试、回归测试和可观测性，而不仅是 prompt/模型评估。

## 6.3 安全默认值在抬升
从 bash 命令误执行、RCE 风险、token 文件权限，到 environment leak、权限优先级，社区都在逼迫工具更保守。  
**对开发者的意义**：未来产品竞争力之一是“默认安全”，而不是“默认方便”。

## 6.4 模型适配压力会持续上升
GPT-5.6、Grok、Claude、自适应模型、reasoning variants、上下文窗口、计费元数据，都在频繁变化。  
**对开发者的意义**：必须建立稳定的模型适配层、兼容矩阵和 feature flag 机制。

## 6.5 桌面端/终端一体化是新常态
用户越来越希望在 TUI、桌面端、IDE、Web shell 间无缝切换。  
**对开发者的意义**：跨平台兼容、会话同步、输入法/剪贴板/通知/渲染稳定性将成为基本门槛。

## 6.6 计费与上下文透明度被高度关注
尤其在 Pi、DeepSeek、OpenCode、Qwen 等项目里，cache、usage、context budget、surcharge、quota 都在被反复检验。  
**对开发者的意义**：费用可解释性和额度可预测性，已经是产品信任的一部分。

---

如果你愿意，我可以下一步把这份报告再压缩成两个版本：
1. **高管摘要版（1 页）**  
2. **研发周会版（含行动项）**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下为基于你提供的 `anthropics/skills` 数据整理的 **Claude Code Skills 社区热点报告（截至 2026-07-10）**。  
> 注：你给出的 PR 列表里“评论数”字段缺失（显示为 `undefined`），因此下列“热门”主要结合 **议题热度、问题紧迫性、社区反馈集中度** 与 PR 内容判断。

---

## 1) 热门 Skills 排行（PR）

| 排名 | PR | 功能简介 | 社区讨论热点 | 当前状态 |
|---|---|---|---|---|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | 修复 `skill-creator` 的 `run_eval.py` 评测失真：0% recall、Windows 流读取、触发检测、并行 worker | 评测结果不可信，直接影响 `run_loop.py` / `improve_description.py` 的自动优化链路 | Open |
| 2 | [#1323](https://github.com/anthropics/skills/pull/1323) | 修复触发检测：识别不到真实 skill 名称、遇到第一个非 Skill tool 就提前退出 | 触发评估误判，导致描述优化始终停在错误反馈上 | Open |
| 3 | [#1261](https://github.com/anthropics/skills/pull/1261) | 隔离 trigger-eval 生成的命令文件，避免污染真实项目注册表 | 并行评估会写入用户 live project，存在上下文污染/互相干扰风险 | Open |
| 4 | [#1367](https://github.com/anthropics/skills/pull/1367) | 新增 `self-audit` skill：机械校验 + 四维推理质量门禁 | 社区对“输出前自检”“减少幻觉/漏文件”的需求很强 | Open |
| 5 | [#723](https://github.com/anthropics/skills/pull/723) | 新增 `testing-patterns` skill | 测试金字塔、React/单测/E2E 规范、测试策略自动化 | Open |
| 6 | [#514](https://github.com/anthropics/skills/pull/514) | 新增 `document-typography` skill，提升生成文档排版质量 | 孤行/寡行、标题悬挂、编号对齐等“文档可读性”细节 | Open |
| 7 | [#1302](https://github.com/anthropics/skills/pull/1302) | 新增 `color-expert` skill | 色彩命名、色彩空间、配色标准化，偏设计/视觉工作流 | Open |
| 8 | [#486](https://github.com/anthropics/skills/pull/486) | 新增 `odt` skill，支持 OpenDocument 文件创建/填充/解析 | 开源办公格式与 LibreOffice 兼容需求 | Open |

---

## 2) 社区需求趋势

### A. 分发、共享与信任边界
社区最强烈的诉求之一，是 **Skills 的共享、安装和权限边界更清晰**。  
- [#492](https://github.com/anthropics/skills/issues/492) 安全问题：社区 Skills 以 `anthropic/` 命名，可能造成“官方技能”信任误导  
- [#228](https://github.com/anthropics/skills/issues/228) 希望支持组织内共享 Skills，减少手动上传/分发成本  
- [#189](https://github.com/anthropics/skills/issues/189) `document-skills` 与 `example-skills` 内容重复，造成上下文冗余

**趋势判断**：社区已从“有没有技能”转向“技能如何被安全、标准化地分发和复用”。

### B. skill-creator 工具链稳定性
`skill-creator` 相关问题占据了最密集的注意力，核心是 **评测不准、跨平台不稳、对真实项目有副作用**。  
- [#556](https://github.com/anthropics/skills/issues/556) `run_eval.py` 触发率 0%  
- [#1169](https://github.com/anthropics/skills/issues/1169) 描述优化循环 recall 始终 0%  
- [#1061](https://github.com/anthropics/skills/issues/1061) Windows 兼容性问题  
- [#202](https://github.com/anthropics/skills/issues/202) `skill-creator` 本身需要按最佳实践重构

**趋势判断**：社区对“Skill 生产工具”要求正在逼近工程级标准。

### C. 文档/企业格式与办公自动化
用户持续要求更好地处理 **办公文档、模板、企业格式**。  
- [#29](https://github.com/anthropics/skills/issues/29) 希望支持 Bedrock 使用场景  
- [#1175](https://github.com/anthropics/skills/issues/1175) SharePoint Online 文档处理时的安全与上下文窗口担忧  
- [#1362](https://github.com/anthropics/skills/issues/1362) `web-artifacts-builder` 在新 pnpm 版本下失效  
- [#184](https://github.com/anthropics/skills/issues/184) 标准参考站点 `agentskills.io` 跳转异常

**趋势判断**：Skills 需求从“生成内容”延伸到“企业文档全链路处理”。

### D. 测试、自检、治理类元技能
社区对 **代码审查、自检、治理、验证** 类技能的关注度上升。  
- [#412](https://github.com/anthropics/skills/issues/412) `agent-governance`：AI agent 系统治理模式  
- [#1329](https://github.com/anthropics/skills/issues/1329) `compact-memory`：长任务代理的符号化记忆压缩  
- 对应 PR：[#1367](https://github.com/anthropics/skills/pull/1367) `self-audit`、[#723](https://github.com/anthropics/skills/pull/723) `testing-patterns`

**趋势判断**：社区希望 Skills 不只是“帮我做”，还要“帮我检查、约束和证明”。

---

## 3) 高潜力待合并 Skills

以下是我认为 **近期最可能落地、且最贴近当前需求痛点** 的 open PR：

1. [#1367](https://github.com/anthropics/skills/pull/1367) `self-audit`  
   - 价值高：直接对齐“输出前验证”“减少遗漏文件/逻辑错误”的强需求  
   - 适用面广：几乎所有项目类型都可用

2. [#723](https://github.com/anthropics/skills/pull/723) `testing-patterns`  
   - 价值高：测试是最通用、最刚需的开发技能之一  
   - 社区接受度高，落地阻力相对小

3. [#514](https://github.com/anthropics/skills/pull/514) `document-typography`  
   - 解决的是“文档品质”而非基础功能，容易被实际文档工作流吸收  
   - 对生成结果的专业感提升明显

4. [#1302](https://github.com/anthropics/skills/pull/1302) `color-expert`  
   - 明确垂直场景，适合设计/品牌/前端视觉工作流  
   - 容易形成高质量垂类能力

5. [#486](https://github.com/anthropics/skills/pull/486) `odt`  
   - 适配开源办公生态，有明确用户群  
   - 与 docx/pdf 类技能形成互补

6. [#1298](https://github.com/anthropics/skills/pull/1298) / [#1323](https://github.com/anthropics/skills/pull/1323) / [#1261](https://github.com/anthropics/skills/pull/1261)  
   - 虽然都属于 `skill-creator` 修复，但它们是 **整个 Skills 生产链路的基础设施修复**  
   - 如果不先修好，后续新 Skills 的评估与迭代都会受影响

---

## 4) Skills 生态洞察

**一句话总结：当前社区最集中的诉求，是把 Skills 从“能用的演示能力”推进到“可验证、可共享、可治理、可在企业场景稳定落地的生产级能力”。**

如果你愿意，我可以进一步把这份报告整理成：
- **一页式高管摘要**
- **表格版 CSV/Notion 格式**
- **按“文档 / 开发 / 安全 / 工具链”四象限的分析图谱**

---

# Claude Code 社区动态日报（2026-07-10）

## 1. 今日速览
过去 24 小时没有新 Release，但 Issues 区明显活跃，讨论焦点集中在 **Cowork/桌面端会话管理、Agent/Subagent 稳定性、MCP 兼容性** 和 **权限/安全回归**。  
今天最值得警惕的是一条涉及 **真实数据丢失** 的 bash 处理问题，以及多条关于 **子代理继承父会话身份/权限** 的高风险报告，说明近期回归主要集中在自动化与安全边界。

---

## 2. 社区热点 Issues
> 以下从过去 24 小时更新的 50 条 Issues 中，挑选最值得关注的 10 条。

1. **[#76187](https://github.com/anthropics/claude-code/issues/76187)**  
   Cowork（Windows）新会话里项目上下文文件夹永远无法挂载，“添加文件夹”对话框也无法确认，已在两台机器复现。  
   重要性：直接阻塞 Cowork 核心工作流，且带有 `regression` 标签，属于高优先级回归。  
   社区反应：**3 条评论**，`has repro`、`platform:windows`、`area:cowork`，问题定位较明确。

2. **[#76209](https://github.com/anthropics/claude-code/issues/76209)**  
   3P managedMcpServers 忽略 `401 WWW-Authenticate` discovery metadata，导致无法连接符合规范的自建 MCP gateway。  
   重要性：影响第三方 MCP 生态接入，属于协议兼容性问题。  
   社区反应：**2 条评论**，虽被标记为 `invalid`，但问题描述指向明确的标准兼容缺陷。

3. **[#76208](https://github.com/anthropics/claude-code/issues/76208)**  
   bash 双引号处理导致 `$(...)` 测试 payload 被真实执行，`rm -rf ~` 误伤主目录，造成重大数据丢失。  
   重要性：这是今日最严重的安全/数据风险之一，影响面和破坏性都极高。  
   社区反应：目前 **0 条评论**，但带有 `security`、`data-loss`、`hooks`、`model` 标签，风险信号非常强。

4. **[#76221](https://github.com/anthropics/claude-code/issues/76221)**  
   子代理点击后静默接管用户输入，并继承父会话同一 `CLAUDE_CODE_SESSION_ID`，最终导致在父会话身份下发生意外 push。  
   重要性：涉及身份隔离、权限边界和 Git 操作安全。  
   社区反应：**0 条评论**，但叙述完整、影响严重，属于必须尽快核查的高风险问题。

5. **[#76218](https://github.com/anthropics/claude-code/issues/76218)**  
   crash 后使用 `--resume` 时，task store 分裂，空闲 dispatcher 会把旧任务回放给 subagents，形成 synthetic `task-list` 消息。  
   重要性：影响恢复流程和 agent 调度一致性，容易引入“看似恢复成功、实际状态错乱”的问题。  
   社区反应：**0 条评论**，但有 `has repro`，说明可复现性较强。

6. **[#76204](https://github.com/anthropics/claude-code/issues/76204)**  
   Agent SDK 的 `can_use_tool` 权限回调在 Task 子代理运行后永久关闭，后续工具调用全部报 `Stream closed`。  
   重要性：会直接破坏 headless/SDK 自动化集成，是开发者高频使用场景。  
   社区反应：**0 条评论**，但问题聚焦在 `agent-sdk` + `permissions`，影响面清晰。

7. **[#76211](https://github.com/anthropics/claude-code/issues/76211)**  
   “Always allow” 规则在保存 `$VAR` 引用时被写成字面量 `__TRACKED_VAR__`，导致规则永远匹配不上。  
   重要性：权限记忆失效，用户会反复被打断，且规则配置形同虚设。  
   社区反应：**0 条评论**，`has repro`，属于典型的权限系统回归。

8. **[#76217](https://github.com/anthropics/claude-code/issues/76217)**  
   每日重置后，session limit 提示与实际用量不同步，用户明明已重置却仍被拦截。  
   重要性：影响计费/配额体验，属于“状态已恢复但系统仍拒绝”的一致性问题。  
   社区反应：**1 条评论、1 个 👍**，说明用户痛感明确但讨论仍较早期。

9. **[#76205](https://github.com/anthropics/claude-code/issues/76205)**  
   Windows 映射网络盘上的项目 `/resume` 历史始终为空，extension 与 CLI 计算出的 project slug 不一致。  
   重要性：企业内网/共享盘场景常见，直接影响历史会话恢复。  
   社区反应：**0 条评论**，但 `has repro`，场景非常具体。

10. **[#76220](https://github.com/anthropics/claude-code/issues/76220)**  
    所有 session 都被识别为 background agents，subagents 100% 卡住。  
    重要性：这是 Agent 工作流的“全局卡死”级问题，影响吞吐和可用性。  
    社区反应：**0 条评论**，但问题范围广，且涉及 `agents`、`agent-view`、`core`。

---

## 3. 重要 PR 进展
> 过去 24 小时仅更新了 3 个 PR，均偏文档/示例/小修复，整体更像维护性更新。

1. **[#76029](https://github.com/anthropics/claude-code/pull/76029)**  
   `docs(plugin-dev): use flat format in .mcp.json example`  
   作用：修正 plugin-dev 文档中 `.mcp.json` 示例的结构，避免把插件级配置误写成 `mcpServers` 包装格式。  
   价值：降低新手在 MCP 插件开发中的理解成本，减少配置误用。

2. **[#76028](https://github.com/anthropics/claude-code/pull/76028)**  
   `docs(plugin-dev): fix stale marketplace name in README install instructions`  
   作用：修复 README 里过时的 marketplace 安装名称。  
   价值：提升文档一致性，避免用户按旧名称安装失败。

3. **[#76023](https://github.com/anthropics/claude-code/pull/76023)**  
   `fix: detect GitHub Actions CI using directory test in load-context example`  
   作用：将 GitHub Actions 路径检测从 `-f` 修正为 `-d`，因为 `.github/workflows` 实际上是目录。  
   价值：修复 CI 检测示例逻辑错误，避免 GitHub 项目场景下误判 HAS_CI。

---

## 4. 功能需求趋势
1. **Cowork / Desktop 会话管理能力在补课**  
   相关问题集中在挂载文件夹、会话命名、远程控制、更新重启和历史恢复。  
   代表 Issue：[#76187](https://github.com/anthropics/claude-code/issues/76187)、[#76206](https://github.com/anthropics/claude-code/issues/76206)、[#76205](https://github.com/anthropics/claude-code/issues/76205)

2. **Agent / Subagent 调度与身份隔离成为核心痛点**  
   社区希望子代理在“任务、身份、权限、resume”上做到严格隔离，避免串话、卡死和误提交。  
   代表 Issue：[#76221](https://github.com/anthropics/claude-code/issues/76221)、[#76218](https://github.com/anthropics/claude-code/issues/76218)、[#76220](https://github.com/anthropics/claude-code/issues/76220)

3. **MCP 兼容性和发现机制仍是接入瓶颈**  
   包括 discovery metadata、服务器可发现性、参数序列化等问题，说明 MCP 生态还在快速磨合。  
   代表 Issue：[#76209](https://github.com/anthropics/claude-code/issues/76209)、[#76228](https://github.com/anthropics/claude-code/issues/76228)、[#76214](https://github.com/anthropics/claude-code/issues/76214)

4. **权限系统需要更可靠的“记忆”和“恢复”**  
   `Always allow`、session limit、permission stream 等问题都指向同一个方向：权限状态不能漂移。  
   代表 Issue：[#76211](https://github.com/anthropics/claude-code/issues/76211)、[#76217](https://github.com/anthropics/claude-code/issues/76204)

5. **模型行为与安全边界仍需要持续收紧**  
   包括误触发 safeguards、模型无故切换、以及最严重的命令执行安全事故。  
   代表 Issue：[#76208](https://github.com/anthropics/claude-code/issues/76208)、[#76195](https://github.com/anthropics/claude-code/issues/76195)、[#76222](https://github.com/anthropics/claude-code/issues/76222)

6. **跨平台一致性问题依旧突出**  
   Windows、macOS、Linux/WSL、映射盘、ARM64 等场景下，session、UI、路径和挂载逻辑都存在差异。  
   代表 Issue：[#76187](https://github.com/anthropics/claude-code/issues/76187)、[#76205](https://github.com/anthropics/claude-code/issues/76205)、[#76210](https://github.com/anthropics/claude-code/issues/76210)

---

## 5. 开发者关注点
- **回归频率高，且多发生在最新更新后**：`regression`、`has repro` 标签反复出现，说明发布后回归监控压力较大。  
  代表：[#76187](https://github.com/anthropics/claude-code/issues/76187)、[#76211](https://github.com/anthropics/claude-code/issues/76211)

- **Agent/Subagent 的状态一致性是当前最敏感的系统点**：一旦 session、task store、权限流或身份标识出错，问题会迅速放大。  
  代表：[#76221](https://github.com/anthropics/claude-code/issues/76221)、[#76218](https://github.com/anthropics/claude-code/issues/76204)

- **权限和安全边界需要更强的默认保护**：从 `Always allow` 规则失真到命令真实执行误伤，说明“可执行内容”与“确认提示”的隔离仍需加强。  
  代表：[#76211](https://github.com/anthropics/claude-code/issues/76211)、[#76208](https://github.com/anthropics/claude-code/issues/76208)

- **MCP 接入体验仍偏脆弱**：标准兼容、发现机制、参数类型和可发现性都在被集中检验。  
  代表：[#76209](https://github.com/anthropics/claude-code/issues/76209)、[#76228](https://github.com/anthropics/claude-code/issues/76214)

- **企业场景下的 Windows/网络盘/桌面端细节问题很多**：说明桌面产品在真实生产环境中的路径和文件系统兼容性仍是重点。  
  代表：[#76205](https://github.com/anthropics/claude-code/issues/76205)、[#76206](https://github.com/anthropics/claude-code/issues/76206)、[#76187](https://github.com/anthropics/claude-code/issues/76187)

如果你愿意，我也可以把这份日报进一步整理成 **“高管摘要版”** 或 **“研发周会版”** 两个不同风格。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-07-10）

## 1) 今日速览
今天 Codex 社区的焦点非常集中：**CLI/工具调用稳定性、模型兼容性、以及桌面端回归问题**。同时，最新发布的 **0.144.1** 已经开始针对安装与 code-mode host 问题做修复，说明社区反馈正在快速反哺版本迭代。  
另一个明显趋势是，仓库内部正在推进 **Path URI / sandbox / exec-server** 这类底层架构改造，为后续权限与执行链路统一铺路。

---

## 2) 版本发布

### `rust-v0.144.1` / `0.144.1`
- 修复了 **GitHub 发布元数据顺序/压缩变化** 导致的独立安装失败问题。
- 修复了 **macOS 包未暴露 `codex-code-mode-host`** 的问题，直接对应今天高热 Issue #31906。
- 增强了 code mode 的容错：当 companion host binary 不可用时，仍尽量保持工作。

链接：  
- [Release 0.144.1](https://github.com/openai/codex/releases/tag/rust-v0.144.1)

### `rust-v0.144.0` / `0.144.0`
- 新增 **usage-limit reset credits** 的类型与过期时间展示，并支持选择兑换哪种 credit。
- 新增 `writes` app-approval 模式：允许声明为只读的操作，写操作则继续提示审批。
- MCP tools 支持 **交互式认证请求**。

链接：  
- [Release 0.144.0](https://github.com/openai/codex/releases/tag/rust-v0.144.0)

### 预览版
- `0.145.0-alpha.2`
- `0.145.0-alpha.1`
- `0.144.0-alpha.4`

链接：  
- [0.145.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.2)  
- [0.145.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.145.0-alpha.1)  
- [0.144.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.144.0-alpha.4)

---

## 3) 社区热点 Issues

### 1. `#31906` Homebrew cask 缺少 `codex-code-mode-host`，所有命令失败
- **重要性**：这是今天最热的 CLI 事故之一，直接导致命令无法执行。
- **社区反应**：**8 条评论、28 个赞**，明显是高影响、高共鸣问题。
- 链接：[#31906](https://github.com/openai/codex/issues/31906)

### 2. `#31882` Azure 上 `gpt-5.6-sol/terra/luna` 因硬编码 `use_responses_lite` / `multi_agent_version` 触发 400
- **重要性**：影响 **Azure / 非 ChatGPT backend** 的模型提供方兼容性，是企业场景核心问题。
- **社区反应**：5 条评论、10 个赞，说明有明确复现与实际业务影响。
- 链接：[#31882](https://github.com/openai/codex/issues/31882)

### 3. `#31898` 五小时 usage limit 异常快速耗尽
- **重要性**：直接关系到计费与额度体验，用户感知极强。
- **社区反应**：3 条评论、1 个赞，属于“先爆发、待确认”的账单类痛点。
- 链接：[#31898](https://github.com/openai/codex/issues/31898)

### 4. `#31894` `codex exec` 中 `gpt-5.6` Responses Lite turn 不暴露 exec/code-mode tools
- **重要性**：这是 **模型请求形态变化** 影响工具可用性的典型问题，属于平台级回归。
- **社区反应**：3 条评论，问题描述清晰，容易形成修复分支。
- 链接：[#31894](https://github.com/openai/codex/issues/31894)

### 5. `#31961` macOS 迁移后通知路径残留，完成音效失效
- **重要性**：桌面端统一迁移后的体验回归，影响通知闭环。
- **社区反应**：2 条评论，说明问题较新但已被注意到。
- 链接：[#31961](https://github.com/openai/codex/issues/31961)

### 6. `#31946` macOS 上 1,360 个 Node 进程吃掉 41GB 内存并卡死 WindowServer
- **重要性**：严重性能/资源泄漏问题，已上升到系统级故障。
- **社区反应**：2 条评论，虽然评论不多，但问题严重性很高。
- 链接：[#31946](https://github.com/openai/codex/issues/31946)

### 7. `#31928` Codex CLI 循环直到上下文被压缩
- **重要性**：提示模型/会话控制逻辑可能出现死循环或状态失控。
- **社区反应**：2 条评论，属于稳定性类问题。
- 链接：[#31928](https://github.com/openai/codex/issues/31928)

### 8. `#31958` Windows 提权 sandbox 让每个 `shell_command` 延迟约 88 秒
- **重要性**：这是明显的 Windows 性能退化，且发生在最常见的 shell 路径。
- **社区反应**：1 条评论、1 个赞，当前反馈还不多，但影响巨大。
- 链接：[#31958](https://github.com/openai/codex/issues/31958)

### 9. `#31905` ChatGPT Plus 无法使用 `gpt-5.6-sol`
- **重要性**：模型可用性与订阅权限直接相关，影响面大。
- **社区反应**：已关闭，但仍有 2 条评论、2 个赞，说明用户关注度不低。
- 链接：[#31905](https://github.com/openai/codex/issues/31905)

### 10. `#31893` `gpt-5.6` 强制受限 `spawn_agent` schema，导致自定义 agent 不可用
- **重要性**：影响多 agent / subagent 工作流，是高级用户很在意的能力。
- **社区反应**：已关闭，2 条评论、1 个赞；问题虽不算爆炸，但对工作流破坏明显。
- 链接：[#31893](https://github.com/openai/codex/issues/31893)

---

## 4) 重要 PR 进展

### 1. `#31960` `sandboxing: add URI permission transforms`
- 引入 URI 语义下的权限转换，避免过早转成本地路径。
- 这是权限/沙箱现代化的重要基础设施。
- 链接：[#31960](https://github.com/openai/codex/pull/31960)

### 2. `#31955` `path-uri: add URI-relative path helpers`
- 补齐 URI 相对路径工具，强化 containment/显示逻辑分离。
- 为后续路径类型迁移打地基。
- 链接：[#31955](https://github.com/openai/codex/pull/31955)

### 3. `#31952` `protocol: keep special path subpaths opaque`
- 将 special path 的子路径保持为 opaque，避免过早赋予 host path 语义。
- 典型的协议层抽象收敛。
- 链接：[#31952](https://github.com/openai/codex/pull/31952)

### 4. `#31951` `Assume models support reasoning summaries`
- 统一默认假设 bundled catalog 模型都支持 reasoning summaries。
- 减少 capability bit 传播带来的兼容分支。
- 链接：[#31951](https://github.com/openai/codex/pull/31951)

### 5. `#31950` `protocol: genericize permission path models`
- 将权限路径模型泛型化，便于后续迁移到 `PathUri`。
- 这类改动通常是大迁移前的关键一步。
- 链接：[#31950](https://github.com/openai/codex/pull/31950)

### 6. `#31949` `path-uri: add host absolute path helper`
- 新增 legacy app path string 到 host-native absolute path 的转换辅助。
- 是兼容旧路径字符串的重要桥接层。
- 链接：[#31949](https://github.com/openai/codex/pull/31949)

### 7. `#31945` `Support multiple external agent import sources`
- 支持从多个外部来源导入 agent 配置。
- 直接增强生态与迁移能力。
- 链接：[#31945](https://github.com/openai/codex/pull/31945)

### 8. `#31939` `Cache watched rg file inventories`
- 缓存 `rg --files` 结果，减少大仓库重复扫描成本。
- 这是性能优化，尤其适合 monorepo 场景。
- 链接：[#31939](https://github.com/openai/codex/pull/31939)

### 9. `#31938` `skills: make code-review more adversarial`
- 让 code review 更“对抗式”，提升审查质量。
- 体现出对 AI 评审质量的进一步打磨。
- 链接：[#31938](https://github.com/openai/codex/pull/31938)

### 10. `#31937` `exec-server: expose process helper to outer sandbox`
- 让 outer sandbox 可访问 process helper，避免受限文件系统导致执行链路断裂。
- 与 exec-server/sandbox 体系稳定性直接相关。
- 链接：[#31937](https://github.com/openai/codex/pull/31937)

---

## 5) 功能需求趋势

从今天的 Issues 看，社区最关注的方向主要有 5 类：

1. **CLI / tool-calls 稳定性**
   - `code-mode host`、`exec` 工具暴露、shell command 失败等问题非常集中。
   - 说明用户对“能不能顺利执行”比“能不能更聪明”更敏感。
   - 相关链接：[#31906](https://github.com/openai/codex/issues/31906)、[#31894](https://github.com/openai/codex/issues/31894)

2. **模型与后端兼容性**
   - `gpt-5.6` 在 Azure、Plus、custom provider 上的兼容问题明显增加。
   - 反映出新模型上线后，后端路由与 request shape 需要更强的适配层。
   - 相关链接：[#31882](https://github.com/openai/codex/issues/31882)、[#31905](https://github.com/openai/codex/issues/31905)

3. **额度与计费透明度**
   - usage-limit、monthly quota、五小时窗口等反馈持续出现。
   - 用户希望额度展示更准确、更可预测。
   - 相关链接：[#31898](https://github.com/openai/codex/issues/31898)、[#31914](https://github.com/openai/codex/issues/31914)

4. **桌面端集成与交互回归**
   - macOS/Windows/Chrome extension/Remote SSH 的问题较多。
   - 说明 App 统一后，用户对快捷键、通知、排序、侧边栏等基础体验非常敏感。
   - 相关链接：[#31961](https://github.com/openai/codex/issues/31961)、[#31925](https://github.com/openai/codex/issues/31925)、[#31904](https://github.com/openai/codex/issues/31904)

5. **性能与沙箱可靠性**
   - Windows sandbox 延迟、macOS Node 进程暴涨、文件扫描重复开销等都指向性能和资源管理。
   - 相关链接：[#31958](https://github.com/openai/codex/issues/31958)、[#31946](https://github.com/openai/codex/issues/31946)、[#31939](https://github.com/openai/codex/pull/31939)

---

## 6) 开发者关注点

今天社区反馈暴露出以下高频痛点：

- **安装包/发布产物完整性**：缺少 host binary、release 元数据兼容性等问题会直接让 CLI 失效。  
  链接：[#31906](https://github.com/openai/codex/issues/31906)

- **模型请求协议变化带来的回归**：Responses Lite、multi-agent schema、tool exposure 的改变，容易在新模型上触发 400 或工具不可用。  
  链接：[#31882](https://github.com/openai/codex/issues/31882)、[#31894](https://github.com/openai/codex/issues/31894)

- **额度/权限/审批体验需要更清晰**：用户在新限额体系下更关注“为什么耗得这么快”和“哪些操作需要审批”。  
  链接：[#31898](https://github.com/openai/codex/issues/31898)、[Release 0.144.0](https://github.com/openai/codex/releases/tag/rust-v0.144.0)

- **桌面端统一后的回归成本高**：通知、快捷键、会话排序、远程 SSH、Markdown/comment workflow 等都在被逐一检验。  
  链接：[#31961](https://github.com/openai/codex/issues/31961)、[#31925](https://github.com/openai/codex/issues/31925)、[#31915](https://github.com/openai/codex/issues/31915)

- **性能与资源占用是“硬指标”**：无论是 Node 进程膨胀、Windows sandbox 延迟，还是 monorepo 扫描开销，都会立刻影响用户是否继续用。  
  链接：[#31946](https://github.com/openai/codex/issues/31946)、[#31958](https://github.com/openai/codex/issues/31958)、[#31939](https://github.com/openai/codex/pull/31939)

如果你愿意，我还可以把这份日报进一步整理成：
1. **适合发群的精简版**，或  
2. **带“影响面/优先级/建议跟进动作”的运维看板版**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# 2026-07-10 Gemini CLI 社区动态日报

## 1. 今日速览
今天社区关注点高度集中在 **认证流程异常、429/重试死循环、以及安全相关问题**。其中，Windows/macOS 的 OAuth 反复跳转、429 触发的无限 fallback、以及 `pull_request_target` 带来的供应链 RCE 风险，都是会直接影响可用性与安全性的高优先级议题。  
同时，夜间版发布失败也在今天被捕获，说明当前不仅是功能问题，CI/发布链路稳定性同样承压。

---

## 2. 社区热点 Issues
> 说明：本日报基于过去 24 小时更新的全部 **9 条 Issue** 进行筛选整理。

1. **[#28341 Infinite auth loop](https://github.com/google-gemini/gemini-cli/issues/28341)**  
   - 重要性：Windows 上 OAuth 反复进入认证流，直接阻断使用。  
   - 社区反应：3 条评论、1 个 👍，说明已有人持续跟进，且问题复现明确。  
   - 关注点：跨版本仍存在，像是认证状态/回调落盘逻辑未稳定。

2. **[#28342 Nightly Release Failed for v0.52.0-nightly...](https://github.com/google-gemini/gemini-cli/issues/28342)**  
   - 重要性：夜间版发布失败，影响持续交付和回归验证。  
   - 社区反应：2 条评论，属于典型的发布链路告警。  
   - 关注点：CI/Release 工作流稳定性，属于 P1 级别的工程风险。

3. **[#28339 Infinite Fallback Loop on retryable errors (429 RESOURCE_EXHAUSTED)](https://github.com/google-gemini/gemini-cli/issues/28339)**  
   - 重要性：429 或其他可恢复错误触发无限等待，导致 CLI “挂死”。  
   - 社区反应：当前 0 评论，但问题描述直指核心可靠性。  
   - 关注点：重试策略、退避机制、超时/熔断都值得立即排查。

4. **[#28336 Security: supply chain RCE via pull_request_target in eval-pr.yml](https://github.com/google-gemini/gemini-cli/issues/28336)**  
   - 重要性：这是高危安全问题，涉及 fork 代码在带 secrets 的环境中执行。  
   - 社区反应：虽未见评论，但已被标记为 security 相关，优先级极高。  
   - 关注点：GitHub Actions 权限边界、`pull_request_target` 使用方式、Secrets 暴露面。

5. **[#28337 OAuth succeeds and credentials are saved, but Gemini CLI 0.50.0 keeps re-entering auth flow on macOS](https://github.com/google-gemini/gemini-cli/issues/28337)**  
   - 重要性：macOS 上认证成功却仍循环进入认证流程，影响面广。  
   - 社区反应：0 评论，但与 #28341 形成跨平台共性问题。  
   - 关注点：本地凭据保存、token 校验、平台差异。

6. **[#28338 Unable to complete a chat](https://github.com/google-gemini/gemini-cli/issues/28338)**  
   - 重要性：核心聊天流程无法完成，属于基础可用性问题。  
   - 社区反应：当前 0 评论，但问题直指 agent 主流程稳定性。  
   - 关注点：建议结合导出的 chat history 进一步定位中断点。

7. **[#28340 ui.errorVerbosity = "full", does not display retry progress indicators in the UI](https://github.com/google-gemini/gemini-cli/issues/28340)**  
   - 重要性：重试期间缺少关键状态提示，影响排障和用户感知。  
   - 社区反应：1 条评论，说明属于可观察性/UX 退化但复现清晰。  
   - 关注点：spinner 状态机与错误详情展示逻辑。

8. **[#28332 GeminiCLI.com Feedback: [ISSUE]](https://github.com/google-gemini/gemini-cli/issues/28332)**  
   - 重要性：网站端反馈显示认证未完成、产品授权状态异常。  
   - 社区反应：1 条评论，来自外部用户反馈，说明站点/授权链路仍有摩擦。  
   - 关注点：GeminiCLI.com 的认证提示与产品授权说明需要更准确。

9. **[#28329 GeminiCLI.com Feedback: [ISSUE]](https://github.com/google-gemini/gemini-cli/issues/28329)**  
   - 重要性：用户反馈 Gemini 3.1 Pro Preview 429 错误，反映模型侧/配额侧体验问题。  
   - 社区反应：1 条评论，属于典型的“服务可用性”反馈。  
   - 关注点：模型访问限制、限流提示、错误解释是否足够清晰。

---

## 3. 重要 PR 进展
> 说明：本日报基于过去 24 小时更新的全部 **8 条 PR** 进行整理。

1. **[#28346 Fix trust dialog disclosure for runnable hooks](https://github.com/google-gemini/gemini-cli/pull/28346)**  
   - 内容：修正可运行 hook 的信任弹窗披露逻辑，避免错误识别 flat 配置。  
   - 价值：直接关联安全提示与执行边界，减少误报/漏报。

2. **[#28345 feat(caretaker-triage): implement LLM triage orchestrator and container build](https://github.com/google-gemini/gemini-cli/pull/28345)**  
   - 内容：引入 LLM triage orchestrator、结构化日志和 Cloud Run 容器构建。  
   - 价值：明显是面向自动化分诊/运维效率的基础设施增强。

3. **[#28344 Feat/eval validate](https://github.com/google-gemini/gemini-cli/pull/28344)**  
   - 内容：新增 `eval:validate` 静态分析命令，对 eval 源文件做规则校验。  
   - 价值：适合 CI gating，提升规则一致性与发布前质量控制。

4. **[#28343 fix(core): use unambiguous previous intent label in fallback summary](https://github.com/google-gemini/gemini-cli/pull/28343)**  
   - 内容：修复历史摘要中“上一轮意图”标签歧义，避免 agent 继续回答旧问题。  
   - 价值：已关闭，属于会话上下文与 prompt steering 的关键修复。

5. **[#28334 Fix/bug 28300 clean](https://github.com/google-gemini/gemini-cli/pull/28334)**  
   - 内容：标题显示为 bug 清理类修复，但摘要信息不足。  
   - 价值：从编号和优先级看，应是针对已有缺陷的补丁整理。

6. **[#28333 feat(core): implement conscious stagnation detection for resilient agentic loops](https://github.com/google-gemini/gemini-cli/pull/28333)**  
   - 内容：为 agent loop 增加 stagnation detection、guided recovery 和熔断机制。  
   - 价值：针对 `/rewind` 或无 tool call 终止的问题，提升循环韧性。

7. **[#28331 feat(core): implement conscious stagnation detection for resilient agentic loops](https://github.com/google-gemini/gemini-cli/pull/28331)**  
   - 内容：与 #28333 同方向的 agent loop 稳定性增强。  
   - 价值：说明该方向正在被集中攻坚，优先级较高。

8. **[#28330 fix(ide-companion): set token file mode atomically to close TOCTOU window](https://github.com/google-gemini/gemini-cli/pull/28330)**  
   - 内容：修复 token 文件权限设置的 TOCTOU 窗口，改为原子化处理。  
   - 价值：典型安全加固，降低短暂世界可读带来的风险。

---

## 4. 功能需求趋势
从今天的 Issue 分布看，社区最关注的方向主要有：

- **认证与账号授权稳定性**  
  - Windows/macOS OAuth 反复跳转、认证成功却重新进入流程、网站端授权失败，说明登录链路仍是高频痛点。  
  - 相关链接：[#28341](https://github.com/google-gemini/gemini-cli/issues/28341), [#28337](https://github.com/google-gemini/gemini-cli/issues/28337), [#28332](https://github.com/google-gemini/gemini-cli/issues/28332)

- **重试、退避与“无限等待”治理**  
  - 429/RESOURCE_EXHAUSTED 触发无限 fallback、UI 看不到重试进度，表明用户对“可恢复错误”的处理体验非常敏感。  
  - 相关链接：[#28339](https://github.com/google-gemini/gemini-cli/issues/28339), [#28340](https://github.com/google-gemini/gemini-cli/issues/28340), [#28329](https://github.com/google-gemini/gemini-cli/issues/28329)

- **安全加固与权限边界**  
  - `pull_request_target`、hook 信任提示、token 文件权限，说明社区非常关注执行边界和 Secrets 暴露面。  
  - 相关链接：[#28336](https://github.com/google-gemini/gemini-cli/issues/28336), [#28346](https://github.com/google-gemini/gemini-cli/pull/28346), [#28330](https://github.com/google-gemini/gemini-cli/pull/28330)

- **Agent 主流程稳定性与上下文恢复**  
  - 无法完成 chat、fallback summary 歧义、stagnation detection 等问题，反映出大家希望 agent 更“稳”、更连续。  
  - 相关链接：[#28338](https://github.com/google-gemini/gemini-cli/issues/28338), [#28343](https://github.com/google-gemini/gemini-cli/pull/28343), [#28333](https://github.com/google-gemini/gemini-cli/pull/28333)

- **发布/CI 与自动化治理**  
  - nightly release failure、eval validate、triage orchestrator 说明工程化能力仍在加速完善。  
  - 相关链接：[#28342](https://github.com/google-gemini/gemini-cli/issues/28342), [#28344](https://github.com/google-gemini/gemini-cli/pull/28344), [#28345](https://github.com/google-gemini/gemini-cli/pull/28345)

---

## 5. 开发者关注点
今天的开发者反馈里，最突出的痛点有：

- **“能登录但不能用” 类问题频发**：认证循环、授权状态异常、凭据已保存仍反复跳转，说明 auth 状态机需要更强一致性。  
  - 参考：[#28341](https://github.com/google-gemini/gemini-cli/issues/28341), [#28337](https://github.com/google-gemini/gemini-cli/issues/28337), [#28332](https://github.com/google-gemini/gemini-cli/issues/28332)

- **可恢复错误不应造成永久挂起**：429、fallback、spinner 卡住等问题会让用户感知为“程序死了”。  
  - 参考：[#28339](https://github.com/google-gemini/gemini-cli/issues/28339), [#28340](https://github.com/google-gemini/gemini-cli/issues/28340), [#28329](https://github.com/google-gemini/gemini-cli/issues/28329)

- **安全审计压力持续上升**：CI 工作流、hook 执行、token 文件权限，都是当前最容易被放大的风险点。  
  - 参考：[#28336](https://github.com/google-gemini/gemini-cli/issues/28336), [#28346](https://github.com/google-gemini/gemini-cli/pull/28346), [#28330](https://github.com/google-gemini/gemini-cli/pull/28330)

- **需要更好的诊断信息与 triage 入口**：不少 Issue 处于 need-triage / need-information，说明自动补充环境、历史、日志的能力仍有提升空间。  
  - 参考：[#28338](https://github.com/google-gemini/gemini-cli/issues/28338), [#28341](https://github.com/google-gemini/gemini-cli/issues/28341), [#28340](https://github.com/google-gemini/gemini-cli/issues/28340)

- **agent 行为连续性是核心体验指标**：用户希望 rewind、无 tool call、上下文压缩后仍能稳定继续，而不是提前终止或答非所问。  
  - 参考：[#28343](https://github.com/google-gemini/gemini-cli/pull/28343), [#28333](https://github.com/google-gemini/gemini-cli/pull/28333), [#28331](https://github.com/google-gemini/gemini-cli/pull/28331)

---

如果你希望，我也可以把这份日报进一步整理成：
1. **适合内部 Slack/飞书发布的短版**，或  
2. **适合周报/晨会汇报的表格版**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# 2026-07-10 GitHub Copilot CLI 社区动态日报

## 1) 今日速览
过去 24 小时，Copilot CLI 的讨论焦点明显集中在**稳定性回归**与**交互队列行为**上，尤其是 Windows Terminal / WSL2 环境中的 TUI 卡死、黑屏和输入失效问题。与此同时，新版本 `v1.0.70-0` 带来了**插件 SHA 锁定**、**按会话切换 sandbox** 和 **/refine** 等能力，说明团队仍在持续增强可控性与工作流效率。  
GitHub 链接： [github.com/github/copilot-cli](https://github.com/github/copilot-cli)

---

## 2) 版本发布
### `v1.0.70-0`
GitHub 链接： [Release v1.0.70-0](https://github.com/github/copilot-cli/releases/tag/v1.0.70-0)

**主要更新：**
- 支持在插件源配置中通过 `sha` 字段将插件**锁定到精确 commit**
- 新增 `--sandbox` 和 `--no-sandbox` 标志，可在**当前会话**临时切换 OS 级 shell sandbox，**不修改**已保存设置
- 新增 `/refine` 命令，用于重写/精炼已有内容

**解读：**
- `sha` 锁定强化了供应链可复现性，适合企业和自动化场景
- `--sandbox/--no-sandbox` 提升了临时调试的灵活度
- `/refine` 继续补齐交互式编辑能力，偏向“对话式迭代”工作流

---

## 3) 社区热点 Issues
> 说明：以下按“影响面 + 反馈强度 + 对产品方向的指示性”筛选；其中少数条目属于低质量/无效反馈，但仍反映了公开 issue 流量特征。

1. **TUI 中途卡死、屏幕清空、输入失效，WSL2 + Windows Terminal 下尤为明显**  
   GitHub 链接： [Issue #4069](https://github.com/github/copilot-cli/issues/4069)  
   - 影响：高，直接阻断核心交互流程，且涉及 `EIO/EPIPE` 这类底层通道错误
   - 反应：6 条评论、7 个 👍，是当天最受关注的问题之一
   - 价值：强烈指向 **Windows/WSL 终端稳定性** 与 **流式输出管道健壮性** 需要优先修复

2. **Windows Terminal 下 TUI 黑屏挂起，但内容仍可通过 `--resume` 恢复**  
   GitHub 链接： [Issue #4077](https://github.com/github/copilot-cli/issues/4077)  
   - 影响：高，表面上“黑屏”，实则会打断用户感知和信任
   - 反应：1 条评论、1 个 👍，与 #4069 形成同类回归信号
   - 价值：说明恢复能力已有，但**前台状态展示/刷新**有问题，属于体验型阻断

3. **定时提示（`/every`、`/after`）会中断并暂停任务队列**  
   GitHub 链接： [Issue #4079](https://github.com/github/copilot-cli/issues/4079)  
   - 影响：高，涉及自动化/计划任务场景，可能导致长时间停摆
   - 反应：已被快速提报，说明预期偏差明显
   - 价值：暴露出 **调度任务与主队列并发/抢占策略** 需要重新设计

4. **定时提示会“杀死”现有 prompt 队列，后续任务不再继续**  
   GitHub 链接： [Issue #4078](https://github.com/github/copilot-cli/issues/4078)  
   - 影响：高，与 #4079 同属队列中断类问题
   - 反应：当天新增，说明用户已经在真实工作流中使用定时能力
   - 价值：提示“队列恢复”逻辑缺失，属于**调度系统一致性**问题

5. **研究型 agent 的 MCP 工具不可配置**  
   GitHub 链接： [Issue #4076](https://github.com/github/copilot-cli/issues/4076)  
   - 影响：中高，面向高级用户/企业用户
   - 反应：1 条评论，反映出有人在尝试把 Copilot CLI 接入更复杂的工具链
   - 价值：体现社区对 **MCP 可扩展性** 的关注，尤其希望 `/research` 能访问自定义 MCP server

6. **使用图片进行 UX 自检后，CLI 容易进入损坏状态**  
   GitHub 链接： [Issue #4075](https://github.com/github/copilot-cli/issues/4075)  
   - 影响：中高，涉及图像附件这一日益常见的工作流
   - 反应：虽然暂无评论，但问题描述较具体，指向可复现的交互退化
   - 价值：说明 **多模态输入/附件处理** 的稳定性仍是短板

7. **`/session` 和 `/resume` 选择器只显示当前会话，隐藏历史会话**  
   GitHub 链接： [Issue #4071](https://github.com/github/copilot-cli/issues/4071)  
   - 影响：中高，直接影响会话管理与恢复效率
   - 反应：由微软内部相关账号提报，可信度和优先级都较高
   - 价值：这是一个典型的 **回归问题**，与会话可发现性和可恢复性强相关

8. **高亮复制输出时，输入行出现乱码/垃圾文本**  
   GitHub 链接： [Issue #4070](https://github.com/github/copilot-cli/issues/4070)  
   - 影响：中，属于高频交互中的输入输出污染
   - 反应：无评论但问题直指 TUI 输入层
   - 价值：说明 **终端选中复制与键盘输入事件** 的边界处理仍不稳定

9. **无效/异常 issue：直接贴出 issues/new/choose 链接并写“恢复邮箱”**  
   GitHub 链接： [Issue #4072](https://github.com/github/copilot-cli/issues/4072)  
   - 影响：低，明显不符合仓库问题模板
   - 反应：已被关闭为 `invalid`
   - 价值：反映公开 issue 中仍存在一定**低质量噪声**，会增加维护负担

10. **低信息量重复提问：“What do you main”**  
    GitHub 链接： [Issue #4073](https://github.com/github/copilot-cli/issues/4073)  
    - 影响：低，缺乏可执行信息
    - 反应：无评论
    - 价值：属于社区噪声样本，对产品判断价值有限，但会干扰 triage

---

## 4) 重要 PR 进展
过去 24 小时**没有 PR 更新**，暂无可跟踪的 PR 进展。  
GitHub 链接： [Pull requests](https://github.com/github/copilot-cli/pulls)

---

## 5) 功能需求趋势
从近 24 小时 Issue 看，社区关注点主要集中在以下方向：

1. **终端/TUI 稳定性**
   - Windows Terminal、WSL2、输入卡死、黑屏、输出管道异常
   - 说明 CLI 的核心竞争力仍取决于终端交互的可靠性

2. **会话管理与恢复能力**
   - `/resume`、`/session`、历史会话可见性、恢复后状态一致性
   - 用户希望“可中断、可恢复、可追溯”

3. **任务队列与调度语义**
   - `/every`、`/after`、队列中断、抢占、恢复策略
   - 自动化场景正在增多，调度逻辑成为新痛点

4. **可扩展工具链 / MCP 集成**
   - 研究型 agent 能否接入自定义 MCP servers
   - 高级用户希望将 Copilot CLI 融入现有开发工具生态

5. **多模态与附件工作流**
   - 图片、文档附件在实际使用中会引发状态异常
   - 说明“带上下文的验证/截图反馈”已经进入真实使用阶段

6. **可控性与可复现性**
   - 插件 SHA 锁定、sandbox 临时切换
   - 企业与自动化用户更关注“固定版本 + 可审计行为”

---

## 6) 开发者关注点
从开发者反馈中，可以提炼出几类高频痛点：

- **终端兼容性是第一优先级**
  - 尤其是 Windows 生态下的 TUI 渲染、输入输出、信号处理问题
  - `EIO/EPIPE`、黑屏、输入失效都说明底层稳定性仍需强化

- **队列/调度需要更严格的状态机**
  - 定时提示不应破坏现有队列
  - 需要明确“抢占、暂停、恢复、继续执行”的语义边界

- **会话恢复必须可见且可信**
  - 内容虽然在磁盘上，但 UI 不能只展示当前会话
  - 用户对“可恢复”的期待不仅是数据存在，还包括发现路径清晰

- **多模态输入的状态隔离不足**
  - 图片或附件进入流程后，CLI 容易出现连锁异常
  - 需要更强的附件生命周期管理与错误隔离

- **高级可配置能力需求上升**
  - MCP 工具、插件 SHA、sandbox 控制都说明用户想要更强的“可塑性”
  - 未来竞争点不只是“能不能做”，而是“能否被安全、可控地集成进现有工作流”

如果你愿意，我还可以把这份日报进一步整理成**适合内部周报/晨报的更短版本**，或者输出为**表格版**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-07-10）

## 1. 今日速览
今天 Kimi Code CLI 社区整体非常安静：过去 24 小时内**没有新 Releases**、**没有更新的 Issues**，仅有 **1 个 PR** 在推进。  
当前最值得关注的变化是：Kimi CLI 正在向 **兼容 Claude Code 配置** 方向增强，尝试自动识别 `CLAUDE.md`，降低已有项目接入成本。

---

## 2. 版本发布
**无新版本发布。**

- GitHub Releases：`github.com/MoonshotAI/kimi-cli/releases`

---

## 3. 社区热点 Issues
**过去 24 小时内没有更新的 Issues（共 0 条），因此今日暂无可选的 10 个热点 Issue。**

- Issues 列表：`github.com/MoonshotAI/kimi-cli/issues`

> 说明：由于今日没有 Issue 活动，无法从社区反馈中提炼“关注度”“讨论热度”或“解决进展”。

---

## 4. 重要 PR 进展

### 1) #2487 feat(agent): support loading CLAUDE.md alongside AGENTS.md
- 状态：OPEN  
- 作者：nankingjing  
- 更新：2026-07-09  
- 链接：`github.com/MoonshotAI/kimi-cli/pull/2487`
- 价值：为 `load_agents_md()` 增加对 `CLAUDE.md` 和 `.claude/CLAUDE.md` 的发现逻辑，使已经使用 Claude Code 配置的项目能够被 Kimi CLI 自动识别。
- 影响：这类改动通常能明显降低迁移/双工具并存成本，属于典型的**生态兼容性增强**。

> 今日仅有这一条 PR，因此不存在“10 个重要 PR”可供筛选。

---

## 5. 功能需求趋势
由于今日没有 Issues 更新，**无法从 Issue 数据中提炼出新的社区需求趋势**。  
不过从唯一 PR 可以观察到一个明确方向：

- **配置兼容与迁移友好性**  
  Kimi CLI 正在增强对 `AGENTS.md` 之外配置文件的识别，说明社区/维护方可能在关注：
  - 与 Claude Code 的兼容
  - 既有项目的无缝接入
  - 降低配置迁移成本

---

## 6. 开发者关注点
从今天的 GitHub 活动看，开发者侧的关注点主要集中在：

1. **Agent 配置自动发现**  
   通过识别 `CLAUDE.md` / `.claude/CLAUDE.md`，减少手动配置工作量。  
   链接：`github.com/MoonshotAI/kimi-cli/pull/2487`

2. **工具链兼容性**  
   支持已有 Claude Code 生态配置，意味着 Kimi CLI 在增强与外部 AI 开发工具的互操作性。  
   链接：`github.com/MoonshotAI/kimi-cli/pull/2487`

3. **项目接入体验**  
   自动加载已有配置，通常会直接改善首用体验，降低“从别的工具迁移过来”的阻力。  
   链接：`github.com/MoonshotAI/kimi-cli/pull/2487`

---

如果你希望，我还可以把这份日报进一步整理成：
- **适合公众号/内部周报的精简版**
- **适合 Slack/飞书群推送的一屏版**
- **带“趋势判断 + 风险提示”的分析版**

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-07-10）

## 1) 今日速览
OpenCode 在过去 24 小时内保持了高频迭代，连续发布了 3 个小版本，重点修复了模型兼容、计费数据和桌面端体验问题。  
社区讨论的核心仍集中在 **GPT-5.6 / OpenAI 新模型兼容性**、**子代理/权限控制**、以及 **TUI/桌面端稳定性** 上，说明项目当前正处在“模型适配 + 交互打磨”的密集修复期。

## 2) 版本发布
- **v1.17.18**：修复 GitHub Copilot 返回 `zero billing batch size` 时可能导致的崩溃和错误计费数据；为 **Meta Muse Spark** 增加了模型专属 system prompt。  
  链接：https://github.com/anomalyco/opencode/releases/tag/v1.17.18
- **v1.17.17**：修复 Meta 模型在 reasoning variant 与 provider 请求上的处理问题；桌面端优化了模型选择器显示、增加 tabs 介绍弹窗和帮助入口等。  
  链接：https://github.com/anomalyco/opencode/releases/tag/v1.17.17
- **v1.17.16**：补齐 Grok 的 reasoning effort variants；优化 xAI prompt cache 路由与 PDF 支持；桌面端增加“打开项目文件夹”动作和文件/命令添加菜单。  
  链接：https://github.com/anomalyco/opencode/releases/tag/v1.17.16

## 3) 社区热点 Issues
1. **#36133 [CLOSED] Auth error with GPT 5.6-xxx models**  
   影响 GPT-5.6 新模型可用性，属于“请求直接失败”的高优先级问题；**5 条评论、2 个赞**，说明复现清晰、关注度高。  
   链接：https://github.com/anomalyco/opencode/issues/36133

2. **#36119 [OPEN] Apply Patch / Edit permission view only shows the first file**  
   多文件补丁授权时只展示首个文件，直接影响用户做安全确认；**5 条评论**，说明交互问题已被多位用户碰到。  
   链接：https://github.com/anomalyco/opencode/issues/36119

3. **#36162 [OPEN] Support processId: null for language servers running in containers**  
   面向容器化开发环境的 LSP 兼容性需求，属于 IDE/远程开发场景关键痛点；**4 条评论**，表明方案讨论已进入实操层。  
   链接：https://github.com/anomalyco/opencode/issues/36162

4. **#36127 [CLOSED] Error: Expected number, got null ... mercury-alpha cost input**  
   新 OpenAI 模型启用后启动报错，属于“启动即炸”的配置/数据完整性问题；**4 条评论、6 个赞**，是本日报里反响最强的故障之一。  
   链接：https://github.com/anomalyco/opencode/issues/36127

5. **#36147 [CLOSED] Add OPENCODE_SUBAGENT_MODEL env var to control subagent model**  
   子代理默认继承主会话模型，导致成本失控；社区请求用环境变量独立控制子代理模型，**3 条评论**，代表对“成本/模型隔离”的明确诉求。  
   链接：https://github.com/anomalyco/opencode/issues/36147

6. **#36137 [OPEN] I am getting unexpected server error on Opencode CLI**  
   CLI 级别的未知错误通常意味着日志不足或回归未定位；**3 条评论**，属于需要补充诊断信息的典型稳定性问题。  
   链接：https://github.com/anomalyco/opencode/issues/36137

7. **#36141 [OPEN] GPT-5.6 models missing max reasoning effort variant**  
   GPT-5.6 新模型的 `max` reasoning effort 未暴露，属于“新模型能力不完整”的兼容缺口；**2 条评论**，说明开发者已开始对照官方规格排查。  
   链接：https://github.com/anomalyco/opencode/issues/36141

8. **#36140 [OPEN] GPT-5.6 Luna returns model not found with ChatGPT OAuth**  
   ChatGPT OAuth 下 Luna 模型不可用，直接影响 OpenAI 订阅用户体验；虽然只有 **1 条评论，但有 4 个赞**，表明需求认可度高。  
   链接：https://github.com/anomalyco/opencode/issues/36140

9. **#36117 [OPEN] Await catalog readiness for model and provider reads**  
   服务重启后模型/Provider 列表可能短暂不完整，影响模型选择器和启动流程；**2 条评论**，说明这是偏“系统级时序”问题。  
   链接：https://github.com/anomalyco/opencode/issues/36117

10. **#36095 [OPEN] TUI variant cycling skips variants**  
    模型 variant 切换逻辑会跳过部分选项，属于高频交互 bug；**1 条评论**，但问题直指模型选择体验。  
    链接：https://github.com/anomalyco/opencode/issues/36095

## 4) 重要 PR 进展
1. **#36177 [OPEN] fix(core): preserve admitted tool generations**  
   让工具调用严格对应模型当时看到的注册信息，避免并发插件/配置刷新造成“工具过期”与崩溃恢复问题。  
   链接：https://github.com/anomalyco/opencode/pull/36177

2. **#36176 [OPEN] fix(tui): preserve initial user message on new session hydration**  
   修复新会话首条消息在 hydration 过程中的丢失，提升 TUI 新会话稳定性。  
   链接：https://github.com/anomalyco/opencode/pull/36176

3. **#36175 [OPEN] fix(core): mark user processes as opencode agents**  
   为 V2 core 的 shell/PTY 子进程打上 `AGENT=1` 和 `OPENCODE=1`，统一进程标识。  
   链接：https://github.com/anomalyco/opencode/pull/36175

4. **#36174 [CLOSED] fix(core): narrow ecosystem config watches**  
   调整生态目录的 watcher 范围，避免无关写入触发过度刷新，同时保留技能目录发现能力。  
   链接：https://github.com/anomalyco/opencode/pull/36174

5. **#36172 [OPEN] fix(app): preload more timeline messages**  
   将时间线初始加载量从 2 条提升到 20 条，减少首屏信息缺失。  
   链接：https://github.com/anomalyco/opencode/pull/36172

6. **#36169 [CLOSED] refactor(core): clean up compaction flow**  
   重构压缩流程，统一上下文选择与失败发布逻辑，降低后续维护复杂度。  
   链接：https://github.com/anomalyco/opencode/pull/36169

7. **#36168 [OPEN] docs: add external supervisor pattern for local agent execution**  
   新增“外部 supervisor”文档模式，帮助用户在本地 agent 执行中采用更安全的外部监管方案。  
   链接：https://github.com/anomalyco/opencode/pull/36168

8. **#36163 [CLOSED] fix(core): restore resilient compaction**  
   恢复手动压缩与 provider overflow 场景下的韧性处理，并保留流式/类型化错误。  
   链接：https://github.com/anomalyco/opencode/pull/36163

9. **#36160 [OPEN] fix(app): preserve timeline bottom anchoring**  
   修复时间线底部锚定问题，提升长列表/滚动场景下的可读性。  
   链接：https://github.com/anomalyco/opencode/pull/36160

10. **#36159 [OPEN] fix(core): preserve agent permission precedence**  
    统一全局权限、内置 agent 策略与用户自定义覆盖的优先级，避免权限意外回退。  
    链接：https://github.com/anomalyco/opencode/pull/36159

## 5) 功能需求趋势
从过去 24 小时的 Issues 看，社区关注点主要集中在：

- **新模型支持与兼容性**：GPT-5.6、Meta、Grok、DeepSeek、Copilot 等模型适配频繁出现。  
- **Reasoning/variant 控制**：`max reasoning effort`、variant 切换、模型专属 prompt 等细粒度能力需求明显上升。  
- **子代理与任务编排**：子代理模型独立配置、任务工具行为、权限继承等成为高频话题。  
- **IDE / LSP / 容器集成**：容器内语言服务器、processId、Workspace 路径、Desktop 体验等需求持续增长。  
- **稳定性与可观测性**：启动错误、stream error、session hydration、日志诊断、压缩恢复等“可恢复性”需求很强。  
- **权限与安全确认 UX**：多文件 patch 授权、权限优先级、预算/认证门禁等安全控制问题被反复讨论。

## 6) 开发者关注点
开发者反馈中最明显的痛点有三类：

- **模型/Provider 适配不稳定**：新模型字段、计费信息、reasoning 变体经常与 OpenCode 现有假设不一致。  
- **交互层细节影响可用性**：补丁授权只显示首文件、variant 切换跳项、时间线锚定、首条消息丢失，都会直接影响日常使用。  
- **诊断信息不够完整**：CLI 未知错误、stream error、容器内 LSP、session 搜索崩溃等问题都指向“需要更强的日志与状态一致性”。

如果你希望，我可以把这份日报进一步整理成 **“管理层摘要版”** 或 **“开发团队周会版”**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-07-10）

## 1. 今日速览
今天的焦点是 **v0.80.6** 发布：新增了更高一档的 `max` thinking level，已覆盖 CLI / SDK / RPC / 模型选择，说明项目正在继续强化“可控推理”能力。  
社区侧则高度集中在 **新模型支持、编排/compaction 可靠性、扩展生态兼容性** 三条主线上，GPT-5.6、Grok、缓存统计和交互稳定性是讨论最密集的方向。

---

## 2. 版本发布

- [v0.80.6](https://github.com/badlogic/pi-mono/releases/tag/v0.80.6)  
  新增 **`max` thinking level**，位于 `xhigh` 之上；原生支持 GPT-5.6 和自适应 Claude 模型，并可通过 CLI（`--thinking max`）、SDK、RPC 和模型选择使用。自定义主题也可定义 `thinkingMax`。  
- [v0.80.5](https://github.com/badlogic/pi-mono/releases/tag/v0.80.5)  
  小版本修订，当前数据中未展开更多细节。

---

## 3. 社区热点 Issues

1. [#6465 Add GPT-5.6 Sol, Terra, and Luna to OpenAI Codex model catalog](https://github.com/badlogic/pi-mono/issues/6465)  
   **重要性：** 直接关系到 GPT-5.6 在 Codex 生态中的可用性，属于“模型目录同步”类高优先需求。  
   **社区反应：** 5 条评论，关注点集中在模型元数据更新与兼容性对齐。

2. [#6461 Add built-in xAI Grok SuperGrok OAuth login](https://github.com/badlogic/pi-mono/issues/6461)  
   **重要性：** 补齐订阅式登录路径，减少对 API Key 的依赖，对付费用户体验影响明显。  
   **社区反应：** 3 条评论，说明该需求有明确用户基础，且诉求比较集中。

3. [#6458 Allow home directory (~) expansion in shell config setting](https://github.com/badlogic/pi-mono/issues/6458)  
   **重要性：** 属于典型配置体验优化，能明显降低跨机器/跨环境部署成本。  
   **社区反应：** 3 条评论，开发者对“路径自动展开”需求比较一致。

4. [#6454 Thinking blocks render empty HTML comments as text](https://github.com/badlogic/pi-mono/issues/6454)  
   **重要性：** 影响 TUI 输出可读性，属于高感知 UX bug，容易干扰思考内容展示。  
   **社区反应：** 3 条评论，说明这是用户很容易遇到的可见问题。

5. [#6469 bug(ai): GPT-5.6 cache writes are always reported as zero](https://github.com/badlogic/pi-mono/issues/6469)  
   **重要性：** 直接影响 token/缓存计费与性能分析，属于“准确性”问题，不是单纯展示 bug。  
   **社区反应：** 2 条评论，反馈不多但问题专业度高。

6. [#6464 bug: stale pre-compaction usage can shrink output budget after compaction](https://github.com/badlogic/pi-mono/issues/6464)  
   **重要性：** 会导致 compaction 后输出预算被错误压缩，影响模型响应长度和任务完成质量。  
   **社区反应：** 2 条评论，属于核心调度逻辑问题，影响面不小。

7. [#6462 coding-agent: /model switch does not cancel in-flight auto-retry](https://github.com/badlogic/pi-mono/issues/6462)  
   **重要性：** 切换模型后旧重试不应继续运行，否则会造成状态混乱和用户误判。  
   **社区反应：** 2 条评论，典型交互一致性问题。

8. [#6455 bug: extension npm dependencies fail to resolve; native-binary packages break under embedded runtime](https://github.com/badlogic/pi-mono/issues/6455)  
   **重要性：** 这是扩展生态的基础兼容性问题，直接影响第三方插件与 npm 依赖加载。  
   **社区反应：** 2 条评论，说明扩展作者/高级用户已经碰到实际阻塞。

9. [#6472 compaction.enabled=false bypassed by overflow recovery path](https://github.com/badlogic/pi-mono/issues/6472)  
   **重要性：** 配置项“关闭无效”是高风险问题，可能让用户对行为可控性失去信任。  
   **社区反应：** 1 条评论，但属于值得优先处理的逻辑漏洞。

10. [#6443 pi-ai: LLM requests hang indefinitely on a stalled provider connection](https://github.com/badlogic/pi-mono/issues/6443)  
    **重要性：** 请求无限挂起会直接拖垮使用体验，是基础可靠性问题。  
    **社区反应：** 1 条评论，虽然讨论少，但属于底层稳定性隐患。

---

## 4. 重要 PR 进展

1. [#6467 fix(package-manager): restore missing git package deps + pnpm-friendly install flags](https://github.com/badlogic/pi-mono/pull/6467)  
   修复 git 包依赖缺失导致的加载失败问题，并增强对 pnpm 安装方式的兼容性。

2. [#6463 fix(coding-agent): cancel auto-retry when switching models](https://github.com/badlogic/pi-mono/pull/6463)  
   在切换模型时取消进行中的 auto-retry，避免旧请求“串台”。

3. [#6460 feat(ai): add xAI Grok SuperGrok OAuth provider](https://github.com/badlogic/pi-mono/pull/6460)  
   新增 `xai-oauth` 订阅登录能力，保留原有 API Key 方式不变。

4. [#6471 fix(ai): correct GPT-5.6 Codex context window](https://github.com/badlogic/pi-mono/pull/6471)  
   将 GPT-5.6 Sol/Terra/Luna 的上下文窗口修正为 372k，解决元数据不一致。

5. [#6470 feat(coding-agent): expand ~ in shellPath setting](https://github.com/badlogic/pi-mono/pull/6470)  
   让 `shellPath` 支持 `~` 展开，和 session 路径处理保持一致。

6. [#6457 fix: send anthropic thinking blocks also when thinking text is empty](https://github.com/badlogic/pi-mono/pull/6457)  
   修复 Anthropic thinking block 在文本为空时未发送的问题。

7. [#6449 add ResourceExhausted as a retryable error](https://github.com/badlogic/pi-mono/pull/6449)  
   将 `ResourceExhausted` 纳入可重试错误，提升失败恢复能力。

8. [#6446 subagent example: use keyHint for expand hint](https://github.com/badlogic/pi-mono/pull/6446)  
   示例改用 `keyHint`，让提示文本跟随用户键位配置和国际化。

9. [#6441 Refresh MiniMax M3 parameters](https://github.com/badlogic/pi-mono/pull/6441)  
   刷新 MiniMax M3 的价格与 base URL，修正模型注册表信息。

10. [#6474 feat(ai): support message-anchored tool loading](https://github.com/badlogic/pi-mono/pull/6474)  
    提出“消息锚定工具加载”的 PoC，用于会话中途动态引入工具；当前明确标注为 proof of concept。

---

## 5. 功能需求趋势

- [新模型与新供应商接入](https://github.com/badlogic/pi-mono/issues/6465)  
  GPT-5.6、Grok 等新模型/登录方式需求很强，说明社区非常关注“跟进最新模型生态”的速度。

- [Compaction / 上下文预算 / thinking 控制](https://github.com/badlogic/pi-mono/issues/6464)  
  包括 `max` thinking level、上下文窗口修正、compaction 配置与预算计算，显示“上下文管理”是核心能力区。

- [交互体验与键位/输入流可控性](https://github.com/badlogic/pi-mono/issues/6454)  
  包括 `ctrl-p` 行为、初始键位加载、提示文本与历史输入等，说明重度用户对 TUI/CLI 交互一致性要求很高。

- [扩展生态与运行时兼容性](https://github.com/badlogic/pi-mono/issues/6455)  
  npm 依赖解析、git package、原生二进制包、扩展加载顺序，都是社区对插件生态“可用性”的集中反馈。

- [可靠性与超时/重试策略](https://github.com/badlogic/pi-mono/issues/6443)  
  包括请求挂死、重试取消、ResourceExhausted 重试策略，说明用户非常在意“失败是否可恢复、是否会卡死”。

---

## 6. 开发者关注点

- [模型元数据快速同步需求强](https://github.com/badlogic/pi-mono/issues/6465)  
  GPT-5.6、Copilot、Codex、Claude 的目录更新频繁，开发者希望 Pi 能更快跟上上游变化。

- [上下文/计费统计必须准确](https://github.com/badlogic/pi-mono/issues/6469)  
  cache write、usage 统计、context window、compaction 后预算都在被持续校验，说明“精确计量”已成为高频诉求。

- [交互状态机需要更强一致性](https://github.com/badlogic/pi-mono/issues/6462)  
  切模型、重试、审批、队列、steering 这些流程一旦不同步，用户体验会明显变差。

- [扩展兼容性是生态扩张瓶颈](https://github.com/badlogic/pi-mono/issues/6455)  
  现阶段最现实的痛点之一不是“能否写扩展”，而是“扩展能否稳定装载、依赖能否解析”。

- [稳定性问题优先级依旧很高](https://github.com/badlogic/pi-mono/issues/6443)  
  请求卡死、崩溃、缓存/compaction 异常这类底层问题，依然是开发者最关注的基础质量指标。

如果你愿意，我也可以把这份日报再压缩成 **“适合发群/发 Slack 的 1 分钟版”**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报｜2026-07-10

## 1) 今日速览
- 今天 Qwen Code 发布了新的 nightly 版本，核心修复集中在**子 agent 重复工具调用循环**与**session 历史链损坏**，对长会话稳定性帮助明显。  
- 社区讨论热度主要落在 **IDE 集成、跨平台剪贴板/输入、日志调试、性能与安全边界**；其中 JetBrains ACP、glob OOM、环境变量泄露等问题最受关注。  
- 同时，围绕多工作区、ACP 通道、调度任务和 subagent 可观测性的一系列 PR 也在快速推进，说明项目正向“更大规模、更强协作”的方向演进。  

## 2) 版本发布
- **[v0.19.8-nightly.20260710.205430235](https://github.com/QwenLM/qwen-code/releases/tag/v0.19.8-nightly.20260710.205430235)**  
  本次 nightly 主要更新包括：
  - 修复**重复 subagent tool-call 循环**（[PR #6543](https://github.com/QwenLM/qwen-code/pull/6543)）
  - 修复 **session 历史链断裂**问题
  - 更新并捆绑 **cua-driver-rs v0.7.1**，提供 macOS/Linux/Windows 预编译二进制，进一步支撑相对坐标能力

## 3) 社区热点 Issues
1. **[#6581 JetBrains Qwen Code ACP agent 不接收用户 prompt](https://github.com/QwenLM/qwen-code/issues/6581)**  
   - 重要性：直接影响 **IntelliJ / JetBrains 插件集成**可用性，属于高优先级接入阻塞。  
   - 社区反应：**8 条评论**，是本时段讨论最集中的问题之一，说明复现和定位都很活跃。

2. **[#6600 v0.19.8 `--debug` 打印日志路径但文件未创建](https://github.com/QwenLM/qwen-code/issues/6600)**  
   - 重要性：调试链路失效会显著影响排障效率，属于 CLI 基础能力问题。  
   - 社区反应：**4 条评论**，反馈聚焦在“能提示但不可用”的一致性缺陷。

3. **[#6614 Glob 工具在大路径上可能 OOM](https://github.com/QwenLM/qwen-code/issues/6614)**  
   - 重要性：这是 **P1 性能/内存安全**问题，实测可直接触发 Node OOM，影响真实任务执行。  
   - 社区反应：**2 条评论**，但优先级高，属于“低讨论、高风险”的典型问题。

4. **[#6601 Shell 子进程继承敏感环境变量，存在凭据泄露风险](https://github.com/QwenLM/qwen-code/issues/6601)**  
   - 重要性：涉及 **API Key / Token 泄露**，属于安全边界问题。  
   - 社区反应：**2 条评论**，虽然讨论不多，但安全属性决定其影响面很大。

5. **[#6629 Cron 解析器丢失单值步进语义（`5/15` 只匹配 5）](https://github.com/QwenLM/qwen-code/issues/6629)**  
   - 重要性：调度语义错误会导致定时任务行为偏离预期，属于基础逻辑 bug。  
   - 社区反应：**3 条评论**，说明已有较明确的复现和修复方向。

6. **[#6595 qwen3.7-max 可能泄漏 `<analysis>/<summary>` 标签并中断后续动作](https://github.com/QwenLM/qwen-code/issues/6595)**  
   - 重要性：影响 **模型协议稳定性**，会导致主响应与内部协议混杂，干扰工具链。  
   - 社区反应：**3 条评论**，属于模型输出治理类问题。

7. **[#6590 macOS standalone 安装缺失 `@teddyzhu/clipboard`，Ctrl+V 粘贴图片失效](https://github.com/QwenLM/qwen-code/issues/6590)**  
   - 重要性：直接影响 macOS 端图片输入，是用户高频交互路径。  
   - 社区反应：**3 条评论**，且根因已被明确到原生模块缺失。

8. **[#6597 为可疑评论附件增加轻量 GitHub Actions 审核守卫](https://github.com/QwenLM/qwen-code/issues/6597)**  
   - 重要性：聚焦社区安全治理，防止通过评论附件投递高风险文件。  
   - 社区反应：**3 条评论**，体现出对开源协作安全的持续关注。

9. **[#6577 Windows PowerShell / Windows Terminal 中 Alt+V 无法粘贴剪贴板截图](https://github.com/QwenLM/qwen-code/issues/6577)**  
   - 重要性：Windows 平台图片粘贴路径异常，属于跨平台输入兼容问题。  
   - 社区反应：**2 条评论**，与 macOS 剪贴板问题形成呼应，说明该能力是热点诉求。

10. **[#6569 提升 subagent 可观测性：实时执行可见、执行轨迹与人工介入](https://github.com/QwenLM/qwen-code/issues/6569)**  
    - 重要性：这是面向 **多 agent 协作**的关键体验升级，属于中长期能力建设。  
    - 社区反应：**2 条评论**，代表用户对复杂任务“可看、可控、可干预”的需求在上升。

## 4) 重要 PR 进展
1. **[PR #6631 feat(cli): 为非主工作区列出 archived / organized sessions](https://github.com/QwenLM/qwen-code/pull/6631)**  
   - 补齐多工作区 daemon 下的会话视图能力，非主工作区也能看归档与分组会话。

2. **[PR #6630 fix(core): 当模型调用 enter_plan_mode 时保持 YOLO 模式](https://github.com/QwenLM/qwen-code/pull/6630)**  
   - 防止模型把会话从 YOLO 模式误切回 Plan，保持模式语义一致。

3. **[PR #6628 feat(core): 为前台 shell 命令增加默认超时配置](https://github.com/QwenLM/qwen-code/pull/6628)**  
   - 新增 `tools.shell.defaultTimeoutMs`，提升长任务控制能力。

4. **[PR #6627 fix(core): 修复单值步进 cron（N/step）解析](https://github.com/QwenLM/qwen-code/pull/6627)**  
   - 让 `5/15` 正确展开为步进序列，修复调度语义。

5. **[PR #6625 feat(web-shell): 新建会话时增加 workspace picker](https://github.com/QwenLM/qwen-code/pull/6625)**  
   - 多工作区场景下，Web Shell 新建聊天可显式选择 workspace。

6. **[PR #6621 feat(cli): workspace-qualified ACP transport](https://github.com/QwenLM/qwen-code/pull/6621)**  
   - 为 daemon 引入按 workspace 区分的 ACP 传输端点，适配多工作区阶段 4。

7. **[PR #6619 feat(scheduled-tasks): 为 isolated run 增加 precondition](https://github.com/QwenLM/qwen-code/pull/6619)**  
   - 定时任务在真正派发前先做条件判断，减少无效执行。

8. **[PR #6618 Bound glob result collection](https://github.com/QwenLM/qwen-code/pull/6618)**  
   - 改用流式收集并设置上限，避免超大 pattern 触发 OOM。

9. **[PR #6615 fix(channels): 只返回最终 ACP response text](https://github.com/QwenLM/qwen-code/pull/6615)**  
   - 丢弃中间轮次的“思考文本”，避免污染 channel 返回结果。

10. **[PR #6620 fix(channels): 对齐 memory 访问与 channel gates](https://github.com/QwenLM/qwen-code/pull/6620)**  
   - 已关闭。让 memory 访问遵循与消息同样的准入门槛，减少越权与状态不一致。

## 5) 功能需求趋势
- **IDE / ACP 集成继续升温**  
  JetBrains prompt 转发失败（[#6581](https://github.com/QwenLM/qwen-code/issues/6581)）、ACP 结果清洗（[PR #6615](https://github.com/QwenLM/qwen-code/pull/6615)）、workspace-qualified transport（[PR #6621](https://github.com/QwenLM/qwen-code/pull/6621)）都指向同一方向：**让外部 IDE / 通道接入更稳定、更可控**。

- **多工作区与会话管理能力成为主线**  
  archived/organized sessions、workspace picker、workspace endpoint 等 PR（[#6631](https://github.com/QwenLM/qwen-code/pull/6631)、[#6625](https://github.com/QwenLM/qwen-code/pull/6625)）说明社区正在从“单会话 CLI”走向“多工作区 daemon 平台”。

- **性能与大规模内容处理是高频痛点**  
  glob OOM（[#6614](https://github.com/QwenLM/qwen-code/issues/6614)）、密集 PDF 失败循环（[#6586](https://github.com/QwenLM/qwen-code/issues/6586)）、大 diff review 视图问题，反映出用户在处理大仓库、大文件、大输出时对稳定性要求很高。

- **安全边界与社区治理被显著强化**  
  敏感环境变量泄露（[#6601](https://github.com/QwenLM/qwen-code/issues/6601)）与可疑附件守卫（[#6597](https://github.com/QwenLM/qwen-code/issues/6597)）说明项目正在从“功能优先”转向“默认安全”。

- **跨平台输入/剪贴板兼容仍是高频诉求**  
  macOS 图片粘贴（[#6590](https://github.com/QwenLM/qwen-code/issues/6590)）、Windows 截图粘贴（[#6577](https://github.com/QwenLM/qwen-code/issues/6577)）表明图片输入能力已成为基础体验的一部分。

- **调度/cron 语义准确性受到关注**  
  cron 步进修复（[#6629](https://github.com/QwenLM/qwen-code/issues/6629) / [PR #6627](https://github.com/QwenLM/qwen-code/pull/6627)）与 isolated run precondition（[PR #6619](https://github.com/QwenLM/qwen-code/pull/6619)）表明自动化任务能力在快速扩张。

## 6) 开发者关注点
- **第一优先级是“稳定可用”而不是“仅能跑通”**  
  例如 JetBrains prompt 丢失、debug 日志未生成、cron 解析错误，都属于基础能力瑕疵，影响的是整条工作流。  
  相关链接：[#6581](https://github.com/QwenLM/qwen-code/issues/6581)、[#6600](https://github.com/QwenLM/qwen-code/issues/6600)、[#6629](https://github.com/QwenLM/qwen-code/issues/6629)

- **安全边界需要前置设计**  
  环境变量继承、附件审查、channel memory gate，这些问题都在提醒项目：Agent 工具链的默认权限必须更严格。  
  相关链接：[#6601](https://github.com/QwenLM/qwen-code/issues/6601)、[#6597](https://github.com/QwenLM/qwen-code/issues/6597)、[PR #6620](https://github.com/QwenLM/qwen-code/pull/6620)

- **用户正在推动更强的“可观测性”**  
  subagent 现在不只要能执行，还要能看过程、看结果、能介入。  
  相关链接：[#6569](https://github.com/QwenLM/qwen-code/issues/6569)、[PR #6615](https://github.com/QwenLM/qwen-code/pull/6615)

- **跨平台输入与包装完整性仍是实际痛点**  
  macOS / Windows 的图片粘贴问题说明“模型能力”之外，输入链路同样决定实际可用性。  
  相关链接：[#6590](https://github.com/QwenLM/qwen-code/issues/6590)、[#6577](https://github.com/QwenLM/qwen-code/issues/6577)

如果你需要，我还可以把这份日报进一步整理成：
1. **适合发群的精简版**，或  
2. **适合内部周报的表格版**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

以下为 **2026-07-10 DeepSeek TUI 社区动态日报**（基于 github.com/Hmbown/DeepSeek-TUI）：

## 1. 今日速览
- 今天**没有新的 Release**，但发布线已经进入收口阶段，`v0.8.68` 的 release PR 已经打开，说明主线更偏向“修复、补齐、发版前校准”。
- 社区讨论重点集中在三类问题：**TUI 流式渲染性能**、**MCP / 工作流可靠性**、以及 **模型定价与计费数据补全**。
- 从 Issue 和 PR 分布看，项目当前最关心的是：**体验不卡顿、集成不挂死、计费要准确、发布要稳定**。

---

## 2. 社区热点 Issues

1. [#4270 流式文本显示太慢了，上一个版本有此问题但问题不明显](https://github.com/Hmbown/CodeWhale/issues/4270)  
   终端打字速度明显慢于模型输出，尤其影响 DeepSeek V-Flash 这类高吞吐模型；**3 条评论**，是今天最有讨论热度的体验问题。

2. [#4308 MCP 发现容错 + 工具描述截断优化](https://github.com/Hmbown/CodeWhale/issues/4308)  
   解决部分 MCP 服务只实现 `tools/list` 时初始化挂起的问题，并优化工具描述刷屏；**1 条评论**，直接影响外部工具接入可用性。

3. [#4326 Perf: explain and bound RSS after cancelling a 32-worker storm](https://github.com/Hmbown/CodeWhale/issues/4326)  
   关注高并发 worker 取消后 RSS 不回落的问题，属于并发/内存边界的核心性能议题；目前暂无评论，但技术优先级高。

4. [#4317 Pricing: long-context surcharge tiers (GPT-5.5/5.6-sol >272K, MiniMax M3 >512K)](https://github.com/Hmbown/CodeWhale/issues/4317)  
   长上下文计费分档缺失，会直接影响价格预估准确性；属于本日价格体系补全的关键缺口。

5. [#4318 Pricing: cache-write rates dropped by CurrencyPricing/TokenUsage](https://github.com/Hmbown/CodeWhale/issues/4318)  
   `cache_write` 在 TUI 计费链路中被丢弃，Anthropic 等模型的费用展示会失真，是计费精度问题。

6. [#4319 Pricing: add cache_read to model_catalog.bundled.json CatalogEntry](https://github.com/Hmbown/CodeWhale/issues/4319)  
   目录模型缺少 `cache_read` 字段，导致缓存命中节省显示不完整；对成本展示和模型选型都很关键。

7. [#4320 Audit: DeepSeek deprecates deepseek-chat/deepseek-reasoner aliases 2026-07-24](https://github.com/Hmbown/CodeWhale/issues/4320)  
   这是一个强时效兼容性提醒：DeepSeek 平台 alias 将在 2026-07-24 停用，迁移窗口明确，需优先处理。

8. [#4276 v0.8.68 UX: clarify distinct jobs for Command, Help, Config, and Fleet surfaces](https://github.com/Hmbown/CodeWhale/issues/4276)  
   说明 TUI 首屏与各功能面板的职责仍需收敛，属于产品信息架构层面的关键 UX 议题。

9. [#4275 v0.8.68 UX: define compact TUI glance facts and drill-down owners](https://github.com/Hmbown/CodeWhale/issues/4275)  
   社区希望默认视图更“轻”，少一些实现细节，多一些可快速扫读的事实摘要。

10. [#4273 v0.8.68 UX: adopt Act / Plan / Operate vocabulary across mode surfaces](https://github.com/Hmbown/CodeWhale/issues/4273)  
   术语统一是这轮 UX 收敛的基础工作，反映出产品心智模型仍在向“少而清晰”的方向整理。

**社区反应概览：**  
当前讨论热度主要集中在 **#4270（3 评论）** 和 **#4308（1 评论）**；其余多为维护/产品侧主动推进的结构化议题，说明社区更多在推动底层体验、计费准确性和兼容性补齐，而不是围绕单点争议展开。

---

## 3. 重要 PR 进展

1. [#4327 release: v0.8.68](https://github.com/Hmbown/CodeWhale/pull/4327)  
   当前开放中的发版 PR，内容以版本号、changelog 和公开文档收尾为主，意味着 `v0.8.68` 已进入最后发布准备阶段。

2. [#4310 ci: cut PR critical path and stop rebuilding nightly per merge](https://github.com/Hmbown/CodeWhale/pull/4310)  
   缩短 PR CI 关键路径，避免每次合并都重建 nightly；这是提升迭代速度的基础设施优化。

3. [#4315 fix(android): build Termux target and stop rustls JVM panic](https://github.com/Hmbown/CodeWhale/pull/4315)  
   让 Android / Termux 目标真正可构建、可启动，并修复 rustls 引起的 JVM panic，增强移动端可用性。

4. [#4314 feat(provider): wire xAI device-code OAuth entrypoints](https://github.com/Hmbown/CodeWhale/pull/4314)  
   补齐 xAI 的 device-code OAuth 入口，覆盖 CLI 和 TUI 的认证流程，降低接入门槛。

5. [#4311 feat(models): add GPT-5.6 and Muse Spark routes](https://github.com/Hmbown/CodeWhale/pull/4311)  
   新增 GPT-5.6 系列与 Meta Model API 的 Muse Spark 路由，扩展模型/供应商覆盖面。

6. [#4307 feat(workflow): enforce role gate handoffs](https://github.com/Hmbown/CodeWhale/pull/4307)  
   在 Workflow 中引入 gate 机制，角色完成后再推进 handoff，强化子任务编排与控制流。

7. [#4306 feat(workflow): lane-backed workflow run entrypoint](https://github.com/Hmbown/CodeWhale/pull/4306)  
   新增 `codewhale workflow run` 的 Lane-backed 入口，运行前校验 Workflow 源和 Fleet roster，提升执行可靠性。

8. [#4302 fix(tui): pace workflow budget redraws under fan-out](https://github.com/Hmbown/CodeWhale/pull/4302)  
   对 fan-out 场景下的 budget 重绘做节流，减少高频 repaint 对界面的拖累。

9. [#4325 fix(workflow): run documented scripts and harden cancellation](https://github.com/Hmbown/CodeWhale/pull/4325)  
   修复文档中 Workflow fixture 无法直接运行的问题，并加强取消语义，补上 dogfood 发现的运行时缺陷。

10. [#4323 fix(pricing): apply 2026-07-09 pricing freshness audit (Parts A-C)](https://github.com/Hmbown/CodeWhale/pull/4323)  
   应用最新价格审计结果，修正多家模型供应商的定价数据，是本日最重要的计费修复之一。

---

## 4. 功能需求趋势

- **价格与计费精度持续上升为主线**  
  过去 24 小时的 Issue 明显集中在 `cache_read`、`cache_write`、长上下文 surcharge、MiMo PAYG/Token Plan 区分、以及 DeepSeek alias 过期等问题上。  
  代表链接：[#4317](https://github.com/Hmbown/CodeWhale/issues/4317)、[#4318](https://github.com/Hmbown/CodeWhale/issues/4318)、[#4319](https://github.com/Hmbown/CodeWhale/issues/4319)、[#4320](https://github.com/Hmbown/CodeWhale/issues/4320)、[#4324](https://github.com/Hmbown/CodeWhale/issues/4324)

- **TUI 从“信息全”转向“信息清”**  
  社区希望首屏更克制，模式术语更统一，工具/面板职责更清楚。  
  代表链接：[#4276](https://github.com/Hmbown/CodeWhale/issues/4276)、[#4275](https://github.com/Hmbown/CodeWhale/issues/4275)、[#4273](https://github.com/Hmbown/CodeWhale/issues/4273)

- **性能优化从局部渲染扩展到并发和内存边界**  
  不只是“显示慢”，还包括 fan-out、取消、RSS 回落和重绘节流。  
  代表链接：[#4270](https://github.com/Hmbown/CodeWhale/issues/4270)、[#4326](https://github.com/Hmbown/CodeWhale/issues/4326)、[#4302](https://github.com/Hmbown/CodeWhale/pull/4302)

- **外部集成的容错性成为刚需**  
  MCP 的部分实现、xAI OAuth、Android/Termux 支持都在补齐，说明项目在扩大可接入面。  
  代表链接：[#4308](https://github.com/Hmbown/CodeWhale/issues/4308)、[#4314](https://github.com/Hmbown/CodeWhale/pull/4314)、[#4315](https://github.com/Hmbown/CodeWhale/pull/4315)

---

## 5. 开发者关注点

- **计费数据的完整性与一致性**：`cache_read`、`cache_write`、长上下文 tier、供应商 surface 区分，都是“算账是否准确”的核心点。  
  相关链接：[#4317](https://github.com/Hmbown/CodeWhale/issues/4317)、[#4318](https://github.com/Hmbown/CodeWhale/issues/4318)、[#4319](https://github.com/Hmbown/CodeWhale/issues/4319)、[#4323](https://github.com/Hmbown/CodeWhale/pull/4323)

- **高吞吐场景下的 TUI 响应速度**：流式输出、预算重绘、worker fan-out 的性能边界已经成为真实痛点。  
  相关链接：[#4270](https://github.com/Hmbown/CodeWhale/issues/4270)、[#4302](https://github.com/Hmbown/CodeWhale/pull/4302)、[#4326](https://github.com/Hmbown/CodeWhale/issues/4326)

- **协议/集成的容错性要足够强**：MCP 这类“实现不完整”的外部服务不能拖垮整个初始化流程。  
  相关链接：[#4308](https://github.com/Hmbown/CodeWhale/issues/4308)

- **工作流取消与资源回收需要更可验证**：高并发 worker 场景下，取消后 RSS 的回落行为是判断泄漏和高水位保留的关键。  
  相关链接：[#4326](https://github.com/Hmbown/CodeWhale/issues/4326)、[#4325](https://github.com/Hmbown/CodeWhale/pull/4325)

- **产品术语和默认信息层要继续收敛**：Act / Plan / Operate、Command / Help / Config / Fleet 的边界需要更明确，减少用户认知负担。  
  相关链接：[#4276](https://github.com/Hmbown/CodeWhale/issues/4276)、[#4273](https://github.com/Hmbown/CodeWhale/issues/4273)、[#4275](https://github.com/Hmbown/CodeWhale/issues/4275)

如果你希望，我也可以把这份日报进一步整理成 **“管理层摘要版”** 或 **“研发例会版（更偏行动项）”**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*