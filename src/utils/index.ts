import { numRule } from "@/config/dapp"
import BigNumber from "bignumber.js";
import { t } from '@/locale'

/**
 * @description 大数字转小数字
 * @param { String | Number } bigNum - 大数字
 * @returns { Number } 展示用小数字
 */
export function bigToSmall(bigNum:number|string) {
    return new BigNumber(bigNum).div(numRule).dp(4).toNumber()
}

/**
 * @description 小数字转大数字
 * @param { String | Number } smallNum - 小数字
 * @returns { String } 合约用大数字
 */
export function smallToBig(smallNum:number|string) {
    return new BigNumber(smallNum).times(numRule).toFixed(0)
}

/**
 * @description 大数字之间比较大小
 * @param { String | Number } a
 * @param { String | Number } b 
 * @returns { Number } a>b=1 a=b=0 a<b=-1
 */
export function compare(a:number|string, b:number|string) {
    let num1 = new BigNumber(a)
    let num2 = new BigNumber(b)
    return num1.comparedTo(num2)
}

/**
 * 普通数字乘法精度计算
 * @param {Number|String} a - 第一个数字 
 * @param {Number|String} b - 第二个数字
 * @returns {Number} a * b
 */
export function computedMul(a:number|string, b:number|string) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length
    } catch (f) { }
    try {
        c += e.split(".")[1].length
    } catch (f) { }
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c)
}

/**
 * 普通数字除法精度计算
 * @param {Number|String} a - 第一个数字 
 * @param {Number|String} b - 第二个数字
 * @returns {Number} a / b 保留两位小数
 */
export function computedDiv(a:number|string, b:number|string) {
    if(a==0)return 0
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length
    } catch (g) { }
    try {
        f = b.toString().split(".")[1].length
    } catch (g) { }
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), computedMul(c /
        d, Math.pow(10, f - e))
}


/**
 * 普通数字加法精度计算
 * @param {Number|String} a - 第一个数字 
 * @param {Number|String} b - 第二个数字
 * @returns {Number} a + b
 */
export function computedAdd(a:number|string, b:number|string) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length
    } catch (f) {
        c = 0
    }
    try {
        d = b.toString().split(".")[1].length
    } catch (f) {
        d = 0
    }
    return e = Math.pow(10, Math.max(c, d)), (computedMul(a, e) + computedMul(b, e)) / e
}

/**
 * 普通数字减法精度计算
 * @param {Number|String} a - 第一个数字 
 * @param {Number|String} b - 第二个数字
 * @returns {Number} a - b
 */
export function computedSub(a:number|string, b:number|string) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length
    } catch (f) {
        c = 0
    }
    try {
        d = b.toString().split(".")[1].length
    } catch (f) {
        d = 0
    }
    return e = Math.pow(10, Math.max(c, d)), (computedMul(a, e) - computedMul(b, e)) / e
}

export function isIOS() {
    const ua = navigator.userAgent;
    const isIPhone = /iPhone/i.test(ua);
    const isIPad = /iPad/i.test(ua) || (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
    return isIPhone || isIPad || /iPod/i.test(ua);
}

// 格式化数字
export function initNumber(value:number | bigint){
    let text:string = ''
    if(value){
        const num = Math.floor(parseFloat(`${value}`) * 1e6) / 1e6
        let numFormat = new Intl.NumberFormat('en-US',{
            maximumFractionDigits: 6
        }).format(num)
        text = numFormat == '0'?'0':numFormat
    }else{
        text = '0'
    }
    return text
}

// 隐藏手机号中间信息
export function initPhone(value:string){
    if(!value)return '--'
    return value.slice(0, 3) + "****" + value.slice(value.length - 4)
}

// 隐藏钱包地址中间信息
export function initAddress(value:string){
    if(!value)return '--'
    return value.slice(0, 5) + '****' + value.slice(value.length - 4)
}

/**
 * 2025-07-10 09:30:30 => 09:30
 * 2025-07-09 09:30:30 => 昨天09:30
 * 2025-07-08 09:30:30 => 07-08 09:30
 * 2024-07-08 09:30:30 => 2024-07-08 09:30
 */
export function initTime(timestamp:string){
    if(!timestamp)return '--'
    const date = new Date(timestamp); // 将时间戳转换为 Date 对象
    const now = new Date(); // 当前时间

    // 获取日期信息
    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = date.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (isToday) {
        return `${hours}:${minutes}`;
    } else if (isYesterday) {
        return `${t('昨天')} ${hours}:${minutes}`;
    } else {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从 0 开始
        const day = date.getDate().toString().padStart(2, '0');

        // 判断是否在当前年份内
        if (year === now.getFullYear()) {
            return `${month}-${day} ${hours}:${minutes}`;
        } else {
            return `${year}-${month}-${day} ${hours}:${minutes}`;
        }
    }
}