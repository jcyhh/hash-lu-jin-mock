<script setup lang="ts">
import { setRef } from '@/config/storage'
const url = new URL(window.location.href)
const ref = url.searchParams.get('ref')
if (ref) setRef(ref)
</script>

<template>
    <RouterView v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
    </RouterView>
</template>

<style scoped></style>
