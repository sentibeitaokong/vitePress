#  在 Markdown 使用 Vue
在 VitePress 中，每个 Markdown 文件都被编译成 HTML，而且将其作为[Vue单文件组件处理](https://cn.vuejs.org/guide/scaling-up/sfc)。这意味着可以在 Markdown 中使用任何 Vue 功能，包括动态模板、使用 Vue 组件或通过添加 `<script>` 标签为页面的 Vue 组件添加逻辑。

值得注意的是，VitePress 利用 Vue 的编译器自动检测和优化 Markdown 内容的纯静态部分。静态内容被优化为单个占位符节点，并从页面的 JavaScript 负载中删除以供初始访问。在客户端激活期间也会跳过它们。简而言之，只需注意任何给定页面上的动态部分。
>[!TIP] SSR 兼容性
>所有的 Vue 用法都需要兼容 SSR。参见 SSR 兼容性获得更多信息和常见的解决方案。

## 模板化
### 插值语法
每个 Markdown 文件首先被编译成 HTML，然后作为 Vue 组件传递给 Vite 流程管道。这意味着可以在文本中使用 Vue 的插值语法：

###  指令
也可以使用指令 (请注意，原始 HTML 在 Markdown 中也有效):

## `<script>` 和 `<style>`
Markdown 文件中的根级 `<script>` 和 `<style>` 标签与 Vue SFC 中的一样，包括 `<script setup>`、`<style module>` 等。这里的主要区别是没有 `<template>` 标签：所有其他根级内容都是 Markdown。另请注意，所有标签都应放在 `frontmatter` **之后**：

## 使用组件
可以直接在 Markdown 文件中导入和使用 Vue 组件。

## 在 Markdown 中导入组件
如果一个组件只被几个页面使用，建议在使用它们的地方显式导入它们。这使它们可以正确地进行代码拆分，并且仅在显示相关页面时才加载：

## 转义
可以通过使用 `v-pre` 指令将它们包裹在 `<span>` 或其他元素中来转义 Vue 插值：

This <span v-pre>{{ will be displayed as-is }}</span>

也可以将整个段落包装在 `v-pre` 自定义容器中：

::: v-pre
{{ This will be displayed as-is }}`
:::

## 代码块中不转义
默认情况下，代码块是受到保护的，都会自动使用 `v-pre` 包装，因此内部不会处理任何 Vue 语法。要在代码块内启用 Vue 插值语法，可以在代码语言后附加 `-vue` 后缀，例如 `js-vue`：
```js-vue
Hello {{ 1 + 1 }}
```
请注意，这可能会让某些字符不能正确地进行语法高亮显示。

## 使用 CSS 预处理器
VitePress [内置支持(https://cn.vitejs.dev/guide/features#css-pre-processors) CSS 预处理器：`.scss`、`.sass`、`.less`、`.styl` 和 `.stylus` 文件。无需为它们安装 Vite 专用插件，但必须安装相应的预处理器：
```
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus
```
然后可以在 Markdown 和主题组件中使用以下内容：

```vue
<style lang="sass">
.title
  font-size: 20px
</style>
```

## 使用 teleport 传递组件内容
VitePress 目前只有使用 teleport 传送到 body 的 SSG 支持。对于其他地方，可以将它们包裹在内置的 `<ClientOnly>` 组件中，或者通过 postRender 钩子将 teleport 标签注入到最终页面 HTML 中的正确位置。
:::details
```vue
<script setup lang="ts">
import { ref } from 'vue'
const showModal = ref(false)
</script>

<template>
  <button class="modal-button" @click="showModal = true">Show Modal</button>

  <Teleport to="body">
    <Transition name="modal">
      <div v-show="showModal" class="modal-mask">
        <div class="modal-container">
          <p>Hello from the modal!</p>
          <div class="model-footer">
            <button class="modal-button" @click="showModal = false">
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: var(--vp-c-bg);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.model-footer {
  margin-top: 8px;
  text-align: right;
}

.modal-button {
  padding: 4px 8px;
  border-radius: 4px;
  border-color: var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}

.modal-button:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}
</style>
```
:::

```md
<ClientOnly>
  <Teleport to="#modal">
    <div>
      // ...
    </div>
  </Teleport>
</ClientOnly>
```

