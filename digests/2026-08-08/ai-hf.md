# Hugging Face 热门模型日报 2026-08-08

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-08-08 00:03 UTC

---

# Hugging Face 热门模型日报（2026-08-08）

## 今日速览
今天 Hugging Face 热榜几乎被**视频生成**相关模型包揽，且高度集中在 **MiniMax-H3** 生态上，说明社区正在快速围绕这一家族做适配、封装与工作流整合。  
榜单前三均与 **image-to-video / text-to-video** 相关，反映出当前最受关注的方向已从静态图像转向可控视频生成。  
同时，社区作者在不同框架（Diffusers、Transformers、ComfyUI）上的同步适配，表明热门趋势不仅是“模型本身”，更是“可用性与集成度”。  
目前下载数均为 0，说明这些条目更像是**新鲜发布/快速上榜**，后续是否形成真实使用热度值得继续观察。

---

## 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- 当前暂无进入榜单的语言模型。

### 🎨 多模态与生成（图像、视频、音频、文本到X）

1. **[lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo)**  
   - 作者：lightx2v  
   - 点赞：126 | 下载：0  
   - 一句话说明：这是一个面向 **image-to-video** 的生成模型/封装，标签覆盖 t2v、i2v、r2v，说明它主打多种视频生成入口，因此在趋势榜上很靠前。

2. **[SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3)**  
   - 作者：SexGod1979  
   - 点赞：112 | 下载：0  
   - 一句话说明：这是一个 **text-to-video** 模型，基于 MiniMax-H3 生态并标注了 endpoints_compatible，便于部署调用，因此受到关注。

### 🔧 专用模型（代码、数学、医疗、嵌入）
- 当前暂无进入榜单的专用模型。

### 📦 微调与量化（社区微调、GGUF、AWQ）

3. **[Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy)**  
   - 作者：Kijai  
   - 点赞：105 | 下载：0  
   - 一句话说明：这是一个面向 **ComfyUI 工作流** 的 MiniMax-H3 适配项目，虽然任务字段为 N/A，但从命名看更像社区集成/微调式封装，因此在实用性上很受欢迎。

---

## 生态信号
本期榜单几乎被 **MiniMax-H3** 相关条目占据，说明这一模型家族正在形成明显的社区势头，尤其是在**视频生成**赛道。当前热度更偏向**开源可用性**：作者们通过 Diffusers、Transformers、ComfyUI 等不同栈进行适配，体现出“谁更容易接入、谁更容易被尝试”正在影响点赞排名。相比封闭式产品，社区更青睐可本地部署、可端点化、可工作流化的权重与封装；同时，虽然本期没有典型量化条目，但“可集成”的微调/封装活动非常活跃。

---

## 值得探索
1. **[lightx2v/Minimax-h3-Turbo](https://huggingface.co/lightx2v/Minimax-h3-Turbo)**  
   理由：点赞最高，且同时覆盖 i2v/t2v/r2v 等入口，最值得优先观察其能力边界与生成稳定性。

2. **[SexGod1979/PinkCherry_MiniMax-H3](https://huggingface.co/SexGod1979/PinkCherry_MiniMax-H3)**  
   理由：明确的 text-to-video 路线，并标注 endpoints_compatible，适合关注实际部署与调用体验。

3. **[Kijai/MiniMax-H3_comfy](https://huggingface.co/Kijai/MiniMax-H3_comfy)**  
   理由：若你关注创作工作流，这类 ComfyUI 适配项目往往最接近真实用户场景，值得研究其集成方式。

如果你愿意，我也可以把这份日报进一步整理成**表格版**或**适合公众号发布的简报版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*