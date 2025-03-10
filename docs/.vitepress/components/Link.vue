<script setup lang="ts">
import Tip from './Tip.vue'

defineProps<{
    icon?: string
    link?: string
    text?: string
    tip?: string
    copy?: boolean
}>()
</script>

<template>
    <component :is="link ? 'a' : 'span'" v-tip="tip" class="link" :href="link" target="_blank">
        <Icon v-if="icon" :icon="icon" />
        <Tip v-if="copy" copy>
            <slot>{{ text }}</slot>
        </Tip>
        <slot v-else>
            {{ text }}
        </slot>
    </component>
</template>

<style scoped>
.link {
    display: inline-flex;
    gap: 0.2rem;
    line-height: normal;
}
</style>
