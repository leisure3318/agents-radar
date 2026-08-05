# Hugging Face 热门模型日报 2026-08-05

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-08-05 00:58 UTC

---

# Hugging Face 热门模型日报（2026-08-05）

## 1) 今日速览
今天榜单呈现出很清晰的两条主线：一是**轻量高效的语言模型**仍然最受欢迎，LiquidAI 的小参数模型同时拿到高点赞和高下载，说明“能用、易部署”依旧是社区核心偏好。二是**超大参数 MoE 架构**继续吸引关注，LGAI-EXAONE 的 750B 级模型虽然下载不高，但代表了前沿架构探索热度。第三个亮点来自**文本到视频**方向，MiniMax-H3 的 GGUF 社区封装下载表现强势，显示出多模态生成模型的本地化需求正在上升。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

**1. [LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B)**  
- 作者：LiquidAI  
- 点赞：149 | 下载：47,393  
- 一句话说明：一款 2.6B 规模的轻量级文本生成模型，兼顾效率与可用性，凭借高下载量和高点赞成为今日最具“实用热度”的模型之一。

**2. [LGAI-EXAONE/K-EXAONE-2.0-750B-A37B](https://huggingface.co/LGAI-EXAONE/K-EXAONE-2.0-750B-A37B)**  
- 作者：LGAI-EXAONE  
- 点赞：116 | 下载：325  
- 一句话说明：超大规模 MoE 语言模型，代表当前高上限架构路线；虽然下载不多，但因参数规模与技术含量极高，容易在趋势榜上获得关注。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

**1. [realrebelai/MiniMax-H3_GGUFs](https://huggingface.co/realrebelai/MiniMax-H3_GGUFs)**  
- 作者：realrebelai  
- 点赞：103 | 下载：40,010  
- 一句话说明：MiniMax-H3 的 GGUF 社区打包版本，面向文本到视频生成；高下载量说明大家不仅关注“模型本身”，也非常看重可本地运行、易集成的部署形态。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）
- 今日榜单中**暂无单独入榜**的专用模型。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

**1. [realrebelai/MiniMax-H3_GGUFs](https://huggingface.co/realrebelai/MiniMax-H3_GGUFs)**  
- 作者：realrebelai  
- 点赞：103 | 下载：40,010  
- 一句话说明：这是典型的社区量化/打包分发案例，GGUF 版本让文本到视频模型更容易在本地环境落地，也反映了“模型发布后，社区二次工程化”的活跃度。

---

## 3) 生态信号
本日报显示，**LiquidAI、EXAONE、MiniMax** 三条模型线都在升温：前两者代表语言模型的“高效小模型”与“超大 MoE”两端探索，后者则体现多模态生成的持续扩张。整体上，**开源权重与可运行封装**明显占优，尤其是 GGUF 这类便于本地部署的格式，热度很高。相比纯闭源产品，社区更偏爱“能下载、能跑、能改”的模型资产。

---

## 4) 值得探索

1. **[LiquidAI/LFM2.5-2.6B](https://huggingface.co/LiquidAI/LFM2.5-2.6B)**  
   理由：下载和点赞都高，适合关注轻量模型在真实应用中的性价比与部署体验。

2. **[LGAI-EXAONE/K-EXAONE-2.0-750B-A37B](https://huggingface.co/LGAI-EXAONE/K-EXAONE-2.0-750B-A37B)**  
   理由：MoE 前沿架构代表，适合研究超大模型的能力边界与路由设计。

3. **[realrebelai/MiniMax-H3_GGUFs](https://huggingface.co/realrebelai/MiniMax-H3_GGUFs)**  
   理由：文本到视频 + GGUF 社区封装，兼具生成能力和部署价值，适合看多模态模型的落地路径。

如果你愿意，我也可以把这份日报进一步整理成**适合公众号/周报发布的版式**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*