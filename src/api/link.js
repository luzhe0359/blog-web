import { axios } from 'boot/axios.js'

/**
 * 添加友链
 * @param {String} name 友链
 */
export const addLink = params => {
    return axios.post(`/link/add`, params)
}

/**
 * 查找友链列表
 */
export const findLinkList = params => {
    return axios.get(`/link/list`, params)
}

/**
 * 根据_id 编辑友链
 * @param {String} _id 友链_id
 * @param {String} name 友链
 */
export const editLinkById = (_id, params) => {
    return axios.put(`/link/${_id}`, params)
}

/**
 * 根据_id 删除单个友链
 * @param {String} _id 友链_id
 */
export const deleteLinkById = _id => {
    return axios.delete(`/link/${_id}`)
}