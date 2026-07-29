# Hugging Face 热门模型日报 2026-07-29

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 2 个模型 | 生成时间: 2026-07-29 01:03 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-07-29**  
**榜单范围：周点赞数 Top 2**

---

## 1) 今日速览
今天的 Hugging Face 热门榜几乎被 **社区量化包（GGUF）** 和 **多模态底座/衍生模型** 占据，说明本周关注点更偏向“**可本地部署、可直接上手**”的模型形态。  
榜首是 **Qwen3.6 系列的 35B MoE 变体**，并带有明显的 **Hermes 指令微调** 与 **uncensored** 标签，反映出社区对高能力、强对话、低约束模型的持续兴趣。  
另一条值得注意的信号来自 **Kimi-K3-GGUF**：即便下载统计尚未展开，仍能进入热榜，说明该家族在多模态方向的关注度正在快速升温。  
整体来看，热门模型的竞争焦点已从“单纯更大”转向“**底座能力 + 对话对齐 + 量化可部署**”的组合。

---

## 2) 热门模型

### 🎨 多模态与生成（图像、视频、音频、文本到X）
1. **[LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V6-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V6-GGUF)**  
   - 作者：LuffyTheFox  
   - 点赞数：197  
   - 下载数：99,660  
   - 一句话说明：这是一个基于 **Qwen3.6 35B A3B** 的 **GGUF** 社区量化/衍生模型，叠加了 **Hermes 风格指令对齐** 与 **uncensored** 特性，因此在偏本地部署、偏开放式对话的用户群里热度很高。  

2. **[unsloth/Kimi-K3-GGUF](https://huggingface.co/unsloth/Kimi-K3-GGUF)**  
   - 作者：unsloth  
   - 点赞数：87  
   - 下载数：0  
   - 一句话说明：这是 **Kimi-K3** 的 **GGUF** 打包版本，明显面向本地推理与轻量部署场景；尽管下载数显示为 0，但上榜说明该家族的关注度和期待值已经很高。  

### 📦 微调与量化（社区微调、GGUF、AWQ）
1. **[LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V6-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V6-GGUF)**  
   - 作者：LuffyTheFox  
   - 点赞数：197  
   - 下载数：99,660  
   - 一句话说明：该模型本质上是 **Qwen 系列底座的社区微调 + 量化封装**，GGUF 形态让它更适合本地、离线或 CPU/低显存环境使用，因此在“可部署性”赛道上表现突出。  

2. **[unsloth/Kimi-K3-GGUF](https://huggingface.co/unsloth/Kimi-K3-GGUF)**  
   - 作者：unsloth  
   - 点赞数：87  
   - 下载数：0  
   - 一句话说明：Unsloth 继续围绕热门底座做量化生态建设，Kimi-K3-GGUF 体现了社区对 **高质量中文/多模态底座的本地化适配** 需求。  

### 🧠 语言模型（LLM、对话模型、指令微调）
- **暂无单独上榜模型**  
  > 本日榜单中的热门项更偏向“语言模型的量化/衍生发布”，而不是纯粹的原生 LLM 发布。  

### 🔧 专用模型（代码、数学、医疗、嵌入）
- **暂无上榜**

---

## 3) 生态信号
本周最强势的仍是 **Qwen 系列** 与 **Kimi 系列** 这类中文/多模态底座家族，说明国内外社区对高性能开放权重模型的需求持续上升。榜单几乎被 **开源权重 + 社区微调 + GGUF 量化** 组合包占据，表明“能本地跑、能低门槛部署”比纯参数规模更重要。值得注意的是，**Hermes 风格指令微调** 和 **uncensored** 标签依然有市场，反映出部分用户对更强对话自由度的偏好。

---

## 4) 值得探索
1. **[LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V6-GGUF](https://huggingface.co/LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V6-GGUF)**  
   理由：点赞和下载都很高，且集合了“强底座 + 指令对齐 + GGUF 部署友好”三大热门要素，最能代表当前社区趋势。  

2. **[unsloth/Kimi-K3-GGUF](https://huggingface.co/unsloth/Kimi-K3-GGUF)**  
   理由：Kimi-K3 进入热榜说明其生态关注度正在上升，适合观察新一代多模态/中文对话模型的社区接受度。  

---  

如果你愿意，我也可以把这份日报进一步整理成：  
- **适合公众号发布的排版版式**  
- **适合 Slack/飞书周报的一页版**  
- **带“趋势点评”和“风险提示”的分析版**

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*