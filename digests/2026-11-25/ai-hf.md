# Hugging Face 热门模型日报 2026-11-25

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 7 个模型 | 生成时间: 2026-11-25 04:47 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-25｜样本：7 个热门模型**

> 本报依据所提供的榜单与标签整理，未核验模型卡、许可证或性能。榜单称按周点赞数排序，但所列点赞数并非降序，可能存在统计口径差异；下文不据此重排热度。

## 今日速览

本期热点集中在**本地量化部署、多模态生成与文档解析**三条方向。三个 GGUF 模型上榜，其中 Ternary-Bonsai 的三值、2-bit 标签凸显低位宽推理的关注度。Lakonik/pi-H3 以 **57,282 次下载、264 个赞**在本样本中均居首位，音视频生成方向值得重点观察。ERNIE-5.5-Flash-Preview 与 Kolibri-1.1 则带来 MoE 语言模型的关注信号，但点赞与下载差异较大，尚不能等同于实际采用规模。

## 热门模型

*按主要发布形态归类，每个模型仅列一次；量化多模态模型统一归入“微调与量化”。*

### 🧠 语言模型（LLM、对话模型、指令微调）

#### [Aleph-Alpha/Kolibri-1.1](https://huggingface.co/Aleph-Alpha/Kolibri-1.1)
- **作者：** Aleph-Alpha ｜ **点赞：** 116 ｜ **下载：** 272
- **一句话说明：** 带有 reasoning、MoE 和 vLLM 标签的文本生成模型，推理能力定位与部署生态支持构成其主要关注点。

#### [baidu/ERNIE-5.5-Flash-Preview](https://huggingface.co/baidu/ERNIE-5.5-Flash-Preview)
- **作者：** baidu ｜ **点赞：** 262 ｜ **下载：** 75
- **一句话说明：** ERNIE 家族的文本生成预览模型，标签指向 MoE 架构及 Transformers 生态；高点赞、低下载显示关注度尚未转化为同等规模的下载活动。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

#### [Lakonik/pi-H3](https://huggingface.co/Lakonik/pi-H3)
- **作者：** Lakonik ｜ **点赞：** 264 ｜ **下载：** 57,282
- **一句话说明：** 面向图文到视频生成、同时带有文本到音视频标签的模型，结合 flow-matching 与蒸馏标签，是本样本中下载活跃度最突出的项目。

### 🔧 专用模型（代码、数学、医疗、嵌入等）

#### [llamaindex/OCRia-nano-1](https://huggingface.co/llamaindex/OCRia-nano-1)
- **作者：** llamaindex ｜ **点赞：** 168 ｜ **下载：** 0
- **一句话说明：** 面向 OCR 与 PDF 文档解析的图像转文本模型，ONNX、Markdown 和 liteparse 标签体现其文档处理工具链定位；零下载记录不宜直接解读为无人使用。

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [prism-ml/Ternary-Bonsai-2.5-27B-GGUF](https://huggingface.co/prism-ml/Ternary-Bonsai-2.5-27B-GGUF)
- **作者：** prism-ml ｜ **点赞：** 139 ｜ **下载：** 0
- **一句话说明：** 名称标注为 27B 的 GGUF 文本生成模型，主打三值与 2-bit 表示，其低位宽部署路线值得关注，但实际内存和速度收益仍需实测。

#### [nari-labs/Qwen3.8-27B-NariQ-GGUF](https://huggingface.co/nari-labs/Qwen3.8-27B-NariQ-GGUF)
- **作者：** nari-labs ｜ **点赞：** 122 ｜ **下载：** 8,795
- **一句话说明：** Qwen 系列的 GGUF 量化多模态模型，兼具图文输入任务与 coding-agent 标签，连接了本地部署、多模态和代码代理三个热点。

#### [orcarouter/Inkling-2-Mini-abliterated-GGUF](https://huggingface.co/orcarouter/Inkling-2-Mini-abliterated-GGUF)
- **作者：** orcarouter ｜ **点赞：** 155 ｜ **下载：** 5,446
- **一句话说明：** 面向 llama.cpp 本地运行的 GGUF 社区衍生版本，名称中的 abl iterated（通常写作 abl iterated 的连写形式“abliterated”）指向拒答行为调整，适合研究行为变化及其安全性影响。

## 生态信号

本样本中，Qwen 衍生量化与 ERNIE 预览版显示家族关注度，GGUF 占三席，反映本地推理和低位宽部署需求活跃。三值、2-bit 与 abl iterated 类行为调整，体现社区同时探索压缩效率和模型行为。Hub 发布及权重格式标签表明可分发制品受到关注，但不能据此认定许可证开放，也不足以判断开源相对闭源的整体份额变化；需结合许可、权重可用性与持续下载观察。

## 值得探索

1. **[Lakonik/pi-H3](https://huggingface.co/Lakonik/pi-H3)**  
   适合关注视频与音视频生成的团队。优先核验支持的输入输出形式、生成质量、时序一致性及显存需求，判断高下载量能否对应实际可用性。

2. **[prism-ml/Ternary-Bonsai-2.5-27B-GGUF](https://huggingface.co/prism-ml/Ternary-Bonsai-2.5-27B-GGUF)**  
   适合研究低位宽本地推理。重点比较其与常规量化方案的质量损失、内存占用、吞吐和 llama.cpp 兼容性，而非仅看位宽标签。

3. **[llamaindex/OCRia-nano-1](https://huggingface.co/llamaindex/OCRia-nano-1)**  
   适合文档智能与 RAG 团队。建议测试复杂 PDF 的阅读顺序、表格与版面还原、Markdown 输出质量，以及 ONNX 部署的集成成本。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*