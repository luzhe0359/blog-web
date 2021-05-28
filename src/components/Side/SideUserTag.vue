<template>
  <div id="SideUserTag" class="full-width q-mt-lg">
    <div class="text-h6 q-mb-md">个性标签</div>
    <q-scroll-area horizontal ref="scrollArea" :thumb-style="thumbStyleHorizontal" v-touch-pan.horizontal.prevent.mouse="handlePan" class="tag-list cursor-pointer">
      <div class="row no-wrap">
        <!-- <div class="tag relative-position" v-for="tag in tagList" :key="tag.url" :style="{backgroundImage:`url(${tag.url})`}">
        </div> -->
        <q-img class="tag q-mr-md" :src="tag.url" v-for="tag in tagList" :key="tag.url">
          <div class="desc absolute-full text-subtitle2 flex flex-center">
            {{tag.name}}
          </div>
        </q-img>
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
      tagList: [
        { url: '/tag/tag1.png', name: '幽默' },
        { url: '/tag/tag4.png', name: '潜力股' },
        { url: '/tag/tag3.png', name: '90后' },
        { url: '/tag/tag2.png', name: '幸福' },
        { url: '/tag/tag5.png', name: '狂吃不胖' },
      ],
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
    border-radius: 42px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .desc {
      display: none;
    }
    &:hover {
      .desc {
        display: flex;
      }
    }
  }
}
</style>
