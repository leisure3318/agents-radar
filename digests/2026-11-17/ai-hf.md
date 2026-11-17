# Hugging Face 热门模型日报 2026-11-17

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 2 个模型 | 生成时间: 2026-11-17 05:13 UTC

---

# Hugging Face 热门模型日报
**2026-11-17｜基于所提供的 2 个热门模型，按周点赞数排序**

## 今日速览
今日样本的关注点集中在视频生成与语音合成，没有语言模型进入这份榜单。**IFM/PAN2** 以 205 次点赞领先，`world-model` 与 `world-simulation` 标签使世界建模方向成为值得关注的研究信号。**n4ze3m/tiny-voca** 获得 196 次点赞、860 次下载，并带有 ONNX、GGUF 标签，体现了语音模型对多格式部署的关注。两者点赞接近，但 tiny-voca 下载更多；下载统计周期未注明，不能直接据此判断实际采用率或增长速度。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
本次提供的榜单中暂无此类模型。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

#### 1. [IFM/PAN2](https://huggingface.co/IFM/PAN2)
- **作者：** IFM
- **点赞：** 205｜**下载：** 374
- **任务：** image-text-to-video
- **一句话说明：** 面向图像与文本输入的视频生成模型，以世界模型、世界模拟为标签定位，是本次样本中周点赞排名最高的模型。
- **主要标签：** `diffusers`、`safetensors`、`world-model`、`world-simulation`、`text-to-video`

#### 2. [n4ze3m/tiny-voca](https://huggingface.co/n4ze3m/tiny-voca)
- **作者：** n4ze3m
- **点赞：** 196｜**下载：** 860
- **任务：** text-to-speech
- **一句话说明：** 带有英语、ONNX 与 GGUF 标签的文本转语音模型，以语音生成及多格式部署方向值得关注，下载数在本次样本中领先。
- **主要标签：** `onnx`、`gguf`、`text-to-speech`、`en`、`dataset:n4ze3m/tiny-voca`

### 🔧 专用模型（代码、数学、医疗、嵌入）
本次提供的榜单中暂无此类模型。

### 📦 微调与量化（社区微调、GGUF、AWQ）
- **[n4ze3m/tiny-voca](https://huggingface.co/n4ze3m/tiny-voca)** 同时具有 `onnx`、`gguf` 标签，可作为格式适配与部署研究对象，完整信息见上。
- **注意：** GGUF 标签不等于已确认具体量化位宽；是否存在多个量化版本、采用何种微调方法，需查阅模型卡与文件列表。

## 生态信号
这份小样本中，世界建模视频生成与语音合成是主要热点，但不足以判断哪些模型家族整体走强。PAN2 的 Diffusers、Safetensors 标签体现其与常见生成工具链的关联；tiny-voca 的 ONNX、GGUF 标签则提示部署格式受到重视。现有信息未给出许可证、权重开放范围或闭源对照，不能推断开源权重相对闭源的趋势，也无法确认具体量化方案及微调活动。

## 值得探索

1. **[IFM/PAN2](https://huggingface.co/IFM/PAN2)**  
   适合关注视频生成与世界模型的研究者。建议重点验证时序一致性、场景交互与物理合理性，区分“世界模拟”定位和实际能力。

2. **[n4ze3m/tiny-voca](https://huggingface.co/n4ze3m/tiny-voca)**  
   适合研究语音合成部署。建议核查 ONNX、GGUF 文件及对应运行方式，并比较音质、推理延迟和内存占用，评估其本地部署价值。

---
*说明：以上仅依据所提供的榜单元数据，不代表当天新发布模型，也未验证模型性能、许可证或硬件要求。*

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*