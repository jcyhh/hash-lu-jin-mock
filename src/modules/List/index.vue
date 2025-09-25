<template>
    <cus-list :api="apiInfo.api" :name="apiInfo.name" v-slot="{ listData }">
        <slot :listData="listData"></slot>
    </cus-list>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import api from '.'

interface Props { type: 'team' | 'balance' | 'pledge' }

const props = defineProps<Props>()

const apiInfo = computed(()=>api[props.type])
</script>

<style lang="scss" scoped>

</style>