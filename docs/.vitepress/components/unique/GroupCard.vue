<script setup lang="ts">
import type { Group } from '@/utils/group'
import { computed } from 'vue'
import SearchExcerpt from '@/components/atomic/SearchExcerpt.vue'
import { getQqGroupAvatar } from '@/utils/avatar'

const props = defineProps<Group>()
const avatar = computed(() => getQqGroupAvatar(props.qq))
</script>

<template>
<BlurCard :id="`group-${qq}`" :avatar="avatar" :name="name" :tags="tags">
	<SearchExcerpt :anchor="`group-${qq}`" :title="name" :text="[desc, tags, qq].filter(Boolean).join(' · ')" />
	<div v-if="desc" class="desc">
		{{ desc }}
	</div>
	<template #after>
		<div class="info">
			<Link icon="ri:qq-fill" copy :text="qq" />
		</div>
	</template>
</BlurCard>
</template>

<style scoped>
.desc {
	opacity: 0.8;
	font-size: 0.85em;
	text-wrap: balance;
}

.info {
	opacity: 0.7;
	font-size: 0.9em;
}
</style>
