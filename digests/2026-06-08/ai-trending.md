# AI 开源趋势日报 2026-06-08

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-06-08 04:13 UTC

---

# AI 开源趋势日报｜2026-06-08

## 1) 过滤说明
已按“AI/ML 明确相关”进行筛选，**剔除** OpenCV、ChinaTextbook、GhostTrack、pg_durable 等非本次主线项目。  
本日报聚焦 **LLM / Agent / RAG / 本地推理 / 知识层** 生态；像 OpenCV 这类广义 CV 基础库虽属 ML 范畴，但未纳入今天的重点趋势。

---

## 2) 今日速览
今天的开源 AI 热度，明显从“模型本身”转向了“**Agent 工具链 + 记忆/RAG + 本地化部署**”。  
Trending 榜单里，**agent skill / harness** 相关项目爆发最明显，说明社区正围绕 Claude Code、Codex、OpenCode 等工具做“能力外挂”。  
同时，**open-notebook、open-webui、project-nomad** 这类本地/离线/私有化应用继续升温，反映出隐私与可控部署需求增强。  
底层基础设施方面，**llama.cpp、vLLM、Ollama、向量库与记忆层**仍在稳定吸星，说明“模型可用”之后，大家更关注“如何高效接入和长期使用”。

---

## 3) 各维度热门项目

### 🔧 AI 基础工具
- [ollama/ollama](https://github.com/ollama/ollama) — ⭐173,512  
  本地运行多模型的事实标准入口，继续受益于私有化、低门槛部署潮。
- [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) — ⭐总 stars 未提供；今日 **+158**  
  轻量高效的推理核心，代表端侧/自托管推理路线的持续热度。
- [huggingface/transformers](https://github.com/huggingface/transformers) — ⭐161,402  
  仍是模型定义、训练与推理的主框架，基础设施地位非常稳。
- [vllm-project/vllm](https://github.com/vllm-project/vllm) — ⭐82,178  
  高吞吐推理与服务引擎，适合生产部署场景。
- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) — ⭐129,945  
  面向 AI 的网页抓取/检索 API，已成为 RAG 与 Agent 数据入口的重要工具。
- [RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec) — ⭐总 stars 未提供；今日 **+1,554**  
  面向向量索引/检索的高关注新项目，今天涨幅非常亮眼，属于“检索基础设施”新热点。

### 🤖 AI 智能体 / 工作流
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — ⭐209,978  
  Agent harness 性能优化系统，围绕技能、记忆、安全与研究流程做工程化增强。
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) — ⭐186,211；今日 **+1,112**  
  今天最强涨幅之一，典型的“会成长的 Agent”方向。
- [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) — ⭐总 stars 未提供；今日 **+1,111**  
  面向多源研究的 AI agent skill，体现“Agent + 研究流程”热度爆发。
- [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) — ⭐总 stars 未提供；今日 **+1,103**  
  给 AI 加“审美/品味”的 skill，说明社区开始追求输出质量与风格控制。
- [aaif-goose/goose](https://github.com/aaif-goose/goose) — ⭐总 stars 未提供；今日 **+322**  
  可扩展 AI agent，强调安装、执行、编辑、测试的一体化工具链。
- [browser-use/browser-use](https://github.com/browser-use/browser-use) — ⭐97,659  
  让网页对 AI agent 可操作，是浏览器自动化的重要基础件。
- [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) — ⭐65,273  
  从 0 到 1 的 nano agent harness，直接踩中 Claude Code 生态热度。
- [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) — ⭐76,185  
  经典 AI-Driven Development 项目，开发者自动化工作流代表。

### 📦 AI 应用
- [lfnovo/open-notebook](https://github.com/lfnovo/open-notebook) — ⭐总 stars 未提供；今日 **+554**  
  NotebookLM 的开源替代，今天是应用层最亮眼的热门之一。
- [open-webui/open-webui](https://github.com/open-webui/open-webui) — ⭐140,533  
  本地与云模型统一入口，仍是“AI 聊天/工作台”类产品的头部项目。
- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) — ⭐61,221  
  local-first 知识工作台，适合做私有知识问答与团队协作。
- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) — ⭐47,039  
  面向多模型的 AI productivity studio，兼顾智能聊天与代理能力。
- [Crosstalk-Solutions/project-nomad](https://github.com/Crosstalk-Solutions/project-nomad) — ⭐总 stars 未提供；今日 **+309**  
  离线生存电脑 + AI 的组合，体现“边缘/离线可用性”需求。
- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) — ⭐25,088  
  从文档生成可编辑 PPT，属于典型垂直生产力应用。
- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) — ⭐41,194  
  LLM 驱动的股票分析与推送系统，AI + 金融垂直场景代表。
- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) — ⭐68,767  
  金融数据平台正在向“分析师 + AI Agent”形态演进。

### 🧠 大模型 / 训练
- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) — ⭐195,608  
  经典 ML 框架，仍是广义训练生态的重要底座。
- [pytorch/pytorch](https://github.com/pytorch/pytorch) — ⭐100,590  
  深度学习主力框架，模型训练与研究的核心基础设施。
- [huggingface/transformers](https://github.com/huggingface/transformers) — ⭐161,402  
  模型开发和微调的核心框架，多模态支持也持续增强。
- [hiyouga/LlamaFactory](https://github.com/hiyouga/LlamaFactory) — ⭐71,968  
  100+ LLM/VLM 的统一高效微调工具，贴近实际落地需求。
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) — ⭐96,839  
  经典“从零实现 LLM”教程仓库，长期高关注。
- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) — ⭐4,254  
  更偏系统学习与推理服务实践，适合关注 Apple Silicon/轻量化栈的开发者。

### 🔍 RAG / 知识库
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) — ⭐82,143  
  强调 RAG + Agent 的一体化引擎，是企业知识层热门项目。
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — ⭐49,983  
  文档 Agent 与 OCR 能力结合，依然是 RAG 领域核心项目。
- [mem0ai/mem0](https://github.com/mem0ai/mem0) — ⭐57,997  
  面向 Agent 的通用记忆层，解决“长期上下文”问题。
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — ⭐81,146  
  跨会话持久上下文，反映“记忆即产品能力”的趋势。
- [qdrant/qdrant](https://github.com/qdrant/qdrant) — ⭐31,902  
  高性能向量数据库，AI 检索基础设施代表。
- [milvus-io/milvus](https://github.com/milvus-io/milvus) — ⭐44,674  
  大规模向量数据库老牌项目，仍然是 RAG 栈核心组件。
- [weaviate/weaviate](https://github.com/weaviate/weaviate) — ⭐16,289  
  面向 AI 的对象+向量混合检索，企业场景常用。
- [safishamsi/graphify](https://github.com/safishamsi/graphify) — ⭐62,154  
  将代码、SQL、文档等转为可查询知识图谱，偏“结构化知识增强”路线。
- [topoteretes/cognee](https://github.com/topoteretes/cognee) — ⭐17,716  
  面向 AI Agents 的记忆平台，主打轻量接入。
- [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) — ⭐32,729  
  “vectorless、reasoning-based RAG” 方向，代表检索层的新探索。

---

## 4) 趋势信号分析
今天最强信号是 **Agent skill / harness 化**：社区不再只做单个 Agent，而是给 Agent 增加技能、记忆、研究流程与浏览器执行能力，说明“可用的工作流”比“会聊天的模型”更受欢迎。第二个信号是 **本地化与离线化** 继续升温，llama.cpp、open-notebook、project-nomad、open-webui 共同指向私有部署、低成本和数据主权。第三个信号是 **RAG/记忆层工程化**：mem0、claude-mem、RAGFlow、PageIndex 等项目把“长期上下文、结构化检索、vectorless RAG”推到台前。整体来看，AI 开源生态正从模型能力竞争，转向 **工具链 + 工作流 + 知识底座** 的系统竞争。

---

## 5) 社区关注热点
- **Agent harness / skills 套件**  
  重点看 [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)、[mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)、[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)、[aaif-goose/goose](https://github.com/aaif-goose/goose)。  
  理由：今天新增 stars 极高，说明“给 Agent 装能力”比单纯做对话更有市场。

- **本地/离线 AI 应用**  
  重点看 [lfnovo/open-notebook](https://github.com/lfnovo/open-notebook)、[open-webui/open-webui](https://github.com/open-webui/open-webui)、[Crosstalk-Solutions/project-nomad](https://github.com/Crosstalk-Solutions/project-nomad)。  
  理由：私有化、可控、离线可用正在成为显著卖点。

- **记忆层与 RAG 基座**  
  重点看 [mem0ai/mem0](https://github.com/mem0ai/mem0)、[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)、[infiniflow/ragflow](https://github.com/infiniflow/ragflow)、[VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex)。  
  理由：Agent 真正落地，核心瓶颈就是长期记忆与高质量检索。

- **推理与部署栈**  
  重点看 [ollama/ollama](https://github.com/ollama/ollama)、[ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp)、[vllm-project/vllm](https://github.com/vllm-project/vllm)、[RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec)。  
  理由：模型能力普及后，部署效率、吞吐与成本控制成为新竞争点。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*