<template>
  <PageInner>
    <template v-slot:inner-left>
      <ArticleCardList :articleList="articleList" />
      <q-no-ssr v-if="articlePageCount > 1">
        <q-pagination color="grey" class="q-mb-sm justify-center" v-model="current" :max="articlePageCount" :max-pages="5" :direction-links="true" :boundary-numbers="true" :boundary-links="true" @input="changePage"></q-pagination>
      </q-no-ssr>
    </template>
    <template v-slot:inner-right>
      <SideBar />
    </template>
  </PageInner>
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