# ArXiv AI 研究日报 2026-11-26

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-11-26 03:58 UTC

---

# ArXiv AI 研究日报
**2026 年 11 月 26 日｜覆盖 cs.AI、cs.CL、cs.LG 相关投稿**

> 本报依据所提供的 50 篇论文标题及摘要片段整理；论文发布日期均为 11 月 25 日。以下为研究方向与潜在价值判断，不涉及未经全文核验的性能结论。

## 一、今日速览

今日最突出的主线是：**从“模型能够完成任务”转向“任务结果是否可信、过程是否安全、能力能否持续保持”**，覆盖推理验证、智能体故障恢复和工程设计修复。长上下文效率研究进一步聚焦“保留什么”，分别从架构层的可学习记忆和推理时的 KV 缓存选择切入。训练方面，扩散语言模型蒸馏与 SFT→RL 工具能力保持研究，提示经典训练经验不能直接跨范式迁移。机器人与多模态评估则更加重视物理可执行性、交互一致性和外部证据，而不只是生成结果的表面合理性。

## 二、重点论文

### 🧠 大语言模型｜架构、训练与评估

**1. [State Space Attention: Learning Context-Dependent Memory Retention](http://arxiv.org/abs/2611.33625v1)**  
**作者：** E. Çakar、C. Pehlevan  
**核心贡献与看点：** 提出 State Space Attention，让模型学习在有界记忆中保留哪些历史信息，将长上下文效率问题从固定压缩策略推进到任务相关的记忆选择。

**2. [Rethinking Knowledge Distillation for Diffusion Language Models](http://arxiv.org/abs/2611.33670v1)**  
**作者：** Y. Sun、Y. Xu、J. Hao 等  
**核心贡献与看点：** 系统研究扩散语言模型的知识蒸馏，并指出经典前向 KL 蒸馏的非直观失效情形，值得用于重新审视自回归模型训练方法的适用边界。

**3. [Refusal Is Not Scored: A Coverage Limit in Content-Based Bias Evaluation](http://arxiv.org/abs/2611.33690v1)**  
**作者：** A. Kashif、M. Sadek、J. Huang 等  
**核心贡献与看点：** 审视偏见评估中剔除拒答的常见做法，指出这一筛选决定了评估能够覆盖哪些行为，提醒研究者不能只看可评分回答中的偏见。

### 🤖 智能体与推理｜工具、证据与安全

**4. [EVA: Evidence-seeking Visual Agent for Hallucination-Resistant Multimodal Reasoning](http://arxiv.org/abs/2611.33706v1)**  
**作者：** T. Lei、Y. Chen、Y. Liu  
**核心贡献与看点：** 围绕主动获取外部视觉证据组织多模态推理，针对自我反思和多智能体讨论可能共同强化错误视觉假设的问题，强调验证证据而非重复推理。

**5. [PRIOR: Pre-Call Reasoning in SFT and Its Influence on Tool-Use Retention under RL](http://arxiv.org/abs/2611.33648v1)**  
**作者：** K. Hu、H. Lee、J. Suh 等  
**核心贡献与看点：** 在近似匹配 token 预算的条件下研究 SFT 数据中的工具调用深度及调用前推理，关注工具能力为何在后续 RL 中保持或退化。

**6. [The Detour Is the Danger: Preserving Security During LLM Agent Recovery](http://arxiv.org/abs/2611.33605v1)**  
**作者：** B. Ma、J. Li、H. Wu 等  
**核心贡献与看点：** 揭示智能体失败后重新规划可能保住任务功能却丢失原有安全保护的风险，将安全评估扩展到异常处理与恢复路径。

**7. [WhatIf: Counterfactual World Models over Action-Grounded Causal Graphs for Robotic Manipulation](http://arxiv.org/abs/2611.33745v1)**  
**作者：** X. Yang、K. Sun、Q. Zhao  
**核心贡献与看点：** 面向机器人操作构建基于动作因果图的反事实世界模型，强调预测各动作的平均结果，不等于能够比较同一物理情境下切换动作的后果。

### 🔧 方法与框架｜验证、基准与效率

**8. [FlashProve-Next: Verifiable Inference for Production LLM APIs](http://arxiv.org/abs/2611.33741v1)**  
**作者：** L. Song  
**核心贡献与看点：** 面向闭源 LLM API 的推理可验证性，关注服务商是否按承诺使用模型、精度、隐藏提示和推理预算，触及模型服务可信交付这一关键基础设施问题。

**9. [Faster and Better Query (FBQ): Learning Future-Position Probes from the First Generated Token](http://arxiv.org/abs/2611.33679v1)**  
**作者：** J. Zou、D. Chen、T. Yuan  
**核心贡献与看点：** 探索利用首个生成 token 学习未来位置的查询探针，以辅助预填充结束时的 KV 缓存保留决策，减少依赖额外自回归草稿的开销。

**10. [CovNovBench: A Benchmark for Evaluating Time Series Foundation Models under Covariate Novelty](http://arxiv.org/abs/2611.33732v1)**  
**作者：** W. Pan、R. K. Selvam、M. W. Mahoney 等  
**核心贡献与看点：** 将时间序列基础模型的评估聚焦于协变量新颖性，检验模型面对不熟悉的未来输入条件时是否可靠，尤其适合审视干预预测场景的泛化能力。

### 📊 应用｜工程、机器人与三维生成

**11. [REFORGE: LLM-Assisted RTL Bug Repair with Structured Context and Verification Feedback](http://arxiv.org/abs/2611.33748v1)**  
**作者：** T. Hossain、S. Paria、A. G. Myers 等  
**核心贡献与看点：** 将结构化上下文与验证反馈用于 RTL 缺陷修复，强调编译或测试通过不足以证明缺陷消除、行为保持、安全性和实现可行性。

**12. [DexEngine: Scaling Human Demonstrations into Physically Executable Whole-Robot Data](http://arxiv.org/abs/2611.33579v1)**  
**作者：** W. Yu、H. Kim、D. Lee 等  
**核心贡献与看点：** 将人类手部—物体演示转化为可用于全机器人训练的数据，重点处理运动学可行性、物理可执行性与规模化生产之间的矛盾。

**13. [Asset4D-Bench: Benchmarking Coding Agents for Editable 3D and 4D Reconstruction](http://arxiv.org/abs/2611.33728v1)**  
**作者：** C. Sun、D. Liu、L. Zhao 等  
**核心贡献与看点：** 通过 114 个条件评估代码智能体从视觉参考重建可编辑 Blender 场景的能力，将对象、运动和交互关系纳入考察，而非只追求画面或轨迹相似。

## 三、研究趋势信号

今日投稿呈现三条相互关联的信号：一是验证从最终答案延伸到推理执行、工程约束和故障恢复路径；二是记忆研究从“存得更多”转向“选择性保留、有效读取与持续利用”；三是评估从静态正确率转向分布变化、拒答覆盖和物理可执行性。共同指向是：下一阶段的能力提升，不仅依赖更强生成，还依赖证据、约束与反馈构成的可靠闭环。

## 四、值得精读

### 1. [State Space Attention](http://arxiv.org/abs/2611.33625v1)
**理由：** 直接触及长上下文模型的核心权衡：有限状态如何承载任务相关信息。精读时应重点检查记忆选择机制、长程依赖任务表现，以及与标准注意力和其他有界记忆方法的公平比较。

### 2. [The Detour Is the Danger](http://arxiv.org/abs/2611.33605v1)
**理由：** 故障恢复是实际智能体系统的必经环节，却容易成为安全盲区。值得重点考察其威胁模型、恢复过程中需要保持的安全约束，以及安全措施是否影响任务恢复成功率。

### 3. [REFORGE](http://arxiv.org/abs/2611.33748v1)
**理由：** 对 AI 编程与自动化工程具有共同启发：**测试通过不等于修复正确**。建议重点阅读其如何区分不同验证维度，以及验证反馈能否避免“修好局部、破坏整体”。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*