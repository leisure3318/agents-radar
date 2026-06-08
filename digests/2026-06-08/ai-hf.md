# Hugging Face 热门模型日报 2026-06-08

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-06-08 00:43 UTC

---

# Hugging Face 热门模型日报（2026-06-08）

## 今日速览
本周榜单最突出的信号，是**通用大模型家族持续迭代**：DeepSeek、Gemma、Qwen、Nemotron、MiniCPM 等都在热榜上占据位置。  
同时，**多模态与生成**明显升温，从图像理解、OCR、定位到视频生成、音频/TTS 都有新模型上榜。  
值得注意的是，**NVIDIA 相关发布非常密集**，覆盖 LLM、视觉定位、视频、ASR、超分等多条赛道。  
另外，GGUF、FP8、NF4、NVFP4、QAT 等**量化/部署版本热度很高**，说明社区对“可本地跑、可低成本部署”的需求仍在快速上升。  

---

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- [deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro) — 作者：deepseek-ai｜点赞：4,696｜下载：5,515,325  
  - 说明：DeepSeek 的旗舰通用文本模型，点赞和下载双高，是本周最强势的开源 LLM 之一。

- [deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash) — 作者：deepseek-ai｜点赞：1,434｜下载：3,347,429  
  - 说明：更偏高效推理的 Flash 版本，兼顾能力与速度，适合部署侧关注。

- [openbmb/MiniCPM5-1B](https://huggingface.co/openbmb/MiniCPM5-1B) — 作者：openbmb｜点赞：779｜下载：114,329  
  - 说明：小参数高性能路线的代表，适合轻量化本地应用与端侧探索。

- [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it) — 作者：google｜点赞：688｜下载：434,969  
  - 说明：Gemma 4 的指令版统一多模态模型，体现 Google 新一代开放模型的热度。

- [LiquidAI/LFM2.5-8B-A1B](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B) — 作者：LiquidAI｜点赞：540｜下载：118,326  
  - 说明：MoE 风格的轻量大模型，说明“低成本高吞吐”的架构仍受关注。

- [google/gemma-4-12B](https://huggingface.co/google/gemma-4-12B) — 作者：google｜点赞：410｜下载：99,655  
  - 说明：Gemma 4 基座模型，代表 Google 开放权重体系的底座能力。

- [stepfun-ai/Step-3.7-Flash](https://huggingface.co/stepfun-ai/Step-3.7-Flash) — 作者：stepfun-ai｜点赞：348｜下载：43,196  
  - 说明：多模态/对话混合型模型，强调速度与实用性，适合应用端试水。

- [JetBrains/Mellum2-12B-A2.5B-Thinking](https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking) — 作者：JetBrains｜点赞：249｜下载：16,924  
  - 说明：带“Thinking”倾向的推理模型，体现 IDE/开发工具厂商对推理能力的投入。

- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16) — 作者：nvidia｜点赞：156｜下载：49,784  
  - 说明：超大规模 MoE 旗舰文本模型，代表 NVIDIA 在基础模型上的持续推进。

- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4) — 作者：nvidia｜点赞：131｜下载：39,864  
  - 说明：Nemotron 的低精度部署版，反映大模型推理优化正在成为标配。

- [nvidia/Qwen3.6-35B-A3B-NVFP4](https://huggingface.co/nvidia/Qwen3.6-35B-A3B-NVFP4) — 作者：nvidia｜点赞：200｜下载：1,185,362  
  - 说明：Qwen 系列的 NVFP4 部署版本，兼顾模型热度与工程落地价值。

- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16) — 作者：nvidia｜点赞：156｜下载：49,784  
  - 说明：超大规模 MoE 旗舰文本模型，代表 NVIDIA 在基础模型上的持续推进。

- [sapientinc/HRM-Text-1B](https://huggingface.co/sapientinc/HRM-Text-1B) — 作者：sapientinc｜点赞：718｜下载：162,822  
  - 说明：HRM 路线的文本模型，小体量但关注度高，说明新架构仍有探索热度。

> 注：上面保留了榜单中的主流文本/对话/推理模型，偏部署的 NVFP4 版本也归入 LLM 观察。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- [SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base) — 作者：SulphurAI｜点赞：1,586｜下载：1,715,710  
  - 说明：基于 LTX-2.3 的文本到视频底座，点赞和下载都很高，视频生成依旧是热点赛道。

- [nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B) — 作者：nvidia｜点赞：1,524｜下载：115,556  
  - 说明：面向图像定位/grounding 的多模态模型，反映“看图找目标”需求持续升温。

- [ideogram-ai/ideogram-4-fp8](https://huggingface.co/ideogram-ai/ideogram-4-fp8) — 作者：ideogram-ai｜点赞：345｜下载：4,377  
  - 说明：Ideogram 4 的 FP8 版本，代表高质量文生图模型的推理优化趋势。

- [ideogram-ai/ideogram-4-nf4](https://huggingface.co/ideogram-ai/ideogram-4-nf4) — 作者：ideogram-ai｜点赞：235｜下载：3,844  
  - 说明：更轻量的 NF4 版本，适合低显存环境下尝试高质量图像生成。

- [nvidia/Cosmos3-Nano](https://huggingface.co/nvidia/Cosmos3-Nano) — 作者：nvidia｜点赞：194｜下载：29,697  
  - 说明：Cosmos3 系列的轻量版，显示 NVIDIA 正在把生成能力向小型化扩展。

- [ByteDance/Bernini-R](https://huggingface.co/ByteDance/Bernini-R) — 作者：ByteDance｜点赞：167｜下载：246  
  - 说明：图像到视频生成/渲染方向的新模型，下载少但关注度高，偏前沿研究型。

- [nvidia/Cosmos3-Super](https://huggingface.co/nvidia/Cosmos3-Super) — 作者：nvidia｜点赞：153｜下载：24,002  
  - 说明：Cosmos3 的更强版本，聚焦统一生成能力，体现视频/图像生成平台化趋势。

- [nvidia/Cosmos3-Super-Text2Image](https://huggingface.co/nvidia/Cosmos3-Super-Text2Image) — 作者：nvidia｜点赞：123｜下载：5,075  
  - 说明：专注文本到图像生成的 Cosmos3 变体，适合观察统一生成框架拆分能力。

- [nvidia/Cosmos3-Super-Image2Video](https://huggingface.co/nvidia/Cosmos3-Super-Image2Video) — 作者：nvidia｜点赞：114｜下载：4,515  
  - 说明：从图到视频的生成方向，反映视频生成链路正在细分。

---

### 🔧 专用模型（ASR、OCR、TTS、音频、图像修复）
- [nvidia/PiD](https://huggingface.co/nvidia/PiD) — 作者：nvidia｜点赞：317｜下载：1,082  
  - 说明：图像到图像/超分方向的专用模型，偏视觉增强和修复场景。

- [PaddlePaddle/PaddleOCR-VL-1.6](https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.6) — 作者：PaddlePaddle｜点赞：266｜下载：9,084  
  - 说明：OCR + 视觉语言路线的专用模型，适合文档理解与版面识别。

- [nvidia/nemotron-3.5-asr-streaming-0.6b](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b) — 作者：nvidia｜点赞：256｜下载：3,439  
  - 说明：流式 ASR 模型，强调低延迟语音识别，是实时场景的重要方向。

- [bosonai/higgs-audio-v3-tts-4b](https://huggingface.co/bosonai/higgs-audio-v3-tts-4b) — 作者：bosonai｜点赞：193｜下载：7,557  
  - 说明：面向高质量语音合成的 TTS 模型，说明音频生成仍在快速扩张。

- [MisoLabs/MisoTTS](https://huggingface.co/MisoLabs/MisoTTS) — 作者：MisoLabs｜点赞：142｜下载：0  
  - 说明：纯 TTS 路线的新模型，下载尚少但说明社区继续押注语音合成。

- [google/magenta-realtime-2](https://huggingface.co/google/magenta-realtime-2) — 作者：google｜点赞：131｜下载：13,338  
  - 说明：文本到音频模型，体现实时音乐/音频生成方向的持续探索。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）
- [HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive](https://huggingface.co/HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive) — 作者：HauhauCS｜点赞：1,521｜下载：2,923,564  
  - 说明：Qwen3.6 的社区非审查 GGUF 变体，下载极高，说明“可直接本地用”的需求很强。

- [unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF) — 作者：unsloth｜点赞：449｜下载：568,158  
  - 说明：Gemma 4 指令版的 GGUF 量化模型，典型的本地部署友好版本。

- [unsloth/gemma-4-12B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-12B-it-qat-GGUF) — 作者：unsloth｜点赞：120｜下载：85,842  
  - 说明：QAT + GGUF 组合，体现量化后训练/部署一体化的工程路线。

---

## 生态信号
DeepSeek、Gemma、Qwen、Nemotron、MiniCPM 等家族继续领跑，说明开源基础模型仍在“多家并进”。多模态重心正从看图问答扩展到定位、OCR、视频生成和音频生成。榜单几乎都是开放权重，闭源成品很少；GGUF、FP8、NF4、NVFP4、QAT 和 uncensored 微调很活跃，反映出社区对低成本、本地化和可控性的强需求。

---

## 值得探索
1. [deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)  
   - 理由：热度最高的通用模型之一，适合作为本周开源 LLM 能力基准。

2. [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)  
   - 理由：新一代统一多模态/指令模型，适合观察 Google 开放模型的产品化方向。

3. [SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)  
   - 理由：文本到视频赛道的高热模型，最能代表当前生成模型的前沿趋势。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*