# ArXiv AI 研究日报 2026-07-31

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-07-31 02:56 UTC

---

# ArXiv AI 研究日报（2026-07-31）

## 1) 今日速览
今天的论文明显呈现出三条主线：**Agent 走向真实工作流**、**评估/审计变得更严格**、以及**推理与推理成本的自适应优化**。  
在智能体方向，出现了面向 oncall、GUI、代码迁移、交易执行、科学检索等更接近生产环境的任务与基准。  
在方法层面，研究者开始强调“少想、多采样”“按需分配测试时计算”“记忆不是简单回放”等更务实的效率路线。  
同时，系统提示审计、奖励模型标准化、偏见定位、belief update fidelity 等工作也显示：模型能力之外，**可信性与可验证性**正成为主战场。  

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）
1. **[AISPA: User-Centric System Prompt Auditing for Large Language Model Applications](http://arxiv.org/abs/2607.28617v1)**  
   作者：Lin, Zhu, Yang et al.  
   一句话：提出面向用户与监管的系统提示审计框架，直击商用 LLM“不可见提示词”带来的透明性与责任问题。

2. **[OSReward: Instituting Standardized Evaluation for Cross-Platform Computer-Use Reward Models](http://arxiv.org/abs/2607.28609v1)**  
   作者：Sun, Cheng, Wang et al.  
   一句话：为 computer-use reward model 建立跨平台标准化评测，补齐 CUA 训练和 RL 过程中“奖励是否可靠”的关键缺口。

3. **[Sample More, Reflect Less: Self-Refine and Reflexion Lose to Repeated Sampling at Equal Token Cost, from 1.5B to 7B](http://arxiv.org/abs/2607.28576v1)**  
   作者：Mirzaei  
   一句话：在等 token 成本下，重复采样往往比自我反思/自我修订更有效，给“长思维链一定更强”泼了一盆冷水。

4. **[WIDE: Boosting Adaptive LLM Inference via Token-level Dynamic Width Pruning](http://arxiv.org/abs/2607.28418v1)**  
   作者：Hu, Wu, Yin et al.  
   一句话：通过 token 级动态宽度剪枝做自适应推理，在保精度的同时提升效率，是面向部署的实用路线。

5. **[LLMs struggle to simulate human belief updates in controlled environments](http://arxiv.org/abs/2607.28347v1)**  
   作者：Pohl, Mehta, Mambayil et al.  
   一句话：验证 LLM 作为人类实验代理时在 belief update 上的局限，提醒研究者不要把“像人回答”误当“像人推理”。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）
6. **[ORCA-bench: How Ready Are Language Model Agents for Oncall?](http://arxiv.org/abs/2607.28545v1)**  
   作者：Gong, Choi, Agarwal et al.  
   一句话：把 LLM agent 放进真实 oncall RCA 场景评测，检验其能否处理噪声日志、指标与代码之间的复杂归因。

7. **[Frontis-MA1: Training an AI4AI Model towards Recursive Self-Improvement in Machine Learning Engineering](http://arxiv.org/abs/2607.28568v1)**  
   作者：Yang, Jiang, Fu et al.  
   一句话：把机器学习工程作为 RSI 的可执行测试床，探索“模型改进模型开发过程”的闭环能力。

8. **[One Human, N Agents: Audit-Budget Allocation for LLM Agent Fleets under Miscalibrated, Correlated Confidence](http://arxiv.org/abs/2607.28317v1)**  
   作者：Zavattari, Tommasi, Prencipe  
   一句话：研究单人审计大量 agent 时如何分配有限预算，聚焦相关错误与置信度失准下的安全治理。

9. **[Can Large Language Models Execute Parent Orders?](http://arxiv.org/abs/2607.28410v1)**  
   作者：Shen, Xu, Zhang et al.  
   一句话：将 LLM 引入大单拆分执行场景，考察其在算法交易中的决策、执行与成本控制能力。

10. **[Qwen-UI-Agent Technical Report: Toward Next-Generation Real-World Centric Foundation GUI Agents](http://arxiv.org/abs/2607.28227v1)**  
   作者：Zhou, Tong, Zhang et al.  
   一句话：面向真实设备与跨平台工作流的 GUI agent 技术报告，强调长任务、CLI+GUI 协同和可执行性。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）
11. **[Change2Task: From Repository Changes to Executable Coding Agent Tasks and Environments](http://arxiv.org/abs/2607.28591v1)**  
   作者：Qi, Wang, Gao et al.  
   一句话：把仓库变更自动转成可执行编码任务与环境，为 coding agent 提供持续、真实、可验证的数据供给。

12. **[GLM-RAG: Graph Language Models for Graph-Based Retrieval-Augmented Generation](http://arxiv.org/abs/2607.28397v1)**  
   作者：Arseven, Frank, Egressy et al.  
   一句话：将图结构与语义检索融合到 RAG 中，提升知识图谱上的多跳检索与生成能力。

13. **[MemHarness: Memory Is Reconstructed, Not Replayed](http://arxiv.org/abs/2607.28272v1)**  
   作者：Wu, Fu, Wen et al.  
   一句话：指出 agent 记忆不应机械回放，而应根据当前语境重建，这是面向长期交互的重要设计原则。

14. **[Stage-Replay Divergence Follows the KV Cache: Fixed-Prefix Precision Controls and Bidirectional Cache Transplantation](http://arxiv.org/abs/2607.28495v1)**  
   作者：Lorup  
   一句话：从 KV cache 角度解释阶段回放偏差，为调试推理轨迹与缓存一致性提供了底层诊断工具。

---

### 📊 应用（垂直领域、多模态、代码生成）
15. **[AskChem: Claim-Centered Infrastructure for Chemistry Literature Synthesis](http://arxiv.org/abs/2607.28618v1)**  
   作者：Yan, Wolfe, Martiniani et al.  
   一句话：把化学文献综合从“搜论文”推进到“按 claim 聚合证据”，很适合 AI for Science 场景。

16. **[Improving Mental Health Screening and Early Risk Detection in Spanish](http://arxiv.org/abs/2607.28476v1)**  
   作者：Casamayor-Segarra, Ahuir, Molina-Marco et al.  
   一句话：面向西班牙语心理健康早筛，结合基础模型与长时间线社媒分析，兼顾语言资源与临床需求。

17. **[PathView-Bench: Can Multimodal Large Language Models Achieve Fine-grained Multiscale Understanding of Pathology Images?](http://arxiv.org/abs/2607.28318v1)**  
   作者：Chen, Liang, Lin et al.  
   一句话：不是只看诊断答案，而是测多尺度病理理解能力，推动医学多模态评测从“结果对不对”走向“过程懂不懂”。

18. **[EMBL AI Librarian: Life-Sciences Knowledge Layer for AI Agents](http://arxiv.org/abs/2607.28229v1)**  
   作者：Sigillo, Silvestri, Tabaro et al.  
   一句话：为生命科学 agent 构建知识层与文献接入能力，体现“领域知识基础设施”正在成为 agent 的刚需。

---

## 3) 研究趋势信号
今天的投稿从“模型会不会回答”转向“系统能否可靠执行、审计和持续学习”。一方面，oncall、GUI、代码迁移、交易和科研检索等真实场景 benchmark 激增；另一方面，系统提示审计、奖励模型标准化、偏见定位、belief update 评测等工作强化了可信性。效率优化则更偏向按需推理、动态剪枝、缓存与记忆重建。

---

## 4) 值得精读
1. **[ORCA-bench: How Ready Are Language Model Agents for Oncall?](http://arxiv.org/abs/2607.28545v1)**  
   理由：这是少见的“真实生产级” agent 评测，问题定义清晰，能直接反映 LLM agent 离实用还有多远。

2. **[AISPA: User-Centric System Prompt Auditing for Large Language Model Applications](http://arxiv.org/abs/2607.28617v1)**  
   理由：系统提示是商用 LLM 的核心控制面，但长期缺乏审计方法；这篇对治理、合规和透明度都很关键。

3. **[Sample More, Reflect Less: Self-Refine and Reflexion Lose to Repeated Sampling at Equal Token Cost, from 1.5B to 7B](http://arxiv.org/abs/2607.28576v1)**  
   理由：结论直接、争议性强，对后续“推理时扩展”的方法选择有现实影响，适合细读实验设计。

如果你愿意，我还可以把这份日报进一步整理成：  
- **适合发公众号/周报的精简版**  
- **按“研究机构/产业价值/论文影响力”打分版**  
- **中英双语版**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*