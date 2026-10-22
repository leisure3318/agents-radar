# Hugging Face 热门模型日报 2026-10-22

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-10-22 01:48 UTC

---

# Hugging Face 热门模型日报
**日期：2026-10-22｜口径：所提供的 3 个模型，按周点赞数排序**

## 今日速览

本期样本中，**RecursiveSI/flint** 以 257 赞领先，体现出较高的社区关注度，但下载数为 0，尚不能据此判断实际使用规模。**OrcaCyber-Nano-1.0** 将视觉语言能力与网络安全场景结合，以 19,697 次下载成为三者中下载量最高的模型。**Sage-A1.5** 则带来 Qwen3.5 MoE 架构与多模态方向的观察线索，但其任务字段与标签存在差异，具体能力仍需核验。整体看，通用对话、垂直安全应用和 MoE 是本期值得关注的方向；周点赞榜并不意味着这些模型均在今日发布。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

**[RecursiveSI/flint](https://huggingface.co/RecursiveSI/flint)**
- **作者：** RecursiveSI｜**点赞：** 257｜**下载：** 0
- **一句话说明：** 定位于文本生成与对话的模型，以本期最高周点赞数登榜，但缺少下载使用信号，其能力、规模与部署条件仍需查阅模型卡。

**[InternScience/Sage-A1.5](https://huggingface.co/InternScience/Sage-A1.5)**
- **作者：** InternScience｜**点赞：** 160｜**下载：** 58
- **一句话说明：** 任务标注为文本生成，带有 `qwen3_5_moe` 和 `image-text-to-text` 标签，MoE 与潜在多模态能力是其值得研究的看点，但点赞热度尚未对应到较大的下载规模。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

**[orcarouter/OrcaCyber-Nano-1.0](https://huggingface.co/orcarouter/OrcaCyber-Nano-1.0)**
- **作者：** orcarouter｜**点赞：** 170｜**下载：** 19,697
- **一句话说明：** 面向网络安全与逆向工程场景的图文到文本模型，兼具视觉语言和 GGUF 标签，以三者中最高的下载量呈现出更明显的使用关注。

### 🔧 专用模型（代码、数学、医疗、嵌入）

- **交叉归类：** [OrcaCyber-Nano-1.0](https://huggingface.co/orcarouter/OrcaCyber-Nano-1.0) 是本期唯一明确带有网络安全、逆向工程领域标签的模型；其专业能力应通过实际任务评测验证，不能仅凭标签判断。
- 本期样本未包含明确标注为数学、医疗或嵌入用途的其他模型。

### 📦 微调与量化（社区微调、GGUF、AWQ）

- **交叉归类：** [OrcaCyber-Nano-1.0](https://huggingface.co/orcarouter/OrcaCyber-Nano-1.0) 带有 **GGUF** 标签，值得关注其本地推理适配；具体量化档位、硬件需求和多模态运行支持需查看仓库文件。
- flint 与 Sage-A1.5 均带有 `safetensors` 标签，但这本身不代表量化，也不足以确认它们属于社区微调版本。

## 生态信号

本期样本中，Qwen3.5 MoE 相关架构通过 Sage-A1.5 获得关注，但仅凭一个模型不足以判断家族整体势头。OrcaCyber 的下载表现显示，垂直安全场景与 GGUF 分发的结合值得跟踪。三个模型均出现权重格式相关标签，但开放程度仍需核验许可证和文件，不能据此断言开源胜过闭源。量化线索集中在 GGUF，暂无 AWQ 或具体微调方法信息。

## 值得探索

1. **[OrcaCyber-Nano-1.0](https://huggingface.co/orcarouter/OrcaCyber-Nano-1.0)**  
   优先尝试：下载信号最强，可重点测试安全截图理解、逆向分析辅助，以及 GGUF 本地部署的可用性与资源开销。

2. **[Sage-A1.5](https://huggingface.co/InternScience/Sage-A1.5)**  
   优先研究：适合核验 MoE 架构、图文输入支持与推理成本，尤其应先确认任务字段与多模态标签之间的差异。

3. **[flint](https://huggingface.co/RecursiveSI/flint)**  
   优先跟踪：周点赞领先，但下载数据尚未提供使用支撑；建议先检查模型卡、权重可用性和评测结果，再决定是否部署。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*