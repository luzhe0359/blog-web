<template>
  <q-card class="q-mb-lg">
    <q-card-section :horizontal="$q.screen.gt.xs" class="q-pa-none">
      <router-link class="col overflow-hidden" :to="`/detail/${article._id}`">
        <q-img :src="article.imgCover" native-context-menu :ratio="$q.screen.gt.xs ? 3/2 : 16/9" alt="article_err" />
      </router-link>
      <q-card-section class="col-7 column justify-center">
        <router-link :to="`/detail/${article._id}`">
          <h2 class="text-h6 ellipsis-2-lines">{{article.title}}</h2>
        </router-link>
        <div class="row q-my-sm text-grey-8">
          <div class="col">
            <div class="row q-col-gutter-md">
              <Icon :icon="'iconfont icon-fangwenliang'" :name="article.meta.views" />
              <Icon :icon="'iconfont icon-pinglun'" :name="article.meta.comments" />
              <Icon :icon="'iconfont iconfont icon-xin'" :name="article.meta.likes" />
              <q-space />
              <Icon :icon="'iconfont icon-biao'" :name="article.createTime | yearFormat" />
            </div>
          </div>
        </div>
        <div class="ellipsis-3-lines text-grey-8">{{article.desc}}{{article.desc}}</div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import Icon from 'components/common/Icon'

export default {
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      default: () => { }
    }
  },
  components: { Icon }
}
</script>

<style lang="scss" scoped>
.q-card {
  .q-card__section--horiz {
    max-height: 240px;
  }
  .q-img {
    transition: all 0.5s;
  }
  &:hover {
    .q-img {
      transform: scale(1.1);
    }
  }
}
</style>