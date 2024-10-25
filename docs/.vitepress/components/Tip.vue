<script setup lang="ts">
import ClipboardJS from 'clipboard'
import tippy from 'tippy.js'
import { onMounted, ref } from 'vue'
import 'tippy.js/dist/tippy.css'

const props = defineProps<{
    text?: string
    icon?: string
    copy?: boolean
}>()

const tipEl = ref<HTMLElement | null>(null)

const icon = props.icon || (props.copy ? 'ph:copy' : 'ph:question')

const tooltipText = props.text || (props.copy ? '点击复制' : '')

onMounted(() => {
    tippy(tipEl.value!, {
        content: tooltipText,
    })

    if (props.copy) {
        new ClipboardJS(tipEl.value!, {
            text: () => tipEl.value?.textContent || '',
        }).on('success', () => {
            tippy(tipEl.value!, {
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
    <span ref="tipEl" class="annotation">
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
