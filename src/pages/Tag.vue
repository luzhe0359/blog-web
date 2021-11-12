<template>
  <q-page id="tag">
    <div class="q-gutter-md">
      <q-chip class="small-shadow" :class="{'text-light-blue':currentId === tag._id}" text-color="dark" clickable @click="changeTag(tag._id)" v-for="tag in tagList" :key="tag._id">
        <q-avatar class="small-shadow" :color="currentId === tag._id?'light-blue':'grey-5'" text-color="grey-8">{{tag.count}}</q-avatar>
        {{tag.name}}
      </q-chip>
    </div>
    <!-- 文章列表 -->
    <ArticleCardList :articleList="articleList" />
    <!-- 文章分页 -->
    <q-no-ssr v-if="articlePageCount > 1">
      <q-pagination color="grey" class="q-mb-sm justify-center" v-model="pageNum" :max="articlePageCount" :max-pages="5" :direction-links="true" :boundary-numbers="true" :boundary-links="true" @input="changePage"></q-pagination>
    </q-no-ssr>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

import ArticleCardList from 'src/components/ArticleList/ArticleCardList'

let defaultParams = {
  state: 1, // state 文章发布状态 | 1:已发布 | 2:草稿 | 3:垃圾箱
  pageNum: 1,
  pageSize: 10
}
export default {
  name: 'Tag',
  components: {
    ArticleCardList
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    return Promise.all([
      store.dispatch('article/LoadArticleList', defaultParams),
      store.dispatch('article/LoadTagList'),
    ])
  },
  data () {
    return {
      pageNum: defaultParams.pageNum, // 当前页
      pageSize: defaultParams.pageSize,
      currentId: null // 当前标签
    }
  },
  computed: {
    ...mapGetters([
      'tagList',
      'articleList',
      'articlePageCount',
    ]),
  },
  mounted () {
    this.currentId = this.$route.params._id
    this.currentId && this.changePage()
  },
  methods: {
    // 切换文章标签
    changeTag (_id) {
      if (this.currentId === _id) return
      this.currentId = _id
      this.pageNum = 1
      // state 文章发布状态 | 1:已发布 | 2:草稿 | 3:垃圾箱
      let params = {
        pageNum: 1, // 切换Tag重置页码
        pageSize: this.pageSize,
        state: 1,
        tag: _id
      }
      this.$store.dispatch('article/LoadArticleList', params)
    },
    // 切换页码
    changePage (current) {
      let params = {
        pageNum: current || 1,
        pageSize: this.pageSize,
        state: 1,
        tag: this.currentId
      }
      this.$store.dispatch('article/LoadArticleList', params)
    },
  },
}
</script>
<style lang="scss" scoped>
#tag {
  padding-top: 50px;
}

.active {
  background-color: #03a9f4;
}

@media (max-width: $breakpoint-sm-max) {
  #tag {
    padding-top: 20px;
  }
}
</style>

