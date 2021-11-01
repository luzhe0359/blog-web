<template>
  <q-layout view="hHh Lpr lff" id="layout">
    <!-- header -->
    <q-header id="header" height-hint="50" elevated reveal class="bg-dark" :reveal-offset="500">
      <q-toolbar class="max-width">
        <!-- <q-no-ssr> -->
        <q-btn flat dense round aria-label="Menu" class="lt-sm" :icon="leftDrawerOpen === true?'menu_open':'menu'" @click="leftDrawerOpen = !leftDrawerOpen" />
        <!-- </q-no-ssr> -->
        <q-toolbar-title style="min-width:100px;">
          <router-link class="text-white" to="/" replace>足各路 </router-link>
        </q-toolbar-title>
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
    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1" class="lt-sm text-grey-8" :width="240">
      <!-- 侧边导航栏-->
      <SideMenu />
    </q-drawer>
    <!-- container -->
    <q-page-container class="full-container" :style="$q.screen.lt.sm ?{}:{'background-position': '0 ' + ypos}">
      <keep-alive :include="cacheList">
        <router-view :key="$route.fullPath" />
      </keep-alive>
      <Footer />
    </q-page-container>
    <!-- 回到顶部 -->
    <q-page-scroller position="bottom-right" :scroll-offset="220" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="grey-8" />
    </q-page-scroller>
    <!-- 滚动监听器 -->
    <q-scroll-observer @scroll="scrollHandler" />
    <!-- 大小调整侦听器 -->
    <q-resize-observer @resize="resizeHandler" debounce="200" />
  </q-layout>
</template>

<script>
import Footer from 'src/components/Footer/Footer'
import SideMenu from 'components/SideMenu/SideMenu.vue'
import ToolBarMenu from 'components/ToolBar/ToolBarMenu.vue'
import ToolBarUtil from 'components/ToolBar/ToolBarUtil.vue'

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
      footer: true,
      clientWidth: 1920, // 屏幕宽度
      clientHeight: 966, // 屏幕高度
      bgOffsetHeight: 1345, // 背景图超出屏幕的宽度
      ypos: '0', // 背景图y轴定位
      cacheList: ['Home'],
    }
  },
  mounted () {
    this.initClient()
    console.log("%c 本站名称: ", "border:1px solid #e1e1e8; color:#1e73be;", " 足各路");
    console.log("%c 本站地址: ", "border:1px solid #e1e1e8; color:#1e73be;", " https://zugelu.com");
    console.log("%c 个人邮箱: ", "border:1px solid #e1e1e8; color:#1e73be;", " luzhe0359@163.com");
  },
  methods: {
    initClient () {
      // 1345/960 背景图 高/宽比 
      // 获取屏幕宽高，计算背景图的高度，动态改变背景图定位
      this.clientHeight = document.documentElement.clientHeight
      this.clientWidth = document.documentElement.clientWidth
      // 超出高度 = 图片高度 - 屏幕高度
      this.bgOffsetHeight = (this.clientWidth * (1345 / 960)).toFixed(5) - this.clientHeight
    },
    // 滚动监听器
    scrollHandler (info) {
      if (this.$q.screen.lt.sm) return
      const { position } = info

      if (position <= 500) {
        let header = document.getElementById('header')
        header.classList.remove('q-header--hidden')
      }

      // 滚动距离 > 背景超出高度 , 即背景图到底部了,图片定位至底部
      if (position > this.bgOffsetHeight) { // 背景图高度
        this.ypos = 'bottom'
      } else {
        this.ypos = - position + 'px'
      }
    },
    // 大小调整侦听器
    resizeHandler () {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      this.initClient()
    }
  },
}
</script>


<style lang="scss" scoped>
#layout {
  .full-container {
    position: relative;
    min-width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    background-image: url("/bg/bg_body.webp");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% auto;
  }
  @media (max-width: 710px) {
    .full-container {
      background-size: 100% 100%;
    }
  }
  @media (max-width: $breakpoint-xs-max) {
    .full-container {
      background-image: none;
      &::before {
        content: " ";
        position: fixed;
        z-index: -1;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: url("/bg/bg_iphone.webp");
        background-size: cover;
      }
    }
  }
}
</style>