# Hugging Face 热门模型日报 2026-09-18

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-09-18 03:43 UTC

---

# Hugging Face 热门模型日报  
日期：2026-09-18

## 1. 今日速览

今日 Hugging Face 热榜主要由 **文本生成与大语言模型** 占据，尤其是轻量化、量化部署和 agentic 能力相关模型。Qwen 系列生态继续活跃，既有面向 Apple Silicon / MLX 的结构化生成与约束解码模型，也有基于 Qwen3.5 的 agentic 模型获得高下载量。量化方向同样值得关注，GGUF、ternary、2-bit 等标签显示社区正在持续推动大模型本地化与低成本推理。整体来看，开源权重模型仍是社区创新和二次分发的核心载体。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### [harshatheg/Qwen-2.5-1B-RLCD](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD)
- 作者：harshatheg  
- 点赞数：292  
- 下载数：0  
- 一句话说明：基于 Qwen-2.5-1B 的文本生成模型，主打结构化生成、并行解码和约束解码，并面向 Apple Silicon / MLX 场景优化，因此受到轻量本地推理社区关注。

#### [XingChen-AGI/Xing4.0-29B-A4B](https://huggingface.co/XingChen-AGI/Xing4.0-29B-A4B)
- 作者：XingChen-AGI  
- 点赞数：232  
- 下载数：61  
- 一句话说明：一个 29B 级别的对话型文本生成模型，使用 transformers 与 safetensors 格式发布，适合研究中文或通用对话大模型能力。

#### [TokenRhythm/NeoHorse-1-9B](https://huggingface.co/TokenRhythm/NeoHorse-1-9B)
- 作者：TokenRhythm  
- 点赞数：878  
- 下载数：9,856  
- 一句话说明：基于 qwen3_5_text 生态的 9B 文本生成模型，带有 agentic 标签，下载量显著领先，显示其在智能体任务或实际部署中的吸引力较强。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

今日榜单中暂无明确的图像、视频、音频或文本到 X 生成模型。当前热门集中在文本生成、对话和本地推理方向。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

今日榜单中暂无明确面向代码、数学、医疗或嵌入任务的专用模型。值得注意的是，部分文本生成模型可能具备通用推理或 agentic 能力，但其标签未显示为专门任务模型。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)
- 作者：prism-ml  
- 点赞数：280  
- 下载数：0  
- 一句话说明：一个 GGUF 格式的 27B 级别三值化 / 2-bit 量化模型，面向 llama.cpp 和本地低成本推理场景，体现了社区对极低比特量化的持续兴趣。

#### [harshatheg/Qwen-2.5-1B-RLCD](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD)
- 作者：harshatheg  
- 点赞数：292  
- 下载数：0  
- 一句话说明：虽然属于文本生成模型，但其 MLX、Apple Silicon、结构化生成和约束解码标签使其也具备明显的本地化部署与推理优化属性。

---

## 3. 生态信号

今日热榜显示，**Qwen 系列生态仍然势头强劲**：从 Qwen-2.5-1B 的轻量实验模型，到基于 qwen3_5_text 的 NeoHorse-1-9B，社区围绕 Qwen 权重进行结构化生成、agentic 能力和本地部署的二次创新。开源权重仍是 Hugging Face 生态活跃度的主要来源，开发者更关注可下载、可量化、可本地运行的模型，而不是仅提供 API 的闭源模型。量化方向继续升温，GGUF、llama.cpp、ternary、2-bit 等关键词说明社区正在积极探索更低显存、更低成本的大模型推理方案。

---

## 4. 值得探索

1. **[TokenRhythm/NeoHorse-1-9B](https://huggingface.co/TokenRhythm/NeoHorse-1-9B)**  
   下载量达到 9,856，远高于其他上榜模型，且带有 agentic 标签，适合重点研究其在工具调用、任务规划或智能体场景中的表现。

2. **[prism-ml/Ternary-Bonsai-2-27B-gguf](https://huggingface.co/prism-ml/Ternary-Bonsai-2-27B-gguf)**  
   作为 27B 级别的 ternary / 2-bit GGUF 模型，值得评估其在 llama.cpp 本地推理中的速度、显存占用与效果折中。

3. **[harshatheg/Qwen-2.5-1B-RLCD](https://huggingface.co/harshatheg/Qwen-2.5-1B-RLCD)**  
   体量小、标签明确，聚焦 structured generation、constrained decoding 和 Apple Silicon，对于研究端侧结构化输出非常有参考价值。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*