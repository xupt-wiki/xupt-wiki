<script setup lang="ts">
import { onMounted, ref } from 'vue'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import type { Icon } from '@iconify/vue'
import ClipboardJS from 'clipboard'

const props = defineProps<{
    text?: string
    icon?: string
    copy?: boolean
}>()

const annotation = ref<HTMLElement | null>(null)

const icon = props.icon || (props.copy ? 'ph:copy' : 'ph:question')

const tooltipText = props.text || (props.copy ? '点击复制' : '')

onMounted(() => {
    tippy(annotation.value!, {
        content: tooltipText,
    })

    if (props.copy) {
        new ClipboardJS(annotation.value!, {
            text: () => annotation.value?.textContent || '',
        }).on('success', () => {
            tippy(annotation.value!, {
                content: '已复制',
                trigger: 'manual',
                onShow(instance) {
                    setTimeout(() => instance.hide(), 1000)
                },
            }).show()
        })
    }
})
</script>

<template>
    <span ref="annotation" class="annotation">
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
