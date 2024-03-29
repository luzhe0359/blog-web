import { findTimelineList } from 'src/api/timeline.js'

const count = {
    namespaced: true,
    state: {
        timelineList: [],
    },
    mutations: {
        SET_TIMELINE: (state, list) => {
            state.timelineList = list
        },
    },
    actions: {
        // 时间线
        LoadTimelineList ({ commit }, params) {
            return new Promise((resolve, reject) => {
                findTimelineList(params).then(res => {
                    commit('SET_TIMELINE', res.data)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}

export default count