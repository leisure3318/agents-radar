# ArXiv AI 研究日报 2026-07-29

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-07-29 01:03 UTC

---

# ArXiv AI 研究日报（2026-07-29）

## 1) 今日速览
今天的论文整体呈现出一个很清晰的趋势：**AI 正从“更大”转向“更可控、更高效、更可审计”**。一方面，Kimi K3、长上下文缓存压缩、稀疏注意力索引等工作继续推动大模型的系统级能力边界；另一方面，智能体研究开始更关注规划质量、记忆机制、修复稳定性与安全边界，而不只是“能不能跑通”。  
同时，医疗、多模态文档、气象预警、代码评审、威胁情报等应用论文明显增多，且都强调**证据对齐、可解释性、治理与评估**。整体来看，今天的投稿更像是在回答一个问题：**如何把强模型真正变成可靠系统**。

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

- [**Kimi K3: Open Frontier Intelligence**](http://arxiv.org/abs/2607.24653v1)  
  作者：Kimi Team 等  
  一句话：2.8T 参数 MoE、104B 激活参数、100 万 token 上下文，代表了前沿大模型在**长上下文与多模态能力**上的最新系统化推进。

- [**DataOrchestra: Learning to Orchestrate Per-Example Curation of Pretraining Data**](http://arxiv.org/abs/2607.24717v1)  
  作者：Z. Huang 等  
  一句话：把预训练数据处理从“按域统一策略”推进到“按样本自适应编排”，对提升数据质量与训练效率都很关键。

- [**D-Score: A Spectral Hidden-State Signal for Hallucination Detection in Large Language Models**](http://arxiv.org/abs/2607.24586v1)  
  作者：B. Raimondi 等  
  一句话：用隐藏状态的谱结构做幻觉检测，提供了一个**不依赖外部标注证据**的轻量信号，适合落地到在线监控。

- [**Hierarchical Group-Conditional Conformal Risk Control for Selective Prediction in Language Models**](http://arxiv.org/abs/2607.24562v1)  
  作者：M. Salem 等  
  一句话：把选择性预测从整体风险保证推进到**分组风险控制**，更贴近真实用户群体与合规要求。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

- [**The Physics of Multi-Turn Long-Horizon Planning: From Pre-training to Post-training via Single- and Multi-Teacher On-Policy Agentic Distillation**](http://arxiv.org/abs/2607.24720v1)  
  作者：T. Men 等  
  一句话：系统分析长程规划能力如何在预训练、后训练与多教师蒸馏中形成，是理解**agent 规划能力来源**的重要工作。

- [**Looping Is Not Reliability: State-Bound Evidence and Typed Revision Contracts for Agentic Code Repair**](http://arxiv.org/abs/2607.24604v1)  
  作者：X. Gao 等  
  一句话：直接指出“多轮修复循环≠可靠”，并提出状态边界证据与修订契约，戳中了 coding agent 的核心痛点。

- [**Eviction as Estimation: A Fixed-Lag Smoothing View of Test-Time Memory, and When Measuring Beats Accumulating**](http://arxiv.org/abs/2607.24667v1)  
  作者：M. Vemula, N. P. Gajula  
  一句话：把测试时记忆管理重新表述为估计问题，为长上下文系统里“删什么、留什么”提供了更理论化的视角。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

- [**Certified Parallel-in-Time Sinkhorn for Dynamic Entropic Optimal Transport**](http://arxiv.org/abs/2607.24741v1)  
  作者：X. Wen  
  一句话：面向动态 OT 的并行时间 Sinkhorn，把原本串行的迭代瓶颈改造成更可并行的执行器，适合流匹配等任务。

- [**LOCKS: Page-Local Compact Key Summaries for Efficient Long-Context Decoding**](http://arxiv.org/abs/2607.24555v1)  
  作者：J. Hwang  
  一句话：针对长上下文解码中的 KV cache 负担，提出页级局部紧凑摘要，是很实用的**推理加速**思路。

- [**PIVOT: Efficient Query-Group Indexing for Token-Level Sparse Attention**](http://arxiv.org/abs/2607.24593v1)  
  作者：H. Liu 等  
  一句话：直面 token 级稀疏注意力的“索引器瓶颈”，把效率优化推进到注意力系统的前端关键路径。

---

### 📊 应用（垂直领域、多模态、代码生成）

- [**ClinFusion: A Vision-Centric Multimodal LLM System for Holistic Medical Understanding**](http://arxiv.org/abs/2607.24743v1)  
  作者：H. Yuan 等  
  一句话：聚焦 2D/3D 医学影像与临床理解，强调**视觉中心**的医疗多模态建模与评测，应用价值很高。

- [**EgoPlay: Event-Triggered Video Editing for Egocentric Streams**](http://arxiv.org/abs/2607.24560v1)  
  作者：J. Mai 等  
  一句话：把“事件触发”引入第一视角视频编辑，面向真实视频流的自动内容重写与生成，实用性强。

- [**TRACE-CTI: Auditable Post-Extraction Governance of TTP Claims with Knowledge Graphs**](http://arxiv.org/abs/2607.24563v1)  
  作者：F. Valletta 等  
  一句话：面向威胁情报自动抽取后的治理与审计，强调证据、来源和验证历史，属于**可落地的安全 AI**。

---

## 3) 研究趋势信号
今天的投稿透露出一个强信号：AI 研究正在从“模型能力展示”转向“系统责任交付”。长上下文、稀疏注意力、记忆管理、数据编排等工作，说明效率不再只是工程优化，而是能力边界的一部分；与此同时，规划可靠性、幻觉检测、分组风险控制、证据归因与审计机制，表明研究重心正在向**可验证、可解释、可部署**迁移。垂直领域应用则越来越强调“任务完成”之外的合规与可信。

---

## 4) 值得精读

1. [**Kimi K3: Open Frontier Intelligence**](http://arxiv.org/abs/2607.24653v1)  
   理由：它代表了当前 frontier 模型在**参数规模、MoE、长上下文和多模态**上的最新组合路线，适合把握大模型系统演进方向。

2. [**The Physics of Multi-Turn Long-Horizon Planning: From Pre-training to Post-training via Single- and Multi-Teacher On-Policy Agentic Distillation**](http://arxiv.org/abs/2607.24720v1)  
   理由：如果关心 agent 能力从何而来，这篇对“规划能力形成机制”的分析很值得细读，且与后训练/蒸馏密切相关。

3. [**D-Score: A Spectral Hidden-State Signal for Hallucination Detection in Large Language Models**](http://arxiv.org/abs/2607.24586v1)  
   理由：它瞄准的是大模型最核心的落地问题之一——幻觉检测；方法简单、信号明确，具备较强的系统集成潜力。

如果你愿意，我也可以把这份日报进一步整理成：
- **适合发内部群的超短版**
- **适合周报/邮件的正式版**
- **按“LLM / Agent / Systems / Application”做成表格版**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*