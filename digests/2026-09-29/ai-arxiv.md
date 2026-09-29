# ArXiv AI 研究日报 2026-09-29

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-29 04:47 UTC

---

# ArXiv AI 研究日报｜2026-09-29

## 1. 今日速览

今日论文集中体现了三个热点：**可伸缩语言模型架构、智能体长期执行效率、以及可验证/可评估的推理与生成系统**。LLM 方向出现了多篇围绕 **looped Transformer、MoE、线性注意力、随机注意力、可变容量模型** 的工作，目标是在同一模型内适配不同算力预算。智能体研究明显转向工程化瓶颈：上下文压缩、token 成本预测、工具失败透明报告、移动端 GUI 到命令接口转换等。生成模型方面，视频扩散蒸馏、一步视觉生成、可验证视觉奖励和多模态自反思显示出“高效生成 + 可控反馈”的趋势。

---

## 2. 重点论文

### 🧠 大语言模型：架构、训练、对齐、评估

#### 1. **Telescopic Language Models**  
链接: http://arxiv.org/abs/2609.35769v1  
作者: Z. Guo, B. Zhang, H. Aktas et al.  
一句话说明: 提出 Telescopic Language Model，将不同容量嵌套在同一个 Transformer 中，使单一模型可连续适配多种推理算力预算，值得关注其对部署成本的影响。

#### 2. **How to Loop MoE: Flatten the Experts, Untie the Attention**  
链接: http://arxiv.org/abs/2609.35751v1  
作者: S. Wang, C. Ma, M. Hariri et al.  
一句话说明: 探索 looped Transformer 与 sparse MoE 的结合方式，通过重复使用层和专家提高参数利用率，是高效大模型架构的重要方向。

#### 3. **Improving Test-Time Scaling with Adaptive Looped Transformers**  
链接: http://arxiv.org/abs/2609.35748v1  
作者: Y. You, T. Fu, A. Feng et al.  
一句话说明: 研究 looped Transformer 在测试时扩展计算量是否带来收益，直接对应“推理时多算一点是否更聪明”的核心问题。

#### 4. **MS-GLA: Multi-Scale Gated Linear Attention for Addressing Representational Bottlenecks via Multi-Temporal Resolution**  
链接: http://arxiv.org/abs/2609.35664v1  
作者: P. Dev, A. Sankar, V. Varma  
一句话说明: 为 gated linear attention 引入多时间尺度记忆，缓解线性注意力在长上下文中的表达瓶颈。

#### 5. **SANTA++: Sampling Attention through Representative Keys**  
链接: http://arxiv.org/abs/2609.35629v1  
作者: K. Lee, C. Z. Pratt, R. Fang et al.  
一句话说明: 提出无需训练的随机注意力近似方法，用代表性 key 选择重要 token，面向长上下文推理的显存与速度优化。

#### 6. **MeqMuon: Matrix-Equilibrating Muon for LLM Pretraining**  
链接: http://arxiv.org/abs/2609.35701v1  
作者: C.-W. Shi, X. Wang, W.-J. Li  
一句话说明: 改进 Muon 优化器中的矩阵更新均衡机制，目标是提升 LLM 预训练稳定性和效率。

---

### 🤖 智能体与推理：规划、工具使用、多智能体、思维链

#### 7. **TokenCast: Forecasting Token Consumption During LLM Agent Execution**  
链接: http://arxiv.org/abs/2609.35760v1  
作者: C. Ouyang, L. Yue, L. Zheng et al.  
一句话说明: 预测 LLM 智能体执行任务时的 token 消耗，有助于解决 agent 成本不可控和长任务预算规划问题。

#### 8. **KV-streams for Efficient Compaction in Agentic Reinforcement Learning**  
链接: http://arxiv.org/abs/2609.35750v1  
作者: E. Penaloza, D. Malenfant, D. Vattikonda et al.  
一句话说明: 面向 agentic RL 的长轨迹上下文压缩，尝试用 KV-streams 降低 GPU 内存瓶颈，是长程智能体训练的关键基础设施。

#### 9. **Shockingly Simple Self-retrospection Improves Agentic Models Without RL**  
链接: http://arxiv.org/abs/2609.35741v1  
作者: J. Light, C. Z. Cui, J. Kim et al.  
一句话说明: 证明智能体可通过训练自身经历的解释与复盘来提升后续表现，无需强化学习，提示“自我反思数据”可能是低成本 agent 改进路径。

#### 10. **Failure-Transparent Agents: Benchmarking Post-Failure Reporting in Tool-Using Language Models**  
链接: http://arxiv.org/abs/2609.35732v1  
作者: J. Zhu, S. Xie, A. L. F. Chen et al.  
一句话说明: 构建工具失败后报告透明度基准，关注 agent 是否会在工具失败时仍错误宣称成功，对可靠部署很重要。

#### 11. **Reasoning with Continuous Latent Diffusion**  
链接: http://arxiv.org/abs/2609.35694v1  
作者: X. Cheng  
一句话说明: 提出 Latent Flow Reasoning Models，在连续潜空间中用扩散式迭代生成推理过程，拓展了 token 级思维链之外的推理范式。

#### 12. **Verifier Errors in RLVR: Reward Hacking, Limits of Feedback, and Selective Control**  
链接: http://arxiv.org/abs/2609.35677v1  
作者: C. Moya, E. Thornley, G. Lin  
一句话说明: 分析 RLVR 中验证器错误如何导致 reward hacking，为可验证奖励训练的安全边界提供理论视角。

---

### 🔧 方法与框架：新技术、基准测试、效率优化

#### 13. **ScAn-Bench: Evaluating Scaling Analysis Methodology**  
链接: http://arxiv.org/abs/2609.35707v1  
作者: A. Sermaxhaj, N. Alipour, D. Sinani et al.  
一句话说明: 提出用于评估 scaling analysis 方法的基准，回应大模型 scaling law 研究中方法学可复现和可靠性不足的问题。

#### 14. **Rethinking Circuit Evaluation: Do Circuits Explain Model Errors?**  
链接: http://arxiv.org/abs/2609.35686v1  
作者: L. Zhang, C. Geng, M. Zhang et al.  
一句话说明: 重新审视机制可解释性中的 circuit 评估方法，指出通过消融验证的电路未必真正解释模型错误。

#### 15. **Distillation Defenses Easily Break After Reinforcement Learning**  
链接: http://arxiv.org/abs/2609.35699v1  
作者: S. Javaheri, A. Panfilov, O. Britton et al.  
一句话说明: 发现经过强化学习后，原本用于防止模型蒸馏攻击的防御可能被轻易破坏，对闭源模型能力保护具有现实意义。

---

### 📊 应用：垂直领域、多模态、代码生成

#### 16. **PDMD: Projected Distribution Matching Distillation for Video Diffusion Models**  
链接: http://arxiv.org/abs/2609.35768v1  
作者: Z. Wang, J. Yuan, A. Wang et al.  
一句话说明: 改进视频扩散模型的分布匹配蒸馏，目标是在少步采样下保持视频质量，是高效视频生成的重要进展。

#### 17. **Learning Native Reflection in Unified Models with Interleaved Reinforcement Learning**  
链接: http://arxiv.org/abs/2609.35767v1  
作者: Y. Fan, Z. Huang, Z. Cai et al.  
一句话说明: 让统一多模态模型在生成图像后自我诊断与修正，通过交错强化学习学习“原生反思”能力。

#### 18. **PhoneCLI: From App Interfaces to Callable Commands for Mobile Agents**  
链接: http://arxiv.org/abs/2609.35671v1  
作者: Y. Jiang, L. Xu, C. Huang  
一句话说明: 将移动 App GUI 操作转化为可调用命令，减少移动智能体对截图—VLM—点击循环的依赖，提升速度与稳定性。

#### 19. **GPUPhysBench: Benchmarking Coding Agents for Correct and Efficient GPU Physics Simulation**  
链接: http://arxiv.org/abs/2609.35639v1  
作者: Y. Sun, J. He, S. Wang et al.  
一句话说明: 构建 GPU 物理仿真代码生成基准，评估 coding agents 是否能同时满足数值正确性和高性能实现。

#### 20. **Verifiable Visual Rewards Transfer from Synthetic Scenes to Natural Prompts**  
链接: http://arxiv.org/abs/2609.35641v1  
作者: S. S. Li, X. Han, Y. Tsvetkov et al.  
一句话说明: 用可验证视觉奖励训练图像生成模型遵循数量和空间关系指令，并研究从合成场景到自然提示的迁移。

---

## 3. 研究趋势信号

今日投稿显示，AI 研究正在从“单点能力提升”转向“可控、可预算、可验证的系统能力”。LLM 架构方面，looped Transformer、MoE、线性注意力和随机注意力都指向同一目标：让模型在不同计算预算下弹性运行。智能体方向则更关注真实部署瓶颈，包括 token 成本预测、长上下文压缩、工具失败报告、移动端操作抽象等。同时，RLVR、视觉奖励、rubric reward 和机制可解释性论文表明，评估与反馈信号的可靠性已成为下一阶段训练范式的核心问题。

---

## 4. 值得精读

### 1. **Telescopic Language Models**  
链接: http://arxiv.org/abs/2609.35769v1  
理由: 该论文直面多预算部署问题。如果方法有效，未来一个模型可能不再需要为不同延迟、成本、设备分别训练压缩版本，而是通过嵌套容量实现连续可调推理。

### 2. **KV-streams for Efficient Compaction in Agentic Reinforcement Learning**  
链接: http://arxiv.org/abs/2609.35750v1  
理由: 长程 agent 训练的最大瓶颈之一是上下文轨迹带来的 GPU 显存压力。该工作若能稳定压缩 KV 状态，将对多轮工具使用、长任务 RL 和持续学习 agent 有直接价值。

### 3. **Verifier Errors in RLVR: Reward Hacking, Limits of Feedback, and Selective Control**  
链接: http://arxiv.org/abs/2609.35677v1  
理由: RLVR 是当前推理模型训练的重要范式，但其前提是验证器足够可靠。该论文从理论上分析验证器错误导致的 reward hacking，有助于理解可验证奖励训练的风险边界。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*