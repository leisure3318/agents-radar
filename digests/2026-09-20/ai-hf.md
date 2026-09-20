# Hugging Face 热门模型日报 2026-09-20

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-09-20 03:56 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-09-20**

## 1. 今日速览

今日 Hugging Face 热榜呈现出三条主线：一是 **Qwen 系模型生态继续扩张**，不仅出现在分类 / NLI 场景，也进入多模态与量化部署链路。二是 **GGUF、混合精度、量化优化** 仍是社区关注重点，说明本地化、低成本推理需求持续升温。三是音频与音乐方向出现新的 tokenizer / LoRA 组件，反映生成式音频生态正在从端到端模型走向更细粒度的模块化建设。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### [AlexWortega/openjev](https://huggingface.co/AlexWortega/openjev)  
- **作者**：AlexWortega  
- **点赞数**：226  
- **下载数**：0  
- **任务**：text-classification  
- **一句话说明**：这是一个带有 NLI / cross-encoder 标签的文本分类模型，并结合 Qwen3.5 生态，因其面向语义判断与分类任务的实用性登上趋势榜。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF)  
- **作者**：ISTA-DASLab  
- **点赞数**：174  
- **下载数**：31,099  
- **任务**：image-text-to-text  
- **一句话说明**：这是一个面向图文到文本任务的 Qwen3.8 Flash Next 量化 GGUF 版本，因多模态能力与高下载量受到社区关注。

#### [Mothersuperior/yue2-mothersuperior-realaudio-tokenizer-v4](https://huggingface.co/Mothersuperior/yue2-mothersuperior-realaudio-tokenizer-v4)  
- **作者**：Mothersuperior  
- **点赞数**：155  
- **下载数**：0  
- **任务**：N/A  
- **一句话说明**：这是面向 Yue2 音乐 / 音频生成生态的 realaudio tokenizer v4，并带有 LoRA 标签，显示出音频生成工具链的活跃演进。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

暂无明确归入该类别的模型。今日榜单中的模型主要集中在文本分类、多模态推理、音频 tokenizer 与量化部署方向。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF)  
- **作者**：ISTA-DASLab  
- **点赞数**：174  
- **下载数**：31,099  
- **任务**：image-text-to-text  
- **一句话说明**：该模型采用 GGUF、GSQ、RCO 与 mixed-precision 等标签，代表社区对高效量化、多端部署和低资源推理的持续投入。

#### [Mothersuperior/yue2-mothersuperior-realaudio-tokenizer-v4](https://huggingface.co/Mothersuperior/yue2-mothersuperior-realaudio-tokenizer-v4)  
- **作者**：Mothersuperior  
- **点赞数**：155  
- **下载数**：0  
- **任务**：N/A  
- **一句话说明**：该项目带有 tokenizer 与 LoRA 标签，说明音乐 / 音频生成生态正在通过可替换组件和轻量微调方式加速迭代。

---

## 3. 生态信号

今日榜单中，**Qwen 家族势头最明显**：从 Qwen3.5 相关文本分类，到 Qwen3.8 Flash Next 多模态 GGUF 量化版本，显示其已覆盖分类、推理、多模态和本地部署场景。开源权重与社区再分发仍具强吸引力，尤其是 GGUF、混合精度、量化压缩等方向，正成为模型落地的关键环节。同时，音频生成生态开始重视 tokenizer、LoRA 等底层模块，说明社区正在从“发布大模型”转向“构建可组合工具链”。

---

## 4. 值得探索

1. **[ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-GGUF)**  
   下载量高达 31,099，且结合 GGUF、混合精度和量化优化，适合研究本地多模态推理与低成本部署。

2. **[AlexWortega/openjev](https://huggingface.co/AlexWortega/openjev)**  
   点赞数最高，适合关注 NLI、cross-encoder、文本分类和 Qwen3.5 生态应用的开发者评估。

3. **[Mothersuperior/yue2-mothersuperior-realaudio-tokenizer-v4](https://huggingface.co/Mothersuperior/yue2-mothersuperior-realaudio-tokenizer-v4)**  
   值得音频生成和音乐模型研究者探索，尤其适合观察 Yue2 生态中 tokenizer 与 LoRA 组件化的发展方向。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*