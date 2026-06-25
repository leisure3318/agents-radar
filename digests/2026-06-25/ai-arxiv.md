# ArXiv AI 研究日报 2026-06-25

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 49 篇论文 | 生成时间: 2026-06-25 03:48 UTC

---

# ArXiv AI 研究日报（2026-06-25）

## 1) 今日速览
今天的论文明显聚焦在 **智能体能力与安全** 两条主线：一方面，工具使用、强化学习、自治数据生成等方向继续加速，研究者开始关注“性能提升是否伴随模式塌缩、输出多样性下降”。另一方面，AI 安全从“检测异常行为”进一步走向 **运行时隔离、模型取证、可验证信任层**，说明行业正在从事后评估转向系统级防护。  
与此同时，**多模态鲁棒性与评测细化** 成为热点，包括排序敏感性、OCR 退化鲁棒性、多视图推理等，反映出“分数高不等于可靠”的共识正在强化。  
应用侧则出现了不少高价值落地：机器人操作、语音对话、低资源语言、医学风险分层、工业焊接与水下识别等，显示 AI 正持续向复杂真实场景渗透。  

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

1. **[On-Policy Self-Distillation with Sampled Demonstrations Reduces Output Diversity](http://arxiv.org/abs/2606.26091v1)**  
   作者：Nicolicioiu, Pezeshki, Courville  
   一句话：揭示 on-policy self-distillation 虽能提升 pass@1，但会显著压缩输出多样性，是对“高分不一定更稳健”的重要警示。

2. **[Same Evidence, Different Answer: Auditing Order Sensitivity in Multimodal Large Language Models](http://arxiv.org/abs/2606.26079v1)**  
   作者：Paruchuri, Koyejo, Adeli  
   一句话：提出 Facet-Probe 审计框架，系统测试多模态模型对输入顺序的敏感性，补上了传统单点评测忽略的可靠性漏洞。

3. **[Real-Time Voice AI Hears but Does Not Listen](http://arxiv.org/abs/2606.26083v1)**  
   作者：Bartelds, Bianchi, Zou  
   一句话：对主流实时语音系统做“词义 vs 语调”联合评测，显示很多系统能听懂字面却未真正理解说话方式中的情绪与态度。

4. **[Weave of Formal Thought](http://arxiv.org/abs/2606.25987v1)**  
   作者：Bouayad  
   一句话：把语法结构显式织入 LLM 的代码生成/形式化思维流程，指向“结构约束 + 生成”而非纯 prompt 的新路线。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

5. **[Why Multi-Step Tool-Use Reinforcement Learning Collapses and How Supervisory Signals Fix It](http://arxiv.org/abs/2606.26027v1)**  
   作者：Hao, Jin, Liao et al.  
   一句话：解释多步工具使用 RL 为什么容易训练崩塌，并指出监督信号能显著稳定学习，是 agentic RL 的关键机制论文。

6. **[Neglected Free Lunch from Post-training: Progress Advantage for LLM Agents](http://arxiv.org/abs/2606.26080v1)**  
   作者：Oh, Li, Park et al.  
   一句话：从 agent 任务的过程奖励难题切入，强调后训练中被忽视的“进展优势”，适合关注长时序智能体优化的人阅读。

7. **[Can Trustless Agents Be Trusted? An Empirical Study of the ERC-8004 Decentralized AI Agent Ecosystem](http://arxiv.org/abs/2606.26028v1)**  
   作者：Xiong, Li, Wei et al.  
   一句话：把智能体协作放到去中心化信任层 ERC-8004 里实证评估，讨论“无中心信任”系统是否真的可信。

8. **[Autodata: An agentic data scientist to create high quality synthetic data](http://arxiv.org/abs/2606.25996v1)**  
   作者：Kulikov, Whitehouse, Wu et al.  
   一句话：让 agent 扮演“数据科学家”自动生成高质量合成数据，体现智能体从执行者走向数据生产者的趋势。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

9. **[The Unfireable Safety Kernel: Execution-Time AI Alignment for AI Agents and Other Escapable AI Systems](http://arxiv.org/abs/2606.26057v1)**  
   作者：Dobrin, Chmiel  
   一句话：提出运行时安全内核思路，把控制从 agent 自身地址空间外移，强化“不可被 agent 关闭”的安全边界。

10. **[Model Forensics: Investigating Whether Concerning Behavior Reflects Misalignment](http://arxiv.org/abs/2606.26071v1)**  
    作者：Singh, Kroiz, Rajamanoharan et al.  
    一句话：强调“有问题的行为不等于错位”，将安全研究推进到模型取证层面，帮助区分误触发、混淆与真实失配。

11. **[Tensorion: A Tensor-Aware Generalization of the Muon Optimizer](http://arxiv.org/abs/2606.25975v1)**  
    作者：Bogachev, Aletov, Molozhavenko et al.  
    一句话：把优化器从“向量视角”升级到“张量结构感知”，为大模型训练中的结构化参数更新提供新工具。

12. **[When Does Synthetic Data Augmentation Improve Score-Based Imbalanced Classification?](http://arxiv.org/abs/2606.26053v1)**  
    作者：Ma, Lyu, Zhang  
    一句话：给出合成少数类增强何时有效的理论边界，适合关注数据增强“何时真有用”的读者。

---

### 📊 应用（垂直领域、多模态、代码生成）

13. **[Learning Action Priors for Cross-embodiment Robot Manipulation](http://arxiv.org/abs/2606.26095v1)**  
    作者：Jing, Zhang, Liu et al.  
    一句话：面向跨本体机器人操作学习动作先验，解决“不同机器人身体结构不同、动作知识难迁移”的核心痛点。

14. **[How Robust is OCR-Reasoning? Evaluating OCR-Reasoning Robustness of Vision-Language Models under Visual Perturbations](http://arxiv.org/abs/2606.26041v1)**  
    作者：Cheng, Wu, Chang  
    一句话：专门测 OCR 推理在视觉扰动下的稳定性，指出视觉文字理解远没有标准榜单显示得那么稳。

15. **[AI translation of literary texts is "fine", but readers still prefer human translations](http://arxiv.org/abs/2606.26040v1)**  
    作者：Ferstler, Podoxin, Brassington et al.  
    一句话：从读者体验而非自动指标出发评估文学翻译，提醒“可用”与“有文学性”并不等价。

16. **[SpeechEQ: Benchmarking Emotional Intelligence Quotient in Socially Aware Voice Conversational Models](http://arxiv.org/abs/2606.25990v1)**  
    作者：Wu, Chen, Wu et al.  
    一句话：把语音对话模型的情商纳入系统评测，补齐“能对话”之外的社交理解能力短板。

---

## 3) 研究趋势信号
今日投稿显示，AI 正从“单点能力提升”转向“可控、可证、可审计”的系统工程：工具使用 RL、自治数据生成、去中心化信任层、运行时安全内核等，说明智能体时代的核心问题已从会不会做，变成能否稳定、可信、不可逃逸。同时，多模态与语音评测开始强调顺序敏感、情绪理解、视觉扰动鲁棒性，反映出 benchmark 正在向真实世界复杂性靠拢。

---

## 4) 值得精读
1. **[Why Multi-Step Tool-Use Reinforcement Learning Collapses and How Supervisory Signals Fix It](http://arxiv.org/abs/2606.26027v1)**  
   理由：直接命中当前 agent RL 的核心瓶颈，兼具现象解释与方法修复，实用价值高。

2. **[The Unfireable Safety Kernel: Execution-Time AI Alignment for AI Agents and Other Escapable AI Systems](http://arxiv.org/abs/2606.26057v1)**  
   理由：把安全控制从“模型内部”提升到“系统运行时”，对真实部署场景非常关键。

3. **[Same Evidence, Different Answer: Auditing Order Sensitivity in Multimodal Large Language Models](http://arxiv.org/abs/2606.26079v1)**  
   理由：评测视角新、问题典型，能帮助理解多模态模型为何在现实中表现不稳定。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*