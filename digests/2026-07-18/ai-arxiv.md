# ArXiv AI 研究日报 2026-07-18

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 22 篇论文 | 生成时间: 2026-07-18 01:02 UTC

---

# ArXiv AI 研究日报（2026-07-18）

## 1) 今日速览
今天的 arXiv AI 论文明显呈现出两条主线：一是 **LLM 的可靠性与可控性**，包括统计自洽性、分词器扩展、训练数据投毒与物理安全边界；二是 **智能体从“会用工具”走向“会协作、会评估、会省成本”**，尤其体现在搜索协作、证据筛选、自动化 meta-analysis 和安全代理评测。  
多模态与具身智能也继续升温，从机器人长时序上下文、场景级跨模态绑定，到科学图表编辑与图像字幕对齐误差检测，显示出“**理解—编辑—行动**”一体化趋势。  
方法层面，Test-Time Training、在线记忆、平均速度生成等技术继续推动模型在 **长上下文、在线适应和推理效率** 上突破。  
整体来看，今天的论文不再只追求静态 benchmark 分数，而是在更真实的闭环任务、成本约束和安全约束下验证 AI 系统能力。

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

- [**Partition, Prompt, Aggregate: Statistical Self-Consistency in Language Models**](http://arxiv.org/abs/2607.15277v1)  
  作者：Wolf, Buening, Krause 等  
  一句话：从概率一致性角度检验 in-context learning，强调 LLM 输出应满足基本统计自洽，这对理解“提示=条件推断”非常关键。

- [**In-Place Tokenizer Expansion for Pre-trained LLMs**](http://arxiv.org/abs/2607.15232v1)  
  作者：Smith, Dakhran, Cabrera 等  
  一句话：提出无需重训即可扩展预训练 LLM 分词器的方法，直接回应多语言/新领域落地时的效率、能耗和延迟问题。

- [**Pretraining Data Can Be Poisoned through Computational Propaganda**](http://arxiv.org/abs/2607.15267v1)  
  作者：Graf, Hajishirzi, Smith 等  
  一句话：指出预训练数据投毒可通过“计算宣传”渗透到更大、更异质的数据生态中，提醒业界关注大规模语料供应链安全。

- [**When Words Are Safe But Actions Kill: Probing Physical Danger Beyond Text Safety in Hidden-State Risk Space**](http://arxiv.org/abs/2607.15218v1)  
  作者：Wang, Wang, Zhan 等  
  一句话：揭示“文本看起来无害”并不代表具身行动安全，强调语言模型作为高层规划器时的物理风险评估缺口。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

- [**SearchOS-V1: Towards Robust Open-Domain Information-Seeking Agent Collaboration**](http://arxiv.org/abs/2607.15257v1)  
  作者：Zhang, Gao, Wu 等  
  一句话：面向开放域搜索协作，解决长交互历史下的任务进度跟踪与失败恢复问题，是信息检索型智能体的重要进展。

- [**Bridge Evidence: Static Retrieval Utility Does Not Predict Causal Utility in Multi-Step Agentic Search**](http://arxiv.org/abs/2607.15253v1)  
  作者：Mukhopadhyay, Ghosh, Chatterjee  
  一句话：指出“静态检索有用”不等于“多步代理搜索中有因果价值”，对检索系统和 agent 训练数据选择都很有启发。

- [**AutoSynthesis: an agentic system for automated meta-analysis**](http://arxiv.org/abs/2607.15247v1)  
  作者：Taherinezhad, Maier, Vitagliano 等  
  一句话：把证据综合流程做成端到端多智能体系统，瞄准科学、医学和政策中的自动化 meta-analysis，应用潜力很高。

- [**Beyond Success Rate: Cost-Aware Evaluation of Offensive and Defensive Security Agents**](http://arxiv.org/abs/2607.15263v1)  
  作者：Kassianik, Nelson, Singer  
  一句话：把安全代理评测从“是否成功”推进到“成功成本多少”，更贴近真实攻防场景，也更适合比较不同 agent 策略。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

- [**RoboTTT: Context Scaling for Robot Policies**](http://arxiv.org/abs/2607.15275v1)  
  作者：Jiang, Chebotar, Zheng 等  
  一句话：将机器人策略的视觉-运动上下文扩展到 8K timesteps，显示 Test-Time-Training 在长时序机器人控制中的强大记忆能力。

- [**MeanFlowNFT: Bringing Forward-Process RL to Average-Velocity Generators**](http://arxiv.org/abs/2607.15273v1)  
  作者：Huang, Zhou, Zhang 等  
  一句话：把 RL 对齐引入 average-velocity 生成器，兼顾少步采样效率与可控优化，属于生成模型训练范式上的方法创新。

- [**Online Neural Space Time Memory for Dynamic Novel View Synthesis**](http://arxiv.org/abs/2607.15271v1)  
  作者：Elmieh, Tsai, Li 等  
  一句话：面向流式多视角视频的新视角合成，提出在线时空记忆机制，在实时性和长程遮挡恢复之间寻找平衡。

---

### 📊 应用（垂直领域、多模态、代码生成）

- [**SciDiagramEdit: Learning to Edit Scientific Diagrams from Paper Revisions**](http://arxiv.org/abs/2607.15272v1)  
  作者：Sun, Zeng, Yang 等  
  一句话：让模型根据论文修订自然语言指令自动修改科研图表，直接切中学术写作与图形修订的高频痛点。

- [**SceneBind: Binding What and Where Across Vision, Audio and Language**](http://arxiv.org/abs/2607.15265v1)  
  作者：Chen, Cui, Zhang 等  
  一句话：构建跨视觉、音频和语言的场景级表示，同时建模“是什么”和“在哪里”，对真实环境理解很关键。

- [**Symbal: Detecting Systematic Misalignments in Model-Generated Captions**](http://arxiv.org/abs/2607.15216v1)  
  作者：Varma, Delbrouck, Ostmeier 等  
  一句话：聚焦 MLLM caption 中“系统性错位”而非随机错误，能更精准地揭示图文对齐模型的结构性缺陷。

---

## 3) 研究趋势信号
今天的投稿显示，AI 正从“单点能力提升”转向“**闭环系统能力**”竞争：检索、搜索、编辑、决策、执行都要考虑多步交互和成本约束。与此同时，安全研究开始从文本层面下沉到 **具身行动风险**，多模态研究也从识别走向场景级空间理解与内容编辑。另一个明显趋势是 **动态适应**：无论是 tokenizer 扩展、TTT 记忆，还是在线优化，都在尝试让模型摆脱“预训练后冻结”的范式。

---

## 4) 值得精读

1. [**Partition, Prompt, Aggregate: Statistical Self-Consistency in Language Models**](http://arxiv.org/abs/2607.15277v1)  
   理由：它直接触及 LLM 作为概率模型是否“自洽”这一基础问题，理论意义强，适合做方法论精读。

2. [**SearchOS-V1: Towards Robust Open-Domain Information-Seeking Agent Collaboration**](http://arxiv.org/abs/2607.15257v1)  
   理由：代表了信息检索型智能体从“能搜”到“能协作、能恢复、能持续推进任务”的关键一步，很贴近真实产品形态。

3. [**In-Place Tokenizer Expansion for Pre-trained LLMs**](http://arxiv.org/abs/2607.15232v1)  
   理由：这是非常实用的基础设施型研究，直接关系到多语言扩展、部署成本与模型生命周期管理，工程价值高。

如果你愿意，我也可以把这份日报进一步整理成：
- **适合发公众号/内部简报的版本**
- **更偏投资/产业观察的版本**
- **按“最可能被引用”排序的版本**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*