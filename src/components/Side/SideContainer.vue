<template>
  <q-layout id="SideContainer">
    <!-- 正常定位 -->
    <div class="user-container container overflow-hidden" :class="$q.screen.lt.sm?'':'pa-xl'">
      <SideUserAvatar />
      <SideUserTag />
      <ScrollToTop />
    </div>
    <!-- sticky定位 -->
    <div class="blog-container container overflow-hidden" :class="$q.screen.lt.sm?'':'pa-xl'">
      <SideBlogInfo />
      <SideArticleInfo />
      <SideArticleTag />
    </div>
  </q-layout>
</template>

<script>
import SideUserAvatar from './SideUserAvatar'
import SideUserTag from './SideUserTag'
import SideBlogInfo from './SideBlogInfo'
import SideArticleInfo from './SideArticleInfo'
import SideArticleTag from './SideArticleTag'
import ScrollToTop from './ScrollToTop'
export default {
  name: 'SideContainer',
  components: {
    SideUserAvatar,
    SideUserTag,
    SideBlogInfo,
    SideArticleInfo,
    SideArticleTag,
    ScrollToTop
  },
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
#SideContainer {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 130px 0 0px 30px;
  .container {
    background: #ebecec;
    border-radius: 50px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .user-container {
    background: #ebecec;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    &.pa-xl {
      padding: 35px 35px 0 35px;
    }
  }
  .blog-container {
    position: sticky;
    left: 0;
    top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    &.pa-xl {
      padding: 0px 35px 25px 35px;
    }
  }
}
</style>