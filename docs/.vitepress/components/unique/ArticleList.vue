<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { data } from '@/articles.data'
import ArticleByline from '@/components/atomic/ArticleByline.vue'
import ArticleChips from '@/components/atomic/ArticleChips.vue'

const props = defineProps<{ limit?: number }>()
const query = ref('')
const selected = ref('全部')
const view = ref('cards')
const categories = ['全部', ...new Set(data.map(article => article.category))]
function readQuery() {
	const params = new URLSearchParams(location.search)
	query.value = params.get('q') || ''
	selected.value = params.get('category') || '全部'
	view.value = params.get('view') === 'list' ? 'list' : 'cards'
}
function syncQuery() {
	const params = new URLSearchParams(location.search)
	for (const [key, value] of Object.entries({ q: query.value, category: selected.value === '全部' ? '' : selected.value, view: view.value === 'list' ? 'list' : '' })) {
		if (value)
			params.set(key, value)
		else params.delete(key)
	}
	history.replaceState(null, '', `${location.pathname}${params.size ? `?${params}` : ''}${location.hash}`)
}
onMounted(() => {
	if (!props.limit) {
		readQuery()
		window.addEventListener('popstate', readQuery)
	}
})
onUnmounted(() => window.removeEventListener('popstate', readQuery))
const articles = computed(() => {
	if (props.limit)
		return data.filter(article => article.lastUpdated).slice(0, props.limit)
	return data.filter(article => (selected.value === '全部' || article.category === selected.value || article.tags.includes(selected.value)) && [article.title, article.category, article.description, ...article.tags].join(' ').toLocaleLowerCase().includes(query.value.trim().toLocaleLowerCase()))
})
function select(value: string) {
	selected.value = value
	syncQuery()
}
</script>

<template>
<div class="article-index">
	<template v-if="!limit">
		<ArticleChips :items="categories" :selected="selected" @select="select" />
		<div class="controls">
			<input v-model="query" type="search" aria-label="筛选标题、分类或标签" placeholder="筛选标题、分类或标签…" @input="syncQuery">
			<button v-for="mode in ['cards', 'list']" :key="mode" :aria-label="mode === 'cards' ? '卡片视图' : '列表视图'" :aria-pressed="view === mode" @click="view = mode; syncQuery()">
				<Icon :icon="mode === 'cards' ? 'ri:grid-line' : 'ri:list-check'" />
			</button>
		</div>
		<p class="count">
			{{ articles.length }} 篇文章
		</p>
	</template>
	<ul class="articles" :class="{ cards: !limit && view === 'cards' }">
		<li v-for="article in articles" :key="article.url">
			<div class="content">
				<a class="title" :href="article.url">{{ article.title }}</a>
				<p v-if="article.description">
					{{ article.description }}
				</p>
				<ArticleChips v-if="!limit" :items="article.tags" @select="select" />
			</div>
			<ArticleByline :date="article.lastUpdated || article.date" :authors="article.authors" />
		</li>
	</ul>
	<p v-if="!articles.length">
		没有找到相关文章。<button @click="query = ''; select('全部')">
			清除筛选
		</button>
	</p>
</div>
</template>

<style scoped>
.article-index { margin-block: 1.5rem; }
.controls {
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-top: 1.2rem;
}
.controls input {
	flex: 1;
	min-width: 0;
	padding: 0.55rem 0.8rem;
	border: 1px solid var(--vp-c-divider);
	border-radius: 0.5rem;
}
.controls button {
	display: grid;
	place-items: center;
	padding: 0.55rem;
	border-radius: 0.4rem;
	cursor: pointer;
}
.controls button:hover, .controls button[aria-pressed="true"] {
	background: var(--vp-c-brand-soft);
	color: var(--vp-c-brand-1);
}
.count {
	margin-block: 0.8rem;
	font-size: 0.85rem;
	color: var(--vp-c-text-2);
}
.articles {
	display: grid;
	padding: 0;
	list-style: none;
}
li {
	position: relative;
	margin-inline: -0.8rem;
	padding: 0.8rem;
}
.articles:not(.cards) > li {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 0.6rem;
}
li:hover { background: var(--vp-c-bg-soft); }
li:not(:last-child) { border-bottom: 1px solid var(--vp-c-divider); }
.title { font-weight: 600; }
.title::after {
	content: "";
	position: absolute;
	inset: 0;
}
.title:hover { color: var(--vp-c-brand-1); }
.content { min-width: 0; }
.articles:not(.cards) .content {
	display: flex;
	flex: 1;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.3rem 0.6rem;
}
.content p {
	width: 100%;
	font-size: 0.9rem;
	color: var(--vp-c-text-2);
}
.content :deep(.chips) {
	position: relative;
	z-index: 1;
}
.cards {
	grid-template-columns: repeat(auto-fill, minmax(min(100%, 17rem), 1fr));
	gap: 0.6rem;
}
.cards li {
	margin: 0;
	padding: 0.5em 0.8em;
	border: 1px solid transparent;
	border-radius: 0.5em;
	background: var(--vp-c-bg-soft);
	line-height: 1.4;
	transition: all 0.2s;
}
.cards li:hover, .cards li:focus-within {
	border-color: var(--vp-c-brand-1);
	background-color: var(--vp-c-bg);
	color: var(--vp-c-brand-1);
}
.articles:not(.cards) :deep(.byline) {
	flex: 0 1 50%;
	justify-content: flex-end;
}
.cards .content p { margin-block: 0.25em 0; }
.cards .content :deep(.chips) { margin-top: 0.3em; }
.cards :deep(.byline) { margin-top: 0.35em; }
@media (max-width: 640px) {
	.articles:not(.cards) > li {
		flex-direction: column;
		align-items: stretch;
		gap: 0.5rem;
	}
	.articles:not(.cards) :deep(.byline) {
		flex-basis: auto;
		justify-content: flex-start;
	}
}
</style>
