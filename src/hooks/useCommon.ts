import { updateUserInfo, pledge } from "@/api/common";
import { SignType } from "@/config/dapp";
import { getSign } from "@/dapp";
import { showSuccessToast, showToast } from "vant";
import { useDappStore } from '@/store';
import { storeToRefs } from 'pinia';
import { ref } from "vue";

// 仓库的重复代码
export function useDapp () {
    const useStore = useDappStore()
    return { ...storeToRefs(useStore) }
}

// 质押
export function usePledge() {
    const amount = ref() // 输入框

    const submit = async () => {
        if(!amount.value)return showToast('请输入销毁数量');
        const signInfo = await getSign(SignType.Pledge);
        if(!signInfo)return;
        await pledge({
            amount: amount.value,
            pay_type: 1,
            ...signInfo
        })
        showSuccessToast('销毁成功')
        updateUserInfo()
        amount.value = ''
    }

    return { amount, submit }
}