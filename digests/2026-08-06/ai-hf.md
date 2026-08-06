# Hugging Face 热门模型日报 2026-08-06

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 6 个模型 | 生成时间: 2026-08-06 00:58 UTC

---

# Hugging Face 热门模型日报（2026-08-06）

## 今日速览
今天的榜单明显偏向**开源权重、社区微调与本地可部署版本**，而不是传统“纯官方原版”独占热度。  
**Qwen 生态**继续领跑：既有多模态大模型，也有面向本地推理的量化/改写版本，说明社区对“可用性”和“可改造性”需求很强。  
同时，**MoE、flash、preview** 这类关键词频繁出现，反映出模型竞赛已从“单纯更大”转向“更快、更省、更适合部署”。  
此外，语音对话与安全/防护类模型也在升温，说明基础模型之外的**应用层能力**正在成为新热点。

---

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

- **[deepgrove/maple-preview](https://huggingface.co/deepgrove/maple-preview)**  
  作者：deepgrove ｜ 点赞：157 ｜ 下载：0  
  一句话：这是一个 **MoE 架构的文本生成预览版**，热度主要来自“preview + mixture-of-experts”带来的新鲜感和性能想象空间。

- **[inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash)**  
  作者：inclusionAI ｜ 点赞：156 ｜ 下载：25  
  一句话：这是一个偏 **高效推理/低延迟** 方向的对话式文本生成模型，`flash` 标签说明它在速度与吞吐上很有看点。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

- **[ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot](https://huggingface.co/ethanfel/Qwen3-VL-32B-Ultra-Heretic-H3-ComfyUI-INT8-ConvRot)**  
  作者：ethanfel ｜ 点赞：282 ｜ 下载：0  
  一句话：这是一个面向 **图文理解/生成工作流** 的 Qwen3-VL 社区版本，结合了 **ComfyUI 与 INT8 量化**，很适合多模态本地部署玩家关注。

- **[NVIDIA/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B)**  
  作者：nvidia ｜ 点赞：124 ｜ 下载：80  
  一句话：这是一个 **语音对话/音频交互** 方向的模型，说明“可直接对话的多模态助手”仍是大厂重点发力方向。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

- **[mistralai/Shieldstral-1.0-3B](https://huggingface.co/mistralai/Shieldstral-1.0-3B)**  
  作者：mistralai ｜ 点赞：131 ｜ 下载：166  
  一句话：从命名看这是一个偏 **安全防护/守护型** 的专用模型，适合关注模型安全、内容过滤或风控链路的人研究。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

- **[LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF)**  
  作者：LuffyTheFox ｜ 点赞：385 ｜ 下载：308,857  
  一句话：这是一个 **Qwen3.6 系社区微调 + GGUF 量化版**，且下载量极高，说明“可本地运行、易部署、生态兼容”的模型最能打动用户。

---

## 生态信号
Qwen 家族势头最旺，尤其是 **Qwen3-VL** 和 **Qwen3.6** 的社区派生版本，说明多模态与本地推理仍是当前焦点。榜单整体呈现出明显的**开源权重优先**趋势，没有闭源模型压制热度；相反，GGUF、INT8、ComfyUI、uncensored 等标签都在强调“可落地、可改造”。MoE、flash、preview 则表明大家正在追逐更高效的推理架构与更快迭代节奏。

---

## 值得探索
1. **[LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V7-GGUF)**  
   下载量和点赞都极高，最能代表当前“社区微调 + 本地部署”的主流需求。

2. **[inclusionAI/Ling-3.0-flash](https://huggingface.co/inclusionAI/Ling-3.0-flash)**  
   值得研究其 `flash` 取向，适合关注低延迟、轻量化和在线服务场景。

3. **[NVIDIA/NVIDIA-NemotronLabs-VoiceChat-11B](https://huggingface.co/nvidia/NVIDIA-NemotronLabs-VoiceChat-11B)**  
   语音对话是下一阶段多模态助手的重要方向，这个模型适合观察“文本之外的交互入口”怎么做。

如果你愿意，我也可以把这份日报继续整理成**适合公众号/飞书/Notion 的发布格式**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*