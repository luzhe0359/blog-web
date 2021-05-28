import { axios } from 'boot/axios.js'


/**
 * 文件上传
 * @param {String} 
 */
export const uploadImage = (params) => {
    return axios.post(`/photo/upload`, params)
}

/**
 * 查找图片列表
 */
export const findPhotoList = params => {
    return axios.get(`/photo/list`, { params })
}

/**
 * 查找相册列表
 */
export const findAlbumList = params => {
    return axios.get(`/photo/album`, { params })
}