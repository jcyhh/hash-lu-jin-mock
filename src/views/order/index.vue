<template>
    <div class="flex ac size28 bold pl30 head animate__animated animate__fadeInRight">
        <div class="tabs mr38 flex ac" :class="current==0?'act':'def'" @click="tabsClick(0)">
            <img src="@/assets/node/1.png" class="img32" v-if="current==0">
            <img src="@/assets/node/3.png" class="img32" v-else>
            <div class="size32 ml10">{{ $t('进行中') }}</div>
        </div>
        <div class="tabs flex ac" :class="current==1?'act':'def'" @click="tabsClick(1)">
            <img src="@/assets/node/4.png" class="img32" v-if="current==1">
            <img src="@/assets/node/2.png" class="img32" v-else>
            <div class="size32 ml10">{{ $t('已完成') }}</div>
        </div>
    </div>

    <div class="gap200"></div>
    <div class="gap45"></div>

    <cus-list ref="list" api="/api/order" name="orders" :param="{ status: current + 1 }" v-slot="{ listData }">
        <div class="pl30 pr30">
            <div class="card" v-for="item in listData" :key="item.id">
                <div class="flex jb">
                    <div class="size28">{{ $t('已释放') }}(USDT)</div>
                    <div>
                        <div class="progress">
                            <div class="progressBox"
                                :style="{ width: `${Math.floor(computedDiv(item.release_day, item.days) * 10000) / 100}%` }">
                            </div>
                        </div>
                        <div class="tr gray size24 mt24">{{ item.release_day }}/{{ item.days }}{{ $t('天') }}</div>
                    </div>
                    
                </div>
                <div class="flex ac mt16">
                    <img src="@/assets/usdt.png" class="img40 mr10">
                    <div class="size46 bold" v-filter="item.release_amount"></div>
                </div>
                <div class="mt22 size24 gray">{{ item.created_at }}</div>
                <div class="flex ac mt60">
                    <div class="flex1">
                        <span class="size26 mr10" v-filter="item.amount"></span>
                    </div>
                    <div class="flex1">
                        <span class="size26 mr10" v-filter="item.day_amount"></span>
                    </div>
                </div>
                <div class="flex size24 gray mt14">
                    <div class="flex1">{{ $t('购买金额') }}(USDT)</div>
                    <div class="flex1">{{ $t('每日释放') }}(USDT)</div>
                </div>
            </div>
        </div>
    </cus-list>

</template>

<script setup lang="ts">
import { computedDiv } from '@/utils'
import { ref } from 'vue'

const current = ref(0)

const list = ref()

const refresh = () => list.value?.refresh()

const tabsClick = (index: number) => {
    if (current.value == index) return
    current.value = index
    refresh()
}
</script>

<style lang="scss" scoped>
.head {
    padding: 140px 30px 40px 30px;
    width: 100vw;
    height: 240px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: #000000;
}

.tabs {
    height: 68px;
    padding: 0 30px;
    border-radius: 4px;
}
.act{
    background: linear-gradient(to right, #1D6130, #068135);
}
.def{
    border: 1px solid #FFFFFF80;
    background-color: #FFFFFF0F;
}

.card {
    margin-bottom: 20px;
    padding: 40px;
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    position: relative;

    .timeTag {
        height: 54px;
        border-radius: 20px;
        padding: 0 20px;
        background-color: rgba($red, $alpha: 0.1);
        border: 1px solid $red;
        color: $red;
    }

    .done {
        height: 54px;
        border-radius: 20px;
        padding: 0 20px;
        background-color: rgba($color: #000000, $alpha: 0.1);
        border: 1px solid #999999;
        color: #999999;
    }

    .progress {
        width: 200px;
        height: 12px;
        border-radius: 6px;
        background-color: #202020;
        overflow: hidden;

        .progressBox {
            height: 12px;
            border-radius: 6px;
            background-color: $main-color;
        }
    }
}
</style>