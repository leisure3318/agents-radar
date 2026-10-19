# AI Skills 新上榜日报 2026-10-19

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-10-19 01:37 UTC

---

今日发现：本期 5 个首次收录条目均来自 Trending（24 小时趋势），集中在通过 inference.sh 的 `belt` CLI 完成图片生成、视频制作与 X 发布。两个不同仓库的 `ai-video-generation` 所提供的 SKILL.md 内容一致，下面按独立 Skill ID 分别列出；安装量是榜单提供的安装量，并非今日新增。

## [ai-avatar-video](https://www.skills.sh/its-a-skill-issue/superpowers/ai-avatar-video)
- **它做什么**：用肖像图片配合文字脚本或音频，生成数字人口播、虚拟讲解员和 UGC 风格视频。文档推荐 `pruna/p-video-avatar`，内置 TTS，可通过 `voice_prompt` 和 `video_prompt` 分别控制声音与画面；也提供 OmniHuman、Fabric 和 PixVerse 路径。完整工作流包括“生成人像→生成口播”，以及“转写→翻译→合成新语音→为原视频重新对口型”。
- **适合谁用**：制作产品演示、课程讲解、营销短片、多语言配音和游戏角色对白的开发者或内容团队。前置条件是安装 inference.sh CLI，并准备肖像、脚本或清晰音频；也可先调用 `pruna/p-image` 生成人像。
- **为什么现在值得看**：进入 Trending，提供的安装量为 **9,796**。值得关注的是它把人像、语音和视频串成了具体工作流，尤其是内置 TTS 路径可以省去单独生成音频的一步。
- **如何使用**：先安装文档要求的 CLI Skill，并确保 `belt` CLI 已安装：
  ```bash
  npx skills add belt-sh/cli
  belt login
  belt app run pruna/p-video-avatar --input '{
    "image": "https://portrait.jpg",
    "voice_script": "欢迎观看产品演示。",
    "voice": "Zephyr (Female)"
  }'
  ```
  可用 `belt app list --category video` 浏览视频应用。选择 OmniHuman 或 PixVerse 时，先生成语音，再把音频 URL 传入 `audio_url`。
- **注意**：P-Video-Avatar 文档列明内置 **30 种声音、10 种语言**，支持 1080p，输出宽高比跟随输入图片；竖屏可先生成 `9:16` 人像。OmniHuman、PixVerse 不内置 TTS；应使用正面、光照良好的高质量肖像和低噪声清晰音频。文中的速度、成本优势属于来源声明，不是本日报实测结果。

## [ai-image-generation](https://www.skills.sh/its-a-skill-issue/superpowers/ai-image-generation)
- **它做什么**：通过统一 CLI 调用文档所列的 50 多种图像模型，覆盖文生图、图像编辑、局部重绘、LoRA 风格生成与放大。示例包含 GPT-Image-2 生成与改背景、FLUX 生成、Reve 海报文字渲染，以及 Topaz 放大和多图横向拼接。实际产出包括产品图、营销视觉、插画和供后续视频使用的图片素材。
- **适合谁用**：需要把多模型出图接入脚本或内容流水线的开发者、设计与营销团队。需安装并登录 `belt`；编辑、放大和拼接示例还需要提供源图片 URL。
- **为什么现在值得看**：进入 Trending，提供的安装量为 **9,796**。它的实用之处在于集中给出了不同任务对应的 App ID 和调用示例，可作为多模型图像工作流的入口。
- **如何使用**：
  ```bash
  npx skills add belt-sh/cli
  belt login
  belt app run falai/flux-dev-lora --input '{"prompt":"摄影棚灯光下的咖啡杯产品照"}'
  belt app list --category image
  ```
  编辑图片可调用 `openai/gpt-image-2`，传入 `prompt` 与 `images` 数组；放大使用 `falai/topaz-image-upscaler` 的 `image_url` 参数。
- **注意**：依赖 inference.sh CLI。不同模型的输入字段不统一，例如 GPT-Image-2 编辑用 `images`，Topaz 放大用 `image_url`；不能把同一组参数直接套用到全部模型。文档列出的价格和分辨率描述针对特定模型，不代表全部应用。

## [twitter-automation](https://www.skills.sh/its-a-skill-issue/superpowers/twitter-automation)
- **它做什么**：通过 `belt` 调用 X 应用，发布文字或带媒体的帖子，并执行点赞、转发、删除、私信和关注操作。也能按帖子 ID 读取帖子，或按用户名获取用户资料。文档给出了“生成图片或视频→取得媒体 URL→发布到 X”的两步内容分发流程。
- **适合谁用**：希望将生成式内容接入 X 发布流程的开发者和社交媒体运营团队。需安装并登录 inference.sh CLI，并按文档链接配置 X 集成；媒体发布需要可传入的媒体 URL。
- **为什么现在值得看**：进入 Trending，提供的安装量为 **9,796**。与本期图像、视频 Skill 相比，它承担的是发布和互动环节，适合评估内容生成后的分发衔接。
- **如何使用**：
  ```bash
  npx skills add belt-sh/cli
  belt login
  belt app run x/post-tweet --input '{"text":"新功能已上线！"}'
  ```
  带媒体发布时，先获取输入模板，再编辑并执行：
  ```bash
  belt app sample x/post-create --save input.json
  # 在 input.json 中填写 text 和 media_url
  belt app run x/post-create --input input.json
  ```
  读取帖子可用 `x/post-get`，传入 `tweet_id`。
- **注意**：依赖 `belt` 和 X 集成配置；给定正文未展开 X 授权步骤。简介提到内容排期，但正文未提供定时发布命令或调度参数，不能据此视为已给出可直接执行的排期方案。发布、删除、私信和关注命令会执行对应账户操作，文档未描述额外审批机制。

## [ai-video-generation](https://www.skills.sh/its-a-skill-issue/superpowers/ai-video-generation)
- **它做什么**：通过 inference.sh 调用文档所列的 40 多种视频模型，覆盖文生视频、图生视频、参考图生成、数字人和口型同步。还提供自然语言视频编辑、补音效、视频放大，以及带转场的片段合并工具。可将 Seedance 生成、HappyHorse 编辑、Foley 配音效和 Media Merger 合并等步骤组合成制作流程。
- **适合谁用**：制作社交短片、营销内容、产品演示，或构建多模型视频流水线的开发者。需安装并登录 `belt`，并按任务准备提示词、图片、音频或视频 URL。
- **为什么现在值得看**：进入 Trending，提供的安装量为 **9,796**。其关注点不只在生成模型，也覆盖音效、编辑、放大与合并，便于开发者查找制作链路中的具体工具。
- **如何使用**：
  ```bash
  npx skills add belt-sh/cli
  belt login
  belt app run google/veo-3-1-fast --input '{"prompt":"无人机飞越森林"}'
  belt app list --category video
  ```
  需要同步音频时，文档提供 Seedance 示例：
  ```bash
  belt app run bytedance/seedance-2-0 --input '{
    "prompt":"昏暗俱乐部里演奏的爵士乐队",
    "generate_audio":true,
    "duration":10
  }'
  ```
- **注意**：依赖 inference.sh CLI，各模型参数和上限不同。文档列明 Seedance 2.0 最高 1080p，HappyHorse T2V 最长 15 秒、I2V 最高 1080P/15 秒，经济型 WAN-T2V/I2V 为 480p/720p。图像输入可能分别使用 `image`、`image_url` 或 `reference_image`，应按具体示例传参。

## [ai-video-generation](https://www.skills.sh/101-skills/superpowers/ai-video-generation)
- **它做什么**：该仓库提供的 SKILL.md 与上一条视频 Skill 内容一致，同样覆盖文生视频、图生视频、参考图生成、口型同步和视频编辑。辅助工具包括 `infsh/hunyuanvideo-foley` 补音效、`falai/topaz-video-upscaler` 放大，以及 `infsh/media-merger` 合并片段。给定资料未体现它相较上一条具有额外功能。
- **适合谁用**：需要上述视频能力、并考虑从 `101-skills/superpowers` 来源使用该 Skill 的开发者。前置条件同样是安装并登录 `belt`，以及准备所选模型需要的素材。
- **为什么现在值得看**：该独立 ID 也进入 Trending，提供的安装量为 **9,726**。它是不同来源的新收录条目，但不应将相同文档内容当作新的能力增量。
- **如何使用**：
  ```bash
  npx skills add belt-sh/cli
  belt login
  belt app run google/veo-3-1-fast --input '{"prompt":"花园里花朵绽放的延时摄影"}'
  belt app list --category video
  ```
  自然语言编辑已有视频的示例为：
  ```bash
  belt app run alibaba/happyhorse-1-0-video-edit --input '{
    "video":"https://your-video.mp4",
    "prompt":"将背景改为雪山景观"
  }'
  ```
- **注意**：依赖与模型限制和上一条一致，不能将某个模型的音频、分辨率或时长支持推广到全部模型。仅凭给定资料，无法确认两个仓库在版本维护或运行行为上是否存在差异。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*