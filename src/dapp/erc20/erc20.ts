// 演示项目：原钱包、签名及合约调用全部停用，保留代码便于后续查阅。
// export default {
//     // 转账
// 	async transfer(address: string, amount: string): Promise<any> {
// 		let {
// 			transfer
// 		} = (this as any).meta;
// 		let res = await transfer(address, amount)
// 		return res;
// 	},
// 	// 授权
// 	async approve(address: string, amount: string): Promise<any> {
// 		let {
// 			approve
// 		} = (this as any).meta;
// 		let res = await approve(address, amount)
// 		return res;
// 	},
// 	// 查询授权额度
// 	async allowance(owner = null, spender: string): Promise<string> {
// 		let {
// 			allowance
// 		} = (this as any).meta;
// 		let {
// 			account
// 		} = (this as any);;
// 		let res = await allowance(owner || account, spender)
// 		return res.toString();
// 	},
// 	// 查询余额
// 	async balanceOf(address: string): Promise<string> {
// 		let {
// 			balanceOf
// 		} = (this as any).meta;
// 		let {
// 			account
// 		} = (this as any);
// 		let res = await balanceOf(address || account)
// 		return res.toString();
// 	}
// }

export {}
