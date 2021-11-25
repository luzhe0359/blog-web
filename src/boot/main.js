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
import './markdown' // markdown

export default async ({ app, router, store, Vue }) => {
    // logo(默认展位图图片)
    Vue.prototype.$BASE_IMG_URL = 'https://oss.zugelu.com/other/not_found.png'
    // 初始化 store
    store.dispatch('user/InitUser')
}