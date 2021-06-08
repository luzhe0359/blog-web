<template>
  <q-page id="about">
    <q-infinite-scroll @load="onLoad" debounce='100' :offset="250">
      <div class="text-h5 text-red q-my-sm">关于我</div>
      <p>90后，一名前端开发者，现居北京。</p>
      <p>技术宅一枚，喜欢折腾各种前端技术，完美主义者。</p>
      <p>人生理念：生命不息，折腾不止。自己动手，丰衣足食。</p>
      <p>爱好相关：电影、综艺、游戏(前DNF爱好者，现主玩LOL）</p>
      <div class="text-h5 text-red q-my-sm">关于博客</div>
      <p>首先得感谢我的发小@某萌，提供的UI支持。整个博客的设计都出自与她。她的邮箱xxxxx.@163.com</p>
      <p>写这个博客的主要目的是分享一些实用的软件和技巧、技术难题、折腾经历、生活记录等。</p>
      <div class="text-h5 text-red q-my-sm">博客记录</div>
      <p class="text-dark">2020年末，开始有了建博客的idea。了解各种UI框架后，最终决定使用
        <strong>quasar</strong>。
        为什么使用Quasar？<a target="_blank" href="http://www.quasarchs.com/introduction-to-quasar/">点击此处了解更多。</a>
      </p>
      <!-- timeline -->
      <q-timeline :layout="layout" color="secondary" class="text-dark">
        <q-timeline-entry heading>
          <div class="text-h5 text-center q-mt-xl"> 记录博客建站的点滴</div>
        </q-timeline-entry>
        <q-timeline-entry :title="item.title" :color="item.finish?'red':''" :icon="item.finish?'done_all':''" :subtitle="item.date" :side="index%2 === 0?'left':'right'" v-for="(item,index) in timelineList" :key="item._id">
          <div class="pre-line">{{item.body}}</div>
        </q-timeline-entry>
      </q-timeline>
      <!-- loading -->
      <template v-slot:loading>
        <div v-show="pageNum <= maxPageNum" class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
      <q-banner v-show="pageNum > maxPageNum" inline-actions rounded class="no-more text-center text-dark">
        加载完毕了
      </q-banner>
    </q-infinite-scroll>
  </q-page>
</template>

<script>
import { findTimelineList } from 'src/api/timeline.js'

const defaultPageInfo = {
  pageNum: 1,
  pageSize: 5
}
export default {
  name: 'About',
  components: {
  },
  // preFetch ({ store, currentRoute, previousRoute, redirect, ssrContext, urlPath, publicPath }) {
  //   let params = {
  //     pageSize: defaultPageInfo.pageSize,
  //     pageNum: defaultPageInfo.pageNum
  //   }
  //   return store.dispatch('about/LoadTimelineList', params)
  // },
  data () {
    return {
      timelineList: [],
      pageNum: 1,
      pageSize: 3,
      total: 10,
    }
  },
  computed: {
    layout () {
      return this.$q.screen.lt.sm ? 'dense' : (this.$q.screen.lt.md ? 'comfortable' : 'loose')
    },
    maxPageNum () {
      return Math.ceil(this.total / this.pageSize)
    },
    // timelineList () {
    //   return this.$store.state.about.timelineList
    // },
  },
  created () {
  },
  methods: {
    onLoad (index, done) {
      if (index > this.maxPageNum) return done()
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      findTimelineList(params).then(res => {
        this.pageNum++;
        this.timelineList.push(...res.data)
        this.total = res.total
        done()
      }).catch(err => {
        throw new Error(err)
      })
    },
  },
}
</script>
<style lang="scss" scoped>
#about {
  color: white;
  padding-top: 50px;
  p {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.75rem;
    letter-spacing: 0.00937em;
  }

  .pre-line {
    white-space: pre-line;
  }

  .no-more {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

@media (max-width: $breakpoint-xs-max) {
  #about {
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

