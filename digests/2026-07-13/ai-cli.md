# AI CLI 工具社区动态日报 2026-07-13

> 生成时间: 2026-07-13 02:57 UTC | 覆盖工具: 9 个

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

以下为基于 2026-07-13 各 AI CLI 工具社区动态的横向对比分析。

---

## 1) 生态全景

当前 AI CLI 工具生态已从“功能发布期”进入“生产可用性打磨期”。社区关注点明显从新增能力转向 **稳定性、权限控制、模型路由、成本可控、外部工具集成** 等硬问题。  
其中，Claude Code、Codex、OpenCode 的问题反馈最密集，说明它们已进入重度使用阶段；Gemini CLI、Pi、Qwen Code 则更偏向基础能力迭代和兼容性修复。  
整体看，CLI 正在向“轻量前端 + 代理执行引擎 + 外部工具编排层”的方向演进，可靠性比单纯能力更重要。

---

## 2) 各工具活跃度对比

> 说明：以下为 **今日更新/摘要中披露的热点条目数**，用于横向对比活跃度。

| 工具 | 今日 Issues | 今日 PR | Release 情况 | 活跃度简评 |
|---|---:|---:|---|---|
| Claude Code | 19 | 0 | 无新 Release | Issues 高密度，需求/报障都很活跃 |
| OpenAI Codex | 10（热点） | 2 | 无新 Release | 问题集中爆发，且已有回滚动作 |
| Gemini CLI | 0 | 2 | 有 nightly：`v0.52.0-nightly.20260713.gf354eebaf` | Issue 安静，但发布/修复持续推进 |
| OpenCode | 10 | 10 | 无新 Release | 迭代最激进，Issue 与 PR 同步高活跃 |
| Pi | 3 | 1 | 无新 Release | 体量较小，但方向集中 |
| Qwen Code | 1 | 4 | 无新 Release | 低噪声、高聚焦，偏基础能力打磨 |
| GitHub Copilot CLI | 0 | 0 | 无活动 | 近乎静默 |
| Kimi Code CLI | 0 | 0 | 无活动 | 近乎静默 |
| DeepSeek TUI | 0 | 0 | 无活动 | 近乎静默 |

---

## 3) 共同关注的功能方向

### A. 稳定性、恢复能力、长会话可靠性
- **Claude Code**：长会话内存膨胀、Bun panic、/clear 不生效、hooks 回归
- **OpenAI Codex**：桌面端崩溃、断网重连、Browser Use 触发崩溃
- **OpenCode**：断连后 pending permission/question 丢失、服务重启后状态不可恢复
- **Pi / Qwen Code**：汇总请求配置透传、缓存与上下文管理的正确性

**共同诉求**：CLI 不再只是“能跑”，而是要能 **持续跑、断点恢复、长任务不中断**。

---

### B. 模型路由、按任务选模、成本可控
- **Claude Code**：套餐用户被强制升级模型、按任务选择模型、extended thinking 导致成本/时延飙升
- **Qwen Code**：auto 模式下第三方 API 兼容异常，影响模型切换
- **Pi**：强制工具调用、provider 语义对齐
- **Codex**：模型可见性与桌面/CLI 一致性问题

**共同诉求**：用户希望模型选择从“默认分配”走向 **任务级控制与成本透明**。

---

### C. 权限、Hooks、自动化链路的可信执行
- **Claude Code**：PreToolUse Hook 返回 allow 仍弹权限窗
- **OpenCode**：pending permission/question 重连恢复、Agent 越权修改文件
- **Codex**：PostToolUse hook、subagent 行为安全、PowerShell `$home` 风险
- **Gemini CLI**：权限/可用性提示更清晰
- **Pi**：重试语义与 provider header 对齐

**共同诉求**：自动化系统必须做到 **可预期、可解释、可审计**，否则用户不会把关键任务交给 CLI。

---

### D. 外部工具集成：MCP / 浏览器 / IDE / 插件
- **Claude Code**：MCP 并发、Chrome MCP、VS Code 终端
- **Codex**：Browser Use、Edge/Chrome 识别、Figma plugin
- **OpenCode**：MCP 文案标准化、subagents / monorepo 相关协作
- **Pi**：多 provider 适配本质上也是外部接口兼容

**共同诉求**：外部集成正在成为 CLI 的核心战场，但也是最脆弱的链路。

---

## 4) 差异化定位分析

### Claude Code
- **功能侧重**：模型选择、Hooks、MCP、终端主题、长会话稳定性
- **目标用户**：重度 agent 使用者、需要较强自动化控制的开发者
- **技术路线**：偏“高级交互 + 任务编排 + 权限系统”的综合型 CLI
- **特点**：需求密度高，说明使用深度较大，但也暴露出较多边界问题

### OpenAI Codex
- **功能侧重**：Desktop 稳定性、Windows/macOS 兼容、浏览器/插件/skills
- **目标用户**：跨平台桌面用户、浏览器协作用户
- **技术路线**：更像“桌面应用壳 + CLI/Agent 能力”的组合
- **特点**：问题集中在基础可用性和平台一致性，说明使用面广、环境复杂

### Gemini CLI
- **功能侧重**：nightly 迭代、权限提示、认证依赖稳定性
- **目标用户**：偏早期体验用户、关注官方生态联动的开发者
- **技术路线**：稳步发布，强调认证链路和可解释性
- **特点**：社区噪声较低，呈现出较强的“维护型迭代”特征

### OpenCode
- **功能侧重**：TUI 状态恢复、Agent 行为边界、monorepo 协作、settings/格式化能力
- **目标用户**：偏终端工作流的工程师、重视交互连续性的用户
- **技术路线**：典型 TUI-first、快速修复闭环
- **特点**：PR 与 Issue 同步极快，说明产品处于高频打磨阶段

### Pi
- **功能侧重**：多 provider 抽象层、工具调用语义、重试/汇总一致性
- **目标用户**：构建多模型统一接入层的开发者
- **技术路线**：中间层/适配层思路明显
- **特点**：更像“模型协议胶水层”，关注工程正确性而非前台交互

### Qwen Code
- **功能侧重**：review/triage 机器人、上下文压缩、multi-provider auto mode
- **目标用户**：团队协作、大仓代码审查、自动 triage 场景
- **技术路线**：围绕“代码审查与自动化工作流”优化
- **特点**：社区体量不大，但方向非常明确，偏工具链深度优化

### 低活跃工具：Copilot CLI / Kimi Code CLI / DeepSeek TUI
- 今日无活动，说明当前社区反馈弱、迭代信号不足，或处于更早期/更封闭的使用阶段。

---

## 5) 社区热度与成熟度

### 高活跃、高压测阶段
- **Claude Code**
  - 19 条 Issues，集中在模型、权限、MCP、终端体验
  - 说明已进入重度使用阶段，社区在逼近真实生产边界

- **OpenAI Codex**
  - 10 个热点 Issue + 2 个 PR 回滚
  - 崩溃、断连、Windows 问题突出，说明用户规模和使用复杂度都较高

- **OpenCode**
  - 10 个 Issue + 10 个 PR
  - 这是最典型的“快速迭代、快速修复”状态，社区响应非常积极

### 中等活跃、聚焦型迭代
- **Gemini CLI**
  - Issue 安静，但 nightly 和认证库升级持续推进
  - 更像“稳定发布型”项目
- **Pi**
  - 体量不大，但每个更新都直指 provider 兼容性核心
- **Qwen Code**
  - 低噪声但技术指向明确，偏审查/压缩/兼容性优化

### 低可见度
- **Copilot CLI / Kimi Code CLI / DeepSeek TUI**
  - 今日无活动，短期内缺少明确社区信号

---

## 6) 值得关注的趋势信号

### 1. CLI 正从“命令入口”变成“代理运行时”
开发者不再只要求执行命令，而是要求 CLI 能管理 **状态、权限、工具调用、重试、长会话**。  
**参考价值**：新工具如果只做命令封装，很难建立长期粘性。

### 2. 稳定性优先级明显高于新功能
崩溃、断连、状态错乱、误删目录、上下文膨胀等问题，在各家社区都被高频提及。  
**参考价值**：工程路线应优先补齐可恢复性、边界保护和错误诊断，而不是持续堆新能力。

### 3. 模型选择与成本控制将成为产品分水岭
从 Claude 的套餐/模型切换，到 Qwen 的 auto 兼容、Pi 的强制工具调用，用户都在追求更强控制力。  
**参考价值**：未来 CLI 的竞争点不仅是“能调用哪个模型”，而是 **能否按任务精准调度模型**。

### 4. 外部集成链路是核心竞争力，也是最大风险点
MCP、浏览器、IDE、插件、skills、subagents 几乎都在出问题。  
**参考价值**：谁能把集成层做稳、做可观测、做可恢复，谁就更接近生产级。

### 5. 可复现性和可诊断性正在成为高质量反馈门槛
带 `has repro`、平台信息、崩溃签名的 issue 更容易被快速定位。  
**参考价值**：工具要内建更好的日志、状态导出和错误解释，降低社区协作成本。

---

如果你需要，我还可以把这份报告进一步压缩成：
1. **一页纸管理层摘要版**，或  
2. **面向工程团队的行动建议版**。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下基于你提供的 **anthropics/skills** 数据（截至 2026-07-13）整理。  
说明：你给出的 PR 列表里评论数字段未展开，因此这里按 **列表热度 + 更新活跃度 + 议题影响面** 综合排序。

---

## 1) 热门 Skills 排行（PR 热度前 8）

### 1. [#1298 fix(skill-creator): run_eval.py always reports 0% recall](https://github.com/anthropics/skills/pull/1298)
- **功能**：修复 skill-creator 的评估链路，让 `run_eval.py`、`run_loop.py`、`improve_description.py` 的召回率统计恢复可信。
- **社区热点**：这是“工具链是否真的有效”的核心问题，直接影响所有 Skill 描述优化结果。
- **状态**：**open**

### 2. [#1323 fix: run_eval trigger detection misses real skill name](https://github.com/anthropics/skills/pull/1323)
- **功能**：修复触发检测逻辑，避免把真实触发的 Skill 漏判为未触发。
- **社区热点**：和 #1298 一样，属于评估系统失真问题；如果不修，优化循环会持续给出错误结论。
- **状态**：**open**

### 3. [#1261 fix(skill-creator): isolate trigger-eval command files from the live project registry](https://github.com/anthropics/skills/pull/1261)
- **功能**：避免评估时生成的命令文件污染用户真实项目目录，尤其是在并行 worker 场景下。
- **社区热点**：这是“评估不应影响生产环境”的典型诉求，且与并发安全直接相关。
- **状态**：**open**

### 4. [#1099 skill-creator: fix run_eval.py crash on Windows when reading from subprocess pipe](https://github.com/anthropics/skills/pull/1099)
- **功能**：修复 Windows 下 `run_eval.py` 从子进程管道读取时的崩溃问题。
- **社区热点**：Windows 兼容性是反复出现的高频痛点，影响技能优化和测试能否在本地跑通。
- **状态**：**open**

### 5. [#1050 skill-creator: fix Windows subprocess + encoding bugs](https://github.com/anthropics/skills/pull/1050)
- **功能**：修复 Windows 上 `subprocess` 调用、编码和路径相关问题。
- **社区热点**：和 #1099 一样属于平台兼容修复，说明社区对“跨平台可用”关注度很高。
- **状态**：**open**

### 6. [#514 Add document-typography skill](https://github.com/anthropics/skills/pull/514)
- **功能**：新增“文档排版质量控制”Skill，处理孤行、寡行、编号对齐等典型排版问题。
- **社区热点**：文档生成是 Claude Code 高频应用场景，用户对“看起来专业”的输出质量要求很强。
- **状态**：**open**

### 7. [#723 feat: add testing-patterns skill](https://github.com/anthropics/skills/pull/723)
- **功能**：新增测试模式 Skill，覆盖单元测试、React 测试、测试策略等。
- **社区热点**：测试生成/测试规范是开发类用户最常求的能力之一，实用性很强。
- **状态**：**open**

### 8. [#1367 feat(skills): add self-audit](https://github.com/anthropics/skills/pull/1367)
- **功能**：新增“自审查”Skill，主打机械校验 + 多维度推理质量门禁。
- **社区热点**：反映出社区对“输出前自检”“减少幻觉/漏项”的强需求。
- **状态**：**open**

---

## 2) 社区需求趋势

### A. 核心工具链稳定性：先让 Skills “可评估、可复现、可跨平台”
代表议题：
- [#556 run_eval.py: claude -p never triggers skills/commands](https://github.com/anthropics/skills/issues/556)
- [#1169 description-optimisation loop: recall=0% on every iteration](https://github.com/anthropics/skills/issues/1169)
- [#1061 Windows compatibility: skill-creator scripts fail](https://github.com/anthropics/skills/issues/1061)

**趋势判断**：社区当前最急的是把 skill-creator / eval / loop 这套“自动优化基础设施”修到可信。  
如果评估链路不稳定，后续所有技能优化都会失去意义。

### B. 安全与信任边界：社区技能不能“伪装成官方技能”
代表议题：
- [#492 Security: Community skills distributed under anthropic/ namespace enable trust boundary abuse](https://github.com/anthropics/skills/issues/492)
- [#1175 Concerns regarding Security and Context Window when handling SharePoint Online documents](https://github.com/anthropics/skills/issues/1175)
- [#412 Skill proposal: agent-governance](https://github.com/anthropics/skills/issues/412)

**趋势判断**：社区对权限、命名空间、审计、治理的敏感度在上升。  
尤其是“官方/社区”边界、权限继承、文档访问控制这类问题，已经从边缘议题变成主线需求。

### C. 分发与协作：Skills 需要“组织级共享”和“更少重复安装”
代表议题：
- [#228 Enable org-wide skill sharing in Claude.ai](https://github.com/anthropics/skills/issues/228)
- [#189 document-skills and example-skills plugins install identical content](https://github.com/anthropics/skills/issues/189)
- [#62 All my skills have disappeared and now i get errors](https://github.com/anthropics/skills/issues/62)

**趋势判断**：用户已经从“能不能做 Skill”转向“怎么在团队里分发、同步、复用 Skill”。  
这说明 Skills 正在进入团队协作阶段，而不仅是个人试验阶段。

### D. 高价值垂直能力：文档、测试、排版、颜色、Web 产物仍是高频方向
代表 PR/Issue：
- 文档排版：[#514](https://github.com/anthropics/skills/pull/514)
- 测试模式：[#723](https://github.com/anthropics/skills/pull/723)
- 颜色专家：[#1302 Add color-expert skill](https://github.com/anthropics/skills/pull/1302)
- Web artifacts：[#1362](https://github.com/anthropics/skills/issues/1362)
- ODT / PDF / DOCX 相关修复：[#486](https://github.com/anthropics/skills/pull/486)、[#541](https://github.com/anthropics/skills/pull/541)

**趋势判断**：社区最想要的不是“泛用大而全”，而是能立刻提升交付质量的专用 Skills。

### E. 质量门禁与自检：从“生成内容”走向“生成 + 验证”
代表议题：
- [#1367 self-audit](https://github.com/anthropics/skills/pull/1367)
- [#1385 Reasoning Quality Gate Pipeline](https://github.com/anthropics/skills/issues/1385)
- [#202 skill-creator should be updated to best practice](https://github.com/anthropics/skills/issues/202)

**趋势判断**：社区对“让模型自己检查自己”的需求非常强，尤其是在代码、文档和多步骤任务中。

---

## 3) 高潜力待合并 Skills

以下 PR 具备较高落地概率，原因是它们要么修复基础设施关键缺陷，要么对应高频场景：

- [#1298 run_eval 召回率修复](https://github.com/anthropics/skills/pull/1298)  
  **原因**：直接修复评估可信度，属于底座问题。

- [#1323 trigger detection 修复](https://github.com/anthropics/skills/pull/1323)  
  **原因**：与 #1298 同类，属于 eval 系统核心逻辑修补。

- [#1261 隔离评估命令文件](https://github.com/anthropics/skills/pull/1261)  
  **原因**：并发污染问题明显，且影响面大，工程上很容易被优先处理。

- [#1099 Windows 管道崩溃修复](https://github.com/anthropics/skills/pull/1099)  
  **原因**：明确 bug fix，用户痛感强，合并优先级通常较高。

- [#1050 Windows subprocess/encoding 修复](https://github.com/anthropics/skills/pull/1050)  
  **原因**：和 #1099 一起构成 Windows 兼容性修复包。

- [#361 Detect unquoted YAML special characters](https://github.com/anthropics/skills/pull/361)  
  **原因**：属于低成本高收益的输入校验修复，能减少静默解析错误。

- [#539 warn on unquoted description with YAML special characters](https://github.com/anthropics/skills/pull/539)  
  **原因**：与 #361 一致，都是 skill-creator 的健壮性补丁。

- [#723 testing-patterns skill](https://github.com/anthropics/skills/pull/723)  
  **原因**：测试类 Skills 一直是高需求方向，落地后复用价值高。

---

## 4) Skills 生态洞察

**一句话总结：当前社区最集中的诉求是——先把 Skills 变成“可信、可复现、可分享、可验证”的生产级能力，再扩展更多垂直场景。**

如果你愿意，我也可以进一步把这份报告整理成：
1. **“PR/Issue 热度排行榜表格版”**，或  
2. **“适合汇报 PPT 的 1 页摘要版”**。

---

以下为 **2026-07-13 Claude Code 社区动态日报**（基于 `github.com/anthropics/claude-code` 过去 24 小时数据）。

## 1) 今日速览
今天仓库 **没有新 Release**，但 Issues 更新活跃，共 19 条，且几乎都集中在 **模型选择/成本控制、权限与 Hooks、MCP/浏览器集成、终端与主题显示** 这些核心体验上。  
从反馈看，社区正在持续暴露 **Windows / macOS / VS Code / Linux** 的平台差异问题；同时也能看到不少“带复现、可定位”的高质量报障，说明用户侧已进入更深度的实际使用阶段。  
链接：`https://github.com/anthropics/claude-code`

---

## 2) 社区热点 Issues（10 个）
1. **#77039 - MCP 并发下工具响应串包（已关闭）**  
   链接：`https://github.com/anthropics/claude-code/issues/77039`  
   重要性：涉及并发子代理 + MCP 的数据错配，直接影响多 agent 协作可信度。  
   社区反应：带 `has repro`，且当天即关闭，说明问题质量高、响应较快；评论 1 条。

2. **#77037 - PreToolUse Hook 返回 allow 仍无法抑制 Bash 权限弹窗**  
   链接：`https://github.com/anthropics/claude-code/issues/77037`  
   重要性：这是权限自动化链路的回归问题，会破坏 hooks 的预期用途。  
   社区反应：`has repro`、`regression` 标记明确，属于高优先级可复现缺陷。

3. **#77034 - Windows 下 `/clear` 未重置会话上下文**  
   链接：`https://github.com/anthropics/claude-code/issues/77034`  
   重要性：基础会话管理异常，影响日常使用与上下文隔离。  
   社区反应：1 条评论，说明是典型“可感知但不复杂”的 UX bug。

4. **#77023 - 最大套餐用户仍被强制升级到 Opus 4.8**  
   链接：`https://github.com/anthropics/claude-code/issues/77023`  
   重要性：这是典型的 **模型选择/套餐控制** 诉求，直接关系到产品策略与用户成本。  
   社区反应：情绪强烈，反映出用户对“默认模型被替换”的敏感度很高。

5. **#77040 - 定时任务希望支持按任务选择模型**  
   链接：`https://github.com/anthropics/claude-code/issues/77040`  
   重要性：属于更细粒度的模型调度需求，适合将“机械任务”和“复杂任务”分流。  
   社区反应：当前为功能建议早期反馈，尚未形成讨论热度。

6. **#77041 - 自定义主题中 `userMessageBackground` 过于共享，建议拆分专用 token**  
   链接：`https://github.com/anthropics/claude-code/issues/77041`  
   重要性：反映出主题系统的可定制性不足，影响长对话中的视觉辨识度。  
   社区反应：需求明确、场景具体，是典型的 UI 细节优化诉求。

7. **#77032 - VS Code 终端默认被限制为 256 色，主题显示异常且无退出开关**  
   链接：`https://github.com/anthropics/claude-code/issues/77032`  
   重要性：IDE 集成体验问题，直接影响自定义主题和可读性。  
   社区反应：`has repro`，跨环境验证明确，属于较强的工程型反馈。

8. **#77035 - Chrome MCP 在 Windows 上阻塞所有域名导航**  
   链接：`https://github.com/anthropics/claude-code/issues/77035`  
   重要性：浏览器自动化链路受阻，会影响基于 MCP 的网页操作场景。  
   社区反应：属于典型平台兼容问题，当前评论少但业务影响面较大。

9. **#77033 - 简单编辑触发 extended thinking 跑到 max_tokens，导致单轮 12–16 分钟**  
   链接：`https://github.com/anthropics/claude-code/issues/77033`  
   重要性：这是成本 + 性能双重问题，影响响应速度和 token 消耗。  
   社区反应：反馈指向非常具体的“慢且贵”体验，属于高关注性能退化类问题。

10. **#77024 - 长会话累计状态约 2GB 后 Bun panic，导致会话崩溃**  
    链接：`https://github.com/anthropics/claude-code/issues/77024`  
    重要性：长时间运行场景的稳定性问题，影响重度用户与常驻 agent 工作流。  
    社区反应：`has repro`，且有版本与环境信息，属于很有价值的稳定性报障。

---

## 3) 重要 PR 进展
**过去 24 小时没有 PR 更新。**  
链接：`https://github.com/anthropics/claude-code/pulls`

---

## 4) 功能需求趋势
1. **模型选择更精细、成本控制更透明**  
   代表：`#77023`、`#77040`、`#77033`  
   链接：`https://github.com/anthropics/claude-code/issues/77023`  
   链接：`https://github.com/anthropics/claude-code/issues/77040`  
   链接：`https://github.com/anthropics/claude-code/issues/77033`  

2. **终端 UI / 主题定制需求升温**  
   代表：`#77032`、`#77041`  
   链接：`https://github.com/anthropics/claude-code/issues/77032`  
   链接：`https://github.com/anthropics/claude-code/issues/77041`  

3. **权限、Hooks、自动化执行链路需要更可靠**  
   代表：`#77037`、`#77030`、`#77039`  
   链接：`https://github.com/anthropics/claude-code/issues/77037`  
   链接：`https://github.com/anthropics/claude-code/issues/77030`  
   链接：`https://github.com/anthropics/claude-code/issues/77039`  

4. **MCP / 浏览器 / IDE 集成继续成为核心战场**  
   代表：`#77039`、`#77035`、`#77031`  
   链接：`https://github.com/anthropics/claude-code/issues/77039`  
   链接：`https://github.com/anthropics/claude-code/issues/77035`  
   链接：`https://github.com/anthropics/claude-code/issues/77031`  

5. **长会话稳定性与内存/结构化输出问题仍需重点处理**  
   代表：`#77024`、`#77026`  
   链接：`https://github.com/anthropics/claude-code/issues/77024`  
   链接：`https://github.com/anthropics/claude-code/issues/77026`  

---

## 5) 开发者关注点
- **可复现性正在成为高质量反馈的分水岭**：`has repro`、版本号、平台信息齐全的 issue 更容易被快速定位。  
  链接：`https://github.com/anthropics/claude-code/issues/77039`

- **权限与自动化分类器的误判，正在明显影响信任感**：安全命令被拦、危险命令漏拦，都会直接削弱自动模式价值。  
  链接：`https://github.com/anthropics/claude-code/issues/77030`  
  链接：`https://github.com/anthropics/claude-code/issues/77037`

- **模型切换与套餐策略是高敏感区**：用户对“被动升级模型”“按任务选模型”非常在意。  
  链接：`https://github.com/anthropics/claude-code/issues/77023`  
  链接：`https://github.com/anthropics/claude-code/issues/77040`

- **长会话、结构化输出、并发场景的稳定性仍是硬指标**：一旦进入重度使用，内存、串包、token runaway 会迅速放大。  
  链接：`https://github.com/anthropics/claude-code/issues/77024`  
  链接：`https://github.com/anthropics/claude-code/issues/77026`  
  链接：`https://github.com/anthropics/claude-code/issues/77033`

如果你愿意，我也可以把这份日报进一步整理成 **“管理层摘要版”** 或 **“工程团队跟踪版”**。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-07-13）

## 1) 今日速览
今天 Codex 社区动态以 **问题反馈集中爆发** 为主，且几乎全部围绕 **桌面端稳定性、Windows 兼容性、CLI 额度/鉴权、技能系统与浏览器集成** 展开。  
从 Issue 结构看，用户当前最关心的不是新增能力，而是 **“能不能稳定用、能不能正确识别环境、能不能不中断工作流”**。  
PR 方面，社区/维护侧的核心动作是对 **自动审查提示（auto review prompting）** 做回滚，说明团队正在快速修正一项可能影响生成质量或审查体验的变更。  

---

## 2) 社区热点 Issues

> 说明：以下按“影响面 + 严重性 + 社区关注度”综合筛选 10 条。

### 1. [#32676 Codex Desktop repeatedly crashes on macOS](https://github.com/openai/codex/issues/32676)
- **重要性**：高频崩溃且是 macOS 主流桌面端，直接影响核心可用性。
- **问题特征**：`CrBrowserMain`、`EXC_BREAKPOINT/SIGTRAP`、V8 code cache 路径，指向底层运行时/缓存路径异常。
- **社区反应**：已有明确崩溃签名，通常意味着复现度较高，值得优先排查。

### 2. [#32670 Codex frequently requires restoring the network connection after almost every prompt](https://github.com/openai/codex/issues/32670)
- **重要性**：极具破坏性的连接稳定性问题，几乎每条 prompt 都中断工作。
- **问题特征**：桌面端频繁丢失网络连接，影响连续对话和长任务执行。
- **社区反应**：已有 2 条评论、1 个 👍，说明不是个例，且已有用户在跟进复现。

### 3. [#32683 [Windows] Codex App crashes in CrBrowserMain when Browser Use opens a page](https://github.com/openai/codex/issues/32683)
- **重要性**：Windows 下浏览器能力触发崩溃，直接影响“Browser Use”这类关键能力。
- **问题特征**：`0xC0000005` / `chrome.dll`，属于典型访问冲突级别崩溃。
- **社区反应**：尽管当前仅 1 条评论，但问题描述非常具体，属于高优先级修复候选。

### 4. [#32680 /status shows 83% of weekly limit left, but every prompt is blocked](https://github.com/openai/codex/issues/32680)
- **重要性**：这是 **计费/配额状态与实际阻断不一致** 的问题，会直接让 Plus 用户无法使用。
- **问题特征**：`/status` 显示还有额度，但每个 prompt 都被判定超限。
- **社区反应**：已有 1 条评论，说明这是典型的“状态不同步”故障，影响面很大。

### 5. [#32679 Valid repo skills are partially omitted from fresh session catalogs](https://github.com/openai/codex/issues/32679)
- **重要性**：技能系统是 Codex CLI 的核心扩展机制，目录缺失会让模型“看不见”可用能力。
- **问题特征**：fresh session 中技能清单不完整，甚至显式调用的 skill 也会被判定不可用。
- **社区反应**：1 条评论，且问题复现后影响明显，说明这是会直接阻断自动化流程的功能缺陷。

### 6. [#32671 macOS: Microsoft Edge extension is usable, but Codex App reports Google Chrome as not connected](https://github.com/openai/codex/issues/32671)
- **重要性**：浏览器绑定/检测逻辑出错，影响多浏览器环境下的实际使用。
- **问题特征**：Edge 扩展可用，但应用层错误显示 Chrome 未连接，说明浏览器识别/状态同步有偏差。
- **社区反应**：1 条评论，属于“环境兼容性”类高频痛点。

### 7. [#32681 can't find got 5.6 in my chatgpt desktop](https://github.com/openai/codex/issues/32681)
- **重要性**：模型可见性问题，直接影响用户对新模型能力的使用预期。
- **问题特征**：GPT-5.6 在 Chat mode 可见、CLI 可用，但桌面端模型选择器不显示。
- **社区反应**：2 条评论，说明是明确的产品一致性问题，容易引发“为什么桌面端没有新模型”的困惑。

### 8. [#32684 Windows PowerShell `$home` collision let a read-only subagent recursively delete `%USERPROFILE%`](https://github.com/openai/codex/issues/32684)
- **重要性**：这是今天最值得警惕的安全/破坏性问题之一，涉及 **误删用户目录**。
- **问题特征**：PowerShell 变量 `$home` 冲突导致只读 subagent 递归删除用户目录，属于高风险边界错误。
- **社区反应**：当前 0 评论，但严重性极高，通常应立即进入安全优先级处理。

### 9. [#32675 Windows desktop app: codex app-server crashes with 0xC000001D](https://github.com/openai/codex/issues/32675)
- **重要性**：桌面端 app-server 直接崩溃，意味着应用框架层不稳定。
- **问题特征**：`0xC000001D` 非法指令错误，且启动即崩，影响 Windows 用户主流程。
- **社区反应**：0 评论但描述清晰，属于基础设施层问题。

### 10. [#32667 figma plugin PostToolUse hook causes Broken pipe on every Write/Edit](https://github.com/openai/codex/issues/32667)
- **重要性**：钩子系统影响每次写文件/编辑文件的基本操作，破坏自动化工作流。
- **问题特征**：curated figma plugin 触发 `PostToolUse hook` broken pipe。
- **社区反应**：虽暂无评论，但这类问题通常会在插件启用用户群里迅速放大。

---

## 3) 重要 PR 进展

> 说明：过去 24 小时内仅观察到 2 条 PR 更新，因此以下为全部可见的重要 PR。

### 1. [#32672 Revert "Update auto review prompting"](https://github.com/openai/codex/pull/32672)
- **内容**：在 `release/0.144` 分支中完整回滚“自动审查提示”相关改动。
- **意义**：说明该变更可能影响 Guardian policy、review request 布局或工具规范，需要先恢复稳定版本。
- **开发信号**：维护侧倾向于以回滚保障发布稳定性，而不是继续在有风险变更上硬推进。

### 2. [#32668 Revert "Update auto review prompting"](https://github.com/openai/codex/pull/32668)
- **内容**：对 `openai/codex#31480` 的回滚提交，已关闭。
- **意义**：和上面 #32672 形成前后呼应，说明该功能链路经历了快速纠偏。
- **开发信号**：自动审查提示的策略/模板/测试很可能在近期做过调整，且需要更谨慎的回归验证。

---

## 4) 功能需求趋势

从今天的 Issues 可以明显看出，社区关注点主要集中在以下方向：

1. **桌面端稳定性与崩溃修复**
   - macOS/Windows 均有大量崩溃和异常退出报告。
   - 说明桌面壳层、Chromium 运行时、app-server 是当前高风险区域。

2. **网络与会话连续性**
   - “几乎每条 prompt 都要恢复网络连接”这类反馈，反映出用户对长会话稳定性的敏感度很高。

3. **Windows 兼容性与系统集成**
   - 包括 tray 可见性、浏览器识别、PowerShell 环境冲突、启动异常等。
   - Windows 相关问题数量明显偏多，且影响层次从 UI 到安全边界都有。

4. **CLI 额度/鉴权状态准确性**
   - `/status` 和实际阻断不一致，是典型的状态同步问题。
   - 用户不接受“看起来有额度但不能用”的体验。

5. **技能系统可发现性与完整性**
   - skills catalog 缺失、hook 异常、plugin composer 图标异常，说明扩展机制的稳定性和可见性仍需加强。

6. **模型可见性与版本一致性**
   - 新模型在 Chat / CLI / Desktop 之间暴露不一致，说明多端模型编排和发布节奏需要统一。

7. **浏览器/插件/子代理协同能力**
   - Browser Use、Edge 扩展、Figma plugin、subagent 相关问题集中出现，说明“外部工具链”是 Codex 体验的关键部分。

---

## 5) 开发者关注点

结合今天的反馈，开发者最需要关注的痛点可以归纳为：

- **优先保证“能用”而不是“功能更强”**：崩溃、断网、状态错乱的优先级明显高于新功能。
- **跨平台一致性不足**：macOS、Windows、CLI、Desktop 的行为不一致问题较突出。
- **状态同步问题频发**：配额、模型可见性、浏览器连接状态、会话迁移等都存在“前端显示与后端真实状态不一致”的风险。
- **扩展/插件/Hook 机制脆弱**：skills、hooks、browser use、figma plugin 等链路容易被一个点的异常拖垮。
- **安全边界需要更严格**：`$home` 冲突导致误删用户目录属于必须立即重视的高风险问题。
- **回滚机制正在发挥作用**：自动审查提示相关 PR 快速回滚，体现出维护团队对质量风险的响应速度较快。

---

如果你愿意，我可以把这份日报进一步整理成：
1. **适合发群里的精简版**，或  
2. **适合内部周报的分析版**。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

以下为 **2026-07-13 Gemini CLI 社区动态日报**（基于 `google-gemini/gemini-cli` 过去 24 小时 GitHub 数据）：

---

## 1. 今日速览
今天社区动态以 **夜间版发布** 和 **基础依赖/权限体验修复** 为主：Gemini CLI 发布了新的 nightly 版本，核心更新集中在隐私提示优化，提升了账号无 Code Assist 权限时的可理解性。  
同时，社区提交了一个较重要的依赖升级 PR，指向 Google Auth 相关问题修复，说明近期重点仍在 **认证链路稳定性** 和 **用户可用性**。

---

## 2. 版本发布
### 新版本：`v0.52.0-nightly.20260713.gf354eebaf`
- 发布链接：<https://github.com/google-gemini/gemini-cli/releases/tag/v0.52.0-nightly.20260713.gf354eebaf>
- 主要变更：
  - `fix(privacy)`：当账号没有 Code Assist tier 时，展示更明确的提示信息
  - 相关 PR：<https://github.com/google-gemini/gemini-cli/pull/28304>

**解读：**
- 这是一个偏“体验修复”的 nightly 发布，说明项目正在持续打磨账号权限与提示链路。
- 对开发者而言，这类修复能减少“功能不可用但原因不明”的排障成本。

---

## 3. 社区热点 Issues
**过去 24 小时内无 Issues 更新。**

- Issues 列表：<https://github.com/google-gemini/gemini-cli/issues>

**说明：**
- 今日没有可统计的新增/更新 Issue，因此无法选出 10 个热点条目。
- 从数据上看，当前社区讨论重心更偏向 **PR 合并与 nightly 迭代**，而非公开 Issue 争议或集中反馈。

---

## 4. 重要 PR 进展
> 过去 24 小时内更新的 PR 共 2 个，均值得关注。

### 1) #28385 `feat(core): Bump node google-auth-library version to 10.9.0`
- 状态：OPEN
- 作者：`jerrylin3321`
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28385>
- 重点：
  - 升级 `google-auth-library` 到 `10.9.0`
  - 目标是修复上游已确认的 bug
  - 关联到 Google Cloud / gaxios 的已修复问题

**为什么重要：**
- 认证库升级通常直接影响登录、token 刷新、API 调用稳定性。
- 属于“基础设施级”改动，影响面大，优先级通常高于普通功能。

---

### 2) #28384 `chore/release: bump version to 0.52.0-nightly.20260713.gf354eebaf`
- 状态：OPEN
- 作者：`gemini-cli-robot`
- 链接：<https://github.com/google-gemini/gemini-cli/pull/28384>
- 重点：
  - 自动化 nightly 版本号更新
  - 属于发布流程的一部分

**为什么重要：**
- 说明项目发布链路持续自动化，夜间构建节奏稳定。
- 对追踪版本演进、回滚与问题定位非常关键。

---

## 5. 功能需求趋势
> 由于今天 **没有 Issues 更新**，以下趋势主要依据最新 release 和 PR 体现的方向做归纳。

### 当前较明显的需求方向
1. **账号权限与可用性提示优化**
   - 代表动作：当账号无 Code Assist tier 时显示清晰提示
   - 说明用户对“为什么不可用”非常敏感，项目正在强化可解释性

2. **认证与依赖稳定性**
   - 代表动作：升级 `google-auth-library`
   - 说明社区对 CLI 的登录、授权、请求成功率有较高关注

3. **发布节奏与自动化**
   - 代表动作：nightly 版本自动 bump
   - 说明项目继续依赖高频迭代来快速吸收修复

**总体判断：**
- 当前趋势不是新能力爆发，而是围绕 **“稳定可用 + 提示清晰 + 认证链路可靠”** 做持续强化。

---

## 6. 开发者关注点
从今天的 PR 和发布信息看，开发者/维护者最需要关注的痛点主要有：

- **权限提示不清晰**
  - 用户没有 Code Assist tier 时，过去可能难以快速理解问题原因
  - 现在朝“明确告知、减少误判”方向改进

- **认证依赖的兼容性风险**
  - `google-auth-library` 升级意味着对上游 bugfix 的跟进
  - 需重点验证登录、刷新、请求签名等链路

- **夜间版质量控制**
  - nightly 更新频繁，建议关注是否引入回归
  - 对 CI、回归测试、发布验证要求较高

---

如果你需要，我也可以把这份日报进一步整理成：
1. **适合微信群/飞书推送的短版**，或  
2. **适合内部周报/晨会的更正式版本**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-07-13）

## 1) 今日速览
今天社区讨论高度集中在 **TUI 状态一致性/重连恢复**、**Agent 行为可靠性** 和 **错误提示可操作性** 三条主线上：多条 Issue 指向挂起表单、权限询问在重启/断连后“卡死”或丢失，且已有对应修复 PR 快速跟进。与此同时，Windows 安装性能、非 home 目录启动失败、证书/网络错误提示不清晰等问题也在持续冒头，说明社区当前最关注的是“能否稳定跑起来、能否不中断地用下去”。  
相关链接：  
- Issues 总览：<https://github.com/anomalyco/opencode/issues>  
- PR 总览：<https://github.com/anomalyco/opencode/pulls>

---

## 2) 版本发布
- **PR #36567 `pr-36567-inline-evidence`**：过去 24 小时出现的最新“发布/验证”动态，重点是 **将 prompt mapping 内联后重新做 OpenCode Drive 验证**，更偏向于链路校验与回归确认。  
  链接：<https://github.com/anomalyco/opencode/pull/36567>

---

## 3) 社区热点 Issues（10 个）
> 说明：本日新增/更新的 Issues 大多只有 0–3 条评论、点赞为 0，整体呈现“快速报障、快速分流”的早期反馈特征。

1. **#36597 无法修改项目名**  
   Desktop 新视图里项目标题不可编辑，属于基础 UI 能力问题，直接影响项目组织与可维护性；目前已有 3 条评论，是今日讨论最集中的 Issue 之一。  
   链接：<https://github.com/anomalyco/opencode/issues/36597>

2. **#36604 TUI 断开后重连会丢失 pending permission/question，导致会话卡死**  
   这是典型的状态恢复问题：服务端还在等答复，但前端看不到提示，用户无法继续操作；已有 2 条评论，并且已被 PR #36603 快速响应。  
   链接：<https://github.com/anomalyco/opencode/issues/36604>

3. **#36585 managed service 重启后，挂起表单变成不可回答**  
   影响面很大，说明表单状态只存在于进程内存中，服务重启后就失去权威来源；这类问题会直接阻断交互流程。  
   链接：<https://github.com/anomalyco/opencode/issues/36585>

4. **#36601 非 home 目录启动新会话时报服务器错误**  
   `opencode run` 在 `~` 之外执行失败，属于环境相关的稳定性问题；对真实开发工作流影响明显，因为很多项目并不在用户 home 下。  
   链接：<https://github.com/anomalyco/opencode/issues/36601>

5. **#36600 Agent 忽略指令范围，修改了不该动的文件**  
   这是社区对 Agent“边界感”的直接投诉：修改范围失控、重复犯错、计划模式也未能阻止误改，属于高优先级行为控制问题。  
   链接：<https://github.com/anomalyco/opencode/issues/36600>

6. **#36590 网络/代理失败时，`unknown certificate verification error` 不够可操作**  
   错误信息过于原始，用户难以判断是 VPN、代理还是供应商故障；这类问题会放大“看起来像是产品坏了”的感知。  
   链接：<https://github.com/anomalyco/opencode/issues/36590>

7. **#36605 V2 monorepo 下支持跨位置 subagents**  
   反映出 monorepo 场景下的组织能力需求：开发者希望子代理能跨目录、跨服务协作，适配真实的大仓工作流。  
   链接：<https://github.com/anomalyco/opencode/issues/36605>

8. **#36602 Weekly Token 两周后未自动刷新**  
   属于认证/配额生命周期问题，虽然评论数为 0，但会直接影响持续使用，容易演变为“产品不可用”的感知。  
   链接：<https://github.com/anomalyco/opencode/issues/36602>

9. **#36599 发送后没有反应**  
   用户反馈“思考 1 秒后就没动静”，属于最典型的“无反馈”类故障，往往比显式报错更难排查。  
   链接：<https://github.com/anomalyco/opencode/issues/36599>

10. **#36587 Windows 上安装 `@opencode-ai/plugin` 过慢，依赖链过重**  
    重点落在安装时长 >120s，问题来自 `effect -> msgpackr` 等重依赖链；虽然暂无评论，但对 Windows 用户体验影响直接。  
    链接：<https://github.com/anomalyco/opencode/issues/36587>

---

## 4) 重要 PR 进展（10 个）

1. **#36606 `feat(tui): add settings dialog`**  
   新增响应式 `/settings` 对话框，支持即时配置更新，并针对宽/窄终端做了不同布局适配，是明显的 TUI 体验升级。  
   链接：<https://github.com/anomalyco/opencode/pull/36606>

2. **#36603 `fix(tui): rehydrate pending permissions & questions on reconnect`**  
   直击 #36604：重连时重新恢复 pending permission/question，避免断连后提示丢失导致会话卡死。  
   链接：<https://github.com/anomalyco/opencode/pull/36603>

3. **#36595 `fix(cli): make agent create non-interactive check explicitly boolean`**  
   修复 `opencode agent create` 在判断是否跳过交互时的布尔逻辑，降低 CLI 非交互模式下的误判风险。  
   链接：<https://github.com/anomalyco/opencode/pull/36595>

4. **#36594 `chore: update TypeScript native preview`**  
   升级 TS native preview 到 2026 年 7 月版本，带来约 10% 的 monorepo typecheck 加速和更低峰值内存。  
   链接：<https://github.com/anomalyco/opencode/pull/36594>

5. **#36593 `Expand supported file extensions in formatter`**  
   扩展 `oxfmt` 支持的文件后缀，提升格式化器覆盖面，属于面向更多文件类型的能力补齐。  
   链接：<https://github.com/anomalyco/opencode/pull/36593>

6. **#36591 `fix(tui): dismiss stale forms after failed reply`**  
   当表单提交失败返回 `FormNotFoundError` 时自动清理 stale form，避免用户被“挂着但答不了”的旧表单困住。  
   链接：<https://github.com/anomalyco/opencode/pull/36591>

7. **#36589 `fix(core): bound compaction request size`**  
   给 compaction 请求体加上大小边界，修复“大上下文但序列化请求超 10 MiB”导致的长期卡死问题。  
   链接：<https://github.com/anomalyco/opencode/pull/36589>

8. **#36588 `fix(tui): always dismiss stale forms`**  
   让 Escape 成为本地强制退出 stale form 的动作，即使后台服务已经重启或找不到表单也能脱离卡死状态。  
   链接：<https://github.com/anomalyco/opencode/pull/36588>

9. **#36584 `fix(codemode): align array parity`**  
   修复 codemode 中数组索引/稀疏数组/`findLast` 等语义一致性问题，并带有较完整测试覆盖。  
   链接：<https://github.com/anomalyco/opencode/pull/36584>

10. **#36598 `fix: standardize MCP server copy`**  
    统一 MCP 相关用户可见文案：区分 `MCP servers` 与 `MCP tools`，减少概念混用，已关闭。  
    链接：<https://github.com/anomalyco/opencode/pull/36598>

---

## 5) 功能需求趋势
从今日 Issues 看，社区关注点正在向以下方向集中：

- **TUI/会话状态恢复能力**：断连重连、服务重启、挂起表单/权限请求恢复是最高频主题。  
  代表 Issue：#36604、#36585、#36599  
  链接：<https://github.com/anomalyco/opencode/issues/36604>

- **Agent 行为边界与指令遵循**：用户希望 Agent 严格限定修改范围，不要“越权改文件”或重复犯错。  
  代表 Issue：#36600  
  链接：<https://github.com/anomalyco/opencode/issues/36600>

- **更清晰的网络/代理/证书诊断**：错误信息需要从“原始报错”升级为“可执行建议”。  
  代表 Issue：#36590  
  链接：<https://github.com/anomalyco/opencode/issues/36590>

- **Monorepo / 多子代理协同**：对 V2 monorepo 结构下的跨目录 subagents 有明确需求。  
  代表 Issue：#36605  
  链接：<https://github.com/anomalyco/opencode/issues/36605>

- **账号/配额生命周期管理**：weekly token 刷新、会话持续可用性是持续性使用的关键。  
  代表 Issue：#36602  
  链接：<https://github.com/anomalyco/opencode/issues/36602>

- **安装与启动性能**：Windows 安装耗时、非 home 目录启动错误说明“首启/日常启动”体验仍是焦点。  
  代表 Issue：#36587、#36601  
  链接：<https://github.com/anomalyco/opencode/issues/36587>

---

## 6) 开发者关注点
今天开发者反馈里，最值得留意的痛点主要有：

- **状态不能只放内存**：pending form、permission、question 这类交互状态需要可恢复、可重建。  
  链接：<https://github.com/anomalyco/opencode/issues/36585>

- **重启/断连必须“可继续工作”**：重连后不能让用户面对“看得见但答不了”的界面。  
  链接：<https://github.com/anomalyco/opencode/issues/36604>

- **Agent 必须遵守作用域**：误改未请求文件是社区最敏感的行为问题之一。  
  链接：<https://github.com/anomalyco/opencode/issues/36600>

- **错误提示要可操作**：网络、代理、证书、供应商不可达等问题需要给出明确排查路径。  
  链接：<https://github.com/anomalyco/opencode/issues/36590>

- **大会话要防“序列化体积爆炸”**：不仅看 token，还要看请求体大小。  
  链接：<https://github.com/anomalyco/opencode/pull/36589>

- **安装链路要轻量化**：Windows 用户对依赖体积和安装时长很敏感。  
  链接：<https://github.com/anomalyco/opencode/issues/36587>

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发 Slack/飞书 的超短版**，或  
2. **适合周报/晨会的更正式版**。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-07-13）

> 数据范围：`github.com/badlogic/pi-mono`  
> 说明：过去 24 小时内仅有 **3 条 Issue 更新** 和 **1 个 PR 更新**，因此以下内容已覆盖全部可见重点。

## 1) 今日速览

今天社区讨论主要集中在 **跨模型/跨代理兼容性** 与 **工具调用行为一致性** 上：一条是 OpenAI-completions 在 Grok 后端上因工具 schema 兼容问题导致崩溃，另一条是 Anthropic 的 `x-should-retry` 重试语义需要被正确尊重。  
此外，社区还在推动 **强制工具调用** 和 **汇总/压缩请求透传 provider options**，说明 Pi 的多 provider 适配正在从“能用”走向“行为一致、策略可控”。

---

## 2) 社区热点 Issues

> 今日只有 3 条更新 Issue，以下为全部值得关注条目。

### 1. [#6587] openai-completions: missing tool schema `required` crashes Grok backends
- 链接：<https://github.com/badlogic/pi-mono/issues/6587>
- 状态：已关闭（CLOSED）
- 为什么重要：这是一个**明确的兼容性 bug**，影响 OpenAI-completions + Grok(grok2api) 组合；当扩展加载 tools 时，schema 中缺少 `required` 字段会直接触发 400 错误，属于会阻断运行的高优先级问题。
- 社区反应：有 1 条评论，说明问题已被快速确认并修复/关闭；但 👍 为 0，反映出这类底层兼容 bug 的讨论通常更偏“问题驱动”而非“需求驱动”。

### 2. [#6586] Honor Anthropic x-should-retry in agent retries
- 链接：<https://github.com/badlogic/pi-mono/issues/6586>
- 状态：已关闭（CLOSED）
- 为什么重要：这是**重试策略对接 provider 语义**的问题。Anthropic 的 `x-should-retry` 头部如果不被尊重，Pi 可能会与上游代理/网关的重试逻辑冲突，导致重复重试、请求放大或错误处理不一致。
- 社区反应：1 条评论，需求描述清晰，属于典型的“基础设施级”改进；👍 为 0，说明关注点偏工程正确性而非功能热度。

### 3. [#6585] ai: Allow forced tool calls on openai and openai-codex
- 链接：<https://github.com/badlogic/pi-mono/issues/6585>
- 状态：开放（OPEN）
- 为什么重要：这是**工具调用控制能力**的增强诉求。开发者希望在 OpenAI / OpenAI-Codex 上强制触发 tool call，以保证关键流程一定走工具，而不是让模型自由选择，这对自动化 agent、工作流编排很重要。
- 社区反应：目前无评论、无点赞，说明这是一个较新的需求点，但它直接反映了用户对“可控性”和“确定性”的诉求。

---

## 3) 重要 PR 进展

> 今日仅 1 个 PR 更新，以下为全部可见 PR。

### 1. [#6584] fix: forward provider options to summary requests
- 链接：<https://github.com/badlogic/pi-mono/pull/6584>
- 状态：开放（OPEN）
- 主要内容：修复总结/压缩请求未透传 provider options 的问题。实现上通过 `SimpleStreamOptions` 继承当前会话中的关键配置，让 summary 请求也能带上当前 session 的 provider 参数。
- 为什么重要：这类改动直接影响 **compaction / summarization** 路径的稳定性和行为一致性，属于“基础链路修复”，对 coding-agent 和新 harness 都有帮助。
- 社区反应：目前暂无可见评论数据，但该 PR 指向一个很典型的工程问题：**主对话与汇总请求配置不一致**。

---

## 4) 功能需求趋势

从今日更新的 Issues 看，社区最关注的功能方向主要有：

1. **多 Provider 兼容性修正**
   - Grok、Anthropic、OpenAI/Codex 等后端之间的 schema、重试、tool calling 语义差异，正在成为核心维护面。
   - 说明 Pi 已经进入“多模型统一层”的深水区，兼容性比单点功能更关键。

2. **工具调用可控性**
   - 社区希望支持强制 tool call，避免模型自行判断导致流程漂移。
   - 这对 agent 场景尤其重要：自动化任务需要“确定执行”，而不是“尽力而为”。

3. **请求策略与上游语义对齐**
   - `x-should-retry` 这类 header 的支持表明，用户希望 Pi 能更精准地尊重 provider / proxy 的意图，减少重复重试和冲突行为。

4. **汇总/压缩链路的一致性**
   - PR #6584 反映出 summary requests 也需要完整继承会话配置，否则在复杂工作流里会出现“主请求正常、汇总请求失真”的问题。

---

## 5) 开发者关注点

今日社区反馈暴露出的高频痛点主要是：

- **schema 兼容问题**：工具 schema 字段缺失会直接导致部分后端崩溃，说明 Pi 在工具定义输出上需要更强的后端适配层。
- **重试逻辑不透明**：开发者希望框架能尊重 provider 的重试建议，避免与代理层策略打架。
- **工具调用确定性不足**：用户需要“强制调用工具”的控制开关，用于构建更可靠的 agent 流程。
- **总结/压缩请求配置丢失**：compaction 路径容易成为隐性 bug 来源，配置透传是稳定性关键。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合群公告的精简版**，或  
2. **适合团队周报/晨会的要点版**。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-07-13）
数据来源：`github.com/QwenLM/qwen-code`

## 1) 今日速览
今天社区动态以 **核心兼容性修复诉求** 和 **开发工具链增强** 为主。Issue 侧唯一新增关注点集中在 `auto` 模式对第三方 API 的兼容问题，涉及 `tool-choice` 缺失、`thinking` 标签透传和模型切换分类异常。PR 侧则明显聚焦于 **review/triage 机器人质量提升**、**上下文压缩** 和 **缓存正确性** 这些基础能力。

---

## 2) 版本发布
**今日无新 Release。**

---

## 3) 社区热点 Issues
> 说明：过去 24 小时内仅更新 1 条 Issue，因此以下为当日全部热点。

1. **#6791 auto 模式对三方 API 兼容异常**  
   链接：<https://github.com/QwenLM/qwen-code/issues/6791>  
   重要性：这是一个直接影响 **model switching / auto 权限模式** 的核心兼容问题，涉及 newapi 二次封装的 DeepSeek、MiniMax 官方模型等第三方提供方。问题描述显示，分类器在不同供应商协议差异下会出现 `thinking` 标签误传、`tool-choice` 缺失导致纯文本无法解析等故障，影响自动路由和模型调用稳定性。  
   社区反应：当前为 **OPEN**，标签为 `status/need-information`，说明维护者还在收集复现和环境细节；已有 3 条评论，说明该问题已引起一定关注，但尚未形成明确修复方案。

---

## 4) 重要 PR 进展
> 说明：过去 24 小时内仅更新 4 条 PR，以下为全部重要 PR。

1. **#6790 fix(review): stop dropping live blockers, and probe whether new tests actually gate new code**  
   链接：<https://github.com/QwenLM/qwen-code/pull/6790>  
   重点：修复 `/review` 流程中“漏掉实时 blocker”的问题，避免在已有阻塞未解决时错误输出 “Reviewed — no blockers”。同时加入对“新测试是否真正覆盖新代码”的探测，提升 review 可靠性。  
   价值：这类修复直接提升审查机器人输出的可信度，减少误判对合并流程的干扰。

2. **#6789 feat(triage): add confidence score, sequence diagram, files overview, and review footer to PR comments**  
   链接：<https://github.com/QwenLM/qwen-code/pull/6789>  
   重点：增强 `@qwen-code /triage` 的 PR 评论结构化表达能力，加入置信度分数、流程序列图、文件概览和 review footer。  
   价值：这是典型的“提升信息密度而不改变核心逻辑”的改进，有利于让机器人输出更易读、更适合大仓协作。

3. **#6788 fix(core): include skill results in microcompaction**  
   链接：<https://github.com/QwenLM/qwen-code/pull/6788>  
   重点：让 Skill 工具的结果也纳入 microcompaction 策略，在上下文超过阈值或空闲/强制压缩时可清理旧的 Skill body。  
   价值：对长对话和工具链重度使用场景很关键，直接关系到上下文管理和运行成本。

4. **#6787 fix(core): reorder LruCache entries on get() for falsy values**  
   链接：<https://github.com/QwenLM/qwen-code/pull/6787>  
   重点：修复 `LruCache.get()` 在 value 为 `0`、`''`、`false`、`null` 等 falsy 值时未正确提升为最近使用的问题，并补充回归测试。  
   价值：属于底层正确性修复，虽然看似细小，但对缓存行为一致性和边界条件稳定性很重要。

---

## 5) 功能需求趋势
结合今日 Issues 与 PR，可以看到社区当前最关注的方向主要有：

1. **第三方模型 / API 兼容性**
   - 典型诉求是让 `auto` 模式能兼容不同中转层和原厂接口差异。
   - 重点痛点包括：`tool-choice` 缺失、协议字段透传、thinking 标签处理、纯文本响应解析。

2. **模型切换与分类稳定性**
   - `auto` 模式依赖请求分类器与路由策略，任何协议差异都会影响体验。
   - 社区希望 Qwen Code 在“多模型、多供应商”环境中保持稳定推理与可用性。

3. **Agent / Review / Triage 工作流质量**
   - PR 显示开发者在持续提升自动 review、triage 的准确性和可读性。
   - 这反映出社区对“AI 辅助代码审查”流程的依赖正在加深。

4. **上下文压缩与工具结果管理**
   - microcompaction 的优化说明长上下文和工具输出控制仍是核心工程问题。
   - 说明用户对长任务、复杂任务链的稳定运行有明确需求。

5. **底层数据结构与运行时正确性**
   - LRU 缓存边界修复说明项目在持续打磨基础设施稳定性。
   - 这类修复通常指向更高的整体可维护性。

---

## 6) 开发者关注点
从今天的反馈和 PR 方向看，开发者最需要关注的痛点主要是：

- **协议适配问题**：不同模型供应商和中转服务的协议细节不一致，尤其在 `auto` 模式下容易暴露兼容性缺口。
- **工具调用语义不稳定**：`tool-choice`、`thinking` 等字段处理不统一，会导致解析失败或超时。
- **审查结果可信度**：review/triage 机器人必须避免漏报 blocker，否则会直接影响合并判断。
- **上下文管理效率**：工具输出越来越多，压缩策略需要更精细地兼顾可用性和成本。
- **基础设施健壮性**：缓存、回归测试、边界值处理这些底层问题，仍然是提升产品稳定性的关键。

---

如果你希望，我还可以把这份日报进一步整理成：
1. **适合公众号/周报风格的精简版**，或  
2. **适合团队晨会使用的要点版**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

过去24小时无活动。

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*