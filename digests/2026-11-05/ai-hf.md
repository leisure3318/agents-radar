# Hugging Face 热门模型日报 2026-11-05

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-11-05 03:42 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-05**

> 数据范围：基于所提供的 3 个热门模型，按周点赞数排序；下载统计周期未注明。以下判断仅针对该样本，不代表全站趋势。

## 今日速览

Kimi-K3.1-Pro 以 **561 次点赞**领跑，显示 Kimi 系列在本次榜单中具有较强关注度，但其下载量暂低于另外两个模型。DeepSeek 衍生的 GGUF 模型以 **73,282 次下载**居首，体现量化分发与部署需求的活跃。PrunaAI 的图像生成模型获得 **45,623 次下载**，说明面向 ComfyUI 的工作流适配同样具有吸引力。整体来看，本次榜单同时呈现了**多模态模型关注度、量化部署需求和图像生成工具链**三条线索。

## 热门模型

*按主要分发形态归类，每个模型仅列一次；跨领域属性在说明中标注。*

### 🧠 语言模型（LLM、对话模型、指令微调）

本次样本中无单独归入此类的模型。Kimi 与 DeepSeek 相关条目具备文本生成标签，但分别归入多模态、量化类别。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

#### [moonshotai/Kimi-K3.1-Pro](https://huggingface.co/moonshotai/Kimi-K3.1-Pro)
- **作者：** moonshotai
- **点赞：** 561 ｜ **下载：** 797
- **一句话说明：** 标注为图文输入、文本输出的多模态生成模型，在本次榜单中点赞领先，反映出较高关注度，但实际部署规模仍需进一步观察。

#### [PrunaAI/P-H3-Image-Comfy](https://huggingface.co/PrunaAI/P-H3-Image-Comfy)
- **作者：** PrunaAI
- **点赞：** 153 ｜ **下载：** 45,623
- **一句话说明：** 面向 ComfyUI、带有文生图与图生图标签的图像生成模型，其较高下载量显示出工作流集成与使用需求。

### 🔧 专用模型（代码、数学、医疗、嵌入）

本次未单列模型；下述 DeepSeek 衍生模型名称带有 **Coder** 标识，具有代码用途定位，但具体能力仍需结合模型卡与评测确认。

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-Coder-GGUF](https://huggingface.co/ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-Coder-GGUF)
- **作者：** ISTA-DASLab
- **点赞：** 160 ｜ **下载：** 73,282
- **一句话说明：** DeepSeek 系列的 GGUF 衍生分发版本，名称突出代码用途、标签包含视觉能力，并以本次样本最高下载量体现量化版本的吸引力；具体量化配置与运行兼容性需查阅模型卡。

## 生态信号

本次样本中，Kimi 家族在点赞关注度上领先，DeepSeek 衍生版本则在下载量上更突出，呈现“关注新模型、使用部署版本”的分化。GGUF 与 compressed-tensors 标签说明，权重分发及压缩部署仍是活跃方向；PrunaAI 则体现了生成模型与 ComfyUI 工具链结合的价值。不过，Hub 上有权重文件不等于满足开源许可要求，仅凭这三个条目也无法判断开放权重相对闭源服务的份额变化。

## 值得探索

1. **[Kimi-K3.1-Pro](https://huggingface.co/moonshotai/Kimi-K3.1-Pro)**  
   适合关注多模态理解与文本生成的研究者，建议重点核查图文任务表现、硬件需求及压缩权重的加载条件。

2. **[DeepSeek-V4.1-Flash-1017-GSQ-RCO-Coder-GGUF](https://huggingface.co/ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-Coder-GGUF)**  
   适合研究量化部署与代码任务，重点比较不同配置下的质量、速度和内存占用，并确认视觉能力是否被推理工具链支持。

3. **[P-H3-Image-Comfy](https://huggingface.co/PrunaAI/P-H3-Image-Comfy)**  
   适合已有 ComfyUI 工作流的图像创作者，建议优先验证节点依赖、显存需求，以及文生图、图生图流程的接入成本。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*