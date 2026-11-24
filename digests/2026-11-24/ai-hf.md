# Hugging Face 热门模型日报 2026-11-24

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-11-24 05:45 UTC

---

# Hugging Face 热门模型日报
**2026-11-24｜基于所提供的 3 个周点赞榜热门模型**

## 今日速览

inclusionAI 占据本次样本的两个席位，Ling-3.2-air 与 LingSante-3.1-flash 均获 121 赞，是最突出的发布方。多模态理解与高效推理相关标签值得关注：榜单出现了视觉语言架构、MoE、FP8 和量化等信号。Inkling-2-Mini-Strata 以 1,064 次下载领先本组，体现出相对更强的下载关注度。需要注意，周榜热度不等于当日发布或性能领先，下载量也不能直接代表实际部署规模。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

**[inclusionAI/LingSante-3.1-flash](https://huggingface.co/inclusionAI/LingSante-3.1-flash)**
- **作者：** inclusionAI
- **点赞：** 121｜**下载：** 397
- **一句话说明：** 面向文本生成与对话的模型，带有 `bailing_hybrid` 架构标签；并列最高的点赞数显示出较强关注度，但其具体能力与效率仍需模型卡和实测确认。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

**[inclusionAI/Ling-3.2-air](https://huggingface.co/inclusionAI/Ling-3.2-air)**
- **作者：** inclusionAI
- **点赞：** 121｜**下载：** 0
- **一句话说明：** 从 `bailing_moe_v3_vl` 标签看，可能属于视觉语言 MoE 模型，FP8 与 MIT 许可是值得关注的特征；其任务字段尚未标注，此处暂归多模态类，不据此认定支持图像生成。

**[strata-engine/Inkling-2-Mini-Strata](https://huggingface.co/strata-engine/Inkling-2-Mini-Strata)**
- **作者：** strata-engine
- **点赞：** 97｜**下载：** 1,064
- **一句话说明：** 面向图文输入、文本输出的多模态模型，兼具 MoE 与量化标签，并以本组最高下载量成为值得优先验证的候选。

### 🔧 专用模型（代码、数学、医疗、嵌入）

本次样本中**没有明确标注为上述专用任务的模型**；不宜仅凭模型名称推断其医疗或其他领域能力。

### 📦 微调与量化（社区微调、GGUF、AWQ）

- **[Inkling-2-Mini-Strata](https://huggingface.co/strata-engine/Inkling-2-Mini-Strata)**：带有 `quantization` 标签，是本次最直接的量化研究对象，但具体位宽、格式及是否属于社区衍生版本尚不明确。
- **[Ling-3.2-air](https://huggingface.co/inclusionAI/Ling-3.2-air)**：带有 `fp8` 标签，可关注低精度部署支持；不能据此认定存在 GGUF 或 AWQ 版本。

*本栏为交叉归类，不重复计入模型总数。*

## 生态信号

在本次三个模型的样本中，inclusionAI/Ling 系列占据两席，关注度最集中。MoE、混合架构、FP8 与量化标签同时出现，显示高效推理和部署成本值得持续跟踪。Ling-3.2-air 标注 MIT 许可，为开放使用提供积极信号，但权重完整性与运行条件仍需核实。样本不含闭源对照，无法判断开放权重相对闭源的整体消长；也未见明确的社区微调或 GGUF、AWQ 活动证据。

## 值得探索

1. **[Inkling-2-Mini-Strata](https://huggingface.co/strata-engine/Inkling-2-Mini-Strata)**  
   优先验证图文理解表现、显存占用及量化带来的质量变化；本组最高下载量使其具备较高的跟踪价值。

2. **[LingSante-3.1-flash](https://huggingface.co/inclusionAI/LingSante-3.1-flash)**  
   适合作为对话与文本生成评测候选，重点测试中文能力、指令遵循和推理延迟，不将名称中的 “flash” 直接视为速度保证。

3. **[Ling-3.2-air](https://huggingface.co/inclusionAI/Ling-3.2-air)**  
   适合研究潜在视觉语言 MoE 架构与 FP8 部署路径；建议先核实任务定义、权重文件和硬件要求，再开展测试。

> **使用提示：** 两个 inclusionAI 模型均带有 `custom_code` 标签，运行前应审查仓库代码，并审慎启用远程代码执行。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*