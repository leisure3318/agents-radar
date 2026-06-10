# Hugging Face 热门模型日报 2026-06-10

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-06-10 03:56 UTC

---

# Hugging Face 热门模型日报（2026-06-10）

## 今日速览
今天的榜单仍由**通用大模型 + 多模态底座**主导，Gemma 4、DeepSeek、Nemotron、Qwen/Step 等家族持续占位。  
同时，**图像、视频、音频、OCR** 等生成/理解模型明显升温，说明 HF 上的模型消费正在从纯聊天扩展到全栈多模态。  
另一个强信号是**量化与本地部署**：GGUF、QAT、NF4、FP8、NVFP4 版本密集上榜，社区对“能跑、好部署、成本低”的需求非常明确。  
大厂官方权重与社区衍生版并行，HF 已经不仅是发布站，更是开放权重生态的核心分发阵地。

---

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- [DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) ｜ 作者：deepseek-ai ｜ 点赞：4,742 ｜ 下载：4,302,553  
  通用文本生成旗舰，热度和下载都断层领先，依然是最强“流量入口”之一。

- [NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16) ｜ 作者：nvidia ｜ 点赞：175 ｜ 下载：56,864  
  超大规模 MoE 旗舰权重，代表大厂继续押注高参数、高能力通用模型。

- [HRM-Text-1B](https://huggingface.co/sapientinc/HRM-Text-1B) ｜ 作者：sapientinc ｜ 点赞：735 ｜ 下载：133,351  
  轻量文本生成模型，靠“新架构/新训练思路”吸引关注，属于研究型热点。

- [Nex-N2-Pro](https://huggingface.co/nex-agi/Nex-N2-Pro) ｜ 作者：nex-agi ｜ 点赞：162 ｜ 下载：783  
  基于 Qwen3.5 MoE 的社区模型，说明中小团队仍在围绕强底座做高频二次创新。

- [Mellum2-12B-A2.5B-Thinking](https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking) ｜ 作者：JetBrains ｜ 点赞：274 ｜ 下载：17,571  
  面向“Thinking/推理”风格的模型，适合编程与复杂任务分解，偏工具型 LLM。

- [LFM2.5-8B-A1B](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B) ｜ 作者：LiquidAI ｜ 点赞：573 ｜ 下载：137,138  
  轻量 MoE 路线代表，兼顾效率与效果，符合当前“更小但更强”的部署趋势。

- [Nex-N2-mini](https://huggingface.co/nex-agi/Nex-N2-mini) ｜ 作者：nex-agi ｜ 点赞：114 ｜ 下载：748  
  小型 MoE 版本，主打低门槛尝试和边缘部署，体现了本地化轻量模型需求。

- [NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4) ｜ 作者：nvidia ｜ 点赞：154 ｜ 下载：71,818  
  官方低精度版本，说明超大模型也在向更低成本推理与部署演进。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it) ｜ 作者：google ｜ 点赞：822 ｜ 下载：581,354  
  Gemma 4 的指令/多模态版本，覆盖图文理解与生成，是当前最受关注的通用底座之一。

- [google/gemma-4-12B](https://huggingface.co/google/gemma-4-12B) ｜ 作者：google ｜ 点赞：483 ｜ 下载：122,464  
  Gemma 4 基座版，适合二次微调和研究，代表 Google 在开放多模态底座上的持续推进。

- [nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B) ｜ 作者：nvidia ｜ 点赞：1,735 ｜ 下载：123,922  
  视觉定位/grounding 模型，面向“找图中某物并定位”的 agent 任务，实用性很强。

- [ideogram-ai/ideogram-4-fp8](https://huggingface.co/ideogram-ai/ideogram-4-fp8) ｜ 作者：ideogram-ai ｜ 点赞：443 ｜ 下载：5,915  
  高质量文生图模型的 FP8 版本，强调出图质量与更容易部署。

- [ideogram-ai/ideogram-4-nf4](https://huggingface.co/ideogram-ai/ideogram-4-nf4) ｜ 作者：ideogram-ai ｜ 点赞：290 ｜ 下载：5,250  
  同系列 NF4 量化版，说明图像生成也在快速拥抱低显存推理。

- [bosonai/higgs-audio-v3-tts-4b](https://huggingface.co/bosonai/higgs-audio-v3-tts-4b) ｜ 作者：bosonai ｜ 点赞：285 ｜ 下载：16,207  
  文本转语音 TTS 模型，音频生成方向继续升温，且偏实用落地。

- [nvidia/nemotron-3.5-asr-streaming-0.6b](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b) ｜ 作者：nvidia ｜ 点赞：322 ｜ 下载：4,181  
  流式语音识别模型，主打低延迟在线场景，适合实时助手与转写系统。

- [MisoLabs/MisoTTS](https://huggingface.co/MisoLabs/MisoTTS) ｜ 作者：MisoLabs ｜ 点赞：175 ｜ 下载：0  
  新发布的 TTS 模型，虽然下载尚未起量，但已经进入社区关注视野。

- [google/magenta-realtime-2](https://huggingface.co/google/magenta-realtime-2) ｜ 作者：google ｜ 点赞：164 ｜ 下载：18,216  
  实时 text-to-audio 模型，体现 Google 在低延迟音频生成上的新推进。

- [stepfun-ai/Step-3.7-Flash](https://huggingface.co/stepfun-ai/Step-3.7-Flash) ｜ 作者：stepfun-ai ｜ 点赞：359 ｜ 下载：46,729  
  视觉语言/多模态模型，强调“Flash”式效率与响应速度，适合高吞吐场景。

- [ByteDance/Bernini-R](https://huggingface.co/ByteDance/Bernini-R) ｜ 作者：ByteDance ｜ 点赞：197 ｜ 下载：281  
  文/图到视频方向的生成模型，反映视频生成正从概念验证走向工程化。

- [jdopensource/JoyAI-Echo](https://huggingface.co/jdopensource/JoyAI-Echo) ｜ 作者：jdopensource ｜ 点赞：115 ｜ 下载：4,502  
  文生视频模型，标签还覆盖音视频生成，属于多模态内容生成的新热点。

- [Comfy-Org/Ideogram-4](https://huggingface.co/Comfy-Org/Ideogram-4) ｜ 作者：Comfy-Org ｜ 点赞：115 ｜ 下载：0  
  更像是 ComfyUI 生态下的工作流/封装资源，说明社区正在围绕 Ideogram 4 做应用层整合。

- [nvidia/Cosmos3-Nano](https://huggingface.co/nvidia/Cosmos3-Nano) ｜ 作者：nvidia ｜ 点赞：215 ｜ 下载：36,739  
  Cosmos 3 的小型版本，面向更广义的多模态/世界模型生态，属于 NVIDIA 的战略方向。

- [PaddlePaddle/PaddleOCR-VL-1.6](https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.6) ｜ 作者：PaddlePaddle ｜ 点赞：282 ｜ 下载：10,139  
  OCR + 视觉语言模型，偏文档理解与文字识别，落地场景非常明确。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）
- [CohereLabs/North-Mini-Code-1.0](https://huggingface.co/CohereLabs/North-Mini-Code-1.0) ｜ 作者：CohereLabs ｜ 点赞：173 ｜ 下载：1,784  
  编程专用模型，虽然下载不高，但“代码能力”仍是专用模型最稳定的需求之一。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）
- [unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF) ｜ 作者：unsloth ｜ 点赞：534 ｜ 下载：660,140  
  Gemma 4 的 GGUF 量化版，下载量很高，典型的本地部署友好包。

- [HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive](https://huggingface.co/HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive) ｜ 作者：HauhauCS ｜ 点赞：1,597 ｜ 下载：2,983,909  
  Qwen3.6 的社区衍生 GGUF/uncensored 版本，说明“可本地跑 + 更少对齐限制”依然有强需求。

- [unsloth/gemma-4-12B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-12B-it-qat-GGUF) ｜ 作者：unsloth ｜ 点赞：172 ｜ 下载：127,332  
  QAT + GGUF 组合，代表社区正在把训练感知量化与本地推理结合起来。

- [OBLITERATUS/Gemma-4-12B-OBLITERATED](https://huggingface.co/OBLITERATUS/Gemma-4-12B-OBLITERATED) ｜ 作者：OBLITERATUS ｜ 点赞：148 ｜ 下载：8,106  
  Gemma 4 的社区改写/去对齐版本，反映出围绕热门底座的二次加工非常活跃。

- [unsloth/gemma-4-26B-A4B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-26B-A4B-it-qat-GGUF) ｜ 作者：unsloth ｜ 点赞：115 ｜ 下载：96,059  
  更大参数版本的量化包，说明社区不仅在追求小模型，也在做大模型“可用化”。

- [google/gemma-4-12B-it-qat-q4_0-gguf](https://huggingface.co/google/gemma-4-12B-it-qat-q4_0-gguf) ｜ 作者：google ｜ 点赞：116 ｜ 下载：63,049  
  官方 GGUF Q4_0 版，表示大厂也在正面拥抱本地化、低成本部署生态。

- [ideogram-ai/ideogram-4-nf4](https://huggingface.co/ideogram-ai/ideogram-4-nf4) ｜ 作者：ideogram-ai ｜ 点赞：290 ｜ 下载：5,250  
  图像生成模型的低比特版本，代表量化已经从文本模型扩展到图像模型。

- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4) ｜ 作者：nvidia ｜ 点赞：154 ｜ 下载：71,818  
  官方低精度推理版本，说明超大模型正在通过量化进入更现实的部署阶段。

---

## 生态信号
Gemma 4、DeepSeek、Nemotron、Qwen/Step、Ideogram 这些家族势头最强，且同一底座常同时出现官方版、社区版和多种量化包。榜单几乎被开放权重占满，厂商级模型正在把 Hugging Face 当作首发与分发阵地。量化侧尤其活跃：GGUF、QAT、NF4、FP8、NVFP4 频出，说明“本地可跑、低成本推理”仍是核心诉求。

## 值得探索
- [deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)  
  通用能力最强、生态关注度最高，适合做基准参考。

- [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)  
  代表开放多模态底座的新一代方向，适合研究图文统一建模。

- [nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B)  
  很适合做视觉 grounding、Agent 看图定位和工具调用实验。  

如果你愿意，我可以把这份日报再整理成**适合公众号发布的版式**，或补一版**“按涨幅/下载率/家族聚类”的深度分析**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*