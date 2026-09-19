# Hugging Face 热门模型日报 2026-09-19

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-09-19 03:40 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-09-19**

## 1. 今日速览

今日 Hugging Face 热榜呈现出三个明确信号：**低比特量化大模型、MoE/新架构预览模型、RL Agent** 正在获得社区关注。  
榜首的 **Ternary-Bonsai-2-27B-mlx-2bit** 显示出端侧/本地高效推理需求持续升温，尤其是 MLX 与 2-bit/ternary 量化方向。  
**Atria-Dawn-Preview** 凭借 GLM/MoE 相关标签和中英双语能力受到关注，可能代表新一代开源大模型架构探索。  
同时，**laya** 作为 RL Agent 方向模型上榜，说明 Agent 与强化学习系统正在从研究概念走向社区实验。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### [internlm/Atria-Dawn-Preview](https://huggingface.co/internlm/Atria-Dawn-Preview)
- **作者**：internlm  
- **点赞数**：168  
- **下载数**：711  
- **一句话说明**：一个带有 GLM/MoE 相关架构标签、支持中英场景的预览模型，因新架构探索与论文关联受到社区关注。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

暂无明显属于图像、视频、音频或文本到 X 生成方向的模型进入今日 Top 3。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

#### [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya)
- **作者**：convaiinnovations  
- **点赞数**：154  
- **下载数**：0  
- **一句话说明**：一个面向强化学习与 Agent 系统的模型，因 RL-agent、system-one 等标签反映出社区对智能体训练范式的兴趣。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [prism-ml/Ternary-Bonsai-2-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-mlx-2bit)
- **作者**：prism-ml  
- **点赞数**：187  
- **下载数**：5,056  
- **一句话说明**：一个面向 MLX 生态的 27B 级 2-bit/ternary 量化文本生成模型，因低比特高效推理和较高下载量登顶趋势榜。

---

## 3. 生态信号

今日榜单显示，开源模型生态正在向“**更大参数、更低成本、更强 Agent 化**”演进。Prism 相关量化模型说明端侧推理和 Apple MLX 生态热度继续上升，2-bit、ternary 等极低比特方案成为社区重点实验方向。InternLM/Atria 的出现反映 MoE、新型架构和中英双语能力仍是大模型竞争焦点。与此同时，RL Agent 模型上榜表明强化学习驱动的智能体系统正在成为开源社区的新增长点。

---

## 4. 值得探索

### 1. [prism-ml/Ternary-Bonsai-2-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-mlx-2bit)
适合关注本地部署、Apple Silicon、低显存推理的开发者研究。它的 2-bit/ternary 量化路线值得测试在速度、质量和资源占用之间的平衡。

### 2. [internlm/Atria-Dawn-Preview](https://huggingface.co/internlm/Atria-Dawn-Preview)
值得关注其 GLM/MoE 相关架构设计与中英双语表现，尤其适合研究新一代开源 LLM 架构和预览模型能力边界。

### 3. [convaiinnovations/laya](https://huggingface.co/convaiinnovations/laya)
适合对 RL Agent、智能体决策和系统级 AI 应用感兴趣的研究者尝试，尽管当前下载数为 0，但其方向具备前沿探索价值。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*