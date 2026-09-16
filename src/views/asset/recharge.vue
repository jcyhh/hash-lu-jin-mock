<template>
    <cus-nav :title="$t('充值')"></cus-nav>
    <div class="pl30 pr30 mt30">

        <div class="mainCard size28 flex jb ac">
            <div>{{ $t('充值币种') }}</div>
            <div>USDT</div>
        </div>
        <div class="mainCard size28 flex jb ac mt30">
            <div>{{ $t('充值链') }}</div>
            <div>TRC20</div>
        </div>

        <div class="flex jc mt100">
            <div class="flex jc ac code">
                <QRCode :size="170" :value="address || '--'" :bordered="false" />
            </div>
        </div>

        <div class="flex jb ac mt120">
            <div class="size28">{{ $t('充值地址') }}</div>
            <div class="flex ac">
                <div class="address tr br gray size26">{{ address || '--' }}</div>
                <img src="@/assets/invite/3.png" class="img56 ml20" v-copy="address">
            </div>
        </div>

        <div class="mainCard mt80 flex ac">
            <input type="number" v-model="amount" :placeholder="$t('请输入充值金额')" :aria-label="$t('充值金额')" class="flex1 size28">
        </div>

        <div class="mainCard mt30 flex ac">
            <input type="text" v-model="transactionHash" :placeholder="$t('请输入交易哈希值')" :aria-label="$t('交易哈希值')" autocomplete="off" autocapitalize="none" spellcheck="false" class="flex1 size28">
        </div>

        <button class="mainBtn mt40 submit" type="button" :disabled="submitting" @click="submit">{{ $t(submitting ? '提交中...' : '提交') }}</button>

        <div class="tips size24 lh40 mt60">
            1、{{ $t('请勿向上述地址充值任何非USDT资产，否则资产不可找回。') }}<br>
            2、{{ $t('转账完成后，请提交充值金额和交易哈希，审核通过后到账。') }}
        </div>

    </div>

    <div class="gap100"></div>
    <div class="safeArea"></div>
</template>

<script setup lang="ts">
import { getWithdrawAddress } from '@/api/order';
import { submitRecharge } from '@/api/recharge';
import { t } from '@/locale';
import { showToast, showSuccessToast } from 'vant';
import { ref } from 'vue';

const address = ref('')
getWithdrawAddress().then((res:any) => address.value = res.recharge_address || '').catch(() => {})

const amount = ref<string | number>('')
const transactionHash = ref('')
const submitting = ref(false)

const submit = async () => {
    if (submitting.value) return
    if (amount.value === '') return showToast(t('请输入充值金额'))
    const txId = transactionHash.value.trim()
    if (!txId) return showToast(t('请输入交易哈希值'))
    submitting.value = true
    try {
        await submitRecharge({ amount: String(amount.value), tx_id: txId })
        amount.value = ''
        transactionHash.value = ''
        showSuccessToast(t('提交成功，等待审核'))
    } catch {
        // 请求层展示后端错误，保留输入以便重试。
    } finally {
        submitting.value = false
    }
}

</script>

<style lang="scss" scoped>
.submit { border: 0; color: #FFFFFF; cursor: pointer; }
.submit:disabled { opacity: 0.6; cursor: wait; }
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
