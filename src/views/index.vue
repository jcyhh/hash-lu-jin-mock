<template>
     <div class="bg">
        <Plasma></Plasma>
    </div>
    <div class="start flex jc ac">
        <img src="@/assets/logo.png" class="startImg animate__animated animate__zoomIn">
    </div>
    <div class="size28 mt30 grey tips animate__animated animate__fadeInUp" v-if="!ethereum">请安装 MateMask !</div>
</template>

<script setup lang="ts">
    import Plasma from '@/components/VueBits/Plasma.vue';
const { ethereum } = window as any
</script>

<style lang="scss" scoped>
.bg {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.6;
}
.start {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding-bottom: 200px;

    .startImg {
        width: 300px;
        height: auto;
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