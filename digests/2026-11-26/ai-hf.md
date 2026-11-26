# Hugging Face 热门模型日报 2026-11-26

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 2 个模型 | 生成时间: 2026-11-26 03:58 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-26｜按周点赞数排序**

> 数据范围：本期提供的 2 个热门模型。点赞、下载及任务信息均沿用所给数据；未核验模型卡、许可证与实际能力。

## 今日速览

本期榜单由 NVIDIA 的 **Nemotron-Labs-Image-30B-A3B** 领跑，获 176 赞；KRAFTON 的 **Raon-1-mini** 以 117 赞位居第二。两个模型分别覆盖图像生成与文本生成，体现出生成式模型在不同模态上的关注度。Raon-1-mini 的下载数略高于榜首，但不能仅凭下载量判断实际使用规模。值得注意的是，NVIDIA 模型的任务栏与标签存在差异，评估前应优先核对模型卡和推理示例。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

**[KRAFTON/Raon-1-mini](https://huggingface.co/KRAFTON/Raon-1-mini)**
- **作者：** KRAFTON
- **点赞：** 117｜**下载：** 264
- **一句话说明：** 定位为文本生成的 Raon 系列模型，以本期第二的周点赞数进入榜单，且下载数在两个样本中领先；具体规模、语言能力与指令适配情况仍需查阅模型卡。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

**[nvidia/Nemotron-Labs-Image-30B-A3B](https://huggingface.co/nvidia/Nemotron-Labs-Image-30B-A3B)**
- **作者：** nvidia
- **点赞：** 176｜**下载：** 218
- **一句话说明：** 任务栏标注为文本到图像的 Nemotron 系列模型，以最高周点赞数领跑本期榜单，但其 `text-generation`、`nemotron_h` 标签与任务栏不完全一致，实际生成流程需进一步核验。

### 🔧 专用模型（代码、数学、医疗、嵌入）

本期样本中暂无可明确归入此类的模型。

### 📦 微调与量化（社区微调、GGUF、AWQ）

本期样本中暂无明确标注为社区微调或 GGUF、AWQ 等量化版本的模型。`safetensors` 是权重存储格式，不等同于量化标记。

## 生态信号

本期样本中，Nemotron 与 Raon 两个家族获得关注，但仅凭两个条目不足以判断整个家族的增长势头。图像生成与文本生成同时上榜，显示关注点并不限于单一模态。两者均带有权重格式标签，但开放权重范围及使用限制仍须核验许可证，不能据此认定为完全开源，也无法推断闭源生态的变化。本期未见明确的量化或社区微调条目，后续可关注衍生版本与推理部署支持。

## 值得探索

1. **[nvidia/Nemotron-Labs-Image-30B-A3B](https://huggingface.co/nvidia/Nemotron-Labs-Image-30B-A3B)**  
   优先研究任务定义、模型架构及推理入口，厘清图像生成定位与文本生成标签之间的关系，再评估输出质量和部署成本。

2. **[KRAFTON/Raon-1-mini](https://huggingface.co/KRAFTON/Raon-1-mini)**  
   适合开展文本生成基线测试，重点核验参数规模、目标语言、对话模板和显存需求，判断其是否适合轻量部署。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*