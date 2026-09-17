<template>
    <div class="head flex jb ac">
        <img src="@/assets/logo.png" class="logo" @click="onLogoClick">
        <div class="flex ac">
            <!-- <img src="@/assets/layout/lang.png" class="img52" @click="openPicker"> -->
            <!-- 演示项目：隐藏钱包地址和连接钱包入口。
            <div class="connect size24" v-if="address" v-filter:address="address"></div>
            <div class="connect ml14 size24" v-else>{{ $t('链接钱包') }}</div>
            -->
            <div class="ml20" @click="show=!show">
                <img src="@/assets/layout/close.png" class="img48 animate__animated animate__rotateIn" v-if="show">
                <img src="@/assets/layout/open.png" class="img48 " v-else>
            </div>
        </div>
    </div>

    <RouterView></RouterView>

    <VanPopup style="background: transparent;" v-model:show="show" position="right">
        <div class="pop flex col jb">
            <div class="menu pt60">
                <div class="item mb30 flex jb ac" :class="$route.path == item.redirect ? 'act' : ''" v-for="item in menus" :key="item.path" @click="jump(item.redirect)">
                    <div class="flex ac">
                        <img :src="$route.path == item.redirect ? item.meta.actIcon : item.meta.icon" class="img34 mr20">
                        <div class="size28">{{ $t(item.meta.title) }}</div>
                    </div>
                    <van-icon name="arrow" />
                </div>
                <div class="item mb30 flex jb ac" @click="openLink">
                    <div class="flex ac">
                        <img src="@/assets/layout/kefu.png" class="img34 mr20">
                        <div class="size28">客服</div>
                    </div>
                    <van-icon name="arrow" />
                </div>
            </div>
        </div>
    </VanPopup>

    <!-- <CusPicker ref="picker" :title="$t('切换语言')" name="name" :list="langs" @change="pickerChange"></CusPicker> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// import CusPicker from '@/components/CusPicker/index.vue'

// import { langs } from '@/locale'
import { routerReplace } from '@/router';

import { t } from '@/locale'
import { showToast } from 'vant';
// import { useAppStore } from '@/store';

import menus from '@/router/modules/menu'
import { homePath } from '@/config/path';
import { useDapp } from '@/hooks/useCommon';

// const appStore = useAppStore()

const { userInfo } = useDapp()

const route = useRoute();

const show = ref(false)

const jump = (path: string) => {
    if(!path)return showToast(t('待开放'))
    show.value = false
    setTimeout(() => {
        if (route.path == path) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            routerReplace(path)
        }
    }, 300);
}

const openLink = () => location.href = `https://chat.happyboundless.com/chat/index?noCanClose=1&token=83674770d06a504965912370eaf73a8f&nickName=${encodeURIComponent(userInfo.value?.nickname || '')}`

const onLogoClick = () => {
    if (show.value) {
        jump(homePath)
    } else {
        if (route.path == homePath) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            routerReplace(homePath)
        }
    }
}

// const picker = ref()
// const openPicker = () => {
//     picker.value.open()
// }
// const pickerChange = (index: number) => appStore.setLocale(langs[index].lang)

</script>

<style lang="scss" scoped>
.head {
    width: 100vw;
    height: 100px;
    background-color: #00000080;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000000;
    padding: 0 30px;

    .logo {
        width: 116px;
        height: 48px;
    }

    .lang{
        height: 56px;
        border-radius: 28px;
        background-color: #202020;
        padding: 0 16px;
    }

    .connect{
        height: 56px;
        border-radius: 10px;
        background: linear-gradient(to right, #00D8FF, #D400FF);
        color: #FFFFFF;
        padding: 0 16px;
        line-height: 56px;
    }
}

.pop {
    width: 520px;
    height: 100vh;
    padding-top: 100px;
    .menu{
        height: calc(100vh - 100px);
        background-color: #1A1A1A;
        color: #6D6D6D;
    }

    .item{
        height: 76px;
        padding: 0 30px;
    }
    .act{
        color: $main-color;
    }
}
</style>
