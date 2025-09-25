<template>
    <div class="start flex jc ac">
        <img src="@/assets/start.png" class="startImg animate__animated animate__zoomIn">
    </div>
    <div class="size28 mt30 grey tips animate__animated animate__fadeInUp" v-if="!ethereum">请安装 MateMask !</div>
</template>

<script setup lang="ts">
const { ethereum } = window as any
</script>

<style lang="scss" scoped>
.start {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding-bottom: 200px;

    .startImg {
        width: 308px;
        height: 308px;
    }
}
.tips{
    width: 100vw;
    height: 100px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    text-align: center;
}
</style>