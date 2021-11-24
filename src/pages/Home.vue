<template>
  <q-page id="Home">
    <!-- header -->
    <div class="page-header">
      <div class="absolute-center full-width">
        <div class="text-center q-py-md">
          <h1 class="text-h3 text-white text-weight-bold">足各路的博客</h1>
          <div class="text-h5 flex-center q-mt-lg">
            <span class="text-grey-4">{{ slogon }}</span>
            <!-- 模拟光标 -->
            <span class="text-white" :class="{'typer-cursor ': shoeTyper}">|</span>
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
      slogon: '',
      slogonArr: ['足各路的博客.', '世上无难事,只要肯攀登。', 'Force yourself to be excellent and live with pride.'],
      order: 0, // 当前slogon索引
      len: 0, // 当前slogon长度
      timer: null
    }
  },
  computed: {
    ...mapGetters([
      'articleList',
      'articlePageCount'
    ]),
    shoeTyper () {
      return this.len > this.slogonArr[this.order].length
    }
  },
  created () {
    console.log('created');
  },
  mounted () {
    console.log('mounted');
    this.typing()
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
    typing () {
      this.timmer = setInterval(this.begin, 150)
    },
    begin () {
      let current = this.slogonArr[this.order] // 数组中的slogon
      this.slogon = current.slice(0, this.len++)
      if (this.len > current.length) { // 打到最后一个字(len自增后等于current.length，所以得大于current.length)
        clearInterval(this.timmer)
        this.timmer = null
        // 输出完暂停2s
        this.timmer = setTimeout(() => {
          clearTimeout(this.timmer)
          this.timmer = null
          this.timmer = setInterval(this.back, 60)
        }, 2000)
      }
    },
    back () {
      let current = this.slogonArr[this.order] // 数组中的slogon
      this.slogon = current.slice(0, this.len--)
      if (this.len === 0) {
        clearInterval(this.timmer)
        this.timmer = null
        if (this.order === this.slogonArr.length - 1) { // 当前为最后一个slogon时，重置索引
          this.order = 0
        } else { // 索引自增
          this.order++
        }
        this.typing()
      }
    }
  },
  beforeDestroy () {
    console.log('beforeDestroy');
    clearInterval(this.timmer)
    this.timmer = null
  }
}
</script>
<style lang="scss" scoped>
.page-header {
  height: 100vh !important;
  > div {
    padding-top: 0;
  }
  .text-h3 {
    animation: titlescale 1s;
  }

  .typer-cursor {
    animation: typer-effect 1s 0.5s linear infinite;
  }
  @keyframes typer-effect {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
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