import Vue from 'vue'
import { Loading, QSpinnerBall } from 'quasar'
// 设置默认url
Vue.prototype.$url = process.env.URL
// 设置默认loading样式
Loading.setDefaults({
    spinner: QSpinnerBall,
    spinnerColor: 'red',
})

// 懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: '/bg/img_loading.gif',
})

import './notify' // 弹窗
import './filter' // 过滤器
import './markdown' // markdown

export default async ({ app, router, store, Vue }) => {
    // 初始化 store
    store.dispatch('user/InitUser')
}