# Hugging Face 热门模型日报 2026-11-03

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-11-02 18:29 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-03**

> 数据范围：所提供的 4 个热门模型，按周点赞数排序。点赞、下载数沿用榜单数据，不代表当日新增；模型能力、许可证及部署要求仍需查阅模型卡确认。

## 今日速览

本期榜首是语音合成模型 **Audio8-TTS-Realistic-Air**，以 241 个点赞、7,259 次下载，在这组样本中同时领跑关注度与下载量。语言模型方向，MiniMax-H3 的社区微调版 **Sulphur-3** 与 DeepSeek 衍生版本均进入前列，显示基础模型周边的社区改造仍有吸引力。**SenseNova-Loop-9B-Preview** 则为榜单带来图文多模态方向的关注点。整体来看，音频、多模态与社区衍生模型共同占据热榜，但不能仅凭热度判断实际能力或生产可用性。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

**[OBLITERATUS/DeepSeek-V4.1-Flash-1017-obliterated](https://huggingface.co/OBLITERATUS/DeepSeek-V4.1-Flash-1017-obliterated)**
- **作者：** OBLITERATUS
- **点赞：** 211 ｜ **下载：** 1,095
- **一句话说明：** 一个 DeepSeek 系列文本生成衍生版本，进入热榜体现了社区对该家族改造版本的关注；“obliterated”的具体改动及效果需以模型卡和评测为准。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

**[Edge0/Audio8-TTS-Realistic-Air](https://huggingface.co/Edge0/Audio8-TTS-Realistic-Air)**
- **作者：** Edge0
- **点赞：** 241 ｜ **下载：** 7,259
- **一句话说明：** 一个文本转语音模型，在本组样本中点赞与下载均最高，是观察语音生成社区采用情况的首选对象，但音质与实时性仍需试听、实测。

**[sensenova/SenseNova-Loop-9B-Preview](https://huggingface.co/sensenova/SenseNova-Loop-9B-Preview)**
- **作者：** sensenova
- **点赞：** 177 ｜ **下载：** 1,536
- **一句话说明：** 一个标注为图文输入、文本输出的多模态预览模型，其上榜反映了社区对 SenseNova 多模态路线的兴趣。

### 🔧 专用模型（代码、数学、医疗、嵌入）

本期样本中暂无明确归入此类的模型。

### 📦 微调与量化（社区微调、GGUF、AWQ）

**[FusionCow/Sulphur-3](https://huggingface.co/FusionCow/Sulphur-3)**
- **作者：** FusionCow
- **点赞：** 228 ｜ **下载：** 195
- **一句话说明：** 标签明确标注为 MiniMax-H3 的微调版本，点赞位居第二、下载量却在本组最低，呈现“关注先于下载”的特征，具体原因尚不能由榜单判断。

*注：DeepSeek 衍生版本已列于语言模型栏，不重复收录；本期未出现明确的 GGUF、AWQ 量化标签。*

## 生态信号

在这组样本中，MiniMax-H3 与 DeepSeek 家族的社区衍生版本均获较高关注，语音生成则在下载量上更突出。榜单显示可下载模型及社区微调具有活力，但不足以判断开放权重相对闭源服务的整体份额变化，权重可下载也不等于许可证完全开放。微调方面，Sulphur-3 的来源标签最明确；量化方面，暂未看到 GGUF、AWQ 等直接信号。

## 值得探索

1. **[Audio8-TTS-Realistic-Air](https://huggingface.co/Edge0/Audio8-TTS-Realistic-Air)**  
   **优先试听。** 下载量明显领先，适合重点验证音色自然度、长文本稳定性、语言覆盖及推理延迟。

2. **[SenseNova-Loop-9B-Preview](https://huggingface.co/sensenova/SenseNova-Loop-9B-Preview)**  
   **优先做多模态基准测试。** 可围绕图像问答、文字识别和图文推理评估表现，同时检查预览版的接口、资源需求与稳定性。

3. **[Sulphur-3](https://huggingface.co/FusionCow/Sulphur-3)**  
   **优先研究微调差异。** 建议先核查训练说明与许可证，再与 MiniMax-H3 基座对比，确认社区微调带来的能力变化，而非将高点赞直接视为性能提升。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*