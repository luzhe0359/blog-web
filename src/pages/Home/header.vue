<template>
  <div class="page-header">
    <div class="text-center q-py-md">
      <h1 class="text-h4" :class="{'focus-in-contract':$q.screen.gt.md}" style="line-height: 4rem;">要逼自己优秀 , 然后骄傲的活着 。</h1>
      <p class="text-subtitle1 text-grey q-pt-md" :class="{'focus-in-contract':$q.screen.gt.md}">Force yourself to be excellent and live with pride.</p>
    </div>
    <div class="text-center q-gutter-sm">
      <q-icon class="cursor-pointer slide-in-blurred-bottom " v-for="item in tagList" :key="item.name" :name="item.icon" :size="iconSize" @click="copy(item)">
        <q-tooltip :delay="200" transition-show="scale" transition-hide="scale">
          {{item.tooltip}}
        </q-tooltip>
      </q-icon>
    </div>
    <div class="scroll-down cursor-pointer text-center" @click="scrollToMain">
      <q-icon class="scroll-down-effect" name="keyboard_arrow_down" size="50px" color="grey-6" />
    </div>
  </div>
</template>

<script>
import { copyToClipboard, scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll
import Icon from 'components/common/Icon'

export default {
  components: {
    Icon
  },
  data () {
    return {
      iconSize: '36px',
      tagList: [
        { name: 'github', tooltip: 'github: https://github.com/luzhe0359', link: 'https://github.com/luzhe0359', icon: 'iconfont icon-git' },
        { name: 'CSDN', tooltip: 'CSDN: https://blog.csdn.net/weixin_44388523', link: 'https://blog.csdn.net/weixin_44388523', icon: 'iconfont icon-csdn' },
        { name: '网易邮箱', tooltip: '网易邮箱: luzhe0359@163.com', link: 'luzhe0359@163.com', icon: 'iconfont icon-wangyihao' },
        { name: 'QQ', tooltip: 'QQ: 1141178844', link: '1141178844', icon: 'iconfont icon-qq' },
        { name: '微信', tooltip: '微信: Mimanchi-zt', link: 'Mimanchi-zt', icon: 'iconfont icon-weixin' },
      ],
    }
  },
  methods: {
    // 复制相关信息
    copy ({ link, tooltip }) {
      if (link.indexOf("http") != -1) {
        window.open(link)
        return
      }
      copyToClipboard(link)
        .then(() => {
          this.$msg.success('成功复制 ' + tooltip)
        })
        .catch(() => {
          this.$msg.error('复制失败')
        })
    },
    // 滚动到内容区
    scrollToMain () {
      let el = document.getElementsByClassName('page-inner')[0]
      this.scrollToElement(el)
    },
    // 滚动到元素
    scrollToElement (el) {
      let target = getScrollTarget(el)
      let offset = target.innerHeight // 滚动位置
      let duration = 300 // 动画时长
      setScrollPosition(target, offset, duration)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  height: calc(100vh - 50px);
  .scroll-down {
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    .scroll-down-effect {
      animation: scroll-down-effect 1.5s infinite;
    }
  }
}
@media (max-width: $breakpoint-sm-max) {
  .page-header {
    height: calc(100vh - 50px) !important;
  }
}
</style>