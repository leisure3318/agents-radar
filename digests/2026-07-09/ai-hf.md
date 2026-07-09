# Hugging Face 热门模型日报 2026-07-09

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-07-09 01:12 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-07-09**

## 今日速览
今天的热门榜单呈现出明显的**“视觉生成 + 轻量化部署”**双主线：两款围绕 **Krea-2** 的图像编辑/ControlNet 模型冲到前列，说明社区对高质量可控生成的关注持续升温。  
语言模型方面，**DeepSeek-V4-Flash-GGUF** 和 **Laguna-XS-2.1** 代表了“更快、更轻、更易部署”的趋势，其中 GGUF 版本尤其适合本地推理。  
整体看，热门模型并不一定依赖高下载量，**点赞驱动的关注度**更偏向“新架构、强功能、易落地”的模型。  
这反映出 Hugging Face 生态正在从单纯追求大模型，转向**可控生成、快速部署和社区适配**并重。

---

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
1. **[poolside/Laguna-XS-2.1](https://huggingface.co/poolside/Laguna-XS-2.1)**  
   - 作者：poolside  
   - 点赞：76  
   - 下载：3,385  
   - 一句话说明：这是一个面向文本生成的语言模型，既有较高下载量也有不错点赞，说明它兼具“可用性”和“讨论热度”，是当前榜单中最典型的 LLM 热门项。

### 🎨 多模态与生成（图像、视频、音频、文本到X）
1. **[conradlocke/krea2-identity-edit](https://huggingface.co/conradlocke/krea2-identity-edit)**  
   - 作者：conradlocke  
   - 点赞：98  
   - 下载：0  
   - 一句话说明：基于 **Krea-2-Raw** 的图像编辑 LoRA，聚焦身份保持与编辑一致性，属于当下很受欢迎的“可控图像编辑”方向，因此点赞冲到榜首。

2. **[Patil/Krea-2-depth-controlnet](https://huggingface.co/Patil/Krea-2-depth-controlnet)**  
   - 作者：Patil  
   - 点赞：71  
   - 下载：0  
   - 一句话说明：这是一个面向 Krea-2 的深度控制 ControlNet/LoRA，用于增强图像生成中的结构约束与可控性，体现了生成模型从“会画”走向“可控地画”的趋势。

### 🔧 专用模型（代码、数学、医疗、嵌入）
- 暂无明显归类到代码/数学/医疗/嵌入的热门模型。

### 📦 微调与量化（社区微调、GGUF、AWQ）
1. **[unsloth/DeepSeek-V4-Flash-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-GGUF)**  
   - 作者：unsloth  
   - 点赞：96  
   - 下载：47  
   - 一句话说明：这是 DeepSeek-V4-Flash 的 GGUF 量化/封装版本，主打本地和低门槛部署；高点赞说明社区对“能快速跑起来”的大模型版本非常买账。

---

## 生态信号
Krea-2 家族明显在视觉编辑与可控生成方向上升温，说明社区正追捧“身份保持、深度控制”这类实用能力。语言模型侧，DeepSeek 与轻量部署版本继续受关注，反映出**开源权重 + 易部署格式**仍是主流偏好。与此同时，GGUF、LoRA、ControlNet 这类可复用的社区适配层持续活跃，说明模型生态正在从“发布基础模型”转向“发布可直接落地的能力包”。

---

## 值得探索
1. **[conradlocke/krea2-identity-edit](https://huggingface.co/conradlocke/krea2-identity-edit)**  
   适合关注身份保持、图像编辑一致性和 LoRA 适配的研究者或创作者。

2. **[unsloth/DeepSeek-V4-Flash-GGUF](https://huggingface.co/unsloth/DeepSeek-V4-Flash-GGUF)**  
   值得测试其本地推理效率与实际可用性，尤其适合部署和量化实践。

3. **[poolside/Laguna-XS-2.1](https://huggingface.co/poolside/Laguna-XS-2.1)**  
   作为榜单中下载量最高的文本生成模型，适合观察其质量、响应速度与应用场景适配能力。

如果你愿意，我也可以把这份日报进一步整理成**适合公众号/飞书文档的版式**，或者输出成**表格版 CSV/Markdown**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*