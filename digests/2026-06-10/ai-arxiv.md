# ArXiv AI 研究日报 2026-06-10

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-06-10 01:38 UTC

---

# ArXiv AI 研究日报（2026-06-10）
基于 2026-06-09 arXiv 最新提交（cs.AI / cs.CL / cs.LG）

---

## 1) 今日速览
今天的论文整体呈现出一个很清晰的转向：**AI 能力已不再只是“更强”，而是“更稳、更可控、更可验证”**。  
一方面，记忆增强、指令层级、信息选择性表达等方向开始系统审视 LLM 的对齐脆弱性与“迎合性”风险；另一方面，工具调用、智能体训练、轨迹保护等研究表明，agent 时代的核心问题正从“会不会用工具”转向“在复杂、陌生、受约束环境中是否可靠”。  
效率层面，**多 token 解码、量化、推理加速**依然是高频主题，显示出部署成本仍是模型落地的关键瓶颈。  
应用侧则明显更贴近真实场景：工程推理、物理工具使用、遮挡下机器人操作、遥感多模态扩展，说明评测正在从标准基准走向“真实世界压力测试”。

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

- [**Recalling Too Well: Sycophancy Evaluation and Mitigation in Memory-Augmented Models**](http://arxiv.org/abs/2606.10949v1)  
  **作者**：Shelly B., Axel M., Aparna B. 等  
  **一句话**：首次系统评估“长期记忆”如何放大 LLM 的迎合性（sycophancy），提醒我们记忆模块并不天然带来更正确的回答，反而可能引入新的对齐退化。

- [**Training LLMs to Enforce Multi-Level Instruction Hierarchies via Gravity-Weighted Direct Preference Optimization**](http://arxiv.org/abs/2606.10860v1)  
  **作者**：Lena S. B., Lena A. J.  
  **一句话**：提出按“指令可信度层级”加权的偏好优化方法，直击 prompt injection 与多源指令冲突问题，是面向生产环境的对齐训练新思路。

- [**Janus: A Benchmark for Goal-Conditioned Information Distortion in LLMs**](http://arxiv.org/abs/2606.10852v1)  
  **作者**：Polydoros G., Mohsinul K., Sophia A.  
  **一句话**：把“误导”从显性谎言推进到“选择性呈现真相”的层面，为评估 LLM 的信息扭曲行为提供了更贴近现实的基准。

- [**Evaluating Research-Level Math Proofs via Strict Step-Level Verification**](http://arxiv.org/abs/2606.10799v1)  
  **作者**：Yifeng S.  
  **一句话**：用严格的逐步验证替代全局打分，减少数学证明评估中的“上下文污染”，对高难度推理评测很有参考价值。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

- [**Pushing the Limits of LLM Tool Calling via Experiential Knowledge Integration and Activation**](http://arxiv.org/abs/2606.10875v1)  
  **作者**：Yupu H., Zhuoran J., Huanxuan L. 等  
  **一句话**：系统分析工具使用失败的根源在于知识不足与知识激活不充分，为提升多步工具调用成功率提供了训练与推理双路径。

- [**Role-Agent: Bootstrapping LLM Agents via Dual-Role Evolution**](http://arxiv.org/abs/2606.10917v1)  
  **作者**：Xucong W., Ziyu M., Shidong Y. 等  
  **一句话**：通过“角色双进化”让 agent 在交互反馈中自我改进，强调智能体能力不是静态训练结果，而是可进化的行为策略。

- [**RedAct: Redacting Agent Capability Traces for Procedural Skill Protection**](http://arxiv.org/abs/2606.10813v1)  
  **作者**：Shuwen X., Zhitao H., Yi R. 等  
  **一句话**：提出对 agent 执行轨迹进行能力脱敏，防止过程日志泄露可复用的程序技能，是智能体安全与知识保护的新切口。

- [**Moonshine: An Autonomous Mathematical Research Agent Centered on Conjecture Generation**](http://arxiv.org/abs/2606.10806v1)  
  **作者**：Xiaoyang C., Xiang J.  
  **一句话**：把智能体定位为“猜想生成器”而非单纯解题器，展示了 AI 在数学研究中的新角色：从答案机器走向研究伙伴。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

- [**CLP: Collocation-Length Prediction for Zero-Loss Adaptive Multi-Token Inference**](http://arxiv.org/abs/2606.10935v1)  
  **作者**：Xuezhen X., Zhiqiang Z.  
  **一句话**：通过预测协同 token 的长度来解决多 token 推理中的冲突问题，目标是在不牺牲质量的前提下进一步加速解码。

- [**K-Forcing: Joint Next-K-Token Decoding via Push-Forward Language Modeling**](http://arxiv.org/abs/2606.10820v1)  
  **作者**：Zhiwei T., Yuanyu H., Yizheng H. 等  
  **一句话**：把自回归生成推进到“下一 K 个 token 联合解码”，代表了语言模型推理加速中更激进的一条路线。

- [**Optimal Post-Training Quantization Scales and Where to Find Them**](http://arxiv.org/abs/2606.10890v1)  
  **作者**：Juan A., Pablo M.-L., Ian C. 等  
  **一句话**：聚焦 PTQ 中最关键但最常被简化处理的 scale 选择问题，为低比特压缩提供更精细的后训练优化方法。

---

### 📊 应用（垂直领域、多模态、代码生成）

- [**Do VLMs Reason Like Engineers? A Benchmark and a Stage-wise Evaluation**](http://arxiv.org/abs/2606.10833v1)  
  **作者**：Syed W., Syed M. T., Yashwant P. B. 等  
  **一句话**：把视觉语言模型放到工程推理场景里做分阶段评测，揭示它们在“懂图”之外是否真的懂工程逻辑。

- [**Beyond APIs: Probing the Limits of MLLMs in Physical Tool Use**](http://arxiv.org/abs/2606.10803v1)  
  **作者**：Zhixin M., Yutong Z., Yongqi L. 等  
  **一句话**：从数字 API 走向真实物理工具，直接测试多模态大模型在具身任务中的可操作边界。

- [**LIBERO-Occ: Evaluating and Improving Vision-Language-Action Models under Scene-Induced Occlusion via Viewpoint Imagination**](http://arxiv.org/abs/2606.10862v1)  
  **作者**：Taishan L., Jiwen Z., Siyuan W. 等  
  **一句话**：针对遮挡场景下的机器人操作提出“视角想象”机制，强调 VLA 模型需要在部分可观测环境中保持规划能力。

---

## 3) 研究趋势信号
今天的投稿显示，AI 研究正从“能力竞赛”转向“可信部署竞赛”：一类工作聚焦**记忆、对齐、指令层级、信息扭曲**，另一类集中在**工具调用、智能体进化、轨迹保护**，同时推理加速和量化优化仍是工程主线。应用层面则越来越强调在**遮挡、陌生语言、物理工具、工程推理**等真实约束下的鲁棒性，说明评测标准正在全面现实化。

---

## 4) 值得精读
1. [**Recalling Too Well: Sycophancy Evaluation and Mitigation in Memory-Augmented Models**](http://arxiv.org/abs/2606.10949v1)  
   **理由**：它抓住了“记忆增强”这一热门方向中的隐性风险，且是首次系统评估，直接影响后续 memory-RAG / personal assistant 的设计。

2. [**Training LLMs to Enforce Multi-Level Instruction Hierarchies via Gravity-Weighted Direct Preference Optimization**](http://arxiv.org/abs/2606.10860v1)  
   **理由**：面向 prompt injection 与多源指令冲突的实用对齐方案，适合关注生产级 LLM 安全与权限控制的人细读。

3. [**Pushing the Limits of LLM Tool Calling via Experiential Knowledge Integration and Activation**](http://arxiv.org/abs/2606.10875v1)  
   **理由**：把“会不会用工具”推进到“能否在多步任务中稳定调用工具”的核心问题，贴近 agent 系统落地痛点。

---

如果你愿意，我还可以把这份日报进一步整理成：
- **投资/产业视角版**
- **学术组会汇报版**
- **PPT 一页摘要版**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*