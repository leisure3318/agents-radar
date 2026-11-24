# ArXiv AI 研究日报 2026-11-24

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-11-24 05:45 UTC

---

# ArXiv AI 研究日报
**2026 年 11 月 24 日｜基于所提供的 50 篇论文条目**

> 所列论文发布日期均为 11 月 23 日。本报依据题目及截断摘要筛选，未核验全文；下文重点介绍研究问题与方法方向，不将尚未核实的效果视为定论。

## 一、今日速览

今日最鲜明的信号是：**研究关注点正从“模型能否完成任务”，转向“训练信号、评估结果与部署收益是否可信”**，涉及代码智能体奖励标签、安全评测归因和网页任务判定规则。智能体研究继续向长期运行推进，多模态经验整合、机器人测试时适应，以及推理与实时控制分工成为重要方向。大模型基础研究则聚焦异构推理策略的可学习性、持续学习中的遗忘定位与 Grokking 机制。效率研究更加重视实际工作负载：并发解码和包含输出阶段的成本核算，比单纯减少参数或输入 token 更接近部署需求。

## 二、重点论文

### 🧠 大语言模型｜训练、机制与持续学习

**1. [Learning Heterogeneous Reasoning in Large Language Models: From Mode Compatibility to Local Bottlenecks](http://arxiv.org/abs/2611.30281v1)**  
**作者：** S. Li、D. Song、S. Ma 等  
**核心贡献与关注点：** 研究标准 SFT 能否在没有显式模式条件的情况下学习不同教师或算法产生的推理策略，直接关系到混合推理数据是否能够有效转化为能力增益。

**2. [Revisiting Continual Learning in Language Models: A Three-Interface Diagnosis of Stability and Plasticity](http://arxiv.org/abs/2611.30151v1)**  
**作者：** K. Kim、B. Lee、H. Kim 等  
**核心贡献与关注点：** 提出三接口诊断视角，尝试区分持续学习中不同位置的遗忘，避免仅凭最终输出性能下降就认定模型内部知识已经丢失。

**3. [Grokking as a Subspace Search: Computing the Destination Before Training](http://arxiv.org/abs/2611.30116v1)**  
**作者：** S. Jeong、J. Kim、H. Hwang  
**核心贡献与关注点：** 将 Grokking 解释为子空间搜索，并尝试在训练前计算其最终趋向，为延迟泛化提供可事前检验的机制假设。

### 🤖 智能体与推理｜经验积累、适应与控制

**4. [MMMem: Self-Improving Agents with Task-Aware Multimodal Experience Consolidation](http://arxiv.org/abs/2611.30287v1)**  
**作者：** Y. Chen、C. Lv、Y. Li 等  
**核心贡献与关注点：** 围绕任务整合对话、图像和文档中的多模态经验，旨在保留跨记录推理所得的理解，让智能体不只是“存过信息”，还能减少重复犯错。

**5. [RoboAda: Adapting Frozen Robot Policies at Test Time to Physics They Cannot See](http://arxiv.org/abs/2611.30209v1)**  
**作者：** Y. Zhang、Z. Jin、S. Niu 等  
**核心贡献与关注点：** 探索冻结机器人策略在测试时适应不可见物理变化，针对质量、关节性能和控制延迟等视觉难以识别的部署偏移。

**6. [RoboThink: Let the Agent Think, Let the Policy Act](http://arxiv.org/abs/2611.30111v1)**  
**作者：** Y. Zhang、Z. Jin、J. Wang 等  
**核心贡献与关注点：** 探索由推理智能体诊断失败、由策略维持实时动作执行的分工，切中高层推理速度与低层控制频率不匹配的问题。

### 🔧 方法与框架｜可信评估、数据构建与效率

**7. [Attributing Security Outcomes in LLM-Agent Evaluations: The Role of Content-Free State](http://arxiv.org/abs/2611.30259v1)**  
**作者：** A. Bounite、Z. Iklassov  
**核心贡献与关注点：** 指出智能体安全评测结果还可能受“无内容状态”影响，提醒研究者不能直接把攻击成功率差异全部归因于攻击、防御或模型能力。

**8. [Same Executions, Different Gaps: Judgment Rules in Web-Agent Evaluation](http://arxiv.org/abs/2611.30190v1)**  
**作者：** Z. Wang、W. Li、F. Xue 等  
**核心贡献与关注点：** 分析成功定义、判定证据与判断规则如何影响网页智能体的性能差距，强调“排名领先”并不等于“领先幅度可靠”。

**9. [PackLoop: Row-Packed Self-Speculative Decoding for Looped Language Models under Concurrency](http://arxiv.org/abs/2611.30205v1)**  
**作者：** R. Li、D. Lu  
**核心贡献与关注点：** 面向循环语言模型提出行打包自推测解码，重点处理多请求共享 GPU 时加速收益衰减的问题，比单请求测速更贴近在线服务。

**10. [When Does Optical Context Compression Pay Off? A Decode-Aware Cost Analysis of Reasoning VLMs](http://arxiv.org/abs/2611.30130v1)**  
**作者：** Z. Ge  
**核心贡献与关注点：** 将解码阶段纳入“文本转图像”上下文压缩的成本核算，检验输入 token 减少是否真正带来端到端节省。

**11. [VADE: A Verifiable Agent Data Engine from Professional Sources](http://arxiv.org/abs/2611.30202v1)**  
**作者：** X. Chen、Z. Lyu、K. Zhang 等  
**核心贡献与关注点：** 探索从专业资料构建可验证智能体任务的数据引擎，回应法律、金融等领域缺少代码任务式可执行验证信号的难题。

### 📊 应用｜代码智能体与专业文档

**12. [What Makes Good Data for Training Coding Agents? A Systematic Study on SWE-Gym](http://arxiv.org/abs/2611.30207v1)**  
**作者：** Y. Zhang、M. Xu、Y. Zhang 等  
**核心贡献与关注点：** 审计 SWE-Gym 中训练奖励标签的正确性，指出“参考修复能通过测试”并不足以保证测试能够可靠评价智能体生成的其他修复。

**13. [Post-Training Agents for Long-Document Reasoning](http://arxiv.org/abs/2611.30090v1)**  
**作者：** S. Mehta、L. Ritchie、E. Chen  
**核心贡献与关注点：** 聚焦十个企业领域中的长文档智能体后训练，覆盖分散证据及图表、图纸、地图等信息，凸显检索式基准与真实专业阅读之间的差距。

**14. [Could This BE Any More Wrong? Teaching VLMs to Know What They Don't Know in Document Extraction](http://arxiv.org/abs/2611.30119v1)**  
**作者：** V. Srivastava、V. Casas Hernandez  
**核心贡献与关注点：** 通过 token 到字段跨度的对齐，从模型已有的 token 对数概率估计字段级置信度，为金融文档抽取中的人工复核与风险分流提供依据。

## 三、研究趋势信号

今日投稿显示，智能体研究正由“完成任务”转向“可靠积累经验并适应部署环境”：多模态记忆、机器人测试时适应与持续个性化形成呼应。另一条主线是验证基础设施，研究者开始审计奖励标签、成功判定与安全评测中的混杂因素。效率评价也从参数量和输入 token，转向并发、解码及端到端成本。整体看，数据、评估和运行闭环正成为能力提升之外的重要竞争轴。

## 四、值得精读

### 1. [What Makes Good Data for Training Coding Agents?](http://arxiv.org/abs/2611.30207v1)
**理由：** 奖励标签是否可靠，是代码智能体强化学习的基础问题；若评价器存在系统性误判，训练收益和基准进步都可能被误读。精读时应重点检查错误标签的定义、审计覆盖范围，以及它们对实际训练的影响。

### 2. [Same Executions, Different Gaps](http://arxiv.org/abs/2611.30190v1)
**理由：** 将关注点从智能体排行榜转向比较结论本身的可信度，对所有使用成功率评估的团队都有参考价值。重点看不同判定规则如何改变差距，以及作者如何表达比较中的不确定性。

### 3. [Learning Heterogeneous Reasoning in Large Language Models](http://arxiv.org/abs/2611.30281v1)
**理由：** 多教师、多算法推理轨迹混合已是常见数据策略，但“数据更多样”是否意味着“策略更兼容”仍需验证。重点看兼容性的操作性定义、局部瓶颈的诊断证据，以及结论能否跨模型与任务成立。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*