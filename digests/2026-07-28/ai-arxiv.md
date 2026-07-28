# ArXiv AI 研究日报 2026-07-28

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-07-28 02:39 UTC

---

# ArXiv AI 研究日报（2026-07-28）

## 1) 今日速览
今天的投稿明显呈现出从“模型能力”走向“系统能力”的趋势：一方面，多步工具使用、计划模式、多智能体编排等真实任务评测明显增多；另一方面，安全、授权、对齐可控性与越狱场景分析成为新的核心议题。  
与此同时，面向推荐、代码生成、心理支持、多模态事实核查等落地场景的研究继续升温，强调长期记忆、因果建模和可验证性。  
在方法层面，效率优化与部署约束也很突出，例如面向 FHE 的 Transformer 近似、动态缺失值补全和更稳健的训练/推理框架。  
整体来看，今天的论文更像是在回答一个问题：**LLM 不只是“会不会”，而是“能不能可靠地在真实环境中长期工作”**。

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

- [Zing: Social Mind for LLMs](http://arxiv.org/abs/2607.23740v1)  
  作者：Zing Team、Ao Xiang 等  
  一句话：把“社会心智”引入 LLM 框架，强调对他人意图、关系与规范的推理能力，是 LLM 从任务模型走向社会交互体的重要信号。

- [Language Shapes Instruction Hierarchy Compliance in Multilingual LLMs](http://arxiv.org/abs/2607.23545v1)  
  作者：Jiwon Moon、Yerin Hwang 等  
  一句话：系统考察多语言条件下的指令层级遵循问题，提示“安全对齐”并不天然跨语言成立，值得做部署前审计。

- [Auditing Alignment Controllability in LLMs via Political Axes](http://arxiv.org/abs/2607.23519v1)  
  作者：Bartol Bućan、Nikola Sočec 等  
  一句话：从“能被如何操控”而非“静态站位”来审计模型政治倾向，为对齐可控性提供了更贴近部署的评估视角。

- [Do LLMs Know Their Vulnerable Scenarios?](http://arxiv.org/abs/2607.23496v1)  
  作者：Ziheng Peng、Huiqi Deng 等  
  一句话：研究模型是否能识别自身在何种场景下容易失守，直接对应红队、风险分层与安全策略自适应。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

- [E-Bench: Benchmarking Multi-Step Tool-Use Agents in Real-World Product Scenarios](http://arxiv.org/abs/2607.23722v1)  
  作者：Weihuang Zheng、Tianyuan Zou 等  
  一句话：把多步工具使用放到真实产品场景中评测，补上了“会调工具”与“能完成工作”之间的鸿沟。

- [Focus Is All You Need: Adaptive Goal-aware Attention Orchestration for Multi-Agent Graph Systems](http://arxiv.org/abs/2607.23678v1)  
  作者：Mingzhou Fan、Siyuan Xu 等  
  一句话：面向多智能体图系统提出自适应注意力编排机制，重点解决多节点协作时的关注分配与目标一致性问题。

- [Plans Work in Mysterious Ways: Evaluating a Plan Mode for Spreadsheet Agents](http://arxiv.org/abs/2607.23670v1)  
  作者：Aayush Kumar、Avik Dutta 等  
  一句话：评估“先计划后执行”是否真能改善电子表格代理表现，直接触及 agent 产品化中最常见的交互范式。

- [Offline-Online Curriculum RL for Multimodal Reasoning](http://arxiv.org/abs/2607.23700v1)  
  作者：Wendi Deng、Hang Du 等  
  一句话：通过离线到在线的课程式 RL 提升多模态推理的中间步骤质量，强调“答案对了但过程错了”这一核心痛点。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

- [ATLAS: Automated Approximation of Transformers for Efficient Homomorphic Inference in One Hour](http://arxiv.org/abs/2607.23478v1)  
  作者：Jianhang Xie、Sicheng Tan 等  
  一句话：自动把 Transformer 近似到可在同态加密下高效推理，兼顾隐私与可部署性，工程价值很强。

- [Impute On-Demand: Adaptive Correlated Time Series Imputation for Changing Environments](http://arxiv.org/abs/2607.23503v1)  
  作者：Zhichen Lai、Huan Li 等  
  一句话：面向变化环境的相关时间序列补全框架，把“准确补全”推进到“可随环境自适应补全”，很适合 IoT/工业数据。

---

### 📊 应用（垂直领域、多模态、代码生成）

- [The Illusion of Secure LLM Code: Closing the Security Gap via Iterative Reprompting](http://arxiv.org/abs/2607.23710v1)  
  作者：Ishpuneet Singh、Shreyas Mahajan 等  
  一句话：聚焦 LLM 生成认证代码的安全缺口，说明“代码能跑”远不等于“代码安全”，对 AI 编程工具非常关键。

- [CALMRec: Causally Aligned Language Memory for Long-Horizon Recommendation](http://arxiv.org/abs/2607.23647v1)  
  作者：Gengyu Zhan  
  一句话：把长期推荐中的持久偏好、短期意图和曝光效应拆开建模，试图缓解推荐系统里常见的反馈回路问题。

- [Verification-Notebook Learning for Source-Aware Multimodal Misinformation Detection](http://arxiv.org/abs/2607.23581v1)  
  作者：Junyuan Tan  
  一句话：用“验证笔记本”式推理组织多模态事实核查，突出证据来源感知与实例级推理过程管理。

- [MS-GPT: Rethinking MS/MS De Novo Structure Elucidation as Spectrum-Induced Posterior Querying of a Molecule-Language Model](http://arxiv.org/abs/2607.23607v1)  
  作者：Xin Zhao、Yumin Liu 等  
  一句话：把质谱结构解析重写为“谱图驱动的后验查询”，是把语言模型方法迁移到化学逆问题的典型代表。

---

## 3) 研究趋势信号（100~200 字）
今天的投稿显示，AI 研究正从“单点能力提升”转向“真实系统可用性”：多步工具使用、计划模式、多智能体编排与深度搜索的可诊断性被集中讨论；同时，安全、授权、对齐可控性和越狱场景审计成为主线。另一条明显趋势是把长程记忆、因果对齐和在线实验纳入推荐、营销与多模态推理中，说明研究重心正在从离线指标转向闭环决策与可验证部署。

---

## 4) 值得精读
1. [E-Bench: Benchmarking Multi-Step Tool-Use Agents in Real-World Product Scenarios](http://arxiv.org/abs/2607.23722v1)  
   理由：最接近真实产品环境的多步工具使用评测之一，适合判断 agent 方案到底能不能落地。

2. [Zing: Social Mind for LLMs](http://arxiv.org/abs/2607.23740v1)  
   理由：把 LLM 从“任务执行器”推进到“社会交互体”的方向很前沿，可能影响后续长期服务型 agent 设计。

3. [ATLAS: Automated Approximation of Transformers for Efficient Homomorphic Inference in One Hour](http://arxiv.org/abs/2607.23478v1)  
   理由：同时兼顾隐私计算与部署效率，工程意义强，且代表了“模型压缩/近似 + 安全推理”的重要结合方向。

如果你愿意，我可以继续把这份日报整理成 **“投资/产业视角版”** 或 **“学术综述版”**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*