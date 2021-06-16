<template>
  <q-page id="link">
    <div class="text-center q-pt-xl q-pb-md">
      <div class="text-h3" :class="{'focus-in-contract':$q.screen.gt.md}">要逼自己优秀，然后骄傲的活着</div>
      <p class="text-subtitle1 text-grey q-pt-lg" :class="{'focus-in-contract':$q.screen.gt.md}">Force yourself to be excellent and live with pride.</p>
    </div>
    <div class="row">
      <q-intersection transition="scale" class="card-box col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="item in linkList" :key="item._id">
        <q-card class="q-ma-sm q-py-md shadow-12 card-bg">
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
import { mapGetters } from 'vuex'

export default {
  name: 'Link',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    return store.dispatch('link/LoadLinkList')
  },
  data () {
    return {
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
    goLink (url) {
      window.open(url)
    }
  },
}
</script>
<style lang="scss" scoped>
#link {
  color: #fff;
  .focus-in-contract {
    animation: focus-in-contract 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  // 在大多数情况下，要求将CSS应用于QIntersection元素，以便在不渲染内部内容时将其用作必要的填充符。 这将提供平滑的滚动体验，因为不这样的话滚动将会不规律地跳跃。
  // 需要CSS的此类示例将是，例如，固定高度或至少最小高度
  .card-box {
    height: 100%;
    min-height: 180px;
    min-width: 25%;
    border-radius: 4px;
    margin-bottom: 32px;
    .card-bg {
      // color: #000;
      background-color: $grey-6;
      .glossy {
        height: 32px;
        position: absolute;
        bottom: -48px;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

@media (max-width: $breakpoint-xs-max) {
  .card-box {
    margin-bottom: 10px !important;
  }
}
</style>

