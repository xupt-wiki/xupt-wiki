<script setup lang="ts">
export interface AppProps {
    name: string
    icon: string
    desc: Array<string> | string
}
defineProps<AppProps>()
</script>

<template>
    <div class="app-card">
        <div class="app-info">
            <img :src="icon" class="app-icon" alt="">
            <span class="app-name">{{ name }}</span>
        </div>
        <div class="app-desc">
            <template v-if="Array.isArray(desc)">
                <p v-for="(para, index) in desc" :key="index">
                    {{ para }}
                </p>
            </template>
            <template v-else>
                <p>{{ desc }}</p>
            </template>
        </div>
    </div>
</template>

<style scoped>
.app-card {
    display: flex;
    align-items: center;
    gap: 1em;
    margin: 1em auto;
    padding: 1em;
    border-radius: 0.5em;
    background-color: var(--vp-c-bg-soft);
}

.app-info {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    gap: 0.5em;
    width: 4em;
}

.app-name {
    font-size: 0.8em;
    font-weight: 600;
    line-height: 1rem;
    text-align: center;
}

.app-icon {
    width: 3em;
    border-radius: 0.5em;
    box-shadow: 2px 4px 1rem var(--vp-c-divider);
}

.app-desc > p {
    margin: 0.5em 0;
    line-height: 1.2;
}
</style>
