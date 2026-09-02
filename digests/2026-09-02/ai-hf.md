# Hugging Face 热门模型日报 2026-09-02

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 2 个模型 | 生成时间: 2026-09-02 03:27 UTC

---

# Hugging Face 热门模型日报（2026-09-02）

## 1) 今日速览
今天榜单数量不多，但信号非常清晰：**Google 的 TimeFM 3.0** 继续强化了时间序列基础模型在预测场景中的存在感，而 **Qwen 系列的 27B 量化社区版本** 说明大参数开源模型仍在向“可本地部署、低成本推理”方向快速演进。  
从点赞结构看，前者更像是“研究/产品发布驱动”，后者则体现了“社区分发与落地需求驱动”。  
整体趋势上，Hugging Face 热门模型仍由两类力量主导：一类是基础能力型大模型/基础模型，另一类是面向部署效率的量化与轻量化变体。  

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
#### 1. [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF)
- **作者**：ISTA-DASLab  
- **点赞数**：127  
- **下载数**：56,208  
- **一句话说明**：这是一个基于 Qwen 系列的 **27B 量化 GGUF** 版本，主打本地推理与低显存部署，因此在社区里获得了较高下载量和关注度。

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- **暂无上榜模型**

### 🔧 专用模型（代码、数学、医疗、嵌入）
#### 1. [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch)
- **作者**：google  
- **点赞数**：226  
- **下载数**：0  
- **一句话说明**：这是 Google 的 **时间序列预测基础模型**，面向 forecasting 场景，点赞数居首，说明研究关注度很高，属于专用领域基础模型的代表。

### 📦 微调与量化（社区微调、GGUF、AWQ）
#### 1. [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF)
- **作者**：ISTA-DASLab  
- **点赞数**：127  
- **下载数**：56,208  
- **一句话说明**：该模型采用 **GGUF + 量化/混合精度** 路线，典型地反映了社区对“大模型可部署化”的强需求，因此下载表现非常突出。

---

## 3) 生态信号
Qwen 体系仍保持强势，尤其是面向本地部署的 **GGUF/量化版本**，说明开源大模型的竞争焦点正在从“参数规模”转向“可用性与推理成本”。同时，**TimeFM 这类专用基础模型** 继续吸引研究关注，表明 Hugging Face 上的热点不只属于通用 LLM，垂直领域 foundation model 也在抬升存在感。总体来看，开源权重与社区二次分发的活跃度依然很高，量化、混合精度和轻量部署是当前最明确的工程化方向。

---

## 4) 值得探索
1. **[google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch)**  
   值得研究时间序列基础模型如何泛化到不同预测任务，适合关注金融、IoT、业务预测等场景。

2. **[ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF)**  
   适合验证大参数模型的本地部署效果、显存占用和推理吞吐，尤其适合边缘/私有化环境。

如需，我也可以把这份日报进一步整理成**适合公众号发布的版式**或**表格版 CSV/Markdown**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*