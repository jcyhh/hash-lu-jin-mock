/**
 * 通用列表接口常量
 */

interface ApiInfo {
    api: string, // 接口名
    name: string // 列表字段
}

const apiInfos: Record<string, ApiInfo> = {

    team: { api: '/api/users/my/referrals', name: 'referrals' }, // 团队列表

    balance: { api: '/api/users/my/balance_logs', name: 'balance_logs' }, // 余额明细

    pledge: { api: '/api/pledge', name: 'pledges' }, // 质押明细
}

export default apiInfos