# Hugging Face 热门模型日报 2026-08-16

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-08-16 01:23 UTC

---

# Hugging Face 热门模型日报（2026-08-16）

## 今日速览
今天的热门模型几乎被 **Qwen3.8 生态** 和 **轻量多模态模型** 占据，说明社区关注点仍集中在“强底座 + 高效率落地”。  
榜首的 [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4) 说明 **量化与部署友好性** 依然是高热度核心。  
同时，两个 image-text-to-text 模型上榜，反映出 **视觉语言模型** 仍在快速扩张，且更小参数规模也能获得关注。  
整体来看，开源社区正在围绕热门基础模型做 FP8 / NVFP4 等高效版本改造，并将多模态能力继续下沉到更轻量的模型中。

---

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4)  
  作者：unsloth ｜ 点赞：166 ｜ 下载：90,924  
  一句话说明：Qwen3.8-27B 的 **NVFP4 量化版**，主打更低显存占用和更快推理，因此在“可部署、可复用”的趋势里最受关注。

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8)  
  作者：orcarouter ｜ 点赞：161 ｜ 下载：0  
  一句话说明：基于 Qwen3.8-27B 的 **FP8 多模态/对话版本**，强调更开放的输出风格和高效推理，适合想尝试“更少限制”模型的用户。
- [LiquidAI/LFM2.5-VL-3B](https://huggingface.co/LiquidAI/LFM2.5-VL-3B)  
  作者：LiquidAI ｜ 点赞：143 ｜ 下载：4,598  
  一句话说明：3B 级别的 **视觉语言模型**，适合 OCR、图文问答、图表理解等场景，体现出轻量多模态模型的持续升温。

### 🔧 专用模型（代码、数学、医疗、嵌入）
- 暂无上榜模型。

### 📦 微调与量化（社区微调、GGUF、AWQ）
- [unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4)  
  作者：unsloth ｜ 点赞：166 ｜ 下载：90,924  
  一句话说明：典型的社区量化发布，代表围绕热门底座做 **低成本推理优化** 的热度仍然很高。
- [orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8)  
  作者：orcarouter ｜ 点赞：161 ｜ 下载：0  
  一句话说明：FP8 版本同样属于高效部署路线，说明 **量化格式本身** 已成为模型传播与尝试的重要卖点。

---

## 生态信号
本期榜单显示 **Qwen3.8 系列势头最强**，社区正在围绕同一底座快速推出 NVFP4、FP8 等高效版本，说明“可部署性”已成为流量核心。与此同时，轻量级 VL 模型继续升温，3B 级别也能覆盖图文理解与 OCR 场景。整体上，**开源权重仍明显占优**，闭源模型在榜单中的存在感较弱；量化、微调和“uncensored”取向共同推动了社区热度。

---

## 值得探索
1. **[unsloth/Qwen3.8-27B-NVFP4](https://huggingface.co/unsloth/Qwen3.8-27B-NVFP4)**  
   适合研究大模型量化后的推理效率与落地成本，是本期最具代表性的“部署友好型”模型。

2. **[LiquidAI/LFM2.5-VL-3B](https://huggingface.co/LiquidAI/LFM2.5-VL-3B)**  
   适合测试轻量多模态能力，尤其值得关注它在图文问答、视觉理解上的性价比。

3. **[orcarouter/Qwen3.8-27B-Uncensored-FP8](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-FP8)**  
   适合对比 FP8 与更低比特量化在输出质量、速度和显存占用上的差异。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*