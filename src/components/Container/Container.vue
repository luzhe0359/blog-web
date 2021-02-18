<template>
  <div
    id="BaseContainer"
    class="row justify-between"
    :class="$q.screen.lt.lg?'q-px-sm':''"
  >
    <div class="q-pt-xxl col-lg-8 col-md-8 col-sm-12 col-xs-12">
      <!-- 切换动画 -->
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        name="fade"
        mode="out-in"
      >
        <!-- 主体内容 -->
        <router-view />
      </transition>
    </div>
    <div class="col-lg-4 col-md-4 col-sm-0 col-xs-0 side-container">
      <!-- 侧边内容 -->
      <SideContainer />
    </div>
  </div>
</template>

<script>
import { thumbStyle } from 'src/utils/thumbStyle'
import SideContainer from './SideContainer'

export default {
  name: 'BaseContainer',
  components: {
    SideContainer
  },
  data () {
    return {
      thumbStyle,
    }
  },
}
</script>

<style lang="scss" scoped>
#BaseContainer {
  max-width: 1200px;
  margin: 0 auto;
  .q-pt-xxl {
    padding-top: 200px;
    box-sizing: border-box;
  }
  .side-container {
    overflow: hidden; // col-0 手机端滑动,侧边栏显示bug
  }
}
</style>
