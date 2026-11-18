# Hugging Face 热门模型日报 2026-11-19

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-11-18 17:15 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-19**

> 基于所提供的 4 个热门模型快照整理。榜单按周点赞数排序；所列点赞、下载数据的统计窗口未注明，不据此重新排序。

## 今日速览

今日样本以视觉相关模型为主：3 个属于图文到文本任务，另 1 个聚焦图像分割与背景移除。腾讯 **Hy4-flash** 值得关注，是观察 Hunyuan 多模态方向的新入口；**KORMo-Web-11B** 则突出 GUI Agent 场景。**RMBG-3.0** 展示了背景移除、透明度抠图等专用视觉能力的持续需求。**SmolVLM2-256M-Video-Instruct** 以 43,594 次下载显著领先，体现轻量视频理解模型的应用吸引力，但不能仅凭下载量判断性能优劣。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

本次样本暂无纯文本语言模型；具备文本生成能力的视觉语言模型归入下方多模态类别。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

#### [tencent/Hy4-flash](https://huggingface.co/tencent/Hy4-flash)
- **作者：** tencent
- **点赞：** 205 ｜ **下载：** 159
- **一句话说明：** 腾讯 Hunyuan 相关的图文到文本模型，兼具文本生成标签；当前点赞较高、下载较少，呈现关注热度领先于实际下载的特征。

#### [KORMo-VL/KORMo-Web-11B](https://huggingface.co/KORMo-VL/KORMo-Web-11B)
- **作者：** KORMo-VL
- **点赞：** 101 ｜ **下载：** 277
- **一句话说明：** 带有 `llava_onevision` 与 `gui-agent` 标签的视觉语言模型，主打网页及图形界面相关场景，是观察多模态向交互式 Agent 延伸的代表。

#### [HuggingFaceTB/SmolVLM2-256M-Video-Instruct](https://huggingface.co/HuggingFaceTB/SmolVLM2-256M-Video-Instruct)
- **作者：** HuggingFaceTB
- **点赞：** 202 ｜ **下载：** 43,594
- **一句话说明：** 256M 规模的视频指令视觉语言模型，提供 ONNX 标签，轻量定位与显著领先的下载量使其成为低资源多模态部署的重点观察对象。

### 🔧 专用模型（代码、数学、医疗、嵌入等）

#### [briaai/RMBG-3.0](https://huggingface.co/briaai/RMBG-3.0)
- **作者：** briaai
- **点赞：** 91 ｜ **下载：** 42
- **一句话说明：** 面向背景移除和 Alpha Matting 的图像分割模型，应用目标明确，其热度反映了对精细抠图与图像生产工具的关注。

### 📦 微调与量化（社区微调、GGUF、AWQ）

本次样本未出现明确标注的社区微调或 GGUF、AWQ 量化版本。SmolVLM2 的 `ONNX` 标签体现部署适配方向，但**不等同于量化**；`safetensors` 也仅代表权重存储格式。

## 生态信号

本次样本中，Hunyuan 与 SmolVLM2 分别呈现关注热度和下载规模优势，LLaVA-OneVision 相关路线延伸至 GUI Agent。视觉语言模型与专用抠图工具共同占据榜单，说明需求兼顾通用理解和明确工作流。样本均有权重格式标签，但开放权重不等于宽松开源，仍需核对许可证；也无法据此判断闭源模型的整体走势。量化、社区微调信号不足，ONNX 是较明确的部署线索。

## 值得探索

1. **[SmolVLM2-256M-Video-Instruct](https://huggingface.co/HuggingFaceTB/SmolVLM2-256M-Video-Instruct)**  
   优先研究轻量视频理解及 ONNX 部署，适合评估资源占用、推理速度与实际任务效果之间的取舍。

2. **[KORMo-Web-11B](https://huggingface.co/KORMo-VL/KORMo-Web-11B)**  
   适合关注网页理解与 GUI Agent 的团队，建议重点验证界面识别、操作指令理解及跨页面泛化能力。

3. **[RMBG-3.0](https://huggingface.co/briaai/RMBG-3.0)**  
   适合电商素材、设计工具和图像处理流水线，建议测试发丝、半透明物体及复杂背景边缘，并确认商用许可。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*