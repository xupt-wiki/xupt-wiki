import { type DefaultTheme, defineConfig } from 'vitepress'

// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
    lang: 'zh-Hans',
    title: '西邮 Wiki',
    description: '西安邮电大学第三方公益校园生活百科',
    lastUpdated: true,
    cleanUrls: true,

    themeConfig: {
    // https://vitepress.dev/zh/reference/default-theme-config
        logo: '/logo.svg',
        // siteTitle: '',
        nav: nav(),
        sidebar: sidebar(),
        socialLinks: [
            { icon: 'github', link: 'https://github.com/xupt-wiki/xupt-wiki' },
        ],

        externalLinkIcon: true,
        langMenuLabel: '切换语言',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        sidebarMenuLabel: '菜单',
        outline: { level: [2, 3], label: '目录' },
        returnToTopLabel: '返回顶部',
        editLink: {
            pattern: 'https://github.com/xupt-wiki/xupt-wiki/blame/main/docs/:path',
            text: '源代码',
        },
        lastUpdated: {
            text: '更新于',
            formatOptions: { dateStyle: 'short', timeStyle: 'medium' },
        },
        docFooter: { prev: '上一篇', next: '下一篇' },

        footer: {
            message: '公益项目。与任何组织无关。Made with ❤.',
            copyright: `© ${new Date().getFullYear()} 西邮 Wiki 项目组`,
        },
    },

    head: [
        ['link', { rel: 'icon', href: '/logo.svg' }],
        ['link', { rel: 'stylesheet', href: '//lib.baomitu.com/font-awesome/6.5.1/css/all.min.css', media: 'none', onload: 'media="all"' }],
    ],
    markdown: {
        math: true,
    },
})

function nav(): DefaultTheme.NavItem[] {
    return [
        { text: '校园', link: '/campus/', activeMatch: '/campus/' },
        { text: '学习', link: '/study/', activeMatch: '/study/' },
        { text: '生活', link: '/life/', activeMatch: '/life/' },
        { text: 'CO导航', link: 'https://cooo.site/' },
        { text: '关于', items: [
            { text: '友情链接', link: '/links' },
            { text: '贡献指南', link: '/contribute' },
            { text: '更新日志', link: '/changelog' },
            { text: '关于我们', link: '/about' },
        ] },
    ]
}

function sidebar(): DefaultTheme.Sidebar {
    return {
        '/': [
            { text: '西邮Wiki', items: [
                { text: '写在开头', link: '/overview' },
            ] },
            { text: '校园', link: '/campus/', collapsed: true, items: [
                { text: '本科专业列表', link: '/campus/major' },
                { text: '住宿生活', link: '/campus/accommodation' },
                { text: '入学准备与办理', link: '/campus/enrollment' },
                { text: '防骗', link: '/campus/anti-fraud' },
                { text: '手机必备APP', link: '/campus/apps' },
                { text: '趣闻', link: '/campus/anecdote' },
            ] },
            { text: '学习', link: '/study/', collapsed: true, items: [
                { text: '课内学业', items: [
                    { text: '课程安排', link: '/study/curriculum' },
                    { text: '成绩、挂科', link: '/study/grades' },
                    { text: '学分、绩点、综测', link: '/study/gpa' },
                    { text: '评选优秀(未写)', link: '####/study/evaluation' },
                    { text: '转专业、学籍异动', link: '/study/change-major' },
                ] },
                { text: '实验室/兴趣小组', link: '/study/labs' },
                { text: '竞赛(未写)', link: '####/study/contest' },
                { text: '社团(未写)', link: '####/study/clubs' },
                { text: '毕业去向', link: '/study/pathway' },
            ] },
            { text: '生活', link: '/life/', collapsed: true, items: [
                { text: '二手书与二手物品(未写)', link: '####/life/second-hand' },
                { text: '表白墙、校园社区(未写)', link: '####/life/confession-wall' },
                { text: '快递和外卖', link: '/life/delivery' },
                { text: '美食推荐', link: '/life/food' },
                { text: '周边生活', items: [
                    { text: '周末玩什么？(未写)', link: '####/life/weekend-activities' },
                    { text: '附近好景点，长跑、骑行与city walk(未写)', link: '####/life/nearby-attractions' },
                ] },
            ] },
            { text: '关于', items: [
                { text: '友情链接', link: '/links' },
                { text: '贡献指南', link: '/contribute' },
                { text: '更新日志', link: '/changelog' },
                { text: '关于我们', link: '/about' },
            ] },
        ],
    }
};
