<template>
  <BaseContainer>
    <div id="articleList">
      <div class="friends">Hey Friends！</div>
      <div class="welcome">Welcome</div>
      <!-- 分类列表 -->
      <TabList :tabList="tabList" @changeTab="changeTab" />
      <!-- 文章列表 -->
      <ArticleCardList :articleList="articleList" />
      <!-- 文章分页 -->
      <q-pagination v-if="isShow" class="justify-center" v-model="current" :max="max" :max-pages="6" :direction-links="true" :boundary-numbers="true" :boundary-links="true" @input="changePage">
      </q-pagination>
      <q-skeleton v-else width="320px" height="36px" style="margin:0 auto;" :animation="'wave'" />
    </div>
  </BaseContainer>
</template>

<script>
import { findCategoryList } from 'src/api/category.js'
import { findArticleList } from 'src/api/article.js'
import BaseContainer from 'src/components/Container/BaseContainer'
import ArticleCardList from 'src/components/ArticleList/ArticleCardList'
import TabList from 'src/components/ArticleList/TabList'

export default {
  name: 'ArticleList',
  components: {
    BaseContainer,
    TabList,
    ArticleCardList
  },
  data () {
    return {
      tabList: [], // 文章分类
      articleList: [], // 文章列表
      tabId: 'zugelu', // 当前分类Id
      current: 1, // 当前页
      max: 1, // 总页数
      isShow: true, // 是否展示分页（切换tab强制渲染）
    }
  },
  mounted () {
    this.findCategoryListFn()
    this.findArticleListFn()
  },
  beforeEnter (to, from, next) {
    console.log('to');
    console.log(to);
    console.log(from);
    next()
  },
  methods: {
    // 获取文章分类
    findCategoryListFn () {
      findCategoryList().then(res => {
        this.tabList = [{ name: 'ALL', _id: 'zugelu' }, ...res.data]
      })
    },
    // 获取文章列表
    findArticleListFn (tabId = 'zugelu') {
      let params = { pageNum: this.current }
      if (tabId !== 'zugelu') {
        params['category'] = tabId
      }
      findArticleList(params).then(res => {
        this.articleList = res.data
        this.max = Math.ceil(res.total / 10)
        this.isShow = true
      })
    },
    // 切换文章分类
    changeTab (tabId) {
      this.current = 1 // 切换tab重置页码
      this.isShow = false
      this.findArticleListFn(tabId)
    },
    // 切换页码
    changePage () {
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
  }
  .welcome {
    font-size: 60px;
    font-weight: 600;
    line-height: 76px;
  }
}
</style>