<template>
  <div class="q-mt-lg">
    <ArticleCard v-for="article in articleList" :key="article._id" :article="article" />
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
  }
}
</script>

