import { useDappStore } from '@/store'
import { closeToast, showFailToast, showLoadingToast, showSuccessToast } from 'vant'
import { post } from '@/utils/request';
import { t } from '@/locale';
import { getSign } from '..';
import { SignType } from '@/config/dapp';

/**
 * @description 提币
 * @param amountNum - 提币数量
 * @returns true代表整个操作成功
 */
export async function claim(amountNum:number | string){
    const signInfo = await getSign(SignType.Claim)
    if(!signInfo)return
    const useStore = useDappStore()
    try {
        const res:any = await post('/api/withdraws', {
            ccy: 'balance',
            amount: amountNum,
            ...signInfo
        })
        try {
            showLoadingToast({
                overlay: true,
                forbidClick: true,
                duration: 0,
                zIndex: 10000000000 
            });
            const { id, token, amount, expired_time, sign } = res
            const result = await (useStore.biz as any).claim(id, token, amount, expired_time, sign)
            await result.wait()
            closeToast()
            showSuccessToast(t('提币成功'))
            return true;
        } catch (error) {
            console.log(error);
            closeToast()
            showFailToast(t('提币失败'))
        }
    } catch (error) {}
}