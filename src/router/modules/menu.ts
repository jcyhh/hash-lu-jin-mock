import homeIcon from '@/assets/layout/home.png'
import orderIcon from '@/assets/layout/order.png'
import assetIcon from '@/assets/layout/asset.png'
import teamIcon from '@/assets/layout/team.png'
import inviteIcon from '@/assets/layout/invite.png'

import homeActIcon from '@/assets/layout/homeHL.png'
import orderActIcon from '@/assets/layout/orderHL.png'
import assetActIcon from '@/assets/layout/assetHL.png'
import teamActIcon from '@/assets/layout/teamHL.png'
import inviteActIcon from '@/assets/layout/inviteHL.png'

import Layout from '@/layout/index.vue'

export default [
    {
        path:'/home',
        component: Layout,
        redirect: '/home/index',
        meta:{
            title:'首页',
            icon:homeIcon,
            actIcon:homeActIcon
        },
        children:[{
            path:'index',
            component: () => import('@/views/home/index.vue')
        }]
    },
    {
        path:'/order',
        component: Layout,
        redirect: '/order/index',
        meta:{
            title:'订单',
            icon:orderIcon,
            actIcon:orderActIcon
        },
        children:[{
            path:'index',
            component: () => import('@/views/order/index.vue')
        }]
    },
    {
        path:'/asset',
        component: Layout,
        redirect: '/asset/index',
        meta:{
            title:'资产',
            icon:assetIcon,
            actIcon:assetActIcon
        },
        children:[{
            path:'index',
            component: () => import('@/views/asset/index.vue')
        }]
    },
    {
        path:'/team',
        component: Layout,
        redirect: '/team/index',
        meta:{
            title:'社区',
            icon:teamIcon,
            actIcon:teamActIcon
        },
        children:[{
            path:'index',
            component: () => import('@/views/team/index.vue')
        }]
    },
    {
        path:'/invite',
        component: Layout,
        redirect: '/invite/index',
        meta:{
            title:'分享',
            icon:inviteIcon,
            actIcon:inviteActIcon
        },
        children:[{
            path:'index',
            component: () => import('@/views/invite/index.vue')
        }]
    }
]