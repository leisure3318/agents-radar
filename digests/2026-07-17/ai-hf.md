# Hugging Face 热门模型日报 2026-07-17

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 5 个模型 | 生成时间: 2026-07-17 01:07 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-07-17**

## 1) 今日速览
今天的热门榜单呈现出两个明显方向：一是**轻量化高性能语言模型**持续受关注，尤其是 MiniCPM5 和 Qwen3.5 相关社区量化版本；二是**视频生成/图像到视频**模型热度继续升温，说明多模态生成仍是生态增长最快的赛道之一。  
同时，榜单中出现了多款 **GGUF、MLX、1-bit/2-bit 量化**模型，表明社区正在积极追求“更低门槛部署 + 更高可用性”。  
整体来看，**开源权重、社区再发布、极致量化**是今天最强的三条主线。  

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### 1. [GnLOLot/MiniCPM5-1B-Claude-Opus-Fable5-V2-Thinking-GGUF](https://huggingface.co/GnLOLot/MiniCPM5-1B-Claude-Opus-Fable5-V2-Thinking-GGUF)
- **作者**：GnLOLot  
- **点赞数**：94  
- **下载数**：3,691  
- **一句话说明**：基于 MiniCPM5 的 1B 级 GGUF 社区量化版本，强调 *thinking* 能力与本地推理部署，因此在轻量推理和社区实验圈层中很受关注。

#### 2. [prism-ml/Ternary-Bonsai-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-27B-mlx-2bit)
- **作者**：prism-ml  
- **点赞数**：83  
- **下载数**：7,622  
- **一句话说明**：27B 级的 MLX 2-bit 量化模型，面向苹果生态与高效本地推理，凭借极致压缩和较强可用性跻身榜单前列。

#### 3. [prism-ml/Bonsai-27B-mlx-1bit](https://huggingface.co/prism-ml/Bonsai-27B-mlx-1bit)
- **作者**：prism-ml  
- **点赞数**：82  
- **下载数**：10,760  
- **一句话说明**：同属 Bonsai 系列的 1-bit 版本，代表社区对“更小显存、更低成本”部署形态的持续探索，下载量尤其突出。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### 4. [Wan-AI/Wan-Dancer-14B](https://huggingface.co/Wan-AI/Wan-Dancer-14B)
- **作者**：Wan-AI  
- **点赞数**：92  
- **下载数**：1,884  
- **一句话说明**：面向 image-to-video 的视频生成模型，说明 Wan 系列在多模态生成赛道持续受欢迎，属于当前最热的应用方向之一。

#### 5. [Cseti/LTX2.3-22B_IC-LoRA-CrossView-Prompt](https://huggingface.co/Cseti/LTX2.3-22B_IC-LoRA-CrossView-Prompt)
- **作者**：Cseti  
- **点赞数**：76  
- **下载数**：0  
- **一句话说明**：一个用于视频生成/novel-view-synthesis 的 LoRA 适配器，体现了“在大模型底座上做任务定制”的社区活跃度。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）
- **本日榜单暂无明显专用模型入榜。**

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### 6. [GnLOLot/MiniCPM5-1B-Claude-Opus-Fable5-V2-Thinking-GGUF](https://huggingface.co/GnLOLot/MiniCPM5-1B-Claude-Opus-Fable5-V2-Thinking-GGUF)
- **作者**：GnLOLot  
- **点赞数**：94  
- **下载数**：3,691  
- **一句话说明**：GGUF 格式明确指向 llama.cpp 本地部署生态，属于“社区微调 + 高可移植量化”的典型案例。

#### 7. [prism-ml/Ternary-Bonsai-27B-mlx-2bit](https://huggingface.co/prism-ml/Ternary-Bonsai-27B-mlx-2bit)
- **作者**：prism-ml  
- **点赞数**：83  
- **下载数**：7,622  
- **一句话说明**：2-bit 极低比特量化，代表社区在保持可用性的前提下不断压缩模型体积，适合本地/边缘部署研究。

#### 8. [prism-ml/Bonsai-27B-mlx-1bit](https://huggingface.co/prism-ml/Bonsai-27B-mlx-1bit)
- **作者**：prism-ml  
- **点赞数**：82  
- **下载数**：10,760  
- **一句话说明**：1-bit 量化进一步把“超低成本推理”推向极致，是当前量化技术热度与工程化价值的集中体现。

---

## 3) 生态信号
今天榜单显示，**MiniCPM5、Bonsai/Qwen3.5、Wan 视频生成**这几条家族线都在快速升温，说明社区关注点已从“单纯更大”转向“更强可部署性”。开源权重明显占优，榜单几乎全是社区可获取、可二次分发的模型。量化活动非常活跃，GGUF、MLX、1-bit/2-bit、LoRA 适配器等形态密集出现，体现出本地推理与低成本实验正成为主流需求。

---

## 4) 值得探索
1. **[Wan-AI/Wan-Dancer-14B](https://huggingface.co/Wan-AI/Wan-Dancer-14B)**  
   值得优先研究，因为它代表当前最热的视频生成方向之一，且应用空间广。

2. **[prism-ml/Bonsai-27B-mlx-1bit](https://huggingface.co/prism-ml/Bonsai-27B-mlx-1bit)**  
   极低比特量化很有研究价值，适合关注压缩、推理效率和边缘部署的人。

3. **[GnLOLot/MiniCPM5-1B-Claude-Opus-Fable5-V2-Thinking-GGUF](https://huggingface.co/GnLOLot/MiniCPM5-1B-Claude-Opus-Fable5-V2-Thinking-GGUF)**  
   兼具轻量化与思维链倾向，适合观察小模型推理能力与本地部署体验的平衡。  

如果你愿意，我也可以把这份日报进一步整理成**适合公众号发布的版式**，或补一版**更像行业简报的表格版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*