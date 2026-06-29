# Hugging Face 热门模型日报 2026-06-29

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-06-29 01:38 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-06-29**

## 1) 今日速览
今天榜单呈现出两个很明显的方向：一是 **Qwen、DeepSeek 这类头部开源模型家族** 依旧强势，且量化版、可本地部署版本更容易获得高下载；二是 **视频生成/图像到视频** 方向继续升温，轻量化的 LoRA 适配开始成为热点。  
值得注意的是，榜单前两名点赞数并列，说明社区对“**可用性**”和“**可部署性**”的关注正在上升。  
同时，部分模型下载量尚低但点赞高，说明它们可能是**刚发布不久、但已经获得强烈关注**的新模型。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

- **[unsloth/Qwen-AgentWorld-35B-A3B-GGUF](https://huggingface.co/unsloth/Qwen-AgentWorld-35B-A3B-GGUF)**  
  作者：**unsloth**｜点赞：**95**｜下载：**79,503**  
  一句话说明：这是 **Qwen 系列的 35B GGUF 量化版本**，主打本地/低门槛部署，并带有 world-model 叙事；高下载量说明它在实用部署场景里非常受欢迎。

- **[deepseek-ai/DeepSeek-V4-Flash-DSpark](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-DSpark)**  
  作者：**deepseek-ai**｜点赞：**81**｜下载：**24**  
  一句话说明：DeepSeek 的新一代文本模型变体，属于近期关注度很高的 **开源大模型家族延伸**；尽管下载还少，但点赞靠前，说明社区对其发布很期待。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

- **[fal/LTX-2.3-3DREAL-LoRA](https://huggingface.co/fal/LTX-2.3-3DREAL-LoRA)**  
  作者：**fal**｜点赞：**95**｜下载：**0**  
  一句话说明：这是面向 **LTX-2.3** 的视频生成 LoRA 适配，任务为 image-to-video；高点赞但下载尚未累积，通常意味着它是**刚上线或刚引发关注**的热模型。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

- **暂无单独上榜模型**  
  本日热门榜单主要被 **大语言模型、量化版本和视频生成适配** 占据。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

- **[unsloth/Qwen-AgentWorld-35B-A3B-GGUF](https://huggingface.co/unsloth/Qwen-AgentWorld-35B-A3B-GGUF)**  
  作者：**unsloth**｜点赞：**95**｜下载：**79,503**  
  一句话说明：该模型的核心看点不只是 Qwen 家族本身，更在于 **GGUF 量化封装** 带来的可部署性；这类版本更适合本地推理、桌面端和边缘设备。

- **[fal/LTX-2.3-3DREAL-LoRA](https://huggingface.co/fal/LTX-2.3-3DREAL-LoRA)**  
  作者：**fal**｜点赞：**95**｜下载：**0**  
  一句话说明：这是典型的 **轻量 LoRA 微调** 路线，说明视频生成生态正在从“训练大底模”转向“快速适配和能力补丁”。

---

## 3) 生态信号
Qwen 与 DeepSeek 仍是开源大模型生态的核心势力，且 **GGUF、LoRA 这类轻量化发布形式** 正在放大模型传播效率。开源权重依然是主流，社区更偏好“能下载、能跑、能改”的模型，而非单纯参数更大。尤其值得注意的是，量化版 Qwen 的高下载与视频 LoRA 的高点赞同时出现，说明生态正在从“模型规模竞争”转向“**部署友好 + 场景可插拔**”竞争。

---

## 4) 值得探索
1. **[unsloth/Qwen-AgentWorld-35B-A3B-GGUF](https://huggingface.co/unsloth/Qwen-AgentWorld-35B-A3B-GGUF)**  
   值得优先尝试：下载量极高，说明实用价值和部署热度都很强，适合观察量化模型的落地效果。

2. **[deepseek-ai/DeepSeek-V4-Flash-DSpark](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-DSpark)**  
   值得研究：来自 DeepSeek 体系的新模型，适合跟踪其能力路线与后续开源生态扩散。

3. **[fal/LTX-2.3-3DREAL-LoRA](https://huggingface.co/fal/LTX-2.3-3DREAL-LoRA)**  
   值得关注：视频生成的 LoRA 适配代表了低成本定制趋势，适合研究多模态模型的轻量微调方向。  

如果你愿意，我还可以把这份日报进一步整理成 **适合公众号发布的排版版** 或 **适合内部晨报的极简版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*