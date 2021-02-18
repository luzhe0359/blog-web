import { axios } from 'boot/axios.js'

/**
 * 文件上传
 * @param {String} 
 */
export const uploadImage = (params) => {
    return axios.post(`/upload`, params)
}