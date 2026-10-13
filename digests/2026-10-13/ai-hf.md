# Hugging Face 热门模型日报 2026-10-13

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-10-13 05:55 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-10-13**

## 1. 今日速览

今日 Hugging Face 热榜由图像生成、多模态理解与社区量化模型主导。  
**Qwen-Image 相关量化版本**以超高点赞和下载量领跑，显示 ComfyUI 与 GGUF 生态仍在快速扩张。  
**MiniCPM-V-4.7-35B-A3B**代表开源视觉语言模型继续向大参数、多模态推理方向演进。  
同时，基于 Qwen 系列 MoE 架构的专用模型也开始进入趋势榜，说明社区正在围绕主流开源底座进行更细分的任务适配。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

暂无纯文本 LLM 或对话模型进入今日 Top 3。  
不过，MiniCPM-V 与 JEV-35B 均体现了大模型能力向多模态和专用任务迁移的趋势。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized)  
- 作者：abenzerps  
- 点赞数：4,121  
- 下载数：2,188,658  
- 一句话说明：这是一个面向图像生成的 Qwen-Image 2.1 社区量化版本，凭借 GGUF、ComfyUI 兼容和极高下载量成为今日最热模型。

#### [openbmb/MiniCPM-V-4.7-35B-A3B](https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B)  
- 作者：openbmb  
- 点赞数：195  
- 下载数：166  
- 一句话说明：这是 OpenBMB 发布的 35B 级视觉语言模型，用于图像到文本、多模态理解与推理，体现开源 VLM 的持续升级。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

#### [autotrust/JEV-35B](https://huggingface.co/autotrust/JEV-35B)  
- 作者：autotrust  
- 点赞数：248  
- 下载数：6,262  
- 一句话说明：这是一个基于 Qwen3.5 MoE 相关生态的 35B 专用模型，任务标注为文本分类，同时带有多模态相关标签，显示专用评估与分类模型的热度上升。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized)  
- 作者：abenzerps  
- 点赞数：4,121  
- 下载数：2,188,658  
- 一句话说明：该模型是 Qwen-Image 2.1 的量化版本，标签包含 GGUF、ComfyUI、comfyui-gguf，说明社区对低门槛本地部署图像生成模型需求强烈。

---

## 3. 生态信号

今日榜单显示，**Qwen 系列**仍是社区最活跃的模型家族之一，不仅覆盖图像生成，也延伸到 MoE 与专用任务模型。MiniCPM-V 的上榜则说明开源多模态模型正在继续追赶闭源能力，尤其在视觉理解和图文推理场景中保持热度。值得注意的是，量化模型的传播效率明显高于原始大模型，GGUF、ComfyUI 等部署友好标签正在成为模型快速流行的重要因素。

---

## 4. 值得探索

1. **[abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized)**  
   下载量极高，适合研究 Qwen-Image 在本地化、量化和 ComfyUI 工作流中的实际表现。

2. **[openbmb/MiniCPM-V-4.7-35B-A3B](https://huggingface.co/openbmb/MiniCPM-V-4.7-35B-A3B)**  
   适合关注开源视觉语言模型能力边界的研究者，尤其是图像理解、OCR、多模态问答和复杂视觉推理场景。

3. **[autotrust/JEV-35B](https://huggingface.co/autotrust/JEV-35B)**  
   点赞和下载表现均不错，值得进一步观察其在文本分类、评估任务或 Qwen3.5 MoE 生态中的定位。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*