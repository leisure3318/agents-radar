# AI 开源趋势日报 2026-06-10

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-06-10 01:38 UTC

---

# AI 开源趋势日报（2026-06-10）

## 1) 今日速览
今天的 GitHub AI 热度，明显集中在 **AI Agent 工程化** 和 **可落地的垂直应用** 两条线。  
Trending 榜单里，`agent-skills`、系统提示词集合、以及面向 AI 工具链的资源仓库涨星非常快，说明社区正在从“会聊天的模型”转向“能执行任务的 Agent 基础设施”。  
与此同时，医疗 AI、AI 赚钱类应用也开始获得关注，反映出开源项目的商业化与场景化正在加速。  
主题搜索结果则显示，**RAG/知识库、向量数据库、LLM 训练与治理** 仍是长期热点，但更偏“底座型”和“研究型”增长。  
OpenCV 的再上榜也说明：视觉基础能力依然是 AI 生态的重要底盘。

---

## 2) 筛选说明
**已保留**：与 AI/ML、Agent、LLM、RAG、向量数据库、AI 应用明确相关的项目。  
**已剔除**：明显非 AI 的通用工程工具或弱相关项目，例如：
- `francescopace/espectre`（Wi‑Fi/CSI 运动检测，非 AI）
- `apache/airflow`、`streamlit/streamlit`（通用数据/工作流工具，不是 AI 主题核心）
- `thedaviddias/Front-End-Checklist`（前端清单，不属于 AI/ML 项目）

---

## 3) 各维度热门项目

### 🔧 AI 基础工具
1. [**addyosmani/agent-skills**](https://github.com/addyosmani/agent-skills)  
   ⭐ 0（+443 today）  
   面向 AI coding agent 的“生产级技能”集合；今天涨星最高，直接反映出社区对 Agent 工程化工具链的强需求。

2. [**x1xhlol/system-prompts-and-models-of-ai-tools**](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)  
   ⭐ 0（+79 today）  
   汇总多款 AI 工具/编码 Agent 的 system prompts 与内部模型信息；典型的“提示词/工具链基础设施”资源。

3. [**googleworkspace/cli**](https://github.com/googleworkspace/cli)  
   ⭐ 26,947  
   Google Workspace CLI，支持带有 AI agent skills 的命令行集成；说明企业级工具正在向“可被 Agent 调用”演进。

4. [**opencv/opencv**](https://github.com/opencv/opencv)  
   ⭐ 0（+102 today）  
   经典计算机视觉库，虽非新项目，但仍是 AI 视觉场景的底层基础设施。

---

### 🤖 AI 智能体 / 工作流
1. [**addyosmani/agent-skills**](https://github.com/addyosmani/agent-skills)  
   ⭐ 0（+443 today）  
   把“Agent 能做什么”拆成可复用技能，正中当前 agent 应用落地痛点。

2. [**Eigenwise/atomic-agents**](https://github.com/Eigenwise/atomic-agents)  
   ⭐ 5,973  
   主打“Atomic”方式构建 AI agents，强调模块化、可组合，适合多智能体/工作流编排。

3. [**googleworkspace/cli**](https://github.com/googleworkspace/cli)  
   ⭐ 26,947  
   不是纯 Agent 框架，但它把办公系统暴露给 agent 使用，是典型的“Agent + 业务系统”集成入口。

4. [**x1xhlol/system-prompts-and-models-of-ai-tools**](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)  
   ⭐ 0（+79 today）  
   多个 Agent/AI 工具的系统提示词资源，属于 agent 生态里的“作业规范层”。

---

### 📦 AI 应用
1. [**maziyarpanahi/openmed**](https://github.com/maziyarpanahi/openmed)  
   ⭐ 0（+191 today）  
   开源医疗 AI 项目，属于垂直行业落地代表；医疗场景对合规、数据与可解释性要求高，因此更受关注。

2. [**yikart/AiToEarn**](https://github.com/yikart/AiToEarn)  
   ⭐ 0（+402 today）  
   “Let’s use AI to Earn!” 直接指向 AI 商业化/变现应用；今日涨星强劲，说明社区对消费级 AI 应用仍有热度。

3. [**mindsdb/minds-platform**](https://github.com/mindsdb/minds-platform)  
   ⭐ 39,276  
   面向知识工作者的通用 AI 平台，可扩展部署到 VPC/on-prem/cloud；既是应用平台，也具备知识管理与工作流属性。

---

### 🧠 大模型 / 训练
1. [**chrisliu298/awesome-llm-unlearning**](https://github.com/chrisliu298/awesome-llm-unlearning)  
   ⭐ 596  
   聚焦大模型“遗忘/去学习（unlearning）”研究资源，属于模型治理与安全方向的典型热点。

2. [**HKBU-LAGAS/Awesome-Item-ID-Gen-RecSys**](https://github.com/HKBU-LAGAS/Awesome-Item-ID-Gen-RecSys)  
   ⭐ 94  
   面向生成式推荐系统中 item identifier/tokenization 的研究整理，属于大模型与推荐系统交叉方向。

---

### 🔍 RAG / 知识库
1. [**mindsdb/minds-platform**](https://github.com/mindsdb/minds-platform)  
   ⭐ 39,276  
   兼具知识工作流和可扩展部署能力，天然贴近 RAG/知识管理/企业知识中枢场景。

2. [**oceanbase/oceanbase**](https://github.com/oceanbase/oceanbase)  
   ⭐ 10,148  
   分布式数据库，主题标签指向 vector-db，说明其在 AI workloads、检索与数据底座方向被持续关注。

3. [**x1xhlol/system-prompts-and-models-of-ai-tools**](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)  
   ⭐ 0（+79 today）  
   更偏“提示词知识库”而非传统 RAG，但从知识管理角度看，它反映了社区对可复用 prompt 资产的需求。

---

## 4) 趋势信号分析
今天最强的信号，是 **AI Agent 工程化正在快速升温**：`agent-skills`、`atomic-agents`、`system-prompts-and-models-of-ai-tools`，再加上带 agent skills 的 `googleworkspace/cli`，共同说明开发者关注点已从“模型本身”转向“模型如何稳定执行任务、如何接工具、如何进入生产系统”。第二条线是 **垂直场景 AI 的商业化**，医疗 AI `openmed` 与 `AiToEarn` 都有明显涨星，说明社区在寻找能直接产生价值的应用形态。研究侧则以 `LLM unlearning`、生成式推荐等方向延续热度，属于模型治理与行业融合的长尾需求。OpenCV 的存在也提示：视觉底座依然是 AI 生态的重要支撑，而 `mindsdb`、`OceanBase` 则说明 RAG/知识库与数据底层正在被重新包装成 AI 时代的基础设施。

---

## 5) 社区关注热点
- **AI coding agent 技能标准化**  
  代表：[`addyosmani/agent-skills`](https://github.com/addyosmani/agent-skills)  
  理由：最直接反映“让 Agent 真能干活”的工程需求，值得持续跟踪。

- **系统提示词与工具资产沉淀**  
  代表：[`x1xhlol/system-prompts-and-models-of-ai-tools`](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)  
  理由：提示词工程正在从经验玩法变成可复用资产库。

- **垂直行业 AI，尤其是医疗场景**  
  代表：[`maziyarpanahi/openmed`](https://github.com/maziyarpanahi/openmed)  
  理由：高合规、高价值场景更容易形成长期开源项目和真实需求。

- **LLM 安全与治理：unlearning**  
  代表：[`chrisliu298/awesome-llm-unlearning`](https://github.com/chrisliu298/awesome-llm-unlearning)  
  理由：随着模型进入生产，隐私、纠偏、数据删除变得越来越重要。

- **RAG / 数据底座与向量化能力**  
  代表：[`mindsdb/minds-platform`](https://github.com/mindsdb/minds-platform)、[`oceanbase/oceanbase`](https://github.com/oceanbase/oceanbase)  
  理由：知识检索、企业数据接入和 AI 数据层依然是大模型落地的关键瓶颈。

如果你希望，我还可以把这份日报进一步整理成 **“可直接发公众号/飞书的排版版”**，或者输出成 **表格 CSV/Markdown**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*