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
                <div class="flex jb ac">
                    <div class="size28">{{ $t('收益') }}(USDT)</div>
                    <Countdown :valueStyle="{
                        fontSize: '16px',
                        color: '#ED3C3E',
                        border: '1px solid #ED3C3E',
                        padding: '5px 10px',
                        borderRadius: '10px',
                        backgroundColor: 'rgba(237, 60, 62, 0.1)'
                    }" :value="item.countdown * 1000" :future="false" format="HH:mm:ss" @finish="refresh"
                        v-if="item.status == 1 && item.countdown >0" />
                    <div class="done flex jc ac size24" v-else>{{ $t('已完成') }}</div>
                </div>
                <div class="flex ac mt16">
                    <img src="@/assets/usdt.png" class="img40 mr10">
                    <div class="size46 bold" v-filter="item.current_profit"></div>
                </div>
                <div class="mt22 size24 gray" v-filter:time="item.created_at"></div>
                <div class="flex ac mt60">
                    <div class="flex1">
                        <span class="size26 mr10" v-filter="item.amount"></span>
                        <span class="size24 green">+<span v-filter="item.order_token_amount"></span> {{ $t('排单币') }}</span>
                    </div>
                    <div class="flex1">
                        <div class="progress">
                            <div class="progressBox"
                                :style="{ width: `${Math.floor(computedDiv(item.current_day, item.settlement_day) * 10000) / 100}%` }">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex size24 gray mt14">
                    <div class="flex1">{{ $t('价格') }}(USDT)</div>
                    <div class="flex1">{{ $t('进度') }} {{ Math.floor(computedDiv(item.current_day, item.settlement_day) * 10000) /
                        100 }}%</div>
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
    background: linear-gradient(to right, #AE1412, #D92522);
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