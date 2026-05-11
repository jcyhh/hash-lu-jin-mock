import { post, get } from '@/utils/request'

// 购买挖矿
export const createOrder = async (data:any) => await post('/api/order', data)

// 购买排单币
export const buyTokenCoin = async (data:any) => await post('/api/node/buy_order_token', data)

// 购买节点
export const buyNode = async (data:any) => await post('/api/node', data)

// 申请节点
export const applyNode = async (data:any) => await post('/api/node/apply_for', data)

// 充值地址
export const getWithdrawAddress = async () => await get('/api/users/my/recharge_address')

// 提币手续费
export const getWithdrawFee= async () => await get('/api/withdraws/fee')

export const cancelOrder= async (data:any) => await post(`/api/order/${data}/cancel`)