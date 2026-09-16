<template>
    <div class="bg">
        <Plasma></Plasma>
    </div>
    <div class="gap180"></div>
    <div class="pl30 pr30 rel">

        <div class="flex jc">
            <div class="title size60">無界</div>
        </div>
        <div class="flex jc ac mt30">
            <div class="line"></div>
            <div class="tc ml30 mr30 size26">Boundless</div>
            <div class="line"></div>
        </div>

        <div class="tc mt60 bold size60">{{ $t('开启你的探索之旅') }}</div>

        <div class="flex jc mt30">
            <div class="tc ml30 mr30 size26 topTag">無界Boundless{{ $t('邀您共同创富') }}</div>
        </div>

        <div class="mainTop mt154">
            <div class="titleBox flex ac">
                <div class="size32 fontP bold">{{ $t('分享并邀请好友') }}</div>
            </div>
            <div class="flex jb ac">
                <div class="size46 bold">邀请码</div>
                <div class="copy flex ac" v-copy="userInfo?.referral_code">
                    <img src="@/assets/invite/2.png" class="img24 mr10">
                    <div class="size24 bold linearTxt">{{ $t('复制') }}</div>
                </div>
            </div>
            <div class="linearTxt size80 fontP">{{ userInfo?.referral_code || '--' }}</div>
            <div class="bold fontP size28 mt50">外匯黃金</div>
            <div class="bold fontP size28 mt20">企業數字化升級改造</div>
        </div>

        <div class="tc mt82 size28 bold">{{ $t('邀请链接') }}</div>

        <div class="borderLine mt40"></div>

        <div class="flex jb ac mt40 pl30 pr30">
            <div class="size26 br lh40">{{ inviteUrl }}</div>
            <img src="@/assets/invite/3.png" class="img56 ml36 flex0" v-copy="inviteUrl">
        </div>

        <div class="borderLine mt40"></div>
    </div>
    <div class="gap60"></div>
</template>

<script setup lang="ts">
import { useDapp } from '@/hooks/useCommon';
import { computed } from 'vue';
import Plasma from '@/components/VueBits/Plasma.vue';

const { userInfo } = useDapp()

const inviteUrl = computed(()=>`${window.origin}?ref=${userInfo.value?.referral_code}`)
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
    letter-spacing: 10px;
}
.line{
    width: 20px;
    height: 1px;
    background-color: #D9D9D9;
}
.pic1{
    width: 100%;
    height: 46px;
}
.desc{
    border: 1px solid #FFFFFF33;
    border-radius: 4px;
    padding: 20px;
}
.topTag{
    display: inline-block;
    padding: 10px 30px;
    border-radius: 26px;
    background: linear-gradient(to right, #00D8FF, #D400FF);
    color: #FFFFFF;
}
.copy{
    background-color: #FFFFFF0F;
    border-radius: 2px;
    border: 1px solid #FFFFFF80;
    height: 56px;
    padding: 0 30px;
}
.borderLine{
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, #FFFFFF00, #FFFFFF, #FFFFFF00);
}


.invite{
    width: 100%;
    height: calc(100vh - 100px);
    background-image: url("@/assets/invite/1.png");
    background-size: cover;
    padding-top: 150px;
    .line{
        width: 380px;
        height: 10px;
        background: linear-gradient(to right, $main-color 20%, rgba($color: #4FACFE00, $alpha: 0));
    }
}
.bot{
    width: 100vw;
    height: 414px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: linear-gradient(#00131C, #000000);
    padding: 70px 40px 60px 40px;
    .line{
        width: 100vw;
        height: 4px;
        background: linear-gradient(to right, rgba($color: #FFFFFF, $alpha: 0), rgba($color: #FFFFFF, $alpha: 1), rgba($color: #FFFFFF, $alpha: 0));
        position: absolute;
        top: -4px;
        left: 0;
        z-index: 1;
    }
    .tabBox{
        width: 100vw;
        height: 60px;
        position: absolute;
        top: -32px;
        left: 0;
        z-index: 2;
        .tag{
            min-width: 232px;
            height: 60px;
            border-radius: 30px;
            border: 1px solid #FFFFFF;
            background: linear-gradient(to right, #00A9FF, #4FACFE,#00A9FF );
            font-size: 28px;
            color: #000000;
            font-weight: bold;
        }
    }
    
}
</style>