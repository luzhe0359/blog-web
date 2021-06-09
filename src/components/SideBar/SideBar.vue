<template>
  <q-layout id="SideBar">
    <div class="side-main">
      <!-- 正常定位 -->
      <div class="user-container container overflow-hidden" :class="$q.screen.lt.sm?'':'pa-xl'">
        <SideUserAvatar />
        <SideUserTag />
      </div>
      <!-- sticky定位 -->
      <div class="blog-container container overflow-hidden" :class="$q.screen.lt.sm?'':'pa-xl'">
        <SideBlogInfo />
        <SideArticleInfo />
        <SideArticleTag />
      </div>
    </div>

  </q-layout>
</template>

<script>
import SideUserAvatar from './SideUserAvatar'
import SideUserTag from './SideUserTag'
import SideBlogInfo from './SideBlogInfo'
import SideArticleInfo from './SideArticleInfo'
import SideArticleTag from './SideArticleTag'
export default {
  name: 'SideBar',
  components: {
    SideUserAvatar,
    SideUserTag,
    SideBlogInfo,
    SideArticleInfo,
    SideArticleTag,
  },
  data () {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
#SideBar {
  width: 100%;
  height: 100%;
  padding-top: 130px;
  .side-main {
    padding: 30px;
    box-sizing: border-box;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .container {
    // background-color: rgba(255, 255, 255, 0.61);
    box-sizing: border-box;
    overflow: hidden;
  }
  .user-container {
    // background-color: rgba(255, 255, 255, 0.61);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    &.pa-xl {
      // padding: 30px 30px 0 30px;
    }
  }
  .blog-container {
    position: sticky;
    left: 0;
    top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    &.pa-xl {
      // padding: 0px 30px 25px 30px;
    }
  }
}
</style>