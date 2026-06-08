# Hugging Face 热门模型日报 2026-06-08

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-06-08 04:13 UTC

---

# Hugging Face 热门模型日报（2026-06-08）

## 1) 今日速览
本周榜单继续由 **DeepSeek、Gemma/Qwen、NVIDIA** 三大阵营领跑，说明高性能通用模型仍是社区关注核心。与此同时，**多模态、视频生成、OCR/ASR/TTS** 等专用能力明显升温，模型生态正从“纯文本”加速走向“全模态”。  
另一个强信号是：**GGUF、NVFP4、FP8、NF4、QAT** 等低比特版本大量上榜，表明“能跑起来、跑得便宜”正成为与“能打”同等重要的竞争维度。开源权重依然是 Hugging Face 热榜主流，且社区微调版本活跃度很高。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- [DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)  
  作者：deepseek-ai｜点赞：4,700｜下载：5,515,325  
  说明：旗舰级通用文本模型，点赞和下载双高，代表本周最强“通用大模型”关注度。

- [DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)  
  作者：deepseek-ai｜点赞：1,435｜下载：3,347,429  
  说明：更偏效率/速度的版本，说明社区不仅关注极限能力，也重视性价比与部署体验。

- [openbmb/MiniCPM5-1B](https://huggingface.co/openbmb/MiniCPM5-1B)  
  作者：openbmb｜点赞：779｜下载：114,329  
  说明：小参数高可用的本地化 LLM，体现“轻量但实用”的端侧/私有部署趋势。

- [LiquidAI/LFM2.5-8B-A1B](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B)  
  作者：LiquidAI｜点赞：541｜下载：118,326  
  说明：偏高效推理的混合专家风格模型，适合关注成本与吞吐平衡的用户。

- [sapientinc/HRM-Text-1B](https://huggingface.co/sapientinc/HRM-Text-1B)  
  作者：sapientinc｜点赞：719｜下载：162,822  
  说明：新架构/新范式驱动的文本模型，热度反映出社区对“非传统 LLM 设计”的兴趣。

- [JetBrains/Mellum2-12B-A2.5B-Thinking](https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking)  
  作者：JetBrains｜点赞：252｜下载：16,924  
  说明：面向“thinking”风格推理的模型，适合开发者/助手型场景，显示工具型 AI 需求持续存在。

- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16)  
  作者：nvidia｜点赞：157｜下载：49,784  
  说明：超大规模通用模型，代表 NVIDIA 在基础模型层持续加码，面向企业级推理与研究。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- [nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B)  
  作者：nvidia｜点赞：1,535｜下载：115,556  
  说明：视觉定位/grounding 类模型，适合“找图中目标、理解图像位置关系”等任务，属于实用型多模态热点。

- [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)  
  作者：google｜点赞：700｜下载：434,969  
  说明：Gemma 4 指令版统一多模态模型，代表 Google 在 any-to-any 路线上的重点投入。

- [google/gemma-4-12B](https://huggingface.co/google/gemma-4-12B)  
  作者：google｜点赞：415｜下载：99,655  
  说明：Gemma 4 基座版，适合二次微调与研究，体现开放模型底座的生态价值。

- [stepfun-ai/Step-3.7-Flash](https://huggingface.co/stepfun-ai/Step-3.7-Flash)  
  作者：stepfun-ai｜点赞：349｜下载：43,196  
  说明：视觉语言方向的高效率模型，热度说明“快而强”的多模态助手正在受追捧。

- [nvidia/Cosmos3-Nano](https://huggingface.co/nvidia/Cosmos3-Nano)  
  作者：nvidia｜点赞：197｜下载：29,697  
  说明：Cosmos 3 系列轻量版本，适合探索统一生成/理解框架的入门款。

- [ByteDance/Bernini-R](https://huggingface.co/ByteDance/Bernini-R)  
  作者：ByteDance｜点赞：170｜下载：246  
  说明：图像到视频渲染模型，下载量虽小但代表新一代视频生成研究方向。

- [nvidia/Cosmos3-Super](https://huggingface.co/nvidia/Cosmos3-Super)  
  作者：nvidia｜点赞：153｜下载：24,002  
  说明：Cosmos 3 的高配版本，显示 NVIDIA 在视频/多模态生成上做完整产品线布局。

- [nvidia/Cosmos3-Super-Text2Image](https://huggingface.co/nvidia/Cosmos3-Super-Text2Image)  
  作者：nvidia｜点赞：124｜下载：5,075  
  说明：文生图专用分支，适合看 Cosmos 家族在内容生成上的落地能力。

- [nvidia/Cosmos3-Super-Image2Video](https://huggingface.co/nvidia/Cosmos3-Super-Image2Video)  
  作者：nvidia｜点赞：115｜下载：4,515  
  说明：图生视频方向，反映视频生成链路正从“从零生成”扩展到“条件驱动生成”。

- [SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)  
  作者：SulphurAI｜点赞：1,588｜下载：1,715,710  
  说明：文本到视频基础模型，超高点赞和下载说明视频生成是本周最强增长点之一。

---

### 🔧 专用模型（代码、数学、医疗、嵌入、ASR/OCR 等）
- [nvidia/nemotron-3.5-asr-streaming-0.6b](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b)  
  作者：nvidia｜点赞：262｜下载：3,439  
  说明：流式语音识别模型，强调低延迟和实时转写，适合语音助手/会议纪要。

- [PaddlePaddle/PaddleOCR-VL-1.6](https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.6)  
  作者：PaddlePaddle｜点赞：269｜下载：9,084  
  说明：OCR+视觉语言模型，面向文档理解与版面识别，是中文生态里的高实用专用模型。

- [bosonai/higgs-audio-v3-tts-4b](https://huggingface.co/bosonai/higgs-audio-v3-tts-4b)  
  作者：bosonai｜点赞：200｜下载：7,557  
  说明：TTS/语音合成模型，说明语音生成仍是 AIGC 重要赛道。

- [MisoLabs/MisoTTS](https://huggingface.co/MisoLabs/MisoTTS)  
  作者：MisoLabs｜点赞：144｜下载：0  
  说明：轻量 TTS 研究模型，适合做语音合成基线或本地实验。

- [google/magenta-realtime-2](https://huggingface.co/google/magenta-realtime-2)  
  作者：google｜点赞：134｜下载：13,338  
  说明：文本到音频/实时生成方向，体现音乐与音频生成的持续热度。

---

### 📦 微调与量化（社区微调、GGUF、FP8/NF4/NVFP4）
- [ideogram-ai/ideogram-4-fp8](https://huggingface.co/ideogram-ai/ideogram-4-fp8)  
  作者：ideogram-ai｜点赞：356｜下载：4,377  
  说明：文生图模型的 FP8 版本，说明高质量生成模型正在快速向低精度部署迁移。

- [ideogram-ai/ideogram-4-nf4](https://huggingface.co/ideogram-ai/ideogram-4-nf4)  
  作者：ideogram-ai｜点赞：238｜下载：3,844  
  说明：NF4 量化版本，继续强化“可部署、可本地运行”的图像生成路径。

- [HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive](https://huggingface.co/HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive)  
  作者：HauhauCS｜点赞：1,523｜下载：2,923,564  
  说明：基于 Qwen 的社区微调/解限版本，超高下载表明本地可用、可定制仍是强需求。

- [unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF)  
  作者：unsloth｜点赞：459｜下载：568,158  
  说明：Gemma 4 指令版 GGUF，典型“高性能模型 + 轻量部署”组合。

- [unsloth/gemma-4-12B-it-qat-GGUF](https://huggingface.co/unsloth/gemma-4-12B-it-qat-GGUF)  
  作者：unsloth｜点赞：125｜下载：85,842  
  说明：QAT 量化版本，关注点在于尽量保留质量同时降低推理成本。

- [nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4)  
  作者：nvidia｜点赞：133｜下载：39,864  
  说明：NVFP4 低精度版本，面向大模型高吞吐部署。

- [nvidia/Qwen3.6-35B-A3B-NVFP4](https://huggingface.co/nvidia/Qwen3.6-35B-A3B-NVFP4)  
  作者：nvidia｜点赞：201｜下载：1,185,362  
  说明：Qwen 3.6 的 NVFP4 版本，下载量很高，显示量化部署市场极大。

- [unsloth/Qwen3.6-27B-MTP-GGUF](https://huggingface.co/unsloth/Qwen3.6-27B-MTP-GGUF)  
  作者：unsloth｜点赞：687｜下载：1,150,295  
  说明：Qwen 系社区量化版本，极高下载说明“本地跑大模型”仍是强刚需。

---

## 3) 生态信号
本周势头最强的家族是 **DeepSeek、Qwen、Gemma、Nemotron、Cosmos**：前四者主导通用文本与多模态底座，Cosmos 则把战线扩展到视频与统一生成。开源权重明显占优，HF 热榜主要是可下载、可微调、可本地部署的模型，而非纯闭源 API。量化与社区微调非常活跃，GGUF/NVFP4/FP8/NF4/QAT 说明“把大模型落到设备上”已成为核心竞争力。

---

## 4) 值得探索
- [deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)  
  理由：本周最强通用 LLM 热点，适合作为性能与能力的基准模型。

- [google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)  
  理由：统一多模态指令模型，适合研究 any-to-any 架构与跨模态对齐。

- [unsloth/Qwen3.6-27B-MTP-GGUF](https://huggingface.co/unsloth/Qwen3.6-27B-MTP-GGUF)  
  理由：代表“高质量 + 低成本 + 本地部署”的现实路线，最贴近落地场景。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*