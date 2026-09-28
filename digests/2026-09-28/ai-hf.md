# Hugging Face 热门模型日报 2026-09-28

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 2 个模型 | 生成时间: 2026-09-28 04:16 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-09-28**

## 1. 今日速览

今日 Hugging Face 热榜由两个偏应用型模型领跑，显示出社区关注点正从通用大模型扩展到“可直接落地”的专业能力。**XingChen-AGI/TeleOCR** 以 613 点赞位居第一，说明 OCR 与多模态文档理解仍是高热方向。**fastino/GLiNER2.5-Decide** 则体现了轻量级信息抽取、意图识别和 token classification 模型的持续需求。整体来看，专用任务模型正在借助开源权重和 Transformers 生态快速传播。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

暂无今日上榜模型。  
本期热榜未出现纯 LLM、对话模型或指令微调模型，关注点更多集中在 OCR、多模态理解与信息抽取任务。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### [XingChen-AGI/TeleOCR](https://huggingface.co/XingChen-AGI/TeleOCR)

- **作者**：XingChen-AGI  
- **点赞数**：613  
- **下载数**：27,837  
- **任务**：image-text-to-text  
- **标签**：transformers, safetensors, qwen2_5_vl, image-text-to-text, ocr  
- **一句话说明**：TeleOCR 是基于视觉语言模型能力的 OCR / 图像文字理解模型，凭借高热度 OCR 场景和 Qwen2.5-VL 相关生态获得大量关注。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

#### [fastino/GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide)

- **作者**：fastino  
- **点赞数**：209  
- **下载数**：19,757  
- **任务**：token-classification  
- **标签**：gliner2, safetensors, extractor, Text classification, Intent classification  
- **一句话说明**：GLiNER2.5-Decide 面向实体抽取、文本分类和意图识别等信息抽取任务，因其轻量、专用、易集成的特点进入趋势榜。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

暂无今日上榜模型。  
本期未出现明显以 GGUF、AWQ、GPTQ 或社区量化为核心卖点的模型。

---

## 3. 生态信号

今日热榜显示，**Qwen2.5-VL 相关多模态生态**继续保持强势，OCR、文档理解、图像文字转写等落地场景热度很高。与此同时，GLiNER 系列代表的轻量级信息抽取模型也在增长，说明企业级 NLP 仍需要低成本、可部署的专用模型。开源权重依然是传播主力，safetensors 与 Transformers 标签表明模型正围绕标准化加载和部署形成生态。量化模型本期不突出，但专用微调模型的实用价值正在上升。

---

## 4. 值得探索

### 1. [XingChen-AGI/TeleOCR](https://huggingface.co/XingChen-AGI/TeleOCR)

适合重点测试 OCR、票据识别、截图文字理解、复杂版面解析等任务。其高点赞和高下载量说明社区对多模态 OCR 的需求非常集中。

### 2. [fastino/GLiNER2.5-Decide](https://huggingface.co/fastino/GLiNER2.5-Decide)

值得用于实体抽取、意图分类和结构化信息提取场景研究。相比通用 LLM，GLiNER 类模型通常更轻量，适合低延迟或批量文本处理工作流。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*