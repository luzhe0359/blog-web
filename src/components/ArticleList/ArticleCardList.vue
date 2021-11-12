<template>
  <div>
    <div v-if="articleList.length > 0">
      <div class="article-card" v-for="article in articleList" :key="article._id">
        <ArticleCard :article="article" />
      </div>
      <q-no-ssr v-if="articlePageCount > 1">
        <q-pagination color="grey" class="q-mb-sm justify-center" v-model="pageNum" :max="articlePageCount" :max-pages="5" :direction-links="true" :boundary-numbers="true" :boundary-links="true" @input="changePage"></q-pagination>
      </q-no-ssr>
    </div>
    <q-card v-else>
      <q-card-section class="column items-center ">
        <img class="q-mt-lg" src="https://cdn.quasar.dev/img/mountains.jpg" width="300px">
        <div class="text-subtitle2 q-mt-lg">
          <q-icon name="error_outline" size="sm" />
          暂无数据
        </div>
      </q-card-section>
    </q-card>
    <!-- <div class="q-mt-xl text-center text-white">
      <q-icon name="error_outline" size="sm" />
      暂无数据
    </div> -->
  </div>
</template>

<script>
import ArticleCard from 'components/ArticleList/ArticleCard'

export default {
  name: 'ArticleCardList',
  components: { ArticleCard },
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
  data () {
    return {
      pageNum: 1
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
/* .article-card {
  &:nth-child(even) {
    /deep/ .q-card__section--horiz {
      flex-direction: row-reverse;
    }
  }
} */
</style>

