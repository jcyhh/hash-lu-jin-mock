<template>
    <div class="start flex jc ac">
        <img src="@/assets/start.png" class="startImg animate__animated animate__lightSpeedInLeft">
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
    background: linear-gradient(#000000, #03250C);

    .startImg {
        width: 300px;
        height: 300px;
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