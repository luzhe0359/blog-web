<template>
  <q-layout id="SideBar">
    <q-scroll-observer @scroll="handlerScroll" :debounce="200" />
    <!-- 正常定位 -->
    <!-- <div class="user-container container overflow-hidden"> -->
    <SideUserAvatar />
    <SideBlogInfo />
    <SideArticleTag />
    <!-- <SideUserTag /> -->
    <!-- </div> -->
    <!-- sticky定位 -->
    <div ref="sideSticky" class="side-sticky">
      <slot name="catalog"></slot>
      <SideArticleHot />
    </div>
    <!-- <div ref="sideSticky" class="blog-container container overflow-hidden">
    <SideArticleInfo />
    </div> -->
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
import SideArticleHot from './SideArticleHot'
export default {
  name: 'SideBar',
  components: {
    SideUserAvatar,
    SideUserTag,
    SideBlogInfo,
    SideArticleInfo,
    SideArticleTag,
    SideArticleHot
  },
  data () {
    return {
    }
  },
  methods: {
    // 监听滚动
    handlerScroll (info) {
      const { direction } = info
      let sideSticky = this.$refs.sideSticky

      // 滚动页面，SideBar fixed  
      let top = "20px"
      if (direction === 'up') { // 上滑
        top = '70px'
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
  height: 100%;
}
.side-sticky {
  transition: all 0.2s ease-out;
  position: sticky;
  left: 0;
  top: 20px;
}
</style>