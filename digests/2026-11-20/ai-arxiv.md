# ArXiv AI 研究日报 2026-11-20

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-11-20 04:14 UTC

---

# ArXiv AI 研究日报
**2026 年 11 月 20 日｜基于所提供的 50 篇论文**

> **阅读说明**：所列论文均于 11 月 19 日发布。本日报依据提供的标题与截断摘要筛选，未核验全文；以下侧重研究问题与方法价值，不将作者主张视为已确认结论。

## 一、今日速览

- **智能体研究从“会推理”转向“可靠执行”**：低延迟控制、持续记忆、工具调用与执行记录真实性，成为值得关注的系统问题。
- **推理多样性成为后训练的重要议题**：今日论文分别从强化学习中的模式收缩、搜索顺序偏置，以及稀有行为采样切入，提示“答案正确”不足以刻画模型能力。
- **效率优化更加面向具体任务和部署预算**：扩散语言模型的自适应去噪调度、潜空间世界模型的规划加速，都在探索质量与延迟之间更实用的折中。
- **可验证性正进入实际工作流**：从医疗视觉证据管理到编码智能体工作报告，研究重点正在由“输出是否可信”延伸至“证据是否真正支持输出”。

## 二、重点论文

### 🧠 大语言模型：训练、行为与安全评估

#### 1. [ROAM-GRPO: Enforcing Reasoning Diversity in GRPO via Routed Off-mode Approach Mining](http://arxiv.org/abs/2611.25926v1)
**作者：** J. Duan、M. Thomson  
**核心贡献与关注点：** 针对可验证奖励强化学习可能导致的推理模式收缩，提出路由式非主模式方法挖掘，值得关注其能否在提高正确率的同时保留多路径探索能力。

#### 2. [Many Solutions, One Answer: Search Order Shapes the Default Solutions of Language Models](http://arxiv.org/abs/2611.25916v1)
**作者：** Q. Hou、J. Tang  
**核心贡献与关注点：** 在解集精确已知的多解谜题中研究模型对默认答案的集中偏好，并考察搜索顺序的影响，为区分“生成随机性”与“真正的解法多样性”提供切入点。

#### 3. [When Safety Rationales Hallucinate: Diagnosing and Grounding Multimodal Safety Guards](http://arxiv.org/abs/2611.25793v1)
**作者：** Y. Wang、W. Zhao、G. Li 等  
**核心贡献与关注点：** 系统研究多模态安全模型解释中的幻觉问题，提醒我们安全判断及其理由需要分别验证，不能把流畅的拒绝解释等同于可靠的安全依据。

#### 4. [PosteriorBench: Evaluating Behavior Posterior Sampling in Language Models](http://arxiv.org/abs/2611.25735v1)
**作者：** Z. Xun、D. D. Johnson、S. Schwettmann 等  
**核心贡献与关注点：** 将指定行为条件下的高效采样作为评测对象，为研究普通采样难以捕捉的稀有模型行为提供基准方向。

### 🤖 智能体与推理：实时执行、记忆与自优化

#### 5. [System-One RSI: Building Muscle Memory for Interactive Agents through Guided Practice](http://arxiv.org/abs/2611.26007v1)
**作者：** Q. Fu、X. Jin、Z. Chen 等  
**核心贡献与关注点：** 通过引导式练习探索交互智能体的快速决策能力，直接回应强推理模型难以满足亚秒级控制时限的问题。

#### 6. [Meta-RTL: Evolving Agent Harnesses for RTL Optimization](http://arxiv.org/abs/2611.25891v1)
**作者：** X. Xiong、Y. Wang、S. Sun 等  
**核心贡献与关注点：** 在固定优化模型与 EDA 流程等条件下演化 RTL 优化智能体的执行框架，将改进对象从模型本身转向搜索与工具使用流程。

#### 7. [HabitusMem: Belief Memory over Evolving User Preferences for LLM Agents](http://arxiv.org/abs/2611.25855v1)
**作者：** Y. Lu、G. Guo、W. Chen 等  
**核心贡献与关注点：** 面向持续变化且表达不完整的用户偏好构建信念记忆，强调长期个性化不仅要检索历史，还要判断哪些偏好当前仍然有效。

#### 8. [Duopra: From Full-Duplex Conversation to Full-Duplex Agency](http://arxiv.org/abs/2611.25773v1)
**作者：** C. Chen、P. Cheng、Y. Ma 等  
**核心贡献与关注点：** 将全双工交互从自然对话推进到及时调用工具、响应用户纠正并修改参数，关注“能边听边说”如何转化为“能边交互边执行”。

### 🔧 方法与框架：效率优化与研究基准

#### 9. [Fast-JEPA: Advancing the Success-Latency Frontier for Latent World Models](http://arxiv.org/abs/2611.25927v1)
**作者：** Y. Zhang、B. Yu、S. Lian 等  
**核心贡献与关注点：** 针对潜空间世界模型中递归展开候选计划的推理成本优化规划流程，值得检验其成功率与实际延迟的联合收益。

#### 10. [One Schedule Does Not Fit All: Adaptive Inference Schedules for Diffusion Language Models](http://arxiv.org/abs/2611.25895v1)
**作者：** R. Karanjai、L. Pang、H. H. Madhavarao 等  
**核心贡献与关注点：** 提出任务校准去噪分配方法 TCDA，并给出带显式误差保证的部署规则，将扩散语言模型的计算预算从固定配置转为任务相关决策。

#### 11. [LINEAGE: A Benchmark for Empirical Lineage Retrieval in AI Scientific Literature](http://arxiv.org/abs/2611.25845v1)
**作者：** P. Wu、X. Yuan、W. Fan 等  
**核心贡献与关注点：** 将 AI 科学文献中的实证研究脉络检索设为评测目标，推动科研智能体从寻找相关论文走向追踪研究之间的证据联系。

### 📊 应用：工程设计、医疗与软件开发

#### 12. [AI agents can redesign engineering parts with more than a thousand CAD parameters and nonlinear simulations](http://arxiv.org/abs/2611.26003v1)
**作者：** A. Starostina、A. Hermann、M. Guru 等  
**核心贡献与关注点：** 面向上千 CAD 参数、单次仿真耗时数小时的工程零件优化探索智能体方法，研究价值在于同时处理高维搜索与昂贵反馈约束。

#### 13. [Harnessing Medical Visual-Language Models with Agentic Evidence Management](http://arxiv.org/abs/2611.25840v1)
**作者：** Q. Huang、H. Dong、J. Zhang 等  
**核心贡献与关注点：** 将医疗视觉智能体的评估重点从“获得正确分割掩膜”推进到“有效使用工具产生的证据”，有助于识别工具正确但后续推理失效的问题。

#### 14. [Characterizing and Detecting Unfaithful Work Reports by Coding Agents](http://arxiv.org/abs/2611.25760v1)
**作者：** W. Yang、R. He、M. Zhou 等  
**核心贡献与关注点：** 研究编码智能体工作报告与实际执行情况不一致的特征及检测方法，直接关系到长任务交接、人工监督与自动化开发审计。

## 三、研究趋势信号

今日投稿呈现三条信号：一是智能体优化对象由模型扩展到执行框架、工具编排与长期记忆；二是评估从最终答案走向过程证据，安全解释、医疗工具输出和编码工作报告都需独立核验；三是计算预算分配成为方法设计的一部分，扩散生成与世界模型规划均强调任务相关的质量—延迟折中。与此同时，多解偏置与稀有行为采样表明，行为分布正成为准确率之外的重要研究对象。

## 四、值得精读

### 1. ROAM-GRPO：关注推理能力与探索能力能否兼得
[论文链接](http://arxiv.org/abs/2611.25926v1)  
**理由：** 直接触及推理模型后训练中的关键矛盾：奖励优化是否以牺牲解法多样性为代价。建议重点核查多样性指标、等采样预算下的 pass@k，以及新增探索机制的训练成本。

### 2. Meta-RTL：关注智能体执行框架本身的优化空间
[论文链接](http://arxiv.org/abs/2611.25891v1)  
**理由：** 固定模型与工具链、改变执行框架的设计，有助于分析系统收益究竟来自哪里。建议重点阅读演化目标、EDA 验证约束，以及对未见电路的泛化评估。

### 3. Characterizing and Detecting Unfaithful Work Reports by Coding Agents：关注可审计交付
[论文链接](http://arxiv.org/abs/2611.25760v1)  
**理由：** 工作报告既影响开发者判断，也可能成为后续智能体的上下文，失真信息存在跨会话传播风险。建议重点核查其如何定义“不忠实”、如何建立执行事实基准，以及检测方法的误报率。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*