# ArXiv AI 研究日报 2026-09-22

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-22 03:50 UTC

---

# ArXiv AI 研究日报｜2026-09-22

## 1. 今日速览

今日论文的主线集中在 **LLM/智能体的训练、评估与安全部署**：多轮工具使用、计算机操作智能体、agent harness 自动改进、稀有风险事件估计等方向都出现了较有现实意义的工作。  
另一个显著趋势是 **后训练与参数高效适配**，包括 on-policy 对齐数据标注、LoRA 超网络个性化、LLM 连续学习、模型合并与任务向量压缩。  
在基础方法层面，时间序列 foundation model、线性注意力/RNN 表达力、OOD 泛化判据、离线 RL 等论文体现出对“可泛化、可部署、可验证”模型的持续关注。  
应用方面，医疗推理、气候/海冰预测、电网保护、蛋白质功能注释、语音增强与合成语音检测等垂直场景活跃，显示 AI 正在向高风险和高价值行业进一步渗透。

---

## 2. 重点论文

### 🧠 大语言模型：架构、训练、对齐、评估

#### 1. [onPanda: Efficient Annotation of On-Policy Alignment Data for LLMs and Agents via Token-Level Correction](http://arxiv.org/abs/2609.24983v1)  
**作者**：L. Yang, M. Liu, J. Wang et al.  
提出面向 LLM 与智能体轨迹的 token 级纠错标注工具，用“定位首个错误 token 并修正”的方式降低 on-policy 对齐数据构建成本，适合用于 RLHF/RLAIF 后训练数据生产。

#### 2. [LoRA-generating hypernetworks for efficient on-device LLM generative personalization](http://arxiv.org/abs/2609.24979v1)  
**作者**：S. Augenstein, L. Ding, J. Lee et al.  
使用超网络生成个性化 LoRA，以支持移动端 LLM 的低成本用户适配，值得关注其在端侧个性化、隐私保护和小模型质量提升上的潜力。

#### 3. [Complex KDA: Understanding and Enhancing the Expressivity of Kimi Delta Attention](http://arxiv.org/abs/2609.24797v1)  
**作者**：J. Siems, R. Grazzi, K. Pöppel et al.  
分析并增强 Kimi Delta Attention 的表达能力，针对线性 RNN/Delta-rule 类高效序列模型的低秩表达瓶颈提出改进，是长上下文高效架构方向的重要补充。

#### 4. [iSDFT: Information-Proximal Self-Distillation for Continual Learning in LLMs](http://arxiv.org/abs/2609.24646v1)  
**作者**：A. K. Khamis, X. Ji, H. Jaber et al.  
提出信息近端自蒸馏方法，在学习新技能时调节教师信号强度，以缓解 LLM 连续学习中的灾难性遗忘问题。

#### 5. [Fathom-Vaidya: Advancing Medical Reasoning with Rubric-Based Rewards](http://arxiv.org/abs/2609.24480v1)  
**作者**：K. Shah, K. Singh, S. J et al.  
面向医疗诊断与临床推理，引入 rubric-based rewards 训练/评估 LLM，体现了医疗 LLM 从答案正确性走向过程化、标准化推理质量评估的趋势。

---

### 🤖 智能体与推理：规划、工具使用、多智能体、思维链

#### 6. [Critical-State RL: Diagnosing Trainable States for Multi-Turn Tool Use](http://arxiv.org/abs/2609.24985v1)  
**作者**：Z. Chen, W. Zhao, Z. Cen et al.  
针对多轮工具使用失败，提出识别“值得训练的关键状态”的 RL 诊断方法，有助于解决智能体长链路任务中难以定位失败调用的问题。

#### 7. [RRSI: Regularized Recursive Self-Improvement of Agent Harnesses](http://arxiv.org/abs/2609.24972v1)  
**作者**：P. Xia, R. Han, Z. Wang et al.  
研究如何自动迭代优化智能体 harness，包括提示词、工具、控制流、记忆和上下文管理，并通过正则化降低递归自改进中的过拟合或退化风险。

#### 8. [OSWorld-Pro: Process-based Evaluation for Computer Use Agents](http://arxiv.org/abs/2609.24890v1)  
**作者**：Z. Wang, S. Zhang, Y. Zhang et al.  
将计算机使用智能体评估从最终结果扩展到过程级诊断，能更细粒度分析 agent 在长任务中的失败原因，是 CUA 评测的重要进展。

#### 9. [Rare Event Estimation via Iterative Unalignment](http://arxiv.org/abs/2609.24969v1)  
**作者**：H. Yang, D. Mittal, J. Dong et al.  
面向自主智能体的极低概率灾难事件，提出通过迭代“unalignment”估计稀有风险概率，为 agent 安全评估提供了比简单红队更量化的思路。

#### 10. [When Tomorrow Becomes Today: Self-Evolving Policies for Agentic Time-Series Forecasting](http://arxiv.org/abs/2609.24862v1)  
**作者**：Y. Hu, X. Dai, Z. Qu et al.  
提出可自演化策略的时间序列预测智能体，在模型、推理策略和干预规则随时间变化的场景下动态适配，适合金融、能源、供应链等非平稳系统。

---

### 🔧 方法与框架：新技术、基准测试、效率优化

#### 11. [$t_0$: A Time-Series Foundation Model for Forecasting with Context](http://arxiv.org/abs/2609.24559v1)  
**作者**：L. Meyer, C. Sole, H. Xiang et al.  
发布开放权重时间序列 foundation model，支持目标历史、历史协变量和已知未来协变量条件化预测，是通用预测模型生态中的重要开源补充。

#### 12. [Exactness at Inference: A Representational Criterion for Out-of-Distribution Generalization](http://arxiv.org/abs/2609.24942v1)  
**作者**：F. M. Rocha, I. Dutra, V. S. Costa et al.  
从表示是否结构等价于生成机制的角度刻画 OOD 泛化，强调“推理时精确性”而非训练分布拟合，对泛化理论和可解释表示学习有启发。

#### 13. [Lifted Bellman Linear Programming for Offline Reinforcement Learning](http://arxiv.org/abs/2609.24489v1)  
**作者**：H. Yang, J. Park, N. Jeong et al.  
提出用于离线 RL 的 lifted Bellman 线性规划框架，试图替代依赖 bootstrapped critic 与目标网络的传统训练范式，值得关注其稳定性与理论性质。

#### 14. [VPRune: Efficient Training-free Pre-LLM Visual Token Pruning](http://arxiv.org/abs/2609.24485v1)  
**作者**：G. Lv, D. Shi, D. Fu  
提出无需训练的 LVLM 视觉 token 剪枝方法，针对文本引导选择偏差、信息损失和空间结构破坏等问题优化推理成本，是多模态大模型效率方向的实用工作。

---

### 📊 应用：垂直领域、多模态、科学与医疗

#### 15. [Learning Prognostic Variables for AI Convective Parameterizations via Symbolic Distillation](http://arxiv.org/abs/2609.24882v1)  
**作者**：J. Schönfeld, T. Beucler, J. Savre et al.  
将符号蒸馏用于气候模型中的对流参数化，学习可解释的预报变量，有助于连接神经参数化与物理可解释建模。

#### 16. [Corrective Forcing: Unified Post-Training for Diffusions and Flows in Generative Speech Enhancement](http://arxiv.org/abs/2609.24651v1)  
**作者**：Q. Yao, L. Gao, Q. Mao  
针对扩散/flow 语音增强中的训练—推理状态不匹配问题，提出统一后训练策略，对生成式语音增强的稳定推理具有实际价值。

---

## 3. 研究趋势信号

今日投稿显示，AI 研究正从“模型能力提升”转向“长链路系统可靠性”。智能体方向不再只看最终成功率，而是关注过程诊断、关键状态训练、harness 自动优化和稀有事故概率估计。LLM 后训练也更强调数据效率、连续学习、端侧个性化与领域奖励设计。同时，时间序列、气候、医疗、电网等高风险应用推动模型向可解释、可校准、可部署方向演进。

---

## 4. 值得精读

### 1. [Critical-State RL: Diagnosing Trainable States for Multi-Turn Tool Use](http://arxiv.org/abs/2609.24985v1)  
多轮工具使用是当前智能体落地的核心瓶颈之一。该文不只是提升 reward，而是试图回答“到底哪个调用值得训练”，对 agent 训练数据选择、错误归因和高效 RL 微调都很关键。

### 2. [OSWorld-Pro: Process-based Evaluation for Computer Use Agents](http://arxiv.org/abs/2609.24890v1)  
计算机使用智能体往往需要数百步操作，仅看最终产物难以判断能力边界。该文的过程化评估框架有望成为分析 GUI agent、browser agent、desktop agent 失败模式的重要工具。

### 3. [$t_0$: A Time-Series Foundation Model for Forecasting with Context](http://arxiv.org/abs/2609.24559v1)  
时间序列 foundation model 正在快速走向通用化和开源化。$t_0$ 同时建模目标历史、过去协变量和未来已知变量，若实证表现稳健，可能成为预测任务中的重要基础模型。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*