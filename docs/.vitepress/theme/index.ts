// https://vitepress.dev/zh/guide/custom-theme
import type { Theme } from 'vitepress'
import { Icon } from '@iconify/vue'
import DefaultTheme from 'vitepress/theme-without-fonts'
import { h } from 'vue'
import VueTippy, { roundArrow } from 'vue-tippy'

import Disclaimer from '../components/Disclaimer.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Logo from '../components/Logo.vue'
import NotFound from '../components/NotFound.vue'
import QRCode from '../components/QRCode.vue'
import TableAutoSpan from '../components/TableAutoSpan.vue'
import Tip from '../components/Tip.vue'

import 'tippy.js/dist/svg-arrow.css'
import './theme-enhanced.css'
import './style.css'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
            'doc-before': () => h(Header),
            'doc-after': () => h(Footer),
            'not-found': () => h(NotFound),
        })
    },
    enhanceApp({ app }) {
        app.component('Disclaimer', Disclaimer)
        app.component('Icon', Icon)
        app.component('Logo', Logo)
        app.component('TableAutoSpan', TableAutoSpan)
        app.component('Tip', Tip)
        app.component('QRCode', QRCode)

        app.use(VueTippy, {
            component: 'Tooltip',
            directive: 'tip',
            defaultProps: {
                arrow: roundArrow,
            },
        })
    },
} satisfies Theme
