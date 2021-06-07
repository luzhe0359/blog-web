import { userLogin, userLogout } from 'src/api/user.js'
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from 'src/utils/auth'


const user = {
    namespaced: true,
    state: {
        token: '',
        name: '',
        nickname: '',
        avatar: '/images/default_avatar.jpeg',
        role: '',
        about: '',
        likeArticles: []
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
        SET_LIKES_ARTICLE: (state, likeArticles = []) => {
            state.likeArticles = likeArticles
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
                    commit('SET_LIKES_ARTICLE', user.likeArticles)
                    resolve(token)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 登出
        Logout ({ commit }, user) {
            return new Promise((resolve, reject) => {
                userLogout(user).then((response) => {
                    removeUser()
                    removeToken()
                    commit('SET_TOKEN', '')
                    commit('SET_NAME', '')
                    commit('SET_NICKNAME', '')
                    commit('SET_AVATAR', '')
                    commit('SET_ROLE', '')
                    commit('SET_ABOUT', '')
                    commit('SET_LIKES_ARTICLE', [])
                    resolve()
                }).catch(err => {
                    removeUser()
                    removeToken()
                    commit('SET_TOKEN', '')
                    commit('SET_NAME', '')
                    commit('SET_NICKNAME', '')
                    commit('SET_AVATAR', '')
                    commit('SET_ROLE', '')
                    commit('SET_ABOUT', '')
                    commit('SET_LIKES_ARTICLE', [])
                    reject(err)
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
            commit('SET_LIKES_ARTICLE', user.likeArticles || [])
        },
    }
}

export default user