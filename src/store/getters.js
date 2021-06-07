const getters = {
    // 用户
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    nickname: state => state.user.nickname,
    role: state => state.user.role,
    about: state => state.user.about,
    // currentMenu: state => state.user.currentMenu,
    likeArticles: state => state.user.likeArticles,
    // 统计
    views: state => state.count.views,
    likes: state => state.count.likes,
    // 文章
    articleDetail: state => state.article.articleDetail,
}
export default getters