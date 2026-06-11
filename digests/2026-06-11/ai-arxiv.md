# ArXiv AI 研究日报 2026-06-11

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-06-11 04:10 UTC

---

# ArXiv AI 研究日报（2026-06-11）

## 1) 今日速览

今天的论文整体呈现出三个明显方向：**更低成本的长上下文/多模态推理**、**更细粒度的智能体训练与规划**，以及**面向真实场景的评测与安全治理**。  
一批工作聚焦于把大模型推理中的“冗余 token、冗余上下文、冗余计算”压缩掉，但强调**可恢复、可组合、可解释**，而不是简单删减。  
智能体方向上，研究正在从“会用工具”走向“知道何时算、在哪算、如何分配人类干预”，体现出更强的执行控制意识。  
与此同时，医学、代码、机器人与多模态任务中的评测论文明显增多，说明社区正在从通用能力竞争转向**真实部署风险、稳健性与可验证收益**。

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

1. **[Redesign Mixture-of-Experts Routers with Manifold Power Iteration](http://arxiv.org/abs/2606.12397v1)**  
   作者：Wu 等  
   一句话：从几何/谱性质重构 MoE 路由器设计，尝试让专家选择更稳定、更有效，是 MoE 结构优化的基础性工作。

2. **[Anatomy of Post-Training: Using Interpretability to Characterize Data and Shape the Learning Signal](http://arxiv.org/abs/2606.12360v1)**  
   作者：Bergen 等  
   一句话：把可解释性引入 post-training 数据分析，帮助我们理解“哪些数据真的在塑造模型行为”，对对齐与数据治理都很关键。

3. **[Beyond Fully Random Masking: Attention-Guided Denoising and Optimization for Diffusion Language Models](http://arxiv.org/abs/2606.12273v1)**  
   作者：Deng 等  
   一句话：针对 diffusion LLM 的后训练，提出基于注意力的去噪与优化，提升并行解码模型对 token 依赖的建模能力。

4. **[The Impossibility of Eliciting Latent Knowledge](http://arxiv.org/abs/2606.12268v1)**  
   作者：Friedl 等  
   一句话：直指“从模型中可靠提取潜在知识”这一对齐核心问题，属于安全与可控性方向的理论级论文。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

5. **[DIRECT: When and Where Should You Allocate Test-Time Compute in Embodied Planners?](http://arxiv.org/abs/2606.12402v1)**  
   作者：Dao 等  
   一句话：研究具身规划中 test-time compute 应该投到哪里，关注“算力花得值不值”，对部署端尤其实用。

6. **[APPO: Agentic Procedural Policy Optimization](http://arxiv.org/abs/2606.12384v1)**  
   作者：Wang 等  
   一句话：将信用分配从粗粒度工作流推进到更细的过程级策略优化，直接面向多轮工具使用型智能体训练。

7. **[UniIntervene: Agentic Intervention for Efficient Real-World Reinforcement Learning](http://arxiv.org/abs/2606.12372v1)**  
   作者：Deng 等  
   一句话：通过“智能体式干预”减少人类纠错频率，让真实机器人强化学习更高效、更少人工成本。

8. **[Verifiable Environments Are LEGO Bricks: Recursive Composition for Reasoning Generalization](http://arxiv.org/abs/2606.12373v1)**  
   作者：Xiang 等  
   一句话：把可验证环境当作可组合“积木”来构建推理任务，强调环境递归组合对泛化能力的价值。

9. **[Learning What to Say to Your VLA: Mostly Harmless Vision Language Action Model Steering](http://arxiv.org/abs/2606.12299v1)**  
   作者：Jeong 等  
   一句话：研究如何用语言更稳健地 steer VLA 行为，重点是让“说什么”与“做什么”之间更可控、更可预测。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

10. **[Reroute, Don't Remove: Recoverable Visual Token Routing for Vision-Language Models](http://arxiv.org/abs/2606.12412v1)**  
    作者：Yang 等  
    一句话：不直接删视觉 token，而是做“可恢复路由”，兼顾 VLM 推理效率与信息保真，是当前多模态压缩的实用路线。

11. **[Context-Driven Incremental Compression for Multi-Turn Dialogue Generation](http://arxiv.org/abs/2606.12411v1)**  
    作者：Jung 等  
    一句话：面向多轮对话提出增量压缩机制，试图解决长对话中上下文越来越贵、但又不能粗暴截断的问题。

12. **[Doc-to-Atom: Learning to Compile and Compose Memory Atoms](http://arxiv.org/abs/2606.12400v1)**  
    作者：Diao 等  
    一句话：把长文档压缩成可组合的“记忆原子”，为长上下文推理提供更结构化的记忆表示。

13. **[Breaking Entropy Bounds: Accelerating RL Training via MTP with Rejection Sampling](http://arxiv.org/abs/2606.12370v1)**  
    作者：Li 等  
    一句话：直接瞄准 RL rollout 这一训练瓶颈，用 MTP + rejection sampling 提速，属于“训练系统层”的重要优化。

14. **[Claw-SWE-Bench: A Benchmark for Evaluating OpenClaw-style Agent Harnesses on Coding Tasks](http://arxiv.org/abs/2606.12344v1)**  
    作者：Zheng 等  
    一句话：为通用 agent harness 设计代码任务评测基准，补上了“框架型智能体如何真正测”的缺口。

---

### 📊 应用（垂直领域、多模态、代码生成）

15. **[TAHOE: Text-to-SQL with Automated Hint Optimization from Experience](http://arxiv.org/abs/2606.12387v1)**  
    作者：Chen 等  
    一句话：面向生产级 Text-to-SQL，把经验反馈转成自动 hint 优化，强调复杂数据库场景下的持续适配能力。

16. **[Atlas H&E-TME: Scalable AI-Based Tissue Profiling at Expert Pathologist-Level Accuracy](http://arxiv.org/abs/2606.12346v1)**  
    作者：Standvoss 等  
    一句话：把 AI 病理分析推向专家级精度，体现医疗多模态在“可扩展、可量化、可落地”上的进展。

17. **[Measuring Epistemic Resilience of LLMs Under Misleading Medical Context](http://arxiv.org/abs/2606.12291v1)**  
    作者：Zhou 等  
    一句话：重点评估 LLM 在误导性医疗上下文下是否仍能保持稳健判断，是医疗安全评测的重要补位。

18. **[Beyond Third-Person Audits: Situated Interaction Auditing for User-Centered LLM Bias Research](http://arxiv.org/abs/2606.12247v1)**  
    作者：Abeliuk 等  
    一句话：从“第三方审计”走向“情境交互审计”，更接近真实用户场景下的偏见与伤害评估。

---

## 3) 研究趋势信号

今天投稿最强的信号是：**“效率”已经从单纯降 FLOPs，转向可恢复压缩、选择性算力分配和训练-推理协同优化**。另一条主线是**智能体从会行动走向可治理**：credit assignment、人类干预频率、runtime governance、可验证环境等问题正在被系统化处理。最后，评测正明显向真实世界收缩——医疗、代码、病理、对话偏见与安全审计都在强调**鲁棒性、可解释性和部署语境**，而不是只看离线 benchmark 分数。

---

## 4) 值得精读

1. **[Anatomy of Post-Training: Using Interpretability to Characterize Data and Shape the Learning Signal](http://arxiv.org/abs/2606.12360v1)**  
   理由：它直接切中 post-training 的核心黑箱，适合想理解“数据如何塑造模型行为”的读者。

2. **[The Impossibility of Eliciting Latent Knowledge](http://arxiv.org/abs/2606.12268v1)**  
   理由：这是对齐与 AI 安全中的关键理论问题，可能对后续“模型是否真的可被诚实提问”产生影响。

3. **[APPO: Agentic Procedural Policy Optimization](http://arxiv.org/abs/2606.12384v1)**  
   理由：如果你关注智能体训练，这篇很值得看，因为它触及多轮工具使用的信用分配核心难题。

---

如果你愿意，我还可以把这份日报进一步整理成：
- **面向投资/产业的版本**
- **面向研究选题的版本**
- **按“最可能成为高引用论文”排序的版本**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*