# ArXiv AI 研究日报 2026-09-02

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-02 03:27 UTC

---

# ArXiv AI 研究日报（2026-09-02，基于 50 篇论文）

## 1) 今日速览
今天的论文集中体现出三个明显方向：**从“结果评测”走向“机制理解”**，例如 LLM-as-a-Judge、对齐脆弱性与知识蒸馏的训练阶段效应；**从“单轮智能”走向“可持续智能体系统”**，包括 harness、自我改造、长程 trace 与多日软件开发；以及**从通用能力走向可部署效率**，涵盖检索、量化、标注预算分配、企业自托管和文档 VLM 成本控制。  
另一个强信号是，**语言反馈正在被系统化为训练信号**，Verbal Reinforcement Learning、Student Simulator、Thought Partner 等工作都在探索“用自然语言改进模型”。  
在应用层面，研究开始更深入地进入**机器人精密操控、视频控制、科学发现、医疗分割和企业文档处理**等高价值场景。  
整体来看，今天的投稿不只是追求更强模型，更强调**可解释、可控、可落地、可评估**。

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

1. **[Beyond Scores: Understanding LLM-as-a-Judge Mechanisms in Summarization Evaluation](http://arxiv.org/abs/2609.01604v1)**  
   作者：H. Vasava, M. Jiang  
   一句话：从机制层面拆解 LLM 作为评审器如何打分，帮助我们判断“分数”到底可信到什么程度。

2. **[The Rise of Verbal Reinforcement Learning](http://arxiv.org/abs/2609.01597v1)**  
   作者：K. Tayal, A. Sharma, G. I. Winata 等  
   一句话：提出“语言反馈即强化学习”的统一框架，说明自然语言可能成为下一代 agent 训练的核心信号。

3. **[Scaling Near-Optimal SFT-RL Annotation Budget Allocation from Small to Large LLMs](http://arxiv.org/abs/2609.01573v1)**  
   作者：J. Wang, A. Verma, X. Lin 等  
   一句话：研究 SFT 与 RL 标注预算如何最优分配，直指后训练阶段最现实的成本效率问题。

4. **[Knowledge Distillation During Mid-Training Favors Reasoning over Factual Recall](http://arxiv.org/abs/2609.01532v1)**  
   作者：J. He, H. Yen, S. S. Li 等  
   一句话：揭示中期蒸馏更偏向提升推理能力而非死记事实，为“何时蒸馏”提供训练阶段视角。

5. **[When Safety Routing Breaks: Understanding Alignment Fragility under Benign Fine-Tuning](http://arxiv.org/abs/2609.01455v1)**  
   作者：Y. Guo, X. Chen, S. Zhang 等  
   一句话：解释为什么看似无害的微调会显著削弱拒答对齐，补充了安全退化的几何机制视角。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

6. **[Efficient SWE Agent Benchmarking via Trajectory-Aware Evaluation](http://arxiv.org/abs/2609.01603v1)**  
   作者：K. Duan, D. Zheng, Y. Wang 等  
   一句话：把软件工程 agent 的评测从“只看结果”推进到“看轨迹”，更适合衡量真实开发任务中的有效性。

7. **[CordisBench: Can Language Models Reason About Component Lifecycles in Dynamic Agent Harnesses?](http://arxiv.org/abs/2609.01600v1)**  
   作者：D. Sileo, D. Kachler  
   一句话：专门测试模型能否理解动态 harness 中组件生命周期，聚焦 agent 系统里的“运行时推理”。

8. **[Harness-of-Harness: Multi-Day Autonomous Software Development with Continual Improvement](http://arxiv.org/abs/2609.01481v1)**  
   作者：H. Yan, M.-l. Su, H. Zhang 等  
   一句话：展示 agent 如何在多日自主开发中持续改进自己的执行基础设施，代表“自举式软件智能体”的前沿。

9. **[Parsing the Stream: A Live Trace Model for Long-Horizon Agents and Their Observers](http://arxiv.org/abs/2609.01466v1)**  
   作者：E. Pakhomov, E. Nijkamp  
   一句话：提出面向长程 agent 的实时 trace 模型，解决“人类观察者”和“模型上下文”同时难以容纳长轨迹的问题。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

10. **[Adaptive Critical Token-Aware Retrieval for Repository-Level Code Generation](http://arxiv.org/abs/2609.01601v1)**  
    作者：K. Duan, D. Zheng, Y. Wang 等  
    一句话：通过“关键 token 感知”的自适应检索提升仓库级代码生成，针对长上下文约束下的上下文选择问题。

11. **[TRIAGE: Three-level Routing and Intelligent Agent Guidance for Efficient Execution](http://arxiv.org/abs/2609.01428v1)**  
    作者：R. Wei  
    一句话：用三级路由减少 ReAct agent 的重复推理开销，强调高频 agent 调用场景下的执行效率。

12. **[Diffusion as a Training Curriculum for Timestep-Free Iterative Reasoning](http://arxiv.org/abs/2609.01449v1)**  
    作者：M. Drozdova, A. Sirbu, P. Miotti 等  
    一句话：把 diffusion 过程改造成无 timestep 的迭代推理训练课程，探索“生成式迭代”与“推理迭代”的统一。

---

### 📊 应用（垂直领域、多模态、代码生成）

13. **[Facet-0: A Robotic Foundation Model for Contact-Rich Precise Manipulation](http://arxiv.org/abs/2609.01596v1)**  
    作者：H. Deng, H. Liu, W. Guo 等  
    一句话：面向高精度接触操作的机器人基础模型，强调亚毫米级装配中的触觉/接触后果预测。

14. **[H3-World: Turning Language Understanding into World Control](http://arxiv.org/abs/2609.01560v1)**  
    作者：D. Chen, Z. Wang, Z. Lin 等  
    一句话：把大规模视频生成器改造成交互式世界模型，说明语言正在成为视频/世界控制的自然接口。

15. **[Can LLMs Discover Scientific Laws in Real and Parallel Worlds?](http://arxiv.org/abs/2609.01552v1)**  
    作者：Y. Huang, Z. Liu, Z. Wu 等  
    一句话：检验 LLM 在真实与并行世界中发现科学定律的能力，直接触碰 AI for Science 的核心问题。

16. **[Closing Cost-Quality Gap in Document VLMs: Difficulty-Aware Data Curation and Quality-Adjusted Deployment Economics](http://arxiv.org/abs/2609.01575v1)**  
    作者：M. Evdokimov, M. Ivanov, D. Tsiupin 等  
    一句话：从数据筛选到部署经济学，系统讨论文档 VLM 如何在质量与成本之间取得可商用平衡。

---

## 3) 研究趋势信号
今天的论文明显呈现出“**评测机制化、训练信号语言化、智能体基础设施化**”三条主线：一方面研究者不再只看最终分数，而是追问模型如何做出判断；另一方面，自然语言反馈、学生模拟器、思维伙伴等工作把“语言”直接变成优化信号；同时，harness、trace、路由和轨迹评估等系统性方法正在把 agent 从 demo 推向长期运行的工程形态。  

---

## 4) 值得精读
1. **[Beyond Scores: Understanding LLM-as-a-Judge Mechanisms in Summarization Evaluation](http://arxiv.org/abs/2609.01604v1)**  
   理由：LLM 评审已广泛进入训练与评测链路，这篇工作关注其内部机制，具有很强的基础性和方法论价值。

2. **[The Rise of Verbal Reinforcement Learning](http://arxiv.org/abs/2609.01597v1)**  
   理由：它试图把“自然语言反馈”统一成训练范式，可能影响后续 agent、对齐和交互式学习设计。

3. **[Harness-of-Harness: Multi-Day Autonomous Software Development with Continual Improvement](http://arxiv.org/abs/2609.01481v1)**  
   理由：这是少见的“多日自主开发”系统论文，适合了解 agent 如何在真实开发流程中持续自我改进。  

如果你愿意，我也可以把这份日报进一步整理成：
- **“适合发公众号/内参”的精简版**
- **“按研究方向的榜单版”**
- **“面向投资/产品的解读版”**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*