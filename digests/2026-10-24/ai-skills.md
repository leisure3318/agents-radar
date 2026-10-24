# AI Skills 新上榜日报 2026-10-24

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-10-24 01:56 UTC

---

**今日发现**：本期新上榜条目集中在同一条内容生产链：用 `belt` 调用 inference.sh 生成图片、视频和数字人口播，再发布到 Twitter/X。两个不同来源的 `ai-avatar-video` 提供了相同的 SKILL.md；下文按独立榜单条目列出，不将其视为功能不同的工具。

## [ai-avatar-video](https://www.skills.sh/skills-shell/superpowers/ai-avatar-video)
- **它做什么**：通过 inference.sh CLI，把人像与文本或音频组合成数字人口播视频。文档主推 `pruna/p-video-avatar`：内置 TTS，提供 30 种声音、10 种语言及最高 1080p 输出，并可分别用 `voice_prompt`、`video_prompt` 控制声音和画面风格。完整工作流可以先用 `pruna/p-image` 生成人像，再将图片 URL 传入数字人模型。
- **适合谁用**：制作产品讲解、课程、UGC 风格广告和虚拟主持内容的开发者或内容团队；需要准备人像、口播稿或音频，并具备可用的 `belt` CLI 环境。
- **为什么现在值得看**：该来源同时进入 **Trending（24 小时趋势）和 Hot（小时爆发）**，兼具两种热度信号。所给安装量为 **405**，不是今日新增安装数。
- **如何使用**：文档给出的 CLI Skill 安装命令和最短启动路径如下；运行前仍需按文档安装 inference.sh CLI。
  ```bash
  npx skills add belt-sh/cli
  belt login
  belt app run pruna/p-video-avatar --input '{
    "image": "https://portrait.jpg",
    "voice_script": "Welcome to our product demo!",
    "voice": "Zephyr (Female)"
  }'
  ```
  可用 `belt app list --category video` 浏览视频应用。竖屏内容可先调用 `pruna/p-image`，设置 `"aspect_ratio": "9:16"`。
- **注意**：输出宽高比跟随输入图片；文档建议使用正面、光照良好的高质量人像，以及背景噪声少的清晰音频。OmniHuman 和 PixVerse 不内置 TTS，使用文本稿时需要先生成语音。文档中的速度、成本及倍数比较属于来源声明，并非本日报实测。

## [ai-avatar-video](https://www.skills.sh/qu-skills/superpowers/ai-avatar-video)
- **它做什么**：该来源的 SKILL.md 与上一条相同，覆盖文本驱动数字人、音频驱动口型同步及视频配音工作流。除 P-Video-Avatar 外，还提供 OmniHuman 多人物驱动、Fabric 和 PixVerse 的调用示例；已有视频的跨语言配音则采用“转写 → 翻译 → TTS → LatentSync 对口型”流程。
- **适合谁用**：需要多人物口播、角色配音或视频本地化的开发者；前置条件是安装并登录 `belt`，准备图片或视频 URL，以及所需音频或文本。
- **为什么现在值得看**：该来源进入 **Trending（24 小时趋势）**，所给安装量为 **9,952**。这是独立来源条目的热度记录，不代表其功能比另一来源更多，也不是今日新增安装量。
- **如何使用**：保留文档给出的安装与登录命令：
  ```bash
  npx skills add belt-sh/cli
  belt login
  ```
  多人物音频驱动的调用入口为：
  ```bash
  belt app run bytedance/omnihuman-1-5 --input '{
    "image_url": "https://portrait.jpg",
    "audio_url": "https://speech.mp3"
  }'
  ```
  若只有文本，可先调用 `inworld/text-to-speech-2`，再把返回的音频 URL 传入。视频本地化依次使用 `infsh/fast-whisper-large-v3`、人工或 LLM 翻译、`infsh/kokoro-tts` 和 `infsh/latentsync-1-6`。
- **注意**：OmniHuman、PixVerse 的工作流需要另行提供音频；翻译步骤不是示例中自动执行的 CLI 环节。示例中的返回 URL 需要在步骤之间传递，不能直接使用占位符。文档的批量示例只更换声音、仍使用同一张人像，不等同于自动生成多个不同外貌的主持人。

## [twitter-automation](https://www.skills.sh/qu-skills/superpowers/twitter-automation)
- **它做什么**：通过 `belt` 调用 Twitter/X 应用，执行文字发帖、带媒体发帖、点赞、转发、删除帖子、私信、关注以及用户和帖子查询。实际工作流可先用 FLUX 生成图片或用 Veo 生成视频，再把产物 URL 交给 `x/post-create` 发布。
- **适合谁用**：希望把内容生成与社交发布串成脚本的开发者、运营工具开发者和内容团队；需要 inference.sh CLI，并按文档链接配置 X 集成。
- **为什么现在值得看**：进入 **Trending（24 小时趋势）**，所给安装量为 **9,950**。它为本期的图片、视频生成工具补上了发布环节，但该数字不表示今日新增。
- **如何使用**：
  ```bash
  npx skills add belt-sh/cli
  belt login
  belt app run x/post-tweet --input '{"text": "Hello from inference.sh!"}'
  ```
  带媒体发帖先获取输入样例，编辑 `text` 和 `media_url` 后运行：
  ```bash
  belt app sample x/post-create --save input.json
  belt app run x/post-create --input input.json
  ```
  可用 `belt app run x/post-get --input '{"tweet_id": "1234567890"}'` 查询指定帖子，或用 `belt app list` 浏览应用。
- **注意**：依赖 `belt` 和 X 集成配置；给定正文没有展开授权步骤、权限范围或调用限额。虽然简介提到内容排程，但没有提供定时参数或调度命令，不能据此当作已说明的内置排程能力。

## [ai-image-generation](https://www.skills.sh/qu-skills/superpowers/ai-image-generation)
- **它做什么**：通过统一 CLI 调用多种图像模型，生成产品图、海报、概念图和社交媒体素材，也覆盖图像编辑、放大与拼接。文档给出了 GPT-Image-2 文生图及传入 `images` 编辑图片、FLUX 生成、Reve 文字海报、Topaz 放大和 `infsh/stitch-images` 横向拼图等具体入口。
- **适合谁用**：需要把图像生成接入应用、素材流水线或批处理脚本的开发者；需要安装并登录 `belt`，编辑、放大和拼接场景还需提供输入图片 URL。
- **为什么现在值得看**：进入 **Trending（24 小时趋势）**，所给安装量为 **9,950**。值得关注的是同一套调用方式下的多模型入口，以及能与本期数字人、图生视频和 X 发布流程衔接；安装量并非今日新增。
- **如何使用**：
  ```bash
  npx skills add belt-sh/cli
  belt login
  belt app list --category image
  belt app run falai/flux-dev-lora --input '{
    "prompt": "professional product photo of a coffee mug, studio lighting"
  }'
  ```
  GPT-Image-2 编辑示例：
  ```bash
  belt app run openai/gpt-image-2 --input '{
    "prompt": "change the background to a beach at sunset",
    "images": ["https://your-image.jpg"]
  }'
  ```
- **注意**：依赖 inference.sh CLI；不同应用的输入字段不统一，例如编辑示例用 `images`，Topaz 放大用 `image_url`。来源宣称支持 50 多种模型，但给定正文并未逐一展开参数，也没有提供通用的分辨率、配额或价格保证；个别模型的标价应视为来源信息。

## [ai-video-generation](https://www.skills.sh/qu-skills/superpowers/ai-video-generation)
- **它做什么**：通过 `belt` 调用文生视频、图生视频、参考图生视频、视频编辑及口型同步模型。文档还给出后处理链路：用 HunyuanVideo Foley 添加音效、Topaz 放大视频，再用 Media Merger 以转场合并片段。Seedance 示例覆盖同步音频生成，HappyHorse 则提供文本生成、参考图生成及自然语言视频编辑入口。
- **适合谁用**：制作短视频、营销片段、产品演示或构建媒体生产流水线的开发者；需要安装并登录 `belt`，按任务准备提示词、图片、音频或视频 URL。
- **为什么现在值得看**：进入 **Trending（24 小时趋势）**，所给安装量为 **9,950**。它不仅提供生成入口，也展示了音效、放大和合并等后处理步骤，便于理解可串联的工作流；该安装量不是今日新增。
- **如何使用**：
  ```bash
  npx skills add belt-sh/cli
  belt login
  belt app list --category video
  belt app run google/veo-3-1-fast --input '{
    "prompt": "drone shot flying over a forest"
  }'
  ```
  需要同步音频的 Seedance 示例：
  ```bash
  belt app run bytedance/seedance-2-0 --input '{
    "prompt": "a jazz band performing in a dimly lit club",
    "generate_audio": true,
    "duration": 10
  }'
  ```
  后续可调用 `infsh/hunyuanvideo-foley` 添加音效，或用 `infsh/media-merger` 传入 `videos` 数组并设置 `"transition": "fade"` 合并片段。
- **注意**：依赖 inference.sh CLI；不同模型的媒体字段不同，例如 Wan 示例使用 `image_url`，Seedance 使用 `image` 或 `reference_image`，HappyHorse 编辑使用 `video`。文档列出的能力上限也不同：Seedance 最高 1080p，HappyHorse T2V/I2V 最长 15 秒，部分 WAN 应用为 480p/720p，不能将单个模型的参数或能力泛化到全部应用。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*