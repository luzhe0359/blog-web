import Vue from 'vue'

// 设置默认url
Vue.prototype.$url = process.env.URL

export default async ({ app, router, store, Vue }) => {
    // 初始化 store
    store.dispatch('user/InitUser')
}