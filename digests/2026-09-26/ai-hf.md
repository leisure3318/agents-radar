# Hugging Face 热门模型日报 2026-09-26

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-09-26 04:01 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-09-26**

## 1. 今日速览

今日 Hugging Face 热榜明显由 **Qwen 生态与视觉生成模型**主导，Qwen-Image-2.1 相关模型同时出现在 LoRA 加速版与 GGUF 量化版中。多模态方向持续升温，OCR、图像生成、图文理解模型都获得较高关注。值得注意的是，部分模型点赞数很高但下载数较低，显示出社区对新发布模型的早期关注与观望并存。量化模型下载量突出，说明本地部署和低成本推理仍是开源社区的重要需求。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

暂无纯语言模型上榜。本期更偏向多模态、图像生成与量化部署方向。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### [Viggle/Qwen-Image-2.1-viggle-turbo](https://huggingface.co/Viggle/Qwen-Image-2.1-viggle-turbo)  
- **作者**：Viggle  
- **点赞数**：238  
- **下载数**：47,873  
- **一句话说明**：基于 Qwen-Image-2.1 的 LoRA / Diffusers 图像生成与图生图模型，因生成效率和 Qwen 图像生态热度登上趋势榜。

#### [StarDoc-AI/TeleOCR](https://huggingface.co/StarDoc-AI/TeleOCR)  
- **作者**：StarDoc-AI  
- **点赞数**：315  
- **下载数**：32,056  
- **一句话说明**：基于 Qwen2.5-VL 的图像到文本 OCR 模型，面向文档识别与视觉文本理解，是今日点赞最高模型。

#### [akhilaaa3/Jev-Omni](https://huggingface.co/akhilaaa3/Jev-Omni)  
- **作者**：akhilaaa3  
- **点赞数**：234  
- **下载数**：0  
- **一句话说明**：标注为 text-classification，同时带有 image-text-to-text 与 gemma4_unified 标签，显示其可能面向统一多模态理解任务，但目前尚无下载数据。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

#### [StarDoc-AI/TeleOCR](https://huggingface.co/StarDoc-AI/TeleOCR)  
- **作者**：StarDoc-AI  
- **点赞数**：315  
- **下载数**：32,056  
- **一句话说明**：专注 OCR 与文档图像理解，适合票据、截图、扫描件、表格等结构化文本提取场景。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [unsloth/Qwen-Image-2.1-GGUF](https://huggingface.co/unsloth/Qwen-Image-2.1-GGUF)  
- **作者**：unsloth  
- **点赞数**：228  
- **下载数**：130,465  
- **一句话说明**：Qwen-Image-2.1 的 GGUF 量化版本，下载量位居本期最高，反映社区对本地化、低显存部署图像生成模型的强需求。

#### [Viggle/Qwen-Image-2.1-viggle-turbo](https://huggingface.co/Viggle/Qwen-Image-2.1-viggle-turbo)  
- **作者**：Viggle  
- **点赞数**：238  
- **下载数**：47,873  
- **一句话说明**：以 LoRA 形式发布的 Qwen-Image-2.1 加速/增强版本，体现社区围绕热门基座模型进行轻量微调的活跃度。

---

## 3. 生态信号

本期最强信号来自 **Qwen 图像与视觉多模态生态**：Qwen-Image-2.1 同时出现 LoRA 加速版和 GGUF 量化版，说明热门基座模型正快速形成微调、压缩、部署工具链。开源权重仍具吸引力，尤其是可本地运行的量化模型下载量显著领先。OCR 与图文理解模型也持续升温，显示企业级文档智能仍是多模态落地的重要场景。

---

## 4. 值得探索

1. **[StarDoc-AI/TeleOCR](https://huggingface.co/StarDoc-AI/TeleOCR)**  
   今日点赞最高，适合研究 Qwen2.5-VL 在 OCR、文档理解、复杂版面识别中的效果。

2. **[unsloth/Qwen-Image-2.1-GGUF](https://huggingface.co/unsloth/Qwen-Image-2.1-GGUF)**  
   下载量最高，值得关注其在本地推理、低显存图像生成和 GGUF 工作流中的实际表现。

3. **[Viggle/Qwen-Image-2.1-viggle-turbo](https://huggingface.co/Viggle/Qwen-Image-2.1-viggle-turbo)**  
   结合 LoRA 与 Diffusers 生态，适合探索 Qwen-Image-2.1 的快速微调、图生图和创意生成能力。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*