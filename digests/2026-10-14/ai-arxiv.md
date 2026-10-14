# ArXiv AI 研究日报 2026-10-14

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-10-14 13:15 UTC

---

# ArXiv AI 研究日报  
**日期：2026-10-14**  
**范围：cs.AI / cs.CL / cs.LG 相关论文精选**

---

## 1. 今日速览

今日论文的主线非常清晰：**Agentic AI、机器人自我改进、RLVR 与长程任务环境**成为最活跃方向。多篇工作围绕“智能体如何在真实或模拟环境中持续改进”展开，包括机器人技能积累、Agent harness 自演化、长程任务奖励设计等。大语言模型方面，研究重点从单纯提升能力转向**推理效率、奖励归因、评估可靠性与可解释监督**。此外，VLA、代码评测、多模态视频理解、低资源机器翻译等应用方向也出现了更细粒度、更可验证的 benchmark 与训练策略。

---

## 2. 重点论文

### 🧠 大语言模型：架构、训练、对齐、评估

#### 1. **DoubtLess: Training-Free Contrastive Decoding for Efficient Reasoning**  
链接：http://arxiv.org/abs/2610.18862v1  
作者：M. Luo, L. Chen  
一句话说明：提出无需训练的对比解码方法，用于减少推理模型中过长的 CoT token 消耗，是“高效推理”方向的实用型工作。

#### 2. **Depth Memory**  
链接：http://arxiv.org/abs/2610.18809v1  
作者：D. González-Martínez, P. Nazari, T. K. Rusch et al.  
一句话说明：研究比残差连接更强的深度信息聚合机制，为改进 Transformer / 深层网络的信息传播提供结构性思路。

#### 3. **Unlocking Token Rewards via Training-Free Reward Attribution**  
链接：http://arxiv.org/abs/2610.18704v1  
作者：S. Wu, H. Tan, B. Xia et al.  
一句话说明：提出从现有 reward model 中无训练提取 token-level reward 的方法，对细粒度 RLHF / RLAIF 和过程监督很有价值。

#### 4. **On the Monitorability of Natural Language Autoencoders: Identification vs Discrimination**  
链接：http://arxiv.org/abs/2610.18727v1  
作者：K. Y. Denamganaï  
一句话说明：讨论自然语言自编码器作为模型监督工具时的可监控性边界，关注“解释是否真的可被人类验证”。

#### 5. **Where Do LLM Ensemble Gains Come From? Decomposing Candidate Value, Diversity, and Aggregation**  
链接：http://arxiv.org/abs/2610.18786v1  
作者：D. Kim  
一句话说明：系统拆解 LLM ensemble 收益来源，区分候选质量、多样性与聚合器贡献，有助于理解 test-time scaling 的真实机制。

---

### 🤖 智能体与推理：规划、工具使用、多智能体、思维链

#### 6. **Hybrid Reasoning Agents**  
链接：http://arxiv.org/abs/2610.18861v1  
作者：J. Zou, Y. Qi, S. Chen et al.  
一句话说明：尝试结合潜在空间推理与文本工具调用，目标是在效率、可解释性和外部交互能力之间取得平衡。

#### 7. **Tev: Scaling Long-Horizon Agentic Environments with Dense Progress Rewards**  
链接：http://arxiv.org/abs/2610.18868v1  
作者：W. Hu, S. Pramanick, K. K. Singh et al.  
一句话说明：面向长程智能体任务构建带密集进度奖励的环境，直接回应当前开源模型在长时自主任务上的训练瓶颈。

#### 8. **Self-Evolving Agent Harness**  
链接：http://arxiv.org/abs/2610.18813v1  
作者：C. Wei, H. Guan, M. Zhu et al.  
一句话说明：形式化“智能体脚手架自演化”，让 prompts、memory、workflow 和可执行组件在多轮反馈中持续改进。

#### 9. **Pack Light, CarryOn: Building Object-Oriented Context for Long-Horizon Agents**  
链接：http://arxiv.org/abs/2610.18784v1  
作者：Y. Lu, J. McAuley, L. Zhang  
一句话说明：提出面向长程智能体的对象化上下文管理，减少重复处理历史轨迹，突出“进展状态”而非完整交互日志。

#### 10. **BLADE: Auditing Information Use for Failure Attribution in LLM Multi-Agent Systems**  
链接：http://arxiv.org/abs/2610.18780v1  
作者：X. Guo, Y. Long, C. Zhang  
一句话说明：面向多智能体系统的失败归因与信息使用审计，有助于定位协作链条中错误如何传播和放大。

---

### 🔧 方法与框架：新技术、基准测试、效率优化

#### 11. **Two Clocks: Why Larger Rollout Batches Learn Slower but Fail on Schedule in Reinforcement Learning with Verifiable Rewards**  
链接：http://arxiv.org/abs/2610.18853v1  
作者：Y. Li, J. Quan, K. Qiu et al.  
一句话说明：分析 RLVR 中大 rollout batch、学习率缩放和训练失效之间的关系，对大规模可验证奖励训练很关键。

#### 12. **Enabling Token-wise Importance Sampling in Off-Policy RLVR with Proximal KL Regularization**  
链接：http://arxiv.org/abs/2610.18738v1  
作者：H. Bai, J. Yao, T. Zhang  
一句话说明：研究 off-policy RLVR 中 token-wise importance sampling 的理论条件，为复用异步生成数据提供更稳健的优化基础。

#### 13. **SP²ec: Adaptive Self-Speculative Decoding for Vision-Language Models**  
链接：http://arxiv.org/abs/2610.18735v1  
作者：Y. Huang, X. Li, Y. Hou et al.  
一句话说明：提出面向 VLM 的自适应自投机解码方法，针对多模态输入下小 drafter 不稳定的问题提升推理吞吐。

#### 14. **What Matters in Quality-Aware VLA Pretraining: A Benchmark and Empirical Study**  
链接：http://arxiv.org/abs/2610.18869v1  
作者：M. Yan, L. Gong, D. Huang et al.  
一句话说明：系统比较 VLA 预训练中 demonstration quality 的 weighting、filtering、conditioning 等策略，是机器人 foundation policy 数据质量研究的重要 benchmark。

---

### 📊 应用：垂直领域、多模态、代码生成

#### 15. **SEAR: Self-Evolving Agentic Robotics**  
链接：http://arxiv.org/abs/2610.18792v1  
作者：X. Wang, B. Li, H. Wang et al.  
一句话说明：提出自演化机器人框架与 benchmark，让语言模型智能体通过写控制代码、测试、保留技能和记忆来持续提升机器人能力。

#### 16. **ChunkAct: Action Chunking for Agentic Robotics**  
链接：http://arxiv.org/abs/2610.18874v1  
作者：B. Xu, W. Bao, X. Liu et al.  
一句话说明：通过动作分块提升 agentic robotics 的执行效率，缓解 LLM 参与机器人控制闭环带来的高成本问题。

#### 17. **Beyond the Verdict: Agentic Code Judging with Verifiable Feedback**  
链接：http://arxiv.org/abs/2610.18760v1  
作者：Z. Deng, S. Li, C. Yu et al.  
一句话说明：面向代码任务提出不仅给出判定、还提供可验证反馈的 agentic judge，对代码生成的选择、修复和 test-time scaling 很有意义。

#### 18. **OmniCompass: A Holistic Benchmark for Omni-Modal Video Grounding and Understanding**  
链接：http://arxiv.org/abs/2610.18829v1  
作者：X. Liu, S. Wang, X. Wei et al.  
一句话说明：构建全模态视频 grounding 与理解 benchmark，用于更系统诊断 MLLM 的视频理解能力。

---

## 3. 研究趋势信号

今日最强信号是：AI 研究正在从“模型一次性回答”转向“系统持续改进”。无论是 SEAR、Physical RSI、Self-Evolving Agent Harness，还是 Tev 和 CarryOn，都在探索智能体如何跨任务积累记忆、技能、脚手架与上下文状态。与此同时，RLVR 相关论文集中出现，说明“可验证奖励 + 大规模采样 + 细粒度归因”正成为后训练的重要范式。机器人与 VLA 方向也明显升温，研究重点从单任务成功率转向真实部署中的效率、硬件鲁棒性和自我改进能力。

---

## 4. 值得精读

### 1. **SEAR: Self-Evolving Agentic Robotics**  
链接：http://arxiv.org/abs/2610.18792v1  
推荐理由：这是今日最具代表性的“Agentic Robotics + Recursive Self-Improvement”论文之一。它不仅关注机器人完成任务，还关注机器人是否能通过经验形成可复用技能和记忆，适合关注具身智能、自主学习和智能体长期进化的读者。

### 2. **Tev: Scaling Long-Horizon Agentic Environments with Dense Progress Rewards**  
链接：http://arxiv.org/abs/2610.18868v1  
推荐理由：长程任务是当前 LLM agents 的核心瓶颈之一。该论文从环境和奖励设计入手，为训练能持续数小时甚至数天工作的智能体提供基础设施思路，值得智能体训练与评测方向重点关注。

### 3. **Unlocking Token Rewards via Training-Free Reward Attribution**  
链接：http://arxiv.org/abs/2610.18704v1  
推荐理由：token-level reward 是提升过程监督、长链推理训练和 RLHF 稳定性的关键问题。该文提出 training-free 奖励归因方法，若效果可靠，可能成为现有 reward model 的低成本增强工具。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*