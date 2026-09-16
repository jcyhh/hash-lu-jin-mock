<template>
    <div class="rel">
        <van-swipe class="banner" :show-indicators="false" :autoplay="4000" @change="$event=>bannerCurrent=$event">
            <van-swipe-item v-for="(item,index) in list" :key="index">
                <img :src="item.img_url" class="banner">
            </van-swipe-item>
        </van-swipe>
        <div class="dots flex ac jc">
            <div class="dot" :class="bannerCurrent==index?'dotAct':''" v-for="(_item,index) in list" :key="index"></div>
        </div>
        <!-- <van-swipe class="banner" :show-indicators="false" :autoplay="4000" @change="$event=>bannerCurrent=$event">
            <van-swipe-item v-for="(item,index) in 3" :key="index">
                <img src="@/assets/mock/banner.webp" class="banner">
            </van-swipe-item>
        </van-swipe>
        <div class="dots flex ac jc">
            <div class="dot" :class="bannerCurrent==index?'dotAct':''" v-for="(_item,index) in 3" :key="index"></div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { getBanner } from '@/api/common';
import { ref } from 'vue';

const bannerCurrent = ref(0)

const list = ref()
getBanner().then((res:any)=>list.value=res.banners)
</script>

<style lang="scss" scoped>
.banner{
    width: 100%;
    height: 800px;
}
.dots{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 30px;
    z-index: 1;
    .dot{
        width: 20px;
        height: 6px;
        transition: all 0.3s;
        margin-right: 6px;
        background-color: #FFFFFF;
        opacity: 0.3;
    }
    .dotAct{
        background-color: $main-color;
        width: 80px !important;
        opacity: 1 !important;
    }
}
</style>