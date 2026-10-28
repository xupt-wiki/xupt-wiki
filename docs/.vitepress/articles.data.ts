import { createContentLoader } from 'vitepress'

export interface Article {
	url: string
	title: string
	category: string
	tags: string[]
	authors: string[]
	date: string
	lastUpdated: string
	description: string
}
declare const data: Article[]
export { data }
const categories: Record<string, string> = { campus: '校园', study: '学习', life: '生活', coder: 'Coder' }
const loader = createContentLoader('**/*.md', {
	includeSrc: true,
	transform(pages): Article[] {
		return pages.filter(page => !['/', '/articles'].includes(page.url.replace(/\.html$/, '')) && page.frontmatter.article !== false).map((page) => {
			const fm = page.frontmatter
			const path = `${page.url.replace(/^\//, '').replace(/\.html$/, '')}${page.url.endsWith('/') ? 'index' : ''}.md`
			const date = fm.date ? new Date(fm.date).toISOString().slice(0, 10) : ''
			const lastUpdated = fm.lastUpdated ? new Date(fm.lastUpdated).toISOString().slice(0, 10) : ''
			return {
				url: page.url,
				title: fm.title || page.src?.match(/^# +([^ ].*)$/m)?.[1] || page.url,
				category: categories[path.split('/')[0]] || '关于',
				tags: Array.isArray(fm.tags) ? fm.tags : [],
				authors: Array.isArray(fm.author) ? fm.author : fm.author ? [fm.author] : [],
				date,
				lastUpdated,
				description: fm.description || '',
			}
		}).sort((a, b) => (b.lastUpdated || b.date).localeCompare(a.lastUpdated || a.date) || a.title.localeCompare(b.title, 'zh-CN'))
	},
})
export default {
	...loader,
	watch: loader.watch,
	load: () => loader.load(),
}
