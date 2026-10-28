# Hugging Face 热门模型日报 2026-10-28

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-10-28 02:34 UTC

---

# Hugging Face 热门模型日报
**日期：2026-10-28｜按周点赞数排序的 4 个热门模型样本**

> 本报基于所提供的榜单与标签整理；下载量统计周期未注明，不直接视为周下载量。模型能力、许可证与部署要求仍需以模型卡为准。

## 今日速览

百度 **Unlimited-OCR-2** 以 250 赞领跑本次样本，文档识别与图文理解是最突出的关注方向。**LiquidAI LFM3-1.7B** 与 **NVIDIA Nemotron-3.5-Bolt-E4B-4GB** 同时上榜，显示轻量语言模型与低资源部署持续受到关注。NVIDIA 模型下载量达 **44,651**，明显领先其余三款，但不宜据此直接判断性能或生产采用率。社区 **Qwen3.5-4B-3D-Coder** 则体现了代码模型向 Three.js、3D 等细分开发场景延伸的趋势。

## 热门模型

*按主要定位归类，避免重复收录；支持 GGUF 的模型在量化分类中补充说明。*

### 🧠 语言模型（LLM、对话模型、指令微调）

**[LiquidAI/LFM3-1.7B](https://huggingface.co/LiquidAI/LFM3-1.7B)**
- **作者：** LiquidAI｜**点赞：** 196｜**下载：** 6,311
- **一句话说明：** 一款标称 1.7B 的文本生成模型，轻量规模与通用生成定位使其成为关注小模型和资源受限部署的研究入口。

**[nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB)**
- **作者：** nvidia｜**点赞：** 194｜**下载：** 44,651
- **一句话说明：** Nemotron 系列文本生成模型，名称强调“4GB”定位且带有 GGUF 标签，部署导向鲜明，并以本次样本最高下载量体现出较强的试用热度。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

**[baidu/Unlimited-OCR-2](https://huggingface.co/baidu/Unlimited-OCR-2)**
- **作者：** baidu｜**点赞：** 250｜**下载：** 513
- **一句话说明：** 面向 OCR 的图像到文本模型，以本次样本最高点赞数凸显文档数字化与图文信息提取方向的关注度，实际识别能力仍待评测验证。

### 🔧 专用模型（代码、数学、医疗、嵌入）

**[ccore/Qwen3.5-4B-3D-Coder](https://huggingface.co/ccore/Qwen3.5-4B-3D-Coder)**
- **作者：** ccore｜**点赞：** 178｜**下载：** 3,544
- **一句话说明：** 从命名及 `code`、`threejs`、`3d` 标签看，这是面向 3D 开发的 Qwen 系社区代码模型，垂直场景定位和 GGUF 格式是值得关注的特点。

### 📦 微调与量化（社区微调、GGUF、AWQ）

本次样本中有两款模型带有 **GGUF** 标签：
- **[NVIDIA Nemotron-3.5-Bolt-E4B-4GB](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB)**：适合进一步核查其本地推理支持、具体量化配置与内存需求。
- **[Qwen3.5-4B-3D-Coder](https://huggingface.co/ccore/Qwen3.5-4B-3D-Coder)**：体现社区垂直代码模型与便捷部署格式的结合；微调方法及量化精度尚未提供。

*GGUF 标签不等于已明确量化位宽，也不保证特定硬件上的运行效果。*

## 生态信号

本次样本中，LFM、Nemotron 与 Qwen 系共同呈现轻量化、部署友好和垂直应用的势头，OCR 则获得最高点赞。开放模型仓库与 GGUF 分发受到关注，但权重是否完整开放、能否商用仍需核查许可证，不能据此推断闭源模型份额下降。两款带 GGUF 标签的模型说明，本地推理与社区适配是重要活动方向；3D 代码定位也显示专用模型正向具体开发工作流延伸。

## 值得探索

1. **[NVIDIA Nemotron-3.5-Bolt-E4B-4GB](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB)**  
   下载量领先，适合作为本地部署候选；重点验证实际内存占用、推理速度与输出质量，不将名称中的“4GB”直接视为运行保证。

2. **[baidu/Unlimited-OCR-2](https://huggingface.co/baidu/Unlimited-OCR-2)**  
   点赞最高，适合从真实文档样本切入，测试复杂版面、表格及不同语言文本的识别效果。

3. **[ccore/Qwen3.5-4B-3D-Coder](https://huggingface.co/ccore/Qwen3.5-4B-3D-Coder)**  
   细分场景明确，适合研究自然语言到 Three.js 场景代码的工作流，重点检查代码可运行率、渲染结果与迭代修复能力。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*