/**
 * 公告模块配置
 */

import { get } from '@/utils/request'

// 公告轮播间隔
export const autoplay:number = 3000 // 自动播放间隔

// 公告模块路由配置
export const routes = [
    {
        path:'/notice',
        component: () => import('@/modules/notice/views/list.vue')
    },
    {
        path:'/notice/:id',
        component: () => import('@/modules/notice/views/detail.vue')
    }
]

// 公告接口
export const getNotice = async (data:any) => await get('/api/notices', data) // 获取公告
export const getNoticeDetail = async (id:any) => await get(`/api/notices/${id}`) // 获取公告详情