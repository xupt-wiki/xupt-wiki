<script lang="ts" setup>
import type { MemberProps } from './MemberCard.vue'
import { computed, ref } from 'vue'
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
                v-for="groupObj, groupIndex in selectedMembers" :key="groupIndex"
                :class="{ active: activeTypeIndex === groupObj.type }" @click="setActiveType(groupObj.type)"
            >
                <span class="type">{{ groupObj.type }}</span>
                <span class="badge">{{ groupObj.members.length }}</span>
            </button>
        </div>
        <div
            v-for="groupObj in selectedMembers" v-show="activeTypeIndex === groupObj.type" :key="groupObj.type"
            class="tab-contents"
        >
            <div class="members">
                <MemberCard v-for="member in groupObj.members" :key="member.name" v-bind="member" />
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

.card {
    width: auto;
    margin: 0;
}
</style>
