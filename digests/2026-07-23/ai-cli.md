# AI CLI 工具社区动态日报 2026-07-23

> 生成时间: 2026-07-23 01:06 UTC | 覆盖工具: 9 个

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

下面是基于你提供的 2026-07-23 社区动态摘要整理的**横向对比分析报告**。  
> 注：表中 **Issues/PR 数** 为各日报中“精选/可见更新条目数”，用于反映当日社区活跃度，不等同于仓库全部 Issue/PR 总量。

---

## 1) 生态全景

过去 24 小时，AI CLI 生态整体呈现出三个明显特征：**一是多模型/多 Provider 兼容成为基础能力，二是长会话、恢复与上下文管理成为稳定性主战场，三是 TUI/桌面/IDE 交互体验仍是高频故障来源。**  
从各仓库动态看，产品已从“能跑”进入“能稳定跑、能跨环境跑、能控成本跑”的阶段。  
同时，社区反馈越来越集中在 **安全误报、限额/降级、会话一致性、工具链可靠性** 等生产级问题上。  
整体判断：AI CLI 正在从单点工具向“开发工作流入口”演进，竞争重点已从模型能力转向**工程稳定性 + 生态兼容 + 交互可持续性**。

---

## 2) 各工具活跃度对比

| 工具 | 今日 Issues 数 | 今日 PR 数 | Release 情况 |
|---|---:|---:|---|
| Claude Code | 10 | 8 | 1 个正式 Release：v2.1.218 |
| OpenAI Codex | 10 | 10 | 4 个 alpha Release：0.146.0-alpha.1~4 |
| Gemini CLI | 10 | 10 | 2 个 Release：v0.52.0、v0.53.0-preview.0 |
| GitHub Copilot CLI | 10 | 0 | 3 个补丁版 Release：v1.0.74-1~3 |
| Kimi Code CLI | 3 | 0 | 无新 Release |
| OpenCode | 10 | 10 | 无正式 Release |
| Pi | 10 | 10 | 无新 Release |
| Qwen Code | 10 | 10 | 1 个 prerelease：benchmark POC |
| DeepSeek TUI | 10 | 10 | 无新 Release |

**简评：**
- **PR 活跃度最高梯队**：Codex、Gemini、OpenCode、Pi、Qwen、DeepSeek，说明这些项目仍处在高频迭代期。
- **Issue 热度高但 PR 供给偏弱**：GitHub Copilot CLI，社区反馈强，但当日无 PR 更新。
- **低噪音/早期反馈**：Kimi Code CLI，今日只出现 3 条 Issue，说明社区体量或产品暴露面仍相对较小。

---

## 3) 共同关注的功能方向

### 1. 模型可用性、路由与 Provider 兼容
这是所有工具最一致的主题之一。  
- **Claude Code**：Fable/Opus 切换、降级、误触发安全护栏  
- **Codex**：自定义 provider、multi-agent、web search  
- **Gemini CLI**：模型选择器缺模型、开放 provider 支持  
- **Kimi Code CLI**：第三方 API 参数兼容、sub-agent 独立模型选择  
- **OpenCode / Pi / Qwen / DeepSeek**：多 Provider、动态模型、路由一致性  
**结论**：CLI 工具已从“绑定单一模型”转向“模型编排平台化”。

### 2. 长会话、恢复与上下文压缩
- **Claude Code**：resume、auto-compact、monitor 回合异常  
- **Codex**：历史同步、跨设备连续性  
- **Gemini CLI**：getHistoryTurns、/compress 中断控制  
- **OpenCode / Pi / Qwen / DeepSeek**：turn loop、缓存断点、context diet、token 膨胀治理  
**结论**：长会话已成为重度用户默认场景，恢复能力和上下文治理是硬指标。

### 3. 安全策略与权限门禁的误报控制
- **Claude Code**：Fable safeguard 误报  
- **Codex**：cyber safety checks、plan mode 误拦截  
- **Gemini CLI**：policy wildcard DENY 误伤 MCP 工具  
- **Copilot CLI**：plan mode、权限扫描误判  
- **DeepSeek TUI**：danger-full-access 边界控制  
**结论**：行业正从“更严的安全”走向“更可解释、更可控的安全”。

### 4. TUI / Windows / IDE / 远程环境兼容
- **Codex**：Windows、WSL、tmux、Xcode、桌面端  
- **Copilot CLI**：tmux、Windows、Xcode、自定义 agent  
- **Gemini CLI**：VS Code companion、JetBrains Rider、shell 集成  
- **Kimi Code CLI**：Windows 编码与重定向崩溃  
- **Qwen Code**：VS Code Companion、Web Shell、TUI resume  
- **Pi / DeepSeek / OpenCode**：终端输入、宽字符、布局恢复、安装器行为  
**结论**：CLI 产品的竞争正在明显向“多终端一致体验”迁移。

### 5. 成本、限额与可观测性
- **Claude Code**：使用限制、自动降级造成 token/上下文浪费  
- **Codex**：预算/额度争议  
- **Copilot CLI**：Auto mode 模型池可配置  
- **Pi**：rate limit / subscription usage 暴露给扩展  
- **Qwen Code**：release 自动化失败可见性  
**结论**：用户不只要“能用”，还要“成本可控、行为可解释、失败可追踪”。

---

## 4) 差异化定位分析

### Claude Code
- **侧重**：交互体验、代码审查工作流、无障碍、会话稳定性  
- **目标用户**：高频终端开发者、Code Review 重度用户  
- **技术路线**：通过 subagent 隔离 review、持续打磨 TUI 可持续使用性  
- **特点**：更强调“可用性与信任感”，而非单纯扩模型能力

### OpenAI Codex
- **侧重**：Windows/桌面端、远程/多代理、provider 兼容  
- **目标用户**：跨设备、跨环境、企业/高级开发者  
- **技术路线**：Rust alpha 线快速迭代，重点修线程调度、会话持久化和生态兼容  
- **特点**：产品化广度高，工程稳定性是核心压力点

### Gemini CLI
- **侧重**：模型选择、policy 精度、IDE 集成、agent 执行链路  
- **目标用户**：Gemini 生态用户、需要深度 IDE 集成的开发者  
- **技术路线**：preview 线快速修复，辅以 caretaker-triage 自动化分诊  
- **特点**：偏“平台化能力 + 工具可靠性”双线推进

### GitHub Copilot CLI
- **侧重**：GitHub 生态、plan mode、subagent、Windows/tmux 兼容  
- **目标用户**：GitHub 体系内的团队用户、企业开发者  
- **技术路线**：偏守成型迭代，强调权限门禁、沙箱和状态机一致性  
- **特点**：更像“企业开发工作流入口”，对误判和兼容性非常敏感

### Kimi Code CLI
- **侧重**：API 兼容、Windows 稳定性、sub-agent 路由  
- **目标用户**：需要接入多供应商模型的开发者  
- **技术路线**：当前更像早期适配与兼容打底阶段  
- **特点**：社区反馈少，但问题指向很明确，仍在打基础

### OpenCode
- **侧重**：开放式 agent 平台、V2 收敛、多模型兼容  
- **目标用户**：想要自定义/扩展 agent 流程的开发者  
- **技术路线**：快速修复 V2 迁移、动态模型加载、主题与无障碍  
- **特点**：开源平台型产品，创新速度快，稳定性问题也更集中暴露

### Pi
- **侧重**：Provider 抽象、TUI 精度、扩展 SDK/Hook、长任务控制  
- **目标用户**：需要深度定制和扩展的开发者/工具集成方  
- **技术路线**：强 API 暴露，强调 session 元信息、事件流、重试中断  
- **特点**：更像“AI CLI 的底层平台层”

### Qwen Code
- **侧重**：CI / 发布链路、update check、企业集成、IDE/TUI 细节  
- **目标用户**：重视发布稳定性与企业部署的用户  
- **技术路线**：围绕更新机制、测试隔离、telemetry 对齐持续修复  
- **特点**：工程治理非常重，稳定交付是主旋律

### DeepSeek TUI
- **侧重**：TUI 信息架构、默认技能包、上下文瘦身、安全门禁  
- **目标用户**：偏终端、偏 agent 工作流的重度用户  
- **技术路线**：以 release-blocker 为中心收敛，强调 fail-closed 与上下文优化  
- **特点**：从“补齐功能”快速进入“系统性提质”

---

## 5) 社区热度与成熟度

### 社区热度更高的工具
- **Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI**  
  共同特征是：Issue 讨论更集中、影响面更广、生产级反馈更强。
- 其中 **Claude Code** 的“信任/误判”问题最突出，**Codex** 的平台稳定性和 Windows 兼容最突出，**Gemini** 的政策和模型选择问题最突出，**Copilot** 的计划模式与平台兼容最突出。

### 迭代速度最快的工具
- **Codex、Gemini、OpenCode、Pi、Qwen、DeepSeek**  
  都有高频 PR 或 preview/alpha/prerelease 输出，说明仍处于快速修补和功能收敛阶段。

### 相对早期或低噪音的工具
- **Kimi Code CLI**  
  当日反馈量明显更小，说明社区活跃度和暴露面都相对有限，仍偏早期。

### 成熟度判断
- **偏成熟但压力大**：Claude Code、Copilot CLI、Codex  
- **快速演进型**：Gemini CLI、OpenCode、Pi、DeepSeek TUI  
- **工程治理导向型**：Qwen Code  
- **早期探索型**：Kimi Code CLI

---

## 6) 值得关注的趋势信号

1. **AI CLI 正在平台化，而不是单模型工具化**  
   多 Provider、多代理、多设备同步、插件目录、模型池配置都在成为标配能力。

2. **“安全”正在从拦截优先转向精度优先**  
   社区不接受误报式保护，尤其不接受安全策略导致的正常工作流阻断。

3. **长会话稳定性是下一阶段分水岭**  
   resume、compact、history、turn loop、token 费用控制，已成为重度用户最敏感的主路径。

4. **TUI/桌面/IDE 的边界问题仍会持续暴露**  
   Windows、tmux、WSL、VS Code、Xcode、JetBrains 这些环境差异，仍是 CLI 产品最容易翻车的地方。

5. **可观测性与成本透明度正在成为企业采购前提**  
   计费属性、usage limit、telemetry、失败可见性，越来越像“基础设施能力”，而不是附加功能。

---

### 一句话结论
**当前 AI CLI 竞争的核心，不再是谁的模型更强，而是谁能在多模型、多环境、长会话和安全约束下，提供更稳定、更可控、更可持续的开发体验。**

如果你需要，我还可以把这份报告进一步整理成：
- **1 页管理层摘要版**
- **按“产品 / 模型 / 基础设施”拆分的分析版**
- **适合内部晨会的 5 条结论版**

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

以下为基于你给出的 `anthropics/skills` 数据整理的 **Claude Code Skills 社区热点报告**（数据截止 2026-07-23）。

---

## 1) 热门 Skills 排行（按社区关注度/讨论热度归纳）

> 说明：你提供的 PR 列表中未显示完整评论数，因此以下按“重复修复需求、议题影响面、与高热 Issue 的关联度”综合排序。

1. **skill-creator 工具链稳定性修复**
   - 代表 PR：[#1298](https://github.com/anthropics/skills/pull/1298)、[#1323](https://github.com/anthropics/skills/pull/1323)、[#1099](https://github.com/anthropics/skills/pull/1099)、[#1050](https://github.com/anthropics/skills/pull/1050)
   - 功能：修复 `run_eval.py / run_loop.py / improve_description.py` 的评估与触发识别问题，并补齐 Windows 兼容性。
   - 社区热点：`recall=0%`、技能未触发、Windows pipe/encoding/subprocess 崩溃，这些都是“官方工具链不可靠”的高优先级问题。
   - 当前状态：**Open**

2. **self-audit**
   - PR：[#1367](https://github.com/anthropics/skills/pull/1367)
   - 功能：在交付前做“机械校验 + 四维推理审计”，主打通用输出质量门禁。
   - 社区热点：社区明显偏好“自检/审计/防错”类 Skills，尤其适合复杂任务和高风险交付。
   - 当前状态：**Open**

3. **testing-patterns**
   - PR：[#723](https://github.com/anthropics/skills/pull/723)
   - 功能：覆盖单元测试、React 测试、测试策略等完整测试方法论。
   - 社区热点：测试生成与测试规范化是开发类 Skills 中最实用、最容易落地的一类。
   - 当前状态：**Open**

4. **color-expert**
   - PR：[#1302](https://github.com/anthropics/skills/pull/1302)
   - 功能：系统化处理颜色命名、色彩空间、配色选择与可访问性色彩工作流。
   - 社区热点：说明社区不只关注工程工具，也在扩展到设计与内容生产型专业知识。
   - 当前状态：**Open**

5. **document-typography**
   - PR：[#514](https://github.com/anthropics/skills/pull/514)
   - 功能：修复 AI 生成文档中的排版质量问题，如孤行、寡行、编号对齐等。
   - 社区热点：文档输出质量越来越被重视，尤其是“看起来专业”的最后一公里。
   - 当前状态：**Open**

6. **pyxel**
   - PR：[#525](https://github.com/anthropics/skills/pull/525)
   - 功能：面向 Pyxel/复古游戏开发的工作流 Skill。
   - 社区热点：说明社区对“可直接执行的垂直场景技能”仍有强兴趣，尤其是能形成完整迭代闭环的方向。
   - 当前状态：**Open**

7. **ODT skill**
   - PR：[#486](https://github.com/anthropics/skills/pull/486)
   - 功能：支持 OpenDocument 格式（ODT/ODS）的创建、填充、读取与转换。
   - 社区热点：办公文档兼容性与开源格式支持，明显有企业/办公场景需求。
   - 当前状态：**Open**

8. **frontend-design clarity 改进**
   - PR：[#210](https://github.com/anthropics/skills/pull/210)
   - 功能：增强前端设计 Skill 的可执行性与清晰度。
   - 社区热点：前端设计类 Skills 依然有需求，但当前焦点更多转向“可靠性和实用性”。
   - 当前状态：**Open**

---

## 2) 社区需求趋势

从 Issues 的评论热度看，社区最期待的新 Skill 方向主要集中在以下几类：

### A. **安全、信任边界与权限治理**
- 代表 Issue：[#492](https://github.com/anthropics/skills/issues/492)
- 关注点：community skills 使用 `anthropic/` 命名空间带来“官方冒充”风险，涉及权限与信任边界。
- 趋势判断：社区对“技能分发安全”“权限隔离”“审计可追溯”非常敏感。

### B. **组织内共享与分发**
- 代表 Issue：[#228](https://github.com/anthropics/skills/issues/228)
- 关注点：希望在 Claude.ai 中实现 org-wide skill sharing，而不是手工下载/上传。
- 趋势判断：从“个人使用”进入“团队协作”的需求很明确。

### C. **技能工具链稳定性与跨平台兼容**
- 代表 Issue：[#556](https://github.com/anthropics/skills/issues/556)、[#1169](https://github.com/anthropics/skills/issues/1169)、[#1061](https://github.com/anthropics/skills/issues/1061)
- 关注点：`run_eval` / `run_loop` 触发率为 0、Windows subprocess/编码/pipe 问题频发。
- 趋势判断：社区最现实的痛点不是“新技能不够多”，而是“官方技能开发与验证链路不够稳”。

### D. **文档/办公自动化技能**
- 代表 Issue：[#189](https://github.com/anthropics/skills/issues/189)、[#1175](https://github.com/anthropics/skills/issues/1175)
- 关注点：文档技能重复安装、SharePoint/权限/上下文窗口安全顾虑。
- 趋势判断：企业文档场景需求强，但用户非常在意安全和重复上下文污染。

### E. **平台集成与生态互通**
- 代表 Issue：[#29](https://github.com/anthropics/skills/issues/29)、[#16](https://github.com/anthropics/skills/issues/16)
- 关注点：Bedrock 支持、Skills 作为 MCP 暴露、API 化封装。
- 趋势判断：社区希望 Skills 不只是“提示词包”，而是可编排、可集成的能力单元。

### F. **更强的“质量门禁”类 Skills**
- 代表 Issue：[#412](https://github.com/anthropics/skills/issues/412)、[#1385](https://github.com/anthropics/skills/issues/1385)
- 关注点：agent governance、reasoning quality gate、前置校准/对抗审查/交付验证。
- 趋势判断：社区在寻找“让模型少出错”的系统性方案，而不是单点技巧。

---

## 3) 高潜力待合并 Skills

> 这里按“问题清晰、可复现、与高热 Issue 直接对应”的角度判断，属于近期较可能落地的 PR。

1. **修复 skill-creator 的 eval/trigger 核心链路**
   - PR：[#1298](https://github.com/anthropics/skills/pull/1298)、[#1323](https://github.com/anthropics/skills/pull/1323)
   - 价值：直接命中 `run_eval` 误报 0% recall 的核心问题，对整个优化链路影响最大。
   - 对应 Issue：[#556](https://github.com/anthropics/skills/issues/556)、[#1169](https://github.com/anthropics/skills/issues/1169)

2. **Windows 兼容性修复**
   - PR：[#1099](https://github.com/anthropics/skills/pull/1099)、[#1050](https://github.com/anthropics/skills/pull/1050)
   - 价值：补齐 `claude.cmd`、pipe 读取、编码处理等 Windows 痛点，属于“能不能用”的底层问题。
   - 对应 Issue：[#1061](https://github.com/anthropics/skills/issues/1061)

3. **YAML / frontmatter 安全校验**
   - PR：[#539](https://github.com/anthropics/skills/pull/539)、[#361](https://github.com/anthropics/skills/pull/361)
   - 价值：解决 `description` 未加引号导致的静默解析失败，属于高收益低风险修复。
   - 对应问题：技能描述与元数据解析稳定性

4. **UTF-8 / 多字节字符安全**
   - PR：[#362](https://github.com/anthropics/skills/pull/362)
   - 价值：避免多字节字符导致 panic，提升国际化和真实场景稳定性。
   - 适用面：几乎所有非英文技能内容

5. **PDF/DOCX 规范性修复**
   - PR：[#538](https://github.com/anthropics/skills/pull/538)、[#541](https://github.com/anthropics/skills/pull/541)
   - 价值：修正文档类 Skills 的文件引用与 tracked change 冲突，直接影响文档生成可靠性。
   - 对应领域：办公文档工作流

---

## 4) Skills 生态洞察

**一句话总结：当前社区最集中的诉求是——把 Claude Code Skills 从“能生成”升级为“可验证、可分发、可跨平台稳定运行的生产级能力”。**

如果你愿意，我还可以把这份报告进一步整理成：
- **PPT 风格摘要版**
- **适合发公众号/博客的分析稿**
- **按“Bugfix / 新技能 / 平台能力”三类的雷达图式总结**

---

# Claude Code 社区动态日报（2026-07-23）

## 1) 今日速览
过去 24 小时，Claude Code 迎来 **v2.1.218** 发布，核心变化是把 `/code-review` 改为后台 subagent，减少对主对话的占用，同时补充了屏幕阅读器对删除文本的播报能力。  
社区 Issues 依然高度集中在 **Fable 5 相关的安全误判、模型可用性/降级、会话与鉴权稳定性** 上，且多数问题带有明确的生产可用性影响。  
PR 侧则以 **文档修正、插件能力、会话/上下文稳定性和终端交互体验** 为主，反映出项目正在同时处理“能力扩展”和“稳定性打磨”。

---

## 2) 版本发布
### [v2.1.218](https://github.com/anthropics/claude-code/releases/tag/v2.1.218)
**主要更新：**
- `/code-review` 改为**后台 subagent** 执行，避免 review 内容占满当前对话，并让连续的 slash command 保持正确的 review 目标
- 为**删除文本**增加屏幕阅读器播报支持，覆盖 `Option+Delete`、`Ctrl+W`、`Cmd+Backspace` 等快捷键场景

**解读：**
- 这次更新更偏向 **交互体验和无障碍支持**，尤其是 review 工作流的隔离，对高频使用 Code Review 的开发者更友好。
- 从发布内容看，Claude Code 正在继续强化 TUI/CLI 的“可持续使用性”，而不仅是模型能力本身。

---

## 3) 社区热点 Issues
> 说明：以下挑选的是过去 24 小时内最值得关注的 10 个 Issue，兼顾影响面、问题类型和社区反馈强度。

### 1. [#80348 Fable 5 误判“已验证、已修改”](https://github.com/anthropics/claude-code/issues/80348)
- **为什么重要**：这是典型的“模型自证正确但实际未改动”的信任问题，直接影响开发者对结果验证的可靠性判断。
- **社区反应**：**3 条评论**，是当前更新问题中讨论最活跃的一条，说明该类“幻觉式完成”行为已引发明显关注。

### 2. [#80340 插件安装对 commit SHA 形式的 git-subdir 源失败](https://github.com/anthropics/claude-code/issues/80340)
- **为什么重要**：影响插件分发和版本固定能力，属于实用性很强的安装链路问题。
- **社区反应**：**2 👍 / 1 条评论**，虽然讨论不多，但反馈明确，且复现条件清晰。

### 3. [#80335 对话中途的助手回复未出现在 transcript 视图](https://github.com/anthropics/claude-code/issues/80335)
- **为什么重要**：会导致“看得到 session JSONL，却看不到 UI 记录”的一致性问题，影响调试与审计。
- **社区反应**：**1 👍 / 1 条评论**，属于小而关键的可观测性缺陷。

### 4. [#80383 Fable safeguard 误报，导致中途切到 Opus](https://github.com/anthropics/claude-code/issues/80383)
- **为什么重要**：直接带来上下文切换和成本浪费，属于“安全策略误伤生产体验”的典型案例。
- **社区反应**：暂无评论，但问题描述非常具体，且已明确提到 **约 $5.65 的上下文浪费**，容易引发共鸣。

### 5. [#80382 Fable 5 对 Max 订阅可用性提示前后矛盾](https://github.com/anthropics/claude-code/issues/80382)
- **为什么重要**：涉及订阅可见性与模型可用性判断，影响用户对产品边界的理解。
- **社区反应**：暂无评论，但与 Fable 相关的可用性/降级问题近期明显增多。

### 6. [#80381 Claude Code 导致从 Fable 降级](https://github.com/anthropics/claude-code/issues/80381)
- **为什么重要**：模型降级会直接影响输出质量与用户成本感知，是高敏感度问题。
- **社区反应**：暂无评论，但标题本身就表明用户对“自动降级”极为敏感。

### 7. [#80380 静态 OAuth token 间歇性 401 风暴](https://github.com/anthropics/claude-code/issues/80380)
- **为什么重要**：涉及认证链路稳定性，且表现为“多机器同时失败”，非常像服务端或鉴权层面的系统性问题。
- **社区反应**：暂无评论，但属于生产环境高风险问题。

### 8. [#80379 大型会话转录在 Interactive --resume 时 JSON 解析崩溃](https://github.com/anthropics/claude-code/issues/80379)
- **为什么重要**：会话恢复是重度用户的关键路径，400MB+ transcript 崩溃说明大会话场景仍有脆弱点。
- **社区反应**：暂无评论，但对长会话用户影响极高。

### 9. [#80375 EnterWorktree 在后台任务中隔离了错误仓库](https://github.com/anthropics/claude-code/issues/80375)
- **为什么重要**：属于“工作目录/仓库上下文错位”问题，会直接污染自动化任务结果。
- **社区反应**：暂无评论，但这类 bug 对多 repo / daemon-backed 工作流影响很大。

### 10. [#80373 resume 后 Monitor 工具自动触发下一轮，造成额外 token 消耗](https://github.com/anthropics/claude-code/issues/80373)
- **为什么重要**：恢复会话后自动多跑一轮，既浪费 token，又可能改变用户意图。
- **社区反应**：暂无评论，但明确提到了 **长会话 + fable5 + cache miss** 时成本放大。

---

## 4) 重要 PR 进展
> 说明：当前可见的 PR 更新共 8 条，以下按影响度挑选全部列出。

### 1. [#80326 Add account profiles plugin](https://github.com/anthropics/claude-code/pull/80326)
- 提供实验性的 **account-profiles** 插件，支持为个人/工作/客户账号创建隔离的 `CLAUDE_CONFIG_DIR` 启动环境
- 这对多账号切换、配置隔离、企业/自由职业者混用场景很实用

### 2. [#80196 fix auto-compact never triggers despite statusline reporting "100% context used"](https://github.com/anthropics/claude-code/pull/80196)
- 修复 **自动压缩不触发** 的问题，即使状态栏显示已达 100% 也能正确触发
- 属于长会话稳定性关键修复

### 3. [#80195 fix instantly hitting usage limits with Max subscription](https://github.com/anthropics/claude-code/pull/80195)
- 修复 **Max 订阅用户瞬间触发使用限制** 的问题
- 与社区近期大量“限额/降级”反馈高度相关

### 4. [#80241 fix: Console scrolling top of history when claude add text to the console](https://github.com/anthropics/claude-code/pull/80241)
- 修复 Claude 向控制台输出文本时导致历史记录滚动到顶部的问题
- 直接改善 TUI 可读性和交互稳定性

### 5. [#80112 Make devcontainer firewall init resilient to DNS resolution failures](https://github.com/anthropics/claude-code/pull/80112)
- 让 devcontainer 防火墙初始化在 DNS 解析失败时更健壮，不再因单个域名失败而整体退出
- 这是面向开发环境的可靠性增强

### 6. [#80353 docs(gcp): stop on checksum mismatch](https://github.com/anthropics/claude-code/pull/80353)
- GCP gateway 部署流程在下载二进制校验失败时立即停止
- 属于部署安全性和失败可控性优化

### 7. [#80294 docs: fix 1 broken link(s) via archive.org](https://github.com/anthropics/claude-code/pull/80294)
- 修复 README 中失效的外链
- 虽然是文档级修正，但有助于降低新用户上手摩擦

### 8. [#80229 docs: fix 1 broken link(s) via archive.org](https://github.com/anthropics/claude-code/pull/80229)
- 与上面类似，继续修复文档中的失效链接
- 体现出文档维护的持续性

---

## 5) 功能需求趋势
从过去 24 小时 Issues 来看，社区关注点主要集中在以下几条：

1. **模型可用性与调度控制**
   - 用户强烈关注 Fable / Opus 的切换、降级、可用性提示一致性  
   - 代表 Issue：[#80382](https://github.com/anthropics/claude-code/issues/80382)、[#80381](https://github.com/anthropics/claude-code/issues/80381)

2. **安全护栏的误报降低**
   - 许多反馈都指向“安全/敏感内容识别过宽”，误伤正常技术讨论与研究场景  
   - 代表 Issue：[#80383](https://github.com/anthropics/claude-code/issues/80383)、[#80378](https://github.com/anthropics/claude-code/issues/80378)、[#80371](https://github.com/anthropics/claude-code/issues/80371)

3. **长会话与恢复稳定性**
   - `--resume`、大 transcript、auto-compact、monitor/background task 的边界问题集中出现  
   - 代表 Issue：[#80379](https://github.com/anthropics/claude-code/issues/80379)、[#80373](https://github.com/anthropics/claude-code/issues/80373)、[#80372](https://github.com/anthropics/claude-code/issues/80372)

4. **插件生态与安装可靠性**
   - 社区希望插件安装、缓存管理、版本固定更稳定，尤其是 commit SHA 场景  
   - 代表 Issue：[#80340](https://github.com/anthropics/claude-code/issues/80340)、[#80367](https://github.com/anthropics/claude-code/issues/80367)

5. **TUI 交互与可访问性提升**
   - 对 transcript、快捷键、屏幕阅读器、滚动行为的需求继续上升  
   - 代表 Issue：[#80335](https://github.com/anthropics/claude-code/issues/80335)、[#80384](https://github.com/anthropics/claude-code/issues/80384)

---

## 6) 开发者关注点
综合今天的反馈，开发者最在意的痛点可以概括为：

- **“模型说自己做完了，但实际上没做”**：对结果可信度的焦虑在上升，尤其是验证类任务
- **“安全策略别误伤正常工作流”**：很多问题不是拒绝本身，而是误判和切换成本太高
- **“会话不要莫名其妙变贵”**：自动降级、自动触发下一轮、错误限额、401 波动都会直接影响成本
- **“长会话要稳定可恢复”**：resume、compact、background task、worktree 都是重度用户的核心路径
- **“插件和多账号场景要可控”**：隔离配置、固定版本、避免缓存膨胀，都是实战刚需

如果你愿意，我也可以把这份日报再整理成：
- **适合内部群发的更短版**
- **带风险等级标注的版本**
- **按“产品/模型/基础设施”三类拆分的分析版**

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-07-23）

## 1) 今日速览
过去 24 小时里，Codex 社区的讨论重心明显集中在**桌面端/Windows 稳定性**、**会话/历史同步**以及**限流与使用额度**上，且不少问题带有“更新后回归”的特征。  
与此同时，仓库也连续发布了多个 **0.146.0 alpha** 版本，说明 0.146.0 预览线仍在快速推进，PR 侧则更多围绕**线程调度、会话持久化、插件/提供商兼容性**做增量修复。

---

## 2) 版本发布

- [rust-v0.146.0-alpha.4](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.4) — 发布说明未附详细 changelog，可视为 0.146.0 alpha 线的最新迭代。
- [rust-v0.146.0-alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.3) — 同样未提供细项说明。
- [rust-v0.146.0-alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.2) — 同样未提供细项说明。
- [rust-v0.146.0-alpha.1](https://github.com/openai/codex/releases/tag/rust-v0.146.0-alpha.1) — 同样未提供细项说明。

**解读**：连续 4 个 alpha 发布，说明版本迭代频率高，重点更像是在持续修补稳定性与兼容性，而不是一次性的大功能发布。

---

## 3) 社区热点 Issues（精选 10 条）

1. [#34822 Bring back 5-hr limit or allow Ultra budgets](https://github.com/openai/codex/issues/34822)  
   **为什么重要**：直接触及 Pro/Ultra 套餐的额度消耗与成本预期，属于高敏感度体验问题。  
   **社区反应**：24 小时内有 **3 条评论**，是目前最明确的“预算/限流”诉求之一。

2. [#34782 WSL path resolution broken after 2026-07-22 Store update](https://github.com/openai/codex/issues/34782)  
   **为什么重要**：Windows 更新后 WSL 路径解析失效，导致任务创建失败、历史侧栏丢失，影响核心工作流。  
   **社区反应**：**3 条评论**，且已关闭，说明是紧急回归类问题，反馈集中。

3. [#34833 MultiAgentV2 cross-provider subagent cannot consume encrypted task assignment](https://github.com/openai/codex/issues/34833)  
   **为什么重要**：影响多代理 + 自定义 provider 场景，属于高级用户和集成开发者最在意的兼容性问题。  
   **社区反应**：**2 条评论**，问题较新，但已经体现出跨 provider 的落地阻塞。

4. [#34810 Windows TUI livelock: main thread spins 100% user-mode](https://github.com/openai/codex/issues/34810)  
   **为什么重要**：TUI 冻结且主线程满核空转，属于严重性能/可用性故障。  
   **社区反应**：**2 条评论**，并已关闭，说明该回归影响面不小。

5. [#34804 Feature request: Codex workspace continuity across devices](https://github.com/openai/codex/issues/34804)  
   **为什么重要**：跨设备继续同一项目/会话，是远程协作和多机工作流的核心诉求。  
   **社区反应**：**2 条评论**，说明“可无缝切换设备”已不是加分项，而是明确需求。

6. [#34799 Codex adds a .git folder to my source control branch that breaks TFVC](https://github.com/openai/codex/issues/34799)  
   **为什么重要**：对企业/混合版本控制环境有直接破坏性，TFVC 场景会被 `.git` 污染。  
   **社区反应**：**2 条评论**，属于企业用户强相关的边缘但高痛点问题。

7. [#34790 Cyber safety checks are too strict, preventing real work](https://github.com/openai/codex/issues/34790)  
   **为什么重要**：安全校验过严会把“保护用户”变成“阻塞用户”，影响真实生产力。  
   **社区反应**：**2 条评论**，说明安全策略与可用性的平衡仍是争议焦点。

8. [#34783 Setup hangs at “Complete configuration” after UAC approval](https://github.com/openai/codex/issues/34783)  
   **为什么重要**：安装/首次启动卡死会直接影响新用户转化与桌面端可用性。  
   **社区反应**：**2 条评论**，且问题发生在安装链路关键节点，属于高优先级阻断。

9. [#34843 Sessions misses recently updated conversations because provider limits by created_at](https://github.com/openai/codex/issues/34843)  
   **为什么重要**：会话列表按更新时间展示但后端按创建时间限制，导致“看不到刚更新的会话”。  
   **社区反应**：**1 条评论**，但这是典型的产品数据一致性问题，影响面可能比评论数更大。

10. [#34829 Codex Desktop on Windows: apply_patch and some exec processes hang indefinitely](https://github.com/openai/codex/issues/34829)  
    **为什么重要**：`apply_patch` 和部分进程挂死会让编辑链路不可用，直接影响日常开发效率。  
    **社区反应**：**1 条评论**，但故障严重度高，属于“可操作性”底线问题。

---

## 4) 重要 PR 进展（精选 10 条）

1. [#34852 Wake sleeping threads for queued agent mail](https://github.com/openai/codex/pull/34852)  
   让处于睡眠状态的线程在收到新消息时能被唤醒，改善异步任务的响应性与线程调度一致性。

2. [#34851 Use batch metadata for plugin app summaries](https://github.com/openai/codex/pull/34851)  
   改用批量 API 拉取插件应用元数据，提升插件列表/摘要加载的稳定性与扩展性。

3. [#34850 Disable image generation for Free-plan accounts](https://github.com/openai/codex/pull/34850)  
   对 Free 计划禁用独立图像生成工具，属于清晰的套餐能力边界收敛。

4. [#34849 Cache remote plugin catalogs by scope](https://github.com/openai/codex/pull/34849)  
   为 global/user/workspace 级远程插件目录增加本地缓存和 TTL，减少重复拉取并提升启动体验。

5. [#34847 Use Guardian model limits for review sessions](https://github.com/openai/codex/pull/34847)  
   修正 Guardian review 会话的模型限额来源，避免上下文窗口/自动压缩配置错配。

6. [#34846 Allow custom providers to opt into standalone web search](https://github.com/openai/codex/pull/34846)  
   让自定义 provider 可显式启用独立 web search，增强第三方/自建模型的工具链能力。

7. [#34845 Track multi-agent mode in world state](https://github.com/openai/codex/pull/34845)  
   将多代理模式纳入世界状态，提升历史回放、上下文继承和模式切换的一致性。

8. [#34844 Remove first-party type from app metadata](https://github.com/openai/codex/pull/34844)  
   清理 connector app metadata 与 app-server v2 协议中的 `first_party_type`，减少协议歧义。

9. [#34840 Add persisted thread pinning to the app server](https://github.com/openai/codex/pull/34840)  
   增加线程置顶与筛选能力，让长期项目/关键会话更易管理。

10. [#34839 Preserve user input when MCP startup is interrupted](https://github.com/openai/codex/pull/34839)  
    避免 MCP 启动中断时丢失用户输入，修复会话历史完整性问题。

---

## 5) 功能需求趋势

从近期 Issues 看，社区关注点主要集中在以下方向：

- [Windows / 桌面端稳定性](https://github.com/openai/codex/issues/34782)  
  频繁出现更新后回归、TUI 冻结、安装卡死、sandbox 挂起等问题，说明桌面端稳定性仍是首要任务。

- [会话连续性与跨设备协作](https://github.com/openai/codex/issues/34804)  
  用户希望在不同设备间无缝延续同一 workspace/session，这是远程办公和多机开发的重要需求。

- [限流、预算与套餐体验](https://github.com/openai/codex/issues/34822)  
  Ultra/Pro 的额度消耗和使用上限，已成为影响付费体验的高频讨论点。

- [自定义模型 / 多代理 / provider 兼容](https://github.com/openai/codex/issues/34833)  
  说明 Codex 正在从“OpenAI 原生体验”走向“多 provider、可插拔模型生态”。

- [Computer Use / Remote / Browser 工具可靠性](https://github.com/openai/codex/issues/34826)  
  远程控制、浏览器插件、computer-use、remote ssh 等场景的稳定性仍是开发者持续追问的方向。

---

## 6) 开发者关注点

- **“更新即回归”仍是最大焦虑。** Windows、macOS、VS Code 扩展和桌面应用在更新后出现路径解析失败、卡死、崩溃、同步异常，开发者最怕的是“本来可用、升级后坏掉”。  
  参考：[#34782](https://github.com/openai/codex/issues/34782)、[#34810](https://github.com/openai/codex/issues/34810)、[#34768](https://github.com/openai/codex/issues/34768)

- **安全策略需要更可解释、更可控。** 多个反馈都在说“Trusted Access / Cyber safety checks / content can’t be shown”过于保守，实际阻碍工作而非保护工作。  
  参考：[#34790](https://github.com/openai/codex/issues/34790)、[#34780](https://github.com/openai/codex/issues/34780)、[#34791](https://github.com/openai/codex/issues/34791)

- **远程控制、沙箱和 computer-use 场景仍偏脆弱。** 一旦 broker、ACL、插件或 remote control 出问题，用户就会感知为“整个 AI 开发工具失效”。  
  参考：[#34842](https://github.com/openai/codex/issues/34842)、[#34815](https://github.com/openai/codex/issues/34815)、[#34764](https://github.com/openai/codex/issues/34764)

- **历史一致性与会话完整性越来越重要。** 用户不只要“能聊”，还要“能回溯、能同步、能跨设备继续”。  
  参考：[#34843](https://github.com/openai/codex/issues/34843)、[#34803](https://github.com/openai/codex/issues/34803)、[#34767](https://github.com/openai/codex/issues/34767)

- **模型与 provider 生态的可扩展性在上升。** 自定义 provider、multi-agent、web search、插件目录等方向的 PR 很活跃，说明 Codex 正在向更开放的工具平台演进。  
  参考：[#34846](https://github.com/openai/codex/pull/34846)、[#34845](https://github.com/openai/codex/pull/34845)、[#34849](https://github.com/openai/codex/pull/34849)

如果你愿意，我可以进一步把这份日报整理成：
- **适合发微信群/Slack 的短版**
- **适合内部周报的管理层摘要版**
- **按“产品 / 客户端 / CLI / 扩展 / 平台”分类的技术版**

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报｜2026-07-23

## 1) 今日速览
今天 Gemini CLI 的节奏很明确：**一边是持续的小版本发布与 triage 自动化推进，一边是围绕模型可用性、认证、工具执行稳定性的问题集中暴露**。从社区反馈看，最受关注的仍是 **模型选择器、IDE/插件集成、以及 agent 执行链路的可靠性**。  
链接：项目主页 [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

---

## 2) 版本发布

- **v0.53.0-preview.0**：重点修复了 core/a2a 场景下的工具响应处理，避免因取消态 tool response 和连续 role 合并问题引发 **400 Bad Request**；同时继续推进 **caretaker-triage**，加入了 LLM triage orchestrator 和容器构建能力。  
  链接：[Release v0.53.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.53.0-preview.0)

- **v0.52.0**：主要是 workspace/context 与 CI 相关的整理，包含将临时 CI 配置文件排除在 workspace context 之外；同时也补上了 **caretaker-triage** 的基础 worker 模块。  
  链接：[Release v0.52.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.52.0)

---

## 3) 社区热点 Issues

> 注：以下 10 条综合了**最新更新的 Issues**与**近期被 PR 明确跟进的高关注问题**，更能反映当前社区热点。

1. **[#28483 Gemini Flash 3.6 is missing from the model selector](https://github.com/google-gemini/gemini-cli/issues/28483)**  
   这是最直接的产品可用性问题之一：模型选择器里缺失新模型，用户会立刻感知到“不能选、不能用”。该 issue 有 **7 条评论、1 个赞**，讨论活跃，且已被快速修复跟进。  
   社区反应：高频反馈、影响面明确。  

2. **[#28482 Silent yield failures](https://github.com/google-gemini/gemini-cli/issues/28482)**  
   属于 **P1** 级别问题，影响 agent 的计划-执行闭环；“静默失败”类问题往往最难排查，也最影响信任感。虽然评论数不多，但优先级最高，说明严重性远高于表面热度。  
   社区反应：严重但难复现，典型高风险故障。  

3. **[#28479 GeminiCLI.com Feedback: [ISSUE]](https://github.com/google-gemini/gemini-cli/issues/28479)**  
   来自 GeminiCLI.com 的反馈入口，描述了 **JetBrains Rider + ACP 插件 + Gemini API Key** 的报错场景，目前标记为 need-information，说明维护者在补齐环境信息。该 issue 有 **5 条评论**，属于正在来回确认的集成问题。  
   社区反应：反馈链路活跃，偏“集成兼容”类痛点。  

4. **[#28477 Support Open-source LLM providers alongside Gemini](https://github.com/google-gemini/gemini-cli/issues/28477)**  
   这是非常明确的平台诉求：用户希望 **Gemini CLI 支持开放式/第三方 LLM provider**。相关修复 PR 已出现，说明该需求已进入正式跟进阶段。  
   社区反应：需求方向清晰，且具备扩展生态的意味。  

5. **[#28473 OAuth login deprecation error and package hallucination in chat interface](https://github.com/google-gemini/gemini-cli/issues/28473)**  
   这是认证和对话体验两类问题叠加：OAuth 登录弃用报错 + chat 界面出现 package hallucination。此类问题会直接打击用户对 CLI 的稳定性预期，已由 PR 闭环。  
   社区反应：影响登录与交互可信度，修复优先级高。  

6. **[#28445 can i add image generation model configs for nano banana ?](https://github.com/google-gemini/gemini-cli/issues/28445)**  
   用户在问的是“能否配置图像生成模型”，本质上反映了 **多模态模型配置能力** 的需求增长。相关 PR 已经跟进，说明这是一个真实且明确的扩展诉求。  
   社区反应：功能型需求，偏多模态扩展。  

7. **[#28392 temporary directory leak for background shell executions](https://github.com/google-gemini/gemini-cli/issues/28392)**  
   后台 shell 执行存在临时目录泄漏，属于典型资源管理问题。长期看会影响稳定性与磁盘清理，是基础设施质量问题，不会像功能需求那样“显眼”，但很关键。  
   社区反应：低噪音、高价值的稳定性修复点。  

8. **[#28361 tools.core wildcard DENY silently excluding all MCP tools](https://github.com/google-gemini/gemini-cli/issues/28361)**  
   这是 policy/权限规则的高风险问题：一个 wildcard DENY 竟然会**静默地把 MCP 工具全排除**。此类问题对工具生态影响极大，已被修复为仅作用于 built-in tools。  
   社区反应：属于“规则一旦出错就大面积失效”的核心 bug。  

9. **[#27790 disposable leak in VSCode IDE companion](https://github.com/google-gemini/gemini-cli/issues/27790)**  
   IDE companion 的 disposable 泄漏说明插件生命周期管理仍需打磨。对于强调 IDE 集成的产品，这类问题会直接影响用户在 VS Code 等环境中的长期使用体验。  
   社区反应：IDE 集成质量问题，值得持续跟踪。  

10. **[#25693 skill loader descriptions regression tests](https://github.com/google-gemini/gemini-cli/issues/25693)**  
    虽然是测试/回归类议题，但它说明社区已经开始关注 **skill loader 的解析边界**，尤其是描述字段格式兼容性。对应 PR 已补上回归测试，体现出项目对可维护性的重视。  
    社区反应：偏工程质量，属于“防回归”型需求。  

---

## 4) 重要 PR 进展

1. **[#28509 fix(core): filter out thought parts from getHistoryTurns when context management is disabled](https://github.com/google-gemini/gemini-cli/pull/28509)**  
   过滤掉 history turns 中的 thought parts，避免在 context management 关闭时出现思维链泄露或重复推理块。  
   影响：提升现代模型下的历史上下文一致性与安全性。

2. **[#28506 fix(cli): propagate AbortSignal in /compress command](https://github.com/google-gemini/gemini-cli/pull/28506)**  
   为 `/compress` 传递 AbortSignal，让背景压缩可被取消，避免新输入或 Escape 后仍残留网络请求。  
   影响：改善命令可中断性和资源回收。

3. **[#28499 fix(policy): restrict tools.core wildcard DENY to built-in tools only](https://github.com/google-gemini/gemini-cli/pull/28499)**  
   修复 wildcard DENY 误伤全部 MCP 工具的问题，并通过 excludeMcp 让规则仅作用于内置工具。  
   影响：这是 policy 系统的关键修复，避免工具生态被静默破坏。

4. **[#28496 fix(core): resolve temporary directory leak for background shell executions](https://github.com/google-gemini/gemini-cli/pull/28496)**  
   解决后台 shell 执行导致的临时目录泄漏。  
   影响：减少磁盘/环境残留，提升长期运行稳定性。

5. **[#28494 fix(vscode-ide-companion): remove comma operator wrapping in activate()](https://github.com/google-gemini/gemini-cli/pull/28494)**  
   清理 activate() 中的逗号运算符包裹，修复 disposable 泄漏，保证 deactivation 能正确清理。  
   影响：VS Code 扩展生命周期更可靠。

6. **[#28492 fix(cli): add gemini-3.5-flash to model selector](https://github.com/google-gemini/gemini-cli/pull/28492)**  
   直接回应模型选择器缺失问题，补上 gemini-3.5-flash。  
   影响：提升模型可用性，降低用户“找不到模型”的摩擦。

7. **[#28500 fix: address issue #28473 - OAuth login deprecation error and package hallucination in chat interface](https://github.com/google-gemini/gemini-cli/pull/28500)**  
   修复 OAuth 登录弃用报错，并处理 chat 界面的包名幻觉问题。  
   影响：认证流程和对话输出可靠性同步提升。

8. **[#28498 fix: address issue #28477 - Support Open-source LLM providers alongside Gemini](https://github.com/google-gemini/gemini-cli/pull/28498)**  
   推进开放式 LLM provider 支持，方向上是生态扩展的关键一步。  
   影响：如果持续推进，会显著增强 Gemini CLI 的多模型兼容能力。

9. **[#28493 fix: resolve disposable leak, URL sanitization, and add regression tests](https://github.com/google-gemini/gemini-cli/pull/28493)**  
   一次性处理 disposable 泄漏、URL 清洗问题，并补回归测试。  
   影响：兼顾安全性、稳定性和可维护性。

10. **[#28491 test(core): add regression tests for skill loader descriptions](https://github.com/google-gemini/gemini-cli/pull/28491)**  
    为 SKILL.md parser 的单行/含冒号描述增加回归测试。  
    影响：降低扩展/技能加载在格式边界上的回归风险。

---

## 5) 功能需求趋势

1. **模型可用性与选择器完善**  
   代表问题：模型选择器缺失新模型、图像生成模型配置需求。  
   链接：[#28483](https://github.com/google-gemini/gemini-cli/issues/28483), [#28445](https://github.com/google-gemini/gemini-cli/issues/28445)

2. **多 provider / 多模型生态支持**  
   社区不满足于只接 Gemini，希望能并行接入开放式 LLM provider。  
   链接：[#28477](https://github.com/google-gemini/gemini-cli/issues/28477), [#28498](https://github.com/google-gemini/gemini-cli/pull/28498)

3. **IDE / 插件集成稳定性**  
   JetBrains Rider、VS Code companion 等集成场景的问题持续出现，说明 IDE 生态已是重要使用入口。  
   链接：[#28479](https://github.com/google-gemini/gemini-cli/issues/28479), [#27790](https://github.com/google-gemini/gemini-cli/issues/27790), [#28494](https://github.com/google-gemini/gemini-cli/pull/28494)

4. **agent 执行链路可靠性**  
   silent yield failures、AbortSignal 传递、background shell 清理，都指向“执行过程必须可取消、可恢复、可观测”。  
   链接：[#28482](https://github.com/google-gemini/gemini-cli/issues/28482), [#28506](https://github.com/google-gemini/gemini-cli/pull/28506), [#28496](https://github.com/google-gemini/gemini-cli/pull/28496)

5. **policy / 工具权限控制精细化**  
   MCP 工具不能被错误规则一刀切屏蔽，说明社区对工具权限表达的精度要求在提升。  
   链接：[#28361](https://github.com/google-gemini/gemini-cli/issues/28361), [#28499](https://github.com/google-gemini/gemini-cli/pull/28499)

---

## 6) 开发者关注点

1. **“看得见但用不了”的模型问题最敏感**  
   新模型缺失会被用户立即感知，属于最容易形成负反馈的入口问题。  
   链接：[#28483](https://github.com/google-gemini/gemini-cli/issues/28483), [#28492](https://github.com/google-gemini/gemini-cli/pull/28492)

2. **认证与插件链路需要更稳**  
   OAuth 弃用、API key、Rider/ACP 插件报错，说明认证/扩展接入仍是高频痛点。  
   链接：[#28479](https://github.com/google-gemini/gemini-cli/issues/28479), [#28500](https://github.com/google-gemini/gemini-cli/pull/28500)

3. **agent 必须“可取消、可恢复、不会静默失败”**  
   这类问题直接影响用户对自动化执行的信任。  
   链接：[#28482](https://github.com/google-gemini/gemini-cli/issues/28482), [#28506](https://github.com/google-gemini/gemini-cli/pull/28506)

4. **上下文管理与 thought 泄露需要持续收紧**  
   这说明内部推理内容、历史回放和现代模型兼容性都在快速演进。  
   链接：[#28509](https://github.com/google-gemini/gemini-cli/pull/28509)

5. **资源泄漏和生命周期清理是长期维护重点**  
   临时目录、disposable、后台 shell 请求等问题都指向“长时间运行后是否干净退出”。  
   链接：[#28392](https://github.com/google-gemini/gemini-cli/issues/28392), [#28496](https://github.com/google-gemini/gemini-cli/pull/28496), [#28494](https://github.com/google-gemini/gemini-cli/pull/28494)

6. **caretaker-triage 说明项目正在强化自动分诊能力**  
   版本发布里连续出现 triage 相关工作，意味着维护侧在用自动化提升 issue 处理效率。  
   链接：[v0.53.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.53.0-preview.0), [v0.52.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.52.0)

---

如果你愿意，我还可以把这份日报再压缩成 **“适合发群里的 200 字摘要版”**，或者改成 **表格版周报模板**。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

以下为 **2026-07-23 GitHub Copilot CLI 社区动态日报**（数据窗口：过去 24 小时）。

## 1) 今日速览
今天 Copilot CLI 的节奏是“**连续补丁发布 + 集中暴露稳定性/集成性问题**”。新版开始引入 `gemini-3.6-flash` 与默认 sandbox 引导，同时社区反馈仍高度聚焦于 **IDE/远程环境集成、tmux/Windows 兼容性、计划模式误拦截、子代理执行稳定性** 等核心体验问题。  
整体看，产品在功能扩展，但工程侧仍处在高频修复与体验打磨阶段。  
链接：仓库首页 <https://github.com/github/copilot-cli>

---

## 2) 版本发布
### v1.0.74-3
- 仅显示为 **Fixes and changes**，说明是一次小范围修复/热更新。
- 链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.74-3>

### v1.0.74-2
- 同样仅显示为 **Fixes and changes**，推测为对前一版的补丁延续。
- 链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.74-2>

### v1.0.74-1
- 新增 **首次运行引导**，提示用户选择默认 sandbox。
- 新增 **gemini-3.6-flash** 支持，模型能力继续扩展。
- 改进 **会话多路复用**：切换会话时，弹窗状态不再串台。
- 改进 `$` 交互式 shell 快捷入口体验（发布说明后半段在数据中被截断）。
- 链接：<https://github.com/github/copilot-cli/releases/tag/v1.0.74-1>

---

## 3) 社区热点 Issues
> 选取最值得关注的 10 个 Issue，按影响面和问题紧迫度综合排序。

1. **#4227 Xcode ACP 自定义 agent 调用失败：始终返回“failed to produce a response”**  
   影响的是 **Copilot CLI 作为 Xcode 自定义 agent** 的核心集成路径，属于高优先级兼容性问题；目前为 triage，暂无评论/点赞。  
   链接：<https://github.com/github/copilot-cli/issues/4227>

2. **#4226 子代理执行期间频繁刷出 server error**  
   直接破坏 fleet / subagent 场景的可用性，属于明显的稳定性回归；问题描述中提到会连续出现 10–15 次重试提示，体感影响很强。当前 triage，暂无社区互动。  
   链接：<https://github.com/github/copilot-cli/issues/4226>

3. **#4225 Coordinator 卡在 “Working”，后台子代理运行但前台输入不被处理**  
   这是典型的 **状态机/调度一致性** 问题，会让用户误以为系统“卡死”；对交互式编排体验影响很大。当前 triage，暂无评论。  
   链接：<https://github.com/github/copilot-cli/issues/4225>

4. **#4224 OTel span 缺少子代理计费属性，外部成本统计会低估真实消耗**  
   这是偏工程/平台侧的关键问题：**可观测性与计费对账不一致**，对团队级成本管理很敏感。当前 triage，暂无互动。  
   链接：<https://github.com/github/copilot-cli/issues/4224>

5. **#4223 在 tmux 中运行时，shell 命令输出正常但永远识别为“still running”**  
   说明 CLI 对终端完成信号的识别存在环境兼容问题，属于 **shell 集成基础能力** 的硬故障。当前 triage，暂无评论。  
   链接：<https://github.com/github/copilot-cli/issues/4223>

6. **#4222 v1.0.72+ 复现主面板冻结/输出被吞（React/Ink 渲染循环回归）**  
   这是较严重的 UI 回归，影响交互输入与输出呈现，且用户明确指出是历史问题 #2802 的回归。当前 triage，暂无互动。  
   链接：<https://github.com/github/copilot-cli/issues/4222>

7. **#4221 权限扫描器把 `git -L` 参数和 shell 命令文本误判为目录路径**  
   属于 **权限门禁误报**，会显著增加用户执行命令时的摩擦，尤其影响高级 shell/ git 工作流。当前 triage，暂无评论。  
   链接：<https://github.com/github/copilot-cli/issues/4221>

8. **#4220 Plan mode 误拦截只读 `gh api` / GraphQL 查询，提示“may modify the workspace”**  
   这是计划模式最关键的可用性问题之一：只读操作被误判为潜在修改，会削弱 plan mode 的价值。当前 triage，暂无评论。  
   链接：<https://github.com/github/copilot-cli/issues/4220>

9. **#4219 Windows 上启用 notifications 后频繁崩溃**  
   这是明确的 **平台级稳定性事故**，且与原生 toast 路径相关，影响面集中但严重。当前 triage，暂无评论。  
   链接：<https://github.com/github/copilot-cli/issues/4219>

10. **#4218 希望可配置 Auto mode 使用的模型池**  
    这是当前唯一明显的功能诉求热点之一，直接关系到 **成本可控性、行为可预测性**；已获得 **6 👍**，是本轮社区需求中反响最强的条目。  
    链接：<https://github.com/github/copilot-cli/issues/4218>

### 补充观察
- **#4217 Windows 退出时崩溃（1 👍）** 也属于高优先级稳定性问题，只是本日报中按优先级未纳入前 10。  
  链接：<https://github.com/github/copilot-cli/issues/4217>

---

## 4) 重要 PR 进展
**过去 24 小时无 PR 更新。**  
因此本日报暂无可列出的 PR 条目。  
PR 列表入口：<https://github.com/github/copilot-cli/pulls>

---

## 5) 功能需求趋势
从过去 24 小时的 Issues 看，社区关注点主要集中在以下方向：

1. **IDE 集成与远程环境兼容**
   - Xcode ACP、自定义 agent、VS Code remote container、SSH/container 场景都在被持续验证。
   - 链接代表：#4227、#4216  
   - #4216：<https://github.com/github/copilot-cli/issues/4216>

2. **终端与 shell 生态兼容**
   - tmux、shell completion、命令完成检测、交互式 shell 快捷键等，都是高频痛点。
   - 链接代表：#4223、#4221  
   - #4223：<https://github.com/github/copilot-cli/issues/4223>  
   - #4221：<https://github.com/github/copilot-cli/issues/4221>

3. **计划模式与权限门禁准确性**
   - 用户希望计划模式能真正做到“只读可用、修改严格拦截”，而不是过度保守。
   - 链接代表：#4220、#4221  
   - #4220：<https://github.com/github/copilot-cli/issues/4220>

4. **子代理 / Agent 编排稳定性**
   - subagent 执行、队列状态、协调器工作流一致性，是当前体验的核心风险点。
   - 链接代表：#4226、#4225、#4224  
   - #4226：<https://github.com/github/copilot-cli/issues/4226>  
   - #4225：<https://github.com/github/copilot-cli/issues/4225>  
   - #4224：<https://github.com/github/copilot-cli/issues/4224>

5. **Windows 平台稳定性**
   - 启动、退出、通知、渲染路径都存在崩溃/回归反馈，说明原生平台适配仍是重点。
   - 链接代表：#4219、#4217、#4222  
   - #4219：<https://github.com/github/copilot-cli/issues/4219>  
   - #4217：<https://github.com/github/copilot-cli/issues/4217>  
   - #4222：<https://github.com/github/copilot-cli/issues/4222>

6. **模型选择与成本控制**
   - 用户开始明确要求：不仅要“能用”，还要“可控、可预测、可审计”。
   - 链接代表：#4218、#4224  
   - #4218：<https://github.com/github/copilot-cli/issues/4218>  
   - #4224：<https://github.com/github/copilot-cli/issues/4224>

---

## 6) 开发者关注点
开发者反馈里最突出的痛点可以概括为四类：

- **误判太多**：计划模式、权限扫描器、shell 完成检测都存在“过度保守”或识别错误。  
- **状态不一致**：前台显示 Working、后台实际行为、会话切换后弹窗状态等，说明交互状态机仍需强化。  
- **平台兼容性不足**：tmux、Windows、Xcode、remote container 等环境差异明显，容易触发回归。  
- **可观测性与成本透明度不足**：子代理计费属性缺失、Auto mode 模型选择不可控，都是团队使用时的关键诉求。  

链接汇总：  
- #4221：<https://github.com/github/copilot-cli/issues/4221>  
- #4220：<https://github.com/github/copilot-cli/issues/4220>  
- #4225：<https://github.com/github/copilot-cli/issues/4225>  
- #4224：<https://github.com/github/copilot-cli/issues/4224>  
- #4218：<https://github.com/github/copilot-cli/issues/4218>  

如果你愿意，我可以把这份日报进一步整理成 **适合 Slack/飞书发布的短版**，或者输出为 **表格版（Issue / 影响 / 反响 / 优先级）**。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报  
**日期：2026-07-23**  
数据源：`github.com/MoonshotAI/kimi-cli`

---

## 1) 今日速览
今天社区讨论的焦点主要集中在 **API 兼容性、子代理模型路由能力、Windows 终端稳定性** 三个方向。  
本日 **无新 Release、无更新 PR**，但 Issues 出现了一个比较典型的“升级后兼容性回归”问题，以及两个高价值需求/稳定性反馈，说明社区仍在围绕实际落地场景快速反馈。

---

## 2) 版本发布
**无新 Release。**  
过去 24 小时未发现新版本发布记录。

---

## 3) 社区热点 Issues
> 过去 24 小时内共更新 3 条 Issue，以下全部为今日重点关注项。

### 1. [#2534] Model API error 400：`prompt_cache_key` 参数不被支持  
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2534>  
- 重要性：这是一个**升级后 API 兼容性回归**问题，影响使用第三方 API / Nvidia NIM 模型的用户，且报错明确指向 `prompt_cache_key` 参数不被支持，可能直接阻断请求。  
- 社区反应：当前 **0 评论、0 点赞**，说明问题刚出现，但影响面可能不小。  
- 关键信号：Kimi Code CLI 在对接不同厂商模型时，参数透传/适配层需要更稳健。

### 2. [#2533] Feature Request：为 sub-agent 提供独立模型选择能力  
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2533>  
- 重要性：这是一个很典型的**多代理工作流能力诉求**。用户希望子代理可以按任务成本和复杂度选择不同模型，这对复杂自动化场景非常关键。  
- 社区反应：当前 **0 评论、0 点赞**，但需求本身方向明确，属于潜在高价值功能。  
- 关键信号：社区开始从“单会话模型选择”转向“**代理级模型编排**”。

### 3. [#2532] `kimi web` 在 Windows 下 stdout 重定向时启动崩溃（GBK 编码问题）  
- 链接：<https://github.com/MoonshotAI/kimi-cli/issues/2532>  
- 重要性：这是一个**平台兼容性/国际化稳定性**问题，影响中文环境 Windows 用户的实际启动流程，属于高优先级体验问题。  
- 社区反应：当前 **0 评论、0 点赞**，但属于容易复现且影响启动的阻断型 bug。  
- 关键信号：CLI 输出字符集处理、banner 渲染、重定向场景下的编码兼容仍需加强。

> 说明：本日报仅发现 3 条更新 Issue，因此已全部纳入“热点”分析。

---

## 4) 重要 PR 进展
**过去 24 小时内无 PR 更新。**  
- PR 列表页：<https://github.com/MoonshotAI/kimi-cli/pulls>  
- 结论：暂无可追踪的合并/修复进展，今天的社区信号主要来自 Issues。

---

## 5) 功能需求趋势
从当前 Issues 可提炼出社区最关注的功能方向：

1. **模型兼容性与第三方 API 适配**
   - 关注点：参数透传、不同供应商模型接口差异、升级后兼容性回归。
   - 对应 Issue：[#2534](https://github.com/MoonshotAI/kimi-cli/issues/2534)

2. **多代理/子代理编排能力**
   - 关注点：sub-agent 独立模型选择、按任务分配不同成本层级模型。
   - 对应 Issue：[#2533](https://github.com/MoonshotAI/kimi-cli/issues/2533)

3. **Windows 平台稳定性与终端编码兼容**
   - 关注点：stdout 重定向、GBK 编码、启动 banner 输出、中文环境兼容。
   - 对应 Issue：[#2532](https://github.com/MoonshotAI/kimi-cli/issues/2532)

---

## 6) 开发者关注点
今天社区反馈暴露出几个开发侧需要重点关注的痛点：

- **参数兼容边界不够清晰**  
  第三方模型/平台接入时，CLI 需要更严格地处理“哪些参数能传、哪些不能传”，避免因新增参数导致请求失败。

- **代理级配置能力不足**  
  子代理仍沿用会话默认模型的设计，限制了“便宜模型做简单任务、强模型做复杂任务”的分层调度思路。

- **Windows 中文环境下的输出稳定性**  
  启动阶段打印 banner、重定向输出、编码转换等细节，仍可能造成直接崩溃，这类问题会显著影响 CLI 的可用性口碑。

- **问题尚处于早期反馈阶段**  
  这 3 条 Issue 均为 0 评论、0 点赞，说明社区讨论刚起步，但也意味着这是开发团队快速响应并建立信任的窗口期。

---

如果你愿意，我也可以把这份日报进一步整理成：
1. **适合发飞书/企业微信的短版**  
2. **适合管理层看的摘要版**  
3. **按“风险优先级”排序的研发跟踪版**

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-07-23）

## 1) 今日速览
今天社区讨论几乎全部围绕“可用性阻断”和“稳定性回归”展开：一类是工具/模型调用报错、启动崩溃、内存溢出等影响核心工作流的问题；另一类是新会话、模式切换、项目/会话排序等 UI 与状态流问题。  
同时，PR 侧明显在修复 V2 迁移后的兼容性、模型加载、主题与无障碍体验，说明当前主线仍是“稳定性修复 + V2 收敛”。

---

## 2) 版本发布
- **今日未见正式版本 Release。**  
  过去 24 小时仅出现了 `pr-38252-videos`（PR #38252 的验证视频产物），更像是验证素材而非面向用户的正式发布。  
  参考：<https://github.com/anomalyco/opencode/releases>

---

## 3) 社区热点 Issues

> 说明：以下优先挑选“影响核心使用、报障频繁、或存在明显回归/兼容性风险”的 Issue。

1. **#38400 `erro opencode`** — 工具层全面报错，`bash/read/glob/grep/webfetch/websearch` 全部受影响，属于“完全不可用”的阻断级问题；已有 2 条评论，说明社区在快速追踪。  
   https://github.com/anomalyco/opencode/issues/38400

2. **#38356 `Subagent task corrupted files by writing null bytes instead of content`** — 子代理写入空字节导致文件损坏，这是数据完整性问题，优先级非常高；已有 2 条评论，反映出问题影响面不小。  
   https://github.com/anomalyco/opencode/issues/38356

3. **#38333 `New Session uses the wrong model when an agent is selected`** — 新建会话时模型选择错误，会直接影响任务执行结果，属于“看似可用、实则跑偏”的高风险回归；已有 2 条评论。  
   https://github.com/anomalyco/opencode/issues/38333

4. **#38329 `kimi-k2.6 fails with HTTP 400 ... thinking and reasoning_effort`** — OpenCode Go 与 Kimi K2.6 的参数冲突，体现出新模型/新 provider 的适配问题；已有 2 条评论，属于模型兼容性热点。  
   https://github.com/anomalyco/opencode/issues/38329

5. **#38362 `OOM crash on startup`** — Desktop 启动即 OOM，直接导致应用无法进入可用状态；这是典型的高优先级稳定性问题。  
   https://github.com/anomalyco/opencode/issues/38362

6. **#38366 `Bun crashes ... when several opencode instances launch concurrently`** — 多实例并发启动触发 Bun 崩溃，说明底层运行时/启动链路在并发场景下仍有不稳。  
   https://github.com/anomalyco/opencode/issues/38366

7. **#38326 `tui: /sessions no longer prioritizes sessions from the current cwd`** — `/sessions` 不再优先显示当前目录相关会话，属于明显的工作流退化；虽然只有 2 条评论，但对重度用户影响直接。  
   https://github.com/anomalyco/opencode/issues/38326

8. **#38323 `Request blocked by upstream provider`** — 所有请求都被上游 provider 拦截，属于“外部依赖不可用”型故障，容易引发大面积使用中断。  
   https://github.com/anomalyco/opencode/issues/38323

9. **#38368 `Assinei Opencode Go`** — 用户订阅后仍提示 `Free usage exceeded, subscribe to Go`，属于付费状态与权限同步问题，影响商业转化和信任。  
   https://github.com/anomalyco/opencode/issues/38368

10. **#38364 `Unable to toggle between Plan and Build mode`** — Plan/Build 模式切换失效，会直接影响产品主流程；虽评论不多，但属于核心交互故障。  
   https://github.com/anomalyco/opencode/issues/38364

---

## 4) 重要 PR 进展

1. **#38408 `fix: pr-standards falsely flags v2-based PRs as missing a linked issue`** — 修复 PR 规范检查对 V2 分支 PR 的误判，减少贡献流程中的“假失败”。  
   https://github.com/anomalyco/opencode/pull/38408

2. **#38406 `[needs:issue] fix(core): retry failed location boot instead of caching the failure for the idle TTL`** — 修复位置启动失败后被缓存 60 分钟的问题，改为重试，更符合故障恢复预期。  
   https://github.com/anomalyco/opencode/pull/38406

3. **#38403 `[contributor, beta] fix(ui): standardize tooltip delay`** — 统一 tooltip 延迟、优化模型选择器提示交互，属于细节体验收敛。  
   https://github.com/anomalyco/opencode/pull/38403

4. **#38401 `[contributor] fix(core): load dynamic models for generation`** — 让 `/api/generate` 支持动态加载的 AI SDK / 原生 provider 模型，补齐 Gemini 等动态模型路径。  
   https://github.com/anomalyco/opencode/pull/38401

5. **#38398 `[contributor] feat(tui): add turn token usage diagnostics`** — 增加 turn token 使用诊断，帮助定位长会话 token 膨胀和计费异常。  
   https://github.com/anomalyco/opencode/pull/38398

6. **#38397 `refactor(tui): generate syntax from V2 theme`** — 将 TUI 语法样式直接从 V2 token 生成，推进主题体系统一。  
   https://github.com/anomalyco/opencode/pull/38397

7. **#38395 `docs: mention Exa and Parallel as web search backends`** — 补充 websearch 文档对 Exa / Parallel 双后端支持的说明，降低文档与实现不一致。  
   https://github.com/anomalyco/opencode/pull/38395

8. **#38393 `fix(a11y): expose streaming assistant content to screen readers`** — 修复流式输出对读屏器不可见的问题，提升无障碍可访问性。  
   https://github.com/anomalyco/opencode/pull/38393

9. **#38387 `[contributor] fix(session): end the turn loop by reply parent, not message ID order`** — 修复会话轮次判断逻辑，避免因 message ID 顺序导致的 turn loop 错误。  
   https://github.com/anomalyco/opencode/pull/38387

10. **#38385 `fix(opencode): refresh projects after git init`** — 解决先打开项目、后执行 `git init` 时工作区状态不刷新的问题。  
   https://github.com/anomalyco/opencode/pull/38385

---

## 5) 功能需求趋势

从今天的 Issues 看，社区关注点主要集中在以下几个方向：

1. **模型与 Provider 兼容性**
   - Kimi、Gemini、OpenAI Bedrock 等新模型路径的适配与参数冲突修复。
   - 相关问题：  
     #38329 https://github.com/anomalyco/opencode/issues/38329  
     #38323 https://github.com/anomalyco/opencode/issues/38323  
     #38368 https://github.com/anomalyco/opencode/issues/38368

2. **稳定性与恢复能力**
   - 启动 OOM、Bun 崩溃、失败状态缓存过久、并发启动异常等都在增多。
   - 相关问题：  
     #38362 https://github.com/anomalyco/opencode/issues/38362  
     #38366 https://github.com/anomalyco/opencode/issues/38366  
     #38404 https://github.com/anomalyco/opencode/issues/38404

3. **工作流与会话管理体验**
   - 新会话、模式切换、`/sessions` 排序、项目切换等都属于高频操作，任何回归都会被快速感知。
   - 相关问题：  
     #38333 https://github.com/anomalyco/opencode/issues/38333  
     #38364 https://github.com/anomalyco/opencode/issues/38364  
     #38326 https://github.com/anomalyco/opencode/issues/38326  
     #38411 https://github.com/anomalyco/opencode/issues/38411

4. **工具链与权限语义**
   - `read` 工具输出格式、glob 权限匹配、bash 行为、websearch 后端说明，都反映出工具层一致性和可预期性需求在提升。
   - 相关问题：  
     #38348 https://github.com/anomalyco/opencode/issues/38348  
     #38351 https://github.com/anomalyco/opencode/issues/38351  
     #38402 https://github.com/anomalyco/opencode/issues/38402  
     #38371 https://github.com/anomalyco/opencode/issues/38371

5. **IDE / Desktop / Web 集成**
   - VS Code 扩展、Web UI 新会话按钮、跨设备同步等，说明社区对“多入口、一致状态”的需求在增强。
   - 相关问题：  
     #38376 https://github.com/anomalyco/opencode/issues/38376  
     #38411 https://github.com/anomalyco/opencode/issues/38411

---

## 6) 开发者关注点

今天的反馈里，开发者最需要关注的是以下几类痛点：

- **“能不能先稳定跑起来”**：启动 OOM、并发崩溃、上游 provider 拦截、工具层全体报错，都是阻断式问题。  
  代表：#38362、#38366、#38323、#38400  
  https://github.com/anomalyco/opencode/issues/38362  
  https://github.com/anomalyco/opencode/issues/38366  
  https://github.com/anomalyco/opencode/issues/38323  
  https://github.com/anomalyco/opencode/issues/38400

- **状态一致性问题正在放大**：新会话模型、session 排序、git init 后项目刷新、Plan/Build 切换，这些都指向“UI 状态和后端状态不同步”。  
  代表：#38333、#38326、#38385、#38364  
  https://github.com/anomalyco/opencode/issues/38333  
  https://github.com/anomalyco/opencode/issues/38326  
  https://github.com/anomalyco/opencode/issues/38385  
  https://github.com/anomalyco/opencode/issues/38364

- **模型生态扩展带来的兼容性成本**：越多 provider / 模型接入，越容易出现参数冲突、动态加载失败、分支行为不一致。  
  代表：#38329、#38401、#38323  
  https://github.com/anomalyco/opencode/issues/38329  
  https://github.com/anomalyco/opencode/pull/38401  
  https://github.com/anomalyco/opencode/issues/38323

- **长会话与资源控制开始成为主线**：token 累积、内存膨胀、低 RAM 崩溃，说明大上下文场景下的资源治理是下一阶段重点。  
  代表：#38344、#38362、PR #38398  
  https://github.com/anomalyco/opencode/issues/38344  
  https://github.com/anomalyco/opencode/issues/38362  
  https://github.com/anomalyco/opencode/pull/38398

- **文档与实现一致性需要持续维护**：websearch 后端、read 工具输出、权限 glob 语义等都在提示“文档过时会直接影响使用”。  
  代表：#38371、#38348、#38351、PR #38395  
  https://github.com/anomalyco/opencode/issues/38371  
  https://github.com/anomalyco/opencode/issues/38348  
  https://github.com/anomalyco/opencode/issues/38351  
  https://github.com/anomalyco/opencode/pull/38395

如果你希望，我可以把这份日报进一步整理成：
- **适合公众号/飞书的短版**
- **适合团队晨会的 1 页版**
- **带“风险等级 / 优先级”标签的运维视图**

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/badlogic/pi-mono">badlogic/pi-mono</a></summary>

# Pi 社区动态日报（2026-07-23）

## 1. 今日速览
过去 24 小时内，仓库**没有新 Release**，但 Issues 和 PR 依然非常活跃，重点集中在 **模型/Provider 兼容性、TUI 稳定性、扩展能力** 三条主线。  
从提交内容看，社区正在持续修复多后端接入、工具调用并发、终端交互与缓存一致性等“高频痛点”，且不少问题已经进入关闭或合并流程，响应速度较快。

---

## 2. 社区热点 Issues

1. [#6940 OpenRouter cache breakpoint stops before tool results](https://github.com/earendil-works/pi/issues/6940)  
   这是今天讨论最集中的问题之一，**4 条评论**，核心是 Anthropic 经由 OpenRouter 时，缓存断点在连续 tool-only turn 中不前进，直接影响 token 成本与上下文稳定性。

2. [#6975 TUI startup benchmark always exits before entering interactive mode](https://github.com/earendil-works/pi/issues/6975)  
   **2 条评论**，看似是基准测试问题，但它影响启动性能评估与回归验证，属于“开发体验”层面的关键故障。

3. [#6972 Package Report: pi-goal-x](https://github.com/earendil-works/pi/issues/6972)  
   **2 条评论**，涉及扩展在多会话/多终端下的状态串扰，被标记为 **Malicious or unsafe behavior**，安全与隔离性都值得关注。

4. [#6957 aws-bedrock provider ignores profile when there are AWS_* environment vars present](https://github.com/earendil-works/pi/issues/6957)  
   影响 AWS Bedrock 鉴权与配置优先级，属于典型的“环境变量覆盖配置”问题，容易导致用户误判模型来源。

5. [#6989 File mutation preconditions run before the per-file queue](https://github.com/earendil-works/pi/issues/6989)  
   标记为 **P0**，虽然只有 1 条评论，但它触及文件变更与并发队列的执行顺序，是工具链一致性问题中的高优先级项。

6. [#6978 Interactive TUI: concurrent extension dialogs hang (orphaned Promise)](https://github.com/earendil-works/pi/issues/6978)  
   扩展对话并发时会挂起，直接造成会话卡死，属于 TUI/扩展协作的高风险故障。

7. [#6973 Windows: Kitty/modifyOtherKeys + VT-input negotiation breaks arrow keys and Escape](https://github.com/earendil-works/pi/issues/6973)  
   聚焦 Windows + 嵌套 ConPTY 场景，方向键和 Escape 失效，说明终端兼容性仍是社区重点痛点。

8. [#6963 anthropic-messages: think-only response ends the turn silently](https://github.com/earendil-works/pi/issues/6963)  
   模型只返回 thinking、不返回文本时，turn 静默结束，容易造成“看起来没报错、实际任务中断”的体验问题。

9. [#6959 Expose provider rate-limit / subscription usage to extensions](https://github.com/earendil-works/pi/issues/6959)  
   开发者希望把订阅/限流信息暴露给扩展，说明大家对“可观测性”和“状态透明”需求很强。

10. [#6956 Support extraBody in models.json for provider-specific parameters](https://github.com/earendil-works/pi/issues/6956)  
    这是多 Provider 适配的典型诉求，尤其适用于 OpenAI-compatible 厂商的私有参数扩展，直接关系到接入灵活性。

---

## 3. 重要 PR 进展

1. [#6987 fix(tui): align grapheme widths with terminal cells](https://github.com/earendil-works/pi/pull/6987)  
   处理宽字符/字素簇与终端单元格宽度不一致的问题，属于 TUI 渲染精度修复。

2. [#6980 fix(ai): make provider retries abortable](https://github.com/earendil-works/pi/pull/6980)  
   让 provider 重试支持中断，减少长时间阻塞，对交互式任务非常关键。

3. [#6971 feat(coding-agent): emit bash_execution_update events](https://github.com/earendil-works/pi/pull/6971)  
   新增 bash 执行更新事件，方便前端/插件做并行执行态展示。

4. [#6967 feat(coding-agent): expose session metadata to bash tools](https://github.com/earendil-works/pi/pull/6967)  
   把会话元信息暴露给 bash 工具，便于子进程识别当前 session、provider、model 等上下文。

5. [#6960 feat(ai): add StepFun providers](https://github.com/earendil-works/pi/pull/6960)  
   新增 StepFun 系列 provider，继续扩大可接入模型生态。

6. [#6955 handle openai websocket previous_response_not_found error](https://github.com/earendil-works/pi/pull/6955)  
   修复 OpenAI WebSocket 场景下的 previous response 丢失问题，增强连接恢复能力。

7. [#6946 fix(ai): retry DNS transport failures](https://github.com/earendil-works/pi/pull/6946)  
   将 DNS 解析类网络失败纳入可重试范围，提升线上稳定性。

8. [#6945 fix(coding-agent): compact during long tool runs](https://github.com/earendil-works/pi/pull/6945)  
   长时间 tool loop 中支持压缩与恢复，解决上下文膨胀问题。

9. [#6941 fix(ai): cache OpenRouter tool results](https://github.com/earendil-works/pi/pull/6941)  
   直接对应缓存断点问题，修复 tool result 场景下的缓存推进逻辑。

10. [#6942 fix(tui): match alt+letter keys before Kitty protocol negotiation completes](https://github.com/earendil-works/pi/pull/6942)  
    修复启动初期 Alt+字母快捷键失效，提升 TUI 初始可用性。

---

## 4. 功能需求趋势

1. **多模型 / 多 Provider 兼容性持续增强**  
   社区仍在集中推进 Anthropic、OpenRouter、Bedrock、OpenAI、Qwen、llama.cpp、StepFun 等后端适配。  
   代表性问题：[#6940](https://github.com/earendil-works/pi/issues/6940)、[#6957](https://github.com/earendil-works/pi/issues/6957)、[#6956](https://github.com/earendil-works/pi/issues/6956)、[#6963](https://github.com/earendil-works/pi/issues/6963)

2. **TUI 终端交互与跨平台兼容仍是高频需求**  
   键盘输入、宽字符渲染、Windows ConPTY、启动态快捷键等问题反复出现，说明交互稳定性是核心体验基线。  
   代表性问题：[#6973](https://github.com/earendil-works/pi/issues/6973)、[#6975](https://github.com/earendil-works/pi/issues/6975)

3. **扩展 SDK / Hook 能力需求上升**  
   开发者希望拿到更多 session、provider、UI 渲染与资源发现的上下文，以便做深度定制。  
   代表性问题：[#6959](https://github.com/earendil-works/pi/issues/6959)、[#6954](https://github.com/earendil-works/pi/issues/6954)、[#6988](https://github.com/earendil-works/pi/issues/6988)

4. **工具执行并发与任务流控制需要更稳**  
   包括 tool 队列、并发对话、重试中断、长任务压缩、文件 mutation 顺序等，说明 coding-agent 的执行可靠性仍在持续打磨。  
   代表性问题：[#6989](https://github.com/earendil-works/pi/issues/6989)、[#6978](https://github.com/earendil-works/pi/issues/6978)、[#6940](https://github.com/earendil-works/pi/issues/6940)

---

## 5. 开发者关注点

1. **Provider 鉴权、计费、思考模式兼容性**  
   社区最在意的是“接得上、跑得稳、计得准”。OAuth/API Key、AWS profile、thinking tier、reasoning item 这些细节都在被密集打磨。  
   参考：[#6979](https://github.com/earendil-works/pi/issues/6979)、[#6957](https://github.com/earendil-works/pi/issues/6957)、[#6951](https://github.com/earendil-works/pi/issues/6951)

2. **终端交互容错与输入可靠性**  
   多终端、多平台下的按键、焦点、宽度、输入协议兼容，是最容易被用户感知的痛点。  
   参考：[#6973](https://github.com/earendil-works/pi/issues/6973)、[#6962](https://github.com/earendil-works/pi/issues/6962)、[#6987](https://github.com/earendil-works/pi/pull/6987)

3. **扩展开发需要更强的上下文与可观测性**  
   开发者希望拿到 session 元信息、限流/订阅用量、渲染钩子和资源发现结果，减少“黑盒式”集成。  
   参考：[#6959](https://github.com/earendil-works/pi/issues/6959)、[#6954](https://github.com/earendil-works/pi/issues/6954)、[#6988](https://github.com/earendil-works/pi/issues/6988)

4. **长任务与并发任务的中断/恢复能力**  
   tool-only turn、长循环、并发对话和重试都要求系统具备更强的恢复与取消能力，否则容易卡死或浪费 token。  
   参考：[#6940](https://github.com/earendil-works/pi/issues/6940)、[#6978](https://github.com/earendil-works/pi/issues/6978)、[#6945](https://github.com/earendil-works/pi/pull/6945)

如果你愿意，我也可以把这份日报进一步整理成 **“适合直接发到社区群/飞书”的短版**，或者输出成 **Markdown 模板** 方便自动化发布。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-07-23）

## 1) 今日速览
今天社区讨论的核心仍是两条主线：**主干 CI / 发布链路稳定性**，以及 **更新检查（update check）在不同 npm/版本管理器环境下的兼容性**。  
同时，VS Code Companion、TUI 会话恢复、Web Shell 打开端口等用户体验问题也持续出现，说明产品在 IDE 集成与会话场景仍有边界条件需要打磨。  
> 备注：过去 24 小时内仅有一个 **benchmark POC 预发布**，不是产品正式版本。

---

## 2) 版本发布
- [v0.0.0-benchmark-poc.20260722.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.0.0-benchmark-poc.20260722.1)  
  这是一个用于验证 **GitHub Actions → ECS benchmark worker → GitHub 结果发布** 链路的临时 prerelease，**不属于 Qwen Code 正式产品发布**。

---

## 3) 社区热点 Issues
1. [#7516 Main CI failed: E2E Tests on d064bd7dcf98](https://github.com/QwenLM/qwen-code/issues/7516)  
   这是最直接的主干健康信号，main 分支 E2E 失败会影响所有后续合入。当前有 3 条评论，且已打上 `status/ready-for-agent`、`autofix/skip`，说明已进入自动修复/人工排查流程。

2. [#7537 Core test suite is red on main: fork dispatch test never sees registry.complete](https://github.com/QwenLM/qwen-code/issues/7537)  
   核心测试红灯会把所有 PR 的测试结果拖成红色，影响面极大。该问题已关闭，说明修复推进较快，属于本轮最重要的稳定性修复之一。

3. [#7549 Release Failed for v0.20.1-nightly.20260723.d064bd7dc on 2026-07-23](https://github.com/QwenLM/qwen-code/issues/7549)  
   nightly 发布失败，直接卡住发布流水线。虽然当前只有 1 条评论，但这类问题对持续交付影响很高，值得优先关注。

4. [#7515 Failed to check for updates (registry error).](https://github.com/QwenLM/qwen-code/issues/7515)  
   `/update` 和启动时检查更新都失败，属于高频用户路径故障。已有 2 条评论，且能直接复现到 registry 层，说明问题并非偶发网络波动，而是兼容性/实现层面缺陷。

5. [#7543 getNpmCliPath returns mise bash wrapper instead of npm-cli.js, breaking update check](https://github.com/QwenLM/qwen-code/issues/7543)  
   这是 #7515 的一个具体成因方向：版本管理器把 npm 包装成 shell wrapper 后，更新检查误判路径。评论较少，但对受影响环境的用户是“必现级”问题。

6. [#7520 npm 12 compatibility: returns an array, causing update check to fail with 'registry error'](https://github.com/QwenLM/qwen-code/issues/7520)  
   该问题说明更新检查对 **npm 12 / Node 26** 已出现兼容性断裂，属于工具链升级后的系统性问题。对未来版本兼容性风险提示很强。

7. [#7489 VS Code Companion: file picker inserts @filename but image is not attached to model](https://github.com/QwenLM/qwen-code/issues/7489)  
   这是多模态/附件能力的核心 bug：UI 看似插入成功，但模型端没有收到图片。已有 3 条评论，说明社区对 VS Code 集成下的附件体验比较敏感。

8. [#7500 bug(serve): --open uses a stale port after EADDRINUSE fallback](https://github.com/QwenLM/qwen-code/issues/7500)  
   `qwen serve` 在端口冲突后会重试，但 `--open` 仍打开旧端口，直接影响 Web Shell 使用体验。2 条评论且复现步骤清晰，属于易定位、但影响明显的可靠性问题。

9. [#7485 TUI: large blank area between last message and input prompt after resume](https://github.com/QwenLM/qwen-code/issues/7485)  
   会话恢复后的布局异常是典型的 TUI 退化问题，虽然不致命，但明显影响可读性和交互连续性。该类问题通常与 session/resume 状态恢复链路有关。

10. [#7523 AI-assisted stable release notes silently fall back after repeated model timeouts](https://github.com/QwenLM/qwen-code/issues/7523)  
    发布说明生成在模型超时后“静默降级”，会让流水线看起来成功、实际内容质量下降。当前评论不多，但它暴露的是**失败可见性不足**，对发布可信度很关键。

---

## 4) 重要 PR 进展
1. [#7545 fix(cli): stop treating version-manager npm shims as npm-cli.js](https://github.com/QwenLM/qwen-code/pull/7545)  
   修复更新检查对版本管理器 npm shell wrapper 的误判，避免把非 JS shim 当成 npm CLI。

2. [#7544 fix(cli): resolve npm wrappers to npm-cli.js](https://github.com/QwenLM/qwen-code/pull/7544)  
   进一步增强 npm 路径解析逻辑：当 adjacent npm 是 wrapper 时，回退到标准 `npm-cli.js` 路径。

3. [#7528 Fix(cli): use npm view for update check instead of update-notifier (#7515)](https://github.com/QwenLM/qwen-code/pull/7528)  
   直接调整更新检查实现，减少对旧方案的依赖，是 #7515 的关键修复方向。

4. [#7539 fix(cli): clean orphaned managed npm update artifacts](https://github.com/QwenLM/qwen-code/pull/7539)  
   为 managed npm 更新目录增加保守清理逻辑，处理强杀、OOM、关机等场景留下的脏文件。

5. [#7535 fix(scripts): retry model calls and surface degraded release notes](https://github.com/QwenLM/qwen-code/pull/7535)  
   为 AI 辅助发布说明增加重试，并把降级状态显式暴露出来，改善 #7523 中“静默失败”的问题。

6. [#7538 test(core): stub the registry methods agent.ts actually calls](https://github.com/QwenLM/qwen-code/pull/7538)  
   已关闭；补齐测试桩，修复 main 上核心测试红灯问题，属于高优先级 CI 修复。

7. [#7540 test(core): stub resident-agent methods in the agent test registry](https://github.com/QwenLM/qwen-code/pull/7540)  
   已关闭；继续修补 agent 测试中的 registry stub，减少背景任务相关测试失败。

8. [#7536 feat(core): Align GenAI telemetry with ARMS](https://github.com/QwenLM/qwen-code/pull/7536)  
   对齐 GenAI telemetry 与 ARMS 的字段语义，增强可观测性与企业监控兼容性。

9. [#7534 fix(core): retry requests when providers require thinking](https://github.com/QwenLM/qwen-code/pull/7534)  
   当 provider 明确要求 `enable_thinking=true` 时，自动重试请求，提升兼容性和成功率。

10. [#7531 fix(core): close force-flag and checkout gaps in the AUTO destructive-git guard](https://github.com/QwenLM/qwen-code/pull/7531)  
    收紧破坏性 git 操作的保护范围，补齐 `git clean` / `git checkout` 等命令的拦截漏洞。

---

## 5) 功能需求趋势
1. **更新/安装链路稳定性**  
   从 `registry error`、npm 12 兼容性、版本管理器 wrapper 误判，到脏目录清理，社区明显在集中反馈“更新检查不够稳”。  
   代表问题：[#7515](https://github.com/QwenLM/qwen-code/issues/7515)、[#7543](https://github.com/QwenLM/qwen-code/issues/7543)、[#7520](https://github.com/QwenLM/qwen-code/issues/7520)

2. **CI / 发布自动化可靠性**  
   main CI、core test、nightly release、release notes 生成都在过去 24 小时内被反复提及，说明持续交付链路是当前高压区。  
   代表问题：[#7516](https://github.com/QwenLM/qwen-code/issues/7516)、[#7537](https://github.com/QwenLM/qwen-code/issues/7537)、[#7549](https://github.com/QwenLM/qwen-code/issues/7549)、[#7523](https://github.com/QwenLM/qwen-code/issues/7523)

3. **IDE / 交互体验补强**
   VS Code Companion 的附件发送、TUI resume 后的布局、Web Shell 的自动打开端口，都指向“交互状态恢复”和“附件能力”仍有缺口。  
   代表问题：[#7489](https://github.com/QwenLM/qwen-code/issues/7489)、[#7485](https://github.com/QwenLM/qwen-code/issues/7485)、[#7500](https://github.com/QwenLM/qwen-code/issues/7500)

4. **多代理 / 计划执行可视化**
   社区开始关注普通会话里的 plan DAG、Todo 与 subagent 的联动，这说明大家希望从“单轮对话”走向“可解释的计划执行”。  
   代表问题：[#7525](https://github.com/QwenLM/qwen-code/issues/7525)、[#7504](https://github.com/QwenLM/qwen-code/issues/7504)

5. **远程部署与企业集成**
   MCP OAuth 回调转发、DingTalk 元数据保留等问题，说明 Qwen Code 正在向远程、企业 IM 和云部署场景扩展。  
   代表问题：[#7503](https://github.com/QwenLM/qwen-code/issues/7503)、[#7472](https://github.com/QwenLM/qwen-code/issues/7472)

---

## 6) 开发者关注点
- **更新机制太脆弱，兼容性问题集中爆发**  
  版本管理器 wrapper、npm 12、registry 查询路径，说明 update check 需要更强的环境适配与容错。  
  参考：[#7515](https://github.com/QwenLM/qwen-code/issues/7515)、[#7543](https://github.com/QwenLM/qwen-code/issues/7543)、[#7520](https://github.com/QwenLM/qwen-code/issues/7520)

- **主干 CI 的红灯影响面过大**  
  main 上一旦测试失败，会让所有 PR 的信号失真，开发者对测试隔离、stub 完整性和自动修复效率很敏感。  
  参考：[#7516](https://github.com/QwenLM/qwen-code/issues/7516)、[#7537](https://github.com/QwenLM/qwen-code/issues/7537)

- **发布自动化需要“失败可见”而不是静默降级**  
  release notes 生成失败后仍绿灯，会让维护者误判发布质量；社区更希望可重试、可告警、可追踪。  
  参考：[#7523](https://github.com/QwenLM/qwen-code/issues/7523)、[#7535](https://github.com/QwenLM/qwen-code/pull/7535)、[#7549](https://github.com/QwenLM/qwen-code/issues/7549)

- **IDE / Web / TUI 的边界体验仍需持续打磨**  
  附件发送、resume 布局、端口 fallback 这类问题虽不大，但都出现在高频入口，直接影响可用性。  
  参考：[#7489](https://github.com/QwenLM/qwen-code/issues/7489)、[#7485](https://github.com/QwenLM/qwen-code/issues/7485)、[#7500](https://github.com/QwenLM/qwen-code/issues/7500)

- **企业集成与远程场景的协议细节越来越重要**  
  MCP OAuth 回调、DingTalk 入站消息元数据、daemon 到 channel 的错误边界，说明产品开始进入更复杂的部署环境。  
  参考：[#7503](https://github.com/QwenLM/qwen-code/issues/7503)、[#7472](https://github.com/QwenLM/qwen-code/issues/7472)、[#7521](https://github.com/QwenLM/qwen-code/issues/7521)

如果你愿意，我也可以把这份日报再压缩成 **“高管版 5 条摘要”** 或整理成 **适合公众号/飞书群发布的短版**。

</details>

<details>
<summary><strong>DeepSeek TUI</strong> — <a href="https://github.com/Hmbown/DeepSeek-TUI">Hmbown/DeepSeek-TUI</a></summary>

# 2026-07-23 DeepSeek TUI 社区动态日报

> 数据范围：过去 24 小时  
> 仓库：github.com/Hmbown/DeepSeek-TUI

## 1) 今日速览
过去 24 小时内，社区讨论的重心仍然围绕 **v0.9.1 收尾**：大量 release-blocker 已被关闭，重点集中在 TUI 信息层级、Work/To-do 展示和默认技能包落地。与此同时，**v0.9.2 方向**已经明确转向上下文瘦身、性能优化、供应商路由稳定性和安全门禁，说明项目正在从“补齐可用性”进入“系统性提质”的阶段。  
此外，仍有少量高优先级问题暴露出 **Windows 安装、Provider 配置、DeepSeek/Kimi 路由、danger-full-access 边界控制** 等可靠性痛点。

---

## 2) 社区热点 Issues

1. **[#4691 v0.9.1: Ship the model-invoked default CodeWhale skill pack](https://github.com/Hmbown/CodeWhale/issues/4691)**  
   这是 v0.9.1 的核心能力之一，目标是把默认技能包做成“开箱即用”的第一方体验。该 Issue 有 **4 条评论**，属于明确的 **release-blocker**，说明社区对默认技能体系的完整性非常关注。

2. **[#4687 fix(kimi): fail closed on Kimi Code/direct Moonshot K3 model-ID cross-pairings](https://github.com/Hmbown/CodeWhale/issues/4687)**  
   这是一个典型的路由正确性问题，直接影响 Kimi / Moonshot K3 的模型调用安全性与一致性。Issue 获得 **4 条评论**，且被标记为 **release-blocker**，说明社区对“错误模型 ID 不能放行”非常敏感。

3. **[#4684 danger-full-access does not disable tools-layer workspace boundary check](https://github.com/Hmbown/CodeWhale/issues/4684)**  
   该问题涉及“全权限模式”下仍存在工具层工作区边界限制，影响全局技能访问和高级工作流。虽然只有 **2 条评论**，但它触及安全/权限模型的底层设计，是高优先级可靠性问题。

4. **[#4685 CodeWhaleSetup.exe installer overwrites user PATH on Windows 10](https://github.com/Hmbown/CodeWhale/issues/4685)**  
   Windows 安装器直接覆盖用户 PATH，会破坏现有开发工具链，属于典型的高影响安装缺陷。当前只有 **1 条评论**，但问题面向广泛 Windows 用户，风险很高。

5. **[#4683 Wrong deepseek completions url](https://github.com/Hmbown/CodeWhale/issues/4683)**  
   这是一个会间歇性触发的网络/接口地址问题，直接导致补全失败。仅 **1 条评论**，但从“flaky”描述看，属于难排查的线上稳定性问题。

6. **[#4682 Setting a custom provider causes launch failure](https://github.com/Hmbown/CodeWhale/issues/4682)**  
   自定义 Provider 无法启动，会直接打击扩展性和第三方接入体验。虽然评论不多，但这是平台型产品必须优先修复的兼容性问题。

7. **[#4681 `<turn_meta>` blocks are displayed when reopening a session](https://github.com/Hmbown/CodeWhale/issues/4681)**  
   这是典型的会话恢复 UX 问题，说明历史元信息在重开 session 后泄露到界面上。当前讨论不多，但对 TUI 可读性和会话洁净度影响明显。

8. **[#4713 v0.9.1 security gate: deep scan and dependency alert disposition](https://github.com/Hmbown/CodeWhale/issues/4713)**  
   该 Issue 强调发布前必须完成仓库级安全审查，并处理依赖告警。尽管 **暂无评论**，但它表明团队已将“发版门禁”前置，属于治理型重点。

9. **[#4704 Context diet: minimize every model-facing prompt, schema, and payload](https://github.com/Hmbown/CodeWhale/issues/4704)**  
   这是 v0.9.2 的总纲式优化方向，目标是压缩模型可见上下文，提升跨模型鲁棒性。当前无评论，但它对 token 成本、推理稳定性和多模型适配都很关键。

10. **[#4703 Make steer vs queue obvious and configurable in the composer](https://github.com/Hmbown/CodeWhale/issues/4703)**  
    该 Issue 聚焦输入框交互：用户需要清楚知道当前提交是“接管运行中 turn”还是“排队”。虽然讨论尚少，但它直接关系到 TUI 的可发现性和交互学习成本。

---

## 3) 重要 PR 进展

1. **[#4714 chore(deps): patch npm lockfiles for Dependabot alerts](https://github.com/Hmbown/CodeWhale/pull/4714)**  
   面向依赖安全告警的一次集中修补，目标是通过 lockfile 更新消除现有告警，属于发版前的基础治理工作。当前状态：**OPEN**。

2. **[#4715 chore(deps-dev): bump the npm_and_yarn group across 1 directory with 3 updates](https://github.com/Hmbown/CodeWhale/pull/4715)**  
   Dependabot 自动升级扩展目录中的多个前端依赖，偏向维护性更新。当前状态：**OPEN**，说明前端/扩展生态也在同步治理。

3. **[#4711 fix(tui): focus v0.9.1 chrome on todos and agents](https://github.com/Hmbown/CodeWhale/pull/4711)**  
   这是 v0.9.1 的重要 TUI 收口 PR：把顶部区域聚焦到 To-dos 和 Sub-agents，弱化无关的运行态信息。当前状态：**CLOSED**，对信息层级重构意义很大。

4. **[#4697 fix(tui): hide empty coordination work before v0.9.1](https://github.com/Hmbown/CodeWhale/pull/4697)**  
   解决空协调状态仍显示 Work chrome 的问题，避免首屏出现“假工作项”。当前状态：**CLOSED**，是提升 TUI 清爽度的重要修复。

5. **[#4696 feat(tui): ship staged /uwu theme](https://github.com/Hmbown/CodeWhale/pull/4696)**  
   新增 `/uwu` 主题及别名支持，属于可见度高的界面功能更新。当前状态：**CLOSED**，反映项目在功能之外也持续打磨主题体验。

6. **[#4695 feat(skills): default CodeWhale skill pack (bundled v5)](https://github.com/Hmbown/CodeWhale/pull/4695)**  
   默认技能包正式落地，是 #4691 的关键实现 PR。它把 end-user skill pack 作为第一方能力提供，为 agent-ready 流程打基础。当前状态：**CLOSED**。

7. **[#4694 fix(kimi): fail closed on K3 model-ID cross-pairings](https://github.com/Hmbown/CodeWhale/pull/4694)**  
   对应 #4687 的修复实现，明确 base URL 与 model ID 的绑定关系，避免错误跨配对。当前状态：**CLOSED**，属于高价值稳定性修复。

8. **[#4693 fix(tui): Work summary lifecycle, actionable title, and top-area hierarchy](https://github.com/Hmbown/CodeWhale/pull/4693)**  
   这是 v0.9.1 工作区/顶部区域的组合修复，覆盖生命周期、可执行标题和层级展示。当前状态：**CLOSED**，是本轮 UX 修复的核心 PR 之一。

9. **[#4692 fix: v0.9.1: Ship the model-invoked default CodeWhale skill pack](https://github.com/Hmbown/CodeWhale/pull/4692)**  
   自动生成的修复 PR，对应默认技能包发布链路，说明该功能已进入合并收尾阶段。当前状态：**CLOSED**。

10. **[#4680 fix(tui): register debt compatibility aliases](https://github.com/Hmbown/CodeWhale/pull/4680)**  
    为 `/debt` 相关命令增加兼容别名，提升命令发现性与历史兼容性。当前状态：**CLOSED**，属于命令系统的小而关键的可用性增强。

---

## 4) 功能需求趋势

从过去 24 小时的 Issues 看，社区关注点主要集中在以下几条主线：

- **TUI 信息架构重构**  
  包括 Work/To-do 展示、顶部状态层级、composer 交互、会话恢复时的内容清洁度。  
  说明用户希望界面“少噪音、强行动导向”。

- **默认技能与 Agent 工作流**  
  默认 skill pack、技能路由元数据、sub-agent 体验成为主线需求。  
  这表明项目正在从“工具集合”向“可直接执行任务的 agent 平台”演进。

- **上下文瘦身与性能优化**  
  #4704/#4705/#4706/#4708/#4709/#4710 形成了明显的“context diet”趋势：减少重复提示词、压缩工具描述、统一状态表面。  
  社区的核心诉求是：**少 token、少重复、少误导，但不损失任务成功率**。

- **模型/Provider 路由可靠性**  
  Kimi、DeepSeek、自定义 Provider、Minimax 路由等问题频繁出现，说明多模型支持已成为刚需。  
  重点不只是“能接入”，而是“接入后不出错、路由不串线”。

- **安全与发布治理**  
  依赖告警、深度安全扫描、release gate、danger-full-access 边界控制都被提到。  
  社区已经在要求项目从“功能驱动”转向“工程化发布”。

- **Windows 与安装体验**  
  PATH 覆盖、安装器行为、跨平台边界问题仍是高影响痛点。  
  这说明桌面/终端用户对可安装性和环境无侵入性非常敏感。

---

## 5) 开发者关注点

综合社区反馈，开发者最需要优先处理的痛点主要有：

1. **上下文膨胀导致模型效果下降**  
   不只是 token 多，而是重复信息、冗余 schema、过长工具描述正在稀释模型行动信号。

2. **TUI 需要更强的“当前可执行动作”表达**  
   用户希望一眼看出“现在要做什么、当前在做什么、哪些是临时状态”，而不是只看见统计数字。

3. **Provider 配置必须更健壮**  
   自定义 Provider、模型 ID 与 base URL 的绑定关系，需要 fail-closed 和更明确的校验。

4. **安全与权限模型要更一致**  
   danger-full-access 不能只是 OS 层放开，工具层边界也要一致处理，否则会出现“看似全权限、实际仍受限”的割裂体验。

5. **安装与环境改动必须保守**  
   尤其是 Windows 上 PATH、shell、终端环境变量等，任何覆盖式改动都可能引发连锁问题。

---

如果你愿意，我还可以把这份日报进一步整理成：
- **“适合发社区公告的精简版”**
- **“适合团队站会的要点版”**
- **“按 Release / UX / 稳定性 / 安全 四象限分类版”**

</details>

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*