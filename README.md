# Vite React TypeScript Template

一个基于 Vite + React + TypeScript 的现代化开发模板，集成了多项实用功能和最佳实践。

## ✨ 特性

- 🚀 基于 Vite 构建，享受极速开发体验
- 🔥 使用 React 18 + TypeScript 开发，提供完整的类型支持
- 📱 集成移动端适配方案，使用 postcss-mobile-forever 实现
- 🎨 支持 SCSS 预处理器，提供全局变量和 CSS Modules
- 🎭 内置 Framer Motion 页面切换动画
- 📦 集成 Zustand + Immer 状态管理方案
- 🎯 使用 GSAP 提供流畅的动画效果
- 🔍 ESLint + TypeScript ESLint 代码规范
- 📂 规范的目录结构和别名配置
- 🛠️ 开发环境支持热更新
- 📚 支持 Mock 数据服务

## 🚀 快速开始

### 环境准备

- Node.js 18+
- pnpm 8+

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 📂 项目结构

```
├── src/
│   ├── assets/        # 静态资源文件
│   ├── components/    # 公共组件
│   ├── hooks/         # 自定义 Hooks
│   ├── layouts/       # 布局组件
│   ├── pages/         # 页面组件
│   ├── routers/       # 路由配置
│   ├── services/      # API 服务
│   ├── store/         # 状态管理
│   ├── styles/        # 全局样式
│   ├── types/         # 类型定义
│   ├── utils/         # 工具函数
│   ├── App.tsx        # 应用入口组件
│   └── main.tsx       # 应用入口文件
├── public/            # 公共静态资源
├── .env               # 环境变量配置
├── vite.config.ts     # Vite 配置
├── tsconfig.json      # TypeScript 配置
└── package.json       # 项目配置文件
```

## 🔧 配置说明

### 环境变量

项目使用 `.env` 文件管理环境变量：

- `VITE_ROUTER_TYPE`: 路由模式选择（BrowserRouter/HashRouter/MemoryRouter）
- `VITE_ANIMATION`: 是否开启路由过场动画
- `VITE_CONSOLE`: 是否开启 VConsole 调试工具
- `VITE_LONGPAGE`: 是否开启长图模式

### 移动端适配

使用 `postcss-mobile-forever` 进行移动端适配：

- 视觉稿宽度：750px
- 最大显示宽度：450px
- 根元素选择器：#root

### 路由动画

使用 Framer Motion 实现路由切换动画，可通过 `VITE_ANIMATION` 环境变量控制开关。

### 状态管理

使用 Zustand + Immer 进行状态管理，提供简洁高效的状态管理方案。

## 📝 开发规范

- 使用 TypeScript 编写代码，确保类型安全
- 遵循 ESLint 配置的代码规范
- 组件和工具函数编写单元测试
- 使用 CSS Modules 避免样式冲突
- 遵循语义化版本控制规范

## 🤝 贡献

欢迎提交 Issue 或 Pull Request 来改进这个模板！

## 📄 许可

[MIT License](LICENSE)
