# Hugging Face 热门模型日报 2026-06-26

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 5 个模型 | 生成时间: 2026-06-26 01:38 UTC

---

# Hugging Face 热门模型日报（2026-06-26）

## 1) 今日速览
今天 Hugging Face 热门榜呈现出明显的**“大模型优化 + 社区量化 + 场景化微调”**三条主线。  
其中，**NVIDIA 的 Qwen3.6-35B-A3B-NVFP4** 以极高点赞和下载量领跑，说明企业级推理优化仍是关注焦点。  
同时，榜单里出现了多个 **GGUF / QAT / uncensored** 变体，表明社区对“可本地部署、可快速试用”的模型形态需求持续升温。  
另外，**Gemma4 多模态**与 **DeepSeek / Qwen / LiquidAI** 等开源系模型继续保持活跃，开源生态热度很高。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

- **[nvidia/Qwen3.6-35B-A3B-NVFP4](https://huggingface.co/nvidia/Qwen3.6-35B-A3B-NVFP4)**  
  作者：nvidia ｜ 点赞：341 ｜ 下载：4,602,255  
  一句话说明：这是面向高效推理的 Qwen3.6 35B MoE 版本，采用 NVIDIA 的 NVFP4/ModelOpt 优化，热度高主要来自**性能优化与企业部署价值**。

- **[LiquidAI/LFM2.5-230M](https://huggingface.co/LiquidAI/LFM2.5-230M)**  
  作者：LiquidAI ｜ 点赞：72 ｜ 下载：7,334  
  一句话说明：轻量级语言模型，适合边缘端或低成本试验，榜上有名反映出**小模型/高效率路线**仍有稳定关注。

### 🎨 多模态与生成（图像、视频、音频、文本到X）

- **[HauhauCS/Gemma4-12B-QAT-Uncensored-HauhauCS-Balanced](https://huggingface.co/HauhauCS/Gemma4-12B-QAT-Uncensored-HauhauCS-Balanced)**  
  作者：HauhauCS ｜ 点赞：83 ｜ 下载：15,128  
  一句话说明：Gemma4 的多模态（image-text-to-text）版本，带 QAT 和 uncensored 调整，因**多模态能力 + 可本地运行 + 社区改造**而上榜。

### 🔧 专用模型（代码、数学、医疗、嵌入）

- **[Chunjiang-Intelligence/DeepSeek-v4-Fable](https://huggingface.co/Chunjiang-Intelligence/DeepSeek-v4-Fable)**  
  作者：Chunjiang-Intelligence ｜ 点赞：90 ｜ 下载：646  
  一句话说明：基于 DeepSeek v4 的场景化衍生模型，带有 cybersecurity 标签，说明它更偏向**安全/攻防等垂直领域应用**。

### 📦 微调与量化（社区微调、GGUF、AWQ）

- **[deepreinforce-ai/Ornith-1.0-35B-GGUF](https://huggingface.co/deepreinforce-ai/Ornith-1.0-35B-GGUF)**  
  作者：deepreinforce-ai ｜ 点赞：89 ｜ 下载：0  
  一句话说明：35B 级别的 GGUF 量化发布，突出的是**本地推理友好**与社区可部署性，典型的“先收集关注、后扩散下载”型模型。

- **[HauhauCS/Gemma4-12B-QAT-Uncensored-HauhauCS-Balanced](https://huggingface.co/HauhauCS/Gemma4-12B-QAT-Uncensored-HauhauCS-Balanced)**  
  作者：HauhauCS ｜ 点赞：83 ｜ 下载：15,128  
  一句话说明：QAT 量化后再做社区微调，属于典型的**“量化 + 改造 + 可部署”**路线。

- **[nvidia/Qwen3.6-35B-A3B-NVFP4](https://huggingface.co/nvidia/Qwen3.6-35B-A3B-NVFP4)**  
  作者：nvidia ｜ 点赞：341 ｜ 下载：4,602,255  
  一句话说明：NVFP4 属于面向推理效率的量化/优化发布，是当前最强势的**工业级压缩与加速**代表。

---

## 3) 生态信号
当前势头最强的模型家族主要是 **Qwen、DeepSeek、Gemma**，以及围绕它们展开的量化/部署变体。榜单清一色是**开源权重**路线，且多为 safetensors、GGUF、QAT 等格式，说明社区更偏好可复现、可本地部署的模型。值得注意的是，**NVIDIA 的优化版本**拿到极高下载量，显示“模型本体之外，推理效率与硬件适配”正在成为新的竞争核心；同时，**uncensored、cybersecurity** 等标签表明垂直微调和内容风格定制仍很活跃。

---

## 4) 值得探索

1. **[nvidia/Qwen3.6-35B-A3B-NVFP4](https://huggingface.co/nvidia/Qwen3.6-35B-A3B-NVFP4)**  
   理由：下载量极高，适合研究“高性能推理优化”与 MoE 大模型的工程落地。

2. **[HauhauCS/Gemma4-12B-QAT-Uncensored-HauhauCS-Balanced](https://huggingface.co/HauhauCS/Gemma4-12B-QAT-Uncensored-HauhauCS-Balanced)**  
   理由：同时覆盖多模态、量化和社区微调，适合观察“可部署多模态模型”的最新形态。

3. **[Chunjiang-Intelligence/DeepSeek-v4-Fable](https://huggingface.co/Chunjiang-Intelligence/DeepSeek-v4-Fable)**  
   理由：带 cybersecurity 标签，适合关注大模型在安全场景中的垂直适配方向。

如果你愿意，我可以把这份日报进一步整理成 **“公众号风格”** 或 **“投研简报风格”** 版本。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*