import { axios } from 'boot/axios.js'

/**
 * 添加时间线
 * @param {String} name 时间线
 */
export const addTimeline = params => {
    return axios.post(`/timeline/add`, params)
}

/**
 * 查找时间线列表
 */
export const findTimelineList = params => {
    return axios.get(`/timeline/list`, { params })
}

/**
 * 根据_id 编辑时间线
 * @param {String} _id 时间线_id
 * @param {String} name 时间线
 */
export const editTimelineById = (_id, params) => {
    return axios.put(`/timeline/${_id}`, params)
}

/**
 * 根据_id 删除单个时间线
 * @param {String} _id 时间线_id
 */
export const deleteTimelineById = _id => {
    return axios.delete(`/timeline/${_id}`)
}