import { findMessageList, addMessage } from 'src/api/message.js'

const count = {
    namespaced: true,
    state: {
        messageList: [], // 留言
        messagePageCount: 0 // 留言总数
    },
    mutations: {
        SET_MESSAGE_LIST: (state, list) => {
            state.messageList = list
        },
        SET_MESSAGE_PAGE_COUNT: (state, pageCount = 0) => {
            state.messagePageCount = pageCount
        },
    },
    actions: {
        // 留言列表 
        LoadMessageList ({ commit }, parmas) {
            return new Promise((resolve, reject) => {
                findMessageList(parmas).then(res => {
                    commit('SET_MESSAGE_LIST', res.data)
                    commit('SET_MESSAGE_PAGE_COUNT', res.pageCount)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 添加留言
        AddMessage ({ commit }, parmas) {
            return new Promise((resolve, reject) => {
                addMessage(parmas).then(res => {
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}

export default count