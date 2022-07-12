import CryptoJS from "crypto-js"
import secret from './secret.js'
const key = CryptoJS.enc.Utf8.parse(secret.CRYPTO_KEY)
const iv = CryptoJS.enc.Utf8.parse(secret.CRYPTO_IV)

/**
 * aes加密
 * @param {String} data 未加密的数据
 * @param {String} key 秘钥
 * @return {String} 加密后数据
 */
export const aesEncrypt = (data) => {
    return CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString() // 转换为字符串
}
// mode 支持 CBC、CFB、CTR、ECB、OFB, 默认 CBC
// padding 支持 Pkcs7、AnsiX923、Iso10126、NoPadding、ZeroPadding, 默认 Pkcs7, 即 Pkcs5
/**
 * aes解密
 * @param {String} encrypted 加密过的数据
 * @param {String} key 秘钥
 * @return {String} 解密后数据
 */
export const aesDecrypt = (encrypted) => {
    return CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8) // 转换为 utf8 字符串
}