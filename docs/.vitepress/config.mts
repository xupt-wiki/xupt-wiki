import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/zh/reference/site-config
export default defineConfig({
	lang: 'zh-CN',
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
			message: '公益项目。与任何组织无关。Made with ❤. <a href="https://beian.miit.gov.cn/" target="_blank">陕ICP备2025072742号-1</a>',
			copyright: `© ${new Date().getFullYear()} <a href="https://github.com/xupt-wiki">西邮 Wiki 项目组</a>`,
		},
	},

	head: [
		['link', { rel: 'icon', href: '/logo.svg' }],
	],
	markdown: {
		math: true,
	},

	vite: {
		server: {
			allowedHosts: true,
		},
	},
})

function nav(): DefaultTheme.NavItem[] {
	return [
		{
			text: 'Coder专题',
			items: [
				{ text: '实验室列表', link: '/coder/' },
				{ text: '校友博客', link: '/coder/blog' },
			],
		},
		{ text: '校园', link: '/campus/', activeMatch: '^/campus/' },
		{ text: '学习', link: '/study/', activeMatch: '^/study/' },
		{ text: '生活', link: '/life/', activeMatch: '^/life/' },
		{
			text: '关于',
			items: [
				{ text: '友情链接', link: '/links' },
				{ text: '贡献指南', link: '/contributing' },
				{ text: '更新日志', link: '/changelog' },
				{ text: '关于我们', link: '/about' },
			],
		},
	]
}

function sidebar(): DefaultTheme.Sidebar {
	return {
		'/coder': [
			{ text: '⏴ 实验室/码农频道', link: '/coder/' },
			{
				text: '培养计划/方案',
				items: [
					{ text: '西邮 Linux 兴趣小组', link: 'https://plan.xiyoulinux.com/' },
					{ text: '移动应用开发实验室', link: '/coder/plan-mobile' },
					{ text: '大数据实验室', link: '/coder/plan-bigdata' },
					{ text: '硬件科技协会', link: '/coder/plan-hardware' },
					{ text: '网络科技协会', link: '/coder/plan-net' },
					{ text: '软件科技协会', link: '/coder/plan-software' },
					{ text: 'ThoughtCoding 实验室', link: '/coder/plan-tc' },
				],
			},
		],
		'/': [
			{
				text: '主线',
				items: [
					{ text: '写在开头', link: '/overview' },
				],
			},
			{
				text: '校园',
				collapsed: true,
				items: [
					{ text: '学校简介', link: '/campus/' },
					{ text: '本科专业列表', link: '/campus/major' },
					{ text: '住宿生活', link: '/campus/accommodation' },
					{ text: '入学准备与办理', link: '/campus/enrollment' },
					{ text: '防骗', link: '/campus/anti-fraud' },
					{ text: '手机必备APP', link: '/campus/apps' },
					{ text: '趣闻', link: '/campus/anecdote' },
					{ text: '反馈与舆论', link: '/campus/feedback' },
				],
			},
			{
				text: '学习',
				collapsed: true,
				items: [
					{ text: '学习简介', link: '/study/' },
					{
						text: '课内学业',
						items: [
							{ text: '课程安排', link: '/study/curriculum' },
							{ text: '学业成绩', link: '/study/grades' },
							{ text: '学分绩点/综测评优', link: '/study/gpa' },
							{ text: '学号/学籍', link: '/study/status' },
						],
					},
					{ text: '实验室/兴趣小组', link: '/study/labs' },
					{ text: '竞赛与证书', link: '/study/contest' },
					{ text: '社团与爱好(未写)', link: '/study/clubs' },
				],
			},
			{
				text: '生活',
				collapsed: true,
				items: [
					{ text: '生活简介', link: '/life/' },
					{ text: '校园墙/社区/二手交易', link: '/life/forum' },
					{ text: '快递和外卖', link: '/life/delivery' },
					{ text: '美食推荐', link: '/life/food' },
					{ text: '周边去处', link: '/life/nearby' },
				],
			},
			{
				text: '关于',
				items: [
					{ text: '友情链接', link: '/links' },
					{ text: '贡献指南', link: '/contributing' },
					{ text: '更新日志', link: '/changelog' },
					{ text: '关于我们', link: '/about' },
				],
			},
		],
	}
};
