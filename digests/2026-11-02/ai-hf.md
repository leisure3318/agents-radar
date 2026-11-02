# Hugging Face 热门模型日报 2026-11-02

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-11-02 02:43 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-02**  
*基于所提供的 4 个热门模型快照整理；模型能力与定位仅依据任务、名称及标签判断，未核验模型卡或评测。*

## 今日速览

- 本次样本以**视觉语言、OCR 和视频处理**为主，多模态应用是最明显的关注方向。
- **Xiaomi-OCR-0** 以 17,143 次下载、205 次点赞在所列指标中领先，体现出文档识别类实用工具的吸引力。
- **LiquidAI/d1-2B** 与 **Open-H3-Regenerate-2K** 分别覆盖图文理解和视频精修，展示了多模态模型向不同应用环节延伸的趋势。
- **numbat** 的 8-bit、modelopt 标签，以及视频模型的 LoRA 标签，提示量化部署与轻量适配仍值得关注；但热度不等于能力验证或实际采用。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

本次样本中**没有可明确归入纯语言模型的项目**。numbat 未标注任务，不宜仅凭名称推断其为 LLM。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

#### [LiquidAI/d1-2B](https://huggingface.co/LiquidAI/d1-2B)
- **作者：** LiquidAI
- **点赞：** 158 ｜ **下载：** 4,256
- **一句话说明：** 标注为图像与文本输入、文本输出的多模态模型，带有 `lfm3_vl` 标签，其图文理解定位是值得关注的方向，具体能力仍需实测。

#### [Efficient-Large-Model/Open-H3-Regenerate-2K](https://huggingface.co/Efficient-Large-Model/Open-H3-Regenerate-2K)
- **作者：** Efficient-Large-Model
- **点赞：** 157 ｜ **下载：** 0
- **一句话说明：** 标注为视频到视频、带有 `minimax-h3`、`lora` 和 `video-refinement` 标签的项目，关注点在视频精修与轻量适配；零下载记录意味着当前无法据此判断实际使用规模。

### 🔧 专用模型（代码、数学、医疗、嵌入等）

#### [xiaomi-research/Xiaomi-OCR-0](https://huggingface.co/xiaomi-research/Xiaomi-OCR-0)
- **作者：** xiaomi-research
- **点赞：** 205 ｜ **下载：** 17,143
- **一句话说明：** 面向 OCR 的图文模型，带有 `qwen3_5` 标签，在本次样本中下载量最高，是观察文档识别需求与相关模型生态的重要入口。

### 📦 微调与量化（社区微调、GGUF、AWQ 等）

#### [burner22/numbat](https://huggingface.co/burner22/numbat)
- **作者：** burner22
- **点赞：** 204 ｜ **下载：** 5,846
- **一句话说明：** 任务尚未标注、带有 `8-bit`、`modelopt` 与 `custom_code` 标签的模型项目，可作为量化部署方向的观察对象，但基础架构、用途及效果仍待确认。

> **交叉分类：** Open-H3-Regenerate-2K 同时具有 LoRA 属性；此处按视频用途归入多模态类，避免重复统计。

## 生态信号

本次样本中，视觉语言与任务专用模型更突出：`lfm3_vl`、`qwen3_5` 和 `minimax-h3` 标签分别指向图文理解、OCR 与视频处理，但不足以证明整个家族持续走强。仓库提供权重相关格式，不代表许可证完全开放，也无法据此判断开源相对闭源的整体走势。numbat 的 8-bit/modelopt 与视频项目的 LoRA 标签，则体现出低成本部署和轻量适配的关注度。

## 值得探索

1. **[Xiaomi-OCR-0](https://huggingface.co/xiaomi-research/Xiaomi-OCR-0)**  
   优先测试文档、表格和复杂版面的识别质量；其下载表现最突出，适合作为实用型模型的评测起点。

2. **[LiquidAI/d1-2B](https://huggingface.co/LiquidAI/d1-2B)**  
   适合研究图文理解模型的资源需求与能力边界，重点核验显存占用、推理延迟及多语言表现。

3. **[Open-H3-Regenerate-2K](https://huggingface.co/Efficient-Large-Model/Open-H3-Regenerate-2K)**  
   适合关注视频精修与 LoRA 工作流的开发者；尝试前应确认基座依赖、许可证、权重可用性及运行要求。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*