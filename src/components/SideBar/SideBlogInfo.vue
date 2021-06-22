<template>
  <div id="SideBlogInfo" class="full-width q-pt-lg ">
    <div class="text-h6 q-mb-sm">博客信息</div>
    <div>
      <q-chip outline v-for="item in countList" :key="item.icon" :icon="item.icon" color="grey" class="q-mr-md q-ml-none q-mb-sm">
        <div class="q-mr-xs">{{ item.name }}</div>
        <div v-if="item.name === '已运行'">{{item.count}}</div>
        <countTo v-else :startVal='0' :endVal='item.count' :duration='3000'></countTo>
      </q-chip>
    </div>
  </div>
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
        { name: '已运行', count: 0, icon: 'iconfont icon-yunhang' },
        { name: '访问总数', count: 0, icon: 'iconfont icon-fangwenliang' },
        { name: '文章总数', count: 0, icon: 'iconfont icon-wenzhang' },
        { name: '点赞总数', count: 0, icon: 'favorite_border' },
      ],
      creatTime: '2021-1-1 20:10:10',
      timmer: null
    }
  },
  watch: {
    views (newVal) {
      this.countList[1].count = parseInt(newVal)
    },
    likes (newVal) {
      this.countList[3].count = parseInt(newVal)
    },
  },
  created () {
    this.initCount()
  },
  mounted () {
    this.countList[0].count = this.dateDiff()
    this.timmer = setInterval(() => {
      this.countList[0].count = this.dateDiff()
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
      let day = Math.floor(diff / (24 * 3600)) // 日
      diff %= 24 * 3600
      let hour = Math.floor(diff / 3600) // 时
      diff %= 3600
      let minute = Math.floor(diff / 60) // 分
      diff %= 60
      let second = Math.floor(diff) // 秒

      return year + '年' + this.addZero(month) + '月' + this.addZero(day) + '日' + this.addZero(hour) + '时' + this.addZero(minute) + '分' + this.addZero(second) + '秒';
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
        let { views, likes, total } = res.data
        this.countList[1].count = views
        this.countList[2].count = total
        this.countList[3].count = likes
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
