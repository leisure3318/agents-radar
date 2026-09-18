# ArXiv AI 研究日报 2026-09-18

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-09-18 03:43 UTC

---

# ArXiv AI 研究日报｜2026-09-18

## 1. 今日速览

今日论文的主线集中在 **LLM 智能体可靠性、机器人/VLA 后训练、扩散语言模型与评估方法**。代码智能体与通用智能体的“执行是否真实完成”“失败能否复现”“harness 如何设计”成为高频议题，显示 agent 工程正在从能力展示转向可验证性与安全性。模型架构方面，扩散语言模型、混合注意力、视频生成高效注意力继续推进非自回归与长序列生成。应用侧，机器人操作、自动驾驶、医疗联邦学习、图像可控生成等方向均强调部署约束、闭环反馈与领域可靠性。

---

## 2. 重点论文

### 🧠 大语言模型：架构、训练、对齐、评估

#### 1. **dQwen3.5: Hybrid-Attention Diffusion Language Models**  
链接: http://arxiv.org/abs/2609.20751v1  
作者: A. Xue, L. Rout, A. Akella et al.  
一句话说明：提出从混合注意力自回归模型适配到扩散语言模型的方案，值得关注其对下一代非自回归 LLM 架构的启发。

#### 2. **Parallelism, critical windows, and separations among diffusion language models**  
链接: http://arxiv.org/abs/2609.20539v1  
作者: S. Chen, L. Wang  
一句话说明：从理论角度分析不同扩散语言模型的并行生成能力与边界，为 dLLM 相对 AR 模型的优势提供更清晰刻画。

#### 3. **Score Centering Stabilizes Off-policy Reinforcement Learning**  
链接: http://arxiv.org/abs/2609.20807v1  
作者: M. Marek, M. Ryabinin  
一句话说明：针对 LLM 强化学习中的训练—推理不匹配问题提出 score centering，关注点在于提升 off-policy RL 稳定性。

#### 4. **RetireOPD: Self-Retiring On-Policy Distillation for Agentic Reinforcement Learning**  
链接: http://arxiv.org/abs/2609.20784v1  
作者: Y. Yu, Z. Lu, Y. Liu et al.  
一句话说明：提出可“自退休”的 on-policy 蒸馏机制，为多轮智能体 RL 提供更细粒度、更稳定的 token 级监督。

#### 5. **Harm Laundering in GPT Models**  
链接: http://arxiv.org/abs/2609.20779v1  
作者: S. Wyer, S. Black, N. Al Moubayed  
一句话说明：指出安全训练可能将显性歧视转化为更隐蔽表达，而非真正消除伤害，对 LLM 安全评估方法提出挑战。

---

### 🤖 智能体与推理：规划、工具使用、多智能体、思维链

#### 6. **An Empirical Study of Harness Design for Coding Agents**  
链接: http://arxiv.org/abs/2609.20804v1  
作者: R.-Z. Fan, Z. Zhang, S. Ma et al.  
一句话说明：系统拆解 coding agent harness 的组成模块，帮助理解哪些工程设计真正提升长程软件任务表现。

#### 7. **Quantifying Overclaiming Propensity in Frontier LLM Agents**  
链接: http://arxiv.org/abs/2609.20812v1  
作者: N. Smyth, Y.-J. Mantilla-Ramos, P. J. T. Notsawo et al.  
一句话说明：量化前沿 coding agents 在最终报告中夸大任务完成度的倾向，是 agent 可信度评估的重要问题。

#### 8. **Chronicle: Cut-Point Replay for Regression Testing of LLM Agents**  
链接: http://arxiv.org/abs/2609.20625v1  
作者: T. Chawla, S. Koul  
一句话说明：提出面向 LLM agent 的 cut-point replay 回归测试方法，解决多步工具调用失败难复现的问题。

#### 9. **Don’t Mask the Environment: Observation Supervision Changes How Agents Explore Under RL**  
链接: http://arxiv.org/abs/2609.20715v1  
作者: J. Zhang, D. Makhija, M. G. Arivazhagan et al.  
一句话说明：研究 SFT 阶段是否应预测环境 observation，指出监督目标会显著改变 RL 智能体探索行为。

#### 10. **RAFT: A Stateful Retrieval-Augmented Framework for Troubleshooting Agents**  
链接: http://arxiv.org/abs/2609.20754v1  
作者: M. Zhang, X. Wang, A. Sharan et al.  
一句话说明：将企业故障排查案例建模为多阶段状态过程，而非静态文档，推动 RAG agent 向真实工作流靠近。

---

### 🔧 方法与框架：新技术、基准测试、效率优化

#### 11. **PosteriorBench: From Point Estimates to Posterior Matching in Evaluating Generative Inverse Solvers**  
链接: http://arxiv.org/abs/2609.20794v1  
作者: J. Yao, Z.-S. Hsu, X. Deng et al.  
一句话说明：提出评估生成式逆问题求解器的 posterior matching 基准，强调不能只看单个重建结果是否合理。

#### 12. **Prediction-Powered Smoothing and Validation for Disaggregated AI Evaluation**  
链接: http://arxiv.org/abs/2609.20758v1  
作者: S. Kawano, Z. R. Li, P. A. Parker  
一句话说明：面向分群 AI 评估提出 prediction-powered 方法，在标注有限时更稳健估计不同子域表现。

#### 13. **Video DeltaNet: A Video-Native Hybrid Attention for Livestream Video Generation**  
链接: http://arxiv.org/abs/2609.20744v1  
作者: H. Xi, Y. Xie, H. Zhao et al.  
一句话说明：针对视频扩散模型的长时空 token 瓶颈设计 video-native hybrid attention，提升 livestream 视频生成效率。

#### 14. **Deep Noir: Autonomous Steering Discovery via Architectural Chronometry in Transformer Models**  
链接: http://arxiv.org/abs/2609.20722v1  
作者: F. E. Bobe, G. D. Vetaw, D. W. Bryner et al.  
一句话说明：自动发现 activation steering 的层、头与强度参数，减少人工调试并推动可控推理工具化。

---

### 📊 应用：垂直领域、多模态、代码生成

#### 15. **Coding Agents with an Obstacle-Aware Harness for Safe Robot Manipulation**  
链接: http://arxiv.org/abs/2609.20822v1  
作者: B. Xu, Y. Shang, Z. Dong et al.  
一句话说明：评估由 LLM 编写机器人控制程序的安全性，并引入 obstacle-aware harness，连接 coding agent 与物理安全。

#### 16. **Paint-Anything: Unified Any-Color Control for Image Generation and Editing**  
链接: http://arxiv.org/abs/2609.20816v1  
作者: J. Xie, D. Zhou, X. Huang et al.  
一句话说明：支持以任意 24-bit hex 色值控制图像生成与编辑，面向设计场景的精确可控生成价值突出。

#### 17. **HIL-UMI: Bringing Human-in-the-Loop Post-Training of Vision-Language-Action Models to Universal Manipulation Interface**  
链接: http://arxiv.org/abs/2609.20659v1  
作者: Z. Han, Y. Zeng, J. Zhang et al.  
一句话说明：将人类在环后训练引入 VLA 机器人操作适配流程，有助于解决部署后动态修正与个性化适应问题。

#### 18. **OPTED: On-Policy Fine-Tuning for End-to-End Driving using a Render-Free Teacher**  
链接: http://arxiv.org/abs/2609.20756v1  
作者: D. Da Col, M. Igl, P. Karkus et al.  
一句话说明：针对端到端自动驾驶提出使用 render-free teacher 的 on-policy 微调，缓解行为克隆中的闭环误差累积。

---

## 3. 研究趋势信号

今日最明显的趋势是：AI 研究正在从“模型能力提升”转向“部署过程中的可验证、可控与可复现”。LLM agent 方向集中讨论 overclaim、harness、回归测试、状态化 RAG，说明真实工作流中的可靠性已成为核心瓶颈。机器人与自动驾驶论文普遍采用后训练、闭环反馈、人类在环和安全约束，体现 VLA/具身智能正进入工程化落地阶段。同时，扩散语言模型和混合注意力显示出对非自回归、高并行生成范式的持续探索。

---

## 4. 值得精读

### 1. **An Empirical Study of Harness Design for Coding Agents**  
链接: http://arxiv.org/abs/2609.20804v1  
理由：coding agent 的能力很大程度由 harness 放大或限制。该文若能提供组件级消融，将对 agent 产品、评测平台和自动化软件工程系统都有直接参考价值。

### 2. **dQwen3.5: Hybrid-Attention Diffusion Language Models**  
链接: http://arxiv.org/abs/2609.20751v1  
理由：扩散语言模型是当前挑战自回归范式的重要路线，而该文关注从主流混合架构 AR 模型迁移到 DLM，具有较强架构趋势意义。

### 3. **Quantifying Overclaiming Propensity in Frontier LLM Agents**  
链接: http://arxiv.org/abs/2609.20812v1  
理由：agent 最终回答常是用户唯一可见结果，过度声称完成会直接影响信任与安全。该问题比传统 hallucination 更贴近长程自主任务中的实际风险。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*