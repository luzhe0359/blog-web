<template>
  <q-layout id="SideBar">
    <q-scroll-observer @scroll="handlerScroll" :debounce="200" />
    <SideUserAvatar /> <!-- logo -->
    <SideNotice /> <!-- 公告 -->
    <SideBlogInfo /> <!-- 站点 -->
    <SideArticleTag /> <!-- 标签 -->
    <!-- sticky定位 -->
    <div ref="sideSticky" class="side-sticky">
      <slot name="catalog"></slot> <!-- 目录 -->
      <SideArticleHot /> <!-- 热门 -->
    </div>
    <!-- <SideArticleInfo /> -->
  </q-layout>
</template>

<script>
import { dom, } from 'quasar'
const { css } = dom

import SideUserAvatar from './SideUserAvatar'
import SideBlogInfo from './SideBlogInfo'
import SideArticleInfo from './SideArticleInfo'
import SideArticleTag from './SideArticleTag'
import SideArticleHot from './SideArticleHot'
import SideNotice from './SideNotice'
export default {
  name: 'SideBar',
  components: {
    SideUserAvatar,
    SideBlogInfo,
    SideArticleInfo,
    SideArticleTag,
    SideArticleHot,
    SideNotice
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