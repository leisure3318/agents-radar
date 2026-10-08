# Hugging Face 热门模型日报 2026-10-08

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-10-08 05:03 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-10-08**

## 1. 今日速览

今天 Hugging Face 热榜的核心信号集中在 **语音、嵌入、多模态推理与量化部署**。土耳其语 TTS 模型 **ema-lightning** 以 274 点赞领跑，显示非英语语音合成模型正在获得更多关注。与此同时，**embeddinggemma-2-GGUF** 下载量突破 1.1 万，说明轻量化嵌入模型和本地化部署需求依然强劲。语音识别、文本分类与多模态决策模型也同时上榜，反映出开源模型生态正从“通用大模型”扩展到更具体的生产场景。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### [autotrust/GEV-26B-Decide-NVFP4](https://huggingface.co/autotrust/GEV-26B-Decide-NVFP4)
- **作者**：autotrust  
- **点赞数**：162  
- **下载数**：14,957  
- **一句话说明**：一个面向决策 / 分类任务的 26B 级模型，带有 NVFP4 低精度格式特征，因其较高下载量和疑似 Gemma 系模型生态关联而受到关注。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### [canberkkkkkk/ema-lightning](https://huggingface.co/canberkkkkkk/ema-lightning)
- **作者**：canberkkkkkk  
- **点赞数**：274  
- **下载数**：2,724  
- **一句话说明**：一个面向土耳其语的文本转语音模型，因非英语 TTS 场景稀缺且点赞增长强劲登上趋势榜首。

#### [Cactus-Compute/whistle](https://huggingface.co/Cactus-Compute/whistle)
- **作者**：Cactus-Compute  
- **点赞数**：148  
- **下载数**：2,249  
- **一句话说明**：一个面向设备端部署的自动语音识别模型，主打 speech-to-text 与 on-device 场景，契合本地化语音 AI 趋势。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

#### [unsloth/embeddinggemma-2-GGUF](https://huggingface.co/unsloth/embeddinggemma-2-GGUF)
- **作者**：unsloth  
- **点赞数**：178  
- **下载数**：11,470  
- **一句话说明**：一个 GGUF 格式的 EmbeddingGemma 系嵌入模型，适合检索、RAG、特征提取等场景，因轻量部署和高下载量表现突出。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [unsloth/embeddinggemma-2-GGUF](https://huggingface.co/unsloth/embeddinggemma-2-GGUF)
- **作者**：unsloth  
- **点赞数**：178  
- **下载数**：11,470  
- **一句话说明**：GGUF 格式降低了本地推理和边缘部署门槛，是当前社区量化模型生态活跃度的典型代表。

#### [autotrust/GEV-26B-Decide-NVFP4](https://huggingface.co/autotrust/GEV-26B-Decide-NVFP4)
- **作者**：autotrust  
- **点赞数**：162  
- **下载数**：14,957  
- **一句话说明**：采用 NVFP4 相关低精度格式的 26B 模型，显示大参数模型正在通过更激进的量化方式进入可部署阶段。

---

## 3. 生态信号

今日榜单显示，**Gemma / EmbeddingGemma 相关生态**仍具备明显热度，尤其在嵌入、分类和多模态决策任务中持续扩散。开源权重模型相比闭源 API 的优势正在从“可用”转向“可部署”：GGUF、NVFP4 等格式让模型更容易进入本地、边缘和低成本推理环境。语音方向也值得关注，TTS 与 ASR 同时上榜，说明语音 AI 正在从英语主导走向多语言、设备端与垂直场景落地。社区微调与量化活动依然是 Hugging Face 热榜的重要驱动力。

---

## 4. 值得探索

1. **[canberkkkkkk/ema-lightning](https://huggingface.co/canberkkkkkk/ema-lightning)**  
   土耳其语 TTS 模型热度最高，适合关注多语言语音合成、区域语言模型和低资源语言 TTS 的开发者研究。

2. **[unsloth/embeddinggemma-2-GGUF](https://huggingface.co/unsloth/embeddinggemma-2-GGUF)**  
   下载量高，且采用 GGUF 格式，适合用于本地 RAG、语义检索、向量数据库评测和轻量级嵌入部署。

3. **[Cactus-Compute/whistle](https://huggingface.co/Cactus-Compute/whistle)**  
   主打 on-device 自动语音识别，适合探索离线语音转写、隐私友好型语音应用和边缘端 AI 方案。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*