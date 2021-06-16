/**
 * @FileDescription: 时间线API
 * @Author: zugelu
 * @qq: 1141178844
 */
import { axios } from 'boot/axios.js'

/**
 * @description: 查找时间线列表
 * @param {String} title 时间线标题
 * @param {Number} pageNum 当前页码
 * @param {Number} pageSize 每页条数
 * @param {String} sortBy 排序字段
 * @param {String} descending 1升序/-1降序
 */
export const findTimelineList = params => {
    return axios.get('/timeline/list', { params })
}