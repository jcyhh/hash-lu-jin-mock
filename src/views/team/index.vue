<template>
    <div class="gap180"></div>

    <div class="pl30 pr30">

        <div class="top mainTop">
            <div class="titleBox flex ac">
                <img src="@/assets/home/2.png" class="img32 mr10">
                <div class="size32 fontP bold">{{ $t('社区') }}</div>
            </div>
            <img :src="userInfo?.level?.icon" class="level">
            <div class="tag size24 linearTxt size24 bold">{{ $t('新增业绩') }}</div>
            <div class="size46 fontP mt14">
                <span v-filter="userInfo?.day_recharge_amount"></span>
                USDT
            </div>
            <div class="flex mt48">
                <div class="flex1">
                    <div class="size32 bold" v-filter="userInfo?.team_count"></div>
                    <div class="size24 gray mt10">{{ $t('总人数') }}</div>
                </div>
                <div class="flex1">
                    <div class="size32 bold" v-filter="userInfo?.referral_count"></div>
                    <div class="size24 gray mt10">{{ $t('分享人数') }}</div>
                </div>
                <div class="flex1">
                    <div class="size32 bold">{{ userInfo?.level?.name || '--' }}</div>
                    <div class="size24 gray mt10">{{ $t('当前等级') }}</div>
                </div>
            </div>
            <div class="cell mt50 flex jb ac size26">
                <div>{{ $t('团队撸金') }}</div>
                <div class="bold">
                    <span v-filter="userInfo?.team_kpi"></span>
                    USDT
                </div>
            </div>
            <div class="cell mt30 flex jb ac size26">
                <div>{{ $t('小区撸金') }}</div>
                <div class="bold">
                    <span v-filter="userInfo?.kpi"></span>
                    USDT
                </div>
            </div>
            <div class="cell mt30 flex jb ac size26">
                <div>{{ $t('小区订单数量') }}</div>
                <div class="bold">{{ userInfo?.xq_order_num || 0 }}</div>
            </div>
        </div>

        <div class="flex mt60">
            <div class="mainTag flex ac">
                <img src="@/assets/team/1.png" class="img38 mr10">
                <div class="size32">{{ $t('社区列表') }}</div>
            </div>
        </div>

        <div class="gap40"></div>
   
        <List type="team" v-slot="{ listData }">
            <div class="mainCard mb20" v-for="(item,index) in listData" :key="index">
                <div class="flex jb size28 bold">
                    <div>{{ item.nickname }}</div>
                    <div v-filter="item.total_team_order_num"></div>
                </div>
                <div class="flex jb size24 gray mt20">
                    <div v-filter:time="item.created_at"></div>
                    <div>{{ $t('团队撸金') }}</div>
                </div>
            </div>
        </List>

    </div>
</template>

<script setup lang="ts">
import { updateUserInfo } from '@/api/common';
import { useDapp } from '@/hooks/useCommon';
import List from '@/modules/List/index.vue'

const { userInfo } = useDapp()

updateUserInfo()
</script>

<style lang="scss" scoped>
.bg{
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
}
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

.cell{
    background-color: #FFFFFF1A;
    height: 88px;
    padding: 0 30px;
}

.top{
    .tag{
        height: 54px;
        line-height: 54px;
        padding: 0 10px;
        border: 1px solid #FFFFFF33;
        display: inline-block;
    }
    .level{
        width: 160px;
        height: 160px;
        position: absolute;
        top: -20px;
        right: 30px;
        z-index: 2;
    }
}
.card{
    width: 335px;
    height: 160px;
    padding: 0 30px;
    background-size: 100% 100%;
}
.dayCard{
    height: 122px;
    background-image: url("@/assets/team/10.png");
    background-size: 100% 100%;
    padding: 0 30px;
}
.card1{
    background-image: url("@/assets/team/5.png");
}
.card2{
    background-image: url("@/assets/team/6.png");
}
.card3{
    background-image: url("@/assets/team/7.png");
}
.card4{
    background-image: url("@/assets/team/8.png");
}
</style>