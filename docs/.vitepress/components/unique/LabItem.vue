<script setup lang="ts">
import type { Lab } from '@/utils/lab'
import { computed } from 'vue'
import SearchExcerpt from '@/components/atomic/SearchExcerpt.vue'
import { getGithubAvatar, getQqGroupAvatar } from '@/utils/avatar'

const props = defineProps<Lab>()
const avatar = computed(() => getGithubAvatar(props.github) ?? getQqGroupAvatar(props.qq) ?? '')
</script>

<template>
<BlurCard :id="`lab-${id}`" :avatar="avatar" :name="name" :tags="tags" flip>
	<SearchExcerpt :anchor="`lab-${id}`" :title="name" :text="[tags, belong, addr, note, qq].filter(Boolean).join(' · ')" />
	<template #back>
		<div class="id">
			{{ id }}
		</div>
		<div class="name">
			{{ name }}
		</div>

		<div class="link-line">
			<Link v-if="github" v-tip="`@${github}`" icon="ri:github-fill" :link="`https://github.com/${github}`" aria-label="Github" />
			<Link v-if="website" icon="ri:global-fill" :link="website" text="官网" />
			<Link v-if="plan" icon="ri:book-2-line" :link="plan" text="培养计划" />
		</div>

		<div class="info">
			<Link v-if="belong" icon="ri:building-line" :text="belong" />
			<Link v-if="addr" icon="ri:map-pin-2-line" :text="addr" />
			<Link v-if="qq" icon="ri:qq-fill" copy :text="qq" />
			<!-- <Link v-if="note" icon="ri:message-2-line" :text="note" /> -->
		</div>
	</template>
</BlurCard>
</template>

<style scoped>
.id {
	position: absolute;
	top: 0;
	font-size: 4em;
	font-weight: bold;
	line-height: 1.5;
	white-space: nowrap;
	mix-blend-mode: color-burn;
	user-select: none;
	z-index: -1;
}

.name {
	font-weight: bold;
	text-align: center;
	text-wrap: balance;
}

.link-line {
	display: flex;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	font-size: 0.9em;
}

.info {
	display: grid;
	gap: 0.4rem;
	opacity: 0.7;
	width: 90%;
	font-size: 0.9em;
}
</style>
