<template>
    <div style="
    display: flex;
    align-items: center;
    width: 100%;">
        <text class="reg_flex_aside"></text>
        <div class="reg_center">
            <router-view />
        </div>
        <text class="reg_flex_aside"></text>
    </div>
</template>

<style>
.reg_flex_aside {
    flex: 1;
    display: inline-flex;
    justify-content: center;
}

.reg_center {
    min-width: 1000px;
}
</style>