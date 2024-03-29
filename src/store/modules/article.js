import { findArticleList, findTopHotArticleList, findArticleById, likeArticle, nolikeArticle } from 'src/api/article.js'
import { findCommentList, addComment, likeComment } from 'src/api/comment.js'
import { findCategoryList } from 'src/api/category.js'
import { findTagList } from 'src/api/tag.js'
import { setUser } from 'src/utils/auth'
import { randomRgbColor, randomFontSize } from 'src/utils/tool'


const count = {
    namespaced: true,
    state: {
        articleList: [], // 文章列表
        topArticleList: [], // 置顶文章
        hotArticleList: [], // 热门文章
        articlePageCount: 0, // 文章总数
        articleDetail: {}, // 文章详情
        categoryList: [], // 文章分类
        tagList: [], // 文章标签
    },
    mutations: {
        SET_ARTICLE_LIST: (state, list) => {
            state.articleList = list
        },
        SET_TOP_ARTICLE_LIST: (state, list) => {
            state.topArticleList = list
        },
        SET_HOT_ARTICLE_LIST: (state, list) => {
            state.hotArticleList = list
        },
        SET_ARTICLE_PAGE_COUNT: (state, pageCount = 0) => {
            state.articlePageCount = pageCount
        },
        SET_ARTICLE_DETAIL: (state, { _id, detail = {} }) => {
            state.articleDetail[_id] = detail
        },
        SET_CATEGORY_LIST: (state, list) => {
            state.categoryList = list
        },
        SET_TAG_LIST: (state, list) => {
            state.tagList = list
        },
        ADD_ARTICLE_LIKES: (state, _id) => {
            state.articleDetail[_id].meta.likes++
        }
    },
    actions: {
        // 文章列表
        LoadArticleList ({ commit }, parmas) {
            return new Promise((resolve, reject) => {
                findArticleList(parmas).then(res => {
                    commit('SET_ARTICLE_LIST', res.data)
                    commit('SET_ARTICLE_PAGE_COUNT', res.pageCount)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 置顶/热门文章列表
        LoadTopHotArticleList ({ commit }, parmas) {
            return new Promise((resolve, reject) => {
                findTopHotArticleList(parmas).then(res => {
                    commit('SET_TOP_ARTICLE_LIST', res.top.list)
                    commit('SET_HOT_ARTICLE_LIST', res.hot.list)
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
                    let list = [{ name: '全部', _id: 'zugelu' }, ...res.data]
                    commit('SET_CATEGORY_LIST', list)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 标签列表
        LoadTagList ({ commit }, parmas) {
            return new Promise((resolve, reject) => {
                findTagList(parmas).then(res => {
                    let list = res.data.map(tag => {
                        tag.color = randomRgbColor()
                        tag.size = randomFontSize()
                        return tag
                    })
                    commit('SET_TAG_LIST', list)

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