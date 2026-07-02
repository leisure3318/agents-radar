# ArXiv AI 研究日报 2026-07-02

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 23 篇论文 | 生成时间: 2026-07-02 01:34 UTC

---

# ArXiv AI 研究日报（2026-07-02）

## 1) 今日速览
今天的论文整体呈现出一个非常清晰的转向：AI 研究正在从“能做题”走向“能可靠地做事”。一方面，LLM 的**可信表达、表格引用正确性、ToM/说服能力**等评估与对齐问题继续升温；另一方面，**技能组合、浏览器行为蒸馏、形式化验证代码生成**等 agentic 能力成为新焦点。  
与此同时，**多模态效率优化**（如视觉跳层/跳算）与**具身协作基准**也在加速成熟，说明研究重心已从单模型能力扩展到“多模态 + 行动 + 资源约束”系统能力。  
应用侧则明显向**机器人、交通、林业、植物表型、3D 动画**等垂直领域下沉，强调真实环境中的可部署性与可验证性。  

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

1. **[Reinforcement Learning with Metacognitive Feedback Elicits Faithful Uncertainty Expression in LLMs](http://arxiv.org/abs/2606.32032v1)**  
   作者：Liu et al.  
   一句话：用“元认知反馈”做强化学习，让模型在不确定时更诚实地表达置信度，直接瞄准 LLM 幻觉与过度自信问题。

2. **[When LLMs Read Tables Carelessly: Measuring and Reducing Data Referencing Errors](http://arxiv.org/abs/2606.32029v1)**  
   作者：Yang et al.  
   一句话：首次系统测量 LLM 在表格理解中的“数据引用错误”，并给出降低误引、漏引的办法，提升表格问答的可审计性。

3. **[Theory of Mind and Persuasion Beyond Conversation: Assessing the Capacity of LLMs to Induce Belief States via Planning and Action](http://arxiv.org/abs/2606.31916v1)**  
   作者：Slater et al.  
   一句话：把 ToM 评估从静态问答推进到“规划与行动”场景，检验模型是否真的能通过交互塑造他人信念。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

4. **[Generative Skill Composition for LLM Agents](http://arxiv.org/abs/2606.32025v1)**  
   作者：Zhao et al.  
   一句话：提出可生成的技能组合框架，让 agent 能像搭积木一样复用与编排能力，解决复杂任务中的“技能拼装”问题。

5. **[Scalable Behaviour Cloning on Browser Using via Skill Distillation](http://arxiv.org/abs/2606.32014v1)**  
   作者：Yang et al.  
   一句话：把海量真实浏览器操作提炼成可学习技能，为网页型智能体提供大规模、低成本的行为克隆路径。

6. **[AxDafny: Agentic Verified Code Generation in Dafny](http://arxiv.org/abs/2606.32007v1)**  
   作者：Breen et al.  
   一句话：将“写代码”与“写证明”结合，利用 verifier-guided repair 迭代生成可执行程序和验证工件，是可靠代码智能体的重要方向。

7. **[MECoBench: A Systematic Study of Multimodal Agent Collaboration in Embodied Environments](http://arxiv.org/abs/2606.31966v1)**  
   作者：Liu et al.  
   一句话：构建具身多模态协作基准，系统研究多个 agent 在视觉环境中的协作能力，为多智能体协同评测补齐关键缺口。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

8. **[Attend, Transform, or Silence: Operator-Level Visual Skipping for Efficient Multimodal LLM Inference](http://arxiv.org/abs/2606.31903v1)**  
   作者：Luo et al.  
   一句话：提出算子级视觉跳算，不是粗暴删 token，而是细粒度决定“看、变换还是静默”，更适合长视觉序列的高效推理。

9. **[Z-1: Efficient Reinforcement Learning for Vision-Language-Action Models](http://arxiv.org/abs/2606.31846v1)**  
   作者：Cao et al.  
   一句话：面向 VLA 模型的高效强化学习方案，目标是在机器人控制中兼顾学习效果与样本/计算效率。

10. **[Real-Time Source-Free Object Detection](http://arxiv.org/abs/2606.31834v1)**  
    作者：VCR et al.  
    一句话：把源自由检测与实时约束结合，面向自动驾驶和机器人场景，强调“部署时也能跑得快、适应域偏移”。

---

### 📊 应用（垂直领域、多模态、代码生成）

11. **[DigitalCoach: Communication and Grounding Gaps in Human and Agentic Computer Use Coaching](http://arxiv.org/abs/2606.31980v1)**  
    作者：Chen et al.  
    一句话：提供人类专家—新手的电脑使用教学数据集，聚焦“讲清楚”与“对齐屏幕上下文”的沟通/ grounding 问题。

12. **[LUNA: Learning Universal 3D Human Animation Beyond Skinning](http://arxiv.org/abs/2606.31981v1)**  
    作者：Li et al.  
    一句话：提出摆脱传统 skinning 的 3D 人体动画方法，提升从单目图像生成可动画化人体 avatar 的真实感与泛化能力。

13. **[An Agentic AI Framework to Accelerate Scientific Discovery in Plant Phenotyping](http://arxiv.org/abs/2606.31831v1)**  
    作者：Souza et al.  
    一句话：把 agentic AI 用到植物表型分析，目标是自动化处理高通量图像数据，加速科学发现流程。

---

## 3) 研究趋势信号
今天的投稿显示，研究重心正从“模型是否会答”转向“模型是否会**可靠地行动**”。关键词包括：**不确定性表达、表格引用正确性、技能组合、浏览器行为蒸馏、形式化验证、具身协作、视觉推理效率**。同时，评测也从静态 QA 扩展到交互式、行动式与多模态场景，说明 AI 正从语言中心走向“可部署智能体系统”。

---

## 4) 值得精读

1. **[Reinforcement Learning with Metacognitive Feedback Elicits Faithful Uncertainty Expression in LLMs](http://arxiv.org/abs/2606.32032v1)**  
   理由：这是直接切中 LLM 可信性核心问题的工作——“知道就说知道，不知道就说不知道”。对安全对齐、拒答策略、校准评估都很有参考价值。

2. **[AxDafny: Agentic Verified Code Generation in Dafny](http://arxiv.org/abs/2606.32007v1)**  
   理由：它把 agentic coding 推向“可验证”层面，不只是生成代码，还生成证明与修复路径。对高可靠软件、关键系统自动化很重要。

3. **[Generative Skill Composition for LLM Agents](http://arxiv.org/abs/2606.32025v1)**  
   理由：技能复用与组合是复杂 agent 能力扩展的关键。该文有望为未来“模块化智能体”提供更通用的设计范式。  

如果你愿意，我还可以把这份日报进一步整理成：
- **适合公众号发布的精简版**
- **投研/技术团队内部简报版**
- **按“方向-机会-风险”三栏的分析版**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*