<template>
  <div
    class="BaseContent"
    :style="$q.screen.lt.md ?{'background-position': 'cover'}:{'background-position': '0 ' + ypos}"
  >
    <q-scroll-area
      ref="scrollArea"
      :thumb-style="thumbStyle"
      :visible="false"
      id="scrollArea"
      @scroll="onScroll"
    >
      <slot />
    </q-scroll-area>
  </div>
</template>

<script>
import { thumbStyle } from 'src/utils/thumbStyle'

export default {
  name: 'BaseContent',
  data () {
    return {
      thumbStyle, // 滚动条样式
      // Mark the page where the current BaseContent is located
      BasePath: '', // from路由
      clientWidth: 1920, // 屏幕宽度
      clientHeight: 966, // 屏幕高度
      backgroundHeight: 1345, // 默认1920px宽度
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
      // 1345/960 高/宽 比例 
      // 获取屏幕宽高，计算背景图的高度，动态改变背景图定位
      this.clientHeight = document.body.clientHeight
      this.clientWidth = document.body.clientWidth
      this.backgroundHeight = Math.ceil(this.clientWidth * (1345 / 960)) - this.clientHeight
    },
    onScroll (info) {
      console.log(info);
      const { verticalPosition } = info
      // console.log(position, this.backgroundHeight);
      if (verticalPosition > this.backgroundHeight) { // 背景图高度
        this.ypos = 'bottom'
      } else {
        this.ypos = - verticalPosition + 'px'
      }
    },
  },

  mounted () {
    this.initClient()
    this.BasePath = this.$route.path

    // Ensure that each BaseContent has a unique BasePath
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
.BaseContent {
  background-image: url("~assets/bg_body.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-attachment: fixed;
  #scrollArea {
    height: calc(100vh - 64px);
    width: 100vw;
  }
}
</style>