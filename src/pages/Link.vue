<template>
  <q-page id="link">
    <div class="text-center q-pt-xl q-pb-md">
      <div class="text-h3">要逼自己优秀，然后骄傲的活着</div>
      <p class="text-subtitle1 text-grey q-pt-lg">Force yourself to be excellent and live with pride.</p>
    </div>
    <div class="row">
      <q-intersection transition="scale" class="link-card col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="item in linkList" :key="item._id">
        <q-card class="q-ma-sm bg-grey q-py-md shadow-12">
          <q-card-section class="row no-wrap">
            <!-- 头像 -->
            <q-avatar clas size="90px">
              <img :src="item.logo | imgBaseUrl">
            </q-avatar>
            <!-- 网站名、简介 -->
            <div class="q-pl-md q-pt-sm">
              <div class="text-h5 q-mb-sm">{{item.title}}</div>
              <div class="text-subtitle2">{{item.desc}}</div>
            </div>
            <!-- 链接 -->
            <q-btn type="a" target="_blank" :href="item.url" class="glossy" padding="6px 32px" rounded color="deep-orange" label="前往参观" />
          </q-card-section>
        </q-card>
      </q-intersection>
    </div>
  </q-page>
</template>

<script>
import BaseContainer from 'src/components/Container/BaseContainer'
import { findLinkList } from 'src/api/link.js'

export default {
  name: 'About',
  components: {
    BaseContainer
  },
  data () {
    return {
      linkList: []
    }
  },
  mounted () {
    this.findLinkList()
  },
  methods: {
    findLinkList () {
      findLinkList().then(res => {
        this.linkList = res.data
      })
    },
    goLink (url) {
      window.open(url)
    }
  },
}
</script>
<style lang="scss" scoped>
#link {
  color: #fff;
  // 在大多数情况下，要求将CSS应用于QIntersection元素，以便在不渲染内部内容时将其用作必要的填充符。 这将提供平滑的滚动体验，因为不这样的话滚动将会不规律地跳跃。
  // 需要CSS的此类示例将是，例如，固定高度或至少最小高度
  .link-card {
    height: 100%;
    min-height: 180px;
    min-width: 25%;
    border-radius: 4px;
    margin-bottom: 32px;
    .glossy {
      height: 32px;
      position: absolute;
      bottom: -48px;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}

@media (max-width: $breakpoint-xs-max) {
  .link-card {
    margin-bottom: 10px !important;
  }
}
</style>

