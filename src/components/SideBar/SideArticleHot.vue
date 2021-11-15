<template>
  <q-card class="q-mb-lg">
    <q-card-section>
      <SideTitle title="热门" />
      <div>
        <div class="hot-article row q-mb-sm" v-for="article in hotArticleList">
          <router-link class="overflow-hidden" :to="`/detail/${article._id}`">
            <q-img width="4.2rem" height="4.2rem" :src="article.imgCover" native-context-menu :ratio="16/9" alt="article_err" />
          </router-link>
          <div class="col q-pl-sm">
            <router-link class="text-body1 text-grey-8 ellipsis-2-lines" :to="`/detail/${article._id}`">
              {{article.title}}
            </router-link>
            <div class="text-body2 text-grey-6">{{ article.createTime | yearFormat }}</div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapGetters } from 'vuex'
import SideTitle from 'components/Common/SideTitle'

export default {
  name: 'SideArticleHot',
  components: {
    SideTitle
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'hotArticleList'
    ])
  }
}
</script>

<style lang="scss" scoped>
.q-card {
  .hot-article {
    .q-img {
      transition: all 0.5s;
    }
    &:hover {
      .q-img {
        transform: scale(1.2);
      }
    }
    a {
      &:hover {
        color: $light-blue !important;
      }
    }
  }
}
</style>
