# Hugging Face 热门模型日报 2026-06-27

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 5 个模型 | 生成时间: 2026-06-27 01:31 UTC

---

# Hugging Face 热门模型日报（2026-06-27）

## 1) 今日速览
今天榜单的核心信号非常明确：**deepreinforce-ai/Ornith-1.0 系列强势霸榜**，5 个热门模型里占了 4 个席位，且覆盖了不同规模与不同部署形态。  
值得注意的是，这一系列同时出现了 **9B、35B、397B** 等多尺寸版本，说明社区不仅关注模型效果，也在关注可部署性与扩展性。  
另一方面，**GGUF** 与 **NVFP4** 这类量化/优化格式也冲上热门，表明“能跑、好跑、跑得快”正在成为新一轮关注重点。  
整体来看，当前 Hugging Face 热门模型的主线是：**同一家族多版本发布 + 多模态/文本生成融合 + 面向推理的量化优化**。

---

## 2) 热门模型

### 🎨 多模态与生成（图像、视频、音频、文本到X）

- **[deepreinforce-ai/Ornith-1.0-35B](https://huggingface.co/deepreinforce-ai/Ornith-1.0-35B)**  
  作者：deepreinforce-ai｜点赞：122｜下载：1,005  
  一句话说明：35B 级别的 Ornith 版本，带有 **image-text-to-text** 标签，属于更强能力的多模态生成模型，因尺寸与能力平衡而受到关注。

- **[deepreinforce-ai/Ornith-1.0-9B](https://huggingface.co/deepreinforce-ai/Ornith-1.0-9B)**  
  作者：deepreinforce-ai｜点赞：114｜下载：218  
  一句话说明：Ornith 系列的 9B 版本，同样覆盖图文到文本场景，因“小而强”的部署友好属性成为趋势榜热门。

- **[deepreinforce-ai/Ornith-1.0-397B](https://huggingface.co/deepreinforce-ai/Ornith-1.0-397B)**  
  作者：deepreinforce-ai｜点赞：107｜下载：126  
  一句话说明：397B 旗舰级大模型，带有 **image-text-to-text** 能力，代表该家族的上限探索，因此在榜单上具备强烈话题性。

---

### 🧠 语言模型（LLM、对话模型、指令微调）

- **[nvidia/GLM-5.2-NVFP4](https://huggingface.co/nvidia/GLM-5.2-NVFP4)**  
  作者：nvidia｜点赞：87｜下载：441  
  一句话说明：NVIDIA 推出的 GLM 变体，重点在 **NVFP4** 低精度推理优化，属于面向高效部署的语言模型路线，所以获得较高关注。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

- 本期榜单中**没有明显独立的专用任务模型**；热门集中在通用生成、多模态和部署优化方向。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

- **[deepreinforce-ai/Ornith-1.0-9B-GGUF](https://huggingface.co/deepreinforce-ai/Ornith-1.0-9B-GGUF)**  
  作者：deepreinforce-ai｜点赞：160｜下载：1,779  
  一句话说明：Ornith 9B 的 **GGUF** 量化版本，明显偏向本地推理与轻量部署，是榜单中最受欢迎的模型之一，说明“可直接落地”非常吃香。

---

## 3) 生态信号
本期榜单几乎被 **deepreinforce-ai/Ornith** 系列包揽，显示同一家族的多尺寸、多形态发布正在快速聚拢关注。开源权重明显占优，且 **GGUF、NVFP4** 这类面向部署的量化格式热度很高，反映社区更看重可用性和推理效率；同时，**大参数 MoE/多模态路线** 仍在升温。

---

## 4) 值得探索

1. **[deepreinforce-ai/Ornith-1.0-397B](https://huggingface.co/deepreinforce-ai/Ornith-1.0-397B)**  
   理由：旗舰级规模，适合观察该家族能力上限和多模态表现。

2. **[deepreinforce-ai/Ornith-1.0-9B-GGUF](https://huggingface.co/deepreinforce-ai/Ornith-1.0-9B-GGUF)**  
   理由：下载和点赞都最高，最适合本地部署、边缘推理或快速验证。

3. **[nvidia/GLM-5.2-NVFP4](https://huggingface.co/nvidia/GLM-5.2-NVFP4)**  
   理由：代表低精度高效推理趋势，适合研究“模型性能 × 部署成本”的平衡点。

如果你愿意，我也可以把这份日报进一步整理成 **适合公众号发布的排版版** 或 **适合内部晨报的极简版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*