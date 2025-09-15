<script setup lang="ts">
import type { Member } from '../../utils/member'
import MemberCard from './MemberCard.vue'

defineProps<{
	members: Member[]
	width?: string
}>()
</script>

<template>
<section class="members" :style="{ '--col-width': width }">
	<MemberCard v-for="member in members" :key="member.name" v-bind="member" />
</section>
</template>

<style scoped>
.members {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(var(--col-width, 8em), 1fr));
	gap: 0.5em;
	margin: 2em auto;
}

.card {
	width: auto;
	margin: 0;
}
</style>
