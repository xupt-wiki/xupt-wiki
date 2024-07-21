<script lang="ts" setup>
import { ref } from 'vue';
import MemberCard from "./MemberCard.vue";
import { MemberProps } from "./MemberCard.vue";

const props = defineProps<{ members: Record<string, MemberProps> }>();
const activeGrade = ref<string>(Object.keys(props.members)[0]);

function setActiveGrade(grade: string) {
    activeGrade.value = grade;
}
</script>

<template>
    <div class="tabs-container">
        <div class="tabs">
            <button v-for="(members, grade) in members" :key="grade" :class="{ active: activeGrade === grade }"
                @click="setActiveGrade(grade)">
                <span class="grade">{{ grade }}</span>
                <span class="badge">{{ members.length }}</span>
            </button>
        </div>
        <div class="tab-contents" v-for="(members, grade) in members" :key="grade" v-show="activeGrade === grade">
            <div class="members">
                <member-card v-for="member in members" :key="member.name" v-bind="member" />
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
    padding: 2px .5em;
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