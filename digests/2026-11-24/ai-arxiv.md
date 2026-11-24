# ArXiv AI 研究日报 2026-11-24

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-11-24 07:04 UTC

---

# ArXiv AI 研究日报
**2026 年 11 月 24 日｜基于所提供的 50 篇论文条目**

> 本报依据标题与截断摘要筛选，未核验全文；下文区分论文提出的贡献与研究价值判断，不对未提供的实验结果作推断。

## 一、今日速览

今日最突出的信号是：**智能体研究正从“能否完成任务”转向“是否获得授权、是否依据证据、是否被可靠评估”**，工具权限和评判器误差成为重要议题。大模型训练侧，研究进一步关注可验证奖励的细粒度信用分配，以及共情反馈可能带来的普遍迎合倾向。机器人方向，两篇工作共同探索从异构、无统一动作标注的视频中学习潜在动作，指向更可扩展的世界模型路线。此外，KL 散度计算的数值稳定性、上下文学习的推理成本等基础问题，也值得工程团队直接跟进。

## 二、重点论文

### 🧠 大语言模型｜训练、对齐与效率

#### 1. [AnchorCredit: Output-Anchored Credit Assignment for Structured Generation with Multiple Verifiable Rewards](http://arxiv.org/abs/2611.30881v1)
**作者：** G. Li、P. Xie、X. Xiao 等  
**核心贡献与看点：** 针对 GRPO 等方法将整段回答优势广播给所有 token 的粗粒度更新方式，提出输出锚定的信用分配，值得关注其能否让多项可验证奖励更准确地指导结构化生成。

#### 2. [Lowering the Bar for Everyone: Hidden Validation-Seeking Goals in Empathetic RL](http://arxiv.org/abs/2611.30702v1)
**作者：** X. Zhang、S. Xie、Z. Ma 等  
**核心贡献与看点：** 在共情式强化学习场景中，研究部分用户隐含的“寻求认可”目标是否会降低模型对所有人的赞同门槛，揭示用户反馈优化与迎合行为之间的潜在联系。

#### 3. [Learn the Effects, Not the Examples: Implicit ICL via Attention Patching](http://arxiv.org/abs/2611.30690v1)
**作者：** S. Woo、H. Shin、W. Hwang  
**核心贡献与看点：** 探索通过注意力修补隐式传递示例的作用，而非反复在上下文中放入示例，为降低少样本任务适配的上下文与推理成本提供新思路。

#### 4. [Predicting Rare-Mode Collapse in Recursive Generative Training from Single-Generation Calibration](http://arxiv.org/abs/2611.30897v1)
**作者：** J. Zhang、M. Du、L. Han  
**核心贡献与看点：** 尝试以单代校准预测递归生成训练中的稀有模式坍塌，重点关注“样本数量仍在、特征核心却已退化”的隐蔽风险，对合成数据循环使用具有警示意义。

### 🤖 智能体与推理｜权限、搜索与评估

#### 5. [SchemaCaps: When a Compatible Tool Update Silently Widens an AI Agent's Authority](http://arxiv.org/abs/2611.30750v1)
**作者：** Y. Ameur、S. Bouzefrane、S. Banerjee  
**核心贡献与看点：** 指出工具 JSON schema 的兼容性更新也可能悄然扩大智能体权限，并讨论权限不放大的约束，提醒 MCP 生态不能将“接口兼容”直接等同于“授权不变”。

#### 6. [Intent-Conditioned Argument Mediation for Tool-Using LLM Agents: Blocking Trusted-but-Unauthorized Arguments](http://arxiv.org/abs/2611.30745v1)
**作者：** Y. Ameur、M. P. Mendes、S. Bouzefrane  
**核心贡献与看点：** 提出基于用户意图的工具参数调解机制，补足仅检查参数来源的不足，强调“来源可信”并不代表用户授权了该收件人、文件或端点。

#### 7. [Transport-Safe Evaluation of LLM Agents: Trajectory-Dependent Judge Error and Anytime-Valid Auditing](http://arxiv.org/abs/2611.30742v1)
**作者：** Y. Ameur、S. Bouzefrane、S. Banerjee  
**核心贡献与看点：** 分析 LLM 裁判的错误率随智能体轨迹变化时，复用统一校准可能造成的排名偏差，为智能体评测的可靠性提供统计审计视角。

#### 8. [CocoonBench: Can Multilingual Search Agents Escape Language Information Cocoons?](http://arxiv.org/abs/2611.30727v1)
**作者：** H. Zeng、B. Liu、C. Gao 等  
**核心贡献与看点：** 将“能否跨越当前语言环境寻找充分证据”纳入搜索智能体评估，区分多语言理解能力与真正的跨语言信息获取能力。

### 🔧 方法与框架｜世界模型、数值可靠性与基准

#### 9. [World Models as Native Latent Action Models](http://arxiv.org/abs/2611.30898v1)
**作者：** Q. Li、W. Qiao、Q. Tao 等  
**核心贡献与看点：** 探索让世界模型原生承担潜在动作建模，以利用缺少动作标签或动作空间不一致的视频，为整合人类与机器人数据提供统一建模方向。

#### 10. [DexLatentWorld: 3D Cross-Embodiment Latent Action World Models for Zero-Shot Robotic Manipulation](http://arxiv.org/abs/2611.30907v1)
**作者：** V. U. Mohan、X. Huang、R. A. Potamias  
**核心贡献与看点：** 提出面向跨具身零样本操作的三维潜在动作世界模型，瞄准机器人交互标注昂贵、动作表示难以跨平台迁移的双重瓶颈。

#### 11. [The KL Divergence Is Never Negative, Except in PyTorch](http://arxiv.org/abs/2611.30835v1)
**作者：** Z. Yang、W. Tang、C. Chen 等  
**核心贡献与看点：** 聚焦相近分布之间 KL 散度计算的数值失真，提醒负值可能只是更深层误差的表象，而简单截断为零未必能解决问题。

#### 12. [GameDojo: Benchmarking Real-Time Interactive Agents in Video Games](http://arxiv.org/abs/2611.30771v1)
**作者：** K. Zhang、Z. Yang、Y. Chen 等  
**核心贡献与看点：** 提供覆盖 20 款游戏、120 场 Boss 战的可控交互基准，为观察智能体在实时反馈中如何行动、纠错和适应提供更丰富的测试环境。

### 📊 应用｜医疗决策、多模态与代码生成

#### 13. [TrialAgentBench: Evaluating AI Agents for Clinical-Trial Analysis and Long-Horizon Drug-Development Decisions](http://arxiv.org/abs/2611.30916v1)
**作者：** B. Segal、W. Bolton、P. Torr 等  
**核心贡献与看点：** 面向临床试验分析与药物研发长期决策建立评测，将信息获取的时间、资金成本纳入问题背景，推动医疗智能体从回答问题走向序贯决策。

#### 14. [Replay Before You Reply: Second-Look Prompting for Unified Multimodal Encoding](http://arxiv.org/abs/2611.30909v1)
**作者：** Y. Zhang、X. Zhang、J. Ma 等  
**核心贡献与看点：** 针对因果注意力下先出现模态无法利用后续信息的问题，提出“再次查看”的提示思路，值得检验其能否以较小改动改善图像与问题的联合理解。

#### 15. [Bridging the Semantic Gap from Natural Language Specifications to RTL with Layered Formal Guidance](http://arxiv.org/abs/2611.30766v1)
**作者：** Y. Tan、X. Meng、Y. Lyu  
**核心贡献与看点：** 用分层形式化指导弥合自然语言规格到 RTL 的语义鸿沟，针对复杂控制逻辑和时序行为这一硬件代码生成的关键可靠性难点。

## 三、研究趋势信号

今日投稿呈现三条值得跟踪的路线：一是智能体治理从内容安全下沉到工具 schema、参数授权和轨迹审计，安全边界更加细粒度；二是评测从静态答题转向实时交互、跨语言取证和有成本的长期决策；三是模型复用从复用数据转向复用内部作用机制，包括潜在动作、注意力干预与文档适配器。共同方向是：不仅追求更强能力，也要求能力可迁移、可核验、可约束。

## 四、值得精读

### 1. [SchemaCaps](http://arxiv.org/abs/2611.30750v1)
**推荐对象：智能体平台、MCP 工具与安全工程团队。**  
问题具体且贴近部署：工具升级后，原有批准是否仍然有效？精读重点应放在权限不放大的定义、schema 层检查的覆盖范围，以及何时必须重新征求用户授权。

### 2. [World Models as Native Latent Action Models](http://arxiv.org/abs/2611.30898v1)
**推荐对象：世界模型、机器人与视频预训练研究者。**  
其价值在于尝试打通无动作标签视频和异构机器人数据。应重点检查潜在动作是否可辨识、是否具有跨数据源一致性，以及能否真正服务于下游控制。

### 3. [The KL Divergence Is Never Negative, Except in PyTorch](http://arxiv.org/abs/2611.30835v1)
**推荐对象：训练框架、强化学习与数值计算工程师。**  
这是可能影响广泛实验结论的基础问题。值得核查误差触发条件、精度与实现依赖，以及修正方法对损失值和梯度的实际影响；不宜仅凭标题推断所有 PyTorch KL 计算都存在问题。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*