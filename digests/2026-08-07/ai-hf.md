# Hugging Face 热门模型日报 2026-08-07

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 6 个模型 | 生成时间: 2026-08-07 01:52 UTC

---

# Hugging Face 热门模型日报（2026-08-07）

## 1) 今日速览
今天的榜单明显被 **MiniMax-H3 视频生成家族** 刷屏：同一底座上同时出现了 LoRA、ComfyUI 适配和量化/转换版本，说明社区正在快速围绕热门视频模型做“可用化”和“工作流化”。  
**FLUX.1-dev** 继续以高下载领跑，显示成熟图像生成底座依然有强劲的长期需求。  
**LFM2.5-2.6B-GGUF** 则体现了本地部署与轻量推理的热度，GGUF 仍是社区最实用的分发形态之一。  
整体来看，榜单几乎全部是开源权重或社区派生件，生态重心继续向 **可本地运行、可二次改造** 倾斜。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- [LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF)  
  作者：LiquidAI｜点赞：125｜下载：12,790  
  一句话说明：一个 2.6B 级别的 GGUF 量化语言模型，主打 llama.cpp / 本地推理，能上榜说明“轻量、可部署”的 LLM 仍有稳定关注。

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora)  
  作者：larryvrh｜点赞：300｜下载：0  
  一句话说明：MiniMax-H3 Turbo 的 LoRA 适配器，代表社区正在围绕视频/音频生成底座做快速定制，点赞高但下载低，偏“热议型”新件。

- [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI)  
  作者：drbaph｜点赞：118｜下载：0  
  一句话说明：面向 ComfyUI 的 MiniMax-H3 LoRA 工作流组件，说明热门模型的竞争已从“模型本体”转向“可接入的生态插件”。

- [Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot](https://huggingface.co/Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot)  
  作者：Abiray｜点赞：109｜下载：272,963  
  一句话说明：MiniMax-H3 的量化/转换版，支持视频相关工作流；高下载表明它是“能直接用”的落地版本，传播效率很高。

- [black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev)  
  作者：black-forest-labs｜点赞：14,010｜下载：523,234  
  一句话说明：成熟的文本到图像基础模型，依旧是图像生成生态里的高频选择，下载量极高说明其仍是事实标准之一。

### 🔧 专用模型（代码、数学、医疗、嵌入）
- [sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4](https://huggingface.co/sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4)  
  作者：sakamakismile｜点赞：108｜下载：0  
  一句话说明：偏 ComfyUI / 视觉语言链路的 NVFP4 组件型模型，虽然不属于典型代码/医学类，但属于很明显的“专用组件”路线。

### 📦 微调与量化（社区微调、GGUF、AWQ）
- [LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF)  
  作者：LiquidAI｜点赞：125｜下载：12,790  
  一句话说明：GGUF 让小参数 LLM 更容易被本地用户采用，是本日最典型的量化分发模型。

- [larryvrh/MiniMax-H3-Turbo-Lora](https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora)  
  作者：larryvrh｜点赞：300｜下载：0  
  一句话说明：LoRA 微调件，体现社区对同一底座“快速试验、快速扩展”的偏好。

- [drbaph/MiniMax-H3-Turbo-Lora-ComfyUI](https://huggingface.co/drbaph/MiniMax-H3-Turbo-Lora-ComfyUI)  
  作者：drbaph｜点赞：118｜下载：0  
  一句话说明：把 LoRA 适配到 ComfyUI 的工作流组件，属于典型的“微调 + 工程化封装”。

- [Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot](https://huggingface.co/Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot)  
  作者：Abiray｜点赞：109｜下载：272,963  
  一句话说明：NVFP4 / INT4 / INT8 多规格量化与转换版，强调部署兼容性，是最典型的可用性导向产物。

- [sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4](https://huggingface.co/sakamakismile/Qwen3-VL-32B-Heretic-MiniMax-H3-NVFP4)  
  作者：sakamakismile｜点赞：108｜下载：0  
  一句话说明：专用量化组件，说明视觉语言链路也在向轻量化、本地化迁移。

---

## 3) 生态信号
本周最强势的是 **MiniMax-H3 家族**，同一底座衍生出 LoRA、ComfyUI 适配与 NVFP4/INT4/INT8 量化件，显示视频生成正在快速组件化。**FLUX.1-dev** 仍是图像生成高下载基座，说明成熟开源底座的生命周期很长。榜单整体几乎没有闭源 API 型模型，更多是开源权重与社区派生件，量化、LoRA、工作流封装成为最活跃的创新方向。

---

## 4) 值得探索
1. **[black-forest-labs/FLUX.1-dev](https://huggingface.co/black-forest-labs/FLUX.1-dev)**  
   下载量最高，适合观察当前图像生成主流能力边界。

2. **[Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot](https://huggingface.co/Abiray/Minimax-H3-nvfp4-INT4-INT8-Convrot)**  
   兼顾热度和落地性，适合研究视频生成模型的量化部署路径。

3. **[LiquidAI/LFM2.5-2.6B-GGUF](https://huggingface.co/LiquidAI/LFM2.5-2.6B-GGUF)**  
   小参数、GGUF、本地推理，适合关注边缘部署与轻量 LLM 生态。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*