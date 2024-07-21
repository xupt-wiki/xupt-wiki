<script lang="ts" setup>
import { computed } from "vue";

export interface MemberProps {
    name: string;
    title?: string;
    qq: string;
    github?: string;
    linkText?: string;
    link?: string;
}

const props = defineProps<MemberProps>();

const avatarLink = computed(() => {
    return props.github
        ? `https://wsrv.nl/?url=github.com/${props.github}.png`
        : props.qq
            ? `https://q1.qlogo.cn/g?b=qq&nk=${props.qq}&s=3`
            : `/favicon.ico`;
});
</script>

<template>
    <div class="card">
        <img class="card-avatar" :src="avatarLink" />
        <div class="card-content">
            <span class="name" v-if="name">{{ name }}</span>
            <span class="title" v-if="title">{{ title }}</span>
            <span class="links" v-if="github || linkText && link">
                <a v-if="github" :href="`https://github.com/${github}`" target="_blank">
                    <i class="fa-brands fa-github"></i>{{ github }}
                </a>
                <a v-if="link && linkText" :href="link" target="_blank">
                    <i class="fa-solid fa-link"></i>{{ linkText }}
                </a>
            </span>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    align-items: center;
    padding: 8px;
    gap: 1em;
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

.card-content>.name {
    font-weight: 600;
}

.card-content>.title {
    font-size: 0.8em;
    color: var(--vp-c-text-3);
}

.card-content>.links {
    display: flex;
    gap: .8em;
    line-height: 1.2;
    font-size: 0.8em;
}

.card-content a {
    overflow: hidden;
    background: unset;
}

.card-content a[target]::after {
    content: unset;
}
</style>