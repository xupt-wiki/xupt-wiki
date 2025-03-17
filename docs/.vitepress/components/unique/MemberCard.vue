<script setup lang="ts">
import type { Member } from '../../utils/member'
import { getAvatar } from '../../utils/member'
import Link from '../Link.vue'

defineProps<Partial<Member>>()
</script>

<template>
    <div class="card">
        <img class="avatar" :src="getAvatar($props)">
        <span class="name">{{ name }}</span>
        <span class="title">{{ title }}</span>
        <span v-if="github || linkText && link" class="links">
            <Link v-if="github" icon="ri:github-fill" :link="`https://github.com/${github}`" />
            <Link v-if="link && linkText" icon="ri:link-m" :link="link">{{ linkText }}</Link>
        </span>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;
    width: 10em;
    max-width: 100%;
    margin: 0.5em auto;
    padding: 8px;
    border-radius: 0.5em;
    background-color: var(--vp-c-bg-soft);
    line-height: normal;
}

.avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 4rem;
    box-shadow: 2px 4px 1rem var(--vp-c-divider);
}

.name {
    font-weight: 600;
}

.title {
    flex-grow: 1;
    margin-top: -0.5em;
    font-size: 0.75em;
    color: var(--vp-c-text-3);
}

.links {
    display: flex;
    gap: 0.5em;
    font-size: 0.8em;
    line-height: 1.2;
}

.card a {
    overflow: hidden;
    background: unset;
}

.card a[target]::after {
    content: unset;
}
</style>
