---
title: 个人博客列表
layout: page
sidebar: false
---

<script setup>
import BlogList from "/.vitepress/components/unique/BlogList.vue";
</script>

<BlogList />

<style>
.VPPage {
    padding: 0 5%;
}

@media (min-width: 83em) {
    .VPPage {
        padding: 0 10%;
    }
}
</style>
