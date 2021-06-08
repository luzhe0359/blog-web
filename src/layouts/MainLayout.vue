<template>
  <q-layout view="hHh Lpr lff" id="layout">
    <!-- header -->
    <q-header id="header" height-hint="50" elevated reveal class="bg-dark" :reveal-offset="500">
      <q-toolbar class="max-width">
        <!-- <q-no-ssr> -->
        <q-btn flat dense round aria-label="Menu" class="lt-sm" :icon="leftDrawerOpen === true?'menu_open':'menu'" @click="leftDrawerOpen = !leftDrawerOpen" />
        <!-- </q-no-ssr> -->
        <q-toolbar-title style="min-width:160px;"> 足各路</q-toolbar-title>
        <q-space />
        <!-- 菜单 -->
        <ToolBarMenu />
        <!-- 工具栏 -->
        <ToolBarUtil />
      </q-toolbar>
    </q-header>
    <!-- footer -->
    <!-- <Footer /> -->
    <!-- darwer -->
    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1" class="text-grey-8" :width="240">
      <!-- 侧边导航栏-->
      <SideMenu />
    </q-drawer>
    <!-- container -->
    <q-page-container class="full-container" :class="$q.screen.lt.md ?'bg-cover': 'bg-fixed'" :style="$q.screen.lt.md ?{}:{'background-position': '0 ' + ypos}">
      <keep-alive :include="cacheList">
        <router-view :key="$route.fullPath" />
      </keep-alive>
      <Footer />
    </q-page-container>
    <!-- 回到顶部 -->
    <q-page-scroller position="bottom-right" :scroll-offset="220" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="grey" />
    </q-page-scroller>
    <!-- 滚动监听器 -->
    <q-scroll-observer @scroll="scrollHandler" />
  </q-layout>
</template>

<script>
import Footer from 'src/components/Footer/Footer'
import SideMenu from 'components/SideMenu/SideMenu.vue'
import ToolBarMenu from 'components/ToolBar/ToolBarMenu.vue'
import ToolBarUtil from 'components/ToolBar/ToolBarUtil.vue'
import { thumbStyle } from 'src/utils/thumbStyle'

export default {
  name: 'MainLayout',
  components: {
    SideMenu,
    ToolBarUtil,
    ToolBarMenu,
    Footer,
  },
  data () {
    return {
      leftDrawerOpen: false,
      thumbStyle,
      footer: true,
      clientWidth: 1920, // 屏幕宽度
      clientHeight: 966, // 屏幕高度
      bgOffsetHeight: 1345, // 背景图超出屏幕的宽度
      ypos: '0', // 背景图y轴定位
      // cacheList: [],
      cacheList: ['Home', 'ArticleList', 'SideContainer'],
    }
  },
  mounted () {
    this.initClient()
  },
  watch: {
    // $route (newVal, oldVal) {
    //   let noFooter = ['/about']
    //   console.log(noFooter.includes(newVal.fullPath));
    //   if (noFooter.includes(newVal.fullPath)) {
    //     console.log(this.footer);
    //     this.footer = false
    //   } else {
    //     this.footer = true
    //   }
    // },
  },
  methods: {
    initClient () {
      // 1345/960 背景图 高/宽比 
      // 获取屏幕宽高，计算背景图的高度，动态改变背景图定位
      this.clientHeight = document.body.clientHeight
      this.clientWidth = document.body.clientWidth
      // 超出高度 = 图片高度 - 屏幕高度
      this.bgOffsetHeight = Math.ceil(this.clientWidth * (1345 / 960)) - this.clientHeight
    },
    // 滚动监听器
    scrollHandler (info) {
      const { position } = info
      // 滚动距离 > 背景超出高度 , 即背景图到底部了,图片定位至底部
      if (position > this.bgOffsetHeight) { // 背景图高度
        this.ypos = 'bottom'
      } else {
        this.ypos = - position + 'px'
      }
    }
  },
}
</script>


<style lang="scss" scoped>
#layout {
  // width: 100vw;
  // height: 100vh;
  .full-container {
    position: relative;
    min-width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    background-image: url("~assets/bg_body.png");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }
  .bg-fixed {
    background-size: 100% auto;
  }
  .bg-cover {
    background-size: cover;
  }
}
</style>