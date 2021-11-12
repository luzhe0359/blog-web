<template>
  <div class="page-inner row justify-center">
    <div class="col-sm-12 col-md-9">
      <ArticleCardList :articleList="articleList" />
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

  },
  components: {
    ArticleCardList,
    SideBar
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
</style>