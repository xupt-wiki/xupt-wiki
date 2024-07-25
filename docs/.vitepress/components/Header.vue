<script setup lang="ts">
import Logo from './Logo.vue'
</script>

<template>
    <header>
        <p>
            西邮 Wiki 项目起步，正在修缮，欢迎加入项目组 QQ 群 <strong>924632788</strong> 贡献内容。
        </p>
        <Logo class="header-logo" />
    </header>
</template>

<style scoped>
header {
    position: relative;
    opacity: 0.5;
    margin-block: -1em 2em;
}

strong {
    font-size: 1.2em;
}

.header-logo {
    position: absolute;
    opacity: 0.2;
    top: 0;
    right: 0;
    height: 5rem;
}
</style>
