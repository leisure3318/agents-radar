# Hugging Face 热门模型日报 2026-07-01

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-07-01 01:54 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-07-01**  
数据来源：Hugging Face Hub 热门模型（按周点赞数）

---

## 1) 今日速览
今天的榜单几乎被**大语言模型生态**包揽，且以**中文/多语模型家族**最为活跃。  
一方面，**LongCat 2.0** 这类本土大模型持续获得关注；另一方面，**GLM** 与 **Qwen** 相关模型依然强势，说明主流开源模型家族的热度还在延续。  
同时，榜单里出现了明显的**量化、GGUF、Model Optimizer** 等优化版本，表明社区更偏好“可本地部署、可快速试用”的模型形态。  
总体来看，这是一份典型的“**基础模型 + 社区优化版**”驱动的热门榜单。  

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

- **[meituan-longcat/LongCat-2.0](https://huggingface.co/meituan-longcat/LongCat-2.0)**  
  作者：meituan-longcat | 点赞：103 | 下载：0  
  一句话说明：美团 LongCat 系列的新版本，尽管下载数暂未体现，但高点赞说明其作为新一代基础/对话模型引发了强烈关注。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

- **[huihui-ai/Huihui-GLM-5.2-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-GLM-5.2-abliterated-GGUF)**  
  作者：huihui-ai | 点赞：101 | 下载：65  
  一句话说明：基于 GLM 5.2 的社区改造版 GGUF 模型，兼顾“去限制化”与本地推理部署，适合追求轻量化和可控性的用户。

- **[nvidia/Qwen3.6-27B-NVFP4](https://huggingface.co/nvidia/Qwen3.6-27B-NVFP4)**  
  作者：nvidia | 点赞：95 | 下载：58  
  一句话说明：Qwen 3.6 27B 的 NVIDIA 优化版本，采用 NVFP4/ModelOpt 路线，代表了大模型在高效推理与硬件适配方向上的热度。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

- **暂无上榜模型**  
  本日热门榜单中未出现多模态、图像或音视频生成模型。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

- **暂无上榜模型**  
  本日热门榜单中未出现明显的代码、数学、医疗或嵌入类专用模型。

---

## 3) 生态信号
本日榜单显示 **GLM、Qwen 等主流开源家族仍然强势**，并且热度正在向“可落地版本”迁移：GGUF、NVFP4、ModelOpt 等优化形态更受欢迎。整体趋势是**开源权重继续占主导**，而社区对“可本地运行、低显存、高效率”的需求显著上升。与此同时，**微调/重打包/量化** 已成为模型传播的重要路径，说明生态正在从“追新模型”转向“追可用模型”。

---

## 4) 值得探索

1. **[nvidia/Qwen3.6-27B-NVFP4](https://huggingface.co/nvidia/Qwen3.6-27B-NVFP4)**  
   值得尝试的原因：代表大模型高效推理优化方向，适合关注部署性能与硬件适配的研究者。

2. **[huihui-ai/Huihui-GLM-5.2-abliterated-GGUF](https://huggingface.co/huihui-ai/Huihui-GLM-5.2-abliterated-GGUF)**  
   值得尝试的原因：典型社区改造/量化模型，适合研究本地部署、模型可控性与社区二次分发生态。

3. **[meituan-longcat/LongCat-2.0](https://huggingface.co/meituan-longcat/LongCat-2.0)**  
   值得尝试的原因：作为榜首模型，适合持续跟踪其能力定位、发布策略和后续生态扩散情况。

---  

如需，我可以把这份日报进一步整理成**更像媒体稿的正式版**，或输出成**表格/Markdown/公众号风格**版本。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*