<template>
  <div
    id="SideUserTag"
    class="full-width q-mt-lg"
  >
    <div class="text-h6 q-mb-md">个性标签</div>
    <q-scroll-area
      style="cursor:pointer;"
      horizontal
      ref="scrollArea"
      :thumb-style="thumbStyleHorizontal"
      v-touch-pan.horizontal.prevent.mouse="handlePan"
      class="tag-list"
    >
      <div class="row no-wrap">
        <div
          class="tag q-mr-sm"
          v-for="tag in tagList"
          :key="tag"
        >
        </div>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
import { thumbStyleHorizontal } from 'src/utils/thumbStyle'

export default {
  name: 'SideUserTag',
  data () {
    return {
      tagList: [1, 2, 3, 4, 5],
      thumbStyleHorizontal
    }
  },
  methods: {
    // 触摸平移事件
    handlePan ({ evt, ...info }) {
      this.animateScroll(info.offset.x)
    },
    // 设置滚动距离
    animateScroll (position) {
      let horizontalPosition = this.$refs.scrollArea.getScrollPosition()
      if (horizontalPosition < 0) return
      this.$refs.scrollArea.setScrollPosition(horizontalPosition + position, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
#SideUserTag {
  .tag-list {
    height: 165px;
  }
  .tag {
    width: 160px;
    height: 160px;
    background: #ffffff;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius: 42px;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
