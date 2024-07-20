import { defineConfig, type DefaultTheme } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-Hans',
  title: "西邮 Wiki",
  description: "西安邮电大学第三方公益校园生活百科",
  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    // siteTitle: '',
    nav: nav(),
    sidebar: sidebar(),
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/xupt-wiki' },
    // ],

    externalLinkIcon: true,
    langMenuLabel: '切换语言',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    outline: { level: [2, 3], label: '目录' },
    returnToTopLabel: '返回顶部',
    editLink: {
      pattern: 'https://github.com/GuuGuai/Block-Tea-Reception/blame/main/docs/:path',
      text: '源代码'
    },
    lastUpdated: {
      text: '更新于',
      formatOptions: { dateStyle: 'short', timeStyle: 'medium' }
    },
    docFooter: { prev: '上一篇', next: '下一篇' },

    footer: {
      message: '纯公益项目',
      copyright: `© ${new Date().getFullYear()} 西邮 Wiki 项目组`
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['link', { rel: 'stylesheet', href: '//lib.baomitu.com/font-awesome/6.5.1/css/all.min.css', media: 'none', onload: 'media="all"' }],
  ],
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: '校园', link: '/campus/' },
    { text: '学习', link: '/study/' },
    { text: '生活', link: '/life/' },
    { text: 'CO导航', link: 'https://cooo.site/' },
    {
      text: '关于', items:
        [
          { text: '关于我们', link: '/about' },
          { text: '更新日志', link: '/changelog' },
        ],
    },
  ]
}

function sidebar(): DefaultTheme.Sidebar {
  return {
    '/': [{
      text: '西邮Wiki',
      items: [
        { text: '概览', link: '/overview' },
      ]
    },
    {
      text: '关于',
      items: [
        { text: '关于我们', link: '/about' },
        { text: '更新日志', link: '/changelog' },
      ]
    }
    ],
    '/campus/': [
      {
        text: '校园',
        items: [
          { text: '学校简介', link: '/campus/introduction' },
          { text: '历史沿革', link: '/campus/history' },
          { text: '校园环境', link: '/campus/campus' }
        ]
      },
    ],
    '/study/': [
      {
        text: '学习',
        items: [
          {
            text: '课程信息',
            items: [
              { text: '专业课程', link: '/study/courses/major' },
              { text: '公共课程', link: '/study/courses/public' },
              { text: '选修课程', link: '/study/courses/elective' }
            ]
          },
          { text: '学习资源', link: '/study/resources' },
          { text: '实验室与项目', link: '/study/labs-and-projects' }
        ]
      }
    ],
    '/life/': [
      {
        text: '生活',
        items: [
          { text: '校园服务', link: '/life/services' },
          {
            text: '社团活动',
            items: [
              { text: '科技类社团', link: '/life/clubs/tech' },
              { text: '文艺类社团', link: '/life/clubs/art' },
              { text: '体育类社团', link: '/life/clubs/sports' }
            ]
          },
          { text: '住宿与餐饮', link: '/life/accommodation-and-dining' },
          { text: '交通出行', link: '/life/transportation' }
        ]
      },],
  }
};
