# Hugging Face 热门模型日报 2026-08-11

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-08-11 01:51 UTC

---

# Hugging Face 热门模型日报（2026-08-11）

## 1) 今日速览
今天的榜单几乎被 **Muse-Glimmer-30B** 系列包揽，说明大参数量的 **图文多模态模型** 仍然是社区关注焦点。  
同一底座同时出现原版与 **GGUF** 社区量化版本，体现出“**先看能力、再看部署**”的扩散路径。  
此外，**prompt rewriting LoRA** 进入热门榜，说明轻量微调与任务型适配依然有稳定需求。  
整体来看，热门发布正在从“单模型发布”转向“**底座 + 量化 + 适配器**”的生态组合。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- **暂无入榜**

### 🎨 多模态与生成（图像、视频、音频、文本到X）
1. **[meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B)**  
   - 作者：meta-models  
   - 点赞数：743 | 下载数：0  
   - 一句话说明：30B 级别的 **image-text-to-text** 多模态模型，点赞领先，说明社区对高能力图文推理/对话底座高度关注。

2. **[unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF)**  
   - 作者：unsloth  
   - 点赞数：214 | 下载数：0  
   - 一句话说明：Muse-Glimmer-30B 的 **GGUF** 社区封装版本，热度来自“同底座、易本地部署”的实用价值。

3. **[meta-models/Muse-Glimmer-30B-GGUF](https://huggingface.co/meta-models/Muse-Glimmer-30B-GGUF)**  
   - 作者：meta-models  
   - 点赞数：153 | 下载数：0  
   - 一句话说明：官方/原作者发布的 GGUF 版本，补齐本地推理与轻量部署场景，和原版形成完整生态链。

### 🔧 专用模型（代码、数学、医疗、嵌入）
- **暂无入榜**

### 📦 微调与量化（社区微调、GGUF、AWQ）
1. **[lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA)**  
   - 作者：lightx2v  
   - 点赞数：116 | 下载数：268  
   - 一句话说明：面向 **prompt rewriting** 的 LoRA 微调模型，下载数高于点赞数，说明它更偏“可直接拿来用”的工具型需求。

---

## 3) 生态信号
本期最强势的仍是 **Muse-Glimmer-30B** 家族：原版、多种 GGUF 版本同步上榜，显示多模态大模型已从“展示能力”进入“可部署、可分发、可本地化”的阶段。社区在量化包装上的活跃，说明 **开源权重 + 轻量推理格式** 正在成为主流路径；相比闭源模型，HF 热门榜更偏向可复现、可改造的开放生态。LoRA 微调项目上榜，则表明细分任务适配仍有稳定市场。

---

## 4) 值得探索
1. **[meta-models/Muse-Glimmer-30B](https://huggingface.co/meta-models/Muse-Glimmer-30B)**  
   适合优先研究底座能力，代表本期最核心的趋势样本。

2. **[unsloth/Muse-Glimmer-30B-GGUF](https://huggingface.co/unsloth/Muse-Glimmer-30B-GGUF)**  
   适合关注本地推理、量化部署与社区二次分发效率。

3. **[lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA](https://huggingface.co/lightx2v/MiniMax-H3-Prompt-Rewriter-LoRA)**  
   适合研究轻量微调如何把通用模型快速改造成任务工具。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*