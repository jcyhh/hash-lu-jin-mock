const addressKey: string = 'WELLET_ADDRESS' // 存储钱包地址的KEY

const refKey: string = 'REF' // 存储邀请码的KEY

const tokenKey: string = 'TOKEN' // 存储TOKEN的KEY

const langKey: string = 'Lang' // 存储多语言的KEY

const jumpUrlKey: string = 'JumpUrl' // 存储多语言的KEY

// 存储多语言
export const setLang = (data: string): void => localStorage.setItem(langKey, data)
export const getLang = (): string => localStorage.getItem(langKey) || import.meta.env.VITE_DEFAULT_LANG
export const delLang = (): void => localStorage.removeItem(langKey)

// 存储钱包地址
export const setAddress = (data: string): void => localStorage.setItem(addressKey, data)
export const getAddress = (): string => localStorage.getItem(addressKey)||''
export const delAddress = (): void => localStorage.removeItem(addressKey)

// 存储邀请码
export const setRef = (data: string): void => localStorage.setItem(refKey, data)
export const getRef = (): string => localStorage.getItem(refKey)||''
export const delRef = (): void => localStorage.removeItem(refKey)

// 存储Token
export const setToken = (data: string): void => localStorage.setItem(tokenKey, data)
export const getToken = (): string => localStorage.getItem(tokenKey)||''
export const delToken = (): void => localStorage.removeItem(tokenKey)


// 存储跳转链接
export const setJumpUrl = (data: string): void => localStorage.setItem(jumpUrlKey, data)
export const getJumpUrl = (): string => localStorage.getItem(jumpUrlKey)||''
export const delJumpUrl = (): void => localStorage.removeItem(jumpUrlKey)