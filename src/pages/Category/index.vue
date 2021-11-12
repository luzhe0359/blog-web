<template>
  <q-page id="Category">
    <!-- header -->
    <Header @changeTab="changeTab" />
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
      store.dispatch('article/LoadArticleList', defaultParams)
    ])
  },
  data () {
    return {
      pageNum: defaultParams.pageNum,
      pageSize: defaultParams.pageSize,
      currentId: null
    }
  },
  computed: {
    ...mapGetters([
      'articleList',
      'articlePageCount'
    ]),
  },
  methods: {
    // 切换分类
    changeTab (TabId) {
      this.pageNum = 1
      this.currentId = TabId
      this.getList()
    },
    // 切换页码
    changePage (current) {
      this.pageNum = current
      this.getList()
    },
    getList () {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        state: 1 // state 文章发布状态 | 1:已发布 | 2:草稿 | 3:垃圾箱
      }
      if (this.currentId && this.currentId !== 'zugelu') {
        params['category'] = this.currentId
      }
      this.$store.dispatch('article/LoadArticleList', params)
    }
  },
}
</script>
<style lang="scss" scoped>
.q-page {
  max-width: 100% !important;
  padding: 0 !important;
}
</style>