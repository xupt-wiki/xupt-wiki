// https://vitepress.dev/zh/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import Logo from '../components/Logo.vue'
import Doubt from '../components/Doubt.vue'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/zh/guide/extending-default-theme#layout-slots
            'doc-before': () => h(Header),
            'doc-after': () => h(Footer),
        })
    },
    // enhanceApp({ app, router, siteData }) {
    enhanceApp({ app }) {
        app.component('Logo', Logo)
        app.component('Doubt', Doubt)
    },
} satisfies Theme
