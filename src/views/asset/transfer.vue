<template>
    <cus-nav :title="$t('转账')"></cus-nav>
    <div class="pl30 pr30 mt30">

        <div class="mainCard size28">
            <div class="flex jb" @click="openPicker">
                <div>{{ $t('转账资产') }}</div>
                <div class="flex ac">
                    <div class="mr10">{{ tabs[current].name }}</div>
                    <van-icon name="arrow-down" />
                </div>
                
            </div>
            <div class="flex jb mt30">
                <div>{{ $t('可用余额') }}</div>
                <div v-filter="current==0? userInfo?.order_token_balance: userInfo?.balance"></div>
            </div>
        </div>

        <div class="size28 mt40">{{ $t('转账地址') }}</div>

        <div class="card mt30 flex ac">
            <input type="text" v-model="address" :placeholder="$t('请输入收账方的钱包地址')" class="flex1 size28">
        </div>

        <div class="size28 mt40">{{ $t('转账数量') }}</div>

        <div class="card mt30 flex ac">
            <input type="number" v-model="amount" :placeholder="$t('请输入转出金额')" class="flex1 size28">
            <div class="size24 bold mainColor ml30" @click="amount=(current==0? userInfo?.order_token_balance: userInfo?.balance)">{{ $t('全部') }}</div>
        </div>
        
        <div class="mainBtn mt60" v-scale v-delay="{fun:submit}">{{ $t('确认') }}</div>

    </div>

    <CusPicker ref="picker" :title="$t('转账资产')" name="name" :list="tabs" @change="pickerChange"></CusPicker>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDapp } from '@/hooks/useCommon';
import { showSuccessToast, showToast } from 'vant';
import { transfer, updateUserInfo } from '@/api/common';
import { getSign } from '@/dapp';
import { SignType } from '@/config/dapp';
import { t } from '@/locale';

const { userInfo } = useDapp()

const address = ref()
const amount = ref()

const tabs = [
    {name:t('排单币'),value:'order_token_balance'},
    {name:'USDT',value:'balance'}
]

const current = ref(0)

const pickerChange = (e:any) => {
    current.value = e
    amount.value = ''
}

const picker = ref()
const openPicker = () => {
    picker.value.open()
}

const submit = async () => {
    if(!address.value)return showToast(t('请输入收账方的钱包地址'))
    if(!amount.value)return showToast(t('请输入转出金额'))
    const signInfo = await getSign(SignType.Transfer)
    if(!signInfo)return
    transfer({
        address: address.value,
        amount: amount.value,
        ccy: tabs[current.value].value,
        ...signInfo
    }).then(()=>{
        amount.value = ''
        showSuccessToast(t('转账成功'))
        updateUserInfo()
    })
}
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