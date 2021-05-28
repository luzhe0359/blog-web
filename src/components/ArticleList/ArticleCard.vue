<template>
  <div class="article q-mb-md">
    <!-- 主内容 -->
    <div class="article-title cursor-pointer" @click="toArticleDetail" :style="{'backgroundImage': `url(${randomBg})`}">
      <!-- 文章分类 -->
      <div class="row">
        <q-space />
        <div class="row items-center q-gutter-x-xs">
          <q-icon :name="'iconfont '+ article.category.icon"></q-icon>
          <div>{{article.category.name}}</div>
        </div>
      </div>
      <!-- 标题&内容 -->
      <div>
        <div class="text-h6 q-my-sm ellipsis">{{article.title}}</div>
        <div class="ellipsis-2-lines" style="font-size: 14px">{{article.desc}}</div>
      </div>
    </div>
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
  },
  methods: {
    // 查看文章详情
    toArticleDetail () {
      // 获取本地存储记录 (拼接，详情页路由)
      let view = this.$q.sessionStorage.getItem(`/articleDetail/${this.article._id}`)
      // 判断是否浏览过此文章
      if (view === null) { // sessionStorage 为空，即未看过，浏览量+1
        this.$set(this.article, 'meta.views', this.article.meta.views++)
      }
      this.$router.push({
        path: `/articleDetail/${this.article._id}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$cardpx: 22px;
$cardpy: 35px;
.article {
  color: #000;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.61);
  overflow: hidden;
  transition: all 0.5s ease;
  &:hover {
    /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  }
  .article-title {
    color: #fff;
    // background: url("~assets/bg/game4.png") no-repeat;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top center;
    padding: 32px 32px 10px;
  }
  .article-util {
    background-color: rgba(255, 255, 255, 0.61);
    box-sizing: border-box;
    padding: 22px 32px 22px;
  }
  .line {
    height: 2px;
    margin-right: 80px;
    margin-left: 35px;
    background: #000000;
    opacity: 0.2;
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