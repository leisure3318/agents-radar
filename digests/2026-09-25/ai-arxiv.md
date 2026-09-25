# ArXiv AI 研究日报 2026-09-25

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-25 03:57 UTC

---

# ArXiv AI 研究日报｜2026-09-25

## 1. 今日速览

今日论文呈现出三个明显热点：**LLM/多模态模型的可靠性与评估**、**智能体规划与仿真验证**、以及**面向真实部署的安全、隐私和效率优化**。多篇工作不再只追求 benchmark 分数，而是关注模型在上下文扰动、量化、提示集波动、用户隐私泄露等真实条件下的行为稳定性。智能体方向则从“能否完成任务”进一步转向“能否探索未知世界、生成可执行计划、在生产环境上线前被可靠模拟筛查”。此外，RAG、语音事实核查、GPU kernel 优化、金融合规等应用型论文显示 AI 系统正在更深入进入高风险和高价值场景。

---

## 2. 重点论文

### 🧠 大语言模型：架构、训练、对齐、评估

#### 1. **Minimally Invasive Steering of Language Models**  
链接: http://arxiv.org/abs/2609.30218v1  
作者: T. Entesari, J. Zhang, D. Khashabi et al.  
一句话说明：提出 MISVO，在测试时通过最小扰动 steering vector 优化语言模型行为，在提升奖励目标的同时尽量保持原始输出分布与生成质量，适合关注可控生成与轻量对齐的研究者。

#### 2. **PoEM: Predicting RL Outcomes from Existing Policies**  
链接: http://arxiv.org/abs/2609.30226v1  
作者: K. Hamidieh, G. Daras, A. Torralba  
一句话说明：尝试从已有策略预测 RL 后训练结果，旨在降低大模型 RLHF/RLAIF 等后训练的试错成本，是“低成本对齐实验预测”的重要方向。

#### 3. **Self-Play Pretraining with Zero Data**  
链接: http://arxiv.org/abs/2609.30063v1  
作者: A. Cowsik, K. Dolev, M. Y. Li et al.  
一句话说明：探索无需外部数据、通过自博弈生成训练信号的预训练范式，挑战当前依赖大规模人类语料的数据驱动路线。

#### 4. **How Reproducible Are Evaluation Conclusions? A Self-Audit of LLM-Inferred Prompt Structure**  
链接: http://arxiv.org/abs/2609.30074v1  
作者: D. Sarkar  
一句话说明：系统审计 LLM 评测结论在小提示集、模型差异和缓存条件下的可复现性，提醒社区谨慎解读排行榜式评估。

#### 5. **JevOut: Natural Context Can Flip Decision Models**  
链接: http://arxiv.org/abs/2609.30243v1  
作者: Z. Xu  
一句话说明：指出自然上下文可能显著翻转专用决策模型输出，对将 LLM/决策模型用于工具路由、自动审批和动作触发的系统具有直接风险提示。

---

### 🤖 智能体与推理：规划、工具使用、多智能体、思维链

#### 6. **ExplorationBench: Measuring AI Systems' Exploration in Verifiable Alien Worlds**  
链接: http://arxiv.org/abs/2609.30199v1  
作者: M. Zhang, Z. Xiang, P. Gao et al.  
一句话说明：提出用于评估 AI 探索能力的可验证“异星世界”基准，关注假设生成、实验设计和迭代发现，契合科学发现型智能体研究。

#### 7. **GRASP: Generating, Revising, and Assessing for Strategic Planning with Agentic AI**  
链接: http://arxiv.org/abs/2609.30147v1  
作者: A. Srivastava, M. A., K. et al.  
一句话说明：构建生成、修订、评估一体化的多阶段智能体规划框架，面向复杂任务中的自然语言可执行计划生成。

#### 8. **Screen Before You Serve: Simulation for Production Customer Experience AI Agents at 140M Scale**  
链接: http://arxiv.org/abs/2609.30137v1  
作者: E. Alcoba, K. Rossell, A. Gupta et al.  
一句话说明：介绍面向 1.4 亿规模生产客户体验智能体的上线前仿真筛查框架，代表智能体工程化、合规化部署的重要实践。

#### 9. **Multimodal Thinking with Renderable Programs**  
链接: http://arxiv.org/abs/2609.30130v1  
作者: S. Chen, D. Zhong, Z. Ma et al.  
一句话说明：将可渲染程序引入多模态推理链，使模型不仅理解图像，还能在推理过程中显式生成和操作视觉中间表示。

---

### 🔧 方法与框架：新技术、基准测试、效率优化

#### 10. **KernelOPT: Dispatch-Aware Agentic Search for GPU Kernel Optimization**  
链接: http://arxiv.org/abs/2609.30059v1  
作者: A. Poddar, S. Prasad, A. Samanta et al.  
一句话说明：提出面向 GPU kernel 优化的调度感知智能体搜索方法，连接 LLM 智能体与深度学习系统性能优化。

#### 11. **Canopy: Exploiting Piecewise Smooth Tree Priors for Multi-Fidelity Bandits**  
链接: http://arxiv.org/abs/2609.30017v1  
作者: M. Jerge, S. Jana  
一句话说明：将 LLM 推理中的模型路由、prefix-cache、prompt trimming、测试时搜索等问题建模为树结构优化，为推理时资源分配提供统一视角。

#### 12. **Let Training Guide Selection: Online Synthetic Data Filtering via Real-Anchored Utility**  
链接: http://arxiv.org/abs/2609.29988v1  
作者: Y. Wu, S. Lakdawala, R. T. Miller et al.  
一句话说明：提出 FROST，基于真实数据锚定效用在线筛选合成数据，让数据选择随训练过程动态调整，而非仅依赖静态质量或多样性指标。

#### 13. **Temporal Gradient Inversion for Private Trajectory Reconstruction in Embodied Reinforcement Learning**  
链接: http://arxiv.org/abs/2609.30258v1  
作者: S. Bhujel, S. Shi, R. Huang et al.  
一句话说明：揭示具身强化学习中仅上传梯度仍可能泄露时序轨迹，提示分布式具身智能系统存在新的隐私攻击面。

---

### 📊 应用：垂直领域、多模态、代码生成

#### 14. **To Trust or Not to Trust: Retrieval-Augmented Fact Checking in Speech**  
链接: http://arxiv.org/abs/2609.30227v1  
作者: D. Mazumder, Mamta, A. S. Penamakuri  
一句话说明：提出 VeriSpeak，面向语音内容的检索增强事实核查基准，覆盖新闻、播客、演讲等日益重要的音频 misinformation 场景。

#### 15. **GHOST-Q: Towards Studying Grounding Hallucinations Overlooked Under Same-score TradeOffs in Quantized VLMS**  
链接: http://arxiv.org/abs/2609.29999v1  
作者: S. Rehman, M. Shafique  
一句话说明：研究量化 VLM 在总体分数不变时可能隐藏的视觉 grounding 幻觉，为低精度多模态模型部署提供更细粒度安全评估。

#### 16. **Automated Regulatory Compliance Question Answering in Financial Services with Domain-Adapted Retrieval-Augmented Generation**  
链接: http://arxiv.org/abs/2609.30009v1  
作者: T. Deußer, A. Pillai, A. F. Bariviera et al.  
一句话说明：面向金融合规问答构建领域适配 RAG 系统，强调权威文本 grounding 和可验证答案，代表高风险行业中的实用 LLM 落地。

---

## 3. 研究趋势信号

今日投稿显示，AI 研究正在从“模型能力提升”转向“系统行为可信化”。一方面，LLM 评估开始关注可复现性、上下文敏感性、自我解释是否真正影响决策、量化后隐藏的 grounding 退化等细粒度问题；另一方面，智能体研究明显走向生产环境，包括复杂规划、客户服务仿真、GPU kernel 优化和科学探索。值得注意的是，隐私与安全问题从传统文本场景扩展到具身 RL、持久会话、语音事实核查和多模态量化模型。整体趋势是：下一阶段竞争点不只是更强模型，而是**在真实复杂条件下可验证、可控、可部署的 AI 系统**。

---

## 4. 值得精读

### 1. **ExplorationBench: Measuring AI Systems' Exploration in Verifiable Alien Worlds**  
链接: http://arxiv.org/abs/2609.30199v1  
推荐理由：科学发现型智能体是当前前沿方向，但评估“探索能力”一直困难。该工作试图构造既未知又可验证的环境，对未来 agent benchmark 设计有启发性。

### 2. **Minimally Invasive Steering of Language Models**  
链接: http://arxiv.org/abs/2609.30218v1  
推荐理由：测试时 steering 是低成本模型控制的重要路线；该论文强调“提升目标行为”与“保持原模型分布”之间的平衡，具有较强方法论价值。

### 3. **Screen Before You Serve: Simulation for Production Customer Experience AI Agents at 140M Scale**  
链接: http://arxiv.org/abs/2609.30137v1  
推荐理由：相比实验室 agent benchmark，该论文更贴近真实生产部署，尤其适合关注企业级 LLM agent、上线前评估、合规风险控制的读者。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*