import { axios } from 'boot/axios.js'

/**
 * 添加标签
 * @param {String} name 标签名称
 */
export const addTag = params => {
    return axios.post(`/tag/add`, params)
}

/**
 * 查找标签列表
 */
export const findTagList = params => {
    return axios.get(`/tag/list`, { params })
}

/**
 * 根据_id 编辑标签信息
 * @param {String} _id 标签_id
 * @param {String} name 标签名称
 */
export const EditTagById = (_id, params) => {
    return axios.put(`/tag/${_id}`, params)
}

/**
 * 根据_id 删除单个标签
 * @param {String} _id 标签_id
 */
export const deleteTagById = _id => {
    return axios.delete(`/tag/${_id}`)
}