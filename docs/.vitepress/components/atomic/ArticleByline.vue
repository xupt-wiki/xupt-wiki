<script setup lang="ts">
import { computed } from 'vue'
import { getAuthor } from '@/utils/member'

const props = defineProps<{ date: string, authors: string[] }>()
const names = computed(() => props.authors.map(id => getAuthor(id).name).join('、'))
</script>

<template>
<div class="byline">
	<time v-if="date" :datetime="date"><Icon icon="ri:time-line" />{{ date.slice(0, 10) }}</time>
	<span v-if="names" class="authors" :title="names"><Icon icon="ri:user-line" /><span class="names">{{ names }}</span></span>
</div>
</template>

<style scoped>
.byline {
	display: flex;
	gap: 0.6em;
	min-width: 0;
	max-width: 100%;
	font-size: 0.8rem;
	line-height: 1.25;
	color: var(--vp-c-text-2);
}
time, .authors {
	display: inline-flex;
	align-items: center;
	gap: 0.3em;
}
time, :deep(.iconify) { flex-shrink: 0; }
.authors { min-width: 0; }
.names {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>
