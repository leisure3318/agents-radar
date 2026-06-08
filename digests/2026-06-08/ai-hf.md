# Hugging Face 热门模型日报 2026-06-08

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-06-08 08:10 UTC

---

# 《Hugging Face 热门模型日报》
**日期：2026-06-08｜口径：按周点赞数排序**

## 1）今日速览
今天榜单的主线是“**大模型家族持续开枝散叶 + 多模态/视频快速升温**”。DeepSeek、Gemma、Qwen、Nemotron、MiniCPM、LFM2.5 等通用模型继续占据头部，说明通用能力仍是社区最关心的基座。另一边，文本到图像/视频、图像到视频、文本到音频以及 OCR/ASR/TTS 全面活跃，NVIDIA、Google、Ideogram、ByteDance、PaddlePaddle 集中发力。下载量最高的往往不是最“原始”的权重，而是 **GGUF、NVFP4、FP8** 等更易落地的版本，反映出本地部署需求非常强。

---

## 2）热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- [deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)  
  作者：deepseek-ai｜点赞：4,705｜下载：5,399,597  
  DeepSeek 的旗舰通用模型，点赞与下载双高，说明它仍是当前最受关注的通用能力标杆。

- [deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)  
  作者：deepseek-ai｜点赞：1,437｜下载：3,262,529  
  面向更快推理/更低成本的版本，适合高频在线服务，因此热度和下载都很强。

- [openbmb/MiniCPM5-1B](https://huggingface.co/openbmb/MiniCPM5-1B)  
  作者：openbmb｜点赞：779｜下载：126,061  
  轻量级中文友好模型，适合端侧和低成本部署，是“小模型高可用”路线的代表。

- [LiquidAI/LFM2.5-8B-A1B](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B)  
  作者：LiquidAI｜点赞：542｜下载：135,131  
  采用 MoE 思路的高效率模型，在参数与性能之间做平衡，因此容易吸引工程侧关注。

- [JetBrains/Mellum2-12B-A2.5B-Thinking](https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking)  
  作者：JetBrains｜点赞：252｜下载：17,448  
  面向“思考型”文本/代码场景，JetBrains 背书让它在开发者群体里更具辨识度。

- [sapientinc/HRM-Text-1B](https://huggingface.co/sapientinc/HRM-Text-1B)  
  作者：sapientinc｜点赞：722｜下载：163,953  
  轻量文本模型，偏高效推理与研究探索，属于“新架构尝试”类热榜选手。

- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16)  
  作者：nvidia｜点赞：160｜下载：55,910  
  超大 MoE 旗舰权重，代表 NVIDIA 在高端通用推理上的最新布局。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- [nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B)  
  作者：nvidia｜点赞：1,551｜下载：121,594  
  视觉-语言定位模型，偏“找物/指代/特征抽取”，实用性强，容易进入真实工作流。

- [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)  
  作者：google｜点赞：711｜下载：554,173  
  Gemma 4 的指令版统一多模态底座，体现 Google 在 any-to-any 路线上的推进。

- [google/gemma-4-12B](https://huggingface.co/google/gemma-4-12B)  
  作者：google｜点赞：423｜下载：117,509  
  Gemma 4 基座模型，适合作为下游多模态/对话任务的起点。

- [stepfun-ai/Step-3.7-Flash](https://huggingface.co/stepfun-ai/Step-3.7-Flash)  
  作者：stepfun-ai｜点赞：349｜下载：45,535  
  轻快型视觉语言模型，强调速度与可用性，适合交互式场景。

- [nvidia/Cosmos3-Nano](https://huggingface.co/nvidia/Cosmos3-Nano)  
  作者：nvidia｜点赞：199｜下载：34,104  
  Cosmos3 系列的紧凑版通用生成底座，反映 NVIDIA 在多模态基础设施上的持续投入。

- [nvidia/Cosmos3-Super](https://huggingface.co/nvidia/Cosmos3-Super)  
  作者：nvidia｜点赞：154｜下载：27,548  
  更大规模的 Cosmos3 底座，偏通用生成能力与后续任务适配。

- [nvidia/Cosmos3-Super-Text2Image](https://huggingface.co/nvidia/Cosmos3-Super-Text2Image)  
  作者：nvidia｜点赞：124｜下载：8,019  
  文本到图像分支，体现“基础底座 + 任务头”式产品化思路。

- [nvidia/Cosmos3-Super-Image2Video](https://huggingface.co/nvidia/Cosmos3-Super-Image2Video)  
  作者：nvidia｜点赞：116｜下载：7,453  
  图像到视频能力，说明视频生成仍是最热的多模态增量方向之一。

- [ByteDance/Bernini-R](https://huggingface.co/ByteDance/Bernini-R)  
  作者：ByteDance｜点赞：171｜下载：278  
  图像文本到视频研究模型，下载不高但研究属性强，属于前沿探索型发布。

- [bosonai/higgs-audio-v3-tts-4b](https://huggingface.co/bosonai/higgs-audio-v3-tts-4b)  
  作者：bosonai｜点赞：206｜下载：15,005  
  TTS 生成模型，显示语音合成正与大模型栈深度融合。

- [MisoLabs/MisoTTS](https://huggingface.co/MisoLabs/MisoTTS)  
  作者：MisoLabs｜点赞：145｜下载：0  
  新发布的语音合成模型，热度来自早期关注与“声音代理”方向的持续升温。

- [google/magenta-realtime-2](https://huggingface.co/google/magenta-realtime-2)  
  作者：google｜点赞：137｜下载：17,531  
  文本到音频/实时生成方向模型，代表“生成式音频”开始进入主流视野。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）
- [nvidia/nemotron-3.5-asr-streaming-0.6b](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b)  
  作者：nvidia｜点赞：266｜下载：3,957  
  流式语音识别模型，主打低延迟 ASR，适合实时字幕、客服和语音助手。

- [PaddlePaddle/PaddleOCR-VL-1.6](https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.6)  
  作者：PaddlePaddle｜点赞：270｜下载：9,924  
  面向 OCR 与文档理解的多模态模型，企业场景实用性很强。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）
- [unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF)  
  作者：unsloth｜点赞：468｜下载：645,263  
  Gemma 4 的 GGUF 版，下载极高，说明本地/低成本部署需求非常旺盛。

- [unsloth/gemma-4-12B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-12B-it-qat-GGUF)  
  作者：unsloth｜点赞：129｜下载：121,399  
  QAT 量化版本，兼顾质量与推理成本，典型的“可落地”改造。

- [unsloth/Qwen3.6-27B-MTP-GGUF](https://huggingface.co/unsloth/Qwen3.6-27B-MTP-GGUF)  
  作者：unsloth｜点赞：690｜下载：1,186,648  
  Qwen3.6 的高人气 GGUF 版本，下载量说明社区对本地 MoE 推理非常买单。

- [HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive](https://huggingface.co/HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive)  
  作者：HauhauCS｜点赞：1,531｜下载：3,036,465  
  社区改写的 GGUF 版本，派生生态活跃、下载极高，体现了“可部署 + 社区二次加工”的强需求。

- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4)  
  作者：nvidia｜点赞：135｜下载：66,219  
  面向 NVIDIA 生态的 NVFP4 优化版，代表超大模型的高效部署路线。

- [nvidia/Qwen3.6-35B-A3B-NVFP4](https://huggingface.co/nvidia/Qwen3.6-35B-A3B-NVFP4)  
  作者：nvidia｜点赞：201｜下载：1,362,097  
  Qwen3.6 的 NVIDIA 优化版本，下载量很高，说明硬件友好型发布同样很吃香。

- [ideogram-ai/ideogram-4-fp8](https://huggingface.co/ideogram-ai/ideogram-4-fp8)  
  作者：ideogram-ai｜点赞：362｜下载：5,495  
  FP8 版文本到图像模型，适合高性能推理与部署实验。

- [ideogram-ai/ideogram-4-nf4](https://huggingface.co/ideogram-ai/ideogram-4-nf4)  
  作者：ideogram-ai｜点赞：242｜下载：4,963  
  NF4 量化版，体现图像生成模型也在快速走向轻量化分发。

- [SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)  
  作者：SulphurAI｜点赞：1,589｜下载：1,707,062  
  文本到视频基座的 GGUF 版本，下载极高，说明视频生成也开始强烈吸引“本地可用”用户。

---

## 3）生态信号
DeepSeek、Gemma、Qwen、Nemotron 与 Cosmos 组成了当前最强的家族势能，说明头部开源阵营仍在抢占基座心智。榜单几乎清一色是开放权重，真正拉动下载的往往是 GGUF、NVFP4、FP8 等可本地部署版本。与此同时，OCR、ASR、TTS 和视频生成正从“演示”走向“可用”，细分赛道在快速成型。

---

## 4）值得探索
- [deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)  
  头部热度最高，适合用来观察当前通用 LLM 的能力上限与社区反馈。

- [unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF)  
  非常适合本地部署与成本控制研究，能直观看到“开源大模型如何落地”。

- [SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)  
  视频生成方向的高关注模型，适合研究多模态内容生成的下一波增长点。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*