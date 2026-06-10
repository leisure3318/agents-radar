# Hugging Face 热门模型日报 2026-06-10

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-06-10 01:38 UTC

---

# Hugging Face 热门模型日报（2026-06-10）

> 注：部分模型同时具备多模态、量化或社区微调属性，以下按**主要用途**归类。

## 今日速览
今天榜单最强信号是 **Gemma 4** 继续扩张：官方 any-to-any 版本、社区 GGUF/量化版同时上榜，说明统一多模态底座正在成为主战场。  
**DeepSeek-V4-Pro** 以最高点赞和下载领跑通用 LLM，显示大参数通用模型仍是生态核心。  
与此同时，**视频、音频、ASR、OCR、视觉定位** 等专用模型密集出现，模型生态正在从“聊天”快速走向“任务组件化”。  
下载量最高的往往是 **GGUF、NF4、FP8、NVFP4** 等部署友好版本，说明“可本地跑、可低成本部署”依然最吃香。

---

## 🧠 语言模型（LLM、对话模型、指令微调）

- [deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)  
  作者：deepseek-ai｜点赞：4,740｜下载：4,302,553  
  旗舰通用对话/推理模型，点赞和下载双高，代表了当前最强的通用 LLM 关注度。

- [sapientinc/HRM-Text-1B](https://huggingface.co/sapientinc/HRM-Text-1B)  
  作者：sapientinc｜点赞：734｜下载：133,351  
  1B 级文本模型，主打高效文本建模与推理，属于“轻量但有方法论”的热门项目。

- [LiquidAI/LFM2.5-8B-A1B](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B)  
  作者：LiquidAI｜点赞：572｜下载：137,138  
  以 MoE/轻量推理见长的文本模型，热度来自高效架构与可部署性。

- [JetBrains/Mellum2-12B-A2.5B-Thinking](https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking)  
  作者：JetBrains｜点赞：272｜下载：17,571  
  面向“思考/代码推理”场景的文本模型，开发者社区关注度较高。

- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16)  
  作者：nvidia｜点赞：175｜下载：56,864  
  超大规模通用模型，代表 NVIDIA 在高端基础模型上的持续投入。

- [nex-agi/Nex-N2-Pro](https://huggingface.co/nex-agi/Nex-N2-Pro)  
  作者：nex-agi｜点赞：161｜下载：783  
  基于 MoE/对话体系的文本模型，小体量但上榜，说明新兴厂牌仍在吸引尝鲜流量。

- [nex-agi/Nex-N2-mini](https://huggingface.co/nex-agi/Nex-N2-mini)  
  作者：nex-agi｜点赞：110｜下载：748  
  更小的同系列模型，适合低成本试验与边缘部署。

---

## 🎨 多模态与生成（图像、视频、音频、文本到X）

- [nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B)  
  作者：nvidia｜点赞：1,731｜下载：123,922  
  视觉定位/grounding 模型，热度高说明“看图找物、定位理解”需求正在升温。

- [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)  
  作者：google｜点赞：813｜下载：581,354  
  Gemma 4 官方指令版，统一覆盖图文输入输出，是本轮多模态底座代表之一。

- [google/gemma-4-12B](https://huggingface.co/google/gemma-4-12B)  
  作者：google｜点赞：480｜下载：122,464  
  官方基础版，作为统一多模态/对话底座，持续吸引开发者关注。

- [ideogram-ai/ideogram-4-fp8](https://huggingface.co/ideogram-ai/ideogram-4-fp8)  
  作者：ideogram-ai｜点赞：441｜下载：5,915  
  图像生成模型的 FP8 版本，说明高质量文生图正在向高效推理迁移。

- [stepfun-ai/Step-3.7-Flash](https://huggingface.co/stepfun-ai/Step-3.7-Flash)  
  作者：stepfun-ai｜点赞：358｜下载：46,729  
  高效多模态/视觉语言模型，兼顾速度与通用性，适合应用层落地。

- [ideogram-ai/ideogram-4-nf4](https://huggingface.co/ideogram-ai/ideogram-4-nf4)  
  作者：ideogram-ai｜点赞：287｜下载：5,250  
  Ideogram 4 的 NF4 量化图像生成版，热度来自“高质 + 低成本”组合。

- [nvidia/Cosmos3-Nano](https://huggingface.co/nvidia/Cosmos3-Nano)  
  作者：nvidia｜点赞：214｜下载：36,739  
  小型 Cosmos 生成/世界模型，反映视频/世界建模方向的持续推进。

- [ByteDance/Bernini-R](https://huggingface.co/ByteDance/Bernini-R)  
  作者：ByteDance｜点赞：193｜下载：281  
  图像到视频生成/渲染模型，下载虽少但关注度高，属于前沿方向。

- [jdopensource/JoyAI-Echo](https://huggingface.co/jdopensource/JoyAI-Echo)  
  作者：jdopensource｜点赞：114｜下载：4,502  
  文本到视频模型，体现短视频/生成式内容链路的扩张。

- [Comfy-Org/Ideogram-4](https://huggingface.co/Comfy-Org/Ideogram-4)  
  作者：Comfy-Org｜点赞：112｜下载：0  
  更像是 ComfyUI 生态里的 Ideogram 4 集成/工作流包，反映图像生成插件化扩散。

---

## 🔧 专用模型（代码、数学、医疗、嵌入）

- [nvidia/nemotron-3.5-asr-streaming-0.6b](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b)  
  作者：nvidia｜点赞：319｜下载：4,181  
  流式自动语音识别模型，适合实时转写场景，属于应用刚需型模型。

- [bosonai/higgs-audio-v3-tts-4b](https://huggingface.co/bosonai/higgs-audio-v3-tts-4b)  
  作者：bosonai｜点赞：282｜下载：16,207  
  文本到语音模型，说明音频生成正成为独立赛道。

- [PaddlePaddle/PaddleOCR-VL-1.6](https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.6)  
  作者：PaddlePaddle｜点赞：280｜下载：10,139  
  OCR + 视觉语言模型，适合文档理解与票据/表单识别场景。

- [MisoLabs/MisoTTS](https://huggingface.co/MisoLabs/MisoTTS)  
  作者：MisoLabs｜点赞：175｜下载：0  
  TTS 语音合成模型，虽然下载未起量，但说明语音赛道仍在持续孵化。

- [google/magenta-realtime-2](https://huggingface.co/google/magenta-realtime-2)  
  作者：google｜点赞：164｜下载：18,216  
  实时文本到音频/音乐生成模型，体现“低延迟生成”方向的热度。

- [CohereLabs/North-Mini-Code-1.0](https://huggingface.co/CohereLabs/North-Mini-Code-1.0)  
  作者：CohereLabs｜点赞：160｜下载：1,784  
  面向代码生成的专用模型，属于开发者向高效编码助手迁移的代表。

---

## 📦 微调与量化（社区微调、GGUF、AWQ）

- [HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive](https://huggingface.co/HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive)  
  作者：HauhauCS｜点赞：1,594｜下载：2,983,909  
  Qwen3.6 MoE 的社区改写版，超高下载量说明“个性化/本地化/去对齐”微调仍有巨大需求。

- [unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF)  
  作者：unsloth｜点赞：532｜下载：660,140  
  Gemma-4 指令版 GGUF 打包，面向本地部署，下载量极高，说明轻量化分发最受欢迎。

- [unsloth/gemma-4-12B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-12B-it-qat-GGUF)  
  作者：unsloth｜点赞：171｜下载：127,332  
  QAT + GGUF 组合，强调低显存与易部署，是本地推理的重要形态。

- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4)  
  作者：nvidia｜点赞：153｜下载：71,818  
  NVFP4 低精度版本，代表超大模型向高效部署继续下沉。

- [OBLITERATUS/Gemma-4-12B-OBLITERATED](https://huggingface.co/OBLITERATUS/Gemma-4-12B-OBLITERATED)  
  作者：OBLITERATUS｜点赞：140｜下载：8,106  
  社区改写/去对齐风格的 Gemma 4 版本，反映二次加工和个性化需求活跃。

- [unsloth/gemma-4-26B-A4B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-26B-A4B-it-qat-GGUF)  
  作者：unsloth｜点赞：115｜下载：96,059  
  更大参数的 QAT GGUF 版本，体现“更强模型也要可本地跑”的趋势。

- [google/gemma-4-12B-it-qat-q4_0-gguf](https://huggingface.co/google/gemma-4-12B-it-qat-q4_0-gguf)  
  作者：google｜点赞：114｜下载：63,049  
  官方量化版，直接回应本地部署、低成本推理的需求。

---

## 生态信号
本周最强势的仍是 **Gemma 4、DeepSeek、Nemotron、Qwen 派生和 LiquidAI** 等通用底座；其中 Gemma 4 已形成“官方权重 + 社区量化”的完整梯队。开源/可下载权重的热度明显高于服务型闭源产品，且 **GGUF、NF4、FP8、NVFP4** 等部署友好格式下载更猛。与此同时，视频、音频、ASR、OCR 和视觉定位等专用多模态模型快速增多，说明模型生态正从“聊天模型”走向“任务组件库”。

---

## 值得探索

1. **[deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)**  
   适合做通用能力基线，当前榜单的绝对头部，最能代表“强通用模型”的用户偏好。

2. **[google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)**  
   官方多模态指令版，适合评估图文统一能力；如果要本地部署，可优先看它的 GGUF/量化分支。

3. **[nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B)**  
   视觉定位/grounding 很有应用前景，适合研究“模型如何把理解转成定位与执行”。

如果你愿意，我也可以把这份日报进一步整理成 **表格版 CSV/Markdown 表**，或输出成适合公众号/Notion 的排版格式。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*