# Hugging Face 热门模型日报 2026-06-07

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-06-07 00:20 UTC

---

# Hugging Face 热门模型日报（2026-06-07）

## 1) 今日速览
DeepSeek-V4-Pro 与 DeepSeek-V4-Flash 继续领跑文本生成赛道，说明高能力通用对话/推理仍是生态中心。与此同时，Gemma 4、Qwen3.6、MiniCPM5、LocateAnything 等多模态与轻量化模型密集上榜，开放权重生态持续扩张。视频生成与数字人相关模型明显升温，Sulphur-2-base、Cosmos3 系列、LongCat-Video-Avatar 反映出“可用视频生成”正在从演示走向产品化。量化与部署友好版本也非常活跃，GGUF、NVFP4、FP8、NF4 等低精度权重的下载表现突出。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- **[deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)** ｜ 作者：deepseek-ai ｜ 点赞：4,681 ｜ 下载：5,510,611 ｜ 一句话：旗舰通用对话/推理模型，点赞和下载双高，继续巩固 DeepSeek 在开源 LLM 中的顶流地位。
- **[deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)** ｜ 作者：deepseek-ai ｜ 点赞：1,421 ｜ 下载：3,436,213 ｜ 一句话：偏高吞吐、低延迟的版本，热度说明“更快更省”的在线服务形态仍很吃香。
- **[openbmb/MiniCPM5-1B](https://huggingface.co/openbmb/MiniCPM5-1B)** ｜ 作者：openbmb ｜ 点赞：774 ｜ 下载：100,575 ｜ 一句话：1B 级小模型热度不低，体现端侧部署和轻量推理需求持续增长。
- **[sapientinc/HRM-Text-1B](https://huggingface.co/sapientinc/HRM-Text-1B)** ｜ 作者：sapientinc ｜ 点赞：711 ｜ 下载：161,627 ｜ 一句话：小参数文本生成模型，关注点在高效推理与新架构探索。
- **[LiquidAI/LFM2.5-8B-A1B](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B)** ｜ 作者：LiquidAI ｜ 点赞：532 ｜ 下载：95,440 ｜ 一句话：MoE/效率导向的 8B 级模型，适合低成本实验与部署研究。
- **[JetBrains/Mellum2-12B-A2.5B-Thinking](https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking)** ｜ 作者：JetBrains ｜ 点赞：239 ｜ 下载：16,395 ｜ 一句话：Thinking 取向的模型，体现可解释推理与工具型大模型继续升温。
- **[nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16)** ｜ 作者：nvidia ｜ 点赞：143 ｜ 下载：47,285 ｜ 一句话：超大参数旗舰，代表基础模型军备竞赛仍在持续。

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- **[SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)** ｜ 作者：SulphurAI ｜ 点赞：1,580 ｜ 下载：1,704,964 ｜ 一句话：文本到视频底座热度极高，说明视频生成已从实验走向可用素材生产。
- **[nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B)** ｜ 作者：nvidia ｜ 点赞：1,451 ｜ 下载：111,078 ｜ 一句话：视觉 grounding/定位模型，把“看图找物”做成可用能力，是本周视觉交互热点。
- **[google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)** ｜ 作者：google ｜ 点赞：615 ｜ 下载：315,131 ｜ 一句话：Gemma 4 指令版延续 any-to-any 路线，说明统一多模态接口需求强烈。
- **[meituan-longcat/LongCat-Video-Avatar-1.5](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5)** ｜ 作者：meituan-longcat ｜ 点赞：525 ｜ 下载：1,806 ｜ 一句话：音频/文本驱动数字人模型，反映视频 avatar 场景正在加速落地。
- **[google/gemma-4-12B](https://huggingface.co/google/gemma-4-12B)** ｜ 作者：google ｜ 点赞：376 ｜ 下载：84,549 ｜ 一句话：Gemma 4 基座版更适合作为二次微调底座，开发者关注度高。
- **[stepfun-ai/Step-3.7-Flash](https://huggingface.co/stepfun-ai/Step-3.7-Flash)** ｜ 作者：stepfun-ai ｜ 点赞：342 ｜ 下载：38,716 ｜ 一句话：强调速度的视觉语言模型，适合实时交互与轻量推理。
- **[nvidia/PiD](https://huggingface.co/nvidia/PiD)** ｜ 作者：nvidia ｜ 点赞：312 ｜ 下载：972 ｜ 一句话：图像增强/超分方向的实用模型，工程落地价值明确。
- **[nvidia/Cosmos3-Nano](https://huggingface.co/nvidia/Cosmos3-Nano)** ｜ 作者：nvidia ｜ 点赞：183 ｜ 下载：24,820 ｜ 一句话：轻量版 Cosmos3，代表统一视频/世界模型向小型化推进。
- **[ByteDance/Bernini-R](https://huggingface.co/ByteDance/Bernini-R)** ｜ 作者：ByteDance ｜ 点赞：149 ｜ 下载：223 ｜ 一句话：新的视频渲染模型，属于“研究热度高、实际下载还在爬升”的新条目。
- **[nvidia/Cosmos3-Super](https://huggingface.co/nvidia/Cosmos3-Super)** ｜ 作者：nvidia ｜ 点赞：148 ｜ 下载：20,403 ｜ 一句话：更强的 Cosmos3 通用生成底座，体现大厂继续押注统一生成框架。
- **[nvidia/Cosmos3-Super-Text2Image](https://huggingface.co/nvidia/Cosmos3-Super-Text2Image)** ｜ 作者：nvidia ｜ 点赞：119 ｜ 下载：1,634 ｜ 一句话：把 Cosmos3 能力落到文本到图像，说明该系列正向多任务展开。
- **[nvidia/Cosmos3-Super-Image2Video](https://huggingface.co/nvidia/Cosmos3-Super-Image2Video)** ｜ 作者：nvidia ｜ 点赞：111 ｜ 下载：1,295 ｜ 一句话：图生视频能力是视频生成产品化的重要路径，关注度持续上升。

### 🔧 专用模型（代码、数学、医疗、嵌入）
> 本期未见典型代码/医疗/嵌入主流模型，专用能力主要集中在 OCR、ASR、TTS 与音频生成。

- **[PaddlePaddle/PaddleOCR-VL-1.6](https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.6)** ｜ 作者：PaddlePaddle ｜ 点赞：258 ｜ 下载：8,365 ｜ 一句话：文档 OCR + 视觉语言模型，说明企业级文档理解仍是高频刚需。
- **[nvidia/nemotron-3.5-asr-streaming-0.6b](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b)** ｜ 作者：nvidia ｜ 点赞：219 ｜ 下载：1,380 ｜ 一句话：流式 ASR 模型，强调低延迟与在线转写能力。
- **[bosonai/higgs-audio-v3-tts-4b](https://huggingface.co/bosonai/higgs-audio-v3-tts-4b)** ｜ 作者：bosonai ｜ 点赞：153 ｜ 下载：2,184 ｜ 一句话：TTS 模型，聚焦高保真语音合成与多模态音频能力。
- **[MisoLabs/MisoTTS](https://huggingface.co/MisoLabs/MisoTTS)** ｜ 作者：MisoLabs ｜ 点赞：130 ｜ 下载：0 ｜ 一句话：新 TTS 选手，说明语音合成赛道仍在持续扩张。
- **[google/magenta-realtime-2](https://huggingface.co/google/magenta-realtime-2)** ｜ 作者：google ｜ 点赞：108 ｜ 下载：9,394 ｜ 一句话：实时文本到音频，反映生成式音乐/音频正在向交互式场景延伸。

### 📦 微调与量化（社区微调、GGUF、AWQ）
- **[HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive](https://huggingface.co/HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive)** ｜ 作者：HauhauCS ｜ 点赞：1,487 ｜ 下载：2,771,843 ｜ 一句话：Qwen3.6 的社区激进/uncensored 版本，下载和点赞都高，说明特定对齐风格仍有市场。
- **[unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF)** ｜ 作者：unsloth ｜ 点赞：421 ｜ 下载：458,174 ｜ 一句话：Gemma 4 指令版的 GGUF 量化，下载极高，明显是本期最典型的本地部署热门。
- **[ideogram-ai/ideogram-4-fp8](https://huggingface.co/ideogram-ai/ideogram-4-fp8)** ｜ 作者：ideogram-ai ｜ 点赞：306 ｜ 下载：2,818 ｜ 一句话：FP8 版本把高质量图像生成推向更低成本推理。
- **[ideogram-ai/ideogram-4-nf4](https://huggingface.co/ideogram-ai/ideogram-4-nf4)** ｜ 作者：ideogram-ai ｜ 点赞：212 ｜ 下载：2,671 ｜ 一句话：更激进的 NF4 量化版本，明显面向显存受限与本地部署用户。
- **[nvidia/Qwen3.6-35B-A3B-NVFP4](https://huggingface.co/nvidia/Qwen3.6-35B-A3B-NVFP4)** ｜ 作者：nvidia ｜ 点赞：197 ｜ 下载：1,015,381 ｜ 一句话：Qwen3.6 的 NVFP4 优化版，凸显厂商级低精度推理路线成熟。
- **[nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4)** ｜ 作者：nvidia ｜ 点赞：117 ｜ 下载：17,225 ｜ 一句话：超大模型也在向低精度部署迁移，体现工程化优先趋势。

---

## 3) 生态信号
本期势头最强的是 DeepSeek、Gemma 4、Qwen3.6/Nemotron、Cosmos3 与 Sulphur/LongCat 等家族，覆盖通用 LLM、多模态和视频生成。榜单几乎清一色是开放权重，说明 Hugging Face 热门仍以可下载、可复现为主；GGUF、NVFP4、FP8、NF4 等量化版本热度很高，反映本地部署与低成本推理需求持续上升。

---

## 4) 值得探索
1. **[deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)**  
   适合作为本周 LLM 参考基线：热度最高、关注度最集中，适合看通用推理与对话能力的上限。

2. **[google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)**  
   代表“any-to-any”多模态统一接口的主流方向，适合研究多模态指令跟随与应用集成。

3. **[SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)**  
   本期最值得关注的视频生成底座之一，适合观察视频生成从研究到产品化的迁移路径。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*