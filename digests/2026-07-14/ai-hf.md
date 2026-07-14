# Hugging Face 热门模型日报 2026-07-14

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 3 个模型 | 生成时间: 2026-07-14 00:58 UTC

---

# Hugging Face 热门模型日报  
**日期：2026-07-14**  
**榜单范围：周点赞 Top 3**

## 1) 今日速览
今天的热门模型几乎被 **Qwythos** 与 **GLM** 两个家族占据，说明社区关注点仍集中在可落地、可本地部署的开源权重模型。  
其中 **Qwythos-9B-v2-GGUF** 以 **45,189** 下载量明显领跑，体现出 GGUF / llama.cpp 生态对端侧与本地推理的强需求。  
与此同时，**Qwythos-9B-v2** 的基础版也保持高热度，说明用户不仅想要“能跑”，也在关注原始权重与后续微调空间。  
**GLM-5.2-colibri-int4** 则代表了更轻量的 **int4 + CPU + MoE** 路线，反映出低成本部署正在成为重要趋势。

---

## 2) 热门模型

### 🧠 语言模型（LLM、对话模型、指令微调）
- **[empero-ai/Qwythos-9B-v2](https://huggingface.co/empero-ai/Qwythos-9B-v2)**  
  作者：empero-ai ｜ 点赞：97 ｜ 下载：2,476  
  一句话说明：这是 Qwythos 系列的基础版开放权重模型，面向文本生成与图文对话场景；进入趋势榜，主要因为其作为“原始版本”具备更强的可微调性和研究价值。

### 🎨 多模态与生成（图像、视频、音频、文本到X）
- **[empero-ai/Qwythos-9B-v2-GGUF](https://huggingface.co/empero-ai/Qwythos-9B-v2-GGUF)**  
  作者：empero-ai ｜ 点赞：104 ｜ 下载：45,189  
  一句话说明：这是 Qwythos-9B-v2 的 GGUF 量化版本，支持更便捷的本地/离线推理，且任务标注为 image-text-to-text；高下载量说明社区对“图文能力 + 轻量部署”的组合需求非常强。

### 🔧 专用模型（代码、数学、医疗、嵌入）
- **本日报暂无单独上榜的垂类专用模型。**  
  但从 **GLM-5.2-colibri-int4** 的 CPU、MoE、expert-streaming 标签来看，已经明显具备面向特定推理场景优化的特征。

### 📦 微调与量化（社区微调、GGUF、AWQ）
- **[jlnsrk/GLM-5.2-colibri-int4](https://huggingface.co/jlnsrk/GLM-5.2-colibri-int4)**  
  作者：jlnsrk ｜ 点赞：86 ｜ 下载：1,997  
  一句话说明：这是 GLM-5.2 的 int4 量化版本，强调 CPU 友好与 MoE 推理效率；上榜说明社区对“低资源可运行”的模型需求正在持续升温。

---

## 3) 生态信号
当前势头最强的是 **Qwythos** 和 **GLM** 这类“可直接部署”的开放模型家族；其中 Qwythos 系列同时覆盖基础版与 GGUF 量化版，形成了从研究到落地的完整链路。整体上仍是 **开源权重明显占优**，闭源 API 型模型并未出现在趋势榜前列。值得注意的是，**GGUF、int4、llama.cpp、CPU** 这些标签频繁出现，说明社区对低门槛、本地化、端侧推理的偏好正在强化，微调与量化已成为模型传播的重要加速器。

---

## 4) 值得探索
1. **[empero-ai/Qwythos-9B-v2-GGUF](https://huggingface.co/empero-ai/Qwythos-9B-v2-GGUF)**  
   下载量最高，适合研究本地推理、GGUF 分发与量化效果。

2. **[empero-ai/Qwythos-9B-v2](https://huggingface.co/empero-ai/Qwythos-9B-v2)**  
   作为基础权重版本，最适合做二次微调、对比量化前后性能。

3. **[jlnsrk/GLM-5.2-colibri-int4](https://huggingface.co/jlnsrk/GLM-5.2-colibri-int4)**  
   适合关注 CPU / 低成本部署与 MoE 推理优化的研究者。

如果你愿意，我也可以把这份日报进一步整理成 **适合公众号发布的版式** 或 **更像行业简报的表格版**。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*