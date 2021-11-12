<template>
  <div class="page-inner row">
    <div class="col-sm-12 col-md-9">
      <ArticleCardList :articleList="articleList" :articlePageCount="articlePageCount" @changePage="changePage" />
      <q-no-ssr v-if="articlePageCount > 1">
        <q-pagination color="grey" class="q-mb-sm justify-center" v-model="current" :max="articlePageCount" :max-pages="5" :direction-links="true" :boundary-numbers="true" :boundary-links="true" @input="changePage"></q-pagination>
      </q-no-ssr>
    </div>
    <div class="col-md-3 gt-sm q-pl-lg">
      <SideBar />
    </div>
  </div>
</template>

<script>
import PageInner from 'components/common/PageInner'
import SideBar from 'src/components/SideBar/SideBar'
import ArticleCardList from 'components/ArticleList/ArticleCardList'

export default {
  components: {
    PageInner,
    ArticleCardList,
    SideBar
  },
  props: {
    articleList: {
      type: Array,
      default: () => []
    },
    articlePageCount: {
      type: Number,
      default: 0
    },
    pageNum: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      current: 1
    }
  },
  watch: {
    pageNum (n, o) {
      this.current = n
    }
  },
  methods: {
    // 切换页码
    changePage (current) {
      this.$emit('changePage', current)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>