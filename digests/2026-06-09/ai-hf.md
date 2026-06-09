# Hugging Face 热门模型日报 2026-06-09

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-06-09 01:29 UTC

---

# Hugging Face 热门模型日报（2026-06-09）

## 1) 今日速览
本期榜单最明显的信号是：**大厂旗舰底座 + 社区量化版本**同时爆发，Gemma 4、DeepSeek V4、Nemotron、Qwen 系列都在高频出现。  
其中，**DeepSeek-V4-Pro / Flash** 以超高点赞和下载领跑通用语言模型赛道，说明高能力对话模型仍是最大流量入口。  
与此同时，**图像、视频、音频、OCR、ASR** 等多模态与专用模型明显增多，热点正在从“纯文本”扩展到“Any-to-Any 与 Text-to-X”。  
量化形态方面，**GGUF、QAT、FP4/NF4** 成为高下载的共同特征，表明社区对**可本地部署、低成本推理**的需求非常强。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- [sapientinc/HRM-Text-1B](https://huggingface.co/sapientinc/HRM-Text-1B) — 作者：sapientinc；点赞：728；下载：163,953。一个 1B 级文本生成模型，靠轻量化与新架构思路吸引关注，适合研究型用户。
- [JetBrains/Mellum2-12B-A2.5B-Thinking](https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking) — 作者：JetBrains；点赞：259；下载：17,448。带 “Thinking” 的中型对话模型，体现开发工具厂商对推理能力与编码场景的持续投入。
- [deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) — 作者：deepseek-ai；点赞：4,722；下载：5,399,597。旗舰通用对话模型，超高点赞和下载说明它仍是本期最强的流量与口碑中心。
- [deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) — 作者：deepseek-ai；点赞：1,447；下载：3,262,529。更偏速度与性价比的版本，说明“快、便宜、好用”依然是主流诉求。
- [LiquidAI/LFM2.5-8B-A1B](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B) — 作者：LiquidAI；点赞：548；下载：135,131。8B 级 MoE 文本模型，兼顾能力与部署门槛，适合私有化和边缘推理探索。
- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16) — 作者：nvidia；点赞：166；下载：55,910。超大规模 BF16 基座，主要吸引研究者和评测用户关注极限能力。
- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4) — 作者：nvidia；点赞：145；下载：66,219。FP4 量化版本下载更高，反映出推理成本优化和部署友好性的重要性。
- [nex-agi/Nex-N2-Pro](https://huggingface.co/nex-agi/Nex-N2-Pro) — 作者：nex-agi；点赞：121；下载：716。基于 Qwen 系的文本模型，热度更多来自小团队对 MoE/多模态底座的工程化尝试。

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it) — 作者：google；点赞：750；下载：554,173。Gemma 4 指令版 any-to-any 模型，代表大厂把统一多模态底座推向开源分发。
- [google/gemma-4-12B](https://huggingface.co/google/gemma-4-12B) — 作者：google；点赞：450；下载：117,509。Gemma 4 基座版，受欢迎说明研究者对统一预训练权重仍有强需求。
- [ideogram-ai/ideogram-4-fp8](https://huggingface.co/ideogram-ai/ideogram-4-fp8) — 作者：ideogram-ai；点赞：393；下载：5,495。FP8 文生图版本，体现高质量图像生成模型向低显存部署延伸。
- [ideogram-ai/ideogram-4-nf4](https://huggingface.co/ideogram-ai/ideogram-4-nf4) — 作者：ideogram-ai；点赞：262；下载：4,963。NF4 量化版，更偏本地化与低成本推理。
- [bosonai/higgs-audio-v3-tts-4b](https://huggingface.co/bosonai/higgs-audio-v3-tts-4b) — 作者：bosonai；点赞：245；下载：15,005。4B 级 TTS 模型，说明高质量语音合成仍是活跃赛道。
- [stepfun-ai/Step-3.7-Flash](https://huggingface.co/stepfun-ai/Step-3.7-Flash) — 作者：stepfun-ai；点赞：352；下载：45,535。主打图文理解和快速响应，属于多模态“闪电版”路线。
- [ByteDance/Bernini-R](https://huggingface.co/ByteDance/Bernini-R) — 作者：ByteDance；点赞：184；下载：278。图像到视频生成/渲染模型，代表短视频自动化生成方向。
- [google/magenta-realtime-2](https://huggingface.co/google/magenta-realtime-2) — 作者：google；点赞：151；下载：17,531。实时文本到音频模型，强调交互式、低延迟的音频生成。
- [nvidia/Cosmos3-Nano](https://huggingface.co/nvidia/Cosmos3-Nano) — 作者：nvidia；点赞：206；下载：34,104。Cosmos 3 轻量版本，偏通用视觉生成/世界模型方向。
- [nvidia/Cosmos3-Super](https://huggingface.co/nvidia/Cosmos3-Super) — 作者：nvidia；点赞：158；下载：27,548。更强的 Cosmos 3 版本，延续 NVIDIA 在视频/世界模型上的布局。
- [jdopensource/JoyAI-Echo](https://huggingface.co/jdopensource/JoyAI-Echo) — 作者：jdopensource；点赞：103；下载：4,053。文本到视频模型，说明视频生成继续向工程化和产品化推进。
- [SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base) — 作者：SulphurAI；点赞：1,600；下载：1,707,062。基于 LTX-2.3 的 text-to-video 基座，超高下载显示社区对视频生成底座的强烈需求。

### 🔧 专用模型（代码、数学、医疗、嵌入、OCR、语音专用）
- [nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B) — 作者：nvidia；点赞：1,619；下载：121,594。面向视觉定位与特征提取的专用模型，属于“可找、可定位”的新一代视觉基础模型。
- [nvidia/nemotron-3.5-asr-streaming-0.6b](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b) — 作者：nvidia；点赞：288；下载：3,957。流式 ASR 专用模型，突出低延迟语音识别能力。
- [PaddlePaddle/PaddleOCR-VL-1.6](https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.6) — 作者：PaddlePaddle；点赞：277；下载：9,924。OCR + 视觉语言组合，典型文档理解与文字识别专用模型。
- [MisoLabs/MisoTTS](https://huggingface.co/MisoLabs/MisoTTS) — 作者：MisoLabs；点赞：156；下载：0。新的开源 TTS 项目，属于语音合成专用方向，体现社区对音频基础能力的持续试验。

### 📦 微调与量化（社区微调、GGUF、AWQ）
- [HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive](https://huggingface.co/HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive) — 作者：HauhauCS；点赞：1,554；下载：3,036,465。基于 Qwen3.6 的社区改版，超高下载说明“可用大模型 + 社区定制”仍有巨大市场。
- [unsloth/Qwen3.6-27B-MTP-GGUF](https://huggingface.co/unsloth/Qwen3.6-27B-MTP-GGUF) — 作者：unsloth；点赞：695；下载：1,186,648。Qwen3.6 的 GGUF 量化版，兼顾大模型能力与本地部署。
- [unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF) — 作者：unsloth；点赞：502；下载：645,263。Gemma 4 指令版 GGUF，是“官方模型 + 社区量化”的典型爆款。
- [unsloth/gemma-4-12B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-12B-it-qat-GGUF) — 作者：unsloth；点赞：146；下载：121,399。QAT 量化版，面向低显存和高吞吐推理。
- [unsloth/gemma-4-26B-A4B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-26B-A4B-it-qat-GGUF) — 作者：unsloth；点赞：103；下载：87,455。更大参数的 QAT 量化版，主打高性价比本地部署。
- [google/gemma-4-12B-it-qat-q4_0-gguf](https://huggingface.co/google/gemma-4-12B-it-qat-q4_0-gguf) — 作者：google；点赞：99；下载：52,386。官方量化 GGUF，说明一线厂商也在主动拥抱社区推理格式。

---

## 3) 生态信号
Gemma 4、DeepSeek V4、Nemotron、Qwen 等家族最活跃，说明**头部开源/开放权重阵营**仍主导 HF 热榜；闭源 API 型产品并未形成压倒性优势。榜单里大量出现 **GGUF、QAT、FP4、NF4**，且量化版下载常高于原版，说明生态重心正从“训练能力”转向“可落地部署”。多模态也在加速从图文理解扩展到 **OCR、ASR、TTS、视频生成、实时音频**，落地导向越来越强。

---

## 4) 值得探索
1. [deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)  
   适合看当前顶级通用对话模型的能力上限，且是本期最强流量模型。

2. [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)  
   代表统一多模态底座的开源化方向，且社区量化版本很多，便于研究与部署。

3. [SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)  
   最值得关注的视频生成基座之一，下载量极高，适合观察 text-to-video 的工程化趋势。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*