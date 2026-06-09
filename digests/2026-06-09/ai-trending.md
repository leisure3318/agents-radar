# AI 开源趋势日报 2026-06-09

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-06-09 01:29 UTC

---

# AI 开源趋势日报｜2026-06-09

> 说明：Trending 榜单只提供**今日新增 stars**，因此以下 Trending 项以“今日 +x”展示；主题搜索结果只提供**总 stars**。  
> 过滤结果：Trending 16 个仓库中，已剔除 **tolaria**、**ChinaTextbook** 两个与 AI 关联不强的项目，保留 14 个 AI 相关仓库。

## 1) 今日速览

今天的开源 AI 热点非常集中：**Agent / Skills / Memory / Web Research** 成为绝对主线，说明社区关注点已经从“能聊天”转向“能执行、能研究、能持续记忆”的系统级能力。  
Trending 榜单里，跨网站研究、浏览器/网络访问、技能库、任务执行框架等项目拿到高增量，体现出 **Agent 工程化** 的明显爆发。  
与此同时，**RAG、向量索引、长期记忆** 方向继续升温，说明“上下文如何长期保存与检索”仍是落地关键。  
另一个明显信号是 **本地化/自托管/硬件感知** 趋势增强：社区越来越重视模型在本机是否跑得动、跑得好、能否低成本部署。

---

## 2) 各维度热门项目

### 🔧 AI 基础工具
- [ScrapeGraphAI/Scrapegraph-ai](https://github.com/ScrapeGraphAI/Scrapegraph-ai)｜⭐ **26,947**｜AI 驱动的爬虫与结构化抽取框架，把“抓取网页”升级成“面向 LLM 的数据管道”。
- [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig)｜⭐ **7,561**｜Rust 生态里的模块化 LLM 应用框架，代表“高性能 AI 基础设施”持续受关注。
- [vllm-project/vllm](https://github.com/vllm-project/vllm)｜⭐ **82,253**｜高吞吐、内存高效的 LLM 推理/服务引擎，仍是开源部署底座核心。
- [Andyyyy64/whichllm](https://github.com/Andyyyy64/whichllm)｜⭐ **今日 +143**｜面向本地硬件的 LLM 选型与基准工具，强调“先测再上”的工程化选型思路。
- [roboflow/supervision](https://github.com/roboflow/supervision)｜⭐ **今日 +1288**｜计算机视觉工具集，说明多模态/视觉开发依然有很强的社区需求。
- [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit)｜⭐ **34,147**｜面向 Agent 与 Generative UI 的前端栈，把模型能力快速嵌入产品界面。
- [openai/plugins](https://github.com/openai/plugins)｜⭐ **今日 +296**｜插件接入/工具调用相关仓库，显示“模型 + 外部工具”仍是重要生态方向。

### 🤖 AI 智能体 / 工作流
- [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)｜⭐ **今日 +3558**｜跨 Reddit/X/YouTube/HN/Polymarket/web 的研究型 skill，是今天最强爆点。
- [google/skills](https://github.com/google/skills)｜⭐ **今日 +461**｜Google 产品与技术的 Agent Skills，说明“技能化 agent”正在成为通用抽象。
- [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach)｜⭐ **今日 +679**｜让 AI agent 直接“看见整个互联网”，强调低成本、多平台信息获取。
- [danielmiessler/Personal_AI_Infrastructure](https://github.com/danielmiessler/Personal_AI_Infrastructure)｜⭐ **今日 +62**｜个人 AI 基础设施，代表“AI 放大个人能力”的路线。
- [phuryn/pm-skills](https://github.com/phuryn/pm-skills)｜⭐ **今日 +164**｜PM Skills Marketplace，把 agent 能力细分到发现、策略、执行、增长等环节。
- [aaif-goose/goose](https://github.com/aaif-goose/goose)｜⭐ **今日 +699**｜开源 agent，能安装、执行、编辑、测试，明显偏“任务执行型”。
- [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands)｜⭐ **76,270**｜AI 驱动开发的代表项目之一，体现多工具、多步骤自主执行的主流方向。

### 📦 AI 应用
- [santifer/career-ops](https://github.com/santifer/career-ops)｜⭐ **今日 +308**｜基于 Claude Code 的 AI 求职系统，把 agent 直接落到职业搜索场景。
- [open-webui/open-webui](https://github.com/open-webui/open-webui)｜⭐ **140,689**｜本地优先的 AI 聊天与统一入口，依旧是自托管用户的高频选择。
- [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio)｜⭐ **47,074**｜集成智能聊天与自治 agent 的生产力工作台，偏“AI 办公套件”路线。
- [OpenBB-finance/OpenBB](https://github.com/OpenBB-finance/OpenBB)｜⭐ **68,793**｜面向金融分析师与 AI agent 的数据平台，垂直行业应用特征明显。
- [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)｜⭐ **41,393**｜LLM 驱动的股市分析仪表盘，体现 AI 在量化/投研场景的实战落地。
- [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)｜⭐ **25,298**｜从文档直接生成可编辑 PPT，属于典型“内容到交付物”的 AI 应用。

### 🧠 大模型 / 训练
- [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow)｜⭐ **195,609**｜经典机器学习框架，仍是训练、推理与部署的核心基础设施之一。
- [huggingface/transformers](https://github.com/huggingface/transformers)｜⭐ **161,421**｜事实上的模型定义/训练/推理标准库，覆盖文本、视觉、音频与多模态。
- [pytorch/pytorch](https://github.com/pytorch/pytorch)｜⭐ **100,603**｜研究与工业界最通用的深度学习框架，训练生态依旧稳固。
- [open-compass/opencompass](https://github.com/open-compass/opencompass)｜⭐ **7,068**｜LLM 评测平台，覆盖大量模型与数据集，反映“评测先行”趋势。
- [hiyouga/LlamaFactory](https://github.com/hiyouga/LlamaFactory)｜⭐ **72,001**｜统一高效微调 100+ LLM/VLM 的热门工具，适合快速做定制化模型。
- [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm)｜⭐ **4,258**｜Apple Silicon 上的 LLM 推理/服务学习项目，强调系统工程与本地部署。
  
### 🔍 RAG / 知识库
- [RyanCodrai/turbovec](https://github.com/RyanCodrai/turbovec)｜⭐ **今日 +1729**｜向量索引项目，说明检索/索引底座仍是高热度方向。
- [MemPalace/mempalace](https://github.com/MemPalace/mempalace)｜⭐ **今日 +170**｜AI memory system，聚焦 agent 的长期记忆能力。
- [mem0ai/mem0](https://github.com/mem0ai/mem0)｜⭐ **58,078**｜通用记忆层，为多轮、多 session 的 agent 提供持久上下文。
- [infiniflow/ragflow](https://github.com/infiniflow/ragflow)｜⭐ **82,221**｜成熟的 RAG 引擎，把检索与 agent 能力整合成上下文层。
- [run-llama/llama_index](https://github.com/run-llama/llama_index)｜⭐ **50,012**｜文档 agent 与 OCR 平台，仍是 RAG 生态的重要组件。
- [zilliztech/claude-context](https://github.com/zilliztech/claude-context)｜⭐ **11,801**｜把整个代码库变成 Claude Code 的上下文，直击“代码即知识库”。
- [qdrant/qdrant](https://github.com/qdrant/qdrant)｜⭐ **31,935**｜高性能向量数据库，RAG 与语义检索基础设施的常青树。

---

## 3) 趋势信号分析

今日 Trending 最强信号是 **Agent 工程化爆发**：skills、harness、浏览器接入、网页研究、任务执行、插件调用等项目集体升温，说明社区关注点已从“会回答”转向“会做事”。第二个信号是 **记忆与检索底座走强**：向量索引、长期记忆、RAG、代码库上下文化密集出现，反映长上下文成本仍高，外部记忆是 agent 落地刚需。第三个信号是 **本地化与硬件感知选型**：whichllm、mempalace、goose 等项目强调本机运行、可比较、可自托管，说明开源社区正在从“追模型”转向“追可部署性与可控性”。整体上，热度正从模型本身迁移到“模型 + 工具 + 记忆 + UI”的完整系统栈。

---

## 4) 社区关注热点

- **[mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill)**：研究型 agent 的热度极高，说明“信息聚合 + grounded summary”是强需求。
- **[Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach)**：把 agent 的信息获取能力扩展到全网，适合观察 web research 工具链走向。
- **[MemPalace/mempalace](https://github.com/MemPalace/mempalace)** / **[mem0ai/mem0](https://github.com/mem0ai/mem0)**：长期记忆已经从“加分项”变成 agent 的关键能力。
- **[Andyyyy64/whichllm](https://github.com/Andyyyy64/whichllm)**：本地 LLM 选型开始工具化，说明社区越来越关心硬件适配与实际性能。
- **[infiniflow/ragflow](https://github.com/infiniflow/ragflow)** / **[zilliztech/claude-context](https://github.com/zilliztech/claude-context)**：RAG 与代码上下文管理仍是最值得投入的基础设施方向之一。

如果你愿意，我还可以把这份日报进一步整理成：
1. **按“涨幅/热度”排序的排行榜版**，或  
2. **适合公众号/内部晨报的精简版（300-500 字）**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*