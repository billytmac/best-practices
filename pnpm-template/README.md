# pnpm + Changeset Monorepo Template

一个简单的 pnpm monorepo 模板，使用 Changeset 进行版本管理和发布。

## 📁 项目结构

```
pnpm-template/
├── .changeset/              # Changeset 配置
│   ├── config.json
│   └── README.md
├── packages/                # 共享包
│   ├── utils/              # @mylib/utils - 工具函数
│   ├── shared/             # @mylib/shared - 共享类型和常量
│   └── core/               # @mylib/core - 核心库（依赖其他包）
├── apps/                    # 应用
│   └── demo/               # 示例应用
├── package.json            # 根配置
├── pnpm-workspace.yaml     # Workspace 配置
└── tsconfig.base.json      # 基础 TypeScript 配置
```

## 🚀 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 构建所有包

```bash
pnpm build
```

### 3. 运行示例

```bash
pnpm --filter @mylib/demo start
```

## 📦 包说明

### @mylib/utils

通用工具函数库：

- `deepClone` - 深拷贝
- `debounce` - 防抖
- `throttle` - 节流
- `formatDate` - 日期格式化
- `generateId` - 生成唯一 ID
- `sleep` - 休眠函数

### @mylib/shared

共享类型和常量：

- **类型**: `ApiResponse`, `User`, `PaginatedResponse`, `PaginationParams` 等
- **常量**: `HTTP_STATUS`, `BIZ_CODE`, `STORAGE_KEYS`, `REGEX` 等
- **工具类型**: `Nullable`, `Optional`, `RequiredFields`, `ValueOf` 等

### @mylib/core

核心库，依赖 `@mylib/utils` 和 `@mylib/shared`：

- `HttpClient` - HTTP 客户端
- `UserService` - 用户服务
- `createApp` - 创建应用实例

## 🔄 版本管理 (Changeset)

### 添加变更记录

当你修改了某个包后，运行以下命令创建 changeset：

```bash
pnpm changeset
```

按照提示选择：
1. 选择要发布的包
2. 选择版本升级类型 (major/minor/patch)
3. 填写变更说明

### 更新版本号

根据 changeset 更新版本号：

```bash
pnpm version
```

### 发布包

构建并发布所有包：

```bash
pnpm publish
```

## 📝 常用命令

```bash
# 安装依赖
pnpm install

# 构建所有包
pnpm build

# 开发模式（监听变化）
pnpm dev

# 清理构建产物
pnpm clean

# 在特定包中运行命令
pnpm --filter @mylib/utils build
pnpm --filter @mylib/demo start

# Changeset 工作流
pnpm changeset          # 创建变更记录
pnpm version            # 更新版本号
pnpm publish            # 发布包
```

## 🔗 Workspace 依赖

在 monorepo 中，包之间的依赖使用 `workspace:*` 协议：

```json
{
  "dependencies": {
    "@mylib/utils": "workspace:*",
    "@mylib/shared": "workspace:*"
  }
}
```

发布时，`workspace:*` 会自动替换为实际版本号。

## 📚 更多资源

- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Changesets](https://github.com/changesets/changesets)
- [tsup](https://tsup.egoist.dev/) - TypeScript 打包工具

