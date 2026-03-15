# myrn

## 项目简介

myrn 是一个基于 React Native 和 Expo 的移动应用项目，支持跨平台开发（iOS、Android 与 Web）。项目采用模块化设计，包含丰富的 UI 组件和图片贴纸编辑能力。

## 功能特性

1. **图片选择与预览**：支持从相册选择图片并预览。
2. **贴纸编辑能力**：支持添加、拖拽、双击缩放贴纸，以及随机贴纸、清除贴纸与贴纸尺寸调节。
3. **更友好的小屏交互**：编辑区操作支持“更多/收起”，避免按钮过密。
4. **自定义 Emoji 上传**：支持用户从相册上传自定义 Emoji 作为贴纸，并可手动清空已上传列表。
5. **重置行为明确**：`重置`仅清空当前编辑状态，不删除已上传 Emoji。
6. **导航布局**：使用 Expo Router 实现底部标签导航和堆栈导航。
7. **响应式设计**：适配不同屏幕尺寸和设备。

## 项目结构

- `app/(tabs)`：底部标签导航相关页面。
  - `_layout.tsx`：标签导航布局配置。
  - `index.tsx`：主页面，包含图片选择、贴纸编辑、保存与自定义 Emoji 上传。
  - `about.tsx`：关于页面。
- `components`：可复用的 UI 组件。
  - `Button.tsx`：自定义按钮组件。
  - `EmojiList.tsx`：Emoji 列表与上传入口。
  - `EmojiPicker.tsx`：底部弹出的 Emoji 选择面板。
  - `EmojiSticker.tsx`：可拖拽/缩放的贴纸组件。
  - `ImageViewer.tsx`：图片预览组件。
- `tests`：轻量测试。
  - `smoke.test.mjs`：资源与关键行为防回归测试。
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
npx expo export
```

## 开发指南

1. **环境要求**：
   - Node.js 18+
   - Expo CLI
   - Android Studio 或 Xcode（用于模拟器运行）

2. **代码规范**：
   - 遵循 ESLint 和 Prettier 规范。
   - 提交代码前运行 `npm run lint` 检查代码风格。

3. **产品说明**：
   - `重置`不会删除已上传 Emoji；如需删除，请在 Emoji 面板点击“清空已上传”。
   - 关于页包含隐私说明与反馈邮箱。

4. **测试建议**：
   - 提交代码前运行 `npm test` 执行防回归测试。

## 贡献指南

欢迎提交 Pull Request 或 Issue 来改进项目。

## 许可证

MIT
