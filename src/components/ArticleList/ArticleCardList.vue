<template>
  <div>
    <div>
      <article class="article-card" v-for="article in articleList" :key="article._id">
        <ArticleCard :article="article" />
      </article>
    </div>
    <NotFound v-if="articleList.length === 0" />
  </div>
</template>

<script>
import ArticleCard from 'components/ArticleList/ArticleCard'
import NotFound from 'components/Common/NotFound'

export default {
  name: 'ArticleCardList',
  components: {
    ArticleCard,
    NotFound
  },
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

