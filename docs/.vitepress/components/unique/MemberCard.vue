<script setup lang="ts">
import type { Member } from '../../utils/member'
import { getAvatar } from '../../utils/member'
import Link from '../Link.vue'

defineProps<Partial<Member>>()
</script>

<template>
    <div class="card">
        <img class="card-avatar" :src="getAvatar($props)">
        <div class="card-content">
            <div>
                <span class="name">{{ name }}</span>
                <span v-if="title" class="title">{{ title }}</span>
            </div>
            <span v-if="github || linkText && link" class="links">
                <Link v-if="github" icon="ri:github-fill" :link="`https://github.com/${github}`" />
                <Link v-if="link && linkText" icon="ri:link-m" :link="link">{{ linkText }}</Link>
            </span>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    align-items: center;
    gap: 1em;
    width: 18em;
    max-width: 100%;
    margin: 0.5em auto;
    padding: 8px;
    border-radius: 0.5em;
    background-color: var(--vp-c-bg-soft);
    line-height: normal;
}

.card-avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 4rem;
    box-shadow: 2px 4px 1rem var(--vp-c-divider);
}

.card-content {
    display: grid;
    gap: 4px;
}

.card-content .name {
    font-weight: 600;
}

.card-content .title {
    margin-left: 0.5em;
    font-size: 0.8em;
    color: var(--vp-c-text-3);
}

.card-content > .links {
    display: flex;
    gap: 0.8em;
    font-size: 0.8em;
    line-height: 1.2;
}

.card > .card-content a {
    overflow: hidden;
    background: unset;
}

.card > .card-content a[target]::after {
    content: unset;
}
</style>
