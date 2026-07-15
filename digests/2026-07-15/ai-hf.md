# Hugging Face 热门模型日报 2026-07-15

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-07-15 00:55 UTC

---

# Hugging Face 热门模型日报（2026-07-15）

## 1) 今日速览
今天的热门模型仍然呈现出两个很清晰的方向：一是 **LLM 量化与社区复刻** 持续升温，尤其是 `prism-ml` 旗下的 Bonsai 系列，说明轻量部署与边缘推理需求依然强劲；二是 **图像生成/微调 LoRA** 继续在生成式赛道保持高活跃度，`mgwr/M87` 的下载数明显领先，反映出基于强基座模型做风格或能力增量的玩法很受欢迎。整体看，榜单更偏向“可直接上手”的实用模型，而非超大参数原生模型。开源权重、GGUF、LoRA 等生态工具链，仍是当前最具热度的模型分发形态。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
1. **[prism-ml/Ternary-Bonsai-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-27B-gguf)**  
   - 作者：prism-ml  
   - 点赞：139  
   - 下载：23  
   - 一句话说明：这是一个基于 Bonsai 系列的 **27B 三值/2-bit GGUF 量化对话模型**，以极致压缩和本地推理友好为卖点，榜单靠前主要因为“更省显存、能跑大模型”的实用价值。

2. **[prism-ml/Bonsai-27B-gguf](https://huggingface.co/prism-ml/Bonsai-27B-gguf)**  
   - 作者：prism-ml  
   - 点赞：83  
   - 下载：513  
   - 一句话说明：这是 Bonsai 系列的 **27B 1-bit GGUF 量化版本**，主打超低资源部署与社区可复现性，能上榜说明轻量化大模型依然是 Hugging Face 上的重要流量入口。

### 🎨 多模态与生成（图像、视频、音频、文本到X）
1. **[mgwr/M87](https://huggingface.co/mgwr/M87)**  
   - 作者：mgwr  
   - 点赞：106  
   - 下载：2,408  
   - 一句话说明：这是一个面向 **text-to-image 的 LoRA 微调模型**，基于 `krea/Krea-2-Turbo` 做增量适配，下载量明显领先，说明“强基座 + 轻量微调”仍是图像生成领域的主流玩法。

### 🔧 专用模型（代码、数学、医疗、嵌入）
- 暂无进入今日热门榜的专用模型。

### 📦 微调与量化（社区微调、GGUF、AWQ）
1. **[prism-ml/Ternary-Bonsai-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-27B-gguf)**  
   - 作者：prism-ml  
   - 点赞：139  
   - 下载：23  
   - 一句话说明：代表了 **ternary / 2-bit / GGUF** 的极限量化路线，适合关注推理成本和本地部署上限的用户。

2. **[prism-ml/Bonsai-27B-gguf](https://huggingface.co/prism-ml/Bonsai-27B-gguf)**  
   - 作者：prism-ml  
   - 点赞：83  
   - 下载：513  
   - 一句话说明：这是更偏“可用性优先”的 **1-bit GGUF** 社区量化版本，适合研究超低比特量化在真实任务中的效果与稳定性。

3. **[mgwr/M87](https://huggingface.co/mgwr/M87)**  
   - 作者：mgwr  
   - 点赞：106  
   - 下载：2,408  
   - 一句话说明：一个典型的 **LoRA 微调扩展模型**，体现了模型生态从“训练大底座”转向“围绕底座做高效适配”的趋势。

---

## 3) 生态信号
本期最活跃的模型家族是 **prism-ml / Bonsai 系列**，说明 27B 级别模型的社区量化正在形成稳定关注度。开源权重依旧明显占优，且“GGUF、2-bit、1-bit、LoRA”这类轻量化形态比原生闭源发布更容易获得互动。值得注意的是，下载量最高的是图像 LoRA，说明用户不仅关注模型能力，也非常看重可快速落地的微调成果与推理效率。

---

## 4) 值得探索
1. **[mgwr/M87](https://huggingface.co/mgwr/M87)**  
   理由：下载量最高，适合优先研究它在 `Krea-2-Turbo` 上的微调思路，以及 LoRA 对风格/质量的提升边界。

2. **[prism-ml/Ternary-Bonsai-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-27B-gguf)**  
   理由：代表超低比特量化的前沿路线，适合关注本地部署、压缩率与推理质量的平衡。

3. **[prism-ml/Bonsai-27B-gguf](https://huggingface.co/prism-ml/Bonsai-27B-gguf)**  
   理由：与上一个模型形成对照，适合比较 1-bit 与 ternary 量化在性能、稳定性和可用性上的差异。

如需，我也可以把这份日报进一步整理成 **适合公众号/内部简报/Markdown 表格版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*