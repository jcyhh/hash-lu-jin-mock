<template>
    <main class="auth-page">
        <img src="@/assets/login/bg.webp" class="auth-bg" alt="">
        <section class="auth-content" aria-labelledby="auth-title">
            <h1 id="auth-title">{{ isRegister ? '注册' : '登录' }}</h1>
            <nav class="auth-tabs" aria-label="账号登录注册">
                <RouterLink to="/" class="auth-tab" :class="{ active: !isRegister }" :aria-current="!isRegister ? 'page' : undefined">
                    账号登录<span v-if="!isRegister" class="auth-tab-line"></span>
                </RouterLink>
                <RouterLink to="/register" class="auth-tab" :class="{ active: isRegister }" :aria-current="isRegister ? 'page' : undefined">
                    账号注册<span v-if="isRegister" class="auth-tab-line"></span>
                </RouterLink>
            </nav>
            <form :key="route.path" @submit.prevent="submit" novalidate>
                <div class="auth-fields">
                    <div class="auth-cell">
                        <input id="account" v-model="account" type="text" placeholder="账号" aria-label="账号"
                            autocomplete="username" autocapitalize="none" spellcheck="false" required>
                    </div>
                    <Password id="password" v-model="password" placeholder="密码"
                        :autocomplete="isRegister ? 'new-password' : 'current-password'" />
                    <Password v-if="isRegister" id="confirm-password" v-model="confirmPassword"
                        placeholder="确认密码" autocomplete="new-password" />
                    <div v-if="isRegister" class="auth-cell">
                        <input id="referral" v-model="referral" type="text" placeholder="邀请码" aria-label="邀请码" autocomplete="off">
                    </div>
                </div>
                <p v-if="feedback" class="auth-feedback" role="status">{{ feedback }}</p>
                <button class="auth-submit" type="submit" :disabled="submitting">{{ submitting ? '提交中...' : isRegister ? '注册' : '登录' }}</button>
            </form>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Password from './components/Password.vue'
import { getRef, setToken } from '@/config/storage'
import { loginAccount, registerAccount } from '@/api/auth'
import { homePath } from '@/config/path'
import { routerReplace } from '@/router'

const route = useRoute()
const isRegister = computed(() => route.path === '/register')
const account = ref('')
const password = ref('')
const confirmPassword = ref('')
const feedback = ref('')
const referral = ref(getRef())
const submitting = ref(false)

watch(() => route.path, () => {
    account.value = ''
    password.value = ''
    confirmPassword.value = ''
    feedback.value = ''
})

const submit = async () => {
    if (submitting.value) return
    feedback.value = ''
    const username = account.value.trim()
    if (!username) { feedback.value = '请输入账号'; return }
    if (!password.value.trim()) { feedback.value = '请输入密码'; return }
    if (isRegister.value) {
        if (!confirmPassword.value) { feedback.value = '请再次输入密码'; return }
    }
    submitting.value = true
    const submittedPath = route.path
    try {
        const data = { username, password: password.value }
        const result = isRegister.value
            ? await registerAccount({ ...data, ...(referral.value.trim() ? { ref: referral.value.trim() } : {}) })
            : await loginAccount(data)
        if (route.path !== submittedPath) return
        if (!result.token || typeof result.token !== 'string') throw new Error('登录响应缺少 token，请重试')
        setToken(result.token)
        password.value = ''
        confirmPassword.value = ''
        routerReplace(homePath)
    } catch (error) {
        if (route.path === submittedPath) feedback.value = error instanceof Error ? error.message : '提交失败，请重试'
    } finally {
        submitting.value = false
    }
}

</script>

<style lang="scss" scoped>
// 移植 XSmartPay 的背景、标签布局和输入框样式；桌面限制表单宽度。
.auth-page {
    position: relative;
    min-height: 100vh;
    min-height: 100dvh;
    background: #000000;
    color: #FFFFFF;
    padding: 125PX 15PX calc(40PX + env(safe-area-inset-bottom));
    overflow: hidden;
}
.auth-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 750PX;
    height: auto;
    pointer-events: none;
}
.auth-content { position: relative; max-width: 420PX; margin: 0 auto; }
.auth-content h1 {
    display: inline-block;
    font-size: 26PX;
    font-weight: 700;
    line-height: 1.4;
    color: $main-color;
    background: linear-gradient(to right, #00D8FF, #D400FF);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.auth-tabs { display: flex; height: 70PX; }
.auth-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5PX;
    padding: 20PX 30PX 0 0;
    font-size: 16PX;
    color: #8D9094;
    text-decoration: none;
}
.auth-tab.active { color: #FFFFFF; }
.auth-tab-line { width: 30%; height: 2PX; border-radius: 1PX; background: linear-gradient(to right, #00D8FF, #D400FF); }
.auth-fields { display: grid; gap: 15PX; }
.auth-content :deep(.auth-cell) {
    display: flex;
    align-items: center;
    background: #FFFFFF1A;
    border: 1PX solid #FFFFFF1A;
    padding: 0 15PX;
    height: 44PX;
    border-radius: 7PX;
}
.auth-content :deep(.auth-cell:focus-within) { border-color: $main-color; }
.auth-content :deep(input) {
    flex: 1;
    min-width: 0;
    width: 100%;
    height: 100%;
    font: inherit;
    font-size: 14PX;
    color: #FFFFFF;
    outline: none;
}
.auth-content :deep(input::placeholder) { color: #FFFFFF80; }
.auth-submit {
    width: 100%;
    height: 44PX;
    border: 0;
    border-radius: 7PX;
    margin-top: 30PX;
    background: linear-gradient(to right, #00D8FF, #D400FF);
    color: $main-color;
    font-size: 14PX;
    font-weight: 600;
    cursor: pointer;
}
.auth-submit:disabled { opacity: 0.6; cursor: wait; }
.auth-feedback { margin-top: 14PX; font-size: 13PX; color: $main-color; line-height: 1.6; }
.auth-page :deep(button:focus-visible), .auth-tab:focus-visible { outline: 2PX solid #FFFFFF; outline-offset: 4PX; }
</style>
