<script setup lang="ts">
import type { Member } from '@/utils/member'
import { useData } from 'vitepress'
import { computed } from 'vue'
import { isExtLink } from '@/utils/link'
import { getAuthor } from '@/utils/member'

const { frontmatter } = useData()

const authors = computed(() => (frontmatter.value.author as [] || []).map(getAuthor))

function genAuthorTip(author: Member) {
	return {
		content: author.qq ? `QQ: ${author.qq}` : `GitHub@${author.github}`,
		interactive: true,
	}
}
</script>

<template>
<section class="authors">
	<a
		v-for="author in authors"
		:key="author.name"
		v-tip="genAuthorTip(author)"
		class="author"
		:href="author.link"
		:target="isExtLink(author.link) ? '_blank' : undefined"
	>
		<img v-if="author.avatar" :src="author.avatar" alt="">
		<span class="name">{{ author.name }}</span>
	</a>
</section>
</template>

<style scoped>
.authors {
	display: flex;
	flex-wrap: wrap;
	gap: 1em;
	margin: 1em 0;
	font-size: 0.8rem;
}

.author {
	display: inline-flex;
	opacity: 0.8;
	border: 1px solid var(--vp-c-divider);
	border-radius: 1.8em;
	box-sizing: content-box;
	background-color: var(--vp-c-bg-soft);
	transition: opacity 0.2s;
}

.author[href]:hover {
	opacity: 1;
}

.author > .name {
	padding: 0.15em 0.5em;
	line-height: 1.5;
}

.author > img {
	height: 1.8em;
	border-radius: 0.9em;
	object-fit: cover;
}

.author > img + .name {
	margin-left: -0.2em;
}
</style>
