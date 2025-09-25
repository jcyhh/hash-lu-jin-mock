<template>
    <van-pull-refresh style="min-height: 100vh;" v-model="refreshing" :pulling-text="$t('下拉即可刷新...')" :loosing-text="$t('释放即可刷新...')" :loading-text="$t('加载中...')" @refresh="onRefresh">
        <slot :list="list"></slot>
        <cus-empty v-if="list.length==0"></cus-empty>
        <div class="flex jc" v-if="loading">
            <van-loading size="24px">{{ $t('加载中...') }}</van-loading>
        </div>
    </van-pull-refresh>
</template>

<script setup lang="ts">
/**
 * 不分页列表组件
 */
import { ref, onMounted } from 'vue';
import { get } from '@/utils/request';

let props = defineProps(['api', 'name', 'param'])
let emit = defineEmits(['getListData'])

const list = ref([]);
const loading = ref(false);
const refreshing = ref(false);

const onLoad = () => {
    if(refreshing.value){
        list.value = []
        refreshing.value = false
    }
    get(props.api, props.param).then((res:any)=>{
        const listData = props.name ? res[props.name] : res
        list.value = listData
        loading.value = false
        emit('getListData')
    })
};

const onRefresh = () => {
    loading.value = true;
    onLoad();
};

const refresh = () => {
    refreshing.value = true
    loading.value = true;
    onLoad();
}

defineExpose({
    refresh
})

onMounted(()=>{
    onRefresh()
})
</script>

<style lang="scss" scoped></style>