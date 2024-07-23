// https://vitepress.dev/zh/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

import Logo from '/.vitepress/components/Logo.vue'
import Header from '/.vitepress/components/Header.vue'
import Footer from '/.vitepress/components/Footer.vue'

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
    app.component('Logo', Logo)
  }
} satisfies Theme
