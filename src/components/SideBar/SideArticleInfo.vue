<template>
  <div id="SideArticleInfo" class="full-width q-mt-lg">
    <q-tabs v-model="tab" dense class="text-grey" active-color="dark" indicator-color="dark" align="left" :breakpoint="0" narrow-indicator>
      <q-tab name="new_article" label="最新文章" />
      <q-tab content-class="text-h2 title" name="hot_article" label="最热文章" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated swipeable infinite class="bg-transparent">
      <q-tab-panel class="q-pa-none" name="new_article" style="overflow:hidden;">
        <div class="row items-center no-wrap q-mt-md cursor-pointer" v-for="article in articleData" :key="article._id" @click="toArticleDetail(article._id)">
          <q-icon class="q-mr-sm" size="xs" name="iconfont icon-wenzhang" />
          <div class="ellipsis">
            {{article.title}}
            <q-tooltip :delay="1000">
              {{article.title}}
            </q-tooltip>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel class="q-pa-none" name="hot_article" style="overflow:hidden;">
        <div class="row items-center no-wrap q-mt-md cursor-pointer" v-for="article in articleData" :key="article._id" @click="toArticleDetail(article._id)">
          <q-icon class=" q-mr-sm" size="xs" name="iconfont icon-wenzhang" />
          <div class="ellipsis">
            {{article.title}}
            <q-tooltip :delay="1000">
              {{article.title}}
            </q-tooltip>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import { findArticleList } from 'src/api/article.js'

export default {
  name: 'SideArticleInfo',
  data () {
    return {
      tab: 'new_article',
      articleData: [], // 文章列表
    }
  },
  mounted () {
    // 判断是否查找过 最热文章
    let newArticle = this.$q.sessionStorage.getItem('newArticle')
    if (newArticle) {
      this.articleData = newArticle
      return
    }
    this.getNewArticleList()
  },
  methods: {
    // 查找文章列表
    getNewArticleList () {
      let params = {
        pageNum: 1,
        pageSize: 5,
        sortBy: 'meta.views'
      }
      findArticleList(params).then(res => {
        // 缓存
        this.$q.sessionStorage.set('newArticle', res.data)
        this.articleData = res.data
      }).catch(err => {
        throw new Error(err)
      })
    },
    // 跳转文章详情
    toArticleDetail (_id) {
      console.log(_id);
      this.$router.push({
        path: `/articleDetail/${_id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#SideArticleInfo {
  .title {
    height: 26px;
    font-size: 18px;
    font-weight: 400;
    line-height: 26px;
    font-size: 1.25rem !important;
  }
  .q-tab {
    padding: 0 !important;
    margin-right: 16px;
    border-radius: 2px;
    /deep/ .q-tab__label {
      font-size: 1.25rem !important;
    }
    /deep/ .q-tab__indicator {
      width: 40px;
      margin: 0 auto;
    }
  }
}
</style>
