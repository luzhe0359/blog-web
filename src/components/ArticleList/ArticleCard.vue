<template>
  <div class="article q-mb-md">
    <!-- 主内容 -->
    <div class="article-title">
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
        <div class="text-h6 q-mt-md q-mb-sm ellipsis" @click="toArticleDetail" style="cursor:pointer;">{{article.title}}</div>
        <div v-html="article.htmlContent" class="ellipsis-2-lines"></div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="line"></div>
    <!-- 底部工具栏 -->
    <div class="article-util row">
      <div class="row q-ml-none">
        <q-icon size="20px" class="q-mr-xs" name="iconfont icon-fangwenliang"></q-icon>
        {{article.meta.views}}
      </div>
      <div>
        <q-icon size="20px" class="q-mr-xs" name="iconfont icon-pinglun">
        </q-icon>
        {{article.meta.comments}}
      </div>
      <div>
        <q-icon size="20px" class="q-mr-xs" name="iconfont icon-xin"></q-icon>
        {{article.meta.likes}}
      </div>
      <q-space />
      <div>
        发表于
        <q-icon size="20px" class="q-mr-xs" name="iconfont icon-biao"></q-icon>
        {{article.createTime | dateFormat}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard',
  props: {
    article: { type: Object, default: () => { } },
  },
  data () {
    return {

    }
  },
  methods: {
    // 查看文章详情
    toArticleDetail () {
      // 获取本地存储记录 (拼接，详情页路由)
      let view = this.$q.sessionStorage.getItem(`/articleDetail/${this.article._id}`)
      // 判断是否浏览过此文章
      if (view === null) { // sessionStorage 为空，即未看过，浏览器+1
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
.article {
  color: #000000;
  border-radius: 50px;
  background-color: rgba(255, 255, 255, 0.521);
  overflow: hidden;

  &:hover {
    box-shadow: 10px 10px 5px #888888;
    /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  }
  .article-title {
    background-image: url("~assets/bg_body.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 20% 20%;
    padding: 42px 35px 0;
  }
  .article-util {
    box-sizing: border-box;
    padding: 22px 35px 32px;
  }
  .line {
    height: 2px;
    margin-right: 80px;
    margin-left: 35px;
    background: #000000;
    opacity: 0.2;
  }
}
</style>