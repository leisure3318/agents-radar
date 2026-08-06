# ArXiv AI 研究日报 2026-08-06

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-08-06 00:58 UTC

---

# ArXiv AI 研究日报

## 1) 今日速览
今天的论文明显围绕三个主线展开：**推理时算力如何更聪明地花**、**智能体如何在工具与长期任务中更稳地学习**、以及**面向真实场景的评估与基准**。一批工作从 test-time scaling、KV cache 复用、动态采样等角度提升效率，说明“同样参数下更强推理”仍是主战场。另一批工作聚焦工具增强、反思式训练、技能持续演化，表明 LLM 正从“会答题”转向“会做事”。同时，社交预测、直播赛事、医疗影像、地理推理、OCR 等新基准密集出现，反映出社区正在从静态排行榜转向更贴近真实世界的能力测量。

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

- **[Test-Time Scaling in Reasoning LLMs: Inference Regimes, Evaluation, and Reproducibility](http://arxiv.org/abs/2608.04001v1)**  
  作者：Hariri et al.  
  一句话：系统梳理推理模型的测试时扩展范式、评估方式与可复现性问题，是理解“推理时加算力”最重要的综述型工作之一。

- **[When Attention Goes Blind: Numerical Failure in ALiBi Positional Encodings](http://arxiv.org/abs/2608.03994v1)**  
  作者：Schröder et al.  
  一句话：揭示 ALiBi 因浮点下溢导致注意力权重大面积失效的数值 bug，对长上下文模型的稳定性非常关键。

- **[Cross-Model KV Cache Transfer in LLM Families: A Closed-Form Linear Mapping for Prefill Reuse](http://arxiv.org/abs/2608.03893v1)**  
  作者：Heo et al.  
  一句话：提出模型家族间 KV cache 迁移的闭式线性映射，可直接减少换模、路由和级联推理的 prefill 成本。

- **[ReflectRL: Learning from Golden Negative Trajectories via Reflective-to-Direct Reasoning](http://arxiv.org/abs/2608.03972v1)**  
  作者：Bi et al.  
  一句话：用“强模型失败轨迹”进行反思式训练，解决专家也会错时监督信号不足的问题，适合关注 RL 后训练的人读。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

- **[TurnSight: Turn-Level Hindsight Self-Distillation for Tool-Integrated Reasoning](http://arxiv.org/abs/2608.04007v1)**  
  作者：Qu et al.  
  一句话：把工具交互拆到 turn 级别做 hindsight 蒸馏，改善长链路任务中的细粒度信用分配。

- **[SocietyBench: Forecasting Counterfactual Social-World Evolution](http://arxiv.org/abs/2608.04009v1)**  
  作者：Wang et al.  
  一句话：把“社会世界如何演化”变成可评测任务，补上 LLM 在社会预测与反事实推演上的空白。

- **[WorldCup Arena: Prospective, Leakage-Free Evaluation of Frontier LLMs on a Live Tournament](http://arxiv.org/abs/2608.04008v1)**  
  作者：Wang et al.  
  一句话：用世界杯直播赛事做前瞻式、无泄漏评测，方法论上比传统回溯式 benchmark 更可信。

- **[ContinualSkillBench: Can LLM Agents Truly Evolve Their Capabilities?](http://arxiv.org/abs/2608.03874v1)**  
  作者：Guan et al.  
  一句话：直接检验智能体是否能持续积累并复用技能，是“长期自治 agent”能力评估的重要基准。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

- **[Interpretable Adaptive Sampling for LLM Test-Time Scaling](http://arxiv.org/abs/2608.03961v1)**  
  作者：Kashaniyan, Jannesari  
  一句话：让测试时采样预算随题目难度自适应分配，并解释为何要多采样，兼顾效率与可解释性。

- **[SciRet: A Compute-Aware Empirical Study of Retrieval and Reranking for Scientific RAG](http://arxiv.org/abs/2608.03860v1)**  
  作者：Anas Apurba et al.  
  一句话：不是再造模型，而是系统比较科学 RAG 中检索、重排与算力规模的性价比，很适合做工程参考。

- **[ADMITBench: A Safety-Governed Reference Framework for Evaluating the Admissibility of Industrial LLM Advisories](http://arxiv.org/abs/2608.03866v1)**  
  作者：Misra et al.  
  一句话：面向工业建议的安全治理型评测框架，强调“建议是否可采纳”而非仅仅“答得像不像”。

---

### 📊 应用（垂直领域、多模态、代码生成）

- **[Video-DeepResearch: Towards the Next-Generation Multimodal Deepresearch Agent](http://arxiv.org/abs/2608.03979v1)**  
  作者：Fang et al.  
  一句话：把多模态深度研究智能体从静态图像推进到长视频流，针对时空定位与开放网页探索的结合做了新尝试。

- **[CARE-X: Towards Clinically Useful Radiology VLMs with Auxiliary Supervision, Reward-Aligned Learning, and Tool-Augmented Measurement](http://arxiv.org/abs/2608.03890v1)**  
  作者：Ranjit et al.  
  一句话：面向胸片临床可用性，兼顾分类、定位与测量，体现医疗 VLM 正从“会描述”走向“可用”。

- **[MultiGlobeQA: A Multilingual and Globally Diverse Benchmark for Geospatial Reasoning](http://arxiv.org/abs/2608.03882v1)**  
  作者：Böckling et al.  
  一句话：覆盖多语言与全球地理场景，专门测 LLM 的距离、包含关系与空间推理能力。

- **[Can Large Language Models Recover Semantic Optimization Opportunities That Compilers Miss?](http://arxiv.org/abs/2608.03983v1)**  
  作者：Jiang et al.  
  一句话：探索 LLM 是否能从 C/C++ 上下文中恢复编译器漏掉的优化语义，是“AI for systems”方向的代表性问题。

- **[BanglaWild: An In-the-Wild Bengali Scene Text Recognition Benchmark for OCR and Vision-Language Models](http://arxiv.org/abs/2608.03884v1)**  
  作者：Shiper et al.  
  一句话：补齐孟加拉语自然场景文字识别的真实世界评测，适合关注低资源语言与 OCR/VLM 交叉的人。

---

## 3) 研究趋势信号
今天的投稿显示，LLM 研究正从“参数规模竞争”转向“**计算分配、推理效率和评测可信度**”三件事：一边是 test-time scaling、KV cache 复用、动态采样等效率方法，另一边是漏泄评测、社会预测、直播赛事等更难作弊的基准。同时，工具使用、技能持续演化、反思式训练等工作说明智能体研究开始重视**长期行为改进**而非单轮正确率。多模态与垂直行业应用也在加速落地，尤其医疗、视频、OCR 与代码优化场景最活跃。

---

## 4) 值得精读
1. **[Test-Time Scaling in Reasoning LLMs: Inference Regimes, Evaluation, and Reproducibility](http://arxiv.org/abs/2608.04001v1)**  
   理由：它不是单点技巧，而是对整个 test-time scaling 生态的系统整理，适合把握领域共识与坑点。

2. **[TurnSight: Turn-Level Hindsight Self-Distillation for Tool-Integrated Reasoning](http://arxiv.org/abs/2608.04007v1)**  
   理由：工具调用型智能体的核心难题就是信用分配，这篇正好打在问题中心，方法也具有较强可迁移性。

3. **[Video-DeepResearch: Towards the Next-Generation Multimodal Deepresearch Agent](http://arxiv.org/abs/2608.03979v1)**  
   理由：把“研究型 agent”扩展到长视频，是一个很有代表性的多模态 agent 新方向，值得关注其任务设计与失败模式。

如果你愿意，我还可以把这份日报进一步整理成：
- **适合公众号发布的版式**
- **适合团队周会的 PPT 提纲**
- **按“论文重要性 + 研究方向”打分的排行榜**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*