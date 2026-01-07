# 自定义主题{#ssr-compat}
## 解析主题
可以通过创建一个 `.vitepress/theme/index.js` 或 `.vitepress/theme/index.ts` 文件 (即“主题入口文件”) 来启用自定义主题：

```markdown
.
├─ docs                # 项目根目录
│  ├─ .vitepress
│  │  ├─ theme
│  │  │  └─ index.js   # 主题入口
│  │  └─ config.js     # 配置文件
│  └─ index.md
└─ package.json
```

当检测到存在主题入口文件时，VitePress 总会使用自定义主题而不是默认主题。但你可以[扩展默认主题](/custom/extendsTheme)来在其基础上实现更高级的自定义。

## 主题接口
VitePress 自定义主题是一个对象，该对象具有如下接口：

```ts
interface Theme {
  /**
   * 每个页面的根布局组件
   * @required
   */
  Layout: Component
  /**
   * 增强 Vue 应用实例
   * @optional
   */
  enhanceApp?: (ctx: EnhanceAppContext) => Awaitable<void>
  /**
   * 扩展另一个主题，在我们的主题之前调用它的 `enhanceApp`
   * @optional
   */
  extends?: Theme
}

interface EnhanceAppContext {
  app: App // Vue 应用实例
  router: Router // VitePress 路由实例
  siteData: Ref<SiteData> // 站点级元数据
}
```

主题入口文件需要将主题作为默认导出来导出：
:::code-group
```js[.vitepress/theme/index.js]
// 可以直接在主题入口导入 Vue 文件
// VitePress 已预先配置 @vitejs/plugin-vue
import Layout from './Layout.vue'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
```
:::

默认导出是自定义主题的唯一方式，并且只有 `Layout` 属性是必须的。所以从技术上讲，一个 VitePress 主题可以是一个单独的 Vue 组件。

在组件内部，它的工作方式就像是一个普通的 Vite + Vue 3 应用。请注意，主题还需要保证 [SSR 兼容](/custom/cms)。

## 构建布局
最基本的布局组件需要包含一个 `<Content />` 组件：
```vue
<script setup>
import { useData } from 'vitepress'
const { page } = useData()
</script>

<template>
  <h1>Custom Layout!</h1>

  <div v-if="page.isNotFound">
    Custom 404 page!
  </div>
  <Content v-else />
</template>
```

`useData()` 为我们提供了所有的运行时数据，以便我们根据不同条件渲染不同的布局。我们可以访问的另一个数据是当前页面的 frontmatter。通过利用这个数据，可以让用户单独控制每个页面的布局。例如，用户可以指定一个页面是否使用特殊的主页布局：

```markdown
---
layout: home
---
```

并且我们可以调整主题进行处理：

```vue
<script setup>
import { useData } from 'vitepress'
const { page, frontmatter } = useData()
</script>

<template>
  <h1>Custom Layout!</h1>

  <div v-if="page.isNotFound">
    Custom 404 page!
  </div>
  <div v-if="frontmatter.layout === 'home'">
    Custom home page!
  </div>
  <Content v-else />
</template>
```

当然你可以将布局切分为不同的组件：

```vue
<script setup>
import { useData } from 'vitepress'
import NotFound from './NotFound.vue'
import Home from './Home.vue'
import Page from './Page.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <h1>Custom Layout!</h1>

  <NotFound v-if="page.isNotFound" />
  <Home v-if="frontmatter.layout === 'home'" />
  <Page v-else /> <!-- <Page /> renders <Content /> -->
</template>
```

## 使用自定义主题
要使用外部主题，请导入它并重新导出：
:::code-group
```js[.vitepress/theme/index.js]
import Theme from 'awesome-vitepress-theme'

export default Theme
```
:::

如果主题需要扩展：
:::code-group
```js[.vitepress/theme/index.js]
import Theme from 'awesome-vitepress-theme'

export default {
  extends: Theme,
  enhanceApp(ctx) {
    // ...
  }
}
```
:::

如果主题需要特殊的 VitePress 配置，也需要在配置中扩展：
:::code-group
```js[.vitepress/config.ts]
import Theme from 'awesome-vitepress-theme'

export default {
  extends: Theme,
  enhanceApp(ctx) {
    // ...
  }
}
```
:::

最后，如果主题为其主题配置提供了类型：
:::code-group
```js[.vitepress/config.ts]
import baseConfig from 'awesome-vitepress-theme/config'
import { defineConfigWithTheme } from 'vitepress'
import type { ThemeConfig } from 'awesome-vitepress-theme'

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,
  themeConfig: {
    // 类型为 `ThemeConfig`
  }
})
```
:::