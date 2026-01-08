// 可以直接在主题入口导入 Vue 文件
// VitePress 已预先配置 @vitejs/plugin-vue
// import Layout from './Layout.vue'
import Theme from "vitepress/dist/client/theme-default/index.js";
import './style.css'

export default {
    extends: Theme,
    // Layout,
    enhanceApp({ app, router, siteData }) {
        // ...
    }
}
