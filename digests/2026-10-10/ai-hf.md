# Hugging Face 热门模型日报 2026-10-10

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-10-10 04:51 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-10-10**

## 1. 今日速览

今日 Hugging Face 热榜呈现出明显的多模态与社区量化并行趋势：Qwen 系模型继续在图像生成、推理、代码与多模态方向保持高热度。图像与视频生成模型占据重要位置，尤其是 text-to-image、image-to-video 以及视频音频联合生成方向值得关注。与此同时，GGUF、llama.cpp、2-bit 量化等标签频繁出现，说明本地部署与低成本推理仍是社区关注重点。社区微调模型命名越来越复杂，往往融合代码、推理、工具调用和多阶段偏好优化能力。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0)
- **作者**：ConwayResearch  
- **点赞数**：203  
- **下载数**：15,274  
- **一句话说明**：这是一个面向本地推理和工具调用的 27B 文本生成模型，凭借 GGUF、llama.cpp、2-bit 量化和 function-calling 能力登上趋势榜。

#### [nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2](https://huggingface.co/nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2)
- **作者**：nerkyor  
- **点赞数**：139  
- **下载数**：8,873  
- **一句话说明**：这是基于 Qwen3.8 生态的社区微调模型，主打推理、efficient-thinking 与多阶段训练，因长链路 SFT/RLOO/MTP 等实验性组合受到关注。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### [Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo)
- **作者**：Qwen  
- **点赞数**：324  
- **下载数**：0  
- **一句话说明**：这是 Qwen 系列的高热度文生图与图像编辑模型，凭借 Turbo 版本、diffusers 支持和图像生成能力成为今日最高点赞模型。

#### [FrancisRing/Prism](https://huggingface.co/FrancisRing/Prism)
- **作者**：FrancisRing  
- **点赞数**：135  
- **下载数**：0  
- **一句话说明**：这是一个 image-to-video 模型，标签显示其关注 video diffusion transformer 与视频音频联合生成，反映社区对下一代视频生成模型的持续兴趣。

#### [nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2](https://huggingface.co/nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2)
- **作者**：nerkyor  
- **点赞数**：139  
- **下载数**：8,873  
- **一句话说明**：该模型任务标注为 image-text-to-text，说明其可能覆盖图文理解或多模态文本生成场景，是 Qwen 社区多模态微调方向的代表。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

#### [nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2](https://huggingface.co/nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2)
- **作者**：nerkyor  
- **点赞数**：139  
- **下载数**：8,873  
- **一句话说明**：从模型名中的 Coder、EfficientThink、reasoning 等关键词看，它面向代码与推理任务优化，体现社区对“编码 + 推理”复合能力的追求。

#### [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0)
- **作者**：ConwayResearch  
- **点赞数**：203  
- **下载数**：15,274  
- **一句话说明**：其 tool-calling 与 function-calling 标签使其适合 Agent、自动化工作流和工具增强型应用，是偏工程落地的专用 LLM。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0)
- **作者**：ConwayResearch  
- **点赞数**：203  
- **下载数**：15,274  
- **一句话说明**：该模型提供 GGUF、llama.cpp 与 2-bit 量化支持，显示出强烈的本地部署导向，也是今日下载量最高的模型。

#### [nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2](https://huggingface.co/nerkyor/Qwen3.8-27B-Coder390-EfficientThink-Opus5.5-GPT6Astra-Grok4.7-DSV4Pro-K3-SFT-RLOO-MTP-DFlash2)
- **作者**：nerkyor  
- **点赞数**：139  
- **下载数**：8,873  
- **一句话说明**：这是典型社区实验型微调模型，包含 safetensors、GGUF、SFT、RLOO、MTP 等信号，说明其面向可复现训练和本地推理分发。

---

## 3. 生态信号

今日热榜中，Qwen 家族势头最强：既有官方的 [Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo)，也有社区围绕 Qwen3.8 构建的推理、代码和多模态微调模型。开源权重与可下载格式仍是 Hugging Face 的核心吸引力，尤其 GGUF、safetensors、llama.cpp 等格式继续推动本地部署生态。相比闭源 API，社区更关注可量化、可微调、可在个人设备或私有环境运行的模型。2-bit 量化、RLOO、SFT、MTP 等标签表明，低成本推理与后训练优化正在成为热门实验方向。

---

## 4. 值得探索

1. **[Qwen/Qwen-Image-2.1-Turbo](https://huggingface.co/Qwen/Qwen-Image-2.1-Turbo)**  
   今日点赞最高，适合关注文生图、图像编辑、diffusers 工作流和 Qwen 多模态路线的开发者优先研究。

2. **[ConwayResearch/Underdog-Saluki-27B-1.0](https://huggingface.co/ConwayResearch/Underdog-Saluki-27B-1.0)**  
   下载量最高，且支持 GGUF、llama.cpp、2-bit 与工具调用，适合测试本地 Agent、函数调用和低资源推理。

3. **[FrancisRing/Prism](https://huggingface.co/FrancisRing/Prism)**  
   聚焦 image-to-video 与联合视频音频生成，适合跟踪视频扩散 Transformer 和多模态生成模型演进。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*