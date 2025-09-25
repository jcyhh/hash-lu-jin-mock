<template>
    <div class="flex1">
        <div class="line" :class="lineShow?'lineShow':'lineHide'"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const lineShow = ref(false)
setTimeout(()=>lineShow.value=true,300)
</script>

<style lang="scss" scoped>
.line{
    height: 1px;
    background-color: #FFFFFF;
    transition: all 0.5s;
}
.lineHide{
    width: 0px;
}
.lineShow{
    width: 100%;
}
</style>