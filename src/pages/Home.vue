<template>
  <q-page id="Home">
    <!-- header -->
    <div class="page-header">
      <div class="absolute-center full-width">
        <div class="text-center q-py-md">
          <h1 class="text-h3 text-white text-weight-bold">足各路的博客</h1>
          <div class="flex-center">
            <!-- <span class="text-subtitle1 text-grey q-pt-md">世上无难事,只要肯攀登。</span> -->
            <!-- <p class="text-subtitle1 text-grey q-pt-md" :class="{'focus-in-contract':$q.screen.gt.md}">Force yourself to be excellent and live with pride.</p> -->
          </div>
        </div>
      </div>
      <div class="scroll-down cursor-pointer text-center" @click="scrollToMain">
        <q-icon class="scroll-down-effect" name="keyboard_arrow_down" size="50px" color="white" />
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
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll
import { mapGetters } from 'vuex'

import PageInner from 'components/common/PageInner'
import SideBar from 'src/components/SideBar/SideBar'
import ArticleCardList from 'components/ArticleList/ArticleCardList'

let defaultParams = {
  state: 1, // state 文章发布状态 | 1:已发布 | 2:草稿 | 3:垃圾箱
  pageNum: 1,
  pageSize: 10
}
export default {
  name: 'Home',
  components: {
    PageInner,
    SideBar,
    ArticleCardList
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    return Promise.all([
      store.dispatch('article/LoadArticleList', defaultParams),
    ])
  },
  data () {
    return {
      pageNum: defaultParams.pageNum,
      pageSize: defaultParams.pageSize,
      slogon: "世上无难事,只要肯攀登。",
      timer: null
    }
  },
  computed: {
    ...mapGetters([
      'articleList',
      'articlePageCount'
    ]),
  },
  mounted () {

  },
  methods: {
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
      this.$store.dispatch('article/LoadArticleList', params)
    },
    // 滚动到内容区
    scrollToMain () {
      let el = document.getElementsByClassName('page-inner')[0]
      this.scrollToElement(el)
    },
    // 滚动到元素
    scrollToElement (el) {
      let target = getScrollTarget(el)
      let offset = target.innerHeight // 滚动位置
      let duration = 300 // 动画时长
      setScrollPosition(target, offset, duration)
    },
    // 打字效果
  }
}
</script>
<style lang="scss" scoped>
.page-header {
  height: 100vh !important;
  .text-h3 {
    animation: titlescale 1s;
  }
  .scroll-down {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    .scroll-down-effect {
      animation: scroll-down-effect 1.5s infinite;
    }
  }
}
</style>