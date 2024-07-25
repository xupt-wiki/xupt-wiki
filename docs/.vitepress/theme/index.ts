// https://vitepress.dev/zh/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import { Icon } from '@iconify/vue/dist/iconify.js'

import Annotation from '../components/Annotation.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import Logo from '../components/Logo.vue'
import QRCode from '../components/QRCode.vue'

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
        app.component('Icon', Icon)
        app.component('Annotation', Annotation)
        app.component('Logo', Logo)
        app.component('QRCode', QRCode)
    },
} satisfies Theme
