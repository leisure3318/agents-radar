# ArXiv AI 研究日报 2026-11-26

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-11-26 05:25 UTC

---

# ArXiv AI 研究日报
**2026 年 11 月 26 日｜LLM 架构、智能体训练与可信评估**

> 本报基于所提供的 50 篇论文标题及摘要节选整理，论文发布日期均为 11 月 25 日；未核验全文，以下重点区分研究主张与已知信息，不补充未提供的实验结论。

## 一、今日速览

今日值得关注的主线，是**在不单纯扩大参数规模的前提下，提高模型的计算利用率与推理能力**：循环 Transformer、循环 MoE 与长上下文推测解码分别探索参数复用和推理效率。智能体训练则聚焦“困难任务没有成功轨迹”的瓶颈，尝试通过多样化推理路径与局部技能接入获得学习信号。评估研究开始审视测试本身的有效性：监控器表现可能受攻击策略选择影响，模型路由也应先验证是否存在可利用的任务差异。应用侧，代码智能体的视觉推理、补丁冗余归因和病理模型的生物学表征评估，体现了从“任务分数”走向“能力机制与实际价值”的趋势。

## 二、重点论文

### 🧠 大语言模型｜架构、训练与理论

#### 1. [Mixture-of-Loops Transformer](http://arxiv.org/abs/2611.34923v1)
**作者：** L. Zhu、S. Wang、X. Wang 等  
**核心贡献与关注点：** 围绕循环 Transformer 中“相邻循环应传递什么”重新设计机制，探索共享参数条件下表达能力与计算效率的更优平衡，值得关注其是否能改善循环架构的实际效益。

#### 2. [LoopTitan: What Does Parameter Revisit Buy a Mixture-of-Experts?](http://arxiv.org/abs/2611.34821v1)
**作者：** Z. Tian、Y. Lu、X. Wu 等  
**核心贡献与关注点：** 审视循环 MoE 在参数量、FLOPs 和 KV 缓存等匹配预算下的收益，关键价值在于厘清性能提升究竟来自参数重复访问，还是比较设置中的其他因素。

#### 3. [Tokenisation is not in APX](http://arxiv.org/abs/2611.34938v1)
**作者：** V. Kastreva、P. Whittington、D. Komm 等  
**核心贡献与关注点：** 在论文所定义的分词优化问题中，证明除非 P=NP，否则不存在任意常数因子的多项式时间近似算法，为理解分词器优化的理论边界提供依据，但不意味着实际启发式方法无效。

### 🤖 智能体与推理｜训练信号、长程任务与记忆

#### 4. [Diverse Alternative Reasoning Traces for Hard Math Problems](http://arxiv.org/abs/2611.34928v1)
**作者：** L. Aichberger、A. Golinski、A. Blaas 等  
**核心贡献与关注点：** 针对困难数学题中独立采样难以获得正确轨迹的问题，提出多样化替代推理轨迹方法，关注点是能否更有效地获取可验证、可用于后训练的数据。

#### 5. [When Every Rollout Fails: Splicing Learner-Conditioned Options into Long-Horizon Agent RL](http://arxiv.org/abs/2611.34777v1)
**作者：** H. Hou、Y. Liu、Z. Huang 等  
**核心贡献与关注点：** 面向长程智能体任务中整组轨迹均失败、组相对方法缺少奖励学习信号的困境，探索接入以学习者为条件的选项策略，为稀疏奖励训练提供不同于完整示范的干预路径。

#### 6. [TASK Memory: Beyond Text-Only Memory with Activation Steering and Knowledge Editing against Memory Hallucination](http://arxiv.org/abs/2611.34762v1)
**作者：** J. Zhao、W. Wu  
**核心贡献与关注点：** 将“检索到正确记忆却仍误用或违背记忆”定义为使用阶段的记忆幻觉，并结合激活引导与知识编辑加以处理，强调智能体记忆可靠性不止取决于检索质量。

### 🔧 方法与框架｜评估有效性、推理效率与生成机制

#### 7. [Attack Policy Selection can Mislead Monitor Evaluators](http://arxiv.org/abs/2611.34934v1)
**作者：** C. Griffin、O. Makins、A. C. Stickland 等  
**核心贡献与关注点：** 以一个曾用于生产环境的 OpenAI 监控器为案例，研究攻击策略选择如何影响漏报率评估，提醒安全测试必须说明攻击分布，而不能孤立解读单一指标。

#### 8. [Routeability Before Routing: Routeability Audit Protocol (RAP) and RouteabilityBench for Audited LLM Model Selection](http://arxiv.org/abs/2611.34825v1)
**作者：** Y. Lu、D. Kjorvezir、A. Gjorgjevikj 等  
**核心贡献与关注点：** 提出在训练路由器之前先审计基准的“可路由性”，检验不同模型是否确实在不同提示上各有优势，避免把缺少可利用差异的数据集当作有效路由测试。

#### 9. [DFly2: Turbocharging Long-Context Speculative Decoding by Sharing the Target's Sparsity](http://arxiv.org/abs/2611.34776v1)
**作者：** H. Liu、R. Cen、J. Shi 等  
**核心贡献与关注点：** 针对原生稀疏注意力模型的长上下文推测解码，探索让草稿模型共享目标模型的稀疏性，直指草稿侧独立上下文缓存带来的额外开销。

#### 10. [Guidance as Variance Matching](http://arxiv.org/abs/2611.34801v1)
**作者：** A. Backour、A. Lukoianov、F. Permenter 等  
**核心贡献与关注点：** 从方差匹配视角解释扩散模型引导，并指出常用引导尺度下的质量收益并非来自更准确的后验均值预测，为重新理解和设计引导机制提供切入点。

### 📊 应用｜视觉推理、代码与生物医学

#### 11. [Solve Vision with Code: Coding Agents Are Stronger Visual Reasoners Than Video Models](http://arxiv.org/abs/2611.34813v1)
**作者：** D. Luo、F. Yu、H. Zhang 等  
**核心贡献与关注点：** 将代码智能体与视频模型置于视觉推理任务中比较，提出代码工具路线可能更强的主张，值得检验其任务覆盖、工具条件与计算预算是否可比。

#### 12. [How Much Do Coding Agents Over-Edit, and Why? An Empirical Study of Unneeded Edits in Repository-Level Agent Patches](http://arxiv.org/abs/2611.34875v1)
**作者：** A. Goel、B. Steenhoek、Y. Hu  
**核心贡献与关注点：** 提出 Delta Residue Attribution，通过回放智能体轨迹追踪补丁修改的来源，将“补丁更大”与“修改不必要”分开分析，为代码智能体的可维护性评估提供更细粒度工具。

#### 13. [A gene informed benchmark for BioScoring of pathology foundation models](http://arxiv.org/abs/2611.34930v1)
**作者：** P. Vilars、V. Q.-H. Trinh、M. Vakalopoulou 等  
**核心贡献与关注点：** 提出基因信息驱动的 BioScore，评估病理基础模型表征中包含多少生物学信息，补充分类与检索成绩无法直接揭示的领域有效性。

## 三、研究趋势信号

今日投稿呈现三条信号：一是从增加参数转向复用计算，循环架构、稀疏推测解码共同追求更高预算效率；二是从追逐榜单转向审计评估前提，攻击策略、可路由性和补丁必要性成为研究对象；三是智能体可靠性的关注点正从“能否检索、能否成功”深入到“如何使用记忆、失败时如何学习”。这些工作提示，下一阶段的竞争可能更依赖训练信号质量、工具协同与可解释的失效分析，而非单一规模指标。

## 四、值得精读

### 1. [Attack Policy Selection can Mislead Monitor Evaluators](http://arxiv.org/abs/2611.34934v1)
**理由：** 对安全评估方法具有直接启发：监控器指标可能同时反映被测系统与攻击样本生成机制。精读应重点检查攻击策略的覆盖范围、选择流程，以及结论能否迁移到真实部署分布。

### 2. [When Every Rollout Fails](http://arxiv.org/abs/2611.34777v1)
**理由：** 切中长程智能体强化学习的关键瓶颈。建议关注局部策略如何选取和接入、额外监督成本多大，以及撤去辅助后模型能否独立完成任务。

### 3. [LoopTitan](http://arxiv.org/abs/2611.34821v1)
**理由：** 参数复用架构是否真正划算，需要严格的预算对照。适合与 **Mixture-of-Loops Transformer** 对读，重点比较有效深度、实际延迟、训练成本及消融设计，而不只看参数量与理论 FLOPs。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*