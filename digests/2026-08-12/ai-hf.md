# Hugging Face 热门模型日报 2026-08-12

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 5 个模型 | 生成时间: 2026-08-12 02:03 UTC

---

# Hugging Face 热门模型日报（2026-08-12）

## 1) 今日速览
今天的榜单明显由**视频生成**和**高效语言模型**两条主线主导。  
[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) 以最高点赞领跑，说明图像/文本驱动的视频生成仍是最热赛道。  
[NVIDIA/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4) 下载量遥遥领先，体现生产级 LLM 仍有强劲需求。  
同时，MiniMax-H3 相关的 LoRA 与 GGUF 版本同时上榜，显示社区正在快速推动**风格微调**与**本地化部署**。  
[inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny) 则代表小模型与新架构实验继续受到关注。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

1. **[nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4)**  
   - 作者：nvidia  
   - 点赞：132｜下载：19,250  
   - 一句话说明：30B 级高效语言模型，兼顾性能与推理效率；下载量极高，说明它更接近“可落地、可部署”的热门 LLM。

2. **[inclusionAI/Ling-3.0-tiny](https://huggingface.co/inclusionAI/Ling-3.0-tiny)**  
   - 作者：inclusionAI  
   - 点赞：154｜下载：0  
   - 一句话说明：轻量级 tiny 模型，带有 custom code 与 MIT 许可；高点赞表明社区对新架构、小体积模型和低成本推理方案兴趣很高。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

1. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**  
   - 作者：Lightricks  
   - 点赞：228｜下载：39  
   - 一句话说明：面向 image-to-video / text-to-video / video-to-video 的生成模型，登顶点赞榜，反映视频生成仍是当前最受关注的生成方向。

2. **[fal/MiniMax-H3-Realism-People-LoRA](https://huggingface.co/fal/MiniMax-H3-Realism-People-LoRA)**  
   - 作者：fal  
   - 点赞：115｜下载：0  
   - 一句话说明：面向 MiniMax-H3 的人物写实 LoRA 微调版本，说明社区正在围绕视频基础模型做快速风格迁移与垂直优化。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

- **暂无入选**

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

1. **[unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF)**  
   - 作者：unsloth  
   - 点赞：110｜下载：781  
   - 一句话说明：MiniMax-H3 的 GGUF 量化版本，强调本地部署与低门槛推理；上榜说明“可运行性”和“可玩性”正在成为模型热度的重要来源。

---

## 3) 生态信号
本期最强势的是 **MiniMax-H3 生态**：既有 LoRA 风格微调，也有 GGUF 量化版本，说明社区正把新一代视频模型快速推向“可定制、可本地跑”。语言模型方面，**Nemotron** 代表高性能生产级路线，**Ling-3.0-tiny** 则体现轻量模型与新架构探索并行。整体看，榜单几乎清一色开源权重，热门竞争正从“谁发布”转向“谁更好用、可部署、可微调”。

---

## 4) 值得探索

1. **[nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-NVFP4)**  
   下载量最高，适合优先评估其推理效率、输出质量与实际部署成本。

2. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**  
   点赞第一，值得研究其在 image-to-video / text-to-video 上的生成稳定性和可控性。

3. **[unsloth/MiniMax-H3-GGUF](https://huggingface.co/unsloth/MiniMax-H3-GGUF)**  
   适合关注本地化部署、量化推理，以及视频生成模型的边缘端应用潜力。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*