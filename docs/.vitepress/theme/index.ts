// https://vitepress.dev/zh/guide/custom-theme
import type { Theme } from 'vitepress'
import type { directive, Tippy } from 'vue-tippy'
import { Icon } from '@iconify/vue'
import { createPinia } from 'pinia'
import DefaultTheme from 'vitepress/theme-without-fonts'
import { h } from 'vue'
import VueTippy, { roundArrow } from 'vue-tippy'

import Dropdown from '@/components/atomic/Dropdown.vue'
import QRCode from '@/components/atomic/QRCode.vue'
import Tip from '@/components/atomic/Tip.vue'
import Author from '@/components/Author.vue'
import Disclaimer from '@/components/Disclaimer.vue'
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Logo from '@/components/Logo.vue'
import NotFound from '@/components/NotFound.vue'
import TableAutoSpan from '@/components/TableAutoSpan.vue'

import './font.css'
import './style.css'
import './theme-enhanced.css'
import 'tippy.js/dist/svg-arrow.css'

// @keep-sorted
const globalComponents = {
	Disclaimer,
	Dropdown,
	Icon,
	Logo,
	QRCode,
	TableAutoSpan,
	Tip,
}

export type GlobalComponentTypes = typeof globalComponents

declare module 'vue' {
	interface GlobalComponents extends GlobalComponentTypes {
		Tooltip: typeof Tippy
	}

	interface GlobalDirectives {
		vTip: typeof directive
	}

	interface ComponentCustomProperties {
		$frontmatter: Record<string, any>
		$param: Record<string, any>
	}
}

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			'doc-before': () => h(Header),
			'doc-footer-before': () => h(Author),
			'doc-after': () => h(Footer),
			'not-found': () => h(NotFound),
		})
	},
	enhanceApp({ app }) {
		// 注册 globalComponents
		Object.entries(globalComponents).forEach(args => app.component(...args))

		const pinia = createPinia()
		app.use(pinia)

		app.use(VueTippy, {
			component: 'Tooltip',
			directive: 'tip',
			defaultProps: {
				arrow: roundArrow,
			},
		})
	},
} satisfies Theme
