<script setup lang="ts">
import { isExtLink } from '@/utils/link'
import TextEllipsis from './TextEllipsis.vue'
import Tip from './Tip.vue'

export interface LinkProps {
	icon?: string
	text?: string
	iconSuffix?: string
	link?: string
	desc?: string
	card?: boolean
	copy?: boolean
	textLines?: string | number
	descLines?: string | number
}

withDefaults(defineProps<LinkProps>(), {
	textLines: 2,
	descLines: 2,
})
</script>

<template>
<component
	:is="link ? 'a' : 'span'"
	class="link"
	:class="{ card }"
	:href="link"
	:target="isExtLink(link) ? '_blank' : undefined"
>
	<!-- loading="lazy" 有概率不加载图片 -->
	<img v-if="icon?.startsWith?.('http')" class="icon" :src="icon" alt="">
	<Icon v-else-if="icon" class="icon" :icon="icon" />

	<span v-if="$slots.default || text">
		<component
			:is="copy ? Tip : TextEllipsis"
			class="content"
			:lines="textLines"
			:copy
		>
			<slot>{{ text }}</slot>
			<Icon v-if="iconSuffix" class="icon-suffix" :icon="iconSuffix" />
		</component>
		<TextEllipsis v-if="desc" class="link-desc" :text="desc" :lines="descLines" />
	</span>
</component>
</template>

<style scoped>
.link {
	display: inline-flex;
	gap: 0.2em;
	position: relative;
	overflow: hidden;
	overflow: clip;
	font-weight: normal;
	line-height: 1.4;
	text-decoration: none;
	z-index: 0;
}

.link.card {
	gap: 0.5em;
	margin: 1em auto;
	padding: 0.5em 0.8em;
	border: 1px solid transparent;
	border-radius: 0.5em;
	background: none;
	background-color: var(--vp-c-bg-soft);
	color: inherit;
	transition: all 0.2s;
}

.link.card.card.card::after {
	content: unset;
}

a.link.card:hover {
	border-color: var(--vp-c-brand-1);
	background-color: var(--vp-c-bg-soft-hover);
	color: var(--vp-c-brand-1);
}

img.icon {
	width: 1.4em;
}

.iconify.icon {
	height: 1.17em;
}

.icon-suffix {
	margin-left: 0.1em;
	font-size: 1em;
}

.link.card .icon {
	position: absolute;
	opacity: 0.15;
	right: 0;
	bottom: 0;
	width: 5em;
	height: 100%;
	object-fit: cover;
	z-index: -1;
}

.link.card .content {
	font-weight: 500;
}

.link-desc {
	opacity: 0.8;
	margin-top: 0.2em;
	font-size: 0.8em;
}
</style>
