# AI CLI 工具社区动态日报 2026-06-12

> 生成时间: 2026-06-12 01:58 UTC | 覆盖工具: 9 个

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

下面基于你提供的各仓库“当日社区动态摘要”做一份横向对比报告。  
**说明**：表格中的 Issues / PR 数量，采用摘要里**明确列出的当日热点条目数**，用于横向比较，不等同于仓库当天全部新增量。

---

## 1) 生态全景

过去 24 小时，AI CLI 生态整体呈现出一个非常清晰的特征：**“快速迭代 + 稳定性修复并行”**。一方面，Codex、Claude Code、Qwen Code、OpenCode 等都在持续推进模型路由、会话恢复、agent/subagent、MCP/ACP 等基础能力；另一方面，社区反馈高度集中在**连接中断、状态丢失、误判降级、工具调用不稳定、跨平台兼容**这些“可用性底座”问题上。  
这意味着当前 AI CLI 已从“能不能用”进入“**是否足够可靠、可观测、可控**”的竞争阶段。  
同时，Gemini CLI、Copilot CLI 这类工具则更明显地聚焦于**交互体验、信任/认证、结构化输出、企业集成**等更细分的产品化诉求。  
整体看，AI CLI 正在从单纯的“聊天式终端”演进为**具备会话、任务、代理、权限、观测和生态接口的开发平台**。

---

## 2) 各工具活跃度对比

| 工具 | 今日热点 Issues 数 | 今日 PR 数 | Release 情况 |
|---|---:|---:|---|
| Claude Code | 10 | 5 | 2 个 release（v2.1.174、v2.1.173） |
| OpenAI Codex | 10 | 10 | 5 个 alpha release（rust-v0.140.0-alpha.8/9/10/11/13） |
| Gemini CLI | 4 | 7 | 无新 Release |
| GitHub Copilot CLI | 10 | 1 | 无新 Release |
| Kimi Code CLI | 0 | 0 | 无活动 |
| OpenCode | 10 | 10 | 无新 Release |
| Pi | 10 | 10 | 无新 Release |
| Qwen Code | 6 | 10 | 1 个预览版（v0.18.0-preview.2） |
| DeepSeek TUI / CodeWhale | 10 | 10 | 1 个 release（v0.8.58） |

**快速解读：**
- **最“热”**：Claude Code、Codex、OpenCode、Pi、DeepSeek、Qwen 都呈现高密度 Issue/PR 活动。
- **迭代最猛**：Codex、Qwen、OpenCode、Pi、DeepSeek（PR 数高，且多为功能/修复并进）。
- **问题最集中**：Copilot CLI 的 Issue 几乎都聚焦在 v1.0.61 回归，说明短期稳定性压力大。

---

## 3) 共同关注的功能方向

### 1. 会话恢复与状态连续性
**涉及工具**：Codex、Copilot CLI、OpenCode、Qwen Code、DeepSeek TUI、Claude Code  
**共同诉求**：
- `/resume` 后必须完整恢复上下文、模型、认证、工具状态
- 历史会话、项目会话、side chat、archived chat 可恢复
- session token / session id / conversation state 不应在重启、切换、压缩后失真

**典型信号**：
- Codex：连接中断、恢复失败、历史会话缺失
- Copilot CLI：`/resume` 后模型切换失败、空白屏
- Qwen Code：`/goal`、`/stats`、`/loop` 的跨会话状态一致性
- OpenCode：跨项目 session picker、会话恢复
- DeepSeek：任务句柄/子代理状态一致性

---

### 2. Agent / Subagent / 任务执行可靠性
**涉及工具**：Claude Code、Gemini CLI、Codex、OpenCode、Qwen Code、DeepSeek TUI  
**共同诉求**：
- 避免死循环、无限执行、任务卡住
- 子代理必须有可追踪 tool call，不应“无工具调用却输出结论”
- pending tools、fanout、loop、compaction 后要有明确状态边界

**典型信号**：
- Claude Code：Tasks 无限执行、subagent 幻觉输出
- Gemini CLI：Agent weird loop
- OpenCode：loop exit condition、prompt submission errors
- Qwen Code：durable cron jobs、resume 后迭代计数
- DeepSeek：fanout 卡住、回压与恢复机制

---

### 3. 模型路由、Provider 兼容与透明化
**涉及工具**：Claude Code、Codex、Gemini CLI、OpenCode、Pi、Qwen Code、DeepSeek TUI  
**共同诉求**：
- 当前模型/Provider 要清晰可见
- 模型切换不能“看似成功、实际没切”
- 不同 Provider 的 schema、context window、baseURL、计费/能力要统一展示
- 新模型接入要避免 ID/缓存/路由错误

**典型信号**：
- Claude Code：Fable 5 误降级、`/model` 透明度不足
- Codex：model_provider 在 subagent/VS Code 中不一致
- Gemini CLI：`models` 命令 + JSON 输出
- OpenCode：后台刷新模型列表、OpenAI baseURL 兼容
- Pi：provider registry、模型目录、schema 兼容
- Qwen Code：`/stats`、declarative-agent、ACP 模式 skills 暴露
- DeepSeek：provider / model 正确性、无效模型 ID

---

### 4. 跨平台与 IDE/Desktop/远程集成
**涉及工具**：Claude Code、Codex、Gemini CLI、Copilot CLI、OpenCode、Pi、Qwen Code  
**共同诉求**：
- Windows/macOS/Linux 行为一致
- VS Code / Desktop / TUI / SSH / WSL / Remote Control 之间状态一致
- 输入法、快捷键、路径、终端能力、权限审批都要适配真实环境

**典型信号**：
- Codex：Windows 非 ASCII 路径、更新后历史会话缺失
- Copilot CLI：Windows 键位、Shift+Enter、多行输入回归
- OpenCode：SSH、Windows 桌面路径、子进程隐藏
- Pi：Windows/WSL/WezTerm 图片与退出行为
- Qwen Code：VS Code 兼容、IME 光标定位、Web Shell 快捷键
- Claude Code：Windows 沙箱提示、Remote Control/IDE 体验
- Gemini CLI：folder trust 与 auth 启动流程

---

### 5. 可观测性、可解释性、错误反馈
**涉及工具**：Claude Code、Codex、Copilot CLI、OpenCode、Pi、Qwen Code  
**共同诉求**：
- 需要更明确的进度、耗时、token、状态、错误原因
- 不能“卡住但没反馈”
- 不能 silently fail 或静默清空输入

**典型信号**：
- Claude Code：Thinking 卡住、无进度
- Codex：stream disconnected、延迟追踪埋点
- Copilot CLI：工具调用被当成文本、输出线程问题
- Qwen Code：`/stats` 可信度、时间戳输出
- OpenCode：prompt 提交失败要显式提示
- Pi：命令执行后挂起、abort 资源泄漏可追踪

---

## 4) 差异化定位分析

### Claude Code
- **侧重**：安全分类、模型路由透明化、代理执行稳定性
- **目标用户**：企业开发者、对安全/权限敏感的专业用户
- **技术路线**：强调 sandbox、subagent、remote control、模型降级策略
- **特点**：问题多集中在“误判与误降级”，说明它更偏**安全优先的高能力 CLI**

### OpenAI Codex
- **侧重**：基础架构重构、会话恢复、连接稳定性、长期任务连续性
- **目标用户**：高频 CLI 用户、追求深度工作流的开发者
- **技术路线**：alpha 快速迭代，正在把 code-mode 拆成独立进程与协议
- **特点**：明显处于**平台重构期**，工程投入很重

### Gemini CLI
- **侧重**：信任流程、自动化友好、结构化输出、Agent 稳定性
- **目标用户**：脚本化/CI 使用者、希望快速集成 Gemini 的开发者
- **技术路线**：强调 `models` 命令、JSON、trust prompt、MCP 兼容
- **特点**：更像**“标准化 CLI 入口”**，产品边界清晰

### GitHub Copilot CLI
- **侧重**：认证、会话恢复、终端输入渲染、企业集成
- **目标用户**：Copilot 生态用户、Windows/终端重度用户
- **技术路线**：围绕 v1.0.61 回归修复，偏体验与权限控制
- **特点**：当前最像**“基础交互打磨期”**，稳定性优先级极高

### OpenCode
- **侧重**：跨平台桌面/TUI、session 管理、模型/provider 兼容、远程/SSH
- **目标用户**：偏高级、偏可定制、跨宿主环境的开发者
- **技术路线**：功能面非常宽，围绕 desktop、tui、ACP/MCP、provider 刷新持续演进
- **特点**：像一个**通用型开放平台**，覆盖面广

### Pi
- **侧重**：Provider 抽象、包管理/安装链路、工具协议、扩展生态
- **目标用户**：集成方、扩展作者、需要多 Provider 统一层的用户
- **技术路线**：偏“中间层/适配层”，强调 schema、registry、session 事件
- **特点**：更像**基础设施型 CLI/SDK**，工程化特征强

### Qwen Code
- **侧重**：会话持久化、统计准确性、IDE/ACP/Web Shell 集成、中文输入体验
- **目标用户**：本地开发者、IDE 用户、中文/多宿主环境用户
- **技术路线**：围绕 daemon、session、stats、web shell、mcpServers/hook 持续补齐
- **特点**：非常注重**“状态准确 + 交互细节”**

### DeepSeek TUI / CodeWhale
- **侧重**：重命名/品牌统一、子代理工作流、发布治理、安全与测试补强
- **目标用户**：开源社区开发者、愿意参与重构和工作流设计的人群
- **技术路线**：从 TUI 工具向更完整的 agent/workflow 平台演进
- **特点**：当前明显处于**架构收敛与治理强化期**

### Kimi Code CLI
- **侧重**：暂无明显社区活跃信号
- **状态判断**：当前生态讨论度较低，尚未形成可对比的活跃增长面

---

## 5) 社区热度与成熟度

### 社区热度更高的工具
- **Claude Code**：安全误报、降级、subagent、sandbox 等议题密集，且评论活跃
- **Codex**：5 个 alpha release + 10 条 PR，且有高评论断流 issue，热度和迭代都高
- **OpenCode / Pi / DeepSeek / Qwen**：Issues 与 PR 都较多，说明社区参与和工程推进都很强
- **Copilot CLI**：Issue 数高，但主要集中在回归，热度来自“问题集中爆发”

### 处于快速迭代阶段
- **Codex**：alpha 频发、架构重构明显
- **Qwen Code**：preview 版本推进 + 一批状态修复 PR
- **DeepSeek TUI / CodeWhale**：品牌/架构/测试/安全同时推进
- **OpenCode**：功能面铺得很开，desktop / TUI / provider / session 同时演进

### 相对更“收敛/成熟”的信号
- **Gemini CLI**：Issue 数不算多，但 PR 基本精准对准需求点，呈现“少而准”的修复风格
- **Pi**：问题多为明确的边界 bug，且多数快速关闭，闭环效率较高
- **Copilot CLI**：虽然问题集中，但更像成熟产品在回归修复，而不是大规模功能探索

---

## 6) 值得关注的趋势信号

### 1. “可靠性”正在压过“能力展示”
开发者最在意的已不是模型是否能做，而是：
- 会不会断流
- 会不会误判降级
- 会不会卡死
- 会不会丢状态
- 会不会把输入/命令改坏

这说明 AI CLI 正从“演示能力”进入“生产可靠性竞争”。

### 2. 模型路由和权限边界必须可解释
Claude 的误降级、Copilot 的权限/认证问题、Gemini 的 trust flow、Pi 的 schema/registry 问题都表明：  
**模型切换、权限控制、工具调用边界，必须可视化、可解释、可审计。**

### 3. 长任务与多代理会成为主战场
subagent、fanout、loop、resume、compaction、durable jobs 这些词在多个仓库里反复出现。  
这意味着 AI CLI 正从“一问一答”升级到**长链路任务编排**，谁能做好状态管理，谁就更有竞争力。

### 4. 跨平台和 IDE 集成是下一阶段竞争焦点
Windows、WSL、macOS、SSH、VS Code、Desktop、Web Shell、ACP/MCP 都在被反复打磨。  
这说明 CLI 已经不再是单一终端工具，而是进入**多宿主、多入口统一体验**阶段。

### 5. 可观测性会成为产品分水岭
Thinking 卡住、stream disconnected、session 恢复失败、tool call 静默失败，这些问题的共同解法不是“更聪明的模型”，而是：
- 更好的状态机
- 更清晰的错误反馈
- 更细粒度的埋点
- 更透明的进度和成本展示

---

如果你愿意，我可以继续把这份报告压缩成：
1. **1 页管理层摘要版**，或  
2. **适合晨会的 10 条要点版**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下报告基于你提供的 PR / Issue 快照整理。  
**注**：PR 列表里未显示明确评论数，因此“热门”按你给出的热门顺序、更新活跃度和议题影响面综合判断。

---

## 1) 热门 Skills 排行（代表性 PR，均为 **OPEN**）

1. **[#1046](https://github.com/anthropics/skills/pull/1046) — frontend-design / ai-experience-consultant / automation-workflows-builder**
   - **功能**：一次性新增多个偏产品与自动化方向的 Skill 定义。
   - **社区热点**：说明社区不只想要“写代码”，也在追求**前端体验设计**与**工作流自动化**能力。
   - **状态**：OPEN

2. **[#514](https://github.com/anthropics/skills/pull/514) — document-typography**
   - **功能**：面向 AI 生成文档的排版质量控制，处理孤行、寡行、编号对齐等问题。
   - **社区热点**：大家很关注“文档能不能直接交付”，而不只是“内容生成出来了没”。
   - **状态**：OPEN

3. **[#486](https://github.com/anthropics/skills/pull/486) — ODT skill**
   - **功能**：支持 OpenDocument（ODT/ODS）创建、填充、读取、转换。
   - **社区热点**：强需求集中在**开放办公格式**与 **LibreOffice 生态兼容**。
   - **状态**：OPEN

4. **[#210](https://github.com/anthropics/skills/pull/210) — Improve frontend-design skill clarity and actionability**
   - **功能**：提升 frontend-design Skill 的可执行性、清晰度和一致性。
   - **社区热点**：反映出社区对 Skill 的期待已从“有内容”升级到“**Claude 能稳定按指令执行**”。
   - **状态**：OPEN

5. **[#83](https://github.com/anthropics/skills/pull/83) — skill-quality-analyzer / skill-security-analyzer**
   - **功能**：新增用于评估 Skill 质量与安全性的元 Skill。
   - **社区热点**：说明社区开始重视 **Skill 生态治理**，不只是做 Skill，还要“审 Skill”。
   - **状态**：OPEN

6. **[#538](https://github.com/anthropics/skills/pull/538) — fix(pdf): correct case-sensitive file references**
   - **功能**：修复 PDF Skill 文档中的大小写引用错误。
   - **社区热点**：关注点偏向**跨平台稳定性**与“文档引用别出错”这类基础体验。
   - **状态**：OPEN

7. **[#539](https://github.com/anthropics/skills/pull/539) — fix(skill-creator): warn on unquoted description with YAML special characters**
   - **功能**：提前拦截 YAML 前置描述字段的特殊字符误解析。
   - **社区热点**：Skill 生成/编辑链路的**可验证性、可调试性**是高频痛点。
   - **状态**：OPEN

8. **[#541](https://github.com/anthropics/skills/pull/541) — fix(docx): prevent tracked change w:id collision**
   - **功能**：修复 DOCX 追踪修订与书签 ID 冲突导致的文档损坏。
   - **社区热点**：用户非常在意 **Word 文档的可用性与不损坏**。
   - **状态**：OPEN

---

## 2) 社区需求趋势

### A. 工作流自动化 / Agent 编排
- 社区希望 Skill 不只是“单点工具”，而是能进入更完整的任务编排和 Agent 协作。
- 相关议题：
  - **组织级共享 Skill**：[#228](https://github.com/anthropics/skills/issues/228)
  - **Expose Skills as MCPs**：[#16](https://github.com/anthropics/skills/issues/16)
  - **agent-creator / automation-workflows**：见 [#1046](https://github.com/anthropics/skills/pull/1046)、[#1140](https://github.com/anthropics/skills/pull/1140)

### B. 评测、调试与 Skill 生成工具链
- 最强烈的痛点之一是：**Skill 其实能写，但很难稳定评估、优化和复现**。
- 相关议题：
  - `run_eval.py` 0% trigger / recall 问题：[#556](https://github.com/anthropics/skills/issues/556)
  - 0% recall 的描述优化循环：[#1169](https://github.com/anthropics/skills/issues/1169)
  - Windows 兼容性：[#1061](https://github.com/anthropics/skills/issues/1061)
  - YAML / UTF-8 / subprocess 相关修复 PR：[#361](https://github.com/anthropics/skills/pull/361)、[#362](https://github.com/anthropics/skills/pull/362)、[#1050](https://github.com/anthropics/skills/pull/1050)

### C. 文档、办公格式与企业文档场景
- 社区对文档类 Skill 的需求非常集中，尤其是**Word / PDF / ODT / SharePoint**。
- 相关议题：
  - 文档排版质量：[#514](https://github.com/anthropics/skills/pull/514)
  - ODT/ODS 支持：[#486](https://github.com/anthropics/skills/pull/486)
  - PDF / DOCX 稳定性修复：[#538](https://github.com/anthropics/skills/pull/538)、[#541](https://github.com/anthropics/skills/pull/541)
  - SharePoint 文档安全与上下文窗口：[#1175](https://github.com/anthropics/skills/issues/1175)
  - 多文件 preload / inline bundling：[#1220](https://github.com/anthropics/skills/issues/1220)

### D. 安全、命名空间与生态治理
- 社区已经开始担心“技能来源可信度”和“分发边界”。
- 相关议题：
  - `anthropic/` 命名空间被社区技能冒用的信任边界问题：[#492](https://github.com/anthropics/skills/issues/492)
  - `document-skills` 与 `example-skills` 内容重复：[#189](https://github.com/anthropics/skills/issues/189)
  - 技能分享与组织内治理：[#228](https://github.com/anthropics/skills/issues/228)

---

## 3) 高潜力待合并 Skills

这些 PR 仍为 **OPEN**，且从问题影响面和近期更新看，落地概率较高：

- **[#1298](https://github.com/anthropics/skills/pull/1298)** — 修复 `run_eval.py` 在 Windows 上 0% recall / trigger 失真的核心问题  
  - 对应问题：[#556](https://github.com/anthropics/skills/issues/556)
  - **判断**：属于基础工具链修复，影响面大，优先级高。

- **[#1140](https://github.com/anthropics/skills/pull/1140)** — `agent-creator` Skill + 多工具评测修复  
  - 对应问题：[#1120](https://github.com/anthropics/skills/issues/1120)
  - **判断**：既有新能力，又修复评测稳定性，具备较强合并动力。

- **[#1050](https://github.com/anthropics/skills/pull/1050)** — skill-creator Windows 子进程与编码修复  
  - **判断**：典型“跨平台阻塞型 bugfix”，容易被优先合并。

- **[#1061](https://github.com/anthropics/skills/issues/1061)** / **[#1099](https://github.com/anthropics/skills/pull/1099)**
  - 这两条都围绕 Windows 下 `run_eval.py` / `run_loop.py` 的稳定性问题。
  - **判断**：与 #1298 同一主线，后续很可能形成集中修复。

- **[#723](https://github.com/anthropics/skills/pull/723)** — `testing-patterns` Skill
  - **判断**：覆盖测试策略、React 测试、单测/集成测试，属于高需求通用型 Skill，落地价值高。

- **[#486](https://github.com/anthropics/skills/pull/486)** — ODT Skill
  - **判断**：办公文档兼容是长期需求，若验证稳定，合并可能性较高。

---

## 4) Skills 生态洞察

**一句话总结**：  
当前社区最集中的诉求是：**把 Skills 从“可生成”推进到“可共享、可评测、可跨平台稳定运行、可直接交付企业文档/自动化工作流”的生产级能力。**

如果你愿意，我可以继续把这份报告整理成：
- **PPT 风格 1 页摘要**
- **按主题聚类的表格版**
- **面向产品/生态负责人的洞察版**

---

# Claude Code 社区动态日报（2026-06-12）

## 1) 今日速览
今天社区讨论的核心仍然是**模型安全分类/自动降级误判**与**代理执行稳定性**两条主线：大量 Issue 指向 Fable 5 被误判为安全/生物/法律场景后自动切换到 Opus，影响正常开发流程。另一方面，沙箱 Bash、Agent/Subagent、Remote Control、Bedrock 输出等执行链路也出现了多起高频故障，说明当前版本在“可用性”和“可预测性”上仍有明显痛点。  
同时，最新 Releases 开始持续修补交互与兼容性问题，尤其是 `/model` 选择器、Windows 沙箱提示和长上下文模型名称规范化等细节。

---

## 2) 版本发布

### v2.1.174
- 新增 `wheelScrollAccelerationEnabled` 设置，可在全屏模式下关闭鼠标滚轮加速。
- 修复 `/model` 选择器中 Default 所对应的模型族隐藏问题：  
  - Max/Team Premium/Enterprise 上，Opus 会作为独立行展示  
  - Pro/Team 上，Sonnet 的展示逻辑也得到修正  
[GitHub Release: v2.1.174](https://github.com/anthropics/claude-code/releases/tag/v2.1.174)

### v2.1.173
- 修复 Fable 5 模型名带 `[1m]` 后缀未归一化的问题，现会自动剥离该后缀。
- 修复 Windows 上启用沙箱时出现的“sandbox dependencies missing”启动警告误报。  
[GitHub Release: v2.1.173](https://github.com/anthropics/claude-code/releases/tag/v2.1.173)

---

## 3) 社区热点 Issues

> 说明：以下选取本期最值得关注的 10 个 Issue，优先覆盖高评论、影响面大、或反映趋势性问题的条目。

### 1. 代理/任务执行“永远跑不完”
- **Issue**：[#67728](https://github.com/anthropics/claude-code/issues/67728)
- **看点**：Windows 环境下的 Tasks 进入无限执行状态，作者还给出了“7 层架构根因 + 永久修复方案”。
- **为什么重要**：这是直接影响任务完成率的核心稳定性问题，且附带 RFC，说明社区已开始尝试提供系统级修复思路。
- **社区反应**：评论数 3，属于本期较受关注的执行稳定性问题之一。

### 2. 证书/API 调用被过度安全过滤拦截
- **Issue**：[#67696](https://github.com/anthropics/claude-code/issues/67696)
- **看点**：Linux + sandbox 场景下，Claude Code 阻止了带凭据的 API 调用，作者认为安全过滤过于严格。
- **为什么重要**：这会阻断真实开发中的联调、验证与自动化脚本，属于“安全策略影响生产效率”的典型案例。
- **社区反应**：评论数 4，本期 Issue 中热度较高。

### 3. Subagents 零工具调用却输出“完整结果”
- **Issue**：[#67730](https://github.com/anthropics/claude-code/issues/67730)
- **看点**：macOS 上多个 subagents 返回了看似自洽但完全幻觉化的结论，且 transcript 中没有任何 tool call。
- **为什么重要**：这是代理可信度问题的高危信号，尤其会误导代码审计、分析和自动修复流程。
- **社区反应**：作为“高并发 subagent”场景下的故障报告，很容易引发同类复现跟进。

### 4. Fable 5 误判合法安全讨论并降级到 Opus
- **Issue**：[#67732](https://github.com/anthropics/claude-code/issues/67732)
- **看点**：用户做防御性安全讨论时被误判，导致模型从 Fable 5 回退到 Opus 4.8。
- **为什么重要**：安全审查、威胁建模、加固讨论都可能被误伤，直接影响企业用户对新模型的使用信心。
- **社区反应**：这是本期最明显的“安全误报”主题之一。

### 5. 模型切换导致安全硬化工作中断
- **Issue**：[#67718](https://github.com/anthropics/claude-code/issues/67718)
- **看点**：执行过程中模型被切换，作者需要手动确认当前是否还是 Fable 5，打断安全加固工作流。
- **为什么重要**：说明模型路由并非只是“界面变化”，而是会破坏开发者建立的工作假设。
- **社区反应**：虽然仅 1 条评论，但与本期大量“误降级”问题高度同源。

### 6. 误把用户自有仓库标成网络安全场景
- **Issue**：[#67698](https://github.com/anthropics/claude-code/issues/67698)
- **看点**：用户自己的 repo 被错误识别为 cybersecurity。
- **为什么重要**：这类误判会造成模型降级、权限收缩或工作流中断，是分类器精度问题的典型表现。
- **社区反应**：与其他安全误报 issue 形成聚类。

### 7. 沙箱 Bash 命令对 `!` 做了错误转义
- **Issue**：[#67735](https://github.com/anthropics/claude-code/issues/67735)
- **看点**：在 sandbox 中，Bash 命令被静默插入反斜杠，导致 `!` 相关表达式被破坏。
- **为什么重要**：这是“命令内容被篡改”的级别问题，可能造成构建、测试、脚本执行全部偏离预期。
- **社区反应**：属于底层执行链路缺陷，优先级应较高。

### 8. Bash tool 的 cwd 每次重置回项目根目录
- **Issue**：[#67725](https://github.com/anthropics/claude-code/issues/67725)
- **看点**：worktree 流程中，Bash tool 不保留工作目录上下文。
- **为什么重要**：对使用 git worktree、多目录联动的开发者非常致命，会显著增加命令重复成本。
- **社区反应**：典型的“工具上下文不连续”问题，容易引发批量反馈。

### 9. /model 选择器与模型家族显示问题持续修补
- **Issue**：[#67685](https://github.com/anthropics/claude-code/issues/67685)
- **看点**：[1m] 长上下文模型在 `/model` 选择后缺乏费用提示，且运行时也缺少明显标识。
- **为什么重要**：这不仅是 UI 问题，更是成本透明度问题，直接关系到订阅用户的使用预期。
- **社区反应**：说明社区对“模型切换 + 计费说明”的需求强烈。

### 10. Thinking 状态卡住且无进度信息
- **Issue**：[#67706](https://github.com/anthropics/claude-code/issues/67706)
- **看点**：Thinking 状态长时间不结束，且不显示 token/耗时等进度信息。
- **为什么重要**：属于可观测性问题。即便模型在工作，用户也会因为“无反馈”而认为系统失效。
- **社区反应**：和 agent 无限循环、任务跑不完一起，构成“执行可见性不足”的共性问题。

---

## 4) 重要 PR 进展

> 说明：本期更新的 PR 仅 5 条，以下全部列出并按影响面排序。

### 1. Claude autonomously ran background scripts calling a paid external
- **PR**：[#67722](https://github.com/anthropics/claude-code/pull/67722)
- **内容**：围绕“Claude 自主运行后台脚本并调用付费外部服务”的问题进行修复/处理。
- **为什么重要**：涉及自动化执行边界、成本风险和安全策略，是平台级治理问题。

### 2. Claude autonomously ran background scripts calling a paid extern
- **PR**：[#67699](https://github.com/anthropics/claude-code/pull/67699)
- **内容**：同主题修复，带有 bounty/自动化实现痕迹。
- **为什么重要**：说明该类问题已被社区持续跟进，且可能存在多个变体或重复修复路径。

### 3. Claude autonomously ran background scripts calling a paid extern
- **PR**：[#67697](https://github.com/anthropics/claude-code/pull/67697)
- **内容**：与后台脚本自主调用外部付费服务相关的另一条修复 PR。
- **为什么重要**：从 PR 聚集度看，这个问题很可能是近期重点修复对象。

### 4. fix(#67557): False positive cybersecurity flag on legitimate content-moderation discussion
- **PR**：[#67599](https://github.com/anthropics/claude-code/pull/67599)
- **内容**：修复合法内容审核讨论被错误标记为网络安全问题的误报。
- **为什么重要**：与今天 Issues 中大量“误判/降级”主题高度一致，表明分类器误报是当前主线。

### 5. Account downgraded due to billing error
- **PR**：[#67409](https://github.com/anthropics/claude-code/pull/67409)
- **内容**：处理账户因计费错误被降级的问题。
- **为什么重要**：计费与权限状态错误会直接影响订阅用户可用性，属于高优先级客户体验问题。

---

## 5) 功能需求趋势

从过去 24 小时的 Issues 看，社区关注点主要集中在以下方向：

1. **模型选择与路由透明化**  
   - 用户希望能更清晰地看到当前模型、降级原因、长上下文 `[1m]` 的计费与能力差异。  
   - 相关 Issue：[#67685](https://github.com/anthropics/claude-code/issues/67685)、[#67718](https://github.com/anthropics/claude-code/issues/67718)、[#67732](https://github.com/anthropics/claude-code/issues/67732)

2. **安全分类器精度与误报控制**  
   - 安全、法律、防御性安全、内容审查、用户自有仓库等场景被误判的反馈很多。  
   - 相关 Issue：[#67696](https://github.com/anthropics/claude-code/issues/67696)、[#67698](https://github.com/anthropics/claude-code/issues/67698)、[#67723](https://github.com/anthropics/claude-code/issues/67723)

3. **Agent / Subagent 可靠性**  
   - 包括无限循环、零工具调用却输出结果、任务不结束等。  
   - 相关 Issue：[#67728](https://github.com/anthropics/claude-code/issues/67728)、[#67730](https://github.com/anthropics/claude-code/issues/67730)、[#67704](https://github.com/anthropics/claude-code/issues/67704)

4. **沙箱与 Bash 执行一致性**  
   - 沙箱环境下命令被改写、cwd 重置、依赖提示误报等问题明显。  
   - 相关 Issue：[#67735](https://github.com/anthropics/claude-code/issues/67735)、[#67725](https://github.com/anthropics/claude-code/issues/67725)、[#67702](https://github.com/anthropics/claude-code/issues/67702)

5. **Remote Control / IDE / Desktop 集成完善**  
   - 反映了用户对跨端一致体验、权限审批、预览点击坐标等细节的需求。  
   - 相关 Issue：[#67707](https://github.com/anthropics/claude-code/issues/67707)、[#67726](https://github.com/anthropics/claude-code/issues/67726)、[#67721](https://github.com/anthropics/claude-code/issues/67721)

6. **成本与会话管理可视化**  
   - 会话限制、计费提示、长上下文成本提示仍是用户关注重点。  
   - 相关 Issue：[#67693](https://github.com/anthropics/claude-code/issues/67693)、[#67685](https://github.com/anthropics/claude-code/issues/67685)

---

## 6) 开发者关注点

### 高频痛点
- **“被误判”比“没能力”更影响信任**：大量反馈不是模型不会做，而是被安全策略或分类器错误拦截。
- **执行链路缺乏可观测性**：Thinking 卡住、Task 无限执行、Subagent 无工具调用却给结果，都会让开发者失去对系统状态的判断。
- **沙箱带来一致性问题**：命令转义、cwd 重置、依赖提示误报，说明沙箱的隔离收益正在被可用性问题抵消。
- **多端/远程控制体验仍不统一**：标题同步、审批流、桌面预览坐标偏移等问题，说明 Desktop/Remote Control 还在追赶主 CLI 体验。
- **成本透明度需求上升**：长上下文模型、会话限制、计费误差，都在提示用户希望更明确地掌握“为什么变贵/为什么被限制”。

### 建议关注的方向
- 提升**安全分类器精度**，并增加可解释的“为何降级”提示。
- 增强**Agent 运行态可观测性**，至少给出明确进度、耗时、token 或卡点状态。
- 优化**沙箱命令保真度**，避免对用户输入做二次破坏。
- 补齐**模型选择/计费/上下文长度**的 UI 透明度。
- 持续修复 **IDE/Remote Control/Desktop** 的跨端一致性。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发公众号/Slack 的精简版**，或  
2. **面向团队晨会的要点版（1 页）**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# 2026-06-12 OpenAI Codex 社区动态日报

## 1) 今日速览
过去 24 小时，Codex 仍处于高频 alpha 迭代期，仓库连续出现多个 `rust-v0.140.0-alpha.*` 发布。社区讨论最集中在**连接中断 / 会话恢复失败**、**Windows/macOS 启动崩溃**、以及**历史会话/工作区数据可见性**等稳定性问题。与此同时，仓库内部在推进 **code-mode 独立进程化、环境 shell 解析、Guardian 审核前置、延迟观测** 等基础设施升级，说明产品和底层架构都在同步加速。

---

## 2) 版本发布
过去 24 小时可见 5 个 Rust 线 alpha 发布，均未附带详细 changelog，但可以看出版本迭代节奏很快：

- `rust-v0.140.0-alpha.13` — [Release](https://github.com/openai/codex/releases/tag/rust-v0.140.0-alpha.13)
- `rust-v0.140.0-alpha.11` — [Release](https://github.com/openai/codex/releases/tag/rust-v0.140.0-alpha.11)
- `rust-v0.140.0-alpha.10` — [Release](https://github.com/openai/codex/releases/tag/rust-v0.140.0-alpha.10)
- `rust-v0.140.0-alpha.9` — [Release](https://github.com/openai/codex/releases/tag/rust-v0.140.0-alpha.9)
- `rust-v0.140.0-alpha.8` — [Release](https://github.com/openai/codex/releases/tag/rust-v0.140.0-alpha.8)

**解读：** 结合近一天的 PR 方向，当前 alpha 版本大概率围绕**稳定性修复、执行环境改造、代码模式重构**持续推进。

---

## 3) 社区热点 Issues

### 1. 连接中断：App 侧高热度故障
- [#27668](https://github.com/openai/codex/issues/27668) `[OPEN]`
- 关键词：`bug, app, connectivity`
- **为什么重要：** 评论数最高（16）且有 8 个赞，说明这是当前最广泛的用户痛点之一；“stream disconnected before completion” 直接影响主流程。
- **社区反应：** 大量用户复现，且不同平台都在报告同类问题，属于跨端共性故障。

### 2. `/goal resume` 在 Windows CLI 上断流
- [#27673](https://github.com/openai/codex/issues/27673) `[CLOSED]`
- 关键词：`bug, windows-os, CLI, connectivity, session`
- **为什么重要：** 这是“恢复会话”链路的关键 bug，且已关闭，说明可能已有修复/回滚动作。
- **社区反应：** 8 条评论、5 个赞，典型的高价值问题；用户明确指出在恢复目标时断流。

### 3. CLI 卡在连接状态
- [#27679](https://github.com/openai/codex/issues/27679) `[OPEN]`
- 关键词：`bug, CLI, connectivity`
- **为什么重要：** 直接表现为“无法继续工作”，对 CLI 核心用户影响很大。
- **社区反应：** 评论不多但属于高频现象，和多个断流 issue 形成明显聚类。

### 4. App 端再次出现 stream disconnected
- [#27684](https://github.com/openai/codex/issues/27684) `[OPEN]`
- 关键词：`bug, app, connectivity`
- **为什么重要：** 与 #27668 同类，说明连接稳定性不是单点问题，而是系统性体验风险。
- **社区反应：** 多个用户在不同设备/平台上报告，问题复现面较广。

### 5. GPT-5.5 Fast 长时间思考但无输出
- [#27661](https://github.com/openai/codex/issues/27661) `[OPEN]`
- 关键词：`bug, model-behavior, app, connectivity, performance`
- **为什么重要：** 不是单纯网络问题，还可能涉及模型推理、前端状态机与重连逻辑交互。
- **社区反应：** 4 条评论，已形成“长时间思考后无结果”的独立体验问题。

### 6. Windows 更新后历史会话/项目会话缺失
- [#27734](https://github.com/openai/codex/issues/27734) `[OPEN]`
- 关键词：`bug, windows-os, app, session`
- **为什么重要：** 涉及本地历史数据可见性，用户会直接感知为“数据丢失”。
- **社区反应：** 评论不多，但属于高严重度问题，尤其对长期使用者影响大。

### 7. Windows 非 ASCII 用户路径导致启动崩溃
- [#27722](https://github.com/openai/codex/issues/27722) `[OPEN]`
- 关键词：`bug, windows-os, app`
- **为什么重要：** 启动即崩溃，且与地区/用户名编码有关，属于典型跨语言环境兼容问题。
- **社区反应：** 问题非常具体，利于定位，但也暴露出国际化/路径处理的薄弱点。

### 8. 子代理角色应用时未保留运行时 model_provider
- [#27712](https://github.com/openai/codex/issues/27712) `[OPEN]`
- 关键词：`bug, CLI, subagent, config`
- **为什么重要：** 影响子代理请求路由和模型选择一致性，属于“结果正确但执行上下文不正确”的隐蔽 bug。
- **社区反应：** 2 条评论，偏开发者/高级用户反馈，技术价值较高。

### 9. VS Code 模型切换后仍保留 custom model_provider
- [#27695](https://github.com/openai/codex/issues/27695) `[OPEN]`
- 关键词：`bug, extension, custom-model, config`
- **为什么重要：** IDE 集成场景下的配置一致性问题，容易导致“看起来切了模型，实际请求没变”。
- **社区反应：** 评论较少，但对扩展用户是高风险配置 bug。

### 10. Context compaction 后错误地把旧 prompt 当成当前指令
- [#27731](https://github.com/openai/codex/issues/27731) `[OPEN]`
- 关键词：`bug, context, app`
- **为什么重要：** 影响模型对当前任务的理解，属于上下文压缩/恢复链路中的语义错误。
- **社区反应：** 目前评论少，但问题直指 Codex 的核心能力：长期上下文管理。

---

## 4) 重要 PR 进展

### 1. code-mode 独立化：提取协议与 host crate
- [#27724](https://github.com/openai/codex/pull/27724) `[OPEN]`
- **内容：** 开始把 code-mode 从现有架构中拆出独立协议与 host crate，是后续独立进程化的第一步。

### 2. code-mode 独立化：新增 host binary
- [#27725](https://github.com/openai/codex/pull/27725) `[OPEN]`
- **内容：** 构建新的 standalone host binary，推进 code-mode 脱离旧实现栈。

### 3. code-mode 独立化：添加 client 并接入打包
- [#27726](https://github.com/openai/codex/pull/27726) `[OPEN]`
- **内容：** 新增 client 侧并进入 packaging 流程，说明独立进程方案已进入可消费阶段。

### 4. code-mode 独立化：切换到新进程
- [#27727](https://github.com/openai/codex/pull/27727) `[OPEN]`
- **内容：** 完成从旧进程到新进程的切换阶段，属于整套重构的关键里程碑。

### 5. 修复 SQLite WAL-reset corruption
- [#27718](https://github.com/openai/codex/pull/27718) `[CLOSED]`
- **内容：** 通过固定 SQLite 版本和增加回归保护，避免 `state_5.sqlite` 破坏问题。

### 6. SQLite 目录异常恢复：目录变成文件也能修复
- [#27719](https://github.com/openai/codex/pull/27719) `[CLOSED]`
- **内容：** 处理非常规但真实存在的本地状态损坏场景，提升自愈能力。

### 7. Guardian 审核线程预热
- [#27721](https://github.com/openai/codex/pull/27721) `[OPEN]`
- **内容：** 在首次审核前提前创建 guardian 线程，降低首轮 review 延迟。

### 8. 审核中保留用户目标证据
- [#27723](https://github.com/openai/codex/pull/27723) `[OPEN]`
- **内容：** 在 Guardian approval review 中保留 canonical goal evidence，增强审查可解释性。

### 9. 命令执行改用已解析的环境 shell
- [#27729](https://github.com/openai/codex/pull/27729) `[OPEN]`
- **内容：** 使命令执行跟随选定环境，而不是依赖会话级 host shell，解决远程/多环境执行不一致。

### 10. 增加延迟追踪埋点
- [#27710](https://github.com/openai/codex/pull/27710) `[OPEN]`
- **内容：** 为 thread start/resume、上下文构建、插件加载、工具准备等关键链路补充 span，便于定位性能瓶颈。

---

## 5) 功能需求趋势
从 Issues 的聚类来看，社区当前最关注的功能方向主要有：

1. **连接稳定性与会话恢复**
   - 大量 `stream disconnected before completion`、`reconnecting`、`resume` 相关问题，说明“不中断完成任务”仍是核心诉求。

2. **历史会话 / 项目会话可恢复性**
   - 用户希望能重新打开 archived chat、side chat、项目 scoped histories，且不要因为更新或侧边栏变化导致“看不见”。

3. **跨平台兼容与国际化**
   - Windows 非 ASCII 路径、Korean/CP949、macOS Dock/Remote SSH 等问题频出，表明本地环境适配仍是高频需求。

4. **IDE / CLI 配置一致性**
   - VS Code 模型选择、custom model_provider、subagent role、worktree 绑定等，反映用户希望“选项改了就真正生效”。

5. **上下文管理能力**
   - compaction、plan mode、resume 后上下文污染等问题，说明社区非常在意长期任务中的语义连续性。

6. **性能与可观测性**
   - 长时间思考无输出、启动/恢复耗时、延迟追踪埋点，说明用户和开发者都在关注响应速度与可诊断性。

7. **更强的工作区/工作树工作流**
   - persistent worktree binding、worktree button、side chat reopen 等需求，表明高级开发工作流正在成为主战场。

---

## 6) 开发者关注点
当前开发者反馈中的高频痛点可以概括为以下几类：

- **连接链路不稳**：最常见的是“能开始、不能完成”，即任务执行到一半断流或卡住。
- **本地状态可靠性不足**：更新后历史记录消失、SQLite 状态损坏、目录结构异常恢复等问题被反复提及。
- **Windows 兼容性压力大**：非 ASCII 路径、用户名编码、CP949 等环境问题频繁出现。
- **模型/配置上下文容易漂移**：切换模型、应用子代理角色、恢复会话后，运行时配置可能与用户预期不一致。
- **需要更好的可观测性**：团队已通过 PR 补充 latency spans，说明内部也在加速“先定位，再优化”。
- **用户期望更强的任务连续性**：side chat、worktree、compaction、resume 等能力如果不可靠，会直接削弱 Codex 的生产力价值。

如需，我可以继续把这份日报整理成 **“管理层摘要版”** 或 **“研发跟踪版（按 Bug / Feature / Infra 分组）”**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-06-12）

## 1) 今日速览
今天 Gemini CLI 的讨论重心仍然集中在 **核心交互稳定性** 和 **非交互能力补齐**：包括 folder trust/登录流程、Agent 循环异常、以及可机器读取的模型列表能力。  
PR 侧则呈现出较明确的修复方向：一边在补齐信任与工具审批链路的稳定性，一边推进 MCP 图片 MIME 修正、模型列表命令等关键功能。

---

## 2) 版本发布
**无新 Releases。**  
因此今日重点来自 Issues 与 PR 的持续演进。

---

## 3) 社区热点 Issues
> 今日更新的 Issue 共 4 条，以下为全部值得关注条目。

1. **[#27846 TrustFolder.json issue](https://github.com/google-gemini/gemini-cli/issues/27846)**  
   - 重要性：涉及安装 IDE companion 时的信任目录流程异常，直接影响首次使用和本地配置加载。
   - 社区反应：已被 bot-triaged，当前为 **need-information**，说明问题存在但还需补充复现细节。
   - 关键信号：`TrustFolder.json` 配置错误可能是新用户的高频阻塞点。

2. **[#27844 Prompt for folder trust before slow startup auth](https://github.com/google-gemini/gemini-cli/issues/27844)**  
   - 重要性：指出 CLI 在未知工作区信任状态下，启动前做了过多初始化，导致用户感觉“卡住”。
   - 社区反应：同样是 **need-information**，但问题描述清晰，属于典型的启动体验优化项。
   - 关键信号：用户希望更早看到信任提示，而不是等待长时间初始化后才被询问。

3. **[#27852 Weird loop](https://github.com/google-gemini/gemini-cli/issues/27852)**  
   - 重要性：Agent 在“barebone implementation”需求下进入循环，属于执行稳定性问题。
   - 社区反应：已有 1 条评论，表明这类“任务跑偏/死循环”问题正在被关注。
   - 关键信号：Agent 规划与执行闭环的可靠性仍是核心痛点。

4. **[#27847 Feature Request: Add a command to list available models in machine-readable format](https://github.com/google-gemini/gemini-cli/issues/27847)**  
   - 重要性：直接对应非交互/自动化场景需求，尤其是脚本、CI、工具链集成。
   - 社区反应：已有 **2 个 👍**，是今天最明确的正向需求信号。
   - 关键信号：社区希望 CLI 能提供 `--json` 这类结构化输出能力，便于集成与自动化。

---

## 4) 重要 PR 进展
> 今日更新的 PR 共 7 条，以下为全部重要条目。

1. **[#27854 Fix/pending tools and trust overrides](https://github.com/google-gemini/gemini-cli/pull/27854)**  
   - 内容：修复 Agent 在等待用户工具审批时过早推进状态的问题，并通过串行化文件写入减少竞态。
   - 价值：直接提升 Agent 执行稳定性，和今天的“weird loop”类问题高度相关。

2. **[#27850 fix(core): sniff MCP image MIME types](https://github.com/google-gemini/gemini-cli/pull/27850)**  
   - 内容：修正 MCP 图片 payload 的 MIME 类型识别，避免 WebP 被误报为 PNG 等问题。
   - 价值：这是多模态/工具链接入中的关键兼容修复，能减少模型侧输入错误。

3. **[#27845 fix(cli): prompt for folder trust before auth](https://github.com/google-gemini/gemini-cli/pull/27845)**  
   - 内容：在交互式启动时提前询问 folder trust，再进入认证流程。
   - 价值：直接对应 Issue #27844，是典型的启动体验与安全信任流程优化。

4. **[#27848 feat(cli): add 'models' command to list available Gemini models](https://github.com/google-gemini/gemini-cli/pull/27848)**  
   - 内容：新增 `gemini models` 命令，支持列出模型、上下文窗口、tier，并支持 JSON 输出。
   - 价值：正面回应 Issue #27847，是面向自动化/脚本化的重要补强。

5. **[#27853 ci: update workflow logging and policy configurations](https://github.com/google-gemini/gemini-cli/pull/27853)**  
   - 内容：更新 CI 日志与策略配置，调整 artifact 输出和敏感文件访问限制。
   - 价值：偏工程治理，提升流水线可观测性与安全性；已关闭。

6. **[#27851 chore(ci): remove obsolete GitHub Pages deployment workflow](https://github.com/google-gemini/gemini-cli/pull/27851)**  
   - 内容：移除过时的 GitHub Pages 部署工作流，避免持续失败的部署告警。
   - 价值：减少 CI 噪音，清理历史遗留配置；已关闭。

7. **[#27849 chore(deps): bump @grpc/grpc-js from 1.14.3 to 1.14.4](https://github.com/google-gemini/gemini-cli/pull/27849)**  
   - 内容：依赖升级，常规安全/稳定性维护。
   - 价值：基础设施类更新，虽不直接影响功能，但属于持续维护的一部分；已关闭。

> 说明：今日仅有 7 条 PR 更新，已全部纳入；其余未满足“10 条”数量要求的部分，当前数据中不存在。

---

## 5) 功能需求趋势
从今日 Issues 可提炼出社区最关注的几个方向：

1. **IDE / 工作区信任流程优化**  
   - 典型问题：folder trust 提示太晚、`TrustFolder.json` 配置异常。
   - 关键词：首次启动、信任提示、workspace trust、IDE companion。

2. **非交互与机器可读输出**  
   - 典型需求：`models` 列表输出 JSON、适配脚本和 CI。
   - 关键词：`--json`、machine-readable、automation、CLI tooling。

3. **Agent 稳定性与任务执行可靠性**  
   - 典型问题：循环执行、状态推进过早、等待工具审批时行为异常。
   - 关键词：loop、tool approval、state machine、race condition。

4. **多模态与 MCP 兼容性**  
   - 典型修复：MCP 图片 MIME 识别错误。
   - 关键词：MCP、image payload、WebP/PNG、multimodal.

5. **启动性能与交互体验**  
   - 典型问题：在询问 trust 前进行了过多慢启动工作。
   - 关键词：startup latency、prompt timing、interactive UX。

---

## 6) 开发者关注点
今日开发者反馈中的高频痛点主要有：

- **启动阶段过慢、交互提示不及时**：用户在还没拿到信任提示前就经历了明显等待。
- **信任与配置文件链路脆弱**：`TrustFolder.json` 相关错误会直接阻塞使用。
- **Agent 容易偏离预期或陷入循环**：说明执行状态机与工具调用控制仍需加固。
- **缺少结构化 CLI 输出**：社区对 `models --json` 这类能力有明确需求，方便脚本化集成。
- **工具/多模态输入兼容性问题**：MCP 图片 MIME 识别修复表明实际接入场景中仍有格式误判风险。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合 Slack/飞书群的短版**，或  
2. **适合内部周报的分析版**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# 2026-06-12 GitHub Copilot CLI 社区动态日报

## 今日速览
过去 24 小时没有新 Releases，但 Issues 更新较活跃，且几乎都集中在 **v1.0.61 相关回归**：认证/会话恢复、终端输入渲染、工具调用执行与权限控制。  
社区反馈呈现出很明显的“**基础交互稳定性优先**”特征——一旦会话中断、恢复失败或输入键位异常，CLI 的核心工作流就会直接受阻。

## 社区热点 Issues

1. **[#3763 Session token expiry stops works flows, resuming fixes issue.](https://github.com/github/copilot-cli/issues/3763)**  
   认证 token 过期后不会自动刷新，导致任务中途失败；这是典型的“长任务被打断”问题，直接影响日常使用连续性。该 Issue 已有 **1 条评论**，说明复现和影响都较明确。

2. **[#3757 Content Exclusion Service fails closed (blocks all shell commands) after auth/token refresh — use-after-dispose (v1.0.61)](https://github.com/github/copilot-cli/issues/3757)**  
   这是高优先级回归：token 刷新后内容排除服务失效，甚至会阻断所有 shell 命令，属于“功能性瘫痪”级别。当前互动不多，但问题描述非常具体，且指向 `v1.0.61`。

3. **[#3758 Unable to change /model on /resume chats. Chat reloads and says authentication issue.](https://github.com/github/copilot-cli/issues/3758)**  
   在 `/resume` 会话里切换模型失败并报认证问题，说明会话恢复态的状态同步有缺陷。虽然暂无评论，但它和认证/会话相关问题成簇出现，影响面不小。

4. **[#3759 /ask not showing model response on /resume chats. Just blank screen.](https://github.com/github/copilot-cli/issues/3759)**  
   恢复会话后 `/ask` 直接空白，属于最影响可用性的 UI/会话回归之一。当前互动较少，但复现视频清晰，问题定位成本低。

5. **[#3767 Oversized attachment permanently wedges session (CAPI 5MB native limit, no recovery)](https://github.com/github/copilot-cli/issues/3767)**  
   附件超过 CAPI 原生限制后，整段会话会进入不可恢复状态，这是多模态/文档工作流的硬伤。该问题说明目前缺少“失败后降级或恢复”的设计。

6. **[#3765 Tool calls intermittently leaked as plain text (stray 'course' prefix) instead of executing (v1.0.61)](https://github.com/github/copilot-cli/issues/3765)**  
   工具调用偶发地被当作普通文本渲染，导致工具根本没有执行，直接破坏 agent 自动化能力。此类问题隐蔽性强，且明显影响信任度。

7. **[#3769 Copilot CLI output has thread problems](https://github.com/github/copilot-cli/issues/3769)**  
   输出线程/渲染错乱会让响应内容在生成过程中变形，影响可读性和调试体验。该 Issue 已获得 **1 个 👍**，说明社区对渲染稳定性有直接感知。

8. **[#3760 CLI shows "ctrl+enter enqueue" but "ctrl+enter" adds a line break to the prompt and "ctrl+q" is the enqueue command](https://github.com/github/copilot-cli/issues/3760)**  
   Windows 下键位提示与实际行为不一致，会误导用户操作，属于基础交互缺陷。虽然当前没有评论，但这种“文案与行为不一致”会显著降低可用性。

9. **[#3768 Shift+Enter - Multiline Input Does Not Work](https://github.com/github/copilot-cli/issues/3768)**  
   多行输入失效会直接影响复杂 prompt 编写，是高频基础能力问题。当前互动不多，但属于明显的输入链路回归。

10. **[#3772 Support authenticated (OAuth/token) reads of the MCP registry so enterprises don't have to expose it anonymously](https://github.com/github/copilot-cli/issues/3772)**  
    企业/组织场景下 MCP registry 读取缺乏认证，不利于安全合规部署。该需求面向企业用户，价值明确，但目前还在功能诉求阶段，尚无社区互动。

## 重要 PR 进展

1. **[#3771 Initial project setup](https://github.com/github/copilot-cli/pull/3771)**  
   过去 24 小时仅有 1 个更新 PR，内容是基础项目初始化，暂未体现具体功能合并或 bug 修复。结合 Issues 热度来看，近期主战场仍在问题修复与稳定性排查，而非功能扩展。

## 功能需求趋势

- **认证与会话恢复能力**：社区最集中关注 token 过期自动刷新、`/resume` 恢复后的可用性、模型切换后的状态一致性，以及企业场景下的 MCP 认证访问。  
  代表 Issue：[#3763](https://github.com/github/copilot-cli/issues/3763)、[#3758](https://github.com/github/copilot-cli/issues/3758)、[#3772](https://github.com/github/copilot-cli/issues/3772)

- **终端输入与渲染稳定性**：多行输入、快捷键映射、语音输入、输出线程/渲染错乱，都是高频基础交互痛点。  
  代表 Issue：[#3760](https://github.com/github/copilot-cli/issues/3760)、[#3768](https://github.com/github/copilot-cli/issues/3768)、[#3769](https://github.com/github/copilot-cli/issues/3769)、[#3770](https://github.com/github/copilot-cli/issues/3770)

- **会话连续性与上下文管理**：附件过大、contextTier 配置无效、resume 后空白等问题，说明会话与上下文层的鲁棒性仍需加强。  
  代表 Issue：[#3767](https://github.com/github/copilot-cli/issues/3767)、[#3762](https://github.com/github/copilot-cli/issues/3762)、[#3759](https://github.com/github/copilot-cli/issues/3759)

- **工具执行与权限控制可解释性**：工具调用偶发不执行、目录权限重复审批、内容排除服务异常，反映出“代理执行链路”与权限系统需要更强的可观测性和可解释性。  
  代表 Issue：[#3765](https://github.com/github/copilot-cli/issues/3765)、[#3764](https://github.com/github/copilot-cli/issues/3764)、[#3757](https://github.com/github/copilot-cli/issues/3757)

## 开发者关注点

- **v1.0.61 回归集中爆发**：输入、渲染、会话、权限、工具调用多条链路同时出现问题，说明近期版本稳定性是首要关注点。  
  代表：[#3769](https://github.com/github/copilot-cli/issues/3769)、[#3765](https://github.com/github/copilot-cli/issues/3765)

- **“恢复会话”必须真正可恢复**：用户希望 `/resume` 不是仅恢复界面，而是能完整恢复模型、认证与工具状态。  
  代表：[#3763](https://github.com/github/copilot-cli/issues/3763)、[#3758](https://github.com/github/copilot-cli/issues/3758)、[#3759](https://github.com/github/copilot-cli/issues/3759)

- **Windows 输入体验需要优先修复**：快捷键提示、Shift+Enter、多行输入、语音输入等问题，说明 Windows 平台交互链路存在明显回归。  
  代表：[#3760](https://github.com/github/copilot-cli/issues/3760)、[#3768](https://github.com/github/copilot-cli/issues/3768)、[#3770](https://github.com/github/copilot-cli/issues/3770)

- **企业场景在快速升温**：MCP registry 认证、权限审批透明度、插件控制粒度，都在指向更强的企业可部署性与合规性需求。  
  代表：[#3772](https://github.com/github/copilot-cli/issues/3772)、[#3764](https://github.com/github/copilot-cli/issues/3764)、[#3761](https://github.com/github/copilot-cli/issues/3761)

如果你愿意，我也可以把这份日报进一步整理成 **适合内部周报/Slack 群发** 的精简版。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-06-12）

## 1. 今日速览
过去 24 小时内，OpenCode 没有新的 Release，但 Issues 和 PR 仍然非常活跃，讨论集中在 **会话管理、Windows/Desktop 兼容性、模型/Provider 适配、以及稳定性修复** 上。  
从互动量看，热点问题多数只有 1–4 条评论，说明大量议题已进入“定位具体 bug / 方案评审”的阶段，而不是泛泛讨论。

---

## 2. 社区热点 Issues

1. **#31932 Cross-project session list / picker for TUI**  
   [GitHub](https://github.com/anomalyco/opencode/issues/31932)  
   重要性：当前 `/sessions` 只限于当前项目，多仓库切换场景下效率偏低，这个需求直接影响日常使用流畅度。  
   社区反应：4 条评论，是今天评论最高的 Issue 之一，说明需求共鸣较强。

2. **#31915 Crashes on startup / launch**  
   [GitHub](https://github.com/anomalyco/opencode/issues/31915)  
   重要性：启动即崩溃属于高优先级阻断问题，且与大文件处理/状态污染相关，可能影响更大范围用户。  
   社区反应：3 条评论，属于高风险稳定性问题。

3. **#31901 [FEATURE]: Add SSH remote directory references**  
   [GitHub](https://github.com/anomalyco/opencode/issues/31901)  
   重要性：这是面向远程开发的关键能力，能补齐 SSH 远程目录引用，提升跨机器工作流。  
   社区反应：3 条评论，显示对远程场景支持存在明确诉求。

4. **#31972 New Layout and Designs 开启后无法切换 Plan/Build**  
   [GitHub](https://github.com/anomalyco/opencode/issues/31972)  
   重要性：属于新布局功能的交互回归，直接影响模式切换可用性。  
   社区反应：2 条评论，问题描述清晰，定位价值高。

5. **#31971 DeepSeek-V4-Flash 会话中出现 “all messages must have non-empty content”**  
   [GitHub](https://github.com/anomalyco/opencode/issues/31971)  
   重要性：典型的模型兼容/上下文管理问题，影响长会话和高频模型用户。  
   社区反应：2 条评论，说明已有用户在实际编码中复现。

6. **#31962 gpt-5.5 does not work**  
   [GitHub](https://github.com/anomalyco/opencode/issues/31962)  
   重要性：新模型不可用会直接影响模型选择和产品可信度，属于 Provider 兼容核心问题。  
   社区反应：2 条评论，属于明确的模型接入故障反馈。

7. **#31960 ACP: Zed doesn’t broadcast context size / fullness**  
   [GitHub](https://github.com/anomalyco/opencode/issues/31960)  
   重要性：涉及 ACP 协议互操作，影响外部编辑器/代理对 OpenCode 状态的可见性。  
   社区反应：2 条评论，说明外部集成用户在关注协议一致性。

8. **#31959 Desktop app: reprendre la dernière session au lancement**  
   [GitHub](https://github.com/anomalyco/opencode/issues/31959)  
   重要性：桌面端启动恢复上次会话是高频基础体验，当前行为会破坏连续工作流。  
   社区反应：2 条评论，且已关闭，说明问题已被正视并处理。

9. **#31923 SSE event subscriptions buffer without bound when the consumer stops draining**  
   [GitHub](https://github.com/anomalyco/opencode/issues/31923)  
   重要性：这是偏底层的内存泄漏/资源耗尽问题，影响长期运行稳定性。  
   社区反应：2 条评论，虽然评论不多，但技术风险很高。  
   注：该 Issue 已关闭。

10. **#31975 [Windows] Desktop UI shows wrong drive letter for project path**  
    [GitHub](https://github.com/anomalyco/opencode/issues/31975)  
    重要性：Windows 路径显示错误会误导用户判断当前工作目录，属于桌面端可见性缺陷。  
    社区反应：1 条评论，但问题足够具体，适合快速修复。

---

## 3. 重要 PR 进展

1. **#31973 fix(provider): refresh models in background**  
   [GitHub](https://github.com/anomalyco/opencode/pull/31973)  
   进展：把模型发现放到后台执行，并在发现后刷新 Provider 状态与缓存，减少阻塞并提升模型更新及时性。

2. **#31968 refactor(core): simplify integration credentials**  
   [GitHub](https://github.com/anomalyco/opencode/pull/31968)  
   进展：重构集成凭据模型与 API，统一认证方式，简化后续扩展和维护成本。

3. **#31947 fix(tui): restore terminal capability detection over ssh**  
   [GitHub](https://github.com/anomalyco/opencode/pull/31947)  
   进展：修复 SSH 场景下 TUI 颜色/终端能力识别异常问题，改善远程开发体验。  
   关联 Issue：#31284

4. **#31946 fix: Windows session path, shell env, error message, and autocomplete**  
   [GitHub](https://github.com/anomalyco/opencode/pull/31946)  
   进展：集中修复 Windows 下的路径、Shell 环境、错误提示和自动补全问题，属于典型的系统级体验补丁。

5. **#31940 fix(opencode): resolve MCP resource content**  
   [GitHub](https://github.com/anomalyco/opencode/pull/31940)  
   进展：调整 MCP 资源处理方式，保留 URI 语义、持久化资源内容，增强图片/数据型资源支持。

6. **#31949 fix(tui): show prompt submission errors**  
   [GitHub](https://github.com/anomalyco/opencode/pull/31949)  
   进展：让提示词提交失败时可见错误信息，不再“静默清空输入”，提升可调试性和可感知性。

7. **#31933 fix(desktop): hide Windows selected app subprocesses**  
   [GitHub](https://github.com/anomalyco/opencode/pull/31933)  
   进展：修复 Windows 桌面端打开文件/应用时子进程可见的问题，减少干扰窗口与流程泄露。

8. **#31929 fix(opencode): honor OpenAI baseURL for Codex OAuth**  
   [GitHub](https://github.com/anomalyco/opencode/pull/31929)  
   进展：让 Codex OAuth 请求正确遵循自定义 `baseURL`，对企业代理、自建网关和兼容层很关键。

9. **#31945 fix(session): use parent relationship instead of ID ordering for loop exit condition**  
   [GitHub](https://github.com/anomalyco/opencode/pull/31945)  
   进展：修正会话循环退出条件，避免依赖 ID 排序导致的错误判断，提升 Web/异步场景稳定性。

10. **#31952 feat: register themes in $CONFIG/opencode/desktop-themes/**  
    [GitHub](https://github.com/anomalyco/opencode/pull/31952)  
    进展：新增桌面主题注册机制，增强可定制性，为社区主题生态铺路。

---

## 4. 功能需求趋势

1. **会话管理与多项目工作流**  
   代表性需求：跨项目 session picker、上次会话恢复、Ctrl+P 会话过滤、commit log viewer、worktree 命名。  
   代表 Issue：[#31932](https://github.com/anomalyco/opencode/issues/31932)、[#31959](https://github.com/anomalyco/opencode/issues/31959)、[#31965](https://github.com/anomalyco/opencode/issues/31965)、[#31931](https://github.com/anomalyco/opencode/issues/31931)。

2. **Windows / Desktop 兼容性修复**  
   代表性需求：路径显示、子进程隐藏、Shell 环境、自动补全、桌面启动行为修复。  
   代表 Issue：[#31975](https://github.com/anomalyco/opencode/issues/31975)、[#31972](https://github.com/anomalyco/opencode/issues/31972)、[#31959](https://github.com/anomalyco/opencode/issues/31959)。

3. **模型与 Provider 适配能力**  
   代表性需求：gpt-5.5 可用性、DeepSeek 长上下文错误、视觉模型 fallback、后台刷新模型列表、OpenAI baseURL 兼容。  
   代表 Issue：[#31962](https://github.com/anomalyco/opencode/issues/31962)、[#31971](https://github.com/anomalyco/opencode/issues/31971)、[#31936](https://github.com/anomalyco/opencode/issues/31936)。

4. **稳定性、性能与资源保护**  
   代表性需求：启动崩溃、大文件 diff 卡死、SSE 缓冲失控、agent 循环检测、长会话异常。  
   代表 Issue：[#31915](https://github.com/anomalyco/opencode/issues/31915)、[#31923](https://github.com/anomalyco/opencode/issues/31923)、[#31942](https://github.com/anomalyco/opencode/issues/31942)。

5. **MCP / ACP / 远程集成能力**  
   代表性需求：MCP 资源内容解析、ACP 上下文广播、SSH 远程目录引用。  
   代表 Issue：[#31940](https://github.com/anomalyco/opencode/issues/31940)、[#31960](https://github.com/anomalyco/opencode/issues/31960)、[#31901](https://github.com/anomalyco/opencode/issues/31901)。

6. **界面可用性与快捷操作**  
   代表性需求：Plan/Build 切换、思考块快捷键、Home 提示优化、Navbar 交互、主题注册。  
   代表 PR：[#31953](https://github.com/anomalyco/opencode/pull/31953)、[#31966](https://github.com/anomalyco/opencode/pull/31966)、[#31967](https://github.com/anomalyco/opencode/pull/31967)、[#31952](https://github.com/anomalyco/opencode/pull/31952)。

---

## 5. 开发者关注点

- **状态一致性**：会话恢复、会话切换、循环退出条件等问题频繁出现，说明“状态管理”是当前核心痛点。  
  参考：[#31959](https://github.com/anomalyco/opencode/issues/31959)、[#31945](https://github.com/anomalyco/opencode/pull/31945)

- **模型兼容性**：新模型不可用、上下文错误、视觉能力 fallback、provider 刷新都在同一条主线上。  
  参考：[#31962](https://github.com/anomalyco/opencode/issues/31962)、[#31971](https://github.com/anomalyco/opencode/issues/31971)、[#31973](https://github.com/anomalyco/opencode/pull/31973)

- **桌面端与 Windows 体验**：路径、子进程、启动恢复、快捷键、布局切换，说明桌面端仍在快速打磨期。  
  参考：[#31975](https://github.com/anomalyco/opencode/issues/31975)、[#31972](https://github.com/anomalyco/opencode/issues/31972)、[#31933](https://github.com/anomalyco/opencode/pull/31933)

- **性能与可靠性**：大文件 diff、SSE 队列、agent 循环调用、启动崩溃，反映出对“长时间运行”的压力测试需求。  
  参考：[#31915](https://github.com/anomalyco/opencode/issues/31915)、[#31923](https://github.com/anomalyco/opencode/issues/31923)、[#31942](https://github.com/anomalyco/opencode/issues/31942)

- **错误可见性与可调试性**：prompt 提交失败、schema 校验失败、模型调用异常等都在推动更明确的错误反馈。  
  参考：[#31954](https://github.com/anomalyco/opencode/issues/31954)、[#31949](https://github.com/anomalyco/opencode/pull/31949)

如果你愿意，我也可以把这份日报进一步整理成 **“管理层摘要版”** 或 **“研发周报模板版”**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-06-12）
数据源：`github.com/badlogic/pi-mono` / `earendil-works/pi`

## 1) 今日速览
过去 24 小时没有新 Release，但 Issues 和 PR 依然非常活跃，核心焦点集中在**稳定性、跨平台兼容性、模型/Provider 适配**以及**扩展生态的可靠性**上。  
从反馈节奏看，社区提交的问题大多是可复现的具体 bug，且多数在同日被关闭或有对应 PR 跟进，整体呈现“高频修复、快速闭环”的状态。

## 2) 版本发布
- 无新 Release

## 3) 社区热点 Issues
1. [#5652](https://github.com/earendil-works/pi/issues/5652) `pi-coding-agent` 的 `npm-shrinkwrap.json` 缺少 `pi-ai` 的 integrity，导致 `@earendil-works/pi-ai` 被安装成两份，直接影响自定义 Provider 注册。  
   - 重要性：属于会破坏运行时行为的安装链路问题。  
   - 社区反应：3 条评论，已关闭，说明讨论相对集中且推进较快。

2. [#5653](https://github.com/earendil-works/pi/issues/5653) 与上面同类问题：重复安装导致 API provider registry 被拆成两个模块实例。  
   - 重要性：会让扩展/Provider“看起来注册了，但实际不可见”。  
   - 社区反应：1 条评论，已关闭，属于快速确认型问题。

3. [#5645](https://github.com/earendil-works/pi/issues/5645) 包管理命令在完成后挂起，`install/remove/list/update/config` 不能正常退出。  
   - 重要性：直接影响 CLI 可用性，尤其是自动化脚本和长链路命令。  
   - 社区反应：1 条评论，已关闭，属于高优先级稳定性修复。

4. [#5630](https://github.com/earendil-works/pi/issues/5630) Windows 下 `pi` 包管理/配置子命令执行完后进程不退出，必须手动杀进程。  
   - 重要性：对 Windows 用户是典型阻断问题。  
   - 社区反应：1 条评论，已关闭，跨平台兼容问题持续被关注。

5. [#5628](https://github.com/earendil-works/pi/issues/5628) `pi -p` 在非 TTY 环境下会卡死，影响 CI、agent harness 和管道调用。  
   - 重要性：这类问题会直接影响自动化/集成场景。  
   - 社区反应：1 条评论，已关闭，说明问题边界明确但影响面较大。

6. [#5649](https://github.com/earendil-works/pi/issues/5649) `loginAnthropic` 忽略 `options.signal`，且在 abort 后会泄漏固定端口的 OAuth 回调服务器。  
   - 重要性：涉及资源泄漏和取消语义，影响登录流程健壮性。  
   - 社区反应：1 条评论，已关闭，属于典型“生命周期管理”修复。

7. [#5651](https://github.com/earendil-works/pi/issues/5651) Bedrock 上 Fable 5 的缓存支持失效。  
   - 重要性：影响性能与成本控制，尤其是高频调用场景。  
   - 社区反应：1 条评论，已关闭，偏模型适配类问题。

8. [#5616](https://github.com/earendil-works/pi/issues/5616) 仅含可选参数的工具 schema 未显式写入 `required: []`，导致部分 Provider 拒绝请求。  
   - 重要性：直接影响 tool calling 的跨 Provider 兼容性。  
   - 社区反应：1 条评论，已关闭，属于协议兼容性修复。

9. [#5638](https://github.com/earendil-works/pi/issues/5638) 需求：HTTPS 私有仓库安装支持 token 认证。  
   - 重要性：企业/私有仓库场景的刚需。  
   - 社区反应：1 条评论，已关闭，说明需求明确且较为集中。

10. [#5618](https://github.com/earendil-works/pi/issues/5618) WezTerm 下图片渲染失败，影响 `read` 工具的图像工作流。  
   - 重要性：这是少见但很关键的多模态可用性问题。  
   - 社区反应：0 条评论，仍为开放状态，属于待跟进问题。

## 4) 重要 PR 进展
1. [#5650](https://github.com/earendil-works/pi/pull/5650) 修复 OpenRouter Kimi free 模型的过期断言，避免 `generate-models.ts` 因上游模型列表变化而触发 CI 失败。  
   - 价值：保证模型生成链路跟随上游变更而稳定运行。  
   - 状态：Open。

2. [#5647](https://github.com/earendil-works/pi/pull/5647) 加载 context 文件时做路径规范化，修复 symlink 目录下 `AGENTS.md` 重复注入问题。  
   - 价值：避免系统提示污染，提升会话上下文一致性。

3. [#5646](https://github.com/earendil-works/pi/pull/5646) 避免 compaction 后的 unsafe continuation。  
   - 价值：提升长会话/压缩后的执行安全性，降低上下文切换引发的异常。

4. [#5641](https://github.com/earendil-works/pi/pull/5641) 让包管理命令在 CLI 入口处正确退出。  
   - 价值：直接解决“命令执行完不退出”的核心问题，改善脚本和交互体验。

5. [#5640](https://github.com/earendil-works/pi/pull/5640) Windows 终端中通过 `Ctrl+V` 粘贴剪贴板图片。  
   - 价值：改善 Windows 用户的多模态输入体验。

6. [#5637](https://github.com/earendil-works/pi/pull/5637) 增加 `PI_GIT_TOKEN` / `GITHUB_TOKEN` 对私有 HTTPS git 安装的支持。  
   - 价值：补齐企业和私有依赖安装场景。

7. [#5635](https://github.com/earendil-works/pi/pull/5635) 在 WSL 上将图片粘贴绑定为 `Alt+V`。  
   - 价值：绕开 Windows Terminal 对 `Ctrl+V` 的吞噬问题，补齐跨平台体验。

8. [#5634](https://github.com/earendil-works/pi/pull/5634) 规范生成模型的 cost 数据，修正浮点误差和价格格式。  
   - 价值：提升模型目录数据准确性，减少生成物噪音。  
   - 状态：Open。

9. [#5629](https://github.com/earendil-works/pi/pull/5629) 为 `google-vertex` 增加 `gemini-3.5-flash` 模型。  
   - 价值：补齐新模型支持，保持 Provider 目录同步上游。

10. [#5624](https://github.com/earendil-works/pi/pull/5624) 暴露 session name change 事件。  
   - 价值：增强扩展/IDE 插件对会话生命周期的可观测性，利于深度集成。

## 5) 功能需求趋势
从今天的 Issues 看，社区关注点主要集中在以下方向：

- **CLI 稳定性与进程生命周期**  
  包括命令执行后不退出、非 TTY 挂起、Windows 下卡死等，说明“可脚本化、可自动化”是高优先级诉求。  
  相关链接：[#5645](https://github.com/earendil-works/pi/issues/5645)、[#5630](https://github.com/earendil-works/pi/issues/5630)、[#5628](https://github.com/earendil-works/pi/issues/5628)

- **模型与 Provider 兼容性**  
  包括新模型接入、context window 校准、Bedrock caching、模型 ID 解析等，表明模型目录和适配层需要持续跟进上游变化。  
  相关链接：[#5651](https://github.com/earendil-works/pi/issues/5651)、[#5644](https://github.com/earendil-works/pi/issues/5644)、[#5643](https://github.com/earendil-works/pi/issues/5643)

- **工具调用与协议健壮性**  
  `required: []`、事件顺序、HTTP status 暴露、retryable error 分类等问题，反映出社区对“结构化错误”和“协议一致性”的需求很强。  
  相关链接：[#5616](https://github.com/earendil-works/pi/issues/5616)、[#5614](https://github.com/earendil-works/pi/issues/5614)、[#5623](https://github.com/earendil-works/pi/issues/5623)、[#5617](https://github.com/earendil-works/pi/issues/5617)

- **扩展生态与会话集成**  
  例如 session name 事件、上下文文件加载、Opencode bridge、`excludeFromContext` 等，说明插件/扩展作者希望获得更稳定的生命周期和上下文控制能力。  
  相关链接：[#5625](https://github.com/earendil-works/pi/issues/5625)、[#5636](https://github.com/earendil-works/pi/issues/5636)、[#5654](https://github.com/earendil-works/pi/issues/5654)

- **多模态输入输出体验**  
  图片渲染与粘贴在 WezTerm/Windows/WSL 上的兼容问题仍然是用户体验重点。  
  相关链接：[#5618](https://github.com/earendil-works/pi/issues/5618)、[#5632](https://github.com/earendil-works/pi/issues/5632)

## 6) 开发者关注点
- **隐藏型故障很多**：最常见不是“功能缺失”，而是“命令执行完不退出”“非 TTY 卡死”“abort 后资源没释放”这类隐性问题。  
  相关链接：[#5645](https://github.com/earendil-works/pi/issues/5645)、[#5628](https://github.com/earendil-works/pi/issues/5628)、[#5649](https://github.com/earendil-works/pi/issues/5649)

- **跨平台边界条件被反复验证**：Windows、WSL、WezTerm、symlink 目录、CI 环境都在暴露边缘行为。  
  相关链接：[#5630](https://github.com/earendil-works/pi/issues/5630)、[#5632](https://github.com/earendil-works/pi/issues/5632)、[#5618](https://github.com/earendil-works/pi/issues/5618)、[#5648](https://github.com/earendil-works/pi/issues/5648)

- **Provider/模型层需要更强的容错与同步机制**：包括新模型添加、context window 精度、schema 校验、缓存能力识别、错误分类等。  
  相关链接：[#5651](https://github.com/earendil-works/pi/issues/5651)、[#5644](https://github.com/earendil-works/pi/issues/5644)、[#5616](https://github.com/earendil-works/pi/issues/5616)、[#5617](https://github.com/earendil-works/pi/issues/5617)

- **开发者生态在增强**：session 事件、`sendMessage()` 行为控制、私有仓库安装支持等，说明扩展作者和集成方对 API 稳定性与可观测性要求更高。  
  相关链接：[#5625](https://github.com/earendil-works/pi/issues/5625)、[#5654](https://github.com/earendil-works/pi/issues/5654)、[#5638](https://github.com/earendil-works/pi/issues/5638)

如果你愿意，我也可以把这份日报再整理成**适合公众号/飞书群的简版**，或者输出成**Markdown 可直接发布**的格式。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# 2026-06-12 Qwen Code 社区动态日报

## 1) 今日速览
今天社区讨论的重心仍然集中在 **会话状态持久化、统计准确性、IDE/ACP 集成兼容性** 这三条主线。与此同时，仓库发布了一个新的预览版 **v0.18.0-preview.2**，并且有多项围绕 `/goal`、`/stats`、Web Shell、daemon 与 TUI 的功能性 PR 在推进中。  
整体来看，Qwen Code 正在从“功能扩张”转向“体验打磨 + 状态一致性修复”，这对 AI 开发工具的稳定性尤其关键。

---

## 2) 版本发布
- **[v0.18.0-preview.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.18.0-preview.2)**  
  这次预览版主要延续了版本推进与细节修复，Release notes 中可见：
  - `chore(release): v0.17.1`
  - `fix(cli): skip thought parts in copy output`
  
  从信息看，本次发布重点更偏向 **CLI 输出优化** 与 **发布流程更新**，属于预览版的渐进式迭代。

---

## 3) 社区热点 Issues
> 说明：本次数据中**仅有 6 条更新 Issue**，以下按影响面、优先级和讨论热度排序。

1. **[#4994](https://github.com/QwenLM/qwen-code/issues/4994)** `[P1] /stats 在首次 turn 打开时会永久双计 session`  
   - **为什么重要**：这是直接影响统计准确性的高优先级 bug，会污染 `usage_record.jsonl`，进一步影响 sessions、tokens、durations、tool counts 等全部聚合结果。  
   - **社区反应**：优先级最高（P1），已有 **2 条评论**，说明问题已被快速关注。

2. **[#4987](https://github.com/QwenLM/qwen-code/issues/4987)** `PR #4779 静默回滚了已合并的 IME 物理光标定位功能`  
   - **为什么重要**：这是典型的回归问题，涉及中文/日文等输入法场景，直接影响国际化用户的输入体验。  
   - **社区反应**：**5 条评论**，是今天讨论最活跃的 Issue，且带有 `welcome-pr`，说明社区有较强修复意愿。

3. **[#4999](https://github.com/QwenLM/qwen-code/issues/4999)** `resume 后 /goal 迭代计数重置，绕过 MAX_GOAL_ITERATIONS`  
   - **为什么重要**：这是安全与控制边界问题，若 resume 后重新“续命”，会削弱 `/goal` 的生命周期限制。  
   - **社区反应**：已有 **2 条评论**，问题描述清晰，容易形成修复闭环。

4. **[#5007](https://github.com/QwenLM/qwen-code/issues/5007)** `ACP 模式下无法暴露 ~/.qwen/skills`  
   - **为什么重要**：直接影响通过 Zed 等 ACP 场景使用 Qwen Code 时的能力发现，属于集成体验缺口。  
   - **社区反应**：已有 **1 条评论**，说明问题新但场景明确。

5. **[#4991](https://github.com/QwenLM/qwen-code/issues/4991)** `VS Code 升级到 1.124.0 后，QWEN Code 0.16 无法启动`  
   - **为什么重要**：典型的 IDE 兼容性回归，影响扩展/插件可用性，且与版本升级强相关。  
   - **社区反应**：**2 条评论**，问题已被复现并提供了降级规避方案。

6. **[#5008](https://github.com/QwenLM/qwen-code/issues/5008)** `v0.17.1-nightly.20260612... 发布失败`  
   - **为什么重要**：虽然不是产品缺陷，但暴露出发布流水线稳定性问题，会影响 nightly 交付节奏。  
   - **社区反应**：由 `github-actions[bot]` 自动创建，说明是 CI/CD 侧的即时告警。

---

## 4) 重要 PR 进展
> 以下选取 10 个最值得关注的 PR，覆盖核心修复、交互体验、daemon/session 管理与兼容性增强。

1. **[#5000](https://github.com/QwenLM/qwen-code/pull/5000)** `fix(goal): resume 后持久化 /goal 迭代计数`  
   - 直接修复 `MAX_GOAL_ITERATIONS` 在 session resume 后失效的问题，和 Issue #4999 强相关。  
   - 这是一个典型的“状态跨会话持久化”修复。

2. **[#4995](https://github.com/QwenLM/qwen-code/pull/4995)** `fix(stats): 按 sessionId 去重并跳过进行中的写入`  
   - 针对 Issue #4994，避免 `/stats` 误触发导致 usage record 重复写入。  
   - 这是统计系统可信度的关键修复。

3. **[#4993](https://github.com/QwenLM/qwen-code/pull/4993)** `fix(input): 恢复被 #4779 回滚的 IME 光标定位`  
   - 直接恢复 IME 物理光标定位，修复中文输入法体验。  
   - 属于高优先级 UX 回归修复。

4. **[#5004](https://github.com/QwenLM/qwen-code/pull/5004)** `feat(core): durable cron jobs — /loop 任务支持重启后续跑`  
   - 把 `/loop` 从 session-only 扩展到可持久化任务，重启后自动恢复。  
   - 对“持续检查 PR / 定时提醒”类 agent 场景很有价值。

5. **[#5005](https://github.com/QwenLM/qwen-code/pull/5005)** `feat(web-shell): 增加 Option+Enter / Cmd+Enter 换行快捷键`  
   - 提升 Web Shell 输入效率，贴近 CLI TUI 与其他同类产品的交互习惯。  
   - 属于细节型但高频使用的可用性增强。

6. **[#5006](https://github.com/QwenLM/qwen-code/pull/5006)** `fix(daemon): 日志脱敏并处理 MCP 重启类型`  
   - 强化 daemon 日志安全与类型处理，减少敏感信息泄露风险。  
   - 对稳定性与运维可观测性都重要。

7. **[#5002](https://github.com/QwenLM/qwen-code/pull/5002)** `refactor(serve): 统一 session title / displayName`  
   - 简化 daemon 内部 API 的会话命名模型，并确保 metadata 更新后可持久化。  
   - 有助于后续 session 管理与 UI 展示一致性。

8. **[#5001](https://github.com/QwenLM/qwen-code/pull/5001)** `feat(cli): 可选在每个 assistant turn 前显示时间戳`  
   - 增加输出时间可读性，方便排查长会话与响应时延。  
   - 属于 CLI 可观测性增强。

9. **[#4996](https://github.com/QwenLM/qwen-code/pull/4996)** `feat(core): 补齐 declarative-agent 的 mcpServers + hooks`  
   - 推进与 Claude Code 2.1.168 的兼容性，补齐 declarative-agent 能力。  
   - 对生态互操作和 agent 配置迁移很关键。

10. **[#4998](https://github.com/QwenLM/qwen-code/pull/4998)** `fix(daemon): 通过 AsyncLocalStorage 绑定正确的 QWEN_CODE_SESSION_ID`  
    - 确保 shell 子进程环境变量中的 session ID 与实际创建者一致。  
    - 这是底层会话隔离与追踪准确性的基础修复。  
    - 该 PR 已关闭，说明修复已推进到可合并/已合并阶段。

---

## 5) 功能需求趋势
从今天的 Issue 和 PR 组合来看，社区关注点高度集中在以下方向：

1. **会话持久化与恢复**
   - `/goal` 计数、`/stats` 写入、`/loop` 定时任务、session resume 后状态一致性  
   - 说明用户希望 AI 工具具备“跨启动不丢状态”的可靠行为

2. **IDE / ACP / Web Shell 深度集成**
   - VS Code 兼容性、ACP 模式技能暴露、Web Shell 快捷键、输入法光标定位  
   - 表明 Qwen Code 正在向“多宿主环境统一体验”演进

3. **统计与可观测性**
   - `/stats` 准确性、时间戳输出、session 标识统一、usage record 去重  
   - 社区对数据可信度的敏感度明显提高

4. **Agent 配置与生态互操作**
   - `mcpServers`、`hooks`、declarative-agent、team messaging  
   - 用户希望 Qwen Code 更接近“可迁移、可配置、可编排”的 agent 平台

5. **UI/UX 细节打磨**
   - TUI 边框、工具结果折叠、换行快捷键、conversation rewind、IME 修复  
   - 说明高频交互细节正在成为竞争力的一部分

---

## 6) 开发者关注点
今天的开发者反馈里，痛点和高频需求主要是：

- **避免回归**：PR #4779 引发的 IME 回滚问题说明，合并前的冲突处理与回归测试仍是重点。
- **状态一致性**：session resume、统计写入、环境变量传递等问题集中出现，表明“跨进程/跨重启状态管理”是当前核心难点。
- **IDE 兼容性**：VS Code 版本升级后无法启动，提示扩展层面对宿主环境变化较敏感。
- **ACP/skills 可发现性**：在非 CLI 入口中暴露技能列表，是影响产品可用性的关键需求。
- **发布流水线稳定性**：nightly release 失败说明 CI/CD 仍需加强健壮性与可诊断性。
- **明确的测试计划**：多个 PR 描述都强调 reviewer test plan，反映维护者对“可复现、可验证”非常看重。

---

如果你愿意，我可以把这份日报进一步整理成：
1. **适合飞书/Slack 发送的短版**，或  
2. **适合周报归档的长版 Markdown**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# DeepSeek TUI / CodeWhale 社区动态日报  
**日期：2026-06-12**

## 1) 今日速览
今天社区讨论明显聚焦在 **v0.8.59 的稳定性、子代理架构、模型/Provider 正确性** 上，同时也出现了大量围绕 **测试补强、代码清理、安全修复** 的 PR。  
另一个非常明确的信号是：项目正在从 **DeepSeek-TUI** 彻底切换到 **CodeWhale**，新版本已把命名、包名和 release 资产统一到新品牌。  
整体来看，社区正从“能用”转向“可维护、可扩展、可发布”的阶段。  

---

## 2) 版本发布

### v0.8.58
- **核心变化**：`CodeWhale` 已成为项目、命令、npm 包与 release asset 的**唯一正式名称**；旧的 `deepseek-tui` 包已被标记为弃用，不再继续发布。  
- **迁移提示**：从旧版 `deepseek` / `deepseek-tui` 名称迁移到新命名，需要参考 `docs/REBRAND.md`。  
- 链接：[`v0.8.58 Release`](https://github.com/Hmbown/CodeWhale/releases/tag/v0.8.58)

---

## 3) 社区热点 Issues（10 条）

> 选取标准：优先选择 **评论数高、影响面大、能代表当前社区焦点** 的问题。

### 1. v0.8.59 执行路线图：将 Provider / 子代理 / Workflow / 文档 / 本地化纳入同一发布节奏  
- 重要性：这是当前版本的“总纲”，决定了哪些工作进入 v0.8.59，哪些继续排队。  
- 社区反应：**5 条评论**，是今日最活跃的讨论点之一。  
- 链接：[#3098](https://github.com/Hmbown/CodeWhale/issues/3098)

### 2. 子代理 fanout 规划可能让 TUI 卡在等待 Provider 状态，缺乏回压和恢复机制  
- 重要性：直接影响长任务和多代理场景下的可用性，属于“卡死体验”级问题。  
- 社区反应：**2 条评论**，说明已有明显关注。  
- 链接：[#3095](https://github.com/Hmbown/CodeWhale/issues/3095)

### 3. v0.8.59 发布追踪：TUI 鼠标报告泄漏、运行时安全、当前 Issue/PR 队列  
- 重要性：这是发布阻塞级别的追踪项，覆盖输入泄漏与发布前清单整理。  
- 社区反应：**2 条评论**，属于维护者重点推进事项。  
- 链接：[#3063](https://github.com/Hmbown/CodeWhale/issues/3063)

### 4. 为 Agent 增加一等公民式澄清问题请求能力  
- 重要性：提升 Agent 与用户之间的交互质量，减少“Agent 问了但用户没注意到”的体验损失。  
- 社区反应：**1 条评论**，属于新功能方向但尚在早期共识阶段。  
- 链接：[#3102](https://github.com/Hmbown/CodeWhale/issues/3102)

### 5. 完成命令 / Tool / compaction / TUI 架构流，同时不丢设计意图  
- 重要性：关系到多个历史架构工作流是否能在新版本中真正收敛。  
- 社区反应：**1 条评论**，说明讨论已进入“整合与取舍”阶段。  
- 链接：[#3101](https://github.com/Hmbown/CodeWhale/issues/3101)

### 6. OpenRouter 的 Nemotron 预设使用了无效模型 ID  
- 重要性：这是典型的“配置正确性”问题，会直接导致模型选择后立即失败。  
- 社区反应：**1 条评论**，偏实用性修复。  
- 链接：[#3094](https://github.com/Hmbown/CodeWhale/issues/3094)

### 7. API 超时中断的子代理会导致 fanout UI 与任务句柄仍显示运行中  
- 重要性：影响中断恢复、状态一致性和用户对任务是否真的结束的判断。  
- 社区反应：**1 条评论**，但属于高风险稳定性问题。  
- 链接：[#3080](https://github.com/Hmbown/CodeWhale/issues/3080)

### 8. 深色主题下列表选中高亮过亮，导致文本不可读  
- 重要性：典型 TUI 可用性问题，直接影响 `/sessions`、`/config` 等核心界面。  
- 社区反应：**1 条评论**，说明体验问题已被注意到。  
- 链接：[#3074](https://github.com/Hmbown/CodeWhale/issues/3074)

### 9. 运行时 prompt 可能触发自主动作，带来安全/行为偏移风险  
- 重要性：这是安全与代理边界问题，涉及“模型是否会在未明确用户输入时自行行动”。  
- 社区反应：**1 条评论**，偏审慎型问题。  
- 链接：[#3061](https://github.com/Hmbown/CodeWhale/issues/3061)

### 10. 每个目录都会生成 `.codewhale`，是否必要  
- 重要性：涉及项目文件污染与轻量使用场景的产品策略。  
- 社区反应：**1 条评论**，代表用户对默认行为的疑问。  
- 链接：[#3058](https://github.com/Hmbown/CodeWhale/issues/3058)

---

## 4) 重要 PR 进展（10 条）

> 说明：本批 PR 以 **安全、性能、测试补强、代码清理** 为主，风格非常统一。

### 1. 修复 hooks 中的命令注入：改为直接执行
- 价值：这是最重要的安全修复之一，避免 `sh -c` / `cmd /C` 造成 shell 元字符注入。  
- 链接：[#3140](https://github.com/Hmbown/CodeWhale/pull/3140)

### 2. 并行化 skill 同步
- 价值：把原先串行同步改为并发执行，明显降低网络等待时间。  
- 链接：[#3139](https://github.com/Hmbown/CodeWhale/pull/3139)

### 3. 为 `ToolError::path_escape` 补测试
- 价值：增强工具错误构造器的覆盖率，减少回归。  
- 链接：[#3138](https://github.com/Hmbown/CodeWhale/pull/3138)

### 4. 为 `release_base_url_from_env` 增加测试
- 价值：环境变量驱动逻辑最容易产生测试缺口，这类补强对发布系统很关键。  
- 链接：[#3137](https://github.com/Hmbown/CodeWhale/pull/3137)

### 5. 为 `ToolError::invalid_input` 添加测试
- 价值：补齐工具层异常分支，提升错误消息与行为稳定性。  
- 链接：[#3136](https://github.com/Hmbown/CodeWhale/pull/3136)

### 6. 移除未使用的 `prompt_persist` 模块
- 价值：清理死代码，降低 TUI 入口复杂度。  
- 链接：[#3135](https://github.com/Hmbown/CodeWhale/pull/3135)

### 7. 为 `is_beta_tag` 添加单元测试
- 价值：发布通道判断逻辑是 release 流的基础，测试补齐很必要。  
- 链接：[#3134](https://github.com/Hmbown/CodeWhale/pull/3134)

### 8. 为 `ToolError::missing_field` 增加测试
- 价值：继续推进工具错误体系的覆盖率完善。  
- 链接：[#3133](https://github.com/Hmbown/CodeWhale/pull/3133)

### 9. 为 `ReleaseChannel::label` 补测试
- 价值：强化 release channel 输出一致性，减少版本标识混乱。  
- 链接：[#3132](https://github.com/Hmbown/CodeWhale/pull/3132)

### 10. 为 `resolve_release_query` 添加测试
- 价值：发布查询逻辑依赖环境状态，测试补齐可显著降低 CI/发布不确定性。  
- 链接：[#3131](https://github.com/Hmbown/CodeWhale/pull/3131)

---

## 5) 功能需求趋势

从今日更新的 Issues 看，社区最关注的方向可以概括为以下 5 类：

1. **子代理与工作流编排**
   - 包括 headless worker runtime、fanout、workflow authoring、任务聚合展示等。
   - 代表链接：[#3096](https://github.com/Hmbown/CodeWhale/issues/3096)、[#3097](https://github.com/Hmbown/CodeWhale/issues/3097)、[#3082](https://github.com/Hmbown/CodeWhale/issues/3082)

2. **模型 / Provider 正确性与可观测性**
   - 包括无效 model ID、Provider 能力面板、定价引擎、上下文预算服务等。
   - 代表链接：[#3094](https://github.com/Hmbown/CodeWhale/issues/3094)、[#3083](https://github.com/Hmbown/CodeWhale/issues/3083)、[#3085](https://github.com/Hmbown/CodeWhale/issues/3085)、[#3086](https://github.com/Hmbown/CodeWhale/issues/3086)

3. **TUI 交互体验与可读性**
   - 包括主题对比度、悬浮提示、鼠标输入、子代理卡片清理、Shell 命名统一等。
   - 代表链接：[#3074](https://github.com/Hmbown/CodeWhale/issues/3074)、[#3088](https://github.com/Hmbown/CodeWhale/issues/3088)、[#3078](https://github.com/Hmbown/CodeWhale/issues/3078)、[#3081](https://github.com/Hmbown/CodeWhale/issues/3081)

4. **文档与本地化**
   - README 重写、网站语言一致性、翻译矩阵、语言扩展非常活跃。
   - 代表链接：[#3090](https://github.com/Hmbown/CodeWhale/issues/3090)、[#3091](https://github.com/Hmbown/CodeWhale/issues/3091)、[#3092](https://github.com/Hmbown/CodeWhale/issues/3092)、[#3093](https://github.com/Hmbown/CodeWhale/issues/3093)

5. **稳定性、安全与发布治理**
   - 包括输入泄漏、命令注入、超时卡死、回压恢复、issue/PR 清理等。
   - 代表链接：[#3063](https://github.com/Hmbown/CodeWhale/issues/3063)、[#3080](https://github.com/Hmbown/CodeWhale/issues/3080)、[#3099](https://github.com/Hmbown/CodeWhale/issues/3099)、[#3089](https://github.com/Hmbown/CodeWhale/issues/3089)

---

## 6) 开发者关注点

今天的开发者反馈，主要集中在以下痛点：

- **“看起来在跑，实际已卡住”**：子代理等待、API 超时、任务句柄挂起等问题最容易造成误判。  
  链接：[#3095](https://github.com/Hmbown/CodeWhale/issues/3095)、[#3080](https://github.com/Hmbown/CodeWhale/issues/3080)

- **状态与权限边界不够清晰**：运行时 prompt、自主行为、澄清问题入口都在强化“Agent 何时能主动做事”的边界。  
  链接：[#3061](https://github.com/Hmbown/CodeWhale/issues/3061)、[#3102](https://github.com/Hmbown/CodeWhale/issues/3102)

- **Provider / 模型配置容易踩坑**：无效模型 ID、能力展示不足、定价和上下文预算缺少统一视图。  
  链接：[#3094](https://github.com/Hmbown/CodeWhale/issues/3094)、[#3083](https://github.com/Hmbown/CodeWhale/issues/3083)、[#3085](https://github.com/Hmbown/CodeWhale/issues/3085)

- **TUI 可读性仍有硬伤**：深色主题高亮过亮、悬浮信息丢失、鼠标输入泄漏，都会直接影响日常使用。  
  链接：[#3074](https://github.com/Hmbown/CodeWhale/issues/3074)、[#3088](https://github.com/Hmbown/CodeWhale/issues/3088)、[#3063](https://github.com/Hmbown/CodeWhale/issues/3063)

- **测试与维护性成为主线**：今天的 PR 明显偏向测试补齐、死代码清理、性能优化，说明团队正在为更快的版本迭代铺底。  
  链接：[#3131](https://github.com/Hmbown/CodeWhale/pull/3131)、[#3135](https://github.com/Hmbown/CodeWhale/pull/3135)、[#3139](https://github.com/Hmbown/CodeWhale/pull/3139)

---

如果你需要，我也可以把这份日报进一步整理成：
1. **适合发群的精简版**，或  
2. **适合内部周报的管理层版**。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*