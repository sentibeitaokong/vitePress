# 构建时数据加载
VitePress 提供了**数据加载**的功能，它允许加载任意数据并从页面或组件中导入它。数据加载**只在构建时**执行：最终的数据将被序列化为 JavaScript 包中的 JSON。

数据加载可以被用于获取远程数据，也可以基于本地文件生成元数据。例如，可以使用数据加载来解析所有本地 API 页面并自动生成所有 API 入口的索引。

## 基本用法
一个用于数据加载的文件必须以 `.data.js` 或 `.data.ts` 结尾。该文件应该提供一个默认导出的对象，该对象具有 `load()` 方法：
:::code-group
```js[example.data.js]
export default {
  load() {
    return {
      hello: 'world'
    }
  }
}
```
:::

数据加载模块只在 Node.js 中执行，因此可以按需导入 Node API 和 npm 依赖。
然后，可以在 `.md` 页面和 `.vue` 组件中使用 `data` 具名导出从该文件中导入数据：
```vue
<script setup>
import { data } from './example.data.js'
</script>

<pre>{{ data }}</pre>
```
输出：
```json
{
  "hello": "world"
}
```

你会注意到 data loader 本身并没有导出 `data`。这是因为 VitePress 在后台调用了 load()` 方法，并通过名为 `data` 的具名导出隐式地暴露了结果。

即使它是异步的，这也是有效的：

```js
export default {
  async load() {
    // 获取远程数据
    return (await fetch('...')).json()
  }
}
```

## 使用本地文件生成数据
当需要基于本地文件生成数据时，需要在 data loader 中使用 `watch` 选项，以便这些文件改动时可以触发热更新。

`watch` 选项也很方便，因为可以使用 glob 模式 匹配多个文件。模式可以相对于数据加载文件本身，`load()` 函数将接收匹配文件的绝对路径。

下面的例子展示了如何使用 csv-parse 加载 CSV 文件并将其转换为 JSON。因为此文件仅在构建时执行，因此不会将 CSV 解析器发送到客户端。
```js
import fs from 'node:fs'
import { parse } from 'csv-parse/sync'

export default {
  watch: ['./data/*.csv'],
  load(watchedFiles) {
    // watchFiles 是一个所匹配文件的绝对路径的数组。
    // 生成一个博客文章元数据数组
    // 可用于在主题布局中呈现列表。
    return watchedFiles.map((file) => {
      return parse(fs.readFileSync(file, 'utf-8'), {
        columns: true,
        skip_empty_lines: true
      })
    })
  }
}
```