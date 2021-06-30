/**
 * @FileDescription: 留言API
 * @Author: zugelu
 * @qq: 1141178844
 */
import { axios } from 'boot/axios.js'

/**
 * @description: 查找留言列表
 * @param {String} content 父留言内容
 * @param {Number} pageNum 当前页码
 * @param {Number} pageSize 每页条数
 * @param {String} sortBy 排序字段
 * @param {String} descending 1升序/-1降序
 */
export const findMessageList = params => {
    return axios.get('/message/list', { params })
}

/**
 * 添加留言
 * @param {ObjectId} commentId 留言id
 * @param {ObjectId} to 对谁留言
 * @param {String} content 留言内容
 * @param {Number} level 留言层级
 */
export const addMessage = params => {
    return axios.post(`/message/add`, params)
}
