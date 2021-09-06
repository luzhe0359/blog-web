<template>
  <q-page id="about">
    <div class="hey-box">
      <div class="relative-position">
        <div class="hey">
          HEY !<br />
          IT'S BAOUT ME.
        </div>
        <div class="absolute-top-right row">
          <div class="dark-ball"></div>
          <div class="dark-ball"></div>
          <div class="dark-ball"></div>
        </div>
      </div>
    </div>
    <div class="content-box text-h6">
      <div class="short-line"></div>
      <div class="short-title">
        关于我 <br />
        朋友们都叫我毛路 (别称)
      </div>
      <div class="short-desc">
        90后，一名前端开发者，现居北京 <br>
        喜欢折腾各种前端技术，但又不精通，算是一个硬伤<br>
        爱代码、爱电影、爱篮球、爱游戏 (前DNF爱好者，现主玩LOL）<br>
      </div>
      <!-- 站位 -->
      <div class="row justify-end q-mt-xl gt-md" style="height:200px;"> </div>
      <div class="short-line"></div>
      <div class="short-title">
        关于本站 <br />
        本站 <a class="text-light-blue" target="_blank" href="https://zugelu.com">zugelu.com</a> 属于个人博客
      </div>
      <div class="short-desc">
        当然，有意向写文章的朋友可以联系我开通后台权限，在本站发表属于你自己的文章 <br>
        搭建这个博客的主要目的是记录并分享一些实用的编码技巧、折腾经历、生活记录等 <br>
      </div>
      <div class="short-desc">
        特别感谢我的发小@萌，提供的UI支持，整个博客的设计风格均由她提供。她的 <a class="text-light-blue" target="_blank" href="https://www.zcool.com.cn/work/ZNTEwMjc4OTI=.html">作品集</a>
      </div>
      <div class="short-desc">
        本站所使用的技术栈如下：<br>
        前端： vue quasar axios <br>
        后端： node express mongodb redis <br>
        其他： git pm2
      </div>

      <!-- timeline -->
      <div class="short-line" style="margin-top: 150px;"></div>
      <div class="short-title">记录博客建站的点滴 </div>
      <q-timeline layout="dense" class="text-dark" dark>
        <q-timeline-entry :title="item.title" color="dark" :subtitle="item.date" v-for="item in timelineList" :key="item._id">
          <div class="pre-line">{{item.body}}</div>
        </q-timeline-entry>
      </q-timeline>
    </div>
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
  .hey-box {
    padding: 70px 60px 60px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.48);
    .hey {
      font-size: 100px;
      line-height: 126px;
      font-weight: 550;
      font-family: Alibaba-PuHui Ti-H, Alibaba-PuHuiTi;
      color: #000000;
      span {
        display: inline-block;
        width: 15px;
      }
    }
    .dark-ball {
      width: 22px;
      height: 22px;
      background-color: #000;
      margin-right: 20px;
    }
  }

  .content-box {
    padding: 0 60px;
    color: #000000;
    .short-line {
      width: 75px;
      height: 2px;
      background: #000000;
      margin-bottom: 60px;
      margin-top: 150px;
    }
    .short-title {
      font-weight: 600;
    }
    .short-desc {
      opacity: 0.7;
      font-weight: 500;
      margin-top: 80px;
    }
    .pre-line {
      font-size: 16px;
    }
  }

  /deep/ .q-timeline__dot:before {
    border: 2px solid rgba(255, 255, 255, 1);
    height: 14px;
    width: 14px;
  }
}

@media (min-width: $breakpoint-sm-min) {
  .q-timeline {
    background: rgba(255, 255, 255, 0.5);
    padding: 10px;
  }
}

@media (max-width: $breakpoint-sm-max) {
  #about {
    color: $dark;
    padding: 20px;
    .hey-box {
      .hey {
        font-size: 70px;
      }
    }
  }
  /deep/.q-timeline--dense--right .q-timeline__entry {
    padding-left: 50px !important;
  }
  /deep/ .q-timeline--dense--right .q-timeline__entry--icon .q-timeline__dot {
    left: 0 !important;
  }
}

@media (max-width: 800px) {
  #about {
    .hey-box {
      padding: 50px;
      .hey {
        font-size: 50px;
        line-height: 80px;
      }
    }
  }
}

@media (max-width: $breakpoint-xs-max) {
  #about {
    .hey-box {
      padding: 20px;
      .hey {
        font-size: 30px;
        line-height: 50px;
      }
      .dark-ball {
        width: 10px;
        height: 10px;
        margin-right: 5px;
      }
    }
    .content-box {
      padding: 0 10px;
    }
  }
}
</style>

