<script setup lang="ts">
import { onMounted, ref } from 'vue'
import blogList from '../../data/blog.json'
import BlogCard from './BlogCard.vue'

const blogs = ref([...blogList])

const shuffleBlogs = () => blogs.value.sort(() => Math.random() - 0.5)

onMounted(() => {
	if (!location.search.includes('shuffle=false'))
		shuffleBlogs()
})
</script>

<template>
<h1 class="center-line">
	西邮校友博客索引
	<Icon class="shuffle-btn" icon="ri:shuffle-fill" @click="shuffleBlogs" />
</h1>

<slot />

<div class="center-line vp-doc">
	由 <a href="https://docs.qq.com/sheet/DSkFiRmpzcVJHSklM?tab=7dbpqq" target="_blank">西邮个人博客列表</a> 生成，可通过在线文档修改信息
</div>

<TransitionGroup tag="section" class="blogs">
	<BlogCard v-for="blog in blogs" :key="blog.link" v-bind="blog" />
</TransitionGroup>
</template>

<style scoped>
.blogs {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
	gap: 0.5em;
	margin: 2em auto;
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
