<template>
    <Tooltip
        class="dropdown"
        interactive
        placement="bottom"
        :arrow="false"
        :hide-on-click="false"
        :offset="[0, 0]"
    >
        <slot />
        <template #content="{ hide }">
            <slot name="content" :hide />
        </template>
    </Tooltip>
</template>

<style scoped>
/* https://vue-tippy.netlify.app/props#appendto
   Tooltip 位于组件根部时，interactive tippy 会插入到父组件 */
:deep() ~ [data-tippy-root] > .tippy-box {
    overflow: auto;
    max-height: clamp(4rem, 50vh, 20rem);
    padding: 0;
    font-size: inherit;
    scrollbar-width: thin;
}

:deep() ~ [data-tippy-root] .tippy-content {
    display: grid;
}

:deep() ~ [data-tippy-root] .tippy-content button {
    padding: 0.1em 0.5em;
    text-align: start;
    transition: color 0.1s, background-color 0.2s;
    cursor: pointer;
}

:deep() ~ [data-tippy-root] .tippy-content button:hover {
    background-color: var(--vp-c-default-soft);
}
</style>
