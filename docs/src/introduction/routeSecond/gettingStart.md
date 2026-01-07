# 快速开始

## 安装

### 前置准备
- Node.js 18 及以上版本。
- 通过命令行界面 (CLI) 访问 VitePress 的终端。
- 支持 Markdown 语法的编辑器。
- 推荐 VSCode 及其官方 Vue 扩展。

VitePress 可以单独使用，也可以安装到现有项目中。在这两种情况下，都可以使用以下方式安装它：
::: code-group
```sh[📚npm]
$ npm add -D vitepress@next
```
:::

### 安装向导
VitePress 附带一个命令行设置向导，可以帮助你构建一个基本项目。安装后，通过运行以下命令启动向导：
::: code-group
```sh[📚npm]
$ npx vitepress init
```
:::
将需要回答几个简单的问题：
```
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Where should VitePress look for your markdown files?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
◇  Add a prefix for VitePress npm scripts?
│  Yes
│
◇  Prefix for VitePress npm scripts:
│  docs
│
└  Done! Now run pnpm run docs:dev and start writing.
```

### 文件结构
如果正在构建一个独立的 VitePress 站点，可以在当前目录 (./) 中搭建站点。但是，如果在现有项目中与其他源代码一起安装 VitePress，建议将站点搭建在嵌套目录 (例如 `./docs`) 中，以便它与项目的其余部分分开。
```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

### 配置文件
配置文件 (`.vitepress/config.mts`) 让你能够自定义 VitePress 站点的各个方面，最基本的选项是站点的标题和描述：
::: code-group
```sh[📚.vitepress/config.mts]
export default {
  // 站点级选项
  title: 'VitePress',
  description: 'Just playing around.',

  themeConfig: {
    // 主题级选项
  }
}
```
:::
还可以通过 `themeConfig` 选项配置主题的行为。有关所有配置选项的完整详细信息

### 源文件
`.vitepress` 目录之外的 Markdown 文件被视为源文件。

VitePress 使用 基于文件的路由：每个 `.md` 文件将在相同的路径被编译成为 `.html` 文件。例如，`index.md` 将会被编译成 `index.html`，可以在生成的 VitePress 站点的根路径 `/` 进行访问。

VitePress 还提供了生成简洁 URL、重写路径和动态生成页面的能力。这些将在[路由指南](/introduction/routeSecond/routing)中进行介绍。

### 启动并运行
该工具还应该将以下 npm 脚本注入到 `package.json` 中：
::: code-group
```json[📚package.json]
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
  ...
}
```
:::
开发服务应该会运行在 `http://localhost:5173` 上。在浏览器中访问 URL 以查看新站点的运行情况吧！