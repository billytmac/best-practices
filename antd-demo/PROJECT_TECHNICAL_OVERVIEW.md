# antd-demo 项目技术说明文档

本文档面向需要接手、维护或扩展本仓库的开发者，覆盖项目结构、技术栈、启动构建、路由、权限、状态管理、网络请求、Mock、国际化、主题、布局、通用组件、业务页面、测试与工程规范。

## 1. 项目定位

`antd-demo` 是一个基于 React、TypeScript、Ant Design、TanStack Router、TanStack Query、Zustand、Zod、MSW、Lingui 和 Vite 的后台管理系统示例项目。

当前仓库采用 pnpm workspace + Turbo 的 monorepo 组织方式，目前主要应用位于：

```text
apps/basic
```

根目录预留了：

```text
packages/*
```

但当前文件清单中没有实际公共包实现。

## 2. 技术栈概览

### 2.1 核心运行时

| 技术 | 用途 |
| --- | --- |
| React 19 | UI 框架 |
| React DOM 19 | 浏览器渲染 |
| TypeScript | 类型系统 |
| Vite 8 | 开发服务器与构建工具 |
| Ant Design 6 | UI 组件库 |
| lucide-react | 图标库 |
| TanStack Router | 文件路由、路由守卫、Search 参数校验 |
| TanStack Query | 服务端状态、缓存、请求状态与 mutation |
| Zustand | 客户端状态和持久化状态 |
| Zod 4 | 请求参数、响应数据、URL search 参数校验 |
| MSW 2 | 浏览器端 API Mock |
| Lingui 6 | 业务文案国际化 |
| Tailwind CSS 3 | 基础样式入口，目前主要用于注入 base/components/utilities |

### 2.2 工程工具

| 工具 | 用途 |
| --- | --- |
| pnpm | 包管理与 workspace |
| Turbo | monorepo 任务编排 |
| ESLint 10 | 代码检查 |
| Oxlint | 快速 lint 与 React 规则增强 |
| Prettier | 格式化 |
| oxfmt | 格式化辅助 |
| lefthook | Git hook |
| commitlint | commit message 规范 |
| React Compiler | React 编译优化 |
| @vitejs/plugin-react-swc | React SWC 插件 |
| @rolldown/plugin-babel | Babel 插件链，用于接 React Compiler preset |

## 3. 仓库结构

根目录主要文件：

```text
antd-demo
├─ apps/
│  └─ basic/
├─ packages/
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
├─ eslint.config.mts
├─ .oxlintrc.json
├─ .oxfmtrc.json
├─ lefthook.yml
├─ commitlint.config.ts
├─ learning-record.md
├─ lingui-i18n-technical-notes.md
└─ PROJECT_TECHNICAL_OVERVIEW.md
```

`apps/basic` 主要结构：

```text
apps/basic
├─ index.html
├─ package.json
├─ vite.config.ts
├─ lingui.config.ts
├─ tailwind.config.ts
├─ postcss.config.ts
├─ public/
│  ├─ favicon.svg
│  ├─ icons.svg
│  └─ mockServiceWorker.js
└─ src/
   ├─ main.tsx
   ├─ index.css
   ├─ routeTree.gen.ts
   ├─ api/
   ├─ components/
   ├─ hooks/
   ├─ locales/
   ├─ mocks/
   ├─ routes/
   ├─ stores/
   └─ utils/
```

## 4. 根目录配置

### 4.1 pnpm workspace

文件：`pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

表示 `apps` 和 `packages` 下的一级目录都会作为 workspace package 管理。

注意：当前文件里 `onlyBuiltDependencies` 的值包含一个尾随空格：

```yaml
onlyBuiltDependencies:
  - "lefthook "
```

这可能不是预期值。根 `package.json` 中对应配置是：

```json
"onlyBuiltDependencies": ["lefthook"]
```

如果后续遇到 pnpm built dependency 相关问题，可以优先检查这里。

### 4.2 根 package.json

根 package 主要负责 monorepo 任务：

```json
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "turbo dev",
    "lint:fix": "turbo lint:fix"
  }
}
```

当前根目录没有统一 `build` 脚本，但 `turbo.json` 中定义了 `build` task。可以按需要补充：

```json
"build": "turbo build"
```

### 4.3 Turbo

文件：`turbo.json`

```json
{
  "tasks": {
    "build": {
      "outputs": ["dist/**"]
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "dev": {
      "persistent": true,
      "cache": false
    },
    "lint:fix": {}
  }
}
```

含义：

- `dev` 是长驻任务，不缓存。
- `build` 输出目录为 `dist/**`。
- `check-types` 会依赖上游包的 `check-types`。
- `lint:fix` 当前无额外配置。

当前 `apps/basic/package.json` 没有 `check-types` 脚本，因此直接执行 `turbo check-types` 可能没有实际应用任务。

## 5. apps/basic 应用配置

### 5.1 package.json

文件：`apps/basic/package.json`

主要脚本：

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint:fix": "oxlint --fix && eslint --fix",
  "fmt": "oxfmt",
  "preview": "vite preview",
  "compile": "lingui compile --typescript",
  "extract": "lingui extract"
}
```

常用命令：

```bash
pnpm --filter basic dev
pnpm --filter basic build
pnpm --filter basic lint:fix
pnpm --filter basic extract
pnpm --filter basic compile
pnpm --filter basic preview
```

从根目录通过 Turbo 启动：

```bash
pnpm dev
pnpm lint:fix
```

### 5.2 Vite 配置

文件：`apps/basic/vite.config.ts`

插件链：

1. `tanstackRouter`
2. `@vitejs/plugin-react-swc`
3. `linguiMacroSwcPlugin`
4. `@rolldown/plugin-babel`
5. `reactCompilerPreset`
6. `lingui`

当前配置：

```ts
plugins: [
  tanstackRouter({
    target: "react",
    autoCodeSplitting: true,
  }),
  react({
    plugins: [linguiMacroSwcPlugin()],
  }),
  babel({ presets: [reactCompilerPreset()] }),
  lingui(),
]
```

关键点：

- TanStack Router 插件会根据 `src/routes` 生成 `src/routeTree.gen.ts`。
- Lingui SWC 宏插件负责展开 ``t`...` ``、`msg` 等宏。
- React Compiler preset 接在宏转换之后，避免 compiler 分析未展开宏。
- `resolve.alias` 将 `@` 指向 `/src`，因此源码中大量使用 `@/xxx`。

### 5.3 TypeScript

应用使用 TypeScript project references：

```text
tsconfig.json
tsconfig.app.json
tsconfig.node.json
```

构建命令：

```bash
tsc -b && vite build
```

这意味着 build 会先进行 TypeScript 构建检查，再进行 Vite 打包。

## 6. 应用启动流程

入口文件：`apps/basic/src/main.tsx`

启动流程：

1. 创建 TanStack Router。
2. 将 router 安装给 HTTP 层，用于 401/403 时导航。
3. 注册 TanStack Router 类型。
4. 根据环境决定是否启动 MSW。
5. 等待 Zustand 持久化状态 rehydrate。
6. 根据持久化的 locale 加载 Lingui 初始语言包。
7. 激活 Lingui 当前语言。
8. 设置 `document.documentElement.lang` 和 `dir`。
9. 渲染 React 根组件。

简化流程：

```tsx
const router = createRouter({ routeTree, defaultPreload: "intent" });
installHttpRouter(router);

enableMocking()
  .then(async () => {
    await Promise.all([
      useSettingsStore.persist.rehydrate(),
      useAuthStore.persist.rehydrate(),
    ]);

    const initialLocale = useSettingsStore.getState().locale;
    const messages = await loadLocaleCatalog(initialLocale);
    i18n.load(initialLocale, messages);
    i18n.activate(initialLocale);

    createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>,
    );
  });
```

这里先加载语言再渲染，可以避免首屏语言闪烁。

## 7. 路由系统

### 7.1 文件路由目录

文件目录：

```text
src/routes
├─ __root.tsx
├─ index.tsx
├─ login/index.tsx
├─ register/index.tsx
├─ 404/index.tsx
├─ _auth.tsx
└─ _auth/
   ├─ dashboard/index.tsx
   ├─ users/index.tsx
   └─ 403/index.tsx
```

### 7.2 路由语义

| 文件 | 路径 | 说明 |
| --- | --- | --- |
| `__root.tsx` | root | 全局 Provider、错误页、NotFound |
| `index.tsx` | `/` | 首页入口，通常重定向或进入默认页 |
| `login/index.tsx` | `/login` | 登录页 |
| `register/index.tsx` | `/register` | 注册页 |
| `404/index.tsx` | `/404` | 404 页面 |
| `_auth.tsx` | pathless layout | 认证路由组和主布局 |
| `_auth/dashboard/index.tsx` | `/dashboard` | 仪表盘 |
| `_auth/users/index.tsx` | `/users` | 用户管理 |
| `_auth/403/index.tsx` | `/403` | 无权限页面 |

`_auth` 是 pathless route，它本身不产生 URL 片段，但作为受保护路由的父级布局和守卫。

### 7.3 routeTree.gen.ts

文件：`src/routeTree.gen.ts`

这是 TanStack Router 插件生成文件，不应手工维护。它根据 `src/routes` 文件结构生成路由树和类型。

如果路由文件新增、移动或删除，应通过 Vite/TanStack Router 插件重新生成。

### 7.4 路由守卫

文件：`src/routes/_auth.tsx`

核心逻辑：

```tsx
beforeLoad: async ({ location }) => {
  const { isAuthenticated, user, tokens } = useAuthStore.getState();
  if (!isAuthenticated) {
    throw redirect({ to: "/login" });
  }

  if (tokens && !user) {
    await fetchSessionAndApplyToStore();
  }

  if (!canAccessPath(location.pathname, nextUser?.permissions)) {
    throw redirect({ to: "/403" });
  }
}
```

职责：

- 未登录访问受保护页面时跳转 `/login`。
- 已有 token 但没有 user 时拉取 session。
- session 拉取失败时 logout 并跳转 `/login`。
- 根据权限判断当前 path 是否可访问。
- 无权限时跳转 `/403`。

## 8. 认证与权限

### 8.1 认证状态

文件：`src/stores/auth.ts`

状态结构：

```ts
interface AuthState {
  tokens: AuthTokens | null;
  user: User | null;
  menus: MenuItem[];
  isAuthenticated: boolean;
  setTokens: (tokens: AuthTokens) => void;
  setUser: (user: User) => void;
  setMenus: (menus: MenuItem[]) => void;
  hasPermission: (point: string) => boolean;
  logout: () => void;
}
```

持久化策略：

- 持久化 `tokens` 和 `isAuthenticated`。
- 不持久化 `user` 和 `menus`。
- rehydrate 后 `user` 和 `menus` 重置为空。

这样做的目的：

- token 可以跨刷新保留。
- 用户信息和菜单权限每次新会话重新拉取，避免本地菜单权限长期陈旧。

### 8.2 Session 拉取

文件：`src/utils/session.ts`

流程：

1. 请求 `/api/auth/user` 获取基础用户信息。
2. 请求 `/api/auth/permissions` 获取权限列表。
3. 组合成完整 `User`。
4. 根据权限过滤菜单树。
5. 写入 auth store。

```ts
const [userBase, permissions] = await Promise.all([
  httpClient.get(AUTH_ENDPOINTS.user),
  httpClient.get(AUTH_ENDPOINTS.permissions),
]);

const user = UserSchema.parse({ ...userBase, permissions });
const menus = filterMenuTreeByPermissions(APP_MENU_TREE, permissions);
setUser(user);
setMenus(menus);
```

### 8.3 权限菜单

文件：`src/utils/appMenu.ts`

静态菜单树：

```ts
APP_MENU_TREE
```

菜单节点包含：

- `id`
- `kind`
- `name`
- `path`
- `icon`
- `permissions`
- `sort`
- `hidden`
- `children`

权限过滤函数：

```ts
filterMenuTreeByPermissions(nodes, permissionList)
```

路由访问判断：

```ts
canAccessPath(pathname, permissions)
```

当前权限映射：

| 路径 | 权限 |
| --- | --- |
| `/dashboard` | 无 |
| `/users` | `user:view` |
| `/design-engineering` | 无 |
| `/sales-marketing` | `user:view` |
| `/403` | 无 |

## 9. 网络请求层

### 9.1 httpClient

文件：`src/utils/http.ts`

导出：

```ts
httpClient.get<T>()
httpClient.post<T>()
httpClient.put<T>()
httpClient.delete<T>()
```

职责：

- 拼接 API base URL。
- 处理 query params。
- 自动附加 `Authorization: Bearer <accessToken>`。
- 处理 HTTP 错误。
- 处理业务 envelope。
- 处理 401 token refresh。
- 处理 403 跳转。

### 9.2 响应 envelope

请求返回后会按如下约定解析：

```ts
const envelope = json as { code?: number; data?: unknown; message?: string };

if (envelope.code !== undefined && envelope.code !== 0) {
  throw new ApiError(envelope.code, envelope.message ?? "Unknown error");
}

return envelope.data !== undefined ? envelope.data : json;
```

因此后端既可以返回：

```json
{ "code": 0, "data": {...}, "message": "ok" }
```

也可以返回非 envelope JSON。当前 mock 主要使用 envelope。

### 9.3 Token refresh

当响应为 401 且当前请求不是 refresh 请求时：

1. 调用 `/api/auth/refresh`。
2. refresh 成功后保存新 token。
3. 重试原请求一次。
4. refresh 失败则 logout 并跳转 `/login`。

并发保护：

```ts
let inflightRefresh: Promise<boolean> | null = null;
```

多个请求同时遇到 401 时，会复用同一个 refresh promise，避免重复刷新。

### 9.4 错误类型

```ts
class ApiError extends Error {
  code: number;
}

class HttpError extends Error {
  status: number;
}
```

- `ApiError` 表示业务 code 非 0。
- `HttpError` 表示 HTTP status 非 2xx 或认证/权限失败。

Root 中 QueryClient mutation 默认错误处理会展示 message：

```ts
mutations: {
  onError: (err) => {
    message.error(err instanceof Error ? err.message : String(err));
  },
}
```

## 10. API 类型与 Zod Schema

文件：`src/api/schemas.ts`

主要 schema：

- `UserSchema`
- `AuthTokensSchema`
- `LoginRequestSchema`
- `RegisterRequestSchema`
- `RefreshTokenRequestSchema`
- `MenuItemSchema`
- `ApiResponseSchema`
- `PaginatedResponseSchema`
- `SearchParamsSchema`
- `CreateUserRequestSchema`
- `UpdateUserRequestSchema`

设计特点：

- 请求体在提交前使用 Zod 校验。
- 响应数据在进入 UI 前使用 Zod parse。
- 表单空字符串会通过 transform 归一化为 `undefined` 或 `null`。

例如注册邮箱：

```ts
const registerOptionalEmailSchema = z
  .union([z.string(), z.undefined()])
  .transform((v) => {
    if (v === undefined) return undefined;
    const t = String(v).trim();
    return t === "" ? undefined : t;
  })
  .pipe(z.union([z.string().email(), z.undefined()]));
```

这样可以兼容 Ant Design Form 对空输入的提交行为。

## 11. Mock 系统

### 11.1 启动条件

文件：`src/main.tsx`

```ts
const enableMockInBuild = import.meta.env.VITE_ENABLE_MOCK === "true";
if (!import.meta.env.DEV && !enableMockInBuild) return;
```

含义：

- 开发环境默认启用 MSW。
- 构建产物默认不启用 MSW。
- 如果设置 `VITE_ENABLE_MOCK=true`，非 DEV 环境也可以启用 mock。

### 11.2 Mock 文件结构

```text
src/mocks
├─ browser.ts
├─ createHandler.ts
├─ createHandler.test.ts
├─ data.ts
├─ utils.ts
└─ handlers/
   ├─ auth.ts
   ├─ index.ts
   └─ user.ts
```

### 11.3 Auth mock

文件：`src/mocks/handlers/auth.ts`

支持接口：

- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/user`
- `GET /api/auth/permissions`

内置登录账号：

| 用户名 | 密码 | 说明 |
| --- | --- | --- |
| `admin` | `admin` | 管理员，拥有 mock 用户权限 |
| `guest` | `guest` | 访客，权限为空 |

注册接口会在内存中记录最近注册的用户，使后续 `/api/auth/user` 能返回注册用户信息。

### 11.4 User mock

文件：`src/mocks/handlers/user.ts`

支持接口：

- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`

特性：

- 内存数组保存用户列表。
- 支持 keyword、role 过滤。
- 支持 limit、offset 分页。
- 支持 401 过期 token 测试。
- 创建、更新、删除会修改内存状态。

## 12. 状态管理

### 12.1 createPersistentStore

文件：`src/stores/createPersistentStore.ts`

该工具封装 Zustand persist，用于 auth/settings 这类需要持久化的状态。

当前文档未展开源码细节，但从使用侧可以看出它支持：

- `name`
- `partialize`
- `merge`
- `persist.rehydrate()`

### 12.2 auth store

文件：`src/stores/auth.ts`

负责：

- token
- user
- menus
- 登录状态
- 权限判断
- logout

### 12.3 settings store

文件：`src/stores/settings.ts`

负责：

- `darkMode`
- `sidebarCollapsed`
- `locale`
- `toggleDarkMode`
- `toggleSidebar`
- `setSidebarCollapsed`
- `setLocale`

持久化字段：

```ts
darkMode
sidebarCollapsed
locale
```

初始暗色模式来自系统偏好：

```ts
window.matchMedia("(prefers-color-scheme: dark)").matches
```

## 13. 国际化

项目使用 Lingui 处理业务文案，Ant Design locale 处理组件内置文案。

专题说明见：

```text
lingui-i18n-technical-notes.md
```

### 13.1 关键文件

```text
apps/basic/lingui.config.ts
apps/basic/src/locales/loadLocaleCatalog.ts
apps/basic/src/locales/en/messages.po
apps/basic/src/locales/zh/messages.po
apps/basic/src/routes/__root.tsx
apps/basic/src/main.tsx
```

### 13.2 使用方式

组件内部：

```tsx
const { t } = useLingui();

return <span>{t`Users`}</span>;
```

配置对象或模块级常量：

```tsx
const MENU_LABELS = {
  Dashboard: msg`Dashboard`,
};

const label = t(MENU_LABELS.Dashboard);
```

### 13.3 开发流程

新增文案后：

```bash
pnpm --filter basic extract
```

补充 `.po` 翻译后：

```bash
pnpm --filter basic compile
```

### 13.4 关键约束

- 不要把翻译结果作为 React key。
- 不要把翻译结果作为 API value。
- `useMemo` 中使用 `t` 时依赖数组必须包含 `t`。
- 普通字符串不会被 Lingui 提取。

## 14. 主题系统

### 14.1 useAppTheme

文件：

```text
src/hooks/useAppTheme.ts
src/hooks/tokenBuilders.ts
```

`useAppTheme` 根据 settings 中的 `darkMode` 返回 Ant Design `ConfigProviderProps`。

`tokenBuilders.ts` 负责构建 light/dark 主题 token。

### 14.2 品牌色

品牌主色读取环境变量：

```ts
VITE_BRAND_PRIMARY
```

要求是 6 位 hex：

```ts
/^#[0-9a-fA-F]{6}$/
```

未提供或不合法时默认：

```text
#1677ff
```

### 14.3 共享 token

```ts
fontFamily
borderRadius: 8
borderRadiusSM: 6
borderRadiusLG: 12
```

### 14.4 组件 token

Button：

- 去掉 primary/default/danger shadow

Input：

- 去掉 activeShadow

Table：

- 根据主题算法计算选中行背景

Menu：

- light/dark 各自配置选中、hover、active 背景和颜色

### 14.5 全局 CSS

文件：`src/index.css`

内容：

- Tailwind base/components/utilities
- 全局滚动条变量
- light/dark 滚动条颜色
- Firefox 与 WebKit 滚动条样式

`__root.tsx` 会根据 `darkMode` 设置：

```ts
document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
```

## 15. 布局系统

### 15.1 MainLayout

文件：`src/components/Layout/MainLayout/index.tsx`

结构：

```tsx
<Layout>
  <Sidebar />
  <Flex vertical>
    <Header />
    <Content>
      <Outlet />
    </Content>
  </Flex>
</Layout>
```

Content 关键样式：

- `flex: 1`
- `padding: token.paddingLG`
- `minHeight: 0`
- `display: flex`
- `flexDirection: column`
- `overflow: auto`

这为用户管理页这类内部滚动表格提供基础布局能力。

### 15.2 Sidebar

文件：`src/components/Layout/Sidebar/index.tsx`

特性：

- 桌面端使用 Ant Design `Sider`。
- 移动端使用 Ant Design `Drawer`。
- 菜单来自 `authStore.menus`。
- 菜单按 `sort` 排序。
- 支持 `hidden` 过滤。
- 支持 group/item 两种菜单节点。
- 支持展开/折叠。
- 支持移动端打开/关闭。
- 支持当前路由选中和父级展开。
- 支持 Lingui 翻译菜单 label。
- 支持 lucide 图标映射。
- 底部集成 `UserMenu`。

菜单构建函数：

```ts
buildMenuItems(menus, t, token, collapsed, iconSize, parentKeys)
```

输出：

- Ant Design Menu items
- `keyToPath`
- `pathToKeyChain`

### 15.3 Header

文件：`src/components/Layout/Header/index.tsx`

特性：

- 移动端显示侧边栏按钮。
- 根据当前路径生成 Breadcrumb。
- 支持隐藏 breadcrumb。
- 支持语言切换。
- 支持明暗主题切换。

语言切换：

```ts
const next: Locale = locale === "en" ? "zh" : "en";
setLocale(next);
```

### 15.4 UserMenu

文件：

```text
src/components/Layout/UserMenu/index.tsx
src/components/Layout/UserMenu/index.css
```

职责：

- 展示当前用户头像/名称。
- 折叠状态下适配窄侧边栏。
- 提供账号下拉菜单。
- 当前主要操作是 Sign Out。

## 16. 通用组件

### 16.1 DataTable

文件：

```text
src/components/DataTable/index.tsx
src/components/DataTable/DataTableSkeleton.tsx
src/components/DataTable/DataTableEmpty.tsx
src/components/DataTable/index.css
```

职责：

- 封装 Ant Design Table。
- 统一外框、圆角、边框和 flex 布局。
- loading 时显示结构化 skeleton，而不是默认 spinner。
- 空数据时显示统一空状态。
- 支持内部滚动高度控制。
- 支持 `layoutRef`、`frameRef` 让外部 hook 测量高度。

关键 props：

```ts
lockScrollHeight?: boolean;
maxHeight?: number;
frameHeight?: number;
layoutRef?: Ref<HTMLDivElement | null>;
frameRef?: Ref<HTMLDivElement | null>;
bottomExtra?: ReactNode;
```

### 16.2 FilterToolbar

文件：`src/components/FilterToolbar/index.tsx`

职责：

- 管理筛选项和操作按钮的响应式布局。
- 根据容器宽度计算最多能展示多少 inline filter。
- 超出的筛选项放入 Popover。
- 使用 ResizeObserver 监听尺寸变化。

核心算法：

```ts
maxVisibleSlots(slotWidths, availableForLeft, innerGap, triggerReserve)
```

### 16.3 BaseFormModal

文件：`src/components/FormModal/index.tsx`

职责：

- 封装 Ant Design Modal + Form。
- 统一 centered、title、okText、cancelText、loading。
- 点击 OK 时触发表单 submit。
- 使用 `scrollToFirstError`。

### 16.4 Auth

文件：`src/components/Auth/index.tsx`

用于认证页的共享展示结构。通常配合登录/注册页使用。

### 16.5 Aurora

文件：

```text
src/components/Aurora/index.tsx
src/components/Aurora/index.css
```

用于登录/注册等页面的视觉背景效果。

### 16.6 NotFound 与 RouteError

文件：

```text
src/components/NotFound/index.tsx
src/components/RouteError.tsx
```

用于 root route 的 404 和错误边界。

## 17. 通用 Hooks

### 17.1 useResourceCRUD

文件：`src/hooks/useResourceCRUD.ts`

基于 TanStack Query 封装通用 CRUD。

支持：

- list query
- create mutation
- update mutation
- delete mutation
- lifecycle 回调
- update/delete 乐观更新
- mutation 成功后 invalidate query
- mutation 失败后 rollback

关键参数：

```ts
queryKey
invalidateKey
queryFn
select
createFn
updateFn
deleteFn
createLifecycle
updateLifecycle
deleteLifecycle
optimistic
```

乐观更新函数：

```ts
applyOptimisticListUpdate()
applyOptimisticListDelete()
```

### 17.2 useCrudToasts

文件：`src/hooks/useCrudToasts.ts`

为 CRUD lifecycle 提供统一提示文案。当前已接 Lingui。

### 17.3 useTableFitHeight

文件：`src/hooks/useTableFitHeight.ts`

用于用户管理页这种“顶部筛选 + 下方表格”的布局。

职责：

- 测量主内容区域可用高度。
- 根据 toolbar、content、pagination、row count 计算表格滚动高度。
- 当内容不足时不锁定滚动。
- 当内容溢出时设置 `scroll.y`。
- 使用 ResizeObserver 响应容器变化。

返回：

```ts
tableAreaMaxHeight
tableScrollY
lockScrollHeight
```

### 17.4 useUrlSearchState

文件：`src/hooks/useUrlSearchState.ts`

用于 URL search 和输入框状态之间的同步。

职责：

- 输入框本地状态 `keywordInput`
- search.keyword 变化时同步回输入框
- commit/apply keyword 时 trim 并重置 offset

### 17.5 usePermission

文件：`src/hooks/usePermission.ts`

基于 auth store 的权限辅助 hook，用于组件级权限判断。

### 17.6 useAppTheme

文件：`src/hooks/useAppTheme.ts`

根据 settings store 中的 `darkMode` 返回 light/dark Ant Design 主题配置。

## 18. 业务页面

### 18.1 登录页

文件：

```text
src/routes/login/index.tsx
src/routes/login/index.css
```

职责：

- 已登录用户访问时跳转 `/dashboard`。
- 提交登录表单。
- 调用 `/api/auth/login`。
- 保存 token。
- 拉取 session。
- 登录成功后跳转 dashboard。

Mock 账号：

```text
admin / admin
guest / guest
```

### 18.2 注册页

文件：`src/routes/register/index.tsx`

职责：

- 已登录用户访问时跳转 `/dashboard`。
- 提交注册表单。
- 调用 `/api/auth/register`。
- 保存 token。
- 拉取 session。
- 注册成功后跳转 dashboard。

### 18.3 Dashboard

文件：

```text
src/routes/_auth/dashboard/index.tsx
src/routes/_auth/dashboard/index.css
```

职责：

- 展示统计卡片。
- 展示 timeline。
- 展示 recent sales。
- 使用 React Query 模拟 dashboard shell loading。
- loading 时展示骨架屏。
- 接入 Lingui 翻译 stat title/description。
- 使用 Ant Design theme token 控制 spacing、字体、颜色。

注意：

- `stats` 每项使用稳定 `id`。
- React key 使用 `stat.id`，不要使用翻译后的 `stat.title`。

### 18.4 Users

文件：

```text
src/routes/_auth/users/index.tsx
src/routes/_auth/users/-Toolbar.tsx
src/routes/_auth/users/-FormModal.tsx
```

职责：

- 用户列表。
- 关键字搜索。
- 角色筛选。
- 服务端分页。
- 服务端排序。
- 创建用户。
- 编辑用户。
- 删除用户。
- 删除确认弹窗。
- mutation toast。
- update/delete 乐观更新。
- URL search 状态同步。
- 表格高度自适应。

URL search schema：

```ts
{
  limit: number;
  offset: number;
  sortField: string | null;
  sortOrder: "ascend" | "descend" | null;
  keyword: string;
  role: string;
}
```

queryKey：

```ts
[
  "users",
  search.limit,
  search.offset,
  search.keyword,
  search.role,
  search.sortField,
  search.sortOrder,
]
```

### 18.5 403

文件：`src/routes/_auth/403/index.tsx`

展示无权限页面，通常由路由守卫或 HTTP 403 跳转进入。

### 18.6 404

文件：`src/routes/404/index.tsx`

展示未找到页面。

## 19. 数据流示例：登录到访问用户页

1. 用户访问 `/login`。
2. 输入账号密码。
3. 登录页调用 `/api/auth/login`。
4. `httpClient.post` 返回 token。
5. `authStore.setTokens()` 保存 token 和登录状态。
6. 调用 `fetchSessionAndApplyToStore()`。
7. 并发请求 `/api/auth/user` 和 `/api/auth/permissions`。
8. 用 Zod 校验 user 和 permissions。
9. 根据 permissions 过滤 `APP_MENU_TREE`。
10. 保存 user 和 menus 到 auth store。
11. 跳转 `/dashboard`。
12. 访问 `/users` 时 `_auth.beforeLoad` 判断是否登录。
13. `canAccessPath("/users", permissions)` 检查是否有 `user:view`。
14. Users 页面根据 URL search 生成 queryKey。
15. React Query 调用 `/api/users`。
16. 响应经 Zod 校验后渲染 DataTable。

## 20. 数据流示例：Token 过期刷新

1. 页面请求业务接口。
2. 后端返回 HTTP 401。
3. `httpClient` 判断当前不是 refresh 请求。
4. 调用 `refreshSessionTokens()`。
5. 如果已有 refresh 进行中，则复用同一个 promise。
6. 请求 `/api/auth/refresh`。
7. 成功后 `setTokens(next)`。
8. 重试原请求一次。
9. 如果 refresh 失败，执行 logout。
10. 导航到 `/login`。

## 21. 数据流示例：用户编辑乐观更新

1. 用户点击 row actions 的 Edit。
2. 表单填入当前 record。
3. 提交表单。
4. `updateMutation.onMutate` 取消当前 query。
5. 保存 query snapshot。
6. 如果开启 optimistic update，先更新 query cache。
7. 请求 `/api/users/:id`。
8. 成功后 invalidate users query。
9. 关闭 modal，清空 editingUser，reset form。
10. 失败时恢复 snapshot 并显示错误提示。

## 22. 样式与 UI 约定

### 22.1 Ant Design token 优先

组件样式优先使用：

```tsx
const { token } = theme.useToken();
```

常用 token：

- `token.padding`
- `token.paddingLG`
- `token.marginSM`
- `token.marginMD`
- `token.marginLG`
- `token.borderRadius`
- `token.borderRadiusLG`
- `token.colorBorderSecondary`
- `token.colorBgLayout`
- `token.colorTextSecondary`

### 22.2 CSS 文件作用

局部复杂交互或 Ant Design 子结构修正使用 CSS 文件：

- dashboard hover/skeleton 修正
- sidebar collapsed brand 交互
- user menu 样式
- data table 内部结构
- login 页面布局
- Aurora 背景

### 22.3 图标

项目使用 `lucide-react`。

菜单图标通过字符串映射：

```ts
MENU_ICON_MAP
```

这样 mock/API 只需要返回 icon 字符串，前端统一映射到组件。

## 23. 环境变量

当前代码直接使用的环境变量：

| 变量 | 用途 | 默认 |
| --- | --- | --- |
| `VITE_BRAND_PRIMARY` | 品牌主色 | `#1677ff` |
| `VITE_ENABLE_MOCK` | 非 DEV 环境是否启用 MSW | false |

还应检查 `src/utils/constants.ts` 中是否有 API base URL 或品牌常量。当前文档基于源码调用确认 `API_BASE_URL`、`APP_BRAND_NAME`、`APP_FAVICON_SRC` 由 constants 提供。

## 24. 测试

当前存在测试文件：

```text
src/hooks/useResourceCRUD.test.ts
src/mocks/createHandler.test.ts
```

但 `apps/basic/package.json` 当前没有 `test` 脚本，只有根目录的占位 `test`：

```json
"test": "echo \"Error: no test specified\" && exit 1"
```

如果要启用测试，需要补充 Vitest 相关依赖和脚本，例如：

```json
"test": "vitest run"
```

并确认 Vite/Vitest 配置支持 React、TS 路径别名和 jsdom。

## 25. Lint 与格式化

### 25.1 根 ESLint

文件：`eslint.config.mts`

启用：

- `@eslint/js`
- `typescript-eslint`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `eslint-config-prettier`
- `eslint-plugin-oxlint`

### 25.2 应用 lint

命令：

```bash
pnpm --filter basic lint:fix
```

实际执行：

```bash
oxlint --fix && eslint --fix
```

### 25.3 格式化

命令：

```bash
pnpm --filter basic fmt
```

实际执行：

```bash
oxfmt
```

## 26. Git Hook 与 Commit 规范

根目录包含：

```text
lefthook.yml
commitlint.config.ts
```

`commitlint.config.ts` 使用 conventional config。

这意味着提交信息应遵循 Conventional Commits，例如：

```text
feat: add user role filter
fix: handle refresh token failure
docs: add project technical overview
```

## 27. 新增页面建议流程

新增一个受保护页面时，建议步骤：

1. 在 `src/routes/_auth/<page>/index.tsx` 新建路由文件。
2. 使用 `createFileRoute("/_auth/<page>/")`。
3. 如果页面需要权限，在 `requiredPermissionForPath()` 中增加 path 映射。
4. 在 `APP_MENU_TREE` 中增加菜单节点。
5. 如果菜单文案需要翻译，在 Sidebar 的 `MENU_LABELS` 增加 `msg`。
6. 页面用户可见文案使用 Lingui。
7. 页面 API 响应使用 Zod schema 校验。
8. 服务端状态使用 React Query。
9. 表格页优先复用 `DataTable`、`FilterToolbar`、`BaseFormModal`、`useResourceCRUD`。
10. 执行 `pnpm --filter basic extract` 更新文案。

## 28. 新增 API 建议流程

新增 API 时，建议步骤：

1. 在 `src/api/schemas.ts` 增加请求/响应 schema。
2. 在 `src/api/<domain>.ts` 增加 endpoint 常量和类型导出。
3. 页面或 hook 中使用 `httpClient` 调用。
4. 对请求体调用 schema parse。
5. 对响应体调用 schema parse。
6. 如果需要 mock，在 `src/mocks/handlers/<domain>.ts` 增加 handler。
7. 在 `src/mocks/handlers/index.ts` 汇总 handler。
8. 对复杂 handler 补测试。

## 29. 新增 CRUD 页面建议结构

推荐文件结构：

```text
src/routes/_auth/<resource>/
├─ index.tsx
├─ -Toolbar.tsx
└─ -FormModal.tsx
```

推荐组合：

- `Route.validateSearch` + Zod 校验 URL search。
- `useUrlSearchState` 管 keyword 输入。
- `useResourceCRUD` 管 query/mutation。
- `useCrudToasts` 管提示。
- `DataTable` 管表格展示。
- `useTableFitHeight` 管表格高度。
- `BaseFormModal` 管创建/编辑表单。

## 30. 重要维护注意事项

### 30.1 不要手改 routeTree.gen.ts

这是生成文件。路由变更应通过文件路由和插件重新生成。

### 30.2 不要持久化权限菜单

当前设计只持久化 token，刷新后重新拉 user/permissions/menu。这样权限变化更容易生效。

### 30.3 不要把翻译文本当稳定值

错误示例：

```tsx
key={t`Users`}
value={t`admin`}
```

正确示例：

```tsx
key="users"
value="admin"
label={t`Users`}
```

### 30.4 Zod parse 应靠近边界

推荐在这些边界做校验：

- 表单提交前
- URL search validate
- API 响应进入 UI 前
- Mock handler 返回前

### 30.5 URL search 是列表状态来源

用户管理页的分页、筛选、排序都在 URL 中。这样刷新、分享链接、浏览器前进后退都能恢复状态。

### 30.6 401/403 导航依赖 installHttpRouter

`httpClient` 内部不能直接使用 React hook，所以通过：

```ts
installHttpRouter(router)
```

保存 router 引用。入口初始化时必须调用，否则 401/403 自动导航不会生效。

### 30.7 Mock 是内存态

MSW 用户数据保存在模块变量中，刷新页面后会恢复初始 mock 数据。不要把它当真实持久化后端。

## 31. 当前项目可改进点

以下不是必须立即修改的问题，但后续维护时值得关注：

1. 根 `package.json` 可补充 `build` 脚本，与 `turbo.json` 对齐。
2. `pnpm-workspace.yaml` 中 `"lefthook "` 可能存在尾随空格，应确认是否需要改为 `"lefthook"`。
3. `apps/basic/package.json` 有测试文件但没有 `test` 脚本，可补充 Vitest。
4. `main.tsx` 中部分中文注释显示为乱码，建议统一保存为 UTF-8 并修复注释。
5. `apps/basic/README.md` 仍是 Vite 模板说明，建议替换为当前应用说明。
6. 如果项目持续扩大，可把通用组件、hooks、类型迁移到 `packages/*`。
7. 权限 path 映射当前是手写 map，后续可以考虑从菜单树或路由 metadata 派生。
8. 目前 API endpoint 只有常量和类型，后续可以封装 domain service 函数，减少页面直接拼调用。

## 32. 快速上手

安装依赖：

```bash
pnpm install
```

启动开发：

```bash
pnpm dev
```

或只启动 basic：

```bash
pnpm --filter basic dev
```

构建：

```bash
pnpm --filter basic build
```

修复 lint：

```bash
pnpm --filter basic lint:fix
```

提取国际化文案：

```bash
pnpm --filter basic extract
```

编译国际化消息：

```bash
pnpm --filter basic compile
```

开发环境默认启用 MSW。可用账号：

```text
admin / admin
guest / guest
```

## 33. 关键文件索引

| 文件 | 作用 |
| --- | --- |
| `apps/basic/src/main.tsx` | 应用入口、router、MSW、持久化恢复、初始 i18n |
| `apps/basic/src/routes/__root.tsx` | 全局 Provider、QueryClient、ConfigProvider、I18nProvider |
| `apps/basic/src/routes/_auth.tsx` | 登录与权限路由守卫 |
| `apps/basic/src/utils/http.ts` | HTTP client、token refresh、错误处理 |
| `apps/basic/src/utils/session.ts` | 拉取用户、权限、菜单 |
| `apps/basic/src/utils/appMenu.ts` | 菜单树、权限过滤、path 权限判断 |
| `apps/basic/src/stores/auth.ts` | 认证 store |
| `apps/basic/src/stores/settings.ts` | 设置 store |
| `apps/basic/src/api/schemas.ts` | Zod schema 和类型 |
| `apps/basic/src/hooks/useResourceCRUD.ts` | 通用 CRUD hook |
| `apps/basic/src/components/DataTable/index.tsx` | 通用表格 |
| `apps/basic/src/components/FilterToolbar/index.tsx` | 响应式筛选工具栏 |
| `apps/basic/src/components/Layout/Sidebar/index.tsx` | 侧边栏与菜单 |
| `apps/basic/src/components/Layout/Header/index.tsx` | 顶栏、面包屑、语言/主题切换 |
| `apps/basic/src/routes/_auth/users/index.tsx` | 用户管理主页面 |
| `apps/basic/src/routes/_auth/dashboard/index.tsx` | Dashboard 页面 |
| `apps/basic/src/mocks/handlers/auth.ts` | 认证 mock |
| `apps/basic/src/mocks/handlers/user.ts` | 用户 mock |
| `apps/basic/vite.config.ts` | Vite 插件链 |
| `apps/basic/lingui.config.ts` | Lingui 配置 |

