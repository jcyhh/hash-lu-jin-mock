<template>
    <van-pull-refresh style="min-height: 100vh;" v-model="refreshing" :pulling-text="$t('下拉即可刷新...')" :loosing-text="$t('释放即可刷新...')" :loading-text="$t('加载中...')" @refresh="onRefresh">
        <van-list style="min-height: 100vh;" v-model:loading="loading" :finished="finished" :loading-text="$t('加载中...')" :finished-text="$t('没有更多了')" @load="onLoad">
            <slot :listData="list"></slot>
            <cus-empty v-if="list.length==0"></cus-empty>
        </van-list>
    </van-pull-refresh>
</template>

<script setup lang="ts">
/**
 * 分页列表逻辑
 */
import { nextTick, ref } from 'vue';
import { get } from '@/utils/request';

let props = defineProps(['api', 'name', 'param'])
let emit = defineEmits(['getListData'])

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

let page:number = 0
const limit:number = 10

const onLoad = () => {
    if(refreshing.value){
        list.value = []
        refreshing.value = false
        page = 0
    }
    page++
    let params = {
        page_no: page,
        page_size: limit,
        ...props.param
    }
    get(props.api, params).then((res:any)=>{
        const listData = props.name ? res[props.name] : res
        list.value = list.value.concat(listData)
        loading.value = false
        finished.value = listData.length < limit
        emit('getListData')
    })
};

const onRefresh = () => {
    finished.value = false;
    loading.value = true;
    onLoad();
};

const refresh = async () => {
    await nextTick()
    refreshing.value = true
    finished.value = false;
    loading.value = true;
    onLoad();
}

defineExpose({
    refresh
})
</script>

<style lang="scss" scoped></style>