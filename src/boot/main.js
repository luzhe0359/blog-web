import Vue from 'vue'
import { Loading, QSpinnerBall } from 'quasar'
// 设置默认url
Vue.prototype.$url = process.env.URL
// 设置默认loading样式
Loading.setDefaults({
    spinner: QSpinnerBall,
    spinnerColor: 'red',
})


import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
Viewer.setDefaults({
    Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
})

import './notify' // 弹窗
import './filter' // 过滤器
import './markdown' // markdown

export default async ({ app, router, store, Vue }) => {
    // logo(默认展位图图片)
    Vue.prototype.$BASE_IMG_URL = 'https://oss.zugelu.com/other/logo.webp'
    // 初始化 store
    store.dispatch('user/InitUser')
}