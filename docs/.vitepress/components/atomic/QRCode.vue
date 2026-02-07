<script setup lang="ts">
import type { QrCodeGenerateSvgOptions } from 'uqr'
import { renderSVG } from 'uqr'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
	src: string
	text?: string
	size?: string
	visit?: boolean
	uqrOptions?: QrCodeGenerateSvgOptions
}>()

const svg = ref('')
watchEffect(() => svg.value = renderSVG(props.src, props.uqrOptions || { border: 2, pixelSize: 1 }))
</script>

<template>
<div class="qrcode">
	<div class="svg-container" :style="{ '--size': size }" v-html="svg" />
	<div class="vp-doc">
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
.svg-container {
	width: var(--size, 8em);
	margin: auto;
}

.svg-container :deep(svg) {
	opacity: 0.8;
	border-radius: 5%;
}

.vp-doc {
	margin: 0.5em 0 1em;
	font-size: 0.8em;
	line-height: 1.4;
	text-align: center;
}
</style>
