---
title: 实验室列表
layout: page
sidebar: false
---

<script setup>
import CoderGuild from "@/components/unique/CoderGuild.vue";
import LabList from "@/components/unique/LabList.vue";
</script>

<LabList><CoderGuild /></LabList>

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
