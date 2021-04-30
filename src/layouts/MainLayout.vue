<template>
  <q-layout view="hHh Lpr lFf" id="main-layout">
    <!-- header -->
    <q-header height-hint="50" elevated reveal v-model="aaa" class="bg-dark" :reveal-offset="100">
      <q-toolbar class="max-width">
        <q-no-ssr>
          <q-btn flat dense round aria-label="Menu" class="lt-sm" :icon="leftDrawerOpen === true?'menu_open':'menu'" @click="leftDrawerOpen = !leftDrawerOpen" />
        </q-no-ssr>
        <q-space />
        <!-- 菜单 -->
        <ToolBarMenu />
        <!-- 工具栏 -->
        <ToolBarUtil />
      </q-toolbar>
    </q-header>
    <!-- darwer -->
    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-1" class="text-grey-8" :width="240" :mini="miniState" @mouseover="miniState = false" @mouseout="miniState = false">
      <!-- 侧边导航栏-->
      <SideMenu />
    </q-drawer>
    <!-- container -->
    <q-page-container ref="pagemain" class="full-container" :class="$q.screen.lt.md ?'bg-height-full': 'page-main'" :style="$q.screen.lt.md ?{}:{'background-position': '0 ' + ypos}">
      <!-- 切换动画 -->
      <transition appear name="fade" mode="out-in">
        <!-- 缓存 -->
        <keep-alive :include="cacheList">
          <router-view :key="$route.fullPath" />
        </keep-alive>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
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
  },
  data () {
    return {
      leftDrawerOpen: false,
      miniState: false,
      thumbStyle,
      ypos: '0',
      cacheList: ['Home', 'ArticleList', 'ArticleDetail'],
      aaa: true
    }
  },
  methods: {
  },
}
</script>


<style lang="scss" scoped>
#main-layout {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  .full-container {
    min-width: 100%;
    min-height: 100%;
    height: 100vh;
    box-sizing: border-box;
    overflow-y: scroll;
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
    background-attachment: fixed;
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