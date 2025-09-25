import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getLang, setLang } from '@/config/storage'
import { i18n } from '@/locale'

export const useAppStore = defineStore('app', () => {
    const language = getLang()

    const lang = ref(language) // 当前多语言

    const address = ref<any>(null) // 当前选中的收货地址

    // 修改多语言
    function setLocale(locale:any, reload:boolean = true){
        lang.value = locale
        setLang(locale)
        i18n.global.locale = locale
        if(reload){
            location.reload()
        }
    }

    return {
        lang,
        setLocale,
        address
    }
})