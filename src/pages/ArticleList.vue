<template>
  <q-page class="max-width row">
    <div id="articleList" class="col">
      <div class="friends gt-xs">Hey Friends！</div>
      <div class="welcome gt-xs">Welcome</div>
      <!-- 分类列表 -->
      <TabList :tabList="tabList" @changeTab="changeTab" />
      <!-- 文章列表 -->
      <transition name="fade" mode="out-in">
        <ArticleCardList :articleList="articleList" :key="tabId" />
      </transition>
      <!-- 文章分页 -->
      <transition name="page">
        <q-pagination v-if="!loading && max > 1" color="grey" class="q-mb-sm justify-center" v-model="currentPage" :max="max" :max-pages="5" :direction-links="true" :boundary-numbers="true" :boundary-links="true" @input="changePage"></q-pagination>
      </transition>
    </div>
    <div class="col-md-4 gt-sm q-pl-lg">
      <SideBar />
    </div>
  </q-page>
</template>

<script>
import { findCategoryList } from 'src/api/category.js'
import { findArticleList } from 'src/api/article.js'
import BaseContainer from 'src/components/Container/BaseContainer'
import SideBar from 'src/components/SideBar/SideBar'
import ArticleCardList from 'src/components/ArticleList/ArticleCardList'
import TabList from 'src/components/ArticleList/TabList'

export default {
  name: 'ArticleList',
  components: {
    BaseContainer,
    TabList,
    ArticleCardList,
    SideBar
  },
  data () {
    return {
      tabList: [], // 文章分类
      articleList: [], // 文章列表
      tabId: 'zugelu', // 当前分类Id
      currentPage: 1, // 当前页
      pageSize: 5,
      max: 1, // 总页数
      loading: true, // 是否展示分页（切换tab强制渲染）
    }
  },
  mounted () {
    this.findCategoryListFn()
    this.findArticleListFn()
  },
  methods: {
    // 获取文章分类
    findCategoryListFn () {
      findCategoryList().then(res => {
        this.tabList = [{ name: 'ALL', _id: 'zugelu' }, ...res.data]
      })
    },
    // 获取文章列表
    findArticleListFn () {
      this.loading = true
      // state 文章发布状态 | 1:已发布 | 2:草稿 | 3:垃圾箱
      let params = { pageNum: this.currentPage, pageSize: this.pageSize, state: 1 }
      if (this.tabId !== 'zugelu') {
        params['category'] = this.tabId
      }
      findArticleList(params).then(res => {
        this.articleList = res.data
        this.max = res.pageCount

        this.loading = false
      })
    },
    // 切换文章分类
    changeTab (tabId) {
      this.tabId = tabId
      this.currentPage = 1 // 切换tab重置页码
      this.findArticleListFn()
    },
    // 切换页码
    changePage (current) {
      this.currentPage = current
      this.findArticleListFn()
    }
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
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
  .fade-enter {
    opacity: 0;
    transform: translate3d(-50px, 0, 0);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translate3d(-50px, 0, 0);
  }
  // page动画
  .page-enter-active {
    transition: all 0.8s ease-in;
  }
  .page-leave-active {
    transition: 0s;
  }
  .page-enter {
    opacity: 0;
  }

  .page-leave-to {
    opacity: 0;
  }
}
</style>