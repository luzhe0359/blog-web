<template>
  <div class="q-mt-lg">
    <div v-if="articleList.length > 0">
      <ArticleCard v-for="article in articleList" :key="article._id" :article="article" />
    </div>
    <div v-else class="q-mt-xl text-center text-white">
      <q-icon name="error_outline" size="sm" />
      暂无数据
    </div>
  </div>
</template>

<script>
import ArticleCard from 'components/ArticleList/ArticleCard'

export default {
  name: 'ArticleCardList',
  props: {
    articleList: { type: Array, default: () => [] },
  },
  components: { ArticleCard },
  data () {
    return {
    }
  },
}
</script>

