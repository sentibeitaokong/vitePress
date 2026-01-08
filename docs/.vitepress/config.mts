import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    vue: {
        // @vitejs/plugin-vue 选项   加载vue文件
    },
    markdown: {
        lineNumbers: false,    //行号标识
        math:true              //数学方程
    },
    base:'/vitePress/',   //设定 public 根目录
    //源目录位置   定义这个相当于以这个为根目录查找  默认根目录为docs
    srcDir:'src',
    // srcExclude:['**/README.md',],   //排除部分markdown文件
    // outDir:'../public',  //项目的构建输出位置，默认值： ./.vitepress/dist
    // assetsDir:'static',  //指定放置生成的静态资源的目录。该路径应位于 outDir 内,默认值： assets
    //cacheDir:'./.vitepress/.vite'  //缓存文件的目录，相对于项目根目录,默认值： ./.vitepress/cache
    head: [['link', { rel: 'icon', href: '/vitePress/favicon.ico' }]], //要在页面 HTML 的 <head> 标签中呈现的其他元素
    //站点级选项
    title: "我的VitePress",   //它还将用作所有单独页面标题的默认后缀，除非定义了 titleTemplate
    // titleTemplate: ':title - Custom Suffix',   //允许自定义每个页面的标题后缀或整个标题
    description: "A VitePress Site",
    cleanUrls:true,         //生成简洁的url
    //主题级选项
    themeConfig: {
        logo: '/favicon.ico',  //导航栏上显示的 Logo，位于站点标题前
        lastUpdated:{
            text: '最后更新于',      //自定义名称
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        },    //显示最后更新时间
        editLink: {
            pattern: 'https://github.com/sentibeitaokong/vitePress/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },    //显示链接修改这个页面的github地址
        // carbonAds: {
        //     code: 'your-carbon-code',
        //     placement: 'your-carbon-placement'
        // },   //显示广告
        search: {
            provider: 'local'
        },
       /* search: {

            provider: 'algolia',
            options: {
                appId: '...',
                apiKey: '...',
                indexName: '...',
               /!* askAi: {
                    assistantId: 'XXXYYY'
                }*!/
            }
        },*/   //支持使用 Algolia DocSearch 搜索站点文档
        lightModeSwitchTitle:'切换到白天主题',    //用于自定义悬停时显示的浅色模式开关标题。
        darkModeSwitchTitle:'切换到黑夜主题',     //用于自定义悬停时显示的深色模式开关标题。
        langMenuLabel:'切换语言',
        i18nRouting:true,           //i18n
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
            {
                text: '切换语言',
                items: [
                    {
                        // 该部分的标题
                        items: [
                            { text: '简体中文', link:(PageData)=>{return false},activeMatch: '^/vitePress/' },
                        ]
                    }
                ]
            },
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
