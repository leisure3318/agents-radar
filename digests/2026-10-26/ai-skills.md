# AI Skills 新上榜日报 2026-10-26

> 数据来源: skills.sh Trending + Hot（仅首次发现的 Skill） | 新发现: 5 个 | 生成时间: 2026-10-26 01:39 UTC

---

今日发现：2026-10-26 的新上榜条目集中在两条路线：Wind 金融数据查询，以及 Limrun 云端 iOS 构建、交互与测试。以下 5 个 Skill 均来自 Hot（小时爆发）榜、此前未在本日报出现；安装量是当前累计指标，不代表今日新增。

## [wind-mcp-skill](https://www.skills.sh/wind-alice/alicemarket/wind-mcp-skill)
- **它做什么**：通过本地 CLI 调用 Wind 的 7 个 MCP 服务，获取股票、基金、指数、债券、公告新闻、宏观行业数据及跨标的分析结果。工作流固定为“定路由 → 发命令 → 读回执 → 收口”，先读取对应领域契约，再按返回数据回答，不补充模型常识或点评。输出需保留数据单位、量级和必要限制，成功时附 Wind 数据来源声明。
- **适合谁用**：需要可核验金融数据的开发者、研究人员，以及构建金融问答或数据筛选助手的团队。前提是能运行 Node CLI、读取 Skill 内的领域契约，并具备服务所需认证与额度。
- **为什么现在值得看**：当前进入 Hot 榜，安装量为 **166**。值得关注的不只是覆盖面，还包括明确的路由、错误恢复和批量调用规则，便于把金融数据查询做成可追踪的工作流。
- **如何使用**：
  - 本 Skill 的安装方式未提供，请在原页面查看安装方式。
  - 先进入 `SKILL.md` 所在目录，读取相应 `references/*.md`，再调用，例如：
    ```bash
    node scripts/cli.mjs call stock_data get_stock_price_indicators '{"windcode":"600519.SH"}'
    ```
  - 成功结果优先解析 `content[0].text`；失败检查 `{ "ok": false, "code": "...", "message": "..." }`，仅按契约和错误信息修正。
  - 非 POSIX 环境须使用 UTF-8 参数文件，以 `@scripts/request-<唯一后缀>.json` 传入，调用后删除。
- **注意**：默认串行；逐项查询多个标的时先用首个请求探针验证，错误即停止该批次。价格指标工具每次最多接受 50 个代码；用户明确要求并发时，上限为 10。必须实际调用后、仅在明确的未配置 `AUTH_ERROR` 下判定缺少 Key；认证、额度或网络错误不能靠切换工具绕过。只有专项路径因覆盖、字段、口径或无结果失败，并说明原因、征得用户同意后，才可转交 `wind-alice`；若未安装，来源给出的备用安装命令为：
  ```bash
  npx skills add Wind-Information-Co-Ltd/wind-skills --skill wind-alice -g -y
  ```
  国内网络可用：
  ```bash
  npx skills add https://gitee.com/wind_info/wind-skills.git --skill wind-alice -g -y
  ```
  这些是备用 Skill 的安装命令，并非本条目的安装命令。

## [limrun-xcode-bazel](https://www.skills.sh/limrun-inc/skills/limrun-xcode-bazel)
- **它做什么**：维护基于 `lim xcode rbe` 的旧版 Bazel iOS 远程构建流程：启动远程 Mac RBE 栈、建立隧道并生成 `.limrun/` 配置。连接模拟器后，成功构建可自动安装并启动单个 App；也可将构建上传为带有效期的 Limrun 资产，用于预览或其他模拟器安装。
- **适合谁用**：已经采用 `lim xcode rbe` 的 Bazel Apple 项目维护者，或明确要求使用、排查这条旧流程的用户。需要 Bazel workspace、Bazelisk，以及 Limrun 登录或 `LIM_API_KEY`；不要求本地 Xcode。
- **为什么现在值得看**：当前位于 Hot 榜，安装量为 **106**。它的价值主要是旧项目维护和迁移边界：文档明确新 workspace、其他 Bazel 构建应优先使用 `limrun-bazel`，而不是继续搭建旧 RBE 流程。
- **如何使用**：
  - 安装 CLI 并认证：
    ```bash
    npm install --global lim
    lim login
    ```
  - 在包含 `MODULE.bazel` 或 `WORKSPACE` 的根目录运行：
    ```bash
    lim xcode rbe
    ```
    随后原样执行 CLI 打印的构建命令，例如：
    ```bash
    bazelisk --digest_function=sha256 build --config=limrun //App
    ```
  - 需要运行 App 时检查并连接模拟器：
    ```bash
    lim xcode get
    lim ios create --attach
    ```
  - 一次性上传最近成功构建、结束会话：
    ```bash
    lim xcode rbe upload preview/my-app --ttl 24h
    lim xcode rbe --stop
    lim xcode delete <id>
    ```
- **注意**：这是 **legacy** 路径，不要手写 `.limrun/`；自定义配置放入根目录 `user.limrun.bazelrc`。`--digest_function=sha256` 必须放在 `build` 前，缓存不支持 Bazel 9 默认的 BLAKE3。自动安装要求一次成功调用只产出一个 App；多 App 构建可能成功但不安装。默认最小输出下载模式下，打印的 `.ipa` 路径不代表本地存在文件；构建成功也不等于验证了真实远程执行。资产 TTL 使用 `24h`、`30m` 等格式，不能写 `1d`。

## [limrun-xcode](https://www.skills.sh/limrun-inc/skills/limrun-xcode)
- **它做什么**：把非 Bazel Apple 项目的源码同步到远程 Xcode，通过 `lim xcode build` 构建，并在已连接模拟器时安装、重新启动 App。还可远程运行代码生成、Make 等项目命令，查看异步构建日志，以及通过磁盘快照复用依赖和 DerivedData。对只有 `project.yml`、未提交 `.xcodeproj` 的 XcodeGen 项目，可在远程自动生成工程。
- **适合谁用**：使用 `.xcodeproj`、`.xcworkspace`、XcodeGen，或 React Native／Expo 原生构建的开发者，尤其适合从 Linux、Windows、容器或 CI 发起 Apple 构建。需要 Limrun CLI 与认证；这不是本地 Xcode 工作流。
- **为什么现在值得看**：当前进入 Hot 榜，安装量为 **106**。它把远程构建、工具版本选择、私有依赖文件同步和缓存复用串成一条流程，对缺少本地 Apple 构建环境的团队有直接参考价值。
- **如何使用**：
  - 安装、认证并构建：
    ```bash
    npm install --global lim
    lim login
    lim xcode build . --scheme MyApp --workspace MyApp.xcworkspace
    ```
  - 异步提交后跟踪日志：
    ```bash
    lim xcode build . --detach
    lim xcode logs --follow
    ```
  - 查看并选择远程 Xcode，或执行项目命令：
    ```bash
    lim xcode version list
    lim xcode use xcode@27
    lim xcode run -- make api
    ```
  - 需要查看 App 时再连接模拟器：
    ```bash
    lim xcode get
    lim ios create --attach
    ```
- **注意**：原生 Xcode 构建默认 `Debug`，React Native／Expo 默认 `Release`；后者的 `--dev-server-url` 仅支持 Debug。切换 Xcode 会使其他版本的构建缓存失效，构建、同步或 RBE 运行期间不能切换；App Store 上传应使用 GA，而非 beta Xcode。远程命令为一次性、非交互执行，没有 TTY 或 stdin。`--include` 使用正则而非 gitignore 语法；私有依赖凭证可通过 `--additional-file` 同步，后续同步也需重复传入。给定 SKILL.md 后半部分被截断，未展开的测试、签名与发布步骤应查阅完整来源。

## [limrun-ios-simulator](https://www.skills.sh/limrun-inc/skills/limrun-ios-simulator)
- **它做什么**：驱动已运行在 Limrun 云端 iOS 模拟器中的 App，完成启动、点击、输入、读取无障碍元素树、截图、录屏和日志检查。也可安装本地预构建包，并通过目的地隧道访问开发机或私网服务、检查 HTTP 流量及导出 HAR。它与构建工具解耦，重点是构建后的交互与验证。
- **适合谁用**：需要远程演示、UI 调试、连接本地后端或复现网络问题的移动开发者和测试人员。需要 Limrun CLI 与认证，以及已构建安装的 App，或为模拟器构建的 `.ipa`／`.app`。
- **为什么现在值得看**：当前位于 Hot 榜，安装量为 **106**。相比单纯远程看屏幕，它将实例定位、UI 检查和本地网络接入放到同一套 CLI 中，适合接续远程构建流程。
- **如何使用**：
  - 安装并认证：
    ```bash
    npm install --global lim
    lim login
    ```
  - 查找或连接实例，再读取 UI：
    ```bash
    lim xcode get
    lim ios list
    lim ios create --attach --no-open
    lim ios element-tree --id <ios-instance-id>
    ```
  - 安装本地模拟器构建包：
    ```bash
    lim ios sync <path-to-ipa-or-app>
    ```
  - 让 App 访问本机服务：
    ```bash
    lim ios tunnel --id <ios-instance-id> --selector localhost:3000 --detach
    ```
    应先启动隧道，再启动 App；拿到签名直播 URL 后可作为链接分享。
- **注意**：不要使用本地 Xcode、模拟器或 macOS 工具。实例默认定位依赖当前 git repo／worktree，定位失败或控制多个实例时，每条命令显式传 `--id`。目的地隧道仅支持 TCP，不支持 UDP、CIDR 或端口 53；每个实例只能有一条活动目的地隧道，修改选择器需重建。流量检查默认开启，HAR 和持久网络日志包含请求体；证书固定的 App 经检查路径可能失败，可排除相应域名或使用 `--no-inspect`。私网隧道令牌应留在连接器机器上，不应要求用户粘贴到对话。来源后半部分被截断，未展开能力需查阅完整文档。

## [limrun-detox-testing](https://www.skills.sh/limrun-inc/skills/limrun-detox-testing)
- **它做什么**：配置和调试 Limrun iOS 上的 Detox 运行时，连接本地 Node／Jest／Detox tester、本地 mediator 与模拟器内 App client。通过目的地隧道连接 mediator，再用 `--runtime detox` 启动 App，验证同一会话中的 App 和 tester 是否连通。它负责测试运行时接线，不负责接管构建和完整设备生命周期。
- **适合谁用**：已有 Detox 测试、希望在 Limrun 模拟器运行或排查连接问题的移动测试团队。前提是已准备 Limrun 实例和 App，项目具有正常 Detox 配置，并使用 `@limrun/detox/driver`。
- **为什么现在值得看**：当前进入 Hot 榜，安装量为 **106**。文档提供了可核对的连接信号与启动顺序，尤其有助于区分真实连接失败和“App 比 tester 先连接”产生的 mediator 噪声。
- **如何使用**：
  - 本条未单独给出安装命令；请在原页面查看安装方式，并准备项目 Detox 依赖。先检查命令帮助：
    ```bash
    lim ios tunnel --help
    lim ios launch-app --help
    ```
  - 在独立终端启动 mediator 和隧道：
    ```bash
    npx detox run-server -p 8099 -l verbose
    lim ios tunnel --selector localhost:8099 --detach --id <ios-id>
    ```
  - 先启动 tester，再启动 App：
    ```bash
    DETOX_SERVER="ws://localhost:8099" DETOX_SESSION_ID=<session-id> \
      npx detox test --no-start

    lim ios launch-app <bundle-id> --id <ios-id> \
      --runtime detox \
      --detox-server-url "ws://localhost:8099" \
      --detox-session-id <session-id> \
      --detox-version <detox-version>
    ```
  - 用 mediator 的 `testerConnected:true, appConnected:true` 和以下 UI 检查共同验证：
    ```bash
    lim ios element-tree --id <ios-id>
    ```
- **注意**：`.detoxrc` 必须显式读取 `DETOX_SERVER` 与 `DETOX_SESSION_ID`，Detox 不会自动消费这些变量；还需传入项目配置文件及配置名。运行时版本应匹配本地 `detox` 包，在项目目录外启动时应显式指定。不要以任意环境变量、App 参数或注入路径替代 `--runtime detox`。空闲隧道不会阻止实例因不活动而超时；SwiftUI 测试优先使用稳定的 accessibility identifier。手动运行结束后停止 mediator、关闭隧道，并用 `lim ios delete <ios-id>` 删除实例，删除命令不接受 `--id`。

---
*本日报由 [agents-radar](https://github.com/leisure3318/agents-radar) 自动生成。*