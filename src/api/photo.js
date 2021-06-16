/**
 * @FileDescription: 相册API
 * @Author: zugelu
 * @qq: 1141178844
 */
import { axios } from 'boot/axios.js'

/**
 * @description: 查找相册列表
 */
export const findAlbumList = params => {
    return axios.get('/photo/album', { params })
}

/**
 * @description: 查找图片列表
 * @param {ObjectId} albumId 相册_id
 * @param {Number} pageNum 当前页码
 * @param {Number} pageSize 每页条数
 * @param {String} sortBy 排序字段
 * @param {String} descending 1升序/-1降序
 */
export const findPhotoList = params => {
    return axios.get('/photo/list', { params })
}

/**
 * @description: 文件上传
 * @param {Object} formdata 图片formdata
 */
export const uploadImage = (params) => {
    return axios.post('/photo/upload', params)
}

