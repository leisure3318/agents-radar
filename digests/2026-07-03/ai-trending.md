# AI 开源趋势日报 2026-07-03

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-07-03 03:28 UTC

---

# AI 开源趋势日报（2026-07-03）

## 一、过滤结果
**已保留的 AI/ML 相关项目（6 个）**
- [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [agentskills/agentskills](https://github.com/agentskills/agentskills)
- [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc)
- [langflow-ai/langflow](https://github.com/langflow-ai/langflow)
- [harvard-edge/cs249r_book](https://github.com/harvard-edge/cs249r_book)
- [Baizhige/EEGUnity](https://github.com/Baizhige/EEGUnity)

**已排除的非 AI 项目**
- [actions/checkout](https://github.com/actions/checkout) — 通用 CI 工具
- [ryanmcdermott/clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript) — 通用代码规范仓库

---

## 二、今日速览
今天的 GitHub AI 热度，几乎全部集中在 **Agent / Coding Agent 基础设施** 上，而不是传统模型训练或纯应用层。最强信号是浏览器能力、代码审查、任务委派、工作流编排这几类“可执行工具链”同时升温。  
与此同时，**MCP、Skills、Plugin** 这类标准化/互操作关键词开始成为高关注点，说明社区正在把 AI 从“单次调用模型”推进到“可连接、可编排、可协作”的工程阶段。  
传统 ML 系统学习资源与垂直科研工具仍有曝光，但热度明显弱于 agent 方向。  
RAG/知识库方向今天没有明显上榜项目。

---

## 三、各维度热门项目

> 说明：今日样本量有限，部分维度不足 3 个项目，以下列出全部相关项目。

### 🔧 AI 基础工具
- [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)  
  **stars：今日 +104**  
  Chrome DevTools 以 MCP 形式暴露给 coding agents，是“浏览器可操作性”进入 Agent 工作流的关键基础设施。
- [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc)  
  **stars：今日 +352**  
  让 Claude Code 调用 Codex 做代码审查和任务委派，体现跨模型、跨 IDE 的工具链整合趋势。
- [langflow-ai/langflow](https://github.com/langflow-ai/langflow)  
  **stars：今日 +117**  
  可视化构建 AI agents 和 workflows，属于低代码 AI 开发平台，适合快速搭建与部署。
- [Baizhige/EEGUnity](https://github.com/Baizhige/EEGUnity)  
  **stars：73**  
  面向大规模 EEG 数据处理的开源工具，属于垂直科研数据处理工具，可视为专业 ML 基础工具。

### 🤖 AI 智能体 / 工作流
- [agentskills/agentskills](https://github.com/agentskills/agentskills)  
  **stars：今日 +86**  
  Agent Skills 的规范与文档仓库，核心价值在于把 agent 能力模块化、标准化，利于复用和协作。
- [langflow-ai/langflow](https://github.com/langflow-ai/langflow)  
  **stars：今日 +117**  
  低代码 workflow/agent 编排平台，是“把 agent 落地成业务流程”的典型代表。
- [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)  
  **stars：今日 +104**  
  为 agent 提供浏览器操作能力，典型的 agent 工具接入层。
- [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc)  
  **stars：今日 +352**  
  直接服务于“代码审查 + 任务委派”的 agent 协作场景，今天最热。

### 📦 AI 应用
- [Baizhige/EEGUnity](https://github.com/Baizhige/EEGUnity)  
  **stars：73**  
  面向脑电数据处理的垂直工具，代表 AI/ML 开源正在向生物信号与科研场景延伸。  
- 其余今日上榜项目更偏基础设施或工作流编排，**缺少典型消费级/行业应用产品**。

### 🧠 大模型 / 训练
- [harvard-edge/cs249r_book](https://github.com/harvard-edge/cs249r_book)  
  **stars：今日 +68**  
  Machine Learning Systems 相关教材/资料，说明开发者对训练、推理、系统工程的系统性知识仍有强需求。  
- 今日未见典型模型权重、微调框架或训练工具上榜。

### 🔍 RAG / 知识库
- **暂无明确上榜项目**

---

## 四、趋势信号分析
今天的热榜显示，AI 开源关注点正从“模型本身”转向“Agent 可执行基础设施”。浏览器接入、代码审查、任务委派、工作流编排这四类能力同时升温，说明开发者更关心 AI 如何真正进入软件开发闭环。MCP、Skills、Plugin 等关键词首次形成组合式爆发，反映出社区对**标准化互操作层**的需求在快速增长。Langflow 代表的低代码编排仍有稳定热度，但整体叙事已明显从“搭应用”升级为“搭 agent 系统”。与此同时，EEGUnity 与 ML Systems 资源提示：垂直科研 AI 和系统工程知识仍有持续关注，不过声量远低于 agent 工具链。这一轮热度与近期编码模型能力增强、agent 协作机制成熟的行业趋势高度一致。

---

## 五、社区关注热点
- **[ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)**  
  浏览器能力被 MCP 化，是 coding agent 进入真实网页操作场景的关键一步。
- **[openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc)**  
  跨模型、跨 IDE 的任务委派与审查协作，代表 agent 工具链整合方向。
- **[agentskills/agentskills](https://github.com/agentskills/agentskills)**  
  Skills 规范若成型，可能成为 agent 能力复用的重要接口层。
- **[langflow-ai/langflow](https://github.com/langflow-ai/langflow)**  
  低代码 agent 编排仍是团队快速落地 AI 应用的高性价比路线。
- **[Baizhige/EEGUnity](https://github.com/Baizhige/EEGUnity)**  
  垂直科研数据处理工具值得关注，说明 AI 开源正在向专业领域深渗透。

如需，我可以把这份日报进一步整理成 **Markdown 表格版** 或 **适合公众号/飞书发布的精简版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*