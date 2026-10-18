# Hugging Face 热门模型日报 2026-10-18

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-10-18 01:30 UTC

---

# Hugging Face 热门模型日报
**日期：2026-10-18**

> 数据口径：基于所提供的 4 个模型，按周点赞数排序；下载数统计窗口未注明。以下为榜单快照分析，不代表全站完整趋势，模型能力及权重开放情况仍需核对模型卡。

## 今日速览

DeepSeek-V4.1-Flash-1017 以 **952 个周点赞**领跑，关注度超过其余三个模型之和，其图文输入任务定位值得关注。OpenMOSS 的 MOSS-Image-SFT 与 MOSS-Image-Base 同时上榜，表明同一图像生成家族的不同训练阶段均受到关注。专用方向上，indra-ocr 以 **1,053 次下载**居本样本首位，OCR 与 CPU 部署标签体现出实用工具属性。整体来看，本期热度集中于图文理解、图像生成和文档识别；DeepSeek 的下载数为 0，暂不能据此判断实际采用程度。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

本期无以纯文本语言任务为主要定位的独立条目。DeepSeek 虽带有 `text-generation` 标签，但主要任务为 `image-text-to-text`，归入多模态类。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

| 模型 | 作者 | 周点赞 | 下载数 | 一句话说明 |
|---|---|---:|---:|---|
| [DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) | deepseek-ai | 952 | 0 | 支持图文输入、文本输出的多模态模型，以本样本最高点赞成为关注焦点，但实际能力与使用情况仍需进一步验证。 |
| [MOSS-Image-SFT](https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT) | OpenMOSS-Team | 244 | 1,036 | MOSS-Image 家族的文本生成图像模型，命名表明其为监督微调版本，热度略高于同家族 Base 版本。 |
| [MOSS-Image-Base](https://huggingface.co/OpenMOSS-Team/MOSS-Image-Base) | OpenMOSS-Team | 233 | 958 | MOSS-Image 家族的基础文本生成图像模型，与 SFT 版本共同上榜，为研究基础模型与后训练差异提供了线索。 |

### 🔧 专用模型（代码、数学、医疗、嵌入等）

| 模型 | 作者 | 周点赞 | 下载数 | 一句话说明 |
|---|---|---:|---:|---|
| [indra-ocr](https://huggingface.co/datalab-to/indra-ocr) | datalab-to | 168 | 1,053 | 面向图像文字识别的 OCR 模型，带有 ONNX、CPU 标签，凭借专用识别与部署方向获得关注，下载数在本样本中最高。 |

### 📦 微调与量化（社区微调、GGUF、AWQ）

本期未出现明确标注 **GGUF、AWQ** 等量化格式的条目。MOSS-Image-SFT 是值得关注的微调线索，已在图像生成类列出；仅凭名称尚不能判断其训练数据、配方或是否属于社区衍生微调。

## 生态信号

本样本中，DeepSeek 以单模型高点赞领跑，MOSS-Image 则凭 Base、SFT 双版本形成家族热度，显示基础模型与后训练版本均受关注。四个条目均带有 safetensors 标签，反映权重分发生态的活跃，但不足以确认权重可下载、许可开放或可商用，也无法据此推断闭源模型走势。微调方面可关注 SFT 与 Base 的差异；暂无明确量化条目，ONNX、CPU 标签更多指向部署适配，而非量化证据。

## 值得探索

1. **[DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)**  
   适合关注图文理解与文本生成融合的研究者。建议先核对模型卡、权重可用性和推理要求，再评测实际能力；不要仅凭“Flash”名称推断速度或成本。

2. **[MOSS-Image-SFT](https://huggingface.co/OpenMOSS-Team/MOSS-Image-SFT)**  
   适合开展图像生成对照实验：与 [MOSS-Image-Base](https://huggingface.co/OpenMOSS-Team/MOSS-Image-Base) 使用相同提示词，比较提示遵循、画面质量和生成多样性，检验监督微调的实际影响。

3. **[indra-ocr](https://huggingface.co/datalab-to/indra-ocr)**  
   适合探索 CPU 环境下的 OCR 部署。建议优先测试目标文档的识别准确率、版面适应性、推理延迟与内存占用，判断其工程适用性。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*