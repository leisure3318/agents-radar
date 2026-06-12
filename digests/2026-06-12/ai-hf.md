# Hugging Face 热门模型日报 2026-06-12

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 2 个模型 | 生成时间: 2026-06-12 01:58 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-06-12**

## 1) 今日速览
今天的热门榜单很“轻量”，但信号很明确：**视频生成**和**高效大模型推理**仍是社区关注的两条主线。  
其中，**zai-org/SCAIL-2** 代表了更具表现力的 **image-to-video / pose-driven** 生成方向，适合角色动画与可控视频生成。  
**XiaomiMiMo/MiMo-V2.5-Pro-FP4-DFlash** 则体现了另一种趋势：在保持模型能力的同时，进一步向 **低精度量化与高效部署** 靠拢。  
整体看，当前榜单更偏向“**实用落地 + 计算效率**”，而不是单纯拼参数规模。  

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
#### 1. [XiaomiMiMo/MiMo-V2.5-Pro-FP4-DFlash](https://huggingface.co/XiaomiMiMo/MiMo-V2.5-Pro-FP4-DFlash)
- **作者**：XiaomiMiMo  
- **点赞**：86  
- **下载**：660  
- **一句话说明**：这是一个面向文本生成与 Agent 场景的 **MiMo 系列高效版本**，采用 **FP4** 低精度形态，说明它在“模型效果 + 推理效率”之间做了强平衡，因此容易受到开发者关注。  

---

### 🎨 多模态与生成（图像、视频、音频、文本到X）
#### 1. [zai-org/SCAIL-2](https://huggingface.co/zai-org/SCAIL-2)
- **作者**：zai-org  
- **点赞**：116  
- **下载**：0  
- **一句话说明**：这是一个 **image-to-video** 模型，标签显示其强调 **character-animation、pose-driven** 等可控生成能力，代表当前多模态生成从“能生成”走向“能精细控制”的趋势。  

---

### 🔧 专用模型（代码、数学、医疗、嵌入）
- **暂无入榜模型**

---

### 📦 微调与量化（社区微调、GGUF、AWQ）
#### 1. [XiaomiMiMo/MiMo-V2.5-Pro-FP4-DFlash](https://huggingface.co/XiaomiMiMo/MiMo-V2.5-Pro-FP4-DFlash)
- **作者**：XiaomiMiMo  
- **点赞**：86  
- **下载**：660  
- **一句话说明**：该模型的 **FP4** 标识非常关键，说明社区正在积极推动 **更低显存、更高吞吐** 的部署形态，适合本地推理和边缘侧部署探索。  

---

## 3) 生态信号
本期榜单显示：**MiMo** 这类国产大模型家族在高效推理方向持续发力，而 **zai-org** 代表的视频生成路线则强化了多模态可控生成的热度。开源权重依旧是 Hugging Face 的主流创新载体，尤其在可复现、可微调、可部署方面优势明显。值得注意的是，**FP4 量化** 这类超低精度形态开始获得更多关注，说明社区正从“训练能力竞争”转向“推理成本竞争”。

---

## 4) 值得探索
1. **[XiaomiMiMo/MiMo-V2.5-Pro-FP4-DFlash](https://huggingface.co/XiaomiMiMo/MiMo-V2.5-Pro-FP4-DFlash)**  
   值得研究其 FP4 低精度部署效果，适合关注 Agent 应用与高性价比推理的团队。

2. **[zai-org/SCAIL-2](https://huggingface.co/zai-org/SCAIL-2)**  
   适合做角色动画、姿态驱动视频生成实验，尤其适合研究可控视频生成链路。

3. **MiMo 系列相关模型**  
   如果你关注“模型压缩后还能保留多少能力”，MiMo 的量化/推理版本值得持续跟踪。  

如需，我可以继续把这份日报扩展成 **“带趋势解读的完整版”**，或改成 **适合公众号/飞书周报的排版格式**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*