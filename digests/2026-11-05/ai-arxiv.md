# ArXiv AI 研究日报 2026-11-05

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 26 篇论文 | 生成时间: 2026-11-05 03:42 UTC

---

# ArXiv AI 研究日报
**2026 年 11 月 5 日｜覆盖 26 篇论文，投稿日期为 11 月 3—4 日**

> 本报基于所提供的标题与摘要节选整理，未核验全文；以下重点关注研究问题与方法贡献，不将摘要中的主张视为已充分验证的结论。重点解读 14 篇，其余 12 篇附链接索引。

## 一、今日速览

今日最鲜明的主线是：**从“模型能否完成任务”转向“如何可靠、经济地完成任务”**，涉及推理计算控制、人类咨询、主动记忆与真实协作评测。MoE 研究同时关注专家剪枝、停用后的权重处理，以及路由与推理行为之间的联系，体现出对部署成本和行为可控性的双重重视。评估研究开始审视工具型裁判的确认偏差、多裁判聚合的可靠性，以及基线信息不对称造成的虚假优势。应用侧则出现电力系统规划、真实自由职业任务预测和保守式 OCR 纠错等方向，但仅凭摘要尚不能判断其实际部署成熟度。

## 二、重点论文

### 🧠 大语言模型：架构与可信评估

**1. [Matching the Training-Time Weight Rule in Inference-Time Expert Deactivation](http://arxiv.org/abs/2611.05804v1)**  
**作者：** H. Cheng, Z. Yang, B. Ma 等  
**核心贡献与关注价值：** 在相同专家停用集合下比较移除、冻结、剩余专家权重重归一化及不归一化重路由，提醒研究者：专家停用的效果不仅取决于“停用谁”，也取决于权重规则如何实现。

**2. [Grounded but Not Immune: Confirmation Bias in Agent-as-a-judge](http://arxiv.org/abs/2611.05662v1)**  
**作者：** D. B. Brown, K. Pahwa, Y. Ge 等  
**核心贡献与关注价值：** 研究能够调用工具、检查环境与执行轨迹的智能体裁判仍可能存在确认偏差，挑战“可自主取证就足够客观”的评估假设。

**3. [AGORA: Reliability-Aware Aggregation of LLM Judges via Item-Response Theory](http://arxiv.org/abs/2611.05556v1)**  
**作者：** J. Ahn  
**核心贡献与关注价值：** 引入项目反应理论进行可靠性感知的多裁判聚合，针对裁判能力不均、人工标注样本有限的问题，为超越简单多数投票提供方法路径。

### 🤖 智能体与推理：计算分配、人机协作与长期执行

**4. [Routes of Reasoning: Reading and Reshaping Test-Time Compute in MoE Models](http://arxiv.org/abs/2611.05919v1)**  
**作者：** S. Wang, M. Fayyaz, N. Peng  
**核心贡献与关注价值：** 围绕规划、推导和验证等推理行为，探索通过 MoE 路由理解与调整测试时计算，为治理反复验证、重复推导等“过度思考”提供新的切入点。

**5. [Learning When Human Decisions Matter: Executor-Relative Consultation Value for LLM Agents](http://arxiv.org/abs/2611.05814v1)**  
**作者：** S. Jiang, K. Pahwa, Y. Zhang 等  
**核心贡献与关注价值：** 将有限的人类决策能力视为需要分配的资源，并强调咨询价值相对于具体执行者而变化，推动人机协作从笼统求助转向任务相关的价值判断。

**6. [Prospective Memory for Proactive LLM Agents](http://arxiv.org/abs/2611.05731v1)**  
**作者：** Y. Bei, Z. Liu, T. Wei 等  
**核心贡献与关注价值：** 将记忆机制从回顾过去扩展到保存未来意图、在适当机会主动执行，为长期运行的主动智能体提出重要能力维度。

**7. [When to Ask, When to Answer: Strategic Clarification for Ambiguous Reference Resolution in Dialogue](http://arxiv.org/abs/2611.05517v1)**  
**作者：** I. Khebour, N. Krishnaswamy  
**核心贡献与关注价值：** 针对歧义指代中的过早作答倾向，研究何时澄清才会实质改变结果，将提问视为具有成本与收益的策略选择。

**8. [SlackBench: Benchmarking Agents on Collaborative Projects Grounded in Real Code Repositories](http://arxiv.org/abs/2611.05512v1)**  
**作者：** M. Li, H. Mao, R. Zheng 等  
**核心贡献与关注价值：** 以真实代码仓库为基础评测协作项目中的智能体，推动基准从孤立任务走向具有多人互动与长期上下文的数字同事场景。

### 🔧 方法与框架：效率优化、检索路由与评估协议

**9. [Modality-Aware Expert Pruning for MoE-Based Multimodal Large Language Models](http://arxiv.org/abs/2611.05927v1)**  
**作者：** D. Kim  
**核心贡献与关注价值：** 针对多模态 MoE 中专家参数占据主要存储空间的问题，提出模态感知的专家剪枝方向，直指“激活稀疏但模型仍然庞大”的部署瓶颈。

**10. [RAGCompass: Generalizable Retriever Routing via Reranking](http://arxiv.org/abs/2611.05596v1)**  
**作者：** V. Six, M. Li, D. Fu 等  
**核心贡献与关注价值：** 利用重排序进行检索器路由，结合查询与不同检索器返回的段落选择合适的检索器，为异构 RAG 系统的查询级适配提供思路。

**11. [Information-Matched Auditing of Conversational Emotion-Shift Forecasting: A Leakage-Safe Evaluation Protocol](http://arxiv.org/abs/2611.05895v1)**  
**作者：** B. Wen, D.-Q. Zhang, T.-P. Tan  
**核心贡献与关注价值：** 针对输入信息不对称、调参预算不一致和目标轮次泄漏提出审计协议，其价值不仅在情绪预测，也在于展示如何排除评估中的伪增益。

### 📊 应用：电力规划、任务承接与文档修复

**12. [Autonomous agents for electricity-system planning](http://arxiv.org/abs/2611.05911v1)**  
**作者：** Y. P. Lee, S. Roy, J. P. Yoo 等  
**核心贡献与关注价值：** 将区域场景下的方案提出、数值评估、反馈解释和重新设计串成自主规划流程，值得关注语言模型如何与带有工程约束的计算工具协作。

**13. [PAYWORTHY: Can LLMs Predict Which Freelance Jobs an AI Agent Will Complete?](http://arxiv.org/abs/2611.05759v1)**  
**作者：** M. R. Rezaei, D. Wang, B. Levert 等  
**核心贡献与关注价值：** 基于 1,494 条真实自由职业招聘信息，评测模型能否在执行前预测智能体的完成能力，将能力判断直接连接到任务承接与经济风险。

**14. [Rewrite, Then Veto: Rewriter-Agnostic Edit Gating for LLM-Based Post-OCR Correction](http://arxiv.org/abs/2611.05539v1)**  
**作者：** J. R. F. Cacho  
**核心贡献与关注价值：** 在全文重写后通过字符对齐、修改分块与独立门控筛选编辑，试图修复 OCR 错误而不破坏原本正确的文本，体现“生成与验收分离”的实用设计。

## 三、研究趋势信号

今日投稿呈现出从“能力扩张”向“决策治理”的转向：MoE 不只追求稀疏激活，还关注专家裁剪、权重规则与推理过程控制；智能体不只学习执行，也开始学习何时咨询、澄清和兑现未来意图。与此同时，工具取证与多裁判投票不再被视为可靠性的充分条件，评估研究转向偏差审计、信息公平和可靠性建模。真实协作与付费任务基准则表明，研究目标正从单题正确率延伸到长期工作价值与失败成本。

## 四、值得精读

1. **[Routes of Reasoning](http://arxiv.org/abs/2611.05919v1)**  
   连接 MoE 内部路由与测试时推理行为，兼具机制研究和效率优化价值。精读时应重点检查：路由与行为的关系是否仅为相关，以及干预后的准确率—成本权衡。

2. **[Learning When Human Decisions Matter](http://arxiv.org/abs/2611.05814v1)**  
   把“是否求助”从置信度问题转化为执行者相关的咨询价值问题。值得关注其价值估计方式、人类决策预算设置，以及能否跨执行模型泛化。

3. **[Grounded but Not Immune](http://arxiv.org/abs/2611.05662v1)**  
   直接关系到智能体评测与自动验收系统的可信度。精读时应关注偏差诱发方式、证据访问控制，以及是否能区分证据不足与选择性采信。

## 附：其余论文链接索引

以下保留其余 12 篇论文的 ArXiv 链接，便于完整追踪本日清单：

- **城市机器人感知：** [Robots in the City: Persona-Based Perceptions of Urban Robots](http://arxiv.org/abs/2611.05954v1)
- **风险受控情绪预测：** [Selective, Risk-Controlled Emotion Forecasting in Conversation](http://arxiv.org/abs/2611.05896v1)
- **知识图谱审计：** [When Does Better Confidence Improve a Knowledge-Graph Audit?](http://arxiv.org/abs/2611.05877v1)
- **购物建议评测：** [CARTBench](http://arxiv.org/abs/2611.05862v1)
- **多智能体协作决策：** [TandemBench](http://arxiv.org/abs/2611.05827v1)
- **汉字语音知识：** [Phonological Knowledge of Chinese Characters in Language Models](http://arxiv.org/abs/2611.05803v1)
- **作者风格模仿：** [How Well Can Large Language Models Impersonate Individual Authors?](http://arxiv.org/abs/2611.05771v1)
- **低资源医疗语音识别：** [Text-Only Domain Adaptation for Low-Resource Medical ASR](http://arxiv.org/abs/2611.05744v1)
- **性别与抽象概念偏差：** [The Male Abstraction Bias in Internet Culture and Large Language Models](http://arxiv.org/abs/2611.05730v1)
- **搜索智能体认知偏差：** [Cognitive Bias Signatures in Search-Equipped LLM Agents](http://arxiv.org/abs/2611.05720v1)
- **多语言转写纠错界面：** [Contextual Pictograms for Repairing Multilingual ASR Errors](http://arxiv.org/abs/2611.05637v1)
- **数据科学项目迭代：** [Iterated creation, grading, and revision of data science projects by language models](http://arxiv.org/abs/2611.05548v1)

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*