<template>
  <q-page id="Category">
    <!-- header -->
    <div class="page-header">
      <div class="absolute-center full-width">
        <h1 class="text-h4 text-center q-mb-lg">文章分类</h1>
        <!-- 分类列表 -->
        <q-tabs v-model="currentId" align="center" dense outside-arrows mobile-arrows narrow-indicator animated active-color="light-blue" indicator-color="light-blue">
          <q-tab :name="tab._id" :label="tab.name" v-for="tab in categoryList" :key="tab._id" @click="changeTab(tab._id)" />
        </q-tabs>
      </div>
    </div>
    <!-- inner -->
    <PageInner>
      <template v-slot:inner-left>
        <!-- 文章列表 -->
        <ArticleCardList :articleList="articleList" />
        <q-no-ssr v-if="articlePageCount > 1">
          <q-pagination class="q-mb-sm justify-center" v-model="pageNum" :max="articlePageCount" @input="changePage" color="grey" :max-pages="5" :direction-links="true" :boundary-numbers="true" :boundary-links="true"></q-pagination>
        </q-no-ssr>
      </template>
      <template v-slot:inner-right>
        <!-- 右侧边栏 -->
        <SideBar />
      </template>
    </PageInner>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

import PageInner from 'components/common/PageInner'
import SideBar from 'components/SideBar/SideBar'
import ArticleCardList from 'components/ArticleList/ArticleCardList'

let defaultParams = {
  state: 1, // state 文章发布状态 | 1:已发布 | 2:草稿 | 3:垃圾箱
  pageNum: 1,
  pageSize: 5
}
export default {
  components: {
    PageInner,
    SideBar,
    ArticleCardList
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
      currentId: 'zugelu'
    }
  },
  computed: {
    ...mapGetters([
      'articleList',
      'articlePageCount',
      'categoryList'
    ]),
  },
  methods: {
    // 切换分类
    changeTab (TabId) {
      if (this.currentId === TabId) return
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
      if (this.currentId !== 'zugelu') {
        params['category'] = this.currentId
      }
      this.$store.dispatch('article/LoadArticleList', params)
    }
  },
}
</script>
<style lang="scss" scoped>
.page-header {
  background-image: url("~assets/body-hand.jpg");
}
</style>