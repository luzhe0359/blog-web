import { axios } from 'boot/axios.js'

/**
 * 添加评论
 * @param {String} name 评论内容
 */
export const addComment = params => {
    return axios.post(`/comment/add`, params)
}

/**
 * 添加子评论
 * @param {String} name 评论内容
 */
export const addChildComment = params => {
    return axios.post(`/comment/addChild`, params)
}


/**
 * 查找评论列表
 */
export const findCommentList = params => {
    return axios.post(`/comment`, params)
}

/**
 * 根据_id 删除单个评论
 * @param {String} _id 父评论_id
 */
export const deleteCommentById = _id => {
    return axios.delete(`/comment/${_id}`)
}

/**
 * 点赞评论
 * @param {String} commentId 评论_id
 * @param {String} userId 用户_id
 */
export const likeComment = params => {
    return axios.post(`/comment/like`, params)
}

/**
 * 更改评论状态
 * @param {String} _id 父评论_id
 * @param {String} status 状态
 */
export const changeCommentState = (_id, params) => {
    return axios.put(`/comment/state/${_id}`, params)
}