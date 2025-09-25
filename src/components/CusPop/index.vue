<template>
    <div class="mainPop">
        <div class="flex jb ac mb35">
            <div class="size40 bold">{{ props.title }}</div>
            <img src="@/components/CusPop/close.png" class="img64" @click="closepop">
        </div>
        <slot></slot>
        <div class="flex jb mt40 size26">
            <div class="popbtn cancel flex1 mr20" @click="closepop">{{ $t('取消') }}</div>
            <div class="popbtn confirm flex1" v-scale v-delay="{fun:submit}">{{ $t('确认') }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
/**
 * 弹窗
 */
const props = defineProps(['title'])
const emits = defineEmits(['close', 'confirm'])

const closepop = () => emits('close')
const submit = () => emits('confirm')
</script>

<style lang="scss" scoped>

</style>