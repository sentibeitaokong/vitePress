import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    // base:'/vitePress/',   //设定 public 根目录
    //源目录位置   定义这个相当于以这个为根目录查找  默认根目录为docx
    srcDir:'src',
    //站点级选项
    title: "My VitePress",
    description: "A VitePress Site",
    //主题级选项
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Examples', link: '/example-2/markdown-examples'}
        ],

        sidebar: [
            {
                text: 'Example-1',
                items: [
                    //动态生成路由页面
                    {text: 'foo', link: '/example-1/foo'},
                    {text: 'bar', link: '/example-1/bar'},
                    {text: 'foo-1.0.0', link: '/example-1/foo-1.0.0'},
                    {text: 'bar-1.0.0', link: '/example-1/bar-1.0.0'},
                    {text: 'foo-2.0.0', link: '/example-1/foo-2.0.0'},
                    {text: 'bar-2.0.0', link: '/example-1/bar-2.0.0'},
                ]
            },
            {
                text: 'Example-2',
                items: [
                    {text: 'Markdown Examples', link: '/example-2/markdown-examples'},
                    {text: 'Runtime API Examples', link: '/example-2/api-examples'}
                ]
            }
        ],
    },
    //路由重写
    // rewrites: {
    //     'src/:example/(.*)': ':example/index.md'
    // }
})
