import axios from 'axios'

import { getToken, delToken } from '../config/storage'

import httpConfig from '../config/http'
import { getHeaderLang } from '../locale'

import { closeToast, showLoadingToast, showToast } from 'vant';
import { router } from '@/router';
import { useDappStore } from '@/store';
// import { homePath, SignType } from '@/config/dapp';
import { loginPath } from '@/config/path'
// import { getSign } from '@/dapp';
// import { updateUserInfo } from '@/api/common';

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: httpConfig.timeOut
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 如果是上传请求，不设置 Content-Type
        if (!(config.data instanceof FormData)) {
            config.headers['Content-Type'] = "application/json; charset=UTF-8"
        }
        config.headers[httpConfig.tokenKey] = httpConfig.tokenBearer + getToken()
        // 演示项目不再发送钱包地址请求头。
        // if(httpConfig.addressKey)config.headers[httpConfig.addressKey] = getAddress()
        if(httpConfig.langKey)config.headers[httpConfig.langKey] = getHeaderLang()
        return config
    },
    error => {
        // 请求失败
        console.log(error)
        return Promise.reject(error)
    }
)


// 响应拦截器
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        const status = error.response?.status
        const data = error.response?.data
        const message = typeof data === 'string' && data
            ? data
            : error.code === 'ECONNABORTED' ? '请求超时，请稍后重试' : '请求失败，请检查网络后重试'
        const isAuthRequest = /^\/api\/auth\/(login|register)$/.test(error.config?.url || '')
        // 登录失败保留当前表单；业务接口的 401 才清理登录状态。
        if (status === 401 && !isAuthRequest) logout()
        if (!isAuthRequest) showToast(message)
        return Promise.reject(new Error(message))
    }
)

export const get = (url: string, params:any = '') => service({ url, method: 'get', params })
export const post = (url: string, data:any = {}) => service({ url, method: 'post', data })
export const del = (url: string, data:any = {}) => service({ url, method: 'delete', data })
export const put = (url: string, data:any = {}) => service({ url, method: 'put', data })

// 上传单张图片
export const upload = () => {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        
        input.onchange = async (e:Event) => {
            const file = (e.target as HTMLInputElement)?.files?.[0]
            if (!file) {
                input.remove() // 删除 input 元素
                reject(new Error('未选择文件'))
                return
            }
            
            const formData = new FormData()
            formData.set(httpConfig.uploadFileName, file, file.name)
            
            try {
                showLoadingToast({
                    overlay: true,
                    forbidClick: true,
                    duration: 0,
                    zIndex: 10000000000 
                });
                const response = await service({
                    url: httpConfig.uploadApi,
                    method: 'post',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                closeToast()
                input.remove() // 删除 input 元素
                resolve(response)
            } catch (error) {
                input.remove() // 删除 input 元素
                closeToast()
                reject(error)
            }
        }
        
        input.click()
    })
}

// let isLogining:boolean = false
//
// // 退出登录
// export function logout(){
//     if(isLogining)return
//     isLogining = true
//     const useStore = useDappStore()
//     useStore.address = ''
//     useStore.userInfo = null
//     delToken()
//     router.push(loginPath)
//     login()
// }
//
// // 登录
// export async function login(){
//     if(router.currentRoute.value.path != loginPath)router.push(loginPath)
//     const cuurentAddress = getAddress()
//     const signInfo = await getSign(SignType.Login)
//     if(signInfo){
//         post('/api/auth/login',{
//             address: cuurentAddress,
//             ref: getRef(),
//             ...signInfo
//         }).then((res:any)=>{
//             const useStore = useDappStore()
//             useStore.address = cuurentAddress
//             setAddress(cuurentAddress)
//             setToken(res.token)
//             updateUserInfo()
//             setTimeout(() => {
//                 router.replace(homePath)
//             }, 1000);
//         }).finally(()=>isLogining = false)
//     }else{
//         isLogining = false
//     }
// }

// 账号登录失效后仅回到登录页，不触发钱包签名或登录接口。
export function logout() {
    const useStore = useDappStore()
    useStore.address = ''
    useStore.userInfo = null
    delToken()
    router.replace(loginPath)
}
