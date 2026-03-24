# 项目介绍

## 1. 项目定位

这是一个基于 `pnpm workspace + Turborepo` 的前端 Monorepo 模板仓库，用来统一管理多个应用和多个内部共享包。

它目前更像一个“团队工程化基础模板”，而不是一个已经完成业务功能的成品项目。仓库重点提供了：

- 多包管理能力：通过 `pnpm-workspace.yaml` 管理 `apps/*` 和 `packages/*`
- 统一任务编排：通过 `turbo` 统一执行构建、开发、检查、格式化等任务
- 共享工程配置：内置 ESLint、TypeScript、Commitlint、lint-staged、simple-git-hooks
- 共享前端基础设施：提供 `@workspace/ui` 组件样式包，以及 `@workspace/lib` 业务公共工具包

## 2. 技术栈概览

- 包管理：`pnpm@10`
- Monorepo：`Turborepo`
- 语言：`TypeScript`
- 代码检查：`oxlint` + `eslint`
- 格式化：`oxfmt` + `prettier`
- 提交规范：`commitlint` + `simple-git-hooks` + `lint-staged`
- 版本发布准备：`.changeset`

## 3. 目录结构

```text
.
├─ apps/
│  └─ web/                      # 预留的应用目录，当前还是空目录
├─ packages/
│  ├─ eslint-config/           # 共享 ESLint 配置
│  ├─ lib/                     # 业务公共工具/方法
│  ├─ typescript-config/       # 共享 TS 配置
│  └─ ui/                      # 共享 UI 基础包
├─ .changeset/                 # 版本变更记录
├─ package.json                # 根脚本与统一依赖入口
├─ pnpm-workspace.yaml         # workspace 范围
├─ turbo.json                  # Turbo 任务编排配置
└─ tsconfig.json               # 根 TS 配置，继承共享配置
```

## 4. 根目录职责

### `package.json`

根 `package.json` 主要负责统一管理整个仓库的脚本与工程化依赖。

常用脚本：

- `pnpm dev`：执行 `turbo dev`
- `pnpm build`：执行 `turbo build`
- `pnpm lint`：执行所有包的 lint
- `pnpm lint:fix`：自动修复 lint 问题
- `pnpm fmt`：执行格式化
- `pnpm fmt:check`：检查格式是否一致
- `pnpm typecheck`：执行类型检查

### `turbo.json`

这个文件定义了 Monorepo 里的任务依赖关系：

- `build` 依赖上游包的 `build` 和当前包的 `typecheck`
- `dev` 被设置为 `persistent`，适合启动长期运行的开发服务
- `fmt`、`lint`、`typecheck` 等任务可以按 workspace 维度统一执行

这意味着团队后续新增 app 或 package 时，只要约定好脚本名称，就能自动接入整套流水线。

### `pnpm-workspace.yaml`

当前 workspace 管理范围是：

- `apps/*`
- `packages/*`

也就是说，以后新增应用或共享包，只需要放进这两个目录下即可被自动识别。

## 5. packages 说明

### `packages/ui`

这是项目里的共享 UI 基础包，定位更偏“组件与样式基础设施”。


当前状态说明：

- `src/components` 和 `src/hooks` 目录目前还是占位状态，只有 `.gitkeep`
- 也就是说，这个包已经把“样式体系和导出结构”准备好了，但具体组件还需要按项目需要逐步补充

### `packages/lib`

这是项目里的业务公共工具包，适合沉淀跨项目复用的方法、常量和状态逻辑。

当前已有内容：

- `index.ts`
  - `mobileSystem()`：判断移动端系统
  - `isMobile()`：判断是否为移动端
  - `loadScript()`：动态加载外部脚本
  - `getMd5Sign()`：对参数生成 MD5 签名
  - `listToTree()`：按 `server_id` 将平铺列表整理为树状/分组结构
- `errorCode.ts`
  - 目前导出了 `NETWORK_ERROR_TEXT` 作为兜底网络错误文案
- `useCommonStore.ts`
  - 当前是一个完整的 `zustand + persist` 示例模板，但整段代码处于注释状态，说明作者希望这里作为公共 store 范式示例或待后续启用

当前状态说明：

### `packages/eslint-config`

这是共享 ESLint 配置包，用来保证整个 Monorepo 的代码规范一致。

对外导出了三套配置：

- `@workspace/eslint-config/base`
- `@workspace/eslint-config/next-js`
- `@workspace/eslint-config/react-internal`

适合不同类型的应用或包按需继承。

### `packages/typescript-config`

这是共享 TypeScript 配置包，目的是统一整个仓库的 TS 编译标准。

当前提供了三份配置：

- `base.json`：默认基础配置，开启 `strict`、`noUncheckedIndexedAccess` 等严格检查
- `nextjs.json`：给 Next.js 应用使用
- `react-library.json`：给 React 组件库/工具库使用

根目录 `tsconfig.json` 已经继承了这里的 `base.json`。

## 6. apps 说明

### `apps/web`

仓库里已经预留了 `apps/web` 目录，但当前还是空目录，说明这个模板已经为主应用预留了位置，不过应用本身尚未初始化。

这也解释了为什么当前仓库的重点更多体现在：

- 工程化配置
- 共享包设计
- 未来扩展结构

而不是一个已经能直接访问页面的完整前端站点。

## 7. 开发流程与协作规范

### 代码质量

仓库在根目录集成了以下保障：

- `oxlint --fix` + `eslint --fix` 会在 `lint-staged` 中对暂存文件自动执行
- `simple-git-hooks` 会在 `pre-commit` 和 `commit-msg` 阶段自动触发检查
- `commitlint` 限制了提交类型，例如：
  - `feat`
  - `fix`
  - `docs`
  - `refactor`
  - `test`
  - `chore`
  - `release`

### Node 版本

根目录要求：

- `node >= 20`

### 安装与启动建议

初次使用通常按这个顺序：

```bash
pnpm install
# 启用apps/web
pnpm dev:web
```
根package.json中：
 不同项目开发环境可单独配置指令："dev:web": "turbo dev --filter=./apps/web"


## 8. 这个项目适合怎么用

这个仓库比较适合以下场景：

- 团队想维护多个前端项目，但希望统一工程规范
- 多个业务应用要共享组件库、工具库、配置包
- 想把“应用代码”和“基础设施代码”拆开管理
- 未来可能需要做组件沉淀、工具沉淀、版本管理甚至包发布

如果后续继续完善，比较自然的演进方向是：

1. 在 `apps/web` 中初始化真正的业务应用
2. 在 `packages/ui` 中补充通用组件
3. 在 `packages/lib` 中沉淀更多业务公共逻辑
4. 利用 `.changeset` 做包版本记录和发布管理（如有包发布到npm上时）

## 9. 当前现状总结

一句话总结：

这是一个已经把 Monorepo 工程骨架搭好、并预置了共享配置与基础包的前端模板仓库。

当前“骨架”已经比较完整，但“具体业务应用和组件内容”还在早期阶段，属于一个很适合作为团队起步模板、再逐步往里填充业务能力的项目。

## 10. 注意

1. 本项目主要使用oxlint + oxfmt 为主，eslint作为补充来支持oxlint还没支持的规则，后续有项目用eslint，先将eslint转成oxlint, 具体可看 https://oxc.rs/blog/2026-03-11-oxlint-js-plugins-alpha.html#migrating-from-eslint

