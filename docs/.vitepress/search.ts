import blogs from './data/blog.json' with { type: 'json' }
import groups from './data/groups.json' with { type: 'json' }
import labs from './data/labs.json' with { type: 'json' }

export const searchEntries: Record<string, { id: string, title: string, text: string }[]> = {
	'life/groups.md': groups.map(group => ({ id: `group-${group.qq}`, title: group.name, text: [group.desc, group.tags, group.qq].filter(Boolean).join(' · ') })),
	'coder/index.md': labs.map(lab => ({ id: `lab-${lab.id}`, title: lab.name, text: [lab.tags, lab.belong, lab.addr, lab.note, lab.qq].filter(Boolean).join(' · ') })),
	'coder/blog.md': blogs.map(blog => ({ id: `blog-${encodeURIComponent(blog.link)}`, title: blog.title || blog.author, text: [blog.author, blog.belong, blog.tags].filter(Boolean).join(' · ') })),
}
