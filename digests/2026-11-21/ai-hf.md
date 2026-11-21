# Hugging Face 热门模型日报 2026-11-21

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 6 个模型 | 生成时间: 2026-11-21 02:59 UTC

---

# Hugging Face 热门模型日报
**日期：2026-11-21**

> 本报基于所提供的 6 个模型快照整理，未独立核验仓库内容。榜单按周点赞数排序，列示的点赞数未注明统计周期，不宜据此重新排序；下载为 0 也不等同于无人使用。

## 一、今日速览

今日关注焦点是 **Inkling-2-Mini**：原始模型与社区 GGUF 版本同时上榜，呈现出模型发布与轻量部署适配相互带动的趋势。腾讯 **Hy4** 同样进入榜单，多模态理解是本次样本中最突出的通用模型方向。苹果 **DepthPro2** 与 Meta **sam-3d-body-dinov3** 则将关注点延伸至深度估计和三维人体重建，后者以 17,319 次下载体现出更明显的使用热度。**Sentinel7/h3** 虽获得较多点赞，但任务与技术信息不足，暂宜观察而非判断能力。

## 二、热门模型

### 🧠 语言模型
**本次样本暂无可明确归为纯语言模型的条目。** 具有对话标签的 Inkling 系列按其多模态任务及量化形态归入下列分类。

### 🎨 多模态与生成

#### [thinkingmachines/Inkling-2-Mini](https://huggingface.co/thinkingmachines/Inkling-2-Mini)
- **作者：** thinkingmachines ｜ **点赞：** 744 ｜ **下载：** 136
- **一句话说明：** 图文输入、文本输出的多模态对话模型，在所给周榜中居首，并已有社区 GGUF 版本跟进，是本轮关注焦点。

#### [tencent/Hy4](https://huggingface.co/tencent/Hy4)
- **作者：** tencent ｜ **点赞：** 127 ｜ **下载：** 89
- **一句话说明：** 带有 Hunyuan 标识的图文到文本模型，为榜单中的另一项多模态理解方向供给，具体能力仍需结合模型卡和评测确认。

### 🔧 专用模型

#### [apple/DepthPro2](https://huggingface.co/apple/DepthPro2)
- **作者：** apple ｜ **点赞：** 132 ｜ **下载：** 0
- **一句话说明：** 面向深度估计的视觉模型，标签覆盖度量深度、单目深度与视频深度，值得空间感知和三维视觉开发者关注。

#### [facebook/sam-3d-body-dinov3](https://huggingface.co/facebook/sam-3d-body-dinov3)
- **作者：** facebook ｜ **点赞：** 1,701 ｜ **下载：** 17,319
- **一句话说明：** 面向三维人体网格恢复与人体姿态估计的专用模型，在本次样本中列示点赞数和下载数均最高，呈现较强的社区关注与使用信号。

### 📦 微调与量化

#### [unsloth/Inkling-2-Mini-GGUF](https://huggingface.co/unsloth/Inkling-2-Mini-GGUF)
- **作者：** unsloth ｜ **点赞：** 235 ｜ **下载：** 0
- **一句话说明：** Inkling-2-Mini 的社区 GGUF 版本，与原始模型同时上榜，反映出围绕本地推理和轻量部署的需求；具体量化档位及兼容性需查阅仓库。

### ❔ 待分类：信息不足

#### [Sentinel7/h3](https://huggingface.co/Sentinel7/h3)
- **作者：** Sentinel7 ｜ **点赞：** 310 ｜ **下载：** 0
- **一句话说明：** 当前仅提供区域标签，无法判断任务、架构或权重状态；其上榜说明关注度较高，但尚不足以判断技术价值。

## 三、生态信号

Inkling 家族势头最明显：原始模型与 Unsloth GGUF 版本同时入榜，显示关注正从模型本身延伸至部署适配。Hy4 则强化了多模态理解方向的存在感。深度估计与三维人体恢复也占据席位，说明热度并非只围绕聊天模型。社区量化已有可见活动，但样本未提供许可证、权重可用性或闭源对照，不能据此断言开源权重正在压过闭源服务。

## 四、值得探索

1. **[Inkling-2-Mini](https://huggingface.co/thinkingmachines/Inkling-2-Mini)**  
   适合优先评估图文问答与多模态对话能力；可结合其 [GGUF 版本](https://huggingface.co/unsloth/Inkling-2-Mini-GGUF)，比较质量、内存占用与推理速度。

2. **[sam-3d-body-dinov3](https://huggingface.co/facebook/sam-3d-body-dinov3)**  
   适合人体姿态、动作分析及数字人方向研究；较高下载量使其成为值得优先核查工具链与实际效果的专用模型。

3. **[DepthPro2](https://huggingface.co/apple/DepthPro2)**  
   适合关注空间感知的团队，重点验证度量深度精度、跨场景泛化，以及视频深度相关能力与支持范围。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*