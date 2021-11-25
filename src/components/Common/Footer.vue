<template>
  <div id="footer" class="max-width text-body2">
    <q-card class="q-mb-lg">
      <q-card-section class="column items-center text-grey-8">
        <p><a target="_blank" href="https://beian.miit.gov.cn/">晋ICP备2021010367号</a></p>
        <div class="row justify-center items-center">
          <q-icon class="iconfont icon-yunhang q-mr-xs"></q-icon>
          <span> 已运行 {{runTime}}</span>
        </div>
        <p>系统由 Vue + Node + Quasar Framework 驱动</p>
        <div>
          <span id="busuanzi_container_site_pv" style='display:none'> 本站总访问量 <span id="busuanzi_value_site_pv"></span> 次 </span>
          <span id="busuanzi_container_site_uv" style='display:none'>| 总访客数 <span id="busuanzi_value_site_uv"></span> 人 </span>
        </div>
        <p><a href="https://zugelu.com">zugelu.com</a></p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
  name: 'Footer',
  data () {
    return {
      creatTime: '2021-7-1 00:00:00',
      runTime: null,
      timmer: null
    }
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
      let diff = now - new Date(this.creatTime.replace(/-/g, '/')).getTime() // 获取博客创建时间戳
      diff = diff / 1000

      let year = Math.floor(diff / (365 * 24 * 3600)) // 年
      diff %= 365 * 24 * 3600
      let month = Math.floor(diff / (30 * 24 * 3600)) // 月
      diff %= 30 * 24 * 3600
      let day = Math.floor(diff / (24 * 3600)).toString() // 天
      diff %= 24 * 3600
      let hour = Math.floor(diff / 3600).toString() // 时
      diff %= 3600
      let minute = Math.floor(diff / 60).toString() // 分
      diff %= 60
      let second = Math.floor(diff).toString() // 秒

      return year + '年' + this.addZero(month) + '月' + this.addZero(day) + '天' + this.addZero(hour) + '时' + this.addZero(minute) + '分' + this.addZero(second) + '秒';
    },
    // 为数字添加0前缀
    addZero (num) {
      if (num < 10) {
        num = '0' + num;
      }
      return num;
    },
  },
  beforeDestroy () {
    clearInterval(this.timmer)
    this.timmer = null
  }
}
</script>

<style lang="scss" scoped>
#footer {
  padding: 10px;
  p {
    margin-bottom: 0;
    padding: 0 0 6px;
  }
}

/deep/ .icon-yunhang {
  animation: rotate-center 5s linear infinite both;
}
</style>
