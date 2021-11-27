<template>
  <q-page id="Category">
    <!-- header -->
    <div class="page-header">
      <div class="absolute-center full-width max-width">
        <h1 class="text-h4 text-center  text-white q-mb-lg ">文章标签</h1>
        <!-- 标签列表 -->
        <div class="q-mb-md row flex-center" style="height: 36px;">
          <q-chip removable v-for="(tag, index) in activeTags" :key="tag._id" @remove="removeTag(tag)" size="md" color="light-blue" text-color="white">
            {{tag.name}}
          </q-chip>
          <q-btn flat round color="light-blue" icon="search" @click="getList" />
        </div>
        <div class="q-mx-sm q-pa-sm tags-border overflow-hidden" v-if="tagList.length !== 0">
          <!-- 模态框 -->
          <div v-show="activeTagsLen" class="fit absolute-full text-subtitle2 flex flex-center hover-mask">
            <q-icon name="block" class="text-white text-h6 q-px-sm"></q-icon>
            <div class="text-h6 text-white">最多选三个标签哦~</div>
          </div>
          <!-- 标签 -->
          <div class="scroll q-pa-sm">
            <span class="q-pa-xs text-grey-4" :class="{active:isActive(tag)}" :style="{'fontSize':tag.size}" v-for="tag in tagList" :key="tag._id" @click="clickTag(tag)">
              {{tag.name}}
            </span>
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
  pageSize: 10
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
      currentId: '',
      dialogVisible: false,
      activeTags: [] // 选中标签
    }
  },
  computed: {
    ...mapGetters([
      'articleList',
      'articlePageCount',
      'tagList'
    ]),
    // 标签长度>= 3, 禁用
    activeTagsLen () {
      return this.activeTags.length >= 3
    },
    isActive () {
      return (tag) => {
        return this.activeTags.some(item => item._id === tag._id)
      }
    },
    activeTagsIds () {
      if (this.activeTags.length <= 0) return []
      return this.activeTags.map(tag => {
        return tag._id
      })
    }
  },
  created () {
    this.currentId = this.$route.params._id
    // 标签回显
    if (this.currentId) {
      let data = this.tagList.find(item => {
        return item._id === this.currentId
      })
      this.activeTags.push(data)
      this.getList()
    }
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
    // 文章列表
    getList () {
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        state: 1,
        tag: this.activeTagsIds
      }
      this.$store.dispatch('article/LoadArticleList', params)
    },
    // 删除标签
    removeTag (tag) {
      this.activeTags = this.activeTags.filter(item => item._id !== tag._id)
    },
    // 点击标签
    clickTag (tag) {
      this.activeTags.push(tag)
      console.log(this.activeTags);
    },
    close () {
      this.dialogVisible = false
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.page-header {
  background-image: url("https://oss.zugelu.com/other/bg_tag.jpg");
  background-position: center 0px;
}
.tags-border {
  position: relative;
  max-height: 130px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.15);
  &:hover {
    box-shadow: 0 5px 20px 10px rgba(7, 17, 27, 0.25);
  }
  .hover-mask {
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
    z-index: 999;
  }
  .scroll {
    max-height: 110px;
    overflow-x: hidden;
    > span {
      &.active {
        color: $light-blue !important;
      }
    }
  }
}
</style>