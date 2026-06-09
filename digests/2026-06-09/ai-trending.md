# AI 开源趋势日报 2026-06-09

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-06-09 03:42 UTC

---

# AI 开源趋势日报｜2026-06-09

> 说明：已从 Trending 榜单中剔除与 AI 无关的 `refactoringhq/tolaria`、`TapXWorld/ChinaTextbook`。  
> Trending 榜单原始数据未给出总 stars，以下沿用原始字段显示为 `⭐0`，重点参考今日新增 stars。  
> 主题搜索结果仅展示总 stars，未提供今日增量。

---

## 1) 今日速览

今天的 AI 开源热度明显向 **Agent skills / harness、上下文记忆、网页自动化** 三条线聚集。Trending 榜单里，`last30days-skill`、`Agent-Reach`、`goose`、`CopilotKit` 这类项目快速吸星，说明社区关注点已从“能聊天”转向“能执行任务、能连接外部世界”。  
与此同时，主题搜索中的长期高热项目仍集中在 **RAG/知识库底座** 与 **LLM 基础设施**：`Dify`、`RAGFlow`、`LlamaIndex`、`mem0`、`Qdrant` 持续占据核心位置。  
另一个值得注意的信号是，本地推理与模型选型工具（如 `Ollama`、`whichllm`、`vLLM`）继续升温，表明“低成本、可私有化部署”的诉求正在增强。

---

## 2) 各维度热门项目

### 🔧 AI 基础工具
- [huggingface/transformers](https://github.com/huggingface/transformers) ｜ ⭐161,424 ｜ 事实标准级模型框架，覆盖文本/视觉/音频/多模态；今天仍是 AI 基建核心入口。
- [ollama/ollama](https://github.com/ollama/ollama) ｜ ⭐173,634 ｜ 本地大模型运行与分发工具，随着 Kimi、Qwen、DeepSeek 等模型生态扩张，热度持续。
- [vllm-project/vllm](https://github.com/vllm-project/vllm) ｜ ⭐82,269 ｜ 高吞吐推理与服务引擎，是自建 LLM Serving 栈的关键组件。
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) ｜ ⭐138,839 ｜ Agent engineering 平台，仍是应用编排与工具调用最常用的框架之一。
- [browser-use/browser-use](https://github.com/browser-use/browser-use) ｜ ⭐97,824 ｜ 让网页对 AI agent 可操作，代表“浏览器即工具”的趋势。
- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) ｜ ⭐130,363 ｜ 面向规模化抓取/检索的 Web API，常作为 agent 与 RAG 的数据入口。
- [openai/plugins](https://github.com/openai/plugins) ｜ ⭐0（+296 today） ｜ 插件/扩展式 AI 生态信号，说明“模型外接能力”仍受关注。
- [Andyyyy64/whichllm](https://github.com/Andyyyy64/whichllm) ｜ ⭐0（+143 today） ｜ 本地 LLM 真实跑分与硬件适配工具，今天的热度来自“先测再装”的实用需求。

### 🤖 AI 智能体 / 工作流
- [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) ｜ ⭐0（+3558 today） ｜ 以多来源研究为基础的 AI agent skill，今日 Trending 第一，典型“可执行技能层”项目。
- [aaif-goose/goose](https://github.com/aaif-goose/goose) ｜ ⭐0（+699 today） ｜ 开源可扩展 AI agent，强调安装、执行、编辑、测试一体化。
- [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) ｜ ⭐0（+679 today） ｜ 给 agent 装上“全网视野”，支持多平台信息抓取，明显切中“连接互联网”的需求。
- [google/skills](https://github.com/google/skills) ｜ ⭐0（+461 today） ｜ 面向 Google 产品/技术的 Agent Skills，体现大厂对技能化 agent 的押注。
- [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) ｜ ⭐34,211 ｜ 面向 agents 与 Generative UI 的前端栈，强调“agent 进入产品界面”。
- [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) ｜ ⭐76,275 ｜ AI 驱动开发的代表项目之一，聚焦代码任务自动化与开发闭环。
- [activepieces/activepieces](https://github.com/activepieces/activepieces) ｜ ⭐22,650 ｜ AI Agents + MCPs + 工作流自动化，适合把 agent 接到业务流程上。
- [AutoGPT/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) ｜ ⭐184,849 ｜ 经典 agent 项目，仍是“自治式任务执行”路线的重要标杆。

### 📦 AI 应用
- [open-webui/open-webui](https://github.com/open-webui/open-webui) ｜ ⭐140,713 ｜ 面向本地/云端模型的统一 AI 界面，依旧是最常见的开源 AI Chat 产品之一。
- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) ｜ ⭐61,270 ｜ local-first 的 agent 体验平台，把知识库、聊天与工具整合到一起。
- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) ｜ ⭐47,084 ｜ 多模型生产力工作台，面向高频使用者的“AI 桌面应用”代表。
- [santifer/career-ops](https://github.com/santifer/career-ops) ｜ ⭐0（+308 today） ｜ Claude Code 驱动的求职系统，说明 AI 正深度进入垂直应用场景。
- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) ｜ ⭐41,417 ｜ 面向 A/H/美股的 LLM 分析仪表盘，属于“AI + 金融决策”典型应用。
- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) ｜ ⭐25,335 ｜ 从文档生成可编辑 PPT，贴合办公场景里最直接的内容生产需求。

### 🧠 大模型 / 训练
- [huggingface/transformers](https://github.com/huggingface/transformers) ｜ ⭐161,424 ｜ 模型定义与训练/推理的统一入口，仍是模型生态的通用底座。
- [pytorch/pytorch](https://github.com/pytorch/pytorch) ｜ ⭐100,602 ｜ 深度学习训练的核心框架，训练侧的事实标准。
- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) ｜ ⭐195,613 ｜ 老牌通用 ML 框架，仍是工业界重要基建。
- [hiyouga/LlamaFactory](https://github.com/hiyouga/LlamaFactory) ｜ ⭐72,006 ｜ 100+ LLM/VLM 的统一微调工具，最贴近“落地训练”的开源项目之一。
- [galilai-group/stable-pretraining](https://github.com/galilai-group/stable-pretraining) ｜ ⭐251 ｜ 面向 foundation/world model 预训练的轻量库，代表更底层的训练工程化方向。
- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) ｜ ⭐4,259 ｜ 侧重在 Apple Silicon 上理解和实践 LLM serving 的课程型项目，偏“训练/推理入门”方向。

### 🔍 RAG / 知识库
- [langgenius/dify](https://github.com/langgenius/dify) ｜ ⭐144,463 ｜ 生产级 agentic workflow 平台，RAG、工具调用、知识库编排都很成熟。
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) ｜ ⭐82,243 ｜ 强调“上下文层”的 RAG 引擎，兼顾 Agent 能力，是企业知识接入的强选项。
- [run-llama/llama_index](https://github.com/run-llama/llama_index) ｜ ⭐50,015 ｜ 文档 agent 与 OCR/RAG 平台，依旧是检索增强开发的核心工具。
- [mem0ai/mem0](https://github.com/mem0ai/mem0) ｜ ⭐58,091 ｜ AI agents 的通用记忆层，解决长期上下文与跨会话记忆问题。
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) ｜ ⭐81,326 ｜ 给 Claude Code / Codex 等注入持久化上下文，贴合“记忆即能力”的趋势。
- [qdrant/qdrant](https://github.com/qdrant/qdrant) ｜ ⭐31,939 ｜ 高性能向量数据库，是 RAG 基础设施层的稳定代表。
- [RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec) ｜ ⭐0（+1729 today） ｜ 向量索引底座，今日 Trending 里最强的“RAG 基础设施”信号之一。
- [MemPalace/mempalace](https://github.com/MemPalace/mempalace) ｜ ⭐0（+170 today） ｜ 开源 AI memory system，说明“长期记忆”已经成为 agent 竞赛的新焦点。

---

## 3) 趋势信号分析

今天最强的社区关注点是 **Agent 技能化与上下文工程**。`last30days-skill`、`google/skills`、`Agent-Reach`、`goose`、`CopilotKit` 等项目，说明开发者不再只追求“模型回答”，而是追求“模型能执行、能规划、能连接外部系统”。  
第二个高热方向是 **记忆层与知识层**：`mem0`、`claude-mem`、`mempalace`、`turbovec` 这类项目，把“长期记忆、上下文压缩、向量索引”推到了更核心的位置。  
第三个明显趋势是 **网页自动化 + 数据抓取**，`browser-use`、`firecrawl`、`Agent-Reach` 说明 agent 正在走向可操作互联网的阶段。  
技术栈上，社区开始偏好“可组合、低成本、可私有化”的方案；结合近期各家编程代理、CLI agent 与本地模型生态持续迭代，可以看出 AI 开源正在从“模型中心”转向“工作流中心”。

---

## 4) 社区关注热点

- **Agent skills / harness 生态**：`last30days-skill`、`goose`、`OpenHands` 值得重点跟踪，原因是它们直接决定 agent 能否“做事”而不只是“聊天”。
- **长期记忆与上下文压缩**：`mem0`、`claude-mem`、`mempalace` 是下一阶段 agent 体验的关键基础设施。
- **网页自动化与内容采集**：`browser-use`、`firecrawl`、`Agent-Reach` 代表 agent 走向真实互联网操作的能力边界。
- **本地模型部署与选型**：`Ollama`、`whichllm`、`vLLM` 继续受关注，说明私有化、低成本推理需求很强。
- **RAG 底座仍是刚需**：`Dify`、`RAGFlow`、`Qdrant` 依然是知识增强应用最稳的工程起点。

如果你愿意，我可以进一步把这份日报整理成：
1. **适合公众号发布的精简版**，或  
2. **适合内部情报周报的表格版（含趋势判断与投资/选型建议）**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*