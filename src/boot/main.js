import Vue from 'vue'
import { Loading, QSpinnerBall } from 'quasar'
// 设置默认url
Vue.prototype.$url = process.env.URL
// 设置默认loading样式
Loading.setDefaults({
    spinner: QSpinnerBall,
    spinnerColor: 'red',
})

import './notify' // 弹窗
import './filter' // 过滤器
import './markdown' // 过滤器

export default async ({ app, router, store, Vue }) => {
    // 初始化 store
    store.dispatch('user/InitUser')
    store.dispatch('count/InitCount')
}