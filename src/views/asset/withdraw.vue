<template>
    <cus-nav :title="$t('提币')"></cus-nav>
    <div class="pl30 pr30 mt30">

        <div class="mainCard size28 flex jb ac">
            <div>{{ $t('充值币种') }}</div>
            <div>USDT</div>
        </div>
        <div class="mainCard size28 flex jb ac mt30">
            <div>{{ $t('充值链') }}</div>
            <div>BEP20</div>
        </div>
        <div class="mainCard size28 flex jb ac mt30">
            <div>{{ $t('手续费') }}</div>
            <div>{{ fee }}%</div>
        </div>

        <div class="flex jb ac mt40">
            <div class="size28">{{ $t('提币数量') }}</div>
            <div class="size24 gray">{{ $t('可用') }} : <span v-filter="userInfo?.balance"></span> USDT</div>
        </div>
        <div class="mainCard mt30 flex ac">
            <input type="number" v-model="amount" :placeholder="$t('请输入提币金额')" class="flex1 size28">
            <div class="size24 bold mainColor ml30" @click="amount=userInfo?.balance">{{ $t('全部') }}</div>
        </div>
        
        <div class="mainBtn mt60" v-scale v-delay="{fun:submit}">{{ $t('提币') }}</div>

    </div>

    <van-popup v-model:show="show" style="background-color: transparent;">
        <cus-pop :title="$t('提示')" @close="show=false">
            <div class="size26 lh45" style="opacity: 0.8;">{{ tips }}</div>
        </cus-pop>
    </van-popup>
</template>

<script setup lang="ts">
// import { updateUserInfo } from '@/api/common';
import { getWithdrawFee } from '@/api/order';
// import { claim } from '@/dapp/biz';
import { useDapp } from '@/hooks/useCommon';
import { t } from '@/locale';
import { showToast } from 'vant';
import { ref } from 'vue';

const { userInfo } = useDapp()

const amount = ref()

const fee = ref()

const show = ref(false)

getWithdrawFee().then((res:any)=>fee.value=res.fee)

const tips = ref()

const submit = async () => {
    if(!amount.value)return showToast(t('请输入提币金额'))
//     await claim(amount.value)
//     updateUserInfo()
//     amount.value = ''
}

// const openpop = () => {
    // const now = new Date();
    // const currentHour = now.getHours();
    // const isTime = currentHour >= 14 && currentHour < 19

    // if(isTime){
    //     if(!amount.value || amount.value < 50){
    //         tips.value = t('提现金额50U起提')
    //         show.value = true
    //     }else{
    //         submit()
    //     }
    // }else{
    //     tips.value = t('现在是非提现时间，提现时间每天14:00----18:00，') + t('提现金额50U起提')
    //     show.value = true
    // }
// }
</script>

<style lang="scss" scoped>
.card{
    border: 1px solid #FFFFFF;
    background-color: #0A0E17;
    height: 103px;
    border-radius: 20px;
    padding: 0 30px;
}
</style>