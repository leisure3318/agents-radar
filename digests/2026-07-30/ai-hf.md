# Hugging Face 热门模型日报 2026-07-30

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-07-30 00:58 UTC

---

# Hugging Face 热门模型日报（2026-07-30）

## 1) 今日速览
今天榜单的核心看点是：**大模型量化部署**继续升温，250B 级别的模型也开始以 NVFP4 形式进入可落地阶段。  
**微软系新模型**表现突出，既覆盖了语音识别，也覆盖了多模态理解，说明基础模型能力正在向更多模态扩展。  
与此同时，**社区微调 + GGUF** 仍然是下载量最高的热门方向，说明“可本地跑、可离线部署”依然是 Hugging Face 上最强需求之一。  
整体来看，榜单呈现出“**大参数 + 低精度 + 易部署**”与“**多模态能力增强**”并行推进的趋势。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### 1. [nota-ai/Solar-Open2-250B-Nota-NVFP4](https://huggingface.co/nota-ai/Solar-Open2-250B-Nota-NVFP4)
- 作者：nota-ai
- 点赞：138
- 下载：6,189
- 一句话说明：这是 **Solar Open2 250B** 的 **NVFP4 量化版本**，属于超大参数语言模型的高压缩部署形态，之所以受关注，主要是因为它展示了“超大模型也能更高效落地”的新方向。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### 2. [microsoft/Mage-VL](https://huggingface.co/microsoft/Mage-VL)
- 作者：microsoft
- 点赞：97
- 下载：702
- 一句话说明：这是一个 **图文多模态模型**（image-text-to-text），用于理解图片并生成文本回答，榜上热门主要因为多模态能力持续升温，且微软新模型自带较强关注度。

#### 3. [DavidAU/Qwen3.5-9B-The-Defiant-Fable-Uncensored-Heretic-NEO-IMATRIX-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.5-9B-The-Defiant-Fable-Uncensored-Heretic-NEO-IMATRIX-MAX-MTP-GGUF)
- 作者：DavidAU
- 点赞：132
- 下载：112,086
- 一句话说明：这是 **Qwen3.5-9B 的社区衍生多模态/文本推理版本**，并以 **GGUF** 形式广泛传播；超高下载量说明它非常适合本地推理和边缘部署，是“可用性优先”的热门代表。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

#### 4. [microsoft/VibeVoice-ASR-BitNet](https://huggingface.co/microsoft/VibeVoice-ASR-BitNet)
- 作者：microsoft
- 点赞：100
- 下载：1,754
- 一句话说明：这是一个 **自动语音识别（ASR）** 模型，采用 BitNet / GGUF 等轻量化路线，热门原因在于语音模型正在向更低成本、更易部署的方向演进。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### 5. [DavidAU/Qwen3.5-9B-The-Defiant-Fable-Uncensored-Heretic-NEO-IMATRIX-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.5-9B-The-Defiant-Fable-Uncensored-Heretic-NEO-IMATRIX-MAX-MTP-GGUF)
- 作者：DavidAU
- 点赞：132
- 下载：112,086
- 一句话说明：这是典型的 **社区微调 + GGUF 分发** 模型，下载量远高于其他模型，说明量化版本、可本地运行和社区定制能力，仍是 Hugging Face 上最强的增长引擎。

#### 6. [nota-ai/Solar-Open2-250B-Nota-NVFP4](https://huggingface.co/nota-ai/Solar-Open2-250B-Nota-NVFP4)
- 作者：nota-ai
- 点赞：138
- 下载：6,189
- 一句话说明：作为 **NVFP4 量化模型**，它体现了大模型压缩与部署优化的热点，适合关注高效推理与生产落地的团队。

---

## 3) 生态信号
本期最强势的模型家族包括 **Qwen / Solar / VibeVoice / Mage-VL** 这几条线：Qwen 代表社区微调与本地部署生态，Solar 代表超大模型的高效量化路线，VibeVoice 和 Mage-VL 则体现微软在语音与多模态上的持续投入。  
从开放性看，榜单几乎清一色是**开源权重或开放可下载版本**，并且大量采用 **GGUF、NVFP4、BitNet** 等低精度格式，说明“开源 + 轻量化 + 可离线部署”仍是主流偏好。  
值得注意的是，**量化版下载量明显高于原始模型关注度**，社区对可运行性、显存门槛和端侧部署的需求，已经超过单纯参数规模竞赛。

---

## 4) 值得探索

1. **[DavidAU/Qwen3.5-9B-The-Defiant-Fable-Uncensored-Heretic-NEO-IMATRIX-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.5-9B-The-Defiant-Fable-Uncensored-Heretic-NEO-IMATRIX-MAX-MTP-GGUF)**  
   理由：下载量极高，最能代表当前“本地可跑”的热门需求，适合研究社区微调与 GGUF 分发生态。

2. **[nota-ai/Solar-Open2-250B-Nota-NVFP4](https://huggingface.co/nota-ai/Solar-Open2-250B-Nota-NVFP4)**  
   理由：250B 级别模型的 NVFP4 量化很有代表性，适合关注大模型推理效率和压缩部署方案。

3. **[microsoft/Mage-VL](https://huggingface.co/microsoft/Mage-VL)**  
   理由：多模态模型仍在快速增长，适合观察图文理解能力、模型架构和评测方向的最新变化。

如果你愿意，我可以把这份日报进一步整理成 **更像媒体稿的版本**，或者输出成 **表格版 / 公众号版 / 内部简报版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*