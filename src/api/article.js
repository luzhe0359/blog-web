/**
 * @FileDescription: 文章API
 * @Author: zugelu
 * @qq: 1141178844
 */
import { axios } from 'boot/axios.js'

/**
 * @description: 查找文章列表
 * @param {String} title 文章名称
 * @param {Number} pageNum 当前页码
 * @param {Number} pageSize 每页条数
 * @param {String} sortBy 排序字段
 * @param {String} descending 1升序/-1降序
 */
export const findArticleList = params => {
    return axios.get('/article/list', { params })
}

/**
 * @description: 添加文章
 * @param {String} title 文章标题
 * @param {String} desc 文章描述
 * @param {String} mdContent 文章内容md
 * @param {String} htmlContent 文章内容html
 * @param {Array} tags 文章标签
 * @param {Array} category 文章分类
 * @param {Array} type 文章类型 1:原创 | 2:转载
 * @param {Array} state 文章状态 1:已发布 | 2:草稿 | 3:垃圾箱
 * @param {String} author 文章作者_id
 */
export const addArticle = params => {
    return axios.post('/article/add', params)
}

/**
 * @description: 查找单个文章
 * @param {ObjectId} _id 文章_id
 */
export const findArticleById = (_id, params) => {
    return axios.get(`/article/${_id}`, { params })
}

/**
 * @description: 编辑单个文章
 * @param {ObjectId} _id 文章_id
 * @param {Object} body 同：添加文章API
 */
export const editArticleById = (_id, params) => {
    return axios.put(`/article/${_id}`, params)
}

/**
 * @description: 删除单个文章
 * @param {ObjectId} _id 文章_id
 */
export const deleteArticleById = _id => {
    return axios.delete(`/article/${_id}`)
}

/**
 * @description: 文章点赞
 * @param {ObjectId} _id 文章_id
 */
export const likeArticle = (params) => {
    return axios.post('/article/like', params)
}
/**
 * @description: 取消点赞
 * @param {ObjectId} _id 文章_id
 */
export const nolikeArticle = (params) => {
    return axios.post('/article/nolike', params)
}

/**
 * @description: 文章信息统计
 * @param null
 */
export const countArticle = () => {
    return axios.post('/article/count')
}
