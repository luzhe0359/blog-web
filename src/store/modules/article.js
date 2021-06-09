import { findArticleById, likeArticle, nolikeArticle } from 'src/api/article.js'
import { findCommentList } from 'src/api/comment.js'
import { setUser } from 'src/utils/auth'

const count = {
    namespaced: true,
    state: {
        articleDetail: {},
        commentList: [],
        commentPageCount: 0
    },
    mutations: {
        SET_ARTICLE_DETAIL: (state, { _id, detail = {} }) => {
            state.articleDetail[_id] = detail
        },
        SET_COMMENT_LIST: (state, { list = [] }) => {
            state.commentList = list
        },
        SET_COMMENT_PAGE_COUNT: (state, pageCount = 0) => {
            state.commentPageCount = pageCount
        },
        ADD_ARTICLE_LIKES: (state, _id) => {
            state.articleDetail[_id].meta.likes++
        },
    },
    actions: {
        // 详情
        LoadArtitcleDetail ({ commit }, _id) {
            return new Promise((resolve, reject) => {
                findArticleById(_id).then(res => {
                    commit('SET_ARTICLE_DETAIL', { _id, detail: res.data })
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 评论列表 
        LoadCommentList ({ commit }, parmas) {
            return new Promise((resolve, reject) => {
                console.log(parmas);
                findCommentList(parmas).then(res => {
                    commit('SET_COMMENT_LIST', { list: res.data })
                    commit('SET_COMMENT_PAGE_COUNT', res.pageCount)
                    resolve(res)
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