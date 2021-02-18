import { axios } from 'boot/axios.js'

/**
 * 添加分类
 * @param {String} name 分类名称
 */
export const addCategory = params => {
    return axios.post(`/category/add`, params)
}

/**
 * 查找分类列表
 */
export const findCategoryList = params => {
    return axios.post(`/category`, params)
}

/**
 * 根据_id 编辑分类信息
 * @param {String} _id 分类_id
 * @param {String} name 分类名称
 */
export const editCategoryById = (_id, params) => {
    return axios.put(`/category/${_id}`, params)
}

/**
 * 根据_id 删除单个分类
 * @param {String} _id 分类_id
 */
export const deleteCategoryById = _id => {
    return axios.delete(`/category/${_id}`)
}