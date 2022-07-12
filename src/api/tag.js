/**
 * @FileDescription: 标签API
 * @Author: zugelu
 * @qq: 1141178844
 */
import { axios } from 'boot/axios.js'

/**
 * @description: 查找标签列表
 * @param {String} name 标签名称
 * @param {Number} pageNum 当前页码
 * @param {Number} pageSize 每页条数
 * @param {String} sortBy 排序字段
 * @param {String} descending 1升序/-1降序
 */
export const findTagList = params => { // findTagCount
    return axios.get('/tag/list')
}