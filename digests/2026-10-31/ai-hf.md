# Hugging Face 热门模型日报 2026-10-31

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 5 个模型 | 生成时间: 2026-10-31 02:41 UTC

---

# Hugging Face 热门模型日报
**日期：2026-10-31｜样本：周点赞榜 Top 5**

> 本报基于所提供的榜单与标签整理；周点赞排名不等同于单日新增热度，下载数也不代表独立用户数。

## 今日速览

视频、音频与 3D 生成占据本期榜单三席，多模态仍是最集中的关注方向。**Pika-H3-Flex** 以 198 个点赞领跑，但下载量仅 87，呈现关注度领先、实际使用规模尚待观察的特点。**LiquidAI** 同时凭音频模型和 GGUF 语言模型入榜，显示其模型家族在多模态与本地部署两条线上均有热度。社区合并模型与小参数 GGUF 模型的下载量均接近十万，表明衍生模型和便捷部署格式具有较强吸引力。

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

本期没有单独归入此类的模型；语言模型相关条目按其合并或量化属性，统一列于「微调与量化」，避免重复统计。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

| 模型 | 作者 | 点赞 | 下载 | 一句话说明 |
|---|---|---:|---:|---|
| [Pika-H3-Flex](https://huggingface.co/Pika-Labs/Pika-H3-Flex) | Pika-Labs | 198 | 87 | 图像到视频模型，带有音视频生成与 LoRA 标签，是本期周点赞最高的条目，生成能力与适配方式值得关注。 |
| [LFM3-Audio-2B](https://huggingface.co/LiquidAI/LFM3-Audio-2B) | LiquidAI | 154 | 3,550 | 定位为 any-to-any 的音频模型，包含语音识别标签，体现社区对约 2B 规模音频多模态模型的兴趣。 |
| [idol](https://huggingface.co/speridlabs/idol) | speridlabs | 153 | 221 | 结合 Gaussian Splatting 标签的图像到 3D 模型，以三维内容生成方向和 Apache-2.0 许可获得关注。 |

### 🔧 专用模型（代码、数学、医疗、嵌入）

本期样本中暂无明确属于这些方向的模型；不能据此判断专用模型整体热度下降。

### 📦 微调与量化（社区微调、GGUF、AWQ）

| 模型 | 作者 | 点赞 | 下载 | 一句话说明 |
|---|---|---:|---:|---|
| [Minimax-h3_Singularity-x-10Eros-Max_PRISM](https://huggingface.co/OliviaRossi/Minimax-h3_Singularity-x-10Eros-Max_PRISM) | OliviaRossi | 149 | 99,353 | 带有 `merge` 标签、关联 TenStrip/10Eros-Max 的社区合并模型，下载量为本期最高，但具体任务与能力仍需查阅模型卡。 |
| [LFM3-1.7B-GGUF](https://huggingface.co/LiquidAI/LFM3-1.7B-GGUF) | LiquidAI | 147 | 97,184 | 面向文本生成的 1.7B 级 GGUF 模型，带有 `llama.cpp` 标签，接近十万次下载凸显本地推理格式的吸引力。 |

## 生态信号

LiquidAI 的 LFM3 家族占据两席，覆盖音频与轻量文本生成，家族化布局势头突出。GGUF 与社区合并模型下载量明显领先，说明部署便利性和衍生版本仍是重要需求。榜单可见权重分发、量化及合并活动活跃，但仅凭五个条目，无法判断开放权重相对闭源服务的份额变化。除 idol 标注 Apache-2.0 外，其余模型的开放范围与商用权限仍需核查。

## 值得探索

1. **[LiquidAI/LFM3-1.7B-GGUF](https://huggingface.co/LiquidAI/LFM3-1.7B-GGUF)**  
   适合优先开展本地部署测试，重点评估不同量化版本的内存占用、推理速度与中文生成质量。

2. **[LiquidAI/LFM3-Audio-2B](https://huggingface.co/LiquidAI/LFM3-Audio-2B)**  
   适合研究小规模音频多模态模型；建议先核实支持的输入输出模态，再测试语音识别效果、延迟与资源需求。

3. **[speridlabs/idol](https://huggingface.co/speridlabs/idol)**  
   适合探索图像到 3D 与 Gaussian Splatting 工作流；可重点检查几何一致性、遮挡区域重建及下游工具兼容性。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*