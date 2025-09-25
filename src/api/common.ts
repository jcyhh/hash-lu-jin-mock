import { useDappStore } from '@/store'
import { get, post } from '@/utils/request'

// 获取个人信息，并更新store
export function updateUserInfo () {
    const useStore = useDappStore()
    get('/api/users/my').then((res:any)=>{
        useStore.userInfo = res
    }).catch(()=>{})
}

// 更新个人信息
export const changeUserInfo = async (data:any) => await post('/api/users/my', data)

// 获取轮播图
export const getBanner = async () => await get('/api/banners')

// 获取配置
export const getConfig = async () => await get('/api/config/config')

// 提币
export const withdraw = async (data:any) => await post('/api/withdraws', data)

// 质押
export const pledge = async (data:any) => await post('/api/pledge', data)

// 提币配置
export const getWithdrawInfo = async () => await get('/api/withdraws/fee')

// 转账
export const transfer = async (data:any) => await post('/api/transfer', data)