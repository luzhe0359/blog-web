<template>
  <q-page id="about">
    <div class="text-h5 text-deep-orange q-my-sm"> 关于我 </div>
    <p>朋友们都叫我毛路 (专属外号)</p>
    <p>90后，一名前端开发者，现居北京</p>
    <p>喜欢折腾各种前端技术，但又不精通，算是一个硬伤</p>
    <p>爱代码、爱电影、爱篮球、爱游戏 (前DNF爱好者，现主玩LOL）</p>

    <!-- <div class="text-h5 text-deep-orange q-my-sm"> 关于本站</div>
    <p>首先得感谢我的发小@某萌，提供的UI支持。整个博客的设计风格均由她提供</p>
    <p>2020年末，开始有了搭建个人博客的idea。了解多种UI框架的利弊后，最终决定使用
      <strong>Quasar</strong>。
      为什么选择Quasar？<a target="_blank" href="http://www.quasarchs.com/introduction-to-quasar/">了解更多关于Quasar</a>
    </p>
    <p>写这个博客的主要目的是记录并分享一些实用的编码技巧、技术难题、折腾经历、生活记录等</p> -->

    <div class="text-h5 text-deep-orange q-my-sm"> 关于本站</div>
    <p>本站 <a class="text-light-blue" href="https://zugelu.com">zugelu.com</a> 属于个人博客</p>
    <p>当然，有意向写文章的朋友可以联系我开通后台权限，在本站发表属于你自己的文章</p>
    <p>搭建这个博客的主要目的是记录并分享一些实用的编码技巧、技术难题、折腾经历、生活记录等</p>
    <p>特别感谢我的发小@某萌，提供的UI支持。整个博客的设计风格均由她提供</p>
    <p>本站所使用的技术栈如下：</p>
    <p class="text-dark">前端: vue quasar axios</p>
    <p class="text-dark">后端: node express mongodb redis</p>
    <p class="text-dark">版本管理: git</p>
    <q-separator class="q-mb-md" />

    <!-- timeline -->
    <q-timeline :layout="layout" color="secondary" class="text-dark">
      <q-timeline-entry heading>
        <div class="text-h5 text-center q-mt-xl">
          <q-spinner-puff class="q-mb-xs q-mr-xs" color="deep-orange" size="1.2em" />
          <span>记录博客建站的点滴</span>
        </div>
      </q-timeline-entry>
      <q-timeline-entry :title="item.title" :color="item.finish?'deep-orange':'grey-5'" :icon="item.finish?'done_all':''" :subtitle="item.date" :side="index%2 === 0?'left':'right'" v-for="(item,index) in timelineList" :key="item._id">
        <div class="pre-line">{{item.body}}</div>
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'About',
  preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
    return store.dispatch('about/LoadTimelineList')
  },
  data () {
    return {
    }
  },
  mounted () {

  },
  computed: {
    ...mapGetters([
      'timelineList',
    ]),
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    },
  },
  methods: {
  },
}
</script>
<style lang="scss" scoped>
#about {
  color: $grey-1;
  padding-top: 50px;
  // background-color: rgba(255, 255, 255, 0.05);
  p {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
    letter-spacing: 0.00937em;
  }
  a {
    color: $dark;
  }

  .pre-line {
    white-space: pre-line;
  }

  .no-more {
    background-color: rgba(255, 255, 255, 0.2);
  }

  /deep/ .q-timeline--comfortable .q-timeline__heading {
    display: table-caption;
  }
}

@media (max-width: $breakpoint-xs-max) {
  #about {
    color: $grey-8;
    padding: 20px;
  }
  /deep/.q-timeline--dense--right .q-timeline__entry {
    padding-left: 50px !important;
  }
  /deep/ .q-timeline--dense--right .q-timeline__entry--icon .q-timeline__dot {
    left: 0 !important;
  }
}
</style>

