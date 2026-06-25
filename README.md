# best-practices 技术文档

## 1. 项目概述

`best-practices` 是一个前端最佳实践与工程化模板集合仓库，主要沉淀多种 Monorepo 模板、前端应用模板和可复用工程配置。仓库当前包含 pnpm workspace、Turborepo、Vue、Nuxt、Next.js、Changesets、共享 ESLint 配置、共享 TypeScript 配置、共享 UI 包和业务工具包等实践内容。

该仓库适合用于：

- 快速初始化新项目的前端工程骨架。
- 参考 Monorepo 的目录组织、依赖管理和任务编排方式。
- 沉淀团队统一的 lint、format、typecheck、commit hook 与发布流程。
- 复用跨项目的基础工具函数、UI 基建和配置包。

## 2. 根目录结构

```text
best-practices/
├── README.md
├── pnpm-template/
├── turbo-pnpm-template/
├── turbo-pnpm-vue-template/
├── turbo-pnpm-next.js-template/
├── turbo-pnpm-nuxt-template/

```

| 目录 | 定位 | 说明 |
| --- | --- | --- |
| `pnpm-template` | 基础 Monorepo 模板 | 基于 pnpm workspace + Changesets，演示多包管理、构建和发布流程。 |
| `turbo-pnpm-template` | 通用 Turborepo 模板 | 基于 pnpm + Turbo 的多应用、多包工程模板。 |
| `turbo-pnpm-vue-template` | Vue Turborepo 模板 | 面向 Vue 3 应用的 Turborepo 前端模板。 |
| `turbo-pnpm-next.js-template` | Next.js Turborepo 模板 | 面向 Next.js / React 应用的 Turborepo 前端模板。 |
| `turbo-pnpm-nuxt-template` | Nuxt 业务项目模板 | 面向海外预约活动页的 Nuxt Monorepo 项目。 |

## 3. 技术栈总览

### 3.1 包管理与工作区

- 主要使用 `pnpm` 管理依赖。
- 模板工程普遍使用 `pnpm-workspace.yaml` 将 `apps/*` 和 `packages/*` 纳入 workspace。
- 包之间通过 `workspace:*` 引用内部依赖，减少版本漂移。

### 3.2 Monorepo 编排

- `pnpm-template` 使用 `pnpm -r` 递归执行子包脚本。
- `turbo-pnpm-*` 和 `turbo-pnpm-nuxt-template` 使用 `turbo` 编排 `build`、`dev`、`lint`、`fmt`、`typecheck` 等任务。
- Turbo 模板适合中大型前端仓库，通过任务缓存和依赖拓扑提升构建效率。

### 3.3 前端框架

- Vue 方向：`turbo-pnpm-vue-template`。
- Nuxt 方向：`turbo-pnpm-nuxt-template`。
- React / Next.js 方向：`turbo-pnpm-next.js-template`。
- 通用工程化方向：`pnpm-template`、`turbo-pnpm-template`。

### 3.4 工程质量工具

- TypeScript：统一类型系统与严格类型检查。
- ESLint / Oxlint：代码规范检查与自动修复。
- Prettier / Oxfmt：代码格式化。
- Commitlint：约束提交信息格式。
- simple-git-hooks + lint-staged：提交前自动执行代码检查和修复。
- Changesets：用于多包版本管理和发布流程。

## 4. 模板说明

### 4.1 `pnpm-template`

`pnpm-template` 是最基础的 pnpm Monorepo 示例，适合学习或快速搭建轻量级多包仓库。

核心结构：

```text
pnpm-template/
├── apps/
│   └── demo/
├── packages/
│   ├── core/
│   ├── shared/
│   └── utils/
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.base.json
```

主要特性：

- 使用 `pnpm -r` 对所有 workspace 包递归执行任务。
- 使用 Changesets 管理包版本和发布。
- `apps/demo` 演示如何消费 `packages/*` 中的共享包。
- `packages/core`、`packages/shared`、`packages/utils` 演示基础包拆分方式。

常用命令：

```bash
pnpm install
pnpm dev
pnpm build
pnpm changeset
pnpm version
pnpm publish
```

### 4.2 `turbo-pnpm-template`

`turbo-pnpm-template` 是通用 Turborepo 模板，适合需要多应用、多共享包、统一工程规范的项目。

核心结构：

```text
turbo-pnpm-template/
├── apps/
│   └── web/
├── packages/
│   ├── eslint-config/
│   ├── lib/
│   ├── typescript-config/
│   └── ui/
├── pnpm-workspace.yaml
├── turbo.json
├── package.json
└── tsconfig.json
```

主要特性：

- 使用 `turbo` 统一编排构建、开发、lint、格式化和类型检查。
- 通过 `packages/eslint-config` 统一代码规范。
- 通过 `packages/typescript-config` 统一 TypeScript 配置。
- 通过 `packages/lib` 和 `packages/ui` 沉淀业务工具和 UI 基础能力。

常用命令：

```bash
pnpm install
pnpm dev:web
pnpm build
pnpm lint
pnpm lint:fix
pnpm fmt
pnpm fmt:check
pnpm typecheck
```

### 4.3 `turbo-pnpm-vue-template`

`turbo-pnpm-vue-template` 是 Vue 3 方向的 Turborepo 模板，适合构建 Vue 单页应用或多应用 Vue 项目。

核心结构：

```text
turbo-pnpm-vue-template/
├── apps/
│   └── web/
├── packages/
│   ├── eslint-config/
│   ├── lib/
│   ├── typescript-config/
│   └── ui/
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

主要特性：

- 面向 Vue 3 + TypeScript 项目。
- 支持统一 lint、format、typecheck 流程。
- `apps/web` 作为主应用入口。
- `packages/ui` 可承载 Vue 组件、样式和 UI 基建。
- `packages/lib` 可承载跨应用业务工具、请求封装、状态工具等。

常用命令：

```bash
pnpm install
pnpm dev:web
pnpm build
pnpm lint
pnpm typecheck
```

### 4.4 `turbo-pnpm-next.js-template`

`turbo-pnpm-next.js-template` 是 Next.js / React 方向的 Turborepo 模板，适合构建 React 应用、Next.js 应用和共享 React 组件库。

核心结构：

```text
turbo-pnpm-next.js-template/
├── apps/
│   └── web/
├── packages/
│   ├── eslint-config/
│   ├── lib/
│   ├── typescript-config/
│   └── ui/
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

主要特性：

- 面向 Next.js、React 和 TypeScript 项目。
- 内置共享 ESLint 和 TypeScript 配置包。
- 通过 `packages/ui` 承载共享 React UI 能力。
- 通过 `packages/lib` 承载通用 hooks、工具函数和业务逻辑。
- 根配置中对 React 相关依赖进行了统一版本约束。

常用命令：

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
```

### 4.5 `turbo-pnpm-nuxt-template`

`turbo-pnpm-nuxt-template` 是一个 Nuxt 方向的业务项目模板，当前主应用为 `apps/overseas-dlwKR-appointment`，适合海外预约活动页或营销页项目。

核心结构：

```text
turbo-pnpm-nuxt-template/
├── apps/
│   └── overseas-dlwKR-appointment/
├── packages/
│   ├── eslint-config/
│   ├── lib/
│   ├── typescript-config/
│   └── ui/
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

主要特性：

- 基于 Nuxt、Vue、TypeScript 和 Turbo。
- 针对移动端活动页场景集成了常见依赖，例如 `axios`、`swiper`、`vconsole`、`animate.css` 等。
- 主应用通过根脚本 `dev:overseas-dlwKR-appointment` 启动。
- 使用共享配置包统一团队规范。

常用命令：

```bash
pnpm install
pnpm dev:overseas-dlwKR-appointment
pnpm build
pnpm build:test
pnpm lint
pnpm typecheck
```

## 5. 共享包设计

多数 Turbo 模板采用相似的共享包结构：

```text
packages/
├── eslint-config/
├── typescript-config/
├── lib/
└── ui/
```

### 5.1 `packages/eslint-config`

用于集中管理 ESLint 配置，避免每个应用单独维护规则。常见导出包括基础规则、框架规则和内部库规则。

推荐用法：

- 应用层继承框架相关配置，例如 Vue、Next.js 或 React 配置。
- 工具库继承基础 TypeScript 配置。
- 团队规范变更时优先修改该包，而不是分散修改各应用配置。

### 5.2 `packages/typescript-config`

用于集中管理 TypeScript 配置，常见配置包括：

- `base.json`：基础严格类型配置。
- `nextjs.json`：Next.js 应用配置。
- `react-library.json`：React 组件库配置。

推荐所有应用和包通过 `extends` 继承共享配置，保持类型检查规则一致。

### 5.3 `packages/lib`

用于沉淀跨应用复用的业务工具，例如：

- 环境判断。
- 移动端判断。
- 动态脚本加载。
- 请求封装。
- 签名、加密、数据转换工具。
- 公共状态逻辑和业务 hooks。

该包应避免耦合具体页面 UI，优先承载无界面、可复用的业务逻辑。

### 5.4 `packages/ui`

用于沉淀共享 UI 基础能力，例如：

- 通用组件。
- 样式入口。
- 主题变量。
- 原子化 CSS 或 Tailwind / UnoCSS 配置。
- 组件库适配层。

该包应避免直接依赖具体业务接口，确保可在多个应用中复用。

## 6. 开发流程

### 6.1 初始化依赖

进入具体模板目录后安装依赖：

```bash
cd turbo-pnpm-vue-template
pnpm install
```

不同模板声明的 pnpm 版本可能不同，建议优先使用 `corepack` 锁定包管理器版本：

```bash
corepack enable
corepack prepare pnpm@10.4.1 --activate
```

### 6.2 启动开发服务

根据模板选择对应命令：

```bash
# Vue / 通用 Turbo 模板
pnpm dev:web

# Next.js 模板
pnpm dev

# Nuxt 预约项目
pnpm dev:overseas-dlwKR-appointment
```

### 6.3 构建与检查

```bash
pnpm build
pnpm lint
pnpm typecheck
pnpm fmt:check
```

建议在提交前至少执行 `lint` 和 `typecheck`，发布或部署前执行完整 `build`。

### 6.4 代码提交

模板中普遍使用以下提交质量保障：

- `simple-git-hooks`：注册 Git hooks。
- `lint-staged`：只检查暂存区变更文件。
- `commitlint`：校验提交信息。

推荐提交信息遵循 Conventional Commits：

```text
feat: add appointment page
fix: handle network error toast
docs: update technical documentation
refactor: simplify request wrapper
```

## 7. 版本与发布

`pnpm-template` 使用 Changesets 管理版本与发布，适合需要发布 npm 包的 Monorepo。

典型流程：

```bash
pnpm changeset
pnpm version
pnpm build
pnpm publish
```

对于应用型模板，如果不需要发布 npm 包，也可以保留 Changesets 作为变更记录工具，或者根据团队实际流程移除。

## 8. 新增应用或包规范

### 8.1 新增应用

建议放置在 `apps/*` 下：

```text
apps/
└── admin/
    ├── package.json
    ├── src/
    └── tsconfig.json
```

新增后需要：

- 在应用 `package.json` 中补齐 `dev`、`build`、`lint`、`typecheck` 等脚本。
- 继承 `@workspace/typescript-config`。
- 继承 `@workspace/eslint-config`。
- 按需引用 `@workspace/lib` 和 `@workspace/ui`。

### 8.2 新增共享包

建议放置在 `packages/*` 下：

```text
packages/
└── request/
    ├── package.json
    ├── src/
    └── tsconfig.json
```

新增后需要：

- 设置清晰的包名，例如 `@workspace/request`。
- 暴露稳定入口，例如 `src/index.ts`。
- 避免依赖具体应用代码。
- 补齐 `build`、`lint`、`typecheck` 等脚本，便于 Turbo 编排。

## 9. 维护建议

- 根目录 README 建议修复编码显示问题，避免中文说明在不同终端下乱码。
- 各模板 README 建议统一结构，包括项目定位、技术栈、目录结构、启动命令、构建命令和部署说明。
- 已生成的构建产物和依赖目录建议通过 `.gitignore` 排除，例如 `node_modules`、`.turbo`、`.nuxt`、`.output`、`dist`。
- 共享包的职责边界建议保持清晰：`lib` 放逻辑，`ui` 放组件，`eslint-config` 放规则，`typescript-config` 放类型配置。

## 10. 推荐落地路径

如果要基于本仓库创建新项目，推荐按以下顺序选择模板：

1. 只需要学习或演示 Monorepo：选择 `pnpm-template`。
2. 需要通用前端工程骨架：选择 `turbo-pnpm-template`。
3. 需要 Vue 3 项目：选择 `turbo-pnpm-vue-template`。
4. 需要 Next.js / React 项目：选择 `turbo-pnpm-next.js-template`。
5. 需要 Nuxt 活动页或预约页项目：选择 `turbo-pnpm-nuxt-template`。

选择模板后，建议先完成以下动作：

- 修改根 `package.json` 中的项目名称。
- 清理无关示例应用和无关共享包。
- 确认 Node.js 与 pnpm 版本。
- 统一应用路由、请求、状态管理、样式方案和部署方式。
- 补充项目级 README 和环境变量说明。

