<template>
  <q-page>
    <!-- header -->
    <div class="page-header">
      <div class="absolute-center full-width">
        <div class="slogan text-center q-pt-xl q-pb-md">
          <h1 class="title text-h4 text-white"> 要逼自己优秀，然后骄傲的活着。 </h1>
          <p class="text-subtitle1 text-grey q-pt-lg">Force yourself to be excellent and live with pride. </p>
        </div>
      </div>
    </div>
    <!-- inner -->
    <PageInner>
      <template v-slot:inner-left>
        <q-card>
          <q-card-section class="q-pa-md">
            <!-- 关于我 -->
            <div class="row items-center">
              <q-spinner-audio color="light-blue" size="1rem" />
              <span class="text-h6">关于我</span>
            </div>
            <div class="content-box text-body1">
              <div class="short-title"> 朋友们都叫我 “毛路” </div>
              <div class="short-desc">
                <div>90后，一名前端开发者，现居北京</div>
                <div>喜欢折腾各种前端技术，但又不精通，算是一个硬伤</div>
                <div>爱代码、爱电影、爱篮球、爱游戏 (刷过地下城BOSS，打过CF枪战，跑过QQ飞车，玩过LOL五黑）</div>
              </div>
            </div>
            <!-- 关于本站-->
            <div class="row items-center">
              <q-spinner-audio color="light-blue" size="1rem" />
              <span class="text-h6">关于本站</span>
            </div>
            <div class="content-box text-body1 q-ml-md">
              <div class="short-title">
                <h1 class="text-body1">本站 <a class="text-light-blue" target="_blank" href="https://zugelu.com">zugelu.com</a> 属于个人博客</h1>
              </div>
              <div class="short-desc">
                搭建这个博客的主要目的是记录并分享一些实用的编码技巧、折腾经历、生活记录等 <br>
                当然，有意向写文章的朋友可以联系我开通后台权限，在本站发表属于你自己的文章 <br>
              </div>
              <div class="short-desc">
                本站所使用的技术栈如下：<br>
                前端： vue quasar axios <br>
                后端： node express mongodb redis <br>
                其他： git pm2
              </div>
            </div>
            <!-- 关于建站记录-->
            <div class="row items-center">
              <q-spinner-audio color="light-blue" size="1rem" />
              <span class="text-h6">记录博客建站的点滴</span>
            </div>
            <div class="content-box">
              <q-timeline layout="dense" color="grey-3">
                <q-timeline-entry v-for="item in timelineList" :key="item._id">
                  <template v-slot:title>
                    <div class="text-h6">{{item.title}}</div>
                  </template>
                  <template v-slot:subtitle>
                    <div class="text-subtitle1">{{item.date}}</div>
                  </template>
                  <div class="text-body1 text-grey-8">{{item.body}}</div>
                </q-timeline-entry>
              </q-timeline>
            </div>
            <div class="column items-center" v-if="timelineList.length === 0">
              <img class="q-mt-lg" alt="not_found" src="https://oss.zugelu.com/other/not_found.png" width="350px">
              <div class="text-grey-8 q-mt-md text-subtitle1">暂无记录</div>
            </div>
          </q-card-section>
        </q-card>
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
import SideBar from 'src/components/SideBar/SideBar'
import NotFound from 'components/Common/NotFound'

export default {
  name: 'About',
  components: {
    PageInner,
    SideBar,
    NotFound
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    return Promise.all([
      store.dispatch('about/LoadTimelineList')
    ])
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'timelineList'
    ]),
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
    }
  }
}
</script>
<style lang="scss" scoped>
.page-header {
  background-image: url("https://oss.zugelu.com/other/bg_about.jpg");
}
/deep/ .q-spinner {
  margin-right: 0.5rem;
}
.content-box {
  margin-left: 1.5rem;
  margin-bottom: 2rem;
  .short-title {
    margin-top: 1rem;
  }
  .short-desc {
    margin-top: 1rem;
  }
  .text-body1 {
    white-space: pre-wrap;
  }
}
</style>