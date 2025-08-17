<script setup lang="ts">
import QRCode from 'qrcode'
import { onMounted, ref } from 'vue'
import Link from './Link.vue'

const props = defineProps<{
	src: string
	text?: string
	scale?: number
	visit?: boolean
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
<div class="qrcode">
	<img class="image" :src="qrcodeDataUrl" alt="">
	<div class="text vp-doc">
		{{ text }}
		<template v-if="visit">
			<Link :link="src">
				<Icon icon="ri:arrow-right-line" />访问
			</Link>
		</template>
	</div>
</div>
</template>

<style scoped>
.image {
	opacity: 0.75;
	margin: auto;
	image-rendering: pixelated;
}

.text {
	opacity: 0.8;
	margin: 0.5em 0 1em;
	font-size: 0.8em;
	line-height: 1.4;
	text-align: center;
}
</style>
