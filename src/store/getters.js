const getters = {
    // 用户
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    nickname: state => state.user.nickname,
    role: state => state.user.role,
    about: state => state.user.about,
    likeArticles: state => state.user.likeArticles,
    theme: state => state.user.theme,
    column: state => state.user.column,
    // 文章
    articleList: state => state.article.articleList,
    hotArticleList: state => state.article.hotArticleList,
    topArticleList: state => state.article.topArticleList,
    articlePageCount: state => state.article.articlePageCount,
    articleDetail: state => state.article.articleDetail,
    categoryList: state => state.article.categoryList,
    tagList: state => state.article.tagList,
    // 时间线
    timelineList: state => state.about.timelineList,
    // 友链
    linkList: state => state.link.linkList,
    // 评论/留言
    commentList: state => state.comment.commentList,
    commentPageCount: state => state.comment.commentPageCount,
}
export default getters