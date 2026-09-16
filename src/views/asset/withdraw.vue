<template>
    <cus-nav :title="$t('提币')"></cus-nav>
    <div class="pl30 pr30 mt30">

        <div class="mainCard size28 flex jb ac">
            <div>{{ $t('充值币种') }}</div>
            <div>USDT</div>
        </div>
        <div class="mainCard size28 flex jb ac mt30">
            <div>{{ $t('充值链') }}</div>
            <div>TRC20</div>
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
        
        <div class="size28 mt40">{{ $t('到账地址') }}</div>
        <div class="mainCard mt30 flex ac">
            <input type="text" v-model="address" :placeholder="$t('请输入到账地址')" :aria-label="$t('到账地址')" autocomplete="off" autocapitalize="none" spellcheck="false" class="flex1 size28">
        </div>

        <button type="button" class="mainBtn mt60 submit" :disabled="submitting" @click="submit">{{ $t(submitting ? '提交中...' : '提币') }}</button>

    </div>

    <van-popup v-model:show="show" style="background-color: transparent;">
        <cus-pop :title="$t('提示')" @close="show=false">
            <div class="size26 lh45" style="opacity: 0.8;">{{ tips }}</div>
        </cus-pop>
    </van-popup>
</template>

<script setup lang="ts">
import { updateUserInfo, withdraw } from '@/api/common';
import { getWithdrawFee } from '@/api/order';
// import { claim } from '@/dapp/biz';
import { useDapp } from '@/hooks/useCommon';
import { t } from '@/locale';
import { showToast, showSuccessToast } from 'vant';
import { ref } from 'vue';

const { userInfo } = useDapp()

const amount = ref<string | number>('')
const address = ref('')
const submitting = ref(false)

const fee = ref()

const show = ref(false)

getWithdrawFee().then((res:any)=>fee.value=res.fee).catch(() => {})
updateUserInfo()

const tips = ref()

const submit = async () => {
    if (submitting.value) return
    if (amount.value == null || String(amount.value).trim() === '') return showToast(t('请输入提币金额'))
    if (!address.value.trim()) return showToast(t('请输入到账地址'))
    submitting.value = true
    try {
        await withdraw({ amount: String(amount.value), address: address.value.trim(), ccy: 'balance' })
        amount.value = ''
        address.value = ''
        showSuccessToast(t('提交成功，等待审核'))
        updateUserInfo()
    } catch {
        // 公共请求层展示后端错误，保留表单内容以便重试。
    } finally {
        submitting.value = false
    }
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
.submit { border: 0; color: #FFFFFF; cursor: pointer; }
.submit:disabled { opacity: 0.6; cursor: wait; }
.card{
    border: 1px solid #FFFFFF;
    background-color: #0A0E17;
    height: 103px;
    border-radius: 20px;
    padding: 0 30px;
}
</style>
