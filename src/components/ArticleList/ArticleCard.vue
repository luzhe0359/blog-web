<template>
  <div class="article q-mb-md">
    <!-- 主内容 -->
    <!-- <div class="article-title cursor-pointer" @click="toArticleDetail" :style="{'backgroundImage': `url(${randomBg})`}"> -->
    <router-link class="article-title" :to="`/articleDetail/${article._id}`">
      <!-- 文章分类 -->
      <div class="row">
        <q-space />
        <div class="row items-center q-gutter-x-xs text-grey-8">
          <q-icon :name="'iconfont '+ article.category.icon"></q-icon>
          <div>{{article.category.name}}</div>
        </div>
      </div>
      <!-- 标题&内容 -->
      <div>
        <h1 class="text-h6 q-my-sm ellipsis">{{article.title}}</h1>
        <div class="ellipsis-2-lines q-mb-sm text-grey-8">{{article.desc}}</div>
      </div>
    </router-link>
    <!-- 分割线 -->
    <div class="line"></div>
    <!-- 底部工具栏 -->
    <div class="article-util row">
      <Icon :icon="'iconfont icon-fangwenliang'" :name="article.meta.views" />
      <Icon :icon="'iconfont icon-pinglun'" :name="article.meta.comments" />
      <Icon :icon="'iconfont iconfont icon-xin'" :name="article.meta.likes" />
      <q-space />
      <Icon :icon="'iconfont icon-biao'" :name="article.createTime | yearFormat('发表于 ')" />
    </div>
  </div>
</template>

<script>
import Icon from 'components/common/Icon'

export default {
  name: 'ArticleCard',
  props: {
    article: { type: Object, default: () => { } },
  },
  components: { Icon },
  data () {
    return {

    }
  },
  computed: {
    randomBg () {
      const randomNum = Math.ceil(Math.random() * 20)
      return `/bg/code${randomNum}.png`
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  color: #000;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.61);
  overflow: hidden;
  transition: all 0.5s ease;
  &:hover {
    /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  }
  .article-title {
    display: block;
    color: #000;
    // background: url("~assets/bg/game4.png") no-repeat;
    // background-repeat: no-repeat;
    // background-size: cover;
    // background-position: top center;
    padding: 32px 32px 10px;
  }
  .article-util {
    // background-color: rgba(255, 255, 255, 0.61);
    // box-sizing: border-box;
    padding: 22px 32px 22px;
  }
  .line {
    height: 2px;
    margin-right: 80px;
    margin-left: 32px;
    background: #000000;
    opacity: 0.08;
  }
}

@media (max-width: $breakpoint-xs-max) {
  $cardpx: 16px;
  $cardpy: 16px;
  .article {
    border-radius: 10px;
    .article-title {
      padding: $cardpx;
      padding-bottom: 6px;
    }
    .line {
      margin-right: 3 * $cardpx;
      margin-left: $cardpx;
    }
    .article-util {
      padding: $cardpx;
    }
  }
}
</style>