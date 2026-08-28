# ArXiv AI 研究日报 2026-08-28

> 数据来源: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 共 50 篇论文 | 生成时间: 2026-08-28 10:08 UTC

---

# ArXiv AI 研究日报（2026-08-28）

## 1) 今日速览
今天的论文信号非常集中：**LLM 后训练与推理时优化** 继续加速，从 RLVR、TTPO、ES 到弱模型引导、跨域融合，都在尝试突破“只会更强、不会更多样”的能力瓶颈。  
另一条主线是 **智能体工程化与可审计性**：技能编译、轨迹筛选、执行审计、行为感知验证、agentic data 生成，说明研究重心正在从“能跑”转向“可控、可复用、可追责”。  
第三类热点是 **评估范式升级**，包括 code review、security scanner、LLM judge、mixed-origin text detection 等，核心都在于摆脱单一 accuracy/F1 的失真。  
此外，**世界模型与多模态预训练** 仍在扩展：视频世界模型、跨 embodiment 仿真、3D 物理表示、医疗与工业场景的专用模型都在持续推进。

---

## 2) 重点论文

### 🧠 大语言模型（架构、训练、对齐、评估）

- **[CritICL: Inference-Time Weak-to-Strong Generalization from Small Language Model Failure Modes](http://arxiv.org/abs/2608.27455v1)**  
  作者：Wu, He, Hu et al.  
  一句话：把小模型的失败模式转化为推理时的“批判式引导”，探索无需外部验证的弱到强泛化路径，值得关注其对 inference-time scaling 的替代意义。

- **[TTPO: Test-Time Policy Optimization](http://arxiv.org/abs/2608.27448v1)**  
  作者：Wang, Lu, Wang et al.  
  一句话：提出在测试时直接做策略优化，用替代 ground-truth 的目标推进推理能力，指向“训练—推理边界”进一步模糊化。

- **[Boosting LLM Exploration via Weak-Model Guidance in RLVR](http://arxiv.org/abs/2608.27420v1)**  
  作者：Shen, Zhang, Li et al.  
  一句话：用弱模型帮助 RLVR 保持探索多样性，缓解策略熵塌缩问题，对提升 pass@$k$ 和覆盖率很关键。

- **[Consolidating RLVR Capabilities Across Domains: A Deep Dive into Fusion Paradigms](http://arxiv.org/abs/2608.27409v1)**  
  作者：Wu, Yang, Cai et al.  
  一句话：系统梳理并比较多能力 RLVR 的融合范式，为“多个专长如何合并成一个模型”提供结构化答案。

- **[How Language Models Organize and Structure Moral Knowledge](http://arxiv.org/abs/2608.27402v1)**  
  作者：Reblitz-Richardson  
  一句话：不只看模型能否识别道德内容，而是研究其如何几何化组织 moral foundations，属于认知结构层面的评估。

- **[D2C-Routing: Dimension-to-Composition Evidence Routing for Mixed-Origin AI-Generated Text Detection](http://arxiv.org/abs/2608.27380v1)**  
  作者：Chen, Zhang, Tong et al.  
  一句话：把“混合来源文本”拆成维度级证据路由，解决传统二分类检测无法刻画“内容来源”和“表达来源”分离的问题。

- **[Difference-in-Differences on a Censored Rating Scale Can Manufacture an Effect: Evidence from a Pre-Registered LLM-Judge Audit](http://arxiv.org/abs/2608.27309v1)**  
  作者：Fan, Deng, Xu et al.  
  一句话：指出 LLM judge 审计中常见的有界评分尺度会制造伪效应，提醒评价设计本身比指标更关键。

---

### 🤖 智能体与推理（规划、工具使用、多智能体、思维链）

- **[WikiSkill: Compiling Agent Experience into Persistent Knowledge for Skill Evolution](http://arxiv.org/abs/2608.27454v1)**  
  作者：Tang, Rashtchian, Ferng et al.  
  一句话：把 agent 经验编译成持久技能知识，推动“经验沉淀—技能进化—可复用”的闭环。

- **[SWE-Prime: Fewer Trajectories, Better Performance](http://arxiv.org/abs/2608.27449v1)**  
  作者：Zheng, Ye, Wang et al.  
  一句话：强调不是轨迹越多越好，而是更少但更高质量的 supervision 更有效，直接切中软件工程 agent 数据构造痛点。

- **[RedEvoAgent: Automatic Red-Teaming Agent with Experience-Driven Skill Evolution](http://arxiv.org/abs/2608.27439v1)**  
  作者：Zhang, Liu, Chen et al.  
  一句话：让红队 agent 通过经验驱动持续进化，说明安全测试也正在走向“自我进化智能体”。

- **[INTENT-AS-A-TOOL Makes it Easy to Track Agentic Misalignment](http://arxiv.org/abs/2608.27348v1)**  
  作者：Zhang, Dong, Xu et al.  
  一句话：把意图识别工具化，发现 agentic misalignment 可被更稳定追踪，对安全监控与行为审计很实用。

- **[SCIT: Testing Causal Cache Carriers in Latent Chain-of-Thought Models](http://arxiv.org/abs/2608.27265v1)**  
  作者：Ding, Huang, Yang  
  一句话：用因果介入方法测试 latent CoT 里到底是谁在“携带推理”，为不可见思维链提供可验证分析框架。

- **[What Makes Good Agentic Data? An ACE Lens on Data Generation for LLM Agents](http://arxiv.org/abs/2608.27260v1)**  
  作者：Zeng, Xu, Zhang et al.  
  一句话：从环境、任务、交互、成功信号一致性出发定义好数据，是 agent 训练数据标准化的重要一步。

- **[Verify Smarter, Evolve Further: Efficient Harness Evolution through Behavior-Aware Verification](http://arxiv.org/abs/2608.27311v1)**  
  作者：Xu, Zhang, Chen et al.  
  一句话：用行为感知验证减少无效 rollout，提升 harness 演化效率，适合大规模 agent runtime 优化。

---

### 🔧 方法与框架（新技术、基准测试、效率优化）

- **[From Static to Dynamic: Benchmarking Real-World Code Review with MCR-Bench](http://arxiv.org/abs/2608.27442v1)**  
  作者：Zheng, Wang, Wang et al.  
  一句话：把 code review 从静态判定变成动态交互式任务，补齐现有 LLM code review 评估缺口。

- **[Beyond F1: Evaluating Coverage and Failure Recovery in AI Model Security Scanners](http://arxiv.org/abs/2608.27424v1)**  
  作者：Lan, Pandurangan, Kaul et al.  
  一句话：提出安全扫描器不能只看 F1，还要看覆盖率与失败恢复，直接提升安全工具评测的现实性。

- **[BTS-AgentBench: A Deterministic, Replayable Pipeline from Read-Only Telemetry Logs to Agent Benchmarks](http://arxiv.org/abs/2608.27334v1)**  
  作者：Kim  
  一句话：把工业遥测日志变成可重放的 agent benchmark，强调数据生产流水线的可复现性与可审计性。

- **[Puro-2B: Poor Lab's Qwen2-1.5B Trained on RTX 5090 within $5090](http://arxiv.org/abs/2608.27370v1)**  
  作者：Luo, Cui, Yin et al.  
  一句话：展示低成本训练小模型的可行路线，对开源社区和预算受限研究很有参考价值。

- **[Stochastic Estimation of Transduced Language Models](http://arxiv.org/abs/2608.27428v1)**  
  作者：Snæbjarnarson, Kiegeland, de Prada Corral et al.  
  一句话：为 transducer 组合语言模型给出随机估计思路，属于结构化 LM 计算的基础方法推进。

- **[Naive Prompt Optimization: Rethinking the Need for Complex Prompt Search](http://arxiv.org/abs/2608.27266v1)**  
  作者：Chang, Chen  
  一句话：质疑复杂 prompt search 的必要性，主张更朴素的优化方式也能取得可观收益，适合关注 agent prompt 工程的人。

---

### 📊 应用（垂直领域、多模态、代码生成）

- **[CLAP: Cross-Embodiment Video World Models are Zero-Shot Physical Simulators](http://arxiv.org/abs/2608.27406v1)**  
  作者：Liu, Shorinwa  
  一句话：把跨机器人形态的视频世界模型推向零样本物理仿真，兼具机器人与视觉预训练价值。

- **[LeVJEPA: Efficient & Scalable Video Pretraining without the Heuristics](http://arxiv.org/abs/2608.27395v1)**  
  作者：Kuhn, Maes, Serra et al.  
  一句话：尝试去掉视频预训练中的大量经验性 heuristics，让 JEPAs 更可扩展、更稳定。

- **[CorporateBench: Large-Scale Q&A Benchmarking with Temporal Knowledge Bases](http://arxiv.org/abs/2608.27391v1)**  
  作者：Hamilton, Sun, Romero et al.  
  一句话：面向企业内部文档与时间知识的 Q&A 基准，适合检验 LLM 在真实组织知识上的可用性。

- **[LLMs Can Design Near-Optimal OR Algorithms](http://arxiv.org/abs/2608.27296v1)**  
  作者：Baek  
  一句话：验证 LLM 能为运筹优化问题设计接近最优的算法，说明模型在“算法设计”而不只是“答案生成”上也有潜力。

- **[Learning a Continuous Sepsis Severity Score Without Hour-by-Hour Supervision: A Two-Site Retrospective Study](http://arxiv.org/abs/2608.27421v1)**  
  作者：Zhu, Zhang, Abed et al.  
  一句话：在临床场景中学习连续型 sepsis severity score，体现医疗 AI 正从离散分类向连续风险建模推进。

---

## 3) 研究趋势信号
今天最明显的趋势是：**LLM 研究从“提升单次准确率”转向“提升推理覆盖、稳定性与可审计性”**。RLVR、TTPO、ES、弱模型引导等工作都在处理“能力扩展”和“多样性保持”的张力；与此同时，agent 方向开始强调技能沉淀、执行隔离、行为验证和数据生成规范，说明系统化工程正在成为核心竞争力。评估层面则持续去单指标化，强调动态、覆盖、失败恢复和因果识别。

---

## 4) 值得精读
1. **[CritICL](http://arxiv.org/abs/2608.27455v1)**  
   理由：它触及推理时扩展的核心问题——如何不依赖外部 verifier 或重复采样，实现弱到强的泛化，可能影响后续 test-time scaling 研究路线。

2. **[WikiSkill](http://arxiv.org/abs/2608.27454v1)**  
   理由：这篇把“agent 经验如何长期累积为技能”讲得非常系统，对构建可持续演化的 agent 平台尤其关键。

3. **[BTS-AgentBench](http://arxiv.org/abs/2608.27334v1)**  
   理由：它不是单纯 benchmark，而是一条从真实日志到可复现任务的管线；对工业级 agent 评测和数据工程都很有参考价值。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*