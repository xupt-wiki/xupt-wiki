---
title: 全部文章
layout: page
sidebar: false
article: false
search: false
---

<script setup lang="ts">
import ArticleList from '@/components/unique/ArticleList.vue'
</script>

<main class="article-page">

# 全部文章

<ArticleList />

</main>

<style scoped>
.article-page { padding: 2rem 5%; }
.article-page :deep(h1) { font-size: 2rem; font-weight: 600; }
@media (min-width: 83em) { .article-page { padding-inline: 10%; } }
</style>
