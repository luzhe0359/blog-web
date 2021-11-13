<template>
  <div>
    <div v-if="articleList.length > 0">
      <div class="article-card" v-for="article in articleList" :key="article._id">
        <ArticleCard :article="article" />
      </div>
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
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.article-card {
  &:nth-child(even) {
    /deep/ .q-card__section--horiz {
      flex-direction: row-reverse;
    }
  }
}
</style>

