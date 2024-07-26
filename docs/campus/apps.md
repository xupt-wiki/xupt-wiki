<script setup>
import AppCard from "/.vitepress/components/AppCard.vue";

const apps = {
    chaoxing: { name: "学习通", icon: "https://p19.qhimg.com/t01e56f9a7cebff2ea2.png" },
}
</script>

# 手机上的 APP 们

## 课堂学习

<AppCard :data="apps.chaoxing" />
