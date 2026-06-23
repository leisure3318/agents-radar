# Hugging Face 热门模型日报 2026-06-23

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-06-23 01:33 UTC

---

# Hugging Face 热门模型日报（2026-06-23）

## 1) 今日速览
今天的热门榜单呈现出三个明显方向：**OCR/文档理解、多模态大模型微调、以及检索/语义匹配模型**。  
其中，**baidu/Unlimited-OCR** 以较高点赞位居榜首，说明“文本识别 + 文档理解”仍是强需求赛道。  
**empero-ai/Qwythos-9B-Claude-Mythos-5-1M** 则体现出社区对 **Qwen 系列衍生模型** 的持续关注，尤其是高质量指令化与多模态能力结合的路线。  
**LiquidAI/LFM2.5-ColBERT-350M** 代表了检索基础设施层的热度，表明语义搜索、RAG 和向量检索依然是应用侧核心。  

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
#### 1. [empero-ai/Qwythos-9B-Claude-Mythos-5-1M](https://huggingface.co/empero-ai/Qwythos-9B-Claude-Mythos-5-1M)
- **作者**：empero-ai  
- **点赞数**：127  
- **下载数**：842  
- **一句话说明**：这是一个基于 **Qwen3.5/Qwen3_5** 生态的社区衍生模型，兼具文本生成与多模态标签，热度高主要因为它代表了“强底座 + 社区再训练/融合”的热门路线。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）
#### 1. [baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)
- **作者**：baidu  
- **点赞数**：169  
- **下载数**：47  
- **一句话说明**：这是面向 **image-text-to-text** 的 OCR/文档理解模型，适合从图片中提取文字并进行结构化理解；高点赞说明“文档智能化”和“视觉到文本”仍是当前最受关注的多模态方向。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）
#### 1. [LiquidAI/LFM2.5-ColBERT-350M](https://huggingface.co/LiquidAI/LFM2.5-ColBERT-350M)
- **作者**：LiquidAI  
- **点赞数**：78  
- **下载数**：2,202  
- **一句话说明**：这是一个用于 **sentence-similarity / 语义检索** 的 ColBERT 风格模型，下载量明显高于点赞数，说明它更偏向“实用型基础设施模型”，被大量用于搜索、召回和 RAG 管线。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）
- **本次榜单中未出现明显的 GGUF、AWQ 或显式量化模型。**
- 但 **Qwythos-9B-Claude-Mythos-5-1M** 这类命名方式通常意味着社区微调、融合或蒸馏/再训练活动活跃，属于“微调生态”的典型信号。

---

## 3) 生态信号
本期榜单显示，**Qwen 系列及其社区衍生模型** 仍是开源大模型生态的热门底座；同时，**OCR/文档理解** 与 **检索/语义匹配** 持续升温，说明应用落地仍强烈依赖“看得懂文档”和“找得到知识”。从发布形态看，榜单几乎全部是**开源权重**模型，HF 生态仍由开放模型驱动，闭源模型并未在热门榜中形成可见存在。量化类模型不突出，但社区微调、融合和任务定制化明显活跃。

---

## 4) 值得探索
1. **[baidu/Unlimited-OCR](https://huggingface.co/baidu/Unlimited-OCR)**  
   值得关注文档理解、票据识别、OCR + 信息抽取场景，属于高实用价值的多模态模型。

2. **[empero-ai/Qwythos-9B-Claude-Mythos-5-1M](https://huggingface.co/empero-ai/Qwythos-9B-Claude-Mythos-5-1M)**  
   适合研究 Qwen 生态的社区微调思路，以及文本生成与多模态能力的结合方式。

3. **[LiquidAI/LFM2.5-ColBERT-350M](https://huggingface.co/LiquidAI/LFM2.5-ColBERT-350M)**  
   非常适合做语义检索、RAG 召回和相似度匹配基线，下载量高说明其实用性强。

如果你愿意，我也可以把这份日报进一步整理成**适合公众号/简报发布的版式**，或者补一版**更偏行业解读的分析稿**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*