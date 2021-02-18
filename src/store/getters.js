const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    nickname: state => state.user.nickname,
    role: state => state.user.role,
    about: state => state.user.about,
    currentMenu: state => state.user.currentMenu,
}
export default getters