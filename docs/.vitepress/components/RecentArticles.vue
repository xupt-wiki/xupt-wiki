<script setup lang="ts">
import ArticleList from './unique/ArticleList.vue'
</script>

<template>
<section class="recent">
	<div class="heading">
		<h2>最近更新</h2><a href="/articles">全部文章 <Icon icon="ri:arrow-right-line" /></a>
	</div>
	<ArticleList :limit="5" />
</section>
</template>

<style scoped>
.recent {
	max-width: 1152px;
	margin: 3rem auto;
	padding-inline: 24px;
}
.heading {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
h2 {
	font-size: 1.5rem;
	font-weight: 600;
}
a {
	display: inline-flex;
	align-items: center;
	gap: 0.3rem;
	color: var(--vp-c-brand-1);
}
</style>
