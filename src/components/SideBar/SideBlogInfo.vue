<template>
  <!-- <div id="SideBlogInfo" class="full-width q-pt-lg ">
    <div class="text-h6 q-mb-sm">博客信息</div>
    <div>
      <q-chip v-for="item in countList" :key="item.icon" :icon="item.icon" class="q-mr-md q-ml-none q-mb-sm q-pa-md small-shadow">
        <div class="q-mr-xs">{{ item.name }}</div>
        <div v-if="item.name === '已运行'">{{item.count}}</div>
        <countTo v-else :startVal='0' :endVal='item.count' :duration='3000'></countTo>
      </q-chip>
    </div>
  </div> -->
  <q-card class="q-mb-lg">
    <q-card-section>
      <div class="row justify-center items-center no-wrap q-mb-sm">
        <q-separator inset />
        <div class="col-3 text-h6 text-center">网站</div>
        <q-separator inset />
      </div>
      <div>
        <div class="row justify-center q-mb-md">
          {{runTime}}
        </div>
        <div class="row justify-between" v-for="item in countList">
          <span>{{item.name}}</span>
          <countTo :startVal='0' :endVal='item.count' :duration='3000'></countTo>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import countTo from 'vue-count-to';

import { countArticle } from 'src/api/article.js'

export default {
  name: 'SideBlogInfo',
  components: {
    countTo
  },
  data () {
    return {
      countList: [
        // { name: '已运行', count: 0, icon: 'iconfont icon-yunhang' },
        { name: '访问总数', count: 0, icon: 'iconfont icon-fangwenliang' },
        { name: '点赞总数', count: 0, icon: 'favorite_border' },
        { name: '评论总数', count: 0, icon: 'iconfont icon-wenzhang' },
      ],
      runTime: '',
      creatTime: '2021-7-1 00:00:00',
      timmer: null
    }
  },
  created () {
    this.initCount()
  },
  mounted () {
    this.runTime = this.dateDiff()
    this.timmer = setInterval(() => {
      this.runTime = this.dateDiff()
    }, 1000)
  },
  methods: {
    /**
    * 日期差
    * @param {String} d 日期
    * @return {String} 日期差
    */
    dateDiff () {
      let now = new Date().getTime() // 获取当前时间戳
      let diff = now - new Date(this.creatTime).getTime() // 获取博客创建时间戳
      diff = diff / 1000

      let year = Math.floor(diff / (365 * 24 * 3600)) // 年
      diff %= 365 * 24 * 3600
      let month = Math.floor(diff / (30 * 24 * 3600)) // 月
      diff %= 30 * 24 * 3600
      let day = Math.floor(diff / (24 * 3600)) // 天
      diff %= 24 * 3600
      let hour = Math.floor(diff / 3600) // 时
      diff %= 3600
      let minute = Math.floor(diff / 60) // 分
      diff %= 60
      let second = Math.floor(diff) // 秒

      return year + '年' + this.addZero(month) + '月' + this.addZero(day) + '天' + this.addZero(hour) + '时' + this.addZero(minute) + '分' + this.addZero(second) + '秒';
    },
    // 为数字添加0前缀
    addZero (num) {
      if (num < 10) {
        num = '0' + num;
      }
      return num;
    },
    // 初始化统计信息
    initCount () {
      countArticle().then((res) => {
        let { views, likes, comments } = res.data
        this.countList[0].count = views || 0
        this.countList[1].count = likes || 0
        this.countList[2].count = comments || 0
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timmer)
    this.timmer = null
  }
}
</script>

<style lang="scss" scoped>
/deep/ .icon-yunhang {
  animation: rotate-center 5s linear infinite both;
}
</style>
