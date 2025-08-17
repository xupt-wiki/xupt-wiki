<script setup lang="ts">
import type { Member } from '../../utils/member'
import MemberCard from './MemberCard.vue'

defineProps<{
	members: Member[]
}>()
</script>

<template>
<section class="members">
	<MemberCard v-for="member in members" :key="member.name" v-bind="member" />
</section>
</template>

<style scoped>
.members {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
	gap: 0.5em;
	margin: 2em auto;
}

.card {
	width: auto;
	margin: 0;
}
</style>
