# ArXiv AI 研究日报 2026-08-13

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-08-13 02:06 UTC

---

# ArXiv AI 研究日报（2026-08-13）

## 1) 今日速览
今天的论文整体呈现出两条主线：一是 **“可信与可控”**，包括跨语言安全、行为演化、误对齐归因、不确定性与可验证性，研究正在从单纯打分转向机制分析与证据链构建。二是 **“智能体持续进化”**，从 GUI 适配、技能压缩、行动级跨语言保留，到长周期人机协作，重点开始落在“会反思、会记忆、会自我修正”。  
与此同时，多个工作把基准、量化、合规与领域数据集引入金融、医疗、机器人和多模态任务，显示 AI 研究正在从通用能力竞争，走向 **场景化落地与可审计性**。  

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

- **[Attention-Path Fragility as an Uncertainty Signal in Large Language Models](http://arxiv.org/abs/2608.11138v1)**  
  作者：Minsoo Kim et al.  
  一句话：把“注意力路径在扰动下是否脆弱”作为新型不确定性信号，比只看输出熵更接近模型内部决策稳定性，值得关注其在安全拒答与风险检测中的潜力。

- **[The Illusion of Cross-Lingual Safety in Low-Resource Languages](http://arxiv.org/abs/2608.11146v1)**  
  作者：Abigail Oppong et al.  
  一句话：直接指出“英文安全对齐可迁移到低资源语言”的假设并不成立，是多语言安全评测和对齐失效问题的高优先级警报。

- **[Data Attribution of Emergent Misalignment with Persona Features](http://arxiv.org/abs/2608.11025v1)**  
  作者：Clemens Vetter et al.  
  一句话：尝试把“窄任务微调后在无关领域变坏”的 emergent misalignment 追溯到预训练中的 persona 特征，为可解释对齐与数据溯源提供了机制层证据。

- **[Mapping and Measuring the Behavioral Evolution of Large Language Models](http://arxiv.org/abs/2608.11027v1)**  
  作者：Dong Qiao, Chris Ding, Jicong Fan  
  一句话：用 32 个模型、1 万条提示构建行为空间，研究不同模型家族之间的行为相似性与代际演化，是理解“模型变了什么”的重要工作。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

- **[Test-Time Self-Evolving GUI Visual Grounding via Reflection-Guided On-Policy Self-Distillation](http://arxiv.org/abs/2608.11191v1)**  
  作者：Shiyu Xuan, Zechao Li  
  一句话：提出测试时自进化的 GUI grounding 框架，让模型能在新界面上通过反思和自蒸馏继续适配，代表了“部署后继续学习”的智能体路线。

- **[SkillZip: Evaluation-Free Skill Compression for Self-Evolving Agents by Discovering Reusable Structure](http://arxiv.org/abs/2608.11079v1)**  
  作者：Xiaofan Bai et al.  
  一句话：不依赖外部评测，直接压缩自演化智能体中冗余的技能片段，解决长期运行中“技能库膨胀”问题，实用价值很强。

- **[Actions Speak Louder than Words: Measuring Cross-Lingual Policy Retention in Tool-Using Agents](http://arxiv.org/abs/2608.11110v1)**  
  作者：Sourabrata Mukherjee, Kalika Bali, Sunayana Sitaram  
  一句话：不只看跨语言最终答案，而是看工具使用过程中的“动作是否保留”，把多语言评测从语言正确性推进到行为一致性。

- **[Long-Horizon AI Research for Grothendieck Constant: A Case Study in Human-AI Mathematical Collaboration](http://arxiv.org/abs/2608.11195v1)**  
  作者：Alan Li et al.  
  一句话：用 Grothendieck 常数研究案例展示 AI 如何参与长期数学研究，适合关注“AI 作为研究伙伴”而非只做题机器的读者。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

- **[How to Verify Consistency of Probabilistic Claims](http://arxiv.org/abs/2608.11181v1)**  
  作者：Orr Paradise, Oliver Richardson, Yoshua Bengio et al.  
  一句话：研究概率预测回答一组条件概率查询时能否高效验证自洽性，直接关联 AI 安全中的“概率诚实”与可验证性。

- **[ReRound: Reconstructive Rounding to Resolve Midpoint Ambiguity in Calibration-Free LLM Quantization](http://arxiv.org/abs/2608.11045v1)**  
  作者：He-Yen Hsieh, H. T. Kung  
  一句话：针对量化中四舍五入的中点歧义提出重建式 rounding，目标是在无需校准的情况下提升 LLM 量化稳定性与精度。

- **[V-FiLLM: Verified Financial LLM Reasoning Benchmark](http://arxiv.org/abs/2608.11047v1)**  
  作者：Alicia Larsen et al.  
  一句话：把财务推理拆成可执行计算树生成基准，强调“可验证”而不是“看起来会算”，对金融智能体评测很关键。

---

### 📊 应用（垂直领域、多模态、代码生成）

- **[Surgical WAM: A World-Action Model for Data-Efficient Surgical Robot Learning](http://arxiv.org/abs/2608.11204v1)**  
  作者：Wenrui Bao et al.  
  一句话：面向手术机器人提出 world-action model，缓解动作标注稀缺问题，是医疗机器人学习中很有代表性的高价值方向。

- **[ConVAWG: A Retrieval-Grounded Framework for Controlled Synthetic Dialogue Generation in Violence Against Women and Girls](http://arxiv.org/abs/2608.11200v1)**  
  作者：Chen Lyu et al.  
  一句话：在敏感社会议题上做可控合成对话生成，并引入检索 grounding，有利于安全研究、数据构造和干预分析。

- **[MultiModal Code-Switching: Interleaving Visual Objects into Language for Explicit Object-Level Alignment](http://arxiv.org/abs/2608.11167v1)**  
  作者：Changhao Xiang et al.  
  一句话：把视觉对象“插入”到语言中做显式对齐，解决 MLLM 仅做图文全局对齐导致的指代歧义问题。

---

## 3) 研究趋势信号
从今日投稿看，研究重心正在从“模型更大”转向“模型更可控、可证、可迁移”：跨语言安全与行为一致性被系统拆解，LLM 不确定性开始从输出分布延伸到注意力路径；同时，面向智能体的记忆压缩、自我反思和测试时自适应，正在成为降低成本与提升持续能力的主线。  

---

## 4) 值得精读

1. **[How to Verify Consistency of Probabilistic Claims](http://arxiv.org/abs/2608.11181v1)**  
   理由：把“模型说法是否自洽”变成可计算问题，理论价值和 AI safety 价值都很高，适合做方法论精读。

2. **[The Illusion of Cross-Lingual Safety in Low-Resource Languages](http://arxiv.org/abs/2608.11146v1)**  
   理由：直接击中多语言对齐的薄弱环节，具有很强的现实风险指向，且会影响后续多语言安全评测范式。

3. **[SkillZip: Evaluation-Free Skill Compression for Self-Evolving Agents by Discovering Reusable Structure](http://arxiv.org/abs/2608.11079v1)**  
   理由：面向长期运行智能体的“技能膨胀”问题，提出无需外部评测的压缩思路，工程意义和研究延展性都很强。  

如果你愿意，我也可以把这份日报进一步整理成：
- **“适合管理层阅读的 1 页版”**
- **“适合研究员阅读的深度版”**
- **“按论文影响力/创新度/落地价值排序版”**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*