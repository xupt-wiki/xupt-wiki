<script setup lang="ts">
defineProps<{
	avatar?: string
	name: string
	tags: string
	flip?: boolean
}>()
</script>

<template>
<div class="card" :class="{ flip }">
	<div class="face">
		<img v-if="avatar" class="blur-bg" :src="avatar" alt="">
		<div class="banner">
			<img class="avatar-el" :src="avatar ?? '/favicon.svg'" alt="">
		</div>
		<div class="name">
			{{ name }}
		</div>
		<slot />
		<div class="tag-line">
			<Badge v-for="tag in tags.split(/[,，]/)" :key="tag" :text="tag.trim()" />
		</div>
		<slot name="after" />
	</div>

	<div v-if="flip" class="back">
		<img v-if="avatar" class="blur-bg" :src="avatar" alt="">
		<slot name="back" />
	</div>
</div>
</template>

<style scoped>
.card {
	display: grid;
	position: relative;
}

.card.flip {
	perspective: 50rem;
}

.face,
.back {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	position: relative;
	overflow: hidden;
	overflow: clip;
	padding: 1.5rem;
	border-radius: 0.5em;
	background-color: var(--vp-c-bg-soft);
	text-align: center;
	z-index: 0;
}

.flip .face,
.flip .back {
	backface-visibility: hidden;
	transition: transform 0.3s;
}

.flip .face {
	gap: 1em;
}

.flip .back {
	gap: 0.5rem;
	position: absolute;
	inset: 0;
	padding: 1rem;
	transform: rotateY(-180deg);
}

.flip:hover .face {
	transform: rotateY(180deg);
}

.flip:hover .back {
	transform: rotateY(0);
}

.blur-bg {
	position: absolute;
	width: 100%;
	transform: scale(1.2);
	filter: saturate(2) contrast(0.5) blur(3em);
	mix-blend-mode: color;
	pointer-events: none;
	z-index: -1;
}

.back .blur-bg {
	transform: scale(-1.2, 1.2);
}

.avatar-el {
	width: 5rem;
	height: 5rem;
	border-radius: 5rem;
}

.name {
	font-weight: bold;
	text-align: center;
	text-wrap: balance;
}

.tag-line {
	flex-grow: 1;
	font-size: 0.9em;
}
</style>
