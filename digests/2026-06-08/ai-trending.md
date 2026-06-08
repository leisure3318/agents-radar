# AI 开源趋势日报 2026-06-08

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-06-08 08:10 UTC

---

# 《AI 开源趋势日报》｜2026-06-08

> 筛选口径：仅保留 **AI/ML 明确相关** 的仓库；Trending 榜单中的非 AI 项目已略去。  
> 说明：Trending 仅提供**今日新增 stars**，若主题搜索中也出现同仓库，则补充其**累计 stars**。

---

## 1) 今日速览

今天最值得关注的不是单一模型，而是围绕模型执行能力的 **“代理栈”爆发**：skill/harness、记忆、浏览器自动化、CLI/MCP 兼容层一起冲高，`last30days-skill`、`taste-skill`、`hermes-agent`、`goose` 的高增量非常直观。第二个明显方向是 **本地化与自托管**，`llama.cpp`、`Ollama`、`Open WebUI`、`Open Notebook` 继续吃到离线、隐私和成本红利。RAG 也在升级，`graphify`、`mem0`、`PageIndex`、`turbovec` 指向 **知识图谱、长期记忆和向量less/低存储检索**。这与 Claude Code、Codex、Gemini CLI 等开发者生态扩张高度同频，说明“开发者工作流”正在成为开源竞赛主战场。

---

## 2) 各维度热门项目

### 🔧 AI 基础工具
- [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) — **今日 +158**（Trending；总 stars 未在数据中提供）  
  C/C++ 本地推理底座，仍是轻量部署、离线运行和边缘侧 AI 的核心基础设施。
- [ollama/ollama](https://github.com/ollama/ollama) — ⭐ **173,540**  
  最主流的本地模型运行入口之一，兼容多模型，显著降低本地 LLM 使用门槛。
- [vllm-project/vllm](https://github.com/vllm-project/vllm) — ⭐ **82,197**  
  高吞吐、低内存的推理/服务引擎，是生产级 LLM serving 的关键底座。
- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) — ⭐ **130,008**  
  面向 AI 的网页搜索、抓取与交互 API，已成为大量 agent/检索链路的“网页层”标准件。
- [opencv/opencv](https://github.com/opencv/opencv) — **今日 +65**（Trending；总 stars 未在数据中提供）  
  经典视觉库依旧活跃，说明 CV/多模态依然是 AI 生态的重要底层能力。

### 🤖 AI 智能体 / 工作流
- [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) — **今日 +1,111**（Trending；总 stars 未在数据中提供）  
  面向多源信息研究的 AI skill，代表“技能即能力”的新一轮 agent 组件化趋势。
- [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) — **今日 +1,103**（Trending；总 stars 未在数据中提供）  
  给 AI 增加“品味/审美约束”的 skill 模块，反映社区开始关注输出质量而非仅能否完成任务。
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) — ⭐ **186,500**；**今日 +1,112**  
  可持续成长的 agent 框架，兼顾记忆、技能与扩展性，是当前 agent 路线的代表项目之一。
- [affaan-m/ECC](https://github.com/affaan-m/ECC) — ⭐ **210,173**  
  面向 Claude Code/Codex/OpenCode 等的 agent harness 优化系统，说明“代理编排与性能调优”已成独立赛道。
- [aaif-goose/goose](https://github.com/aaif-goose/goose) — **今日 +322**（Trending；总 stars 未在数据中提供）  
  可安装、执行、编辑、测试的开源 AI agent，强调“能真正干活”的开发者工作流。
- [langgenius/dify](https://github.com/langgenius/dify) — ⭐ **144,380**  
  生产级 agentic workflow 平台，适合企业把模型能力编排成可交付流程。
- [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) — ⭐ **76,204**  
  AI 驱动开发平台，持续代表“AI 进入软件工程主流程”的开源方向。
- [browser-use/browser-use](https://github.com/browser-use/browser-use) — ⭐ **97,690**  
  让网站对 AI agent 变得可操作，典型的“网页自动化 + agent 执行层”项目。

### 📦 AI 应用
- [lfnovo/open-notebook](https://github.com/lfnovo/open-notebook) — **今日 +554**（Trending；总 stars 未在数据中提供）  
  NotebookLM 的开源替代品，强调更强灵活性与可扩展性，属于高需求的知识助手应用。
- [open-webui/open-webui](https://github.com/open-webui/open-webui) — ⭐ **140,564**  
  友好的本地/自托管 AI UI，依然是大多数人接入本地模型的第一站。
- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) — ⭐ **47,051**  
  面向生产力的 AI 工作台，覆盖对话、自动化与多助手编排。
- [iOfficeAI/AionUi](https://github.com/iOfficeAI/AionUi) — ⭐ **27,789**  
  面向多种 CLI agent 的本地协作应用，体现“把多个模型/CLI 统一在一个桌面工作流”需求。
- [Crosstalk-Solutions/project-nomad](https://github.com/Crosstalk-Solutions/project-nomad) — **今日 +309**（Trending；总 stars 未在数据中提供）  
  离线生存电脑 + AI 的概念型应用，强调在弱网/离线场景下的智能支持。
- [yikart/AiToEarn](https://github.com/yikart/AiToEarn) — **今日 +183**（Trending；总 stars 未在数据中提供）  
  “AI to Earn” 的垂直应用，体现 AI 商业化/变现类产品仍具社区热度。
- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB) — ⭐ **68,770**  
  面向分析师、量化和 AI agent 的金融数据平台，属于 AI + 行业工作流融合的典型案例。
- [netdata/netdata](https://github.com/netdata/netdata) — ⭐ **79,089**  
  AI 赋能的全栈可观测性平台，说明 AI 正加速进入运维与监控产品。

### 🧠 大模型 / 训练
- [huggingface/transformers](https://github.com/huggingface/transformers) — ⭐ **161,408**  
  事实标准级模型框架，覆盖文本、视觉、音频和多模态，依旧是上层应用与训练的核心入口。
- [pytorch/pytorch](https://github.com/pytorch/pytorch) — ⭐ **100,597**  
  动态神经网络与 GPU 加速的核心底座，训练生态的主干仍未改变。
- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) — ⭐ **195,606**  
  经典机器学习框架，虽非最热话题，但仍是企业和传统 ML 场景的重要基础设施。
- [hiyouga/LlamaFactory](https://github.com/hiyouga/LlamaFactory) — ⭐ **71,981**  
  100+ LLM/VLM 的统一高效微调工具，是当前“快速定制模型”的热门选项。
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) — ⭐ **96,846**  
  从零实现 ChatGPT-like LLM 的教程型仓库，长期保持高关注，适合理解底层原理。
- [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) — ⭐ **58,137**  
  YOLO 生态的核心仓库，说明视觉模型训练与部署仍具强需求。
- [open-compass/opencompass](https://github.com/open-compass/opencompass) — ⭐ **7,064**  
  LLM 评测平台，虽然不是训练框架，但在模型选型与对比中非常关键。

### 🔍 RAG / 知识库
- [RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec) — **今日 +1,554**（Trending；总 stars 未在数据中提供）  
  基于 Rust 的向量索引，今日增量极高，说明“更快、更轻量”的检索底座正在获得关注。
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) — ⭐ **82,170**  
  将 RAG 与 agent 能力融合的检索引擎，代表新一代上下文层基础设施。
- [mem0ai/mem0](https://github.com/mem0ai/mem0) — ⭐ **58,021**  
  面向 agent 的通用记忆层，主打跨会话长期记忆。
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — ⭐ **49,988**  
  文档代理与 OCR/RAG 编排平台，仍是知识接入和检索编排的重要框架。
- [safishamsi/graphify](https://github.com/safishamsi/graphify) — ⭐ **62,548**  
  将代码、文档、论文等转成可查询知识图谱，代表“知识图谱 + Agent”趋势。
- [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) — ⭐ **32,742**  
  向量less、基于推理的 RAG 方案，体现社区开始探索低存储/高可解释检索路径。
- [milvus-io/milvus](https://github.com/milvus-io/milvus) — ⭐ **44,676**  
  规模化向量数据库代表，仍是企业 RAG 场景的重要选项。
- [qdrant/qdrant](https://github.com/qdrant/qdrant) — ⭐ **31,908**  
  高性能向量库与检索引擎，适合大规模 AI 搜索与 RAG 系统。
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — ⭐ **81,174**  
  跨会话持续上下文层，说明“记忆能力”已经成为 agent 体验的刚需。

---

## 3) 趋势信号分析

从今天的热榜看，社区关注点已从“会回答”转向“能执行”：skill/harness、记忆、浏览器自动化、CLI/MCP 兼容层一起爆发，`last30days-skill`、`taste-skill`、`hermes-agent`、`goose` 的超高今日增量就是最直观信号。第二个明显方向是本地化与自托管，`llama.cpp`、`Ollama`、`Open WebUI`、`Open Notebook` 持续升温，反映离线、隐私和成本红利仍在释放。RAG 也在升级，`graphify`、`mem0`、`PageIndex`、`turbovec` 指向知识图谱、长期记忆和向量less/低存储检索。整体上，这与 Claude Code、Codex、Gemini CLI 等开发者生态扩张高度同频，说明“开发者工作流”正在成为开源竞赛主战场。

---

## 4) 社区关注热点

- **Agent skill / harness 标准化**
  - 关注：[last30days-skill](https://github.com/mvanhorn/last30days-skill)、[taste-skill](https://github.com/Leonxlnx/taste-skill)、[affaan-m/ECC](https://github.com/affaan-m/ECC)、[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
  - 理由：社区正在把“提示词技巧”升级成可复用、可组合、可评测的能力模块。

- **本地模型入口与自托管 UI**
  - 关注：[llama.cpp](https://github.com/ggml-org/llama.cpp)、[Ollama](https://github.com/ollama/ollama)、[open-webui](https://github.com/open-webui/open-webui)、[open-notebook](https://github.com/lfnovo/open-notebook)
  - 理由：私有化部署、多模型切换、可控体验仍是最稳定的真实需求。

- **RAG 从向量检索走向记忆/知识图谱**
  - 关注：[mem0](https://github.com/mem0ai/mem0)、[graphify](https://github.com/safishamsi/graphify)、[PageIndex](https://github.com/VectifyAI/PageIndex)、[turbovec](https://github.com/RyanCodrai/turbovec)
  - 理由：长期记忆、低存储 RAG 和结构化知识正在成为下一代上下文层。

- **浏览器与网页自动化**
  - 关注：[browser-use](https://github.com/browser-use/browser-use)、[Firecrawl](https://github.com/firecrawl/firecrawl)、[OpenCLI](https://github.com/jackwener/OpenCLI)
  - 理由：让 agent 真正“操作网页”是从聊天到执行的关键一步。

- **面向业务场景的 AI 应用**
  - 关注：[OpenBB](https://github.com/OpenBB-finance/OpenBB)、[Cherry Studio](https://github.com/CherryHQ/cherry-studio)、[AionUi](https://github.com/iOfficeAI/AionUi)
  - 理由：AI 正在从通用能力转向财务、协作与生产力等垂直工作流。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*