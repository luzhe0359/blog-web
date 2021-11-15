<template>
  <q-layout view="hHh Lpr lff" id="layout">
    <!-- header -->
    <q-header id="header" :class="{'bg-mask': menuMerge}" :elevated="menuMerge" reveal height-hint="50" :reveal-offset="10">
      <q-toolbar>
        <!-- <q-no-ssr> -->
        <q-btn flat dense round aria-label="Menu" class="lt-sm" :icon="leftDrawerOpen === true?'menu_open':'menu'" @click="leftDrawerOpen = !leftDrawerOpen" />
        <!-- </q-no-ssr> -->
        <q-toolbar-title style="min-width:155px;">
          <router-link class="text-h6 text-weight-bold" to="/" replace> 足各路的博客 </router-link>
        </q-toolbar-title>
        <q-space />
        <!-- 菜单 -->
        <ToolBarMenu />
        <!-- 工具栏 -->
        <ToolBarUtil />
      </q-toolbar>
    </q-header>
    <!-- footer -->
    <Footer />
    <!-- darwer -->
    <q-drawer class="lt-sm z-max" v-model="leftDrawerOpen" bordered :width="240">
      <!-- 侧边导航栏-->
      <SideMenu />
    </q-drawer>
    <!-- container -->
    <q-page-container>
      <keep-alive :include="cacheList">
        <router-view :key="$route.fullPath" />
      </keep-alive>
      <!-- <Footer /> -->
    </q-page-container>
    <!-- 配置项 -->
    <Setting :showSetting="showSetting" />
    <!-- 回到顶部 -->
    <q-page-scroller position="bottom-right" :scroll-offset="300" :offset="[0, 64]">
      <!-- <q-btn fab icon="keyboard_arrow_up" class="top-btn" /> -->
      <q-btn padding="xs" color="light-blue" icon="expand_less">
        <q-tooltip anchor="center left" self="center right" :offset="[5, 5]" transition-show="jump-left" transition-hide="jump-right">回到顶部</q-tooltip>
      </q-btn>
    </q-page-scroller>
    <!-- 滚动监听器 -->
    <q-scroll-observer debounce="200" @scroll="scrollHandler" />
  </q-layout>
</template>

<script>
import Footer from 'components/Common/Footer'
import SideMenu from 'components/SideMenu/SideMenu.vue'
import ToolBarMenu from 'components/ToolBar/ToolBarMenu.vue'
import ToolBarUtil from 'components/ToolBar/ToolBarUtil.vue'
import Setting from 'components/Common/Setting'

let defaultParams = {
  pageNum: 1,
  pageSize: 5
}
export default {
  name: 'MainLayout',
  components: {
    SideMenu,
    ToolBarUtil,
    ToolBarMenu,
    Footer,
    Setting
  },
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    // 预取数据 - 网页只请求一次的数据
    return Promise.all([
      store.dispatch('article/LoadTopHotArticleList', defaultParams),
      store.dispatch('article/LoadCategoryList'),
      store.dispatch('article/LoadTagList')
    ])
  },
  data () {
    return {
      leftDrawerOpen: false,
      showSetting: false,
      menuMerge: true,
      cacheList: ['Home']
    }
  },
  created () {
    let them = this.$q.sessionStorage.getItem('them-dark')
    if (them) {
      this.$q.dark.set(true)
    }
  },
  mounted () {
    console.log("%c 本站名称: ", "border:1px solid #e1e1e8; color:#1e73be;", " 足各路");
    console.log("%c 本站地址: ", "border:1px solid #e1e1e8; color:#1e73be;", " https://zugelu.com");
    console.log("%c 个人简历: ", "border:1px solid #e1e1e8; color:#1e73be;", " https://zugelu.com/resume.html");
    console.log("%c 个人邮箱: ", "border:1px solid #e1e1e8; color:#1e73be;", " luzhe0359@163.com");
  },
  methods: {
    // 滚动监听器
    scrollHandler (info) {
      const { position } = info
      this.menuMerge = position > 10 ? true : false
      this.showSetting = position > 220 ? true : false
    }
  },
}
</script>


<style lang="scss" scoped>
#header {
  background-color: transparent;
  &.bg-mask {
    color: $grey-8;
    background-color: rgba(255, 255, 255, 0.8);
  }
}
.q-toolbar__title {
  line-height: 1;
}
.q-page-container {
  padding-top: 0 !important;
}

@media (min-width: $breakpoint-md-min) {
  #header {
    padding: 0 20px;
  }
}
</style>