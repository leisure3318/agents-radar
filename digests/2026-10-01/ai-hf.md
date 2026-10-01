# Hugging Face 热门模型日报 2026-10-01

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 5 个模型 | 生成时间: 2026-10-01 04:44 UTC

---

# Hugging Face 热门模型日报｜2026-10-01

## 1. 今日速览

今日 Hugging Face 热榜的核心信号是：**Qwen3.8 系列及其 GGUF 量化版本正在快速扩散**，多个高下载模型都围绕 Qwen、llama.cpp、本地推理和量化部署展开。图像侧，**Face Swap / Image Edit 类 LoRA** 仍具备极高社区热度，下载量显著领先。与此同时，视觉分类模型与专用 Coder / 多模态模型也进入榜单，说明社区关注点正从单纯大语言模型扩展到更细分的视觉、代码与端侧部署场景。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### [orcarouter/OrcaSAQ-2-Cyber-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/OrcaSAQ-2-Cyber-27B-Uncensored-GGUF)
- 作者：orcarouter  
- 点赞数：199  
- 下载数：7,186  
- 一句话说明：基于 Qwen 系列的 27B GGUF 文本生成模型，面向本地推理与对话/安全研究场景，因 “Cyber + Uncensored + GGUF” 组合获得较高关注。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### [Alissonerdx/BFS-Best-Face-Swap](https://huggingface.co/Alissonerdx/BFS-Best-Face-Swap)
- 作者：Alissonerdx  
- 点赞数：1,060  
- 下载数：168,110  
- 一句话说明：面向图像到图像编辑的 Face Swap LoRA / Diffusers 模型，依托 Qwen-Image-Edit 生态，凭借极高实用性和视觉生成需求登上热榜。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

#### [PSRben/VisionHOPE](https://huggingface.co/PSRben/VisionHOPE)
- 作者：PSRben  
- 点赞数：351  
- 下载数：137  
- 一句话说明：一个图像分类模型，关联 arXiv 论文 `2609.33325`，虽然下载量不高，但凭借新方法或研究发布获得较多点赞。

#### [ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-Coder-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-Coder-GGUF)
- 作者：ISTA-DASLab  
- 点赞数：150  
- 下载数：33,259  
- 一句话说明：面向代码与多模态文本生成场景的 Qwen3.8 Flash Next GGUF 模型，结合 GSQ、RCO、剪枝与量化，适合研究高效推理与 Coder 模型压缩。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [ukisai/Swift-1.5-Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ukisai/Swift-1.5-Qwen3.8-27B-GSQ-RCO-GGUF)
- 作者：ukisai  
- 点赞数：171  
- 下载数：175,005  
- 一句话说明：Qwen3.8 27B 的 GGUF 量化版本，结合 GSQ 与 RCO，下载量极高，反映社区对本地部署大模型的强烈需求。

---

## 3. 生态信号

Qwen3.8 是今日最强势的模型家族，多个上榜模型围绕其进行 GGUF 转换、量化、剪枝和指令/场景微调。本地推理生态继续升温，llama.cpp 与 GGUF 已成为社区分发大模型的重要格式。开源权重仍在加速扩散，社区更关注“可下载、可运行、可改造”的模型，而非仅提供 API 的闭源能力。GSQ、RCO、pruning 等压缩技术也显示出量化路线正在从简单降精度走向更系统的推理优化。

---

## 4. 值得探索

1. **[ukisai/Swift-1.5-Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ukisai/Swift-1.5-Qwen3.8-27B-GSQ-RCO-GGUF)**  
   下载量最高，适合评估 Qwen3.8 27B 在本地推理、量化部署和 llama.cpp 环境下的实际表现。

2. **[Alissonerdx/BFS-Best-Face-Swap](https://huggingface.co/Alissonerdx/BFS-Best-Face-Swap)**  
   图像编辑类模型热度极高，适合研究 Qwen-Image-Edit 生态、LoRA 工作流以及人像编辑应用，但应注意身份、授权与合规使用。

3. **[ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-Coder-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-Flash-Next-GSQ-RCO-Coder-GGUF)**  
   兼具 Coder、量化、剪枝和 GGUF 标签，适合关注代码模型压缩、高效推理和专用模型部署的开发者与研究者。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*