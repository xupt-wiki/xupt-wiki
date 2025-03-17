<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'
import { getAuthor } from '../utils/member'

const { frontmatter } = useData()

const authors = computed(() => (frontmatter.value.author as [] || []).map(getAuthor))
</script>

<template>
    <section class="authors">
        <a
            v-for="{ name, link, avatar } in authors"
            :key="name"
            class="author"
            :href="link"
        >
            <img v-if="avatar" :src="avatar" alt="">
            <span class="name">{{ name }}</span>
        </a>
    </section>
</template>

<style scoped>
.authors {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
    line-height: normal;
}

.author {
    display: inline-flex;
    align-items: center;
    opacity: 0.8;
    border: 1px solid var(--vp-c-divider);
    border-radius: 1rem;
    background-color: var(--vp-c-bg-soft);
    font-size: 0.875rem;
    transition: opacity 0.2s;
}

.author[href]:hover {
    opacity: 1;
}

.author .name {
    padding: 0.2em 0.5em;
}

.author img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1rem;
    object-fit: cover;
}
</style>
