<script setup lang="ts">
import ClipboardJS from 'clipboard'
import { onMounted, ref } from 'vue'
import { tippy } from 'vue-tippy'

const props = defineProps<{
    text?: string
    icon?: string
    copy?: boolean
}>()

const tipEl = ref<HTMLElement | null>(null)
const tooltipText = props.text || (props.copy ? '点击复制' : '')
const icon = props.icon || (props.copy ? 'ph:copy' : 'ph:question')

props.copy && onMounted(() => {
    new ClipboardJS(tipEl.value!, { text: () => tipEl.value?.textContent || '' })
        .on('success', () => {
            tippy(tipEl.value!, {
                content: '已复制',
                trigger: 'manual',
                onShow(instance) { setTimeout(() => instance.hide(), 1000) },
            }).show()
        })
})
</script>

<template>
    <span ref="tipEl" v-tippy="tooltipText" class="annotation">
        <slot />
        <Icon :icon="icon" class="annotation-icon" />
    </span>
</template>

<style scoped>
.annotation {
    position: relative;
    text-decoration: underline dashed var(--vp-c-text-3);
    text-underline-offset: 4px;
    cursor: pointer;
}

.annotation-icon {
    display: inline-block;
    vertical-align: top;
}
</style>
