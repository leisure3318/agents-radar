# Hugging Face 热门模型日报 2026-06-09

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-06-09 03:42 UTC

---

# Hugging Face 热门模型日报（2026-06-09）

## 1) 今日速览
本周榜单继续由 **Google、DeepSeek、NVIDIA** 等大厂家族领跑，说明“开放权重 + 生态分发”仍是 Hugging Face 的主流增长引擎。  
热点明显从纯文本 LLM 扩展到 **多模态、图像/视频生成、OCR、语音** 等“可直接落地”的模型形态。  
同时，**GGUF、QAT、NF4、FP8、uncensored** 等社区量化/微调版本下载量很活跃，体现出本地部署与低成本推理需求强劲。  
从点赞与下载结构看，能兼顾 **能力、可部署性、可二次定制** 的模型更容易冲进趋势榜。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- [sapientinc/HRM-Text-1B](https://huggingface.co/sapientinc/HRM-Text-1B)｜作者：sapientinc｜点赞：728｜下载：163,953  
  一句话：1B 级文本生成模型，主打高效推理与“思考感”，轻量但讨论度高。

- [JetBrains/Mellum2-12B-A2.5B-Thinking](https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking)｜作者：JetBrains｜点赞：260｜下载：17,448  
  一句话：面向对话与思考型推理的中型 LLM，来自开发者生态品牌，容易获得关注。

- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16)｜作者：nvidia｜点赞：167｜下载：55,910  
  一句话：超大规模旗舰模型，代表 NVIDIA 在高端文本模型上的持续投入。

- [LiquidAI/LFM2.5-8B-A1B](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B)｜作者：LiquidAI｜点赞：551｜下载：135,131  
  一句话：MoE 路线的 8B 级文本模型，兼顾效率与效果，适合推理与代理场景。

- [deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)｜作者：deepseek-ai｜点赞：4,724｜下载：5,399,597  
  一句话：DeepSeek V4 旗舰版，超高点赞和下载说明其仍是本周最强“流量锚点”。

- [deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)｜作者：deepseek-ai｜点赞：1,449｜下载：3,262,529  
  一句话：更偏速度/成本优化的 V4 版本，适合高并发与产品化接入，热度非常高。

- [nex-agi/Nex-N2-Pro](https://huggingface.co/nex-agi/Nex-N2-Pro)｜作者：nex-agi｜点赞：126｜下载：716  
  一句话：Qwen 系 MoE 路线的衍生模型，虽然下载不高，但作为新锐对话模型值得观察。

---

### 🎨 多模态与生成（图像、视频、文本到X）
- [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)｜作者：google｜点赞：754｜下载：554,173  
  一句话：Gemma 4 的指令/多模态版本，属于本周最受关注的统一多模态模型之一。

- [google/gemma-4-12B](https://huggingface.co/google/gemma-4-12B)｜作者：google｜点赞：454｜下载：117,509  
  一句话：Gemma 4 基座版，显示出 Google 新一代开放多模态家族的吸引力。

- [stepfun-ai/Step-3.7-Flash](https://huggingface.co/stepfun-ai/Step-3.7-Flash)｜作者：stepfun-ai｜点赞：352｜下载：45,535  
  一句话：多模态“Flash”路线，强调速度与实用性，适合图文理解与轻量应用。

- [ByteDance/Bernini-R](https://huggingface.co/ByteDance/Bernini-R)｜作者：ByteDance｜点赞：186｜下载：278  
  一句话：图文到视频的渲染/生成模型，代表短视频与生成式视频方向的持续升温。

- [nvidia/Cosmos3-Nano](https://huggingface.co/nvidia/Cosmos3-Nano)｜作者：nvidia｜点赞：207｜下载：34,104  
  一句话：Cosmos 3 的轻量版本，体现 NVIDIA 在通用视觉/生成底座上的布局。

- [nvidia/Cosmos3-Super](https://huggingface.co/nvidia/Cosmos3-Super)｜作者：nvidia｜点赞：159｜下载：27,548  
  一句话：Cosmos 3 更高阶版本，和 Nano 一起构成 NVIDIA 的视觉生成生态梯队。

---

### 🔧 专用模型（视觉、语音、OCR 等）
- [nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B)｜作者：nvidia｜点赞：1,631｜下载：121,594  
  一句话：图文定位/检索型模型，面向“找图中目标、找区域”的视觉 agent 场景，很贴近应用需求。

- [bosonai/higgs-audio-v3-tts-4b](https://huggingface.co/bosonai/higgs-audio-v3-tts-4b)｜作者：bosonai｜点赞：252｜下载：15,005  
  一句话：4B 级 TTS 模型，音频生成赛道持续升温，且易与对话系统组合。

- [nvidia/nemotron-3.5-asr-streaming-0.6b](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b)｜作者：nvidia｜点赞：296｜下载：3,957  
  一句话：流式 ASR 模型，适合实时转写与低延迟语音交互。

- [MisoLabs/MisoTTS](https://huggingface.co/MisoLabs/MisoTTS)｜作者：MisoLabs｜点赞：157｜下载：0  
  一句话：文本转语音模型，典型“新发布、待验证”型项目，适合关注后续实际落地表现。

- [google/magenta-realtime-2](https://huggingface.co/google/magenta-realtime-2)｜作者：google｜点赞：153｜下载：17,531  
  一句话：实时文本到音频模型，体现 Google 在生成式音频方向的探索。

- [PaddlePaddle/PaddleOCR-VL-1.6](https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.6)｜作者：PaddlePaddle｜点赞：278｜下载：9,924  
  一句话：OCR + 视觉语言模型，面向文档理解与信息抽取，属于高频刚需工具型模型。

- [jdopensource/JoyAI-Echo](https://huggingface.co/jdopensource/JoyAI-Echo)｜作者：jdopensource｜点赞：104｜下载：4,053  
  一句话：文本到视频/音视频生成方向模型，反映“多模态内容生产”需求持续升温。

---

### 📦 微调与量化（社区微调、GGUF、FP8/NF4/QAT）
- [HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive](https://huggingface.co/HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive)｜作者：HauhauCS｜点赞：1,557｜下载：3,036,465  
  一句话：超高下载的社区 uncensored 版本，说明“可本地跑、可自由调”的需求非常强。

- [unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF)｜作者：unsloth｜点赞：504｜下载：645,263  
  一句话：Gemma 4 指令版的 GGUF 量化，典型的本地部署热门款。

- [ideogram-ai/ideogram-4-nf4](https://huggingface.co/ideogram-ai/ideogram-4-nf4)｜作者：ideogram-ai｜点赞：265｜下载：4,963  
  一句话：NF4 量化版图像生成模型，面向更省显存的部署场景。

- [unsloth/gemma-4-12B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-12B-it-qat-GGUF)｜作者：unsloth｜点赞：147｜下载：121,399  
  一句话：QAT + GGUF 的组合，说明社区正在把“可用”进一步做成“更易用”。

- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4)｜作者：nvidia｜点赞：145｜下载：66,219  
  一句话：NVFP4 低精度版本，反映超大模型的推理压缩与工程化趋势。

- [unsloth/gemma-4-26B-A4B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-26B-A4B-it-qat-GGUF)｜作者：unsloth｜点赞：104｜下载：87,455  
  一句话：更大参数量的 Gemma 4 量化版，适合追求性价比的本地推理。

- [google/gemma-4-12B-it-qat-q4_0-gguf](https://huggingface.co/google/gemma-4-12B-it-qat-q4_0-gguf)｜作者：google｜点赞：101｜下载：52,386  
  一句话：官方 Q4_0 GGUF 量化，说明原厂也在强化本地部署生态。

- [SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)｜作者：SulphurAI｜点赞：1,601｜下载：1,707,062  
  一句话：基于 LTX-2.3 的视频模型量化/封装版本，下载量极高，说明视频生成本地化需求爆发。

- [unsloth/Qwen3.6-27B-MTP-GGUF](https://huggingface.co/unsloth/Qwen3.6-27B-MTP-GGUF)｜作者：unsloth｜点赞：697｜下载：1,186,648  
  一句话：Qwen 3.6 的 GGUF 社区版，下载量很高，体现 Qwen 生态的强生命力。

- [ideogram-ai/ideogram-4-fp8](https://huggingface.co/ideogram-ai/ideogram-4-fp8)｜作者：ideogram-ai｜点赞：397｜下载：5,495  
  一句话：FP8 量化的图像生成模型，兼顾质量与效率，适合高性价比部署。

---

## 3) 生态信号
Gemma 4、DeepSeek V4、Nemotron、Qwen、Cosmos 构成本周主线，说明 **大模型家族化迭代** 仍是 HF 生态核心。**开放权重** 明显占优，闭源能力更多通过可下载权重、量化包和社区衍生版进入开发者工作流。值得注意的是，**GGUF/QAT/NF4/FP8/uncensored** 等版本下载激增，表明本地推理、低成本部署和可定制微调正在成为热门模型能否“爆量”的关键。

---

## 4) 值得探索
- [nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B)  
  理由：视觉定位/检索非常适合 agent、RAG+视觉、工业质检等场景，应用价值高。

- [deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)  
  理由：下载量和点赞都极强，是当前最值得优先评估的通用文本模型之一。

- [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)  
  理由：代表新一代开放多模态主线，适合研究“统一模型”在真实产品中的落地能力。

如果你愿意，我还可以把这份日报再整理成 **适合公众号发布的短版** 或 **适合内部汇报的 PPT 大纲版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*