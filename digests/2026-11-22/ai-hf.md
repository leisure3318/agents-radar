# Hugging Face 热门模型日报 2026-11-22

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 2 个模型 | 生成时间: 2026-11-22 01:55 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-22｜样本：2 个模型，按所提供的周点赞榜顺序整理**

## 今日速览

今日样本聚焦社区微调与本地部署：**Inkling-2-Mini-Uncensored-GGUF** 以 GGUF 格式和多模态任务定位，成为值得关注的部署型模型。**Sulphur-3** 则体现出围绕 MiniMax-H3 基座开展衍生微调的社区活动。两者相比，前者下载量更高，后者展示的点赞数更高，但这些指标不足以直接判断模型质量或实际活跃用户规模。本报仅依据所提供的两个条目分析，不代表 Hugging Face 全站趋势；所列点赞数也不直接视为周新增点赞数。

## 热门模型

> 按主要定位归类；跨类别属性另行注明，避免重复计数。

### 🧠 语言模型（LLM、对话模型、指令微调）

**[SulphurAI/Sulphur-3](https://huggingface.co/SulphurAI/Sulphur-3)**  
- **作者：** SulphurAI
- **点赞：** 679｜**下载：** 1,186
- **一句话说明：** 标签显示，这是基于 **MiniMaxAI/MiniMax-H3** 的微调衍生模型，体现出该基座的社区关注度；不过任务字段未填写，具体能力和使用方式仍需查阅模型卡。
- **注意：** 同属社区微调类别；许可证标记为 `other`，商用和再分发前应核查具体条款。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

本次样本中，**Inkling-2-Mini-Uncensored-GGUF** 的任务标记为 `image-text-to-text`，属于图文输入、文本输出方向，详见下方量化类别。样本未提供独立的图像、视频或音频生成模型。

### 🔧 专用模型（代码、数学、医疗、嵌入）

本次样本中暂无明确归属于这些方向的模型，不能据此判断相关领域整体热度。

### 📦 微调与量化（社区微调、GGUF、AWQ）

**[AtomicChat/Inkling-2-Mini-Uncensored-GGUF](https://huggingface.co/AtomicChat/Inkling-2-Mini-Uncensored-GGUF)**  
- **作者：** AtomicChat
- **点赞：** 253｜**下载：** 9,540
- **一句话说明：** 这是带有 `inkling2`、`lora` 和 `uncensored` 标签的 GGUF 格式模型，兼具多模态定位与 llama.cpp 部署生态属性，其较高下载量是值得关注的使用信号。
- **注意：** 具体量化档位、硬件需求及多模态运行方式需查看仓库；`uncensored` 标签不代表能力或安全性经过验证。

## 生态信号

在这两个样本中，Inkling2 与 MiniMax-H3 衍生生态均出现活跃信号，但不足以判断全站家族排名。GGUF、llama.cpp 与 LoRA 标签表明，社区仍重视本地部署和低成本适配；MiniMax-H3 微调条目则体现基座模型向衍生版本扩散。样本偏向可下载模型，无法据此比较开放权重与闭源服务的整体走势；权重可获取也不等于许可证完全开放。

## 值得探索

1. **[Inkling-2-Mini-Uncensored-GGUF](https://huggingface.co/AtomicChat/Inkling-2-Mini-Uncensored-GGUF)**  
   适合关注**本地图文理解与 GGUF 部署**的开发者。建议优先验证推理框架兼容性、显存占用及图文任务表现，而非仅依据下载量选择。

2. **[Sulphur-3](https://huggingface.co/SulphurAI/Sulphur-3)**  
   适合研究 **MiniMax-H3 社区微调路线**。建议重点核查微调目标、与基座的能力差异和许可证条件，判断其是否适合实际应用。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*