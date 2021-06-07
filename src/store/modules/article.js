import { findArticleById, likeArticle, nolikeArticle } from 'src/api/article.js'
import { setUser } from 'src/utils/auth'

const count = {
    namespaced: true,
    state: {
        articleDetail: {},
        // articleDetail
    },
    mutations: {
        SET_ARTICLE_DETAIL: (state, { _id, detail = {} }) => {
            state.articleDetail[_id] = detail
        },
        ADD_ARTICLE_LIKES: (state, _id) => {
            state.articleDetail[_id].meta.likes++
            // state.articleDetail[_id]['meta.likes'] = detail
        },
    },
    actions: {
        // 详情
        GetArtitcleDetail ({ commit }, _id) {
            return new Promise((resolve, reject) => {
                findArticleById(_id).then(res => {
                    commit('SET_ARTICLE_DETAIL', { _id, detail: res.data })
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 点赞
        UserLikeArtitcle ({ commit }, _id) {
            return new Promise((resolve, reject) => {
                likeArticle({
                    articleId: _id,
                }).then(res => {
                    commit('ADD_ARTICLE_LIKES', _id)
                    setUser(res.data)
                    commit('user/SET_LIKES_ARTICLE', res.data.likeArticles, { root: true })
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}

export default count