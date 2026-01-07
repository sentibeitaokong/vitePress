import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    markdown: {
        lineNumbers: false,    //行号标识
        math:true              //数学方程
    },
    base:'/vitePress/',   //设定 public 根目录
    //源目录位置   定义这个相当于以这个为根目录查找  默认根目录为docx
    srcDir:'src',
    //站点级选项
    title: "My VitePress",
    description: "A VitePress Site",
    //主题级选项
    themeConfig: {
        //目录导航标题
        outlineTitle:'页面导航',
        // 修改页面底部导航链接的文本
        docFooter: {
            prev: '上一页：', // 修改“上一篇”按钮的引导文本
            next: '下一页：'  // 修改“下一篇”按钮的引导文本
        },
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '开始', link: '/'},
            // {text: '指南', link: '/introduction/vitePress'}
        ],

        sidebar: [
            {
                text: '简介',
                collapsible: true, // 允许折叠 (默认true，可省略)
                collapsed: false, // 初始状态为“展开”
                items: [
                    //动态生成路由页面
                    {text: '什么是VitePress?', link: '/introduction/vitePress'},
                   /* {text: 'foo', link: '/introduction/routeFirst/foo'},
                    {text: 'bar', link: '/introduction/routeFirst/bar'},
                    {text: 'foo-1.0.0', link: '/introduction/routeFirst/foo-1.0.0'},
                    {text: 'bar-1.0.0', link: '/introduction/routeFirst/bar-1.0.0'},
                    {text: 'foo-2.0.0', link: '/introduction/routeFirst/foo-2.0.0'},
                    {text: 'bar-2.0.0', link: '/introduction/routeFirst/bar-2.0.0'},*/
                    {text: '快速开始', link: '/introduction/routeSecond/gettingStart'},
                    {text: '路由', link: '/introduction/routeSecond/routing'},
                    {text: '部署', link: '/introduction/routeSecond/building'},
                ]
            },
            {
                text: '写作',
                collapsible: true, // 允许折叠 (默认true，可省略)
                collapsed: false, // 初始状态为“展开”
                items: [
                    {text: 'MarkDown扩展', link: '/writing/markdown/markdown'},
                    {text: '资源处理', link: '/writing/markdown/resourceHandling'},
                    {text: 'frontmatter', link: '/writing/markdown/frontmatter'},
                    {text: '在Markdown使用Vue', link: '/writing/markdown/useVueInMarkDown'},
                    {text: '国际化', link: '/introduction/routeSecond/i18n'},
                ]
            },
            {
                text: '自定义',
                collapsible: true, // 允许折叠 (默认true，可省略)
                collapsed: false, // 初始状态为“展开”
                items: [
                    {text: '自定义主题', link: '/custom/customTheme'},
                    {text: '扩展默认主题', link: '/custom/extendsTheme'},
                    {text: '构建时数据加载', link: '/custom/dataLoading'},
                    {text: 'SSR 兼容性', link: '/custom/ssrCompat'},
                    {text: '连接到 CMS', link: '/custom/cms'},

                ]
            },
        ],
    },
    //路由重写
   /* rewrites: {
        'src/:route/(.*)': ':route/index.md'
    }*/
})
