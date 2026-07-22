# ArXiv AI 研究日报 2026-07-22

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-07-22 02:47 UTC

---

# ArXiv AI 研究日报（2026-07-22）

## 1) 今日速览
今天的投稿明显围绕两个主轴展开：**“更会推理”**与**“更可部署”**。一方面，RLVR、证据驱动训练、推理时 steering 等工作继续推进长上下文、跨语言和难题推理的稳定性，重点从“答对”转向“依据更可靠、过程更少退化”。另一方面，智能体相关论文集中讨论**路由、监控、攻击面和生产落地**，说明 agent 研究正在从 demo 走向工程化与安全治理。  
与此同时，多模态与垂直领域任务也在加速细分，病理、分子设计、会议理解等方向开始更强调**证据定位、可验证基准**和**任务闭环**。整体来看，今天的信号很清晰：AI 研究正在从单纯追求指标，转向**可控、可审计、可落地**。

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

- **[Copy Less, Ground More: Overcoming Repetitive Copying in Long-Context Reasoning via Evidence-Aware Reinforcement Learning](http://arxiv.org/abs/2607.19345v1)**  
  作者：Fang et al.  
  一句话：针对长上下文推理中的“重复拷贝”退化，提出证据感知强化学习，让模型更依赖原始证据而不是机械复述，这对长链条推理与检索增强场景很关键。

- **[ISO: An RLVR-Native Optimization Stack](http://arxiv.org/abs/2607.19331v1)**  
  作者：Zhu et al.  
  一句话：把 RLVR 从“奖励怎么来”推进到“奖励如何稳定变成参数更新”，关注优化栈而非单点技巧，适合看作 RLVR 工程化的重要基础工作。

- **[Prompt Design at Scale: How Format, Instruction Count, and Context Length Shape Instruction Adherence and Hallucination in Large Language Models](http://arxiv.org/abs/2607.19257v1)**  
  作者：Eliav  
  一句话：系统研究格式、指令数量和上下文长度对遵循率与幻觉的影响，为提示工程提供了少见的定量证据。

- **[Inference-Time Steering for Cross-Lingual Factual Consistency in LLMs](http://arxiv.org/abs/2607.19243v1)**  
  作者：Manev  
  一句话：用推理时 steering 缓解跨语言事实不一致问题，给“部署时纠偏语言偏置”提供了轻量、实用的路线。

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

- **[CodeRescue: Budget-Calibrated Recovery Routing for Coding Agents](http://arxiv.org/abs/2607.19338v1)**  
  作者：He et al.  
  一句话：把代码代理失败后的反馈视为可利用信号，设计预算校准的恢复路由机制，解决“失败后如何低成本回收成功率”的问题。

- **[Agents in the Wild: Where Research Meets Deployment](http://arxiv.org/abs/2607.19336v1)**  
  作者：Yang et al.  
  一句话：概括 agent 从研究原型到生产部署的关键挑战——工具、协调、可靠性和治理——很像一篇面向落地的路线图。

- **[ResearchArena: Evaluating Sabotage and Monitoring in Automated AI R&D](http://arxiv.org/abs/2607.19321v1)**  
  作者：Libon et al.  
  一句话：构建 AI R&D 场景下的 sabotage/monitoring 评测，强调在“不信任 agent”的前提下验证其产出能否安全使用。

- **[They'll Verify. They Just Won't Act. How Authority Framing and Laundered Code Turn a Trusted Agentic CI/CD Pipeline Into an Attack Surface](http://arxiv.org/abs/2607.19267v1)**  
  作者：Sidot  
  一句话：用 CI/CD 多智能体流水线展示“有验证不等于安全”，揭示了权限框架、代码投毒与代理协作带来的真实攻击面。

### 🔧 方法与框架（新技术、基准测试、效率优化）

- **[Provable diffusion-based posterior sampling for linear inverse problems via DDIM](http://arxiv.org/abs/2607.19333v1)**  
  作者：Jiao et al.  
  一句话：把 diffusion 用于线性逆问题的后验采样，并给出理论保证，兼顾可证明性与效率。

- **[AdaFlash: Adaptive Speculative Decoding via On-Policy Distilled Diffusion Drafters](http://arxiv.org/abs/2607.19223v1)**  
  作者：Qian et al.  
  一句话：将 speculative decoding 与 on-policy 蒸馏的 diffusion drafter 结合，目标是在不牺牲质量的前提下进一步提升推理速度。

- **[Conservative Query and Adaptive Regularization for Offline RL Under Uncertainty Estimation](http://arxiv.org/abs/2607.19199v1)**  
  作者：Zhou et al.  
  一句话：针对离线 RL 的覆盖不足问题，引入保守查询与自适应正则化，强调在不确定性下稳健改进策略。

### 📊 应用（垂直领域、多模态、代码生成）

- **[PathAgentBench: Benchmarking Evidence-Seeking Vision-Language Models on Whole-Slide Pathology Image](http://arxiv.org/abs/2607.19261v1)**  
  作者：Liao et al.  
  一句话：面向全切片病理图像的证据检索与多尺度推理基准，补上了只测最终答案、忽略证据定位的评估缺口。

- **[DBMol: Design of High-Affinity, Target-Specific Small Molecules through Structure Prediction Models](http://arxiv.org/abs/2607.19237v1)**  
  作者：Qin et al.  
  一句话：把结构预测模型用于高亲和力、小靶点特异性分子设计，切入药物发现里最具应用价值的方向之一。

- **[MeetingToM: Evaluating Multimodal LLMs on Theory-of-Mind Reasoning in Multi-Party Meetings](http://arxiv.org/abs/2607.19235v1)**  
  作者：Wang et al.  
  一句话：评测多模态 LLM 在多人会议中的 Theory-of-Mind 能力，重点考察对隐式意图、知识状态和多模态线索的整合。

---

## 3) 研究趋势信号
今日最明显的趋势是：**RLVR 正在从单点技巧演进为完整优化栈**，研究者开始同时处理奖励稀疏、证据利用、推理成本和训练稳定性；另一条线是**agent 的部署安全**，监控、路由、审计与攻击面评测几乎成为标配。与此同时，多模态与垂直应用更强调“**找证据再下结论**”的可验证能力，说明评测重心正在从结果正确性转向过程可信性与系统可控性。

---

## 4) 值得精读
1. **[Agents in the Wild: Where Research Meets Deployment](http://arxiv.org/abs/2607.19336v1)**  
   理由：它不只是讲一个方法，而是在总结 agent 走向真实部署时必须面对的系统性问题，适合把握行业方向。

2. **[Copy Less, Ground More: Overcoming Repetitive Copying in Long-Context Reasoning via Evidence-Aware Reinforcement Learning](http://arxiv.org/abs/2607.19345v1)**  
   理由：直接切中长上下文推理中的常见退化模式，且方法和问题都很“底层”，对后续工作参考价值高。

3. **[ResearchArena: Evaluating Sabotage and Monitoring in Automated AI R&D](http://arxiv.org/abs/2607.19321v1)**  
   理由：AI 自动化研发一旦进入现实环境，安全评测会变成核心门槛；这篇很适合关注“如何把风险评估做成基准”。

如果你愿意，我也可以把这份日报进一步整理成：
- **投资/产业视角版**
- **学术组会汇报版（更短）**
- **按“最可能发顶会”排序版**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*