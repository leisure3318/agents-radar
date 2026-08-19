# Hugging Face 热门模型日报 2026-08-19

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-08-19 01:19 UTC

---

# Hugging Face 热门模型日报（2026-08-19）

## 1) 今日速览
今天的热门榜几乎被 **Qwen3.8-27B** 衍生模型包场，说明该家族仍是社区最活跃的基础模型之一，尤其在 **uncensored、量化、跨运行时适配** 方向持续升温。  
榜单里最显眼的现象是：**点赞高但下载低/为 0** 的模型不少，意味着社区对“新变体/新包装”的关注度很高，但实际落地仍偏向成熟可运行格式。  
同时，**GGUF** 依旧是最受欢迎的分发形态之一，适合本地推理与 llama.cpp 生态；**MLX** 版本则反映出 Mac 端部署需求在增长。  
除 LLM 外，唯一进入榜单的非语言模型是一个 **image-text-to-video** 模型，说明视频生成仍是模型生态里的高热度赛道。  

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### 1. [orcarouter/Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX)
- 作者：orcarouter  
- 点赞数：274  
- 下载数：0  
- 一句话说明：这是 **Qwen3.8-27B** 的 **MLX** 版本，主打本地推理与 Apple Silicon 生态适配，并以 uncensored / abliterated 方向吸引关注，因此在趋势榜上获得很高点赞。

#### 2. [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF)
- 作者：HauhauCS  
- 点赞数：203  
- 下载数：27,745  
- 一句话说明：这是面向本地部署的 **GGUF** 量化版本，结合 **uncensored** 与 **MTP** 变体优化，既有讨论热度也有明显下载量，说明可运行性和实用性都很强。

#### 3. [empero-ai/Qwen3.8-27B-Ridge-GGUF](https://huggingface.co/empero-ai/Qwen3.8-27B-Ridge-GGUF)
- 作者：empero-ai  
- 点赞数：173  
- 下载数：12,854  
- 一句话说明：同样基于 Qwen3.8-27B 的 **GGUF** 社区版本，主打量化与本地推理，属于“生态适配型”热门模型，说明用户对易部署版本需求持续稳定。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### 4. [TenStrip/10Eros-Max](https://huggingface.co/TenStrip/10Eros-Max)
- 作者：TenStrip  
- 点赞数：266  
- 下载数：0  
- 一句话说明：这是一个 **image-text-to-video / image-to-video** 模型，基于 MiniMax-H3 系列微调，代表视频生成方向的高关注度与社区探索热潮。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）
- 本日榜单中未出现明显的代码、数学、医疗或嵌入专用模型。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### 1. [orcarouter/Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX)
- 作者：orcarouter  
- 点赞数：274  
- 下载数：0  
- 一句话说明：这是对 Qwen3.8-27B 的运行时适配与风格微调版本，强调 MLX 与 uncensored 属性，偏向社区实验和本地端侧使用。

#### 2. [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF)
- 作者：HauhauCS  
- 点赞数：203  
- 下载数：27,745  
- 一句话说明：典型的 **社区微调 + GGUF 量化** 组合，属于最贴近实际部署需求的热门类型之一。

#### 3. [empero-ai/Qwen3.8-27B-Ridge-GGUF](https://huggingface.co/empero-ai/Qwen3.8-27B-Ridge-GGUF)
- 作者：empero-ai  
- 点赞数：173  
- 下载数：12,854  
- 一句话说明：以 GGUF 形式面向本地推理和低成本部署，反映出量化模型在 Hugging Face 上的持续高活跃度。

---

## 3) 生态信号
从今天榜单看，**Qwen3.8-27B 家族**明显处于强势扩散阶段，社区围绕同一底座做了大量 **uncensored、MTP、MLX、GGUF** 派生。开源权重仍是生态主轴：热度最高的几款几乎都是基于开放底座的再分发与再优化，而不是封闭 API 型产品。量化与本地部署仍是主流诉求，尤其是 **GGUF** 的下载量已经能明显验证“可用性优先”的趋势；与此同时，**视频生成** 也在持续吸引关注，但更多处于高讨论、低落地的早期探索阶段。

---

## 4) 值得探索

1. **[HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF)**  
   理由：点赞与下载都高，兼具热度和实用性，最适合观察 Qwen3.8 社区量化路线的真实效果。

2. **[orcarouter/Qwen3.8-27B-Uncensored-MLX](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-MLX)**  
   理由：代表 Mac / Apple Silicon 生态下的本地推理趋势，适合研究 MLX 在大模型落地中的价值。

3. **[TenStrip/10Eros-Max](https://huggingface.co/TenStrip/10Eros-Max)**  
   理由：虽然下载为 0，但点赞极高，说明视频生成方向的关注度很强，值得关注其架构和生成质量表现。

如果你愿意，我也可以把这份日报进一步整理成 **适合公众号/飞书周报的排版版本**，或者补一版 **“趋势解读 + 投资/产品启示”**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*