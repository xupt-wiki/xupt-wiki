<script setup lang="ts">
import { onMounted, ref } from 'vue'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import { Icon } from '@iconify/vue/dist/iconify.js'

const props = defineProps<{
    text?: string
    icon?: string
}>()
const annotation = ref<HTMLElement | null>(null)

onMounted(() => {
    if (annotation.value) {
        tippy(annotation.value, {
            content: props.text,
            allowHTML: true,
        })
    }
})
</script>

<template>
    <span ref="annotation" class="annotation">
        <slot />
        <Icon :icon="icon || 'ph:question'" class="annotation-icon" />
    </span>
</template>

<style scoped>
.annotation {
    position: relative;
    text-decoration: underline dashed var(--vp-c-text-3);
    text-underline-offset: 0.3em;
    cursor: pointer;
}

.annotation-icon {
    display: inline-block;
    vertical-align: top;
}
</style>
