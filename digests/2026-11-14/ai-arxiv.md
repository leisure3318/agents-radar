# ArXiv AI 研究日报 2026-11-14

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-11-14 09:55 UTC

---

# ArXiv AI 研究日报
**2026 年 11 月 14 日｜覆盖 50 篇论文，重点推荐 14 篇**

> **阅读说明**：本期依据所提供的标题与截断摘要整理，所列论文发布日期均为 11 月 12 日；未核验全文与实验结果。下文区分研究主张与已验证结论，文末保留其余论文链接。

## 一、今日速览

今日最突出的主线，是从“模型能否完成任务”转向“模型为何这样行动、如何可靠地纠错与接受监督”。目标表征、辩论式学习与单侧可验证奖励，分别从内部机制、监督协议和训练信号切入这一问题。智能体研究进一步关注持续任务中的记忆成本、未标注数据利用与小模型安全边界，体现出更强的部署导向。与此同时，经典能量模型、蒸馏理论与上下文归因算法重新审视效率来源；其中“推理训练快 1,000 倍”等醒目主张，仍需结合具体任务和成本口径阅读。

## 二、重点论文

### 🧠 大语言模型：训练、对齐与内部机制

**1. [Goal Encoding in LLMs](http://arxiv.org/abs/2611.17297v1)**  
**作者**：A. S. Sharma、E. Todd、S. Feucht 等  
**核心贡献与关注点**：通过包含多个子任务的编程环境，研究 LLM 是否具有先于行动、能够指导不同执行路径的目标表征，为理解智能体的目标持续性与行为控制提供实验切口。

**2. [Negative-Only Policy Optimization for One-Sided Verifiable Rewards](http://arxiv.org/abs/2611.17287v1)**  
**作者**：J. Xu、S. He、F. Zhang 等  
**核心贡献与关注点**：形式化“只能可靠发现错误、不能完整确认正确”的奖励场景，探索仅依靠负向验证信号优化策略，有望拓展 RLVR 在不完全可验证任务中的适用范围。

**3. [Towards a Theory of Learnability via Debate](http://arxiv.org/abs/2611.17303v1)**  
**作者**：T. Lechner、V. Pathak、S. Sabato 等  
**核心贡献与关注点**：从可学习性角度研究由人类裁判评判模型辩论的监督协议，为“较弱监督者能否监督更强模型”提供理论分析路径。

**4. [Two mathematical models of knowledge distillation](http://arxiv.org/abs/2611.17230v1)**  
**作者**：A. Xie、L. Schmidt、J. Duchi  
**核心贡献与关注点**：提出并分析蒸馏的数学模型，支持“收益可能来自更易优化的损失景观，而不只是更好的目标模型”这一解释，有助于澄清蒸馏有效性的机制。

### 🤖 智能体与推理：持续学习、记忆与安全

**5. [AgentSSL: Can MLE Agents Leverage Unlabeled Data?](http://arxiv.org/abs/2611.17323v1)**  
**作者**：E. Lin、A. Sarkar、Z. Liu 等  
**核心贡献与关注点**：将机器学习工程智能体的研究范围从全监督任务扩展到未标注数据利用，检验自动化流水线能否真正缓解标签稀缺，而非仅替代人工调参。

**6. [CoReMem: Cost-Internalizing Memory for Successive Coding Tasks with Prospective Valuation](http://arxiv.org/abs/2611.17316v1)**  
**作者**：P. Li、H. Verma、S. Zhou 等  
**核心贡献与关注点**：面向持续演化代码仓库中的连续任务，将记忆的未来效用与写入、读取成本共同纳入决策，把“记住多少”转化为具有资源约束的优化问题。

**7. [Classical Energies Learn to Reason 1,000x Faster than Looped Models](http://arxiv.org/abs/2611.17309v1)**  
**作者**：B. Hoover、H. Blayney、J. C. R. Whittington  
**核心贡献与关注点**：以经典能量下降重新审视数独、迷宫等推理任务，挑战循环模型的训练效率与稳定性；标题中的倍数不应直接外推到通用语言推理。

**8. [CapLite: Prompt-Injection Defense for Small Language Model Agents without Model-Written Security Artifacts](http://arxiv.org/abs/2611.17115v1)**  
**作者**：Z. Xu、W. Liu、H. Nakayama  
**核心贡献与关注点**：探索不依赖模型自行生成安全策略、程序或约束清单的提示注入防御，直面小模型可能无法可靠承担安全配置编写的问题。

### 🔧 方法与框架：归因与评估可信度

**9. [Sketching Language Models for Context Attribution](http://arxiv.org/abs/2611.17313v1)**  
**作者**：C. Liaw、A. Mehta、G. Velegkas 等  
**核心贡献与关注点**：针对逐项移除上下文通常需要大量模型调用的问题，在稳定性假设下研究更高效的归因算法，值得关注其近似误差与调用成本之间的权衡。

**10. [When Both Sides Adapt: The Challenges of Evaluating Interactive LLM Systems](http://arxiv.org/abs/2611.17239v1)**  
**作者**：H. Li  
**核心贡献与关注点**：指出用户会根据模型反馈调整提示和任务难度，导致评测样本本身受模型影响，提醒交互系统评估不能简单沿用静态测试集逻辑。

**11. [Cited but Unused: Parametric Provenance in Retrieval-Augmented Generation](http://arxiv.org/abs/2611.17161v1)**  
**作者**：T. Abbas、T. Zia、D. Windridge  
**核心贡献与关注点**：通过替换检索文本中的事实进行反事实检验，区分“引用了来源”与“实际依赖来源”，揭示常规引用核验可能遗漏的 RAG 可信度问题。

### 📊 应用：多模态与高风险决策

**12. [Unbundling Multimodal Vision Encoding](http://arxiv.org/abs/2611.17334v1)**  
**作者**：E. Brown、C. Hoang、S. Qian 等  
**核心贡献与关注点**：将视觉编码器中捆绑的设计选择拆开研究，为比较预训练编码器、联合从零训练和无独立编码器路线提供更清晰的分析框架。

**13. [Consistent Video-to-Video Translation via Explicit Correspondences](http://arxiv.org/abs/2611.17298v1)**  
**作者**：G. Parmar、Z. Li、R. Zhang 等  
**核心贡献与关注点**：利用显式对应关系处理实时视频转换中的长程一致性问题，针对固定因果窗口难以保留远距离历史信息的局限提出解决思路。

**14. [Support-Constrained Offline Policy Improvement for Pediatric ECMO from Limited Clinical Data](http://arxiv.org/abs/2611.17134v1)**  
**作者**：F. G. Darvishvand、S. Mathur、N. Prabhakar 等  
**核心贡献与关注点**：在有限儿科 ECMO 数据上研究受数据支持范围约束的离线策略改进，关注如何避免分布外高风险动作；离线结果仍不能替代临床安全验证。

## 三、研究趋势信号

今日投稿呈现三条相互关联的信号：一是监督从完整判分转向部分可验证，包括负向反馈、辩论与支持约束；二是智能体优化开始计入记忆读写、工具执行和安全配置的真实成本；三是评估从结果正确走向过程可信，关注引用是否真正被使用、用户适应是否改变测试分布、实现是否忠于协议。共同指向：下一阶段的竞争不仅是能力上限，更是可审计、可部署的可靠性。

## 四、值得精读

### 1. **Two mathematical models of knowledge distillation**
[论文链接](http://arxiv.org/abs/2611.17230v1)  
**理由**：蒸馏广泛用于模型压缩与能力迁移，但机制解释仍不统一。建议重点阅读其建模假设，以及“优化更容易”的解释能否覆盖实际语言模型训练。

### 2. **Cited but Unused**
[论文链接](http://arxiv.org/abs/2611.17161v1)  
**理由**：直接触及 RAG 产品中“有引用就可信”的误区。重点检查反事实替换是否有效、如何区分参数知识与检索依赖，以及指标能否指导系统改进。

### 3. **CapLite**
[论文链接](http://arxiv.org/abs/2611.17115v1)  
**理由**：小模型智能体的安全机制具有直接部署价值。建议核查威胁模型、防御由什么机制执行，以及安全收益是否以任务完成率下降为代价。

## 附：其余 36 篇论文链接索引

*以下编号对应原始清单；为便于检索，部分标题采用中文主题简写，不代表重要性排序。*

| 编号 | 论文／主题 | 编号 | 论文／主题 |
|---|---|---|---|
| 2 | [ArchSpace：LLM 架构研究记录与索引](http://arxiv.org/abs/2611.17332v1) | 3 | [投资约束内化与神经符号强化学习](http://arxiv.org/abs/2611.17329v1) |
| 5 | [扩散语言模型何时应重新生成](http://arxiv.org/abs/2611.17320v1) | 7 | [快速学习与组合结构](http://arxiv.org/abs/2611.17314v1) |
| 10 | [保险定价模型的结构稳定性](http://arxiv.org/abs/2611.17308v1) | 12 | [FLEX-LBP：可学习局部二值模式](http://arxiv.org/abs/2611.17302v1) |
| 15 | [Metal Sandbox：GPU 编程智能体执行隔离](http://arxiv.org/abs/2611.17294v1) | 17 | [Synthesis Smuggling：敏感属性隐写泄露](http://arxiv.org/abs/2611.17280v1) |
| 18 | [LiveGeo：动态地理环境智能体基准](http://arxiv.org/abs/2611.17267v1) | 19 | [使用 LLM 编程量子电路参数](http://arxiv.org/abs/2611.17246v1) |
| 20 | [Ballad：启发式发现中的模型路由](http://arxiv.org/abs/2611.17241v1) | 22 | [Al-Ghasali：教法规则计算框架](http://arxiv.org/abs/2611.17235v1) |
| 24 | [自选择偏差下的多项式时间线性回归](http://arxiv.org/abs/2611.17228v1) | 25 | [LightGCN 的层论启发评分扩展](http://arxiv.org/abs/2611.17226v1) |
| 26 | [二维与三维电阻抗断层成像数据](http://arxiv.org/abs/2611.17225v1) | 27 | [组合伯努利工厂](http://arxiv.org/abs/2611.17223v1) |
| 28 | [双智能体对话式考试](http://arxiv.org/abs/2611.17220v1) | 29 | [对抗 MDP 的反馈延迟与遗憾界](http://arxiv.org/abs/2611.17214v1) |
| 30 | [稀疏卷积的理论与实证分析](http://arxiv.org/abs/2611.17212v1) | 31 | [高光谱图像无监督图表示学习](http://arxiv.org/abs/2611.17199v1) |
| 32 | [离散折纸设计的可解释吸引域选择](http://arxiv.org/abs/2611.17196v1) | 33 | [LoRA 容量利用与学习—遗忘权衡](http://arxiv.org/abs/2611.17191v1) |
| 34 | [Cortex-FL：智能体协调联邦学习](http://arxiv.org/abs/2611.17186v1) | 35 | [输出格式与小模型语义解析静默错误](http://arxiv.org/abs/2611.17169v1) |
| 36 | [长程智能体中的行动者、裁判与教师](http://arxiv.org/abs/2611.17167v1) | 37 | [线性循环记忆的表示理论](http://arxiv.org/abs/2611.17162v1) |
| 39 | [AeroZoo：空气动力学基础模型基准](http://arxiv.org/abs/2611.17152v1) | 40 | [眼动与多层融合偏好预测](http://arxiv.org/abs/2611.17145v1) |
| 41 | [逻辑回归投毒攻击的凸分析重构](http://arxiv.org/abs/2611.17143v1) | 42 | [ISLA：边界驱动 PDE 的坐标无关 Transformer](http://arxiv.org/abs/2611.17141v1) |
| 44 | [忠于论文协议的联邦学习实验检查](http://arxiv.org/abs/2611.17129v1) | 45 | [小模型临床推理的可微长度控制](http://arxiv.org/abs/2611.17128v1) |
| 46 | [STeP-C：分布式光纤传感实时压缩](http://arxiv.org/abs/2611.17126v1) | 47 | [高分辨率结合模型所需 DEL 规模估计](http://arxiv.org/abs/2611.17121v1) |
| 48 | [MMD 下的贝尔曼收缩统一框架](http://arxiv.org/abs/2611.17116v1) | 50 | [面向自主 AI 的制度设计](http://arxiv.org/abs/2611.17114v1) |

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*