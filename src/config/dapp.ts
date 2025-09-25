export const loginPath: string = '/' // TODO 登录中页面路由

export const homePath: string = '/home' // TODO 登录成功后跳转的首页路由

export const approveAmount: string = '115792089237316195423570985008687907853269984665640564039457584007913129639935' // 授权额度

export const numRule: number = 1e18 // 普通数字转大数字规则

export const minGas: number = 0.0004 // 最低eth余额

export const gasMul: number = 1.5 // Gas费倍率

export enum SignType { // 签名前缀
    Login = 'Login', // 登录
    Order = 'Order', // 购买
    Claim = 'Claim', // 提币
    Pledge = 'Pledge', // 质押
    Transfer = 'Transfer', // 转账
    Node = 'Node', // 节点
    BuyToken = 'BuyToken' // 购买排单币
}

// 正式环境的网络信息
export const chainInfo = {
    chainId: '0x38',
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com']
}