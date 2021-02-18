<template>
  <BaseContent>
    <div class="row no-wrap max-width">
      <!-- 文章列表主体 -->
      <ArticleListMain class="col-lg-8 col-md-8 col-sm-12 col-xs-12" />
      <!-- 文章列表侧边栏 -->
      <SideContainer class="col-lg-4 col-md-4 col-sm-0 col-xs-0" />
    </div>
  </BaseContent>
</template>

<script>
import BaseContent from 'src/components/Container/BaseContent'
import ArticleListMain from './ArticleListMain'
import SideContainer from 'src/components/Container/SideContainer'

export default {
  name: 'ArticleList',
  components: {
    ArticleListMain,
    SideContainer,
    BaseContent
  },
  data () {
    return {
    }
  },
}
</script>
<style lang="scss" scoped>
</style>

