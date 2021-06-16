<template>
  <q-layout id="SideBar">
    <q-scroll-observer @scroll="handlerScroll" :debounce="200" />
    <!-- 正常定位 -->
    <div class="user-container container overflow-hidden">
      <SideUserAvatar />
      <SideUserTag />
    </div>
    <!-- sticky定位 -->
    <div ref="sideSticky" class="blog-container container overflow-hidden">
      <SideBlogInfo />
      <!-- <SideArticleInfo /> -->
      <SideArticleTag />
    </div>
  </q-layout>
</template>

<script>
import { dom, } from 'quasar'
const { css } = dom

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
  methods: {
    // 监听滚动
    handlerScroll (info) {
      const { direction, position } = info
      let sideSticky = this.$refs.sideSticky

      // 滚动页面，SideBar fixed  
      let top = "0px"
      if (direction === 'up') { // 上滑
        top = '50px'
      }
      css(sideSticky, {
        top
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#SideBar {
  width: 100%;
  height: 100%;
  padding-top: 130px;
  .container {
    background-color: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    border-radius: 50px;
    overflow: hidden;
  }
  .user-container {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 30px 30px 0;
  }
  .blog-container {
    position: sticky;
    left: 0;
    top: 0;
    transition: all 0.2s ease-out;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding: 0px 30px 30px;
  }
}
</style>