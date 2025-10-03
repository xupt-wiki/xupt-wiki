<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { computed, ref, useTemplateRef } from 'vue'

defineProps<{
	text?: string
	lines?: string | number
}>()

const textEllipsis = useTemplateRef('text-ellipsis')
const isClamped = ref(false)
const tip = computed(() => isClamped.value ? textEllipsis.value?.textContent?.trim() : undefined)

function detectClamp() {
	if (!textEllipsis.value)
		return
	const { clientHeight, scrollHeight } = textEllipsis.value
	isClamped.value = scrollHeight > clientHeight
}

useResizeObserver(textEllipsis, detectClamp)
</script>

<template>
<span
	ref="text-ellipsis"
	v-tip="tip"
	class="text-ellipsis"
	:style="{ '--lines': lines }"
>
	<slot>{{ text }}</slot>
</span>
</template>

<style scoped>
.text-ellipsis {
	display: -webkit-box;
	overflow: hidden;
	-webkit-line-clamp: var(--lines);
	line-clamp: var(--lines);
	-webkit-box-orient: vertical;
}
</style>
