# ArXiv AI 研究日报 2026-09-17

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-17 03:56 UTC

---

# ArXiv AI 研究日报 — 2026-09-17

## 1. 今日速览

今日 AI 投稿呈现出明显的三条主线：**LLM 对齐与安全监测、智能体系统工程化、多模态与垂直场景落地**。  
大模型方向中，偏好对齐、奖励黑客检测、合成数据导致的模型坍缩、MoE 剪枝与动态权重生成等问题受到集中关注。  
智能体研究从“能力展示”转向“可治理、可评估、可部署”，包括工具调用调度、隐私暴露评估、组合式策略违规、多智能体协调等。  
应用层面，医疗、教育、机器人、科学代码环境和代码生成基准继续成为高价值落地方向。

---

## 2. 重点论文

### 🧠 大语言模型：架构、训练、对齐、评估

#### 1. [A Zeroth-Order Paradigm for LLM Preference Alignment](http://arxiv.org/abs/2609.19144v1)  
**作者**：P. Chen, X. Chen, W. Yin et al.  
提出一种零阶优化视角下的 LLM 偏好对齐方法，试图缓解传统直接偏好优化中的 likelihood displacement 问题，是对齐算法路线的重要补充。

#### 2. [Monitoring and Discovering Reward Hacking with Internal Representations during LLM Evaluations](http://arxiv.org/abs/2609.19101v1)  
**作者**：L. Bergen, U. Bhalla, A. Lee et al.  
研究奖励黑客行为在 LLM 内部表征中的可检测信号，为评估阶段的安全监控和异常发现提供了机制层面的工具。

#### 3. [Preventing Model Collapse: A Fisher-Rao Perspective on the Dynamics of Training with Synthetic Data](http://arxiv.org/abs/2609.18878v1)  
**作者**：M. Marchi, J. P. Silvestre, B. Gharesifard et al.  
从 Fisher-Rao 几何视角分析合成数据递归训练导致的模型坍缩，为大规模合成数据训练提供理论解释和潜在防控思路。

#### 4. [Higher-order pruning of experts in mixture-of-experts language models](http://arxiv.org/abs/2609.18916v1)  
**作者**：A. M. Tseng, P. Kaul, L. Zancato et al.  
针对 MoE 语言模型的专家剪枝问题，引入更高阶的专家交互建模，缓解现有方法独立评估专家导致的次优剪枝。

#### 5. [Infinite-Parameter LLMs: Generating and Adapting Weights from Live Data](http://arxiv.org/abs/2609.18842v1)  
**作者**：J. Hu, R. M. Clarke, Y. Zhang et al.  
探索从实时数据中生成和适配模型权重的“无限参数”LLM 思路，试图突破静态参数库和传统 MoE 架构的限制。

---

### 🤖 智能体与推理：规划、工具使用、多智能体、治理

#### 6. [Cognitive Extensions for Dual-Process Language Agents: Memory and Self-Reflection in Interactive Environments](http://arxiv.org/abs/2609.19128v1)  
**作者**：J. M. dos Santos, A. L. Oliveira  
在双过程语言智能体中加入记忆与自我反思机制，面向长程交互环境中的状态跟踪、失败恢复和行动有效性问题。

#### 7. [ASLEval: Measuring Privacy Exposure Displacement in LLM Agent Sessions](http://arxiv.org/abs/2609.18864v1)  
**作者**：G. Wu, H. Huang, G. Long et al.  
提出面向工具型 LLM 智能体会话的隐私暴露评估框架，关注信息泄露在多步骤流程中的“位置转移”问题。

#### 8. [Compositional Policy Violations: When Step-Level Compliance Fails In Agentic AI Workflows](http://arxiv.org/abs/2609.18820v1)  
**作者**：A. Kurady, S. S. C. Grandhi, R. Gupta et al.  
指出逐步合规检查无法保证整体智能体工作流合规，强调组合式策略违规是未来智能体治理的核心风险。

#### 9. [Social Laws for Multi-agent Coordination in Stochastic Environments](http://arxiv.org/abs/2609.18929v1)  
**作者**：R. Fernandez, C. Probine, T. Lee et al.  
将多智能体“社会法则”扩展到随机环境中，关注如何通过约束设计减少干扰并提升个体任务鲁棒性。

#### 10. [CERA-MoA: Co-Evolving Routing Mechanisms with Continually Learning LLM Agents](http://arxiv.org/abs/2609.18779v1)  
**作者**：J. Jiang, L. He, Z. Fang  
提出路由机制与持续学习智能体共同演化的 Mixture-of-Agents 框架，使任务分发策略能够随智能体能力变化动态调整。

---

### 🔧 方法与框架：新技术、基准测试、效率优化

#### 11. [Objective vs. Search: Decomposing What Makes a Good Tokeniser](http://arxiv.org/abs/2609.19145v1)  
**作者**：A. Yavuz, C. Meister, T. Pimentel  
系统拆解 BPE 与 UnigramLM 在优化目标和搜索过程上的差异，为 tokenizer 设计提供更清晰的归因分析。

#### 12. [Ask the Tool, Don't Guess: Agent Tool Calls Hold Their Progress, and the Serving System Should Read It](http://arxiv.org/abs/2609.18849v1)  
**作者**：Y. Liu, Y. Zhang, F. Li et al.  
针对智能体服务系统中的 KV cache 管理问题，主张直接读取工具调用进度而非预测等待时间，以提升资源调度效率。

#### 13. [Beyond Outcomes: Dual-View Relational Learning for Efficient Agent Benchmarking](http://arxiv.org/abs/2609.18909v1)  
**作者**：X. Guo, J. Wu, D. Deng et al.  
提出面向智能体评测压缩的双视角关系学习方法，降低高成本 agent benchmark 的评估开销。

#### 14. [WaveTLM: Reliable Time-Series Language Modeling through Task Compilation](http://arxiv.org/abs/2609.18812v1)  
**作者**：J. Chen, B. Zhu, H. Pan et al.  
将时间序列任务编译为更可靠的语言建模流程，解决时间序列 LLM 输出中形状、尺度和通道顺序不可信的问题。

---

### 📊 应用：垂直领域、多模态、代码生成

#### 15. [ScienceIDE: Turning World's Scientific Codebase into Agent Learnable Environments](http://arxiv.org/abs/2609.19134v1)  
**作者**：H. Geng, Z. Huang, H. Li et al.  
将科学代码库转化为智能体可学习环境，面向科学计算、工具使用和领域知识迁移，是科学智能体基础设施方向的重要工作。

#### 16. [Dreaming the Sound of Contact: Leveraging Video and Audio Generation for Zero-Shot Force-Aware Manipulation and Data Generation](http://arxiv.org/abs/2609.19137v1)  
**作者**：G. Ji, T. Li, D. Suh et al.  
利用视频与音频生成补足机器人操作中的接触力信息，推动零样本、力感知操作学习。

#### 17. [PANORAMA: Panoptic Grounded Captioning via Mask Proposal Selection](http://arxiv.org/abs/2609.19143v1)  
**作者**：S. Pieri, E. Kazakos, S. Chen et al.  
面向全景级图文理解，将图像描述与像素级区域进行更可靠绑定，提升 VLM 的空间落地能力。

#### 18. [ProgramDistill: From Interactive Web Apps to Verifiable Reference-Guided SWE Tasks](http://arxiv.org/abs/2609.18805v1)  
**作者**：J. Kim, M. Kim, Y. J. Kim et al.  
构建从交互式 Web 应用中提取可验证软件工程任务的基准，考察代码智能体从既有软件行为中推断需求的能力。

---

## 3. 研究趋势信号

今日论文显示，AI 研究正在从单点模型能力转向**系统级可靠性**：对齐不再只看偏好优化损失，还关注奖励黑客、模型坍缩和内部表征；智能体不再只追求任务成功率，而是强调隐私、合规、资源调度和多智能体稳定性。同时，MoE、动态权重、工具调用感知 serving 等工作说明，大模型扩展正进入“架构—系统—治理”联合优化阶段。垂直应用中，医疗、科学代码、机器人和教育继续成为检验 AI 真实可用性的关键场景。

---

## 4. 值得精读

### 1. [Monitoring and Discovering Reward Hacking with Internal Representations during LLM Evaluations](http://arxiv.org/abs/2609.19101v1)  
奖励黑客是大模型评估和部署中的核心安全问题。该文不只从行为输出判断异常，而是尝试利用内部表征发现可泛化的监测信号，值得关注其方法是否能迁移到更广泛的安全评测场景。

### 2. [Compositional Policy Violations: When Step-Level Compliance Fails In Agentic AI Workflows](http://arxiv.org/abs/2609.18820v1)  
智能体治理的关键难点在于“每一步合规”并不等于“整体合规”。这篇论文准确切中了企业级 agent workflow 的真实风险，对设计审计、权限控制和合规评测框架有直接参考价值。

### 3. [ScienceIDE: Turning World's Scientific Codebase into Agent Learnable Environments](http://arxiv.org/abs/2609.19134v1)  
科学代码库蕴含大量可执行知识，但长期难以转化为智能体训练环境。该工作若能规模化，将有助于构建面向科学发现的 agent 基础设施，是科学 AI 方向值得深入阅读的论文。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*