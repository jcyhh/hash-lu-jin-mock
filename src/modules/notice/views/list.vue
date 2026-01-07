<template>
    <cus-nav :title="$t('公告列表')"></cus-nav>
    <div class="pl30 pr30 mt30">

        <cus-list api="/api/notices" name="notices" v-slot="{ listData }">
            <div class="card mb20" v-for="(item,index) in listData" :key="index" @click="routerPush(`/notice/${item.id}`)">
                <div class="flex jb ac">
                    <div class="tag" v-filter:time="item.updated_at"></div>
                    <div class="flex ac">
                        <div class="size24 grey mr10">{{ $t('查看详情') }}</div>
                        <van-icon name="arrow" color="#666666" size="15"></van-icon>
                    </div>
                </div>
                <div class="line1 size28 mt30">{{ item.title }}</div>
            </div>
        </cus-list>
    </div>
</template>

<script setup lang="ts">
import { routerPush } from '@/router';


</script>

<style lang="scss" scoped>
.card{
    padding: 30px;
    border-radius: 20px;
    background-color: #1A1A1A;
}
.tag{
    height: 44px;
    border-radius: 12px;
    background-color: #FFFFFF1A;
    padding: 0 20px;
    font-size: 24px;
    line-height: 44px;
}
</style>