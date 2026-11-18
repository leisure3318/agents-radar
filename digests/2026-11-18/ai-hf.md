# Hugging Face 热门模型日报 2026-11-18

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 8 个模型 | 生成时间: 2026-11-18 04:42 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-18｜观察样本：8 个模型**

> 本报基于所提供的榜单快照，未独立核验模型卡与性能。点赞、下载按原始数据展示，不视为当日新增；榜单虽按周点赞排序，但未提供周增量，因此不据此重新排名。下载为 0 也不等于无人使用。

## 今日速览

多模态与视频生成是本期的重要看点，SenseNova-Loop-9B、LongCat-Video-Avatar-1.6 和 Apple FastFrames-L 分别覆盖视觉语言、音频驱动视频与文本生成视频方向。语言模型侧，Maxwell-V1-Flash 的 MoE 标签，以及 Qwen 衍生模型的 PEFT、GRPO 标签，体现了架构效率与训练适配两条路线。社区微调模型仍有较强传播力，xtools-at 的衍生模型录得 21,167 次下载，但名称中的能力与来源声明需要单独核验。与此同时，pyannote 说话人分离流水线以超过 637 万次下载，显示成熟音频工具仍有持续需求。

## 热门模型

### 🧠 语言模型
*LLM、对话模型、指令微调*

| 模型 | 作者 | 点赞 / 下载 | 一句话说明 |
|---|---|---:|---|
| [Maxwell-V1-Flash](https://huggingface.co/maxwell-model/Maxwell-V1-Flash) | maxwell-model | 168 / 287 | 标签指向用于文本生成与对话的 MoE 模型，值得关注其架构设计与实际推理效率，但目前没有性能数据可供判断。 |
| [Sage-S2.1-Flash](https://huggingface.co/internlm/Sage-S2.1-Flash) | internlm | 101 / 337 | 带有 `glm5_next` 架构标签的模型，暂列语言模型方向；任务字段缺失，具体用途及“Flash”所代表的效率特点仍需模型卡确认。 |

### 🎨 多模态与生成
*图像、视频、音频、文本到 X*

| 模型 | 作者 | 点赞 / 下载 | 一句话说明 |
|---|---|---:|---|
| [SenseNova-Loop-9B](https://huggingface.co/sensenova/SenseNova-Loop-9B) | sensenova | 215 / 0 | 面向图文输入、文本输出的多模态模型，9B 命名与视觉语言定位使其成为本期值得跟踪的发布。 |
| [LongCat-Video-Avatar-1.6](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.6) | meituan-longcat | 210 / 489 | 标签指向音频与文本驱动的 Avatar 视频生成，并包含 ONNX、Diffusers 格式标签，兼具生成应用与部署研究价值。 |
| [FastFrames-L](https://huggingface.co/apple/FastFrames-L) | apple | 84 / 0 | 基于 Wan2.1-T2V-14B 微调的文本生成视频模型，关注点在于 Apple 对现有视频模型的衍生探索，使用前需核查 `apple-amlr` 许可。 |

### 🔧 专用模型
*本期为音频专用流水线，无明确的代码、数学、医疗或嵌入模型*

| 模型 | 作者 | 点赞 / 下载 | 一句话说明 |
|---|---|---:|---|
| [speaker-diarization-3.1](https://huggingface.co/pyannote/speaker-diarization-3.1) | pyannote | 5,294 / 6,375,689 | 用于识别音频中“谁在何时说话”的说话人分离流水线，高下载量体现其工具价值；不应将榜单中的 ASR 任务标注直接理解为语音转写能力。 |

### 📦 微调与量化
*社区微调与训练适配；本期未见明确的 GGUF、AWQ 量化条目*

| 模型 | 作者 | 点赞 / 下载 | 一句话说明 |
|---|---|---:|---|
| [Qwen3.8-27B-pi-adapted](https://huggingface.co/harness-hub/Qwen3.8-27B-pi-adapted) | harness-hub | 171 / 0 | 名称指向 Qwen 衍生适配，PEFT、TRL、GRPO 与 async-GRPO 标签表明其与适配及强化学习训练相关，具体产物形态仍需核验。 |
| [DeepSeek-V4-Pro-Qwen3.5-4B-UNCENSORED-heretic](https://huggingface.co/xtools-at/DeepSeek-V4-Pro-Qwen3.5-4B-UNCENSORED-heretic) | xtools-at | 230 / 21,167 | 带有 `qwen3_5` 标签、以“UNCENSORED”定位传播的社区衍生模型，下载活跃，但名称不能证明其具备 DeepSeek-V4-Pro 的权重来源或能力。 |

## 生态信号

本样本中，Qwen 衍生适配与 Wan 视频微调均有出现，显示基础模型家族正通过社区再训练扩展应用。MoE、Flash 命名体现效率诉求，但不能替代实测。Hub 上的权重与适配产物持续活跃，不过公开仓库、可下载权重与开源许可并非同义，也不足以判断闭源市场走势。PEFT、GRPO 活动值得跟踪；本期未见明确的 GGUF、AWQ 量化发布。

## 值得探索

1. **[SenseNova-Loop-9B](https://huggingface.co/sensenova/SenseNova-Loop-9B)**  
   适合关注视觉语言模型的团队，重点验证图文理解、中文表现及实际显存需求，而非仅依据参数规模判断部署成本。

2. **[LongCat-Video-Avatar-1.6](https://huggingface.co/meituan-longcat/LongCat-Video-Avatar-1.6)**  
   适合数字人及音频驱动视频研究，建议重点测试口型同步、人物一致性、长片段稳定性与部署链路。

3. **[Qwen3.8-27B-pi-adapted](https://huggingface.co/harness-hub/Qwen3.8-27B-pi-adapted)**  
   适合研究 PEFT 与 GRPO 训练适配；先确认基座版本、适配器加载方式和评测设置，再判断训练收益是否可复现。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*