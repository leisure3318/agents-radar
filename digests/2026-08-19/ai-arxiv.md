# ArXiv AI 研究日报 2026-08-19

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-08-19 01:19 UTC

---

# ArXiv AI 研究日报  
**日期：2026-08-19**  
来源：cs.AI / cs.CL / cs.LG 为主的 50 篇最新论文

---

## 1) 今日速览
今天的投稿明显集中在三个方向：**长上下文/记忆机制**、**智能体可靠性与安全**、以及**面向真实场景的可验证评估**。一类工作在解决“模型会做，但做不稳”的问题，比如机器人长程操控、Embodied Agent 攻击面、代码多智能体协作与 RL 训练。另一类工作则在补齐 AI 系统的“可信链路”，包括可审计的合规检测、计算溯源、RAG 证据约束和解释评测。与此同时，医疗、金融、推荐、可持续航运等垂直应用继续推进，显示出 AI 研究正在从通用能力扩展到**可部署、可解释、可治理**的系统能力。

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

1. **[Model Hypnosis: Strong control of AI via additive subliminal effects](http://arxiv.org/abs/2608.16834v1)**  
   作者：Boix-Adserà、Tessler  
   一句话：揭示多个看似微弱的提示线索可叠加成强控制信号，说明 LLM 对“隐性提示操纵”远比预期脆弱，直接关联提示安全与对齐评估。

2. **[Would this change your answer? Evaluating Explanations of LLM Behavior In The Wild with Counterfactual Experiments](http://arxiv.org/abs/2608.16747v1)**  
   作者：Karvonen、Ong、Kantamneni 等  
   一句话：用反事实实验检验解释是否真正“可模拟模型行为”，把解释质量从主观打分推进到更接近可证伪的评估。

3. **[Policy Iteration with Human Feedback: Bringing Post-Training RL to In-context Learning](http://arxiv.org/abs/2608.16831v1)**  
   作者：Nguyen、Shyr  
   一句话：把后训练 RL 的迭代思想搬到 in-context learning 设定，尝试让“无需改权重”的模型也能通过反馈持续改进行为。

4. **[Semantic Bandits: In-Context Exploration-Exploitation is Biased by Semantic Priors](http://arxiv.org/abs/2608.16707v1)**  
   作者：Austin、Suleman、Cheung  
   一句话：指出 LLM 在探索-利用上并不“中性”，语义先验会系统性偏置决策，为用 LLM 做决策代理提供了重要认知修正。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

5. **[Don't Drop the BATON: Long-Horizon Robot Manipulation via Agentic Subtask Exploration and Transition-aware Memory](http://arxiv.org/abs/2608.16889v1)**  
   作者：Xu、Shang、Ferrara  
   一句话：面向长程机器人操作，引入子任务探索与“迁移感知记忆”，核心在于降低错误级联，提升多阶段任务的可持续执行能力。

6. **[When State Becomes an Attack Surface: State-Semantic Injection in LLM-Driven Embodied Agents](http://arxiv.org/abs/2608.16806v1)**  
   作者：Liu、Guo、Zhang 等  
   一句话：首次系统讨论“状态语义注入”作为 embodied agent 的攻击面，说明智能体不只会被文本提示攻击，也会被环境状态诱导。

7. **[TDD-Agent: Test-Driven Reasoning for Code Generation](http://arxiv.org/abs/2608.16742v1)**  
   作者：Yu、Li、Li 等  
   一句话：把测试驱动开发思想融入代码生成，让测试不只是事后验证，而是前置引导推理与实现，对 repo-level coding 很实用。

8. **[When Agents Coordinate: Measuring Coordination in Multi-Agent AI Coding](http://arxiv.org/abs/2608.16801v1)**  
   作者：Destefanis、Aste  
   一句话：提出量化多 AI 编码代理协作的指标，补上“任务完成率之外的团队过程评估”，对多智能体系统研究很关键。

9. **[Neurosymbolic Embodied Agents](http://arxiv.org/abs/2608.16794v1)**  
   作者：Albinhassan、Feng、Russo 等  
   一句话：用神经-符号混合方式提升 household task 的可执行性，重点解决“会规划但不一定能落地”的 embodied 任务难题。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

10. **[Proteus: Incremental Memory Activation for Long-Context Sequence Modeling](http://arxiv.org/abs/2608.16844v1)**  
    作者：Bayat、Behrouz、Mirrokni 等  
    一句话：提出增量式记忆激活机制，针对长上下文建模中“早期 token 过早被压缩/遗忘”的问题，兼顾效率与信息保留。

11. **[GRIP: Grounded Reasoning via Information-Restricted Premises](http://arxiv.org/abs/2608.16776v1)**  
    作者：Teng  
    一句话：通过限制输入信息来抑制 query dominance，让 RAG 更依赖证据而非问题本身，是提升 grounded reasoning 的直接方法。

12. **[CaliBench: Are the Stochastic Dynamics of Video World Models Physically Calibrated?](http://arxiv.org/abs/2608.16829v1)**  
    作者：Sadeghi、Seidenschwarz、Allardice 等  
    一句话：从“单次生成准不准”推进到“随机动态是否物理校准”，为视频世界模型提供更细粒度、物理感知的评测框架。

13. **[What Do Compliance Detectors Read? An Audit of Activation Probes and Guard Models](http://arxiv.org/abs/2608.16852v1)**  
    作者：Sadhu、Sengupta、Sankarapu 等  
    一句话：审计合规检测器到底“看见了什么”，非常适合做企业级 LLM 审计与监管对齐的基础研究。

14. **[Towards Computational Provenance: Carrying Causal-State Evidence in Generated Text](http://arxiv.org/abs/2608.16868v1)**  
    作者：Belay  
    一句话：探索生成文本能否携带内部因果状态的可检测证据，为“输出可追溯”打开新方向。

---

### 📊 应用（垂直领域、多模态、代码生成）

15. **[MIRROR: Multimodal Intelligent Radiology Reasoning and Observation Reporter](http://arxiv.org/abs/2608.16709v1)**  
    作者：Nagarajan、Venkatapathy  
    一句话：把诊断分类与自然语言报告分离，减少“报告生成时偷加模型没说过的信息”，对医学多模态部署很重要。

16. **[LAVA: Logic-Aware Validation and Augmentation Framework for Large-Scale Financial Document Auditing](http://arxiv.org/abs/2608.16763v1)**  
    作者：Shu、Wang、Wang 等  
    一句话：面向薪资、税务、贷款审计等金融文档，强调逻辑校验与增强，适合企业级高准确率流程。

17. **[zLend: A Dual-Scope Cash-Flow Reconstruction Framework for On-Chain Credit Underwriting](http://arxiv.org/abs/2608.16856v1)**  
    作者：Girish G N、Sahoo、SP 等  
    一句话：将链上行为重建为现金流画像，用于去中心化信贷风控，体现 AI 在金融基础设施中的实战落地。

18. **[Cross-Sign Language Transfer Learning Using Domain Adaptation with Multi-scale Temporal Alignment](http://arxiv.org/abs/2608.16804v1)**  
    作者：Artiaga、Li、Kuruoglu 等  
    一句话：针对手语资源稀缺问题做跨手语迁移，具有很强的社会价值和低资源学习意义。

---

## 3) 研究趋势信号
今天的论文显示，AI 研究正从“单模型能力提升”转向“**系统级可靠性工程**”：一方面，长上下文记忆、RAG 证据约束、解释反事实评估、合规审计等工作在加强可控性；另一方面，机器人、代码智能体、金融审计、医疗报告等应用场景开始重视执行闭环与错误传播。另一个明显趋势是：**智能体安全**成为新热点，攻击不再只针对输入文本，而是延伸到状态、记忆、协调过程与输出溯源。

---

## 4) 值得精读

1. **[Model Hypnosis: Strong control of AI via additive subliminal effects](http://arxiv.org/abs/2608.16834v1)**  
   理由：它直接触碰提示安全与行为可操纵性的底层问题，结论可能对对齐、红队测试和提示防护都有广泛影响。

2. **[Don't Drop the BATON: Long-Horizon Robot Manipulation via Agentic Subtask Exploration and Transition-aware Memory](http://arxiv.org/abs/2608.16889v1)**  
   理由：长程机器人任务是 VLA/embodied AI 的核心难点，这篇很可能代表了“从单步技能到多阶段执行”的关键推进。

3. **[GRIP: Grounded Reasoning via Information-Restricted Premises](http://arxiv.org/abs/2608.16776v1)**  
   理由：RAG 里“查询压过证据”是普遍痛点，这篇提供了一个简洁而可操作的修正思路，适合关注检索增强与可信推理的人精读。

---

如果你愿意，我还可以把这份日报进一步整理成：
- **适合发公众号的精简版**
- **适合发团队群的 1 页摘要版**
- **按“机器人 / LLM / 安全 / 医疗金融”单独拆分的版本**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*