# overseas-dlwKR-appointment 项目说明文档

> 韩国地区「시티 데몬헌터즈: 각성자들」(城市恶魔猎人：觉醒者们) 游戏海外预约活动页
> 活动地址：https://khunter.dawnbreaking.com
> 媒体埋点地址：https://khunter.dawnbreaking.com

---

## 目录

- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [环境要求](#环境要求)
- [项目结构](#项目结构)
- [快速开始](#快速开始)
- [脚本命令](#脚本命令)
- [多平台构建机制](#多平台构建机制)
- [核心模块说明](#核心模块说明)
  - [页面 (Pages)](#页面-pages)
  - [组件 (Components)](#组件-components)
  - [组合式函数 (Composables)](#组合式函数-composables)
  - [状态管理 (Store)](#状态管理-store)
  - [API 接口](#api-接口)
  - [插件 (Plugins)](#插件-plugins)
  - [国际化 (i18n)](#国际化-i18n)
  - [样式系统](#样式系统)
  - [工具函数 (Utils)](#工具函数-utils)
- [环境变量](#环境变量)
- [CDN 与静态资源](#cdn-与静态资源)
- [代码规范](#代码规范)
- [Docker 部署](#docker-部署)

---

## 项目概述

本项目是一个面向韩国市场的手游预约活动页，使用 Nuxt 4 进行静态站点生成 (SSG)，分别为 **PC 端**和**移动端**各自生成独立的静态资源包。最终产物通过 CDN 分发。

主要功能：
- 游戏宣传展示（轮播图、角色展示、游戏特色）
- 用户预约登记（手机号 + 平台选择）
- 预约里程碑进度展示
- 多商店跳转（Google Play / App Store 等）
- 第三方媒体埋点（Facebook Pixel、Google Analytics GA4、TikTok Pixel）

---

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Nuxt | 4.x |
| 前端 | Vue | 3.5+ |
| 路由 | vue-router | 5.x |
| UI 组件库 | Vant | 4.x |
| 原子化 CSS | UnoCSS | 66.x |
| 状态管理 | Pinia + Persistedstate | 3.x |
| 国际化 | @nuxtjs/i18n | 10.x |
| HTTP 请求 | Axios | 1.x |
| 轮播组件 | Swiper | 12.x |
| 动画 | animate.css | 4.x |
| PostCSS 适配 | postcss-mobile-forever | 5.x |
| 代码规范 | ESLint (@antfu/eslint-config) | 7.x |
| 提交规范 | commitlint + simple-git-hooks | - |
| 包管理器 | pnpm | 10.x |
| 构建目标 | ESNext (via Vite) | - |

---

## 环境要求

- **Node.js**: >= 20.19.0（见 `.node-version`）
- **pnpm**: 10.30.2+（见 `package.json` 中的 `packageManager` 字段）

---

## 项目结构

```
overseas-dlwKR-appointment/
├── app/                          # Nuxt 应用源码目录
│   ├── api/                      # API 接口定义
│   │   └── index.ts              #   预约相关接口 (init / event / player_reserve / draw 等)
│   ├── app.vue                   # 应用根组件 (Vant ConfigProvider + 主题切换)
│   ├── assets/                   # 静态资源 (图片 / 视频)
│   │   ├── images/               #   图片资源
│   │   │   ├── pc/               #     PC 端专用图片
│   │   │   ├── people/           #     角色图片 (Mobile)
│   │   │   ├── roles/            #     角色图片 (Mobile)
│   │   │   ├── popup/            #     弹窗图片
│   │   │   └── animated-png/     #     动态 PNG
│   │   └── video/                #   视频资源 (KV 视频)
│   ├── components/               # 公共组件
│   │   ├── AppHeader.vue         #   顶部导航栏
│   │   ├── AppFooter.vue         #   底部标签栏
│   │   ├── swiperPc.vue          #   PC 端轮播组件
│   │   └── Interaction.vue       #   交互组件 (空)
│   ├── composables/              # 组合式函数
│   │   ├── useCommon.ts          #   核心业务逻辑 (预约/商店跳转/埋点)
│   │   ├── mediaTagging.ts       #   第三方媒体埋点 (FB/GA4/TikTok)
│   │   ├── keepalive.ts          #   KeepAlive 路由缓存管理
│   │   └── counter.ts            #   示例计数器
│   ├── config/
│   │   └── index.ts              # AppFooter 路由白名单
│   ├── constants/
│   │   └── index.ts              # 应用名称与描述常量
│   ├── layouts/                  # 布局
│   │   ├── default.vue           #   默认布局 (slot 直出)
│   │   ├── 404.vue               #   404 页面布局
│   │   └── README.md
│   ├── middleware/
│   │   └── route.global.ts       # 全局路由中间件 (KeepAlive 收集)
│   ├── pages/                    # 页面
│   │   ├── index.vue             #   根路由页面 (由 pages:extend 钩子动态替换)
│   │   ├── pc/index.vue          #   PC 端首页
│   │   ├── mobile/index.vue      #   移动端首页
│   │   ├── keepalive/index.vue   #   KeepAlive 示例页
│   │   └── [...all].vue          #   404 兜底页
│   ├── plugins/                  # Nuxt 插件
│   │   ├── i18n.ts               #   Vant 国际化语言包加载
│   │   ├── tracking.client.ts    #   第三方追踪脚本注入 (GA4/FB Pixel/TikTok)
│   │   └── http.ts               #   HTTP 插件 (已注释)
│   ├── stores/
│   │   └── custom.ts             # Pinia Store (设备类型/预约状态/用户信息)
│   ├── styles/                   # 全局样式
│   │   ├── vars.css              #   CSS 变量
│   │   ├── global.css            #   全局样式
│   │   └── default-theme.css     #   默认主题
│   ├── types/
│   │   └── vue-router.d.ts       # vue-router 类型声明
│   └── utils/                    # 工具函数
│       ├── index.client.ts       #   设备检测 / URL参数 / 数字格式化
│       ├── request.ts            #   Axios 实例 (请求/响应拦截器)
│       └── preload.ts            #   暗色模式预加载脚本
├── i18n/                         # 国际化配置
│   ├── i18n.ts                   #   Locale 列表构建
│   ├── i18n.config.ts            #   Vue I18n 配置
│   └── locales/                  #   翻译文件
│       ├── zh-CN.json
│       └── en-US.json
├── public/                       # 公共静态资源 (不经过 Vite 处理)
│   ├── favicon.ico
│   ├── fonts/NotoSansSC.woff2    #   字体文件
│   └── video/                    #   视频文件
├── scripts/                      # 构建脚本
│   ├── build-all.mjs             #   一键打包 PC + Mobile
│   └── dev.mjs                   #   按目标平台启动 dev server
├── server/                       # Nitro 服务端 (SSR 场景)
│   └── tsconfig.json
├── nuxt.config.ts                # Nuxt 配置 (动态 CDN / PostCSS / 路由钩子)
├── uno.config.ts                 # UnoCSS 配置 (rem→px / 快捷类名)
├── eslint.config.ts              # ESLint 配置 (@antfu/eslint-config + Nuxt)
├── commitlint.config.ts          # Commitlint 配置
├── tsconfig.json                 # TypeScript 配置
├── Dockerfile                    # Docker 构建配置 (SSR 模式)
├── package.json                  # 项目依赖与脚本
├── .env                          # 环境变量
├── .npmrc                        # pnpm 配置 (shamefully-hoist)
├── .node-version                 # Node 版本锁定
└── .gitignore                    # Git 忽略规则
```

---

## 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 启动开发服务器 (默认 PC 模式)
pnpm dev

# 3. 启动移动端开发
pnpm dev:mobile

# 4. 一键构建 PC + Mobile 静态资源
pnpm generate:all
```

开发服务器默认运行在 `http://localhost:3000`。

---

## 脚本命令

### 开发

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 默认启动开发服务器 (PC 模式，maxDisplayWidth=750) |
| `pnpm dev:pc` | 以 PC 模式启动开发服务器 |
| `pnpm dev:mobile` | 以 Mobile 模式启动开发服务器 (maxDisplayWidth=480) |

### 构建

| 命令 | 说明 |
|------|------|
| `pnpm generate` | 默认执行 nuxt generate (PC 配置) |
| `pnpm generate:pc` | 构建 PC 版本 → `dist/pc/` |
| `pnpm generate:mobile` | 构建 Mobile 版本 → `dist/mobile/` |
| `pnpm generate:all` | **一键构建 PC + Mobile** → `dist/pc/` + `dist/mobile/` |
| `pnpm build` | SSR 模式构建 |
| `pnpm preview` | 预览 SSR 构建产物 |

### 代码质量

| 命令 | 说明 |
|------|------|
| `pnpm lint` | ESLint 检查 |
| `pnpm lint:fix` | ESLint 自动修复 |
| `pnpm typecheck` | TypeScript 类型检查 |

### 其他

| 命令 | 说明 |
|------|------|
| `pnpm release` | 版本发布 (bumpp: commit + push + tag) |
| `pnpm postinstall` | 安装后自动执行 nuxt prepare |

---

## 多平台构建机制

### 工作原理

项目通过环境变量 `BUILD_TARGET` 实现 PC / Mobile 的配置切换，无需手动修改文件。

#### 1. `nuxt.config.ts` 中的动态配置

```ts
// 根据 BUILD_TARGET 环境变量切换
const buildTarget = process.env.BUILD_TARGET === 'mobile' ? 'mobile' : 'pc'
const isPc = buildTarget === 'pc'
const cdnURL = `https://cdn.dawnbreaking.com/reserve-dlw-korea-pre/${buildTarget}`
const maxDisplayWidth = isPc ? 750 : 480
```

- **cdnURL**: PC 使用 `.../pc`，Mobile 使用 `.../mobile`
- **maxDisplayWidth**: PC 为 750px，Mobile 为 480px
- **pages:extend 钩子**: 自动将根路由 `/` 指向 `app/pages/<target>/index.vue`

#### 2. 构建脚本 `scripts/build-all.mjs`

- 设置 `BUILD_TARGET` 环境变量后执行 `nuxt generate`
- `pages:extend` 钩子自动将根路由映射到对应平台页面
- 构建完成后将 `.output/public` 复制到 `dist/<target>`

#### 3. 产物目录

```
dist/
├── pc/        # PC 版完整静态资源 (cdnURL=.../pc, maxDisplayWidth=750)
└── mobile/    # Mobile 版完整静态资源 (cdnURL=.../mobile, maxDisplayWidth=480)
```

### 配置对比

| 配置项 | PC 模式 | Mobile 模式 |
|--------|---------|-------------|
| BUILD_TARGET | `pc` (默认) | `mobile` |
| cdnURL | `.../reserve-dlw-korea-pre/pc` | `.../reserve-dlw-korea-pre/mobile` |
| maxDisplayWidth | 750 | 480 |
| 根路由页面 | `app/pages/pc/index.vue` | `app/pages/mobile/index.vue` |

---

## 核心模块说明

### 页面 (Pages)

| 文件 | 说明 |
|------|------|
| `pages/pc/index.vue` | PC 端首页，包含 PC 端专用的 Banner 轮播、时间线里程碑、角色展示、预约弹窗等 |
| `pages/mobile/index.vue` | 移动端首页，移动端适配的布局与交互，使用 Swiper 组件进行轮播 |
| `pages/index.vue` | 根路由占位页面，由 `pages:extend` 钩子在构建时动态替换为 PC 或 Mobile 页面 |
| `pages/[...all].vue` | 404 兜底页面 |

### 组件 (Components)

| 组件 | 说明 |
|------|------|
| `swiperPc.vue` | PC 端 Banner 轮播组件，基于 Swiper，支持自动播放、循环、自定义样式 |
| `AppHeader.vue` | 顶部导航栏，带返回按钮和页面标题 |
| `AppFooter.vue` | 底部标签栏，根据路由白名单控制显示 |

### 组合式函数 (Composables)

#### `useCommon.ts` - 核心业务逻辑

集中管理了预约页面的绝大部分业务逻辑：

- **预约流程**: 手机号验证 (韩国9位) → 平台选择 (Android/iOS) → 提交预约
- **商店跳转**: 判断设备类型，跳转对应商店并触发埋点
- **弹窗管理**: 预约弹窗、成功弹窗、提示弹窗、公告弹窗
- **图片加载**: `getImageUrl()` / `getPcImageUrl()` 通过 `import.meta.glob` 实现按需加载并带 hash
- **埋点触发**: 在关键节点调用 `fbe()`、`ga4()`、`ttq()`、`gge()`

#### `mediaTagging.ts` - 第三方媒体埋点

| 函数 | 平台 | 说明 |
|------|------|------|
| `fbe(event)` | Facebook Pixel | 自定义事件或标准事件 |
| `ga4(event, data)` | Google Analytics 4 | GA4 事件上报 |
| `gge(info)` | Google Ads | 增强转化 - 设置 user_data |
| `ttq(event)` | TikTok Pixel | TikTok 事件追踪 |

#### `keepalive.ts` - 路由缓存

基于 Pinia Store，收集设置了 `meta.keepalive` 的路由名称，配合 `<NuxtPage :keepalive>` 实现页面缓存。

### 状态管理 (Store)

`stores/custom.ts` 使用 Pinia 定义，开启了 `localStorage` 持久化存储：

| 状态 | 类型 | 说明 |
|------|------|------|
| `isMobile` | boolean | 是否为移动设备 |
| `isAlreadyAppointment` | boolean | 用户是否已预约 |
| `userInfo` | object | 用户信息 (phone / bind_os) |
| `isGoShop` | boolean | 是否已跳转商店 |

### API 接口

基于 Axios，基础地址为 `https://media.wonderent.net`。

| 接口函数 | 路径 | 说明 |
|----------|------|------|
| `reservationInit` | POST `/reservation/init` | 初始化预约页面数据 |
| `reservationEvent` | POST `/reservation/event` | 上报事件埋点 |
| `reservationPlayerReserve` | POST `/reservation/player_reserve` | 提交预约 |
| `reservationPlayerDraw` | POST `/reservation/draw` | 抽奖 |
| `reservationFinishTask` | POST `/reservation/finish_task` | 完成任务 |
| `reservationAwardlist` | POST `/reservation/award_list` | 获取奖励列表 |

请求拦截器自动注入公共参数：`os`、`device_type`、`channel`、`page_id`(37)、`phone`、`area_code`(010)。

### 插件 (Plugins)

| 插件 | 运行环境 | 说明 |
|------|----------|------|
| `i18n.ts` | 通用 | 加载 Vant 语言包 (zh-CN / en-US)，读取 localStorage 中的语言设置 |
| `tracking.client.ts` | 仅客户端 | 通过 `useHead` 注入第三方追踪脚本 |

追踪脚本包括：
- **Google Analytics + Ads**: G-8E354RMPNS
- **Facebook Pixel**: 1703767447303012
- **TikTok Pixel**: D7VAK6JC77UEO91ITQ0G

### 国际化 (i18n)

- 策略：`no_prefix`（URL 不带语言前缀）
- 默认语言：`zh-CN`
- 支持语言：简体中文 (zh-CN)、英语 (en-US)
- 浏览器检测：基于 Cookie
- 翻译文件位于 `i18n/locales/` 目录

### 样式系统

#### UnoCSS 配置 (`uno.config.ts`)

- 预设：Wind3 + Attributify + Icons + Typography + WebFonts
- rem→px 转换基数：`1rem = 4px`
- 自定义快捷类名：

  | 类名 | 等价于 |
  |------|--------|
  | `flex-items-center` | `flex items-center` |
  | `flex-justify-center` | `flex justify-center` |
  | `flex-col-items-center` | `flex flex-col items-center` |
  | `flex-items-center-between` | `flex items-center justify-between` |
  | `flex-items-center-center` | `flex items-center justify-center` |
  | `no-wrap-ellipsis` | `whitespace-nowrap text-ellipsis overflow-hidden` |
  | `absolute-Y-center` | `translate-y--50% top-50% absolute` |
  | `bg-cover-no-repeat` | `bg-cover bg-no-repeat` |

#### PostCSS 移动端适配 (`postcss-mobile-forever`)

- 设计稿宽度：750px（Vant 组件按 375px 处理）
- 容器选择器：`#apppointment-mobile`
- PC 模式最大显示宽度：750px
- Mobile 模式最大显示宽度：480px

#### CSS 文件

| 文件 | 说明 |
|------|------|
| `styles/vars.css` | CSS 自定义属性 (主题色等) |
| `styles/global.css` | 全局样式重置与基础样式 |
| `styles/default-theme.css` | 默认浅色主题变量 |

### 工具函数 (Utils)

#### `index.client.ts` (仅客户端)

| 函数 | 说明 |
|------|------|
| `mobileSystem()` | 判断移动端系统类型，返回 `'android'` / `'ios'` |
| `isMobile()` | 检测是否为移动设备 |
| `getUrlParam(name)` | 获取 URL 查询参数 |
| `formatNumber(num)` | 数字千位分隔符格式化 |

#### `request.ts`

Axios 实例封装：
- 请求拦截器：自动注入设备信息和渠道参数
- 响应拦截器：统一错误码处理，韩语错误提示

#### `preload.ts`

生成一段内联 JS，用于页面加载前根据用户偏好设置暗色模式 class (`van-theme-dark`)，避免闪屏。

---

## 环境变量

| 变量 | 文件 | 说明 |
|------|------|------|
| `NUXT_PUBLIC_API_BASE` | `.env` | API 基础地址 (当前: `https://easyapi.devv.zone`) |
| `BUILD_TARGET` | 构建时设置 | 构建目标，`pc` (默认) 或 `mobile` |

---

## CDN 与静态资源

构建产物通过 Nuxt 的 `app.cdnURL` 配置指向 CDN：

| 目标 | CDN 路径 |
|------|----------|
| PC | `https://cdn.dawnbreaking.com/reserve-dlw-korea-pre/pc` |
| Mobile | `https://cdn.dawnbreaking.com/reserve-dlw-korea-pre/mobile` |

`public/` 目录下的文件（字体、视频、favicon）在构建后直接复制到产物中，不经过 Vite 处理。

`app/assets/` 目录下的图片和视频经过 Vite 处理，文件名会附加 hash，通过 `import.meta.glob` 动态引用。

---

## 代码规范

- **ESLint**: 基于 `@antfu/eslint-config`，集成 UnoCSS 和格式化插件
- **Commitlint**: 使用 `@commitlint/config-conventional` 规范提交信息
- **Git Hooks**: 通过 `simple-git-hooks` + `lint-staged` 在提交前自动 lint
- **TypeScript**: 开启 `typedPages` 实验特性，关闭 shim

---

##  部署

> 使用 `pnpm generate:all` 构建后直接将 `dist/` 目录下的文件部署到静态服务器。
> 静态服务器为git@192.168.40.11:overseas_sdk.git下的EN-team-battle-activity文件夹 
> 已跟运维老哥沟通好，已在nginx配置通过设备类型读取对应的pc和mobile文件夹

