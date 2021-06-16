import { findArticleById, findArticleList, likeArticle, nolikeArticle } from 'src/api/article.js'
import { findCommentList, addComment, likeComment } from 'src/api/comment.js'
import { findCategoryList } from 'src/api/category.js'
import { setUser } from 'src/utils/auth'

const count = {
    namespaced: true,
    state: {
        articleList: [], // 文章列表
        articlePageCount: 0, // 文章评论总数
        articleDetail: {}, // 文章详情
        categoryList: [], // 文章分类
        commentList: [], // 文章评论
        commentPageCount: 0 // 评论总数
    },
    mutations: {
        SET_ARTICLE_LIST: (state, { list = [] }) => {
            state.articleList = list
        },
        SET_ARTICLE_PAGE_COUNT: (state, pageCount = 0) => {
            state.articlePageCount = pageCount
        },
        SET_ARTICLE_DETAIL: (state, { _id, detail = {} }) => {
            state.articleDetail[_id] = detail
        },
        SET_CATEGORY_LIST: (state, { list = [] }) => {
            state.categoryList = list
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
        // 文章列表
        LoadArticleList ({ commit }, parmas) {
            return new Promise((resolve, reject) => {
                findArticleList(parmas).then(res => {
                    commit('SET_ARTICLE_LIST', { list: res.data })
                    commit('SET_ARTICLE_PAGE_COUNT', res.pageCount)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 文章详情
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
        // 分类列表
        LoadCategoryList ({ commit }, parmas) {
            return new Promise((resolve, reject) => {
                findCategoryList(parmas).then(res => {
                    let list = [{ name: 'ALL', _id: 'zugelu' }, ...res.data]
                    commit('SET_CATEGORY_LIST', { list })
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 文章点赞
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
        // 评论列表 
        LoadCommentList ({ commit }, parmas) {
            return new Promise((resolve, reject) => {
                findCommentList(parmas).then(res => {
                    commit('SET_COMMENT_LIST', { list: res.data })
                    commit('SET_COMMENT_PAGE_COUNT', res.pageCount)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 添加评论
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