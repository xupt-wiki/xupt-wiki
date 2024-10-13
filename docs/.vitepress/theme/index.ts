// https://vitepress.dev/zh/guide/custom-theme
import type { Theme } from 'vitepress'
import { Icon } from '@iconify/vue'
import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

import Annotation from '../components/Annotation.vue'
import Disclaimer from '../components/Disclaimer.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Logo from '../components/Logo.vue'
import QRCode from '../components/QRCode.vue'
import TableAutoSpan from '../components/TableAutoSpan.vue'

import './theme-enhanced.css'
import './style.css'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
            'doc-before': () => h(Header),
            'doc-after': () => h(Footer),
        })
    },
    enhanceApp({ app, router, siteData }) {
        void router
        void siteData

        app.component('Annotation', Annotation)
        app.component('Disclaimer', Disclaimer)
        app.component('Icon', Icon)
        app.component('Logo', Logo)
        app.component('TableAutoSpan', TableAutoSpan)
        app.component('QRCode', QRCode)
    },
} satisfies Theme
