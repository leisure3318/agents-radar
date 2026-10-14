# Hugging Face 热门模型日报 2026-10-14

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-10-14 03:58 UTC

---

# Hugging Face 热门模型日报  
日期：2026-10-14

## 1. 今日速览

今日 Hugging Face 热榜呈现出两个明显信号：小型多模态模型继续升温，量化大模型获得高下载关注。openbmb 的 MiniCPM-V-4.7-1B 以 1B 级参数切入图文理解场景，显示轻量化视觉语言模型仍有很强需求。autotrust/JEV-35B-NVFP4 下载量显著领先，说明社区对低精度、高效率部署方案兴趣浓厚。LiquidAI 的 LFM2.5-24B-A2B 则代表 MoE 架构在通用文本生成模型中的持续扩张。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### [LiquidAI/LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B)
- 作者：LiquidAI  
- 点赞数：186  
- 下载数：2,565  
- 一句话说明：这是 LiquidAI 发布的 24B 级 MoE 文本生成模型，因其新一代 LFM2 MoE 架构和通用生成能力受到关注。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### [openbmb/MiniCPM-V-4.7-1B](https://huggingface.co/openbmb/MiniCPM-V-4.7-1B)
- 作者：openbmb  
- 点赞数：289  
- 下载数：263  
- 一句话说明：这是 MiniCPM-V 系列的轻量级视觉语言模型，主打 image-text-to-text 能力，因小参数规模下的多模态应用潜力进入趋势榜。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

暂无明显归入该类别的模型。今日热榜主要集中在通用语言模型、多模态模型与量化部署模型。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [autotrust/JEV-35B-NVFP4](https://huggingface.co/autotrust/JEV-35B-NVFP4)
- 作者：autotrust  
- 点赞数：301  
- 下载数：20,494  
- 一句话说明：这是基于 Qwen3.5 MoE 相关生态的 NVFP4 低精度模型，下载量远超其他上榜模型，反映出社区对高效推理与量化部署的强烈需求。

---

## 3. 生态信号

今日榜单显示，MiniCPM、Qwen 系与 LiquidAI 的 MoE 模型势头较强。开源权重仍是社区试用和二次分发的核心驱动力，尤其是可本地部署、可量化的模型更容易获得下载量。NVFP4 等低精度格式的走热，说明推理成本优化已成为模型生态的重要竞争点；同时，小型多模态模型也在向端侧和轻量应用场景渗透。

---

## 4. 值得探索

1. **[autotrust/JEV-35B-NVFP4](https://huggingface.co/autotrust/JEV-35B-NVFP4)**  
   下载量最高，适合研究 NVFP4 量化在大模型推理中的实际效率、显存占用和性能折损。

2. **[openbmb/MiniCPM-V-4.7-1B](https://huggingface.co/openbmb/MiniCPM-V-4.7-1B)**  
   1B 级多模态模型具备较强部署吸引力，值得测试其在图文问答、OCR、移动端视觉理解中的表现。

3. **[LiquidAI/LFM2.5-24B-A2B](https://huggingface.co/LiquidAI/LFM2.5-24B-A2B)**  
   代表 LiquidAI 在 MoE 文本生成方向的最新进展，适合关注架构创新、长文本生成和通用推理能力的研究者尝试。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*