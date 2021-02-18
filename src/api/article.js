import { axios } from 'boot/axios.js'

/**
 * 添加文章
 * @param {String} title 标题
 * @param {String} mdContent 内容md
 * @param {String} htmlContent 内容html
 */
export const addArticle = params => {
    return axios.post(`/article/add`, params)
}

/**
 * 查找文章列表
 */
export const findArticleList = params => {
    return axios.post(`/article`, params)
}

/**
 * 根据_id 查找单个文章
 * @param {String} _id 文章_id
 * @param {Boolean} view 是否已阅读文章
 */
export const findArticleById = (_id, params) => {
    return axios.get(`/article/${_id}`, { params })
}

/**
 * 根据_id 编辑用户信息
 * @param {String} _id 用户_id
 * @param {String} body 用户信息params
 */
export const EditArticleById = (_id, params) => {
    return axios.put(`/article/${_id}`, params)
}

/**
 * 根据_id 删除单个文章
 * @param {String} _id 文章_id
 */
export const deleteArticleById = _id => {
    return axios.delete(`/article/${_id}`)
}

/**
 * 文章点赞
 * @param {String} _id 文章_id
 */
export const likeArticle = (params) => {
    return axios.post(`/article/like`, params)
}
/**
 * 取消点赞
 * @param {String} _id 文章_id
 */
export const nolikeArticle = (params) => {
    return axios.post(`/article/nolike`, params)
}