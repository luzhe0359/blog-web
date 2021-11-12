<template>
  <q-page id="Home">
    <!-- header -->
    <Header :tabList="categoryList" @changeTab="changeTab" />
    <!-- main -->
    <Main :articleList="articleList" :pageNum="pageNum" :articlePageCount="articlePageCount" @changePage="changePage" />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

import Header from './header'
import Main from './main'

let defaultParams = {
  state: 1, // state 文章发布状态 | 1:已发布 | 2:草稿 | 3:垃圾箱
  pageNum: 1,
  pageSize: 5,
  isTop: true
}
export default {
  components: {
    Header,
    Main
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    return Promise.all([
      store.dispatch('article/LoadArticleList', defaultParams),
      store.dispatch('article/LoadCategoryList')
    ])
  },
  data () {
    return {
      pageNum: defaultParams.pageNum, // 当前页
      pageSize: defaultParams.pageSize,
    }
  },
  computed: {
    ...mapGetters([
      'articleList',
      'categoryList',
      'articlePageCount',
    ]),
  },
  methods: {
    // 切换分类
    changeTab (tabId) {
      this.pageNum = 1
      // state 文章发布状态 | 1:已发布 | 2:草稿 | 3:垃圾箱
      let params = {
        pageNum: 1, // 切换tab重置页码
        pageSize: this.pageSize,
        state: 1
      }
      if (tabId !== 'zugelu') {
        params['category'] = tabId
      }
      this.$store.dispatch('article/LoadArticleList', params)
    },
    // 切换页码
    changePage (current) {
      this.pageNum = current
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        state: 1
      }
      this.$store.dispatch('article/LoadArticleList', params)
    },
  },
}
</script>
<style lang="scss" scoped>
.q-page {
  max-width: 100% !important;
  padding: 0 !important;
}
</style>