<template>
    <van-swipe class="notice" :show-indicators="false" :vertical="true" :autoplay="autoplay">
        <van-swipe-item v-for="(item,index) in list" :key="index">
            <div class="notice line1" @click.stop="routerPush(`/notice/${item.id}`)">{{ item.title }}</div>
        </van-swipe-item>
    </van-swipe>
    <!-- <van-swipe class="notice" :show-indicators="false" :vertical="true" :autoplay="autoplay">
        <van-swipe-item v-for="(item,index) in 3" :key="index">
            <div class="notice line1">公告内容公告内容公告内容公告内容公告内容公告内容</div>
        </van-swipe-item>
    </van-swipe> -->
</template>

<script setup lang="ts">
import { routerPush } from '@/router';
import { autoplay, getNotice } from '..';
import { ref } from 'vue';

const list = ref()
getNotice({
    page_no: 1,
    page_size: 10
}).then((res:any)=>list.value = res.notices)
</script>

<style lang="scss" scoped>
.notice{
    width: 563px;
    height: 50px;
    font-size: 26px;
    line-height: 50px;
}
</style>