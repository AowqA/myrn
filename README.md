# myrn

## 项目简介

myrn 是一个基于 React Native 和 Expo 的移动应用项目，支持跨平台开发（iOS 和 Android）。项目采用模块化设计，包含丰富的 UI 组件和功能模块。

## 功能特性

1. **图片选择与预览**：支持从相册选择图片并预览。
2. **自定义按钮组件**：提供主题化按钮，支持自定义样式和事件。
3. **导航布局**：使用 Expo Router 实现底部标签导航和堆栈导航。
4. **响应式设计**：适配不同屏幕尺寸和设备。

## 项目结构

- `app/(tabs)`：底部标签导航相关页面。
  - `_layout.tsx`：标签导航布局配置。
  - `index.tsx`：主页面，包含图片选择和预览功能。
- `components`：可复用的 UI 组件。
  - `Button.tsx`：自定义按钮组件。
  - `ImageViewer.tsx`：图片预览组件。
- `app/_layout.tsx`：全局导航布局配置。

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行项目

```bash
npm start
```

### 构建应用

```bash
npm run build
```

## 开发指南

1. **环境要求**：
   - Node.js 16+
   - Expo CLI
   - Android Studio 或 Xcode（用于模拟器运行）

2. **代码规范**：
   - 遵循 ESLint 和 Prettier 规范。
   - 提交代码前运行 `npm run lint` 检查代码风格。

## 贡献指南

欢迎提交 Pull Request 或 Issue 来改进项目。

## 许可证

MIT