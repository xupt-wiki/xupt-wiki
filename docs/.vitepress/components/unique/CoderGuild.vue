<script setup lang="ts">
import QRCode from '../QRCode.vue'
// import Tip from '../Tip.vue'
</script>

<template>
    <div class="card">
        <div class="card-body">
            <div class="card-title">
                “西邮码农”频道
            </div>
            <div class="desc">
                QQ扫码加入，获取更多纳新、技术交流、就业信息。
            </div>
        </div>
        <QRCode src="https://pd.qq.com/s/grwcu97te" :scale="2" style="flex-shrink: 0;" />
    </div>
</template>

<style scoped>
.card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1em;
    width: 20em;
    max-width: 100%;
    margin: 0 auto;
    padding: 0.5em 1em;
    border-radius: 0.5rem;
    background: var(--vp-c-default-soft);
}

.desc {
    margin-top: 0.2em;
    font-size: 0.8em;
    line-height: normal;
    color: var(--vp-c-text-2);
}
</style>
