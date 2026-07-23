# Hugging Face 热门模型日报 2026-07-23

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 6 个模型 | 生成时间: 2026-07-23 01:06 UTC

---

# Hugging Face 热门模型日报（2026-07-23）

## 1) 今日速览
今天的榜单呈现出两个明显信号：一是**大参数语言模型继续冲高**，Upstage 的 `Solar-Open2-250B` 以 250B 级别规模领跑点赞；二是**生成式模型从“能用”走向“可编辑、可部署”**，微软的图像生成/编辑模型 `Mage-Flow` 和 NVIDIA 的 `Cosmos3-Edge` 都在关注度上表现突出。  
同时，`Laguna-S-2.1` 家族在不同发布方、不同量化格式中多点开花，说明**同一基础模型的生态分发、部署适配和社区再包装正在加速**。  
整体看，Hugging Face 热门榜更像是“**基础模型能力 + 量化部署 + 生成式应用**”三条线并行推进。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

- **[upstage/Solar-Open2-250B](https://huggingface.co/upstage/Solar-Open2-250B)**  
  作者：upstage ｜ 点赞：240 ｜ 下载：0  
  一句话说明：这是一个**250B 级别的大型文本生成模型**，能登顶点赞榜，说明社区对“高上限、强通用能力”的旗舰 LLM 仍然高度关注。

- **[poolside/Laguna-S-2.1-NVFP4](https://huggingface.co/poolside/Laguna-S-2.1-NVFP4)**  
  作者：poolside ｜ 点赞：91 ｜ 下载：1,953  
  一句话说明：这是 `Laguna-S-2.1` 的 **NVFP4 低精度推理版本**，点赞与下载都较高，体现出“面向部署优化”的语言模型版本很受欢迎。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

- **[microsoft/Mage-Flow](https://huggingface.co/microsoft/Mage-Flow)**  
  作者：microsoft ｜ 点赞：122 ｜ 下载：0  
  一句话说明：这是一个**文本到图像/图像编辑**方向的生成模型，榜单热度说明“可控生成 + 编辑能力”仍是当前最受关注的视觉模型方向之一。

- **[nvidia/Cosmos3-Edge](https://huggingface.co/nvidia/Cosmos3-Edge)**  
  作者：nvidia ｜ 点赞：89 ｜ 下载：6,623  
  一句话说明：这是 NVIDIA 的 **Cosmos3 系列边缘/生成式模型**，下载量最高，说明其在实际尝试、落地或推理测试方面的需求很强。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

- 本次榜单中**未出现明确的专用任务模型**。  
  说明当前热门仍主要集中在**通用语言模型**与**生成式视觉模型**上，垂直任务模型热度相对靠后。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

- **[unsloth/Laguna-S-2.1-GGUF](https://huggingface.co/unsloth/Laguna-S-2.1-GGUF)**  
  作者：unsloth ｜ 点赞：106 ｜ 下载：0  
  一句话说明：这是 `Laguna-S-2.1` 的 **GGUF 量化版本**，表明社区对本地推理、轻量化部署和多后端兼容的需求非常强。

- **[poolside/Laguna-S-2.1-GGUF](https://huggingface.co/poolside/Laguna-S-2.1-GGUF)**  
  作者：poolside ｜ 点赞：91 ｜ 下载：289  
  一句话说明：同一基础模型的官方/原作者量化包，说明 `Laguna-S-2.1` 正在以**多种量化形态覆盖不同推理场景**。

---

## 3) 生态信号
`Laguna-S-2.1` 家族势头最明显，既有原作者的 NVFP4，也有社区的 GGUF，说明模型生态已从“发模型”转向“发可部署版本”。`Solar-Open2-250B` 代表旗舰大模型仍有强吸引力，而 `Mage-Flow`、`Cosmos3-Edge` 则显示生成式视觉能力在持续升温。整体上，**开源权重在 HF 上仍占主导**，且“**量化 + 社区再包装**”正在成为热门模型扩散的核心路径。

---

## 4) 值得探索

1. **[upstage/Solar-Open2-250B](https://huggingface.co/upstage/Solar-Open2-250B)**  
   值得看作旗舰级 LLM 代表，适合评估大参数模型的能力边界与推理成本。

2. **[microsoft/Mage-Flow](https://huggingface.co/microsoft/Mage-Flow)**  
   适合关注文本到图像、图像编辑一体化能力，代表当前生成式视觉模型的主流方向。

3. **[poolside/Laguna-S-2.1-NVFP4](https://huggingface.co/poolside/Laguna-S-2.1-NVFP4)**  
   适合研究高性能低精度推理与部署优化，是“模型能力可落地”的典型样本。

如果你愿意，我也可以把这份日报进一步整理成**适合公众号/周报发布的排版版本**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*