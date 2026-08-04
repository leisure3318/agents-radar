# ArXiv AI 研究日报 2026-08-04

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 39 篇论文 | 生成时间: 2026-08-04 02:41 UTC

---

# ArXiv AI 研究日报  
基于你提供的 39 篇 2026-08-02 的 ArXiv 投稿，以下是今日摘要。

## 1) 今日速览
今天最值得关注的信号，是 **AI Agent 正在从“能用”转向“可控、可评、可审计”**：包括控制上下文压缩、可执行性门控、时间点回放评测、搜索策略训练与记忆编译等，明显在补齐真实部署中的可靠性短板。  
第二个明显方向是 **安全与对齐的细粒度化**：从医疗顺从性、LLM 评判中的“遗漏”、AI 生成文本检测，到文本/图像 jailbreak 防御，都在追求更透明、更可解释的风险控制。  
第三个趋势是 **多模态与机器人应用开始强调长期记忆、结构化感知和高效执行**，不再只比拼单步准确率。  
同时，若干工作也在推进 **高效模型与压缩部署**，说明“边缘侧落地 + 可靠能力”正在成为新主线。

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

- **[Control Under Compression: Reliability Frontiers for Tool-Using Agents](http://arxiv.org/abs/2608.01056v1)**  
  作者：Hou, Yang  
  一句话：把工具型 Agent 的控制上下文压缩问题，提升为“可靠性边界”问题，直接面向真实部署中的成本与稳定性权衡。

- **[DeBERTa-Sentinel: Toward Transparent and Trustworthy Detection of AI-Generated Text](http://arxiv.org/abs/2608.01046v1)**  
  作者：Rehman, Islam  
  一句话：聚焦 AI 生成文本检测的泛化与透明性，目标是让检测器不仅“能判”，还要“可解释、可验证”。

- **[Why LLMs Give In: Conversational Factors and Reasoning Behind Medical Sycophancy](http://arxiv.org/abs/2608.01017v1)**  
  作者：Ping, Çarık, Wohn et al.  
  一句话：系统分析模型为何在医疗对话中向用户错误观点妥协，为高风险场景的对齐与拒答策略提供证据。

- **[Judging Is Not Enumerating: Silent Omissions in LLM-Authored Acceptable Sets](http://arxiv.org/abs/2608.01000v1)**  
  作者：Wenhui Chen, Jianlin Chen, Ziyao Lin et al.  
  一句话：指出让 LLM 充当“评判者”时会漏掉可接受项，提醒我们“会打分”不等于“能穷尽正确答案”。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

- **[Don't Offer What Can't Be Done: Deterministic Executability Gating for LLM Skill Selection at Scale](http://arxiv.org/abs/2608.01050v1)**  
  作者：Ashkenazi, Kloz, Ulianchenko  
  一句话：在技能检索/选择前加入“可执行性门控”，解决语义匹配正确但现实状态下根本无法执行的问题。

- **[What Could the Agent See at 19:05? Generating Temporal Enterprise Scenarios from Real Research and Replaying Them to Evaluate Agents](http://arxiv.org/abs/2608.01042v1)**  
  作者：Sahu, Arora  
  一句话：把企业 Agent 评测从静态快照推进到“时间点回放”，更贴近真实业务中数据随时间变化的决策环境。

- **[Search-GRT: Guided Retrieval Training of Search Agents to Optimize for Complex Question Answering](http://arxiv.org/abs/2608.00974v1)**  
  作者：Kumar, Paul, Kulkarni et al.  
  一句话：通过引导式检索训练提升搜索型 Agent 的多跳问答能力，重点改善“会搜但不会组织搜索”的问题。

- **[TrajWiki: Source-Grounded Memory Trajectories for Long-Horizon Dialogue Agents](http://arxiv.org/abs/2608.00967v1)**  
  作者：Jingyu Sun, Yuyang Xue, Mingyang Li et al.  
  一句话：提出可追溯、可更新的长期对话记忆轨迹，让 Agent 的记忆不再只是摘要，而是带来源证据的演化过程。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

- **[Caliber: Cross-Architecture Extraction-Cost Control for Score-Returning APIs](http://arxiv.org/abs/2608.01023v1)**  
  作者：Chi Wang, Hanwen Wang, Yu Xia et al.  
  一句话：把输出扰动防抽取问题转化为“每个查询的恢复成本”控制，适合评分型 API 的实战防护。

- **[PMMC: Prospective Multimodal Memory Compilation for Long-Term LVLM Agents](http://arxiv.org/abs/2608.00962v1)**  
  作者：Jingyu Sun, Yan Lin, Yuyang Xue et al.  
  一句话：面向长程多模态 Agent 的记忆编译框架，解决“视觉经历被粗暴文本化后丢失关键信息”的老问题。

- **[SCHEDBench: A Benchmark for Evaluating LLM Constraint Faithfulness in Natural-Language Combinatorial Scheduling](http://arxiv.org/abs/2608.00991v1)**  
  作者：Shrenil Shaun Sharma, Avi Sharma  
  一句话：专门评测 LLM 对自然语言调度约束的忠实度，补上“能说方案”但“未必满足约束”的评测缺口。

---

### 📊 应用（垂直领域、多模态、代码生成）

- **[CallScreenBench: Benchmarking On-Device Models as Phone Secretaries](http://arxiv.org/abs/2608.01033v1)**  
  作者：Simiao Ren  
  一句话：把小模型放到“电话秘书”这一真实任务上评测，检验端侧模型在开放式语音代理场景的实用性。

- **[MedUPS: Towards Diagnostic Assistance in Uncommon Medical Cases with Large Language Models](http://arxiv.org/abs/2608.01012v1)**  
  作者：Ben Shoham, Perets, Grinberg et al.  
  一句话：聚焦罕见、非标准医学案例，强调诊疗过程而非单次诊断，契合临床决策支持的真实工作流。

- **[WAM-Diff2: Hierarchical AR-to-Diffusion Distillation for Highly Efficient Autonomous Driving VLA](http://arxiv.org/abs/2608.01035v1)**  
  作者：Zhu, Shang, Xu et al.  
  一句话：把自回归 VLA 蒸馏到扩散式高效策略，目标是在自动驾驶中同时降低延迟并缓解 exposure bias。

---

## 3) 研究趋势信号
今天的论文明显朝 **“Agent 可靠性工程化”** 收敛：一方面做控制上下文压缩、可执行性门控、时间回放评测和搜索训练；另一方面做记忆编译、约束忠实度与输出扰动防护。与此同时，安全研究也更细粒度化，从医疗顺从性、LLM 评判遗漏到生成文本检测，都在追求可审计与可复现。多模态与机器人则开始强调长期记忆、结构化感知和低延迟执行。

---

## 4) 值得精读
1. **[Control Under Compression: Reliability Frontiers for Tool-Using Agents](http://arxiv.org/abs/2608.01056v1)**  
   理由：它切中了当前工具型 Agent 的核心痛点——控制信息太长、太贵、太脆弱；适合作为后续 agent 系统设计的参考框架。

2. **[What Could the Agent See at 19:05? Generating Temporal Enterprise Scenarios from Real Research and Replaying Them to Evaluate Agents](http://arxiv.org/abs/2608.01042v1)**  
   理由：把评测从静态题库推进到“时间状态可见性”问题，很可能影响未来企业 Agent 的基准设计方式。

3. **[PMMC: Prospective Multimodal Memory Compilation for Long-Term LVLM Agents](http://arxiv.org/abs/2608.00962v1)**  
   理由：多模态长期记忆是下一代 LVLM Agent 的关键瓶颈，这篇工作直接面向“记忆如何保真、如何更新、如何可用”。

如果你愿意，我还可以继续把这份日报整理成：
- **“按热度排序版”**
- **“适合组会汇报的 PPT 大纲版”**
- **“仅保留最重要 5 篇的极简版”**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*