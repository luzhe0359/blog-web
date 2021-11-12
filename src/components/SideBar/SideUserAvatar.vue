<template>
  <q-card class="q-mb-lg">
    <q-card-section class="column flex-center">
      <q-avatar class="cursor-pointer" size="100px">
        <q-img basic native-context-menu alt="足各路" src="https://oss.zugelu.com/other/logo.webp" spinner-color="grey" />
      </q-avatar>
      <div class="text-h6 text-weight-bold q-my-xs">足各路</div>
      <div class="text-grey-8">要逼自己优秀, 然后骄傲的活着 。</div>
    </q-card-section>
    <q-card-section class="row q-pt-none">
      <router-link class="col-4" :to="`/article`">
        <div class="column flex-center">
          <div>文章</div>
          <countTo :startVal='0' :endVal='50' :duration='3000'></countTo>
        </div>
      </router-link>
      <router-link class="col-4" :to="`/article`">
        <div class="column flex-center">
          <div>标签</div>
          <countTo :startVal='0' :endVal='12' :duration='3000'></countTo>
        </div>
      </router-link>
      <router-link class="col-4" :to="`/article`">
        <div class="column flex-center">
          <div>分类</div>
          <countTo :startVal='0' :endVal='12' :duration='3000'></countTo>
        </div>
      </router-link>
    </q-card-section>
    <!-- <q-separator inset /> -->
    <q-card-section class="q-pt-none">
      <div class="row justify-center items-center no-wrap q-mb-sm">
        <q-separator inset />
        <div class="col-3 text-h6 text-center">社交</div>
        <q-separator inset />
      </div>
      <div class="row justify-center q-gutter-sm">
        <q-icon class="cursor-pointer social" v-for="item in tagList" :key="item.name" :name="item.icon" size="26px" @click="copy(item)">
          <q-tooltip :delay="200" transition-show="scale" transition-hide="scale">
            {{item.tooltip}}
          </q-tooltip>
        </q-icon>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import countTo from 'vue-count-to';
import { copyToClipboard } from 'quasar'


export default {
  name: 'SideUserAvatar',
  components: {
    countTo
  },
  data () {
    return {
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
  }
}
</script>

<style lang="scss" scoped>
/* #SideUserAvatar {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  overflow: hidden;
  .bg-box {
    height: 55%;
    .avatar-bg {
      background: url("~assets/bg_logo.webp") no-repeat;
      background-position: 90% 50%;
      background-size: cover;
      animation: kenburns-top-right 5s cubic-bezier(0.47, 0, 0.745, 0.715)
        reverse both;
    }
  }
  .avatar {
    width: 90px;
    height: 90px;
    position: absolute;
    z-index: 100;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -60%);
    background-size: cover;
    background-repeat: no-repeat;
    .avatar-logo {
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
      animation: rotate-in-2-cw 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }
    &:hover {
      .avatar-logo {
        animation: rotate-out-2-fwd 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)
          both;
      }
      .avatar-user {
        position: relative;
        top: -100%;
        display: block !important;
        animation: rotate-in-2-cw 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
      }
    }
  }
  .title-box {
    height: 45%;
    position: relative;
  }
  .name {
    padding-top: 15%;
    font-size: 18px;
    font-weight: 600;
    line-height: 26px;
  }
} */
</style>
