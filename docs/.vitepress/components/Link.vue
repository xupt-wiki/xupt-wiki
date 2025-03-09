<script setup lang="ts">
defineProps<{
    icon?: string
    link?: string
    tip?: string
}>()
</script>

<template>
    <component :is="link ? 'a' : 'span'" v-tip="tip" :href="link" target="_blank">
        <Icon v-if="icon" :icon="icon" :class="{ mr: $slots.default }" />
        <slot />
    </component>
</template>

<style scoped>
.mr {
    margin-right: 0.2rem;
}
</style>
