<script lang="ts" setup>
import { computed } from 'vue'

export interface MemberProps {
    name: string
    title?: string
    qq: string
    github?: string
    linkText?: string
    link?: string
}

const props = defineProps<MemberProps>()

const avatarLink = computed(() => {
    return props.github
        ? `https://wsrv.nl/?url=github.com/${props.github}.png`
        : props.qq
            ? `https://q1.qlogo.cn/g?b=qq&nk=${props.qq}&s=3`
            : `/favicon.ico`
})
</script>

<template>
    <div class="card">
        <img class="card-avatar" :src="avatarLink">
        <div class="card-content">
            <span v-if="name" class="name">{{ name }}</span>
            <span v-if="title" class="title">{{ title }}</span>
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

.card-content > .name {
    font-weight: 600;
}

.card-content > .title {
    font-size: 0.8em;
    color: var(--vp-c-text-3);
}

.card-content > .links {
    display: flex;
    gap: 0.8em;
    font-size: 0.8em;
    line-height: 1.2;
}

.card-content a {
    overflow: hidden;
    background: unset;
}

.card-content a[target]::after {
    content: unset;
}
</style>
