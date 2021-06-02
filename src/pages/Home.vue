<template>
  <q-page id="Home">
    <div class="text-center q-py-md">
      <div class="text-h3" style="line-height: 4rem;">要逼自己优秀, 然后骄傲的活着</div>
      <p class="text-subtitle1 text-grey q-pt-md">Force yourself to be excellent and live with pride.</p>
    </div>
    <div class="q-gutter-sm">
      <q-icon class="cursor-pointer user-tag" v-for="item in tagList" :key="item.name" :name="item.icon" :size="iconSize" @click="copy(item)">
        <q-tooltip :delay="200" transition-show="scale" transition-hide="scale">
          {{item.tooltip}}
        </q-tooltip>
      </q-icon>
    </div>
  </q-page>
</template>

<script>
import BaseContainer from 'src/components/Container/BaseContainer'
import { morph, colors, copyToClipboard } from 'quasar'

export default {
  name: 'Home',
  components: {
    BaseContainer
  },
  data () {
    return {
      iconSize: '32px',
      tagList: [
        { name: '网易云音乐', tooltip: 'github: https://github.com/luzhe0359', link: 'https://github.com/luzhe0359', icon: 'iconfont icon-git' },
        { name: 'CSDN', tooltip: 'CSDN: https://blog.csdn.net/weixin_44388523', link: 'https://blog.csdn.net/weixin_44388523', icon: 'iconfont icon-csdn' },
        { name: 'QQ', tooltip: 'QQ: 1141178844', link: '1141178844', icon: 'iconfont icon-qq' },
        { name: '微信', tooltip: '微信: Mimanchi-zt', link: 'Mimanchi-zt', icon: 'iconfont icon-weixin' },
      ],
    }
  },
  mounted () {
  },
  methods: {
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
    }
  },
}
</script>
<style lang="scss" scoped>
#Home {
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  .title {
    font-size: 60px;
  }
  .user-tag {
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-5px);
    }
  }
}
</style>

