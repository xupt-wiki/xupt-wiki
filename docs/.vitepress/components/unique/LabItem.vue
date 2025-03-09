<script setup lang="ts">
import type { Lab } from '../../utils/lab'
import { computed } from 'vue'
import { getAvatar } from '../../utils/lab'
import Link from '../Link.vue'

const props = defineProps<Lab>()
const avatar = computed(() => getAvatar(props))
</script>

<template>
    <div class="card">
        <div class="card-face">
            <img class="banner-bg" :src="avatar" alt="">

            <div class="banner">
                <span class="id">{{ id }}</span>
                <img v-if="avatar" class="avatar" :src="avatar" alt="">
            </div>

            <div class="name">
                {{ name }}
            </div>

            <div class="desc">
                <Badge v-for="tag in desc.split(',')" :key="tag" :text="tag" />
            </div>
        </div>

        <div class="card-back">
            <img class="banner-bg" :src="avatar" alt="">
            <div class="name">
                {{ name }}
            </div>

            <div class="icon-line">
                <Link v-if="github" icon="ri:github-fill" :link="`https://github.com/${github}`" :tip="`@${github}`" />
                <Link v-if="website" icon="ri:global-fill" :link="website" text="官网" />
                <Link v-if="plan" icon="ri:book-2-line" :link="plan" text="培养计划" />
            </div>

            <div class="info">
                <Link v-if="belong" icon="ri:building-line">
                    {{ belong }}
                </Link>

                <Link v-if="addr" icon="ri:map-pin-2-line">
                    {{ addr }}
                </Link>

                <Link v-if="qq" icon="ri:qq-fill">
                    {{ qq }}
                </Link>

            <!-- <Link v-if="note" icon="ri:message-2-line">
                {{ note }}
            </Link> -->
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: grid;
    position: relative;
    perspective: 50rem;
}

.card-face, .card-back {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    overflow: clip;
    padding: 0.5rem 1rem 1rem;
    border-radius: 0.5em;
    background-color: var(--vp-c-bg-soft);
    backface-visibility: hidden;
    transition: transform 0.2s;
    z-index: 0;
}

.card-back {
    justify-content: center;
    position: absolute;
    inset: 0;
    transform: rotateY(-180deg);
}

.card:hover .card-face {
    transform: rotateY(180deg);
}

.card:hover .card-back {
    transform: rotateY(0);
}

.banner {
    display: grid;
    place-items: center;
    position: relative;
    height: 7rem;
    z-index: -1;
}

.banner-bg {
    position: absolute;
    opacity: 0.2;
    top: 50%;
    left: 0;
    width: 100%;
    transform: translateY(-50%) scale(1.2);
    transition: all 0.2s;
    filter: brightness(0.8) saturate(10) contrast(0.8) blur(3em);
    z-index: -1;
}

.id {
    position: absolute;
    opacity: 0.1;
    font-size: 4em;
    font-weight: bold;
    white-space: nowrap;
    user-select: none;
    z-index: -1;
}

.icon-line {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 4rem;
}

.name {
    font-weight: bold;
    line-height: normal;
    text-align: center;
}

.desc {
    display: flex;
    justify-content: center;
    gap: 0.2rem;
    margin-top: 0.5rem;
    font-size: 0.9em;
    flex-wrap: wrap;
}

.info {
    display: grid;
    gap: 0.4rem;
    opacity: 0.7;
    font-size: 0.9em;
    line-height: normal;
}
</style>
