# Hugging Face 热门模型日报 2026-11-04

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-11-04 03:12 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-04**

> 基于所提供的 4 个热门模型条目整理；热度排序依据周点赞，展示的点赞数与下载数沿用原始数据，不视为当日新增。

## 今日速览

今日样本中，**量化分发与多模态应用**是最突出的两条主线。Qwen-Image-2.1-Turbo-Quantized 以 5,624 次点赞、约 251 万次下载显著领先，显示图像生成与 ComfyUI 部署生态的强劲吸引力。DeepSeek 的 GGUF 版本同样获得较高下载量，体现社区对便捷部署方案的持续需求。Qwen 家族同时覆盖图像生成与小参数语言模型；微软 Mage-VL-Cowork 则为视觉语言方向提供了值得跟踪的条目，但仅凭热度数据尚不能判断其能力表现。

## 热门模型

*按主要分发形态归类，每个模型仅列一次；量化模型的原始任务在说明中保留。*

### 🧠 语言模型（LLM、对话模型、指令微调）

**[Qwen3.5-4B-Qwenputer](https://huggingface.co/divagr1925/Qwen3.5-4B-Qwenputer)**  
- **作者：** divagr1925
- **点赞：** 154｜**下载：** 1,229
- **一句话说明：** Qwen3.5 系列的 4B 文本生成社区模型，点赞热度相对下载规模较突出，值得关注后续使用反馈；具体微调目标仍需查阅模型卡。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

**[Mage-VL-Cowork](https://huggingface.co/microsoft/Mage-VL-Cowork)**  
- **作者：** microsoft
- **点赞：** 156｜**下载：** 1,541
- **一句话说明：** 微软发布的视觉语言模型，面向图文输入到文本输出，其多模态定位与官方作者背景使其成为值得跟踪的热门条目。

### 🔧 专用模型（代码、数学、医疗、嵌入）

本次样本中，**暂无明确归属此类的模型**。

### 📦 微调与量化（社区微调、GGUF、AWQ）

**[Qwen-Image-2.1-Turbo-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Turbo-Quantized)**  
- **作者：** abenzerps
- **点赞：** 5,624｜**下载：** 2,508,590
- **一句话说明：** 面向文本生成图像的 Qwen 量化版本，带有 GGUF 与 ComfyUI 生态标签，以本次样本最高的点赞和下载规模成为焦点。

**[DeepSeek-V4.1-Flash-1017-GGUF](https://huggingface.co/unsloth/DeepSeek-V4.1-Flash-1017-GGUF)**  
- **作者：** unsloth
- **点赞：** 327｜**下载：** 596,039
- **一句话说明：** Unsloth 提供的 DeepSeek GGUF 分发版本，任务标注为图文到文本，较高下载量反映其部署需求；具体多模态支持需结合运行框架核实。

## 生态信号

本次样本中，Qwen 同时覆盖图像生成与小参数语言模型，DeepSeek 则通过 GGUF 分发保持关注度。两个量化条目的下载量明显领先，说明部署便利性与工具链适配是重要吸引力。社区分发者与微软官方账号共同出现，体现多层次供给。样本未含闭源服务，不能据此判断开源权重相对闭源的整体份额变化；权重可下载也不等于许可证完全开放。

## 值得探索

1. **[Qwen-Image-2.1-Turbo-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Turbo-Quantized)**  
   适合研究量化图像生成与 ComfyUI 工作流。重点比较不同量化档位的显存占用、生成速度及画质损失。

2. **[DeepSeek-V4.1-Flash-1017-GGUF](https://huggingface.co/unsloth/DeepSeek-V4.1-Flash-1017-GGUF)**  
   适合关注 GGUF 部署的开发者。建议先核实硬件需求、推理框架兼容性与视觉组件支持，再评估实际性能。

3. **[Mage-VL-Cowork](https://huggingface.co/microsoft/Mage-VL-Cowork)**  
   适合研究视觉语言任务的团队。可从模型卡、评测结果与许可条件入手，验证其是否适配目标图文场景。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*