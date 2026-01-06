#  在 Markdown 使用 Vue
在 VitePress 中，每个 Markdown 文件都被编译成 HTML，而且将其作为[Vue单文件组件处理](https://cn.vuejs.org/guide/scaling-up/sfc)。这意味着可以在 Markdown 中使用任何 Vue 功能，包括动态模板、使用 Vue 组件或通过添加 `<script>` 标签为页面的 Vue 组件添加逻辑。

值得注意的是，VitePress 利用 Vue 的编译器自动检测和优化 Markdown 内容的纯静态部分。静态内容被优化为单个占位符节点，并从页面的 JavaScript 负载中删除以供初始访问。在客户端激活期间也会跳过它们。简而言之，只需注意任何给定页面上的动态部分。
>[!TIP] SSR 兼容性
>所有的 Vue 用法都需要兼容 SSR。参见 SSR 兼容性获得更多信息和常见的解决方案。

## 模板化
### 插值语法
每个 Markdown 文件首先被编译成 HTML，然后作为 Vue 组件传递给 Vite 流程管道。这意味着可以在文本中使用 Vue 的插值语法：

**输入**
```vue
{{ 1 + 1 }}
```
**输出**
```md
2
```

###  指令
也可以使用指令 (请注意，原始 HTML 在 Markdown 中也有效):

**输入**
```html
<span v-for="i in 3">{{ i }}</span>
```
**输出**
```
 1 2 3
```

## `<script>` 和 `<style>`
Markdown 文件中的根级 `<script>` 和 `<style>` 标签与 Vue SFC 中的一样，包括 `<script setup>`、`<style module>` 等。这里的主要区别是没有 `<template>` 标签：所有其他根级内容都是 Markdown。另请注意，所有标签都应放在 `frontmatter` **之后**：
```html

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

## Markdown Content

The count is: {{ count }}

<button :class="$style.button" @click="count++">Increment</button>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
```

::: warning 避免在 Markdown 中使用 `<style scoped>`
在 Markdown 中使用时，`<style scoped>` 需要为当前页面的每个元素添加特殊属性，这将显著增加页面的大小。当我们需要局部范围的样式时 `<style module>` 是首选。
:::

还可以访问 VitePress 的运行时 API，例如 `useData 辅助函数`，它提供了当前页面的元数据：

**输入**
```vue
<script setup>
import { useData } from 'vitepress'

const { page } = useData()
</script>

<pre>{{ page }}</pre>
```
**输出**
```json
{
  "path": "/using-vue.html",
  "title": "Using Vue in Markdown",
  "frontmatter": {}
}
```

### 在 Markdown 中导入组件
如果一个组件只被几个页面使用，建议在使用它们的地方显式导入它们。这使它们可以正确地进行代码拆分，并且仅在显示相关页面时才加载：
```md
<script setup>
import CustomComponent from '../../components/CustomComponent.vue'
</script>

# Docs

This is a .md using a custom component

<CustomComponent />

## More docs

...
```

### 注册全局组件
如果一个组件要在大多数页面上使用，可以通过自定义 Vue 实例来全局注册它们。有关示例，请参见[扩展默认主题](#registering-global-components)中的相关部分。

::: warning 重要
确保自定义组件的名称包含连字符或采用 PascalCase。否则，它将被视为内联元素并包裹在 `<p>` 标签内，这将导致激活不匹配，因为 `<p>` 不允许将块元素放置在其中。
:::

