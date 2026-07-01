# ArXiv AI 研究日报 2026-07-01

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-07-01 01:54 UTC

---

# ArXiv AI 研究日报（2026-07-01）

## 1) 今日速览
今天的论文明显聚焦在三条主线：**自主研究智能体**继续从“能做任务”走向“能自我纠错、能规模化部署”；**LLM 安全与评估**从表面合规转向更深层的真实对齐、可追责与可验证；**长上下文与高效推理**则围绕 KV Cache、上下文管理、token 选择等工程瓶颈持续突破。  
另一方面，**医疗、语音、机器人、工业控制**等垂直场景正在把 LLM/VLM/不确定性估计落到真实约束下，强调可用性、稳健性和人类监督。  
整体看，今日投稿的关键词不是“更大模型”，而是**更可靠的系统、更稳的评测、更低的部署成本**。  

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

- **[Moral Safety in LLMs: Exposing Performative Compliance with Puzzled Cues](http://arxiv.org/abs/2606.31644v1)**  
  作者：Shafiei 等  
  一句话：指出现有公平/道德评测会高估模型“看起来很安全”的程度，强调要区分**表面合规**与**真实安全**。

- **[Robust Text Watermarking for Large Language Models via Dual Semantic Embeddings](http://arxiv.org/abs/2606.31602v1)**  
  作者：Schäfer 等  
  一句话：提出双语义嵌入水印方案，提升对改写和翻译攻击的鲁棒性，对 LLM 内容溯源很关键。

- **[AutoTrainess: Teaching Language Models to Improve Language Models Autonomously](http://arxiv.org/abs/2606.31551v1)**  
  作者：Yu 等  
  一句话：探索让模型自主改进模型训练流程，是“自动化后训练”方向的重要一步。

- **[FinPersona-Bench: A Benchmark for Longitudinal Psychometric Stability of Autonomous Financial Agents](http://arxiv.org/abs/2606.31522v1)**  
  作者：Safder 等  
  一句话：关注金融自治代理在长期部署中的人格/行为稳定性，补上了“持续一致性”这一关键评测空白。

- **[On the Convergence of Self-Improving Online LLM Alignment](http://arxiv.org/abs/2606.31524v1)**  
  作者：Wu 等  
  一句话：从理论上分析自我改进式在线对齐的收敛性，为“模型持续自校准”提供数学基础。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

- **[FARS: A Fully Automated Research System Deployed at Scale](http://arxiv.org/abs/2606.31651v1)**  
  作者：Tang 等  
  一句话：展示了可规模化部署的全自动科研系统，说明 LLM agent 已从 demo 走向“端到端研究流水线”。

- **[ECHO: Prune to act, trace to learn with selective turn memory in agentic RL](http://arxiv.org/abs/2606.31650v1)**  
  作者：Xie 等  
  一句话：围绕长时序 agent 的记忆选择与轨迹压缩，解决上下文窗口有限下的行动与学习问题。

- **[Think in English, Answer in Korean: Efficient Adaptation of Multilingual Tool-Using Agents](http://arxiv.org/abs/2606.31648v1)**  
  作者：Garg 等  
  一句话：用“英文思考、韩文输出”的训练范式做多语言工具代理适配，兼顾推理效率与企业部署约束。

- **[Which Tokens Matter? Adaptive Token Selection for RLVR with the Relative Surprisal Index](http://arxiv.org/abs/2606.31575v1)**  
  作者：Lv 等  
  一句话：把 RLVR 的训练信号聚焦到“更关键的 token”，有助于提升可验证奖励训练的效率与稳定性。

- **[One Reflection Is Not Enough: Self-Correcting Autonomous Research via Multi-Hypothesis Failure Attribution](http://arxiv.org/abs/2606.31478v1)**  
  作者：Ma 等  
  一句话：提出用多假设失败归因替代单次反思，提升自动科研 agent 在实验失败后的恢复能力。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

- **[ACE: Pluggable Adaptive Context Elasticizer across Agents](http://arxiv.org/abs/2606.31564v1)**  
  作者：Liao 等  
  一句话：面向 agent 长轨迹的上下文弹性管理框架，旨在缓解固定上下文窗口带来的信息截断问题。

- **[RaBitQCache: Rotated Binary Quantization for KVCache in Long Context LLM Inference](http://arxiv.org/abs/2606.31519v1)**  
  作者：Li 等  
  一句话：用旋转二值量化压缩 KV cache，直接瞄准长上下文推理的核心瓶颈。

- **[Calibration, Not Compilation: Detecting and Repairing Misspecified Probabilistic Programs Written by Language Models](http://arxiv.org/abs/2606.31630v1)**  
  作者：Xu 等  
  一句话：强调“能运行”不等于“统计上正确”，为 LLM 生成概率程序的检测与修复提供方法。

- **[On Optimal Data Splitting for Split Conformal Prediction](http://arxiv.org/abs/2606.31600v1)**  
  作者：Das 等  
  一句话：研究 split conformal prediction 的最优数据划分，对不确定性量化更实用、更严谨。

- **[Improving Certified Robustness via Adversarial Distillation](http://arxiv.org/abs/2606.31653v1)**  
  作者：Melis 等  
  一句话：把对抗蒸馏引入 certified robustness 训练，面向可验证鲁棒性提供新的优化路径。

---

### 📊 应用（垂直领域、多模态、代码生成）

- **[CLExEval: A Human-in-the-Loop Framework for Qualitative Evaluation of LLM Clinical Reasoning](http://arxiv.org/abs/2606.31608v1)**  
  作者：Ajmal 等  
  一句话：提出面向临床推理的人工参与式质性评估框架，解决医疗场景“话说得对不对”比“答得像不像”更重要的问题。

- **[Tone-Conditioned Curriculum Learning for Low-Resource Bantu Speech Recognition](http://arxiv.org/abs/2606.31642v1)**  
  作者：Mokgosi 等  
  一句话：针对低资源班图语 ASR 设计声调条件课程学习，直接提升弱资源语音识别可用性。

- **[Token-Sparse Medical Multimodal Reasoning via Dual-Stream Reinforcement Learning](http://arxiv.org/abs/2606.31599v1)**  
  作者：Chen 等  
  一句话：通过 token 稀疏化与双流强化学习提升医学多模态推理，兼顾精度与计算效率。

- **[Building an ASR Solution for Training and Assessing Children's Reading](http://arxiv.org/abs/2606.31508v1)**  
  作者：Diarra 等  
  一句话：面向儿童阅读评测的 Bambara 语 ASR 系统，体现 AI 在教育基础设施上的落地价值。

---

## 3) 研究趋势信号
今日投稿显示出一个清晰趋势：**LLM 正从“单次问答模型”转向“可持续运行的系统”**。研究重点不再只是生成质量，而是上下文管理、失败恢复、长期一致性、可验证奖励与部署成本。与此同时，安全研究也在升级：从内容过滤转向**真实对齐、鲁棒水印、可追责报告机制**。在应用层，医疗、语音、工业和金融等高风险场景开始更强调**不确定性、可解释性和人类在环**。  

---

## 4) 值得精读

1. **[FARS: A Fully Automated Research System Deployed at Scale](http://arxiv.org/abs/2606.31651v1)**  
   理由：这是“自动科研代理”最接近真实部署的一类工作，最能代表该方向的系统化进展。

2. **[Moral Safety in LLMs: Exposing Performative Compliance with Puzzled Cues](http://arxiv.org/abs/2606.31644v1)**  
   理由：它直击当前安全评测的核心误区——模型可能只是“会演”，不是真的安全。

3. **[RaBitQCache: Rotated Binary Quantization for KVCache in Long Context LLM Inference](http://arxiv.org/abs/2606.31519v1)**  
   理由：长上下文推理的 KV cache 是落地瓶颈，这篇很可能对工程实践有直接价值。  

如果你愿意，我也可以把这份日报进一步整理成：
- **“按热度排序版”**
- **“适合组会汇报版”**
- **“只保留最有潜力的 5 篇论文版”**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*