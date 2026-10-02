# ArXiv AI 研究日报 2026-10-02

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-10-02 04:36 UTC

---

# ArXiv AI 研究日报｜2026-10-02

## 1. 今日速览

今日论文集中呈现出三条主线：**LLM 后训练与高效微调**、**智能体工具使用与长程任务评估**、以及**机器人/多模态智能体从模拟走向真实交互**。  
在大模型方向，多篇工作重新审视 SFT、蒸馏、上下文压缩、数学推理缺陷与数据选择，显示后训练方法正在从“更强 RL”转向“更可控、更省、更可解释”。  
智能体评测明显升温，网络安全、企业数据分析、科研灵感检索、工具使用诊断等基准都在强调**可验证、细粒度、接近真实工作流**。  
机器人与多模态方面，今日多篇论文关注多机器人协作、具身自改进、视觉推理 harness 和人形机器人工具使用，体现出 AI 系统向开放环境执行能力扩展的趋势。

---

## 2. 重点论文

### 🧠 大语言模型：架构、训练、对齐、评估

#### 1. [Hierarchical Continuous Diffusion Language Models](http://arxiv.org/abs/2610.02193v1)  
**作者**：H. Ren, Z. Li, C. Liu 等  
提出层次化连续扩散语言模型，试图缓解离散扩散 LM 并行解码时 token 独立采样导致的结构瓶颈，值得关注其作为自回归之外新生成范式的潜力。

#### 2. [Finetuning with Sampling: SFT Learns Better Than You Think](http://arxiv.org/abs/2610.02140v1)  
**作者**：A. Karan, S. Chen, Y. Du  
重新评估 SFT 与 RL 的能力边界，指出结合采样的监督微调可能比传统认知更强，对后训练路线选择具有直接启发。

#### 3. [The Missing Primitive: Diagnosing and Repairing Mathematical Reasoning in Large Language Models](http://arxiv.org/abs/2610.02191v1)  
**作者**：S. Xing, Z. Dai, C. Qian 等  
系统诊断 LLM 数学推理中缺失的基础结构能力，关注点从“能否解题”推进到“是否具备可组合的数学原语”。

#### 4. [AutoCompact: Learning When to Compact Context in Long-Horizon Coding Agents](http://arxiv.org/abs/2610.02163v1)  
**作者**：X. Zhang, L. Zheng, C. Du 等  
面向长程代码智能体，学习何时压缩上下文、保留哪些工作记忆，是 repository-level coding agent 走向稳定执行的重要基础能力。

#### 5. [From Gradients to Capabilities: Understanding Multi-Teacher On-Policy Distillation](http://arxiv.org/abs/2610.02179v1)  
**作者**：S. Zhu, S. Huang, K. Zhang 等  
分析多教师 on-policy 蒸馏如何影响学生模型参数与能力迁移，有助于理解如何把多个 RL 专家能力合并到单一模型中。

---

### 🤖 智能体与推理：规划、工具使用、多智能体、思维链

#### 6. [KaliBench: A Fine-Grained Benchmark for Cybersecurity Tool Use on Kali Linux with Runtime-Free Verifiable Rewards](http://arxiv.org/abs/2610.02206v1)  
**作者**：P. Li, N. Suryanto, S. Zhang 等  
构建 Kali Linux 网络安全工具使用基准，并提供无需真实运行即可验证的奖励信号，直击 LLM 安全工具调用评测的可执行性问题。

#### 7. [Argo-Bench: Evaluating Data Agents on Enterprise-Scale Workflows](http://arxiv.org/abs/2610.02122v1)  
**作者**：G. Tomitsuka, A. Raayatsanati, E. Xing 等  
面向企业级数据分析工作流评估数据智能体，覆盖多表推理、统计分析和行动决策，超越传统 text-to-SQL 单点测试。

#### 8. [VISTA: A Visual Harness for Reasoning in an Interactive World](http://arxiv.org/abs/2610.02200v1)  
**作者**：Q. Han, K. Hu, L. Qiu 等  
提出视觉 harness，为通用多模态模型提供长程视觉交互能力，展示 MLLM 在交互式环境中推理与执行的潜能。

#### 9. [ScholarCatalyst: A Benchmark for Retrieving Papers That Inspire New Research](http://arxiv.org/abs/2610.02202v1)  
**作者**：S. Kim, Y. Lee, B. Liu 等  
将科研能力中的“找到真正启发新研究的前人工作”形式化为检索基准，是 AI for Science 与科研智能体评估中的重要补充。

#### 10. [Causal Memory Policy: Making Memory Utility Identifiable by Intervening on Retrieval](http://arxiv.org/abs/2610.02070v1)  
**作者**：A. Behnam, B. Wang  
从因果干预角度研究记忆增强 LLM 中“记忆是否有用”的可识别性，针对长期记忆系统中的选择偏差提出关键问题。

---

### 🔧 方法与框架：新技术、基准测试、效率优化

#### 11. [TACO: Ternary Absolute-max Column-wise One-sparse Optimizer for LLM Fine-Tuning](http://arxiv.org/abs/2610.02199v1)  
**作者**：J. Jiang, C. McGee, E. H. Bergou 等  
提出面向 LLM 全参数微调的低内存优化器，用一稀疏、三值化更新降低优化器状态开销，适合关注大模型训练效率的读者。

#### 12. [SoftServe: A Scalable Quasi-Newton Method for Deep Learning](http://arxiv.org/abs/2610.02182v1)  
**作者**：J. Ko, T. Parshakova, D. Cai 等  
将拟牛顿方法重新设计用于大规模深度学习，尝试突破非凸性和参数规模对二阶优化的长期限制。

#### 13. [Local Support Learning](http://arxiv.org/abs/2610.02126v1)  
**作者**：A. Ben-Kish, A. Kumar, J. Glass 等  
从权重矩阵输入空间几何角度理解灾难性遗忘，并提出更自然的保留目标，对持续学习和模型编辑具有方法论意义。

#### 14. [Scalable, Transferable Meta-network for Data Selection Requires a Different Loss](http://arxiv.org/abs/2610.02092v1)  
**作者**：Z. Du, B. Yang, B. A. Li  
研究可扩展、可迁移的数据选择元网络，并指出常见损失设计的问题，对大规模语料筛选和 LLM 预训练数据治理有现实价值。

---

### 📊 应用：垂直领域、多模态、代码生成、机器人

#### 15. [Reconstruct, Practice, Go Real: Guided Self-Improvement for Embodied Agents](http://arxiv.org/abs/2610.02204v1)  
**作者**：Y.-J. Wang, H. Jiang, S. Deng 等  
提出 RPG 框架，让机器人通过重建、练习再迁移到真实环境来自主改进执行系统，是具身智能从人工调参走向自我提升的重要尝试。

#### 16. [DuoMind: Enabling Distributed Multi-Robot Coordination with Semantic Communication](http://arxiv.org/abs/2610.02161v1)  
**作者**：H. Zhou, D. Gao, H. Wang 等  
探索利用语义通信支持分布式多机器人协作，回应 VLM/VLA 从单机器人扩展到多机器人系统时的通信与协调挑战。

#### 17. [HumanoidToolBench: Benchmarking Humanoid Tool Use from Selection to Mobile Execution](http://arxiv.org/abs/2610.02089v1)  
**作者**：K. Jang, S. Park, O. Kwon 等  
构建人形机器人工具使用基准，覆盖工具选择、操作与移动执行，评估更接近真实物理任务链条。

#### 18. [Where-OPD: Spatially Guided On-Policy Self-Distillation of MLLMs with Synthetic Scenes](http://arxiv.org/abs/2610.02117v1)  
**作者**：S. Sirko-Galouchenko, M. Wysoczanska, A. Bursuc 等  
将 on-policy 自蒸馏用于多模态大模型，并借助合成场景强化空间理解，是提升 MLLM 视觉定位与空间推理能力的有趣方向。

---

## 3. 研究趋势信号

今日投稿显示，AI 研究正在从“单模型能力提升”转向“系统级可靠执行”。LLM 后训练方向不再只强调 RL，而是重新审视 SFT、蒸馏、数据选择、上下文压缩与低内存优化器等更工程可落地的方法。智能体评测则明显走向细粒度和可验证：网络安全、企业数据分析、科研检索、工具使用诊断都要求模型真正生成可执行动作，而非仅凭关键词或答案匹配得分。机器人与多模态论文强调长程交互、多机器人协调、工具使用和 sim-to-real 自改进，说明具身智能正在吸收 LLM/VLM 的规划能力，同时面临通信、记忆、验证与真实环境泛化等系统挑战。

---

## 4. 值得精读

### 1. [Finetuning with Sampling: SFT Learns Better Than You Think](http://arxiv.org/abs/2610.02140v1)  
**理由**：如果论文结论扎实，它可能改变后训练实践中“RL 才能带来强泛化”的默认假设。对从事 instruction tuning、RLHF/RLAIF、能力注入和成本控制的研究者都很重要。

### 2. [KaliBench: A Fine-Grained Benchmark for Cybersecurity Tool Use on Kali Linux with Runtime-Free Verifiable Rewards](http://arxiv.org/abs/2610.02206v1)  
**理由**：网络安全是 LLM 工具使用最具现实价值也最需严谨评估的场景之一。该工作强调细粒度工具调用和可验证奖励，可能成为安全智能体评估的重要参考。

### 3. [Reconstruct, Practice, Go Real: Guided Self-Improvement for Embodied Agents](http://arxiv.org/abs/2610.02204v1)  
**理由**：具身智能的关键瓶颈在于技能开发、奖励设计和 sim-to-real 迁移成本。RPG 将重建、练习和真实部署串联起来，代表机器人自主改进系统的一条重要路线。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*