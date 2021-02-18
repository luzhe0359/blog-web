<template>
  <div
    id="articleList"
    ref="articleList"
    class="q-pb-xl"
  >
    <div class="friends">Hey Friends！</div>
    <div class="welcome">Welcome</div>
    <!-- 分类标签 -->
    <q-tabs
      align="left"
      v-model="tab"
      narrow-indicator
      animated
      class="text-grey"
      active-color="white"
      indicator-color="white"
      @input="changeTab"
      style="height:30px;"
    >
      <q-tab
        style="height:30px;"
        :ripple="false"
        :name="tab._id"
        :label="tab.name"
        v-for="tab in tabList"
        :key="tab._id"
      />
    </q-tabs>
    <!-- 文章内容 -->
    <div class="article-container q-mt-lg">
      <div
        class="article q-mb-lg"
        v-for="article in articleList"
        :key="article._id"
      >
        <div class="article-title ">
          <div class="row">
            <q-space />
            <div class="row items-center q-gutter-x-xs">
              <q-icon :name="'iconfont '+ article.category.icon"></q-icon>
              <div>{{article.category.name}}</div>
            </div>
          </div>
          <div>
            <div
              class="text-h6 q-mt-md q-mb-sm "
              @click="toArticleDetail(article)"
              style="cursor:pointer;"
            >{{article.title}}</div>
            <div
              v-html="article.htmlContent"
              class="ellipsis-2-lines"
            ></div>
          </div>
        </div>
        <div class="line"></div>
        <div class="row q-py-md q-gutter-x-lg article-util ">
          <div class="row q-ml-none">
            <q-icon
              size="20px"
              class="q-mr-xs"
              name="iconfont icon-fangwenliang"
            ></q-icon>
            {{article.meta.views}}
          </div>
          <div>
            <q-icon
              size="20px"
              class="q-mr-xs"
              name="iconfont icon-pinglun"
            >
            </q-icon>
            {{article.meta.comments}}
          </div>
          <div>
            <q-icon
              size="20px"
              class="q-mr-xs"
              name="iconfont icon-xin"
            ></q-icon>
            {{article.meta.likes}}
          </div>
          <q-space />
          <div>
            <q-icon
              size="20px"
              class="q-mr-xs"
              name="iconfont icon-biao"
            ></q-icon>
            {{article.createTime | dateFormat}}
          </div>
        </div>
      </div>
    </div>
    <!-- 文章分页 -->
    <q-pagination
      v-model="current"
      :max="max"
      :max-pages="6"
      :direction-links="true"
      :boundary-numbers="true"
      :boundary-links="true"
      @input="changePage"
    >
    </q-pagination>
  </div>
</template>

<script>
import { findCategoryList } from 'src/api/category.js'
import { findArticleList } from 'src/api/article.js'
import { scroll } from 'quasar'
const { getScrollTarget, getScrollPosition, setScrollPosition } = scroll

export default {
  name: 'ArticleListMain',
  data () {
    return {
      tabList: [], // 文章分类
      articleList: [], // 文章列表
      tab: null, // 当前分类
      tabId: null, // 当前分类Id
      current: 1, // 当前页
      max: 1 // 总页数
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
        this.tabList = [{ name: 'ALL', _id: null }, ...res.data]
      })
    },
    // 获取文章列表
    findArticleListFn () {
      let params = { category: this.tabId, pageNum: this.current }
      findArticleList(params).then(res => {
        this.articleList = res.data
        this.max = Math.ceil(res.total / 10)
      })
    },
    // 切换文章分类
    changeTab (value) {
      this.tabId = value
      this.current = 1 // 当前页重置为1, 防止不存在的页码
      this.findArticleListFn()
    },
    // 切换分页
    changePage (value) {
      this.current = value
      this.findArticleListFn()
    },
    // 查看文章详情
    toArticleDetail (article) {
      // 获取本地存储记录 (拼接，详情页路由)
      let view = this.$q.sessionStorage.getItem(`/articleDetail/${article._id}`)
      // 判断是否浏览过此文章
      if (view === null) { // sessionStorage 为空，即未看过，浏览器+1
        this.$set(article, 'meta.views', article.meta.views++)
      }
      this.$router.push({
        path: `/articleDetail/${article._id}`
      })
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
    font-size: 26px;
    font-weight: 400;
    line-height: 32px;
  }
  .welcome {
    font-size: 62px;
    font-weight: 600;
    line-height: 76px;
  }

  .article {
    color: #000000;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.521);
    overflow: hidden;
    .article-title {
      padding: 35px 35px 0 35px;
    }
    .article-util {
      margin: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 22px 35px 32px;
    }
    .line {
      height: 2px;
      margin: 0 35px;
      background: #000000;
      opacity: 0.2;
    }
  }
}
</style>

