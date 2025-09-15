<script setup lang="ts">
import type { AppProps } from './AppCard.vue'
import AppCard from './AppCard.vue'

defineProps<{ data: Record<string, AppProps> }>()
</script>

<template>
<div class="app-list">
	<AppCard v-for="app, index in data" :key="index" v-bind="app" />
</div>
</template>

<style scoped>
.app-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(18em, 1fr));
	gap: 1em;
}

.app-card {
	margin: 0;
}
</style>
