# Hugging Face 热门模型日报 2026-09-23

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-09-23 03:48 UTC

---

# Hugging Face 热门模型日报（2026-09-23）

## 1. 今日速览

今日 Hugging Face 热榜显示，**Qwen 生态继续强势扩张**，从图像生成到多模态蒸馏模型均有高热度项目上榜。社区对 **GGUF 量化、ComfyUI 部署、端侧推理** 的关注度持续升温，说明“可本地运行”的模型仍是重要趋势。与此同时，具备 **tool-calling / function-calling** 能力的小型专用语言模型也在获得开发者关注，面向 Agent 和设备端场景的模型正在加速成熟。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### [Cactus-Compute/needle3](https://huggingface.co/Cactus-Compute/needle3)
- 作者：Cactus-Compute  
- 点赞数：189  
- 下载数：54,528  
- 一句话说明：needle3 是面向 **tool-calling / function-calling** 与端侧部署的文本生成模型，因 Agent 工具调用和 on-device 应用需求增长而受到关注。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF)
- 作者：abenzerps  
- 点赞数：1,166  
- 下载数：182,313  
- 一句话说明：这是 Qwen-Image 2.1 的 GGUF 版本，面向本地图像生成与 ComfyUI 工作流，凭借高下载量和低门槛部署登顶热榜。

#### [XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B)
- 作者：XiaomiMiMo  
- 点赞数：351  
- 下载数：804  
- 一句话说明：MiMo-V2.6-Distill-Qwen-9B 是基于 Qwen 系列蒸馏的图文理解模型，聚焦 image-text-to-text 多模态任务，体现了小米在多模态模型上的持续投入。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

#### [Cactus-Compute/needle3](https://huggingface.co/Cactus-Compute/needle3)
- 作者：Cactus-Compute  
- 点赞数：189  
- 下载数：54,528  
- 一句话说明：needle3 可视为面向工具调用、函数调用和端侧 Agent 场景的专用文本生成模型，适合研究轻量化智能体执行能力。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF)
- 作者：abenzerps  
- 点赞数：1,166  
- 下载数：182,313  
- 一句话说明：该模型以 GGUF 格式发布，便于本地推理和 ComfyUI 集成，是社区量化与图像生成模型结合的代表案例。

#### [XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B)
- 作者：XiaomiMiMo  
- 点赞数：351  
- 下载数：804  
- 一句话说明：该模型采用蒸馏路线，将 Qwen 系列能力压缩到 9B 规模，反映出多模态模型向更小、更易部署方向演进。

---

## 3. 生态信号

今日榜单最明显的信号是 **Qwen 家族热度持续走高**：既有 Qwen-Image 的社区 GGUF 版本，也有基于 Qwen 的多模态蒸馏模型。开源权重与社区再分发仍具强吸引力，尤其是能在本地、ComfyUI 或端侧环境中运行的模型更容易获得下载量。量化、蒸馏和工具调用成为三条并行主线，显示开发者正在从“模型能力”转向“可部署、可集成、可执行”的实用价值。

---

## 4. 值得探索

1. **[abenzerps/Qwen-Image-2.1-Uncensored-GGUF](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-GGUF)**  
   适合关注本地图像生成、ComfyUI 工作流和 GGUF 推理性能的用户，下载量极高，说明社区采用度很强。

2. **[XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B](https://huggingface.co/XiaomiMiMo/MiMo-V2.6-Distill-Qwen-9B)**  
   值得研究其图文理解能力与蒸馏效果，尤其适合评估中小规模多模态模型在实际应用中的表现。

3. **[Cactus-Compute/needle3](https://huggingface.co/Cactus-Compute/needle3)**  
   推荐给关注 Agent、函数调用、工具调用和端侧部署的开发者，可用于探索轻量化模型在自动化任务中的可用性。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*