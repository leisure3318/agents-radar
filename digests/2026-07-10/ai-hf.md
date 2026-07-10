# Hugging Face 热门模型日报 2026-07-10

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 4 个模型 | 生成时间: 2026-07-10 01:13 UTC

---

# Hugging Face 热门模型日报（2026-07-10）

## 今日速览
今天榜单呈现出“**大模型底座 + 社区量化 + 路由/专用组件**”的组合特征：NVIDIA 75B 级模型依然具备强关注度，而社区对可本地部署的 GGUF 量化版本也保持高热情。  
同时，带有 **thinking** 标签的 MiniCPM5 衍生模型说明推理增强仍是社区热点。  
另一个值得注意的信号是，像 **Giga-World-1** 这类带有 diffusers 标签的生成式项目，尽管下载尚未起量，仍能靠点赞进入榜单，说明发布预热和概念关注度正在增强。  
整体看，生态正在从“单一聊天模型竞争”转向“**基础模型能力 + 部署形态 + 任务编排组件**”的多层竞争。

---

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
1. **[nvidia/NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-NVFP4)**  
   - 作者：nvidia  
   - 点赞：85 | 下载：16,959  
   - 一句话说明：一款 75B 级别的高性能文本生成模型，下载量远高于其他热门项，说明其在开发者侧已有较强实际使用需求。

2. **[SupraLabs/Supra-Router-51M](https://huggingface.co/SupraLabs/Supra-Router-51M)**  
   - 作者：SupraLabs  
   - 点赞：73 | 下载：722  
   - 一句话说明：一个轻量级 router 模型，用于多模型/多路径调度，属于“模型系统化”趋势下的重要基础组件。

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）
1. **[open-gigaai/Giga-World-1](https://huggingface.co/open-gigaai/Giga-World-1)**  
   - 作者：open-gigaai  
   - 点赞：87 | 下载：0  
   - 一句话说明：从标签看更像基于 diffusers 的生成式模型/项目，虽然尚未产生下载，但高点赞显示社区对其概念、视觉能力或发布预期关注度很高。

---

### 🔧 专用模型（代码、数学、医疗、嵌入）
- 暂无独立入榜的典型代码/医疗/嵌入模型；但 **Supra-Router-51M** 这类路由组件可视为“专用编排模型”的代表。

---

### 📦 微调与量化（社区微调、GGUF、AWQ）
1. **[GnLOLot/MiniCPM5-1B-Claude-Opus-Fable5-Thinking-GGUF](https://huggingface.co/GnLOLot/MiniCPM5-1B-Claude-Opus-Fable5-Thinking-GGUF)**  
   - 作者：GnLOLot  
   - 点赞：142 | 下载：2,239  
   - 一句话说明：基于 MiniCPM5 的社区 GGUF 量化版，带有 thinking 特征，体现出“小模型 + 强推理 + 本地部署”这条路线的持续升温。

---

## 生态信号
本期最明显的趋势是 **开源大模型仍在扩张，但“可部署性”成为热度放大器**：GGUF 量化、轻量路由器、推理增强微调版本都获得较高关注。NVIDIA 的 75B 模型显示出企业级开源权重依然具备强吸引力；而社区 fork/量化版则在下载与点赞之间形成互补。总体上，**开源权重主导讨论，闭源能力通过社区蒸馏、量化和工具化被快速吸收**。  

---

## 值得探索
1. **[GnLOLot/MiniCPM5-1B-Claude-Opus-Fable5-Thinking-GGUF](https://huggingface.co/GnLOLot/MiniCPM5-1B-Claude-Opus-Fable5-Thinking-GGUF)**  
   理由：适合观察“小参数 + 推理增强 + 本地化部署”的实际效果，是社区实践价值最高的条目之一。

2. **[nvidia/NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-NVFP4](https://huggingface.co/nvidia/NVIDIA-Nemotron-Labs-3-Puzzle-75B-A9B-NVFP4)**  
   理由：下载量突出，适合关注大参数模型在工程侧的落地与性能/成本权衡。

3. **[SupraLabs/Supra-Router-51M](https://huggingface.co/SupraLabs/Supra-Router-51M)**  
   理由：路由模型代表“模型系统化”趋势，适合研究多模型协同、任务分发与推理编排。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*