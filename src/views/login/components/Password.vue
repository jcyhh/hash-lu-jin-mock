<template>
    <div class="auth-cell">
        <input :id="id" :type="visible ? 'text' : 'password'" v-model="password"
            :placeholder="placeholder" :aria-label="placeholder" :autocomplete="autocomplete" required>
        <button type="button" class="auth-eye" :aria-label="visible ? '隐藏' + placeholder : '显示' + placeholder"
            :aria-pressed="visible" @click="visible = !visible">
            <img :src="visible ? eyeOpen : eyeClose" alt="">
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import eyeOpen from '@/assets/login/eyeOpen.png'
import eyeClose from '@/assets/login/eyeClose.png'

defineProps<{ id: string; placeholder: string; autocomplete: string }>()
const password = defineModel<string>({ default: '' })
const visible = ref(false)
</script>

<style scoped>
.auth-eye {
    display: grid;
    place-items: center;
    width: 36PX;
    height: 40PX;
    margin-right: -10PX;
    background: none;
    border: 0;
    cursor: pointer;
}
.auth-eye img { width: 15PX; height: 15PX; }
</style>
