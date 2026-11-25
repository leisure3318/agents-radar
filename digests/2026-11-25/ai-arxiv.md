# ArXiv AI 研究日报 2026-11-25

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-11-25 04:47 UTC

---

# ArXiv AI 研究日报
**2026 年 11 月 25 日｜覆盖 cs.AI、cs.CL、cs.LG 等方向，共 50 篇候选论文**

> 本期依据所提供的标题与摘要节选筛选，论文均标注发布于 11 月 24 日；以下侧重研究问题与潜在价值，未核验全文及实验结果。

## 一、今日速览

今日最突出的主线是 **LLM 效率优化从“单项压缩”走向“系统协同”**：低精度格式、量化技术交互，以及 MoE 通信依赖成为关注重点。模型训练方面，线性注意力的关联召回、超参数配置迁移，以及训练与执行策略不一致，分别触及架构能力、训练成本和强化学习可靠性。少样本上下文适应与多教师蒸馏，则反映出研究者正探索如何更有效地吸收经验、整合专长。与此同时，医疗数据泄漏与量化后门提醒我们：**性能提升必须与评估可信度、部署安全共同审视**。

## 二、重点论文

### 🧠 大语言模型：架构、训练与评估

#### 1. [Eliciting the Recall Capacity of Linear Attention](http://arxiv.org/abs/2611.32969v1)
**作者：** J. Lindqvist、A. Orvieto  
**核心贡献与关注点：** 结合自然语言评估、合成关联召回任务与针对性训练干预，研究线性注意力的召回短板，为区分“架构容量限制”与“训练未充分激发能力”提供切入点。

#### 2. [Weight Scale Rebalancing: Transferable Training Recipes for Transformers](http://arxiv.org/abs/2611.32866v1)
**作者：** Y. Hou、N. Graham、A. Yurtsever  
**核心贡献与关注点：** 提出在成对权重矩阵之间引入辅助对角矩阵的 UDVR 重参数化，旨在改善 Transformer 训练配置的可迁移性，值得关注其能否降低大模型重复调参成本。

#### 3. [EPRO: Robust Policy Optimization Through an Imperfect Execution-Policy Predictor](http://arxiv.org/abs/2611.32810v1)
**作者：** Y. Wang、C. Yang、Y. Liu 等  
**核心贡献与关注点：** 针对 LLM 强化学习中训练引擎与 rollout 引擎即使共享参数也可能产生不同策略的问题，探索借助不完美执行策略预测器开展鲁棒优化，直面训练系统中的实际偏差。

#### 4. [Sample-Efficient In-Context Adaptation via Sleep](http://arxiv.org/abs/2611.32802v1)
**作者：** S. Lee、Z. Enyan、M. Xu 等  
**核心贡献与关注点：** 探索通过“Sleep”机制提升少量上下文经验的利用效率，关注模型能否从少数交互、陌生代码片段或实验结果中形成可泛化知识；机制与适用边界需进一步查阅全文。

#### 5. [Scaling Laws of Ensemble Uncertainty in Language Models](http://arxiv.org/abs/2611.32801v1)
**作者：** S. Ravanbakhsh、D. Nitchi、K. Ngo  
**核心贡献与关注点：** 研究语言模型集成中不确定性的缩放规律，并质疑固定模型族能否充分覆盖认知不确定性，对安全评估、探索和人机交互具有基础价值。

#### 6. [Branch and Consolidate: A Unified Recipe for Multi-Teacher On-Policy Distillation](http://arxiv.org/abs/2611.32515v1)
**作者：** Z. Liang、Z. Qu、B. Chen 等  
**核心贡献与关注点：** 面向从共同检查点分化出的专家模型，提出多教师 on-policy 蒸馏方案，重点处理专家差异较大时能力难以合并的问题，契合专长模型整合需求。

### 🤖 智能体与推理：多智能体决策与协调

#### 7. [Breaking the Joint Action Space Dependence in Distributionally Robust Multi-Agent Reinforcement Learning](http://arxiv.org/abs/2611.32812v1)
**作者：** Y. Wang  
**核心贡献与关注点：** 在有限时域、一般和分布鲁棒马尔可夫博弈中研究鲁棒粗相关均衡的样本复杂度，尝试打破对联合动作空间规模的依赖，为多智能体鲁棒学习的可扩展性提供理论支撑。

#### 8. [TeamFlowRL: Online Policy Optimization of Decentralized Flow Policies for Multi-Agent Coordination](http://arxiv.org/abs/2611.32645v1)
**作者：** G. Zou、B. Zhang、H. Wang 等  
**核心贡献与关注点：** 研究利用在线强化学习改进分散式流策略，将离线生成策略的表达能力与环境交互结合，关注多智能体协调能力能否持续超越固定数据集的限制。

### 🔧 方法与框架：推理效率与部署安全

#### 9. [MXFP4 for LLM Inference: Complementary Post-Training Quantization Techniques and Their Interactions](http://arxiv.org/abs/2611.32873v1)
**作者：** N. Frumkin、A. Khodamoradi、K. Denolf 等  
**核心贡献与关注点：** 围绕 MXFP4 微缩放格式分析互补后训练量化技术及其交互，价值在于从“某种量化方法是否有效”转向“多种方法如何组合才有效”。

#### 10. [Breaking Routing And Inter-device Dependencies in Mixture-of-Experts](http://arxiv.org/abs/2611.32572v1)
**作者：** J. Zarka、D. Ahmed、E. Belilovsky 等  
**核心贡献与关注点：** 针对 MoE 专家并行推理中的 token 分发、合并和跨设备依赖瓶颈展开优化，关注点是通信与计算能否更充分重叠，而非仅减少模型算术量。

#### 11. [ReQOR: Operator-Discrepancy Subspace Repair for Quantization-Conditioned Backdoors in Large Language Models](http://arxiv.org/abs/2611.32755v1)
**作者：** W. Seo、M. Park、S. Park  
**核心贡献与关注点：** 面向“高精度时正常、量化后触发”的条件后门，提出基于算子差异的子空间修复思路，凸显模型压缩也可能改变安全属性。

### 📊 应用：视频、医疗与机器人

#### 12. [Efficient Video Retrieval Augmented Generation via Token Allocation](http://arxiv.org/abs/2611.32938v1)
**作者：** A. Barik、F. Lai、F. Y. Yan  
**核心贡献与关注点：** 将长视频 RAG 的优化重点从选帧与压缩扩展到 token 分配，关注不同证据获得额外 token 的边际价值，为有限推理预算下的视频理解提供新视角。

#### 13. [Label leakage through file headers: geometry and batch confounds in public mammography datasets, and a pre-training acceptance gate](http://arxiv.org/abs/2611.32899v1)
**作者：** A. Toufah、R. Saad、M. Y. El Hafidi  
**核心贡献与关注点：** 在六个公开乳腺影像数据集上检查几何、纹理和子集合标识等非诊断信息的标签预测能力，并提出训练前验收关卡，提醒高分可能来自数据捷径而非临床识别能力。

#### 14. [Simulator-as-Proxy World Model for Robot Manipulation](http://arxiv.org/abs/2611.32786v1)
**作者：** T. Liao、M. Huo、H. Li 等  
**核心贡献与关注点：** 提出以显式、可扰动模拟器状态作为代理的 SimPWM，用于检验机器人视频世界模型是否真正遵循代理场景，为评估可控性而非仅视觉逼真度提供抓手。

## 三、研究趋势信号

今日投稿显示，效率研究正从单点压缩走向系统协同：低比特格式、量化组合与 MoE 通信依赖需要共同设计。学习机制则更强调经验利用与能力整合，少样本上下文适应、专家蒸馏和在线流策略均体现这一取向。另一条值得警惕的信号是“部署改变行为”：训练与执行策略偏差、量化后门及医疗数据捷径，推动评估从单一准确率转向全流程可信性验证。

## 四、值得精读

### ① [Eliciting the Recall Capacity of Linear Attention](http://arxiv.org/abs/2611.32969v1)
**理由：** 关联召回直接关系高效序列架构的实用上限。建议重点阅读其任务构造与训练干预对照，判断观察到的差距究竟来自容量、优化还是数据分布，而不只比较最终分数。

### ② [EPRO: Robust Policy Optimization Through an Imperfect Execution-Policy Predictor](http://arxiv.org/abs/2611.32810v1)
**理由：** 问题来自真实 LLM 强化学习流水线，具有较强工程相关性。精读重点应是执行策略如何预测、预测误差如何影响更新，以及该方法适用的系统与偏差条件。

### ③ [Label leakage through file headers](http://arxiv.org/abs/2611.32899v1)
**理由：** 对医疗 AI 和基准建设具有直接的方法论价值。应关注非诊断基线如何设置、数据划分如何控制混杂，以及“训练前验收关卡”能否迁移到其他数据集。

---

**阅读建议：** 架构研究优先读 **线性注意力召回**；训练与系统团队优先读 **EPRO、MXFP4、MoE 通信优化**；评估与医疗团队优先读 **标签泄漏审计**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*