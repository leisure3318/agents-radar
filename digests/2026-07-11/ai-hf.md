# Hugging Face 热门模型日报 2026-07-11

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 2 个模型 | 生成时间: 2026-07-11 01:03 UTC

---

# Hugging Face 热门模型日报（2026-07-11）

## 1) 今日速览
今天 Hugging Face Hub 的热点几乎被**视频生成**方向占据，且都围绕“更可控、更接近真实身份/场景”的生成能力展开。榜首模型强调 **身份保持（identity preservation）**，说明社区对“可用、可控”的视频生成需求持续升温。另一款热门模型则以 **30B 级别的 Video MoE + Diffusers 管线** 形式出现，体现出大模型视频推理正在向工程化、可复用的开放生态推进。整体来看，当前趋势不是单纯追求更大，而是更重视**身份一致性、可部署性和开源可集成性**。

---

## 2) 热门模型

### 🎨 多模态与生成（图像、视频、音频、文本到X）

#### 1. [Alissonerdx/LTX-Best-Face-ID](https://huggingface.co/Alissonerdx/LTX-Best-Face-ID)
- **作者**：Alissonerdx  
- **点赞**：83  
- **下载**：0  
- **一句话说明**：这是一个面向 **text-to-video** 的身份保持模型，聚焦参考图/人脸一致性生成；之所以上榜，主要因为“**让视频里的角色保持同一个人**”是当前视频生成最受关注的能力之一。  
- **标签**：ltx-video, ltx-2, identity-preservation, ipt2v, reference-to-video

#### 2. [robbyant/lingbot-video-moe-30b-a3b](https://huggingface.co/robbyant/lingbot-video-moe-30b-a3b)
- **作者**：robbyant  
- **点赞**：75  
- **下载**：317  
- **一句话说明**：这是一个基于 **Diffusers** 的 **Video MoE 30B** 模型发布，强调可通过标准生成管线调用；能进入趋势榜，反映出社区对“大参数视频模型 + 开源推理栈”的关注度持续提升。  
- **标签**：diffusers, safetensors, license:apache-2.0, diffusers:LingBotVideoPipeline, region:us

### 🧠 语言模型（LLM、对话模型、指令微调）
- 今日暂无上榜模型

### 🔧 专用模型（代码、数学、医疗、嵌入）
- 今日暂无上榜模型

### 📦 微调与量化（社区微调、GGUF、AWQ）
- 今日暂无上榜模型

---

## 3) 生态信号
视频生成仍是最活跃赛道，且热点集中在**身份一致性**与**可控生成管线**两条主线。LTX 系列与 Video MoE 这类模型家族继续吸引关注，说明开源视频模型正从“能生成”走向“能稳定生产”。同时，Apache-2.0 与 diffusers 管线的出现，反映出社区更偏好**可集成、可落地**的开放权重方案，而非纯封闭服务。量化与微调活动在今天榜单上不多，但“参考到视频”“身份保持”这类定制化方向本身就是新一轮微调需求的前兆。

---

## 4) 值得探索
1. **[Alissonerdx/LTX-Best-Face-ID](https://huggingface.co/Alissonerdx/LTX-Best-Face-ID)**  
   值得重点尝试，适合研究**参考图驱动的视频身份保持**，对短视频、虚拟人、角色一致性很有价值。

2. **[robbyant/lingbot-video-moe-30b-a3b](https://huggingface.co/robbyant/lingbot-video-moe-30b-a3b)**  
   值得关注其 **30B MoE + Diffusers** 的工程实现思路，适合研究大规模视频生成模型的开放部署路径。

如需，我也可以把这份日报进一步整理成**适合公众号发布的排版版式**或**表格版周报模板**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*