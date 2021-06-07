import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import count from './modules/count'
import article from './modules/article'
import getters from './getters'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      user,
      count,
      article
    },
    getters,
    // 启用严格模式（增加开销！）
    // 仅适用于开发模式
    strict: process.env.DEBUGGING
  })

  return Store
}
