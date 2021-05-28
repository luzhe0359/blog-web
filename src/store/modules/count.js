import { getCount, setCount } from 'src/utils/count'
import { countArticle } from 'src/api/article.js'

const count = {
    namespaced: true,
    state: {
        views: 0,
        likes: 0,
    },
    mutations: {
        SET_VIEWS: (state, views) => {
            state.views = views
        },
        SET_LIKES: (state, likes) => {
            state.likes = likes
        },
        ADD_VIEW: (state) => {
            state.views++
        },
        ADD_LIKE: (state) => {
            state.likes++
        },
    },
    actions: {
        SetViews ({ commit }, views) {
            commit('SET_VIEWS', views)
        },
        SetLikes ({ commit }, likes) {
            commit('SET_LIKES', likes)
        },
        AddView ({ commit }) {
            commit('ADD_VIEW')
        },
        AddLike ({ commit }) {
            commit('ADD_LIKE')
        },
        // 初始化统计信息
        InitCount ({ commit }) {
            countArticle().then((res) => {
                setCount(res.data)
                let { views, likes } = res.data
                commit('SET_VIEWS', views || 0)
                commit('SET_LIKES', likes || 0)
            })
        },
    }
}

export default count