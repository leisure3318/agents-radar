# Hugging Face 热门模型日报 2026-11-07

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 2 个模型 | 生成时间: 2026-11-07 03:10 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-07｜基于所提供的 2 个热门模型条目**

## 今日速览
今日样本聚焦文本生成，两款值得关注的模型分别来自 webAI 与百度。**TwIL-8B** 的下载量达到 8,209 次，且带有 GGUF 标签，值得关注其本地部署路径；**ERNIE-5.5-Flash-Base** 则以 212 次点赞体现出较高的社区关注度。标签层面，Granite 相关模型、ERNIE MoE 架构及量化分发是主要观察线索。当前样本未覆盖图像、视频、音频或专用任务模型，不宜据此推断全站趋势。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

| 模型 | 作者 | 点赞数 | 下载数 | 一句话说明 |
|---|---|---:|---:|---|
| [TwIL-8B](https://huggingface.co/webAI-Official/TwIL-8B) | webAI-Official | 179 | 8,209 | 一款名称标示为 8B、带有 Granite 标签的文本生成模型；样本内下载量领先，并提供 GGUF 相关分发线索，是部署研究的关注对象。 |
| [ERNIE-5.5-Flash-Base](https://huggingface.co/baidu/ERNIE-5.5-Flash-Base) | baidu | 212 | 526 | 百度 ERNIE 5.5 系列的 Base 文本生成模型，带有 `ernie5_5_moe` 架构标签；样本内点赞数领先，值得跟踪后续适配与评测。 |

> 沿用输入榜单顺序；“周点赞排序”与条目中的“点赞数”可能采用不同统计口径，不据后者重新排名。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）
本次样本暂无相关模型。

### 🔧 专用模型（代码、数学、医疗、嵌入）
本次样本暂无明确归入此类的模型。

### 📦 微调与量化（社区微调、GGUF、AWQ）
- **[TwIL-8B](https://huggingface.co/webAI-Official/TwIL-8B)**：作者 **webAI-Official**｜点赞 **179**｜下载 **8,209**。同时带有 `safetensors` 与 `gguf` 标签，显示出面向不同推理工具链分发的意图；具体量化精度、文件版本与运行要求需查看仓库确认。此处为交叉归类，不重复计入模型数量。

## 生态信号
本次样本中，Granite 相关模型与 ERNIE 5.5 家族获得关注，但不足以判断全站家族热度。TwIL-8B 的 GGUF 标签提示本地推理与多格式分发仍值得跟踪；ERNIE 的 MoE 标签则提供了架构研究线索。两者均出现权重文件格式标签，但开放权重不等于开源，许可证与商用条件仍需核实。样本不含闭源模型对照，也未提供明确的社区微调记录。

## 值得探索
1. **[TwIL-8B](https://huggingface.co/webAI-Official/TwIL-8B)**  
   适合优先开展本地部署实验：确认 GGUF 文件与量化规格，再比较内存占用、生成速度和输出质量。较高下载量是使用关注度信号，并不直接代表性能优势。

2. **[ERNIE-5.5-Flash-Base](https://huggingface.co/baidu/ERNIE-5.5-Flash-Base)**  
   适合研究 ERNIE 5.5 基座及其 MoE 推理适配。建议先核对模型卡、硬件需求与 Transformers 支持情况，再评估是否适合作为微调起点；不应仅凭名称推定其对话能力或速度。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*