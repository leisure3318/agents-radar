# Hugging Face 热门模型日报 2026-11-20

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 2 个模型 | 生成时间: 2026-11-19 17:22 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-20｜基于提供的 2 个热门模型样本**

## 今日速览

今日样本聚焦视觉语言与语音识别，两个模型的标签均指向 Qwen 相关架构，显示其多模态生态值得关注。**DaisyRose-27B** 面向图文输入到文本输出，**Rumble-2-Flash** 则聚焦自动语音识别。后者以 149 次点赞、929 次下载，在所列累计指标上均略高或明显高于前者，但这些数据不能直接代表性能或质量。本次未提供模型发布时间及周点赞具体数值，因此不将榜单热度等同于“今日新发布”，下文保留原榜顺序。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
本次样本暂无独立归入此类的模型；图文理解模型列入多模态类别。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

#### 1. [RadixArk/DaisyRose-27B](https://huggingface.co/RadixArk/DaisyRose-27B)
- **作者：** RadixArk
- **点赞：** 147｜**下载：** 166
- **任务与标签：** `image-text-to-text`、`qwen3_5`、`transformers`、`safetensors`
- **一句话说明：** 一款支持图文输入、文本输出的多模态模型，名称标示为 27B；其进入趋势榜反映了社区对视觉语言模型的关注，但具体能力与热度成因仍需结合模型卡验证。

#### 2. [Reson8/Rumble-2-Flash](https://huggingface.co/Reson8/Rumble-2-Flash)
- **作者：** Reson8
- **点赞：** 149｜**下载：** 929
- **任务与标签：** `automatic-speech-recognition`、`qwen3_asr`、`qwen3-asr`、`transformers`、`safetensors`
- **一句话说明：** 一款带有 Qwen3-ASR 相关标签的自动语音识别模型，在本次样本中下载量更高，体现出较强的试用关注度；“Flash”命名本身不构成低延迟的实测证明。

### 🔧 专用模型（代码、数学、医疗、嵌入）
本次样本暂无上述方向的模型；语音识别模型已统一列入音频类别，不重复计入。

### 📦 微调与量化（社区微调、GGUF、AWQ）
暂无明确标注的微调或量化模型。仅凭作者、模型名称或 `safetensors` 标签，无法确认微调方式、量化精度及是否提供 GGUF/AWQ 版本。

## 生态信号

两个样本分别带有 `qwen3_5` 与 `qwen3_asr` 标签，提示 Qwen 相关生态正获得跨视觉、语音任务的社区关注，但样本量不足以判断全站格局。两者均标注 Transformers 与 Safetensors，体现标准工具链的可见度；是否属于开放权重、允许何种使用，仍须核查文件与许可证，不能据此推断开源相对闭源的份额变化。当前没有明确的量化或微调证据，值得继续追踪衍生版本与部署适配。

## 值得探索

1. **[RadixArk/DaisyRose-27B](https://huggingface.co/RadixArk/DaisyRose-27B)**  
   适合研究图文理解与视觉问答。建议优先核查模型卡、显存需求及示例，再使用文档截图、图表等真实输入评估效果。

2. **[Reson8/Rumble-2-Flash](https://huggingface.co/Reson8/Rumble-2-Flash)**  
   适合开展语音转写评测。建议重点验证支持语言、噪声鲁棒性、字词错误率与推理延迟，而非仅依据下载量或“Flash”名称判断表现。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*