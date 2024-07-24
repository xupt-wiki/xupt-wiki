<script setup lang="ts">
defineProps<{ text: string }>()
</script>

<template>
    <div class="icon-doubt">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" viewBox="0 0 256 256"><g fill="currentColor"><path d="M224 128a96 96 0 1 1-96-96a96 96 0 0 1 96 96" opacity=".2" /><path d="M140 180a12 12 0 1 1-12-12a12 12 0 0 1 12 12M128 72c-22.06 0-40 16.15-40 36v4a8 8 0 0 0 16 0v-4c0-11 10.77-20 24-20s24 9 24 20s-10.77 20-24 20a8 8 0 0 0-8 8v8a8 8 0 0 0 16 0v-.72c18.24-3.35 32-17.9 32-35.28c0-19.85-17.94-36-40-36m104 56A104 104 0 1 1 128 24a104.11 104.11 0 0 1 104 104m-16 0a88 88 0 1 0-88 88a88.1 88.1 0 0 0 88-88" /></g></svg>
        <div class="doubt-tooltip">
            {{ text }}
            <slot />
        </div>
    </div>
</template>

<style scoped>
.icon-doubt {
    display: inline-block;
    position: relative;
    vertical-align: middle;
}

.doubt-tooltip {
    display: none;
    position: absolute;
    bottom: 1.5em;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    box-shadow: var(--vp-shadow-1);
    background: var(--vp-c-text-1);
    font-size: 0.8em;
    color: var(--vp-c-bg);
}

.icon-doubt:hover .doubt-tooltip {
    display: block;
}
</style>
