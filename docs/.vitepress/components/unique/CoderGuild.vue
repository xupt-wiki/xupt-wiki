<script setup lang="ts">
import Dropdown from '@/components/atomic/Dropdown.vue'
</script>

<template>
<Dropdown class="coder-gulid vp-doc">
	<img src="https://pd.qq.com/favicon.ico" alt="" class="coder-gulid-icon">
	“西邮码农”频道
	<div class="desc">
		实验室纳新、技术交流、就业资讯
	</div>

	<Icon icon="ri:arrow-right-s-line" class="arrow" />

	<template #content>
		<QRCode src="https://pd.qq.com/g/xiyoumanong" text="QQ 扫码加入" visit />
	</template>
</Dropdown>
</template>

<style scoped>
.coder-gulid {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.2em 0.5em;
	position: relative;
	width: fit-content;
	margin: 0 auto;
	padding: 0.5em 1.6em 0.5em 0.8em;
	border-radius: 0.5rem;
	background: var(--vp-c-default-soft);
}

.coder-gulid-icon {
	height: 1.5em;
}

.desc {
	font-size: 0.8em;
	line-height: 1.4;
	color: var(--vp-c-text-2);
}

:deep(.image) {
	margin: 0.5em;
	border-radius: 0.5em;
}

.arrow {
	position: absolute;
	right: 0.2em;
}
</style>

<!-- eslint-disable-next-line vue/enforce-style-attribute -->
<style>
.dark .coder-gulid-icon {
	filter: brightness(12);
}
</style>
