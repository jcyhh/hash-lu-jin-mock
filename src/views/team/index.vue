<template>
    <div class="gap180"></div>

    <div class="pl30 pr30">

        <div class="top">
            <img :src="userInfo?.level?.icon" class="level">
            <div class="tag size24">新增业绩</div>
            <div class="size46 fontP mainColor mt20">
                <span v-filter="userInfo?.day_recharge_amount"></span>
                USDT
            </div>
            <div class="flex mt60">
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
                    <div class="size24 gray mt10">当前等级</div>
                </div>
            </div>
            <div class="mainCard mt60 flex jb ac size26">
                <div>团队撸金</div>
                <div class="bold">
                    <span>100</span>
                    USDT
                </div>
            </div>
            <div class="mainCard mt30 flex jb ac size26">
                <div>小区撸金</div>
                <div class="bold">
                    <span>100</span>
                    USDT
                </div>
            </div>
        </div>

        <div class="flex mt60">
            <div class="mainTag flex ac">
                <img src="@/assets/team/1.png" class="img38 mr10">
                <div class="size32">社区列表</div>
            </div>
        </div>

        <div class="gap40"></div>
   
        <List type="team" v-slot="{ listData }">
            <div class="mainCard mb20" v-for="(item,index) in listData" :key="index">
                <div class="flex jb size28 bold">
                    <div>{{ item.nickname }}</div>
                    <div class="mainColor" v-filter="item.total_team_order_num"></div>
                </div>
                <div class="flex jb size24 gray mt20">
                    <div v-filter:time="item.created_at"></div>
                    <div>团队撸金</div>
                </div>
            </div>
        </List>

    </div>
</template>

<script setup lang="ts">
import { useDapp } from '@/hooks/useCommon';
import List from '@/modules/List/index.vue'

const { userInfo } = useDapp()
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

.top{
    background: linear-gradient(-45deg, #3C0000, #000000, #3C0000);
    position: relative;
    border-radius: 4px;
    padding: 40px 30px 60px 30px;
    &::before{
        content: "";
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        z-index: -1;
        background: linear-gradient(-15deg, #D92522, #FFFFFF, #AE1412);
        border-radius: 4px;
    }
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
        z-index: 1;
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