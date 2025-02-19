<script lang="ts" setup>
import type { Member } from '../data/member'
import { computed } from 'vue'

const props = defineProps<Member>()

const avatarLink = computed(() => {
    switch (props.avatarType) {
        case 'qq':
            return `https://q1.qlogo.cn/g?b=qq&nk=${props.avatarName}&s=4`
        case 'github':
            return `https://wsrv.nl/?url=github.com/${props.github}.png%3fsize=92`
    }
    return props.avatarName
})
</script>

<template>
    <div class="card">
        <img class="card-avatar" :src="avatarLink">
        <div class="card-content">
            <div>
                <span class="name">{{ name }}</span>
                <span v-if="title" class="title">{{ title }}</span>
            </div>
            <span v-if="github || linkText && link" class="links">
                <a v-if="github" :href="`https://github.com/${github}`" target="_blank">
                    <i class="fa-brands fa-github" />
                </a>
                <a v-if="link && linkText" :href="link" target="_blank">
                    <i class="fa-solid fa-link" />{{ linkText }}
                </a>
            </span>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    align-items: center;
    gap: 1em;
    width: 240px;
    max-width: 100%;
    margin: 0.5em auto;
    padding: 8px;
    border-radius: 12px;
    background-color: var(--vp-c-bg-soft);
    line-height: 1.2em;
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
