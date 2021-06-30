<template>
  <div id="footer" class="text-grey">
    <div>
      <p><a target="_blank" href="https://beian.miit.gov.cn/">晋ICP备2021010367号</a></p>
      <p>系统由 Vue + Node + Quasar Framework驱动</p>
      <div>
        <q-icon class="iconfont icon-yunhang"> </q-icon>
        已运行 {{runTime}}
      </div>
      <p><a href="https://zugelu.com">zugelu.com</a></p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Footer',
  data () {
    return {
      creatTime: '2021-6-6 00:00:00',
      runTime: '',
      timmer: null
    }
  },
  mounted () {
    this.runTime = this.dateDiff()
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
  },
  beforeDestroy () {
    clearInterval(this.timmer)
    this.timmer = null
  }
}
</script>

<style lang="scss" scoped>
#footer {
  width: 100%;
  // background-color: transparent;
  background-color: rgba(255, 255, 255, 0.05) !important;
  // background: linear-gradient(to top, #d3d3d5 1%, #dadcdd 99%);
  text-align: center;
  padding-top: 30px;
  // background-image: url("~assets/bg_body.webp");
  // background-repeat: no-repeat;
  // background-size: cover;
  // background-position: center 40%;
  p {
    margin-bottom: 0;
    padding: 0 0 10px;
    a {
      color: $grey;
      text-decoration: none;
      background-color: transparent;
      outline: none;
      cursor: pointer;
      transition: color 0.3s;
      &:hover {
        color: #1890ff;
      }
    }
  }
}

/deep/ .icon-yunhang {
  animation: rotate-center 5s linear infinite both;
}
</style>
