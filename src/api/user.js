/**
 * @FileDescription: 用户API
 * @Author: zugelu
 * @qq: 1141178844
 */
import { axios } from 'boot/axios'

/**
 * @description: 用户登录
 * @param {String} username 用户名
 * @param {String} password 密码(aes加密)
 */
export const userLogin = params => {
    return axios.post('/user/login', params)
}

/**
 * @description: 用户退出
 * @param null
 */
export const userLogout = () => {
    return axios.post('/user/logout')
}

/**
 * @description: 用户注册
 * @param {String} username 用户名
 * @param {String} password 密码(aes加密)
 * @param {String} email 邮箱
 * @param {String} code 验证码
 */
export const userRegister = params => {
    return axios.post('/user/add', params)
}

/**
 * @description: 修改密码
 * @param {String} password 新密码(aes加密)
 * @param {String} email 邮箱
 * @param {String} code 验证码
 */
export const changePassword = params => {
    return axios.post('/user/password', params)
}

/**
 * @description: 发送验证码
 * @param {String} email 邮箱
 * @param {String} username 用户名
 */
export const sendEmailCode = params => {
    return axios.post('/user/code', params)
}

/**
 * @description: 校验用户名
 * @param {String} username 用户名
 */
export const hasUsername = params => {
    return axios.post('/user/username', params)
}

/**
 * @description: 校验昵称
 * @param {String} nickname 昵称
 */
export const hasNickname = params => {
    return axios.post('/user/nickname', params)
}

/**
 * @description: 校验邮箱
 * @param {String} nickname 昵称
 */
export const hasEmail = params => {
    return axios.post('/user/email', params)
}

/**
 * @description: 查找单个用户
 * @param {ObjectId} _id 用户_id
 */
export const findUserById = _id => {
    return axios.get(`/user/${_id}`)
}

/**
 * @description: 编辑用户
 * @param {ObjectId} _id 用户_id
 * @param {String} nickname 用户昵称
 * @param {Number} age 年龄
 * @param {Number} gender 用户性别 0:女 | 1:男 | -1:保密*
 * @param {String} email 用户邮箱
 * @param {String} avatar 用户头像
 * @param {String} about 用户个人简介
 * @param {Array} role 用户角色 ['admin','editor']
 */
export const editUserById = (_id, params) => {
    return axios.put(`/user/${_id}`, params)
}

