---
title: MarkDown扩展
# 手动指定下一页的链接和文字
prev:
  text: '部署'
  link: '/introduction/routeSecond/building'
next:
  text: '资源处理'
  link: '/writing/markdown/resourceHandling'
---
# Markdown 扩展
VitePress 带有内置的 Markdown 扩展。

## 标题锚点
标题会自动应用锚点。可以使用 markdown.anchor 选项配置锚点的渲染。

## 自定义锚点{#my-anchor}
要为标题指定自定义锚点而不是使用自动生成的锚点，请向标题添加后缀：
```
# 使用自定义锚点 {#my-anchor}
```
这允许将标题链接为 `#my-anchor`，而不是默认的 `#使用自定义锚点`。

## 链接
内部和外部链接都会被特殊处理。

##内部链接
内部链接将转换为单页导航的路由链接。此外，子目录中包含的每个 `index.md` 都会自动转换为 `index.html`，并带有相应的 URL `/`。

例如，给定以下目录结构：

```
.
├─ index.md
├─ foo
│  ├─ index.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ index.md
   ├─ three.md  
   └─ four.md
```
假设现在处于 `foo/one.md` 文件中：
```
[Home](/) <!-- 将用户导航至根目录下的 index.html -->
[foo](/foo/) <!-- 将用户导航至目录 foo 下的 index.html -->
[foo heading](./#heading) <!-- 将用户锚定到目录 foo 下的index文件中的一个标题上 -->
[bar - three](../bar/three) <!-- 可以省略扩展名 -->
[bar - three](../bar/three.md) <!-- 可以添加 .md -->
[bar - four](../bar/four.html) <!-- 或者可以添加 .html -->
```

## 页面后缀
默认情况下，生成的页面和内部链接带有 `.html` 后缀。

## 外部链接
外部链接带有 `target="_blank" rel="noreferrer"：`

<!-- VitePress 文本前出现意外黑点的根本原因，几乎总是行首的 -、* 或 + 后跟空格触发了无序列表 -->
- [vuejs.org](https://cn.vuejs.org/)
- [VitePress on GitHub](https://github.com/vuejs/vitepress)

## frontmatter
[YAML 格式的 frontmatter](https://jekyllrb.com/docs/front-matter/) 开箱即用：
```yaml
---
title: Blogging Like a Hacker
lang: en-US
---
```
此数据将可用于页面的其余部分，以及所有自定义和主题组件。

更多信息，参见 [frontmatter](https://vitepress.dev/zh/reference/frontmatter-config)。

## GitHub 风格的表格
<!-- **这是加粗文本**    __这也是加粗文本__ -->
**输入**
```
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```
**输出**
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

## Emoji 🎉
**输入**
```
:tada: :100:
```
**输出**
:tada: :100:

这里可以找到[所有支持的 emoji 列表。](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.mjs)

## 目录表 (TOC)
**输入**
```
[[toc]]
```
**输出**
[[toc]]

可以使用 `markdown.toc` 选项配置 TOC 的呈现效果。

## 自定义容器{#custom-containers}
自定义容器可以通过它们的类型、标题和内容来定义。
### 默认标题
**输入**
```
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```
**输出**
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

## 自定义标题
可以通过在容器的 "type" 之后附加文本来设置自定义标题。

**输入**
```
::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码
console.log('Hello, VitePress!')
:::
```

**输出**
::: danger STOP
危险区域，请勿继续
:::

::: details 点我查看代码
```js
console.log('Hello, VitePress!')
```
:::

此外，可以通过在站点配置中添加以下内容来全局设置自定义标题，如果不是用英语书写，这会很有帮助：
```js
// config.ts
export default defineConfig({
  // ...
  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    }
  }
  // ...
})
```
## `raw`

这是一个特殊的容器，可以用来防止与 VitePress 的样式和路由冲突。这在记录组件库时特别有用。可能还想查看 [whyframe](https://whyframe.dev/docs/integrations/vitepress) 以获得更好的隔离。
### 语法
```md
::: raw
Wraps in a `<div class="vp-raw">`
:::
```

`vp-raw` class 也可以直接用于元素。样式隔离目前是可选的：

- 使用喜欢的包管理器来安装需要的依赖项：
```sh
$ npm add -D postcss
```
- 创建 `docs/postcss.config.mjs` 文件并将以下内容添加到其中：
```js
import { postcssIsolateStyles } from 'vitepress'

export default {
    plugins: [postcssIsolateStyles()]
}
```

你可以像这样传递它的选项：
```js
postcssIsolateStyles({
  includeFiles: [/custom\.css/] // 默认为 [/vp-doc\.css/, /base\.css/]
})
```
## GitHub 风格的警报
VitePress 同样支持以标注的方式渲染 [GitHub 风格的警报](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)。它们和[自定义容器](#custom-containers)的渲染方式相同。
```
> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。
```
> [!NOTE]
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。

## 代码块中的语法高亮
VitePress 使用 [Shiki](https://github.com/shikijs/shiki) 在 Markdown 代码块中使用彩色文本实现语法高亮。Shiki 支持多种编程语言。需要做的就是将有效的语言别名附加到代码块的开头：

```js
export default {
  name: 'MyComponent',
  // ...
}
```
```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```
## 在代码块中实现行高亮{#line-highlight}
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
除了单行之外，还可以指定多个单行、多行，或两者均指定：
- 多行：例如 `{5-8}`、`{3-10}`、`{10-17}`
- 多个单行：例如 `{4,7,9}`
- 多行与单行：例如 `{4,7-13,16,23-27,40}`


```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```
也可以使用 `// [!code highlight]` 注释实现行高亮。
```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code highlight]
    }
  }
}
```
## 代码块中聚焦
- 单行聚焦 `// [!code focus]` 注释将聚焦它并模糊代码的其他部分
- 多行聚焦`// [!code focus:<lines>]` 注释将聚焦从开始到lines行的部分

```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```
```js  
// [!code focus:3]
export default { 
  data () {
    return {
      msg: 'Focused!'
    }
  }
}
```

## 代码块中的颜色差异
在某一行添加 `// [!code --]` 或 `// [!code ++]` 注释将会为该行创建 diff，同时保留代码块的颜色。
```js
export default {
  data () {
    return {
      msg: 'Removed', // [!code --]
      msg2: 'Added' // [!code ++]
    }
  }
}
```
## 高亮“错误”和“警告”
在某一行添加 `// [!code warning]` 或 `// [!code error]` 注释将会为该行相应的着色。
```js
export default {
  data () {
    return {
      msg: 'Error', // [!code error]
      msg2: 'Warning' // [!code warning]
    }
  }
}
```
## 行号
可以通过以下配置为每个代码块启用行号：
```js 
export default {
  markdown: {
    lineNumbers: true
  }
}
```
可以在代码块中添加 `:line-numbers` / `:no-line-numbers` 标记来覆盖在配置中的设置。

还可以通过在 `:line-numbers` 之后添加 `=` 来自定义起始行号，例如 `:line-numbers=2` 表示代码块中的行号从 2 开始。
```ts
// 默认禁用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers
// 启用行号
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers=2
// 行号已启用，并从 2 开始
const line3 = 'This is line 3'
const line4 = 'This is line 4'
```

##  导入代码片段{#import-code-snippets}
可以通过下面的语法来从现有文件中导入代码片段
```md
<<< @/filepath
```
此语法同时支持[行高亮](#line-highlight)：
```md
<<< @/filepath{highlightLines}
```
<!-- 带行高亮 语言 带行号: -->
<<< ../js/index.js{7}
<<< ../js/index.js{1 js:line-numbers=1}

## 代码组
可以像这样对多个代码块进行分组：
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::

也可以在代码组中[导入代码片段](#import-code-snippets)：
::: code-group

<!-- 文件名默认用作标题 -->

<<< ../js/index.js

<!-- 也可以提供定制的代码组 -->

<<< ../js/index2.js{1 js:line-numbers} [snippet with region]

:::

## 包含 markdown 文件
可以像这样在一个 markdown 文件中包含另一个 markdown 文件，甚至是内嵌的。
<!-- 内嵌Markdown文件 -->
<!--@include: ./basics.md-->

它还支持选择行范围：

<!--@include: ./basics.md{3,}-->

## 数学方程
现在这是可选的。要启用它，需要安装 `markdown-it-mathjax3`，在配置文件中设置`markdown.math` 为 `true`：
```sh
npm add -D markdown-it-mathjax3@^4
```
::: code-group
```ts [.vitepress/config.ts]
export default {
    markdown: {
        math: true
    }
}
```
:::

When $a \ne 0$, there are two solutions to $(ax^2 + bx + c = 0)$ and they are
$$ x = {-b \pm \sqrt{b^2-4ac} \over 2a} $$

**Maxwell's equations:**

| equation                                                                                                                                                                  | description                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$                                                                                                                                      | divergence of $\vec{\mathbf{B}}$ is zero                                               |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$                                                          | curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$ |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_                                                                                 |

## 图片懒加载
通过在配置文件中将 `lazyLoading` 设置为 `true`，可以为通过 markdown 添加的每张图片启用懒加载。
```js
export default {
  markdown: {
    image: {
      // 默认禁用；设置为 true 可为所有图片启用懒加载。
      lazyLoading: true
    }
  }
}
```

## 高级配置
VitePress 使用 [markdown-it](https://github.com/markdown-it/markdown-it) 作为 Markdown 渲染器。上面提到的很多扩展功能都是通过自定义插件实现的。可以使用 `.vitepress/config.js` 中的 `markdown` 选项来进一步自定义 `markdown-it` 实例。
```js
import { defineConfig } from 'vitepress'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItFoo from 'markdown-it-foo'

export default defineConfig({
  markdown: {
    // markdown-it-anchor 的选项
    // https://github.com/valeriangalliat/markdown-it-anchor#usage
    anchor: {
      permalink: markdownItAnchor.permalink.headerLink()
    },
    // @mdit-vue/plugin-toc 的选项
    // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
    toc: { level: [1, 2] },
    config: (md) => {
      // 使用更多的 Markdown-it 插件！
      md.use(markdownItFoo)
    }
  }
})
```


