<template>
  <q-page id="Category">
    <!-- header -->
    <div class="page-header">
      <div class="absolute-center full-width">
        <h1 class="text-h4 text-center q-mb-lg">文章标签</h1>
        <!-- 分类列表 -->
        <!-- <div class="max-width">
          <q-scroll-area horizontal :visible="fasl" style="height: 60px; max-width: 1200px; width:100%;">
            <div class="row no-wrap q-gutter-x-md">
              <div :class="{'active':currentId === tag._id}" :style="{'color': tag.color, 'fontSize':tag.size}" @click="changeTag(tag._id)" v-for="tag in tagList" :key="tag._id">
                {{tag.name}}
              </div>
              <div :class="{'active':currentId === tag._id}" :style="{'color': tag.color, 'fontSize':tag.size}" @click="changeTag(tag._id)" v-for="tag in tagList" :key="tag._id">
                {{tag.name}}
              </div>
              <div :class="{'active':currentId === tag._id}" :style="{'color': tag.color, 'fontSize':tag.size}" @click="changeTag(tag._id)" v-for="tag in tagList" :key="tag._id">
                {{tag.name}}
              </div>
            </div>
          </q-scroll-area>
        </div> -->
        <div class="row max-width q-px-sm">
          <div class="col">
            <div class="row q-col-gutter-lg">
              <div class="q-gutter-md row no-wrap flex-center ellipsis-3-lines full-width">
                <span :class="{'active':currentId === tag._id}" :style="{'color': tag.color, 'fontSize':tag.size}" @click="changeTag(tag._id)" v-for="tag in tagList" :key="tag._id">
                  {{tag.name}}
                </span>
                <span :class="{'active':currentId === tag._id}" :style="{'color': tag.color, 'fontSize':tag.size}" @click="changeTag(tag._id)" v-for="tag in tagList" :key="tag._id">
                  {{tag.name}}
                </span>
                <span :class="{'active':currentId === tag._id}" :style="{'color': tag.color, 'fontSize':tag.size}" @click="changeTag(tag._id)" v-for="tag in tagList" :key="tag._id">
                  {{tag.name}}
                </span>
                <span :class="{'active':currentId === tag._id}" :style="{'color': tag.color, 'fontSize':tag.size}" @click="changeTag(tag._id)" v-for="tag in tagList" :key="tag._id">
                  {{tag.name}}
                </span>
              </div>
            </div>
          </div>
        </div>

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
      currentId: ''
    }
  },
  computed: {
    ...mapGetters([
      'articleList',
      'articlePageCount',
      'tagList'
    ]),
  },
  methods: {
    // 切换文章标签
    changeTag (tagId) {
      if (this.currentId === tagId) return
      this.pageNum = 1
      this.currentId = tagId
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
        state: 1,
        tag: this.currentId
      }
      this.$store.dispatch('article/LoadArticleList', params)
    }
  }
}
</script>
<style lang="scss" scoped>
.page-header {
  background-image: url("~assets/body-hand.jpg");
}
.active {
  border: 1px solid #03a9f4;
}
</style>