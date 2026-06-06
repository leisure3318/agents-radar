# AI Open Source Trends 2026-06-07

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-06-06 22:58 UTC

---

## AI Open Source Trends Report — 2026-06-07  
*Filtered to AI/ML-relevant repositories only; non-AI trending repos were excluded.*

### 1) Today’s Highlights
Today’s open-source AI attention is clearly centered on the **agent layer** rather than new base models. The biggest daily star spikes are for projects that add **skills, memory, web access, and product-grade UI** to LLMs, such as [obra/superpowers](https://github.com/obra/superpowers), [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach), [lfnovo/open-notebook](https://github.com/lfnovo/open-notebook), and [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit).  
A second strong signal is **context and retrieval plumbing**: memory systems, OCR/document ingestion, and NotebookLM-style apps are seeing real pull, led by [MemPalace/mempalace](https://github.com/MemPalace/mempalace) and [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR).  
The ecosystem is also leaning hard into **CLI-native, model-agnostic workflows** and **local-first runtimes**, which suggests the market is maturing from “chatbots” to durable AI operating layers.

---

## 2) Top Projects by Category

> **Note:** Trending-list repos show **today’s new stars** only; topic-search repos show **total stars** only.

### 🔧 AI Infrastructure
- [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) — **Trending today: +613** — A frontend stack for agents and generative UI; notable because agent UX is becoming a first-class product layer.
- [ollama/ollama](https://github.com/ollama/ollama) — **Total stars: 173,388** — A local model runtime that keeps expanding model choice and makes “bring your own model” the default dev pattern.
- [langchain-ai/langchain](https://github.com/langchain-ai/langchain) — **Total stars: 138,676** — The agent engineering platform; still central to orchestration, tool calling, and app scaffolding.
- [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) — **Total stars: 129,522** — Web search/scraping infrastructure for agents, important as more systems need live web grounding.
- [browser-use/browser-use](https://github.com/browser-use/browser-use) — **Total stars: 97,490** — Makes websites accessible to AI agents; a key piece of browser automation infrastructure.
- [openai/plugins](https://github.com/openai/plugins) — **Trending today: +215** — The plugin layer is resurfacing as developers revisit standardized tool integration for agents.
- [openai/whisper](https://github.com/openai/whisper) — **Trending today: +155** — A foundational speech-recognition engine; still relevant as voice-first AI workflows expand.

### 🤖 AI Agents / Workflows
- [obra/superpowers](https://github.com/obra/superpowers) — **Trending today: +1008** — An agentic skills framework and methodology; today’s standout burst shows strong demand for reusable agent workflows.
- [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) — **Trending today: +700** — Gives agents “eyes” across the internet; especially relevant for web research and autonomous discovery.
- [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) — **Trending today: +441** — A topic-research skill for agent systems; useful because grounded synthesis is a core agent need.
- [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) — **Total stars: 184,799** — The classic autonomous agent project; still a reference point for the category.
- [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) — **Total stars: 184,718** — A growing agent framework; worth watching as the open agent stack keeps evolving.
- [langgenius/dify](https://github.com/langgenius/dify) — **Total stars: 144,169** — A production-ready platform for agentic workflow development.
- [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) — **Total stars: 76,032** — AI-driven development in an open platform; strong signal for software-engineering agents.
- [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) — **Total stars: 65,047** — A small but telling trend: “agent harness” tooling is becoming a discipline of its own.

### 📦 AI Applications
- [lfnovo/open-notebook](https://github.com/lfnovo/open-notebook) — **Trending today: +783** — An open-source NotebookLM-style app; one of today’s biggest consumer-style AI bursts.
- [santifer/career-ops](https://github.com/santifer/career-ops) — **Trending today: +203** — An AI-powered job search system; vertical copilots continue to attract attention when they solve a painful workflow.
- [microsoft/VibeVoice](https://github.com/microsoft/VibeVoice) — **Trending today: +219** — Open-source frontier voice AI; voice applications remain a high-interest frontier.
- [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) — **Total stars: 61,154** — A local-first AI app for private knowledge and assistant workflows.
- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) — **Total stars: 41,059** — A market-analysis app built around LLMs and multi-source data feeds.
- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) — **Total stars: 24,806** — Generates editable PowerPoint decks from documents; practical document-to-output automation is a hot use case.

### 🧠 LLMs / Training
- [huggingface/transformers](https://github.com/huggingface/transformers) — **Total stars: 161,362** — The core model framework for text, vision, audio, and multimodal work; still the default foundation for model development.
- [vllm-project/vllm](https://github.com/vllm-project/vllm) — **Total stars: 82,074** — A high-throughput inference and serving engine; essential as deployment efficiency stays a priority.
- [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) — **Total stars: 96,772** — A widely used educational implementation of LLM building blocks; strong for learning and prototyping.
- [jingyaogong/minimind](https://github.com/jingyaogong/minimind) — **Total stars: 51,231** — A compact LLM training project; reflects continued interest in training small models from scratch.
- [open-compass/opencompass](https://github.com/open-compass/opencompass) — **Total stars: 7,062** — A model evaluation platform; evaluation remains critical as model and agent complexity rises.
- [galilai-group/stable-pretraining](https://github.com/galilai-group/stable-pretraining) — **Total stars: 250** — A scalable pretraining library; relevant to researchers exploring robust foundation/model training.
  
### 🔍 RAG / Knowledge
- [MemPalace/mempalace](https://github.com/MemPalace/mempalace) — **Trending today: +441** — An open-source AI memory system; memory is becoming a differentiator for long-running agents.
- [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) — **Trending today: +449** — OCR that turns PDFs/images into structured data for AI; crucial for document ingestion pipelines.
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow) — **Total stars: 82,044** — A leading RAG engine that combines retrieval with agent capabilities.
- [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) — **Total stars: 80,984** — Persistent cross-session context for agents; strongly aligned with the memory-first trend.
- [mem0ai/mem0](https://github.com/mem0ai/mem0) — **Total stars: 57,893** — A universal memory layer for AI agents; one of the clearest infrastructure bets in this space.
- [run-llama/llama_index](https://github.com/run-llama/llama_index) — **Total stars: 49,960** — A major document-agent and OCR platform; still a core RAG building block.
- [qdrant/qdrant](https://github.com/qdrant/qdrant) — **Total stars: 31,862** — A high-performance vector database; the retrieval stack remains foundational.
- [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) — **Total stars: 32,658** — A “vectorless” reasoning-based RAG approach; interesting because it pushes retrieval beyond classic embeddings.

---

## 3) Trend Signal Analysis
The strongest signal in today’s hot list is that **AI agent tooling is pulling the most explosive community attention**. Repos like [obra/superpowers](https://github.com/obra/superpowers) (+1008 today), [lfnovo/open-notebook](https://github.com/lfnovo/open-notebook) (+783), [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) (+700), and [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) (+613) all focus on making models more useful in real workflows, not just more capable in isolation. The common denominator is **skills, orchestration, memory, and UI**.

A second major direction is the rise of **context plumbing**. [MemPalace/mempalace](https://github.com/MemPalace/mempalace), [mem0ai/mem0](https://github.com/mem0ai/mem0), [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem), [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR), and [infiniflow/ragflow](https://github.com/infiniflow/ragflow) show that the bottleneck is shifting from “generate text” to “collect, structure, retain, and re-inject context.” This is a strong sign that memory and retrieval are becoming product features, not just backend utilities.

Another noteworthy trend is the move toward **CLI-native and model-agnostic stacks**. Many projects target Claude Code, Codex, OpenCode, Cursor, Gemini CLI, or multiple model providers, suggesting the ecosystem is standardizing around tool-using agents that can run across environments. Combined with local runtimes like [ollama/ollama](https://github.com/ollama/ollama), this points to a post-chat phase where AI is embedded directly into shells, browsers, and workflows. Recent improvements in coding-capable and open-weight models are likely accelerating this shift by making agent harnesses more practical and broadly useful.

---

## 4) Community Hot Spots
- **Agent harnesses for coding and research**: [obra/superpowers](https://github.com/obra/superpowers), [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach), and [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) are worth watching because they turn LLMs into repeatable operators, not just chat interfaces.
- **Generative UI for agents**: [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) suggests the frontend layer is becoming strategic; agent products increasingly need structured interaction patterns, not plain chat.
- **Memory-first AI systems**: [MemPalace/mempalace](https://github.com/MemPalace/mempalace), [mem0ai/mem0](https://github.com/mem0ai/mem0), and [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) point to memory as a key moat for durable assistants.
- **NotebookLM-style knowledge apps**: [lfnovo/open-notebook](https://github.com/lfnovo/open-notebook) and [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) show strong demand for document-heavy, grounded AI workflows.
- **Web access and grounding infrastructure**: [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) and [browser-use/browser-use](https://github.com/browser-use/browser-use) are becoming essential primitives for agents that need live web interaction.

If you want, I can also turn this into a **table version** or a **weekly comparison against prior days**.

---
*This digest is auto-generated by [agents-radar](https://github.com/leisure3318/agents-radar).*