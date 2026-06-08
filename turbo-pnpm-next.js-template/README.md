# turbo-pnpm-next.js-template

这是一个基于 `pnpm workspace + Turborepo` 的前端 Monorepo 模板，当前主应用为 `apps/web`，使用 `Next.js 16 + React 19 + TypeScript`，并配套了共享包、统一 lint/format 规则，以及基础提交规范，适合作为团队项目起点。

这份文档的目标不是介绍所有细节，而是帮助团队成员快速理解：

- 这个仓库是怎么组织的
- 本地怎么启动和构建
- 日常开发应该去哪里加代码
- 协作时有哪些默认约定

## 1. 项目概览

当前仓库采用 Monorepo 结构：

- `apps/*`：业务应用
- `packages/*`：共享能力包

目前已落地的核心能力：

- 包管理：`pnpm`
- Monorepo 编排：`turbo`
- 应用框架：`Next.js App Router`
- UI 方案：`antd-mobile` + workspace 内共享样式/UI
- 状态管理：`zustand`
- 请求库：`axios`
- 代码检查：`oxlint` + `eslint`
- 代码格式化：`oxfmt`
- 提交规范：`simple-git-hooks` + `lint-staged` + `commitlint`

## 2. 仓库结构

```text
.
|-- apps/
|   `-- web/                  # 当前主业务应用
|       |-- app/              # Next.js App Router 入口
|       |-- api/              # 接口定义或接口聚合
|       |-- components/       # 业务组件
|       |-- hooks/            # 业务 hooks
|       |-- lib/              # 请求、toast、错误码等运行时工具
|       |-- public/           # 静态资源/本地数据
|       |-- stores/           # Zustand 状态管理
|       `-- next.config.mjs   # Next 配置
|-- packages/
|   |-- ui/                   # 共享 UI、样式、工具类
|   |-- lib/                  # 共享业务工具/状态/常量
|   |-- eslint-config/        # 统一 ESLint 配置
|   `-- typescript-config/    # 统一 TS 配置
|-- turbo.json                # Turborepo 任务编排
|-- pnpm-workspace.yaml       # workspace 范围
`-- package.json              # 根脚本与协作配置
```

## 3. 各模块职责

### `apps/web`

这是当前主要业务应用，特点如下：

- 使用 `Next.js 16`
- 采用 `app/` 目录组织页面
- `next.config.mjs` 中启用了 `output: "export"`，说明当前更偏向静态导出部署
- 通过 `transpilePackages` 复用 `@workspace/ui` 和 `antd-mobile`
- 已启用 `reactCompiler`

应用入口相关文件：

- `apps/web/app/layout.tsx`
  负责全局样式、字体、Provider 注入
- `apps/web/app/page.tsx`
  当前首页示例页面
- `apps/web/components/providers.tsx`
  注入 `next-themes`，并初始化 antd-mobile 相关配置
- `apps/web/components/VConsole.tsx`
  在 `development / test` 环境可启用移动端调试面板

业务基础设施：

- `apps/web/lib/request.ts`
  封装了 `axios` 请求实例、请求/响应拦截器、通用错误提示
- `apps/web/stores/`
  使用 `zustand` 管理客户端状态，并通过 `persist` 做本地持久化

### `packages/ui`

共享 UI 层能力，当前主要承载：

- 全局样式
- `antd-mobile` 样式
- 组件/Hook/工具导出能力

如果后续团队要沉淀通用组件，优先放在这里，而不是直接散落在业务应用中。

### `packages/lib`

共享业务工具库，当前可见导出包括：

- `errorCode`
- `useLogin`
- `useCommonStore`
- `toast`

适合放：

- 多应用共用的业务工具函数
- 通用状态逻辑
- 与具体页面无关的业务常量

### `packages/eslint-config` 与 `packages/typescript-config`

这两个包用于统一工程规范，团队新增应用或包时可以直接复用，避免每个项目重复配置。

## 4. 本地开发

### 环境要求

- `Node.js >= 20`
- `pnpm 10.4.1` 或兼容版本

### 安装依赖

```bash
pnpm install
```

### 启动开发环境

在仓库根目录执行：

```bash
pnpm dev
```

该命令会通过 `turbo dev` 启动 workspace 中定义了 `dev` 的项目；当前主要是 `apps/web`，其实际命令为：

```bash
next dev --turbopack
```

### 常用命令

```bash
pnpm dev
pnpm build
pnpm lint
pnpm lint:fix
pnpm fmt
pnpm fmt:check
pnpm typecheck
```

说明：

- `pnpm build`：执行 `turbo build`
- `pnpm lint`：执行全仓库 lint
- `pnpm typecheck`：执行全仓库 TS 类型检查
- `pnpm fmt`：使用 `oxfmt` 进行格式化

如果只想针对 `web` 应用执行，也可以进入 `apps/web` 单独运行对应脚本。

## 5. 环境变量说明

根据当前代码，`apps/web` 已使用以下环境变量：

| 变量名 | 用途 | 位置 |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | 接口请求基础地址 | `apps/web/lib/request.ts` |
| `NEXT_PUBLIC_BASE_PATH` | Next.js `basePath` | `apps/web/next.config.mjs` |
| `NEXT_PUBLIC_CDN_PATH` | 静态资源/CDN 前缀 | `apps/web/next.config.mjs` |
| `NEXT_PUBLIC_APP_ENV` | 控制 `VConsole` 等运行环境逻辑 | `apps/web/components/VConsole.tsx` |

建议团队补充对应的：

- `.env.local`
- `.env.test`
- `.env.production`

如果后续补齐环境变量文档，建议保持“变量名 / 默认值 / 示例 / 是否必填 / 使用位置”五列结构。

## 6. 代码组织建议

为了保证这个模板后续可持续演进，建议团队按下面的边界放置代码：

- 页面路由相关代码放在 `apps/web/app`
- 仅被当前应用使用的组件放在 `apps/web/components`
- 当前应用独享的请求逻辑、toast、错误码放在 `apps/web/lib`
- 当前应用独享的 Zustand store 放在 `apps/web/stores`
- 跨应用可复用的 UI、样式、通用组件沉淀到 `packages/ui`
- 跨应用复用的业务逻辑、通用 hooks、常量沉淀到 `packages/lib`

一个简单判断标准：

- 只服务当前业务页面：先放 `apps/web`
- 第二个应用也会用到：再抽到 `packages/*`

## 7. 工程规范

### Lint / Format

仓库当前采用：

- `oxlint` 负责快速规则校验
- `eslint` 负责补充 JS/TS/React/Next 规则
- `oxfmt` 负责格式化

其中：

- 根目录负责统一脚本调度
- `apps/web/.oxlintrc.json` 中定义了较完整的前端校验规则
- `packages/eslint-config` 负责共享 ESLint 配置

### Git Hooks

安装依赖后会执行：

```bash
pnpm prepare
```

该过程会注册 `simple-git-hooks`。

当前钩子包括：

- `pre-commit`：执行 `pnpm lint-staged`
- `commit-msg`：执行 `pnpm commitlint --edit .git/COMMIT_EDITMSG`

`lint-staged` 当前会对暂存文件执行：

- `oxlint --fix`
- `eslint --fix`

### Commit 规范

当前允许的 commit type 包括：

- `feat`
- `fix`
- `perf`
- `style`
- `docs`
- `test`
- `refactor`
- `build`
- `ci`
- `chore`
- `revert`
- `wip`
- `workflow`
- `types`
- `release`

示例：

```bash
git commit -m "feat: add mobile request wrapper"
git commit -m "docs: improve onboarding readme"
git commit -m "fix: correct api error handling"
```

## 8. 当前项目的一些实现特征

这部分是基于现有代码整理出的“默认认知”，方便团队统一理解：

- `web` 应用当前偏移动端方向，依赖了 `antd-mobile`
- 项目支持静态导出，部署方式可能偏静态站点/CDN
- 已接入 `zustand persist`，说明客户端本地存储是允许使用的
- 已预留 `VConsole`，说明测试/联调阶段会考虑移动端真机调试
- `packages/ui` 与 `packages/lib` 已经具备抽公共能力的基础，但内容还比较轻，后续很适合继续沉淀

## 9. 新成员上手建议

建议按下面顺序熟悉项目：

1. 先看根目录 `package.json`、`turbo.json`，理解命令入口
2. 再看 `apps/web/package.json` 和 `apps/web/next.config.mjs`，理解应用运行方式
3. 从 `apps/web/app/layout.tsx` 和 `apps/web/app/page.tsx` 进入页面结构
4. 再看 `apps/web/lib/request.ts`、`apps/web/stores/`，理解基础设施
5. 最后再看 `packages/ui` 和 `packages/lib`，理解公共层边界

## 10. 后续可补充内容

如果团队准备长期使用这个模板，建议后续继续补齐以下文档：

- 接口联调说明
- 环境变量模板文件
- 发布/部署流程
- 分支管理规范
- UI 组件沉淀规则
- 公共包抽取标准
- 测试策略说明

---

如果你希望，我下一步可以继续帮你把这份文档升级成更完整的团队版，包括：

1. 补一份 `docs/architecture.md`，专门讲目录边界和分层规则
2. 补一份 `.env.example`
3. 把 `README.md` 改成“快速上手”，再拆一份更详细的开发手册
