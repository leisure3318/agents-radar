# Hugging Face 热门模型日报 2026-06-21

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-06-21 02:01 UTC

---

# Hugging Face 热门模型日报（2026-06-21）

## 1) 今日速览
今天的热门榜单呈现出明显的“**多模态文档理解 + 高效嵌入 + 生成式 LoRA 适配**”三条主线。  
其中，`datalab-to/lift` 以 **image-text-to-text** 形式切入 PDF/文档场景，说明多模态文档理解仍是强需求方向。  
`LiquidAI/LFM2.5-Embedding-350M` 代表了**轻量高性能嵌入模型**继续走热，适合检索、RAG 与语义匹配。  
`ostris/ideogram_4_turbotime_lora` 则体现出社区对**大底座上的风格/能力微调**依旧活跃，LoRA 生态持续繁荣。  

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- 本日报无直接进入榜单的纯 LLM / 对话 / 指令微调模型。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### 1. [datalab-to/lift](https://huggingface.co/datalab-to/lift)
- **作者**：datalab-to  
- **点赞数**：87  
- **下载数**：0  
- **一句话说明**：这是一个 **image-text-to-text** 模型，结合 `qwen3_5` 与 `pdf` 标签，明显面向文档/图文理解场景；高点赞但下载尚少，说明它可能是**新发布、讨论度高**的热门模型。

#### 2. [ostris/ideogram_4_turbotime_lora](https://huggingface.co/ostris/ideogram_4_turbotime_lora)
- **作者**：ostris  
- **点赞数**：82  
- **下载数**：1,679  
- **一句话说明**：这是一个基于 `ideogram-ai/ideogram-4-fp8` 的 **LoRA 文生图微调**，说明社区仍在围绕强生成底座做快速风格/能力扩展，因此能在趋势榜上保持热度。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

#### 1. [LiquidAI/LFM2.5-Embedding-350M](https://huggingface.co/LiquidAI/LFM2.5-Embedding-350M)
- **作者**：LiquidAI  
- **点赞数**：81  
- **下载数**：6,128  
- **一句话说明**：这是一个 **句向量/语义嵌入模型**，350M 参数量强调轻量与效率，适合检索、召回、聚类和 RAG，是当前应用落地最活跃的模型类型之一。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）
- 本日报榜单中未出现典型的 GGUF / AWQ / 纯量化发布，但 `ostris/ideogram_4_turbotime_lora` 属于典型的**社区微调适配器**，可视作该类生态的重要信号。

---

## 3) 生态信号
当前势头最强的家族主要集中在 **Qwen 系多模态文档理解**、**轻量嵌入模型** 和 **生成式底座 LoRA 生态**。开源权重依然是主流，但生成侧越来越多依赖“**强底座 + 开放适配器**”的组合，体现出底座能力集中化、上层创新分散化的趋势。值得注意的是，嵌入模型与 LoRA 微调都在加速产品化，说明社区正在从“追逐大模型”转向“**追逐可部署、可集成、可定制**”的模型。

---

## 4) 值得探索
1. **[LiquidAI/LFM2.5-Embedding-350M](https://huggingface.co/LiquidAI/LFM2.5-Embedding-350M)**  
   适合检索、RAG、推荐与语义搜索；参数规模适中，通常更容易部署。

2. **[datalab-to/lift](https://huggingface.co/datalab-to/lift)**  
   如果你关注 PDF 理解、图文问答、文档智能，这个模型很值得研究，尤其适合多模态文档管线。

3. **[ostris/ideogram_4_turbotime_lora](https://huggingface.co/ostris/ideogram_4_turbotime_lora)**  
   适合观察 LoRA 如何在强文生图底座上做能力/风格增量，是研究生成模型社区生态的好样本。  

如果你愿意，我也可以把这份日报进一步整理成**适合公众号发布的排版版**，或改成**表格版/Markdown 版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*