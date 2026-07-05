# Hugging Face 热门模型日报 2026-07-05

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-07-05 01:20 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-07-05**  
基于 Hugging Face Hub 周点赞榜（共 3 个模型）

## 今日速览
今天的热门榜单呈现出两个明显方向：一是**主流开源大模型家族继续占据关注度**，如 Qwen3 生态下的社区微调模型，以及 Mistral 体系的衍生模型；二是**更偏基础设施/专用架构的模型开始获得更高下载量**，说明实际落地需求正在上升。  
从数据看，**NVIDIA 的 TwoTower 模型下载显著领先**，但点赞并非最高，反映出“被大量试用”与“社区热度”并不完全一致。  
同时，**社区微调模型仍然很容易在点赞榜上冲高**，尤其是带有 instruct、safetensors、transformers 等典型发布标签的作品。  
整体来看，当前生态仍由**开源权重、可部署、可二次微调**的路线主导。  

---

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
1. **[AliesTaha/fable-traces](https://huggingface.co/AliesTaha/fable-traces)**  
   - 作者：AliesTaha  
   - 点赞：118  
   - 下载：0  
   - 一句话说明：这是一个基于 **Qwen3** 生态的 **instruct / text-generation** 社区模型，属于典型的指令微调方向，说明 Qwen3 相关衍生模型仍有较强关注度。

2. **[mistralai/Leanstral-1.5-119B-A6B](https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B)**  
   - 作者：mistralai  
   - 点赞：100  
   - 下载：4  
   - 一句话说明：来自 Mistral 体系的大参数模型变体，带有 base_model 与 finetune 标记，表明它既有基础模型价值，也可能承载了进一步微调/部署实验，因此进入趋势榜。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）
1. **[nvidia/Nemotron-Labs-TwoTower-30B-A3B-Base-BF16](https://huggingface.co/nvidia/Nemotron-Labs-TwoTower-30B-A3B-Base-BF16)**  
   - 作者：nvidia  
   - 点赞：121  
   - 下载：10,479  
   - 一句话说明：这是一个 **Two-Tower** 架构的基础模型，更偏向检索、表示学习或双塔式应用，下载量极高，说明它不仅“被看见”，而且“被大量使用”。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- **本日榜单暂无相关模型**

---

### 📦 微调与量化（社区微调、GGUF、AWQ）
1. **[AliesTaha/fable-traces](https://huggingface.co/AliesTaha/fable-traces)**  
   - 作者：AliesTaha  
   - 点赞：118  
   - 下载：0  
   - 一句话说明：带有 **instruct** 和 **Qwen3** 相关标签，明显属于社区微调/派生模型，说明“在强基座上做轻量再训练”仍是最活跃的发布形态之一。

2. **[mistralai/Leanstral-1.5-119B-A6B](https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B)**  
   - 作者：mistralai  
   - 点赞：100  
   - 下载：4  
   - 一句话说明：模型标签中包含 **base_model** 与 **finetune** 信息，属于典型的微调链路产物，体现了企业级模型发布中“基座 + 派生版本”的常见策略。

---

## 生态信号
本周热门模型继续体现出 **Qwen3、Mistral、NVIDIA** 等家族的强势存在：前两者更偏社区微调与对话能力延展，后者则显示出基础架构和高效部署路线的热度。整体上，**开源权重明显强于闭源模型的可见度**，热门榜几乎都围绕可下载、可复现、可再训练的模型展开。值得注意的是，**微调标签、基础模型链路、以及两塔/检索类专用架构**的出现频率上升，说明生态正在从“单纯拼参数”转向“拼可用性、可部署性和任务适配能力”。

---

## 值得探索
1. **[nvidia/Nemotron-Labs-TwoTower-30B-A3B-Base-BF16](https://huggingface.co/nvidia/Nemotron-Labs-TwoTower-30B-A3B-Base-BF16)**  
   理由：下载量极高，说明真实需求强；适合研究双塔架构在检索、表示学习或高效推理中的应用价值。

2. **[AliesTaha/fable-traces](https://huggingface.co/AliesTaha/fable-traces)**  
   理由：Qwen3 生态下的社区指令微调样本，适合观察新一代开源基座如何被快速二次开发。

3. **[mistralai/Leanstral-1.5-119B-A6B](https://huggingface.co/mistralai/Leanstral-1.5-119B-A6B)**  
   理由：来自 Mistral 体系的大模型派生版本，适合关注企业级模型发布、微调链路与部署策略。  

如需，我也可以把这份日报继续整理成 **适合公众号/企业晨报风格** 的版本。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*