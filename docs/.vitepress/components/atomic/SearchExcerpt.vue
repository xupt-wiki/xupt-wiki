<script setup lang="ts">
defineProps<{ anchor: string, title: string, text: string }>()
</script>

<template>
<div hidden aria-hidden="true">
	<h2>{{ title }}<a :href="`#${encodeURIComponent(anchor)}`" /></h2>
	<p>{{ text }}</p>
</div>
</template>
