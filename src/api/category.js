/**
 * @FileDescription: 分类API
 * @Author: zugelu
 * @qq: 1141178844
 */
import { axios } from 'boot/axios.js'

/**
 * @description: 查找分类列表
 * @param {String} name 分类名称
 * @param {Number} pageNum 当前页码
 * @param {Number} pageSize 每页条数
 * @param {String} sortBy 排序字段
 * @param {String} descending 1升序/-1降序
 */
export const findCategoryList = params => {
    return axios.get('/category/list', { params })
}
