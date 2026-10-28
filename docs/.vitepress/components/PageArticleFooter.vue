<script setup lang="ts">
import { useData } from 'vitepress'
import Author from './Author.vue'

const { page, frontmatter } = useData()
</script>

<template>
<footer v-if="frontmatter.article !== false" class="page-article-footer">
	<Author />
	<p v-if="page.lastUpdated">
		更新于：<time :datetime="new Date(page.lastUpdated).toISOString()">{{ new Date(page.lastUpdated).toISOString().slice(0, 10) }}</time>
	</p>
</footer>
</template>

<style scoped>
.page-article-footer {
	max-width: 1152px;
	margin: 2rem auto;
	padding-inline: 24px;
	font-size: 0.875rem;
	color: var(--vp-c-text-2);
}
</style>
