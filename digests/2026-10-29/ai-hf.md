# Hugging Face 热门模型日报 2026-10-29

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-10-29 02:48 UTC

---

# Hugging Face 热门模型日报
**日期：2026-10-29｜范围：所提供的 4 个热门模型**

## 今日速览

今日最值得关注的方向是**翻译、语音转写、文档解析与全模态交互**，热度集中在具体任务，而非通用聊天模型。腾讯 Hy-SimulMT 的 FP8 版本以 382 次点赞获得本组最高关注；MiniCPM-OCR 则以 791 次下载领跑，体现出文档处理场景的实际试用需求。NVIDIA 的语音转写模型与 LiquidAI 的 2B 全模态模型，分别代表专用语音能力和小体量多模态路线。整体来看，本组模型显示出任务专门化与部署效率受到重视，但尚不足以代表全站趋势。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

本组暂无以**通用对话或指令跟随**为主要定位的模型；翻译模型归入下方量化类别。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

#### [nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B)
- **作者：** nvidia
- **点赞：** 208｜**下载：** 338
- **一句话说明：** 面向自动语音识别的转写模型，体现了 Nemotron 系列向专用语音任务延伸的关注度，适合进一步考察转写质量与部署成本。

#### [LiquidAI/LFM3-Omni-2B](https://huggingface.co/LiquidAI/LFM3-Omni-2B)
- **作者：** LiquidAI
- **点赞：** 157｜**下载：** 714
- **一句话说明：** 定位为 any-to-any 的 2B 级全模态模型，以较小模型体量探索多模态交互，是本组中下载量较高的轻量化路线代表。

### 🔧 专用模型（代码、数学、医疗、嵌入等）

#### [openbmb/MiniCPM-OCR-1.0](https://huggingface.co/openbmb/MiniCPM-OCR-1.0)
- **作者：** openbmb
- **点赞：** 278｜**下载：** 791
- **一句话说明：** 面向 OCR 与文档解析的图文模型，本组最高下载量表明其具备较强试用吸引力，值得关注文档数字化与知识入库场景。

### 📦 微调与量化（社区微调、GGUF、AWQ 等）

#### [tencent/Hy-SimulMT-30B-A3B-FP8](https://huggingface.co/tencent/Hy-SimulMT-30B-A3B-FP8)
- **作者：** tencent
- **点赞：** 382｜**下载：** 165
- **一句话说明：** 面向翻译任务的 FP8 权重版本，同时具备任务专门化与低精度部署看点，以本组最高点赞数成为重点关注对象。

> 分类按主要用途或发布形态整理；FP8 不等同于 GGUF/AWQ，本组也未提供社区微调模型。

## 生态信号

本组中，Hy-SimulMT、Nemotron、MiniCPM 与 LFM 均获得关注，但单个快照不足以判断家族持续增长。任务专用化、小体量全模态与低精度权重是主要信号。Hub 权重发布显示开放分发仍具吸引力，但未提供许可证，不能直接认定均为严格意义上的开源，也无法据此判断其相对闭源模型的份额变化。量化方面，腾讯 FP8 版本值得跟进；暂无 GGUF、AWQ 或社区微调活动数据。

## 值得探索

1. **[MiniCPM-OCR-1.0](https://huggingface.co/openbmb/MiniCPM-OCR-1.0)**  
   优先推荐给文档处理团队。可重点测试复杂版式、表格还原及扫描件识别，验证最高下载量背后的实际可用性。

2. **[LFM3-Omni-2B](https://huggingface.co/LiquidAI/LFM3-Omni-2B)**  
   适合研究小体量多模态部署。建议先核实支持的输入输出模态，再评估目标硬件上的内存占用与延迟。

3. **[Hy-SimulMT-30B-A3B-FP8](https://huggingface.co/tencent/Hy-SimulMT-30B-A3B-FP8)**  
   适合翻译应用与低精度推理研究。重点核查语言覆盖、FP8 硬件兼容性，以及翻译质量和吞吐表现。

---

*数据说明：以上基于用户提供的快照整理，未独立核验模型卡、许可证或评测结果；点赞与下载统计周期未明确，不宜直接视为当日新增量或生产采用率。*

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*