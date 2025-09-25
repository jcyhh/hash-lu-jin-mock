<template>
    <img src="@/assets/home/bg.png" class="bg">
    <div class="gap100"></div>
    <div class="banner">
        <Plasma></Plasma>
    </div>
    <div class="rel">
        <div class="top">
            <div class="flex jc">
                <div class="title size40 bold">波场链哈希撸金</div>
            </div>
            <div class="flex jc ac mt30">
                <div class="line"></div>
                <div class="tc ml30 mr30 size26">加入波场哈希撸金 邀您共同创富</div>
                <div class="line"></div>
            </div>
            <div class="mt50 flex jc">
                <div class="size180 lh200 tc bold name fontS">哈希<br>撸金</div>
            </div>
        </div>

        <div class="homeNotice flex jb ac mb60" @click="routerPush('/notice')">
            <img src="@/assets/home/0.png" class="img36">
            <Notice></Notice>
            <img src="@/assets/home/1.png" class="img20">
        </div>

        <div class="pl30 pr30 mt80">
            <div class="flex jb ac">
                <div class="tag flex ac">
                    <img src="@/assets/home/2.png" class="img38 mr10">
                    <div class="size32 fontP bold">投资</div>
                </div>
                <div class="size24">查看订单</div>
            </div>

            <div class="card mt60">
                <div class="gap30"></div>
                <div class="flex jc">
                    <div class="price size28">投资价格</div>
                </div>
                <div class="tc size46 bold mt30">1,000 USDT</div>
                <div class="mainBtn mt60" @click="show=true">立即投资</div>
            </div>

            <div class="flex jb ac mt80">
                <div class="tag flex ac">
                    <img src="@/assets/home/5.png" class="img38 mr10">
                    <div class="size32 fontP bold">资产</div>
                </div>
                <div class="size24">全部</div>
            </div>


            <div class="mainCard flex jb ac mt60">
                <div class="flex ac">
                    <img src="@/assets/usdt.png" class="img40 mr10">
                    <div>USDT</div>
                </div>
                <div class="size28 bold" v-filter="userInfo?.balance"></div>
            </div>
            <div class="mainLine mt60"></div>
            <div class="flex jb ac mt60" v-on-show="'animate__slideInUp'">
                <div class="bottag">
                    <img src="@/assets/layout/4.png" class="img48">
                </div>
                <div class="bottag">
                    <img src="@/assets/layout/5.png" class="img48">
                </div>
                <div class="bottag">
                    <img src="@/assets/layout/6.png" class="img48">
                </div>
            </div>
        </div>
    </div>

    <van-popup v-model:show="show" style="background-color: transparent;">
        <cus-pop title="投资" @close="show=false">
            <div>
                <span class="size24 mr22">单价</span>
                <span class="size28 bold mainColor">1000 USDT</span>
            </div>
            <div class="flex jb ac mt60">
                <div class="size24">投资单数</div>
                <div class="size24 bold">100 USDT</div>
            </div>
            <div class="inp flex ac jb">
                <img src="@/assets/home/6.png" class="img48">
                <input type="number" v-model="count" class="flex1 size40 fontP tc">
                <img src="@/assets/home/7.png" class="img48">
            </div>
            <div class="mt30">
                <span class="size24 mr10 gray">支付总额</span>
                <span class="size24 bold">0 USDT</span>
            </div>
        </cus-pop>
    </van-popup>

</template>

<script setup lang="ts">
import Notice from '@/modules/notice/components/index.vue'
import { routerPush } from '@/router';
import { ref } from 'vue';
import { getConfig, updateUserInfo } from '@/api/common';
import { getSign } from '@/dapp';
import { SignType } from '@/config/dapp';
import { createOrder } from '@/api/order';
import { showSuccessToast } from 'vant';
import { t } from '@/locale';
import { useDapp } from '@/hooks/useCommon';
import Plasma from '@/components/VueBits/Plasma.vue';

const { userInfo } = useDapp()

const show = ref(false)
const count = ref(1)

const price = ref()
getConfig().then((res: any) => price.value = res.order_price)

const submit = async () => {
    const signInfo = await getSign(SignType.Order)
    if (!signInfo) return
    createOrder(signInfo).then(() => {
        showSuccessToast(t('排单成功'))
        updateUserInfo()
    })
}
</script>

<style lang="scss" scoped>
.inp{
    height: 88px;
    border-radius: 4px;
    border: 1px solid #FFFFFF;
    margin-top: 24px;
    padding: 0 20px;
}
.bg {
    width: 100vw;
    height: auto;
    position: absolute;
}

.banner {
    width: 100vw;
    height: 900px;
    position: absolute;
    top: 0;
    left: 0;
}

.top {
    min-height: 800px;
    padding: 60px 30px 0 30px;
    .title{
        border: 3px solid #FFFFFF;
        padding: 0 30px;
        height: 100px;
        line-height: 100px;
    }
    .line{
        width: 20px;
        height: 1px;
        background-color: #D9D9D9;
    }
    .name{
        background: linear-gradient(135deg, #D5A89E, #FFFFFF);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
    }
}

.homeNotice {
    height: 88px;
    padding: 0 30px;
    border: 1px solid #FFFFFF;
}

.tag{
    background-color: #FFFFFF0F;
    border: 1px solid #FFFFFF80;
    height: 68px;
    padding: 0 30px;
}

.card {
    padding: 30px 30px 60px 30px;
    border: 1px solid;
    border-image: linear-gradient(-15deg, #D92522, #FFFFFF, #AE1412) 1;

    .price{
        height: 60px;
        border: 1px solid #FFFFFF33;
        padding: 0 10px;
        line-height: 60px;
    }
}

.bottag{
    width: 220px;
    height: 60px;
    background-color: #FFFFFF1A;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>