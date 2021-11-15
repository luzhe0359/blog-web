<template>
  <q-card class="q-mb-lg">
    <q-card-section :horizontal="$q.screen.gt.xs" class="q-pa-none">
      <router-link class="col overflow-hidden" :to="`/detail/${article._id}`">
        <q-img :src="article.imgCover" native-context-menu :ratio="$q.screen.gt.xs ? 3/2 : 16/9" alt="article_err" placeholder-src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg==" />
      </router-link>
      <q-card-section class="col-7 q-py-sm column justify-center">
        <router-link :to="`/detail/${article._id}`">
          <h2 class="text-h5 ellipsis-2-lines">{{article.title}}</h2>
        </router-link>
        <div class="row q-my-sm text-grey-6">
          <div class="col">
            <div class="row q-col-gutter-sm text-body2">
              <!-- RemoveRedEye Favorite Message-->
              <!-- <q-icon name="remove_red_eye" size="20px" /> -->
              <q-chip class="text-caption" icon="category" color="transparent">{{article.category.name}}</q-chip>
              <q-chip class="text-caption" icon="remove_red_eye" color="transparent">{{article.meta.views}}</q-chip>
              <q-chip class="text-caption" icon="message" color="transparent">{{article.meta.comments}}</q-chip>
              <q-chip class="text-caption" icon="favorite" color="transparent">{{article.meta.likes}}</q-chip>
              <!-- <Icon :icon="'category'" :name="article.category.name" />
              <Icon :icon="'remove_red_eye'" :name="article.meta.views" />
              <Icon :icon="'message'" :name="article.meta.comments" />
              <Icon :icon="'favorite'" :name="article.meta.likes" /> -->
              <q-space />
              <!-- AccessTime -->
              <Icon :icon="'access_time'" :name="article.createTime | yearFormat" />
            </div>
          </div>
        </div>
        <div class="ellipsis-3-lines text-body1 text-grey-8">{{article.desc}}{{article.desc}}</div>
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