# Hugging Face 热门模型日报 2026-10-09

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-10-09 05:06 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-10-09**

## 1. 今日速览

今日 Hugging Face 热榜显示，多模态与轻量化部署仍是社区关注重点。GLM、LiquidAI 与 Qwen 相关模型同时上榜，说明主流模型家族的视觉语言能力和推理效率正在持续迭代。值得注意的是，GGUF / llama.cpp 生态模型下载量显著领先，反映本地部署、量化推理和社区改造版本依然具备很强吸引力。MoE、Flash、量化、abliterated 等关键词成为本期趋势信号。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

当前榜单中没有纯文本 LLM 或传统对话模型单独上榜，但 GLM 与 Qwen 系列模型仍体现出强烈的语言模型底座影响力。

- **[autotrust/GLM5.3-Flash-E224-DGX-Spark](https://huggingface.co/autotrust/GLM5.3-Flash-E224-DGX-Spark)**  
  作者：autotrust  
  点赞数：461｜下载数：5,422  
  一句话说明：基于 GLM5 系列的 Flash / MoE 风格模型，结合高效推理与多模态任务能力，因 GLM 家族热度和 vLLM 部署友好性登上趋势榜。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

- **[autotrust/GLM5.3-Flash-E224-DGX-Spark](https://huggingface.co/autotrust/GLM5.3-Flash-E224-DGX-Spark)**  
  作者：autotrust  
  点赞数：461｜下载数：5,422  
  一句话说明：面向 image-text-to-text 场景的 GLM 系列多模态模型，兼具 MoE 架构与 vLLM 支持，是今日点赞最高的模型。

- **[LiquidAI/d1-3B](https://huggingface.co/LiquidAI/d1-3B)**  
  作者：LiquidAI  
  点赞数：201｜下载数：5,370  
  一句话说明：LiquidAI 发布的 3B 级视觉语言模型，标签显示其基于 lfm2_vl 架构，因小参数、多模态和 transformers 兼容性受到关注。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

当前榜单中未出现明确面向代码、数学、医疗、检索嵌入等垂直任务的专用模型。今日趋势主要集中在视觉语言模型、多模态推理与本地量化部署方向。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

- **[SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF](https://huggingface.co/SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF)**  
  作者：SC117  
  点赞数：158｜下载数：612,411  
  一句话说明：Qwen 系列的 GGUF 量化社区版本，面向 llama.cpp 等本地推理场景，凭借超高下载量反映出社区对轻量部署和改造模型的强需求。

---

## 3. 生态信号

今日热榜体现出三条明显趋势：首先，GLM、Qwen、LiquidAI 等模型家族继续在多模态与轻量模型方向发力，尤其是 image-text-to-text 任务成为集中爆发点。其次，开源权重和社区可部署版本仍具备强大吸引力，GGUF 模型的下载量远高于其他条目，说明本地推理、离线部署和低成本运行依然是开发者核心需求。最后，MoE、Flash、量化、vLLM、llama.cpp 等标签频繁出现，表明生态竞争已从单纯模型能力扩展到推理效率、部署兼容性和社区二次分发能力。

---

## 4. 值得探索

1. **[autotrust/GLM5.3-Flash-E224-DGX-Spark](https://huggingface.co/autotrust/GLM5.3-Flash-E224-DGX-Spark)**  
   今日点赞最高，适合关注 GLM5 系列、多模态推理、MoE 架构与 vLLM 部署实践的开发者研究。

2. **[LiquidAI/d1-3B](https://huggingface.co/LiquidAI/d1-3B)**  
   3B 级多模态模型具备较好的实验价值，适合评估小模型在图文理解、端侧部署和低资源推理场景中的表现。

3. **[SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF](https://huggingface.co/SC117/Qwen3.8-Flash-Next-GSQ-RCO-abliterated-GGUF)**  
   下载量极高，值得研究 GGUF、llama.cpp 和 Qwen 社区量化生态，但在实际使用时应注意模型改造版本的安全性、合规性与输出可控性。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*