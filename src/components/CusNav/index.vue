<template>
    <div>
        <div class="cusNav flex jb ac">
            <div class="flex1" @click="back">
                <van-icon name="arrow-left" :size="20" />
            </div>
            <div class="flex2 size32 tc">{{ title || '' }}</div>
            <div class="flex1 flex je ac">
                <slot></slot>
            </div>
        </div> 
        <div class="gap100"></div>
    </div>
</template>

<script setup lang="ts">
/**
 * 二级页面导航栏
 */
import { routerGo } from '@/router'

defineProps(['title'])

// 返回按钮
function back(){
    routerGo()
}
</script>

<style lang="scss" scoped>
.cusNav{
    width: 100vw;
    height: 100px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 0 30px;
    background-color: #000000;
}
</style>