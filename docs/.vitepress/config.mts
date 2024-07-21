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
          { text: '友情链接', link: '/links' },
          { text: '贡献指南', link: '/contribute' },
          { text: '更新日志', link: '/changelog' },
          { text: '关于我们', link: '/about' },
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
    { text: '校园', link: '/campus/' },
    { text: '学习', link: '/study/' },
    { text: '生活', link: '/life/' },
    {
      text: '关于',
      items: [
        { text: '友情链接', link: '/links' },
        { text: '贡献指南', link: '/contribute' },
        { text: '更新日志', link: '/changelog' },
        { text: '关于我们', link: '/about' },
      ]
    }
    ],
    '/campus/': [
      { text: '概览', link: '/overview' },
      {
        text: '校园',
        items: [
          { text: '学校简介', link: '/campus/' },
          { text: '地图/校园概览', link: '/campus/map' },
          { text: '周边环境', link: '/campus/neighborhood' },
          { text: '手机必备APP', link: '/campus/apps' },
          { text: '入学办理与防骗', link: '/campus/enrollment' },
        ]
      },
      { text: '学习', link: '/study/' },
      { text: '生活', link: '/life/' },
      { text: '关于', link: "/about" },
    ],
    '/study/': [
      { text: '概览', link: '/overview' },
      { text: '校园', link: '/campus/' },
      {
        text: '学习',
        items: [
          {
            text: '课内学业',
            items: [
              { text: '选修课、必修课与限选课', link: '/study/curriculum' },
              { text: '学分、绩点的计算', link: '/study/credit-and-gpa' },
              { text: '挂科了怎么办', link: '/study/failure-policy' },
              { text: '线上课程', link: '/study/online-course' },
              { text: '转专业政策、时间', link: '/study/change-major' },
              { text: '综测和课外八学分', link: '/study/comprehensive-assessment' },
              { text: '班干部、党员与评优排名', link: '/study/class-leadership' }
            ]
          },
          {
            text: '综合发展',
            items: [
              { text: '为什么要找实验室、导师', link: '/study/research-guidance' },
              { text: '浅谈证书骗局', link: '/study/certificate-scam' },
              { text: '飞跃手册，常读常新', link: '/study/leap-guide' }
            ]
          },
          {
            text: '认证证书',
            items: [
              { text: '四六级', link: '/study/cet4-cet6' },
              { text: '大英赛到底是不是捐了50块钱——浅谈竞赛', link: '/study/english-contest' },
              { text: '“白名单竞赛”之外，亦可给简历镀金', link: '/study/white-list-competitions' }
            ]
          },
          {
            text: '团体组织',
            items: [
              { text: '社团', link: '/study/clubs' },
              { text: '实验室/兴趣小组', link: '/study/labs-interest-groups' },
              { text: '兴趣群', link: '/study/hobby-groups' }
            ]
          }
        ]
      },
      { text: '生活', link: '/life/' },
      { text: '关于', link: "/about" },
    ],
    '/life/': [
      { text: '概览', link: '/overview' },
      { text: '校园', link: '/campus/' },
      { text: '学习', link: '/study/' },
      {
        text: '生活',
        items: [
          { text: '二手书与二手物品', link: '/life/second-hand' },
          { text: '表白墙、校园社区', link: '/life/confession-wall' },
          { text: '洗澡、住宿，整理个人形象', link: '/life/bathing-accommodation' },
          { text: '快递和外卖', link: '/life/express-food-delivery' },
          {
            text: '长安校区',
            items: [
              { text: '旭日苑、东升苑与美食广场', link: '/life/dining-halls' },
              { text: '校门口的小摊位，万科，gogo街区', link: '/life/street-food' }
            ]
          },
          {
            text: '雁塔校区',
            items: [
              { text: '八里村摊贩们的秤', link: '/life/yanta/eating/street-vendors' },
              { text: '小寨的饭需要等', link: '/life/yanta/eating/xiaozhai-restaurants' },
              { text: '只需要一站地铁——', link: '/life/yanta/play/subway-one-stop' },
              { text: '步行，然后当一名西安游客', link: '/life/yanta/play/walking-tourist' }
            ]
          }, {
            text: '周边生活',
            items: [
              {
                text: '周末玩什么？',
                link: '/life/weekend-activities'
              },
              {
                text: '附近好景点，长跑、骑行与city walk',
                link: '/life/nearby-attractions'
              },
              {
                text: '也许需要一次酣畅淋漓的团建',
                link: '/life/team-building'
              },
              {
                text: '小众爱好：长安校区向北2公里，wmc出没。',
                link: '/life/niche-interests'
              }
            ]
          },
        ]
      },
      { text: '关于', link: "/about" },
    ],
  }
};
