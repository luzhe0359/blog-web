import { Notify } from 'quasar'
import { userLogin, userLogout } from 'src/api/user.js'
import { getToken, setToken, removeToken, getUser, setUser, removeUser, getStyle } from 'src/utils/auth'


const user = {
    namespaced: true,
    state: {
        token: '',
        name: '',
        nickname: '',
        avatar: '/images/default_avatar.jpeg',
        role: '',
        about: '',
        currentMenu: '',
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_NICKNAME: (state, nickname) => {
            state.nickname = nickname
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLE: (state, role) => {
            state.role = role
        },
        SET_ABOUT: (state, about) => {
            state.about = about
        },
        SET_CURRENT_ROUTE: (state, route) => {
            state.currentMenu = route
        },
    },
    actions: {
        // 登录
        Login ({ commit }, user) {
            return new Promise((resolve, reject) => {
                userLogin(user).then(res => {
                    const { token, user } = res.data
                    setToken(token)
                    setUser(user)
                    commit('SET_TOKEN', token)
                    commit('SET_NAME', user.username)
                    commit('SET_NICKNAME', user.nickname)
                    commit('SET_AVATAR', user.avatar)
                    commit('SET_ROLE', user.role)
                    commit('SET_ABOUT', user.about)
                    // 登录成功
                    Notify.create({
                        message: '登录成功',
                        color: 'primary'
                    })
                    resolve(token)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        Logout ({ commit }) {
            return new Promise((resolve, reject) => {
                userLogout().then((response) => {
                    removeUser()
                    removeToken()
                    commit('SET_TOKEN', '')
                    commit('SET_NAME', '')
                    commit('SET_NICKNAME', '')
                    commit('SET_AVATAR', '')
                    commit('SET_ROLE', '')
                    commit('SET_ABOUT', '')
                    resolve()
                }).catch(error => {
                    removeUser()
                    removeToken()
                    commit('SET_TOKEN', '')
                    commit('SET_NAME', '')
                    commit('SET_NICKNAME', '')
                    commit('SET_AVATAR', '')
                    commit('SET_ROLE', '')
                    commit('SET_ABOUT', '')
                    reject(error)
                })
            })
        },
        // 初始化用户信息
        InitUser ({ commit }) {
            const user = getUser()
            commit('SET_TOKEN', getToken())
            commit('SET_NAME', user.username || '')
            commit('SET_NICKNAME', user.nickname || '')
            commit('SET_AVATAR', user.avatar || '')
            commit('SET_ROLE', user.role || '')
            commit('SET_ABOUT', user.about || '')
        },
        // 当前路由
        SetCurrentMenu ({ commit }, route) {
            commit('SET_CURRENT_ROUTE', route.path)
        }
    }
}

export default user