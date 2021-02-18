<template>
  <q-layout view="hHh Lpr lFf">
    <q-scroll-area
      :thumb-style="thumbStyle"
      :visible="false"
      id="scroll-main"
      ref="scrollArea"
    >
      <!-- header -->
      <q-header
        elevated
        class="bg-dark"
      >
        <q-toolbar class="toolbar">
          <q-no-ssr>
            <q-btn
              flat
              dense
              round
              aria-label="Menu"
              class="lt-sm"
              :icon="leftDrawerOpen === true?'menu_open':'menu'"
              @click="leftDrawerOpen = !leftDrawerOpen"
            />
          </q-no-ssr>
          <q-space />
          <!-- 菜单 -->
          <ToolBarMenu />
          <!-- 工具栏 -->
          <ToolBarUtil />
        </q-toolbar>
      </q-header>
      <!-- darwer -->
      <q-drawer
        v-model="leftDrawerOpen"
        bordered
        content-class="bg-grey-1"
        class="text-grey-8"
        :width="240"
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = false"
      >
        <!-- 侧边导航栏-->
        <SideMenu />
      </q-drawer>
      <!-- container -->
      <q-page-container
        ref="pagemain"
        :class="$q.screen.lt.md ?'bg-height-full': 'page-main'"
        :style="$q.screen.lt.md ?{}:{'background-position': '0 ' + ypos}"
      >
        <!-- 切换动画 -->
        <!-- <transition
          appear
          enter-active-class="animated slideInDown"
          leave-active-class="animated slideOutDown"
          name="fade"
          mode="out-in"
        > -->
        <!-- <keep-alive> -->
        <transition
          appear
          name="fade"
          mode="out-in"
        >
          <router-view style="max-width: 1200px; margin: 0 auto;min-height: calc(100vh - 64px);" />
        </transition>
        <!-- </keep-alive> -->
      </q-page-container>
      <!-- 滚动监听 -->
      <q-scroll-observer @scroll="onScroll" />
    </q-scroll-area>
  </q-layout>
</template>

<script>
import Vue from 'vue'
import { debounce, scroll } from 'quasar'
const { getScrollTarget } = scroll

import SideMenu from 'components/SideMenu/SideMenu.vue'
import ToolBarMenu from 'components/ToolBar/ToolBarMenu.vue'
import ToolBarUtil from 'components/ToolBar/ToolBarUtil.vue'
import Container from 'components/Container/Container.vue'
import { thumbStyle } from 'src/utils/thumbStyle'

export default {
  name: 'MainLayout',
  components: {
    SideMenu,
    ToolBarUtil,
    ToolBarMenu,
    Container
  },
  data () {
    return {
      leftDrawerOpen: false,
      miniState: false,
      thumbStyle,
      ypos: '0',
      backgroundHeight: 1345,
      clientWidth: 1920,
      clientHeight: 966,
    }
  },
  watch: {
    $route (to, from) {
      // this.$refs.scrollArea.setScrollPosition(0)
      // // 获取并设置to路由滚动距离
      // let toPosition = this.$q.sessionStorage.getItem(to.fullPath)
      // if (toPosition) { // 有值，进行滚动
      //   this.$refs.scrollArea.setScrollPosition(toPosition, 800)
      // }
      // // 获取并设置from路由滚动距离
      // let fromPosition = this.$refs.scrollArea.getScrollPosition()
      // if (fromPosition > 600) { // 滚动过小，不进行滚动
      //   this.$q.sessionStorage.set(from.fullPath, fromPosition)
      // } else {
      //   this.$q.sessionStorage.set(from.fullPath, 0)
      // }
    }
  },
  mounted () {
    this.$root.$on('scrollToTop', cb)
    // this.prototype.$scrollArea = this.$refs.scrollArea
    // // console.log(getScrollTarget(this.$refs.scrollArea));
    // this.$on('scrollToTop', () => {
    //   this.$refs.scrollArea.setScrollPosition(0)
    // })
    // // 初始化图片
    // this.initClient()
    // let that = this
    // window.addEventListener("resize", debounce(() => {
    //   that.$nextTick(() => {
    //     that.initClient()
    //   })
    // }, 300));
    // localStorage.setItem(localStorage.getItem(localStorage.getItem(local)))
    // this.onScroll = debounce(this.onScroll, 500)
  },
  methods: {
    // 滚动
    ScrollToPosition (e) {
      this.$refs.scrollArea.setScrollPosition(e, 300)
    },
    scrollToTop () {
      this.$refs.scrollArea.setScrollPosition(0)
    },
    // 获取位置，在使用前请做好节流或防抖处理
    getPosition () {
      return this.$refs.scrollArea.getScrollPosition()
    },
    onScroll (info) {
      const { position } = info
      // console.log(position, this.backgroundHeight);
      if (position > this.backgroundHeightDiff) { // 背景图高度
        this.ypos = 'bottom'
      } else {
        this.ypos = - position + 'px'
      }
    },
    initClient () {
      // 1345/960 高/宽 比例 
      // 获取屏幕宽高，计算背景图的高度，动态改变背景图定位
      this.clientHeight = document.body.clientHeight
      this.clientWidth = document.body.clientWidth
      this.backgroundHeightDiff = Math.ceil(this.clientWidth * (1345 / 960)) - this.clientHeight
      // console.log(this.clientHeight, this.clientWidth, this.backgroundHeightDiff);
    }
  },
  /**
   * 当组件被 keep-alive 缓存时，切出路由会触发 deactivated 方法
   * 此时 this.BasePath 作为 key ，将滚动位置保存的 sessionStorage 中
   */
  deactivated () {
    console.log(`切换（from）：${this.BasePath}`)
    window.sessionStorage.setItem(this.$route.fullPath, this.getPosition())
  },

  /**
   * 当组件被 keep-alive 缓存时，切回路由会触发 activated 方法
   * 此时从 sessionStorage 中获取滚动位置
   */
  activated () {
    console.log(`切换（to）：${this.$route.path}`)
    const t = window.sessionStorage.getItem(this.$route.fullPath)
    if (t) {
      this.ScrollToPosition(t)
    }
  },
}
</script>


<style lang="scss" scoped>
#scroll-main {
  height: 100vh;
  width: 100vw;
  .toolbar {
    max-width: 1200px;
    height: 64px;
    margin: 0 auto;
  }
  .page-main {
    background-image: url("~assets/bg_body.png");
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-attachment: fixed;
  }
  .bg-height-full {
    background-image: url("~assets/bg_body.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;
    background-position: cover;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .fade-enter {
    opacity: 0;
    transform: translate3d(0, -100px, 0);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translate3d(0, 100px, 0);
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s ease;
  }
}
</style>