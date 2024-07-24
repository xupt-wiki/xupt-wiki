<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { MemberProps } from './MemberCard.vue'
import MemberCard from './MemberCard.vue'

const props = defineProps<{
    members: Array<{
        type: string
        members: Array<MemberProps>
    }>
    from?: number
    to?: number
}>()

const selectedMembers = computed(() => {
    const from = props.from ?? 0
    const to = props.to ?? props.members.length
    return props.members.slice(from, to)
})

const activeTypeIndex = ref<string>(selectedMembers.value[0]?.type || '')

function setActiveType(type: string) {
    activeTypeIndex.value = type
}
</script>

<template>
    <div class="tabs-container">
        <div class="tabs">
            <button
                v-for="(gradeObj, gradeIndex) in selectedMembers" :key="gradeIndex"
                :class="{ active: activeTypeIndex === gradeObj.type }" @click="setActiveType(gradeObj.type)"
            >
                <span class="type">{{ gradeObj.type }}</span>
                <span class="badge">{{ gradeObj.members.length }}</span>
            </button>
        </div>
        <div
            v-for="gradeObj in selectedMembers" v-show="activeTypeIndex === gradeObj.type" :key="gradeObj.type"
            class="tab-contents"
        >
            <div class="members">
                <MemberCard v-for="member in gradeObj.members" :key="member.name" v-bind="member" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.tabs {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin: 2rem 0;
    flex-wrap: wrap;
}

.tabs button {
    display: flex;
    align-items: center;
    overflow: hidden;
    border: none;
    border-radius: 4px;
    background-color: var(--vp-c-bg-soft);
    cursor: pointer;
}

.tabs button > * {
    padding: 2px 0.5em;
}

.tabs button > .badge {
    background-color: var(--vp-c-default-soft);
}

.tabs button.active {
    background-color: var(--vp-c-brand);
    color: var(--vp-c-bg);
}

.members {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 8px;
}
</style>
