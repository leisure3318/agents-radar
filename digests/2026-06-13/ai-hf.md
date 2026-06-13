# Hugging Face 热门模型日报 2026-06-13

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-06-13 01:39 UTC

---

# Hugging Face 热门模型日报（2026-06-13）

## 1) 今日速览
今天榜单的核心信号是：**多模态模型继续占据热度中心**，并且明显向“图文理解 + 代码能力 + 本地可部署”方向延展。  
**moonshotai/Kimi-K2.7-Code** 与 **MiniMaxAI/MiniMax-M3** 分别代表了国内头部模型家族在多模态与代码场景上的持续发力。  
同时，**GGUF** 量化版本的上榜说明社区对**本地推理、低门槛部署**的需求仍在上升。  
榜单里还有一个偏生成/视觉风格的模型，说明 Hugging Face 上的热度不只集中在 LLM，也延伸到更广泛的生成式模型生态。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
> 本日列表中没有纯文本 LLM/对话模型，热门项主要集中在多模态与代码方向。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### 1. [moonshotai/Kimi-K2.7-Code](https://huggingface.co/moonshotai/Kimi-K2.7-Code)
- **作者**：moonshotai  
- **点赞**：342  
- **下载**：0  
- **一句话说明**：面向代码场景的 Kimi 系列模型，带有多模态/图文输入相关标签，热度领先，说明“**代码能力 + 多模态理解**”仍是当前最受关注的组合之一。

#### 2. [MiniMaxAI/MiniMax-M3](https://huggingface.co/MiniMaxAI/MiniMax-M3)
- **作者**：MiniMaxAI  
- **点赞**：257  
- **下载**：442  
- **一句话说明**：MiniMax 的多模态模型，标签显示其为 image-text-to-text 与 multimodal，说明它主打**图文理解与生成式交互**，属于当前最活跃的模型赛道之一。

#### 3. [RazzzHF/Realism_Engine_Ideogram_4](https://huggingface.co/RazzzHF/Realism_Engine_Ideogram_4)
- **作者**：RazzzHF  
- **点赞**：84  
- **下载**：0  
- **一句话说明**：从名称看偏向视觉生成/写实风格增强，虽然任务标签为 N/A，但仍进入热门榜，反映出**视觉生成与风格化模型**在社区有稳定关注度。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

#### 1. [Jackrong/Qwopus3.6-27B-Coder-MTP-GGUF](https://huggingface.co/Jackrong/Qwopus3.6-27B-Coder-MTP-GGUF)
- **作者**：Jackrong  
- **点赞**：116  
- **下载**：0  
- **一句话说明**：27B 级别的 coder 模型，明确带有 **GGUF** 标签，说明它既是代码专用方向，也面向本地推理/桌面部署，属于“**大模型能力 + 社区可用性**”兼顾的代表。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### 1. [Jackrong/Qwopus3.6-27B-Coder-MTP-GGUF](https://huggingface.co/Jackrong/Qwopus3.6-27B-Coder-MTP-GGUF)
- **作者**：Jackrong  
- **点赞**：116  
- **下载**：0  
- **一句话说明**：GGUF 格式本身就是本地部署生态的重要信号，这类模型通常更易在 llama.cpp 等推理栈中使用，反映出社区对**低成本量化与离线运行**的强需求。

---

## 3) 生态信号
当前势头最强的是 **Kimi、MiniMax** 这类国内头部多模态/代码模型家族，说明模型竞争已从“单纯聊天”转向“图文理解、代码生成、复杂任务协同”。榜单中 **safetensors、gguf、compressed-tensors** 等格式频繁出现，表明开源权重与可部署版本依旧是 Hugging Face 热门来源。值得注意的是，**量化与社区再打包**正在放大模型热度：即使下载量不高，只要可本地运行、易集成，就会快速获得关注。

---

## 4) 值得探索
1. **[moonshotai/Kimi-K2.7-Code](https://huggingface.co/moonshotai/Kimi-K2.7-Code)**  
   值得优先研究：热度最高，且兼具代码与多模态标签，适合观察新一代“编码 + 视觉理解”能力边界。

2. **[MiniMaxAI/MiniMax-M3](https://huggingface.co/MiniMaxAI/MiniMax-M3)**  
   值得尝试：下载量已出现，说明社区可用性较强；适合评估图文交互、多模态问答等应用。

3. **[Jackrong/Qwopus3.6-27B-Coder-MTP-GGUF](https://huggingface.co/Jackrong/Qwopus3.6-27B-Coder-MTP-GGUF)**  
   值得关注：GGUF 让它非常适合本地部署场景，适合研究量化后代码模型的实际可用性与性能损失。

如果你愿意，我也可以把这份日报进一步整理成**适合公众号发布的版式**，或者输出成**Markdown/表格版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*