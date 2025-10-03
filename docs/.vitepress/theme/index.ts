// https://vitepress.dev/zh/guide/custom-theme
import type { Theme } from 'vitepress'
import type { directive, Tippy } from 'vue-tippy'
import { Icon } from '@iconify/vue'
import { createPinia } from 'pinia'
import DefaultTheme from 'vitepress/theme-without-fonts'
import { h } from 'vue'
import VueTippy, { roundArrow } from 'vue-tippy'

import Dropdown from '../components/atomic/Dropdown.vue'
import QRCode from '../components/atomic/QRCode.vue'
import Tip from '../components/atomic/Tip.vue'
import Author from '../components/Author.vue'
import Disclaimer from '../components/Disclaimer.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Logo from '../components/Logo.vue'
import NotFound from '../components/NotFound.vue'
import TableAutoSpan from '../components/TableAutoSpan.vue'

import './font.css'
import './style.css'
import './theme-enhanced.css'
import 'tippy.js/dist/svg-arrow.css'

declare module 'vue' {
	// @keep-sorted
	interface GlobalComponents {
		Disclaimer: typeof Disclaimer
		Dropdown: typeof Dropdown
		Icon: typeof Icon
		Logo: typeof Logo
		QRCode: typeof QRCode
		TableAutoSpan: typeof TableAutoSpan
		Tip: typeof Tip
		Tooltip: typeof Tippy
	}
	interface GlobalDirectives {
		vTip: typeof directive
	}
}

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
			'doc-before': () => h(Header),
			'doc-footer-before': () => h(Author),
			'doc-after': () => h(Footer),
			'not-found': () => h(NotFound),
		})
	},
	enhanceApp({ app }) {
		app.component('Disclaimer', Disclaimer)
		app.component('Dropdown', Dropdown)
		app.component('Icon', Icon)
		app.component('Logo', Logo)
		app.component('TableAutoSpan', TableAutoSpan)
		app.component('Tip', Tip)
		app.component('QRCode', QRCode)

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
