/**
 * keepAlive: true —— 跳转别的页面后，本页面不销毁
 */
import menus from './menu'

import modulesRoutes from '@/modules'

export default [
    {
        path:'/', // 启动
        component: () => import('@/views/index.vue')
    },
    {
        path:'/recharge',
        component: () => import('@/views/asset/recharge.vue')
    },
    {
        path:'/withdraw',
        component: () => import('@/views/asset/withdraw.vue')
    },
    {
        path:'/transfer',
        component: () => import('@/views/asset/transfer.vue')
    },
    // 一级页面
    ...menus,
    // 模块路由
    ...modulesRoutes
]