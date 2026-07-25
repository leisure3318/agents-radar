# ArXiv AI 研究日报 2026-07-25

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 41 篇论文 | 生成时间: 2026-07-25 01:06 UTC

---

# ArXiv AI 研究日报（2026-07-25）

## 1) 今日速览
今天的论文明显围绕三条主线展开：**智能体化 AI** 继续升温，从训练框架、上下文管理到长程推理优化，研究开始更关注“可训练、可部署、可治理”的 agent 系统。  
第二条主线是 **多模态推理与控制**，包括 3D 视觉语言、视频生成、图文/图示双视角推理等，强调更细粒度的空间理解与交互控制。  
第三条主线是 **方法与效率**：长上下文推理、离散/连续 flow、量化、测试时缩放与统计检验等基础方法仍在快速推进。  
同时，LLM 评估与安全也出现更细颗粒度的新问题，比如**谄媚、道德判断、混合作者检测**，显示出模型治理正在从“好不好用”转向“如何稳定可靠地用”。  

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

- [**Windowed-MTP: Removing the Full-Context Draft-KV Tax at Million-Token Context**](http://arxiv.org/abs/2607.21535v1)  
  作者：Alagappan V.  
  一句话：针对百万级上下文下 speculative decoding 的 draft-KV 成本，提出 windowed 方案，直击长上下文推理的实际瓶颈。

- [**Beyond Sycophancy: Structured Resistance and Compliance in LLM Moral Reasoning**](http://arxiv.org/abs/2607.21558v1)  
  作者：B. Wang, B. Koch  
  一句话：把“讨好用户”拆解为可分辨的服从/抵抗结构，为 LLM 的道德推理与对齐评估提供了更细的刻画框架。

- [**Detecting LLM-Generated Tokens in Human--LLM Coauthored Text**](http://arxiv.org/abs/2607.21458v1)  
  作者：Y. Lu, H. Zhou, F. Spill 等  
  一句话：从“文档级检测”推进到“token 级定位”，适合人机协作写作场景下的内容溯源与审计。

- [**Agentic Context Management: Solving Agent Memory and Cost by Treating Them as Lifecycle and Architecture Problems**](http://arxiv.org/abs/2607.21503v1)  
  作者：G. Dadhich  
  一句话：把 agent 的记忆与成本问题上升为生命周期/架构问题，强调上下文治理是生产级智能体的核心能力。

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

- [**OpenForgeRL: Train Harness-native Agents in Any Environment**](http://arxiv.org/abs/2607.21557v1)  
  作者：X. Yu, B. Peng, R. Xu 等  
  一句话：面向 Claude Code/Codex 类 harness 训练范式，试图让 agent 直接在真实工具环境中端到端训练。

- [**AREX: Towards a Recursively Self-Improving Agent for Deep Research**](http://arxiv.org/abs/2607.21461v1)  
  作者：S. Lu, C. Li, K. Luo 等  
  一句话：利用“发现—验证”不对称，把深度研究拆成可递归改进的搜索与校验过程，方向很有 agent 代表性。

- [**PATS: Policy-Aware Training Scaffolding for Agentic Reinforcement Learning**](http://arxiv.org/abs/2607.21419v1)  
  作者：Y. Shi, Z. Ma, Y. Wang 等  
  一句话：针对长程 agent RL 中“重复失败、轨迹贫乏”的问题，提出 policy-aware scaffolding 来提升探索质量。

- [**Test-Time Scaling via Error Localization**](http://arxiv.org/abs/2607.21453v1)  
  作者：R. S. Chitale, R. Madhavan, T. Gupta 等  
  一句话：把测试时扩展算力与“错误定位”结合，试图让推理增量更有针对性，而不是盲目采样/反复改写。

### 🔧 方法与框架（新技术、基准测试、效率优化）

- [**Expanding Flow Maps**](http://arxiv.org/abs/2607.21585v1)  
  作者：Sophia Tang, Pranam Chatterjee  
  一句话：提出可扩展维度/序列长度的 flow 参数化，解决传统 flow 模型“固定形状”的结构限制。

- [**Zero-Flow Two-Sample Tests**](http://arxiv.org/abs/2607.21542v1)  
  作者：Y. Wang, L. Wang, S. Liu 等  
  一句话：基于 zero-flow criterion 构造两样本检验，为生成模型、分布比较提供了一个新的统计工具。

- [**Context-weighted Discrete Flow Matching**](http://arxiv.org/abs/2607.21427v1)  
  作者：D. Cherniavskii, D. Severo, K. Ullrich  
  一句话：给离散 flow matching 引入上下文加权，缓解不同 token 难度混杂导致的训练不稳定问题。

- [**Bridging the Gap Between Plausibility and Admissibility: Constraint-Aware Flow Maps for Dynamic Graph Systems**](http://arxiv.org/abs/2607.21421v1)  
  作者：M. Romei de Socio, G. L. Pozzato, A. Merlo  
  一句话：把“看起来合理”与“结构上可行”区分开，强调后验约束对动态图生成/决策的重要性。

### 📊 应用（垂直领域、多模态、代码生成）

- [**3D-Aware VLMs with Implicit and Explicit Geometries**](http://arxiv.org/abs/2607.21595v1)  
  作者：W. Li, X. Jiang, Q. Qian 等  
  一句话：将隐式/显式几何注入 VLM，增强 3D 空间理解与推理能力，面向真实 3D 任务很关键。

- [**GraphVid: Interactive Graph-Controllable Video Generation**](http://arxiv.org/abs/2607.21580v1)  
  作者：V. Shah, O. Susladkar, T. Prakash 等  
  一句话：用图结构来控制视频中多对象交互，提升了复杂场景下的可控生成精度。

- [**MIRROR: Learning from the Other View for Multi-Modal Reasoning**](http://arxiv.org/abs/2607.21552v1)  
  作者：W. Ye, Y. Qu, A. Kumar 等  
  一句话：利用图文/图示/联合视角之间的行为差异来增强多模态推理，适合几何与视觉 reasoning 任务。

---

## 3) 研究趋势信号
今天的投稿显示出一个很清晰的方向：**AI 正从“单模型能力提升”转向“系统级可控与可验证”**。智能体研究开始围绕 harness、记忆、验证链路、失败复用等工程问题展开；多模态则从识别走向推理与生成控制；与此同时，flow、量化、长上下文、测试时扩展等基础方法继续为大模型落地降本增效。  

---

## 4) 值得精读

1. [**OpenForgeRL: Train Harness-native Agents in Any Environment**](http://arxiv.org/abs/2607.21557v1)  
   理由：它直接对应当前 agent 训练的核心痛点——真实工具环境、端到端训练和 open infrastructure 的对接，非常贴近落地需求。

2. [**Windowed-MTP: Removing the Full-Context Draft-KV Tax at Million-Token Context**](http://arxiv.org/abs/2607.21535v1)  
   理由：百万 token 级别推理是行业热点，这篇抓住了 speculative decoding 的实际成本问题，应用价值很强。

3. [**AREX: Towards a Recursively Self-Improving Agent for Deep Research**](http://arxiv.org/abs/2607.21461v1)  
   理由：它把“研究型 agent”抽象成发现—验证闭环，适合关注长程推理、自动研究和自我改进系统的读者。  

如果你愿意，我也可以把这份日报进一步整理成：
- **“按重要性排名的 Top 10”**
- **“适合发公众号/内部周报的精简版”**
- **“附每篇论文的一句话中文解读版”**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*