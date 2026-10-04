# Hugging Face 热门模型日报 2026-10-04

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-10-04 04:50 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-10-04**

## 1. 今日速览

今日 Hugging Face 热榜主要由 **文本生成模型**占据，说明 LLM 仍是社区关注核心。Aleph-Alpha 发布的 **Kolibri-1** 以 262 周点赞居首，标签显示其主打 reasoning 与 MoE 架构。社区侧，**GGUF / EXL3 等量化格式**继续活跃，Venastine-Research 与 Infatoshi 的模型都体现了本地部署和高效推理需求。整体来看，热门模型集中在“新基础模型 + 社区量化版本”两条主线。

---

## 2. 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）

#### [Aleph-Alpha/Kolibri-1](https://huggingface.co/Aleph-Alpha/Kolibri-1)
- **作者**：Aleph-Alpha  
- **点赞数**：262  
- **下载数**：0  
- **一句话说明**：Kolibri-1 是 Aleph-Alpha 推出的文本生成模型，带有 reasoning、MoE 与 vLLM 标签，因新模型发布和推理能力定位受到关注。

#### [Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw](https://huggingface.co/Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw)
- **作者**：Infatoshi  
- **点赞数**：185  
- **下载数**：520  
- **一句话说明**：这是基于 GLM-5.3 的 EXL3 量化版本，主打低比特本地推理，因此受到关注高性能部署的社区用户欢迎。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）

暂无今日上榜模型。今日热度集中在文本生成与 LLM 量化生态。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）

暂无今日上榜模型。榜单中未出现明确面向代码、数学、医疗或嵌入任务的专用模型。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）

#### [Venastine-Research/Xing4.0-29B-A4B-GGUF](https://huggingface.co/Venastine-Research/Xing4.0-29B-A4B-GGUF)
- **作者**：Venastine-Research  
- **点赞数**：197  
- **下载数**：11,013  
- **一句话说明**：这是 Xing4.0-29B-A4B 的 GGUF 版本，下载量显著领先，说明其在本地推理、llama.cpp 生态或轻量部署场景中有较强吸引力。

#### [Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw](https://huggingface.co/Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw)
- **作者**：Infatoshi  
- **点赞数**：185  
- **下载数**：520  
- **一句话说明**：该模型采用 EXL3 3.0bpw 量化格式，面向显存受限环境下的 GLM 系列高效推理。

---

## 3. 生态信号

今日榜单显示，LLM 生态仍围绕 **推理能力、MoE 架构与本地部署**展开。Aleph-Alpha 的 Kolibri-1 代表机构级新模型发布，GLM 与 Xing 系列则显示开源权重及其衍生版本仍具活力。尤其是 GGUF、EXL3 等量化格式持续走热，说明社区不仅关注模型能力，也高度重视低成本部署、消费级硬件运行与推理效率。

---

## 4. 值得探索

1. **[Aleph-Alpha/Kolibri-1](https://huggingface.co/Aleph-Alpha/Kolibri-1)**  
   值得关注其 reasoning 与 MoE 能力表现，适合研究新一代欧洲 LLM 的架构与定位。

2. **[Venastine-Research/Xing4.0-29B-A4B-GGUF](https://huggingface.co/Venastine-Research/Xing4.0-29B-A4B-GGUF)**  
   下载量最高，说明实际使用需求强，适合本地推理、GGUF 部署和性能评测。

3. **[Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw](https://huggingface.co/Infatoshi/GLM-5.3-UNCENSORED-EXL3-3.0bpw)**  
   适合关注 GLM 生态、EXL3 低比特量化和高效推理方案的开发者进一步测试。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*