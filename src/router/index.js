import Vue from 'vue'
import VueRouter from 'vue-router'
import { Loading, QSpinnerGears, Cookies, scroll } from 'quasar'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default async ({ store, ssrContext }) => {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies
  const router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  router.beforeEach((to, from, next) => {
    Loading.show({
      spinner: QSpinnerGears,
      spinnerColor: 'red',
      messageColor: 'black',
      backgroundColor: '#000',
      message: '加载中 . . .'
    })

    // 登录后返回之前的页面
    if (to.fullPath === "/login") {
      // console.log('from' + from.fullPath);
      next({
        path: "/login",
        query: {
          redirect: from.fullPath // 记录当前是从哪里跳过去的,在登录后直接返回原来的页面
        }
      })
    }
    next()
  })

  router.afterEach(() => {
    Loading.hide()
  })

  return router
}

