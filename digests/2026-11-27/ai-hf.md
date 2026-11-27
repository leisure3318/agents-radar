# Hugging Face 热门模型日报 2026-11-27

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-11-27 03:56 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-27｜样本：按周点赞数排序的 3 个热门模型**

## 今日速览

今日样本中，视觉生成与增强占据主要位置：**MAGI-2-preview** 以 303 个点赞领先，**Kandinsky-ImageSR-2.0** 则聚焦图像超分辨率。语言模型方向的关注点落在 **Inkling-2-Mini 的 GGUF 量化版本**，其标签体现了混合精度与量化优化路线。三个模型的下载数均极低，当前更适合将其理解为关注热度，而非实际部署规模。以上仅反映所给样本，不能据此判断整个 Hub 的发布或使用趋势。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

本次样本未包含独立的原始或指令微调语言模型；文本生成模型的量化版本归入下方“微调与量化”。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

#### 1. [sand-ai/MAGI-2-preview](https://huggingface.co/sand-ai/MAGI-2-preview)
- **作者：** sand-ai
- **点赞数：** 303｜**下载数：** 0
- **一句话说明：** 面向图像与文本条件的视频生成预览模型，标签还涉及文本到音视频，以本次样本最高点赞数体现出对多模态视频生成的强烈关注。

#### 2. [kandinskylab/Kandinsky-ImageSR-2.0](https://huggingface.co/kandinskylab/Kandinsky-ImageSR-2.0)
- **作者：** kandinskylab
- **点赞数：** 129｜**下载数：** 4
- **一句话说明：** Kandinsky 系列图像超分辨率模型，采用 Diffusers 生态相关格式与标签，其画质增强定位是值得关注的实用方向。

### 🔧 专用模型（代码、数学、医疗、嵌入）

本次样本暂无此类模型；图像超分辨率虽属专用任务，本报按模态将其归入“多模态与生成”，避免重复统计。

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### 3. [ISTA-DASLab/Inkling-2-Mini-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Inkling-2-Mini-GSQ-RCO-GGUF)
- **作者：** ISTA-DASLab
- **点赞数：** 126｜**下载数：** 0
- **一句话说明：** 面向文本生成的 Inkling-2-Mini GGUF 量化版本，GSQ、RCO 与混合精度标签使其成为观察模型压缩和本地推理优化的研究入口。

## 生态信号

本次样本中，MAGI 系列以点赞数领先，Kandinsky 则显示图像增强方向仍有关注，但不足以确认家族级持续增长。Safetensors、Diffusers 与 GGUF 标签体现了权重分发及工具链适配的重要性；是否属于严格开源仍需核验许可证，也无法据此判断闭源模型份额变化。Inkling 的 GSQ、RCO 和混合精度标签，则是量化优化活动的明确信号，实际收益仍待评测。

## 值得探索

1. **[MAGI-2-preview](https://huggingface.co/sand-ai/MAGI-2-preview)**  
   适合研究视频生成与多模态条件控制；优先核验预览版可用性、输入方式，以及音视频相关能力是否已实际开放。

2. **[Kandinsky-ImageSR-2.0](https://huggingface.co/kandinskylab/Kandinsky-ImageSR-2.0)**  
   适合有图像放大需求的开发者，重点比较细节恢复、伪影控制、推理成本及与现有 Diffusers 工作流的兼容性。

3. **[Inkling-2-Mini-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Inkling-2-Mini-GSQ-RCO-GGUF)**  
   适合本地推理与量化研究，重点验证运行时支持情况，以及不同精度配置下的内存占用、速度和质量损失。

*注：以上基于所提供的榜单元数据整理；模型能力、许可证、硬件需求及可用性应以各仓库模型卡为准。*

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*