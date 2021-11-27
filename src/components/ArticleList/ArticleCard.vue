<template>
  <q-card class="q-mb-lg">
    <q-card-section :horizontal="$q.screen.gt.xs" class="q-pa-none">
      <q-card-section class="img-cover col q-pa-none relative-position overflow-hidden">
        <router-link :to="`/detail/${article._id}`">
          <div class="more">
            <q-icon name="keyboard_arrow_right" size="50px" />
          </div>
          <q-img :src="article.imgCover" native-context-menu :ratio="$q.screen.gt.xs ? 3/2 : 16/9" alt="article_err" :placeholder-src="$BASE_IMG_URL" />
        </router-link>
      </q-card-section>
      <q-card-section class="col-7 q-py-sm column justify-center">
        <router-link :to="`/detail/${article._id}`">
          <h2 class="text-h5 ellipsis-2-lines">{{article.title}}</h2>
        </router-link>
        <div class="row q-my-sm">
          <div class="col">
            <div class="row q-col-gutter-sm text-body2 text-grey-6">
              <q-chip class="text-caption" icon="category" color="transparent" text-color="grey-6">{{article.category.name}}</q-chip>
              <q-chip class="text-caption" icon="remove_red_eye" color="transparent" text-color="grey-6">{{article.meta.views}}</q-chip>
              <q-chip class="text-caption" icon="source" color="transparent" text-color="grey-6">{{article.meta.comments}}</q-chip>
              <q-chip class="text-caption" icon="favorite" color="transparent" text-color="grey-6">{{article.meta.likes}}</q-chip>
              <q-space />
              <!-- AccessTime -->
              <q-chip class="text-caption" icon="watch_later" color="transparent" text-color="grey-6">{{article.createTime | yearFormat}}</q-chip>
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
  .img-cover {
    border-radius: 8px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .more {
    position: absolute;
    width: 60%;
    opacity: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 60%;
    transition: all 0.5s;
    z-index: 2;
    color: $grey-3;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .q-img {
    transition: all 0.5s;
  }
  &:hover {
    .more {
      width: 100%;
      height: 100%;
      opacity: 1;
      background: rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(5px);
    }
    .q-img {
      transform: scale(1.1);
    }
  }
}
</style>