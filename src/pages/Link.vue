<template>
  <q-page>
    <!-- header -->
    <div class="page-header">
      <div class="absolute-center full-width">
        <div class="slogan text-center q-pt-xl q-pb-md">
          <h1 class="title text-h4 text-white">
            如果可以 , 带着你的
            <q-btn round icon="iconfont icon-youlianguanliicon" /> ,
            我们把酒言欢 。
          </h1>
          <p class="text-subtitle1 text-grey q-pt-lg">如您添加了小站链接，请邮件告知 <span class="text-grey-5 cursor-pointer" @click="copy($event)">luzhe0359@163.com</span> </p>
        </div>
      </div>
    </div>
    <!-- inner -->
    <PageInner>
      <template v-slot:inner-left>
        <!-- 友链列表 -->
        <div class="row ">
          <div class="col">
            <div class="row q-col-gutter-md">
              <q-intersection transition="scale" class="card-box cursor-pointer col-lg-4 col-md-4 col-sm-6 col-xs-12" v-for="item in linkList" :key="item._id">
                <q-card>
                  <q-card-section class="q-pa-md" horizontal>
                    <!-- 头像logo -->
                    <div class="col-4 flex flex-center">
                      <q-avatar size="66px">
                        <!-- <img src="https://cdn.quasar.dev/img/avatar.png"> -->
                        <img src="https://oss.zugelu.com/avatar/photo-1636113734960.jpg">
                      </q-avatar>
                    </div>
                    <!-- 网站名、简介 -->
                    <div class="col column justify-center">
                      <div class="text-subtitle1 ellipsis full-width">{{item.title}}{{item.title}}</div>
                      <div class="text-subtitle2 ellipsis-2-lines text-grey-8">{{item.desc}}{{item.desc}} </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-intersection>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:inner-right>
        <!-- 右侧边栏 -->
        <SideBar />
      </template>
    </PageInner>
  </q-page>
</template>

<script>
import { copyToClipboard } from 'quasar'
import { mapGetters } from 'vuex'

import PageInner from 'components/common/PageInner'
import SideBar from 'src/components/SideBar/SideBar'

export default {
  name: 'Link',
  components: {
    PageInner,
    SideBar
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    return Promise.all([
      store.dispatch('link/LoadLinkList')
    ])
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'linkList'
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
    },
    // 复制
    copy (e) {
      copyToClipboard(e.currentTarget.innerHTML)
        .then(() => {
          this.$msg.success('复制成功')
        })
        .catch(() => {
          this.$msg.error('复制失败')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.card-box {
  height: 100%;
  min-height: 122px;
  min-width: 25%;
  .q-card__section {
    height: 122px;
  }
}
</style>