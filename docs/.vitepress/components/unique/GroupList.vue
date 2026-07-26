<script setup lang="ts">
import { onMounted, ref } from 'vue'
import groupsData from '@/data/groups.json'
import GroupCard from './GroupCard.vue'

const groups = ref([...groupsData])

const shuffleGroups = () => groups.value.sort(() => Math.random() - 0.5)

onMounted(shuffleGroups)
</script>

<template>
<h1 class="center-line">
	西邮兴趣群展示
	<Icon class="shuffle-btn" icon="ri:shuffle-fill" @click="shuffleGroups" />
</h1>

<slot />

<div class="center-line vp-doc">
	由 <a href="https://docs.qq.com/sheet/DSkFiRmpzcVJHSklM?tab=ov58e9" target="_blank">西邮QQ兴趣群在线表格</a> 生成，可通过在线文档新增/修改信息
</div>

<TransitionGroup tag="section" class="group-list">
	<GroupCard v-for="group in groups" :key="group.qq" v-bind="group" />
</TransitionGroup>
</template>

<style scoped>
.group-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
	gap: 1rem;
	margin: 2rem auto;
}

.center-line {
	margin: 2em 0 2rem;
	font: revert;
	text-align: center;
}

.shuffle-btn {
	cursor: pointer;
}

.v-move {
	transition: transform 0.3s;
}
</style>
