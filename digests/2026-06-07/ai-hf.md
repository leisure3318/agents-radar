# Hugging Face 热门模型日报 2026-06-07

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-06-06 22:58 UTC

---

# Hugging Face 热门模型日报（2026-06-07）

## 1) 今日速览
今天的热门榜单明显由**多模态、视频生成和部署友好型量化版本**主导，文本到图像、文本到视频、音频生成模型的存在感继续上升。  
**DeepSeek、Gemma 4、Qwen3.6、Cosmos3、Nemotron** 等家族持续刷榜，说明头部实验室的旗舰模型仍是生态中心。  
与此同时，**GGUF、NVFP4、FP8、NF4、uncensored** 等社区派生版本下载量很高，表明“可本地部署、可快速试用”正在强烈拉动传播。  
专用方向上，**OCR、ASR、TTS、视觉定位、视频 avatar** 也开始稳定进入热门区，生态正在从纯 LLM 扩展到全模态应用。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- **[deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)**｜作者：deepseek-ai｜点赞：4,679｜下载：5,510,611  
  - 深度求索的新一代旗舰对话/生成模型，属于高关注度“主力底座”，因能力与热度双高持续领跑。

- **[deepseek-ai/DeepSeek-V4-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash)**｜作者：deepseek-ai｜点赞：1,421｜下载：3,436,213  
  - V4 系列的快速版，更强调低延迟与易用性，适合在线对话与应用集成，因此下载表现非常强。

- **[sapientinc/HRM-Text-1B](https://huggingface.co/sapientinc/HRM-Text-1B)**｜作者：sapientinc｜点赞：711｜下载：161,627  
  - 1B 级文本生成模型，偏研究型高效推理路线，因小而强、容易试验而受到关注。

- **[LiquidAI/LFM2.5-8B-A1B](https://huggingface.co/LiquidAI/LFM2.5-8B-A1B)**｜作者：LiquidAI｜点赞：531｜下载：95,440  
  - 面向轻量化与 MoE/高效推理的语言模型，热度来自“更省算力”的工程价值。

- **[JetBrains/Mellum2-12B-A2.5B-Thinking](https://huggingface.co/JetBrains/Mellum2-12B-A2.5B-Thinking)**｜作者：JetBrains｜点赞：239｜下载：16,395  
  - 带“Thinking”特征的对话/推理模型，因思维链与代码/助手潜力而获得关注。

- **[openbmb/MiniCPM5-1B](https://huggingface.co/openbmb/MiniCPM5-1B)**｜作者：openbmb｜点赞：774｜下载：100,575  
  - 小参数对话模型代表，强调轻量部署和高可用性，是本地端与边缘侧的热门选择。

- **[nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16)**｜作者：nvidia｜点赞：142｜下载：47,285  
  - 超大规模 MoE 语言模型旗舰，体现 NVIDIA 在通用大模型上的持续投入与品牌影响力。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- **[google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)**｜作者：google｜点赞：613｜下载：315,131  
  - Gemma 4 的指令微调统一多模态版本，支持 any-to-any 方向，因官方新版本与通用能力而走热。

- **[google/gemma-4-12B](https://huggingface.co/google/gemma-4-12B)**｜作者：google｜点赞：374｜下载：84,549  
  - Gemma 4 基座版，代表 Google 在统一多模态底座上的新一轮布局，适合研究和二次开发。

- **[stepfun-ai/Step-3.7-Flash](https://huggingface.co/stepfun-ai/Step-3.7-Flash)**｜作者：stepfun-ai｜点赞：342｜下载：38,716  
  - 视觉语言/多模态快速版模型，强调高吞吐和交互体验，适合 agent 和多模态应用场景。

- **[nvidia/Cosmos3-Nano](https://huggingface.co/nvidia/Cosmos3-Nano)**｜作者：nvidia｜点赞：182｜下载：24,820  
  - Cosmos3 系列的小型多模态/生成底座，代表 NVIDIA 在统一生成框架上的轻量化探索。

- **[nvidia/Cosmos3-Super](https://huggingface.co/nvidia/Cosmos3-Super)**｜作者：nvidia｜点赞：147｜下载：20,403  
  - Cosmos3 的更强版本，延续多模态生成路线，热度来自“系列化发布”与生态覆盖。

- **[nvidia/Cosmos3-Super-Text2Image](https://huggingface.co/nvidia/Cosmos3-Super-Text2Image)**｜作者：nvidia｜点赞：119｜下载：1,634  
  - Cosmos3 面向文本到图像的专用分支，说明 NVIDIA 正在把统一底座拆成任务化产品。

- **[nvidia/Cosmos3-Super-Image2Video](https://huggingface.co/nvidia/Cosmos3-Super-Image2Video)**｜作者：nvidia｜点赞：109｜下载：1,295  
  - 图生视频版本，代表视频生成里“由图到动”的实用路径，适合动画化与内容生产。

- **[ByteDance/Bernini-R](https://huggingface.co/ByteDance/Bernini-R)**｜作者：ByteDance｜点赞：149｜下载：223  
  - 面向图文到视频的渲染/生成模型，字节入局视频生成赛道，带来较强行业关注。

- **[SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)**｜作者：SulphurAI｜点赞：1,579｜下载：1,704,964  
  - 基于 LTX-2.3 的文本到视频基础模型，社区传播极强，说明“可用的视频生成底座”极受欢迎。

- **[meituan-longcat/LongCat-Video-Avatar-1.5](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.5)**｜作者：meituan-longcat｜点赞：525｜下载：1,806  
  - 音频/文本驱动的视频 avatar 模型，属于视频数字人方向，反映出“虚拟人”应用需求升温。

- **[bosonai/higgs-audio-v3-tts-4b](https://huggingface.co/bosonai/higgs-audio-v3-tts-4b)**｜作者：bosonai｜点赞：151｜下载：2,184  
  - 4B 级语音合成模型，音频生成持续升温，说明 TTS 正从工具向生产力组件演进。

- **[MisoLabs/MisoTTS](https://huggingface.co/MisoLabs/MisoTTS)**｜作者：MisoLabs｜点赞：129｜下载：0  
  - 新发布的 TTS/语音合成模型，虽然下载还未放量，但已进入关注列表，属于早期观察对象。

- **[google/magenta-realtime-2](https://huggingface.co/google/magenta-realtime-2)**｜作者：google｜点赞：108｜下载：9,394  
  - 面向实时文本到音频的模型，体现音乐/音频生成正在向低延迟交互化发展。

- **[ideogram-ai/ideogram-4-fp8](https://huggingface.co/ideogram-ai/ideogram-4-fp8)**｜作者：ideogram-ai｜点赞：303｜下载：2,818  
  - Ideogram 4 的 FP8 版本，图像生成模型的量化发布，主打更低成本推理。

- **[ideogram-ai/ideogram-4-nf4](https://huggingface.co/ideogram-ai/ideogram-4-nf4)**｜作者：ideogram-ai｜点赞：210｜下载：2,671  
  - Ideogram 4 的 NF4 量化版本，强调更小显存占用，适合本地和低成本部署。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）
- **[nvidia/LocateAnything-3B](https://huggingface.co/nvidia/LocateAnything-3B)**｜作者：nvidia｜点赞：1,449｜下载：111,078  
  - 面向“定位/指代”的图文模型，更偏视觉 grounding 工具型能力，上榜原因是实用性强、场景明确。

- **[nvidia/nemotron-3.5-asr-streaming-0.6b](https://huggingface.co/nvidia/nemotron-3.5-asr-streaming-0.6b)**｜作者：nvidia｜点赞：217｜下载：1,380  
  - 流式语音识别模型，强调低延迟 ASR 能力，适合实时转写和会议场景。

- **[PaddlePaddle/PaddleOCR-VL-1.6](https://huggingface.co/PaddlePaddle/PaddleOCR-VL-1.6)**｜作者：PaddlePaddle｜点赞：257｜下载：8,365  
  - 面向 OCR 的视觉语言模型，文档理解和信息抽取需求强，属于实用型热门。

- **[nvidia/PiD](https://huggingface.co/nvidia/PiD)**｜作者：nvidia｜点赞：312｜下载：972  
  - 图像到图像模型，偏超分/修复类应用，代表“图像增强”这一类稳健需求。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）
- **[unsloth/gemma-4-12b-it-GGUF](https://huggingface.co/unsloth/gemma-4-12b-it-GGUF)**｜作者：unsloth｜点赞：420｜下载：458,174  
  - Gemma 4 指令模型的 GGUF 量化版，下载量高说明本地部署和轻量推理仍是强需求。

- **[HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive](https://huggingface.co/HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive)**｜作者：HauhauCS｜点赞：1,486｜下载：2,771,843  
  - Qwen3.6 的社区 uncensored 派生版，超高下载体现了“可自由使用 + 易落地”的传播优势。

- **[nvidia/Qwen3.6-35B-A3B-NVFP4](https://huggingface.co/nvidia/Qwen3.6-35B-A3B-NVFP4)**｜作者：nvidia｜点赞：196｜下载：1,015,381  
  - Qwen3.6 的 NVFP4 量化版，面向高效部署，体现厂商在推理优化上的重投入。

- **[nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-3-Ultra-550B-A55B-NVFP4)**｜作者：nvidia｜点赞：117｜下载：17,225  
  - 超大模型的 NVFP4 版本，说明即便是 550B 级模型，也在向可部署形态收敛。

- **[ideogram-ai/ideogram-4-fp8](https://huggingface.co/ideogram-ai/ideogram-4-fp8)**｜作者：ideogram-ai｜点赞：303｜下载：2,818  
  - FP8 量化让图像生成更易部署，是“生成模型工程化”的典型案例。

- **[ideogram-ai/ideogram-4-nf4](https://huggingface.co/ideogram-ai/ideogram-4-nf4)**｜作者：ideogram-ai｜点赞：210｜下载：2,671  
  - NF4 版本进一步降低显存门槛，适合本地试用和边缘推理。

---

## 3) 生态信号
本期势头最强的是 **DeepSeek、Gemma 4、Cosmos3、Qwen3.6、Nemotron** 这些家族；厂商级旗舰和其派生版本正在形成“家族化刷榜”。开源权重仍然是主流，但严格意义上的“纯闭源 API”并不占榜，说明 Hugging Face 生态更偏向**开放权重 + 社区复现**。最值得注意的是量化与微调活动：**GGUF、NVFP4、FP8、NF4、uncensored** 版本下载量显著高于很多原版模型，证明“能不能直接跑”已经和“强不强”一样重要。

---

## 4) 值得探索
1. **[deepseek-ai/DeepSeek-V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)**  
   - 头部旗舰，适合作为当前通用大模型能力的参考基线。

2. **[google/gemma-4-12B-it](https://huggingface.co/google/gemma-4-12B-it)**  
   - 统一多模态方向的代表，适合研究 any-to-any 与多任务整合。

3. **[SulphurAI/Sulphur-2-base](https://huggingface.co/SulphurAI/Sulphur-2-base)**  
   - 视频生成热度最高的模型之一，适合重点研究文本到视频的实际可用性。  

如果你愿意，我也可以把这份日报进一步整理成：
- **适合公众号发布的精简版**
- **适合投研/内部周报的分析版**
- **按“下载数 / 点赞数 / 点赞下载比”做量化排行版**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*