import { useDappStore } from '@/store'

import { closeToast, showLoadingToast, showSuccessToast } from 'vant'
import { compare, smallToBig } from '@/utils'

import { t } from '@/locale';
import { showFailToast } from 'vant';
import { approveAmount } from '@/config/dapp';

// 获取链上余额
export async function getBalance(){
    const useStore = useDappStore()
    const balance = await (useStore.erc20 as any).balanceOf()
    console.log('【balanceOf】余额'+balance);
    return balance
}

/**
 * 转账/充值
 * @param {string} amountNum - 充值金额
 * @param {string} address - 充值地址
 * @returns {boolean} 结果 - true（充值成功） false（充值失败）
 * @example
 * ```ts
 * const result = await transfer(amount, address)
 * if(result){}else{}
 * ```
 */
export async function transfer(amountNum:number|string, address:string): Promise<boolean>{
    // await initErc20()
    const useStore = useDappStore()
    const amount = smallToBig(amountNum) // 转账金额
    const balance = await getBalance() // 余额
    const compareResult = compare(amount, balance)!
    if(compareResult> 0 ){
        showFailToast(t('余额不足'))
        return false
    }
    
    showLoadingToast({
        overlay: true,
        forbidClick: true,
        duration: 0,
        zIndex: 10000000000 
    });
    try {
        const result = await (useStore.erc20 as any).transfer(address, amount)
        await result.wait()
        closeToast()
        showSuccessToast(t('充值成功'))
        return true
    } catch (error) {
        console.log(error);
        closeToast()
        showFailToast(t('充值失败'))
        return false
    }
}

/**
 * 检查余额和授权余额，授权余额不足执行授权
 * @param {number|string} amountNum - 操作金额
 * @param {string} address - 授权地址
 * @returns {boolean} 结果 - true（余额充足、授权余额充足） false（余额不足或余额授权失败）
 * ```ts
 * const approveResult = await approve(amount, address)
 * if(!approveResult)retuen
 * ```
 */
export async function approve(amountNum:number|string, address:string): Promise<boolean>{
    // await initErc20()
    const useStore = useDappStore()
    const amount = smallToBig(amountNum) // 操作金额
    const balance = await getBalance() // 余额
    const compareResult = compare(amount, balance)!
    if(compareResult> 0 ){
        showFailToast(t('余额不足'))
        return false
    }
    const allowance = await (useStore.erc20 as any).allowance(null,address)
    console.log(`【allowance】授权余额：${allowance}`);
    const allowanceCompare = compare(amount, allowance)!
    if(allowanceCompare > 0){
        // 授权余额不足，去授权
        showLoadingToast({
            overlay: true,
            forbidClick: true,
            duration: 0,
            zIndex: 10000000000 
        });
        try {
            const result = await (useStore.erc20 as any).approve(address, approveAmount)
            await result.wait()
            closeToast()
            showSuccessToast(t('授权成功'))
            return true
        } catch (error) {
            console.log(error);
            closeToast()
            showFailToast(t('授权失败'))
            console.error('余额授权失败');
            return false
        }
    }else{
        console.log('余额和授权余额都充足');
        return true
    }
}

/**
 * @description 测试用，清空授权余额
 * @param address  - 授权地址
 * @returns 授权余额被清为0
 */
export function clearApprove(address:string){
    const useStore = useDappStore()
    const result = (useStore.erc20 as any).approve(address, 0)
    return result
}