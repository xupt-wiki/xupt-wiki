<template>
<div class="not-found">
	<img class="logo" src="" alt="">
	<h1>页面未找到</h1>
	<a class="button" href="/">返回主页</a>
</div>
</template>

<style scoped>
.not-found {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	min-height: 60dvh;
}

.logo {
	opacity: 0.3;
	width: 10em;
}

h1 {
	font-size: 2em;
	font-weight: bold;
}

.button {
	display: inline-block;
	padding: 0.2em 1em;
	border: 1px solid var(--vp-c-brand-1);
	border-radius: 1em;
	color: var(--vp-c-brand-1);
	transition: border-color 0.25s, color 0.25s;
}

.button:hover {
	border-color: var(--vp-c-brand-2);
	color: var(--vp-c-brand-2);
}
</style>
