import { findCommentList, addComment, likeComment } from 'src/api/comment.js'
import { setUser } from 'src/utils/auth'

const count = {
    namespaced: true,
    state: {
        commentList: [], // 留言/评论
        commentPageCount: 0 // 留言/评论总数
    },
    mutations: {
        SET_COMMENT_LIST: (state, list) => {
            state.commentList = list
        },
        SET_COMMENT_PAGE_COUNT: (state, pageCount = 0) => {
            state.commentPageCount = pageCount
        }
    },
    actions: {
        // 留言/评论列表
        LoadCommentList ({ commit }, parmas) {
            return new Promise((resolve, reject) => {
                findCommentList(parmas).then(res => {
                    commit('SET_COMMENT_LIST', res.data)
                    commit('SET_COMMENT_PAGE_COUNT', res.pageCount)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 添加留言/评论
        AddComment ({ commit }, parmas) {
            return new Promise((resolve, reject) => {
                addComment(parmas).then(res => {
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 评论点赞
        UserLikeComment ({ commit }, _id) {
            return new Promise((resolve, reject) => {
                likeComment({
                    articleId: _id,
                }).then(res => {
                    commit('article/ADD_ARTICLE_LIKES', _id, { root: true })
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