<script setup lang="ts">
import type { LinkProps } from '@/components/atomic/Link.vue'
import Link from '@/components/atomic/Link.vue'

defineProps<{
	links: Record<string, LinkProps>
	width?: string
	descLines?: string | number
}>()
</script>

<template>
<div class="link-list" :style="{ '--col-width': width }">
	<Link v-for="item, index in links" :key="index" card v-bind="item" :desc-lines />
</div>
</template>

<style scoped>
.link-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(var(--col-width, 10em), 1fr));
	gap: 1em;
	margin: 1em 0;
}

.link.card {
	margin: 0;
}
</style>
