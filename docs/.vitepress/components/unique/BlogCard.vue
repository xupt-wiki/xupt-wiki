<script setup lang="ts">
import type { Blog } from '@/utils/blog'
import { useClipboard } from '@vueuse/core'
import { computed } from 'vue'
import { getAvatar } from '@/utils/member'

const props = defineProps<Blog>()
const avatar = computed(() => getAvatar(props))
const { copy, copied } = useClipboard({ source: () => props.feed, legacy: true })
</script>

<template>
<div class="card">
	<img class="blur-bg" :src="avatar" alt="">

	<a v-tip="error" class="avatar-container" :href="link" target="_blank">
		<img class="avatar" :src="avatar">
		<Icon icon="ri:arrow-right-line" />
	</a>

	<span class="author">{{ author }}</span>

	<span class="desc">{{ belong }} {{ grade && `${grade}级` }}</span>

	<div class="tag-container">
		<span class="links">
			<Link v-if="github" v-tip="`@${github}`" icon="ri:github-fill" :link="`https://github.com/${github}`" />
			<Link v-if="feed" v-tip="'复制订阅源'" :icon="copied ? 'ri:check-fill' : 'ri:rss-fill'" @click="copy()" />
		</span>

		<div v-if="tags" class="tag-line">
			<Badge v-for="tag in tags.split(',')" :key="tag" :text="tag" type="info" />
		</div>
	</div>
</div>
</template>

<style scoped>
.card {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.6em;
	position: relative;
	overflow: hidden;
	overflow: clip;
	padding: 0.8em;
	border-radius: 0.5em;
	background-color: var(--vp-c-bg-soft);
	line-height: 1.4;
	text-align: center;
	z-index: 0;
}

.blur-bg {
	position: absolute;
	width: 100%;
	transform: translateY(-50%);
	filter: saturate(2) contrast(0.5) blur(2em);
	mix-blend-mode: color;
	pointer-events: none;
	z-index: -1;
}

.avatar-container {
	position: relative;
	width: 4rem;
	height: 4rem;
	border-radius: 4rem;
	box-shadow: 2px 4px 1rem var(--vp-c-divider);
	background-color: var(--vp-c-bg);
}

.avatar {
	width: 100%;
	transition: opacity 0.2s;
}

.card:hover .avatar {
	opacity: 0.2;
}

.avatar-container .iconify {
	position: absolute;
	opacity: 0;
	inset: 50%;
	font-size: 3em;
	transform: translate(-50%, -50%);
	transition: opacity 0.2s;
}

.card:hover .avatar-container .iconify {
	opacity: 1;
}

.author {
	font-weight: 600;
}

.desc {
	margin-top: -0.5em;
	font-size: 0.75em;
	color: var(--vp-c-text-3);
}

.tag-container {
	flex-grow: 1;
	min-height: 1em;
	font-size: 0.9em;
}

.tag-container .tag-line {
	transition: opacity 0.2s;
}

.tag-container .links {
	display: flex;
	justify-content: center;
	gap: 0.5em;
	position: absolute;
	opacity: 0;
	inset: auto 0 0.5em;
	font-size: 1rem;
	line-height: 1.2;
	transition: opacity 0.2s;
	z-index: 1;
}

.card:hover .tag-container .tag-line {
	opacity: 0;
}

.card:hover .tag-container .links {
	opacity: 1;
}

.card a {
	overflow: hidden;
}
</style>
