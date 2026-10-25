# Hugging Face 热门模型日报 2026-10-25

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-10-25 01:34 UTC

---

# Hugging Face 热门模型日报
**日期：2026-10-25**

> 数据口径：基于所提供的 3 个模型，按周点赞数排序；下载统计周期未注明。以下判断仅针对该样本，模型能力、许可证及部署要求仍需查阅模型卡。

## 今日速览

今日榜首是 ISTA-DASLab 发布的 DeepSeek-V4.1-Flash GGUF 量化版本，以 **210 赞、32,479 次下载**显示出较高的部署关注度。KRAFTON 的 Raon-1-mini-preview 获得 **172 赞**，但下载量相对较低，呈现“关注领先、使用尚待观察”的特征。Ornith-1.5-122B 以 **166 赞、30,407 次下载**紧随其后，其多模态与 MoE 标签值得关注。整体来看，这份榜单同时体现了轻量模型、大参数多模态模型和量化分发三条路线的热度。

## 热门模型

### 🧠 语言模型
**[KRAFTON/Raon-1-mini-preview](https://huggingface.co/KRAFTON/Raon-1-mini-preview)**  
- **作者：** KRAFTON
- **点赞：** 172｜**下载：** 917
- **一句话说明：** Raon 系列的 mini 预览版文本生成模型，较高点赞体现出社区对该系列的关注，但实际使用规模仍需持续观察。

### 🎨 多模态与生成
**[ornith-ai/Ornith-1.5-122B](https://huggingface.co/ornith-ai/Ornith-1.5-122B)**  
- **作者：** ornith-ai
- **点赞：** 166｜**下载：** 30,407
- **一句话说明：** 名称标示为 122B、带有 `qwen3_5_moe` 与 `image-text-to-text` 标签的大模型，兼具文本生成与图文方向的研究吸引力，下载量在本榜单中位居第二。
- **分类说明：** 主任务标为文本生成，此处依据图文标签归入多模态；具体视觉能力需以模型卡为准。

### 🔧 专用模型
本次样本中暂无明确面向代码、数学、医疗或嵌入等专用任务的模型。

### 📦 微调与量化
**[ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF)**  
- **作者：** ISTA-DASLab
- **点赞：** 210｜**下载：** 32,479
- **一句话说明：** DeepSeek-V4.1-Flash 的 GGUF 量化版本，带有 GSQ、RCO 与混合精度标签，本榜单点赞与下载双领先，反映出社区对部署效率优化的关注。

## 生态信号

本样本中，DeepSeek 衍生量化版本热度领先，带有 Qwen 架构标签的 Ornith 也获得较高下载量；Raon 则呈现关注先于使用的特征。三者均提供权重分发格式，显示开放权重生态仍有活跃供给，但不能据此判断其相对闭源模型的整体份额，开放权重也不等于开放许可证。GGUF 与混合精度标签尤其醒目，说明降低部署门槛是重要方向；量化质量和硬件收益仍需实测。

## 值得探索

1. **[DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF)**  
   适合关注本地部署与量化的开发者：重点比较不同量化配置的内存占用、吞吐及质量损失，并先确认推理后端兼容性。

2. **[Raon-1-mini-preview](https://huggingface.co/KRAFTON/Raon-1-mini-preview)**  
   适合跟踪新模型系列：可优先验证实际参数规模、语言覆盖和指令遵循表现，判断其是否适合轻量应用。

3. **[Ornith-1.5-122B](https://huggingface.co/ornith-ai/Ornith-1.5-122B)**  
   适合研究大规模 MoE 与图文任务：先核实视觉输入支持、激活参数量和部署资源需求，再开展能力评测。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*