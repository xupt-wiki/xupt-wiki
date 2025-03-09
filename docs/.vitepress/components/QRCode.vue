<script setup lang="ts">
import QRCode from 'qrcode'
import { onMounted, ref } from 'vue'

const props = defineProps<{
    src: string
    text?: string
    scale?: number
}>()

const qrcodeDataUrl = ref('')

async function generateQRCode() {
    if (!props.src)
        return

    qrcodeDataUrl.value = await QRCode.toDataURL(props.src, {
        margin: 2,
        scale: props.scale ?? 4,
    })
}

onMounted(() => {
    generateQRCode()
})
</script>

<template>
    <div>
        <img class="qrcode" :src="qrcodeDataUrl" alt="QR Code">
        <div v-if="text" class="text" v-text="text" />
    </div>
</template>

<style scoped>
.qrcode {
    margin: auto;
    image-rendering: pixelated;
}

.text {
    opacity: 0.8;
    margin: 0.5em 0;
    font-size: 0.8em;
    text-align: center;
}
</style>
