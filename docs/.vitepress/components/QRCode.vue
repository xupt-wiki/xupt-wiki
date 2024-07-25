<script setup>
import QRCode from 'qrcode'
import { onMounted, ref } from 'vue'

const props = defineProps({
    src: String,
    text: String,
})

const qrcodeDataUrl = ref('')

async function generateQRCode() {
    if (props.src) {
        qrcodeDataUrl.value = await QRCode.toDataURL(props.src, {
        })
    }
}

onMounted(() => {
    generateQRCode()
})
</script>

<template>
    <div>
        <img class="qrcode" :src="qrcodeDataUrl" alt="QR Code">
        <div class="text">
            {{ text }}
        </div>
    </div>
</template>

<style scoped>
.qrcode {
    margin: auto;
    image-rendering: pixelated;
}

.text {
    opacity: 0.8;
    margin: 0.5em auto;
    font-size: 0.8em;
    text-align: center;
}
</style>
