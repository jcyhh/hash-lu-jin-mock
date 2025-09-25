/**
 * const useStore = useDappStore()
 * const { erc20 } = storeToRefs(useStore)
 * await erc20.vale.balanceOf()
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDappStore = defineStore('dapp', () => {
    const address = ref('') // 钱包地址

    const erc20 = ref(null) // erc20

    const biz = ref(null)

    const userInfo = ref()

    return {
        userInfo,
        address,
        erc20,
        biz
    }
})