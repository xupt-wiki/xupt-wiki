<script setup lang="ts">
import { isExtLink } from '../utils/link'
import Tip from './Tip.vue'

defineProps<{
    icon?: string
    link?: string
    text?: string
    copy?: boolean
}>()
</script>

<template>
    <component
        :is="link ? 'a' : 'span'"
        class="link"
        :href="link"
        :target="isExtLink(link) ? '_blank' : undefined"
    >
        <Icon v-if="icon" :icon="icon" />

        <component
            :is="copy ? Tip : 'span'"
            v-if="$slots.default || text"
            class="content"
            :copy
        >
            <slot>{{ text }}</slot>
        </component>
    </component>
</template>

<style scoped>
.link {
    display: inline-flex;
    gap: 0.2em;
    line-height: 1.4;
}

.iconify {
    height: 1.2em;
}

.content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
}
</style>
