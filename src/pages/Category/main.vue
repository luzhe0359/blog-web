<template>
  <div class="page-inner row">
    <div class="col-sm-12 col-md-9">
      <ArticleCardList :articleList="articleList" :articlePageCount="articlePageCount" @changePage="changePage" />
    </div>
    <div class="col-md-3 gt-sm q-pl-lg">
      <SideBar />
    </div>
  </div>
</template>

<script>
import SideBar from 'src/components/SideBar/SideBar'
import ArticleCardList from 'components/ArticleList/ArticleCardList'

export default {
  props: {
    articleList: {
      type: Array,
      default: () => []
    },
    articlePageCount: {
      type: Number,
      default: 0
    }
  },
  components: {
    ArticleCardList,
    SideBar
  },
  data () {
    return {
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