# Hugging Face 热门模型日报 2026-09-24

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 2 个模型 | 生成时间: 2026-09-24 03:40 UTC

---

# Hugging Face 热门模型日报（2026-09-24）

## 1. 今日速览

今日 Hugging Face 热门榜呈现出两个明显方向：一是面向多语言场景的轻量级文本分类模型获得关注，二是 Qwen-Image 生态相关的 GGUF / 量化组件继续保持高下载量。  
`convaiinnovations/laya-multilingual` 以 223 点赞登顶，说明多语言分类与垂直 NLP 任务仍有稳定需求。  
`pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF` 下载量达到 74,291，显示社区对本地化、量化部署多模态模型组件的兴趣非常强。  
整体来看，热门模型不只集中在大语言模型本体，围绕多模态生成链路、推理加速和部署友好格式的模型资产正在快速升温。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

暂无明确属于通用 LLM、对话模型或指令微调方向的上榜模型。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### [pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF](https://huggingface.co/pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF)

- 作者：pottokao  
- 点赞数：207  
- 下载数：74,291  
- 一句话说明：这是 Qwen-Image 2.1 相关文本编码器的 GGUF / 量化版本，因适配 ComfyUI、本地推理和多模态生成工作流而获得大量下载。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

#### [convaiinnovations/laya-multilingual](https://huggingface.co/convaiinnovations/laya-multilingual)

- 作者：convaiinnovations  
- 点赞数：223  
- 下载数：0  
- 一句话说明：这是一个面向多语言文本分类任务的 Transformers / Safetensors 模型，因多语言能力和垂直分类场景需求登上趋势榜首。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF](https://huggingface.co/pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF)

- 作者：pottokao  
- 点赞数：207  
- 下载数：74,291  
- 一句话说明：该模型以 GGUF、FP8、quantized 等标签为核心，体现了社区对 Qwen-Image 组件进行本地化、低成本部署和 ComfyUI 集成的强烈需求。

---

## 3. 生态信号

今日榜单显示，Qwen-Image 相关生态仍在扩张，尤其是文本编码器、GGUF、FP8 等部署友好资产受到高度关注。相比闭源 API，开源权重与社区量化版本更利于本地工作流集成，下载量也更能反映真实使用需求。同时，多语言文本分类模型获得高点赞，说明除大模型聊天外，轻量、专用、可落地的 NLP 模型仍有稳定市场。社区正在从“发布大模型”转向“优化组件、适配工具链、降低部署门槛”。

---

## 4. 值得探索

1. **[pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF](https://huggingface.co/pottokao/Qwen-Image-2.1-Text-Encoder-Heretic-GGUF)**  
   适合关注 Qwen-Image、ComfyUI、本地多模态生成部署的开发者研究；其高下载量说明已有较强实际使用基础。

2. **[convaiinnovations/laya-multilingual](https://huggingface.co/convaiinnovations/laya-multilingual)**  
   适合评估多语言文本分类、跨语言内容审核、意图识别等场景；虽然下载数暂为 0，但高点赞显示其发布初期关注度较高。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*