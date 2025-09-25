<template>
    <div class="flex jc ac">
        <img src="./left.png" class="line animate__animated animate__fadeInLeft">
        <div class="ml30 mr30">
            <slot></slot>
        </div>
        <img src="./right.png" class="line animate__animated animate__fadeInRight">
    </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.line{
    width: 50px;
    height: 12px;
}
</style>