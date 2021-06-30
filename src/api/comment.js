/**
 * @FileDescription: 评论API
 * @Author: zugelu
 * @qq: 1141178844
 */
import { axios } from 'boot/axios.js'

/**
 * @description: 查找评论列表
 * @param {String} content 父评论内容
 * @param {Number} pageNum 当前页码
 * @param {Number} pageSize 每页条数
 * @param {String} sortBy 排序字段
 * @param {String} descending 1升序/-1降序
 */
export const findCommentList = params => {
    return axios.get('/comment/list', { params })
}

/**
 * 添加评论
 * @param {ObjectId} articleId 文章id
 * @param {ObjectId} commentId 评论id
 * @param {ObjectId} to 对谁评论
 * @param {String} content 评论内容
 * @param {Number} level 评论层级
 */
export const addComment = params => {
    return axios.post(`/comment/add`, params)
}

/**
 * 点赞评论
 * @param {ObjectId} commentId 父评论_id
 * @param {ObjectId} otherCommentId 子评论_id
 * @param {ObjectId} userId 用户_id
 */
export const likeComment = params => {
    return axios.post(`/comment/like`, params)
}
