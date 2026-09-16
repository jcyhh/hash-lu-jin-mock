// 演示项目：原钱包、签名及合约调用全部停用，保留代码便于后续查阅。
// /*
//  * @Description:
//  * @Version: 1.0
//  * @Author: JCY
//  * @Date: 2025-06-17 14:18:28
//  */
// import { gasMul } from "@/config/dapp";
// import { checkGas } from "..";
// import BigNumber from "bignumber.js";
//
// export default {
// 	// 提币
// 	async claim(id: number, token:string, amount: string, expiredTime: string, signature: string): Promise<any> {
//         const gasEnough = await checkGas()
//         if(!gasEnough)throw new Error('Gas费不足')
//         let {
//             claim
//         } = (this as any).meta;
//         const estimatedGas = await claim.estimateGas(id, token, amount, expiredTime, signature);
//         let res = await claim(id, token, amount, expiredTime, signature,{
//             gasLimit:new BigNumber(estimatedGas.toString()).times(gasMul).toFixed(0)
//         })
//         return res;
// 	},
// }

export {}
