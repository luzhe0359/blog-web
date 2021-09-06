const getters = {
    // 用户
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    nickname: state => state.user.nickname,
    role: state => state.user.role,
    about: state => state.user.about,
    likeArticles: state => state.user.likeArticles,
    // 文章
    articleList: state => state.article.articleList,
    articlePageCount: state => state.article.articlePageCount,
    articleDetail: state => state.article.articleDetail,
    categoryList: state => state.article.categoryList,
    tagList: state => state.article.tagList,
    commentList: state => state.article.commentList,
    commentPageCount: state => state.article.commentPageCount,
    // 时间线
    timelineList: state => state.about.timelineList,
    // 友链
    linkList: state => state.link.linkList,
    // 留言
    messageList: state => state.message.messageList,
    messagePageCount: state => state.message.messagePageCount,
}
export default getters