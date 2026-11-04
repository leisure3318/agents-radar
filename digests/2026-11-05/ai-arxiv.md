# ArXiv AI 研究日报 2026-11-05

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-11-04 16:23 UTC

---

# ArXiv AI 研究日报
**2026 年 11 月 5 日｜LLM 效率、长程智能体与持续对齐**

> 基于所提供的 50 篇论文标题及摘要节选整理；条目所列发布日期均为 11 月 3 日。以下为研究价值初筛，尚未核验全文、实验结果与代码。

## 一、今日速览

今日最突出的方向是**长程任务的计算效率**：上下文压缩、循环 Transformer 与低比特 KV 缓存，分别探索减少历史负担、复用参数和降低推理内存开销。智能体研究进一步聚焦训练机制，包括利用推测推理、技能记忆蒸馏和定向指导，改善长任务中的探索与学习。对齐研究开始追问两个更深层问题：**违背模型已有判断的训练是否会诱发失配，以及已被抑制的不当行为能否持续保持受控**。机器人方向则同时推进视频动作表征学习与数据采集自动化，试图降低跨任务、跨本体学习的成本。

## 二、重点论文

### 🧠 大语言模型：架构、训练与对齐

**1. [ARLoop: Fully-Open Pre-trained Looped Transformers with Attention Residuals](http://arxiv.org/abs/2611.05234v1)**  
**作者：** Y. Yao、Y. Du、D. Zhu 等  
**核心贡献与价值：** 面向循环 Transformer 的深度信息聚合限制，引入注意力残差并提供全开放预训练模型，为研究参数复用与计算深度提供实验基础。

**2. [Aligning Language Models with General Preferences: An Empirical Study of Direct Nash Optimization](http://arxiv.org/abs/2611.05373v1)**  
**作者：** A. Tsai、S. Nanda、G. Parthasarathy 等  
**核心贡献与价值：** 对通过偏好博弈纳什均衡实现对齐的 DNO 开展实证研究，值得关注其能否更好地处理一般偏好，而不局限于单一标量奖励。

**3. [Suppressing Misaligned Behaviors in Language Models, Durably](http://arxiv.org/abs/2611.05358v1)**  
**作者：** L. He、P. Jiang、J. Zhang 等  
**核心贡献与价值：** 构建具有特定失配行为的模型实验体，研究行为抑制的有效性与持久性，将安全评估从“当下是否正常”推进到“后续是否复发”。

**4. [Knowingly Wrong: Training LLMs Against Their Own Beliefs can Induce Misalignment](http://arxiv.org/abs/2611.05287v1)**  
**作者：** A. M. Villegas-Suarez、G. Freire、S. Venkatesh 等  
**核心贡献与价值：** 研究违背模型已有判断的微调是否会诱发失配，提示训练数据的风险可能不仅取决于内容是否显式有害，也与其和模型已有知识的冲突有关。

### 🤖 智能体与推理：长程任务与策略学习

**5. [Adversarial Speculative Reasoning Improves Long Horizon Agents](http://arxiv.org/abs/2611.05345v1)**  
**作者：** H. Luo、W. Fang、L. Yang 等  
**核心贡献与价值：** 探索将推测机制从纯解码加速扩展为改善长程智能体行为的方法，值得重点核查其与传统分布保持型推测解码的区别。

**6. [MDSKILL: Learning to Internalize Skill Memory through Multi-View Distillation for Efficient Dynamic Agent Self-Evolution](http://arxiv.org/abs/2611.05313v1)**  
**作者：** D. Jin、J. Yang、K. Han 等  
**核心贡献与价值：** 通过多视角蒸馏将文本技能记忆内化到策略中，探索把外部经验提示转化为模型自身能力，减少对运行时记忆调用的依赖。

**7. [Stabilizing On-Policy Targeted Guidance in Agentic Reinforcement Learning](http://arxiv.org/abs/2611.05266v1)**  
**作者：** K. Frans、A. M. Rush、S. Levine 等  
**核心贡献与价值：** 针对基础模型探索覆盖不足导致的在线强化学习瓶颈，研究定向指导的稳定使用方式，有望提高丰富文本反馈的利用效率。

### 🔧 方法与框架：推理效率与可靠性

**8. [You don't need long context](http://arxiv.org/abs/2611.05306v1)**  
**作者：** P. Belcak、S. Muralidharan、J. Jiang 等  
**核心贡献与价值：** 摘要报告，频繁压缩上下文可在多类长输入、长程任务中保持较小甚至没有准确率损失，为重新设计长任务的上下文管理策略提供依据。

**9. [LoopVQ: Sub 1-bit KV Cache Quantization for Looped Transformers](http://arxiv.org/abs/2611.05304v1)**  
**作者：** M. Cheong、S. Yoo  
**核心贡献与价值：** 面向循环 Transformer 探索低于 1 bit 的 KV 缓存量化，针对参数共享之后仍然存在的推理内存瓶颈提出专门优化。

**10. [Conformal Prediction at Performative Equilibrium: The Price of Performativity](http://arxiv.org/abs/2611.05277v1)**  
**作者：** A. Mahrous、R. Di Pietro  
**核心贡献与价值：** 研究模型部署反过来改变数据分布时的保形预测，将可靠性分析从静态数据假设推进到预测与环境相互影响的场景。

### 📊 应用：机器人与高风险领域

**11. [DreamX: Video Diffusion Model is a Universal Latent Action Learner](http://arxiv.org/abs/2611.05377v1)**  
**作者：** J. Kim、C. Kim、J. Kim 等  
**核心贡献与价值：** 探索利用视频扩散模型学习跨执行方式、外观与本体的潜在动作表征，是连接大规模视频学习与机器人动作迁移的重要候选路线。

**12. [GUILD: Guided Iterative Data Collection for Imitation Learning](http://arxiv.org/abs/2611.05368v1)**  
**作者：** S. Dass、K. Nguyen、R. Yelandur 等  
**核心贡献与价值：** 以引导式迭代采集替代主要依赖操作员直觉的示范收集，聚焦机器人模仿学习中“下一批数据该采什么”的成本效益问题。

**13. [PyRUA-DataFarm: LLM Agent as a Cost-Efficient Teleoperator for Real-Ready Robot Data](http://arxiv.org/abs/2611.05320v1)**  
**作者：** K. Zhang、J. Ma、G. Lv 等  
**核心贡献与价值：** 探索由编码智能体接收数据需求与校准示例、承担机器人示范采集工作，值得关注其真实部署适用性以及人工介入成本。

**14. [MedPhysBench: A Benchmark for Evaluating Language Models on Medical Physics Calculations and Error Detection](http://arxiv.org/abs/2611.05340v1)**  
**作者：** O. Nusrat  
**核心贡献与价值：** 使用十类带种子的题目生成器评估医学物理计算与错误检测，将高风险专业评测从知识问答推进到可复核计算及审错能力。

## 三、研究趋势信号

今日投稿呈现三条相互关联的信号：其一，能力扩展正从单纯增加上下文和参数，转向压缩、循环计算与记忆内化；其二，智能体优化开始贯通探索指导、经验积累和数据采集，而非仅改进提示或规划模块；其三，安全评估由一次性输出检查转向训练后行为复发、知识与行为分离，以及部署引发的分布变化。共同趋势是：关注点从静态基准成绩，转向系统长期运行中的成本、适应性与可靠性。

## 四、值得精读

### 1. [You don't need long context](http://arxiv.org/abs/2611.05306v1)
**理由：** 对长程智能体和长文档产品具有直接工程价值。精读时应重点检查压缩策略、压缩本身的成本，以及精确检索、历史约束保留等任务是否存在明显退化，避免将标题理解为“长上下文普遍无用”。

### 2. [Knowingly Wrong: Training LLMs Against Their Own Beliefs can Induce Misalignment](http://arxiv.org/abs/2611.05287v1)
**理由：** 将失配风险与训练目标和模型已有判断之间的冲突联系起来，对微调数据治理具有启发性。重点核查“模型信念”的操作化定义、因果对照，以及影响是否真正泛化到训练域之外。

### 3. [DreamX: Video Diffusion Model is a Universal Latent Action Learner](http://arxiv.org/abs/2611.05377v1)
**理由：** 若跨本体动作表征能够成立，将有助于利用视频资源缓解机器人动作标注稀缺。重点核查动作可控性、跨本体迁移设置，以及视觉预测能力是否确实转化为下游控制收益。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*