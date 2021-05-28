import { axios } from 'boot/axios'


/**
 * 用户登录
 * @param {String} username 用户名
 * @param {String} password 密码
 */
export const userLogin = params => {
    return axios.post(`/user/login`, params)
}

/**
 * 用户退出
 * @param null
 */
export const userLogout = (_id) => {
    return axios.post(`/user/logout`, _id)
}

/**
 * 用户注册
 * @param {String} username 用户名
 * @param {String} password 密码
 */
export const userRegister = params => {
    return axios.post(`/user/add`, params)
}

/**
 * 根据_id 查找单个用户
 * @param {String} _id 用户_id
 */
export const findUserById = _id => {
    return axios.get(`/user/${_id}`)
}

/**
 * 根据_id 编辑用户信息
 * @param {String} _id 用户_id
 * @param {String} body 用户信息params
 */
export const EditUserById = (_id, params) => {
    return axios.put(`/user/${_id}`, params)
}

/**
 * 根据_id 删除用户信息
 * @param {String} _id 用户_id
 */
export const deleteUserById = _id => {
    return axios.delete(`/user/${_id}`)
}

/**
 * 查找用户列表
 * @param {String} username 用户名
 * @param {String} nickname 昵称
 */
export const findUserList = params => {
    return axios.post(`/user/list`, params)
}

/**
 * 校验用户名 是否已存在 
 * @param {String} username 用户名
 */
export const findUsername = params => {
    return axios.get(`/user`, { params })
}