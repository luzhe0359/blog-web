<template>
  <q-layout view="hHh Lpr lff" id="layout">
    <!-- header -->
    <q-header height-hint="50" elevated reveal class="bg-dark" :reveal-offset="100">
      <q-toolbar class="max-width">
        <q-no-ssr>
          <q-btn flat dense round aria-label="Menu" class="lt-sm" :icon="leftDrawerOpen === true?'menu_open':'menu'" @click="leftDrawerOpen = !leftDrawerOpen" />
        </q-no-ssr>
        <!-- <q-no-ssr> -->
        <q-toolbar-title style="min-width:160px;"> 足各路の博客</q-toolbar-title>
        <!-- </q-no-ssr> -->
        <q-space />
        <!-- 菜单 -->
        <ToolBarMenu />
        <!-- 工具栏 -->
        <ToolBarUtil />
      </q-toolbar>
    </q-header>
    <!-- q-footer -->
    <q-footer class="text-white" :height-hint="123">
      <Footer />
    </q-footer>
    <!-- darwer -->
    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1" class="text-grey-8" :width="240">
      <!-- 侧边导航栏-->
      <SideMenu />
    </q-drawer>
    <!-- container -->
    <q-page-container ref="pagemain" class="full-container" :class="$q.screen.lt.md ?'bg-cover': 'bg-fixed'" :style="$q.screen.lt.md ?{}:{'background-position': '0 ' + ypos}">
      <q-no-ssr>
        <!-- 切换动画 -->
        <transition appear name="fade" mode="out-in">
          <!-- 缓存 -->
          <keep-alive :include="cacheList">
            <router-view :key="$route.fullPath" />
          </keep-alive>
        </transition>
        <!-- <template v-slot:placeholder>
          <div style="width:100vh;height:100vh;"></div>
        </template> -->
      </q-no-ssr>
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
    Footer
  },
  data () {
    return {
      leftDrawerOpen: false,
      thumbStyle,
      footer: false,
      clientWidth: 1920, // 屏幕宽度
      clientHeight: 966, // 屏幕高度
      bgOffsetHeight: 1345, // 背景图超出屏幕的宽度
      ypos: '0', // 背景图y轴定位
      cacheList: ['Home', 'ArticleList', 'ArticleDetail', 'SideContainer'],
    }
  },
  mounted () {
    this.initClient()
  },
  watch: {
    // $route (newVal, oldVal) {
    //   let noFooter = ['/album', '/home']
    //   console.log(noFooter.includes(newVal.fullPath));
    //   if (noFooter.includes(newVal.fullPath)) {
    //     this.footer = false
    //   } else {
    //     this.footer = true
    //   }
    // },
    // $route: {
    //   handler (newVal, oldVal) {
    //     let noFooter = ['/album', '/home']
    //     console.log(noFooter.includes(newVal.fullPath));
    //     if (noFooter.includes(newVal.fullPath)) {
    //       this.footer = false
    //     } else {
    //       this.footer = true
    //     }
    //   },
    //   immediate: true
    // }
  },
  methods: {
    initClient () {
      // if (this.$route.fullPath == '/home') {
      //   this.footer = false
      // } else {
      //   this.footer = true
      // }
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
  width: 100%;
  height: 100%;
  .full-container {
    min-width: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    background-image: url("~assets/bg_body.png");
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  .bg-fixed {
    background-size: 100% auto;
  }
  .bg-cover {
    background-size: cover;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .fade-enter {
    opacity: 0;
    transform: translate3d(0, -80px, 0);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translate3d(0, 0, 0);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s ease;
  }
}
</style>