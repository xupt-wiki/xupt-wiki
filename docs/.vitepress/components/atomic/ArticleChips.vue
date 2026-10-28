<script setup lang="ts">
defineProps<{ items: string[], selected?: string }>()
defineEmits<{ select: [value: string] }>()
</script>

<template>
<div v-if="items.length" class="chips">
	<button v-for="item in items" :key="item" :aria-pressed="selected === item" @click="$emit('select', item)">
		{{ item }}
	</button>
</div>
</template>

<style scoped>
.chips {
	display: flex;
	flex-wrap: wrap;
	gap: 0.4rem 0.8rem;
}
button {
	margin: -0.2rem -0.4rem;
	padding: 0.2rem 0.4rem;
	border-radius: 0.3rem;
	font-size: 0.85rem;
	color: var(--vp-c-text-2);
	cursor: pointer;
}
button:hover, button[aria-pressed="true"] {
	background: var(--vp-c-brand-soft);
	color: var(--vp-c-brand-1);
}
</style>
