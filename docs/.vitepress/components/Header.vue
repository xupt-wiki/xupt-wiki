<template>
    <header>
        <p>
            欢迎加入西邮生活 QQ 群 <Tip copy>
                <strong>924632788</strong>
            </Tip>。项目修缮中，可联系群管理员贡献内容。
        </p>
        <Logo class="header-logo" />
    </header>
</template>

<style scoped>
header {
    position: relative;
    margin-block: -1em 2em;
    color: var(--vp-c-text-3);
}

/* stylelint-disable-next-line media-feature-range-notation */
@media (max-width: 768px) {
    header {
        font-size: 0.875em;
    }
}

strong {
    font-size: 1.2em;
}

.header-logo {
    position: absolute;
    top: 0;
    right: 0;
    height: 5em;
    color: var(--vp-c-divider);
    z-index: -1;
}
</style>
