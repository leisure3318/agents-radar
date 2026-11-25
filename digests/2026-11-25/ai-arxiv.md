# ArXiv AI 研究日报 2026-11-25

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 26 篇论文 | 生成时间: 2026-11-25 05:39 UTC

---

# ArXiv AI 研究日报
**2026 年 11 月 25 日｜覆盖 26 篇论文，所列发布日期均为 11 月 24 日**

> 本报基于所提供的标题与截断摘要整理，未核验全文；以下重点区分论文提出的问题、方法与尚待验证的效果。

## 一、今日速览

今日最鲜明的主线是：**AI 不仅要给出答案，还要判断证据是否充分、行动是否符合自身判断，以及评测结果是否可信**。智能体研究进一步转向系统层面，关注模型与运行框架的相对贡献，以及合法授权智能体被劫持后的安全边界。效率优化覆盖 KV 缓存、生成式验证和动态语法约束，体现出面向实际部署的精细化设计。多模态应用则聚焦自动驾驶、通用 CT 报告与交互视频生成，强调证据落地、空间定位和实时可控性。

## 二、重点论文

### 🧠 大语言模型｜训练、能力认知与评估

**1. [InstructReplay: Replaying Assistant Turns to Preserve General Behavior During Factual Fine-Tuning](http://arxiv.org/abs/2611.32918v1)**  
**作者：** X. Shi、Q. Kou、H. Zhou  
**核心贡献与关注点：** 提出通过回放助手轮次，在事实微调时保留通用行为，并将能力退化与回答长度坍缩联系起来，为理解和缓解微调后的行为遗忘提供切入点。

**2. [Do Vision-Language Models Know Their Own Visual Weaknesses? Probing Capability-Level Metacognition](http://arxiv.org/abs/2611.32940v1)**  
**作者：** D. Kim、T. Moon  
**核心贡献与关注点：** 将元认知评估从“这次回答是否正确”推进到“模型是否预先知道自己不擅长哪些视觉任务”，有助于研究能力边界感知和任务分流。

**3. [Measurement Artifacts in Trustworthiness Evaluations of Quantized Small Language Models](http://arxiv.org/abs/2611.32848v1)**  
**作者：** T. Abbas、T. Zia、D. Windridge  
**核心贡献与关注点：** 区分量化造成的真实可信度变化与测量工具引入的误差，提醒研究者不能将基准分数变化直接等同于量化的因果影响。

### 🤖 智能体与推理｜行为一致性、运行框架与安全

**4. [Lazy Agents Answer Against Their Own Beliefs: Reinforcement Learning with Verifiable Beliefs Teaches Them to Act on What They Believe](http://arxiv.org/abs/2611.32884v1)**  
**作者：** R. S. J. Xuan、P. Feng、W. Wang 等  
**核心贡献与关注点：** 针对智能体在自身陈述仍保留多个候选答案时过早作答的问题，引入可验证信念强化学习，探索让行动与显式判断保持一致。

**5. [ShellBench: What Matters More for AI Agents, Models, or Harness for Everyday Tasks](http://arxiv.org/abs/2611.32946v1)**  
**作者：** V. Koc、A. Washikar、R. N. Venkataraman 等  
**核心贡献与关注点：** 以 100 项日常任务评估模型与智能体运行框架的作用，为区分“模型能力提升”和“系统工程收益”提供更贴近用户场景的基准。

**6. [Attestation is All You Need: Toward a Zero-Trust Architecture for HPC AI Agents](http://arxiv.org/abs/2611.32958v1)**  
**作者：** J. Li、C. Niu、T. Wang 等  
**核心贡献与关注点：** 面向高性能计算环境中“已获授权但遭劫持”的智能体，探索基于证明机制的零信任架构，将安全关注点从身份授权延伸至执行过程。

**7. [C3H: Compression-to-Consensus Criteria Hijacking in Multimodal LLM Recommender Systems](http://arxiv.org/abs/2611.32780v1)**  
**作者：** G. Guan、Y. Hao、J. Zhang 等  
**核心贡献与关注点：** 研究多模态推荐中的决策标准劫持，提示压缩与跨模态融合并不天然等于安全，需要审视内容操纵如何影响最终推荐依据。

### 🔧 方法与框架｜推理效率、验证与约束生成

**8. [LoomKV: Lossless KV Cache Compression from GPU Memory to SSD for LLM Serving](http://arxiv.org/abs/2611.32954v1)**  
**作者：** W. Zhu、Z. Sheng、P. Deng 等  
**核心贡献与关注点：** 面向 GPU、主机内存与 SSD 的分层 KV 缓存提出无损压缩方案，直接关联多轮对话和智能体服务中的前缀复用与容量瓶颈。

**9. [Reading Decisions Before Spans: Efficient Generative Verification](http://arxiv.org/abs/2611.32931v1)**  
**作者：** Y. Gong、L. Chen  
**核心贡献与关注点：** 研究生成式验证器在完整输出错误片段与分类之前，能否提前读出判定结果，为只需要“是否有问题”的场景减少解码开销。

**10. [From Grammar Deltas to Token Masks: Incremental Constrained Decoding under Runtime Grammar Evolution](http://arxiv.org/abs/2611.32807v1)**  
**作者：** H. Hua、J. Su、Y. Che 等  
**核心贡献与关注点：** 将约束解码扩展至语法在生成过程中动态变化的场景，面向代码与领域专用语言中逐步出现的声明、类型和约束维护合法输出。

### 📊 应用｜自动驾驶、医疗与交互生成

**11. [Benchmarking Evidence Sufficiency in Vision-Language Models for Autonomous Driving](http://arxiv.org/abs/2611.32964v1)**  
**作者：** N. H. Nguyen、S. Chowdhury、L. Das  
**核心贡献与关注点：** 将视觉证据是否足以支持答案作为自动驾驶 VLM 的独立评估目标，补充仅看回答正确率和目标定位的安全盲区。

**12. [Reliable and grounded reporting of any computed tomography scan with FORA](http://arxiv.org/abs/2611.32823v1)**  
**作者：** S. Er、U. Turkbey、A. Gur 等  
**核心贡献与关注点：** 提出面向广泛 CT 检查的通用模型，强调综合报告与空间定位，值得关注其跨解剖区域泛化能力及临床可靠性的验证方式。

**13. [Residual Guidance for Real-Time Interactive Video Generation](http://arxiv.org/abs/2611.32820v1)**  
**作者：** N. Park、K.-H. Moon、Y. Jeon 等  
**核心贡献与关注点：** 针对流式视频在提示切换后仍沿用旧内容的“上下文惯性”，提出残差引导方法，聚焦实时生成中的控制响应问题。

**14. [Motion Conditioned World Modeling for Embodied Visual Tracking](http://arxiv.org/abs/2611.32900v1)**  
**作者：** J. Zhang、X. Yao、J. Gao 等  
**核心贡献与关注点：** 以运动条件化世界模型处理目标运动与机器人视角变化共同造成的预测困难，面向具身跟踪中的未来状态建模。

## 三、研究趋势信号

今日投稿呈现三条相互关联的趋势：一是从答案正确性转向证据充分性、能力自知与信念—行动一致性，可靠性评估开始深入决策过程；二是智能体竞争从单模型扩展到运行框架、缓存和验证链路，系统设计成为重要变量；三是安全边界从单次输入扩展到授权执行、跨轮历史与多模态融合。与此同时，量化评测和脑评分研究提醒我们，测量工具本身也必须接受检验。

## 四、值得精读

### 1. [Lazy Agents Answer Against Their Own Beliefs](http://arxiv.org/abs/2611.32884v1)
**理由：** 将“过早结束任务”具体化为显式信念与行动之间的不一致，比单看最终成功率更接近过程诊断。精读时应重点检查：信念如何被验证，以及方法是否真正提升信息搜集，而非仅改变表述。

### 2. [ShellBench](http://arxiv.org/abs/2611.32946v1)
**理由：** 直接回答部署中的核心问题——应优先升级模型，还是优化运行框架。重点关注模型与框架的交叉实验、工具权限、预算控制及任务可复现性。

### 3. [LoomKV](http://arxiv.org/abs/2611.32954v1)
**理由：** KV 缓存是长上下文和多轮智能体服务的重要资源瓶颈，无损方案具有明确工程吸引力。重点核查压缩率之外的压解开销、端到端延迟，以及不同缓存命中率下的净收益。

## 五、其余论文索引

*以下保留其余 12 篇链接，便于完整追踪今日全部投稿。*

| 方向 | 论文 |
|---|---|
| 欺诈与模型安全 | [“I Do Intend to Deliver”: Will LLMs Run a Marketplace Advance-Fee Scam?](http://arxiv.org/abs/2611.32957v1) |
| 风险敏感强化学习 | [Beyond Expected Value: PPO with Distributional Critics for Systematic Conservation Planning](http://arxiv.org/abs/2611.32948v1) |
| 文化价值与交互 | [One Style Fits All? Cultural Values Embedded in Conversational AI via a People-Pleasing Lens](http://arxiv.org/abs/2611.32939v1) |
| 智能体搜索 | [SOARS: System One Assisted Reranking for Agentic Search](http://arxiv.org/abs/2611.32917v1) |
| 在线内容治理 | [Joint Detection of Constructive Speech, Hate Speech and Agreement in Online Conversations](http://arxiv.org/abs/2611.32889v1) |
| 数据中心数字孪生 | [Adaptive Electromagnetic Transient-level Digital Twins for Data Centers via In-Context Learning with LLMs](http://arxiv.org/abs/2611.32882v1) |
| 跨轮隐私泄漏 | [Fresh Keys, Stale Secrets: Numeric Leakage across Linked LLM Prompts](http://arxiv.org/abs/2611.32864v1) |
| 人工生命 | [Field Life: Particle Life as Interacting Chemical Fields](http://arxiv.org/abs/2611.32844v1) |
| 自适应计算机交互 | [Interactive Neural Computers](http://arxiv.org/abs/2611.32811v1) |
| 多机器人必要性推理 | [MRBench: Benchmarking Physical Necessity Reasoning in Heterogeneous Multi-Robot Manipulation](http://arxiv.org/abs/2611.32803v1) |
| 语音表示 | [Is Prosody Encoded in the Neural Audio Codec Mimi?](http://arxiv.org/abs/2611.32795v1) |
| 脑模型评估 | [Accuracy of Noise Ceiling Estimators for Brain Scores](http://arxiv.org/abs/2611.32792v1) |

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*