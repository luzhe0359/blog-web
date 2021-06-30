import { findLinkList } from 'src/api/link.js'

const count = {
    namespaced: true,
    state: {
        linkList: [],
    },
    mutations: {
        SET_LINK: (state, { list = [] }) => {
            state.linkList = list
        },
    },
    actions: {
        // 友链
        LoadLinkList ({ commit }) {
            return new Promise((resolve, reject) => {
                let params = {
                    sortBy: 'isTop',
                    isStop: false,
                    descending: -1
                }
                findLinkList(params).then(res => {
                    commit('SET_LINK', { list: res.data })
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}

export default count