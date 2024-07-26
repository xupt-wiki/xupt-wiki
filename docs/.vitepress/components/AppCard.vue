<script setup lang="ts">
defineProps<{
    data: {
        name: string
        icon: string
    }
}>()
</script>

<template>
    <div class="app-card">
        <img :src="data.icon" class="app-icon" alt="">
    </div>
</template>

<style scoped>
.app-card {
    margin: 0.5em auto;
}

.app-icon {
    height: 32px;
    border-radius: 4px;
}
</style>
