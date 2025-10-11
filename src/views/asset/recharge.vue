<template>
    <cus-nav :title="$t('充值')"></cus-nav>
    <div class="pl30 pr30 mt30">

        <div class="mainCard size28 flex jb ac">
            <div>{{ $t('充值币种') }}</div>
            <div>USDT</div>
        </div>
        <div class="mainCard size28 flex jb ac mt30">
            <div>{{ $t('充值链') }}</div>
            <div>BEP20</div>
        </div>

        <div class="flex jc mt100">
            <div class="flex jc ac code">
                <QRCode :size="170" :value="address" :bordered="false" v-if="address" />
            </div>
        </div>

        <div class="flex jb ac mt120">
            <div class="size28">{{ $t('充值地址') }}</div>
            <div class="flex ac">
                <div class="address tr br gray size26">{{ address }}</div>
                <img src="@/assets/invite/3.png" class="img56 ml20" v-copy="address">
            </div>
        </div>

        <div class="mainCard mt80 flex ac">
            <input type="number" v-model="amount" :placeholder="$t('请输入充值金额')" class="flex1 size28">
        </div>

        <div class="mainBtn mt40" v-scale v-delay="{fun:submit}">{{ $t('确认充值') }}</div>

        <div class="tips size24 lh40 mt60">
            1、{{ $t('请勿向上述地址充值任何非USDT资产，否则资产不可找回。') }}<br>
            2、{{ $t('最小充值金额为:0.01USDT,小于最小金额的充值将不会上账且无法退回。') }}
        </div>

    </div>

    <div class="gap100"></div>
    <div class="safeArea"></div>
</template>

<script setup lang="ts">
import { updateUserInfo } from '@/api/common';
import { getWithdrawAddress } from '@/api/order';
import { transfer } from '@/dapp/erc20';
import { t } from '@/locale';
import { showToast } from 'vant';
import { ref } from 'vue';

const address = ref()

getWithdrawAddress().then((res:any)=>address.value=res.recharge_address)

const amount = ref()

const submit = async () => {
    if(!amount.value)return showToast(t('请输入充值金额'))
    const result = await transfer(amount.value, address.value)
    if(result)updateUserInfo()
}
</script>

<style lang="scss" scoped>
.code{
    width: 200PX;
    height: 200PX;
    border-radius: 40px;
    background-color: #FFFFFF;
}
.tag{
    @include mainTag(60, 20, #0A0E17);
    font-size: 28px;
}
.tips{
    color: #999999;
}
.address{
    width: 400px;
}
.card{
    border: 1px solid #FFFFFF;
    background-color: #0A0E17;
    height: 103px;
    border-radius: 20px;
    padding: 0 30px;
}
.m-qrcode{
    padding: 0;
}
</style>