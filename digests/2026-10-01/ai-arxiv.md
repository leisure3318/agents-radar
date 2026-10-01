# ArXiv AI 研究日报 2026-10-01

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-10-01 04:44 UTC

---

# ArXiv AI 研究日报｜2026-10-01

## 1. 今日速览

今日论文呈现出明显的“智能体工程化”趋势：多篇工作围绕 agent harness、计算机使用智能体、自我进化、在线反馈与多智能体协作展开，说明研究重心正从单模型能力转向可持续改进的系统框架。LLM 方向则集中在 RLVR 稳健性、跨语言 unlearning、AI 生成网页文本对预训练的影响，以及高效生成与测试时扩展的可信评估。机器人与具身智能投稿活跃，偏好驱动策略迭代、自博弈技能发现、触觉好奇心等工作强调从交互中获得更强泛化能力。应用层面，临床诊断、脑机接口、语音对话、长程视频记忆和翻译模型均有值得关注的新基准或系统。

---

## 2. 重点论文

### 🧠 大语言模型：架构、训练、对齐、评估

#### 1. [Semifactual Credit-Augmented Policy Optimization](http://arxiv.org/abs/2609.40360v1)  
**作者**：J. Pan, Z. Fu, S. Huang et al.  
提出用“半事实提示干预”分析并缓解 RLVR 训练后 LLM 对任务无关提示特征的敏感性，是提升推理模型稳健性和可归因信用分配的重要尝试。

#### 2. [How Much Is an AI Token Worth? Scaling Laws for Wild AI-Generated Web Text](http://arxiv.org/abs/2609.40295v1)  
**作者**：J. Russell, B. Glickenhaus, K. Thai et al.  
研究真实网页中 AI 生成文本比例上升对预训练数据价值的影响，并给出 scaling-law 视角下的量化分析，对未来数据治理和模型退化风险具有现实意义。

#### 3. [Linguistic Loopholes in LLM Unlearning: From a 174-Language Benchmark to Coverage-Aware Unlearning](http://arxiv.org/abs/2609.40286v1)  
**作者**：T. Skow, S. Chaudhari, R. Chellappa et al.  
指出单语言 unlearning 容易被跨语言查询绕过，并构建 174 种语言基准，推动 LLM 遗忘机制从单语评估走向覆盖感知的多语安全。

#### 4. [Scaling Laws for Looped Mixture of Experts](http://arxiv.org/abs/2609.40316v1)  
**作者**：Y. Chen, A. Goyal, R. Krishnamoorthi  
将 looped transformer 的循环深度与 MoE 稀疏容量纳入统一 scaling-law 分析，为高效扩展大模型提供了新的理论和工程参考。

#### 5. [Distribution Matching Distillation for Continuous Diffusion Language Models](http://arxiv.org/abs/2609.40235v1)  
**作者**：P. Le Van Kiem, D. Shariatian, U. Simsekli et al.  
面向连续扩散语言模型提出分布匹配蒸馏，目标是在保持生成质量的同时显著减少网络评估次数，是并行文本生成效率优化的重要方向。

---

### 🤖 智能体与推理：规划、工具使用、多智能体、思维链

#### 6. [EvoDuet: Bilevel Co-Evolution of Web Searching and Task Solving for Scientific Discovery](http://arxiv.org/abs/2609.40340v1)  
**作者**：Y.-J. Lee, J. Baek, S. Jeong et al.  
提出让网页搜索策略与任务求解策略双层协同进化，解决 LLM 科学发现中外部知识检索停滞的问题，适合关注科研智能体的读者。

#### 7. [Cogentic: Multi-Agent Orchestration for Automated Proof Discovery](http://arxiv.org/abs/2609.40324v1)  
**作者**：Y. Cai, V. Gupta, Y. Jiang et al.  
构建面向开放数学问题的多智能体证明发现框架，通过并行探索、竞争假设和协同验证提升单次生成难以完成的证明搜索能力。

#### 8. [PivotOPD: Learning to Recover from Pivotal Mistakes in Multi-Turn Agents](http://arxiv.org/abs/2609.40285v1)  
**作者**：Y. He, Y. Chang, K. Bhardwaj et al.  
针对多轮智能体中早期关键错误导致后续状态偏移的问题，改进 on-policy distillation，使智能体学习从 pivotal mistakes 中恢复。

#### 9. [ComputerSD: Online Self-Distillation from Real-Time Feedback for Computer-Use Agents](http://arxiv.org/abs/2609.40253v1)  
**作者**：Y. Du, T. Chen, Z. Lu et al.  
面向计算机使用智能体提出基于实时反馈的在线自蒸馏，为 GUI 任务中的中间步骤提供更细粒度监督，补足稀疏结果奖励的不足。

#### 10. [Learning from Research: Toward Lifelong Agent Harness Evolution](http://arxiv.org/abs/2609.40169v1)  
**作者**：J. Yang, K.-H. Lai, X. Wang et al.  
探索在固定底层模型的情况下持续进化 agent harness，包括工具使用、记忆管理和执行策略，是智能体长期自我改进框架的代表性工作。

---

### 🔧 方法与框架：新技术、基准测试、效率优化

#### 11. [Cheap to Draw, Expensive to Trust: Certifying Test-Time Scaling Curves](http://arxiv.org/abs/2609.40190v1)  
**作者**：Sohail, S. Baichoo et al.  
研究 test-time scaling 曲线的统计可信性，提醒“多采样+验证器”带来的性能曲线虽易绘制但难以可靠外推，对评估大模型推理预算很关键。

#### 12. [cua-speedrun: Standardized Benchmarking of the Speed of Computer-Use Agents](http://arxiv.org/abs/2609.40284v1)  
**作者**：P. Aggarwal, L. K. Jang, S. Welleck et al.  
提出专门衡量计算机使用智能体执行速度的标准化基准，补充了以成功率为主的现有评估体系，推动 CUA 从“能做”走向“高效可用”。

#### 13. [Provably Tractable NFA-Constrained Language Generation via HMMs](http://arxiv.org/abs/2609.40185v1)  
**作者**：J. Sun, K. Meel  
将 NFA 约束语言生成转化为 HMM 形式并给出可处理性保证，在不显著扭曲语言模型分布的前提下提升硬约束生成的理论基础。

---

### 📊 应用：垂直领域、多模态、机器人、医疗

#### 14. [Ranking-Aware Prompt Optimization for Multimodal Clinical Diagnosis](http://arxiv.org/abs/2609.40361v1)  
**作者**：T. Xia, M. Liu, Y. Liang et al.  
面向类别极不均衡的临床诊断场景，提出排序感知的多模态提示优化，相比单纯准确率目标更贴合临床风险排序需求。

#### 15. [Removing Timing Shortcuts Improves Non-Invasive Brain-to-Text](http://arxiv.org/abs/2609.40359v1)  
**作者**：D. Jayalath, O. P. Jones  
发现非侵入式脑信号到文本解码中大量提升可能来自时间切分捷径而非脑数据本身，强调脑机接口评估中控制数据泄漏和伪相关的重要性。

#### 16. [SCB: SpeechConversationBench for Evaluating Multi-Turn Reasoning in Speech-to-Speech Models](http://arxiv.org/abs/2609.40198v1)  
**作者**：K. Vesessook, S. Ruangtanusak  
提出评估语音到语音模型多轮数学推理能力的基准，关注跨轮信息整合，补足现有语音模型偏单轮评测的缺口。

#### 17. [MemLife: Curating and Reasoning over Long-Term Egocentric Video Memories](http://arxiv.org/abs/2609.40195v1)  
**作者**：G. Xiong, X. Zhang, X. Yang et al.  
针对数百小时个人第一视角视频提出长期记忆管理和推理机制，为个性化 AI 助手处理长期生活记录提供可扩展方案。

#### 18. [PrefPI: Preference-Guided Steering into Out-of-Distribution Behaviors](http://arxiv.org/abs/2609.40165v1)  
**作者**：S. Rho, W. Kim, D. Xu et al.  
使用相对偏好迭代引导预训练机器人策略进入分布外行为区域，不只是强化已有模式，对机器人策略适应和探索具有启发意义。

---

## 3. 研究趋势信号

今日最明显的趋势是“智能体系统化”：多篇论文不再只优化底层模型，而是围绕 harness、在线自蒸馏、多智能体编排、搜索-求解协同、GUI 执行速度等系统层能力展开。与此同时，评估可信性成为新焦点，包括 test-time scaling 曲线认证、CUA 速度基准、语音多轮推理基准和脑机接口中的时间捷径排查。LLM 安全与数据问题也更加具体化：跨语言 unlearning 漏洞、AI 生成网页文本比例上升、RLVR 后提示敏感性都指向模型在真实部署环境中的稳健性挑战。机器人方向则强调从偏好、触觉、自博弈和历史轨迹中学习，正在从静态模仿走向交互式技能发现。

---

## 4. 值得精读

### 1. [How Much Is an AI Token Worth? Scaling Laws for Wild AI-Generated Web Text](http://arxiv.org/abs/2609.40295v1)  
AI 生成内容正在快速进入真实预训练语料，这篇论文直接量化其比例和训练价值，是理解未来数据供给、数据污染和模型退化风险的关键材料。

### 2. [Linguistic Loopholes in LLM Unlearning](http://arxiv.org/abs/2609.40286v1)  
跨语言 unlearning 是当前模型安全中的薄弱环节。该文覆盖 174 种语言，问题定义清晰，且与隐私、版权、合规场景高度相关，值得系统阅读。

### 3. [EvoDuet: Bilevel Co-Evolution of Web Searching and Task Solving for Scientific Discovery](http://arxiv.org/abs/2609.40340v1)  
科研智能体能否持续发现新知识，很大程度取决于检索与推理能否协同改进。该文将搜索策略和求解策略共同进化，是 agentic scientific discovery 方向中很有代表性的系统设计。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*