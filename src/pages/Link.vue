<template>
  <q-page id="link">
    <div class="text-center q-pt-xl q-pb-md">
      <div class="title text-h4 text-white" :class="{'focus-in-contract':$q.screen.gt.md}">
        如果可以 , 带着你的
        <q-btn round icon="iconfont icon-youlianguanliicon" @click="dialog=true" /> ,
        我们把酒言欢 。
      </div>
      <p class="text-subtitle1 text-grey q-pt-lg" :class="{'focus-in-contract':$q.screen.gt.md}">如您添加了小站链接，请邮件告知 <span class="text-grey-5 cursor-pointer" @click="copy($event)">luzhe0359@163.com</span> </p>
    </div>
    <div class="row">
      <q-intersection transition="scale" class="card-box col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="item in linkList" :key="item._id">
        <q-card class="q-ma-sm q-py-md shadow-12 cursor-pointer card-bg overflow-hidden" @click="openLink(item.url)">
          <div v-if="item.isTop" class="good absolute-top-right rotate-45"> 优 秀</div>
          <q-card-section class="row no-wrap">
            <!-- 头像 -->
            <q-avatar size="90px">
              <img :src="item.logo">
            </q-avatar>
            <!-- 网站名、简介 -->
            <div class="q-pl-md">
              <div class="text-h5 q-mb-sm">{{item.title}}</div>
              <div class="text-subtitle2 ellipsis-2-lines text-grey-8">{{item.desc}}</div>
            </div>
            <!-- 链接 -->
            <!-- <a href="javascript:;" @click="openLink(item.url)">
              <span>去看看</span>
              <span>去看看</span>
            </a> -->
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
    <q-dialog v-model="dialog" position="right">
      <q-card style="width: 500px; max-width: 80vw;">
        <q-card-section>
          <div class="text-teal q-pl-sm" style="border-left: 5px solid #009688">
            <div class="text-h6">本站信息</div>
            <div>博客名称：足各路的个人博客</div>
            <div>博客介绍：一足一路一世界</div>
            <div>博客地址：https://www.zugelu.com</div>
            <div>博客标识：https://www.zugelu.com/images/logo.webp</div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-pink q-pl-sm" style="border-left: 5px solid #e91e63">
            <div class="text-h6">友链须知</div>
            <div>优选[技术]、[生活]类博客站点友链</div>
            <div>拒绝暴力、涉黄、政治等不健康的站点做任何交换</div>
            <div>请先添加本站链接并满足以上要求, 再邮箱/留言，</div>
            <div>如果更换了域名，还请告知，以便更改，万分感谢！salute ！！</div>
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-green q-pl-sm" style="border-left: 5px solid #4caf50">
            <div class="text-h6">申请格式</div>
            <div>站点名称：(网站名称)</div>
            <div>站点介绍：(简介限20字)</div>
            <div>站点地址：(需带上http/s)</div>
            <div>站点标识：(需一张支持外链的图片地址)</div>
          </div>

        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { copyToClipboard } from 'quasar'
import { mapGetters } from 'vuex'

export default {
  name: 'Link',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    return store.dispatch('link/LoadLinkList')
  },
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapGetters([
      'linkList',
    ]),
  },
  mounted () {
  },
  methods: {
    openLink (url) {
      window.open(url)
    },
    copy (e) {
      copyToClipboard(e.currentTarget.innerHTML)
        .then(() => {
          this.$msg.success('复制成功')
        })
        .catch(() => {
          this.$msg.error('复制失败')
        })
    }
  },
}
</script>
<style lang="scss" scoped>
#link {
  color: #000;
  // 在大多数情况下，要求将CSS应用于QIntersection元素，以便在不渲染内部内容时将其用作必要的填充符。 这将提供平滑的滚动体验，因为不这样的话滚动将会不规律地跳跃。
  // 需要CSS的此类示例将是，例如，固定高度或至少最小高度
  .card-box {
    height: 100%;
    min-height: 120px;
    min-width: 25%;
    .card-bg {
      border-radius: 16px;
      background-color: rgba(255, 255, 255, 0.5);
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease-in-out;
      &:hover {
        box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.2);
        .q-avatar {
          animation: rotate-center 0.6s ease-in-out both;
        }
      }
      .good {
        width: 100px;
        height: 38px;
        font-size: 22px;
        line-height: 38px;
        text-align: center;
        color: #1296db;
        background-image: url(~assets/bg_link.webp);
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
      a {
        height: 40px;
        position: absolute;
        bottom: -58px;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: all 0.5 ease;
      }
    }
  }
}
</style>

