<template>
  <q-page class="max-width row">
    <div id="articleList" class="col">
      <div class="friends gt-sm">Hey Friends！</div>
      <div class="welcome gt-sm">Welcome</div>
      <!-- 分类列表 -->
      <TabList :tabList="categoryList" @changeTab="changeTab" />
      <!-- 文章列表 -->
      <ArticleCardList direction="row" :articleList="articleList" />
      <!-- 文章分页 -->
      <q-no-ssr v-if="articlePageCount > 1">
        <q-pagination color="grey" class="q-mb-sm justify-center" v-model="pageNum" :max="articlePageCount" :max-pages="5" :direction-links="true" :boundary-numbers="true" :boundary-links="true" @input="changePage"></q-pagination>
      </q-no-ssr>
    </div>
    <div class="col-md-4 gt-sm q-pl-lg">
      <SideBar />
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

import SideBar from 'src/components/SideBar/SideBar'
import ArticleCardList from 'src/components/ArticleList/ArticleCardList'
import TabList from 'src/components/ArticleList/TabList'

let defaultParams = {
  state: 1, // state 文章发布状态 | 1:已发布 | 2:草稿 | 3:垃圾箱
  pageNum: 1,
  pageSize: 10
}
export default {
  name: 'ArticleList',
  components: {
    TabList,
    ArticleCardList,
    SideBar
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
  mounted () {
  },
  methods: {
    // 切换文章分类
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
      let params = {
        pageNum: current,
        pageSize: this.pageSize,
      }
      this.$store.dispatch('article/LoadArticleList', params)
    },
  }
}
</script>
<style lang="scss" scoped>
#articleList {
  color: #ffffff;
  /deep/ .q-tab__indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
  .friends {
    margin-top: 120px;
    font-size: 26px;
    font-weight: 400;
    line-height: 32px;
    animation: bounce-in-top 1.1s both;
  }
  .welcome {
    font-size: 60px;
    font-weight: 600;
    line-height: 76px;
    animation: bounce-in-top 1.1s both;
  }
}
</style>