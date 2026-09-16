<template>
    <div class="gap160"></div>

    <div class="pl30 pr30">
        <div class="top mainTop">
            <div class="titleBox flex ac">
                <img src="@/assets/home/2.png" class="img32 mr10">
                <div class="size32 fontP bold">{{ $t('资产') }}</div>
            </div>
            <div class="size24 bold">{{ $t('资产余额') }}(USDT)</div>
            <div class="flex jb ac mt30">
                <div class="size60 fontP" v-filter="userInfo?.balance"></div>
                <img src="@/assets/usdt.png" class="img52">
            </div>
            <div class="flex mt60">
                <div class="mainBtn flex ac mr30" @click="routerPush('/recharge')">
                    <!-- <img src="@/assets/asset/1.png" class="img40 mr16"> -->
                    <div>{{ $t('充值') }}</div>
                </div>
                <div class="mainBtn flex ac" @click="routerPush('/withdraw')">
                    <!-- <img src="@/assets/asset/2.png" class="img40 mr16"> -->
                    <div>{{ $t('提现') }}</div>
                </div>
            </div>
        </div>

        <div class="flex mt60">
            <div class="mainTag flex ac">
                <img src="@/assets/asset/3.png" class="img38 mr10">
                <div class="size32">{{ $t('资产明细') }}</div>
            </div>
        </div>

        <div class="gap40"></div>
   
        <cus-list ref="list" :api="`/api/users/my/balance_logs/${tabs[current].value}`" name="balance_logs" v-slot="{ listData }">
            <div class="mainCard mb20" v-for="(item,index) in listData" :key="index">
                <div class="flex jb size28 bold">
                    <div>{{ item.content }}</div>
                    <div :class="item.is_inc?'green':'red'">
                        <span>{{ item.is_inc ? '+' : '-' }}</span>
                        <span v-filter="item.amount"></span>
                    </div>
                </div>
                <div class="flex jb size24 gray mt20">
                    <div v-filter:time="item.created_at"></div>
                    <div>{{ tabs[current].name }}</div>
                </div>
            </div>
        </cus-list>

    </div>

</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { routerPush } from '@/router';
import { useDapp } from '@/hooks/useCommon';
import { updateUserInfo } from '@/api/common';

const { userInfo } = useDapp()

updateUserInfo()

const tabs = computed(()=>([
    {name:'USDT',value:1}
]))
const current = ref(0)
</script>

<style lang="scss" scoped>
.top{
    .tag{
        height: 54px;
        line-height: 54px;
        border: 1px solid #FFFFFF33;
        padding: 0 10px;
        border-radius: 4px;
        display: inline-block;
    }
    .topBox{
        height: 80px;
        border-radius: 4px;
        border: 2px solid #FFFFFF80;
        padding: 0 30px;
    }
}
.card{
    width: 220px;
    height: 284px;
    background-color: #0B0F19;
    border-radius: 20px;
    padding: 30px 20px;
    position: relative;
    .bg{
        width: 220px;
        height: 194px;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}
.btn{
    width: 220px;
    height: 80px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    border: 1px solid $main-color;
}
.tabs{
    width: 220px;
    .line{
        width: 220px;
        height: 12px;
    }
    .focus{
        color: #485260;
    }
}
.pop{
    width: 100vw;
    padding: 40px 30px;
    background: linear-gradient(#192132, #000000);
    border-radius: 40px 40px 0 0;
    .inpbox{
        height: 88px;
        border-radius: 20px;
        border: 1px solid $main-color;
        padding: 0 30px;
        background-color: #0C1B2D;
    }
}
</style>