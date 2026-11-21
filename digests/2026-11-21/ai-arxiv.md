# ArXiv AI 研究日报 2026-11-21

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-11-21 02:59 UTC

---

# ArXiv AI 研究日报
**2026 年 11 月 21 日｜覆盖 50 篇论文｜重点推荐 14 篇**

> **说明：**本报依据所提供的标题与摘要片段整理，论文标注发布日期均为 **2026 年 11 月 19 日**。以下贡献与判断未经过全文核验；涉及性能提升、理论边界及实际可用性的结论，仍需结合实验与代码审阅。

## 一、今日速览

今日最值得关注的主线是：**模型能力的提升，究竟来自新知识、新表征，还是已有能力的重新调用？** 扩散模型后训练与语言模型读出机制的研究，为这一问题提供了不同切入点。智能体研究则进一步转向部署约束，强调小模型决策、长期记忆压缩与安全事件复现。与此同时，混合架构推理服务、消费级硬件训练和推理蒸馏，持续推动能力与成本解耦。具身智能方向，人形机器人的全身经验数据、长时程执行与诊断评测正在形成互补的研究链条。

## 二、重点论文

### 🧠 大语言模型：训练、表征与决策

#### 1. [Represented but misread: Post-training changes how language models read out what they represent](http://arxiv.org/abs/2611.26584v1)
**作者：**J. Laubrock  
**核心贡献与看点：**对比六组基础模型及其后训练版本的线性探针与实际回答，区分“内部是否表征信息”和“能否正确读出信息”，为定位后训练收益与退化提供机制分析视角。

#### 2. [AutoMaster: Autonomous Post-Training by Making the Same Model a Better Teacher](http://arxiv.org/abs/2611.26510v1)
**作者：**G. Chen、S. Sun、F. Meng 等  
**核心贡献与看点：**提出以自然语言技能指导的 Skill-FT，不仅依赖任务成功筛选教师轨迹，还关注其中的无依据假设、重复与表面验证，值得关注其如何改善自训练信号质量。

#### 3. [GLiDE: A Fast, Calibrated Decision Model Distilled from Reasoning Teachers](http://arxiv.org/abs/2611.26509v1)
**作者：**S. Allahyar、J. White、D. Atreja 等  
**核心贡献与看点：**将推理教师的能力蒸馏到单次前向、直接评分候选答案的决策模型，探索在不生成推理文本的情况下兼顾决策质量、置信度校准与低成本。

### 🤖 智能体与推理：决策、记忆与安全

#### 4. [Seer: Guiding Small Deep-Research Agents with Shared Decision Models](http://arxiv.org/abs/2611.26423v1)
**作者：**Y. Zhou、Y. Zhou、Y. Li 等  
**核心贡献与看点：**以共享决策模型指导小型深度研究智能体的搜索、阅读与验证，针对端侧隐私和算力限制，探索将行动决策能力与大型生成模型解耦。

#### 5. [MemFolder: Structure-Guided Memory Folding for Efficient Agent Memory Management](http://arxiv.org/abs/2611.26427v1)
**作者：**X. Liu、C. Lu、J. Wang 等  
**核心贡献与看点：**提出结构引导的记忆折叠，同时针对长期记忆条目增长带来的检索开销与检索上下文增长带来的预填充开销，切中长期智能体的双重成本瓶颈。

#### 6. [Replication of Agentic Security Events: Audit and Investigation (ROGUE-AI)](http://arxiv.org/abs/2611.26553v1)
**作者：**M. Wang、M. Alam、K. Nakka 等  
**核心贡献与看点：**围绕真实报道中的智能体安全事件开展复现与调查，推动风险分析从事故叙述走向可检验的失效条件与证据。

### 🔧 方法与框架：机制理解、系统效率与优化

#### 7. [RL Post-Training in Diffusion Transformers Is Activation Steering](http://arxiv.org/abs/2611.26627v1)
**作者：**T. H. S. Meral、K. Oktay、A. Helbling 等  
**核心贡献与看点：**从激活引导视角解释扩散 Transformer 的强化学习后训练，为理解视觉质量、文字渲染与组合能力的提升机制提供值得验证的解释框架。

#### 8. [TideCache: Efficient Hybrid LLM Serving with Transparent Cache Management and Layer-Wise Streaming](http://arxiv.org/abs/2611.26619v1)
**作者：**J. Luo、X. Yao、S. Yang 等  
**核心贡献与看点：**面向混合注意力与有界状态层的异构缓存，在 CPU–GPU 超级芯片上结合缓存管理与逐层流式处理，回应新架构下推理服务的内存调度问题。

#### 9. [A new algorithmic approach for finding flat minima: critically damped Polyak stepsizes](http://arxiv.org/abs/2611.26475v1)
**作者：**F. Caporali、J. M. Altschuler、B. Hanin  
**核心贡献与看点：**提出临界阻尼 Polyak 自适应步长，使梯度下降偏向平坦极小值，并在一类局部二次目标上给出锐度与损失下降的全时间保证。

#### 10. [A CPU Inside an LLM: Zero-Gradient Compilation of Exact Circuits into Pretrained Weights](http://arxiv.org/abs/2611.26450v1)
**作者：**T. Sah  
**核心贡献与看点：**提出将确定性计算电路以闭式、零梯度方式植入预训练权重，尝试绕开多位数算术的不可靠性；其适用范围、模型能力保留与扩展成本尤其值得审查。

### 📊 应用：多模态、具身智能与信息生态

#### 11. [Depth Pro 2: Sharp and Temporally Consistent Metric Monocular Depth](http://arxiv.org/abs/2611.26603v1)
**作者：**P. Hu、M. Mihajlovic、L. Duong 等  
**核心贡献与看点：**针对单目深度估计中边界锐度与视频时序一致性的权衡，研究全分辨率图像和视频的度量深度估计，具有机器人感知与空间内容制作价值。

#### 12. [PGX: Physically Grounded Execution for Long-Horizon Humanoid Loco-Manipulation](http://arxiv.org/abs/2611.26596v1)
**作者：**K. Lu、C. Ma、I. Havoutis  
**核心贡献与看点：**针对单体 VLA 难以同时协调时序结构、技能与执行精度的问题，提出物理约束下的长时程移动操作执行框架。

#### 13. [GEOHunter: Mapping a Generative Engine Optimization Network in the Wild](http://arxiv.org/abs/2611.26564v1)
**作者：**S. Tang、P. Wang、Y. Li 等  
**核心贡献与看点：**研究通过用户生成内容平台发布推广文章的生成式引擎优化网络，将 AI 答案可信度问题扩展到上游检索来源与商业内容生态。

#### 14. [Awaken-HI: Scaling Humanoid Intelligence with Whole-Body Human Experience](http://arxiv.org/abs/2611.26420v1)
**作者：**EngineAI  
**核心贡献与看点：**围绕日常活动中的同步全身运动经验构建 Awaken-Human，补足现有第一视角视频对全身动作监督的不足，值得关注其数据采集与机器人迁移路径。

## 三、研究趋势信号

今日投稿显示，研究重心正从“扩大模型”转向“重组能力”：后训练读出分析、激活引导与推理蒸馏，都在追问已有能力如何被低成本调用。智能体开始补齐长期运行所需的记忆管理、事故复现和攻击溯源。具身智能则沿数据、执行、诊断三条线并进。另一个信号是，可信评估正在超越最终成功率，转向相关采样、专家状态漂移及检索来源操纵等真实条件。

## 四、值得精读

### ① 后训练究竟改变了什么？
**[Represented but misread](http://arxiv.org/abs/2611.26584v1)**  
适合研究后训练、对齐与可解释性的读者。重点审查探针表现与模型回答之间的差异，能否排除提示形式、探针容量及任务选择的影响；这决定了“表征未变、读出改变”的解释力度。

### ② 混合架构推理的系统瓶颈在哪里？
**[TideCache](http://arxiv.org/abs/2611.26619v1)**  
适合推理系统与基础设施团队。重点阅读不同层缓存的生命周期、数据迁移策略，以及长上下文和高并发下的吞吐—延迟权衡，判断收益是否依赖特定硬件。

### ③ 确定性计算能否直接植入语言模型？
**[A CPU Inside an LLM](http://arxiv.org/abs/2611.26450v1)**  
概念新颖，但也最需要核验。建议重点检查“精确”的输入域、权重修改规模、数值精度要求，以及植入后是否损害原模型能力，避免把受限构造误读为通用推理突破。

## 附：其余 36 篇论文链接索引

*以下按主题列出，保留全部原始 ArXiv 链接，便于继续筛选。*

| 方向 | 论文 |
|---|---|
| 游戏智能体 | [2. PlayCraft：从智能体游玩经验设计游戏](http://arxiv.org/abs/2611.26624v1) |
| 潜在动作学习 | [4. One Prior, Two Dynamics：复用视频扩散先验](http://arxiv.org/abs/2611.26617v1) |
| 机器人评测 | [5. AgentRoboCritic：前沿智能体直接控制机器人](http://arxiv.org/abs/2611.26613v1) |
| 传感器数据 | [6. Bio-PM-Guided Synthetic IMU Generation](http://arxiv.org/abs/2611.26607v1) |
| 软件安全综述 | [8. SoK：LLM 软件漏洞研究能力演进](http://arxiv.org/abs/2611.26601v1) |
| 主动特征获取 | [9. Active Feature Acquisition by Distilling an Oracle Teacher](http://arxiv.org/abs/2611.26598v1) |
| 推理可靠性 | [11. 相关推理下的随时有效自一致性认证](http://arxiv.org/abs/2611.26592v1) |
| 多模态可解释性 | [12. Probing the “Conscious” Mind](http://arxiv.org/abs/2611.26590v1) |
| 芯片验证 | [13. Verify the Verifier：基于规格的 LLM 交叉检查](http://arxiv.org/abs/2611.26588v1) |
| 分层图像生成 | [14. ProtoDiffusion：Token-per-Layer 建模](http://arxiv.org/abs/2611.26586v1) |
| 图像编辑安全 | [16. Text-Aware, Vision-Blind](http://arxiv.org/abs/2611.26569v1) |
| 数字病理 | [18. 多机构 Barrett 食管异型增生分级](http://arxiv.org/abs/2611.26562v1) |
| 多模态偏差评测 | [19. MM-SystemOneBias](http://arxiv.org/abs/2611.26557v1) |
| 欺骗检测 | [21. The Geometry of Lies](http://arxiv.org/abs/2611.26545v1) |
| 流式数字人 | [22. AURA：音频驱动流式 Avatar](http://arxiv.org/abs/2611.26540v1) |
| 交叉群体公平性 | [23. LLM GerryMandering](http://arxiv.org/abs/2611.26538v1) |
| 排序系统优化 | [24. 成本感知的智能体式特征优化](http://arxiv.org/abs/2611.26531v1) |
| 智能体攻击溯源 | [25. Backtracking Agent Applications Security Incidents](http://arxiv.org/abs/2611.26525v1) |
| 神经成像 | [26. 钙成像轨迹提取的确定性时间嵌入](http://arxiv.org/abs/2611.26522v1) |
| 行为预测 | [27. The Window Lever：观测窗口的影响](http://arxiv.org/abs/2611.26521v1) |
| 差分隐私理论 | [28. 总体强凸条件下 Noisy SGD 的极小极大最优性](http://arxiv.org/abs/2611.26515v1) |
| 多语言检索 | [29. 英语与马拉地语政府服务混合检索](http://arxiv.org/abs/2611.26514v1) |
| 持续强化学习 | [32. Grid Cells as Spectral Successor Features](http://arxiv.org/abs/2611.26504v1) |
| 医疗报告质检 | [33. 胸部 X 光报告多模态错误检测](http://arxiv.org/abs/2611.26492v1) |
| 情境任务指导 | [34. FLUID：灵活、证据驱动的实时指导](http://arxiv.org/abs/2611.26491v1) |
| 软件工程 | [35. BuildPredictor：预测后续构建结果](http://arxiv.org/abs/2611.26476v1) |
| 体育决策 | [37. Monte Carlo Pass Search for Setpieces](http://arxiv.org/abs/2611.26464v1) |
| 动力系统 | [38. Neural Conditional Gaussian Model](http://arxiv.org/abs/2611.26463v1) |
| 贝叶斯优化 | [39. Bayesian optimization on amortized search space](http://arxiv.org/abs/2611.26459v1) |
| 量子纠错 | [41. 面向实时量子纠错的经典硬件扩展](http://arxiv.org/abs/2611.26447v1) |
| 具身诊断基准 | [42. Mind2Act World](http://arxiv.org/abs/2611.26444v1) |
| 能源管理 | [43. 比利时电气化住宅的高级能源管理收益](http://arxiv.org/abs/2611.26441v1) |
| 人机协同 | [44. Learning to Defer under Expert Drift](http://arxiv.org/abs/2611.26440v1) |
| 低成本图像训练 | [45. Asuka-FM：消费级硬件上的文生图预训练](http://arxiv.org/abs/2611.26437v1) |
| 贝叶斯神经网络 | [47. Exact Bayesian layers via characteristic functions](http://arxiv.org/abs/2611.26426v1) |
| 教育测量 | [49. 用推理轨迹分析构建可解释 Q 矩阵](http://arxiv.org/abs/2611.26422v1) |

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*