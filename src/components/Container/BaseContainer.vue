<template>
  <!-- 滚动区域 -->
  <q-scroll-area class="BaseContainer" :style="$q.screen.lt.md ?{'background-image': 'none'}:{'background-position': '0 ' + ypos}" ref="scrollArea" :thumb-style="thumbStyle" :visible="false" id="scrollArea" @scroll="onScroll">
    <q-no-ssr>
      <div class="row q-pa-md" :class="$q.screen.lt.md ?'': 'max-width'">
        <div class="row full-width">
          <!-- 主内容 -->
          <div class="col">
            <slot />
          </div>
          <!-- 侧边栏 -->
          <div v-show="!hideSideContainer" class="col-lg-4 col-md-4 gt-sm">
            <SideContainer />
          </div>
        </div>
        <!-- 底部栏 -->
        <Footer />
      </div>
    </q-no-ssr>
  </q-scroll-area>
</template>

<script>
import SideContainer from 'src/components/Side/SideContainer'
import Footer from 'src/components/Footer/Footer'
import { thumbStyle } from 'src/utils/thumbStyle'

export default {
  name: 'BaseContainer',
  components: {
    SideContainer,
    Footer
  },
  props: {
    hideSideContainer: { type: Boolean, default: false }, //是否隐藏博主信息（右侧内容）
  },
  data () {
    return {
      thumbStyle, // 滚动条样式
      // Mark the page where the current BaseContainer is located
      BasePath: '', // from路由
      clientWidth: 1920, // 屏幕宽度
      clientHeight: 966, // 屏幕高度
      bgOffsetHeight: 1345, // 背景图超出屏幕的宽度
      ypos: '0', // 背景图y轴定位
    }
  },
  computed: {
    id () {
      return this.$route.query.id
    }
  },
  methods: {
    /**
     * Roll to position
     * @param e
     */
    ScrollToPosition (e) {
      this.$refs.scrollArea.setScrollPosition(e, 300)
    },
    /**
     * Get the location, please do throttle or debounce treatment before use
     */
    getPosition () {
      return this.$refs.scrollArea.getScrollPosition()
    },
    initClient () {
      // 1345/960 背景图 高/宽比 
      // 获取屏幕宽高，计算背景图的高度，动态改变背景图定位
      this.clientHeight = document.body.clientHeight
      this.clientWidth = document.body.clientWidth
      // 超出高度 = 图片高度 - 屏幕高度
      this.bgOffsetHeight = Math.ceil(this.clientWidth * (1345 / 960)) - this.clientHeight
    },
    onScroll (info) {
      const { verticalPosition } = info
      // 滚动距离 > 背景超出高度 , 即背景图到底部了,图片定位至底部
      if (verticalPosition > this.bgOffsetHeight) { // 背景图高度
        this.ypos = 'bottom'
      } else {
        this.ypos = - verticalPosition + 'px'
      }
    }
  },

  mounted () {
    this.initClient()
    this.BasePath = this.$route.path

    // Ensure that each BaseContainer has a unique BasePath
    Object.freeze(this.BasePath)

    // If the page is refreshed, read the scroll position of the current page from sessionStorage,
    // You can open a browser window to see what sessionStorage has
    const toPosition = this.$q.sessionStorage.getItem(this.BasePath)
    if (toPosition) {
      this.ScrollToPosition(toPosition)
    }
  },
  /**
   * When the component is kept-alive cached, the deactivated method will be triggered when the route is cut out
   * At this time, this.BasePath is used as the key to save the scroll position in sessionStorage
   */
  deactivated () {
    console.log(`切换（from）：${this.BasePath}`)
    this.$q.sessionStorage.set(this.BasePath, this.getPosition())
  },
  /**
   * When the component is cached by keep-alive, the loop switch will trigger the activated method
   * Get the scroll position from sessionStorage at this time
   */
  activated () {
    console.log(`切换（to）：${this.$route.path}`)
    const toPosition = this.$q.sessionStorage.getItem(this.$route.path)
    if (toPosition) {
      this.ScrollToPosition(toPosition)
    }
  },
  /**
   * If the component is closed, clear the corresponding sessionStorage
   */
  destroyed () {
    // console.log(`销毁：${this.BasePath}`)
    this.$q.sessionStorage.remove(this.BasePath)
  }
}
</script>

<style lang="scss" scoped>
#scrollArea {
  height: calc(100vh - 50px);
  width: 100vw;
  background-image: url("~assets/bg_body.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-attachment: fixed;
}
</style>