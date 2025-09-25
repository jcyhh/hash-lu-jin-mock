<template>
    <cus-nav :title="$t('公告详情')"></cus-nav>
    <div class="pl30 pr30 mt40">

        <div class="size40 bold">{{ info?.title }}</div>

        <div class="size26 grey mt20">{{ info?.updated_at }}</div>

        <div class="size26 gray mt60 rich" v-html="info?.content"></div>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getNoticeDetail } from '..';

const route = useRoute()

const info = ref()
getNoticeDetail(route.params.id).then((res:any)=>info.value=res)
</script>

<style lang="scss" scoped>
</style>