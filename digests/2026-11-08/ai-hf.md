# Hugging Face 热门模型日报 2026-11-08

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-11-08 02:40 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-08**  
*基于提供的 3 个热门模型条目整理，按周点赞热度观察；模型能力、权重来源及许可证未独立核验。*

## 今日速览

今日样本呈现“**语言模型吸引关注、视频工具拉动下载**”的分化：两款语言模型合计获得 739 次点赞，Viggle-Remake 则以 64,942 次下载明显领先。带有 `qwen3_5` 标签的模型占据两席，显示该家族在社区微调中的活跃度。社区的“UNCENSORED”定位与 NousResearch 的监督微调路线同时受到关注，但标签与命名不等于能力验证。视频角色替换是本次榜单中最鲜明的应用方向，不过下载量不等同于实际用户数。

## 热门模型

*以下按主要定位归类，不重复列出；标签交叉信息在条目中说明。*

### 🧠 语言模型（LLM、对话模型、指令微调）

**[NousResearch/Arete-27B](https://huggingface.co/NousResearch/Arete-27B)**  
- **作者：** NousResearch  
- **点赞：** 217 ｜ **下载：** 989  
- **一句话说明：** 一款名称标示为 27B、带有 `qwen3_5` 与监督微调标签的文本生成模型，是本次榜单中值得关注的机构微调发布。

### 🎨 多模态与生成（图像、视频、音频、文本到 X）

**[Viggle/Viggle-Remake](https://huggingface.co/Viggle/Viggle-Remake)**  
- **作者：** Viggle  
- **点赞：** 170 ｜ **下载：** 64,942  
- **一句话说明：** 面向视频编辑与角色替换的 video-to-video 模型，以远高于其余两款的下载量，成为本次样本中最突出的应用型生成项目。
- **标签提示：** 含 `gguf` 标签，但具体量化文件、精度与运行方式仍需查阅仓库。

### 🔧 专用模型（代码、数学、医疗、嵌入）

本次提供的榜单中，**暂无明确属于上述专用领域的模型**。

### 📦 微调与量化（社区微调、GGUF、AWQ）

**[xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic](https://huggingface.co/xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic)**  
- **作者：** xtools-at  
- **点赞：** 522 ｜ **下载：** 1,369  
- **一句话说明：** 一款名称标示为 9B、以“UNCENSORED/heretic”为定位的社区文本生成模型，以本次样本最高点赞数体现出对差异化行为微调的关注。
- **来源提示：** 名称同时出现 DeepSeek 与 Qwen，不能据此确认其官方归属或技术来源；`image-text-to-text` 标签也不足以单独证明视觉能力。

## 生态信号

本次三个样本中，两款带有 `qwen3_5` 标签，显示 Qwen 相关微调仍具社区热度；监督微调与“去审查”定位并行，反映不同的模型行为诉求。榜单体现的是可下载模型生态的活跃，不能据此判断其相对闭源服务的份额变化。Viggle 的高下载量凸显视频工具需求，其 `gguf` 标签值得追踪，但量化规格及部署收益仍待核验。

## 值得探索

1. **[NousResearch/Arete-27B](https://huggingface.co/NousResearch/Arete-27B)**  
   适合研究监督微调的实际收益：优先比较指令遵循、输出风格及相对基础模型的提升，再评估部署成本。

2. **[Viggle/Viggle-Remake](https://huggingface.co/Viggle/Viggle-Remake)**  
   适合视频创作者与应用开发者试用，重点验证角色替换质量、时序一致性、处理速度及素材使用授权。

3. **[xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic](https://huggingface.co/xtools-at/DeepSeek-V4-Pro-Qwen3.5-9B-UNCENSORED-heretic)**  
   适合开展行为微调对照研究；建议先核对基础权重、修改方法与许可证，再测试其拒答变化是否伴随准确性或稳定性损失。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*