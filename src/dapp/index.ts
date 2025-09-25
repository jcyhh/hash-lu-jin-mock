/**
 * 等待metamask注入
 * 链接钱包、获取地址
 * 检查是否需要切换网络
 * 创建网络和账户的监听
 * 初始化合约
 * 未登录则签名登录
 * 跳首页
 * 
 * 网络切换时，只需重新初始化合约
 * 账户切换至，需要重新初始化合约和重新登录
 */

import { ethers } from "ethers";
import detectEthereumProvider from "@metamask/detect-provider";
import BigNumber from "bignumber.js";
import { showToast } from 'vant';

import { chainInfo, numRule, minGas, homePath, SignType } from '../config/dapp';
import { loginPath } from '@/config/path'
import { getToken, setAddress } from '../config/storage';
import { useDappStore } from '../store'
import { router, routerReplace } from '../router';

import { login, logout } from '@/utils/request'

import erc20Abi from './erc20/ERC20.json'
import erc20Api from './erc20/erc20'
import bizAbi from './biz/Biz.json'
import bizApi from './biz/biz'

import { updateUserInfo } from "@/api/common";

const { ethereum } = window as any
let provider: any = null; // 提供者
let signer: any = null; // 签名器

export async function init(){
    // 同步等待MetaMask以太坊对象注入完毕
    if(ethereum){
        await detectEthereumProvider();
        provider = new ethers.BrowserProvider(ethereum);
        signer = await provider.getSigner();
        checkChainId(); // 检查网络
    }else{
        console.error('没有MetaMask环境');
    }
}

async function checkChainId(){
    const network = await provider.getNetwork();
    const chainId: string = network.chainId.toString(); // 当前网络，例56
    console.log(`当前网络：${chainId}`);
    const targetChainId: string = parseInt(chainInfo.chainId).toFixed(); // 需要引导用户切换的网络
    const envChainId: string = import.meta.env.VITE_CHAIN_ID; // 当前环境配置网络
    if(targetChainId === envChainId && targetChainId !== chainId)await changeChain(); // 如果是正式环境，然后不是目标网络
    createListener(); // 创建监听
}

/**
 * @description 切换或添加目标网络
 */
async function changeChain(){
    try {
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainInfo.chainId }]
        })
        console.log('已切换至目标网络');
    } catch (error:any) {
        if(error.code == 4902){
            try {
                await ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [chainInfo]
                })
                console.log('添加目标网络成功');
            } catch (err) {
                console.error('添加目标网络失败');
            }
        }else{
            console.error('切换至目标网络失败');
        }
    }
}

// 要在网络引导逻辑之后再创建监听，避免触发网络切换回调
function createListener(){
    ethereum.on('accountsChanged', handlerAccountsChanged); // 监听账户切换
    ethereum.on('chainChanged', handlerChainChanged); // 监听网络切换
    initContract(); // 初始化合约
    checkLoginIn(); // 登入逻辑
}

/**
 * @description 账户切换回调
 * @param { string[] } accounts 钱包账户列表
 */
async function handlerAccountsChanged(accounts: string[]){
    if(accounts.length==0){
        console.error('监听到钱包链接已断开');
    }else{
        console.log(`监听到切换账户为：${accounts[0]}`);
        signer = await provider.getSigner(); // 重新获取签名器
        const address = getAddress()
        console.log('当前地址：' + address);
        setAddress(address) // 存储最新地址
        console.log('重新初始化合约');
        initContract();// 重新初始化合约
        logout() // 主动登录失效
    }
}
/**
 * 网络切换回调
 * @param { string } chainId 当前网络，例0x38 
 */
async function handlerChainChanged(chainId:any){
    console.error(`监听到钱包网络已切换：${chainId}`);
    signer = await provider.getSigner(); // 重新获取签名器
    console.log('重新初始化合约');
    initContract();// 重新初始化合约
}

// 登入逻辑
async function checkLoginIn(){
    const address = getAddress()
    console.log('当前地址：' + address);
    setAddress(address) // 登录前先获取地址
    const token = getToken()
    if(token){
        console.log('已登录');
        // store里存入地址，代表登录成功
        const useStore = useDappStore()
        useStore.address = address
        const path = router.currentRoute.value.path
        // 如果在启动页面，动画结束后跳转到首页
        if(path == loginPath){
            setTimeout(()=>{
                router.replace(homePath)
            },1000)
        }
        updateUserInfo()
    }else{
        if(ethereum){
            // 签名登录
            login()
        }else{
            routerReplace('/login')
        }
    }
}

// 获取当前地址
export function getAddress(){
    if(!signer)return ''
    const address = signer.address
    setAddress(address)
    return address
}

/**
 * 签名
 * @param { SignType } message 签名前缀 
 * @returns 时间戳，签名
 * @example const signInfo = await getSing('Login')
 */
export async function getSign(message: SignType) {
    try {
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = await signer.signMessage(message + '-' + timestamp)
        return {
            signature,
            timestamp
        };
    } catch (error) {
        console.log(error);
        
        console.error('签名失败');
        return false
    }
}

/**
 * @description 检查GAS是否足够
 * @returns { boolean } 是否足够
 */
export async function checkGas(): Promise<boolean>{
    const address = signer.address
    const result = await ethereum.request({
        method: 'eth_getBalance',
        params: [address, "latest"]
    });
    let balanceInEth:any = parseInt(result, 16)
    console.log(`获取到ETH余额: ${balanceInEth}`);
    balanceInEth = new BigNumber(balanceInEth)
    const min = new BigNumber(minGas).times(numRule)
    if(min.comparedTo(balanceInEth) == 1){
        console.error('Gas费不足');
        showToast('Gas费不足')
        return false
    }else{
        console.log('Gas费充足');
        return true
    }
}

/**
 * @description 初始化合约
 * @param abi 
 * @param api 
 * @returns 
 */
function getContract(abi:any, api:any, contractAddress: string){
    const web3 = provider
    const account = getAddress()
    const meta = new ethers.Contract(
        contractAddress,
        abi,
        provider
    ).connect(signer)
    return {
        meta,
        account,
        web3,
        ...api
    }
}

/**
 * @description 初始化合约，并存储在pinia
 */
export const initErc20 = async (address:string = '') => {
    useDappStore().erc20 = await getContract(erc20Abi, erc20Api, address || import.meta.env.VITE_USDT)
    console.log('erc20初始化成功');
}

/**
 * @description 初始化合约，并存储在pinia
 */
export const initBiz = async (address:string = '') => {
    useDappStore().biz = await getContract(bizAbi, bizApi, address || import.meta.env.VITE_BIZ)
    console.log('biz初始化成功');
}

/**
 * 初始化合约
 */
const initContract = async () => {
    await initErc20()
    await initBiz()
}